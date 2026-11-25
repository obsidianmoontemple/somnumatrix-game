/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(437, function () {
"use strict";
return [
function (c) {
var d = aptDefaults();
if (!c || typeof c !== "object")
return d;
var p = Math.round(+c.price);
if (!(p >= 0 && p <= 500))
p = d.price;
var ch = Math.round(+c.charter);
if (!(ch >= 1 && ch <= 10))
ch = d.charter;
return { open: c.open !== false, flights: c.flights !== false, price: p, charter: ch, traffic: c.traffic !== false, fly: c.fly !== false, school: c.school !== false,
talk: c.talk !== false, grounded: !!c.grounded, notes: String(c.notes || "").slice(0, 1200) };
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (APT.mats[k])
return APT.mats[k];
var cc = new THREE.Color(col), lum = 0.2126 * cc.r + 0.7152 * cc.g + 0.0722 * cc.b;
if (lum > 0.66 && o.e === undefined && !o.keepLum)
cc.multiplyScalar(0.66 / lum);
var m = o.phong && !APT.lite ? new THREE.MeshPhongMaterial({ color: cc, shininess: o.phong, specular: o.spec || 0x333333 }) : new THREE.MeshLambertMaterial({ color: cc });
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
APT.mats[k] = m;
return m;
},
function (key, w, h, draw, o) {
o = o || {};
var k = "cv|" + key;
if (APT.mats[k])
return APT.mats[k];
if (APT.lite && !o.full) {
w = Math.max(64, w >> 1);
h = Math.max(64, h >> 1);
}
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d");
try {
draw(x, w, h);
}
catch (e) { }
var t = new THREE.CanvasTexture(cv);
t.anisotropy = 4;
if (!o.live)
t.onUpdate = function () { var tt = this; setTimeout(function () { if (tt.image && tt.image.getContext) {
tt.image.width = 1;
tt.image.height = 1;
} }, 0); };
if (o.rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(o.rep[0], o.rep[1]);
}
var m = o.basic ? new THREE.MeshBasicMaterial({ map: t, transparent: !!o.op, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide, depthWrite: !o.op })
: new THREE.MeshLambertMaterial({ map: t, side: o.ds ? THREE.DoubleSide : THREE.FrontSide, transparent: !!o.tr, depthWrite: !o.tr });
if (o.e) {
m.emissive = new THREE.Color(0xFFFFFF);
m.emissiveMap = t;
m.emissiveIntensity = o.e;
}
m.userData.cv = cv;
m.userData.tex = t;
APT.mats[k] = m;
return m;
},
function (r, h, mat, x, y, z, parent, seg, r2) {
var k = "c" + r.toFixed(2) + "," + h.toFixed(2) + "," + (r2 === undefined ? r : r2).toFixed(2) + "," + (seg || 14), g = APT.geos[k];
if (!g) {
g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, h, seg || 14);
if (typeof metreUVs === "function")
metreUVs(g, "cyl", [r, r2 === undefined ? r : r2, h]);
APT.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || aptP()).add(m);
return m;
},
function (K) {
K.grid = {};
var put = function (s, x0, z0, x1, z1) { for (var i = Math.floor(x0 / 50); i <= Math.floor(x1 / 50); i++)
for (var j = Math.floor(z0 / 50); j <= Math.floor(z1 / 50); j++) {
var k = i + "," + j;
(K.grid[k] || (K.grid[k] = [])).push(s);
} };
K.solids.forEach(function (s) { var e = (s.r !== undefined ? s.r : Math.hypot(s.hw, s.hd)) + 0.5; put(s, s.x - e, s.z - e, s.x + e, s.z + e); });
},
function (K, x, z, feet) {
var L = K.grid[Math.floor(x / 50) + "," + Math.floor(z / 50)] || [];
for (var i = 0; i < L.length; i++) {
var s = L[i];
if (feet > (s.b || 0) + s.h - 0.3)
continue;
if (feet + 1.7 < (s.b || 0))
continue;
if (s.when && !s.when())
continue;
var dx = x - s.x, dz = z - s.z;
if (s.r !== undefined) {
if (dx * dx + dz * dz < (s.r + 0.35) * (s.r + 0.35))
return true;
continue;
}
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
if (Math.abs(lx) < s.hw + 0.35 && Math.abs(lz) < s.hd + 0.35)
return true;
}
if (feet < 1.5 && aptOnLake(x, z, 1) && !aptOnDock(x, z) && !(APT.fly && APT.fly.spec.water))
return true;
return false;
},
function (dir, a, b, c, y, h, t, mat, opens) {
opens = (opens || []).filter(Boolean).slice().sort(function (p, q) { return p.at - q.at; });
var lo = Math.min(a, b), hi = Math.max(a, b), cur = lo;
function seg(s0, s1, y0, y1, solid) {
if (s1 - s0 < 0.02 || y1 - y0 < 0.02)
return;
var mid = (s0 + s1) / 2, len = s1 - s0, hh = y1 - y0;
if (dir === "x")
aptBox(len, hh, t, mat, mid, y0 + hh / 2, c);
else
aptBox(t, hh, len, mat, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
aptSolid(mid, c, len / 2, t / 2, y0, hh);
else
aptSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2), sill = O.sill || 0, top = Math.min(h, sill + (O.h || 2.6)), yb = y + sill;
seg(cur, s0, y, y + h, true);
seg(s0, s1, y + top, y + h, false);
if (sill > 0)
seg(s0, s1, y, yb, true);
if (O.glass) {
var gm = aptGlass();
if (dir === "x")
aptBox(s1 - s0, top - sill, 0.05, gm, (s0 + s1) / 2, yb + (top - sill) / 2, c);
else
aptBox(0.05, top - sill, s1 - s0, gm, c, yb + (top - sill) / 2, (s0 + s1) / 2);
if (dir === "x")
aptSolid((s0 + s1) / 2, c, (s1 - s0) / 2, t / 2, yb, top - sill);
else
aptSolid(c, (s0 + s1) / 2, t / 2, (s1 - s0) / 2, yb, top - sill);
var n = Math.floor((s1 - s0) / 2.4);
for (var i = 1; i < n; i++) {
var at = s0 + i * (s1 - s0) / n;
if (dir === "x")
aptBox(0.1, top - sill, 0.16, aptMat(0x3A4048, "metal", { phong: 40 }), at, yb + (top - sill) / 2, c);
else
aptBox(0.16, top - sill, 0.1, aptMat(0x3A4048, "metal", { phong: 40 }), c, yb + (top - sill) / 2, at);
}
}
cur = s1;
});
seg(cur, hi, y, y + h, true);
},
function (key, title, text, w, h, x, y, z, ry, o) {
o = o || {};
var bg = o.bg || "#F2F4F6", fg = o.fg || "#1E2630", ac = o.ac || "#1F4E8C";
var PW = APT.lite ? 256 : 384;
var m = aptCanvasMat("pl-" + key, PW, Math.round(PW * h / w), function (c, W, H) {
c.fillStyle = bg;
c.fillRect(0, 0, W, H);
c.fillStyle = ac;
c.fillRect(0, 0, W, W / 9);
c.fillStyle = "#FFFFFF";
c.font = "bold " + Math.round(W / 20) + "px system-ui,Arial";
c.textAlign = "center";
c.fillText(title, W / 2, W / 14);
c.fillStyle = fg;
c.textAlign = "left";
var fs = Math.round(W / 28);
c.font = fs + "px system-ui,Arial";
var yy = W / 9 + fs * 1.6;
String(text).split("\n").forEach(function (par) {
var words = par.split(" "), line = "";
words.forEach(function (wd) { var t = line ? line + " " + wd : wd; if (c.measureText(t).width > W - 48) {
c.fillText(line, 24, yy);
yy += fs * 1.28;
line = wd;
}
else
line = t; });
if (line) {
c.fillText(line, 24, yy);
yy += fs * 1.28;
}
yy += fs * 0.35;
});
}, { full: true, basic: true });
m.color.setHex(0x8E8E8E);
var p = aptPlane(w, h, m, x, y, z, ry, o.parent);
p.userData.keep = 1;
return p;
},
function (seed, x, y, z, ry, look, title) {
var g = null;
try {
if (typeof wPerson === "function")
g = wPerson("apt_" + seed, { look: look || null, title: title || "", place: "Somnucor Airport" });
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
aptCyl(0.22, 1.5, aptMat(0x2A3A5A, null), 0, 0.75, 0, g, 10, 0.3);
aptSph(0.17, aptMat(0xC89A70, null), 0, 1.66, 0, g, 10);
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
aptP().add(g);
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function (arch, x, z, ry, s, o) {
o = o || {};
var g = null;
try {
if (typeof build === "function")
g = build({ id: "apt_" + arch + "_" + Math.round(x) + "_" + Math.round(z), archetype: arch, attrs: Object.assign({ s: s || 1 }, o.attrs || {}), x: 0, z: 0, rot: 0, solid: false, detail: APT.lite ? 2 : 3, nights: [] });
}
catch (e) {
g = null;
}
if (!g)
return null;
g.position.set(x, o.y || 0, z);
g.rotation.y = ry || 0;
if (o.keep)
g.userData.keep = 1;
aptP().add(g);
if (o.solid)
aptRound(x, z, o.solid, 0, 3);
return g;
},
function (D) {
if (D.k === "storms")
return typeof stcGo === "function";
if (D.k === "wonders")
return typeof wndGo === "function";
if (D.k === "sports")
return typeof sptGo === "function";
if (D.k === "greenwold")
return typeof gwGo === "function" || (typeof WORLDS !== "undefined" && !!WORLDS.greenwold);
return typeof hpGoWorld === "function";
},
function () {
return aptCanvasMat("rwy", 1024, 64, function (c, W, H) {
c.fillStyle = "#3A3C40";
c.fillRect(0, 0, W, H);
var r = aptRnd(9);
for (var i = 0; i < 2600; i++) {
var v = 50 + Math.floor(r() * 30);
c.fillStyle = "rgba(" + v + "," + v + "," + (v + 3) + ",0.6)";
c.fillRect(r() * W, r() * H, 1 + r() * 2, 1);
}
[[0.06, 0.2], [0.8, 0.94]].forEach(function (z) { for (var k = 0; k < 500; k++) {
c.fillStyle = "rgba(20,20,22,0.18)";
c.fillRect((z[0] + r() * (z[1] - z[0])) * W, H * 0.3 + r() * H * 0.4, 4 + r() * 20, 1 + r() * 2);
} });
c.fillStyle = "#E8E8E2";
c.fillRect(0, 2, W, 2);
c.fillRect(0, H - 4, W, 2);
for (var x = 0.04 * W; x < 0.96 * W; x += W / 44)
c.fillRect(x, H / 2 - 1, W / 88, 2);
for (var b = 0; b < 8; b++) {
var yy = 4 + b * (H - 8) / 8 + 1.5;
c.fillRect(W * 0.004, yy, W * 0.018, (H - 8) / 8 - 3);
c.fillRect(W * 0.978, yy, W * 0.018, (H - 8) / 8 - 3);
}
[0.07, 0.1, 0.13, 0.87, 0.9, 0.93].forEach(function (px) { c.fillRect(px * W, H * 0.18, W * 0.012, H * 0.1); c.fillRect(px * W, H * 0.72, W * 0.012, H * 0.1); });
[0.16, 0.84].forEach(function (px) { c.fillRect(px * W, H * 0.14, W * 0.03, H * 0.18); c.fillRect(px * W, H * 0.68, W * 0.03, H * 0.18); });
c.save();
c.translate(W * 0.034, H / 2);
c.rotate(Math.PI / 2);
c.font = "bold " + Math.round(H * 0.5) + "px Arial";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("09", 0, 0);
c.restore();
c.save();
c.translate(W * 0.966, H / 2);
c.rotate(-Math.PI / 2);
c.font = "bold " + Math.round(H * 0.5) + "px Arial";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("27", 0, 0);
c.restore();
}, { full: true });
},
function () {
var R = APT_RWY, L = APT.lite;
var ground = null;
if (typeof wGround === "function") {
var gmat = new THREE.MeshLambertMaterial({ vertexColors: true });
APT.mats["ground"] = gmat;
ground = wGround(14000, L ? 48 : 96, function (x, z) {
var h = aptLand(x, z), n = typeof wFbm === "function" ? wFbm(x / 140, z / 140, 5, 3) : 0.5;
var col = h > 120 ? 0x6A7A50 : (n > 0.55 ? 0x5E7A3C : n > 0.42 ? 0x6A8642 : 0x76904A);
if (aptOnLake(x, z, -6))
col = 0x5A6A48;
return [aptOnLake(x, z, 0) ? -2.5 : h - 0.12, col];
}, gmat);
var gt = typeof texOf === "function" ? texOf("grass") : null;
if (gt) {
var g2 = gt.clone();
g2.needsUpdate = true;
g2.wrapS = g2.wrapT = THREE.RepeatWrapping;
g2.repeat.set(900, 900);
ground.material.map = g2;
APT.mats["groundtex"] = g2;
}
aptP().add(ground);
}
var len = R.x1 - R.x0, rw = aptFlat(len, R.w, aptRunwayTex(), 0, 0.1, 0);
rw.userData.keep = 1;
aptFlat(len + 120, R.w + 14, aptMat(0x5A5C58, "asphalt"), 0, 0.03, 0);
[R.x0 - 45, R.x1 + 45].forEach(function (x) { var bp = aptCanvasMat("blast", 128, 128, function (c, W, H) { c.fillStyle = "#4A4C4E"; c.fillRect(0, 0, W, H); c.fillStyle = "#D8B030"; for (var i = -2; i < 6; i++) {
c.save();
c.translate(i * W / 3, 0);
c.rotate(0.6);
c.fillRect(0, -H, W / 14, H * 3);
c.restore();
} }); aptFlat(60, R.w, bp, x, 0.1, 0); });
var tw = aptCanvasMat("twy2", 256, 256, function (c, W, H) {
c.fillStyle = "#4A4C4E";
c.fillRect(0, 0, W, H);
var r = aptRnd(4);
for (var i = 0; i < 5200; i++) {
var v = 64 + Math.floor(r() * 14);
c.fillStyle = "rgba(" + v + "," + v + "," + (v + 2) + ",0.45)";
c.fillRect(r() * W, r() * H, 1, 1);
}
c.fillStyle = "#E0B828";
c.fillRect(0, H / 2 - 1, W, 2);
}, { rep: [262, 1], full: true });
aptFlat(2100, 23, tw, 0, 0.08, R.twz);
var links = [-1040, -420, 0, 420, 1040];
links.forEach(function (x) {
var m = aptCanvasMat("twl", 32, 256, function (c, W, H) { c.fillStyle = "#46484A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E0B828"; c.fillRect(W / 2 - 1, 0, 2, H); });
aptFlat(23, R.twz * -1 - R.w / 2 - 11, m, x, 0.085, R.twz / 2 - R.w / 4 - 4.5);
var hl = aptCanvasMat("hold", 64, 32, function (c, W, H) { c.fillStyle = "#46484A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E0B828"; c.fillRect(0, 4, W, 3); c.fillRect(0, 11, W, 3); for (var i = 0; i < W; i += 12) {
c.fillRect(i, 19, 7, 3);
c.fillRect(i, 26, 7, 3);
} });
aptFlat(23, 3, hl, x, 0.11, -R.w / 2 - 26);
var sg = aptCanvasMat("rwsign", 256, 64, function (c, W, H) { c.fillStyle = "#C8201E"; c.fillRect(0, 0, W, H); c.fillStyle = "#FFFFFF"; c.font = "bold 40px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("09 - 27", W / 2, H / 2 + 2); }, { full: true, basic: true });
var s = aptBox(3.2, 0.8, 0.25, aptMat(0x222222, null), x + 16, 0.6, -R.w / 2 - 26);
aptPlane(3.1, 0.75, sg, x + 16, 0.6, -R.w / 2 - 25.86, 0);
var nm = x === -1040 ? "A1" : x === -420 ? "A2" : x === 0 ? "A3" : x === 420 ? "A4" : "A5";
var ys = aptCanvasMat("tsign" + nm, 128, 64, function (c, W, H) { c.fillStyle = "#1A1A1A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E8C020"; c.font = "bold 40px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(nm, W / 2, H / 2 + 2); }, { full: true, basic: true });
aptBox(1.6, 0.8, 0.25, aptMat(0x222222, null), x - 16, 0.6, -R.w / 2 - 26);
aptPlane(1.5, 0.75, ys, x - 16, 0.6, -R.w / 2 - 25.86, 0);
aptSolid(x + 16, -R.w / 2 - 26, 1.6, 0.2, 0, 1);
aptSolid(x - 16, -R.w / 2 - 26, 0.8, 0.2, 0, 1);
});
var slab = aptCanvasMat("slab", 512, 512, function (c, W, H) {
var r = aptRnd(7), q = W / 4;
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var v = 150 + Math.floor(r() * 16);
c.fillStyle = "rgb(" + v + "," + v + "," + (v - 5) + ")";
c.fillRect(i * q, j * q, q, q);
}
for (var k = 0; k < 9000; k++) {
var v2 = 120 + Math.floor(r() * 70);
c.fillStyle = "rgba(" + v2 + "," + v2 + "," + (v2 - 4) + ",0.35)";
c.fillRect(r() * W, r() * H, 1 + r() * 2, 1 + r() * 2);
}
for (var s2 = 0; s2 < 10; s2++) {
var sx = r() * W, sy = r() * H, sr = 10 + r() * 40, g = c.createRadialGradient(sx, sy, 0, sx, sy, sr);
g.addColorStop(0, "rgba(60,56,50,0.28)");
g.addColorStop(1, "rgba(60,56,50,0)");
c.fillStyle = g;
c.fillRect(sx - sr, sy - sr, sr * 2, sr * 2);
}
c.strokeStyle = "rgba(40,40,40,0.25)";
c.lineWidth = 5;
for (var t = 0; t < 3; t++) {
c.beginPath();
var tx = r() * W;
c.moveTo(tx, 0);
c.bezierCurveTo(tx + r() * 120 - 60, H * 0.4, tx + r() * 160 - 80, H * 0.7, tx + r() * 200 - 100, H);
c.stroke();
}
c.strokeStyle = "rgba(70,68,64,0.55)";
c.lineWidth = 1.6;
for (var l = 0; l <= 4; l++) {
c.beginPath();
c.moveTo(l * q, 0);
c.lineTo(l * q, H);
c.moveTo(0, l * q);
c.lineTo(W, l * q);
c.stroke();
}
}, { rep: [26, 8] });
aptFlat(520, 160, slab, 0, 0.075, -205);
var ap = aptCanvasMat("apronpaint", 1024, 512, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "#E0B828";
c.lineWidth = 4;
[-75, -25, 25, 75].forEach(function (gx) {
var px = (gx + 260) / 520 * W;
c.beginPath();
c.moveTo(px, 0);
c.lineTo(px, H * 0.62);
c.quadraticCurveTo(px, H * 0.78, px + W * 0.04, H * 0.82);
c.stroke();
c.fillStyle = "#E0B828";
for (var st = 0; st < 3; st++)
c.fillRect(px - 10, H * (0.08 + st * 0.05), 20, 4);
c.font = "bold 22px Arial";
c.textAlign = "center";
c.fillText(String(1 + (gx + 75) / 50), px + 26, H * 0.22);
});
c.beginPath();
c.moveTo(0, H * 0.82);
c.lineTo(W, H * 0.82);
c.stroke();
c.setLineDash([18, 12]);
c.strokeStyle = "#F0F0EA";
c.lineWidth = 3;
c.beginPath();
c.moveTo(0, H * 0.56);
c.lineTo(W, H * 0.56);
c.stroke();
c.setLineDash([]);
c.strokeStyle = "#C83030";
c.lineWidth = 3;
c.strokeRect(W * 0.03, H * 0.02, W * 0.94, H * 0.5);
}, { full: true, tr: true });
aptFlat(520, 160, ap, 0, 0.09, -205);
aptFlat(520, 24, aptMat(0x4A4C4E, "asphalt"), 0, 0.05, -122);
aptFlat(130, 90, aptMat(0x8E8E8A, "concrete"), -270, 0.07, -245);
aptFlat(90, 70, aptMat(0x8E8E8A, "concrete"), 330, 0.07, -170);
aptLightRow(0xF8F4E8, function (push) { for (var x = R.x0; x <= R.x1; x += 60) {
push(x, 0.5, R.w / 2 + 1.5);
push(x, 0.5, -R.w / 2 - 1.5);
} }, L ? 2.0 : 2.6);
aptLightRow(0x6A8AFF, function (push) { for (var x = -1050; x <= 1050; x += 50) {
push(x, 0.4, R.twz + 12.5);
push(x, 0.4, R.twz - 12.5);
} }, L ? 1.6 : 2.1);
aptLightRow(0x5AF07A, function (push) { for (var z = -R.w / 2; z <= R.w / 2; z += 3.5)
push(R.x0 - 1, 0.4, z); for (var z2 = -R.w / 2; z2 <= R.w / 2; z2 += 3.5)
push(R.x1 + 1, 0.4, z2); }, 2.2);
aptLightRow(0xFFF6DA, function (push) { for (var d = 60; d <= 600; d += 60) {
for (var k = -3; k <= 3; k++) {
push(R.x0 - d, 1.2, k * 1.6);
push(R.x1 + d, 1.2, k * 1.6);
}
} }, L ? 2.4 : 3.0);
for (var d = 60; d <= 600; d += 60) {
[R.x0 - d, R.x1 + d].forEach(function (x) { aptBox(0.3, 1.1, 12, aptMat(0x7A7A7A, "metal"), x, 0.55, 0); });
}
APT.papi = [];
[[R.x0 + 300, 1], [R.x1 - 300, -1]].forEach(function (P) { var row = []; for (var i = 0; i < 4; i++) {
var b = aptBox(1.1, 0.9, 0.9, aptMat(0x2A2A2A, null), P[0], 0.45, -R.w / 2 - 15 - i * 9);
var gl = aptLamp(P[0] + P[1] * 0.6, 0.6, -R.w / 2 - 15 - i * 9, i < 2 ? 0xFFFFFF : 0xFF3A2A, 3.2, 0.75);
row.push(gl);
} APT.papi.push({ x: P[0], dir: P[1], row: row }); });
APT.socks = [];
[[R.x0 + 160, -R.w / 2 - 40], [R.x1 - 160, -R.w / 2 - 40], [300, -260]].forEach(function (p) {
var pole = aptCyl(0.09, 6, aptMat(0xD8D8D8, "metal"), p[0], 3, p[1]);
var sock = aptGroup(p[0], 6, p[1]);
var cone = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.7, 3.4, 14, 4, true), aptCanvasMat("sock", 64, 64, function (c, W, H) { for (var i = 0; i < 5; i++) {
c.fillStyle = i % 2 ? "#F2F2F2" : "#E8641E";
c.fillRect(0, i * H / 5, W, H / 5);
} }, { ds: true }));
cone.rotation.z = Math.PI / 2;
cone.position.x = 1.7;
sock.add(cone);
APT.socks.push(sock);
aptRound(p[0], p[1], 0.2, 0, 6);
});
var fence = aptMat(0x7A8086, "metal", { op: 0.55 });
[[-1400, -1400, 1400, -1400], [1400, -1400, 1400, 900], [1400, 900, -1400, 900], [-1400, 900, -1400, -1400]].forEach(function (s) { var len2 = Math.hypot(s[2] - s[0], s[3] - s[1]); var m = aptBox(len2, 2.4, 0.05, fence, (s[0] + s[2]) / 2, 1.2, (s[1] + s[3]) / 2); m.rotation.y = -Math.atan2(s[3] - s[1], s[2] - s[0]); });
aptTrees();
var lake = new THREE.Mesh(new THREE.CircleGeometry(1, L ? 40 : 72), new THREE.MeshPhongMaterial({ color: 0x2E5A6A, shininess: L ? 10 : 70, specular: 0x8AAABB, transparent: true, opacity: 0.92 }));
APT.mats["lake"] = lake.material;
lake.rotation.x = -Math.PI / 2;
lake.scale.set(APT_LAKE.rx, APT_LAKE.rz, 1);
lake.position.set(APT_LAKE.x, 0.05, APT_LAKE.z);
aptP().add(lake);
APT.lake = lake;
var wood = aptMat(0x8A6A48, "wood");
aptBox(4, 0.3, 62, wood, 0, 0.55, 321);
aptFloor(-2, 290, 2, 352, 0.7);
for (var pz = 292; pz < 352; pz += 6) {
[-1.8, 1.8].forEach(function (px) { aptCyl(0.14, 2.6, aptMat(0x5A4430, "wood"), px, -0.5, pz, null, 8); });
}
aptBox(18, 0.3, 4, wood, 0, 0.55, 352);
aptFloor(-9, 350, 9, 354, 0.7);
aptBuildingBox(-14, 268, -4, 282, 3.6, aptMat(0xD8D0C0, "siding"), "The seaplane shed", [{ side: "s", at: -9, w: 2 }]);
aptSign(["SEAPLANE DOCK", "float planes · the lake"], 5, 1, "#1F4E8C", "#FFFFFF", 0, 3.2, 287.5, Math.PI);
aptFlat(30, 2080, aptMat(0x45474A, "asphalt"), 0, 0.04, -1560);
aptFlat(260, 26, aptMat(0x45474A, "asphalt"), 0, 0.04, -400);
aptFlat(240, 8, aptMat(0xB8B6B0, "paving"), 0, 0.15, -377);
aptFloor(-120, -381, 120, -373, 0.15);
var cp = aptCanvasMat("carpark", 256, 256, function (c, W, H) { c.fillStyle = "#4A4C4E"; c.fillRect(0, 0, W, H); c.strokeStyle = "#E8E8E2"; c.lineWidth = 2; for (var r2 = 0; r2 < 4; r2++)
for (var i = 0; i < 16; i++) {
c.strokeRect(i * W / 16, r2 * H / 4 + 4, W / 16, H / 8);
} });
aptFlat(300, 90, cp, 0, 0.04, -470);
var cars = ["car", "van", "coupe", "car", "vintagecar", "car"], cr = aptRnd(41), n = L ? 10 : 28;
for (var i = 0; i < n; i++) {
var cx = -140 + (i % 14) * 20 + cr() * 4, cz = -500 + Math.floor(i / 14) * 30 + (cr() < 0.5 ? 0 : 14);
aptKit(cars[i % cars.length], cx, cz, cr() < 0.5 ? 0 : Math.PI, 1, { keep: true });
aptSolid(cx, cz, 1.1, 2.4, 0, 1.6);
}
aptKit("bus", -70, -392, Math.PI / 2, 1, { keep: true });
aptSolid(-70, -392, 6, 1.6, 0, 3.4);
aptKit("taxicab", 60, -392, -Math.PI / 2, 1, { keep: true });
aptKit("taxicab", 72, -392, -Math.PI / 2, 1, { keep: true });
aptSolid(66, -392, 8, 1.2, 0, 1.6);
aptSign(["AIRPORT SHUTTLE", "to Somnucor, the Tower Plaza · press E"], 5, 1, "#1F4E8C", "#FFFFFF", -70, 3.6, -384.5, Math.PI);
aptSpot(-70, -385, 4, "The airport shuttle", "ride back to the city", function () { aptShuttleHome(); });
aptSign(["TAXI"], 2.4, 0.7, "#E8C020", "#1A1A1A", 66, 2.8, -384.5, Math.PI);
aptFrontDressed(L);
},
function (L) {
var pave = aptMat(0xB8B6B0, "paving"), steel = aptMat(0x5A5E64, "metal"), roofM = aptMat(0xD8DCE0, "metal");
aptFlat(200, 13, pave, 0, 0.16, -366.5);
aptFloor(-100, -373, 100, -360, 0.16);
aptBox(84, 0.5, 12, roofM, 0, 5.6, -367);
for (var px = -40; px <= 40; px += 16) {
aptCyl(0.22, 5.6, steel, px, 2.8, -372.4, null, 10);
aptRound(px, -372.4, 0.3, 0, 5.6);
}
var gl = aptGlowM(0xFFF0D0);
for (var lx = -36; lx <= 36; lx += 12)
aptBox(6, 0.06, 0.5, gl, lx, 5.32, -367);
for (var sx = -108; sx <= 108; sx += (L ? 36 : 24)) {
if (Math.abs(sx + 70) < 8 || Math.abs(sx - 66) < 9)
continue;
aptKit("streetlight", sx, -382, Math.PI, 1, { keep: true });
aptRound(sx, -382, 0.25, 0, 6);
}
if (!L)
for (var bx = -96; bx <= 96; bx += 4) {
if (Math.abs(bx + 70) < 9 || Math.abs(bx - 66) < 10 || Math.abs(bx + 10) < 4)
continue;
aptCyl(0.14, 0.9, steel, bx, 0.61, -380.6, null, 8);
aptRound(bx, -380.6, 0.2, 0, 1);
}
[-86, -56, 56, 86].forEach(function (x, i) {
aptBox(4, 0.7, 3, aptMat(0x8A8680, "concrete"), x, 0.51, -366, null);
aptSolid(x, -366, 2, 1.5, 0, 1);
aptKit(L ? "hedge" : "tree", x, -366, i * 1.3, L ? 0.45 : 0.7, { keep: true, y: 0.86, attrs: { c: 0x3F6E34 } });
aptKit("bench", x + (i < 2 ? 7 : -7), -367, Math.PI, 1, { keep: true });
aptSolid(x + (i < 2 ? 7 : -7), -367, 1.1, 0.4, 0, 1);
aptKit("trashcan", x + (i < 2 ? -4 : 4), -370, 0, 1, { keep: true });
});
},
function (col, fill, size) {
var pts = [];
fill(function (x, y, z) { pts.push(x, y, z); });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
var spr = typeof softGlow === "function" ? softGlow() : null;
var m = new THREE.PointsMaterial({ color: col, size: size || 2.4, map: spr, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, opacity: 0.95 });
APT.mats["pts|" + col + "|" + size] = m;
APT.geos["pts|" + col + "|" + pts.length + "|" + Math.random()] = g;
var p = new THREE.Points(g, m);
p.userData.keep = 1;
p.frustumCulled = false;
aptP().add(p);
return p;
},
function (x0, z0, x1, z1, h, wall, name, doors, o) {
o = o || {};
var t = 0.3, opens = { n: [], s: [], e: [], w: [] };
(doors || []).forEach(function (D) { opens[D.side].push({ at: D.at, w: D.w || 1.8, h: 2.5 }); });
["n", "s", "e", "w"].forEach(function (sd) {
var along = sd === "n" || sd === "s", a0 = along ? x0 : z0, a1 = along ? x1 : z1, n = Math.floor((a1 - a0) / (o.win || 5));
for (var i = 0; i < n; i++) {
var at = a0 + (i + 0.5) * (a1 - a0) / n;
if (opens[sd].some(function (q) { return Math.abs(q.at - at) < q.w / 2 + 1.1; }))
continue;
opens[sd].push({ at: at, w: 1.4, h: 1.4, sill: 1.0, glass: true });
}
});
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
aptBox(x1 - x0, 0.2, z1 - z0, o.floor || aptMat(0x9A9A96, "floortile"), cx, 0.0, cz);
aptFloor(x0, z0, x1, z1, 0.1);
aptWall("x", x0, x1, z0, 0, h, t, wall, opens.n);
aptWall("x", x0, x1, z1, 0, h, t, wall, opens.s);
aptWall("z", z0, z1, x0, 0, h, t, wall, opens.w);
aptWall("z", z0, z1, x1, 0, h, t, wall, opens.e);
aptBox(x1 - x0 + 0.6, 0.35, z1 - z0 + 0.6, o.roof || aptMat(0x5A5C60, "metalroof"), cx, h + 0.17, cz);
aptBox(x1 - x0 - 0.2, 0.06, z1 - z0 - 0.2, aptMat(0xE8E6E0, "plaster"), cx, h - 0.05, cz);
if (name)
APTK.rooms.push({ x0: x0, z0: z0, x1: x1, z1: z1, y: 0, h: h, name: name });
return { cx: cx, cz: cz };
},
function () {
var r = aptRnd(88), pts = [], n = APT.lite ? 160 : 420;
for (var i = 0; i < n && pts.length < n; i++) {
var a = r() * Math.PI * 2, d = 1480 + r() * 1600, x = Math.cos(a) * d, z = Math.sin(a) * d;
if (Math.abs(z) < 60 && Math.abs(x) < 3200)
continue;
if (Math.abs(x) < 40 && z < -1300)
continue;
pts.push([x, z, 0.7 + r() * 0.8]);
}
for (var j = 0; j < (APT.lite ? 20 : 60); j++) {
var a2 = r() * Math.PI * 2, x2 = APT_LAKE.x + Math.cos(a2) * (APT_LAKE.rx + 30 + r() * 80), z2 = APT_LAKE.z + Math.sin(a2) * (APT_LAKE.rz + 30 + r() * 80);
if (z2 < 120)
continue;
pts.push([x2, z2, 0.6 + r() * 0.6]);
}
var trunkG = new THREE.CylinderGeometry(0.22, 0.32, 1, 6), crownG = new THREE.IcosahedronGeometry(1, 1);
APT.geos["trunk"] = trunkG;
APT.geos["crown"] = crownG;
var tm = aptMat(0x5A4430, "bark"), cm = aptMat(0x3E6A2E, "foliage");
var T = new THREE.InstancedMesh(trunkG, tm, pts.length), C = new THREE.InstancedMesh(crownG, cm, pts.length), M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color();
pts.forEach(function (P, i) {
var h = P[2] * 9, y = aptLand(P[0], P[1]);
p.set(P[0], y + h * 0.3, P[1]);
s.set(P[2], h * 0.6, P[2]);
M.compose(p, q, s);
T.setMatrixAt(i, M);
p.set(P[0], y + h * 0.72, P[1]);
s.set(P[2] * 3.4, P[2] * 4.2, P[2] * 3.4);
M.compose(p, q, s);
C.setMatrixAt(i, M);
col.setHSL(0.27 + ((i * 37) % 10) / 120, 0.45, 0.28 + ((i * 13) % 10) / 90);
if (C.setColorAt)
C.setColorAt(i, col);
});
T.userData.keep = 1;
C.userData.keep = 1;
aptP().add(T);
aptP().add(C);
},
function () {
var T = APT_T, L = APT.lite, h = T.h, t = 0.35;
var wallM = aptMat(0xE4E2DC, "plaster"), clad = aptMat(0xB8BCC2, "metal", { phong: 30 }), floorM = aptMat(0xD8D4CC, "floortile", { phong: 40, spec: 0x444444 }), dark = aptMat(0x2A2E34, "metal", { phong: 40 });
aptBox(T.x1 - T.x0, 0.2, T.z1 - T.z0, floorM, 0, -0.09, (T.z0 + T.z1) / 2);
aptFloor(T.x0, T.z0, T.x1, T.z1, 0);
aptBox(T.x1 - T.x0, 0.3, T.z1 - T.z0, aptMat(0xF0EEE8, "plaster"), 0, h + 0.15, (T.z0 + T.z1) / 2);
aptBox(T.x1 - T.x0 + 4, 0.5, T.z1 - T.z0 + 4, clad, 0, h + 0.55, (T.z0 + T.z1) / 2);
aptFloor(T.x0, T.z0, T.x1, T.z1, h + 0.8);
var front = [{ at: -10, w: 6, h: 3.2 }, { at: T.arr, w: 6, h: 3.2 }], fg = [];
[[-96, -14], [-6, 56], [64, 96]].forEach(function (r) { fg.push({ at: (r[0] + r[1]) / 2, w: r[1] - r[0], h: 7.6, sill: 0.6, glass: true }); });
aptWall("x", T.x0, T.x1, T.z0, 0, h, t, clad, front.concat(fg));
var back = [];
T.gates.forEach(function (gx) { back.push({ at: gx, w: 2.6, h: 2.8 }); });
[[-98, -77], [-73, -27], [-23, 23], [27, 73], [77, 98]].forEach(function (r) { back.push({ at: (r[0] + r[1]) / 2, w: r[1] - r[0] - 0.4, h: 7.8, sill: 0.5, glass: true }); });
aptWall("x", T.x0, T.x1, T.z1, 0, h, t, clad, back);
aptWall("z", T.z0, T.z1, T.x0, 0, h, t, clad, [{ at: -340, w: 12, h: 3, sill: 5.5, glass: true }, { at: -305, w: 12, h: 3, sill: 5.5, glass: true }]);
aptWall("z", T.z0, T.z1, T.x1, 0, h, t, clad, [{ at: -340, w: 12, h: 3, sill: 5.5, glass: true }, { at: -305, w: 12, h: 3, sill: 5.5, glass: true }]);
[-10, T.arr].forEach(function (x) { aptBox(6.4, 0.2, 0.4, dark, x, 3.3, T.z0); aptBox(2.8, 3.1, 0.06, aptGlass(), x - 1.6, 1.55, T.z0 - 0.25); aptBox(2.8, 3.1, 0.06, aptGlass(), x + 1.6, 1.55, T.z0 + 0.25); });
aptBox(220, 0.4, 14, aptMat(0xD8DADE, "metal", { phong: 50 }), 0, 7.2, T.z0 - 7);
for (var cx = -100; cx <= 100; cx += 25) {
aptCyl(0.25, 7.2, dark, cx, 3.6, T.z0 - 13);
aptRound(cx, T.z0 - 13, 0.3, 0, 7);
}
var nm = aptCanvasMat("tname", 1024, 96, function (c, W, H) { c.clearRect(0, 0, W, H); c.fillStyle = "#1F3C66"; c.font = "bold 66px Georgia,serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("SOMNUCOR AIRPORT", W / 2, H / 2 + 3); }, { full: true, basic: true, op: 1 });
nm.transparent = true;
aptPlane(46, 4.3, nm, 0, 8.9, T.z0 - 0.4, Math.PI);
aptSign(["DEPARTURES", "check-in · security · gates"], 5, 1.2, "#1F4E8C", "#FFFFFF", -10, 4.4, T.z0 - 0.5, Math.PI);
aptSign(["ARRIVALS", "baggage claim · the shuttle · taxis"], 5, 1.2, "#2A2E36", "#FFE7A0", T.arr, 4.4, T.z0 - 0.5, Math.PI);
APTK.rooms.push({ x0: T.x0, z0: T.z0, x1: T.x1, z1: T.sec, y: 0, h: h, name: "the terminal: the check-in hall" });
APTK.rooms.push({ x0: T.x0, z0: T.sec, x1: T.x1, z1: T.z1, y: 0, h: h, name: "the terminal: the departures lounge" });
APTK.rooms.push({ x0: 10, z0: T.z0, x1: T.x1, z1: T.sec, y: 0, h: h, name: "the terminal: baggage claim" });
var secOpens = [{ at: T.lanes[0], w: 1.8, h: 2.4 }, { at: T.lanes[1], w: 1.8, h: 2.4 }, { at: T.arr, w: 4, h: 2.8 }];
aptWall("x", T.x0, T.x1, T.sec, 0, 3.2, 0.25, aptMat(0xC8CCD2, "plaster"), secOpens);
aptBox(T.x1 - T.x0, h - 3.2, 0.06, aptGlass(), 0, 3.2 + (h - 3.2) / 2, T.sec);
T.lanes.forEach(function (lx) { var S = aptSolid(lx, T.sec, 0.9, 0.4, 0, 2.4); S.when = function () { var no = !aptMayAirside(); if (no)
aptSecNudge(); return no; }; });
var A = aptSolid(T.arr, T.sec - 0.6, 2, 0.3, 0, 2.8);
A.when = function () { var L2 = worldLocal(); if (L2.z > T.sec)
return false; if (aptMayAirside())
return false; aptArrNudge(); return true; };
aptSecurity();
aptCheckin();
aptLounge();
aptBaggage();
aptCrewRoom();
aptCeilingLights();
aptBoardsBuild();
aptBox(4, 3.2, 4, aptMat(0xC8CCD2, "plaster"), 5, 1.6, -334);
aptSolid(5, -334, 2, 2, 0, 3.2);
aptSign(["OBSERVATION DECK", "stairs up · press E"], 3.4, 0.8, "#1F4E8C", "#FFFFFF", 5, 2.6, -336.1, Math.PI);
aptSpot(5, -337.5, 2.6, "Stairs up to the observation deck", "climb up to the roof", function () { aptToDeck(true); });
aptDeck();
},
function () {
var desk = aptMat(0xE8E6E2, "marble", { phong: 60 }), front = aptMat(0x1F4E8C, "metal", { phong: 40 }), belt = aptMat(0x2A2A2C, "metal");
for (var i = 0; i < 6; i++) {
var x = -90 + i * 12, L = APT_LINES[i % APT_LINES.length];
aptBox(5, 1.05, 1.0, front, x, 0.52, -354.2);
aptBox(5.2, 0.08, 1.2, desk, x, 1.08, -354.2);
aptSolid(x, -354.2, 2.6, 0.6, 0, 1.1);
aptBox(1.1, 0.4, 1.0, aptMat(0x9A9EA4, "metal", { phong: 60 }), x + 3.2, 0.2, -354.2);
aptBox(0.5, 0.4, 0.05, aptMat(0x101418, null), x - 1.2, 1.35, -354.5);
var sg = aptCanvasMat("ck" + i, 256, 64, function (c, W, H) { var col = "#" + ("00000" + L.tail.toString(16)).slice(-6); c.fillStyle = col; c.fillRect(0, 0, W, H); c.fillStyle = "#FFFFFF"; c.font = "bold 26px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText((i + 1) + "  " + L.name, W / 2, H / 2 + 2); }, { full: true, basic: true });
aptPlane(4, 1, sg, x, 3.4, -358.6, 0);
if (i > 0) {
var ag = aptPersonFig("ck" + i, x + (i % 2 ? 0.8 : -0.8), 0, -356.2, 0, { sex: i % 2 ? "m" : "f", age: 24 + i * 6, top: L.tail, bottom: 0x1E2430 }, "check-in agent");
APT.people.push({ g: ag, still: true });
}
for (var q = 0; q < 3; q++) {
aptCyl(0.05, 1, aptMat(0x9A9EA4, "metal", { phong: 60 }), x - 2 + q * 2, 0.5, -349, null, 8);
}
aptBox(4, 0.06, 0.03, aptMat(0x1F4E8C, null), x, 0.95, -349);
}
aptBox(74, 0.5, 1.2, belt, -60, 0.25, -357.4);
aptGuide("checkin", -89.2, -356.4, 0);
aptSpot(-90, -352, 2.6, "Somnucor Air check-in", "buy a ticket and get your boarding pass", function () { aptTickets(); });
aptSpot(-78, -352, 2.6, "Dreamline check-in", "buy a ticket and get your boarding pass", function () { aptTickets(); });
aptSpot(-66, -352, 2.6, "Lantern Airways check-in", "buy a ticket and get your boarding pass", function () { aptTickets(); });
for (var k = 0; k < 3; k++) {
aptBox(0.7, 1.5, 0.5, aptMat(0xE8E8EC, "metal", { phong: 60 }), -28 + k * 1.6, 0.75, -348);
aptBox(0.55, 0.4, 0.04, aptMat(0x163A66, null, { e: 0x0A2A50 }), -28 + k * 1.6, 1.25, -348.27);
aptSolid(-28 + k * 1.6, -348, 0.35, 0.25, 0, 1.5);
}
aptSpot(-26.4, -346.8, 2.4, "Self-service kiosks", "buy a ticket and print your pass", function () { aptTickets(); });
for (var b = 0; b < 4; b++) {
aptBench(-80 + b * 22, -339, 0);
}
[-96, -30, 0, 96].forEach(function (px) { aptPlanter(px, -357); });
},
function (x, z, ry) {
var g = aptGroup(x, 0, z, ry), m = aptMat(0x5A5E66, "metal", { phong: 40 }), s = aptMat(0x2A3A5A, null);
for (var i = 0; i < 4; i++) {
aptBox(0.6, 0.12, 0.6, s, -0.99 + i * 0.66, 0.46, 0, g);
aptBox(0.6, 0.6, 0.08, s, -0.99 + i * 0.66, 0.8, 0.28, g);
}
aptBox(2.8, 0.06, 0.5, m, 0, 0.38, 0, g);
aptBox(0.08, 0.38, 0.5, m, -1.3, 0.19, 0, g);
aptBox(0.08, 0.38, 0.5, m, 1.3, 0.19, 0, g);
var c = Math.cos(ry || 0), sn = Math.sin(ry || 0);
aptSolid(x, z, 1.4, 0.4, 0, 1, ry || 0);
return g;
},
function () {
var T = APT_T, m = aptMat(0xD0D4D8, "metal", { phong: 60 }), belt = aptMat(0x1E1E20, "metal"), blue = aptMat(0x1F4E8C, null);
T.lanes.forEach(function (lx, i) {
aptBox(0.2, 2.3, 0.6, m, lx - 0.85, 1.15, T.sec + 0.9);
aptBox(0.2, 2.3, 0.6, m, lx + 0.85, 1.15, T.sec + 0.9);
aptBox(1.9, 0.25, 0.6, m, lx, 2.35, T.sec + 0.9);
aptBox(0.3, 0.06, 0.62, aptMat(0x3AC86A, null, { e: 0x1A8A3A }), lx, 2.49, T.sec + 0.9);
aptSolid(lx - 0.85, T.sec + 0.9, 0.1, 0.3, 0, 2.3);
aptSolid(lx + 0.85, T.sec + 0.9, 0.1, 0.3, 0, 2.3);
var bx = lx + (i ? 2.2 : -2.2);
aptBox(1.1, 1.4, 2.4, aptMat(0xC8CCD0, "metal", { phong: 40 }), bx, 1.2, T.sec - 0.4);
aptBox(0.9, 0.06, 6, belt, bx, 0.82, T.sec - 1.0);
aptBox(0.06, 0.5, 0.9, aptMat(0x2A2A2A, null), bx, 1.3, T.sec + 0.82);
aptSolid(bx, T.sec - 1.0, 0.55, 3, 0, 1.4);
for (var k = 0; k < 4; k++)
aptBox(0.6, 0.08, 0.45, aptMat(0x5A6A80, null), bx, 0.9 + k * 0.09, T.sec - 4.2);
aptBox(0.5, 0.6, 0.04, aptMat(0x0A1A2A, null, { e: 0x0A2040 }), bx + (i ? 0.8 : -0.8), 1.5, T.sec + 1.6);
});
var sg = aptCanvasMat("secsign", 512, 96, function (c, W, H) { c.fillStyle = "#1F4E8C"; c.fillRect(0, 0, W, H); c.fillStyle = "#FFF"; c.font = "bold 34px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("SECURITY · boarding pass ready", W / 2, H / 2 + 2); }, { full: true, basic: true });
aptPlane(6, 1.1, sg, -55, 4.0, T.sec - 0.2, Math.PI);
var ar = aptCanvasMat("arrsign", 512, 96, function (c, W, H) { c.fillStyle = "#2A2E36"; c.fillRect(0, 0, W, H); c.fillStyle = "#FFE7A0"; c.font = "bold 32px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("ARRIVALS EXIT · no re-entry", W / 2, H / 2 + 2); }, { full: true, basic: true });
aptPlane(6, 1.1, ar, T.arr, 4.0, T.sec + 0.2, 0);
aptGuide("security", -55, T.sec - 2.2, Math.PI);
var o2 = aptPersonFig("sec2", -45, 0, T.sec + 2.4, 0, { sex: "f", age: 33, top: 0x2A2E36, bottom: 0x1E2026 }, "airport security officer");
APT.people.push({ g: o2, still: true });
aptSpot(T.lanes[0], T.sec - 1.4, 1.6, "Scanner lane 1", "be screened and go through to the gates", function () { aptScreen(); }, { when: function () { return !aptMayAirside() || !!APT.pass; } });
aptSpot(T.lanes[1], T.sec - 1.4, 1.6, "Scanner lane 2", "be screened and go through to the gates", function () { aptScreen(); }, { when: function () { return !aptMayAirside() || !!APT.pass; } });
},
function () {
if (!aptMayAirside()) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🛂 Security</div><div style='margin:6px 0 10px'>\"Boarding pass, please.\" You'll need one from the check-in desks or the kiosks first. Staff of the airport go straight through.</div>" + worldBtn("tk", "🎫 Buy a ticket", "the check-in desks are just behind you"), { tk: function () { aptTickets(); } });
return;
}
if (APT.screened && Date.now() - APT.screened < 20 * 60000) {
aptSay("🛂 You've been screened. Through the arch to the gates.");
return;
}
worldCard(null);
APT.screened = Date.now();
aptDid("security");
aptSay("🛂 <b>Screened.</b> Bag through the X-ray, coat and belt in the tray, a walk through the arch: the light stays green. Have a good flight.");
aptTone(660, 0.12);
var P = camera.position;
if (worldLocal().z < APT_T.sec)
P.z += 3.2;
},
function () {
var T = APT_T;
for (var r = 0; r < 3; r++)
for (var c = 0; c < 4; c++) {
aptBench(-92 + c * 7 + (r % 2) * 0.0, -316 + r * 4.2, Math.PI);
}
for (var c2 = 0; c2 < 4; c2++) {
aptBench(-48 + c2 * 7, -316, Math.PI);
aptBench(-48 + c2 * 7, -311.8, Math.PI);
}
var wood = aptMat(0x7A5A3A, "wood", { phong: 30 });
aptBox(12, 1.1, 1.2, wood, 22, 0.55, -321);
aptBox(12.2, 0.1, 1.4, aptMat(0x2A2A2C, "marble", { phong: 60 }), 22, 1.14, -321);
aptSolid(22, -321, 6, 0.7, 0, 1.2);
aptBox(12, 2.4, 0.4, aptMat(0x3A2A20, "wood"), 22, 1.9, -324.5);
aptBox(1.2, 0.7, 0.6, aptMat(0xB8BCC2, "metal", { phong: 80 }), 18, 1.55, -321.2);
var cs = aptCanvasMat("cafesign", 512, 96, function (c, W, H) { c.fillStyle = "#3A2A20"; c.fillRect(0, 0, W, H); c.fillStyle = "#F2D27A"; c.font = "italic bold 40px Georgia,serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("☕ The Runway Café", W / 2, H / 2 + 2); }, { full: true, basic: true });
aptPlane(7, 1.3, cs, 22, 3.8, -324.25, 0);
for (var t = 0; t < 4; t++) {
var tx = 12 + t * 5, tz = -304;
aptCyl(0.5, 0.05, aptMat(0xE8E6E0, "marble"), tx, 0.75, tz, null, 16);
aptCyl(0.05, 0.75, aptMat(0x3A3A3A, "metal"), tx, 0.37, tz, null, 8);
aptRound(tx, tz, 0.5, 0, 0.8);
[-0.85, 0.85].forEach(function (o) { aptBox(0.45, 0.45, 0.45, aptMat(0x6A4A3A, "wood"), tx + o, 0.22, tz); });
}
aptGuide("barista", 22, -322.4, 0);
aptSpot(22, -319.6, 2.6, "The Runway Café", "get a coffee", function () { aptCafe(); });
for (var s = 0; s < 3; s++) {
aptBox(6, 2.2, 0.6, aptMat(0xE8E6E2, "wood"), 55 + s * 0, 1.1, -323.8 + s * 3.2);
aptSolid(55, -323.8 + s * 3.2, 3, 0.35, 0, 2.2);
for (var k = 0; k < 3; k++)
aptBox(5.6, 0.05, 0.5, aptMat(0xC8A060 + (k * 0x101010), null), 55, 0.7 + k * 0.6, -323.8 + s * 3.2 + 0.05);
}
aptSign(["THE NEWSSTAND", "papers · books · snacks"], 5, 1, "#2A2E36", "#F2D27A", 55, 3.4, -324.4, 0);
T.gates.forEach(function (gx, i) {
aptBox(3.2, 1.05, 0.9, aptMat(0x1F4E8C, "metal", { phong: 40 }), gx, 0.52, -295.5);
aptBox(3.4, 0.08, 1.1, aptMat(0xE8E6E2, "marble", { phong: 60 }), gx, 1.08, -295.5);
aptSolid(gx, -295.5, 1.7, 0.55, 0, 1.1);
var gm = aptCanvasMat("gate" + i, 256, 96, function (c, W, H) { c.fillStyle = "#E8C020"; c.fillRect(0, 0, W, H); c.fillStyle = "#111"; c.font = "bold 54px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("Gate " + (i + 1), W / 2, H / 2 + 3); }, { full: true, basic: true });
aptPlane(2.6, 1, gm, gx, 4.2, -291.2, Math.PI);
aptBox(2.7, 1.1, 0.1, aptMat(0x222222, null), gx, 4.2, -291.1);
aptBox(2.4, 2.7, 0.12, aptMat(0x5A6068, "metal", { phong: 40 }), gx, 1.35, T.z1 + 0.05);
APTK.gates.push({ n: i + 1, x: gx });
aptSpot(gx, -297.4, 2.6, "Gate " + (i + 1), "board your flight", function () { aptBoardAt(i + 1); });
aptJetBridge(gx);
});
aptGuide("gate", -26.5, -294.6, Math.PI);
var ga = aptPersonFig("gate3", 26, 0, -294.6, Math.PI, { sex: "m", age: 38, top: 0x1F4E8C, bottom: 0x2A3A5A }, "gate agent");
APT.people.push({ g: ga, still: true });
[-50, 0, 50].forEach(function (px) { aptPlanter(px, -293); });
},
function (gx) {
var m = aptMat(0xC8CCD2, "metal", { phong: 40 }), g = aptMat(0x2A2E34, "metal"), Z = APT_T.z1;
var len = 26, cz = Z + len / 2;
aptBox(3.2, 3, len, m, gx, 4.4, cz);
aptBox(3.3, 0.25, len, g, gx, 2.8, cz);
aptBox(0.4, 2.8, 0.4, g, gx, 1.4, Z + len - 3);
aptBox(1.6, 0.6, 1.2, g, gx, 0.35, Z + len - 3);
aptSolid(gx, Z + len - 3, 0.8, 0.6, 0, 2.8);
aptBox(4, 3.4, 3, m, gx, 4.5, Z + len + 1);
for (var w = 0; w < 5; w++)
aptBox(0.06, 0.8, 1.6, aptGlass(), gx + 1.62, 4.8, Z + 3 + w * 4.6);
},
function () {
APT.belts = [];
[40, 78].forEach(function (cx, i) {
var g = aptGroup(cx, 0, -344), steel = aptMat(0xB8BCC2, "metal", { phong: 80 }), rub = aptMat(0x2A2A2C, null);
aptBox(14, 0.5, 2.6, steel, 0, 0.25, 0, g);
aptBox(14, 0.06, 2.2, rub, 0, 0.53, 0, g);
[-7, 7].forEach(function (x) { var c = aptCyl(1.3, 0.5, steel, x, 0.25, 0, g, 24); var c2 = aptCyl(1.1, 0.06, rub, x, 0.53, 0, g, 24); });
aptBox(0.6, 2.2, 0.6, steel, 0, 1.6, -3.4, g);
aptSolid(cx, -344, 8.4, 1.4, 0, 0.6);
var bags = [];
for (var b = 0; b < (APT.lite ? 5 : 9); b++) {
var col = [0x2A3A5A, 0x8A2A22, 0x3A3A3A, 0x1E5A3A, 0xC8A040, 0x5A3A6A][b % 6];
var bg = aptBox(0.7, 0.42, 0.48, aptMat(col, null, { phong: 20 }), 0, 0.78, 0, g);
bags.push({ m: bg, s: b / (APT.lite ? 5 : 9) });
}
APT.belts.push({ g: g, bags: bags, sp: 0.05 + i * 0.01 });
var nm = aptCanvasMat("claim" + i, 256, 96, function (c, W, H) { c.fillStyle = "#2A2E36"; c.fillRect(0, 0, W, H); c.fillStyle = "#FFE7A0"; c.font = "bold 40px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("Belt " + (i + 1), W / 2, H / 2 + 3); }, { full: true, basic: true });
aptPlane(2.6, 1, nm, cx, 4.6, -347.4, 0);
});
aptSpot(40, -341.4, 3, "Baggage belt 1", "take your bag", function () { aptSay("🧳 You lift your bag off the belt. Taxis and the city shuttle are out of the front doors."); aptDid("bag"); });
aptSpot(78, -341.4, 3, "Baggage belt 2", "take your bag", function () { aptSay("🧳 You lift your bag off the belt. Taxis and the city shuttle are out of the front doors."); aptDid("bag"); });
},
function (dt) {
(APT.belts || []).forEach(function (B) {
B.bags.forEach(function (b) {
b.s = (b.s + dt * B.sp) % 1;
var s = b.s, L = 14, R = 1.2, per = 2 * L + 2 * Math.PI * R, d = s * per, x, z, ry = 0;
if (d < L) {
x = -7 + d;
z = R;
ry = 0;
}
else if (d < L + Math.PI * R) {
var a = (d - L) / R;
x = 7 + Math.sin(a) * R;
z = Math.cos(a) * R;
ry = -a;
}
else if (d < 2 * L + Math.PI * R) {
x = 7 - (d - L - Math.PI * R);
z = -R;
ry = Math.PI;
}
else {
var a2 = (d - 2 * L - Math.PI * R) / R;
x = -7 - Math.sin(a2) * R;
z = -Math.cos(a2) * R;
ry = Math.PI - a2;
}
b.m.position.set(x, 0.78, z);
b.m.rotation.y = ry;
});
});
},
function () {
var m = aptMat(0xD8D6D0, "plaster");
aptWall("x", 80, 100, -308, 0, 3.4, 0.2, m, [{ at: 90, w: 1.6, h: 2.4 }]);
aptWall("z", -325, -308, 80, 0, 3.4, 0.2, m, [{ at: -316, w: 1.6, h: 2.4, }]);
aptBox(20, 0.12, 17, aptMat(0xE8E6E0, "plaster"), 90, 3.45, -316.5);
APTK.rooms.push({ x0: 80, z0: -325, x1: 100, z1: -308, y: 0, h: 3.4, name: "the crew room" });
aptBox(4, 0.8, 2, aptMat(0x5A4A3A, "wood", { phong: 30 }), 90, 0.4, -318);
aptSolid(90, -318, 2, 1, 0, 0.8);
aptPlaque("chart", "Flight planning: Somnucor and around", "Runway 09-27, 2,200 m, 45 m wide. Field elevation 0 ft. Circuit height 1,000 ft (300 m), left-hand circuits for 27, right-hand for 09.\nTower: 118.1. Approach lights steady white; PAPI on the left of each runway: two white and two red means you're on the slope.\nThe lake (seaplanes) lies south of the runway: land into the wind, keep clear of the dock.", 4.6, 2.6, 90, 1.9, -324.8, 0);
for (var i = 0; i < 6; i++)
aptBox(0.5, 1.9, 0.5, aptMat(0x6A7480, "metal", { phong: 40 }), 82 + i * 0.55, 0.95, -309);
aptSpot(90, -316, 3, "The crew room", "read the flight planning board", function () { aptCrewCard(); });
},
function () {
var rows = [["Runway", "09 - 27 · 2,200 m by 45 m · steady edge lights"], ["Circuit", "1,000 ft (300 m) · left-hand on 27"], ["Tower", "Somnucor Tower · Tomasz in the cab"], ["Today", aptBoardLines(4).map(function (f) { return f.time + " " + f.no + " " + f.dest; }).join(" · ") || "no flights for now"]];
worldCard(worldFacts("🧑‍✈️ The crew room", "flight planning, the briefing board, the lockers", rows, ["Pilots and crew of the airport come through here; the flight school is in the hangar to the west."]), {});
},
function () {
var m = aptMat(0xFFF6E0, null, { e: 0xFFF2D8, ei: 0.9 });
var pts = [];
for (var x = -90; x <= 90; x += 12)
for (var z = -352; z <= -296; z += 9) {
pts.push([x, z]);
}
var g = new THREE.BoxGeometry(2.4, 0.08, 0.6);
APT.geos["ceilpanel"] = g;
var I = new THREE.InstancedMesh(g, m, pts.length), M = new THREE.Matrix4();
pts.forEach(function (p, i) { M.makeTranslation(p[0], APT_T.h - 0.05, p[1]); I.setMatrixAt(i, M); });
I.userData.keep = 1;
aptP().add(I);
},
function () {
var T = APT_T, y = T.h + 0.8, rail = aptMat(0xB8BCC2, "metal", { phong: 60 });
aptBox(T.x1 - T.x0, 0.08, T.z1 - T.z0, aptMat(0x8A8A86, "paving"), 0, y - 0.02, (T.z0 + T.z1) / 2);
[[T.x0, T.z0, T.x1, T.z0], [T.x0, T.z1, T.x1, T.z1]].forEach(function (s) { aptBox(s[2] - s[0], 1.1, 0.08, aptGlass(), 0, y + 0.55, s[1]); aptBox(s[2] - s[0], 0.08, 0.12, rail, 0, y + 1.1, s[1]); aptSolid(0, s[1], 100, 0.2, y, 1.2); });
[T.x0, T.x1].forEach(function (x) { aptBox(0.08, 1.1, T.z1 - T.z0, aptGlass(), x, y + 0.55, (T.z0 + T.z1) / 2); aptBox(0.12, 0.08, T.z1 - T.z0, rail, x, y + 1.1, (T.z0 + T.z1) / 2); aptSolid(x, (T.z0 + T.z1) / 2, 0.2, 35, y, 1.2); });
aptBox(4, 3, 4, aptMat(0xC8CCD2, "plaster"), 5, y + 1.5, -334);
aptSolid(5, -334, 2, 2, y, 3);
aptSpot(5, -337.5, 2.6, "Stairs down", "go back down to the check-in hall", function () { aptToDeck(false); }, { y: y });
for (var b = 0; b < 4; b++) {
var bx = -60 + b * 40;
aptCyl(0.08, 1.1, rail, bx, y + 0.55, T.z1 - 1.2, null, 8);
aptBox(0.4, 0.25, 0.5, aptMat(0x1F4E8C, null, { phong: 40 }), bx, y + 1.2, T.z1 - 1.2);
aptSpot(bx, T.z1 - 2.2, 1.6, "Binoculars", "look out over the field", function () { aptBinoculars(); }, { y: y });
}
for (var s = 0; s < 5; s++)
aptBench(-80 + s * 40, -320, Math.PI).position.y = y;
APT.deckY = y;
},
function (up) {
var P = camera.position, y = up ? APT.deckY : 0;
P.set(APT.base + 5, y + 1.72, -339.5);
if (typeof yaw !== "undefined")
yaw = up ? Math.PI : 0;
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
aptSay(up ? "🔭 <b>The observation deck.</b> The whole field below you: the runway, the airliners at the gates, the tower to the east and the lake beyond. Benches, and binoculars at the rail." : "Back down in the check-in hall.");
if (up)
aptDid("deck");
},
function () {
var f = aptTrafficNow().filter(function (m) { return m.vis; });
var rows = f.slice(0, 5).map(function (m) { return [m.no + " · " + m.line.name, (m.kind === "dep" ? "departing for " : "arriving from ") + m.dest + " · " + m.phase]; });
if (!rows.length)
rows = [["The field", "quiet for a moment: the next flight is on the board"]];
worldCard(worldFacts("🔭 Through the binoculars", "what's moving on the field right now", rows, ["Runway 09-27 runs east-west in front of you. Airliners take off and land on it into the wind; the trainers fly the circuit from the hangar to the west."]), {});
},
function () {
var W = APT_TWR, conc = aptMat(0xD8D6D0, "concrete"), dark = aptMat(0x2A2E34, "metal", { phong: 40 }), glassM = aptGlass();
aptBuildingBox(W.x - 9, W.z - 9, W.x + 9, W.z + 9, 4.4, aptMat(0xE0DED8, "plaster"), "the control tower: the ground floor", [{ side: "s", at: W.x, w: 2 }]);
aptSign(["SOMNUCOR TOWER", "air traffic control · staff only past the lift"], 5, 1, "#1F4E8C", "#FFFFFF", W.x, 3.6, W.z + 9.3, 0);
aptCyl(3.6, W.cab - 4.6, conc, W.x, 4.4 + (W.cab - 4.6) / 2, W.z, null, APT.lite ? 16 : 28, 3.0);
aptBox(1.4, 2.4, 0.1, aptMat(0xB8BCC2, "metal", { phong: 80 }), W.x, 1.2, W.z + 3.62 - 0.05);
aptSpot(W.x, W.z + 5.4, 2.4, "The tower lift", "ride up to the cab", function () { aptToCab(true); });
var y = W.cab, r = W.r, n = 8;
aptCyl(r + 0.6, 0.6, dark, W.x, y - 0.3, W.z, null, n);
aptCyl(r + 0.2, 0.1, aptMat(0x3A3E44, "floortile"), W.x, y + 0.05, W.z, null, n);
aptFloor(W.x - r, W.z - r, W.x + r, W.z + r, y + 0.1);
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * Math.PI * 2, px = W.x + Math.sin(a) * r * 0.93, pz = W.z + Math.cos(a) * r * 0.93;
var side = 2 * r * Math.tan(Math.PI / n) * 0.93, gp = aptBox(side, 4.2, 0.06, glassM, px, y + 2.4, pz);
gp.rotation.y = a;
gp.rotation.x = -0.18;
var col = aptBox(0.18, 4.6, 0.18, dark, W.x + Math.sin(i / n * Math.PI * 2) * r, y + 2.4, W.z + Math.cos(i / n * Math.PI * 2) * r);
}
aptCyl(r + 1.6, 0.5, aptMat(0x2A2E34, "metalroof"), W.x, y + 4.75, W.z, null, n);
aptCyl(0.08, 6, dark, W.x, y + 7.8, W.z, null, 6);
aptLamp(W.x, y + 10.9, W.z, 0xFF3A2A, 2.2, 0.7);
for (var c = 0; c < 5; c++) {
var a2 = (c - 2) * 0.55, cx = W.x + Math.sin(a2) * (r - 1.6), cz = W.z + Math.cos(a2) * (r - 1.6);
var con = aptBox(2.2, 1.0, 0.9, aptMat(0x4A4E56, "metal", { phong: 40 }), cx, y + 0.6, cz);
con.rotation.y = a2;
var top = aptBox(2.3, 0.06, 1.1, aptMat(0x1E2024, null), cx, y + 1.12, cz);
top.rotation.y = a2;
}
aptRound(W.x, W.z + r - 1.6, 2.6, y, 1.2);
APT.radar = aptCanvasMat("radar", APT.lite ? 256 : 384, APT.lite ? 256 : 384, function (x, w, h) { x.fillStyle = "#04140C"; x.fillRect(0, 0, w, h); }, { full: true, basic: true, live: true });
var rs = aptPlane(1.6, 1.6, APT.radar, W.x, y + 1.8, W.z + r - 2.25, Math.PI);
rs.rotation.x = 0;
aptBox(1.8, 1.8, 0.1, aptMat(0x1A1C20, null), W.x, y + 1.8, W.z + r - 2.1);
aptLamp(W.x, y + 3.6, W.z, 0xFFF2D8, 5, 0.25);
APTK.rooms.push({ x0: W.x - r, z0: W.z - r, x1: W.x + r, z1: W.z + r, y: y, h: 4.5, name: "the control tower cab" });
aptGuide("tower", W.x + 1.6, W.z + r - 2.9, Math.PI * 0.9, y + 0.1);
aptSpot(W.x, W.z + r - 3.2, 2.4, "The radar", "read the radar and the flight strips", function () { aptRadarCard(); }, { y: y + 0.1 });
aptSpot(W.x - 2, W.z - 2, 2.4, "The tower lift", "ride down to the ground floor", function () { aptToCab(false); }, { y: y + 0.1 });
aptSpot(W.x, W.z - r + 2, 2.4, "The tower's work desk", "work your shift here", function () { aptWorkHere(); }, { y: y + 0.1 });
aptLamp(W.x - 0.4, y + 5.3, W.z, 0xFFFFFF, 1.6, 0.6);
aptLamp(W.x + 0.4, y + 5.3, W.z, 0x5AF07A, 1.6, 0.6);
},
function (up) {
var W = APT_TWR, P = camera.position, y = up ? W.cab + 0.1 : 0;
if (up && !aptMayTower()) {
aptSay("🗼 <b>The tower lift</b> takes air traffic control and the airport's staff up to the cab. A visitor can see the field from the observation deck on the terminal roof.");
return;
}
P.set(APT.base + W.x - 2, y + 1.72, up ? W.z - 0.5 : W.z + 6.2);
if (typeof yaw !== "undefined")
yaw = up ? Math.PI : Math.PI;
if (typeof pitch !== "undefined")
pitch = up ? -0.05 : 0;
if (typeof flyY !== "undefined")
flyY = y;
if (up) {
aptDid("tower");
aptSay("🗼 <b>Somnucor Tower.</b> The cab, 38 m up: the whole field through the glass, the radar, the strip board and the consoles. Tomasz is working the runway.");
}
},
function () {
var f = aptTrafficNow().filter(function (m) { return m.vis; });
var rows = f.map(function (m) { return [m.no + " " + m.line.name, (m.kind === "dep" ? "→ " : "← ") + m.dest + " · " + m.phase + (m.alt > 5 ? " · " + Math.round(m.alt * 3.28 / 100) * 100 + " ft" : "")]; });
if (APT.fly)
rows.unshift(["You", APT.fly.spec.name + " · " + Math.round(APT.fly.v * 1.944) + " kt · " + Math.round(APT.fly.y * 3.28) + " ft"]);
worldCard(worldFacts("📡 Somnucor Tower radar", "every plane on and round the field, live", rows.length ? rows : [["The field", "quiet: nothing moving just now"]], ["The green dots are planes; each carries its strip. Departures leave west off runway 27 or east off 09; arrivals come in on the 3-degree slope, about 300 m lower for every mile out."]), {});
},
function () {
var x0 = -310, x1 = -230, z0 = -335, z1 = -275, h = 12, wallM = aptMat(0xB8BEC6, "metal", { phong: 30 }), cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
aptBox(x1 - x0, 0.2, z1 - z0, aptMat(0x8E8E8A, "concrete"), cx, -0.08, cz);
aptFloor(x0, z0, x1, z1, 0);
aptWall("x", x0, x1, z0, 0, h, 0.3, wallM, [{ at: cx, w: 50, h: 2.0, sill: 8, glass: true }]);
aptWall("z", z0, z1, x0, 0, h, 0.3, wallM, []);
aptWall("z", z0, z1, x1, 0, h, 0.3, wallM, [{ at: -283, w: 2, h: 2.4 }]);
aptWall("x", x0, x1, z1, 0, h, 0.3, wallM, [{ at: cx, w: 64, h: 10.6 }]);
aptBox(64, 1.4, 0.6, aptMat(0x9AA0A8, "metal"), cx, 11.3, z1);
var RR = 104, rise = 8, th = Math.asin(40 / RR), arch = new THREE.CylinderGeometry(RR, RR, z1 - z0 + 0.6, APT.lite ? 16 : 32, 1, true, -th, 2 * th);
APT.geos["harch"] = arch;
var ar = new THREE.Mesh(arch, aptMat(0x7A8088, "metalroof", { ds: true }));
ar.rotation.set(-Math.PI / 2, 0, 0);
ar.position.set(cx, h + rise - RR, cz);
aptP().add(ar);
var sh = new THREE.Shape();
sh.moveTo(-40, 0);
for (var q = 0; q <= 20; q++) {
var xx = -40 + q * 4;
sh.lineTo(xx, Math.sqrt(RR * RR - xx * xx) - (RR - rise));
}
sh.lineTo(40, 0);
sh.lineTo(-40, 0);
var shg = new THREE.ShapeGeometry(sh);
APT.geos["hend"] = shg;
[z0, z1].forEach(function (zz) { var e = new THREE.Mesh(shg, aptMat(0xA8AEB6, "metal", { ds: true })); e.position.set(cx, h, zz); aptP().add(e); });
APTK.rooms.push({ x0: x0, z0: z0, x1: x1, z1: z1, y: 0, h: h, name: "the hangar" });
var hn = aptCanvasMat("hname", 1024, 128, function (c, W, H) { c.clearRect(0, 0, W, H); c.fillStyle = "#F2F2F0"; c.font = "bold 72px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("HANGAR 1 · FLIGHT SCHOOL", W / 2, H / 2 + 4); }, { full: true, basic: true });
hn.transparent = true;
aptPlane(38, 4.6, hn, cx, 12.9, z1 + 0.4, 0);
var rx0 = -256, rx1 = -232, rz0 = -333, rz1 = -315, pm = aptMat(0xE4E2DC, "plaster");
aptWall("x", rx0, rx1, rz1, 0, 3.4, 0.2, pm, [{ at: -244, w: 1.8, h: 2.4 }, { at: -252, w: 4, h: 1.4, sill: 1, glass: true }, { at: -236, w: 4, h: 1.4, sill: 1, glass: true }]);
aptWall("z", rz0, rz1, rx0, 0, 3.4, 0.2, pm, []);
aptBox(rx1 - rx0, 0.12, rz1 - rz0, aptMat(0xF0EEE8, "plaster"), (rx0 + rx1) / 2, 3.45, (rz0 + rz1) / 2);
aptBox(rx1 - rx0 - 0.6, 0.05, rz1 - rz0 - 0.6, aptMat(0x3A4A6A, null), (rx0 + rx1) / 2, 0.03, (rz0 + rz1) / 2);
APTK.rooms.push({ x0: rx0, z0: rz0, x1: rx1, z1: rz1, y: 0, h: 3.4, name: "the flight school" });
for (var r = 0; r < 2; r++)
for (var c = 0; c < 3; c++) {
var dx = -251 + c * 6, dz = -325 + r * 4.5;
aptBox(2.4, 0.75, 0.9, aptMat(0x8A6A48, "wood", { phong: 20 }), dx, 0.75, dz);
aptSolid(dx, dz, 1.2, 0.45, 0, 0.8);
aptBox(0.5, 0.5, 0.5, aptMat(0x2A3A5A, null), dx - 0.6, 0.25, dz + 0.8);
aptBox(0.5, 0.5, 0.5, aptMat(0x2A3A5A, null), dx + 0.6, 0.25, dz + 0.8);
}
aptPlaque("forces", "The four forces", "LIFT up, from the wing.\nWEIGHT down.\nTHRUST forward, from the engine.\nDRAG back, the air.\n\nIn steady level flight they balance. Too steep a wing and it stalls.", 4.6, 2.6, -244, 1.9, -332.8, 0, { ac: "#B8402A" });
aptPlaque("circuit", "The circuit (runway 27)", "Take off into the wind, climb ahead. Turn left onto crosswind, left again onto downwind at 1,000 ft. Left onto base, left onto final: lined up, coming down at 3 degrees. Flare, touch down on the main wheels, and roll out.", 3.8, 2.4, -255.8, 1.9, -324, Math.PI / 2, { ac: "#1F4E8C" });
aptGuide("instructor", -244, -330.6, 0);
aptSpot(-244, -327.6, 3, "The flight school", "take lessons and earn your pilot's licence", function () { aptSchool(); });
var t2 = aptPlaneModel("trainer", APT_LINES[0]);
t2.position.set(-285, 0, -300);
t2.rotation.y = Math.PI * 0.85;
aptP().add(t2);
aptRound(-285, -300, 4.2, 0, 2.4);
aptRound(-286, -303.5, 1.6, 0, 2);
aptGuide("mechanic", -280, -296.5, Math.PI * 1.3);
for (var k = 0; k < 4; k++) {
aptBox(1.4, 1.1, 0.6, aptMat(0xB8302A, "metal", { phong: 60 }), -307 + k * 1.6, 0.55, -333.6);
}
aptSolid(-302.2, -333.6, 3.2, 0.4, 0, 1.1);
aptBox(2.4, 1, 1.6, aptMat(0xE8C020, "metal", { phong: 30 }), -262, 0.5, -292);
aptSolid(-262, -292, 1.2, 0.8, 0, 1);
aptLamp(cx, h - 1.5, cz, 0xFFF2D8, 24, 0.18);
APT.ramp = [];
[[-285, -250, 0], [-255, -250, 0]].forEach(function (p, i) {
var g = aptPlaneModel("trainer", APT_LINES[i === 0 ? 0 : 2]);
g.position.set(p[0], 0, p[1]);
g.rotation.y = p[2];
aptP().add(g);
var S = aptRound(p[0], p[1] + 0.4, 1.1, 0, 2.4);
var S2 = aptSolid(p[0], p[1] - 0.6, 5.6, 0.6, 1.5, 0.6);
APT.ramp.push({ k: "trainer", g: g, x: p[0], z: p[1], h: p[2] });
aptParkedOnly([S, S2], i);
aptSpot(p[0] + 2.4, p[1] + 1.6, 3, "The trainer", "climb in and fly her", function () { aptFlyStart("trainer", APT.ramp[i]); }, { when: function () { return !APT.fly; } });
});
var sp = aptPlaneModel("seaplane", APT_LINES[3]);
sp.position.set(0, 0.05, 362);
sp.rotation.y = Math.PI;
aptP().add(sp);
APT.ramp.push({ k: "seaplane", g: sp, x: 0, z: 362, h: Math.PI, water: true });
aptSpot(0, 351, 3.4, "The seaplane", "climb in and fly her off the lake", function () { aptFlyStart("seaplane", APT.ramp[2]); }, { y: 0.7, when: function () { return !APT.fly; } });
var al = aptPlaneModel("airliner", APT_LINES[1]);
al.position.set(215, 0, -200);
al.rotation.y = 0;
aptP().add(al);
APT.ramp.push({ k: "airliner", g: al, x: 215, z: -200, h: 0 });
var n0 = APTK.solids.length;
aptPlaneSolids(215, -200, 0);
aptParkedOnly(APTK.solids.slice(n0), 3);
var st = aptBox(1.4, 0.2, 5.6, aptMat(0xE8E6E2, "metal"), 218.6, 1.6, -190.5);
st.rotation.x = 0.55;
aptBox(1.4, 1.2, 0.4, aptMat(0xE8E6E2, "metal"), 218.6, 0.6, -192.8);
APT.stairs = st;
aptSpot(221, -192, 3, "The airliner on the remote stand", "climb up to the flight deck and fly her", function () { aptFlyStart("airliner", APT.ramp[3]); }, { when: function () { return !APT.fly; } });
},
function (x, z, ry) {
var c = Math.cos(ry), s = Math.sin(ry);
var at = function (lx, lz) { return { x: x + lx * c + lz * s, z: z - lx * s + lz * c }; };
[-14, -7, 0, 7, 14].forEach(function (lz) { var p = at(0, lz); aptRound(p.x, p.z, 2.1, 0, 5.5); });
[-6, 6].forEach(function (lx) { var p = at(lx, 1.8); aptRound(p.x, p.z, 1.2, 0, 2.6); });
var w = at(0, 1);
aptSolid(w.x, w.z, 17, 1.8, 2.2, 1.4, ry);
},
function () {
aptBuildingBox(300, -200, 360, -175, 7, aptMat(0xD8C8B8, "brick"), "the airport fire station", [{ side: "s", at: 310, w: 6 }, { side: "s", at: 330, w: 6 }, { side: "s", at: 350, w: 6 }, { side: "n", at: 330, w: 1.8 }]);
for (var b = 0; b < 3; b++)
aptBox(6, 0.5, 0.3, aptMat(0xB8402A, null), 310 + b * 20, 6.6, -174.9);
aptSign(["AIRPORT FIRE AND RESCUE"], 10, 1.1, "#B8402A", "#FFFFFF", 330, 7.8, -174.6, 0);
[310, 330].forEach(function (x, i) { var tr = aptFireTruck(); tr.position.set(x, 0, -186); aptP().add(tr); aptSolid(x, -186, 1.5, 5, 0, 3.4); });
aptGuide("fire", 343, -184, Math.PI * 0.6);
aptSpot(343, -181.5, 2.6, "The fire station", "look over the crash tender", function () { aptFireCard(); });
[0, 1, 2].forEach(function (i) { aptCyl(6, 9, aptMat(0xE8E8E4, "metal", { phong: 40 }), 400 + i * 16, 4.5, -335, null, APT.lite ? 14 : 24); aptCyl(6.1, 0.3, aptMat(0xB8BCC2, "metal"), 400 + i * 16, 9.1, -335, null, APT.lite ? 14 : 24); aptRound(400 + i * 16, -335, 6.2, 0, 9); });
aptBox(52, 1.2, 0.4, aptMat(0xB8B6B0, "concrete"), 416, 0.6, -325);
aptSign(["JET A-1 · AVGAS 100LL", "fuel farm · no smoking"], 6, 1, "#E8C020", "#1A1A1A", 416, 2.4, -324.6, 0);
aptBuildingBox(380, -300, 460, -255, 10, aptMat(0xA8B0B8, "metal"), "the cargo shed", [{ side: "s", at: 395, w: 7 }, { side: "s", at: 420, w: 7 }, { side: "s", at: 445, w: 7 }]);
var cr = aptRnd(66);
for (var k = 0; k < (APT.lite ? 4 : 10); k++) {
var cx = 388 + (k % 5) * 14, cz = -245 + Math.floor(k / 5) * 5;
aptBox(4, 2.5, 2.4, aptMat([0x2A5A8A, 0xB8402A, 0x3A7A4A, 0xE8A040][k % 4], "metal"), cx, 1.25, cz);
aptSolid(cx, cz, 2, 1.2, 0, 2.5);
}
aptTug(-150, -150, 0.3);
aptTug(140, -160, -0.5);
aptFuelTruck(-110, -160, Math.PI / 2);
try {
if (typeof hpMakePad === "function") {
var sols = [];
hpMakePad("airport", aptP(), 285, 0.08, -300, 0, 0, sols);
APT.padSols = sols;
}
}
catch (e) {
if (window.console)
console.warn("[airport] pad", e);
}
},
function () {
worldCard(worldFacts("🚒 Airport fire and rescue", "three bays, two crash tenders, a crew on watch round the clock", [["The trucks", "Crash tenders carry thousands of litres of water and foam, and spray it from a turret on the roof while still driving"], ["The rule", "A crew must reach the far end of the runway within about three minutes of the alarm"], ["Every landing", "The crew stands by, every time, and drills every morning"]], ["The tower calls the crew out; they roll with the doors still opening."]), {});
},
function () {
var g = new THREE.Group(), red = aptMat(0xC8281E, "metal", { phong: 60 }), dark = aptMat(0x1A1A1C, null), chrome = aptMat(0xD8D8DC, "metal", { phong: 90 });
aptBox(3, 2.4, 9.4, red, 0, 1.9, 0, g);
aptBox(2.9, 1.4, 2.4, red, 0, 3.5, 3.4, g);
aptBox(2.8, 0.9, 0.06, aptGlass(), 0, 3.6, 4.62, g);
aptBox(3.02, 0.25, 9.4, chrome, 0, 0.9, 0, g);
aptCyl(0.18, 1.6, chrome, 0, 3.4, -1, g, 8).rotation.x = Math.PI / 2.4;
[-3.6, -0.6, 2.8].forEach(function (z) { [-1.45, 1.45].forEach(function (x) { var w = aptCyl(0.62, 0.5, dark, x, 0.62, z, g, 14); w.rotation.z = Math.PI / 2; }); });
aptBox(1.4, 0.12, 0.25, aptMat(0xFFF2D8, null, { e: 0xFFE8C0 }), 0, 1.5, 4.71, g);
aptBox(3.05, 0.16, 9.45, aptMat(0xE8E040, null), 0, 2.4, 0, g);
return g;
},
function (x, z, ry) {
var g = aptGroup(x, 0, z, ry), y = aptMat(0xE8C020, "metal", { phong: 30 }), d = aptMat(0x1A1A1C, null);
aptBox(1.6, 0.8, 2.6, y, 0, 0.7, 0, g);
aptBox(1.4, 1, 0.9, y, 0, 1.5, -0.6, g);
[-1, 0.9].forEach(function (zz) { [-0.8, 0.8].forEach(function (xx) { var w = aptCyl(0.32, 0.25, d, xx, 0.32, zz, g, 10); w.rotation.z = Math.PI / 2; }); });
for (var i = 0; i < 3; i++) {
var cz = -3.6 - i * 3.2;
aptBox(1.6, 0.12, 2.6, aptMat(0x7A7E86, "metal"), 0, 0.55, cz, g);
aptBox(1.5, 0.9, 2.4, aptMat([0x2A3A5A, 0x8A2A22, 0x3A3A3A][i], null), 0, 1.1, cz, g);
[-0.7, 0.7].forEach(function (xx) { var w = aptCyl(0.2, 0.15, d, xx, 0.2, cz, g, 8); w.rotation.z = Math.PI / 2; });
}
aptSolid(x, z, 1, 6, 0, 1.6, ry);
},
function (x, z, ry) {
var g = aptGroup(x, 0, z, ry), w = aptMat(0xE8E8E4, "metal", { phong: 50 }), d = aptMat(0x1A1A1C, null);
aptBox(2.5, 2.2, 2.4, aptMat(0x2A5A8A, "metal", { phong: 40 }), 0, 1.6, 4, g);
var t = aptCyl(1.25, 7, w, 0, 1.9, -0.8, g, 16);
t.rotation.x = Math.PI / 2;
[-3.4, -2, 3.8].forEach(function (zz) { [-1.2, 1.2].forEach(function (xx) { var wh = aptCyl(0.5, 0.4, d, xx, 0.5, zz, g, 12); wh.rotation.z = Math.PI / 2; }); });
aptSolid(x, z, 1.3, 5.4, 0, 3, ry);
},
function (key, prof, seg, colFn) {
var k = "lathe|" + key;
if (APT.geos[k])
return APT.geos[k];
var pts = prof.map(function (p) { return new THREE.Vector2(p[1], p[0]); });
var g = new THREE.LatheGeometry(pts, seg);
g.rotateX(Math.PI / 2);
if (colFn) {
var p = g.attributes.position, cols = new Float32Array(p.count * 3), c = new THREE.Color();
for (var i = 0; i < p.count; i++) {
c.setHex(colFn(p.getX(i), p.getY(i), p.getZ(i)));
cols[i * 3] = c.r;
cols[i * 3 + 1] = c.g;
cols[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(cols, 3));
}
g.computeVertexNormals();
APT.geos[k] = g;
return g;
},
function (key, span, root, tip, sweep, thick) {
var k = "wing|" + key;
if (APT.geos[k])
return APT.geos[k];
var s = new THREE.Shape();
s.moveTo(0, root / 2);
s.lineTo(span, root / 2 - sweep);
s.lineTo(span, root / 2 - sweep - tip);
s.lineTo(0, -root / 2);
s.lineTo(0, root / 2);
var g = new THREE.ExtrudeGeometry(s, { depth: thick, bevelEnabled: true, bevelThickness: thick * 0.4, bevelSize: Math.min(tip, root) * 0.08, bevelSegments: APT.lite ? 1 : 2, steps: 1 });
g.rotateX(Math.PI / 2);
g.translate(0, thick / 2, 0);
g.computeVertexNormals();
APT.geos[k] = g;
return g;
},
function (floats, line) {
var g = new THREE.Group(), lift = floats ? 1.0 : 0;
var white = aptMat(0xF4F4F2, null, { phong: 70, spec: 0x888888, keepLum: true }), stripe = aptMat(line.tail, null, { phong: 50 }), dark = aptMat(0x1A1C20, null), glassM = aptMat(0x2A3A4A, null, { phong: 100, spec: 0xAABBCC, op: 0.62 }), metal = aptMat(0xB8BCC2, "metal", { phong: 80 });
var B = aptGroup(0, lift, 0, 0, g);
var prof = [[-4.25, 0.08], [-3.6, 0.22], [-2.2, 0.42], [-0.6, 0.6], [0.4, 0.64], [1.6, 0.63], [2.6, 0.56], [3.3, 0.5], [3.85, 0.44], [4.05, 0.3]];
var fus = aptMesh(aptLathe("trainer", prof, APT.lite ? 12 : 20, function (x, y, z) { return y < -0.18 ? 0xE6E6E2 : (Math.abs(y + 0.06) < 0.08 ? line.tail : 0xF4F4F2); }), aptMat(0xFFFFFF, null, { phong: 70, spec: 0x888888, keepLum: true }), 0, 1.3, 0, B);
fus.material = APT.mats["vc-plane"] || (APT.mats["vc-plane"] = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 70, specular: 0x777777 }));
fus.scale.set(0.86, 1, 1);
aptBox(1.12, 0.5, 1.7, glassM, 0, 1.78, 0.75, B);
var ws = aptBox(1.0, 0.55, 0.06, glassM, 0, 1.8, 1.72, B);
ws.rotation.x = 0.75;
var wg = aptWingGeo("tw", 5.5, 1.55, 1.3, 0.12, 0.16);
[1, -1].forEach(function (sd) { var w = aptMesh(wg, white, 0, 2.06, 0.7, B); w.scale.x = sd; w.rotation.z = sd * 0.03; var st = aptBox(0.06, 1.5, 0.12, metal, sd * 1.6, 1.42, 0.6, B); st.rotation.z = -sd * 0.85; });
aptBox(0.06, 0.08, 1.2, stripe, 5.45, 2.14, 0.15, B);
aptBox(0.06, 0.08, 1.2, stripe, -5.45, 2.14, 0.15, B);
var hs = aptWingGeo("ths", 1.7, 0.95, 0.6, 0.25, 0.08);
[1, -1].forEach(function (sd) { var h = aptMesh(hs, white, 0, 1.38, -3.7, B); h.scale.x = sd; });
var fin = new THREE.Shape();
fin.moveTo(0, 0);
fin.lineTo(-1.25, 0);
fin.lineTo(-0.85, 1.35);
fin.lineTo(-0.35, 1.35);
fin.lineTo(0.6, 0);
fin.lineTo(0, 0);
var fg = APT.geos["tfin"] || (APT.geos["tfin"] = new THREE.ExtrudeGeometry(fin, { depth: 0.08, bevelEnabled: false }));
var fm = aptMesh(fg, stripe, 0, 1.45, -3.55, B);
fm.rotation.y = -Math.PI / 2;
fm.position.x = -0.04;
aptCyl(0.5, 0.5, aptMat(0xE8E8E4, null, { phong: 70 }), 0, 1.28, 3.9, B, 16, 0.42).rotation.x = Math.PI / 2;
var P = aptGroup(0, 1.28, 4.32, 0, B), sp = aptSph(0.17, aptMat(line.tail, null, { phong: 80 }), 0, 0, 0.05, P, 10);
sp.scale.z = 1.6;
var blades = aptGroup(0, 0, 0.02, 0, P);
[1, -1].forEach(function (sd) { var b = aptBox(0.12, 0.95, 0.04, dark, 0, sd * 0.5, 0, blades); b.rotation.y = sd * 0.25; aptBox(0.12, 0.12, 0.045, aptMat(0xE8C020, null), 0, sd * 0.93, 0, blades); });
var disc = new THREE.Mesh(APT.geos["pdisc"] || (APT.geos["pdisc"] = new THREE.CircleGeometry(1.0, 24)), APT.mats["pdisc"] || (APT.mats["pdisc"] = new THREE.MeshBasicMaterial({ color: 0xD8DCE0, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide })));
disc.position.z = 0.03;
disc.visible = false;
P.add(disc);
if (!floats) {
[[1.1, -0.1], [-1.1, -0.1]].forEach(function (p) { var leg = aptBox(0.08, 1.0, 0.12, metal, p[0] * 0.75, 0.75, p[1] + 0.4, B); leg.rotation.z = (p[0] > 0 ? -1 : 1) * 0.55; var w = aptCyl(0.3, 0.16, dark, p[0], 0.3, p[1] + 0.4, B, 14); w.rotation.z = Math.PI / 2; var spt = aptSph(0.32, white, p[0], 0.36, p[1] + 0.4, B, 10); spt.scale.set(0.5, 0.75, 1.4); });
aptBox(0.07, 0.9, 0.1, metal, 0, 0.75, 3.4, B);
var nw = aptCyl(0.24, 0.14, dark, 0, 0.24, 3.4, B, 12);
nw.rotation.z = Math.PI / 2;
}
else {
var fp = [[-2.8, 0.05], [-2.2, 0.22], [-0.6, 0.32], [1.4, 0.3], [2.6, 0.2], [3.1, 0.05]];
[1.25, -1.25].forEach(function (x) {
var f = aptMesh(aptLathe("float", fp, APT.lite ? 8 : 12), white, x, -0.85, 0.4, B);
f.scale.set(1, 0.8, 1);
aptBox(0.08, 1.3, 0.08, metal, x * 0.7, 0.0, 1.4, B).rotation.z = (x > 0 ? -1 : 1) * 0.5;
aptBox(0.08, 1.3, 0.08, metal, x * 0.7, 0.0, -0.6, B).rotation.z = (x > 0 ? -1 : 1) * 0.5;
});
}
g.userData.apt = { kind: floats ? "seaplane" : "trainer", blades: blades, disc: disc, prop: P };
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function (line) {
var g = new THREE.Group(), R = 1.95;
var bodyKey = "al" + line.k, body = line.body, belly = line.belly, stripeC = line.stripe;
var prof = [[-19.2, 0.12], [-18.2, 0.55], [-16.5, 1.15], [-14, 1.72], [-11, 1.95], [12, 1.95], [14.2, 1.9], [16, 1.7], [17.4, 1.32], [18.4, 0.86], [19.0, 0.42], [19.25, 0.05]];
var geo = aptLathe(bodyKey, prof, APT.lite ? 16 : 28, function (x, y, z) { var yy = y - 0; if (yy < -0.55)
return belly; if (yy > -0.42 && yy < -0.22 && z < 17)
return stripeC; return body; });
var vm = APT.mats["vc-al"] || (APT.mats["vc-al"] = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 80, specular: 0x777777 }));
var B = aptGroup(0, 3.15, 0, 0, g);
aptMesh(geo, vm, 0, 0, 0, B);
var n = APT.lite ? 18 : 30, wg = APT.geos["alwin"] || (APT.geos["alwin"] = new THREE.BoxGeometry(0.08, 0.36, 0.26)), wm = aptMat(0x1A2028, null, { phong: 100, spec: 0x667788 });
var I = new THREE.InstancedMesh(wg, wm, n * 2), M = new THREE.Matrix4();
for (var i = 0; i < n; i++) {
var z = -12.5 + i * (25 / (n - 1));
M.makeTranslation(R - 0.02, 0.28, z);
I.setMatrixAt(i * 2, M);
M.makeTranslation(-R + 0.02, 0.28, z);
I.setMatrixAt(i * 2 + 1, M);
}
B.add(I);
var wsm = aptMat(0x14181E, null, { phong: 120, spec: 0x8899AA });
[-1, 1].forEach(function (sd) { var w = aptBox(0.06, 0.42, 1.0, wsm, sd * 1.12, 0.72, 17.15, B); w.rotation.y = sd * 0.62; w.rotation.z = -sd * 0.25; });
var wf = aptBox(1.3, 0.42, 0.06, wsm, 0, 0.78, 17.62, B);
wf.rotation.x = 0.6;
[[1, 15.2], [-1, 15.2], [1, -15.6], [-1, -15.6]].forEach(function (d) { aptBox(0.04, 1.8, 0.9, aptMat(0xC8CCD2, null), d[0] * (R - 0.01), 0.15, d[1], B); });
var white = aptMat(0xE8EAEC, null, { phong: 60, spec: 0x666666, keepLum: true }), grey = aptMat(0xB8BCC2, "metal", { phong: 80 }), dark = aptMat(0x14161A, null);
var wgeo = aptWingGeo("alw", 15.5, 6.6, 1.6, 5.4, 0.42);
[1, -1].forEach(function (sd) {
var W = aptGroup(sd * 1.2, -0.95, 1.2, 0, B);
var w = aptMesh(wgeo, white, 0, 0, 0, W);
w.scale.x = sd;
W.rotation.z = sd * 0.09;
var wl = aptBox(0.12, 1.6, 1.2, aptMat(line.tail, null, { phong: 60 }), sd * 15.4, 0.8, -6.6, W);
wl.rotation.z = -sd * 0.25;
var E = aptGroup(sd * 5.6, -0.85, 4.4, 0, W);
var nac = aptCyl(0.95, 3.8, grey, 0, 0, 0, E, APT.lite ? 12 : 20, 0.82);
nac.rotation.x = Math.PI / 2;
var lip = aptCyl(0.98, 0.25, aptMat(0xD8DADE, "metal", { phong: 90 }), 0, 0, 1.95, E, APT.lite ? 12 : 20);
lip.rotation.x = Math.PI / 2;
var intake = aptCyl(0.82, 0.1, dark, 0, 0, 1.92, E, APT.lite ? 12 : 20);
intake.rotation.x = Math.PI / 2;
var fan = aptSph(0.28, aptMat(0x9AA0A8, "metal", { phong: 90 }), 0, 0, 1.75, E, 10);
fan.scale.z = 0.6;
var ex = aptCyl(0.55, 1.0, aptMat(0x5A5E66, "metal", { phong: 60 }), 0, 0, -2.3, E, APT.lite ? 10 : 16, 0.4);
ex.rotation.x = Math.PI / 2;
aptBox(0.3, 1.0, 2.6, grey, 0, 0.95, 0.2, E);
});
aptBox(2.6, 0.6, 6, aptMat(belly, null), 0, -1.55, 1.2, B);
var fin = new THREE.Shape();
fin.moveTo(0, 0);
fin.lineTo(-5.8, 0);
fin.lineTo(-7.6, 7.4);
fin.lineTo(-5.6, 7.4);
fin.lineTo(0, 0);
var fg = APT.geos["alfin"] || (APT.geos["alfin"] = new THREE.ExtrudeGeometry(fin, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 1 }));
var fm = aptMesh(fg, aptMat(line.tail, null, { phong: 60 }), -0.15, 0.35, -13.2, B);
fm.rotation.y = -Math.PI / 2;
var logo = aptCanvasMat("logo" + line.k, 128, 128, function (c, W, H) { c.clearRect(0, 0, W, H); c.fillStyle = aptHex(line.stripe); c.beginPath(); c.arc(W / 2, H / 2, W * 0.36, 0, Math.PI * 2); c.fill(); c.fillStyle = aptHex(line.tail); c.font = "bold 52px Georgia,serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(line.k, W / 2, H / 2 + 3); }, { full: true, basic: true });
logo.transparent = true;
[1, -1].forEach(function (sd) { var lp = aptPlane(2.4, 2.4, logo, sd * 0.32, 4.6, -18.2, sd > 0 ? Math.PI / 2 : -Math.PI / 2, B); });
var hs = aptWingGeo("alh", 5.6, 3.4, 1.2, 2.4, 0.22);
[1, -1].forEach(function (sd) { var h = aptMesh(hs, white, sd * 0.6, 0.5, -15.8, B); h.scale.x = sd; h.rotation.z = sd * 0.1; });
var nm = aptCanvasMat("alname" + line.k, 512, 64, function (c, W, H) { c.clearRect(0, 0, W, H); c.fillStyle = aptHex(line.tail); c.font = "bold 44px Georgia,serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(line.name, W / 2, H / 2 + 2); }, { full: true, basic: true });
nm.transparent = true;
[1, -1].forEach(function (sd) { aptPlane(8, 1, nm, sd * (R + 0.03), 1.15, 6, sd > 0 ? Math.PI / 2 : -Math.PI / 2, B); });
var leg = aptMat(0xC8CCD2, "metal", { phong: 80 });
aptCyl(0.12, 2.2, leg, 0, -2.05, 14.4, B, 8);
[-0.3, 0.3].forEach(function (x) { var w = aptCyl(0.42, 0.3, dark, x, -2.72, 14.4, B, 14); w.rotation.z = Math.PI / 2; });
[-3.0, 3.0].forEach(function (x) { aptCyl(0.18, 2.2, leg, x, -1.95, 0.4, B, 8); [-0.38, 0.38].forEach(function (o) { [-0.55, 0.55].forEach(function (zz) { var w = aptCyl(0.58, 0.38, dark, x + o, -2.57, 0.4 + zz, B, 16); w.rotation.z = Math.PI / 2; }); }); });
var navR = aptGlowM(0xFF3A2A), navG = aptGlowM(0x3AFF6A), navW = aptGlowM(0xFFFFFF);
aptSph(0.12, navR, 15.4, -0.35, -5.4, B, 6);
aptSph(0.12, navG, -15.4, -0.35, -5.4, B, 6);
aptSph(0.12, navW, 0, 0.2, -19.2, B, 6);
g.userData.apt = { kind: "airliner", B: B };
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function () {
if (APT.mats["bezel"])
return APT.mats["bezel"];
var cv = document.createElement("canvas");
cv.width = 128;
cv.height = 128;
var x = cv.getContext("2d");
x.fillStyle = "#E4E2DE";
x.fillRect(0, 0, 128, 128);
var g = x.createLinearGradient(0, 0, 128, 0);
g.addColorStop(0, "rgba(0,0,0,0.10)");
g.addColorStop(0.5, "rgba(0,0,0,0)");
g.addColorStop(1, "rgba(0,0,0,0.10)");
x.fillStyle = g;
x.fillRect(0, 0, 128, 128);
var rr = function (cx, cy, w, h, r) { x.beginPath(); x.moveTo(cx - w / 2 + r, cy - h / 2); x.arcTo(cx + w / 2, cy - h / 2, cx + w / 2, cy + h / 2, r); x.arcTo(cx + w / 2, cy + h / 2, cx - w / 2, cy + h / 2, r); x.arcTo(cx - w / 2, cy + h / 2, cx - w / 2, cy - h / 2, r); x.arcTo(cx - w / 2, cy - h / 2, cx + w / 2, cy - h / 2, r); x.closePath(); };
rr(64, 62, 58, 82, 26);
x.fillStyle = "#B8B4AC";
x.fill();
rr(64, 62, 46, 70, 21);
x.fillStyle = "#2A2C30";
x.fill();
rr(64, 62, 40, 64, 18);
x.save();
x.globalCompositeOperation = "destination-out";
x.fill();
x.restore();
var t = new THREE.CanvasTexture(cv);
t.anisotropy = 4;
var m = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.5, transparent: false, side: THREE.DoubleSide });
m.userData.tex = t;
APT.mats["bezel"] = m;
return m;
},
function (B) {
var R = 1.95, L = APT.lite, C = aptGroup(0, 0, 0, 0, B);
var wall = aptMat(0xE4E2DE, null, { phong: 20 }), seatM = aptMat(0x2A3A5A, null), seatH = aptMat(0xE8E6E2, null), carpet = aptMat(0x3A4458, null), bin = aptMat(0xF0EEEA, null, { phong: 30 });
aptBox(3.4, 0.06, 30, carpet, 0, -0.98, 0, C);
[1, -1].forEach(function (sd) {
var x = sd * (R - 0.18);
aptBox(0.06, 0.9, 30, wall, x, -0.5, 0, C);
aptBox(0.06, 0.6, 30, wall, x * 0.97, 0.9, 0, C);
var n = L ? 18 : 30, pitch = 25 / (n - 1), pg = APT.geos["cabbez"] || (APT.geos["cabbez"] = new THREE.PlaneGeometry(pitch, 0.62)), I = new THREE.InstancedMesh(pg, aptBezelMat(), n), M = new THREE.Matrix4(), Q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -sd * Math.PI / 2), one = new THREE.Vector3(1, 1, 1);
for (var i = 0; i < n; i++) {
M.compose(new THREE.Vector3(x - sd * 0.035, 0.29, -12.5 + i * pitch), Q, one);
I.setMatrixAt(i, M);
}
C.add(I);
aptBox(0.7, 0.42, 30, bin, sd * (R - 0.62), 1.25, 0, C);
aptBox(0.04, 0.12, 30, aptMat(0xFFF2D8, null, { e: 0xFFE8C0, ei: 0.6 }), sd * (R - 0.95), 1.04, 0, C);
});
aptBox(2.2, 0.06, 30, aptMat(0xF4F2EE, "plaster"), 0, 1.52, 0, C);
var rows = L ? 14 : 24, sg = APT.geos["seat"] || (APT.geos["seat"] = new THREE.BoxGeometry(0.46, 0.12, 0.48)), bg = APT.geos["seatb"] || (APT.geos["seatb"] = new THREE.BoxGeometry(0.46, 0.72, 0.1));
var S = new THREE.InstancedMesh(sg, seatM, rows * 6), BK = new THREE.InstancedMesh(bg, seatM, rows * 6), M2 = new THREE.Matrix4(), k = 0;
for (var r = 0; r < rows; r++) {
var z = 12 - r * (24 / rows);
[-1.55, -1.07, -0.59, 0.59, 1.07, 1.55].forEach(function (x) { M2.makeTranslation(x, -0.6, z); S.setMatrixAt(k, M2); M2.makeTranslation(x, -0.24, z - 0.26); BK.setMatrixAt(k, M2); k++; });
}
C.add(S);
C.add(BK);
var hr = aptRnd(5), hm = [aptMat(0x3A2A1E, null), aptMat(0xC8A060, null), aptMat(0x1A1A1A, null), aptMat(0x8A6A4A, null)];
for (var h = 0; h < (L ? 8 : 20); h++) {
var hx = [-1.55, -1.07, -0.59, 0.59, 1.07, 1.55][Math.floor(hr() * 6)], hz = 12 - Math.floor(hr() * rows) * (24 / rows);
aptSph(0.13, hm[h % 4], hx, 0.24, hz - 0.18, C, 8);
}
return C;
},
function (kind) {
var C = aptCfg(), S = APT_PLANES[kind];
if (aptKeeper())
return "";
if (C.grounded)
return "Every flight is held on the ground just now (the Keeper's call).";
if (!C.fly)
return "Flying your own plane is closed for now (the Keeper's call). The gates still fly passengers.";
if (!aptAdult())
return "Only grown-up dreamers may take the controls. You can fly as a passenger any time: the gates are through security.";
if (!aptSigned())
return "Sign in first: your pilot's licence is kept with your name.";
var L = aptLicNow(), have = L ? aptLicRank(L.kind) : 0;
if (kind === "airliner" && aptHasJob(7400))
return "";
if (have < aptLicRank(S.need))
return S.need === "student" ? "The trainer needs a student pilot certificate: Captain Vasquez's lessons and the ten questions at the flight school, in the hangar." :
S.need === "private" ? "The seaplane needs a private pilot's licence: fly the check ride in the trainer (take off, fly the circuit, land on the runway)." :
"The airliner needs the airline rating: a private licence and five good landings logged (or the Airline pilot job).";
return "";
},
function (kind, R) {
var why = aptMayFly(kind);
if (why) {
aptSay("✈️ <b>" + aptEsc(why) + "</b>");
return;
}
if (APT.fly || APT.ride)
return;
var S = APT_PLANES[kind], g = R.g;
APT.fly = { spec: S, kind: kind, R: R, g: g, x: R.x, z: R.z, y: R.water ? 0.05 : 0, h: R.h, p: 0, r: 0, v: 0, thr: 0, flaps: S.k === "airliner" ? 0 : 1, ground: true, view: "cab", t: 0, air: 0, maxY: 0, far: 0,
said: {}, vs: 0, check: aptLicNow() && aptLicNow().kind === "student", call: (kind === "airliner" ? "Somnucor " : kind === "seaplane" ? "Floatplane " : "Trainer ") + (100 + Math.floor(Math.random() * 800)) };
worldCard(null);
worldPrompt(null);
aptCockpit(kind);
aptFlyHud(true);
aptPropSpin(g, false);
aptTone(220, 0.4);
aptDid("fly_" + kind);
aptSay("✈️ <b>" + S.name + "</b>: you're in the left seat. Power up with <b>Space</b> (A on a controller, the right stick up in VR), steer with <b>A/D</b> on the ground. At " + Math.round(S.rot * 1.944) + " knots ease back (<b>S</b> or ↓) and she lifts off. <b>F</b> flaps, <b>B</b> brakes, <b>V</b> the view." +
(APT.fly.check ? " <b>This is your check ride:</b> take off, climb above 800 ft, fly the circuit out and back, and land on the runway." : ""));
aptRadio("Somnucor Ground", "\"" + APT.fly.call + ", Somnucor Ground, good day. Taxi to the holding point, runway " + (Math.cos(R.h) < 0 || kind === "seaplane" ? "two-seven" : "two-seven") + ". Report ready.\"");
},
function () {
var pitch = 0, roll = 0, thr = 0;
if (keys["KeyW"] || keys["ArrowUp"])
pitch -= 1;
if (keys["KeyS"] || keys["ArrowDown"])
pitch += 1;
if (keys["KeyA"] || keys["ArrowLeft"])
roll -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
roll += 1;
if (keys["Space"])
thr += 1;
if (keys["KeyC"] || keys["ControlLeft"])
thr -= 1;
var jv = (typeof joyInput === "function" && joyInput()) || (typeof padInput === "function" && padInput()) || (typeof VRM !== "undefined" && VRM.stick) || null;
if (jv && !pitch && !roll) {
pitch = -jv.f;
roll = jv.s;
}
try {
if (typeof gpdPad === "function" && typeof GPD !== "undefined" && GPD.on) {
var p = gpdPad();
if (p && p.axes) {
var ax = p.axes[0] || 0, ay = p.axes[1] || 0;
if (Math.abs(ax) > 0.12 && !roll)
roll = ax;
if (Math.abs(ay) > 0.12 && !pitch)
pitch = ay;
var rt = p.buttons[7], lt = p.buttons[6];
if (rt && rt.value > 0.1)
thr = Math.max(thr, rt.value);
if (lt && lt.value > 0.1)
thr = Math.min(thr, -lt.value);
}
}
}
catch (e) { }
if (APT.hudHold) {
if (APT.hudHold === "up")
thr = 1;
if (APT.hudHold === "down")
thr = -1;
}
if (aptProg().invert)
pitch = -pitch;
return { pitch: Math.max(-1, Math.min(1, pitch)), roll: Math.max(-1, Math.min(1, roll)), thr: thr, brake: !!APT_FLY_KEYS.b || APT.hudHold === "brake" };
},
function (x, z) {
var R = APT_RWY;
if (Math.abs(z) < R.w / 2 + 6 && x > R.x0 - 110 && x < R.x1 + 110)
return "runway";
if (Math.abs(z - R.twz) < 13 && Math.abs(x) < 1060)
return "taxiway";
if ([-1040, -420, 0, 420, 1040].some(function (lx) { return Math.abs(x - lx) < 13 && z < 0 && z > R.twz; }))
return "taxiway";
if (x > -262 && x < 262 && z > -288 && z < -118)
return "apron";
if (x > -336 && x < -204 && z > -292 && z < -198)
return "apron";
if (x > -310 && x < -230 && z > -335 && z < -275)
return "hangar";
return "";
},
function (dt) {
var F = APT.fly;
if (!F || F.down)
return;
dt = Math.min(dt, 0.05);
F.t += dt;
var S = F.spec, I = aptFlyInput(), C = aptCfg();
if (C.grounded && !aptKeeper() && !F.ground) {
if (!F.said.gr) {
F.said.gr = 1;
aptRadio("Somnucor Tower", "\"" + F.call + ", all traffic is to land now. Runway two-seven, cleared to land.\"");
}
}
F.thr = Math.max(0, Math.min(1, F.thr + I.thr * dt * 0.45));
if (I.brake && F.ground)
F.thr = 0;
var drag = S.drag * F.v * F.v * (F.flaps ? 1.45 : 1), a = S.thr * F.thr * (F.ground ? 1 : 1) - drag - 9.8 * Math.sin(F.p);
if (F.ground) {
a -= (S.water ? 0.6 : 0.25) + (I.brake ? (S.water ? 1.2 : 3.2) : 0);
if (F.v < 0.05 && F.thr < 0.02) {
F.v = 0;
a = Math.max(0, a);
}
}
F.v = Math.max(0, F.v + a * dt);
var stall = S.stall * (F.flaps ? 0.84 : 1), rot = S.rot * (F.flaps ? 0.9 : 1);
var auth = Math.min(1, F.v / rot);
if (F.ground) {
if (F.v >= rot * 0.92)
F.p += I.pitch * S.pitchR * dt * auth;
else
F.p += (0 - F.p) * Math.min(1, dt * 3);
F.p = Math.max(0, Math.min(0.26, F.p));
F.h -= I.roll * dt * Math.min(0.7, 6 / Math.max(F.v, 6)) * Math.min(1, F.v / 3 + 0.25);
F.r += (0 - F.r) * Math.min(1, dt * 4);
if (F.p > 0.04 && F.v >= rot * 0.95) {
F.ground = false;
F.said.lift || (F.said.lift = 1, aptSay("✈️ <b>Airborne.</b> " + (F.flaps ? "Flaps up (<b>F</b>) once you're climbing nicely. " : "") + "Hold her at a gentle climb."));
}
}
else {
F.p += I.pitch * S.pitchR * dt * auth;
if (F.v < stall) {
F.p -= dt * 0.7 * (1 - F.v / stall + 0.3);
if (!F.said.stall || F.t - F.said.stall > 4) {
F.said.stall = F.t;
aptSay("⚠️ <b>STALL.</b> The wing has given up: lower the nose (<b>W</b>) and add power.");
aptTone(180, 0.3);
}
}
F.p = Math.max(-0.6, Math.min(0.42, F.p));
F.r += I.roll * S.rollR * dt;
if (!I.roll)
F.r += (0 - F.r) * Math.min(1, dt * 0.35);
F.r = Math.max(-0.95, Math.min(0.95, F.r));
F.h -= 9.8 * Math.tan(F.r) / Math.max(F.v, S.stall) * dt;
F.p -= Math.abs(Math.sin(F.r)) * 0.06 * dt;
}
F.h = aptAng(F.h);
var horiz = F.v * Math.cos(F.p), vy = F.v * Math.sin(F.p);
if (!F.ground && F.v < stall)
vy -= (stall - F.v) * 0.9;
F.vs = vy;
var nx = F.x + Math.sin(F.h) * horiz * dt, nz = F.z + Math.cos(F.h) * horiz * dt, ny = F.y + vy * dt;
var gy = aptLand(nx, nz);
var lake = aptOnLake(nx, nz, 4);
if (lake)
gy = 0.05;
var K = APT.K, nose = { x: nx + Math.sin(F.h) * (S.k === "airliner" ? 19 : 4.2), z: nz + Math.cos(F.h) * (S.k === "airliner" ? 19 : 4.2) };
if (K && (aptSolidAt(K, nose.x, nose.z, ny + 0.6) || aptSolidAt(K, nx, nz, ny + 0.8))) {
if (F.ground && F.v < 9) {
F.v = 0;
if (!F.said.blk || F.t - F.said.blk > 3) {
F.said.blk = F.t;
aptSay("✋ Something's in the way: steer clear (<b>A/D</b>) and try again.");
}
nx = F.x;
nz = F.z;
}
else {
aptCrash("You've struck something on the field.");
return;
}
}
if (ny <= gy + 0.001) {
if (!F.ground) {
var sink = -F.vs, surf = lake ? "water" : aptPaved(nx, nz), wantWater = !!S.water;
var hard = S.k === "airliner" ? 3.2 : 3.6;
if (wantWater ? surf !== "water" : (surf === "water" || (surf === "" && F.v > 20))) {
aptCrash(surf === "water" ? "She's come down on the lake: a landplane can't." : "That's not a runway: she's down in the grass.");
return;
}
if (sink > hard * 1.6 || Math.abs(F.r) > 0.42 || F.p < -0.2) {
aptCrash("A very hard landing.");
return;
}
F.ground = true;
ny = gy;
F.p = Math.max(0, F.p);
var grade = sink < 0.9 ? "A greaser: you hardly felt the wheels touch." : sink < 1.8 ? "A good, firm landing." : sink < hard ? "A firm arrival. Ease the flare a touch earlier next time." : "Hard: the gear held, but go gentler.";
var good = sink < hard && Math.abs(F.r) < 0.2 && surf !== "";
aptLanded(F, good, grade, surf);
}
ny = gy;
}
var far = Math.hypot(nx, nz);
if (far > 6200 && !F.ground) {
var back = Math.atan2(-nx, -nz);
F.h += aptAng(back - F.h) * Math.min(1, dt * 0.4);
if (!F.said.edge || F.t - F.said.edge > 12) {
F.said.edge = F.t;
aptRadio("Somnucor Approach", "\"" + F.call + ", you're leaving our airspace. Turn back towards the field.\"");
}
}
if (ny > 4200) {
ny = 4200;
F.p = Math.min(F.p, 0);
}
F.x = nx;
F.z = nz;
F.y = ny;
F.maxY = Math.max(F.maxY, ny);
F.far = Math.max(F.far, Math.hypot(nx, nz));
if (!F.ground)
F.air += dt;
aptFlyRadioTick(F);
aptFlyPlace(F);
aptPapiTick(F);
aptFlyHudPaint(F);
if (F.ground && F.v < 0.6) {
if (!F.outP) {
F.outP = 1;
worldPrompt("<b>" + S.name + "</b> · <b>press E</b> to climb out", function () { aptFlyEnd(); });
}
}
else if (F.outP) {
F.outP = 0;
worldPrompt(null);
}
},
function (F) {
var R = APT_RWY, onRwy = Math.abs(F.z) < R.w / 2 && F.x > R.x0 && F.x < R.x1;
if (F.ground && onRwy && F.thr > 0.5 && !F.said.cto && F.spec.k !== "seaplane") {
F.said.cto = 1;
var rw = Math.sin(F.h) < 0 ? "two-seven" : "zero-niner";
aptRadio("Somnucor Tower", "\"" + F.call + ", wind two-seven-zero at eight, runway " + rw + ", cleared for take-off.\"");
}
if (!F.ground && F.y > 250 && !F.said.climb) {
F.said.climb = 1;
aptRadio("Somnucor Tower", "\"" + F.call + ", climbing through eight hundred feet. Fly the circuit, report downwind.\"");
}
if (!F.ground && F.far > 1500 && F.y > 150 && !F.said.down) {
F.said.down = 1;
aptRadio("Somnucor Tower", "\"" + F.call + ", number one. Report final.\"");
}
var lined = Math.abs(F.z) < 160 && Math.abs(F.x) < R.x1 + 5000 && Math.abs(Math.sin(F.h)) > 0.92 && F.vs < 0.5 && F.y < 500;
if (!F.ground && F.said.climb && lined && !F.said.land) {
F.said.land = 1;
aptRadio("Somnucor Tower", "\"" + F.call + ", runway " + (Math.sin(F.h) < 0 ? "two-seven" : "zero-niner") + ", cleared to land. Wind two-seven-zero at eight.\"");
}
},
function (F, good, grade, surf) {
var p = aptProg();
p.log.push({ k: F.kind, at: Date.now(), good: good, air: Math.round(F.air) });
if (p.log.length > 60)
p.log.shift();
if (good)
p.landings = (p.landings || 0) + 1;
aptProgSave();
aptDid("land_" + F.kind);
aptSay("🛬 <b>" + grade + "</b> " + (good ? "Logged (" + p.landings + " good landing" + (p.landings > 1 ? "s" : "") + " in your logbook)." : "") + " Throttle closed (<b>C</b>), brakes (<b>B</b>), and taxi in.");
aptTone(good ? 523 : 262, 0.15);
if (F.check && good && surf === "runway" && F.maxY > 240 && F.far > 1200 && F.air > 100) {
F.check = false;
aptAward("private");
}
else if (F.check && good && surf === "runway") {
aptSay("🛬 <b>" + grade + "</b> Not a full circuit yet for the check ride: climb above 800 ft, fly out at least a mile and back round, two minutes or more in the air.");
}
var L = aptLicNow();
if (L && L.kind === "private" && p.landings >= 5 && good)
aptAward("airline");
},
function (why) {
var F = APT.fly;
if (!F || F.down)
return;
F.down = 1;
aptTone(140, 0.5);
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = "The fire crew are there in seconds. Nobody is hurt.";
}
var p = aptProg();
p.crashes = (p.crashes || 0) + 1;
aptProgSave();
setTimeout(function () {
aptFlyEnd(true);
var R = F.R, P = camera.position;
P.set(APT.base + R.x + (R.water ? 0 : 3.2), (R.water ? 0.7 : 0) + 1.72, R.z + (R.water ? -12 : 3));
if (typeof flyY !== "undefined")
flyY = R.water ? 0.7 : 0;
setTimeout(function () { if (typeof garFade === "function")
garFade(false); }, 500);
aptSay("🚒 <b>" + aptEsc(why) + "</b> The crash tender was there before the dust settled; you're unhurt and back by the " + (R.water ? "dock" : "hangar") + ". The mechanics will have her fixed by morning; another plane's ready now. Captain Vasquez says: \"Every pilot learns. Slower, steadier, wings level.\"");
}, 1300);
},
function (quiet) {
var F = APT.fly;
if (!F)
return;
APT.fly = null;
worldPrompt(null);
aptFlyHud(false);
aptCockpitHide();
var R = F.R, g = F.g;
if (!quiet) {
var P = camera.position, side = F.spec.k === "airliner" ? 6 : 3;
P.set(APT.base + F.x + Math.cos(F.h) * side, F.y + 1.72 + (F.spec.water ? 0.65 : 0), F.z - Math.sin(F.h) * side);
if (typeof flyY !== "undefined")
flyY = F.y;
if (F.spec.water && !aptOnDock(F.x + Math.cos(F.h) * side, F.z - Math.sin(F.h) * side)) {
P.set(APT.base + 0, 0.7 + 1.72, 348);
}
aptSay("✈️ You climb out. " + (Math.hypot(F.x - R.x, F.z - R.z) > 30 ? "The ground crew will tow her back to her stand." : "She's back on her stand."));
}
g.position.set(R.x, R.water ? 0.05 : 0, R.z);
g.rotation.set(0, R.h, 0);
aptPropSpin(g, false);
if (typeof camera !== "undefined") {
camera.rotation.z = 0;
}
},
function (F) {
var g = F.g;
g.position.set(F.x, F.y, F.z);
g.rotation.set(-F.p, F.h, F.r, "YXZ");
aptPropSpin(g, F.thr > 0.12 || F.v > 8);
var P = camera.position, e = F.spec.eye, m = new THREE.Matrix4().makeRotationFromEuler(g.rotation), v = new THREE.Vector3(e[0], e[1], e[2]).applyMatrix4(m);
if (F.view === "chase" && !(typeof VRM !== "undefined" && VRM.xr)) {
var back = F.spec.k === "airliner" ? 55 : 16, up = F.spec.k === "airliner" ? 12 : 4.5;
P.set(APT.base + F.x - Math.sin(F.h) * back, Math.max(F.y + up, aptLand(F.x, F.z) + 2), F.z - Math.cos(F.h) * back);
}
else
P.set(APT.base + F.x + v.x, F.y + v.y, F.z + v.z);
if (typeof flyY !== "undefined")
flyY = P.y - 1.72;
if (typeof standFall !== "undefined")
try {
standFall = 0;
}
catch (e) { }
if (F.h0 === undefined) {
F.h0 = F.h;
yaw = F.h + Math.PI;
if (typeof pitch !== "undefined")
pitch = -0.06;
}
yaw += aptAng(F.h - F.h0);
F.h0 = F.h;
},
function (F) {
(APT.papi || []).forEach(function (P) {
var d = (F.x - P.x) * -P.dir;
if (d < 0 || d > 6000 || Math.abs(F.z) > 400) {
P.row.forEach(function (g, i) { if (g)
g.material.color.setHex(i < 2 ? 0xFFFFFF : 0xFF3A2A); });
return;
}
var ang = Math.atan2(F.y, d) * 180 / Math.PI, th = [3.5, 3.17, 2.83, 2.5];
P.row.forEach(function (g, i) { if (g)
g.material.color.setHex(ang > th[3 - i] ? 0xFFFFFF : 0xFF3A2A); });
});
},
function (kind) {
aptCockpitHide();
var g = new THREE.Group(), U = {}, lite = APT.lite;
var panelM = aptMat(0x22252A, null, { phong: 20 }), trim = aptMat(0x3A3E46, null, { phong: 30 }), seat = aptMat(0x4A3A30, null), frame = aptMat(0xE6E6E2, null, { phong: 40 }), dark = aptMat(0x14161A, null);
if (kind === "airliner") {
aptBox(2.6, 0.12, 0.5, panelM, -0.55, -0.18, 0.72, g);
var pn = aptBox(2.6, 0.55, 0.08, trim, -0.55, -0.5, 0.86, g);
pn.rotation.x = -0.25;
U.cv = vcpOK() ? vcpCanvas(lite ? 512 : 1024, lite ? 128 : 256) : aptCv(lite ? 512 : 1024, lite ? 128 : 256);
var sc = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.5), new THREE.MeshBasicMaterial({ map: U.cv.t, toneMapped: false }));
sc.position.set(-0.55, -0.5, 0.81);
sc.rotation.set(-0.25, Math.PI, 0);
g.add(sc);
U.screen = sc;
aptBox(0.45, 0.5, 0.9, trim, -0.55, -0.85, 0.25, g);
U.lever = aptGroup(-0.55, -0.58, 0.25, 0, g);
[-0.07, 0.07].forEach(function (x) { aptBox(0.04, 0.18, 0.04, aptMat(0x9A9EA4, "metal"), x, 0.09, 0, U.lever); aptBox(0.09, 0.04, 0.05, dark, x, 0.19, 0, U.lever); });
[0.62, -1.72].forEach(function (x) { aptBox(0.06, 1.1, 1.6, frame, x, -0.05, 0.0, g); });
aptBox(2.4, 0.08, 1.4, trim, -0.55, 0.55, 0.15, g);
for (var k = 0; k < 14; k++)
aptBox(0.05, 0.03, 0.05, aptMat([0xE8E8E8, 0x3AC86A, 0xE8C020][k % 3], null), -1.4 + k * 0.13, 0.5, 0.25 + (k % 2) * 0.2, g);
aptBox(0.06, 0.7, 0.06, frame, -0.0, 0.12, 0.9, g);
aptBox(0.06, 0.7, 0.06, frame, -1.1, 0.12, 0.9, g);
U.yoke = aptGroup(0, -0.55, 0.52, 0, g);
aptBox(0.06, 0.06, 0.3, dark, 0, 0, 0.15, U.yoke);
var yw = aptBox(0.34, 0.05, 0.05, dark, 0, 0.02, 0, U.yoke);
aptBox(0.05, 0.14, 0.05, dark, -0.16, 0.08, 0, U.yoke);
aptBox(0.05, 0.14, 0.05, dark, 0.16, 0.08, 0, U.yoke);
aptBox(0.6, 0.12, 0.6, seat, 0, -1.25, -0.1, g);
}
else {
var pnl = aptMat(0x2A2C30, null, { phong: 20 });
aptBox(1.15, 0.36, 0.06, pnl, -0.28, -0.32, 0.78, g);
aptBox(1.2, 0.05, 0.14, aptMat(0x1E2024, null), -0.28, -0.115, 0.79, g);
U.cv = vcpOK() ? vcpCanvas(lite ? 512 : 768, lite ? 192 : 288) : aptCv(lite ? 512 : 768, lite ? 192 : 288);
var sc2 = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.24), new THREE.MeshBasicMaterial({ map: U.cv.t, toneMapped: false }));
sc2.position.set(-0.02, -0.32, 0.745);
sc2.rotation.y = Math.PI;
g.add(sc2);
U.screen = sc2;
aptBox(0.24, 0.26, 0.02, aptMat(0x101214, null), -0.56, -0.33, 0.745, g);
for (var r = 0; r < 3; r++) {
aptBox(0.2, 0.06, 0.012, aptMat(0x2A2C30, null), -0.56, -0.24 - r * 0.08, 0.737, g);
aptBox(0.09, 0.022, 0.006, aptMat(0x0A1A10, null, { e: 0x2A9A5A, ei: 0.6 }), -0.6, -0.24 - r * 0.08, 0.73, g);
[-0.5, -0.47].forEach(function (kx) { aptCyl(0.012, 0.02, aptMat(0x9A9EA4, "metal"), kx, -0.24 - r * 0.08, 0.728, g, 8).rotation.x = Math.PI / 2; });
}
U.yoke = aptGroup(0, -0.42, 0.58, 0, g);
aptBox(0.04, 0.04, 0.22, dark, 0, 0, 0.11, U.yoke);
aptBox(0.26, 0.04, 0.04, dark, 0, 0.03, 0, U.yoke);
aptBox(0.04, 0.12, 0.04, dark, -0.12, 0.08, 0, U.yoke);
aptBox(0.04, 0.12, 0.04, dark, 0.12, 0.08, 0, U.yoke);
U.lever = aptGroup(-0.28, -0.44, 0.72, 0, g);
aptBox(0.015, 0.015, 0.12, aptMat(0x9A9EA4, "metal"), 0, 0, 0, U.lever);
aptSph(0.025, dark, 0, 0, -0.07, U.lever, 8);
[0.3, -0.86].forEach(function (x) { var dp = aptBox(0.05, 0.8, 0.05, frame, x, 0.1, 0.72, g); dp.rotation.x = 0.65; aptBox(0.05, 0.05, 1.2, frame, x, 0.36, 0.02, g); aptBox(0.05, 0.9, 0.05, frame, x, -0.1, -0.5, g); });
aptBox(1.2, 0.05, 1.3, aptMat(0xD8D4CC, null), -0.28, 0.4, 0.0, g);
aptBox(0.5, 0.1, 0.5, seat, 0, -0.95, -0.12, g);
aptBox(0.5, 0.6, 0.1, seat, 0, -0.6, -0.38, g);
aptBox(0.5, 0.1, 0.5, seat, -0.58, -0.95, -0.12, g);
aptBox(0.5, 0.6, 0.1, seat, -0.58, -0.6, -0.38, g);
}
g.traverse(function (o) { o.raycast = function () { }; o.frustumCulled = false; });
scene.add(g);
APT_CP.g = g;
APT_CP.kind = kind;
APT_CP.U = U;
},
function () {
var C = APT_CP;
if (!C.g)
return;
scene.remove(C.g);
C.g.traverse(function (o) { if (o.isMesh && o.geometry && !Object.keys(APT.geos).some(function (k) { return APT.geos[k] === o.geometry; }))
try {
o.geometry.dispose();
}
catch (e) { } if (o.material && o.material.map && C.U && C.U.cv && o.material.map === C.U.cv.t) {
try {
o.material.map.dispose();
o.material.dispose();
}
catch (e) { }
} });
C.g = null;
C.U = null;
C.kind = null;
},
function (F) {
var C = APT_CP;
if (!C.g)
return;
var on = F.view === "cab" || !!(typeof VRM !== "undefined" && VRM.xr);
C.g.visible = on;
if (!on)
return;
var e = F.spec.eye, R = F.g.rotation, m = new THREE.Matrix4().makeRotationFromEuler(R), v = new THREE.Vector3(e[0], e[1], e[2]).applyMatrix4(m);
C.g.position.set(APT.base + F.x + v.x, F.y + v.y, F.z + v.z);
C.g.rotation.copy(R);
var I = aptFlyInput(), U = C.U;
if (U.yoke) {
U.yoke.rotation.z = -I.roll * 0.6;
U.yoke.position.z = (F.spec.k === "airliner" ? 0.52 : 0.58) - I.pitch * 0.05;
}
if (U.lever)
U.lever.rotation.x = -F.thr * 0.9;
var now = performance.now();
if (now - C.paintAt > (APT.lite ? 200 : 100)) {
C.paintAt = now;
try {
if (F.spec.k === "airliner")
aptPaintGlass(U.cv, F);
else
aptPaintSix(U.cv, F);
}
catch (err) { }
}
},
function (cv, F) {
var x = cv.x, W = cv.c.width, H = cv.c.height, r = H * 0.23;
x.fillStyle = "#101114";
x.fillRect(0, 0, W, H);
var cols = [W * 0.17, W * 0.5, W * 0.83], rows = [H * 0.27, H * 0.74];
var face = function (cx, cy) { x.fillStyle = "#050608"; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = "#5A5E66"; x.lineWidth = r * 0.08; x.stroke(); };
var needle = function (cx, cy, a, len, col) { x.strokeStyle = col || "#F2F2F2"; x.lineWidth = r * 0.07; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(a) * len, cy - Math.cos(a) * len); x.stroke(); };
var ticks = function (cx, cy, n, a0, a1) { x.strokeStyle = "#E8E8E8"; x.lineWidth = r * 0.03; for (var i = 0; i <= n; i++) {
var a = a0 + (a1 - a0) * i / n;
x.beginPath();
x.moveTo(cx + Math.sin(a) * r * 0.78, cy - Math.cos(a) * r * 0.78);
x.lineTo(cx + Math.sin(a) * r * 0.92, cy - Math.cos(a) * r * 0.92);
x.stroke();
} };
var label = function (cx, cy, t, dy) { x.fillStyle = "#E8E8E8"; x.font = "bold " + Math.round(r * 0.2) + "px Arial"; x.textAlign = "center"; x.fillText(t, cx, cy + (dy || r * 0.5)); };
var kt = F.v * 1.944, ft = F.y * 3.281, S = F.spec;
var c0 = cols[0], c1 = rows[0];
face(c0, c1);
var amax = S.top * 1.944 * 1.15, aa = function (k) { return -2.6 + 5.2 * Math.min(1, k / amax); };
x.lineWidth = r * 0.09;
x.strokeStyle = "#3AC86A";
x.beginPath();
x.arc(c0, c1, r * 0.85, aa(S.stall * 1.944) - Math.PI / 2, aa(S.top * 1.944 * 0.9) - Math.PI / 2);
x.stroke();
x.strokeStyle = "#E8E8E8";
x.beginPath();
x.arc(c0, c1, r * 0.72, aa(S.stall * 0.84 * 1.944) - Math.PI / 2, aa(S.rot * 1.944 * 1.4) - Math.PI / 2);
x.stroke();
ticks(c0, c1, 10, -2.6, 2.6);
needle(c0, c1, aa(kt), r * 0.8);
label(c0, c1, Math.round(kt) + " KT");
var hx = cols[1], hy = rows[0];
x.save();
x.beginPath();
x.arc(hx, hy, r, 0, Math.PI * 2);
x.clip();
x.translate(hx, hy);
x.rotate(-F.r);
var off = F.p * r * 2.2;
x.fillStyle = "#3A7AC8";
x.fillRect(-r * 2, -r * 2 + off, r * 4, r * 2);
x.fillStyle = "#8A5A2A";
x.fillRect(-r * 2, off, r * 4, r * 2);
x.strokeStyle = "#FFF";
x.lineWidth = 2;
x.beginPath();
x.moveTo(-r * 2, off);
x.lineTo(r * 2, off);
x.stroke();
for (var pl = -2; pl <= 2; pl++) {
if (!pl)
continue;
var py = off - pl * r * 0.38;
x.beginPath();
x.moveTo(-r * 0.25, py);
x.lineTo(r * 0.25, py);
x.stroke();
}
x.restore();
x.strokeStyle = "#E8C020";
x.lineWidth = r * 0.08;
x.beginPath();
x.moveTo(hx - r * 0.55, hy);
x.lineTo(hx - r * 0.18, hy);
x.lineTo(hx - r * 0.08, hy + r * 0.1);
x.moveTo(hx + r * 0.55, hy);
x.lineTo(hx + r * 0.18, hy);
x.lineTo(hx + r * 0.08, hy + r * 0.1);
x.stroke();
x.strokeStyle = "#5A5E66";
x.lineWidth = r * 0.08;
x.beginPath();
x.arc(hx, hy, r, 0, Math.PI * 2);
x.stroke();
var ax = cols[2], ay = rows[0];
face(ax, ay);
ticks(ax, ay, 10, 0, Math.PI * 2 * 0.9);
needle(ax, ay, (ft % 1000) / 1000 * Math.PI * 2, r * 0.8);
needle(ax, ay, (ft % 10000) / 10000 * Math.PI * 2, r * 0.5, "#E8C020");
label(ax, ay, Math.round(ft) + " FT");
var tx = cols[0], ty = rows[1];
face(tx, ty);
x.save();
x.translate(tx, ty);
var turnRate = 9.8 * Math.tan(F.r) / Math.max(F.v, S.stall);
x.rotate(Math.max(-0.6, Math.min(0.6, turnRate * 8)));
x.fillStyle = "#F2F2F2";
x.fillRect(-r * 0.6, -r * 0.04, r * 1.2, r * 0.08);
x.beginPath();
x.arc(0, 0, r * 0.1, 0, Math.PI * 2);
x.fill();
x.restore();
label(tx, ty, "TURN");
var dx = cols[1], dy = rows[1];
face(dx, dy);
var hdg = aptBearing(F.h);
x.save();
x.translate(dx, dy);
x.rotate(-hdg * Math.PI / 180);
x.fillStyle = "#E8E8E8";
x.font = "bold " + Math.round(r * 0.22) + "px Arial";
x.textAlign = "center";
["N", "3", "6", "E", "12", "15", "S", "21", "24", "W", "30", "33"].forEach(function (t, i) { x.save(); x.rotate(i * Math.PI / 6); x.fillText(t, 0, -r * 0.62); x.restore(); });
x.restore();
x.fillStyle = "#E8C020";
x.beginPath();
x.moveTo(dx, dy - r * 0.9);
x.lineTo(dx - r * 0.08, dy - r * 0.72);
x.lineTo(dx + r * 0.08, dy - r * 0.72);
x.fill();
label(dx, dy, ("00" + Math.round(hdg)).slice(-3) + "°", r * 0.2);
var vx = cols[2], vy = rows[1];
face(vx, vy);
var fpm = F.vs * 196.85;
ticks(vx, vy, 8, -2.6, 2.6);
needle(vx, vy, -Math.PI / 2 + Math.max(-1, Math.min(1, fpm / 2000)) * 2.3, r * 0.8);
label(vx, vy, (fpm >= 0 ? "+" : "") + Math.round(fpm / 10) * 10 + " FPM");
x.fillStyle = "#E8C020";
x.font = "bold " + Math.round(H * 0.06) + "px Arial";
x.textAlign = "left";
x.fillText("POWER " + Math.round(F.thr * 100) + "%  FLAPS " + (F.flaps ? "DOWN" : "UP") + (F.ground ? "  ON GROUND" : ""), W * 0.02, H * 0.985);
cv.t.needsUpdate = true;
},
function (cv, F) {
var x = cv.x, W = cv.c.width, H = cv.c.height, w = W / 4;
x.fillStyle = "#050607";
x.fillRect(0, 0, W, H);
var kt = F.v * 1.944, ft = F.y * 3.281;
[0, 3].forEach(function (s) {
var ox = s * w + w * 0.06, ww = w * 0.88, cx = ox + ww / 2, cy = H / 2;
x.save();
x.beginPath();
x.rect(ox + ww * 0.18, H * 0.08, ww * 0.64, H * 0.84);
x.clip();
x.translate(cx, cy);
x.rotate(-F.r);
var off = F.p * H * 1.4;
x.fillStyle = "#2A6AC0";
x.fillRect(-ww, -H * 2 + off, ww * 2, H * 2);
x.fillStyle = "#7A4A22";
x.fillRect(-ww, off, ww * 2, H * 2);
x.strokeStyle = "#fff";
x.lineWidth = 2;
x.beginPath();
x.moveTo(-ww, off);
x.lineTo(ww, off);
x.stroke();
x.restore();
x.strokeStyle = "#E8C020";
x.lineWidth = 4;
x.beginPath();
x.moveTo(cx - ww * 0.2, cy);
x.lineTo(cx - ww * 0.06, cy);
x.moveTo(cx + ww * 0.06, cy);
x.lineTo(cx + ww * 0.2, cy);
x.stroke();
x.fillStyle = "#1A1C20";
x.fillRect(ox, H * 0.1, ww * 0.16, H * 0.8);
x.fillRect(ox + ww * 0.84, H * 0.1, ww * 0.16, H * 0.8);
x.fillStyle = "#3AFF6A";
x.font = "bold " + Math.round(H * 0.13) + "px monospace";
x.textAlign = "center";
x.fillText(Math.round(kt), ox + ww * 0.08, cy + H * 0.04);
x.fillText(Math.round(ft / 10) * 10, ox + ww * 0.92, cy + H * 0.04);
x.font = Math.round(H * 0.08) + "px monospace";
x.fillStyle = "#E8E8E8";
x.fillText("KT", ox + ww * 0.08, H * 0.95);
x.fillText("FT", ox + ww * 0.92, H * 0.95);
});
var nx = w + w * 0.05, nw = w * 0.9, ncx = nx + nw / 2, ncy = H * 0.82;
x.save();
x.beginPath();
x.rect(nx, H * 0.04, nw, H * 0.92);
x.clip();
x.translate(ncx, ncy);
x.rotate(F.h - Math.PI);
var sc = H * 0.75 / 6000;
x.strokeStyle = "#E8E8E8";
x.lineWidth = 3;
x.beginPath();
x.moveTo((APT_RWY.x0 - F.x) * -sc, (0 - F.z) * sc);
x.lineTo((APT_RWY.x1 - F.x) * -sc, (0 - F.z) * sc);
x.stroke();
x.restore();
x.fillStyle = "#E8C020";
x.beginPath();
x.moveTo(ncx, ncy - 12);
x.lineTo(ncx - 8, ncy + 8);
x.lineTo(ncx + 8, ncy + 8);
x.fill();
x.strokeStyle = "#3A8A5A";
x.lineWidth = 1.5;
[0.3, 0.55].forEach(function (k) { x.beginPath(); x.arc(ncx, ncy, H * k * 1.3, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); });
var ex = w * 2 + w * 0.08;
[0, 1].forEach(function (i) {
var cx = ex + w * (0.25 + i * 0.45), cy = H * 0.4, rr = H * 0.22;
x.strokeStyle = "#E8E8E8";
x.lineWidth = 3;
x.beginPath();
x.arc(cx, cy, rr, Math.PI * 0.75, Math.PI * 2.25);
x.stroke();
var n1 = 22 + F.thr * 78;
x.strokeStyle = "#3AFF6A";
x.lineWidth = 5;
x.beginPath();
x.moveTo(cx, cy);
var a = Math.PI * 0.75 + Math.PI * 1.5 * n1 / 100;
x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
x.stroke();
x.fillStyle = "#3AFF6A";
x.font = "bold " + Math.round(H * 0.1) + "px monospace";
x.textAlign = "center";
x.fillText(n1.toFixed(1), cx, cy + rr * 0.9);
});
x.fillStyle = "#E8C020";
x.font = "bold " + Math.round(H * 0.08) + "px monospace";
x.textAlign = "center";
x.fillText("N1   FLAPS " + (F.flaps ? "FULL" : "UP") + (F.ground ? "   GND" : ""), ex + w * 0.45, H * 0.92);
cv.t.needsUpdate = true;
},
function (on) {
var el = document.getElementById("apt-fly");
if (!on) {
if (el)
el.style.display = "none";
APT.hudHold = null;
return;
}
if (!el) {
el = document.createElement("div");
el.id = "apt-fly";
el.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:40;background:rgba(10,14,22,.82);color:#EAF2FF;font:600 13px system-ui,Arial;padding:8px 10px;border-radius:10px;border:1px solid rgba(255,255,255,.14);max-width:330px;user-select:none";
el.innerHTML = "<div id='apt-fly-r' style='font:700 14px ui-monospace,monospace;margin-bottom:6px'></div>" +
"<div style='display:flex;gap:6px;flex-wrap:wrap'>" + ["up:＋ Power", "down:－ Power", "flaps:Flaps", "brake:Brakes", "view:View", "inv:Invert pitch", "out:Climb out"].map(function (b) { var p = b.split(":"); return "<button data-af='" + p[0] + "' style='background:#22304A;color:#fff;border:1px solid #3A5A8A;border-radius:7px;padding:6px 9px;font:600 12px system-ui'>" + p[1] + "</button>"; }).join("") + "</div>";
try {
if (window.matchMedia && matchMedia("(pointer:coarse)").matches) {
el.style.left = "50%";
el.style.bottom = "auto";
el.style.top = "58px";
el.style.transform = "translateX(-50%)";
el.style.maxWidth = "440px";
el.style.padding = "5px 8px";
}
}
catch (e) { }
document.body.appendChild(el);
el.querySelectorAll("[data-af]").forEach(function (b) {
var k = b.getAttribute("data-af");
var down = function (e) { e.preventDefault(); e.stopPropagation(); if (k === "up" || k === "down" || k === "brake")
APT.hudHold = k;
else if (k === "flaps")
aptFlaps();
else if (k === "view")
aptFlyView();
else if (k === "inv") {
var p = aptProg();
p.invert = !p.invert;
aptProgSave();
aptSay("Pitch " + (p.invert ? "inverted: forward is nose up." : "as a yoke: back (S, ↓) is nose up."));
}
else if (k === "out") {
var F = APT.fly;
if (F && F.ground && F.v < 0.6)
aptFlyEnd();
else
aptSay("Stop first: power off (<b>C</b>) and brakes (<b>B</b>).");
} };
var up = function () { if (APT.hudHold === k)
APT.hudHold = null; };
b.addEventListener("pointerdown", down);
b.addEventListener("pointerup", up);
b.addEventListener("pointerleave", up);
});
}
el.style.display = "block";
},
function (F) {
var r = document.getElementById("apt-fly-r");
if (!r)
return;
if (APT.hudPaint && performance.now() - APT.hudPaint < 150)
return;
APT.hudPaint = performance.now();
var hdg = aptBearing(F.h);
r.textContent = F.spec.name.replace(/^The /, "") + " · " + Math.round(F.v * 1.944) + " kt · " + Math.round(F.y * 3.281) + " ft · " + ("00" + Math.round(hdg)).slice(-3) + "° · power " + Math.round(F.thr * 100) + "% · flaps " + (F.flaps ? "down" : "up") + (F.ground ? " · ground" : " · " + (F.vs >= 0 ? "+" : "") + Math.round(F.vs * 196.85 / 10) * 10 + " fpm");
worldBanner("<b>✈️ " + aptEsc(F.call) + "</b> · " + Math.round(F.v * 1.944) + " kt · " + Math.round(F.y * 3.281) + " ft" + (F.check ? " · check ride" : ""));
},
function (PP, t) {
var S = PP.segs, s = S[S.length - 1];
for (var i = 0; i < S.length; i++) {
if (t < S[i].t0 + S[i].dt) {
s = S[i];
break;
}
}
var u = Math.max(0, Math.min(1, (t - s.t0) / s.dt)), a = s.a, b = s.b;
var va = Math.max(0.3, a[3]), vb = Math.max(0.3, b[3]), tt = u * s.dt, acc = (vb - va) / s.dt, dist = va * tt + 0.5 * acc * tt * tt, f = s.d > 0 ? Math.max(0, Math.min(1, dist / s.d)) : 1;
var x = a[0] + (b[0] - a[0]) * f, z = a[1] + (b[1] - a[1]) * f, y = a[2] + (b[2] - a[2]) * f;
var h = Math.atan2(b[0] - a[0], b[1] - a[1]);
if (s.rev)
h += Math.PI;
var p = s.d > 0 ? Math.atan2(b[2] - a[2], Math.hypot(b[0] - a[0], b[1] - a[1])) : 0;
return { x: x, z: z, y: y, h: h, p: p, v: va + acc * tt, end: t >= PP.dur };
},
function (at) {
var now = at || aptNow(), N = Math.floor(now / APT_SL), out = [], C = aptCfg();
if (!C.traffic || C.grounded)
return out;
for (var n = N - 3; n <= N + 1; n++) {
var d = aptDep(n), PD = aptPathFor("dep", d.gate), t = (now - (d.T - APT_DEP_PRE)) / 1000;
if (t >= 0 && t < PD.dur) {
var q = aptPathAt(PD, t);
out.push(Object.assign({}, d, q, { t: t, dest: aptDestName(d.D), vis: true, phase: q.y > 3 ? "climbing out" : q.v > 30 ? "taking off" : t < 25 ? "pushing back" : "taxiing", alt: q.y }));
}
var a = aptArr(n), PA = aptPathFor("arr", a.gate), t2 = (now - a.T) / 1000;
if (t2 >= 0 && t2 < PA.dur) {
var q2 = aptPathAt(PA, t2);
out.push(Object.assign({}, a, q2, { t: t2, dest: aptDestName(a.D), vis: true, phase: q2.y > 3 ? "on final" : q2.v > 25 ? "landing" : "taxiing in", alt: q2.y }));
}
}
return out;
},
function () {
APT.fleet = { gate: [], moving: [] };
for (var g = 1; g <= 4; g++) {
if (APT.lite && (g === 1 || g === 4)) {
APT.fleet.gate.push(null);
continue;
}
var line = APT_LINES[g - 1], m = aptPlaneModel("airliner", line);
m.position.set(aptGateX(g), 0, APT_GATE_Z);
m.rotation.y = Math.PI;
aptP().add(m);
APT.fleet.gate.push(m);
aptPlaneSolidsGate(g);
}
},
function (g) {
var x = aptGateX(g), S = [];
[-14, -7, 0, 7, 14].forEach(function (lz) { S.push(aptRound(x, APT_GATE_Z - lz, 2.1, 0, 5.5)); });
S.push(aptSolid(x, APT_GATE_Z + 1, 17, 1.8, 2.2, 1.4));
[-6, 6].forEach(function (lx) { S.push(aptRound(x + lx, APT_GATE_Z - 1.8, 1.2, 0, 2.6)); });
S.forEach(function (s) { s.when = function () { var m = APT.fleet.gate[g - 1]; return !!(m && m.visible); }; });
},
function () {
var now = aptNow(), F = APT.fleet, mv = aptTrafficNow(now), L = worldLocal();
for (var g = 1; g <= 4; g++) {
var m = F.gate[g - 1];
if (m)
m.visible = aptGateParked(g, now);
}
if (APT.lite) {
mv.sort(function (a, b) { return Math.hypot(a.x - L.x, a.z - L.z) - Math.hypot(b.x - L.x, b.z - L.z); });
mv = mv.slice(0, 2);
}
var used = {};
mv.forEach(function (M) {
if (APT.ride && APT.ride.n === M.n && M.kind === "dep")
return;
var key = M.kind + M.n, slot = null;
for (var i = 0; i < F.moving.length; i++) {
if (F.moving[i].key === key) {
slot = F.moving[i];
break;
}
}
if (!slot) {
for (var j = 0; j < F.moving.length; j++) {
var s = F.moving[j];
if (!used[j] && s.key === null && s.line === M.line.k) {
slot = s;
break;
}
}
}
if (!slot) {
for (var k = 0; k < F.moving.length; k++) {
var s2 = F.moving[k];
if (!used[k] && s2.key === null) {
aptP().remove(s2.g);
s2.g = null;
slot = s2;
break;
}
}
}
if (!slot) {
slot = { g: null, key: null, line: null };
F.moving.push(slot);
}
if (!slot.g || slot.line !== M.line.k) {
if (slot.g)
aptP().remove(slot.g);
slot.g = aptPlaneModel("airliner", M.line);
slot.line = M.line.k;
aptP().add(slot.g);
}
slot.key = key;
used[F.moving.indexOf(slot)] = 1;
slot.g.visible = true;
slot.g.position.set(M.x, M.y, M.z);
slot.g.rotation.set(-M.p, M.h, 0, "YXZ");
});
F.moving.forEach(function (s, i) { if (!used[i]) {
s.key = null;
if (s.g)
s.g.visible = false;
} });
},
function (n) {
var now = aptNow(), N = Math.floor(now / APT_SL), out = [], C = aptCfg();
for (var i = N; out.length < n && i < N + 40; i++) {
var d = aptDep(i);
if (d.T < now - 60000)
continue;
var left = (d.T - now) / 1000, st = C.grounded ? "HELD" : !C.traffic ? "CANCELLED" : left < 15 ? "DEPARTED" : left < 60 ? "GATE CLOSING" : left < 360 ? "BOARDING" : "ON TIME";
if (!aptDestKnown(d.D) && !aptKeeper())
continue;
out.push({ n: i, time: aptClock(d.T), no: d.no, dest: d.D.name, gate: d.gate, status: st, line: d.line, left: left, D: d.D });
}
return out;
},
function (n) {
var now = aptNow(), N = Math.floor(now / APT_SL), out = [], C = aptCfg();
for (var i = N - 2; out.length < n && i < N + 20; i++) {
var a = aptArr(i), land = a.T + 60000, done = land + 50000;
if (done < now - 120000)
continue;
var st = C.grounded ? "HELD" : !C.traffic ? "CANCELLED" : now > done ? "AT GATE " + a.gate : now > land ? "LANDED" : now > a.T ? "ON FINAL" : "EXPECTED";
out.push({ time: aptClock(land), no: a.no, from: aptDestName(a.D), status: st });
}
return out;
},
function () {
APT.boards = [];
[[-38, -326.2, Math.PI, "dep"], [-44, -291.6, Math.PI, "dep"], [30, -358.6, 0, "arr"]].forEach(function (B, i) {
var m = aptCanvasMat("board" + i, APT.lite ? 512 : 768, APT.lite ? 256 : 384, function (x, w, h) { x.fillStyle = "#0A0E16"; x.fillRect(0, 0, w, h); }, { full: true, basic: true, live: true });
aptBox(7.4, 3.8, 0.3, aptMat(0x1A1C20, "metal"), B[0], 5.4, B[1] + (B[2] ? 0.2 : -0.2));
aptPlane(7, 3.5, m, B[0], 5.4, B[1] + (B[2] ? 0.0 : 0.0) + (B[2] ? -0.02 : 0.02), B[2]);
APT.boards.push({ m: m, kind: B[3] });
});
APT.boardAt = 0;
},
function () {
if (!APT.boards || Date.now() - APT.boardAt < 5000)
return;
APT.boardAt = Date.now();
APT.boards.forEach(function (B) {
var cv = B.m.userData.cv, x = cv.getContext("2d"), W = cv.width, H = cv.height;
x.fillStyle = "#0A0E16";
x.fillRect(0, 0, W, H);
x.fillStyle = B.kind === "dep" ? "#1F4E8C" : "#3A3E46";
x.fillRect(0, 0, W, H * 0.13);
x.fillStyle = "#FFFFFF";
x.font = "bold " + Math.round(H * 0.08) + "px Arial";
x.textAlign = "left";
x.fillText(B.kind === "dep" ? "✈ DEPARTURES" : "✈ ARRIVALS", W * 0.03, H * 0.095);
x.textAlign = "right";
x.fillText(aptClock(aptNow()), W * 0.97, H * 0.095);
var rows = B.kind === "dep" ? aptBoardLines(8) : aptArrLines(8), lh = H * 0.105;
x.font = "bold " + Math.round(H * 0.06) + "px ui-monospace,Menlo,monospace";
rows.forEach(function (r, i) {
var y = H * 0.22 + i * lh;
x.fillStyle = i % 2 ? "#101622" : "#0C111A";
x.fillRect(0, y - lh * 0.72, W, lh);
x.textAlign = "left";
x.fillStyle = "#FFD86A";
x.fillText(r.time, W * 0.02, y);
x.fillStyle = "#E8EEF8";
x.fillText(r.no, W * 0.16, y);
x.fillText((B.kind === "dep" ? r.dest : r.from).slice(0, 22), W * 0.33, y);
if (B.kind === "dep") {
x.fillStyle = "#E8EEF8";
x.fillText(String(r.gate), W * 0.72, y);
}
x.textAlign = "right";
var st = r.status;
x.fillStyle = /BOARD|LANDED|GATE \d/.test(st) ? "#5AF07A" : /CLOSING|FINAL/.test(st) ? "#FFB84A" : /HELD|CANCEL/.test(st) ? "#FF6A5A" : /DEPARTED/.test(st) ? "#8A94A8" : "#E8EEF8";
x.fillText(st, W * 0.98, y);
});
if (!rows.length) {
x.fillStyle = "#E8EEF8";
x.textAlign = "center";
x.fillText("No flights just now", W / 2, H * 0.5);
}
B.m.userData.tex.needsUpdate = true;
});
},
function () {
var C = aptCfg();
if (!C.flights && !aptKeeper()) {
aptSay("🎫 <b>No tickets are on sale just now</b> (the Keeper's call). The observation deck and the café are open.");
return;
}
if (C.grounded && !aptKeeper()) {
aptSay("🎫 <b>Every flight is held on the ground just now.</b> Check the board again soon.");
return;
}
var rows = aptBoardLines(10).filter(function (r) { return r.left > 45; }), f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🎫 Tickets</div>";
var fare = aptFare(false), cf = aptFare(true);
b += "<div style='opacity:.85;margin:4px 0 8px'>" + (fare ? "A seat is <b>" + fare + " gold</b>; a plane of your own, leaving now, is <b>" + cf + " gold</b>." : aptAdult() ? "Fares are free just now." : "Young travellers fly free.") + " Boarding opens six minutes before each flight. " + (APT.pass ? "<br>Your pass: <b>" + aptEsc(APT.pass.no) + " to " + aptEsc(APT.pass.dest) + "</b>, gate " + APT.pass.gate + "." : "") + "</div>";
rows.forEach(function (r) { var k = "f" + r.n; b += worldBtn(k, r.time + " · " + r.no + " to " + r.dest, "gate " + r.gate + " · " + r.status.toLowerCase() + " · " + (r.left < 60 ? "under a minute" : Math.round(r.left / 60) + " min")); f[k] = function () { aptBuy(r, false); }; });
var dl = aptDestList();
b += "<div style='margin:10px 0 4px;opacity:.8'>Or charter a plane, leaving from gate 4 now:</div>";
dl.forEach(function (D) { var k = "c" + D.k; b += worldBtn(k, "Charter to " + D.name, D.sub); f[k] = function () { aptBuy({ n: -1, no: "SA " + (700 + Math.floor(Math.random() * 99)), dest: D.name, gate: 4, D: D, time: "now" }, true); }; });
worldCard(b, f);
},
function (r, charter) {
var give = function (say) {
APT.pass = { n: r.n, no: r.no, dest: r.D.name, dk: r.D.k, gate: r.gate, charter: !!charter, until: Date.now() + (charter ? 20 * 60000 : Math.max(8 * 60000, (r.left || 0) * 1000 + 120000)) };
worldCard(worldFacts("🎫 Your boarding pass", r.no + " to " + r.D.name, [["Departs", charter ? "as soon as you board" : r.time + " (your own clock)"], ["Gate", String(r.gate)], ["Fare", say]], ["Through security (the scanner lanes), then to gate " + r.gate + ": press E at the gate desk when it's boarding."]), {});
aptTone(660, 0.1);
aptDid("ticket");
};
var fare = aptFare(charter);
if (!fare) {
give(aptKeeper() ? "the Keeper flies free" : aptAdult() ? "free today" : "a young traveller's seat: free");
return;
}
if (!aptSigned() || typeof cityRpc !== "function") {
aptSay("🎫 Sign in to buy a ticket: the fare comes from your gold.");
return;
}
aptSay("🎫 One moment…");
cityRpc("apt_ticket", { p_dest: r.D.k, p_charter: !!charter }).then(function (o) {
if (o && o.ok) {
give((o.fare || fare) + " gold, paid");
if (typeof refreshGold === "function")
try {
refreshGold();
}
catch (e) { }
}
else
aptSay("🎫 <b>" + aptEsc((o && o.say) || "The desk couldn't sell that ticket.") + "</b>");
}).catch(function (e) {
var miss = typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|schema cache/i.test(String(e && e.message || e));
if (miss)
give("free until the ticket desks open (the city's the latest server update)");
else
aptSay("🎫 " + aptEsc(String(e && e.message || e).slice(0, 160)));
});
},
function (g) {
var P = APT.pass, now = aptNow();
if (!P || P.until < Date.now()) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Gate " + g + "</div><div style='margin:6px 0 10px'>\"Boarding pass, please.\" You don't have one for this gate yet.</div>" + worldBtn("tk", "🎫 Tickets", "the desks are in the check-in hall, back through arrivals"), { tk: function () { aptTickets(); } });
return;
}
if (P.gate !== g) {
aptSay("🛫 Your flight, <b>" + aptEsc(P.no) + "</b> to " + aptEsc(P.dest) + ", boards at <b>gate " + P.gate + "</b>.");
return;
}
if (aptCfg().grounded && !aptKeeper()) {
aptSay("🛫 <b>All flights are held on the ground just now.</b> Hannah will call boarding the moment we're cleared.");
return;
}
if (!P.charter) {
var T = aptDep(P.n).T, left = (T - now) / 1000;
if (left > 360) {
aptSay("🛫 <b>" + aptEsc(P.no) + "</b> boards in " + Math.ceil((left - 360) / 60) + " min. Coffee's at the Runway Café.");
return;
}
if (left < 15) {
aptSay("🛫 <b>" + aptEsc(P.no) + " has gone.</b> The desks will put you on the next one (Tickets).");
APT.pass = null;
return;
}
}
aptRide(P);
},
function (P) {
if (APT.ride || APT.fly)
return;
var line = APT_LINES.filter(function (l) { return P.no.indexOf(l.k) === 0; })[0] || APT_LINES[0];
var m = aptPlaneModel("airliner", line);
var B = m.userData.apt.B;
aptCabin(B);
aptP().add(m);
var PP = aptPathPrep(aptPathDep(aptGateX(P.gate)));
APT.ride = { P: P, n: P.n, g: m, PP: PP, t0: performance.now(), seat: [1.12, 0.24, APT.lite ? -12.5 + 12 * 25 / 17 : -12.5 + 20 * 25 / 29], h0: null, dozing: false };
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = "Boarding gate " + P.gate + "…";
}
setTimeout(function () { if (typeof garFade === "function")
garFade(false); }, 900);
worldCard(null);
aptDid("boarded");
aptSay("💺 <b>" + aptEsc(P.no) + " to " + aptEsc(P.dest) + ".</b> A window seat on the left. \"Good day, everyone, from the flight deck: doors are closed and we're pushing back. Flight time is short today.\" Look out of the window; <b>press E</b> to doze off until we land.");
worldPrompt("<b>Your seat</b> · <b>press E</b> to doze off until we land", function () { aptRideArrive(); });
},
function () {
var R = APT.ride;
if (!R)
return;
var t = (performance.now() - R.t0) / 1000, q = aptPathAt(R.PP, t);
R.g.position.set(q.x, q.y, q.z);
R.g.rotation.set(-q.p, q.h, 0, "YXZ");
var m = new THREE.Matrix4().makeRotationFromEuler(R.g.rotation), B = 3.15, v = new THREE.Vector3(R.seat[0], B + R.seat[1], R.seat[2]).applyMatrix4(m);
var P = camera.position;
P.set(APT.base + q.x + v.x, q.y + v.y, q.z + v.z);
if (typeof flyY !== "undefined")
flyY = P.y - 1.72;
if (R.h0 === null) {
R.h0 = q.h;
yaw = q.h - Math.PI / 2 - 0.3;
if (typeof pitch !== "undefined")
pitch = -0.08;
}
yaw += aptAng(q.h - R.h0);
R.h0 = q.h;
camera.rotation.order = "YXZ";
if (!(typeof VRM !== "undefined" && VRM.xr))
camera.rotation.set((typeof pitch !== "undefined" ? pitch : 0) + q.p, yaw, 0);
if (!R.said1 && q.v > 30) {
R.said1 = 1;
aptSay("🛫 The engines spool up and you're pressed back into your seat: the take-off roll.");
}
if (!R.said2 && q.y > 40) {
R.said2 = 1;
aptSay("🛫 Airborne. The field falls away under the wing: the terminal, the tower, the lake.");
}
worldBanner("<b>💺 " + aptEsc(R.P.no) + " to " + aptEsc(R.P.dest) + "</b> · " + (q.y > 3 ? "climbing · " + Math.round(q.y * 3.28) + " ft" : q.v > 20 ? "taking off" : "taxiing") + " · press E to doze until we land");
if (t >= R.PP.dur - 0.5 || q.y > 1100)
aptRideArrive();
},
function () {
var R = APT.ride;
if (!R || R.arriving)
return;
R.arriving = true;
worldPrompt(null);
var D = APT_DBY[R.P.dk] || APT_DEST[0];
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = "Cruising… " + R.P.no + " begins its descent into " + D.name + "…";
}
aptTone(392, 0.3);
setTimeout(function () {
var g = R.g;
APT.ride = null;
APT.pass = null;
try {
aptP().remove(g);
}
catch (e) { }
var ok = false;
try {
ok = D.go();
}
catch (e) {
if (window.console)
console.warn("[airport] arrive", e);
}
try {
var k = D.k;
if (typeof HP !== "undefined" && HP.pads && HP.pads[k] && typeof hpWorldPos === "function") {
var w = hpWorldPos(HP.pads[k]), c = Math.cos(HP.pads[k].rot), s = Math.sin(HP.pads[k].rot);
camera.position.set(w.x + (HP_PAD_R + 4) * c, w.y + 1.72, w.z - (HP_PAD_R + 4) * s);
if (typeof flyY !== "undefined")
flyY = w.y;
}
}
catch (e) { }
var p = aptProg();
p.been = p.been || {};
p.flights = (p.flights || 0) + 1;
aptProgSave();
aptDid("flew");
setTimeout(function () { if (typeof garFade === "function")
garFade(false); }, 500);
setStatus("🛬 <b>Welcome to " + aptEsc(D.name) + ".</b> \"Thank you for flying with us.\" To fly again: ☰ Menu › ✈️ Airport" + (D.k === "city" ? ", or the airport shuttle on the Tower Plaza." : "."));
}, 1600);
},
function (key, x, z, ry, y) {
var Gd = APT_GUIDES[key];
if (!Gd)
return null;
var look = Object.assign({ sex: Gd.sex, age: Gd.age }, Gd.look || {}), g = aptPersonFig("g_" + key, x, y || 0, z, ry, look, Gd.title);
APT.people.push({ g: g, key: key, still: true });
aptSpot(x + Math.sin(ry || 0) * 1.4, z + Math.cos(ry || 0) * 1.4, 2.4, Gd.n, "talk with " + (Gd.sex === "f" ? "her" : "him"), function () { aptTalk(key); }, { y: y || 0 });
aptRound(x, z, 0.35, y || 0, 1.8);
return g;
},
function (key) {
if (typeof openTalk !== "function")
return;
if (!aptCfg().talk && !aptKeeper()) {
aptSay("✈️ Everyone's busy with the flights just now (the Keeper's choice). The desks, the boards and the planes are all open.");
return;
}
var Gd = APT_GUIDES[key], wk = "apt:" + key, c = null;
if (!Gd)
return;
(store.characters || []).forEach(function (x) { if (x.wKey === wk)
c = x; });
var P = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "a" + Date.now()), wKey: wk, archetype: "human", name: Gd.n, aka: [], details: [Gd.title + " at Somnucor Airport"], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: "here", visible: false, city: true,
look: Object.assign({ sex: Gd.sex }, Gd.look || {}), age: Gd.age, sex: Gd.sex };
c.log.push({ who: "them", text: Gd.hi });
if (store.characters)
store.characters.push(c);
}
c.apt = key;
c.name = Gd.n;
c.x = P.x;
c.z = P.z;
c.visible = false;
worldPrompt(null);
openTalk(c);
},
function (c) {
var Gd = APT_GUIDES[c.apt];
if (!Gd)
return "";
var notes = aptCfg().notes, next = aptBoardLines(4).map(function (r) { return r.time + " " + r.no + " to " + r.dest + " from gate " + r.gate + " (" + r.status.toLowerCase() + ")"; }).join("; ");
var L = [
"You are " + Gd.n + ", " + Gd.age + " years old, " + Gd.title + " at Somnucor Airport, the airport of Somnucor, the dreamers' shared city. Speak in the first person, wholly in character, at all times.",
"Who you are: " + Gd.g,
next ? "The next departures on the board: " + next + "." : "",
aptCfg().grounded ? "Right now every flight is held on the ground by the Keeper." : "",
"Teach real aviation where it fits: how planes fly, how airports and air traffic control work, true numbers and practices. Say plainly when something isn't known. Never invent statistics, records or quotes.",
"Safety first: no instructions for weapons, explosives or getting anything past security, nothing frightening; talk about accidents gently and without detail. Reassure nervous flyers.",
"If the visitor seems young, use short words and be warm. Ask a question back now and then.",
"Hold a real conversation: answer what was just said, remember what was said, vary the length (two to five sentences unless they want more), and never repeat a sentence.",
"Never say you are an AI, a model or a character in a game.",
notes ? "The Keeper of this place asks everyone here: " + notes : "",
typeof dreamerBrief === "function" ? dreamerBrief() : ""
];
return L.filter(Boolean).join(" ");
},
function () {
var f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>☕ The Runway Café</div><div style='opacity:.85;margin:4px 0 8px'>\"What can I get you?\" The window tables look straight out at the runway.</div>";
[["flat white", "☕ A flat white"], ["tea", "🫖 A pot of tea"], ["cocoa", "🍫 Hot chocolate"], ["croissant", "🥐 A croissant"]].forEach(function (o) { b += worldBtn(o[0], o[1], "on the house today"); f[o[0]] = function () { worldCard(null); aptDid("cafe"); aptSay("☕ " + o[1].replace(/^\S+ /, "") + ", on the house. Lucia nods at the window: \"Watch the next one go: they lift off right about opposite the tower.\""); if (typeof hyNeed === "function")
try {
hyNeed("food", 8);
}
catch (e) { } }; });
worldCard(b, f);
},
function () {
var r = aptRnd(17), n = APT.lite ? 6 : 16, dress = [0x3A5A8A, 0xC84A3A, 0xE8E0D0, 0x5A7A3A, 0xE8A040, 0x6A4A8A, 0x8A8A8A, 0x2A2A2A];
for (var i = 0; i < n; i++) {
var air = i % 2 === 0, z = air ? -306 + r() * 8 : -350 + r() * 14, x = -90 + r() * 180;
if (!air && x > 12 && x < 92)
x = -90 + r() * 90;
var look = { sex: r() < 0.5 ? "f" : "m", age: 16 + Math.floor(r() * 60), top: dress[i % dress.length], bottom: dress[(i + 3) % dress.length] };
var g = aptPersonFig("pax" + i, x, 0, z, r() * 6.28, look, "traveller");
if (i % 3 === 0) {
var bag = aptBox(0.4, 0.6, 0.25, aptMat(dress[(i + 5) % dress.length], null), 0.45, 0.3, -0.3, g);
}
APT.walkers.push({ g: g, lo: air ? -95 : -95, hi: air ? 78 : 8, z: z, tx: x, wait: r() * 5, sp: 0.9 + r() * 0.5 });
}
for (var s = 0; s < (APT.lite ? 4 : 12); s++) {
var sx = -92 + (s % 4) * 7 + ((s * 7) % 3 - 1) * 0.66, sz = -316 + Math.floor(s / 4) * 4.2;
var sg = aptPersonFig("sit" + s, sx, 0.05, sz, Math.PI, { sex: s % 2 ? "f" : "m", age: 20 + (s * 7) % 50, top: dress[s % dress.length] }, "traveller");
if (typeof sitPose === "function")
try {
sitPose(sg);
}
catch (e) { }
else
sg.position.y = -0.35;
APT.people.push({ g: sg, still: true });
}
},
function (dt) {
var d = Math.min(dt, APT.lite ? 0.05 : 0.033);
APT.walkers.forEach(function (W) {
var g = W.g;
if (W.wait > 0) {
W.wait -= d;
return;
}
var dx = W.tx - g.position.x;
if (Math.abs(dx) < 0.3) {
W.wait = 2 + Math.random() * 8;
W.tx = W.lo + Math.random() * (W.hi - W.lo);
return;
}
var st = Math.min(Math.abs(dx), W.sp * d) * Math.sign(dx);
g.position.x += st;
g.rotation.y = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
});
},
function () {
aptPlaque("hire", "Work at the airport", "Pilots, controllers, ramp agents, security, gate agents, baggage handlers, mechanics, firefighters, the café. Shifts paid by the hour like any post in the city (dues-payers). Press E for the board.", 3, 1.9, 78.6, 1.9, -318, -Math.PI / 2, { ac: "#1F4E8C" });
aptSpot(77, -318, 2.4, "Work at the airport", "see the jobs", function () { aptWorkHere(); });
aptSpot(-236, -300, 2.6, "The hangar job board", "see the jobs", function () { aptWorkHere(); });
aptPlaque("hire2", "Work at the airport", "Mechanics, instructors and ramp agents wanted. Press E for the board.", 2.6, 1.4, -230.6, 1.9, -300, -Math.PI / 2, { ac: "#1F4E8C" });
},
function (j) {
var out = [], now = aptNow(), N = Math.floor(now / APT_SL), t = String(j.title || ""), C = aptCfg(), you = j.title || "works at Somnucor Airport", kind = j.kind || "trade";
if (C.grounded || !C.traffic || typeof cinEv !== "function")
return out;
var add = function (key, at, who, post, how, why, line, what) { if (at > now || now - at > 30 * 60000)
return; out.push(cinEv("apt_" + key, at, kind, who, post, APT_WP, you, how, why, line, what)); };
var P = function (seed) { return typeof cinPerson === "function" ? cinPerson("apt" + seed) : { name: "Sam Hale", sex: "m", age: 40 }; };
for (var n = N - 22; n <= N; n++) {
var d = aptDep(n), a = aptArr(n), h = ((n * 2654435761) >>> 0) % 97;
if (/controller/i.test(t) && n % 3 === 0) {
var cap = P("cap" + n);
add("atc" + n, d.T + 70000, cap, "the captain of " + d.no, "either", "You are holding short of runway 27 at Somnucor in " + d.no + " to " + d.D.name + ", ready for departure, and calling the tower. The dreamer is the controller.", "Somnucor Tower, " + d.no + ", holding short runway two-seven, ready for departure.", d.no + " ready for departure");
}
if (/pilot/i.test(t) && !/instructor/i.test(t) && n % 6 === 0) {
var sch = P("sch" + (n >> 2));
add("crew" + n, d.T - 20 * 60000, sch, "crew scheduling at Somnucor Air", "text", "You're crew scheduling, telling the pilot which flight they're on next: " + d.no + " to " + d.D.name + " at " + aptClock(d.T) + " from gate " + d.gate + ".", "Crew scheduling: you're on " + d.no + " to " + d.D.name + ", " + aptClock(d.T) + ", gate " + d.gate + ". Briefing in the crew room.", d.no + " crewing");
}
if (/ramp|baggage/i.test(t) && n % 3 === 1) {
var ops = P("ops" + n);
add("ramp" + n, a.T - 4 * 60000, ops, "the ramp controller", "either", a.no + " from " + aptDestName(a.D) + " lands in about five minutes for gate " + a.gate + ". You're asking them to be at the gate to turn her round" + (/baggage/i.test(t) ? " and get the bags off to belt " + (1 + a.gate % 2) : "") + ".", "Ramp control: " + a.no + " inbound for gate " + a.gate + ", five minutes. " + (/baggage/i.test(t) ? "Bags off to belt " + (1 + a.gate % 2) + "." : "Chocks, cones and power, please."), a.no + " arriving gate " + a.gate);
}
if (/gate agent/i.test(t) && n % 3 === 2) {
var gs = P("gs" + (n >> 3));
add("gate" + n, d.T - 7 * 60000, gs, "the gate supervisor", "text", d.no + " to " + d.D.name + " is about to board at gate " + d.gate + "; you want the dreamer to open the desk.", "Gate supervisor: " + d.no + " to " + d.D.name + " boards at gate " + d.gate + " in a minute. Can you open up?", d.no + " boarding");
}
if (/security/i.test(t) && n % 5 === 0) {
var sv = P("sv" + (n >> 3));
add("sec" + n, d.T - 9 * 60000, sv, "the security supervisor", "text", "A wave of travellers is coming through for the " + aptClock(d.T) + " departures and you want a second lane open.", "Security supervisor: queue's building for the " + aptClock(d.T) + " flights. Open lane 2, please.", "the lanes busy");
}
if (/mechanic/i.test(t) && h % 5 === 0) {
var cp2 = P("wu" + n);
add("mx" + n, a.T + 110000, cp2, "the captain of " + a.no, "either", "You've just parked " + a.no + " at gate " + a.gate + " and written up a small fault in the logbook: the trim wheel felt stiff on approach. Nothing dangerous; it must be looked at before she flies again.", "It's the captain of " + a.no + ", gate " + a.gate + ". I've written up a stiff trim wheel; can you look before she goes out again?", a.no + " write-up");
}
if (/firefighter/i.test(t) && h % 11 === 0) {
var tw = P("twr" + n);
add("fire" + n, a.T + 30000, { name: tw.name, sex: tw.sex, age: tw.age }, "the tower supervisor", "call", a.no + " on final has a warning light (a precaution: the crew expect a normal landing). You want the fire crew to stand by at the runway.", "Tower: " + a.no + " on final with a warning light, precautionary. Fire crew stand by, runway two-seven.", a.no + " standby");
add("fire2" + n, a.T + 90000, { name: tw.name, sex: tw.sex, age: tw.age }, "the tower supervisor", "text", "The landing was normal; stand down.", "Tower: " + a.no + " landed normally. Stand down, thanks.", "stand down");
}
if (/instructor/i.test(t) && n % 8 === 0) {
var st = P("stu" + (n >> 3));
add("stu" + n, d.T - 15 * 60000, { name: st.name, sex: st.sex, age: Math.max(19, st.age) }, "a student pilot", "text", "You're a student pilot asking for a circuit lesson today; you're nervous about landings.", "Hi, it's " + st.first + ". Any chance of a circuit lesson today? Landings still scare me.", "a lesson booking");
}
if (/barista|café|cafe/i.test(t) && n % 5 === 1) {
var mg = P("caf" + (n >> 3));
add("caf" + n, d.T - 10 * 60000, mg, "the café manager", "text", "A full flight is about to board and the lounge is filling up.", "Café: " + d.no + " is full and boarding soon. Rush incoming!", "a rush");
}
}
return out;
},
function (force) {
if (!force && Date.now() - APT.licAt < 5 * 60000)
return;
APT.licAt = Date.now();
var p = aptProg();
if (p.licLocal && !APT.lic)
APT.lic = { kind: p.licLocal, local: true };
if (!aptSigned() || typeof cityRpc !== "function")
return;
cityRpc("apt_licence_mine", {}).then(function (o) { if (o && o.kind)
APT.lic = { kind: o.kind, at: o.at, landings: o.landings };
else if (!p.licLocal)
APT.lic = null; }).catch(function () { });
},
function (kind) {
if (!aptAdult()) {
aptSay("🎓 Well flown! The licence itself waits until you're grown up; the lessons are yours.");
return;
}
var have = aptLicNow() ? aptLicRank(aptLicNow().kind) : 0;
if (aptLicRank(kind) <= have)
return;
var name = { student: "Student pilot certificate", private: "Private pilot's licence", airline: "Airline transport rating" }[kind];
var done = function (local) {
APT.lic = { kind: kind, local: !!local };
if (local) {
var p = aptProg();
p.licLocal = kind;
aptProgSave();
}
aptDid("lic_" + kind);
worldCard(worldFacts("🎓 " + name, "Somnucor Airport flight school · signed by Captain Elena Vasquez", [["Holder", (typeof dreamer === "function" && dreamer().name) || "you"], ["Allows", kind === "student" ? "the trainer, and your check ride" : kind === "private" ? "the trainer and the seaplane" : "every plane at the airport, the airliner too"], ["Next", kind === "student" ? "the check ride: take off, fly the circuit, land on the runway" : kind === "private" ? "five good landings for the airline rating" : "the Airline pilot job, if you like (the airport's board)"]], [local ? "Kept on this device until the city's the latest server update is in; then it's kept with your name." : "Kept with your name, on every device."]), {});
aptTone(784, 0.2);
};
if (!aptSigned() || typeof cityRpc !== "function") {
done(true);
return;
}
cityRpc("apt_licence_award", { p_kind: kind, p_landings: aptProg().landings || 0 }).then(function (o) { if (o && o.ok)
done(false);
else {
aptSay("🎓 " + aptEsc((o && o.say) || "The school couldn't record that just now."));
} })
.catch(function (e) { if (rpcMissingSafe(e))
done(true);
else
aptSay("🎓 " + aptEsc(String(e && e.message || e).slice(0, 160))); });
},
function () {
aptLicLoad();
var C = aptCfg(), p = aptProg(), L = aptLicNow(), f = {}, read = Object.keys(p.read).length;
if (!C.school && !aptKeeper()) {
aptSay("🎓 The flight school is closed for now (the Keeper's call).");
return;
}
var rows = [["Your licence", L ? { student: "Student pilot certificate", private: "Private pilot's licence", airline: "Airline transport rating" }[L.kind] + (L.local ? " (on this device)" : "") : "none yet"], ["Lessons read", read + " of " + APT_LESSONS.length], ["Good landings logged", String(p.landings || 0)]];
var b = "";
APT_LESSONS.forEach(function (Ls, i) { var k = "l" + i; b += worldBtn(k, (p.read[Ls[0]] ? "✓ " : "") + Ls[1], Ls[2]); f[k] = function () { aptLesson(i); }; });
b += worldBtn("quiz", "📝 The ten questions", read < APT_LESSONS.length ? "read all six lessons first" : "eight right for the student certificate");
f.quiz = function () { if (read < APT_LESSONS.length) {
aptSay("📝 Read all six lessons first.");
return;
} aptQuiz(0, 0); };
b += worldBtn("fly", "🛩️ Fly the trainer", L ? "she's on the apron outside the hangar" : "after the student certificate");
f.fly = function () { worldCard(null); var P = camera.position; P.set(APT.base - 282, 1.72, -246); yaw = Math.PI * 0.75; aptSay("🛩️ The trainer's right there. Walk up to her door and press E."); };
worldCard(worldFacts("🎓 The flight school", "Captain Elena Vasquez · Hangar 1", rows, ["Six short lessons, ten questions (eight to pass) and you're a student pilot: you may fly the trainer. Your check ride (take off, fly the circuit, land on the runway) earns the private licence and the seaplane. Five good landings after that and you're rated for the airliner.", aptAdult() ? "" : "Young dreamers are welcome to every lesson; flying the planes waits until you're grown up."]) + b, f);
},
function (i) {
var Ls = APT_LESSONS[i], p = aptProg();
p.read[Ls[0]] = Date.now();
aptProgSave();
var f = { back: function () { aptSchool(); } }, b = worldBtn("back", "← The flight school", "");
if (i < APT_LESSONS.length - 1) {
b = worldBtn("next", "Next: " + APT_LESSONS[i + 1][1], "") + b;
f.next = function () { aptLesson(i + 1); };
}
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🎓 " + aptEsc(Ls[1]) + "</div><div style='opacity:.75'>" + aptEsc(Ls[2]) + "</div><div style='margin:8px 0 10px;line-height:1.5'>" + aptEsc(Ls[3]) + "</div>" + b, f);
},
function (i, score) {
if (i >= APT_QUIZ.length) {
var pass = score >= 8;
aptProg().quiz = Math.max(aptProg().quiz || 0, score);
aptProgSave();
worldCard(worldFacts(pass ? "🎓 Passed: " + score + " of 10" : "📝 " + score + " of 10", pass ? "Captain Vasquez signs your student certificate" : "eight to pass: read the lessons again and have another go", [], [pass ? "Now fly the trainer: your check ride is take off, fly the circuit and land on the runway." : "No hurry. Every pilot started here."]), {});
if (pass)
aptAward("student");
return;
}
var Q = APT_QUIZ[i], ord = aptQuizOrder(i), f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📝 Question " + (i + 1) + " of 10</div><div style='margin:6px 0 10px'>" + aptEsc(Q[0]) + "</div>";
ord.forEach(function (o) { var k = "a" + o; b += worldBtn(k, Q[1 + o], ""); f[k] = function () { aptQuiz(i + 1, score + (o === Q[4] ? 1 : 0)); }; });
worldCard(b, f);
},
function (at) {
if (at === "deck") {
aptToDeck(true);
return;
}
if (at === "tower") {
if (aptMayTower()) {
aptToCab(true);
return;
}
at = "forecourt";
aptSay("🗼 The tower cab is for the airport's staff and licensed pilots; the observation deck on the terminal roof is open to everyone.");
}
var A = APT_AT[at] || APT_AT.forecourt;
camera.position.set(APT.base + A[0], (A[3] || 0) + 1.72, A[1]);
if (typeof yaw !== "undefined")
yaw = A[2];
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = A[3] || 0;
},
function (G) {
APT.G = G;
APT.lite = aptLite();
APT.people = [];
APT.walkers = [];
APT.boards = [];
APT.belts = [];
APT.socks = [];
APT.papi = [];
APT.ramp = [];
APT.paths = {};
APT.fly = null;
APT.ride = null;
var K = APT.K = aptCtx();
K.F = G;
APTK = K;
[aptField, aptTerminal, aptTower, aptHangar, aptService, aptBoards2, aptCrowd, aptFleetBuild].forEach(function (f) { APTK.F = G; try {
f();
}
catch (e) {
if (window.console)
console.warn("[airport] build", f.name, e);
} });
try {
if (typeof gwBake === "function")
gwBake(G);
}
catch (e) {
if (window.console)
console.warn("[airport] bake", e);
}
aptIndex(K);
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
APT.built = true;
},
function () {
if (APT.fly)
try {
aptFlyEnd(true);
}
catch (e) { }
APT.ride = null;
aptCockpitHide && aptCockpitHide();
for (var k in APT.mats) {
var m = APT.mats[k];
if (!m)
continue;
if (m.map && m.map.dispose)
try {
m.map.dispose();
}
catch (e) { }
if (m.userData && m.userData.tex)
try {
m.userData.tex.dispose();
}
catch (e) { }
if (m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var g in APT.geos) {
try {
APT.geos[g].dispose();
}
catch (e) { }
}
if (APT_CP.g) {
try {
APT_CP.g.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); if (o.material && o.material.dispose) {
if (o.material.map)
o.material.map.dispose();
o.material.dispose();
} });
}
catch (e) { }
APT_CP.g = null;
APT_CP.kind = null;
APT_CP.U = null;
}
APT.mats = {};
APT.geos = {};
APT.K = null;
APTK = null;
APT.G = null;
APT.built = false;
APT.people = [];
APT.walkers = [];
APT.boards = [];
APT.belts = [];
APT.socks = [];
APT.papi = [];
APT.ramp = [];
APT.fleet = { gate: [], moving: [] };
APT.paths = {};
APT.radar = null;
APT.lake = null;
APT.myFn = null;
},
function () {
var h = typeof dreamHour === "function" ? dreamHour() : 12, d = typeof daylight === "function" ? daylight(h) : 1;
var top = new THREE.Color(0x0E1A30).lerp(new THREE.Color(0x5E9EDC), d), low = new THREE.Color(0x22324A).lerp(new THREE.Color(0xC8DCEC), d);
var dawn = (h > 5 && h < 8) || (h > 17 && h < 20.5) ? Math.max(0, 1 - Math.abs(d - 0.45) * 2.2) : 0;
if (dawn)
low.lerp(new THREE.Color(0xF0C8A0), dawn * 0.5);
var sa = (h - 6) / 12 * Math.PI, L = worldLocal(), feet = L.y - 1.72, rm = APT.K ? aptRoomAt(APT.K, L.x, L.z, feet) : null;
var E = { top: top.getHex(), low: low.getHex(), fog: low.getHex(), fogD: APT.lite ? 0.0011 : 0.00055, sun: 0.25 + 0.8 * d, sunCol: dawn ? 0xFFD8A8 : 0xFFF2DC,
sunDir: [Math.cos(sa) * 0.7, Math.max(0.15, Math.sin(sa)), 0.4], hemi: 0.45 + 0.4 * d, hemiCol: 0xD8E4EC, hemiGround: 0x4A5A3A, stars: Math.max(0, 0.8 - d * 1.6) };
if (rm && !/cab/.test(rm.name)) {
E.hemi = Math.max(E.hemi, 0.95);
E.hemiCol = 0xF2EEE6;
E.hemiGround = 0x7A746A;
E.sun = Math.max(0.35, E.sun * 0.6);
}
return E;
},
function () {
var m = APT.radar;
if (!m || !m.userData || !m.userData.cv)
return;
var cv = m.userData.cv, x = cv.getContext("2d"), W = cv.width, H = cv.height, R = W / 2 - 6, sc = R / 7000;
x.fillStyle = "#04140C";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(90,240,140,0.35)";
x.lineWidth = 1;
for (var i = 1; i <= 3; i++) {
x.beginPath();
x.arc(W / 2, H / 2, R * i / 3, 0, Math.PI * 2);
x.stroke();
}
x.beginPath();
x.moveTo(W / 2 - R, H / 2);
x.lineTo(W / 2 + R, H / 2);
x.moveTo(W / 2, H / 2 - R);
x.lineTo(W / 2, H / 2 + R);
x.stroke();
x.strokeStyle = "#C8F0D0";
x.lineWidth = 3;
x.beginPath();
x.moveTo(W / 2 + APT_RWY.x0 * sc, H / 2);
x.lineTo(W / 2 + APT_RWY.x1 * sc, H / 2);
x.stroke();
x.font = "bold " + Math.round(W / 26) + "px ui-monospace,Menlo,monospace";
x.textAlign = "left";
var dot = function (px, pz, lab, col) { var dx = W / 2 + px * sc, dz = H / 2 + pz * sc; if (Math.hypot(dx - W / 2, dz - H / 2) > R)
return; x.fillStyle = col; x.beginPath(); x.arc(dx, dz, 4, 0, Math.PI * 2); x.fill(); x.fillText(lab, dx + 6, dz - 6); };
aptTrafficNow().forEach(function (M) { dot(M.x, M.z, M.no + (M.alt > 5 ? " " + Math.round(M.alt * 3.28 / 100) : ""), "#5AF08A"); });
if (APT.fly)
dot(APT.fly.x, APT.fly.z, APT.fly.call, "#FFD86A");
m.userData.tex.needsUpdate = true;
},
function (dt) {
var K = APT.K;
if (!K)
return;
APTK = K;
APT.t += dt;
var L = worldLocal(), feet = L.y - 1.72, rm = aptRoomAt(K, L.x, L.z, feet);
try {
aptFleetTick();
aptBoardsPaint();
aptBeltTick(dt);
aptCrowdTick(dt);
var wind = Math.sin(APT.t * 0.05) * 0.4;
(APT.socks || []).forEach(function (s, i) { s.rotation.y = -0.4 + wind + Math.sin(APT.t * 0.7 + i) * 0.05; });
if (APT.radar && rm && /cab/.test(rm.name) && APT.t - (APT.radarAt || 0) > 1) {
APT.radarAt = APT.t;
aptRadarPaint();
}
aptLicLoad();
}
catch (e) {
if (!APT.e1) {
APT.e1 = 1;
if (window.console)
console.warn("[airport] tick", e);
}
}
if (APT.fly || APT.ride)
return;
worldBanner("<b>✈️ Somnucor Airport</b>" + (rm ? " · " + aptEsc(rm.name) : feet > APT_T.h - 1 && feet < APT_T.h + 3 && L.z > APT_T.z0 && L.z < APT_T.z1 ? " · the observation deck" : "") + (aptCfg().grounded ? " · <span style='color:#FFB84A'>flights held</span>" : "") + (APT.pass ? " · 🎫 " + aptEsc(APT.pass.no) + " gate " + APT.pass.gate : ""));
APT.pt += dt;
if (APT.pt < 0.15)
return;
APT.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
if (APT.myFn && WLD.promptFn === APT.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
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
APT.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + aptEsc(best.verb), fn);
}
else if (APT.myFn && WLD.promptFn === APT.myFn) {
worldPrompt(null);
APT.myFn = null;
}
},
function () {
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = "The airport shuttle into Somnucor…";
}
setTimeout(function () {
var ok = false;
try {
ok = typeof hpGoWorld === "function" && hpGoWorld("city");
}
catch (e) { }
var S = aptStop();
if (S) {
camera.position.set(S.x + Math.cos(S.a) * 2.5, S.y + 1.72, S.z + Math.sin(S.a) * 2.5);
}
else if (!ok)
worldHome("✈️ <b>Back from Somnucor Airport.</b>");
setTimeout(function () { if (typeof garFade === "function")
garFade(false); }, 500);
aptSay("🚌 <b>The Tower Plaza.</b> The shuttle back to the airport leaves from this stop, any time: walk up to the sign and press E.");
}, 1200);
},
function (opt) {
APTK = APT.K;
aptLicLoad(true);
if (!(opt && opt.k === "heli"))
aptArrive(APT.wantAt || "forecourt");
APT.wantAt = null;
aptSay("✈️ <b>Somnucor Airport.</b> Check-in and the departures board are straight ahead, security and the gates beyond. The flight school is in the hangar to the west, the tower to the east. " + (aptCfg().notes ? "<i>" + aptEsc(aptCfg().notes) + "</i>" : ""));
},
function () {
worldPromptCity(null);
APTS.on = false;
var S = aptStop(), P = camera.position;
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = "The airport shuttle…";
setTimeout(function () { garFade(false); }, 1100);
}
aptGo("forecourt", S ? { from: { here: store.here || 0, x: S.x + Math.cos(S.a) * 2.5, y: P.y, z: S.z + Math.sin(S.a) * 2.5, yaw: yaw + Math.PI, name: "the Tower Plaza" } } : null);
},
function () {
aptLicLoad();
var b = "", f = {}, inW = WLD.on === APT.key, p = aptProg(), L = aptLicNow(), C = aptCfg();
var rows = [["Flights", C.grounded ? "held on the ground just now" : aptBoardLines(1).map(function (r) { return "next: " + r.time + " " + r.no + " to " + r.dest; })[0] || "on the board"],
["Fly yourself", "the trainer, the seaplane and the airliner, from a real cockpit (grown-ups with a licence; the flight school is free)"],
["You", (L ? "🎓 " + { student: "student pilot", private: "private pilot", airline: "airline rated" }[L.kind] + " · " : "") + (p.flights || 0) + " flight" + (p.flights === 1 ? "" : "s") + " · " + (p.landings || 0) + " good landing" + (p.landings === 1 ? "" : "s")]];
var go = function (at, label, sub) { b += worldBtn("g_" + at, label, sub || ""); f["g_" + at] = function () { worldCard(null); aptGo(at); }; };
go("forecourt", "The front doors", "the terminal, the shuttle, the car park");
go("checkin", "Check-in", "tickets, the departures board");
go("lounge", "The departures lounge", "the gates, the Runway Café");
go("baggage", "Baggage claim", "arrivals");
go("deck", "The observation deck", "the whole field from the roof");
go("hangar", "The hangar and the flight school", "lessons, the licence, the trainers");
go("seaplane", "The seaplane dock", "on the lake");
if (aptMayTower())
go("tower", "The control tower cab", "the radar and the field");
if (aptKeeper()) {
go("apron", "The apron", "by the airliners");
go("runway", "The end of runway 09", "");
go("fire", "The fire station", "");
go("crew", "The crew room", "");
}
if (inW) {
b += worldBtn("out", "Leave", "back to where you were");
f.out = function () { aptLeave(); };
}
worldCard(worldFacts("✈️ Somnucor Airport", "the city's airport · flights to other worlds · learn to fly", rows, ["Always safe. Flights cost " + (aptFare(false) ? aptFare(false) + " gold a seat" : "nothing for you") + "; young dreamers fly free with the family and may take every lesson, but only grown-ups take the controls."]) + b, f);
},
function (G) {
if (typeof swkTree !== "function")
return;
var D = new THREE.Group();
D.name = "apt-dress";
G.add(D);
var gr = function (x, z) { return aptGroundAt(APT.K, x, z, 0.5); };
for (var lx = -135; lx <= 135; lx += 45)
[-492, -448].forEach(function (lz, k) { if (!swkKeep(k + lx / 45 | 0) && lx !== 0)
return; swkLamp(D, lx, lz, { h: 8, c: 0xFFE6B8 }); });
[-135, -45, 45, 135].forEach(function (ix, k) {
var I = swkAt(D, ix, 0, -470, 0);
swkBox(I, 12, 0.18, 3, swkM(0x8A8680, "concrete"), 0, 0.09, 0);
swkFlat(I, 11.6, 2.6, swkM(0x4A6A34, "grass"), 0, 0.19, 0);
[-4, 0, 4].forEach(function (tx, j) { if (swkKeep(j))
swkTree(I, tx, 0, { y: 0.2, s: 0.8, c: 0x466E32 }); });
});
[[-20, -428], [30, -428]].forEach(function (p) { var M = swkAt(D, p[0], 0, p[1], Math.PI); swkBox(M, 0.7, 1.6, 0.5, swkM(0x2A4A7A, "metal"), 0, 0.8, 0); swkBox(M, 0.5, 0.3, 0.04, swkM(0xA8E0FF, null, { basic: true }), 0, 1.25, -0.26); swkBox(M, 0.9, 0.08, 0.7, swkM(0x2A2E34, "metal"), 0, 1.64, 0); });
var TS = swkAt(D, 90, 0, -428, 0);
swkBox(TS, 8, 0.08, 3, swkM(0xC8CCD0, "metal"), 0, 2.6, 0);
[-3.9, 3.9].forEach(function (e) { swkBox(TS, 0.1, 2.6, 0.1, swkM(0x5A5E64, "metal"), e, 1.3, 1.4); swkBox(TS, 0.1, 2.6, 0.1, swkM(0x5A5E64, "metal"), e, 1.3, -1.4); });
for (var t = 0; t < (swkLite() ? 3 : 6); t++) {
var tr = swkAt(TS, -3 + t * 1.1, 0, 0, 0);
swkBox(tr, 0.6, 0.7, 0.9, swkM(0x8A9098, "metal"), 0, 0.55, 0);
swkBox(tr, 0.5, 0.04, 0.8, swkM(0x3A3A3A), 0, 0.12, 0);
}
for (var zb = 0; zb < 7; zb++)
swkFlat(D, 6, 0.5, swkM(0xD8D8D2), -10, 0.06, -410 + zb * 1.0 - 3);
var tx0 = 170, tz0 = -312;
swkFlat(D, 26, 12, swkM(0x8A8680, "paving"), tx0, 0.05, tz0);
[-11, 11].forEach(function (dx, k) { swkPlanter(D, tx0 + dx, tz0 - 2, 2.4, 2.4); if (swkKeep(k))
swkTree(D, tx0 + dx, tz0 - 2, { y: 0.55, s: 0.75, c: 0x3F6A30 }); swkBench(D, tx0 + dx * 0.6, tz0 + 4, Math.PI); swkLamp(D, tx0 + dx, tz0 + 5, { h: 4.2 }); });
var BR = swkAt(D, tx0 + 8, 0, tz0 - 4.6, 0);
for (var b = 0; b < 5; b++)
swkMesh(BR, new THREE.TorusGeometry(0.35, 0.03, 6, 14, Math.PI), swkM(0x8A9098, "metal"), -1 + b * 0.5, 0, 0, Math.PI / 2);
swkFlag(D, tx0 - 8, tz0 - 4.5, { h: 9, c1: 0x1F4E8C, c2: 0xF0F0F0 });
swkBin(D, tx0 + 4, tz0 + 4.5);
for (var c = 0; c < 6; c++)
if (swkKeep(c)) {
var cn = swkAt(D, 300 + c * 1.4, 0, -170, 0);
swkMesh(cn, new THREE.ConeGeometry(0.2, 0.6, 10), swkM(0xE86A1A), 0, 0.3, 0);
swkBox(cn, 0.4, 0.03, 0.4, swkM(0x2A2A2A), 0, 0.015, 0);
}
var HR = swkAt(D, 356, 0, -172, Math.PI / 2);
swkCyl(HR, 0.6, 0.6, 0.5, swkM(0xB8402A, "metal"), 0, 0.9, 0, 18).rotation.x = Math.PI / 2;
swkBox(HR, 0.1, 1.2, 0.8, swkM(0x5A5E64, "metal"), 0.3, 0.6, 0);
swkBox(HR, 0.1, 1.2, 0.8, swkM(0x5A5E64, "metal"), -0.3, 0.6, 0);
swkBench(D, 322, -171.5, 0);
swkLamp(D, 300, -171, { h: 4.4 });
swkLamp(D, 360, -171, { h: 4.4 });
aptKit("van", 470, -132, Math.PI / 2, 1, { keep: true });
aptSolid(470, -132, 2.4, 1.1, 0, 2);
var GS = swkAt(D, 505, 0, -125, 0);
swkBox(GS, 2.6, 0.9, 0.3, swkM(0x1A1A1A), 0, 0.75, 0);
swkBox(GS, 2.4, 0.7, 0.02, swkM(0xE8C020, null, { basic: true }), 0, 0.75, 0.16);
var HU = swkAt(D, 520, 0, -140, 0);
swkBox(HU, 4, 2.8, 3, swkM(0xC8C4BC, "concrete"), 0, 1.4, 0);
swkBox(HU, 4.4, 0.2, 3.4, swkM(0x5A5E64, "metal"), 0, 2.9, 0);
swkBox(HU, 0.9, 2, 0.05, swkM(0x3A4A5A, "metal"), 0, 1, 1.52);
var L = [];
for (var n = 0; n < (swkLite() ? 6 : 12); n++) {
var r = swkR(n * 19 + 3);
L.push([-130 + r() * 260, -500 + r() * 80, r() * 6.28, "traveller", { walk: n % 2 ? 0 : 8 }]);
}
L.push([-11, -411, Math.PI, "traveller"]);
L.push([-8, -408, 0, "traveller", { child: true }]);
L.push([tx0 - 3, tz0 + 1, 0.5, "air traffic controller"]);
L.push([tx0 + 3, tz0 + 2, -2.6, "engineer"]);
L.push([tx0 + 6, tz0 - 1, 3.1, "pilot", { walk: 4 }]);
L.push([318, -168, 0.3, "firefighter"]);
L.push([336, -169, -2.8, "firefighter"]);
L.push([328, -166, 3.1, "firefighter", { walk: 5 }]);
L.push([474, -129, -1.4, "ground crew"]);
L.push([512, -138, 2.2, "engineer"]);
swkPeople(D, "apt_dress", L, gr);
var Q = [], cases = [];
for (var i = 1; i < 6; i++) {
var qx = -90 + i * 12;
for (var p = 0; p < 3; p++) {
if (!swkKeep(i + p))
continue;
Q.push([qx - 1 + p * 0.9, -349.8 + p * 1.1, Math.PI, "traveller", { y: 0 }]);
cases.push([qx - 0.6 + p * 0.9, -349.4 + p * 1.1]);
}
}
swkPeople(D, "apt_queue", Q, null);
cases.forEach(function (cp, k) { var cs = swkAt(D, cp[0], 0, cp[1], k); swkBox(cs, 0.42, 0.62, 0.26, swkM([0x2A2E3A, 0x8A2A2A, 0x3A5A7A, 0x5A4A3A][k % 4], "metal"), 0, 0.37, 0); swkBox(cs, 0.04, 0.5, 0.04, swkM(0x8A9098, "metal"), 0.12, 0.9, 0); });
},
function (g) {
if (!g)
return;
var v = swkM(0xE8F020, null, { basic: true }), b = new THREE.Box3().setFromObject(g), h = b.max.y - b.min.y;
if (!(h > 0.5 && h < 3))
return;
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.19, h * 0.24, 10, 1, true), v);
m.position.set(0, h * 0.63, 0);
m.scale.set(1, 1, 0.72);
m.raycast = function () { };
g.add(m);
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.195, h * 0.03, 10, 1, true), swkM(0xE0E4E8, null, { basic: true }));
st.position.set(0, h * 0.58, 0);
st.scale.set(1, 1, 0.74);
g.add(st);
},
function (D, x, z, ry) {
var B = swkAt(D, x, 0, z, ry), y = swkM(0xE8C020, "metal"), d = swkM(0x1A1A1C), rub = swkM(0x2A2A2C, "metal");
swkBox(B, 1.7, 0.6, 5.6, y, 0, 0.75, 0);
swkBox(B, 1.4, 1.1, 1.3, y, 0, 1.5, -2.0);
swkBox(B, 1.2, 0.5, 0.05, swkM(0x8AB0C8, "glass"), 0, 1.75, -2.66);
var belt = swkAt(B, 0, 1.0, 0.2, 0);
belt.rotation.x = -0.36;
swkBox(belt, 1.0, 0.16, 6.4, rub, 0, 0.3, 1.2);
[-0.55, 0.55].forEach(function (s) { swkBox(belt, 0.08, 0.35, 6.4, y, s, 0.42, 1.2); });
[-2.0, 2.0].forEach(function (zz) { [-0.85, 0.85].forEach(function (xx) { var w = swkCyl(B, 0.32, 0.32, 0.24, d, xx, 0.32, zz, 10); w.rotation.z = Math.PI / 2; }); });
for (var i = 0; i < 3; i++)
swkBox(belt, 0.5, 0.32, 0.38, swkM([0x2A2E3A, 0x8A2A2A, 0x3A5A7A][i], "metal"), (i - 1) * 0.12, 0.56, -0.4 + i * 1.9);
return B;
},
function (D, x, z, ry) {
var S = swkAt(D, x, 0, z, ry), w = swkM(0xE8E8E4, "metal"), d = swkM(0x1A1A1C), g = swkM(0x5A5E64, "metal");
swkBox(S, 2, 0.6, 5, w, 0, 0.7, 0);
for (var i = 0; i < 10; i++)
swkBox(S, 1.3, 0.08, 0.4, g, 0, 1.1 + i * 0.24, -1.6 + i * 0.36);
[-0.7, 0.7].forEach(function (s) { var r = swkBox(S, 0.06, 0.06, 4.4, g, s, 2.4, 0.1); r.rotation.x = -0.58; });
swkBox(S, 1.5, 0.1, 1.2, g, 0, 3.4, 2.2);
[-2, 2].forEach(function (zz) { [-0.9, 0.9].forEach(function (xx) { var wh = swkCyl(S, 0.32, 0.32, 0.24, d, xx, 0.32, zz, 10); wh.rotation.z = Math.PI / 2; }); });
return S;
},
function (D, x, z, ry) {
var P = swkAt(D, x, 0, z, ry);
swkBox(P, 1.2, 1.0, 2, swkM(0x3A6A3A, "metal"), 0, 0.75, 0);
swkBox(P, 1.25, 0.08, 2.05, swkM(0x1A1A1C), 0, 0.3, 0);
[-0.8, 0.8].forEach(function (zz) { [-0.6, 0.6].forEach(function (xx) { var w = swkCyl(P, 0.2, 0.2, 0.16, swkM(0x1A1A1C), xx, 0.2, zz, 8); w.rotation.z = Math.PI / 2; }); });
var c = swkCyl(P, 0.05, 0.05, 3.2, swkM(0x1A1A1C), 0.3, 0.7, -2.4, 6);
c.rotation.x = Math.PI / 2.4;
return P;
},
function (D, x, z, ry, k) {
var C = swkAt(D, x, 0, z, ry), m = swkM(0x7A7E86, "metal");
swkBox(C, 1.6, 0.12, 2.6, m, 0, 0.55, 0);
if (k % 3 !== 2) {
swkBox(C, 1.5, 0.9, 2.4, swkM([0x2A3A5A, 0x8A2A22, 0x3A3A3A][k % 3], null), 0, 1.1, 0);
}
else {
swkBox(C, 1.4, 1.5, 1.5, swkM(0xB8BCC4, "metal"), 0, 1.36, 0);
}
[-0.9, 0.9].forEach(function (zz) { [-0.7, 0.7].forEach(function (xx) { var w = swkCyl(C, 0.2, 0.2, 0.15, swkM(0x1A1A1C), xx, 0.2, zz, 8); w.rotation.z = Math.PI / 2; }); });
},
function (D, x, z) {
var F = swkAt(D, x, 0, z, 0), g = swkM(0x8A9098, "metal");
swkCyl(F, 0.7, 0.9, 0.6, swkM(0x8A8680, "concrete"), 0, 0.3, 0, 10);
swkCyl(F, 0.22, 0.34, 24, g, 0, 12, 0, 8);
swkBox(F, 4.2, 0.2, 0.3, g, 0, 24, 0);
for (var i = 0; i < 4; i++) {
var h = swkBox(F, 0.8, 0.5, 0.4, swkM(0x2A2E34, "metal"), -1.5 + i, 24.5, -0.25);
swkBox(F, 0.66, 0.38, 0.05, swkM(0xFFF0D0, null, { basic: true }), -1.5 + i, 24.45, -0.48);
}
},
function (G) {
if (typeof swkAt !== "function")
return;
var D = new THREE.Group(), L = swkLite();
D.name = "apt-apron";
D.userData.noSit = 1;
G.add(D);
var lastNoSit = function () { var P = (typeof aptP === "function") ? aptP() : null; if (P && P.children.length)
P.children[P.children.length - 1].userData.noSit = 1; };
var Z = (typeof APT_GATE_Z !== "undefined") ? APT_GATE_Z : -247.8, crew = [];
for (var g = 1; g <= 4; g++) {
if (APT.lite && (g === 1 || g === 4))
continue;
var x = (typeof aptGateX === "function") ? aptGateX(g) : APT_T.gates[g - 1] + 4;
aptBeltLoader(D, x + 3.2, Z - 12, Math.PI);
if (typeof aptTug === "function") {
aptTug(x + 9, Z - 19, Math.PI);
lastNoSit();
}
aptSteps(D, x - 4.6, Z + 12, Math.PI / 2 * -1 + Math.PI);
aptGPU(D, x - 3.2, Z - 20, 0.2);
[[x - 18, Z + 1], [x + 18, Z + 1], [x, Z + 21], [x, Z - 23]].forEach(function (c, k) { if (swkKeep(k))
aptCone(D, c[0], c[1]); });
[[x - 0.5, Z - 15.6], [x + 0.5, Z - 15.6]].forEach(function (c) { swkBox(D, 0.3, 0.25, 0.4, swkM(0xE8C020, "wood"), c[0], 0.13, c[1]); });
if (g === 2 || g === 3) {
if (typeof aptFuelTruck === "function") {
aptFuelTruck(x - (g === 2 ? 20 : -20), Z - 6, Math.PI);
lastNoSit();
}
var hose = swkCyl(D, 0.08, 0.08, 10, swkM(0x1A1A1C), x - (g === 2 ? 14 : -14), 0.6, Z - 4, 6);
hose.rotation.z = Math.PI / 2;
}
crew.push([x + 5, Z - 13, -1.6, "ground crew"], [x + 9.8, Z - 15, 2.8, "ground crew", { walk: 3 }], [x - 0.5, Z - 25, 0, "ground crew"], [x - 4.2, Z - 21, 1.2, "engineer"]);
if (g === 2 || g === 3)
crew.push([x - (g === 2 ? 17 : -17), Z - 3, g === 2 ? 1.4 : -1.4, "ground crew"]);
}
var ax = 215, az = -200;
aptSteps(D, ax + 4.6, az + 12, Math.PI / 2);
aptGPU(D, ax + 3, az + 20, 3.3);
[[ax - 18, az - 1], [ax + 18, az - 1], [ax, az - 23], [ax, az + 23]].forEach(function (c) { aptCone(D, c[0], c[1]); });
var lift = swkAt(D, ax - 9, 0, az + 3, 0);
swkBox(lift, 1.6, 0.6, 3.2, swkM(0xE8C020, "metal"), 0, 0.5, 0);
swkCyl(lift, 0.12, 0.14, 3.2, swkM(0x8A9098, "metal"), 0, 2.2, 0, 8);
swkBox(lift, 1.3, 0.9, 1.1, swkM(0xE8C020, "metal"), 0, 4.1, 0);
crew.push([ax - 9, az + 5, 3.1, "engineer"], [ax - 7.5, az + 1, -1.2, "engineer"], [ax + 6.5, az + 16, 1.6, "ground crew", { walk: 3 }]);
[-46, 4, 54].forEach(function (cx, j) { for (var k = 0; k < (L ? 2 : 4); k++)
aptDolly(D, cx - 4.5 + k * 3, -276, 0, k + j); });
[-200, -150, 150, 200].forEach(function (cx, j) { if (!swkKeep(j))
return; for (var k = 0; k < 4; k++)
aptDolly(D, cx, -140 - k * 3.2, Math.PI / 2, k + j); });
[-225, -135, -45, 45, 135, 225].forEach(function (fx, k) { if (swkKeep(k))
aptFlood(D, fx, -128); });
if (typeof swkPeople === "function") {
var out = swkPeople(D, "apt_apron", crew, null);
out.forEach(function (p, i) { if (i % 5 !== 3)
aptVest(p); });
}
},
function (G) {
if (typeof swkAt !== "function")
return;
var D = new THREE.Group(), L = swkLite();
D.name = "apt-hangar";
G.add(D);
var x0 = -310, x1 = -230, z0 = -335, z1 = -275;
var fl = swkM(0x5E6662, "concrete");
swkBox(D, 54, 0.02, z1 - z0, fl, (x0 + (-256)) / 2, 0.035, (z0 + z1) / 2);
swkBox(D, 26, 0.02, 40, fl, -243, 0.035, -295);
var yl = swkM(0xD8B020, null);
[[-300, -266, -319], [-300, -266, -281]].forEach(function (l) { swkBox(D, l[1] - l[0], 0.01, 0.15, yl, (l[0] + l[1]) / 2, 0.05, l[2]); });
[[-300, -319, -281], [-266, -319, -281]].forEach(function (l) { swkBox(D, 0.15, 0.01, l[2] - l[1], yl, l[0], 0.05, (l[1] + l[2]) / 2); });
swkBox(D, 0.12, 0.01, 58, yl, -305.5, 0.05, -305);
swkBox(D, 0.12, 0.01, 36, yl, -234.5, 0.05, -293);
if (typeof aptPlaneModel === "function") {
var t = aptPlaneModel("trainer", APT_LINES[1] || APT_LINES[0]);
t.position.set(-270, 0.35, -302);
t.rotation.y = -Math.PI * 0.2;
D.add(t);
aptRound(-270, -302, 4.2, 0, 2.6);
}
var jk = swkM(0xC8381E, "metal");
[[-270, -300.4], [-272.6, -303.4], [-267.4, -303.4]].forEach(function (p) {
var J = swkAt(D, p[0], 0, p[1], 0);
swkCyl(J, 0.05, 0.05, 1.0, jk, 0, 0.5, 0, 6);
[0, 2.09, 4.19].forEach(function (a) { var l = swkBox(J, 0.05, 0.9, 0.05, jk, Math.cos(a) * 0.3, 0.38, Math.sin(a) * 0.3); l.rotation.z = Math.cos(a) * 0.5; l.rotation.x = -Math.sin(a) * 0.5; });
});
swkBox(D, 1.2, 0.6, 0.9, swkM(0xF0F0EC, "metal", { phong: 60 }), -264.5, 0.3, -306.5);
var E = swkAt(D, -283, 0, -318, 0.3);
swkBox(E, 1.4, 0.5, 0.9, swkM(0xE8C020, "metal"), 0, 0.25, 0);
var eb = swkCyl(E, 0.42, 0.38, 1.2, swkM(0x8A8E94, "metal", { phong: 60 }), 0, 0.95, 0, 12);
eb.rotation.z = Math.PI / 2;
for (var c = 0; c < 3; c++) {
[-1, 1].forEach(function (s) { var cy = swkCyl(E, 0.12, 0.12, 0.36, swkM(0x5A5E64, "metal"), -0.3 + c * 0.3, 0.95, s * 0.5, 8); cy.rotation.x = Math.PI / 2; });
}
swkBox(E, 1.8, 0.04, 1.2, swkM(0x2A2C2E, "metal"), 0, 0.02, 0);
aptSolid(-283, -318, 1, 0.8, 0, 1.4);
var W = swkAt(D, -291, 0, -293, 0.5), al = swkM(0xB8BCC2, "metal");
[-0.6, 0.6].forEach(function (s) { [-1, 1].forEach(function (t2) { swkBox(W, 0.06, 2.2, 0.06, al, s, 1.1, t2); }); });
swkBox(W, 1.3, 0.06, 2.1, al, 0, 2.2, 0);
for (var st = 0; st < 6; st++)
swkBox(W, 1.1, 0.05, 0.25, al, 0, 0.35 + st * 0.33, 1.2 + st * 0.22 - 0.9);
[-0.6, 0.6].forEach(function (s) { swkBox(W, 0.04, 0.04, 2.1, al, s, 3.2, 0); swkBox(W, 0.04, 1.0, 0.04, al, s, 2.7, -1); });
aptSolid(-291, -293, 0.8, 1.2, 0, 3.2, 0.5);
var up = swkM(0x2A4E8A, "metal"), bm = swkM(0xE07A20, "metal"), bx = [swkM(0xA8885A, null), swkM(0x9A7A50, "wood"), swkM(0x5A6A7A, "metal"), swkM(0xC8C0B0, null)];
var nb = L ? 3 : 5;
for (var b = 0; b < nb; b++) {
var zc = -330 + b * 5.2;
[zc - 2.5, zc + 2.5].forEach(function (zz) { [-309.3, -308.1].forEach(function (xx) { swkBox(D, 0.08, 6, 0.08, up, xx, 3, zz); }); });
[1.6, 3.3, 5.0].forEach(function (y, li) {
[-309.3, -308.1].forEach(function (xx) { swkBox(D, 0.06, 0.12, 5, bm, xx, y, zc); });
for (var q = 0; q < 3; q++) {
if (!swkKeep(b + li + q))
continue;
var bw = 0.8 + ((b * 3 + li + q) % 3) * 0.2;
swkBox(D, 1.0, 0.5 + ((b + q) % 2) * 0.25, bw, bx[(b + li + q) % 4], -308.7, y + 0.31 + ((b + q) % 2) * 0.12, zc - 1.5 + q * 1.5);
}
});
swkBox(D, 1.1, 0.12, 1.1, swkM(0x9A7A50, "wood"), -308.7, 0.06, zc - 1.2);
swkBox(D, 1.0, 0.6, 1.0, bx[b % 4], -308.7, 0.42, zc - 1.2);
}
aptSolid(-308.7, -330 + (nb - 1) * 2.6, 0.7, (nb * 5.2) / 2, 0, 6);
var wd = swkM(0x7A5A3A, "wood"), stl = swkM(0x4A5058, "metal"), peg = swkM(0xC8B48A, "wood");
for (var w = 0; w < 3; w++) {
var wz = -311 + w * 3.4;
swkBox(D, 0.9, 0.08, 3, wd, -231.1, 0.92, wz);
swkBox(D, 0.85, 0.88, 2.9, stl, -231.1, 0.44, wz);
swkBox(D, 0.04, 1.2, 3, peg, -230.6, 1.75, wz);
for (var tl = 0; tl < (L ? 3 : 6); tl++)
swkBox(D, 0.04, 0.25 + (tl % 3) * 0.08, 0.06, swkM([0x8A2A22, 0x2A4A8A, 0x3A3A3A][tl % 3], "metal"), -230.65, 1.7, wz - 1.2 + tl * 0.45);
var v = swkAt(D, -231.3, 0.96, wz + 1.0, 0);
swkBox(v, 0.2, 0.16, 0.3, swkM(0x2A5A3A, "metal"), 0, 0.08, 0);
aptSolid(-231.1, wz, 0.45, 1.5, 0, 1);
}
var dp = swkAt(D, -231.4, 0, -299.5, 0);
swkBox(dp, 0.5, 0.06, 0.5, stl, 0, 0.03, 0);
swkCyl(dp, 0.05, 0.05, 1.7, stl, 0, 0.85, 0, 8);
swkBox(dp, 0.3, 0.4, 0.5, swkM(0x3A6A3A, "metal"), 0, 1.7, 0.1);
swkBox(dp, 0.3, 0.04, 0.3, stl, 0, 0.9, 0.1);
aptRound(-231.4, -299.5, 0.35, 0, 1.9);
var cp = swkAt(D, -232, 0, -296, 0);
var tk = swkCyl(cp, 0.35, 0.35, 1.4, swkM(0xC8302A, "metal", { phong: 40 }), 0, 0.45, 0, 12);
tk.rotation.x = Math.PI / 2;
swkBox(cp, 0.4, 0.35, 0.4, swkM(0x2A2C2E, "metal"), 0, 0.95, -0.3);
aptSolid(-232, -296, 0.4, 0.75, 0, 1.2);
var drum = [swkM(0x2A4A8A, "metal"), swkM(0x2A6A3A, "metal"), swkM(0xB8302A, "metal")];
for (var d = 0; d < (L ? 2 : 4); d++)
swkCyl(D, 0.29, 0.29, 0.88, drum[d % 3], -232.5 + (d % 2) * 0.62, 0.44, -292.5 + Math.floor(d / 2) * 0.62, 12);
aptRound(-232.2, -292.2, 0.8, 0, 0.9);
var red = swkM(0xC8201A, "metal", { phong: 50 });
[[-309.7, -312], [-309.7, -290], [-230.3, -318], [-230.3, -283], [-280, -334.7], [-262, -334.7]].forEach(function (p, i) {
if (!swkKeep(i))
return;
swkCyl(D, 0.09, 0.09, 0.55, red, p[0], 1.0, p[1], 8);
var sg = swkBox(D, p[0] < -300 || p[0] > -240 ? 0.02 : 0.3, 0.3, p[0] < -300 || p[0] > -240 ? 0.3 : 0.02, red, p[0], 1.7, p[1]);
});
var lit = swkM(0xFFF6E0, null, { basic: true }), hs = swkM(0x5A5E64, "metal");
for (var r = 0; r < (L ? 2 : 4); r++)
for (var s2 = 0; s2 < (L ? 3 : 5); s2++) {
var lx = -300 + s2 * (L ? 20 : 15), lz = -327 + r * (L ? 32 : 16);
swkBox(D, 0.3, 0.1, 6, hs, lx, 10.6, lz);
swkBox(D, 0.22, 0.02, 5.8, lit, lx, 10.54, lz);
swkCyl(D, 0.01, 0.01, 1.4, hs, lx, 11.3, lz - 2.5, 4);
swkCyl(D, 0.01, 0.01, 1.4, hs, lx, 11.3, lz + 2.5, 4);
}
if (typeof swkPeople === "function") {
var out = swkPeople(D, "apt_hangar", [[-268, -305.8, 0.4, "mechanic"], [-231.9, -307.6, -1.57, "mechanic"]], null);
}
}
];
});
