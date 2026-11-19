/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(420, function () {
"use strict";
return [
function (c) {
var d = stcDefaults();
if (!c || typeof c !== "object")
return d;
var ef = Math.round(+c.ef);
if (!(ef >= 0 && ef <= 5))
ef = d.ef;
var n = Math.round(+c.count);
if (!(n >= 1 && n <= 3))
n = d.count;
return { open: c.open !== false, talk: c.talk !== false, ef: ef, count: n, lightning: c.lightning !== false, hail: c.hail !== false, haboob: c.haboob !== false,
spout: c.spout !== false, push: c.push !== false, harm: c.harm !== false, notes: String(c.notes || "").slice(0, 1200) };
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (STC.mats[k])
return STC.mats[k];
var cc = new THREE.Color(col), lum = 0.2126 * cc.r + 0.7152 * cc.g + 0.0722 * cc.b;
if (lum > 0.62 && o.e === undefined)
cc.multiplyScalar(0.62 / lum);
var m = o.phong && !STC.lite ? new THREE.MeshPhongMaterial({ color: cc, shininess: o.phong, specular: o.spec || 0x333333 }) : new THREE.MeshLambertMaterial({ color: cc });
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
STC.mats[k] = m;
return m;
},
function (key, w, h, draw, o) {
o = o || {};
var k = "cv|" + key;
if (STC.mats[k])
return STC.mats[k];
if (STC.lite && !o.full) {
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
if (key !== "radarwall" && !o.live)
t.onUpdate = function () { var tt = this; setTimeout(function () { if (tt.image && tt.image.getContext) {
tt.image.width = 1;
tt.image.height = 1;
} }, 0); };
if (o.rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(o.rep[0], o.rep[1]);
}
var m = o.basic ? new THREE.MeshBasicMaterial({ map: t, transparent: !!o.op, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide, depthWrite: !o.op, fog: o.fog !== false })
: new THREE.MeshLambertMaterial({ map: t, side: o.ds ? THREE.DoubleSide : THREE.FrontSide, transparent: !!o.op, opacity: o.op || 1, depthWrite: !o.op });
if (!o.basic && !o.e && !o.lit)
m.color.setHex(0xDCDCDC);
if (o.e) {
m.emissive = new THREE.Color(0xFFFFFF);
m.emissiveMap = t;
m.emissiveIntensity = o.e;
}
STC.mats[k] = m;
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
return best === null ? 0 : best;
},
function (K, x, z, feet) {
var L = K.grid[Math.floor(x / 50) + "," + Math.floor(z / 50)] || [];
for (var i = 0; i < L.length; i++) {
var s = L[i];
if (feet > (s.b || 0) + s.h - 0.3)
continue;
if (feet + 1.7 < (s.b || 0))
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
for (i = 0; i < K.water.length; i++) {
var W = K.water[i];
if (Math.hypot(x - W.x, z - W.z) < W.r && !(W.not && W.not.some(function (R) { return x >= R[0] && x <= R[2] && z >= R[1] && z <= R[3]; })))
return true;
}
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
stcBox(len, hh, t, mat, mid, y0 + hh / 2, c);
else
stcBox(t, hh, len, mat, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
stcSolid(mid, c, len / 2, t / 2, y0, hh);
else
stcSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2), sill = O.sill || 0, top = Math.min(h, sill + (O.h || 2.6)), yb = y + sill;
seg(cur, s0, y, y + h, true);
seg(s0, s1, y + top, y + h, false);
if (sill > 0)
seg(s0, s1, y, yb, true);
if (O.glass) {
var gm = typeof gwGlass === "function" ? gwGlass() : stcMat(0x9FC0D0, null, { op: 0.3 });
if (dir === "x")
stcBox(s1 - s0, top - sill, 0.05, gm, (s0 + s1) / 2, yb + (top - sill) / 2, c);
else
stcBox(0.05, top - sill, s1 - s0, gm, c, yb + (top - sill) / 2, (s0 + s1) / 2);
if (dir === "x")
stcSolid((s0 + s1) / 2, c, (s1 - s0) / 2, t / 2, yb, top - sill);
else
stcSolid(c, (s0 + s1) / 2, t / 2, (s1 - s0) / 2, yb, top - sill);
}
if (!sill) {
if (dir === "x")
stcFloor(s0, c - 0.9, s1, c + 0.9, yb);
else
stcFloor(c - 0.9, s0, c + 0.9, s1, yb);
}
cur = s1;
});
seg(cur, hi, y, y + h, true);
},
function (B) {
var y = 0, h = B.h || 4.2, t = 0.3, wl = B.wall || stcMat(0xC8B8A0, "siding"), fl = B.floor || stcMat(0x8A6A48, "wood"), ce = stcMat(0xE8E0D2, "plaster"), inner = B.inner || stcMat(0xE8DCC8, "plaster");
var x0 = B.x0, x1 = B.x1, z0 = B.z0, z1 = B.z1, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
var opens = { n: [], s: [], e: [], w: [] }, wsp = B.win || 4;
(B.doors || []).forEach(function (D) { opens[D.side].push({ at: D.at, w: D.w || 1.8, h: 2.5 }); });
["n", "s", "e", "w"].forEach(function (sd) {
var along = sd === "n" || sd === "s", a0 = along ? x0 : z0, a1 = along ? x1 : z1, n = Math.floor((a1 - a0) / wsp);
for (var i = 0; i < n; i++) {
var at = a0 + (i + 0.5) * (a1 - a0) / n;
if (opens[sd].some(function (o) { return Math.abs(o.at - at) < o.w / 2 + 1.1; }))
continue;
opens[sd].push({ at: at, w: 1.3, h: 1.5, sill: 1.0, glass: true });
}
});
stcBox(w, 0.3, d, fl, cx, -0.09, cz);
stcFloor(x0, z0, x1, z1, y);
stcBox(w, 0.25, d, ce, cx, h + 0.12, cz);
stcWall("x", x0, x1, z0, y, h, t, wl, opens.n);
stcWall("x", x0, x1, z1, y, h, t, wl, opens.s);
stcWall("z", z0, z1, x0, y, h, t, wl, opens.w);
stcWall("z", z0, z1, x1, y, h, t, wl, opens.e);
var rc = B.roof || "gable", rm = B.roofMat || stcMat(0x5A4A40, "shingle"), trim = B.trim || stcMat(0xEDE6D8, "wood");
if (rc === "gable") {
var ridgeX = w < d, half = (ridgeX ? w : d) / 2 + 0.5, pitch = Math.min(3.2, half * 0.6), len = (ridgeX ? d : w) + 1, sl = Math.hypot(half, pitch), ang = Math.atan2(pitch, half);
[-1, 1].forEach(function (s) {
var m = stcBox(ridgeX ? sl : len, 0.22, ridgeX ? len : sl, rm, ridgeX ? cx + s * half / 2 : cx, h + 0.25 + pitch / 2, ridgeX ? cz : cz + s * half / 2);
if (ridgeX)
m.rotation.z = -s * ang;
else
m.rotation.x = s * ang;
});
var tri = new THREE.Shape();
tri.moveTo(-half + 0.5, 0);
tri.lineTo(half - 0.5, 0);
tri.lineTo(0, pitch - 0.1);
tri.lineTo(-half + 0.5, 0);
var tg = new THREE.ShapeGeometry(tri);
[-1, 1].forEach(function (s) {
var m = new THREE.Mesh(tg, wl);
m.material = stcMat(0xD8CCB8, "siding", { ds: true });
if (ridgeX) {
m.position.set(cx, h + 0.24, cz + s * (d / 2));
}
else {
m.rotation.y = Math.PI / 2;
m.position.set(cx + s * (w / 2), h + 0.24, cz);
}
stcP().add(m);
});
}
else {
stcBox(w + 0.4, 0.3, d + 0.4, stcMat(0x4A4440, "concrete"), cx, h + 0.3, cz);
if (rc === "front" && B.front) {
var F = B.front;
var fh = F.h || 2.4;
if (F.side === "e" || F.side === "w") {
var fx = F.side === "e" ? x1 + 0.05 : x0 - 0.05;
stcBox(0.35, fh, d + 0.3, wl, fx, h + fh / 2, cz);
stcBox(0.5, 0.3, d + 0.6, trim, fx, h + fh + 0.1, cz);
}
else {
var fz = F.side === "s" ? z1 + 0.05 : z0 - 0.05;
stcBox(w + 0.3, fh, 0.35, wl, cx, h + fh / 2, fz);
stcBox(w + 0.6, 0.3, 0.5, trim, cx, h + fh + 0.1, fz);
}
}
}
[[x0, z0], [x1, z0], [x0, z1], [x1, z1]].forEach(function (c) { stcBox(0.34, h, 0.34, trim, c[0], h / 2, c[1]); });
if (B.name)
STCK.rooms.push({ x0: x0, z0: z0, x1: x1, z1: z1, y: 0, h: h, name: B.name });
if (typeof wGlow === "function") {
var gl = wGlow(0xFFE2B0, Math.min(w, d) * 0.8, 0.18);
gl.position.set(cx, h - 0.6, cz);
stcP().add(gl);
gl.userData.keep = 1;
}
return { x0: x0, z0: z0, x1: x1, z1: z1, cx: cx, cz: cz, w: w, d: d, h: h };
},
function (x, z, w, dpt, side, h, mat) {
var m = mat || stcMat(0x7A3A2A, "metalroof"), post = stcMat(0x6A5A4A, "wood"), along = side === "e" || side === "w", s = side === "e" || side === "s" ? 1 : -1;
if (along) {
stcBox(dpt, 0.12, w, m, x + s * dpt / 2, h, z);
[-1, 1].forEach(function (k) { stcCyl(0.07, h, post, x + s * (dpt - 0.2), h / 2, z + k * (w / 2 - 0.2), null, 6); stcRound(x + s * (dpt - 0.2), z + k * (w / 2 - 0.2), 0.1, 0, h); });
}
else {
stcBox(w, 0.12, dpt, m, x, h, z + s * dpt / 2);
[-1, 1].forEach(function (k) { stcCyl(0.07, h, post, x + k * (w / 2 - 0.2), h / 2, z + s * (dpt - 0.2), null, 6); stcRound(x + k * (w / 2 - 0.2), z + s * (dpt - 0.2), 0.1, 0, h); });
}
},
function (key, title, text, w, h, x, y, z, ry, o) {
o = o || {};
var bg = o.bg || "#F2EEE4", fg = o.fg || "#1E2630", ac = o.ac || "#2A5A8A";
var PW = STC.lite ? 256 : 384;
var m = stcCanvasMat("pl-" + key, PW, Math.round(PW * h / w), function (c, W, H) {
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
var p = stcPlane(w, h, m, x, y, z, ry, o.parent);
p.userData.keep = 1;
return p;
},
function (arch, x, z, ry, s, o) {
o = o || {};
var g = null;
try {
if (typeof build === "function")
g = build({ id: "stc_" + arch + "_" + Math.round(x) + "_" + Math.round(z), archetype: arch, attrs: Object.assign({ s: s || 1 }, o.attrs || {}), x: 0, z: 0, rot: 0, solid: false, detail: STC.lite ? 2 : 3, nights: [] });
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
stcP().add(g);
if (o.solid)
stcRound(x, z, o.solid, 0, 3);
return g;
},
function (seed, x, y, z, ry, look, title) {
var g = null;
try {
if (typeof wPerson === "function")
g = wPerson("stc_" + seed, { look: look || null, title: title || "", place: "Stormhaven" });
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
stcCyl(0.22, 1.5, stcMat(0x4A5A6A, null), 0, 0.75, 0, g, 10, 0.3);
stcSph(0.17, stcMat(0xC89A70, null), 0, 1.66, 0, g, 10);
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
stcP().add(g);
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function () {
var P = stcP(), N = STC.lite ? 1 : 1;
var grass = stcCanvasMat("prairie", 512, 512, function (c, W, H) {
c.fillStyle = "#56603A";
c.fillRect(0, 0, W, H);
var r = stcRnd(7);
for (var m = 0; m < 40; m++) {
var mx = r() * W, my = r() * H, mr = 20 + r() * 60, cl = r() < 0.5 ? "74,86,44" : r() < 0.5 ? "122,112,70" : "60,70,38";
for (var ox = -1; ox <= 1; ox++)
for (var oy = -1; oy <= 1; oy++) {
var gr = c.createRadialGradient(mx + ox * W, my + oy * H, 0, mx + ox * W, my + oy * H, mr);
gr.addColorStop(0, "rgba(" + cl + ",0.45)");
gr.addColorStop(1, "rgba(" + cl + ",0)");
c.fillStyle = gr;
c.fillRect(mx + ox * W - mr, my + oy * H - mr, mr * 2, mr * 2);
}
}
for (var i = 0; i < 16000; i++) {
var t = r(), col = t < 0.45 ? "rgba(96," + (110 + r() * 30 | 0) + ",52,0.45)" : t < 0.75 ? "rgba(" + (140 + r() * 30 | 0) + "," + (128 + r() * 24 | 0) + ",78,0.4)" : t < 0.93 ? "rgba(44,56,30,0.45)" : "rgba(110,92,64,0.5)";
var x = r() * W, y = r() * H, l = 3 + r() * 6;
c.strokeStyle = col;
c.lineWidth = 1 + r() * 0.8;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + l * 0.35, y - l);
c.stroke();
}
}, { rep: [220, 220] });
grass.color.setHex(0x9AA48A);
try {
grass.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
var gnd = stcFlat(3400, 3400, grass, 0, -0.06, 0);
gnd.receiveShadow = true;
var det = stcCanvasMat("ground-detail", 256, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
var r = stcRnd(19);
for (var i = 0; i < 700; i++) {
var x = r() * W, y = r() * H, t = r();
if (t < 0.35) {
c.fillStyle = "rgba(38,52,24,0.75)";
for (var k = 0; k < 5; k++) {
c.beginPath();
c.arc(x + (r() - 0.5) * 8, y + (r() - 0.5) * 8, 2 + r() * 2.5, 0, 7);
c.fill();
}
}
else if (t < 0.55) {
c.fillStyle = "rgba(92,76,52,0.6)";
c.beginPath();
c.ellipse(x, y, 4 + r() * 7, 2 + r() * 4, r() * 3, 0, 7);
c.fill();
}
else if (t < 0.85) {
c.strokeStyle = "rgba(178,162,104,0.8)";
c.lineWidth = 1.4;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (r() - 0.5) * 14, y + (r() - 0.5) * 14);
c.stroke();
}
else {
c.fillStyle = "rgba(120,116,108,0.7)";
c.beginPath();
c.arc(x, y, 1 + r() * 1.6, 0, 7);
c.fill();
}
}
}, { rep: [1100, 1100], op: 1 });
try {
det.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
var dm = stcFlat(3400, 3400, det, 0, -0.055, 0);
dm.renderOrder = 1;
var grav = stcCanvasMat("gravel", 256, 256, function (c, W, H) { c.fillStyle = "#8A7E6A"; c.fillRect(0, 0, W, H); var r = stcRnd(3); for (var i = 0; i < 3000; i++) {
var g = 100 + r() * 90 | 0;
c.fillStyle = "rgb(" + g + "," + (g - 6) + "," + (g - 20) + ")";
c.fillRect(r() * W, r() * H, 2, 2);
} }, { rep: [1, 60] });
var asph = stcMat(0x3A3A3E, "asphalt");
for (var k = -3; k <= 3; k++) {
var c = k * 400;
if (k !== 0) {
stcFlat(9, 3200, grav, c, 0.03, 0);
stcFlat(3200, 9, grav, 0, 0.031, c);
}
}
stcFlat(14, 3200, asph, 0, 0.04, 0);
stcFlat(3200, 12, asph, 0, 0.041, 0);
var dash = stcMat(0xD8C040, null, { e: 0x403810 });
for (var z = -1580; z < 1580; z += 12) {
if (Math.abs(z) < 8)
continue;
stcBox(0.15, 0.02, 5, dash, 0, 0.06, z);
}
var walk = stcMat(0xA8A49C, "concrete");
[-1, 1].forEach(function (s) { stcBox(3, 0.16, 260, walk, s * 8.5, 0.08, 0); stcFloor(s * 7, -130, s * 10, 130, 0.16); });
stcFloor(-10, -130, 10, 130, 0);
var wheat = stcCanvasMat("wheat", 256, 256, function (c, W, H) { c.fillStyle = "#C8A852"; c.fillRect(0, 0, W, H); var r = stcRnd(11); for (var i = 0; i < 4000; i++) {
c.fillStyle = r() < 0.5 ? "#B89442" : "#DABC6A";
c.fillRect(r() * W, r() * H, 1, 4);
} }, { rep: [30, 30] });
var corn = stcCanvasMat("corn", 256, 256, function (c, W, H) { c.fillStyle = "#3A5A22"; c.fillRect(0, 0, W, H); for (var x = 0; x < W; x += 8) {
c.fillStyle = "#5A7A2E";
c.fillRect(x, 0, 4, H);
} }, { rep: [40, 40] });
var earth = stcCanvasMat("ploughed", 256, 256, function (c, W, H) { c.fillStyle = "#5A4030"; c.fillRect(0, 0, W, H); for (var y = 0; y < H; y += 6) {
c.fillStyle = "#6A4E3A";
c.fillRect(0, y, W, 3);
} }, { rep: [40, 40] });
var fm = [wheat, corn, wheat, earth, corn, wheat], fi = 0;
STC.fields = [];
for (var i = -3; i < 3; i++)
for (var j = -3; j < 3; j++) {
var x = i * 400 + 200, zz = j * 400 + 200;
if (Math.abs(x) < 300 && Math.abs(zz) < 300)
continue;
if (Math.hypot(x + 520, zz - 420) < 300)
continue;
if ((i * 7 + j * 3 + 21) % 5 === 4)
continue;
var fmat = fm[(fi++) % fm.length], f = stcFlat(380, 380, fmat, x, 0.02, zz);
f.receiveShadow = true;
STC.fields.push({ x: x, z: zz, k: fmat === corn ? "corn" : fmat === wheat ? "wheat" : "earth" });
}
var post = stcMat(0x7A6A55, "wood");
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (q) { for (var d = 240; d < 400; d += 6) {
stcCyl(0.07, 1.2, post, q[0] * 12, 0.6, q[1] * d, null, 5);
} });
var pole = stcMat(0x5A4A3A, "wood"), wire = new THREE.LineBasicMaterial({ color: 0x202020 });
var pts = [];
for (var pz = -1500; pz <= 1500; pz += 50) {
stcCyl(0.14, 10, pole, -11, 5, pz, null, 6);
stcBox(2.4, 0.14, 0.14, pole, -11, 9.6, pz);
stcRound(-11, pz, 0.2, 0, 10);
pts.push(new THREE.Vector3(-12, 9.5, pz), new THREE.Vector3(-12, 9.5, pz + 50), new THREE.Vector3(-10, 9.5, pz), new THREE.Vector3(-10, 9.5, pz + 50));
}
var lg = new THREE.BufferGeometry().setFromPoints(pts);
var ln = new THREE.LineSegments(lg, wire);
ln.userData.keep = 1;
P.add(ln);
var wt = stcMat(0xB8C0C8, "metal", { phong: 40 });
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { var l = stcCyl(0.3, 26, wt, -46 + q[0] * 5, 13, -92 + q[1] * 5, null, 8); stcRound(-46 + q[0] * 5, -92 + q[1] * 5, 0.4, 0, 26); });
stcCyl(8, 8, wt, -46, 30, -92, null, STC.lite ? 14 : 24);
var cap = new THREE.Mesh(new THREE.ConeGeometry(8.2, 3, STC.lite ? 14 : 24), wt);
cap.position.set(-46, 35.5, -92);
P.add(cap);
var nm = stcCanvasMat("tower-name", 512, 96, function (c, W, H) { c.fillStyle = "#B8C0C8"; c.fillRect(0, 0, W, H); c.fillStyle = "#1E3A6A"; c.font = "bold 64px Georgia"; c.textAlign = "center"; c.fillText("STORMHAVEN", W / 2, 70); }, { full: true });
var band = new THREE.Mesh(new THREE.CylinderGeometry(8.05, 8.05, 3, STC.lite ? 14 : 24, 1, true, -0.9, 1.8), nm);
band.position.set(-46, 30, -92);
P.add(band);
var tr = [[-40, -130], [-40, -30], [-40, 30], [40, -130], [40, -80], [-60, 80], [60, 100], [-60, 130], [28, 120], [-28, -110], [-50, -60], [70, -40], [80, 10], [-80, 0]];
tr.forEach(function (p, i) { stcTree(p[0], p[1], 1.1 + (i % 3) * 0.15); });
for (var tb = 0; tb < (STC.lite ? 8 : 18); tb++) {
stcTree(240 + tb * 9, 180, 1.1);
}
},
function (x, z, ry, o) {
o = o || {};
var g = stcGroup(x, 0, z, ry), wd = stcMat(0x6A5038, "wood"), mt = stcMat(0x2A2E34, "metal");
stcBox(1.6, 0.06, 0.8, wd, 0, 0.76, 0, g);
[[-0.75, -0.35], [0.75, -0.35], [-0.75, 0.35], [0.75, 0.35]].forEach(function (p) { stcBox(0.06, 0.74, 0.06, mt, p[0], 0.37, p[1], g); });
if (o.screen) {
var sc = stcBox(0.7, 0.42, 0.05, mt, 0, 1.05, -0.25, g);
var sm = stcPlane(0.64, 0.36, o.screen, 0, 1.05, -0.22, 0, g);
sm.userData.keep = 1;
}
stcBox(0.5, 0.45, 0.5, stcMat(0x2A2A30, null), 0, 0.45, 0.75, g);
stcSolid(x, z, 0.85, 0.45, 0, 1);
return g;
},
function (x, z, w, ry, cols) {
var fy = STC.fy || 0, g = stcGroup(x, fy, z, ry), wd = stcMat(0x5A4430, "wood");
stcBox(w, 2, 0.45, wd, 0, 1, 0, g);
var r = stcRnd(Math.abs(x * 31 + z * 17) | 0);
for (var s = 0; s < 4; s++)
for (var i = 0; i < Math.floor(w / 0.3); i++) {
var c = (cols || [0xC84A3A, 0x3A6AA8, 0xE8C040, 0x4A8A4A, 0xE8E0D0])[Math.floor(r() * 5)];
stcBox(0.22, 0.28, 0.3, stcMat(c, null), -w / 2 + 0.2 + i * 0.3, 0.3 + s * 0.48, 0.1, g);
}
var c = Math.cos(ry || 0), s2 = Math.sin(ry || 0);
stcSolid(x, z, Math.abs(c) * w / 2 + Math.abs(s2) * 0.25, Math.abs(s2) * w / 2 + Math.abs(c) * 0.25, fy, 2);
return g;
},
function (x, z, w, ry) {
var fy = STC.fy || 0, g = stcGroup(x, fy, z, ry), wd = stcMat(0x7A5A3A, "wood");
stcBox(w, 0.08, 0.45, wd, 0, 0.46, 0, g);
stcBox(w, 0.5, 0.06, wd, 0, 0.75, -0.22, g);
[-1, 1].forEach(function (s) { stcBox(0.08, 0.46, 0.42, wd, s * (w / 2 - 0.1), 0.23, 0, g); });
var c = Math.cos(ry || 0), s2 = Math.sin(ry || 0);
stcSolid(x, z, Math.abs(c) * w / 2 + Math.abs(s2) * 0.25, Math.abs(s2) * w / 2 + Math.abs(c) * 0.25, fy, 0.9);
return g;
},
function (x, z, ry) {
var g = stcGroup(x, 0, z, ry);
stcBox(1.5, 0.45, 2.1, stcMat(0x6A4A30, "wood"), 0, 0.22, 0, g);
stcBox(1.4, 0.18, 2, stcMat(0xE8E2D8, null), 0, 0.52, 0, g);
stcBox(1.42, 0.1, 1.3, stcMat(0x3A5A8A, null), 0, 0.62, 0.3, g);
stcBox(1.5, 1, 0.1, stcMat(0x5A3A24, "wood"), 0, 0.6, -1.05, g);
var c = Math.abs(Math.cos(ry || 0)), s = Math.abs(Math.sin(ry || 0));
stcSolid(x, z, c * 0.75 + s * 1.05, s * 0.75 + c * 1.05, 0, 0.7);
},
function () {
var red = stcMat(0x9A4A3A, "brick"), tan = stcMat(0xC8B494, "siding"), white = stcMat(0xD8D4CA, "siding"), blue = stcMat(0x6A8AA8, "siding"), sage = stcMat(0x8A9A7A, "siding"), conc = stcMat(0xA8A49A, "concrete");
var wood = stcMat(0x7A5A3A, "wood"), mt = stcMat(0x5A6068, "metal", { phong: 30 }), K = STCK;
var O = stcBuilding({ x0: -30, z0: -62, x1: -10, z1: -34, h: 4.6, wall: red, roof: "front", front: { side: "e", h: 2.6 }, doors: [{ side: "e", at: -48, w: 2 }], name: "The Storm Prediction Office" });
stcSign(["STORM PREDICTION OFFICE", "Stormhaven · Weather Service"], 8, 1.6, "#1E3A5A", "#F0F0F0", -9.8, 5.9, -48, Math.PI / 2);
stcAwning(-10, -48, 4, 1.6, "e", 3);
var dome = stcSph(3.2, stcMat(0xEDEDE6, null, { phong: 20 }), -22, 9.4, -50, null, STC.lite ? 12 : 20);
stcCyl(1.6, 3, conc, -22, 6.2, -50, null, 10);
STC.radarScr = stcCanvasMat("radarwall", 512, 256, function () { }, { basic: true, full: true });
var rw = stcPlane(14, 4.2 * 0.5 * 1.2, STC.radarScr, -29.8, 2.6, -48, Math.PI / 2);
rw.scale.set(1, 1.2, 1);
rw.userData.keep = 1;
stcBox(0.1, 3.2, 15, stcMat(0x1A1A1E, null), -29.9, 2.6, -48);
var scrA = stcScreenMat("desk-a", function (c, W, H) { c.fillStyle = "#0A1420"; c.fillRect(0, 0, W, H); c.strokeStyle = "#4AE04A"; c.beginPath(); for (var i = 0; i < W; i += 4)
c.lineTo(i, H / 2 + Math.sin(i * 0.07) * 30 * Math.sin(i * 0.013)); c.stroke(); c.fillStyle = "#E8E8E8"; c.font = "14px monospace"; c.fillText("SOUNDING 18Z · CAPE 3,850 J/kg", 8, 18); c.fillText("0-1 km SHEAR 30 kt · SRH 320", 8, H - 10); });
var scrB = stcScreenMat("desk-b", function (c, W, H) { c.fillStyle = "#141A10"; c.fillRect(0, 0, W, H); c.fillStyle = "#E8C040"; c.font = "bold 16px monospace"; c.fillText("TORNADO WATCH 214", 8, 22); c.fillStyle = "#E8E8E8"; c.font = "12px monospace"; ["IN EFFECT UNTIL 9 PM CDT", "FOR WICHAWA AND 11 COUNTIES", "LARGE HAIL TO 3 INCHES", "GUSTS TO 75 MPH", "A FEW STRONG TORNADOES LIKELY"].forEach(function (l, i) { c.fillText(l, 8, 48 + i * 20); }); });
[[-24, -40, scrA], [-18, -40, scrB], [-24, -56, scrB], [-18, -56, scrA]].forEach(function (d) { stcDesk(d[0], d[1], 0, { screen: d[2] }); });
stcPlaque("watchwarn", "WATCH or WARNING?", "WATCH: conditions are right for tornadoes over a large area for the next few hours. Be ready; have a plan.\nWARNING: a tornado is on radar or has been seen. Take shelter NOW.\nA warning comes from the local office, often 10 to 15 minutes before a tornado arrives.", 4, 3, -12.2, 2.4, -60.4, 0);
stcSpot(-26, -48, 3.2, "The radar wall", "look at the radar", function () { stcRadarCard(); });
stcSpot(-14, -58, 2.4, "The warning board", "watch or warning?", function () { stcTwo("📻 The warning board", "Read what to do", function () { stcLessonCard("safety"); }, "Watch or warning?", "test yourself", stcWatchTry); });
stcGuide("marisol", -21, -45, Math.PI / 2);
stcBuilding({ x0: -26, z0: -30, x1: -10, z1: -12, h: 4, wall: white, roof: "front", front: { side: "e", h: 2.2 }, doors: [{ side: "e", at: -21, w: 1.8 }], name: "The Twister Diner", win: 3 });
stcSign(["TWISTER DINER", "Pie · Coffee · Chasers welcome"], 7, 1.4, "#C83A2A", "#FFF4E0", -9.8, 5.1, -21, Math.PI / 2);
stcAwning(-10, -21, 8, 1.6, "e", 3, stcMat(0xC83A2A, null));
stcBox(1, 1.05, 12, stcMat(0xC8C8D0, "metal", { phong: 60 }), -22, 0.53, -21);
stcSolid(-22, -21, 0.5, 6, 0, 1.1);
for (var st = 0; st < 6; st++) {
stcCyl(0.22, 0.08, stcMat(0xC83A2A, null), -20.6, 0.75, -26 + st * 2, null, 10);
stcCyl(0.05, 0.75, mt, -20.6, 0.37, -26 + st * 2, null, 6);
}
stcBox(1.2, 1.3, 1, stcMat(0xBFE0F0, null, { op: 0.35 }), -24.5, 1.6, -14.5);
for (var pi = 0; pi < 3; pi++)
stcCyl(0.25, 0.08, stcMat(0xC88A4A, null), -24.5, 1.2 + pi * 0.35, -14.5, null, 10);
[[-13.2, -27], [-13.2, -23], [-13.2, -16]].forEach(function (b) { stcTable(b[0], b[1], 1.2, 0.8); stcBench(b[0], b[1] - 1, 1.2, 0); stcBench(b[0], b[1] + 1, 1.2, Math.PI); });
stcGuide("rosie", -23.5, -18, Math.PI / 2);
stcSpot(-20, -21, 2.6, "The counter", "order a slice of pie", function () { stcPie(); });
stcBuilding({ x0: -26, z0: 8, x1: -10, z1: 28, h: 4.4, wall: tan, roof: "front", front: { side: "e", h: 2.6 }, doors: [{ side: "e", at: 18, w: 2 }], name: "Harlan's General Store" });
stcSign(["HARLAN'S", "General Store · Est. 1889"], 7, 1.5, "#2A4A2A", "#F0E8C8", -9.8, 5.8, 18, Math.PI / 2);
stcAwning(-10, 18, 10, 1.8, "e", 3.1, stcMat(0x2A5A3A, null));
stcShelf(-24.5, 14, 6, Math.PI / 2);
stcShelf(-24.5, 23, 6, Math.PI / 2);
stcShelf(-19, 12, 5, 0);
stcShelf(-19, 25, 5, Math.PI);
stcBox(4, 1, 0.8, wood, -15, 0.5, 26);
stcSolid(-15, 26, 2, 0.4, 0, 1);
stcSpot(-15, 24, 2.4, "The storm kit shelf", "pack a storm kit", function () { stcTwo("🎒 The storm kit shelf", "See the list", function () { stcKitList(); }, "Pack a storm kit", "pick what goes in", function () { stcPackTry(); }); });
for (var mr = 0; mr < 5; mr++) {
var z0 = 34 + mr * 6;
stcBuilding({ x0: -28, z0: z0, x1: -12, z1: z0 + 6, h: 3.2, wall: mr ? sage : stcMat(0x5A7A6A, "siding"), roof: "flat", doors: [{ side: "e", at: z0 + 3, w: 1.1 }], name: mr ? "The Prairie Motel, room " + mr : "The Prairie Motel: the office", win: 12 });
if (mr)
stcBed(-24, z0 + 3, Math.PI / 2);
else {
stcBox(0.7, 1.1, 3, wood, -17, 0.55, z0 + 3);
stcSolid(-17, z0 + 3, 0.35, 1.5, 0, 1.1);
}
}
stcAwning(-12, 49, 30, 2, "e", 2.9);
var neon = stcCanvasMat("motel-sign", 256, 256, function (c, W, H) { c.fillStyle = "#1A2A3A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E8E0C0"; c.font = "bold 40px Georgia"; c.textAlign = "center"; c.fillText("PRAIRIE", W / 2, 80); c.fillText("MOTEL", W / 2, 130); c.fillStyle = "#E86A4A"; c.font = "bold 28px Georgia"; c.fillText("VACANCY", W / 2, 200); }, { basic: true, full: true });
stcCyl(0.15, 7, mt, -6, 3.5, 38, null, 6);
stcRound(-6, 38, 0.25, 0, 7);
stcPlane(3, 3, neon, -6, 6, 38, Math.PI / 2).userData.keep = 1;
stcPlane(3, 3, neon, -6, 6, 38, -Math.PI / 2).userData.keep = 1;
var M = stcBuilding({ x0: 10, z0: -70, x1: 38, z1: -34, h: 6, wall: stcMat(0xD8D0C0, "stone"), roof: "flat", doors: [{ side: "w", at: -52, w: 3 }], name: "The Storm Science Museum", win: 5 });
stcSign(["STORM SCIENCE MUSEUM", "Free · Open every day"], 10, 1.8, "#3A2A5A", "#F0E8FF", 9.8, 7.4, -52, -Math.PI / 2);
stcColumns(9.2, -52, 6, 4);
stcMuseum();
stcBuilding({ x0: 10, z0: -30, x1: 34, z1: -8, h: 5.2, wall: stcMat(0x8A8E94, "metal"), roof: "flat", doors: [{ side: "w", at: -24, w: 1.6 }, { side: "w", at: -15, w: 5.4 }], name: "The Chasers' Garage", win: 6, roofMat: stcMat(0x6A6E74, "metalroof"), floor: stcMat(0x8A8884, "concrete") });
stcSign(["CHASERS' GARAGE", "Stormhaven Storm Research Team"], 9, 1.6, "#E8A030", "#1A1A1A", 9.8, 6.4, -19, -Math.PI / 2);
stcGarage();
stcFireStation(red);
stcElevator(conc, tan);
var cols = [white, blue, sage, tan, stcMat(0xC8A8A0, "siding"), stcMat(0xA8B8C8, "siding")];
var hs = [[-24, -110, "e"], [-24, -135, "e"], [24, -110, "w"], [24, -135, "w"], [-24, 100, "e"], [24, 100, "w"], [24, 125, "w"], [-24, 125, "e"]];
hs.forEach(function (h, i) {
var x0 = h[0] < 0 ? h[0] - 6 : h[0] - 6, x1 = x0 + 12, z0 = h[1] - 7, z1 = h[1] + 7, side = h[2];
stcBuilding({ x0: x0, z0: z0, x1: x1, z1: z1, h: 3.2, wall: cols[i % cols.length], roof: "gable", doors: [{ side: side, at: h[1], w: 1.1 }], name: "A house on Main Street", win: 3.5 });
stcBed(h[0] + (side === "e" ? -3 : 3), h[1] - 4, 0);
stcTable(h[0], h[1] + 2, 1.4, 0.9);
stcShelf(h[0] + (side === "e" ? -5 : 5), h[1] + 3, 2.4, Math.PI / 2);
stcAwning(side === "e" ? x1 : x0, h[1], 5, 1.8, side, 2.6, stcMat(0x5A4A40, "shingle"));
});
var pk = ["pickup", "sedan", "suv", "pickup", "sedan", "suv", "pickup", "sedan", "pickup", "suv"], pcs = [0xB8241E, 0xE8E6E0, 0x1E3A6A, 0x2A2C30, 0x8A9096, 0x6A2A1A, 0x5A6A4A, 0xC8B080, 0x3A4A5A, 0xD8D4CA];
[[-5, -80, 0], [5, -30, Math.PI], [-5, 22, 0], [5, 70, Math.PI], [-5, -58, 0], [-5, -104, 0], [5, -52, Math.PI], [-5, 34, 0], [5, 96, Math.PI], [-5, 112, 0]].slice(0, STC.lite ? 6 : 10).forEach(function (c, i) { stcCar(pk[i], c[0], c[1], c[2], { col: pcs[i], solid: 1 }); });
for (var lz = -120; lz <= 120; lz += 30) {
[-1, 1].forEach(function (s) { stcCyl(0.08, 5, mt, s * 9.6, 2.5, lz, null, 6); stcRound(s * 9.6, lz, 0.15, 0, 5); stcLamp(s * 9, 5, lz, 0xFFE0A8, 1.6); });
}
},
function () {
var x0 = 10, x1 = 38, z0 = -70, z1 = -34;
STC_EF.forEach(function (e, i) {
var col = "#" + ("00000" + e[3].toString(16)).slice(-6);
stcPlaque("ef" + i, "EF" + e[0] + "  ·  " + e[1], e[2], 4.2, 2.6, 13 + i * 4.3, 2.6, -69.6, 0, { ac: col });
});
stcSpot(24, -66, 4, "The Enhanced Fujita scale", "rate tornado damage", function () { stcTwo("📏 The Enhanced Fujita scale", "Read about rating tornadoes", function () { stcLessonCard("ef"); }, "Rate the damage", "you be the surveyor", stcEfTry); });
var hail = [["pea", 0.25], ["penny", 0.75], ["quarter", 1], ["golf ball", 1.75], ["tennis ball", 2.5], ["baseball", 2.75], ["softball", 4], ["grapefruit", 4.5], ["Vivian, SD, 2010", 8]];
stcBox(10, 0.9, 1.4, stcMat(0x4A3A2A, "wood"), 24, 0.45, -38);
stcSolid(24, -38, 5, 0.7, 0, 1.8);
stcBox(10, 0.9, 1.4, stcMat(0xBFE0F0, null, { op: 0.22 }), 24, 1.35, -38);
var ice = stcMat(0xE8F0F8, null, { phong: 80 });
hail.forEach(function (h, i) { var r = h[1] * 0.0254 / 2 * 1.0; stcSph(Math.max(0.006, r), ice, 19.6 + i * 1.1, 0.92 + r, -38, null, 10); });
stcPlaque("hailcase", "HAIL, LIFE SIZE", "From a pea (1/4 inch) to the biggest ever measured in the US: 8 inches across, 1.94 pounds, Vivian, South Dakota, 23 July 2010. Hail grows as the updraft throws it up through the freezing cloud again and again; cut one open and you can count its layers.", 4, 2.2, 30.5, 1.9, -36.2, Math.PI);
stcSpot(24, -39.6, 3, "The hail case", "grow a hailstone", function () { stcTwo("🧊 The hail case", "Read how hail grows", function () { stcCard("🧊 Hail", "", [["How it grows", "Updrafts carry raindrops above the freezing level; they freeze and are thrown up again and again, gaining a layer each time, until they are too heavy to hold up."], ["Updraft needed", "About 100 mph to hold up a softball-sized stone"], ["Record (US)", "8 in across, 1.94 lb: Vivian, South Dakota, 23 July 2010"], ["Record (world, heaviest)", "2.25 lb: Gopalganj, Bangladesh, 14 April 1986"], ["Hail on radar", "usually 60 dBZ and up: purple and white"]]); }, "Grow a hailstone", "send it up the updraft", function () { stcHailGrow(); }); });
stcTable(30, -56, 4, 4, { h: 0.9 });
var g = stcGroup(30, 1, -56, 0);
STC.model = g;
var cm = stcMat(0xD8DCE2, null), dk = stcMat(0x7A808A, null);
var anv = stcCyl(1.8, 0.25, cm, 0.4, 2.2, 0, g, STC.lite ? 10 : 18, 0.8);
var tw = stcCyl(0.6, 1.8, cm, 0, 1.2, 0, g, STC.lite ? 8 : 14, 0.7);
var base = stcCyl(1.1, 0.22, dk, 0, 0.3, 0, g, STC.lite ? 10 : 18);
var wall = stcCyl(0.4, 0.18, dk, -0.2, 0.15, 0.2, g, 10);
var fun = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.28, 8), dk);
fun.rotation.x = Math.PI;
fun.position.set(-0.2, -0.02, 0.2);
g.add(fun);
STC.modelSpin = [tw, base, wall];
stcPlaque("supercell", "THE SUPERCELL", "1 Anvil (spreads out at the top of the troposphere)\n2 Overshooting top (the updraft punching through)\n3 Rotating updraft: the mesocyclone\n4 Rain-free base and the wall cloud\n5 The tornado, under the wall cloud\n6 Rain and hail core, to the north-east", 3.6, 3, 35.8, 2.2, -56, -Math.PI / 2);
stcSpot(30, -56, 3.4, "The supercell model", "point at its parts", function () { stcTwo("🌩️ The supercell model", "Read how a supercell works", function () { stcLessonCard("supercell"); }, "Point at its parts", "and test yourself", function () { stcModelTry(); }); });
stcPlaque("records", "RECORDS", "Deadliest US tornado: the Tri-State Tornado, 18 March 1925, Missouri, Illinois and Indiana. 695 people died; its path ran at least 174 miles.\nWidest: El Reno, Oklahoma, 31 May 2013: 2.6 miles wide.\nFastest wind measured: about 300 mph, by a truck-mounted radar, Bridge Creek-Moore, Oklahoma, 3 May 1999.\nMost in one outbreak: 360 tornadoes, 25-28 April 2011.", 4.6, 3.6, 13.4, 2.4, -43, Math.PI / 2);
stcSpot(14, -46, 2.6, "The records wall", "the records quiz", function () { stcTwo("🏆 The records wall", "Read about tornadoes", function () { stcLessonCard("tornado"); }, "The records quiz", "how much do you know?", stcRecordsTry); });
var orb = stcSph(0.5, stcMat(0x8A9AE8, null, { e: 0x4A5AC8, ei: 0.6, op: 0.7 }), 17, 1.6, -61, null, 16);
stcCyl(0.4, 1.1, stcMat(0x2A2A30, null), 17, 0.55, -61, null, 12);
stcRound(17, -61, 0.5, 0, 1.6);
stcPlaque("lightning", "LIGHTNING", "A flash heats the air to about 30,000 °C, five times hotter than the Sun's surface, and the air bursts outward: that is thunder. Count from the flash to the thunder, divide by five: miles away.\nWhen thunder roars, go indoors.", 3.4, 2.6, 13.4, 2.4, -60, Math.PI / 2);
stcSpot(16, -60, 2.6, "Lightning", "count the thunder", function () { stcTwo("⚡ Lightning", "Read about lightning and other storms", function () { stcLessonCard("others"); }, "Count the thunder", "the live lightning detector", stcTryLight); });
stcPlaque("radar-ex", "SEEING STORMS", "Green: light rain. Yellow and red: heavy rain. Purple and white: hail.\nOn velocity, green is moving towards the radar, red away; a green-red pair side by side is rotation.", 3.4, 2.6, 35.8, 2.4, -42, -Math.PI / 2);
stcSpot(34, -42, 2.4, "Seeing storms", "read the live radar", function () { stcTwo("📡 Seeing storms", "Read how radar works", function () { stcLessonCard("radar"); }, "Read the live radar", "find the hook and the couplet", function () { stcRadarCard(); }); });
stcDesk(30, -46, 0, { screen: stcScreenMat("course", function (c, W, H) { c.fillStyle = "#1E3A5A"; c.fillRect(0, 0, W, H); c.fillStyle = "#FFF"; c.font = "bold 20px system-ui"; c.textAlign = "center"; c.fillText("STORM SPOTTER", W / 2, 60); c.font = "14px system-ui"; c.fillText("7 lessons · 10 questions", W / 2, 95); c.fillText("press E", W / 2, 125); }) });
stcSpot(30, -45, 2.4, "The Storm Spotter course", "take the course", function () { stcCourse(); });
stcGuide("eli", 20, -48, -Math.PI / 2);
},
function () {
var wood = stcMat(0x6A5038, "wood"), mt = stcMat(0x8A9096, "metal", { phong: 50 }), dk = stcMat(0x2A2E34, "metal"), white = stcMat(0xE8E8E2, null), K = STCK;
var benches = [[16, -28.6, 0], [24, -28.6, 0], [32.6, -24, Math.PI / 2], [32.6, -16, Math.PI / 2], [32.6, -11, Math.PI / 2]];
benches.forEach(function (b) {
var g = stcGroup(b[0], 0, b[1], b[2]);
stcBox(3.6, 0.08, 1, wood, 0, 0.9, 0, g);
stcBox(3.6, 0.85, 0.06, dk, 0, 0.45, 0.45, g);
var c = Math.abs(Math.cos(b[2])), s = Math.abs(Math.sin(b[2]));
stcSolid(b[0], b[1], c * 1.8 + s * 0.5, s * 1.8 + c * 0.5, 0, 1);
});
stcGearGarage();
var at = [["anemo", 14.8, -28], ["baro", 17, -28], ["hygro", 18.6, -28], ["rain", 22.8, -28], ["sonde", 24.8, -28], ["probe", 32, -25], ["light", 32, -22.8], ["hail", 32, -16.5]];
at.forEach(function (a) { var it = STC_KIT.filter(function (k) { return k[0] === a[0]; })[0]; stcSpot(a[1], a[2], 1.3, it[1], "use it", function () { stcKitCard(a[0]); }); });
stcPlaque("garage-rules", "CHASE RULES", "1 Always keep an escape road open, to the side of the storm's path.\n2 Never drive into the rain and hail core: a tornado can hide in it.\n3 Never park under a power line or on the road.\n4 Watch the wall cloud; report what you see to the Weather Service.\n5 Safety first, pictures second.", 3.6, 3, 21, 2.4, -8.6, Math.PI);
var ct = stcCar("pickup", 4, -15, 0, { col: 0xE8E6E0, solid: 1, keep: true, light: 1 });
STC.truck = ct;
STC.truckHome = { x: 4, z: -15, ry: 0 };
if (ct)
stcGearRoof(ct);
var rt = stcCar("flatbed", 4, -30, 0, { col: 0xE8E6E0, solid: 1, keep: true, light: 1 });
if (rt)
stcGearDoppler(rt);
stcCar("suv", 27, -21, 0, { col: 0x2A4A6A, solid: 1, roof: 1 });
for (var ty = 0; ty < 4; ty++) {
var tyre = stcCyl(0.38, 0.26, stcMat(0x1A1A1A, null), 27.5, 0.13 + ty * 0.27, -10, null, 14);
}
stcRound(27.5, -10, 0.45, 0, 1.1);
STC.fy = 0;
stcShelf(23, -8.6, 5, Math.PI, [0xC83A3A, 0x2A2E34, 0xE8C040, 0x8A9096, 0x3A6AA8]);
stcShelf(13, -8.6, 4, Math.PI, [0x8A9096, 0xC86A2A, 0x2A2E34, 0xE8E0D0, 0x4A8A4A]);
stcPlaque("chase-map", "TODAY'S TARGET", "Storms fire on the dryline south-west of town by mid-afternoon. Best shear north of the warm front. Intercept from the south-east, escape east on the section roads. Hail to 3 in in the cores.", 3.6, 2.4, 29, 2.6, -29.55, 0, { bg: "#26303A", fg: "#E6E2D6", ac: "#B8462E" });
stcSpot(4, -15, 4, "The chase truck", "ride out with the chase team", function () { stcChaseStart(); });
stcSpot(4, -30, 4, "The mobile Doppler radar truck", "look at its radar", function () { stcRadarCard(); });
stcGuide("june", 8, -20, Math.PI / 2);
},
function (red) {
var x0 = 10, x1 = 34, z0 = 8, z1 = 32, conc = stcMat(0xA8A49A, "concrete");
stcBuilding({ x0: x0, z0: z0, x1: x1, z1: z1, h: 5, wall: red, roof: "flat", doors: [{ side: "w", at: 13, w: 4.6 }, { side: "w", at: 27, w: 1.6 }], name: "Stormhaven Fire Station", win: 5 });
STCK.floors = STCK.floors.filter(function (F) { return !(F.x0 === x0 && F.x1 === x1 && F.z0 === z0 && F.z1 === z1 && F.y === 0); });
stcFloor(x0, z0, x1, z1 - 6, 0);
stcFloor(x0, z1 - 6, x1 - 8, z1, 0);
stcRamp(x1 - 8, z1 - 6, x1 - 0.3, z1 - 0.3, "x", x1 - 8, 0, x1 - 1, -3);
var st = stcMat(0x6A6A6A, "concrete");
for (var s = 0; s < 8; s++) {
stcBox(0.9, 0.18, 5.6, st, x1 - 7.6 + s * 0.95, -0.38 * s - 0.1, z1 - 3.15);
}
stcBox(8, 1, 0.15, stcMat(0x3A3A3A, "metal"), x1 - 4, 0.5, z1 - 6.05);
stcSolid(x1 - 4, z1 - 6.05, 4, 0.1, 0, 1);
var by = -3;
stcBox(x1 - x0, 0.3, z1 - z0, conc, (x0 + x1) / 2, by - 0.15, (z0 + z1) / 2);
stcFloor(x0, z0, x1, z1 - 6.2, by);
stcFloor(x0, z1 - 6.2, x1 - 8, z1, by);
STCK.solids.push({ x: (x0 + x1) / 2, z: z0 + 0.15, hw: (x1 - x0) / 2, hd: 0.15, b: by, h: 3 });
STCK.solids.push({ x: (x0 + x1) / 2, z: z1 - 0.15, hw: (x1 - x0) / 2, hd: 0.15, b: by, h: 3 });
STCK.solids.push({ x: x0 + 0.15, z: (z0 + z1) / 2, hw: 0.15, hd: (z1 - z0) / 2, b: by, h: 3 });
STCK.solids.push({ x: x1 - 0.15, z: (z0 + z1) / 2, hw: 0.15, hd: (z1 - z0) / 2, b: by, h: 3 });
[[x0, 0], [x1, 0]].forEach(function () { });
stcBox(x1 - x0, 3, 0.3, conc, (x0 + x1) / 2, by + 1.5, z0 + 0.15);
stcBox(0.3, 3, z1 - z0, conc, x0 + 0.15, by + 1.5, (z0 + z1) / 2);
stcBox(0.3, 3, z1 - z0, conc, x1 - 0.15, by + 1.5, (z0 + z1) / 2);
stcBox(x1 - x0 - 8, 3, 0.3, conc, (x0 + x1 - 8) / 2, by + 1.5, z1 - 0.15);
STCK.rooms.push({ x0: x0, z0: z0, x1: x1, z1: z1, y: by, h: 3, name: "The town storm shelter" });
STC.fy = by;
for (var b = 0; b < 4; b++) {
stcBench(14 + b * 5, 10, 4, 0);
stcBench(14 + b * 5, 20, 4, Math.PI);
}
stcShelf(32.8, 14, 4, -Math.PI / 2, [0x3A6AA8, 0xE8E0D0, 0xC83A3A, 0xE8C040, 0x4A8A4A]);
STC.fy = 0;
stcLamp(22, by + 2.6, 16, 0xFFF0D0, 4);
stcLamp(16, by + 2.6, 22, 0xFFF0D0, 3);
stcPlaque("shelter", "IN A TORNADO WARNING", "Come straight down. Sit low, face the wall, cover your head and neck with your arms.\nWater, torches, a first-aid kit and a weather radio are on the shelf.\nStay until the warden says the warning has ended.", 4, 2.6, 22, by + 1.6, 8.5, 0);
stcSpot(22, 16, 4, "The shelter", "do the shelter drill", function () { stcTwo("🌪️ The shelter", "Read the shelter rules", function () { stcLessonCard("safety"); }, "Do the shelter drill", "in the right order", function () { stcDrillTry(); }); }, { y: by });
stcCar("box", 17, 13, Math.PI / 2, { col: 0xB8221E, solid: 1, light: 1 });
stcCyl(0.18, 14, stcMat(0x8A8E94, "metal"), 6, 7, 30, null, 8);
stcRound(6, 30, 0.25, 0, 14);
var sir = stcGroup(6, 14, 30, 0);
stcCyl(0.5, 0.6, stcMat(0xD8D8D0, "metal", { phong: 40 }), 0, 0, 0, sir, 12);
for (var h = 0; h < 4; h++) {
var horn = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.12, 0.8, 10, 1, true), stcMat(0xD8D8D0, "metal", { ds: true }));
horn.rotation.z = Math.PI / 2;
horn.position.set(0.6, 0, 0);
var hg = stcGroup(0, 0, 0, h * Math.PI / 2, sir);
hg.add(horn);
}
STC.siren = sir;
stcSpot(8, 28, 3, "The warning siren", "ask about the sirens", function () { stcCard("🚨 Outdoor warning sirens", "Stormhaven Fire Department", [["What it means", "A tornado warning, or a storm with winds over 70 mph, for this town"], ["Tests", "Wednesdays at noon, for three minutes"], ["Indoors?", "Sirens are for people OUTDOORS. Indoors, get warnings from a weather radio, a phone alert, TV or radio."], ["When you hear it", "Go inside to the lowest floor, an inner room with no windows, or a storm shelter. Don't go out to look."]]); });
stcGuide("hank", 22, 24, Math.PI);
},
function (conc, tan) {
var ex = 62;
for (var i = 0; i < 4; i++) {
var z = 60 + i * 9;
stcCyl(4.4, 34, conc, ex + 6, 17, z, null, STC.lite ? 12 : 22);
stcRound(ex + 6, z, 4.6, 0, 34);
}
stcBox(8, 10, 36, conc, ex + 6, 39, 73.5);
stcSign(["STORMHAVEN CO-OP"], 18, 3, "#E8E4DA", "#1E3A6A", ex + 1.5, 30, 73.5, -Math.PI / 2);
stcBuilding({ x0: 46, z0: 52, x1: 58, z1: 64, h: 3.4, wall: tan, roof: "gable", doors: [{ side: "w", at: 58, w: 1.2 }], name: "The grain elevator office", win: 3.5 });
stcTable(52, 60, 2, 1);
stcPlaque("grain", "TODAY AT THE CO-OP", "Wheat, Kansas hard red winter.\nA hailstorm in June can flatten a field of wheat in ten minutes: farmers here insure against hail, and watch the radar as closely as the chasers do.", 3, 2.2, 52, 1.8, 52.4, 0);
var tie = stcMat(0x4A3A2A, "wood"), rail = stcMat(0x5A5A5E, "metal", { phong: 60 });
stcBox(0.12, 0.15, 3200, rail, 40 - 0.72, 0.2, 0);
stcBox(0.12, 0.15, 3200, rail, 40 + 0.72, 0.2, 0);
var tg = new THREE.BoxGeometry(2.6, 0.15, 0.25), n = STC.lite ? 400 : 1060, im = new THREE.InstancedMesh(tg, tie, n), Mx = new THREE.Matrix4();
for (var t = 0; t < n; t++) {
Mx.makeTranslation(40, 0.08, -1590 + t * (3180 / n));
im.setMatrixAt(t, Mx);
}
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
STCK.F.add(im);
},
function () {
var fx = 300, fz = 250, white = stcMat(0xD8D4CA, "siding"), barnR = stcMat(0x8A2A22, "wood");
stcBuilding({ x0: fx - 8, z0: fz - 6, x1: fx + 8, z1: fz + 6, h: 3.4, wall: white, roof: "gable", doors: [{ side: "n", at: fx, w: 1.2 }], name: "The Okafor farmhouse", win: 3.5 });
stcAwning(fx, fz - 6, 10, 2, "n", 2.8, stcMat(0x4A4A4A, "shingle"));
stcTable(fx - 3, fz, 1.8, 1);
stcBed(fx + 5, fz + 3, 0);
stcShelf(fx - 7, fz + 3, 3, Math.PI / 2);
stcBuilding({ x0: fx + 20, z0: fz - 12, x1: fx + 36, z1: fz + 12, h: 6.5, wall: barnR, roof: "gable", doors: [{ side: "n", at: fx + 28, w: 5 }, { side: "s", at: fx + 28, w: 5 }], name: "The Okafor barn", win: 8, roofMat: stcMat(0x5A5E64, "metalroof") });
for (var h = 0; h < 6; h++) {
stcBox(1.2, 0.8, 0.6, stcMat(0xC8A850, "thatch"), fx + 22 + (h % 2) * 1.3, 0.4 + Math.floor(h / 2) * 0.8, fz + 9);
}
stcSolid(fx + 22.6, fz + 9, 1.3, 0.4, 0, 2.4);
stcCar("tractor", fx + 31, fz - 4, 0, { solid: 1 });
var cx = fx - 14, cz = fz + 2;
var dm = stcMat(0x5A4A3A, "wood");
var d1 = stcBox(1.4, 0.08, 2.4, dm, cx - 0.72, 0.45, cz);
d1.rotation.z = 0.35;
var d2 = stcBox(1.4, 0.08, 2.4, dm, cx - 2.5, 1.3, cz);
d2.rotation.z = -1.2;
stcBox(3.4, 0.6, 0.3, stcMat(0x8A8680, "concrete"), cx, 0.3, cz - 1.4);
stcBox(3.4, 0.6, 0.3, stcMat(0x8A8680, "concrete"), cx, 0.3, cz + 1.4);
stcSolid(cx, cz - 1.4, 1.7, 0.15, 0, 0.6);
stcSolid(cx, cz + 1.4, 1.7, 0.15, 0, 0.6);
stcRamp(cx - 1.4, cz - 1.2, cx + 1.6, cz + 1.2, "x", cx - 1.4, 0, cx + 1.6, -2.4);
var cy = -2.4, c0 = cx + 1.6, conc = stcMat(0x7A7670, "concrete");
stcBox(5, 0.2, 4, conc, c0 + 2.5, cy - 0.1, cz);
stcFloor(c0, cz - 2, c0 + 5, cz + 2, cy);
stcBox(5, 2.4, 0.2, conc, c0 + 2.5, cy + 1.2, cz - 2);
stcBox(5, 2.4, 0.2, conc, c0 + 2.5, cy + 1.2, cz + 2);
stcBox(0.2, 2.4, 4, conc, c0 + 5, cy + 1.2, cz);
STCK.solids.push({ x: c0 + 2.5, z: cz - 2, hw: 2.5, hd: 0.12, b: cy, h: 2.4 }, { x: c0 + 2.5, z: cz + 2, hw: 2.5, hd: 0.12, b: cy, h: 2.4 }, { x: c0 + 5, z: cz, hw: 0.12, hd: 2, b: cy, h: 2.4 });
STCK.solids.push({ x: cx + 0.1, z: cz - 1.25, hw: 1.5, hd: 0.1, b: cy, h: 2.4 }, { x: cx + 0.1, z: cz + 1.25, hw: 1.5, hd: 0.1, b: cy, h: 2.4 });
stcBox(5, 0.2, 4, stcMat(0x6E7A3A, null), c0 + 2.5, -0.1, cz);
STC.fy = cy;
stcBench(c0 + 2.5, cz - 1.4, 3, 0);
stcShelf(c0 + 4.6, cz + 0.6, 1.6, -Math.PI / 2);
STC.fy = 0;
stcLamp(c0 + 2.5, cy + 2, cz, 0xFFE0A8, 2.2);
STCK.rooms.push({ x0: c0, z0: cz - 2, x1: c0 + 5, z1: cz + 2, y: cy, h: 2.4, name: "The Okafor storm cellar" });
stcSpot(cx - 2, cz, 2.4, "The storm cellar", "go down", function () { var P = camera.position; P.set(STC.base + c0 + 2, cy + 1.72, cz); stcSay("🌪️ <b>The storm cellar.</b> Damp concrete, a bench, water and a lamp. Farm families on the Plains have dug these since the 1800s: underground is the safest place in a tornado."); });
var nc = STC.lite ? 3 : 6;
for (var c = 0; c < nc; c++) {
var a = c * 0.7, r = 40 + c * 6, x = fx - 60 + Math.cos(a) * r * 0.6, z = fz - 70 + Math.sin(a) * r * 0.4;
var g = stcKit("cow", x, z, a, 1.3, { keep: true });
if (g)
STC.beasts.push({ g: g, hx: x, hz: z, tx: x, tz: z, wait: Math.random() * 8, sp: 0.5, r: 18 });
}
var wm = stcKit("windmill", fx - 40, fz - 30, 0, 1.4, { solid: 2 });
stcCyl(3, 1.2, stcMat(0x8A8E94, "metal"), fx - 34, 0.6, fz - 30, null, 16);
stcRound(fx - 34, fz - 30, 3.1, 0, 1.2);
var post = stcMat(0x7A6A55, "wood");
for (var p = 0; p < 40; p++) {
var aa = p / 40 * Math.PI * 2;
stcCyl(0.08, 1.3, post, fx - 60 + Math.cos(aa) * 55, 0.65, fz - 70 + Math.sin(aa) * 40, null, 5);
}
stcGuide("dale", fx - 4, fz - 9, Math.PI);
},
function () {
var mt = stcMat(0x9AA0A6, "metal", { phong: 40 }), wh = stcMat(0xE8E8E2, null), conc = stcMat(0xA8A49A, "concrete");
stcBox(16, 0.2, 16, conc, 90, 0.1, -150);
stcFloor(82, -158, 98, -142, 0.2);
stcBuilding({ x0: 100, z0: -158, x1: 108, z1: -150, h: 3, wall: stcMat(0xE8E4DA, "siding"), roof: "flat", doors: [{ side: "w", at: -154, w: 1.2 }], name: "The balloon shed", win: 10 });
for (var t = 0; t < 4; t++) {
stcCyl(0.22, 1.5, stcMat(0x3A6A3A, "metal", { phong: 40 }), 106.5, 0.75, -157 + t * 0.6, null, 10);
}
stcSolid(106.5, -155.5, 0.3, 1.2, 0, 1.5);
stcPlaque("balloon-pad", "LAUNCH PAD", "Every day at 00 and 12 UTC, about 900 stations round the world let a balloon go at the same moment. Its radiosonde radios temperature, humidity and pressure all the way up; GPS gives the wind. Forecasters use them to see if storms can grow.", 3, 2, 90, 1.4, -158.4, 0);
STC.balloon = null;
stcSpot(90, -150, 4, "The launch pad", "launch a weather balloon", function () { stcBalloonLaunch(); });
var mx = 130, mz = -110;
for (var i = 0; i < 3; i++) {
var a = i * 2.094;
stcCyl(0.05, 10, mt, mx + Math.cos(a) * 0.4, 5, mz + Math.sin(a) * 0.4, null, 5);
}
for (var r = 1; r < 10; r++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 4, 12), mt);
ring.rotation.x = Math.PI / 2;
ring.position.set(mx, r, mz);
STCK.F.add(ring);
}
stcRound(mx, mz, 0.6, 0, 10);
stcGearMast(mx, mz);
stcSpot(mx + 2, mz + 2, 4, "The weather station", "read the live instruments", function () { stcHtml("🌡️ The weather station", "Use each instrument", "", [["Read them all", "", stcStationCard], ["🌬️ Anemometer", "", stcTryAnemo], ["🧭 Barometer", "", stcTryBaro], ["💧 Psychrometer", "", stcTryHygro], ["🌧️ Rain gauge", "", stcTryRain], ["⚡ Lightning detector", "", stcTryLight]]); });
STC.blades = [];
var nt = STC.lite ? 5 : 10;
for (var w = 0; w < nt; w++) {
var tx = -1000, tz = -1100 + w * (2200 / (nt - 1));
stcCyl(1.4, 80, wh, tx, 40, tz, null, STC.lite ? 8 : 14, 0.9);
stcRound(tx, tz, 1.5, 0, 80);
var hub = stcGroup(tx + 1.6, 80, tz, 0);
stcBox(5, 2.4, 2.4, wh, -1.5, 0, 0, hub);
var rot = stcGroup(1.2, 0, 0, 0, hub);
STC.blades.push(rot);
for (var b = 0; b < 3; b++) {
var bg = stcGroup(0, 0, 0, 0, rot);
bg.rotation.x = b * 2.094;
stcBox(0.3, 40, 1.6, wh, 0, 20, 0, bg);
}
}
var lw = new THREE.Mesh(new THREE.CircleGeometry(180, STC.lite ? 24 : 48), stcMat(0x3A5A62, null, { phong: 80 }));
lw.rotation.x = -Math.PI / 2;
lw.position.set(-520, 0.06, 420);
STCK.F.add(lw);
STC.lake = lw;
stcWater(-520, 420, 172);
stcBox(3, 0.3, 40, stcMat(0x7A6A55, "wood"), -372, 0.4, 390);
stcFloor(-373.5, 370, -370.5, 410, 0.4);
STCK.water[STCK.water.length - 1].not = [[-374, 368, -370, 412]];
stcPlaque("lake", "WATERSPOUTS", "A waterspout is a tornado over water. Most are 'fair-weather' spouts that grow up from the water under building clouds and are weak; 'tornadic' spouts come down from a storm like any tornado. Never go out on the water when you see one.", 3, 2, -366, 1.4, 370, Math.PI / 2);
stcSpot(-370, 372, 3, "The lake dock", "read about waterspouts", function () { stcLessonCard("others"); });
stcSurvey();
},
function () {
var r = stcRnd(99), white = stcMat(0xD8D4CA, "siding"), sh = stcMat(0x5A4A40, "shingle"), wood = stcMat(0x8A7050, "wood"), conc = stcMat(0xA8A49A, "concrete"), bark = stcMat(0x8A7A60, "bark");
var path = [[380, -330], [480, -360], [580, -390], [680, -420], [780, -450], [880, -480]];
var scar = stcCanvasMat("scar", 256, 256, function (c, W, H) { c.fillStyle = "#7A6A48"; c.fillRect(0, 0, W, H); var q = stcRnd(5); for (var i = 0; i < 3000; i++) {
c.fillStyle = q() < 0.5 ? "#6A5A3A" : "#8A7A58";
c.save();
c.translate(q() * W, q() * H);
c.rotate(0.6);
c.fillRect(0, 0, 6, 1);
c.restore();
} }, { rep: [20, 2] });
var sc = stcFlat(560, 60, scar, 630, 0.035, -405);
sc.rotation.z = -0.29;
STC_DAMAGE.forEach(function (d, i) {
var p = path[i], x = p[0], z = p[1], g = stcGroup(x, 0, z, 0);
stcBox(10, 0.3, 8, conc, 0, 0.15, 0, g);
stcFloor(x - 5, z - 4, x + 5, z + 4, 0.3);
var lv = d[2];
if (lv <= 3) {
var hw = lv === 3 ? 1.2 : lv === 2 ? 2.8 : lv === 1 ? 2.4 : 2.8;
if (lv === 1) {
var mh = stcBox(12, 2.4, 3.6, stcMat(0xC8C8C0, "metal"), 0, 2, 0, g);
mh.rotation.z = 1.4;
mh.position.set(0, 1.8, 0);
stcSolid(x, z, 6, 1.8, 0, 2.6);
}
else {
[[0, -3.8, 9.6, 0.2], [0, 3.8, 9.6, 0.2], [-4.8, 0, 0.2, 7.6], [4.8, 0, 0.2, 7.6]].forEach(function (w, k) { var hh = lv === 3 ? (k % 2 ? 0.8 : 1.6) : hw; var m = stcBox(w[2], hh, w[3], white, w[0], 0.3 + hh / 2, w[1], g); stcSolid(x + w[0], z + w[1], w[2] / 2, w[3] / 2, 0.3, hh); });
if (lv === 0) {
var rf1 = stcBox(10.4, 0.15, 4.6, sh, 0, 3.9, -2, g);
rf1.rotation.x = -0.5;
var rf2 = stcBox(10.4, 0.15, 4.6, sh, 0, 3.9, 2, g);
rf2.rotation.x = 0.5;
for (var k = 0; k < 14; k++) {
stcBox(0.5, 0.03, 0.35, sh, (r() - 0.5) * 20, 0.05, (r() - 0.5) * 20, g);
}
stcBox(2, 0.15, 4.6, stcMat(0x6A5A4A, "wood"), 2, 4.1, -2.6, g).rotation.x = -0.5;
}
if (lv >= 2) {
for (var k2 = 0; k2 < 10; k2++) {
var pl = stcBox(0.15, 0.1, 3 + r() * 2, wood, (r() - 0.5) * 24, 0.1, (r() - 0.5) * 24, g);
pl.rotation.y = r() * 3;
}
}
}
}
else {
if (lv === 4)
for (var k3 = 0; k3 < 30; k3++) {
var pc = stcBox(0.2 + r() * 0.4, 0.1 + r() * 0.4, 1 + r() * 3, k3 % 3 ? wood : white, (r() - 0.5) * 8, 0.4 + r() * 0.6, (r() - 0.5) * 6, g);
pc.rotation.set(r(), r() * 3, r());
}
else {
for (var k4 = 0; k4 < 16; k4++) {
stcCyl(0.02, 0.18, stcMat(0x5A5A5A, "metal"), -4.6 + (k4 % 8) * 1.3, 0.38, k4 < 8 ? -3.6 : 3.6, g, 5).rotation.z = 0.5;
}
}
stcSolid(x, z, lv === 4 ? 4 : 0.1, lv === 4 ? 3 : 0.1, 0.3, 1);
}
for (var t = 0; t < 3; t++) {
var tx = (t - 1) * 8, tz = 10;
if (lv >= 3) {
var tr = stcCyl(0.25, lv >= 4 ? 2.5 : 4, bark, tx, (lv >= 4 ? 1.25 : 2), tz, g, 7);
}
else
stcTree(x + tx, z + tz, 0.9, 1);
stcRound(x + tx, z + tz, 0.35, 0, 3);
}
stcSpot(x, z - 6, 5, "Damage point " + (i + 1), "rate the damage", function () { stcRate(i); });
});
stcPlaque("survey", "DAMAGE SURVEY", "Last spring a tornado crossed here, west to east. Walk the path and rate what it did at each point on the EF scale. Real survey teams do exactly this, often within a day, to find each tornado's rating, length and width.", 3.4, 2.4, 355, 1.6, -336, Math.PI / 2);
},
function (key, col, dark, tilt) {
var k = "tex|" + key;
if (STC.mats[k])
return STC.mats[k];
var W = 128, H = 256, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var c = cv.getContext("2d"), r = stcRnd(key.length * 91 + 7);
c.fillStyle = col;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 140; i++) {
var x = r() * W, w = 1 + r() * 6, a = 0.08 + r() * 0.25;
c.strokeStyle = r() < 0.5 ? "rgba(" + dark + "," + a + ")" : "rgba(255,255,255," + (a * 0.6) + ")";
c.lineWidth = w;
c.beginPath();
c.moveTo(x, 0);
c.lineTo(x + (tilt || 40), H);
c.stroke();
c.beginPath();
c.moveTo(x - W, 0);
c.lineTo(x - W + (tilt || 40), H);
c.stroke();
}
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
STC.mats[k] = t;
return t;
},
function (key, base, spots) {
var k = "tex|" + key;
if (STC.mats[k])
return STC.mats[k];
var N = STC.lite ? 128 : 256, cv = document.createElement("canvas");
cv.width = cv.height = N;
var c = cv.getContext("2d"), r = stcRnd(key.length * 13 + 3);
c.fillStyle = base;
c.fillRect(0, 0, N, N);
for (var i = 0; i < (STC.lite ? 120 : 260); i++) {
var x = r() * N, y = r() * N, rr = 6 + r() * N * 0.16, g = c.createRadialGradient(x, y, 0, x, y, rr), d = r() < 0.55;
g.addColorStop(0, d ? "rgba(20,24,30," + (0.18 * spots) + ")" : "rgba(200,206,214," + (0.14 * spots) + ")");
g.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = g;
for (var ox = -1; ox <= 1; ox++)
for (var oy = -1; oy <= 1; oy++) {
c.beginPath();
c.arc(x + ox * N, y + oy * N, rr, 0, 7);
c.fill();
}
}
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
STC.mats[k] = t;
return t;
},
function (key, rgb, fadeTop, fadeBottom, contrast) {
var k = "tex|" + key;
if (STC.mats[k])
return STC.mats[k];
var W = 256, H = 256, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var c = cv.getContext("2d"), r = stcRnd(key.length * 53 + 5);
c.fillStyle = "rgb(" + rgb.join(",") + ")";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 90; i++) {
var x = r() * W, w = 4 + r() * 18, light = r() < 0.5, a = (0.05 + r() * 0.12) * (contrast || 1);
c.strokeStyle = light ? "rgba(235,232,226," + a + ")" : "rgba(30,26,22," + a + ")";
c.lineWidth = w;
for (var o = -1; o <= 1; o++) {
c.beginPath();
c.moveTo(x + o * W, 0);
c.bezierCurveTo(x + o * W + 30, H * 0.3, x + o * W + 60, H * 0.7, x + o * W + 110, H);
c.stroke();
}
}
c.globalCompositeOperation = "destination-in";
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(0,0,0,0)");
g.addColorStop(fadeTop || 0.12, "rgba(0,0,0,1)");
g.addColorStop(fadeBottom ? 1 - fadeBottom : 1, "rgba(0,0,0,1)");
g.addColorStop(1, fadeBottom ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.globalCompositeOperation = "source-over";
var t = new THREE.CanvasTexture(cv);
t.wrapS = THREE.RepeatWrapping;
t.wrapT = THREE.ClampToEdgeWrapping;
STC.mats[k] = t;
return t;
},
function (key, top, bot) {
var k = "tex|" + key;
if (STC.mats[k])
return STC.mats[k];
var N = STC.lite ? 64 : 128, cv = document.createElement("canvas");
cv.width = cv.height = N;
var c = cv.getContext("2d"), r = stcRnd(key.length * 7 + 1);
for (var i = 0; i < 26; i++) {
var a = r() * 6.283, d = r() * N * 0.24, x = N / 2 + Math.cos(a) * d, y = N / 2 + Math.sin(a) * d * 0.8, rr = N * (0.12 + r() * 0.16);
var g = c.createRadialGradient(x, y, 0, x, y, rr), col = y > N / 2 ? bot : top;
g.addColorStop(0, "rgba(" + col + ",0.55)");
g.addColorStop(1, "rgba(" + col + ",0)");
c.fillStyle = g;
c.beginPath();
c.arc(x, y, rr, 0, 7);
c.fill();
}
var t = new THREE.CanvasTexture(cv);
STC.mats[k] = t;
return t;
},
function (key, rgb) {
var k = "tex|" + key;
if (STC.mats[k])
return STC.mats[k];
var N = STC.lite ? 128 : 256, cv = document.createElement("canvas");
cv.width = cv.height = N;
var c = cv.getContext("2d"), r = stcRnd(9);
var g = c.createRadialGradient(N / 2, N / 2, 0, N / 2, N / 2, N / 2);
g.addColorStop(0, "rgba(" + rgb + ",0.95)");
g.addColorStop(0.6, "rgba(" + rgb + ",0.8)");
g.addColorStop(1, "rgba(" + rgb + ",0)");
c.fillStyle = g;
c.fillRect(0, 0, N, N);
for (var i = 0; i < 120; i++) {
var x = r() * N, y = r() * N, rr = 4 + r() * N * 0.08, gg = c.createRadialGradient(x, y, 0, x, y, rr);
gg.addColorStop(0, "rgba(10,12,16,0.18)");
gg.addColorStop(1, "rgba(10,12,16,0)");
c.fillStyle = gg;
c.beginPath();
c.arc(x, y, rr, 0, 7);
c.fill();
}
c.globalCompositeOperation = "destination-in";
c.fillStyle = g;
c.fillRect(0, 0, N, N);
var t = new THREE.CanvasTexture(cv);
STC.mats[k] = t;
return t;
},
function (key, rgb) {
var k = "tex|" + key;
if (STC.mats[k])
return STC.mats[k];
var W = STC.lite ? 64 : 128, H = STC.lite ? 128 : 256, cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var c = cv.getContext("2d"), r = stcRnd(key.length * 3 + 2);
c.fillStyle = "rgba(" + rgb + ",0.6)";
c.fillRect(0, 0, W, H);
for (var i = 0; i < W * 1.5; i++) {
var x = r() * W;
c.strokeStyle = "rgba(" + (r() < 0.5 ? "20,26,34" : "200,206,214") + "," + (0.06 + r() * 0.14) + ")";
c.lineWidth = 1 + r() * 3;
c.beginPath();
c.moveTo(x, 0);
c.lineTo(x + W * 0.08, H);
c.stroke();
}
c.globalCompositeOperation = "destination-in";
var gx = c.createLinearGradient(0, 0, W, 0);
gx.addColorStop(0, "rgba(0,0,0,0)");
gx.addColorStop(0.3, "rgba(0,0,0,1)");
gx.addColorStop(0.7, "rgba(0,0,0,1)");
gx.addColorStop(1, "rgba(0,0,0,0)");
c.fillStyle = gx;
c.fillRect(0, 0, W, H);
var gy = c.createLinearGradient(0, 0, 0, H);
gy.addColorStop(0, "rgba(0,0,0,0.2)");
gy.addColorStop(0.25, "rgba(0,0,0,1)");
gy.addColorStop(1, "rgba(0,0,0,1)");
c.fillStyle = gy;
c.fillRect(0, 0, W, H);
var t = new THREE.CanvasTexture(cv);
STC.mats[k] = t;
return t;
},
function () {
var k = "tex|dot";
if (STC.mats[k])
return STC.mats[k];
if (typeof softGlow === "function") {
var s = softGlow();
if (s)
return s;
}
var cv = document.createElement("canvas");
cv.width = cv.height = 32;
var c = cv.getContext("2d"), g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(1, "rgba(255,255,255,0)");
c.fillStyle = g;
c.fillRect(0, 0, 32, 32);
return (STC.mats[k] = new THREE.CanvasTexture(cv));
},
function (G) {
var tex = stcCloudTex("deck", "#4A525C", 1.4);
tex.repeat.set(6, 6);
var m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92, depthWrite: false, side: THREE.DoubleSide, fog: false });
var d = new THREE.Mesh(new THREE.PlaneGeometry(7000, 7000), m);
d.rotation.x = Math.PI / 2;
d.position.y = STC_H + 180;
d.userData.keep = 1;
d.renderOrder = -1;
G.add(d);
STC_SKY.deck = d;
var pt = stcPuffTex("farpuff", "200,206,214", "130,138,148"), nT = STC.lite ? 5 : 10;
for (var i = 0; i < nT; i++) {
var a = i / nT * Math.PI * 2 + 0.3, R = 2900, cx = Math.cos(a) * R, cz = Math.sin(a) * R;
for (var j = 0; j < (STC.lite ? 3 : 6); j++) {
var p = stcPuff(G, pt, cx + (j % 2 ? 1 : -1) * j * 60, 180 + j * 220, cz, 900 - j * 70, 620, 0.75);
p.userData.keep = 1;
}
}
var n = STC.lite ? 180 : 520, pos = new Float32Array(n * 3), r = stcRnd(4);
for (var k = 0; k < n; k++) {
pos[k * 3] = (r() - 0.5) * 60;
pos[k * 3 + 1] = r() * 30;
pos[k * 3 + 2] = (r() - 0.5) * 60;
}
var fg = new THREE.BufferGeometry();
fg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var fm = new THREE.PointsMaterial({ color: 0xB8C4D0, size: 0.12, transparent: true, opacity: 0.0, depthWrite: false, map: stcDotTex() });
var fp = new THREE.Points(fg, fm);
fp.frustumCulled = false;
fp.userData.keep = 1;
G.add(fp);
STC_SKY.fall = { p: fp, n: n, kind: "", amt: 0 };
},
function (G, i) {
var S = { i: i, g: new THREE.Group(), t: 0, ef: 2, stage: "gone", wait: 6 + i * 25, x: 0, z: 0, hx: 1, hz: 0, sp: 9, life: 120, amp: 0 };
S.g.userData.keep = 1;
S.g.visible = false;
G.add(S.g);
var lite = STC.lite, rad = lite ? 14 : 24, hs = lite ? 10 : 22;
var tOut = stcFunnelTex("funnel-out", [112, 114, 116], 0.22, 0.05, 0.45), tIn = stcFunnelTex("funnel-in", [70, 70, 72], 0.3, 0.04, 0.35);
tOut.repeat.set(2, 1);
tIn.repeat.set(3, 1);
var mo = new THREE.MeshLambertMaterial({ map: tOut, transparent: true, opacity: lite ? 0.92 : 0.7, depthWrite: false, side: THREE.DoubleSide });
var mi = new THREE.MeshLambertMaterial({ map: tIn, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide });
S.out = stcFunnelMesh(rad, hs, mo);
S.inn = lite ? null : stcFunnelMesh(rad, hs, mi);
S.g.add(S.out);
if (S.inn)
S.g.add(S.inn);
var dpt = stcPuffTex("dustpuff", "140,118,90", "96,80,62");
S.skirt = new THREE.Group();
S.g.add(S.skirt);
S.skirtP = [];
for (var sp = 0; sp < (lite ? 6 : 14); sp++) {
var pu = stcPuff(S.skirt, dpt, 0, 0, 0, 1, 1, 0.8);
S.skirtP.push({ s: pu, a: sp / (lite ? 6 : 14) * 6.283, r: 0.5 + (sp % 3) * 0.35, h: 0.15 + (sp % 4) * 0.22, k: 0.8 + (sp % 5) * 0.25 });
}
var n = lite ? 90 : 300, pos = new Float32Array(n * 3), seed = [], r = stcRnd(17 + i);
for (var k = 0; k < n; k++) {
seed.push([r() * 6.283, 0.6 + r() * 1.8, r(), 0.6 + r() * 0.8]);
}
var dg = new THREE.BufferGeometry();
dg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
S.dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0x6A5A46, size: lite ? 9 : 7, transparent: true, opacity: 0.6, depthWrite: false, map: stcDotTex() }));
S.dust.frustumCulled = false;
S.dustSeed = seed;
S.g.add(S.dust);
var nc = lite ? 14 : 44, cg = new THREE.BoxGeometry(1, 0.15, 0.5);
S.chunks = new THREE.InstancedMesh(cg, stcMat(0x5A4A3A, "wood"), nc);
S.chunkSeed = [];
for (var c = 0; c < nc; c++)
S.chunkSeed.push([r() * 6.283, 1.1 + r() * 1.4, r(), 0.5 + r() * 1.2, r() * 6]);
S.chunks.frustumCulled = false;
S.g.add(S.chunks);
var wpt = stcPuffTex("wallpuff", "82,88,96", "46,50,58");
S.wall = new THREE.Group();
S.g.add(S.wall);
for (var w = 0; w < (lite ? 8 : 18); w++) {
var wa = w / (lite ? 8 : 18) * 6.283;
stcPuff(S.wall, wpt, Math.cos(wa), -0.15 - (w % 3) * 0.12, Math.sin(wa), 1, 1, 0.95).userData.wa = wa;
}
stcPuff(S.wall, wpt, 0, -0.1, 0, 1, 1, 0.95).userData.wa = -1;
S.base = new THREE.Mesh(new THREE.CircleGeometry(1300, lite ? 20 : 40), new THREE.MeshBasicMaterial({ map: stcDiscTex("base", "38,42,50"), transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false }));
S.base.rotation.x = Math.PI / 2;
S.base.position.y = STC_H + 20;
S.g.add(S.base);
var rt = stcShaftTex("rain", "96,106,118");
S.curtain = new THREE.Group();
S.curtain.position.set(330, 0, -260);
S.g.add(S.curtain);
for (var cs = 0; cs < (lite ? 4 : 9); cs++) {
var ca = cs * 2.4, cd = (cs % 3) * 110;
stcPuff(S.curtain, rt, Math.cos(ca) * cd, STC_H / 2 - 10, Math.sin(ca) * cd, 260 + (cs % 2) * 120, STC_H + 20, 0.55);
}
var pt = stcPuffTex("puff", "196,202,210", "120,128,138"), up = new THREE.Group();
S.updraft = up;
S.g.add(up);
var pr = stcRnd(61 + i);
var np = lite ? 7 : 16;
for (var u = 0; u < np; u++) {
var f = u / np, h = STC_H + 120 + f * 1300, rr = (1 - f) * 120 + 40;
stcPuff(up, pt, 120 + (pr() - 0.5) * rr * 2, h, -100 + (pr() - 0.5) * rr * 2, 700 - f * 200, 560, 0.85);
}
var na = lite ? 6 : 14;
for (var a2 = 0; a2 < na; a2++) {
var ang = pr() * 6.283, dd = pr() * 1100;
stcPuff(up, pt, 500 + Math.cos(ang) * dd * 1.3, 1650 + pr() * 150, -450 + Math.sin(ang) * dd, 900, 300, 0.8);
}
S.anvil = null;
return S;
},
function (S) {
var C = stcCfg(), r = Math.random, top = C.ef;
S.ef = Math.max(0, Math.min(5, top - (r() < 0.45 ? 0 : r() < 0.7 ? 1 : 2)));
var hd = Math.PI / 4 + (r() - 0.5) * 0.6;
S.hx = Math.sin(hd);
S.hz = -Math.cos(hd);
var off = (r() < 0.5 ? -1 : 1) * (340 + r() * 560) + (S.i === 1 ? -200 : 0);
var px = -S.hz, pz = S.hx;
S.x = px * off - S.hx * 1250;
S.z = pz * off - S.hz * 1250;
S.sp = 7 + r() * 5;
S.t = 0;
S.life = 2500 / S.sp;
S.stage = "forming";
S.amp = 0;
S.rB = [14, 22, 38, 60, 95, 140][S.ef];
S.g.visible = true;
S.probe = null;
},
function (M, S, rB, rT, lean, sway, t, rmul) {
if (!M)
return;
var pos = M.geometry.attributes.position, b = M.userData.base, H = STC_H - 20;
for (var i = 0; i < pos.count; i++) {
var bx = b[i * 3], by = b[i * 3 + 1], bz = b[i * 3 + 2], v = by;
var r = (rB + (rT - rB) * Math.pow(v, 1.7)) * rmul, wob = 1 + 0.06 * Math.sin(v * 14 + t * 3 + Math.atan2(bz, bx) * 3);
var ox = lean[0] * v + sway * Math.sin(v * Math.PI * 1.6 + t * 0.5) * Math.sin(v * Math.PI), oz = lean[1] * v + sway * Math.cos(v * Math.PI * 1.3 + t * 0.4) * Math.sin(v * Math.PI);
pos.array[i * 3] = bx * r * wob + ox;
pos.array[i * 3 + 1] = v * H;
pos.array[i * 3 + 2] = bz * r * wob + oz;
}
pos.needsUpdate = true;
M.geometry.computeBoundingSphere();
},
function (S, dt) {
var C = stcCfg();
if (S.stage === "gone") {
if (S.i >= C.count) {
S.g.visible = false;
return;
}
S.wait -= dt;
if (S.wait <= 0)
stcStormStart(S);
else
return;
}
if (S.i >= C.count && S.stage !== "roping") {
S.stage = "roping";
S.t = Math.max(S.t, S.life - 25);
}
S.t += dt;
S.x += S.hx * S.sp * dt;
S.z += S.hz * S.sp * dt;
S.x += Math.sin(S.t * 0.11 + S.i) * 0.6 * dt;
S.z += Math.cos(S.t * 0.09 + S.i) * 0.6 * dt;
var f = S.t / S.life;
S.stage = f < 0.12 ? "forming" : f > 0.86 ? "roping" : "mature";
if (S.t >= S.life) {
S.stage = "gone";
S.wait = 18 + Math.random() * 25;
S.g.visible = false;
return;
}
var grow = Math.min(1, f / 0.12), fade = f > 0.86 ? 1 - (f - 0.86) / 0.14 : 1;
S.amp = grow * fade;
var rope = f < 0.12 ? 1 - f / 0.12 : f > 0.8 ? Math.min(1, (f - 0.8) / 0.12) : 0;
var rB = S.rB * (1 - rope * 0.85), rT = S.rB * 1.5 + 45, sway = 10 + rope * 90, lean = [-S.hx * 60 * (0.5 + rope), -S.hz * 60 * (0.5 + rope)];
S.g.position.set(S.x, 0, S.z);
var t = STC_SKY.t;
stcFunnelShape(S.out, S, rB, rT, lean, sway, t, 1);
stcFunnelShape(S.inn, S, rB * 0.72, rT * 0.8, lean, sway, t, 1);
var reach = grow;
S.out.scale.y = reach;
S.out.position.y = (1 - reach) * (STC_H - 20);
if (S.inn) {
S.inn.scale.y = reach;
S.inn.position.y = S.out.position.y;
}
S.out.material.opacity = (STC.lite ? 0.85 : 0.55) * fade + 0.05;
if (S.inn)
S.inn.material.opacity = 0.82 * fade;
var spin = 0.3 + S.ef * 0.1;
S.out.material.map.offset.x -= dt * spin;
S.out.material.map.offset.y += dt * 0.08;
if (S.inn) {
S.inn.material.map.offset.x -= dt * spin * 1.4;
}
var onG = grow >= 1 ? fade : 0;
S.skirt.visible = onG > 0.05;
var sR = Math.max(14, rB) * 1.5, sH = 24 + S.ef * 10;
S.skirtP.forEach(function (q) { q.a += dt * spin * 1.8 * q.k; q.s.position.set(Math.cos(q.a) * sR * q.r, sH * q.h + sH * 0.3, Math.sin(q.a) * sR * q.r); q.s.scale.set(sR * 1.4, sH * 1.3, 1); q.s.material.opacity = 0.75 * onG; q.s.material.rotation += dt * 0.3; });
var dp = S.dust.geometry.attributes.position, ds = S.dustSeed, R0 = Math.max(rB, 10);
for (var k = 0; k < ds.length; k++) {
var d = ds[k];
d[0] += dt * (0.9 + S.ef * 0.25) * d[3] / d[1];
var h = d[2] * (28 + S.ef * 14), rr = R0 * d[1] * (1 + h / 120);
dp.array[k * 3] = Math.cos(d[0]) * rr + lean[0] * h / STC_H;
dp.array[k * 3 + 1] = h;
dp.array[k * 3 + 2] = Math.sin(d[0]) * rr + lean[1] * h / STC_H;
}
dp.needsUpdate = true;
S.dust.material.opacity = 0.6 * onG;
S.dust.visible = onG > 0.05;
var M = STC_SKY._m || (STC_SKY._m = new THREE.Matrix4()), Q = STC_SKY._q || (STC_SKY._q = new THREE.Quaternion()), E = STC_SKY._e || (STC_SKY._e = new THREE.Euler()), V = STC_SKY._v || (STC_SKY._v = new THREE.Vector3()), Sc = STC_SKY._s || (STC_SKY._s = new THREE.Vector3());
var show = S.ef >= 1 ? onG : 0;
for (var c = 0; c < S.chunkSeed.length; c++) {
var q = S.chunkSeed[c];
q[0] += dt * (0.7 + S.ef * 0.2) * q[3] / q[1];
q[4] += dt * 3;
var hh = 4 + q[2] * (30 + S.ef * 24), rc = R0 * q[1] * 1.3;
V.set(Math.cos(q[0]) * rc, hh, Math.sin(q[0]) * rc);
E.set(q[4], q[4] * 0.7, q[4] * 0.3);
Q.setFromEuler(E);
var sz = show * (0.6 + q[3] * 1.2);
Sc.set(sz, sz, sz);
M.compose(V, Q, Sc);
S.chunks.setMatrixAt(c, M);
}
S.chunks.instanceMatrix.needsUpdate = true;
var wR = rT * 1.4;
S.wall.position.set(lean[0], STC_H, lean[1]);
S.wall.rotation.y -= dt * 0.08;
S.wall.children.forEach(function (p, j) { var wa = p.userData.wa; if (wa < 0) {
p.position.set(0, -30, 0);
p.scale.set(wR * 2.4, 160, 1);
}
else {
p.position.set(Math.cos(wa) * wR, -40 - (j % 3) * 22, Math.sin(wa) * wR);
p.scale.set(wR * 1.3, 170, 1);
} });
S.base.rotation.z -= dt * 0.01;
},
function (G) {
var tex = stcStreakTex("spout", "#C8CCD0", "90,96,104", 30);
tex.repeat.set(2, 1);
var m = new THREE.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0.6, depthWrite: false, side: THREE.DoubleSide });
var S = { g: new THREE.Group(), f: stcFunnelMesh(STC.lite ? 10 : 16, STC.lite ? 8 : 16, m), t: 0, on: 0, wait: 20, x: -520, z: 420 };
S.g.add(S.f);
S.g.userData.keep = 1;
S.g.visible = false;
G.add(S.g);
var n = STC.lite ? 50 : 140, pos = new Float32Array(n * 3), sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
S.spray = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xE8EEF2, size: 2.2, transparent: true, opacity: 0.55, depthWrite: false, map: stcDotTex() }));
S.spray.frustumCulled = false;
S.g.add(S.spray);
S.seed = [];
var r = stcRnd(23);
for (var k = 0; k < n; k++)
S.seed.push([r() * 6.283, 0.6 + r() * 1.6, r()]);
STC_SKY.spout = S;
},
function (dt) {
var S = STC_SKY.spout;
if (!S)
return;
var C = stcCfg();
if (!C.spout) {
S.g.visible = false;
S.on = 0;
return;
}
if (!S.on) {
S.wait -= dt;
if (S.wait > 0) {
S.g.visible = false;
return;
}
S.on = 1;
S.t = 0;
S.life = 80 + Math.random() * 50;
}
S.t += dt;
var f = S.t / S.life;
if (f >= 1) {
S.on = 0;
S.wait = 50 + Math.random() * 60;
S.g.visible = false;
return;
}
S.g.visible = true;
var amp = Math.min(1, f / 0.15) * (f > 0.85 ? 1 - (f - 0.85) / 0.15 : 1), t = STC_SKY.t;
S.x = -520 + Math.sin(t * 0.03) * 70;
S.z = 420 + Math.cos(t * 0.027) * 60;
S.g.position.set(S.x, 0, S.z);
stcFunnelShape(S.f, S, 5, 30, [20, -15], 22, t, 1);
S.f.scale.y = amp;
S.f.position.y = (1 - amp) * (STC_H - 20);
S.f.material.map.offset.x -= dt * 0.7;
var p = S.spray.geometry.attributes.position;
for (var k = 0; k < S.seed.length; k++) {
var d = S.seed[k];
d[0] += dt * 1.6 / d[1];
var h = d[2] * 14 * amp;
p.array[k * 3] = Math.cos(d[0]) * d[1] * 8;
p.array[k * 3 + 1] = h;
p.array[k * 3 + 2] = Math.sin(d[0]) * d[1] * 8;
}
p.needsUpdate = true;
S.spray.material.opacity = 0.55 * (f > 0.15 ? amp : 0);
},
function (G) {
var tex = stcCloudTex("dust", "#9A7A52", 1.3);
tex.repeat.set(6, 1);
var m = new THREE.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide });
var g = new THREE.Group(), front = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, STC.lite ? 20 : 40, 1, true, -0.7, 1.4), m);
front.scale.set(2200, 520, 2200);
front.position.set(-2200, 260, 0);
g.add(front);
var cap = new THREE.Mesh(new THREE.SphereGeometry(1, STC.lite ? 12 : 24, 8, 0, Math.PI * 2, 0, Math.PI / 2), m);
cap.scale.set(260, 180, 2400);
cap.position.set(-20, 500, 0);
g.add(cap);
g.userData.keep = 1;
g.visible = false;
G.add(g);
STC_SKY.haboob = { g: g, front: front, x: -2000, on: 0, wait: 150, sp: 14 };
},
function (dt) {
var H = STC_SKY.haboob;
if (!H)
return;
var C = stcCfg();
if (!C.haboob) {
H.g.visible = false;
H.on = 0;
return;
}
if (!H.on) {
H.wait -= dt;
H.g.visible = false;
if (H.wait > 0)
return;
H.on = 1;
H.x = -1900;
}
H.x += H.sp * dt;
H.g.position.x = H.x;
H.g.visible = true;
H.front.material.map.offset.x += dt * 0.01;
H.front.material.map.offset.y -= dt * 0.02;
if (H.x > 2200) {
H.on = 0;
H.wait = 200 + Math.random() * 120;
H.g.visible = false;
}
},
function (x, z) {
var B = STC_SKY.bolt;
if (B && B.g) {
B.g.parent && B.g.parent.remove(B.g);
B.g.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); });
}
var g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: 0xDCE4FF, transparent: true, opacity: 0, depthWrite: false, fog: false }), r = Math.random;
var V = new THREE.Vector3(), U = new THREE.Vector3(0, 1, 0);
function seg(a, b, w) {
var len = a.distanceTo(b), c = new THREE.Mesh(new THREE.CylinderGeometry(w, w, len, 4, 1, true), m);
c.position.copy(a).add(b).multiplyScalar(0.5);
V.copy(b).sub(a).normalize();
c.quaternion.setFromUnitVectors(U, V);
g.add(c);
}
function line(a, steps, dy, w, branch) { var p = a.clone(); for (var i = 0; i < steps; i++) {
var q = new THREE.Vector3(p.x + (r() - 0.5) * 40, p.y - dy * (0.7 + r() * 0.6), p.z + (r() - 0.5) * 40);
if (q.y < 0)
q.y = 0;
seg(p, q, w);
if (branch && r() < 0.28)
line(q.clone(), 3 + (r() * 3 | 0), dy * 0.8, w * 0.5, false);
p = q;
if (q.y <= 0)
break;
} }
line(new THREE.Vector3(0, STC_H + 40, 0), 16, 36, STC.lite ? 1.4 : 1.0, true);
g.position.set(x, 0, z);
g.userData.keep = 1;
STC.G.add(g);
var gl = (typeof wGlow === "function") ? wGlow(0xC8D0FF, 420, 0) : null;
if (gl) {
gl.position.set(x, STC_H + 60, z);
gl.userData.keep = 1;
STC.G.add(gl);
}
if (B && B.glow && B.glow.parent) {
B.glow.parent.remove(B.glow);
}
STC_SKY.bolt = { g: g, m: m, glow: gl, t: 0, x: x, z: z };
},
function (dt) {
var C = stcCfg(), B = STC_SKY.bolt;
if (B && B.g) {
B.t += dt;
var t = B.t, a = t < 0.35 ? t / 0.35 : t < 0.65 ? 1 : Math.max(0, 1 - (t - 0.65) / 0.9);
B.m.opacity = 0.9 * a;
if (B.glow)
B.glow.material.opacity = 0.22 * a;
STC_SKY.glow = a;
if (t > 0.35 && !B.hit) {
B.hit = 1;
var L = worldLocal(), feet = L.y - 1.72, K = STC.K, rm = K ? stcRoomAt(K, L.x, L.z, feet) : null, dd = Math.hypot(L.x - B.x, L.z - B.z);
if (!rm && feet > -0.5 && !STC.ride && dd < 40)
stcHarm(dd < 12 ? 70 : 45 * (1 - dd / 40), "bolt");
}
if (t > 1.6) {
B.g.visible = false;
if (B.glow)
B.glow.visible = false;
STC_SKY.glow = 0;
}
}
if (!C.lightning) {
if (B && B.g) {
B.g.visible = false;
if (B.glow)
B.glow.visible = false;
}
STC_SKY.glow = 0;
return;
}
STC_SKY.boltT -= dt;
if (STC_SKY.boltT > 0)
return;
STC_SKY.boltT = 7 + Math.random() * 9;
var live = STC_SKY.storms.filter(function (S) { return S.stage !== "gone"; });
if (!live.length)
return;
var S = live[Math.floor(Math.random() * live.length)], a = Math.random() * 6.283, d = 150 + Math.random() * 450;
var x = S.x + 330 + Math.cos(a) * d, z = S.z - 260 + Math.sin(a) * d;
var L = worldLocal();
if (Math.hypot(L.x - S.x, L.z - S.z) < 900 && Math.random() < 0.25) {
var b2 = Math.random() * 6.283, r2 = 10 + Math.random() * 60;
x = L.x + Math.cos(b2) * r2;
z = L.z + Math.sin(b2) * r2;
}
if (Math.hypot(x, z) < STC_TOWN_R)
return;
stcBoltMake(x, z);
STC_SKY.lastBolt = { x: x, z: z, at: STC_SKY.t };
},
function (d, why) {
var C = stcCfg();
if (!C.harm || STC_HP.down || d <= 0)
return;
try {
var Lh = worldLocal();
if (stcSheltered(Lh, Lh.y - 1.72, !!(store && store.inside) || !!(STC.K && stcRoomAt(STC.K, Lh.x, Lh.z, Lh.y - 1.72))))
return;
}
catch (e) { }
var before = STC_HP.hp;
STC_HP.hp = Math.max(0, STC_HP.hp - d);
if (why && !STC_HP.said[why] && before - STC_HP.hp > 0) {
STC_HP.said[why] = 1;
stcSay({ wind: "🌪️ <b>The wind is tearing at you</b> and things are flying past. Get back to town or below ground!", hail: "🧊 <b>Hail is pounding you.</b> Stones like these break windscreens and bones: get under cover.", bolt: "⚡ <b>Lightning struck close by!</b> The ground current knocked you flat. When thunder roars, go indoors." }[why] || "");
}
if (STC_HP.hp <= 0)
stcDown(why);
},
function () {
var v = STC_HP.veil;
if (v && v.parentNode)
return v;
v = document.createElement("div");
v.id = "stc-veil";
v.style.cssText = "position:fixed;inset:0;z-index:43;pointer-events:none;background:radial-gradient(ellipse at center,rgba(40,10,10,0) 40%,rgba(60,10,10,0.75) 100%);opacity:0;transition:opacity .8s linear";
document.body.appendChild(v);
STC_HP.veil = v;
return v;
},
function (why) {
STC_HP.down = 2.2;
STC.ride = null;
worldCard(null);
stcSay("🌪️ <b>The storm took you down.</b> " + (why === "bolt" ? "Lightning kills about 20 people a year in the US." : why === "hail" ? "Big hail can kill: shelter before it starts." : "A real tornado's flying debris is what kills most people caught in one.") + " You wake in the town storm shelter, under the fire station. The storm takes no gold, but out there it is deadly.");
},
function (dt, L, feet, inside) {
var C = stcCfg(), N = stcNearest(L.x, L.z);
STC_SKY.near = N;
if (stcSheltered(L, feet, inside)) {
if (STC_HP.hp < 100)
STC_HP.hp = Math.min(100, STC_HP.hp + dt * 4);
return;
}
if (!N || inside || feet < -0.5 || STC.ride)
return;
var S = N.S, rB = S.rB * Math.max(0.25, S.amp), reach = rB * 3 + 60, d = N.d;
if (d > reach || S.amp < 0.3)
return;
var k = Math.pow(1 - d / reach, 1.4) * (6 + S.ef * 3) * S.amp;
stcHarm(Math.pow(1 - d / reach, 1.5) * (5 + S.ef * 5) * S.amp * dt, "wind");
if (!C.push)
return;
var dx = (L.x - S.x) / Math.max(1, d), dz = (L.z - S.z) / Math.max(1, d);
var vx = (dz * 1 - dx * 0.45) * k, vz = (-dx * 1 - dz * 0.45) * k;
var W = WLD.w, P = camera.position, nx = L.x + vx * dt, nz = L.z + vz * dt;
if (W && !W.block(nx, L.z, feet))
P.x += vx * dt;
if (W && !W.block(L.x, nz, feet))
P.z += vz * dt;
if (d < Math.max(8, rB * 0.8) && !STC_HP.down) {
if (typeof ozCyclone === "function" && ozCyclone(S))
return;
var ax = dx || 1, az = dz;
var ox = S.x + ax * (reach + 120), oz = S.z + az * (reach + 120);
if (W && W.block(ox, oz, 0)) {
ox = S.x - S.hx * (reach + 200);
oz = S.z - S.hz * (reach + 200);
}
P.x = STC.base + ox;
P.z = oz;
P.y = 1.72;
stcHarm(C.harm ? 40 + S.ef * 12 : 0, "wind");
if (!STC_HP.down)
stcSay("🌪️ <b>The tornado picked you up and threw you!</b> Winds " + (S.ef >= 4 ? "over 166 mph" : "well over 100 mph") + ". " + (C.harm ? "You are badly hurt: get to shelter." : ""));
}
},
function (dt, L, inside) {
var F = STC_SKY.fall;
if (!F)
return;
var C = stcCfg(), want = "", amt = 0;
if (!inside) {
STC_SKY.storms.forEach(function (S) {
if (S.stage === "gone")
return;
var cx = S.x + 330, cz = S.z - 260, d = Math.hypot(L.x - cx, L.z - cz);
if (d < 300) {
var a = 1 - d / 300;
if (a > amt) {
amt = a;
want = C.hail && d < 160 ? "hail" : "rain";
}
}
else if (d < 700 && 0.25 > amt) {
amt = 0.25 * (1 - (d - 300) / 400);
want = "rain";
}
});
}
F.amt += (amt - F.amt) * Math.min(1, dt * 0.8);
var m = F.p.material;
if (want && want !== F.kind) {
F.kind = want;
m.color.setHex(want === "hail" ? 0xF0F4F8 : 0xA8B4C2);
m.size = want === "hail" ? 0.16 : 0.07;
}
m.opacity = Math.min(0.85, F.amt * 1.2);
F.p.visible = F.amt > 0.02;
if (!F.p.visible)
return;
var P = camera.position, base = STC.base, pos = F.p.geometry.attributes.position, sp = F.kind === "hail" ? 26 : 14;
F.p.position.set(P.x - base, P.y - 1.72, P.z);
for (var i = 0; i < F.n; i++) {
var y = pos.array[i * 3 + 1] - sp * dt;
if (y < 0)
y += 30;
pos.array[i * 3 + 1] = y;
}
pos.needsUpdate = true;
if (F.kind === "hail" && F.amt > 0.4)
stcHarm(F.amt * 3 * dt, "hail");
if (F.kind === "hail" && F.amt > 0.5 && !STC_SKY.hailSaid) {
STC_SKY.hailSaid = 1;
stcSay("🧊 <b>Hail!</b> You are under the storm's core. Real hail this size can break windscreens: chasers stay out of the core.");
}
},
function (key) {
var L = STC_LESSONS.filter(function (x) { return x[0] === key; })[0];
if (!L)
return;
var p = stcProg();
p.read[key] = 1;
stcProgSave();
var young = !!p.young, f = {};
var b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + stcEsc(L[1]) + "</div><div style='margin:8px 0;line-height:1.5'>" + stcEsc(young ? L[2] : L[3]) + "</div>" +
worldBtn("lvl", young ? "Read the full version" : "Read the shorter version", "for " + (young ? "older readers" : "younger readers")) + worldBtn("course", "The Storm Spotter course", Object.keys(p.read).length + " of " + STC_LESSONS.length + " lessons read");
f.lvl = function () { p.young = !young; stcProgSave(); stcLessonCard(key); };
f.course = function () { stcCourse(); };
worldCard(b, f);
},
function () {
var p = stcProg(), f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🌪️ The Storm Spotter course</div><div style='opacity:.8;margin-bottom:6px'>Seven lessons, then ten questions. Eight right earns the Storm Spotter certificate.</div>";
STC_LESSONS.forEach(function (L) { b += worldBtn("l_" + L[0], (p.read[L[0]] ? "✓ " : "") + L[1], ""); f["l_" + L[0]] = function () { stcLessonCard(L[0]); }; });
b += worldBtn("quiz", "Take the quiz", p.spotter ? "✓ Certificate earned (" + p.spotter + " of 10)" : "10 questions");
f.quiz = function () { stcQuiz(); };
worldCard(b, f);
},
function () {
var Q = STC_QUIZ.map(function (q, i) { var opts = [q[1]].concat(q[2]); var r = stcRnd(i * 37 + 11); for (var k = opts.length - 1; k > 0; k--) {
var j = Math.floor(r() * (k + 1));
var t = opts[k];
opts[k] = opts[j];
opts[j] = t;
} return { q: q[0], a: q[1], o: opts }; });
STC.quiz = { Q: Q, ans: {} };
var b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Storm Spotter quiz</div>", f = {};
Q.forEach(function (q, i) {
b += "<div style='margin:10px 0 4px'><b>" + (i + 1) + ". " + stcEsc(q.q) + "</b></div>";
q.o.forEach(function (o, k) {
var n = "q" + i + "_" + k;
b += "<div data-w='" + n + "' data-stcq='" + i + "' style='margin:3px 0;padding:5px 8px;border:1px solid rgba(143,180,232,.4);border-radius:4px'>" + stcEsc(o) + "</div>";
f[n] = function (el) { STC.quiz.ans[i] = o; document.querySelectorAll("[data-stcq='" + i + "']").forEach(function (x) { x.style.background = ""; }); el.style.background = "rgba(143,180,232,.3)"; };
});
});
b += worldBtn("mark", "Mark my answers", "");
f.mark = function () { stcQuizMark(); };
worldCard(b, f);
},
function () {
var Z = STC.quiz;
if (!Z)
return;
var n = 0, wrong = [];
Z.Q.forEach(function (q, i) { if (Z.ans[i] === q.a)
n++;
else
wrong.push((i + 1) + ". " + q.q + " → " + q.a); });
var p = stcProg(), pass = n >= 8;
if (pass && (!p.spotter || n > p.spotter)) {
p.spotter = n;
stcProgSave();
}
stcCard(pass ? "🎓 Storm Spotter!" : "Not quite yet", n + " of 10 right", [], wrong.length ? wrong : ["Every answer right."], pass ? "<div style='margin-top:8px;padding:8px;border:1px solid #E8C040;border-radius:6px'>Certificate: <b>Storm Spotter</b>, Stormhaven Storm Prediction Office. Real spotters are trained free by the US National Weather Service's SKYWARN programme.</div>" : worldBtn("again", "Try again", "read the lessons first if you like"), { again: function () { stcQuiz(); } });
},
function () {
stcDid("kit");
stcCard("🔦 A storm kit", "Harlan's General Store", [["Water", "a gallon a person a day, for three days"], ["Food", "that keeps and needs no cooking"], ["Light", "a torch (flashlight) and spare batteries; never candles"], ["News", "a battery or wind-up weather radio"], ["First aid", "a kit, and any medicines you need"], ["A whistle", "to signal for help"], ["Shoes and a helmet", "sturdy shoes for broken glass; a bike helmet protects your head"], ["Papers", "copies of important papers and phone numbers"]], ["Keep it where you will shelter: the basement or the inside room."]);
},
function () {
stcDid("pie");
var pies = ["cherry", "apple", "pecan", "peach", "rhubarb", "chocolate cream"], p = pies[Math.floor(Math.random() * pies.length)];
stcSay("🥧 <b>Rosie slides you a slice of " + p + " pie.</b> \"On the house, hon. Chasers have been sitting at that counter since the first storm-chasing tours in the 1980s.\"");
},
function (c, W, H, full) {
var half = full ? W / 2 : W / 2, s = half / 2800, ox = half / 2, oy = H / 2;
c.fillStyle = "#05080C";
c.fillRect(0, 0, W, H);
function map(x, z, o) { return [o + x * s, oy + z * s]; }
[0, half].forEach(function (o, pi) {
c.save();
c.beginPath();
c.rect(o, 0, half, H);
c.clip();
c.strokeStyle = "rgba(120,140,160,0.25)";
c.lineWidth = 1;
for (var rr = 400; rr <= 1600; rr += 400) {
c.beginPath();
c.arc(o + half / 2, oy, rr * s, 0, 7);
c.stroke();
}
c.strokeStyle = "rgba(200,200,200,0.18)";
for (var k = -3; k <= 3; k++) {
var a = map(k * 400, -1600, o + half / 2), b = map(k * 400, 1600, o + half / 2);
c.beginPath();
c.moveTo(a[0], a[1]);
c.lineTo(b[0], b[1]);
c.stroke();
a = map(-1600, k * 400, o + half / 2);
b = map(1600, k * 400, o + half / 2);
c.beginPath();
c.moveTo(a[0], a[1]);
c.lineTo(b[0], b[1]);
c.stroke();
}
STC_SKY.storms.forEach(function (S) {
if (S.stage === "gone")
return;
var hx = S.hx, hz = S.hz, px = -hz, pz = hx, cx = S.x + hx * 300 + px * -150, cz = S.z + hz * 300 + pz * -150;
if (pi === 0) {
var layers = [[900, "rgba(40,160,60,0.55)"], [600, "rgba(60,200,60,0.7)"], [420, "rgba(230,210,40,0.8)"], [260, "rgba(230,120,30,0.85)"], [150, "rgba(210,30,30,0.9)"], [70, "rgba(200,40,200,0.95)"]];
layers.forEach(function (L, li) { var p = map(cx, cz, o + half / 2); c.fillStyle = L[1]; c.beginPath(); c.ellipse(p[0], p[1], L[0] * s * 1.2, L[0] * s * 0.75, Math.atan2(hz, hx), 0, 7); c.fill(); });
var t = map(S.x, S.z, o + half / 2);
c.strokeStyle = "rgba(230,170,40,0.85)";
c.lineWidth = Math.max(2, 70 * s);
c.beginPath();
c.arc(t[0], t[1], 120 * s, Math.atan2(hz, hx) + 0.6, Math.atan2(hz, hx) + 0.6 + 4.2);
c.stroke();
if (S.amp > 0.5 && S.ef >= 2) {
c.fillStyle = "rgba(140,200,255,0.9)";
c.beginPath();
c.arc(t[0], t[1], Math.max(2, 40 * s), 0, 7);
c.fill();
}
}
else {
var t2 = map(S.x, S.z, o + half / 2), ang = Math.atan2(S.z, S.x);
c.fillStyle = "rgba(40,90,40,0.5)";
c.beginPath();
c.arc(t2[0], t2[1], 700 * s, 0, 7);
c.fill();
var off = Math.max(3, Math.max(40, S.rB * 1.4) * s * (0.5 + S.amp));
c.fillStyle = "rgba(40,230,60,0.95)";
c.beginPath();
c.arc(t2[0] + Math.cos(ang + 1.57) * off, t2[1] + Math.sin(ang + 1.57) * off, Math.max(3, off * 0.9), 0, 7);
c.fill();
c.fillStyle = "rgba(240,40,40,0.95)";
c.beginPath();
c.arc(t2[0] - Math.cos(ang + 1.57) * off, t2[1] - Math.sin(ang + 1.57) * off, Math.max(3, off * 0.9), 0, 7);
c.fill();
}
});
if (pi === 0 && STC_SKY.spout && STC_SKY.spout.on) {
var sp = map(STC_SKY.spout.x, STC_SKY.spout.z, o + half / 2);
c.fillStyle = "rgba(60,200,60,0.6)";
c.beginPath();
c.arc(sp[0], sp[1], 60 * s, 0, 7);
c.fill();
}
if (pi === 0 && STC_SKY.haboob && STC_SKY.haboob.on) {
var hb = map(STC_SKY.haboob.x, 0, o + half / 2);
c.fillStyle = "rgba(60,160,60,0.35)";
c.fillRect(hb[0] - 40 * s, 0, 40 * s + 1, H);
}
var tp = map(0, 0, o + half / 2);
c.fillStyle = "#FFFFFF";
c.fillRect(tp[0] - 3, tp[1] - 3, 6, 6);
c.font = Math.round(H / 22) + "px monospace";
c.fillText("STORMHAVEN", tp[0] + 5, tp[1] - 5);
var L = worldLocal(), me = map(L.x, L.z, o + half / 2);
c.strokeStyle = "#4AE0FF";
c.lineWidth = 2;
c.beginPath();
c.arc(me[0], me[1], 5, 0, 7);
c.stroke();
c.restore();
c.fillStyle = "#E8E8E8";
c.font = "bold " + Math.round(H / 18) + "px monospace";
c.fillText(pi ? "VELOCITY" : "REFLECTIVITY", o + 8, Math.round(H / 14));
});
c.strokeStyle = "#334";
c.beginPath();
c.moveTo(half, 0);
c.lineTo(half, H);
c.stroke();
},
function (dt) {
var m = STC.radarScr;
if (!m || !m.map)
return;
STC.radarT = (STC.radarT || 0) + dt;
if (STC.radarT < (STC.lite ? 3 : 1.5))
return;
STC.radarT = 0;
var L = worldLocal();
if (Math.abs(L.x + 20) > 40 || Math.abs(L.z + 48) > 40)
return;
var cv = m.map.image;
stcRadarDraw(cv.getContext("2d"), cv.width, cv.height, true);
m.map.needsUpdate = true;
},
function () {
stcDid("radar");
var cv = document.createElement("canvas");
cv.width = 640;
cv.height = 320;
stcRadarDraw(cv.getContext("2d"), 640, 320, true);
var rows = [], live = STC_SKY.storms.filter(function (S) { return S.stage !== "gone"; });
live.forEach(function (S, i) { var d = Math.hypot(S.x, S.z); rows.push(["Storm " + (i + 1), (S.amp > 0.3 ? "tornado on the ground, about EF" + S.ef + " by its couplet" : "rotating, a funnel lowering") + "; " + Math.round(d) + " m " + stcBearing(S.x, S.z) + " of town, moving north-east at " + Math.round(S.sp * 2.237) + " mph"]); });
if (!live.length)
rows.push(["Now", "No rotation on radar. New storms are building to the south-west."]);
if (STC_SKY.spout && STC_SKY.spout.on)
rows.push(["Lake Wichawa", "A small echo over the lake: a waterspout"]);
if (STC_SKY.haboob && STC_SKY.haboob.on)
rows.push(["Dust", "A thin line of returns moving east: an outflow boundary lifting dust (a haboob)"]);
stcCard("📡 Radar", "Left: reflectivity (how much rain and hail). Right: velocity (green towards the radar, red away).", rows, ["The hook on the left and the green-red pair on the right at the same spot: rotation, a tornado likely.", "The blue dot in a hook is a 'debris ball': things lifted by a tornado on the ground."], "<img alt='Radar' src='" + cv.toDataURL() + "' style='width:100%;border-radius:4px;margin-top:6px'>");
},
function (x, z) {
var N = stcNearest(x, z), d = N ? N.d : 5000, S = N ? N.S : null, inflow = S ? Math.max(0, 1 - d / 2500) : 0;
var wind = 8 + inflow * 22 + (S && d < S.rB * 3 + 60 ? (1 - d / (S.rB * 3 + 60)) * (50 + S.ef * 30) * S.amp : 0);
var dust = stcInDust(x);
if (dust > 0)
wind = Math.max(wind, 35 + dust * 25);
var dir = S ? (Math.atan2(S.x - x, -(S.z - z)) * 180 / Math.PI + 360 + 20) % 360 : 180;
var p = 1006 - inflow * 6 - (S && d < S.rB * 3 ? (1 - d / (S.rB * 3)) * (S.ef * 18 + 10) : 0);
var T = 31 - inflow * 3 - dust * 4, Td = 21 - dust * 8, RH = Math.round(100 * Math.exp(17.62 * Td / (243.12 + Td)) / Math.exp(17.62 * T / (243.12 + T)));
return { wind: wind, dir: dir, p: p, T: T, Td: Td, RH: RH, S: S, d: d };
},
function () {
stcDid("station");
var R = stcReadings(130, -110), mph = Math.round(R.wind), F = function (c) { return Math.round(c * 9 / 5 + 32); };
stcCard("🌡️ The weather station", "Live, at the mast south-east of town", [
["Wind (cup anemometer)", mph + " mph (" + Math.round(R.wind * 1.609) + " km/h) from the " + stcBearing(Math.sin(R.dir * Math.PI / 180), -Math.cos(R.dir * Math.PI / 180))],
["Pressure (barometer)", R.p.toFixed(1) + " mb"], ["Temperature", Math.round(R.T) + " °C (" + F(R.T) + " °F)"], ["Dew point", Math.round(R.Td) + " °C (" + F(R.Td) + " °F)"], ["Humidity (hygrometer)", R.RH + "%"]
], ["The wind blows towards the storm here: its 'inflow', warm damp air feeding the updraft.", "A dew point over 60 °F (16 °C) and a falling barometer are what forecasters watch on a tornado day."]);
},
function () {
if (STC.balloon && STC.balloon.alive) {
stcSay("🎈 The balloon is still rising: watch the readings at the top of the screen.");
return;
}
stcDid("balloon");
var g = new THREE.Group();
g.position.set(90, 1.5, -150);
STC.G.add(g);
g.userData.keep = 1;
var b = stcSph(1, stcMat(0xEDE6D8, null, { phong: 30 }), 0, 1.6, 0, g, STC.lite ? 10 : 16);
var line = stcBox(0.02, 1.4, 0.02, stcMat(0x2A2A2A, null), 0, 0.3, 0, g);
var box = stcBox(0.2, 0.14, 0.1, stcMat(0xE8E8E2, null), 0, -0.4, 0, g);
STC.balloon = { g: g, b: b, alive: true, h: 0, t: 0, rows: [], next: 0 };
stcSay("🎈 <b>Balloon away!</b> It rises about 5 metres a second (here, sped up 40 times). The radiosonde radios back as it goes.");
},
function (dt) {
var B = STC.balloon;
if (!B || !B.alive)
return;
B.t += dt;
var climb = 5 * 40;
B.h += climb * dt;
var shown = Math.min(B.h / 40, 700);
B.g.position.y = 1.5 + shown;
B.g.position.x = 90 + shown * 0.4;
B.g.position.z = -150 - shown * 0.25;
var km = B.h / 1000, sw = 1 + km * 0.06;
B.b.scale.setScalar(Math.min(4, sw));
var T = km < 11 ? 31 - 6.5 * km : -40.5 + (km > 20 ? (km - 20) : 0), p = 1006 * Math.pow(1 - 2.25577e-5 * B.h, 5.25588), wind = Math.round(15 + km * 6 * (km < 12 ? 1 : 0.4)), rh = Math.max(5, Math.round(70 - km * 5));
if (B.h >= B.next) {
B.rows.push([Math.round(km * 10) / 10 + " km", Math.round(T) + " °C · " + Math.round(p) + " mb · " + rh + "% · wind " + wind + " mph"]);
B.next += 2000;
}
worldBanner("<b>🎈 Weather balloon</b> · " + (km).toFixed(1) + " km up · " + Math.round(T) + " °C · " + Math.round(p) + " mb · wind " + wind + " mph");
B.banner = 1;
if (B.h >= 30000) {
B.alive = false;
B.g.visible = false;
stcCard("🎈 The balloon burst at 30 km", "The radiosonde parachutes down; here is what it sent back", B.rows, ["The air cooled about 6.5 °C every kilometre up to the tropopause (about 11 km), then stopped cooling: the top of the weather.", "Warm, damp air near the ground under cool, dry air above is 'unstable': rising air keeps rising. Today's sounding shows a CAPE (storm energy) near 3,850 J/kg: very high.", "Winds turning and strengthening with height (shear) let storms rotate: supercells."]);
STC.G.remove(B.g);
}
},
function () {
if (STC.ride) {
return;
}
var live = STC_SKY.storms.filter(function (S) { return S.stage !== "gone" && S.t < S.life * 0.7; }).sort(function (a, b) { return (b.amp - a.amp); });
var S = live[0], tx, tz;
if (S) {
var ahead = Math.min(700, S.sp * 70), px = S.hz, pz = -S.hx;
tx = S.x + S.hx * ahead + px * 260;
tz = S.z + S.hz * ahead + pz * 260;
}
else {
tx = -500;
tz = 600;
}
var R = Math.hypot(tx, tz);
if (R > 1300) {
tx *= 1300 / R;
tz *= 1300 / R;
}
if (Math.hypot(tx + 520, tz - 420) < 220) {
tx += 260;
}
var zr = Math.round(tz / 400) * 400, xr = Math.round(tx / 400) * 400;
var pts = [[4, -15], [4, zr === 0 ? -6 : zr + (zr > 0 ? -4 : 4)], [tx, zr === 0 ? -6 : zr + (zr > 0 ? -4 : 4)], [tx, tz]];
if (zr === 0)
pts[1] = [4, -6];
STC.ride = { pts: pts, i: 0, s: 0, sp: STC.lite ? 34 : 30, S: S, back: false };
if (typeof pitch !== "undefined" && pitch > -0.12)
pitch = -0.12;
if (S)
S.chased = true;
worldCard(null);
stcSay("🚙 <b>June:</b> \"Buckle up! It's moving north-east about " + (S ? Math.round(S.sp * 2.237) : 25) + " mph. We'll come in from the south-east, out of the hail, with the road open behind us.\"");
stcDid("chase");
},
function (dt) {
var R = STC.ride;
if (!R)
return;
var T = STC.truck;
var a = R.pts[R.i], b = R.pts[R.i + 1];
if (!b) {
stcRideArrive();
return;
}
var dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz) || 1;
R.s += R.sp * dt;
if (R.s >= len) {
R.s -= len;
R.i++;
return;
}
var x = a[0] + dx * R.s / len, z = a[1] + dz * R.s / len, ry = Math.atan2(dx, dz);
if (T) {
T.position.set(x, 0, z);
T.rotation.y = ry;
}
var P = camera.position;
P.set(STC.base + x + Math.cos(ry) * 0.45, typeof VCP_BUILD !== "undefined" && VCP_BUILD.chase ? 1.62 : 2.15, z - Math.sin(ry) * 0.45);
if (typeof flyY !== "undefined")
flyY = 0;
var N = R.S && R.S.stage !== "gone" ? R.S : null, d = N ? Math.hypot(x - N.x, z - N.z) : 0;
worldBanner("<b>🚙 Chasing</b> · " + (N ? (N.amp > 0.3 ? "tornado " : "wall cloud ") + Math.round(d) + " m to the " + stcBearing(N.x - x, N.z - z) : "heading out") + " · press E to get out");
worldPrompt("<b>Chase truck</b> · <b>press E</b> to get out here", function () { stcRideStop(); });
},
function () {
var R = STC.ride;
STC.ride = null;
worldPrompt(null);
if (!R)
return;
var P = camera.position;
P.y = 1.72;
var T = STC.truck;
if (T) {
var x = T.position.x, z = T.position.z;
P.x = STC.base + x + 2.2;
P.z = z;
}
stcSay("🚙 You climb out. The truck waits here; press E at it to ride on or go back to town.");
stcTruckSpot();
},
function () {
var T = STC.truck;
if (!T || STC.truckSpot)
return;
STC.truckSpot = stcSpot(0, 0, 4, "The chase truck", "ride with the team", function () { stcTruckMenu(); }, { when: function () { var T2 = STC.truck; if (!T2)
return false; STC.truckSpot.x = T2.position.x; STC.truckSpot.z = T2.position.z; return Math.hypot(T2.position.x - STC.truckHome.x, T2.position.z - STC.truckHome.z) > 20; } });
},
function () {
var R = STC.ride;
STC.ride = null;
worldPrompt(null);
var T = STC.truck, x = T ? T.position.x : 0, z = T ? T.position.z : 0;
if (R && R.back) {
if (T) {
T.position.set(STC.truckHome.x, 0, STC.truckHome.z);
T.rotation.y = STC.truckHome.ry;
}
var P = camera.position;
P.set(STC.base + 8, 1.72, -15);
stcSay("🚙 Back at the garage. \"Good chase,\" says June.");
return;
}
var P2 = camera.position;
P2.set(STC.base + x + 2.2, 1.72, z);
stcTruckSpot();
stcTruckMenu(true);
},
function (arrived) {
var T = STC.truck, x = T ? T.position.x : 0, z = T ? T.position.z : 0, S = null, bd = 1e9;
STC_SKY.storms.forEach(function (s) { if (s.stage === "gone")
return; var d = Math.hypot(s.x - x, s.z - z); if (d < bd) {
bd = d;
S = s;
} });
var f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🚙 " + (arrived ? "In position" : "The chase truck") + "</div><div style='opacity:.85;margin:4px 0 8px'>" +
(S ? (S.amp > 0.3 ? "A tornado, about EF" + S.ef + ", is " + Math.round(bd) + " m to the " + stcBearing(S.x - x, S.z - z) + ", moving north-east at " + Math.round(S.sp * 2.237) + " mph. Its funnel is about " + Math.round(S.rB * 2) + " m wide at the ground." : "The wall cloud is " + Math.round(bd) + " m to the " + stcBearing(S.x - x, S.z - z) + "; a funnel is coming down.") : "No tornado on the ground near here. The next storm is building to the south-west.") + "</div>";
if (S && !STC.probe) {
b += worldBtn("probe", "Set the probe in its path", "June runs it out to the road ahead of the tornado");
f.probe = function () { stcProbeDrop(S); };
}
if (STC.probe && !STC.probe.done)
b += "<div style='opacity:.8;margin:6px 0'>The probe is out, " + Math.round(Math.hypot(STC.probe.x - x, STC.probe.z - z)) + " m away. Watch it!</div>";
b += worldBtn("again", "Chase the nearest storm", "ride to get in front of it again");
f.again = function () { worldCard(null); var tk = STC.truck; STC.truckHome2 = { x: tk.position.x, z: tk.position.z }; stcChaseFrom(x, z); };
b += worldBtn("home", "Ride back to town", "");
f.home = function () { worldCard(null); STC.ride = { pts: [[x, z], [x, Math.round(z / 400) * 400 + 4], [4, Math.round(z / 400) * 400 + 4], [4, -15]], i: 0, s: 0, sp: 40, S: null, back: true }; };
b += worldBtn("stay", "Stay and watch", "the truck waits here");
f.stay = function () { worldCard(null); };
worldCard(b, f);
},
function (S) {
var T = STC.truck, x = T.position.x, z = T.position.z;
var dx = x - S.x, dz = z - S.z, along = dx * S.hx + dz * S.hz;
if (along < 80)
along = 80;
var err = (Math.random() - 0.5) * Math.max(40, S.rB * 2.4), px = -S.hz, pz = S.hx;
var X = S.x + S.hx * along + px * err, Z = S.z + S.hz * along + pz * err;
var g = new THREE.Group();
g.position.set(X, 0, Z);
g.userData.keep = 1;
STC.G.add(g);
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.4, 0.28, 16), stcMat(0xD86A2A, "metal", { phong: 40 }));
c.position.y = 0.14;
g.add(c);
var gl = stcLamp(0, 0.5, 0, 0xFF8A40, 1.2, g);
STC.probe = { g: g, x: X, z: Z, S: S, min: 1e9, done: false, peakP: 0, peakW: 0 };
worldCard(null);
stcSay("🟠 <b>Probe down</b>, " + Math.round(Math.hypot(X - x, Z - z)) + " m away on the tornado's track. June sprints back: \"Go, go!\" Now watch it pass.");
stcDid("probe");
},
function () {
var P = STC.probe;
if (!P || P.done)
return;
var S = P.S, d = Math.hypot(S.x - P.x, S.z - P.z);
if (S.stage !== "gone" && d < P.min) {
P.min = d;
var rr = Math.max(10, S.rB);
var k = Math.max(0, 1 - d / (rr * 3));
P.peakP = Math.max(P.peakP, (10 + S.ef * 18) * Math.pow(k, 1.6) * S.amp);
P.peakW = Math.max(P.peakW, (40 + [65, 86, 111, 136, 166, 205][S.ef] * Math.pow(Math.max(0, 1 - d / (rr * 4)), 0.7)) * S.amp);
}
var passed = S.stage === "gone" || (d > P.min + 120 && P.min < 1e8);
if (!passed)
return;
P.done = true;
var hit = P.min < Math.max(10, S.rB);
stcCard(hit ? "🎯 A direct hit!" : P.min < Math.max(10, S.rB) * 3 ? "📈 Close: good data" : "📉 A near miss", "The probe's record", [
["Closest the tornado came", Math.round(P.min) + " m"], ["Pressure drop", Math.round(P.peakP) + " mb"], ["Strongest wind", Math.round(P.peakW) + " mph"], ["The tornado's rating", "EF" + S.ef + " (" + STC_EF[S.ef][1] + ")"]
], [hit ? "Real teams spent years trying for this. The record is a 100 mb drop, Manchester, South Dakota, 2003." : "Tornadoes jog and wobble: even the best teams miss most of the time. Ride out again!"]);
var p = stcProg();
if (hit)
p.hits = (p.hits || 0) + 1;
stcProgSave();
setTimeout(function () { if (P.g && P.g.parent)
P.g.parent.remove(P.g); if (STC.probe === P)
STC.probe = null; }, 15000);
},
function (i) {
var D = STC_DAMAGE[i], f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Damage point " + (i + 1) + " of 6</div><div style='margin:6px 0 8px'>" + stcEsc(D[1]) + "</div><div style='opacity:.8'>What would you rate it?</div>";
STC_EF.forEach(function (e) { b += worldBtn("e" + e[0], "EF" + e[0], e[1]); f["e" + e[0]] = function () { stcRated(i, e[0]); }; });
worldCard(b, f);
},
function (i, ef) {
var D = STC_DAMAGE[i], ok = ef === D[2], p = stcProg();
p.rate = p.rate || {};
p.rate[i] = ok ? 1 : 0;
stcProgSave();
var n = Object.keys(p.rate).filter(function (k) { return p.rate[k]; }).length;
stcCard(ok ? "✓ EF" + D[2] + ": right" : "The survey team says EF" + D[2], STC_EF[D[2]][1], [["What shows it", STC_EF[D[2]][2]], ["Your survey", n + " of 6 rated right"]], [ok ? "That's how the Weather Service does it: the worst damage to a well-built thing sets the rating." : "Look at what kind of building it was, and how much was left standing: a well-built house with its walls down is worse than a mobile home rolled over."]);
},
function (key, x, z, ry) {
var Gd = STC_GUIDES[key];
if (!Gd)
return null;
var look = Object.assign({ sex: Gd.sex, age: Gd.age }, Gd.look || {}), g = stcPersonFig("g_" + key, x, 0, z, ry, look, Gd.title);
STC.people.push({ g: g, key: key, still: true });
stcSpot(x, z, 2.6, Gd.n, "talk with " + (Gd.sex === "f" ? "her" : "him"), function () { stcTalk(key); });
return g;
},
function (key) {
if (typeof openTalk !== "function")
return;
if (!stcCfg().talk && !stcKeeper()) {
stcSay("🌪️ Everyone's busy watching the sky for now (the Keeper's choice). The exhibits and instruments are all open.");
return;
}
var Gd = STC_GUIDES[key], wk = "stc:" + key, c = null;
if (!Gd)
return;
(store.characters || []).forEach(function (x) { if (x.wKey === wk)
c = x; });
var P = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "s" + Date.now()), wKey: wk, archetype: "human", name: Gd.n, aka: [], details: [Gd.title + " in Stormhaven"], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: "here", visible: false, city: true,
look: Object.assign({ sex: Gd.sex }, Gd.look || {}), age: Gd.age, sex: Gd.sex };
c.log.push({ who: "them", text: Gd.hi });
if (store.characters)
store.characters.push(c);
}
c.stc = key;
c.name = Gd.n;
c.x = P.x;
c.z = P.z;
c.visible = false;
worldPrompt(null);
openTalk(c);
},
function (c) {
var Gd = STC_GUIDES[c.stc];
if (!Gd)
return "";
var notes = stcCfg().notes, live = STC_SKY.storms.filter(function (S) { return S.stage !== "gone"; });
var sky = live.length ? "Right now " + live.length + " storm" + (live.length > 1 ? "s are" : " is") + " over the plains" + (live.some(function (S) { return S.amp > 0.3; }) ? ", with a tornado on the ground (the strongest about EF" + Math.max.apply(null, live.map(function (S) { return S.ef; })) + "), moving north-east, missing town" : "") + "." : "Right now the sky is quieter; new storms are building to the south-west.";
var L = [
"You are " + Gd.n + ", " + Gd.age + " years old, " + Gd.title + " in Stormhaven, a small prairie town in Tornado Alley on the US Great Plains. Speak in the first person, wholly in character, at all times.",
"Who you are: " + Gd.g,
sky,
"Teach real weather science. Keep to what is true (US National Weather Service, NOAA, the Storm Prediction Center): real numbers, real events, real instruments. Say plainly when something is not known. Never invent statistics, quotes or records.",
"Always put safety first: never encourage anyone to go near a real tornado, drive into a storm, or shelter under an overpass. If someone seems frightened of storms, be calm and reassuring and tell them how to stay safe.",
"If the visitor seems young, use short words and be warm. Ask a question back now and then.",
"Hold a real conversation: answer what was just said, remember what was said, vary the length (two to five sentences unless they want more), and never repeat a sentence.",
"Never say you are an AI, a model or a character in a game. Refuse harm kindly: no instructions for weapons or explosives of any kind, nothing frightening or sexual. Speak of storm deaths and losses gently and with respect.",
notes ? "The Keeper of this place asks everyone here: " + notes : "",
typeof dreamerBrief === "function" ? dreamerBrief() : ""
];
return L.filter(Boolean).join(" ");
},
function (at) {
var A = STC_AT[at] || STC_AT.town, x = A[0], z = A[1], y = A[3] || 0;
STC_HP.down = 0;
if (at === "intercept") {
var N = STC_SKY.storms.filter(function (S) { return S.stage !== "gone"; })[0];
if (N) {
x = N.x + N.hx * 500 + N.hz * 260;
z = N.z + N.hz * 500 - N.hx * 260;
var R = Math.hypot(x, z);
if (R > 1350) {
x *= 1350 / R;
z *= 1350 / R;
}
}
}
if (at === "intercept" && STC.K) {
for (var k = 0; k < 90 && (stcSolidAt(STC.K, x, z, 0) || Math.abs(stcGroundAt(STC.K, x, z, 0)) > 0.25); k++) {
x += Math.cos(k * 2.4) * (2 + k);
z += Math.sin(k * 2.4) * (2 + k);
}
}
camera.position.set(STC.base + x, y + 1.72, z);
if (typeof yaw !== "undefined")
yaw = A[2];
if (typeof pitch !== "undefined")
pitch = at === "intercept" ? 0.15 : 0;
if (typeof flyY !== "undefined")
flyY = 0;
},
function (G) {
STC.G = G;
STC.lite = stcLite();
STC.geos = {};
STC.people = [];
STC.beasts = [];
STC.cars = [];
STC.cupsG = [];
STC.vanes = [];
STC.blades = [];
STC.truckSpot = null;
STC.probe = null;
STC.ride = null;
STC.balloon = null;
STC.treeList = [];
var K = STC.K = stcCtx();
K.F = G;
STCK = K;
[stcLand, stcTown, stcFarm, stcPlains, stcCrops, stcFill, stcLife].forEach(function (f) { STCK.F = G; try {
f();
}
catch (e) {
if (window.console)
console.warn("[storms] build", f.name, e);
} });
try {
if (typeof gwBake === "function")
gwBake(G);
}
catch (e) {
if (window.console)
console.warn("[storms] bake", e);
}
stcSkyBuild(G);
stcStormsBuild(G);
stcIndex(K);
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
STC_SKY.storms[0].wait = 0.5;
STC_SKY.storms[1].wait = 40;
STC_SKY.storms[2].wait = 90;
STC.built = true;
},
function () {
for (var k in STC.mats) {
var m = STC.mats[k];
if (!m)
continue;
if (m.isTexture) {
try {
m.dispose();
}
catch (e) { }
continue;
}
if (m.map && m.map.isCanvasTexture)
try {
m.map.dispose();
}
catch (e) { }
if (m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var g in STC.geos) {
try {
STC.geos[g].dispose();
}
catch (e) { }
}
STC.mats = {};
STC.geos = {};
STC.K = null;
STCK = null;
STC.G = null;
STC.built = false;
STC.people = [];
STC.beasts = [];
STC.cars = [];
STC.cupsG = [];
STC.blades = [];
stcHandsReset();
STC.truck = null;
STC.horizon = null;
STC.fields = [];
STC.truckSpot = null;
STC.probe = null;
STC.ride = null;
STC.balloon = null;
STC.radarScr = null;
STC.jacks = [];
STC.pivot = null;
STC.model = null;
STC.modelSpin = null;
STC.dish = null;
STC.vane = null;
STC.vanes = [];
STC.dishEl = null;
STC.baroHand = null;
STC.barograph = null;
STC.psy = null;
STC.rainTube = null;
STC.fillBal = null;
STC.turtleLed = null;
STC.ldScreen = null;
STC.siren = null;
STC.lake = null;
STC_SKY.storms = [];
STC_SKY.spout = null;
STC_SKY.haboob = null;
STC_SKY.bolt = null;
STC_SKY.fall = null;
STC_SKY.deck = null;
STC_SKY.near = null;
},
function () {
var n = STC.lite ? 7 : 14, r = stcRnd(31);
for (var i = 0; i < n; i++) {
var side = i % 2 ? 1 : -1, z = -120 + r() * 240, x = side * (8.2 + r() * 0.8);
var look = Object.assign({ sex: i % 3 === 0 ? "f" : "m", age: 18 + Math.floor(r() * 55) }, STC_DRESS[i % STC_DRESS.length]);
var g = stcPersonFig("tf" + i, x, 0.16, z, side > 0 ? Math.PI : 0, look, i % 4 === 0 ? "storm chaser" : "");
STC.people.push({ g: g, walk: { side: side, tz: z, wait: r() * 6, sp: 0.9 + r() * 0.5 } });
}
var watch = STC.lite ? 2 : 5;
for (var w = 0; w < watch; w++) {
var wx = -30 + w * 14, wz = -190;
var g2 = stcPersonFig("cw" + w, wx, 0, wz, 0.6, Object.assign({ sex: w % 2 ? "f" : "m", age: 24 + w * 7 }, STC_DRESS[(w + 3) % STC_DRESS.length]), "storm chaser");
stcBox(0.12, 0.1, 0.18, stcMat(0x1A1A1A, null), 0.15, 1.45, -0.25, g2);
STC.people.push({ g: g2, still: true });
stcRound(wx, wz, 0.35, 0, 1.8);
}
var nc = STC.lite ? 2 : 5, roads = [["z", 3.5, 1], ["z", -3.5, -1], ["x", 400 + 3, 1], ["x", -400 - 3, -1], ["z", -800 + 3, 1]];
for (var c = 0; c < nc; c++) {
var R = roads[c];
var g3 = stcCar(["sedan", "pickup", "suv", "pickup", "sedan"][c], 0, 0, 0, { keep: true, col: [0x8A9096, 0xB8241E, 0x1E3A6A, 0xE8E6E0, 0x2A2C30][c] });
if (!g3)
continue;
STC.cars.push({ g: g3, ax: R[0], lane: R[1], dir: R[2], s: -1400 + c * 560, sp: 16 + c * 2 });
}
},
function (dt) {
var lim = STC.lite ? 0.05 : 0.033, d = Math.min(dt, lim);
STC.people.forEach(function (P) {
var W = P.walk;
if (!W)
return;
var g = P.g;
if (W.wait > 0) {
W.wait -= d;
return;
}
var dz = W.tz - g.position.z;
if (Math.abs(dz) < 0.3) {
W.wait = 2 + Math.random() * 8;
W.tz = -120 + Math.random() * 240;
return;
}
var st = Math.min(Math.abs(dz), W.sp * d) * Math.sign(dz);
g.position.z += st;
g.rotation.y = dz > 0 ? 0 : Math.PI;
});
STC.beasts.forEach(function (B) {
var g = B.g;
if (B.wait > 0) {
B.wait -= d;
return;
}
var dx = B.tx - g.position.x, dz = B.tz - g.position.z, dd = Math.hypot(dx, dz);
if (dd < 0.4) {
B.wait = 4 + Math.random() * 10;
var a = Math.random() * 6.28, rr = Math.random() * B.r;
B.tx = B.hx + Math.cos(a) * rr;
B.tz = B.hz + Math.sin(a) * rr;
return;
}
var s = Math.min(dd, B.sp * d);
g.position.x += dx / dd * s;
g.position.z += dz / dd * s;
g.rotation.y = Math.atan2(dx, dz);
});
STC.cars.forEach(function (C) {
C.s += C.sp * dt * C.dir;
if (C.s > 1500)
C.s = -1500;
if (C.s < -1500)
C.s = 1500;
var inTown = C.ax === "z" && Math.abs(C.s) < 140;
if (inTown)
C.s -= C.sp * dt * C.dir * 0.6;
if (C.ax === "z") {
C.g.position.set(C.lane, 0, C.s);
C.g.rotation.y = C.dir > 0 ? 0 : Math.PI;
}
else {
C.g.position.set(C.s, 0, C.lane);
C.g.rotation.y = C.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
}
});
},
function () {
var L = worldLocal(), feet = L.y - 1.72, K = STC.K, rm = K ? stcRoomAt(K, L.x, L.z, feet) : null, E = feet < -1 ? STC_ENV.below : rm ? STC_ENV.inside : STC_ENV.out;
var dust = stcInDust(L.x), glow = STC_SKY.glow || 0;
if (dust > 0.01 || glow > 0.01) {
E = Object.assign({}, E);
if (dust > 0.01 && E !== STC_ENV.below) {
var c = new THREE.Color(E.fog).lerp(new THREE.Color(0x9A7A52), dust);
E.fog = c.getHex();
E.low = new THREE.Color(E.low).lerp(new THREE.Color(0x8A6A48), dust).getHex();
E.fogD = E.fogD + dust * 0.012;
E.sun = E.sun * (1 - dust * 0.6);
}
if (glow > 0.01)
E.hemi = E.hemi + glow * 0.14;
}
if (STC.lite && E.fogD < 0.0012)
E = Object.assign({}, E, { fogD: 0.0012 });
return E;
},
function () {
STCK = STC.K;
stcArrive(STC.wantAt || "town");
STC.wantAt = null;
stcSay("🌪️ <b>Stormhaven, in Tornado Alley.</b> A tornado watch is out, and a supercell is building to the south-west. Town is sheltered; out on the plains the storms are dangerous: wind, flying debris, hail and lightning can take you down. The Storm Prediction Office and the Museum are up Main Street; the chasers' garage is across from them.");
},
function () {
worldCard(null);
STC.ride = null;
if (typeof stars !== "undefined" && stars)
stars.visible = true;
clearTimeout(STC.lgT);
STC.lgT = setTimeout(function () { if (WLD.on !== STC.key && typeof worldLetGo === "function")
worldLetGo(STC.key); }, 20000);
},
function (dt) {
var K = STC.K;
if (!K)
return;
STCK = K;
STC.t += dt;
STC_SKY.t += dt;
var t = STC.t;
if (typeof stars !== "undefined" && stars && stars.visible)
stars.visible = false;
var L = worldLocal(), feet = L.y - 1.72, rm = stcRoomAt(K, L.x, L.z, feet), inside = !!rm || feet < -1;
try {
STC_SKY.storms.forEach(function (S) { stcStormTick(S, dt); });
stcSpoutTick(dt);
stcHaboobTick(dt);
stcBoltTick(dt);
if (STC_SKY.deck) {
STC_SKY.deck.position.x = L.x;
STC_SKY.deck.position.z = L.z;
var mp = STC_SKY.deck.material.map;
mp.offset.x += dt * 0.004;
mp.offset.y -= dt * 0.003;
}
if (stcDownTick(dt)) {
stcHurtPaint();
return;
}
stcRideTick(dt);
stcWindTick(dt, L, feet, inside);
stcHurtPaint();
stcFallTick(dt, L, inside);
stcBalloonTick(dt);
stcProbeTick();
stcRadarTick(dt);
stcLifeTick(dt);
stcFillTick(dt);
stcHorizonTick();
stcHandsTick(dt);
var wind = stcReadings(L.x, L.z), spin = dt * (2 + wind.wind * 0.25);
(STC.cupsG || []).forEach(function (c) { c.rotation.y -= spin; });
(STC.blades || []).forEach(function (b) { b.rotation.x += dt * 1.1; });
if (STC.vane && STC.vane.parent)
STC.vane.parent.rotation.y = -wind.dir * Math.PI / 180;
if (STC.modelSpin)
STC.modelSpin.forEach(function (m, i) { m.rotation.y += dt * (0.4 + i * 0.2); });
if (STC.dish)
STC.dish.rotation.y += dt * 0.8;
stcGearTick(dt, wind);
}
catch (e) {
if (!STC.e1) {
STC.e1 = 1;
if (window.console)
console.warn("[storms] tick", e);
}
}
var warn = STC_SKY.storms.some(function (S) { return S.stage !== "gone" && S.amp > 0.3 && Math.hypot(S.x, S.z) < 1300; });
var N = STC_SKY.near;
if (!(STC.balloon && STC.balloon.alive) && !STC.ride) {
var head = "<b>🌪️ Tornado Alley</b>" + (rm ? " · " + stcEsc(rm.name) : Math.hypot(L.x, L.z) < 160 ? " · Stormhaven" : "") + (warn ? " · <span style='color:#FF9A7A'>⚠ Tornado warning</span>" : " · <span style='color:#FFD27A'>Tornado watch</span>") + (STC_HP.hp < 100 ? " · <span style='color:" + (STC_HP.hp < 40 ? "#FF7A7A" : "#FFD0A0") + "'>❤ " + Math.round(STC_HP.hp) + "</span>" : stcSheltered(L, feet, inside) ? " · sheltered" : " · <span style='color:#FF9A7A'>exposed</span>") +
(N && N.S.amp > 0.3 && !inside ? " · tornado " + (N.d < 1000 ? Math.round(N.d) + " m" : (N.d / 1609).toFixed(1) + " mi") + " " + stcBearing(N.S.x - L.x, N.S.z - L.z) : "");
worldBanner(head);
}
if (warn && !STC_SKY.warn) {
STC_SKY.warn = true;
stcSay("🚨 <b>Tornado warning for Stormhaven.</b> A tornado is on the ground on the plains. In real life: go to the lowest floor, an inner room, cover your head. (The town shelter is under the fire station.)");
}
if (!warn)
STC_SKY.warn = false;
STC.pt += dt;
if (STC.pt < 0.15)
return;
STC.pt = 0;
if (STC.ride)
return;
if (WLD.card && WLD.card.style.display === "block") {
if (STC.myFn && WLD.promptFn === STC.myFn)
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
STC.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + stcEsc(best.verb), fn);
}
else if (STC.myFn && WLD.promptFn === STC.myFn) {
worldPrompt(null);
STC.myFn = null;
}
},
function () {
var b = "", f = {}, inW = WLD.on === STC.key, p = stcProg();
var rows = [["The storms", "Supercells with real tornadoes (EF0 to EF5) crossing the plains, a waterspout, hail, lightning and dust storms"],
["To do", "Ride with the chase team, drop a probe in a tornado's path, launch a weather balloon, read the radar and the instruments, rate a damage path, take the Storm Spotter course"],
["You", (p.spotter ? "🎓 Storm Spotter · " : "") + Object.keys(p.did).length + " things done" + (p.hits ? " · " + p.hits + " direct probe hit" + (p.hits > 1 ? "s" : "") : "")]];
var go = function (at, label, sub) { b += worldBtn("g_" + at, label, sub || ""); f["g_" + at] = function () { worldCard(null); stcGo(at); }; };
go("town", "Stormhaven: Main Street", "the town in the middle of it all");
go("office", "The Storm Prediction Office", "the radar wall, watches and warnings");
go("museum", "The Storm Science Museum", "the EF scale, hail, records, the Storm Spotter course");
go("garage", "The Chasers' Garage", "the instruments and the chase truck");
go("balloon", "The balloon launch pad", "launch a weather balloon");
go("survey", "The damage path", "rate the damage like a survey team");
go("intercept", "Out on the plains", "in front of a tornado");
if (inW) {
b += worldBtn("out", "Leave", "back to where you were");
f.out = function () { stcLeave(); };
}
worldCard(worldFacts("🌪️ Tornado Alley", "storm chasing on the Great Plains · real storms, real instruments", rows, ["Dangerous out on the plains: a storm's wind, debris, hail and lightning can take you down (you wake in the town storm shelter; a storm takes no gold). Town, indoors and below ground are sheltered."]) + b, f);
},
function () {
var P = stcP(), lite = STC.lite, r = stcRnd(1234), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), V = new THREE.Vector3(), Sc = new THREE.Vector3();
function clear(x, z, pad) {
if (Math.hypot(x, z) < 300 + pad)
return false;
if (Math.hypot(x + 520, z - 420) < 200 + pad)
return false;
for (var k = -3; k <= 3; k++) {
if (Math.abs(x - k * 400) < 8 + pad || Math.abs(z - k * 400) < 8 + pad)
return false;
}
if (Math.abs(x - 40) < 6 + pad)
return false;
if (x > 330 && x < 920 && z < -280 && z > -540)
return false;
for (var q = 0; q < STC_FARMS.length; q++)
if (Math.hypot(x - STC_FARMS[q][0] - 7, z - STC_FARMS[q][1]) < 48 + pad)
return false;
if (Math.hypot(x - 300, z - 230) < 110 + pad || Math.hypot(x + 600, z + 600) < 200 + pad || Math.hypot(x - 90, z + 150) < 30 + pad || Math.hypot(x - 130, z + 110) < 20 + pad)
return false;
return true;
}
function inst(geo, mat, list, name) {
var im = new THREE.InstancedMesh(geo, mat, list.length);
list.forEach(function (t, i) { E.set(t[4] || 0, t[3] || 0, 0); Q.setFromEuler(E); V.set(t[0], t[1], t[2]); Sc.set(t[5] || 1, t[6] || t[5] || 1, t[7] || t[5] || 1); M.compose(V, Q, Sc); im.setMatrixAt(i, M); });
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
im.name = name || "stc-fill";
P.add(im);
return im;
}
var patch = stcCanvasMat("macro", 512, 512, function (c, W, H) {
c.clearRect(0, 0, W, H);
var q = stcRnd(77);
for (var i = 0; i < 70; i++) {
var x = q() * W, y = q() * H, rr = 20 + q() * 90, g = c.createRadialGradient(x, y, 0, x, y, rr), col = q() < 0.5 ? "70,92,40" : q() < 0.5 ? "150,130,80" : "96,110,52";
g.addColorStop(0, "rgba(" + col + ",0.55)");
g.addColorStop(1, "rgba(" + col + ",0)");
c.fillStyle = g;
for (var ox = -1; ox <= 1; ox++)
for (var oy = -1; oy <= 1; oy++) {
c.beginPath();
c.arc(x + ox * W, y + oy * H, rr, 0, 7);
c.fill();
}
}
}, { rep: [4, 4], op: 1, full: true });
var mg = stcFlat(3400, 3400, patch, 0, -0.05, 0);
mg.renderOrder = 1;
var nf = lite ? 5 : STC_FARMS.length, bin = stcMat(0xB8BEC4, "metal", { phong: 50 }), white = stcMat(0xD8D4CA, "siding"), barnR = stcMat(0x8A2A22, "wood"), cols = [white, stcMat(0xC8B494, "siding"), stcMat(0xA8B8C8, "siding"), stcMat(0xE0D8C0, "siding")];
for (var f = 0; f < nf; f++) {
var F = STC_FARMS[f], fx = F[0], fz = F[1];
stcBuilding({ x0: fx - 6, z0: fz - 5, x1: fx + 6, z1: fz + 5, h: 3.2, wall: cols[f % cols.length], roof: "gable", doors: [{ side: "s", at: fx, w: 1.1 }], name: "A farmhouse", win: 3.5 });
stcTable(fx, fz, 1.6, 1);
stcBed(fx - 3.5, fz - 2, Math.PI / 2);
stcAwning(fx, fz + 5, 8, 1.8, "s", 2.6, stcMat(0x4A4A4A, "shingle"));
stcBuilding({ x0: fx + 14, z0: fz - 10, x1: fx + 28, z1: fz + 8, h: 6, wall: f % 2 ? barnR : stcMat(0x8A8E94, "metal"), roof: "gable", doors: [{ side: "s", at: fx + 21, w: 4.5 }], name: "A barn", win: 9, roofMat: stcMat(0x5A5E64, "metalroof") });
for (var b = 0; b < (lite ? 2 : 3); b++) {
var bx = fx - 14 - b * 8, bz = fz - 12;
stcCyl(3.2, 7, bin, bx, 3.5, bz, null, lite ? 12 : 20);
var cp = new THREE.Mesh(new THREE.ConeGeometry(3.4, 2.2, lite ? 12 : 20), bin);
cp.position.set(bx, 8.1, bz);
P.add(cp);
stcRound(bx, bz, 3.3, 0, 9);
}
for (var w = 0; w < (lite ? 5 : 12); w++) {
stcTree(fx - 30 + w * 6, fz - 24, 0.9 + (w % 3) * 0.15);
}
for (var w2 = 0; w2 < (lite ? 3 : 7); w2++) {
stcTree(fx - 34, fz - 18 + w2 * 6, 1);
}
if (!lite || f < 3) {
if (f % 2)
stcCar(f % 4 === 1 ? "pickup" : "suv", fx + 8, fz + 10, f, { col: [0xB8241E, 0x8A9096, 0x2A2C30, 0x5A6A4A][f % 4], solid: 1 });
else
stcCar("tractor", fx + 8, fz + 10, f, { alt: f % 4 === 0, solid: 1 });
}
}
STC.jacks = [];
var jk = [[-470, -330], [320, 560], [-780, 120], [980, 520], [-120, -1180], [1180, -980]];
jk.slice(0, lite ? 3 : 6).forEach(function (p, i) {
var g = stcGroup(p[0], 0, p[1], i * 0.9), dk = stcMat(0x3A3A40, "metal", { phong: 40 }), yl = stcMat(0xC8A030, "metal", { phong: 40 });
stcBox(6, 0.4, 2, stcMat(0x8A8680, "concrete"), 0, 0.2, 0, g);
stcBox(0.4, 4, 0.4, dk, 0, 2.2, 0.6, g);
stcBox(0.4, 4, 0.4, dk, 0, 2.2, -0.6, g);
var beam = stcGroup(0, 4.3, 0, 0, g);
stcBox(7, 0.5, 0.4, yl, 0.5, 0, 0, beam);
var head = stcBox(0.6, 1.8, 0.5, yl, 3.9, -0.5, 0, beam);
stcBox(1.4, 1.2, 0.3, dk, -2.5, -0.8, 0, beam);
stcCyl(0.08, 3.2, dk, 3.9, 1.6, 0, g, 6);
stcSolid(p[0], p[1], 3.2, 1.2, 0, 5);
STC.jacks.push({ b: beam, ph: i * 1.3 });
});
var pv = stcGroup(-600, 0, -600, 0);
var green = new THREE.Mesh(new THREE.CircleGeometry(190, lite ? 24 : 48), stcMat(0x4E7A2E, "foliage"));
green.rotation.x = -Math.PI / 2;
green.position.y = 0.025;
pv.add(green);
var arm = stcGroup(0, 0, 0, 0, pv);
STC.pivot = arm;
var steel = stcMat(0xA8AEB4, "metal", { phong: 40 });
stcCyl(0.3, 4, steel, 0, 2, 0, arm, 8);
stcBox(185, 0.25, 0.25, steel, 92.5, 3.8, 0, arm);
for (var t = 1; t <= (lite ? 4 : 8); t++) {
var tx = t * 185 / (lite ? 4 : 8);
[-1, 1].forEach(function (s) { var leg = stcBox(0.15, 4, 0.15, steel, tx, 1.9, s * 1.2, arm); leg.rotation.x = -s * 0.3; });
stcCyl(0.6, 0.3, stcMat(0x2A2A2A, null), tx, 0.6, 1.4, arm, 10).rotation.x = Math.PI / 2;
}
stcRound(-600, -600, 0.5, 0, 4);
var bales = [], bushes = [], tufts = [], posts = [];
var nb = lite ? 60 : 180;
for (var i = 0; i < nb; i++) {
var x = (r() - 0.5) * 2800, z = (r() - 0.5) * 2800;
if (!clear(x, z, 6))
continue;
bales.push([x, 0.85, z, r() * 3, Math.PI / 2, 1]);
}
var bg = new THREE.CylinderGeometry(0.85, 0.85, 1.5, lite ? 10 : 16);
bg.rotateX(0);
inst(bg, stcMat(0xC8A858, "thatch"), bales, "stc-bales");
bales.forEach(function (b) { STCK.solids.push({ x: b[0], z: b[2], r: 0.9, b: 0, h: 1.7 }); });
var nbu = lite ? 200 : 700;
for (i = 0; i < nbu; i++) {
var x2 = (r() - 0.5) * 2900, z2 = (r() - 0.5) * 2900;
if (!clear(x2, z2, 3))
continue;
var sc = 0.6 + r() * 1.4;
bushes.push([x2, sc * 0.4, z2, r() * 6, 0, sc, sc * 0.7, sc]);
}
inst(new THREE.IcosahedronGeometry(1, lite ? 0 : 1), stcMat(0x4A6A2E, "foliage"), bushes, "stc-bushes");
var nt = lite ? 3000 : 12000;
for (i = 0; i < nt; i++) {
var a = r() * 6.283, d = 240 + Math.pow(r(), 1.6) * 900, x3 = Math.cos(a) * d, z3 = Math.sin(a) * d;
if (!clear(x3, z3, 1.5) && Math.hypot(x3, z3) >= 300)
continue;
if (stcOnRoadPad(x3, z3, 2.2))
continue;
if (Math.hypot(x3, z3) < 240)
continue;
var ts = 1 + r() * 1.4;
tufts.push([x3, 0.42 * ts, z3, r() * 3, 0, ts * 1.6, ts, ts * 1.6]);
}
for (var fq = 0; fq < nf; fq++) {
var FF = STC_FARMS[fq];
for (var u = 0; u < (lite ? 160 : 900); u++) {
var ua = r() * 6.283, ud = 12 + Math.sqrt(r()) * 70, ux = FF[0] + 7 + Math.cos(ua) * ud, uz = FF[1] + Math.sin(ua) * ud;
if (ux > FF[0] - 36 && ux < FF[0] + 31 && uz > FF[1] - 28 && uz < FF[1] + 16)
continue;
if (Math.abs(ux - FF[0] - 8) < 4 && uz > FF[1])
continue;
if (stcOnRoadPad(ux, uz, 2.2))
continue;
var us = 0.8 + r() * 1.2;
tufts.push([ux, 0.42 * us, uz, r() * 3, 0, us * 1.6, us, us * 1.6]);
}
}
var tg = new THREE.PlaneGeometry(0.9, 0.9), tg2 = tg.clone();
tg2.rotateY(Math.PI / 2);
var tm = (typeof THREE.BufferGeometryUtils !== "undefined" && THREE.BufferGeometryUtils.mergeBufferGeometries) ? THREE.BufferGeometryUtils.mergeBufferGeometries([tg, tg2]) : tg;
var tuftMat = stcCanvasMat("tuft", 64, 64, function (c, W, H) { c.clearRect(0, 0, W, H); var q = stcRnd(5); for (var k = 0; k < 22; k++) {
var x = 8 + q() * 48;
c.strokeStyle = q() < 0.5 ? "#7A8A3A" : "#A8A058";
c.lineWidth = 2;
c.beginPath();
c.moveTo(x, H);
c.quadraticCurveTo(x + (q() - 0.5) * 14, H * 0.5, x + (q() - 0.5) * 20, 4 + q() * 20);
c.stroke();
} }, { full: true, ds: true, op: 1 });
tuftMat.alphaTest = 0.3;
tuftMat.transparent = false;
tuftMat.depthWrite = true;
inst(tm, tuftMat, tufts, "stc-grass");
for (var k = -3; k <= 3; k++) {
var c0 = k * 400;
for (var s = -1580; s < 1580; s += (lite ? 24 : 12)) {
[-1, 1].forEach(function (side) { var px = c0 + side * 7, pz = s; if (Math.hypot(px, pz) < 260)
return; if (Math.hypot(px + 520, pz - 420) < 190)
return; posts.push([px, 0.6, pz, 0, 0, 1]); var px2 = s, pz2 = c0 + side * 7; if (Math.hypot(px2, pz2) < 260 || Math.hypot(px2 + 520, pz2 - 420) < 190)
return; posts.push([px2, 0.6, pz2, 0, 0, 1]); });
}
}
inst(new THREE.CylinderGeometry(0.06, 0.07, 1.2, 4, 1, true), stcMat(0x7A6A55, "wood"), posts, "stc-posts");
var trees = [], creeks = [[[-1500, -200], [-900, -120], [-400, -300], [-100, -600], [300, -640], [900, -700], [1500, -560]], [[-1400, 1200], [-800, 900], [-300, 700], [200, 1100], [800, 1000], [1500, 1300]]];
creeks.forEach(function (cr) { for (var i2 = 0; i2 < cr.length - 1; i2++) {
var a0 = cr[i2], a1 = cr[i2 + 1], n = lite ? 6 : 16;
for (var j = 0; j < n; j++) {
var u = j / n, x4 = a0[0] + (a1[0] - a0[0]) * u + (r() - 0.5) * 30, z4 = a0[1] + (a1[1] - a0[1]) * u + (r() - 0.5) * 30;
if (!clear(x4, z4, 4))
continue;
trees.push([x4, 0, z4, r() * 6, 0, 1 + r() * 0.8]);
}
} });
trees.forEach(function (t) { stcTree(t[0], t[2], t[5]); });
var trunkG = new THREE.CylinderGeometry(0.3, 0.5, 6, lite ? 5 : 7);
trunkG.translate(0, 3, 0);
function crown(seed) {
var q = stcRnd(seed), parts = [];
for (var c = 0; c < 3; c++) {
var ig = new THREE.IcosahedronGeometry(3.2 + q() * 1.4, lite ? 0 : 1).toNonIndexed();
ig.scale(1, 0.8, 1);
ig.translate((q() - 0.5) * 3.4, 7.5 + q() * 2.4, (q() - 0.5) * 3.4);
parts.push(ig);
}
return typeof gwMerge === "function" ? gwMerge(parts) : parts[0];
}
var all = STC.treeList || [], sh = [[], [], []];
all.forEach(function (t, i) { sh[i % 3].push([t[0], 0, t[1], t[3], 0, t[2]]); });
inst(trunkG, stcMat(0x5A4632, "bark"), all.map(function (t) { return [t[0], 0, t[1], t[3], 0, t[2]]; }), "stc-trunks");
inst(crown(3), stcMat(0x3E5E2A, "foliage"), sh[0], "stc-crowns");
inst(crown(8), stcMat(0x4E6A30, "foliage"), sh[1], "stc-crowns2");
inst(crown(13), stcMat(0x35502A, "foliage"), sh[2], "stc-crowns3");
all.forEach(function (t) { if (t[4])
return; STCK.solids.push({ x: t[0], z: t[1], r: 0.6 * t[2], b: 0, h: 6 }); });
var herd = [[-300, 300], [600, -200], [-900, -300]];
herd.slice(0, lite ? 1 : 3).forEach(function (h, i) { for (var c = 0; c < (lite ? 2 : 4); c++) {
var x5 = h[0] + (c % 3) * 9, z5 = h[1] + Math.floor(c / 3) * 8;
var g = stcKit("cow", x5, z5, c, 1.3, { keep: true });
if (g)
STC.beasts.push({ g: g, hx: x5, hz: z5, tx: x5, tz: z5, wait: Math.random() * 8, sp: 0.5, r: 25 });
} });
},
function (name, col) {
var k = "car|" + name + "|" + (col || 0);
if (STC.mats[k])
return STC.mats[k];
var m;
if (name === "paint")
m = new THREE.MeshPhongMaterial({ color: col, shininess: 60, specular: 0x4A4A4A });
else if (name === "glass")
m = new THREE.MeshPhongMaterial({ color: 0x121A22, shininess: 110, specular: 0x8A98A6 });
else if (name === "chrome")
m = new THREE.MeshPhongMaterial({ color: 0xB4BAC0, shininess: 100, specular: 0xDADADA });
else if (name === "trim")
m = new THREE.MeshLambertMaterial({ color: 0x18191B });
else if (name === "tyre")
m = new THREE.MeshLambertMaterial({ color: 0x1E1E1F });
else if (name === "head")
m = new THREE.MeshBasicMaterial({ color: 0xD8D8CC });
else if (name === "tail")
m = new THREE.MeshBasicMaterial({ color: 0x6A0E0E });
else if (name === "amber")
m = new THREE.MeshBasicMaterial({ color: 0xA8680E });
else if (name === "plate")
m = new THREE.MeshLambertMaterial({ color: 0xD8D4C4 });
else if (name === "liner")
m = new THREE.MeshLambertMaterial({ color: 0x26272A, side: THREE.DoubleSide });
else if (name === "paintds")
m = new THREE.MeshPhongMaterial({ color: col, shininess: 60, specular: 0x4A4A4A, side: THREE.DoubleSide });
STC.mats[k] = m;
return m;
},
function (pts, arches, yb) {
var s = new THREE.Shape();
s.moveTo(pts[0][0], pts[0][1]);
for (var i = 1; i < pts.length; i++) {
var p = pts[i];
if (p[0] === "q")
s.quadraticCurveTo(p[1], p[2], p[3], p[4]);
else
s.lineTo(p[0], p[1]);
}
arches.slice().sort(function (a, b) { return b[0] - a[0]; }).forEach(function (a) { s.lineTo(a[0] + a[1], yb); s.absarc(a[0], yb, a[1], 0, Math.PI, false); });
s.lineTo(pts[0][0], yb);
return s;
},
function (a, b, w, out) {
var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l, tx = dx / l, ty = dy / l, e = 0.07, o = out || 0.075;
var A = [a[0] + tx * e, a[1] + ty * e], B = [b[0] - tx * e, b[1] - ty * e], s = new THREE.Shape();
s.moveTo(A[0] + nx * o, A[1] + ny * o);
s.lineTo(B[0] + nx * o, B[1] + ny * o);
s.lineTo(B[0] - nx * 0.04, B[1] - ny * 0.04);
s.lineTo(A[0] - nx * 0.04, A[1] - ny * 0.04);
return stcExtrude(s, w, 0, true);
},
function (parent, x, z, r, tw, lite, side) {
var seg = lite ? 12 : 22, tyre = stcCarGeo("tyre" + r + "|" + tw + "|" + seg, function () {
var pts = [], h = tw / 2, rr = r, ri = r * 0.62;
pts.push(new THREE.Vector2(ri, -h * 0.92), new THREE.Vector2(rr * 0.9, -h), new THREE.Vector2(rr * 0.98, -h * 0.8), new THREE.Vector2(rr, -h * 0.5), new THREE.Vector2(rr, h * 0.5), new THREE.Vector2(rr * 0.98, h * 0.8), new THREE.Vector2(rr * 0.9, h), new THREE.Vector2(ri, h * 0.92));
var g = new THREE.LatheGeometry(pts, seg);
g.rotateX(Math.PI / 2);
return g;
}), rim = stcCarGeo("rim" + r + "|" + tw + "|" + seg, function () { var g = new THREE.CylinderGeometry(r * 0.62, r * 0.6, tw * 0.86, seg); g.rotateX(Math.PI / 2); return g; }), hub = stcCarGeo("hub" + r + "|" + tw, function () { var g = new THREE.CylinderGeometry(r * 0.2, r * 0.24, tw * 0.94, 10); g.rotateX(Math.PI / 2); return g; });
stcCarMesh(tyre, stcCarMat("tyre"), parent, x, r, z);
stcCarMesh(rim, stcCarMat("chrome"), parent, x, r, z);
stcCarMesh(hub, stcCarMat("trim"), parent, x, r, z);
if (!lite) {
var sp = stcCarGeo("spokes" + r + "|" + tw, function () { var parts = []; for (var i = 0; i < 5; i++) {
var b = new THREE.BoxGeometry(r * 0.09, r * 0.95, tw * 0.9);
b.rotateZ(i * Math.PI * 2 / 5);
parts.push(b.toNonIndexed());
} return typeof gwMerge === "function" ? gwMerge(parts) : parts[0]; });
stcCarMesh(sp, stcCarMat("trim"), parent, x, r, z + side * 0.005);
}
},
function (kind, x, z, ry, o) {
o = o || {};
var lite = STC.lite, g = stcGroup(x, o.y || 0, z, ry || 0);
if (o.keep)
g.userData.keep = 1;
var inn = new THREE.Group();
inn.rotation.y = -Math.PI / 2;
g.add(inn);
g.userData.car = kind;
if (kind === "tractor") {
stcTractor(inn, o, lite);
if (o.solid)
stcCarSolid(x, z, ry, 3.6, 1.4);
return g;
}
var S = STC_CAR[kind] || STC_CAR.pickup, col = o.col != null ? o.col : 0x8A9096, paint = stcCarMat("paint", col), glass = stcCarMat("glass"), trim = stcCarMat("trim"), chrome = stcCarMat("chrome"), W = S.W, bev = lite ? 0.05 : 0.08;
var ar = S.ax.map(function (a) { return [a, S.r + 0.07]; });
var body = stcCarGeo(kind + "|body|" + lite, function () { return stcExtrude(stcCarShape(S.body, ar, S.yb), W, bev, lite); });
stcCarMesh(body, paint, inn);
var sill = stcCarGeo(kind + "|sill", function () { var g2 = new THREE.BoxGeometry(S.L - 0.4, 0.16, W + 0.02); return g2; });
stcCarMesh(sill, trim, inn, 0, S.yb + 0.02, 0);
S.ax.forEach(function (a) {
var lin = stcCarGeo("liner" + S.r + "|" + W, function () { var c = new THREE.CylinderGeometry(S.r + 0.05, S.r + 0.05, W - 0.12, lite ? 8 : 14, 1, true, -Math.PI / 2, Math.PI); c.rotateX(Math.PI / 2); return c; });
stcCarMesh(lin, stcCarMat("liner"), inn, a, S.yb, 0);
});
var sideG = stcCarGeo(kind + "|side", function () { var s = new THREE.Shape(); S.side.forEach(function (p, i) { if (i)
s.lineTo(p[0], p[1]);
else
s.moveTo(p[0], p[1]); }); return stcExtrude(s, W + 0.02, 0, true); });
stcCarMesh(sideG, glass, inn);
stcCarMesh(stcCarGeo(kind + "|ws", function () { return stcPane(S.ws[0], S.ws[1], W - 0.22, bev + 0.012); }), glass, inn);
if (S.rw)
stcCarMesh(stcCarGeo(kind + "|rw", function () { return stcPane(S.rw[0], S.rw[1], W - 0.3, bev + 0.012); }), glass, inn);
var ytop = S.side[1][1], ylow = S.side[0][1];
(S.pil || []).forEach(function (px) { stcCarMesh(stcCarGeo(kind + "|pil", function () { return new THREE.BoxGeometry(0.12, ytop - ylow + 0.04, W + 0.035); }), paint, inn, px, (ytop + ylow) / 2, 0); });
if (S.bed) {
var bl = S.bed[1] - S.bed[0];
stcCarMesh(stcCarGeo(kind + "|bed", function () { return new THREE.BoxGeometry(bl, 0.03, W - 0.22); }), stcCarMat("liner"), inn, (S.bed[0] + S.bed[1]) / 2, S.bed[2] + bev + 0.005, 0);
stcCarMesh(stcCarGeo(kind + "|gate", function () { return new THREE.BoxGeometry(0.03, 0.08, W - 0.3); }), chrome, inn, S.tail - bev - 0.01, S.bed[2] - 0.12, 0);
}
if (kind === "flatbed") {
stcCarMesh(stcCarGeo("deck", function () { return new THREE.BoxGeometry(3.0, 0.12, W + 0.1); }), stcCarMat("paint", 0x3A3C40), inn, -1.95, 1.24 + bev, 0);
}
var fx = S.grille[0] + bev, gy0 = S.grille[1], gy1 = S.grille[2], gh = gy1 - gy0;
stcCarMesh(stcCarGeo(kind + "|grille", function () { return new THREE.BoxGeometry(0.05, gh, W * 0.5); }), trim, inn, fx + 0.01, gy0 + gh / 2, 0);
if (!lite) {
for (var gb = 0; gb < 4; gb++)
stcCarMesh(stcCarGeo(kind + "|gbar", function () { return new THREE.BoxGeometry(0.06, 0.025, W * 0.5); }), chrome, inn, fx + 0.03, gy0 + gh * (0.2 + gb * 0.2), 0);
}
[-1, 1].forEach(function (sd) {
stcCarMesh(stcCarGeo(kind + "|head", function () { return new THREE.BoxGeometry(0.06, gh * 0.42, W * 0.17); }), stcCarMat("head"), inn, fx, gy0 + gh * 0.64, sd * W * 0.36);
stcCarMesh(stcCarGeo(kind + "|ind", function () { return new THREE.BoxGeometry(0.06, gh * 0.16, W * 0.1); }), stcCarMat("amber"), inn, fx, gy0 + gh * 0.26, sd * W * 0.4);
stcCarMesh(stcCarGeo(kind + "|tl", function () { return new THREE.BoxGeometry(0.06, 0.28, 0.14); }), stcCarMat("tail"), inn, S.tail - bev - 0.01, (kind === "box" ? 1.1 : S.yb + 0.42), sd * (W / 2 - 0.12));
{
var mx = S.ws[1][0] - 0.12, my = S.ws[1][1] + 0.06;
stcCarMesh(stcCarGeo("mirror", function () { return new THREE.BoxGeometry(0.14, 0.16, 0.2); }), trim, inn, mx, my, sd * (W / 2 + 0.12));
}
});
stcCarMesh(stcCarGeo(kind + "|fbump", function () { var b = new THREE.BoxGeometry(0.22, 0.24, W + 0.04); return b; }), kind === "sedan" ? paint : chrome, inn, fx - 0.02, S.yb + 0.05, 0);
stcCarMesh(stcCarGeo(kind + "|rbump", function () { return new THREE.BoxGeometry(0.2, 0.22, W + 0.04); }), kind === "sedan" ? paint : trim, inn, S.tail - bev + 0.03, S.yb + 0.05, 0);
stcCarMesh(stcCarGeo("plate", function () { return new THREE.BoxGeometry(0.03, 0.15, 0.5); }), stcCarMat("plate"), inn, S.tail - bev - 0.07, S.yb + 0.28, 0);
if (!lite)
[-1, 1].forEach(function (sd) {
(S.doors || []).forEach(function (dxp) { stcCarMesh(stcCarGeo(kind + "|seam", function () { return new THREE.BoxGeometry(0.018, (ylow - S.yb) + 0.02, 0.01); }), trim, inn, dxp, (ylow + S.yb) / 2 + 0.06, sd * (W / 2 + 0.004)); });
var ds = S.doors || [];
for (var di = 0; di + 1 < ds.length; di++) {
stcCarMesh(stcCarGeo("handle", function () { return new THREE.BoxGeometry(0.2, 0.04, 0.03); }), chrome, inn, ds[di + 1] - 0.3, ylow - 0.14, sd * (W / 2 + 0.01));
}
});
S.ax.forEach(function (a) { [-1, 1].forEach(function (sd) { stcWheel(inn, a, sd * (W / 2 - 0.16), S.r, 0.3, lite, sd); }); });
var roofY = S.side[1][1] + 0.14 + bev;
if (o.roof) {
var rk = stcCarGeo("rack" + W, function () { return new THREE.BoxGeometry(1.2, 0.05, W - 0.3); });
stcCarMesh(rk, trim, inn, (S.side[1][0] + S.side[2][0]) / 2, roofY + 0.05, 0);
}
if (o.light) {
stcCarMesh(stcCarGeo("lbar", function () { return new THREE.BoxGeometry(0.28, 0.12, W - 0.5); }), stcCarMat("amber"), inn, S.side[2][0] - 0.2, roofY + 0.07, 0);
}
g.userData.roofY = roofY;
g.userData.len = S.L;
if (o.solid)
stcCarSolid(x, z, ry, S.L, W);
return g;
},
function (inn, o, lite) {
var col = o.col != null ? o.col : (o.alt ? 0xB8261E : 0x2E6A2A), paint = stcCarMat("paint", col), trim = stcCarMat("trim"), glass = stcCarMat("glass"), yel = stcCarMat("paint", 0xD8B02A);
var hood = stcCarGeo("tr-hood|" + lite, function () { var s = new THREE.Shape(); s.moveTo(-0.5, 0.95); s.lineTo(-0.5, 1.72); s.lineTo(1.9, 1.66); s.quadraticCurveTo(2.25, 1.62, 2.25, 1.3); s.lineTo(2.25, 0.95); s.lineTo(-0.5, 0.95); return stcExtrude(s, 1.0, 0.07, lite); });
stcCarMesh(hood, paint, inn);
stcCarMesh(stcCarGeo("tr-frame", function () { return new THREE.BoxGeometry(3.0, 0.4, 0.8); }), trim, inn, 0.7, 0.8, 0);
stcCarMesh(stcCarGeo("tr-grille", function () { return new THREE.BoxGeometry(0.05, 0.55, 0.8); }), trim, inn, 2.31, 1.28, 0);
[-1, 1].forEach(function (sd) { stcCarMesh(stcCarGeo("tr-head", function () { return new THREE.BoxGeometry(0.05, 0.12, 0.18); }), stcCarMat("head"), inn, 2.3, 1.55, sd * 0.3); });
var cab = stcCarGeo("tr-cab", function () { return new THREE.BoxGeometry(1.25, 1.45, 1.4); });
stcCarMesh(cab, glass, inn, -0.95, 2.1, 0);
[[-1.58, -0.71], [-1.58, 0.71], [-0.32, -0.71], [-0.32, 0.71]].forEach(function (p) { stcCarMesh(stcCarGeo("tr-post", function () { return new THREE.BoxGeometry(0.07, 1.5, 0.07); }), trim, inn, p[0], 2.1, p[1]); });
stcCarMesh(stcCarGeo("tr-roof", function () { return new THREE.BoxGeometry(1.45, 0.12, 1.6); }), paint, inn, -0.95, 2.88, 0);
stcCarMesh(stcCarGeo("tr-floor", function () { return new THREE.BoxGeometry(1.3, 0.3, 1.45); }), paint, inn, -0.95, 1.25, 0);
stcCarMesh(stcCarGeo("tr-stack", function () { return new THREE.CylinderGeometry(0.06, 0.07, 1.4, 8); }), trim, inn, 1.4, 2.3, -0.3);
[-1, 1].forEach(function (sd) {
var rr = 0.88, tw = 0.5;
stcWheel(inn, -0.95, sd * 1.02, rr, tw, lite, sd);
if (!lite) {
var lugs = stcCarGeo("tr-lugs", function () { var parts = []; for (var i = 0; i < 18; i++) {
var b = new THREE.BoxGeometry(0.1, 0.06, tw * 0.46);
b.translate(0, rr + 0.01, 0);
b.rotateZ(i * Math.PI * 2 / 18);
b.rotateY(0);
parts.push(b.toNonIndexed());
} return typeof gwMerge === "function" ? gwMerge(parts) : parts[0]; });
var L1 = stcCarMesh(lugs, stcCarMat("tyre"), inn, -0.95, rr, sd * 1.02 - 0.12);
var L2 = stcCarMesh(lugs, stcCarMat("tyre"), inn, -0.95, rr, sd * 1.02 + 0.12);
L2.rotation.z = 0.17;
}
var fen = stcCarGeo("tr-fender|" + lite, function () { var c = new THREE.CylinderGeometry(rr + 0.12, rr + 0.12, tw + 0.14, lite ? 8 : 16, 1, true, -Math.PI / 2 * 0.9, Math.PI * 0.9); c.rotateX(Math.PI / 2); return c; });
stcCarMesh(fen, stcCarMat("paintds", col), inn, -0.95, rr, sd * 1.02);
stcWheel(inn, 1.75, sd * 0.72, 0.48, 0.28, lite, sd);
});
},
function () {
var P = stcP(), lite = STC.lite, r = stcRnd(4242), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), Sc = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
function inst(geo, mat, list, name) {
if (!list.length)
return null;
var m = new THREE.InstancedMesh(geo, mat, list.length);
list.forEach(function (t, i) { Q.setFromAxisAngle(up, t[3] || 0); V.set(t[0], t[1], t[2]); Sc.set(t[4] || 1, t[5] || t[4] || 1, t[4] || 1); M.compose(V, Q, Sc); m.setMatrixAt(i, M); });
m.instanceMatrix.needsUpdate = true;
m.userData.keep = 1;
m.name = name;
P.add(m);
return m;
}
function strip(len, h, texLen) { var g = new THREE.PlaneGeometry(len, h); g.translate(0, h / 2, 0); var uv = g.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setX(i, uv.getX(i) * len / texLen); return g; }
function cut(m) { m.alphaTest = 0.45; m.transparent = false; m.depthWrite = true; m.side = THREE.DoubleSide; m.needsUpdate = true; return m; }
var town = function (x, z) { return Math.hypot(x, z) < 300; }, lake = function (x, z) { return Math.hypot(x + 520, z - 420) < 210; };
var farm = function (x, z) { for (var q = 0; q < STC_FARMS.length; q++)
if (Math.hypot(x - STC_FARMS[q][0] - 7, z - STC_FARMS[q][1]) < 55)
return true; return false; };
var wheatM = cut(stcCanvasMat("wheat-stand", 256, 96, function (c, W, H) {
c.clearRect(0, 0, W, H);
var q = stcRnd(31);
for (var i = 0; i < 150; i++) {
var x = q() * W, top = H * (0.12 + q() * 0.22), lean = (q() - 0.5) * 6, g = 170 + q() * 50 | 0;
c.strokeStyle = "rgb(" + g + "," + (g - 30) + "," + (70 + q() * 30 | 0) + ")";
c.lineWidth = 1.2;
c.beginPath();
c.moveTo(x, H);
c.quadraticCurveTo(x + lean * 0.3, H * 0.6, x + lean, top);
c.stroke();
c.fillStyle = "rgb(" + (g - 14) + "," + (g - 48) + ",50)";
c.beginPath();
c.ellipse(x + lean, top - 5, 2.2, 7, lean * 0.04, 0, 7);
c.fill();
c.strokeStyle = "rgba(220,200,140,0.7)";
c.lineWidth = 0.6;
c.beginPath();
c.moveTo(x + lean, top - 11);
c.lineTo(x + lean + 2, top - 17);
c.stroke();
}
}, { full: true, rep: [1, 1], ds: true }));
var cornM = cut(stcCanvasMat("corn-stand", 256, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
var q = stcRnd(57);
for (var i = 0; i < 36; i++) {
var x = 4 + i * 7 + (q() - 0.5) * 4, top = H * (0.06 + q() * 0.08), g = 80 + q() * 40 | 0;
c.strokeStyle = "rgb(" + (g - 30) + "," + (g + 20) + ",40)";
c.lineWidth = 3;
c.beginPath();
c.moveTo(x, H);
c.lineTo(x, top);
c.stroke();
for (var l = 0; l < 7; l++) {
var y = H * (0.25 + l * 0.1), s = q() < 0.5 ? -1 : 1, len = 18 + q() * 16;
c.strokeStyle = "rgb(" + (g - 20 + (q() * 20 | 0)) + "," + (g + 40) + ",46)";
c.lineWidth = 3.4;
c.beginPath();
c.moveTo(x, y);
c.quadraticCurveTo(x + s * len * 0.6, y - 14, x + s * len, y + 6 + q() * 8);
c.stroke();
}
c.strokeStyle = "#B8A458";
c.lineWidth = 1.4;
for (var t = 0; t < 4; t++) {
c.beginPath();
c.moveTo(x, top);
c.lineTo(x + (t - 1.5) * 3, top - 10);
c.stroke();
}
if (q() < 0.6) {
c.fillStyle = "#7A8A3A";
c.beginPath();
c.ellipse(x + 3, H * 0.52, 3, 9, 0.3, 0, 7);
c.fill();
}
}
}, { full: true, rep: [1, 1], ds: true }));
var wheatG = strip(lite ? 24 : 16, lite ? 1.0 : 0.95, 4), cornG = strip(lite ? 24 : 16, 2.3, 2.4);
var wl = [], cl = [], sp = lite ? 7 : 4, cs = lite ? 6 : 2.6, near = lite ? 900 : 9999, band = lite ? 30 : 46;
function edge(a, b) { return Math.abs(a) > 186 - band || Math.abs(b) > 186 - band; }
(STC.fields || []).forEach(function (F, fi) {
if (Math.hypot(F.x, F.z) > near)
return;
var half = 186, len = lite ? 24 : 16, rot = (fi % 2) ? 0 : Math.PI / 2;
if (F.k === "wheat") {
for (var a = -half + sp / 2; a < half; a += sp)
for (var b = -half + len / 2; b < half; b += len) {
if (!edge(a, b))
continue;
var j = (r() - 0.5) * 0.8, s1 = 0.85 + r() * 0.3;
wl.push([F.x + b, 0, F.z + a + j, 0, s1, s1]);
if (!lite)
wl.push([F.x + a + j, 0, F.z + b, Math.PI / 2, s1, s1]);
}
}
else if (F.k === "corn") {
for (var a2 = -half + cs / 2; a2 < half; a2 += cs)
for (var b2 = -half + len / 2; b2 < half; b2 += len) {
if (lite && !edge(a2, b2))
continue;
if (Math.abs(a2) < 3.2 || Math.abs(b2) < len / 2 + 2.5 || Math.abs(a2) > half - 4 || Math.abs(b2) > half - 4)
continue;
var s2 = 0.9 + r() * 0.2;
if (rot)
cl.push([F.x + a2, 0, F.z + b2, Math.PI / 2, 1, s2]);
else
cl.push([F.x + b2, 0, F.z + a2, 0, 1, s2]);
}
}
});
inst(wheatG, wheatM, wl, "stc-wheat");
inst(cornG, cornM, cl, "stc-corn");
STC.cropCount = wl.length + cl.length;
(STC.fields || []).forEach(function (F, fi) {
if (fi % 3 !== 1)
return;
var zz = F.z - 188;
for (var x = -176; x <= 176; x += (lite ? 16 : 8)) {
var tx = F.x + x + (r() - 0.5) * 2, tz = zz + (r() - 0.5) * 2;
if (town(tx, tz) || lake(tx, tz) || farm(tx, tz))
continue;
stcTree(tx, tz, 0.8 + r() * 0.5);
}
});
for (var i = 0; i < (lite ? 20 : 70); i++) {
var x = (r() - 0.5) * 3000, z = (r() - 0.5) * 3000;
if (town(x, z) || lake(x, z) || farm(x, z))
continue;
var road = false;
for (var k = -3; k <= 3; k++)
if (Math.abs(x - k * 400) < 14 || Math.abs(z - k * 400) < 14)
road = true;
if (road || Math.abs(x - 40) < 10)
continue;
if (x > 320 && x < 930 && z < -270 && z > -550)
continue;
if (Math.hypot(x + 600, z + 600) < 210 || Math.hypot(x - 300, z - 230) < 120)
continue;
stcTree(x, z, 1.1 + r() * 0.6);
}
var flM = cut(stcCanvasMat("flowers", 128, 64, function (c, W, H) {
c.clearRect(0, 0, W, H);
var q = stcRnd(91), cols = ["#E8B020", "#B060A8", "#F0C830", "#6A88D0", "#F2F0E8"];
for (var i = 0; i < 26; i++) {
var x = 4 + q() * (W - 8), y = H * (0.25 + q() * 0.45), col = cols[i % cols.length];
c.strokeStyle = "#4A6A2A";
c.lineWidth = 1.2;
c.beginPath();
c.moveTo(x, H);
c.lineTo(x + (q() - 0.5) * 4, y);
c.stroke();
c.fillStyle = col;
for (var p = 0; p < 6; p++) {
var a = p * 1.047;
c.beginPath();
c.ellipse(x + Math.cos(a) * 3, y + Math.sin(a) * 3, 2.6, 1.4, a, 0, 7);
c.fill();
}
c.fillStyle = "#3A2A14";
c.beginPath();
c.arc(x, y, 1.6, 0, 7);
c.fill();
}
}, { full: true, rep: [1, 1], ds: true }));
var fg = new THREE.PlaneGeometry(1.6, 0.8);
fg.translate(0, 0.4, 0);
var fg2 = fg.clone();
fg2.rotateY(Math.PI / 2);
var fgm = typeof gwMerge === "function" ? gwMerge([fg.toNonIndexed(), fg2.toNonIndexed()]) : fg;
var fls = [], reach = lite ? 600 : 800, step = lite ? 10 : 4.5;
function roadHalf(k, alongZ) { return k === 0 ? (alongZ ? 7 : 6) : 4.5; }
function onRoad(x, z, pad) { for (var k = -3; k <= 3; k++) {
if (Math.abs(x - k * 400) < roadHalf(k, true) + pad || Math.abs(z - k * 400) < roadHalf(k, false) + pad)
return true;
} return Math.abs(x - 40) < 3 + pad && Math.abs(z) < 300; }
for (var k2 = -3; k2 <= 3; k2++) {
var c0 = k2 * 400;
for (var s = -reach; s < reach; s += step) {
[-1, 1].forEach(function (sd) {
var sz = 0.7 + r() * 0.7;
var offA = sd * (roadHalf(k2, true) + 1.6 + r() * 1.4), ax = c0 + offA, az = s;
if (!town(ax, az) && !lake(ax, az) && !farm(ax, az) && r() < 0.75 && Math.abs(az - Math.round(az / 400) * 400) > roadHalf(Math.round(az / 400), false) + 2)
fls.push([ax, 0, az, r() * 3, sz]);
var offB = sd * (roadHalf(k2, false) + 1.6 + r() * 1.4), bx = s, bz = c0 + offB;
if (!town(bx, bz) && !lake(bx, bz) && !farm(bx, bz) && r() < 0.75 && Math.abs(bx - Math.round(bx / 400) * 400) > roadHalf(Math.round(bx / 400), true) + 2)
fls.push([bx, 0, bz, r() * 3, sz]);
});
}
}
STC.onRoad = onRoad;
inst(fgm, flM, fls, "stc-flowers");
var mach = 0;
(STC.fields || []).forEach(function (F, fi) {
if (lite && mach >= 3)
return;
if (mach >= 9)
return;
if (F.k === "earth") {
stcCar("tractor", F.x - 40 + fi * 7 % 60, F.z + 30, fi * 1.3, { alt: fi % 2 === 0, solid: 1 });
mach++;
}
else if (fi % 4 === 2) {
stcCar(fi % 8 === 2 ? "pickup" : "flatbed", F.x + 150, F.z + 176, Math.PI / 2, { col: [0x8A2A1E, 0x6A6E74, 0x2A3A4A][fi % 3], solid: 1 });
mach++;
}
});
var signs = [[0, -520, "STORMHAVEN", "Pop. 1,240\nHome of the Plains Storm Lab"], [0, 560, "TORNADO SHELTER", "In a warning, follow the signs to the fire station shelter on Elm Street. Open 24 hours."],
[0, -980, "KNOW YOUR SKY", "Wall cloud? Rotation? Report it to the Weather Service. Turn around, don't drown."], [0, 1060, "HAIL & WIND", "Car glass dents and breaks in hail. Never shelter under an overpass."]];
signs.slice(0, lite ? 2 : 4).forEach(function (S, i) {
var sx = (i % 2 ? 1 : -1) * 15, sz = S[1], ry = i % 2 ? -Math.PI / 2 : Math.PI / 2;
stcPlaque("road" + i, S[2], S[3], 5, 2.6, sx, 4.2, sz, ry, { bg: "#F2EEE4", ac: i % 2 ? "#B8462E" : "#2A5A8A" });
stcBox(0.12, 2.75, 5.1, stcMat(0x5A5A5A, "metal"), sx + (i % 2 ? 0.09 : -0.09), 4.2, sz);
[-1.9, 1.9].forEach(function (o) { stcCyl(0.12, 3.2, stcMat(0x6A5A44, "wood"), sx, 1.6, sz + o, null, 6); stcRound(sx, sz + o, 0.2, 0, 4); });
});
stcHorizon();
},
function () {
var lite = STC.lite, m = stcCanvasMat("horizon", lite ? 1024 : 2048, 128, function (c, W, H) {
c.clearRect(0, 0, W, H);
var q = stcRnd(17), base = H - 2;
function tone(a) { return "rgba(58,66,58," + a + ")"; }
for (var x = 0; x < W; x += 2) {
var n = Math.sin(x * 0.013) * 0.5 + Math.sin(x * 0.051 + 1) * 0.3 + Math.sin(x * 0.17) * 0.2;
if (n < -0.25)
continue;
var h = 6 + (n + 0.25) * 20 + q() * 4;
c.fillStyle = tone(0.85);
c.beginPath();
c.arc(x, base - h + 4, 4 + q() * 3, 0, 7);
c.fill();
c.fillRect(x - 2, base - h + 4, 4, h);
}
for (var f = 0; f < (lite ? 6 : 12); f++) {
var fx = q() * W, s = 0.7 + q() * 0.6;
c.fillStyle = tone(0.9);
c.beginPath();
c.moveTo(fx, base);
c.lineTo(fx, base - 10 * s);
c.lineTo(fx + 7 * s, base - 16 * s);
c.lineTo(fx + 14 * s, base - 10 * s);
c.lineTo(fx + 14 * s, base);
c.fill();
for (var b = 0; b < 3; b++) {
c.fillRect(fx + 18 * s + b * 6 * s, base - 12 * s, 5 * s, 12 * s);
c.beginPath();
c.moveTo(fx + 18 * s + b * 6 * s, base - 12 * s);
c.lineTo(fx + 20.5 * s + b * 6 * s, base - 15 * s);
c.lineTo(fx + 23 * s + b * 6 * s, base - 12 * s);
c.fill();
}
}
for (var e = 0; e < (lite ? 2 : 4); e++) {
var ex = q() * W;
c.fillStyle = tone(0.95);
c.fillRect(ex, base - 46, 26, 46);
c.fillRect(ex + 8, base - 58, 10, 12);
c.fillRect(ex + 26, base - 30, 12, 30);
}
var wx = q() * W;
c.fillStyle = tone(0.95);
c.fillRect(wx - 1, base - 34, 2, 34);
c.fillRect(wx + 9, base - 34, 2, 34);
c.beginPath();
c.ellipse(wx + 5, base - 40, 10, 7, 0, 0, 7);
c.fill();
c.globalCompositeOperation = "destination-in";
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(0,0,0,0)");
g.addColorStop(0.35, "rgba(0,0,0,0.9)");
g.addColorStop(1, "rgba(0,0,0,1)");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
c.globalCompositeOperation = "source-over";
}, { full: true, basic: true, op: 1, rep: [3, 1] });
m.side = THREE.BackSide;
m.depthWrite = false;
m.transparent = true;
m.color.setHex(0xA0A8A8);
var R = 1150, cyl = new THREE.CylinderGeometry(R, R, 70, lite ? 36 : 72, 1, true);
cyl.translate(0, 33, 0);
var h = new THREE.Mesh(cyl, m);
h.userData.keep = 1;
h.renderOrder = -1;
h.frustumCulled = false;
h.name = "stc-horizon";
stcP().add(h);
STC.horizon = h;
},
function (dt) {
var H = STC_HANDS;
H.t += dt;
(STC_SKY.storms || []).forEach(function (S) { if (S.stage === "gone")
return; var d = Math.hypot(S.x - 20, S.z + 28), R = (S.rB || 60) * 4 + 250; if (d < R)
H.rain += dt * (1 - d / R) * (18 + S.ef * 8) / 3600 * 60; });
if (!H.baro.length || H.t - H.baro[H.baro.length - 1][0] > 10) {
H.baro.push([H.t, stcReadings(20, -28).p]);
if (H.baro.length > 90)
H.baro.shift();
}
var B = STC_SKY.bolt;
if (B && B !== H.lastBolt) {
H.lastBolt = B;
H.strikes.push({ t: H.t, x: B.x, z: B.z });
if (H.strikes.length > 30)
H.strikes.shift();
}
},
function (title, sub, q, opts, right, why, after) {
var f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + title + "</div>" + (sub ? "<div style='opacity:.75;font-size:12px;margin:2px 0 6px'>" + sub + "</div>" : "") +
"<div style='margin:6px 0 8px;line-height:1.45'>" + q + "</div>";
opts.forEach(function (o, i) {
b += worldBtn("o" + i, o, "");
f["o" + i] = function () {
var ok = i === right;
if (ok)
stcDid("ask_" + title.replace(/\W/g, "").slice(0, 20));
var r = "<div style='font:600 17px var(--serif,Georgia);color:" + (ok ? "#B8F0A8" : "#FFB0A0") + "'>" + (ok ? "✓ Right!" : "✗ Not quite.") + "</div>" +
"<div style='margin:6px 0;line-height:1.45'>" + (ok ? "" : "The answer is <b>" + opts[right] + "</b>. ") + why + "</div>", g = {};
if (after) {
r += worldBtn("next", "Another one", "");
g.next = after;
}
r += worldBtn("done", "Done", "");
g.done = function () { worldCard(null); };
worldCard(r, g);
};
});
worldCard(b, f);
},
function (title, sub, body, btns) {
var f = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + title + "</div>" + (sub ? "<div style='opacity:.75;font-size:12px;margin:2px 0 6px'>" + sub + "</div>" : "") + "<div style='line-height:1.45;margin:6px 0'>" + body + "</div>";
(btns || []).forEach(function (x, i) { b += worldBtn("b" + i, x[0], x[1] || ""); f["b" + i] = x[2]; });
worldCard(b, f);
},
function (key) {
var k = STC_KIT.filter(function (x) { return x[0] === key; })[0];
if (!k)
return;
stcDid("kit_" + key);
var tries = { anemo: ["Read the wind now", "watch the cups spin", stcTryAnemo], baro: ["Tap the glass", "read the needle and which way it is going", stcTryBaro], hygro: ["Swing the psychrometer", "read the wet and dry bulbs", stcTryHygro],
rain: ["Read the gauge", "how much has fallen on town", stcTryRain], sonde: ["Launch one", "go to the pad and send a balloon up", function () { worldCard(null); stcGo("balloon"); stcBalloonLaunch(); }],
probe: ["Ride out and set it", "with the chase team, in a storm's path", function () { worldCard(null); stcChaseStart(); }], doppler: ["Open the radar", "the live scan of the storms", function () { stcRadarCard(); }],
light: ["Count the thunder", "flash to bang: how far away?", stcTryLight], hail: ["Measure the pad", "the dents from today's storms", stcTryHail], truck: ["Read the roof station", "then ride out", stcTryTruck] }[key];
var n = STC_KIT.filter(function (x) { return stcProg().did["kit_" + x[0]]; }).length;
stcHtml("🔧 " + stcEsc(k[1]), "The Chasers' Garage", stcRow("Measures", stcEsc(k[2])) + "<div style='margin-top:6px'>" + stcEsc(k[3]) + "</div><div style='margin-top:6px;opacity:.85'><i>" + stcEsc(k[4]) + "</i></div><div style='opacity:.7;font-size:12px;margin-top:6px'>Instruments looked at: " + n + " of " + STC_KIT.length + "</div>", tries ? [["🖐️ " + tries[0], tries[1], tries[2]]] : []);
},
function () {
stcDid("try_anemo");
var R = stcReadings(20, -28), mph = Math.max(0, Math.round(R.wind)), ms = mph * 0.447, rpm = Math.round((ms / 3) / (2 * Math.PI * 0.12) * 60), B = stcBeaufort(mph);
stcHtml("🌬️ The cup anemometer", "Live, on the garage roof", stcRow("Wind", mph + " mph · " + Math.round(mph * 1.609) + " km/h · " + ms.toFixed(1) + " m/s") + stcRow("From the", stcBearing(Math.sin(R.dir * Math.PI / 180), -Math.cos(R.dir * Math.PI / 180))) + stcRow("Cups turning", rpm + " turns a minute") +
stcRow("Beaufort scale", "force " + B[0] + ": " + B[1]) + "<div style='margin-top:6px'>What you would see: " + B[2] + ".</div><div style='margin-top:6px;opacity:.85'>The cups move at about a third of the wind's speed, so the faster they turn the stronger the wind. An EF0 tornado starts at 65 mph: Beaufort force 11.</div>", [["Test yourself", "which Beaufort force is it?", function () {
var m = [6, 18, 30, 45, 60][Math.floor(Math.random() * 5)], b = stcBeaufort(m), w = [b[0], Math.max(0, b[0] - 3), Math.min(12, b[0] + 3)].sort(function () { return Math.random() - 0.5; });
stcAsk("🌬️ Beaufort", "", "The cups say <b>" + m + " mph</b>. Which force is that?", w.map(function (x) { return "Force " + x + ": " + STC_BEAUFORT[x][1]; }), w.indexOf(b[0]), "At " + m + " mph: " + b[2] + ".", stcTryAnemo);
}], ["Read it again", "", stcTryAnemo]]);
},
function (p) {
var cv = document.createElement("canvas");
cv.width = 320;
cv.height = 200;
var c = cv.getContext("2d"), cx = 160, cy = 170, R = 140;
c.fillStyle = "#F2EAD4";
c.beginPath();
c.arc(cx, cy, R + 10, Math.PI, 0);
c.fill();
c.strokeStyle = "#6A5030";
c.lineWidth = 4;
c.stroke();
var lo = 950, hi = 1050;
function ang(v) { return Math.PI + (v - lo) / (hi - lo) * Math.PI; }
c.fillStyle = "#3A2A1A";
c.font = "bold 12px Georgia";
c.textAlign = "center";
[[965, "STORMY"], [985, "RAIN"], [1000, "CHANGE"], [1020, "FAIR"], [1040, "VERY DRY"]].forEach(function (w) { var a = ang(w[0]); c.save(); c.translate(cx + Math.cos(a) * (R - 30), cy + Math.sin(a) * (R - 30)); c.rotate(a + Math.PI / 2); c.fillText(w[1], 0, 0); c.restore(); });
for (var v = lo; v <= hi; v += 5) {
var a = ang(v);
c.beginPath();
c.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
c.lineTo(cx + Math.cos(a) * (R - (v % 25 ? 6 : 12)), cy + Math.sin(a) * (R - (v % 25 ? 6 : 12)));
c.lineWidth = 1.5;
c.stroke();
}
var a = ang(Math.max(lo, Math.min(hi, p)));
c.strokeStyle = "#1A1A1A";
c.lineWidth = 3;
c.beginPath();
c.moveTo(cx, cy);
c.lineTo(cx + Math.cos(a) * (R - 14), cy + Math.sin(a) * (R - 14));
c.stroke();
c.fillStyle = "#1A1A1A";
c.beginPath();
c.arc(cx, cy, 6, 0, 7);
c.fill();
return cv.toDataURL();
},
function () {
stcDid("try_baro");
if (STC.baroHand)
STC.baroHand.tap = 1;
var R = stcReadings(20, -28), H = STC_HANDS.baro, old = H.length ? H[0] : null, ch = old ? R.p - old[1] : 0, mins = old ? Math.max(1, Math.round((STC_HANDS.t - old[0]) / 60)) : 0;
var trend = !old || mins < 1 ? "Tap it again in a minute to see which way it goes." : Math.abs(ch) < 0.4 ? "Steady over the last " + mins + " min." : ch < 0 ? "<b>Falling</b> " + Math.abs(ch).toFixed(1) + " mb in " + mins + " min: low pressure is coming, storms likely." : "<b>Rising</b> " + ch.toFixed(1) + " mb in " + mins + " min: the storm is moving away.";
stcHtml("🧭 The barometer", "You tap the glass, and the needle settles", "<img alt='Barometer dial' src='" + stcBaroDial(R.p) + "' style='width:100%;max-width:320px;display:block;margin:0 auto'>" + stcRow("Pressure", R.p.toFixed(1) + " mb · " + (R.p * 0.02953).toFixed(2) + " inHg") + "<div style='margin-top:6px'>" + trend + "</div>" +
"<div style='margin-top:6px;opacity:.85'>Tapping helps a stuck needle move to its true place: old sailors and farmers tapped theirs every morning. Inside a tornado the pressure can drop 100 mb in seconds.</div>", [["Tap it again", "", stcTryBaro], ["Test yourself", "what does a falling barometer mean?", function () { stcAsk("🧭 Barometer", "", "The needle has fallen from FAIR towards RAIN all afternoon. What is coming?", ["Clearer, drier weather", "Low pressure, clouds and storms", "Nothing: it only shows temperature"], 1, "Air rises in low pressure; rising air cools and makes cloud, rain and storms.", null); }]]);
},
function () {
stcDid("try_hygro");
if (STC.psy)
STC.psy.swing = 3;
var R = stcReadings(20, -28), Tw = stcWetBulb(R.T, R.RH), F = function (c) { return Math.round(c * 9 / 5 + 32); }, gap = R.T - Tw;
stcHtml("💧 The sling psychrometer", "You whirl it round for a minute, then read both bulbs", stcRow("Dry bulb", R.T.toFixed(1) + " °C (" + F(R.T) + " °F)") + stcRow("Wet bulb", Tw.toFixed(1) + " °C (" + F(Tw) + " °F)") + stcRow("Gap", gap.toFixed(1) + " °C") + stcRow("Humidity", R.RH + "%") + stcRow("Dew point", Math.round(R.Td) + " °C (" + F(R.Td) + " °F)") +
"<div style='margin-top:6px'>" + (R.Td >= 16 ? "A dew point over 60 °F: <b>plenty of fuel</b> for severe storms today." : "Dry air: storms will struggle to grow.") + "</div><div style='margin-top:6px;opacity:.85'>Water drying off the wet bulb cools it. The drier the air, the faster it dries and the bigger the gap. When the gap is zero the air is full: 100% humidity, and fog or cloud.</div>", [["Test yourself", "dry or damp?", function () { stcAsk("💧 Psychrometer", "", "The wet bulb reads <b>12 °C</b> lower than the dry bulb. Is the air…", ["Very damp", "Very dry", "Exactly saturated"], 1, "A big gap means water dries off fast: the air is dry. No gap at all means it is saturated.", null); }], ["Swing it again", "", stcTryHygro]]);
},
function () {
stcDid("try_rain");
var mm = STC_HANDS.rain, inch = mm / 25.4;
stcHtml("🌧️ The rain gauge", "On the garage roof, since you came", stcRow("Rain", mm.toFixed(1) + " mm · " + inch.toFixed(2) + " in") + "<div style='margin-top:6px'>" + (mm < 0.2 ? "Dry so far: the storms have kept out of town." : mm < 10 ? "A shower's worth." : "A soaking: flash floods start when this falls fast.") + "</div>" +
"<div style='margin-top:6px;opacity:.85'>One inch of rain on one acre is 27,154 US gallons, weighing about 113 tons. Turn around, don't drown: most flood deaths are in cars driven into water.</div>", [["Empty it", "start counting again", function () { STC_HANDS.rain = 0; stcTryRain(); }], ["Test yourself", "", function () { stcAsk("🌧️ Rain", "", "Water is running fast over the road ahead. It looks only a foot deep. What do you do?", ["Drive through slowly", "Turn around", "Wade across to check"], 1, "A foot of moving water can float a car; six inches can knock you off your feet.", null); }]]);
},
function () {
stcDid("try_light");
var L = worldLocal(), H = STC_HANDS, list = H.strikes.slice(-5).reverse(), rows = "";
list.forEach(function (s) { var d = Math.hypot(s.x - L.x, s.z - L.z), ago = Math.round(H.t - s.t); rows += stcRow(ago < 60 ? ago + " s ago" : Math.round(ago / 60) + " min ago", (d / 1609).toFixed(1) + " mi " + stcBearing(s.x - L.x, s.z - L.z)); });
var N = stcNearest(L.x, L.z), d = N ? Math.max(300, N.d) : 4000, secs = Math.round(d / 343), miles = secs / 5;
stcHtml("⚡ The lightning detector", "Strikes it has picked up", (rows || "<div style='opacity:.8'>No strikes yet. Wait for one.</div>") +
"<div style='margin-top:8px'><b>Flash to bang:</b> count the seconds from the flash to the thunder. Sound goes about a mile in 5 seconds (a kilometre in 3); light arrives at once.</div>", [["Count one now", "the nearest storm", function () {
var w = [miles, miles * 2 + 1, Math.max(0.5, miles / 2)].map(function (x) { return Math.round(x * 10) / 10; }), sh = w.slice().sort(function () { return Math.random() - 0.5; });
stcAsk("⚡ Flash to bang", "", "A flash over the storm… you count <b>" + secs + " seconds</b> to the thunder. How far away was it?", sh.map(function (x) { return x + " miles"; }), sh.indexOf(w[0]), secs + " ÷ 5 = " + w[0] + " miles. If you can hear thunder at all, lightning can reach you: go indoors.", stcTryLight);
}]]);
},
function () {
stcDid("try_hail");
var big = 0;
(STC_SKY.storms || []).forEach(function (S) { if (S.stage !== "gone")
big = Math.max(big, 0.75 + S.ef * 0.6); });
if (!big)
big = 1;
var q = stcRnd(Math.floor(STC_HANDS.t)), dents = [];
for (var i = 0; i < 8; i++)
dents.push(Math.round((0.25 + q() * (big - 0.25)) * 4) / 4);
dents.sort(function (a, b) { return b - a; });
var top = dents[0], opts = [stcHailName(top), stcHailName(Math.max(0.25, top - 1)), stcHailName(top + 1.2)].filter(function (v, i, a) { return a.indexOf(v) === i; }), sh = opts.slice().sort(function () { return Math.random() - 0.5; });
var table = STC_HAILSIZE.map(function (h) { return h[1] + " " + h[0] + "\""; }).join(" · ");
stcHtml("🧊 The hail pad", "Foam and foil, set out under the storm's path", stcRow("Dents measured", dents.length) + stcRow("Biggest", top.toFixed(2) + " in") + stcRow("All", dents.map(function (d) { return d.toFixed(2); }).join(", ") + " in") +
"<div style='margin-top:6px;opacity:.85'>The Weather Service sizes hail by things everyone knows: " + table + ". One inch (a quarter) or bigger makes a storm 'severe'.</div>", [["Test yourself", "name the biggest stone", function () { stcAsk("🧊 Hail size", "", "The biggest dent is <b>" + top.toFixed(2) + " inches</b> across. Report it as hail the size of…", sh, sh.indexOf(opts[0]), "Hail spotters always report it this way, so the forecasters know at once how bad it is.", stcTryHail); }]]);
},
function () {
stcDid("try_truck");
var T = STC.truck, x = T ? T.position.x : 4, z = T ? T.position.z : -15, R = stcReadings(x, z), N = stcNearest(x, z);
stcHtml("🚙 The chase truck's roof station", "Live", stcRow("Wind", Math.round(R.wind) + " mph") + stcRow("Pressure", R.p.toFixed(1) + " mb") + stcRow("Temperature", Math.round(R.T) + " °C") + stcRow("Dew point", Math.round(R.Td) + " °C") +
stcRow("Nearest storm", N ? (N.d / 1609).toFixed(1) + " mi " + stcBearing(N.S.x - x, N.S.z - z) : "none"), [["Ride out", "with the chase team", function () { worldCard(null); stcChaseStart(); }]]);
},
function () {
stcDid("try_ef");
var D = STC_DAMAGE[Math.floor(Math.random() * STC_DAMAGE.length)];
stcAsk("📏 Rate the damage", "The Enhanced Fujita scale", "<b>" + stcEsc(D[1]) + ".</b> Which EF rating?", ["EF0", "EF1", "EF2", "EF3", "EF4", "EF5"], D[2], "EF" + D[2] + ": winds of about " + STC_EF[D[2]][1] + ". Surveyors rate a tornado by the worst damage to well-built things, then work out the wind that did it.", stcEfTry);
},
function (st) {
st = st || { size: 0.2, up: 60, trips: 0 };
stcDid("try_hailgrow");
var need = [[0.75, 40], [1.0, 49], [1.75, 64], [2.75, 81], [4.0, 103], [9, 140]];
function req(s) { for (var i = 0; i < need.length; i++)
if (s <= need[i][0])
return need[i][1]; return 140; }
var body = stcRow("Hailstone", st.size.toFixed(2) + " in: " + stcHailName(st.size)) + stcRow("Trips up the updraft", st.trips) + stcRow("Updraft", st.up + " mph") + stcRow("Updraft needed to hold it up", "about " + req(st.size) + " mph") +
"<div style='margin-top:6px;opacity:.85'>Each trip up through the freezing cloud adds a layer of ice, like the rings of a tree. When the stone is heavier than the updraft can hold, it falls.</div>";
var btns = [["⬆️ Send it up again", "add a layer of ice", function () {
var n = { size: st.size, up: st.up, trips: st.trips + 1 };
n.size = Math.round((st.size + 0.15 + Math.random() * 0.25) * 100) / 100;
if (req(n.size) > n.up) {
stcHtml("🧊 It falls!", "", stcRow("It reached", n.size.toFixed(2) + " in: " + stcHailName(n.size)) + stcRow("After", n.trips + " trips") + "<div style='margin-top:6px'>The " + n.up + " mph updraft could not hold it, so it fell. Stronger updrafts grow bigger hail: the record, 8 inches at Vivian, South Dakota in 2010, came from a violent supercell.</div>", [["Grow another", "", function () { stcHailGrow({ size: 0.2, up: n.up, trips: 0 }); }], ["Done", "", function () { worldCard(null); }]]);
}
else
stcHailGrow(n);
}],
["Updraft: 40 mph", "a weak storm", function () { stcHailGrow({ size: 0.2, up: 40, trips: 0 }); }], ["Updraft: 70 mph", "a strong storm", function () { stcHailGrow({ size: 0.2, up: 70, trips: 0 }); }], ["Updraft: 110 mph", "a violent supercell", function () { stcHailGrow({ size: 0.2, up: 110, trips: 0 }); }]];
stcHtml("🧊 Grow a hailstone", "The hail case", body, btns);
},
function (i) {
stcDid("try_model");
var b = "";
if (i != null)
b = "<div style='margin-bottom:6px'><b>" + STC_PARTS[i][0] + ":</b> " + STC_PARTS[i][1] + "</div>";
stcHtml("🌩️ The supercell model", "Point at a part to learn it", b + "<div style='opacity:.8'>A supercell is a thunderstorm with a rotating updraft. Only about one in four of them makes a tornado.</div>", STC_PARTS.map(function (p, j) { return [p[0], "", function () { stcModelTry(j); }]; }).concat([["Test yourself", "", function () {
var j = Math.floor(Math.random() * STC_PARTS.length), w = [j, (j + 2) % STC_PARTS.length, (j + 4) % STC_PARTS.length], sh = w.slice().sort(function () { return Math.random() - 0.5; });
stcAsk("🌩️ Supercell", "", STC_PARTS[j][1].replace(STC_PARTS[j][0], "This part"), sh.map(function (k) { return STC_PARTS[k][0]; }), sh.indexOf(j), "", function () { stcModelTry(); });
}]]));
},
function () {
stcDid("try_watch");
var Q = [["The radio says: <b>TORNADO WATCH</b> for your county until 9 pm. What does it mean?", ["A tornado is on the ground near you", "Conditions are right for tornadoes: be ready", "It is all over"], 1, "A watch means be ready: know where you will shelter, keep the radio on."],
["The siren sounds and your phone says <b>TORNADO WARNING</b>. What do you do?", ["Go outside and look", "Go to your shelter now", "Wait for a second warning"], 1, "A warning means a tornado is happening or radar shows one forming: shelter at once."]], q = Q[Math.floor(Math.random() * 2)];
stcAsk("📻 Watch or warning?", "The warning board", q[0], q[1], q[2], q[3], stcWatchTry);
},
function (st) {
st = st || { in: {}, msg: "" };
stcDid("try_pack");
var good = STC_PACK.filter(function (p) { return p[1]; }).length, got = Object.keys(st.in).filter(function (k) { return STC_PACK[k][1]; }).length;
var btns = STC_PACK.map(function (p, i) {
return [(st.in[i] ? "✓ " : "") + p[0], "", function () {
var n = { in: Object.assign({}, st.in), msg: "" };
if (n.in[i])
delete n.in[i];
else {
n.in[i] = 1;
n.msg = p[1] ? "Good: that goes in." : i === 2 ? "Not candles: they start fires, and there may be gas leaks after a storm. Use a flashlight." : i === 6 ? "Not sandals: there will be broken glass and nails. Sturdy shoes." : "That won't help you in a storm.";
}
stcPackTry(n);
}];
});
if (got === good) {
stcDid("pack_done");
}
stcHtml("🎒 Pack a storm kit", "Harlan's General Store", (st.msg ? "<div style='margin-bottom:6px'><b>" + st.msg + "</b></div>" : "") + stcRow("Good things packed", got + " of " + good) + (got === good ? "<div style='margin-top:6px;color:#B8F0A8'><b>All packed! Keep it by your shelter.</b></div>" : ""), btns);
},
function (done) {
done = done || [];
stcDid("try_drill");
var left = STC_DRILL.map(function (s, i) { return i; }).filter(function (i) { return done.indexOf(i) < 0; });
if (!left.length) {
stcDid("drill_done");
return stcHtml("✅ Drill done", "The shelter", "You did it in the right order. Practise at home too: everyone should know where to go before the siren sounds.", [["Done", "", function () { worldCard(null); }]]);
}
var sh = left.slice().sort(function () { return Math.random() - 0.5; });
stcHtml("🌪️ The shelter drill", "Pick the next step, in order", done.map(function (i, n) { return "<div>" + (n + 1) + ". " + STC_DRILL[i] + " ✓</div>"; }).join(""), sh.map(function (i) { return [STC_DRILL[i], "", function () { if (i === done.length)
stcDrillTry(done.concat([i]));
else
stcHtml("✗ Not yet", "", "First: <b>" + STC_DRILL[done.length] + "</b>.", [["Try again", "", function () { stcDrillTry(done); }]]); }]; }));
},
function () {
var g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x7A6248 }), dark = new THREE.MeshLambertMaterial({ color: 0x4A3A2C }), tin = new THREE.MeshPhongMaterial({ color: 0x8A9298, shininess: 50, specular: 0x555555 }), red = new THREE.MeshLambertMaterial({ color: 0x8A2A22 }), iron = new THREE.MeshLambertMaterial({ color: 0x2A2A2C });
[-1, 1].forEach(function (k) { wBox(0.5, 4.2, 0.5, dark, k * 1.75, 2.1, 0, g); });
wBox(4.0, 0.5, 0.5, dark, 0, 4.35, 0, g);
for (var b = 0; b < 6; b++) {
var bd = wBox(0.48, 3.9, 0.12, b % 2 ? wood : new THREE.MeshLambertMaterial({ color: 0x6E5840 }), -1.25 + b * 0.5, 1.95, 0.02, g);
}
wBox(3.0, 0.16, 0.14, dark, 0, 0.9, 0.1, g);
wBox(3.0, 0.16, 0.14, dark, 0, 3.1, 0.1, g);
var br = wBox(0.16, 2.7, 0.14, dark, 0, 2.0, 0.1, g);
br.rotation.z = 0.72;
wBox(0.4, 0.06, 0.06, iron, 0.9, 2.0, 0.2, g);
var aw = wBox(4.6, 0.08, 1.4, tin, 0, 4.9, 0.55, g);
aw.rotation.x = 0.18;
wBox(1.3, 0.5, 0.04, red, 0, 3.75, 0.14, g);
wBox(0.12, 2.6, 0.12, iron, 1.6, 6.3, 0, g);
var cups = new THREE.Group();
cups.position.set(1.6, 7.7, 0);
g.add(cups);
for (var c = 0; c < 3; c++) {
var a = c * 2.094, arm = wBox(0.5, 0.04, 0.04, iron, Math.cos(a) * 0.25, 0, Math.sin(a) * 0.25, cups);
arm.rotation.y = -a;
wSph(0.1, tin, Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5, cups, 8);
}
var vane = new THREE.Group();
vane.position.set(1.6, 7.25, 0);
g.add(vane);
wBox(1.0, 0.04, 0.04, iron, 0, 0, 0, vane);
wBox(0.04, 0.3, 0.4, iron, -0.5, 0, 0, vane);
STCD.cups = cups;
STCD.vane = vane;
var sg = wSign(["TORNADO ALLEY", "storm chasing on the Great Plains · real storms, real instruments · press E"], 4.2, 0.8, "#2A2E36", "#F0E2B8");
sg.position.set(-0.6, 6.4, 0.5);
g.add(sg);
var gl = wGlow(0xC8D4E8, 3.0, 0.22);
gl.position.set(0, 2.4, 0.5);
g.add(gl);
return g;
},
function () {
return { alu: stcMat(0xB4BAC0, null, { phong: 70, spec: 0x777777 }), blk: stcMat(0x1E2024, null, { phong: 30 }), wht: stcMat(0xE4E4DE, null, { phong: 20 }),
brass: stcMat(0xB08A3A, null, { phong: 80, spec: 0x886633 }), glass: stcMat(0xCFE6F0, null, { op: 0.22, phong: 90 }), red: stcMat(0xC8281E, null, { phong: 40 }),
galv: stcMat(0xA6ABAE, null, { phong: 50, ds: true }), wood: stcMat(0x5A3A22, "wood", { phong: 30 }), org: stcMat(0xD8642A, null, { phong: 45 }), grey: stcMat(0x6A7076, null, { phong: 40 }) };
},
function (x, y, z, s, parent, M) {
var g = stcGroup(x, y, z, 0, parent);
g.scale.setScalar(s);
stcCyl(0.022, 0.5, M.alu, 0, 0.25, 0, g, stcSeg(10));
stcCyl(0.014, 0.7, M.alu, 0, 0.5, 0, g, stcSeg(8)).rotation.z = Math.PI / 2;
stcBox(0.06, 0.05, 0.05, M.alu, 0, 0.5, 0, g);
stcCyl(0.032, 0.14, M.blk, -0.33, 0.57, 0, g, stcSeg(12));
stcCyl(0.02, 0.03, M.alu, -0.33, 0.655, 0, g, stcSeg(10));
var cups = stcKeepG(-0.33, 0.68, 0, 0, g);
stcCyl(0.022, 0.03, M.blk, 0, 0, 0, cups, stcSeg(10));
var shell = [[0, 0], [0.018, 0.004], [0.03, 0.014], [0.037, 0.028], [0.039, 0.04]];
for (var i = 0; i < 3; i++) {
var a = i * Math.PI * 2 / 3, R = 0.12, cx = Math.cos(a) * R, cz = Math.sin(a) * R;
stcStrut([Math.cos(a) * 0.015, 0, Math.sin(a) * 0.015], [cx, 0, cz], 0.0045, M.alu, cups, 5);
var cup = stcLathe("cup", shell, stcSeg(12), stcMat(0x1E2024, null, { phong: 40, ds: true }), cx, 0, cz, cups);
cup.quaternion.setFromUnitVectors(STC_UP, new THREE.Vector3(-Math.sin(a), 0, Math.cos(a)));
}
stcCyl(0.026, 0.12, M.blk, 0.33, 0.56, 0, g, stcSeg(12));
var vane = stcKeepG(0.33, 0.64, 0, 0, g);
stcCyl(0.016, 0.04, M.alu, 0, 0, 0, vane, stcSeg(8));
stcCyl(0.006, 0.42, M.alu, 0, 0.02, 0.05, vane, 5).rotation.x = Math.PI / 2;
var fin = stcBox(0.004, 0.09, 0.13, M.blk, 0, 0.03, 0.24, vane);
fin.rotation.x = -0.12;
stcLathe("vnose", [[0, 0], [0.02, 0.01], [0.012, 0.05], [0, 0.06]], stcSeg(10), M.alu, 0, 0.02, -0.16, vane).rotation.x = -Math.PI / 2;
STC.cupsG.push(cups);
(STC.vanes || (STC.vanes = [])).push({ g: vane, a: 0 });
return g;
},
function () {
var M = stcGearMats(), K = STCK;
[[16, -29.02], [24, -29.02]].forEach(function (p) { stcBox(3.6, 1.1, 0.03, stcMat(0xB89A70, "wood"), p[0], 1.55, p[1]); });
var tri = stcGroup(14.8, 0.94, -28.6, 0);
for (var t = 0; t < 3; t++) {
var a = t * 2.094 + 0.5;
stcStrut([Math.cos(a) * 0.22, 0, Math.sin(a) * 0.22], [0, 0.32, 0], 0.01, M.alu, tri, 5);
}
stcAnemoVane(14.8, 1.24, -28.6, 1.2, null, M);
var bg = stcGroup(17, 1.55, -28.98, 0);
var cs = stcCyl(0.19, 0.05, stcMat(0x4A2814, "wood", { phong: 60 }), 0, 0, 0.025, bg, stcSeg(28));
cs.rotation.x = Math.PI / 2;
var bz = new THREE.Mesh(new THREE.TorusGeometry(0.168, 0.014, stcSeg(8), stcSeg(32)), M.brass);
bz.position.z = 0.055;
bg.add(bz);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.16, stcSeg(32)), stcCanvasMat("barodial", 256, 256, stcBaroFace, { full: true, lit: true }));
face.position.z = 0.052;
bg.add(face);
var hand = stcKeepG(0, 0, 0.058, 0, bg);
stcBox(0.006, 0.135, 0.003, stcMat(0x101010, null), 0, 0.05, 0, hand);
stcBox(0.012, 0.035, 0.003, stcMat(0x101010, null), 0, -0.02, 0, hand);
var set = stcKeepG(0, 0, 0.062, 0, bg);
stcBox(0.004, 0.12, 0.002, M.brass, 0, 0.06, 0, set);
stcCyl(0.012, 0.008, M.brass, 0, 0, 0.066, bg, stcSeg(10)).rotation.x = Math.PI / 2;
var gl = new THREE.Mesh(new THREE.CircleGeometry(0.162, stcSeg(32)), M.glass);
gl.position.z = 0.07;
bg.add(gl);
STC.baroHand = { g: hand, set: set, a: 0, tap: 0 };
var bgr = stcGroup(16.6, 0.94, -28.45, 0);
stcBox(0.42, 0.06, 0.2, stcMat(0x4A2814, "wood", { phong: 60 }), 0, 0.03, 0, bgr);
for (var c = 0; c < 6; c++)
stcCyl(0.035, 0.008, M.brass, 0.12, 0.075 + c * 0.012, 0, bgr, stcSeg(14));
stcBox(0.012, 0.12, 0.012, M.brass, 0.12, 0.12, 0, bgr);
var drum = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.11, stcSeg(24), 1, true), stcCanvasMat("barochart", 256, 96, stcBarographDraw, { live: true, full: true, lit: true }));
drum.position.set(-0.07, 0.125, 0);
bgr.add(drum);
stcCyl(0.058, 0.006, M.brass, -0.07, 0.183, 0, bgr, stcSeg(20));
stcCyl(0.058, 0.006, M.brass, -0.07, 0.067, 0, bgr, stcSeg(20));
var pen = stcKeepG(0.12, 0.17, 0.06, 0, bgr);
stcBox(0.15, 0.003, 0.003, stcMat(0x2A2A2A, null), -0.075, 0, 0, pen);
stcBox(0.006, 0.01, 0.004, stcMat(0x6A1A8A, null), -0.15, 0, 0, pen);
pen.rotation.y = -0.32;
var cover = stcBox(0.44, 0.2, 0.22, M.glass, 0, 0.16, 0, bgr);
STC.barograph = { pen: pen, drum: drum, next: 0 };
var rack = stcGroup(18.6, 1.5, -28.98, 0);
stcBox(0.34, 0.5, 0.025, stcMat(0x5A3A22, "wood", { phong: 30 }), 0, 0, 0.012, rack);
stcCyl(0.016, 0.13, stcMat(0x2A1A10, null, { phong: 40 }), 0, 0.2, 0.06, rack, stcSeg(10));
var fr = stcKeepG(0, 0.14, 0.06, 0, rack);
stcBox(0.075, 0.3, 0.008, M.alu, 0, -0.15, 0, fr);
STC.psy = { g: fr, swing: 0, cols: [] };
[-0.018, 0.018].forEach(function (dx, i) {
var tube = stcCyl(0.0065, 0.25, M.glass, dx, -0.15, 0.01, fr, stcSeg(8));
stcSph(0.009, stcMat(0xB02020, null, { phong: 80 }), dx, -0.285, 0.01, fr, stcSeg(8));
var col = stcKeepG(dx, -0.275, 0.01, 0, fr);
var cm = stcCyl(0.0028, 1, stcMat(0xC8201A, null, { phong: 60 }), 0, 0.5, 0, col, 5);
STC.psy.cols.push(col);
if (i === 1)
stcCyl(0.011, 0.04, stcMat(0xF2F0E6, "cloth"), dx, -0.28, 0.01, fr, stcSeg(8));
for (var tk = 0; tk < 9; tk++)
stcBox(0.006, 0.0012, 0.001, stcMat(0x101010, null), dx + (i ? 0.011 : -0.011), -0.26 + tk * 0.026, 0.012, fr);
});
stcRainCan(22.4, 0, -27.75, M);
stcRound(22.4, -27.75, 0.16, 0, 0.8);
var tub = stcGroup(23.2, 0.94, -28.55, 0);
stcCyl(0.05, 0.02, M.blk, 0, 0.01, 0, tub, stcSeg(14));
stcCyl(0.032, 0.52, M.glass, 0, 0.28, 0, tub, stcSeg(14));
var wat = stcKeepG(0, 0.02, 0, 0, tub);
stcCyl(0.029, 1, stcMat(0x3A7ACC, null, { op: 0.75, phong: 90 }), 0, 0.5, 0, wat, stcSeg(14));
wat.scale.y = 0.001;
for (var r = 1; r <= 4; r++)
stcBox(0.012, 0.002, 0.002, stcMat(0x101010, null), 0.03, 0.02 + r * 0.127, 0.012, tub);
var stick = stcBox(0.012, 0.62, 0.004, stcMat(0xC8A060, "wood"), 0.02, 0.33, 0, tub);
stick.rotation.z = -0.06;
STC.rainTube = wat;
var so = stcGroup(24.2, 0.94, -28.5, 0.3);
stcBox(0.075, 0.14, 0.05, stcMat(0xF0F0EA, null), 0, 0.07, 0, so);
stcBox(0.06, 0.04, 0.002, stcMat(0x2A6AB0, null), 0, 0.1, 0.026, so);
var boom = stcBox(0.012, 0.12, 0.003, stcMat(0x9AA0A6, null, { phong: 60 }), 0.02, 0.19, 0, so);
boom.rotation.z = -0.25;
stcStrut([-0.02, 0.14, 0], [-0.06, 0.36, 0], 0.0012, M.blk, so, 4);
stcStrut([0.02, 0, 0], [0.11, 0, 0.02], 0.0012, M.blk, so, 4);
stcCyl(0.03, 0.05, M.wht, -0.12, 0.025, 0.03, so, stcSeg(12));
stcSph(0.045, stcMat(0xE04A1A, "cloth"), -0.13, 0.035, -0.06, so, stcSeg(10)).scale.y = 0.6;
var fill = stcGroup(25.35, 0.94, -28.55, 0);
stcCyl(0.08, 0.02, M.blk, 0, 0.01, 0, fill, stcSeg(14));
stcCyl(0.012, 0.32, M.alu, 0, 0.17, 0, fill, stcSeg(8));
var bal = stcKeepG(0, 0.62, 0, 0, fill);
var bb = stcSph(0.3, stcMat(0xEDE4D2, null, { phong: 60, op: 0.92 }), 0, 0, 0, bal, stcSeg(20));
bb.scale.set(1, 1.18, 1);
stcLathe("neck", [[0.03, -0.33], [0.022, -0.3], [0.018, -0.3], [0.04, -0.25], [0, -0.2]], stcSeg(10), stcMat(0xD8CEB8, null), 0, 0, 0, bal);
STC.fillBal = bal;
var cy = stcGroup(26.35, 0, -28.85, 0);
stcLathe("hecyl", [[0, 0], [0.115, 0], [0.115, 1.3], [0.1, 1.38], [0.05, 1.43], [0.03, 1.45], [0, 1.45]], stcSeg(18), stcMat(0x5A5A5A, null, { phong: 50 }), 0, 0, 0, cy);
stcCyl(0.116, 0.12, stcMat(0x4A6A3A, null, { phong: 50 }), 0, 1.3, 0, cy, stcSeg(18));
stcBox(0.05, 0.06, 0.05, M.brass, 0, 1.49, 0, cy);
stcCyl(0.035, 0.025, M.brass, 0.05, 1.5, 0, cy, stcSeg(12)).rotation.z = Math.PI / 2;
stcRound(26.35, -28.85, 0.14, 0, 1.5);
var hose = new THREE.CatmullRomCurve3([new THREE.Vector3(26.4, 1.5, -28.85), new THREE.Vector3(26.2, 1.2, -28.7), new THREE.Vector3(25.7, 0.97, -28.6), new THREE.Vector3(25.36, 1.0, -28.55), new THREE.Vector3(25.35, 1.22, -28.55)]);
var hm = new THREE.Mesh(new THREE.TubeGeometry(hose, STC.lite ? 12 : 24, 0.008, 5, false), stcMat(0x1A1A1A, null));
K.F.add(hm);
var tp = stcGroup(32.6, 0.94, -25, 0);
stcLathe("turtle", [[0, 0], [0.33, 0], [0.34, 0.012], [0.33, 0.03], [0.2, 0.11], [0.08, 0.16], [0.05, 0.17], [0, 0.172]], stcSeg(28), stcMat(0xD86A2A, "metal", { phong: 45 }), 0, 0, 0, tp);
for (var pp = 0; pp < 8; pp++) {
var pa = pp * Math.PI / 4;
var port = stcCyl(0.012, 0.012, M.blk, Math.cos(pa) * 0.26, 0.06, Math.sin(pa) * 0.26, tp, 8);
port.quaternion.setFromUnitVectors(STC_UP, new THREE.Vector3(Math.cos(pa) * 0.6, 0.8, Math.sin(pa) * 0.6).normalize());
}
var hd = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 6, stcSeg(14), Math.PI), M.alu);
hd.position.set(0, 0.17, 0);
tp.add(hd);
stcCyl(0.004, 0.16, M.blk, 0.04, 0.24, 0.03, tp, 4);
stcBox(0.06, 0.012, 0.04, stcMat(0x2A2A2A, null), -0.08, 0.15, 0.04, tp);
var led = stcBox(0.012, 0.006, 0.012, stcGlowM(0x4AFF4A), -0.08, 0.158, 0.04, tp);
led.userData.keep = 1;
tp.userData.keep = 1;
STC.turtleLed = led;
var ld = stcGroup(32.6, 0.94, -22.4, -Math.PI / 2);
stcCyl(0.06, 0.015, M.blk, 0.28, 0.008, 0, ld, stcSeg(12));
stcCyl(0.01, 0.18, M.alu, 0.28, 0.1, 0, ld, 6);
stcLathe("ldsens", [[0, 0], [0.045, 0], [0.045, 0.16], [0.04, 0.19], [0.02, 0.21], [0, 0.215]], stcSeg(16), M.wht, 0.28, 0.19, 0, ld);
stcBox(0.34, 0.018, 0.24, stcMat(0x2A2C30, null, { phong: 40 }), -0.05, 0.009, 0, ld);
stcBox(0.3, 0.002, 0.12, stcMat(0x15161A, null), -0.05, 0.019, 0.03, ld);
var lid = stcGroup(-0.05, 0.018, -0.12, 0, ld);
lid.rotation.x = -0.28;
stcBox(0.34, 0.23, 0.012, stcMat(0x2A2C30, null, { phong: 40 }), 0, 0.115, 0, lid);
var scr = stcPlane(0.31, 0.2, stcCanvasMat("ldscreen", 256, 160, stcLdDraw, { live: true, basic: true, full: true }), 0, 0.115, 0.0065, 0, lid);
scr.userData.keep = 1;
STC.ldScreen = { m: scr.material, next: 0 };
stcStrut([0.28, 0.02, 0], [0.12, 0.01, 0.06], 0.003, M.blk, ld, 4);
var hp = stcGroup(32.6, 0.94, -16.5, -Math.PI / 2);
stcBox(0.32, 0.035, 0.32, stcMat(0x8AB4D8, null), 0, 0.018, 0, hp);
var foil = stcFlat(0.31, 0.31, stcCanvasMat("hailfoil", 128, 128, stcHailFoilDraw, { lit: true }), 0, 0.0365, 0, hp);
foil.material.shininess = 60;
stcBox(0.3, 0.003, 0.03, stcMat(0xD8C890, "wood"), 0, 0.002, 0.22, hp);
var cal = stcGroup(0.26, 0.004, 0.1, 0.3, hp);
stcBox(0.18, 0.003, 0.015, M.alu, 0, 0, 0, cal);
stcBox(0.006, 0.003, 0.05, M.alu, -0.085, 0, -0.018, cal);
stcBox(0.006, 0.003, 0.05, M.alu, -0.035, 0, -0.018, cal);
stcCyl(0.06, 0.012, stcMat(0x2A2A2A, null), -0.24, 0.006, 0.08, hp, stcSeg(14));
[[0.032, 0], [0.022, 0.045], [0.014, -0.04]].forEach(function (h) { stcSph(h[0], stcMat(0xEAF2F8, null, { op: 0.85, phong: 90 }), -0.24 + h[1] * 0.6, 0.012 + h[0], 0.08 + h[1] * 0.3, hp, stcSeg(10)); });
},
function (x, y, z, M, parent) {
var g = stcGroup(x, y, z, 0, parent);
stcCyl(0.103, 0.6, M.galv, 0, 0.32, 0, g, stcSeg(22));
var top = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.103, 0.08, stcSeg(22), 1, true), M.galv);
top.position.y = 0.66;
g.add(top);
stcLathe("funnel", [[0.03, 0.52], [0.06, 0.58], [0.1, 0.65], [0.104, 0.7]], stcSeg(22), M.galv, 0, 0, 0, g);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.004, 4, stcSeg(22)), M.galv);
rim.rotation.x = Math.PI / 2;
rim.position.y = 0.7;
g.add(rim);
stcCyl(0.1, 0.02, M.galv, 0, 0.01, 0, g, stcSeg(18));
for (var i = 0; i < 3; i++) {
var a = i * 2.094;
stcStrut([Math.cos(a) * 0.1, 0.05, Math.sin(a) * 0.1], [Math.cos(a) * 0.2, 0, Math.sin(a) * 0.2], 0.006, M.galv, g, 4);
}
return g;
},
function (c, W, H) {
var s = W / 256, cx = W / 2, cy = H / 2;
c.fillStyle = "#F2ECDA";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#3A2A1A";
c.lineWidth = 1.5 * s;
c.beginPath();
c.arc(cx, cy, 104 * s, -Math.PI / 2 - 2.36, -Math.PI / 2 + 2.36);
c.stroke();
for (var mb = 950; mb <= 1050; mb += 2) {
var a = (mb - 1000) / 50 * 2.36, big = mb % 10 === 0, r0 = (big ? 92 : 98) * s;
c.lineWidth = (big ? 2.4 : 1) * s;
c.beginPath();
c.moveTo(cx + Math.sin(a) * r0, cy - Math.cos(a) * r0);
c.lineTo(cx + Math.sin(a) * 104 * s, cy - Math.cos(a) * 104 * s);
c.stroke();
if (mb % 20 === 0) {
c.fillStyle = "#2A2A2A";
c.font = (11 * s) + "px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(mb, cx + Math.sin(a) * 80 * s, cy - Math.cos(a) * 80 * s);
}
}
c.font = "bold " + (12 * s) + "px Georgia";
c.fillStyle = "#7A1A10";
[["STORMY", 965], ["RAIN", 982], ["CHANGE", 1000], ["FAIR", 1018], ["VERY DRY", 1036]].forEach(function (w) { var a = (w[1] - 1000) / 50 * 2.36; c.save(); c.translate(cx + Math.sin(a) * 58 * s, cy - Math.cos(a) * 58 * s); c.rotate(a); c.fillText(w[0], 0, 0); c.restore(); });
c.fillStyle = "#3A3A3A";
c.font = (10 * s) + "px Georgia";
c.fillText("MILLIBARS", cx, cy + 44 * s);
c.font = "italic " + (9 * s) + "px Georgia";
c.fillText("Stormhaven", cx, cy + 58 * s);
},
function (c, W, H) {
c.fillStyle = "#F4F0E2";
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(120,60,140,.35)";
c.lineWidth = 1;
for (var y = 0; y <= 8; y++) {
c.beginPath();
c.moveTo(0, y * H / 8);
c.lineTo(W, y * H / 8);
c.stroke();
}
for (var x = 0; x < 16; x++) {
c.beginPath();
c.moveTo(x * W / 16, 0);
c.quadraticCurveTo(x * W / 16 + 6, H / 2, x * W / 16, H);
c.stroke();
}
var B = (typeof STC_HANDS !== "undefined" && STC_HANDS.baro) || [];
if (B.length < 2)
return;
c.strokeStyle = "#5A1A7A";
c.lineWidth = 2;
c.beginPath();
var t1 = B[B.length - 1][0];
B.forEach(function (p, i) { var px = W - (t1 - p[0]) / 900 * W * 0.45, py = H / 2 - (p[1] - 1000) / 30 * H * 0.45; if (i)
c.lineTo(px, py);
else
c.moveTo(px, py); });
c.stroke();
},
function (c, W, H) {
c.fillStyle = "#08140E";
c.fillRect(0, 0, W, H);
var cx = W * 0.38, cy = H / 2, R = H * 0.44, s = W / 256;
c.strokeStyle = "rgba(90,220,140,.35)";
c.lineWidth = 1;
c.font = (8 * s) + "px monospace";
c.fillStyle = "rgba(90,220,140,.7)";
for (var r = 1; r <= 3; r++) {
c.beginPath();
c.arc(cx, cy, R * r / 3, 0, 7);
c.stroke();
c.fillText(r + " mi", cx + R * r / 3 - 14 * s, cy - 2);
}
c.beginPath();
c.moveTo(cx - R, cy);
c.lineTo(cx + R, cy);
c.moveTo(cx, cy - R);
c.lineTo(cx, cy + R);
c.stroke();
c.fillStyle = "#8AF0A8";
c.fillRect(cx - 2, cy - 2, 4, 4);
var H2 = (typeof STC_HANDS !== "undefined") ? STC_HANDS : { strikes: [], t: 0 }, n5 = 0, near = null;
H2.strikes.forEach(function (k) {
var age = H2.t - k.t;
if (age < 300)
n5++;
var dx = (k.x - 20) / 1609, dz = (k.z + 28) / 1609, d = Math.hypot(dx, dz);
if (age < 300 && (!near || d < near))
near = d;
if (d > 3.2)
return;
var a = Math.max(0.15, 1 - age / 300);
c.strokeStyle = "rgba(255," + (age < 20 ? 240 : 200) + ",80," + a + ")";
c.lineWidth = (age < 20 ? 2.5 : 1.5) * s;
var px = cx + dx / 3 * R, py = cy + dz / 3 * R;
c.beginPath();
c.moveTo(px - 4 * s, py);
c.lineTo(px + 4 * s, py);
c.moveTo(px, py - 4 * s);
c.lineTo(px, py + 4 * s);
c.stroke();
});
c.fillStyle = "#BFF5CF";
c.font = "bold " + (10 * s) + "px monospace";
c.textAlign = "left";
c.fillText("STRIKES", W * 0.72, H * 0.18);
c.font = "bold " + (20 * s) + "px monospace";
c.fillText(String(n5), W * 0.72, H * 0.36);
c.font = (8 * s) + "px monospace";
c.fillText("last 5 min", W * 0.72, H * 0.45);
c.fillText("NEAREST", W * 0.72, H * 0.62);
c.font = "bold " + (13 * s) + "px monospace";
c.fillText(near === null ? "--" : near.toFixed(1) + " mi", W * 0.72, H * 0.76);
c.font = (7 * s) + "px monospace";
c.fillText("N ↑", cx - 6 * s, cy - R - 2);
},
function (c, W, H) {
var g = c.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#D8DCE0");
g.addColorStop(0.5, "#F2F4F6");
g.addColorStop(1, "#C8CCD0");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
var seed = 7;
function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
[2.75, 2.5, 2.5, 2.25, 2.25, 2, 1, 1, 1, 0.75, 0.5, 0.5, 0.75, 1.25].forEach(function (inch) {
var r = inch * 0.0254 / 0.31 * W / 2, x = r + rnd() * (W - 2 * r), y = r + rnd() * (H - 2 * r);
var dg = c.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
dg.addColorStop(0, "#5E646A");
dg.addColorStop(0.7, "#9CA2A8");
dg.addColorStop(1, "#F8FAFC");
c.fillStyle = dg;
c.beginPath();
c.ellipse(x, y, r, r * (0.8 + rnd() * 0.2), rnd() * 3, 0, 7);
c.fill();
c.strokeStyle = "rgba(60,60,60,.35)";
c.lineWidth = 1;
c.stroke();
});
},
function (ct) {
var M = stcGearMats(), y = ct.userData.roofY;
var rs = stcGroup(0, y + 0.04, 0, 0, ct);
[-0.35, 0.45].forEach(function (z) { stcBox(1.5, 0.03, 0.04, M.blk, 0, 0.02, z, rs); stcBox(0.04, 0.06, 0.06, M.blk, -0.7, 0, z, rs); stcBox(0.04, 0.06, 0.06, M.blk, 0.7, 0, z, rs); });
stcBox(0.04, 0.03, 0.85, M.alu, 0.45, 0.05, 0.05, rs);
stcCyl(0.02, 0.8, M.alu, 0.45, 0.45, 0.45, rs, stcSeg(8));
stcAnemoVane(0.45, 0.85, 0.45, 1, rs, M);
stcBox(0.3, 0.02, 0.02, M.alu, 0.3, 0.6, 0.45, rs);
for (var i = 0; i < 6; i++)
stcCyl(0.06 - i * 0.002, 0.008, M.wht, 0.15, 0.5 + i * 0.025, 0.45, rs, stcSeg(12));
stcLathe("gps", [[0, 0], [0.05, 0], [0.045, 0.015], [0.025, 0.022], [0, 0.024]], stcSeg(12), M.blk, -0.4, 0.035, -0.1, rs);
stcCyl(0.004, 0.45, M.blk, -0.55, 0.25, -0.3, rs, 4);
},
function (rt) {
var M = stcGearMats(), base = stcGroup(0, 1.42, -1.95, 0, rt);
stcBox(1.4, 0.35, 1.4, M.grey, 0, 0.175, 0, base);
stcBox(1.5, 0.04, 1.5, M.blk, 0, 0.36, 0, base);
stcCyl(0.5, 0.22, M.wht, 0, 0.48, 0, base, stcSeg(24));
var az = stcKeepG(0, 0.6, 0, 0, base);
stcCyl(0.55, 0.08, M.grey, 0, 0.04, 0, az, stcSeg(24));
stcBox(2.9, 0.14, 0.36, M.wht, 0, 0.12, 0, az);
[-1.38, 1.38].forEach(function (x) { stcBox(0.14, 1.25, 0.36, M.wht, x, 0.75, 0, az); stcCyl(0.12, 0.2, M.grey, x, 1.3, 0, az, stcSeg(14)).rotation.z = Math.PI / 2; });
var el = stcKeepG(0, 1.3, 0, 0, az);
[-1.27, 1.27].forEach(function (x) { stcCyl(0.06, 0.22, M.alu, x, 0, 0, el, stcSeg(10)).rotation.z = Math.PI / 2; });
var dish = stcGroup(0, 0, -0.25, 0, el);
dish.rotation.x = Math.PI / 2;
var f = 0.85, pts = [];
for (var i = 0; i <= 10; i++) {
var r = 1.2 * i / 10;
pts.push([r, r * r / (4 * f)]);
}
stcLathe("dish", pts, stcSeg(32), stcMat(0xE8E8E2, null, { phong: 30, ds: true }), 0, 0, 0, dish);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.025, 5, stcSeg(32)), M.wht);
rim.rotation.x = Math.PI / 2;
rim.position.y = 1.44 / (4 * f);
dish.add(rim);
stcCyl(0.22, 0.25, M.grey, 0, -0.08, 0, dish, stcSeg(14));
for (var k = 0; k < 8; k++) {
var a = k * Math.PI / 4;
stcStrut([0, -0.05, 0], [Math.cos(a) * 1.15, 1.32 / (4 * f) - 0.05, Math.sin(a) * 1.15], 0.018, M.grey, dish, 4);
}
for (var s = 0; s < 4; s++) {
var b = s * Math.PI / 2 + Math.PI / 4;
stcStrut([Math.cos(b) * 1.12, 1.25 / (4 * f), Math.sin(b) * 1.12], [0, f - 0.05, 0], 0.012, M.alu, dish, 4);
}
stcLathe("horn", [[0, 0], [0.07, 0], [0.12, 0.12], [0.12, 0.14], [0, 0.14]], stcSeg(12), M.grey, 0, f - 0.14, 0, dish).rotation.x = Math.PI;
stcBox(0.6, 0.5, 0.4, M.grey, 0, -0.05, -0.75, el);
stcBox(0.9, 0.7, 0.6, stcMat(0xD8D4C8, null, { phong: 20 }), 0.55, 1.77, 0.25, rt);
stcBox(0.5, 0.5, 0.6, M.blk, -0.45, 1.67, 0.25, rt);
STC.dish = az;
STC.dishEl = { g: el, turn: 0, step: 0 };
},
function (mx, mz) {
var M = stcGearMats();
stcAnemoVane(mx, 10, mz, 1.6, null, M);
stcStrut([mx, 10.9, mz], [mx, 11.8, mz], 0.012, M.alu, null, 5);
stcBox(0.4, 0.5, 0.2, M.wht, mx, 1.5, mz + 0.55);
stcBox(0.06, 0.06, 0.04, M.grey, mx + 0.12, 1.2, mz + 0.66);
var sp = stcGroup(mx, 3.2, mz + 0.6, 0);
stcBox(0.04, 0.04, 0.3, M.alu, 0, 0, -0.15, sp);
var pn = stcBox(0.7, 0.025, 0.5, stcMat(0x1A2A4A, null, { phong: 90, spec: 0x8899AA }), 0, 0.15, 0.1, sp);
pn.rotation.x = 0.8;
stcBox(0.6, 0.02, 0.02, M.alu, mx - 0.3, 2, mz);
for (var i = 0; i < 7; i++)
stcCyl(0.08 - i * 0.003, 0.01, M.wht, mx - 0.6, 1.85 + i * 0.03, mz, null, stcSeg(12));
var sc = stcGroup(mx + 4, 0, mz, 0), W = stcMat(0xEFEFE8, "wood");
[[-0.42, -0.32], [0.42, -0.32], [-0.42, 0.32], [0.42, 0.32]].forEach(function (p) { stcBox(0.07, 1.15, 0.07, W, p[0], 0.575, p[1], sc); });
stcBox(0.95, 0.04, 0.75, W, 0, 1.15, 0, sc);
stcBox(1.05, 0.04, 0.85, W, 0, 1.86, 0, sc);
stcBox(1.0, 0.04, 0.8, W, 0, 1.94, 0, sc);
[[0, 0.36, 0], [0, -0.36, Math.PI], [0.46, 0, Math.PI / 2], [-0.46, 0, -Math.PI / 2]].forEach(function (f) {
var sd = stcGroup(f[0], 1.17, f[1], f[2], sc), wd = Math.abs(f[1]) > 0 ? 0.9 : 0.7;
stcBox(0.04, 0.68, 0.03, W, -wd / 2, 0.34, 0, sd);
stcBox(0.04, 0.68, 0.03, W, wd / 2, 0.34, 0, sd);
for (var k = 0; k < (STC.lite ? 6 : 11); k++) {
var sl = stcBox(wd, 0.075, 0.01, W, 0, 0.04 + k * (STC.lite ? 0.115 : 0.062), 0, sd);
sl.rotation.x = 0.75;
}
});
stcSolid(mx + 4, mz, 0.5, 0.4, 0, 2);
var rc = stcRainCan(mx + 6, 0, mz, M);
},
function (dt, R) {
var L = worldLocal(), nearG = Math.hypot(L.x - 24, L.z + 22) < 40;
(STC.vanes || []).forEach(function (v, i) {
var want = -R.dir * Math.PI / 180 + Math.sin(STC.t * (1.3 + i * 0.2) + i) * Math.min(0.35, 0.04 + R.wind * 0.004);
var d = ((want - v.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
v.a += d * Math.min(1, dt * 2.5);
v.g.rotation.y = v.a;
});
var BH = STC.baroHand;
if (BH) {
var want = (R.p - 1000) / 50 * 2.36 + (BH.tap > 0 ? Math.sin(BH.tap * 40) * 0.03 * BH.tap : 0);
BH.a += (want - BH.a) * Math.min(1, dt * 1.5);
BH.g.rotation.z = -BH.a;
if (BH.tap > 0)
BH.tap = Math.max(0, BH.tap - dt);
var H = STC_HANDS.baro;
if (H.length)
BH.set.rotation.z = -(H[0][1] - 1000) / 50 * 2.36;
}
var BG = STC.barograph;
if (BG) {
BG.pen.rotation.z = Math.max(-0.35, Math.min(0.35, (R.p - 1000) / 30 * 0.3));
BG.drum.rotation.y -= dt * 0.002;
if (nearG && STC_HANDS.t > BG.next) {
BG.next = STC_HANDS.t + 10;
var mp = BG.drum.material.map;
if (mp && mp.image && mp.image.getContext) {
stcBarographDraw(mp.image.getContext("2d"), mp.image.width, mp.image.height);
mp.needsUpdate = true;
}
}
}
var P = STC.psy;
if (P) {
var Tw = typeof stcWetBulb === "function" ? stcWetBulb(R.T, R.RH) : R.T - 4, h = function (c) { return Math.max(0.01, Math.min(0.235, (c + 10) / 60 * 0.235)); };
P.cols[0].scale.y = h(R.T);
P.cols[1].scale.y = h(Tw);
if (P.swing > 0) {
P.swing = Math.max(0, P.swing - dt);
P.g.rotation.z += dt * 14 * Math.min(1, P.swing);
}
else
P.g.rotation.z *= Math.max(0, 1 - dt * 3);
}
if (STC.rainTube) {
var inch = STC_HANDS.rain / 25.4;
STC.rainTube.scale.y = Math.max(0.001, Math.min(0.5, inch * 0.254));
}
if (STC.fillBal) {
STC.fillBal.position.y = 0.62 + Math.sin(STC.t * 1.7) * 0.008;
STC.fillBal.rotation.z = Math.sin(STC.t * 1.1) * 0.03;
}
if (STC.turtleLed)
STC.turtleLed.visible = (STC.t % 1.2) < 0.15;
var LD = STC.ldScreen;
if (LD && nearG && STC_HANDS.t > LD.next) {
LD.next = STC_HANDS.t + 0.5;
var m = LD.m.map;
if (m && m.image && m.image.getContext) {
stcLdDraw(m.image.getContext("2d"), m.image.width, m.image.height);
m.needsUpdate = true;
}
}
var DE = STC.dishEl;
if (DE && STC.dish) {
DE.turn += dt * 0.8;
if (DE.turn > Math.PI * 2) {
DE.turn -= Math.PI * 2;
DE.step = (DE.step + 1) % 6;
}
var want2 = -[0.01, 0.03, 0.06, 0.1, 0.15, 0.22][DE.step];
DE.g.rotation.x += (want2 - DE.g.rotation.x) * Math.min(1, dt * 2);
}
}
];
});
