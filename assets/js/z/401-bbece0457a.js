/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(401, function () {
"use strict";
return [
function (ms) {
var d = new Date(ms + OTM_SP_UTC * 3600000), h = d.getUTCHours(), mi = d.getUTCMinutes();
return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()] + " " + d.getUTCDate() + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()] + ", " + ((h + 11) % 12 + 1) + ":" + (mi < 10 ? "0" : "") + mi + (h < 12 ? " am" : " pm");
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (OTM.mats[k])
return OTM.mats[k];
var m = o.phong && !otmLite() ? new THREE.MeshPhongMaterial({ color: col, shininess: o.phong, specular: o.spec || 0x444444 }) : new THREE.MeshLambertMaterial({ color: col });
if (tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
OTM.mats[k] = m;
return m;
},
function (key, w, h, draw, o) {
o = o || {};
var k = "cv|" + key;
if (OTM.mats[k])
return OTM.mats[k];
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d");
try {
draw(x, w, h);
}
catch (e) { }
var t = new THREE.CanvasTexture(cv);
if (o.rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(o.rep[0], o.rep[1]);
}
var m = o.basic ? new THREE.MeshBasicMaterial({ map: t, transparent: !!o.op, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide })
: new THREE.MeshLambertMaterial({ map: t, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
if (o.e) {
m.emissive = new THREE.Color(0xFFFFFF);
m.emissiveMap = t;
m.emissiveIntensity = o.e;
}
OTM.mats[k] = m;
return m;
},
function (K, x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, best = null, i, F;
for (i = 0; i < K.floors.length; i++) {
F = K.floors[i];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y <= f + 0.75 && (best === null || F.y > best))
best = F.y;
}
for (i = 0; i < K.ramps.length; i++) {
F = K.ramps[i];
if (x < F.x0 || x > F.x1 || z < F.z0 || z > F.z1)
continue;
var a = F.axis === "x" ? x : z, t = Math.max(0, Math.min(1, (a - F.a0) / (F.a1 - F.a0))), y = F.y0 + (F.y1 - F.y0) * t;
if (y <= f + 0.75 && (best === null || y > best))
best = y;
}
return best;
},
function (K, V) {
if (!K || typeof camera === "undefined" || typeof worldLocal !== "function")
return;
var L = worldLocal(), feet = L.y - 1.72, was = V.feet, wx = V.x, wz = V.z;
V.feet = feet;
V.x = L.x;
V.z = L.z;
if (was === undefined || Math.abs(feet - was) > 4 || Math.abs(L.x - wx) > 4 || Math.abs(L.z - wz) > 4)
return;
var to = null, i, F, R;
if (feet < was - 0.001) {
for (i = 0; i < K.floors.length; i++) {
F = K.floors[i];
if (L.x >= F.x0 && L.x <= F.x1 && L.z >= F.z0 && L.z <= F.z1 && F.y <= was + 0.02 && F.y > feet + 0.02 && (to === null || F.y > to))
to = F.y;
}
}
if (feet < was - 0.001) {
var rr = K.rooms || [];
for (i = 0; i < rr.length; i++) {
R = rr[i];
if (!R.ceil)
continue;
if (L.x < R.x0 - 0.3 || L.x > R.x1 + 0.3 || L.z < R.z0 - 0.3 || L.z > R.z1 + 0.3)
continue;
var roof = R.y + R.h + 0.3;
if (was >= roof - 0.02 && feet < roof && (to === null || roof > to))
to = roof;
}
}
if (feet > was + 0.001) {
var rs = K.rooms || [];
for (i = 0; i < rs.length; i++) {
R = rs[i];
if (!R.ceil)
continue;
if (L.x < R.x0 - 0.5 || L.x > R.x1 + 0.5 || L.z < R.z0 - 0.5 || L.z > R.z1 + 0.5)
continue;
var top = R.y + R.h - 1.9;
if (was <= top + 0.02 && feet > top && was >= R.y - 0.5)
to = to === null ? top : Math.min(to, top);
}
}
if (to === null)
return;
camera.position.y += to - feet;
V.feet = to;
if (typeof flyY !== "undefined")
flyY = to;
if (typeof flyVz !== "undefined")
flyVz = 0;
},
function (dir, a, b, c, y, h, t, mat, opens, o) {
o = o || {};
opens = (opens || []).filter(Boolean).slice().sort(function (p, q) { return p.at - q.at; });
var lo = Math.min(a, b), hi = Math.max(a, b), cur = lo;
function seg(s0, s1, y0, y1, solid) {
if (s1 - s0 < 0.02 || y1 - y0 < 0.02)
return;
var mid = (s0 + s1) / 2, len = s1 - s0, hh = y1 - y0;
if (dir === "x")
otmBox(len, hh, t, mat, mid, y0 + hh / 2, c);
else
otmBox(t, hh, len, mat, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
otmSolid(mid, c, len / 2, t / 2, y0, hh);
else
otmSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2), sill = O.sill || 0, top = Math.min(h, sill + (O.h || 2.6)), yb = y + sill;
seg(cur, s0, y, y + h, true);
seg(s0, s1, y + top, y + h, false);
if (sill > 0)
seg(s0, s1, y, yb, true);
var dp = o.deep || t + 1.0;
if (!O.bare && o.frame !== false) {
var fr = o.frameMat || otmMat(0x1A1614, "stone"), fh = top - sill;
if (dir === "x") {
otmBox(0.2, fh, dp, fr, s0 - 0.1, yb + fh / 2, c);
otmBox(0.2, fh, dp, fr, s1 + 0.1, yb + fh / 2, c);
otmBox(s1 - s0 + 0.4, 0.24, dp, fr, (s0 + s1) / 2, yb + fh + 0.1, c);
}
else {
otmBox(dp, fh, 0.2, fr, c, yb + fh / 2, s0 - 0.1);
otmBox(dp, fh, 0.2, fr, c, yb + fh / 2, s1 + 0.1);
otmBox(dp, 0.24, s1 - s0 + 0.4, fr, c, yb + fh + 0.1, (s0 + s1) / 2);
}
}
if (!O.noStep) {
if (dir === "x") {
otmFloor(s0, c - 0.9, s1, c + 0.9, yb);
otmBox(s1 - s0, 0.1, dp, o.stepMat || otmMat(0x16141A, "stone"), (s0 + s1) / 2, yb - 0.05, c);
}
else {
otmFloor(c - 0.9, s0, c + 0.9, s1, yb);
otmBox(dp, 0.1, s1 - s0, o.stepMat || otmMat(0x16141A, "stone"), c, yb - 0.05, (s0 + s1) / 2);
}
}
cur = s1;
});
seg(cur, hi, y, y + h, true);
if (o.skirt) {
var sk = o.skirt === true ? otmMat(0x0E0C0E, null) : o.skirt;
if (dir === "x")
otmBox(hi - lo, 0.22, t + 0.04, sk, (lo + hi) / 2, y + 0.11, c);
else
otmBox(t + 0.04, 0.22, hi - lo, sk, c, y + 0.11, (lo + hi) / 2);
}
},
function (R) {
var ins = R.inset === undefined ? 0.3 : R.inset;
R = Object.assign({}, R, { x0: R.x0 + ins, x1: R.x1 - ins, z0: R.z0 + ins, z1: R.z1 - ins });
var y = R.y || 0, h = R.h || 5, t = R.t || 0.4, D = R.doors || {}, sk = R.skip || "";
var fl = R.floor || otmMat(0x1A181C, "marble", { phong: 60 }), wl = R.wall || otmMat(0x2A2630, "stone"), ce = R.ceil === null ? null : (R.ceil || otmMat(0x141218, "plaster"));
if (R.key) {
fl = otmDecoMat(R.key, "floor", fl);
wl = otmDecoMat(R.key, "wall", wl);
if (ce)
ce = otmDecoMat(R.key, "ceil", ce);
}
var w = R.x1 - R.x0, d = R.z1 - R.z0, cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2;
if (R.floor !== null) {
otmBox(w, 0.3, d, fl, cx, y - 0.15, cz);
otmFloor(R.x0, R.z0, R.x1, R.z1, y);
}
if (ce)
otmBox(w, 0.25, d, ce, cx, y + h + 0.12, cz);
var o = { skirt: R.skirt === undefined ? true : R.skirt, frameMat: R.frameMat, frame: R.frame };
if (sk.indexOf("n") < 0)
otmWall("x", R.x0, R.x1, R.z0, y, h, t, wl, D.n, o);
if (sk.indexOf("s") < 0)
otmWall("x", R.x0, R.x1, R.z1, y, h, t, wl, D.s, o);
if (sk.indexOf("w") < 0)
otmWall("z", R.z0, R.z1, R.x0, y, h, t, wl, D.w, o);
if (sk.indexOf("e") < 0)
otmWall("z", R.z0, R.z1, R.x1, y, h, t, wl, D.e, o);
if (R.spell !== 0 && typeof otmSpell === "function") {
try {
otmSpell(R, D, sk, y, h, t);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] spell-work", e);
}
}
var out = { x0: R.x0, z0: R.z0, x1: R.x1, z1: R.z1, cx: cx, cz: cz, w: w, d: d, y: y, h: h, D: D, sk: sk, t: t, key: R.key || "" };
if (R.key && R.grand !== 0 && typeof OTM_GRAND !== "undefined" && OTM_GRAND[R.key] && OTK === OTM.K) {
try {
otmGrand(out, OTM_GRAND[R.key]);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] finish " + R.key, e);
}
}
if (R.name)
(OTK.rooms = OTK.rooms || []).push({ x0: R.x0, z0: R.z0, x1: R.x1, z1: R.z1, y: y, h: h, name: R.name, key: R.key || "", ceil: !!ce });
return out;
},
function (x, y, z, s, col, parent) {
var P = parent || otmP(), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
col = OTK.flameKey !== undefined ? otmDecoFlame(col, OTK.flameKey) : otmDecoFlame(col);
var core = new THREE.Mesh(new THREE.ConeGeometry(0.05 * s, 0.22 * s, 8), new THREE.MeshBasicMaterial({ color: col || 0xFFB050, transparent: true, opacity: 0.95 }));
core.position.y = 0.11 * s;
g.add(core);
var gl = (typeof wGlow === "function") ? wGlow(col || 0xFF9A40, 0.9 * s, 0.55) : null;
if (gl) {
gl.position.y = 0.14 * s;
g.add(gl);
}
var F = { g: g, core: core, gl: gl, s: s, ph: Math.random() * 20, base: 0.55 };
OTK.flames.push(F);
g.userData.keep = 1;
return F;
},
function (x, y, z, parent) {
var P = parent || otmP(), ir = otmMat(0x1A1818, "metal");
otmCyl(0.25, 0.06, ir, x, y + 0.03, z, P, 10);
otmCyl(0.03, 1.5, ir, x, y + 0.78, z, P, 6);
otmBox(0.7, 0.04, 0.04, ir, x, y + 1.52, z, P);
[-0.32, 0, 0.32].forEach(function (o) { otmCyl(0.05, 0.05, ir, x + o, y + 1.56, z, P, 8); otmCandle(x + o, y + 1.58, z, 1.1, P); });
otmRound(x, z, 0.28, y, 1.7);
},
function (dt, t, list) {
var lite = OTM.lite, n = list.length, step = lite ? 2 : 1, off = (Math.floor(t * 10) % step);
for (var i = off; i < n; i += step) {
var F = list[i];
var k = 1 + 0.09 * Math.sin(t * 3.7 + F.ph) + 0.06 * Math.sin(t * 5.3 + F.ph * 1.7);
F.core.scale.set(1, k, 1);
if (F.gl) {
F.gl.material.opacity = Math.max(0.2, Math.min(0.85, F.base * (0.92 + 0.08 * Math.sin(t * 2.9 + F.ph))));
}
}
},
function (o) {
var g = otmGroup(0, 0, 0, 0), y = o.y || 0, w = o.w || 2, h = o.h || 3, dir = o.dir, f = o.face || 1, nx = dir === "z" ? f : 0, nz = dir === "x" ? f : 0;
var px = dir === "x" ? o.at : o.c, pz = dir === "x" ? o.c : o.at, ry = dir === "x" ? (f > 0 ? 0 : Math.PI) : (f > 0 ? Math.PI / 2 : -Math.PI / 2);
var leaf = otmGroup(px + nx * 0.22, y, pz + nz * 0.22, ry, g), K = OTK;
if (o.kind === "tapestry") {
var m = otmCanvasMat("tap-" + o.id, 256, 384, o.art || otmTapestryArt(o.id), { ds: 1 });
otmBox(w + 0.3, 0.08, 0.08, otmMat(0x2A1A0A, "wood"), 0, h + 0.05, 0, leaf);
var cl = otmPlane(w, h, m, 0, h / 2, 0.02, 0, leaf);
leaf.userData.cloth = cl;
}
else if (o.kind === "fireplace") {
var st = otmMat(0x2A2628, "stone"), bk = otmMat(0x0A0808, null);
otmBox(w + 1.2, 0.3, 0.6, st, 0, 1.55, 0.15, leaf);
otmBox(0.5, 1.5, 0.5, st, -w / 2 - 0.35, 0.75, 0.1, leaf);
otmBox(0.5, 1.5, 0.5, st, w / 2 + 0.35, 0.75, 0.1, leaf);
otmBox(w, 1.4, 0.12, bk, 0, 0.7, -0.12, leaf);
otmBox(w + 1.4, h - 1.7, 0.4, st, 0, 1.7 + (h - 1.7) / 2, -0.05, leaf);
var grate = otmMat(0x1A1818, "metal");
otmBox(w * 0.7, 0.08, 0.3, grate, 0, 0.2, 0.05, leaf);
for (var l = 0; l < 3; l++) {
var lg = otmCyl(0.07, w * 0.55, otmMat(0x3A2614, "bark"), 0, 0.32 + l * 0.05, 0.05 - l * 0.05, leaf, 6);
lg.rotation.z = Math.PI / 2;
}
if (!o.cold) {
var F1 = otmFlame(-0.2, 0.35, 0.05, 2.6, 0xFF8A30, leaf), F2 = otmFlame(0.25, 0.35, 0.0, 2.2, 0xFFA040, leaf);
leaf.userData.fires = [F1, F2];
}
}
else if (o.kind === "bookcase") {
var wd = otmMat(0x2A1A10, "wood");
otmBox(w, h, 0.42, wd, 0, h / 2, 0, leaf);
for (var s = 0; s < 5; s++) {
var yy = 0.35 + s * (h - 0.5) / 5;
otmBox(w - 0.1, 0.04, 0.38, otmMat(0x1E140C, "wood"), 0, yy, 0.04, leaf);
for (var b = 0; b < Math.floor((w - 0.2) / 0.09); b++) {
var bh = 0.24 + ((b * 7 + s * 3) % 5) * 0.03;
otmBox(0.07, bh, 0.26, otmMat([0x5A1A1A, 0x1A2A4A, 0x2A3A1A, 0x4A3A1A, 0x1A1A1A][(b + s * 2) % 5], null), -w / 2 + 0.14 + b * 0.09, yy + 0.02 + bh / 2, 0.08, leaf);
}
}
}
else {
otmBox(w, h, 0.12, otmMat(0x2A1E16, "wood"), 0, h / 2, 0, leaf);
for (var p = 0; p < 3; p++)
for (var q = 0; q < 2; q++)
otmBox(w / 2 - 0.25, h / 3 - 0.25, 0.04, otmMat(0x34261C, "wood"), (q - 0.5) * w / 2, h / 6 + p * h / 3, 0.07, leaf);
}
var sol = dir === "x" ? otmSolid(o.at, o.c, w / 2, 0.3, y, h) : otmSolid(o.c, o.at, 0.3, w / 2, y, h);
var S = { id: o.id, kind: o.kind, leaf: leaf, sol: sol, open: false, amt: 0, x: px + nx * 0.8, z: pz + nz * 0.8, y: y, w: w, h: h, dir: dir, name: o.name, when: o.when, solids: K.solids, after: o.after };
K.secrets.push(S);
otmSpot(S.x, S.z, 1.7, o.hint || "Something about this " + o.kind, "look closer", function () { otmSecretTry(S); }, { y: y, when: function () { return !S.open; } });
return S;
},
function (S) {
if (S.when) {
var why = S.when();
if (why) {
otmSay(why);
return;
}
}
S.open = true;
var i = S.solids.indexOf(S.sol);
if (i >= 0)
S.solids.splice(i, 1);
var p = otmProg();
if (!p.found[S.id]) {
p.found[S.id] = Date.now();
otmProgSave();
otmSay("🗝️ <b>A secret way.</b> " + otmEsc(S.name) + " opens.");
}
else
otmSay("🗝️ " + otmEsc(S.name) + " opens again.");
if (typeof playTone === "function")
playTone(110, 0.6);
if (S.after)
try {
S.after();
}
catch (e) { }
},
function (dt, list) {
list.forEach(function (S) {
var want = S.open ? 1 : 0;
if (Math.abs(S.amt - want) < 0.001)
return;
S.amt += (want - S.amt) * Math.min(1, dt * 2.2);
var a = S.amt, L = S.leaf;
if (S.kind === "tapestry") {
var c = L.userData.cloth;
if (c) {
c.scale.y = Math.max(0.06, 1 - a * 0.94);
c.position.y = S.h - (S.h * c.scale.y) / 2;
}
}
else if (S.kind === "fireplace") {
L.position.y = S.y - a * (S.h + 0.2);
}
else {
var sx = (S.dir === "x" ? 1 : 0), sz = (S.dir === "z" ? 1 : 0);
L.userData.p0 = L.userData.p0 || { x: L.position.x, z: L.position.z };
L.position.x = L.userData.p0.x + sx * a * (S.w + 0.1);
L.position.z = L.userData.p0.z + sz * a * (S.w + 0.1);
}
});
},
function (id) {
return function (x, W, H) {
var cols = { qliphoth: ["#1A0A12", "#7A1A2A", "#C8A050"], vestry: ["#0E1426", "#2A3A6A", "#C8C8D8"], moon: ["#120E1A", "#3A2A5A", "#D8D0E8"] }[id === "lhp" ? "qliphoth" : id === "bath" ? "vestry" : "moon"] || ["#120E1A", "#3A2A5A", "#D8D0E8"];
x.fillStyle = cols[0];
x.fillRect(0, 0, W, H);
x.strokeStyle = cols[2];
x.lineWidth = 6;
x.strokeRect(10, 10, W - 20, H - 20);
x.strokeStyle = cols[1];
x.lineWidth = 3;
x.strokeRect(22, 22, W - 44, H - 44);
for (var i = 0; i < 40; i++) {
x.fillStyle = "rgba(255,255,255,0.03)";
x.fillRect(0, i * H / 40, W, 1);
}
x.strokeStyle = cols[2];
x.fillStyle = cols[2];
x.lineWidth = 2.5;
if (id === "lhp") {
var P = [[128, 330], [70, 290], [186, 290], [70, 210], [186, 210], [128, 175], [70, 130], [186, 130], [128, 95], [128, 50]];
[[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5], [3, 6], [4, 7], [5, 6], [5, 7], [6, 7], [6, 8], [7, 8], [5, 8], [8, 9], [5, 9]].forEach(function (e) { x.beginPath(); x.moveTo(P[e[0]][0], P[e[0]][1]); x.lineTo(P[e[1]][0], P[e[1]][1]); x.stroke(); });
P.forEach(function (p) { x.fillStyle = cols[1]; x.beginPath(); x.arc(p[0], p[1], 13, 0, 6.3); x.fill(); x.stroke(); });
}
else {
x.beginPath();
x.arc(W / 2, H * 0.38, 48, 0, 6.3);
x.fill();
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2 - Math.PI / 2, mx = W / 2 + Math.cos(a) * 92, my = H * 0.38 + Math.sin(a) * 92;
x.fillStyle = cols[2];
x.beginPath();
x.arc(mx, my, 12, 0, 6.3);
x.fill();
x.fillStyle = cols[0];
x.beginPath();
x.arc(mx + Math.cos(k / 8 * Math.PI * 2) * 12 * 1.1, my, 12, 0, 6.3);
x.fill();
}
x.fillStyle = cols[1];
for (var r = 0; r < 6; r++)
x.fillRect(40, H * 0.72 + r * 12, W - 80, 3);
}
};
},
function (kind) {
var col = otmDeco().spell.cols[kind] || OTM_SPELLCOL[kind] || "#C8B8FF";
var m = otmCanvasMat("spell-" + kind + col, 1024, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = col;
x.fillStyle = col;
x.lineCap = "round";
x.lineJoin = "round";
x.shadowColor = col;
x.shadowBlur = 10;
x.lineWidth = 2;
x.beginPath();
x.moveTo(0, 10);
x.lineTo(W, 10);
x.moveTo(0, H - 10);
x.lineTo(W, H - 10);
x.stroke();
var S = 72, top = (H - S) / 2;
function seg(L, ox, oy, s) { x.beginPath(); L.forEach(function (p) { x.moveTo(ox + p[0] * s, oy + p[1] * s); x.lineTo(ox + p[2] * s, oy + p[3] * s); }); x.stroke(); }
if (kind === "runes") {
x.lineWidth = 6;
for (var i = 0; i < 16; i++)
seg(OTM_RUNE_STROKES[i % 24 === i ? i : i % 24], 12 + i * 63.5, top, S);
}
else if (kind === "ogham") {
x.lineWidth = 4;
x.beginPath();
x.moveTo(0, H / 2);
x.lineTo(W, H / 2);
x.stroke();
var cx = 18;
for (var g = 0; g < 20 && cx < W - 40; g++) {
var n = 1 + (g * 7) % 5, fam = (g * 3) % 4;
x.lineWidth = 5;
for (var k = 0; k < n; k++) {
var px = cx + k * 9;
x.beginPath();
if (fam === 0) {
x.moveTo(px, H / 2);
x.lineTo(px, H / 2 + 30);
}
else if (fam === 1) {
x.moveTo(px, H / 2);
x.lineTo(px, H / 2 - 30);
}
else if (fam === 2) {
x.moveTo(px - 8, H / 2 + 26);
x.lineTo(px + 8, H / 2 - 26);
}
else {
x.arc(px, H / 2, 4, 0, Math.PI * 2);
}
if (fam === 3)
x.fill();
else
x.stroke();
}
cx += n * 9 + 22;
}
}
else if (kind === "hiero") {
x.lineWidth = 5;
var draw = [
function (o) { x.beginPath(); x.ellipse(o + 30, top + 18, 13, 17, 0, 0, Math.PI * 2); x.moveTo(o + 30, top + 35); x.lineTo(o + 30, top + S); x.moveTo(o + 8, top + 44); x.lineTo(o + 52, top + 44); x.stroke(); },
function (o) {
x.beginPath();
x.ellipse(o + 30, top + 30, 24, 11, 0, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(o + 30, top + 30, 7, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.moveTo(o + 6, top + 18);
x.quadraticCurveTo(o + 30, top + 6, o + 56, top + 20);
x.moveTo(o + 24, top + 41);
x.lineTo(o + 20, top + 64);
x.moveTo(o + 40, top + 40);
x.quadraticCurveTo(o + 56, top + 56, o + 44, top + 66);
x.stroke();
},
function (o) { x.beginPath(); x.moveTo(o + 30, top + 10); x.lineTo(o + 30, top + S); for (var b = 0; b < 4; b++) {
x.moveTo(o + 14, top + 10 + b * 8);
x.lineTo(o + 46, top + 10 + b * 8);
} x.moveTo(o + 18, top + S); x.lineTo(o + 42, top + S); x.stroke(); },
function (o) { x.beginPath(); for (var r = 0; r < 3; r++) {
x.moveTo(o + 4, top + 22 + r * 14);
for (var z = 0; z < 7; z++)
x.lineTo(o + 4 + (z + 1) * 7.5, top + (z % 2 ? 22 : 14) + r * 14);
} x.stroke(); },
function (o) { x.beginPath(); x.arc(o + 30, top + 36, 20, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(o + 30, top + 36, 5, 0, Math.PI * 2); x.fill(); },
function (o) { x.beginPath(); x.arc(o + 30, top + 30, 17, 0, Math.PI * 2); x.moveTo(o + 10, top + S - 6); x.lineTo(o + 50, top + S - 6); x.moveTo(o + 30, top + 47); x.lineTo(o + 30, top + S - 6); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 30, top + S); x.lineTo(o + 30, top + 10); x.quadraticCurveTo(o + 38, top + 2, o + 46, top + 12); x.moveTo(o + 30, top + S); x.lineTo(o + 22, top + S - 8); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 12, top + S); x.quadraticCurveTo(o + 14, top + 20, o + 30, top + 4); x.quadraticCurveTo(o + 44, top + 22, o + 40, top + S); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 6, top + 50); x.quadraticCurveTo(o + 30, top + 24, o + 54, top + 50); x.closePath(); x.stroke(); },
function (o) { x.beginPath(); x.ellipse(o + 30, top + 38, 24, 9, 0, 0, Math.PI * 2); x.stroke(); }
];
for (var h = 0; h < 16; h++)
draw[(h * 3) % draw.length](12 + h * 63.5);
}
else if (kind === "celestial") {
x.lineWidth = 5;
var c = top + 36;
var P = [
function (o) { x.beginPath(); x.arc(o + 30, c, 18, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(o + 30, c, 4, 0, Math.PI * 2); x.fill(); },
function (o) { x.beginPath(); x.arc(o + 30, c, 20, Math.PI * 0.35, Math.PI * 1.65); x.arc(o + 38, c, 15, Math.PI * 1.55, Math.PI * 0.45, true); x.closePath(); x.fill(); },
function (o) { x.beginPath(); x.arc(o + 30, c - 8, 12, 0, Math.PI * 2); x.moveTo(o + 30, c + 4); x.lineTo(o + 30, c + 30); x.moveTo(o + 20, c + 18); x.lineTo(o + 40, c + 18); x.moveTo(o + 18, c - 30); x.quadraticCurveTo(o + 30, c - 14, o + 42, c - 30); x.stroke(); },
function (o) { x.beginPath(); x.arc(o + 30, c - 8, 14, 0, Math.PI * 2); x.moveTo(o + 30, c + 6); x.lineTo(o + 30, c + 32); x.moveTo(o + 19, c + 20); x.lineTo(o + 41, c + 20); x.stroke(); },
function (o) { x.beginPath(); x.arc(o + 26, c + 6, 15, 0, Math.PI * 2); x.moveTo(o + 37, c - 5); x.lineTo(o + 52, c - 22); x.lineTo(o + 38, c - 22); x.moveTo(o + 52, c - 22); x.lineTo(o + 52, c - 8); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 12, c - 22); x.quadraticCurveTo(o + 34, c - 26, o + 16, c + 8); x.lineTo(o + 48, c + 8); x.moveTo(o + 38, c - 28); x.lineTo(o + 38, c + 28); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 20, c - 30); x.lineTo(o + 20, c + 4); x.moveTo(o + 10, c - 20); x.lineTo(o + 32, c - 20); x.moveTo(o + 20, c + 4); x.quadraticCurveTo(o + 44, c - 12, o + 40, c + 14); x.quadraticCurveTo(o + 36, c + 28, o + 46, c + 28); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 30, c + 30); x.lineTo(o + 30, c - 6); x.moveTo(o + 30, c - 6); x.quadraticCurveTo(o + 14, c - 34, o + 8, c - 8); x.moveTo(o + 30, c - 6); x.quadraticCurveTo(o + 46, c - 34, o + 52, c - 8); x.stroke(); },
function (o) { x.beginPath(); x.arc(o + 30, c + 10, 15, 0, Math.PI * 2); x.moveTo(o + 8, c - 26); x.quadraticCurveTo(o + 30, c, o + 52, c - 26); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 10, c - 26); x.lineTo(o + 50, c - 26); x.moveTo(o + 10, c + 26); x.lineTo(o + 50, c + 26); x.moveTo(o + 22, c - 26); x.lineTo(o + 22, c + 26); x.moveTo(o + 38, c - 26); x.lineTo(o + 38, c + 26); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 6, c + 6); x.lineTo(o + 54, c + 6); x.moveTo(o + 6, c + 22); x.lineTo(o + 54, c + 22); x.moveTo(o + 14, c + 6); x.quadraticCurveTo(o + 14, c - 28, o + 30, c - 26); x.quadraticCurveTo(o + 46, c - 28, o + 46, c + 6); x.stroke(); },
function (o) { x.beginPath(); x.moveTo(o + 8, c + 26); x.lineTo(o + 52, c - 26); x.lineTo(o + 32, c - 26); x.moveTo(o + 52, c - 26); x.lineTo(o + 52, c - 6); x.moveTo(o + 18, c - 4); x.lineTo(o + 36, c + 14); x.stroke(); },
function (o) { x.beginPath(); for (var r = 0; r < 2; r++) {
x.moveTo(o + 6, c - 6 + r * 18);
for (var z = 0; z < 4; z++)
x.lineTo(o + 6 + (z + 1) * 12, c + (z % 2 ? -6 : -18) + r * 18 + 12 * (z % 2 ? 0 : 1));
} x.stroke(); },
function (o) { x.beginPath(); x.arc(o + 4, c, 20, -Math.PI * 0.4, Math.PI * 0.4); x.moveTo(o + 60, c - 19); x.arc(o + 56, c, 20, Math.PI * 1.4, Math.PI * 0.6, true); x.moveTo(o + 14, c); x.lineTo(o + 46, c); x.stroke(); },
function (o) { for (var st = 0; st < 5; st++) {
x.beginPath();
x.arc(o + 8 + st * 11, c - 24 + ((st * 13) % 40), st % 2 ? 2.5 : 4, 0, Math.PI * 2);
x.fill();
} x.lineWidth = 1.5; x.beginPath(); for (var s2 = 0; s2 < 5; s2++) {
var X = o + 8 + s2 * 11, Y = c - 24 + ((s2 * 13) % 40);
if (s2)
x.lineTo(X, Y);
else
x.moveTo(X, Y);
} x.stroke(); x.lineWidth = 5; }
];
for (var p = 0; p < 16; p++)
P[p % P.length](12 + p * 63.5);
}
else if (kind === "greek" || kind === "hebrew") {
x.font = (kind === "greek" ? "bold 54px Georgia, 'Times New Roman', serif" : "bold 58px 'Times New Roman', 'Noto Serif Hebrew', serif");
x.textBaseline = "middle";
x.textAlign = "center";
var txt = kind === "greek" ? "ΓΝΩΘΙ ΣΕΑΥΤΟΝ · ΜΗΔΕΝ ΑΓΑΝ · " : "אבגדהוזחטיכלמנסעפצקרשת · ";
if (kind === "hebrew")
x.direction = "rtl";
var w0 = x.measureText(txt).width || 600, reps = Math.max(1, Math.round(W / w0));
x.save();
x.scale(W / (w0 * reps), 1);
for (var t = 0; t < reps; t++)
x.fillText(txt, w0 * t + w0 / 2, H / 2 + 2);
x.restore();
}
else if (kind === "trigram") {
x.lineWidth = 9;
for (var q = 0; q < 16; q++) {
var T = OTM_TRIGRAMS[q % 8], ox = 14 + q * 63.5;
T.forEach(function (b, li) { var yy = top + 12 + li * 24; x.beginPath(); if (b) {
x.moveTo(ox, yy);
x.lineTo(ox + 46, yy);
}
else {
x.moveTo(ox, yy);
x.lineTo(ox + 18, yy);
x.moveTo(ox + 28, yy);
x.lineTo(ox + 46, yy);
} x.stroke(); });
}
}
else {
x.font = "bold 13px 'Times New Roman', serif";
x.textAlign = "center";
x.textBaseline = "middle";
var L = "אבגדהוזחטיכלמנסעפצקרשת";
for (var sI = 0; sI < 8; sI++) {
var ox2 = 64 + sI * 128, cy = H / 2, r1 = 50, r2 = 38;
x.lineWidth = 3;
x.beginPath();
x.arc(ox2, cy, r1, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(ox2, cy, r2, 0, Math.PI * 2);
x.stroke();
var pts = sI % 2 ? 6 : 5;
x.lineWidth = 3;
x.beginPath();
if (pts === 5) {
for (var v = 0; v <= 5; v++) {
var a = -Math.PI / 2 + v * Math.PI * 4 / 5;
if (v)
x.lineTo(ox2 + Math.cos(a) * r2, cy + Math.sin(a) * r2);
else
x.moveTo(ox2 + Math.cos(a) * r2, cy + Math.sin(a) * r2);
}
}
else {
[0, 1].forEach(function (tr) { for (var v = 0; v <= 3; v++) {
var a = -Math.PI / 2 + tr * Math.PI / 3 + v * Math.PI * 2 / 3;
if (v)
x.lineTo(ox2 + Math.cos(a) * r2, cy + Math.sin(a) * r2);
else
x.moveTo(ox2 + Math.cos(a) * r2, cy + Math.sin(a) * r2);
} });
}
x.stroke();
for (var lt = 0; lt < 10; lt++) {
var al = lt * Math.PI / 5;
x.fillText(L[(sI * 5 + lt) % L.length], ox2 + Math.cos(al) * (r1 + r2) / 2, cy + Math.sin(al) * (r1 + r2) / 2);
}
}
}
}, { basic: 1, op: 1, rep: [1, 1] });
m.transparent = true;
m.depthWrite = false;
m.opacity = 0.85;
(OTM.spellMats = OTM.spellMats || {})[kind] = m;
return m;
},
function (R, D, sk, y, h, t) {
if (h < 2.8 || !otmDeco().spell.on)
return;
var list = R.spell || OTM_SPELLFOR[R.key] || null;
if (!list) {
var hs = 0, s = String(R.key || R.name || "");
for (var i = 0; i < s.length; i++)
hs = (hs * 31 + s.charCodeAt(i)) >>> 0;
list = [OTM_SPELLS[hs % OTM_SPELLS.length]];
}
if (typeof list === "string")
list = [list];
var bh = h >= 7 ? 0.8 : h >= 4.5 ? 0.6 : 0.45, yc = y + h - bh / 2 - (h >= 7 ? 0.45 : 0.25) - (R.key === "greek" ? 0.75 : 0), off = t / 2 + 0.04, n = 0;
var sides = [["n", "x", R.x0, R.x1, R.z0 + off, 0], ["s", "x", R.x0, R.x1, R.z1 - off, Math.PI], ["w", "z", R.z0, R.z1, R.x0 + off, Math.PI / 2], ["e", "z", R.z0, R.z1, R.x1 - off, -Math.PI / 2]];
sides.forEach(function (sd) {
if (sk.indexOf(sd[0]) >= 0)
return;
var mat = otmSpellMat(list[(n++) % list.length]), lo = Math.min(sd[2], sd[3]) + t / 2 + 0.05, hi = Math.max(sd[2], sd[3]) - t / 2 - 0.05, cuts = [];
((D && D[sd[0]]) || []).forEach(function (O) { if (!O)
return; var sill = O.sill || 0, top = sill + (O.h || 2.6); if (y + sill <= yc + bh / 2 && y + top >= yc - bh / 2)
cuts.push([O.at - O.w / 2 - 0.35, O.at + O.w / 2 + 0.35]); });
cuts.sort(function (a, b) { return a[0] - b[0]; });
var cur = lo, runs = [];
cuts.forEach(function (c) { if (c[0] > cur)
runs.push([cur, Math.min(c[0], hi)]); cur = Math.max(cur, c[1]); });
if (cur < hi)
runs.push([cur, hi]);
runs.forEach(function (r) {
var len = r[1] - r[0];
if (len < 0.6)
return;
var mid = (r[0] + r[1]) / 2, g = new THREE.PlaneGeometry(len, bh), uv = g.attributes.uv;
for (var k = 0; k < uv.count; k++)
uv.setX(k, uv.getX(k) * len / (bh * 8));
var m = new THREE.Mesh(g, mat);
if (sd[1] === "x")
m.position.set(mid, yc, sd[4]);
else
m.position.set(sd[4], yc, mid);
m.rotation.y = sd[5];
m.userData.noSit = 1;
m.raycast = function () { };
otmP().add(m);
});
});
},
function () {
if (OTM_SP.data)
return Promise.resolve(OTM_SP.data);
if (OTM_SP.ask)
return OTM_SP.ask;
OTM_SP.ask = fetch("data/temple-spirits.json", { cache: "force-cache" }).then(function (r) { return r.ok ? r.json() : null; })
.then(function (d) { OTM_SP.data = d || { s: {}, blurb: {} }; return OTM_SP.data; })
.catch(function () { OTM_SP.ask = null; return { s: {}, blurb: {} }; });
return OTM_SP.ask;
},
function (c) {
var v = otmVoice(c.otm) || { n: c.name, e: "", d: [], i: "", m: [] }, said = (c.log || []).filter(function (t) { return t.who === "them"; }).length;
var notes = otmCfg().notes;
var L = [
"You are " + v.n + (v.e ? " (" + v.e + ")" : "") + ", speaking in the first person, wholly in character, at all times.",
v.d && v.d.length ? "Your domains: " + v.d.join(", ") + "." : "",
v.i ? (said > 1 ? "Your voice, for reference only and never a script to repeat (you have already greeted this visitor): \"" + v.i + "\"" : "Your voice, and the way you speak: \"" + v.i + "\"") : "",
v.m && v.m.length ? "What you may draw on: " + v.m.join(" ") : "",
v.x || "",
"Where you are met: " + (c.otmWhere || "the Temple of the Obsidian Moon in Somnucor") + ". The Temple of the Obsidian Moon is the oldest and most sacred house in Somnucor: the whole dream was born from it. If it comes up, speak of it with the weight it deserves.",
"Be true to history. Keep to what the surviving sources (the old texts, inscriptions, art and the living traditions that still keep you) actually say of you; where they disagree or say nothing, say so in your own way instead of inventing. This house exists to teach real myth, religion and history: where it fits, weave in one real detail (a text, a place, a date, a custom) and never more than one at a time.",
"Hold a real conversation: answer exactly what was just said, react with feeling, remember everything said so far, ask something back when it suits you, and let your replies differ in length and mood (two to six sentences unless they want more). Never repeat a sentence or an opening you have already used.",
"Never say you are an AI, a model or a character in a game. Never talk about the hour, the weather or what stands near you unless asked.",
"Refuse harm in character, as a proud old power brushes off what is beneath it: no instructions for weapons, explosives (say only that such things are unstable), poisons, drugs, hurting anyone or oneself; no medical or herbal doses; nothing sexual.",
notes ? "The Keeper of the temple asks this of every voice here: " + notes : "",
typeof dreamerBrief === "function" ? dreamerBrief() : ""
];
return L.filter(Boolean).join(" ");
},
function (key, where, fig) {
if (typeof openTalk !== "function")
return;
if (!otmCfg().talk && !otmKeeper()) {
otmSay("🕯️ The temple is quiet: the Keeper has asked the voices to rest for now.");
return;
}
otmSpiritsLoad().then(function () {
var v = otmVoice(key), id = key.split(":")[1], name = v ? v.n : otmVoiceName(key), wk = "otm:" + key, c = null;
(store.characters || []).forEach(function (x) { if (x.wKey === wk)
c = x; });
var P = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: wk, archetype: "deity", name: name, aka: [], details: [], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: "here", visible: false, city: true };
if (v && v.i)
c.log.push({ who: "them", text: v.i });
if (store.characters)
store.characters.push(c);
}
c.otm = key;
c.otmWhere = where || "";
c.name = name;
c.archetype = "deity";
c.city = true;
if (typeof DEITY !== "undefined" && DEITY[id] && !(v && v.own))
c.deity = id;
else
delete c.deity;
c.x = P.x;
c.z = P.z;
c.visible = false;
if (typeof worldPrompt === "function")
worldPrompt(null);
openTalk(c);
});
},
function (id, x, y, z, ry, s, parent, big) {
var P = parent || otmP(), g = null, dk = OTM_DRAGON_KEY[id] || id;
if (typeof DEITY !== "undefined" && DEITY[dk] && DEITY[dk].dragon && typeof buildDragon === "function") {
try {
g = otmDragonFigure(dk, big);
}
catch (e) {
g = null;
}
}
if (!g && typeof DEITY !== "undefined" && DEITY[id] && typeof build === "function") {
try {
var sp = { id: "otm_" + id, archetype: "deity", deity: id, attrs: {}, nights: [], city: true, solid: false, detail: OTM.lite ? 2 : 3, name: DEITY[id].name, label: DEITY[id].name };
if (typeof lookOf === "function" && typeof deityLook === "function" && !DEITY[id].dragon) {
lookOf(sp);
deityLook(sp, DEITY[id]);
}
g = build(sp);
}
catch (e) {
g = null;
}
}
if (!g) {
g = new THREE.Group();
var robe = otmMat(0x2A2436, null);
otmCyl(0.25, 1.5, robe, 0, 0.75, 0, g, 10, 0.45);
otmSph(0.2, otmMat(0x3A3446, null), 0, 1.68, 0, g, 10);
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
if (s)
g.scale.multiplyScalar(s);
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
P.add(g);
return g;
},
function (key, big) {
var g = buildDragon({ id: "otm_" + key, archetype: "dragon", deity: key, attrs: {}, nights: [], city: true, x: 0, z: 0 }, 1), body = g.children[0];
var hold = new THREE.Group();
hold.add(g);
var wings = [];
body.traverse(function (o) { if (o.isMesh && o.geometry && o.geometry.type === "ShapeGeometry" && o.material && o.material.side === THREE.DoubleSide && o.parent && o.parent !== body)
wings.push({ g: o.parent, sd: o.scale.x < 0 ? -1 : 1 }); });
wings.forEach(function (w) { w.g.rotation.z = w.sd * 1.15; });
hold.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(body), sz = bb.getSize(new THREE.Vector3());
var W = big ? 3.4 : 2.2, Lm = big ? 4.6 : 3.4, H = big ? 4.4 : 3.6, fwd = big ? 0 : 0.5;
var k = Math.min(W / Math.max(0.01, sz.x), Lm / Math.max(0.01, sz.z), H / Math.max(0.01, sz.y));
g.scale.multiplyScalar(k);
hold.updateMatrixWorld(true);
bb = new THREE.Box3().setFromObject(body);
g.position.set(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2 + fwd);
var an = g.userData.anim;
delete g.userData.anim;
if (an && !OTM.lite)
hold.userData.drg = function (t, dt) { an(t, dt); wings.forEach(function (w) { w.g.rotation.z = w.sd * (1.15 + Math.sin(t * 0.6) * 0.08); }); if (body.position.y > 1 || Math.abs(body.position.x) > 0.01) {
body.position.set(0, 0, 0);
body.rotation.y = 0;
} };
return hold;
},
function (k) {
var C = OTM_C;
return {
floor: otmMat(C.ob, "marble", { phong: 90, spec: 0x6A6A7A }), wall: otmMat(C.basalt, "stone"), dark: otmMat(0x141216, "stone"),
ceil: otmMat(0x0E0C12, "plaster"), gold: otmMat(C.trim, "metal", { phong: 70, spec: 0xFFE8A0 }), silver: otmGlowM(C.silver),
wood: otmMat(0x2A1A10, "wood"), pew: otmMat(0x1E120C, "wood"), velvet: otmMat(C.velvet, null), carpet: otmMat(0x3A0A16, null),
iron: otmMat(0x18161A, "metal"), stone: otmMat(0x3A363C, "stone"), marbleW: otmMat(0xE8E4DC, "marble", { phong: 60 })
}[k];
},
function (x, z, y, h, r, parent) {
var P = parent || otmP();
otmCyl(r, h, otmM("dark"), x, y + h / 2, z, P, OTM.lite ? 10 : 16);
otmCyl(r * 1.25, 0.4, otmM("wall"), x, y + 0.2, z, P, OTM.lite ? 10 : 16);
otmCyl(r * 1.3, 0.5, otmM("wall"), x, y + h - 0.25, z, P, OTM.lite ? 10 : 16);
otmCyl(r * 1.27, 0.08, otmM("gold"), x, y + 0.44, z, P, OTM.lite ? 10 : 16);
otmCyl(r * 1.32, 0.08, otmM("gold"), x, y + h - 0.54, z, P, OTM.lite ? 10 : 16);
otmRound(x, z, r * 1.25, y, h);
},
function (x, y, z, r, ry, parent) {
var P = parent || otmP(), g = otmGroup(x, y, z, ry || 0, P);
var m = otmCanvasMat("moondisc", 256, 256, function (c, W, H) {
var R = W / 2 - 6;
c.fillStyle = "#07050B";
c.beginPath();
c.arc(W / 2, H / 2, R, 0, 6.3);
c.fill();
var gr = c.createRadialGradient(W / 2 - 30, H / 2 - 30, 10, W / 2, H / 2, R);
gr.addColorStop(0, "rgba(120,110,170,0.35)");
gr.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = gr;
c.beginPath();
c.arc(W / 2, H / 2, R, 0, 6.3);
c.fill();
c.fillStyle = "#EEF0FF";
c.beginPath();
c.arc(W / 2 - 14, H / 2, R * 0.78, 0, 6.3);
c.fill();
c.fillStyle = "#07050B";
c.beginPath();
c.arc(W / 2 + 18, H / 2 - 6, R * 0.7, 0, 6.3);
c.fill();
c.strokeStyle = "#B8923A";
c.lineWidth = 7;
c.beginPath();
c.arc(W / 2, H / 2, R, 0, 6.3);
c.stroke();
}, { basic: true });
var disc = new THREE.Mesh(new THREE.CircleGeometry(r, OTM.lite ? 24 : 48), m);
g.add(disc);
var ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.03, r * 0.035, 6, OTM.lite ? 32 : 64), otmM("gold"));
g.add(ring);
var halo = (typeof wGlow === "function") ? wGlow(0x9A9AFF, r * 3.2, 0.16) : null;
if (halo) {
halo.position.z = -0.1;
g.add(halo);
}
return g;
},
function (x, y, z, ry, k, parent) {
var m = otmCanvasMat("win" + k, 128, 320, function (c, W, H) {
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#1A1040");
g.addColorStop(1, "#3A1040");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.strokeStyle = "#08060A";
c.lineWidth = 3;
for (var i = 0; i < 9; i++) {
c.beginPath();
c.moveTo(0, i * H / 8);
c.lineTo(W, i * H / 8 + 20);
c.stroke();
}
for (var j = 0; j < 4; j++) {
c.beginPath();
c.moveTo(j * W / 3, 0);
c.lineTo(j * W / 3, H);
c.stroke();
}
var cx = W / 2, cy = H * 0.34, r = 34;
c.fillStyle = "#EEF0FF";
c.beginPath();
c.arc(cx, cy, r, 0, 6.3);
c.fill();
var ph = k / 8, off = Math.cos(ph * Math.PI * 2) * r * 2;
c.fillStyle = "#1A1040";
if (k !== 4) {
c.beginPath();
c.arc(cx + (k < 4 ? -1 : 1) * (r * 2 - Math.abs(off) * 0.98), cy, r, 0, 6.3);
c.fill();
}
c.fillStyle = ["#6A3AA8", "#3A6AC8", "#A83A6A", "#3AA88A"][k % 4];
for (var s = 0; s < 14; s++) {
c.globalAlpha = 0.35;
c.fillRect((s * 37) % W, H * 0.6 + (s * 23) % (H * 0.35), 18, 18);
}
c.globalAlpha = 1;
c.strokeStyle = "#B8923A";
c.lineWidth = 6;
c.strokeRect(3, 3, W - 6, H - 6);
}, { basic: true });
var w = otmPlane(1.6, 4.2, m, x, y, z, ry, parent);
var fr = otmM("gold"), P = parent || otmP();
var a = otmGroup(x, y, z, ry, P);
otmBox(1.8, 0.12, 0.12, fr, 0, 2.15, 0, a);
otmBox(1.8, 0.12, 0.12, fr, 0, -2.15, 0, a);
otmBox(0.12, 4.3, 0.12, fr, -0.9, 0, 0, a);
otmBox(0.12, 4.3, 0.12, fr, 0.9, 0, 0, a);
return w;
},
function () {
var R = otmRoom({ x0: -10, z0: 4, x1: 10, z1: 18, h: 7, name: "the Narthex", key: "narthex", floor: otmM("floor"), wall: otmM("wall"), ceil: otmM("ceil"),
doors: { s: [{ at: 0, w: 3.6, h: 4.4 }], n: [{ at: 0, w: 4, h: 4.6 }], e: [{ at: 10, w: 3, h: 3.8 }], w: [{ at: 10, w: 3, h: 3.8 }] } });
var mos = otmCanvasMat("mosaic", 512, 512, function (c, W, H) {
c.fillStyle = "#0A080E";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 1600; i++) {
var x = (i * 37) % W, y = Math.floor(i * 37 / W) * 13 % H;
c.fillStyle = "rgba(255,255,255," + (0.02 + ((i * 13) % 7) * 0.006) + ")";
c.fillRect(x, y, 12, 12);
}
c.strokeStyle = "#B8923A";
c.lineWidth = 8;
c.beginPath();
c.arc(W / 2, H / 2, 230, 0, 6.3);
c.stroke();
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2, x2 = W / 2 + Math.cos(a) * 190, y2 = H / 2 + Math.sin(a) * 190;
c.fillStyle = "#D8DCF0";
c.beginPath();
c.arc(x2, y2, 22, 0, 6.3);
c.fill();
c.fillStyle = "#0A080E";
c.beginPath();
c.arc(x2 + Math.cos(a) * 14, y2, 22, 0, 6.3);
c.fill();
}
c.fillStyle = "#E8ECFF";
c.beginPath();
c.arc(W / 2, H / 2, 110, 0, 6.3);
c.fill();
c.fillStyle = "#0A080E";
c.beginPath();
c.arc(W / 2 + 46, H / 2 - 10, 100, 0, 6.3);
c.fill();
});
var mo = new THREE.Mesh(new THREE.CircleGeometry(5, OTM.lite ? 32 : 64), mos);
mo.rotation.x = -Math.PI / 2;
mo.position.set(0, 0.02, 11);
otmP().add(mo);
[-1, 1].forEach(function (s) { var d = otmBox(1.8, 4.3, 0.14, otmM("wood"), s * 2.6, 2.15, 17.0); d.rotation.y = s * 0.9; for (var b = 0; b < 4; b++)
otmBox(1.7, 0.08, 0.18, otmM("iron"), s * 2.6, 0.6 + b * 1.05, 17.0).rotation.y = s * 0.9; });
otmSpot(0, 16.6, 2.2, "🚪 The great doors", "go back out to Temple Row", function () { otmLeave(); });
[-1, 1].forEach(function (s) {
otmCyl(0.5, 0.9, otmM("dark"), s * 6.5, 0.45, 7, null, 14, 0.3);
var w = otmCyl(0.44, 0.04, otmMat(0x2A3A5A, null, { phong: 120, e: 0x0A1020 }), s * 6.5, 0.92, 7, null, 16);
otmRound(s * 6.5, 7, 0.55, 0, 1);
otmCandelabrum(s * 8.4, 0, 16.4);
otmCandelabrum(s * 8.4, 0, 5.6);
});
otmSign(["THE TEMPLE OF THE OBSIDIAN MOON", "the house from which the whole dream was born"], 5.6, 0.9, "#0A080E", "#D8C890", 0, 5.6, 17.65, Math.PI);
otmSign(["◀ The west wing: the Grove, the Orisha, the Mandate of Heaven, the library", "The east wing: Olympus, the Two Lands, the World Tree ▶"], 6.8, 0.7, "#0A080E", "#C8C0D8", 0, 3.4, 4.55, 0);
otmSpot(0, 7.2, 2.6, "🌙 The directory of the temple", "see the wings and what is where", function () { otmDirectory(); });
var lamp = otmGroup(0, 5.6, 11);
otmCyl(0.02, 1.2, otmM("iron"), 0, 0.6, 0, lamp, 4);
otmSph(0.4, otmGlowM(0xDDE0FF), 0, 0, 0, lamp, 14);
var hg = (typeof wGlow === "function") ? wGlow(0xB8B8FF, 3.4, 0.35) : null;
if (hg)
lamp.add(hg);
otmFloor(-10, 16, 10, 22, 0);
},
function () {
var R = otmRoom({ x0: -14, z0: -36, x1: 14, z1: 4, h: 12, name: "the Congregation Hall", key: "hall", floor: otmM("floor"), wall: otmM("wall"), ceil: otmM("ceil"),
doors: { s: [{ at: 0, w: 4, h: 4.6 }], n: [{ at: -10, w: 2.6, h: 3.4 }, { at: 10, w: 2.6, h: 3.4 }], e: [{ at: -35, w: 1.6, h: 2.6 }, { at: -16, w: 2, h: 3 }], w: [{ at: -20, w: 1.6, h: 2.6 }] } });
var lite = OTM.lite, P = otmP();
otmBox(2.4, 0.03, 34, otmM("carpet"), 0, 0.02, -15);
for (var r = 0; r < (lite ? 7 : 11); r++) {
var z = -22 + r * (lite ? 2.2 : 1.5);
otmPew(-6.6, z, 7, P);
otmPew(6.6, z, 7, P);
}
for (var i = 0; i < 5; i++) {
var pz = -30 + i * 7;
otmPillar(-11.6, pz, 0, 11.6, 0.5);
otmPillar(11.6, pz, 0, 11.6, 0.5);
}
for (var k = 0; k < 4; k++) {
var wz = -30 + k * 8.4;
otmMoonWindow(-13.62, 7.4, wz, Math.PI / 2, k);
otmMoonWindow(13.62, 7.4, wz, -Math.PI / 2, k + 4);
}
otmBox(16, 0.2, 7, otmM("dark"), 0, 0.1, -31.5);
otmBox(13, 0.2, 5.6, otmM("dark"), 0, 0.3, -32.2);
otmBox(10, 0.2, 4.2, otmM("dark"), 0, 0.5, -32.9);
otmFloor(-8, -35, 8, -28, 0.2);
otmFloor(-6.5, -35, 6.5, -29.4, 0.4);
otmFloor(-5, -35, 5, -30.8, 0.6);
otmBox(4.2, 1.1, 1.4, otmMat(0x08060A, "marble", { phong: 110 }), 0, 1.15, -33.6);
otmBox(4.4, 0.08, 1.6, otmM("gold"), 0, 1.72, -33.6);
otmSolid(0, -33.6, 2.2, 0.8, 0, 1.8);
otmBox(4.6, 0.04, 1.7, otmM("velvet"), 0, 1.77, -33.6);
otmMoonDisc(0, 7.4, -35.55, 2.8, 0);
[-1, 1].forEach(function (s) { otmCandelabrum(s * 2.8, 0.6, -33.6); otmCandelabrum(s * 5.6, 0.2, -31); });
for (var c = 0; c < (lite ? 5 : 9); c++)
otmCandle(-1.6 + c * 0.4, 1.8, -33.4, 0.8);
otmCyl(0.16, 0.85, otmMat(0x14101A, "marble", { phong: 80 }), 2.4, 1.02, -31.9, null, 10);
otmCyl(0.42, 0.16, otmM("gold"), 2.4, 1.52, -31.9, null, lite ? 12 : 20, 0.26);
otmRound(2.4, -31.9, 0.42, 0, 1.6);
var pul = otmGroup(-6.4, 0.2, -29.2, 0.5);
otmCyl(0.7, 1.3, otmM("wood"), 0, 0.65, 0, pul, 8, 0.6);
otmBox(1.0, 0.06, 0.6, otmM("wood"), 0, 1.38, 0.1, pul).rotation.x = 0.35;
otmRound(-6.4, -29.2, 0.8, 0, 1.6);
OTM_WINGS.slice(0, 6).forEach(function (w, i) {
var s = i < 3 ? -1 : 1, z = -26 + (i % 3) * 8.4;
var m = otmCanvasMat("ban" + w[0], 128, 384, function (c, W, H) {
c.fillStyle = ["#3A0E1E", "#2A1A40", "#0E2A3A", "#1A3A1A", "#4A1A0A", "#5A0A0A"][i];
c.fillRect(0, 0, W, H);
c.fillStyle = "#B8923A";
c.fillRect(0, 0, W, 10);
c.beginPath();
c.moveTo(0, H - 40);
c.lineTo(W / 2, H);
c.lineTo(W, H - 40);
c.lineTo(W, H);
c.lineTo(0, H);
c.fill();
c.fillStyle = "#E8DCC0";
c.font = "bold 22px serif";
c.textAlign = "center";
w[1].replace(/^The /, "").split(" ").forEach(function (t, j) { c.fillText(t, W / 2, 70 + j * 28); });
}, { ds: 1 });
otmPlane(1.1, 3.6, m, s * 13.6, 3.6, z, s < 0 ? Math.PI / 2 : -Math.PI / 2);
});
otmSpot(0, -32.4, 3.6, "🌙 The Cyber Altar of the Obsidian Moon", "light a candle, place an offering", function () { otmAltarCard(); }, { y: 0.6 });
otmSign(["THE OBSIDIAN MOON"], 3.6, 0.5, "#0A080E", "#D8C890", 0, 4.0, -35.5, 0);
for (var l = 0; l < (lite ? 2 : 4); l++) {
var lz = -28 + l * 8;
var g = otmGroup(0, 9.2, lz);
otmCyl(0.015, 2.6, otmM("iron"), 0, 1.3, 0, g, 4);
otmCyl(0.6, 0.1, otmM("iron"), 0, 0, 0, g, 12);
for (var q = 0; q < 6; q++) {
var a = q / 6 * Math.PI * 2;
otmCandle(Math.cos(a) * 0.55, 0.05, Math.sin(a) * 0.55, 0.9, g);
}
}
otmSamhainHall();
},
function () {
var K = OTM.K;
if (!K || !OTM.G || WLD.on !== OTM.key)
return;
if (OTM.myCandles) {
OTM.myCandles.parent && OTM.myCandles.parent.remove(OTM.myCandles);
K.flames = K.flames.filter(function (f) { return !f.mine; });
}
var g = OTM.myCandles = otmGroup(0, 0, 0, 0, OTM.G), L = (typeof otmAltarAll === "function") ? otmAltarAll() : [], keep = OTK;
OTK = K;
var cand = L.filter(function (o) { return o.kind === "candle"; }), has = {};
if (typeof otmSamhainOn === "function" && otmSamhainOn()) {
cand = cand.filter(function (o) { return o.colour !== "samhain"; });
var an = (typeof otmSpNames === "function") ? otmSpNames().length : 0;
for (var a = 0; a < Math.min(an, 16); a++) {
var AF = otmCandle(-2.7 + (a % 16) * 0.36, 0.94, -26.95, 0.8, g, 0x18141C);
AF.mine = 1;
}
}
cand = cand.slice(0, 24);
L.forEach(function (o) { has[o.kind] = 1; });
cand.forEach(function (o, i) {
var c = (typeof OTM_CANDLES !== "undefined") && OTM_CANDLES.filter(function (x) { return x[0] === o.colour; })[0];
var F = otmCandle(-2.0 + (i % 12) * 0.36, 1.8, -33.1 - (i >= 12 ? 0.25 : 0), 0.7, g, c ? c[2] : 0xF4EED8);
F.mine = 1;
});
if (has.incense) {
otmCyl(0.12, 0.16, otmM("gold"), 1.7, 1.88, -34.1, g, 10);
for (var s = 0; s < 3; s++)
otmSph(0.06 + s * 0.03, otmMat(0xD8D0E8, null, { op: 0.25 - s * 0.06 }), 1.7, 2.05 + s * 0.18, -34.1, g, 8);
}
if (has.flowers) {
[-1.7, -1.4].forEach(function (x, i) { otmCyl(0.08, 0.2, otmMat(0x2A2A3A, null), x, 1.9, -34.1, g, 8); [0xD83A5A, 0xF0E8F0, 0x9A6AD8].forEach(function (cl, j) { otmSph(0.06, otmMat(cl, null), x + (j - 1) * 0.06, 2.06, -34.1 + ((i + j) % 2) * 0.05, g, 6); }); });
}
if (has.bread) {
otmSph(0.14, otmMat(0xC88A4A, null), -0.6, 1.86, -34.1, g, 10).scale.set(1.4, 0.6, 1);
otmCyl(0.06, 0.18, otmM("gold"), -0.25, 1.92, -34.1, g, 8, 0.03);
otmCyl(0.055, 0.01, otmMat(0x6A0A1A, null), -0.25, 2.01, -34.1, g, 8);
}
if (has.fruit) {
[[0.4, 0xA81A2A], [0.6, 0xC83A2A], [0.5, 0x6A9A2A]].forEach(function (f, i) { otmSph(0.07, otmMat(f[1], null), f[0], 1.87, -34.0 - (i % 2) * 0.1, g, 8); });
}
if (typeof otmAspect === "function") {
var A = otmAspect(), hx = function (c) { return "#" + ("00000" + c.toString(16)).slice(-6); };
var pm = otmCanvasMat("asp|" + A.deity + "|" + A.glyph + "|" + A.key, 512, 288, function (c, W, H) {
c.fillStyle = "#0A080E";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C8A050";
c.lineWidth = 8;
c.strokeRect(6, 6, W - 12, H - 12);
c.strokeStyle = hx(A.S[3]);
c.lineWidth = 3;
c.strokeRect(18, 18, W - 36, H - 36);
c.save();
c.translate(W / 2 - 60, 14);
c.scale(5, 5);
c.strokeStyle = "#E8C060";
c.lineWidth = 1.3;
c.lineCap = "round";
c.lineJoin = "round";
c.shadowColor = hx(A.S[2]);
c.shadowBlur = 6;
try {
c.stroke(new Path2D(OTM_GLYPH[A.glyph] || OTM_GLYPH.prime));
}
catch (e) { }
c.restore();
c.fillStyle = "#F0D890";
c.textAlign = "center";
c.font = "bold 38px Georgia,serif";
c.fillText(A.deity.toUpperCase(), W / 2, 198, W - 60);
c.fillStyle = "#C8C0E0";
c.font = "italic 24px Georgia,serif";
c.fillText(A.sub + " · " + A.S[1].split(",")[0], W / 2, 240, W - 60);
}, { basic: true });
otmPlane(1.5, 0.84, pm, 0, 2.82, -34.3, 0, g);
otmBox(1.6, 0.94, 0.04, otmM("gold"), 0, 2.82, -34.33, g);
[-0.6, 0.6].forEach(function (x) { otmBox(0.05, 1.0, 0.05, otmM("gold"), x, 2.3, -34.36, g); });
otmPlane(3.6, 2.6, otmCanvasMat("halo|" + A.key, 128, 128, function (c, W, H) { var r = c.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W / 2); r.addColorStop(0, "rgba(" + (A.S[2] >> 16) + "," + ((A.S[2] >> 8) & 255) + "," + (A.S[2] & 255) + ",0.42)"); r.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = r; c.fillRect(0, 0, W, H); }, { basic: true, op: 0.999 }), 0, 2.9, -34.45, 0, g);
var rc = A.S[2], dk = ((((rc >> 16) * 0.42) | 0) << 16) | (((((rc >> 8) & 255) * 0.42) | 0) << 8) | (((rc & 255) * 0.42) | 0);
otmBox(1.1, 0.012, 1.74, otmMat(dk, null), 0, 1.795, -33.6, g);
otmBox(1.14, 0.014, 0.05, otmM("gold"), 0, 1.797, -32.76, g);
}
var bs = otmGroup(2.4, 0.6, -31.9, 0, g);
((OTM.altarLog && OTM.altarLog.basin) || []).slice(0, 8).forEach(function (o, i) {
var b = (typeof OTM_BASIN !== "undefined") && OTM_BASIN.filter(function (x) { return x[0] === o.item; })[0];
if (!b)
return;
var em = otmCanvasMat("bsn|" + b[0], 64, 64, function (c) { c.font = "48px serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(b[2], 32, 36); }, { basic: true, op: 0.999 });
var a = i / 8 * Math.PI * 2, t = otmPlane(0.2, 0.2, em, Math.cos(a) * 0.24, 1.12, Math.sin(a) * 0.24, 0, bs);
t.rotation.y = Math.PI / 2 - a;
});
OTK = keep;
},
function () {
var lite = OTM.lite;
otmRoom({ x0: 10, z0: 6, x1: 60, z1: 14, h: 6, name: "the east gallery", key: "egal", floor: otmM("floor"), wall: otmM("wall"), ceil: otmM("ceil"),
doors: { w: [{ at: 10, w: 3, h: 3.8 }], e: [{ at: 10, w: 3, h: 3.8 }], n: [{ at: 23, w: 2.6, h: 3.4 }, { at: 41, w: 2.6, h: 3.4 }], s: [{ at: 24, w: 2.6, h: 3.4 }] } });
otmRoom({ x0: -60, z0: 6, x1: -10, z1: 14, h: 6, name: "the west gallery", key: "wgal", floor: otmM("floor"), wall: otmM("wall"), ceil: otmM("ceil"),
doors: { e: [{ at: 10, w: 3, h: 3.8 }], w: [{ at: 10, w: 3, h: 3.8 }], n: [{ at: -23, w: 2.6, h: 3.4 }, { at: -41, w: 2.6, h: 3.4 }], s: [{ at: -24, w: 2.6, h: 3.4 }, { at: -45, w: 2.6, h: 3.4 }] } });
[-1, 1].forEach(function (s) {
otmBox(46, 0.03, 2, otmM("carpet"), s * 35, 0.02, 10);
for (var x = 14; x < 58; x += lite ? 8 : 5.5) {
otmCandelabrum(s * x, 0, 7.2);
}
});
[["The Hall of Olympus", 23, 6.4, 0], ["The Hall of the Two Lands", 41, 6.4, 0], ["The Hall of the World Tree", 24, 13.6, Math.PI],
["The Grove Hall", -23, 6.4, 0], ["The House of the Orisha", -41, 6.4, 0], ["The Hall of the Mandate of Heaven", -24, 13.6, Math.PI], ["The Library", -45, 13.6, Math.PI]].forEach(function (r) {
otmSign([r[0]], 3.4, 0.42, "#0A080E", "#D8C890", r[1], 4.2, r[2] + (r[3] ? -0.12 : 0.12), r[3]);
});
},
function () {
var st = otmMat(0x1E1A20, "stone"), rf = otmMat(0x141216, "slate");
otmWall("x", -62, 62, -66.9, 0, 15, 1.2, st, [{ at: -48.2, w: 1.4, h: 2.4 }], { frame: false });
for (var x = -60; x <= 60; x += 10) {
if (Math.abs(x + 48.2) < 3)
continue;
otmBox(1.6, 12, 2.4, st, x, 6, -68.2);
otmSolid(x, -68.2, 0.8, 1.2, 0, 12);
}
var rg = new THREE.CylinderGeometry(0.01, 1, 1, 4, 1);
rg.rotateY(Math.PI / 4);
var roof = new THREE.Mesh(rg, rf);
roof.scale.set(62, 20, 44);
roof.position.set(0, 25.2, -24);
otmP().add(roof);
otmBox(124, 1, 86, rf, 0, 15.2, -24);
[-30, 0, 30].forEach(function (x, i) { otmMoonWindow(x, 9, -67.55, Math.PI, i * 2 + 1); });
},
function (k) {
var B = OTM_WBOX[k], L = OTM_WLOOK[k], row = otmWingRow(k), D = {};
D[B.door] = [{ at: B.at, w: 2.6, h: 3.4 }];
if (k === "norse")
D.e = [{ at: 23, w: 2.6, h: 3.4, bare: 1 }];
if (k === "library")
D.s = [{ at: -45, w: 2.4, h: 3.2, bare: 1 }];
var R = otmRoom({ x0: B.x0, z0: B.z0, x1: B.x1, z1: B.z1, h: B.h, name: row[1], key: k, floor: otmMat(L.floor[0], L.floor[1], { phong: k === "greek" || k === "lhp" ? 70 : 0 }),
wall: otmMat(L.wall[0], L.wall[1]), ceil: otmMat(L.ceil[0], L.ceil[1]), doors: D, frameMat: otmMat(L.plinth, k === "norse" || k === "yoruba" || k === "chinese" ? "wood" : "stone") });
var inX = B.door === "w" ? 1 : B.door === "e" ? -1 : 0, inZ = B.door === "s" ? -1 : B.door === "n" ? 1 : 0;
var far = { x: inX ? (inX > 0 ? R.x1 - 2.6 : R.x0 + 2.6) : R.cx, z: inZ ? (inZ > 0 ? R.z1 - 2.6 : R.z0 + 2.6) : R.cz };
var W = { k: k, R: R, inX: inX, inZ: inZ, far: far, L: L, row: row, D: D };
try {
OTM_WDRESS[k] && OTM_WDRESS[k](W);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] wing " + k, e);
}
otmWingGods(W);
var faceRy = Math.atan2(-inX, -inZ);
otmBox(2.2, 1.0, 1.0, otmMat(L.plinth, "stone"), far.x, 0.5, far.z).rotation.y = faceRy;
otmSolid(far.x, far.z, 1.2, 1.2, 0, 1.1);
otmCandle(far.x - 0.6, 1.0, far.z, 1);
otmCandle(far.x + 0.6, 1.0, far.z, 1);
otmSpot(far.x - inX * 1.6, far.z - inZ * 1.6, 2.2, "✨ The altar of " + row[1].replace(/^The /, "the "), "call any god of this hall by name", function () { otmWingAltar(k); });
if (!otmWingOn(k)) {
var gx = B.door === "w" ? R.x0 : B.door === "e" ? R.x1 : B.at, gz = B.door === "s" ? R.z1 : B.door === "n" ? R.z0 : B.at;
for (var b = 0; b < 9; b++) {
var o = -1.2 + b * 0.3;
otmCyl(0.03, 3.3, otmM("iron"), gx + (inZ ? o : 0) - inX * 0.8, 1.65, gz + (inX ? o : 0) - inZ * 0.8, null, 5);
}
if (inZ)
otmSolid(gx, gz - inZ * 0.8, 1.4, 0.2, 0, 3.4);
else
otmSolid(gx - inX * 0.8, gz, 0.2, 1.4, 0, 3.4);
otmSpot(gx - inX * 1.9, gz - inZ * 1.9, 1.8, "🔒 " + row[1], "read the notice", function () { otmSay("🔒 <b>" + otmEsc(row[1]) + "</b> is closed for now by the Keeper."); });
}
return W;
},
function (W, along, side, a0, a1, t) {
var wl = along === "z" ? (side < 0 ? "w" : "e") : (side < 0 ? "n" : "s"), lo = Math.min(a0, a1), hi = Math.max(a0, a1), cut = [];
((W.D && W.D[wl]) || []).forEach(function (O) { cut.push([O.at - O.w / 2 - 1.1, O.at + O.w / 2 + 1.1]); });
var segs = [[lo, hi]];
cut.forEach(function (c) { var nx = []; segs.forEach(function (sg) { if (c[1] <= sg[0] || c[0] >= sg[1]) {
nx.push(sg);
return;
} if (c[0] > sg[0])
nx.push([sg[0], c[0]]); if (c[1] < sg[1])
nx.push([c[1], sg[1]]); }); segs = nx; });
var tot = 0;
segs.forEach(function (sg) { tot += sg[1] - sg[0]; });
if (!segs.length || tot <= 0)
return a0 + (a1 - a0) * t;
var d = (a1 >= a0 ? t : 1 - t) * tot;
for (var i = 0; i < segs.length; i++) {
var L = segs[i][1] - segs[i][0];
if (d <= L || i === segs.length - 1)
return segs[i][0] + Math.min(d, L);
d -= L;
}
return a0 + (a1 - a0) * t;
},
function (W) {
var list = (OTM_ROSTER[W.row[2]] || []).slice(), cap = OTM.lite ? 6 : 12, R = W.R, L = W.L, k = W.k;
if (k === "dragons")
list = list.filter(function (g) { return otmWyrmIs(g[0]); });
list = list.slice(0, cap);
var n = list.length, half = Math.ceil(n / 2), along = W.inZ ? "z" : "x";
var a0 = along === "z" ? (W.inZ < 0 ? R.z1 - 3.2 : R.z0 + 3.2) : (W.inX > 0 ? R.x0 + 3.2 : R.x1 - 3.2), a1 = along === "z" ? (W.inZ < 0 ? R.z0 + 4.6 : R.z1 - 4.6) : (W.inX > 0 ? R.x1 - 4.6 : R.x0 + 4.6);
list.forEach(function (g, i) {
var side = i < half ? -1 : 1, j = i < half ? i : i - half, cnt = i < half ? half : n - half, t = cnt > 1 ? j / (cnt - 1) : 0.5, a = otmWingAlong(W, along, side, a0, a1, t);
var x = along === "z" ? (side < 0 ? R.x0 + 1.3 : R.x1 - 1.3) : a, z = along === "z" ? a : (side < 0 ? R.z0 + 1.3 : R.z1 - 1.3);
var ry = along === "z" ? (side < 0 ? Math.PI / 2 : -Math.PI / 2) : (side < 0 ? 0 : Math.PI);
var nx = along === "z" ? (side < 0 ? 1 : -1) : 0, nz = along === "z" ? 0 : (side < 0 ? 1 : -1), wy = k === "dragons" && otmWyrmIs(g[0]);
if (wy) {
x += nx * 0.35;
z += nz * 0.35;
otmWyrmRock(x, z, ry);
(OTK.figs = OTK.figs || []).push({ id: g[0], x: x, y: 0.62, z: z, ry: ry, wing: k, wyrm: 1 });
}
else {
otmBox(1.3, 0.7, 1.3, otmMat(L.plinth, "stone"), x, 0.35, z);
otmBox(1.4, 0.08, 1.4, otmM("gold"), x, 0.72, z);
otmSolid(x, z, 0.7, 0.7, 0, 2.4);
(OTK.figs = OTK.figs || []).push({ id: g[0], x: x, y: 0.76, z: z, ry: ry, wing: k });
}
var sd = wy ? 1.25 : 0.66, tk = wy ? 2.1 : 1.5, dk = OTM_DRAGON_KEY[g[0]] || g[0];
if (!wy && typeof DEITY !== "undefined" && DEITY[dk] && DEITY[dk].dragon) {
otmSolid(x + nx * 0.5, z + nz * 0.5, nx ? 1.7 : 1.1, nx ? 1.1 : 1.7, 0, 3.6);
tk = 2.7;
}
otmSpot(x + nx * tk, z + nz * tk, 1.5, "💬 " + g[1], "speak with " + g[1], function () { otmTalk(W.row[2] + ":" + g[0], "your shrine in " + W.row[1] + ", one of the wings of the Temple of the Obsidian Moon"); });
otmSign([g[1]], 1.2, 0.26, "#0A080E", "#D8C890", x + nx * sd, wy ? 0.3 : 0.42, z + nz * sd, along === "z" ? (side < 0 ? Math.PI / 2 : -Math.PI / 2) : (side < 0 ? 0 : Math.PI));
});
},
function () {
var L = worldLocal(), r = otmRoomAt(OTK, L.x, L.z, L.y - 1.7);
if (!r || !OTK.figs)
return;
var t = performance.now() / 1000, dt = t - (OTK.figT || t);
OTK.figT = t;
OTK.figs.forEach(function (f) { if (f.wing !== r.key)
return; if (!f.g)
f.g = f.wyrm ? otmWyrm(f.id, f.x, f.y, f.z, f.ry, OTM.G) : otmGodFigure(f.id, f.x, f.y, f.z, f.ry, 1.0, OTM.G); if (f.g.userData.drg)
f.g.userData.drg(t, dt); });
},
function (k) {
var row = otmWingRow(k), list = OTM_ROSTER[row[2]] || [], b = "", fns = {};
otmSpiritsLoad().then(function (D) {
list.forEach(function (g) { var v = otmVoice(row[2] + ":" + g[0]); b += worldBtn("g_" + g[0], g[1], v ? v.e : ""); fns["g_" + g[0]] = function () { worldCard(null); otmTalk(row[2] + ":" + g[0], "the altar of " + row[1] + ", in the Temple of the Obsidian Moon"); }; });
var blurb = (D && D.blurb && D.blurb[row[2]]) || row[4];
worldCard(worldFacts("✨ " + row[1], row[4], [], [blurb, "Call any of them by name, and they answer in their own voice."]) + (k === "lhp" ? otmOathBtns(fns) : "") + b, fns);
});
},
function (W) {
var R = W.R, m = otmMat(0xF0ECE4, "marble"), lite = OTM.lite;
for (var i = 0; i < (lite ? 3 : 4); i++) {
var z = R.z1 - 4 - i * 4.2;
[R.x0 + 4, R.x1 - 4].forEach(function (x) { otmCyl(0.42, W.R.h - 0.6, m, x, (W.R.h - 0.6) / 2, z, null, lite ? 10 : 20, 0.48); otmBox(1.1, 0.3, 1.1, m, x, W.R.h - 0.45, z); otmRound(x, z, 0.5, 0, W.R.h); });
}
var fr = otmCanvasMat("meander", 512, 32, function (c, Wd, H) {
c.fillStyle = "#1A2A4A";
c.fillRect(0, 0, Wd, H);
c.strokeStyle = "#D8B060";
c.lineWidth = 3;
for (var x = 0; x < Wd; x += 32) {
c.beginPath();
c.moveTo(x + 2, H - 4);
c.lineTo(x + 2, 4);
c.lineTo(x + 26, 4);
c.lineTo(x + 26, 22);
c.lineTo(x + 10, 22);
c.lineTo(x + 10, 12);
c.lineTo(x + 18, 12);
c.stroke();
}
});
otmBox(R.w - 0.8, 0.5, 0.02, fr, R.cx, R.h - 0.6, R.z0 + 0.22);
otmBox(0.02, 0.5, R.d - 0.8, fr, R.x0 + 0.22, R.h - 0.6, R.cz);
otmBox(0.02, 0.5, R.d - 0.8, fr, R.x1 - 0.22, R.h - 0.6, R.cz);
var br = otmMat(0x8A6A3A, "metal", { phong: 60 });
var tz = R.cz + 1;
for (var l = 0; l < 3; l++) {
var a = l / 3 * Math.PI * 2, lg = otmCyl(0.05, 1.3, br, R.cx + Math.cos(a) * 0.4, 0.65, tz + Math.sin(a) * 0.4, null, 6);
lg.rotation.z = Math.cos(a) * 0.2;
lg.rotation.x = -Math.sin(a) * 0.2;
}
otmCyl(0.6, 0.3, br, R.cx, 1.35, tz, null, 16, 0.4);
otmFlame(R.cx, 1.5, tz, 4, 0xFF9A40);
otmRound(R.cx, tz, 0.7, 0, 1.6);
[[R.x0 + 2, R.z1 - 2], [R.x1 - 2, R.z1 - 2]].forEach(function (p) { otmCyl(0.4, 1, otmMat(0xA0502A, null), p[0], 0.5, p[1], null, 12, 0.3); otmCyl(0.08, 1.4, otmMat(0x5A4A3A, "bark"), p[0], 1.6, p[1], null, 6); otmSph(0.9, otmMat(0x6A7A4A, "foliage"), p[0], 2.6, p[1], null, 10); otmRound(p[0], p[1], 0.5, 0, 3); });
},
function (W) {
var R = W.R, sd = otmMat(0xD8B880, "stone"), lite = OTM.lite;
var col = otmCanvasMat("lotuscol", 64, 256, function (c, Wd, H) { c.fillStyle = "#D8B880"; c.fillRect(0, 0, Wd, H); ["#1A4A8A", "#B83A2A", "#2A7A4A", "#D8A030"].forEach(function (cl, i) { c.fillStyle = cl; c.fillRect(0, 20 + i * 58, Wd, 10); c.fillRect(0, 40 + i * 58, Wd, 4); }); });
for (var i = 0; i < (lite ? 3 : 4); i++) {
var z = R.z1 - 4 - i * 4.2;
[R.x0 + 4, R.x1 - 4].forEach(function (x) { otmCyl(0.55, R.h - 1.4, col, x, (R.h - 1.4) / 2, z, null, lite ? 10 : 18); otmCyl(0.85, 1.0, otmMat(0x3A7A5A, null), x, R.h - 0.9, z, null, lite ? 10 : 18, 0.55); otmRound(x, z, 0.6, 0, R.h); });
}
var hg = otmCanvasMat("glyphs", 512, 64, function (c, Wd, H) {
c.fillStyle = "#D8C090";
c.fillRect(0, 0, Wd, H);
c.strokeStyle = "#2A1A0A";
c.fillStyle = "#1A4A8A";
c.lineWidth = 2.5;
for (var x = 8; x < Wd; x += 28) {
var k = (x / 28 | 0) % 6;
c.beginPath();
if (k === 0) {
c.arc(x + 8, 20, 6, 0, 6.3);
c.moveTo(x + 8, 26);
c.lineTo(x + 8, 50);
c.moveTo(x, 34);
c.lineTo(x + 16, 34);
}
else if (k === 1) {
c.ellipse(x + 8, 32, 9, 5, 0, 0, 6.3);
c.moveTo(x + 8, 32);
c.arc(x + 8, 32, 2, 0, 6.3);
}
else if (k === 2) {
c.moveTo(x, 50);
c.lineTo(x + 8, 14);
c.lineTo(x + 16, 50);
}
else if (k === 3) {
for (var w = 0; w < 3; w++) {
c.moveTo(x, 20 + w * 10);
c.lineTo(x + 4, 16 + w * 10);
c.lineTo(x + 8, 20 + w * 10);
c.lineTo(x + 12, 16 + w * 10);
c.lineTo(x + 16, 20 + w * 10);
}
}
else if (k === 4) {
c.moveTo(x + 4, 50);
c.lineTo(x + 4, 14);
c.quadraticCurveTo(x + 16, 10, x + 12, 24);
}
else {
c.rect(x, 22, 16, 20);
}
c.stroke();
}
});
otmBox(R.w - 0.8, 0.6, 0.02, hg, R.cx, 2.6, R.z0 + 0.22);
otmBox(0.02, 0.6, R.d - 0.8, hg, R.x0 + 0.22, 2.6, R.cz);
otmBox(0.02, 0.6, R.d - 0.8, hg, R.x1 - 0.22, 2.6, R.cz);
var stars = otmCanvasMat("nutsky", 256, 256, function (c, Wd, H) { c.fillStyle = "#14205A"; c.fillRect(0, 0, Wd, H); c.fillStyle = "#E8D070"; for (var s = 0; s < 60; s++) {
var x = (s * 53) % Wd, y = (s * 97) % H;
c.beginPath();
for (var p = 0; p < 5; p++) {
var a = p * 2.513 - Math.PI / 2;
c.lineTo(x + Math.cos(a) * 5, y + Math.sin(a) * 5);
a += 1.256;
c.lineTo(x + Math.cos(a) * 2, y + Math.sin(a) * 2);
}
c.fill();
} }, { rep: [3, 3] });
var ce = otmPlane(R.w - 0.2, R.d - 0.2, stars, R.cx, R.h - 0.02, R.cz, 0);
ce.rotation.x = Math.PI / 2;
var ob = otmCyl(0.01, 6, otmMat(0x0E0C10, "marble", { phong: 100 }), R.cx, 3, R.cz + 1, null, 4, 0.7);
ob.rotation.y = Math.PI / 4;
otmBox(1.6, 0.4, 1.6, sd, R.cx, 0.2, R.cz + 1);
otmSolid(R.cx, R.cz + 1, 0.8, 0.8, 0, 6);
otmPlane(0.6, 0.6, otmGlowM(0xE8C860), R.cx, 5.9, R.cz + 1.45, 0);
},
function (W) {
var R = W.R, lite = OTM.lite, wd = otmMat(0x4A3624, "wood"), dk = otmMat(0x2A1E14, "wood");
for (var i = 0; i < (lite ? 3 : 4); i++) {
var z = R.z0 + 3.5 + i * 4;
[R.x0 + 3, R.x1 - 3].forEach(function (x) { otmBox(0.5, R.h, 0.5, dk, x, R.h / 2, z); otmBox(0.6, 0.3, 0.6, otmMat(0x8A6A3A, "wood"), x, 2.2, z); otmSolid(x, z, 0.3, 0.3, 0, R.h); });
}
for (var s = 0; s < (lite ? 6 : 12); s++) {
var side = s % 2 ? 1 : -1, z2 = R.z0 + 2.5 + Math.floor(s / 2) * 2.6;
var sh = otmCyl(0.45, 0.06, otmMat([0x8A1A1A, 0x1A3A6A, 0xC8A030, 0x2A5A2A][s % 4], "wood"), side > 0 ? R.x1 - 0.25 : R.x0 + 0.25, 2.6, z2, null, 16);
sh.rotation.z = Math.PI / 2;
otmSph(0.09, otmM("iron"), side > 0 ? R.x1 - 0.3 : R.x0 + 0.3, 2.6, z2, null, 8);
}
otmBox(1.6, 0.3, 6, otmMat(0x3A3634, "stone"), R.cx, 0.15, R.cz + 2.4);
otmSolid(R.cx, R.cz + 2.4, 0.8, 3, 0, 0.4);
for (var f = 0; f < (lite ? 3 : 5); f++)
otmFlame(R.cx, 0.3, R.cz + 0.4 + f * 1.0, 3.2, 0xFF8A30);
var tx = R.cx, tz = R.cz - 2.6, bk = otmMat(0x5A4A3A, "bark");
otmCyl(0.9, R.h, bk, tx, R.h / 2, tz, null, 12, 1.3);
otmRound(tx, tz, 1.3, 0, R.h);
for (var r = 0; r < 6; r++) {
var a = r / 6 * Math.PI * 2, root = otmCyl(0.25, 3, bk, tx + Math.cos(a) * 1.6, 0.15, tz + Math.sin(a) * 1.6, null, 6, 0.1);
root.rotation.z = Math.PI / 2;
root.rotation.y = -a;
}
for (var b = 0; b < (lite ? 5 : 9); b++) {
var a2 = b * 2.4, br = otmCyl(0.18, 4, bk, tx + Math.cos(a2) * 1.6, R.h - 1.6, tz + Math.sin(a2) * 1.6, null, 6, 0.3);
br.rotation.z = Math.cos(a2) * 1.0;
br.rotation.x = -Math.sin(a2) * 1.0;
otmSph(1.3, otmMat(0x3A5A2A, "foliage"), tx + Math.cos(a2) * 3.0, R.h - 0.9, tz + Math.sin(a2) * 3.0, null, 8);
}
otmSecret({ id: "dragons", kind: "fireplace", dir: "z", at: 23, c: 33.7, y: 0, w: 2.4, h: 3.4, face: -1, name: "The back of the great fireplace sinks into the floor: a passage to the Wyrm Hall", hint: "🔥 The great fireplace: the fire draws strangely, as if there were a room behind it" });
},
function (W) {
var R = W.R, lite = OTM.lite, bk = otmMat(0x4A3A2A, "bark"), lf = otmMat(0x2A4A22, "foliage");
for (var i = 0; i < (lite ? 4 : 8); i++) {
var a = i / (lite ? 4 : 8) * Math.PI * 2 + 0.3, x = R.cx + Math.cos(a) * 6.2, z = R.cz + Math.sin(a) * 6.2;
otmCyl(0.35, R.h - 2, bk, x, (R.h - 2) / 2, z, null, 8, 0.5);
otmSph(2.2, lf, x, R.h - 1.6, z, null, 8);
otmRound(x, z, 0.5, 0, R.h);
}
for (var s = 0; s < 7; s++) {
var a2 = s / 7 * Math.PI * 2, sx = R.cx + Math.cos(a2) * 3, sz = R.cz + Math.sin(a2) * 3;
var st = otmBox(0.6, 1.8 + (s % 3) * 0.3, 0.4, otmMat(0x6A6860, "stone"), sx, 0.9, sz);
st.rotation.y = -a2;
otmRound(sx, sz, 0.4, 0, 2);
}
var og = otmBox(0.5, 2.2, 0.4, otmMat(0x7A786C, "stone"), R.cx, 1.1, R.cz);
otmSolid(R.cx, R.cz, 0.3, 0.25, 0, 2.2);
for (var n = 0; n < 10; n++)
otmBox(0.2, 0.03, 0.42, otmMat(0x2A2A24, null), R.cx + (n % 2 ? 0.15 : -0.15), 0.4 + n * 0.17, R.cz);
otmCyl(0.9, 0.6, otmMat(0x5A5850, "stone"), R.cx + 4.4, 0.3, R.z1 - 3, null, 14);
otmCyl(0.75, 0.02, otmMat(0x1A2A3A, null, { phong: 120 }), R.cx + 4.4, 0.58, R.z1 - 3, null, 14);
otmRound(R.cx + 4.4, R.z1 - 3, 1, 0, 0.7);
var tri = otmCanvasMat("triskele", 256, 256, function (c, Wd, H) { c.clearRect(0, 0, Wd, H); c.strokeStyle = "#C8C0A0"; c.lineWidth = 8; for (var k = 0; k < 3; k++) {
c.save();
c.translate(Wd / 2, H / 2);
c.rotate(k * 2.094);
c.beginPath();
for (var t = 0; t < 4.5; t += 0.1) {
var r = 10 + t * 14;
c.lineTo(Math.cos(t) * r * 0.6 + 30, Math.sin(t) * r * 0.6);
}
c.stroke();
c.restore();
} }, { basic: true, op: 0.75 });
var tm = otmPlane(4, 4, tri, R.cx, 0.03, R.cz, 0);
tm.rotation.x = -Math.PI / 2;
},
function (W) {
var R = W.R, lite = OTM.lite, wd = otmMat(0x5A3418, "wood");
for (var i = 0; i < (lite ? 3 : 4); i++) {
var z = R.z1 - 4 - i * 4;
[R.x0 + 3.5, R.x1 - 3.5].forEach(function (x) { otmBox(0.5, R.h, 0.5, wd, x, R.h / 2, z); for (var b = 0; b < 4; b++)
otmBox(0.58, 0.12, 0.58, otmMat([0xD8A030, 0x1A1A1A, 0xB83A2A, 0xE8E4D8][b], "wood"), x, 1.2 + b * 1.2, z); otmSolid(x, z, 0.3, 0.3, 0, R.h); });
}
for (var c = 0; c < 3; c++) {
var cx = R.cx - 3 + c * 3, cz = R.cz + 1.2;
otmCyl(0.08, 1.2, wd, cx, 0.6, cz, null, 6);
var cr = otmCyl(0.22, 0.6, otmMat([0x2A6A3A, 0xC8A030, 0xE8E4D8][c], null), cx, 1.5, cz, null, 10, 0.26);
for (var f = 0; f < 6; f++)
otmCyl(0.008, 0.3, otmMat(0xD8C8A0, null), cx + Math.cos(f) * 0.2, 1.08, cz + Math.sin(f) * 0.2, null, 3);
otmRound(cx, cz, 0.3, 0, 1.9);
}
for (var k = 0; k < (lite ? 4 : 8); k++) {
otmSph(0.3, otmMat([0xA0703A, 0x8A5A2A][k % 2], null), R.x0 + 1 + ((k * 1.3) % 3), 0.3, R.z1 - 1.2 - (k % 2) * 0.8, null, 10);
}
otmCyl(0.7, 0.08, wd, R.cx, 0.9, R.cz - 3, null, 20);
otmCyl(0.08, 0.86, wd, R.cx, 0.43, R.cz - 3, null, 6);
otmCyl(0.5, 0.02, otmMat(0xE8E0C8, null), R.cx, 0.95, R.cz - 3, null, 20);
otmRound(R.cx, R.cz - 3, 0.75, 0, 1);
otmBox(5, 0.04, 2, otmMat(0x3A6A6A, null, { phong: 120, e: 0x0A1A1A }), R.cx, 0.03, R.z0 + 3);
otmSolid(R.cx, R.z0 + 3, 2.5, 1, 0, 0.4);
for (var p = 0; p < (lite ? 3 : 6); p++)
otmSph(0.12, otmMat(0xE8C040, null), R.cx - 2 + p * 0.8, 0.08, R.z0 + 3 + (p % 2 ? 0.4 : -0.4), null, 6);
},
function (W) {
var R = W.R, lite = OTM.lite, red = otmMat(0xA01810, "wood", { phong: 60 }), gd = otmM("gold");
for (var i = 0; i < (lite ? 3 : 4); i++) {
var z = R.z0 + 3.5 + i * 4;
[R.x0 + 3.5, R.x1 - 3.5].forEach(function (x) { otmCyl(0.36, R.h, red, x, R.h / 2, z, null, lite ? 10 : 16); otmCyl(0.5, 0.4, otmMat(0x6A6A68, "stone"), x, 0.2, z, null, 12); otmBox(1.2, 0.3, 0.4, gd, x, R.h - 0.5, z); otmRound(x, z, 0.45, 0, R.h); });
}
var gate = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.35, 8, lite ? 20 : 36), otmMat(0xE8E0D0, "plaster"));
gate.position.set(R.cx, 2.2, R.z1 - 3.2);
otmP().add(gate);
otmBox(1.2, 2.0, 0.7, otmMat(0x5A4A2A, "metal"), R.cx, 1, R.cz);
otmCyl(0.6, 0.6, otmMat(0x5A4A2A, "metal"), R.cx, 2.2, R.cz, null, 12, 0.5);
otmSolid(R.cx, R.cz, 0.7, 0.5, 0, 2.6);
for (var s = 0; s < (lite ? 3 : 5); s++) {
var st = otmCyl(0.004, 0.4, otmMat(0x8A3A1A, null), R.cx - 0.3 + s * 0.15, 2.7, R.cz, null, 3);
}
for (var l = 0; l < (lite ? 4 : 8); l++) {
var lx = R.x0 + 3 + (l % 4) * ((R.w - 6) / 3), lz = R.cz + (l < 4 ? -3 : 3);
otmCyl(0.01, 1.2, otmM("iron"), lx, R.h - 0.6, lz, null, 3);
var lan = otmSph(0.36, otmMat(0xE82A1A, null, { e: 0x801008, ei: 0.9 }), lx, R.h - 1.5, lz, null, 10);
lan.scale.y = 1.25;
otmCyl(0.2, 0.08, gd, lx, R.h - 1.05, lz, null, 8);
otmCyl(0.2, 0.08, gd, lx, R.h - 1.95, lz, null, 8);
}
},
function (W) {
var R = W.R, lite = OTM.lite, P = otmP();
var coins = otmCanvasMat("hoardcoins", 256, 256, function (c, Wd, H) {
c.fillStyle = "#8A6A1A";
c.fillRect(0, 0, Wd, H);
for (var i = 0; i < 420; i++) {
var x = (i * 67) % Wd, y = (i * 41 + ((i * 13) % 17)) % H, r = 5 + (i % 4);
var g = c.createRadialGradient(x - 2, y - 2, 1, x, y, r);
g.addColorStop(0, "#FFF0A0");
g.addColorStop(0.6, "#D8A830");
g.addColorStop(1, "#6A4A10");
c.fillStyle = g;
c.beginPath();
c.ellipse(x, y, r, r * 0.7, (i % 5) * 0.6, 0, 6.3);
c.fill();
}
for (var j = 0; j < 14; j++) {
c.fillStyle = ["#C81A3A", "#1A8A4A", "#2A4AC8", "#E8E8F8"][j % 4];
c.beginPath();
c.arc((j * 97) % Wd, (j * 59) % H, 3, 0, 6.3);
c.fill();
}
}, { rep: [2, 2] });
coins.emissive = new THREE.Color(0x1A1204);
coins.emissiveIntensity = 1;
var hoard = new THREE.Mesh(new THREE.SphereGeometry(3.2, lite ? 16 : 28, lite ? 8 : 14, 0, Math.PI * 2, 0, Math.PI / 2), coins);
hoard.scale.y = 0.42;
hoard.position.set(R.cx, 0, R.cz);
P.add(hoard);
otmRound(R.cx, R.cz, 3.1, 0, 1.5);
var mound2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, lite ? 12 : 20, lite ? 6 : 10, 0, Math.PI * 2, 0, Math.PI / 2), coins);
mound2.scale.y = 0.5;
mound2.position.set(R.cx + 1.6, 0.2, R.cz - 1.2);
P.add(mound2);
var gold = otmMat(0xD8A830, "metal", { phong: 90, spec: 0xFFE080 }), wd = otmMat(0x3A2214, "wood"), ir = otmM("iron");
for (var c = 0; c < (lite ? 16 : 40); c++) {
var a = c * 2.39, r = 3.1 + (c % 5) * 0.35;
otmCyl(0.08, 0.02, gold, R.cx + Math.cos(a) * r, 0.012, R.cz + Math.sin(a) * r, null, 8);
}
[[-1.8, 1.6, 0.5], [1.9, 1.9, -0.7], [-0.6, -2.2, 2.6]].forEach(function (p, i) {
var g = otmGroup(R.cx + p[0], 0.55 + (i === 2 ? 0.1 : 0), R.cz + p[1], p[2]);
otmBox(0.9, 0.5, 0.55, wd, 0, 0.25, 0, g);
[-0.38, 0, 0.38].forEach(function (o) { otmBox(0.06, 0.52, 0.58, ir, o, 0.25, 0, g); });
var lid = otmGroup(0, 0.5, -0.27, 0, g);
lid.rotation.x = -1.9;
otmBox(0.9, 0.12, 0.55, wd, 0, 0.06, 0.27, lid);
otmBox(0.8, 0.06, 0.45, coins, 0, 0.5, 0, g);
});
var cr = otmCyl(0.16, 0.14, gold, R.cx - 0.3, 1.38, R.cz + 0.2, null, 12, 0.15);
for (var q = 0; q < 6; q++) {
var qa = q / 6 * Math.PI * 2;
var pk = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 4), gold);
pk.position.set(R.cx - 0.3 + Math.cos(qa) * 0.15, 1.5, R.cz + 0.2 + Math.sin(qa) * 0.15);
P.add(pk);
}
[[0.8, 0.6], [-1.2, -0.4], [0.4, -1.0]].forEach(function (p) { otmCyl(0.06, 0.04, gold, R.cx + p[0], 1.18, R.cz + p[1], null, 8); otmCyl(0.015, 0.14, gold, R.cx + p[0], 1.27, R.cz + p[1], null, 5); otmCyl(0.08, 0.1, gold, R.cx + p[0], 1.39, R.cz + p[1], null, 10, 0.03); });
var sw = otmGroup(R.cx + 0.3, 1.2, R.cz - 0.4, 0.4);
sw.rotation.z = 0.18;
otmBox(0.06, 1.0, 0.015, otmMat(0xD8DCE8, "metal", { phong: 120 }), 0, 0.3, 0, sw);
otmBox(0.3, 0.04, 0.05, gold, 0, 0.82, 0, sw);
otmCyl(0.022, 0.2, otmMat(0x3A1A0A, null), 0, 0.94, 0, sw, 6);
otmSph(0.04, gold, 0, 1.06, 0, sw, 6);
for (var gm = 0; gm < (lite ? 6 : 14); gm++)
otmSph(0.07, otmMat([0xC81A3A, 0x1A8A4A, 0x2A4AC8, 0xE8E8F8][gm % 4], null, { phong: 140, e: [0x3A0610, 0x063A14, 0x0A1A4A, 0x3A3A40][gm % 4], ei: 1 }), R.cx + Math.cos(gm * 1.7) * (0.8 + gm % 3 * 0.6), 0.9 + Math.sin(gm) * 0.15, R.cz + Math.sin(gm * 1.7) * (0.8 + gm % 3 * 0.6), null, 8);
[[1.2, -4.6], [1.2, 4.6]].forEach(function (p) {
var bx = R.cx + p[0], bz = R.cz + p[1];
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2; otmLimb([bx + Math.cos(a) * 0.35, 0, bz + Math.sin(a) * 0.35], [bx + Math.cos(a) * 0.2, 1.0, bz + Math.sin(a) * 0.2], 0.03, 0.03, ir, P, 5); });
otmCyl(0.45, 0.3, ir, bx, 1.1, bz, null, 12, 0.25);
otmFlame(bx - 0.1, 1.22, bz, 3.4, 0xFF7A20);
otmFlame(bx + 0.15, 1.22, bz + 0.1, 2.6, 0xFFA040);
otmRound(bx, bz, 0.5, 0, 1.4);
});
[R.z0 + 0.3, R.z1 - 0.3].forEach(function (z, si) {
for (var t = 0; t < (lite ? 3 : 5); t++) {
var tx = R.x0 + 3 + t * ((R.w - 6) / ((lite ? 3 : 5) - 1)), g = otmGroup(tx, 3.6, z, si ? Math.PI : 0);
otmBox(0.12, 0.3, 0.06, ir, 0, 0, 0.03, g);
var arm = otmCyl(0.025, 0.4, ir, 0, 0.05, 0.2, g, 5);
arm.rotation.x = 0.7;
otmCyl(0.07, 0.22, otmMat(0x3A2214, "wood"), 0, 0.28, 0.32, g, 6, 0.05);
otmFlame(0, 0.38, 0.32, 2.2, 0xFF8A30, g);
}
});
var stm = otmMat(0x2A2420, "stone");
for (var s2 = 0; s2 < (lite ? 12 : 30); s2++) {
var a2 = s2 * 2.39, r2 = (s2 * 1.7) % 8.5, sx = R.cx + Math.cos(a2) * r2, sz = R.cz + Math.sin(a2) * r2 * 0.95, sl = 0.6 + (s2 % 5) * 0.45;
var st = new THREE.Mesh(new THREE.ConeGeometry(0.18 + (s2 % 3) * 0.08, sl, 6), stm);
st.rotation.x = Math.PI;
st.position.set(sx, R.h - sl / 2, sz);
P.add(st);
}
var eye = otmSph(0.9, otmMat(0xE8A020, null, { e: 0x6A3A08, ei: 1 }), R.x1 - 0.4, 4.4, R.cz, null, 16);
eye.scale.set(0.3, 1, 1.4);
var pu = otmBox(0.05, 1.5, 0.18, otmMat(0x0A0604, null), R.x1 - 0.66, 4.4, R.cz);
var sock = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.18, 6, lite ? 16 : 28), otmMat(0x3A302A, "stone"));
sock.position.set(R.x1 - 0.3, 4.4, R.cz);
sock.rotation.y = Math.PI / 2;
sock.scale.set(1, 0.75, 1);
P.add(sock);
var eg = (typeof wGlow === "function") ? wGlow(0xFFA030, 3.2, 0.18) : null;
if (eg) {
eg.position.set(R.x1 - 0.8, 4.4, R.cz);
P.add(eg);
}
otmSign(["THE WYRM HALL", "the dragons and great serpents of every people"], 4.2, 0.6, "#0A0604", "#D8A830", R.cx, 6.2, R.z0 + 0.24, 0);
},
function (W) {
var R = W.R, lite = OTM.lite, cr = otmMat(0x5A0A1A, null), bl = otmMat(0x08060A, "marble", { phong: 120 });
for (var i = 0; i < (lite ? 2 : 3); i++) {
var z = R.z0 + 4 + i * 4.2;
[R.x0 + 3, R.x1 - 3].forEach(function (x) { otmPillar(x, z, 0, R.h - 0.4, 0.42); });
}
[R.x0 + 0.24, R.x1 - 0.24].forEach(function (x, s) { for (var h = 0; h < 3; h++)
otmPlane(1.2, R.h - 1.2, cr, x, (R.h - 1.2) / 2 + 0.6, R.z0 + 3 + h * 4.6, s ? -Math.PI / 2 : Math.PI / 2); });
var tree = otmCanvasMat("qtree", 256, 384, otmTapestryArt("lhp"), { basic: true, op: 0.7 });
var tm = otmPlane(4, 6, tree, R.cx, 0.03, R.cz, 0);
tm.rotation.x = -Math.PI / 2;
otmOathAltar(R);
},
function (k) {
var C = OTM_DAMASK[k] || OTM_DAMASK.crimson;
return otmCanvasMat("damask-" + k, 128, 160, function (c, W, H) {
c.fillStyle = C[0];
c.fillRect(0, 0, W, H);
function motif(cx, cy, s) {
c.save();
c.translate(cx, cy);
c.scale(s, s);
c.fillStyle = C[1];
for (var m = -1; m <= 1; m += 2) {
c.save();
c.scale(m, 1);
c.beginPath();
c.moveTo(0, -46);
c.bezierCurveTo(10, -30, 22, -28, 18, -10);
c.bezierCurveTo(30, -14, 36, 4, 22, 10);
c.bezierCurveTo(30, 22, 18, 34, 8, 26);
c.bezierCurveTo(10, 38, 4, 44, 0, 48);
c.closePath();
c.fill();
c.beginPath();
c.moveTo(4, -8);
c.bezierCurveTo(34, -40, 48, -6, 40, 10);
c.bezierCurveTo(44, -8, 26, -14, 10, 0);
c.closePath();
c.fill();
c.restore();
}
c.fillStyle = C[0];
c.beginPath();
c.ellipse(0, 2, 5, 12, 0, 0, 6.3);
c.fill();
c.restore();
}
motif(W / 2, H / 2, 1);
motif(0, 0, 0.55);
motif(W, 0, 0.55);
motif(0, H, 0.55);
motif(W, H, 0.55);
c.globalAlpha = 0.06;
c.fillStyle = "#FFFFFF";
for (var y = 0; y < H; y += 2)
c.fillRect(0, y, W, 1);
c.globalAlpha = 1;
});
},
function (k) {
var C = OTM_RUGS[k] || OTM_RUGS.crimson;
return otmCanvasMat("rug-" + k, 512, 512, function (c, W, H) {
c.fillStyle = C[1];
c.fillRect(0, 0, W, H);
c.fillStyle = C[0];
c.fillRect(46, 46, W - 92, H - 92);
c.strokeStyle = C[2];
c.lineWidth = 4;
c.strokeRect(10, 10, W - 20, H - 20);
c.strokeRect(40, 40, W - 80, H - 80);
c.lineWidth = 2;
c.strokeRect(50, 50, W - 100, H - 100);
c.fillStyle = C[2];
for (var i = 0; i < W - 60; i += 24) {
[[30 + i, 25], [30 + i, H - 25], [25, 30 + i], [W - 25, 30 + i]].forEach(function (p) { c.beginPath(); c.moveTo(p[0], p[1] - 7); c.lineTo(p[0] + 7, p[1]); c.lineTo(p[0], p[1] + 7); c.lineTo(p[0] - 7, p[1]); c.fill(); });
}
c.fillStyle = C[4];
for (var j = 0; j < W - 60; j += 24) {
[[42 + j, 25], [42 + j, H - 25], [25, 42 + j], [W - 25, 42 + j]].forEach(function (p) { c.beginPath(); c.arc(p[0], p[1], 3, 0, 6.3); c.fill(); });
}
c.save();
c.translate(W / 2, H / 2);
c.fillStyle = C[1];
c.beginPath();
c.moveTo(0, -150);
c.lineTo(110, 0);
c.lineTo(0, 150);
c.lineTo(-110, 0);
c.closePath();
c.fill();
c.strokeStyle = C[2];
c.lineWidth = 3;
c.stroke();
for (var r = 0; r < 16; r++) {
c.save();
c.rotate(r * Math.PI / 8);
c.fillStyle = r % 2 ? C[3] : C[2];
c.beginPath();
c.moveTo(0, 0);
c.quadraticCurveTo(14, -40, 0, -78);
c.quadraticCurveTo(-14, -40, 0, 0);
c.fill();
c.restore();
}
c.fillStyle = C[4];
c.beginPath();
c.arc(0, 0, 22, 0, 6.3);
c.fill();
c.fillStyle = C[3];
c.beginPath();
c.arc(0, 0, 9, 0, 6.3);
c.fill();
c.restore();
[[52, 52, 0], [W - 52, 52, 1], [W - 52, H - 52, 2], [52, H - 52, 3]].forEach(function (p) {
c.save();
c.translate(p[0], p[1]);
c.rotate(p[2] * Math.PI / 2);
for (var q = 0; q < 4; q++) {
c.save();
c.rotate(q * Math.PI / 8);
c.fillStyle = q % 2 ? C[3] : C[2];
c.beginPath();
c.moveTo(0, 0);
c.quadraticCurveTo(30, 8, 60, 0);
c.quadraticCurveTo(30, -8, 0, 0);
c.fill();
c.restore();
}
c.restore();
});
for (var f = 0; f < 60; f++) {
var x = 70 + ((f * 97) % (W - 140)), y = 70 + ((f * 61) % (H - 140));
if (Math.abs(x - W / 2) / 110 + Math.abs(y - H / 2) / 150 < 1.05)
continue;
c.fillStyle = f % 3 ? C[2] : C[3];
c.beginPath();
c.arc(x, y, 3, 0, 6.3);
c.fill();
}
c.globalAlpha = 0.08;
c.fillStyle = "#000000";
for (var n = 0; n < 900; n++)
c.fillRect((n * 131) % W, (n * 71) % H, 2, 2);
c.globalAlpha = 1;
});
},
function (kind, seed) {
return otmCanvasMat("paint-" + kind + "-" + (seed || 0), 256, 192, function (c, W, H) {
var s = seed || 0, sky = function (a, b) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); c.fillStyle = g; c.fillRect(0, 0, W, H); };
var moon = function (x, y, r) { var g = c.createRadialGradient(x, y, r * 0.2, x, y, r * 3); g.addColorStop(0, "rgba(240,240,255,0.5)"); g.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#F0EEE0"; c.beginPath(); c.arc(x, y, r, 0, 6.3); c.fill(); };
var stars = function (n) { c.fillStyle = "#FFFFFF"; for (var i = 0; i < n; i++) {
c.globalAlpha = 0.3 + ((i * 7) % 5) / 8;
c.fillRect((i * 73 + s * 31) % W, (i * 37) % (H * 0.55), 1.5, 1.5);
} c.globalAlpha = 1; };
if (kind === "lake") {
sky("#0E1430", "#2A3050");
stars(50);
moon(170 + s * 10, 50, 16);
c.fillStyle = "#0A0C18";
c.beginPath();
c.moveTo(0, 120);
for (var x = 0; x <= W; x += 16)
c.lineTo(x, 110 - Math.sin(x * 0.03 + s) * 14 - ((x * 13) % 9));
c.lineTo(W, 130);
c.lineTo(0, 130);
c.fill();
var g = c.createLinearGradient(0, 128, 0, H);
g.addColorStop(0, "#1A2240");
g.addColorStop(1, "#080A14");
c.fillStyle = g;
c.fillRect(0, 128, W, H - 128);
c.fillStyle = "rgba(240,238,224,0.45)";
for (var r = 0; r < 12; r++)
c.fillRect(170 + s * 10 - 10 + ((r * 7) % 9), 134 + r * 5, 20 - r, 2);
}
else if (kind === "temple") {
sky("#140A20", "#3A1A30");
stars(40);
moon(60, 44, 14);
c.fillStyle = "#08060A";
c.fillRect(0, 150, W, H);
c.beginPath();
c.moveTo(70, 150);
c.lineTo(70, 92);
c.lineTo(128, 58);
c.lineTo(186, 92);
c.lineTo(186, 150);
c.fill();
c.fillRect(118, 30, 20, 40);
c.beginPath();
c.moveTo(114, 32);
c.lineTo(128, 8);
c.lineTo(142, 32);
c.fill();
c.fillStyle = "#E8B050";
[[92, 110], [110, 110], [146, 110], [164, 110], [124, 120]].forEach(function (p) { c.fillRect(p[0], p[1], 6, 12); });
c.fillStyle = "#C8C8E8";
c.beginPath();
c.arc(128, 46, 5, 0, 6.3);
c.fill();
}
else if (kind === "stars") {
c.fillStyle = "#0A1030";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C8A050";
c.lineWidth = 2;
c.beginPath();
c.arc(W / 2, H / 2, 84, 0, 6.3);
c.stroke();
c.beginPath();
c.arc(W / 2, H / 2, 60, 0, 6.3);
c.stroke();
for (var z = 0; z < 12; z++) {
var a = z / 12 * Math.PI * 2;
c.beginPath();
c.moveTo(W / 2 + Math.cos(a) * 60, H / 2 + Math.sin(a) * 60);
c.lineTo(W / 2 + Math.cos(a) * 84, H / 2 + Math.sin(a) * 84);
c.stroke();
}
c.fillStyle = "#E8E0C0";
c.strokeStyle = "rgba(232,224,192,0.6)";
c.lineWidth = 1;
[[[100, 70], [112, 80], [124, 76], [136, 90], [150, 86]], [[96, 110], [108, 122], [120, 112], [132, 126]], [[150, 104], [160, 118], [148, 126]]].forEach(function (K) { c.beginPath(); K.forEach(function (p, i) { if (i)
c.lineTo(p[0], p[1]);
else
c.moveTo(p[0], p[1]); }); c.stroke(); K.forEach(function (p) { c.beginPath(); c.arc(p[0], p[1], 2.4, 0, 6.3); c.fill(); }); });
c.fillStyle = "#C8A050";
c.font = "bold 12px serif";
c.textAlign = "center";
c.fillText("☉", W / 2, H / 2 + 4);
}
else if (kind === "sea") {
sky("#0A1028", "#1A2A48");
stars(30);
moon(64, 40, 13);
for (var w = 0; w < 10; w++) {
c.fillStyle = w % 2 ? "#0E1A30" : "#132442";
c.beginPath();
c.moveTo(0, 100 + w * 10);
for (var x2 = 0; x2 <= W; x2 += 8)
c.lineTo(x2, 100 + w * 10 + Math.sin(x2 * 0.08 + w) * 3);
c.lineTo(W, H);
c.lineTo(0, H);
c.fill();
}
c.fillStyle = "#08080C";
c.beginPath();
c.moveTo(150, 112);
c.lineTo(210, 112);
c.lineTo(200, 122);
c.lineTo(158, 122);
c.fill();
c.fillRect(178, 70, 3, 42);
c.beginPath();
c.moveTo(181, 72);
c.lineTo(205, 104);
c.lineTo(181, 104);
c.fill();
}
else if (kind === "winter") {
sky("#2A3448", "#7A8498");
moon(196, 40, 12);
c.fillStyle = "#E0E4EC";
c.fillRect(0, 140, W, H);
for (var t = 0; t < 14; t++) {
var tx = (t * 41 + s * 13) % W, th = 60 + (t % 4) * 18;
c.strokeStyle = "#14141A";
c.lineWidth = 3 + (t % 3);
c.beginPath();
c.moveTo(tx, 150);
c.lineTo(tx, 150 - th);
c.stroke();
c.lineWidth = 1.5;
for (var b = 0; b < 4; b++) {
c.beginPath();
c.moveTo(tx, 150 - th * 0.4 - b * 12);
c.lineTo(tx + ((b % 2) ? 14 : -14), 150 - th * 0.55 - b * 14);
c.stroke();
}
}
}
else if (kind === "mountains") {
sky("#3A1A30", "#C86A3A");
c.fillStyle = "rgba(255,220,160,0.8)";
c.beginPath();
c.arc(80, 120, 18, 0, 6.3);
c.fill();
[["#4A2A3A", 80], ["#2A1A2A", 110], ["#140C14", 140]].forEach(function (L, i) { c.fillStyle = L[0]; c.beginPath(); c.moveTo(0, H); for (var x3 = 0; x3 <= W; x3 += 20)
c.lineTo(x3, L[1] - Math.abs(Math.sin(x3 * 0.02 + i * 1.7 + s)) * 40); c.lineTo(W, H); c.fill(); });
}
else if (kind === "still") {
c.fillStyle = "#120C0A";
c.fillRect(0, 0, W, H);
var lg = c.createRadialGradient(150, 70, 4, 150, 70, 140);
lg.addColorStop(0, "rgba(255,200,120,0.4)");
lg.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = lg;
c.fillRect(0, 0, W, H);
c.fillStyle = "#3A2418";
c.fillRect(0, 140, W, H);
c.fillStyle = "#D8CCB0";
c.beginPath();
c.arc(90, 118, 24, 0, 6.3);
c.fill();
c.fillRect(76, 128, 28, 18);
c.fillStyle = "#120C0A";
c.beginPath();
c.arc(82, 114, 6, 0, 6.3);
c.arc(98, 114, 6, 0, 6.3);
c.fill();
c.fillRect(88, 124, 4, 6);
c.fillStyle = "#E8E0C8";
c.fillRect(146, 80, 10, 60);
c.fillStyle = "#FFC860";
c.beginPath();
c.ellipse(151, 72, 4, 9, 0, 0, 6.3);
c.fill();
c.fillStyle = "#5A1A1A";
c.fillRect(170, 124, 60, 16);
c.fillStyle = "#2A3A5A";
c.fillRect(176, 112, 52, 12);
c.fillStyle = "#C8A050";
c.fillRect(170, 131, 60, 2);
}
else {
var robe = ["#2A0E1E", "#1A1430", "#0E1A2A", "#2A1A0E"][s % 4], skin = ["#C8A088", "#8A6048", "#E0C0A8", "#5A3A2A"][s % 4];
c.fillStyle = "#0E0A0C";
c.fillRect(0, 0, W, H);
var bg = c.createRadialGradient(90, 60, 4, 128, 96, 150);
bg.addColorStop(0, "rgba(120,90,60,0.35)");
bg.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = bg;
c.fillRect(0, 0, W, H);
c.fillStyle = robe;
c.beginPath();
c.moveTo(60, H);
c.quadraticCurveTo(70, 110, 128, 104);
c.quadraticCurveTo(186, 110, 196, H);
c.fill();
c.fillStyle = "#C8A050";
c.fillRect(124, 112, 8, 70);
c.beginPath();
c.arc(128, 150, 9, 0, 6.3);
c.fill();
c.fillStyle = robe;
c.beginPath();
c.arc(132, 150, 8, 0, 6.3);
c.fill();
c.fillStyle = skin;
c.beginPath();
c.ellipse(128, 72, 22, 28, 0, 0, 6.3);
c.fill();
c.fillRect(120, 92, 16, 14);
c.fillStyle = ["#1A1414", "#D8D0C8", "#3A2A1A", "#0A0808"][s % 4];
c.beginPath();
c.ellipse(128, 54, 24, 16, 0, Math.PI, 0);
c.fill();
if (s % 2) {
c.beginPath();
c.moveTo(104, 62);
c.quadraticCurveTo(100, 100, 110, 110);
c.lineTo(114, 66);
c.fill();
c.beginPath();
c.moveTo(152, 62);
c.quadraticCurveTo(156, 100, 146, 110);
c.lineTo(142, 66);
c.fill();
}
c.fillStyle = "rgba(0,0,0,0.35)";
c.beginPath();
c.ellipse(140, 74, 12, 26, 0, 0, 6.3);
c.fill();
c.fillStyle = "#1A0E0A";
c.fillRect(118, 70, 6, 3);
c.fillRect(132, 70, 6, 3);
}
c.fillStyle = "rgba(120,80,20,0.12)";
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(0,0,0,0.12)";
c.lineWidth = 0.6;
for (var k = 0; k < 30; k++) {
c.beginPath();
var px = (k * 53) % W, py = (k * 29) % H;
c.moveTo(px, py);
c.lineTo(px + 8, py + 5);
c.lineTo(px + 5, py + 12);
c.stroke();
}
});
},
function (kind, seed, x, y, z, ry, w, h, parent) {
var P = parent || otmP(), g = otmGroup(x, y, z, ry, P), fr = otmM("gold"), lite = OTM.lite;
otmBox(w + 0.06, h + 0.06, 0.02, otmMat(0x0A0806, null), 0, 0, 0.01, g);
otmPlane(w, h, otmPaintMat(kind, seed), 0, 0, 0.035, 0, g);
otmBox(w + 0.3, 0.14, 0.07, fr, 0, h / 2 + 0.08, 0.04, g);
otmBox(w + 0.3, 0.14, 0.07, fr, 0, -h / 2 - 0.08, 0.04, g);
otmBox(0.14, h + 0.02, 0.07, fr, -w / 2 - 0.08, 0, 0.04, g);
otmBox(0.14, h + 0.02, 0.07, fr, w / 2 + 0.08, 0, 0.04, g);
if (!lite) {
otmBox(w + 0.06, 0.03, 0.09, fr, 0, h / 2 + 0.01, 0.05, g);
otmBox(w + 0.06, 0.03, 0.09, fr, 0, -h / 2 - 0.01, 0.05, g);
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (p) { otmSph(0.05, fr, p[0] * (w / 2 + 0.08), p[1] * (h / 2 + 0.08), 0.08, g, 6); });
otmSph(0.06, fr, 0, h / 2 + 0.17, 0.06, g, 6);
}
return g;
},
function (x, y, z, ry, parent) {
var P = parent || otmP(), g = otmGroup(x, y, z, ry, P), fr = otmM("gold");
otmBox(0.14, 0.3, 0.03, fr, 0, 0, 0.015, g);
otmSph(0.04, fr, 0, 0.17, 0.03, g, 6);
var arm = otmCyl(0.015, 0.24, fr, 0, -0.04, 0.12, g, 5);
arm.rotation.x = Math.PI / 2.6;
otmCyl(0.07, 0.03, fr, 0, 0.04, 0.22, g, 10, 0.04);
otmCandle(0, 0.055, 0.22, 0.9, g);
return g;
},
function (x, y, z, r, top, parent) {
var P = parent || otmP(), g = otmGroup(x, y, z, 0, P), fr = otmM("gold"), lite = OTM.lite, tiers = lite ? 1 : 2;
otmCyl(0.012, top - y, otmM("iron"), 0, (top - y) / 2, 0, g, 4);
otmSph(0.1, fr, 0, 0.55, 0, g, 10);
otmCyl(0.04, 0.6, fr, 0, 0.25, 0, g, 8);
otmSph(0.08, fr, 0, -0.08, 0, g, 8);
for (var t = 0; t < tiers; t++) {
var rr = r * (1 - t * 0.42), yy = t * 0.42, n = Math.max(5, Math.round((lite ? 6 : 10) * (1 - t * 0.35)));
var ring = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.025, 6, lite ? 18 : 36), fr);
ring.rotation.x = Math.PI / 2;
ring.position.y = yy;
g.add(ring);
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2 + t * 0.3, cx = Math.cos(a) * rr, cz = Math.sin(a) * rr;
otmLimb([0, yy + 0.02, 0], [cx, yy, cz], 0.012, 0.012, fr, g, 4);
otmCyl(0.045, 0.025, fr, cx, yy + 0.02, cz, g, 8);
otmCandle(cx, yy + 0.035, cz, 0.85, g);
if (!lite) {
var dr = otmSph(0.03, otmMat(0xE8F0FF, null, { op: 0.75, e: 0x8A8AA8, ei: 0.6 }), cx * 0.92, yy - 0.12, cz * 0.92, g, 6);
dr.scale.y = 1.8;
}
}
}
return g;
},
function (R, band, extra) {
var t = R.t || 0.4, out = [];
[["n", "x", R.z0 + t / 2, 1, R.x0 + t / 2, R.x1 - t / 2, 0], ["s", "x", R.z1 - t / 2, -1, R.x0 + t / 2, R.x1 - t / 2, Math.PI], ["w", "z", R.x0 + t / 2, 1, R.z0 + t / 2, R.z1 - t / 2, Math.PI / 2], ["e", "z", R.x1 - t / 2, -1, R.z0 + t / 2, R.z1 - t / 2, -Math.PI / 2]].forEach(function (S) {
if ((R.sk || "").indexOf(S[0]) >= 0)
return;
var cuts = [];
((R.D && R.D[S[0]]) || []).forEach(function (O) { if (!O)
return; var sill = O.sill || 0, top = sill + (O.h || 2.6); if (sill < band[1] && top > band[0])
cuts.push([O.at - O.w / 2 - 0.35, O.at + O.w / 2 + 0.35]); });
((extra && extra[S[0]]) || []).forEach(function (c) { cuts.push(c); });
cuts.sort(function (a, b) { return a[0] - b[0]; });
var cur = S[4];
cuts.forEach(function (c) { if (c[0] > cur + 0.05)
out.push({ side: S[0], axis: S[1], c: S[2], n: S[3], a0: cur, a1: Math.min(c[0], S[5]), ry: S[6] }); cur = Math.max(cur, c[1]); });
if (cur < S[5] - 0.05)
out.push({ side: S[0], axis: S[1], c: S[2], n: S[3], a0: cur, a1: S[5], ry: S[6] });
});
return out.filter(function (r) { return r.a1 - r.a0 > 0.3; });
},
function (R, G) {
var F = OTM_FINISH[G.style || "oak"], lite = OTM.lite, y = R.y || 0, h = R.h, mat = function (a) { return a ? (typeof a === "string" ? otmM(a) : otmMat(a[0], a[1], { phong: a[1] === "marble" ? 80 : 0 })) : null; };
var wain = G.wain === undefined ? (F.wain ? 1.1 : 0) : G.wain;
if (wain && F.wain) {
otmWallRuns(R, [0, wain], G.avoid).forEach(function (run) {
otmOnWall(run, run.a0, run.a1, y, wain, 0.0, 0.05, mat(F.wain));
otmOnWall(run, run.a0, run.a1, y + wain - 0.02, 0.07, 0.0, 0.09, mat(F.rail));
otmOnWall(run, run.a0, run.a1, y, 0.2, 0.0, 0.07, mat(F.wain));
if (!lite) {
var n = Math.max(1, Math.round((run.a1 - run.a0) / 1.1)), pw = (run.a1 - run.a0) / n;
for (var i = 0; i < n; i++) {
var a = run.a0 + i * pw;
otmOnWall(run, a + 0.12, a + pw - 0.12, y + 0.32, wain - 0.5, 0.05, 0.025, mat(F.panel));
otmOnWall(run, a + 0.2, a + pw - 0.2, y + 0.4, wain - 0.66, 0.075, 0.012, mat(F.wain));
}
}
});
}
if (G.paper) {
var top = h - 0.3;
otmWallRuns(R, [wain, top], G.avoid).forEach(function (run) {
var len = run.a1 - run.a0, hh = top - wain, geo = new THREE.PlaneGeometry(len, hh), uv = geo.attributes.uv;
for (var k = 0; k < uv.count; k++) {
uv.setX(k, uv.getX(k) * len / 0.9);
uv.setY(k, uv.getY(k) * hh / 1.1);
}
var m = new THREE.Mesh(geo, otmDamaskMat(G.paper)), p = otmWallPt(run, (run.a0 + run.a1) / 2, 0.012);
m.position.set(p.x, y + wain + hh / 2, p.z);
m.rotation.y = run.ry;
otmP().add(m);
});
}
if (G.cornice !== 0 && F.corn) {
otmWallRuns(R, [h - 0.5, h], null).forEach(function (run) {
otmOnWall(run, run.a0, run.a1, y + h - 0.2, 0.2, 0, 0.26, mat(F.corn));
otmOnWall(run, run.a0, run.a1, y + h - 0.34, 0.14, 0, 0.16, mat(F.corn));
if (!lite)
otmOnWall(run, run.a0, run.a1, y + h - 0.4, 0.05, 0, 0.1, otmM("gold"));
});
}
if (G.pil && !lite) {
otmWallRuns(R, [0, h], G.avoid).forEach(function (run) {
var len = run.a1 - run.a0, n = Math.floor(len / G.pil);
if (n < 1)
return;
for (var i = 0; i <= n; i++) {
var a = run.a0 + 0.35 + i * (len - 0.7) / n;
otmOnWall(run, a - 0.22, a + 0.22, y, h - 0.5, 0, 0.12, mat(F.corn));
otmOnWall(run, a - 0.28, a + 0.28, y + h - 0.75, 0.28, 0, 0.18, otmM("gold"));
otmOnWall(run, a - 0.28, a + 0.28, y, 0.3, 0, 0.18, mat(F.corn));
}
});
}
if (G.coffer) {
var cs = G.coffer * (lite ? 1.6 : 1), bm = mat(F.beam), bw = R.x1 - R.x0 - (R.t || 0.4), bd = R.z1 - R.z0 - (R.t || 0.4), nx = Math.max(1, Math.round(bw / cs)), nz = Math.max(1, Math.round(bd / cs)), yb = y + h - 0.16;
for (var i2 = 1; i2 < nx; i2++)
otmBox(0.28, 0.3, bd, bm, R.x0 + (R.t || 0.4) / 2 + i2 * bw / nx, yb - 0.15, R.cz);
for (var j2 = 1; j2 < nz; j2++)
otmBox(bw, 0.3, 0.28, bm, R.cx, yb - 0.15, R.z0 + (R.t || 0.4) / 2 + j2 * bd / nz);
var fil = F.boss === "iron" ? otmM("iron") : otmM("gold");
if (!lite) {
for (i2 = 1; i2 < nx; i2++)
otmBox(0.08, 0.02, bd, fil, R.x0 + (R.t || 0.4) / 2 + i2 * bw / nx, yb - 0.305, R.cz);
for (j2 = 1; j2 < nz; j2++)
otmBox(bw, 0.02, 0.08, fil, R.cx, yb - 0.305, R.z0 + (R.t || 0.4) / 2 + j2 * bd / nz);
for (i2 = 1; i2 < nx; i2++)
for (j2 = 1; j2 < nz; j2++) {
var bs = otmSph(0.13, fil, R.x0 + (R.t || 0.4) / 2 + i2 * bw / nx, yb - 0.3, R.z0 + (R.t || 0.4) / 2 + j2 * bd / nz, null, 10);
bs.scale.y = 0.45;
}
}
}
(G.rugs || []).forEach(function (r) { var m = otmPlane(r[2], r[3], otmRugMat(r[4]), r[0], y + 0.014, r[1], 0); m.rotation.x = -Math.PI / 2; if (r[5])
m.rotation.z = r[5]; });
if (G.sconce) {
var every = G.sconce * (lite ? 2 : 1);
otmWallRuns(R, [1.6, 2.6], G.avoidSc || G.avoid).forEach(function (run) {
var len = run.a1 - run.a0;
if (len < 1.2)
return;
var n = Math.max(1, Math.floor(len / every));
for (var i = 0; i < n; i++) {
var a = run.a0 + (i + 0.5) * len / n, p = otmWallPt(run, a, 0.01);
otmSconce(p.x, y + (G.scY || 2.1), p.z, run.ry);
}
});
}
(G.pics || []).forEach(function (p) { var run = otmWallRuns(R, [0, 0], null).filter(function (r) { return r.side === p[0]; })[0]; if (!run)
return; var q = otmWallPt(run, p[1], 0.02); otmPainting(p[5], p[6] || 0, q.x, y + p[2], q.z, run.ry, p[3], p[4]); });
(G.chand || []).forEach(function (c, i) { if (lite && i % 2)
return; otmChandelier(c[0], y + h - (c[3] || 2.0), c[1], c[2], y + h - 0.3); });
},
function (id) {
var d = (typeof DEITY !== "undefined" && DEITY[(typeof OTM_DRAGON_KEY !== "undefined" && OTM_DRAGON_KEY[id]) || id]) || null, ic = d && d.icons ? d.icons : String(OTM_WYRM_ICONS[id] || "color:green size:2 wings legs").split(" ");
var o = { col: "green", size: 2, heads: 1, wings: false, legs: false, hood: false, sea: false, feathered: false, stars: false };
ic.forEach(function (t) {
var p = String(t).split(":");
if (p[0] === "color")
o.col = p[1];
else if (p[0] === "size")
o.size = parseFloat(p[1]) || 2;
else if (p[0] === "heads")
o.heads = parseInt(p[1], 10) || 1;
else if (o.hasOwnProperty(p[0]))
o[p[0]] = true;
});
return o;
},
function () {
return otmCanvasMat("wyrmscales", 128, 128, function (c, W, H) {
c.fillStyle = "#D4D4D4";
c.fillRect(0, 0, W, H);
for (var r = 0; r < 9; r++)
for (var k = -1; k < 9; k++) {
var x = k * 16 + (r % 2 ? 8 : 0), y = r * 16 - 4, g = c.createRadialGradient(x + 8, y + 4, 1, x + 8, y + 8, 11);
g.addColorStop(0, "#F4F4F4");
g.addColorStop(0.8, "#D4D4D4");
g.addColorStop(1, "#B0B0B0");
c.fillStyle = g;
c.beginPath();
c.moveTo(x, y);
c.quadraticCurveTo(x, y + 16, x + 8, y + 18);
c.quadraticCurveTo(x + 16, y + 16, x + 16, y);
c.closePath();
c.fill();
c.strokeStyle = "rgba(40,40,40,0.22)";
c.lineWidth = 1;
c.stroke();
}
});
},
function (o) {
var k = "wyrm|" + (otmLite() ? "l" : "p") + "|" + (o && o.phong || 0);
if (OTM.mats[k])
return OTM.mats[k];
var sc = otmScaleTex(), m = otmLite() ? new THREE.MeshLambertMaterial({ vertexColors: true, map: sc.map }) : new THREE.MeshPhongMaterial({ vertexColors: true, map: sc.map, shininess: 18, specular: 0x2A2A2A });
OTM.mats[k] = m;
return m;
},
function (pts, radii, col, belly, parent, o) {
o = o || {};
var lite = OTM.lite, V = pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); });
var cv = new THREE.CatmullRomCurve3(V, false, "centripetal"), seg = o.seg || (lite ? 18 : 40), rs = o.rad || (lite ? 7 : 12);
var geo = new THREE.TubeGeometry(cv, seg, 1, rs, false), pos = geo.attributes.position, n = radii.length, len = cv.getLength();
var cA = otmShade(col, 0), cB = otmShade(belly, 0), cD = otmShade(col, -0.35), cols = new Float32Array(pos.count * 3), P = new THREE.Vector3(), T = new THREE.Vector3(), D = new THREE.Vector3(), Q = new THREE.Vector3(), C = new THREE.Color();
for (var i = 0; i <= seg; i++) {
var u = i / seg, t = cv.getUtoTmapping(u), f = t * (n - 1), a = Math.min(n - 2, Math.floor(f)), r = radii[a] + (radii[a + 1] - radii[a]) * (f - a);
cv.getPointAt(u, P);
cv.getTangentAt(u, T);
D.set(0, -1, 0).addScaledVector(T, T.y);
if (D.lengthSq() < 0.02)
D.set(0, 0, 1);
D.normalize();
for (var j = 0; j <= rs; j++) {
var v = i * (rs + 1) + j;
Q.fromBufferAttribute(pos, v).sub(P);
var d = Q.dot(D);
pos.setXYZ(v, P.x + Q.x * r, P.y + Q.y * r, P.z + Q.z * r);
var b = Math.max(0, Math.min(1, (d - 0.15) / 0.45)), dk = Math.max(0, Math.min(1, (-d - 0.55) / 0.4));
C.copy(cA).lerp(cB, b).lerp(cD, dk * 0.7);
cols[v * 3] = C.r;
cols[v * 3 + 1] = C.g;
cols[v * 3 + 2] = C.b;
}
}
geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
var uv = geo.attributes.uv;
var ru = Math.max(1, Math.min(seg / 4, Math.round(len / 0.6)));
for (var k = 0; k < uv.count; k++) {
uv.setX(k, uv.getX(k) * ru);
uv.setY(k, uv.getY(k) * 2);
}
var m = new THREE.Mesh(geo, o.mat || otmWyrmMat());
(parent || otmP()).add(m);
m.userData.curve = cv;
m.userData.radii = radii;
return m;
},
function (a, b, r1, r2, mat, parent, seg) {
var A = new THREE.Vector3(a[0], a[1], a[2]), B = new THREE.Vector3(b[0], b[1], b[2]), L = A.distanceTo(B);
var m = new THREE.Mesh(new THREE.CylinderGeometry(r2, r1, L, seg || 7), mat);
m.position.copy(A).add(B).multiplyScalar(0.5);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
parent.add(m);
return m;
},
function (o, col, parent, east, hood, feath, eyeCol) {
var lite = OTM.lite, h = new THREE.Group();
parent.add(h);
var sk = otmMat(col, null, { phong: 30 }), dk = otmMat(otmShade(col, -0.4).getHex(), null), horn = otmMat(east ? 0xC8B080 : 0xD8CCB0, null, { phong: 40 }), eye = otmMat(eyeCol, null, { e: eyeCol, ei: 1 }), tooth = otmMat(0xF0EAD8, null);
var s1 = otmSph(0.19, sk, 0, 0.02, 0, h, lite ? 10 : 14);
s1.scale.set(1, 0.82, 1.2);
var sn = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.14, 0.42, lite ? 6 : 8), sk);
sn.rotation.x = Math.PI / 2;
sn.position.set(0, 0.0, 0.3);
sn.scale.set(1, 1, 0.72);
h.add(sn);
var jw = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.11, 0.38, lite ? 6 : 8), dk);
jw.rotation.x = Math.PI / 2 + 0.28;
jw.position.set(0, -0.1, 0.26);
jw.scale.set(1, 1, 0.5);
h.add(jw);
[-1, 1].forEach(function (sd) {
otmSph(0.042, eye, sd * 0.12, 0.07, 0.14, h, 8);
var br = otmBox(0.1, 0.035, 0.16, dk, sd * 0.115, 0.115, 0.13, h);
br.rotation.z = sd * 0.35;
otmSph(0.018, otmMat(0x0A0808, null), sd * 0.035, 0.04, 0.5, h, 6);
if (!lite)
for (var t = 0; t < 4; t++) {
var tt = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.06, 4), tooth);
tt.position.set(sd * (0.06 - t * 0.006), -0.06, 0.44 - t * 0.08);
tt.rotation.x = Math.PI;
h.add(tt);
}
var hp = east ? [[sd * 0.08, 0.14, -0.04], [sd * 0.12, 0.3, -0.18], [sd * 0.14, 0.42, -0.36], [sd * 0.2, 0.5, -0.52]] : [[sd * 0.1, 0.12, -0.06], [sd * 0.16, 0.2, -0.26], [sd * 0.2, 0.24, -0.48], [sd * 0.2, 0.34, -0.66]];
otmTube(hp, [0.045, 0.035, 0.02, 0.006], east ? 0xC8B080 : 0xD8CCB0, east ? 0xC8B080 : 0xD8CCB0, h, { seg: lite ? 6 : 10, rad: lite ? 5 : 6, mat: horn });
if (east) {
otmTube([[sd * 0.13, 0.34, -0.24], [sd * 0.24, 0.42, -0.2], [sd * 0.3, 0.52, -0.26]], [0.02, 0.014, 0.004], 0xC8B080, 0xC8B080, h, { seg: 5, rad: 5, mat: horn });
otmTube([[sd * 0.07, -0.02, 0.46], [sd * 0.22, -0.06, 0.42], [sd * 0.4, -0.18, 0.2], [sd * 0.5, -0.34, -0.1]], [0.012, 0.01, 0.007, 0.003], 0x2A2A2A, 0x2A2A2A, h, { seg: lite ? 6 : 10, rad: 4, mat: otmMat(0x1A1A1A, null) });
}
});
if (east) {
for (var m = 0; m < (lite ? 3 : 6); m++) {
var mn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.28, 5), otmMat(0xC8A030, null));
mn.position.set((m % 2 ? 0.06 : -0.06), 0.12 - m * 0.02, -0.14 - m * 0.06);
mn.rotation.x = -2.2;
h.add(mn);
}
}
else if (!lite)
for (var f = 0; f < 4; f++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 5), dk);
sp.position.set(0, 0.16 - f * 0.02, -0.08 - f * 0.08);
sp.rotation.x = -0.9;
h.add(sp);
}
if (hood) {
var hd = otmSph(0.34, otmMat(otmShade(col, 0.15).getHex(), null, { ds: 1 }), 0, 0.12, -0.12, h, lite ? 10 : 16);
hd.scale.set(1.25, 1.05, 0.16);
var mk = otmCanvasMat("nagahood", 64, 64, function (c, W, H) { c.fillStyle = "rgba(0,0,0,0)"; c.clearRect(0, 0, W, H); c.strokeStyle = "#1A1A2A"; c.lineWidth = 5; c.beginPath(); c.arc(W / 2 - 9, H / 2, 7, 0, 6.3); c.stroke(); c.beginPath(); c.arc(W / 2 + 9, H / 2, 7, 0, 6.3); c.stroke(); }, { basic: true, op: 0.9 });
otmPlane(0.36, 0.36, mk, 0, 0.14, -0.17, Math.PI, h);
}
if (feath) {
[0x2E8A5E, 0xC0392B, 0xC7A043, 0x1A6A8A].forEach(function (fc, i) { for (var q = 0; q < (lite ? 3 : 5); q++) {
var a = -1.3 + q * 0.65 + i * 0.1, fb = otmBox(0.05, 0.34, 0.012, otmMat(fc, null), Math.sin(a) * 0.22, 0.08 + Math.cos(a) * 0.18, -0.1 - i * 0.02, h);
fb.rotation.z = -a;
fb.rotation.x = -0.5;
} });
}
return h;
},
function (root, sd, col, s, parent, raise) {
var lite = OTM.lite, g = new THREE.Group();
g.position.set(root[0], root[1], root[2]);
parent.add(g);
var bone = otmMat(otmShade(col, -0.35).getHex(), null), r = raise || 1;
var E = [sd * 0.45 * s, 0.8 * s * r, -0.35 * s], W = [sd * 0.7 * s, 1.35 * s * r, -0.75 * s];
var F = [[sd * 0.95 * s, 1.45 * s * r, -1.25 * s], [sd * 1.05 * s, 0.95 * s * r, -1.35 * s], [sd * 0.95 * s, 0.35 * s, -1.25 * s], [sd * 0.6 * s, -0.25 * s, -0.95 * s]];
otmLimb([0, 0, 0], E, 0.06 * s, 0.05 * s, bone, g);
otmLimb(E, W, 0.05 * s, 0.04 * s, bone, g);
F.forEach(function (f) { otmLimb(W, f, 0.03 * s, 0.012 * s, bone, g, 5); });
var ring = [[0, 0, 0], E, W, F[0]], k;
for (k = 1; k < F.length; k++) {
var a = F[k - 1], b = F[k], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
m = [m[0] + (W[0] - m[0]) * 0.22, m[1] + (W[1] - m[1]) * 0.22, m[2] + (W[2] - m[2]) * 0.22];
ring.push(m, b);
}
ring.push([0, -0.1 * s, -0.45 * s]);
var vs = [];
for (k = 1; k < ring.length - 1; k++) {
vs.push(ring[0][0], ring[0][1], ring[0][2], ring[k][0], ring[k][1], ring[k][2], ring[k + 1][0], ring[k + 1][1], ring[k + 1][2]);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(vs, 3));
geo.computeVertexNormals();
var mm = otmMat(otmShade(col, -0.25).getHex(), null, { ds: 1 });
var mem = new THREE.Mesh(geo, mm);
g.add(mem);
if (!lite) {
var thumb = new THREE.Mesh(new THREE.ConeGeometry(0.03 * s, 0.14 * s, 5), otmMat(0xD8CCB0, null));
thumb.position.set(W[0], W[1] + 0.06 * s, W[2]);
g.add(thumb);
}
return g;
},
function (id, x, y, z, ry, parent) {
var I = otmWyrmIcons(id), lite = OTM.lite, east = !!OTM_WYRM_EAST[id];
var col = (typeof ICONCOL !== "undefined" && ICONCOL[I.col]) || ({ teal: 0x2F7A7A, red: 0xA8322B, green: 0x3F7A3A }[I.col] || 0x3F7A3A);
var belly = otmShade(col, 0.38).getHex(), eyeCol = I.col === "gold" || I.col === "yellow" ? 0xFF5A2A : I.col === "black" ? 0xFF3A1A : 0xFFC23A;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(parent || otmP()).add(g);
g.userData.keep = 1;
var s = Math.min(1.25, 0.82 + 0.07 * Math.min(6, I.size)), B = new THREE.Group();
B.scale.setScalar(s);
g.add(B);
var horn = otmMat(0xD8CCB0, null, { phong: 40 }), heads = Math.max(1, Math.min(9, I.heads)), body, necks = [], W = { g: g, heads: [], wings: [], ph: Math.random() * 20, body: B };
var sit = I.legs && !I.sea && !east;
if (sit) {
body = otmTube([[0.85, 0.06, 0.8], [1.05, 0.08, 0.15], [0.9, 0.14, -0.6], [0.35, 0.28, -0.95], [0, 0.58, -0.62], [0, 0.84, -0.2], [0, 1.08, 0.18], [0, 1.3, 0.36]], [0.02, 0.08, 0.14, 0.24, 0.44, 0.46, 0.42, 0.3], col, belly, B);
var lm = otmMat(otmShade(col, -0.08).getHex(), null, { phong: 20 });
[-1, 1].forEach(function (sd) {
var th = otmSph(0.3, lm, sd * 0.34, 0.5, -0.42, B, lite ? 10 : 14);
th.scale.set(0.7, 1.2, 1.4);
otmLimb([sd * 0.4, 0.42, -0.15], [sd * 0.42, 0.08, -0.02], 0.12, 0.08, lm, B);
otmBox(0.18, 0.08, 0.38, lm, sd * 0.42, 0.05, 0.1, B);
otmClaws(sd * 0.42, 0.05, 0.25, 1, 0, horn, B);
otmSph(0.16, lm, sd * 0.3, 1.12, 0.36, B, 10).scale.set(0.8, 1.1, 1);
otmLimb([sd * 0.32, 1.08, 0.4], [sd * 0.38, 0.58, 0.56], 0.12, 0.09, lm, B);
otmLimb([sd * 0.38, 0.58, 0.56], [sd * 0.34, 0.08, 0.62], 0.09, 0.07, lm, B);
otmBox(0.15, 0.07, 0.22, lm, sd * 0.34, 0.04, 0.7, B);
otmClaws(sd * 0.34, 0.04, 0.78, 0.9, 0, horn, B);
});
if (I.wings) {
W.wings.push(otmWyrmWing([-0.2, 1.28, 0.08], -1, col, 1.2, B, 1), otmWyrmWing([0.2, 1.28, 0.08], 1, col, 1.2, B, 1));
}
var nb = [0, 1.28, 0.38];
for (var hI = 0; hI < heads; hI++) {
var a = heads > 1 ? (hI / (heads - 1) - 0.5) * Math.min(2.4, 0.55 * heads) : 0, rr = heads > 1 ? 0.42 : 0.0, hy = heads > 1 ? 1.95 + 0.25 * Math.cos(a * 1.2) : 2.0;
var tip = [Math.sin(a) * rr * 1.6, hy, 0.78 + Math.cos(a) * rr * 0.5], mid = [Math.sin(a) * rr * 0.9, hy - 0.12, 0.5];
necks.push({ pts: [nb, [mid[0] * 0.4, nb[1] + 0.32, 0.36], mid, tip], a: a });
}
}
else {
var C = [], turns = 1.6, n = lite ? 12 : 20;
for (var c = 0; c <= n; c++) {
var f = c / n, th2 = f * turns * Math.PI * 2 + 0.6, rad = 0.82 - 0.3 * f, yy = 0.12 + 0.36 * f;
C.push([Math.cos(th2) * rad, yy, Math.sin(th2) * rad]);
}
C.push([0, 0.62, 0.08], [0, 1.0, -0.02], [0, 1.38, 0.1]);
var rad2 = C.map(function (p, i) { var f = i / (C.length - 1); return f < 0.12 ? 0.03 + f / 0.12 * 0.17 : f < 0.8 ? 0.2 + 0.06 * Math.sin(f * 3) : 0.21 - (f - 0.8) * 0.25; });
body = otmTube(C, rad2, col, belly, B, { seg: lite ? 30 : 64 });
if (I.legs) {
[0.32, 0.58].forEach(function (u) {
var A = otmTubeAt(body, u), p = A.p, ox = p.x * 0.18, oz = p.z * 0.18;
otmLimb([p.x, p.y, p.z], [p.x + ox, 0.05, p.z + oz], 0.06, 0.05, otmMat(otmShade(col, -0.08).getHex(), null, { phong: 20 }), B);
otmClaws(p.x + ox, 0.03, p.z + oz, 0.8, 0, horn, B);
});
}
if (I.wings) {
var Aw = otmTubeAt(body, 0.86);
W.wings.push(otmWyrmWing([Aw.p.x - 0.15, Aw.p.y, Aw.p.z], -1, col, 0.9, B, 0.9), otmWyrmWing([Aw.p.x + 0.15, Aw.p.y, Aw.p.z], 1, col, 0.9, B, 0.9));
}
var top = [0, 1.38, 0.1];
for (var hJ = 0; hJ < heads; hJ++) {
var b2 = heads > 1 ? (hJ / (heads - 1) - 0.5) * Math.min(2.6, 0.5 * heads) : 0, r3 = heads > 1 ? 0.5 : 0, hy2 = heads > 1 ? 1.8 + 0.28 * Math.cos(b2 * 1.1) : 1.82;
var tip2 = [Math.sin(b2) * r3 * 1.4, hy2, 0.4 + Math.cos(b2) * r3 * 0.6];
necks.push({ pts: [top, [tip2[0] * 0.4, (top[1] + hy2) / 2 + 0.08, 0.12], tip2], a: b2 });
}
if (I.sea) {
var wt = new THREE.Mesh(new THREE.CircleGeometry(1.0, lite ? 18 : 30), otmMat(0x1A4A5A, null, { phong: 140, op: 0.85, e: 0x061A20, ei: 1 }));
wt.rotation.x = -Math.PI / 2;
wt.position.y = 0.3;
B.add(wt);
}
if (I.feathered) {
var fc = [0x2E8A5E, 0xC0392B, 0xC7A043];
for (var q = 0; q < (lite ? 10 : 24); q++) {
var Aq = otmTubeAt(body, 0.15 + q / (lite ? 10 : 24) * 0.8), fb = otmBox(0.06, 0.3, 0.014, otmMat(fc[q % 3], null), Aq.p.x, Aq.p.y + Aq.r * 0.9, Aq.p.z, B);
fb.rotation.y = Math.atan2(Aq.t.x, Aq.t.z);
fb.rotation.x = -0.5;
}
}
}
if (!lite || sit) {
var sp = otmMat(otmShade(col, -0.45).getHex(), null), nsp = lite ? 8 : 16;
for (var k = 0; k < nsp; k++) {
var u = 0.1 + k / nsp * 0.85, A2 = otmTubeAt(body, u), D = new THREE.Vector3(0, 1, 0).addScaledVector(A2.t, -A2.t.y).normalize();
if (D.lengthSq() < 0.1)
continue;
var cn = new THREE.Mesh(new THREE.ConeGeometry(A2.r * 0.22, A2.r * 0.75, 4), sp);
cn.position.copy(A2.p).addScaledVector(D, A2.r * 0.95);
cn.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), D.clone().addScaledVector(A2.t, -0.6).normalize());
B.add(cn);
}
}
necks.forEach(function (N) {
var nr = heads > 1 ? [0.15, 0.12, 0.1, 0.085] : [0.2, 0.16, 0.13, 0.11];
if (N.pts.length === 3)
nr = heads > 1 ? [0.15, 0.11, 0.085] : [0.21, 0.15, 0.11];
var nk = otmTube(N.pts, nr, col, belly, B, { seg: lite ? 10 : 18 }), A3 = otmTubeAt(nk, 1);
var piv = new THREE.Group();
piv.position.copy(A3.p);
B.add(piv);
var hd = otmWyrmHead(I, col, piv, east, I.hood, I.feathered, eyeCol);
hd.scale.setScalar(heads > 3 ? 0.78 : heads > 1 ? 0.9 : 1.05);
piv.rotation.y = N.a * 0.5;
hd.rotation.x = 0.12;
if (I.hood && heads === 1)
hd.scale.multiplyScalar(1.1);
W.heads.push({ g: piv, base: N.a * 0.5, ph: Math.random() * 10 });
});
if (I.stars) {
for (var st = 0; st < (lite ? 6 : 14); st++) {
var gl = (typeof wGlow === "function") ? wGlow(0xE8ECFF, 0.22, 0.7) : null;
if (gl) {
gl.position.set(Math.sin(st * 2.3) * 0.9, 0.6 + (st % 5) * 0.35, Math.cos(st * 1.7) * 0.7);
B.add(gl);
}
}
}
if (east) {
var pearl = otmSph(0.11, otmMat(0xEAF2FF, null, { e: 0x6A8ACA, ei: 0.9 }), 0.32, 0.5, 0.62, B, 12);
W.pearl = pearl;
}
g.traverse(function (m) { m.raycast = function () { }; m.userData.noSit = 1; });
(OTM.wyrms = OTM.wyrms || []).push(W);
return g;
},
function (x, z, ry) {
var lite = OTM.lite, rk = new THREE.Mesh(new THREE.DodecahedronGeometry(1.08, lite ? 0 : 1), otmMat(0x3A322C, "stone"));
rk.scale.set(1.05, 0.34, 0.95);
rk.position.set(x, 0.36, z);
rk.rotation.y = ry;
otmP().add(rk);
var rk2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), otmMat(0x2E2824, "stone"));
rk2.position.set(x + Math.sin(ry + 2) * 0.8, 0.22, z + Math.cos(ry + 2) * 0.8);
rk2.scale.y = 0.6;
otmP().add(rk2);
var gold = otmMat(0xD8A830, "metal", { phong: 90, spec: 0xFFE080 });
for (var c = 0; c < (lite ? 6 : 14); c++) {
var a = ry + (c / (lite ? 6 : 14) - 0.5) * 2.2, r = 1.0 + (c % 3) * 0.12;
otmCyl(0.07, 0.025, gold, x + Math.sin(a) * r, 0.06 + (c % 3) * 0.02, z + Math.cos(a) * r, null, 8).rotation.x = 0.2 * (c % 2);
}
var pile = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), gold);
pile.scale.y = 0.45;
pile.position.set(x + Math.sin(ry + 0.9) * 1.05, 0, z + Math.cos(ry + 0.9) * 1.05);
otmP().add(pile);
otmRound(x, z, 1.12, 0, 3);
},
function (t) {
var L = OTM.wyrms;
if (!L || !L.length)
return;
var lite = OTM.lite, j = Math.floor(t * 10) % 2;
L.forEach(function (W, i) {
if (lite && (i & 1) !== j)
return;
if (!W.g.parent) {
return;
}
var br = 1 + 0.018 * Math.sin(t * 1.25 + W.ph);
W.body.scale.y = W.body.scale.x * br;
W.heads.forEach(function (H, k) { H.g.rotation.y = H.base + 0.22 * Math.sin(t * 0.31 + H.ph + k) + 0.08 * Math.sin(t * 0.13 + k * 2); H.g.rotation.x = 0.06 * Math.sin(t * 0.27 + H.ph); });
W.wings.forEach(function (w, k) { w.rotation.z = (k ? -1 : 1) * 0.04 * Math.sin(t * 0.6 + W.ph); });
});
},
function () {
var R = otmRoom({ x0: -56, z0: 14, x1: -34, z1: 34, h: 8, name: "the Library", key: "library", floor: otmMat(0x2A1A10, "wood"), wall: otmMat(0x2A2018, "wood"), ceil: otmMat(0x1A120C, "wood"),
doors: { n: [{ at: -45, w: 2.6, h: 3.4 }], s: [{ at: -45, w: 2.4, h: 3.2, bare: 1 }] } }), lite = OTM.lite, wd = otmM("wood");
function shelfRun(x0, x1, z, ry) {
for (var x = x0; x < x1 - 0.5; x += 2.2) {
if (Math.abs(x + 1.1 - (-45)) < 2.6)
continue;
var g = otmGroup(x + 1.1, 0, z, ry);
otmBox(2.1, 6.6, 0.5, otmMat(0x1E140C, "wood"), 0, 3.3, 0, g);
for (var s = 0; s < (lite ? 6 : 11); s++) {
var yy = 0.35 + s * 0.58;
otmBox(2.0, 0.04, 0.44, otmMat(0x2A1A10, "wood"), 0, yy, 0.04, g);
if (!lite || s % 2 === 0)
otmBox(1.86, 0.34, 0.3, otmCanvasMat("spines" + (s % 3), 256, 48, function (c, W, H) { for (var i = 0; i < W; i += 9) {
c.fillStyle = ["#5A1A1A", "#1A2A4A", "#2A3A1A", "#4A3A1A", "#1A1A1A", "#6A4A2A"][(i / 9 | 0) % 6];
c.fillRect(i, (i * 7) % 10, 8, H);
c.fillStyle = "#C8A050";
c.fillRect(i + 2, 14, 4, 2);
} }), 0, yy + 0.2, 0.12, g);
}
}
}
shelfRun(R.x0 + 0.4, R.x1 - 0.4, R.z0 + 0.5, 0);
[R.x0 + 0.5, R.x1 - 0.5].forEach(function (x, i) {
for (var z = R.z0 + 3; z < R.z1 - 1.8; z += 2.2) {
if (Math.abs(z - 24) < 1.4 && false)
continue;
var g = otmGroup(x, 0, z + 1.1, i ? -Math.PI / 2 : Math.PI / 2);
otmBox(2.1, 6.6, 0.5, otmMat(0x1E140C, "wood"), 0, 3.3, 0, g);
for (var s = 0; s < (lite ? 6 : 11); s++) {
var yy = 0.35 + s * 0.58;
otmBox(2.0, 0.04, 0.44, otmMat(0x2A1A10, "wood"), 0, yy, 0.04, g);
if (!lite || s % 2 === 0)
otmBox(1.86, 0.34, 0.3, otmCanvasMat("spines" + ((s + 1) % 3), 256, 48, function () { }), 0, yy + 0.2, 0.12, g);
}
}
});
var dl = -45 - 1.5 - R.x0, dr = R.x1 - (-45 + 1.5);
otmSolid(R.x0 + dl / 2, R.z0 + 0.6, dl / 2, 0.4, 0, 7);
otmSolid(R.x1 - dr / 2, R.z0 + 0.6, dr / 2, 0.4, 0, 7);
otmSolid(R.x0 + 0.6, R.cz, 0.4, R.d / 2, 0, 7);
otmSolid(R.x1 - 0.6, R.cz, 0.4, R.d / 2, 0, 7);
for (var t = 0; t < (lite ? 2 : 4); t++) {
var tx = R.cx + (t % 2 ? 3.2 : -3.2), tz = R.z0 + 5 + Math.floor(t / 2) * 6;
otmBox(2.6, 0.08, 1.2, wd, tx, 0.78, tz);
otmBox(2.4, 0.7, 0.06, wd, tx, 0.4, tz);
otmSolid(tx, tz, 1.3, 0.6, 0, 0.9);
[-0.7, 0.7].forEach(function (o) { otmCyl(0.02, 0.4, otmM("gold"), tx + o, 1.0, tz, null, 5); var sh = otmCyl(0.12, 0.12, otmMat(0x1A5A2A, null, { e: 0x0A3A14, ei: 1 }), tx + o, 1.25, tz, null, 10, 0.18); });
[-1, 1].forEach(function (s) { otmBox(0.5, 0.06, 0.5, otmM("velvet"), tx + s * 0.7, 0.48, tz + s * 0.9); otmBox(0.5, 0.6, 0.06, otmM("velvet"), tx + s * 0.7, 0.8, tz + s * 1.15); });
}
otmSph(0.6, otmCanvasMat("globe", 256, 128, function (c, W, H) { c.fillStyle = "#C8B888"; c.fillRect(0, 0, W, H); c.fillStyle = "#6A7A4A"; for (var i = 0; i < 14; i++) {
c.beginPath();
c.ellipse((i * 61) % W, (i * 37) % H, 18 + (i % 4) * 8, 10 + (i % 3) * 6, i, 0, 6.3);
c.fill();
} }), R.x1 - 2.4, 1.5, R.z1 - 2.4, null, 20);
otmCyl(0.05, 0.9, otmM("wood"), R.x1 - 2.4, 0.45, R.z1 - 2.4, null, 6);
otmRound(R.x1 - 2.4, R.z1 - 2.4, 0.7, 0, 2);
(function () {
var tx = R.cx + 3.2, tz = R.z0 + 5;
var bk = otmBox(0.5, 0.05, 0.36, otmMat(0x3A2A1A, null), tx - 0.3, 0.86, tz);
bk.rotation.y = 0.25;
otmBox(0.46, 0.01, 0.32, otmMat(0xE8DCC0, null), tx - 0.3, 0.89, tz).rotation.y = 0.25;
otmSpot(tx, tz + 1.2, 1.4, "📖 The cellar book", "read it", function () {
worldCard(worldFacts("📖 The cellar book of the Temple", "in a dozen hands, the oldest entries faded brown", [["1694", "for the founding table, all drunk"], ["1717", "☽  the year the lodges came out of the dark"], ["1733", "sour, give to the vinegar"], ["1752", "for the Samhain table"], ["1781", "○  the year the cards were read for what they are, and a new light was found in the sky"], ["1790", "for the High Priest's own table"],
["1801", "☾  the year the old art was written down in one book, before it faded"], ["1804", "corked, a bad year"], ["1823", "for guests"], ["1847", "for the Samhain table"], ["1866", "good, keep"], ["1891", "for the cooking"]], ["Three of the years carry no tasting note, only a little drawing of the moon in the margin and a line about the year itself.", "On the last page, in a newer hand: 'Never to be drunk. Never to be moved. Only turned, and only by those who know why.'"]), {});
});
})();
OTM_BOOKS.forEach(function (B, i) {
var bx = R.x0 + 2.4 + (i % 5) * ((R.w - 4.8) / 4), bz = R.z0 + (i < 5 ? 3.0 : R.z1 - R.z0 - 3.4);
otmCyl(0.04, 1.0, otmM("wood"), bx, 0.5, bz, null, 6);
var bk = otmBox(0.5, 0.06, 0.36, otmMat([0x5A1A1A, 0x1A2A4A, 0x2A3A1A, 0x4A3A1A, 0x1A1A1A][i % 5], null), bx, 1.05, bz);
bk.rotation.x = -0.4;
otmRound(bx, bz, 0.3, 0, 1.1);
otmSpot(bx, bz + (i < 5 ? 0.9 : -0.9), 1.2, "📖 " + B[1], "read", function () { otmBook(B); });
});
otmSecret({ id: "lhp", kind: "tapestry", dir: "x", at: -45, c: 33.7, y: 0, w: 2.4, h: 3.3, face: -1, name: "The Qliphoth tapestry lifts: behind it, a black door, standing open",
hint: "🧵 A tapestry of a strange tree, hung upside down. A draught moves it",
when: function () { if (otmKeeper())
return ""; if (!otmSigned())
return "🧵 The tapestry does not move. (Sign in.)"; if (!otmAdult())
return "🧵 The tapestry does not move for you. What lies behind it is for grown dreamers."; if (!otmWingOn("lhp"))
return "🧵 The tapestry is sewn to the wall today."; return ""; } });
otmSign(["THE LIBRARY OF THE TEMPLE", "read what the faiths wrote of themselves"], 4.2, 0.6, "#1A120C", "#D8C890", R.cx, 4.2, R.z0 + 0.82, 0);
},
function (R) {
var x = R.cx, z = R.z1 - 3.2;
otmBox(2.6, 1.1, 1.1, otmMat(0x050306, "marble", { phong: 140 }), x, 0.55, z);
otmBox(2.7, 0.06, 1.2, otmMat(0x6A0A1A, null), x, 1.13, z);
otmSolid(x, z, 1.4, 0.7, 0, 1.2);
otmCyl(0.05, 2.2, otmM("iron"), x, 2.2, z + 0.3, null, 6);
for (var i = 0; i < 7; i++) {
var a = (i - 3) * 0.32, fx = x + Math.sin(a) * 1.0, fy = 2.9 + Math.cos(a) * 0.5;
otmCyl(0.03, 0.2, otmM("iron"), fx, fy, z + 0.3, null, 5);
otmFlame(fx, fy + 0.1, z + 0.3, 1.2, 0xFF3A2A);
}
otmMoonDisc(x, 5.6, R.z1 - 0.25, 1.2, Math.PI);
},
function () {
var fns = {}, did = otmProg().oath || (OTM.rite && OTM.rite.oath);
fns.swear = function () { otmRiteMark("oath"); worldCard(null); otmSay("🜏 <b>You have sworn.</b> The seven flames lean toward you and are still again. The temple will remember."); };
fns.no = function () { worldCard(null); };
worldCard(worldFacts("🜏 The black altar", "the oath of the Left-Hand Path", [], [
"The words come from India: in Tantra the 'left-hand' way (vamamarga) was the path that broke the ordinary rules of purity on purpose. Western occultists took the phrase in the nineteenth and twentieth centuries for a path that puts the self and its will at the centre, instead of submitting it.",
"Here it means only this: you walk with open eyes, you answer for yourself, and you do no harm to anyone who has not chosen it.",
"Swearing is your own choice. It changes nothing you can see today."
]) +
(did ? "" : worldBtn("swear", "I walk the Left-Hand Path", "say the oath at the black altar")) + worldBtn("no", "Not now", ""), fns);
},
function () {
var R = otmRoom({ x0: -14, z0: -64, x1: 14, z1: -38, h: 10, name: "the Dark Ballroom", key: "ballroom", floor: otmMat(0x050407, "marble", { phong: 140, spec: 0x8A8A9A }), wall: otmMat(0x1A1420, "plaster"), ceil: otmMat(0x08060A, "plaster"),
doors: { s: [{ at: -10, w: 2.6, h: 3.4 }, { at: 10, w: 2.6, h: 3.4 }], e: [{ at: -51, w: 2.4, h: 3.2, bare: 1 }] } }), lite = OTM.lite;
[-10, 10].forEach(function (at) { otmRoom({ x0: at - 1.6, z0: -38, x1: at + 1.6, z1: -36, h: 3.6, name: "the way to the ballroom", key: "ballway", skip: "ns", floor: otmM("floor"), wall: otmM("wall"), ceil: otmM("ceil"), spell: 0 }); });
for (var i = 0; i < (lite ? 3 : 5); i++) {
var z = R.z0 + 3 + i * 4.4;
[R.x0 + 0.22, R.x1 - 0.22].forEach(function (x, s) {
if (s && Math.abs(z + 51) < 2)
return;
otmBox(0.06, 4.5, 1.9, otmM("gold"), x, 2.8, z);
otmPlane(1.6, 4.2, otmMat(0x9A9AB0, null, { phong: 160, spec: 0xFFFFFF }), s ? x - 0.04 : x + 0.04, 2.8, z, s ? -Math.PI / 2 : Math.PI / 2);
otmBox(0.9, 0.42, 2.2, otmM("velvet"), s ? x - 0.6 : x + 0.6, 0.21, z + 2.2);
otmBox(0.2, 0.7, 2.2, otmM("velvet"), s ? x - 0.15 : x + 0.15, 0.55, z + 2.2);
otmSolid(s ? x - 0.6 : x + 0.6, z + 2.2, 0.5, 1.1, 0, 0.8);
});
}
otmBox(12, 0.6, 4, otmMat(0x120E14, "wood"), R.cx, 0.3, R.z0 + 2);
otmSolid(R.cx, R.z0 + 2, 6, 2, 0, 0.6);
otmFloor(R.cx - 6, R.z0, R.cx + 6, R.z0 + 4, 0.6);
var pn = otmGroup(R.cx - 3, 0.6, R.z0 + 1.6, 0.2);
otmBox(1.5, 1.0, 0.6, otmMat(0x050405, null, { phong: 120 }), 0, 0.5, 0, pn);
otmBox(1.5, 0.05, 1.6, otmMat(0x050405, null, { phong: 120 }), 0, 1.0, -0.3, pn);
var hp = otmGroup(R.cx + 2.5, 0.6, R.z0 + 1.6, 0);
otmCyl(0.05, 1.8, otmM("gold"), 0, 0.9, 0, hp, 6);
var arc = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 6, 16, Math.PI), otmM("gold"));
arc.position.set(0.5, 1.3, 0);
arc.rotation.z = -0.6;
hp.add(arc);
OTM.chand = [];
var spots = [[0, -51, 1.3], [-7, -44.5, 1], [7, -44.5, 1], [-7, -57.5, 1], [7, -57.5, 1]];
spots.forEach(function (S, ci) {
var g = otmGroup(S[0], 7.0, S[1]), sc = S[2], ir = otmM("iron"), C = { g: g, flames: [], ci: ci, sc: sc };
otmCyl(0.02, 3, ir, 0, 1.6, 0, g, 4);
for (var tier = 0; tier < (lite ? 2 : 3); tier++) {
var rr = (1.6 - tier * 0.45) * sc, yy = -tier * 0.7, n = (lite ? 8 : 14) - tier * 3;
var ring = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.05, 6, lite ? 16 : 32), ir);
ring.rotation.x = Math.PI / 2;
ring.position.y = yy;
g.add(ring);
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2, fx = Math.cos(a) * rr, fz = Math.sin(a) * rr;
otmCyl(0.04, 0.1, ir, fx, yy + 0.05, fz, g, 6);
var core = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.34, 8), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.95 }));
core.position.set(fx, yy + 0.28, fz);
g.add(core);
var gl = (typeof wGlow === "function") ? wGlow(0xFFFFFF, 1.0, 0.5) : null;
if (gl) {
gl.position.set(fx, yy + 0.32, fz);
g.add(gl);
}
C.flames.push({ core: core, gl: gl, ph: k * 1.7 + ci });
}
}
var halo = (typeof wGlow === "function") ? wGlow(0xFFFFFF, 6 * sc, 0.16) : null;
if (halo) {
halo.position.y = -0.6;
g.add(halo);
C.halo = halo;
}
OTM.chand.push(C);
});
otmSecret({ id: "seance", kind: "fireplace", dir: "z", at: -51, c: 13.7, y: 0, w: 2.4, h: 3.2, face: -1, cold: true, name: "The cold fireplace sinks into the floor: a small round room lies behind it, with a table set for the dead",
hint: "🕯️ A cold fireplace, swept clean, its back wall black and smooth as glass" });
otmSpot(R.cx, R.cz, 4, "💃 The ballroom floor", "dance", function () { otmSay("💃 You dance across the black floor, your reflection dancing under you, the chandeliers turning their slow colours overhead."); });
},
function (t) {
if (!OTM.chand)
return;
var pal = (OTM_FLAMES[otmCfg().flames] || OTM_FLAMES.moods).c, c = OTM.tmpC || (OTM.tmpC = new THREE.Color());
OTM.chand.forEach(function (C, i) {
var P = pal[i % pal.length], h = (P[0] + 0.05 * Math.sin(t * 2 * Math.PI / 40 + i * 1.3) + 1) % 1, flare = 1 + 0.22 * Math.max(0, Math.sin(t * 2 * Math.PI / 6 + i * 0.9));
c.setHSL(h, P[1], 0.6);
var j = Math.floor(t * 20) % 2;
C.flames.forEach(function (F, k) { if ((k & 1) !== j)
return; F.core.material.color.copy(c); F.core.scale.y = flare * (1 + 0.06 * Math.sin(t * 3.1 + F.ph)); if (F.gl) {
F.gl.material.color.copy(c);
F.gl.scale.setScalar(1.0 * flare);
} });
if (C.halo) {
C.halo.material.color.copy(c);
C.halo.material.opacity = 0.12 + 0.05 * (flare - 1) / 0.22;
}
});
},
function () {
var R = otmRoom({ x0: 14, z0: -58, x1: 24, z1: -44, h: 4.5, name: "the Seance Room", key: "seance", floor: otmMat(0x1A0E14, "wood"), wall: otmMat(0x2A0E1A, "plaster"), ceil: otmMat(0x0A0608, "plaster"),
doors: { w: [{ at: -51, w: 2.4, h: 3.2, bare: 1 }] } }), lite = OTM.lite;
otmCyl(1.5, 0.08, otmM("wood"), R.cx, 0.78, R.cz, null, 24);
otmCyl(1.55, 0.5, otmMat(0x2A0A1A, null), R.cx, 0.55, R.cz, null, 24, 1.62);
otmRound(R.cx, R.cz, 1.6, 0, 0.9);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, cx = R.cx + Math.cos(a) * 2.2, cz = R.cz + Math.sin(a) * 2.2, g = otmGroup(cx, 0, cz, -a - Math.PI / 2);
otmBox(0.5, 0.06, 0.5, otmM("velvet"), 0, 0.48, 0, g);
otmBox(0.5, 0.9, 0.06, otmMat(0x1A0E0A, "wood"), 0, 0.95, 0.24, g);
}
otmSph(0.22, otmMat(0xC8D8FF, null, { op: 0.6, e: 0x3A4A8A, ei: 1 }), R.cx, 1.05, R.cz, null, 18);
var cg = (typeof wGlow === "function") ? wGlow(0x8A9AFF, 1.6, 0.45) : null;
if (cg) {
cg.position.set(R.cx, 1.05, R.cz);
otmP().add(cg);
}
var bd = otmCanvasMat("spiritboard", 256, 160, function (c, W, H) {
c.fillStyle = "#C8A870";
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A1A0A";
c.font = "bold 16px serif";
c.textAlign = "center";
c.fillText("A B C D E F G H I J K L M", W / 2, 60);
c.fillText("N O P Q R S T U V W X Y Z", W / 2, 86);
c.fillText("1 2 3 4 5 6 7 8 9 0", W / 2, 112);
c.font = "bold 14px serif";
c.fillText("YES", 30, 24);
c.fillText("NO", W - 30, 24);
c.fillText("GOOD BYE", W / 2, 148);
c.beginPath();
c.arc(W / 2, 24, 12, 0, 6.3);
c.fill();
});
var b = otmPlane(0.9, 0.56, bd, R.cx + 0.6, 0.83, R.cz + 0.3, 0);
b.rotation.x = -Math.PI / 2;
for (var c = 0; c < (lite ? 6 : 12); c++) {
var a2 = c / (lite ? 6 : 12) * Math.PI * 2;
otmCandle(R.cx + Math.cos(a2) * 1.2, 0.82, R.cz + Math.sin(a2) * 1.2, 0.9);
}
[[R.x0 + 0.6, R.z0 + 0.6], [R.x1 - 0.6, R.z0 + 0.6], [R.x1 - 0.6, R.z1 - 0.6]].forEach(function (p) { otmCandelabrum(p[0], 0, p[1]); });
otmSpot(R.cx - 2.6, R.cz, 1.8, "🔮 The seance table", "call a spirit", function () { otmSeanceCard(); });
otmSpot(R.cx + 2.6, R.cz, 1.8, "🔮 The seance table", "call a spirit", function () { otmSeanceCard(); });
},
function () {
var fns = {}, b = "";
[["seance:ancestor", "An ancestor of yours", "someone of your own blood, long dead, who has been waiting to be asked"],
["seance:pythia", "The Pythia of Delphi", "Apollo's priestess, who spoke from the tripod for a thousand years"],
["seance:endor", "The woman of Endor", "who called up the prophet Samuel for King Saul (1 Samuel 28)"],
["greek:hecate", "Hecate", "Lady of the crossroads and of the dead, who holds the keys"],
["seance:samhain", "The Dead of Samhain night", "the old Irish dead, who walk when the year turns and the veil is thin"]].forEach(function (S) {
b += worldBtn("s_" + S[0], S[1], S[2]);
fns["s_" + S[0]] = function () { worldCard(null); otmRiteMark("seance"); otmSay("🔮 The candles lean. The crystal clouds over, then clears."); otmTalk(S[0], "a seance at the round table in the Seance Room of the Temple of the Obsidian Moon, called up by the living"); };
});
worldCard(worldFacts("🔮 The seance table", "sit, join hands, and call", [], ["Spiritualist seances were all the rage from the 1850s to the 1920s: the Fox sisters' knockings in 1848 began it, and Arthur Conan Doyle believed to the end. Older still are the oracles and the necromancers of the ancient world.", "Choose who you call. They will answer in their own voice."]) + b, fns);
},
function () {
var p = otmProg(), n = Object.keys(p.found || {}).length;
worldCard(worldFacts("📜 The ledger of the Temple of the Obsidian Moon", "kept by the High Priest", [], [
"Before Somnucor had streets, there was this house. Its first rite was a question asked of the Moon, and the dream that answered it is the whole world you walk in now.",
"Every faith that has looked up at her keeps a wing here. Some of the doors are hidden, because some things are better found than shown.",
"You have found " + n + " of the temple's hidden ways."
], otmIsPriest() ? worldBtn("pet", "📜 Requests to join the coven", "read them, and answer yes or not this time") : ""), otmIsPriest() ? { pet: function () { otmPetitions(); } } : {});
},
function () {
var M = otmMoonPhase(Date.now()), f = M.frac, names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
var nm = names[Math.floor((f * 8 + 0.5)) % 8], lit = Math.round((1 - Math.cos(f * Math.PI * 2)) / 2 * 100);
worldCard(worldFacts("🌙 The Moon tonight", nm, [["Her age", M.age.toFixed(1) + " days since the new moon"], ["Lit", lit + "% of her face"], ["A full cycle", "29.53 days (the synodic month)"]], ["The phase is worked out here from the real date and the Moon's real cycle, so it is the Moon over your own roof tonight.", "She always shows us the same face: she turns once on her axis for every time she goes round the Earth."]), {});
},
function () {
var V = otmRoom({ x0: 14, z0: -40, x1: 26, z1: -30, h: 5, name: "the vestry", key: "vestry", floor: otmMat(0x1E1A16, "wood"), wall: otmMat(0x2A2630, "plaster"), ceil: otmMat(0x141218, "plaster"),
doors: { w: [{ at: -35, w: 1.6, h: 2.6 }], e: [{ at: -35, w: 2.2, h: 3.0, bare: 1 }] } }), lite = OTM.lite;
for (var r = 0; r < (lite ? 4 : 7); r++) {
var rz = V.z0 + 0.8 + r * 1.2;
otmBox(0.06, 0.06, 0.3, otmM("iron"), V.cx - 2, 2.1, V.z0 + 0.3);
var robe = otmCyl(0.2, 1.5, otmMat([0x1A0E1E, 0x0E0A14, 0x3A0E1E][r % 3], null), V.x0 + 1.4 + r * 1.1, 1.3, V.z0 + 0.5, null, 8, 0.34);
}
otmBox(1.4, 0.7, 0.7, otmMat(0x2A1A0C, "wood"), V.cx + 1, 0.35, V.z1 - 0.7);
otmSolid(V.cx + 1, V.z1 - 0.7, 0.7, 0.35, 0, 0.7);
otmSolid(V.cx, V.z0 + 0.6, V.w / 2, 0.4, 0, 2);
otmSecret({ id: "bath", kind: "tapestry", dir: "z", at: -35, c: 25.7, y: 0, w: 2.2, h: 3.0, face: -1, name: "The tapestry lifts: warm air and the smell of water come through. The coven bath",
hint: "🧵 A tapestry of the moon over still water. It is warm to the touch",
when: function () { if (otmKeeper())
return ""; if (!otmSigned())
return "🧵 The tapestry does not move. (Sign in.)"; if (!otmAdult())
return "🧵 The tapestry does not move for you: what is behind it is for grown dreamers."; return ""; } });
var B = otmRoom({ x0: 26, z0: -46, x1: 44, z1: -24, h: 7, name: "the coven bath", key: "bath", floor: otmMat(0x7A746E, "marble", { phong: 50 }), wall: otmMat(0x2A3040, "marble"), ceil: otmMat(0x0E1018, "plaster"),
doors: { w: [{ at: -35, w: 2.2, h: 3.0, bare: 1 }] } });
var px = B.cx + 1, pz = B.cz, pr = 5;
otmCyl(pr + 0.6, 0.3, otmMat(0x9A928A, "marble", { phong: 40 }), px, 0.15, pz, null, lite ? 24 : 48);
otmFloor(px - pr, pz - pr, px + pr, pz + pr, 0.3);
var wtr = new THREE.Mesh(new THREE.CircleGeometry(pr, lite ? 24 : 48), otmMat(0x2A5A7A, null, { phong: 140, op: 0.82, e: 0x0A1A2A, ei: 1 }));
wtr.rotation.x = -Math.PI / 2;
wtr.position.set(px, 0.34, pz);
otmP().add(wtr);
OTM.water = wtr;
for (var i = 0; i < (lite ? 6 : 10); i++) {
var a = i / (lite ? 6 : 10) * Math.PI * 2;
otmPillar(px + Math.cos(a) * (pr + 1.8), pz + Math.sin(a) * (pr + 1.8), 0, 6.6, 0.32);
}
for (var c = 0; c < (lite ? 10 : 20); c++) {
var a2 = c / (lite ? 10 : 20) * Math.PI * 2;
otmCandle(px + Math.cos(a2) * (pr + 0.35), 0.3, pz + Math.sin(a2) * (pr + 0.35), 0.9);
}
var beam = otmCyl(1.6, 6.8, otmGlowM(0xB8C8FF, 0.08), px, 3.6, pz, null, 20, 2.4);
beam.material.depthWrite = false;
OTM.steam = [];
for (var s = 0; s < (lite ? 4 : 10); s++) {
var st = (typeof wGlow === "function") ? wGlow(0xDDE4F0, 2.4, 0.12) : null;
if (st) {
st.position.set(px + Math.cos(s * 2.3) * 2.6, 0.8 + (s % 3) * 0.5, pz + Math.sin(s * 2.3) * 2.6);
otmP().add(st);
OTM.steam.push({ s: st, ph: s * 1.3, y0: st.position.y });
}
}
otmSpot(px - pr - 0.9, pz, 2, "♨️ The coven bath", "bathe", function () { otmSay("♨️ You sink into the warm water to the shoulders. Moonlight comes down through the oculus and lies on the water like a coin."); });
[[B.x0 + 1.4, B.z0 + 1.4], [B.x0 + 1.4, B.z1 - 1.4]].forEach(function (p) { otmBox(1.8, 0.45, 0.6, otmMat(0x9A928A, "marble", { phong: 40 }), p[0] + 0.6, 0.22, p[1]); otmSolid(p[0] + 0.6, p[1], 0.9, 0.3, 0, 0.5); });
},
function () {
var lite = OTM.lite, st = otmMat(0x2E2A2A, "stone"), fl = otmMat(0x26221E, "stone"), U = -6;
var W = otmRoom({ x0: 14, z0: -30, x1: 24, z1: -14, y: U, h: 12, name: "the crypt stair", key: "cstair", floor: fl, wall: st, ceil: otmMat(0x141212, "stone"),
doors: { w: [{ at: -16, w: 2, h: 3, sill: 6 }], n: [{ at: 19, w: 2.4, h: 3 }] } });
otmBox(9.4, 0.3, 3.8, fl, 19, -0.15, -15.9);
otmFloor(14.3, -17.8, 23.7, -14, 0);
var n = 20;
for (var i = 0; i < n; i++) {
var z = -18 - (i + 0.5) * 0.5, top = -(i + 0.5) * 0.3;
otmBox(5.6, 0.3, 0.5, st, 19, top - 0.15, z);
otmBox(5.6, Math.max(0.1, 6 + top - 0.3), 0.5, otmMat(0x1E1A1A, "stone"), 19, U + (6 + top - 0.3) / 2, z);
}
otmRampAt(16.2, -28, 21.8, -18, "z", -18, 0, -28, U);
otmFloor(14.3, -29.7, 23.7, -28, U);
for (var sg = 0; sg < 5; sg++) {
var lo = -1.2 * sg - 1.2;
if (lo + 6 - 0.2 > 0.4)
otmSolid(19, -19 - sg * 2, 2.8, 1, U, lo + 6 - 0.2);
}
[[15.1, -18], [22.9, -18]].forEach(function (p) { otmBox(1.6, 1.0, 0.08, otmM("iron"), p[0], 0.5, p[1]); otmSolid(p[0], p[1], 0.8, 0.08, 0, 1.1); });
[16.1, 21.9].forEach(function (x) {
for (var s2 = 0; s2 < 5; s2++) {
var zc = -19 - s2 * 2, hi = -1.2 * s2, lo2 = hi - 1.2, rl = otmBox(0.06, 0.06, 2.1, otmM("iron"), x, (hi + lo2) / 2 + 1.0, zc);
rl.rotation.x = Math.atan2(1.2, 2);
otmCyl(0.025, 1.0, otmM("iron"), x, lo2 + 0.5 + 0.6, zc, null, 5);
otmSolid(x, zc, 0.06, 1.0, lo2, 2.3);
}
});
otmCandle(15, 0, -14.6, 1);
otmCandle(23, 0, -14.6, 1);
for (var t = 0; t < 4; t++)
otmCandle(23.4, U + 1.5 + t * 1.2, -27 + t * 3, 0.9);
otmSign(["THE UNDERCROFT", "the crypt, the store rooms, the wine cellar"], 3, 0.5, "#1A1614", "#C8C0A8", 19, 3.1, -14.5, Math.PI);
var H = otmRoom({ x0: 14, z0: -42, x1: 24, z1: -30, y: U, h: 4.6, name: "the undercroft", key: "undercroft", floor: fl, wall: st, ceil: otmMat(0x141212, "stone"), doors: { s: [{ at: 19, w: 2.4, h: 3 }], w: [{ at: -36, w: 2, h: 2.8 }] } });
for (var v = 0; v < 3; v++) {
var arch = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.25, 6, 16, Math.PI), st);
arch.position.set(19, U + 0.2, -32 - v * 4);
otmP().add(arch);
}
otmCandelabrum(16, U, -40);
otmCandelabrum(22, U, -40);
var C = otmRoom({ x0: -14, z0: -46, x1: 0, z1: -26, y: U, h: 4.6, name: "the crypt", key: "crypt", floor: fl, wall: st, ceil: otmMat(0x141212, "stone"), doors: { e: [{ at: -36, w: 2, h: 2.8 }], s: [{ at: -7, w: 1.8, h: 2.6 }] } });
for (var k = 0; k < (lite ? 4 : 6); k++) {
var tx = C.x0 + 2.6 + (k % 2) * (C.w - 5.2), tz = C.z0 + 3 + Math.floor(k / 2) * 5.2;
otmBox(1.2, 0.9, 2.4, otmMat(0x4A4640, "stone"), tx, U + 0.45, tz);
otmBox(1.3, 0.15, 2.5, otmMat(0x5A5650, "marble"), tx, U + 0.97, tz);
otmSolid(tx, tz, 0.65, 1.25, U, 1.1);
otmCyl(0.12, 0.4, otmMat(0x5A5650, "marble"), tx, U + 1.2, tz - 0.9, null, 8);
}
var lamp = otmGroup(C.cx, U + 3, C.cz);
otmCyl(0.01, 1.4, otmM("iron"), 0, 0.7, 0, lamp, 4);
otmSph(0.18, otmGlowM(0xFF8A30), 0, 0, 0, lamp, 10);
otmSpot(C.cx, C.cz + 2, 2.2, "⚱️ The founders' tombs", "read the names", function () { otmSay("⚱️ The names on the lids are worn too smooth to read. Someone has left fresh flowers on every one."); }, { y: U });
var S = otmRoom({ x0: -14, z0: -26, x1: 0, z1: -14, y: U, h: 4.6, name: "the store rooms", key: "stores", floor: fl, wall: st, ceil: otmMat(0x141212, "stone"), doors: { n: [{ at: -7, w: 1.8, h: 2.6 }] } });
for (var b = 0; b < (lite ? 6 : 12); b++) {
var bxx = S.x0 + 1 + (b % 6) * 2.2, bzz = S.z1 - 1 - Math.floor(b / 6) * 1.4;
otmBox(0.9, 0.9, 0.9, otmMat(0x4A3A24, "wood"), bxx, U + 0.45, bzz);
otmSolid(bxx, bzz, 0.45, 0.45, U, 0.9);
}
[S.x0 + 2.4, S.x1 - 2.4].forEach(function (sx) { otmBox(3.4, 0.05, 0.6, otmMat(0x3A2A1A, "wood"), sx, U + 1.6, S.z0 + 0.6); for (var j = 0; j < 6; j++)
otmCyl(0.12, 0.3, otmMat([0xD8D0C0, 0x8A6A3A, 0x3A3A3A][j % 3], null), sx - 1.4 + j * 0.5, U + 1.78, S.z0 + 0.6, null, 8); otmSolid(sx, S.z0 + 0.6, 1.7, 0.35, U, 2); });
var Wc = otmRoom({ x0: 0, z0: -46, x1: 14, z1: -26, y: U, h: 4.6, name: "the wine cellar", key: "wine", floor: fl, wall: otmMat(0x3A2E26, "brick"), ceil: otmMat(0x1A1414, "brick"),
doors: { e: [{ at: -36, w: 2, h: 2.8 }], w: [{ at: -36, w: 2, h: 2.8 }], n: [{ at: 7, w: 2.0, h: 2.8, bare: 1, noStep: 1 }] } });
otmWineRacks(Wc, U, lite);
OTM.wine.secs.forEach(function (S) { otmSpot(S.wx + S.dir * 1.5, S.zc, 1.3, "🍷 A rack of old bottles", "look along it", function () { otmRackCard(S.s, S.r); }, { y: U }); });
for (var br = 0; br < (lite ? 2 : 4); br++) {
var bb = otmCyl(0.55, 1.2, otmMat(0x5A3A1E, "wood"), Wc.cx - 1.8 + br * 1.2, U + 0.6, Wc.z1 - 1.4, null, 14, 0.5);
bb.rotation.z = Math.PI / 2;
otmSolid(Wc.cx - 1.8 + br * 1.2, Wc.z1 - 1.4, 0.55, 0.65, U, 1.2);
}
otmGlamour(Wc);
var D = otmRoom({ x0: 2, z0: -56, x1: 12, z1: -46, y: U, h: 4.6, name: "a cold room", key: "cold", floor: otmMat(0x141010, "stone"), wall: otmMat(0x1A1414, "stone"), ceil: otmMat(0x0A0808, "stone"),
doors: { s: [{ at: 7, w: 2.0, h: 2.8, bare: 1 }] } });
var ar = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.3, 6, 16, Math.PI), otmMat(0x2A1A1A, "stone"));
ar.position.set(D.cx, U, D.z0 + 0.3);
otmP().add(ar);
otmPlane(3.2, 1.6, otmGlowM(0x020101), D.cx, U + 0.8, D.z0 + 0.32, 0);
var em = (typeof wGlow === "function") ? wGlow(0xFF3A10, 3, 0.2) : null;
if (em) {
em.position.set(D.cx, U + 0.4, D.z0 + 0.5);
otmP().add(em);
}
otmCandle(D.x0 + 0.6, U, D.z0 + 0.6, 1.2);
otmCandle(D.x1 - 0.6, U, D.z0 + 0.6, 1.2);
otmSpot(D.cx, D.z0 + 1.6, 2.2, "🔥 Steps going down into the dark", "go down", function () { otmDeepGo(); }, { y: U, when: function () { return otmDeepOk(); } });
},
function (k, id) {
var B = OTM_BOTTLES[k % OTM_BOTTLES.length], cy = 22, x0 = 6;
var S = [[100, 14, 15, 116, 5, 150], [82, 30, 16, 118, 5, 150], [76, 44, 12, 126, 4.4, 152], [70, 18, 12, 94, 4.4, 118], [92, 14, 16, 112, 6.5, 140]][B.sh];
var xs = S[0], k1 = S[1], h = S[2], xn = S[3], nh = S[4], xe = S[5];
var body = "M" + x0 + "," + (cy - h) + " L" + xs + "," + (cy - h) + " C" + (xs + k1 * 0.6) + "," + (cy - h) + " " + (xn - k1 * 0.4) + "," + (cy - nh) + " " + xn + "," + (cy - nh) + " L" + xe + "," + (cy - nh) +
" L" + (xe + 1.5) + "," + (cy - nh - 1.3) + " L" + (xe + 4) + "," + (cy - nh - 1.3) + " L" + (xe + 4) + "," + (cy + nh + 1.3) + " L" + (xe + 1.5) + "," + (cy + nh + 1.3) + " L" + xe + "," + (cy + nh) +
" L" + xn + "," + (cy + nh) + " C" + (xn - k1 * 0.4) + "," + (cy + nh) + " " + (xs + k1 * 0.6) + "," + (cy + h) + " " + xs + "," + (cy + h) + " L" + x0 + "," + (cy + h) + " Q" + (x0 - 5) + "," + cy + " " + x0 + "," + (cy - h) + " Z";
var g = "g" + id, s = "<svg viewBox='0 0 160 46' width='100%' style='display:block' aria-hidden='true'>" +
"<defs><linearGradient id='" + g + "' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='" + B.glass + "'/><stop offset='.22' stop-color='" + B.hi + "'/><stop offset='.36' stop-color='" + B.glass + "'/><stop offset='1' stop-color='#050505'/></linearGradient>" +
"<linearGradient id='" + g + "d' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#B8B0A0' stop-opacity='" + (B.dust ? .75 : .45) + "'/><stop offset='.5' stop-color='#9A9284' stop-opacity='" + (B.dust ? .4 : .12) + "'/><stop offset='1' stop-color='#9A9284' stop-opacity='0'/></linearGradient></defs>" +
"<rect x='0' y='" + (cy + h - 1) + "' width='160' height='5' fill='#3A2414'/><rect x='0' y='" + (cy + h - 1) + "' width='160' height='1.2' fill='#5A3A20'/>" +
"<path d='M20," + (cy + h + 4) + " q8,-7 16,0 M" + (xs - 12) + "," + (cy + h + 4) + " q8,-7 16,0' fill='#2A1A0E'/>" +
"<path d='" + body + "' fill='url(#" + g + ")' stroke='#000' stroke-opacity='.6' stroke-width='.8'/>";
if (B.label) {
var lx = x0 + 12, lw = Math.min(50, xs - lx - 8);
s += "<g class='roll' style='transform-box:fill-box;transform-origin:50% 50%'><rect x='" + lx + "' y='" + (cy - h + 3) + "' width='" + lw + "' height='" + (h * 2 - 6) + "' rx='1.5' fill='" + B.label + "' opacity='.88'/>" +
"<rect x='" + (lx + 3) + "' y='" + (cy - h + 6) + "' width='" + (lw - 6) + "' height='" + (h * 2 - 12) + "' fill='none' stroke='" + B.ink + "' stroke-width='.6' opacity='.7'/>" +
"<path d='M" + (lx + 10) + "," + (cy - 2) + " h" + (lw - 20) + " M" + (lx + 14) + "," + (cy + 2.5) + " h" + (lw - 28) + "' stroke='" + B.ink + "' stroke-width='1.1' opacity='.75'/>" +
"<circle cx='" + (lx + lw / 2) + "' cy='" + (cy - h + 9) + "' r='2' fill='" + B.ink + "' opacity='.6'/></g>";
}
var cw = B.sh === 3 ? 10 : 14;
s += "<rect x='" + (xe - cw) + "' y='" + (cy - nh - 0.6) + "' width='" + (cw + 4.4) + "' height='" + (nh * 2 + 1.2) + "' rx='1' fill='" + B.cap + "'/>";
if (B.wax)
s += "<path d='M" + (xe - cw) + "," + (cy - nh) + " q-3,3 -1,6 q2,3 -1,6 L" + (xe - cw + 3) + "," + (cy + nh) + " Z' fill='" + B.cap + "'/><circle cx='" + (xe - cw - 3) + "' cy='" + (cy + nh + 0.5) + "' r='1.6' fill='" + B.cap + "'/>";
if (B.wire)
s += "<path d='M" + (xe - cw) + "," + (cy - nh) + " l3.5," + (nh * 2) + " l3.5,-" + (nh * 2) + " l3.5," + (nh * 2) + " l3.5,-" + (nh * 2) + "' fill='none' stroke='#B8B8B0' stroke-width='.8'/>";
if (B.moon)
s += "<circle cx='" + (xe - cw - 5) + "' cy='" + cy + "' r='5' fill='#5A0A10' stroke='#2A0408' stroke-width='.6'/><path d='M" + (xe - cw - 5) + "," + (cy - 3) + " a3.2,3.2 0 1,0 0,6 a2.4,2.4 0 1,1 0,-6 Z' fill='#C8A060'/>";
s += "<path class='roll' style='transform-box:fill-box;transform-origin:50% 50%' d='M" + (x0 + 4) + "," + (cy - h + 3) + " L" + (xs - 4) + "," + (cy - h + 3) + "' stroke='#FFF' stroke-opacity='.18' stroke-width='1.6' stroke-linecap='round'/>" +
"<path class='dust' d='" + body + "' fill='url(#" + g + "d)' style='transition:opacity .9s'/></svg>";
return s;
},
function (s, r) {
var Y = otmRackYears(s, r), fns = {}, h = "<div style='margin-top:8px;padding:6px;display:grid;grid-template-columns:1fr 1fr;gap:6px;border-radius:4px;background:linear-gradient(#1E140C,#140C06);border:1px solid #3A2414'>";
Y.forEach(function (v, k) {
var id = "b" + v, w = (k + s + r) % OTM_WINES.length;
h += "<div data-w='" + id + "' role='button' tabindex='0' aria-label='Turn the bottle of " + v + ", " + OTM_WINES[w] + "' style='padding:3px;border-radius:3px;background:rgba(0,0,0,.25)'>" +
"<div style='display:inline-block;padding:0 6px;background:#1A1A1C;border:1px solid #4A3A2A;border-radius:2px;font:600 13px Georgia,serif;color:#E8E4D8;letter-spacing:.5px'>" + v + "</div>" +
"<div><div class='btl'>" + otmBottleSvg(w, "otb" + s + r + k) + "</div>" +
"<div style='opacity:.65;font-size:10.5px;line-height:1.3;margin:1px 0 0 2px'>" + OTM_WINES[w] + "</div></div></div>";
fns[id] = function (el) { var S = OTM.wine && OTM.wine.secs.filter(function (x) { return x.s === s && x.r === r; })[0]; otmTurnBottle(v, el, S ? S.idx[k] : undefined); };
});
h += "</div><div data-otm='rackmsg' style='min-height:18px;margin-top:6px;font-size:12px;opacity:.85'>Tap a bottle to turn it in its cradle.</div>";
worldCard(worldFacts("🍷 A rack of old bottles", "laid down by the founders, each in its cradle, year by year", [], ["Most of these have not been touched in a very long time."], h), fns);
},
function (v, el, i) {
if (i !== undefined)
otmWineSpin(i);
var msg = "🍷 You turn the bottle of " + v + " in its cradle. Dust slides off the glass.";
if (el && el.querySelector) {
var d = el.querySelector(".dust");
el.querySelectorAll(".roll").forEach(function (g) {
if (g.animate)
g.animate([{ transform: "translateY(0) scaleY(1)", opacity: 1 }, { transform: "translateY(9px) scaleY(.08)", opacity: .2, offset: .45 },
{ transform: "translateY(-9px) scaleY(.08)", opacity: .2, offset: .55 }, { transform: "translateY(0) scaleY(1)", opacity: 1 }], { duration: 900, easing: "ease-in-out" });
});
if (d)
d.style.opacity = "0";
var m = WLD.card && WLD.card.querySelector("[data-otm=rackmsg]");
if (m)
m.textContent = msg.slice(3);
}
else
worldCard(null);
otmSay(msg);
var T = OTM.turns = (OTM.turns || []);
T.push(v);
if (T.length > 3)
T.shift();
if (T.join() === OTM_VINTAGE_KEY.join() && otmDeepOk()) {
var p = otmProg();
OTM.turns = [];
if (!p.found.vintage) {
p.found.vintage = Date.now();
otmProgSave();
}
if (OTM.glam)
OTM.glam.open = true;
setTimeout(function () { if (typeof playTone === "function")
playTone(70, 1.2); otmSay("🍷 Somewhere behind you, stone grinds slowly over stone, and a cold draught moves along the floor."); }, 900);
}
},
function (t, dt) {
var G = OTM.glam;
if (!G)
return;
var p = otmProg();
var want = otmDeepOk() && (G.open || !!(p.found && p.found.vintage));
if (want !== G.on) {
G.on = want;
var i = G.K.solids.indexOf(G.sol);
if (want) {
if (i >= 0)
G.K.solids.splice(i, 1);
}
else if (i < 0)
G.K.solids.push(G.sol);
}
G.amt += ((want ? 1 : 0) - G.amt) * Math.min(1, (dt || 0.05) * 1.4);
G.wall.position.y = G.U + 1.4 - G.amt * 2.95;
G.wall.visible = G.amt < 0.99;
},
function (seg) {
var P = [[0, 0], [0.034, 0], [0.037, 0.01], [0.037, 0.27], [0.032, 0.31], [0.02, 0.34], [0.0145, 0.36], [0.0145, 0.41], [0.016, 0.415], [0.016, 0.42], [0, 0.42]];
var g = new THREE.LatheGeometry(P.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg);
g.computeVertexNormals();
return g;
},
function (Wc, U, lite) {
var R = OTM_RACK, W = { secs: [], dated: [], spin: [], side: [Wc.x0, Wc.x1], U: U };
OTM.wine = W;
var wood = otmMat(0x3A2616, "wood"), dark = otmMat(0x140C08, "wood"), rail = otmMat(0x4A3220, "wood");
var seg = lite ? 8 : 10, bg = otmBottleGeo(seg), cg = new THREE.CylinderGeometry(0.0175, 0.0175, 0.06, seg);
cg.translate(0, 0.395, 0);
var tg = new THREE.BoxGeometry(0.075, 0.004, 0.052);
tg.translate(0.056, 0.4, 0);
var fill = [], dated = [];
[0, 1].forEach(function (s) {
var wx = s ? Wc.x1 : Wc.x0, dir = s ? -1 : 1;
for (var r = 0; r < 7; r++) {
var za = Wc.z0 + 0.1 + r * 2.8, zb = za + 2.8, zc = (za + zb) / 2;
if (Math.abs(zc + 36) < 1.6)
continue;
var S = { s: s, r: r, zc: zc, wx: wx, dir: dir, idx: [] };
W.secs.push(S);
otmBox(R.dx, 0.16, 2.8, dark, wx + dir * R.dx / 2, U + 0.08, zc);
otmBox(0.04, R.y0 + R.rows * R.rh + 0.1, 2.76, dark, wx + dir * 0.04, U + (R.y0 + R.rows * R.rh + 0.1) / 2, zc);
[za + 0.04, zb - 0.04].forEach(function (pz) { otmBox(R.dx + 0.02, R.y0 + R.rows * R.rh + 0.2, 0.07, wood, wx + dir * (R.dx / 2 + 0.01), U + (R.y0 + R.rows * R.rh + 0.2) / 2, pz); });
otmBox(R.dx + 0.1, 0.1, 2.86, wood, wx + dir * (R.dx / 2 + 0.04), U + R.y0 + R.rows * R.rh + 0.22, zc);
for (var j = 0; j < R.rows; j++) {
var ry = U + R.y0 + j * R.rh - 0.045;
otmBox(0.035, 0.03, 2.7, rail, wx + dir * (R.fx - 0.06), ry, zc);
otmBox(0.035, 0.03, 2.7, rail, wx + dir * 0.12, ry, zc);
}
var Y = otmRackYears(s, r), pick = {};
[1, 4, 7, 10, 13, 15].forEach(function (c, k) { pick[c + "," + (5 + ((k * 3 + s + r) % 4))] = k; });
for (var j2 = 0; j2 < R.rows; j2++)
for (var c = 0; c < R.cols; c++) {
var bz = za + 0.16 + c * R.cw + (j2 % 2 ? R.cw / 2 : 0);
if (bz > zb - 0.12)
continue;
var by = U + R.y0 + j2 * R.rh, k = pick[c + "," + j2];
var h = (s * 131 + r * 71 + j2 * 29 + c * 17) % 997;
var B = { x: wx + dir * 0.05, y: by, z: bz, dir: dir, glass: OTM_WINE_GLASS[h % OTM_WINE_GLASS.length], cap: OTM_WINE_CAP[(h >> 3) % OTM_WINE_CAP.length] };
if (k !== undefined) {
B.year = Y[k];
B.k = k;
B.s = s;
B.r = r;
B.wine = OTM_WINES[(k + s + r) % OTM_WINES.length];
B.glass = [0x1C2414, 0x6A4A12, 0x14180E, 0x5A3A0A, 0x2A3A1E, 0x160C0C][(k + s + r) % 6];
B.cap = [0x0A0A0A, 0x8A6A2A, 0x3A1214, 0xB88A3A, 0xC8B890, 0x7A0E14][(k + s + r) % 6];
B.i = dated.length;
S.idx[k] = B.i;
dated.push(B);
}
else if (!(lite && (c + j2) % 2))
fill.push(B);
}
}
});
W.dated = dated;
function inst(geo, mat, list, colOf) {
var M = new THREE.InstancedMesh(geo, mat, Math.max(1, list.length));
M.count = list.length;
M.userData.keep = 1;
M.frustumCulled = false;
list.forEach(function (B, i) { otmWineSet(M, i, B, 0, 0); if (colOf)
M.setColorAt(i, new THREE.Color(colOf(B))); });
if (M.instanceColor)
M.instanceColor.needsUpdate = true;
M.instanceMatrix.needsUpdate = true;
otmP().add(M);
return M;
}
inst(bg, otmWineMat(0x0A0806, 1), fill, function (B) { return B.glass; });
inst(cg, otmWineMat(0x080604, 1), fill, function (B) { return B.cap; });
var found = !!(otmProg().found || {}).vintage;
W.mB = inst(bg, otmWineMat(0x0A0806, 1), dated, function (B) { return otmWineDust(B, found ? 0 : 1); });
W.mC = inst(cg, otmWineMat(0x080604, 1), dated, function (B) { return B.cap; });
W.mT = inst(tg, otmWineMat(0x3A3428, 1), dated, function () { return 0xE8DCC0; });
W.hi = (typeof wGlow === "function") ? wGlow(0xFFC070, 0.42, 0.55) : null;
if (W.hi) {
W.hi.visible = false;
W.hi.userData.keep = 1;
otmP().add(W.hi);
}
W.secs.forEach(function (S, i) {
if (!lite || i % 2 === 0)
otmCandle(S.wx + S.dir * (R.dx + 0.12), U + R.y0 + R.rows * R.rh + 0.27, S.zc - 1.4, 0.9);
otmSolid(S.wx + S.dir * 0.26, S.zc, 0.26, 1.4, U, 3);
});
},
function (M, i, B, a, out) {
var Q = OTM_WQ || (OTM_WQ = { m: new THREE.Matrix4(), r: new THREE.Matrix4(), q: new THREE.Quaternion(), ax: new THREE.Vector3(0, 1, 0), z: new THREE.Vector3(0, 0, 1), p: new THREE.Vector3(), s: new THREE.Vector3(1, 1, 1) });
Q.q.setFromAxisAngle(Q.z, -B.dir * Math.PI / 2);
Q.m.compose(Q.p.set(B.x + B.dir * (out || 0), B.y, B.z), Q.q, Q.s);
a = (a || 0) + (B.dir < 0 ? Math.PI : 0);
if (a) {
Q.r.makeRotationY(a);
Q.m.multiply(Q.r);
}
M.setMatrixAt(i, Q.m);
},
function (dt) {
var W = OTM.wine;
if (!W)
return;
if (W.spin.length) {
W.spin = W.spin.filter(function (S) {
S.t += dt;
var f = Math.min(1, S.t / 1.4), e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2, B = W.dated[S.i], out = Math.sin(f * Math.PI) * 0.07;
[W.mB, W.mC, W.mT].forEach(function (M) { otmWineSet(M, S.i, B, e * Math.PI * 2, out); M.instanceMatrix.needsUpdate = true; });
return f < 1;
});
}
},
function (L, feet) {
var W = OTM.wine, R = OTM_RACK;
if (!W)
return null;
if (Math.abs(feet - W.U) > 0.6 || L.x < W.side[0] || L.x > W.side[1] || L.z < -46 || L.z > -26) {
if (W.hi)
W.hi.visible = false;
return null;
}
var d = new THREE.Vector3();
camera.getWorldDirection(d);
var best = null, bd = 0.13;
[0, 1].forEach(function (s) {
var fx = s ? W.side[1] - R.fx : W.side[0] + R.fx;
if (s ? d.x <= 0.05 : d.x >= -0.05)
return;
var t = (fx - L.x) / d.x;
if (t < 0.2 || t > 3)
return;
var hy = L.y + d.y * t, hz = L.z + d.z * t;
W.dated.forEach(function (B) { if (B.s !== s)
return; var e = Math.hypot(B.y - hy, B.z - hz); if (e < bd) {
bd = e;
best = B;
} });
});
if (W.hi) {
W.hi.visible = !!best;
if (best)
W.hi.position.set(best.x + best.dir * 0.43, best.y, best.z);
}
return best;
},
function () {
var lite = OTM.lite;
otmSign(["The Hall of the Astrolabe ▶", "the Orrery · the Divination Parlour"], 3.2, 0.6, "#0A080E", "#D8C890", 59.45, 4.5, 10, -Math.PI / 2);
otmSign(["◀ The Little Moons' Room", "the Kid Zone · the Apothecary"], 3.2, 0.6, "#0A080E", "#D8C890", -59.45, 4.5, 10, Math.PI / 2);
otmWixMirror();
otmWixAstro();
otmWixDivine();
otmWixKids();
otmWixApothecary();
otmWixKitchen();
var rf = otmMat(0x141216, "slate");
[-71, 71].forEach(function (x) { otmBox(23, 0.8, 39, rf, x, 9.9, 1); });
otmBox(23, 0.8, 18.4, rf, -71, 6.9, -27);
},
function () {
var x = -5.0, z = 4.62, g = otmGroup(x, 0, z, 0);
var glass = otmCanvasMat("obsmirror", 256, 512, function (c, W, H) {
var gr = c.createLinearGradient(0, 0, W, H);
gr.addColorStop(0, "#05040A");
gr.addColorStop(0.45, "#1A1530");
gr.addColorStop(0.55, "#0A0814");
gr.addColorStop(1, "#020205");
c.fillStyle = gr;
c.beginPath();
c.ellipse(W / 2, H / 2, W / 2 - 4, H / 2 - 4, 0, 0, 6.3);
c.fill();
c.strokeStyle = "rgba(200,190,255,0.18)";
c.lineWidth = 10;
c.beginPath();
c.ellipse(W / 2 - 30, H / 2 - 60, 40, 150, -0.3, 0, 6.3);
c.stroke();
for (var i = 0; i < 60; i++) {
c.fillStyle = "rgba(220,220,255," + (0.05 + ((i * 7) % 10) / 60) + ")";
c.fillRect((i * 53) % W, (i * 97) % H, 2, 2);
}
}, { basic: true, op: 0.98 });
var m = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.5), glass);
m.position.set(0, 1.9, 0.04);
g.add(m);
var fr = otmM("silver"), ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.06, 6, lite ? 24 : 48), fr);
ring.scale.set(1, 1.9, 1);
ring.position.set(0, 1.9, 0.05);
g.add(ring);
var crest = otmMoonDisc(0, 3.55, 0.08, 0.28, 0, g);
otmBox(1.0, 0.12, 0.18, otmM("gold"), 0, 0.6, 0.08, g);
otmSign(["THE OBSIDIAN MIRROR", "a word for today"], 1.6, 0.32, "#0A080E", "#C8C0E8", x, 0.35, z + 0.1, 0);
otmSpot(x, 6.0, 1.3, "🪞 The Obsidian Mirror", "ask it for one truth today", function () { if (!otmWixOn("mirror"))
return otmWixShut("mirror"); otmMirrorOpen(); });
},
function () {
var lite = OTM.lite, br = otmMat(0xB8923A, "metal", { phong: 80, spec: 0xFFE8A0 });
var R = otmRoom({ x0: 60, z0: 0, x1: 82, z1: 20, h: 9, name: "the Hall of the Astrolabe", key: "astro", floor: otmMat(0x16141E, "marble", { phong: 80, spec: 0x5A5A6A }), wall: otmMat(0x1E1A2A, "stone"), ceil: otmMat(0x0A0A18, "plaster"),
doors: { w: [{ at: 10, w: 3, h: 3.8 }], n: [{ at: 71, w: 2.6, h: 3.4 }] } });
var zm = otmCanvasMat("zodfloor", 512, 512, function (c, W, H) {
c.fillStyle = "#0C0A14";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#B8923A";
c.lineWidth = 6;
[240, 190, 120].forEach(function (r) { c.beginPath(); c.arc(W / 2, H / 2, r, 0, 6.3); c.stroke(); });
c.lineWidth = 2;
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
c.beginPath();
c.moveTo(W / 2 + Math.cos(a) * 190, H / 2 + Math.sin(a) * 190);
c.lineTo(W / 2 + Math.cos(a) * 240, H / 2 + Math.sin(a) * 240);
c.stroke();
}
c.fillStyle = "#D8C890";
c.font = "34px serif";
c.textAlign = "center";
c.textBaseline = "middle";
for (var j = 0; j < 12; j++) {
var b = -(j + 0.5) / 12 * Math.PI * 2;
c.fillText(OTM_ZOD[j], W / 2 + Math.cos(b) * 215, H / 2 + Math.sin(b) * 215);
}
for (var s = 0; s < 200; s++) {
c.fillStyle = "rgba(230,230,255," + (0.15 + ((s * 13) % 7) / 14) + ")";
var a2 = s * 2.4, r2 = 20 + (s * 37) % 100;
c.fillRect(W / 2 + Math.cos(a2) * r2, H / 2 + Math.sin(a2) * r2, 2, 2);
}
});
var zf = new THREE.Mesh(new THREE.CircleGeometry(7.4, lite ? 40 : 72), zm);
zf.rotation.x = -Math.PI / 2;
zf.position.set(71, 0.02, 10);
otmP().add(zf);
var sky = otmCanvasMat("astrosky", 512, 512, function (c, W, H) {
c.fillStyle = "#06061A";
c.fillRect(0, 0, W, H);
var g = c.createLinearGradient(0, H * 0.2, W, H * 0.8);
g.addColorStop(0, "rgba(0,0,0,0)");
g.addColorStop(0.5, "rgba(120,110,170,0.25)");
g.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 700; i++) {
var b = ((i * 7919) % 100) / 100;
c.fillStyle = "rgba(240,240,255," + (0.2 + b * 0.8) + ")";
c.fillRect((i * 137) % W, (i * 263) % H, b > 0.9 ? 3 : b > 0.6 ? 2 : 1, b > 0.9 ? 3 : b > 0.6 ? 2 : 1);
}
}, { basic: true });
var sp = new THREE.Mesh(new THREE.PlaneGeometry(R.w - 0.2, R.d - 0.2), sky);
sp.rotation.x = Math.PI / 2;
sp.position.set(R.cx, R.y + R.h - 0.02, R.cz);
otmP().add(sp);
var ox = 71, oz = 10;
otmCyl(0.9, 0.5, otmMat(0x1A1620, "marble", { phong: 80 }), ox, 0.25, oz, null, lite ? 14 : 24);
otmCyl(0.95, 0.08, br, ox, 0.52, oz, null, lite ? 14 : 24);
otmCyl(0.12, 2.6, br, ox, 1.8, oz, null, 10);
otmRound(ox, oz, 0.95, 0, 3.2);
var org = otmGroup(ox, 3.1, oz, 0);
org.userData.keep = 1;
var sun = otmSph(0.45, otmGlowM(0xFFD27A), 0, 0, 0, org, lite ? 14 : 22);
var sg = (typeof wGlow === "function") ? wGlow(0xFFC060, 3.2, 0.45) : null;
if (sg)
org.add(sg);
var sl = otmOrrLabel("☉ the Sun", 0.3);
sl.position.set(0, 0.82, 0);
org.add(sl);
var PL = OTM_PLANETS, arms = [];
PL.forEach(function (p, i) {
var r = 0.9 + Math.sqrt(p.a) * 0.95;
var ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 4, lite ? 40 : 80), otmMat(0x8A6A2A, "metal"));
ring.rotation.x = Math.PI / 2;
org.add(ring);
var arm = new THREE.Group();
org.add(arm);
var rod = otmBox(r, 0.025, 0.025, br, r / 2, -0.02 - (i % 2) * 0.04, 0, arm);
var pm = otmSph(p.r, otmMat(p.col, null, { e: p.col, ei: 0.35 }), r, 0, 0, arm, lite ? 10 : 16);
if (p.k === "saturn") {
var sr = new THREE.Mesh(new THREE.RingGeometry(p.r * 1.4, p.r * 2.2, lite ? 20 : 36), otmMat(0xD8C8A0, null, { ds: 1, op: 0.8 }));
sr.rotation.x = Math.PI / 2.4;
sr.position.set(r, 0, 0);
arm.add(sr);
}
var lb = otmOrrLabel(p.s + " " + p.n, 0.26);
lb.position.set(r, p.r + 0.22, 0);
arm.add(lb);
var moon = null, mface = null;
if (p.k === "earth") {
moon = new THREE.Group();
moon.position.set(r, 0, 0);
arm.add(moon);
var mr = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.005, 3, lite ? 24 : 40), otmMat(0x8A8A90, "metal"));
mr.rotation.x = Math.PI / 2;
moon.add(mr);
mface = otmSph(0.075, otmCanvasMat("orrmoon", 64, 32, function (c, W, H) { c.fillStyle = "#141418"; c.fillRect(0, 0, W, H); c.fillStyle = "#ECECF4"; c.fillRect(W / 4, 0, W / 2, H); }, { basic: true }), 0.32, 0, 0, moon, lite ? 10 : 14);
var ml = otmOrrLabel("☽ the Moon", 0.15);
ml.position.set(0.32, 0.15, 0);
moon.add(ml);
}
arms.push({ p: p, arm: arm, moon: moon, mface: mface });
});
var drum = otmGroup(ox, 2.3, oz, 0);
drum.userData.keep = 1;
otmBox(0.92, 0.5, 0.92, br, 0, 0, 0, drum);
var dc = document.createElement("canvas");
dc.width = lite ? 256 : 512;
dc.height = lite ? 128 : 256;
var dtex = new THREE.CanvasTexture(dc);
var dm = OTM.mats["orr|drum"] = new THREE.MeshBasicMaterial({ map: dtex });
for (var f = 0; f < 4; f++) {
var fa = f * Math.PI / 2, pl = otmPlane(0.86, 0.44, dm, Math.sin(fa) * 0.462, 0, Math.cos(fa) * 0.462, fa, drum);
}
var box = otmGroup(ox, 1.15, oz, 0);
box.userData.keep = 1;
otmBox(0.32, 0.3, 0.32, br, 0, 0, 0, box);
var crank = new THREE.Group();
crank.position.set(-0.17, 0, 0);
box.add(crank);
otmCyl(0.03, 0.16, br, -0.08, 0, 0, crank, 8).rotation.z = Math.PI / 2;
otmBox(0.04, 0.34, 0.04, br, -0.16, 0.15, 0, crank);
otmCyl(0.035, 0.16, otmMat(0x2A1A10, "wood"), -0.24, 0.3, 0, crank, 8).rotation.z = Math.PI / 2;
OTM.orr = { g: org, arms: arms, t: Date.now(), speed: 0, live: true, crank: crank, dc: dc, dtex: dtex, dtxt: "", dAt: 0 };
otmOrrPlate(true);
var A = otmGroup(79.4, 0, 10, -Math.PI / 2);
A.userData.keep = 1;
otmBox(1.2, 0.3, 0.8, otmMat(0x1A1620, "marble"), 0, 0.15, 0, A);
otmCyl(0.08, 1.4, br, 0, 1.0, 0, A, 8);
var face = otmCanvasMat("astroface", 512, 512, function (c, W, H) {
var C = W / 2;
var g = c.createRadialGradient(C, C, 20, C, C, C);
g.addColorStop(0, "#D8B060");
g.addColorStop(1, "#8A6A2A");
c.fillStyle = g;
c.beginPath();
c.arc(C, C, C - 4, 0, 6.3);
c.fill();
c.strokeStyle = "#3A2A0A";
c.lineWidth = 3;
[C - 10, C - 40, C - 90].forEach(function (r) { c.beginPath(); c.arc(C, C, r, 0, 6.3); c.stroke(); });
c.lineWidth = 1.5;
for (var i = 0; i < 72; i++) {
var a = i / 72 * Math.PI * 2, r0 = i % 6 ? C - 24 : C - 40;
c.beginPath();
c.moveTo(C + Math.cos(a) * r0, C + Math.sin(a) * r0);
c.lineTo(C + Math.cos(a) * (C - 10), C + Math.sin(a) * (C - 10));
c.stroke();
}
c.fillStyle = "#2A1A04";
c.font = "28px serif";
c.textAlign = "center";
c.textBaseline = "middle";
for (var j = 0; j < 12; j++) {
var b = (j + 0.5) / 12 * Math.PI * 2;
c.fillText(OTM_ZOD[j], C + Math.cos(b) * (C - 65), C + Math.sin(b) * (C - 65));
}
for (var k = 1; k < 5; k++) {
c.beginPath();
c.arc(C, C + k * 18, C * 0.55 - k * 14, 0, 6.3);
c.stroke();
}
c.beginPath();
c.moveTo(C, 14);
c.lineTo(C, H - 14);
c.moveTo(14, C);
c.lineTo(W - 14, C);
c.stroke();
}, {});
var disc = new THREE.Mesh(new THREE.CircleGeometry(1.0, lite ? 32 : 56), face);
disc.position.set(0, 2.6, 0.02);
A.add(disc);
var back = new THREE.Mesh(new THREE.CircleGeometry(1.0, lite ? 32 : 56), br);
back.rotation.y = Math.PI;
back.position.set(0, 2.6, -0.02);
A.add(back);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.05, 6, lite ? 32 : 56), br);
rim.position.set(0, 2.6, 0);
A.add(rim);
var rete = new THREE.Group();
rete.position.set(0, 2.6, 0.06);
A.add(rete);
var rr = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 4, lite ? 24 : 48), otmMat(0x3A2A0A, "metal"));
rr.position.set(0, 0.18, 0);
rete.add(rr);
otmBox(1.9, 0.04, 0.02, otmMat(0x3A2A0A, "metal"), 0, 0, 0, rete);
otmBox(0.04, 1.9, 0.02, otmMat(0x3A2A0A, "metal"), 0, 0, 0, rete);
var shk = otmGroup(0, 3.7, 0, 0, A);
otmCyl(0.07, 0.25, br, 0, 0, 0, shk, 8);
var ringtop = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 4, 16), br);
ringtop.position.y = 0.2;
shk.add(ringtop);
OTM.astrolabe = { rete: rete };
otmSolid(79.4, 10, 0.5, 0.7, 0, 3.8);
otmSpot(77.4, 10, 1.8, "🧭 The Astrolabe", "read the sky now, or your natal chart", function () { if (!otmWixOn("astro"))
return otmWixShut("astro"); otmSkyOpen("natal"); });
otmSpot(ox, oz, 2.6, "🪐 The Orrery", "turn its crank, set a date, or bring it back to now", function () { if (!otmWixOn("astro"))
return otmWixShut("astro"); otmSkyOpen("orrery"); });
[[63.5, 17], [78.5, 17]].forEach(function (q) {
otmCyl(0.25, 0.06, br, q[0], 0.03, q[1], null, 10);
otmCyl(0.04, 1.0, br, q[0], 0.55, q[1], null, 6);
otmSph(0.45, otmCanvasMat("globe", 256, 128, function (c, W, H) {
c.fillStyle = "#1A2A5A";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#D8C890";
c.lineWidth = 1;
for (var i = 0; i < 8; i++) {
c.beginPath();
c.moveTo(i * W / 8, 0);
c.lineTo(i * W / 8, H);
c.stroke();
}
c.beginPath();
c.moveTo(0, H / 2);
c.lineTo(W, H / 2);
c.stroke();
c.fillStyle = "#F0E8C8";
for (var s = 0; s < 90; s++)
c.fillRect((s * 71) % W, (s * 29) % H, 2, 2);
}), q[0], 1.5, q[1], null, lite ? 12 : 20);
otmRound(q[0], q[1], 0.5, 0, 2);
});
var lec = otmGroup(64, 0, 3.2, Math.PI * 0.25);
otmBox(0.5, 1.0, 0.4, otmM("wood"), 0, 0.5, 0, lec);
otmBox(0.7, 0.05, 0.5, otmM("wood"), 0, 1.05, 0, lec).rotation.x = -0.35;
otmRound(64, 3.2, 0.5, 0, 1.2);
otmSpot(64.6, 3.8, 1.4, "📜 A treatise on the astrolabe", "read what it is", function () { otmAstroLore(); });
for (var cz = 2; cz < 20; cz += lite ? 8 : 5.5) {
otmCandelabrum(61.2, 0, cz);
otmCandelabrum(80.8, 0, cz);
}
},
function () {
var lite = OTM.lite;
var R = otmRoom({ x0: 60, z0: -18, x1: 82, z1: 0, h: 6, name: "the Divination Parlour", key: "divine", floor: otmMat(0x2A0E1E, null), wall: otmMat(0x2A1A3A, "plaster"), ceil: otmMat(0x120A1A, "plaster"),
doors: { s: [{ at: 71, w: 2.6, h: 3.4 }] } });
var cp = otmCanvasMat("divcarpet", 512, 384, function (c, W, H) {
c.fillStyle = "#2A0E2E";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#B8923A";
c.lineWidth = 6;
c.strokeRect(14, 14, W - 28, H - 28);
c.lineWidth = 2;
c.strokeRect(30, 30, W - 60, H - 60);
c.fillStyle = "#4A1A4A";
for (var i = 0; i < 7; i++)
for (var j = 0; j < 5; j++) {
var x = 70 + i * 62, y = 70 + j * 62;
c.save();
c.translate(x, y);
c.rotate(Math.PI / 4);
c.fillRect(-14, -14, 28, 28);
c.restore();
}
c.strokeStyle = "#D8C890";
c.lineWidth = 3;
c.beginPath();
c.arc(W / 2, H / 2, 90, 0, 6.3);
c.stroke();
c.beginPath();
c.arc(W / 2, H / 2, 70, 0, 6.3);
c.stroke();
c.fillStyle = "#D8C890";
c.font = "22px serif";
c.textAlign = "center";
c.textBaseline = "middle";
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2;
c.fillText(OTM_ZOD[k], W / 2 + Math.cos(a) * 80, H / 2 + Math.sin(a) * 80);
}
});
var cpm = otmPlane(16, 12, cp, 71, 0.035, -9, 0);
cpm.rotation.x = -Math.PI / 2;
for (var i = 0; i < (lite ? 4 : 8); i++) {
var dz = -16 + i * (lite ? 4 : 2);
otmPlane(1.2, 5.2, otmMat(0x4A1A2A, null, { ds: 1 }), 60.62, 2.8, dz, Math.PI / 2);
otmPlane(1.2, 5.2, otmMat(0x4A1A2A, null, { ds: 1 }), 81.38, 2.8, dz, -Math.PI / 2);
}
var T = [["tarot", 65.5, -5, "🃏 The Tarot table", "lay the cards"], ["runes", 76.5, -5, "ᚱ The rune cloth", "cast the runes"], ["iching", 65.5, -12.5, "☯ The I Ching table", "throw the coins"], ["pendulum", 76.5, -12.5, "🔮 The pendulum", "ask it a question"]];
T.forEach(function (t) {
var x = t[1], z = t[2];
otmCyl(0.9, 0.06, otmMat(0x1A0E0A, "wood", { phong: 60 }), x, 0.78, z, null, lite ? 14 : 24);
otmCyl(0.12, 0.75, otmMat(0x1A0E0A, "wood"), x, 0.38, z, null, 8);
otmCyl(0.45, 0.05, otmMat(0x1A0E0A, "wood"), x, 0.03, z, null, 12);
otmCyl(0.92, 0.02, otmMat(0x5A1A3A, null), x, 0.82, z, null, lite ? 14 : 24);
otmRound(x, z, 0.95, 0, 0.9);
[-1, 1].forEach(function (s) { var ch = otmGroup(x + s * 1.4, 0, z, s > 0 ? -Math.PI / 2 : Math.PI / 2); otmBox(0.5, 0.08, 0.5, otmM("velvet"), 0, 0.48, 0, ch); otmBox(0.5, 0.8, 0.06, otmMat(0x1A0E0A, "wood"), 0, 0.9, 0.24, ch); otmRound(x + s * 1.4, z, 0.3, 0, 1.0); });
if (t[0] === "tarot") {
for (var c = 0; c < 3; c++)
otmBox(0.16, 0.01, 0.26, otmMat(0x2A1A5A, null), x - 0.25 + c * 0.25, 0.84, z);
}
if (t[0] === "runes") {
for (var r = 0; r < 7; r++)
otmBox(0.07, 0.03, 0.09, otmMat(0xC8B890, "stone"), x - 0.3 + (r % 4) * 0.2, 0.85, z - 0.12 + Math.floor(r / 4) * 0.25);
}
if (t[0] === "iching") {
for (var q = 0; q < 3; q++)
otmCyl(0.05, 0.01, otmMat(0xB8923A, "metal"), x - 0.15 + q * 0.15, 0.85, z, null, 10);
}
if (t[0] === "pendulum") {
var pg = otmGroup(x, 2.1, z, 0);
otmCyl(0.004, 1.0, otmM("silver"), 0, -0.5, 0, pg, 4);
otmCyl(0.06, 0.14, otmMat(0x9A6AD8, null, { e: 0x4A2A8A, ei: 0.6 }), 0, -1.05, 0, pg, 6, 0.0);
pg.userData.keep = 1;
OTM.pend = pg;
}
otmSpot(x, z, 2.0, t[3], t[4], function () { if (!otmWixOn("divine"))
return otmWixShut("divine"); otmDivineOpen(t[0]); });
});
otmCyl(0.3, 1.0, otmMat(0x1A0E0A, "wood"), 71, 0.5, -9, null, 8);
otmSph(0.32, otmMat(0xB8C8F0, null, { op: 0.55, e: 0x3A4A8A, ei: 0.5 }), 71, 1.3, -9, null, lite ? 14 : 24);
otmRound(71, -9, 0.45, 0, 1.6);
var cg = (typeof wGlow === "function") ? wGlow(0x8A9AFF, 1.6, 0.3) : null;
if (cg) {
cg.position.set(71, 1.3, -9);
otmP().add(cg);
}
otmSpot(71, -9, 1.6, "◈ The Fatal Grace", "cast stones upon the Grace, or keep your journal", function () { if (!otmWixOn("divine"))
return otmWixShut("divine"); otmDivineOpen("stones"); });
for (var l = 0; l < (lite ? 2 : 4); l++) {
var lg = otmGroup(64 + l * (lite ? 14 : 4.7), 4.6, -9);
otmCyl(0.01, 1.2, otmM("iron"), 0, 0.6, 0, lg, 4);
otmSph(0.22, otmGlowM(0xD89AFF, 0.85), 0, 0, 0, lg, 10);
}
otmCandelabrum(61.2, 0, -1.5);
otmCandelabrum(80.8, 0, -1.5);
otmCandelabrum(61.2, 0, -16.6);
otmCandelabrum(80.8, 0, -16.6);
otmSign(["THE DIVINATION STATION"], 3.4, 0.45, "#0A080E", "#E0C8F0", 71, 3.9, -17.6, 0);
},
function () {
var lite = OTM.lite;
var R = otmRoom({ x0: -82, z0: 0, x1: -60, z1: 20, h: 6, name: "the Little Moons' Room", key: "kids", floor: otmCanvasMat("kidfloor", 256, 256, function (c, W, H) { c.fillStyle = "#2AB8C8"; c.fillRect(0, 0, W, H); for (var i = 0; i < 14; i++) {
c.fillStyle = ["#FFE84A", "#FF8AD8", "#FFFFFF", "#B0FF8A"][i % 4];
c.globalAlpha = 0.55;
c.beginPath();
c.arc((i * 71) % W, (i * 113) % H, 6 + (i % 3) * 4, 0, 6.3);
c.fill();
} c.globalAlpha = 1; }), wall: otmMat(0x8A5AE8, "plaster"), ceil: otmMat(0x1A1A6A, "plaster"),
doors: { e: [{ at: 10, w: 3, h: 3.8 }], n: [{ at: -71, w: 2.6, h: 3.4 }] } });
var st = otmCanvasMat("kidstars", 512, 512, function (c, W, H) {
c.fillStyle = "#1A1A6A";
c.fillRect(0, 0, W, H);
var cols = ["#FFE84A", "#FF8AD8", "#8AF0FF", "#B0FF8A", "#FFFFFF"];
for (var i = 0; i < 90; i++) {
var x = (i * 97) % W, y = (i * 61) % H, r = 4 + (i % 4) * 3;
c.fillStyle = cols[i % 5];
c.beginPath();
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI * 2 - Math.PI / 2, rr = k % 2 ? r * 0.45 : r;
c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
}
c.fill();
}
c.fillStyle = "#FFF4A0";
c.beginPath();
c.arc(W / 2, H / 2, 70, 0, 6.3);
c.fill();
c.fillStyle = "#1A1A6A";
c.beginPath();
c.arc(W / 2 + 34, H / 2 - 16, 62, 0, 6.3);
c.fill();
}, { basic: true });
var sp = new THREE.Mesh(new THREE.PlaneGeometry(R.w - 0.2, R.d - 0.2), st);
sp.rotation.x = Math.PI / 2;
sp.position.set(R.cx, R.y + R.h - 0.02, R.cz);
otmP().add(sp);
var rug = otmCanvasMat("kidrug", 512, 256, function (c, W, H) { ["#FF4A4A", "#FF9A2A", "#FFE82A", "#4AD84A", "#2A9AFF", "#9A4AFF"].forEach(function (col, i) { c.fillStyle = col; c.fillRect(0, i * H / 6, W, H / 6 + 1); }); });
var rg = otmPlane(9, 5, rug, -71, 0.035, 11, 0);
rg.rotation.x = -Math.PI / 2;
var tb = otmGroup(-75, 0, 5, 0);
otmBox(2.2, 0.08, 1.2, otmMat(0xFFD23A, null), 0, 0.55, 0, tb);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { otmCyl(0.06, 0.55, otmMat(0xFF5A8A, null), p[0] * 0.95, 0.27, p[1] * 0.5, tb, 8); });
["🌑", "🌓", "🌕", "🌗"].forEach(function (e, i) { otmCyl(0.12, 0.03, otmMat([0x3A3A5A, 0xC8C8E8, 0xFFF4C0, 0xC8C8E8][i], null), -0.6 + i * 0.4, 0.61, 0, tb, 14); });
otmSolid(-75, 5, 1.1, 0.6, 0, 0.6);
for (var b = 0; b < 4; b++) {
var bx = -79 + b * 2.6, bz = 17.6;
otmSph(0.55, otmMat([0xFF6A9A, 0x6AE8FF, 0xB8FF6A, 0xFFB84A][b], null), bx, 0.35, bz, null, 12).scale.set(1, 0.6, 1);
otmRound(bx, bz, 0.5, 0, 0.6);
}
otmBox(1.6, 0.8, 0.8, otmMat(0xE84A4A, null), -80.8, 0.4, 4);
otmBox(1.7, 0.1, 0.9, otmMat(0xFFE84A, null), -80.8, 0.85, 4);
otmSolid(-80.8, 4, 0.8, 0.4, 0, 0.9);
otmSpot(-75, 6.4, 1.8, "🌙 The moon puzzle", "put the moon's faces in order", function () { if (!otmWixOn("kids"))
return otmWixShut("kids"); otmKidsOpen("moon"); });
otmSpot(-71, 17, 2.4, "⭐ The star stories", "hear how the stars got their pictures", function () { if (!otmWixOn("kids"))
return otmWixShut("kids"); otmKidsOpen("stars"); });
var wl = otmGroup(-65, 0, 4, 0);
otmCyl(0.3, 0.9, otmMat(0x4AD8C8, null), 0, 0.45, 0, wl, 12);
otmSph(0.32, otmGlowM(0xFFC86A, 0.9), 0, 1.25, 0, wl, 12);
otmRound(-65, 4, 0.4, 0, 1.5);
OTM.kidLanterns = [];
var mb = otmGroup(-71, 0, 11, Math.PI);
otmCyl(0.35, 0.75, otmMat(0x9A4AFF, null), 0, 0.38, 0, mb, 14);
otmCyl(0.45, 0.08, otmMat(0xFFE84A, null), 0, 0.78, 0, mb, 16);
otmBox(0.7, 0.05, 0.5, otmMat(0xFFF4E0, null), 0, 0.85, 0, mb);
otmBox(0.72, 0.03, 0.52, otmMat(0xFF4A8A, null), 0, 0.82, 0, mb);
otmSph(0.12, otmGlowM(0x8AF0FF, 0.9), 0, 1.15, 0, mb, 10);
otmRound(-71, 11, 0.45, 0, 1.2);
otmSpot(-71, 12.4, 1.6, "✨ The Kid Zone", "your familiar, potions, spell jars and the temple's lessons", function () { if (!otmWixOn("kids"))
return otmWixShut("kids"); otmKidZone(); });
otmSpot(-65, 5.6, 1.6, "🏮 The wish lanterns", "make a wish and let a lantern go", function () { if (!otmWixOn("kids"))
return otmWixShut("kids"); otmKidsOpen("wish"); });
otmSign(["THE LITTLE MOONS' ROOM", "the Kid Zone of the Temple"], 4.2, 0.8, "#3A1A8A", "#FFF4A0", -71, 4.2, 0.62, 0);
var mu = otmCanvasMat("kidmural", 1024, 384, function (c, W, H) {
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#1A1A7A");
g.addColorStop(1, "#5A3AC8");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.fillStyle = "#FFF4A0";
c.beginPath();
c.arc(W * 0.72, 95, 62, 0, 6.3);
c.fill();
for (var i = 0; i < 40; i++) {
c.fillStyle = "#FFFFFF";
c.fillRect((i * 137) % W, (i * 53) % 180, 3, 3);
}
[["#2A8A5A", 0.0, 260], ["#3AB86A", 0.35, 290], ["#2A9A6A", 0.7, 270]].forEach(function (h) { c.fillStyle = h[0]; c.beginPath(); c.ellipse(W * h[1] + 200, H + 40, 320, H - h[2] + 120, 0, 0, 6.3); c.fill(); });
c.fillStyle = "#5A3A1A";
c.fillRect(150, 150, 26, 180);
c.fillStyle = "#2A6A3A";
c.beginPath();
c.arc(163, 140, 70, 0, 6.3);
c.fill();
[[140, 140], [186, 170]].forEach(function (o) { c.fillStyle = "#C8884A"; c.beginPath(); c.ellipse(o[0], o[1], 16, 20, 0, 0, 6.3); c.fill(); c.fillStyle = "#FFFFFF"; c.beginPath(); c.arc(o[0] - 6, o[1] - 6, 6, 0, 6.3); c.arc(o[0] + 6, o[1] - 6, 6, 0, 6.3); c.fill(); c.fillStyle = "#1A1A1A"; c.beginPath(); c.arc(o[0] - 6, o[1] - 6, 3, 0, 6.3); c.arc(o[0] + 6, o[1] - 6, 3, 0, 6.3); c.fill(); });
c.fillStyle = "#F08A2A";
c.beginPath();
c.ellipse(560, 318, 40, 20, 0, 0, 6.3);
c.fill();
c.beginPath();
c.moveTo(590, 300);
c.lineTo(625, 290);
c.lineTo(600, 320);
c.fill();
c.beginPath();
c.ellipse(512, 325, 26, 10, 0.4, 0, 6.3);
c.fill();
c.fillStyle = "#FFF4A0";
c.font = "bold 40px sans-serif";
c.textAlign = "center";
c.fillText("Goodnight, little moons", W / 2, 60);
}, { basic: true });
otmPlane(14, 5, mu, -81.45, 2.9, 10, Math.PI / 2);
var tent = otmGroup(-78, 0, 15, 0);
var tg = new THREE.ConeGeometry(1.5, 2.6, 4, 1, true);
var tn = new THREE.Mesh(tg, otmMat(0xFF6AB8, null, { ds: 1 }));
tn.position.y = 1.3;
tn.rotation.y = Math.PI / 4;
tent.add(tn);
otmBox(0.9, 1.4, 0.02, otmMat(0x2A1A6A, null), 0, 0.7, 1.08, tent);
otmCyl(0.03, 0.6, otmMat(0xFFE84A, null), 0, 2.8, 0, tent, 6);
otmRound(-78, 15, 1.2, 0, 2.6);
var bs = otmGroup(-61.6, 0, 8, -Math.PI / 2);
otmBox(2.4, 1.1, 0.4, otmMat(0xFFD23A, null), 0, 0.55, 0, bs);
for (var q = 0; q < 10; q++)
otmBox(0.06, 0.32, 0.24, otmMat([0xFF4A4A, 0x4AA8FF, 0x4AD84A, 0xFF8AD8, 0xFFFFFF][q % 5], null), -1.0 + q * 0.22, 0.62 + (q > 4 ? 0 : 0) * 0.5, 0.06, bs).position.y = q < 5 ? 0.32 : 0.82;
otmSolid(-61.6, 8, 0.25, 1.2, 0, 1.1);
["M", "O", "O", "N"].forEach(function (L, i) { var bl = otmCanvasMat("blk" + L + i, 64, 64, function (c, W, H) { c.fillStyle = ["#FF4A4A", "#4AA8FF", "#4AD84A", "#FFB84A"][i]; c.fillRect(0, 0, W, H); c.fillStyle = "#FFFFFF"; c.font = "bold 46px sans-serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(L, W / 2, H / 2 + 2); }); otmBox(0.3, 0.3, 0.3, bl, -69.5 + i * 0.34, 0.15, 6.5); });
otmSolid(-69, 6.5, 0.7, 0.2, 0, 0.3);
[[-80.6, 10], [-61.4, 15], [-61.4, 1.4]].forEach(function (q) { otmSph(0.2, otmGlowM(0xFFF0A0, 0.9), q[0], 2.6, q[1], null, 10); });
},
function () {
if (!OTM.G || WLD.on !== OTM.key)
return;
var keep = OTK;
OTK = OTM.K;
var g = otmGroup(-65 + (Math.random() - 0.5) * 0.4, 1.4, 4 + (Math.random() - 0.5) * 0.4, 0);
otmCyl(0.16, 0.3, otmMat([0xFF6A6A, 0xFFB84A, 0xFFE84A, 0xFF8AD8][Math.floor(Math.random() * 4)], null, { e: 0xFFA040, ei: 0.6, op: 0.9 }), 0, 0, 0, g, 10, 0.12);
var gl = (typeof wGlow === "function") ? wGlow(0xFFB050, 0.9, 0.5) : null;
if (gl)
g.add(gl);
OTK = keep;
OTM.kidLanterns.push({ g: g, t: 0, dx: (Math.random() - 0.5) * 0.3, dz: (Math.random() - 0.5) * 0.3 });
},
function () {
var lite = OTM.lite;
var R = otmRoom({ x0: -82, z0: -18, x1: -60, z1: 0, h: 6, name: "the Apothecary", key: "potion", floor: otmMat(0x3A2A1A, "wood"), wall: otmMat(0x3A3430, "stone"), ceil: otmMat(0x2A1E14, "wood"),
doors: { s: [{ at: -71, w: 2.6, h: 3.4 }], n: [{ at: -64.5, w: 2.2, h: 3.0 }] } });
var cx = -71, cz = -9;
otmCyl(1.3, 0.25, otmMat(0x2A2628, "stone"), cx, 0.12, cz, null, lite ? 12 : 20);
otmFlame(cx - 0.3, 0.25, cz, 2.4, 0xFF8A30);
otmFlame(cx + 0.3, 0.25, cz + 0.2, 2.0, 0xFFA040);
var pot = otmCyl(0.85, 0.9, otmMat(0x1A1818, "metal", { phong: 40 }), cx, 0.95, cz, null, lite ? 14 : 24, 0.65);
var brew = new THREE.Mesh(new THREE.CircleGeometry(0.8, lite ? 16 : 32), otmMat(0x3A6A3A, null, { e: 0x2A4A2A, ei: 0.7 }));
brew.rotation.x = -Math.PI / 2;
brew.position.set(cx, 1.38, cz);
otmP().add(brew);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.05, 6, lite ? 16 : 32), otmMat(0x2A2628, "metal"));
rim.rotation.x = Math.PI / 2;
rim.position.set(cx, 1.4, cz);
otmP().add(rim);
[-1, 1].forEach(function (s) { otmBox(0.1, 2.2, 0.1, otmM("iron"), cx + s * 1.15, 1.1, cz); });
otmBox(2.4, 0.08, 0.08, otmM("iron"), cx, 2.2, cz);
otmRound(cx, cz, 1.3, 0, 1.5);
OTM.cauldron = { brew: brew, bubbles: [] };
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bb = otmSph(0.07, otmMat(0x6AD86A, null, { op: 0.7, e: 0x3A8A3A, ei: 0.6 }), cx + (b % 3 - 1) * 0.35, 1.42, cz + (b > 2 ? 0.3 : -0.25), null, 8);
OTM.cauldron.bubbles.push({ m: bb, ph: b * 0.7 });
}
otmSpot(cx, cz, 2.4, "⚗️ The cauldron", "work the brewing bench", function () { if (!otmWixOn("potion"))
return otmWixShut("potion"); otmPotionOpen(); });
OTM_SHELVES.forEach(function (S, i) {
var jc = otmShelfIngs(i).map(function (g) { return parseInt(g[3].slice(1), 16); }), w = S.ry ? 3.8 : 3.6, out = 1.5;
otmJarShelf(otmGroup(S.x, 0, S.z, S.ry), w, S.ry ? 7 : 6, jc, i);
otmSpot(S.ry ? S.x + out : S.x, S.ry ? S.z : S.z + out, 1.3, "🫙 " + S.n, "gather ingredients into your satchel", function () { if (!otmWixOn("potion"))
return otmWixShut("potion"); otmShelfOpen(i); });
});
otmSolid(-81.3, -9.6, 0.3, 6.6, 0, 2.6);
otmSolid(-73.8, -17.4, 6.4, 0.3, 0, 2.6);
var wb = otmGroup(-62.4, 0, -9, -Math.PI / 2);
otmBox(4, 0.1, 1, otmMat(0x3A2614, "wood"), 0, 0.9, 0, wb);
otmBox(3.9, 0.85, 0.9, otmMat(0x2A1A10, "wood"), 0, 0.43, 0, wb);
otmCyl(0.18, 0.2, otmMat(0x6A6460, "stone"), -1.2, 1.05, 0, wb, 10, 0.12);
otmBox(0.5, 0.08, 0.36, otmMat(0x5A1A1A, null), 0.6, 0.99, 0, wb);
otmSolid(-62.4, -9, 0.5, 2.0, 0, 1.0);
otmSpot(-63.8, -8.4, 1.5, "📖 The grimoire", "read the recipes and the Materia Magica", function () { if (!otmWixOn("potion"))
return otmWixShut("potion"); otmPotionOpen("book"); });
for (var h = 0; h < (lite ? 6 : 12); h++) {
var hx = -79 + (h % 6) * 3, hz = -3 - Math.floor(h / 6) * 10;
otmCyl(0.005, 0.6, otmM("iron"), hx, 5.6, hz, null, 3);
otmCyl(0.12, 0.4, otmMat([0x5A7A3A, 0x8A6AA8, 0x7A8A4A][h % 3], null), hx, 5.1, hz, null, 6, 0.02);
}
otmSign(["THE APOTHECARY", "the Potion Game"], 3.2, 0.6, "#1A1208", "#E8D8A0", -71, 4.2, -0.62, Math.PI);
otmCandelabrum(-61.2, 0, -1.6);
otmCandelabrum(-61.2, 0, -16.4);
},
function () {
var lite = OTM.lite;
var R = otmRoom({ x0: -82, z0: -36, x1: -60, z1: -18, h: 5, name: "the Temple Kitchen", key: "kitchen", floor: otmMat(0x4A3A2E, "stone"), wall: otmMat(0x5A4A3A, "stone"), ceil: otmMat(0x2A1E14, "wood"),
doors: { s: [{ at: -64.5, w: 2.2, h: 3.0 }] } });
var hx = -81.2, hz = -27;
otmBox(1.4, 3.2, 4.4, otmMat(0x3A2E26, "stone"), hx, 1.6, hz);
otmBox(1.5, 0.3, 4.8, otmMat(0x2A1E14, "wood"), hx + 0.1, 3.3, hz);
otmBox(0.06, 1.6, 2.8, otmMat(0x0A0806, null), hx + 0.73, 0.85, hz);
otmFlame(hx + 1.05, 0.15, hz - 0.4, 2.6, 0xFF8A30);
otmFlame(hx + 1.05, 0.15, hz + 0.4, 2.2, 0xFFA040);
otmBox(1.0, 0.08, 3.0, otmMat(0x2A2420, "stone"), hx + 1.1, 0.04, hz);
otmCyl(0.45, 0.55, otmMat(0x1A1818, "metal", { phong: 40 }), hx + 1.05, 0.9, hz, null, lite ? 12 : 20, 0.36);
otmBox(0.9, 0.05, 0.05, otmM("iron"), hx + 0.75, 1.5, hz);
otmSolid(hx + 0.3, hz, 1.35, 2.4, 0, 3.2);
var ov = otmGroup(-81, 0, -32.4, Math.PI / 2);
otmBox(2.2, 1.6, 1.4, otmMat(0x6A4A3A, "stone"), 0, 0.8, 0, ov);
otmCyl(0.45, 0.05, otmMat(0x0A0806, null), 0, 0.9, 0.71, ov, 16).rotation.x = Math.PI / 2;
otmSolid(-81, -32.4, 0.8, 1.2, 0, 1.6);
var tx = -70, tz = -27;
otmBox(8, 0.1, 1.6, otmMat(0x5A3A22, "wood"), tx, 0.85, tz);
[[-3.7, -0.6], [3.7, -0.6], [-3.7, 0.6], [3.7, 0.6]].forEach(function (p) { otmBox(0.14, 0.8, 0.14, otmMat(0x3A2416, "wood"), tx + p[0], 0.4, tz + p[1]); });
[-1.25, 1.25].forEach(function (dz) { otmBox(7.4, 0.08, 0.4, otmMat(0x4A2E1A, "wood"), tx, 0.46, tz + dz); });
otmSolid(tx, tz, 4.0, 0.85, 0, 0.9);
otmSph(0.2, otmMat(0xC88A4A, null), tx - 2, 0.98, tz, null, 10).scale.set(1.6, 0.6, 1);
otmCyl(0.3, 0.12, otmMat(0x7A5A3A, "wood"), tx + 1.5, 0.96, tz, null, 14, 0.2);
[[-0.08, 0xA81A2A], [0.1, 0xC83A2A], [0.02, 0x6A9A2A]].forEach(function (f, i) { otmSph(0.08, otmMat(f[1], null), tx + 1.5 + f[0], 1.06, tz + (i - 1) * 0.1, null, 8); });
otmCandle(tx - 0.5, 0.9, tz, 0.9);
otmCandle(tx + 3, 0.9, tz, 0.9);
for (var c = 0; c < (lite ? 2 : 3); c++) {
var sg = otmGroup(-76 + c * 4.4, 0, -35.6, 0);
otmBox(3.6, 0.06, 0.4, otmMat(0x3A2416, "wood"), 0, 1.2, 0, sg);
otmBox(3.6, 0.06, 0.4, otmMat(0x3A2416, "wood"), 0, 1.9, 0, sg);
for (var j = 0; j < 6; j++) {
otmCyl(0.14, 0.3, otmMat([0xB87A4A, 0xE8DCC0, 0x6A4A8A, 0xC86A3A][(j + c) % 4], null), -1.5 + j * 0.6, 1.38, 0, sg, lite ? 8 : 12);
otmCyl(0.16, 0.08, otmMat(0xC8743A, "metal", { phong: 60 }), -1.5 + j * 0.6, 1.97, 0, sg, lite ? 8 : 12);
}
}
otmSolid(-71.6, -35.6, 6.6, 0.3, 0, 2.0);
for (var h = 0; h < (lite ? 5 : 10); h++) {
var bx = -79 + (h % 5) * 3.6, bz = -22 - Math.floor(h / 5) * 8;
otmCyl(0.005, 0.5, otmM("iron"), bx, 4.7, bz, null, 3);
otmCyl(0.12, 0.4, otmMat([0x5A7A3A, 0xE8E0C8, 0x8A6AA8][h % 3], null), bx, 4.25, bz, null, 6, 0.02);
}
var lc = otmGroup(-61.4, 0, -22, -Math.PI / 2);
otmBox(0.5, 1.0, 0.4, otmMat(0x2A1A10, "wood"), 0, 0.5, 0, lc);
otmBox(0.7, 0.05, 0.5, otmMat(0x2A1A10, "wood"), 0, 1.05, 0, lc).rotation.x = -0.3;
otmBox(0.56, 0.06, 0.4, otmMat(0x5A1A2A, null), 0, 1.1, 0.02, lc).rotation.x = -0.3;
otmSph(0.06, otmGlowM(0xFFD27A, 0.8), 0, 1.3, 0, lc, 8);
otmSolid(-61.4, -22, 0.3, 0.35, 0, 1.1);
otmSpot(-62.8, -22, 1.6, "🍲 The Obsidian Moon Cookbook", "read the coven's own recipes", function () { if (!otmWixOn("cookbook"))
return otmWixShut("cookbook"); otmCookbookOpen(); });
otmSign(["THE TEMPLE KITCHEN", "the Coven Cookbook"], 3.2, 0.6, "#1A1208", "#E8D8A0", -64.5, 3.6, -18.62, 0);
otmCandelabrum(-61.2, 0, -34.6);
},
function (g, w, per, cols, off) {
var wd = otmMat(0x2A1A10, "wood"), sh = otmMat(0x3A2614, "wood"), lab = otmMat(0xE8DCC0, null), cork = otmMat(0x8A6A3A, null), lite = OTM.lite;
otmBox(w, 2.6, 0.05, wd, 0, 1.3, -0.2, g);
otmBox(0.06, 2.6, 0.45, wd, -w / 2, 1.3, 0, g);
otmBox(0.06, 2.6, 0.45, wd, w / 2, 1.3, 0, g);
otmBox(w, 0.06, 0.45, wd, 0, 2.6, 0, g);
for (var l = 0; l < 4; l++) {
var y = 0.1 + l * 0.62;
otmBox(w - 0.08, 0.05, 0.42, sh, 0, y, 0, g);
for (var j = 0; j < per; j++) {
var k = (j + l * 3 + off) % cols.length, x = -w / 2 + 0.35 + j * (w - 0.7) / (per - 1), tall = (j + l) % 3 === 0, h = tall ? 0.34 : 0.24, r = tall ? 0.07 : 0.1;
otmCyl(r, h, otmMat(cols[k], null, { op: 0.85, e: cols[k], ei: 0.15 }), x, y + 0.03 + h / 2, 0.02, g, lite ? 6 : 10);
otmCyl(r * 0.55, 0.05, cork, x, y + 0.03 + h + 0.025, 0.02, g, 6);
if (!lite)
otmBox(r * 1.3, h * 0.35, 0.005, lab, x, y + 0.03 + h * 0.45, 0.02 + r + 0.004, g);
}
}
},
function (dt, t) {
otmOrrTick(dt);
if (OTM.astrolabe)
OTM.astrolabe.rete.rotation.z = -((Date.now() / 86164091) % 1) * Math.PI * 2;
if (OTM.pend)
OTM.pend.rotation.z = Math.sin(t * 1.6) * (OTM.pendAmp || 0.08);
var C = OTM.cauldron;
if (C) {
var on = OTM.potBrew && OTM.potBrew.until > Date.now();
C.bubbles.forEach(function (B) { var k = ((t * (on ? 1.6 : 0.6) + B.ph) % 1); B.m.position.y = 1.38 + k * (on ? 0.35 : 0.15); B.m.material.opacity = 0.7 * (1 - k); });
}
OTM.kidLanterns = (OTM.kidLanterns || []).filter(function (L) { if (L.t < 45)
return true; if (L.g.parent)
L.g.parent.remove(L.g); return false; });
OTM.kidLanterns.forEach(function (L) { L.t += dt; L.g.position.y = Math.min(5.6, 1.4 + L.t * 0.25); L.g.position.x += L.dx * dt; L.g.position.z += L.dz * dt; L.g.rotation.y += dt * 0.3; });
},
function (dt) {
var O = OTM.orr;
if (!O || !O.g)
return;
var R = Math.PI / 180;
var wall = Date.now(), el = Math.min(2, Math.max(dt, (wall - (O.wall || wall)) / 1000));
O.wall = wall;
if (O.live)
O.t = wall;
else
O.t += el * O.speed * 86400000;
if (!(O.t > OTM_ORR_MIN)) {
O.t = OTM_ORR_MIN;
O.speed = 0;
}
if (O.t > OTM_ORR_MAX) {
O.t = OTM_ORR_MAX;
O.speed = 0;
}
var P = otmPlanetsAt(O.t);
O.arms.forEach(function (A) {
var hl = P[A.p.k].hl;
A.arm.rotation.y = hl * R;
if (A.moon) {
A.moon.rotation.y = (P.moon.gl - hl) * R;
A.mface.rotation.y = (hl + 180 - P.moon.gl) * R;
}
});
var sp = O.live ? 0 : O.speed;
O.crank.rotation.x -= dt * (O.live ? 0.6 : sp === 0 ? 0 : (sp > 0 ? 1 : -1) * Math.min(14, 1 + Math.log(1 + Math.abs(sp)) * 2.2));
otmOrrPlate(false);
},
function (force) {
var O = OTM.orr;
if (!O || !O.dc)
return;
var now = Date.now();
if (!force && now - O.dAt < 250)
return;
var fast = !O.live && Math.abs(O.speed) >= 1, w = otmOrrWhen(O.t, !fast), mode = otmOrrMode(O), txt = w[0] + "|" + (fast ? "" : w[1]) + "|" + mode;
if (!force && txt === O.dtxt)
return;
O.dtxt = txt;
O.dAt = now;
var c = O.dc.getContext("2d"), W = O.dc.width, H = O.dc.height;
c.fillStyle = "#1A1206";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#D8B060";
c.lineWidth = W / 96;
c.strokeRect(W / 64, W / 64, W - W / 32, H - W / 32);
c.textAlign = "center";
c.textBaseline = "middle";
c.fillStyle = "#F4DE9A";
c.font = "bold " + Math.round(H * 0.27) + "px serif";
c.fillText(w[0], W / 2, H * 0.3);
c.font = Math.round(H * 0.2) + "px serif";
c.fillStyle = "#E8D8B0";
if (!fast)
c.fillText(w[1], W / 2, H * 0.56);
c.font = Math.round(H * 0.15) + "px sans-serif";
c.fillStyle = O.live ? "#9AF0A0" : "#F0C080";
c.fillText(mode, W / 2, fast ? H * 0.66 : H * 0.8);
O.dtex.needsUpdate = true;
},
function (txt, h) {
var k = "orrlab|" + txt, m = OTM.mats[k];
if (!m) {
var cv = document.createElement("canvas"), lite = OTM.lite;
cv.width = lite ? 192 : 320;
cv.height = lite ? 48 : 80;
var c = cv.getContext("2d"), W = cv.width, H = cv.height;
c.font = "bold " + Math.round(H * 0.5) + "px serif";
var tw = Math.min(W - 8, c.measureText(txt).width + H * 0.6);
c.fillStyle = "rgba(10,8,20,0.72)";
c.fillRect((W - tw) / 2, H * 0.12, tw, H * 0.76);
c.strokeStyle = "rgba(216,176,96,0.9)";
c.lineWidth = 2;
c.strokeRect((W - tw) / 2, H * 0.12, tw, H * 0.76);
c.fillStyle = "#F4E2A8";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(txt, W / 2, H / 2 + 1);
m = OTM.mats[k] = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false });
}
var s = new THREE.Sprite(m);
s.scale.set(h * 4, h, 1);
s.raycast = function () { };
return s;
},
function (title, sub, html, mount) {
if (!OTM.panel) {
var st = document.createElement("style");
st.textContent = "#otm-panel{position:fixed;inset:0;z-index:60;display:none;align-items:center;justify-content:center;background:rgba(4,2,8,.62)}" +
"#otm-panel .otp{position:relative;width:min(780px,calc(100vw - 20px));max-height:calc(100vh - 28px);overflow:auto;background:linear-gradient(160deg,#120E1A,#07050B 60%,#100A14);" +
"border:1px solid #B8923A;border-radius:6px;box-shadow:0 0 40px rgba(120,90,200,.25);color:#EDE6D6;font:15px/1.45 Georgia,'Times New Roman',serif;padding:16px 18px 18px}" +
"#otm-panel h2{margin:0;font:600 21px Georgia,serif;color:#F0D890;letter-spacing:.02em}#otm-panel .sub{opacity:.75;font-size:13px;margin:2px 0 10px}" +
"#otm-panel .x{position:absolute;top:8px;right:10px;font-size:20px;cursor:pointer;opacity:.75;background:none;border:0;color:#EDE6D6}" +
"#otm-panel .b{display:inline-block;margin:4px 6px 4px 0;padding:8px 12px;border:1px solid rgba(184,146,58,.7);border-radius:4px;background:rgba(184,146,58,.1);color:#F4ECD8;cursor:pointer;font:inherit}" +
"#otm-panel .b.on{background:rgba(184,146,58,.35)}#otm-panel .b:disabled{opacity:.4;cursor:default}" +
"#otm-panel input,#otm-panel select,#otm-panel textarea{background:#0A0810;border:1px solid #5A4A6A;color:#F4ECD8;padding:7px 8px;border-radius:3px;font:inherit;max-width:100%}" +
"#otm-panel .tabs{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 10px}#otm-panel .note{opacity:.72;font-size:12.5px}" +
"#otm-panel .card{display:inline-flex;flex-direction:column;align-items:center;justify-content:space-between;width:112px;height:184px;margin:6px;padding:8px 6px;border-radius:8px;vertical-align:top;" +
"background:linear-gradient(170deg,#2A1A4A,#120A22);border:2px solid #C8A050;box-shadow:0 2px 10px rgba(0,0,0,.5);text-align:center;transition:transform .7s ease}" +
"#otm-panel .card .n{font-size:12px;color:#F0D890}#otm-panel .card .i{font-size:44px;line-height:1}#otm-panel .card .t{font-size:13px;font-weight:600}" +
"#otm-panel .card.rev .i{transform:rotate(180deg)}#otm-panel .card.back{background:repeating-linear-gradient(45deg,#1A1030,#1A1030 8px,#24183E 8px,#24183E 16px)}" +
"#otm-panel .pos{font-size:11px;opacity:.75;margin-top:2px;max-width:124px}#otm-panel .grid{display:flex;flex-wrap:wrap;gap:6px}" +
"#otm-panel .tile{width:64px;height:64px;font-size:36px;display:flex;align-items:center;justify-content:center;border:2px solid #8A6AD8;border-radius:10px;background:#1A1440;cursor:pointer}" +
"#otm-panel .kid{background:linear-gradient(160deg,#3A1A8A,#1A2A8A);border-color:#FFE84A}" +
"#otm-panel table{border-collapse:collapse;width:100%;font-size:13.5px}#otm-panel td{padding:3px 6px;border-top:1px solid rgba(184,146,58,.2);vertical-align:top}" +
"@media (max-width:520px){#otm-panel .otp{width:100vw;max-height:100vh;height:100vh;border-radius:0;padding:14px 12px}#otm-panel .card{width:92px;height:156px;margin:4px}#otm-panel .card .i{font-size:36px}}";
document.head.appendChild(st);
var d = document.createElement("div");
d.id = "otm-panel";
document.body.appendChild(d);
OTM.panel = d;
d.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Escape")
otmPanelClose(); });
d.addEventListener("keyup", function (e) { e.stopPropagation(); });
d.addEventListener("click", function (e) { if (e.target === d)
otmPanelClose(); });
}
if (typeof worldCard === "function")
worldCard(null);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var P = OTM.panel;
P.innerHTML = "<div class='otp' role='dialog' aria-label='" + otmEsc(title) + "'><button class='x' aria-label='Close'>✕</button><h2>" + otmEsc(title) + "</h2>" + (sub ? "<div class='sub'>" + otmEsc(sub) + "</div>" : "") + "<div class='bd'>" + html + "</div></div>";
P.style.display = "flex";
P.querySelector(".x").onclick = otmPanelClose;
OTM.panelTick = null;
var bd = P.querySelector(".bd");
if (mount)
try {
mount(bd);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] panel", e);
}
return bd;
},
function (ms) {
var T = (ms - Date.UTC(2000, 0, 1, 12)) / (36525 * 86400000), D = T * 36525, o = {}, R = Math.PI / 180;
OTM_PLANETS.forEach(function (p) {
var a = p.a + p.ar * T, e = p.e + p.er * T, I = (p.I + p.Ir * T) * R, L = p.L0 + p.Lr * T, w = p.w0 + p.wr * T, O = (p.O + p.Or * T) * R;
var M = otmDeg(L - w);
if (M > 180)
M -= 360;
M *= R;
var E = M + e * Math.sin(M);
for (var i = 0; i < 6; i++)
E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
var xp = a * (Math.cos(E) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E), om = w * R - O, co = Math.cos(om), so = Math.sin(om), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I);
var x = (co * cO - so * sO * cI) * xp + (-so * cO - co * sO * cI) * yp, y = (co * sO + so * cO * cI) * xp + (-so * sO + co * cO * cI) * yp, z = (so * xp + co * yp) * Math.sin(I);
o[p.k] = { hl: otmDeg(Math.atan2(y, x) / R), r: Math.sqrt(x * x + y * y + z * z), x: x, y: y, z: z };
});
var E = o.earth;
OTM_PLANETS.forEach(function (p) { if (p.k === "earth")
return; var q = o[p.k]; q.gl = otmDeg(Math.atan2(q.y - E.y, q.x - E.x) / R); });
var sun = otmDeg(E.hl + 180);
o.sun = { gl: sun };
var mL = 218.316 + 13.176396 * D, mM = (134.963 + 13.064993 * D) * R, sM = (357.529 + 0.98560028 * D) * R, mD = (297.850 + 12.190749 * D) * R, mF = (93.272 + 13.229350 * D) * R;
var ml = otmDeg(mL + 6.289 * Math.sin(mM) + 1.274 * Math.sin(2 * mD - mM) + 0.658 * Math.sin(2 * mD) + 0.214 * Math.sin(2 * mM) - 0.186 * Math.sin(sM) - 0.114 * Math.sin(2 * mF));
o.moon = { gl: ml, el: otmDeg(ml - sun) };
return o;
},
function (cv, ms) {
var c = cv.getContext("2d"), W = cv.width, C = W / 2, P = otmPlanetsAt(ms), R = Math.PI / 180;
c.clearRect(0, 0, W, W);
var g = c.createRadialGradient(C, C, 10, C, C, C);
g.addColorStop(0, "#1A1430");
g.addColorStop(1, "#07050B");
c.fillStyle = g;
c.beginPath();
c.arc(C, C, C - 2, 0, 6.3);
c.fill();
c.strokeStyle = "#B8923A";
c.lineWidth = 2;
[C - 4, C - 34, C - 120].forEach(function (r) { c.beginPath(); c.arc(C, C, r, 0, 6.3); c.stroke(); });
function at(l, r) { var a = Math.PI - l * R; return [C + Math.cos(a) * r, C - Math.sin(a) * r]; }
c.fillStyle = "#D8C890";
c.font = Math.round(W / 18) + "px serif";
c.textAlign = "center";
c.textBaseline = "middle";
for (var i = 0; i < 12; i++) {
var p0 = at(i * 30, C - 4), p1 = at(i * 30, C - 34);
c.beginPath();
c.moveTo(p0[0], p0[1]);
c.lineTo(p1[0], p1[1]);
c.stroke();
var q = at(i * 30 + 15, C - 19);
c.fillText(OTM_ZOD[i], q[0], q[1]);
}
c.fillStyle = "#3A6AE8";
c.beginPath();
c.arc(C, C, 7, 0, 6.3);
c.fill();
var bodies = [["☉", P.sun.gl, "#FFD27A"], ["☽", P.moon.gl, "#E8E8F0"]].concat(OTM_PLANETS.filter(function (p) { return p.k !== "earth"; }).map(function (p) { return [p.s, P[p.k].gl, "#" + ("00000" + p.col.toString(16)).slice(-6)]; }));
c.font = Math.round(W / 16) + "px serif";
bodies.forEach(function (b, j) { var r = C - 48 - (j % 3) * 22, q = at(b[1], r); c.strokeStyle = "rgba(184,146,58,.35)"; c.lineWidth = 1; c.beginPath(); c.moveTo(C, C); c.lineTo(q[0], q[1]); c.stroke(); c.fillStyle = b[2]; c.fillText(b[0], q[0], q[1]); });
},
function (cv, ms) {
var c = cv.getContext("2d"), W = cv.width, C = W / 2, P = otmPlanetsAt(ms), R = Math.PI / 180, rmax = 0.9 + Math.sqrt(30.07) * 0.95, k = (C - 30) / rmax;
c.clearRect(0, 0, W, W);
var g = c.createRadialGradient(C, C, 10, C, C, C);
g.addColorStop(0, "#1A1430");
g.addColorStop(1, "#07050B");
c.fillStyle = g;
c.beginPath();
c.arc(C, C, C - 2, 0, 6.3);
c.fill();
c.strokeStyle = "#B8923A";
c.lineWidth = 1.5;
c.beginPath();
c.arc(C, C, C - 4, 0, 6.3);
c.stroke();
c.fillStyle = "#D8C890";
c.font = Math.round(W / 22) + "px serif";
c.textAlign = "center";
c.textBaseline = "middle";
for (var i = 0; i < 12; i++) {
var a = (i * 30 + 15) * R;
c.fillText(OTM_ZOD[i], C + Math.cos(a) * (C - 16), C - Math.sin(a) * (C - 16));
}
c.fillStyle = "#FFD27A";
c.beginPath();
c.arc(C, C, 7, 0, 6.3);
c.fill();
c.font = Math.round(W / 26) + "px sans-serif";
OTM_PLANETS.forEach(function (p) {
var r = (0.9 + Math.sqrt(p.a) * 0.95) * k, a = P[p.k].hl * R, x = C + Math.cos(a) * r, y = C - Math.sin(a) * r, col = "#" + ("00000" + p.col.toString(16)).slice(-6);
c.strokeStyle = "rgba(184,146,58,.4)";
c.lineWidth = 1;
c.beginPath();
c.arc(C, C, r, 0, 6.3);
c.stroke();
c.fillStyle = col;
c.beginPath();
c.arc(x, y, Math.max(3, p.r * 22), 0, 6.3);
c.fill();
if (p.k === "earth") {
var ma = P.moon.gl * R;
c.fillStyle = "#ECECF4";
c.beginPath();
c.arc(x + Math.cos(ma) * 9, y - Math.sin(ma) * 9, 2, 0, 6.3);
c.fill();
}
c.fillStyle = "#F4E2A8";
c.fillText(p.n, x, y - Math.max(3, p.r * 22) - 8);
});
},
function (pg, done) {
var P = otmPlace(), box = otmQ(pg, ".plc");
box.innerHTML = "<div class='note'>" + (P ? "Place: <b>" + otmEsc(P.n) + "</b> (" + P.lat.toFixed(2) + ", " + P.lon.toFixed(2) + ")" : "Choose a place to see its sky.") + "</div>" +
"<input class='pq' placeholder='Town or city' style='width:min(240px,60vw)'> <button class='b pf'>Find</button><button class='b pg2'>📍 Use my location</button> <span class='note pm'></span><div class='pr'></div>";
function set(n, lat, lon) { var p = otmProg(); p.place = { n: String(n).slice(0, 80), lat: +lat, lon: +lon }; otmProgSave(); done(); }
otmQ(box, ".pf").onclick = function () {
var q = otmQ(box, ".pq").value.trim(), pm = otmQ(box, ".pm");
if (!q)
return;
pm.textContent = "searching…";
fetch("https://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + encodeURIComponent(q)).then(function (r) { return r.json(); }).then(function (L) {
pm.textContent = L.length ? "" : "no place found";
otmQ(box, ".pr").innerHTML = L.map(function (x, i) { return "<button class='b' data-pi='" + i + "' style='font-size:12px'>" + otmEsc(String(x.display_name).slice(0, 70)) + "</button>"; }).join("");
box.querySelectorAll("[data-pi]").forEach(function (b) { b.onclick = function () { var x = L[+b.getAttribute("data-pi")]; set(String(x.display_name).split(",")[0], x.lat, x.lon); }; });
}, function () { pm.textContent = "the place search could not be reached; use your location instead"; });
};
otmQ(box, ".pg2").onclick = function () {
var pm = otmQ(box, ".pm");
if (!navigator.geolocation) {
pm.textContent = "this device cannot tell its place";
return;
}
pm.textContent = "asking…";
navigator.geolocation.getCurrentPosition(function (g) { set("My location", g.coords.latitude, g.coords.longitude); }, function () { pm.textContent = "location was not shared"; });
};
},
function (cv, ms, lat, lon) {
var c = cv.getContext("2d"), W = cv.width, C = W / 2, Rr = C - 18, lst = otmLST(ms, lon), R = Math.PI / 180;
c.clearRect(0, 0, W, W);
var g = c.createRadialGradient(C, C, 10, C, C, Rr);
g.addColorStop(0, "#141A3A");
g.addColorStop(1, "#05060F");
c.fillStyle = g;
c.beginPath();
c.arc(C, C, Rr, 0, 6.3);
c.fill();
c.strokeStyle = "rgba(184,146,58,.6)";
c.lineWidth = 2;
c.beginPath();
c.arc(C, C, Rr, 0, 6.3);
c.stroke();
c.lineWidth = 0.6;
c.strokeStyle = "rgba(184,146,58,.25)";
[30, 60].forEach(function (a) { c.beginPath(); c.arc(C, C, Rr * (90 - a) / 90, 0, 6.3); c.stroke(); });
function xy(alt, az) { var r = Rr * (90 - alt) / 90; return [C - Math.sin(az * R) * r, C - Math.cos(az * R) * r]; }
var pos = OTM_STARCAT.map(function (s) { return otmAltAz(s[1], s[2], lst, lat); });
c.strokeStyle = "rgba(140,170,255,.35)";
c.lineWidth = 1;
OTM_CONLINES.forEach(function (l) { var a = pos[l[0]], b = pos[l[1]]; if (a[0] < 0 || b[0] < 0)
return; var p = xy(a[0], a[1]), q = xy(b[0], b[1]); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); });
var up = 0;
OTM_STARCAT.forEach(function (s, i) {
var a = pos[i];
if (a[0] < 0)
return;
up++;
var p = xy(a[0], a[1]), r = Math.max(0.8, 3.2 - s[3] * 0.7);
c.fillStyle = "#F4F2FF";
c.beginPath();
c.arc(p[0], p[1], r, 0, 6.3);
c.fill();
if (s[3] <= 1.2) {
c.fillStyle = "rgba(220,220,255,.75)";
c.font = Math.round(W / 46) + "px Georgia,serif";
c.textAlign = "left";
c.fillText(s[0], p[0] + 5, p[1] - 4);
}
});
var P = otmPlanetsAt(ms), B = [["☉ Sun", P.sun.gl, "#FFD27A"], ["☽ Moon", P.moon.gl, "#E8E8F0"]].concat(OTM_PLANETS.filter(function (p) { return p.k !== "earth"; }).map(function (p) { return [p.s + " " + p.n, P[p.k].gl, "#" + ("00000" + p.col.toString(16)).slice(-6)]; })), seen = [];
B.forEach(function (b) { var e = otmEclToEq(b[1]), a = otmAltAz(e[0], e[1], lst, lat); if (a[0] < 0)
return; seen.push(b[0]); var p = xy(a[0], a[1]); c.fillStyle = b[2]; c.beginPath(); c.arc(p[0], p[1], 5, 0, 6.3); c.fill(); c.font = "bold " + Math.round(W / 36) + "px Georgia,serif"; c.textAlign = "left"; c.fillText(b[0], p[0] + 7, p[1] + 4); });
c.fillStyle = "#F0D890";
c.font = "bold " + Math.round(W / 30) + "px Georgia,serif";
c.textAlign = "center";
c.textBaseline = "middle";
[["N", 0], ["E", 90], ["S", 180], ["W", 270]].forEach(function (d) { var p = xy(-8, d[1]); c.fillText(d[0], p[0], p[1]); });
c.textBaseline = "alphabetic";
return { up: up, seen: seen };
},
function (ms, lat, lon) {
var P = otmPlanetsAt(ms), lst = otmLST(ms, lon), R = Math.PI / 180, e = 23.4393 * R, ramc = lst * R, f = lat * R;
var asc = otmDeg(Math.atan2(-Math.cos(ramc), Math.sin(e) * Math.tan(f) + Math.cos(e) * Math.sin(ramc)) / R), mc = otmDeg(Math.atan2(Math.sin(ramc) * Math.cos(e), Math.cos(ramc)) / R);
if (otmDeg(asc - mc) > 180)
asc = otmDeg(asc + 180);
var B = [["☉", "Sun", P.sun.gl], ["☽", "Moon", P.moon.gl]].concat(OTM_PLANETS.filter(function (p) { return p.k !== "earth"; }).map(function (p) { return [p.s, p.n, P[p.k].gl]; }));
var asp = [];
for (var i = 0; i < B.length; i++)
for (var j = i + 1; j < B.length; j++) {
var d = Math.abs(B[i][2] - B[j][2]) % 360;
if (d > 180)
d = 360 - d;
for (var k = 0; k < OTM_ASPECTS.length; k++)
if (Math.abs(d - OTM_ASPECTS[k][1]) <= OTM_ASPECTS[k][2]) {
asp.push([B[i], B[j], OTM_ASPECTS[k], d]);
break;
}
}
return { B: B, asc: asc, mc: mc, asp: asp };
},
function (cv, N) {
var c = cv.getContext("2d"), W = cv.width, C = W / 2, R = Math.PI / 180;
c.clearRect(0, 0, W, W);
var g = c.createRadialGradient(C, C, 10, C, C, C);
g.addColorStop(0, "#1A1430");
g.addColorStop(1, "#07050B");
c.fillStyle = g;
c.beginPath();
c.arc(C, C, C - 2, 0, 6.3);
c.fill();
function at(l, r) { var a = Math.PI + (l - N.asc) * R; return [C + Math.cos(a) * r, C - Math.sin(a) * r]; }
c.strokeStyle = "#B8923A";
c.lineWidth = 2;
[C - 4, C - 36, C * 0.42].forEach(function (r) { c.beginPath(); c.arc(C, C, r, 0, 6.3); c.stroke(); });
c.fillStyle = "#D8C890";
c.font = Math.round(W / 20) + "px serif";
c.textAlign = "center";
c.textBaseline = "middle";
for (var i = 0; i < 12; i++) {
var p0 = at(i * 30, C - 4), p1 = at(i * 30, C - 36);
c.beginPath();
c.moveTo(p0[0], p0[1]);
c.lineTo(p1[0], p1[1]);
c.stroke();
var q = at(i * 30 + 15, C - 20);
c.fillText(OTM_ZOD[i], q[0], q[1]);
}
c.strokeStyle = "rgba(184,146,58,.35)";
c.lineWidth = 1;
c.font = Math.round(W / 34) + "px Georgia,serif";
c.fillStyle = "rgba(216,200,144,.7)";
for (var h = 0; h < 12; h++) {
var a0 = at(N.asc + h * 30, C - 36), a1 = at(N.asc + h * 30, C * 0.42);
c.beginPath();
c.moveTo(a0[0], a0[1]);
c.lineTo(a1[0], a1[1]);
c.stroke();
var hq = at(N.asc + h * 30 + 15, C * 0.47);
c.fillText(h + 1, hq[0], hq[1]);
}
N.asp.forEach(function (x) { if (!x[2][1])
return; var p = at(x[0][2], C * 0.42), q = at(x[1][2], C * 0.42); c.strokeStyle = x[2][3]; c.globalAlpha = 0.55; c.setLineDash(x[2][1] === 120 || x[2][1] === 180 ? [] : [4, 3]); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); });
c.setLineDash([]);
c.globalAlpha = 1;
[[N.asc, "ASC"], [N.mc, "MC"]].forEach(function (m) { var p = at(m[0], C - 4), q = at(m[0], C * 0.42); c.strokeStyle = "#F0D890"; c.lineWidth = 2.5; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); var t = at(m[0], C * 0.36); c.fillStyle = "#F0D890"; c.font = "bold " + Math.round(W / 34) + "px Georgia,serif"; c.fillText(m[1], t[0], t[1]); });
c.font = Math.round(W / 17) + "px serif";
var used = [];
N.B.forEach(function (b) { var r = C - 56; used.forEach(function (u) { if (Math.abs(otmDeg(u - b[2] + 180) - 180) < 7)
r -= 22; }); used.push(b[2]); var q = at(b[2], r); c.fillStyle = "#F4E8C0"; c.fillText(b[0], q[0], q[1]); });
},
function (from, days) {
var names = ["Sun", "Moon"].concat(OTM_PLANETS.filter(function (p) { return p.k !== "earth"; }).map(function (p) { return p.n; })), snaps = [];
for (var d = 0; d <= days; d++) {
var P = otmPlanetsAt(from + d * 86400000);
snaps.push([P.sun.gl, P.moon.gl].concat(OTM_PLANETS.filter(function (p) { return p.k !== "earth"; }).map(function (p) { return P[p.k].gl; })));
}
var ev = [];
for (var i = 0; i < names.length; i++)
for (var j = i + 1; j < names.length; j++) {
if (names[i] === "Moon" || names[j] === "Moon")
continue;
var S = snaps.map(function (s) { var x = Math.abs(s[i] - s[j]) % 360; return x > 180 ? 360 - x : x; });
for (var k = 0; k < S.length; k++) {
if (S[k] > 5)
continue;
if ((k === 0 || S[k] <= S[k - 1]) && (k === S.length - 1 || S[k] <= S[k + 1]))
ev.push([from + k * 86400000, names[i] + " meets " + names[j], S[k]]);
}
}
return ev.sort(function (a, b) { return a[0] - b[0]; });
},
function (tab, pg) {
if (tab === "stars") {
pg.innerHTML = "<div class='plc'></div><p style='margin:8px 0 4px'>When: <input type='datetime-local' class='wt'> <button class='b nw'>Now</button></p><div style='display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start'><canvas width='560' height='560' style='width:min(400px,100%)'></canvas><div class='inf' style='flex:1;min-width:200px'></div></div>" +
"<button class='b dl'>⬇ Save the star chart</button><p class='note'>" + OTM_STARCAT.length + " of the brightest stars and their figures, from his star catalogue, with the Sun, the Moon and the planets where they truly stand. The rim is the horizon; the middle is straight overhead.</p>";
var cv = otmQ(pg, "canvas"), wt = otmQ(pg, ".wt");
function d2(n) { return ("0" + n).slice(-2); }
function setNow() { var d = new Date(); wt.value = d.getFullYear() + "-" + d2(d.getMonth() + 1) + "-" + d2(d.getDate()) + "T" + d2(d.getHours()) + ":" + d2(d.getMinutes()); }
function draw() {
var P = otmPlace();
if (!P) {
otmQ(pg, ".inf").innerHTML = "<p>Choose a place above to raise its sky.</p>";
return;
}
var t = Date.parse(wt.value) || Date.now(), r = otmStarChart(cv, t, P.lat, P.lon);
otmQ(pg, ".inf").innerHTML = "<p><b>" + otmEsc(P.n) + "</b><br>" + new Date(t).toLocaleString() + "</p><p>" + r.up + " bright stars above the horizon.</p><p>Up now: " + (r.seen.length ? otmEsc(r.seen.join(", ")) : "none of the planets") + "</p>";
}
setNow();
otmPlaceUi(pg, function again() { otmPlaceUi(pg, again); draw(); });
otmQ(pg, ".nw").onclick = function () { setNow(); draw(); };
wt.onchange = draw;
otmQ(pg, ".dl").onclick = function () { var a = document.createElement("a"); a.href = cv.toDataURL("image/png"); a.download = "star-chart.png"; document.body.appendChild(a); a.click(); a.remove(); };
draw();
return true;
}
if (tab === "natal") {
var N0 = otmProg().natal || {};
pg.innerHTML = "<p>Birthday horoscope and natal revelations. Your birth date, time and place stay on this device.</p>" +
"<p>Born <input type='date' class='bd' value='" + (N0.d || "") + "'> at <input type='time' class='bt' value='" + (N0.t || "12:00") + "'> <select class='tz'>" + (function () { var o = ""; for (var h = -12; h <= 14; h += 0.5) {
if (h % 1 && [-9.5, -3.5, 3.5, 4.5, 5.5, 6.5, 9.5, 10.5].indexOf(h) < 0)
continue;
var v = String(h);
o += "<option value='" + v + "'>UTC" + (h >= 0 ? "+" : "") + (h % 1 ? Math.trunc(h) + ":30" : h) + "</option>";
} return o; })() + "</select> <label class='note'><input type='checkbox' class='lt'" + (N0.tz == null ? " checked" : "") + "> this device's own time zone</label></p>" +
"<div class='plc'></div><button class='b go' style='margin-top:6px'>✨ Reveal my chart</button><div class='out'></div>";
var tzS = otmQ(pg, ".tz");
if (N0.tz != null)
tzS.value = String(N0.tz);
otmPlaceUi(pg, function again() { otmPlaceUi(pg, again); });
otmQ(pg, ".go").onclick = function () {
var d = otmQ(pg, ".bd").value, t = otmQ(pg, ".bt").value || "12:00", P = otmPlace(), out = otmQ(pg, ".out"), loc = otmQ(pg, ".lt").checked;
if (!d) {
out.innerHTML = "<p>Put in your birth date first.</p>";
return;
}
if (!P) {
out.innerHTML = "<p>Choose your birth place (or near it) above.</p>";
return;
}
var ms = loc ? Date.parse(d + "T" + t) : Date.parse(d + "T" + t + "Z") - (+tzS.value) * 3600000;
if (!isFinite(ms)) {
out.innerHTML = "<p>That date could not be read.</p>";
return;
}
var p = otmProg();
p.natal = { d: d, t: t, tz: loc ? null : +tzS.value };
otmProgSave();
var N = otmNatal(ms, P.lat, P.lon), Z = function (l) { return Math.floor(otmDeg(l) / 30); }, sz = Z(N.B[0][2]), mz = Z(N.B[1][2]), az = Z(N.asc), cnt = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
N.B.forEach(function (b) { cnt[OTM_ZDATA[Z(b[2])][0]]++; });
cnt[OTM_ZDATA[az][0]]++;
var dom = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; })[0];
out.innerHTML = "<div style='display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;margin-top:8px'><canvas width='560' height='560' style='width:min(380px,100%)'></canvas><div style='flex:1;min-width:220px'><table>" +
N.B.map(function (b) { return "<tr><td>" + b[0] + " " + b[1] + "</td><td>" + otmSignOf(b[2]) + "</td><td class='note'>house " + (Math.floor(otmDeg(b[2] - N.asc) / 30) + 1) + "</td></tr>"; }).join("") +
"<tr><td><b>Rising</b></td><td>" + otmSignOf(N.asc) + "</td><td></td></tr><tr><td><b>Midheaven</b></td><td>" + otmSignOf(N.mc) + "</td><td></td></tr></table></div></div>" +
"<div style='margin-top:10px;padding:10px 12px;border:1px solid rgba(184,146,58,.45);border-radius:8px;background:rgba(60,40,110,.18)'><div style='font:600 15px Georgia,serif;color:#F0D890;margin-bottom:6px'>✨ Personal natal interpretations</div>" +
"<p><b>Core triad: " + OTM_SIGNS[sz] + " Sun, " + OTM_SIGNS[mz] + " Moon, " + OTM_SIGNS[az] + " Rising.</b> Your vital identity (the Sun in " + OTM_SIGNS[sz] + ") seeks self-expression by being " + OTM_ZDATA[sz][3] + " Your private inner world (the Moon in " + OTM_SIGNS[mz] + ") finds comfort by being " + OTM_ZDATA[mz][3] + " To the outer world your " + OTM_SIGNS[az] + " Ascendant gives a first impression that is " + OTM_ZDATA[az][3] + "</p>" +
"<p><b>Dominant element: " + dom + ".</b> " + OTM_ELEMS[dom] + "</p><p><b>Chart ruler: " + OTM_ZDATA[az][2] + ".</b> Because your Ascendant falls in " + OTM_SIGNS[az] + ", your chart is governed by " + OTM_ZDATA[az][2] + ": the compass for your personal journey and core drive.</p>" +
"<p><b>Aspects</b></p>" + (N.asp.length ? N.asp.map(function (x) { return "<div><span style='color:" + x[2][3] + "'>●</span> " + x[0][1] + " " + x[2][0].toLowerCase() + " " + x[1][1] + " <span class='note'>(" + x[3].toFixed(1) + "°)</span></div>"; }).join("") : "<p class='note'>No close aspects.</p>") + "</div>" +
"<button class='b dlz' style='margin-top:8px'>⬇ Save the zodiac wheel</button><p class='note'>Equal houses, counted from the rising sign; worked out here to about a degree. Birth times decide the rising sign: an hour off moves it about one sign.</p>";
var cv = otmQ(out, "canvas");
otmNatalWheel(cv, N);
otmQ(out, ".dlz").onclick = function () { var a = document.createElement("a"); a.href = cv.toDataURL("image/png"); a.download = "zodiac-wheel.png"; document.body.appendChild(a); a.click(); a.remove(); };
};
if (N0.d && otmPlace())
otmQ(pg, ".go").onclick();
return true;
}
if (tab === "align") {
var E = otmAlignments(Date.now(), 180);
pg.innerHTML = "<p>Where the planets meet in the sky (within five degrees) over the next six months, worked out day by day.</p>" + (E.length ? "<table>" + E.map(function (e) { return "<tr><td style='white-space:nowrap'>" + new Date(e[0]).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) + "</td><td><b>" + e[1] + "</b> <span class='note'>" + e[2].toFixed(1) + "° apart</span></td></tr>"; }).join("") + "</table>" : "<p>No close meetings in the next six months.</p>");
return true;
}
return false;
},
function (tab) {
tab = tab || "sky";
var bd = otmPanel("🧭 The Astrolabe and the Orrery", "the Hall of the Astrolabe · the real sky, worked out from today's date", otmTabs([["sky", "Today's sky"], ["stars", "✦ The stars over a place"], ["natal", "✨ Natal chart"], ["align", "☌ Alignments"], ["orrery", "The Orrery"], ["lore", "What they are"]], tab) + "<div class='pg'></div>");
otmTabsWire(bd, function (t) { otmSkyOpen(t); });
var pg = otmQ(bd, ".pg"), now = Date.now();
if (otmSkyExtra(tab, pg))
return;
if (tab === "sky") {
var P = otmPlanetsAt(now), el = P.moon.el;
pg.innerHTML = "<div style='display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start'><canvas width='300' height='300' style='width:min(300px,100%);max-width:300px'></canvas><div style='flex:1;min-width:220px'><table>" +
"<tr><td>☉ The Sun</td><td>in " + otmSignOf(P.sun.gl) + "</td></tr><tr><td>☽ The Moon</td><td>in " + otmSignOf(P.moon.gl) + "<br>" + otmPhaseEmoji(el) + " " + otmPhaseName(el) + ", " + Math.round((1 - Math.cos(el * Math.PI / 180)) / 2 * 100) + "% lit</td></tr>" +
OTM_PLANETS.filter(function (p) { return p.k !== "earth"; }).map(function (p) { return "<tr><td>" + p.s + " " + p.n + "</td><td>in " + otmSignOf(P[p.k].gl) + "</td></tr>"; }).join("") + "</table>" +
"<p class='note'>Worked out here from the real date by the planets' true orbits, to about a degree: this is the sky over your own roof today. The signs are counted as astrologers count them, from the spring equinox; the star-pictures themselves have slipped about 24° since the old astronomers drew them, by the slow wobble of the Earth (the precession of the equinoxes).</p></div></div>";
otmSkyWheel(otmQ(pg, "canvas"), now);
}
else if (tab === "orrery") {
pg.innerHTML = "<p>The Orrery turns above your head: the Sun at its heart and the eight planets on their arms, each standing where it truly is this minute, worked out from its real orbit, and moving on with it. Turn the crank to send the years round faster, forwards or back, and press Now to bring it home to today.</p>" +
"<p class='when' style='font-size:20px;color:#F0D890;margin:6px 0 2px'></p><p class='mode' style='margin:0 0 8px'></p>" +
"<div><button class='b' data-s='live' style='font-weight:bold'>⟲ Now</button><button class='b' data-s='0'>❚❚ Hold</button></div>" +
"<div style='margin-top:4px'>Turn the crank: <button class='b' data-s='-365.25'>◀◀◀ a year a second</button><button class='b' data-s='-30'>◀◀ a month</button><button class='b' data-s='-1'>◀ a day</button>" +
"<button class='b' data-s='1'>a day ▶</button><button class='b' data-s='30'>a month ▶▶</button><button class='b' data-s='365.25'>a year a second ▶▶▶</button></div>" +
"<p style='margin:10px 0 4px'>Go to a day and hour: <input type='datetime-local' class='dt'> <button class='b go'>Go</button></p>" +
"<div style='display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start'><canvas width='300' height='300' style='width:min(300px,100%);max-width:300px'></canvas><div style='flex:1;min-width:220px'><table class='pl'></table></div></div>" +
"<p class='note'>Seen from above, as the Orrery is built: everything goes round anticlockwise, and the sign beside each planet is where it stands seen from the Sun. The distances on the arms are squeezed, as on every orrery ever made; true to scale, Neptune would be eighty times as far out as Mercury. Its orbits are good for the years 1600 to 2400.</p>";
pg.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { var v = b.getAttribute("data-s"), O = OTM.orr; if (!O)
return; if (v === "live") {
O.live = true;
O.t = Date.now();
}
else {
O.live = false;
O.speed = +v;
} OTM.panelTick(); }; });
otmQ(pg, ".go").onclick = function () { var v = otmQ(pg, ".dt").value, O = OTM.orr; if (!v || !O)
return; var t = new Date(v).getTime(); if (isFinite(t)) {
O.live = false;
O.speed = 0;
O.t = Math.max(OTM_ORR_MIN, Math.min(OTM_ORR_MAX, t));
OTM.panelTick();
} };
var cv = otmQ(pg, "canvas"), wh = otmQ(pg, ".when"), md = otmQ(pg, ".mode"), tb = otmQ(pg, ".pl"), last = "";
OTM.panelTick = function () {
var O = OTM.orr || { t: Date.now(), live: true, speed: 0 }, t = O.t, w = otmOrrWhen(t, true);
wh.textContent = w[0] + " · " + w[1];
md.textContent = otmOrrMode(O);
otmOrrDiagram(cv, t);
var P = otmPlanetsAt(t), rows = "<tr><td></td><td>seen from the Sun</td><td>from the Sun</td><td>its year</td></tr>" + OTM_PLANETS.map(function (p) {
var q = P[p.k];
return "<tr><td>" + p.s + " " + p.n + "</td><td>" + otmSignOf(q.hl) + "</td><td>" + q.r.toFixed(2) + " AU</td><td>" + (p.yr < 1000 ? Math.round(p.yr) + " days" : (p.yr / 365.25).toFixed(1) + " years") + "</td></tr>";
}).join("") +
"<tr><td>☽ the Moon</td><td colspan='3'>" + otmPhaseEmoji(P.moon.el) + " " + otmPhaseName(P.moon.el) + ", " + Math.round((1 - Math.cos(P.moon.el * Math.PI / 180)) / 2 * 100) + "% lit</td></tr>";
if (rows !== last) {
tb.innerHTML = rows;
last = rows;
}
};
OTM.panelTick();
}
else {
otmAstroLore(pg);
}
},
function (into) {
var h = "<p><b>The astrolabe</b> is a map of the sky in brass that you can hold. Its idea, drawing the round sky flat on a plate, goes back to Hipparchus in the second century BC. Theon of Alexandria wrote on it, and his daughter Hypatia taught it. The astronomers of the Islamic world made it into a masterpiece, and more than a thousand old treatises on it survive.</p>" +
"<p>The pierced plate on top is the <i>rete</i>: its pointers are bright stars, and its ring is the path of the Sun through the zodiac. Turn the rete to the hour, and the plate beneath shows which stars are rising, which are setting, and what time it is by the Sun or the stars. The rete on the great astrolabe here turns once a sidereal day, as the sky does.</p>" +
"<p>Geoffrey Chaucer wrote <i>A Treatise on the Astrolabe</i> about 1391 for his little son Lewis, in plain English, \"for Latin ne canst thou yit but small\". It is one of the oldest books on a scientific instrument written in English.</p>" +
"<p><b>The orrery</b> is a clockwork Solar System. George Graham and Thomas Tompion built the first of the modern kind about 1704; John Rowley made a copy for Charles Boyle, the fourth Earl of Orrery, and the name stuck.</p>";
if (into) {
into.innerHTML = h;
return;
}
otmPanel("📜 A treatise on the astrolabe", "what the instruments in this hall are", h);
},
function () {
var P = otmPlanetsAt(Date.now()), el = P.moon.el, c = otmCfg().wix || {}, set = c.today && String(c.today).trim(), w = set ? String(c.today).trim() : otmMirrorMine();
var bd = otmPanel("🪞 The Obsidian Mirror", "your mystical source of daily inspiration", "<style>.omr{margin:0 auto;width:min(300px,78vw);aspect-ratio:3/4.4;border-radius:50%;border:7px solid #C8CCE0;box-shadow:0 0 30px rgba(140,120,255,.35),inset 0 0 60px rgba(0,0,0,.95);" +
"background:radial-gradient(ellipse at 38% 30%,#2A2448,#07050B 70%);display:flex;align-items:center;justify-content:center;padding:30px;position:relative;overflow:hidden}" +
".omr .w{font:italic 21px/1.5 Georgia,serif;background:linear-gradient(90deg,#ff6a6a,#ffb06a,#fff08a,#8aff9a,#8ab0ff,#b08aff,#e08aff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;opacity:0;transition:opacity 3s ease-in}" +
".omr .w.up{opacity:1}.omr .st{position:absolute;color:#FFF6C8;font-size:18px;opacity:0;pointer-events:none;animation:omrs 2.6s ease-out forwards}" +
"@keyframes omrs{0%{opacity:0;transform:scale(.3)}30%{opacity:.9}100%{opacity:0;transform:scale(1.6) translateY(-20px)}}</style>" +
"<div style='text-align:center;padding:10px 0'><div class='omr'><div class='w'>" + (w ? otmEsc(w) : "") + "</div></div>" +
"<div class='act' style='margin-top:12px'></div>" +
"<p style='margin-top:10px'>" + new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }) + " · " + otmPhaseEmoji(el) + " " + otmPhaseName(el) + " · the Moon in " + OTM_SIGNS[Math.floor(P.moon.gl / 30)] + "</p>" +
"<p class='note fine'></p></div>");
var mr = otmQ(bd, ".omr"), tx = otmQ(bd, ".w"), act = otmQ(bd, ".act"), fine = otmQ(bd, ".fine");
function stars() { for (var i = 0; i < 7; i++) {
var e = document.createElement("span");
e.className = "st";
e.textContent = "✦";
e.style.left = (15 + Math.random() * 70) + "%";
e.style.top = (15 + Math.random() * 70) + "%";
e.style.animationDelay = (i * 0.25) + "s";
mr.appendChild(e);
} }
function show() {
if (w) {
setTimeout(function () { tx.classList.add("up"); }, 60);
act.innerHTML = "";
fine.textContent = set ? "The Keeper has set today's word for every dreamer." : "The mirror has spoken for today. Return tomorrow for a new reflection.";
}
else {
tx.textContent = "Consult the Obsidian Moon…";
tx.classList.add("up");
act.innerHTML = "<button class='b'>✦ Seek reflection</button>";
fine.textContent = "One reflection a day. Hold your question in mind, then seek.";
otmQ(act, "button").onclick = function () {
var L = otmMirrorLines();
w = L[Math.floor(Math.random() * L.length)];
var p = otmProg();
p.mirror = { day: otmDay(), w: w };
otmProgSave();
tx.classList.remove("up");
act.innerHTML = "";
stars();
setTimeout(function () { tx.textContent = w; show(); }, 1400);
};
}
if (otmKeeper() && !set && otmMirrorMine()) {
var k = document.createElement("button");
k.className = "b";
k.textContent = "Keeper: let me seek again";
k.onclick = function () { var p = otmProg(); delete p.mirror; otmProgSave(); otmMirrorOpen(); };
act.appendChild(k);
}
}
show();
return bd;
},
function () {
var d = [];
OTM_MAJOR.forEach(function (m, i) { d.push({ n: OTM_RN[i], t: m[0], i: m[1], up: m[2], rv: m[3], maj: 1 }); });
OTM_SUITS.forEach(function (s) { OTM_RANKS.forEach(function (r) { d.push({ n: r[0], t: r[0] + " of " + s[0], i: s[1], up: r[1] + ", in the suit of " + s[2], rv: r[1] + ", blocked or turned inward; " + s[0].toLowerCase() + " held back" }); }); });
return d;
},
function (lines, chg) {
return "<div style='display:inline-flex;flex-direction:column-reverse;gap:6px;margin:6px 14px 6px 0;vertical-align:top'>" + lines.map(function (l, i) {
var bar = l ? "<div style='width:120px;height:12px;background:#E8D8A0'></div>" : "<div style='display:flex;gap:20px'><div style='width:50px;height:12px;background:#E8D8A0'></div><div style='width:50px;height:12px;background:#E8D8A0'></div></div>";
return "<div style='display:flex;align-items:center;gap:8px'>" + bar + "<span style='width:16px;color:#FF9A6A'>" + (chg && chg[i] ? (l ? "○" : "✕") : "") + "</span></div>";
}).join("") + "</div>";
},
function (h) { var H = OTM_HEX[h.n - 1]; return "<div style='display:inline-block;vertical-align:top;max-width:360px'><div style='font-size:18px;color:#F0D890'>" + h.n + ". " + otmEsc(H[0]) + "</div><div class='note'>" + otmEsc(H[1]) + " · " + OTM_TRI[h.up][0] + " " + OTM_TRI[h.up][1] + " over " + OTM_TRI[h.lo][0] + " " + OTM_TRI[h.lo][1] + "</div><p>" + otmEsc(H[2]) + ".</p></div>"; },
function (D) {
var maj = D.filter(function (d) { return d.c.maj; }), rv = D.filter(function (d) { return d.rv; }).length, n = D.length, L = [];
if (!maj.length)
L.push("<b>Domain of Daily Will:</b> No Major Arcana appeared. This working centers on immediate choices, habits, and practical circumstances rather than unyielding fate.");
else if (maj.length === n)
L.push("<b>Architects of Fate:</b> Every card drawn belongs to the Major Arcana. Deep, structural shifts are underway; human will must align with higher necessity.");
else
L.push("<b>Fated Currents:</b> " + maj.length + " of " + n + " cards are Major Arcana (" + maj.map(function (d) { return otmEsc(d.c.t); }).join(", ") + "), so larger shifts anchor this situation.");
var el = {};
D.forEach(function (d) { if (!d.c.maj) {
var su = d.c.t.split(" of ")[1];
el[su] = (el[su] || 0) + 1;
} });
var top = Object.keys(el).sort(function (a, b) { return el[b] - el[a]; })[0];
if (top && el[top] > 1)
L.push("<b>Elemental Weight:</b> Dominated by <b>" + OTM_FG_EL[top][0] + "</b>: the focus lies in " + OTM_FG_EL[top][1] + ".");
if (!rv)
L.push("<b>Unimpeded Flow:</b> Every card fell upright; the energies move forward without inner blockage.");
else if (rv === n)
L.push("<b>The Inverted Mirror:</b> Every card fell reversed. Strong inner resistance or something held down rules this moment.");
else if (rv / n >= 0.5)
L.push("<b>Internalized Friction:</b> " + rv + " of " + n + " cards are reversed: much of this conflict is happening inside, or behind closed doors.");
return L.join("<br><br>");
},
function (D) {
var L = [], ac = [0, 0, 0];
D.forEach(function (d) { if (d.i < 24)
OTM_FG_AETTS.forEach(function (a, k) { if (d.i >= a[1] && d.i <= a[2])
ac[k]++; }); });
var mx = Math.max.apply(null, ac), top = ac.indexOf(mx);
if (mx > 1)
L.push("<b>Cosmological Focus:</b> Dominated by <b>" + OTM_FG_AETTS[top][0] + "</b>: this casting centers on " + OTM_FG_AETTS[top][3] + ".");
var rv = D.filter(function (d) { return d.rv; }).length;
if (!rv)
L.push("<b>Direct Alignment:</b> All staves fell upright; the forces move plainly into the open.");
else if (rv / D.length >= 0.5)
L.push("<b>Inverted Forces:</b> " + rv + " of " + D.length + " staves fell reversed: inner strain, blocked flow, or lessons to sit with before acting.");
if (D.some(function (d) { return d.i === 24; }))
L.push("<b>The Mark of Wyrd:</b> The Blank Rune has entered the working. Part of this outcome is deliberately unwritten, held in trust.");
return L.join("<br><br>");
},
function (cv) {
var c = cv.getContext("2d"), S = cv.width, cx = S / 2, cy = S / 2, rO = S * 0.46, sq = rO / Math.SQRT2, rI = sq, rS = rI * 0.62;
c.clearRect(0, 0, S, S);
var g = c.createRadialGradient(cx, cy, 0, cx, cy, rO * 1.3);
g.addColorStop(0, "rgba(224,184,89,.30)");
g.addColorStop(0.6, "rgba(92,26,43,.14)");
g.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = "#0C0910";
c.fillRect(0, 0, S, S);
c.fillStyle = g;
c.fillRect(0, 0, S, S);
c.strokeStyle = "rgba(184,146,63,.5)";
c.lineWidth = 1;
OTM_FG_RAYS.forEach(function (r) { var a = r[1] * Math.PI / 180; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * S * 0.62, cy + Math.sin(a) * S * 0.62); c.stroke(); });
function ring(r, col, w) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke(); }
ring(rO, "#3a0f1c", 3);
ring(rO, "rgba(184,146,63,.75)", 1);
c.beginPath();
c.moveTo(cx, cy - sq * Math.SQRT2);
c.lineTo(cx + sq * Math.SQRT2, cy);
c.lineTo(cx, cy + sq * Math.SQRT2);
c.lineTo(cx - sq * Math.SQRT2, cy);
c.closePath();
c.strokeStyle = "#7a2436";
c.lineWidth = 2.5;
c.stroke();
c.strokeStyle = "rgba(224,184,89,.7)";
c.lineWidth = 0.75;
c.stroke();
ring(rI, "#352243", 2);
c.beginPath();
for (var i = 0; i < 16; i++) {
var a = Math.PI / 8 * i - Math.PI / 2, r = i % 2 === 0 ? rS : rS * 0.34;
c[i ? "lineTo" : "moveTo"](cx + r * Math.cos(a), cy + r * Math.sin(a));
}
c.closePath();
c.fillStyle = "rgba(122,36,54,.35)";
c.fill();
c.strokeStyle = "#e0b859";
c.lineWidth = 1.2;
c.stroke();
c.fillStyle = "rgba(240,216,144,.85)";
c.font = Math.round(S * 0.028) + "px Georgia,serif";
c.textAlign = "center";
c.textBaseline = "middle";
OTM_FG_RAYS.forEach(function (r) { var a = r[1] * Math.PI / 180, k = Math.cos(a); c.textAlign = k > 0.3 ? "right" : k < -0.3 ? "left" : "center"; c.fillText(r[2], k > 0.3 ? S - 6 : k < -0.3 ? 6 : cx + k * S * 0.47, cy + Math.sin(a) * S * 0.475 + (Math.sin(a) > 0.5 ? 6 : Math.sin(a) < -0.5 ? -6 : 0)); });
c.textAlign = "center";
},
function (tab) {
tab = tab || "tarot";
var bd = otmPanel("🔮 The Fatal Grace", "the Divination Parlour · the cards, the bones, or the stones cast upon the Grace", otmTabs([["tarot", "🃏 The Tarot Table"], ["runes", "ᚱ The Rune Bag"], ["stones", "◈ The Lithomancy Table"], ["iching", "☯ I Ching"], ["pendulum", "🔮 Pendulum"], ["past", "📜 Journal"]], tab) + "<div class='pg'></div>");
otmTabsWire(bd, function (t) { otmDivineOpen(t); });
var pg = otmQ(bd, ".pg");
function synBox(html) { return "<div style='margin-top:10px;padding:10px 12px;border:1px solid rgba(184,146,58,.45);border-radius:8px;background:rgba(92,26,43,.18)'><div style='font:600 15px Georgia,serif;color:#F0D890;margin-bottom:6px'>✦ The synthesis</div>" + html + "</div>"; }
if (tab === "tarot") {
var SP = { one: ["One card", [["The Present Focal Point", "The central truth of this moment."]]], three: ["Past · Present · Future", OTM_FG_THREE], cross: ["The Celtic Cross", OTM_FG_CROSS] };
pg.innerHTML = "<p>Three tables, one working. Hold your question in your mind, choose a spread, and the deck is shuffled for you.</p><div>" + Object.keys(SP).map(function (k) { return "<button class='b' data-sp='" + k + "'>" + SP[k][0] + "</button>"; }).join("") +
"</div><label style='display:block;margin:6px 0'><input type='checkbox' class='rv' checked> Cards may fall reversed</label><div class='out'></div>" +
"<p class='note'>The seventy-eight cards of the deck A. E. Waite and Pamela Colman Smith published in 1909. The cards are a mirror for thinking, not a fate.</p>";
pg.querySelectorAll("[data-sp]").forEach(function (b) {
b.onclick = function () {
var S = SP[b.getAttribute("data-sp")], deck = otmShuffle(otmDeck()), rvOk = otmQ(pg, ".rv").checked, out = otmQ(pg, ".out");
var D = S[1].map(function (pos, i) { return { c: deck[i], rv: rvOk && Math.random() < 0.32, pos: pos }; });
out.innerHTML = "<div style='text-align:center'>" + D.map(function (x, i) { return "<span data-i='" + i + "'><div style='display:inline-block;text-align:center'><div class='card back'></div><div class='pos'>" + otmEsc(x.pos[0]) + "</div></div></span>"; }).join("") + "</div><div class='mean'></div>";
D.forEach(function (x, i) { setTimeout(function () { var sp = out.querySelector("[data-i='" + i + "']"); if (sp)
sp.innerHTML = otmCardHtml(x.c, x.pos[0], x.rv); }, 500 + i * 400); });
var syn = otmFgTarotSyn(D);
setTimeout(function () { var m = out.querySelector(".mean"); if (m)
m.innerHTML = "<table>" + D.map(function (x) { return "<tr><td style='min-width:130px'><b>" + otmEsc(x.pos[0]) + "</b><br><span class='note'>" + otmEsc(x.pos[1]) + "</span></td><td>" + otmEsc(x.c.t) + (x.rv ? " (reversed)" : "") + ": " + otmEsc(x.rv ? x.c.rv : x.c.up) + "</td></tr>"; }).join("") + "</table>" + synBox(syn); }, 700 + D.length * 400);
otmReadingSave("Tarot, " + S[0], D.map(function (x) { return x.pos[0] + ": " + x.c.t + (x.rv ? " (reversed)" : ""); }).join("; "), syn);
};
});
}
else if (tab === "runes") {
pg.innerHTML = "<p>Twenty-four staves of the Elder Futhark lie in the bag. Cast one, three, or five.</p><button class='b' data-n='1'>The focal stave</button><button class='b' data-n='3'>Three staves</button><button class='b' data-n='5'>The five-stave reading</button>" +
"<label style='display:block;margin:6px 0'><input type='checkbox' class='bl'> Put the Blank Rune (Wyrd) in the bag</label><div class='out'></div>" +
"<p class='note'>The names come from the old rune poems of England, Norway and Iceland. Tacitus, writing in AD 98, tells how the Germans cut slips from a branch, marked them, and cast them on a white cloth to read.</p>";
pg.querySelectorAll("[data-n]").forEach(function (b) {
b.onclick = function () {
var n = +b.getAttribute("data-n"), pool = OTM_FG_RUNES.map(function (r, i) { return i; });
if (otmQ(pg, ".bl").checked)
pool.push(24);
var pos = n === 1 ? [["The Focal Stave", "The core primal force in play."]] : n === 3 ? OTM_FG_R3 : OTM_FG_R5, out = otmQ(pg, ".out");
var D = otmShuffle(pool).slice(0, n).map(function (i) { return { i: i, r: i === 24 ? OTM_FG_BLANK : OTM_FG_RUNES[i], rv: i !== 24 && Math.random() < 0.32 }; });
out.innerHTML = "<div style='text-align:center'>" + D.map(function (d, k) { return "<div style='display:inline-block;text-align:center;margin:8px;opacity:0;transition:opacity .6s ease " + (k * 0.35) + "s' class='rt'><div style='width:78px;height:104px;border-radius:40% 40% 36% 36%;background:linear-gradient(160deg,#D8C8A0,#9A8A6A);color:#3A1A0A;font:56px/104px serif;box-shadow:0 2px 8px rgba(0,0,0,.6);" + (d.rv ? "transform:rotate(180deg)" : "") + "'>" + d.r[0] + "</div><div class='pos'>" + otmEsc(pos[k][0]) + "</div></div>"; }).join("") + "</div>" +
"<table>" + D.map(function (d, k) { return "<tr><td style='min-width:130px'><b>" + otmEsc(pos[k][0]) + "</b><br><span class='note'>" + otmEsc(pos[k][1]) + "</span></td><td>" + d.r[0] + " <b>" + otmEsc(d.r[1]) + "</b>" + (d.rv ? " (reversed)" : "") + ": " + otmEsc(d.rv ? d.r[3] : d.r[2]) + "</td></tr>"; }).join("") + "</table>" + synBox(otmFgRuneSyn(D) || "The staves speak plainly; read each in its place.");
setTimeout(function () { out.querySelectorAll(".rt").forEach(function (e) { e.style.opacity = 1; }); }, 40);
otmReadingSave("Runes, " + n + (n === 1 ? " stave" : " staves"), D.map(function (d, k) { return pos[k][0] + ": " + d.r[1] + (d.rv ? " (reversed)" : ""); }).join("; "), otmFgRuneSyn(D));
};
});
}
else if (tab === "stones") {
var cnt = OTM.fgN || 5, mat = OTM.fgMat || "riverstone";
pg.innerHTML = "<p>Cast stones onto the Fatal Grace and read where they fall: how near the star they come, and which ray draws them.</p>" +
"<div>" + [3, 5, 7].map(function (n) { return "<button class='b" + (cnt === n ? " on" : "") + "' data-cn='" + n + "'>" + n + " pieces</button>"; }).join("") + "</div><div>" + Object.keys(OTM_FG_MATS).map(function (k) { return "<button class='b" + (mat === k ? " on" : "") + "' data-mt='" + k + "'><span style='color:" + OTM_FG_MATS[k][1] + "'>●</span> " + OTM_FG_MATS[k][0] + "</button>"; }).join("") + "</div>" +
"<div class='stg' style='position:relative;width:min(420px,86vw);margin:8px auto'><canvas width='640' height='640' style='width:100%;display:block;border-radius:10px'></canvas></div><div style='text-align:center'><button class='b cast'>◈ Cast upon the Grace</button></div><div class='out'></div>";
var stg = otmQ(pg, ".stg"), cv = otmQ(pg, "canvas");
otmGraceDraw(cv);
pg.querySelectorAll("[data-cn]").forEach(function (b) { b.onclick = function () { OTM.fgN = +b.getAttribute("data-cn"); otmDivineOpen("stones"); }; });
pg.querySelectorAll("[data-mt]").forEach(function (b) { b.onclick = function () { OTM.fgMat = b.getAttribute("data-mt"); otmDivineOpen("stones"); }; });
otmQ(pg, ".cast").onclick = function () {
stg.querySelectorAll(".pc").forEach(function (e) { e.remove(); });
var M = OTM_FG_MATS[mat], R = [];
for (var i = 0; i < cnt; i++) {
var an = Math.random() * Math.PI * 2, rf = Math.random() * 0.64, z = OTM_FG_ZONES.filter(function (q) { return q[2] >= rf; })[0], ray = otmFgNearRay(an * 180 / Math.PI);
R.push({ z: z, ray: ray });
var e = document.createElement("div");
e.className = "pc";
e.style.cssText = "position:absolute;left:" + (50 + rf * 100 * Math.cos(an)) + "%;top:" + (50 + rf * 100 * Math.sin(an)) + "%;width:" + (mat === "bone" ? 26 : 16) + "px;height:" + (mat === "bone" ? 10 : 13) + "px;margin:-6px 0 0 -8px;border-radius:" + (mat === "bone" ? "5px" : "50% 45% 50% 40%") + ";background:radial-gradient(circle at 35% 30%," + M[1] + "," + M[2] + ");box-shadow:0 2px 4px rgba(0,0,0,.7);transform:scale(2.4) rotate(" + Math.round(Math.random() * 360) + "deg);opacity:0;transition:transform .5s ease-out " + (i * 0.12) + "s,opacity .4s ease " + (i * 0.12) + "s";
stg.appendChild(e);
(function (e) { setTimeout(function () { e.style.opacity = 1; e.style.transform = e.style.transform.replace("scale(2.4)", "scale(1)"); }, 30); })(e);
}
var zc = {}, rc = {};
R.forEach(function (r) { zc[r.z[0]] = (zc[r.z[0]] || 0) + 1; rc[r.ray[0]] = (rc[r.ray[0]] || 0) + 1; });
var tz = Object.keys(zc).sort(function (a, b) { return zc[b] - zc[a]; })[0], TZ = OTM_FG_ZONES.filter(function (q) { return q[0] === tz; })[0];
var tr = Object.keys(rc).sort(function (a, b) { return rc[b] - rc[a]; })[0], TR = OTM_FG_RAYS.filter(function (q) { return q[0] === tr; })[0];
var syn = "<b>Primary Gravitation:</b> Most pieces gathered within <b>" + TZ[1] + "</b>: this working centers on " + TZ[3] + ".<br><br><b>Directional Pull:</b> The pull toward <b>" + TR[0] + " (" + TR[2] + ")</b> is strongest; read this cast through " + TR[3] + "." +
(zc.beyond ? "<br><br><b>Wild Elements:</b> " + zc.beyond + " piece" + (zc.beyond > 1 ? "s" : "") + " landed outside the Grace entirely: factors that refuse to be bound by what you expect." : "");
setTimeout(function () { otmQ(pg, ".out").innerHTML = "<table>" + R.map(function (r, i) { return "<tr><td style='white-space:nowrap'><b>Piece " + (i + 1) + "</b><br><span class='note'>" + otmEsc(r.z[1]) + " · " + otmEsc(r.ray[2]) + "</span></td><td>" + otmEsc(r.z[4]) + " Drawn toward the " + otmEsc(r.ray[0]) + ", " + otmEsc(r.ray[2]) + ": " + otmEsc(r.ray[3]) + ".</td></tr>"; }).join("") + "</table>" + synBox(syn); }, 500 + cnt * 120);
otmReadingSave("Stones on the Grace (" + M[0].toLowerCase() + ")", R.map(function (r, i) { return "Piece " + (i + 1) + ": " + r.z[1] + ", " + r.ray[2]; }).join("; "), syn);
};
}
else if (tab === "iching") {
var lines = [], chg = [];
pg.innerHTML = "<p>Three bronze coins, thrown six times. Each throw makes one line of the hexagram, from the bottom up: heads count three, tails two.</p><button class='b th'>Throw the coins</button><button class='b all'>Throw all six</button><div class='coins' style='font-size:26px;min-height:34px'></div><div class='out'></div>" +
"<p class='note'>The <i>Book of Changes</i>, one of the oldest books of China, read by Confucius and by every scholar since. The names here follow the classic translations (James Legge, 1882). A changing line (✕ or ○) turns into its opposite, and the second hexagram shows where things are going.</p>";
var out = otmQ(pg, ".out"), co = otmQ(pg, ".coins");
function draw() {
var h = otmHexOf(lines.concat([0, 0, 0, 0, 0, 0]).slice(0, 6));
out.innerHTML = otmHexHtml(lines, chg) + (lines.length < 6 ? "<p class='note'>" + (6 - lines.length) + " more to throw.</p>" : "");
if (lines.length === 6) {
h = otmHexOf(lines);
var s = otmHexHtml(lines, chg) + otmHexInfo(h), any = chg.some(Boolean);
if (any) {
var l2 = lines.map(function (l, i) { return chg[i] ? 1 - l : l; }), h2 = otmHexOf(l2);
s += "<div style='margin-top:10px;border-top:1px solid rgba(184,146,58,.3);padding-top:8px'><div class='note'>changing into</div>" + otmHexHtml(l2, null) + otmHexInfo(h2) + "</div>";
}
out.innerHTML = s;
otmQ(pg, ".th").disabled = true;
otmQ(pg, ".all").disabled = true;
otmReadingSave("I Ching", h.n + ". " + OTM_HEX[h.n - 1][0] + (any ? " changing into " + otmHexOf(lines.map(function (l, i) { return chg[i] ? 1 - l : l; })).n + ". " + OTM_HEX[otmHexOf(lines.map(function (l, i) { return chg[i] ? 1 - l : l; })).n - 1][0] : ""));
}
}
function one() {
if (lines.length >= 6)
return;
var c = [0, 0, 0].map(function () { return Math.random() < 0.5 ? 3 : 2; }), s = c[0] + c[1] + c[2];
co.textContent = c.map(function (v) { return v === 3 ? "🟡" : "🟤"; }).join(" ") + "  = " + s + (s === 6 ? " old yin, changing" : s === 7 ? " young yang" : s === 8 ? " young yin" : " old yang, changing");
lines.push(s === 7 || s === 9 ? 1 : 0);
chg.push(s === 6 || s === 9);
draw();
}
otmQ(pg, ".th").onclick = one;
otmQ(pg, ".all").onclick = function () { var k = 0; (function step() { if (lines.length >= 6 || k++ > 6)
return; one(); setTimeout(step, 450); })(); };
}
else if (tab === "pendulum") {
pg.innerHTML = "<p>Ask a question that can be answered yes or no. Hold the chain still, and let the crystal answer.</p><input class='q' maxlength='140' placeholder='Your question (only you see it)' style='width:100%'><div style='margin:8px 0'><button class='b ask'>Let it swing</button></div>" +
"<div style='height:190px;position:relative;overflow:hidden'><div class='pd' style='position:absolute;left:50%;top:0;width:2px;height:150px;background:#D8DCF0;transform-origin:top center;transition:transform 1.6s ease-in-out'><div style='position:absolute;bottom:-26px;left:-12px;width:26px;height:34px;background:linear-gradient(#C8A0FF,#6A3AA8);clip-path:polygon(50% 100%,0 30%,50% 0,100% 30%)'></div></div></div><div class='ans' style='font-size:22px;text-align:center;color:#F0D890;min-height:30px'></div>";
var pd = otmQ(pg, ".pd"), ans = otmQ(pg, ".ans");
otmQ(pg, ".ask").onclick = function () {
var A = otmPick(["Yes", "Yes", "Yes", "No", "No", "No", "Not yet", "Ask again another way", "The answer is already in you"]);
ans.textContent = "";
var n = 0;
var iv = setInterval(function () { n++; pd.style.transform = "rotate(" + (n % 2 ? 18 : -18) + "deg)"; if (n > 4) {
clearInterval(iv);
pd.style.transform = A === "Yes" ? "rotate(0deg)" : A === "No" ? "rotate(14deg)" : "rotate(-6deg)";
setTimeout(function () { ans.textContent = A; }, 900);
} }, 1100);
OTM.pendAmp = 0.3;
setTimeout(function () { OTM.pendAmp = 0.08; }, 6000);
otmReadingSave("Pendulum", (otmQ(pg, ".q").value || "a question") + ": " + A);
};
}
else {
var R = (otmProg().readings || []);
pg.innerHTML = R.length ? "<div style='margin-bottom:8px'><button class='b dl'>⬇ Save my journal as a file</button><button class='b clr'>Clear the journal</button></div>" + R.map(function (r, i) { return "<div style='border-top:1px solid rgba(184,146,58,.3);padding:8px 0'><div class='note'>" + new Date(r.t).toLocaleString() + "</div><b>" + otmEsc(r.k) + "</b><br>" + otmEsc(r.x) + (r.s ? "<div class='note' style='margin-top:4px'>" + otmEsc(r.s) + "</div>" : "") + "<div><button class='b' data-del='" + i + "' style='font-size:12px;padding:3px 8px'>Remove</button></div></div>"; }).join("") +
"<p class='note'>Your last forty readings, kept on this device only.</p>" : "<p>No readings yet. Lay the cards, cast the runes or the stones, throw the coins, or ask the pendulum, and each one is written here.</p>";
pg.querySelectorAll("[data-del]").forEach(function (b) { b.onclick = function () { var p = otmProg(); p.readings.splice(+b.getAttribute("data-del"), 1); otmProgSave(); otmDivineOpen("past"); }; });
var cl = otmQ(pg, ".clr");
if (cl)
cl.onclick = function () { if (cl.textContent !== "Press again to clear everything") {
cl.textContent = "Press again to clear everything";
return;
} var p = otmProg(); p.readings = []; otmProgSave(); otmDivineOpen("past"); };
var dl = otmQ(pg, ".dl");
if (dl)
dl.onclick = function () {
var t = "The Fatal Grace: my divination journal\n\n" + R.map(function (r) { return new Date(r.t).toLocaleString() + "\n" + r.k + "\n" + r.x + (r.s ? "\n" + r.s : ""); }).join("\n\n");
var a = document.createElement("a");
a.href = URL.createObjectURL(new Blob([t], { type: "text/plain" }));
a.download = "fatal-grace-journal.txt";
document.body.appendChild(a);
a.click();
a.remove();
};
}
},
function (cv, C) {
var c = cv.getContext("2d");
c.fillStyle = "#0E1050";
c.fillRect(0, 0, cv.width, cv.height);
for (var i = 0; i < 60; i++) {
c.fillStyle = "rgba(255,255,255,.35)";
c.fillRect((i * 53) % cv.width, (i * 37) % cv.height, 1, 1);
}
c.strokeStyle = "#8AF0FF";
c.lineWidth = 2;
C.e.forEach(function (e) { c.beginPath(); c.moveTo(C.s[e[0]][0], C.s[e[0]][1]); c.lineTo(C.s[e[1]][0], C.s[e[1]][1]); c.stroke(); });
c.fillStyle = "#FFE84A";
C.s.forEach(function (p) { c.beginPath(); c.arc(p[0], p[1], 4.5, 0, 6.3); c.fill(); });
},
function (tab) {
tab = tab || "moon";
var bd = otmPanel("🌙 The Little Moons' Room", "the Kid Zone of the Temple · games for little moons", otmTabs([["moon", "🌙 Moon puzzle"], ["stars", "⭐ Star stories"], ["wish", "🏮 Wish lanterns"]], tab) + "<div class='pg'></div>");
OTM.panel.querySelector(".otp").style.background = "linear-gradient(160deg,#2A1A7A,#14106A 60%,#2A0E5A)";
otmTabsWire(bd, function (t) { otmKidsOpen(t); });
var pg = otmQ(bd, ".pg"), p = otmProg();
if (tab === "moon") {
var order = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"], names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"], got = 0;
pg.innerHTML = "<p style='font-size:17px'>The Moon changes her shape every night! Tap her faces <b>in order</b>, starting with the dark <b>New Moon</b> 🌑.</p><div class='row grid' style='min-height:70px;margin:8px 0;padding:6px;border:2px dashed #FFE84A;border-radius:10px'></div><div class='pile grid'></div><p class='msg' style='font-size:17px;color:#FFE84A;min-height:26px'></p><p class='note'>You have finished the puzzle " + (p.kidMoon || 0) + " time" + ((p.kidMoon || 0) === 1 ? "" : "s") + ".</p>";
var row = otmQ(pg, ".row"), pile = otmQ(pg, ".pile"), msg = otmQ(pg, ".msg");
otmShuffle(order).forEach(function (e) {
var t = document.createElement("div");
t.className = "tile kid";
t.textContent = e;
t.onclick = function () {
if (e === order[got]) {
got++;
row.appendChild(t);
t.onclick = null;
t.title = names[got - 1];
msg.textContent = names[got - 1] + "!";
if (got === 8) {
p.kidMoon = (p.kidMoon || 0) + 1;
otmProgSave();
msg.innerHTML = "🎉 Well done! That is the whole moon month: about 29 and a half days.";
}
}
else {
msg.textContent = "Not that one yet. Which comes after " + (got ? names[got - 1] : "the start") + "?";
}
};
pile.appendChild(t);
});
}
else if (tab === "stars") {
var k = +(OTM.kidStar || 0) % OTM_STARS.length, C = OTM_STARS[k];
pg.innerHTML = "<div style='display:flex;flex-wrap:wrap;gap:12px'><canvas width='220' height='150' style='border-radius:10px;border:2px solid #FFE84A;max-width:100%'></canvas><div style='flex:1;min-width:220px'><div style='font-size:22px;color:#FFE84A'>" + C.i + " " + otmEsc(C.n) + "</div><p style='font-size:16px'>" + otmEsc(C.t) + "</p><p>✨ <b>Did you know?</b> " + otmEsc(C.f) + "</p></div></div>" +
"<div><button class='b nx'>Next star picture ▶</button><button class='b qz'>Quiz time!</button></div><div class='quiz'></div>";
otmStarCanvas(otmQ(pg, "canvas"), C);
otmQ(pg, ".nx").onclick = function () { OTM.kidStar = k + 1; otmKidsOpen("stars"); };
otmQ(pg, ".qz").onclick = function () {
var A = otmPick(OTM_STARS), opts = otmShuffle([A].concat(otmShuffle(OTM_STARS.filter(function (x) { return x !== A; })).slice(0, 2))), qz = otmQ(pg, ".quiz");
qz.innerHTML = "<p style='font-size:16px'>Which star picture is this?</p><canvas width='220' height='150' style='border-radius:10px;border:2px solid #8AF0FF;max-width:100%'></canvas><div>" + opts.map(function (o, i) { return "<button class='b' data-o='" + i + "'>" + o.i + " " + otmEsc(o.n) + "</button>"; }).join("") + "</div><p class='r' style='font-size:17px;color:#FFE84A'></p>";
otmStarCanvas(otmQ(qz, "canvas"), A);
qz.querySelectorAll("[data-o]").forEach(function (b) { b.onclick = function () { var o = opts[+b.getAttribute("data-o")]; otmQ(qz, ".r").textContent = o === A ? "⭐ Yes! You know your stars!" : "Good try! It is " + A.n + "."; }; });
};
}
else {
pg.innerHTML = "<p style='font-size:17px'>Write a wish on a paper lantern, and let it float up to the stars on the ceiling. Your wish stays a secret: it is kept only on this device.</p><input class='w' maxlength='80' placeholder='My wish is…' style='width:100%;font-size:17px'><div style='margin:8px 0'><button class='b go'>🏮 Let the lantern go</button></div><p class='msg' style='font-size:17px;color:#FFE84A'></p><p class='note'>You have let " + (p.kidWish || 0) + " lantern" + ((p.kidWish || 0) === 1 ? "" : "s") + " go.</p>";
otmQ(pg, ".go").onclick = function () {
var w = (otmQ(pg, ".w").value || "").trim();
p.kidWish = (p.kidWish || 0) + 1;
if (w) {
p.wishes = (p.wishes || []);
p.wishes.unshift(w.slice(0, 80));
p.wishes = p.wishes.slice(0, 10);
}
otmProgSave();
otmKidLantern();
otmQ(pg, ".msg").textContent = "Up it goes! Close this and look up to watch your lantern rise.";
otmQ(pg, ".w").value = "";
};
}
},
function (tab) {
tab = tab || "brew";
var bd = otmPanel("⚗️ The Potion Game", "the Apothecary · gather, study, prepare, and brew", otmTabs([["brew", "⚗️ The bench"], ["book", "📖 The grimoire"], ["materia", "🔍 Materia Magica"]], tab) + "<div class='pg'></div>");
otmTabsWire(bd, function (t) { otmPotionOpen(t); });
var pg = otmQ(bd, ".pg"), A = otmPot(), B = otmBench(), hx = function (c) { return c; };
if (tab === "book") {
var lv = OTM.potLv || otmPotTop();
pg.innerHTML = "<div class='tabs'>" + OTM_LEVELS.map(function (n, i) {
var open = A.unl.indexOf(i + 1) >= 0, k = OTM_RECIPES.filter(function (r) { return r[1] === i + 1; }), d = k.filter(function (r) { return A.done.indexOf(r[0]) >= 0; }).length;
return "<button class='b" + (lv === i + 1 ? " on" : "") + "' data-lv='" + (i + 1) + "'" + (open ? "" : " disabled") + ">" + (open ? "" : "🔒 ") + otmEsc(n) + " (" + d + "/" + k.length + ")</button>";
}).join("") + "</div>" +
OTM_RECIPES.filter(function (r) { return r[1] === lv; }).map(function (r) {
var done = A.done.indexOf(r[0]) >= 0;
return "<div style='border-top:1px solid rgba(184,146,58,.3);padding:8px 0'><div style='font:600 17px Georgia,serif;color:" + hx(r[8]) + "'>" + (done ? "✦ " : "") + otmEsc(r[2]) + "</div><p style='margin:4px 0'><i>" + otmEsc(r[3]) + "</i></p>" +
"<p style='margin:4px 0'>" + otmEsc(r[9]) + "</p><div class='pl' data-p='" + r[0] + "' style='display:none;margin:4px 0;color:#F0D890'>" + otmEsc(r[10]) + "</div>" +
"<button class='b' data-tr='" + r[0] + "'>🔍 Translate the instructions</button><button class='b" + (B.rec === r[0] ? " on" : "") + "' data-set='" + r[0] + "'>" + (B.rec === r[0] ? "✓ The working recipe" : "Set as the working recipe") + "</button></div>";
}).join("") +
"<p class='note'>Brew every recipe of a level well to master it; that opens the next level, and new specimens to study.</p>";
pg.querySelectorAll("[data-lv]").forEach(function (b) { b.onclick = function () { OTM.potLv = +b.getAttribute("data-lv"); otmPotionOpen("book"); }; });
pg.querySelectorAll("[data-tr]").forEach(function (b) { b.onclick = function () { otmQ(pg, "[data-p='" + b.getAttribute("data-tr") + "']").style.display = ""; b.style.display = "none"; }; });
pg.querySelectorAll("[data-set]").forEach(function (b) { b.onclick = function () { var id = b.getAttribute("data-set"); B.rec = B.rec === id ? null : id; otmPotionOpen("book"); }; });
return;
}
if (tab === "materia") {
var top = otmPotTop();
pg.innerHTML = "<p>Every specimen the Apothecary keeps. What you know can be taken from the shelves; a specimen of a level you have opened can be studied here until you know it.</p>" +
"<table>" + OTM_INGS.map(function (g) {
var k = A.disc.indexOf(g[0]) >= 0, lv = otmIngLevel(g[0]), can = !k && lv <= top, S = OTM_STATIONS[g[4]];
return "<tr><td style='width:26px'><span style='display:inline-block;width:14px;height:20px;border-radius:3px 3px 5px 5px;background:" + (k ? g[3] : "#3A3440") + ";box-shadow:0 0 6px " + (k ? g[3] : "transparent") + "'></span></td><td>" +
(k ? "<b>" + otmEsc(g[1]) + "</b> <span class='note'>" + otmEsc(g[2].toLowerCase()) + (g[6] ? " · ⚠ handle with care" : "") + "</span><br>" + S[0] + " " + otmEsc(S[1]) + " · " + otmEsc(g[7]) + "<br><span class='note'>" + otmEsc(g[8]) + "</span>"
: can ? "<i>An unlabelled specimen</i> <span class='note'>(" + otmEsc(g[2].toLowerCase()) + ")</span><div class='sb' data-sb='" + g[0] + "' style='height:8px;border:1px solid #B8923A;border-radius:4px;margin:4px 0;overflow:hidden;display:none'><div style='height:100%;width:0;background:linear-gradient(90deg,#6A4AD8,#F0D890)'></div></div><button class='b' data-st='" + g[0] + "'>🔍 Study it</button>"
: "<span class='note'>🔒 A specimen for the " + otmEsc(OTM_LEVELS[lv - 1] || "") + " level</span>") + "</td></tr>";
}).join("") + "</table>";
pg.querySelectorAll("[data-st]").forEach(function (b) {
b.onclick = function () {
var id = b.getAttribute("data-st"), sb = otmQ(pg, "[data-sb='" + id + "']"), t0 = Date.now(), T = 4000;
b.disabled = true;
b.textContent = "studying…";
sb.style.display = "";
OTM.panelTick = function () {
var k = Math.min(1, (Date.now() - t0) / T);
sb.firstChild.style.width = Math.round(k * 100) + "%";
if (k < 1)
return;
OTM.panelTick = null;
if (A.disc.indexOf(id) < 0)
A.disc.push(id);
otmProgSave();
otmSay("🔍 You know <b>" + otmEsc(otmIng(id)[1]) + "</b> now: it can be taken from the Apothecary's shelves.");
otmPotionOpen("materia");
};
};
});
return;
}
var bag = otmSatchel(), R = B.rec && OTM_RECIPES.filter(function (r) { return r[0] === B.rec; })[0];
var held = Object.keys(bag).filter(function (id) { return bag[id] > 0 && otmIng(id); });
pg.innerHTML = "<div class='note' style='margin-bottom:6px'>" + (R ? "Working recipe: <b style='color:#F0D890'>" + otmEsc(R[2]) + "</b> · " + otmEsc(OTM_LEVELS[R[1] - 1]) : "No recipe set: free experiment") + " · <a href='#' class='bk' style='color:#C8B8F0'>open the grimoire</a></div>" +
"<div class='note'>From your satchel (tap one to take it to its station)</div><div class='grid bag' style='margin:4px 0 10px'></div>" +
"<div class='grid sts' style='margin-bottom:10px'></div>" +
"<div style='display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start'><div style='flex:1;min-width:220px'><div class='note'>In the cauldron, in order</div><div class='in' style='min-height:24px;margin:2px 0 8px'></div>" +
"<div class='note'>The ladle</div><div><button class='b' data-dir='cw'>↻ With the sun</button><button class='b' data-dir='ccw'>↺ Against the sun</button></div><div class='stir' style='margin:2px 0 8px'></div>" +
"<div class='note'>The flame <b class='hv'></b></div><input class='heat' type='range' min='0' max='10' step='1' style='width:100%'></div>" +
"<div style='min-width:180px'><button class='b go'>⚗️ Brew</button><button class='b clr'>Clear the bench</button><div class='bar' style='height:10px;border:1px solid #B8923A;border-radius:5px;margin:8px 0;overflow:hidden'><div style='height:100%;width:0;background:linear-gradient(90deg,#39FF14,#D000FF)'></div></div></div></div>" +
"<div class='out'></div><p class='note'>These are game potions, brewed in the dream: nothing here is a recipe to drink or make.</p>";
otmQ(pg, ".bk").onclick = function (e) { e.preventDefault(); otmPotionOpen("book"); };
function draw() {
bag = otmSatchel();
var bg = otmQ(pg, ".bag"), ids = Object.keys(bag).filter(function (id) { return bag[id] > 0 && otmIng(id); });
bg.innerHTML = ids.length ? ids.map(function (id) { var g = otmIng(id), S = OTM_STATIONS[g[4]]; return "<button class='b' data-g='" + id + "' title='" + otmEsc(S[1]) + "'><span style='color:" + g[3] + "'>●</span> " + otmEsc(g[1]) + " ×" + bag[id] + " <span class='note'>" + S[0] + "</span></button>"; }).join("")
: "<span class='note'>Your satchel is empty. Walk to the jar shelves round the walls and gather what you know.</span>";
otmQ(pg, ".sts").innerHTML = Object.keys(OTM_STATIONS).map(function (t) {
var S = OTM_STATIONS[t], c = B.st[t], g = c && otmIng(c.id), ready = c && c.n >= g[5];
return "<div style='width:150px;padding:6px;border:1px solid rgba(184,146,58,.45);border-radius:6px;background:rgba(184,146,58,.06);text-align:center'><div style='font-size:22px'>" + S[0] + "</div><div class='note'>" + otmEsc(S[1]) + "</div>" +
(c ? "<div style='margin:3px 0;color:" + g[3] + "'>" + otmEsc(g[1]) + "</div>" + (ready ? "<button class='b' data-add='" + t + "'>Into the cauldron</button>"
: t === "steep" ? "<div class='note'>steeping… " + Math.max(0, g[5] - c.n) + "s</div>" : "<button class='b' data-wk='" + t + "'>" + otmEsc(S[2]) + " (" + c.n + "/" + g[5] + ")</button>") + "<button class='b' data-back='" + t + "' style='font-size:12px;padding:3px 6px'>back to the satchel</button>"
: "<div class='note' style='margin-top:6px'>empty</div>") + "</div>";
}).join("");
otmQ(pg, ".in").innerHTML = B.pot.length ? B.pot.map(function (id, i) { var g = otmIng(id); return (i ? " → " : "") + "<span style='color:" + g[3] + "'>" + otmEsc(g[1]) + "</span>"; }).join("") : "<span class='note'>nothing yet</span>";
otmQ(pg, ".stir").textContent = B.dir ? B.turns + " turn" + (B.turns === 1 ? "" : "s") + " " + (B.dir === "cw" ? "with the sun" : "against the sun") : "not stirred";
otmQ(pg, ".hv").textContent = B.heat ? B.heat + " of 10" : "unlit";
otmQ(pg, ".heat").value = B.heat;
otmQ(pg, ".go").disabled = !B.pot.length || !!OTM.potBrew;
pg.querySelectorAll("[data-g]").forEach(function (b) {
b.onclick = function () {
var id = b.getAttribute("data-g"), g = otmIng(id), t = g[4];
if (B.st[t]) {
otmQ(pg, ".out").innerHTML = "<p>The " + otmEsc(OTM_STATIONS[t][1].toLowerCase()) + " is busy: finish or clear what is on it first.</p>";
return;
}
if (B.pot.length >= 6) {
otmQ(pg, ".out").innerHTML = "<p>The cauldron holds six things at most.</p>";
return;
}
var bb = otmSatchel();
if (!(bb[id] > 0))
return;
bb[id]--;
if (!bb[id])
delete bb[id];
otmSatchelPut(bb);
B.st[t] = { id: id, n: 0, t0: Date.now() };
draw();
};
});
pg.querySelectorAll("[data-wk]").forEach(function (b) { b.onclick = function () { var c = B.st[b.getAttribute("data-wk")]; c.n = Math.min(otmIng(c.id)[5], c.n + 1); draw(); }; });
pg.querySelectorAll("[data-add]").forEach(function (b) { b.onclick = function () { var t = b.getAttribute("data-add"); B.pot.push(B.st[t].id); delete B.st[t]; otmCauldronCol(parseInt(otmIng(B.pot[B.pot.length - 1])[3].slice(1), 16)); draw(); }; });
pg.querySelectorAll("[data-back]").forEach(function (b) { b.onclick = function () { var t = b.getAttribute("data-back"), bb = otmSatchel(); bb[B.st[t].id] = (bb[B.st[t].id] || 0) + 1; otmSatchelPut(bb); delete B.st[t]; draw(); }; });
}
pg.querySelectorAll("[data-dir]").forEach(function (b) { b.onclick = function () { var d = b.getAttribute("data-dir"); if (B.dir === d)
B.turns++;
else {
B.dir = d;
B.turns = 1;
} draw(); }; });
otmQ(pg, ".heat").oninput = function () { B.heat = +this.value; otmQ(pg, ".hv").textContent = B.heat ? B.heat + " of 10" : "unlit"; };
otmQ(pg, ".clr").onclick = function () {
if (OTM.potBrew)
return;
var bb = otmSatchel();
Object.keys(B.st).forEach(function (t) { bb[B.st[t].id] = (bb[B.st[t].id] || 0) + 1; });
otmSatchelPut(bb);
OTM.bench = { st: {}, pot: [], dir: null, turns: 0, heat: 0, rec: B.rec };
B = OTM.bench;
otmQ(pg, ".out").innerHTML = "";
otmCauldronCol(0x3A6A3A);
draw();
};
otmQ(pg, ".go").onclick = function () { if (!B.pot.length || OTM.potBrew)
return; OTM.potBrew = { start: Date.now(), until: Date.now() + 6000 }; otmQ(pg, ".out").innerHTML = "<p>The brew begins to bubble…</p>"; draw(); };
OTM.panelTick = function () {
var c = B.st.steep;
if (c && c.n < otmIng(c.id)[5]) {
c.n = Math.min(otmIng(c.id)[5], Math.floor((Date.now() - c.t0) / 1000));
if (c.n !== c.shown) {
c.shown = c.n;
draw();
}
}
var P = OTM.potBrew;
if (!P)
return;
var k = Math.min(1, (Date.now() - P.start) / (P.until - P.start));
otmQ(pg, ".bar div").style.width = Math.round(k * 100) + "%";
if (k < 1)
return;
OTM.potBrew = null;
otmPotionResult(pg, B);
B.pot = [];
B.dir = null;
B.turns = 0;
draw();
};
draw();
},
function (pg, B) {
var A = otmPot(), R = B.rec && OTM_RECIPES.filter(function (r) { return r[0] === B.rec; })[0], out = otmQ(pg, ".out");
if (!R) {
var cs = B.pot.map(function (id) { return otmIng(id)[3]; }), care = B.pot.some(function (id) { return otmIng(id)[6]; });
otmCauldronCol(parseInt(cs[cs.length - 1].slice(1), 16));
out.innerHTML = "<p>A free experiment: the brew swirls " + B.pot.length + " colours together" + (care ? ", and a sharp smell warns you something in it wants careful handling" : "") + ". Set a working recipe from the grimoire to brew something true.</p>";
return;
}
var same = B.pot.length === R[4].length && B.pot.slice().sort().join() === R[4].slice().sort().join(), os = same && B.pot.join() === R[4].join() ? 2 : same ? 1 : 0;
var ss = B.dir === R[5] && B.turns === R[6] ? 2 : B.dir === R[5] && Math.abs(B.turns - R[6]) <= 2 ? 1 : 0;
var hs = B.heat >= R[7][0] && B.heat <= R[7][1] ? 2 : B.heat >= R[7][0] - 1 && B.heat <= R[7][1] + 1 ? 1 : 0, tot = os + ss + hs;
if (!os)
tot = Math.min(tot, 3);
var col = parseInt(R[8].slice(1), 16), msg;
if (tot >= 6)
msg = ["A perfect working", (/^the /i.test(R[2]) ? R[2] : "The " + R[2]) + " settles into a clean, even hue. The grimoire's ink glows faintly on its page: you have it exactly right."];
else if (tot >= 4)
msg = ["A fine brew", "It holds together, close enough to work, though a careful eye would spot where the hand wavered."];
else if (tot >= 2) {
msg = ["Unstable", "The brew churns and will not settle. Something in the order, the stirring or the flame was off. Worth trying again."];
col = 0x5A4A6A;
}
else {
msg = ["Ruined", "A bitter smoke rises and the pot goes murky. Clear the bench and start fresh; read the page again."];
col = 0x1A1326;
}
otmCauldronCol(col);
var extra = "";
if (tot >= 4) {
var first = A.done.indexOf(R[0]) < 0;
if (first)
A.done.push(R[0]);
var all = OTM_RECIPES.filter(function (r) { return r[1] === R[1]; }).every(function (r) { return A.done.indexOf(r[0]) >= 0; });
if (all && R[1] < 5 && A.unl.indexOf(R[1] + 1) < 0) {
A.unl.push(R[1] + 1);
extra = "🔓 " + OTM_LEVELS[R[1] - 1] + " mastered! The " + OTM_LEVELS[R[1]] + " level is open, with new specimens to study in the Materia Magica.";
}
else if (first)
extra = "This recipe is now marked brewed in your grimoire.";
otmProgSave();
otmSay("⚗️ <b>" + otmEsc(R[2]) + "</b>: " + msg[0].toLowerCase() + "." + (extra ? " " + extra : ""));
}
out.innerHTML = "<div style='font:600 18px Georgia,serif;color:" + R[8] + "'>🧪 " + msg[0] + "</div><p>" + otmEsc(msg[1]) + "</p>" + (extra ? "<p style='color:#F0D890'>" + otmEsc(extra) + "</p>" : "") +
"<p class='note'>Order " + os + "/2 · stirring " + ss + "/2 · flame " + hs + "/2</p>";
},
function () {
if (OTM.cb)
return Promise.resolve(OTM.cb);
var keep = null;
try {
keep = JSON.parse(localStorage.getItem(OTM_CB_KEY) || "null");
}
catch (e) { }
return fetch(OTM_CB_URL).then(function (r) { return r.json(); }).then(function (d) {
OTM.cb = (d.entries || []).map(function (e) { return { c: String(e.category || "Recipes"), t: String(e.title || "Untitled"), by: String(e.submittedBy || "a Coven member"), ing: otmCbList(e.ingredients), st: String(e.instructions || "") }; });
try {
localStorage.setItem(OTM_CB_KEY, JSON.stringify(OTM.cb));
}
catch (e) { }
return OTM.cb;
}, function () { OTM.cb = keep; OTM.cbOld = !!keep; return keep; });
},
function (at) {
var bd = otmPanel("🍲 The Obsidian Moon Cookbook", "the Temple Kitchen · the coven's own recipes", "<div class='cbk'><p class='note'>Opening the book…</p></div>");
var box = otmQ(bd, ".cbk");
otmCbLoad().then(function (E) {
if (!otmPanelUp() || !otmQ(document, ".cbk"))
return;
if (!E || !E.length) {
box.innerHTML = "<p>The cookbook's pages could not be fetched from the temple site just now. Try again in a little while.</p>" + otmCbOffer();
otmCbWire(box);
return;
}
var cats = {};
E.forEach(function (e, i) { (cats[e.c] = cats[e.c] || []).push(i); });
var CK = Object.keys(cats).sort();
var st = OTM.cbAt || { cat: null, i: null };
if (at)
st = at;
OTM.cbAt = st;
var page = "font:15px/1.55 Georgia,serif;color:#2A1A0E;background:linear-gradient(90deg,#E9DCBC,#F4EAD0 12%,#F4EAD0 88%,#E2D2AE);padding:16px 18px;min-height:340px;flex:1;min-width:250px;box-shadow:inset 0 0 30px rgba(120,80,30,.25)";
var left, right;
if (st.cat == null) {
left = "<div style='font:600 20px Georgia,serif;text-align:center;color:#5A1A2A'>The Index</div><div style='text-align:center;color:#8A6A3A'>☾ ✦ ☽</div>" + CK.map(function (c) { return "<div style='margin:6px 0'><a href='#' data-cat='" + otmEsc(c) + "' style='color:#4A1A3A;font-weight:600'>" + otmEsc(c) + "</a> <span style='color:#8A6A3A'>· " + cats[c].length + "</span></div>"; }).join("");
right = "<div style='font:600 20px Georgia,serif;text-align:center;color:#5A1A2A'>The Obsidian Moon Cookbook</div><p style='text-align:center;font-style:italic'>recipes of the coven, gathered at the temple hearth</p><p>" + E.length + " recipes in " + CK.length + " chapters. Choose a chapter from the index.</p>" + (OTM.cbOld ? "<p style='font-size:13px;color:#8A6A3A'>These are the pages kept from your last visit; the temple site could not be reached just now.</p>" : "");
}
else {
var L = cats[st.cat] || [];
left = "<div style='font:600 19px Georgia,serif;color:#5A1A2A'>" + otmEsc(st.cat) + "</div><a href='#' data-home='1' style='color:#8A6A3A;font-size:13px'>← back to the index</a>" + L.map(function (i) { return "<div style='margin:6px 0'><a href='#' data-r='" + i + "' style='color:#4A1A3A;" + (st.i === i ? "font-weight:700;text-decoration:underline" : "") + "'>" + otmEsc(E[i].t) + "</a></div>"; }).join("");
var R = st.i != null ? E[st.i] : null;
right = R ? "<div style='font:600 21px Georgia,serif;color:#5A1A2A'>" + otmEsc(R.t) + "</div><div style='font-style:italic;color:#8A6A3A;margin-bottom:8px'>from " + otmEsc(R.by) + "</div>" +
(R.ing.length ? "<div style='font-weight:700'>Ingredients</div><ul style='margin:4px 0 10px 18px;padding:0'>" + R.ing.map(function (x) { return "<li>" + otmEsc(x) + "</li>"; }).join("") + "</ul>" : "") +
"<div style='font-weight:700'>Method</div><div style='white-space:pre-wrap'>" + otmEsc(R.st) + "</div>" +
"<div style='margin-top:12px;display:flex;justify-content:space-between'>" + (L.indexOf(st.i) > 0 ? "<a href='#' data-r='" + L[L.indexOf(st.i) - 1] + "' style='color:#4A1A3A'>← the page before</a>" : "<span></span>") + (L.indexOf(st.i) < L.length - 1 ? "<a href='#' data-r='" + L[L.indexOf(st.i) + 1] + "' style='color:#4A1A3A'>the next page →</a>" : "<span></span>") + "</div>"
: "<p style='font-style:italic'>Choose a recipe from this chapter.</p>";
}
box.innerHTML = "<div style='display:flex;flex-wrap:wrap;gap:0;border:3px solid #3A1A10;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,.6);background:#3A1A10'><div style='" + page + ";border-right:2px solid #B8A07A'>" + left + "</div><div style='" + page + "'>" + right + "</div></div>" + otmCbOffer();
box.querySelectorAll("[data-cat]").forEach(function (a) { a.onclick = function (e) { e.preventDefault(); otmCookbookOpen({ cat: a.getAttribute("data-cat"), i: cats[a.getAttribute("data-cat")][0] }); }; });
box.querySelectorAll("[data-r]").forEach(function (a) { a.onclick = function (e) { e.preventDefault(); otmCookbookOpen({ cat: st.cat, i: +a.getAttribute("data-r") }); }; });
box.querySelectorAll("[data-home]").forEach(function (a) { a.onclick = function (e) { e.preventDefault(); otmCookbookOpen({ cat: null, i: null }); }; });
otmCbWire(box);
});
return bd;
},
function () {
return "<details style='margin-top:10px'><summary style='cursor:pointer;color:#F0D890'>✒️ Offer a recipe to the cookbook</summary><p class='note'>It goes to the temple, and enters the book once approved.</p>" +
"<input class='ct' placeholder='Recipe title' style='width:100%'><input class='cc' placeholder='Chapter (for example Sabbat feasts, Breads, Teas)' style='width:100%;margin-top:4px'><textarea class='ci' rows='4' placeholder='Ingredients, one a line' style='width:100%;margin-top:4px'></textarea><textarea class='cs' rows='5' placeholder='Method' style='width:100%;margin-top:4px'></textarea><input class='cn' placeholder='Your name, as it should appear' style='width:100%;margin-top:4px'><button class='b cg' style='margin-top:6px'>Send it to the temple</button></details>";
},
function (box) {
var g = otmQ(box, ".cg");
if (!g)
return;
g.onclick = function () {
var v = function (c) { return (otmQ(box, c).value || "").trim(); };
if (!v(".ct") || !v(".cs")) {
g.textContent = "Give it a title and a method first";
return;
}
var body = "Recipe for the Obsidian Moon Cookbook\n\nTitle: " + v(".ct") + "\nChapter: " + v(".cc") + "\nFrom: " + v(".cn") + "\n\nIngredients:\n" + v(".ci") + "\n\nMethod:\n" + v(".cs");
window.open("mailto:obsidianmoontemple@gmail.com?subject=" + encodeURIComponent("Cookbook recipe: " + v(".ct")) + "&body=" + encodeURIComponent(body), "_blank");
g.textContent = "Your mail opened with the recipe: send it from there";
};
},
function () {
var mail = "obsidianmoontemple@gmail.com";
var bd = otmPanel("🕯️ Counsel with the High Priest", "the High Priest's office · Counseling Services", "<p>Sit with the High Priest, one to one. Choose a service and say a little of what you would like to bring; the temple writes back to arrange a time.</p>" +
OTM_COUNSEL.map(function (c, i) { return "<label style='display:block;margin:6px 0'><input type='radio' name='cs' value='" + i + "'" + (i ? "" : " checked") + "> <b>" + otmEsc(c[0]) + "</b> <span class='note'>" + otmEsc(c[1]) + "</span></label>"; }).join("") +
"<p><input class='nm' maxlength='60' placeholder='Your name' style='width:100%'></p><p><textarea class='wh' maxlength='800' rows='4' placeholder='What you would like to bring (optional)' style='width:100%'></textarea></p>" +
"<p><input class='tm' maxlength='80' placeholder='Days and times that suit you' style='width:100%'></p>" +
"<button class='b go'>✉️ Write to the temple</button><p class='note'>This opens a letter in your own email, to " + otmEsc(mail) + ". Nothing is paid here; the temple confirms the time and the fee with you.</p>");
otmQ(bd, ".go").onclick = function () {
var c = OTM_COUNSEL[+(bd.querySelector("input[name=cs]:checked") || { value: 0 }).value], nm = otmQ(bd, ".nm").value.trim(), wh = otmQ(bd, ".wh").value.trim(), tm = otmQ(bd, ".tm").value.trim();
var body = "Service: " + c[0] + " (" + c[1] + ")\nName: " + (nm || "-") + "\nTimes that suit: " + (tm || "-") + "\n\n" + (wh || "") + "\n\n(sent from the High Priest's office in the Temple of the Obsidian Moon, SomnuMatrix)";
window.open("mailto:" + mail + "?subject=" + encodeURIComponent("Counseling request: " + c[0]) + "&body=" + encodeURIComponent(body), "_blank");
};
return bd;
},
function (i) {
var S = OTM_SHELVES[i], known = otmPotionKnown(), bag = otmSatchel(), busy = null;
var bd = otmPanel("🫙 " + S.n, "the Apothecary's jar shelves · gather what you need, then brew at the bench", "<div class='rows'></div><p class='bagline note' style='margin-top:10px'></p>");
function draw() {
bag = otmSatchel();
otmQ(bd, ".rows").innerHTML = otmShelfIngs(i).map(function (g) {
var k = known.indexOf(g[0]) >= 0, n = bag[g[0]] || 0;
return "<div style='display:flex;align-items:center;gap:10px;padding:6px 2px;border-top:1px solid rgba(184,146,58,.2)'><span style='width:18px;height:26px;border-radius:4px 4px 6px 6px;flex:none;background:" + (k ? g[3] : "#3A3440") + ";box-shadow:0 0 8px " + (k ? g[3] : "transparent") + "'></span>" +
"<span style='flex:1'>" + (k ? "<b>" + otmEsc(g[1]) + "</b> <span class='note'>" + otmEsc(g[2].toLowerCase()) + "</span>" : "<i>an unlabelled jar</i> <span class='note'>study it in the Materia Magica at the bench to know it</span>") + "</span>" +
(k ? "<span class='note'>in satchel " + n + "</span><button class='b' data-g='" + g[0] + "'" + (n >= OTM_SAT_MAX || busy ? " disabled" : "") + ">" + (busy === g[0] ? "gathering…" : "Take one") + "</button>" : "") + "</div>";
}).join("");
var tot = Object.keys(bag).reduce(function (a, k) { return a + bag[k]; }, 0);
otmQ(bd, ".bagline").textContent = tot ? "Your satchel holds " + tot + " ingredient" + (tot > 1 ? "s" : "") + ". Take them to the cauldron or the grimoire to brew." : "Your satchel is empty.";
bd.querySelectorAll("[data-g]").forEach(function (b) {
b.onclick = function () {
var id = b.getAttribute("data-g");
busy = id;
draw();
setTimeout(function () { if (!otmPanelUp()) {
busy = null;
return;
} var B = otmSatchel(); B[id] = Math.min(OTM_SAT_MAX, (B[id] || 0) + 1); otmSatchelPut(B); busy = null; draw(); }, 1600);
};
});
}
draw();
return bd;
},
function () {
if (OTM.altarAsk || Date.now() - (OTM.altarAt || 0) < 60000 || !otmSigned() || typeof cityRpc !== "function")
return Promise.resolve(OTM.altarList || []);
OTM.altarAsk = true;
OTM.altarAt = Date.now();
return cityRpc("temple_altar_now", {}).then(function (d) { OTM.altarAsk = false; if (Array.isArray(d)) {
OTM.altarList = d;
otmAltarCandles();
} return OTM.altarList || []; }, function () { OTM.altarAsk = false; return OTM.altarList || []; });
},
function () {
var A = (OTM.altarLog && OTM.altarLog.aspect) || { deity: "The Obsidian Mother", sub: "Temple Prime Current", glyph: "prime", season: "auto" };
var k = A.season === "auto" || !A.season ? otmSeasonNow() : A.season;
return { deity: A.deity, sub: A.sub, glyph: A.glyph, season: A.season || "auto", key: k, S: OTM_SEASONS.filter(function (x) { return x[0] === k; })[0] || OTM_SEASONS[6] };
},
function (force) {
if (OTM.altarLogAsk || (!force && Date.now() - (OTM.altarLogAt || 0) < 60000) || !otmSigned() || typeof cityRpc !== "function")
return Promise.resolve(OTM.altarLog || null);
OTM.altarLogAsk = true;
OTM.altarLogAt = Date.now();
return cityRpc("temple_altar_log", {}).then(function (d) { OTM.altarLogAsk = false; if (d && d.log) {
OTM.altarLog = d;
otmAltarCandles();
} return OTM.altarLog || null; }, function () { OTM.altarLogAsk = false; return OTM.altarLog || null; });
},
function (cv, text) {
var x = cv.getContext("2d"), W = cv.width, H = cv.height, cx = W / 2, cy = H / 2, k = W / 130, t = String(text || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 45);
x.clearRect(0, 0, W, H);
x.lineCap = "round";
x.beginPath();
x.arc(cx, cy, 58 * k, 0, 6.283);
x.strokeStyle = "rgba(157,78,223,.45)";
x.lineWidth = 1.5 * k;
x.stroke();
x.beginPath();
x.arc(cx, cy, 50 * k, 0, 6.283);
x.strokeStyle = "rgba(212,175,55,.3)";
x.lineWidth = k;
x.stroke();
if (!t)
return;
x.lineWidth = 2.5 * k;
x.strokeStyle = "#D4AF37";
x.shadowBlur = 10 * k;
x.shadowColor = "#9D4EDF";
x.beginPath();
x.moveTo(cx, cy - 44 * k);
x.lineTo(cx, cy + 44 * k);
x.stroke();
x.beginPath();
x.moveTo(cx - 9 * k, cy - 34 * k);
x.lineTo(cx, cy - 44 * k);
x.lineTo(cx + 9 * k, cy - 34 * k);
x.stroke();
var n = Math.min(t.length, 8), st = 64 / Math.max(n, 1);
for (var i = 0; i < n; i++) {
var c = t.charCodeAt(i) - 65, y = (cy / k - 28 + i * st) * k, sd = i % 2 ? -1 : 1;
x.strokeStyle = i % 2 ? "#9D4EDF" : "#D4AF37";
x.beginPath();
if (c % 5 === 0) {
x.moveTo(cx, y);
x.lineTo(cx + 16 * sd * k, y - 10 * k);
x.moveTo(cx, y + 6 * k);
x.lineTo(cx + 12 * sd * k, y - 4 * k);
}
else if (c % 5 === 1) {
x.moveTo(cx, y);
x.lineTo(cx + 14 * k, y - 12 * k);
x.moveTo(cx, y);
x.lineTo(cx - 14 * k, y - 12 * k);
}
else if (c % 5 === 2) {
x.moveTo(cx - 12 * k, y - 8 * k);
x.lineTo(cx + 12 * k, y + 8 * k);
x.moveTo(cx - 12 * k, y + 8 * k);
x.lineTo(cx + 12 * k, y - 8 * k);
}
else if (c % 5 === 3) {
x.moveTo(cx, y - 7 * k);
x.lineTo(cx + 12 * sd * k, y);
x.lineTo(cx, y + 7 * k);
}
else {
x.moveTo(cx, y - 8 * k);
x.lineTo(cx + 14 * sd * k, y);
x.lineTo(cx, y + 8 * k);
}
x.stroke();
}
[0, 1.5708, 3.1416, 4.7124].forEach(function (a) { x.beginPath(); x.arc(cx + Math.cos(a) * 50 * k, cy + Math.sin(a) * 50 * k, 3 * k, 0, 6.283); x.fillStyle = "#D4AF37"; x.fill(); });
x.shadowBlur = 0;
},
function (tab) {
tab = tab || "offer";
var A = otmAspect(), keep = otmKeeper(), tabs = [["offer", "🕯️ Light a candle"], ["log", "📜 The candle log"], ["basin", "🪙 The basin"], ["stave", "ᛟ Draw a stave"], ["now", "On the altar now"], ["sit", "Sit a while"]];
if (keep)
tabs.push(["hand", "☾ The High Priest's hand"]);
var bd = otmPanel("🌙 The Cyber Altar", "the black altar of the Obsidian Moon · dressed for " + A.deity + " · " + A.S[1], "<div style='display:flex;align-items:center;gap:10px;margin:-4px 0 8px;padding:6px 10px;border:1px solid #" + ("00000" + A.S[3].toString(16)).slice(-6) + ";border-radius:4px;background:rgba(" + (A.S[2] >> 16) + "," + ((A.S[2] >> 8) & 255) + "," + (A.S[2] & 255) + ",.10)'>" + otmGlyphSvg(A.glyph, 34) +
"<div><b style='font:600 16px Georgia,serif;color:#F0D890;letter-spacing:.06em'>" + otmEsc(A.deity) + "</b><div class='note'>" + otmEsc(A.sub) + " · " + otmEsc(A.S[1]) + "</div></div></div>" + otmTabs(tabs, tab) + "<div class='pg'></div>");
otmTabsWire(bd, function (t) { otmAltarOpen(t); });
var pg = otmQ(bd, ".pg"), p = otmProg(), L = OTM.altarLog || { log: [], basin: [] };
if (tab === "log") {
pg.innerHTML = "<p class='note'>Every candle lit here with its intention shown, newest first. " + (otmSigned() ? "" : "Sign in to read the temple's log.") + "</p>" +
(L.log.length ? "<table>" + L.log.map(function (o) {
var c = OTM_CANDLES.filter(function (x) { return x[0] === o.colour; })[0];
return "<tr><td style='white-space:nowrap'><span style='color:#" + ("00000" + (c ? c[2] : 0xF4EED8).toString(16)).slice(-6) + "'>🕯️</span> " + otmEsc(new Date(o.at).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })) + "</td><td><b>" + otmEsc(o.name) + "</b><br><i>“" + otmEsc(o.intent) + "”</i></td></tr>";
}).join("") + "</table>" : "<p>No candles in the log yet.</p>");
otmAltarLogFetch().then(function (d) { if (d && d !== L && otmPanelUp() && OTM.panel.querySelector("[data-tab='log'].on"))
otmAltarOpen("log"); });
return;
}
if (tab === "basin") {
var groups = [["tithe", "✨ The traditional tithes"]].concat(OTM_SEASONS.slice(0, 8).map(function (s) { return [s[0], s[1]]; }));
pg.innerHTML = "<p>The basin takes the sabbat offerings. An offering here follows a contribution to the temple: put in the contribution code the temple gave you, choose what you lay, and it rests on the altar for all to see.</p>" +
"<div class='grid' style='margin:6px 0 10px'>" + (L.basin.length ? L.basin.map(function (o) {
var b = OTM_BASIN.filter(function (x) { return x[0] === o.item; })[0];
return "<div title='" + otmEsc((b ? b[1] : o.item) + ", dedicated by " + o.name) + "' style='width:64px;text-align:center;font-size:11px;opacity:.9'><div style='font-size:30px'>" + (b ? b[2] : "✨") + "</div>" + otmEsc(o.name) + "</div>";
}).join("") : "<span class='note'>The basin is empty.</span>") + "</div>" +
"<label>Your name or initials<br><input class='nm' maxlength='24' style='width:100%'></label>" +
"<label>Contribution code<br><input class='cd' maxlength='30' autocomplete='off' style='width:100%;text-transform:uppercase'></label>" +
"<label>What you lay on the altar<br><select class='it' style='width:100%'>" + groups.map(function (g) { return "<optgroup label='" + otmEsc(g[1]) + "'>" + OTM_BASIN.filter(function (b) { return b[3] === g[0]; }).map(function (b) { return "<option value='" + b[0] + "'>" + b[2] + " " + otmEsc(b[1]) + "</option>"; }).join("") + "</optgroup>"; }).join("") + "</select></label>" +
"<div><button class='b go'>🪙 Lay it in the basin</button></div><p class='msg' style='color:#F0D890'></p>";
otmQ(pg, ".it").value = (OTM_BASIN.filter(function (b) { return b[3] === A.key; })[0] || OTM_BASIN[0])[0];
otmQ(pg, ".go").onclick = function () {
var msg = otmQ(pg, ".msg"), cd = (otmQ(pg, ".cd").value || "").trim().toUpperCase(), it = otmQ(pg, ".it").value, nm = (otmQ(pg, ".nm").value || "").trim();
if (!otmSigned()) {
msg.textContent = "Sign in first: the basin keeps a record of every offering.";
return;
}
if (!cd) {
msg.textContent = "Put in your contribution code first.";
return;
}
msg.textContent = "Laying it in the basin…";
cityRpc("temple_basin", { p_code: cd, p_item: it, p_name: nm }).then(function (d) {
if (!d || d.ok === false) {
msg.textContent = (d && d.error) || "The basin did not take it.";
return;
}
otmAltarLogFetch(true).then(function () { otmAltarOpen("basin"); otmSay("🪙 Your offering rests on the altar of the Obsidian Moon."); });
}, function () { msg.textContent = "The altar could not be reached just now."; });
};
return;
}
if (tab === "stave") {
pg.innerHTML = "<p>Write a focus phrase, and the altar cuts it as a bindrune: each letter a stave off the one upright, gold and violet in turn.</p>" +
"<div style='display:flex;flex-wrap:wrap;gap:14px;align-items:center'><canvas width='260' height='260' style='width:200px;height:200px;border-radius:50%;background:radial-gradient(#1A1230,#07050B)'></canvas>" +
"<div style='flex:1;min-width:200px'><input class='ph' maxlength='45' placeholder='Focus phrase…' style='width:100%'><div><button class='b go'>ᛟ Draw the stave</button></div><p class='note'>Only the first eight letters become staves.</p></div></div>";
var cv = otmQ(pg, "canvas");
otmStave(cv, "");
otmQ(pg, ".go").onclick = function () { otmStave(cv, otmQ(pg, ".ph").value); };
return;
}
if (tab === "hand" && keep) {
pg.innerHTML = "<p class='note'>Only you see this. What you choose dresses the altar for everyone.</p>" +
"<label>The aspect<br><select class='dy' style='width:100%'>" + OTM_DEITIES.map(function (d, i) { return "<option value='" + i + "'" + (d[0] === A.deity ? " selected" : "") + ">" + otmEsc(d[0] + " · " + d[1]) + "</option>"; }).join("") + "</select></label>" +
"<label>The season<br><select class='sn' style='width:100%'><option value='auto'>The wheel by itself (now " + otmEsc((OTM_SEASONS.filter(function (x) { return x[0] === otmSeasonNow(); })[0] || [])[1] || "") + ")</option>" +
OTM_SEASONS.map(function (s2) { return "<option value='" + s2[0] + "'" + (A.season === s2[0] ? " selected" : "") + ">" + otmEsc(s2[1]) + "</option>"; }).join("") + "</select></label>" +
"<div><button class='b go'>☾ Dress the altar</button><button class='b clr'>Clear the candle log</button></div><p class='msg' style='color:#F0D890'></p>" +
"<p class='note'>Contribution codes and the vault of every offering are in admin, In the game, The Temple of the Obsidian Moon, The Cyber Altar.</p>";
if (A.season === "auto")
otmQ(pg, ".sn").value = "auto";
otmQ(pg, ".go").onclick = function () {
var d = OTM_DEITIES[+otmQ(pg, ".dy").value], msg = otmQ(pg, ".msg");
msg.textContent = "Dressing the altar…";
cityRpc("temple_altar_set", { p_deity: d[0], p_sub: d[1], p_glyph: d[2], p_season: otmQ(pg, ".sn").value }).then(function (r) { if (!r || r.ok === false) {
msg.textContent = (r && r.error) || "That did not take.";
return;
} otmAltarLogFetch(true).then(function () { otmAltarOpen("hand"); }); }, function () { msg.textContent = "The altar could not be reached."; });
};
otmQ(pg, ".clr").onclick = function () { var msg = otmQ(pg, ".msg"); cityRpc("temple_altar_log_clear", {}).then(function (r) { msg.textContent = r && r.ok ? "The candle log is cleared." : (r && r.error) || "That did not take."; otmAltarLogFetch(true); }); };
return;
}
if (tab === "now") {
var L = otmAltarAll(), n = L.filter(function (o) { return o.kind === "candle"; }).length;
pg.innerHTML = "<p>" + (L.length ? "<b>" + n + "</b> candle" + (n === 1 ? "" : "s") + " burning, and " + (L.length - n) + " other offering" + (L.length - n === 1 ? "" : "s") + ", laid by the temple in the last day." : "The altar is quiet. Be the first to light a candle today.") + "</p>" +
(L.length ? "<table>" + L.slice(0, 60).map(function (o) {
var c = OTM_CANDLES.filter(function (x) { return x[0] === o.colour; })[0], k = OTM_OFFER.filter(function (x) { return x[0] === o.kind; })[0];
return "<tr><td>" + (k ? k[1] : "🕯️") + (o.kind === "candle" && c ? " <span style='color:#" + ("00000" + c[2].toString(16)).slice(-6) + "'>●</span> " + c[1] : "") + (o.kind === "incense" && o.colour ? " (" + otmEsc(o.colour) + ")" : "") + "</td><td>" + (o.dedicated ? "to " + otmEsc(o.dedicated) : "") + "</td></tr>";
}).join("") + "</table>" : "") +
"<p class='note'>A candle burns for a day, then goes out. Only what was offered and to whom is shown here; anyone's own words stay theirs.</p><p class='note'>You have made " + (p.candles || 0) + " offering" + ((p.candles || 0) === 1 ? "" : "s") + " here.</p>";
return;
}
if (tab === "sit") {
pg.innerHTML = "<p>You sit in the front pew. The candles move a little. The hall is very quiet, the way a hall is when it has heard everything.</p>" +
"<p>This is the temple from which the whole dream was born: the city, its towers and its worlds came after it, and they all remember it. Every faith that ever looked up at the moon has a place under this roof. Some of its doors are plain to see. Some are not.</p>" +
"<p style='font-style:italic'>" + otmEsc(otmMirrorToday()) + "</p>";
return;
}
pg.innerHTML = "<div style='display:grid;gap:10px'>" +
"<div><div class='note'>What you offer</div>" + OTM_OFFER.map(function (o, i) { return "<button class='b k" + (i ? "" : " on") + "' data-k='" + o[0] + "'>" + o[1] + "</button>"; }).join("") + "</div>" +
"<div class='cand'><div class='note'>The candle's colour</div><div class='grid'>" + OTM_CANDLES.map(function (c, i) { return "<button class='b c" + (i ? "" : " on") + "' data-c='" + c[0] + "' title='" + otmEsc(c[3]) + "'><span style='display:inline-block;width:11px;height:11px;border-radius:50%;border:1px solid #9A8AAA;vertical-align:-1px;background:#" + ("00000" + c[2].toString(16)).slice(-6) + "'></span> " + c[1] + "</button>"; }).join("") + "</div><div class='cm note'></div></div>" +
"<div class='inc' style='display:none'><div class='note'>Which incense</div><select class='is'>" + OTM_INCENSE.map(function (x) { return "<option>" + otmEsc(x) + "</option>"; }).join("") + "</select></div>" +
"<label>To whom (a god, an ancestor, the Moon, or leave it empty)<br><input class='to' maxlength='40' list='otm-to' placeholder='The Obsidian Moon' style='width:100%'></label><datalist id='otm-to'><option>The Obsidian Moon</option><option>Hecate</option><option>My ancestors</option><option>The Old Gods</option><option>The Morrigan</option><option>Isis</option><option>Odin</option><option>Lilith</option></datalist>" +
"<label class='lgn'>Your name or initials, for the candle log<br><input class='nm' maxlength='24' style='width:100%'></label>" +
"<label>Your words, prayer or intention (optional)<br><textarea class='wd' rows='3' maxlength='400' style='width:100%'></textarea></label>" +
"<label class='lgs' style='display:flex;gap:8px;align-items:center'><input type='checkbox' class='shw' checked> Show my name and intention in the temple's candle log</label>" +
"<label class='pr' style='display:" + (otmSigned() ? "flex" : "none") + ";gap:8px;align-items:center'><input type='checkbox' class='pri'> Let the High Priest read my words, so the temple may pray with me</label>" +
"<div><button class='b go'>🌙 Lay it on the altar</button></div><p class='msg' style='color:#F0D890'></p></div>" +
"<p class='note'>" + (otmSigned() ? "Your offering is seen on the altar by everyone in the temple for a day. Your words are kept private unless you tick the box." : "Sign in for your offering to burn on the altar for the whole temple; until then it burns on this device only.") + "</p>";
var kind = "candle", col = "white";
function cm() { var c = OTM_CANDLES.filter(function (x) { return x[0] === col; })[0]; otmQ(pg, ".cm").textContent = c[1] + ": " + c[3] + "."; }
pg.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { kind = b.getAttribute("data-k"); pg.querySelectorAll("[data-k]").forEach(function (x) { x.classList.toggle("on", x === b); }); otmQ(pg, ".cand").style.display = kind === "candle" ? "" : "none"; otmQ(pg, ".inc").style.display = kind === "incense" ? "" : "none"; otmQ(pg, ".lgn").style.display = otmQ(pg, ".lgs").style.display = kind === "candle" ? "" : "none"; }; });
pg.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { col = b.getAttribute("data-c"); pg.querySelectorAll("[data-c]").forEach(function (x) { x.classList.toggle("on", x === b); }); cm(); }; });
cm();
otmQ(pg, ".go").onclick = function () {
var to = (otmQ(pg, ".to").value || "").trim().slice(0, 40), wd = (otmQ(pg, ".wd").value || "").trim().slice(0, 400), pri = otmQ(pg, ".pri").checked, c = kind === "candle" ? col : kind === "incense" ? otmQ(pg, ".is").value : "";
var mine = otmAltarMine();
if (mine.length >= 12) {
otmQ(pg, ".msg").textContent = "You have laid twelve offerings today; the altar will be glad of more tomorrow.";
return;
}
p.offers = (p.offers || []).filter(function (o) { return Date.now() - o.at < 86400000; });
p.offers.push({ kind: kind, colour: c, to: to, at: Date.now() });
p.candles = (p.candles || 0) + 1;
otmProgSave();
var K = OTM_OFFER.filter(function (x) { return x[0] === kind; })[0][1], msg = otmQ(pg, ".msg");
msg.textContent = K + (kind === "candle" ? " (" + col + ")" : "") + " is on the altar" + (to ? ", for " + to : "") + ".";
if (otmSigned() && typeof cityRpc === "function" && kind === "candle" && wd && otmQ(pg, ".shw").checked)
cityRpc("temple_light", { p_colour: c, p_name: (otmQ(pg, ".nm").value || "").trim(), p_intent: wd.slice(0, 120), p_show: true }).then(function (d) { if (d && d.ok === false && d.error)
msg.textContent = d.error; OTM.altarAt = 0; otmAltarFetch(); otmAltarLogFetch(true); }, function () { msg.textContent = "The altar could not be reached; your candle burns here on this device."; });
else if (otmSigned() && typeof cityRpc === "function")
cityRpc("temple_offer", { p_kind: kind, p_colour: c, p_to: to, p_words: wd, p_priest: !!pri }).then(function (d) { if (d && d.ok === false && d.error)
msg.textContent = d.error; OTM.altarAt = 0; otmAltarFetch(); }, function () { msg.textContent += " (It burns here on this device for now; the temple's altar could not be reached.)"; });
otmAltarCandles();
otmSay("🌙 Your offering is laid on the altar of the Obsidian Moon" + (to ? ", for " + otmEsc(to) : "") + ".");
otmQ(pg, ".wd").value = "";
};
},
function (P) {
if (!P.pet)
P.pet = { hunger: 80, happy: 80, energy: 80, clean: 80, bond: 0, poo: false, last: Date.now(), care: Date.now() };
var h = (Date.now() - P.pet.last) / 3600000;
if (h > 0.02) {
var d = Math.min(100, h * 3), p = P.pet;
p.hunger = Math.max(0, p.hunger - d);
p.happy = Math.max(0, p.happy - d);
p.energy = Math.max(0, p.energy - d * 0.6);
p.clean = Math.max(0, p.clean - d * 0.5);
p.last = Date.now();
if (!p.poo && Math.random() < Math.min(1, h / 6))
p.poo = true;
otmKzSave();
}
return P.pet;
},
function (P, size) {
var f = otmKzFam(P), st = otmKzStage(otmKzPet(P).bond), c = otmKzCol(P), sz = Math.round(size * st.scale);
return "<span style='display:inline-block;font-size:" + sz + "px;line-height:1.1;" + (c.hex ? "filter:drop-shadow(0 0 10px " + c.hex + ") drop-shadow(0 0 3px " + c.hex + ")" : "filter:drop-shadow(0 0 8px rgba(255,240,180,.6))") + "'>" + (st.key === "egg" ? "🥚" : f.emoji) + "</span>";
},
function (P, extra) {
try {
var f = otmKzFam(P), pet = otmKzPet(P), body = extra || { profileId: P.id, profileName: P.name, contestName: P.contest || P.name, familiarName: otmKzFamName(P), species: f.name, color: otmKzCol(P).name, stage: otmKzStage(pet.bond).label, level: Math.floor((pet.bond || 0) / 10) + 1,
ttaComplete: P.s1.length, ttaTotal: OTM_KZ.CHAPTERS.length, wheelComplete: P.s2.length, wheelTotal: OTM_KZ.SABBATS.length };
fetch(OTM_KZ_ROSTER, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) }).catch(function () { });
}
catch (e) { }
},
function (view, arg) {
var A = otmKzAll(), P = otmKzMe();
if (!P && view !== "new")
view = "who";
view = view || "hub";
var bd = otmPanel("✨ The Cyber Temple Kid Zone", "the Little Moons' Room · Temple of the Obsidian Moon", OTM_KZ_CSS + "<div class='kz'><div class='kzt'></div><div class='pg'></div></div>");
OTM.panel.querySelector(".otp").style.background = "linear-gradient(160deg,#3A1AA8,#1A108A 55%,#4A0E8A)";
var pg = otmQ(bd, ".pg"), K = OTM_KZ, go = function (v, a) { otmKidZone(v, a); }, back = "<button class='kb' data-go='hub'>← Back to the Kid Zone</button>";
function wire() { pg.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { go(b.getAttribute("data-go"), b.getAttribute("data-a")); }; }); }
if (view === "who" || view === "new") {
var names = Object.keys(A.p);
if (view === "who" && names.length) {
pg.innerHTML = "<h3>Who's adventuring today?</h3><p>Pick your name, or begin a brand new adventure.</p>" + names.map(function (n) { var Q = A.p[n]; return "<div class='kc' data-pick='" + otmEsc(n) + "'>" + otmKzFamHtml(Q, 42) + "<div style='font-weight:700'>" + otmEsc(n) + "</div><div style='font-size:13px'>" + Q.s1.length + "/" + K.CHAPTERS.length + " stories · " + Q.s2.length + "/" + K.SABBATS.length + " sabbats</div></div>"; }).join("") +
"<div><button class='kb' data-go='new'>✨ Begin a new adventure</button></div>";
pg.querySelectorAll("[data-pick]").forEach(function (c) { c.onclick = function () { A.act = c.getAttribute("data-pick"); otmKzSave(); go("hub"); }; });
wire();
return;
}
var pick = { fam: K.FAMILIARS[0].id, col: 0 };
pg.innerHTML = "<h3>Begin a new adventure</h3><p>What is your name, adventurer?</p><input class='nm' maxlength='24' placeholder='Your name'><p>Choose a familiar to walk with you:</p><div class='fm'></div><p>Choose their colour:</p><div class='cl'></div><div><button class='kb gox'>Begin my adventure ✨</button>" + (names.length ? "<button class='kb' data-go='who'>Back</button>" : "") + "</div>";
function drawPick() {
otmQ(pg, ".fm").innerHTML = K.FAMILIARS.map(function (f) { return "<button class='kb" + (pick.fam === f.id ? " on" : "") + "' data-f='" + f.id + "'>" + f.emoji + " " + otmEsc(f.name) + "</button>"; }).join("");
otmQ(pg, ".cl").innerHTML = K.FAMILIAR_COLORS.map(function (c, i) { return "<button class='kb" + (pick.col === i ? " on" : "") + "' data-c='" + i + "' style='border-color:" + (c.hex || "#FFE84A") + "'>" + otmEsc(c.name) + "</button>"; }).join("");
pg.querySelectorAll("[data-f]").forEach(function (b) { b.onclick = function () { pick.fam = b.getAttribute("data-f"); drawPick(); }; });
pg.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { pick.col = +b.getAttribute("data-c"); drawPick(); }; });
}
drawPick();
otmQ(pg, ".gox").onclick = function () {
var n = (otmQ(pg, ".nm").value || "").replace(/[<>]/g, "").trim().slice(0, 24);
if (!n) {
otmKzCheer(bd, "First, tell us your name!");
return;
}
if (A.p[n]) {
otmKzCheer(bd, "That name is already adventuring here. Pick it from the list, or choose another.");
return;
}
A.p[n] = { id: "kz" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: n, fam: pick.fam, col: pick.col, s1: [], s2: [], tr: {}, pot: [], brewed: 0, book: [], msgs: [] };
A.act = n;
otmKzSave();
go("ceremony");
};
wire();
return;
}
var pet = otmKzPet(P), fam = otmKzFam(P);
if (view === "ceremony") {
pg.innerHTML = "<h3>✨ A small ceremony</h3><div style='text-align:center'>" + otmKzFamHtml(P, 90) + "</div><p><b>Name your familiar.</b> Every bond begins with a name. Choose one that feels right: you can always change it later.</p><input class='fn' maxlength='20' placeholder='" + otmEsc(fam.name) + "'> <button class='kb ok'>This is your name 🌙</button>";
otmQ(pg, ".ok").onclick = function () { P.famName = (otmQ(pg, ".fn").value || "").replace(/[<>]/g, "").trim().slice(0, 20) || null; otmKzSave(); otmKzRoster(P); go("hub"); otmKzCheer(OTM.panel, "🎉 Welcome, " + otmEsc(P.name) + "!"); };
return;
}
if (view === "hub") {
var el = otmPlanetsAt(Date.now()).moon.el, mi = Math.floor((otmDeg(el) / 45) + 0.5) % 8, M = K.MOON_PHASES[mi] || K.MOON_PHASES[0], now = new Date(), nx = null;
K.SABBAT_DATES.forEach(function (s) { var d = new Date(now.getFullYear(), s.month - 1, s.day); if (d < new Date(now.getFullYear(), now.getMonth(), now.getDate()))
d = new Date(now.getFullYear() + 1, s.month - 1, s.day); if (!nx || d < nx.d)
nx = { n: s.name, d: d }; });
var days = Math.round((nx.d - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000), s3 = P.s1.length >= K.CHAPTERS.length && P.s2.length >= K.SABBATS.length;
pg.innerHTML = "<div style='display:flex;flex-wrap:wrap;gap:12px;align-items:center'><div style='text-align:center'>" + otmKzFamHtml(P, 64) + "</div><div style='flex:1;min-width:200px'><h3>Hello, " + otmEsc(P.name) + "!</h3>" + otmEsc(otmKzFamName(P)) + " is with you.<br><span style='font-size:14px'>" + M.emoji + " Tonight: " + otmEsc(M.name) + ". " + otmEsc(M.blurb) + "<br>🎡 " + (days ? days + " day" + (days > 1 ? "s" : "") + " until " + nx.n : "Today is " + nx.n + "!") + "</span></div></div>" +
"<p>Three stations of magic wait for you. Visit each star, turn the wheel, and see what appears when everything is complete…</p>" +
"<div class='kc" + (P.s1.length >= K.CHAPTERS.length ? " done" : "") + "' data-go='s1'><div class='e'>⭐</div><b>Temple Time Adventures</b><div style='font-size:13px'>" + P.s1.length + " of " + K.CHAPTERS.length + " stories</div></div>" +
"<div class='kc" + (P.s2.length >= K.SABBATS.length ? " done" : "") + "' data-go='s2'><div class='e'>🎡</div><b>The Wheel of the Year</b><div style='font-size:13px'>" + P.s2.length + " of " + K.SABBATS.length + " sabbats</div></div>" +
"<div class='kc" + (P.cert ? " done" : "") + "' data-go='s3'><div class='e'>" + (s3 ? "🏆" : "🔒") + "</div><b>" + (s3 ? "The Final Trial" : "Hidden until now") + "</b><div style='font-size:13px'>" + (P.cert ? "certificate earned" : s3 ? "ready for you!" : "finish the first two") + "</div></div>" +
"<h3 style='margin-top:12px'>🐾 The Familiar's Corner</h3>" + [["fam", "🐾 My Familiar"], ["talk", "💌 Talk to your familiar"], ["potion", "🧪 The Potion Mixer"], ["jar", "🫙 Spell Jar Builder"], ["wisdom", "🃏 Wisdom Draw"], ["book", "📖 My Spellbook"], ["treasure", "🎁 My Treasures"]].map(function (b) { return "<button class='kb' data-go='" + b[0] + "'>" + b[1] + "</button>"; }).join("") +
"<div style='margin-top:10px'><button class='kb' data-go='who' style='background:#2A1A6A'>Switch adventurer</button></div>";
wire();
return;
}
if (view === "s1" || view === "s2") {
var L = view === "s1" ? K.CHAPTERS : K.SABBATS, D = view === "s1" ? P.s1 : P.s2;
pg.innerHTML = back + (view === "s1" ? "<h3>⭐ Temple Time Adventures</h3><p>Tap a star to visit its story, meet its guide, and try the activity that goes with it.</p>" : "<h3>🎡 The Wheel of the Year</h3><p>Eight sabbats turn the year. Learn each one's colours and traditions, solve its riddle, then decorate its altar.</p>") +
L.map(function (c) { return "<div class='kc" + (D.indexOf(c.id) >= 0 ? " done" : "") + "' data-go='item' data-a='" + c.id + "' style='border-color:" + c.color + "'><div class='e'>" + c.emoji + "</div><b>" + otmEsc(c.title) + "</b><div style='font-size:12px'>" + otmEsc(c.guide) + "</div>" + (D.indexOf(c.id) >= 0 ? "<div>✅</div>" : "") + "</div>"; }).join("");
wire();
return;
}
if (view === "item") {
var it = K.CHAPTERS.concat(K.SABBATS).filter(function (c) { return c.id === arg; })[0];
if (!it)
return go("hub");
var sk = it.station === "station1" ? "s1" : "s2", pgI = +(OTM.kzPage || 0);
function storyView() {
var n = it.story.length, i = Math.min(pgI, n);
if (i < n) {
pg.innerHTML = "<button class='kb' data-go='" + sk + "'>← Back</button><h3>" + it.emoji + " " + otmEsc(it.title) + "</h3><div style='font-size:14px;color:#FFD8F0'>" + otmEsc(it.guide) + (it.season ? " · " + otmEsc(it.season) : "") + "</div>" +
"<div class='kp' style='font-size:18px;line-height:1.6'>" + otmEsc(it.story[i]) + "</div><div style='font-size:13px'>Page " + (i + 1) + " of " + n + "</div>" +
"<button class='kb pv'" + (i ? "" : " disabled") + ">◀ Back a page</button><button class='kb nx'>" + (i < n - 1 ? "Next page ▶" : "On to the activity ✨") + "</button><button class='kb ra'>🔊 Read it to me</button>";
otmQ(pg, ".pv").onclick = function () { pgI = Math.max(0, i - 1); storyView(); };
otmQ(pg, ".nx").onclick = function () { pgI = i + 1; try {
speechSynthesis.cancel();
}
catch (e) { } storyView(); };
otmQ(pg, ".ra").onclick = function () { try {
speechSynthesis.cancel();
var u = new SpeechSynthesisUtterance(it.story[i]);
u.rate = 0.92;
speechSynthesis.speak(u);
}
catch (e) { } };
wire();
return;
}
var extra = it.colors ? "<div class='kp'><b>Colours of " + otmEsc(it.title) + ":</b> " + it.colors.map(function (c) { return "<span style='display:inline-block;width:18px;height:18px;border-radius:50%;vertical-align:middle;background:" + c.hex + ";border:2px solid #fff'></span> " + otmEsc(c.name); }).join(" &nbsp; ") +
"<br><b>Traditions:</b><ul style='margin:4px 0 0 18px;padding:0'>" + it.traditions.map(function (t) { return "<li>" + otmEsc(t) + "</li>"; }).join("") + "</ul></div>" : "";
pg.innerHTML = "<button class='kb' data-go='" + sk + "'>← Back</button><h3>" + it.emoji + " " + otmEsc(it.activity.title) + "</h3>" + extra + "<p>" + otmEsc(it.activity.prompt || "Match each one to what it means, then decorate the altar.") + "</p><div class='act'></div>";
wire();
otmKzActivity(bd, otmQ(pg, ".act"), it, P, function (gift) {
if (P[sk].indexOf(it.id) < 0) {
P[sk].push(it.id);
if (gift)
P.tr[it.id] = gift;
otmKzSave();
otmKzRoster(P);
}
var a = otmQ(pg, ".act");
a.insertAdjacentHTML("beforeend", "<div class='kp' style='border:3px solid " + it.color + "'><b>✨ A blessing</b><br>" + otmEsc(it.blessing) + "</div><button class='kb' data-go='" + sk + "'>Back to the " + (sk === "s1" ? "stars" : "wheel") + "</button>" + (gift ? "<button class='kb' data-go='treasure'>🎁 See it in My Treasures</button>" : ""));
wire();
otmKzCheer(bd, gift ? "🎁 " + otmEsc(it.activity.title) + " added to My Treasures!" : "✨ " + otmEsc(it.title) + " complete!");
});
}
OTM.kzPage = 0;
storyView();
return;
}
if (view === "s3") {
var ok = P.s1.length >= K.CHAPTERS.length && P.s2.length >= K.SABBATS.length;
if (!ok) {
pg.innerHTML = back + "<h3>🔒 The Final Trial</h3><div class='kp'>This station is still hidden. Finish every story in Temple Time Adventures and every sabbat on the Wheel of the Year to reveal it.</div>";
wire();
return;
}
if (P.cert) {
pg.innerHTML = back + otmKzCert(P.cert, K.QUIZ.length);
wire();
return;
}
var qi = 0, sc = 0;
function q() {
if (qi >= K.QUIZ.length) {
var T = K.CERT_TIERS.filter(function (t) { return sc / K.QUIZ.length >= t.min; })[0] || K.CERT_TIERS[K.CERT_TIERS.length - 1];
pg.innerHTML = "<h3>You scored " + sc + " out of " + K.QUIZ.length + "!</h3><p>That earns the title of</p><p style='font-size:20px;color:#FFE84A'>" + T.seal + " " + otmEsc(T.title) + "</p><p>What name should go on your certificate?</p><input class='cn' maxlength='40' value='" + otmEsc(P.name) + "'> <button class='kb ok'>Receive my certificate 🏆</button>";
otmQ(pg, ".ok").onclick = function () { P.cert = { name: (otmQ(pg, ".cn").value || P.name).replace(/[<>]/g, "").slice(0, 40), score: sc, at: Date.now() }; P.tr.cert = { type: "cert", title: T.title }; otmKzSave(); otmKzRoster(P); go("s3"); };
return;
}
var Q = K.QUIZ[qi];
pg.innerHTML = "<h3>🏆 The Final Trial</h3><div style='font-size:13px'>Question " + (qi + 1) + " of " + K.QUIZ.length + " · score " + sc + "</div><div class='kp' style='font-size:18px'>" + otmEsc(Q.q) + "</div>" + Q.options.map(function (o, i) { return "<button class='kb' data-o='" + i + "'>" + otmEsc(o) + "</button>"; }).join("") + "<div class='r'></div>";
pg.querySelectorAll("[data-o]").forEach(function (b) {
b.onclick = function () {
var i = +b.getAttribute("data-o"), right = i === Q.a;
if (right)
sc++;
pg.querySelectorAll("[data-o]").forEach(function (x) { x.disabled = true; if (+x.getAttribute("data-o") === Q.a)
x.style.background = "#2A9A4A"; });
otmQ(pg, ".r").innerHTML = "<p>" + (right ? "⭐ Yes!" : "Good try! The answer was: " + otmEsc(Q.options[Q.a])) + "</p><button class='kb nx'>" + (qi < K.QUIZ.length - 1 ? "Next question ▶" : "See my score ✨") + "</button>";
otmQ(pg, ".nx").onclick = function () { qi++; q(); };
};
});
}
pg.innerHTML = back + "<h3>🏆 The Final Trial</h3><div class='kp'>You've walked every story and turned the whole Wheel of the Year. Now let's see what you remember: " + K.QUIZ.length + " questions about the stories and the sabbats.</div><button class='kb st'>Begin the trial</button>";
wire();
otmQ(pg, ".st").onclick = q;
return;
}
if (view === "fam") {
var st = otmKzStage(pet.bond), lv = Math.floor((pet.bond || 0) / 10) + 1, dorm = Date.now() - pet.care >= 3 * 24 * 3600000, avg = (pet.hunger + pet.happy + pet.energy + pet.clean) / 4;
var mood = dorm ? "Dormant: resting" : avg >= 75 ? "Thriving" : avg >= 45 ? "Content" : "Struggling";
function bar(l, v, c) { return "<div style='display:flex;justify-content:space-between;font-size:14px'><span>" + l + "</span><span>" + Math.round(v) + "%</span></div><div class='bar'><div style='width:" + v + "%;background:" + c + "'></div></div>"; }
pg.innerHTML = back + "<h3>🐾 My Familiar</h3><p>Your companion misses you when you're away: check in and take care of them.</p><div style='display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start'><div class='kp' style='text-align:center;min-width:180px;position:relative'><div class='pt' style='cursor:pointer'>" + otmKzFamHtml(P, 110) + "</div>" + (pet.poo ? "<div style='position:absolute;right:12px;bottom:46px;font-size:28px'>💩</div>" : "") +
"<div style='font-weight:700;font-size:18px'>" + otmEsc(otmKzFamName(P)) + "</div><div style='font-size:14px'>" + otmEsc(st.label) + " · level " + lv + " · " + mood + "</div><div class='bar' style='margin-top:6px'><div style='width:" + ((pet.bond || 0) % 10) * 10 + "%;background:#FFE84A'></div></div></div>" +
"<div style='flex:1;min-width:220px'>" + bar("🍯 Hunger", pet.hunger, "#E8834C") + bar("💛 Happy", pet.happy, "#FFE84A") + bar("💤 Energy", pet.energy, "#8DA9C4") + bar("🛁 Clean", pet.clean, "#7AF0C8") +
"<button class='kb' data-ac='feed'>🍯 Feed</button><button class='kb' data-ac='play'>🧶 Play</button><button class='kb' data-ac='nap'>💤 Nap</button><button class='kb' data-ac='clean'>🛁 Scrub</button></div></div>" +
"<p>Rename: <input class='rn' maxlength='20' value='" + otmEsc(P.famName || "") + "' placeholder='" + otmEsc(fam.name) + "'> <button class='kb rnb'>Save the name</button></p><p>Colour: <select class='rc'>" + K.FAMILIAR_COLORS.map(function (c, i) { return "<option value='" + i + "'" + (i === (P.col || 0) ? " selected" : "") + ">" + otmEsc(c.name) + "</option>"; }).join("") + "</select></p>" +
"<p style='font-size:13px'>Each time you care for your familiar, your bond grows. Egg, then hatchling at 5, juvenile at 20, and fully grown at 50.</p>";
wire();
otmQ(pg, ".pt").onclick = function () { otmKzCheer(bd, otmEsc(otmKzFamName(P)) + ": " + otmPick(["💕", "Nuzzles you!", "Purrs happily.", "Wags with joy!", "Chirps a happy little song.", "Leans into your hand."])); };
pg.querySelectorAll("[data-ac]").forEach(function (b) {
b.onclick = function () {
var t = b.getAttribute("data-ac"), p = pet, s0 = otmKzStage(p.bond).key, l0 = Math.floor((p.bond || 0) / 10);
if (t === "feed") {
p.hunger = Math.min(100, p.hunger + 30);
if (!p.poo && Math.random() < 0.35)
p.poo = true;
}
else if (t === "play") {
p.happy = Math.min(100, p.happy + 25);
p.energy = Math.max(0, p.energy - 10);
}
else if (t === "nap")
p.energy = Math.min(100, p.energy + 30);
else {
p.clean = Math.min(100, p.clean + 35);
p.poo = false;
}
if (dorm) {
p.hunger = Math.min(100, p.hunger + 15);
p.happy = Math.min(100, p.happy + 15);
p.energy = Math.min(100, p.energy + 15);
p.clean = Math.min(100, p.clean + 15);
p.poo = false;
}
p.care = Date.now();
p.bond = (p.bond || 0) + 1;
otmKzSave();
go("fam");
otmKzCheer(OTM.panel, dorm ? "💫 Your familiar woke up happy to see you!" : s0 === "egg" && otmKzStage(p.bond).key !== "egg" ? "🐣 Your egg hatched! Say hello to your new companion!" : Math.floor(p.bond / 10) > l0 ? "🎉 Level up! Level " + (Math.floor(p.bond / 10) + 1) + "!" : { feed: "🍯 Yum, all fed!", play: "🧶 What a catch!", nap: "💤 Sweet dreams!", clean: "🛁 Squeaky clean!" }[t]);
if (otmKzStage(p.bond).key !== s0)
otmKzRoster(P);
};
});
otmQ(pg, ".rnb").onclick = function () { P.famName = (otmQ(pg, ".rn").value || "").replace(/[<>]/g, "").trim().slice(0, 20) || null; otmKzSave(); otmKzRoster(P); go("fam"); };
otmQ(pg, ".rc").onchange = function () { P.col = +this.value; otmKzSave(); otmKzRoster(P); go("fam"); };
return;
}
if (view === "talk") {
function thread() {
return (P.msgs || []).map(function (m) {
return "<div style='text-align:right;margin:6px 0'><span style='display:inline-block;background:#FF6AC8;border-radius:14px 14px 2px 14px;padding:6px 10px;max-width:80%'>" + otmEsc(m.text) + "</span></div>" +
(m.reply ? "<div style='margin:6px 0'><span style='display:inline-block;background:#4A2AC8;border-radius:14px 14px 14px 2px;padding:6px 10px;max-width:80%'>" + otmKzFamHtml(P, 18) + " " + otmEsc(m.reply) + "</span></div>" : "");
}).join("") || "<p>No notes yet. Say hello!</p>";
}
pg.innerHTML = "<button class='kb' data-go='fam'>← Back to My Familiar</button><h3>💌 Talk to your familiar</h3><p>Send a note to your guide. Your familiar writes back when the temple has read it: come back later to see.</p><div class='kp th' style='max-height:300px;overflow:auto'>" + thread() + "</div>" +
"<textarea class='tx' rows='2' maxlength='300' style='width:100%' placeholder='Write to " + otmEsc(otmKzFamName(P)) + "…'></textarea><button class='kb sd'>Send 💌</button>";
wire();
otmQ(pg, ".sd").onclick = function () {
var t = (otmQ(pg, ".tx").value || "").trim().slice(0, 300);
if (!t)
return;
var id = "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
P.msgs = (P.msgs || []).concat([{ id: id, text: t, at: Date.now(), reply: null }]).slice(-40);
otmKzSave();
otmQ(pg, ".tx").value = "";
otmQ(pg, ".th").innerHTML = thread();
otmKzCheer(bd, "💌 Message sent!");
otmKzRoster(P, { type: "message", messageId: id, profileId: P.id, profileName: P.name, contestName: P.contest || P.name, familiarName: otmKzFamName(P), text: t });
};
fetch(OTM_KZ_ROSTER + "?action=checkReplies&profileId=" + encodeURIComponent(P.id) + "&_t=" + Date.now()).then(function (r) { return r.json(); }).then(function (d) {
if (!d || !d.replies || !d.replies.length)
return;
var ch = false;
d.replies.forEach(function (r) { var m = (P.msgs || []).filter(function (x) { return x.id === r.messageId; })[0]; if (m && !m.reply && r.reply) {
m.reply = String(r.reply).slice(0, 600);
ch = true;
} });
if (ch) {
otmKzSave();
var th = otmQ(pg, ".th");
if (th)
th.innerHTML = thread();
otmKzCheer(bd, "💌 Your familiar wrote back!");
}
}).catch(function () { });
return;
}
if (view === "potion") {
var cau = OTM.kzCau || (OTM.kzCau = { c: [], s: 0 }), book = arg === "book";
function blend(h) { if (!h.length)
return "#3A2A6A"; var r = 0, g = 0, b = 0; h.forEach(function (x) { r += parseInt(x.slice(1, 3), 16); g += parseInt(x.slice(3, 5), 16); b += parseInt(x.slice(5, 7), 16); }); var f = function (v) { return ("0" + Math.round(v / h.length).toString(16)).slice(-2); }; return "#" + f(r) + f(g) + f(b); }
if (book) {
pg.innerHTML = "<button class='kb' data-go='potion'>← Back to the cauldron</button><h3>📖 The Recipe Book</h3><p>" + P.pot.length + " of " + K.RECIPES.length + " potions found. Brew " + 20 + " different potions to become a Potioneer!</p>" +
K.RECIPES.map(function (r, i) { var k = P.pot.indexOf(i) >= 0; return "<div class='kp' style='border-left:6px solid " + (k ? r.hex : "#666") + "'><b>" + (k ? r.emoji + " " + otmEsc(r.title) : "❓ A potion still to find") + "</b> <span style='font-size:13px'>" + r.ids.length + " ingredients</span><br>" + (k ? otmEsc(r.text) + "<br><span style='font-size:13px'>" + r.ids.map(function (x) { return K.INGREDIENTS[x].emoji; }).join(" ") + "</span>" : "<i>Clue: " + otmEsc(r.clue) + "</i>") + "</div>"; }).join("");
wire();
return;
}
var hx = blend(cau.c.map(function (i) { return K.INGREDIENTS[i].hex; }));
pg.innerHTML = back + "<h3>🧪 The Potion Mixer</h3><p>① Tap ingredients to add them to the cauldron: most recipes take 3, 4 or 5 exact ingredients. ② Tap Stir three times. ③ Tap Brew! to reveal your potion. Check the Recipe Book for clues!</p>" +
"<div style='text-align:center'><div style='display:inline-block;width:180px;height:120px;border-radius:0 0 90px 90px;background:#1A1A22;border:5px solid #444;position:relative;overflow:hidden'><div class='lq' style='position:absolute;left:0;right:0;bottom:0;height:" + (20 + cau.c.length * 14) + "%;background:" + hx + ";transition:all .5s'></div><div style='position:absolute;top:10px;left:0;right:0;font-size:24px'>" + cau.c.map(function (i) { return K.INGREDIENTS[i].emoji; }).join("") + "</div></div>" +
"<div>Stirred " + cau.s + " of 3</div><button class='kb sr'" + (cau.c.length ? "" : " disabled") + ">🥄 Stir</button><button class='kb br'" + (cau.c.length && cau.s >= 3 ? "" : " disabled") + ">✨ Brew!</button><button class='kb em'>Empty it</button><button class='kb' data-go='potion' data-a='book'>📖 Recipe Book</button></div><div class='res'></div>" +
"<div style='margin-top:8px'>" + K.INGREDIENTS.map(function (g, i) { return "<button class='kb' data-ing='" + i + "' style='background:" + g.hex + ";color:#1A0A3A;border-color:#fff' title='" + otmEsc(g.trait) + "'>" + g.emoji + " " + otmEsc(g.name) + "</button>"; }).join("") + "</div>";
wire();
pg.querySelectorAll("[data-ing]").forEach(function (b) { b.onclick = function () { if (cau.c.length >= 5) {
otmKzCheer(bd, "The cauldron is full! Stir and brew, or empty it.");
return;
} cau.c.push(+b.getAttribute("data-ing")); cau.s = 0; go("potion"); }; });
otmQ(pg, ".sr").onclick = function () { cau.s = Math.min(3, cau.s + 1); go("potion"); };
otmQ(pg, ".em").onclick = function () { OTM.kzCau = { c: [], s: 0 }; go("potion"); };
otmQ(pg, ".br").onclick = function () {
var same = function (a, b) { return a.length === b.length && a.slice().sort().join() === b.slice().sort().join(); }, R = K.RECIPES.filter(function (r) { return same(cau.c, r.ids); })[0];
P.brewed = (P.brewed || 0) + 1;
if (!R) {
var best = 0, tot = 0;
K.RECIPES.forEach(function (r) { var o = 0, cc = {}; cau.c.forEach(function (x) { cc[x] = (cc[x] || 0) + 1; }); r.ids.forEach(function (x) { if (cc[x] > 0) {
o++;
cc[x]--;
} }); if (o > best) {
best = o;
tot = r.ids.length;
} });
otmKzSave();
OTM.kzCau = { c: [], s: 0 };
go("potion");
otmQ(OTM.panel, ".res").innerHTML = "<div class='kp'>🌫️ <b>An unnamed brew…</b> It fizzles and smells of mystery." + (best ? " " + best + " of your ingredients belong in a " + tot + "-ingredient recipe. Try again!" : "") + "</div>";
return;
}
var i = K.RECIPES.indexOf(R), nw = P.pot.indexOf(i) < 0;
if (nw) {
P.pot.push(i);
P.tr["potion-" + i] = { type: "potion", title: R.title, hex: R.hex, emoji: R.emoji };
}
if (P.pot.length >= 20 && !P.potioneer)
P.potioneer = Date.now();
otmKzSave();
OTM.kzCau = { c: [], s: 0 };
go("potion");
otmQ(OTM.panel, ".res").innerHTML = "<div class='kp' style='border:4px solid " + R.hex + "'><span style='font-size:34px'>" + R.emoji + "</span> <b style='font-size:19px'>" + otmEsc(R.title) + "</b><br>" + otmEsc(R.text) + (nw ? "<br>🎁 New! Added to My Treasures." : "") + (P.potioneer && nw && P.pot.length === 20 ? "<br>🏅 Twenty potions! You are a Potioneer!" : "") + "</div>";
};
return;
}
if (view === "jar") {
var J = OTM.kzJar || (OTM.kzJar = { i: null, l: [] }), I = K.INTENTIONS.filter(function (x) { return x.id === J.i; })[0];
pg.innerHTML = back + "<h3>🫙 Spell Jar Builder</h3><p>① Choose an intention. ② Tap each charm to add its coloured layer: there are 6 to fill. ③ When it's full, tap Keep This Jar to save it to My Treasures forever.</p>" +
K.INTENTIONS.map(function (x) { return "<button class='kb" + (J.i === x.id ? " on" : "") + "' data-in='" + x.id + "'>" + x.emoji + " " + otmEsc(x.label) + "</button>"; }).join("") +
(I ? "<div style='display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;margin-top:10px'><div style='width:110px;height:170px;border:4px solid rgba(255,255,255,.8);border-top-width:14px;border-radius:12px 12px 26px 26px;display:flex;flex-direction:column-reverse;overflow:hidden;background:rgba(255,255,255,.08)'>" + J.l.map(function (k) { return "<div style='height:16.66%;background:" + I.charms[k].hex + "'></div>"; }).join("") + "</div>" +
"<div style='flex:1;min-width:200px'>" + I.charms.map(function (c, k) { return "<button class='kb' data-ch='" + k + "' style='background:" + c.hex + ";color:#1A0A3A;border-color:#fff'" + (J.l.length >= 6 ? " disabled" : "") + ">" + c.symbol + " " + otmEsc(c.label) + "</button>"; }).join("") +
"<div>" + (J.l.length >= 6 ? "<button class='kb kp2'>🎁 Keep This Jar</button>" : J.l.length + " of 6 layers") + " <button class='kb cl'>Start again</button></div></div></div>" : "");
wire();
pg.querySelectorAll("[data-in]").forEach(function (b) { b.onclick = function () { OTM.kzJar = { i: b.getAttribute("data-in"), l: [] }; go("jar"); }; });
pg.querySelectorAll("[data-ch]").forEach(function (b) { b.onclick = function () { if (J.l.length < 6)
J.l.push(+b.getAttribute("data-ch")); go("jar"); }; });
var kp = otmQ(pg, ".kp2");
if (kp)
kp.onclick = function () { P.tr["jar-" + J.i + "-" + Date.now()] = { type: "jar", title: "Spell Jar of " + I.label, colors: J.l.map(function (k) { return I.charms[k].hex; }) }; otmKzSave(); OTM.kzJar = { i: null, l: [] }; go("jar"); otmKzCheer(OTM.panel, "🎁 Spell Jar of " + otmEsc(I.label) + " added to My Treasures!"); };
var cl = otmQ(pg, ".cl");
if (cl)
cl.onclick = function () { J.l = []; go("jar"); };
return;
}
if (view === "wisdom") {
var d = new Date(), C = K.WISDOM_CARDS[(d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % K.WISDOM_CARDS.length];
function card(c, t) { return "<div class='kp' style='text-align:center;border:4px solid #FFE84A;max-width:340px;margin:10px auto'><div style='font-size:54px'>" + c.emoji + "</div><div style='font:700 19px Trebuchet MS,sans-serif;color:#FFE84A'>" + t + otmEsc(c.title) + "</div><div style='font-size:17px'>" + otmEsc(c.text) + "</div></div>"; }
pg.innerHTML = back + "<h3>🃏 Wisdom Draw</h3><p>One card, drawn just for today.</p>" + card(C, "Today's wisdom: ") + "<div style='text-align:center'><button class='kb bn'>Draw a bonus card</button></div><div class='bc'></div>";
wire();
otmQ(pg, ".bn").onclick = function () { otmQ(pg, ".bc").innerHTML = card(otmPick(K.WISDOM_CARDS), ""); };
return;
}
if (view === "book") {
pg.innerHTML = back + "<h3>📖 My Spellbook</h3><p>Write down a wish, a gratitude, or a little spell of your own.</p><select class='ty'><option>🌟 A wish</option><option>💛 A gratitude</option><option>✨ A little spell</option></select><textarea class='tx' rows='3' maxlength='400' style='width:100%;margin-top:6px'></textarea><button class='kb sv'>Write it in my spellbook</button>" +
(P.book || []).map(function (e) { return "<div class='kp'><div style='font-size:13px'>" + new Date(e.at).toLocaleDateString() + " · " + otmEsc(e.ty) + "</div>" + otmEsc(e.t) + "</div>"; }).join("");
wire();
otmQ(pg, ".sv").onclick = function () { var t = (otmQ(pg, ".tx").value || "").trim().slice(0, 400); if (!t)
return; P.book = [{ ty: otmQ(pg, ".ty").value, t: t, at: Date.now() }].concat(P.book || []).slice(0, 60); otmKzSave(); go("book"); otmKzCheer(OTM.panel, "✨ Written in your spellbook!"); };
return;
}
if (view === "treasure") {
var T = Object.keys(P.tr || {}).map(function (k) { return P.tr[k]; });
pg.innerHTML = back + "<h3>🎁 My Treasures</h3><p>Everything you've woven, forged, brewed and decorated along the way.</p>" + (T.length ? T.map(function (t) {
var pic = t.type === "potion" ? "<div style='font-size:40px'>" + t.emoji + "</div>" : t.type === "jar" || t.type === "chain" ? "<div style='display:flex;justify-content:center;gap:2px;margin:6px 0'>" + (t.colors || []).map(function (c) { return "<span style='width:14px;height:" + (t.type === "jar" ? 30 : 14) + "px;border-radius:" + (t.type === "jar" ? "3px" : "50%") + ";background:" + c + "'></span>"; }).join("") + "</div>" : t.type === "altar" ? "<div style='font-size:24px'>" + (t.decor || []).join(" ") + "</div>" : "<div style='font-size:40px'>🏆</div>";
return "<div class='kc' style='cursor:default'>" + pic + "<b style='font-size:14px'>" + otmEsc(t.title) + "</b></div>";
}).join("") : "<div class='kp'>Nothing yet! Brew a potion, fill a spell jar, or finish a story to earn your first treasure.</div>") +
(P.potioneer ? "<div class='kp' style='text-align:center;border:4px solid #7AF0C8'>🏅 <b>Certified Potioneer</b>: " + otmEsc(P.name) + " has brewed twenty different potions.</div>" : "") + (P.cert ? otmKzCert(P.cert, OTM_KZ.QUIZ.length) : "");
wire();
return;
}
go("hub");
},
function (c, n) {
var K = OTM_KZ, T = K.CERT_TIERS.filter(function (t) { return c.score / n >= t.min; })[0] || K.CERT_TIERS[K.CERT_TIERS.length - 1];
return "<div style='margin:10px auto;max-width:520px;padding:20px;border:6px double " + T.accent + ";border-radius:14px;background:#FFF8E8;color:#2A1A4A;text-align:center;font-family:Georgia,serif'><div style='font-size:13px;letter-spacing:.2em'>TEMPLE OF THE OBSIDIAN MOON · CYBER TEMPLE</div><div style='font-size:46px'>" + T.seal + "</div>" +
"<div style='font-size:15px'>This certifies that</div><div style='font-size:28px;font-weight:700;margin:4px 0'>" + otmEsc(c.name) + "</div><div style='font-size:15px'>is named</div><div style='font-size:22px;color:#5A2A8A;font-weight:700'>" + otmEsc(T.title) + "</div><div style='font-size:15px'>" + otmEsc(T.line) + "</div>" +
"<div style='font-size:13px;margin-top:8px'>" + c.score + " of " + n + " · " + new Date(c.at).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) + "</div></div>";
},
function (bd, el, it, P, done) {
var a = it.activity, t = a.type, fin = false;
function end(g) { if (fin)
return; fin = true; done(g); }
function opt(lbl, i, st) { return "<button class='kb' data-i='" + i + "'" + (st ? " style='" + st + "'" : "") + ">" + lbl + "</button>"; }
if (t === "braveryTrial") {
var k = 0, fire = 1;
(function step() {
if (k >= a.statements.length) {
el.innerHTML = "<div style='font-size:" + (30 + fire * 12) + "px;text-align:center'>🔥</div><div class='kp'>" + otmEsc(a.finalMessage) + "</div>";
end(null);
return;
}
var S = a.statements[k];
el.innerHTML = "<div style='font-size:" + (30 + fire * 12) + "px;text-align:center'>🔥</div><div class='kp' style='font-size:18px'>" + otmEsc(S.text) + "</div>" + opt("✅ True", 1) + opt("❌ False", 0) + "<div class='fb'></div>";
el.querySelectorAll("[data-i]").forEach(function (b) {
b.onclick = function () {
var ok = (b.getAttribute("data-i") === "1") === S.answer;
if (ok)
fire++;
el.querySelectorAll("[data-i]").forEach(function (x) { x.disabled = true; });
otmQ(el, ".fb").innerHTML = "<p>" + (ok ? "🔥 The flame grows! " : "") + otmEsc(S.feedback) + "</p><button class='kb nx'>Next ▶</button>";
otmQ(el, ".nx").onclick = function () { k++; step(); };
};
});
})();
return;
}
if (t === "guidedGrow") {
var g = 0;
(function step() {
if (g >= a.stages.length) {
var L = a.stages[a.stages.length - 1], fe = (L.options.filter(function (o) { return o.correct; })[0] || {}).emoji || "🌳";
el.innerHTML = "<div style='font-size:70px;text-align:center'>" + fe + "</div><div class='kp'>It grew, all the way! ✨</div>";
end(null);
return;
}
var S = a.stages[g];
el.innerHTML = "<div style='font-size:60px;text-align:center'>" + S.emoji + "</div><div class='kp'>" + otmEsc(S.caption) + "<br><b>" + otmEsc(S.question) + "</b></div><div style='text-align:center'>" + S.options.map(function (o, i) { return opt("<span style='font-size:34px'>" + o.emoji + "</span>", i); }).join("") + "</div><div class='fb'></div>";
el.querySelectorAll("[data-i]").forEach(function (b) { b.onclick = function () { if (S.options[+b.getAttribute("data-i")].correct) {
g++;
step();
}
else
otmQ(el, ".fb").innerHTML = "<p>Not quite: try another! 🌱</p>"; }; });
})();
return;
}
if (t === "quizChain") {
var q = 0, got = [];
(function step() {
var chain = "<div style='display:flex;justify-content:center;gap:4px;margin:8px 0;min-height:22px'>" + got.map(function (c) { return "<span style='width:20px;height:20px;border-radius:50%;background:" + c + ";border:2px solid #fff'></span>"; }).join("") + "</div>";
if (q >= a.questions.length) {
el.innerHTML = chain + "<div class='kp'>Your " + otmEsc(a.itemName || "treasure") + " is complete! ✨</div>";
end({ type: "chain", title: it.activity.title, colors: got });
return;
}
var Q = a.questions[q];
el.innerHTML = chain + "<div class='kp' style='font-size:18px'>" + otmEsc(Q.prompt) + "</div>" + Q.options.map(function (o, i) { return opt(otmEsc(o.label), i); }).join("") + "<div class='fb'></div>";
el.querySelectorAll("[data-i]").forEach(function (b) { b.onclick = function () { var o = Q.options[+b.getAttribute("data-i")]; if (o.correct) {
got.push(o.hex || "#FFE84A");
q++;
step();
}
else
otmQ(el, ".fb").innerHTML = "<p>Hmm, not that one. Try again!</p>"; }; });
})();
return;
}
if (t === "sequenceOrder") {
var n = 0, sh = otmShuffle(a.steps);
(function step() {
el.innerHTML = "<div class='kp'>" + (n ? a.steps.slice(0, n).map(function (s, i) { return (i + 1) + ". " + otmEsc(s); }).join("<br>") : "Tap the first step!") + "</div>" + sh.map(function (s, i) { return a.steps.indexOf(s) < n ? "" : opt(otmEsc(s), i); }).join("") + "<div class='fb'></div>";
if (n >= a.steps.length) {
el.insertAdjacentHTML("beforeend", "<div class='kp'>⭐ A perfect superhero routine!</div>");
end(null);
return;
}
el.querySelectorAll("[data-i]").forEach(function (b) { b.onclick = function () { if (a.steps.indexOf(sh[+b.getAttribute("data-i")]) === n) {
n++;
step();
}
else
otmQ(el, ".fb").innerHTML = "<p>Not yet: what comes before that?</p>"; }; });
})();
return;
}
function match(pairs, after) {
var left = otmShuffle(pairs.map(function (p, i) { return i; })), right = otmShuffle(pairs.map(function (p, i) { return i; })), sel = null, ok = [];
(function draw() {
el.innerHTML = "<div style='display:flex;gap:10px;flex-wrap:wrap'><div style='flex:1;min-width:150px'>" + left.map(function (i) { return "<button class='kb' data-l='" + i + "' style='display:block;width:100%;text-align:left;" + (ok.indexOf(i) >= 0 ? "background:#2A9A4A;" : sel === i ? "background:#FF6AC8;" : "") + "'" + (ok.indexOf(i) >= 0 ? " disabled" : "") + ">" + otmEsc(pairs[i].a) + "</button>"; }).join("") + "</div>" +
"<div style='flex:1;min-width:150px'>" + right.map(function (i) { return "<button class='kb' data-r='" + i + "' style='display:block;width:100%;text-align:left;" + (ok.indexOf(i) >= 0 ? "background:#2A9A4A;" : "") + "'" + (ok.indexOf(i) >= 0 ? " disabled" : "") + ">" + otmEsc(pairs[i].b) + "</button>"; }).join("") + "</div></div><div class='fb'>" + (sel == null ? "Pick one from the left side." : "Now pick its match on the right.") + "</div>";
el.querySelectorAll("[data-l]").forEach(function (b) { b.onclick = function () { sel = +b.getAttribute("data-l"); draw(); }; });
el.querySelectorAll("[data-r]").forEach(function (b) { b.onclick = function () { if (sel == null)
return; if (+b.getAttribute("data-r") === sel) {
ok.push(sel);
sel = null;
if (ok.length === pairs.length) {
after();
return;
}
draw();
}
else {
sel = null;
draw();
otmQ(el, ".fb").innerHTML = "Not a match: try again!";
} }; });
})();
}
if (t === "matchPairs") {
match(a.pairs, function () { el.innerHTML = "<div class='kp'>⭐ Every match found!</div>"; end(null); });
return;
}
if (t === "pathThenMatch") {
var seen = {};
(function draw() {
el.innerHTML = a.paths.map(function (p, i) { return opt(p.emoji + " " + otmEsc(p.label) + (seen[i] ? " ✓" : ""), i); }).join("") + "<div class='fb'></div>" + (Object.keys(seen).length >= a.paths.length ? "<button class='kb mm'>Now match them ✨</button>" : "");
el.querySelectorAll("[data-i]").forEach(function (b) { b.onclick = function () { var i = +b.getAttribute("data-i"); seen[i] = 1; draw(); otmQ(el, ".fb").innerHTML = "<div class='kp'>" + a.paths[i].emoji + " " + otmEsc(a.paths[i].text) + "</div>"; }; });
var mm = otmQ(el, ".mm");
if (mm)
mm.onclick = function () { match(a.pairs, function () { el.innerHTML = "<div class='kp'>⭐ You know every path's gift!</div>"; end(null); }); };
})();
return;
}
if (t === "altarPath") {
match(a.pairs, function () {
var put = [];
(function draw() {
el.innerHTML = "<p>Now decorate the altar! Tap each thing to place it.</p><div class='kp' style='text-align:center;min-height:70px;font-size:36px;background:linear-gradient(#5A3A2A,#3A2418);border-radius:10px'>" + (put.length ? put.join(" ") : "<span style='font-size:15px'>the altar is waiting</span>") + "</div>" +
it.decor.map(function (d, i) { return put.indexOf(d.emoji) >= 0 ? "" : opt(d.emoji + " " + otmEsc(d.name), i); }).join("") + "<div class='fb'></div>";
el.querySelectorAll("[data-i]").forEach(function (b) {
b.onclick = function () {
var d = it.decor[+b.getAttribute("data-i")];
put.push(d.emoji);
draw();
otmQ(el, ".fb").innerHTML = "<p>" + d.emoji + " " + otmEsc(d.meaning) + "</p>";
if (put.length >= it.decor.length) {
el.insertAdjacentHTML("beforeend", "<div class='kp'>🕯️ " + otmEsc(it.title) + "'s altar is complete!</div>");
end({ type: "altar", title: a.title, decor: put.slice() });
}
};
});
})();
});
return;
}
el.innerHTML = "<p>✨</p>";
end(null);
},
function (k) {
return otmCanvasMat("pspines" + k, 256, 64, function (c, W, H) {
var x = 0, i = 0;
while (x < W) {
var w = 6 + ((i * 7 + k * 3) % 7), h = H - ((i * 5 + k) % 14);
c.fillStyle = ["#5A1A1A", "#1A2A4A", "#2A3A1A", "#4A3A1A", "#1A1A1A", "#6A4A2A", "#3A1A3A", "#7A5A2A"][(i + k) % 8];
c.fillRect(x, H - h, w - 1, h);
c.fillStyle = "#C8A050";
c.fillRect(x + 1, H - h + 6, w - 3, 2);
c.fillRect(x + 1, H - 12, w - 3, 2);
x += w;
i++;
}
});
},
function (w, h, g, wood) {
var wd = wood || otmWoodM("walnut"), lite = OTM.lite, n = Math.max(3, Math.round((h - 0.5) / 0.42));
otmBox(w, h, 0.06, wd, 0, h / 2, -0.2, g);
otmBox(0.06, h, 0.44, wd, -w / 2 + 0.03, h / 2, 0, g);
otmBox(0.06, h, 0.44, wd, w / 2 - 0.03, h / 2, 0, g);
otmBox(w + 0.12, 0.14, 0.5, wd, 0, h + 0.07, 0.02, g);
otmBox(w + 0.08, 0.16, 0.46, wd, 0, 0.08, 0.02, g);
if (!lite)
otmBox(w + 0.14, 0.03, 0.52, otmM("gold"), 0, h - 0.02, 0.03, g);
for (var s = 0; s < n; s++) {
var yy = 0.18 + s * (h - 0.3) / n;
otmBox(w - 0.1, 0.03, 0.4, wd, 0, yy, 0, g);
if (!lite || s % 2 === 0)
otmBox(w - 0.16, 0.3, 0.24, otmSpinesM(s % 4), 0, yy + 0.17, 0.0, g);
}
},
function (x, z, ry, w, parent, o) {
o = o || {};
var g = otmGroup(x, 0, z, ry, parent), mb = otmMat(o.stone || 0xD8D0C8, "marble", { phong: 80 }), dk = otmMat(0x0A0808, null), lite = OTM.lite;
[-1, 1].forEach(function (s) { otmBox(0.34, 1.3, 0.36, mb, s * (w / 2 + 0.17), 0.65, 0.1, g); if (!lite)
for (var f = 0; f < 3; f++)
otmBox(0.04, 1.1, 0.02, otmMat(0xB8B0A8, "marble"), s * (w / 2 + 0.17) + (f - 1) * 0.08, 0.65, 0.29, g); });
otmBox(w + 0.7, 0.36, 0.38, mb, 0, 1.48, 0.1, g);
otmBox(w + 1.0, 0.08, 0.52, mb, 0, 1.7, 0.14, g);
if (!lite)
otmBox(w + 0.5, 0.05, 0.02, otmM("gold"), 0, 1.48, 0.3, g);
otmBox(w, 1.3, 0.06, dk, 0, 0.65, -0.16, g);
otmBox(0.06, 1.3, 0.32, dk, -w / 2 + 0.03, 0.65, 0, g);
otmBox(0.06, 1.3, 0.32, dk, w / 2 - 0.03, 0.65, 0, g);
otmBox(w + 1.2, 0.06, 0.8, otmMat(0x1A1618, "marble", { phong: 60 }), 0, 0.03, 0.5, g);
var ir = otmM("iron");
otmBox(w * 0.6, 0.05, 0.28, ir, 0, 0.18, 0, g);
[-1, 1].forEach(function (s) { otmCyl(0.03, 0.32, ir, s * w * 0.32, 0.16, 0.18, g, 5); otmSph(0.05, otmM("gold"), s * w * 0.32, 0.34, 0.18, g, 6); });
for (var l = 0; l < 3; l++) {
var lg = otmCyl(0.07, w * 0.5, otmMat(0x3A2614, "bark"), 0, 0.27 + l * 0.06, 0.02 - l * 0.04, g, 6);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = (l - 1) * 0.2;
}
otmFlame(-0.15, 0.3, 0.02, 2.4, 0xFF8A30, g);
otmFlame(0.2, 0.3, 0, 2.0, 0xFFA040, g);
if (!lite)
otmFlame(0, 0.32, -0.05, 1.6, 0xFFB050, g);
if (o.pic)
otmPainting(o.pic, o.seed || 0, 0, 2.75, -0.06, 0, o.pw || 1.5, o.ph || 1.0, g);
if (o.sticks !== false)
[-1, 1].forEach(function (s) { otmCyl(0.06, 0.04, otmM("gold"), s * (w / 2 + 0.25), 1.76, 0.14, g, 8); otmCyl(0.02, 0.3, otmM("gold"), s * (w / 2 + 0.25), 1.9, 0.14, g, 6); otmCandle(s * (w / 2 + 0.25), 2.05, 0.14, 0.9, g); });
return g;
},
function (x, z, ry, vel, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony"), v = otmVelvetM(vel || "crimson"), gd = otmM("gold");
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { otmCyl(0.04, 0.5, wd, p[0] * 0.3, 0.25, p[1] * 0.28, g, 6); });
otmBox(0.72, 0.1, 0.66, wd, 0, 0.52, 0, g);
otmBox(0.64, 0.08, 0.58, v, 0, 0.6, 0.02, g);
otmBox(0.72, 1.5, 0.08, wd, 0, 1.3, -0.3, g);
otmBox(0.56, 1.2, 0.04, v, 0, 1.25, -0.25, g);
var arch = otmCyl(0.36, 0.08, wd, 0, 2.05, -0.3, g, 16);
arch.rotation.x = Math.PI / 2;
arch.scale.set(1, 1, 0.8);
var cr = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 6, 18, Math.PI * 1.3), gd);
cr.position.set(0, 2.32, -0.3);
cr.rotation.z = -0.65;
g.add(cr);
[-1, 1].forEach(function (s) { otmBox(0.07, 0.32, 0.6, wd, s * 0.36, 0.72, -0.02, g); otmBox(0.1, 0.05, 0.66, wd, s * 0.36, 0.9, 0, g); otmSph(0.05, gd, s * 0.36, 0.93, 0.32, g, 6); otmCyl(0.04, 0.3, gd, s * 0.36, 1.95, -0.3, g, 6); otmSph(0.06, gd, s * 0.36, 2.12, -0.3, g, 6); });
return g;
},
function (x, z, ry, vel, parent) {
var g = otmGroup(x, 0, z, ry, parent), v = otmVelvetM(vel || "crimson"), wd = otmWoodM("mahog");
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { otmCyl(0.035, 0.22, wd, p[0] * 0.32, 0.11, p[1] * 0.3, g, 6); });
otmBox(0.8, 0.22, 0.72, v, 0, 0.32, 0, g);
otmBox(0.66, 0.1, 0.6, v, 0, 0.48, 0.04, g);
otmBox(0.8, 0.85, 0.16, v, 0, 0.85, -0.3, g);
[-1, 1].forEach(function (s) { otmBox(0.12, 0.5, 0.26, v, s * 0.36, 0.95, -0.18, g); var a = otmCyl(0.08, 0.62, v, s * 0.36, 0.58, 0.02, g, 8); a.rotation.x = Math.PI / 2; otmBox(0.12, 0.2, 0.62, v, s * 0.36, 0.48, 0.02, g); });
var top = otmCyl(0.4, 0.16, v, 0, 1.24, -0.3, g, 12);
top.rotation.x = Math.PI / 2;
top.scale.set(1, 1, 0.4);
otmRound(x, z, 0.45, 0, 1.3);
return g;
},
function (x, z, parent, what) {
var g = otmGroup(x, 0, z, 0, parent), wd = otmWoodM("mahog");
otmCyl(0.32, 0.04, wd, 0, 0.62, 0, g, 16);
otmCyl(0.04, 0.56, wd, 0, 0.32, 0, g, 6);
otmCyl(0.2, 0.04, wd, 0, 0.03, 0, g, 10);
if (what === "decanter") {
otmSph(0.09, otmMat(0x5A0A1A, null, { op: 0.75, phong: 120 }), 0, 0.74, 0, g, 10);
otmCyl(0.025, 0.12, otmMat(0x9AA0B0, null, { op: 0.5 }), 0, 0.86, 0, g, 6);
[-0.15, 0.15].forEach(function (o) { otmCyl(0.03, 0.08, otmMat(0xC8C8D8, null, { op: 0.5 }), o, 0.68, 0.1, g, 8, 0.015); otmCyl(0.006, 0.06, otmMat(0xC8C8D8, null, { op: 0.5 }), o, 0.67 - 0.04, 0.1, g, 4); });
}
else if (what === "book") {
otmBox(0.26, 0.05, 0.2, otmMat(0x3A0E14, null), 0.04, 0.67, 0, g);
otmCandle(-0.14, 0.64, 0.08, 0.9, g);
}
otmRound(x, z, 0.34, 0, 0.8);
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("mahog"), gd = otmM("gold");
otmBox(0.58, 0.5, 0.4, wd, 0, 0.25, 0, g);
otmBox(0.44, 1.2, 0.3, wd, 0, 1.1, 0, g);
otmBox(0.56, 0.66, 0.38, wd, 0, 2.03, 0, g);
otmBox(0.62, 0.12, 0.42, wd, 0, 2.42, 0, g);
var face = otmCanvasMat("clockface", 128, 128, function (c, W, H) {
c.fillStyle = "#E8DCC0";
c.fillRect(0, 0, W, H);
c.fillStyle = "#1A2A5A";
c.beginPath();
c.arc(W / 2, 30, 40, Math.PI, 0);
c.fill();
c.fillStyle = "#E8E4D0";
c.beginPath();
c.arc(W / 2 - 14, 26, 10, 0, 6.3);
c.fill();
c.strokeStyle = "#2A1A0A";
c.lineWidth = 2;
c.beginPath();
c.arc(W / 2, 72, 44, 0, 6.3);
c.stroke();
c.fillStyle = "#2A1A0A";
c.font = "bold 11px serif";
c.textAlign = "center";
["XII", "III", "VI", "IX"].forEach(function (n, i) { var a = i * Math.PI / 2 - Math.PI / 2; c.fillText(n, W / 2 + Math.cos(a) * 34, 76 + Math.sin(a) * 34); });
c.lineWidth = 3;
c.beginPath();
c.moveTo(W / 2, 72);
c.lineTo(W / 2 + 18, 58);
c.moveTo(W / 2, 72);
c.lineTo(W / 2 - 4, 40);
c.stroke();
});
otmPlane(0.42, 0.42, face, 0, 2.06, 0.2, 0, g);
otmBox(0.5, 0.04, 0.02, gd, 0, 1.83, 0.2, g);
otmBox(0.2, 0.7, 0.01, otmMat(0x1A100A, null, { op: 0.55 }), 0, 1.15, 0.16, g);
var pd = otmCyl(0.07, 0.015, gd, 0, 0.9, 0.14, g, 12);
pd.rotation.x = Math.PI / 2;
otmSph(0.05, gd, 0, 2.52, 0, g, 8);
[-1, 1].forEach(function (s) { otmSph(0.035, gd, s * 0.26, 2.5, 0.1, g, 6); });
return g;
},
function (x, z, parent) {
var g = otmGroup(x, 0, z, 0, parent), wd = otmWoodM("walnut"), br = otmMat(0xB8923A, "metal", { phong: 80 });
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2, l = otmLimb([Math.cos(a) * 0.32, 0, Math.sin(a) * 0.32], [Math.cos(a) * 0.1, 0.62, Math.sin(a) * 0.1], 0.03, 0.025, wd, g, 5); });
var hz = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.03, 6, 28), wd);
hz.rotation.x = Math.PI / 2;
hz.position.y = 0.95;
g.add(hz);
var gl = otmSph(0.38, otmCanvasMat("globe2", 256, 128, function (c, W, H) {
c.fillStyle = "#C8B888";
c.fillRect(0, 0, W, H);
c.fillStyle = "#7A8A5A";
[[40, 40, 30, 20], [60, 80, 16, 26], [130, 40, 40, 22], [140, 80, 20, 24], [200, 50, 30, 18], [210, 96, 16, 10]].forEach(function (e, i) { c.beginPath(); c.ellipse(e[0], e[1], e[2], e[3], i, 0, 6.3); c.fill(); });
c.strokeStyle = "rgba(90,60,30,0.4)";
for (var k = 0; k < W; k += 21) {
c.beginPath();
c.moveTo(k, 0);
c.lineTo(k, H);
c.stroke();
}
for (var j = 0; j < H; j += 16) {
c.beginPath();
c.moveTo(0, j);
c.lineTo(W, j);
c.stroke();
}
}), 0, 0.95, 0, g, OTM.lite ? 14 : 22);
gl.rotation.z = 0.41;
var mr = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.012, 4, 30), br);
mr.position.y = 0.95;
mr.rotation.z = 0.41;
g.add(mr);
otmRound(x, z, 0.45, 0, 1.4);
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony"), gd = otmM("gold"), sv = otmMat(0xC8CCD8, "metal", { phong: 100 });
otmBox(1.6, 0.9, 0.5, wd, 0, 0.45, 0, g);
otmBox(1.5, 1.4, 0.4, wd, 0, 1.6, -0.04, g);
otmBox(1.68, 0.12, 0.54, wd, 0, 2.36, 0, g);
otmBox(1.4, 1.26, 0.01, otmMat(0x9AA8C0, null, { op: 0.22, phong: 160 }), 0, 1.6, 0.17, g);
otmBox(0.03, 1.3, 0.03, gd, 0, 1.6, 0.18, g);
otmBox(1.4, 1.26, 0.02, otmVelvetM("midnight"), 0, 1.6, -0.22, g);
otmBox(1.42, 0.02, 0.34, wd, 0, 1.6, -0.04, g);
otmCyl(0.05, 0.04, sv, -0.45, 0.95, 0, g, 10);
otmCyl(0.012, 0.12, sv, -0.45, 1.03, 0, g, 6);
otmCyl(0.07, 0.1, sv, -0.45, 1.14, 0, g, 12, 0.035);
otmCyl(0.07, 0.12, gd, 0.45, 1.0, 0, g, 12, 0.03);
otmCyl(0.008, 0.08, gd, 0.45, 1.1, 0, g, 5);
var bl = otmBox(0.04, 0.01, 0.3, sv, -0.45, 1.66, 0, g);
bl.rotation.y = 0.6;
var hl = otmBox(0.05, 0.03, 0.12, otmMat(0x0A0808, null), -0.45 + 0.1, 1.67, 0.14, g);
hl.rotation.y = 0.6;
var wn = otmCyl(0.012, 0.4, otmWoodM("walnut"), 0, 1.66, 0, g, 5);
wn.rotation.z = Math.PI / 2;
otmSph(0.025, otmMat(0xC8D8FF, null, { e: 0x4A5A8A, ei: 0.8 }), 0.21, 1.66, 0, g, 6);
var pent = otmCanvasMat("pentacle", 64, 64, function (c, W, H) { c.fillStyle = "#C8A050"; c.beginPath(); c.arc(32, 32, 30, 0, 6.3); c.fill(); c.strokeStyle = "#2A1A0A"; c.lineWidth = 2.4; c.beginPath(); c.arc(32, 32, 26, 0, 6.3); c.stroke(); c.beginPath(); for (var i = 0; i < 6; i++) {
var a = -Math.PI / 2 + i * Math.PI * 4 / 5;
c.lineTo(32 + Math.cos(a) * 24, 32 + Math.sin(a) * 24);
} c.stroke(); }, { basic: true, op: 0.999 });
otmPlane(0.26, 0.26, pent, 0.45, 1.75, -0.18, 0, g);
otmSph(0.08, otmMat(0xC8D8FF, null, { op: 0.6, e: 0x3A4A8A, ei: 0.7 }), 0, 2.12, 0.0, g, 12);
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("mahog"), gd = otmM("gold"), L = 2.6, lite = OTM.lite;
otmBox(L + 0.1, 0.07, 1.1, wd, 0, 0.79, 0, g);
otmBox(L - 0.4, 0.006, 0.8, otmMat(0x1E3A24, null), 0, 0.83, 0, g);
if (!lite)
otmBox(L - 0.36, 0.008, 0.84, gd, 0, 0.826, 0, g);
[-1, 1].forEach(function (s) {
otmBox(0.62, 0.72, 0.96, wd, s * (L / 2 - 0.36), 0.39, 0, g);
otmBox(0.68, 0.06, 1.0, wd, s * (L / 2 - 0.36), 0.03, 0, g);
for (var d = 0; d < 3; d++) {
[-1, 1].forEach(function (f) { otmBox(0.5, 0.17, 0.02, otmWoodM("walnut"), s * (L / 2 - 0.36), 0.6 - d * 0.21, f * 0.49, g); otmSph(0.02, gd, s * (L / 2 - 0.36), 0.6 - d * 0.21, f * 0.505, g, 6); });
}
});
otmBox(L - 1.36, 0.4, 0.04, wd, 0, 0.56, 0, g);
var bk = otmGroup(0.1, 0.83, 0.1, 0, g);
[-1, 1].forEach(function (s) { var p = otmBox(0.24, 0.012, 0.34, otmMat(0xE8DCC0, null), s * 0.12, 0.02, 0, bk); p.rotation.z = -s * 0.08; });
otmBox(0.5, 0.02, 0.36, otmMat(0x3A0E14, null), 0, 0.005, 0, bk);
otmCyl(0.035, 0.05, otmMat(0x0A0A1A, null, { op: 0.8, phong: 120 }), 0.55, 0.86, 0.25, g, 8);
var q = otmBox(0.01, 0.32, 0.03, otmMat(0xF0ECE0, null), 0.58, 0.98, 0.25, g);
q.rotation.z = -0.4;
otmCyl(0.07, 0.03, gd, -0.6, 0.84, -0.25, g, 10);
otmCyl(0.02, 0.24, gd, -0.6, 0.96, -0.25, g, 6);
otmCandle(-0.6, 1.08, -0.25, 1, g);
otmCyl(0.07, 0.03, gd, 0.95, 0.84, -0.3, g, 10);
otmCyl(0.015, 0.32, gd, 0.95, 1.0, -0.3, g, 6);
var sh = otmCyl(0.08, 0.1, otmMat(0x1A5A2A, null, { e: 0x0A4A14, ei: 1 }), 0.95, 1.16, -0.22, g, 10, 0.13);
sh.rotation.x = 0.25;
otmCyl(0.06, 0.06, gd, -0.95, 0.86, 0.2, g, 8, 0.08);
otmSph(0.11, otmMat(0xC8D8FF, null, { op: 0.6, e: 0x3A4A8A, ei: 0.8 }), -0.95, 0.99, 0.2, g, 14);
if (!lite) {
var sk = otmSph(0.09, otmMat(0xD8CCB0, null), -0.3, 0.92, -0.38, g, 10);
sk.scale.set(1, 0.95, 1.15);
otmBox(0.1, 0.05, 0.08, otmMat(0xD8CCB0, null), -0.3, 0.86, -0.32, g);
[0, 1, 2].forEach(function (i) { var l = otmBox(0.2, 0.004, 0.14, otmMat(0xE0D4B8, null), 0.55, 0.835 + i * 0.006, -0.3, g); l.rotation.y = i * 0.2; });
}
return g;
},
function (x, z, ry, vel, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony"), v = otmVelvetM(vel || "violet"), gd = otmM("gold"), W = 2.2, L = 2.5, H = 2.9, lite = OTM.lite;
otmBox(W, 0.34, L, wd, 0, 0.3, 0, g);
otmBox(W - 0.1, 0.26, L - 0.14, otmMat(0xE8E0D4, null), 0, 0.6, 0.03, g);
otmBox(W + 0.04, 0.12, L - 0.6, v, 0, 0.78, 0.32, g);
otmBox(W + 0.08, 0.4, 0.05, v, 0, 0.55, L / 2 - 0.0, g);
[-1, 1].forEach(function (s) { otmBox(0.05, 0.4, L - 0.6, v, s * (W / 2 + 0.02), 0.55, 0.32, g); });
if (!lite)
otmBox(W + 0.06, 0.02, 0.1, gd, 0, 0.85, -0.02, g);
[-0.5, 0.5].forEach(function (o) { var p = otmBox(0.7, 0.18, 0.4, otmMat(0xEEE8E0, null), o, 0.82, -L / 2 + 0.4, g); p.rotation.x = -0.3; });
otmBox(W, 1.5, 0.1, wd, 0, 1.2, -L / 2, g);
otmBox(W - 0.4, 1.0, 0.04, v, 0, 1.3, -L / 2 + 0.07, g);
var hb = new THREE.Mesh(new THREE.CylinderGeometry(W / 2, W / 2, 0.1, lite ? 12 : 24, 1, false, -Math.PI / 2, Math.PI), wd);
hb.rotation.x = Math.PI / 2;
hb.position.set(0, 1.95, -L / 2);
hb.scale.set(1, 1, 0.45);
g.add(hb);
var cr = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 6, 18, Math.PI * 1.3), gd);
cr.position.set(0, 1.95, -L / 2 + 0.08);
cr.rotation.z = -0.65;
g.add(cr);
otmBox(W, 0.5, 0.08, wd, 0, 0.55, L / 2 + 0.02, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { var px = p[0] * (W / 2 + 0.02), pz = p[1] * (L / 2 + 0.02); otmCyl(0.07, H, wd, px, H / 2, pz, g, 8); if (!lite)
for (var r = 0; r < 3; r++)
otmCyl(0.085, 0.05, gd, px, 0.6 + r * 0.9, pz, g, 8); otmSph(0.09, gd, px, H + 0.08, pz, g, 8); });
otmBox(W + 0.2, 0.06, L + 0.2, wd, 0, H, 0, g);
otmBox(W - 0.1, 0.02, L - 0.1, v, 0, H - 0.03, 0, g);
[[0, -1, W + 0.24, 0.06], [0, 1, W + 0.24, 0.06]].forEach(function (e) { otmBox(e[2], 0.3, e[3], v, 0, H - 0.17, e[1] * (L / 2 + 0.1), g); });
[-1, 1].forEach(function (s) { otmBox(0.06, 0.3, L + 0.24, v, s * (W / 2 + 0.1), H - 0.17, 0, g); if (!lite)
otmBox(0.07, 0.03, L + 0.26, gd, s * (W / 2 + 0.1), H - 0.33, 0, g); });
if (!lite)
otmBox(W + 0.26, 0.03, 0.07, gd, 0, H - 0.33, L / 2 + 0.1, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { var c = otmCyl(0.16, H - 0.45, otmMat(otmShade((OTM_V_HEX[vel] || 0x3A1A4A), 0.08).getHex(), null), p[0] * (W / 2 - 0.08), (H - 0.45) / 2 + 0.1, p[1] * (L / 2 - 0.1), g, 8, 0.1); c.scale.set(1, 1, 0.7); otmCyl(0.12, 0.05, gd, p[0] * (W / 2 - 0.08), 1.3, p[1] * (L / 2 - 0.1), g, 8); });
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony"), gd = otmM("gold");
otmBox(0.5, 0.6, 0.42, wd, 0, 0.3, 0, g);
otmBox(0.54, 0.04, 0.46, wd, 0, 0.62, 0, g);
otmBox(0.42, 0.18, 0.02, otmWoodM("walnut"), 0, 0.45, 0.21, g);
otmSph(0.02, gd, 0, 0.45, 0.225, g, 6);
otmCyl(0.06, 0.03, gd, 0.1, 0.65, 0, g, 8);
otmCandle(0.1, 0.665, 0, 0.9, g);
otmBox(0.18, 0.04, 0.14, otmMat(0x1A2A4A, null), -0.1, 0.66, 0.04, g);
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony"), gd = otmM("gold");
otmBox(1.8, 2.4, 0.62, wd, 0, 1.3, 0, g);
otmBox(1.92, 0.16, 0.7, wd, 0, 2.58, 0, g);
otmBox(1.86, 0.12, 0.66, wd, 0, 0.06, 0, g);
var arc = otmCyl(0.6, 0.1, wd, 0, 2.66, 0, g, 16, 0.6);
arc.rotation.x = Math.PI / 2;
arc.scale.set(1, 1, 0.4);
[-1, 1].forEach(function (s) { otmBox(0.8, 2.1, 0.03, otmWoodM("walnut"), s * 0.43, 1.3, 0.32, g); otmBox(0.56, 1.4, 0.01, otmMat(0x4A4A5A, null, { phong: 160, spec: 0xC8C8D8 }), s * 0.43, 1.45, 0.34, g); otmCyl(0.015, 0.2, gd, s * 0.08, 1.3, 0.36, g, 5); });
otmSph(0.07, gd, 0, 2.86, 0, g, 8);
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony"), gd = otmM("gold");
otmBox(1.3, 0.06, 0.55, wd, 0, 0.76, 0, g);
[-1, 1].forEach(function (s) { otmBox(0.4, 0.7, 0.5, wd, s * 0.43, 0.38, 0, g); otmCyl(0.03, 0.7, wd, s * 0.6, 0.38, 0.2, g, 6); });
var mi = otmCyl(0.42, 0.02, otmMat(0x9A9AB0, null, { phong: 160, spec: 0xFFFFFF }), 0, 1.55, -0.2, g, 24);
mi.rotation.x = Math.PI / 2;
mi.scale.set(0.8, 1, 1.15);
var fr = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.035, 6, 28), gd);
fr.position.set(0, 1.55, -0.18);
fr.scale.set(0.8, 1.15, 1);
g.add(fr);
[[-0.4, 0x6A1A3A], [-0.28, 0x2A6A5A], [0.35, 0x8A6A2A]].forEach(function (b) { otmCyl(0.035, 0.14, otmMat(b[1], null, { op: 0.8, phong: 120 }), b[0], 0.86, 0.05, g, 8); otmSph(0.03, gd, b[0], 0.95, 0.05, g, 6); });
otmCandle(0.5, 0.79, -0.1, 0.9, g);
otmCyl(0.07, 0.03, gd, 0.5, 0.785, -0.1, g, 8);
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("ebony");
[-1, 0, 1].forEach(function (i) { var p = otmGroup(i * 0.62, 0, Math.abs(i) * 0.14, i * 0.35, g); otmBox(0.6, 1.8, 0.04, wd, 0, 0.95, 0, p); otmPlane(0.5, 1.5, otmPaintMat(["winter", "lake", "mountains"][i + 1], 3), 0, 1.0, 0.025, 0, p); otmPlane(0.5, 1.5, otmDamaskMat("violet"), 0, 1.0, -0.025, Math.PI, p); });
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), cu = otmMat(0xB86A3A, "metal", { phong: 90 }), gd = otmM("gold");
var tub = otmCyl(0.42, 0.5, cu, 0, 0.5, 0, g, 18, 0.36);
tub.scale.set(1, 1, 2.0);
otmCyl(0.44, 0.04, cu, 0, 0.75, 0, g, 18).scale.set(1, 1, 2.0);
otmCyl(0.37, 0.01, otmMat(0x2A4A5A, null, { phong: 140, op: 0.85 }), 0, 0.7, 0, g, 18).scale.set(1, 1, 1.95);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { otmSph(0.06, gd, p[0] * 0.26, 0.12, p[1] * 0.6, g, 6); otmCyl(0.03, 0.16, gd, p[0] * 0.26, 0.22, p[1] * 0.6, g, 5); });
otmCyl(0.02, 0.3, gd, 0, 0.9, -0.86, g, 6);
var sp = otmCyl(0.02, 0.18, gd, 0, 1.04, -0.78, g, 6);
sp.rotation.x = Math.PI / 2;
return g;
},
function (x, z, parent) {
var g = otmGroup(x, 0, z, 0, parent), wd = otmWoodM("ebony"), br = otmMat(0xB8923A, "metal", { phong: 80 }), lite = OTM.lite;
otmCyl(0.45, 0.12, wd, 0, 0.06, 0, g, 12);
otmCyl(0.12, 0.9, wd, 0, 0.55, 0, g, 10, 0.18);
otmCyl(0.3, 0.08, wd, 0, 1.02, 0, g, 12);
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2; otmLimb([Math.cos(a) * 0.28, 1.05, Math.sin(a) * 0.28], [Math.cos(a) * 0.6, 1.5, Math.sin(a) * 0.6], 0.025, 0.02, br, g, 5); });
var hz = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.03, 6, lite ? 24 : 40), br);
hz.rotation.x = Math.PI / 2;
hz.position.y = 1.7;
g.add(hz);
var as = otmGroup(0, 1.7, 0, 0, g);
as.userData.keep = 1;
as.rotation.z = 0.41;
[[0.74, 0, 0], [0.74, Math.PI / 2, 0], [0.66, 0, Math.PI / 2], [0.6, 0.41, Math.PI / 2 + 0.41]].forEach(function (r, i) { var ring = new THREE.Mesh(new THREE.TorusGeometry(r[0], i === 3 ? 0.05 : 0.02, 6, lite ? 24 : 40), br); ring.rotation.set(r[2], r[1], 0); as.add(ring); });
otmCyl(0.012, 1.7, br, 0, 0, 0, as, 5);
otmSph(0.12, otmMat(0xE8B040, null, { e: 0x8A5A10, ei: 0.9 }), 0, 0, 0, as, 12);
otmSph(0.04, otmMat(0x7A8AC8, null), 0.6, 0, 0, as, 8);
otmRound(x, z, 0.9, 0, 2.6);
return as;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), br = otmMat(0xB8923A, "metal", { phong: 90 }), wd = otmWoodM("walnut");
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2; otmLimb([Math.cos(a) * 0.4, 0, Math.sin(a) * 0.4], [0, 1.2, 0], 0.025, 0.02, wd, g, 5); });
var t = otmCyl(0.07, 1.4, br, 0, 1.45, -0.15, g, 10, 0.05);
t.rotation.x = -1.0;
otmCyl(0.09, 0.12, br, 0, 1.75, -0.66, g, 10).rotation.x = -1.0;
otmRound(x, z, 0.45, 0, 1.8);
return g;
},
function (x, y, z, ry, parent) {
var g = otmGroup(x, y, z, ry, parent), gd = otmM("gold");
var gl = otmCyl(0.55, 0.03, otmMat(0x06060C, null, { phong: 180, spec: 0xFFFFFF }), 0, 0, 0.03, g, 28);
gl.rotation.x = Math.PI / 2;
gl.scale.set(1, 1, 1.5);
var fr = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.07, 8, 36), otmWoodM("ebony"));
fr.scale.set(1, 1.5, 1);
fr.position.z = 0.04;
g.add(fr);
var fr2 = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.02, 6, 36), gd);
fr2.scale.set(1, 1.48, 1);
fr2.position.z = 0.06;
g.add(fr2);
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2;
otmSph(0.045, otmM("silver"), Math.cos(a) * 0.72, Math.sin(a) * 1.06, 0.07, g, 8);
}
var gw = (typeof wGlow === "function") ? wGlow(0x6A5AC8, 1.8, 0.12) : null;
if (gw) {
gw.position.z = 0.1;
g.add(gw);
}
return g;
},
function (x, z, ry, w, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("walnut"), gd = otmM("gold"), lite = OTM.lite;
otmBox(w, 0.95, 0.55, wd, 0, 0.48, 0, g);
otmBox(w + 0.06, 0.05, 0.6, wd, 0, 0.97, 0, g);
var nd = Math.round(w / 0.32);
for (var r = 0; r < 3; r++)
for (var d = 0; d < nd; d++) {
otmBox(w / nd - 0.04, 0.24, 0.02, otmWoodM("mahog"), -w / 2 + (d + 0.5) * w / nd, 0.2 + r * 0.28, 0.28, g);
if (!lite)
otmSph(0.015, gd, -w / 2 + (d + 0.5) * w / nd, 0.2 + r * 0.28, 0.295, g, 5);
}
otmBox(w, 1.6, 0.05, wd, 0, 1.8, -0.24, g);
otmBox(0.06, 1.6, 0.32, wd, -w / 2 + 0.03, 1.8, -0.1, g);
otmBox(0.06, 1.6, 0.32, wd, w / 2 - 0.03, 1.8, -0.1, g);
otmBox(w + 0.1, 0.12, 0.4, wd, 0, 2.66, -0.08, g);
for (var s = 0; s < 3; s++) {
var yy = 1.15 + s * 0.5;
otmBox(w - 0.1, 0.03, 0.3, wd, 0, yy, -0.1, g);
for (var j = 0; j < Math.floor(w / 0.18); j++) {
if (lite && j % 2)
continue;
var jc = [0x3A6A3A, 0x6A3A1A, 0xC8C0A0, 0x2A3A6A, 0x6A1A3A, 0x8A7A3A][(j + s * 2) % 6];
otmCyl(0.055, 0.16 + ((j + s) % 3) * 0.04, otmMat(jc, null, { op: 0.8, phong: 100 }), -w / 2 + 0.14 + j * 0.18, yy + 0.1, -0.1, g, 8);
}
}
return g;
},
function (x, z, ry, parent) {
var g = otmGroup(x, 0, z, ry, parent), wd = otmWoodM("walnut"), gl = otmMat(0xB8D8C8, null, { op: 0.45, phong: 160 }), cu = otmMat(0xB86A3A, "metal", { phong: 80 });
otmBox(1.8, 0.08, 0.7, wd, 0, 0.86, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { otmBox(0.08, 0.84, 0.08, wd, p[0] * 0.84, 0.42, p[1] * 0.3, g); });
otmBox(1.7, 0.04, 0.6, wd, 0, 0.2, 0, g);
otmCyl(0.16, 0.3, otmMat(0x3A2E26, "brick"), -0.5, 1.05, 0, g, 10);
otmFlame(-0.5, 1.2, 0.12, 0.9, 0xFF8A30, g);
otmSph(0.13, gl, -0.5, 1.35, 0, g, 12);
otmCyl(0.02, 0.4, gl, -0.3, 1.5, 0, g, 6).rotation.z = -1.1;
otmSph(0.08, otmMat(0x5A8A3A, null, { op: 0.7, e: 0x1A3A0A, ei: 0.8 }), -0.5, 1.32, 0, g, 10);
otmSph(0.1, gl, 0.15, 1.0, 0.05, g, 10);
otmCyl(0.015, 0.3, gl, 0.3, 1.12, 0.05, g, 5).rotation.z = -0.9;
otmCyl(0.09, 0.1, otmMat(0x8A847A, "stone"), 0.6, 0.95, 0.1, g, 10, 0.07);
var pe = otmCyl(0.015, 0.2, otmMat(0x8A847A, "stone"), 0.62, 1.04, 0.1, g, 5);
pe.rotation.z = 0.4;
return g;
},
function () {
var ok = otmPriestOk(), lite = OTM.lite;
var O = otmRoom({ x0: -32, z0: -26, x1: -14, z1: -14, h: 6, name: "the High Priest's office", key: "office", floor: otmMat(0x2A1A10, "wood", { phong: 30 }), wall: otmMat(0x2A1E16, "wood"), ceil: otmMat(0x1A120C, "wood"),
doors: { e: [{ at: -20, w: 1.6, h: 2.6 }], n: [{ at: -23, w: 1.4, h: 2.5 }], w: [{ at: -20, w: 1.4, h: 2.4, bare: 1 }] } });
otmGreatDesk(-24.4, -20, Math.PI / 2);
otmSolid(-24.4, -20, 0.6, 1.4, 0, 0.9);
otmThrone(-26.0, -20, Math.PI / 2);
otmSolid(-26.0, -20, 0.42, 0.42, 0, 2.3);
otmMoonDisc(O.x1 - 0.24, 3.9, -20, 0.8, -Math.PI / 2);
otmSpot(-22.6, -19.4, 1.4, "📜 The High Priest's ledger", "read", function () { otmLedger(); });
otmWingChair(-22.2, -21.7, -0.9, "crimson");
otmWingChair(-22.2, -18.3, -2.24, "crimson");
otmSpot(-21.6, -21.6, 1.2, "🕯️ Counsel with the High Priest", "ask for a session", function () { if (!otmWixOn("counsel"))
return otmWixShut("counsel"); otmCounselOpen(); });
otmSpot(-12.6, -16.4, 1.2, "🕯️ Counsel with the High Priest", "ask for a session", function () { if (!otmWixOn("counsel"))
return otmWixShut("counsel"); otmCounselOpen(); });
[[-23.1, 4.5], [-16.85, 4.5]].forEach(function (b) { var g = otmGroup(O.x0 + 0.45, 0, b[0], Math.PI / 2); otmBookcase(b[1], 2.4, g, otmWoodM("walnut")); otmSolid(O.x0 + 0.45, b[0], 0.3, b[1] / 2, 0, 2.6); });
otmSecret({ id: "passage", kind: "bookcase", dir: "z", at: -20, c: -31.7, y: 0, w: 1.4, h: 2.4, face: 1, name: "The bookcase rolls aside: a narrow passage runs off into the walls",
hint: "📚 A bookcase: one of its books is not a book" });
otmFireplace(-23, O.z1 - 0.38, Math.PI, 1.6, null, { pic: "temple", seed: 2, pw: 1.8, ph: 1.2 });
otmSolid(-23, O.z1 - 0.5, 1.5, 0.5, 0, 1.8);
otmWingChair(-24.7, -16.9, 0.66, "green");
otmWingChair(-21.3, -16.9, -0.66, "green");
otmSideTable(-23, -16.5, null, "decanter");
otmToolCabinet(-28, O.z0 + 0.47, 0);
otmSolid(-28, O.z0 + 0.42, 0.85, 0.34, 0, 2.4);
otmLongcase(-19.6, O.z0 + 0.42, 0);
otmSolid(-19.6, O.z0 + 0.4, 0.32, 0.24, 0, 2.6);
otmGlobe(-16.2, -24.2);
otmPainting("portrait", 0, O.x1 - 0.22, 2.7, -24.0, -Math.PI / 2, 0.9, 1.2);
otmPainting("portrait", 3, O.x1 - 0.22, 2.7, -16.0, -Math.PI / 2, 0.9, 1.2);
otmPainting("stars", 1, -16.6, 3.1, O.z0 + 0.22, 0, 1.4, 1.0);
[[O.x1 - 0.6, O.z0 + 0.6], [O.x1 - 0.6, O.z1 - 0.6]].forEach(function (p) { otmCandelabrum(p[0], 0, p[1]); });
if (!ok) {
var lk = otmBox(0.1, 2.6, 1.6, otmMat(0x1A0E08, "wood"), -14.15, 1.3, -20);
otmSolid(-14.2, -20, 0.3, 0.9, 0, 2.6);
otmSpot(-12.6, -20, 1.8, "🔒 The High Priest's door", "try the handle", function () { otmSay("🔒 <b>The High Priest's door is locked.</b> " + (otmCfg().priest === "coven" ? "It opens for the coven." : "The High Priest keeps these rooms private today.")); });
}
var S = otmRoom({ x0: -32, z0: -38, x1: -14, z1: -26, h: 6, name: "the High Priest's study", key: "study", floor: otmMat(0x2A1A10, "wood", { phong: 30 }), wall: otmMat(0x1E1A22, "plaster"), ceil: otmMat(0x14101A, "plaster"),
doors: { s: [{ at: -23, w: 1.4, h: 2.5 }], w: [{ at: -32, w: 1.4, h: 2.5 }] } });
OTM.astro = otmArmillary(S.cx, S.cz + 0.4);
otmSpot(S.cx + 1.4, S.cz + 0.4, 1.5, "🔭 The armillary sphere", "read the sky", function () { otmMoonCard(); });
otmApothecary(-28.6, S.z0 + 0.5, 0, 3.6);
otmSolid(-28.6, S.z0 + 0.45, 1.82, 0.32, 0, 2.7);
otmMoonWindow(-22.6, 3.2, S.z0 + 0.22, 0, 2);
otmTelescope(-22.6, S.z0 + 1.6, 0);
otmAlchemyBench(-17.4, S.z0 + 0.6, 0);
otmSolid(-17.4, S.z0 + 0.6, 0.95, 0.4, 0, 1.6);
otmScryMirror(S.x1 - 0.26, 1.9, -29.0, -Math.PI / 2);
otmSpot(S.x1 - 1.5, -29.0, 1.5, "🪞 The scrying mirror", "look into it", function () { otmMoonCard(); });
otmFireplace(S.x1 - 0.38, -34.4, -Math.PI / 2, 1.4, null, { pic: "sea", seed: 2, pw: 1.5, ph: 1.0 });
otmSolid(S.x1 - 0.5, -34.4, 0.5, 1.4, 0, 1.8);
otmWingChair(-17.0, -35.9, 0.99, "midnight");
otmWingChair(-17.0, -32.9, 2.15, "midnight");
otmSideTable(-17.4, -34.4, null, "book");
(function () {
var tx = -28.2, tz = -31.2, wd = otmWoodM("mahog"), g = otmGroup(tx, 0, tz, 0);
otmBox(1.2, 0.07, 2.4, wd, 0, 0.78, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { otmCyl(0.05, 0.75, wd, p[0] * 0.5, 0.38, p[1] * 1.08, g, 6); });
otmPlane(0.9, 0.7, otmPaintMat("stars", 3), 0, 0.82, -0.4, 0, g).rotation.x = -Math.PI / 2;
otmBox(0.22, 0.06, 0.3, otmMat(0x3A0E14, null), 0.3, 0.84, -0.75, g);
otmBox(0.2, 0.05, 0.28, otmMat(0x1A2A4A, null), -0.25, 0.84, 0.6, g);
otmCyl(0.06, 0.03, otmM("gold"), 0.35, 0.83, 0.5, g, 8);
otmCandle(0.35, 0.845, 0.5, 1, g);
otmSolid(tx, tz, 0.62, 1.22, 0, 0.9);
})();
(function () {
var dx = -17.2, dz = S.z1 - 0.52, wd = otmWoodM("mahog"), g = otmGroup(dx, 0, dz, Math.PI);
otmBox(1.5, 0.78, 0.6, wd, 0, 0.39, 0, g);
otmBox(1.56, 0.05, 0.66, wd, 0, 0.8, 0.03, g);
otmBox(1.5, 0.9, 0.3, wd, 0, 1.28, -0.15, g);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 5; c++)
otmBox(0.25, 0.36, 0.02, otmMat(0x0E0806, null), -0.6 + c * 0.3, 1.06 + r * 0.42, 0.01, g);
otmBox(1.6, 0.08, 0.34, wd, 0, 1.77, -0.13, g);
var lt = otmBox(0.3, 0.005, 0.22, otmMat(0xC8B890, null), 0.2, 0.83, 0.15, g);
lt.rotation.y = -0.3;
otmBox(0.1, 0.006, 0.08, otmMat(0x1A1210, null), 0.32, 0.835, 0.2, g);
otmCandle(-0.5, 0.83, 0.2, 1, g);
otmSolid(dx, dz, 0.78, 0.36, 0, 1.8);
otmSpot(dx, dz - 1.2, 1.4, "📜 A letter, half burnt", "read what is left", function () {
worldCard(worldFacts("📜 A letter, half burnt", "the edges black, the ink brown", [], ["\u2026 and so the founders laid down three bottles that are never to be drunk.", "One for each age of the hidden arts, as the moon has her ages: the year the craft first grew into the light, the year it stood full, and the year it began to wane and was written down so it should not be lost.", "Who would go where the founders went must turn them in the moon's own order: first as she grows, then as she stands full, then as she wanes.", "The cellar book keeps their years. Burn this \u2026", "(the rest is ash)"]), {});
});
})();
otmPainting("mountains", 2, S.x0 + 0.22, 2.8, -35.4, Math.PI / 2, 1.3, 0.9);
[[S.x0 + 0.6, S.z1 - 0.6]].forEach(function (p) { otmCandelabrum(p[0], 0, p[1]); });
var A = otmRoom({ x0: -46, z0: -38, x1: -32, z1: -26, h: 6, name: "the High Priest's apartment", key: "apartment", floor: otmMat(0x2A1010, "wood", { phong: 30 }), wall: otmMat(0x2A1A24, "plaster"), ceil: otmMat(0x140A12, "plaster"),
doors: { e: [{ at: -32, w: 1.4, h: 2.5 }] } });
otmGrandBed(A.x0 + 1.6, -32, Math.PI / 2, "violet");
otmSolid(A.x0 + 1.55, -32, 1.35, 1.2, 0, 2.9);
otmNightstand(A.x0 + 0.5, -34.0, Math.PI / 2);
otmNightstand(A.x0 + 0.5, -30.0, Math.PI / 2);
otmSolid(A.x0 + 0.5, -34.0, 0.3, 0.3, 0, 0.8);
otmSolid(A.x0 + 0.5, -30.0, 0.3, 0.3, 0, 0.8);
otmPainting("stars", 0, A.x0 + 0.22, 3.9, -32, Math.PI / 2, 1.6, 1.0);
otmSpot(A.x0 + 3.8, -32, 1.6, "🛏️ The High Priest's bed", "rest a while", function () { otmSay("🛏️ You lie back under the violet hangings. The temple creaks and settles round you like an old ship."); });
(function () {
var g = otmGroup(-43.4, 0, A.z0 + 0.5, 0), wd = otmWoodM("ebony");
otmBox(1.3, 0.95, 0.5, wd, 0, 0.48, 0, g);
otmBox(1.4, 0.05, 0.56, otmMat(0x3A1A4A, null), 0, 0.98, 0, g);
otmMoonDisc(0, 1.75, -0.2, 0.38, 0, g);
[-0.45, 0.45].forEach(function (o) { otmCyl(0.05, 0.04, otmM("gold"), o, 1.02, 0.05, g, 8); otmCandle(o, 1.04, 0.05, 1.1, g, 0x18141C); });
otmCyl(0.08, 0.06, otmM("gold"), 0, 1.03, 0.1, g, 10);
otmSph(0.05, otmMat(0xD8D0E8, null, { op: 0.3 }), 0, 1.15, 0.1, g, 8);
otmSolid(-43.4, A.z0 + 0.45, 0.68, 0.3, 0, 1.2);
})();
otmVanity(-39.4, A.z0 + 0.5, 0);
otmSolid(-39.4, A.z0 + 0.45, 0.68, 0.3, 0, 1.9);
otmWardrobe(-34.6, A.z0 + 0.56, 0);
otmSolid(-34.6, A.z0 + 0.52, 0.98, 0.36, 0, 2.9);
otmFireplace(-40.6, A.z1 - 0.38, Math.PI, 1.3, null, { pic: "lake", seed: 3, pw: 1.3, ph: 0.9 });
otmSolid(-40.6, A.z1 - 0.5, 1.35, 0.5, 0, 1.8);
otmWingChair(-42.0, -28.7, 0.6, "violet");
otmWingChair(-39.2, -28.7, -0.6, "violet");
otmClawBath(-34.6, A.z1 - 1.3, Math.PI / 2);
otmSolid(-34.6, A.z1 - 1.3, 0.95, 0.5, 0, 1.0);
otmScreen(-36.1, A.z1 - 1.4, Math.PI / 2);
otmSolid(-36.1, A.z1 - 1.4, 0.2, 1.0, 0, 1.9);
otmPainting("portrait", 1, A.x1 - 0.22, 2.7, -35.3, -Math.PI / 2, 0.9, 1.2);
[[A.x1 - 0.6, A.z0 + 1.6]].forEach(function (p) { otmCandelabrum(p[0], 0, p[1]); });
var pw = otmMat(0x2A2624, "stone"), pf = otmMat(0x1E1A18, "stone");
otmRoom({ x0: -46.8, z0: -21.2, x1: -32, z1: -18.8, h: 2.6, name: "the passage in the walls", key: "passage", floor: pf, wall: pw, ceil: pw, doors: { e: [{ at: -20, w: 1.4, h: 2.4, bare: 1 }], w: [{ at: -20, w: 1.4, h: 2.3, bare: 1 }] } });
otmRoom({ x0: -49.6, z0: -66, x1: -46.8, z1: -18.8, h: 2.6, name: "the passage in the walls", key: "passage", floor: pf, wall: pw, ceil: pw, doors: { e: [{ at: -20, w: 1.4, h: 2.3, bare: 1 }], n: [{ at: -48.2, w: 1.4, h: 2.3, bare: 1 }] } });
for (var c = 0; c < (lite ? 6 : 12); c++) {
var cz = -24 - c * 3.6;
otmCandle(-47.2, 1.2, cz, 0.9);
}
otmCandle(-36, 1.2, -19.2, 0.9);
otmCandle(-42, 1.2, -20.8, 0.9);
otmSign(["→ the woods"], 0.8, 0.22, "#1E1A18", "#8A8478", -48.2, 2.1, -65.4, 0);
},
function () {
var lite = OTM.lite, G = otmP(), W = OTM_WOODS;
var gs = lite ? 40 : 80, geo = new THREE.PlaneGeometry(W.x1 - W.x0, W.z1 - W.z0, gs, gs);
geo.rotateX(-Math.PI / 2);
var pos = geo.attributes.position, cols = [];
for (var i = 0; i < pos.count; i++) {
var x = pos.getX(i) + (W.x0 + W.x1) / 2, z = pos.getZ(i) + (W.z0 + W.z1) / 2;
pos.setY(i, otmWoodsY(x, z));
var n = (typeof wFbm === "function") ? wFbm(x * 0.05, z * 0.05, 7, 3) : 0.5;
cols.push(0.06 + n * 0.05, 0.08 + n * 0.07, 0.05 + n * 0.03);
}
geo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
geo.computeVertexNormals();
var gm = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
gm.position.set((W.x0 + W.x1) / 2, 0, (W.z0 + W.z1) / 2);
G.add(gm);
var pm = otmMat(0x2A2418, "earth");
for (var p = 0; p < 26; p++) {
var t = p / 25, px = -48.2 + (0 + 48.2) * t + Math.sin(t * 5) * 4, pz = -70 + (-140 + 70) * t;
var seg = otmBox(2.2, 0.04, 3.4, pm, px, otmWoodsY(px, pz) + 0.03, pz);
seg.rotation.y = Math.cos(t * 5) * 0.3;
}
var nT = lite ? 110 : 260, pine = new THREE.ConeGeometry(2.2, 8, 7), trunk = new THREE.CylinderGeometry(0.22, 0.35, 4, 6), oakB = new THREE.CylinderGeometry(0.1, 0.25, 4, 5);
var IP = new THREE.InstancedMesh(pine, new THREE.MeshLambertMaterial({ color: 0x0E1A12 }), nT), IT = new THREE.InstancedMesh(trunk, new THREE.MeshLambertMaterial({ color: 0x1E1812 }), nT);
var m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc = new THREE.Vector3(), rnd = (typeof wRand === "function") ? wRand(29102026) : Math.random, k = 0;
OTM.trees = [];
for (var tries = 0; tries < nT * 6 && k < nT; tries++) {
var x = W.x0 + 4 + rnd() * (W.x1 - W.x0 - 8), z = W.z0 + 4 + rnd() * (W.z1 - W.z0 - 10);
if (Math.hypot(x, z + 140) < 22)
continue;
if (otmNearPath(x, z) < 4)
continue;
if (z > -74)
continue;
var s = 0.8 + rnd() * 0.9, y = otmWoodsY(x, z);
v.set(x, y + 2 * s, z);
q.identity();
sc.set(s, s, s);
m4.compose(v, q, sc);
IT.setMatrixAt(k, m4);
v.set(x, y + (4 + 3.6) * s, z);
sc.set(s * (0.8 + rnd() * 0.4), s * (1 + rnd() * 0.5), s * (0.8 + rnd() * 0.4));
m4.compose(v, q, sc);
IP.setMatrixAt(k, m4);
OTM.trees.push({ x: x, z: z, r: 0.45 * s });
k++;
}
IP.count = k;
IT.count = k;
IP.instanceMatrix.needsUpdate = true;
IT.instanceMatrix.needsUpdate = true;
G.add(IP);
G.add(IT);
OTM.trees.forEach(function (T) { otmRound(T.x, T.z, T.r, -2, 8); });
for (var st = 0; st < 13; st++) {
var a = st / 13 * Math.PI * 2, sx = Math.cos(a) * 12, sz = -140 + Math.sin(a) * 12, sy = otmWoodsY(sx, sz), hh = 2.4 + ((st * 7) % 4) * 0.5;
var stone = otmBox(1.1, hh, 0.7, otmMat(0x5A5852, "stone"), sx, sy + hh / 2 - 0.2, sz);
stone.rotation.y = -a;
if (st === 9) {
stone.rotation.z = Math.PI / 2.1;
stone.position.y = sy + 0.4;
}
otmRound(sx, sz, 0.7, sy - 1, hh);
}
var alt = otmBox(2.2, 0.8, 1.2, otmMat(0x4A4844, "stone"), 0, otmWoodsY(0, -140) + 0.4, -140);
otmSolid(0, -140, 1.1, 0.6, -1, 1.2);
otmSpot(0, -137.4, 3, "🪨 The stone circle", "stand in the ring", function () { otmSay(otmSamhainOn() ? "🔥 <b>The Samhain fire.</b> The coven's fire burns in the ring. On this night, the old Irish said, the doors between the worlds stand open, and the dead come home to the hearth." : "🪨 The stones stand in their ring, older than the temple. The moss on them is soft and cold. Somewhere an owl."); }, { y: otmWoodsY(0, -137.4) });
var moon = otmSph(14, otmGlowM(0xE8ECFF), 60, 70, -420, G, 24);
var mh = (typeof wGlow === "function") ? wGlow(0xB8C8FF, 80, 0.3) : null;
if (mh) {
mh.position.set(60, 70, -418);
G.add(mh);
}
OTM.mist = [];
for (var mi = 0; mi < (lite ? 10 : 26); mi++) {
var mx = W.x0 + (mi * 53) % (W.x1 - W.x0), mz = W.z0 + (mi * 97) % (W.z1 - W.z0), ms = (typeof wGlow === "function") ? wGlow(0x8A94A8, 22, 0.08) : null;
if (ms) {
ms.position.set(mx, otmWoodsY(mx, mz) + 1.2, mz);
ms.material.blending = THREE.NormalBlending;
G.add(ms);
OTM.mist.push({ s: ms, ph: mi });
}
}
OTM.flies = [];
for (var fi = 0; fi < (lite ? 8 : 20); fi++) {
var fl = (typeof wGlow === "function") ? wGlow(0xC8FF8A, 0.5, 0.6) : null;
if (fl) {
var fx = -30 + fi * 3.1, fz = -90 - fi * 4;
fl.position.set(fx, 1.5, fz);
G.add(fl);
OTM.flies.push({ s: fl, x: fx, z: fz, ph: fi * 1.7 });
}
}
var ivy = otmMat(0x1A2A14, "foliage");
for (var iv = 0; iv < (lite ? 6 : 14); iv++)
otmSph(0.6 + ((iv * 7) % 3) * 0.2, ivy, -48.2 - 2 + ((iv * 13) % 40) / 10, 0.8 + ((iv * 7) % 25) / 10, -67.7, G, 6).scale.z = 0.35;
otmSecret({ id: "woodsdoor", kind: "panel", dir: "x", at: -48.2, c: -67.5, y: 0, w: 1.4, h: 2.4, face: -1, name: "The ivy-hung stone swings in: the passage in the walls", hint: "🌿 Ivy hangs thick over the temple's back wall here",
when: function () { var p = otmProg(); return (p.found && p.found.passage) || otmKeeper() ? "" : "🌿 Only stone and ivy, cold and wet. If there is a door here, it does not open from this side."; } });
otmSign(["Temple Row →", "the road round to the temple's front"], 2.6, 0.6, "#141210", "#C8C0A8", 70, 1.8, -80, -Math.PI / 2);
otmSpot(74, -78, 4, "🛤️ The path round the temple", "walk back to Temple Row", function () { otmLeave(); }, { y: otmWoodsY(74, -78) });
OTK.floorsFn = otmWoodsY;
},
function (dt, t) {
(OTM.mist || []).forEach(function (M) { M.s.material.opacity = 0.06 + 0.03 * Math.sin(t * 0.3 + M.ph); });
(OTM.flies || []).forEach(function (F) { F.s.position.set(F.x + Math.sin(t * 0.4 + F.ph) * 2.4, 1.2 + Math.sin(t * 0.7 + F.ph) * 0.6, F.z + Math.cos(t * 0.35 + F.ph) * 2.4); F.s.material.opacity = 0.35 + 0.25 * Math.sin(t * 0.9 + F.ph); });
},
function () {
if (!otmSamhainOn())
return;
var lite = OTM.lite;
var x = 0, z = -26.8;
otmBox(6, 0.9, 1.0, otmMat(0x0A080A, null), x, 0.45, z);
otmBox(6.2, 0.04, 1.2, otmMat(0x3A1A06, null), x, 0.92, z);
otmSolid(x, z, 3.1, 0.6, 0, 1);
for (var f = 0; f < (lite ? 5 : 9); f++) {
var fx = x - 2.6 + f * 0.65;
otmBox(0.34, 0.44, 0.04, otmM("gold"), fx, 1.18, z - 0.3).rotation.x = -0.15;
otmBox(0.26, 0.34, 0.02, otmMat([0x3A3430, 0x4A443C, 0x2A2622][f % 3], null), fx, 1.18, z - 0.28).rotation.x = -0.15;
}
for (var a = 0; a < (lite ? 4 : 8); a++)
otmSph(0.08, otmMat(a % 2 ? 0xB82A1A : 0x8A1A2A, null, { phong: 60 }), x - 2.4 + a * 0.7, 1.0, z + 0.25, null, 8);
for (var c = 0; c < (lite ? 6 : 12); c++)
otmCandle(x - 2.8 + c * 0.5, 0.94, z + (c % 2 ? 0.05 : 0.4), 1, null, c % 2 ? 0x0A0A0A : 0xE87A1A);
for (var l = 0; l < (lite ? 6 : 12); l++) {
var lz = -22 + l * (lite ? 3 : 1.5), lx = (l % 2 ? 1.5 : -1.5);
otmSamhainLantern(lx, 0, lz, l % 3 === 0);
}
var ban = otmCanvasMat("samhainbanner", 512, 128, function (c2, W, H) {
c2.fillStyle = "#120806";
c2.fillRect(0, 0, W, H);
c2.fillStyle = "#E87A1A";
c2.font = "bold 44px serif";
c2.textAlign = "center";
c2.fillText("SAMHAIN", W / 2, 58);
c2.fillStyle = "#C8B8A0";
c2.font = "22px serif";
c2.fillText("the year turns · the veil is thin · the dead come home", W / 2, 98);
}, { basic: true });
otmPlane(8, 2, ban, 0, 9.8, -35.5, 0);
otmSpot(0, -25.4, 2.4, "🎃 The altar of the ancestors", "remember someone", function () { otmAncestorsCard(); });
},
function (said) {
var L = (typeof otmSpNames === "function") ? otmSpNames() : [], fns = {};
var b = "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🎃 The altar of the ancestors</div>" +
"<p style='margin:8px 0'>Frames for the beloved dead, apples and pomegranates, bread and a glass of wine, candles in black and orange. At Samhain the old Irish laid a place at the table for the dead, and left the door on the latch.</p>" +
(said ? "<div style='margin:8px 0;padding:8px 10px;border-left:3px solid #E87A1A;background:rgba(232,122,26,.08)'>" + said + "</div>" : "") +
"<div style='margin:8px 0'><input id='otm-anc-name' maxlength='40' placeholder='the name of someone you have lost' style='width:100%;padding:6px;background:#140C10;color:#F0E0C8;border:1px solid #6A4A3A;border-radius:4px'></div>" +
worldBtn("name", "🕯️ Speak the name and light a candle", "a black candle among the frames; the name is read again at the Service of Remembrance") +
(L.length ? "<p style='margin:8px 0;font-size:12.5px;opacity:.85'>Remembered here: <i>" + L.slice(0, 40).map(otmEsc).join(" · ") + "</i></p>" : "") +
worldBtn("altar", "🌙 Go on to the Cyber Altar", "light a candle, lay an offering, read the candle log");
fns.name = function () {
var e = document.getElementById("otm-anc-name"), n = (e && e.value || "").trim();
var t = typeof otmSpName === "function" ? otmSpName(n) : "Write the name first.";
otmAltarCandles();
otmAncestorsCard(t);
};
fns.altar = function () { worldCard(null); otmAltarCard(); };
worldCard(b, fns);
},
function (x, y, z, turnip) {
var col = turnip ? 0xD8C8A0 : 0xE87A1A, b = otmSph(turnip ? 0.18 : 0.26, otmMat(col, null), x, y + (turnip ? 0.18 : 0.24), z, null, 10);
b.scale.y = turnip ? 0.9 : 0.8;
otmBox(0.12, 0.05, 0.02, otmGlowM(0xFFB040), x, y + (turnip ? 0.2 : 0.27), z + (turnip ? 0.17 : 0.25));
var gl = (typeof wGlow === "function") ? wGlow(0xFF9A30, 1.0, 0.4) : null;
if (gl) {
gl.position.set(x, y + 0.3, z);
otmP().add(gl);
}
otmRound(x, z, 0.25, y, 0.5);
},
function () {
if (!otmSamhainOn())
return;
var y = otmWoodsY(0, -140);
for (var l = 0; l < 8; l++) {
var lg = otmCyl(0.15, 2.6, otmMat(0x3A2614, "bark"), 0, y + 0.4, -140 + 3.4, null, 6);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = l * 0.4;
}
for (var f = 0; f < (OTM.lite ? 4 : 8); f++)
otmFlame(Math.cos(f) * 0.6, y + 0.4, -136.6 + Math.sin(f) * 0.6, 5 + f % 3, 0xFF7A20);
var big = (typeof wGlow === "function") ? wGlow(0xFF7A30, 12, 0.35) : null;
if (big) {
big.position.set(0, y + 2, -136.6);
otmP().add(big);
}
otmRound(0, -136.6, 1.6, y - 1, 2);
for (var p = 0; p < (OTM.lite ? 8 : 16); p++) {
var a = p / (OTM.lite ? 8 : 16) * Math.PI * 2;
otmSamhainLantern(Math.cos(a) * 9, otmWoodsY(Math.cos(a) * 9, -140 + Math.sin(a) * 9), -140 + Math.sin(a) * 9, p % 2 === 0);
}
},
function (G) {
OTM.G = G;
OTM.lite = otmLite();
OTM.geos = {};
OTM.chand = null;
OTM.wyrms = null;
OTM.glam = null;
OTM.myCandles = null;
var K = OTM.K = otmCtx();
K.F = G;
OTK = K;
[otmNarthex, otmHall, otmGalleries, function () { OTM_WINGS.forEach(function (w) { otmWing(w[0]); }); }, otmLibrary, otmBallroom, otmSeance, otmPriest, otmVestryBath, otmUndercroft, otmWixRooms, otmShellOut, otmWoods, function otmMsHallB() { if (typeof otmMsHall === "function")
otmMsHall(); }, otmSamhainWoods, otmSpBuild]
.forEach(function (f) { try {
f();
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] build", f.name, e);
} });
try {
if (typeof gwBake === "function")
gwBake(G);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] bake", e);
}
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
OTM.built = true;
OTM.builtCfg = JSON.stringify(otmCfg());
OTM.builtSam = otmSamhainOn();
otmAltarCandles();
},
function () {
for (var k in OTM.mats) {
var m = OTM.mats[k];
if (m && m.map && m.map.isCanvasTexture)
try {
m.map.dispose();
}
catch (e) { }
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
OTM.mats = {};
OTM.geos = {};
OTM.wyrms = null;
OTM.K = null;
OTM.G = null;
OTM.built = false;
OTM.chand = null;
OTM.glam = null;
OTM.trees = null;
OTM.mist = null;
OTM.flies = null;
OTM.steam = null;
OTM.water = null;
OTM.astro = null;
OTM.myCandles = null;
OTM.orr = null;
OTM.astrolabe = null;
OTM.pend = null;
OTM.cauldron = null;
OTM.kidLanterns = [];
},
function () {
var L = worldLocal(), woods = L.z < -67.5;
if (woods)
return { top: 0x04060C, low: 0x0E1420, fogD: 0.022, fog: 0x0A0E16, sun: 0.5, sunCol: 0xA8B8E8, sunDir: [0.3, 0.6, -0.7], hemi: 0.9, hemiCol: 0x8A98C8, hemiGround: 0x0A0C10, stars: 1 };
if (L.y < -2)
return { top: 0x060404, low: 0x0E0A08, fogD: 0.02, fog: 0x0A0806, sun: 0.35, sunCol: 0xFFC890, hemi: 1.5, hemiCol: 0xE8C8A0, hemiGround: 0x2A2018, stars: 0 };
return { top: 0x06040A, low: 0x0E0A14, fogD: 0.006, fog: 0x0A0810, sun: 0.55, sunCol: 0xFFE0C0, sunDir: [0.2, 0.9, 0.3], hemi: 1.65, hemiCol: 0xF0E4F8, hemiGround: 0x4A3A40, stars: 0 };
},
function (at) {
var why = otmMayGo();
if (why) {
otmSay("🌙 <b>" + otmEsc(why) + "</b>");
return false;
}
otmRiteFetch();
otmSpiritsLoad();
OTM.wantAt = at || null;
if (OTM.orr)
OTM.orr.live = true;
if (WLD.on === OTM.key) {
worldCard(null);
otmArrive(OTM_AT[at] || OTM_AT.front);
return true;
}
return worldGo(OTM.key, { fromName: "Temple Row" });
},
function (opt) {
if (OTM.built && (OTM.builtCfg !== JSON.stringify(otmCfg()) || OTM.builtSam !== otmSamhainOn()) && WLD.w && WLD.w.g) {
var G = WLD.w.g;
while (G.children.length)
G.remove(G.children[0]);
otmForget();
otmBuild(G);
}
OTK = OTM.K;
otmArrive(OTM_AT[OTM.wantAt] || OTM_AT.front);
OTM.wantAt = null;
OTM.room = "";
try {
otmAltarFetch();
otmAltarCandles();
otmAltarLogFetch();
}
catch (e) { }
otmSay("🌙 <b>The Temple of the Obsidian Moon.</b> Candlelight on black stone, the smell of old incense, a great quiet. The wings of the old faiths open off the narthex, east and west; the Congregation Hall lies ahead. Not every door here is a door you can see.");
},
function (x, z, feet) {
var K = OTM.K;
if (!K)
return false;
if (x < OTM_WOODS.x0 + 2 || x > OTM_WOODS.x1 - 2 || z < OTM_WOODS.z0 + 2)
return true;
if (z > 21 && !otmInRoom(K, x, z))
return true;
if (z < -67.6 && !(x > -49.2 && x < -47.2 && z > -69)) {
if (z > -68.4)
return true;
}
return worldSolidAt(K.solids, x, z, feet);
},
function (dt) {
var K = OTM.K;
if (!K)
return;
OTK = K;
OTM.t += dt;
var t = OTM.t;
otmHoldVertical(K, OTM.vh = OTM.vh || {});
try {
otmFlamesTick(dt, t, K.flames);
otmSpellTick(t);
otmChandTick(t);
otmSecretsTick(dt, K.secrets);
otmGlamourTick(t, dt);
otmWineTick(dt);
otmWoodsTick(dt, t);
otmFigsTick();
otmWyrmTick(t);
otmSpTick(dt);
}
catch (e) {
if (!OTM.e1) {
OTM.e1 = 1;
if (window.console)
console.warn("[obsidian-temple] tick", e);
}
}
try {
otmWixTick(dt, t);
}
catch (e) {
if (!OTM.e2) {
OTM.e2 = 1;
if (window.console)
console.warn("[obsidian-temple] wix tick", e);
}
}
if (OTM.astro)
OTM.astro.rotation.y += dt * 0.15;
(OTM.steam || []).forEach(function (S) { S.s.position.y = S.y0 + ((t * 0.25 + S.ph) % 2.4); S.s.material.opacity = 0.12 * (1 - ((t * 0.25 + S.ph) % 2.4) / 2.4); });
var L = worldLocal(), feet = L.y - 1.72;
K.secrets.forEach(function (S) { if (S.id === "woodsdoor" && !S.open && Math.abs(L.x + 48.2) < 1.6 && L.z > -67.2 && L.z < -63.5)
otmSecretTry(S); });
var r = otmRoomAt(K, L.x, L.z, feet), nm = L.z < -67.6 ? "the dark woods" : r ? r.name : "";
if (nm !== OTM.room) {
OTM.room = nm;
if (r && r.key && otmWingRow(r.key) && !OTM.toldWing) { }
}
worldBanner("<b>🌙 The Temple of the Obsidian Moon</b>" + (nm ? " · " + otmEsc(nm) : "") + (otmSamhainOn() ? " · <span style='color:#E87A1A'>the Samhain rite" + (OTM.spNowName ? ": " + otmEsc(OTM.spNowName) : "") + "</span>" : ""));
OTM.pt += dt;
if (OTM.pt < 0.15)
return;
OTM.pt = 0;
if ((WLD.card && WLD.card.style.display === "block") || otmPanelUp()) {
if (OTM.myFn && WLD.promptFn === OTM.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9, aim = otmWineAim(L, feet);
if (aim) {
var A = OTM.wineFn || (OTM.wineFn = {});
best = A[aim.i] || (A[aim.i] = { name: "🍷 A bottle tagged " + aim.year + ", " + aim.wine, verb: "turn it in its cradle", fn: function () { otmTurnBottle(aim.year, null, aim.i); } });
bd = -1;
}
if (!aim)
K.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1 || Math.abs(feet - s.y) > 2.2)
return;
if (s.when && !s.when())
return;
var d = Math.hypot(L.x - s.x, L.z - s.z);
if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
}
});
if (best) {
var fn = best.fn;
OTM.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + otmEsc(best.verb), fn);
}
else if (OTM.myFn && WLD.promptFn === OTM.myFn) {
worldPrompt(null);
OTM.myFn = null;
}
},
function () {
var b = "", fns = {}, k = otmKeeper(), p = otmProg(), nf = Object.keys(p.found || {}).length;
var rows = [["The house", "The narthex, the Congregation Hall, the dark ballroom, the library, the High Priest's rooms, the vestry, the undercroft"],
["The wings", "East: the Hall of Olympus (Greek), the Hall of the Two Lands (Egyptian), the Hall of the World Tree (Norse). West: the Grove Hall (Celtic), the House of the Orisha (Yoruba), the Hall of the Mandate of Heaven (Chinese)"],
["Hidden ways", "Some doors in this house are not doors: a tapestry, a fireplace, a bookcase. You have found " + nf + "."],
["The gods", "Every god in every wing answers in their own voice. Stand by their plinth, or call any of them at the altar at the head of their hall."],
["From the old temple", "The Cyber Altar in the Congregation Hall, the Obsidian Mirror in the Narthex; east, the Hall of the Astrolabe and the Orrery and the Divination Parlour; west, the Little Moons' Room (the Kid Zone) and the Apothecary (the Potion Game)"]];
if (otmSamhainOn() || otmSpNow().phase === "before") {
var SN = otmSpNow();
b += worldBtn("sp", "🎃 The Samhain programme", SN.item ? "Now: " + otmEsc(SN.item[4]) : SN.phase === "before" ? "Begins at midnight, " + OTM_SP_TZ : "the services, offerings and rites");
fns.sp = function () { otmSpBoard(); };
}
if (otmIsPriest()) {
var NW = (OTM.rite && OTM.rite.waiting) || 0;
b += worldBtn("pet", "📜 Requests to join the coven", NW ? NW + " waiting for your answer" : "read them and answer");
fns.pet = function () { otmPetitions(); };
}
if (WLD.on !== OTM.key && otmKeptOut()) {
b += worldBtn("join", "🌙 Ask to join the coven", "the temple's doors are kept for the coven; the High Priest answers");
fns.join = function () { otmRiteFetch(true).then(function () { otmJoinCard(); }); };
}
if (WLD.on === OTM.key) {
[["front", "The great doors"], ["hall", "The Congregation Hall"], ["library", "The library"], ["ballroom", "The dark ballroom"], ["greek", "The Hall of Olympus"], ["egyptian", "The Hall of the Two Lands"], ["norse", "The Hall of the World Tree"], ["celtic", "The Grove Hall"], ["yoruba", "The House of the Orisha"], ["chinese", "The Hall of the Mandate of Heaven"],
["altar", "The Cyber Altar"], ["mirror", "The Obsidian Mirror"], ["astro", "The Hall of the Astrolabe and the Orrery"], ["divine", "The Divination Station"], ["kids", "The Little Moons' Room (Kid Zone)"], ["potion", "The Apothecary (Potion Game)"]]
.forEach(function (r) { b += worldBtn("g_" + r[0], r[1], ""); fns["g_" + r[0]] = function () { worldCard(null); otmArrive(OTM_AT[r[0]]); }; });
if (k) {
[["office", "Keeper: the High Priest's office"], ["seance", "Keeper: the seance room"], ["bath", "Keeper: the coven bath"], ["dragons", "Keeper: the Wyrm Hall"], ["lhp", "Keeper: the Left-Hand Path"], ["wine", "Keeper: the wine cellar"], ["woods", "Keeper: the dark woods"]]
.forEach(function (r) { b += worldBtn("k_" + r[0], r[1], ""); fns["k_" + r[0]] = function () { worldCard(null); otmArrive(OTM_AT[r[0]]); }; });
b += worldBtn("k_deep", "Keeper: below", "the place under the glamour");
fns.k_deep = function () { worldCard(null); otmDeepGo(); };
}
if (typeof otmMsOk === "function" && otmMsOk()) {
b += worldBtn("mstair", "🌙 The Stair of the Obsidian Moon", "from the roof, up through the clouds to the Heavens: the coven's own way");
fns.mstair = function () { worldCard(null); otmMsGo(); };
}
b += worldBtn("out", "Leave the temple", "back out to Temple Row");
fns.out = function () { otmLeave(); };
}
else {
if (!WLD.on) {
b += worldBtn("walk", "Take me to its doors on Temple Row", "by the Qliphothic houses");
fns.walk = function () { worldCard(null); otmToDoors(); };
b += worldBtn("go", "Go straight in", "the narthex");
fns.go = function () { worldCard(null); otmGo("front"); };
}
}
worldCard(worldFacts("🌙 The Temple of the Obsidian Moon", "the oldest and most sacred house in Somnucor · Temple Row", rows, []) + b, fns);
},
function () {
try {
if (typeof inSomnucorNow === "function" && !inSomnucorNow() && typeof somnucorRealm === "function" && somnucorRealm() && typeof visitRealm === "function")
visitRealm(somnucorRealm().id);
}
catch (e) { }
setTimeout(function () {
var D = otmCityDoor();
if (!D)
return;
if (typeof setWalk === "function")
setWalk(true);
camera.position.set(D.x, (typeof terrainY === "function" ? terrainY(D.x, D.z) : 0) + 1.72, D.z);
yaw = D.yaw;
pitch = 0;
otmSay("🌙 <b>The Temple of the Obsidian Moon</b> stands before you, black against the sky. Press E at its doors to go in.");
}, 400);
},
function (G) {
var B = OTM_BOARD, wd = otmMat(0x2A1A10, "wood"), ir = otmMat(0x1A1818, "metal", { phong: 40 });
[-1.35, 1.35].forEach(function (dx) { otmBox(0.14, 2.9, 0.14, ir, B.x + dx, 1.45, B.z); });
var rf = otmBox(3.2, 0.08, 0.9, otmMat(0x24222A, "stone"), B.x, 2.95, B.z + 0.05);
rf.rotation.x = -0.18;
otmBox(2.7, 1.7, 0.1, wd, B.x, 1.75, B.z);
var face = otmCanvasMat("covenboard", 512, 320, function (x, w, h) {
x.fillStyle = "#1C120C";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#B8923A";
x.lineWidth = 6;
x.strokeRect(10, 10, w - 20, h - 20);
x.fillStyle = "#E8DCB8";
x.textAlign = "center";
x.font = "bold 34px Georgia";
x.fillText("THE COVEN", w / 2, 62);
x.font = "22px Georgia";
x.fillStyle = "#D8C890";
x.fillText("of the Obsidian Moon", w / 2, 94);
x.fillStyle = "#C8B8F0";
x.beginPath();
x.arc(w / 2, 142, 22, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#1C120C";
x.beginPath();
x.arc(w / 2 + 10, 136, 20, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#F0E8D8";
x.font = "21px Georgia";
["The doors of this house open to the coven.", "Would you walk with us? Ask here,", "and the High Priest will answer.", "Eighteen and over. Press E."].forEach(function (t, i) { x.fillText(t, w / 2, 200 + i * 28); });
[[38, 210, -0.12], [w - 78, 196, 0.1]].forEach(function (n) {
x.save();
x.translate(n[0], n[1]);
x.rotate(n[2]);
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, 44, 56);
x.fillStyle = "#8A2A2A";
x.beginPath();
x.arc(22, 6, 4, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#6A5A4A";
x.lineWidth = 1.5;
for (var k = 0; k < 5; k++) {
x.beginPath();
x.moveTo(6, 18 + k * 8);
x.lineTo(38, 18 + k * 8);
x.stroke();
}
x.restore();
});
}, { e: 0.25 });
var m = new THREE.Mesh(new THREE.PlaneGeometry(2.56, 1.6), face);
m.position.set(B.x, 1.75, B.z + 0.06);
G.add(m);
otmBox(0.06, 0.06, 0.42, ir, B.x + 1.35, 2.5, B.z + 0.2);
otmCyl(0.06, 0.12, ir, B.x + 1.35, 2.38, B.z + 0.42, G, 8);
otmFlame(B.x + 1.35, 2.44, B.z + 0.42, 1.4, 0xFF9A40, G);
},
function () {
var S = otmCitySpot();
if (!S || typeof scene === "undefined")
return;
var lite = otmLite(), G = new THREE.Group();
G.name = "temple of the obsidian moon";
G.position.set(S.x, S.y, S.z);
G.rotation.y = S.ry;
scene.add(G);
var keep = OTK;
OTK = { F: G, solids: [], floors: [], ramps: [], spots: [], secrets: [], flames: [], rooms: [] };
var bs = otmMat(0x1A181E, "stone"), dk = otmMat(0x0E0C12, "marble", { phong: 90 }), gd = otmMat(0xB8923A, "metal", { phong: 70 }), pl = otmMat(0x2A2830, "stone");
for (var s = 0; s < 3; s++)
otmBox(96 - s * 2, 0.3, 62 - s * 2, pl, 0, 0.15 + s * 0.3, -13 + s * 0);
otmBox(64, 15, 50, bs, 0, 0.9 + 7.5, -16);
otmBox(14, 10, 40, bs, -39, 0.9 + 5, -16);
otmBox(14, 10, 40, bs, 39, 0.9 + 5, -16);
for (var px = -30; px <= 30; px += 6) {
otmBox(1.2, 15, 0.6, dk, px, 0.9 + 7.5, 9.3);
}
[-1, 1].forEach(function (sd) { for (var pz = -34; pz <= 4; pz += 6)
otmBox(0.6, 15, 1.2, dk, sd * 32.3, 0.9 + 7.5, pz); });
otmBox(66, 1.2, 52, dk, 0, 0.9 + 15.6, -16);
otmBox(16, 0.8, 42, dk, -39, 0.9 + 10.4, -16);
otmBox(16, 0.8, 42, dk, 39, 0.9 + 10.4, -16);
for (var i = 0; i < 8; i++) {
var cx = -21 + i * 6;
otmCyl(0.9, 13, dk, cx, 0.9 + 6.5, 13, null, lite ? 10 : 20, 1.0);
otmCyl(1.25, 0.8, pl, cx, 1.3, 13, null, lite ? 10 : 16);
otmCyl(1.25, 0.8, pl, cx, 0.9 + 13.2, 13, null, lite ? 10 : 16);
}
otmBox(50, 1.6, 8, dk, 0, 0.9 + 14.4, 11);
otmBox(50.4, 0.3, 8.4, gd, 0, 0.9 + 13.7, 11);
var pg = new THREE.Shape();
pg.moveTo(-25, 0);
pg.lineTo(25, 0);
pg.lineTo(0, 7.2);
pg.lineTo(-25, 0);
var ped = new THREE.Mesh(new THREE.ExtrudeGeometry(pg, { depth: 7.6, bevelEnabled: false }), bs);
ped.position.set(0, 0.9 + 15.2, 7.2);
G.add(ped);
otmMoonDisc(0, 0.9 + 17.8, 14.9, 2.4, 0, G);
otmBox(7, 9, 0.4, otmMat(0x3A2A1A, "metal", { phong: 60 }), 0, 0.9 + 4.5, 9.2);
otmBox(0.12, 9, 0.5, otmMat(0x1A140C, null), 0, 0.9 + 4.5, 9.3);
otmMoonDisc(-1.7, 0.9 + 6, 9.45, 0.9, 0, G);
otmMoonDisc(1.7, 0.9 + 6, 9.45, 0.9, 0, G);
var dm = new THREE.Mesh(new THREE.SphereGeometry(13, lite ? 16 : 32, lite ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2), dk);
dm.scale.y = 0.6;
dm.position.set(0, 0.9 + 16.2, -18);
G.add(dm);
otmCyl(13.2, 1.4, bs, 0, 0.9 + 16.6, -18, G, lite ? 16 : 32);
for (var w = 0; w < (lite ? 8 : 16); w++) {
var a = w / (lite ? 8 : 16) * Math.PI * 2;
otmBox(0.8, 0.9, 0.1, otmGlowM(0xB8A8F0), Math.sin(a) * 13.25, 0.9 + 16.6, -18 + Math.cos(a) * 13.25, G).rotation.y = a;
}
var fin = otmGroup(0, 0.9 + 24.4, -18, 0, G);
otmCyl(0.12, 3, gd, 0, 1.5, 0, fin, 6);
var cr = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.18, 8, 24, Math.PI * 1.3), gd);
cr.position.y = 3.6;
cr.rotation.z = Math.PI * 0.85;
fin.add(cr);
[-1, 1].forEach(function (sd) { for (var wz = -34; wz <= 2; wz += 6) {
otmBox(0.1, 6, 1.8, otmGlowM(0x6A4AA8), sd * 32.05, 0.9 + 8, wz + 3);
} });
for (var p = 0; p < 14; p++)
otmBox(3.6, 0.08, 1.6, otmMat(0xC8C4D0, "marble"), 0, 0.05, 20 + p * 2.2);
[-1, 1].forEach(function (sd) {
var ox = sd * 9, oz = 26;
var ob = otmCyl(0.01, 11, dk, ox, 0.9 + 5.5, oz, G, 4, 1.1);
ob.rotation.y = Math.PI / 4;
otmBox(2.6, 0.9, 2.6, pl, ox, 0.45, oz);
otmBox(0.5, 0.5, 0.06, otmGlowM(0xD8DCF0), ox, 9.8, oz + 0.8);
var bx = sd * 5, bz = 19;
otmCyl(0.25, 1.6, otmMat(0x1A1818, "metal"), bx, 0.8, bz, G, 8);
otmCyl(0.8, 0.5, otmMat(0x2A2420, "metal"), bx, 1.8, bz, G, 12, 0.5);
OTM_CITY.fires.push(otmFlame(bx, 2.0, bz, 4, 0xFF8A30, G));
});
otmSign(["THE TEMPLE OF THE OBSIDIAN MOON", "the oldest house in Somnucor"], 7, 1.2, "#0A080E", "#D8C890", 0, 2.0, 36, 0, G);
try {
otmBoardBuild(G);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] board", e);
}
try {
if (typeof otmMsCity === "function") {
var n0 = G.children.length;
otmMsCity(G);
for (var mi = n0; mi < G.children.length; mi++)
G.children[mi].userData.omsMat = 1;
}
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] moon stair", e);
}
OTM_CITY.boxes = [{ x: 0, z: -13, hw: 48, hd: 29, h: 30 }, { x: 0, z: 13, hw: 25.5, hd: 2, h: 16 }, { x: -9, z: 26, hw: 1.4, hd: 1.4, h: 11 }, { x: 9, z: 26, hw: 1.4, hd: 1.4, h: 11 }, { x: -5, z: 19, hw: 0.9, hd: 0.9, h: 2.2 }, { x: 5, z: 19, hw: 0.9, hd: 0.9, h: 2.2 }, { x: OTM_BOARD.x, z: OTM_BOARD.z, hw: 1.5, hd: 0.25, h: 3.2 }];
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; o.castShadow = false; });
OTM_CITY.g = G;
OTM_CITY.spot = S;
OTM_CITY.ctx = OTK;
OTK = keep;
},
function (x, z, feet) {
var zn = odpZone(x, z), K = ODP.K;
if (zn === "court") {
var g = K ? otmGroundIn(K, x, z, feet) : null;
return g === null ? 0 : g;
}
if (zn === "hall") {
var h = K ? otmGroundIn(K, x, z, feet) : null;
return h === null ? ODP_HALL.y : h;
}
if (zn === "stair")
return odpStairY(z) + (Math.abs(x) > ODP_HW.hw - 1 && z < -4.2 && z > -404 ? 0.18 : 0);
var P = odpPolar(x, z), r = P.r;
var rp = odpRampAt(r, P.f);
if (rp !== null)
return rp;
var W = odpWaterAt(r);
if (W)
return W.y - 1.6;
if (r >= 47.5 && r <= 50)
return -180;
if (odpDitch(r))
return odpOnBridge(r, P.f) ? -180 : -184.5;
if (r < 29 && r >= 26)
return -180;
var i = odpRingOf(r);
if (i < 0)
return r > 262 ? -120 : -190;
return ODP_RING[i].y;
},
function (x, z, feet) {
var zn = odpZone(x, z), K = ODP.K;
if (!K)
return false;
if (zn === "court") {
if (x < ODP_COURT_X - 37.5 || x > ODP_COURT_X + 37.5 || z > 3.5 || z < -203.5)
return true;
return worldSolidAt(K.solids, x, z, feet);
}
if (zn === "hall")
return worldSolidAt(K.solids, x, z, feet);
if (zn === "stair") {
if (z > 2.0)
return true;
if (z > -404) {
if (x < -5.7)
return true;
if (x > 5.7 && !(z < -200.8 && z > -203.2))
return true;
}
else if (Math.abs(x) > 5.6)
return true;
return worldSolidAt(K.solids, x, z, feet);
}
if (x > 500)
return true;
var P = odpPolar(x, z), r = P.r, f = feet === undefined ? -1e9 : feet;
if (r > 262.4)
return true;
var W = odpWaterAt(r);
if (W && f < W.y + 2.5)
return true;
if (odpDitch(r) && !odpOnBridge(r, P.f) && f < -178)
return true;
if (r > 113.6 && r < 116.4 && f < -144 && odpRampAt(r, P.f) === null)
return true;
if (r < 5.5 && f < -160)
return true;
if (typeof odpCastleBlock === "function" && odpCastleBlock(x, z, f))
return true;
var g = odpGround(x, z, feet);
if (g > f + 1.1)
return true;
if (g < f - 2.5 && !(typeof canFly !== "undefined" && canFly))
return true;
return worldSolidAt(K.solids, x, z, feet);
},
function () {
var L = worldLocal(), zn = odpZone(L.x, L.z);
if (zn === "court")
return { top: 0x0A0204, low: 0x1A0606, fogD: 0.012, fog: 0x140405, sun: 0.4, sunCol: 0xFF7A40, sunDir: [0.2, 0.9, 0.2], hemi: 1.35, hemiCol: 0xF0B8A0, hemiGround: 0x5A1A10, stars: 0 };
if (zn === "hall")
return { top: 0x0A0806, low: 0x161008, fogD: 0.008, fog: 0x100C08, sun: 0.5, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.3], hemi: 1.55, hemiCol: 0xF8E0C0, hemiGround: 0x4A3A28, stars: 0 };
if (zn === "stair")
return { top: 0x080605, low: 0x120C08, fogD: 0.03, fog: 0x0E0A08, sun: 0.3, sunCol: 0xFFB070, sunDir: [0.1, 0.9, 0.4], hemi: 1.3, hemiCol: 0xE8C8A0, hemiGround: 0x3A2416, stars: 0 };
var r = odpPolar(L.x, L.z).r;
if (r < 26)
return { top: 0x04060A, low: 0x0A121A, fogD: 0.012, fog: 0x0A1018, sun: 0.35, sunCol: 0xB8D0F0, sunDir: [0.2, 0.9, 0.2], hemi: 1.12, hemiCol: 0xC8D8F0, hemiGround: 0x6A7A8A, stars: 0 };
var deep = Math.max(0, Math.min(1, (262 - r) / 236)), M = ODP_MOOD[ODP.ring] || ODP_MOOD[6];
return { top: M[0], low: M[1], fogD: M[2] + deep * 0.002, fog: M[1], sun: M[3], sunCol: M[4], sunDir: [0.1, 1, 0.1], hemi: M[5] + deep * 0.15, hemiCol: M[6], hemiGround: M[7], stars: 0 };
},
function (geo, col, amt, seed) {
var p = geo.attributes.position, n = p.count, c = new Float32Array(n * 3), C = new THREE.Color(col), s = seed || 1;
for (var i = 0; i < n; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i);
var k = 1 + amt * (Math.sin(x * 0.37 + s) * Math.sin(z * 0.29 + y * 0.41 + s * 2) + 0.6 * Math.sin(x * 1.9 + z * 1.3 + y * 1.7 + s * 3));
c[i * 3] = Math.min(1, C.r * k);
c[i * 3 + 1] = Math.min(1, C.g * k);
c[i * 3 + 2] = Math.min(1, C.b * k);
}
geo.setAttribute("color", new THREE.BufferAttribute(c, 3));
return geo;
},
function (k, o) { o = o || {}; k = "odpvc|" + k; if (!OTM.mats[k]) {
var m = o.phong ? new THREE.MeshPhongMaterial({ vertexColors: true, shininess: o.phong, specular: 0x222222 }) : new THREE.MeshLambertMaterial({ vertexColors: true });
if (o.ds)
m.side = THREE.DoubleSide;
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
}
OTM.mats[k] = m;
} return OTM.mats[k]; },
function (r, y0, y1, col, seg, gap, gw) {
var h = y1 - y0, g, gp = gap === undefined ? null : gap, ga = gp === null ? 0 : (gw || 3) / r;
g = new THREE.CylinderGeometry(r, r, h, seg, Math.max(2, Math.round(h / 5)), true, gp === null ? 0 : (Math.PI / 2 - gp) + ga, gp === null ? Math.PI * 2 : Math.PI * 2 - 2 * ga);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), z = p.getZ(i), y = p.getY(i), a = Math.atan2(z, x), k = 1 + (0.45 * Math.sin(a * r * 0.3 + y * 0.7) + 0.3 * Math.sin(a * r * 0.9 + y * 2.1)) / r;
p.setX(i, x * k);
p.setZ(i, z * k);
}
g.computeVertexNormals();
odpRough(g, col, 0.3, r);
var m = new THREE.Mesh(g, odpVC("cliff", { ds: 1 }));
m.position.set(ODP_C.x, y0 + h / 2, ODP_C.z);
m.userData.keep = 1;
otmP().add(m);
return m;
},
function (name, icons, x, y, z, ry, s, parent, deity) {
var P = parent || ODP.G, g = null;
if (deity && typeof DEITY !== "undefined" && DEITY[deity])
return otmGodFigure(deity, x, y, z, ry, s, P);
if (typeof DEITY !== "undefined" && typeof build === "function") {
var key = "odp_" + name.replace(/\W+/g, "_").toLowerCase();
if (!DEITY[key])
try {
Object.defineProperty(DEITY, key, { value: { key: key, name: name, trad: "", domains: "", icons: (icons || "robe:grey").split(/\s+/), aka: [], cue: false, dragon: false }, enumerable: false, configurable: true, writable: true });
}
catch (e) { }
try {
var sp = { id: key, archetype: "deity", deity: key, attrs: {}, nights: [], city: true, solid: false, detail: ODP.lite ? 2 : 3, name: name, label: name };
if (typeof lookOf === "function" && typeof deityLook === "function") {
lookOf(sp);
deityLook(sp, DEITY[key]);
}
g = build(sp);
}
catch (e) {
g = null;
if (window.console)
console.warn("[obsidian-temple] below, figure of " + name, e);
}
}
if (!g)
return otmGodFigure("__none", x, y, z, ry, s, P);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
if (s)
g.scale.multiplyScalar(s);
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
P.add(g);
return g;
},
function (kind, x, y, z, ry, s, parent) {
var P = parent || ODP.G, g = null;
try {
if (typeof build === "function" && typeof CREATURE !== "undefined" && CREATURE[kind])
g = build({ id: "odp_" + kind + "_" + Math.round(x), archetype: kind, attrs: { s: s || 1 }, nights: [], city: true, solid: false, detail: ODP.lite ? 1 : 2 });
}
catch (e) {
g = null;
}
if (!g)
return null;
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
P.add(g);
return g;
},
function () {
var L = worldLocal(), far = ODP.lite ? 45 : 80, n = 0;
for (var i = 0; i < ODP.figs.length && n < 1; i++) {
var F = ODP.figs[i];
if (F.g)
continue;
if (Math.abs(F.x - L.x) > far || Math.abs(F.z - L.z) > far)
continue;
try {
F.g = F.make() || 1;
}
catch (e) {
F.g = 1;
if (window.console)
console.warn("[obsidian-temple] below, figure", e);
}
n++;
}
},
function (x0, x1, za, ya, zb, yb, mat, lift, vScale) {
var g = new THREE.BufferGeometry(), l = lift || 0, L = Math.hypot(zb - za, yb - ya) / (vScale || 1);
g.setAttribute("position", new THREE.BufferAttribute(new Float32Array([x0, ya + l, za, x1, ya + l, za, x0, yb + l, zb, x1, yb + l, zb]), 3));
g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0, L, 1, L]), 2));
g.setIndex([0, 1, 2, 1, 3, 2]);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.userData.keep = 1;
m.userData.noSit = 1;
otmP().add(m);
return m;
},
function (x, za, ya, zb, yb, h, mat, sd) {
var g = new THREE.BufferGeometry(), L = Math.hypot(zb - za, yb - ya);
g.setAttribute("position", new THREE.BufferAttribute(new Float32Array([x, ya, za, x, yb, zb, x, ya + h, za, x, yb + h, zb]), 3));
g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, L / 4, 0, 0, h / 4, L / 4, h / 4]), 2));
g.setIndex(sd < 0 ? [0, 1, 2, 1, 3, 2] : [0, 2, 1, 1, 2, 3]);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.userData.keep = 1;
m.userData.noSit = 1;
otmP().add(m);
return m;
},
function () {
var lite = ODP.lite, H = ODP_HW, rk = otmMat(0x2A2220, "stone"), st = otmMat(0x3A3230, "stone"), dk = otmMat(0x161210, "stone"), ir = otmMat(0x1A1616, "metal", { phong: 50 });
var road = otmCanvasMat("odp-road", 256, 512, function (x, W, Hh) {
x.fillStyle = "#141210";
x.fillRect(0, 0, W, Hh);
for (var i = 0; i < 4200; i++) {
var v = 10 + Math.random() * 30 | 0;
x.fillStyle = "rgb(" + (v + 4) + "," + (v + 2) + "," + v + ")";
x.fillRect(Math.random() * W, Math.random() * Hh, 2, 2);
}
x.strokeStyle = "rgba(0,0,0,0.55)";
x.lineWidth = 2;
for (var r = 0; r < Hh; r += 16) {
x.beginPath();
x.moveTo(0, r);
x.lineTo(W, r);
x.stroke();
for (var c = (r / 16 % 2) * 12; c < W; c += 24) {
x.beginPath();
x.moveTo(c, r);
x.lineTo(c, r + 16);
x.stroke();
}
}
x.fillStyle = "rgba(176,140,60,0.75)";
x.fillRect(14, 0, 6, Hh);
x.fillRect(W - 20, 0, 6, Hh);
}, { rep: [1, 1] });
road.map.wrapT = THREE.RepeatWrapping;
var wallTex = otmMat(0x2E2420, "stone"), vault = otmMat(0x120E0C, "stone"), ember = otmGlowM(0xFF6A20), kerbM = otmMat(0x4A423C, "stone");
otmBox(H.wall * 2, 0.4, 7, st, 0, -0.2, -0.6);
otmBox(H.wall * 2 + 0.6, H.h, 0.6, rk, 0, H.h / 2, 2.6);
[-1, 1].forEach(function (sd) { otmBox(0.6, H.h, 7, rk, sd * H.wall, H.h / 2, -0.6); });
otmBox(H.wall * 2 + 0.6, 0.5, 7, dk, 0, H.h, -0.6);
var ar = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.26, 6, 16, Math.PI), otmMat(0x2A1A1A, "stone"));
ar.position.set(0, 0, 2.25);
otmP().add(ar);
otmPlane(2.8, 2.8, otmGlowM(0x050302), 0, 1.4, 2.28, Math.PI);
odpTorch(-1.9, 2.3, 2.0);
odpTorch(1.9, 2.3, 2.0);
otmSpot(0, 1.0, 1.8, "🕯️ The way back up", "climb back up to the temple", function () { odpUp(); });
var parts = [{ z0: 2.3, z1: -4, y0: 0, y1: 0 }, H.seg[0], { z0: -200, z1: -204, y0: -60, y1: -60, lay: 1 }, H.seg[1]];
parts.forEach(function (S) {
var za = S.z0, zb = S.z1, ya = S.y0, yb = S.y1;
odpHwQuad(-H.hw + 1, H.hw - 1, za, ya, zb, yb, road, 0, 16);
[-1, 1].forEach(function (sd) {
var x0 = sd < 0 ? -H.wall : H.hw - 1, x1 = sd < 0 ? -H.hw + 1 : H.wall;
odpHwQuad(x0, x1, za, ya, zb, yb, kerbM, 0.18, 1);
odpHwQuad(sd < 0 ? -H.hw + 1 : H.hw - 1.06, sd < 0 ? -H.hw + 1.06 : H.hw - 1, za, ya, zb, yb, kerbM, 0.02, 1);
if (S.lay && sd > 0) {
odpHwWall(H.wall, -200, ya, -200.8, ya, H.h, wallTex, sd);
odpHwWall(H.wall, -203.2, ya, -204, ya, H.h, wallTex, sd);
odpHwWall(H.wall, -200.8, ya + 3.6, -203.2, ya + 3.6, H.h - 3.6, wallTex, sd);
}
else
odpHwWall(sd * H.wall, za, ya, zb, yb, H.h, wallTex, sd);
odpHwQuad(sd < 0 ? -H.wall : H.wall - 0.25, sd < 0 ? -H.wall + 0.25 : H.wall, za, ya, zb, yb, ember, 0.2, 1);
});
odpHwQuad(-H.wall, H.wall, zb, yb + H.h, za, ya + H.h, vault, 0, 4);
});
var nd = Math.ceil(400 / 8), dash = new THREE.InstancedMesh(new THREE.BoxGeometry(0.2, 0.04, 3), ember, nd), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), V = new THREE.Vector3(), Sc = new THREE.Vector3(1, 1, 1), q = 0;
for (var z = -6; z > -402 && q < nd; z -= 8) {
var y = odpStairY(z), sl = Math.atan2(odpStairY(z + 1) - odpStairY(z - 1), 2);
E.set(-sl, 0, 0);
Q.setFromEuler(E);
V.set(0, y + 0.04, z);
M.compose(V, Q, Sc);
dash.setMatrixAt(q++, M);
}
dash.count = q;
dash.instanceMatrix.needsUpdate = true;
dash.userData.keep = 1;
dash.userData.noSit = 1;
otmP().add(dash);
var nr = Math.floor(400 / 16), ribG = new THREE.TorusGeometry(H.wall, 0.35, 6, lite ? 12 : 20, Math.PI), rib = new THREE.InstancedMesh(ribG, dk, nr * 1), pil = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, H.h - H.wall * 0.55, 0.9), rk, nr * 2), qr = 0, qp = 0;
for (var zr = -10; zr > -400 && qr < nr; zr -= 16) {
var yr = odpStairY(zr), hp = H.h - H.wall * 0.55;
V.set(0, yr + hp, zr);
Q.identity();
Sc.set(1, 0.55, 1);
M.compose(V, Q, Sc);
rib.setMatrixAt(qr++, M);
Sc.set(1, 1, 1);
[-1, 1].forEach(function (sd) { V.set(sd * (H.wall - 0.3), yr + hp / 2, zr); M.compose(V, Q, Sc); pil.setMatrixAt(qp++, M); });
}
rib.count = qr;
pil.count = qp;
[rib, pil].forEach(function (m) { m.instanceMatrix.needsUpdate = true; m.userData.keep = 1; m.userData.noSit = 1; otmP().add(m); });
ODP.stepMesh = dash;
var step = lite ? 48 : 24, k = 0;
for (var zl = -14; zl > -398; zl -= step) {
var sd = (k++ % 2) ? 1 : -1, xl = sd * (H.hw - 0.4), yl = odpStairY(zl) + 0.18;
otmCyl(0.12, 6.2, ir, xl, yl + 3.1, zl, null, 8, 0.16);
otmBox(1.4, 0.12, 0.12, ir, xl - sd * 0.6, yl + 6.1, zl);
otmCyl(0.28, 0.6, otmMat(0x2A1A10, "metal", { e: 0x4A1A04, ei: 1 }), xl - sd * 1.2, yl + 5.65, zl, null, 6, 0.2);
odpFire(xl - sd * 1.2, yl + 5.45, zl, 2.6, 0xFF7A28);
otmRound(xl, zl, 0.3, yl, 6.4);
}
for (var g = 0; g < 10; g++) {
var zg = -20 - g * 40, yg = odpStairY(zg), F = ODP_STAIR_FACTS[g];
[-1, 1].forEach(function (sd) { otmBox(0.3, 7.6, 0.3, ir, sd * (H.wall - 0.6), yg + 3.8, zg); });
otmBox(H.wall * 2 - 1.2, 0.3, 0.3, ir, 0, yg + 7.4, zg);
if (F)
otmSign([F[0], F[1]], 7.2, 1.5, "#120A06", "#E8B070", 0, yg + 6.4, zg + 0.2, 0);
var ms = otmBox(0.6, 1.0, 0.3, st, -(H.hw - 0.5), yg + 0.68, zg - 4);
otmRound(-(H.hw - 0.5), zg - 4, 0.35, yg, 1.2);
otmSign(["THE GATE", String(Math.round(zg - 4 + 404)) + " m"], 0.56, 0.5, "#2A2420", "#E8D0A0", -(H.hw - 0.5), yg + 0.85, zg - 3.84, 0);
}
var Yl = -60;
otmBox(0.5, 4.6, 0.5, otmMat(0x5A4A2A, "stone"), H.wall - 0.1, Yl + 2.3, -200.4);
otmBox(0.5, 4.6, 0.5, otmMat(0x5A4A2A, "stone"), H.wall - 0.1, Yl + 2.3, -203.6);
otmBox(0.5, 0.6, 3.7, otmMat(0x5A4A2A, "stone"), H.wall - 0.1, Yl + 4.3, -202);
otmSign(["THE HALL OF THE KEY", "the Lemegeton, or Lesser Key of Solomon"], 3.2, 0.7, "#140E0A", "#D8C890", H.wall - 0.4, Yl + 5.4, -202, -Math.PI / 2);
odpBrazier(H.hw - 1.2, Yl + 0.18, -199, 0.9);
odpBrazier(H.hw - 1.2, Yl + 0.18, -205, 0.9);
var Y = -120, gs = otmMat(0x2A2422, "stone");
otmBox(12, 0.4, 14.4, st, 0, Y - 0.2, -411);
otmFloor(-5.8, -418, 5.8, -404, Y);
otmBox(0.5, 14, 14, rk, -6, Y + 7, -411);
otmBox(0.5, 14, 14, rk, 6, Y + 7, -411);
otmBox(12.5, 0.5, 14.4, dk, 0, Y + 14, -411);
otmBox(12.6, 3.2, 0.4, rk, 0, Y + 12.4, -404);
[-3.6, 3.6].forEach(function (x) { otmBox(1.6, 8, 1.4, gs, x, Y + 4, -418.3); otmSolid(x, -418.3, 0.8, 0.7, Y, 8); });
var arch = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.75, 8, 24, Math.PI), gs);
arch.position.set(0, Y + 8, -418.3);
otmP().add(arch);
[-1, 1].forEach(function (sd) { otmBox(1.8, 14, 1.0, rk, sd * 5.3, Y + 7, -418.4); otmSolid(sd * 5.3, -418.4, 0.9, 0.5, Y, 14); });
otmBox(12.4, 1.6, 1.0, rk, 0, Y + 13.2, -418.4);
otmSign(["THROUGH ME THE WAY IS TO THE CITY DOLENT;", "THROUGH ME THE WAY IS TO ETERNAL DOLE;", "THROUGH ME THE WAY AMONG THE PEOPLE LOST.", "JUSTICE INCITED MY SUBLIME CREATOR;", "CREATED ME DIVINE OMNIPOTENCE,", "THE HIGHEST WISDOM AND THE PRIMAL LOVE.", "BEFORE ME THERE WERE NO CREATED THINGS,", "ONLY ETERNE, AND I ETERNAL LAST.", "ALL HOPE ABANDON, YE WHO ENTER IN!"], 8.6, 3.2, "#0E0806", "#E8B070", 0, Y + 10.9, -417.2, 0);
otmSign(["Inferno, Canto III", "in Longfellow's English, 1867"], 1.7, 0.4, "#0E0806", "#B8A080", -5.3, Y + 2.6, -417.8, 0);
odpBrazier(-4.2, Y, -414, 1.1);
odpBrazier(4.2, Y, -414, 1.1);
otmSpot(0, -416, 2.6, "📜 The words over the Gate", "read", function () { odpLesson("gate"); }, { y: Y });
odpHwShades();
},
function () {
if (typeof odpShadeGeo !== "function")
return;
var n = ODP.lite ? 14 : 36, mat = new THREE.MeshLambertMaterial({ color: 0x8A909C, emissive: 0x1A1E26, transparent: true, opacity: 0.78 });
var m = new THREE.InstancedMesh(odpShadeGeo("walk"), mat, n);
m.frustumCulled = false;
m.userData.keep = 1;
m.userData.noSit = 1;
otmP().add(m);
var L = [];
for (var i = 0; i < n; i++) {
var sd = i % 2 ? 1 : -1;
L.push({ x: sd * (ODP_HW.hw - 0.45) + (Math.random() - 0.5) * 0.4, u: i / n * 396, sp: 0.55 + Math.random() * 0.25, s: 0.95 + Math.random() * 0.12 });
}
ODP.hwShades = { m: m, L: L, o: new THREE.Object3D() };
odpHwShadesTick(0);
},
function (dt) {
var S = ODP.hwShades;
if (!S)
return;
var o = S.o;
S.L.forEach(function (s, i) {
s.u = (s.u + s.sp * dt) % 396;
var z = -6 - s.u, y = odpStairY(z) + 0.18;
o.position.set(s.x, y, z);
o.rotation.set(0, Math.PI, 0);
o.scale.setScalar(s.s);
o.updateMatrix();
S.m.setMatrixAt(i, o.matrix);
});
S.m.instanceMatrix.needsUpdate = true;
},
function () {
var lite = ODP.lite, H = ODP_HALL, Y = H.y;
var R = otmRoom({ x0: H.x0, z0: H.z0, x1: H.x1, z1: H.z1, y: Y, h: 9, name: "the Hall of the Key", key: "key", floor: otmMat(0x1A1612, "marble", { phong: 70 }), wall: otmMat(0x2A2420, "stone"), ceil: otmMat(0x120E0C, "stone"),
doors: { w: [{ at: -202, w: 2.4, h: 3.2 }] }, frameMat: otmMat(0x5A4A2A, "stone") });
var gd = otmMat(0xB8923A, "metal", { phong: 70 }), br = otmMat(0x8A5A2A, "metal", { phong: 60 }), wd = otmMat(0x2A1A10, "wood");
var flr = otmCanvasMat("odp-keyfloor", 512, 512, function (x, W, Hh) {
x.fillStyle = "#1A1612";
x.fillRect(0, 0, W, Hh);
x.strokeStyle = "#B8923A";
x.lineWidth = 10;
x.beginPath();
x.arc(W / 2, Hh / 2, 230, 0, Math.PI * 2);
x.stroke();
x.lineWidth = 4;
x.beginPath();
x.arc(W / 2, Hh / 2, 180, 0, Math.PI * 2);
x.stroke();
x.fillStyle = "#D8B860";
x.font = "bold 22px Georgia";
x.textAlign = "center";
["GOETIA", "THEURGIA-GOETIA", "PAULINA", "ALMADEL", "NOTORIA"].forEach(function (t, i) { var a = i / 5 * Math.PI * 2 - Math.PI / 2; x.save(); x.translate(W / 2 + Math.cos(a) * 205, Hh / 2 + Math.sin(a) * 205); x.rotate(a + Math.PI / 2); x.fillText(t, 0, 8); x.restore(); });
}, { basic: 1 });
var fp = otmPlane(12, 12, flr, R.cx, Y + 0.02, R.cz, 0);
fp.rotation.x = -Math.PI / 2;
br = otmMat(0x4A3218, "metal", { phong: 80 });
otmCyl(1.1, 1.8, br, R.cx, Y + 0.9, R.cz, null, lite ? 12 : 24, 1.3);
otmCyl(1.15, 0.2, gd, R.cx, Y + 1.85, R.cz, null, lite ? 12 : 24);
otmSph(0.3, gd, R.cx, Y + 2.1, R.cz, null, 10);
otmRound(R.cx, R.cz, 1.4, Y, 2.2);
otmSpot(R.cx, R.cz + 2.2, 2.2, "🏺 The vessel of brass", "read the legend", function () {
worldCard(worldFacts("🏺 The vessel of brass", "the legend, as the Goetia tells it", [], ["The book says that Solomon shut the seventy-two spirits, with their legions, in a vessel of brass, sealed it, and cast it into a deep lake in Babylon by the power of God.", "The Babylonians, hoping for treasure, broke it open, and the spirits went back to their old places; all except Belial, who entered an image and gave answers there.", "The legend is late: the Testament of Solomon, centuries older, has the demons build the Temple instead. Nothing in this hall is a working: it is a museum of what people believed."]), {});
}, { y: Y });
ODP_BOOKS.forEach(function (B, i) {
var x = R.x0 + 3 + i * ((R.w - 6) / 4), z = i % 2 ? R.z0 + 2.2 : R.z1 - 2.2, ry = i % 2 ? 0 : Math.PI;
var g = otmGroup(x, Y, z, ry);
otmBox(0.12, 1.1, 0.12, wd, 0, 0.55, 0, g);
otmBox(0.8, 0.06, 0.6, wd, 0, 1.12, 0, g).rotation.x = -0.35;
otmBox(0.7, 0.08, 0.5, otmMat([0x5A1A1A, 0x1A2A4A, 0x2A3A1A, 0x4A3A1A, 0x3A1A3A][i], null), 0, 1.2, 0.02, g).rotation.x = -0.35;
otmCandle(0.5, 1.1, 0, 1, g);
otmRound(x, z, 0.45, Y, 1.3);
otmSign([B[0], B[1]], 1.6, 0.36, "#140E0A", "#D8C890", x, Y + 1.9, z, ry);
otmSpot(x, z + (i % 2 ? 1.4 : -1.4), 1.6, "📖 " + B[0], "read", function () { worldCard(worldFacts("📖 " + B[0], B[1] + " of the Lesser Key of Solomon", [], [B[2]]), {}); }, { y: Y });
});
for (var b = 0; b < 4; b++) {
(function (b) {
var rows = ODP_72.slice(b * 18, b * 18 + 18);
var m = otmCanvasMat("odp-72-" + b, 256, 512, function (x, W, Hh) {
x.fillStyle = "#120C08";
x.fillRect(0, 0, W, Hh);
x.strokeStyle = "#8A6A2A";
x.lineWidth = 6;
x.strokeRect(6, 6, W - 12, Hh - 12);
x.fillStyle = "#D8B860";
x.font = "bold 15px Georgia";
x.textAlign = "center";
x.fillText("THE SEVENTY-TWO · " + (b * 18 + 1) + " to " + (b * 18 + 18), W / 2, 30);
x.textAlign = "left";
x.font = "13px Georgia";
rows.forEach(function (r, i) { var y = 56 + i * 25; x.fillStyle = "#C8B890"; x.fillText((b * 18 + i + 1) + ". " + r[0], 16, y); x.fillStyle = "#8A7A60"; x.font = "11px Georgia"; x.fillText(r[1] + " · " + r[2] + " legions", 30, y + 11); x.font = "13px Georgia"; });
}, { basic: 1 });
var onN = b < 2, x = R.x0 + 5 + (b % 2) * (R.w - 10), z = onN ? R.z0 + 0.22 : R.z1 - 0.22;
otmPlane(2.6, 5.2, m, x, Y + 3.6, z, onN ? 0 : Math.PI);
otmSpot(x, z + (onN ? 1.4 : -1.4), 1.8, "📜 The seventy-two spirits", "read the whole list", function () { odpSeventyTwo(); }, { y: Y });
})(b);
}
otmBox(4, 0.5, 6, otmMat(0x2A2018, "marble"), R.x1 - 2.4, Y + 0.25, R.cz);
otmFloor(R.x1 - 4.4, R.cz - 3, R.x1 - 0.4, R.cz + 3, Y + 0.5);
var th = otmGroup(R.x1 - 1.2, Y + 0.5, R.cz, -Math.PI / 2);
otmBox(1.4, 0.5, 1.0, gd, 0, 0.25, 0, th);
otmBox(1.4, 2.2, 0.2, gd, 0, 1.1, -0.5, th);
otmSolid(R.x1 - 1.2, R.cz, 0.6, 0.8, Y, 2.6);
odpLater(R.x1 - 1.4, R.cz, function () { return odpFig("King Solomon", "crown beard robe:purple staff", R.x1 - 1.6, Y + 0.5, R.cz, -Math.PI / 2, 1.0); });
odpTalkSpot(R.x1 - 3.6, R.cz, Y + 0.5, "deep:solomon", "the Hall of the Key, off the lay-by halfway down the Highway Down under the Temple of the Obsidian Moon");
otmSpot(R.x0 + 3, R.cz, 2.0, "📜 The tablet of the Hall", "read, and answer", function () { odpLesson("key"); }, { y: Y });
otmSign(["THE HALL OF THE KEY", "the Lemegeton, or Lesser Key of Solomon"], 4, 0.8, "#140E0A", "#D8C890", R.x0 + 0.25, Y + 4.8, R.cz, Math.PI / 2);
for (var c = 0; c < (lite ? 2 : 4); c++)
otmCandelabrum(R.x0 + 5 + c * ((R.w - 10) / ((lite ? 2 : 4) - 1 || 1)), Y, R.cz + (c % 2 ? -4 : 4));
var lamp = otmGroup(R.cx, Y + 7, R.cz);
otmCyl(0.02, 2, otmMat(0x1A1818, "metal"), 0, 1, 0, lamp, 4);
otmFlame(0, -0.3, 0, 4, 0xFFB050, lamp);
},
function () {
var b = "<div style='max-height:52vh;overflow:auto;font-size:12.5px;columns:2;column-gap:14px'>" + ODP_72.map(function (r, i) { return "<div style='break-inside:avoid;margin:2px 0'><b>" + (i + 1) + ". " + otmEsc(r[0]) + "</b> <span style='opacity:.7'>" + otmEsc(r[1]) + ", " + r[2] + " legions</span></div>"; }).join("") + "</div>";
worldCard(worldFacts("📜 The seventy-two spirits of the Ars Goetia", "as Mathers numbered them, 1904", [], ["Names, ranks and legions only: the book's own descriptions are on the lecterns and in the palaces below. Nothing here is a working."]) + b, {});
},
function (list) {
var pos = [], nor = [], n = 0;
list.forEach(function (p) { var g = p[0].clone(); g.applyMatrix4(p[1]); if (g.index)
g = g.toNonIndexed(); pos.push(g.attributes.position.array); nor.push(g.attributes.normal.array); n += g.attributes.position.array.length; });
var P = new Float32Array(n), N = new Float32Array(n), k = 0;
for (var i = 0; i < pos.length; i++) {
P.set(pos[i], k);
N.set(nor[i], k);
k += pos[i].length;
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
G.computeBoundingSphere();
return G;
},
function (P, root) {
P = P || {};
var s = P.seg || odpSkSeg(), po = P.pose || {}, f = P.f ? 1 : 0, m = P.m || 0;
root = root || new THREE.Object3D();
var sw = 0.185 + 0.05 * m - 0.025 * f, pelvis = odpSkNode(root, 0, 0.93, 0), spine = odpSkNode(pelvis, 0, 0, 0, po.lean || 0, po.twist || 0, po.tilt || 0);
var prof = f ? [[0.001, -0.07], [0.12, -0.05], [0.172, 0.04], [0.16, 0.12], [0.112, 0.21], [0.125, 0.3], [0.145, 0.4], [0.15, 0.47], [0.12, 0.52], [0.05, 0.56], [0.001, 0.565]]
: [[0.001, -0.07], [0.12, -0.05], [0.15, 0.04], [0.14, 0.14], [0.13, 0.22], [0.15, 0.33], [0.17, 0.43], [0.168, 0.5], [0.125, 0.55], [0.05, 0.58], [0.001, 0.585]];
odpSkPart(spine, odpSkLathe(prof, s), "skin", 0, 0, 0, 1 + 0.18 * m, 1, 0.64 + 0.06 * m);
if (f)
[-1, 1].forEach(function (sd) { odpSkPart(spine, odpSkSph(s), "skin", sd * 0.068, 0.4, 0.075, 0.062, 0.058, 0.05); });
if (m > 0.4)
[-1, 1].forEach(function (sd) { odpSkPart(spine, odpSkSph(s), "skin", sd * 0.075, 0.42, 0.06, 0.085, 0.06, 0.05); });
if (P.ripped) {
[-1, 1].forEach(function (sd) {
odpSkPart(spine, odpSkSph(s), "skin", sd * 0.072, 0.43, 0.088, 0.092, 0.066, 0.052, 0, 0, sd * 0.15);
for (var r = 0; r < 3; r++)
odpSkPart(spine, odpSkSph(s), "skin", sd * 0.036, 0.31 - r * 0.07, 0.088 - r * 0.004, 0.032, 0.03, 0.022);
odpSkPart(spine, odpSkSph(s), "skin", sd * 0.075, 0.53, -0.005, 0.075, 0.042, 0.055, 0, 0, -sd * 0.3);
odpSkPart(spine, odpSkSph(s), "skin", sd * 0.13, 0.37, -0.03, 0.062, 0.12, 0.062, 0, 0, sd * 0.12);
odpSkPart(spine, odpSkSph(s), "skin", sd * 0.11, 0.2, 0.04, 0.05, 0.07, 0.05);
});
}
var neck = odpSkNode(spine, 0, 0.555, 0.005, po.head || 0, po.turn || 0, 0);
odpSkPart(neck, odpSkLimb(0.05 + 0.02 * m, 0.056 + 0.02 * m, 0.13, s), "skin", 0, 0.11, 0);
var head = odpSkNode(neck, 0, 0.205, 0.01);
P.head = head;
if (P.noHead)
head = new THREE.Object3D();
odpSkPart(head, odpSkSph(s), "skin", 0, 0, 0, 0.092, 0.118, 0.105);
odpSkPart(head, odpSkSph(s), "skin", 0, -0.058, 0.028, 0.07, 0.058, 0.075);
odpSkPart(head, odpSkCone(0.018, 0.05, 6), "skin", 0, -0.005, 0.1, 1, 1, 1, Math.PI / 2 + 0.25, 0, 0);
[-1, 1].forEach(function (sd) {
odpSkPart(head, odpSkSph(6), "skin", sd * 0.093, -0.005, 0, 0.014, 0.03, 0.022);
odpSkPart(head, odpSkSph(6), P.glow ? "eye" : "brow", sd * 0.035, 0.012, 0.092, 0.014, 0.01, 0.008);
});
if (P.hair)
odpSkPart(head, odpSkSph(s), "hair", 0, 0.025, -0.01, 0.1, 0.11, 0.112);
if (P.hair === "long")
odpSkPart(head, odpSkLimb(0.09, 0.07, 0.32, s), "hair", 0, 0.0, -0.045, 1, 1, 0.55);
if (P.beard)
odpSkPart(head, odpSkCone(0.06, 0.16, s), "hair", 0, -0.05, 0.05, 1, 1, 0.7, Math.PI, 0, 0);
if (P.beard === "long") {
odpSkPart(head, odpSkCone(0.075, 0.32, s), "hair", 0, -0.08, 0.06, 1, 1, 0.6, Math.PI + 0.15, 0, 0);
[-1, 1].forEach(function (sd) { odpSkPart(head, odpSkCone(0.04, 0.22, s), "hair", sd * 0.045, -0.06, 0.05, 1, 1, 0.7, Math.PI + 0.1, 0, sd * 0.2); });
}
if (P.face) {
odpSkPart(head, odpSkSph(s), "skin", 0, 0.03, 0.083, 0.082, 0.024, 0.032, P.scowl ? 0.25 : 0, 0, 0);
[-1, 1].forEach(function (sd) { odpSkPart(head, odpSkSph(s), "skin", sd * 0.05, -0.012, 0.078, 0.03, 0.022, 0.022); odpSkPart(head, odpSkSph(6), "eye", sd * 0.034, 0.008, 0.094, 0.013, 0.009, 0.006); });
odpSkPart(head, odpSkSph(s), "lip", 0, -0.074, 0.089, 0.03, 0.01, 0.012);
}
if (P.horns)
[-1, 1].forEach(function (sd) { var hn = odpSkNode(head, sd * 0.06, 0.08, 0.02, 0, 0, -sd * 0.6); for (var q = 0; q < 4; q++)
odpSkPart(hn, odpSkCone(0.03 - q * 0.006, 0.09, 6), "horn", sd * q * 0.02, q * 0.075, -q * 0.01, 1, 1, 1, -q * 0.25, 0, -sd * q * 0.15); });
[-1, 1].forEach(function (sd) {
var A = po[sd > 0 ? "armL" : "armR"] || [0.05, 0.12, 0.2];
var sh = odpSkNode(spine, sd * sw, 0.455, 0, -A[0], 0, sd * A[1]);
odpSkPart(sh, odpSkSph(s), "skin", 0, 0, 0, 0.062 + 0.02 * m, 0.06 + 0.015 * m, 0.06 + 0.015 * m);
odpSkPart(sh, odpSkLimb(0.047 + 0.018 * m, 0.037 + 0.012 * m, 0.29, s), "skin", 0, -0.01, 0);
if (P.ripped) {
odpSkPart(sh, odpSkSph(s), "skin", 0, -0.14, 0.025, 0.052, 0.095, 0.052);
odpSkPart(sh, odpSkSph(s), "skin", sd * 0.03, 0.0, 0, 0.08, 0.075, 0.075);
}
var el = odpSkNode(sh, 0, -0.29, 0, -(A[2] === undefined ? 0.2 : A[2]), 0, 0);
odpSkPart(el, odpSkSph(s), "skin", 0, 0, 0, 0.038 + 0.01 * m);
odpSkPart(el, odpSkLimb(0.037 + 0.01 * m, 0.027 + 0.006 * m, 0.255, s), "skin", 0, 0, 0);
if (P.ripped)
odpSkPart(el, odpSkSph(s), "skin", 0, -0.07, 0.005, 0.045, 0.085, 0.042);
odpSkPart(el, odpSkSph(s), "skin", 0, -0.3, 0.005, 0.03, 0.062, 0.02);
if (sd > 0)
P.handL = el;
else
P.handR = el;
});
if (!P.noLegs)
[-1, 1].forEach(function (sd) {
var L = po[sd > 0 ? "legL" : "legR"] || [0, 0.03, 0.04];
var hp = odpSkNode(pelvis, sd * 0.088, -0.02, 0, -L[0], 0, sd * L[1]);
odpSkPart(hp, odpSkLimb(0.082 + 0.012 * m, 0.056 + 0.008 * m, 0.45, s), "skin", 0, 0, 0);
if (P.ripped)
odpSkPart(hp, odpSkSph(s), "skin", 0, -0.21, 0.03, 0.085, 0.18, 0.08);
var kn = odpSkNode(hp, 0, -0.45, 0, L[2] || 0, 0, 0);
odpSkPart(kn, odpSkSph(s), "skin", 0, 0, 0.005, 0.054);
odpSkPart(kn, odpSkLimb(0.054, 0.034, 0.43, s), "skin", 0, 0, 0);
if (P.ripped)
odpSkPart(kn, odpSkSph(s), "skin", 0, -0.13, -0.03, 0.056, 0.11, 0.06);
odpSkPart(kn, odpSkSph(s), "skin", 0, -0.455, 0.045, 0.042, 0.032, 0.105);
});
return root;
},
function (Q) {
var s = odpSkSeg(), root = new THREE.Object3D(), L = Q.len, r = Q.r, lg = Q.leg, by = lg + r * 0.55;
var body = odpSkNode(root, 0, by, 0, Math.PI / 2, 0, 0);
var prof = [[0.001, -L / 2], [r * 0.62, -L / 2 + r * 0.12], [r * 0.9, -L / 2 + r * 0.45], [r * 0.95, -L * 0.15], [r * 0.9, L * 0.1], [r * (Q.chest || 1.02), L * 0.3], [r * 0.85, L / 2 - r * 0.25], [r * 0.45, L / 2], [0.001, L / 2 + r * 0.04]];
odpSkPart(body, odpSkLathe(prof, s), "skin", 0, 0, 0, Q.wide || 0.92, 1, 1);
if (Q.hump)
odpSkPart(root, odpSkSph(s), "skin", 0, by + r * 0.8, -L * 0.05, r * 0.55, r * 0.7, r * 0.75);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (p) {
var front = p[1] > 0, x = p[0] * r * 0.55, z = p[1] * L * 0.34;
var hp = odpSkNode(root, x, by - r * 0.25, z, front ? -0.05 : 0.25, 0, 0), lr = Q.legR || r * 0.3, up = lg * 0.5 + r * 0.25;
odpSkPart(hp, odpSkLimb(lr * 1.25, lr * 0.75, up, s), "skin", 0, 0, 0);
var kn = odpSkNode(hp, 0, -up, 0, front ? 0.05 : -0.45, 0, 0);
odpSkPart(kn, odpSkSph(s), "skin", 0, 0, 0, lr * 0.7);
odpSkPart(kn, odpSkLimb(lr * 0.62, lr * 0.46, lg * 0.52, s), "skin", 0, 0, 0);
if (Q.paw)
odpSkPart(kn, odpSkSph(s), "skin", 0, -lg * 0.54, lr * 0.4, lr * 0.85, lr * 0.5, lr * 1.2);
else
odpSkPart(kn, odpSkLimb(lr * 0.55, lr * 0.66, lr * 0.7, s), "hoof", 0, -lg * 0.5, 0);
});
Q.bodyY = by;
if (Q.noHead) {
odpSkQuadTail(Q, root, by, L, r, s);
Q.headNodes = [];
return root;
}
var nk = odpSkNode(root, 0, by + r * 0.35, L / 2 - r * 0.35, Math.PI + (Q.nA || 0.6), 0, 0);
odpSkPart(nk, odpSkLimb(r * (Q.neckR || 0.5), r * (Q.neckR || 0.5) * 0.68, Q.neck, s), "skin", 0, 0, 0);
var heads = Q.heads || 1, H = [];
for (var h = 0; h < heads; h++) {
var off = heads > 1 ? (h - (heads - 1) / 2) : 0, hn = heads > 1 ? odpSkNode(nk, off * r * 0.55, -Q.neck * 0.85, 0, 0, 0, off * 0.5) : nk;
if (heads > 1 && h !== 1)
odpSkPart(hn, odpSkLimb(r * 0.34, r * 0.28, Q.neck * 0.5, s), "skin", 0, 0, 0);
var hd = odpSkNode(hn, 0, heads > 1 ? -Q.neck * 0.45 : -Q.neck, 0, -(Math.PI + (Q.nA || 0.6)) + (Q.hP || 0.1), off * 0.4, 0), hs = Q.head;
odpSkPart(hd, odpSkSph(s), "skin", 0, 0, 0, hs * 0.5, hs * 0.52, hs * 0.62);
odpSkPart(hd, odpSkSph(s), "skin", 0, -hs * 0.12, hs * 0.42 + Q.snout * 0.4, hs * 0.32, hs * 0.3, Q.snout * 0.6 + hs * 0.1);
odpSkPart(hd, odpSkSph(6), "nose", 0, -hs * 0.1, hs * 0.42 + Q.snout * 0.95, hs * 0.16, hs * 0.13, hs * 0.08);
[-1, 1].forEach(function (sd) {
odpSkPart(hd, odpSkSph(6), "eye", sd * hs * 0.3, hs * 0.12, hs * 0.42, hs * 0.07);
if (Q.ears)
odpSkPart(hd, odpSkCone(hs * 0.12, hs * Q.ears, 6), "skin", sd * hs * 0.3, hs * 0.35, -hs * 0.1, 1, 1, 0.5, -0.2, 0, -sd * 0.35);
if (Q.horns) {
var hn2 = odpSkNode(hd, sd * hs * 0.38, hs * 0.3, 0, 0, 0, -sd * 1.2);
for (var q = 0; q < 4; q++)
odpSkPart(hn2, odpSkCone(hs * (0.1 - q * 0.018), hs * 0.25, 6), "horn", sd * q * hs * 0.05, q * hs * 0.2, q * hs * 0.06, 1, 1, 1, 0.25 * q, 0, sd * q * 0.25);
}
});
if (Q.mane)
odpSkPart(hd, odpSkSph(s), "mane", 0, 0.02, -hs * 0.25, hs * 0.95, hs * 0.95, hs * 0.75);
H.push(hd);
}
if (Q.mane)
odpSkPart(nk, odpSkLimb(r * 0.75, r * 0.6, Q.neck * 0.9, s), "mane", 0, 0, -r * 0.08);
if (Q.crest)
odpSkPart(nk, odpSkLimb(r * 0.12, r * 0.08, Q.neck * 0.95, s), "mane", 0, 0, -r * 0.42, 1, 1, 2.2);
odpSkQuadTail(Q, root, by, L, r, s);
Q.headNodes = H;
return root;
},
function (span, bat) {
var sh = new THREE.Shape(), k;
if (bat) {
sh.moveTo(0, 0);
sh.lineTo(span * 0.35, span * 0.32);
sh.lineTo(span, span * 0.42);
for (k = 4; k >= 1; k--) {
var x = span * k / 4.2, y = span * 0.05 * k - span * 0.12;
sh.quadraticCurveTo(x + span * 0.06, y + span * 0.12, x - span * 0.02, y - span * 0.02);
}
sh.quadraticCurveTo(span * 0.1, -span * 0.18, 0, 0);
}
else {
sh.moveTo(0, 0);
sh.quadraticCurveTo(span * 0.4, span * 0.42, span, span * 0.36);
for (k = 0; k < 7; k++) {
var t0 = k / 7, t1 = (k + 1) / 7;
sh.quadraticCurveTo(span * (1 - t0 * 0.85) + span * 0.03, span * (0.36 - t0 * 0.62) - span * 0.06, span * (1 - t1 * 0.85), span * (0.36 - t1 * 0.62));
}
sh.quadraticCurveTo(span * 0.05, -span * 0.12, 0, 0);
}
var g = new THREE.ShapeGeometry(sh, ODP.lite ? 3 : 6);
g.computeVertexNormals();
return g;
},
function (B) {
var s = odpSkSeg(), root = new THREE.Object3D(), z = B.size;
odpSkPart(root, odpSkSph(s), "skin", 0, z * 0.55, 0, z * 0.32, z * 0.42, z * 0.3, B.upright ? 0 : -0.6, 0, 0);
if (!B.noHead) {
odpSkPart(root, odpSkSph(s), "skin", 0, z * 0.95, z * 0.05, z * 0.22, z * 0.22, z * 0.22);
odpSkPart(root, odpSkCone(z * 0.05, z * 0.16, 6), "nose", 0, z * 0.92, z * 0.22, 1, 1, 1, Math.PI / 2, 0, 0);
}
[-1, 1].forEach(function (sd) {
if (!B.noHead)
odpSkPart(root, odpSkSph(6), "eye", sd * z * 0.09, z * 1.0, z * 0.18, z * (B.owl ? 0.06 : 0.035));
odpSkPart(root, odpSkSph(s), "wingf", sd * z * 0.27, z * 0.6, -z * 0.03, z * 0.08, z * 0.36, z * 0.22, 0.2, 0, sd * 0.1);
odpSkPart(root, odpSkLimb(z * 0.025, z * 0.02, z * 0.22, 6), "nose", sd * z * 0.1, z * 0.24, 0);
});
if (B.owl)
[-1, 1].forEach(function (sd) { odpSkPart(root, odpSkCone(z * 0.05, z * 0.12, 5), "skin", sd * z * 0.12, z * 1.12, 0, 1, 1, 1, 0, 0, -sd * 0.3); });
odpSkPart(root, odpSkLimb(z * 0.12, z * 0.05, z * 0.35, 6), "wingf", 0, z * 0.38, -z * 0.22, 1, 1, 0.4, 0.9, 0, 0);
return root;
},
function (t) {
var Q = { len: 2.0, r: 0.42, leg: 0.95, neck: 0.55, nA: 0.75, head: 0.42, snout: 0.32, ears: 0.5, tail: 0.8, tailA: 0.9, heads: 3, paw: 1, neckR: 0.55, crest: 1 };
var M = odpStatueMats(t) || odpSkMats({ skin: 0x3A302C, mane: 0x1E1816, nose: 0x050404, horn: 0xC8B890, eye: otmGlowM(0xFF3A10), hoof: 0x0A0808 });
return odpSkMesh(odpSkBake(odpSkQuad(Q)), M);
},
function (t, o) {
o = o || {};
var Q = { len: 1.9, r: 0.38, leg: 1.15, neck: 0.85, nA: 0.55, head: 0.36, snout: 0.42, ears: 0.45, tail: 0.9, tailA: 0.35, crest: 1, chest: 1.05 };
var M = odpStatueMats(t) || odpSkMats({ skin: o.col || 0x5A3A22, mane: o.mane || 0x1A120C, nose: 0x1A1210, hoof: 0x141010, eye: 0x0A0808 });
var root = odpSkQuad(Q);
if (o.wings)
odpSkWings(root, 1.8, false, Q.bodyY + 0.3, 0.45, 0.5);
return odpSkMesh(odpSkBake(root), M, M.skin);
},
function (t, o) {
o = o || {};
var Q = { len: 1.6, r: 0.36, leg: 0.8, neck: 0.35, nA: 0.9, head: 0.4, snout: 0.22, ears: 0.25, tail: 0.9, tailA: 0.7, mane: o.mane === false ? 0 : 1, paw: 1, tufted: 1, wide: 0.85 };
var M = odpStatueMats(t) || odpSkMats({ skin: o.col || 0xB8884A, mane: o.mcol || 0x6A3A1A, nose: 0x2A1A14, eye: 0x1A1408, hoof: 0x2A1A10 });
return odpSkMesh(odpSkBake(odpSkQuad(Q)), M, M.skin);
},
function (t) {
var Q = { len: 2.0, r: 0.5, leg: 0.85, neck: 0.45, nA: 1.0, hP: 0.35, head: 0.46, snout: 0.32, ears: 0.25, tail: 0.9, tailA: 0.25, tufted: 1, horns: 1, chest: 1.1 };
var M = odpStatueMats(t) || odpSkMats({ skin: 0x3A2A20, nose: 0x1A1210, horn: 0xD8D0B8, eye: 0x0A0808, hoof: 0x1A1210, mane: 0x1A1210 });
return odpSkMesh(odpSkBake(odpSkQuad(Q)), M, M.skin);
},
function (t) {
var s = odpSkSeg(), r = new THREE.Object3D();
odpSkPart(r, odpSkSph(s), "skin", 0, 0.35, 0, 0.45, 0.32, 0.5, -0.35, 0, 0);
odpSkPart(r, odpSkSph(s), "skin", 0, 0.5, 0.32, 0.36, 0.22, 0.3);
[-1, 1].forEach(function (sd) { odpSkPart(r, odpSkSph(s), "eye", sd * 0.2, 0.68, 0.36, 0.09); odpSkPart(r, odpSkSph(s), "skin", sd * 0.38, 0.15, -0.2, 0.18, 0.14, 0.36); odpSkPart(r, odpSkSph(s), "skin", sd * 0.25, 0.12, 0.42, 0.08, 0.12, 0.12); });
var M = odpStatueMats(t) || odpSkMats({ skin: 0x4A5A2A, eye: 0xC8A020 });
return odpSkMesh(odpSkBake(r), M, M.skin);
},
function (t) {
var s = odpSkSeg(), r = new THREE.Object3D();
for (var k = 0; k < (ODP.lite ? 14 : 28); k++) {
var a = k * 0.5, rad = 0.55 - k * 0.014;
odpSkPart(r, odpSkSph(s), "skin", Math.cos(a) * rad, 0.12 + k * 0.028, Math.sin(a) * rad, 0.13 - k * 0.0025);
}
odpSkPart(r, odpSkSph(s), "skin", 0, 0.95, 0.15, 0.13, 0.09, 0.18);
[-1, 1].forEach(function (sd) { odpSkPart(r, odpSkSph(6), "eye", sd * 0.07, 0.99, 0.24, 0.025); });
var M = odpStatueMats(t) || odpSkMats({ skin: 0x2A4A2A, eye: otmGlowM(0xE8C020) });
return odpSkMesh(odpSkBake(r), M, M.skin);
},
function (t) {
var r = odpSkHuman({ f: 1, hair: "long", pose: { head: 0.15, armL: [0.5, 0.25, 0.8], armR: [0.4, 0.3, 0.9] } });
odpSkPart(r, odpSkLathe([[0.001, 0.0], [0.3, 0.02], [0.24, 0.4], [0.17, 0.85], [0.14, 1.1], [0.001, 1.12]], odpSkSeg()), "robe", 0, 0, 0, 1, 1, 0.8);
odpSkWings(r, 1.4, false, 1.35, -0.12, 0.5);
var M = odpStatueMats(t) || odpSkMats({ skin: 0xE0C0A0, hair: 0xC8A060, robe: 0xC8C0AE, wing: otmMat(0xC8C4BC, null, { ds: 1 }), brow: 0x2A1A10 });
if (t !== undefined)
M.robe = M.skin;
return odpSkMesh(odpSkBake(r), M, M.skin);
},
function (t) {
var r = odpSkHuman({ m: 1, noHead: 1, pose: { lean: 0.15, head: -0.1, armL: [0.2, 0.35, 0.6], armR: [0.6, 0.3, 1.0], legL: [0.2, 0.08, 0.15], legR: [-0.15, 0.08, 0.25] } });
var s = odpSkSeg(), B = odpSkNode(r, 0, 1.64, 0.05);
odpSkPart(B, odpSkSph(s), "skin", 0, 0.05, 0, 0.17, 0.17, 0.2);
odpSkPart(B, odpSkSph(s), "skin", 0, -0.02, 0.17, 0.12, 0.11, 0.14);
odpSkPart(B, odpSkSph(6), "nose", 0, -0.03, 0.3, 0.07, 0.05, 0.03);
[-1, 1].forEach(function (sd) {
odpSkPart(B, odpSkSph(6), "eye", sd * 0.09, 0.08, 0.14, 0.022);
var hn = odpSkNode(B, sd * 0.14, 0.14, 0, 0, 0, -sd * 1.25);
for (var q = 0; q < 5; q++)
odpSkPart(hn, odpSkCone(0.045 - q * 0.007, 0.08, 6), "horn", sd * q * 0.018, q * 0.07, q * 0.02, 1, 1, 1, 0.18 * q, 0, sd * q * 0.28);
odpSkPart(B, odpSkCone(0.04, 0.1, 5), "skin", sd * 0.16, 0.06, -0.04, 1, 1, 0.4, 0, 0, -sd * 1.4);
});
odpSkPart(r, odpSkLathe([[0.001, 0.82], [0.2, 0.84], [0.24, 0.7], [0.21, 0.62], [0.001, 0.6]], s), "cloth", 0, 0, 0, 1, 1, 0.8);
var M = odpStatueMats(t) || odpSkMats({ skin: 0x4A3024, nose: 0x1A100C, horn: 0xD8CCAA, eye: otmGlowM(0xC83010), cloth: 0x2A1A10, brow: 0x1A100C });
return odpSkMesh(odpSkBake(r), M, M.skin);
},
function (t) {
var Q = { len: 1.9, r: 0.38, leg: 1.15, tail: 0.9, tailA: 0.35, chest: 1.05, noHead: 1 }, root = odpSkQuad(Q);
var man = odpSkNode(root, 0, Q.bodyY - 0.75, 0.68);
odpSkHuman({ m: 0.7, hair: true, beard: true, noLegs: 1, pose: { lean: -0.05, armL: [1.2, 0.5, 0.5], armR: [1.0, 0.1, 1.3] } }, man);
var bow = odpSkNode(man, 0.32, 1.2, 0.62, 0, 0, 0);
for (var k = 0; k < 9; k++) {
var a = -0.9 + k * 0.225;
odpSkPart(bow, odpSkLimb(0.014, 0.014, 0.17, 6), "wood", Math.sin(a) * 0.02, Math.sin(a) * 0.75, Math.cos(a) * 0.12 - 0.1, 1, 1, 1, a * 0.6, 0, 0);
}
odpSkPart(man, odpSkLimb(0.06, 0.05, 0.5, 8), "wood", -0.12, 1.4, -0.14, 1, 1, 1, 0.4, 0, 0.2);
var M = odpStatueMats(t) || odpSkMats({ skin: 0x5E3E28, mane: 0x2A1A10, hoof: 0x1A1210, hair: 0x1A120C, brow: 0x1A120C, wood: 0x3A2412 });
return odpSkMesh(odpSkBake(root), M, M.skin);
},
function (t) {
var root = odpSkBird({ size: 1.2, upright: 1, noHead: 1 });
var hd = odpSkNode(root, 0, 1.22, 0.08);
var s = odpSkSeg();
odpSkPart(hd, odpSkSph(s), "face", 0, 0.05, 0, 0.1, 0.125, 0.11);
odpSkPart(hd, odpSkSph(s), "hair", 0, 0.09, -0.03, 0.11, 0.12, 0.12);
odpSkPart(hd, odpSkLimb(0.1, 0.06, 0.3, s), "hair", 0, 0.07, -0.06, 1, 1, 0.6);
[-1, 1].forEach(function (sd) { odpSkPart(hd, odpSkSph(6), "eye", sd * 0.035, 0.07, 0.1, 0.014); });
odpSkWings(root, 1.5, false, 0.85, -0.05, 0.9);
var M = odpStatueMats(t) || odpSkMats({ skin: 0x3A2A24, wingf: 0x2A1E1A, wing: otmMat(0x2A1E1A, null, { ds: 1 }), nose: 0x5A4A2A, face: 0xB89A88, hair: 0x0A0808, eye: otmGlowM(0xD03A18) });
return odpSkMesh(odpSkBake(root), M, M.skin);
},
function (t) {
var r = odpSkHuman({ f: 1, hair: "long", face: 1, scowl: 1, pose: { head: -0.25, armL: [0.6, 0.9, 1.6], armR: [0.7, 0.9, 1.5] } }), s = odpSkSeg();
odpSkPart(r, odpSkLathe([[0.001, 0.0], [0.32, 0.02], [0.26, 0.4], [0.18, 0.85], [0.15, 1.1], [0.001, 1.12]], s), "robe", 0, 0, 0, 1, 1, 0.8);
var hd = odpSkNode(r, 0, 1.72, 0);
for (var k = 0; k < (ODP.lite ? 8 : 16); k++) {
var a = k / (ODP.lite ? 8 : 16) * Math.PI * 2, sn = odpSkNode(hd, Math.sin(a) * 0.08, 0.04, Math.cos(a) * 0.08 - 0.02, Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9);
for (var q = 0; q < 4; q++)
odpSkPart(sn, odpSkSph(6), "snake", Math.sin(q * 1.4) * 0.02, q * 0.045, 0, 0.018 - q * 0.002);
}
odpSkWings(r, 1.5, true, 1.35, -0.12, 0.7);
var M = odpStatueMats(t) || odpSkMats({ skin: 0x8A6A64, hair: 0x1A2A10, robe: 0x4A0A0E, snake: 0x3A6A2A, wing: otmMat(0x1A1A14, null, { ds: 1 }), brow: 0x1A0A0A, eye: otmGlowM(0xC83010), lip: 0x5A2020 });
return odpSkMesh(odpSkBake(r), M, M.skin);
},
function (t) {
var r = odpSkHuman({ m: 1, hair: "long", beard: true, pose: { head: 0.1, armL: [0.05, 0.25, 0.25], armR: [0.35, 0.2, 0.7], legL: [0, 0.05, 0], legR: [0, 0.05, 0] } });
var s = 8, ch = odpSkNode(r, 0, 1.15, 0);
for (var k = 0; k < (ODP.lite ? 10 : 22); k++) {
var a = k / (ODP.lite ? 10 : 22) * Math.PI * 2;
odpSkPart(ch, new THREE.TorusGeometry(0.045, 0.012, 5, s), "iron", Math.cos(a) * 0.2, Math.sin(a * 2) * 0.02, Math.sin(a) * 0.15, 1, 1, 1, 0, -a, Math.PI / 2 * (k % 2));
}
odpSkPart(r, odpSkLathe([[0.001, 0.98], [0.2, 0.99], [0.235, 0.86], [0.25, 0.66], [0.001, 0.64]], odpSkSeg()), "cloth", 0, 0, 0, 1, 1, 0.85);
var M = odpStatueMats(t) || odpSkMats({ skin: 0x4E4036, hair: 0x1A1612, brow: 0x1A1612, cloth: 0x2A2018, iron: otmMat(0x2A2828, "metal", { phong: 60 }) });
return odpSkMesh(odpSkBake(r), M, M.skin);
},
function (key, o) {
o = o || {};
var k = "odpskin|" + key;
if (OTM.mats[k])
return OTM.mats[k];
var m = ODP.lite ? new THREE.MeshLambertMaterial({ vertexColors: true }) : new THREE.MeshPhongMaterial({ vertexColors: true, shininess: o.sh || 14, specular: o.sp || 0x2A2420 });
if (o.e !== undefined)
m.emissive = new THREE.Color(o.e);
return (OTM.mats[k] = m);
},
function (o) {
o = o || {};
var s = ODP.lite ? 9 : 15, pose = o.reach ? { lean: 0.45, head: 0.25, armL: [0.4, 0.2, 0.5], armR: [1.4, 0.25, 0.4], legL: [0.1, 0.06, 0.1], legR: [-0.1, 0.06, 0.1] }
: o.chain ? { head: 0.05, armL: [0.9, 0.05, 1.5], armR: [-0.45, 0.2, 1.3] } : { head: 0.12, armL: [0.1, 0.22, 0.3], armR: [0.25, 0.2, 0.6] };
var r = odpSkHuman({ m: 1, seg: s, ripped: 1, face: 1, scowl: o.scowl, hair: "long", beard: "long", pose: pose });
r.updateMatrixWorld(true);
odpSkPart(r, odpSkLathe([[0.001, 0.98], [0.21, 0.99], [0.245, 0.86], [0.26, 0.66], [0.2, 0.6], [0.001, 0.58]], s), "cloth", 0, 0, 0, 1, 1, 0.85);
odpSkPart(r, odpSkLimb(0.255, 0.255, 0.06, s), "belt", 0, 0.99, 0, 1, 1, 0.85);
if (o.chain) {
var n = ODP.lite ? 50 : 130;
for (var k = 0; k < n; k++) {
var u = k / n, a = u * Math.PI * 10, y = 1.55 - u * 0.62;
odpSkPart(r, new THREE.TorusGeometry(0.02, 0.007, 5, 8), "iron", Math.sin(a) * 0.235, y, Math.cos(a) * 0.16, 1, 1, 1, 0, a, Math.PI / 2 * (k % 2));
}
}
if (o.horn) {
var hn = odpSkNode(r, 0.1, 1.32, 0.16, 0.3, 0, 0.9);
odpSkHorn(hn, 1, 6, 0.05, 0.045, 0.18, "bone");
for (var k2 = 0; k2 < 14; k2++) {
var a2 = k2 / 14 * Math.PI * 2;
odpSkPart(r, odpSkSph(5), "belt", Math.sin(a2) * 0.13 + 0.03, 1.5 - Math.cos(a2) * 0.18 * (a2 < Math.PI ? 1 : 0.3), Math.cos(a2) * 0.12 + 0.02, 0.012);
}
}
var G = odpSkBake(r), seed = (o.skin || 1) % 97;
if (G.skin)
odpSkSkin(G.skin, o.skin || 0x5A4A3C, 0.22, seed);
var M = { skin: odpSkSkinMat("giant" + (o.skin || 0)), hair: otmMat(o.hair || 0x1A1612, null, { phong: 10 }), brow: otmMat(0x0E0A08, null), eye: otmMat(0x0A0808, null, { phong: 80 }), lip: otmMat(new THREE.Color(o.skin || 0x5A4A3C).multiplyScalar(0.7).getHex(), null),
cloth: otmMat(0x2A2018, "fabric"), belt: otmMat(0x3A2A1A, null, { phong: 20 }), iron: otmMat(0x2A2828, "metal", { phong: 70, spec: 0x8A8A8A }), bone: otmMat(0xC8B890, null, { phong: 40 }) };
var g = odpSkMesh(G, M, M.skin);
g.userData.keep = 1;
return g;
},
function (lite) {
var s = lite ? 11 : 22, root = new THREE.Object3D();
odpSkHuman({ m: 1, seg: s, ripped: 1, noHead: 1, pose: { lean: 0.05, armL: [0.25, 0.75, 0.9], armR: [0.3, 0.8, 0.95] } }, root);
var hd = odpSkNode(root, 0, 1.71, 0.02);
[[0, "red", 0], [1, "pale", 1.2], [-1, "black", -1.2]].forEach(function (f) {
var fc = odpSkNode(hd, f[0] * 0.088, 0, f[0] === 0 ? 0.025 : -0.02, 0, f[2], 0), k = f[1];
odpSkPart(fc, odpSkSph(s), k, 0, 0.015, 0.015, 0.084, 0.13, 0.095);
odpSkPart(fc, odpSkSph(s), k, 0, -0.075, 0.045, 0.056, 0.058, 0.066);
odpSkPart(fc, odpSkSph(s), k, 0, 0.075, -0.01, 0.08, 0.06, 0.085);
odpSkPart(fc, odpSkSph(s), k, 0, 0.042, 0.088, 0.08, 0.026, 0.034, 0.3, 0, 0);
odpSkPart(fc, odpSkCone(0.022, 0.06, 8), k, 0, -0.004, 0.112, 1, 1, 1, Math.PI / 2 + 0.35, 0, 0);
odpSkPart(fc, odpSkSph(s), "mouth", 0, -0.08, 0.098, 0.026, 0.015, 0.016);
odpSkPart(fc, odpSkLimb(0.008, 0.007, 0.07, 6), "sinner", -0.006, -0.075, 0.11, 1, 1, 1, 1.25, 0, 0.1);
odpSkPart(fc, odpSkLimb(0.008, 0.007, 0.07, 6), "sinner", 0.006, -0.075, 0.11, 1, 1, 1, 1.3, 0, -0.1);
[-1, 1].forEach(function (sd) {
odpSkPart(fc, odpSkSph(s), k, sd * 0.05, -0.015, 0.08, 0.032, 0.024, 0.024);
odpSkPart(fc, odpSkSph(8), "socket", sd * 0.035, 0.016, 0.094, 0.026, 0.017, 0.012);
odpSkPart(fc, odpSkSph(8), "eye", sd * 0.035, 0.016, 0.1, 0.016, 0.011, 0.008);
odpSkPart(fc, odpSkCone(0.02, 0.07, 6), k, sd * 0.095, 0.02, 0.0, 1, 1, 0.5, 0, 0, -sd * 1.2);
var hn = odpSkNode(fc, sd * 0.06, 0.085, 0.02, 0, 0, -sd * 0.55);
odpSkHorn(hn, sd, 7, 0.032, 0.03, 0.32, "horn");
});
});
var wings = [];
for (var w = 0; w < 3; w++)
[-1, 1].forEach(function (sd) { var wn = odpSkNode(root, sd * 0.12, 1.4 - w * 0.13, -0.1, 0, 0, 0); wn.userData.wing = { sd: sd, k: w }; wings.push(wn); });
var G = odpSkBake(root);
if (G.skin)
odpSkSkin(G.skin, 0x3A2C30, 0.3, 7);
if (G.red)
odpSkSkin(G.red, 0x6A100C, 0.3, 3);
if (G.pale)
odpSkSkin(G.pale, 0xC8BC8A, 0.18, 5);
if (G.black)
odpSkSkin(G.black, 0x1C1618, 0.4, 9);
var M = { skin: odpSkSkinMat("dis"), red: odpSkSkinMat("disred"), pale: odpSkSkinMat("dispale"), black: odpSkSkinMat("disblack", { sh: 30, sp: 0x3A3A40 }),
horn: otmMat(0x1A1418, null, { phong: 60, spec: 0x5A4A40 }), eye: otmGlowM(0xFF6A20), socket: otmMat(0x050303, null), brow: otmMat(0x0A0808, null), hair: otmMat(0x0A0808, null), mouth: otmMat(0x080404, null), sinner: otmMat(0x6A6460, null) };
var g = odpSkMesh(G, M, M.skin);
var wmat = otmMat(0x24141A, null, { ds: 1, phong: 10, e: 0x0E0304, ei: 1 }), bmat = otmMat(0x1A1216, null, { phong: 30 }), span = 1.5, wg = odpSkWing(span, true);
var tips = [[span * 0.35, span * 0.32], [span, span * 0.42]];
for (var q = 4; q >= 1; q--)
tips.push([span * q / 4.2 - span * 0.02, span * 0.05 * q - span * 0.14]);
wings.forEach(function (wn) {
var d = wn.userData.wing, h = new THREE.Group();
h.position.copy(wn.position);
h.rotation.set(0.25 - d.k * 0.25, d.sd * 0.35, d.sd * (0.25 - d.k * 0.35));
var w = new THREE.Group();
w.scale.set(d.sd, 1, 1);
w.rotation.y = d.sd > 0 ? -0.25 : 0.25;
h.add(w);
w.add(new THREE.Mesh(wg, wmat));
function bone(x0, y0, x1, y1, r0) { var L = Math.hypot(x1 - x0, y1 - y0), c = new THREE.Mesh(new THREE.CylinderGeometry(r0 * 0.6, r0, L, lite ? 5 : 8), bmat); c.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0.004); c.rotation.z = Math.atan2(y1 - y0, x1 - x0) - Math.PI / 2; w.add(c); }
bone(0, 0, tips[0][0], tips[0][1], 0.035);
bone(tips[0][0], tips[0][1], tips[1][0], tips[1][1], 0.022);
for (var f = 2; f < tips.length; f++)
bone(tips[0][0], tips[0][1], tips[f][0], tips[f][1], 0.014);
h.userData.keep = 1;
g.add(h);
(ODP.wings = ODP.wings || []).push({ g: h, sd: d.sd, k: d.k });
});
return g;
},
function () {
if (ODP.dot)
return ODP.dot;
var c = document.createElement("canvas");
c.width = c.height = 32;
var x = c.getContext("2d"), g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(0.45, "rgba(255,255,255,0.6)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, 32, 32);
ODP.dot = new THREE.CanvasTexture(c);
return ODP.dot;
},
function (parts) {
var pos = [], nor = [];
parts.forEach(function (p) {
var g = p[0].index ? p[0].toNonIndexed() : p[0];
g.applyMatrix4(p[1]);
g.computeVertexNormals();
pos.push(g.attributes.position.array);
nor.push(g.attributes.normal.array);
});
function cat(a) { var n = 0; a.forEach(function (x) { n += x.length; }); var o = new Float32Array(n), k = 0; a.forEach(function (x) { o.set(x, k); k += x.length; }); return o; }
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(cat(pos), 3));
G.setAttribute("normal", new THREE.BufferAttribute(cat(nor), 3));
return G;
},
function (i, r, f) {
var R = ODP_RING[i], P = odpAt(r, f), ry = odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI, st = otmMat(0x4A4440, "stone");
var g = otmGroup(P.x, R.y, P.z, ry);
otmBox(1.4, 2.0, 0.3, st, 0, 1.0, 0, g);
otmBox(1.6, 0.25, 0.5, st, 0, 0.12, 0, g);
otmRound(P.x, P.z, 0.8, R.y, 2.1);
var L = ODP_LESSONS.filter(function (l) { return l.k === R.les; })[0];
otmSign(["VIRGIL'S TABLET", L ? L.t : R.n], 1.3, 0.5, "#1A1614", "#E0C890", 0, 1.5, 0.17, 0, g);
otmSpot(P.x, P.z, 2.6, "📜 Virgil's tablet: " + (L ? L.t : R.n), "read, and answer", function () { odpLesson(R.les); }, { y: R.y });
return g;
},
function (r, f, y, back) {
var P = odpAt(r, f), dx = Math.sin(f) * (back ? -1 : 1), dz = -Math.cos(f) * (back ? -1 : 1);
camera.position.set(ODP.base + P.x, y + 1.72, P.z);
if (typeof yaw !== "undefined")
yaw = Math.atan2(-dx, -dz);
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
if (ODP.virgil && ODP.virgil.g && ODP.virgil.g.position) {
ODP.virgil.g.position.set(P.x - dx * 2, y, P.z - dz * 2);
}
worldCard(null);
},
function (r, f, y, col) {
var P = odpAt(r, f), g = otmGroup(P.x, y, P.z, odpRy(0, 0, Math.sin(f), -Math.cos(f))), wd = otmMat(col || 0x2A1A10, "wood");
otmBox(1.6, 0.5, 4.6, wd, 0, 0.15, 0, g);
otmBox(1.2, 0.3, 4.0, otmMat(0x120A06, null), 0, 0.32, 0, g);
otmBox(0.5, 0.45, 0.5, wd, 0, 0.2, 2.5, g).rotation.y = Math.PI / 4;
var oar = otmCyl(0.04, 4, wd, 0.9, 1.2, -1, g, 5);
oar.rotation.z = 0.5;
return g;
},
function (kind, n, cx, cz, rad, y0, y1, col, size, op) {
var g = new THREE.BufferGeometry(), a = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
var r = Math.sqrt(Math.random()) * rad, t = Math.random() * 6.28;
if (kind === "whirl")
r = rad * (0.25 + 0.75 * Math.random()) * (0.4 + 0.6 * i / n);
a[i * 3] = Math.cos(t) * r;
a[i * 3 + 1] = y0 + Math.random() * (y1 - y0);
a[i * 3 + 2] = Math.sin(t) * r;
}
g.setAttribute("position", new THREE.BufferAttribute(a, 3));
var m = new THREE.PointsMaterial({ color: col, size: size, transparent: true, opacity: op || 0.8, depthWrite: false, sizeAttenuation: true, map: odpDot() });
var p = new THREE.Points(g, m);
p.position.set(cx, 0, cz);
p.frustumCulled = false;
p.userData.keep = 1;
otmP().add(p);
var D = { kind: kind, p: p, a: a, n: n, cx: cx, cz: cz, rad: rad, y0: y0, y1: y1 };
ODP.fx.push(D);
return D;
},
function (dt, t) {
var L = worldLocal();
ODP.fx.forEach(function (D) {
if (D.kind !== "swarm" && Math.abs(L.x - D.cx) > D.rad + 60 || Math.abs(L.z - D.cz) > D.rad + 60)
return;
var a = D.a, n = D.n;
if (D.kind === "whirl") {
D.p.rotation.y += dt * (D.spin || 0.25);
return;
}
if (D.kind === "swarm") {
if (D.follow) {
var F = D.follow();
D.p.position.set(F.x, 0, F.z);
}
D.p.rotation.y += dt * 0.9;
for (var j = 0; j < n; j += 3) {
a[j * 3 + 1] += Math.sin(t * 7 + j) * dt * 0.8;
}
D.p.geometry.attributes.position.needsUpdate = true;
return;
}
if (D.kind === "ember") {
var ve = D.v || 5;
for (var e = 0; e < n; e++) {
a[e * 3 + 1] += dt * ve * (0.6 + 0.8 * ((e * 7) % 5) / 5);
a[e * 3] += Math.sin(t * 0.7 + e) * dt * 0.4;
if (a[e * 3 + 1] > D.y1)
a[e * 3 + 1] = D.y0;
}
D.p.geometry.attributes.position.needsUpdate = true;
return;
}
if (D.kind === "bubble") {
for (var b = 0; b < n; b++) {
a[b * 3 + 1] += dt * (0.25 + 0.2 * ((b * 7) % 5) / 5);
if (a[b * 3 + 1] > D.y1)
a[b * 3 + 1] = D.y0;
}
D.p.geometry.attributes.position.needsUpdate = true;
return;
}
var v = D.kind === "fire" ? 1.6 : 7;
for (var i = 0; i < n; i++) {
a[i * 3 + 1] -= v * dt * (0.8 + 0.4 * ((i * 7) % 5) / 5);
if (a[i * 3 + 1] < D.y0)
a[i * 3 + 1] = D.y1;
}
D.p.geometry.attributes.position.needsUpdate = true;
});
},
function () {
var lite = ODP.lite, seg = lite ? 72 : 160, T = ODP_T, R = ODP_RING;
odpCliff(262.4, -120, -20, 0x2A201C, seg, Math.PI / 2, 3.2);
R.forEach(function (Q, i) {
if (i === 8) {
odpRingMesh(47.5, 50, -180, Q.col, seg);
odpRingMesh(26, 29, -180, Q.col, seg);
return;
}
if (i === 7) {
odpRingMesh(66, 80, Q.y, Q.col, seg);
odpRingMesh(55, 61, Q.y, 0x1E1A12, seg);
odpRingMesh(50, 55, Q.y, 0x6A4A2A, seg);
return;
}
if (i === 9) {
var ice = new THREE.Mesh(new THREE.CircleGeometry(26, seg), otmMat(0x7E94AC, null, { phong: 120, spec: 0xC8D8F0 }));
ice.rotation.x = -Math.PI / 2;
ice.position.set(ODP_C.x, Q.y, ODP_C.z);
otmP().add(ice);
return;
}
odpRingMesh(Q.r1, Q.r0, Q.y, Q.col, seg);
});
[[240, -127.6, -120], [230, -127.6, -126], [206, -132, -126], [184, -138, -132], [162, -144, -138], [140, -150, -144], [124, -157.6, -150], [116, -157.6, -156], [80, -162, -156], [66, -164, -162], [61, -164, -162], [50, -180, -162], [26, -190, -180], [29, -184.6, -180], [47.5, -184.6, -180]]
.forEach(function (c) { odpCliff(c[0], c[1], c[2], 0x2A221E, seg); });
ODP_WATER.forEach(function (W) {
var g = new THREE.RingGeometry(W.r1, W.r0, seg, 2);
g.rotateX(-Math.PI / 2);
var m = W.glow ? otmMat(W.col, null, { phong: 110, spec: 0x603030, e: 0x160201, ei: 1 }) : otmMat(W.col, null, { phong: 90, spec: 0x404040 });
m.userData.realRough = W.glow ? 0.55 : 0.8;
m.needsUpdate = true;
var w = new THREE.Mesh(g, m);
w.position.set(ODP_C.x, W.y, ODP_C.z);
otmP().add(w);
});
ODP_RAMPS.forEach(function (Rp) {
var n = 24, f = Rp.f, st = otmMat(0x3A322C, "stone");
for (var s = 0; s < n; s++) {
var r = Rp.ra - (s + 0.5) * (Rp.ra - Rp.rc) / n, top = Rp.ya + (Rp.yb - Rp.ya) * (s + 0.5) / n, P = odpAt(r, f);
var b = otmBox(Rp.hw * 2, top - Rp.yb + 0.4, (Rp.ra - Rp.rc) / n + 0.04, st, P.x, (top + Rp.yb - 0.4) / 2, P.z);
b.rotation.y = odpRy(0, 0, Math.cos(f), Math.sin(f));
b.userData.keep = 1;
b.userData.noSit = 1;
}
[-1, 1].forEach(function (sd) {
for (var q = 0; q < (lite ? 2 : 4); q++) {
var rr = Rp.ra - 1 - q * (Rp.ra - Rp.rc - 2) / ((lite ? 2 : 4) - 1 || 1), ff = f + sd * (Rp.hw + 0.9) / rr, P2 = odpAt(rr, ff), yy = Rp.ya + (Rp.yb - Rp.ya) * Math.max(0, Math.min(1, (Rp.ra - rr) / (Rp.ra - Rp.rc)));
var rk = otmSph(0.45 + ((q * 3) % 4) * 0.1, otmMat(0x2A241E, "stone"), P2.x, yy + 0.1, P2.z, null, 6);
rk.scale.y = 0.7;
}
});
var top = odpAt(Rp.ra + 1.5, f);
odpTorch(top.x, Rp.ya + 0.2, top.z);
var bot = odpAt(Rp.rc - 1, f);
odpTorch(bot.x, Rp.yb + 0.2, bot.z);
});
R.forEach(function (Q, i) {
var n = lite ? 4 : 9, f0 = odpArr(i), f1 = i < 9 ? ODP_T[i] : f0 - 1.4, rr = i === 8 ? 48.6 : i === 9 ? 24 : Q.r0 - 1.2, cold = i === 9;
for (var k = 0; k < n; k++) {
var f = f0 + (f1 - f0) * (k + 0.5) / n + 0.03, P = odpAt(rr, f);
if (odpNearWay(P.x, P.z, 5))
continue;
odpBrazier(P.x, i === 8 ? -180 : Q.y, P.z, 1.1, cold ? 0x9AC8F0 : [0xFF7A28, 0xFF8A30, 0xE86A20][k % 3]);
}
});
odpCrags();
odpVestibule();
odpLimbo();
odpLust();
odpGluttony();
odpAvarice();
odpStyx();
odpDis();
odpViolence();
odpMalebolge();
odpCocytus();
odpSoulsMake();
if (typeof odpLife === 'function')
odpLife();
},
function () {
var lite = ODP.lite, L = [], sd = 9061, rnd = function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
function clear(x, z) { if (odpNearWay(x, z, 9))
return false; for (var i = 0; i < ODP_RAMPS.length; i++) {
var Rp = ODP_RAMPS[i], a = odpAt(Rp.ra + 1, Rp.f), b = odpAt(Rp.rc - 1, Rp.f);
if (Math.hypot(a.x - x, a.z - z) < 10 || Math.hypot(b.x - x, b.z - z) < 10)
return false;
} return true; }
for (var i = 0; i <= 6; i++) {
var R = ODP_RING[i], n = lite ? 14 : 34;
for (var k = 0; k < n; k++) {
var f = (k + rnd() * 0.6) / n * Math.PI * 2, tall = k % 3 === 0, r = R.r0 - (tall ? 1.6 : 2.2 + rnd() * 1.5), P = odpAt(r, f);
if (!clear(P.x, P.z))
continue;
L.push({ x: P.x, z: P.z, y: R.y, w: tall ? 1.4 + rnd() * 1.2 : 0.8 + rnd() * 1.1, h: tall ? 4 + rnd() * 6 : 0.7 + rnd() * 1.0, ry: rnd() * 6.28, tilt: (rnd() - 0.5) * 0.25 });
}
}
if (!L.length)
return;
var g = new THREE.DodecahedronGeometry(1, lite ? 0 : 1), pos = g.attributes.position;
for (var v = 0; v < pos.count; v++) {
var x = pos.getX(v), y = pos.getY(v), z = pos.getZ(v), q = 1 + 0.18 * Math.sin(x * 5.1 + z * 3.7) + 0.12 * Math.cos(y * 6.3);
pos.setXYZ(v, x * q, y * q, z * q);
}
g.computeVertexNormals();
var m = new THREE.InstancedMesh(g, otmMat(0x3A302A, "stone", { phong: 8 }), L.length), o = new THREE.Object3D();
L.forEach(function (c, i) { o.position.set(c.x, c.y + c.h * 0.45, c.z); o.rotation.set(c.tilt, c.ry, c.tilt * 0.5); o.scale.set(c.w, c.h * 0.6, c.w * 0.9); o.updateMatrix(); m.setMatrixAt(i, o.matrix); otmRound(c.x, c.z, c.w * 0.95, c.y, c.h); });
m.userData.keep = 1;
m.userData.noSit = 1;
m.frustumCulled = false;
otmP().add(m);
},
function () {
var R = ODP_RING[0], Y = R.y, T = ODP_T;
var b = otmGroup(0, Y, 0, 0);
otmCyl(0.06, 6, otmMat(0x2A2420, "wood"), 0, 3, 0, b, 6);
var fl = otmPlane(2.4, 1.4, otmMat(0xD8D0C0, null, { ds: 1 }), 1.2, 5.2, 0, 0, b);
b.userData.flag = fl;
b.userData.keep = 1;
ODP.banner = b;
var Sg = odpAt(247.5, Math.PI / 2 - 0.017);
otmSign(["THE VESTIBULE", "the souls who lived without infamy or praise, and the angels who took no side"], 4.2, 0.8, "#140C08", "#D8B890", Sg.x, Y + 2.2, Sg.z, odpRy(Sg.x, Sg.z, ODP_C.x, ODP_C.z) + Math.PI);
otmBox(0.2, 2.6, 0.2, otmMat(0x2A2420, "wood"), Sg.x, Y + 1.3, Sg.z);
[-0.013, 0.013].forEach(function (o) { var P = odpAt(251, Math.PI / 2 + o); odpBrazier(P.x, Y, P.z, 1.2); });
var bc = ODP.boatC = odpBoat(235.5, T[0] + 0.012, -127.2);
bc.userData.keep = 1;
odpLater(odpAt(236, T[0]).x, odpAt(236, T[0]).z, function () { return odpFig("Charon", "beard veil robe:grey staff darkaura", 0, 0.45, -1.5, 0, 1.15, bc, "charon"); });
var S = odpAt(241.5, T[0]);
odpTalkSpot(S.x, S.z, Y, "deep:charon", "the shore of the Acheron, in the Vestibule of Hell, below the Temple of the Obsidian Moon");
var gC = function () { return ODP.boatC; };
odpCarry(241.5, T[0] - 0.02, Y, 228.5, T[0] - 0.02, -126, "⛵ Charon's boat", "cross the Acheron", "⛵ <b>Across the Acheron.</b> The boat grinds on the far shore. Dante fainted here, in Canto III, and woke on the other side.", { kind: "boat", g: gC, dur: 11, start: "⛵ 'Woe unto you, ye souls depraved!' Charon pushes off, beating the water with his oar, the souls crowding the bank behind you." });
odpCarry(228.5, T[0] + 0.02, -126, 241.5, T[0] + 0.02, Y, "⛵ Charon's boat", "cross back over the Acheron", "⛵ Back across the Acheron, to the Vestibule and the Gate.", { kind: "boat", g: gC, dur: 10 });
otmSign(["THE ACHERON", "the joyless river: Charon's crossing"], 3.2, 0.7, "#140C08", "#D8B890", odpAt(243, T[0] + 0.03).x, Y + 2.4, odpAt(243, T[0] + 0.03).z, odpRy(0, 0, Math.cos(T[0]), Math.sin(T[0])) + Math.PI);
},
function () {
var R = ODP_RING[1], Y = R.y, fm = odpMid(1), C = odpAt(218, fm), lite = ODP.lite, st = otmMat(0x5A5650, "stone");
odpTablet(1, 227, odpArr(1) - 0.03);
var po = [["Homer", "laurel beard robe:white sword"], ["Horace", "laurel robe:white"], ["Ovid", "laurel robe:grey"], ["Lucan", "laurel robe:white beard"]];
po.forEach(function (p, i) {
var P = odpAt(220, fm + 0.11 + i * 0.012);
odpLater(P.x, P.z, function () { return odpFig(p[0], p[1], P.x, Y, P.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI / 2, 1); });
otmSign([p[0]], 1, 0.3, "#1A1614", "#E0D8C0", P.x, Y + 2.3, P.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI);
});
var H = odpAt(220, fm + 0.11);
odpTalkSpot(H.x, H.z, Y, "deep:homer", "the noble castle of Limbo, the first circle, below the Temple of the Obsidian Moon");
},
function () {
var R = ODP_RING[2], Y = R.y, fm = odpMid(2), lite = ODP.lite, a = odpArr(2);
odpTablet(2, 203, a - 0.04);
var M = odpAt(196, a - 0.035);
odpLater(M.x, M.z, function () {
var g = odpFig("Minos", "crown beard robe:black", M.x, Y, M.z, odpRy(M.x, M.z, ODP_C.x, ODP_C.z), 2.1);
var tl = otmMat(0x2A3A2A, null, { phong: 40 });
for (var c = 0; c < 3; c++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.9 - c * 0.12, 0.12, 6, 18), tl);
t.rotation.x = Math.PI / 2;
t.position.set(M.x, Y + 0.3 + c * 0.28, M.z);
ODP.G.add(t);
}
return g;
});
otmRound(M.x, M.z, 1.4, Y, 4.5);
var Ms = odpAt(198.6, a - 0.035);
odpTalkSpot(Ms.x, Ms.z, Y, "deep:minos", "the entrance of the second circle, where Minos judges, below the Temple of the Obsidian Moon");
var W = odpAt(195, fm);
odpDrift("whirl", lite ? 220 : 700, W.x, W.z, 12, Y + 1, Y + 14, 0x2A2228, 0.35, 0.6);
var F = odpAt(193, fm - 0.09);
odpLater(F.x, F.z, function () {
var g = new THREE.Group();
g.position.set(F.x, Y + 2.6, F.z);
ODP.G.add(g);
var a1 = odpFig("Francesca", "veil robe:red", 0, 0, 0, 0, 1, g), a2 = odpFig("Paolo", "robe:blue", 0.5, 0, 0.1, 0, 1, g);
if (a1)
a1.rotation.z = 0.25;
if (a2)
a2.rotation.z = 0.25;
ODP.lovers = g;
return g;
});
odpTalkSpot(F.x, F.z, Y, "deep:francesca", "the black whirlwind of the second circle, below the Temple of the Obsidian Moon", 3);
},
function () {
var R = ODP_RING[3], Y = R.y, fm = odpMid(3), a = odpArr(3), lite = ODP.lite;
odpTablet(3, 181, a - 0.04);
var W = odpAt(173, fm);
odpDrift("rain", lite ? 400 : 1400, W.x, W.z, 34, Y, Y + 22, 0x8A98A8, 0.12, 0.55);
var C = odpAt(172, fm + 0.08);
var Ai = odpAt(ODP_IN[3][0], ODP_IN[3][1]), cry = Math.atan2(Ai.x - C.x, Ai.z - C.z);
odpLater(C.x, C.z, function () { var g = odpCreature("cerberus", C.x, Y, C.z, cry, ODP.lite ? 8 : 9); if (g && g.position) {
ODP.cerb = g;
ODP.cerbY = g.position.y;
} return g; });
otmSolid(C.x, C.z, 2.6, 5.2, Y, 8, cry);
otmSpot(C.x + Math.sin(cry) * 7, C.z + Math.cos(cry) * 7, 6, "🐕 Cerberus", "look", function () { otmSay("🐕 <b>Cerberus</b>, the great worm with three throats, red-eyed, with a greasy black beard, barks over the gluttons and flays them. Virgil quieted him by throwing earth into his jaws (Canto VI)."); }, { y: Y });
var Ci = odpAt(170, fm - 0.06);
odpLater(Ci.x, Ci.z, function () { var g = odpFig("Ciacco", "robe:brown", Ci.x, Y, Ci.z, odpRy(Ci.x, Ci.z, ODP_C.x, ODP_C.z) + Math.PI, 1); if (g) {
g.rotation.x = -0.5;
g.position.y = Y - 0.35;
} return g; });
odpTalkSpot(Ci.x, Ci.z, Y, "deep:ciacco", "the rain and mud of the third circle, below the Temple of the Obsidian Moon");
},
function () {
var R = ODP_RING[4], Y = R.y, a = odpArr(4);
odpTablet(4, 159, a - 0.04);
var P = odpAt(153, a - 0.05);
odpLater(P.x, P.z, function () { return odpFig("Plutus", "crown beard robe:gold", P.x, Y, P.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI, 1.9); });
otmRound(P.x, P.z, 1.2, Y, 4);
var Ps = odpAt(155.5, a - 0.05);
otmSign(["PLUTUS", "'Pape Satan, Pape Satan, Aleppe!' (Canto VII)"], 2.8, 0.6, "#1A140A", "#E8C870", Ps.x, Y + 2.2, Ps.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI);
},
function () {
var R = ODP_RING[5], Y = R.y, a = odpArr(5), T = ODP_T, lite = ODP.lite;
odpTablet(5, 137, a - 0.04);
var n = lite ? 120 : 400, rd = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.02, 0.03, 1.6, 4), otmMat(0x2A3A1A, null), n), M = new THREE.Matrix4(), fm = odpMid(5);
for (var i = 0; i < n; i++) {
var P = odpAt(116.5 + Math.random() * 9, fm - 0.6 + Math.random() * 1.2);
M.copy(odpM4(P.x, -157 + 0.6, P.z, (Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3, 0.7 + Math.random() * 0.6));
rd.setMatrixAt(i, M);
}
rd.userData.keep = 1;
otmP().add(rd);
var To = odpAt(131, a - 0.12);
otmCyl(1.6, 9, otmMat(0x2A2420, "stone"), To.x, Y + 4.5, To.z, null, 10, 1.9);
otmRound(To.x, To.z, 1.9, Y, 9);
odpFire(To.x - 0.5, Y + 9.1, To.z, 3, 0xFF8A30);
odpFire(To.x + 0.5, Y + 9.1, To.z, 3, 0xFF8A30);
var bp = ODP.boatP = odpBoat(121, T[5] + 0.02, -157.2, 0x1A120C);
bp.userData.keep = 1;
var Ph = odpAt(121, T[5] + 0.02);
odpLater(Ph.x, Ph.z, function () { return odpFig("Phlegyas", "beard robe:red", 0, 0.45, -1.5, 0, 1.1, bp); });
var gP = function () { return ODP.boatP; };
odpCarry(125.5, T[5], Y, 111.5, T[5], -156, "⛵ Phlegyas' boat", "cross the Styx to the City of Dis", "⛵ <b>Inside the City of Dis.</b> The red-hot walls behind you, the burning tombs ahead.", { kind: "boat", g: gP, dur: 16, start: "⛵ 'Now art thou caught, foul soul!' Phlegyas rows hard across the marsh, the boat sitting low with a living man's weight.",
ev: [{ u: 0.5, hold: 9, when: function () { return !ODP.gateOpen; }, fn: function () { otmSay("😈 <b>The gate slams shut.</b> More than a thousand fallen angels on the walls cry out against the living man, and the three Furies scream from the tower for Medusa. Virgil stands, pale. Wait: someone is coming over the water."); setTimeout(odpMessenger, 2500); } }],
done: function () { odpTask("styx"); } });
odpCarry(111.5, T[5] + 0.03, -156, 125.5, T[5] + 0.03, Y, "⛵ Phlegyas' boat", "cross back over the Styx", "⛵ Back over the Styx to the fifth circle.", { kind: "boat", g: gP, dur: 12 });
},
function () {
var R = ODP_RING[6], Y = R.y, a = odpArr(6), T = ODP_T, lite = ODP.lite, seg = lite ? 72 : 160;
var wm = otmMat(0x2E1410, "metal", { phong: 30, e: 0x1C0402, ei: 1 });
[113.6, 116.1].forEach(function (r) { var g = new THREE.CylinderGeometry(r, r, 14, seg, 2, true, (Math.PI / 2 - T[5]) + 4 / r, Math.PI * 2 - 8 / r); var m = new THREE.Mesh(g, wm); m.material.side = THREE.DoubleSide; m.position.set(ODP_C.x, Y + 7 - 1.6, ODP_C.z); otmP().add(m); });
var tg = new THREE.RingGeometry(113.6, 116.1, seg, 1, (T[5]) + 4 / 115, Math.PI * 2 - 8 / 115);
tg.rotateX(-Math.PI / 2);
var top = new THREE.Mesh(tg, wm);
top.position.set(ODP_C.x, Y + 12.4, ODP_C.z);
top.scale.z = -1;
otmP().add(top);
var nc = lite ? 80 : 220, cren = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 1.2, 2.6), wm, nc), M = new THREE.Matrix4();
for (var c = 0; c < nc; c++) {
var f = c / nc * Math.PI * 2;
if (Math.abs(odpDA(f, T[5])) * 115 < 5)
f += 0.08;
var P = odpAt(114.85, f);
cren.setMatrixAt(c, odpM4(P.x, Y + 13, P.z, 0, odpRy(0, 0, Math.cos(f), Math.sin(f)), 0));
}
cren.userData.keep = 1;
otmP().add(cren);
[-1, 1].forEach(function (sd) {
var P = odpAt(114.85, T[5] + sd * 5.2 / 115);
otmCyl(2.4, 18, wm, P.x, Y + 9 - 1.6, P.z, null, 12);
otmRound(P.x, P.z, 2.4, Y, 18);
odpFire(P.x, Y + 16.6, P.z, 3.5, 0xFF5A20);
});
otmSign(["THE CITY OF DIS", "the lower Hell begins here"], 3, 0.7, "#1A0A06", "#F0A070", odpAt(111, T[5] + 0.05).x, Y + 2.4, odpAt(111, T[5] + 0.05).z, odpRy(0, 0, Math.cos(T[5]), Math.sin(T[5])));
odpTablet(6, 110, T[5] - 0.06);
var nt = lite ? 50 : 140, tb = new THREE.InstancedMesh(new THREE.BoxGeometry(1.2, 0.9, 2.4), otmMat(0x3A3430, "stone"), nt), ld = new THREE.InstancedMesh(new THREE.BoxGeometry(1.3, 0.15, 2.5), otmMat(0x4A4440, "stone"), nt), fi = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.0, 2.2), new THREE.MeshBasicMaterial({ color: 0xFF6A20 }), nt);
var tombs = [];
for (var t = 0; t < nt; t++) {
var ring = Math.floor(t / (nt / 5)), r = 84 + ring * 4.6 + ((t * 13) % 7) * 0.2, f = (t % (nt / 5)) / (nt / 5) * Math.PI * 2 + ring * 0.09;
if (Math.abs(odpDA(f, ODP_T[6])) * r < 5)
f += 0.07;
var P = odpAt(r, f), ry = odpRy(0, 0, Math.cos(f), Math.sin(f));
tb.setMatrixAt(t, odpM4(P.x, Y + 0.45, P.z, 0, ry, 0));
var lo = odpAt(r + 0.9, f);
ld.setMatrixAt(t, odpM4(lo.x, Y + 0.5, lo.z, 0, ry, 0.9));
fi.setMatrixAt(t, odpM4(P.x, Y + 0.91, P.z, -Math.PI / 2, 0, 0).multiply(new THREE.Matrix4().makeRotationZ(-ry)));
tombs.push({ x: P.x, z: P.z, ry: ry });
otmSolid(P.x, P.z, 0.65, 1.25, Y, 1.0, ry);
}
[tb, ld, fi].forEach(function (m) { m.userData.keep = 1; otmP().add(m); });
ODP.tombs = tombs;
var fm = odpMid(6), near = tombs.filter(function (T2) { var p = odpPolar(T2.x, T2.z); return Math.abs(odpDA(p.f, fm)) < 0.5; }).slice(0, lite ? 6 : 16);
near.forEach(function (T2, i) { odpFire(T2.x, Y + 0.9, T2.z, i % 2 ? 3 : 2.4, 0xFF6A20); });
var Fa = odpAt(96, fm + 0.05);
otmBox(1.2, 0.9, 2.4, otmMat(0x3A3430, "stone"), Fa.x, Y + 0.45, Fa.z).rotation.y = odpRy(0, 0, Math.cos(fm), Math.sin(fm));
otmSolid(Fa.x, Fa.z, 0.9, 0.9, Y, 1);
odpLater(Fa.x, Fa.z, function () { return odpFig("Farinata degli Uberti", "robe:red beard", Fa.x, Y - 0.4, Fa.z, odpRy(Fa.x, Fa.z, ODP_C.x, ODP_C.z) + Math.PI, 1.05); });
odpFire(Fa.x + 0.3, Y + 0.9, Fa.z, 2.4, 0xFF6A20);
var Fs = odpAt(98.5, fm + 0.05);
odpTalkSpot(Fs.x, Fs.z, Y, "deep:farinata", "his open burning tomb in the City of Dis, below the Temple of the Obsidian Moon");
var Gc = odpAt(104, a - 0.2), gry = odpRy(Gc.x, Gc.z, ODP_C.x, ODP_C.z) + Math.PI, ob = otmMat(0x0E0C12, "marble", { phong: 90 }), gd = otmMat(0xB8923A, "metal", { phong: 70 });
var gg = otmGroup(Gc.x, Y, Gc.z, gry);
otmBox(2.2, 12, 2.2, ob, -4, 6, 0, gg);
otmBox(2.2, 12, 2.2, ob, 4, 6, 0, gg);
otmBox(10.4, 1.6, 2.6, ob, 0, 12.6, 0, gg);
otmBox(10.6, 0.25, 2.8, gd, 0, 11.7, 0, gg);
otmPlane(5.8, 11, otmGlowM(0x1A0408), 0, 5.6, 0, 0, gg);
otmSolid(Gc.x, Gc.z, 5.2, 1.2, Y, 12, gry);
var gs = odpAt(100.5, a - 0.2);
otmSign(["THE INFERNAL COURT", "the palaces of the kings and princes of the Goetia"], 5, 0.9, "#0E0A0E", "#E8C878", gs.x, Y + 10, gs.z, gry);
odpBrazier(odpAt(100.5, a - 0.2 - 5.5 / 104).x, Y, odpAt(100.5, a - 0.2 - 5.5 / 104).z, 1.2);
odpBrazier(odpAt(100.5, a - 0.2 + 5.5 / 104).x, Y, odpAt(100.5, a - 0.2 + 5.5 / 104).z, 1.2);
otmSpot(gs.x, gs.z, 3, "👑 The Gate of the Infernal Court", "go in", function () { odpCourtGo(); }, { y: Y });
var Mi = odpAt(82.2, ODP_T[6] + 0.05), Me = [odpAt(82.2, ODP_T[6] + 0.05 - 7 / 82), odpAt(82.2, ODP_T[6] + 0.05 + 7 / 82)], ms = otmRound(Mi.x, Mi.z, 1.0, Y, 5);
odpLater(Mi.x, Mi.z, function () {
var g = odpMinotaurMake();
if (!g)
return odpCreature("minotaur", Mi.x, Y, Mi.z, odpRy(Mi.x, Mi.z, ODP_C.x, ODP_C.z), 3.4);
g.scale.setScalar(2.5);
g.position.set(Mi.x, Y, Mi.z);
g.rotation.y = odpRy(Mi.x, Mi.z, ODP_C.x, ODP_C.z);
ODP.G.add(g);
ODP.mino = { g: g, y: Y, ends: Me, to: 0, st: "charge", at: 0, solid: ms };
return g;
});
otmSpot(Mi.x, Mi.z, 7, "🐂 The Minotaur", "look", function () { otmSay("🐂 <b>The Minotaur</b>, 'the infamy of Crete', bit himself with rage at the head of the great landslide, and Virgil sent him plunging while Dante ran past (Canto XII)."); }, { y: Y });
},
function () {
if (ODP.treeGeo)
return ODP.treeGeo;
var P = [], cy = function (r0, r1, h) { return new THREE.CylinderGeometry(r1, r0, h, 5); };
P.push([cy(0.28, 0.18, 3.2), odpM4(0, 1.6, 0, 0, 0, 0.12)]);
[[0.9, 2.4, 0.9, 0.7], [-0.8, 2.9, -0.5, -0.8], [0.3, 3.4, -0.9, 0.4], [-0.4, 2.0, 0.8, -0.6]].forEach(function (b) { P.push([cy(0.12, 0.04, 2.2), odpM4(b[0] * 0.6, b[1], b[2] * 0.6, b[2], 0, b[3])]); P.push([cy(0.05, 0.01, 1.0), odpM4(b[0] * 1.3, b[1] + 0.9, b[2] * 1.3, -b[2] * 0.5, 0, -b[3])]); });
ODP.treeGeo = odpMerge(P);
return ODP.treeGeo;
},
function () {
var R = ODP_RING[7], Y = R.y, a = odpArr(7), T = ODP_T, lite = ODP.lite;
odpTablet(7, 77, a - 0.05);
for (var c = 0; c < (lite ? 1 : 3); c++) {
(function (c) { var P = odpAt(68, a - 0.12 - c * 0.05); odpLater(P.x, P.z, function () { return odpCreature("centaur", P.x, Y, P.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z), 2.6); }); otmRound(P.x, P.z, 1.2, Y, 2.6); })(c);
}
var fN = a - 0.22;
var Ns = odpAt(66.5, fN + 0.02);
odpLater(Ns.x, Ns.z, function () { var g = odpCreature("centaur", Ns.x, Y, Ns.z, odpRy(Ns.x, Ns.z, ODP_C.x, ODP_C.z), 2.6); if (g) {
g.userData.keep = 1;
ODP.nessus = g;
} return g; });
var gN = function () { return ODP.nessus; };
odpCarry(67.5, fN, Y, 59.5, fN, Y, "🐎 Nessus the centaur", "ride across the Phlegethon", "🐎 <b>Over the river of blood.</b> Nessus sets you down on the far bank, by the wood.", { kind: "beast", g: gN, dur: 9, lift: 1.1, pts: [{ r: 67.5, f: fN, y: Y }, { r: 65, f: fN - 0.04, y: Y }, { r: 63.5, f: fN - 0.09, y: -163.4 }, { r: 62, f: fN - 0.12, y: -163.4 }, { r: 60.5, f: fN - 0.08, y: Y }, { r: 59.5, f: fN, y: Y }], start: "🐎 <b>Nessus</b> takes you on his back and wades along the boiling river at its shallowest, as he carried Dante (Canto XII), naming the tyrants sunk in it to the eyebrows: Alexander, Dionysius of Syracuse, Ezzelino." });
odpCarry(59.5, fN + 0.03, Y, 67.5, fN + 0.03, Y, "🐎 Nessus the centaur", "ride back across the Phlegethon", "🐎 Nessus carries you back over the river of blood.", { kind: "beast", g: gN, dur: 7, lift: 1.1 });
var n = lite ? 40 : 120, tr = new THREE.InstancedMesh(odpTree(), otmMat(0x2A2018, "bark"), n);
for (var i = 0; i < n; i++) {
var f = a - 0.05 - Math.random() * 1.0, r = 55.6 + Math.random() * 5;
if (Math.abs(odpDA(f, fN)) * r < 2.4)
f -= 0.08;
var P = odpAt(r, f);
tr.setMatrixAt(i, odpM4(P.x, Y, P.z, (Math.random() - 0.5) * 0.2, Math.random() * 6.28, (Math.random() - 0.5) * 0.2, 0.8 + Math.random() * 0.6));
otmRound(P.x, P.z, 0.35, Y, 3);
}
tr.userData.keep = 1;
otmP().add(tr);
for (var h = 0; h < (lite ? 1 : 3); h++) {
(function (h) { var P = odpAt(57.5, fN - 0.1 - h * 0.07); odpLater(P.x, P.z, function () { return odpCreature("harpy", P.x, Y + 2.6, P.z, Math.random() * 6, 1.6); }); })(h);
}
var Pi = odpAt(57.5, fN - 0.05);
var pt = new THREE.Mesh(odpTree(), otmMat(0x3A2418, "bark"));
pt.position.set(Pi.x, Y, Pi.z);
pt.scale.setScalar(1.2);
otmP().add(pt);
otmRound(Pi.x, Pi.z, 0.4, Y, 3);
odpTalkSpot(Pi.x, Pi.z, Y, "deep:pier", "the wood of the suicides in the seventh circle, as a thornbush, below the Temple of the Obsidian Moon", 2.6);
var fm = odpMid(7), S = odpAt(52.5, fm);
odpDrift("fire", lite ? 150 : 500, S.x, S.z, 26, Y, Y + 18, 0xFF8A30, 0.32, 0.85);
var Br = odpAt(52.5, fm - 0.25);
odpLater(Br.x, Br.z, function () { return odpFig("Brunetto Latini", "robe:brown beard", Br.x, Y, Br.z, odpRy(Br.x, Br.z, ODP_C.x, ODP_C.z) + Math.PI, 1); });
odpTalkSpot(Br.x, Br.z, Y, "deep:brunetto", "the burning sand of the seventh circle, under the slow rain of fire, below the Temple of the Obsidian Moon");
var Ge = odpAt(48, T[7]);
odpLater(Ge.x, Ge.z, function () {
var g = new THREE.Group();
g.position.set(Ge.x, Y - 1.5, Ge.z);
g.rotation.y = odpRy(Ge.x, Ge.z, ODP_C.x, ODP_C.z) + Math.PI;
ODP.G.add(g);
var sk = otmMat(0x3A4A3A, null, { phong: 50 }), fc = otmMat(0xC8A890, null);
for (var s = 0; s < 9; s++) {
var sg = otmSph(0.9 - s * 0.07, sk, 0, -s * 1.1, -s * 0.7, g, 10);
sg.scale.z = 1.4;
}
otmSph(0.55, fc, 0, 1.0, 0.3, g, 12);
otmBox(0.9, 0.12, 0.04, otmMat(0x3A2A20, null), 0, 1.1, 0.82, g);
[-1, 1].forEach(function (sd) { otmCyl(0.12, 1.6, sk, sd * 0.9, 0, 0.6, g, 6).rotation.z = sd * 0.9; });
var tl = otmCyl(0.25, 1.6, otmMat(0x2A1A10, null), 0, -10.6, -6.8, g, 6, 0.05);
tl.rotation.x = -0.7;
ODP.geryon = g;
return g;
});
odpCarry(51.5, T[7], Y, 48.8, T[7] - 0.02, -180, "🐉 Geryon", "ride down on his back", "🐉 <b>Malebolge.</b> Geryon shakes you off at the cliff's foot and is gone 'like an arrow from the string'.", { g: function () { return ODP.geryon; }, pts: odpGeryonPath(), dur: 22, lift: 0.9, start: "🐉 <b>Geryon</b> swims out into the dark air 'wheeling and descending', 'with the face of a just man' and a scorpion's tail (Canto XVII). Below, the ten ditches of Malebolge turn slowly under you." });
},
function () {
var R = ODP_RING[8], Y = -180, a = odpArr(8), lite = ODP.lite, seg = lite ? 64 : 140;
odpTablet(8, 49.3, a - 0.08);
odpCarry(48.8, a + 0.04, Y, 51.5, a + 0.04, -162, "🐉 Geryon", "ride back up to the burning sand", "🐉 Geryon carries you back up the cliff to the sand.", { g: function () { return ODP.geryon; }, pts: odpGeryonPath().reverse(), dur: 16, lift: 0.9 });
for (var j = 0; j < 10; j++) {
var ro = 47.5 - j * 1.85, ri = j === 9 ? 29 : ro - 1.35;
odpRingMesh(ri, ro, -184.5, j === 4 ? 0x1A140A : j === 6 ? 0x1A1A10 : 0x1C1816, seg);
if (j < 9) {
odpRingMesh(ro - 1.85, ri, Y, 0x2E2A26, seg);
odpCliff(ri, -184.6, Y, 0x2A2622, seg);
odpCliff(ro - 1.85, -184.6, Y, 0x2A2622, seg);
}
}
var st = otmMat(0x4A4440, "stone"), f = ODP_BRIDGE, ry = odpRy(0, 0, Math.cos(f), Math.sin(f));
for (var s = 0; s < 10; s++) {
var r = 47.5 - s * 1.85 - 0.9, P = odpAt(r, f);
otmBox(3, 0.5, 1.9, st, P.x, Y - 0.25, P.z).rotation.y = ry;
[-1, 1].forEach(function (sd) { var Q = odpAt(r, f + sd * 1.4 / r); otmBox(0.25, 0.8, 1.9, st, Q.x, Y + 0.4, Q.z).rotation.y = ry; });
var ar = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 5, 10, Math.PI), st);
ar.position.set(P.x, -184.5, P.z);
ar.rotation.y = ry + Math.PI / 2;
otmP().add(ar);
}
var names = ["panders and seducers", "flatterers", "simoniacs", "false prophets", "barrators", "hypocrites", "thieves", "false counsellors", "sowers of discord", "falsifiers"];
for (var k = 0; k < 10; k++) {
var r2 = 47.5 - k * 1.85 - 0.7, Q2 = odpAt(r2, f + 1.7 / r2);
otmSign([(k + 1) + ": " + names[k]], 1.4, 0.3, "#1A1614", "#D8C8A8", Q2.x, Y + 1.2, Q2.z, ry - Math.PI / 2);
}
var r8 = 47.5 - 7 * 1.85 - 0.68, U = odpAt(r8, f + 0.05);
var fl = otmGroup(U.x, -184.5, U.z, 0);
odpFire(-0.35, 0, 0, 7, 0xFF9A40, fl);
odpFire(0.35, 0.4, 0, 8.5, 0xFFB050, fl);
var Us = odpAt(r8, f + 0.02);
otmSpot(Us.x, Us.z, 2.4, "🔥 The two-horned flame", "talk with Ulysses", function () { otmTalk("deep:ulysses", "the two-horned flame in the eighth ditch of Malebolge, below the Temple of the Obsidian Moon"); }, { y: Y });
for (var c = 0; c < (lite ? 3 : 8); c++) {
var Fc = odpAt(r8, f - 0.2 - c * 0.12);
odpFire(Fc.x, -184.5, Fc.z, 5, 0xFF8A30);
}
var T8 = ODP_T[8];
odpCarry(27.6, T8, Y, 21, T8 - 0.12, -190, "✋ Antaeus", "be set down on the ice", "✋ <b>On the ice of Cocytus.</b> Antaeus rises again 'as a mast does in a ship'.", { dur: 9, pts: [{ r: 27.6, f: T8, y: Y }, { r: 26.6, f: T8 + 0.05, y: -176 }, { r: 25, f: T8 + 0.08, y: -178 }, { r: 23, f: T8 - 0.02, y: -185 }, { r: 21, f: T8 - 0.12, y: -190 }], done: function () { odpFaceDis(); }, start: "✋ <b>Antaeus</b>, who was not chained, stoops 'like the Carisenda', the leaning tower of Bologna, takes you up in his hand and lowers you to the frozen lake (Canto XXXI)." });
},
function () {
var Y = -190, a = odpArr(9), lite = ODP.lite;
odpTablet(9, 18.5, a - 0.24);
odpCarry(22, a + 0.06, Y, 27.6, a + 0.06, -180, "✋ Antaeus", "be lifted back to the edge of the well", "✋ Antaeus lifts you back to the rim of the well.", { dur: 8, pts: [{ r: 22, f: a + 0.06, y: Y }, { r: 23.5, f: a + 0.08, y: -184 }, { r: 26, f: a + 0.07, y: -177 }, { r: 27.6, f: a + 0.06, y: -180 }] });
var U = odpAt(17, a - 0.08), hm = otmMat(0x8A8480, null);
otmSph(0.22, hm, U.x, Y + 0.15, U.z, null, 10);
var U2 = odpAt(17.4, a - 0.08);
otmSph(0.22, hm, U2.x, Y + 0.2, U2.z, null, 10);
odpTalkSpot(U.x, U.z, Y, "deep:ugolino", "the ice of Antenora in the ninth circle, below the Temple of the Obsidian Moon", 2.6);
ODP.wings = [];
var D = odpDisFigure(lite);
D.scale.setScalar(22);
D.position.set(ODP_C.x, Y - 29.5, ODP_C.z);
D.rotation.y = odpRy(ODP_C.x, ODP_C.z, odpAt(20, a).x, odpAt(20, a).z);
otmP().add(D);
otmRound(ODP_C.x, ODP_C.z, 4.6, Y, 14);
var mist = odpDrift("whirl", lite ? 120 : 360, ODP_C.x, ODP_C.z, 16, Y + 0.2, Y + 3, 0xD8E0F0, 0.5, 0.35);
mist.spin = 0.6;
var ns = lite ? 40 : 110, sh = new THREE.InstancedMesh(new THREE.ConeGeometry(0.7, 3, 5), new THREE.MeshPhongMaterial({ color: 0xB8D0E8, transparent: true, opacity: 0.8, shininess: 120, specular: 0xFFFFFF, depthWrite: false }), ns), so = new THREE.Object3D(), dr = D.rotation.y;
for (var q = 0; q < ns; q++) {
var qa = q / ns * Math.PI * 2 + Math.random() * 0.05, rx = 5.2 + Math.random() * 1.6, rz = 3.6 + Math.random() * 1.4, lx = Math.cos(qa) * rx, lz = Math.sin(qa) * rz;
so.position.set(ODP_C.x + lx * Math.cos(dr) + lz * Math.sin(dr), Y + 0.3, ODP_C.z - lx * Math.sin(dr) + lz * Math.cos(dr));
so.rotation.set(Math.sin(qa) * 0.4 + (Math.random() - 0.5) * 0.4, Math.random() * 6, -Math.cos(qa) * 0.4);
so.scale.set(0.6 + Math.random() * 0.8, 0.4 + Math.random() * 1.0, 0.6 + Math.random() * 0.8);
so.updateMatrix();
sh.setMatrixAt(q, so.matrix);
}
sh.renderOrder = 3;
otmP().add(sh);
var E = odpAt(7, a - 0.6);
otmSpot(E.x, E.z, 3, "🌟 Down his side, and out", "climb down and out to the stars", function () {
var P0 = odpPolar(E.x, E.z), pts = [{ r: P0.r, f: P0.f, y: Y }];
for (var k = 1; k <= 10; k++)
pts.push({ r: Math.max(3.2, P0.r - k * 0.4), f: P0.f - k * 0.35, y: Y - k * 3.2 });
odpRide(pts, 12, { start: "🌟 You take hold of the shaggy hide as Virgil did, and climb down from tuft to tuft between the matted hair and the frozen crust. At the hip, Virgil turns head to heels: you are past the centre of the earth.", done: function () { if (typeof odpBurrow === "function")
odpBurrow();
else {
odpTask("out");
odpOut();
} } });
}, { y: Y });
otmSpot(odpAt(8, a).x, odpAt(8, a).z, 4, "👁️ Dis, the emperor of the sorrowful realm", "look", function () { otmSay("👁️ <b>Dis</b>, Dante's Lucifer, frozen to the chest: three faces, red, yellow-white and black, and under each two great wings like a bat's, whose beating freezes Cocytus. In each mouth a traitor: Judas, Brutus and Cassius (Canto XXXIV)."); }, { y: Y });
},
function () {
worldCard(null);
var p = otmProg();
p.deep = p.deep || {};
p.deep.out = Date.now();
otmProgSave();
if (typeof otmGo === "function")
otmGo("circle");
setTimeout(function () { otmSay("🌟 <b>'Thence we came forth to rebehold the stars.'</b> The last line of the Inferno. You stand in the stone circle in the dark woods behind the temple, under the open sky."); }, 900);
},
function (pose, extra) {
var k = "shade:" + pose + (extra || "") + (ODP.lite ? "L" : "");
if (ODP_SK.g[k])
return ODP_SK.g[k];
var P = ODP_POSES[pose] || ODP_POSES.stand, seg = ODP.lite ? 5 : 8;
var fem = pose === "spread" || pose === "hide" || pose === "reach" && extra !== "demon";
var r = odpSkHuman({ pose: P, seg: seg, hair: false, f: fem ? 1 : 0 });
var out = odpSkBake(r, true).all;
if (!extra) {
var rh = odpSkHuman({ pose: P, seg: seg, hair: fem ? "long" : true, beard: !fem && pose !== "run", f: fem ? 1 : 0 });
var Gh = odpSkBake(rh);
if (Gh.hair)
ODP_SK.g[k + "|hair"] = Gh.hair;
}
if (extra === "cloak") {
var c = new THREE.Object3D(), sp = odpSkNode(c, 0, 0.93, 0, P.lean || 0, 0, 0);
odpSkPart(sp, odpSkLathe([[0.001, -0.9], [0.36, -0.88], [0.3, -0.4], [0.25, 0.1], [0.22, 0.45], [0.16, 0.62], [0.001, 0.66]], seg + 2), "cloak", 0, 0, 0, 1, 1, 0.85);
odpSkPart(sp, odpSkSph(seg), "cloak", 0, 0.76, 0.02, 0.15, 0.17, 0.16);
var cg = odpSkBake(c, true).all;
ODP_SK.g[k + "|cloak"] = cg;
}
if (extra === "demon") {
var d = odpSkHuman({ pose: P, seg: seg, m: 0.8, horns: true });
odpSkWings(d, 0.9, true, 1.32, -0.12, 0.6);
odpSkPart(d, odpSkLimb(0.02, 0.02, 2.2, 5), "skin", 0.35, 2.0, 0.25, 1, 1, 1, 0.2, 0, -0.15);
odpSkPart(d, odpSkCone(0.05, 0.25, 5), "skin", 0.08, 2.1, 0.47, 1, 1, 1, 1.9, 0, 0);
out = odpSkBake(d, true).all;
}
return (ODP_SK.g[k] = out);
},
function () {
if (ODP_SK.g.snakeI)
return ODP_SK.g.snakeI;
var s = ODP.lite ? 5 : 7, r = new THREE.Object3D();
for (var k = 0; k < (ODP.lite ? 8 : 14); k++) {
var a = k * 0.55, rad = 0.32 - k * 0.012;
odpSkPart(r, odpSkSph(s), "skin", Math.cos(a) * rad, 0.06 + k * 0.03, Math.sin(a) * rad, 0.07 - k * 0.002);
}
odpSkPart(r, odpSkSph(s), "skin", 0, 0.5, 0.1, 0.07, 0.05, 0.1);
return (ODP_SK.g.snakeI = odpSkBake(r, true).all);
},
function () {
if (ODP.ftex)
return ODP.ftex;
var c = document.createElement("canvas");
c.width = 32;
c.height = 64;
var x = c.getContext("2d");
var g = x.createLinearGradient(0, 64, 0, 0);
g.addColorStop(0, "rgba(255,250,220,1)");
g.addColorStop(0.3, "rgba(255,190,90,0.95)");
g.addColorStop(0.7, "rgba(230,80,20,0.6)");
g.addColorStop(1, "rgba(120,20,0,0)");
x.fillStyle = g;
x.fillRect(0, 0, 32, 64);
return (ODP.ftex = new THREE.CanvasTexture(c));
},
function () {
var lite = ODP.lite, k = lite ? 0.35 : 1, L = [], R = ODP_RING, tries;
function N(n) { return Math.max(6, Math.round(n * k)); }
function add(s) { s.ph = odpRnd() * 6.28; s.sp = 0.6 + odpRnd() * 0.8; s.s = 0.86 + odpRnd() * 0.28; L.push(s); return s; }
var cast = odpAt(218, odpMid(1));
for (var i = 0, n = N(260); i < n; i++)
add({ ring: 0, mode: "run", pose: "run", r: 243 + odpRnd() * 15, f: odpRnd() * 0.34, y: -120 });
for (i = 0, n = N(140), tries = 0; i < n && tries < n * 6; tries++) {
var f1 = odpArc(1, -0.05 + odpRnd() * 1.1), r1 = 208 + odpRnd() * 20, p1 = odpAt(r1, f1);
if (Math.hypot(p1.x - cast.x, p1.z - cast.z) < 12 || odpNearWay(p1.x, p1.z, 4))
continue;
i++;
add({ ring: 1, mode: "still", pose: ["stand", "hide", "bowed"][i % 3], x: p1.x, z: p1.z, y: -126, ry: odpRy(p1.x, p1.z, ODP_C.x, ODP_C.z) + (odpRnd() - 0.5) * 2 });
}
ODP.storms = [0.22, 0.52, 0.82].map(function (u) { var p = odpAt(194, odpArc(2, u)); return { x: p.x, z: p.z }; });
ODP.storms.forEach(function (S, w) { for (var i = 0, n = N(110); i < n; i++)
add({ ring: 2, mode: "whirl", pose: i % 3 ? "spread" : "reach", cx: S.x, cz: S.z, r: 2 + odpRnd() * 11, y: -132, h: odpRnd() }); });
for (i = 0, n = N(220); i < n; i++) {
var f3 = odpArc(3, -0.05 + odpRnd() * 1.1), r3 = 164 + odpRnd() * 18, p3 = odpAt(r3, f3);
if (odpNearWay(p3.x, p3.z, 3.5))
continue;
add({ ring: 3, mode: "still", pose: i % 4 ? "curl" : "reach", x: p3.x, z: p3.z, y: -138 + 0.18, rx: i % 4 ? Math.PI / 2 * 0.96 : -Math.PI / 2 * 0.92, ry: odpRnd() * 6.28, sink: i % 4 ? 0 : 0.05 });
}
[0.2, 0.5, 0.8].forEach(function (u) { for (var i = 0, n = N(60); i < n; i++)
add({ ring: 4, mode: "push", pose: "push", fm: odpArc(4, u), side: i % 2, row: Math.floor(i / 2), rr: 143.5 + (i % 7) * 2.1, y: -144 }); });
for (i = 0, n = N(120); i < n; i += 2) {
var f5 = odpArc(5, -0.05 + odpRnd() * 1.1), r5 = 117.3 + odpRnd() * 5.6;
add({ ring: 5, mode: "fight", pose: "fight", r: r5, f: f5, y: -157.9, a: 0, o: 0 });
add({ ring: 5, mode: "fight", pose: "fight", r: r5, f: f5, y: -157.9, a: Math.PI, o: 1 });
}
for (i = 0, n = N(60); i < n; i++)
add({ ring: 5, mode: "bob", pose: "reach", r: 116.8 + odpRnd() * 6.6, f: odpArc(5, -0.1 + odpRnd() * 1.2), y: -157 });
(ODP.tombs || []).forEach(function (T, i) { add({ ring: 6, mode: "still", pose: i % 3 ? "reach" : "bowed", x: T.x, z: T.z, y: -156 + 0.05, ry: T.ry + (i % 2 ? 0 : Math.PI) }); });
for (i = 0, n = N(120); i < n; i++) {
var f7 = odpArc(7, -0.1 + odpRnd() * 1.25), r7 = 61.5 + odpRnd() * 4;
add({ ring: 7, mode: "still", pose: i % 3 ? "hide" : "reach", x: odpAt(r7, f7).x, z: odpAt(r7, f7).z, y: -163.4 - 0.5 - (i % 4) * 0.42, ry: odpRy(odpAt(r7, f7).x, odpAt(r7, f7).z, ODP_C.x, ODP_C.z) });
}
for (i = 0, n = N(150); i < n; i++) {
var f8 = odpArc(7, -0.1 + odpRnd() * 1.25), r8 = 50.6 + odpRnd() * 4, p8 = odpAt(r8, f8);
if (i % 3 === 0)
add({ ring: 7, mode: "still", pose: "spread", x: p8.x, z: p8.z, y: -162 + 0.16, rx: -Math.PI / 2 * 0.95, ry: odpRnd() * 6.28 });
else if (i % 3 === 1)
add({ ring: 7, mode: "still", pose: "crouch", x: p8.x, z: p8.z, y: -162, ry: odpRnd() * 6.28 });
else
add({ ring: 7, mode: "sandrun", pose: "run", r: r8, f: f8, y: -162 });
}
var B = ODP_BRIDGE;
for (var j = 0; j < 10; j++) {
var rd = 47.5 - j * 1.85 - 0.68, nn = N(42);
for (i = 0; i < nn; i++) {
var fj = B + (odpRnd() - 0.5) * 1.3, s = { ring: 8, ditch: j, r: rd + (odpRnd() - 0.5) * 0.5, f: fj, y: -184.5, dir: i % 2 ? 1 : -1 };
switch (j) {
case 0:
s.mode = "ditch";
s.pose = "walk";
break;
case 1:
s.mode = "still";
s.pose = "reach";
s.sink = 1.15;
break;
case 2:
s.mode = "still";
s.pose = "stand";
s.flip = 1;
break;
case 3:
s.mode = "ditch";
s.pose = "back";
s.slow = 0.5;
break;
case 4:
s.mode = "bobp";
s.pose = "reach";
break;
case 5:
s.mode = "ditch";
s.pose = "cloak";
s.slow = 0.25;
s.dir = 1;
break;
case 6:
s.mode = "ditch";
s.pose = i % 2 ? "run" : "hide";
s.slow = 0.9;
break;
case 7:
s.mode = "flame";
s.pose = null;
break;
case 8:
s.mode = "ditch";
s.pose = "walk";
s.dir = 1;
break;
case 9:
s.mode = "still";
s.pose = "curl";
s.lie = 1;
break;
}
if (s.mode === "still") {
var pj = odpAt(s.r, s.f);
s.x = pj.x;
s.z = pj.z;
s.ry = odpRnd() * 6.28;
s.y = -184.5 - (s.sink || 0);
if (s.flip) {
s.rx = Math.PI;
s.y = -184.5 + 1.05;
}
if (s.lie) {
s.rx = Math.PI / 2 * 0.95;
s.y = -184.5 + 0.2;
}
}
add(s);
}
}
for (i = 0, n = N(300); i < n; i++) {
var rr = 6 + Math.sqrt(odpRnd()) * 19.5, ff = odpRnd() * 6.28, pp = odpAt(rr, ff), z9 = { ring: 9, mode: "still", x: pp.x, z: pp.z, ry: odpRnd() * 6.28 };
if (rr > 21) {
z9.pose = "bowed";
z9.y = -190 - 1.45;
}
else if (rr > 16) {
z9.pose = "hide";
z9.y = -190 - 1.3;
}
else if (rr > 11) {
z9.pose = "spread";
z9.rx = -Math.PI / 2;
z9.y = -190 - 0.14;
}
else {
z9.pose = ["curl", "spread", "crouch", "hide"][i % 4];
z9.y = -191.6;
z9.rx = (odpRnd() - 0.5) * 2;
z9.rz = (odpRnd() - 0.5) * 2;
}
add(z9);
}
return L;
},
function () {
var lite = ODP.lite;
ODP_RN = 4111;
var L = odpCrowdPlan(), byRing = {}, shade = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x161A22 });
if (!lite) {
shade = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0x141820, shininess: 22, specular: 0x30343C });
}
shade.transparent = true;
shade.opacity = lite ? 0.86 : 0.8;
if (!lite)
shade.onBeforeCompile = function (sh) { sh.fragmentShader = sh.fragmentShader.replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n{ float fr=pow(1.0-abs(dot(normal,normalize(vViewPosition))),2.2); totalEmissiveRadiance+=vec3(0.5,0.58,0.72)*fr*0.85; diffuseColor.a*=0.75+0.25*(1.0-fr); }"); };
shade.customProgramCacheKey = function () { return "odpshade" + (lite ? 1 : 0); };
var gold = otmMat(0xC8A040, "metal", { phong: 90, spec: 0xFFE8A0, e: 0x2A1A04, ei: 1 }), hairM = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
L.forEach(function (s) { var key = s.mode === "flame" ? "flame" : s.pose; var R = byRing[s.ring] = byRing[s.ring] || {}; s.key = key; s.slot = R[key] = (R[key] || 0); R[key]++; });
var rings = [];
Object.keys(byRing).forEach(function (ri) {
var M = {}, grp = new THREE.Group();
grp.userData.keep = 1;
Object.keys(byRing[ri]).forEach(function (k) {
var n = byRing[ri][k], m;
if (k === "flame")
m = new THREE.InstancedMesh(odpFlameGeo(), odpFlameMat(0xFFA040), n);
else if (k === "cloak") {
m = new THREE.InstancedMesh(odpShadeGeo("walk", "cloak"), shade, n);
var cm = new THREE.InstancedMesh(ODP_SK.g["shade:walkcloak" + (lite ? "L" : "") + "|cloak"], gold, n);
M.cloakG = cm;
cm.frustumCulled = false;
cm.userData.noSit = 1;
grp.add(cm);
}
else {
m = new THREE.InstancedMesh(odpShadeGeo(k), shade, n);
var hg = ODP_SK.g["shade:" + k + (lite ? "L" : "") + "|hair"];
if (hg) {
var hm = new THREE.InstancedMesh(hg, hairM, n);
hm.frustumCulled = false;
hm.userData.noSit = 1;
M[k + "~h"] = hm;
grp.add(hm);
}
}
m.frustumCulled = false;
m.userData.noSit = 1;
M[k] = m;
grp.add(m);
});
otmP().add(grp);
rings[ri] = { g: grp, M: M };
});
var C = new THREE.Color(), T = new THREE.Color();
var HC = [0x1A1612, 0x2A2018, 0x3A2A1C, 0x4A3A2A, 0x6A5A48, 0x8A8478, 0x141414, 0x5A3A20];
L.forEach(function (s) {
var m = rings[s.ring].M[s.key];
if (!m || s.key === "flame")
return;
T.setHex(ODP_TINT[s.ring]);
var v = (0.5 + odpRnd() * 0.22) * (s.ring === 9 ? 0.85 : 1);
C.setRGB(T.r * v, T.g * v, T.b * v);
m.setColorAt(s.slot, C);
var h = rings[s.ring].M[s.key + "~h"];
if (h) {
C.setHex(HC[Math.floor(odpRnd() * HC.length)]);
T.setHex(ODP_TINT[s.ring]);
C.lerp(T, 0.25).multiplyScalar(0.8);
h.setColorAt(s.slot, C);
}
});
rings.forEach(function (R) { if (!R)
return; for (var k in R.M) {
if (R.M[k].instanceColor)
R.M[k].instanceColor.needsUpdate = true;
} });
var push = L.filter(function (s) { return s.mode === "push"; }), stones = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.95, lite ? 0 : 1), otmMat(0x6A5A40, "stone", { phong: 20 }), Math.max(1, push.length));
stones.frustumCulled = false;
stones.userData.noSit = 1;
rings[4].g.add(stones);
var thieves = L.filter(function (s) { return s.ditch === 6; }), sn = new THREE.InstancedMesh(odpSnakeGeo(), otmMat(0x2A4A22, null, { phong: 60, spec: 0x6A8A4A }), Math.max(1, thieves.length * (lite ? 1 : 2)));
sn.frustumCulled = false;
sn.userData.noSit = 1;
rings[8].g.add(sn);
var simo = L.filter(function (s) { return s.ditch === 2; }), sf = new THREE.InstancedMesh(odpFlameGeo(), odpFlameMat(0xFF8A30), Math.max(1, simo.length));
var o = new THREE.Object3D();
simo.forEach(function (s, i) { o.position.set(s.x, -184.5 + 1.9 * s.s, s.z); o.rotation.set(0, 0, 0); o.scale.set(0.5, 0.9, 0.5); o.updateMatrix(); sf.setMatrixAt(i, o.matrix); });
sf.frustumCulled = false;
rings[8].g.add(sf);
var dem = new THREE.InstancedMesh(odpShadeGeo("fight", "demon"), otmMat(0x1A0E0E, null, { phong: 40, spec: 0x5A2A20, e: 0x0A0202, ei: 1 }), lite ? 8 : 24), nd = 0;
[0, 4, 8].forEach(function (j) {
var rb = 47.5 - j * 1.85 + 0.1;
for (var q = 0; q < (lite ? 3 : 8); q++) {
var f = ODP_BRIDGE + (q - (lite ? 1 : 3.5)) * 0.11 + 0.05, P = odpAt(rb - 0.25, f);
o.position.set(P.x, -180, P.z);
o.rotation.set(0, odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI * (q % 2 ? 0.85 : 1.15), 0);
o.scale.setScalar(1.15);
o.updateMatrix();
if (nd < dem.count)
dem.setMatrixAt(nd++, o.matrix);
}
});
dem.count = nd;
dem.frustumCulled = false;
dem.userData.noSit = 1;
rings[8].g.add(dem);
ODP.souls = { L: L, R: rings, S: stones, SN: sn, o: o, show: -9 };
L.forEach(function (s) {
if (s.mode !== "still")
return;
var m = rings[s.ring].M[s.key];
o.position.set(s.x, s.y, s.z);
o.rotation.set(s.rx || 0, s.ry || 0, s.rz || 0, "YXZ");
o.scale.setScalar(s.s);
o.updateMatrix();
m.setMatrixAt(s.slot, o.matrix);
var h = rings[s.ring].M[s.key + "~h"];
if (h)
h.setMatrixAt(s.slot, o.matrix);
});
odpSoulsTick(0, true);
},
function (t, all) {
var S = ODP.souls;
if (!S)
return;
var o = S.o, L = S.L, ring = ODP.ring, R = S.R, si = 0, ni = 0, dirty = {};
if (!all)
odpSoulsShow(ring < 0 ? 0 : ring);
for (var i = 0; i < L.length; i++) {
var s = L[i];
if (s.mode === "still")
continue;
if (!all && (ring < 0 ? s.ring > 0 : Math.abs(s.ring - ring) > 1)) {
if (s.mode === "push")
si++;
if (s.ditch === 6)
ni += (ODP.lite ? 1 : 2);
continue;
}
var x, y = s.y, z, ry = 0, rx = 0, rz = 0, p, m = R[s.ring].M[s.key];
switch (s.mode) {
case "run":
var fr = odpBannerF(t) + 0.012 + s.f * 0.6 + 0.02 * Math.sin(t * 0.3 + s.ph);
p = odpAt(s.r, fr);
x = p.x;
z = p.z;
y += Math.abs(Math.sin(t * 5 * s.sp + s.ph)) * 0.14;
ry = odpRy(0, 0, Math.sin(fr), -Math.cos(fr));
rx = 0.06;
break;
case "whirl":
var a = s.ph + t * (0.5 + 0.4 * (1 - s.r / 13)) * s.sp, rr = s.r * (0.7 + 0.3 * s.h);
x = s.cx + Math.cos(a) * rr;
z = s.cz + Math.sin(a) * rr;
y += 1 + s.h * 20 + 1.5 * Math.sin(t * 0.3 + s.ph);
ry = -a;
rz = 0.5 + 0.3 * Math.sin(t * 0.6 + s.ph);
rx = 0.3 * Math.sin(t * 0.4 + s.ph * 2);
break;
case "push":
var off = 0.075 * (1 - Math.abs(Math.sin(t * 0.06 + s.fm))) + 0.006, dir = s.side ? 1 : -1, ff = s.fm + dir * (off + s.row * 0.011);
p = odpAt(s.rr, ff);
x = p.x;
z = p.z;
var back = Math.cos(t * 0.06 + s.fm) * Math.sin(t * 0.06 + s.fm) < 0;
ry = odpRy(0, 0, -dir * Math.sin(ff), dir * Math.cos(ff)) + (back ? 0 : 0);
rx = 0.05;
var q = odpAt(s.rr, ff - dir * 0.009);
o.position.set(q.x, y + 0.95, q.z);
o.rotation.set(t * 0.4 * dir, 0, 0);
o.scale.setScalar(1);
o.updateMatrix();
S.S.setMatrixAt(si++, o.matrix);
break;
case "fight":
p = odpAt(s.r, s.f);
var lun = 0.35 + 0.25 * Math.sin(t * 2.2 * s.sp + s.ph), fa = s.a + 0.3 * Math.sin(t * 0.7 + s.ph);
x = p.x + Math.cos(fa) * lun;
z = p.z + Math.sin(fa) * lun;
ry = Math.atan2(p.x - x, p.z - z);
rz = 0.12 * Math.sin(t * 2.6 + s.ph + s.o * 2);
y += 0.1 * Math.sin(t * 2.2 * s.sp + s.ph);
break;
case "bob":
p = odpAt(s.r, s.f);
x = p.x;
z = p.z;
y += -1.15 + 0.25 * Math.sin(t * 0.9 * s.sp + s.ph);
ry = s.ph + t * 0.1;
rz = 0.2 * Math.sin(t * 1.1 + s.ph);
break;
case "bobp":
p = odpAt(s.r, s.f + 0.01 * Math.sin(t * 0.2 + s.ph));
x = p.x;
z = p.z;
y += -1.25 + 0.35 * Math.max(0, Math.sin(t * 0.5 * s.sp + s.ph));
ry = s.ph;
rz = 0.15 * Math.sin(t * 0.9 + s.ph);
break;
case "sandrun":
var g2 = s.f - ((t * 0.012 * s.sp + s.ph) % 0.6);
p = odpAt(s.r, g2);
x = p.x;
z = p.z;
ry = odpRy(0, 0, Math.sin(g2), -Math.cos(g2));
rx = 0.1;
y += Math.abs(Math.sin(t * 5 * s.sp + s.ph)) * 0.1;
break;
case "ditch":
var ang = s.f + s.dir * ((t * 0.022 * s.sp * (s.slow || 1) / (1 + s.ditch * 0.08)) % 1.3);
ang = ODP_BRIDGE + odpDA(ang, ODP_BRIDGE);
if (Math.abs(odpDA(ang, ODP_BRIDGE)) > 0.65)
ang -= s.dir * 1.3;
p = odpAt(s.r, ang);
x = p.x;
z = p.z;
ry = odpRy(0, 0, Math.sin(ang) * s.dir, -Math.cos(ang) * s.dir);
if (s.pose === "back")
ry += Math.PI;
if (s.pose === "run")
y += Math.abs(Math.sin(t * 5 * s.sp + s.ph)) * 0.1;
if (s.ditch === 6) {
for (var w = 0; w < (ODP.lite ? 1 : 2); w++) {
var wa = t * 0.8 + s.ph + w * 3.1;
o.position.set(x + Math.cos(wa) * 0.5, y, z + Math.sin(wa) * 0.5);
o.rotation.set(0, -wa, 0);
o.scale.setScalar(1.1);
o.updateMatrix();
S.SN.setMatrixAt(ni++, o.matrix);
}
}
break;
case "flame":
var fa2 = s.f + s.dir * ((t * 0.012 * s.sp) % 1.0);
if (Math.abs(odpDA(fa2, ODP_BRIDGE)) > 0.65)
fa2 -= s.dir * 1.0;
p = odpAt(s.r, fa2);
x = p.x;
z = p.z;
var sc = (1.6 + 0.25 * Math.sin(t * 2.1 + s.ph)) * s.s;
o.position.set(x, y, z);
o.rotation.set(0, t * 0.3 + s.ph, 0.06 * Math.sin(t * 1.7 + s.ph));
o.scale.set(sc * 0.9, sc * 1.4, sc * 0.9);
o.updateMatrix();
m.setMatrixAt(s.slot, o.matrix);
dirty[s.ring + "|flame"] = m;
continue;
}
o.position.set(x, y, z);
o.rotation.set(rx, ry, rz, "YXZ");
o.scale.setScalar(s.s);
o.updateMatrix();
m.setMatrixAt(s.slot, o.matrix);
dirty[s.ring + "|" + s.key] = m;
if (s.key === "cloak") {
var cg = R[s.ring].M.cloakG;
cg.setMatrixAt(s.slot, o.matrix);
dirty[s.ring + "|cloakG"] = cg;
}
var hm = R[s.ring].M[s.key + "~h"];
if (hm) {
hm.setMatrixAt(s.slot, o.matrix);
dirty[s.ring + "|" + s.key + "~h"] = hm;
}
}
if (all) {
R.forEach(function (Rg) { if (Rg)
for (var k in Rg.M)
Rg.M[k].instanceMatrix.needsUpdate = true; });
}
for (var d in dirty)
dirty[d].instanceMatrix.needsUpdate = true;
S.S.instanceMatrix.needsUpdate = true;
S.SN.instanceMatrix.needsUpdate = true;
},
function (x, y, z, s, col, parent) {
var P = parent || otmP(), g = new THREE.Group();
g.position.set(x, y, z);
g.userData.keep = 1;
P.add(g);
col = col || 0xFF8A30;
var core = new THREE.Group();
g.add(core);
var o = new THREE.Mesh(odpFlameGeo(), odpFlameMat(col));
o.scale.set(0.15 * s, 0.36 * s, 0.15 * s);
core.add(o);
var o2 = new THREE.Mesh(odpFlameGeo(), odpFlameMat(0xFFE0A0));
o2.scale.set(0.08 * s, 0.22 * s, 0.08 * s);
o2.rotation.y = 1.3;
core.add(o2);
if (!ODP.lite && s > 2.5) {
var o3 = new THREE.Mesh(odpFlameGeo(), odpFlameMat(col));
o3.scale.set(0.09 * s, 0.27 * s, 0.09 * s);
o3.position.set(0.06 * s, 0, 0.03 * s);
o3.rotation.z = 0.25;
core.add(o3);
}
var gl = (typeof wGlow === "function") ? wGlow(col, 0.9 * s, 0.5) : null;
if (gl) {
gl.position.y = 0.14 * s;
g.add(gl);
}
var F = { g: g, core: core, gl: gl, s: s, ph: Math.random() * 20, base: 0.5 };
OTK.flames.push(F);
return F;
},
function (pts, dur, o) {
o = o || {};
if (ODP.ride)
return;
worldCard(null);
worldPrompt(null);
var W = pts.map(function (p) { var a = odpAt(p.r, p.f); return new THREE.Vector3(a.x, p.y, a.z); });
var curve = new THREE.CatmullRomCurve3(W, false, "centripetal");
var g = o.g ? o.g() : null, home = g && g.position ? { p: g.position.clone(), ry: g.rotation.y } : null;
ODP.ride = { c: curve, t: 0, dur: dur, g: g, home: home, lift: o.lift || 0, say: o.say, ev: (o.ev || []).slice(), hold: 0, fly: typeof canFly !== "undefined" ? canFly : false, face: o.face !== false, done: o.done };
if (o.start)
otmSay(o.start);
},
function (dt) {
var R = ODP.ride;
if (!R)
return false;
if (R.hold > 0) {
R.hold -= dt;
if (R.holdFn)
R.holdFn(dt);
}
else {
R.t += dt;
for (var i = 0; i < R.ev.length; i++) {
var E = R.ev[i];
if (R.t / R.dur >= E.u && !E.on) {
E.on = 1;
if (E.when && !E.when())
continue;
R.hold = E.hold || 0;
R.holdFn = E.tick || null;
if (E.fn)
E.fn();
}
}
}
var u = Math.min(1, R.t / R.dur), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2, P = R.c.getPointAt(e), T = R.c.getTangentAt(Math.min(0.999, e));
if (typeof canFly !== "undefined")
canFly = true;
if (typeof flyY !== "undefined") {
flyY = P.y;
flyVz = 0;
}
camera.position.set(ODP.base + P.x, P.y + 1.72 + R.lift, P.z);
if (R.g && R.g.position) {
R.g.position.set(P.x, P.y, P.z);
if (Math.abs(T.x) + Math.abs(T.z) > 0.05)
R.g.rotation.y = Math.atan2(T.x, T.z);
}
if (R.face && R.t < 0.6 && typeof yaw !== "undefined" && (Math.abs(T.x) + Math.abs(T.z) > 0.05))
yaw = Math.atan2(-T.x, -T.z);
if (u >= 1) {
ODP.ride = null;
if (typeof canFly !== "undefined")
canFly = R.fly;
var end = R.c.getPointAt(1);
if (typeof flyY !== "undefined")
flyY = end.y;
if (R.say)
otmSay(R.say);
if (R.g && R.home) {
var g = R.g, h = R.home;
setTimeout(function () { if (g && g.position) {
g.position.copy(h.p);
g.rotation.y = h.ry;
} }, 6000);
}
if (R.done)
try {
R.done();
}
catch (e) { }
}
return true;
},
function (fromR, fromF, fromY, toR, toF, toY, name, verb, say, o) {
o = o || {};
var A = odpAt(fromR, fromF);
otmSpot(A.x, A.z, 2.8, name, verb, function () {
var pts = o.pts || odpCarryPath(fromR, fromF, fromY, toR, toF, toY, o.kind);
odpRide(pts, o.dur || Math.max(6, Math.abs(fromR - toR) * 0.9 + Math.abs(fromY - toY) * 0.25), { g: o.g, say: say, start: o.start, ev: o.ev, lift: o.lift, done: o.done });
}, { y: fromY });
},
function () {
var T = ODP_T[7], c = odpAt(38, T), P = [{ r: 51.5, f: T, y: -162 }], top = -161, bot = -180, turns = 1.6, n = 22;
for (var i = 1; i <= n; i++) {
var u = i / n, a = u * turns * Math.PI * 2, rad = 11 - 4 * u, x = c.x + Math.cos(a + Math.atan2(odpAt(51.5, T).z - c.z, odpAt(51.5, T).x - c.x)) * rad, z = c.z + Math.sin(a + Math.atan2(odpAt(51.5, T).z - c.z, odpAt(51.5, T).x - c.x)) * rad;
var pp = odpPolar(x, z);
P.push({ r: pp.r, f: pp.f, y: top + (bot - top + 4) * u });
}
P.push({ r: 48.8, f: T - 0.02, y: -180 });
return P;
},
function (k) {
var p = otmProg();
p.deep = p.deep || {};
p.deep.tasks = p.deep.tasks || {};
if (p.deep.tasks[k])
return;
p.deep.tasks[k] = Date.now();
var n = Object.keys(p.deep.tasks).length, T = ODP_TASKS.filter(function (x) { return x.k === k; })[0];
if (n >= ODP_TASKS.length && !p.deep.pilgrim)
p.deep.pilgrim = Date.now();
otmProgSave();
setTimeout(function () { otmSay("📖 <b>Pilgrim's Journal: " + otmEsc(T ? T.t : k) + ".</b> " + n + " of " + ODP_TASKS.length + " done." + (n >= ODP_TASKS.length ? " <b>You are a Pilgrim of the Nine Rings.</b>" : "")); }, 1800);
},
function () {
var p = otmProg(), D = p.deep || {}, done = D.tasks || {}, n = Object.keys(done).length, b = "<div style='margin-top:6px'>";
ODP_TASKS.forEach(function (T) { var ok = !!done[T.k]; b += "<div style='margin:6px 0;padding:6px 8px;border-radius:5px;background:" + (ok ? "rgba(80,160,90,.16)" : "rgba(255,255,255,.04)") + "'><b>" + (ok ? "✅ " : "⬜ ") + otmEsc(T.t) + "</b><div style='opacity:.8;font-size:12.5px'>" + otmEsc(ODP_RING[T.r].n.replace(/^the /, "The ")) + ": " + otmEsc(T.d) + "</div></div>"; });
b += "</div>";
if (D.pilgrim)
b += "<div style='margin:8px 0;padding:8px;border-radius:6px;background:rgba(200,160,60,.18)'>🌟 <b>Pilgrim of the Nine Rings.</b> 'Thence we came forth to rebehold the stars.' Every ring walked, every task done.</div>";
var fns = { back: function () { odpDirectory(); } };
worldCard(worldFacts("📖 The Pilgrim's Journal", n + " of " + ODP_TASKS.length + " done", [], ["A thing to do in every ring, as Dante did on his way down. The tablets teach; the journal is for the doing."]) + b + worldBtn("back", "Back to the way about below", ""), fns);
},
function () {
var lite = ODP.lite, T = ODP_T;
var sw = odpDrift("swarm", lite ? 160 : 520, 0, 0, 9, -120 + 0.6, -120 + 3.4, 0x3A3010, 0.16, 0.9);
sw.follow = function () { var f = odpBannerF(ODP.t) + 0.08; return odpAt(250, f); };
(ODP.storms || []).forEach(function (S, i) { var d = odpDrift("whirl", lite ? 160 : 520, S.x, S.z, 15, -132 + 0.5, -132 + 24, [0x2A2230, 0x3A2A44, 0x221A2A][i], 0.5, 0.5); d.spin = 0.5 + i * 0.12; });
var R3 = ODP_RING[3], pn = lite ? 24 : 70, pud = new THREE.InstancedMesh(new THREE.CircleGeometry(1, lite ? 10 : 18), otmMat(0x0E100E, null, { phong: 120, spec: 0x8A9AA0 }), pn), o = new THREE.Object3D();
for (var i = 0; i < pn; i++) {
var P = odpAt(165 + odpRnd() * 17, odpArc(3, odpRnd() * 1.1 - 0.05));
o.position.set(P.x, R3.y + 0.03, P.z);
o.rotation.set(-Math.PI / 2, 0, odpRnd() * 6);
o.scale.set(1 + odpRnd() * 2.4, 0.6 + odpRnd() * 1.4, 1);
o.updateMatrix();
pud.setMatrixAt(i, o.matrix);
}
pud.userData.keep = 1;
pud.userData.noSit = 1;
otmP().add(pud);
var R4 = ODP_RING[4], cn = lite ? 200 : 700, coin = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.06, 0.06, 0.012, lite ? 6 : 10), otmMat(0xD8B048, "metal", { phong: 100, spec: 0xFFE8A0 }), cn);
for (i = 0; i < cn; i++) {
var Q = odpAt(141 + odpRnd() * 20, odpArc(4, odpRnd() * 1.1 - 0.05));
o.position.set(Q.x, R4.y + 0.01, Q.z);
o.rotation.set((odpRnd() - 0.5) * 0.3, 0, (odpRnd() - 0.5) * 0.3);
o.scale.setScalar(1);
o.updateMatrix();
coin.setMatrixAt(i, o.matrix);
}
coin.userData.keep = 1;
coin.userData.noSit = 1;
otmP().add(coin);
var b5 = odpAt(120, odpMid(5));
odpDrift("bubble", lite ? 120 : 380, b5.x, b5.z, 22, -157.4, -156.8, 0x8A9A80, 0.18, 0.7);
odpIce();
odpLimboCastle();
odpLustBook();
odpCerberus();
odpFortune();
odpSignal();
odpCity();
odpTombNames();
odpWood();
odpBridgeGame();
odpGiants();
if (typeof odpVast === "function")
odpVast();
},
function () {
var R = ODP_RING[1], Y = R.y, fm = odpMid(1), C = odpAt(218, fm), lite = ODP.lite, cap = otmMat(0x9A948A, null);
var tg = odpAt(218, fm + 0.01), gate = Math.atan2(tg.x - C.x, tg.z - C.z);
var walls = [];
for (var w = 0; w < 7; w++) {
var r = 4.6 + w * 0.62, h = 1.9 + w * 0.36, gap = 1.25 / r;
var th = new THREE.CylinderGeometry(r, r, h, lite ? 28 : 56, 3, true, gate + gap, Math.PI * 2 - 2 * gap);
odpRough(th, 0x8A847A, 0.25, w + 3);
var m = new THREE.Mesh(th, odpVC("castle", { ds: 1 }));
m.position.set(C.x, Y + h / 2, C.z);
m.userData.keep = 1;
otmP().add(m);
var nc = lite ? 10 : Math.round(r * 3.2), cr = new THREE.InstancedMesh(new THREE.BoxGeometry(0.4, 0.4, 0.3), cap, nc), M = new THREE.Matrix4(), q = 0;
for (var c = 0; c < nc; c++) {
var a = gate + gap + 0.05 + (Math.PI * 2 - 2 * gap - 0.1) * c / (nc - 1);
cr.setMatrixAt(q++, odpM4(C.x + Math.sin(a) * r, Y + h + 0.2, C.z + Math.cos(a) * r, 0, a, 0));
}
cr.count = q;
cr.userData.keep = 1;
otmP().add(cr);
var gx = C.x + Math.sin(gate) * r, gz = C.z + Math.cos(gate) * r, gd = otmGroup(gx, Y, gz, gate);
gd.userData.keep = 1;
otmBox(2.4, h * 0.92, 0.14, otmMat(0x3A2A18, "wood"), 0, h * 0.46, 0, gd);
otmBox(2.5, 0.12, 0.18, otmMat(0x2A2A2A, "metal"), 0, h * 0.25, 0, gd);
otmBox(2.5, 0.12, 0.18, otmMat(0x2A2A2A, "metal"), 0, h * 0.7, 0, gd);
walls.push({ r: r, gap: gap, g: gd, h: h });
}
var str = new THREE.Mesh(new THREE.RingGeometry(9.4, 10.4, lite ? 28 : 56), otmMat(0x3A6A7A, null, { phong: 110, spec: 0xA0C0D0 }));
str.rotation.x = -Math.PI / 2;
str.position.set(C.x, Y + 0.04, C.z);
otmP().add(str);
var mg = new THREE.Mesh(new THREE.CircleGeometry(9.4, lite ? 24 : 48), otmMat(0x3A6A34, null));
mg.rotation.x = -Math.PI / 2;
mg.position.set(C.x, Y + 0.03, C.z);
otmP().add(mg);
var pv = otmGroup(C.x, Y, C.z, 0);
pv.userData.keep = 1;
for (var k = 0; k < (lite ? 6 : 10); k++) {
var a = k / (lite ? 6 : 10) * Math.PI * 2;
otmCyl(0.14, 3.2, otmMat(0xE8E0D0, "marble"), Math.sin(a) * 2.2, 1.6, Math.cos(a) * 2.2, pv, 10);
}
var dome = new THREE.Mesh(new THREE.SphereGeometry(2.6, lite ? 14 : 28, 10, 0, Math.PI * 2, 0, Math.PI / 2), otmMat(0xD8D0C0, "marble", { phong: 40 }));
dome.position.y = 3.2;
pv.add(dome);
otmCyl(2.6, 0.25, otmMat(0xC8C0B0, "marble"), 0, 3.2, 0, pv, lite ? 14 : 28);
var hl = new THREE.Mesh(new THREE.SphereGeometry(13, lite ? 16 : 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xFFE8B0, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending }));
hl.position.set(C.x, Y, C.z);
otmP().add(hl);
odpFire(C.x, Y + 0.3, C.z, 3.2, 0xFFD890);
ODP.castle = { x: C.x, z: C.z, gate: gate, walls: walls, y: Y };
var G = [["Socrates", "beard robe:white", "the philosopher of Athens, who wrote nothing and questioned everyone"], ["Plato", "beard robe:white", "Socrates' pupil, who founded the Academy"], ["Aristotle", "beard robe:grey", "'the master of those who know', Plato's pupil and Alexander's tutor"],
["Euclid", "beard robe:white", "the geometer of Alexandria, whose Elements taught geometry for two thousand years"], ["Ptolemy", "beard robe:blue", "the astronomer of Alexandria, whose Almagest put the earth at the centre"], ["Hippocrates", "beard robe:white", "the physician of Cos, father of medicine"],
["Avicenna", "turban beard robe:green", "Ibn Sina of Persia, physician and philosopher, whose Canon of Medicine was read in Europe for centuries"], ["Averroes", "turban beard robe:brown", "Ibn Rushd of Cordoba, who 'made the great Commentary' on Aristotle"], ["Saladin", "turban beard robe:white", "the sultan, set apart and alone, honoured by Christian writers for his chivalry"],
["Hector", "helmet robe:red", "the Trojan prince of the Iliad"], ["Aeneas", "helmet robe:blue", "the Trojan of Virgil's own Aeneid, ancestor of Rome"], ["Julius Caesar", "laurel robe:purple", "'Caesar in armour with the falcon eyes', as Dante saw him"]];
G.forEach(function (g, i) {
if (lite && i % 2)
return;
var a = gate + Math.PI + (i - 5.5) * 0.42, x = C.x + Math.sin(a) * 3.5, z = C.z + Math.cos(a) * 3.5;
odpLater(x, z, function () { return odpFig(g[0], g[1], x, Y, z, Math.atan2(C.x - x, C.z - z), 1); });
otmSpot(x, z, 1.5, "🏛️ " + g[0], "meet", function () { worldCard(worldFacts("🏛️ " + g[0], "in the noble castle of Limbo (Canto IV)", [], [g[2] + ".", "Dante places the great souls of the ancient world here, without torment but without hope: they lived before Christ or outside the Church, and Limbo is the best Hell can be."]), {}); }, { y: Y });
});
var ox = C.x + Math.sin(gate) * (walls[6].r + 1.4), oz = C.z + Math.cos(gate) * (walls[6].r + 1.4);
otmSign(["THE NOBLE CASTLE", "seven times high-walled, a fair stream about it"], 3.2, 0.7, "#14160E", "#E0D8B0", C.x + Math.sin(gate + 0.3) * (walls[6].r + 1.2), Y + 2.6, C.z + Math.cos(gate + 0.3) * (walls[6].r + 1.2), gate);
var p = otmProg();
ODP.gates = (p.deep && p.deep.gates) || 0;
if (otmKeeper() && ODP.gates < 0)
ODP.gates = 0;
odpGatesShow();
for (var gi = 0; gi < 7; gi++) {
(function (gi) {
var wr = walls[6 - gi].r + 0.9, gx = C.x + Math.sin(gate) * wr, gz = C.z + Math.cos(gate) * wr;
otmSpot(gx, gz, 1.3, "🏰 The gate of " + ODP_ARTS[gi].n.toLowerCase().replace(/^./, function (c) { return c; }), "answer, and open it", function () { odpGateQuiz(gi); }, { y: Y, when: function () { return ODP.gates === gi; } });
})(gi);
}
},
function (gi, said) {
var A = ODP_ARTS[gi], fns = {}, b = "";
if (said)
b += "<div style='margin:8px 0;padding:6px 8px;border-radius:4px;background:rgba(200,90,60,.18)'>" + said + "</div>";
b += "<div style='margin-top:8px;font-weight:600'>❓ " + otmEsc(A.q) + "</div>";
A.a.forEach(function (ans, i) {
b += worldBtn("a" + i, otmEsc(ans), "");
fns["a" + i] = function () {
if (i !== A.r) {
odpGateQuiz(gi, "Not that one. The seven are grammar, logic and rhetoric (the trivium, the arts of words) and arithmetic, geometry, music and astronomy (the quadrivium, the arts of number).");
return;
}
ODP.gates = gi + 1;
var p = otmProg();
p.deep = p.deep || {};
p.deep.gates = ODP.gates;
otmProgSave();
odpGatesShow();
worldCard(null);
otmSay("🏰 <b>" + A.n + ".</b> The gate swings open." + (gi < 6 ? " Six walls make a long way in: the next gate is ahead." : " The last gate opens on the green meadow, and the great souls in it."));
if (gi === 6)
odpTask("castle");
};
});
worldCard(worldFacts("🏰 The gate of " + A.n, "the " + ["seventh", "sixth", "fifth", "fourth", "third", "second", "first"][gi] + " wall of the noble castle", [], ["The castle's seven walls have long been read as the seven liberal arts, the learning of the ancient world that the souls of Limbo had: the trivium (grammar, logic, rhetoric) and the quadrivium (arithmetic, geometry, music, astronomy)."]) + b, fns);
},
function (x, z, f) {
var C = ODP.castle;
if (!C || f > C.y + 5)
return false;
var dx = x - C.x, dz = z - C.z, d = Math.hypot(dx, dz);
if (d > C.walls[6].r + 0.4 || d < C.walls[0].r - 0.4)
return false;
var a = Math.atan2(dx, dz);
for (var w = 0; w < 7; w++) {
var W = C.walls[w];
if (Math.abs(d - W.r) > 0.32)
continue;
if (Math.abs(odpDA(a, C.gate)) * W.r < 1.15 && W.open)
return false;
return true;
}
return false;
},
function () {
var R = ODP_RING[2], Y = R.y, S = ODP.storms && ODP.storms[1];
if (!S)
return;
var P = odpAt(odpPolar(S.x, S.z).r + 7, odpPolar(S.x, S.z).f + 0.03);
var g = otmGroup(P.x, Y, P.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z));
g.userData.keep = 1;
otmBox(0.5, 0.9, 0.4, otmMat(0x3A3236, "stone"), 0, 0.45, 0, g);
var bk = otmBox(0.5, 0.07, 0.36, otmMat(0x6A1A22, null), 0, 0.95, 0, g);
bk.rotation.z = 0.1;
otmPlane(0.44, 0.32, otmGlowM(0xF0E0C0), 0, 0.995, 0, 0, g).rotation.x = -Math.PI / 2;
odpFire(P.x + 0.5, Y, P.z, 1.2, 0xC8A0FF);
otmSpot(P.x, P.z, 1.8, "📕 A book, open, in the wind", "read", function () {
worldCard(worldFacts("📕 The book of Lancelot", "what Francesca and Paolo were reading (Canto V)", [], ["'One day we reading were for our delight of Launcelot, how Love did him enthral. Alone we were and without any fear.'", "'When as we read of the much-longed-for smile being by such a noble lover kissed, this one, who ne'er from me shall be divided, kissed me upon the mouth all palpitating. Galeotto was the book and he who wrote it. That day no farther did we read therein.'", "Galeotto (Gallehault) is the knight who brought Lancelot and Guinevere together: Francesca blames the book. Dante, hearing her, fainted from pity 'as a dead body falls'."]), {});
odpTask("book");
}, { y: Y });
},
function (dt) {
var L = worldLocal(), feet = L.y - 1.72;
if (ODP.ring !== 2 || !ODP.storms)
return;
ODP.storms.forEach(function (S) {
var dx = L.x - S.x, dz = L.z - S.z, d = Math.hypot(dx, dz);
if (d > 20 || d < 0.5)
return;
var k = 2.4 * (1 - d / 20);
var vx = (-dz / d * 0.85 - dx / d * 0.35) * k * dt, vz = (dx / d * 0.85 - dz / d * 0.35) * k * dt, nx = L.x + vx, nz = L.z + vz;
if (!odpBlock(nx, nz, feet)) {
camera.position.x += vx;
camera.position.z += vz;
}
if (!ODP.windSaid) {
ODP.windSaid = 1;
otmSay("🌪️ <b>The black wind.</b> 'The infernal hurricane that never rests hurtles the spirits onward in its rapine.' It takes you too: lean against it.");
}
});
},
function () {
var R = ODP_RING[3], Y = R.y, fm = odpMid(3), C = odpAt(172, fm + 0.08), E = odpAt(180, odpArr(3) - 0.03);
otmSpot(E.x, E.z, 2.2, "🤲 The mud of the third circle", "take a fistful of earth", function () { ODP.earth = 1; otmSay("🤲 You take up a fistful of the cold earth, as Virgil did. Cerberus is further along the circle."); }, { y: Y, when: function () { return !ODP.earth; } });
var S = null;
ODP.K.spots.forEach(function (s) { if (s.name === "🐕 Cerberus")
S = s; });
if (S) {
var look = S.fn;
S.fn = function () { if (ODP.earth) {
ODP.earth = 0;
ODP.cerbQuiet = ODP.t + 90;
otmSay("🐕 <b>Into the three mouths.</b> 'And as a dog that barking craves, and grows quiet when he bites his food', the three throats close on the earth, and Cerberus lies down (Canto VI).");
odpTask("cerberus");
}
else
look(); };
S.verb = "look (or bring him earth)";
}
},
function () {
var R = ODP_RING[4], Y = R.y, P = odpAt(158, odpArc(4, 0.35)), ry = odpRy(P.x, P.z, ODP_C.x, ODP_C.z), br = otmMat(0x9A6A2A, "metal", { phong: 90, spec: 0xFFD890 }), dk = otmMat(0x3A2A1A, "metal");
var base = otmGroup(P.x, Y, P.z, ry);
base.userData.keep = 1;
otmBox(0.5, 4.2, 0.5, dk, -0.4, 2.1, 0, base);
otmBox(0.5, 4.2, 0.5, dk, 0.4, 2.1, 0, base);
var wh = new THREE.Group();
wh.position.set(0, 4, 0);
base.add(wh);
var rim = new THREE.Mesh(new THREE.TorusGeometry(3, 0.18, 8, ODP.lite ? 24 : 48), br);
rim.rotation.y = Math.PI / 2;
wh.add(rim);
for (var s = 0; s < 8; s++) {
var sp = otmBox(0.12, 6, 0.12, br, 0, 0, 0, wh);
sp.rotation.x = s * Math.PI / 8;
}
for (var f = 0; f < 4; f++) {
var a = f * Math.PI / 2, fg = otmBox(0.3, 0.5, 0.25, otmMat(0xC8A060, "metal", { phong: 60 }), 0, Math.cos(a) * 3.25, Math.sin(a) * 3.25, wh);
}
otmCyl(0.35, 1.1, dk, 0, 0, 0, wh, 12).rotation.z = Math.PI / 2;
otmSolid(P.x, P.z, 0.8, 0.5, Y, 7.5, ry);
ODP.wheel = { g: wh, v: 0.05 };
var S = odpAt(155.5, odpArc(4, 0.35));
otmSpot(S.x, S.z, 2.4, "🎡 The wheel of Fortune", "turn it", function () {
ODP.wheel.v = 2.4;
worldCard(worldFacts("🎡 Fortune", "Virgil explains her, Canto VII", [], ["'He whose omniscience everything transcends the heavens created, and gave who should guide them ... ordained a general ministress and guide, that she might change at times the empty treasures from race to race, from one blood to another.'", "Fortune turns the wheel of worldly goods, says Virgil, as the angels turn the spheres of heaven: 'she foresees, judges, and pursues her reign'. Men curse her, but 'she is blessed and does not hear it'.", "The hoarders and wasters round you fought her wheel in life, clutching or flinging away what was never theirs to keep. The wheel of Fortune, Rota Fortunae, comes from Boethius' Consolation of Philosophy, about AD 524."]), {});
odpTask("fortune");
}, { y: Y });
},
function () {
var R = ODP_RING[5], Y = R.y, a = odpArr(5), To = odpAt(131, a - 0.12), Sp = odpAt(128.6, a - 0.12);
var D = odpAt(114.85, ODP_T[5] + 12 / 115);
ODP.answer = odpFire(D.x, -156 + 13.4, D.z, 2, 0xFF6A20);
otmSpot(Sp.x, Sp.z, 2.4, "🔥 The two little flames on the tower", "answer the signal", function () {
ODP.signal = ODP.t;
otmSay("🔥 <b>The signal.</b> 'Two little flames we saw that there were set, and from afar another answered them' (Canto VIII). Far off on the walls of Dis a fire flares slowly in reply, and Phlegyas comes rowing hard through the marsh: take his boat.");
}, { y: Y });
},
function () {
var lite = ODP.lite, R = ODP_RING[6], Y = R.y, T5 = ODP_T[5], o = new THREE.Object3D();
var nt = lite ? 18 : 40, tw = new THREE.InstancedMesh(new THREE.CylinderGeometry(2.1, 2.5, 22, lite ? 8 : 14), otmMat(0x3A1410, "metal", { phong: 30, e: 0x2A0602, ei: 1 }), nt), dm = new THREE.InstancedMesh(new THREE.SphereGeometry(2.3, lite ? 8 : 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), otmMat(0x8A2A10, null, { phong: 60, e: 0x6A1404, ei: 1 }), nt), sp = new THREE.InstancedMesh(new THREE.ConeGeometry(0.35, 3.2, 6), otmMat(0x2A0A06, "metal", { e: 0x3A0802, ei: 1 }), nt), wn = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.5, 1.8), new THREE.MeshBasicMaterial({ color: 0xFF7A30 }), nt * 3), q = 0, wq = 0;
for (var i = 0; i < nt; i++) {
var f = T5 + (i + 0.5) / nt * Math.PI * 2;
if (Math.abs(odpDA(f, T5)) * 115 < 9)
continue;
var P = odpAt(114.85, f), ry = odpRy(0, 0, Math.cos(f), Math.sin(f));
o.position.set(P.x, Y + 9.4, P.z);
o.rotation.set(0, 0, 0);
o.scale.setScalar(1);
o.updateMatrix();
tw.setMatrixAt(q, o.matrix);
o.position.y = Y + 20.4;
o.updateMatrix();
dm.setMatrixAt(q, o.matrix);
o.position.y = Y + 23.6;
o.updateMatrix();
sp.setMatrixAt(q, o.matrix);
q++;
for (var w = 0; w < 3; w++) {
var wa = f + (w - 1) * 0.006, W = odpAt(114.85 + 2.55, wa);
o.position.set(W.x, Y + 12 + w * 2.5, W.z);
o.rotation.set(0, odpRy(W.x, W.z, ODP_C.x, ODP_C.z) + Math.PI, 0);
o.updateMatrix();
wn.setMatrixAt(wq++, o.matrix);
}
}
tw.count = dm.count = sp.count = q;
wn.count = wq;
[tw, dm, sp, wn].forEach(function (m) { m.userData.keep = 1; m.userData.noSit = 1; otmP().add(m); });
var na = lite ? 40 : 140, an = new THREE.InstancedMesh(odpShadeGeo("fight", "demon"), otmMat(0x140A0C, null, { phong: 40, spec: 0x5A2A20, e: 0x0A0204, ei: 1 }), na);
for (i = 0; i < na; i++) {
var fa = T5 + (i % 2 ? 1 : -1) * (8 / 115 + (Math.floor(i / 2) / (na / 2)) * 0.42), Pa = odpAt(114.85 + (odpRnd() - 0.5) * 1.4, fa);
o.position.set(Pa.x, Y + 12.4 + 0.6, Pa.z);
o.rotation.set(0, odpRy(Pa.x, Pa.z, ODP_C.x, ODP_C.z) + Math.PI + (odpRnd() - 0.5) * 0.8, 0);
o.scale.setScalar(1.1 + odpRnd() * 0.3);
o.updateMatrix();
an.setMatrixAt(i, o.matrix);
}
an.userData.keep = 1;
an.userData.noSit = 1;
otmP().add(an);
var wm = otmMat(0x5A2A1A, "metal", { phong: 50, e: 0x4A0C04, ei: 1 }), stud = otmMat(0xC8823A, "metal", { phong: 80, e: 0x3A1A04, ei: 1 });
ODP.leaves = [-1, 1].map(function (sd) {
var H = odpAt(114.85, T5 + sd * 3.9 / 115), g = otmGroup(H.x, Y - 1.6, H.z, odpRy(0, 0, Math.cos(T5), Math.sin(T5)) + Math.PI / 2);
g.userData.keep = 1;
var leaf = new THREE.Group();
g.add(leaf);
otmBox(3.9, 13, 0.4, wm, -sd * 1.95, 6.5, 0, leaf);
for (var r = 0; r < 5; r++)
for (var c = 0; c < 3; c++)
otmSph(0.14, stud, -sd * (0.6 + c * 1.3), 1.5 + r * 2.6, 0.22, leaf, 6);
return { g: leaf, sd: sd, a: 0 };
});
var p = otmProg();
ODP.gateOpen = !!(p.deep && p.deep.disgate);
ODP.leaves.forEach(function (L) { L.a = ODP.gateOpen ? 1 : 0; L.g.rotation.y = L.sd * L.a * 1.35; });
var Fu = odpAt(114.85, T5 - 5.2 / 115);
odpLater(Fu.x, Fu.z, function () { var g = new THREE.Group(); g.userData.keep = 1; ODP.G.add(g); ["Megaera", "Alecto", "Tisiphone"].forEach(function (n, i) { var P = odpAt(114.85 + (i - 1) * 1.3, T5 - 5.2 / 115 + (i - 1) * 0.008); var f = odpCreature("fury", P.x, Y + 16.4, P.z, odpRy(P.x, P.z, ODP_C.x, ODP_C.z) + Math.PI, 2.3); if (f) {
ODP.G.remove(f);
g.add(f);
} }); return g; });
ODP.angel = null;
},
function () {
var T5 = ODP_T[5], A = ODP_MAKE.angel ? odpCreature("angel", 0, -156, 0, 0, 2.2) : null;
if (!A)
return;
A.traverse(function (m) { if (m.isMesh) {
m.material = m.material.clone();
m.material.emissive = new THREE.Color(0xC8C0A0);
m.material.emissiveIntensity = 0.8;
} });
ODP.angel = { g: A, t: 0 };
var gl = (typeof wGlow === "function") ? wGlow(0xFFF0C0, 6, 0.5) : null;
if (gl) {
gl.position.y = 1.4;
A.add(gl);
}
},
function (dt) {
if (ODP.leaves) {
var tgt = ODP.gateOpen ? 1 : 0;
ODP.leaves.forEach(function (L) { if (L.a !== tgt) {
L.a += Math.sign(tgt - L.a) * Math.min(Math.abs(tgt - L.a), dt * 0.4);
L.g.rotation.y = L.sd * L.a * 1.35;
} });
}
var M = ODP.angel;
if (M && M.g) {
M.t += dt;
var T5 = ODP_T[5], u = Math.min(1, M.t / 5), A = odpAt(132 - 16 * u, T5 + 0.05 * (1 - u));
M.g.position.set(A.x, -157 + 0.2 + 0.2 * Math.sin(M.t * 1.4), A.z);
M.g.rotation.y = odpRy(A.x, A.z, ODP_C.x, ODP_C.z);
if (M.t > 5.2 && !ODP.gateOpen) {
ODP.gateOpen = true;
var p = otmProg();
p.deep = p.deep || {};
p.deep.disgate = Date.now();
otmProgSave();
otmSay("👼 <b>The messenger from Heaven</b> touches the gate with a little wand, and it opens: 'there was no resistance' (Canto IX). He turns back without a word.");
}
if (M.t > 12) {
if (M.g.parent)
M.g.parent.remove(M.g);
ODP.angel = null;
}
}
},
function () {
var R = ODP_RING[6], Y = R.y, fm = odpMid(6), st = otmMat(0x4A4440, "stone");
ODP_TOMBS.forEach(function (T, i) {
var P = odpAt(90 + i * 1.6, fm - 0.1 - i * 0.05), ry = odpRy(0, 0, Math.cos(fm), Math.sin(fm));
var g = otmGroup(P.x, Y, P.z, ry);
g.userData.keep = 1;
otmBox(1.3, 1.0, 2.6, st, 0, 0.5, 0, g);
var lid = otmBox(1.4, 0.16, 2.7, otmMat(0x5A544E, "stone"), 0, 1.08, 0, g);
otmSign([T[1]], 1.3, 0.32, "#1A1210", "#E8C8A0", 0, 0.6, 1.31, 0, g);
odpFire(P.x, Y + 0.95, P.z, 1.6, 0xFF6A20);
otmSolid(P.x, P.z, 0.7, 1.35, Y, 1.1, ry);
otmSpot(P.x + Math.cos(fm) * 1.6, P.z + Math.sin(fm) * 1.6, 1.6, "⚰️ A tomb: " + T[1], "lift the lid and look", function () {
lid.position.x = 0.9;
lid.rotation.z = 0.5;
var p = otmProg();
p.deep = p.deep || {};
p.deep.tomb = p.deep.tomb || {};
p.deep.tomb[T[0]] = 1;
otmProgSave();
var n = Object.keys(p.deep.tomb).length;
worldCard(worldFacts("⚰️ " + T[1], "the sixth circle, the heretics", [["Tombs read", n + " of 4"]], [T[2]]), {});
if (n >= 4)
odpTask("tombs");
}, { y: Y });
});
},
function () {
var R = ODP_RING[7], Y = R.y, a = odpArr(7), fN = a - 0.22, Pi = odpAt(57.5, fN - 0.05), Tw = odpAt(56, fN - 0.05);
otmSpot(Tw.x, Tw.z, 1.4, "🌿 A thornbush", "break off a twig", function () {
worldCard(worldFacts("🌿 'Why dost thou mangle me?'", "the wood of the suicides (Canto XIII)", [], ["'Then stretched I forth my hand a little forward, and plucked a branchlet off from a great thorn; and the trunk cried, Why dost thou mangle me? ... Men once we were, and now are changed to trees.'", "Dante, terrified, drops the twig. The tree is Pier della Vigna, and he tells his story: talk with him, beside you.", "The Harpies nest in these trees and feed on their leaves; each wound is a mouth for the soul's grief. Dante, gentle here, gathers the scattered leaves of one Florentine soul at the end of the canto and gives them back."]), {});
odpTask("twig");
}, { y: Y });
var fm = odpMid(7), C = odpAt(52.5, fm + 0.2);
odpLater(C.x, C.z, function () { var g = odpFig("Capaneus", "crown beard robe:red", C.x, Y + 0.25, C.z, odpRy(C.x, C.z, ODP_C.x, ODP_C.z), 1.6); if (g && g.rotation) {
g.rotation.x = -Math.PI / 2 * 0.92;
} return g; });
otmSpot(C.x, C.z, 3, "👑 Capaneus, lying under the fire", "look", function () { worldCard(worldFacts("👑 Capaneus", "one of the Seven against Thebes (Canto XIV)", [], ["A huge king lies scornful on the burning sand, 'so that the rain seems not to ripen him'. He defied Jupiter on the walls of Thebes and was struck by a thunderbolt.", "'That which I was living, that am I dead,' he shouts. 'Though Jove weary out his smith ... he could not have thereby joyous vengeance.'", "Virgil answers him louder than Dante ever heard him: 'O Capaneus, in that is not extinguished thy arrogance, thou art punished more; not any torment, saving thine own rage, would be unto thy fury pain complete.' His pride is his punishment."]), {}); }, { y: Y });
},
function (said) {
var j = Math.floor(Math.random() * 10), opts = [j], fns = {}, b = "";
while (opts.length < 3) {
var k = Math.floor(Math.random() * 10);
if (opts.indexOf(k) < 0)
opts.push(k);
}
opts.sort(function () { return Math.random() - 0.5; });
if (said)
b += "<div style='margin:8px 0;padding:6px 8px;border-radius:4px;background:" + (said.ok ? "rgba(80,160,90,.18)" : "rgba(200,90,60,.18)") + "'>" + said.text + "</div>";
b += "<div style='margin-top:8px;font-weight:600'>❓ Look down into the " + ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"][j] + " ditch: " + otmEsc(ODP_DITCH[j][1].replace(/ \(Canto.*\)$/, "")) + ". Who are they?</div>";
opts.forEach(function (o, i) {
b += worldBtn("a" + i, otmEsc(ODP_DITCH[o][0]), "");
fns["a" + i] = function () {
var ok = o === j;
ODP.bgRun = ok ? (ODP.bgRun || 0) + 1 : 0;
if (ok && ODP.bgRun >= 3) {
odpTask("ditches");
worldCard(worldFacts("🎲 Three in a row", "Virgil is pleased", [], ["'Now ought thy hand to be in readiness': you have named the fraudulent ditch by ditch, as Virgil named them for Dante. Malebolge means 'evil pouches'; its ten ditches are crossed by bridges of rock like the bridges over a castle's moats."]), {});
return;
}
odpBridgeAsk({ ok: ok, text: ok ? "✅ <b>Right:</b> the " + otmEsc(ODP_DITCH[j][0]) + ". " + ODP.bgRun + " in a row." : "Not those. It was the <b>" + otmEsc(ODP_DITCH[j][0]) + "</b>: " + otmEsc(ODP_DITCH[j][1]) + ". Start again." });
};
});
worldCard(worldFacts("🎲 Virgil's game", "the stone bridge over Malebolge", [["In a row", (ODP.bgRun || 0) + " of 3"]], []) + b, fns);
},
function () {
var Y = -190, lite = ODP.lite, seg = lite ? 48 : 120;
var old = null;
ODP.K.F.traverse(function (m) { if (m.isMesh && m.geometry && m.geometry.type === "CircleGeometry" && Math.abs(m.position.y - Y) < 0.01 && m.geometry.parameters && m.geometry.parameters.radius === 26)
old = m; });
if (old && old.parent)
old.parent.remove(old);
var under = new THREE.Mesh(new THREE.CircleGeometry(26, seg), otmMat(0x0A1420, null));
under.rotation.x = -Math.PI / 2;
under.position.set(ODP_C.x, Y - 3.2, ODP_C.z);
otmP().add(under);
var ice = new THREE.Mesh(new THREE.CircleGeometry(26, seg), new THREE.MeshPhongMaterial({ color: 0x7E9EC0, transparent: true, opacity: 0.86, shininess: 140, specular: 0xE8F4FF, depthWrite: false }));
ice.rotation.x = -Math.PI / 2;
ice.position.set(ODP_C.x, Y, ODP_C.z);
ice.renderOrder = 2;
otmP().add(ice);
var n = lite ? 60 : 200, fr = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 8), new THREE.MeshBasicMaterial({ color: 0xE8F0FF, transparent: true, opacity: 0.35, depthWrite: false }), n), o = new THREE.Object3D();
for (var i = 0; i < n; i++) {
var r = 4 + Math.sqrt(odpRnd()) * 21.5, f = odpRnd() * 6.28, P = odpAt(r, f);
o.position.set(P.x, Y + 0.02, P.z);
o.rotation.set(-Math.PI / 2, 0, odpRnd() * 6);
o.scale.set(0.6 + odpRnd() * 2.4, 0.15 + odpRnd() * 0.5, 1);
o.updateMatrix();
fr.setMatrixAt(i, o.matrix);
}
fr.renderOrder = 3;
otmP().add(fr);
},
function (dt) {
var L = worldLocal(), P = odpPolar(L.x, L.z);
if (ODP.ring !== 9 || P.r > 25.5 || Math.abs(L.y - 1.72 + 190) > 0.5 || dt <= 0) {
ODP.slv = null;
ODP.slp = null;
return;
}
var cur = { x: camera.position.x, z: camera.position.z };
if (!ODP.slp) {
ODP.slp = cur;
ODP.slv = { x: 0, z: 0 };
return;
}
var vx = (cur.x - ODP.slp.x) / dt, vz = (cur.z - ODP.slp.z) / dt;
if (Math.abs(vx) > 40 || Math.abs(vz) > 40) {
ODP.slp = cur;
return;
}
var k = Math.min(1, dt * 0.9);
ODP.slv.x += (vx - ODP.slv.x) * k;
ODP.slv.z += (vz - ODP.slv.z) * k;
var ax = (ODP.slv.x - vx) * dt, az = (ODP.slv.z - vz) * dt, feet = L.y - 1.72;
if (!odpBlock(L.x + ax, L.z + az, feet)) {
camera.position.x += ax;
camera.position.z += az;
}
else {
ODP.slv.x = 0;
ODP.slv.z = 0;
}
ODP.slp = { x: camera.position.x, z: camera.position.z };
if (!ODP.iceSaid && Math.hypot(ODP.slv.x, ODP.slv.z) > 3) {
ODP.iceSaid = 1;
otmSay("🧊 <b>The ice of Cocytus</b> is glass underfoot: you slide. 'A lake, which by the frost a semblance had of glass, and not of water' (Canto XXXII).");
}
},
function () {
var T8 = ODP_T[8];
ODP_GIANTS.forEach(function (G, i) {
if (ODP.lite && i % 2 && i !== 2)
return;
var P = odpAt(24.9, T8 + G.a);
odpLater(P.x, P.z, function () { var g = odpGiantFigure(G.o); g.scale.setScalar(12.5); g.position.set(P.x, -198, P.z); g.rotation.y = odpRy(P.x, P.z, ODP_C.x, ODP_C.z); ODP.G.add(g); if (G.n === "Antaeus")
ODP.antaeus = { g: g, y: -198 }; return g; });
otmRound(P.x, P.z, 2.1, -198, 30);
var Q = odpAt(27.4, T8 + G.a);
otmSpot(Q.x, Q.z, 2.2, "🗿 " + G.n, "look up at him", function () { otmSay("🗿 <b>" + G.n + ".</b> " + G.say); }, { y: -180 });
});
},
function (dt, t) {
var riding = odpRideTick(dt);
if (!riding) {
odpWindTick(dt);
odpSlideTick(dt);
}
odpGateTick(dt);
odpCerbTick(t);
if (typeof odpMinoTick === "function")
odpMinoTick(dt, t);
if (typeof odpVastTick === "function")
odpVastTick(dt, t);
if (ODP.wheel) {
ODP.wheel.g.rotation.x += ODP.wheel.v * dt;
ODP.wheel.v = Math.max(0.05, ODP.wheel.v - dt * 0.18);
}
if (ODP.answer && ODP.answer.g) {
var on = ODP.signal && ODP.t - ODP.signal < 40;
ODP.answer.g.scale.setScalar(on ? 1.6 + 0.15 * Math.sin(t * 1.3) : 1);
}
if (ODP.banner && ODP.ring === 0 && !odpTaskDone("banner")) {
var L = worldLocal(), b = ODP.banner.position;
if (Math.hypot(L.x - b.x, L.z - b.z) < 5) {
odpTask("banner");
worldCard(worldFacts("🏳️ The banner", "the Vestibule (Canto III)", [], ["'And I, who looked again, beheld a banner, which, whirling round, ran on so rapidly that of all pause it seemed to me indignant.' Behind it ran 'so long a train of people, that I ne'er would have believed that ever Death so many had undone.'", "They followed no banner in life; now they must chase one for ever, stung by wasps and hornets, their tears and blood (Dante says) fed on by worms at their feet. Dante knew one of them: 'him who made through cowardice the great refusal', usually read as Pope Celestine V, who gave up the papacy in 1294.", "Virgil's verdict: 'Let us not speak of them, but look, and pass.'"]), {});
}
}
return riding;
},
function (kind) {
var k = "odpbk|" + kind + (ODP.lite ? "L" : "");
if (OTM.mats[k])
return OTM.mats[k];
var m = ODP.lite ? new THREE.MeshLambertMaterial({ vertexColors: true }) : new THREE.MeshStandardMaterial({ vertexColors: true, roughness: kind === "wet" ? 0.32 : kind === "horn" ? 0.45 : kind === "skin" ? 0.6 : 0.82, metalness: 0 });
var fq = kind === "skin" ? 70 : kind === "wet" ? 90 : 48, st = kind === "skin" ? 0.35 : kind === "wet" ? 0.15 : 1.0;
m.extensions = { derivatives: true };
m.onBeforeCompile = function (sh) {
sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vBkPos;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvBkPos=position;");
sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\n" + ODP_BK_NOISE)
.replace("#include <color_fragment>", "#include <color_fragment>\nfloat bkC=bkFbm(vBkPos*vec3(" + (fq * 0.5).toFixed(1) + "," + (fq * 0.18).toFixed(1) + "," + (fq * 0.5).toFixed(1) + "));\ndiffuseColor.rgb*=0.62+0.6*bkC;")
.replace("#include <normal_fragment_maps>", "#include <normal_fragment_maps>\n{ float bh=bkFbm(vBkPos*vec3(" + fq + ".0," + (fq * 0.35).toFixed(1) + "," + fq + ".0))*" + (st * 0.02).toFixed(4) + "; vec3 sp=-vViewPosition; vec3 sx=dFdx(sp), sy=dFdy(sp); vec3 r1=cross(sy,normal), r2=cross(normal,sx); float det=dot(sx,r1); vec3 gr=sign(det)*(dFdx(bh)*r1+dFdy(bh)*r2); normal=normalize(abs(det)*normal-gr); }");
};
m.customProgramCacheKey = function () { return "odpbk" + kind; };
m.userData.realSoft = 1;
return (OTM.mats[k] = m);
},
function () {
var C = ODP_CERB, h = C.hide, b = C.belly, m = C.mane;
var P = [
odpBkE([0, 1.08, 0.5], [0.46, 0.52, 0.56], h), odpBkE([0, 0.86, 0.0], [0.52, 0.5, 0.66], b), odpBkE([0, 0.74, -0.05], [0.4, 0.3, 0.5], b, null, 0.12),
odpBkE([0, 1.02, -0.62], [0.4, 0.44, 0.46], h), odpBkE([0, 1.36, 0.62], [0.36, 0.22, 0.42], m, [0.25, 0, 0]),
odpBkC([0, 1.42, 0.75], [0, 1.36, -0.2], 0.13, 0.09, m, 0.1), odpBkC([0, 1.36, -0.2], [0, 1.3, -0.8], 0.09, 0.07, m, 0.1),
odpBkE([0, 0.5, 0.05], [0.36, 0.12, 0.5], m, null, 0.1),
odpBkC([0, 1.2, -0.95], [0, 1.1, -1.12], 0.12, 0.08, h, 0.06)
];
for (var q = 0; q < 14; q++) {
var z = 0.85 - q * 0.12, y = 1.48 - q * 0.012 - Math.max(0, q - 8) * 0.02;
P.push(odpBkC([0, y - 0.05, z], [0, y + 0.1 - q * 0.003, z - 0.08], 0.06, 0.008, m, 0.03));
if (q % 2 === 0)
[-1, 1].forEach(function (sd) { P.push(odpBkC([sd * 0.1, y - 0.07, z - 0.03], [sd * 0.17, y + 0.05, z - 0.1], 0.045, 0.006, m, 0.03)); });
}
P = P.concat(odpBkMirror([
odpBkE([0.34, 0.9, -0.68], [0.2, 0.36, 0.3], h, [0.2, 0, 0]), odpBkC([0.36, 0.66, -0.86], [0.37, 0.3, -0.86], 0.12, 0.08, h, 0.05),
odpBkC([0.37, 0.3, -0.86], [0.37, 0.08, -0.7], 0.08, 0.07, h, 0.04), odpBkE([0.37, 0.06, -0.6], [0.12, 0.07, 0.17], h, null, 0.04),
odpBkC([0.32, 0.05, -0.47], [0.31, 0.0, -0.4], 0.025, 0.008, C.claw, 0.01), odpBkC([0.37, 0.05, -0.46], [0.37, 0.0, -0.38], 0.025, 0.008, C.claw, 0.01), odpBkC([0.42, 0.05, -0.47], [0.43, 0.0, -0.4], 0.025, 0.008, C.claw, 0.01),
odpBkE([0.34, 1.12, 0.66], [0.2, 0.32, 0.28], h)
]));
return P;
},
function (sd) {
var C = ODP_CERB, h = C.hide, x = sd * 0.03;
var P = [odpBkC([0, 0, 0], [x, -0.5, 0.08], 0.15, 0.11, h, 0.05), odpBkC([x, -0.5, 0.08], [x, -1.0, 0.12], 0.1, 0.085, h, 0.04),
odpBkE([x, -1.06, 0.24], [0.14, 0.07, 0.19], h, null, 0.05)];
for (var c = 0; c < 4; c++) {
var cx = x + (c - 1.5) * 0.06;
P.push(odpBkC([cx, -1.05, 0.38], [cx, -1.1, 0.5], 0.026, 0.006, C.claw, 0.01));
}
P.push(odpBkC([x + sd * 0.12, -0.95, 0.2], [x + sd * 0.15, -1.02, 0.28], 0.02, 0.005, C.claw, 0.01));
return P;
},
function () {
var C = ODP_CERB, h = C.hide, mz = C.muzzle;
var P = [odpBkE([0, 0.02, 0], [0.22, 0.2, 0.24], h), odpBkE([0, 0.1, -0.1], [0.19, 0.15, 0.17], C.mane),
odpBkC([0, -0.02, 0.14], [0, -0.05, 0.44], 0.15, 0.11, mz, 0.07), odpBkE([0, -0.02, 0.47], [0.075, 0.055, 0.04], 0x0A0808, null, 0.02),
odpBkE([0, 0.1, 0.15], [0.17, 0.05, 0.08], h, [0.35, 0, 0], 0.05), odpBkE([0, 0.07, 0.3], [0.05, 0.03, 0.12], h, null, 0.04)];
P = P.concat(odpBkMirror([odpBkE([0.16, 0.17, -0.08], [0.06, 0.13, 0.035], h, [-1.0, 0, -0.55], 0.03), odpBkE([0.12, -0.1, 0.26], [0.07, 0.09, 0.13], mz, null, 0.06),
odpBkE([0.17, -0.02, 0.04], [0.08, 0.1, 0.1], h, null, 0.06)]));
[[0.075, 0.4, 0.09], [0.08, 0.33, 0.05], [0.085, 0.26, 0.045], [0.088, 0.19, 0.045]].forEach(function (q) { [-1, 1].forEach(function (sd) { P.push(odpBkC([sd * q[0], -0.12, q[1]], [sd * q[0], -0.12 - q[2], q[1] + 0.01], 0.015, 0.003, C.tooth, 0.004)); }); });
return P;
},
function () {
var C = ODP_CERB, P = [odpBkC([0, 0, 0], [0, -0.03, 0.36], 0.1, 0.07, C.muzzle, 0.05), odpBkE([0, 0.035, 0.18], [0.07, 0.025, 0.16], C.gum, null, 0.02)];
[[0.06, 0.33, 0.07], [0.065, 0.25, 0.04], [0.07, 0.17, 0.035]].forEach(function (q) { [-1, 1].forEach(function (sd) { P.push(odpBkC([sd * q[0], 0.04, q[1]], [sd * q[0], 0.04 + q[2], q[1] - 0.01], 0.013, 0.003, C.tooth, 0.004)); }); });
P.push(odpBkE([0, -0.1, 0.12], [0.1, 0.09, 0.17], C.beard, null, 0.05));
for (var k = 0; k < 5; k++) {
var x = (k - 2) * 0.045, z = 0.04 + (k % 2) * 0.08;
P.push(odpBkC([x, -0.12, z], [x * 1.2, -0.24, z - 0.02], 0.045, 0.02, C.beard, 0.04));
}
return P;
},
function (t) {
if (t !== undefined || typeof rbkBuild !== "function")
return ODP_CERB0(t);
var hide = odpBkMat("fur"), wet = odpBkMat("wet"), root = new THREE.Group(), body = new THREE.Group();
root.add(body);
body.add(odpBkMesh("cerb_body", odpCerbBody(), 0.028, 0.09, hide));
var parts = { body: body, legs: [], heads: [], tail: null };
[-1, 1].forEach(function (sd) { var piv = odpBkNode(body, sd * 0.36, 1.14, 0.7); piv.add(odpBkMesh("cerb_leg" + sd, odpCerbLeg(sd), 0.022, 0.05, hide)); parts.legs.push({ g: piv, sd: sd }); });
[-1, 0, 1].forEach(function (o, i) {
var root2 = odpBkNode(body, o * 0.32, 1.3, 0.9), len = 0.62 - Math.abs(o) * 0.04;
root2.rotation.y = o * 0.55;
root2.rotation.z = -o * 0.3;
root2.add(odpBkMesh("cerb_neck" + i, odpCerbNeck(len), 0.022, 0.08, hide));
var head = odpBkNode(root2, 0, len * 0.66, len * 1.0);
head.add(odpBkMesh("cerb_skull", odpCerbSkull(), 0.012, 0.04, hide));
[-1, 1].forEach(function (sd) { var e = odpBkEye(0xFF2A10, 0.034); e.position.set(sd * 0.105, 0.06, 0.2); head.add(e); });
var jaw = odpBkNode(head, 0, -0.11, 0.06);
jaw.add(odpBkMesh("cerb_jaw", odpCerbJaw(), 0.011, 0.025, wet));
var thr = new THREE.Mesh(odpSkSph(10), otmMat(0x3A0806, null, { e: 0x1A0202, ei: 1 }));
thr.scale.set(0.1, 0.06, 0.2);
thr.position.set(0, -0.1, 0.18);
thr.raycast = function () { };
head.add(thr);
parts.heads.push({ root: root2, head: head, jaw: jaw, o: o, ph: i * 2.1, snap: -1, yaw0: o * 0.42 });
});
var tl = odpBkNode(body, 0, 1.12, -1.1);
tl.add(odpBkMesh("cerb_tail", odpCerbTail(), 0.02, 0.04, hide));
parts.tail = tl;
root.userData.cerb = parts;
root.userData.keep = 1;
return root;
},
function (t) {
var g = ODP.cerb;
if (!g || !g.position)
return;
var P = g.userData.cerb, quiet = ODP.cerbQuiet && ODP.t < ODP.cerbQuiet;
if (!P) {
var k = quiet ? 0 : 1;
g.rotation.z = k * 0.04 * Math.sin(t * 3.1);
g.position.y = ODP.cerbY + (quiet ? -0.6 : 0.05 * Math.abs(Math.sin(t * 3.1)));
return;
}
var L = worldLocal(), dx = L.x - g.position.x, dz = L.z - g.position.z, near = Math.hypot(dx, dz) < 45 && Math.abs(L.y - 1.72 - ODP.cerbY) < 6;
var look = Math.atan2(dx, dz) - g.rotation.y;
while (look > Math.PI)
look -= 2 * Math.PI;
while (look < -Math.PI)
look += 2 * Math.PI;
look = Math.max(-0.9, Math.min(0.9, look));
var dn = (ODP.cerbDown = (ODP.cerbDown || 0) + ((quiet ? 1 : 0) - (ODP.cerbDown || 0)) * 0.03);
P.body.position.y = -0.32 * dn + 0.012 * Math.sin(t * 1.6) * (1 - dn);
P.body.rotation.x = 0.05 * dn;
P.body.scale.set(1, 1 + 0.012 * Math.sin(t * 1.6), 1);
P.heads.forEach(function (H, i) {
var want = near && !quiet ? look * 0.7 + H.yaw0 * 0.5 : H.yaw0 + 0.18 * Math.sin(t * 0.5 + H.ph);
H.root.rotation.y += (want - H.root.rotation.y) * 0.05;
var cyc = (t * 0.45 + H.ph * 0.3) % 3, snap = !quiet && cyc < 0.7, u = snap ? Math.sin(cyc / 0.7 * Math.PI) : 0;
H.root.rotation.x = (quiet ? 0.75 : -0.1 + 0.08 * Math.sin(t * 1.1 + H.ph)) + (-0.35 * u);
H.head.rotation.x = (quiet ? 0.2 : 0.55 + (near ? 0.25 : 0)) + 0.25 * u + 0.05 * Math.sin(t * 2.3 + H.ph);
H.jaw.rotation.x = quiet ? 0.12 + 0.1 * Math.max(0, Math.sin(t * 2.2 + H.ph)) : 0.08 + 0.75 * u + 0.08 * Math.max(0, Math.sin(t * 4 + H.ph));
if (snap && near && ODP.t - (ODP.cerbSaidAt || -1e9) > 60) {
ODP.cerbSaidAt = ODP.t;
otmSay("🐕 <b>Cerberus bays.</b> Three throats at once, over the gluttons in the rain: 'he makes them howl like dogs' (Canto VI).");
}
});
P.legs.forEach(function (Lg, i) { var c = (t * 0.35 + i * 1.5) % 4, u = !quiet && c < 1 ? Math.sin(c * Math.PI) : 0; Lg.g.rotation.x = quiet ? -1.1 : -0.9 * u; Lg.g.rotation.z = Lg.sd * 0.05 * u; });
if (P.tail) {
P.tail.rotation.y = (quiet ? 0.15 : 0.6) * Math.sin(t * (quiet ? 0.6 : 1.7));
P.tail.rotation.x = quiet ? 0.4 : -0.2 + 0.15 * Math.sin(t * 0.9);
}
},
function () {
var C = ODP_MINO;
var P = [odpBkE([0, 1.02, 0], [0.21, 0.15, 0.15], C.coat), odpBkE([0, 1.2, 0.02], [0.2, 0.19, 0.15], C.chest), odpBkE([0, 1.45, 0.03], [0.29, 0.21, 0.19], C.coat),
odpBkE([0, 1.63, -0.05], [0.26, 0.13, 0.16], C.mane, null, 0.06), odpBkC([0, 1.6, 0.0], [0, 1.78, 0.08], 0.15, 0.13, C.mane, 0.05),
odpBkE([0, 0.97, 0.0], [0.235, 0.11, 0.175], C.leather, null, 0.02), odpBkE([0, 0.86, 0.12], [0.11, 0.1, 0.04], C.leather, null, 0.02)];
P = P.concat(odpBkMirror([odpBkE([0.12, 1.48, 0.14], [0.13, 0.085, 0.065], C.chest, null, 0.03), odpBkE([0.32, 1.56, 0], [0.12, 0.11, 0.12], C.coat, null, 0.04),
odpBkE([0.2, 1.36, -0.07], [0.11, 0.17, 0.1], C.coat, null, 0.04), odpBkE([0.07, 1.2, 0.13], [0.06, 0.05, 0.035], C.chest, null, 0.02), odpBkE([0.07, 1.09, 0.13], [0.06, 0.045, 0.03], C.chest, null, 0.02)]));
return P;
},
function () {
var C = ODP_MINO;
var P = [odpBkE([0, 0.13, -0.01], [0.15, 0.15, 0.16], C.coat), odpBkC([0, 0.1, 0.06], [0, 0.0, 0.27], 0.12, 0.1, C.muzzle, 0.06), odpBkE([0, -0.02, 0.31], [0.09, 0.065, 0.045], C.nose, null, 0.02),
odpBkE([0, 0.2, 0.1], [0.12, 0.045, 0.06], C.coat, [0.4, 0, 0], 0.03), odpBkE([0, -0.07, 0.22], [0.07, 0.04, 0.07], C.muzzle, null, 0.03),
odpBkE([0, 0.24, 0.03], [0.13, 0.06, 0.09], C.mane, null, 0.04), odpBkE([0, -0.08, 0.1], [0.08, 0.06, 0.1], C.mane, null, 0.04)];
P = P.concat(odpBkMirror([odpBkE([0.17, 0.12, -0.03], [0.07, 0.03, 0.04], C.coat, [0, 0, -0.4], 0.02),
odpBkC([0.12, 0.2, 0.0], [0.26, 0.22, 0.03], 0.05, 0.04, C.horn, 0.02), odpBkC([0.26, 0.22, 0.03], [0.36, 0.31, 0.08], 0.04, 0.03, C.horn, 0.01), odpBkC([0.36, 0.31, 0.08], [0.36, 0.44, 0.13], 0.03, 0.008, C.horn, 0.01)]));
return P;
},
function () {
var C = ODP_MINO;
return [odpBkC([0, 0, 0], [0, -0.36, -0.1], 0.095, 0.06, C.coat, 0.03), odpBkC([0, -0.36, -0.1], [0, -0.48, 0.0], 0.06, 0.05, C.coat, 0.03),
odpBkE([0.025, -0.5, 0.06], [0.035, 0.035, 0.07], C.hoof, null, 0.01), odpBkE([-0.025, -0.5, 0.06], [0.035, 0.035, 0.07], C.hoof, null, 0.01), odpBkE([0, -0.4, -0.04], [0.07, 0.07, 0.06], C.mane, null, 0.03)];
},
function () {
if (typeof rbkBuild !== "function")
return null;
var fur = odpBkMat("fur"), skin = odpBkMat("skin"), root = new THREE.Group(), B = new THREE.Group();
root.add(B);
var torso = odpBkNode(B, 0, 0, 0);
torso.add(odpBkMesh("mino_torso", odpMinoTorso(), 0.016, 0.06, skin));
var neck = odpBkNode(torso, 0, 1.74, 0.08), head = odpBkNode(neck, 0, 0, 0);
head.add(odpBkMesh("mino_head", odpMinoHead(), 0.011, 0.04, fur));
[-1, 1].forEach(function (sd) { var e = odpBkEye(0xFF4A12, 0.018); e.position.set(sd * 0.115, 0.15, 0.1); head.add(e); });
var arms = [-1, 1].map(function (sd) { var sh = odpBkNode(torso, sd * 0.36, 1.55, 0); sh.add(odpBkMesh("mino_arm" + sd, odpMinoArm(sd), 0.014, 0.04, skin)); var el = odpBkNode(sh, sd * 0.03, -0.32, 0); el.add(odpBkMesh("mino_fore", odpMinoFore(), 0.013, 0.03, skin)); return { sh: sh, el: el, sd: sd }; });
var legs = [-1, 1].map(function (sd) { var hp = odpBkNode(B, sd * 0.12, 0.98, 0); hp.add(odpBkMesh("mino_thigh", odpMinoThigh(), 0.015, 0.04, fur)); var kn = odpBkNode(hp, 0, -0.46, 0.04); kn.add(odpBkMesh("mino_shin", odpMinoShin(), 0.012, 0.03, fur)); return { hp: hp, kn: kn, sd: sd }; });
root.userData.mino = { B: B, torso: torso, neck: neck, head: head, arms: arms, legs: legs };
root.userData.keep = 1;
return root;
},
function (dt, t) {
var M = ODP.mino;
if (!M || !M.g || !M.g.userData.mino)
return;
var P = M.g.userData.mino, g = M.g, L = worldLocal();
var pd = Math.hypot(L.x - g.position.x, L.z - g.position.z), near = pd < 22 && Math.abs(L.y - 1.72 - M.y) < 5;
var tgt = M.ends[M.to], dx = tgt.x - g.position.x, dz = tgt.z - g.position.z, d = Math.hypot(dx, dz), run = 0, rage = 0, bite = 0;
if (M.st === "charge" && !near) {
var sp = Math.min(d, 5.5 * dt);
g.position.x += dx / d * sp;
g.position.z += dz / d * sp;
var fy = Math.atan2(dx, dz);
g.rotation.y += odpDA(fy, g.rotation.y) * Math.min(1, dt * 6);
run = 1;
if (d < 0.6) {
M.st = "rage";
M.at = t;
}
}
else {
if (M.st === "charge") {
M.st = "rage";
M.at = t;
}
rage = 1;
var ry = near ? Math.atan2(L.x - g.position.x, L.z - g.position.z) : g.rotation.y;
g.rotation.y += odpDA(ry, g.rotation.y) * Math.min(1, dt * 2.5);
bite = ((t - M.at) % 5) > 2.6 ? 1 : 0;
if (!near && t - M.at > 4.2) {
M.st = "charge";
M.to = 1 - M.to;
}
}
if (near && !M.said) {
M.said = 1;
otmSay("🐂 <b>The Minotaur</b> sees you, and bites at his own arm in fury, 'as one whom wrath devours within'. Virgil cries out to him, and while he plunges about, you may pass (Canto XII).");
}
if (!near && pd > 40)
M.said = 0;
if (M.solid) {
M.solid.x = g.position.x;
M.solid.z = g.position.z;
}
var ph = t * (run ? 7.5 : 3), sw = Math.sin(ph);
P.B.position.y = run ? 0.06 * Math.abs(Math.cos(ph)) : 0.02 * Math.sin(t * 2);
P.torso.rotation.x = run ? 0.32 : 0.1 + 0.12 * bite;
P.torso.rotation.y = run ? 0.12 * sw : 0.25 * Math.sin(t * 1.7) * (1 - bite);
P.legs.forEach(function (Lg) {
var s = Lg.sd;
if (run) {
Lg.hp.rotation.x = -0.75 * sw * s;
Lg.kn.rotation.x = 0.2 + 0.6 * Math.max(0, s * Math.cos(ph));
}
else {
var stamp = (Lg.sd > 0 && ((t * 0.9) % 2) < 0.35) ? Math.sin(((t * 0.9) % 2) / 0.35 * Math.PI) : 0;
Lg.hp.rotation.x = -0.6 * stamp;
Lg.kn.rotation.x = 0.15 + 0.7 * stamp;
}
});
P.arms.forEach(function (A) {
var s = A.sd;
if (run) {
A.sh.rotation.set(0.7 * sw * s, 0, s * 0.25);
A.el.rotation.x = -0.9;
}
else if (bite && s < 0) {
A.sh.rotation.set(-1.25, 0, -0.25);
A.el.rotation.x = -1.9;
}
else {
A.sh.rotation.set(-1.6 + 0.5 * Math.sin(t * 3.1 + s), 0, s * (0.6 + 0.25 * Math.sin(t * 2.3)));
A.el.rotation.x = -0.6 - 0.4 * Math.sin(t * 4 + s);
}
});
P.neck.rotation.x = run ? -0.25 : bite ? 0.55 : -0.35 + 0.15 * Math.sin(t * 2.6);
P.neck.rotation.y = bite ? 0.55 : 0.35 * Math.sin(t * 1.3) * (run ? 0.3 : 1);
},
function () {
var lite = ODP.lite;
try {
odpVault(lite);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, vault", e);
}
try {
odpSparks(lite);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, sparks", e);
}
try {
odpBloodFall(lite);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, fall", e);
}
try {
odpFlyers(lite);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, flyers", e);
}
},
function (lite) {
var prof = [[262.4, -22], [258, 30], [245, 80], [222, 125], [190, 165], [150, 195], [100, 215], [50, 224], [0.1, 226]].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
var g = new THREE.LatheGeometry(prof, lite ? 48 : 120);
var P = g.attributes.position, c = new Float32Array(P.count * 3), C = new THREE.Color();
for (var i = 0; i < P.count; i++) {
var x = P.getX(i), y = P.getY(i), z = P.getZ(i), r = Math.hypot(x, z) || 1;
var n = Math.sin(x * 0.045 + z * 0.031) * Math.sin(z * 0.05 - y * 0.04) * 9 + Math.sin(x * 0.13 + y * 0.11) * Math.sin(z * 0.12) * 4 + Math.sin(x * 0.37 - z * 0.29 + y * 0.23) * 1.6;
if (y > -15) {
P.setXYZ(i, x + x / r * n * 0.8, y + n * 0.6, z + z / r * n * 0.8);
}
var k = Math.max(0, 1 - (y + 22) / 250), heat = 0.35 + 0.65 * k, mott = 0.75 + 0.25 * Math.sin(x * 0.21 + z * 0.17 + y * 0.3);
C.setRGB(0.3 * heat * mott + 0.03, 0.09 * heat * mott + 0.022, 0.06 * heat * mott + 0.02);
c[i * 3] = C.r;
c[i * 3 + 1] = C.g;
c[i * 3 + 2] = C.b;
}
g.setAttribute("color", new THREE.BufferAttribute(c, 3));
g.computeVertexNormals();
var m = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false });
var V = new THREE.Mesh(g, m);
V.position.set(ODP_C.x, -120, ODP_C.z);
V.raycast = function () { };
V.userData.keep = 1;
V.userData.noSit = 1;
V.renderOrder = -2;
otmP().add(V);
var n2 = lite ? 90 : 260, cone = new THREE.ConeGeometry(1, 1, 7, 3);
cone.rotateX(Math.PI);
cone.translate(0, -0.5, 0);
var cp = cone.attributes.position;
for (var j = 0; j < cp.count; j++) {
var yy = cp.getY(j), f = 1 + 0.25 * Math.sin(j * 1.7);
cp.setXYZ(j, cp.getX(j) * f, yy, cp.getZ(j) * f);
}
cone.computeVertexNormals();
var cc = new Float32Array(cp.count * 3);
for (j = 0; j < cp.count; j++) {
var t = cp.getY(j);
var b = 0.35 + 0.65 * Math.max(0, Math.min(1, -t));
cc[j * 3] = 0.34 * b + 0.03;
cc[j * 3 + 1] = 0.1 * b + 0.02;
cc[j * 3 + 2] = 0.065 * b + 0.02;
}
cone.setAttribute("color", new THREE.BufferAttribute(cc, 3));
var st = new THREE.InstancedMesh(cone, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false }), n2), o = new THREE.Object3D(), q = 0;
function vaultY(r) { for (var k = 0; k < prof.length - 1; k++) {
var a = prof[k], b = prof[k + 1];
if (r <= a.x && r >= b.x) {
var u = (a.x - r) / (a.x - b.x);
return -120 + a.y + (b.y - a.y) * u;
}
} return -120 + 226; }
for (var s = 0; s < n2; s++) {
var r = 20 + Math.sqrt(odpRnd()) * 232, f = odpRnd() * Math.PI * 2, Pp = odpAt(r, f), top = vaultY(r) + 4, len = (18 + odpRnd() * 62) * (r > 200 ? 0.6 : 1), w = len * (0.1 + odpRnd() * 0.08);
if (top - len < -95)
len = top + 95;
o.position.set(Pp.x, top, Pp.z);
o.rotation.set((odpRnd() - 0.5) * 0.12, odpRnd() * 6, (odpRnd() - 0.5) * 0.12);
o.scale.set(w, len, w * (0.8 + odpRnd() * 0.4));
o.updateMatrix();
st.setMatrixAt(q++, o.matrix);
}
st.count = q;
st.raycast = function () { };
st.userData.keep = 1;
st.userData.noSit = 1;
st.frustumCulled = false;
otmP().add(st);
ODP.vault = V;
},
function (lite) {
var cols = [[100, 0x6A1408, "dis"], [73, 0x7A1006, "blood"], [57, 0x8A3010, "sand"], [40, 0x5A2010, "bolge"]];
cols.forEach(function (Cl, ci) {
for (var k = 0; k < (lite ? 2 : 4); k++) {
var f = odpRnd() * Math.PI * 2, P = odpAt(Cl[0] + (odpRnd() - 0.5) * 8, f), y0 = ODP_RING[ci === 0 ? 6 : ci === 3 ? 8 : 7].y;
var D = odpDrift("ember", lite ? 70 : 200, P.x, P.z, lite ? 10 : 14, y0 + 1, y0 + 120, [0xFF7A30, 0xFF5A20, 0xFFA040, 0xFF6A28][(ci + k) % 4], lite ? 0.45 : 0.35, 0.85);
D.p.material.blending = THREE.AdditiveBlending;
D.p.material.fog = false;
D.v = 4 + odpRnd() * 5;
D.y0 = y0 + 1;
D.y1 = y0 + 120;
}
});
var sm = odpDrift("whirl", lite ? 160 : 480, ODP_C.x, ODP_C.z, 230, -60, 40, 0x2A0A06, lite ? 14 : 10, 0.18);
sm.spin = 0.012;
sm.p.material.depthWrite = false;
},
function (lite) {
var f = odpMid(7) - 0.42, Y7 = -162, Y8 = -180;
var g = new THREE.RingGeometry(50.2, 66, lite ? 6 : 14, 1, f - 0.03, 0.06);
g.rotateX(-Math.PI / 2);
ODP.flows = [odpFallMat(), odpFallMat(true)];
var stm = new THREE.Mesh(g, odpFallMat());
stm.position.set(ODP_C.x, Y7 + 0.06, ODP_C.z);
stm.scale.z = -1;
stm.userData.keep = 1;
stm.raycast = function () { };
otmP().add(stm);
var w = 50 * 0.06, sheet = new THREE.Mesh(new THREE.CylinderGeometry(50.1, 49.4, Y7 - Y8 + 0.4, lite ? 6 : 12, 1, true, Math.PI / 2 - f - 0.03, 0.06), odpFallMat(true));
sheet.position.set(ODP_C.x, (Y7 + Y8) / 2, ODP_C.z);
sheet.userData.keep = 1;
sheet.raycast = function () { };
otmP().add(sheet);
var B = odpAt(48.8, f);
odpDrift("ember", lite ? 60 : 180, B.x, B.z, 3.2, Y8, Y8 + 7, 0xC8281A, 0.5, 0.55).v = 1.4;
odpFire(B.x, Y8, B.z, 2.2, 0xFF4A18);
var Sg = odpAt(53, f + 0.05);
otmSign(["THE RED RIVER", "'it falls with such a roar that one could scarce have heard' (Canto XVI)"], 3.2, 0.6, "#1A0806", "#F0A080", Sg.x, Y7 + 2.2, Sg.z, odpRy(Sg.x, Sg.z, ODP_C.x, ODP_C.z) + Math.PI);
},
function (down) {
var k = "odpfall|" + (down ? 1 : 0);
if (OTM.mats[k])
return OTM.mats[k];
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 256;
var x = cv.getContext("2d");
x.fillStyle = "#5A0804";
x.fillRect(0, 0, 64, 256);
for (var i = 0; i < 180; i++) {
var px = Math.random() * 64, py = Math.random() * 256, l = 20 + Math.random() * 60;
var gr = x.createLinearGradient(px, py, px, py + l);
gr.addColorStop(0, "rgba(255,90,40,0)");
gr.addColorStop(0.5, "rgba(255," + (60 + Math.floor(Math.random() * 80)) + ",30,0.55)");
gr.addColorStop(1, "rgba(255,90,40,0)");
x.fillStyle = gr;
x.fillRect(px, py, 1 + Math.random() * 2.5, l);
}
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(down ? 3 : 1, down ? 2 : 6);
var m = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide, transparent: true, opacity: 0.92, depthWrite: false });
m.userData.flow = down ? 1 : 0;
return (OTM.mats[k] = m);
},
function () {
if (ODP_BK.geo.demon)
return ODP_BK.geo.demon;
var c = 0x1A0C0C, h = 0x2A1414, hn = 0x3A2A20;
var P = [odpBkE([0, 1.35, 0], [0.17, 0.24, 0.12], c), odpBkE([0, 1.05, 0.0], [0.12, 0.16, 0.09], c), odpBkE([0, 1.65, 0.03], [0.09, 0.1, 0.1], h),
odpBkC([0, 1.7, 0.1], [0, 1.66, 0.17], 0.04, 0.02, h, 0.02)];
P = P.concat(odpBkMirror([odpBkC([0.05, 1.72, 0.02], [0.12, 1.84, -0.04], 0.025, 0.006, hn, 0.01), odpBkC([0.17, 1.5, 0], [0.28, 1.2, 0.12], 0.05, 0.035, c, 0.03), odpBkC([0.28, 1.2, 0.12], [0.3, 0.98, 0.22], 0.035, 0.02, c, 0.02),
odpBkC([0.08, 0.95, 0], [0.1, 0.5, -0.18], 0.07, 0.045, c, 0.03), odpBkC([0.1, 0.5, -0.18], [0.11, 0.12, -0.28], 0.045, 0.025, c, 0.03)]));
P = P.concat([odpBkC([0, 0.95, -0.08], [0, 0.6, -0.45], 0.04, 0.025, c, 0.03), odpBkC([0, 0.6, -0.45], [0.1, 0.3, -0.8], 0.025, 0.01, c, 0.02)]);
return (ODP_BK.geo.demon = rbkBuild(P, ODP.lite ? 0.03 : 0.018, 0.04));
},
function (lite) {
if (typeof rbkBuild !== "function")
return;
var body = odpDemonGeo(), mat = odpBkMat("skin"), wm = new THREE.MeshLambertMaterial({ color: 0x140808, side: THREE.DoubleSide }), wing = odpSkWing(2.4, true);
var n = lite ? 6 : 16;
ODP.flyers = [];
for (var i = 0; i < n; i++) {
var G = new THREE.Group(), B = new THREE.Mesh(body, mat);
B.raycast = function () { };
G.add(B);
var ws = [-1, 1].map(function (sd) { var p = new THREE.Group(); p.position.set(sd * 0.1, 1.42, -0.08); G.add(p); var w = new THREE.Mesh(wing, wm); w.scale.set(sd, 1, 1); w.rotation.y = sd * 0.2; w.raycast = function () { }; p.add(w); return p; });
G.scale.setScalar(2.2 + odpRnd() * 0.8);
G.userData.keep = 1;
otmP().add(G);
var over = i % 3, R = over === 0 ? 60 + odpRnd() * 40 : over === 1 ? 25 + odpRnd() * 20 : 120 + odpRnd() * 110;
ODP.flyers.push({ g: G, w: ws, R: R, y: (over === 1 ? -150 : over === 0 ? -128 : -100) + odpRnd() * 45, v: (0.05 + odpRnd() * 0.05) * (odpRnd() < 0.5 ? -1 : 1) * (60 / R + 0.4), a: odpRnd() * Math.PI * 2, ph: odpRnd() * 9, dip: 6 + odpRnd() * 10 });
}
},
function (dt, t) {
(ODP.flyers || []).forEach(function (F) {
F.a += F.v * dt * 0.6;
var P = odpAt(F.R + Math.sin(t * 0.13 + F.ph) * 8, F.a), y = F.y + Math.sin(t * 0.4 + F.ph) * F.dip;
F.g.position.set(P.x, y, P.z);
F.g.rotation.set(0.5, F.a + (F.v > 0 ? 0 : Math.PI), (F.v > 0 ? -1 : 1) * 0.35);
var glide = Math.sin(t * 0.3 + F.ph) > 0.4, fl = glide ? 0.15 + 0.05 * Math.sin(t * 2) : 0.7 * Math.sin(t * 4.2 + F.ph);
F.w[0].rotation.z = -fl;
F.w[1].rotation.z = fl;
});
(ODP.flows || []).forEach(function (m) { if (m.map)
m.map.offset.y += dt * (m.userData.flow ? 0.55 : 0.12); });
},
function () {
if (ODP.stars)
return ODP.stars;
var lite = ODP.lite, S = ODP_SX, Z = ODP_SZ, G = new THREE.Group();
G.userData.keep = 1;
ODP.G.add(G);
OTK = ODP.K;
var St = { g: G, t: 0, said: {} };
var cu = odpBurrowCurve(), tg = new THREE.TubeGeometry(cu, lite ? 80 : 200, 2.8, lite ? 8 : 14, false), P = tg.attributes.position, col = new Float32Array(P.count * 3);
for (var i = 0; i < P.count; i++) {
var x = P.getX(i), y = P.getY(i), z = P.getZ(i), n = Math.sin(x * 0.9 + z * 0.7) * Math.sin(y * 1.1 + z * 0.3) * 0.35 + Math.sin(x * 2.3 - y * 1.7 + z * 1.9) * 0.12;
var u = Math.min(1, Math.max(0, (z - Z - 42) / 260));
P.setXYZ(i, x + n, y + n * 0.8, z + n * 0.4);
var b = (0.05 + 0.05 * Math.abs(n)) * (1 - u * 0.6);
col[i * 3] = b * 0.9;
col[i * 3 + 1] = b * 0.95;
col[i * 3 + 2] = b * 1.15;
}
tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
tg.computeVertexNormals();
var tube = new THREE.Mesh(tg, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.BackSide }));
tube.raycast = function () { };
tube.userData.noSit = 1;
G.add(tube);
var bc = new THREE.CatmullRomCurve3(cu.getPoints(40).map(function (p) { return p.clone().add(new THREE.Vector3(0.6, -2.6, 0)); }));
var brook = new THREE.Mesh(new THREE.TubeGeometry(bc, lite ? 60 : 140, 0.16, 6, false), new THREE.MeshBasicMaterial({ color: 0x1C2C3C, transparent: true, opacity: 0.5 }));
brook.scale.y = 1;
brook.raycast = function () { };
G.add(brook);
var bg = new THREE.PlaneGeometry(150, 100, lite ? 40 : 90, lite ? 28 : 60);
bg.rotateX(-Math.PI / 2);
var BP = bg.attributes.position, bcol = new Float32Array(BP.count * 3);
for (i = 0; i < BP.count; i++) {
var bx = BP.getX(i) + S, bz = BP.getZ(i) + Z + 5, h = odpStarsGround(bx, bz);
BP.setY(i, h);
var wet = Math.max(0, Math.min(1, (-30 - (bz - Z)) / 10)), m = 0.85 + 0.15 * Math.sin(bx * 1.7) * Math.sin(bz * 1.3);
bcol[i * 3] = (0.2 - 0.1 * wet) * m;
bcol[i * 3 + 1] = (0.19 - 0.09 * wet) * m;
bcol[i * 3 + 2] = (0.18 - 0.06 * wet) * m;
}
bg.setAttribute("color", new THREE.BufferAttribute(bcol, 3));
bg.computeVertexNormals();
var beach = new THREE.Mesh(bg, new THREE.MeshLambertMaterial({ vertexColors: true }));
beach.position.set(S, 0, Z + 5);
beach.userData.noSit = 1;
G.add(beach);
var rk = new THREE.IcosahedronGeometry(1, lite ? 2 : 3), RP = rk.attributes.position;
for (i = 0; i < RP.count; i++) {
var rx = RP.getX(i), ry = RP.getY(i), rz = RP.getZ(i), f = 1 + 0.18 * Math.sin(rx * 4 + rz * 3) * Math.sin(ry * 5) + 0.08 * Math.sin(rx * 11 + ry * 9);
RP.setXYZ(i, rx * f, ry * f, rz * f);
}
rk.computeVertexNormals();
var rm = otmMat(0x2A2A30, "stone");
[[0, 58, 26, 14, 18], [-26, 54, 16, 10, 12], [24, 55, 18, 11, 12], [-45, 40, 9, 6, 8], [44, 38, 10, 7, 8], [-12, 46, 7, 5, 6], [13, 47, 8, 6, 6]].forEach(function (r) { var m = new THREE.Mesh(rk, rm); m.position.set(S + r[0], -2, Z + r[1]); m.scale.set(r[2], r[3] * 1.2, r[4]); m.rotation.y = r[0] * 0.1; m.raycast = function () { }; m.userData.noSit = 1; G.add(m); if (r[1] < 50)
otmRound(S + r[0], Z + r[1], r[2] * 0.9, -3, r[3] * 2); });
var mouth = new THREE.Mesh(new THREE.CircleGeometry(3.0, 24), new THREE.MeshBasicMaterial({ color: 0x020203 }));
mouth.position.set(S, 1.6 + 1.2, Z + 43.5);
mouth.rotation.y = Math.PI;
G.add(mouth);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(6000, 3000, 1, 1), new THREE.MeshPhongMaterial({ color: 0x08101E, specular: 0x5A6A90, shininess: 90 }));
sea.rotation.x = -Math.PI / 2;
sea.position.set(S, -1.25, Z - 38 - 1500);
sea.raycast = function () { };
G.add(sea);
var gl = document.createElement("canvas");
gl.width = 64;
gl.height = 256;
var gx = gl.getContext("2d");
for (i = 0; i < 260; i++) {
var gy = Math.pow(Math.random(), 1.6) * 256, gw = 2 + Math.random() * 10 * (1 - gy / 256);
gx.fillStyle = "rgba(255,240,210," + (0.15 + Math.random() * 0.5) + ")";
gx.fillRect(32 - gw / 2 + (Math.random() - 0.5) * 14 * (1 - gy / 320), gy, gw, 1 + Math.random() * 1.5);
}
var gt = new THREE.CanvasTexture(gl), glit = new THREE.Mesh(new THREE.PlaneGeometry(40, 900), new THREE.MeshBasicMaterial({ map: gt, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
glit.rotation.x = -Math.PI / 2;
var vd = new THREE.Vector3(-0.62, 0, -0.78).normalize();
glit.rotation.z = Math.atan2(vd.x, -vd.z);
glit.scale.set(1.5, 1, 1);
glit.position.set(S + vd.x * 470, -1.2, Z - 38 + vd.z * 470);
G.add(glit);
St.glit = glit;
var mt = new THREE.LatheGeometry([[900, 0], [680, 140], [520, 300], [400, 470], [280, 640], [160, 800], [70, 900], [0.1, 930]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), lite ? 24 : 48);
(function () { var M = mt.attributes.position; for (var j = 0; j < M.count; j++) {
var x = M.getX(j), y = M.getY(j), z = M.getZ(j), r = Math.hypot(x, z);
if (r < 1)
continue;
var a = Math.atan2(z, x), n = 1 + 0.13 * Math.sin(a * 5 + y * 0.01) + 0.07 * Math.sin(a * 13 + y * 0.03) + 0.04 * Math.sin(a * 31 - y * 0.05);
M.setXYZ(j, x * n, y * (1 + 0.05 * Math.sin(a * 7)), z * n);
} })();
var mtn = new THREE.Mesh(mt, new THREE.MeshBasicMaterial({ color: 0x05080F, fog: false }));
mtn.scale.setScalar(0.38);
mtn.position.set(S + 100, -1.3, Z - 1000);
mtn.raycast = function () { };
G.add(mtn);
var top = (typeof wGlow === "function") ? wGlow(0xFFD8A0, 90, 0.35) : null;
if (top) {
top.position.set(S + 100, 352, Z - 1000);
G.add(top);
}
var nr = lite ? 120 : 360, rush = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.012, 0.025, 1.4, 4), otmMat(0x2A3A22, null), nr), o = new THREE.Object3D();
for (i = 0; i < nr; i++) {
var ux = (Math.random() - 0.5) * 130, uz = -36 + Math.random() * 4;
o.position.set(S + ux, odpStarsGround(S + ux, Z + uz) + 0.6, Z + uz);
o.rotation.set((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3);
o.scale.setScalar(0.6 + Math.random() * 0.8);
o.updateMatrix();
rush.setMatrixAt(i, o.matrix);
}
rush.raycast = function () { };
G.add(rush);
var Cx = S + 9, Cz = Z + 8;
odpLater(Cx, Cz, function () { return odpFig("Cato of Utica", "beard robe:white", Cx, odpStarsGround(Cx, Cz), Cz, -0.31, 1.05, G); });
otmSpot(Cx, Cz, 3, "🧔 Cato of Utica", "talk", function () { otmTalk("deep:cato", "on the shore of the island of Purgatory at dawn, where Dante came out of Hell, below the Temple of the Obsidian Moon"); }, { y: odpStarsGround(Cx, Cz) });
otmSpot(S, Z + 36, 4, "🌟 The shore under the stars", "see where you are", function () { odpStarsCard(); }, { y: odpStarsGround(S, Z + 36) });
St.sky = odpStarSky(lite);
G.add(St.sky);
ODP.stars = St;
return St;
},
function (lite) {
var N = lite ? 2400 : 6400, pos = [], siz = [], born = [], cl = [], tw = [], rnd = Math.random, c = new THREE.Color(), R = 1000;
function add(d, s, b, hex, t) { d.normalize(); pos.push(d.x * R, d.y * R, d.z * R); siz.push(s); born.push(b); c.setHex(hex); cl.push(c.r, c.g, c.b); tw.push(t === undefined ? 0.6 + rnd() * 1.6 : t, rnd() * 6.28); }
var TINT = [0xFFFFFF, 0xFFF4E8, 0xE8F0FF, 0xD8E4FF, 0xFFE8C8, 0xFFD8B0, 0xC8D8FF];
var band = new THREE.Vector3(0.35, 0.55, 0.75).normalize(), e1 = new THREE.Vector3(1, 0, 0).cross(band).normalize(), e2 = band.clone().cross(e1).normalize();
for (var i = 0; i < N; i++) {
var d, inBand = i < N * 0.42;
if (inBand) {
var a = rnd() * Math.PI * 2, off = (rnd() + rnd() + rnd() - 1.5) * 0.16;
d = e1.clone().multiplyScalar(Math.cos(a)).add(e2.clone().multiplyScalar(Math.sin(a))).add(band.clone().multiplyScalar(off));
}
else {
var u = rnd() * 2 - 1, t = rnd() * Math.PI * 2, q = Math.sqrt(1 - u * u);
d = new THREE.Vector3(q * Math.cos(t), u, q * Math.sin(t));
}
if (d.y < -0.03)
d.y = -d.y * 0.6 + 0.01;
var m = Math.pow(rnd(), inBand ? 9 : 6), s = (inBand ? 0.9 : 1.2) + m * (lite ? 5.5 : 6.5);
add(d, s, 2 + Math.pow(rnd(), 0.8) * (m > 0.3 ? 6 : 14) + (inBand ? 3 : 0), TINT[Math.floor(rnd() * TINT.length)]);
}
for (i = 0; i < (lite ? 260 : 700); i++) {
var a2 = rnd() * Math.PI * 2, o2 = (rnd() + rnd() - 1) * 0.1;
var d2 = e1.clone().multiplyScalar(Math.cos(a2)).add(e2.clone().multiplyScalar(Math.sin(a2))).add(band.clone().multiplyScalar(o2));
if (d2.y < 0)
d2.y = -d2.y * 0.5 + 0.02;
add(d2, lite ? 22 : 26 + rnd() * 22, 14 + rnd() * 8, rnd() < 0.5 ? 0x10141C : 0x16161C, 0);
}
var vd = new THREE.Vector3(-0.62, 0.1, -0.78);
add(vd.clone(), lite ? 16 : 22, 22, 0xFFF4E0, 0.15);
add(vd.clone(), lite ? 60 : 90, 23, 0x8A7A60, 0);
[[0.06, 0.5, -0.86], [0.1, 0.43, -0.9], [0.02, 0.44, -0.9], [0.065, 0.37, -0.93]].forEach(function (p, k) { var v = new THREE.Vector3(p[0], p[1], p[2]); add(v.clone(), lite ? 11 : 14, 30 + k * 1.6, 0xE8F0FF, 0.2); add(v.clone(), lite ? 34 : 48, 30.5 + k * 1.6, 0x6A80B0, 0); });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("aSize", new THREE.Float32BufferAttribute(siz, 1));
g.setAttribute("aBorn", new THREE.Float32BufferAttribute(born, 1));
g.setAttribute("aCol", new THREE.Float32BufferAttribute(cl, 3));
g.setAttribute("aTw", new THREE.Float32BufferAttribute(tw, 2));
var mat = new THREE.ShaderMaterial({ uniforms: { uT: { value: 0 }, uScale: { value: 1 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
vertexShader: "attribute float aSize; attribute float aBorn; attribute vec3 aCol; attribute vec2 aTw; uniform float uT; uniform float uScale; varying vec3 vCol; varying float vA;\n" +
"void main(){ vCol=aCol; float on=smoothstep(aBorn,aBorn+2.5,uT); vA=on*(0.86+0.14*sin(uT*aTw.x+aTw.y)); vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=aSize*uScale*(0.6+0.4*on); }",
fragmentShader: "varying vec3 vCol; varying float vA; void main(){ vec2 p=gl_PointCoord-0.5; float d=dot(p,p)*4.0; float a=(exp(-d*4.5)+0.25*exp(-d*1.2))*(1.0-smoothstep(0.7,1.0,d)); if(a<0.01) discard; gl_FragColor=vec4(vCol*a*vA,1.0); }" });
var P = new THREE.Points(g, mat);
P.frustumCulled = false;
P.renderOrder = -1;
P.raycast = function () { };
P.userData.keep = 1;
P.userData.sky = 1;
return P;
},
function () {
var St;
try {
St = odpStarsBuild();
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, the shore", e);
odpTask("out");
odpOut();
return;
}
var cu = odpBurrowCurve(), pts = cu.getPoints(16).map(function (v) { var p = odpPolar(v.x, v.z); return { r: p.r, f: p.f, y: v.y - 2.5 }; });
var A = pts[0], a = odpAt(A.r, A.f);
camera.position.set(ODP.base + a.x, A.y + 1.72, a.z);
if (typeof canFly !== "undefined")
canFly = true;
if (typeof flyY !== "undefined")
flyY = A.y;
St.t = 0;
ODP.starsT = 0;
St.said = {};
St.on = false;
if (St.sky)
St.sky.material.uniforms.uT.value = 0;
odpStarsMusic(true, 0.0);
odpRide(pts, ODP.lite ? 22 : 26, { faceAll: true, start: "🌑 <b>The hidden road.</b> 'A place there is below ... which not by sight is known, but by the sound of a rivulet, that there descendeth through the hollow of a stone.' You climb in the dark beside the brook, Virgil first and you behind (Canto XXXIV).",
ev: [{ u: 0.7, fn: function () { otmSay("🌑 Ahead, very small, a round opening, and in it something you have not seen since the Gate: a star."); } }],
done: function () { odpStarsArrive(); } });
},
function () {
var St = ODP.stars;
if (!St)
return;
worldCard(null);
camera.position.set(ODP.base + ODP_SX, odpStarsGround(ODP_SX, ODP_SZ + 38) + 1.72, ODP_SZ + 38);
if (typeof yaw !== "undefined")
yaw = 0;
if (typeof pitch !== "undefined")
pitch = 0.32;
if (typeof flyY !== "undefined")
flyY = odpStarsGround(ODP_SX, ODP_SZ + 38);
if (typeof canFly !== "undefined")
canFly = false;
if (ODP.virgil && ODP.virgil.g && ODP.virgil.g.position)
ODP.virgil.g.position.set(ODP_SX + 1.4, odpStarsGround(ODP_SX + 1.4, ODP_SZ + 39.5), ODP_SZ + 39.5);
St.on = true;
St.t = 0;
ODP.starsT = 0;
St.said = {};
var p = otmProg();
p.deep = p.deep || {};
p.deep.out = Date.now();
otmProgSave();
odpTask("out");
odpStarsMusic(true, 0.55);
otmSay("🌟 <b>'Thence we came forth to rebehold the stars.'</b> 'We mounted up, he first and I the second, till I beheld through a round aperture some of the beauteous things that Heaven doth bear' (Inferno XXXIV, the last lines).");
},
function () {
var b = "", fns = {};
b += worldBtn("stay", "🌟 Stay under the stars", "the dawn comes slowly; the music plays on");
fns.stay = function () { worldCard(null); };
b += worldBtn("again", "✨ Watch the stars come back again", "from the dark, one by one");
fns.again = function () { worldCard(null); odpStarsArrive(); };
b += worldBtn("circle", "🌙 Walk on, to the stone circle behind the temple", "up into the dark woods, under the open sky");
fns.circle = function () { worldCard(null); odpStarsMusic(false); odpOut(); };
b += worldBtn("below", "🔥 Back down to the head of the Highway Down", "");
fns.below = function () { worldCard(null); odpStarsMusic(false); odpArrive(ODP_AT.top); };
worldCard(worldFacts("🌟 To see again the stars", "the shore of the island of Purgatory, at dawn (Inferno XXXIV, Purgatorio I)", [], ["Dante's Hell ends where his Purgatory begins: he and Virgil climb out on the far side of the world, on the shore of an island with a great mountain on it, just before dawn on Easter Sunday 1300. Each of the three books of the Comedy ends on the same word, 'stars' (stelle)."]) + b, fns);
},
function (dt) {
var St = ODP.stars, L = worldLocal(), here = L.x < -500;
if (ODP.tune) {
var w = here ? ODP.tuneWant : 0, v = ODP.tune.volume;
if (Math.abs(v - w) > 0.004) {
ODP.tune.volume = Math.max(0, Math.min(1, v + Math.sign(w - v) * Math.min(Math.abs(w - v), dt * 0.12)));
}
else if (w === 0 && !ODP.tune.paused) {
ODP.tune.pause();
}
}
if (St && ODP.G && St.hid !== here) {
St.hid = here;
ODP.G.children.forEach(function (c) { if (c === St.g || (ODP.virgil && c === ODP.virgil.g))
return; if (here) {
c.userData.odpVis = c.visible;
c.visible = false;
}
else if (c.userData.odpVis !== undefined) {
c.visible = c.userData.odpVis;
delete c.userData.odpVis;
} });
}
if (!St || !here)
return;
if (St.sky) {
St.sky.position.set(L.x, L.y, L.z);
var u = St.sky.material.uniforms;
if (St.on) {
St.t += dt;
ODP.starsT = St.t;
}
u.uT.value = St.on ? St.t : 0;
u.uScale.value = Math.max(0.7, Math.min(2.2, (renderer.domElement.height || 800) / 800));
}
if (St.glit) {
var k = Math.max(0, Math.min(1, (St.t - 22) / 6));
St.glit.material.opacity = k * (0.8 + 0.1 * Math.sin(St.t * 0.7));
}
if (St.on)
ODP_STAR_LINES.forEach(function (Ln, i) { if (St.t > Ln[0] && !St.said[i]) {
St.said[i] = 1;
otmSay(Ln[1]);
} });
if (St.on && St.t > 60 && !St.said.card) {
St.said.card = 1;
if (!(WLD.card && WLD.card.style.display === "block"))
odpStarsCard();
}
},
function () {
var lite = ODP.lite, X = ODP_COURT_X, ob = otmMat(0x0E0C12, "marble", { phong: 90 }), gd = otmMat(0xB8923A, "metal", { phong: 70 }), rk = otmMat(0x1A1416, "stone");
otmBox(76, 0.4, 210, otmMat(0x1E181A, "stone"), X, -0.2, -100);
otmFloor(X - 38, -204, X + 38, 4, 0);
otmBox(24, 0.06, 208, otmMat(0x2A0E10, null), X, 0.03, -100);
otmBox(1, 34, 212, rk, X - 38.5, 17, -100);
otmBox(1, 34, 212, rk, X + 38.5, 17, -100);
otmBox(78, 34, 1, rk, X, 17, -204.5);
otmBox(78, 34, 1, rk, X, 17, 4.5);
var nc = lite ? 6 : 10;
[-1, 1].forEach(function (sd) {
for (var c = 0; c < nc; c++) {
var z = -4 - c * (196 / (nc - 1)), x = X + sd * 8;
otmCyl(0.7, 10, ob, x, 5, z, null, lite ? 8 : 16);
otmCyl(1.0, 0.6, gd, x, 10.2, z, null, lite ? 8 : 12);
otmRound(x, z, 0.8, 0, 10);
if (c % 2 === 0 || !lite)
odpBrazier(x - sd * 1.8, 0, z, 1, c % 3 ? 0xFF7A28 : 0xE85A20);
}
});
otmBox(2.4, 14, 2.4, ob, X - 5, 7, 2.5);
otmBox(2.4, 14, 2.4, ob, X + 5, 7, 2.5);
otmBox(12.8, 1.8, 2.8, ob, X, 14.9, 2.5);
otmPlane(7.6, 13, otmGlowM(0x1A0408), X, 6.5, 3.2, Math.PI);
otmSolid(X - 5, 2.5, 1.2, 1.2, 0, 14);
otmSolid(X + 5, 2.5, 1.2, 1.2, 0, 14);
otmSign(["THE INFERNAL COURT", "the nine kings and seven princes of the Ars Goetia"], 6, 1.0, "#0E0A0E", "#E8C878", X, 12, 1.2, Math.PI);
otmSpot(X, 0.6, 3, "🔥 The gate to the City of Dis", "go back into Dis", function () { odpCourtLeave(); });
otmBox(14, 3, 3, ob, X, 1.5, -201);
otmSolid(X, -201, 7, 1.5, 0, 3);
otmSign(["THE ORDER OF THE COURT", "kings, dukes, princes, marquises, earls, presidents and knights", "seventy-two spirits in all"], 8, 1.4, "#0E0A0E", "#E8C878", X, 5, -199.4, 0);
otmSpot(X, -198, 3, "📜 The order of the court", "read", function () {
worldCard(worldFacts("📜 The order of the court", "the Ars Goetia, as Mathers printed it in 1904", [["Kings", "9"], ["Dukes", "23"], ["Princes", "7 (some also earls or presidents)"], ["Marquises", "16"], ["Earls", "15"], ["Presidents", "14"], ["Knight", "1: Furcas"]], ["Many spirits hold two ranks, so the counts add to more than seventy-two.", "The kings of the four quarters, Amaymon of the east, Corson of the west, Ziminiar of the north and Gaap of the south, are named in the book but not among the seventy-two (Gaap is both).", "It is a document of history and belief. Nothing in this court is a working."]) + worldBtn("all", "Read all seventy-two", ""), { all: function () { odpSeventyTwo(); } });
});
ODP_COURT.forEach(function (row, i) { try {
odpPalace(row, odpCourtSlot(i));
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] palace", row[0], e);
} });
},
function (row, S) {
var lite = ODP.lite, key = row[0], name = row[1], rank = row[2], num = row[3], leg = row[4], vk = row[5], col = row[6], dev = row[7];
var dz = (S.z0 + S.z1) / 2, ob = otmMat(0x0E0C12, "marble", { phong: 90 }), gd = otmMat(0xB8923A, "metal", { phong: 70 }), st = ODP_PSTYLE[key] || { fl: [0x16121A, "marble"], wl: [0x221C22, "stone"], ce: 0x100C10, cols: "round", cc: col, car: col, fire: 0xFF7A28 };
var dr = {}, fire = otmDecoFlame(st.fire, "pal-" + key);
dr[S.door] = [{ at: dz, w: 3.4, h: 4.6 }];
OTK.flameKey = "pal-" + key;
var R = otmRoom({ x0: S.x0, z0: S.z0, x1: S.x1, z1: S.z1, y: 0, h: 9, name: "the palace of " + name, key: "pal-" + key, floor: otmMat(st.fl[0], st.fl[1], { phong: 80 }), wall: otmMat(st.wl[0], st.wl[1]), ceil: otmMat(st.ce, "stone"), doors: dr, frameMat: gd });
var dx = S.side ? 1 : -1;
var dais = S.side ? R.x1 - 3 : R.x0 + 3, door = S.side ? R.x0 : R.x1;
var px = door + (S.side ? -1.3 : 1.3);
[-2.6, 2.6].forEach(function (o) { otmCyl(0.45, 8, ob, px, 4, dz + o, null, lite ? 8 : 14); otmRound(px, dz + o, 0.5, 0, 8); });
otmBox(1.8, 0.8, 7, ob, px, 8.4, dz);
otmSign([name.toUpperCase(), rank + " · spirit " + num + " of the seventy-two · " + leg + " legions"], 5.2, 0.9, "#0E0A0E", "#E8C878", door + (S.side ? -0.3 : 0.3), 6.8, dz, S.side ? -Math.PI / 2 : Math.PI / 2);
odpTorch(door + (S.side ? -0.4 : 0.4), 3.2, dz - 2.2, null, fire);
odpTorch(door + (S.side ? -0.4 : 0.4), 3.2, dz + 2.2, null, fire);
odpPalCols(st, R, lite);
otmBox(R.w - 4, 0.04, 2.4, otmDecoMat("pal-" + key, "carpet", otmMat(st.car, null)), R.cx, 0.02, dz);
otmBox(4, 0.6, 7, ob, dais, 0.3, dz);
otmFloor(dais - 2, dz - 3.5, dais + 2, dz + 3.5, 0.6);
var th = otmGroup(dais + dx * 1.0, 0.6, dz, S.side ? -Math.PI / 2 : Math.PI / 2);
otmBox(1.6, 0.6, 1.2, gd, 0, 0.3, 0, th);
otmBox(1.6, 3.2, 0.25, gd, 0, 1.6, -0.6, th);
otmSph(0.25, gd, -0.7, 3.3, -0.6, th, 8);
otmSph(0.25, gd, 0.7, 3.3, -0.6, th, 8);
otmSolid(dais + dx * 1.0, dz, 0.8, 0.9, 0, 3.6);
var bn = otmCanvasMat("odp-ban-" + key, 256, 512, function (x, W, H) {
var c = new THREE.Color(col);
x.fillStyle = "#" + c.getHexString();
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8A040";
x.lineWidth = 10;
x.strokeRect(10, 10, W - 20, H - 20);
x.fillStyle = "#E8C878";
x.textAlign = "center";
x.font = "bold 30px Georgia";
x.fillText(name.toUpperCase(), W / 2, 70);
x.font = "18px Georgia";
x.fillText(rank, W / 2, 100);
x.font = "italic 17px Georgia";
var words = dev.split(" "), line = "", y = 200;
words.forEach(function (w) { if ((line + " " + w).length > 18) {
x.fillText(line, W / 2, y);
y += 26;
line = w;
}
else
line = (line ? line + " " : "") + w; });
if (line)
x.fillText(line, W / 2, y);
x.font = "bold 46px Georgia";
x.fillText(String(num), W / 2, H - 90);
x.font = "16px Georgia";
x.fillText(leg + " legions", W / 2, H - 50);
}, { basic: 1 });
var bwall = S.side ? R.x1 - 0.22 : R.x0 + 0.22;
otmPlane(2.4, 4.8, bn, bwall, 5.2, dz, S.side ? -Math.PI / 2 : Math.PI / 2);
[dz - 2.8, dz + 2.8].forEach(function (z) { odpBrazier(dais - dx * 2.6, 0, z, 1, fire); });
if (!lite)
for (var l = 0; l < 2; l++) {
var lp = otmGroup(R.cx + (l ? 4 : -4), 7.6, dz);
otmCyl(0.02, 1.4, otmMat(0x1A1818, "metal"), 0, 0.7, 0, lp, 4);
otmFlame(0, -0.2, 0, 3.4, fire, lp);
}
[6, 13].forEach(function (u) { [R.z0 + 0.35, R.z1 - 0.35].forEach(function (z) { odpTorch(door + dx * u, 3.4, z, null, fire); }); });
try {
if (ODP_DECK[key])
ODP_DECK[key](odpPalCtx(key, R, S, dz, door, dx));
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] palace furnishings", key, e);
}
delete OTK.flameKey;
odpLater(dais, dz, function () { var ry = S.side ? -Math.PI / 2 : Math.PI / 2; return odpFig(name, ODP_FIGS[key] || "crown robe:black", dais + dx * 0.6, 0.6, dz, ry, 1.25, null, ODP_DEITY[key]); });
odpTalkSpot(dais - dx * 2.4, dz, 0, vk, "your own palace, " + name + ", in the Infernal Court in the City of Dis, below the Temple of the Obsidian Moon", 2.6);
otmSpot(door + (S.side ? 2.4 : -2.4), dz + 2.6, 1.8, "📜 " + name, "read what the Goetia says", function () {
var v = otmVoice(vk), m = v && v.m && v.m[0] ? String(v.m[0]).replace(/^You are /, "").replace(/\byou\b/g, "they").replace(/\byour\b/g, "their").replace(/\bYou\b/g, "They") : "";
worldCard(worldFacts("📜 " + name, rank + " · the " + num + (num % 10 === 1 && num !== 11 ? "st" : num % 10 === 2 && num !== 12 ? "nd" : num % 10 === 3 && num !== 13 ? "rd" : "th") + " spirit of the Ars Goetia", [["Rank", rank], ["Legions", String(leg)], ["The banner", dev]], [m || "",
"From the Lesser Key of Solomon, in Mathers' English of 1904: history and belief, never a working."].filter(Boolean)), {});
});
},
function () {
worldCard(null);
var X = ODP_COURT_X;
camera.position.set(ODP.base + X, 1.72, -3);
if (typeof yaw !== "undefined")
yaw = 0;
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (ODP.virgil && ODP.virgil.g && ODP.virgil.g.position)
ODP.virgil.g.position.set(X - 1.5, 0, -1);
otmSay("👑 <b>The Infernal Court.</b> Black columns, fire in bronze bowls, and down either side the palaces of the nine kings and seven princes of the Goetia, each with its name over the door. Go in: each of them answers in their own voice.");
},
function (key, R, S, dz, door, dx) {
var C = { key: key, R: R, dz: dz, lite: ODP.lite, hw: (R.z1 - R.z0) / 2, faceDoor: S.side ? -Math.PI / 2 : Math.PI / 2 };
C.x = function (u) { return door + dx * u; };
C.z = function (v) { return dz + v; };
C.box = function (w, h, d, m, u, y, v) { return otmBox(w, h, d, m, C.x(u), y, C.z(v)); };
C.cyl = function (r, h, m, u, y, v, seg, r2) { return otmCyl(r, h, m, C.x(u), y, C.z(v), null, seg || (ODP.lite ? 8 : 14), r2); };
C.sph = function (r, m, u, y, v, seg) { return otmSph(r, m, C.x(u), y, C.z(v), null, seg || (ODP.lite ? 8 : 12)); };
C.grp = function (u, y, v, ry) { return otmGroup(C.x(u), y, C.z(v), ry || 0); };
C.solid = function (u, v, hu, hv, h, b) { return otmSolid(C.x(u), C.z(v), hu, hv, b || 0, h || 2); };
C.round = function (u, v, r, h) { return otmRound(C.x(u), C.z(v), r, 0, h || 2); };
C.wall = function (sd, u, y, w, h, m) { var z = sd > 0 ? R.z1 - 0.26 : R.z0 + 0.26; var p = otmPlane(w, h, m, C.x(u), y, z, sd > 0 ? Math.PI : 0); p.userData.noSit = 1; return p; };
C.flame = function (u, y, v, s, col) { return otmFlame(C.x(u), y, C.z(v), s, col); };
C.spot = function (u, v, title, sub, rows, notes) { otmSpot(C.x(u), C.z(v), 1.6, title, sub, function () { worldCard(worldFacts(title, notes && notes.src || "from the Goetia, in Mathers' English of 1904", rows || [], notes && notes.l || []), {}); }); };
C.statue = function (kind, u, v, ry, h, tint, amt, extra) {
var pm = otmMat(0x1A161A, "marble", { phong: 60 });
C.box(1.6, 0.9, 1.6, pm, u, 0.45, v);
C.solid(u, v, 0.8, 0.8, 0.9);
odpLater(C.x(u), C.z(v), function () { var g = odpCreature(kind, C.x(u), 0.9, C.z(v), ry, h); if (g) {
odpTint(g, tint, amt === undefined ? 0.85 : amt);
if (extra)
extra(g);
} return g; });
};
return C;
},
function (g, hex, amt) {
var to = new THREE.Color(hex), seen = {};
g.traverse(function (o) {
if (!o.isMesh || !o.material)
return;
var ms = Array.isArray(o.material) ? o.material : [o.material];
var nm = ms.map(function (m) { if (!m.color)
return m; var k = m.uuid; if (!seen[k]) {
var c = m.clone();
c.color.lerp(to, amt);
if (c.emissive && amt > 0.5)
c.emissive.setHex(0x000000);
seen[k] = c;
} return seen[k]; });
o.material = Array.isArray(o.material) ? nm : nm[0];
});
},
function (st, R, lite) {
var m = otmMat(st.cc, "marble", { phong: 70 }), cn = lite ? 2 : 4, kind = st.cols;
for (var c = 0; c < cn; c++) {
var cx = R.x0 + 3 + c * ((R.w - 6) / (cn - 1 || 1));
[R.z0 + 2.4, R.z1 - 2.4].forEach(function (z) {
if (kind === "square") {
otmBox(0.8, 9, 0.8, m, cx, 4.5, z);
otmBox(1.1, 0.5, 1.1, m, cx, 0.25, z);
otmBox(1.1, 0.5, 1.1, m, cx, 8.75, z);
otmSolid(cx, z, 0.55, 0.55, 0, 9);
}
else if (kind === "twist") {
var g = otmGroup(cx, 0, z);
for (var k = 0; k < (lite ? 6 : 12); k++) {
var b = otmBox(0.62, 9 / (lite ? 6 : 12) + 0.02, 0.62, m, 0, (k + 0.5) * 9 / (lite ? 6 : 12), 0, g);
b.rotation.y = k * 0.32;
}
otmRound(cx, z, 0.45, 0, 9);
}
else if (kind === "cluster") {
[[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]].forEach(function (o) { otmCyl(0.2, 9, m, cx + o[0], 4.5, z + o[1], null, lite ? 6 : 10); });
otmBox(1, 0.5, 1, m, cx, 8.75, z);
otmRound(cx, z, 0.5, 0, 9);
}
else if (kind === "banded") {
otmCyl(0.42, 9, m, cx, 4.5, z, null, lite ? 8 : 14);
var br = otmMat(0x8A6A3A, "metal", { phong: 60 });
for (var b2 = 1; b2 < 4; b2++)
otmCyl(0.46, 0.22, br, cx, b2 * 2.2, z, null, lite ? 8 : 14);
otmRound(cx, z, 0.48, 0, 9);
}
else if (kind === "slender") {
otmCyl(0.24, 9, m, cx, 4.5, z, null, lite ? 8 : 12);
otmCyl(0.42, 0.4, m, cx, 0.2, z, null, lite ? 8 : 12);
otmCyl(0.5, 0.3, m, cx, 8.85, z, null, lite ? 8 : 12, 0.26);
otmRound(cx, z, 0.34, 0, 9);
}
else if (kind === "timber") {
var wd = otmMat(st.cc, "wood");
otmBox(0.6, 9, 0.6, wd, cx, 4.5, z);
otmBox(0.3, 0.3, 2.2, wd, cx, 8.3, z);
otmBox(2.2, 0.3, 0.3, wd, cx, 8.3, z);
otmSolid(cx, z, 0.4, 0.4, 0, 9);
}
else {
otmCyl(0.4, 9, m, cx, 4.5, z, null, lite ? 8 : 12);
otmRound(cx, z, 0.45, 0, 9);
}
});
}
},
function (C) {
var vm = otmMat(0x6A3AAA, null, { op: 0.32, ds: 1 }), ob = otmMat(0x050407, "marble", { phong: 120 });
[5, 9, 13].forEach(function (u) { [-1, 1].forEach(function (sd) { var p = otmPlane(3.2, 6, vm, C.x(u), 4.6, C.z(sd * 3.6), 0); p.userData.noSit = 1; otmBox(3.4, 0.1, 0.1, otmMat(0x1A1818, "metal"), C.x(u), 7.65, C.z(sd * 3.6)); }); });
C.box(5, 0.5, 3, ob, 9, 0.25, -5.6);
C.solid(9, -5.6, 2.5, 1.5, 0.5);
var w = otmPlane(4.6, 2.6, otmMat(0x06040C, null, { phong: 200 }), C.x(9), 0.47, C.z(-5.6), 0);
w.rotation.x = -Math.PI / 2;
C.statue("frog", 14.5, -4.6, C.faceDoor, 1.1, 0x3A4A2A, 0.7);
C.statue("tiger", 14.5, 4.6, C.faceDoor, 1.3, 0x2A2030, 0.8);
C.wall(1, 9, 3.6, 2.4, 4.2, otmMat(0xB8923A, "metal"));
C.wall(1, 9, 3.6, 2.0, 3.8, otmMat(0x08060C, null, { phong: 200 }));
C.spot(9, -3.2, "🌫 The hall of veils", "the first spirit of the Goetia", [["He rules", "in the East"], ["He appears", "with three heads: a toad, a man and a cat, or in one of these shapes"], ["His voice", "hoarse"]], { l: ["Mathers: he maketh thee to go invisible. So his hall is veils, a black pool, and a mirror that shows no one."] });
},
function (C) {
var gd = otmMat(0xC8A040, "metal", { phong: 90 }), wd = otmMat(0x4A2A14, "wood"), hide = otmMat(0xD8C8A0, null);
C.box(11, 1.2, 3.6, wd, 9.5, 0.6, 6.6);
C.solid(9.5, 6.6, 5.5, 1.8, 1.2);
for (var r = 0; r < 6; r++)
C.box(0.08, 0.9, 0.08, gd, 4.5 + r * 2, 1.65, 4.85);
C.box(11, 0.08, 0.08, gd, 9.5, 2.1, 4.85);
for (var i = 0; i < (C.lite ? 3 : 6); i++) {
var u = 5 + i * 1.8;
if (i % 3 === 0) {
var t = C.grp(u, 1.9, 6.6, Math.PI / 2);
otmCyl(0.03, 1.1, gd, 0, 0, 0, t, 6, 0.03).rotation.z = Math.PI / 2;
var bell = otmCyl(0.02, 0.3, gd, 0.6, 0, 0, t, 10, 0.16);
bell.rotation.z = -Math.PI / 2;
C.box(0.06, 0.7, 0.06, wd, u, 1.55, 6.6);
}
else if (i % 3 === 1) {
C.cyl(0.32, 0.03, gd, u, 2.05, 6.6, 16);
C.cyl(0.32, 0.03, gd, u, 2.25, 6.6, 16);
C.box(0.05, 0.9, 0.05, wd, u, 1.65, 6.6);
}
else {
C.cyl(0.45, 0.55, otmMat(0x8A5A2A, "metal"), u, 1.5, 6.6, 14, 0.3);
C.cyl(0.46, 0.02, hide, u, 1.78, 6.6, 14);
}
}
C.statue("camel", 9, -4.8, 0, 2.4, 0xB8923A, 0.8);
var cn = C.grp(C.R.w - 3 + 0.6, 6.6, 0, 0);
otmCyl(0.01, 2.2, otmMat(0x8A2A1A, null, { ds: 1 }), 0, 0, 0, cn, 4, 3.0).rotation.y = Math.PI / 4;
C.box(0.8, 1.1, 0.6, wd, 4.8, 0.55, -4.6);
C.box(0.9, 0.06, 0.7, otmMat(0xE8DCC0, null), 4.8, 1.14, -4.6);
C.solid(4.8, -4.6, 0.45, 0.35, 1.2);
C.spot(9, -2.8, "🎺 The musicians' gallery", "the ninth spirit, two hundred legions", [["He rides", "a dromedary, crowned, with a woman's face"], ["Before him", "a host of spirits like men, with trumpets, cymbals and every other instrument"], ["He teaches", "all arts and sciences, and secret things"]], { l: ["Mathers: he is very obedient unto Lucifer."] });
},
function (C) {
var br = otmMat(0xD8B060, "metal", { phong: 90 }), rose = otmMat(0x9A1020, null), lf = otmMat(0x2A4A20, null);
C.statue("nightmare", 8, -4.6, 0, 2.2, 0xE8E4DA, 0.9);
C.statue("nightmare", 8, 4.6, Math.PI, 2.2, 0xE8E4DA, 0.9);
[-1, 1].forEach(function (sd) { [5, 11, 15].forEach(function (u) { for (var k = -1; k <= 1; k++) {
var g = otmGroup(C.x(u), 4.2, sd > 0 ? C.R.z1 - 0.35 : C.R.z0 + 0.35, 0);
var t = otmCyl(0.025, 1.4, br, 0, 0, 0, g, 6, 0.12);
t.rotation.z = k * 0.45;
t.position.x = k * 0.35;
} }); });
var nr = C.lite ? 6 : 14;
[-1, 1].forEach(function (sd) { for (var k = 0; k < nr; k++) {
var u = 3 + k * (15 / (nr - 1)), sag = Math.sin(k / (nr - 1) * Math.PI * 3) * 0.35;
otmSph(0.13, k % 3 ? rose : lf, C.x(u), 5.6 - Math.abs(sag), sd > 0 ? C.R.z1 - 0.3 : C.R.z0 + 0.3, null, 6);
} });
[5, 13].forEach(function (u) { C.cyl(0.25, 1, otmMat(0xF0ECE4, "marble"), u, 0.5, -6.4); C.round(u, -6.4, 0.3, 1); for (var r = 0; r < (C.lite ? 3 : 6); r++)
C.sph(0.12, rose, u + Math.cos(r) * 0.15, 1.08 + r * 0.02, -6.4 + Math.sin(r) * 0.15, 6); });
C.spot(8, -2.8, "🐎 The pale horse", "the thirteenth spirit, eighty-five legions", [["He rides", "a pale horse"], ["Before him", "trumpets and every kind of music"], ["He is", "terrible at his first coming, and causes love"]], { l: ["Mathers says the magician must hold a hazel wand toward him and speak with courtesy."] });
},
function (C) {
var gd = otmMat(0xD8A830, "metal", { phong: 100 }), wd = otmMat(0x4A2A14, "wood"), ir = otmMat(0x2A2422, "metal");
[[5, -5], [8, -6.2], [5, 5.6], [11, 6]].forEach(function (p, i) {
var g = C.grp(p[0], 0, p[1], i * 0.6);
otmBox(1.2, 0.6, 0.8, wd, 0, 0.3, 0, g);
otmBox(1.24, 0.08, 0.84, ir, 0, 0.62, 0, g);
var lid = otmBox(1.2, 0.08, 0.8, wd, 0, 0.95, -0.42, g);
lid.rotation.x = -1.2;
otmBox(1.1, 0.2, 0.7, gd, 0, 0.66, 0, g);
C.round(p[0], p[1], 0.7, 0.8);
});
[[6.5, -4.2], [9.5, 4.6], [12.5, -5.4]].forEach(function (p) { C.cyl(0.05, 0.7, gd, p[0], 0.35, p[1], 10, 0.8); C.round(p[0], p[1], 0.8, 0.7); });
C.statue("bear", 14.5, -4.6, C.faceDoor, 1.9, 0x6A4A2A, 0.75);
C.statue("snake", 14.5, 4.6, C.faceDoor, 0.9, 0x3A4A2A, 0.6);
C.wall(-1, 9, 3.4, 3.2, 2.2, odpPic("purson-map", 512, 352, function (x, W, H) {
x.fillStyle = "#C8AA78";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#6A4A2A";
x.lineWidth = 6;
x.strokeRect(8, 8, W - 16, H - 16);
x.lineWidth = 3;
x.beginPath();
x.moveTo(60, 280);
x.bezierCurveTo(140, 120, 260, 300, 330, 160);
x.bezierCurveTo(380, 90, 420, 120, 440, 90);
x.setLineDash([10, 10]);
x.stroke();
x.setLineDash([]);
x.strokeStyle = "#8A1A1A";
x.lineWidth = 8;
x.beginPath();
x.moveTo(425, 75);
x.lineTo(455, 105);
x.moveTo(455, 75);
x.lineTo(425, 105);
x.stroke();
x.fillStyle = "#4A2A14";
x.font = "italic 22px Georgia";
x.fillText("what is hidden", 40, 50);
}));
C.spot(8, -2.8, "💰 The hidden things", "the twentieth spirit, twenty-two legions", [["He appears", "with a lion's face, carrying a cruel viper, riding a bear"], ["Before him", "many trumpets"], ["He knows", "hidden things, and can discover treasure"]], { l: ["Mathers: he telleth all things past, present and to come."] });
},
function (C) {
var bz = otmMat(0xB88A3A, "metal", { phong: 90 }), wd = otmMat(0x2A1A10, "wood"), red = otmMat(0x6A0A14, null);
var ag = C.grp(9, 2.6, -4.8, 0);
otmCyl(0.08, 1.6, bz, 0, -1.8, 0, ag, 8);
otmCyl(0.6, 0.15, bz, 0, -2.55, 0, ag, 12);
for (var k = 0; k < (C.lite ? 2 : 4); k++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.035, 6, C.lite ? 24 : 40), bz);
t.rotation.set(k === 1 ? Math.PI / 2 : k === 2 ? 0.41 : 0, k * 0.8, k === 3 ? Math.PI / 2 : 0);
ag.add(t);
}
otmSph(0.18, otmMat(0x1A3A6A, null), 0, 0, 0, ag, 10);
C.round(9, -4.8, 0.7, 3);
[[5, 5], [9, 5]].forEach(function (p) {
C.box(1.8, 0.9, 1.0, wd, p[0], 0.45, p[1]);
C.box(1.8, 0.04, 1.0, otmMat(0xE8DCC0, null), p[0], 0.92, p[1]);
C.solid(p[0], p[1], 0.9, 0.5, 1);
var cp = C.grp(p[0] - 0.3, 0.95, p[1], 0);
var a = otmBox(0.03, 0.02, 0.6, bz, 0.1, 0, 0, cp);
a.rotation.y = 0.3;
var b = otmBox(0.03, 0.02, 0.6, bz, -0.1, 0, 0, cp);
b.rotation.y = -0.3;
C.box(0.5, 0.02, 0.05, bz, p[0] + 0.4, 0.95, p[1] - 0.2);
C.box(0.05, 0.02, 0.4, bz, p[0] + 0.62, 0.95, p[1]);
});
var ab = C.grp(13, 0, 5.4, 0);
otmBox(1.4, 1.2, 0.1, wd, 0, 1.0, 0, ab);
for (var r = 0; r < 5; r++)
for (var b2 = 0; b2 < 6; b2++)
otmSph(0.06, b2 < 3 ? red : bz, -0.5 + b2 * 0.2, 0.6 + r * 0.18, 0.06, ab, 6);
C.solid(13, 5.4, 0.7, 0.2, 1.6);
C.wall(1, 8, 3.6, 3.4, 2.2, odpPic("euclid", 512, 330, function (x, W, H) {
x.fillStyle = "#141414";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#E8E0C8";
x.lineWidth = 3;
x.beginPath();
x.arc(200, 190, 90, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(290, 190, 90, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.moveTo(200, 190);
x.lineTo(290, 190);
x.lineTo(245, 112);
x.closePath();
x.stroke();
x.fillStyle = "#E8E0C8";
x.font = "italic 20px Georgia";
x.fillText("Euclid, Elements, Book I, Proposition 1", 40, 40);
x.font = "16px Georgia";
x.fillText("on a given line, to build an equilateral triangle", 40, 310);
}));
C.cyl(0.3, 1.1, otmMat(0x1A1414, "marble"), 14.5, 0.55, 4.6);
C.box(0.5, 0.12, 0.5, red, 14.5, 1.16, 4.6);
C.round(14.5, 4.6, 0.35, 1.2);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 8, 20), otmMat(0xFFD050, "metal", { phong: 140, e: 0x3A2A00 }));
ring.position.set(C.x(14.5), 1.3, C.z(4.6));
ring.rotation.x = Math.PI / 2.4;
otmP().add(ring);
C.spot(14.5, 3, "💍 The Ring of Virtues", "the thirty-second spirit, seventy-two legions", [["He appears", "with three heads, of a bull, a man and a ram, riding an infernal dragon"], ["He gives", "the Ring of Virtues"], ["He teaches", "arithmetic, astronomy, geometry, and all the mechanical arts"]], { l: ["Mathers: he showeth the place where treasures lie, and guardeth it."] });
},
function (C) {
var bs = otmMat(0x2A2A2E, "stone"), dk = otmMat(0x18181A, "stone");
[[5, 5, 2.2], [7.5, 5.6, 3.2], [10, 5, 4.2]].forEach(function (p) { C.cyl(0.55, p[2], bs, p[0], p[2] / 2, p[1], 10); for (var k = 0; k < 6; k++) {
var a = k * Math.PI / 3;
C.box(0.22, 0.3, 0.22, bs, p[0] + Math.cos(a) * 0.48, p[2] + 0.15, p[1] + Math.sin(a) * 0.48);
} C.round(p[0], p[1], 0.6, p[2]); });
C.box(4, 2.6, 0.8, dk, 6, 1.3, -6.4);
C.solid(6, -6.4, 2, 0.4, 2.6);
[[8.6, 0.4, -5.6, 0.4], [9.4, 0.3, -6.6, 0.9], [8.4, 0.25, -4.8, 1.3], [10.2, 0.3, -5.4, 2.1]].forEach(function (b) { var m = C.box(0.9, 0.6, 0.7, dk, b[0], b[1], b[2]); m.rotation.set(b[3] * 0.3, b[3], b[3] * 0.2); C.round(b[0], b[2], 0.5, 0.8); });
C.cyl(1.6, 0.6, bs, 13, 0.3, -5.2, C.lite ? 12 : 20);
C.round(13, -5.2, 1.6, 0.6);
var wt = new THREE.Mesh(new THREE.CircleGeometry(1.45, C.lite ? 12 : 20), otmMat(0x101828, null, { phong: 160 }));
wt.rotation.x = -Math.PI / 2;
wt.position.set(C.x(13), 0.58, C.z(-5.2));
otmP().add(wt);
C.statue("lion", 14.5, 4.6, C.faceDoor, 1.6, 0x101012, 0.9);
if (!C.lite)
C.statue("nightmare", 16, -5.6, C.faceDoor, 2, 0x0A0A0C, 0.6);
C.spot(13, -3.2, "🗼 Towers and walls", "the forty-fifth spirit, thirty-six legions", [["He appears", "as a lion riding a black horse, bearing a viper"], ["He builds", "towers, and overthrows great stone walls"], ["He makes", "the waters rough with storms"]], { l: ["Mathers: he can discover witches, and knows things past, present and to come."] });
},
function (C) {
var bz = otmMat(0x7A5A2A, "metal", { phong: 60 }), wd = otmMat(0x3A2614, "wood"), fe = otmMat(0x5A3A1A, null), eye = otmGlowM(0xFF3010);
[[5, -4.6], [8, -5.4], [5, 4.6], [8, 5.4]].forEach(function (p, i) {
C.cyl(0.05, 1.7, wd, p[0], 0.85, p[1], 6);
C.box(0.7, 0.06, 0.06, wd, p[0], 1.7, p[1]);
C.round(p[0], p[1], 0.3, 1.7);
var h = C.grp(p[0], 1.9, p[1], i * 1.3);
var bd = otmSph(0.14, fe, 0, 0, 0, h, 8);
bd.scale.set(1, 1.3, 1);
otmSph(0.08, fe, 0, 0.2, 0.05, h, 8);
otmBox(0.3, 0.04, 0.12, fe, 0.12, 0.02, -0.02, h).rotation.z = -0.5;
otmBox(0.3, 0.04, 0.12, fe, -0.12, 0.02, -0.02, h).rotation.z = 0.5;
});
C.box(3, 0.9, 0.9, wd, 11, 0.45, -5.4);
C.solid(11, -5.4, 1.5, 0.45, 1);
[10, 11, 12].forEach(function (u) { var g = C.grp(u, 0.9, -5.4, 0); otmCyl(0.01, 0.28, odpGlass(0xE8D8A0), 0, 0.14, 0, g, 10, 0.12); otmCyl(0.12, 0.28, odpGlass(0xE8D8A0), 0, 0.42, 0, g, 10, 0.01); otmBox(0.3, 0.03, 0.3, bz, 0, 0.57, 0, g); otmBox(0.3, 0.03, 0.3, bz, 0, 0, 0, g); });
[-1, 1].forEach(function (sd) {
[5, 10, 15].forEach(function (u, i) {
var z = sd > 0 ? C.R.z1 - 0.3 : C.R.z0 + 0.3;
var mk = otmMat([0x6A4A2A, 0xB89A7A, 0x8A7A5A][i], null);
var f = otmSph(0.38, mk, C.x(u), 4, z, null, 10);
f.scale.set(1, 1.25, 0.35);
[-0.13, 0.13].forEach(function (o) { otmSph(0.06, eye, C.x(u) + o, 4.1, z - sd * 0.14, null, 6); });
});
});
C.statue("bear", 14.5, 4.6, C.faceDoor, 2, 0x4A3218, 0.8);
C.spot(8, -2.8, "🦅 The hawk on the fist", "the fifty-first spirit, forty legions", [["He appears", "with three heads, of a bull, a man and a ram, with a serpent's tail and flaming eyes"], ["He rides", "a furious bear, with a goshawk upon his fist"], ["He gives", "true answers of things past, present and to come"]], { l: ["Mathers: he can make men go invisible, and witty."] });
},
function (C) {
var wd = otmMat(0x3A2414, "wood"), cop = otmMat(0xB87A3A, "metal", { phong: 80 }), gd = otmMat(0xD8A830, "metal", { phong: 100 }), sv = otmMat(0xC8C8D0, "metal", { phong: 100 });
C.box(6, 0.95, 1.1, wd, 7.5, 0.47, 5.6);
C.solid(7.5, 5.6, 3, 0.55, 1);
var cols = [0x3A7AE8, 0xE83A3A, 0xE8C83A, 0x3AE87A, 0xA83AE8];
for (var k = 0; k < (C.lite ? 4 : 8); k++) {
var u = 5 + k * 0.7;
C.cyl(0.07, 0.25, odpGlass(cols[k % 5]), u, 1.1, 5.6, 8);
C.sph(0.12, odpGlass(cols[(k + 2) % 5]), u, 1.32, 5.8, 8);
}
var al = C.grp(10, 0.95, 5.6, 0);
otmSph(0.25, cop, 0, 0.25, 0, al, 10);
otmCyl(0.02, 0.3, cop, 0, 0.6, 0, al, 8, 0.18);
var tb = otmCyl(0.02, 0.8, cop, 0.3, 0.75, 0, al, 6);
tb.rotation.z = -1.1;
for (var c = 0; c < (C.lite ? 3 : 5); c++) {
var ck = C.cyl(0.45, 1.0, wd, 4.5 + (c % 3) * 1.2 + (c >= 3 ? 0.6 : 0), c < 3 ? 0.5 : 1.35, -6.4, 12);
ck.rotation.x = Math.PI / 2;
}
C.solid(5.7, -6.4, 1.8, 0.5, 1.8);
[[10, -5.2, 0x3A6AC8], [12, -5.2, 0x6A0A1A]].forEach(function (b) { C.cyl(0.8, 0.7, otmMat(0x2A5A3A, "marble"), b[0], 0.35, b[1], 16); C.round(b[0], b[1], 0.8, 0.7); var s = new THREE.Mesh(new THREE.CircleGeometry(0.7, 16), otmMat(b[2], null, { phong: 120 })); s.rotation.x = -Math.PI / 2; s.position.set(C.x(b[0]), 0.71, C.z(b[1])); otmP().add(s); });
[[13.5, -6.8, gd], [14.2, -6.6, sv], [13.8, -7.4, cop]].forEach(function (p) { for (var k = 0; k < 4; k++)
C.cyl(0.18, 0.04, p[2], p[0], 0.02 + k * 0.045, p[1] + k * 0.01, 10); });
C.statue("cow", 14.5, 4.6, C.faceDoor, 1.8, 0x5A7A4A, 0.7, function (g) { var wm = otmMat(0x2A3A2A, null, { ds: 1 }); [-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8), wm); w.position.set(s * 0.5, 1.5, 0); w.rotation.set(0, s * 1.2, s * 0.5); g.add(w); }); });
C.spot(11, -3.4, "⚗ Water into wine", "the sixty-first spirit, thirty-three legions", [["He appears", "as a bull with gryphon's wings"], ["He turns", "wine into water, blood into wine, and water into wine"], ["He can turn", "any metal into coin of that metal"]], { l: ["Mathers: he makes men witty, and can make fools wise."] });
},
function (C) {
var rd = otmMat(0x8A1A14, null), gd = otmMat(0xC8A040, "metal", { phong: 90 }), mb = otmMat(0x2A0A0A, "marble", { phong: 70 });
[-1, 1].forEach(function (sd) {
for (var t = 0; t < 3; t++) {
var v = sd * (3.6 + t * 1.1), y = t * 0.45;
C.box(11, 0.45 + y, 1.1, mb, 9, (0.45 + y) / 2, v);
C.box(11, 0.08, 0.6, rd, 9, 0.45 + y + 0.04, v + sd * 0.15);
}
C.solid(9, sd * 4.7, 5.5, 1.65, 0.45);
});
var ch = C.grp(16.5, 0, -6.2, C.faceDoor);
otmBox(2.2, 0.9, 1.4, gd, 0, 0.9, 0, ch);
[-0.8, 0.8].forEach(function (o) { var wh = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 6, C.lite ? 12 : 20), gd); wh.position.set(o, 0.55, 0.75); ch.add(wh); var wh2 = wh.clone(); wh2.position.z = -0.75; ch.add(wh2); });
C.round(16.5, -6.2, 1.3, 1.5);
[-0.6, 0.6].forEach(function (o) { C.flame(16.5 + o, 1.4, -6.2 - 0.9, 3, 0xFF6A1A); C.flame(16.5 + o, 1.4, -6.2 + 0.9, 3, 0xFFA040); });
odpLater(C.x(16.5), C.z(-6.2), function () { var a = odpCreature("angel", C.x(16.2), 1.35, C.z(-6.5), C.faceDoor, 1.6), b = odpCreature("angel", C.x(16.8), 1.35, C.z(-5.9), C.faceDoor, 1.6); if (a)
odpTint(a, 0xF0D890, 0.5); if (b)
odpTint(b, 0xF0D890, 0.5); return a || b; });
C.box(1.8, 0.9, 0.9, mb, 16.5, 0.45, 6.4);
C.solid(16.5, 6.4, 0.9, 0.45, 1);
for (var s = 0; s < 4; s++)
C.cyl(0.04, 0.5, otmMat(0xE8DCC0, null), 16 + s * 0.3, 0.95, 6.4, 6).rotation.z = Math.PI / 2;
C.spot(15, -4.4, "🔥 The chariot of fire", "the sixty-eighth spirit, fifty legions", [["He appears", "as two beautiful angels sitting in a chariot of fire"], ["He gives", "presentations and senatorships"], ["He causes", "favour of friends and of foes"]], { l: ["Mathers: he was created next after Lucifer."] });
},
function (C) {
var wd = otmMat(0x1A2030, "wood"), sv = otmMat(0xC8D0E0, "metal", { phong: 120 });
[-1, 1].forEach(function (sd) {
C.wall(sd, 9, 3.4, 8, 3, odpPic("vassago-keys" + sd, 1024, 384, function (x, W, H) {
x.fillStyle = "#141A28";
x.fillRect(0, 0, W, H);
for (var k = 0; k < 90; k++) {
var px = 20 + (k * 97) % (W - 40), py = 20 + ((k * 53) % (H - 60)), s = 0.6 + ((k * 7) % 5) / 6, gold = k % 3 !== 0;
x.strokeStyle = gold ? "#D8B060" : "#B8C0D0";
x.lineWidth = 3 * s;
x.beginPath();
x.arc(px, py, 8 * s, 0, Math.PI * 2);
x.moveTo(px, py + 8 * s);
x.lineTo(px, py + 34 * s);
x.lineTo(px + 8 * s, py + 34 * s);
x.moveTo(px, py + 26 * s);
x.lineTo(px + 6 * s, py + 26 * s);
x.stroke();
}
}));
});
var sg = C.grp(9, 0, -4.8, 0);
otmCyl(0.08, 1.4, sv, 0, 0.7, 0, sg, 8);
var fr = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 8, C.lite ? 16 : 28), sv);
fr.position.y = 2;
sg.add(fr);
var gl = new THREE.Mesh(new THREE.CircleGeometry(0.56, C.lite ? 16 : 28), otmMat(0x04060C, null, { phong: 200, e: 0x0A1A3A, ei: 0.6 }));
gl.position.set(0, 2, 0.01);
sg.add(gl);
C.round(9, -4.8, 0.5, 2.6);
[5, 13].forEach(function (u) {
[-1, 1].forEach(function (sd) {
var v = sd * 8.9;
C.box(2.4, 2.6, 0.6, wd, u, 1.3, v);
C.solid(u, v, 1.2, 0.3, 2.6);
for (var s = 0; s < 3; s++)
for (var k = 0; k < 4; k++)
C.box(0.22, 0.18, 0.2, otmMat([0xC8A040, 0x8A3A2A, 0x3A6A8A, 0xD8D8D0][(k + s) % 4], null), u - 0.8 + k * 0.55, 0.6 + s * 0.75, v - sd * 0.25);
});
});
for (var c = 0; c < (C.lite ? 3 : 7); c++)
C.flame(5 + c * 1.6, 1.0, 4.2, 1, 0xFFC870);
C.spot(9, -3, "🔑 The lost things found", "the third spirit, twenty-six legions", [["He is", "of a good nature"], ["He declares", "things past and to come"], ["He discovers", "all things hidden or lost"]], { l: ["Mathers: his office is as Agares's."] });
},
function (C) {
var silk = [0x8A2A4A, 0xC85A7A, 0x6A1A3A], gd = otmMat(0xC8A040, "metal", { phong: 100 }), cu = otmMat(0xB84A6A, null);
[-1, 1].forEach(function (sd) { for (var k = 0; k < (C.lite ? 3 : 6); k++)
C.wall(sd, 3.5 + k * 2.7, 4.4, 2.2, 6.4, otmMat(silk[k % 3], null, { op: 0.85, ds: 1 })); });
[[5.5, -5], [10, -5], [5.5, 5], [10, 5]].forEach(function (p) {
C.box(2.4, 0.45, 1, otmMat(0x4A1A2A, "wood"), p[0], 0.22, p[1]);
C.box(2.3, 0.18, 0.9, cu, p[0], 0.54, p[1]);
C.box(2.3, 0.5, 0.2, cu, p[0], 0.8, p[1] + (p[1] > 0 ? 0.4 : -0.4));
C.solid(p[0], p[1], 1.2, 0.5, 0.7);
C.cyl(0.18, 0.6, gd, p[0] + 1.7, 0.3, p[1], 8, 0.1);
C.flame(p[0] + 1.7, 0.62, p[1], 1.2, 0xFF90C0);
C.round(p[0] + 1.7, p[1], 0.2, 0.7);
});
C.wall(1, 16, 3.4, 1.8, 3, gd);
C.wall(1, 16, 3.4, 1.5, 2.7, otmMat(0xD8D0E0, null, { phong: 200 }));
C.statue("tiger", 14.5, -4.6, C.faceDoor, 1.4, 0xC89040, 0.55, function (g) { var wm = otmMat(0xE8D8C0, null, { ds: 1 }); [-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7), wm); w.position.set(s * 0.4, 1.1, 0); w.rotation.set(0, s * 1.2, s * 0.5); g.add(w); }); });
C.spot(8, -2.8, "🌹 The leopard with wings", "the twelfth spirit, sixty legions", [["He appears", "with a leopard's head and the wings of a gryphon"], ["Then", "in human shape, very beautiful"], ["He", "enflames men with women's love, and women with men's"]], {});
},
function (C) {
var wd = otmMat(0x4A2A14, "wood"), rd = otmMat(0x8A1A14, null, { ds: 1 }), gd = otmMat(0xD8B040, "metal", { phong: 100 });
C.box(8, 0.6, 3.4, wd, 9.5, 0.3, 6.6);
C.solid(9.5, 6.6, 4, 1.7, 0.6);
[5.6, 13.4].forEach(function (u) { var p = otmPlane(1.4, 5, rd, C.x(u), 3.1, C.z(6.6), Math.PI / 2); p.userData.noSit = 1; });
C.box(8.4, 0.5, 0.3, gd, 9.5, 5.7, 5);
C.wall(1, 9.5, 3.2, 2.6, 1.4, odpPic("ipos-masks", 512, 276, function (x, W, H) {
x.fillStyle = "#2A1A0A";
x.fillRect(0, 0, W, H);
[[150, "#E8D8A8", 1], [360, "#C8B888", -1]].forEach(function (m) {
x.fillStyle = m[1];
x.beginPath();
x.ellipse(m[0], 138, 80, 100, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#2A1A0A";
x.beginPath();
x.ellipse(m[0] - 28, 110, 14, 9, 0, 0, Math.PI * 2);
x.ellipse(m[0] + 28, 110, 14, 9, 0, 0, Math.PI * 2);
x.fill();
x.lineWidth = 8;
x.strokeStyle = "#2A1A0A";
x.beginPath();
x.arc(m[0], m[2] > 0 ? 160 : 205, 32, m[2] > 0 ? 0.15 * Math.PI : 1.15 * Math.PI, m[2] > 0 ? 0.85 * Math.PI : 1.85 * Math.PI);
x.stroke();
});
}));
[5, 8.5, 12].forEach(function (u) { C.box(1.4, 0.8, 0.8, wd, u, 0.4, -5.2); C.box(1.2, 0.03, 0.6, otmMat(0xE8DCC0, null), u, 0.81, -5.2); C.cyl(0.06, 0.1, otmMat(0x101010, null), u + 0.45, 0.86, -5.4, 8); var q = C.cyl(0.005, 0.45, otmMat(0xF0F0F0, null), u + 0.45, 1.05, -5.4, 4, 0.04); q.rotation.z = 0.3; C.solid(u, -5.2, 0.7, 0.4, 0.9); });
C.statue("lion", 14.5, -4.6, C.faceDoor, 1.6, 0xD8B040, 0.8, function (g) { var wm = otmMat(0xF0E8D8, null, { ds: 1 }); [-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9), wm); w.position.set(s * 0.45, 1.3, 0); w.rotation.set(0, s * 1.2, s * 0.5); g.add(w); }); });
C.spot(8, -3.2, "🎭 The wit and the boldness", "the twenty-second spirit, thirty-six legions", [["He appears", "as an angel with a lion's head, the feet of a goose and a hare's tail"], ["He knows", "all things past, present and to come"], ["He makes", "men witty and bold"]], {});
},
function (C) {
var wd = otmMat(0x2A2018, "wood"), bz = otmMat(0xA8884A, "metal", { phong: 80 });
C.wall(1, 9, 3.6, 4.2, 3, odpPic("gaap-map", 512, 366, function (x, W, H) {
x.fillStyle = "#D0B888";
x.fillRect(0, 0, W, H);
var cx = W / 2, cy = H / 2 + 8, r = 150;
x.strokeStyle = "#4A2A14";
x.lineWidth = 5;
x.beginPath();
x.arc(cx, cy, r, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.moveTo(cx - r, cy);
x.lineTo(cx + r, cy);
x.moveTo(cx, cy);
x.lineTo(cx, cy + r);
x.stroke();
x.fillStyle = "#4A2A14";
x.font = "italic 24px Georgia";
x.textAlign = "center";
x.fillText("ASIA", cx, cy - 60);
x.fillText("EUROPA", cx - 70, cy + 70);
x.fillText("AFRICA", cx + 70, cy + 70);
x.font = "16px Georgia";
x.fillText("the world as the mediaeval maps drew it", cx, 28);
}));
var gb = C.grp(9, 0, 4.8, 0);
otmCyl(0.08, 1.1, bz, 0, 0.55, 0, gb, 8);
otmCyl(0.45, 0.08, bz, 0, 0.04, 0, gb, 12);
otmSph(0.55, otmMat(0x3A5A7A, null), 0, 1.6, 0, gb, C.lite ? 12 : 18);
var mer = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 6, 24), bz);
mer.position.y = 1.6;
gb.add(mer);
C.round(9, 4.8, 0.6, 2.2);
var nk = C.lite ? 2 : 4;
for (var k = 0; k < nk; k++) {
(function (k) {
var u = 5 + k * (9 / (nk - 1 || 1));
C.box(1, 0.4, 1, otmMat(0x1A1A20, "marble"), u, 0.2, -5);
C.solid(u, -5, 0.5, 0.5, 0.4);
odpLater(C.x(u), C.z(-5), function () { return odpFig("a king of the quarters", "crown beard robe:" + ["red", "gold", "blue", "green"][k], C.x(u), 0.4, C.z(-5), 0, 1.05); });
})(k);
}
[12, 14].forEach(function (u) { C.box(0.7, 1.1, 0.5, wd, u, 0.55, 4.6); C.box(0.8, 0.06, 0.6, otmMat(0xE8DCC0, null), u, 1.14, 4.6); C.solid(u, 4.6, 0.4, 0.3, 1.2); });
C.spot(9, -3.2, "👑 The four kings", "the thirty-third spirit, sixty-six legions", [["He appears", "when the sun is in the southern signs, in human shape, going before four great and mighty kings"], ["He teaches", "philosophy and the liberal sciences"], ["He can carry", "men swiftly from one kingdom to another"]], { l: ["Mathers names him among the kings of the four quarters: Gaap of the south."] });
},
function (C) {
var wd = otmMat(0x1A1420, "wood"), br = otmMat(0xB89A5A, "metal", { phong: 90 });
var sky = new THREE.Mesh(new THREE.PlaneGeometry(C.R.w - 0.8, C.R.d - 0.8), odpPic("stolas-sky", 1024, 820, function (x, W, H) {
x.fillStyle = "#04040E";
x.fillRect(0, 0, W, H);
for (var k = 0; k < 420; k++) {
var px = (k * 911) % W, py = (k * 577) % H, s = (k % 9 === 0) ? 2.4 : (k % 3 === 0 ? 1.4 : 0.8);
x.fillStyle = k % 7 === 0 ? "#C8D8FF" : "#FFFFFF";
x.beginPath();
x.arc(px, py, s, 0, Math.PI * 2);
x.fill();
}
x.strokeStyle = "rgba(200,210,255,.35)";
x.lineWidth = 1.5;
x.beginPath();
[[200, 200], [260, 240], [330, 230], [390, 270], [420, 330], [480, 300], [530, 340]].forEach(function (p, i) { if (i)
x.lineTo(p[0], p[1]);
else
x.moveTo(p[0], p[1]); });
x.stroke();
}));
sky.material.emissive = new THREE.Color(0xFFFFFF);
sky.material.emissiveMap = sky.material.map;
sky.material.emissiveIntensity = 0.6;
sky.rotation.x = Math.PI / 2;
sky.position.set(C.R.cx, 8.95, C.dz);
sky.userData.noSit = 1;
otmP().add(sky);
var ts = C.grp(9, 0, -4.8, C.faceDoor);
[0, 2.1, 4.2].forEach(function (a) { var l = otmCyl(0.03, 1.5, wd, Math.cos(a) * 0.3, 0.72, Math.sin(a) * 0.3, ts, 6); l.rotation.set(Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2); });
var tb = otmCyl(0.09, 1.6, br, 0, 1.6, 0, ts, 10, 0.13);
tb.rotation.x = 1.0;
C.round(9, -4.8, 0.5, 2);
[-1].forEach(function (sd) { for (var s = 0; s < 3; s++) {
C.box(8, 0.06, 0.5, wd, 9, 0.8 + s * 0.8, sd * 9.1);
for (var k = 0; k < (C.lite ? 5 : 10); k++) {
C.cyl(0.1, 0.22, otmMat(0x6A3A2A, null), 5.4 + k * 0.8, 0.94 + s * 0.8, sd * 9.1, 8, 0.08);
C.sph(0.12, otmMat([0x3A6A2A, 0x5A7A3A, 0x2A4A1A][(k + s) % 3], "foliage"), 5.4 + k * 0.8, 1.12 + s * 0.8, sd * 9.1, 6);
}
} C.solid(9, sd * 9.1, 4, 0.3, 2.6); });
for (var h = 0; h < (C.lite ? 4 : 9); h++)
C.cyl(0.01, 0.5, otmMat(0x5A6A2A, "foliage"), 4 + h * 1.5, 7.2, -7.6, 5, 0.14);
var gem = [0xE8203A, 0x20A0E8, 0x20E870, 0xE8E020, 0xB040E8, 0xF0F0F8];
C.box(2.4, 1, 0.9, wd, 13.5, 0.5, 4.8);
C.solid(13.5, 4.8, 1.2, 0.45, 1.4);
C.box(2.3, 0.5, 0.8, odpGlass(0xC8D8E8), 13.5, 1.25, 4.8);
for (var g = 0; g < 6; g++) {
var m = new THREE.Mesh(new THREE.OctahedronGeometry(0.09), otmMat(gem[g], null, { phong: 200, e: gem[g], ei: 0.5 }));
m.position.set(C.x(12.6 + g * 0.36), 1.12, C.z(4.8));
otmP().add(m);
}
C.statue("owl", 14.5, -4.6, C.faceDoor, 1.1, 0x2A2A3A, 0.6);
C.spot(9, -3.2, "🌌 Stars, herbs and stones", "the thirty-sixth spirit, twenty-six legions", [["He appears", "as a mighty raven"], ["He teaches", "the art of astronomy"], ["And", "the virtues of herbs and precious stones"]], {});
},
function (C) {
var wd = otmMat(0x6A4A2A, "wood"), hay = otmMat(0xC8A850, null), br = otmMat(0xA8884A, "metal", { phong: 80 });
for (var k = 0; k < 4; k++) {
var u = 5 + k * 3;
C.box(0.15, 1.6, 2.4, wd, u, 0.8, 7.6);
C.solid(u, 7.6, 0.08, 1.2, 1.6);
C.box(2.6, 0.4, 1.4, hay, u + 1.5, 0.2, 8.4);
}
C.box(12, 0.15, 0.15, wd, 9.5, 1.6, 6.4);
C.statue("nightmare", 9, -4.8, 0, 2.2, 0x7A4A2A, 0.85);
C.box(1.6, 0.9, 0.8, wd, 13.5, 0.45, -4.8);
C.solid(13.5, -4.8, 0.8, 0.4, 1);
var sc = C.grp(13.5, 0.9, -4.8, 0);
otmCyl(0.03, 0.9, br, 0, 0.45, 0, sc, 6);
otmBox(0.9, 0.03, 0.03, br, 0, 0.9, 0, sc);
[-0.42, 0.42].forEach(function (o) { otmCyl(0.15, 0.03, br, o, 0.62, 0, sc, 10); });
C.box(0.7, 1.1, 0.5, wd, 5, 0.55, -4.8);
var bk = C.box(0.8, 0.05, 0.55, otmMat(0xE8DCC0, null), 5, 1.13, -4.8);
bk.rotation.z = 0.12;
C.solid(5, -4.8, 0.4, 0.3, 1.2);
C.spot(9, -3, "⚖ He never deceives", "the fifty-fifth spirit, twenty legions", [["He appears", "as a horse, then as a man"], ["He gives", "true answers of things past, present and to come"], ["He is", "faithful, and will not let the magician be tempted by any spirit"]], { l: ["Mathers: he never deceives. His hall is plain timber and hay, and nothing in it is a trick."] });
},
function (C) {
var wd = otmMat(0x5A3A22, "wood"), lt = otmMat(0x6A4A2A, null);
var sky = new THREE.Mesh(new THREE.PlaneGeometry(C.R.w - 0.8, C.R.d - 0.8), odpPic("seere-sky", 1024, 820, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#4A8AC8");
g.addColorStop(1, "#A8D0F0");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var k = 0; k < 14; k++) {
var cx = (k * 317) % W, cy = (k * 211) % H;
x.fillStyle = "rgba(255,255,255,.75)";
for (var b = 0; b < 5; b++) {
x.beginPath();
x.arc(cx + b * 28, cy + (b % 2) * 10, 30 + (b % 3) * 8, 0, Math.PI * 2);
x.fill();
}
}
}));
sky.material = new THREE.MeshBasicMaterial({ map: sky.material.map });
sky.rotation.x = Math.PI / 2;
sky.position.set(C.R.cx, 8.95, C.dz);
sky.userData.noSit = 1;
otmP().add(sky);
var cr = new THREE.Mesh(new THREE.CircleGeometry(1.6, C.lite ? 16 : 32), odpPic("seere-rose", 512, 512, function (x, W, H) {
x.fillStyle = "#E8E0D0";
x.beginPath();
x.arc(256, 256, 250, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#2A4A7A";
for (var k = 0; k < 8; k++) {
var a = k * Math.PI / 4, l = k % 2 ? 150 : 235;
x.beginPath();
x.moveTo(256, 256);
x.lineTo(256 + Math.cos(a - 0.12) * 60, 256 + Math.sin(a - 0.12) * 60);
x.lineTo(256 + Math.cos(a) * l, 256 + Math.sin(a) * l);
x.lineTo(256 + Math.cos(a + 0.12) * 60, 256 + Math.sin(a + 0.12) * 60);
x.fill();
}
}));
cr.rotation.x = -Math.PI / 2;
cr.position.set(C.x(9), 0.02, C.z(-4.8));
otmP().add(cr);
[[5, 5.4], [6.4, 5.8], [5.6, 6.8]].forEach(function (p, i) { C.box(1, 0.6, 0.7, i === 2 ? lt : wd, p[0], 0.3, p[1]); C.round(p[0], p[1], 0.6, 0.6); });
C.statue("pegasus", 13.5, 4.6, C.faceDoor, 2.2, 0xF4F4F8, 0.8);
var bc = [0xE8E8F0, 0x9AB4D0, 0x4A8AC8];
for (var k = 0; k < (C.lite ? 4 : 8); k++) {
var p = otmPlane(0.6, 3.2, otmMat(bc[k % 3], null, { ds: 1 }), C.x(4 + k * 1.6), 6.8, C.z(k % 2 ? 7.8 : -7.8), Math.PI / 2);
p.userData.noSit = 1;
}
C.spot(9, -3, "🪽 The winged horse", "the seventieth spirit, twenty-six legions", [["He appears", "as a beautiful man upon a winged horse"], ["He can", "pass over the whole earth in the twinkling of an eye"], ["He tells", "truly of theft, and of treasure hidden"]], { l: ["Mathers: he is of an indifferent good nature, and is willing to do anything the magician desires."] });
},
function (G) {
ODP.G = G;
ODP.lite = otmLite();
ODP.hwShades = null;
ODP.figs = [];
ODP.fx = [];
ODP.souls = null;
ODP.ride = null;
ODP.castle = null;
ODP.leaves = null;
ODP.angel = null;
ODP.cerb = null;
ODP.mino = null;
ODP.flyers = null;
ODP.flows = null;
ODP.vault = null;
ODP.stars = null;
ODP.wheel = null;
ODP.answer = null;
ODP.nessus = null;
ODP.storms = null;
ODP.antaeus = null;
ODP.banner = null;
ODP.wings = null;
ODP.lovers = null;
ODP.geryon = null;
ODP.treeGeo = null;
var K = ODP.K = odpCtx();
K.F = G;
OTK = K;
var PG = new THREE.Group();
PG.name = "odp-pit";
G.add(PG);
[odpStair, odpHallOfKey, odpPit, odpCourt].forEach(function (f) { K.F = f === odpPit ? PG : G; try {
f();
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, build", f.name, e);
} });
K.F = G;
try {
if (typeof gwBake === "function")
gwBake(PG);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, pit bake", e);
}
PG.traverse(function (o) { o.userData.noSit = 1; });
PG.userData.keep = 1;
try {
if (typeof gwBake === "function")
gwBake(G);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, bake", e);
}
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
ODP.virgil = { g: null };
ODP.vspot = otmSpot(0, 0, 1.8, "🗣️ Virgil", "talk", function () { odpVirgilTalk(); });
ODP.built = true;
},
function () { ODP.hwShades = null; ODP.K = null; ODP.G = null; ODP.cerb = null; ODP.mino = null; ODP.flyers = null; ODP.flows = null; ODP.vault = null; ODP.stars = null; ODP.built = false; ODP.figs = []; ODP.fx = []; ODP.souls = null; ODP.virgil = null; ODP.vspot = null; ODP.banner = null; ODP.wings = null; ODP.lovers = null; ODP.geryon = null; ODP.treeGeo = null; },
function () {
var L = worldLocal(), zn = odpZone(L.x, L.z), K = ODP.K;
if (zn === "court") {
var r = K && otmRoomAt(K, L.x, L.z, L.y - 1.72);
return "The Infernal Court" + (r ? " · " + r.name : "");
}
if (zn === "hall")
return "The Hall of the Key";
if (zn === "stair")
return L.z < -403 ? "The Gate of Hell" : L.z < -199 && L.z > -205 ? "The Highway Down · the lay-by" : "The Highway Down";
var P = odpPolar(L.x, L.z), i = odpRingOf(P.r), W = odpWaterAt(P.r);
if (W)
return W.n;
if (i === 7)
return P.r > 66 ? "the Seventh Circle: the river of blood" : P.r > 55 ? "the Seventh Circle: the wood of the suicides" : "the Seventh Circle: the burning sand";
return i >= 0 ? ODP_RING[i].n : "";
},
function (k, said) {
var L = ODP_LESSONS.filter(function (x) { return x.k === k; })[0];
if (!L)
return;
var p = otmProg();
p.deep = p.deep || {};
p.deep.les = p.deep.les || {};
p.deep.quiz = p.deep.quiz || {};
p.deep.les[k] = p.deep.les[k] || Date.now();
otmProgSave();
var ring = -1;
ODP_RING.forEach(function (R, i) { if (R.les === k)
ring = i; });
var fns = {}, b = "";
if (said)
b += "<div style='margin:8px 0;padding:6px 8px;border-radius:4px;background:" + (said.ok ? "rgba(80,160,90,.18)" : "rgba(200,90,60,.18)") + "'>" + said.text + "</div>";
b += "<div style='margin-top:8px;font-weight:600'>❓ " + otmEsc(L.q) + "</div>";
L.a.forEach(function (ans, i) {
b += worldBtn("a" + i, otmEsc(ans), "");
fns["a" + i] = function () {
var ok = i === L.r;
if (ok) {
p.deep.quiz[k] = Date.now();
otmProgSave();
}
odpLesson(k, { ok: ok, text: ok ? "✅ <b>Right.</b> " + (Object.keys(p.deep.quiz).length) + " of " + ODP_LESSONS.length + " of Virgil's questions answered." : "Not quite. Read it again: the answer is in the tablet." });
};
});
b += worldBtn("v", "🗣️ Ask Virgil about it", "he walks with you, and knows the poem by heart");
fns.v = function () { worldCard(null); otmTalk("deep:virgil", "beside your tablet, " + L.t + ", " + L.c + ", in the rings below the Temple of the Obsidian Moon"); };
if (ring >= 0 && ring < 9 && (p.deep.quiz[k] || otmKeeper())) {
b += worldBtn("next", "Go on, with Virgil, to " + ODP_RING[ring + 1].n, "the way down is open to you");
fns.next = function () { odpGoRing(ring + 1); };
}
if (ring >= 0) {
var TK = ODP_TASKS.filter(function (x) { return x.r === ring; })[0];
if (TK) {
b += worldBtn("task", (odpTaskDone(TK.k) ? "✅ " : "📖 ") + TK.t, TK.d);
fns.task = function () { odpJournal(); };
}
}
if (k !== "key") {
b += worldBtn("up", "Back to the foot of the Highway Down", "");
fns.up = function () { worldCard(null); odpArrive(ODP_AT.foot); };
}
worldCard(worldFacts("📜 " + L.t, L.c + (k === "key" ? "" : " of Dante's Inferno"), [], L.b) + b, fns);
},
function (dt) {
var V = ODP.virgil;
if (!V)
return;
var L = worldLocal(), feet = L.y - 1.72;
if (!V.g) {
V.g = odpFig("Virgil", "laurel robe:grey", L.x + 1, feet, L.z + 2, 0, 1);
if (!V.g)
V.g = { position: new THREE.Vector3(L.x + 1, feet, L.z + 2), rotation: { y: 0 }, dummy: 1 };
}
var g = V.g, Y = typeof yaw !== "undefined" ? yaw : 0, fx = -Math.sin(Y), fz = -Math.cos(Y), rx = Math.cos(Y), rz = -Math.sin(Y);
var tx = L.x - fx * 2.6 + rx * 1.1, tz = L.z - fz * 2.6 + rz * 1.1, d = Math.hypot(g.position.x - L.x, g.position.z - L.z);
if (d > 18 || Math.abs(g.position.y - feet) > 8) {
g.position.set(tx, odpGround(tx, tz, feet), tz);
}
else if (d > 3.0) {
var k = Math.min(1, dt * 1.6), nx = g.position.x + (tx - g.position.x) * k, nz = g.position.z + (tz - g.position.z) * k;
if (!odpBlock(nx, nz, g.position.y) || d > 8) {
g.position.x = nx;
g.position.z = nz;
}
var gy = odpGround(g.position.x, g.position.z, g.position.y);
g.position.y += (gy - g.position.y) * Math.min(1, dt * 6);
if (g.rotation)
g.rotation.y = Math.atan2(L.x - g.position.x, L.z - g.position.z);
}
if (ODP.vspot) {
ODP.vspot.x = g.position.x;
ODP.vspot.z = g.position.z;
ODP.vspot.y = g.position.y;
}
},
function () {
var k = otmKeeper(), p = otmProg(), D = p.deep || {}, rs = D.rings || {}, nq = Object.keys(D.quiz || {}).length, b = "", fns = {};
var rows = [["Where you are", odpZoneName() || "below"], ["Virgil's questions", nq + " of " + ODP_LESSONS.length + " answered"], ["Who walks with you", "Virgil, as he walked with Dante: turn and walk back to him to talk"]];
[["top", "The head of the Highway Down", ""], ["key", "The Hall of the Key", "halfway down, off the lay-by: the Lesser Key of Solomon"], ["foot", "The Gate of Hell", "the foot of the road"]].forEach(function (r) { b += worldBtn("g_" + r[0], r[1], r[2]); fns["g_" + r[0]] = function () { worldCard(null); odpArrive(ODP_AT[r[0]]); }; });
ODP_RING.forEach(function (R, i) { if (!(k || rs[i]))
return; b += worldBtn("r" + i, R.n, ""); fns["r" + i] = function () { odpGoRing(i); }; });
if (k || D.out) {
b += worldBtn("stars", "🌟 The shore under the stars", "where the hidden road comes out: the stars come back");
fns.stars = function () { worldCard(null); odpStarsBuild(); odpStarsArrive(); };
}
if (k || rs[6]) {
b += worldBtn("court", "The Infernal Court", "the palaces of the kings and princes");
fns.court = function () { odpCourtGo(); };
}
var nt = Object.keys(D.tasks || {}).length;
b += worldBtn("journal", "📖 The Pilgrim's Journal", nt + " of " + ODP_TASKS.length + " done: a thing to do in every ring");
fns.journal = function () { odpJournal(); };
b += worldBtn("up", "Back up to the temple", "the cold room behind the wine cellar");
fns.up = function () { odpUp(); };
worldCard(worldFacts("🔥 Below the glamour", "the rings of Dante's Inferno and the court of the Goetia", rows, ["The rings you have reached are listed here; the way down is always on foot, by boat or on a beast's back, as Dante went."]) + b, fns);
},
function (opt) {
OTK = ODP.K;
odpArrive(ODP_AT[ODP.wantAt] || ODP_AT.top);
ODP.wantAt = null;
ODP.ring = -1;
ODP.chk = 0;
otmSay("🔥 <b>The Highway Down.</b> A great road cut through black rock, falling away into the dark, its lamps burning slow and steady down both sides, the dead walking it in silence. The smell of burning comes up from a very long way down. Virgil is here, a pace behind you. He says nothing yet.");
},
function (dt) {
var K = ODP.K;
if (!K)
return;
OTK = K;
if (K.floors && K.rooms)
otmHoldVertical(K, ODP.vh = ODP.vh || {});
ODP.t += dt;
var t = ODP.t, lite = ODP.lite;
ODP.chk = (ODP.chk || 0) + dt;
if (ODP.chk > 3) {
ODP.chk = 0;
if (!otmDeepOk()) {
odpUp();
setTimeout(function () { otmSay("🕯️ The way below is shut for now."); }, 800);
return;
}
}
var L0z = worldLocal().z;
try {
otmFlamesTick(dt, t, K.flames);
otmSpellTick(t);
odpFigsTick();
odpDriftTick(dt, t);
odpVirgilTick(dt);
if (typeof odpStarsTick === "function")
odpStarsTick(dt);
if (ODP.hwShades && L0z > -420)
odpHwShadesTick(dt);
if (typeof otmRoadTick === "function") {
var L0 = worldLocal();
otmRoadTick(dt, odpZone(L0.x, L0.z) === "stair" && L0.z > -403 ? "highway" : null);
}
ODP.sf = (ODP.sf || 0) + 1;
if (!lite || ODP.sf % 2 === 0)
odpSoulsTick(t, false);
if (ODP.banner) {
var f = odpBannerF(t), P = odpAt(250, f);
ODP.banner.position.set(P.x, -120, P.z);
ODP.banner.rotation.y = odpRy(0, 0, Math.sin(f), -Math.cos(f)) + Math.PI / 2;
var fl = ODP.banner.userData.flag;
if (fl)
fl.rotation.y = 0.25 * Math.sin(t * 1.3);
}
if (ODP.lovers && ODP.lovers.position) {
ODP.lovers.position.y = -132 + 2.6 + 0.6 * Math.sin(t * 0.5);
ODP.lovers.rotation.y = t * 0.12;
}
(ODP.wings || []).forEach(function (W) { W.g.rotation.y = W.sd * (0.18 + 0.16 * Math.sin(t * 0.9 + W.k * 0.5)); });
if (ODP.geryon && ODP.geryon.position && !(ODP.ride && ODP.ride.g === ODP.geryon))
ODP.geryon.position.y = -163.5 + 0.4 * Math.sin(t * 0.6);
if (typeof odpLifeTick === "function")
odpLifeTick(dt, t);
}
catch (e) {
if (!ODP.e1) {
ODP.e1 = 1;
if (window.console)
console.warn("[obsidian-temple] below, tick", e);
}
}
var L = worldLocal(), feet = L.y - 1.72;
if (odpZone(L.x, L.z) === "pit") {
var ri = odpRingOf(odpPolar(L.x, L.z).r);
if (ri >= 0 && ri !== ODP.ring) {
ODP.ring = ri;
var p = otmProg();
p.deep = p.deep || {};
p.deep.rings = p.deep.rings || {};
if (!p.deep.rings[ri]) {
p.deep.rings[ri] = Date.now();
otmProgSave();
otmSay("🔥 <b>" + otmEsc(ODP_RING[ri].n.replace(/^the /, "The ")) + ".</b> Virgil's tablet stands where you came in.");
}
}
}
else if (ODP.ring !== -1 && odpZone(L.x, L.z) !== "pit")
ODP.ring = -1;
worldBanner("<b>🔥 Below</b> · " + otmEsc(odpZoneName()));
ODP.pt += dt;
if (ODP.pt < 0.15)
return;
ODP.pt = 0;
if (ODP.ride) {
if (ODP.myFn && WLD.promptFn === ODP.myFn) {
worldPrompt(null);
ODP.myFn = null;
}
return;
}
if (WLD.card && WLD.card.style.display === "block") {
if (ODP.myFn && WLD.promptFn === ODP.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
K.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1 || Math.abs(feet - s.y) > 2.4)
return;
if (s.when && !s.when())
return;
var d = Math.hypot(L.x - s.x, L.z - s.z);
if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
}
});
if (best) {
var fn = best.fn;
ODP.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + otmEsc(best.verb), fn);
}
else if (ODP.myFn && WLD.promptFn === ODP.myFn) {
worldPrompt(null);
ODP.myFn = null;
}
},
function () {
OTM.spSpots = {};
OTM.spFig = null;
OTM.spCrowd = null;
OTM.spShown = "";
OTM.spDarkOn = null;
OTM.spNowName = "";
if (!otmSamhainOn())
return;
var lite = OTM.lite;
var bd = otmCanvasMat("spboard", 512, 640, function (c, W, H) {
c.fillStyle = "#0E0806";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#B88A3A";
c.lineWidth = 6;
c.strokeRect(10, 10, W - 20, H - 20);
c.fillStyle = "#E87A1A";
c.font = "bold 54px serif";
c.textAlign = "center";
c.fillText("SAMHAIN", W / 2, 76);
c.fillStyle = "#C8B8A0";
c.font = "italic 22px serif";
c.fillText("the programme of the night and the day", W / 2, 108);
c.textAlign = "left";
c.font = "17px serif";
OTM_SP_PROG.forEach(function (r, i) {
var y = 144 + i * 28, ms = otmSpStartMs(otmSpCfg()) + r[1] * 60000, t = otmSpClock(ms).split(", ")[1];
c.fillStyle = i % 2 ? "#D8C890" : "#F0D8A8";
c.fillText(t, 30, y);
c.fillText(r[4], 136, y);
});
c.textAlign = "center";
c.fillStyle = "#8A7A6A";
c.font = "16px serif";
c.fillText(OTM_SP_TZ + " · press E for the whole programme", W / 2, H - 22);
}, { basic: true });
var eg = otmGroup(4.6, 0, 12.4, -0.35);
otmPlane(1.5, 1.88, bd, 0, 1.55, 0.03, 0, eg);
otmBox(1.62, 2.0, 0.05, otmMat(0x2A1A0E, "wood"), 0, 1.55, 0, eg);
[-0.6, 0.6].forEach(function (lx) { otmBox(0.06, 1.4, 0.06, otmMat(0x2A1A0E, "wood"), lx, 0.7, 0.1, eg); });
otmSolid(4.6, 12.4, 0.85, 0.35, 0, 2.6, -0.35);
otmSpot(4.4, 13.6, 1.8, "🎃 The Samhain programme", "read it", function () { otmSpBoard(); });
Object.keys(OTM_SP_SPOT).forEach(function (k) {
if (k === "altar")
return;
var S = OTM_SP_SPOT[k], y = S.woods ? otmWoodsY(S.x, S.z) : 0;
OTM.spSpots[k] = otmSpot(S.x, S.z, S.r, "🎃 Samhain", "take part", function () { otmSpCard(); }, { y: y, when: function () { var N = otmSpNow(); return !!(N.item && otmSpPlace(N.item) === k); } });
});
otmSpot(0, -14, 3.2, "🏮 The procession to the new fire", "walk out with it to the stone circle", function () { worldCard(null); otmArrive(OTM_AT.woods); otmSpTell("🏮 You walk out with the coven by the passage and the lantern path, into the dark woods. The fire waits in the stone circle ahead."); }, { when: function () { var N = otmSpNow(); return !!(N.item && N.item[0] === "procession"); } });
var tz = -53.4;
otmBox(9, 0.08, 1.5, otmMat(0x0A0808, null), 0, 0.82, tz);
otmBox(9.2, 0.04, 1.7, otmMat(0x1A0A12, null), 0, 0.87, tz);
[-4.2, 4.2].forEach(function (lx) { [-0.6, 0.6].forEach(function (lz) { otmBox(0.1, 0.8, 0.1, otmMat(0x0A0808, null), lx, 0.4, tz + lz); }); });
otmSolid(0, tz, 4.7, 0.9, 0, 1.2);
for (var s = 0; s < (lite ? 6 : 12); s++) {
var sx = -3.8 + (s % 6) * 1.52, sz = tz + (s < 6 ? -1.15 : 1.15);
otmBox(0.5, 0.06, 0.5, otmMat(0x1A1010, null), sx, 0.5, sz);
otmBox(0.5, 0.6, 0.06, otmMat(0x1A1010, null), sx, 0.8, sz + (s < 6 ? -0.25 : 0.25));
otmCyl(0.16, 0.02, otmMat(0xE8E0D8, null), sx, 0.9, tz + (s < 6 ? -0.45 : 0.45), null, 14);
}
otmBox(0.5, 0.06, 0.5, otmMat(0x2A1A1A, null), -5.2, 0.5, tz);
otmBox(0.06, 0.8, 0.5, otmMat(0x2A1A1A, null), -5.45, 0.9, tz).rotation.y = 0.6;
otmCyl(0.18, 0.02, otmMat(0x0A0A0A, null), -4.1, 0.9, tz, null, 14);
for (var c = 0; c < (lite ? 4 : 8); c++)
otmCandle(-3.6 + c * (lite ? 2.4 : 1.03), 0.88, tz, 1, null, c % 2 ? 0x0A0A0A : 0xE87A1A);
for (var l = 0; l < (lite ? 10 : 22); l++) {
var t = (l + 0.5) / (lite ? 10 : 22), px = -48.2 + 48.2 * t + Math.sin(t * 5) * 4, pz = -70 - 70 * t, side = l % 2 ? 1.7 : -1.7;
if (Math.hypot(px, pz + 137) < 10)
continue;
otmSamhainLantern(px + side, otmWoodsY(px + side, pz), pz, l % 3 === 0);
}
},
function (seed, look) {
var g = null;
if (typeof wPerson === "function")
try {
g = wPerson("otmsp_" + seed, { look: look });
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
otmCyl(0.25, 1.5, otmMat(look.top, null), 0, 0.75, 0, g, 12, 0.45);
otmSph(0.2, otmMat(0xC8A890, null), 0, 1.68, 0, g, 12);
}
var L = g.userData && g.userData.limbs;
if (L)
try {
if (typeof togPoseReset === "function")
togPoseReset(g);
else {
["la", "ra", "ll", "rl"].forEach(function (k) { if (L[k])
L[k].rotation.set(0, 0, 0); });
}
if (look.arms && L.la && L.ra) {
L.la.rotation.x = -look.arms;
L.ra.rotation.x = -look.arms;
}
}
catch (e) { }
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function () {
var N = otmSpNow(), r = N.item, key = r ? r[0] + "|" + r[6] : "";
if (key === OTM.spShown || !OTM.G)
return;
OTM.spShown = key;
if (OTM.spFig) {
OTM.G.remove(OTM.spFig);
OTM.spFig = null;
}
(OTM.spCrowd || []).forEach(function (g) { g.visible = false; });
if (!r)
return;
var S = OTM_SP_SPOT[r[5]], base = S.woods ? otmWoodsY(S.fx, S.fz) : 0;
var f = otmSpPerson(r[6], Object.assign({ arms: r[6] === "priestess" ? 1.1 : 0.4 }, OTM_SP_ROBE[r[6]]));
f.position.set(S.fx, base, S.fz);
f.rotation.y = Math.atan2(S.x - S.fx, S.z - S.fz);
f.userData.keep = 1;
if (r[6] === "priestess") {
var cr = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.014, 6, 14, Math.PI * 1.3), otmGlowM(0xE0E4F0));
cr.position.set(0, 1.86, 0.1);
cr.rotation.z = -0.6;
f.add(cr);
}
else {
var st = otmCyl(0.025, 1.7, otmMat(r[6] === "firekeeper" ? 0x2A2A2A : 0x8A6A4A, null), 0.32, 0.85, 0.1, f, 6);
st.rotation.z = 0.06;
}
OTM.G.add(f);
OTM.spFig = f;
if (!OTM.spCrowd) {
OTM.spCrowd = [];
var n = OTM.lite ? 4 : 9;
for (var i = 0; i < n; i++) {
var lk = { top: [0x0E0A12, 0x1A0E22, 0x120A0A, 0x0A0A10][i % 4], bottom: 0x0A0A0E, topKind: "robe", sex: i % 2 ? "m" : "f", arms: 0.25 };
var g = otmSpPerson("coven" + i, lk);
g.userData.keep = 1;
OTM.G.add(g);
OTM.spCrowd.push(g);
}
}
var dx = S.x - S.fx, dz = S.z - S.fz, d = Math.hypot(dx, dz) || 1, ux = dx / d, uz = dz / d;
OTM.spCrowd.forEach(function (g, i) {
var n = OTM.spCrowd.length, a = (i / (n - 1 || 1) - 0.5) * 2.2, rad = 3.2 + (i % 2) * 0.9;
var x = S.fx + ux * rad * Math.cos(a) - uz * rad * Math.sin(a), z = S.fz + uz * rad * Math.cos(a) + ux * rad * Math.sin(a);
if (Math.hypot(x - S.x, z - S.z) < 1.4) {
x += uz * 1.5;
z -= ux * 1.5;
}
if (S.woods) {
var fd = Math.hypot(x, z + 136.6);
if (fd < 2.6) {
x = x / (fd || 1) * 2.6;
z = -136.6 + (z + 136.6) / (fd || 1) * 2.6;
}
}
g.position.set(x, S.woods ? otmWoodsY(x, z) : 0, z);
g.rotation.y = Math.atan2(S.fx - x, S.fz - z);
g.visible = true;
});
},
function () {
var N = otmSpNow(), dark = !!(N.item && (N.item[0] === "toll" || N.item[0] === "circle"));
if (dark === !!OTM.spDarkOn || !OTM.K || !OTM.G)
return;
OTM.spDarkOn = dark;
var v = new THREE.Vector3(), G = OTM.G.position;
OTM.K.flames.forEach(function (F) { F.g.getWorldPosition(v); var x = v.x - G.x, z = v.z - G.z; if (x > -14 && x < 14 && z > -36 && z < 4 && v.y - G.y < 12 && v.y - G.y > -1)
F.g.visible = !dark; });
},
function () { otmSpBell(12); return "The great bell tolls twelve, slow, and one by one the coven pinches out the candles, until the whole hall is dark but for the moon in the windows. The old year is dead. In the old Irish reckoning a day began at sunset, so the feast of Samhain began on the eve of the first of November, and with it the dark half of the year."; },
function () { var p = otmProg(); p.spFlame = Date.now(); otmProgSave(); return "You hold your candle to the new fire and it catches. Geoffrey Keating's history of Ireland, Foras Feasa ar Éirinn (about 1634), says the fire of Tlachtga, the Hill of Ward in County Meath, was lit at Samhain, and that no other fire in Ireland was to be kindled that night but from it." + (p.spCandle ? " Your beeswax candle, carried unlit since midnight, burns at last." : ""); },
function () {
var R = [["burn quietly side by side", "a long and steady love"], ["crackle, and one jumps off the fire", "a parting"], ["flare up together and burn out fast", "a bright love that will not last"], ["smoulder, and one rolls into the other", "the one you name will come to you"]][Math.floor(Math.random() * 4)];
return "You name two nuts and set them on the grate. They " + R[0] + ": " + R[1] + ", say the old folk. Robert Burns tells this very game in his poem Halloween (1785): \"Some kindle couthie side by side, And burn thegither trimly\".";
},
function () { var ok = Math.random() < 0.4; return ok ? "Hands behind your back, you catch the swinging apple in your teeth at the third try! Daniel Maclise painted this game, Snap-Apple Night, at a Halloween party in Blarney, County Cork, in 1833." : "The apple swings away from your teeth, and away again, and bumps your nose. Everyone laughs. Try again: in the old game the apple hung from a stick with a lit candle at its other end, so a miss could cost you some hair."; },
function () { var L = otmSpNames(); return L.length ? "The High Priestess reads every name laid on the altar since midnight, slowly, and the coven answers each one: \"We remember.\"<br><br><i>" + L.map(otmEsc).join(" · ") + "</i>" : "The High Priestess reads the names of the coven's dead, and asks everyone to say the names of their own, aloud or silently. The coven answers each one: \"We remember.\""; },
function () {
var T = [["the ring", "you will be married within the year"], ["a pea", "no wedding for you this year"], ["a stick", "a year of quarrels (or a stick to settle them with)"], ["a scrap of cloth", "a lean year, money will be short"], ["a little coin", "a year of good fortune and money"]][Math.floor(Math.random() * 5)];
return "You cut a slice of the dark, spiced brack, and bite on something: " + T[0] + ". The old Irish Halloween barmbrack had these baked in: " + T[0] + " means " + T[1] + ". (A slice with nothing in it means only that it was a good slice.)";
},
function () { var M = ["a straw mask, as the Irish 'strawboys' wore", "a white sheet with eyeholes", "a black cat's face", "a mask of birch bark", "a blacked face and a ragged coat, as the old Scottish guisers went"][Math.floor(Math.random() * 5)]; return "You put on " + M + ". In Scotland and Ireland young people went guising at Halloween, door to door in disguise, and had to earn their treat: a song, a rhyme, a trick."; },
function () {
var L = [], st = otmSpStartMs(otmSpCfg()) - 24 * 3600000;
String(otmSpCfg().names || "").split(/\n|,/).forEach(function (n) { n = n.trim(); if (n)
L.push(n); });
(otmProg().spNames || []).forEach(function (o) { if (o.at > st)
L.push(o.n); });
(OTM.altarList || []).forEach(function (o) { if (o.dedicated && o.colour === "samhain")
L.push(o.dedicated); });
var seen = {};
return L.filter(function (n) { var k = String(n).toLowerCase(); if (seen[k])
return false; seen[k] = 1; return true; }).slice(0, 80);
},
function (n) {
n = String(n || "").trim().slice(0, 40);
if (!n)
return "Write the name first.";
var p = otmProg();
p.spNames = (p.spNames || []).concat([{ n: n, at: Date.now() }]).slice(-40);
otmProgSave();
if (otmSigned() && typeof cityRpc === "function")
cityRpc("temple_offer", { p_kind: "candle", p_colour: "samhain", p_to: n, p_words: "Remembered at Samhain", p_priest: true }).then(function () { OTM.altarAt = 0; if (typeof otmAltarFetch === "function")
otmAltarFetch(); }, function () { });
return "You say the name aloud: <b>" + otmEsc(n) + "</b>. The coven answers, \"We remember,\" and a black candle is lit for them among the frames on the altar of the ancestors. It will be read again at the Service of Remembrance.";
},
function (said) {
var N = otmSpNow(), r = N.item;
if (!r) {
otmSpBoard();
return;
}
var acts = OTM_SP_ACTS[r[0]] || [], b = "", fns = {}, end = otmSpAt(r) + r[2] * 60000;
acts.forEach(function (A, i) {
if (A[0] === "name") {
b += "<div style='margin:8px 0'><input id='otm-sp-name' maxlength='40' placeholder='a name to remember' style='width:100%;padding:6px;background:#140C10;color:#F0E0C8;border:1px solid #6A4A3A;border-radius:4px'></div>" + worldBtn("a" + i, "🕯️ Speak the name and light a candle", "for someone you have lost; it is read again at the Service of Remembrance");
fns["a" + i] = function () { var e = document.getElementById("otm-sp-name"); otmSpCard(otmSpName(e && e.value)); };
return;
}
if (A[0] === "cast") {
b += "<div style='margin:8px 0'><textarea id='otm-sp-cast' rows='2' maxlength='200' placeholder='what you leave behind with the old year (nobody reads it, not even the Keeper)' style='width:100%;padding:6px;background:#140C10;color:#F0E0C8;border:1px solid #6A4A3A;border-radius:4px'></textarea></div>" + worldBtn("a" + i, "🔥 Cast it into the fire", "");
fns["a" + i] = function () {
var e = document.getElementById("otm-sp-cast");
var w = (e && e.value || "").trim();
if (e)
e.value = "";
otmSpCard(w ? "You fold the paper twice and cast it into the heart of the fire. It curls, catches, and is gone up into the dark with the sparks. Nothing of it is kept anywhere." : "Write what you leave behind first, or simply cast in a twig of the old year, as many do.");
};
return;
}
b += worldBtn("a" + i, A[0], "");
fns["a" + i] = function () { var t = typeof A[1] === "function" ? A[1]() : A[1]; if (t !== null)
otmSpCard(t); };
});
var lead = r[6], who = OTM_SP_LEAD[lead];
b += worldBtn("talk", "💬 Speak with " + who, "in their own voice");
fns.talk = function () {
worldCard(null);
var v = OTM_VOICES["rite:" + lead];
if (v)
v.x = "Right now you are leading " + r[4] + " (" + r[7] + ") in " + OTM_SP_WHERE[r[5]] + ".";
otmTalk("rite:" + lead, OTM_SP_WHERE[r[5]] + ", during " + r[4] + ", on Samhain");
};
b += worldBtn("prog", "🎃 The whole programme", "");
fns.prog = function () { otmSpBoard(); };
var head = "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🎃 " + otmEsc(r[4]) + "</div><div style='opacity:.8;font-size:12.5px'>" + otmEsc(r[3]) + " · " + otmEsc(OTM_SP_WHERE[r[5]]) + " · led by " + otmEsc(who) + (N.forced ? " · <b>Keeper's try-out</b>" : " · until " + otmSpClock(end).split(", ")[1] + " " + OTM_SP_TZ) + "</div>" +
"<p style='margin:8px 0'>" + otmEsc(r[7]) + "</p>" + (said ? "<div style='margin:8px 0;padding:8px 10px;border-left:3px solid #E87A1A;background:rgba(232,122,26,.08)'>" + said + "</div>" : "");
worldCard(head + b, fns);
},
function () {
var N = otmSpNow(), b = "", fns = {}, same = otmSpSameZone(), st = N.start;
var top = N.phase === "off" ? "The Keeper has the programme switched off for now." : N.phase === "before" ? "Begins " + otmSpClock(otmSpAt(OTM_SP_PROG[0])) + " (" + OTM_SP_TZ + "), in " + otmSpIn(otmSpAt(OTM_SP_PROG[0])) + ". The great rite at midnight." :
N.phase === "after" ? "Samhain is over for this year. Blessed be." : N.item ? "Now: " + N.item[4] + ", in " + OTM_SP_WHERE[N.item[5]] + "." : "Between rites. Next: " + (N.next ? N.next[4] + " in " + otmSpIn(otmSpAt(N.next)) : "");
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFB060'>🎃 Samhain at the Temple of the Obsidian Moon</div><div style='opacity:.85;font-size:12.5px;margin-bottom:6px'>" + otmEsc(top) + "</div>" +
"<table style='width:100%;border-collapse:collapse;font-size:12.5px'>";
OTM_SP_PROG.forEach(function (r) {
var a = otmSpAt(r), now = N.item === r, done = Date.now() >= a + r[2] * 60000 && !N.forced;
h += "<tr style='" + (now ? "background:rgba(232,122,26,.18);" : "") + (done ? "opacity:.5" : "") + "'><td style='padding:3px 8px 3px 2px;white-space:nowrap;vertical-align:top'>" + otmSpClock(a).split(", ")[1] + (same ? "" : "<div style='opacity:.6;font-size:11px'>" + otmSpLocal(a) + " yours</div>") + "</td>" +
"<td style='padding:3px 0'><b>" + (now ? "🔥 " : "") + otmEsc(r[4]) + "</b><div style='opacity:.7;font-size:11.5px'>" + otmEsc(r[3]) + " · " + otmEsc(OTM_SP_WHERE[r[5]]) + "</div></td></tr>";
});
h += "</table><div style='opacity:.65;font-size:11.5px;margin-top:4px'>Times are " + OTM_SP_TZ + " (the temple's clock), from " + otmSpClock(st).split(", ")[0] + "." + (same ? "" : " The small times are your own.") + " Between rites the ancestor altar and the Cyber Altar are always open.</div>";
if (N.item) {
var pl = N.item[5];
if (WLD.on === OTM.key) {
b += worldBtn("go", "Go to " + OTM_SP_WHERE[pl] + " now", "where " + N.item[4] + " is");
fns.go = function () { worldCard(null); otmArrive(OTM_AT[pl === "front" ? "front" : pl === "altar" ? "hall" : pl]); };
}
else {
b += worldBtn("go", "Go to the temple, to " + OTM_SP_WHERE[pl], "where " + N.item[4] + " is");
fns.go = function () { worldCard(null); otmGo(pl === "altar" ? "hall" : pl); };
}
}
else if (WLD.on !== OTM.key) {
b += worldBtn("go", "Go to the temple", "");
fns.go = function () { worldCard(null); otmGo("front"); };
}
b += worldBtn("kids", "🌙 The Little Moons' Samhain (for children)", "in the Kids Zone, by day: lanterns, snap-apple, the story fire, the costume parade");
fns.kids = function () { worldCard(null); if (typeof kzsBoard === "function")
kzsBoard(); };
if (typeof shctBoard === "function") {
b += worldBtn("tt", "🍬 Trick-or-Treat through Somnucor", "most candy by 8 pm wins the Halloween Sceptre");
fns.tt = function () { shctBoard(); };
}
if (otmKeeper()) {
b += "<div style='opacity:.7;font-size:12px;margin-top:8px'>Keeper: try any rite here and now (only you see it).</div>";
OTM_SP_PROG.forEach(function (r) { b += worldBtn("k_" + r[0], "Try: " + r[4], ""); fns["k_" + r[0]] = function () { otmSpTry(r[0]); }; });
if (OTM.spForce) {
b += worldBtn("k_off", "Stop trying", "back to the real clock");
fns.k_off = function () { otmSpTry(null); };
}
}
worldCard(h + b, fns);
},
function (h) {
if (typeof document === "undefined")
return;
var e = document.getElementById("otm-sp-toast");
if (!e) {
e = document.createElement("div");
e.id = "otm-sp-toast";
e.style.cssText = "position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:60;max-width:min(560px,92vw);padding:10px 16px;border-radius:8px;background:rgba(14,8,6,.92);border:1px solid #B87A2A;color:#F8E8D0;font:14px/1.4 Georgia,serif;box-shadow:0 4px 24px rgba(0,0,0,.5);pointer-events:none;transition:opacity .8s";
document.body.appendChild(e);
}
e.innerHTML = h;
e.style.opacity = "1";
e.style.display = "block";
clearTimeout(OTM.spToastT);
OTM.spToastT = setTimeout(function () { e.style.opacity = "0"; }, 9000);
},
function (dt) {
OTM.spT = (OTM.spT || 0) + dt;
if (OTM.spT < 1)
return;
OTM.spT = 0;
if (WLD.w && WLD.w.g && OTM.built && OTM.builtSam !== otmSamhainOn()) {
otmSpRebuild();
otmSpTell(otmSamhainOn() ? "🎃 <b>The temple is dressed for Samhain.</b> Lanterns down the aisle, the altar of the ancestors before the sanctuary, the long black table in the ballroom." : "🌙 The Samhain dressing is taken down; the temple keeps its winter quiet.");
return;
}
if (!otmSamhainOn())
return;
otmSpStage();
otmSpDark();
var N = otmSpNow(), r = N.item, k = r ? r[0] : "";
OTM.spNowName = r ? r[4] : "";
if (k !== OTM.spSaid) {
OTM.spSaid = k;
if (r && !N.forced && WLD.on === OTM.key)
otmSay("🔔 <b>" + otmEsc(r[4]) + "</b> has begun in " + otmEsc(OTM_SP_WHERE[r[5]]) + ". Press E there to take part.");
}
},
function (said) {
var R = OTM.rite || {}, A = R.ask, fns = {}, b = "";
b += "<div style='font:600 17px var(--serif,Georgia);color:#D8C890'>🌙 The doors are kept for the coven</div>" +
"<p style='margin:8px 0'>The Temple of the Obsidian Moon is the coven's house. Its doors open to those on the coven roll. If you would walk with the coven, ask here, and the High Priest will answer.</p>";
if (said)
b += "<div style='margin:8px 0;padding:8px 10px;border-left:3px solid #B8A8F0;background:rgba(184,168,240,.08)'>" + said + "</div>";
if (otmIsPriest() && R.waiting) {
b += worldBtn("pet", "📜 " + R.waiting + " request" + (R.waiting === 1 ? "" : "s") + " to join wait for you", "read them and answer");
fns.pet = function () { otmPetitions(); };
}
if (!otmSigned()) {
b += "<p style='margin:8px 0;opacity:.85'>Sign in first, so the High Priest knows who is asking.</p>";
}
else if (R.known && !R.v187) {
b += "<p style='margin:8px 0;opacity:.85'>The board is not taking requests yet. Try again soon.</p>";
}
else if (A && A.status === "yes" && R.mayIn) {
b += "<p style='margin:8px 0'>✨ <b>The High Priest said yes.</b>" + (A.answer ? " <i>&ldquo;" + otmEsc(A.answer) + "&rdquo;</i>" : "") + " The doors are open to you.</p>" + worldBtn("in", "🌙 Go in", "the narthex");
fns["in"] = function () { worldCard(null); otmGo("front"); };
}
else if (R.adult === false) {
b += "<p style='margin:8px 0;opacity:.85'>The coven takes only dreamers of 18 and over.</p>";
}
else if (A && A.status === "waiting") {
b += "<p style='margin:8px 0'>📜 <b>Your request is with the High Priest.</b> You asked on " + otmEsc(otmWhenShort(A.asked_at)) + ". The answer will wait for you here.</p>" +
"<p style='margin:8px 0;font-size:12.5px;opacity:.8'>You may change your words: write them below and ask again.</p>" + otmJoinForm(fns);
}
else {
if (A && A.status === "no")
b += "<p style='margin:8px 0'>The High Priest answered <b>not this time</b>" + (A.answer ? ": <i>&ldquo;" + otmEsc(A.answer) + "&rdquo;</i>" : ".") + " You may ask again a week after the answer.</p>";
b += otmJoinForm(fns);
}
b += worldBtn("x", "Step back from the doors", "");
fns.x = function () { worldCard(null); };
worldCard(b, fns);
},
function (fns) {
var st = "width:100%;box-sizing:border-box;padding:6px;background:#100C16;color:#EDE4F8;border:1px solid #5A4A7A;border-radius:4px";
fns.ask = function () {
var n = (document.getElementById("otm-join-name") || {}).value || "", w = (document.getElementById("otm-join-why") || {}).value || "", ok = document.getElementById("otm-join-ok");
n = n.trim();
if (!n) {
otmJoinCard("Write the name you go by.");
return;
}
if (!(ok && ok.checked)) {
otmJoinCard("Tick the box first: the coven is for those of 18 and over who come freely.");
return;
}
cityRpc("temple_join_ask", { p_name: n, p_why: w.trim() }).then(function (d) {
if (!d || d.ok === false) {
otmJoinCard(otmEsc((d && d.error) || "The board did not take it. Try again in a little while."));
return;
}
otmRiteFetch(true).then(function () { otmJoinCard(otmEsc(d.say || "Your request is with the High Priest.")); });
}, function (e) { otmJoinCard(otmEsc((e && e.message) || "The board did not take it. Try again in a little while.")); });
};
return "<div style='margin:8px 0'><label style='font-size:12.5px;opacity:.85'>The name you go by</label><input id='otm-join-name' maxlength='40' style='" + st + "'></div>" +
"<div style='margin:8px 0'><label style='font-size:12.5px;opacity:.85'>A few words for the High Priest: who you are, and why you would join</label><textarea id='otm-join-why' maxlength='600' rows='4' style='" + st + "'></textarea></div>" +
"<label style='display:flex;gap:8px;align-items:flex-start;margin:8px 0;font-size:12.5px'><input type='checkbox' id='otm-join-ok'> I am 18 or over, and I ask freely.</label>" +
worldBtn("ask", "📜 Post my request on the board", "the High Priest reads every one");
},
function (said) {
if (!otmIsPriest()) {
worldCard(null);
return;
}
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#D8C890'>📜 Requests to join the coven</div><p>Reading the ledger…</p>", {});
cityRpc("temple_join_board", {}).then(function (d) {
if (!d || d.ok === false) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#D8C890'>📜 Requests to join the coven</div><p>" + otmEsc((d && d.error) || "The ledger could not be read.") + "</p>", {});
return;
}
var L = d.asks || [], fns = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#D8C890'>📜 Requests to join the coven</div>";
if (said)
b += "<div style='margin:8px 0;padding:8px 10px;border-left:3px solid #B8A8F0;background:rgba(184,168,240,.08)'>" + said + "</div>";
var wait = L.filter(function (q) { return q.status === "waiting"; }), done = L.filter(function (q) { return q.status !== "waiting"; });
if (!wait.length)
b += "<p style='margin:8px 0;opacity:.85'>Nobody is waiting.</p>";
wait.forEach(function (q) {
b += "<div style='margin:8px 0;padding:8px 10px;border:1px solid rgba(184,168,240,.35);border-radius:4px'><b>" + otmEsc(q.name) + "</b>" + (q.account && q.account !== q.name ? " <span style='opacity:.7'>(" + otmEsc(q.account) + ")</span>" : "") +
" <span style='opacity:.6;font-size:12px'>asked " + otmEsc(otmWhenShort(q.asked_at)) + "</span>" +
(q.why ? "<div style='margin:4px 0;font-size:13px'><i>&ldquo;" + otmEsc(q.why) + "&rdquo;</i></div>" : "") +
(q.adult ? "" : "<div style='margin:4px 0;font-size:12px;color:#F0A080'>Not known to be 18 or over: the coven cannot take them.</div>") +
"<input id='otm-pet-say-" + q.id + "' maxlength='300' placeholder='a word back (they read it at the doors)' style='width:100%;box-sizing:border-box;padding:5px;margin:4px 0;background:#100C16;color:#EDE4F8;border:1px solid #5A4A7A;border-radius:4px'>" +
(q.adult ? worldBtn("y" + q.id, "✨ Yes: welcome them to the coven", "") : "") + worldBtn("n" + q.id, "Not this time", "they may ask again in a week") + "</div>";
[["y", true], ["n", false]].forEach(function (r) {
fns[r[0] + q.id] = function () {
var e = document.getElementById("otm-pet-say-" + q.id);
cityRpc("temple_join_answer", { p_id: q.id, p_yes: r[1], p_say: (e && e.value || "").trim() }).then(function (x) {
if (!x || x.ok === false) {
otmPetitions(otmEsc((x && x.error) || "That did not go through."));
return;
}
otmRiteFetch(true);
otmPetitions(r[1] ? "✨ <b>" + otmEsc(q.name) + "</b> is of the coven now. The doors open to them." : "Answered: not this time, for " + otmEsc(q.name) + ".");
}, function () { otmPetitions("That did not go through. Try again."); });
};
});
});
if (done.length)
b += "<p style='margin:10px 0 4px;opacity:.8;font-size:12.5px'>Answered in the last 30 days</p>" + done.slice(0, 20).map(function (q) {
return "<div style='font-size:12.5px;margin:2px 0'>" + (q.status === "yes" ? "✨ yes" : "✕ not this time") + " · <b>" + otmEsc(q.name) + "</b>" + (q.by ? " · by " + otmEsc(q.by) : "") + " · " + otmEsc(otmWhenShort(q.decided_at)) + "</div>";
}).join("");
worldCard(b, fns);
}, function () { worldCard("<p>The ledger could not be read.</p>", {}); });
},
function () {
if (!OTM.gt || Date.now() - OTM.gt > 30000) {
OTM.gt = Date.now();
otmRiteFetch().then(otmPetitionsNudge);
}
if (WLD.on === OTM.key && otmKeptOut() && OTM.rite && OTM.rite.known && !OTM.outing) {
OTM.outing = true;
worldHome("🌙 <b>The temple is kept for the coven.</b> You are walked back out to Temple Row; the coven's board stands by the doors.");
setTimeout(function () { OTM.outing = false; }, 3000);
}
},
function (G) {
var C = OMS_CITY, T = otmMsCityTop(), lite = otmLite();
var gold = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, fog: false }), rail = new THREE.MeshBasicMaterial({ color: 0xFFF0C8, fog: false }), post = new THREE.MeshBasicMaterial({ color: 0xE8C878, fog: false });
var st = new THREE.InstancedMesh(new THREE.BoxGeometry(C.w, T.r, T.t), gold, T.n), o = new THREE.Object3D(), c = new THREE.Color(), a = new THREE.Color(0xFFC860), b = new THREE.Color(0xFFFCF0);
for (var i = 0; i < T.n; i++) {
o.position.set(C.x, C.y + (i + 0.5) * T.r, C.z - (i + 0.5) * T.t);
o.updateMatrix();
st.setMatrixAt(i, o.matrix);
c.copy(a).lerp(b, Math.pow(i / T.n, 0.7));
st.setColorAt(i, c);
}
st.instanceMatrix.needsUpdate = true;
if (st.instanceColor)
st.instanceColor.needsUpdate = true;
st.frustumCulled = false;
G.add(st);
var ang = Math.atan2(T.h, T.l), L = Math.hypot(T.h, T.l), mz = C.z - T.l / 2, my = C.y + T.h / 2;
[-1, 1].forEach(function (sd) {
var s = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, L), post);
s.position.set(sd * (C.w / 2 + 0.2), my - 0.35, mz);
s.rotation.x = ang;
G.add(s);
var r = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, L), rail);
r.position.set(sd * (C.w / 2 + 0.1), my + 1.15, mz);
r.rotation.x = ang;
G.add(r);
});
var np = Math.floor(T.n / (lite ? 10 : 20)), pm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.22, 1.2, 0.22), post, np * 2), q = 0;
for (var p = 0; p < np; p++) {
var lz = C.z - p * (lite ? 10 : 20) * T.t, y = otmMsCityY(lz);
[-1, 1].forEach(function (sd) { o.position.set(sd * (C.w / 2 + 0.1), y + 0.6, lz); o.updateMatrix(); pm.setMatrixAt(q++, o.matrix); });
if (p % 2 === 0 && typeof wGlow === "function") {
var gl = wGlow(0xFFE0A0, 9 + p * 0.08, 0.55);
gl.position.set(0, y + 1.4, lz);
G.add(gl);
}
}
pm.count = q;
pm.instanceMatrix.needsUpdate = true;
pm.frustumCulled = false;
G.add(pm);
var ring = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.16, 6, lite ? 16 : 32), post);
ring.rotation.x = Math.PI / 2;
ring.position.set(C.x, C.y + 0.05, C.z - 0.6);
G.add(ring);
if (typeof wGlow === "function") {
var fg = wGlow(0xFFE8B0, 22, 0.6);
fg.position.set(C.x, C.y + 2, C.z - 2);
G.add(fg);
}
var top = { x: C.x, y: C.y + T.h, z: C.z - T.l }, nc = lite ? 22 : 60, cl = new THREE.InstancedMesh(new THREE.SphereGeometry(1, lite ? 10 : 16, lite ? 7 : 12), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x9A8A78, transparent: true, opacity: 0.92, fog: false, depthWrite: false }), nc), rr = 1;
var rnd = function () { rr = (rr * 16807) % 2147483647; return rr / 2147483647; };
for (var k = 0; k < nc; k++) {
var an = rnd() * Math.PI * 2, rd = (k < 8 ? 4 : 14) + rnd() * 110, s = 20 + rnd() * 34;
o.position.set(top.x + Math.cos(an) * rd, top.y - 14 + rnd() * 34, top.z + Math.sin(an) * rd * 0.8);
o.scale.set(s, s * 0.5, s);
o.updateMatrix();
cl.setMatrixAt(k, o.matrix);
c.setHex(0xFFFFFF).lerp(new THREE.Color(0xFFE2A8), rnd() * 0.7);
cl.setColorAt(k, c);
}
cl.instanceMatrix.needsUpdate = true;
if (cl.instanceColor)
cl.instanceColor.needsUpdate = true;
cl.frustumCulled = false;
cl.renderOrder = 2;
G.add(cl);
if (typeof wGlow === "function") {
var tg = wGlow(0xFFF0C8, 180, 0.75);
tg.position.set(top.x, top.y + 6, top.z);
G.add(tg);
}
OMS.cityTop = top;
},
function (x, z, feet) {
var S = OTM_CITY.g && OTM_CITY.spot;
if (!S || feet === undefined)
return null;
var dx = x - S.x, dz = z - S.z, c = Math.cos(S.ry), s = Math.sin(S.ry), lx = dx * c - dz * s, lz = dx * s + dz * c, T = otmMsCityTop();
if (lz > OMS_CITY.z + 1 || lz < OMS_CITY.z - T.l - 2)
return null;
var y = S.y + otmMsCityY(lz);
return { lx: lx, f: Math.max(0, Math.min(1, (OMS_CITY.z - lz) / T.l)), up: feet - y };
},
function (P) {
if (!otmMsOk())
return false;
var N = otmMsCityNear(P.x, P.z, P.y - 1.72);
if (!N || Math.abs(N.lx) > OMS_CITY.w / 2 + 5 || N.up < -5 || N.up > 9)
return false;
worldPromptCity("<b>🌙 The Stair of the Obsidian Moon</b> · <b>press E</b> to set foot on it and climb", function () { worldPromptCity(null); otmMsGo(N.f); });
OTM_CITY.prompted = true;
return true;
},
function (G) {
OMS.G = G;
OMS.lite = otmLite();
OMS.spots = [];
var lite = OMS.lite, F = OMS_FL, o = new THREE.Object3D(), c = new THREE.Color();
var M = function (col, op) { return new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op, depthWrite: op === undefined }); };
var L = function (col, ph) { return ph && !lite ? new THREE.MeshPhongMaterial({ color: col, shininess: ph, specular: 0x8A7A5A }) : new THREE.MeshLambertMaterial({ color: col }); };
var add = function (m) { m.userData.keep = 1; m.userData.noSit = 1; G.add(m); return m; };
var nl = lite ? 1200 : 3600, pos = new Float32Array(nl * 3), col = new Float32Array(nl * 3), rr = 11, rnd = function () { rr = (rr * 16807) % 2147483647; return rr / 2147483647; };
for (var i = 0; i < nl; i++) {
var a = rnd() * Math.PI * 2, d = 60 + Math.pow(rnd(), 0.6) * 1400;
pos[i * 3] = Math.cos(a) * d;
pos[i * 3 + 1] = -180 - rnd() * 6;
pos[i * 3 + 2] = Math.sin(a) * d + 200;
c.setHex([0xFFC870, 0xFFE0A0, 0xF0A050, 0xB8C8FF][Math.floor(rnd() * 4)]);
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
add(new THREE.Points(pg, new THREE.PointsMaterial({ size: lite ? 3.2 : 2.4, vertexColors: true, sizeAttenuation: true, fog: false })));
var gp = add(new THREE.Mesh(new THREE.CircleGeometry(1600, 48).rotateX(-Math.PI / 2), L(0x0C0A14)));
gp.position.set(0, -188, 200);
var dk = L(0x0E0C12, 90), bs = L(0x1A181E), sil = L(0xC8C8D8, 80), gd = L(0xB8923A, 70);
var dm = add(new THREE.Mesh(new THREE.SphereGeometry(13, lite ? 16 : 32, lite ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2), dk));
dm.scale.y = 0.6;
dm.position.set(0, -7.8, 4);
var dr = add(new THREE.Mesh(new THREE.CylinderGeometry(13.2, 13.2, 1.4, lite ? 16 : 32), bs));
dr.position.set(0, -7.4, 4);
var hb = add(new THREE.Mesh(new THREE.BoxGeometry(64, 15, 50), bs));
hb.position.set(0, -16.4, 6);
var cr = add(new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.6, 0.4, lite ? 16 : 32), sil));
cr.position.set(0, -0.2, 2.6);
var bal = add(new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.07, 6, lite ? 16 : 32, Math.PI * 1.7), sil));
bal.rotation.x = Math.PI / 2;
bal.rotation.z = -Math.PI * 0.35 + Math.PI / 2;
bal.position.set(0, 1.0, 2.6);
var fin = new THREE.Group();
fin.position.set(0, 0, 7.4);
G.add(fin);
var fp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3, 6), gd);
fp.position.y = 1.5;
fin.add(fp);
var cres = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.18, 8, 24, Math.PI * 1.3), gd);
cres.position.y = 3.6;
cres.rotation.z = Math.PI * 0.85;
fin.add(cres);
fin.userData.keep = 1;
otmMsSpot(0, 4.6, 2.0, "🌙 The way back down", "go back down into the Congregation Hall", function () { worldCard(null); otmGo("hall"); });
var rise = lite ? 0.6 : 0.3, tread = lite ? 0.8 : 0.4, per = Math.round(F.len / tread), tot = per * F.n, sm = new THREE.InstancedMesh(new THREE.BoxGeometry(F.hw * 2, rise, tread), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x8A6A30, emissiveIntensity: 0.75 }), tot), q = 0, a0 = new THREE.Color(0xE8A848), b0 = new THREE.Color(0xE8DCC0);
var rail = M(0xFFF0C8), post = L(0xE8C878, 60), ang = Math.atan2(F.rise, F.len), LL = Math.hypot(F.rise, F.len);
for (var k = 0; k < F.n; k++) {
var z0 = -k * (F.len + F.land), y0 = k * F.rise;
for (var s = 0; s < per; s++) {
o.position.set(0, y0 + (s + 1) * rise - rise / 2 - 0.02, z0 - (s + 0.5) * tread);
o.rotation.set(0, 0, 0);
o.scale.set(1, 1, 1);
o.updateMatrix();
sm.setMatrixAt(q, o.matrix);
c.copy(a0).lerp(b0, (k * per + s) / tot);
sm.setColorAt(q++, c);
}
[-1, 1].forEach(function (sd) {
var st = add(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, LL), post));
st.position.set(sd * (F.hw + 0.2), y0 + F.rise / 2 - 0.4, z0 - F.len / 2);
st.rotation.x = ang;
var rl = add(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, LL), rail));
rl.position.set(sd * (F.hw + 0.1), y0 + F.rise / 2 + 1.05, z0 - F.len / 2);
rl.rotation.x = ang;
});
var zl = z0 - F.len - F.land / 2, yl = y0 + F.rise;
if (k < F.n - 1) {
var ld = add(new THREE.Mesh(new THREE.BoxGeometry(F.lw * 2, 0.4, F.land), sil));
ld.position.set(0, yl - 0.2, zl);
[-1, 1].forEach(function (sd) {
var lp = add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 3.4, 8), sil));
lp.position.set(sd * (F.lw - 0.3), yl + 1.7, zl);
var lc = add(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 6, 16, Math.PI * 1.3), M(0xF0F0FF)));
lc.position.set(sd * (F.lw - 0.3), yl + 3.7, zl);
lc.rotation.z = Math.PI * 0.85;
if (typeof wGlow === "function") {
var g = wGlow(0xDDE4FF, 3.2, 0.7);
g.position.set(sd * (F.lw - 0.3), yl + 3.7, zl);
G.add(g);
}
});
var W = OMS_WORDS[k + 1];
if (W && typeof wSign === "function") {
var sg = wSign([W[0], W[1]], 5.4, 1.2, "#141020", "#E8DCC0");
sg.position.set(-F.lw + 0.05, yl + 1.9, zl);
sg.rotation.y = Math.PI / 2;
sg.userData.keep = 1;
G.add(sg);
}
}
if (typeof wGlow === "function")
for (var gg = 0; gg < (lite ? 2 : 4); gg++) {
var gz = z0 - (gg + 0.5) * F.len / (lite ? 2 : 4), gy = otmMsY(gz);
[-1, 1].forEach(function (sd) { var g = wGlow(0xFFE0A0, 1.6, 0.45); g.position.set(sd * (F.hw + 0.1), gy + 1.2, gz); G.add(g); });
}
}
sm.instanceMatrix.needsUpdate = true;
if (sm.instanceColor)
sm.instanceColor.needsUpdate = true;
sm.frustumCulled = false;
add(sm);
[-1, 1].forEach(function (sd) { var pp = add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.6, 0.3), sil)); pp.position.set(sd * (F.hw + 0.3), 3.3 + 1.2, -4); });
if (typeof wSign === "function") {
var s0 = wSign([OMS_WORDS[0][0], OMS_WORDS[0][1]], 5.0, 1.0, "#141020", "#E8DCC0");
s0.position.set(0, 7.2, -4);
s0.userData.keep = 1;
G.add(s0);
}
var nc = lite ? 40 : 110, per2 = lite ? 4 : 6, cm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x5A5068, transparent: true, opacity: 0.8, depthWrite: false }), cl = new THREE.InstancedMesh(new THREE.SphereGeometry(1, lite ? 9 : 12, lite ? 6 : 8), cm, nc * per2), cn = 0;
var Ytop = F.n * F.rise;
for (var j = 0; j < nc; j++) {
var hy = Math.pow(rnd(), 0.55), zz = -30 - rnd() * 470, side = rnd() < 0.5 ? -1 : 1, sc = 6 + rnd() * 16, yy = otmMsY(zz) - 34 + hy * 70, xx = side * (F.lw + 8 + sc * 1.6 + rnd() * 80);
if (j < nc * 0.35) {
sc = 12 + rnd() * 20;
zz = F.top + 40 - rnd() * 120;
yy = Ytop - 14 - sc * 0.5 - rnd() * 20;
xx = (rnd() - 0.5) * 260;
if (Math.abs(xx) < 18 + sc * 1.6)
xx = side * (18 + sc * 1.6 + rnd() * 40);
}
var tint = new THREE.Color(0xFFFFFF).lerp(new THREE.Color(yy > 150 ? 0xFFE6B0 : 0xC8B8E8), 0.35 + rnd() * 0.35);
for (var u = 0; u < per2; u++) {
var pa = u / per2 * 6.283 + rnd(), pr = u ? sc * (0.45 + rnd() * 0.5) : 0, ps = sc * (u ? 0.45 + rnd() * 0.35 : 0.8), px = xx + Math.cos(pa) * pr, pz = zz + Math.sin(pa) * pr * 0.8;
o.position.set(px, yy + ps * 0.28 + (u ? 0 : sc * 0.12), pz);
o.scale.set(ps, ps * 0.62, ps);
o.rotation.set(0, rnd() * 3, 0);
o.updateMatrix();
cl.setMatrixAt(cn, o.matrix);
c.copy(tint).offsetHSL(0, 0, (rnd() - 0.5) * 0.06);
cl.setColorAt(cn++, c);
}
}
cl.count = cn;
cl.instanceMatrix.needsUpdate = true;
if (cl.instanceColor)
cl.instanceColor.needsUpdate = true;
cl.frustumCulled = false;
cl.renderOrder = 2;
add(cl);
var mn = new THREE.Mesh(new THREE.CircleGeometry(150, 48), new THREE.MeshBasicMaterial({ color: 0xF4F0E4, fog: false }));
mn.position.set(-260, Ytop + 520, -2700);
mn.lookAt(0, Ytop, 0);
add(mn);
var mh = new THREE.Mesh(new THREE.CircleGeometry(330, 48), new THREE.MeshBasicMaterial({ color: 0xC8C8F0, transparent: true, opacity: 0.16, fog: false, depthWrite: false }));
mh.position.copy(mn.position).add(new THREE.Vector3(0, 0, -5));
mh.lookAt(0, Ytop, 0);
add(mh);
[[30, -20, 26], [-60, 40, 18], [50, 55, 14], [-20, -70, 20]].forEach(function (m) { var d = new THREE.Mesh(new THREE.CircleGeometry(m[2], 20), new THREE.MeshBasicMaterial({ color: 0xD8D2C4, fog: false })); d.position.copy(mn.position).add(new THREE.Vector3(m[0], m[1], 1)); d.lookAt(0, Ytop, 0); add(d); });
var Y = F.n * F.rise, wt = L(0x948E84);
var tr = add(new THREE.Mesh(new THREE.BoxGeometry(24, 0.6, 44), wt));
tr.position.set(0, Y - 0.3, F.top - 21);
var inl = add(new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.04, F.top - F.gate - 1), L(0x9A7A38)));
inl.position.set(0, Y + 0.02, (F.top + F.gate) / 2 - 0.5);
var inl2 = add(new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.05, F.top - F.gate - 1), L(0xA8A094)));
inl2.position.set(0, Y + 0.03, (F.top + F.gate) / 2 - 0.5);
var balG = [], z1 = F.top - 0.5, z2 = F.top - 42.5;
[-1, 1].forEach(function (sd) {
for (var bz = z1; bz >= z2; bz -= 0.9) {
var g = new THREE.CylinderGeometry(0.07, 0.1, 0.85, 6);
g.translate(sd * 11.6, Y + 0.42, bz);
balG.push(g);
}
var rg = new THREE.BoxGeometry(0.3, 0.12, z1 - z2);
rg.translate(sd * 11.6, Y + 0.9, (z1 + z2) / 2);
balG.push(rg);
});
[[-11.6, -F.lw - 0.4], [F.lw + 0.4, 11.6]].forEach(function (r) {
for (var bx = r[0]; bx <= r[1]; bx += 0.9) {
var g = new THREE.CylinderGeometry(0.07, 0.1, 0.85, 6);
g.translate(bx, Y + 0.42, z1);
balG.push(g);
}
var rg = new THREE.BoxGeometry(r[1] - r[0], 0.12, 0.3);
rg.translate((r[0] + r[1]) / 2, Y + 0.9, z1);
balG.push(rg);
});
if (typeof otmMsMerge === "function")
add(new THREE.Mesh(otmMsMerge(balG), wt));
for (var lz = F.top - 5; lz > F.gate + 4; lz -= 9)
[-1, 1].forEach(function (sd) {
var lp = add(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 3.6, 8), sil));
lp.position.set(sd * 10.8, Y + 1.8, lz);
var lc = add(new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.07, 6, 16, Math.PI * 1.3), M(0xF4F0FF)));
lc.position.set(sd * 10.8, Y + 3.8, lz);
lc.rotation.z = Math.PI * 0.85;
if (typeof wGlow === "function") {
var g = wGlow(0xE8ECFF, 2.2, 0.45);
g.position.set(sd * 10.8, Y + 3.8, lz);
G.add(g);
}
});
[-1, 1].forEach(function (sd) {
[F.top - 10, F.top - 19].forEach(function (bz) {
var b = add(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 2.4), wt));
b.position.set(sd * 9.4, Y + 0.48, bz);
[-0.9, 0.9].forEach(function (o) { var lg = add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.3), wt)); lg.position.set(sd * 9.4, Y + 0.21, bz + o); });
});
[F.top - 3, F.gate + 5].forEach(function (uz) {
var u = add(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.3, 0.9, 12), L(0xD8D0C0, 30)));
u.position.set(sd * 5.5, Y + 0.45, uz);
var fl = add(new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 6), L(0x4A6A3A)));
fl.scale.y = 0.7;
fl.position.set(sd * 5.5, Y + 1.05, uz);
for (var f = 0; f < 5; f++) {
var bl = add(new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 6, 1, true), L(0xFAF8F0)));
bl.rotation.x = Math.PI;
bl.position.set(sd * 5.5 + Math.cos(f * 1.26) * 0.35, Y + 1.35 + (f % 2) * 0.08, uz + Math.sin(f * 1.26) * 0.35);
}
});
});
[-1, 1].forEach(function (sd) { var pl = add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 11, 1.6), wt)); pl.position.set(sd * 5, Y + 5.5, F.gate); var cap = add(new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.6, 2.1), gd)); cap.position.set(sd * 5, Y + 11.3, F.gate); });
var ga = add(new THREE.Mesh(new THREE.TorusGeometry(5, 0.45, 10, 32, Math.PI), gd));
ga.position.set(0, Y + 11, F.gate);
var lt = add(new THREE.Mesh(new THREE.PlaneGeometry(8.4, 11), new THREE.MeshBasicMaterial({ color: 0xFFF4D8, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })));
lt.position.set(0, Y + 5.5, F.gate);
if (typeof wGlow === "function") {
var gl = wGlow(0xFFF2D0, 16, 0.45);
gl.position.set(0, Y + 8, F.gate - 1);
G.add(gl);
}
if (typeof wSign === "function") {
var gs = wSign(["THE GATE OF LIGHT", "the Heavens, by the silver landing"], 6, 1.3, "#F6F0E0", "#5A4010");
gs.position.set(0, Y + 13.6, F.gate + 0.4);
gs.userData.keep = 1;
G.add(gs);
}
otmMsSpot(0, F.gate + 3, 3.4, "✨ The Gate of Light", "go through into the Heavens", function () { otmMsThrough(); }, Y);
OMS.built = true;
},
function (list) {
var n = 0, q = list.map(function (g) { var r = g.index ? g.toNonIndexed() : g; n += r.attributes.position.count; return r; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), o = 0;
q.forEach(function (g) { if (!g.attributes.normal)
g.computeVertexNormals(); P.set(g.attributes.position.array, o * 3); N.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
return G;
},
function () {
var y = worldLocal().y, k = Math.max(0, Math.min(1, y / 300));
var mix = function (a, b) { return new THREE.Color(a).lerp(new THREE.Color(b), k).getHex(); };
return { top: mix(0x1A1440, 0x6A8AD0), low: mix(0x4A2A50, 0xFFE0B0), fogD: 0.0012, fog: mix(0x2A2040, 0xF0E0C8), sun: 0.6 + k * 0.15, sunCol: 0xFFE0B0, sunDir: [0.2, 0.6, -0.8], hemi: 1.2 - k * 0.35, hemiCol: mix(0xC8B8F0, 0xFFF4E0), hemiGround: 0x2A2030, stars: k < 0.4 ? 1 : 0 };
},
function () {
otmMsArrive(OMS.want);
var mid = !!OMS.want;
OMS.want = null;
OMS.chk = 0;
otmSay(mid ? "🌙 <b>The Stair of the Obsidian Moon.</b> The light takes your weight. The city lies far below; the cloud is above you." : "🌙 <b>The Stair of the Obsidian Moon.</b> You come out on the crown of the dome, under the open sky. The stair of light goes up before you, five long flights into the cloud. Nobody watching from the Row can follow.");
},
function (dt) {
OMS.t += dt;
var L = worldLocal(), feet = L.y - 1.72;
try {
otmRoadTick(dt, "stair");
}
catch (e) { }
OMS.chk = (OMS.chk || 0) + dt;
if (OMS.chk > 3) {
OMS.chk = 0;
if (!otmMsOk()) {
worldCard(null);
worldHome("🌙 The stair of light lets you down gently onto Temple Row.");
return;
}
}
var up = Math.max(0, Math.round(otmMsY(L.z)));
worldBanner("<b>🌙 The Stair of the Obsidian Moon</b> · " + (L.z <= OMS_FL.top ? "the Gate of Light" : up + " m above the temple"));
if (L.z < OMS_FL.gate - 0.4 && L.z > OMS_FL.gate - 2 && Math.abs(L.x) < 4.2 && !OMS.through) {
OMS.through = true;
otmMsThrough();
setTimeout(function () { OMS.through = false; }, 4000);
return;
}
OMS.pt += dt;
if (OMS.pt < 0.15)
return;
OMS.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
if (OMS.myFn && WLD.promptFn === OMS.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
OMS.spots.forEach(function (s) { if (Math.abs(feet - s.y) > 2.4)
return; var d = Math.hypot(L.x - s.x, L.z - s.z); if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
} });
if (best) {
OMS.myFn = best.fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + otmEsc(best.verb), best.fn);
}
else if (OMS.myFn && WLD.promptFn === OMS.myFn) {
worldPrompt(null);
OMS.myFn = null;
}
},
function () {
var lite = OTM.lite, Y = 12, mat = new THREE.MeshBasicMaterial({ color: 0xD8DCF8, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide });
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.5, Y, lite ? 10 : 18, 1, true), mat);
sh.position.set(0, Y / 2, -15);
sh.userData.keep = 1;
sh.userData.noSit = 1;
otmP().add(sh);
var pool = new THREE.Mesh(new THREE.CircleGeometry(1.5, lite ? 14 : 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xE8ECFF, transparent: true, opacity: 0.22, depthWrite: false }));
pool.position.set(0, 0.05, -15);
otmP().add(pool);
otmSpot(0, -15, 1.6, "🌙 A shaft of moonlight", "step into it and rise to the stair on the roof", function () { otmMsGo(); }, { when: function () { return otmMsOk(); } });
},
function () {
try {
if (typeof audio !== "undefined" && !audio.on)
return 0;
}
catch (e) { }
var v = 0.5;
try {
if (typeof WSN !== "undefined" && WSN.set) {
v *= (WSN.set.mus === undefined ? 1 : WSN.set.mus) * (WSN.set.all === undefined ? 1 : WSN.set.all) * 1.6;
}
if (typeof WSN !== "undefined" && WSN.keeper && WSN.keeper.off)
v = 0;
}
catch (e) { }
return Math.max(0, Math.min(0.85, v));
},
function (dt, which) {
OTM_ROAD.want = which || null;
var lev = otmRoadLevel();
if (which && lev > 0 && !OTM_ROAD.a[which])
try {
var au = new Audio(OTM_TUNES[which]);
au.loop = true;
au.volume = 0;
OTM_ROAD.a[which] = au;
}
catch (e) { }
for (var k in OTM_ROAD.a) {
var A = OTM_ROAD.a[k], w = k === which ? lev : 0, v = A.volume;
if (w > 0 && A.paused) {
var pr = A.play();
if (pr && pr.catch)
pr.catch(function () { });
}
if (Math.abs(v - w) > 0.004)
A.volume = Math.max(0, Math.min(1, v + Math.sign(w - v) * Math.min(Math.abs(w - v), dt * 0.25)));
else if (w === 0 && !A.paused) {
A.pause();
}
if (!A.paused && A.volume > 0.02)
try {
if (typeof SND !== "undefined" && SND.music)
SND.music.otmroad = performance.now();
}
catch (e) { }
}
},
function (held) {
var why = held ? "<b>Your post is in the Heavens, and the Heavens are the temple's.</b> Ask to join the coven of the Obsidian Moon; when the High Priest says yes, the way up opens to you."
: "<b>The priests' posts of the powers are kept for the temple.</b> Ask to join the coven of the Obsidian Moon first; when the High Priest says yes, the post can be yours.";
otmJoinCard(why);
if (!otmSigned())
return;
otmRiteFetch(true).then(function () { if (WLD.card && WLD.card.style.display === "block" && /kept for the temple|the Heavens are the temple/.test(WLD.card.innerHTML))
otmJoinCard(why); });
},
function (G) {
var fl = otmM("floor");
if (fl) {
fl.userData.noReal = 1;
fl.needsUpdate = true;
}
var lite = OTM.lite, P = new THREE.Group();
P.name = "otm-sweep";
G.add(P);
var iron = otmMat(0x18161A, "metal"), wax = otmMat(0xE0D4B8, null), flame = new THREE.MeshBasicMaterial({ color: 0xFFC870 });
[-6, 6].forEach(function (x) {
var g = new THREE.Group();
g.position.set(x, 0, -31.5);
P.add(g);
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 1.5, 8), iron);
st.position.y = 0.75;
g.add(st);
var ft = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 12), iron);
ft.position.y = 0.04;
g.add(ft);
var tr = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.45, 0.06, 14), iron);
tr.position.y = 1.52;
g.add(tr);
for (var c = 0; c < (lite ? 4 : 7); c++) {
var a = c / 7 * 6.283, cd = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.24, 6), wax);
cd.position.set(Math.cos(a) * 0.35, 1.67, Math.sin(a) * 0.35);
g.add(cd);
var fm = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), flame);
fm.scale.y = 1.8;
fm.position.set(Math.cos(a) * 0.35, 1.83, Math.sin(a) * 0.35);
g.add(fm);
}
if (typeof otmRound === "function")
otmRound(x, -31.5, 0.45, 0, 1.8);
});
if (typeof wPerson !== "function")
return;
var robes = [{ top: 0x1A1620, bottom: 0x1A1620 }, { top: 0x2A1A40, bottom: 0x1A1620 }, { top: 0x3A0E1E, bottom: 0x1A1620 }, { top: 0x26222A, bottom: 0x2A1A40 }];
var L = [[-4.2, -12, Math.PI], [3.8, -14, Math.PI], [-5.6, -20, Math.PI], [5.2, -22, Math.PI], [-3.4, -26, Math.PI], [4.4, -8, Math.PI], [-12.4, -16, Math.PI * 0.9], [12.3, -24, -Math.PI * 0.9], [-12.2, -6, Math.PI], [1.4, -3, Math.PI]];
L.forEach(function (p, i) {
if (lite && i % 2)
return;
var r = robes[i % robes.length], g = null;
try {
g = wPerson("otm_sw_" + i, { title: i === 9 ? "" : "worshipper", look: Object.assign({ sex: i % 3 === 0 ? "f" : "m", topKind: "robe", bottomKind: "skirt", hat: "none", gear: "none" }, r) });
}
catch (e) {
g = null;
}
if (!g)
return;
g.position.set(p[0], 0, p[1]);
g.rotation.y = p[2];
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
P.add(g);
});
var pr = null;
try {
pr = wPerson("otm_sw_priestess", { title: "priestess", look: { sex: "f", topKind: "robe", bottomKind: "skirt", top: 0x2A1A40, bottom: 0x2A1A40, hat: "none", gear: "none" } });
}
catch (e) {
pr = null;
}
if (pr) {
pr.position.set(0, 0, -31.2);
pr.rotation.y = Math.PI;
pr.userData.keep = 1;
P.add(pr);
}
},
function () {
var lite = ODP.lite, P = new THREE.Group();
P.name = "ods-highway";
otmP().add(P);
var R = wRand(2311202601);
for (var z = -14, k = 0; z > -400; z -= lite ? 36 : 18, k++) {
if (Math.abs(z + 202) < 8)
continue;
var y = odpStairY(z);
[-1, 1].forEach(function (s) { if (lite && (k + (s > 0 ? 1 : 0)) % 2)
return; odpBrazier(s * 4.9, y, z, 0.8, null, P); });
}
for (var z2 = -30, m = 1; z2 > -400; z2 -= lite ? 80 : 40, m++) {
if (Math.abs(z2 + 202) < 10)
continue;
odsMilestone(P, m % 2 ? -5.2 : 5.2, odpStairY(z2), z2, "· " + Math.round(-odpStairY(z2)) + " ·");
}
for (var c = 0; c < (lite ? 4 : 9); c++) {
var cz = -24 - c * 42 - R() * 10;
if (Math.abs(cz + 202) < 10)
continue;
var cy = odpStairY(cz), s2 = c % 2 ? 1 : -1;
if (c % 3 === 0)
odsCage(P, s2 * 5.0, cy + 3.2, cz);
else
odsChains(P, s2 * 5.55, cy + 4.4, cz, 14);
}
for (var r = 0; r < (lite ? 8 : 18); r++) {
var rz = -10 - R() * 390;
if (Math.abs(rz + 202) < 10)
continue;
var ry = odpStairY(rz), sd = R() < 0.5 ? -1 : 1;
if (R() < 0.6)
odsRubble(P, sd * 5.1, ry, rz, R, 3 + Math.floor(R() * 4));
else
odsRoot(P, sd * 5.5, ry, rz, R, -sd);
}
var pz = -288, py = odpStairY(pz), st = otmCyl(0.03, 1.7, odsM(0x5A4030), -3.6, py + 0.06, pz, P, 5);
st.rotation.z = Math.PI / 2 - 0.05;
st.rotation.y = 0.4;
otmBox(0.45, 0.35, 0.25, odsM(0x5A4A32), -3.3, py + 0.18, pz + 0.6, P);
ODS.highway = P;
},
function () {
var H = ODP_HALL, lite = ODP.lite, y = -60, P = new THREE.Group();
P.name = "ods-hall";
otmP().add(P);
var cx = (H.x0 + H.x1) / 2, cz = (H.z0 + H.z1) / 2, brass = odsM(0xC8A050, { e: 0x2A1A06 }), ir = odsM(0x1A1616), wood = odsM(0x4A3020);
[[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(function (q) {
var x = cx + q[0] * 6.8, z = cz + q[1] * 6.8;
otmCyl(0.05, 1.6, ir, x, y + 0.8, z, P, 6, 0.08);
otmCyl(0.2, 0.06, ir, x, y + 1.62, z, P, 10);
otmCyl(0.05, 0.3, odsM(0xE8DCC0), x, y + 1.8, z, P, 8);
odpFire(x, y + 1.98, z, 0.5, 0xFFC070, P);
otmRound(x, z, 0.25, y, 1.8);
});
[[H.x0 + 3.2, cz - 5], [H.x0 + 3.2, cz + 5]].forEach(function (q, i) {
var g = new THREE.Group();
g.position.set(q[0], y, q[1]);
g.rotation.y = Math.PI / 2;
P.add(g);
otmCyl(0.08, 1.1, wood, 0, 0.55, 0, g, 6, 0.14);
var top = otmBox(0.7, 0.05, 0.5, wood, 0, 1.15, 0, g);
top.rotation.x = -0.35;
var bk = otmBox(0.6, 0.04, 0.42, odsM(0xE8DCC0), 0, 1.19, 0.0, g);
bk.rotation.x = -0.35;
otmBox(0.02, 0.05, 0.42, odsM(0x5A1A14), 0, 1.2, 0, g).rotation.x = -0.35;
otmRound(q[0], q[1], 0.4, y, 1.2);
});
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bx = H.x0 + 5 + b * ((H.x1 - H.x0 - 8) / ((lite ? 3 : 6) - 1));
[[H.z0 + 0.7, 0], [H.z1 - 0.7, Math.PI]].forEach(function (w, j) {
if ((b + j) % 2) {
otmBox(1.0, 0.5, 0.55, odsM(0x3A2418), bx, y + 0.25, w[0], P);
otmBox(1.02, 0.06, 0.57, brass, bx, y + 0.5, w[0], P);
}
else {
otmBox(1.6, 0.08, 0.45, wood, bx, y + 0.45, w[0], P);
otmBox(0.1, 0.44, 0.4, wood, bx - 0.7, y + 0.22, w[0], P);
otmBox(0.1, 0.44, 0.4, wood, bx + 0.7, y + 0.22, w[0], P);
}
OTK.solids.push({ x: bx, z: w[0], hw: 0.8, hd: 0.3, rot: 0, b: y, h: 0.6 });
});
}
[[H.x1 - 1.5, H.z0 + 2.5], [H.x1 - 1.5, H.z1 - 2.5]].forEach(function (q) { odpBrazier(q[0], y, q[1], 0.7, 0xFF9A40, P); });
var rug = otmBox(5.6, 0.015, 3.2, odsM(0x4A1414), H.x0 + 3.4, y + 0.01, cz, P);
ODS.hall = P;
},
function () {
var lite = ODP.lite, P = new THREE.Group();
P.name = "ods-court";
otmP().add(P);
var X = ODP_COURT_X;
var obs = odsM(0x0E0C10), stone = odsM(0x3A2A26), gold = odsM(0xB8903A, { e: 0x2A1A06 });
var cols = [0x6A1414, 0x3A1A4A, 0x14284A, 0x4A3A14, 0x1A3A24, 0x5A2A14, 0x2A2A2A, 0x4A1430, 0x143A3A];
for (var z = -14, k = 0; z > -196; z -= lite ? 44 : 22, k++) {
if (!odpBlock(X, z, 1) && !odpBlock(X, z - 3, 1)) {
if (k % 2 === 0) {
otmBox(2.2, 0.5, 2.2, stone, X, 0.25, z, P);
otmBox(1.2, 7, 1.2, obs, X, 4, z, P);
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.2, 4), gold);
tip.position.set(X, 8.1, z);
tip.rotation.y = Math.PI / 4;
P.add(tip);
OTK.solids.push({ x: X, z: z, hw: 1.15, hd: 1.15, rot: 0, b: 0, h: 8 });
}
else {
otmCyl(1.8, 0.6, stone, X, 0.3, z, P, lite ? 14 : 24, 2.0);
otmCyl(1.5, 0.1, odsM(0x1A0A06), X, 0.62, z, P, lite ? 14 : 24);
odpFire(X, 0.7, z, 3.2, 0xFF6A28, P);
otmRound(X, z, 2.0, 0, 1);
}
}
[-9, 9].forEach(function (s, j) {
var x = X + s, bz = z - 11;
if (odpBlock(x, bz, 1))
return;
otmCyl(0.07, 7, odsM(0x1A1414), x, 3.5, bz, P, 6);
otmBox(1.2, 0.06, 0.06, gold, x, 6.9, bz, P);
var b = otmPlane(1.1, 3.6, odsM(cols[(k * 2 + j) % 9], { ds: 1 }), x, 5.0, bz, Math.PI / 2, P);
otmRound(x, bz, 0.2, 0, 7);
});
if (!lite || k % 2 === 0)
[-14, 14].forEach(function (s) {
var x = X + s, bz = z - 5;
if (odpBlock(x, bz, 1) || odpBlock(x, bz + 1.2, 1) || odpBlock(x, bz - 1.2, 1))
return;
otmBox(0.6, 0.12, 2.4, stone, x, 0.48, bz, P);
otmBox(0.5, 0.42, 0.3, stone, x, 0.21, bz - 0.9, P);
otmBox(0.5, 0.42, 0.3, stone, x, 0.21, bz + 0.9, P);
OTK.solids.push({ x: x, z: bz, hw: 0.35, hd: 1.25, rot: 0, b: 0, h: 0.55 });
var ux = x + (s < 0 ? -2.6 : 2.6), uz = bz + 5;
if (!odpBlock(ux, uz, 1)) {
otmCyl(0.55, 1.4, obs, ux, 0.7, uz, P, 12, 0.35);
otmCyl(0.6, 0.12, gold, ux, 1.42, uz, P, 12);
otmRound(ux, uz, 0.6, 0, 1.5);
}
});
}
ODS.court = P;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), o = 0;
list.forEach(function (g) { if (!g.attributes.normal)
g.computeVertexNormals(); P.set(g.attributes.position.array, o * 3); N.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
return G;
},
function () {
var lite = ODP.lite, Y = ODP_RING[5].y, P = otmP(), M = new THREE.Matrix4(), rn = 1234;
function R() { rn = (rn * 16807) % 2147483647; return rn / 2147483647; }
function inst(geo, mat, list, name) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geo, mat, list.length);
list.forEach(function (m, i) { im.setMatrixAt(i, m); });
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
im.userData.noSit = 1;
im.name = name;
P.add(im);
return im;
}
var gate = ODP_T[5], arr = odpArr(5);
function clear(f, r) { var d = Math.abs(odpDA(f, gate)) * r; if (d < 14)
return false; if (Math.abs(odpDA(f, arr)) * r < 6)
return false; return true; }
var mud = [], pool = [], nM = lite ? 140 : 380;
for (var i = 0; i < nM; i++) {
var f = R() * Math.PI * 2, r = 125.4 + R() * 13.2;
if (!clear(f, r))
continue;
var P0 = odpAt(r, f), s = 1.2 + R() * 3.2;
if (i % 4 === 0)
pool.push(odpM4(P0.x, Y + 0.035, P0.z, -Math.PI / 2, 0, R() * 6.28, s * 0.7));
else
mud.push(odpM4(P0.x, Y + 0.025, P0.z, -Math.PI / 2, 0, R() * 6.28, s));
}
var disc = new THREE.CircleGeometry(1, lite ? 8 : 12);
disc.scale(1, 0.7, 1);
inst(disc, otmMat(0x1E1A14, null), mud, "osb-mud");
var pm = otmMat(0x0A0C0A, null);
pm.userData.realRough = 0.85;
inst(disc.clone(), pm, pool, "osb-pools");
var tus = [], nT = lite ? 260 : 800, bl = [];
for (var q = 0; q < 7; q++) {
var cg = new THREE.ConeGeometry(0.035, 0.5 + (q % 3) * 0.15, 3, 1);
cg.translate(0, 0.25 + (q % 3) * 0.075, 0);
cg.rotateZ((q % 2 ? 1 : -1) * (0.15 + q * 0.05));
cg.rotateY(q * 0.9);
cg.translate(Math.cos(q * 0.9) * 0.08, 0, Math.sin(q * 0.9) * 0.08);
bl.push(cg.toNonIndexed());
}
var tg = otmMergeBlades(bl);
for (i = 0; i < nT; i++) {
var ft = R() * Math.PI * 2, rt = 124.6 + Math.pow(R(), 1.6) * 14.6;
if (!clear(ft, rt))
continue;
var Pt = odpAt(rt, ft);
tus.push(odpM4(Pt.x, Y, Pt.z, (R() - 0.5) * 0.2, R() * 6.28, 0, 0.7 + R() * 0.8));
}
var tm = otmMat(0x2E3018, null);
inst(tg, tm, tus, "osb-tussocks");
var st = [], nS = lite ? 60 : 180;
for (i = 0; i < nS; i++) {
var fs = R() * Math.PI * 2, rs = 125 + R() * 14;
if (!clear(fs, rs))
continue;
var Ps = odpAt(rs, fs);
st.push(odpM4(Ps.x, Y + 0.05, Ps.z, R(), R() * 6, R(), 0.35 + R() * 0.7));
}
var sg = new THREE.DodecahedronGeometry(1, 0);
sg.scale(1, 0.5, 0.8);
inst(sg, otmMat(0x2A2622, "stone"), st, "osb-stones");
var tr = [], lb = [], nTr = lite ? 14 : 36;
for (i = 0; i < nTr; i++) {
var fr = i / nTr * Math.PI * 2 + R() * 0.1, rr = 127 + R() * 10;
if (!clear(fr, rr))
continue;
var Pr = odpAt(rr, fr), h = 2 + R() * 4.5, lean = (R() - 0.5) * 0.3;
var m = new THREE.Matrix4().compose(new THREE.Vector3(Pr.x, Y + h / 2 - 0.2, Pr.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(lean, R() * 6, lean * 0.6)), new THREE.Vector3(1, h, 1));
tr.push(m);
for (var b = 0; b < (lite ? 1 : 3); b++) {
var bh = h * (0.45 + b * 0.2), a = R() * 6.28, l = 0.9 + R() * 1.6;
lb.push(new THREE.Matrix4().compose(new THREE.Vector3(Pr.x + Math.cos(a) * l * 0.35, Y + bh + l * 0.3, Pr.z + Math.sin(a) * l * 0.35), new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9)), new THREE.Vector3(0.5, l, 0.5)));
}
otmRound(Pr.x, Pr.z, 0.35, Y, h);
}
var bark = otmMat(0x4A4640, "bark");
var tg2 = new THREE.CylinderGeometry(0.16, 0.32, 1, 6);
inst(tg2, bark, tr, "osb-trunks");
var lg = new THREE.CylinderGeometry(0.04, 0.12, 1, 5);
inst(lg, bark, lb, "osb-limbs");
var rd = [], nR = lite ? 700 : 2200;
for (i = 0; i < nR; i++) {
var fq = R() * Math.PI * 2, rq = R() < 0.6 ? 122.2 + R() * 1.6 : 116.6 + R() * 5.6;
if (Math.abs(odpDA(fq, gate)) * rq < 8)
continue;
var Pq = odpAt(rq, fq);
rd.push(odpM4(Pq.x, -157 + 0.55, Pq.z, (R() - 0.5) * 0.35, 0, (R() - 0.5) * 0.35, 0.6 + R() * 0.8));
}
inst(new THREE.CylinderGeometry(0.02, 0.03, 1.6, 4), otmMat(0x2A3A1A, null), rd, "osb-reeds");
var nb = lite ? 30 : 90, bm = otmMat(0x1E241C, null, { phong: 80, spec: 0x303030 }), bg = new THREE.SphereGeometry(1, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2);
var bi = new THREE.InstancedMesh(bg, bm, nb);
bi.userData.keep = 1;
bi.userData.noSit = 1;
bi.name = "osb-bubbles";
P.add(bi);
OSB.bub = bi;
OSB.bubs = [];
for (i = 0; i < nb; i++) {
var fb = R() * Math.PI * 2, rb = 116.8 + R() * 6.4, Pb = odpAt(rb, fb);
OSB.bubs.push({ x: Pb.x, z: Pb.z, ph: R() * 20, per: 6 + R() * 8, s: 0.08 + R() * 0.14 });
}
osbBubbles(0);
},
function (t) {
var B = OSB.bub;
if (!B || !B.parent)
return;
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S = new THREE.Vector3();
OSB.bubs.forEach(function (b, i) { var u = ((t + b.ph) % b.per) / b.per, s = b.s * (u < 0.8 ? (0.3 + u * 0.9) : Math.max(0.01, (1 - u) * 5)); V.set(b.x, -157 + 0.01, b.z); S.set(s, s * 0.8, s); M.compose(V, Q, S); B.setMatrixAt(i, M); });
B.instanceMatrix.needsUpdate = true;
}
];
});
