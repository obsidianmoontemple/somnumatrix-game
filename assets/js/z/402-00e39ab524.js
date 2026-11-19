/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(402, function () {
"use strict";
return [
function (c) {
var d = wndDefaults();
if (!c || typeof c !== "object")
return d;
var p = Math.round(+c.pass);
if (!(p >= 5 && p <= 10))
p = 8;
var o = { open: c.open !== false, talk: c.talk !== false, later: c.later !== false, view: c.view === "now" ? "now" : "then", pass: p, sites: {}, notes: String(c.notes || "").slice(0, 1200) };
WND_SITES.forEach(function (r) { o.sites[r[0]] = !(c.sites && c.sites[r[0]] === false); });
return o;
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (WND.mats[k])
return WND.mats[k];
var cc = new THREE.Color(col), lum = 0.2126 * cc.r + 0.7152 * cc.g + 0.0722 * cc.b;
if (lum > 0.6 && o.e === undefined)
cc.multiplyScalar(0.6 / lum);
var m = o.phong && !wndLite() ? new THREE.MeshPhongMaterial({ color: cc, shininess: o.phong, specular: o.spec || 0x333333 }) : new THREE.MeshLambertMaterial({ color: cc });
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
WND.mats[k] = m;
return m;
},
function (key, w, h, draw, o) {
o = o || {};
var k = "cv|" + key;
if (WND.mats[k])
return WND.mats[k];
if (WND.lite && !o.full) {
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
if (o.rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(o.rep[0], o.rep[1]);
}
var m = o.basic ? new THREE.MeshBasicMaterial({ map: t, transparent: !!o.op, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide })
: new THREE.MeshLambertMaterial({ map: t, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
if (!o.basic && !o.e && !o.lit)
m.color.setHex(0xDCDCDC);
if (o.e) {
m.emissive = new THREE.Color(0xFFFFFF);
m.emissiveMap = t;
m.emissiveIntensity = o.e;
}
WND.mats[k] = m;
return m;
},
function (obj, h) {
if (!obj || !WND.G)
return 0;
WND.G.updateMatrixWorld(true);
var gp = new THREE.Vector3().setFromMatrixPosition(WND.G.matrixWorld), bb = new THREE.Box3(), n = 0;
obj.traverse(function (o) {
if (!o.isMesh || !o.geometry)
return;
bb.setFromObject(o);
if (bb.max.y - gp.y < 0.4 || bb.min.y - gp.y > 2 || bb.max.x - bb.min.x < 0.3 || bb.max.z - bb.min.z < 0.3)
return;
wndSolid((bb.min.x + bb.max.x) / 2 - gp.x - WNK.ox, (bb.min.z + bb.max.z) / 2 - gp.z - WNK.oz, (bb.max.x - bb.min.x) / 2 * 0.92, (bb.max.z - bb.min.z) / 2 * 0.92, 0, h || (bb.max.y - gp.y));
n++;
});
return n;
},
function (L, x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, best = null, i, F;
for (i = 0; i < L.floors.length; i++) {
F = L.floors[i];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y <= f + 0.75 && (best === null || F.y > best) && wndVOk(F.v))
best = F.y;
}
for (i = 0; i < L.ramps.length; i++) {
F = L.ramps[i];
if (x < F.x0 || x > F.x1 || z < F.z0 || z > F.z1 || !wndVOk(F.v))
continue;
var a = F.axis === "x" ? x : z, t = Math.max(0, Math.min(1, (a - F.a0) / (F.a1 - F.a0))), y = F.y0 + (F.y1 - F.y0) * t;
if (y <= f + 0.75 && (best === null || y > best))
best = y;
}
return best;
},
function (L, x, z, feet) {
for (var i = 0; i < L.solids.length; i++) {
var s = L.solids[i];
if (!wndVOk(s.v))
continue;
if (s.h !== undefined && feet > (s.b || 0) + s.h - 0.3)
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
for (i = 0; i < L.water.length; i++) {
var W = L.water[i];
if (!wndVOk(W.v))
continue;
if (W.top !== undefined && feet > W.top + 2)
continue;
var inW = W.r !== undefined ? Math.hypot(x - W.x, z - W.z) < W.r : (Math.abs(x - W.x) < W.hw && Math.abs(z - W.z) < W.hd);
if (inW && W.not && W.not.some(function (R) { return x >= R[0] && x <= R[2] && z >= R[1] && z <= R[3]; }))
inW = false;
if (inW)
return true;
}
return false;
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
wndBox(len, hh, t, mat, mid, y0 + hh / 2, c);
else
wndBox(t, hh, len, mat, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
wndSolid(mid, c, len / 2, t / 2, y0, hh);
else
wndSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2), sill = O.sill || 0, top = Math.min(h, sill + (O.h || 2.8)), yb = y + sill;
seg(cur, s0, y, y + h, true);
seg(s0, s1, y + top, y + h, false);
if (sill > 0)
seg(s0, s1, y, yb, true);
if (O.glass) {
var gm = wndMat(0xBFE0F0, null, { op: 0.25 });
if (dir === "x")
wndBox(s1 - s0, top - sill, 0.05, gm, (s0 + s1) / 2, yb + (top - sill) / 2, c);
else
wndBox(0.05, top - sill, s1 - s0, gm, c, yb + (top - sill) / 2, (s0 + s1) / 2);
}
if (!O.noStep && !sill) {
if (dir === "x")
wndFloor(s0, c - 0.9, s1, c + 0.9, yb);
else
wndFloor(c - 0.9, s0, c + 0.9, s1, yb);
}
if (O.frame && !sill) {
var fr = O.frame, fh = top, dp = t + 0.2;
if (dir === "x") {
wndBox(0.3, fh, dp, fr, s0 - 0.15, yb + fh / 2, c);
wndBox(0.3, fh, dp, fr, s1 + 0.15, yb + fh / 2, c);
wndBox(s1 - s0 + 0.6, 0.4, dp, fr, (s0 + s1) / 2, yb + fh + 0.2, c);
}
else {
wndBox(dp, fh, 0.3, fr, c, yb + fh / 2, s0 - 0.15);
wndBox(dp, fh, 0.3, fr, c, yb + fh / 2, s1 + 0.15);
wndBox(dp, 0.4, s1 - s0 + 0.6, fr, c, yb + fh + 0.2, (s0 + s1) / 2);
}
}
cur = s1;
});
seg(cur, hi, y, y + h, true);
},
function (R) {
var ins = R.inset === undefined ? 0.2 : R.inset;
R = Object.assign({}, R, { x0: R.x0 + ins, x1: R.x1 - ins, z0: R.z0 + ins, z1: R.z1 - ins });
var y = R.y || 0, h = R.h || 5, t = R.t || 0.4, D = R.doors || {}, sk = R.skip || "";
var fl = R.floor || wndMat(0xE8E0D0, "marble", { phong: 60 }), wl = R.wall || wndMat(0xE8DCC8, "plaster"), ce = R.ceil === null ? null : (R.ceil || wndMat(0xF2EDE4, "plaster"));
var w = R.x1 - R.x0, d = R.z1 - R.z0, cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2;
if (R.floor !== null) {
wndBox(w, 0.3, d, fl, cx, y - 0.15, cz);
wndFloor(R.x0, R.z0, R.x1, R.z1, y);
}
if (ce)
wndBox(w, 0.25, d, ce, cx, y + h + 0.12, cz);
if (sk.indexOf("n") < 0)
wndWall("x", R.x0, R.x1, R.z0, y, h, t, wl, D.n);
if (sk.indexOf("s") < 0)
wndWall("x", R.x0, R.x1, R.z1, y, h, t, wl, D.s);
if (sk.indexOf("w") < 0)
wndWall("z", R.z0, R.z1, R.x0, y, h, t, wl, D.w);
if (sk.indexOf("e") < 0)
wndWall("z", R.z0, R.z1, R.x1, y, h, t, wl, D.e);
if (R.name)
WNK.rooms.push({ x0: R.x0 + WNK.ox, z0: R.z0 + WNK.oz, x1: R.x1 + WNK.ox, z1: R.z1 + WNK.oz, y: y, h: h, name: R.name, site: WNK.site, v: WNK.v });
return { x0: R.x0, z0: R.z0, x1: R.x1, z1: R.z1, cx: cx, cz: cz, w: w, d: d, y: y, h: h };
},
function (key, title, text, w, h, x, y, z, ry, o) {
o = o || {};
var bg = o.bg || "#F4EEDC", fg = o.fg || "#2A2218", ac = o.ac || "#8A5A1A";
var m = wndCanvasMat("pl-" + key, 512, Math.round(512 * h / w), function (c, W, H) {
c.fillStyle = bg;
c.fillRect(0, 0, W, H);
c.strokeStyle = ac;
c.lineWidth = 6;
c.strokeRect(8, 8, W - 16, H - 16);
c.fillStyle = ac;
c.font = "bold " + Math.round(W / 17) + "px Georgia";
c.textAlign = "center";
c.fillText(title, W / 2, W / 11);
c.fillStyle = fg;
c.textAlign = "left";
var fs = Math.round(W / 27);
c.font = fs + "px Georgia";
var words = String(text).split(" "), line = "", yy = W / 11 + fs * 1.8;
words.forEach(function (wd) { var t = line ? line + " " + wd : wd; if (c.measureText(t).width > W - 56) {
c.fillText(line, 28, yy);
yy += fs * 1.3;
line = wd;
}
else
line = t; });
if (line)
c.fillText(line, 28, yy);
}, { full: true });
var p = wndPlane(w, h, m, x, y, z, ry, o.parent);
p.userData.keep = 1;
return p;
},
function (x, y, z, s, col, parent) {
var P = parent || wndP(), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var core = new THREE.Mesh(new THREE.ConeGeometry(0.05 * s, 0.22 * s, 8), new THREE.MeshBasicMaterial({ color: col || 0xFFB050, transparent: true, opacity: 0.95 }));
core.position.y = 0.11 * s;
g.add(core);
var gl = (typeof wGlow === "function") ? wGlow(col || 0xFF9A40, 0.9 * s, 0.55) : null;
if (gl) {
gl.position.y = 0.14 * s;
g.add(gl);
}
var F = { g: g, core: core, gl: gl, s: s, ph: Math.random() * 20, base: 0.55 };
WNK.flames.push(F);
g.userData.keep = 1;
return F;
},
function (t, list) {
var step = WND.lite ? 2 : 1, off = (Math.floor(t * 10) % step);
for (var i = off; i < list.length; i += step) {
var F = list[i];
if (!F.g.visible)
continue;
var k = 1 + 0.09 * Math.sin(t * 3.7 + F.ph) + 0.06 * Math.sin(t * 5.3 + F.ph * 1.7);
F.core.scale.set(1, k, 1);
if (F.gl)
F.gl.material.opacity = Math.max(0.2, Math.min(0.85, F.base * (0.92 + 0.08 * Math.sin(t * 2.9 + F.ph))));
}
},
function (col, key) {
return wndCanvasMat("flute-" + key, 128, 64, function (c, W, H) {
var g = c.createLinearGradient(0, 0, W, 0);
for (var i = 0; i < 20; i++) {
g.addColorStop(i / 20, "rgba(0,0,0,0)");
g.addColorStop((i + 0.5) / 20, "rgba(0,0,0,0.22)");
}
c.fillStyle = "#" + ("00000" + col.toString(16)).slice(-6);
c.fillRect(0, 0, W, H);
c.fillStyle = g;
c.fillRect(0, 0, W, H);
}, { rep: [1, 1], full: true });
},
function (x, y, z, h, r, order, mat, parent, o) {
o = o || {};
var P = parent || wndP(), seg = WND.lite ? 10 : 20, g = wndGroup(x, y, z, 0, P), cap = mat;
var sh = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.86, r, h * 0.9, seg), o.flute || mat);
sh.position.y = h * 0.45 + (order === "ionic" ? r * 0.3 : 0);
g.add(sh);
if (order === "ionic") {
wndCyl(r * 1.25, r * 0.3, cap, 0, r * 0.15, 0, g, seg);
wndCyl(r * 1.1, r * 0.12, cap, 0, r * 0.36, 0, g, seg);
}
if (order === "doric") {
wndCyl(r * 1.15, h * 0.05, cap, 0, h * 0.925, 0, g, seg, r * 0.86);
wndBox(r * 2.5, h * 0.05, r * 2.5, cap, 0, h * 0.975, 0, g);
}
else if (order === "ionic") {
wndBox(r * 2.3, h * 0.035, r * 1.6, cap, 0, h * 0.94, 0, g);
[-1, 1].forEach(function (s) {
var v = new THREE.Mesh(new THREE.TorusGeometry(r * 0.32, r * 0.14, 6, WND.lite ? 8 : 14), cap);
v.position.set(s * r * 1.05, h * 0.915, 0);
g.add(v);
});
wndBox(r * 2.1, h * 0.03, r * 2.1, cap, 0, h * 0.985, 0, g);
}
else if (order === "egypt") {
wndCyl(r * 1.4, h * 0.08, cap, 0, h * 0.94, 0, g, seg, r * 0.9);
wndBox(r * 2, h * 0.04, r * 2, cap, 0, h * 0.995, 0, g);
}
else
wndBox(r * 2.2, h * 0.06, r * 2.2, cap, 0, h * 0.97, 0, g);
if (o.solid !== false)
wndRound(x, z, r * 1.05, y, h);
return g;
},
function (list, h, r, order, mat, parent, o) {
o = o || {};
var P = parent || wndP(), seg = WND.lite ? 10 : 18, n = list.length, M = new THREE.Matrix4();
function inst(geo, m, dy) { var im = new THREE.InstancedMesh(geo, m, n); list.forEach(function (p, i) { M.makeTranslation(p[0], (p[1] || 0) + dy, p[2]); im.setMatrixAt(i, M); }); im.instanceMatrix.needsUpdate = true; P.add(im); im.userData.keep = 1; return im; }
var base = order === "ionic" ? r * 0.45 : 0;
inst(new THREE.CylinderGeometry(r * 0.86, r, h * 0.9 - base, seg), o.flute || mat, base + (h * 0.9 - base) / 2);
if (order === "ionic") {
inst(new THREE.CylinderGeometry(r * 1.25, r * 1.3, base, seg), mat, base / 2);
inst(new THREE.BoxGeometry(r * 2.6, h * 0.06, r * 1.7), mat, h * 0.93);
inst(new THREE.BoxGeometry(r * 2.3, h * 0.04, r * 2.3), mat, h * 0.98);
var tg = new THREE.TorusGeometry(r * 0.34, r * 0.14, 6, WND.lite ? 8 : 12);
tg.translate(r * 1.15, 0, 0);
inst(tg, mat, h * 0.91);
var tg2 = new THREE.TorusGeometry(r * 0.34, r * 0.14, 6, WND.lite ? 8 : 12);
tg2.translate(-r * 1.15, 0, 0);
inst(tg2, mat, h * 0.91);
}
else {
inst(new THREE.CylinderGeometry(r * 1.15, r * 0.86, h * 0.05, seg), mat, h * 0.925);
inst(new THREE.BoxGeometry(r * 2.5, h * 0.05, r * 2.5), mat, h * 0.975);
}
if (o.solid !== false)
list.forEach(function (p) { wndRound(p[0], p[2], r * 1.05, p[1] || 0, h); });
},
function (kind, x, y, z, s, parent) {
var P = parent || wndP(), g = wndGroup(x, y, z, (x * 7 + z * 13) % 6.28, P);
s = s || 1;
var bark = wndMat(0x6A4E34, "bark"), lf = wndMat(kind === "olive" ? 0x7A8A5A : kind === "cypress" ? 0x2A4A2A : kind === "palm" ? 0x4A7A2A : 0x3A6A2A, "foliage");
if (kind === "palm") {
var tr = wndCyl(0.22 * s, 8 * s, bark, 0, 4 * s, 0, g, 7, 0.16 * s);
tr.rotation.z = 0.06;
for (var i = 0; i < (WND.lite ? 5 : 8); i++) {
var f = wndBox(0.5 * s, 0.06 * s, 3.6 * s, lf, 0, 8 * s, 0, g);
f.geometry = f.geometry;
f.rotation.y = i / (WND.lite ? 5 : 8) * Math.PI * 2;
f.rotation.x = 0.45;
f.position.set(Math.sin(f.rotation.y) * 1.5 * s, 7.6 * s, Math.cos(f.rotation.y) * 1.5 * s);
}
if (!WND.lite)
wndSph(0.45 * s, wndMat(0x8A5A2A, null), 0, 7.8 * s, 0, g, 6);
}
else if (kind === "cypress") {
wndCyl(0.15 * s, 1.4 * s, bark, 0, 0.7 * s, 0, g, 6);
var c = new THREE.Mesh(new THREE.ConeGeometry(0.9 * s, 8 * s, WND.lite ? 6 : 10), lf);
c.position.y = 5 * s;
g.add(c);
}
else if (kind === "olive") {
var t2 = wndCyl(0.25 * s, 2 * s, bark, 0, 1 * s, 0, g, 6, 0.18 * s);
t2.rotation.z = 0.15;
[[0, 3, 0, 1.8], [1, 2.6, 0.5, 1.3], [-0.9, 2.7, -0.4, 1.4]].forEach(function (b) { var m = wndSph(b[3] * s, lf, b[0] * s, b[1] * s, b[2] * s, g, WND.lite ? 6 : 9); m.scale.y = 0.7; });
}
else {
wndCyl(0.3 * s, 4 * s, bark, 0, 2 * s, 0, g, 7, 0.22 * s);
[[0, 5.4, 0, 2.6], [1.3, 4.6, 0.6, 1.8], [-1.2, 4.8, -0.7, 1.9]].forEach(function (b) { wndSph(b[3] * s, lf, b[0] * s, b[1] * s, b[2] * s, g, WND.lite ? 6 : 9); });
}
wndRound(x, z, (kind === "cypress" ? 0.8 : 0.4) * s, y, 6 * s);
return g;
},
function (key, x, y, z, ry, look, title) {
if (look) {
look = Object.assign({ topKind: look.sex === "f" ? "dress" : "robe", bottomKind: "skirt", hat: "none", gear: "none", shoes: 0x6A4A2A }, look);
}
var g = null;
try {
if (typeof wPerson === "function")
g = wPerson("wnd_" + key, { look: look || null, title: title || "", place: "the Wonders of the World" });
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
wndCyl(0.22, 1.5, wndMat(0xE8DCC0, null), 0, 0.75, 0, g, 10, 0.32);
wndSph(0.17, wndMat(0xC89A70, null), 0, 1.66, 0, g, 10);
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
wndP().add(g);
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function () {
WNK.site = "land";
WNK.v = "";
var G = wndP(), lite = WND.lite;
var sand = wndMat(0xD8C8A0, "sand"), grass = wndMat(0x7A9A4A, "grass"), earth = wndMat(0xB8A074, "earth"), pave = wndMat(0xD8CCB0, "paving");
var gr = new THREE.Mesh(new THREE.CircleGeometry(3200, lite ? 32 : 64), earth);
gr.rotation.x = -Math.PI / 2;
gr.position.y = -0.02;
G.add(gr);
if (typeof metreUVs === "function") {
var uv = gr.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 800, uv.getY(i) * 800);
uv.needsUpdate = true;
}
[["pyramid", sand, 330], ["gardens", wndMat(0xC8B48A, "sand"), 300], ["artemis", wndMat(0x6A8A4A, "grass"), 300], ["zeus", grass, 300], ["mausoleum", wndMat(0xC8BC9A, "earth"), 260], ["colossus", wndMat(0xC8BC9A, "earth"), 260], ["pharos", wndMat(0xE0D4B0, "sand"), 260]].forEach(function (r) {
var A = WND_AT[r[0]], d = new THREE.Mesh(new THREE.CircleGeometry(r[2], lite ? 20 : 40), r[1]);
d.rotation.x = -Math.PI / 2;
d.position.set(A.x, -0.01, A.z);
G.add(d);
var uv = d.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * r[2] / 2, uv.getY(i) * r[2] / 2);
uv.needsUpdate = true;
});
WND_SITES.forEach(function (r) {
var A = WND_AT[r[0]], a = Math.atan2(A.x, A.z), s0 = 80, len = Math.hypot(A.x, A.z) - 200 - s0;
var m = new THREE.Mesh(new THREE.PlaneGeometry(7, len), pave);
m.rotation.x = -Math.PI / 2;
m.rotation.z = a;
var mid = s0 + len / 2;
m.position.set(Math.sin(a) * mid, 0.02, Math.cos(a) * mid);
var uv = m.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 3.5, uv.getY(i) * len / 2);
uv.needsUpdate = true;
G.add(m);
var mx = Math.sin(a) * s0 + Math.cos(a) * 5, mz = Math.cos(a) * s0 - Math.sin(a) * 5;
wndSign([r[1].replace(/^The /, ""), "this road · " + Math.round(Math.hypot(A.x, A.z) - 200) + " m"], 4.6, 1.1, "#2A3A6A", "#F4E8C0", mx, 1.8, mz, a + Math.PI);
wndBox(0.3, 1.3, 0.3, wndMat(0xC8BCA0, "stone"), mx, 0.65, mz);
wndRound(mx, mz, 0.3, 0, 2.4);
});
var sea = wndMat(0x2A6AA8, null, { phong: 80, spec: 0x88AACC });
["mausoleum", "colossus"].forEach(function (k) {
var A = WND_AT[k], ux = A.x / 620, uz = A.z / 620, off = k === "colossus" ? 400 : 330, cx = A.x + ux * off, cz = A.z + uz * off;
var w = new THREE.Mesh(new THREE.CircleGeometry(300, lite ? 24 : 48), sea);
w.rotation.x = -Math.PI / 2;
w.position.set(cx, 0.03, cz);
G.add(w);
WNK.site = k;
wndWater(cx, cz, 0, 0, 296);
WNK.site = "land";
});
var hill = wndMat(0xA89070, "earth");
for (var h = 0; h < (lite ? 10 : 22); h++) {
var a2 = h / (lite ? 10 : 22) * Math.PI * 2, r2 = 1500 + ((h * 137) % 400);
var m2 = new THREE.Mesh(new THREE.ConeGeometry(220 + ((h * 61) % 140), 90 + ((h * 37) % 80), lite ? 6 : 9), hill);
m2.position.set(Math.sin(a2) * r2, 30, Math.cos(a2) * r2);
G.add(m2);
}
},
function (x, W, H) {
function P(lon, lat) { return [(lon - 10) / 40 * W, (45 - lat) / 20 * H]; }
x.fillStyle = "#E8D49A";
x.fillRect(0, 0, W, H);
function poly(pts, col) { x.fillStyle = col; x.beginPath(); pts.forEach(function (p, i) { var q = P(p[0], p[1]); if (i)
x.lineTo(q[0], q[1]);
else
x.moveTo(q[0], q[1]); }); x.closePath(); x.fill(); }
var sea = "#3A7EC8";
poly([[10, 37.3], [11.1, 37.1], [10.4, 36.4], [11.1, 35.2], [10.2, 34.2], [11.5, 33.2], [15.2, 32.4], [18, 30.8], [19.6, 30.4], [20.1, 31.4], [21.6, 32.9], [23.2, 32.3], [25.2, 31.6], [27.3, 31.4], [29.9, 31.2], [31.9, 31.5], [34.2, 31.3], [34.9, 32.8], [35.5, 33.9], [35.9, 35.4], [36.1, 36.6], [35.3, 36.6], [34.6, 36.8], [33.4, 36.2], [32.4, 36.2], [31.0, 36.8], [29.6, 36.2], [28.2, 36.7], [27.4, 36.9], [27.5, 37.5], [27.1, 38.0], [26.4, 38.4], [26.9, 39.0], [26.2, 39.6], [26.6, 40.3], [26.0, 40.6], [25.0, 40.9], [23.9, 40.7], [23.4, 40.2], [22.6, 40.5], [22.6, 39.9], [22.9, 39.4], [23.3, 39.0], [22.7, 38.8], [23.6, 38.4], [24.0, 38.0], [23.2, 37.9], [23.1, 37.4], [22.9, 36.5], [22.5, 36.4], [21.9, 36.8], [21.6, 37.4], [21.3, 37.7], [21.6, 38.3], [22.3, 38.2], [21.8, 38.4], [21.1, 38.4], [20.7, 39.1], [20.0, 39.6], [19.4, 40.4], [19.4, 41.0], [19.5, 41.8], [18.5, 42.4], [17.5, 43.0], [16.4, 43.5], [15.2, 44.2], [14.4, 45.1], [13.6, 45.7], [12.3, 45.3], [12.4, 44.3], [13.6, 43.5], [14.4, 42.3], [15.9, 41.6], [17.2, 40.9], [18.5, 40.1], [18.3, 39.8], [17.1, 40.5], [16.6, 40.0], [16.6, 38.8], [16.1, 38.0], [15.6, 38.0], [15.9, 38.9], [15.6, 40.0], [14.9, 40.3], [14.3, 40.8], [13.7, 41.2], [12.4, 41.7], [11.2, 42.4], [10.5, 42.9], [10, 44]], sea);
poly([[12.4, 38.1], [13.4, 38.2], [15.6, 38.3], [15.1, 37.2], [15.1, 36.7], [14.3, 37.0], [12.6, 37.6]], "#E8D49A");
poly([[23.5, 35.5], [24.2, 35.6], [25.6, 35.4], [26.3, 35.2], [26.1, 35.0], [24.7, 34.9], [23.6, 35.2]], "#E8D49A");
poly([[32.3, 35.0], [33.0, 35.4], [34.6, 35.7], [34.0, 35.0], [33.9, 34.6], [32.6, 34.7]], "#E8D49A");
poly([[27.7, 36.2], [28.2, 36.45], [28.2, 36.0], [27.8, 35.9]], "#E8D49A");
poly([[28.0, 41.6], [29.1, 41.2], [31.4, 41.2], [33.3, 42.0], [35.1, 42.0], [36.9, 41.4], [38.5, 40.9], [41.5, 41.5], [41.7, 42.7], [40, 45], [28, 45], [28.6, 43.4]], sea);
poly([[32.6, 29.9], [32.4, 29.0], [33.6, 27.5], [35.0, 25.0], [37.0, 25.0], [35.2, 27.8], [34.6, 28.0], [33.2, 28.5]], sea);
poly([[34.6, 29.5], [34.9, 29.5], [34.5, 28.0], [34.4, 28.1]], sea);
poly([[48.0, 30.0], [48.6, 29.9], [50, 29.2], [50, 25], [49.5, 26.2], [48.4, 28.4]], sea);
poly([[49.0, 45], [46.8, 44.6], [47.0, 43.2], [47.6, 42.6], [48.6, 41.8], [49.4, 40.6], [49.3, 39.3], [48.9, 38.4], [49.2, 37.6], [50, 37.3], [50, 45]], sea);
x.strokeStyle = sea;
x.lineWidth = Math.max(2, W / 400);
x.lineCap = "round";
function line(pts) { x.beginPath(); pts.forEach(function (p, i) { var q = P(p[0], p[1]); if (i)
x.lineTo(q[0], q[1]);
else
x.moveTo(q[0], q[1]); }); x.stroke(); }
line([[31.1, 30.1], [31.2, 29.0], [30.8, 28.0], [31.1, 27.2], [31.8, 26.4], [32.7, 25.7], [32.9, 25]]);
line([[31.1, 30.1], [30.4, 31.4]]);
line([[31.1, 30.1], [31.8, 31.5]]);
line([[38.5, 40.2], [38.9, 38.8], [38.2, 37.4], [38.1, 36.6], [38.4, 36.0], [39.8, 35.6], [40.9, 34.5], [42.2, 34.2], [43.4, 33.4], [44.4, 32.5], [45.4, 31.8], [46.6, 31.0], [47.6, 30.6], [48.3, 30.0]]);
line([[39.9, 38.5], [41.3, 37.6], [42.3, 37.1], [43.1, 36.3], [43.4, 35.4], [44.0, 34.3], [44.4, 33.3], [45.6, 32.6], [46.8, 31.6], [47.4, 31.0]]);
x.fillStyle = "#7A5A2A";
x.textAlign = "center";
x.font = "italic " + Math.round(W / 60) + "px Georgia";
[["EGYPT", 29.5, 27], ["GREECE", 22.2, 39.6], ["ASIA MINOR", 33, 39], ["MESOPOTAMIA", 42.8, 34.6], ["ARABIA", 40, 28], ["LIBYA", 22, 28], ["ITALY", 15.2, 41.8], ["PHOENICIA", 36.4, 33.6], ["MEDIA", 48, 36.2], ["THRACE", 25.2, 42]].forEach(function (t) { var q = P(t[1], t[2]); x.fillText(t[0], q[0], q[1]); });
x.fillStyle = "#E8F0FF";
x.font = "italic " + Math.round(W / 55) + "px Georgia";
[["Mediterranean Sea", 21, 34], ["Aegean", 25.3, 38.9], ["Black Sea", 34, 43.5], ["Red Sea", 35.5, 26.2], ["Nile", 30.4, 27.2]].forEach(function (t) { var q = P(t[1], t[2]); x.fillText(t[0], q[0], q[1]); });
WND_SITES.forEach(function (r, i) {
var g = WND_GEO[r[0]], q = P(g[0], g[1]);
x.fillStyle = WND_COL[r[0]];
x.beginPath();
x.arc(q[0], q[1], W / 70, 0, 6.3);
x.fill();
x.strokeStyle = "#FFFFFF";
x.lineWidth = W / 400;
x.stroke();
x.fillStyle = "#FFFFFF";
x.font = "bold " + Math.round(W / 80) + "px Georgia";
x.fillText(String(i + 1), q[0], q[1] + W / 220);
x.fillStyle = "#2A1A0A";
x.font = "bold " + Math.round(W / 75) + "px Georgia";
var lab = r[1].replace(/^The /, ""), dy = r[0] === "mausoleum" ? W / 30 : r[0] === "colossus" ? W / 22 : -W / 45;
x.fillText(lab, q[0] + (r[0] === "artemis" ? -W / 40 : r[0] === "colossus" ? W / 30 : 0), q[1] + dy);
});
x.strokeStyle = "#8A5A1A";
x.lineWidth = W / 150;
x.strokeRect(0, 0, W, H);
x.fillStyle = "#5A3A1A";
x.font = "bold " + Math.round(W / 45) + "px Georgia";
x.textAlign = "left";
x.fillText("The world the Greeks knew", W * 0.02, H * 0.06);
x.font = Math.round(W / 80) + "px Georgia";
x.fillText("Step on a wonder to go there", W * 0.02, H * 0.1);
},
function () {
WNK.site = "hall";
WNK.v = "";
var H = WND_HALL, lite = WND.lite, h = H.h;
var marble = wndMat(0xF2EADC, "marble", { phong: 70 }), wall = wndMat(0xD8B070, "plaster"), blue = wndMat(0x23407A, null), gold = wndMat(0xD8A838, "metal", { phong: 80 }), red = wndMat(0xB8323A, null);
var frame = wndMat(0xC8B48A, "stone");
var chk = wndCanvasMat("hall-floor", 256, 256, function (x, W, Hh) { for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
x.fillStyle = (i + j) % 2 ? "#C8BCA8" : "#ECE4D4";
x.fillRect(i * 64, j * 64, 64, 64);
} x.strokeStyle = "#8A7A62"; x.lineWidth = 2; for (var k = 0; k <= 4; k++) {
x.beginPath();
x.moveTo(k * 64, 0);
x.lineTo(k * 64, Hh);
x.stroke();
x.beginPath();
x.moveTo(0, k * 64);
x.lineTo(W, k * 64);
x.stroke();
} }, { rep: [0.25, 0.25] });
chk.color.setHex(0xA8A098);
wndRoom({ x0: H.x0, z0: H.z0, x1: H.x1, z1: H.z1, h: h, floor: chk, wall: wall, ceil: null, name: "The Hall of Wonders",
doors: { n: [{ at: 0, w: 5, h: 6, frame: frame }], s: [{ at: 0, w: 6, h: 7, frame: frame }], e: [{ at: 0, w: 5, h: 5, frame: frame }], w: [{ at: -8, w: 4, h: 4.5, frame: frame }, { at: 10, w: 4, h: 4.5, frame: frame }] } });
var red2 = wndMat(0xA8402E, "plaster");
[[0, H.z0 + 0.42, H.x1 - H.x0 - 1, 0.06], [0, H.z1 - 0.42, H.x1 - H.x0 - 1, 0.06]].forEach(function (r) { wndBox(r[2], 2.6, r[3], red2, r[0], 1.3, r[1]); });
[[H.x0 + 0.42, 0], [H.x1 - 0.42, 0]].forEach(function (r) { wndBox(0.06, 2.6, H.z1 - H.z0 - 1, red2, r[0], 1.3, r[1]); });
var gl = wndMat(0xCFE8F8, null, { op: 0.28, ds: 1 });
wndBox(H.x1 - H.x0, 0.1, H.z1 - H.z0, gl, 0, h + 0.3, 0);
for (var bx = H.x0 + 4; bx < H.x1; bx += 8)
wndBox(0.4, 0.6, H.z1 - H.z0, gold, bx, h + 0.1, 0);
for (var bz = H.z0 + 4; bz < H.z1; bz += 8)
wndBox(H.x1 - H.x0, 0.5, 0.3, gold, 0, h, bz);
var friz = wndCanvasMat("hall-friz", 512, 32, function (x, W, Hh) { x.fillStyle = "#23407A"; x.fillRect(0, 0, W, Hh); x.fillStyle = "#F2C848"; for (var i = 0; i < 16; i++) {
var cx = i * W / 16 + W / 32, cy = Hh / 2;
x.beginPath();
for (var k = 0; k < 10; k++) {
var a = k * Math.PI / 5 - Math.PI / 2, rr = k % 2 ? Hh * 0.18 : Hh * 0.4;
x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
}
x.fill();
} }, { rep: [0.125, 0.833] });
wndBox(H.x1 - H.x0 - 0.8, 1.2, 0.1, friz, 0, h - 0.8, H.z0 + 0.45);
wndBox(H.x1 - H.x0 - 0.8, 1.2, 0.1, friz, 0, h - 0.8, H.z1 - 0.45);
wndBox(0.1, 1.2, H.z1 - H.z0 - 0.8, friz, H.x0 + 0.45, h - 0.8, 0);
wndBox(0.1, 1.2, H.z1 - H.z0 - 0.8, friz, H.x1 - 0.45, h - 0.8, 0);
for (var cx = -24; cx <= 24; cx += 8) {
[-1, 1].forEach(function (s) { wndColumn(cx, 0, s * 16.5, h - 1.4, 0.5, "ionic", marble); });
}
var mapM = wndCanvasMat("hall-map", 2048, 1024, wndMapPaint, { full: !lite });
mapM.color.setHex(0xB4B4B4);
wndFlat(40, 20, mapM, 0, 0.03, 0);
[[0, -10.3, 40.6, 0.3], [0, 10.3, 40.6, 0.3], [-20.3, 0, 0.3, 20.6], [20.3, 0, 0.3, 20.6]].forEach(function (b) { wndBox(b[2], 0.12, b[3], gold, b[0], 0.08, b[1]); });
WND_SITES.forEach(function (r, i) {
var g = WND_GEO[r[0]], p = wndMapXZ(g[0], g[1]);
var col = parseInt(WND_COL[r[0]].slice(1), 16), d = wndCyl(0.75, 0.08, wndGlowM(col, 0.85), p.x, 0.07, p.z, null, lite ? 12 : 24);
d.userData.keep = 1;
wndLamp(p.x, 0.6, p.z, col, 1.6);
wndSpot(p.x, p.z, 1.4, (i + 1) + ". " + r[1], "go there", function () { wndGo(r[0]); });
});
wndGuide("antipater", -4, 12.5, Math.PI);
WND_HALL_LESSONS.forEach(function (L, i) { var lx = -12 + i * 12, lz = 19; wndLectern(lx, lz, 0); wndSpot(lx, lz, 2.0, L.t, "read", function () { wndHallLesson(i); }); });
wndBox(4, 1.1, 1.2, wndMat(0x6A3A1A, "wood"), 14, 0.55, 13);
wndBox(4.1, 0.08, 1.3, blue, 14, 1.14, 13);
wndSolid(14, 13, 2, 0.6, 0, 1.2);
wndSign(["WONDERS PASSPORT", "stamps · certificates"], 3, 0.8, "#23407A", "#F2C848", 14, 2.2, 12.35, 0);
wndSpot(14, 11.8, 2.2, "The passport desk", "see your Wonders Passport", function () { wndPassport(); });
wndTimeline();
var tall = wndCanvasMat("hall-tall", 1024, 512, wndTallPaint, { full: true });
wndPlane(20, 10, tall, -17, 5.5, H.z1 - 0.45, Math.PI);
wndPlane(20, 10, wndCanvasMat("hall-seven", 1024, 512, wndSevenPaint, { full: true }), 17, 5.5, H.z1 - 0.45, Math.PI);
wndSpot(-17, H.z1 - 2, 2.4, "How tall were they?", "read the chart", function () { wndTallCard(); });
if (!lite)
WND_SITES.forEach(function (r, i) { var col = parseInt(WND_COL[r[0]].slice(1), 16); var b = wndBox(2.2, 5, 0.06, wndMat(col, null, { ds: 1 }), -21 + i * 7, h - 4.2, -14); });
for (var lx = -24; lx <= 24; lx += 12)
for (var lz = -12; lz <= 12; lz += 12)
wndLamp(lx, h - 2, lz, 0xFFF0D0, 5);
wndBox(30, 0.3, 5, wndMat(0xE0D6C2, "marble"), 0, 0.15, H.z1 + 2.6);
wndFloor(-15, H.z1, 15, H.z1 + 5, 0.3);
wndBox(30, 0.15, 2.4, wndMat(0xE0D6C2, "marble"), 0, 0.08, H.z1 + 6.2);
for (var px = -12; px <= 12; px += 6)
wndColumn(px, 0.3, H.z1 + 4, 9, 0.55, "ionic", marble);
wndBox(28, 1.2, 5, marble, 0, 9.9, H.z1 + 3);
var ped = new THREE.Shape();
ped.moveTo(-14, 0);
ped.lineTo(14, 0);
ped.lineTo(0, 3.4);
ped.lineTo(-14, 0);
var pm = new THREE.Mesh(new THREE.ExtrudeGeometry(ped, { depth: 4.6, bevelEnabled: false }), marble);
pm.position.set(0, 10.5, H.z1 + 0.7);
wndP().add(pm);
wndSign(["THE HALL OF WONDERS", "the Seven Wonders of the Ancient World"], 10, 1.6, "#23407A", "#F2C848", 0, 11.2, H.z1 + 5.35, 0);
wndHallWings();
[["pupil", 1], ["pupil", 1], ["pupil", 1], ["teacher", 0], ["visitor", 0], ["visitor", 0]].forEach(function (p, i) {
var g = wndPersonFig("hallv" + i, -10 + i * 4, 0, 6 - (i % 2) * 10, i, {}, p[0] === "pupil" ? "pupil" : p[0] === "teacher" ? "teacher" : "");
if (p[1])
g.scale.setScalar(0.72);
WND.people.push({ g: g, wander: { r: 9, sp: 0.9 }, site: "hall" });
});
},
function () {
var H = WND_HALL, lite = WND.lite, marble = wndMat(0xEDE4D4, "marble", { phong: 50 }), wall = wndMat(0xF0E8D8, "plaster"), frame = wndMat(0xC8B48A, "stone");
wndRoom({ x0: H.x1, z0: -14, x1: H.x1 + 34, z1: 14, h: 8, floor: wndMat(0xD8C8A8, "floortile"), wall: wndMat(0xE8F0F4, "plaster"), name: "The gallery of later wonders", skip: "w", doors: { e: [{ at: 0, w: 4, h: 4.2, frame: frame }] } });
wndLater();
wndRoom({ x0: H.x0 - 30, z0: -18, x1: H.x0, z1: 2, h: 7, floor: wndMat(0x8A5A3A, "wood"), wall: wndMat(0xE8DCC0, "plaster"), name: "The library of sources", skip: "e", doors: { s: [{ at: H.x0 - 20, w: 3, h: 3, frame: frame }], w: [{ at: -8, w: 4, h: 4.2, frame: frame }] } });
wndLibrary();
wndRoom({ x0: H.x0 - 30, z0: 2, x1: H.x0, z1: 16, h: 5, floor: wndMat(0x5A7AA8, "floortile"), wall: wndMat(0xF4EEDC, "plaster"), name: "The teachers' room", skip: "en" });
wndTeachers();
},
function () {
var H = WND_HALL, x0 = H.x0 - 30, wd = wndMat(0x5A3A22, "wood"), lite = WND.lite;
for (var s = 0; s < 5; s++) {
var sx = x0 + 3 + s * 5.5;
wndBox(4.4, 4, 0.6, wd, sx, 2, -17.2);
wndSolid(sx, -17.2, 2.2, 0.3, 0, 4);
for (var sh = 0; sh < 5; sh++) {
var y = 0.4 + sh * 0.75;
wndBox(4.2, 0.05, 0.55, wndMat(0x6A4A2A, "wood"), sx, y, -17.0);
if (!lite)
for (var b = 0; b < 14; b++)
wndBox(0.22, 0.5 + ((b * 7 + sh) % 4) * 0.06, 0.36, wndMat([0x8A2A1E, 0x2A4A6A, 0x6A5A2A, 0x3A6A3A, 0xC8A048][(b + sh + s) % 5], null), sx - 1.9 + b * 0.29, y + 0.3, -16.9);
else
wndBox(4, 0.5, 0.36, wndMat([0x8A2A1E, 0x2A4A6A, 0x6A5A2A][sh % 3], null), sx, y + 0.3, -16.9);
}
}
var rack = wndGroup(x0 + 0.9, 0, -8, Math.PI / 2);
wndBox(8, 3.2, 0.8, wd, 0, 1.6, 0, rack);
wndSolid(x0 + 0.9, -8, 0.4, 4, 0, 3.2);
for (var i = 0; i < (lite ? 12 : 40); i++) {
var c = wndCyl(0.09, 0.7, wndMat(0xE8DCB8, null), -3.6 + (i % 10) * 0.8, 0.4 + Math.floor(i / 10) * 0.75, 0.1, rack, 6);
c.rotation.x = Math.PI / 2;
}
wndSign(["THE LIBRARY OF SOURCES", "who saw the wonders, and wrote it down"], 7, 1.3, "#5A3A1A", "#F4E8C0", x0 + 15, 5.4, -17.6, 0);
[[x0 + 8, -9], [x0 + 16, -9], [x0 + 24, -9], [x0 + 12, -3], [x0 + 20, -3]].forEach(function (p, i) {
wndBox(3, 0.8, 1.4, wd, p[0], 0.4, p[1]);
wndSolid(p[0], p[1], 1.5, 0.7, 0, 0.9);
wndBox(0.5, 0.03, 0.4, wndMat(0xF4ECD8, null), p[0] - 0.6, 0.83, p[1]);
wndSpot(p[0], p[1] + 1.3, 1.8, "A reading desk", "read who wrote what", function () { wndSourcesCard(); });
});
wndGuide("callimachus", x0 + 12, -13, 0);
},
function () {
var H = WND_HALL, x0 = H.x0 - 30, wd = wndMat(0x8A6A4A, "wood");
wndBox(6, 0.8, 2, wd, x0 + 15, 0.4, 9);
wndSolid(x0 + 15, 9, 3, 1, 0, 0.9);
for (var c = 0; c < 6; c++) {
var cx = x0 + 12.6 + (c % 3) * 2.4, cz = c < 3 ? 7.4 : 10.6;
wndBox(0.6, 0.5, 0.6, wndMat(0x3A5A8A, null), cx, 0.25, cz);
}
var bd = wndCanvasMat("teach-board", 512, 256, function (x, W, Hh) {
x.fillStyle = "#1E3A2A";
x.fillRect(0, 0, W, Hh);
x.strokeStyle = "#C8A060";
x.lineWidth = 10;
x.strokeRect(0, 0, W, Hh);
x.fillStyle = "#F4F0E0";
x.font = "bold 30px Georgia";
x.textAlign = "center";
x.fillText("For teachers and parents", W / 2, 46);
x.font = "20px Georgia";
["A class visit in 45 minutes", "Learning goals for each grade band", "Questions to talk about", "A worksheet to print"].forEach(function (t, i) { x.fillText("• " + t, W / 2, 96 + i * 36); });
}, { full: true });
wndPlane(6, 3, bd, x0 + 15, 2.4, 15.4, Math.PI);
wndSpot(x0 + 15, 11.5, 2.6, "The teacher's guide", "open it", function () { wndTeacherGuide(); });
wndSign(["THE TEACHERS' ROOM"], 5, 0.8, "#23407A", "#F2C848", x0 + 15, 4.2, 2.5, Math.PI);
},
function () {
var H = WND_HALL, half = Math.ceil(WND_TIME.length / 2);
[0, 1].forEach(function (side) {
var rows = WND_TIME.slice(side * half, (side + 1) * half);
var m = wndCanvasMat("hall-time" + side, 1536, 512, function (x, W, Hh) {
x.fillStyle = "#FBF5E6";
x.fillRect(0, 0, W, Hh);
x.strokeStyle = "#8A5A1A";
x.lineWidth = 8;
x.strokeRect(4, 4, W - 8, Hh - 8);
x.fillStyle = "#23407A";
x.font = "bold 40px Georgia";
x.textAlign = "left";
x.fillText(side ? "The timeline, part two" : "The timeline: 4,500 years of wonders", 28, 56);
x.strokeStyle = "#C8A048";
x.lineWidth = 6;
x.beginPath();
x.moveTo(30, 250);
x.lineTo(W - 30, 250);
x.stroke();
rows.forEach(function (r, i) {
var px = 60 + i * (W - 120) / Math.max(1, rows.length - 1), up = i % 2 === 0;
x.fillStyle = "#B8323A";
x.beginPath();
x.arc(px, 250, 10, 0, 6.3);
x.fill();
x.fillStyle = "#2A1A0A";
x.font = "bold 24px Georgia";
x.textAlign = "center";
x.fillText(r[0], px, up ? 200 : 300);
x.font = "19px Georgia";
var words = r[1].split(" "), line = "", yy = up ? 110 : 330, lines = [];
words.forEach(function (w) { var t = line ? line + " " + w : w; if (x.measureText(t).width > 200) {
lines.push(line);
line = w;
}
else
line = t; });
lines.push(line);
if (up)
yy = 180 - lines.length * 22;
lines.forEach(function (l, k) { x.fillText(l, px, yy + k * 22); });
});
}, { full: true });
m.color.setHex(0xB8B4AC);
wndPlane(24, 8, m, side ? 16.5 : -16.5, 5, H.z0 + 0.45, 0);
});
wndSpot(-14, H.z0 + 2.2, 2.6, "The timeline", "read it", function () { wndTimeCard(); });
},
function (x, W, Hh) {
x.fillStyle = "#FBF5E6";
x.fillRect(0, 0, W, Hh);
x.strokeStyle = "#8A5A1A";
x.lineWidth = 8;
x.strokeRect(4, 4, W - 8, Hh - 8);
x.fillStyle = "#23407A";
x.font = "bold 34px Georgia";
x.textAlign = "left";
x.fillText("How tall were they?", 24, 46);
var base = Hh - 50, sc = (Hh - 110) / 150;
var R = [["pyramid", "Great Pyramid", 146.6], ["pharos", "Lighthouse", 110], ["mausoleum", "Mausoleum", 45], ["colossus", "Colossus (with base)", 48], ["gardens", "Gardens (about)", 25], ["artemis", "Temple of Artemis", 25], ["zeus", "Statue of Zeus", 12.4]];
x.strokeStyle = "#C8B490";
x.lineWidth = 1;
x.font = "15px Georgia";
x.fillStyle = "#8A7A5A";
for (var m = 0; m <= 150; m += 25) {
var y = base - m * sc;
x.beginPath();
x.moveTo(60, y);
x.lineTo(W - 20, y);
x.stroke();
x.fillText(m + " m", 14, y + 5);
}
R.forEach(function (r, i) {
var bx = 90 + i * 128, h = r[2] * sc;
x.fillStyle = WND_COL[r[0]];
if (r[0] === "pyramid") {
x.beginPath();
x.moveTo(bx - 50, base);
x.lineTo(bx + 50, base);
x.lineTo(bx, base - h);
x.fill();
}
else
x.fillRect(bx - 26, base - h, 52, h);
x.fillStyle = "#2A1A0A";
x.font = "bold 15px Georgia";
x.textAlign = "center";
x.fillText(r[1], bx, base + 20);
x.fillText(r[2] + " m", bx, base - h - 8);
});
x.fillStyle = "#2A1A0A";
x.fillRect(W - 40, base - 1.7 * sc * 4, 4, 1.7 * sc * 4);
x.font = "13px Georgia";
x.fillText("you (×4)", W - 38, base + 20);
},
function (x, W, Hh) {
x.fillStyle = "#23407A";
x.fillRect(0, 0, W, Hh);
x.strokeStyle = "#F2C848";
x.lineWidth = 8;
x.strokeRect(4, 4, W - 8, Hh - 8);
x.fillStyle = "#F2C848";
x.font = "bold 36px Georgia";
x.textAlign = "center";
x.fillText("The Seven Wonders of the Ancient World", W / 2, 52);
x.font = "23px Georgia";
x.fillStyle = "#FFFFFF";
WND_SITES.forEach(function (r, i) {
x.textAlign = "left";
x.fillStyle = WND_COL[r[0]];
x.beginPath();
x.arc(70, 100 + i * 54, 16, 0, 6.3);
x.fill();
x.fillStyle = "#FFFFFF";
x.font = "bold 18px Georgia";
x.textAlign = "center";
x.fillText(String(i + 1), 70, 106 + i * 54);
x.textAlign = "left";
x.font = "bold 23px Georgia";
x.fillText(r[1], 100, 100 + i * 54);
x.font = "17px Georgia";
x.fillStyle = "#CFE0FF";
x.fillText(r[2] + " · " + r[4], 100, 122 + i * 54);
});
},
function () {
var H = WND_HALL, x0 = H.x1, lite = WND.lite, plinth = wndMat(0x2A3A5A, null), top = wndMat(0xF2EADC, "marble");
var shut = !wndCfg().later && !wndKeeper();
if (shut) {
WNK.site = "hall";
wndSolid(H.x1 + 0.6, 0, 0.4, 2.6, 0, 5);
wndBox(0.1, 0.1, 5, wndMat(0xB8323A, null), H.x1 + 0.6, 1, 0);
wndSign(["The gallery is closed", "for now"], 2.4, 0.8, "#B8323A", "#FFFFFF", H.x1 - 0.4, 2.2, 0, -Math.PI / 2);
}
wndSign(["THE GALLERY OF LATER WONDERS", "the New Seven Wonders (north) · seven natural wonders (south)"], 10, 1.4, "#23407A", "#F2C848", x0 + 17, 6, -13.5, 0);
function stand(i, row, item, builder) {
var px = x0 + 4 + i * 4.3, pz = row ? 9.5 : -9.5;
wndBox(1.8, 1, 1.8, plinth, px, 0.5, pz);
wndBox(2, 0.08, 2, top, px, 1.04, pz);
wndSolid(px, pz, 0.9, 0.9, 0, 1.2);
var g = wndGroup(px, 1.08, pz, row ? Math.PI : 0);
try {
builder(g, item);
}
catch (e) {
if (window.console)
console.warn("[wonders] model", item[0], e);
}
wndSign([item[1]], 1.9, 0.36, "#23407A", "#F2C848", px, 0.7, pz + (row ? -0.92 : 0.92), row ? Math.PI : 0);
wndSpot(px, pz + (row ? -1.8 : 1.8), 1.6, item[1], "learn about it", function () { wndLaterCard(item, row); });
}
WND_LATER.forEach(function (it, i) { stand(i, 0, it, WND_MODELS[it[0]]); });
WND_NATURAL.forEach(function (it, i) { stand(i, 1, it, WND_MODELS[it[0]]); });
wndLectern(x0 + 31, -4, -Math.PI / 2);
wndSpot(x0 + 30, -4, 1.8, "The later wonders quiz", "take it", function () { wndQuizOpen("later"); });
wndLectern(x0 + 31, 4, -Math.PI / 2);
wndSpot(x0 + 30, 4, 1.8, "The natural wonders quiz", "take it", function () { wndQuizOpen("natural"); });
for (var lx = x0 + 6; lx < x0 + 34; lx += 8) {
wndLamp(lx, 6.5, -8, 0xFFF4E0, 3);
wndLamp(lx, 6.5, 8, 0xFFF4E0, 3);
}
},
function (g) {
var st = wndMat(0xA89878, "stone"), gr = wndMat(0x5A7A3A, "grass");
var hill = wndBox(1.7, 0.25, 1.7, gr, 0, 0.12, 0, g);
var pts = [[-0.8, -0.5], [-0.3, -0.1], [0.1, -0.4], [0.5, 0.1], [0.8, 0.5]];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz);
var w = wndBox(l, 0.22, 0.12, st, (a[0] + b[0]) / 2, 0.36 + i * 0.04, (a[1] + b[1]) / 2, g);
w.rotation.y = -Math.atan2(dz, dx);
}
pts.forEach(function (p, i) { wndBox(0.2, 0.36, 0.2, st, p[0], 0.43 + i * 0.04, p[1], g); });
},
function (g) {
var r = wndMat(0xC87A5A, "stone"), d = wndMat(0x8A4A3A, null);
wndBox(1.6, 1.5, 0.7, r, 0, 0.75, -0.3, g);
for (var c = -2; c <= 2; c++)
wndCyl(0.05, 0.55, wndMat(0xD88A6A, null), c * 0.16, 0.3, 0.06, g, 8);
wndBox(0.8, 0.06, 0.12, r, 0, 0.6, 0.06, g);
var t = wndCyl(0.12, 0.3, wndMat(0xD88A6A, null), 0, 0.95, 0.06, g, 10);
for (var c2 = -1; c2 <= 1; c2 += 2)
wndCyl(0.04, 0.35, wndMat(0xD88A6A, null), c2 * 0.3, 0.95, 0.06, g, 8);
wndBox(0.12, 0.3, 0.05, d, 0, 0.18, 0.07, g);
},
function (g) {
var m = wndCanvasMat("m-colos", 256, 64, function (x, W, H) { x.fillStyle = "#C8B490"; x.fillRect(0, 0, W, H); x.fillStyle = "#5A4A34"; for (var r = 0; r < 3; r++)
for (var i = 0; i < 16; i++) {
x.beginPath();
x.ellipse(i * 16 + 8, r * 20 + 14, 5, 7, 0, 0, 6.3);
x.fill();
} }, { rep: [4, 1], ds: 1 });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.6, WND.lite ? 16 : 32, 1, true), m);
c.scale.z = 0.8;
c.position.y = 0.3;
g.add(c);
var c2 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.25, WND.lite ? 16 : 32, 1, true), wndMat(0xB8A480, null, { ds: 1 }));
c2.scale.z = 0.75;
c2.position.y = 0.12;
g.add(c2);
wndBox(1.0, 0.02, 0.7, wndMat(0xC8A878, "sand"), 0, 0.02, 0, g);
},
function (g) {
var st = wndMat(0xC8BC98, "stone");
for (var i = 0; i < 9; i++)
wndBox(1.4 - i * 0.13, 0.1, 1.4 - i * 0.13, st, 0, 0.05 + i * 0.1, 0, g);
wndBox(0.3, 0.25, 0.3, st, 0, 1.02, 0, g);
for (var k = 0; k < 4; k++) {
var s = wndBox(0.2, 0.04, 0.75, wndMat(0xA89878, null), 0, 0.48, 0, g);
s.rotation.y = k * Math.PI / 2;
s.rotation.x = 0.9;
s.position.set(Math.sin(k * Math.PI / 2) * 0.45, 0.46, Math.cos(k * Math.PI / 2) * 0.45);
}
},
function (g) {
var gr = wndMat(0x4A7A3A, "grass"), st = wndMat(0x9A9488, "stone");
var m = new THREE.Mesh(new THREE.ConeGeometry(0.85, 0.7, 6), gr);
m.position.set(0, 0.35, 0);
m.scale.z = 0.6;
g.add(m);
var p = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 6), gr);
p.position.set(0.55, 0.6, -0.3);
g.add(p);
for (var i = 0; i < 4; i++)
wndBox(1 - i * 0.18, 0.04, 0.3, wndMat(0x6A9A4A, null), -0.1, 0.32 + i * 0.08, 0.22 - i * 0.02, g);
for (var b = 0; b < 6; b++)
wndBox(0.1, 0.08, 0.1, st, -0.4 + b * 0.14, 0.7, 0, g);
},
function (g) {
var w = wndMat(0xF4F0EA, "marble", { phong: 60 });
wndBox(1.5, 0.1, 1.5, w, 0, 0.05, 0, g);
wndBox(0.8, 0.5, 0.8, w, 0, 0.35, 0, g);
var d = wndSph(0.33, w, 0, 0.82, 0, g, 16);
d.scale.y = 1.2;
wndCyl(0.02, 0.15, w, 0, 1.2, 0, g, 6);
[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].forEach(function (p) { wndCyl(0.05, 0.8, w, p[0], 0.5, p[1], g, 8); wndSph(0.07, w, p[0], 0.92, p[1], g, 8); });
[[-0.28, -0.28], [0.28, -0.28], [-0.28, 0.28], [0.28, 0.28]].forEach(function (p) { wndSph(0.1, w, p[0], 0.65, p[1], g, 8); });
wndBox(0.25, 0.05, 1.4, wndMat(0x3A7AB8, null), 0, 0.06, 0.95, g);
},
function (g) {
wndBox(1.5, 0.1, 1.5, wndMat(0x3AB8C8, null, { op: 0.75 }), 0, 0.3, 0, g);
wndBox(1.5, 0.02, 1.5, wndMat(0xE8D8A8, "sand"), 0, 0.02, 0, g);
for (var i = 0; i < (WND.lite ? 8 : 18); i++) {
var c = [0xFF6A8A, 0xFFB84A, 0x8A5AFF, 0x4AE8A8, 0xFF8A3A][i % 5];
wndSph(0.06 + (i % 3) * 0.03, wndMat(c, null), -0.6 + ((i * 37) % 12) / 10, 0.08, -0.6 + ((i * 53) % 12) / 10, g, 7);
}
},
function (g) {
wndBox(1.5, 0.04, 1.5, wndMat(0x2A6AA8, null), 0, 0.02, 0, g);
var gr = wndMat(0x3A6A3A, "grass");
[[0.4, -0.3, 0.25, 0.7], [-0.5, -0.4, 0.35, 0.5], [0.0, 0.5, 0.2, 0.4]].forEach(function (p) { var m = new THREE.Mesh(new THREE.SphereGeometry(p[2], 10, 8), gr); m.scale.y = p[3] / p[2]; m.position.set(p[0], p[3] * 0.5, p[1]); g.add(m); });
wndBox(1.5, 0.08, 0.3, wndMat(0xE8D8B8, "sand"), 0, 0.04, 0.6, g);
},
function (g) {
var r = wndMat(0x7A7A8A, "stone"), s = wndMat(0xF4F8FC, "snow");
[[0, 0, 0.5, 1.2], [-0.5, 0.2, 0.35, 0.8], [0.5, 0.3, 0.32, 0.7]].forEach(function (p) {
var m = new THREE.Mesh(new THREE.ConeGeometry(p[2], p[3], 6), r);
m.position.set(p[0], p[3] / 2, p[1]);
g.add(m);
var c = new THREE.Mesh(new THREE.ConeGeometry(p[2] * 0.45, p[3] * 0.45, 6), s);
c.position.set(p[0], p[3] * 0.78, p[1]);
g.add(c);
});
},
function (g) {
wndBox(1.5, 0.08, 1.5, wndMat(0x1A2A3A, "snow"), 0, 0.04, 0, g);
wndBox(1.5, 0.02, 1.5, wndMat(0x0A1020, null), 0, 0.09, 0, g);
[0x6AE8A0, 0x8AF0C0, 0xA87AE8].forEach(function (c, i) { var p = wndPlane(1.4, 0.9, wndMat(c, null, { op: 0.35, ds: 1 }), 0, 0.6, -0.3 + i * 0.2, 0, g); p.userData.aur = i; p.userData.keep = 1; (WND.aurora = WND.aurora || []).push(p); });
},
function (g) {
wndBox(1.5, 0.06, 1.5, wndMat(0x6A8A3A, "grass"), 0, 0.03, 0, g);
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.65, 0.7, 10), wndMat(0x3A302A, "stone"));
m.position.y = 0.4;
g.add(m);
wndCyl(0.16, 0.02, wndMat(0xC84A1A, null, { e: 0x8A2A0A }), 0, 0.76, 0, g, 10);
for (var i = 0; i < 4; i++)
wndBox(0.12, 0.12, 0.12, wndMat(0xC8A848, null), -0.6 + i * 0.15, 0.1, 0.6, g);
},
function (g) {
var r = wndMat(0x5A4A3A, "stone"), gr = wndMat(0x4A7A3A, "grass");
wndBox(1.5, 0.6, 0.7, gr, 0, 0.3, -0.4, g);
wndBox(1.5, 0.2, 0.5, gr, 0, 0.1, 0.5, g);
wndBox(1.4, 0.04, 0.6, wndMat(0x5A8AB8, null), 0, 0.62, -0.4, g);
wndBox(1.4, 0.55, 0.03, wndMat(0xF4F8FF, null, { op: 0.85 }), 0, 0.32, -0.04, g);
wndBox(1.4, 0.02, 0.18, wndMat(0x3A6A9A, null), 0, 0.02, 0.07, g);
},
function (it, natural) {
var y = wndLevel() === "y", rows = natural ? [["Where", it[2]]] : [["Where", it[2]], ["When", it[3]]];
var txt = natural ? it[3] : it[4], kid = natural ? it[4] : it[5];
var b = "<div style='margin:6px 0'>" + wndEsc(y ? kid : txt) + "</div>" + (y ? "" : "<div style='margin:6px 0;opacity:.85'><b>For younger readers:</b> " + wndEsc(kid) + "</div>") + wndLevelBtn();
var f = {};
wndLevelFns(f, function () { wndLaterCard(it, natural); });
worldCard(worldFacts(it[1], natural ? "one of seven natural wonders" : "one of the New Seven Wonders (voted in 2007)", rows, [], b), f);
},
function (key, x, z, ry, o) {
var Gd = WND_GUIDES[key];
if (!Gd)
return null;
o = o || {};
var look = Object.assign({ sex: Gd.sex }, Gd.look || {});
var g = wndPersonFig("g_" + key, x, o.y || 0, z, ry, look, Gd.title);
WND.people.push({ g: g, key: key, site: WNK.site, v: WNK.v });
wndSpot(x, z, 2.6, Gd.n, "talk with " + (Gd.sex === "f" ? "her" : "him"), function () { wndTalk(key); }, { y: o.y || 0 });
return g;
},
function (c) {
var Gd = WND_GUIDES[c.wnd];
if (!Gd)
return "";
var notes = wndCfg().notes, site = Gd.site === "hall" ? "the Hall of Wonders" : wndName(Gd.site);
var L = [
"You are " + Gd.n + ", a real person from history, speaking in the first person, wholly in character, at all times.",
"Who you were, from the sources: " + Gd.g,
"Where you are met: " + site + ", in a walk-through reconstruction of the Seven Wonders of the Ancient World built for learning. A visitor from the future has come to learn from you; you may be curious about them.",
"Teach real history. Keep to what the surviving sources and archaeology actually say; say plainly when something is unknown, argued, or only a later legend, and never invent facts, quotations, numbers or names. Where it fits, give one real detail (a source and its book, a measurement, a date) and offer to explain more. If the visitor asks about things after your own lifetime, say you cannot know them, then point them to the lessons and the quiz here, which can tell them.",
"If the visitor seems young, use short words and short sentences and be warm and encouraging. Ask them a question back now and then to help them think, like a good teacher.",
"Hold a real conversation: answer exactly what was just said, remember everything said so far, vary the length (two to five sentences unless they want more), and never repeat a sentence you have already used.",
"Never say you are an AI, a model or a character in a game. Refuse harm in character and kindly: no instructions for weapons or explosives of any kind (if asked about anything that bursts or burns, say only that such things are dangerous and move on), poisons, drugs, or hurting anyone; nothing frightening or sexual. Speak of death and tombs gently.",
notes ? "The Keeper of this place asks every guide: " + notes : "",
typeof dreamerBrief === "function" ? dreamerBrief() : ""
];
return L.filter(Boolean).join(" ");
},
function (key) {
if (typeof openTalk !== "function")
return;
if (!wndCfg().talk && !wndKeeper()) {
wndSay("🏛️ The guides are resting for now (the Keeper's choice). The lessons and quizzes are all open.");
return;
}
var Gd = WND_GUIDES[key], wk = "wnd:" + key, c = null;
if (!Gd)
return;
(store.characters || []).forEach(function (x) { if (x.wKey === wk)
c = x; });
var P = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: wk, archetype: "human", name: Gd.n, aka: [], details: [Gd.title + " at " + (Gd.site === "hall" ? "the Hall of Wonders" : wndName(Gd.site))], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: "here", visible: false, city: true,
look: Object.assign({ sex: Gd.sex }, Gd.look || {}), age: Gd.age, sex: Gd.sex };
c.log.push({ who: "them", text: Gd.hi });
if (store.characters)
store.characters.push(c);
}
c.wnd = key;
c.name = Gd.n;
c.x = P.x;
c.z = P.z;
c.visible = false;
if (typeof worldPrompt === "function")
worldPrompt(null);
openTalk(c);
},
function (key) {
var A = WND_AT[key], g = wndGroup(A.x, 0, A.z, 0, WND.G);
g.name = "wonder-" + key;
var gt = wndGroup(0, 0, 0, 0, g), gn = wndGroup(0, 0, 0, 0, g);
gt.name = "then";
gn.name = "now";
WND.vgroups[key] = { all: g, then: gt, now: gn, extra: {} };
WNK.site = key;
WNK.F = g;
WNK.v = "";
WNK.ox = A.x;
WNK.oz = A.z;
return { A: A, g: g, then: gt, now: gn };
},
function (key, x, z, ry, views) {
wndAlways(key);
views = views || [["then", "Then: as it was new"], ["now", "Now: as it stands today"]];
var g = wndGroup(x, 0, z, ry), st = wndMat(0xE8DCC0, "marble");
wndBox(1.6, 1.1, 0.6, st, 0, 0.55, 0, g);
wndBox(1.8, 0.12, 0.8, wndMat(0xC8A048, "metal", { phong: 60 }), 0, 1.16, 0, g);
wndRound(x, z, 0.9, 0, 1.3);
wndPlaque("tn-" + key, "Then and Now", "Press E here to see " + wndName(key).replace(/^The /, "the ") + " as it was when new, or as it is today.", 1.5, 0.9, 0, 0.6, 0.31, 0, { parent: g });
wndSpot(x + Math.sin(ry) * 1.4, z + Math.cos(ry) * 1.4, 2, "The Then and Now stone", "choose Then or Now", function () { wndThenNowCard(key, views); });
},
function (key, views) {
var b = "", f = {}, cur = wndView(key);
views.forEach(function (v) { b += worldBtn("v_" + v[0], (cur === v[0] ? "➤ " : "") + v[1], ""); f["v_" + v[0]] = function () { wndSetView(key, v[0]); wndThenNowCard(key, views); }; });
var L = WND_LESSONS[key] && WND_LESSONS[key].nowthen;
b += "<div style='margin-top:8px'>" + wndEsc(L ? (wndLevel() === "y" ? L.y : L.f) : "") + "</div>";
worldCard(worldFacts(wndName(key), "Then and Now", [], [], b), f);
},
function (lx, lz, feet) {
var P = WND_PYR, y = Math.max(0, feet + 0.6), hw = P.half * (1 - y / P.h);
var inStone = Math.abs(lx) < hw + 0.3 && Math.abs(lz) < hw + 0.3;
if (feet < -1 && Math.abs(lx) < P.half && Math.abs(lz) < P.half)
inStone = true;
if (!inStone)
return false;
for (var i = 0; i < P.runs.length; i++) {
var R = P.runs[i], z0 = Math.min(R.z0, R.z1), z1 = Math.max(R.z0, R.z1);
if (Math.abs(lx - R.x) < R.w / 2 - 0.05 && lz >= z0 - 0.6 && lz <= z1 + 0.6) {
var t = (lz - R.z0) / (R.z1 - R.z0), fy = R.y0 + (R.y1 - R.y0) * Math.max(0, Math.min(1, t));
if (feet > fy - 1.6 && feet < fy + 1.6)
return false;
}
}
for (var j = 0; j < P.rooms.length; j++) {
var C = P.rooms[j];
if (lx > C.x0 + 0.2 && lx < C.x1 - 0.2 && lz > C.z0 - 0.1 && lz < C.z1 + 0.1 && feet > C.y - 1 && feet < C.y + 2)
return false;
}
if (lx > 7.7 && lx < 9.8 && lz > -0.2 && lz < 2.2 && feet > 39 && feet < 42)
return false;
if (Math.abs(lx - P.ex) < 0.9 && lz < -101.6 && feet > 4)
return false;
return true;
},
function () {
var S = wndSiteBegin("pyramid"), P = WND_PYR, lite = WND.lite, X = P.ex;
var lime = wndMat(0xF4EEE0, "marble", { phong: 40 }), core = wndMat(0xC8B088, "stone"), dark = wndMat(0x8A7A62, "stone"), gran = wndMat(0x8A4A44, "stone", { phong: 30 });
wndThen("pyramid");
var pg = new THREE.ConeGeometry(P.half * Math.SQRT2, P.h, 4, 1);
pg.rotateY(Math.PI / 4);
var pm = new THREE.Mesh(pg, lime);
pm.position.y = P.h / 2;
wndP().add(pm);
var uv = pg.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 120, uv.getY(i) * 60);
uv.needsUpdate = true;
var cap = new THREE.ConeGeometry(2.6 * Math.SQRT2, 3.2, 4, 1);
cap.rotateY(Math.PI / 4);
var cm = new THREE.Mesh(cap, wndMat(0xE8D088, "metal", { phong: 90 }));
cm.position.y = P.h - 1.6 + 0.05;
wndP().add(cm);
wndNowL("pyramid");
var tiers = lite ? 18 : 36, top = P.hNow;
var coreM = wndCanvasMat("pyr-courses", 256, 256, function (x, W, H) {
x.fillStyle = "#C8B088";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 8; r++) {
x.fillStyle = r % 2 ? "#BCA47E" : "#CDB590";
x.fillRect(0, r * 32, W, 30);
x.fillStyle = "#9A8460";
for (var c = 0; c < 6; c++)
x.fillRect(((c * 43 + r * 19) % W), r * 32, 3, 30);
x.fillRect(0, r * 32 + 30, W, 2);
}
}, { rep: [1, 1] });
for (var t = 0; t < tiers; t++) {
var y0 = t * top / tiers, hh = top / tiers, w = 2 * P.half * (1 - (y0 + hh) / P.h);
var m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, w), coreM);
m.position.y = y0 + hh / 2;
var u2 = m.geometry.attributes.uv;
for (var k = 0; k < u2.count; k++)
u2.setXY(k, u2.getX(k) * w / 8, u2.getY(k) * hh / 8);
u2.needsUpdate = true;
wndP().add(m);
}
for (var cs = 0; cs < 14; cs++)
wndBox(3, 1.5, 2.2, lime, -30 + cs * 4.4, 0.75, -P.half - 0.6);
wndSolid(-1.4, -P.half - 0.6, 30.1, 1.1, 0, 1.5);
wndPlaque("pyr-mamun", "The robbers' tunnel", "Most visitors today go in by a rough tunnel lower down the north face, said to have been forced about AD 820 for the caliph al-Ma'mun. It joins the old passages inside. The casing stones you see here at the foot are among the few still in place.", 3, 2, X - 6, 9.5, -(P.half - 8.5 / 1.273) - 1.2, Math.PI);
wndBox(2.6, 2.6, 1.2, wndMat(0x3A2E22, null), X - 6, 7.2, -(P.half - 7.2 / 1.273) - 0.3);
wndAlways("pyramid");
wndPyrInside();
var wd = wndMat(0x7A5A3A, "wood"), ez = -(P.half - 17 / 1.273);
wndRamp(X - 0.8, -P.half - 22, X + 0.8, ez - 0.4, "z", -P.half - 22, 0, ez - 0.4, 17);
var sl = Math.atan2(17, (ez - 0.4) - (-P.half - 22)), len = Math.hypot(17, (ez - 0.4) + P.half + 22), sg = wndGroup(X, 8.5, (ez - 0.4 - P.half - 22) / 2, 0);
var st = wndBox(1.8, 0.15, len, wd, 0, 0, 0, sg);
sg.rotation.x = sl;
for (var r2 = 0; r2 < (lite ? 6 : 14); r2++) {
var f2 = r2 / (lite ? 6 : 14), zz = -P.half - 22 + f2 * (ez + P.half + 21.6), yy = f2 * 17;
wndBox(1.8, 0.06, 0.3, wndMat(0x5A3A22, "wood"), X, yy + 0.1, zz);
if (r2 % 2 === 0) {
wndBox(0.12, yy + 0.9, 0.12, wd, X - 0.9, (yy + 0.9) / 2, zz);
wndBox(0.12, yy + 0.9, 0.12, wd, X + 0.9, (yy + 0.9) / 2, zz);
}
}
[-0.95, 0.95].forEach(function (o) { var rg = wndGroup(X + o, 9.4, (ez - 0.4 - P.half - 22) / 2, 0); wndBox(0.08, 0.08, len, wd, 0, 0, 0, rg); rg.rotation.x = sl; });
wndSolid(X - 1.05, (ez - P.half - 22) / 2, 0.08, (ez + P.half + 22) / 2, 0, 40);
wndSolid(X + 1.05, (ez - P.half - 22) / 2, 0.08, (ez + P.half + 22) / 2, 0, 40);
wndFloor(X - 0.8, ez - 1.2, X + 0.8, ez + 0.2, 17);
wndPlaque("pyr-door", "The entrance", "Khufu's builders hid this door under the white casing. Above it, great gabled blocks take the weight off the passage. The real passage inside is about 1.05 m wide and 1.2 m high, so people stoop; here it is made tall enough to walk.", 2.4, 1.6, X + 2.4, 18.6, ez - 1.2, Math.PI);
wndSign(["THE GREAT PYRAMID OF GIZA", "built for King Khufu · about 2560 BC"], 8, 1.4, "#3A2A1A", "#F4D88A", X + 12, 2.2, -P.half - 24, Math.PI);
wndSledge();
wndAlways("pyramid");
var small = wndMat(0xD8C8A0, "stone");
[[-60, 0], [-15, 0], [30, 0]].forEach(function (o, i) { var q = new THREE.ConeGeometry(23 * Math.SQRT2, 30, 4, 1); q.rotateY(Math.PI / 4); var qm = new THREE.Mesh(q, small); qm.position.set(P.half + 40, 15, o[0] + (i ? 0 : 0)); wndP().add(qm); wndSolid(P.half + 40, o[0], 23, 23, 0, 30); });
wndBox(42, 0.3, 7, wndMat(0xB8A078, "stone"), P.half + 15, -0.1, 40);
wndPlaque("pyr-boat", "Khufu's boat", "Beside the pyramid, pits held full-size boats. One, found in 1954 sealed under great limestone blocks, has been rebuilt: 43 m of cedar, sewn together with rope. It may have carried the king, or been for his journey in the next life.", 2.4, 1.6, P.half + 15, 1.4, 44, 0);
wndRound(P.half + 15, 40, 0.2, 0, 1);
var kh = new THREE.ConeGeometry(107 * Math.SQRT2, 143.5, 4, 1);
kh.rotateY(Math.PI / 4);
var km = new THREE.Mesh(kh, core);
km.position.set(-200, 71.7, 320);
wndP().add(km);
wndSolid(-200, 320, 107, 107, 0, 150);
var kcap = new THREE.ConeGeometry(18 * Math.SQRT2, 24, 4, 1);
kcap.rotateY(Math.PI / 4);
var kc = new THREE.Mesh(kcap, lime);
kc.position.set(-200, 143.5 - 12, 320);
wndP().add(kc);
var me = new THREE.ConeGeometry(51 * Math.SQRT2, 65, 4, 1);
me.rotateY(Math.PI / 4);
var mm = new THREE.Mesh(me, wndMat(0xC89A70, "stone"));
mm.position.set(-330, 32.5, 520);
wndP().add(mm);
wndSolid(-330, 520, 51, 51, 0, 66);
wndSphinx(80, 310);
wndThenNow("pyramid", X + 8, -P.half - 28, Math.PI);
wndGuide("herodotus", X - 6, -P.half - 26, Math.PI * 0.9);
wndGuide("hemiunu", WND_SLEDGE.x + 3, WND_SLEDGE.z - 6, -Math.PI / 2);
wndLearnStand("pyramid", X + 18, -P.half - 26, Math.PI);
wndActSpot("pyramid", "seked", X + 24, -P.half - 30, "The Rhind papyrus problem", "work out the slope", function () { wndSekedCard(); });
WND.blockers.pyramid = function (lx, lz, feet) { return wndPyrIn(lx, lz, feet); };
},
function () {
var P = WND_PYR, X = P.ex, lite = WND.lite, lime = wndMat(0xD8CCB0, "stone"), lime2 = wndMat(0xC8BA98, "stone"), gran = wndMat(0x7A3E3A, "stone", { phong: 30 }), rock = wndMat(0x9A8A6A, "stone"), board = wndMat(0x6A4A2A, "wood");
P.runs.forEach(function (R, ri) {
var dz = R.z1 - R.z0, dy = R.y1 - R.y0, len = Math.hypot(dz, dy), sl = Math.atan2(dy, dz), mz = (R.z0 + R.z1) / 2, my = (R.y0 + R.y1) / 2;
var g = wndGroup(R.x, my, mz, 0);
g.rotation.x = -sl;
var m = R.z0 < -12 || R.y0 > 0 ? lime : rock;
wndBox(R.w + 0.6, 0.3, len, m, 0, -0.15, 0, g);
wndBox(R.w, 0.04, len, board, 0, 0.02, 0, g);
if (R.gal) {
for (var c = 0; c < 7; c++) {
var off = R.w / 2 + 0.3 - c * 0.076;
wndBox(0.3, R.h / 7 + 0.02, len, lime2, -(off + 0.15), c * R.h / 7 + R.h / 14, 0, g);
wndBox(0.3, R.h / 7 + 0.02, len, lime2, off + 0.15, c * R.h / 7 + R.h / 14, 0, g);
}
wndBox(R.w, 0.3, len, lime2, 0, R.h + 0.15, 0, g);
[-1, 1].forEach(function (s) { wndBox(0.5, 0.6, len, lime, s * (R.w / 2 - 0.25), 0.3, 0, g); });
}
else {
wndBox(0.3, R.h, len, m, -(R.w / 2 + 0.15), R.h / 2, 0, g);
wndBox(0.3, R.h, len, m, R.w / 2 + 0.15, R.h / 2, 0, g);
wndBox(R.w + 0.6, 0.3, len, m, 0, R.h + 0.15, 0, g);
}
if (R.y0 !== R.y1)
wndBox(0.06, 0.06, len, wndMat(0x9A9A9A, "metal"), R.w / 2 - 0.15, 0.9, 0, g);
var n = Math.max(1, Math.round(len / (lite ? 14 : 8)));
for (var l = 0; l < n; l++) {
var f = (l + 0.5) / n;
wndLamp(R.x, R.y0 + dy * f + Math.min(R.h, 2.4) - 0.3, R.z0 + dz * f, 0xFFD8A0, R.gal ? 4 : 2.2);
}
if (R.y0 === R.y1)
wndFloor(R.x - R.w / 2, Math.min(R.z0, R.z1), R.x + R.w / 2, Math.max(R.z0, R.z1), R.y0);
else
wndRamp(R.x - R.w / 2, Math.min(R.z0, R.z1), R.x + R.w / 2, Math.max(R.z0, R.z1), "z", R.z0, R.y0, R.z1, R.y1);
wndArea(R.x - R.w / 2, Math.min(R.z0, R.z1), R.x + R.w / 2, Math.max(R.z0, R.z1), Math.min(R.y0, R.y1) - 1, Math.abs(dy) + R.h, R.n);
});
wndBox(2.2, 0.9, 1.6, lime, 8.75, 39.95, 1.0);
wndFloor(7.65, 0.2, 9.85, 1.8, 40.4);
wndPlaque("pyr-gal", "The Grand Gallery", "47 m long and 8.6 m high, its walls step inward in seven courses to a roof just 1 m wide. Nobody is sure why it is so grand: to slide the granite plugs that sealed the passage below, to carry the roof's weight, or for ceremony. The real floor between its side ramps is about 1 m wide.", 2.4, 1.7, 8.75 - 1.05, 25.2, -30, Math.PI / 2);
P.rooms.forEach(function (C) {
var mat = C.granite ? gran : C.rough ? rock : lime, dr = function (a) { return (a || []).map(function (x) { return { at: x, w: 1.5, h: 2.4, noStep: 1 }; }); };
var R = wndRoom({ x0: C.x0, x1: C.x1, z0: C.z0, z1: C.z1, y: C.y, h: C.h, floor: mat, wall: mat, ceil: mat, inset: 0, name: C.n, doors: C.land ? { n: dr(C.dn), s: dr(C.ds) } : { n: dr([C.door]) } });
if (C.land)
return;
if (C.gable) {
[-1, 1].forEach(function (s) { var gb = wndBox((C.x1 - C.x0) / 2 + 0.4, 0.4, C.z1 - C.z0, lime, (C.x0 + C.x1) / 2 + s * (C.x1 - C.x0) / 4, C.y + C.h + 0.6, (C.z0 + C.z1) / 2); gb.rotation.z = -s * 0.5; });
}
wndLamp((C.x0 + C.x1) / 2, C.y + C.h - 0.5, (C.z0 + C.z1) / 2, 0xFFD8A0, 4);
});
var K = P.rooms[0], kx = K.x0 + 1.6, kz = (K.z0 + K.z1) / 2;
wndBox(2.28, 1.05, 0.98, gran, kx, K.y + 0.52, kz);
wndBox(2.0, 0.2, 0.7, wndMat(0x2A1E1C, null), kx, K.y + 1.0, kz);
wndSolid(kx, kz, 1.14, 0.49, K.y, 1.1);
for (var b = 0; b < 9; b++)
wndBox(1.1, 0.15, K.z1 - K.z0, wndMat(0x6A3A36, "stone"), K.x0 + 0.6 + b * 1.17, K.y + K.h - 0.05, kz);
wndBox(0.2, 0.2, 0.3, wndMat(0x1A1410, null), K.x0 + 5, K.y + 0.9, K.z0 + 0.05);
wndBox(0.2, 0.2, 0.3, wndMat(0x1A1410, null), K.x0 + 5, K.y + 0.9, K.z1 - 0.05);
wndPlaque("pyr-king", "The King's Chamber", "Lined and roofed with red granite brought 800 km from Aswan: nine roof beams of 25 to 80 tonnes. Above them are five hidden 'relieving' chambers that spread the weight, where the work gangs painted their names, such as 'Friends of Khufu'. The coffer is too wide for the passage: it was put here as the pyramid rose. It was found empty.", 2.6, 1.8, K.x0 + 7.6, K.y + 2.0, K.z1 - 0.1, Math.PI);
wndSpot(kx + 1.8, kz, 2, "Khufu's coffer", "look closer", function () { worldCard(worldFacts("Khufu's coffer", "the King's Chamber", [["Stone", "Red granite from Aswan"], ["Size", "about 2.28 × 0.98 × 1.05 m"], ["Found", "Empty, its lid gone; robbed in ancient times"]], ["It is slightly wider than the Ascending Passage, so it must have been set here while the pyramid was being built.", "Two narrow channels run from this room to the outside, north and south. They may have been aimed at stars: the Egyptians believed the king's spirit rose to join them."]), {}); }, { y: K.y });
var Q = P.rooms[1];
wndBox(0.1, 3.5, 1.6, wndMat(0x5A4E3A, "stone"), Q.x1 - 0.25, Q.y + 1.75, (Q.z0 + Q.z1) / 2);
wndPlaque("pyr-queen", "The Queen's Chamber", "Arab explorers gave it this name, but no queen was buried here. Its roof is a gable of great limestone beams. The niche in the east wall may once have held a statue of the king's ka (his spirit).", 2.2, 1.5, Q.x0 + 0.1, Q.y + 2.2, (Q.z0 + Q.z1) / 2, Math.PI / 2);
var U = P.rooms[2];
wndPlaque("pyr-pit", "The pit in the rock", "30 m below the pyramid's base, cut into the bedrock and never finished: the floor is still rough, and a shaft in it leads nowhere. Perhaps the plan changed, and the king's burial moved up into the pyramid.", 2.4, 1.6, U.x0 + 0.1, U.y + 1.8, (U.z0 + U.z1) / 2, Math.PI / 2);
for (var rr = 0; rr < (lite ? 4 : 9); rr++)
wndBox(1 + ((rr * 7) % 4) * 0.4, 0.6 + ((rr * 3) % 3) * 0.4, 1.2, rock, U.x0 + 3 + rr * 1.2, U.y + 0.4, U.z0 + 1.5 + ((rr * 5) % 4));
},
function () {
var S = WND_SLEDGE, wd = wndMat(0x8A6A3A, "wood"), lime = wndMat(0xD8C8A0, "stone");
wndThen("pyramid");
for (var i = 0; i < S.len; i += 1.2)
wndBox(2.4, 0.08, 0.3, wndMat(0x6A4A2A, "wood"), S.x, 0.04, S.z + i - S.len / 2);
var ramp = wndRamp(S.x - 3, S.z + S.len / 2, S.x + 3, S.z + S.len / 2 + 24, "z", S.z + S.len / 2, 0, S.z + S.len / 2 + 24, 6);
var rg = wndGroup(S.x, 3, S.z + S.len / 2 + 12, 0);
var rb = wndBox(6, 6, 24.6, wndMat(0xB8A078, "earth"), 0, -3, 0, rg);
rg.rotation.x = -Math.atan2(6, 24);
rg.position.y = 3;
var g = wndGroup(S.x, 0, S.z - S.len / 2 + 3, 0);
S.g = g;
g.userData.keep = 1;
S.z0 = S.z - S.len / 2 + 3;
[-0.6, 0.6].forEach(function (o) { var r = wndBox(0.25, 0.25, 3.4, wd, o, 0.14, 0, g); });
wndBox(1.6, 0.12, 2.4, wd, 0, 0.3, 0, g);
wndBox(1.4, 1.1, 1.8, lime, 0, 0.91, 0, g);
S.ropes = [];
for (var p = 0; p < (WND.lite ? 4 : 8); p++) {
var side = p % 2 ? 1 : -1, row = Math.floor(p / 2), fx = S.x + side * 1.1, fz = S.z0 + 4 + row * 1.4;
var f = wndPersonFig("haul" + p, fx, 0, fz, 0, { top: 0xF0EAD8, bottom: 0xF0EAD8, skin: 0x9A6A44, hair: 0x1A1410, sex: "m" }, "labourer");
S.ropes.push(f);
WND.people.push({ g: f, site: "pyramid", v: "then:pyramid", haul: p });
}
var pour = wndPersonFig("pour", S.x + 0.3, 0, S.z0 + 1.9, Math.PI, { top: 0xF0EAD8, bottom: 0xF0EAD8, skin: 0x9A6A44, hair: 0x1A1410, sex: "m" }, "labourer");
S.pour = pour;
WND.people.push({ g: pour, site: "pyramid", v: "then:pyramid" });
wndCyl(0.18, 0.4, wndMat(0xA8643A, null), S.x + 0.6, 0.2, S.z0 + 1.6, null, 8);
wndPlaque("pyr-sledge", "Moving a block", "In the tomb of Djehutihotep (about 1880 BC) a painting shows a giant statue on a sledge, pulled by rows of men, while one pours water on the sand in front. In 2014 scientists tested it: sand wetted just enough halves the pulling force. Try it.", 2.6, 1.7, S.x - 3.4, 1.6, S.z0 + 1, -Math.PI / 2);
wndActSpot("pyramid", "sledge", S.x - 2.2, S.z0 + 3, "The sledge", "haul the block", function () { wndSledgeCard(); });
WNK.site = "pyramid";
wndSolid(S.x, S.z0, 0.9, 1.8, 0, 1.6).mov = 1;
},
function () {
var S = WND_SLEDGE, f = {}, b = "<div style='margin:4px 0'>The block weighs about 2.5 tonnes. How much water should go on the sand?</div>";
[["none", "None: dry sand"], ["some", "Just enough to dampen it"], ["lots", "Lots: a puddle"]].forEach(function (o) { b += worldBtn("w_" + o[0], o[1], ""); f["w_" + o[0]] = function () { wndSledgeHaul(o[0]); }; });
if (S.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + S.msg + "</div>";
worldCard(worldFacts("Haul the block", "the Great Pyramid · how it was built", [["Block", "about 2.5 tonnes of limestone"], ["Sledge", "wood, on sleepers set in the sand"]], [], b), f);
},
function (w) {
var S = WND_SLEDGE;
var k = { none: [0.55, "On dry sand the sledge digs in and heaps sand in front. It takes about 20 people to drag it, slowly."], some: [0.28, "Just right! Damp sand is stiff, and the sledge glides: about 10 people are enough, half as many."], lots: [0.6, "Too wet: the sand turns to mud and the sledge sinks. As hard as dry sand, or harder."] }[w];
S.mu = k[0];
S.msg = k[1] + " Watch the gang haul.";
S.go = 1;
S.t = 0;
S.speed = w === "some" ? 2.2 : 0.8;
if (w === "some")
wndDid("pyramid", "sledge");
wndSledgeCard();
},
function (dt) {
var S = WND_SLEDGE;
if (!S.g || !S.go)
return;
S.t += dt * S.speed;
var d = Math.min(S.len - 6, S.t);
S.g.position.z = S.z0 + d;
S.ropes.forEach(function (f, i) { f.position.z = S.z0 + 4 + Math.floor(i / 2) * 1.4 + d; });
if (S.pour)
S.pour.position.z = S.z0 + 1.9 + d;
var K = WND.K && WND.K.lists.pyramid, oz = WND_AT.pyramid.z;
if (K)
K.solids.forEach(function (s) { if (s.mov)
s.z = oz + S.z0 + d; });
if (S.t >= S.len - 6) {
S.go = 0;
setTimeout(function () { S.t = 0; if (S.g) {
S.g.position.z = S.z0;
S.ropes.forEach(function (f, i) { f.position.z = S.z0 + 4 + Math.floor(i / 2) * 1.4; });
if (S.pour)
S.pour.position.z = S.z0 + 1.9;
} if (K)
K.solids.forEach(function (s) { if (s.mov)
s.z = oz + S.z0; }); }, 4000);
}
},
function () {
var f = {}, ans = WND.seked, b = "<div style='margin:4px 0'>The Rhind Mathematical Papyrus (about 1550 BC, copied from an older book) teaches scribes to measure a pyramid's slope as a <b>seked</b>: how many palms the face runs in for every cubit (7 palms) it rises. Khufu's builders used a seked of <b>5½ palms</b>.</div>" +
"<div style='margin:6px 0'>So for every 7 palms up, the face moves 5½ palms in. Which slope is that?</div>";
[["a", "About 52 degrees: steep, like the Great Pyramid"], ["b", "About 30 degrees: gentle, like a hill"], ["c", "About 80 degrees: nearly a wall"]].forEach(function (o) { b += worldBtn("s_" + o[0], (ans === o[0] ? (o[0] === "a" ? "✓ " : "✗ ") : "") + o[1], ""); f["s_" + o[0]] = function () { WND.seked = o[0]; if (o[0] === "a")
wndDid("pyramid", "seked"); wndSekedCard(); }; });
if (ans)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + (ans === "a" ? "Right. The rise is 7 for every 5½ across: the angle whose tangent is 7 ÷ 5.5 = 1.27, about 51.8 degrees. The Great Pyramid's faces really are 51.8 degrees." : "Not quite. Rising 7 palms while moving only 5½ in is steeper than 45 degrees (which would be 7 in for 7 up). Try again.") + "</div>";
worldCard(worldFacts("The slope of the pyramid", "Egyptian mathematics", [], [], b), f);
},
function (x, z) {
var sg = wndSphinxForm(wndP(), x, 0, z, Math.PI / 2, 52);
if (!wndSolidFrom(sg, 20))
wndSolid(x - 5, z, 36, 9, 0, 20);
wndPlaque("sphinx", "The Great Sphinx", "Carved from the rock of the plateau, probably for Khufu's son Khafre: a lion with a king's head, 73 m long. It faces the sunrise.", 3, 2, x + 66, 2, z + 14, Math.PI / 2);
},
function () {
var S = wndSiteBegin("gardens"), lite = WND.lite, D = WND_GDN;
var brick = wndMat(0xC8A27A, "brick"), brick2 = wndMat(0xB8926A, "brick"), soil = wndMat(0x6A5034, "earth"), grassM = wndMat(0x5A8A3A, "grass");
var blueB = wndCanvasMat("ishtar", 512, 256, wndIshtarPaint, { rep: [0.125, 0.25], full: !lite });
wndThen("gardens");
D.tiers.forEach(function (T, i) {
var x0 = T[0], y = T[1], w = D.x1 - x0, cx = (x0 + D.x1) / 2;
if (i === 0)
wndBox(w - 12, y, D.z1 - D.z0, brick, cx + 6, y / 2, 0);
else
wndBox(w, y, D.z1 - D.z0, brick, cx, y / 2, 0);
wndBox(w, 0.6, D.z1 - D.z0, soil, cx, y + 0.2, 0);
wndFlat(w - 0.4, D.z1 - D.z0 - 0.4, grassM, cx, y + 0.51, 0);
wndFloor(x0, D.z0, D.x1, D.z1, y + 0.5);
wndSolid(cx + (i === 0 ? 6 : 0), 0, w / 2 - (i === 0 ? 6 : 0), (D.z1 - D.z0) / 2, 0, y + 0.4);
var n = Math.floor((D.z1 - D.z0) / 10);
for (var a = 0; a < n; a++) {
var az = D.z0 + 5 + a * 10;
if (i > 0 || Math.abs(az) > 6) {
wndBox(0.3, y * 0.55, 4.5, wndMat(0x8A6A48, "brick"), x0 - 0.1, y * 0.3, az);
}
}
wndBox(0.5, 0.9, D.z1 - D.z0, brick2, x0 + 0.25, y + 0.95, 0);
wndSolid(x0 + 0.25, D.z0 + ((D.z1 - D.z0) / 2 - 4) / 2, 0.25, ((D.z1 - D.z0) / 2 - 4) / 2, y + 0.5, 0.9);
wndSolid(x0 + 0.25, D.z1 - ((D.z1 - D.z0) / 2 - 4) / 2, 0.25, ((D.z1 - D.z0) / 2 - 4) / 2, y + 0.5, 0.9);
});
D.tiers.forEach(function (T, i) {
var x0 = T[0], y = T[1], yPrev = i ? D.tiers[i - 1][1] + 0.5 : 0, xs = x0 - 10;
babStair({ axis: "x", a0: xs, a1: x0, y0: yPrev, y1: y + 0.5, c0: -3, c1: 3, base: yPrev, mat: brick2, tread: wndMat(0xD8B88A, "stone"), rail: 1, railMat: brick2 });
wndArea(xs, -3, x0, 3, yPrev - 0.5, y + 3 - yPrev, "The grand stair");
});
D.tiers.forEach(function (T, i) { wndArea(T[0], D.z0, i < 3 ? D.tiers[i + 1][0] : D.x1, D.z1, T[1], 6, ["The first terrace", "The second terrace", "The third terrace", "The top terrace"][i]); });
var vault = wndMat(0xD8BE96, "brick");
[[-48, -12], [-48, 12]].forEach(function (r, k) {
var z0 = k ? 6 : -56, z1 = k ? 56 : -6;
var doors = [];
for (var dz = z0 + 5; dz < z1 - 2; dz += 10)
doors.push({ at: dz, w: 3.2, h: 3.6 });
wndRoom({ x0: -60, x1: -48, z0: z0, z1: z1, h: 5.4, floor: wndMat(0xC8B490, "floortile"), wall: vault, ceil: vault, inset: 0, name: "The vaulted galleries", doors: { w: doors } });
for (var c = z0 + 10; c < z1 - 4; c += 10) {
wndCyl(0.45, 5.4, vault, -54, 2.7, c, null, 10);
wndRound(-54, c, 0.45, 0, 5.4);
wndLamp(-54, 4.6, c - 5, 0xFFD8A0, 3);
}
for (var cc = z0 + 6; cc < z1 - 6; cc += 14) {
wndBox(2.2, 0.45, 0.9, wndMat(0x7A3A2A, null), -50, 0.25, cc);
wndBox(2.2, 0.15, 0.9, wndMat(0xC8A048, null), -50, 0.55, cc);
wndSolid(-50, cc, 1.1, 0.45, 0, 0.7);
}
});
wndPlaque("gdn-vault", "Under the terraces", "Diodorus says the terraces stood on galleries with royal rooms inside, cool in the heat. Their roofs were stone beams, then reeds in bitumen, two courses of baked brick in gypsum, and sheets of lead, so the water in the soil above never reached the rooms.", 2.6, 1.8, -48.2, 2.4, -30, -Math.PI / 2);
try {
babGardensGrow();
}
catch (e) {
if (window.console)
console.warn("[wonders] babylon gardens", e);
}
wndThen("gardens");
try {
babShadufs();
}
catch (e) {
if (window.console)
console.warn("[wonders] babylon shadufs", e);
}
wndNowL("gardens");
var mud = wndMat(0xB89A72, "earth");
for (var m = 0; m < (lite ? 8 : 16); m++) {
var mx = -50 + ((m * 37) % 110), mz = -50 + ((m * 53) % 100), mr = 6 + ((m * 7) % 10);
var mh = new THREE.Mesh(new THREE.SphereGeometry(mr, lite ? 7 : 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), mud);
mh.scale.y = 0.35;
mh.position.set(mx, 0, mz);
wndP().add(mh);
wndRound(mx, mz, mr * 0.97, 0, mr * 0.35);
}
for (var kv = 0; kv < 7; kv++) {
wndBox(3, 2.4, 22, wndMat(0xA88A62, "brick"), -20 + kv * 4, 1.2, 40);
}
wndSolid(-20 + 12, 40, 13.5, 11, 0, 2.4);
wndPlaque("gdn-kold", "Koldewey's vaults", "Robert Koldewey, digging Babylon from 1899 to 1917, found this block of fourteen vaulted rooms with an unusual well, and hoped it was the gardens' foundation. Clay tablets found here list rations of oil and grain: it was probably a storehouse. The gardens have never been found for sure.", 3, 2, -6, 1.8, 52, 0);
wndAlways("gardens");
wndIshtarGate(-112, 0, blueB);
var pave = wndMat(0xD8CCB4, "paving");
wndBox(52, 0.1, 12, pave, -86, 0.04, 0);
for (var wz = -1; wz <= 1; wz += 2) {
wndBox(30, 4.5, 1.2, blueB, -97, 2.25, wz * 7.2);
wndSolid(-97, wz * 7.2, 15, 0.6, 0, 4.5);
for (var ln = 0; ln < (lite ? 3 : 5); ln++)
wndLion(-109 + ln * 5.6, 2, wz * 7.2 - wz * 0.62, wz);
}
var riv = wndMat(0x3A7A9A, null, { phong: 60 });
wndFlat(40, 320, riv, 96, 0.05, 0);
wndWater(96, 0, 20, 160);
for (var p = 0; p < (lite ? 6 : 14); p++)
wndTree("palm", 72 + ((p * 5) % 8), 0, -140 + p * 20, 1.1);
wndThenNow("gardens", -92, -12, Math.PI / 2);
wndGuide("berossus", -80, 10, -Math.PI / 2);
wndLearnStand("gardens", -96, 12, Math.PI / 2);
wndThen("gardens");
try {
babBuild();
}
catch (e) {
if (window.console)
console.warn("[wonders] babylon", e);
}
wndAlways("gardens");
wndSign(["THE HANGING GARDENS OF BABYLON", "if they were here · about 600 BC, the story says"], 8, 1.4, "#1E3A7A", "#F4D88A", -125, 10, -16, -Math.PI / 2);
WND.onView.gardens = function (v) { if (WND_GDN.water)
WND_GDN.water.forEach(function (w) { w.visible = v === "then"; }); };
},
function (x, W, H) {
x.fillStyle = "#1E4A9A";
x.fillRect(0, 0, W, H);
var k = W / 512;
x.save();
x.scale(k, k);
H = 256;
for (var r = 0; r < 16; r++)
for (var c = 0; c < 16; c++) {
var v = (r * 7 + c * 13) % 5;
x.fillStyle = ["#2456AE", "#1A3E88", "#20509E", "#1C4692", "#2A5CB4"][v];
x.fillRect(c * 32 + (r % 2) * 16, r * 16, 30, 14);
}
for (var i = 0; i < 16; i++) {
wndRosette(x, i * 32 + 16, 13, 10);
wndRosette(x, i * 32 + 16, H - 13, 10);
}
x.fillStyle = "#E8B848";
x.fillRect(0, 28, 512, 3);
x.fillRect(0, H - 31, 512, 3);
wndGlazeBull(x, 52, 80, 1.05);
wndGlazeDragon(x, 306, 82, 1.05);
x.restore();
},
function (x, z, blue) {
var g = wndGroup(x, 0, z, 0), h = 16, gold = wndMat(0xF2C848, null);
[-1, 1].forEach(function (s) {
wndBox(14, h, 12, blue, 0, h / 2, s * 10.5, g);
wndBox(15, 1.2, 13, wndMat(0xE8E0C8, null), 0, h + 0.6, s * 10.5, g);
for (var c = 0; c < 5; c++)
wndBox(2.2, 1.6, 2.2, blue, -5 + c * 2.5, h + 2, s * 10.5, g);
wndSolid(x, z + s * 10.5, 7, 6, 0, h + 2);
});
wndBox(14, h - 10.5, 9, blue, 0, 10.5 + (h - 10.5) / 2, 0, g);
wndBox(14.1, 0.5, 9, gold, 0, 10.3, 0, g);
var arch = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 14, lite_seg(), 1, true, 0, Math.PI), wndMat(0x1A3E88, null, { ds: 1 }));
arch.position.set(0, 6, 0);
arch.rotation.set(0, 0, Math.PI / 2);
g.add(arch);
wndFloor(x - 7.5, z - 4.5, x + 7.5, z + 4.5, 0);
wndPlaque("gdn-ishtar", "The Ishtar Gate", "Built by Nebuchadnezzar II about 575 BC, faced with blue glazed bricks and rows of aurochs and dragons. Its front was dug up by Koldewey and rebuilt in the Pergamon Museum, Berlin; a smaller copy stands at Babylon today. The Processional Way beyond was lined with lions.", 3, 2, x + 7.2, 2.2, z - 6.5, Math.PI / 2);
wndArea(x - 7, z - 4.5, x + 7, z + 4.5, -1, 12, "The Ishtar Gate");
},
function () {
var D = WND_GDN, wd = wndMat(0x7A5A34, "wood"), sc = D.screw, top = D.tiers[3][1] + 0.5;
var g = wndGroup(68, top / 2, -52, 0);
sc.g = g;
g.userData.keep = 1;
var len = Math.hypot(16, top);
var tr = wndCyl(0.9, len, wndMat(0x5A3A22, "wood"), 0, 0, 0, g, lite_seg());
tr.rotation.z = Math.atan2(16, top);
var helix = new THREE.Group();
helix.rotation.z = Math.atan2(16, top);
g.add(helix);
sc.helix = helix;
for (var i = 0; i < (WND.lite ? 10 : 24); i++) {
var b = wndBox(1.5, 0.08, 0.25, wd, 0, -len / 2 + i * len / (WND.lite ? 10 : 24), 0, helix);
b.rotation.y = i * 0.8;
}
wndSolid(75.6, -52, 1.8, 1.0, 0, 2.6);
var crank = wndGroup(60.5, top + 1, -52, 0);
crank.userData.keep = 1;
wndBox(0.12, 0.12, 1.4, wndMat(0x3A3A3A, "metal"), 0, 0, 0, crank);
sc.crank = crank;
wndThen("gardens");
var wm = wndMat(0x5AB8E8, null, { op: 0.75 });
D.water = [];
var ch = wndBox(1, 0.3, 100, wm, 58, top + 0.1, -2);
D.water.push(ch);
ch.visible = false;
sc.channel = ch;
D.tiers.forEach(function (T, i) { if (!i)
return; var fall = wndBox(0.08, T[1] - D.tiers[i - 1][1], 3, wndMat(0x9AD8F4, null, { op: 0.5 }), T[0] - 0.3, (T[1] + D.tiers[i - 1][1]) / 2 + 0.5, -40); fall.visible = false; D.water.push(fall); });
sc.falls = D.water.slice(1);
var turner = wndPersonFig("screwman", 60, top, -50.5, Math.PI, { top: 0xE8DCC0, bottom: 0xA8784A, skin: 0xA87A54, sex: "m" }, "labourer");
WND.people.push({ g: turner, site: "gardens", v: "then:gardens" });
wndActSpot("gardens", "screw", 59.5, -49, "The water screw", "turn it", function () { wndScrewTurn(); }, { y: top });
wndPlaque("gdn-screw", "The water screw", "Strabo says screws turned by men lifted the Euphrates' water to the top without stopping. A screw in a tube, tilted, carries water up a little with every turn. Turn it, and watch the water fill the channel and fall from terrace to terrace.", 2.4, 1.6, 58, top + 1.6, -55.5, 0);
},
function () {
var sc = WND_GDN.screw;
sc.on = 6;
sc.raised += 1;
var litres = sc.raised * 30;
if (sc.raised === 8)
wndDid("gardens", "screw");
wndSay("💧 <b>The shadufs dip and rise.</b> " + litres + " litres lifted so far" + (sc.raised >= 8 ? ": the channel is full and the water falls from terrace to terrace." : ". Keep working them (press E again)."));
},
function (dt) {
var sc = WND_GDN.screw;
if (sc.poles)
babShadufTick(dt);
if (!sc.helix && !sc.poles)
return;
if (sc.on > 0) {
sc.on -= dt;
if (sc.helix)
sc.helix.rotation.y += dt * 1.6;
if (sc.crank)
sc.crank.rotation.x += dt * 1.6;
}
var full = sc.raised >= 8, v = wndView("gardens") === "then";
if (sc.channel)
sc.channel.visible = v && sc.raised > 0;
(sc.falls || []).forEach(function (f) { f.visible = v && full; });
},
function () {
var L = [], i;
for (i = 0; i < 21; i++) {
L.push([-54 + i * 5.4, -24]);
L.push([-54 + i * 5.4, 24]);
}
for (i = 1; i < 7; i++) {
L.push([-54, -24 + i * 48 / 7]);
L.push([54, -24 + i * 48 / 7]);
}
for (i = 0; i < 19; i++) {
L.push([-48.6 + i * 5.4, -17.1]);
L.push([-48.6 + i * 5.4, 17.1]);
}
for (i = 1; i < 5; i++) {
L.push([-48.6, -17.1 + i * 34.2 / 5]);
L.push([48.6, -17.1 + i * 34.2 / 5]);
}
[-46, -42, -38, -34].forEach(function (x) { [-10.5, -3.5, 3.5, 10.5].forEach(function (z) { L.push([x, z]); }); });
[43, 47].forEach(function (x) { [-10.5, -3.5, 3.5, 10.5].forEach(function (z) { L.push([x, z]); }); });
[-7, 0, 7].forEach(function (z) { L.push([45, z]); });
return L;
},
function () {
var S = wndSiteBegin("artemis"), lite = WND.lite, A = WND_ART, y = A.y;
var marble = wndMat(0xF2EEE6, "marble", { phong: 50 }), marble2 = wndMat(0xE4DCCC, "marble"), roof = wndMat(0xB86A4A, "tile"), gold = wndMat(0xD8A838, "metal", { phong: 80 });
wndThen("artemis");
for (var s = 0; s < 6; s++) {
var w = 124 - s * 1.6, d = 64 - s * 1.6;
wndBox(w, 0.4, d, marble2, 0, 0.2 + s * 0.4, 0);
}
wndFloor(-61.2, -31.2, 61.2, 31.2, y);
for (var s2 = 0; s2 < 6; s2++) {
var e = 62 - s2 * 0.8, f = 32 - s2 * 0.8;
wndFloor(-e, -f, e, f, (s2 + 1) * 0.4);
}
var cols = wndArtemisCols(), list = cols.map(function (c) { return [c[0], y, c[1]]; });
wndColumnsInst(list, A.colH, 0.95, "ionic", marble, null, { flute: wndFluteMat(0xF2EEE6, "art") });
var carved = cols.slice().sort(function (a, b) { return a[0] - b[0]; }).slice(0, 36);
var rel = wndCanvasMat("art-relief", 256, 64, function (x, W, H) { x.fillStyle = "#E8E0D0"; x.fillRect(0, 0, W, H); x.fillStyle = "#B8AC98"; for (var i = 0; i < 6; i++) {
var cx = i * W / 6 + W / 12;
x.beginPath();
x.arc(cx, H * 0.25, 5, 0, 6.3);
x.fill();
x.fillRect(cx - 4, H * 0.32, 8, H * 0.4);
x.fillRect(cx - 9, H * 0.36, 18, 4);
x.fillRect(cx - 4, H * 0.72, 3, H * 0.24);
x.fillRect(cx + 1, H * 0.72, 3, H * 0.24);
} }, { rep: [2, 1] });
var M = new THREE.Matrix4(), cg = new THREE.CylinderGeometry(1.0, 1.02, 2.4, lite ? 10 : 18), ci = new THREE.InstancedMesh(cg, rel, carved.length);
carved.forEach(function (c, i) { M.makeTranslation(c[0], y + 0.45 + 1.2, c[1]); ci.setMatrixAt(i, M); });
ci.instanceMatrix.needsUpdate = true;
wndP().add(ci);
ci.userData.keep = 1;
var top = y + A.colH;
wndBox(112, 1.2, 52, marble, 0, top + 0.6, 0);
wndBox(112.4, 1.0, 52.4, wndCanvasMat("art-frieze", 512, 32, function (x, W, H) { x.fillStyle = "#E8E0D0"; x.fillRect(0, 0, W, H); x.fillStyle = "#C8BCA8"; for (var i = 0; i < 40; i++)
x.fillRect(i * W / 40, H * 0.2, W / 80, H * 0.6); }, { rep: [0.07, 1] }), 0, top + 1.7, 0);
var rf = new THREE.Shape();
rf.moveTo(-27, 0);
rf.lineTo(27, 0);
rf.lineTo(0, 7);
rf.lineTo(-27, 0);
var rg = new THREE.Mesh(new THREE.ExtrudeGeometry(rf, { depth: 112, bevelEnabled: false }), roof);
rg.rotation.y = Math.PI / 2;
rg.position.set(-56, top + 2.2, 0);
wndP().add(rg);
var pd = new THREE.Mesh(new THREE.ShapeGeometry(rf), marble);
pd.rotation.y = -Math.PI / 2;
pd.position.set(-56.05, top + 2.2, 0);
wndP().add(pd);
wndBox(108, 0.4, 48, wndCanvasMat("art-coffer", 128, 128, function (x, W, H) { x.fillStyle = "#E8DCC4"; x.fillRect(0, 0, W, H); x.fillStyle = "#2A4A8A"; x.fillRect(12, 12, W - 24, H - 24); x.fillStyle = "#D8A838"; x.beginPath(); x.arc(W / 2, H / 2, 10, 0, 6.3); x.fill(); }, { rep: [0.25, 0.25] }), 0, top - 0.1, 0);
var cw = wndMat(0xEDE6D8, "marble");
wndRoom({ x0: -30, x1: 40, z0: -11, z1: 11, y: y, h: A.colH - 0.4, floor: wndMat(0xD8CCB8, "marble", { phong: 40 }), wall: cw, ceil: wndMat(0x2A4A8A, null), inset: 0, name: "The cella: the house of the goddess", doors: { w: [{ at: 0, w: 6, h: 11, frame: gold }] } });
for (var cx = -22; cx <= 32; cx += 6)
[-7, 7].forEach(function (z) { wndColumn(cx, y, z, 8, 0.42, "ionic", marble); wndColumn(cx, y + 8.3, z, 7, 0.36, "ionic", marble, null, { solid: false }); });
wndBox(56, 0.3, 1.6, marble, 4, y + 8.15, -7);
wndBox(56, 0.3, 1.6, marble, 4, y + 8.15, 7);
wndArtemisStatue(33, y, 0);
for (var lx = -24; lx <= 34; lx += 12)
wndLamp(lx, y + 12, 0, 0xFFE8C0, 5);
wndArea(-61, -31, 61, 31, y - 0.5, A.colH + 2, "The Temple of Artemis");
wndArea(-50, -11, -30, 11, y - 0.5, A.colH, "The west porch: a forest of columns");
var al = wndGroup(-84, 0, 0, 0);
wndBox(14, 1.6, 18, marble2, 0, 0.8, 0, al);
wndBox(8, 1.4, 6, marble, 1, 2.3, 0, al);
wndBox(8.4, 0.2, 6.4, gold, 1, 3.1, 0, al);
wndSolid(-84, 0, 7, 9, 0, 3.2);
wndFlame(-83, 3.2, 0, 4, 0xFF9A40);
wndNowL("artemis");
var marsh = wndMat(0x5A7A5A, null, { phong: 40 });
wndFlat(70, 40, marsh, 0, 0.06, 0);
wndWater(0, 0, 35, 20).not = [[WNK.ox - 4, WNK.oz - 4, WNK.ox + 4, WNK.oz + 4]];
wndFlat(8, 8, wndMat(0x7A8A5A, "earth"), 0, 0.08, 0);
wndFloor(-4, -4, 4, 4, 0.1);
var drums = [0xE4DCCC, 0xC8BCAC, 0xF0E8DC, 0xB8B0A0, 0xDCD4C4];
for (var dr = 0; dr < 9; dr++)
wndCyl(0.95, 1.8, wndMat(drums[dr % 5], "marble"), 0, 0.1 + 0.9 + dr * 1.8, 0, null, lite ? 10 : 16);
wndRound(0, 0, 1.0, 0, 18);
var nest = wndCyl(1.1, 0.6, wndMat(0x6A5034, "bark"), 0, 16.6 + 0.3, 0, null, 10);
wndSph(0.3, wndMat(0xF4F4F0, null), 0.3, 17.3, 0, null, 8);
for (var st = 0; st < (lite ? 10 : 24); st++) {
var sx = -40 + ((st * 29) % 80), sz = -24 + ((st * 17) % 48);
if (Math.abs(sx) < 6 && Math.abs(sz) < 6)
continue;
var b = wndBox(2 + ((st * 3) % 3), 0.8, 1.4, wndMat(0xD8D0C0, "marble"), sx, 0.4, sz);
b.rotation.y = st;
wndSolid(sx, sz, 1.2, 1.2, 0, 0.8);
}
wndPlaque("art-now", "The Temple of Artemis today", "A marshy field near Selçuk, Turkey. This one column was put back together from drums found scattered on the site; storks often nest on top. The temple's carved drum and other pieces are in the British Museum, London.", 3, 2, -12, 1.6, 12, -Math.PI / 2);
wndAlways("artemis");
wndRoller(-30, 70);
wndThenNow("artemis", -95, -14, -Math.PI / 2);
wndGuide("chersiphron", -20, 64, Math.PI);
wndLearnStand("artemis", -95, 14, -Math.PI / 2);
wndSign(["THE TEMPLE OF ARTEMIS AT EPHESUS", "about 550 BC, rebuilt after the fire of 356 BC"], 8, 1.4, "#1E3A7A", "#F4E8C0", -104, 2.2, 0, -Math.PI / 2);
for (var t = 0; t < (lite ? 6 : 14); t++)
wndTree(t % 3 ? "plane" : "cypress", -130 + ((t * 23) % 60), 0, -70 + ((t * 41) % 140), 1);
},
function (x, y, z) {
var g = wndGroup(x, y, z, -Math.PI / 2), wood = wndMat(0x3A2A1E, "wood"), gold = wndMat(0xD8A838, "metal", { phong: 90 });
wndBox(3, 1.6, 3, wndMat(0xE4DCCC, "marble"), 0, 0.8, 0, g);
wndSolid(x, z, 1.6, 1.6, y, 6);
var body = wndCanvasMat("art-body", 128, 256, function (c, W, H) {
c.fillStyle = "#3A2A1E";
c.fillRect(0, 0, W, H);
for (var r = 0; r < 8; r++) {
c.fillStyle = r % 2 ? "#D8A838" : "#B8862A";
c.fillRect(0, r * H / 8 + H / 16 - 3, W, 6);
for (var i = 0; i < 4; i++) {
c.fillStyle = "#E8C870";
c.beginPath();
c.ellipse(i * W / 4 + W / 8, r * H / 8 + H / 32, 8, 5, 0, 0, 6.3);
c.fill();
}
}
}, { rep: [0.29, 0.29] });
var old = function (P) {
var sk = wndCyl(0.55, 3.4, body, 0, 1.6 + 1.7, 0, P, lite ? 10 : 16, 0.42);
wndCyl(0.5, 0.9, wndMat(0x8A5A2A, null), 0, 1.6 + 3.4 + 0.35, 0, P, 12, 0.45);
[0, 1, 2].forEach(function (r) { wndSph(0.16, gold, Math.cos(r) * 0.2, 1.6 + 3.35, 0.42, P, 8); });
wndSph(0.3, wood, 0, 1.6 + 4.2, 0, P, 12);
var crown = wndCyl(0.38, 0.8, gold, 0, 1.6 + 4.85, 0, P, 8, 0.32);
for (var t = 0; t < 6; t++) {
var a = t / 6 * Math.PI * 2;
wndBox(0.12, 0.3, 0.12, gold, Math.sin(a) * 0.36, 1.6 + 5.35, Math.cos(a) * 0.36, P);
}
[-1, 1].forEach(function (s) { var a = wndBox(0.14, 0.14, 0.8, wood, s * 0.45, 1.6 + 3.5, 0.35, P); });
};
wndSculpt(g, 0, 1.6, 0, 0, { key: "artemis", sex: "f", hair: ["long"], clip: "Idle_Talking_Loop", t: 0.3, h: 3.3, skin: "ebony", hairMat: "ebony",
drapes: [{ axis: "y", a0: 1.3, a1: 0.02, parts: [0, 3], off: 0.03, folds: 0.004, flare: 0.02, k: 6, n: 24, round: 0.92, mat: body }],
props: function (B, at) {
var gm = wscMat("gold"), sp = at.spine_03, hd = at.Head;
for (var r = 0; r < 3; r++)
for (var k = 0; k < 7; k++) {
var a = -0.9 + k * 0.3, e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), gm);
e.scale.set(1, 1.4, 0.9);
e.position.set(sp.x + Math.sin(a) * 0.15, sp.y - 0.02 - r * 0.07, sp.z + Math.cos(a) * 0.13 + 0.02);
B.add(e);
}
var nk = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.015, 6, 20), gm);
nk.rotation.x = Math.PI / 2 + 0.3;
nk.position.set(hd.x, hd.y - 0.12, hd.z + 0.02);
B.add(nk);
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.22, 12), gm);
cr.position.set(hd.x, hd.y + 0.26, hd.z - 0.01);
B.add(cr);
for (var t2 = 0; t2 < 8; t2++) {
var a2 = t2 / 8 * Math.PI * 2, tw = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.04), gm);
tw.position.set(hd.x + Math.sin(a2) * 0.12, hd.y + 0.4, hd.z - 0.01 + Math.cos(a2) * 0.12);
B.add(tw);
}
var veil = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.3, 0.6, 14, 1, true), wscMat("ebony"));
veil.position.set(hd.x, hd.y - 0.05, hd.z - 0.06);
B.add(veil);
},
fallback: old });
wndFlame(x - 2.4, y + 1.4, -1.6, 2, 0xFFB060);
wndFlame(x - 2.4, y + 1.4, 1.6, 2, 0xFFB060);
wndSpot(x - 3.4, z, 2.4, "Artemis of Ephesus", "look at the goddess", function () { worldCard(worldFacts("Artemis of Ephesus", "the cult statue", [["Made of", "Dark wood, dressed in gold and jewels (Pliny says vine wood or ebony)"], ["Height", "about human size or a little more; the house was built round it"]], ["She is not the slim huntress of Greek art but a much older goddess of Ephesus, standing straight and still, her body covered in rows of beasts, bees and the famous rounded shapes on her chest, which may be breasts, eggs, gourds or offerings: scholars still argue.", "Copies of her in marble survive, such as two in the Ephesus Museum at Selçuk. The 'Diana of the Ephesians' of the Bible (Acts 19) is this goddess."]), {}); }, { y: y });
},
function (x, z) {
var R = WND_ART.roll, wd = wndMat(0x7A5A34, "wood"), g = wndGroup(x, 0, z, 0);
R.g = g;
g.userData.keep = 1;
R.x0 = x;
var spin = wndGroup(0, 0.95, 0, 0, g), shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 7, WND.lite ? 10 : 18), wndFluteMat(0xF0EAE0, "art"));
shaft.rotation.x = Math.PI / 2;
spin.add(shaft);
R.spin = spin;
wndBox(0.1, 1.9, 0.1, wndMat(0xB8AC98, null), 0, 0, 3.45, spin);
wndBox(0.1, 1.9, 0.1, wndMat(0xB8AC98, null), 0, 0, -3.45, spin);
[-1, 1].forEach(function (s) { wndBox(0.3, 0.3, 0.5, wndMat(0x3A3A3A, "metal"), 0, 0.95, s * 3.7, g); wndBox(6, 0.3, 0.3, wd, 2.2, 1.0, s * 3.9, g); });
wndBox(0.3, 0.3, 8.4, wd, 5.2, 1.0, 0, g);
R.oxen = [];
for (var o = 0; o < 2; o++) {
var ox = null;
try {
if (typeof build === "function")
ox = build({ id: "wnd_ox" + o, archetype: "cow", attrs: { s: 1.2 }, x: 0, z: 0, rot: 0, solid: false, detail: WND.lite ? 2 : 3, nights: [] });
}
catch (e) {
ox = null;
}
if (!ox) {
ox = new THREE.Group();
wndBox(2, 1.2, 0.9, wndMat(0x8A6A4A, null), 0, 1.1, 0, ox);
}
ox.position.set(7.5, 0, -1.2 + o * 2.4);
ox.rotation.y = Math.PI / 2;
g.add(ox);
R.oxen.push(ox);
}
wndFlat(70, 9, wndMat(0xA88A62, "earth"), x + 30, 0.03, z);
WNK.site = "artemis";
R.sol = wndSolid(x, z, 1, 4, 0, 2);
R.sol.mov = 1;
wndPlaque("art-roll", "Chersiphron's roller", "The shafts were too heavy for carts: on the soft road the wheels would sink. So, Vitruvius says, Chersiphron set iron pins in the ends, built a frame round each shaft, and had oxen pull it: the column itself became the wheel.", 2.6, 1.7, x - 2, 1.6, z - 5, Math.PI);
wndActSpot("artemis", "roll", x - 2.5, z, "The column shaft", "drive the oxen", function () { R.go = 1; R.t = 0; wndDid("artemis", "roll"); wndSay("🐂 <b>The oxen lean into the yoke</b> and the column rolls, turning on its iron pins like a giant rolling pin."); });
},
function () {
var S = wndSiteBegin("zeus"), lite = WND.lite, Z = WND_ZEUS, y = Z.y;
var lime = wndMat(0xD8CCB0, "stone"), stucco = wndMat(0xF0EADC, "plaster"), roofM = wndMat(0xE8E4DC, "marble"), red = wndMat(0xA83A2A, null), blue = wndMat(0x2A4A8A, null), gold = wndMat(0xD8A838, "metal", { phong: 90 });
wndThen("zeus");
for (var s = 0; s < 3; s++)
wndBox(68 - s * 1.4, 1, 32 - s * 1.4, lime, 0, 0.5 + s * 1, 0);
wndFloor(-32.6, -14.6, 32.6, 14.6, y);
for (var s2 = 0; s2 < 3; s2++)
wndFloor(-34 + s2 * 0.7, -16 + s2 * 0.7, 34 - s2 * 0.7, 16 - s2 * 0.7, (s2 + 1) * 1);
wndRamp(34, -4, 46, 4, "x", 46, 0, 34, y);
var rp = wndGroup(40, y / 2, 0, 0);
wndBox(12.6, 0.4, 8, lime, 0, 0, 0, rp);
rp.rotation.z = -Math.atan2(y, 12);
var L = [];
for (var i = 0; i < 13; i++) {
L.push([-31.3 + i * 5.22, y, -13]);
L.push([-31.3 + i * 5.22, y, 13]);
}
for (var j = 1; j < 5; j++) {
L.push([-31.3, y, -13 + j * 5.2]);
L.push([31.3, y, -13 + j * 5.2]);
}
wndColumnsInst(L, 10.4, 1.12, "doric", stucco, null, { flute: wndFluteMat(0xF0EADC, "zeus") });
var top = y + 10.4;
var ring = function (w, h, d, m, yy) { wndBox(w, h, (d - 16) / 2, m, 0, yy, (d + 16) / 4); wndBox(w, h, (d - 16) / 2, m, 0, yy, -(d + 16) / 4); wndBox((w - 32) / 2, h, 16, m, (w + 32) / 4, yy, 0); wndBox((w - 32) / 2, h, 16, m, -(w + 32) / 4, yy, 0); };
ring(65, 1.6, 29, stucco, top + 0.8);
ring(65.2, 1.5, 29.2, wndCanvasMat("zeus-trig", 256, 32, function (x, W, H) { x.fillStyle = "#E8E0D0"; x.fillRect(0, 0, W, H); for (var i = 0; i < 8; i++) {
x.fillStyle = "#2A4A8A";
x.fillRect(i * 32, 0, 12, H);
x.fillStyle = "#A83A2A";
x.fillRect(i * 32 + 14, H * 0.2, 16, H * 0.6);
} }, { rep: [0.125, 0.667] }), top + 2.35);
var pf = new THREE.Shape();
pf.moveTo(-14.6, 0);
pf.lineTo(14.6, 0);
pf.lineTo(0, 4.2);
pf.lineTo(-14.6, 0);
var rm = new THREE.Mesh(new THREE.ExtrudeGeometry(pf, { depth: 65, bevelEnabled: false }), wndMat(0xC86A4A, "tile"));
rm.rotation.y = Math.PI / 2;
rm.position.set(-32.5, top + 3.1, 0);
wndP().add(rm);
var ped = new THREE.Mesh(new THREE.ShapeGeometry(pf), wndCanvasMat("zeus-ped", 512, 160, function (x, W, H) { x.fillStyle = "#2A4A8A"; x.fillRect(0, 0, W, H); x.fillStyle = "#F0EADC"; for (var i = 0; i < 13; i++) {
var px = W * 0.08 + i * W * 0.07, hh = H * (0.25 + 0.6 * (1 - Math.abs(i - 6) / 6));
x.fillRect(px, H - hh, W * 0.03, hh);
x.beginPath();
x.arc(px + W * 0.015, H - hh - 6, 6, 0, 6.3);
x.fill();
} }));
var pu = ped.geometry.attributes.uv, pp = ped.geometry.attributes.position;
for (var q = 0; q < pu.count; q++)
pu.setXY(q, (pp.getX(q) + 14.6) / 29.2, pp.getY(q) / 4.2);
pu.needsUpdate = true;
ped.rotation.y = Math.PI / 2;
ped.position.set(32.55, top + 3.1, 0);
wndP().add(ped);
var cof = wndCanvasMat("zeus-coffer", 128, 128, function (x, W, H) { x.fillStyle = "#E8E0D0"; x.fillRect(0, 0, W, H); x.fillStyle = "#2A4A8A"; x.fillRect(14, 14, W - 28, H - 28); x.fillStyle = "#F2C848"; x.beginPath(); x.arc(W / 2, H / 2, 8, 0, 6.3); x.fill(); }, { rep: [0.25, 0.25] });
[-1, 1].forEach(function (sd) { wndBox(63, 0.3, 5.5, cof, 0, top - 0.1, sd * 10.75); wndBox(15.5, 0.3, 16, cof, sd * 23.75, top - 0.1, 0); });
var cw = wndMat(0xE8DECA, "plaster");
wndRoom({ x0: -16, x1: 16, z0: -8, z1: 8, y: y, h: 12.8, floor: wndMat(0x5A5A60, "marble", { phong: 40 }), wall: cw, ceil: wndMat(0x2A4A8A, null), inset: 0, name: "Before Zeus: the inner room", doors: { e: [{ at: 0, w: 5, h: 9, frame: gold }] } });
[-1, 1].forEach(function (sd) { wndBox(8, 10.4, 0.8, cw, 20, y + 5.2, sd * 7.6); wndSolid(20, sd * 7.6, 4, 0.4, y, 10.4); wndBox(8, 10.4, 0.8, cw, -20, y + 5.2, sd * 7.6); wndSolid(-20, sd * 7.6, 4, 0.4, y, 10.4); });
[21, -21].forEach(function (px) { [-3.2, 3.2].forEach(function (pz) { wndColumn(px + (px > 0 ? 2.5 : -2.5), y, pz, 10.4, 0.9, "doric", stucco); }); });
wndArea(16, -8, 24, 8, y - 0.5, 11, "The east porch");
wndArea(-24, -8, -16, 8, y - 0.5, 11, "The west porch");
var gy = y + 6.2;
for (var cx = -12; cx <= 12; cx += 4)
[-4.6, 4.6].forEach(function (z) { wndColumn(cx, y, z, 6, 0.42, "doric", stucco); wndColumn(cx, gy + 0.3, z, 6.2, 0.36, "doric", stucco, null, { solid: false }); });
[-1, 1].forEach(function (sd) {
wndBox(28, 0.3, 2.9, lime, -1, gy + 0.15, sd * 6.3);
wndFloor(-15, sd > 0 ? 4.9 : -7.8, 13, sd > 0 ? 7.8 : -4.9, gy + 0.3);
wndBox(28, 1, 0.15, wndMat(0x6A4A2A, "wood"), -1, gy + 0.8, sd * 4.95);
wndSolid(-1, sd * 4.95, 14, 0.1, gy + 0.3, 1);
wndRamp(9, sd > 0 ? 5.1 : -7.6, 15.4, sd > 0 ? 7.6 : -5.1, "x", 15.4, y, 9, gy + 0.3);
var sg = wndGroup(12.2, y + (gy + 0.3 - y) / 2, sd * 6.35, 0);
wndBox(6.9, 0.3, 2.5, lime, 0, 0, 0, sg);
sg.rotation.z = Math.atan2(gy + 0.3 - y, 6.4);
wndArea(-15, sd > 0 ? 4.9 : -7.8, 13, sd > 0 ? 7.8 : -4.9, gy - 0.5, 6.5, "The upper gallery");
});
wndPlaque("zeus-gal", "The galleries", "Pausanias says there were upper galleries in the temple, reached by a winding stair, from which visitors could look at the god more closely. The stairs here are at the east end of each side aisle.", 2.2, 1.5, 15.7, y + 2.4, -3, -Math.PI / 2);
wndBox(7, 0.06, 9.8, wndMat(0x0A0A0E, null, { phong: 120, spec: 0xAAAAAA }), -2, y + 0.04, 0);
[[-2, -4.95, 7.4, 0.2], [-2, 4.95, 7.4, 0.2], [1.55, 0, 0.2, 10], [-5.55, 0, 0.2, 10]].forEach(function (r) { wndBox(r[2], 0.25, r[3], wndMat(0xF4F0EA, "marble"), r[0], y + 0.12, r[1]); });
wndWater(-2, 0, 3.5, 4.9);
wndZeusStatue(-10, y, 0);
for (var lx = -12; lx <= 12; lx += 8)
wndLamp(lx, y + 11, 0, 0xFFE8C0, 5);
wndActSpot("zeus", "stand", 2.8, 2.5, "Stand Zeus up", "see what Strabo meant", function () { wndZeusStand(); }, { y: y });
wndArea(-34, -16, 34, 16, -0.5, y + 14, "The Temple of Zeus");
wndWorkshop(-62, 0, false);
wndNowL("zeus");
for (var s3 = 0; s3 < 3; s3++)
wndBox(68 - s3 * 1.4, 1, 32 - s3 * 1.4, lime, 0, 0.5 + s3 * 1, 0);
wndFloor(-32.6, -14.6, 32.6, 14.6, y);
for (var s4 = 0; s4 < 3; s4++)
wndFloor(-34 + s4 * 0.7, -16 + s4 * 0.7, 34 - s4 * 0.7, 16 - s4 * 0.7, (s4 + 1) * 1);
for (var dc = 0; dc < (lite ? 8 : 16); dc++) {
var bx = -28 + dc * 3.7, sd2 = dc % 2 ? 1 : -1, n = lite ? 4 : 7;
for (var k = 0; k < n; k++) {
var dd = wndCyl(1.12, 1.4, wndMat(0xC8BCA0, "stone"), bx + ((k * 13) % 3) * 0.2, y + 1.12, sd2 * (16 + k * 1.45), null, lite ? 10 : 16);
dd.rotation.x = Math.PI / 2;
dd.rotation.z = 0.1 * k;
}
wndSolid(bx, sd2 * (16 + n * 0.72), 1.2, n * 0.73, y, 2.4);
}
for (var k2 = 0; k2 < 6; k2++)
wndCyl(1.12, 1.73, wndMat(0xE4DCC8, "stone"), -15.7, y + 0.86 + k2 * 1.73, -13, null, lite ? 10 : 16);
wndRound(-15.7, -13, 1.15, y, 10.4);
wndBox(28, 1.2, 14, wndMat(0xB8AC90, "stone"), 0, y + 0.6, 0);
wndSolid(0, 0, 14, 7, y, 1.2);
wndFloor(-14, -7, 14, 7, y + 1.2);
wndPlaque("zeus-now", "The temple today", "Earthquakes in the sixth century AD threw down the columns; the drums still lie in rows where they fell, like stacks of coins. One column was put back up in 2004, the year the Olympic Games returned to Athens. The statue was most likely lost in a fire in Constantinople about AD 475.", 3, 2, 24, y + 1.6, -10, Math.PI / 2);
wndWorkshop(-62, 0, true);
wndAlways("zeus");
wndStadium();
wndThenNow("zeus", 52, -8, Math.PI / 2);
wndGuide("pausanias", 26, -3, Math.PI / 2, { y: y });
wndLearnStand("zeus", 52, 8, Math.PI / 2);
wndSign(["OLYMPIA: THE TEMPLE OF ZEUS", "the statue by Phidias, about 435 BC"], 8, 1.4, "#2A4A8A", "#F4E8C0", 56, 2.2, 0, Math.PI / 2);
for (var t = 0; t < (lite ? 8 : 20); t++) {
var tx = -110 + ((t * 37) % 220), tz = -60 + ((t * 53) % 40);
wndTree(t % 3 ? "olive" : "plane", tx, 0, tz < -30 ? tz : tz - 40, 1.1);
}
},
function (x, y, z, o) {
o = o || {};
var g = wndGroup(x, y, z, Math.PI / 2), lite = WND.lite, iv = wndMat(0xF2E4C6, null, { phong: 40 }), gold = wndMat(0xD8A838, "metal", { phong: 90 }), eb = wndMat(0x3A2418, "wood", { phong: 30 }), robe = wndMat(0xC89A30, "metal", { phong: 60 });
if (o.ghost) {
iv = gold = eb = robe = wndMat(0xFFE8A0, null, { op: 0.32 });
}
if (!o.ghost) {
wndBox(6.6, 1.0, 9.6, wndMat(0x2A2A30, "stone"), 0, 0.5, -0.5, g);
wndSolid(x - 0.5, z, 4.9, 3.4, y, 12);
}
var b = o.ghost ? 0 : 1.0;
if (!o.ghost) {
wndBox(6, 3.6, 4.4, eb, 0, b + 1.8, -1.4, g);
wndBox(6.2, 0.3, 4.6, gold, 0, b + 3.7, -1.4, g);
wndBox(6, 6.5, 0.6, eb, 0, b + 6.9, -3.4, g);
wndBox(6.4, 0.5, 0.8, gold, 0, b + 10.2, -3.4, g);
[-1, 1].forEach(function (sd) { wndBox(0.5, 2.2, 4.2, gold, sd * 3.1, b + 4.6, -1.4, g); wndSph(0.5, gold, sd * 3.1, b + 5.8, 0.8, g, 10); [-1, 1].forEach(function (fz) { wndBox(0.6, 3.6, 0.6, gold, sd * 2.7, b + 1.8, -1.4 + fz * 1.9, g); }); });
}
var sc = o.ghost ? 1.38 : 1;
if (o.ghost) {
wndSculpt(g, 0, 0, 0, 0, { key: "zeus-stand", sex: "m", hair: ["beard", "parted"], clip: "Idle_Loop", t: 0.4, h: 21, skin: wndMat(0xFFE8A0, null, { op: 0.32 }),
drapes: [{ axis: "y", a0: 1.02, a1: 0.12, parts: [0, 3], off: 0.04, folds: 0.02, flare: 0.12, k: 11, n: 22, mat: wndMat(0xFFE8A0, null, { op: 0.32 }) }],
fallback: function (P) { var hh = 16; wndCyl(1.2, hh * 0.5, robe, 0, hh * 0.25, 0, P, 10, 1.6); wndCyl(1.1, hh * 0.3, iv, 0, hh * 0.65, 0, P, 10, 0.95); wndSph(0.9, iv, 0, hh * 0.87, 0, P, 10); } });
return g;
}
var old = function (P) {
wndBox(3.4, 1.0, 3.6, robe, 0, b + 4.5, 0.5, P);
[-0.9, 0.9].forEach(function (lx) {
var th = wndCyl(0.85, 4.2, robe, lx, b + 4.55, 0.5, P, lite ? 10 : 16, 0.95);
th.rotation.x = Math.PI / 2;
wndSph(0.86, robe, lx, b + 4.5, 2.55, P, lite ? 10 : 14);
wndCyl(0.62, 3.9, robe, lx, b + 2.25, 2.55, P, lite ? 10 : 16, 0.75);
wndBox(1.0, 0.45, 1.7, gold, lx, b + 0.22, 2.95, P);
});
wndCyl(1.35, 4.4, iv, 0, b + 7.3, -0.8, P, lite ? 10 : 16, 1.6);
var dr = wndBox(1.6, 4.6, 2.8, robe, -1.0, b + 7.2, -0.8, P);
dr.rotation.z = 0.25;
wndSph(0.95, iv, 0, b + 10.2, -0.6, P, lite ? 10 : 16);
var beard = wndSph(0.75, wndMat(0x8A6A2A, "metal", { phong: 60 }), 0, b + 9.6, -0.05, P, 10);
beard.scale.set(1, 1.2, 0.7);
var hair = wndSph(1.0, wndMat(0x8A6A2A, "metal", { phong: 60 }), 0, b + 10.45, -0.85, P, 10);
hair.scale.set(1, 0.8, 1);
var wreath = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.12, 6, lite ? 12 : 20), wndMat(0x6A8A3A, "foliage"));
wreath.rotation.x = Math.PI / 2;
wreath.position.set(0, b + 10.6, -0.6);
P.add(wreath);
var ra = wndBox(0.8, 0.8, 3.2, iv, 1.7, b + 7.2, 1.0, P);
ra.rotation.x = 0.2;
wndBox(1.4, 0.2, 1.2, iv, 1.7, b + 6.9, 2.8, P);
var nk = wndGroup(1.7, b + 7.0, 2.9, 0, P);
wndCyl(0.25, 1.4, gold, 0, 0.7, 0, nk, 8, 0.35);
wndSph(0.22, iv, 0, 1.6, 0, nk, 8);
[-1, 1].forEach(function (s) { var w = wndBox(0.08, 0.9, 0.6, gold, s * 0.35, 1.1, -0.2, nk); w.rotation.z = s * 0.5; });
var la = wndBox(0.8, 3.2, 0.8, iv, -2.0, b + 8.6, 0.2, P);
la.rotation.z = -0.25;
wndCyl(0.12, 11, gold, -2.3, b + 5.5, 0.8, P, 8);
var eg = wndGroup(-2.3, b + 11.2, 0.8, 0, P);
wndSph(0.3, gold, 0, 0, 0, eg, 8);
[-1, 1].forEach(function (s) { var w = wndBox(0.9, 0.06, 0.4, gold, s * 0.5, 0.1, 0, eg); w.rotation.z = s * 0.4; });
};
wndSculpt(g, 0, 0, 0, 0, { key: "zeus", sex: "m", hair: ["beard", "parted"], clip: "Sitting_Idle_Loop", h: 16, seat: b + 3.95, seatZ: -1.7, skin: "ivory", hairMat: "gold",
pose: { upperarm_l: [0, 0, 0.9], lowerarm_l: [0, 0, 1.6], lowerarm_r: [0.6, 0, 0] },
drapes: [{ lap: 1, yTop: 0.72, zBack: -0.36, yFloor: 0.06, ySeat: 0.45, off: 0.015, folds: 0.01, side: 0.02, mat: "gold" }],
props: function (B, at) {
var hl = at.hand_l, hr = at.hand_r, gm = wscMat("gold");
var sc = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 1.5, 8), gm);
sc.position.set(hl.x + 0.02, hl.y - 0.25, hl.z + 0.02);
B.add(sc);
var eg = new THREE.Group();
eg.position.set(hl.x + 0.02, hl.y + 0.52, hl.z + 0.02);
B.add(eg);
var eb2 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), gm);
eb2.scale.set(1, 0.8, 1.4);
eg.add(eb2);
[-1, 1].forEach(function (s2) { var w = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.008, 0.05), gm); w.position.set(s2 * 0.06, 0.02, 0); w.rotation.z = s2 * 0.5; eg.add(w); });
wndSculpt(B, hr.x, hr.y + 0.03, hr.z + 0.06, 0, { key: "nike", sex: "f", hair: ["buns"], clip: "Idle_Loop", t: 0.2, h: 0.3, skin: "gold",
pose: { upperarm_r: [0, 0, -1.2] }, drapes: [{ axis: "y", a0: 1.3, a1: 0.06, parts: [0, 3], off: 0.03, folds: 0.02, flare: 0.1, k: 11, n: 20, mat: "ivory" }],
props: function (N) { [-1, 1].forEach(function (s3) { var wg = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.8), wscMat("gold")); wg.position.set(s3 * 0.22, 1.25, -0.18); wg.rotation.y = s3 * 0.6; wg.rotation.z = -s3 * 0.3; N.add(wg); }); } });
}, fallback: old });
return g;
},
function () {
var Z = WND_ZEUS;
if (Z.ghost) {
Z.ghost.visible = true;
Z.stand = 10;
return;
}
var keep = WNK.F, kv = WNK.v;
WNK.F = WND.vgroups.zeus.then;
WNK.v = "then:zeus";
Z.ghost = wndZeusStatue(-10, WND_ZEUS.y + 1, 0, { ghost: 1 });
WNK.F = keep;
WNK.v = kv;
Z.stand = 10;
wndDid("zeus", "stand");
wndSay("⚡ <b>If Zeus stood up…</b> he would be about 16 m tall: his head would go 3 m through the roof. Strabo wrote that the god seemed so great that if he rose he would unroof the temple. Phidias meant him to feel too big for his house.");
},
function (x, z, now) {
var lite = WND.lite, brick = wndMat(0xB86A4A, "brick"), stone = wndMat(0xC8BCA0, "stone"), wd = wndMat(0x7A5A34, "wood");
if (now) {
wndRoom({ x0: x - 16, x1: x + 16, z0: z - 7.5, z1: z + 7.5, h: 3.6, floor: wndMat(0x9A8A6A, "earth"), wall: stone, ceil: null, inset: 0, name: "Phidias' workshop (later a church)", doors: { e: [{ at: z, w: 3, h: 3.4 }], n: [{ at: x - 6, w: 2.4, h: 3 }] } });
wndBox(32, 1.2, 0.6, brick, x, 4.2, z - 7.5);
wndBox(32, 1.2, 0.6, brick, x, 4.2, z + 7.5);
wndPlaque("zeus-ws-now", "Phidias' workshop", "In the fifth century AD Christians turned the workshop into a church, which is why its walls survive. Digging here in 1954-58, archaeologists found tools, clay moulds for the god's golden robe, chips of ivory and glass, and a cup scratched 'I belong to Pheidias'.", 2.6, 1.7, x, 1.8, z + 7.1, Math.PI);
return;
}
wndRoom({ x0: x - 16, x1: x + 16, z0: z - 7.5, z1: z + 7.5, h: 13, floor: wndMat(0x9A8A6A, "earth"), wall: wndMat(0xD8CCB0, "stone"), ceil: wndMat(0x5A4A3A, "wood"), inset: 0, name: "Phidias' workshop", doors: { e: [{ at: z, w: 5, h: 8 }], n: [{ at: x - 6, w: 2.4, h: 3 }] } });
var g = wndGroup(x - 6, 0, z, Math.PI / 2);
wndBox(5, 10, 4, wndMat(0x8A6A3A, "wood"), 0, 5, 0, g);
wndBox(3.4, 4, 3.6, wndMat(0xC89A30, "metal", { phong: 60 }), 0, 3, 0.4, g);
for (var sx = -3; sx <= 3; sx += 3)
for (var sy = 2; sy < 12; sy += 3.2) {
wndBox(0.15, 0.15, 6, wd, sx, sy, 0, g);
}
[-3, 3].forEach(function (px) { [-3, 3].forEach(function (pz) { wndBox(0.2, 12, 0.2, wd, px, 6, pz, g); }); });
wndSolid(x - 6, z, 3.2, 3.2, 0, 12);
[[x + 4, z - 5], [x + 10, z - 5], [x + 4, z + 5], [x + 10, z + 5]].forEach(function (p, i) {
wndBox(4, 0.9, 1.4, wd, p[0], 0.45, p[1]);
wndSolid(p[0], p[1], 2, 0.7, 0, 1);
for (var k = 0; k < 5; k++) {
var c = [0xF2E4C6, 0xD8A838, 0xA8643A, 0x5A5A5A, 0x2A1A10][(k + i) % 5];
wndBox(0.4, 0.12, 0.3, wndMat(c, null), p[0] - 1.5 + k * 0.75, 0.96, p[1]);
}
});
wndCyl(1, 1.6, brick, x + 13, 0.8, z, null, 10);
wndFlame(x + 13, 1.6, z, 3, 0xFF8A30);
wndRound(x + 13, z, 1.1, 0, 2);
wndSpot(x + 4, z - 3.6, 1.8, "A small black cup", "look", function () { worldCard(worldFacts("The cup of Phidias", "found in the workshop in 1958", [["What", "A small black-glazed jug for wine or water"], ["On it", "Scratched on the bottom: 'I belong to Pheidias'"]], ["It is in the museum at Olympia. Some doubt it was his; most think it ties the great sculptor to this very room."]), {}); });
wndGuide("phidias", x + 6, z, -Math.PI / 2);
for (var lx = x - 10; lx <= x + 10; lx += 10)
wndLamp(lx, 10, z, 0xFFE0B0, 4);
},
function () {
var x0 = 70, x1 = 262, gr = wndMat(0x6A8A3A, "grass"), sand = wndMat(0xD8C8A0, "sand"), st = wndMat(0xE8E0D0, "marble");
wndFlat(x1 - x0 + 20, 32, sand, (x0 + x1) / 2, 0.03, 0);
[-1, 1].forEach(function (s) { var g = wndGroup((x0 + x1) / 2, 0, s * 22, 0); var bk = wndBox(x1 - x0 + 30, 5, 12, gr, 0, 2.5, 0, g); bk.rotation.x = s * 0.35; wndSolid((x0 + x1) / 2, s * 22, (x1 - x0 + 30) / 2, 6, 0, 6); });
wndBox(1, 0.08, 30, st, x0, 0.06, 0);
wndBox(1, 0.08, 30, st, x1, 0.06, 0);
for (var l = 0; l < 20; l++)
wndBox(0.25, 0.12, 0.6, st, x0 + 0.3, 0.08, -13 + l * 1.37);
wndSign(["THE STADIUM", "one stadion: 192 m"], 5, 1.1, "#2A4A8A", "#F4E8C0", x0 - 3, 2.2, -16, Math.PI / 2);
wndActSpot("zeus", "run", x0 - 2, 0, "The starting line", "run the stadion", function () { wndRunStart(); });
WND_ZEUS.run = { x0: x0, x1: x1, t: -1 };
},
function (dt) {
var R = WND_ZEUS.run;
if (!R || !R.on)
return;
R.t += dt;
var L = worldLocal(), A = WND_AT.zeus, lx = L.x - A.x, lz = L.z - A.z;
if (Math.abs(lz) > 16 || lx < R.x0 - 10) {
if (R.t > 3) {
R.on = 0;
wndSay("The race is off: you left the track.");
}
return;
}
if (lx >= R.x1) {
R.on = 0;
var t = R.t, p = wndProg();
p.best = p.best || {};
var was = p.best.run;
if (!was || t < was) {
p.best.run = t;
wndProgSave();
}
wndDid("zeus", "run");
wndSay("🏁 <b>" + t.toFixed(1) + " seconds</b> for the stadion" + (was ? " (your best: " + Math.min(was, t).toFixed(1) + ")" : "") + ". A fast runner today does 192 m in about 20 seconds; nobody knows the ancient winners' times, because the Greeks never measured them, only who came first.");
}
},
function () {
var S = wndSiteBegin("mausoleum"), lite = WND.lite, M = WND_MAU, cz = M.cz;
var marble = wndMat(0xF0EAE0, "marble", { phong: 50 }), stone = wndMat(0xD8CCB4, "stone"), blue = wndMat(0x2A4A8A, null), gold = wndMat(0xD8A838, "metal", { phong: 80 });
wndThen("mausoleum");
for (var s = 0; s < 4; s++)
wndBox(44 - s * 1.5, 0.5, 38 - s * 1.5, stone, 0, 0.25 + s * 0.5, cz);
wndBox(38, M.pod - 2, 32, marble, 0, 2 + (M.pod - 2) / 2, cz);
wndSolid(0, cz, 22, 19, 0, M.pod + 30);
var amaz = wndCanvasMat("mau-amaz", 512, 64, function (x, W, H) {
x.fillStyle = "#2A4A8A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#F0EAE0";
for (var i = 0; i < 10; i++) {
var cx = i * W / 10 + W / 20, lean = i % 2 ? 0.3 : -0.3;
x.save();
x.translate(cx, H * 0.92);
x.rotate(lean);
x.fillRect(-3, -H * 0.55, 6, H * 0.5);
x.beginPath();
x.arc(0, -H * 0.65, 5, 0, 6.3);
x.fill();
x.fillRect(-14, -H * 0.48, 28, 4);
x.fillRect(-4, -H * 0.1, 3, H * 0.1);
x.restore();
x.beginPath();
x.arc(cx + (i % 2 ? 14 : -14), H * 0.45, 8, 0, 6.3);
x.strokeStyle = "#F0EAE0";
x.lineWidth = 2;
x.stroke();
}
}, { rep: [0.1, 0.455] });
wndBox(38.4, 2.2, 32.4, amaz, 0, M.pod - 1.4, cz);
wndBox(38.6, 0.5, 32.6, marble, 0, M.pod - 0.05, cz);
if (!lite)
for (var ln = 0; ln < 12; ln++) {
var a = ln / 12 * Math.PI * 2, lx = Math.cos(a) * 17.5, lz = cz + Math.sin(a) * 14.5;
wndLionStatue(lx, M.pod + 0.2, lz, a + Math.PI / 2);
}
var C = [], y = M.pod + 0.2;
for (var i = 0; i < 11; i++) {
C.push([-16 + i * 3.2, y, cz - 13]);
C.push([-16 + i * 3.2, y, cz + 13]);
}
for (var j = 1; j < 8; j++) {
C.push([-16, y, cz - 13 + j * 3.25]);
C.push([16, y, cz - 13 + j * 3.25]);
}
wndColumnsInst(C, M.col, 0.55, "ionic", marble, null, { flute: wndFluteMat(0xF0EAE0, "mau"), solid: false });
wndBox(28, M.col, 22, wndMat(0xE8E0D2, "marble"), 0, y + M.col / 2, cz);
if (!lite)
for (var st = 0; st < 10; st++) {
var sx = -14.4 + st * 3.2;
[cz - 13, cz + 13].forEach(function (z2, k) { var fem = (st + k) % 2 === 1; wndSculpt(null, sx, y, z2 + (k ? -0.6 : 0.6), k ? 0 : Math.PI, wscRobed({ key: "mau_s" + (st % 3) + (fem ? "f" : "m"), sex: fem ? "f" : "m", h: 2.9, t: 0.3 + (st % 3) * 0.6, mat: "marble" })); });
}
var top = y + M.col;
wndBox(34, 1.4, 28, marble, 0, top + 0.7, cz);
wndBox(34.2, 0.8, 28.2, wndCanvasMat("mau-centaur", 512, 32, function (x, W, H) { x.fillStyle = "#A83A2A"; x.fillRect(0, 0, W, H); x.fillStyle = "#F0EAE0"; for (var i = 0; i < 12; i++) {
x.fillRect(i * W / 12 + 6, H * 0.3, 20, H * 0.4);
x.fillRect(i * W / 12 + 22, H * 0.1, 4, H * 0.4);
} }, { rep: [0.125, 1.25] }), 0, top + 1.8, cz);
var py = top + 2.2, n = lite ? 12 : 24, sh = 7.2 / n;
for (var k2 = 0; k2 < n; k2++) {
var w = 34 - (34 - 9) * k2 / n, d = 28 - (28 - 7) * k2 / n;
wndBox(w, sh, d, wndMat(0xE8E2D6, "marble"), 0, py + sh * k2 + sh / 2, cz);
}
var qy = py + 7.2;
wndBox(8.6, 1.4, 6.6, marble, 0, qy + 0.7, cz);
wndQuadriga(0, qy + 1.4, cz);
wndArea(-22, cz - 19, 22, cz + 19, -0.5, 46, "The Mausoleum");
[["east", "Scopas", 23, cz, Math.PI / 2], ["north", "Bryaxis", 0, cz - 20, Math.PI], ["south", "Timotheus", 0, cz + 20, 0], ["west", "Leochares", -23, cz, -Math.PI / 2]].forEach(function (r) {
wndPlaque("mau-" + r[0], "The " + r[0] + " side: " + r[1], { east: "Scopas of Paros carved this side. He was famous for faces full of feeling: grief, rage, longing.", north: "Bryaxis of Athens carved this side; later he made a famous statue of the god Serapis for Alexandria.", south: "Timotheus carved this side; he had worked on the temple of Asclepius at Epidaurus.", west: "Leochares of Athens carved this side; he also made statues of Alexander the Great and of Philip of Macedon." }[r[0]] + " Pliny says that when Artemisia died, the four went on working without pay, for their own glory and their art's.", 2.6, 1.7, r[2], 2.2, r[3], r[4]);
wndActSpot("mausoleum", "side_" + r[0], r[2] + Math.sin(r[4]) * 1.6, r[3] + Math.cos(r[4]) * 1.6, "The " + r[0] + " side", "read who carved it", function () { M.read[r[0]] = 1; var n2 = Object.keys(M.read).length; wndSay("🗿 <b>The " + r[0] + " side</b>: " + r[1] + ". " + n2 + " of 4 sides read." + (n2 >= 4 ? " You have walked all the way round: every side by a different master." : "")); if (n2 >= 4)
wndDid("mausoleum", "sides"); });
});
wndShip(-40, 70, 0.4);
wndShip(10, 110, -0.3);
wndNowL("mausoleum");
var rock = wndMat(0xB8A888, "stone");
wndBox(44, 0.2, 38, wndMat(0x9A8A6A, "earth"), 0, -0.05, cz);
[[0, cz - 19, 44, 1], [0, cz + 19, 44, 1], [-22, cz, 1, 38], [22, cz, 1, 38]].forEach(function (r) { wndBox(r[2], 1.4, r[3], rock, r[0], 0.5, r[1]); wndSolid(r[0], r[1], r[2] / 2, r[3] / 2, 0, 1.4); });
wndFloor(-22, cz - 19, 22, cz + 19, 0);
for (var b = 0; b < (lite ? 10 : 22); b++) {
var bx = -18 + ((b * 31) % 36), bz = cz - 15 + ((b * 17) % 30);
var bk = wndBox(2.4, 0.9, 1.2, wndMat([0xF0EAE0, 0xD8CCB4, 0xE8E2D6][b % 3], "marble"), bx, 0.45, bz);
bk.rotation.y = b * 0.7;
wndSolid(bx, bz, 1.2, 1.2, 0, 0.9);
}
for (var cd = 0; cd < 4; cd++) {
var c = wndCyl(0.55, 2.2, wndMat(0xF0EAE0, "marble"), -8 + cd * 5, 0.55, cz + 8, null, lite ? 10 : 16);
c.rotation.z = Math.PI / 2;
wndSolid(-8 + cd * 5, cz + 8, 1.2, 0.6, 0, 1.1);
}
wndPlaque("mau-now", "The Mausoleum today", "Earthquakes brought it down between the 12th and 15th centuries. From 1494 the Knights of St John took its stones for their castle on the harbour and burned much of its marble for lime. Charles Newton dug here in 1856-57; the great horse, the frieze slabs and two colossal statues are now in the British Museum.", 3, 2, 0, 1.8, cz - 22, Math.PI);
wndCastle(70, 30);
wndAlways("mausoleum");
wndMauTomb();
wndThenNow("mausoleum", -12, cz - 34, Math.PI);
wndGuide("artemisia", 6, cz - 30, Math.PI);
wndGuide("pytheos", -28, cz - 8, -Math.PI / 2);
wndLearnStand("mausoleum", 14, cz - 34, Math.PI);
wndSign(["THE MAUSOLEUM AT HALICARNASSUS", "the tomb of Mausolus · about 350 BC"], 8, 1.4, "#2A4A8A", "#F4E8C0", 0, 2.2, cz - 38, Math.PI);
for (var t = 0; t < (lite ? 6 : 12); t++)
wndTree(t % 2 ? "cypress" : "olive", -60 + ((t * 29) % 120), 0, cz - 60 - ((t * 13) % 30), 1);
},
function (x, y, z) {
var g = wndGroup(x, y, z, Math.PI), m = wndMat(0xF0EAE0, "marble", { phong: 40 });
for (var h = 0; h < 4; h++) {
var hr = null;
if (!WND.lite && typeof modelsLoader === "function" && location.protocol !== "file:") {
wndBeast(g, -2.4 + h * 1.6, 0, 1.2, 0, "quaternius/animated-animals/horse.glb", 3.4, "marble");
continue;
}
try {
if (typeof build === "function")
hr = build({ id: "wnd_horse" + h, archetype: "horse", attrs: { s: 2.2 }, x: 0, z: 0, rot: 0, solid: false, detail: WND.lite ? 2 : 3, nights: [] });
}
catch (e) {
hr = null;
}
if (!hr) {
hr = new THREE.Group();
wndBox(0.9, 1.1, 2.4, m, 0, 1.6, 0, hr);
wndBox(0.4, 1.2, 0.6, m, 0, 2.6, 1.2, hr);
for (var l = 0; l < 4; l++)
wndBox(0.2, 1.1, 0.2, m, (l % 2 ? 0.3 : -0.3), 0.55, (l < 2 ? 0.9 : -0.9), hr);
}
else
hr.traverse(function (o) { if (o.isMesh) {
o.material = m;
} });
hr.position.set(-2.4 + h * 1.6, 0, 1.2);
hr.scale.multiplyScalar(1.4);
g.add(hr);
}
wndBox(2.8, 1.4, 1.6, m, 0, 0.9, -1.4, g);
wndCyl(0.8, 0.2, m, -1.5, 0.8, -1.6, g, 12).rotation.z = Math.PI / 2;
wndCyl(0.8, 0.2, m, 1.5, 0.8, -1.6, g, 12).rotation.z = Math.PI / 2;
wndSculpt(g, -0.45, 1.6, -1.4, 0, wscRobed({ key: "mausolus", sex: "m", h: 2.8, t: 0.9, mat: "marble", pose: { lowerarm_r: [1.0, 0, 0], lowerarm_l: [1.0, 0, 0] } }));
wndSculpt(g, 0.5, 1.6, -1.6, 0, wscRobed({ key: "artemisia", sex: "f", h: 2.65, t: 1.5, mat: "marble" }));
},
function () {
var cz = WND_MAU.cz, rock = wndMat(0xA8987A, "stone"), y = -4.5;
wndRamp(-34, cz - 1.2, -24, cz + 1.2, "x", -34, 0, -24, y);
var g = wndGroup(-29, y / 2, cz, 0);
wndBox(10.4, 0.3, 2.4, rock, 0, -0.15, 0, g);
g.rotation.z = Math.atan2(y, 10) * -1;
g.rotation.z = -Math.atan2(-y, 10);
for (var s = 0; s < 14; s++)
wndBox(0.4, 0.12, 2.4, wndMat(0xC8B898, "stone"), -34 + s * 10 / 14 + 0.3, (y * s / 14) + 0.06, cz);
[-1, 1].forEach(function (sd) { wndBox(10, 3 + Math.abs(y), 0.4, rock, -29, y + 1.5, cz + sd * 1.4); wndSolid(-29, cz + sd * 1.4, 5, 0.2, y, 6); });
wndFloor(-40, cz - 8, -34, cz + 8, 0);
wndFloor(-34, cz - 8, -12, cz - 1.3, 0);
wndFloor(-34, cz + 1.3, -12, cz + 8, 0);
wndFloor(-24, cz - 1.3, -12, cz + 1.3, 0);
wndRoom({ x0: -24, x1: -14, z0: cz - 1.4, z1: cz + 1.4, y: y, h: 2.8, floor: rock, wall: rock, ceil: rock, inset: 0, name: "The passage to the tomb", skip: "w", doors: { e: [{ at: cz, w: 1.8, h: 2.4, noStep: 1 }] } });
wndRoom({ x0: -14, x1: -4, z0: cz - 5, z1: cz + 5, y: y, h: 4, floor: wndMat(0xE8E0D0, "marble"), wall: wndMat(0xE0D6C4, "marble"), ceil: rock, inset: 0, name: "The burial chamber", doors: { w: [{ at: cz, w: 1.8, h: 2.4, noStep: 1 }] } });
var seal = wndBox(0.8, 2.6, 2.4, wndMat(0x9A8A6A, "stone"), -15.2, y + 1.3, cz + 2.6);
wndSolid(-15.2, cz + 2.6, 0.4, 1.2, y, 2.6);
wndBox(2.6, 1.1, 1.3, wndMat(0xF0EAE0, "marble", { phong: 40 }), -8, y + 0.55, cz);
wndSolid(-8, cz, 1.3, 0.7, y, 1.2);
wndLamp(-9, y + 3.4, cz, 0xFFD8A0, 4);
wndLamp(-19, y + 2.4, cz, 0xFFD8A0, 2.4);
wndPlaque("mau-tomb", "The burial chamber", "Newton found the stair and this chamber below the tomb, and a huge stone that had sealed the door. The tomb had been robbed long before; a few gold ornaments and pieces of an alabaster jar were all that remained. Here, perhaps, lay the ashes of Mausolus and Artemisia.", 2.4, 1.6, -4.3, y + 2, cz, -Math.PI / 2);
},
function (x, z) {
var st = wndMat(0xC8B48A, "stone"), dk = wndMat(0x3A2A1A, "wood"), h = 9;
wndRoom({ x0: x - 20, x1: x + 20, z0: z - 16, z1: z + 16, h: h, floor: wndMat(0xB8A880, "paving"), wall: st, ceil: null, t: 1.6, inset: 0, name: "The castle courtyard", doors: { w: [{ at: z, w: 3.6, h: 4.4, frame: dk }] } });
[[x - 20, z - 16], [x + 20, z - 16], [x - 20, z + 16], [x + 20, z + 16]].forEach(function (c) { wndCyl(3, h + 3, st, c[0], (h + 3) / 2, c[1], null, WND.lite ? 10 : 16); wndRound(c[0], c[1], 3, 0, h + 3); });
for (var cr = 0; cr < 16; cr++) {
wndBox(1, 1, 1.8, st, x - 19 + cr * 2.5, h + 0.5, z - 16);
wndBox(1, 1, 1.8, st, x - 19 + cr * 2.5, h + 0.5, z + 16);
}
wndRoom({ x0: x + 2, x1: x + 16, z0: z - 10, z1: z + 4, h: 14, floor: wndMat(0x8A7A5A, "floortile"), wall: st, ceil: wndMat(0x6A5A3A, "wood"), inset: 0, name: "The tower hall", doors: { w: [{ at: z - 3, w: 2.4, h: 3.4, frame: dk }] } });
for (var r = 0; r < 4; r++)
wndBox(0.12, 1.4, 2.4, wndMat(0xF0EAE0, "marble"), x + 15.7, 2.2, z - 8 + r * 3.2);
wndPlaque("mau-castle", "Stones of the Mausoleum", "The Knights of St John built this castle from 1404 and strengthened it from 1494 with stones from the Mausoleum. Carved slabs of its frieze were set into these walls; Newton's friends had some sent to London in 1846. The castle is a museum of underwater archaeology today.", 2.6, 1.7, x + 9, 2.2, z + 3.6, Math.PI);
wndSign(["THE CASTLE OF ST PETER", "the Knights of St John · from 1404"], 6, 1.2, "#3A2A1A", "#F4E8C0", x - 21.2, 5, z + 4, -Math.PI / 2);
},
function () {
var S = wndSiteBegin("colossus"), lite = WND.lite, C = WND_COL3;
var marble = wndMat(0xF2EEE6, "marble", { phong: 40 }), stone = wndMat(0xD8CCB4, "stone"), pave = wndMat(0xD8CCB0, "paving");
wndAlways("colossus");
wndBox(24, 1.2, 120, stone, -100, 0.6, 0);
wndFloor(-112, -60, -88, 60, 1.2);
wndRamp(-88, -60, -83, 60, "x", -83, 0, -88, 1.2);
var Lw = WND.K.lists.colossus;
if (Lw)
Lw.water.forEach(function (W) { W.not = [[S.A.x - 112, S.A.z - 60, S.A.x - 88, S.A.z + 60]]; });
wndBronzeWorks(40, -40);
wndThenNow("colossus", C.x + 46, -12, Math.PI / 2, [["then", "Then: standing, about 280 to 226 BC"], ["fallen", "After the earthquake: lying broken, 226 BC to AD 653"], ["now", "Now: Mandraki harbour today"]]);
wndGuide("chares", C.x + 48, 8, Math.PI / 2);
wndLearnStand("colossus", C.x + 46, 14, Math.PI / 2);
wndSign(["THE COLOSSUS OF RHODES", "Helios, the sun god · finished 280 BC"], 8, 1.4, "#8A4A1A", "#FFF0C8", C.x + 52, 2.2, 0, Math.PI / 2);
wndThen("colossus");
wndColBase();
wndColStatue(false);
wndActSpot("colossus", "build", C.x + 10, C.z - 10, "How Chares built it", "build it stage by stage", function () { wndColBuildCard(); });
wndExtraL("colossus", "fallen");
wndColBase();
wndColFallen();
wndGuide("pliny", C.x + 16, C.z + 14, Math.PI);
wndNowL("colossus");
[[-108, -24], [-108, 24]].forEach(function (p, i) {
wndColumn(p[0], 1.2, p[1], 8, 0.8, "doric", marble);
var d = wndGroup(p[0], 10, p[1], i ? Math.PI : 0);
var b = wndMat(0x6A4A2A, "metal", { phong: 60 });
wndBox(0.8, 0.9, 1.8, b, 0, 0.6, 0, d);
wndBox(0.5, 0.9, 0.5, b, 0, 1.4, 0.9, d);
for (var l = 0; l < 4; l++)
wndBox(0.14, 0.8, 0.14, b, (l % 2 ? 0.25 : -0.25), -0.2, (l < 2 ? 0.6 : -0.6), d);
wndBox(0.6, 0.5, 0.05, b, 0, 2.1, 1.0, d);
});
wndPlaque("col-now", "Mandraki harbour today", "Nothing of the Colossus has ever been found. These two columns with their bronze deer stand at the harbour mouth, where people once imagined the Colossus straddling the water. Where it really stood is argued: by the harbour, or high in the city by the temple of Helios.", 3, 2, -86, 2.2, -30, Math.PI / 2);
WND.onView.colossus = function (v) { if (v !== "then")
wndColStage(-1); };
},
function () {
var C = WND_COL3, br = wndColBronze(), g = wndGroup(C.x, C.base, C.z, Math.PI / 2), sc = C.h / 1.78;
g.userData.keep = 1;
var old = function (P) {
var f = null;
try {
if (typeof wPerson === "function")
f = wPerson("wnd_helios", { sex: "m", look: { sex: "m", hairStyle: "curly" } });
}
catch (e) {
f = null;
}
if (f) {
f.traverse(function (o) { if (o.isMesh) {
o.material = br;
o.castShadow = false;
} });
f.scale.setScalar(sc);
P.add(f);
}
else {
wndCyl(2.4, C.h * 0.5, br, 0, C.h * 0.25, 0, P, 12, 2.0);
wndCyl(3.4, C.h * 0.35, br, 0, C.h * 0.65, 0, P, 12, 2.8);
wndSph(2.2, br, 0, C.h * 0.9, 0, P, 12);
}
};
var cb = wscMat("bronze").clone();
wndSculpt(g, 0, 0, 0, 0, { key: "helios", sex: "m", hair: ["parted"], clip: "Idle_Loop", t: 0.6, h: C.h, skin: cb, hairMat: cb, pose: { upperarm_r: [0, 0, -2.6], lowerarm_r: [0, 0, -0.3] },
drapes: [{ axis: "y", a0: 1.0, a1: 0.8, parts: [0, 3], off: 0.025, folds: 0.012, k: 13, n: 8, round: 0.7, mat: cb },
],
props: function (B, at) {
var hr = at.hand_r, hd = at.Head, gm = wscMat("gold"), bm = cb;
var cl = wscCloth(at.lowerarm_l, at.hand_l, 0.012, { folds: 0.03, k: 9, flare: 0.12, out: 0.05 });
if (cl)
B.add(new THREE.Mesh(cl, bm));
var tc = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.4, 10), bm);
tc.position.set(hr.x, hr.y + 0.12, hr.z);
B.add(tc);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 10), gm);
fl.position.set(hr.x, hr.y + 0.4, hr.z);
B.add(fl);
for (var r = 0; r < 9; r++) {
var a = -Math.PI * 0.75 + r * Math.PI * 1.5 / 8, ray = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.16, 5), gm);
ray.position.set(hd.x + Math.sin(a) * 0.11, hd.y + 0.17, hd.z + Math.cos(a) * 0.11);
ray.rotation.x = Math.cos(a) * 0.5;
ray.rotation.z = -Math.sin(a) * 0.5;
B.add(ray);
}
},
done: function (G2, B) { C.carved = B; if (C.stage >= 0)
wndColStage(C.stage); },
fallback: old });
C.statue = g;
C.mats = [br];
wndPlaque("col-pose", "A careful guess", "No picture made while it stood survives. Coins of Rhodes show Helios' head with a crown of sun rays; his pose here (standing, a cloak on a support beside him, as big bronzes needed) is a guess. Whether he held up a torch, shaded his eyes or held a bow, nobody knows.", 3, 2, C.x + 7.2, 2.6, C.z, Math.PI / 2);
return g;
},
function () {
var C = WND_COL3, f = {}, b = "<div style='margin:4px 0'>Chares took twelve years. The account credited to Philo says: an iron frame and stone blocks inside, bronze plates cast and fixed in courses, and a mound of earth heaped round the statue as it rose, so the workers were always standing on the ground. At the end the mound was dug away.</div>";
for (var s = 1; s <= 7; s++)
(function (s) { b += worldBtn("st" + s, (C.stage === s ? "➤ " : "") + "Stage " + s + " of 7" + (s === 1 ? ": the feet and ankles" : s === 3 ? ": up to the waist" : s === 5 ? ": the shoulders" : s === 7 ? ": the head and crown" : ""), ""); f["st" + s] = function () { wndColStage(s); wndColBuildCard(); }; })(s);
b += worldBtn("done", "Dig the mound away: finished, 280 BC", "");
f.done = function () { wndColStage(-1); wndDid("colossus", "build"); wndColBuildCard(); };
b += worldBtn("quake", "The earthquake of about 226 BC", "see it fallen (slowly, nothing flashes)");
f.quake = function () { worldCard(null); wndColQuake(); };
worldCard(worldFacts("Building the Colossus", "the method in the old account", [["Bronze", "500 talents (about 15 tonnes)"], ["Iron", "300 talents (about 9 tonnes)"], ["Years", "12 (about 292 to 280 BC)"]], [], b), f);
},
function (s) {
var C = WND_COL3;
if (!C.statue)
return;
C.stage = s;
try {
if (typeof renderer !== "undefined" && renderer)
renderer.localClippingEnabled = true;
}
catch (e) { }
if (!C.clip)
C.clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
var lvl = C.base + C.h * s / 7;
C.statue.traverse(function (o) { if (o.isMesh && o.material) {
if (s < 0) {
o.material.clippingPlanes = null;
}
else {
o.material.clippingPlanes = [C.clip];
}
o.material.needsUpdate = true;
} });
C.clip.constant = lvl;
if (s < 0) {
if (C.mound)
C.mound.visible = false;
return;
}
if (!C.mound) {
var keep = WNK.F, kv = WNK.v;
wndThen("colossus");
var m = new THREE.Mesh(new THREE.ConeGeometry(1, 1, WND.lite ? 12 : 24, 1, true), wndMat(0xA88A5A, "earth", { ds: 1 }));
WNK.F.add(m);
C.mound = m;
WNK.F = keep;
WNK.v = kv;
}
var h = lvl, r = Math.max(10, h * 1.35);
C.mound.visible = true;
C.mound.scale.set(r, h, r);
C.mound.position.set(C.x, h / 2 - 0.2, C.z);
wndSay("🏗️ <b>Stage " + s + " of 7.</b> The mound is " + Math.round(lvl) + " m high. Workers haul bronze plates up its slope and fix them to the iron frame.");
},
function (dt) {
var C = WND_COL3;
if (!C.quake)
return;
C.quake -= dt;
var V = WND.vgroups.colossus;
if (V && V.then)
V.then.position.x = Math.sin(C.quake * 9) * 0.06;
if (C.quake <= 0) {
C.quake = 0;
if (V && V.then)
V.then.position.x = 0;
wndColStage(-1);
wndSetView("colossus", "fallen");
wndDid("colossus", "quake");
wndSay("🗿 <b>The Colossus lies where it fell.</b> An oracle told the Rhodians not to raise it again. Walk into its broken limbs: Pliny says you could see great caverns inside, and the stones used to steady it.");
}
},
function () {
var C = WND_COL3, br = wndColBronze(), brIn = wndMat(0x5A3A1A, "metal", { ds: 1 }), iron = wndMat(0x3A3A3A, "metal"), stone = wndMat(0xA89878, "stone"), lite = WND.lite;
[-1.6, 1.6].forEach(function (o) { wndCyl(1.4, 6, br, C.x, C.base + 3, C.z + o, null, 12, 1.1); wndCyl(1.6, 0.4, br, C.x, C.base + 6, C.z + o, null, 12); });
function piece(x, z, r, len, ry, name) {
var g = wndGroup(x, r, z, ry), outer = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.92, len, lite ? 12 : 22, 1, true), br);
outer.rotation.z = Math.PI / 2;
g.add(outer);
var inner = new THREE.Mesh(new THREE.CylinderGeometry(r - 0.25, r * 0.92 - 0.25, len, lite ? 12 : 22, 1, true), brIn);
inner.rotation.z = Math.PI / 2;
g.add(inner);
for (var i = 0; i < Math.floor(len / 2.4); i++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(r - 0.35, 0.08, 4, lite ? 10 : 16), iron);
ring.rotation.y = Math.PI / 2;
ring.position.x = -len / 2 + 1.2 + i * 2.4;
g.add(ring);
}
if (r > 2)
for (var s = 0; s < (lite ? 3 : 6); s++)
wndBox(1.2, 0.9, 1.0, stone, -len / 2 + 2 + s * (len - 4) / 6, -r + 0.75, ((s * 7) % 3 - 1) * 0.6, g);
var c = Math.cos(ry), sn = Math.sin(ry);
if (r > 2.2) {
wndFloor(x - len / 2 * Math.abs(c) - r * Math.abs(sn), z - len / 2 * Math.abs(sn) - r * Math.abs(c), x + len / 2 * Math.abs(c) + r * Math.abs(sn), z + len / 2 * Math.abs(sn) + r * Math.abs(c), 0.3);
[-1, 1].forEach(function (sd) { wndSolid(x + sn * sd * (r - 0.1), z + c * sd * (r - 0.1), len / 2, 0.2, 0, r * 1.6, ry); });
wndArea(x - len / 2, z - r, x + len / 2, z + r, -0.5, r * 2, name);
}
else
wndSolid(x, z, len / 2, r, 0, r * 2, ry);
return g;
}
piece(C.x + 16, C.z - 4, 3.6, 12, 0.15, "Inside the fallen Colossus: the body");
piece(C.x + 7, C.z + 5, 1.7, 10, -0.4, "the thigh");
piece(C.x + 26, C.z + 7, 1.3, 9, 0.9, "an arm");
var hd = wndSph(2.6, br, C.x + 28, 2.4, C.z - 6, null, lite ? 10 : 16);
wndRound(C.x + 28, C.z - 6, 2.6, 0, 5);
for (var r = 0; r < 7; r++) {
var ray = new THREE.Mesh(new THREE.ConeGeometry(0.28, 2.6, 5), wndMat(0xC8A050, "metal"));
ray.position.set(C.x + 28 + Math.cos(r) * 2.6, 2.4 + Math.sin(r) * 2.6, C.z - 6 - 1);
ray.rotation.z = r - Math.PI / 2;
WNK.F.add(ray);
}
var hg = wndGroup(C.x + 36, 0, C.z + 14, 0.5);
wndBox(3.2, 1.6, 4, br, 0, 0.8, 0, hg);
for (var fg = 0; fg < 4; fg++)
wndCyl(0.55, 3.4, br, -1.2 + fg * 0.8, 0.6, -3.4, hg, 8).rotation.x = Math.PI / 2;
var th = wndCyl(0.75, 3, br, 2.2, 0.8, -0.6, hg, 10);
th.rotation.z = 1.2;
wndSolid(C.x + 36, C.z + 14, 3, 3.4, 0, 2);
wndActSpot("colossus", "thumb", C.x + 33, C.z + 16, "The Colossus' thumb", "try to hug it", function () { wndSay("🤗 <b>You stretch your arms round the thumb…</b> and your hands do not meet. Pliny wrote just that: few people could clasp their arms round it, and the fingers were bigger than most statues."); });
wndPlaque("col-fall", "As Pliny saw it", "'Even lying on the ground it is a marvel,' Pliny wrote about AD 77. Through the breaks you could see great caverns inside, and the big stones the builders had used to weigh it down and keep it steady.", 3, 2, C.x + 14, 1.6, C.z + 12, Math.PI);
},
function (x, z) {
var st = wndMat(0xC8B490, "stone"), wd = wndMat(0x6A4A2A, "wood"), br = wndColBronze(), clay = wndMat(0xA8643A, null), lite = WND.lite;
wndRoom({ x0: x - 14, x1: x + 14, z0: z - 10, z1: z + 10, h: 9, floor: wndMat(0x5A4A3A, "earth"), wall: st, ceil: wndMat(0x5A4A3A, "wood"), inset: 0, name: "The bronze-works", doors: { w: [{ at: z, w: 4, h: 4.5, frame: wd }], s: [{ at: x, w: 4, h: 4.5, frame: wd }] } });
[[x + 8, z - 5], [x + 8, z + 5]].forEach(function (p) { wndCyl(1.4, 2.6, wndMat(0x7A4A2A, "brick"), p[0], 1.3, p[1], null, 10, 1.0); wndFlame(p[0], 2.6, p[1], 3.4, 0xFF8A30); wndRound(p[0], p[1], 1.5, 0, 3); });
wndBox(6, 0.2, 6, wndMat(0x2A1E14, null), x, 0.02, z);
wndBox(3.2, 2.6, 1.6, clay, x, 1.3, z);
wndSolid(x, z, 1.8, 1, 0, 2.6);
for (var i = 0; i < (lite ? 4 : 8); i++) {
var pl = wndBox(2.4, 1.6, 0.12, br, x - 11, 0.8 + 0.02 * i, z - 7 + i * 1.8);
pl.rotation.z = 0.2;
}
[[x - 6, z - 7], [x - 6, z + 7]].forEach(function (p) { wndBox(4, 0.9, 1.4, wd, p[0], 0.45, p[1]); wndSolid(p[0], p[1], 2, 0.7, 0, 1); for (var k = 0; k < 4; k++)
wndBox(0.5, 0.3, 0.4, clay, p[0] - 1.4 + k * 0.9, 1.05, p[1]); });
for (var lx = x - 8; lx <= x + 8; lx += 8)
wndLamp(lx, 7.6, z, 0xFFC890, 4);
wndPlaque("col-works", "The bronze-works", "Bronze was poured from furnaces into clay moulds, piece by piece, and the pieces fixed to the iron frame. The Colossus was not cast in one: nothing so large could be. Rhodes paid for it by selling the siege engines Demetrius left behind in 304 BC.", 2.6, 1.7, x, 2.4, z + 9.6, Math.PI);
},
function () {
var S = wndSiteBegin("pharos"), lite = WND.lite, P = WND_PH, ix = P.ix, iz = P.iz, iy = P.iy;
var lime = wndMat(0xF0E8D8, "marble", { phong: 30 }), stone = wndMat(0xD8CCB4, "stone"), rock = wndMat(0xB8A888, "stone"), gold = wndMat(0xD8A838, "metal", { phong: 90 });
wndAlways("pharos");
var sea = wndMat(0x2A6AA8, null, { phong: 80, spec: 0x88AACC });
wndFlat(300, 680, sea, -190, 0.03, 0);
wndBox(96, iy + 0.6, 96, rock, ix, (iy - 0.6) / 2, iz);
wndFloor(ix - 48, iz - 48, ix + 48, iz + 48, iy);
wndBox(30, 0.3, 30, wndMat(0xE0D4B0, "sand"), -25, -0.1, 0);
WND.blockers.pharos = function (lx, lz, feet) {
if (lx >= -40 || lx < -340 || Math.abs(lz) > 340)
return false;
if (lx >= ix - 48 && lx <= ix + 48 && Math.abs(lz - iz) <= 48)
return false;
if (lx >= ix + 48 && lx < -40 && Math.abs(lz) <= (wndView("pharos") === "now" ? 22 : 5.5))
return false;
return true;
};
wndThen("pharos");
wndBox(78, 1.0, 11, stone, (ix + 48 - 40) / 2, 0.5, 0);
wndFloor(ix + 48, -5.5, -40, 5.5, 1.0);
for (var a = 0; a < (lite ? 6 : 12); a++)
wndBox(1.2, 2.6, 11, stone, ix + 52 + a * 6.4, -0.4, 0);
wndGuide("strabo", -60, 3.6, -Math.PI / 2, { y: 1.0 });
var ew = wndMat(0xE4DCCA, "stone");
wndRoom({ x0: ix - 42, x1: ix + 42, z0: iz - 42, z1: iz + 42, y: iy, h: 8, floor: null, wall: ew, ceil: null, t: 1.4, inset: 0, name: "The court of the lighthouse", doors: { e: [{ at: iz, w: 6, h: 6, frame: gold }] } });
[[-42, -42], [42, -42], [-42, 42], [42, 42]].forEach(function (c) { wndCyl(3.2, 11, ew, ix + c[0], iy + 5.5, iz + c[1], null, lite ? 10 : 16); wndRound(ix + c[0], iz + c[1], 3.2, 0, 13); });
wndPharosTower();
wndThenNow("pharos", -30, -10, Math.PI / 2);
wndLearnStand("pharos", -30, 10, Math.PI / 2);
wndSign(["THE LIGHTHOUSE OF ALEXANDRIA", "on the island of Pharos · about 280 BC"], 8, 1.4, "#1E4A6A", "#F4E8C0", -22, 2.2, 0, Math.PI / 2);
for (var p = 0; p < (lite ? 6 : 14); p++)
wndTree("palm", -15 + ((p * 7) % 20), 0, -120 + p * 17, 1);
wndShip(-90, -50, 0.2);
wndShip(-110, 60, -0.5);
var c0 = alxColMark();
try {
wndAlexLibrary();
}
catch (e) {
if (window.console)
console.warn("[wonders] library", e);
}
alxColTake(c0);
try {
wndAlexGrow();
}
catch (e) {
if (window.console)
console.warn("[wonders] alexandria", e);
}
wndThen("pharos");
wndNowL("pharos");
wndBox(78, 1.0, 44, wndMat(0xC8BC9A, "earth"), (ix + 48 - 40) / 2, 0.5, 0);
wndFloor(ix + 48, -22, -40, 22, 1.0);
wndBox(78, 0.1, 8, wndMat(0x5A5A5E, "asphalt"), (ix + 48 - 40) / 2, 1.05, 0);
wndQaitbay(ix, iz, iy);
wndPlaque("ph-now", "The site today", "The causeway silted up long ago, joining Pharos to the city. On the lighthouse's foundations stands the citadel of Sultan Qaitbay (1477-80), built partly of its fallen stone. Since 1994 divers have mapped thousands of blocks, columns and statues on the harbour floor beside it.", 3, 2, -50, 2.4, -12, Math.PI / 2);
},
function () {
var P = WND_PH, ix = P.ix, iz = P.iz, iy = P.iy, lite = WND.lite, lime = wndMat(0xF0E8D8, "marble", { phong: 30 }), inner = wndMat(0xD8CCB0, "stone"), gold = wndMat(0xD8A838, "metal", { phong: 90 }), dark = wndMat(0x2A1E14, null);
var y0 = iy + 4, t1 = P.t1, top1 = y0 + t1, rise = 3.75;
wndBox(36, 4, 36, lime, ix, iy + 2, iz);
wndSolid(ix, iz, 18, 18, iy, 4);
wndFloor(ix - 18, iz - 18, ix + 18, iz + 18, y0);
wndRamp(ix + 18, iz - 3, ix + 26, iz + 3, "x", ix + 26, iy, ix + 18, y0);
var sg = wndGroup(ix + 22, iy + 2, iz, 0);
wndBox(8.9, 0.3, 6, lime, 0, 0, 0, sg);
sg.rotation.z = Math.atan2(4, 8);
function zwall(x, za, zb, yb, h, t, mat, d0, d1, dh) {
if (d0 === undefined) {
wndBox(t, h, zb - za, mat, x, yb + h / 2, (za + zb) / 2);
wndSolid(x, (za + zb) / 2, t / 2, (zb - za) / 2, yb, h);
return;
}
wndBox(t, h, d0 - za, mat, x, yb + h / 2, (za + d0) / 2);
wndSolid(x, (za + d0) / 2, t / 2, (d0 - za) / 2, yb, h);
wndBox(t, h, zb - d1, mat, x, yb + h / 2, (d1 + zb) / 2);
wndSolid(x, (d1 + zb) / 2, t / 2, (zb - d1) / 2, yb, h);
wndBox(t, h - dh, d1 - d0, mat, x, yb + dh + (h - dh) / 2, (d0 + d1) / 2);
}
var n = lite ? 6 : 12;
for (var k = 0; k < n; k++) {
var w = 30 - k * 0.25, h = t1 / n, yy = y0 + k * h;
[-1, 1].forEach(function (sd) { wndBox(w, h, 1.2, lime, ix, yy + h / 2, iz + sd * (w / 2 - 0.6)); });
wndBox(1.2, h, w - 2.4, lime, ix - (w / 2 - 0.6), yy + h / 2, iz);
if (k === 0)
zwall(ix + (w / 2 - 0.6), iz - (w / 2 - 1.2), iz + (w / 2 - 1.2), yy, h, 1.2, lime, iz + 6, iz + 9, 3.4);
else
wndBox(1.2, h, w - 2.4, lime, ix + (w / 2 - 0.6), yy + h / 2, iz);
if (k % 2 === 1)
[-1, 1].forEach(function (sd) { wndBox(1.4, 1.8, 1.3, wndMat(0x1A2A3A, null), ix + sd * (w / 2 - 0.55), yy + h / 2, iz - 6); wndBox(1.4, 1.8, 1.3, wndMat(0x1A2A3A, null), ix - 6, yy + h / 2, iz + sd * (w / 2 - 0.55)); });
}
wndSolid(ix, iz - 14.4, 15, 0.6, y0, t1);
wndSolid(ix, iz + 14.4, 15, 0.6, y0, t1);
wndSolid(ix - 14.4, iz, 0.6, 15, y0, t1);
wndSolid(ix + 14.4, iz - 4.5, 0.6, 10.5, y0, t1);
wndSolid(ix + 14.4, iz + 12, 0.6, 3, y0, t1);
wndSolid(ix + 14.4, iz + 7.5, 0.6, 1.5, y0 + 3.4, t1);
wndBox(10, t1, 10, inner, ix, y0 + t1 / 2, iz);
wndSolid(ix, iz, 5, 5, y0, t1 + 0.5);
var rm = wndMat(0xC8BCA0, "stone");
[-1, 1].forEach(function (sd) { wndBox(20.4, t1, 0.4, rm, ix, y0 + t1 / 2, iz + sd * 10.2); wndSolid(ix, iz + sd * 10.2, 10.2, 0.2, y0, t1); });
zwall(ix - 10.2, iz - 10, iz + 10, y0, t1, 0.4, rm);
zwall(ix + 10.2, iz - 10, iz + 10, y0, t1, 0.4, rm, iz + 5.6, iz + 9.4, 3.4);
wndBox(5, 0.2, 3.8, inner, ix + 12.5, y0 - 0.1, iz + 7.5);
[-1, 1].forEach(function (sd) { wndBox(4, 3.6, 0.3, rm, ix + 12.3, y0 + 1.8, iz + 7.5 + sd * 1.9); wndSolid(ix + 12.3, iz + 7.5 + sd * 1.9, 2, 0.15, y0, 3.6); });
wndBox(4, 0.3, 4.1, rm, ix + 12.3, y0 + 3.6, iz + 7.5);
wndArea(ix + 10, iz + 5.6, ix + 15, iz + 9.4, y0 - 0.5, 4, "The door of the lighthouse");
var ramp = wndMat(0xC8B898, "stone");
for (var r = 0; r < 16; r++) {
var side = r % 4, ya = y0 + r * rise, yb = ya + rise, X0, X1, Z0, Z1, ax, a0, a1, lxc, lzc;
if (side === 0) {
X0 = ix + 5;
X1 = ix + 10;
Z0 = iz - 5;
Z1 = iz + 5;
ax = "z";
a0 = iz + 5;
a1 = iz - 5;
lxc = ix + 7.5;
lzc = iz - 7.5;
}
else if (side === 1) {
X0 = ix - 5;
X1 = ix + 5;
Z0 = iz - 10;
Z1 = iz - 5;
ax = "x";
a0 = ix + 5;
a1 = ix - 5;
lxc = ix - 7.5;
lzc = iz - 7.5;
}
else if (side === 2) {
X0 = ix - 10;
X1 = ix - 5;
Z0 = iz - 5;
Z1 = iz + 5;
ax = "z";
a0 = iz - 5;
a1 = iz + 5;
lxc = ix - 7.5;
lzc = iz + 7.5;
}
else {
X0 = ix - 5;
X1 = ix + 5;
Z0 = iz + 5;
Z1 = iz + 10;
ax = "x";
a0 = ix - 5;
a1 = ix + 5;
lxc = ix + 7.5;
lzc = iz + 7.5;
}
wndRamp(X0, Z0, X1, Z1, ax, a0, ya, a1, yb);
var cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2, L = 10, g = wndGroup(ax === "z" ? cx : (a0 + a1) / 2, (ya + yb) / 2 - 0.2, ax === "z" ? (a0 + a1) / 2 : cz, 0), sl = Math.atan2(rise, L);
wndBox(ax === "z" ? 5 : L + 0.4, 0.4, ax === "z" ? L + 0.4 : 5, ramp, 0, 0, 0, g);
if (ax === "z")
g.rotation.x = (a1 > a0 ? -1 : 1) * sl;
else
g.rotation.z = (a1 > a0 ? 1 : -1) * sl;
{
wndBox(5, 0.4, 5, ramp, lxc, yb - 0.2, lzc);
wndFloor(lxc - 2.5, lzc - 2.5, lxc + 2.5, lzc + 2.5, yb);
}
if (r % 2 === 0)
wndLamp(cx, ya + 2.6, cz, 0xFFD8A0, 2.6);
wndArea(X0, Z0, X1, Z1, ya - 0.5, rise + 3, "The ramp, turn " + (1 + Math.floor(r / 4)) + " of 4 (" + Math.round(ya - y0) + " m up)");
}
wndPlaque("ph-ramp", "The ramp", "Visitors in the Middle Ages wrote that a broad ramp climbed inside the lighthouse, round a central shaft, wide enough for loaded donkeys: that is how the fuel for the fire reached the top. Rooms opened off it on every side.", 2.4, 1.6, ix + 9.95, y0 + 2.2, iz - 2, -Math.PI / 2);
var ty = top1;
[[-15, 15, -15, 5], [-15, -2, 5, 15], [10, 15, 5, 15], [-2, 10, 10, 15]].forEach(function (q) { wndBox(q[1] - q[0], 0.6, q[3] - q[2], lime, ix + (q[0] + q[1]) / 2, ty - 0.3, iz + (q[2] + q[3]) / 2); wndFloor(ix + q[0], iz + q[2], ix + q[1], iz + q[3], ty); });
[-1, 1].forEach(function (sd) { wndBox(30, 1.1, 0.5, lime, ix, ty + 0.55, iz + sd * 14.75); wndSolid(ix, iz + sd * 14.75, 15, 0.25, ty, 1.1); wndBox(0.5, 1.1, 30, lime, ix + sd * 14.75, ty + 0.55, iz); wndSolid(ix + sd * 14.75, iz, 0.25, 15, ty, 1.1); });
wndBox(0.3, 1, 5, lime, ix - 2.15, ty + 0.5, iz + 7.5);
wndSolid(ix - 2.15, iz + 7.5, 0.15, 2.5, ty, 1);
wndArea(ix - 15, iz - 15, ix + 15, iz + 15, ty - 0.5, 4, "The first terrace, 60 m up");
[[-13, -13], [13, -13], [-13, 13], [13, 13]].forEach(function (c, i) {
wndSculpt(null, ix + c[0], ty, iz + c[1], Math.atan2(c[0], c[1]), { key: "triton", sex: "m", hair: ["beard", "parted"], clip: "Idle_Talking_Loop", t: 0.3, h: 4.2, skin: "bronze",
drapes: [{ axis: "y", a0: 1.0, a1: 0.03, parts: [0, 3], off: 0.03, folds: 0.012, flare: 0.03, k: 23, k2: 31, n: 22, round: 0.75, mat: "bronze" }],
props: function (B, at) { var hr = at.hand_r, sh = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.32, 10), wscMat("gold")); sh.position.set(hr.x, hr.y + 0.08, hr.z + 0.12); sh.rotation.x = -1.1; B.add(sh); } });
});
var oy = ty, oh = P.t2, ap = 9.24, fw = 7.65, om = wndMat(0xF0E8D8, "marble");
for (var f8 = 0; f8 < 8; f8++) {
var a8 = (f8 + 0.5) * Math.PI / 4 - Math.PI / 8, fx8 = ix + Math.cos(a8) * ap, fz8 = iz + Math.sin(a8) * ap, gF = wndGroup(fx8, oy, fz8, -a8);
if (f8 === 0) {
wndBox(0.8, oh, 2.8, om, 0, oh / 2, -2.42, gF);
wndBox(0.8, oh, 2.8, om, 0, oh / 2, 2.42, gF);
wndBox(0.8, oh - 3, 2.05, om, 0, 3 + (oh - 3) / 2, 0, gF);
}
else
wndBox(0.8, oh, fw, om, 0, oh / 2, 0, gF);
if (f8 !== 0)
wndSolid(fx8, fz8, 0.4, fw / 2, oy, oh, -a8);
else {
wndSolid(fx8 - Math.sin(a8) * 2.42, fz8 + Math.cos(a8) * 2.42, 0.4, 1.4, oy, oh, -a8);
wndSolid(fx8 + Math.sin(a8) * 2.42, fz8 - Math.cos(a8) * 2.42, 0.4, 1.4, oy, oh, -a8);
}
}
wndSolid(ix, iz, 0.15, 5, oy, oh);
wndBox(0.3, oh, 10, inner, ix, oy + oh / 2, iz);
for (var fl = 0; fl < 6; fl++) {
var fy = oy + fl * 5, fx = fl % 2 ? ix + 3.5 : ix - 3.5, z0 = fl % 2 ? iz + 5 : iz - 5, z1 = fl % 2 ? iz - 5 : iz + 5;
wndRamp(fx - 1.5, Math.min(z0, z1), fx + 1.5, Math.max(z0, z1), "z", z0, fy, z1, fy + 5);
var g2 = wndGroup(fx, fy + 2.5, iz, 0);
wndBox(3, 0.3, 11.2, inner, 0, 0, 0, g2);
g2.rotation.x = (z1 > z0 ? -1 : 1) * Math.atan2(5, 10);
if (fl < 5) {
wndFloor(ix - 5, fl % 2 ? iz - 7.5 : iz + 5, ix + 5, fl % 2 ? iz - 5 : iz + 7.5, fy + 5);
wndBox(10, 0.3, 2.5, inner, ix, fy + 4.85, fl % 2 ? iz - 6.25 : iz + 6.25);
}
wndLamp(fx, fy + 3.4, iz, 0xFFD8A0, 2.2);
}
wndArea(ix - 9, iz - 9, ix + 9, iz + 9, oy - 0.5, oh, "The octagon");
var ly = oy + oh;
[[-11, 11, -11, -6], [-11, 2, -6, 11], [5, 11, -6, 11], [2, 5, 1.5, 11]].forEach(function (q) { wndBox(q[1] - q[0], 0.6, q[3] - q[2], lime, ix + (q[0] + q[1]) / 2, ly - 0.3, iz + (q[2] + q[3]) / 2); wndFloor(ix + q[0], iz + q[2], ix + q[1], iz + q[3], ly); });
wndFloor(ix + 2, iz - 7.5, ix + 5, iz - 6, ly);
[-1, 1].forEach(function (sd) { wndBox(22, 1.1, 0.4, lime, ix, ly + 0.55, iz + sd * 10.8); wndSolid(ix, iz + sd * 10.8, 11, 0.2, ly, 1.1); wndBox(0.4, 1.1, 22, lime, ix + sd * 10.8, ly + 0.55, iz); wndSolid(ix + sd * 10.8, iz, 0.2, 11, ly, 1.1); });
for (var c = 0; c < 8; c++) {
var a3 = c / 8 * Math.PI * 2 + Math.PI / 8;
wndColumn(ix + Math.cos(a3) * 7.5, ly, iz + Math.sin(a3) * 7.5, 8, 0.4, "ionic", lime);
}
var dome = new THREE.Mesh(new THREE.SphereGeometry(8.4, lite ? 12 : 24, lite ? 6 : 12, 0, Math.PI * 2, 0, Math.PI / 2), lime);
dome.position.set(ix, ly + 8, iz);
wndP().add(dome);
wndBox(17, 0.6, 17, lime, ix, ly + 7.9, iz);
wndCyl(1.8, 1.2, wndMat(0x4A3A2A, "metal"), ix, ly + 0.6, iz, null, 12, 1.2);
wndRound(ix, iz, 2, ly, 2);
P.fire = wndFlame(ix, ly + 1.2, iz, 9, 0xFF9A40);
P.fire.g.visible = false;
var mir = wndGroup(ix - 3.4, ly + 3, iz, 0);
mir.userData.keep = 1;
wndCyl(1.6, 0.12, wndMat(0xE8D8A8, "metal", { phong: 120, spec: 0xFFFFFF }), 0, 0, 0, mir, lite ? 12 : 24).rotation.z = Math.PI / 2;
wndBox(0.2, 3, 0.2, wndMat(0x4A3A2A, "metal"), 0, -1.5, 0, mir);
P.mirror = mir;
wndRound(ix - 3.4, iz, 0.6, ly, 4);
wndSculpt(null, ix, ly + 16.4, iz, Math.PI / 2, { key: "zeus-soter", sex: "m", hair: ["beard", "parted"], clip: "Idle_Loop", t: 0.6, h: 6.5, skin: "gold", pose: { upperarm_r: [0, 0, -2.5] },
drapes: [{ axis: "y", a0: 1.05, a1: 0.04, parts: [0, 3], off: 0.03, folds: 0.016, flare: 0.06, k: 11, n: 22, round: 0.6, mat: "gold" }],
props: function (B, at) { var hr = at.hand_r, sc = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.018, 1.9, 8), wscMat("gold")); sc.position.set(hr.x, hr.y - 0.35, hr.z); B.add(sc); },
fallback: function (P) { var z2 = wndPersonFig("ph_zeus", 0, 0, 0, 0, { top: 0xD8A838, bottom: 0xD8A838, skin: 0xD8A838, hair: 0xD8A838, shoes: 0xD8A838 }); z2.scale.setScalar(3.2); z2.traverse(function (o) { if (o.isMesh)
o.material = gold; }); P.add(z2); } });
wndArea(ix - 11, iz - 11, ix + 11, iz + 11, ly - 0.5, 10, "The lantern, about 95 m up");
wndActSpot("pharos", "beacon", ix + 3.4, iz + 3, "The fire bowl", "light the beacon", function () { wndBeacon(); }, { y: ly });
wndGuide("sostratus", ix + 24, iz + 5, -Math.PI / 2, { y: iy });
wndPlaque("ph-ded", "The dedication", "Strabo read it on the tower: 'Sostratus of Cnidus, son of Dexiphanes, to the Saviour Gods, on behalf of those who sail the seas.' Lucian tells a tale that Sostratus carved his own name in the stone and covered it with plaster bearing the king's, which in time fell away.", 3, 2, ix + 18.1, iy + 2.4, iz - 6, Math.PI / 2);
},
function () {
var P = WND_PH;
P.lit = !P.lit;
if (P.fire)
P.fire.g.visible = !!P.lit;
if (P.lit) {
wndDid("pharos", "beacon");
wndSay("🔥 <b>The beacon burns.</b> Ships far out at sea could see it, writers said, from many miles away. By day, some say, a great polished mirror flashed the sun: here it only turns slowly. Stories that it could set enemy ships on fire are legends.");
}
else
wndSay("The fire is banked down for the day.");
},
function (ix, iz, iy) {
var st = wndMat(0xD8C8A0, "stone"), dk = wndMat(0x3A2A1A, "wood"), lite = WND.lite;
wndRoom({ x0: ix - 44, x1: ix + 44, z0: iz - 44, z1: iz + 44, y: iy, h: 10, floor: wndMat(0xC8B890, "paving"), wall: st, ceil: null, t: 2, inset: 0, name: "The court of Qaitbay's citadel", doors: { e: [{ at: iz, w: 4, h: 5, frame: dk }] } });
for (var cr = 0; cr < 22; cr++) {
[-44, 44].forEach(function (z2) { wndBox(1.2, 1.2, 2, st, ix - 42 + cr * 4, iy + 10.6, iz + z2); });
}
var kx0 = ix - 15, kx1 = ix + 15, kz0 = iz - 15, kz1 = iz + 15;
wndRoom({ x0: kx0, x1: kx1, z0: kz0, z1: kz1, y: iy, h: 17, floor: wndMat(0xB8A880, "floortile"), wall: st, ceil: wndMat(0x8A7A5A, "wood"), inset: 0, name: "The keep of Sultan Qaitbay", doors: { e: [{ at: iz, w: 3, h: 4.4, frame: dk }] } });
[[kx0, kz0], [kx1, kz0], [kx0, kz1], [kx1, kz1]].forEach(function (c) { wndCyl(4, 19, st, c[0], iy + 9.5, c[1], null, lite ? 10 : 16); wndRound(c[0], c[1], 4, iy, 19); });
for (var c = 0; c < 6; c++)
wndColumn(ix - 8 + (c % 3) * 8, iy, iz + (c < 3 ? -6 : 6), 9, 0.6, "egypt", wndMat(0xE8E0D0, "marble"));
wndBox(4, 5, 0.6, wndMat(0x8A6A3A, "wood"), ix - 14.4, iy + 3, iz).rotation.y = Math.PI / 2;
wndPlaque("ph-keep", "The keep", "Sultan al-Ashraf Qaitbay built this fortress in 1477-80 against attack from the sea, on the lighthouse's very foundations; the granite of its walls includes the lighthouse's own stones. Inside is a small mosque. It is now a maritime museum.", 2.6, 1.7, ix + 14.6, iy + 2.2, iz - 6, -Math.PI / 2);
for (var lx = ix - 8; lx <= ix + 8; lx += 8)
wndLamp(lx, iy + 14, iz, 0xFFE0B0, 4);
},
function () { var l = wndLevel(); return "<div style='margin:8px 0 2px;font-size:12px;opacity:.85'>Reading level: <span data-w='lv_y' style='padding:2px 8px;border-radius:10px;border:1px solid #8FB4E8;" + (l === "y" ? "background:#8FB4E8;color:#0A1428" : "") + "'>Younger readers</span> <span data-w='lv_f' style='padding:2px 8px;border-radius:10px;border:1px solid #8FB4E8;" + (l === "f" ? "background:#8FB4E8;color:#0A1428" : "") + "'>Full lessons</span></div>"; },
function (key, x, z, ry) {
var g = wndGroup(x, 0, z, ry), wd = wndMat(0x23407A, null), col = parseInt(WND_COL[key].slice(1), 16);
wndBox(1.6, 1.1, 0.5, wd, 0, 0.55, 0, g);
var t = wndBox(1.9, 0.08, 0.9, wndMat(col, null), 0, 1.15, 0.1, g);
t.rotation.x = -0.3;
wndPlaque("ls-" + key, "Learn here", wndName(key) + ": five lessons, things to do, the people to talk with, and the quiz for your Wonders Passport.", 1.8, 1.1, 0, 1.9, -0.1, 0, { parent: g, bg: "#23407A", fg: "#FFFFFF", ac: "#F2C848" });
wndRound(x, z, 0.9, 0, 1.3);
wndSpot(x + Math.sin(ry) * 1.4, z + Math.cos(ry) * 1.4, 2.2, "📖 Learn here: " + wndName(key), "open the lessons", function () { wndLessonsCard(key, "history"); });
},
function (key, tab) {
wndBegin(key);
var L = WND_LESSONS[key], lv = wndLevel(), f = {}, b = "", p = wndProg();
b += "<div style='display:flex;flex-wrap:wrap;gap:4px;margin:6px 0'>" + WND_LESSON_KEYS.map(function (k) {
var on = k[0] === tab, rd = p.read[key + "_" + k[0]];
f["t_" + k[0]] = function () { wndLessonsCard(key, k[0]); };
return "<span data-w='t_" + k[0] + "' style='padding:4px 9px;border-radius:12px;font-size:12.5px;border:1px solid " + WND_COL[key] + ";" + (on ? "background:" + WND_COL[key] + ";color:#fff" : "") + "'>" + (rd ? "✓ " : "") + wndEsc(k[1]) + "</span>";
}).join("") + "</div>";
var K = WND_LESSON_KEYS.filter(function (k) { return k[0] === tab; })[0];
b += "<div style='margin:6px 0 2px;font-weight:600'>" + wndEsc(K[1]) + " <span style='opacity:.7;font-weight:400;font-size:12px'>· " + wndEsc(K[2]) + "</span></div>";
b += "<div style='margin:4px 0 6px;line-height:1.5'>" + wndEsc(L[tab][lv]) + "</div>";
b += wndLevelBtn();
wndLevelFns(f, function () { wndLessonsCard(key, tab); });
p.read[key + "_" + tab] = Date.now();
wndProgSave();
var acts = WND_ACTS[key] || [];
if (acts.length)
b += "<div style='margin:10px 0 2px;font-weight:600'>✋ Things to do here</div>" + acts.map(function (a) { return "<div style='margin:2px 0;font-size:13px'>" + (wndDone(key, a[0]) ? "✓ " : "○ ") + wndEsc(a[1]) + "</div>"; }).join("");
var gs = Object.keys(WND_GUIDES).filter(function (g) { return WND_GUIDES[g].site === key; });
if (gs.length)
b += "<div style='margin:10px 0 2px;font-weight:600'>💬 People to talk with</div>" + gs.map(function (g) { var G = WND_GUIDES[g]; return "<div style='margin:2px 0;font-size:13px'>" + wndEsc(G.n) + ", " + wndEsc(G.title.toLowerCase()) + ": walk up and press E</div>"; }).join("");
var u = WND_UNIT[key];
b += worldBtn("quiz", (wndStamped(u) ? "✓ " : "") + "The quiz: ten questions", "get " + wndCfg().pass + " right for your passport stamp" + (wndStamped(u) ? " (stamped already; try again any time)" : ""));
f.quiz = function () { wndQuizOpen(key); };
b += worldBtn("pass", "My Wonders Passport", wndStampCount(7) + " of 7 stamps");
f.pass = function () { wndPassport(); };
var R = WND_SITES.filter(function (s) { return s[0] === key; })[0];
worldCard(worldFacts(R[1], "Then: " + R[2] + " · Now: " + R[3] + " · " + R[4], [], [], b), f);
},
function (i) {
var L = WND_HALL_LESSONS[i], f = {}, b = "<div style='margin:6px 0;line-height:1.5'>" + wndEsc(wndLevel() === "y" ? L.y : L.f) + "</div>" + wndLevelBtn();
wndLevelFns(f, function () { wndHallLesson(i); });
WND_HALL_LESSONS.forEach(function (o, j) { if (j !== i) {
b += worldBtn("h" + j, o.t, "");
f["h" + j] = function () { wndHallLesson(j); };
} });
worldCard(worldFacts(L.t, "the Hall of Wonders", [], [], b), f);
},
function () {
var Q = WND.quiz, key = Q.key, list = wndQuizList(key), f = {}, b = "", pass = wndCfg().pass, u = WND_UNIT[key];
b += "<div style='opacity:.8;font-size:12.5px'>Ten questions. Get " + pass + " right for the stamp. The answers are all in the lessons here" + (key === "later" || key === "natural" ? " and on the models" : "") + ".</div>";
list.forEach(function (q, k) {
b += "<div style='margin:9px 0 3px'><b>" + (k + 1) + ".</b> " + wndEsc(q[0]) + "</div>";
wndQuizOpts(key, k).forEach(function (o, j) {
var on = Q.ans[k] === o, nm = "q" + k + "_" + j, show = Q.done && on, right = o === q[1];
var bd = show ? (right ? "#7AD08A" : "#E07A6A") : on ? "#F2C848" : "rgba(143,180,232,.4)";
b += "<div data-w='" + nm + "' style='margin:2px 0;padding:5px 9px;border-radius:4px;border:1px solid " + bd + ";background:" + (on ? "rgba(242,200,72,.12)" : "transparent") + "'>" + wndEsc(o) + (show ? (right ? " ✓" : " ✗ (the answer: " + wndEsc(q[1]) + ")") : "") + "</div>";
f[nm] = function () { if (Q.done)
return; Q.ans[k] = o; wndQuizCard(); };
});
});
if (!Q.done) {
var n = Object.keys(Q.ans).length;
b += worldBtn("hand", "Hand it in", n + " of 10 answered");
f.hand = function () { wndQuizMark(); };
}
else {
b += "<div style='margin-top:10px;font-size:15px;color:#FFE7B0'><b>" + Q.score + " out of 10.</b> " + (Q.score >= pass ? "🏛️ Stamped in your Wonders Passport!" : "Not quite " + pass + ". Read the lessons again and have another go.") + "</div>";
b += worldBtn("again", "Try again", "");
f.again = function () { WND.quiz = { key: key, ans: {}, done: false, score: 0 }; wndQuizCard(); };
b += worldBtn("pass", "My Wonders Passport", "");
f.pass = function () { wndPassport(); };
}
var title = key === "later" ? "The later wonders quiz" : key === "natural" ? "The natural wonders quiz" : wndName(key) + ": the quiz";
worldCard(worldFacts(title, "unit " + u + " of World Learning: the Wonders of the World", [], [], b), f);
},
function () {
var Q = WND.quiz, list = wndQuizList(Q.key), right = 0;
list.forEach(function (q, k) { if (Q.ans[k] === q[1])
right++; });
Q.done = true;
Q.score = right;
var u = WND_UNIT[Q.key], pass = wndCfg().pass;
try {
if (typeof edrScore === "function")
edrScore(WND_COURSE, u, right, 10);
}
catch (e) { }
if (right >= pass)
wndStamp(u);
wndQuizCard();
},
function (u) {
var st = (typeof eduStore === "function") ? eduStore() : null;
if (!st)
return;
var w = st[WND_COURSE] || (st[WND_COURSE] = {});
var fresh = !w[u];
if (fresh) {
w[u] = new Date().toISOString();
if (typeof save === "function")
save();
}
var n = wndStampCount(7);
if (fresh)
wndSay("🏛️ <b>Passport stamped</b> (" + wndStampCount(9) + " of 9)." + (u <= 7 && n === 7 ? " <b>You are a Wonders Scholar!</b> The certificate is in your Backpack." : ""));
if (wndSigned() && typeof cityRpc === "function") {
var t0 = (WND.t0 && WND.t0[Object.keys(WND_UNIT).filter(function (k) { return WND_UNIT[k] === u; })[0]]) || Date.now(), wait = Math.max(0, 21000 - (Date.now() - t0));
setTimeout(function () { cityRpc("school_pass", { p_course: WND_COURSE, p_unit: u }).catch(function () { }); }, wait);
}
},
function () {
var f = {}, b = "<div style='display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0'>";
WND_SITES.forEach(function (r) {
var u = r[5], ok = wndStamped(u);
b += "<div style='text-align:center;padding:8px 4px;border-radius:8px;border:2px " + (ok ? "solid " : "dashed ") + WND_COL[r[0]] + ";background:" + (ok ? WND_COL[r[0]] + "33" : "transparent") + "'><div style='font-size:20px'>" + (ok ? "🏛️" : "○") + "</div><div style='font-size:11.5px'>" + wndEsc(r[1].replace(/^The /, "")) + "</div></div>";
});
[["later", 8, "Later wonders"], ["natural", 9, "Natural wonders"]].forEach(function (r) { var ok = wndStamped(r[1]); b += "<div style='text-align:center;padding:8px 4px;border-radius:8px;border:2px " + (ok ? "solid" : "dashed") + " #8FB4E8'><div style='font-size:20px'>" + (ok ? "🌍" : "○") + "</div><div style='font-size:11.5px'>" + r[2] + "</div></div>"; });
b += "</div>";
var n = wndStampCount(7);
b += "<div style='margin:6px 0'>" + (n === 7 ? "🎓 <b>Wonders Scholar.</b> Every one of the Seven learned." : n + " of the Seven stamped. Seven make a Wonders Scholar.") + "</div>";
var p = wndProg(), did = Object.keys(p.did).length;
b += "<div style='font-size:12.5px;opacity:.8'>Things done: " + did + " · lessons read: " + Object.keys(p.read).length + " of 38" + (p.best && p.best.run ? " · your best stadion: " + p.best.run.toFixed(1) + " s" : "") + "</div>";
b += worldBtn("print", "Print my passport", "a page to keep, or to show a teacher");
f.print = function () { wndPrint(wndPassportDoc()); };
worldCard(worldFacts("My Wonders Passport", "World Learning · the Department of Education", [], [], b), f);
},
function (title, body) {
return "<!doctype html><html><head><meta charset='utf-8'><title>" + wndEsc(title) + "</title><style>body{font:15px/1.5 Georgia,serif;color:#1E2228;margin:28px;max-width:760px}h1{font-size:24px;color:#23407A;margin:0 0 4px}h2{font-size:17px;color:#23407A;margin:18px 0 4px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #C8CCD2;padding:5px 7px;text-align:left;vertical-align:top}.dim{color:#5A6068;font-size:13px}.box{border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0}.line{border-bottom:1px solid #8A8E96;height:26px}</style></head><body>" + body + "</body></html>";
},
function () {
var d = (typeof dreamer === "function") ? dreamer() : {}, nm = wndEsc(d.name || d.displayName || "Dreamer"), rows = "";
WND_SITES.forEach(function (r) { var st = (typeof eduStore === "function") ? (eduStore()[WND_COURSE] || {}) : {}; rows += "<tr><td>" + r[5] + "</td><td>" + wndEsc(r[1]) + "</td><td>" + (st[r[5]] ? "Stamped " + String(st[r[5]]).slice(0, 10) : "not yet") + "</td></tr>"; });
[["8", "The later wonders"], ["9", "The natural wonders"]].forEach(function (r) { var st = (typeof eduStore === "function") ? (eduStore()[WND_COURSE] || {}) : {}; rows += "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + (st[r[0]] ? "Stamped " + String(st[r[0]]).slice(0, 10) : "not yet") + "</td></tr>"; });
return wndDocWrap("Wonders Passport", "<h1>Wonders Passport</h1><div class='dim'>World Learning: the Wonders of the World · Somnucor City School, Department of Education</div><p><b>" + nm + "</b></p><table><tr><th>Unit</th><th>Wonder</th><th>Quiz</th></tr>" + rows + "</table>" +
(wndStampCount(7) === 7 ? "<div class='box'><b>Wonders Scholar</b>: has learned all Seven Wonders of the Ancient World.</div>" : "") + "<p class='dim'>Each stamp is a ten-question quiz passed with " + wndCfg().pass + " or more right, after the lessons at that wonder.</p>");
},
function () { worldCard(worldFacts("How tall were they?", "new, in metres (some are best estimates)", [["The Great Pyramid", "146.6 m (138.5 m today)"], ["The Lighthouse", "about 100 to 130 m"], ["The Mausoleum", "about 45 m"], ["The Colossus", "about 33 m, on a base of perhaps 15 m"], ["The Hanging Gardens", "about 25 m (if Diodorus is right)"], ["The Temple of Artemis", "columns 18 m; about 25 m to the roof's peak"], ["The Statue of Zeus", "about 12 m, sitting"]], ["A ten-storey building is about 30 m. The Statue of Liberty is 46 m from heel to torch.", "The Great Pyramid was the tallest thing people built for about 3,800 years, until Lincoln Cathedral's spire in England, about AD 1311."]), {}); },
function () {
var b = "<table style='width:100%;border-collapse:collapse;font-size:12.5px'>" + WND_SOURCES.map(function (r) { return "<tr style='border-top:1px solid rgba(255,255,255,.15)'><td style='padding:4px 6px 4px 0;vertical-align:top'><b>" + wndEsc(r[0]) + "</b><br><span style='opacity:.7'>" + wndEsc(r[1]) + "</span></td><td style='padding:4px 0'>" + wndEsc(r[3]) + "<br><span style='opacity:.7'>" + wndEsc(r[2]) + "</span></td></tr>"; }).join("") + "</table>";
b += "<div style='margin-top:8px;font-size:12.5px;opacity:.85'>The translations named are the old ones (1930 or earlier), free for anyone to read. Ask Callimachus which source says what.</div>";
worldCard(worldFacts("The library of sources", "who saw the wonders, and wrote it down", [], [], b), {});
},
function () {
var f = {}, b = "<div style='margin:6px 0'>The Wonders of the World is a walk-through history lesson: the Seven Wonders of the Ancient World at their real size, each with five lessons in two reading levels, things to do, historical people to question, and a ten-question quiz. Progress is kept on the City School's report card (World Learning: the Wonders of the World, nine units).</div>";
b += "<div style='margin:8px 0 2px;font-weight:600'>Learning goals by grade</div>" + WND_GOALS.map(function (g) { return "<div style='margin:3px 0;font-size:13px'><b>Grades " + g[0] + ":</b> " + wndEsc(g[1]) + "</div>"; }).join("");
b += "<div style='margin:8px 0 2px;font-weight:600'>A class visit in 45 minutes</div><div style='font-size:13px'>5 min: the map floor and the timeline in the Hall. 25 min: each group takes one wonder: read the lessons, do its hands-on task, ask its guide one question. 10 min: the quiz. 5 min: groups share one thing they learned and one thing nobody knows.</div>";
b += "<div style='margin:8px 0 2px;font-weight:600'>Questions to talk about</div><div style='font-size:13px'>Why build something so big? Which wonder would you most like to see, and why? Why is the Great Pyramid the only one left? How do we know about something that is gone? Should the Colossus be rebuilt?</div>";
b += "<div style='margin:8px 0 2px;font-weight:600'>Ties to the City School</div><div style='font-size:13px'>History and social studies (ancient Egypt, Mesopotamia, Greece), geography (maps, rivers, coasts), mathematics (measurement, slope and angle, scale), science and engineering (forces, friction, simple machines, materials), English (reading informational text, using sources).</div>";
b += worldBtn("ws", "Print the worksheet", "a page for each pupil: map, timeline, questions");
f.ws = function () { wndPrint(wndWorksheet()); };
b += worldBtn("gd", "Print this guide", "");
f.gd = function () { wndPrint(wndGuideDoc()); };
worldCard(worldFacts("The teacher's guide", "for teachers and parents", [], [], b), f);
},
function () {
return wndDocWrap("The Wonders of the World: teacher's guide", "<h1>The Wonders of the World</h1><div class='dim'>Teacher's guide · World Learning, Somnucor City School</div>" +
"<h2>What it is</h2><p>The Seven Wonders of the Ancient World, walked through at their real size: the Great Pyramid of Giza (with its passages and chambers), the Hanging Gardens of Babylon, the Temple of Artemis at Ephesus, the Statue of Zeus at Olympia, the Mausoleum at Halicarnassus, the Colossus of Rhodes and the Lighthouse of Alexandria; with a Hall of Wonders (map floor, timeline, library of sources, models of the New Seven Wonders and seven natural wonders).</p>" +
"<h2>Learning goals</h2><table><tr><th>Grades</th><th>Pupils can…</th></tr>" + WND_GOALS.map(function (g) { return "<tr><td>" + g[0] + "</td><td>" + wndEsc(g[1]) + "</td></tr>"; }).join("") + "</table>" +
"<h2>Each wonder</h2><p>Five lessons (History; How it was built; Where it is; Then and now; How we know), each for younger readers and in full; a hands-on task; one or two historical people to question by conversation; a ten-question quiz.</p>" +
"<h2>A class visit in 45 minutes</h2><p>5 min the map and timeline; 25 min one wonder per group (lessons, task, a question for its guide); 10 min quiz; 5 min share.</p>" +
"<h2>Honesty about evidence</h2><p>Every lesson separates what is known from what is guessed. The Hanging Gardens may never have existed; the Colossus' pose is unknown; reconstructions here are careful best guesses from the ancient writers and the archaeology.</p>" +
"<h2>Sources</h2><p>" + WND_SOURCES.map(function (r) { return wndEsc(r[0] + ", " + r[2]); }).join("; ") + ".</p>");
},
function () {
var q = [];
WND_SITES.forEach(function (r) { q.push(WND_QUIZ[r[0]][0][0]); q.push(WND_QUIZ[r[0]][3][0]); });
return wndDocWrap("The Wonders of the World: worksheet", "<h1>The Wonders of the World</h1><div class='dim'>Worksheet · Name: ______________________ · Class: __________</div>" +
"<h2>1. The map</h2><p>Write the number of each wonder by its place: 1 Giza · 2 Babylon · 3 Ephesus · 4 Olympia · 5 Halicarnassus · 6 Rhodes · 7 Alexandria.</p><div class='box' style='height:150px'>(sketch the Mediterranean here, or use the map floor in the Hall)</div>" +
"<h2>2. The timeline</h2><p>Put the Seven in order, oldest first:</p>" + [1, 2, 3, 4, 5, 6, 7].map(function (n) { return "<div class='line'>" + n + ".</div>"; }).join("") +
"<h2>3. Questions</h2>" + q.map(function (t, i) { return "<p>" + (i + 1) + ". " + wndEsc(t) + "</p><div class='line'></div>"; }).join("") +
"<h2>4. Evidence</h2><p>Choose one wonder. Write one thing we know for sure, and how we know it. Then write one thing nobody knows.</p><div class='line'></div><div class='line'></div><div class='line'></div>" +
"<h2>5. Ask a guide</h2><p>Write the question you asked, who you asked, and what you learned.</p><div class='line'></div><div class='line'></div>");
},
function (at) {
var A = WND_ARRIVE[at] || WND_ARRIVE.hall, site = typeof A[0] === "string" ? A[0] : "", o = site ? WND_AT[site] : { x: 0, z: 0 }, i = site ? 1 : 0;
var x = o.x + A[i], z = o.z + A[i + 1], y = A[i + 3] || 0;
camera.position.set(WND.base + x, y + 1.72, z);
if (typeof yaw !== "undefined")
yaw = A[i + 2];
if (typeof pitch !== "undefined")
pitch = A[i + 4] || 0;
if (typeof flyY !== "undefined")
flyY = 0;
},
function (G) {
WND.selfBake = [];
ALX.stand = null;
ALX.ruin = null;
ALX.libCol = { solids: [], floors: [], ramps: [] };
ALX.ruinCol = null;
ALX.ruinOn = null;
WND.G = G;
WND.lite = wndLite();
WND.geos = {};
WND.people = [];
WND.vgroups = {};
WND.onView = {};
WND.blockers = {};
WND.aurora = [];
var K = WND.K = wndCtx();
K.F = G;
WNK = K;
var parts = [wndLand, wndHall, wndPyramid, wndGardens, wndArtemis, wndZeus, wndMausoleum, wndColossus, wndPharos, wndLife];
parts.forEach(function (f) {
WNK.F = G;
WNK.v = "";
WNK.ox = 0;
WNK.oz = 0;
WNK.site = f === wndLand ? "land" : "hall";
try {
f();
}
catch (e) {
if (window.console)
console.warn("[wonders] build", f.name, e);
}
});
WNK.F = G;
WNK.v = "";
WNK.ox = 0;
WNK.oz = 0;
try {
wndBakeAll(G);
}
catch (e) {
if (window.console)
console.warn("[wonders] bake", e);
}
WND_SITES.forEach(function (r) { wndViewShow(r[0]); var V = WND.vgroups[r[0]]; if (V)
V.all.visible = wndSiteOn(r[0]); });
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
WND.built = true;
WND.builtCfg = JSON.stringify(wndCfg());
},
function (K, x, z) {
var out = [];
for (var k in K.lists) {
var L = K.lists[k], n = L.solids.length + L.floors.length + L.ramps.length + L.water.length;
if (!L.bb || L.bbN !== n) {
var b = [1e9, 1e9, -1e9, -1e9], add = function (x0, z0, x1, z1) { if (x0 < b[0])
b[0] = x0; if (z0 < b[1])
b[1] = z0; if (x1 > b[2])
b[2] = x1; if (z1 > b[3])
b[3] = z1; };
L.solids.forEach(function (s) { var e = (s.r !== undefined ? s.r : Math.hypot(s.hw, s.hd)) + 1; add(s.x - e, s.z - e, s.x + e, s.z + e); });
L.water.forEach(function (w) { var e = (w.r !== undefined ? w.r : Math.max(w.hw, w.hd)) + 1; add(w.x - e, w.z - e, w.x + e, w.z + e); });
L.floors.concat(L.ramps).forEach(function (f) { add(f.x0 - 1, f.z0 - 1, f.x1 + 1, f.z1 + 1); });
L.bb = b;
L.bbN = n;
}
if (x >= L.bb[0] - 40 && x <= L.bb[2] + 40 && z >= L.bb[1] - 40 && z <= L.bb[3] + 40)
out.push(L);
}
return out;
},
function (G) {
if (typeof gwBake !== "function")
return;
var groups = [];
for (var k in WND.vgroups)
groups.push(WND.vgroups[k]);
var own = WND.selfBake || [];
own.forEach(function (g) { g.userData.keep = 1; });
groups.forEach(function (V) { V.all.userData.keep = 1; });
gwBake(G);
groups.forEach(function (V) { delete V.all.userData.keep; });
groups.forEach(function (V) {
var subs = [V.then, V.now];
for (var e in V.extra)
subs.push(V.extra[e]);
subs.forEach(function (x) { x.userData.keep = 1; });
gwBake(V.all);
subs.forEach(function (x) { delete x.userData.keep; gwBake(x); });
});
own.forEach(function (g) { delete g.userData.keep; gwBake(g); });
},
function () {
for (var k in WND.mats) {
var m = WND.mats[k];
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
for (var g in WND.geos) {
try {
WND.geos[g].dispose();
}
catch (e) { }
}
WND.mats = {};
WND.geos = {};
WND.K = null;
WND.G = null;
WND.hillH = null;
WND.hillT = null;
WND.built = false;
WND.people = [];
WND.vgroups = {};
WND.aurora = [];
WND_SLEDGE.g = null;
WND_GDN.screw = { on: 0, lit: 0, raised: 0, t: 0 };
WND_GDN.water = null;
BAB.hideFor = null;
BAB.m = null;
BAB.frondG = null;
WND_ART.roll = { t: 0, go: 0 };
WND_ZEUS.ghost = null;
WND_ZEUS.run = null;
WND_COL3.statue = null;
WND_COL3.mound = null;
WND_COL3.stage = -1;
WND_PH.fire = null;
WND_PH.mirror = null;
WND_PH.lit = 0;
ALX.beam = null;
ALX.sp = {};
ALX.items = {};
ALX.figs = {};
ALX.lid = null;
ALX.lidF = null;
ALX.lidL = null;
ALX.door = null;
ALX.doorS = null;
ALX.doorL = null;
ALX.clock = null;
ALX.sphere = null;
ALX.fire = null;
ALX.scorch = null;
},
function () {
var L = worldLocal(), r = wndRegion(L.x, L.z), feet = L.y - 1.72, E;
if (r === "pyramid") {
var A = WND_AT.pyramid;
E = (Math.abs(L.x - A.x) < WND_PYR.half && Math.abs(L.z - A.z) < WND_PYR.half && WND_PYR.runs && wndPyrDeep(L.x - A.x, L.z - A.z, feet)) ? WND_ENV.inside : WND_ENV.desert;
}
else if (r === "hall")
E = WND_ENV.hall;
else if (r === "pharos" && feet < -2.5 && typeof alxUnderNow === "function" && alxUnderNow())
E = WND_ENV.inside;
else
E = WND_ENV.out;
if (WND.lite && E.fogD < 0.0012)
E = Object.assign({}, E, { fogD: 0.0012 });
return E;
},
function () {
if (WND.built && WND.builtCfg !== JSON.stringify(wndCfg()) && WLD.w && WLD.w.g) {
var G = WLD.w.g;
while (G.children.length)
G.remove(G.children[0]);
wndForget();
wndBuild(G);
}
WNK = WND.K;
wndArrive(WND.wantAt || "hall");
WND.wantAt = null;
WND.room = "";
wndSay("🏛️ <b>The Hall of Wonders.</b> Sunlight through a glass roof, and the ancient world on the floor at your feet: step on any of the seven to go there. The timeline runs along the north wall; the library and the teachers' room are west, the later wonders east.");
},
function (x, z, feet) {
var K = WND.K;
if (!K)
return false;
if (x * x + z * z > 1150 * 1150)
return true;
var r = wndRegion(x, z), L = K.lists[r];
if (r !== "hall" && r !== "land" && !wndSiteOn(r)) {
var A0 = WND_AT[r];
if (Math.hypot(x - A0.x, z - A0.z) < 260)
return true;
}
var Ls = wndListsAt(K, x, z);
for (var li = 0; li < Ls.length; li++)
if (wndSolidIn(Ls[li], x, z, feet))
return true;
if (WND.taken && (wndHillAt(x, z) > 1.2 || (x * x + z * z > 980 * 980 && wndSeaArc((Math.atan2(x, -z) * 180 / Math.PI + 360) % 360))))
return true;
if (WND.blockers[r]) {
var A = WND_AT[r];
if (WND.blockers[r](x - A.x, z - A.z, feet))
return true;
}
return false;
},
function (dt) {
var K = WND.K;
if (!K)
return;
WNK = K;
WND.t += dt;
var t = WND.t;
if (typeof stars !== "undefined" && stars && stars.visible)
stars.visible = false;
try {
wndFlamesTick(t, K.flames);
wndSledgeTick(dt);
wndScrewTick(dt);
wndRollerTick(dt);
wndZeusTick(dt);
wndColTick(dt);
wndBeaconTick(dt);
wndLifeTick(dt);
alxTick(dt);
WND.aurora.forEach(function (p) { p.position.x = Math.sin(t * 0.25 + p.userData.aur) * 0.08; });
var lim = WND.lite ? 0.05 : 0.033;
WND.people.forEach(function (P) { if (P.wander && typeof wWander === "function")
wWander(P.g, Math.min(dt, lim), null, P.wander); });
}
catch (e) {
if (!WND.e1) {
WND.e1 = 1;
if (window.console)
console.warn("[wonders] tick", e);
}
}
var L = worldLocal(), feet = L.y - 1.72, reg = wndRegion(L.x, L.z);
try {
wndOthersHide(reg);
}
catch (e) { }
var rm = wndRoomAt(K, L.x, L.z, feet), nm = rm ? rm.name : "", site = reg === "hall" || reg === "land" ? "" : reg;
var head = "<b>🏛️ The Wonders of the World</b>" + (site ? " · " + wndEsc(wndName(site)) + (wndView(site) === "now" ? " <span style='opacity:.75'>(Now)</span>" : wndView(site) === "fallen" ? " <span style='opacity:.75'>(fallen, 226 BC)</span>" : "") : "") + (nm && nm !== wndName(site) ? " · " + wndEsc(nm) : "");
worldBanner(head + (typeof alxLine === "function" ? alxLine() : ""));
WND.pt += dt;
if (WND.pt < 0.15)
return;
WND.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
if (WND.myFn && WLD.promptFn === WND.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
K.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1 || Math.abs(feet - s.y) > 2.2)
return;
if (!wndVOk(s.v))
return;
if (s.when && !s.when())
return;
if (s.site && s.site !== "hall" && s.site !== "land" && !wndSiteOn(s.site))
return;
var d = Math.hypot(L.x - s.x, L.z - s.z);
if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
}
});
if (best) {
var fn = best.fn;
WND.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + wndEsc(best.verb), fn);
}
else if (WND.myFn && WLD.promptFn === WND.myFn) {
worldPrompt(null);
WND.myFn = null;
}
},
function () {
var b = "", f = {}, k = wndKeeper(), inW = WLD.on === WND.key;
var rows = [["The Seven", "The Great Pyramid, the Hanging Gardens, the Temple of Artemis, the Statue of Zeus, the Mausoleum, the Colossus and the Lighthouse, at their real size, each to walk into"],
["To learn", "Five lessons at each (for younger readers and in full), things to do, the people who made or saw them to talk with, and a quiz for your Wonders Passport"],
["Your passport", wndStampCount(9) + " of 9 stamps" + (wndStampCount(7) === 7 ? " · Wonders Scholar" : "")]];
var go = function (at, label, sub) { b += worldBtn("g_" + at, label, sub || ""); f["g_" + at] = function () { worldCard(null); wndGo(at); }; };
go("hall", "The Hall of Wonders", "the map floor: step on a wonder to go there");
WND_SITES.forEach(function (r) { if (!wndSiteOn(r[0]) && !k)
return; go(r[0], r[1], r[2] + " · " + r[4] + (wndStamped(r[5]) ? " · ✓ stamped" : "")); });
go("alexlib", "📜 The Library of Alexandria: a story", "The Keeper of the Scrolls: twelve chapters, about three hours, secrets and danger");
go("teachers", "The teachers' room", "the teacher's guide and the worksheet");
b += worldBtn("pp", "My Wonders Passport", "");
f.pp = function () { wndPassport(); };
if (inW) {
b += worldBtn("out", "Leave", "back to where you were");
f.out = function () { wndLeave(); };
}
worldCard(worldFacts("🏛️ The Wonders of the World", "the Seven Wonders of the Ancient World · World Learning", rows, []) + b, f);
},
function (kind) {
if (WSC.mats[kind])
return WSC.mats[kind];
var P = (typeof TOON !== "undefined" && TOON && TOON.Phong) || THREE.MeshPhongMaterial, m;
var vein = function () {
return wndCanvasTex("wsc-vein", 256, 256, function (x, W, H) {
x.fillStyle = "#fff";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var v = 226 + Math.random() * 29 | 0;
x.fillStyle = "rgb(" + v + "," + v + "," + (v - 3) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 5, 2 + Math.random() * 5);
}
x.strokeStyle = "rgba(150,140,130,0.22)";
x.lineWidth = 1.2;
for (var k = 0; k < 7; k++) {
x.beginPath();
var px = Math.random() * W, py = 0;
x.moveTo(px, py);
while (py < H) {
px += (Math.random() - 0.5) * 18;
py += 8;
x.lineTo(px, py);
}
x.stroke();
}
});
};
if (kind === "marble")
m = new P({ color: 0xB4ACA0, specular: 0x1E1D1B, shininess: 18, map: vein() });
else if (kind === "marblecool")
m = new P({ color: 0xAAA8A2, specular: 0x1C1D1E, shininess: 16, map: vein() });
else if (kind === "bronze")
m = new P({ color: 0x8A5A2C, specular: 0xE0B070, shininess: 60, emissive: 0x1A0E04 });
else if (kind === "gold")
m = new P({ color: 0xA8781E, specular: 0x8A6A30, shininess: 36, emissive: 0x1A0E00 });
else if (kind === "ivory")
m = new P({ color: 0xB8A888, specular: 0x3A3428, shininess: 30 });
else if (kind === "ebony")
m = new P({ color: 0x2A1A12, specular: 0x5A4636, shininess: 50 });
else if (kind === "wood")
m = new P({ color: 0x5A3A22, specular: 0x3A2A1A, shininess: 20 });
else if (kind === "limestone" || kind === "nemes")
m = new P({ color: 0xC4A474, specular: 0x141008, shininess: 6, map: wndCanvasTex("wsc-" + kind, 256, 256, function (x, W, H) {
x.fillStyle = "#fff";
x.fillRect(0, 0, W, H);
if (kind === "nemes") {
for (var b = 0; b < 16; b++) {
x.fillStyle = b % 2 ? "rgb(196,190,200)" : "rgb(250,236,200)";
x.fillRect(b * 16, 0, 16, H);
}
}
for (var i = 0; i < 1400; i++) {
var v = 200 + Math.random() * 55 | 0;
x.fillStyle = "rgba(" + v + "," + (v - 8) + "," + (v - 22) + ",0.55)";
x.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 7, 1 + Math.random() * 3);
}
x.strokeStyle = "rgba(120,96,64,0.25)";
for (var l = 0; l < 10; l++) {
var y = l * 26 + Math.random() * 8;
x.lineWidth = 1 + Math.random() * 2;
x.beginPath();
x.moveTo(0, y);
for (var px = 0; px <= W; px += 16)
x.lineTo(px, y + Math.sin(px * 0.05 + l) * 3);
x.stroke();
}
}) });
else
m = new P({ color: 0xB8B0A0, specular: 0x333333, shininess: 20 });
m.side = THREE.DoubleSide;
WSC.mats[kind] = m;
return m;
},
function (cb) {
if (WSC.files)
return cb(WSC.files);
if (WSC.bad || typeof hdfFiles !== "function" || typeof hdfUtils !== "function" || location.protocol === "file:" || (typeof HDF !== "undefined" && HDF.failed))
return cb(null);
if (WSC.wait) {
WSC.wait.push(cb);
return;
}
WSC.wait = [cb];
var list = [WSC_ANIM, WSC_BODY.m, WSC_BODY.f, WSC_HAIR.beard, WSC_HAIR.long, WSC_HAIR.buns, WSC_HAIR.parted];
var done = function (f) { var w = WSC.wait || []; WSC.wait = null; w.forEach(function (c) { try {
c(f);
}
catch (e) {
if (window.console)
console.warn("[wonders] sculpt", e);
} }); };
var timer = setTimeout(function () { WSC.bad = true; done(null); }, 25000);
hdfUtils(function () { hdfFiles(list, function (F) { clearTimeout(timer); if (WSC.bad)
return; WSC.files = F; done(F); }); });
},
function (spec, F) {
var U = HDF.utils, B = F[WSC_BODY[spec.sex === "f" ? "f" : "m"]], r = U.clone(B.scene), bones = {}, skel = null;
r.traverse(function (m) { if (m.isBone)
bones[m.name] = m; if (m.isSkinnedMesh && (!skel || m.skeleton.bones.length > skel.skeleton.bones.length))
skel = m; });
r.traverse(function (m) { if (m.isSkinnedMesh) {
var nb = m.skeleton.bones.map(function (x) { return bones[x.name] || x; });
m.bind(new THREE.Skeleton(nb, m.skeleton.boneInverses), m.bindMatrix.clone());
} });
(spec.hair || []).forEach(function (h) {
var P = F[WSC_HAIR[h]];
if (!P)
return;
var c = U.clone(P.scene), mv = [];
c.traverse(function (m) { if (m.isSkinnedMesh)
mv.push(m); });
mv.forEach(function (m) { var nb = m.skeleton.bones.map(function (b) { return bones[b.name] || b; }); m.bind(new THREE.Skeleton(nb, m.skeleton.boneInverses), m.bindMatrix.clone()); m.userData.wscHair = 1; ((skel && skel.parent) || r).add(m); });
});
r.position.set(0, 0, 0);
r.rotation.set(0, 0, 0);
r.scale.set(1, 1, 1);
r.traverse(function (o) { o.matrixAutoUpdate = true; });
r.updateMatrixWorld(true);
if (skel) {
var sk = skel.skeleton, wb = {};
sk.bones.forEach(function (bn, bi) { wb[bn.uuid] = new THREE.Matrix4().copy(sk.boneInverses[bi]).invert(); });
sk.bones.forEach(function (bn) {
var W = wb[bn.uuid], pw = bn.parent && wb[bn.parent.uuid], L = pw ? new THREE.Matrix4().copy(pw).invert().multiply(W) : W.clone();
if (!pw && bn.parent) {
bn.parent.updateMatrixWorld(true);
L = new THREE.Matrix4().copy(bn.parent.matrixWorld).invert().multiply(W);
}
L.decompose(bn.position, bn.quaternion, bn.scale);
});
}
var A = F[WSC_ANIM], clip = null;
(A && A.clips || []).forEach(function (c) { if (c.name === (spec.clip || "Idle_Loop"))
clip = c; });
if (clip) {
var mx = new THREE.AnimationMixer(r), act = mx.clipAction(clip);
act.play();
mx.setTime(spec.t || 0);
}
for (var bk in bones)
bones[bk].scale.set(1, 1, 1);
var P = spec.pose || {};
for (var bn in P) {
var b = bones[bn];
if (!b)
continue;
var d = P[bn];
var q = new THREE.Quaternion().setFromEuler(new THREE.Euler(d[0] || 0, d[1] || 0, d[2] || 0, "XYZ"));
b.quaternion.multiply(q);
}
r.position.set(0, 0, 0);
r.rotation.set(0, 0, 0);
r.scale.set(1, 1, 1);
r.traverse(function (o) { o.matrixAutoUpdate = true; });
r.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(r.matrixWorld).invert(), pos = [], tag = [], idx = [], hair = [], v = new THREE.Vector3(), base = 0;
var armRe = /clavicle|upperarm|lowerarm|hand|index|middle|pinky|ring|thumb/, legRe = /thigh|calf|foot|ball/, headRe = /^(Head|neck_01)$/;
r.traverse(function (m) {
if (!m.isMesh || /Eye/i.test(m.name))
return;
var G = m.geometry, Pa = G.attributes.position, n = Pa.count, si = G.attributes.skinIndex, sw = G.attributes.skinWeight, names = m.skeleton ? m.skeleton.bones.map(function (b) { return b.name; }) : [];
var BM = null;
if (m.isSkinnedMesh) {
BM = m.skeleton.bones.map(function (bn, bi) { return new THREE.Matrix4().multiplyMatrices(bn.matrixWorld, m.skeleton.boneInverses[bi]); });
}
var acc = new THREE.Vector3(), tmp = new THREE.Vector3();
for (var k = 0; k < n; k++) {
v.fromBufferAttribute(Pa, k);
if (BM) {
v.applyMatrix4(m.bindMatrix);
acc.set(0, 0, 0);
var wsum = 0;
for (var cc = 0; cc < 4; cc++) {
var ww = cc === 0 ? sw.getX(k) : cc === 1 ? sw.getY(k) : cc === 2 ? sw.getZ(k) : sw.getW(k);
if (ww <= 0)
continue;
var bi2 = cc === 0 ? si.getX(k) : cc === 1 ? si.getY(k) : cc === 2 ? si.getZ(k) : si.getW(k);
tmp.copy(v).applyMatrix4(BM[bi2]).multiplyScalar(ww);
acc.add(tmp);
wsum += ww;
}
if (wsum > 0)
v.copy(acc).multiplyScalar(1 / wsum);
v.applyMatrix4(inv);
}
else
v.applyMatrix4(m.matrixWorld).applyMatrix4(inv);
pos.push(v.x, v.y, v.z);
var t = 0;
if (si && !m.userData.wscHair) {
var best = -1, bw = 0;
var ws = [sw.getX(k), sw.getY(k), sw.getZ(k), sw.getW(k)], is = [si.getX(k), si.getY(k), si.getZ(k), si.getW(k)];
for (var c = 0; c < 4; c++) {
if (ws[c] > bw) {
bw = ws[c];
best = is[c];
}
}
var nm = names[best] || "";
t = armRe.test(nm) ? (/_l$/.test(nm) ? 1 : 2) : legRe.test(nm) ? 3 : headRe.test(nm) ? 4 : 0;
}
else if (m.userData.wscHair)
t = 5;
tag.push(t);
}
var I = G.index;
if (I)
for (var j = 0; j < I.count; j++)
idx.push(I.getX(j) + base);
else
for (j = 0; j < n; j++)
idx.push(j + base);
base += n;
});
var at = {};
for (var nm2 in bones) {
var w2 = new THREE.Vector3();
bones[nm2].getWorldPosition(w2);
w2.applyMatrix4(inv);
at[nm2] = w2;
}
if (clip) {
try {
mx.stopAllAction();
mx.uncacheRoot(r);
}
catch (e) { }
}
return { pos: pos, tag: tag, idx: idx, at: at };
},
function (pos, idx, keep) {
var map = {}, np = [], remap = new Int32Array(pos.length / 3), out = [];
for (var i = 0; i < pos.length / 3; i++) {
if (keep && !keep(i)) {
remap[i] = -1;
continue;
}
var k = Math.round(pos[i * 3] * 2000) + "," + Math.round(pos[i * 3 + 1] * 2000) + "," + Math.round(pos[i * 3 + 2] * 2000);
if (map[k] === undefined) {
map[k] = np.length / 3;
np.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
}
remap[i] = map[k];
}
for (var t = 0; t < idx.length; t += 3) {
var a = remap[idx[t]], b = remap[idx[t + 1]], c = remap[idx[t + 2]];
if (a < 0 || b < 0 || c < 0 || a === b || b === c || a === c)
continue;
out.push(a, b, c);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(np, 3));
G.setIndex(out);
var uv = new Float32Array(np.length / 3 * 2);
for (var u = 0; u < np.length / 3; u++) {
uv[u * 2] = (np[u * 3] + np[u * 3 + 2]) * 1.6;
uv[u * 2 + 1] = np[u * 3 + 1] * 1.6;
}
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.computeVertexNormals();
return G;
},
function (pz, o) {
var ax = o.axis || "y", A = ax === "y" ? 1 : 2, U = ax === "y" ? 0 : 0, V = ax === "y" ? 2 : 1, n = o.n || 22, seg = o.seg || 36, rings = [], pos = pz.pos, tag = pz.tag;
var ok = function (i) { if (o.parts && o.parts.indexOf(tag[i]) < 0)
return false; if (o.box) {
var x = pos[i * 3];
if (x < o.box[0] || x > o.box[1])
return false;
} if (o.zbox) {
var zz = pos[i * 3 + 2];
if (zz < o.zbox[0] || zz > o.zbox[1])
return false;
} if (o.ybox) {
var yy = pos[i * 3 + 1];
if (yy < o.ybox[0] || yy > o.ybox[1])
return false;
} return true; };
var lo = Math.min(o.a0, o.a1), hi = Math.max(o.a0, o.a1), band = Math.abs(o.a1 - o.a0) / n * 0.9 + 0.012, pts = [];
for (var i = 0; i < pos.length / 3; i++) {
var a = pos[i * 3 + A];
if (a < lo - band || a > hi + band || !ok(i))
continue;
pts.push(i);
}
if (!pts.length)
return null;
var prevC = null, R = [];
for (var s = 0; s <= n; s++) {
var f = s / n, a = o.a0 + (o.a1 - o.a0) * f, cu = 0, cv = 0, cnt = 0;
pts.forEach(function (i) { if (Math.abs(pos[i * 3 + A] - a) < band) {
cu += pos[i * 3 + U];
cv += pos[i * 3 + V];
cnt++;
} });
var c = cnt ? [cu / cnt, cv / cnt] : (prevC || [0, 0]);
if (o.center)
c = [o.center[0] + (o.center2 ? (o.center2[0] - o.center[0]) * f : 0), o.center[1] + (o.center2 ? (o.center2[1] - o.center[1]) * f : 0)];
var rr = new Float32Array(seg);
pts.forEach(function (i) { if (Math.abs(pos[i * 3 + A] - a) >= band)
return; var du = pos[i * 3 + U] - c[0], dv = pos[i * 3 + V] - c[1], d = Math.hypot(du, dv), b = Math.floor(((Math.atan2(dv, du) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * seg) % seg; if (d > rr[b])
rr[b] = d; });
var mx = 0;
for (var b = 0; b < seg; b++)
mx = Math.max(mx, rr[b]);
if (mx <= 0)
mx = prevC ? 0.1 : 0.05;
for (b = 0; b < seg; b++)
if (rr[b] <= 0)
rr[b] = mx * 0.8;
for (var pass = 0; pass < 4; pass++) {
var nr = new Float32Array(seg);
for (b = 0; b < seg; b++) {
var l = rr[(b + seg - 1) % seg], m2 = rr[b], r2 = rr[(b + 1) % seg];
nr[b] = Math.max(m2, (l + r2) / 2 * 0.98, mx * (o.round || 0.55));
}
rr = nr;
}
var fl = (o.flare || 0) * Math.pow(f, 1.4), fd = (o.folds || 0) * (0.25 + 0.75 * f);
for (b = 0; b < seg; b++) {
var ang = b / seg * Math.PI * 2;
rr[b] = rr[b] + (o.off || 0.025) + fl + fd * (0.5 + 0.5 * Math.sin(ang * (o.k || 9) + f * 1.3 + (o.ph || 0))) + fd * 0.35 * Math.sin(ang * (o.k2 || 17) + f * 2.1);
}
R.push({ c: c, a: a, r: rr });
prevC = c;
}
for (var p2 = 0; p2 < 2; p2++)
for (s = 1; s < n; s++)
for (b = 0; b < seg; b++)
R[s].r[b] = (R[s - 1].r[b] + R[s].r[b] * 2 + R[s + 1].r[b]) / 4;
var P = [], I = [], b0 = o.open ? o.open[0] : 0, b1 = o.open ? o.open[1] : Math.PI * 2, cols = o.open ? seg : seg;
for (s = 0; s <= n; s++) {
var Rg = R[s];
for (var q = 0; q <= cols; q++) {
var ang2 = b0 + (b1 - b0) * q / cols, bb = Math.floor(((ang2 % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2) * seg) % seg, rad = Rg.r[bb];
var du2 = Math.cos(ang2) * rad, dv2 = Math.sin(ang2) * rad, X, Y, Z;
if (ax === "y") {
X = Rg.c[0] + du2;
Z = Rg.c[1] + dv2;
Y = Rg.a;
}
else {
X = Rg.c[0] + du2;
Y = Rg.c[1] + dv2;
Z = Rg.a;
}
P.push(X, Y, Z);
}
}
for (s = 0; s < n; s++)
for (q = 0; q < cols; q++) {
var i0 = s * (cols + 1) + q, i1 = i0 + 1, i2 = i0 + cols + 1, i3 = i2 + 1;
I.push(i0, i2, i1, i1, i2, i3);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
G.setIndex(I);
var uv = new Float32Array(P.length / 3 * 2);
for (var u = 0; u < P.length / 3; u++) {
uv[u * 2] = (P[u * 3] + P[u * 3 + 2]) * 1.6;
uv[u * 2 + 1] = P[u * 3 + 1] * 1.6;
}
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.computeVertexNormals();
return G;
},
function (parent, x, y, z, ry, spec) {
var g = wndGroup(x, y, z, ry, parent);
g.userData.keep = 1;
g.name = "wnd-statue";
var fb = null;
if (spec.fallback) {
fb = new THREE.Group();
g.add(fb);
try {
spec.fallback(fb);
}
catch (e) { }
fb.traverse(function (o) { o.userData.keep = 1; });
}
wscLoad(function (F) {
if (!F || !g.parent && !WND.G)
return;
var key = spec.key || JSON.stringify([spec.sex, spec.hair, spec.clip, spec.t, spec.pose, spec.drapes]), C = WSC.geo[key];
if (!C) {
try {
var pz = wscPose(spec, F), parts = [];
parts.push({ g: wscWeld(pz.pos, pz.idx, function (i) { return pz.tag[i] !== 5 && (!spec.only || spec.only.indexOf(pz.tag[i]) >= 0); }), mat: spec.skin || "marble" });
if (spec.hair && spec.hair.length)
parts.push({ g: wscWeld(pz.pos, pz.idx, function (i) { return pz.tag[i] === 5; }), mat: spec.hairMat || spec.skin || "marble" });
(spec.drapes || []).forEach(function (d) { var o = typeof d === "function" ? d(pz.at) : d; var dg = o.lap ? wscLap(pz, o) : wscSleeve(pz, o); if (dg)
parts.push({ g: dg, mat: o.mat || spec.skin || "marble", ds: 1 }); });
C = WSC.geo[key] = { parts: parts, at: pz.at };
}
catch (e) {
if (window.console)
console.warn("[wonders] sculpt", spec.key, e);
return;
}
}
var s = (spec.h || 1.82) / 1.82, body = new THREE.Group();
body.scale.setScalar(s);
body.name = "wnd-carving";
if (spec.seat !== undefined && C.at.pelvis)
body.position.y = spec.seat - C.at.pelvis.y * s + (spec.seatDrop || 0) * s;
if (spec.seatZ !== undefined && C.at.pelvis)
body.position.z = spec.seatZ - C.at.pelvis.z * s;
C.parts.forEach(function (p) { var mt = typeof p.mat === "string" ? wscMat(p.mat) : p.mat; if (p.ds && mt.side !== THREE.DoubleSide) {
mt.side = THREE.DoubleSide;
mt.needsUpdate = true;
} var m = new THREE.Mesh(p.g, mt); m.castShadow = true; m.receiveShadow = true; m.raycast = function () { }; body.add(m); });
if (spec.props)
try {
spec.props(body, C.at);
}
catch (e) {
if (window.console)
console.warn("[wonders] props", e);
}
if (fb)
g.remove(fb);
g.add(body);
g.userData.carved = 1;
if (spec.done)
try {
spec.done(g, body, C.at, s);
}
catch (e) { }
});
return g;
},
function (parent, x, y, z, ry, file, len, mat, fallback) {
var g = wndGroup(x, y, z, ry, parent);
g.userData.keep = 1;
var fb = null;
if (fallback) {
fb = new THREE.Group();
g.add(fb);
try {
fallback(fb);
}
catch (e) { }
fb.traverse(function (o) { o.userData.keep = 1; });
}
if (typeof modelsLoader !== "function" || location.protocol === "file:")
return g;
var key = "beast|" + file;
var put = function (src) {
var c = src.clone(true), bb = new THREE.Box3().setFromObject(c), sz = bb.getSize(new THREE.Vector3()), k = len / Math.max(sz.x, sz.z);
c.scale.multiplyScalar(k);
c.position.set(-(bb.min.x + bb.max.x) / 2 * k, -bb.min.y * k, -(bb.min.z + bb.max.z) / 2 * k);
c.traverse(function (m) { if (m.isMesh) {
m.material = typeof mat === "string" ? wscMat(mat) : mat;
m.raycast = function () { };
} });
if (fb)
g.remove(fb);
g.add(c);
};
if (WSC.geo[key]) {
put(WSC.geo[key]);
return g;
}
modelsLoader(function (L) {
L.load("assets/models/" + file, function (gl) {
var sc = gl.scene;
sc.updateMatrixWorld(true);
var out = new THREE.Group();
sc.traverse(function (m) {
if (!m.isMesh)
return;
var G = m.geometry.clone(), Pa = G.attributes.position, v = new THREE.Vector3();
if (m.isSkinnedMesh) {
for (var k = 0; k < Pa.count; k++) {
v.fromBufferAttribute(Pa, k);
m.boneTransform(k, v);
v.applyMatrix4(m.matrixWorld);
Pa.setXYZ(k, v.x, v.y, v.z);
}
}
else
G.applyMatrix4(m.matrixWorld);
G.deleteAttribute("normal");
var W = wscWeld(Array.from(G.attributes.position.array), G.index ? Array.from(G.index.array) : Array.from({ length: Pa.count }, function (_, i) { return i; }));
out.add(new THREE.Mesh(W));
});
WSC.geo[key] = out;
put(out);
}, undefined, function () { });
});
return g;
},
function (pz, o) {
var pos = pz.pos, tag = pz.tag, parts = o.parts || [0, 3], P = [], i, off = o.off || 0.03;
for (i = 0; i < pos.length / 3; i++) {
if (parts.indexOf(tag[i]) < 0)
continue;
var y = pos[i * 3 + 1];
if (y > o.yTop || y < o.yFloor - 0.05)
continue;
if (pos[i * 3 + 2] < o.zBack - 0.05)
continue;
P.push(pos[i * 3], y, pos[i * 3 + 2]);
}
if (!P.length)
return null;
var x0 = 1e9, x1 = -1e9, zF = -1e9;
for (i = 0; i < P.length; i += 3) {
x0 = Math.min(x0, P[i]);
x1 = Math.max(x1, P[i]);
zF = Math.max(zF, P[i + 2]);
}
var side = o.side === undefined ? 0.08 : o.side, nx = o.nx || 40, X0 = x0 - side, X1 = x1 + side, cols = [];
var near = function (x, z, y, rx, rz, ry) { var best = -1e9; for (var j = 0; j < P.length; j += 3) {
if (Math.abs(P[j] - x) > rx)
continue;
if (z !== null && Math.abs(P[j + 2] - z) > rz)
continue;
if (y !== null && Math.abs(P[j + 1] - y) > ry)
continue;
best = Math.max(best, z === null ? P[j + 2] : P[j + 1]);
} return best; };
var zs = [];
for (var z = o.zBack; z <= zF + 0.001; z += 0.025)
zs.push(z);
var ys = [];
for (var yy = o.yTop; yy >= o.yFloor; yy -= 0.025)
ys.push(yy);
var H = [], Fz = [];
for (var c = 0; c <= nx; c++) {
var x = X0 + (X1 - X0) * c / nx, row = [];
zs.forEach(function (zz) { row.push(near(x, zz, null, 0.045, 0.035, 0)); });
H.push(row);
var fr = [];
ys.forEach(function (y2) { fr.push(near(x, null, y2, 0.045, 0, 0.03)); });
Fz.push(fr);
}
var fill = function (G, nrow, lo) {
for (var r = 0; r < nrow; r++) {
var known = [];
for (var c2 = 0; c2 <= nx; c2++)
if (G[c2][r] > -1e8)
known.push(c2);
for (c2 = 0; c2 <= nx; c2++) {
if (G[c2][r] > -1e8)
continue;
var a = null, b = null;
known.forEach(function (k) { if (k < c2)
a = k; if (k > c2 && b === null)
b = k; });
if (a !== null && b !== null)
G[c2][r] = G[a][r] + (G[b][r] - G[a][r]) * (c2 - a) / (b - a) - 0.015 * Math.sin(Math.PI * (c2 - a) / (b - a));
else {
var e = a !== null ? a : b;
if (e === null) {
G[c2][r] = lo;
continue;
}
var d = Math.abs(c2 - e) / nx * (X1 - X0);
G[c2][r] = G[e][r] - (lo === null ? 0 : Math.min(1, d / side)) * (G[e][r] - (lo || 0)) * 0.9;
}
}
}
};
fill(H, zs.length, o.ySeat);
fill(Fz, ys.length, null);
var blur = function (G, nrow) { for (var p = 0; p < 3; p++) {
var N = G.map(function (r) { return r.slice(); });
for (var c3 = 0; c3 <= nx; c3++)
for (var r2 = 0; r2 < nrow; r2++) {
var s = 0, w = 0;
for (var dc = -1; dc <= 1; dc++)
for (var dr = -1; dr <= 1; dr++) {
var cc = c3 + dc, rr = r2 + dr;
if (cc < 0 || cc > nx || rr < 0 || rr >= nrow)
continue;
var v = G[cc][rr];
if (v < -1e8)
continue;
s += v;
w++;
}
if (w)
N[c3][r2] = Math.max(G[c3][r2], s / w);
}
G.splice.apply(G, [0, G.length].concat(N));
} };
blur(H, zs.length);
blur(Fz, ys.length);
var nv = o.nv || 46, V = [], I = [];
for (c = 0; c <= nx; c++) {
var x2 = X0 + (X1 - X0) * c / nx, pts = [], amp = o.folds || 0.012, kk = o.k || 40;
zs.forEach(function (zz, r) { pts.push([x2, H[c][r] + off + amp * 0.4 * Math.sin(x2 * kk * 0.6 + zz * 7), zz]); });
var edgeY = H[c][zs.length - 1] + off, zEdge = zs[zs.length - 1] + off * 0.5;
ys.forEach(function (y3, r) { if (y3 > edgeY)
return; var f = (edgeY - y3) / Math.max(0.05, edgeY - o.yFloor), zz = Math.max(zEdge - f * 0.04, Fz[c][r] + off); zz += amp * (0.3 + 1.2 * f) * Math.sin(x2 * kk + f * 1.5); pts.push([x2, y3, zz]); });
var L = [0];
for (var q = 1; q < pts.length; q++)
L.push(L[q - 1] + Math.hypot(pts[q][1] - pts[q - 1][1], pts[q][2] - pts[q - 1][2]));
for (var t = 0; t < nv; t++) {
var want = L[L.length - 1] * t / (nv - 1), q2 = 1;
while (q2 < L.length - 1 && L[q2] < want)
q2++;
var a = pts[q2 - 1], b = pts[q2], f2 = (want - L[q2 - 1]) / Math.max(1e-6, L[q2] - L[q2 - 1]);
V.push(a[0], a[1] + (b[1] - a[1]) * f2, a[2] + (b[2] - a[2]) * f2);
}
}
for (c = 0; c < nx; c++)
for (t = 0; t < nv - 1; t++) {
var i0 = c * nv + t, i1 = i0 + 1, i2 = i0 + nv, i3 = i2 + 1;
I.push(i0, i1, i2, i1, i3, i2);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(V, 3));
G.setIndex(I);
var uv = new Float32Array(V.length / 3 * 2);
for (var u = 0; u < V.length / 3; u++) {
uv[u * 2] = (V[u * 3] + V[u * 3 + 2]) * 1.6;
uv[u * 2 + 1] = V[u * 3 + 1] * 1.6;
}
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
G.computeVertexNormals();
return G;
},
function (a, b, y, o) {
if (!a || !b)
return null;
o = o || {};
var nx = 10, ny = 16, P = [], I = [], len = Math.hypot(b.x - a.x, b.z - a.z) || 0.2, k = o.k || 8, fd = o.folds || 0.03, fl = o.flare || 0.1;
var dir = { x: (b.x - a.x) / len, z: (b.z - a.z) / len }, nrm = { x: -dir.z, z: dir.x };
for (var j = 0; j <= ny; j++) {
var v = j / ny;
for (var i = 0; i <= nx; i++) {
var u = i / nx, spread = (u - 0.5) * fl * v;
var tx = a.x + (b.x - a.x) * u + dir.x * spread, tz = a.z + (b.z - a.z) * u + dir.z * spread, ty = a.y + (b.y - a.y) * u, yy = ty + (y - ty) * v;
var f = Math.sin(u * Math.PI * k / 2 + v * 1.3) * fd * (0.3 + v) + (o.out || 0) * Math.sin(v * Math.PI) * 0.6;
P.push(tx + nrm.x * f, yy, tz + nrm.z * f);
}
}
for (j = 0; j < ny; j++)
for (i = 0; i < nx; i++) {
var q = j * (nx + 1) + i;
I.push(q, q + nx + 1, q + 1, q + 1, q + nx + 1, q + nx + 2);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
G.setIndex(I);
G.computeVertexNormals();
return G;
},
function (o) {
return { key: o.key, sex: o.sex || "m", hair: o.hair || (o.sex === "f" ? ["buns"] : ["beard", "parted"]), clip: o.clip || "Idle_Loop", t: o.t || 0.6, pose: o.pose, h: o.h || 1.82, skin: o.mat || "marble", hairMat: o.hairMat || o.mat || "marble",
drapes: [{ axis: "y", a0: o.sex === "f" ? 1.42 : 1.36, a1: 0.03, parts: [0, 3], off: 0.022, folds: 0.016, flare: 0.07, k: 11, k2: 19, n: 26, round: 0.6, mat: o.robe || o.mat || "marble" },
{ axis: "y", a0: 1.05, a1: 0.62, parts: [0, 3], off: 0.05, folds: 0.02, flare: 0.03, k: 7, n: 10, round: 0.7, mat: o.robe || o.mat || "marble" }],
props: o.props, fallback: o.fallback };
},
function () {
var N = 240, H = N / 2, m = new Uint8Array(N * N), mark = function (x, z, r) {
var c0 = Math.floor((x - r) / 10) + H, c1 = Math.floor((x + r) / 10) + H, r0 = Math.floor((z - r) / 10) + H, r1 = Math.floor((z + r) / 10) + H;
for (var j = Math.max(0, r0); j <= Math.min(N - 1, r1); j++)
for (var i = Math.max(0, c0); i <= Math.min(N - 1, c1); i++)
m[j * N + i] = 1;
};
var K = WND.K;
for (var k in K.lists) {
var L = K.lists[k];
L.solids.forEach(function (s) { mark(s.x, s.z, (s.r || Math.max(s.hw || 0, s.hd || 0)) + 2); });
L.floors.forEach(function (f) { mark((f.x0 + f.x1) / 2, (f.z0 + f.z1) / 2, Math.max(f.x1 - f.x0, f.z1 - f.z0) / 2 + 2); });
L.ramps.forEach(function (f) { mark((f.x0 + f.x1) / 2, (f.z0 + f.z1) / 2, Math.max(f.x1 - f.x0, f.z1 - f.z0) / 2 + 2); });
}
K.spots.forEach(function (s) { mark(s.x, s.z, s.r + 8); });
WND.G.updateMatrixWorld(true);
var gp = new THREE.Vector3().setFromMatrixPosition(WND.G.matrixWorld), bb = new THREE.Box3(), sz = new THREE.Vector3();
for (var vk in WND.vgroups)
WND.vgroups[vk].all.traverse(function (o) {
if (!o.isMesh || !o.geometry)
return;
bb.setFromObject(o);
bb.getSize(sz);
if (sz.y < 1 || Math.max(sz.x, sz.z) < 10 || bb.min.y - gp.y > 4 || Math.max(sz.x, sz.z) > 400)
return;
mark((bb.min.x + bb.max.x) / 2 - gp.x, (bb.min.z + bb.max.z) / 2 - gp.z, Math.max(sz.x, sz.z) / 2 + 3);
});
for (var a in WND_ARRIVE) {
var R = WND_ARRIVE[a];
if (typeof R[0] === "string") {
var A = WND_AT[R[0]];
mark(A.x + R[1], A.z + R[2], 14);
}
}
WND_SITES.forEach(function (r) { var A = WND_AT[r[0]]; mark(A.x, A.z, 40); });
var T = { N: N, H: H, m: m, mark: mark, at: function (x, z) { var i = Math.floor(x / 10) + H, j = Math.floor(z / 10) + H; return i < 0 || j < 0 || i >= N || j >= N ? 0 : m[j * N + i]; },
near: function (x, z, r) { var c = Math.ceil(r / 10), i0 = Math.floor(x / 10) + H, j0 = Math.floor(z / 10) + H, best = 1e9; for (var j = j0 - c; j <= j0 + c; j++)
for (var i = i0 - c; i <= i0 + c; i++) {
if (i < 0 || j < 0 || i >= N || j >= N || !m[j * N + i])
continue;
var d = Math.hypot((i - H + 0.5) * 10 - x, (j - H + 0.5) * 10 - z);
if (d < best)
best = d;
} return best; } };
return T;
},
function (x, z) {
var K = WND.K;
if (!K)
return false;
for (var k in K.lists) {
var W = K.lists[k].water;
for (var i = 0; i < W.length; i++) {
var w = W[i];
if (w.r && Math.hypot(x - w.x, z - w.z) < w.r + 20)
return true;
}
}
var P = WND_AT.pharos, lx = x - P.x, lz = z - P.z;
if (lx < -30 && lx > -360 && Math.abs(lz) < 360)
return true;
var a = (Math.atan2(x, -z) * 180 / Math.PI + 360) % 360;
return wndSeaArc(a) && Math.hypot(x, z) > 980;
},
function (x, z) {
var r = Math.hypot(x, z);
if (r < 150)
return 0;
var a = Math.atan2(x, -z), best = 0, best0 = 0, T = WND.hillT || WND.taken;
for (var k = 0; k < 7; k++) {
var ak = (k + 0.5) * Math.PI * 2 / 7, da = Math.atan2(Math.sin(a - ak), Math.cos(a - ak));
if (Math.abs(da) > 0.6)
continue;
var wig = 22 * Math.sin(r * 0.011 + k * 1.3) + 9 * Math.sin(r * 0.031 + k), d = Math.abs(r * Math.sin(da) - wig), w = Math.min(85, (r - 150) * 0.42);
if (d >= w)
continue;
var end = (k === 3 || k === 4) ? 970 : 1160, rise = Math.min(1, (r - 150) / 230), fall = Math.max(0, Math.min(1, (end - r) / 120)), H = (54 + 16 * Math.sin(k * 2.1 + r * 0.004)) * rise * fall;
var c = 1 - d / w, h = H * c * c * (3 - 2 * c) * (0.86 + 0.14 * Math.sin(r * 0.05 + k * 3) * Math.cos(d * 0.09));
if (k === 0) {
h *= 1.55;
if (h > best0)
best0 = h;
continue;
}
if (h > best)
best = h;
}
if (r > 165 && r < 360) {
var dr = 1e9;
for (var q = 0; q < 7; q++) {
var aq = q * Math.PI * 2 / 7, dq = Math.atan2(Math.sin(a - aq), Math.cos(a - aq));
if (Math.abs(dq) < 1.2) {
var ld = Math.abs(r * Math.sin(dq));
if (ld < dr)
dr = ld;
}
}
var rb = Math.sin(Math.PI * (r - 165) / 195), hb = (50 + 12 * Math.sin(a * 9 + 2)) * rb * rb * Math.min(1, Math.max(0, (dr - 16) / 40));
if (hb > best)
best = hb;
}
if (r > 960) {
var aa = (a * 180 / Math.PI + 360) % 360, sea = wndSeaArc(aa) ? 0 : Math.min(1, Math.min(Math.abs(aa - WND_SEA_A[0]), Math.abs(aa - WND_SEA_A[1])) / 8);
if (wndSeaArc(aa))
sea = 0;
var f = Math.min(1, (r - 960) / 170), ho = (58 + 22 * Math.sin(a * 5 + 1) + 12 * Math.sin(a * 13)) * f * f * (3 - 2 * f) * sea;
if (ho > best)
best = ho;
}
var PA = WND_AT.pyramid, dp = Math.hypot(x - PA.x, z - PA.z);
if (best > 0 && dp < 460)
best *= Math.max(0, (dp - 400) / 60);
if (best0 > 0 && dp < 230)
best0 *= Math.max(0, (dp - 190) / 40);
if (best0 > best)
best = best0;
if (best > 0 && T) {
var n = T.near(x, z, 50);
if (n < 50)
best *= Math.max(0, (n - 12) / 38);
}
return best;
},
function (x, z) {
var H = WND.hillH;
if (!H)
return wndRidgeH(x, z);
var fx = (x + H.R) / H.step, fz = (z + H.R) / H.step, i = Math.floor(fx), j = Math.floor(fz);
if (i < 0 || j < 0 || i >= H.N - 1 || j >= H.N - 1)
return 0;
var u = fx - i, v = fz - j, A = H.h, N = H.N, h0 = A[j * N + i], h1 = A[j * N + i + 1], h2 = A[(j + 1) * N + i], h3 = A[(j + 1) * N + i + 1];
var d = (u + v <= 1) ? h0 + (h1 - h0) * u + (h2 - h0) * v : h3 + (h2 - h3) * (1 - u) + (h1 - h3) * (1 - v);
return Math.max(d, wndRidgeH(x, z));
},
function (T) {
var c = Object.assign({}, T), m = new Uint8Array(T.m);
c.m = m;
c.at = function (x, z) { var i = Math.floor(x / 10) + c.H, j = Math.floor(z / 10) + c.H; return i < 0 || j < 0 || i >= c.N || j >= c.N ? 0 : m[j * c.N + i]; };
c.near = function (x, z, r) { var N = c.N, H = c.H, cc = Math.ceil(r / 10), i0 = Math.floor(x / 10) + H, j0 = Math.floor(z / 10) + H, best = 1e9; for (var j = j0 - cc; j <= j0 + cc; j++)
for (var i = i0 - cc; i <= i0 + cc; i++) {
if (i < 0 || j < 0 || i >= N || j >= N || !m[j * N + i])
continue;
var d = Math.hypot((i - H + 0.5) * 10 - x, (j - H + 0.5) * 10 - z);
if (d < best)
best = d;
} return best; };
c.mark = function () { };
return c;
},
function () {
var lite = WND.lite, step = lite ? 24 : 12, R = 1250, N = Math.round(R * 2 / step) + 1, P = [], C = [], I = [], idx = new Int32Array(N * N).fill(-1), Hh = new Float32Array(N * N);
var pal = [[0xD8B878, 0xC8A060], [0xB8A070, 0x9A8A58], [0x5E8044, 0x8A9A68], [0x587A3E, 0x7A8A58], [0x8A8A5A, 0xA89A70], [0x8A8A58, 0xA89A70], [0xD0BC88, 0xB8A878]];
var col = new THREE.Color(), cA = new THREE.Color(), cB = new THREE.Color(), rock = new THREE.Color(0xA89A88);
for (var j = 0; j < N; j++)
for (var i = 0; i < N; i++) {
var x = -R + i * step, z = -R + j * step;
Hh[j * N + i] = wndRidgeH(x, z);
}
var used = function (i, j) { for (var b = -1; b <= 1; b++)
for (var a = -1; a <= 1; a++) {
var ii = i + a, jj = j + b;
if (ii >= 0 && jj >= 0 && ii < N && jj < N && Hh[jj * N + ii] > 0.05)
return true;
} return false; };
for (j = 0; j < N; j++)
for (i = 0; i < N; i++) {
if (!used(i, j))
continue;
x = -R + i * step;
z = -R + j * step;
var h = Hh[j * N + i];
var ang = (Math.atan2(x, -z) + Math.PI * 2) % (Math.PI * 2), s = Math.floor(ang / (Math.PI * 2 / 7)), fr = ang / (Math.PI * 2 / 7) - s, s2 = (s + 1) % 7, w = Math.max(0, Math.min(1, (fr - 0.3) / 0.4));
cA.setHex(pal[s][0]).lerp(cB.setHex(pal[s2][0]), w);
cB.setHex(pal[s][1]).lerp(col.setHex(pal[s2][1]), w);
col.copy(cA).lerp(cB, Math.min(1, h / 60));
var nn = 0.92 + 0.08 * Math.sin(x * 0.13) * Math.sin(z * 0.11);
col.multiplyScalar(nn);
if (h > 48)
col.lerp(rock, Math.min(0.45, (h - 48) / 40));
idx[j * N + i] = P.length / 3;
P.push(x, h - 0.4, z);
C.push(col.r, col.g, col.b);
}
for (j = 0; j < N - 1; j++)
for (i = 0; i < N - 1; i++) {
var a0 = idx[j * N + i], a1 = idx[j * N + i + 1], a2 = idx[(j + 1) * N + i], a3 = idx[(j + 1) * N + i + 1];
if (a0 < 0 || a1 < 0 || a2 < 0 || a3 < 0)
continue;
if (Hh[j * N + i] + Hh[j * N + i + 1] + Hh[(j + 1) * N + i] + Hh[(j + 1) * N + i + 1] < 0.1)
continue;
I.push(a0, a2, a1, a1, a2, a3);
}
WND.hillH = { R: R, step: step, N: N, h: Hh };
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
G.setAttribute("color", new THREE.Float32BufferAttribute(C, 3));
G.setIndex(I);
G.computeVertexNormals();
var m = new THREE.Mesh(G, new THREE.MeshLambertMaterial({ vertexColors: true }));
m.name = "wnd-hills";
m.userData.keep = 1;
m.receiveShadow = true;
WND.G.add(m);
var sea = new THREE.Mesh(new THREE.RingGeometry(960, 3400, lite ? 24 : 48, 1, (90 - WND_SEA_A[1]) * Math.PI / 180, (WND_SEA_A[1] - WND_SEA_A[0]) * Math.PI / 180), wndMat(0x2A6AA8, null, { phong: 80, spec: 0x88AACC }));
sea.name = "wnd-sea";
sea.userData.keep = 1;
sea.rotation.x = -Math.PI / 2;
sea.position.y = 0.03;
WND.G.add(sea);
WND.G.children.slice().forEach(function (c) { if (c.isMesh && c.geometry && c.geometry.type === "ConeGeometry" && Math.hypot(c.position.x, c.position.z) > 1300 && wndSeaArc((Math.atan2(c.position.x, -c.position.z) * 180 / Math.PI + 360) % 360))
WND.G.remove(c); });
},
function (key, o) {
var A = WND_AT[key], lite = WND.lite, n = lite ? Math.round(o.n * 0.45) : o.n, toC = Math.atan2(-A.z, -A.x), T = WND.taken;
var box = new THREE.BoxGeometry(1, 1, 1), roofG = new THREE.ConeGeometry(0.72, 1, 4, 1);
roofG.rotateY(Math.PI / 4);
var walls = new THREE.InstancedMesh(box, new THREE.MeshLambertMaterial({ color: 0xDCDCDC, map: (typeof texOf === "function" && texOf("plaster")) || null }), n), roofs = o.flat ? null : new THREE.InstancedMesh(roofG, wndMat(o.roof || 0xA85A3A, "tiles"), n);
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), Pv = new THREE.Vector3(), col = new THREE.Color(), placed = 0, tries = 0, seed = key.length * 97 + 11, up = new THREE.Vector3(0, 1, 0);
var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
while (placed < n && tries < n * 30) {
tries++;
var a = rnd() * Math.PI * 2, rad = o.r0 + (o.r1 - o.r0) * Math.sqrt(rnd()), x = Math.cos(a) * rad, z = Math.sin(a) * rad, wx = A.x + x, wz = A.z + z;
var g = Math.abs(((a - toC + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
if (g < 1.0)
continue;
if (o.land && !o.land(x, z))
continue;
if (wndRegion(wx, wz) !== key || wndIsSea(wx, wz) || wndRidgeH(wx, wz) > 0.2)
continue;
var w = 5 + rnd() * 6, d = 5 + rnd() * 6;
if (T.near(wx, wz, Math.max(w, d) * 0.75 + 3) < 1e9)
continue;
var hh = o.h[0] + (o.h[1] - o.h[0]) * rnd(), ry = -a + (rnd() < 0.5 ? 0 : Math.PI / 2);
Q.setFromAxisAngle(up, ry);
Pv.set(x, hh / 2, z);
S.set(w, hh, d);
M.compose(Pv, Q, S);
walls.setMatrixAt(placed, M);
col.setHex(o.col[Math.floor(rnd() * o.col.length)]);
walls.setColorAt(placed, col);
if (roofs) {
var rh = Math.max(w, d) * 0.35;
Pv.set(x, hh + rh / 2, z);
S.set(w * 1.12, rh, d * 1.12);
M.compose(Pv, Q, S);
roofs.setMatrixAt(placed, M);
}
wndSolid(x, z, w / 2, d / 2, 0, hh + 2, ry);
T.mark(wx, wz, Math.max(w, d) * 0.5 + 2);
placed++;
}
walls.count = placed;
if (roofs)
roofs.count = placed;
walls.instanceMatrix.needsUpdate = true;
if (walls.instanceColor)
walls.instanceColor.needsUpdate = true;
walls.name = "wnd-town";
walls.userData.keep = 1;
wndP().add(walls);
if (roofs) {
roofs.name = "wnd-town";
roofs.userData.keep = 1;
wndP().add(roofs);
}
if (o.temple === "ziggurat")
for (var tt = 0; tt < 60; tt++) {
var za = toC + Math.PI + (tt % 2 ? 1 : -1) * Math.floor(tt / 2) * 0.12, zr = 200, zx = Math.cos(za) * zr, zz = Math.sin(za) * zr;
if (wndRegion(A.x + zx, A.z + zz) !== key || T.near(A.x + zx, A.z + zz, 52) < 1e9)
continue;
var zm = wndMat(0xB89868, "brick");
for (var t = 0; t < 7; t++) {
var s2 = 88 - t * 12;
wndBox(s2, 8, s2, t === 6 ? wndMat(0x2A5AA8, null) : zm, zx, 4 + t * 8, zz);
}
wndSolid(zx, zz, 45, 45, 0, 60, 0);
T.mark(A.x + zx, A.z + zz, 50);
break;
}
},
function (key, o) {
var A = WND_AT[key], n = WND.lite ? Math.round(o.n * 0.4) : o.n, seed = key.length * 31, L = WNK.lists[key];
var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }, toC = Math.atan2(-A.z, -A.x);
for (var i = 0, t = 0; i < n && t < n * 8; t++) {
var a = rnd() * Math.PI * 2, rad = o.r0 + (o.r1 - o.r0) * rnd();
var g = Math.abs(((a - toC + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
if (g < 0.1)
continue;
var x = Math.cos(a) * rad, z = Math.sin(a) * rad;
if (wndRegion(A.x + x, A.z + z) !== key || wndRidgeH(A.x + x, A.z + z) > 0.2 || WND.taken.near(A.x + x, A.z + z, 6) < 1e9)
continue;
WND.taken.mark(A.x + x, A.z + z, 3);
wndTree(o.kind[i % o.kind.length], x, 0, z, 0.9 + rnd() * 0.5);
i++;
}
},
function (key) {
var o = WND_SCAT[key], A = WND_AT[key], T = WND.taken, n = WND.lite ? 80 : 260, seed = key.length * 53 + 7, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
var toC = Math.atan2(-A.z, -A.x), road = function (x, z) { var d = Math.hypot(x, z), a = Math.atan2(z, x); return Math.abs(Math.sin(a - toC)) * d < 7 && Math.cos(a - toC) > 0; };
var kinds = [["rock", new THREE.DodecahedronGeometry(1, 0), new THREE.MeshLambertMaterial({ color: o.dry ? 0xB8A27E : 0x9A9488, map: (typeof texOf === "function" && texOf("stone")) || null })],
["bush", new THREE.IcosahedronGeometry(1, 1), new THREE.MeshLambertMaterial({ color: o.dry ? 0x7A7A44 : 0x4A6A2E })],
["tuft", new THREE.ConeGeometry(0.5, 1, 5, 1), new THREE.MeshLambertMaterial({ color: o.dry ? 0xB8A060 : 0x6A8A3A })]];
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), Pv = new THREE.Vector3();
kinds.forEach(function (K) {
var w = o[K[0]] || 0;
if (!w)
return;
var cnt = Math.round(n * w), im = new THREE.InstancedMesh(K[1], K[2], cnt), placed = 0;
for (var t = 0; t < cnt * 6 && placed < cnt; t++) {
var a = rnd() * Math.PI * 2, rad = 50 + rnd() * 280, x = Math.cos(a) * rad, z = Math.sin(a) * rad, wx = A.x + x, wz = A.z + z;
if (road(x, z) || wndRegion(wx, wz) !== key || wndIsSea(wx, wz) || wndRidgeH(wx, wz) > 0.5 || T.at(wx, wz))
continue;
var sc = K[0] === "rock" ? 0.3 + rnd() * rnd() * 1.6 : K[0] === "bush" ? 0.5 + rnd() * 0.9 : 0.3 + rnd() * 0.4;
E.set(K[0] === "rock" ? rnd() * 3 : 0, rnd() * 6.28, 0);
Q.setFromEuler(E);
Pv.set(x, K[0] === "tuft" ? sc * 0.45 : sc * 0.35, z);
S.set(sc, K[0] === "bush" ? sc * 0.7 : K[0] === "rock" ? sc * 0.6 : sc, sc);
M.compose(Pv, Q, S);
im.setMatrixAt(placed++, M);
if (K[0] === "bush" && sc > 0.9)
wndRound(x, z, sc * 0.8, 0, sc * 1.4);
else if (K[0] === "rock" && sc > 0.9)
wndRound(x, z, sc * 0.8, 0, sc);
}
im.count = placed;
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
im.name = "wnd-scatter";
im.receiveShadow = true;
wndP().add(im);
});
},
function (key, list) {
var A = WND_AT[key], spots = (WND.K.spots || []).filter(function (s) { return s.site === key || wndRegion(s.x, s.z) === key; });
var pts = spots.map(function (s) { return [s.x - A.x, s.z - A.z]; });
if (pts.length < 3)
pts = pts.concat([[20, 20], [-20, 20], [20, -20], [-20, -20]]);
list.forEach(function (L) {
var n = WND.lite ? Math.ceil(L[1] * 0.35) : L[1], dress = WND_DRESS[L[0]];
for (var i = 0; i < n; i++) {
var p = pts[(i * 7 + key.length) % pts.length], x = p[0] + ((i * 13) % 9) - 4, z = p[1] + ((i * 29) % 9) - 4;
var look = Object.assign({ sex: i % 3 === 0 ? "f" : "m" }, dress[i % dress.length]);
var g = wndPersonFig("lv_" + key + "_" + L[0] + i, x, 0, z, (i * 1.7) % 6.28, look, "");
WND_LV.people.push({ g: g, site: key, pts: pts, tx: x, tz: z, wait: Math.random() * 6, sp: 0.9 + Math.random() * 0.5 });
}
});
},
function (key, list) {
var A = WND_AT[key];
list.forEach(function (L) {
var n = WND.lite ? Math.ceil(L[1] * 0.5) : L[1];
for (var i = 0; i < n; i++) {
var a = (i / n) * Math.PI * 2 + key.length, r = 70 + ((i * 37) % 60), x = Math.cos(a) * r, z = Math.sin(a) * r, g = null;
if (wndIsSea(A.x + x, A.z + z) || WND.taken.near(A.x + x, A.z + z, 8) < 1e9 || wndRidgeH(A.x + x, A.z + z) > 0.2)
continue;
try {
if (typeof build === "function")
g = build({ id: "wnd_" + key + "_" + L[0] + i, archetype: L[0], attrs: { s: L[0] === "sheep" ? 0.9 : 1.4 }, x: 0, z: 0, rot: 0, solid: false, detail: WND.lite ? 2 : 3, nights: [] });
}
catch (e) {
g = null;
}
if (!g)
continue;
g.position.set(x, 0, z);
g.rotation.y = a;
g.userData.keep = 1;
wndP().add(g);
WND_LV.beasts.push({ g: g, site: key, hx: x, hz: z, tx: x, tz: z, wait: Math.random() * 8, sp: L[0] === "sheep" ? 0.4 : 0.6, r: L[0] === "sheep" ? 10 : 18 });
}
});
},
function (key, n) {
n = WND.lite ? Math.ceil(n * 0.4) : n;
var m = new THREE.MeshBasicMaterial({ color: 0x2A2620, side: THREE.DoubleSide });
for (var i = 0; i < n; i++) {
var g = new THREE.Group(), wl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.28), m), wr = wl.clone();
wl.position.x = -0.45;
wr.position.x = 0.45;
var bl = new THREE.Group(), br = new THREE.Group();
bl.add(wl);
br.add(wr);
g.add(bl);
g.add(br);
bl.rotation.x = br.rotation.x = -Math.PI / 2;
g.position.set(0, 30 + (i % 5) * 6, 0);
wndP().add(g);
g.userData.keep = 1;
WND_LV.birds.push({ g: g, l: bl, r: br, a: i * 2.4, rad: 40 + (i * 17) % 70, sp: 0.12 + (i % 4) * 0.03, y: 25 + (i % 6) * 7, ph: i });
}
},
function (key, list) {
var A = WND_AT[key], L = WNK.lists[key];
list.forEach(function (B) {
var n = WND.lite ? Math.ceil(B[1] * 0.5) : B[1], area = null;
if (B[0] === "euphrates" && L)
L.water.forEach(function (W) { if (!W.r && !W.v)
area = W.boats ? { x: W.x - A.x, z: W.boats.z, hw: W.hw, hd: W.boats.hd } : { x: W.x - A.x, z: W.z - A.z, hw: W.hw, hd: W.hd }; });
if (B[0] === "sea") {
if (key === "pharos")
area = { x: -288, z: 0, r: 56 };
else if (L)
L.water.forEach(function (W) { if (W.r)
area = { x: W.x - A.x, z: W.z - A.z, r: W.r * 0.6 }; });
}
if (!area)
return;
for (var i = 0; i < n; i++) {
var g = wndGroup(area.x, 0, area.z, 0);
g.userData.keep = 1;
wndGalley(g, i % 3 === 2 ? 9 : 14 + (i % 2) * 4, i);
WND_LV.boats.push({ g: g, area: area, a: i * 1.9, sp: 0.025 + (i % 3) * 0.01, ph: i });
}
});
},
function (g, len, v) {
var W = len * 0.16, D = len * 0.09, nx = 14, P = [], I = [], wood = wndMat(0x6A4426, "wood"), dark = wndMat(0x3A2614, "wood");
var half = function (t) { return W * Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.55); }, rise = function (t) { return t > 0.85 ? Math.pow((t - 0.85) / 0.15, 2) * D * 2.2 : t < 0.12 ? Math.pow((0.12 - t) / 0.12, 2) * D * 1.1 : 0; };
for (var i = 0; i <= nx; i++) {
var t = i / nx, z = (t - 0.5) * len, hw = half(t), r = rise(t);
[[0, -D * 0.55], [0.55, -D * 0.42], [0.9, -D * 0.05], [1, D * 0.5]].forEach(function (q) { P.push(-hw * q[0], q[1] + r, z); });
[[1, D * 0.5], [0.9, -D * 0.05], [0.55, -D * 0.42], [0, -D * 0.55]].forEach(function (q) { P.push(hw * q[0], q[1] + r, z); });
}
var cols = 8;
for (i = 0; i < nx; i++)
for (var k = 0; k < cols - 1; k++) {
var a = i * cols + k, b = a + cols;
I.push(a, b, a + 1, a + 1, b, b + 1);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
G.setIndex(I);
G.computeVertexNormals();
var hull = new THREE.Mesh(G, wndMat(v % 2 ? 0x2A2420 : 0x5A3A22, "wood", { ds: 1 }));
hull.material.side = THREE.DoubleSide;
g.add(hull);
wndBox(W * 1.7, 0.12, len * 0.72, wood, 0, D * 0.38, 0, g);
[-1, 1].forEach(function (s) {
var e = new THREE.Mesh(new THREE.CircleGeometry(len * 0.018, 10), wndMat(0xF0E8D8, null));
e.position.set(s * half(0.1) * 1.01, D * 0.2 + rise(0.1), (0.1 - 0.5) * len);
e.rotation.y = s * Math.PI / 2;
g.add(e);
var pu = new THREE.Mesh(new THREE.CircleGeometry(len * 0.008, 8), wndMat(0x101010, null));
pu.position.copy(e.position);
pu.position.x += s * 0.01;
pu.rotation.y = e.rotation.y;
g.add(pu);
});
var mh = len * 0.62;
wndCyl(len * 0.012, mh, dark, 0, D * 0.4 + mh / 2, -len * 0.02, g, 6);
var yd = wndCyl(len * 0.008, len * 0.62, dark, 0, D * 0.4 + mh * 0.92, -len * 0.02, g, 5);
yd.rotation.z = Math.PI / 2;
var sm = wndCanvasMat("ship-sail" + (v % 3), 64, 64, function (x, w, h) {
x.fillStyle = v % 3 === 0 ? "#F2EAD6" : v % 3 === 1 ? "#E8D8B8" : "#F2EAD6";
x.fillRect(0, 0, w, h);
if (v % 3 !== 1) {
x.fillStyle = v % 3 === 0 ? "#A83A2A" : "#3A5A8A";
for (var b = 0; b < 4; b++)
x.fillRect(0, b * 16 + 5, w, 5);
}
x.strokeStyle = "rgba(90,70,50,0.35)";
for (var c = 0; c < 8; c++) {
x.beginPath();
x.moveTo(c * 8, 0);
x.lineTo(c * 8, h);
x.stroke();
}
}, { ds: 1 });
var sg = new THREE.PlaneGeometry(len * 0.58, mh * 0.62, 6, 4), sp = sg.attributes.position;
for (var q = 0; q < sp.count; q++) {
var sx = sp.getX(q) / (len * 0.29);
sp.setZ(q, (1 - sx * sx) * len * 0.05);
}
sg.computeVertexNormals();
var sail = new THREE.Mesh(sg, sm);
sail.position.set(0, D * 0.4 + mh * 0.6, -len * 0.02 + len * 0.012);
g.add(sail);
var oar = wndBox(0.12, 0.12, len * 0.3, dark, W * 1.05, D * 0.2, len * 0.42, g);
oar.rotation.x = 0.5;
g.traverse(function (o) { o.userData.keep = 1; o.raycast = function () { }; });
},
function (g, file, len, fallback) {
var fb = null;
if (fallback) {
fb = new THREE.Group();
g.add(fb);
try {
fallback(fb);
}
catch (e) { }
fb.traverse(function (o) { o.userData.keep = 1; });
}
if (typeof modelsLoader !== "function" || location.protocol === "file:")
return;
var put = function (src) {
var c = src.clone(true), bb = new THREE.Box3().setFromObject(c), sz = bb.getSize(new THREE.Vector3()), k = len / Math.max(sz.x, sz.z, 0.01);
c.scale.multiplyScalar(k);
c.position.set(-(bb.min.x + bb.max.x) / 2 * k, -bb.min.y * k - 0.4, -(bb.min.z + bb.max.z) / 2 * k);
c.traverse(function (m) { m.userData.keep = 1; if (m.isMesh) {
m.raycast = function () { };
if (typeof modelMat === "function" && m.material && !m.material.userData.wnd) {
m.material = modelMat(m.material);
m.material.userData.wnd = 1;
}
} });
if (fb)
g.remove(fb);
g.add(c);
};
var k = "mdl|" + file;
if (WSC.geo[k]) {
if (WSC.geo[k].scene)
put(WSC.geo[k].scene);
else
WSC.geo[k].wait.push(put);
return;
}
WSC.geo[k] = { scene: null, wait: [put] };
modelsLoader(function (L) { L.load("assets/models/" + file, function (gl) { WSC.geo[k].scene = gl.scene; var w = WSC.geo[k].wait; WSC.geo[k].wait = []; w.forEach(function (f) { try {
f(gl.scene);
}
catch (e) { } }); }, undefined, function () { }); });
},
function () {
if (WND_LV.smokeTex)
return WND_LV.smokeTex;
var cv = document.createElement("canvas");
cv.width = cv.height = 64;
var x = cv.getContext("2d"), gr = x.createRadialGradient(32, 32, 2, 32, 32, 30);
gr.addColorStop(0, "rgba(235,230,222,0.85)");
gr.addColorStop(0.5, "rgba(215,210,200,0.35)");
gr.addColorStop(1, "rgba(200,195,185,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 64, 64);
WND_LV.smokeTex = new THREE.CanvasTexture(cv);
return WND_LV.smokeTex;
},
function (key, x, y, z, big) {
var n = WND.lite ? 6 : (big ? 16 : 10), list = [];
for (var i = 0; i < n; i++) {
var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: wndSmokeTex(), transparent: true, depthWrite: false, opacity: 0.5, color: big ? 0xC8C0B8 : 0xE8E4DC }));
s.position.set(x, y, z);
s.userData.keep = 1;
wndP().add(s);
list.push({ s: s, t: i / n });
}
WND_LV.smoke.push({ list: list, x: x, y: y, z: z, big: big, site: key });
},
function () {
var cv = document.createElement("canvas");
cv.width = cv.height = 256;
var x = cv.getContext("2d");
x.fillStyle = "#fff";
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 380; i++) {
var y = Math.random() * 256, px = Math.random() * 256, w = 12 + Math.random() * 40;
x.strokeStyle = "rgba(" + (200 + Math.random() * 55 | 0) + "," + (225 + Math.random() * 30 | 0) + ",255," + (0.25 + Math.random() * 0.4) + ")";
x.lineWidth = 1 + Math.random() * 2;
x.beginPath();
x.moveTo(px, y);
x.quadraticCurveTo(px + w / 2, y - 3, px + w, y);
x.stroke();
}
for (i = 0; i < 500; i++) {
var v = 170 + Math.random() * 60 | 0;
x.fillStyle = "rgba(" + v + "," + (v + 20) + ",255,0.18)";
x.fillRect(Math.random() * 256, Math.random() * 256, 3 + Math.random() * 10, 1.5);
}
var tex = new THREE.CanvasTexture(cv);
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set(40, 40);
var seen = new Set();
WND.G.traverse(function (m) {
if (!m.isMesh || !m.material || seen.has(m.material))
return;
var c = m.material.color;
if (!c)
return;
var h = {};
c.getHSL(h);
if (h.h > 0.52 && h.h < 0.66 && h.s > 0.35 && (m.geometry.type === "CircleGeometry" || m.geometry.type === "PlaneGeometry" || /water|sea|river|pool/i.test(m.name || ""))) {
seen.add(m.material);
if (!m.material.map) {
m.material.map = tex;
m.material.needsUpdate = true;
WND_LV.water.push(tex);
}
}
});
},
function () {
WND_LV.people = [];
WND_LV.beasts = [];
WND_LV.birds = [];
WND_LV.boats = [];
WND_LV.smoke = [];
WND_LV.water = [];
WND.taken = null;
WND.hillT = null;
WND.hillH = null;
try {
WND.taken = wndTaken();
WND.hillT = wndTakenFreeze(WND.taken);
WNK.F = WND.G;
WNK.site = "land";
wndRidges();
}
catch (e) {
if (window.console)
console.warn("[wonders] hills", e);
}
if (!WND.taken)
return;
WND_SITES.forEach(function (r) {
var key = r[0], o = WND_LIFE[key], V = WND.vgroups[key];
if (!o || !V)
return;
WNK.site = key;
WNK.ox = WND_AT[key].x;
WNK.oz = WND_AT[key].z;
var run = function (f) { try {
f();
}
catch (e) {
if (window.console)
console.warn("[wonders] life", key, e);
} };
wndAlways(key);
run(function () { wndScatter(key); });
wndThen(key);
if (o.city)
run(function () { wndTown(key, o.city); });
if (o.trees)
run(function () { wndGrove(key, o.trees); });
if (o.people)
run(function () { wndPeople(key, o.people); });
if (key === "gardens" && typeof babWalkers === "function")
run(function () { babWalkers(); });
if (o.beasts)
run(function () { wndBeasts(key, o.beasts); });
if (o.boats)
run(function () { wndBoats(key, o.boats); });
if (o.smoke)
run(function () { o.smoke.forEach(function (s) { if (s[0] === "fire")
wndSmoke(key, WND_PH.ix, WND_PH.iy + 4 + WND_PH.t1 + WND_PH.t2 + 4, WND_PH.iz, true);
else
wndSmoke(key, s[0], s[2], s[1], false); }); });
if (o.dust)
run(function () { wndDust(key); });
wndAlways(key);
if (o.birds)
run(function () { wndBirds(key, o.birds); });
});
WNK.F = WND.G;
WNK.v = "";
WNK.ox = 0;
WNK.oz = 0;
WNK.site = "hall";
try {
wndWaterWaves();
}
catch (e) { }
},
function (dt) {
var L = WND_LV;
L.t += dt;
var cam = (typeof worldLocal === "function") ? worldLocal() : { x: 0, z: 0 }, near = function (site, g) { var A = WND_AT[site]; return Math.hypot(A.x + g.position.x - cam.x, A.z + g.position.z - cam.z) < 260; };
var W = WLD.w, step = Math.min(dt, 0.05);
L.people.forEach(function (P) {
var g = P.g;
if (!g.parent || !near(P.site, g))
return;
var A = WND_AT[P.site];
if (P.wait > 0) {
P.wait -= step;
return;
}
var dx = P.tx - g.position.x, dz = P.tz - g.position.z, d = Math.hypot(dx, dz);
if (P.route && d < 0.6) {
var nr = P.ri + P.rd;
if (nr < 0 || nr >= P.route.length) {
P.rd = -P.rd;
nr = P.ri + P.rd;
P.wait = 4 + Math.random() * 10;
}
else if (Math.random() < 0.15)
P.wait = 2 + Math.random() * 5;
P.ri = nr;
P.tx = P.route[nr][0] + (Math.random() - 0.5) * 2;
P.tz = P.route[nr][1] + (Math.random() - 0.5) * 2;
P.stuck = 0;
return;
}
if (d < 0.6) {
P.wait = 3 + Math.random() * 9;
var p = P.pts[Math.floor(Math.random() * P.pts.length)];
P.tx = p[0] + (Math.random() - 0.5) * 6;
P.tz = p[1] + (Math.random() - 0.5) * 6;
return;
}
var st = Math.min(d, P.sp * step), nx = g.position.x + dx / d * st, nz = g.position.z + dz / d * st, feet = g.position.y, ny = W.ground(A.x + nx, A.z + nz, feet);
if (P.route && (W.block(A.x + nx, A.z + nz, ny) || Math.abs(ny - feet) > 0.8)) {
P.wait = 0.6;
P.stuck = (P.stuck || 0) + 1;
if (P.stuck > 4) {
P.stuck = 0;
var rp = P.route[P.ri];
g.position.set(rp[0], W.ground(A.x + rp[0], A.z + rp[1], 200), rp[1]);
P.tx = rp[0];
P.tz = rp[1];
}
return;
}
if (W.block(A.x + nx, A.z + nz, ny) || Math.abs(ny - feet) > 0.8) {
P.wait = 1;
var q = P.pts[Math.floor(Math.random() * P.pts.length)];
P.tx = q[0];
P.tz = q[1];
return;
}
g.position.set(nx, ny, nz);
g.rotation.y = Math.atan2(dx, dz);
});
L.beasts.forEach(function (B) {
var g = B.g;
if (!g.parent || !near(B.site, g))
return;
if (B.wait > 0) {
B.wait -= step;
return;
}
var dx = B.tx - g.position.x, dz = B.tz - g.position.z, d = Math.hypot(dx, dz);
if (d < 0.5) {
B.wait = 4 + Math.random() * 12;
var a = Math.random() * 6.283, r = Math.random() * B.r;
B.tx = B.hx + Math.cos(a) * r;
B.tz = B.hz + Math.sin(a) * r;
return;
}
var A = WND_AT[B.site], st = Math.min(d, B.sp * step), nx = g.position.x + dx / d * st, nz = g.position.z + dz / d * st;
if (W.block(A.x + nx, A.z + nz, 0) || wndIsSea(A.x + nx, A.z + nz)) {
B.tx = B.hx;
B.tz = B.hz;
return;
}
g.position.x = nx;
g.position.z = nz;
g.rotation.y = Math.atan2(dx, dz);
});
L.birds.forEach(function (b) { b.a += b.sp * dt; var g = b.g; g.position.set(Math.cos(b.a) * b.rad, b.y + Math.sin(L.t * 0.3 + b.ph) * 3, Math.sin(b.a) * b.rad); g.rotation.y = -b.a; var f = Math.sin(L.t * 7 + b.ph) * 0.6; b.l.rotation.z = f; b.r.rotation.z = -f; });
L.boats.forEach(function (B) {
B.a += B.sp * dt;
var ar = B.area, x, z, hd;
if (ar.r) {
x = ar.x + Math.cos(B.a) * ar.r * (0.5 + 0.4 * Math.sin(B.ph));
z = ar.z + Math.sin(B.a) * ar.r * (0.5 + 0.4 * Math.sin(B.ph));
hd = -B.a;
}
else {
var f = (Math.sin(B.a) + 1) / 2;
x = ar.x + (B.ph % 2 ? 0.3 : -0.3) * ar.hw;
z = ar.z - ar.hd * 0.9 + f * ar.hd * 1.8;
hd = Math.cos(B.a) > 0 ? 0 : Math.PI;
}
B.g.position.set(x, Math.sin(L.t * 1.1 + B.ph) * 0.15, z);
B.g.rotation.set(Math.sin(L.t * 0.9 + B.ph) * 0.03, hd, Math.sin(L.t * 0.7 + B.ph) * 0.04);
});
L.smoke.forEach(function (S) {
var on = S.big ? true : true;
S.list.forEach(function (p) {
p.t += dt * (S.big ? 0.09 : S.dust ? 0.05 : 0.12);
if (p.t > 1)
p.t -= 1;
var t = p.t, s = p.s;
if (S.dust) {
s.position.set(S.x + t * 40, S.y + t * 4, S.z + Math.sin(t * 6) * 3);
s.scale.setScalar(3 + t * 8);
s.material.opacity = 0.22 * Math.sin(t * Math.PI);
s.material.color.setHex(0xD8C090);
return;
}
s.position.set(S.x + t * t * (S.big ? 18 : 5), S.y + t * (S.big ? 40 : 14), S.z + Math.sin(t * 5 + S.x) * 1.5);
s.scale.setScalar((S.big ? 3 : 1) + t * (S.big ? 16 : 6));
s.material.opacity = (S.big ? 0.45 : 0.4) * Math.sin(t * Math.PI) * (on ? 1 : 0);
});
});
L.water.forEach(function (t, i) { t.offset.x = (L.t * 0.004 * (i % 2 ? 1 : -1)) % 1; t.offset.y = (L.t * 0.006) % 1; });
},
function (parent, x, y, z, ry, len, mat, pose, o) {
o = o || {};
var g = wndGroup(x, y, z, ry, parent);
g.name = "wnd-lion";
var m = typeof mat === "string" ? wscMat(mat) : mat, seg = WND.lite ? 10 : 20, L = len;
var blob = function (cx, cy, cz, rx, ryy, rz, rotX, rotZ, mm) { var s = new THREE.Mesh(new THREE.SphereGeometry(1, seg, Math.max(6, seg * 0.7 | 0)), mm || m); s.scale.set(rx * L, ryy * L, rz * L); s.position.set(cx * L, cy * L, cz * L); if (rotX)
s.rotation.x = rotX; if (rotZ)
s.rotation.z = rotZ; s.castShadow = true; s.receiveShadow = true; g.add(s); return s; };
var limb = function (x0, y0, z0, x1, y1, z1, r0, r1) {
var a = new THREE.Vector3(x0 * L, y0 * L, z0 * L), b = new THREE.Vector3(x1 * L, y1 * L, z1 * L), d = b.clone().sub(a), h = d.length();
var c = new THREE.Mesh(new THREE.CylinderGeometry(r1 * L, r0 * L, h, Math.max(8, seg * 0.6 | 0)), m);
c.position.copy(a).add(b).multiplyScalar(0.5);
c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
c.castShadow = true;
g.add(c);
var j = new THREE.Mesh(new THREE.SphereGeometry(r1 * L, seg >> 1, seg >> 2), m);
j.position.copy(b);
g.add(j);
return c;
};
var loft = function (st, cx, ex) {
var n = WND.lite ? 12 : 24, P = [], I = [], se = function (v) { return ex ? Math.sign(v) * Math.pow(Math.abs(v), ex) : v; };
st.forEach(function (q) { for (var i = 0; i <= n; i++) {
var th = i / n * Math.PI * 2, yy = (q[3] + q[2] * se(Math.sin(th))) * L;
P.push((cx + q[1] * se(Math.cos(th))) * L, Math.max(0.003 * L, yy), q[0] * L);
} });
for (var j = 0; j < st.length - 1; j++)
for (var i = 0; i < n; i++) {
var a0 = j * (n + 1) + i, b0 = a0 + n + 1;
I.push(a0, a0 + 1, b0, a0 + 1, b0 + 1, b0);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
G.setIndex(I);
G.computeVertexNormals();
var me = new THREE.Mesh(G, m);
me.castShadow = true;
me.receiveShadow = true;
g.add(me);
return me;
};
if (pose === "couchant") {
loft([[-0.505, 0.03, 0.03, 0.12], [-0.495, 0.12, 0.1, 0.12], [-0.47, 0.16, 0.12, 0.125], [-0.38, 0.18, 0.125, 0.13], [-0.22, 0.175, 0.12, 0.13], [-0.05, 0.155, 0.12, 0.135],
[0.08, 0.16, 0.14, 0.16], [0.2, 0.165, 0.17, 0.18], [0.3, 0.155, 0.17, 0.185], [0.345, 0.145, 0.165, 0.185], [0.365, 0.12, 0.14, 0.185], [0.372, 0.06, 0.07, 0.185], [0.374, 0.005, 0.005, 0.185]], 0, 0.55);
[-1, 1].forEach(function (s) {
blob(s * 0.13, 0.1, -0.3, 0.07, 0.09, 0.15);
loft([[0.16, 0.03, 0.03, 0.09], [0.2, 0.06, 0.075, 0.08], [0.3, 0.058, 0.06, 0.06], [0.42, 0.052, 0.048, 0.045], [0.54, 0.05, 0.04, 0.038], [0.62, 0.058, 0.036, 0.035], [0.66, 0.04, 0.025, 0.03], [0.675, 0.005, 0.005, 0.03]], s * 0.085);
for (var t = 0; t < 4; t++)
blob(s * 0.085 + (t - 1.5) * 0.026, 0.028, 0.655, 0.014, 0.02, 0.022);
blob(s * 0.17, 0.04, -0.06, 0.035, 0.035, 0.08);
});
for (var k = 0; k < 14; k++) {
var u = k / 13, ta = Math.PI * 0.95 * u;
blob(0.13 + Math.sin(ta) * 0.11, 0.025, -0.43 + (1 - Math.cos(ta)) * 0.18, 0.024, 0.022, 0.035);
}
if (o.head !== false) {
blob(0, 0.28, 0.31, 0.17, 0.2, 0.14);
blob(0, 0.36, 0.38, 0.1, 0.1, 0.1);
blob(0, 0.33, 0.47, 0.055, 0.045, 0.06);
[-1, 1].forEach(function (s) { blob(s * 0.06, 0.44, 0.36, 0.025, 0.03, 0.015); });
}
}
else {
blob(0, 0.42, -0.03, 0.13, 0.13, 0.32);
blob(0, 0.47, 0.2, 0.15, 0.17, 0.15);
[-1, 1].forEach(function (s) {
blob(s * 0.08, 0.42, -0.25, 0.08, 0.11, 0.14);
limb(s * 0.09, 0.4, 0.22, s * 0.09, 0.2, 0.24, 0.055, 0.045);
limb(s * 0.09, 0.2, 0.24, s * 0.09, 0.03, 0.25, 0.045, 0.04);
blob(s * 0.09, 0.025, 0.28, 0.045, 0.025, 0.055);
limb(s * 0.09, 0.4, -0.27, s * 0.09, 0.22, -0.32, 0.07, 0.045);
limb(s * 0.09, 0.22, -0.32, s * 0.09, 0.03, -0.28, 0.045, 0.04);
blob(s * 0.09, 0.025, -0.25, 0.045, 0.025, 0.055);
});
for (var k2 = 0; k2 < 9; k2++) {
var u2 = k2 / 8;
blob(0, 0.44 - u2 * 0.22 + Math.sin(u2 * 3) * 0.04, -0.36 - u2 * 0.14, 0.02, 0.02, 0.035);
}
blob(0, 0.58, 0.3, 0.17, 0.19, 0.13);
blob(0, 0.66, 0.37, 0.095, 0.095, 0.1);
blob(0, 0.62, 0.46, 0.05, 0.042, 0.055);
[-1, 1].forEach(function (s) { blob(s * 0.06, 0.74, 0.35, 0.024, 0.03, 0.014); });
}
return g;
},
function (parent, x, y, z, ry, len) {
var g = wndGroup(x, y, z, ry, parent);
var mat = wscMat("limestone");
var lf = wndLionForm(g, 0, 0, 0, 0, len, mat, "couchant", { head: false });
lf.scale.set(1, 0.8, 1.2);
var L = len, hy = 0.36 * L * 0.8, hz = 0.31 * L * 1.2, hs = 0.115 * L;
var nm = wscMat("nemes");
var crown = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.62), nm);
crown.scale.set(hs * 0.6, hs * 0.66, hs * 0.55);
crown.position.set(0, hy + hs * 0.08, hz - hs * 0.28);
g.add(crown);
var wing = new THREE.Mesh(new THREE.CylinderGeometry(hs * 0.6, hs * 1.05, hs * 1.1, 24, 1, true, Math.PI * 0.3, Math.PI * 1.4), nm);
wing.position.set(0, hy - hs * 0.42, hz - hs * 0.2);
g.add(wing);
[-1, 1].forEach(function (s) { var lp = new THREE.Mesh(new THREE.BoxGeometry(hs * 0.34, hs * 1.3, hs * 0.16), nm); lp.position.set(s * hs * 0.5, hy - hs * 0.98, hz + hs * 0.34); lp.rotation.x = -0.12; g.add(lp); });
wndSculpt(g, 0, 0, 0, 0, { key: "sphinx_head", sex: "m", hair: [], clip: "Idle_Loop", t: 0.6, h: 1.82 * hs / 0.24, skin: "limestone", only: [4],
done: function (gg, body, at, s) { var H = at.Head || at.head; if (!H)
return; body.position.set(-H.x * s, hy - H.y * s - hs * 0.12, hz - H.z * s + hs * 0.02); },
fallback: function (fb) { var f = new THREE.Mesh(new THREE.SphereGeometry(hs * 0.5, 16, 12), mat); f.scale.set(0.85, 1.1, 0.9); f.position.set(0, hy, hz + hs * 0.05); fb.add(f); } });
return g;
},
function (x) {
x.clearRect(0, 0, 256, 128);
x.lineJoin = "round";
x.lineCap = "round";
var body = function () {
x.beginPath();
x.moveTo(52, 58);
x.bezierCurveTo(60, 40, 110, 36, 150, 40);
x.bezierCurveTo(178, 40, 196, 36, 206, 44);
x.bezierCurveTo(222, 42, 236, 52, 238, 62);
x.bezierCurveTo(240, 70, 230, 74, 222, 72);
x.lineTo(214, 76);
x.bezierCurveTo(206, 80, 200, 82, 196, 86);
x.lineTo(200, 112);
x.lineTo(206, 118);
x.lineTo(190, 118);
x.lineTo(184, 90);
x.bezierCurveTo(176, 88, 170, 92, 166, 96);
x.lineTo(170, 114);
x.lineTo(176, 118);
x.lineTo(158, 118);
x.lineTo(152, 94);
x.bezierCurveTo(130, 94, 104, 94, 86, 90);
x.lineTo(80, 112);
x.lineTo(86, 118);
x.lineTo(68, 118);
x.lineTo(66, 90);
x.bezierCurveTo(62, 96, 58, 104, 56, 112);
x.lineTo(62, 118);
x.lineTo(44, 118);
x.lineTo(46, 86);
x.bezierCurveTo(40, 76, 42, 64, 52, 58);
x.closePath();
};
body();
x.fillStyle = "#F2E6C8";
x.fill();
x.lineWidth = 3;
x.strokeStyle = "#C89A3A";
x.stroke();
x.fillStyle = "#E8C858";
x.beginPath();
x.moveTo(60, 66);
x.bezierCurveTo(100, 70, 150, 72, 190, 66);
x.bezierCurveTo(170, 84, 100, 88, 62, 80);
x.fill();
x.fillStyle = "#C8603A";
x.beginPath();
x.moveTo(168, 40);
x.bezierCurveTo(180, 30, 206, 30, 214, 42);
x.bezierCurveTo(218, 58, 212, 76, 198, 86);
x.bezierCurveTo(186, 78, 176, 62, 168, 40);
x.fill();
x.strokeStyle = "#E8B848";
x.lineWidth = 2;
for (var i = 0; i < 6; i++) {
x.beginPath();
x.moveTo(176 + i * 6, 38 + i * 2);
x.quadraticCurveTo(182 + i * 5, 56, 190 + i * 3, 76);
x.stroke();
}
x.fillStyle = "#F2E6C8";
x.beginPath();
x.ellipse(224, 60, 12, 10, 0.2, 0, 6.3);
x.fill();
x.fillStyle = "#1A1A1A";
x.beginPath();
x.arc(226, 56, 1.8, 0, 6.3);
x.fill();
x.strokeStyle = "#7A2A1A";
x.lineWidth = 2;
x.beginPath();
x.moveTo(232, 66);
x.lineTo(238, 64);
x.stroke();
x.strokeStyle = "#F2E6C8";
x.lineWidth = 5;
x.beginPath();
x.moveTo(52, 60);
x.bezierCurveTo(30, 52, 24, 30, 34, 20);
x.stroke();
x.fillStyle = "#C8603A";
x.beginPath();
x.ellipse(36, 18, 6, 9, 0.6, 0, 6.3);
x.fill();
x.fillStyle = "#C89A3A";
[[198, 118], [174, 118], [84, 118], [60, 118]].forEach(function (p) { x.fillRect(p[0] - 10, p[1] - 3, 14, 3); });
},
function (x, ox, oy, s) {
x.save();
x.translate(ox, oy);
x.scale(s, s);
x.lineJoin = "round";
x.beginPath();
x.moveTo(20, 40);
x.bezierCurveTo(24, 20, 60, 16, 96, 20);
x.bezierCurveTo(108, 12, 124, 12, 130, 22);
x.bezierCurveTo(138, 26, 142, 34, 140, 40);
x.bezierCurveTo(138, 46, 130, 46, 126, 44);
x.bezierCurveTo(120, 52, 112, 56, 106, 58);
x.lineTo(108, 84);
x.lineTo(98, 84);
x.lineTo(94, 60);
x.lineTo(86, 62);
x.lineTo(88, 84);
x.lineTo(78, 84);
x.lineTo(74, 62);
x.bezierCurveTo(60, 64, 46, 62, 38, 58);
x.lineTo(36, 84);
x.lineTo(26, 84);
x.lineTo(26, 58);
x.lineTo(22, 84);
x.lineTo(12, 84);
x.lineTo(14, 54);
x.bezierCurveTo(12, 48, 14, 44, 20, 40);
x.closePath();
x.fillStyle = "#E8B848";
x.fill();
x.strokeStyle = "#8A5A1A";
x.lineWidth = 2;
x.stroke();
x.fillStyle = "#2A5AB0";
x.beginPath();
x.moveTo(30, 30);
x.bezierCurveTo(60, 26, 90, 28, 110, 34);
x.bezierCurveTo(90, 40, 60, 40, 30, 38);
x.fill();
x.strokeStyle = "#F4E8D0";
x.lineWidth = 4;
x.beginPath();
x.moveTo(124, 16);
x.bezierCurveTo(128, 4, 140, 2, 146, 8);
x.stroke();
x.fillStyle = "#F4E8D0";
x.beginPath();
x.arc(130, 26, 2, 0, 6.3);
x.fill();
x.strokeStyle = "#E8B848";
x.lineWidth = 3;
x.beginPath();
x.moveTo(18, 42);
x.bezierCurveTo(6, 48, 6, 62, 10, 70);
x.stroke();
x.restore();
},
function (x, ox, oy, s) {
x.save();
x.translate(ox, oy);
x.scale(s, s);
x.lineJoin = "round";
x.beginPath();
x.moveTo(18, 46);
x.bezierCurveTo(30, 30, 80, 30, 104, 30);
x.bezierCurveTo(112, 16, 118, 6, 126, 4);
x.bezierCurveTo(134, 4, 142, 10, 144, 16);
x.lineTo(132, 18);
x.bezierCurveTo(124, 24, 120, 32, 116, 42);
x.lineTo(116, 84);
x.lineTo(104, 84);
x.lineTo(102, 52);
x.lineTo(90, 54);
x.lineTo(94, 84);
x.lineTo(82, 84);
x.lineTo(76, 54);
x.bezierCurveTo(60, 56, 46, 54, 38, 52);
x.lineTo(40, 84);
x.lineTo(28, 84);
x.lineTo(24, 54);
x.bezierCurveTo(14, 52, 10, 40, 4, 32);
x.bezierCurveTo(10, 34, 14, 40, 18, 46);
x.closePath();
x.fillStyle = "#F2E6C8";
x.fill();
x.strokeStyle = "#B8862A";
x.lineWidth = 2;
x.stroke();
x.fillStyle = "#E8B848";
for (var i = 0; i < 14; i++) {
x.beginPath();
x.arc(30 + i * 6, 40 + Math.sin(i) * 2, 2.2, 0, 6.3);
x.fill();
}
x.strokeStyle = "#B8862A";
x.lineWidth = 2.5;
x.beginPath();
x.moveTo(128, 4);
x.bezierCurveTo(132, -6, 140, -6, 142, 0);
x.stroke();
x.fillStyle = "#C8603A";
x.beginPath();
x.moveTo(144, 16);
x.lineTo(152, 14);
x.lineTo(144, 19);
x.fill();
x.fillStyle = "#B8862A";
x.fillRect(102, 84, 16, 3);
x.fillRect(80, 84, 16, 3);
x.fillRect(26, 84, 16, 3);
x.restore();
},
function () {
if (BAB.m && BAB.m.at === WND.mats)
return BAB.m;
var lite = WND.lite;
BAB.m = { at: WND.mats,
mud: wndMat(0xCDB48C, "plaster"), mud2: wndMat(0xC2A47A, "plaster"), mud3: wndMat(0xD6C29C, "plaster"),
brick: wndMat(0xB8956A, "brick"), brickD: wndMat(0xA07E58, "brick"), zig: wndMat(0xB49066, "brick"), zig2: wndMat(0xA8845C, "brick"),
pave: wndMat(0xCDBB98, "paving"), earth: wndMat(0x9A7E5C, "earth"), floorH: wndMat(0xB89E78, "earth"),
wood: wndMat(0x7A5634, "wood"), woodD: wndMat(0x4E3420, "wood"), reed: wndMat(0xC8AE6A, null), linen: wndMat(0xE6DAC0, null),
wool: wndMat(0x8A2A2A, null), woolB: wndMat(0x2A3E7A, null), clay: wndMat(0xA8643A, null), clayL: wndMat(0xC08A5A, null),
bitumen: wndMat(0x2A2420, null), gold: wndMat(0xD8B048, "metal", { phong: 90, spec: 0x886622 }), bronze: wndMat(0x9A6A3A, "metal", { phong: 60 }),
blue: wndMat(0x1E4A9A, null, { phong: 50 }), blueL: wndMat(0x3A6AB8, null, { phong: 50 }), yellow: wndMat(0xD8A838, null, { phong: 40 }),
ishtar: wndCanvasMat("ishtar", 512, 256, wndIshtarPaint, { rep: [0.125, 0.25], full: !lite }),
water: wndMat(0x3A7A9A, null, { phong: 60 }), cloth: [wndMat(0xA83A2A, null), wndMat(0x2A5A8A, null), wndMat(0xC8A040, null), wndMat(0x5A3A6A, null), wndMat(0xE0D4B8, null), wndMat(0x3A6A4A, null)] };
return BAB.m;
},
function (o) {
var M = babM(), rise = o.y1 - o.y0, sh = WND.lite ? 0.32 : 0.2, n = Math.max(2, Math.round(Math.abs(rise) / sh)), base = o.base === undefined ? o.y0 : o.base;
var mat = o.mat || M.brick, tr = o.tread || mat, ax = o.axis, cm = (o.c0 + o.c1) / 2, cw = Math.abs(o.c1 - o.c0), dir = o.a1 > o.a0 ? 1 : -1, run = Math.abs(o.a1 - o.a0);
for (var i = 0; i < n; i++) {
var a = o.a0 + dir * run * i / n, b = o.a0 + dir * run * (i + 1) / n, top = o.y0 + rise * (i + 1) / n, hh = top - base, am = (a + b) / 2, al = Math.abs(b - a) + 0.02;
if (hh > 0.25) {
if (ax === "x")
wndBox(al, hh - 0.08, cw, mat, am, base + (hh - 0.08) / 2, cm);
else
wndBox(cw, hh - 0.08, al, mat, cm, base + (hh - 0.08) / 2, am);
}
if (ax === "x")
wndBox(al + 0.05, 0.08, cw + 0.04, tr, am - dir * 0.02, top - 0.04, cm);
else
wndBox(cw + 0.04, 0.08, al + 0.05, tr, cm, top - 0.04, am - dir * 0.02);
}
if (ax === "x")
wndRamp(Math.min(o.a0, o.a1), o.c0, Math.max(o.a0, o.a1), o.c1, "x", o.a0, o.y0, o.a1, o.y1);
else
wndRamp(o.c0, Math.min(o.a0, o.a1), o.c1, Math.max(o.a0, o.a1), "z", o.a0, o.y0, o.a1, o.y1);
var segs = Math.max(1, Math.ceil(run / 3));
for (var s = 0; s < segs; s++) {
var sa = o.a0 + dir * run * s / segs, sb = o.a0 + dir * run * (s + 1) / segs, ya = o.y0 + rise * Math.max(0, (s / segs) - 0.5 / run), hs = ya - base;
if (hs < 0.35)
continue;
var cx = (sa + sb) / 2, hl = Math.abs(sb - sa) / 2;
if (ax === "x")
wndSolid(cx, cm, hl, cw / 2 - 0.4, base, hs);
else
wndSolid(cm, cx, cw / 2 - 0.4, hl, base, hs);
}
var sides = o.sides === undefined ? (o.rail ? "both" : "") : o.sides;
if (sides) {
var rm = o.railMat || mat, rt = 0.45;
[[o.c0 - rt / 2, "lo"], [o.c1 + rt / 2, "hi"]].forEach(function (R) {
if (sides !== "both" && sides !== R[1])
return;
var g = wndGroup(ax === "x" ? (o.a0 + o.a1) / 2 : R[0], (o.y0 + o.y1) / 2 + 0.5, ax === "x" ? R[0] : (o.a0 + o.a1) / 2, 0), len = Math.hypot(run, rise);
var bx = ax === "x" ? wndBox(len, 1.0, rt, rm, 0, 0, 0, g) : wndBox(rt, 1.0, len, rm, 0, 0, 0, g);
if (ax === "x")
bx.rotation.z = Math.atan2(rise, o.a1 - o.a0);
else
bx.rotation.x = -Math.atan2(rise, o.a1 - o.a0);
if (o.base < o.y0 - 0.2 || (o.y0 - base) < 0.1) {
for (var k = 0; k < segs; k++) {
var ka = o.a0 + dir * run * k / segs, kb = o.a0 + dir * run * (k + 1) / segs, ky = o.y0 + rise * (k + 0.5) / segs, kh = ky - base;
if (kh < 0.2)
continue;
if (ax === "x")
wndBox(Math.abs(kb - ka), kh, rt, rm, (ka + kb) / 2, base + kh / 2, R[0]);
else
wndBox(rt, kh, Math.abs(kb - ka), rm, R[0], base + kh / 2, (ka + kb) / 2);
}
}
for (var k2 = 0; k2 < segs; k2++) {
var qa = o.a0 + dir * run * k2 / segs, qb = o.a0 + dir * run * (k2 + 1) / segs, qy = o.y0 + rise * (k2 + 1) / segs;
if (ax === "x")
wndSolid((qa + qb) / 2, R[0], Math.abs(qb - qa) / 2, rt / 2, base, qy + 1 - base);
else
wndSolid(R[0], (qa + qb) / 2, rt / 2, Math.abs(qb - qa) / 2, base, qy + 1 - base);
}
});
}
},
function (x, z, ry, o) {
o = o || {};
var M = babM(), y = o.y || 0, g = wndGroup(x, y, z, ry || 0);
[[-0.9, -0.45], [0.9, -0.45], [-0.9, 0.45], [0.9, 0.45]].forEach(function (p) { wndBox(0.1, 0.42, 0.1, o.legs || M.woodD, p[0], 0.21, p[1], g); });
wndBox(2, 0.1, 1, M.wood, 0, 0.45, 0, g);
wndBox(1.9, 0.14, 0.92, M.linen, 0, 0.56, 0, g);
wndBox(1.2, 0.06, 0.94, o.cover || M.cloth[(Math.abs(x * 3 + z) | 0) % 6], 0.3, 0.65, 0, g);
wndBox(0.36, 0.14, 0.6, M.linen, -0.72, 0.7, 0, g);
if (o.high)
wndBox(0.12, 1.0, 1, M.woodD, -1, 0.9, 0, g);
wndSolid(x, z, ry ? 0.55 : 1.05, ry ? 1.05 : 0.55, y, 0.7);
return g;
},
function (x, z, o) {
o = o || {};
var M = babM(), top = o.gold ? M.gold : M.wood, h = o.h || 0.45, w = o.w || 1.1, d = o.d || 0.7, y = o.y || 0;
wndBox(w, 0.06, d, top, x, y + h, z);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { wndBox(0.06, h, 0.06, o.gold ? M.gold : M.woodD, x + p[0] * (w / 2 - 0.06), y + h / 2, z + p[1] * (d / 2 - 0.06)); });
if (o.bowls)
for (var b = 0; b < o.bowls; b++)
wndCyl(0.12, 0.07, b % 2 ? M.clayL : M.bronze, x - w / 3 + b * w / (o.bowls * 1.2), y + h + 0.06, z, null, 8, 0.08);
wndSolid(x, z, w / 2, d / 2, y, h + 0.1);
},
function (x0, z0, x1, z1, door, seed, o) {
o = o || {};
var M = babM(), h = o.h || (4.6 + ((seed * 7) % 3) * 0.4), t = 0.7, dep = Math.min(4.4, Math.max(3.4, (Math.min(x1 - x0, z1 - z0) - 4) / 2)), wall = [M.mud, M.mud2, M.mud3][seed % 3];
var cx0 = x0 + dep, cx1 = x1 - dep, cz0 = z0 + dep, cz1 = z1 - dep, cxm = (cx0 + cx1) / 2, czm = (cz0 + cz1) / 2, dw = { w: 1.2, h: 2.3, frame: M.woodD };
var pick = function (side, c) { return side === door ? [Object.assign({ at: c }, dw)] : []; };
wndWall("x", x0, x1, z0, 0, h, t, wall, pick("n", cxm + ((seed % 2) ? 1.2 : -1.2)));
wndWall("x", x0, x1, z1, 0, h, t, wall, pick("s", cxm + ((seed % 2) ? -1.2 : 1.2)));
wndWall("z", z0, z1, x0, 0, h, t, wall, pick("w", czm));
wndWall("z", z0, z1, x1, 0, h, t, wall, pick("e", czm));
var iw = wndMat(0xD8C8A6, "plaster"), id = { w: 1.1, h: 2.2 }, ih = h - 0.1;
wndWall("x", x0 + t / 2, x1 - t / 2, cz0, 0, ih, 0.45, iw, [Object.assign({ at: cxm }, id)]);
wndWall("x", x0 + t / 2, x1 - t / 2, cz1, 0, ih, 0.45, iw, [Object.assign({ at: cxm }, id)]);
wndWall("z", cz0, cz1, cx0, 0, ih, 0.45, iw, [Object.assign({ at: czm }, id)]);
wndWall("z", cz0, cz1, cx1, 0, ih, 0.45, iw, [Object.assign({ at: czm }, id)]);
wndBox(x1 - x0 - 0.2, 0.04, z1 - z0 - 0.2, M.floorH, (x0 + x1) / 2, 0.01, (z0 + z1) / 2);
wndBox(cx1 - cx0 - 0.4, 0.06, cz1 - cz0 - 0.4, M.pave, cxm, 0.03, czm);
wndBox(0.4, 0.07, 0.4, M.bitumen, cxm, 0.035, czm);
var rf = wndMat(0xBCA27A, "earth");
wndBox(x1 - x0, 0.35, cz0 - z0, rf, (x0 + x1) / 2, h + 0.17, (z0 + cz0) / 2);
wndBox(x1 - x0, 0.35, z1 - cz1, rf, (x0 + x1) / 2, h + 0.17, (cz1 + z1) / 2);
wndBox(cx0 - x0, 0.35, cz1 - cz0, rf, (x0 + cx0) / 2, h + 0.17, czm);
wndBox(x1 - cx1, 0.35, cz1 - cz0, rf, (cx1 + x1) / 2, h + 0.17, czm);
if (!WND.lite) {
wndBox(x1 - x0 + 0.2, 0.5, 0.3, wall, (x0 + x1) / 2, h + 0.5, z0);
wndBox(x1 - x0 + 0.2, 0.5, 0.3, wall, (x0 + x1) / 2, h + 0.5, z1);
wndBox(0.3, 0.5, z1 - z0, wall, x0, h + 0.5, (z0 + z1) / 2);
wndBox(0.3, 0.5, z1 - z0, wall, x1, h + 0.5, (z0 + z1) / 2);
for (var bm = x0 + 0.8; bm < x1 - 0.4; bm += 1.6) {
wndCyl(0.12, 0.5, M.woodD, bm, h - 0.05, cz0 - 0.05, null, 6).rotation.x = Math.PI / 2;
wndCyl(0.12, 0.5, M.woodD, bm, h - 0.05, cz1 + 0.05, null, 6).rotation.x = Math.PI / 2;
}
}
var bands = { n: [x0, z0, x1, cz0], s: [x0, cz1, x1, z1], w: [x0, cz0, cx0, cz1], e: [cx1, cz0, x1, cz1] }, opp = { n: "s", s: "n", e: "w", w: "e" }, sideA = (door === "n" || door === "s") ? "w" : "n", sideB = (door === "n" || door === "s") ? "e" : "s";
var nm = o.name || "A house of Babylon";
wndArea(cx0, cz0, cx1, cz1, 0, h, nm + " · the courtyard");
var R = function (k) { var b = bands[k]; return { x0: b[0] + t / 2 + 0.1, z0: b[1] + t / 2 + 0.1, x1: b[2] - t / 2 - 0.1, z1: b[3] - t / 2 - 0.1, cx: (b[0] + b[2]) / 2, cz: (b[1] + b[3]) / 2 }; };
var ent = R(door), rec = R(opp[door]), bed = R(sideA), kit = R(sideB);
wndArea(ent.x0, ent.z0, ent.x1, ent.z1, 0, h, nm + " · the entrance room");
wndArea(rec.x0, rec.z0, rec.x1, rec.z1, 0, h, nm + " · the reception room");
wndArea(bed.x0, bed.z0, bed.x1, bed.z1, 0, h, nm + " · the bedroom");
wndArea(kit.x0, kit.z0, kit.x1, kit.z1, 0, h, nm + " · the storeroom and kitchen");
var corner = function (r, k) { var xs = [r.x0 + 0.7, r.x1 - 0.7], zs = [r.z0 + 0.7, r.z1 - 0.7]; return [xs[k & 1], zs[(k >> 1) & 1]]; };
var lite = WND.lite;
var c = corner(ent, seed % 4);
babJar(c[0], 0, c[1], 1.1);
if (!lite) {
c = corner(ent, (seed + 3) % 4);
wndBox(1.4, 0.45, 0.5, wall, c[0], 0.22, c[1]);
}
babMat(rec.cx, rec.cz, Math.min(3, rec.x1 - rec.x0 - 1.4), Math.min(2, rec.z1 - rec.z0 - 1.4));
babTable(rec.cx, rec.cz, { bowls: lite ? 1 : 3 });
if (!lite) {
babStool(rec.cx - 1.0, rec.cz + 0.2);
babStool(rec.cx + 1.0, rec.cz - 0.2);
}
c = corner(rec, (seed + 1) % 4);
babLampStand(c[0], c[1]);
if (opp[door] === "n")
babShrineNiche(rec.cx + 1.6, 1.6, z0 + t / 2 + 0.08, 0);
else if (opp[door] === "s")
babShrineNiche(rec.cx - 1.6, 1.6, z1 - t / 2 - 0.08, Math.PI);
else if (opp[door] === "w")
babShrineNiche(x0 + t / 2 + 0.08, 1.6, rec.cz + 1.4, Math.PI / 2);
else
babShrineNiche(x1 - t / 2 - 0.08, 1.6, rec.cz - 1.4, -Math.PI / 2);
var long = (bed.x1 - bed.x0) > (bed.z1 - bed.z0);
c = corner(bed, (seed + 2) % 4);
babBed(long ? c[0] + (c[0] < bed.cx ? 0.6 : -0.6) : c[0], long ? c[1] : c[1] + (c[1] < bed.cz ? 0.6 : -0.6), long ? 0 : Math.PI / 2);
if (!lite) {
c = corner(bed, (seed + 1) % 4);
babChest(c[0], c[1], long ? 0 : Math.PI / 2);
}
for (var j = 0; j < (lite ? 2 : 4); j++) {
c = corner(kit, j);
babJar(c[0], 0, c[1], 1.3 + ((seed + j) % 3) * 0.15, j % 2 ? M.clayL : M.clay);
}
if (!lite) {
babQuern(kit.cx, kit.cz);
babBasket(kit.cx + 0.9, kit.cz + 0.4);
}
var cw = cx1 - cx0, cd = cz1 - cz0;
babOven(cx0 + 0.9, cz0 + 0.9);
if (!lite && cw > 3 && cd > 3)
babLoom(cx1 - 1.1, czm, Math.PI / 2);
babJar(cx1 - 0.7, 0, cz1 - 0.7, 0.9);
return { x0: x0, z0: z0, x1: x1, z1: z1, court: [cxm, czm], ent: ent, rec: rec, kit: kit, bed: bed };
},
function (r, col, x, y, z, parent, sy) {
var g = (typeof leafGeo === "function") ? leafGeo(Math.max(1, Math.round(r))) : null;
var m = g ? new THREE.Mesh(g, babLeafM(col)) : new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), wndMat(col, "foliage"));
if (g) {
var s = r / Math.max(1, Math.round(r));
m.scale.set(s, s * (sy || 1), s);
}
else if (sy)
m.scale.y = sy;
m.position.set(x, y, z);
(parent || wndP()).add(m);
return m;
},
function () {
return wndCanvasMat("bab-frond", 64, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "#5A4A20";
c.lineWidth = 3;
c.beginPath();
c.moveTo(W / 2, H);
c.lineTo(W / 2, 0);
c.stroke();
for (var i = 8; i < H - 4; i += 5) {
var l = (W / 2 - 2) * Math.sin(Math.PI * (i / H) * 0.95 + 0.15);
c.strokeStyle = ["#3E6A24", "#4A7A2A", "#557E30", "#2F5A1E"][i % 4];
c.lineWidth = 2.2;
c.beginPath();
c.moveTo(W / 2, i);
c.lineTo(W / 2 - l, i - 10);
c.stroke();
c.beginPath();
c.moveTo(W / 2, i);
c.lineTo(W / 2 + l, i - 10);
c.stroke();
}
}, { full: 1, ds: 1 });
},
function () {
if (BAB.frondG && BAB.frondAt === WND.geos)
return BAB.frondG;
var g = new THREE.PlaneGeometry(1.5, 4.2, 1, 8), p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var v = (p.getY(i) + 2.1) / 4.2;
p.setY(i, v * 3.4);
p.setZ(i, v * v * -1.9 + Math.abs(p.getX(i)) * -0.25);
}
g.computeVertexNormals();
BAB.frondG = g;
BAB.frondAt = WND.geos;
WND.geos["bab-frond"] = g;
return g;
},
function (kind, x, y, z, s, parent) {
var P = parent || wndP(), g = wndGroup(x, y, z, (x * 7 + z * 13) % 6.28, P), lite = WND.lite, M = babM();
s = s || 1;
var bark = wndMat(0x6E5638, "bark"), barkP = wndMat(0x8A7250, "bark");
if (kind === "palm") {
var hgt = (9 + ((x * 3 + z) % 3)) * s, lean = 0.05 + ((Math.abs(x + z) | 0) % 5) * 0.012, tr = wndCyl(0.24 * s, hgt, barkP, 0, hgt / 2, 0, g, lite ? 6 : 9, 0.2 * s);
tr.rotation.z = lean;
var top = new THREE.Vector3(-Math.sin(lean) * hgt, hgt * Math.cos(lean), 0), fg = babFrondGeo(), fm = babFrondMat(), nf = lite ? 7 : 13;
for (var f = 0; f < nf; f++) {
var fr = new THREE.Mesh(fg, fm);
fr.position.copy(top);
fr.rotation.order = "YXZ";
fr.rotation.y = f / nf * Math.PI * 2 + (f % 2) * 0.2;
fr.rotation.x = -(0.55 + (f % 3) * 0.22);
fr.scale.setScalar(s * (0.9 + (f % 4) * 0.08));
g.add(fr);
}
if (!lite)
for (var d = 0; d < 4; d++) {
var dc = wndSph(0.32 * s, wndMat(0xB86A20, null), top.x + Math.cos(d * 1.6) * 0.5 * s, top.y - 0.7 * s, Math.sin(d * 1.6) * 0.5 * s, g, 7);
dc.scale.y = 1.6;
}
wndRound(x, z, 0.4 * s, y, hgt);
return g;
}
if (kind === "cypress") {
wndCyl(0.18 * s, 1.2 * s, bark, 0, 0.6 * s, 0, g, 6);
for (var k = 0; k < (lite ? 3 : 6); k++)
babLeaves(1.1 * s * (1 - k * 0.11), 0x33502A, 0, 1.6 * s + k * 1.35 * s, 0, g, 1.5);
wndRound(x, z, 0.8 * s, y, 9 * s);
return g;
}
if (kind === "cedar") {
wndCyl(0.38 * s, 7 * s, bark, 0, 3.5 * s, 0, g, 7, 0.24 * s);
for (var l = 0; l < (lite ? 3 : 5); l++) {
var rr = (3.6 - l * 0.55) * s;
babLeaves(rr, 0x2E4A2A, 0, 3.2 * s + l * 1.25 * s, 0, g, 0.35);
if (!lite)
babLeaves(rr * 0.7, 0x36522E, rr * 0.4, 3.4 * s + l * 1.25 * s, -rr * 0.3, g, 0.4);
}
wndRound(x, z, 0.5 * s, y, 7 * s);
return g;
}
var spec = { pomegranate: [0x4E7A2A, 1.6, 2.2, 4], fig: [0x5E8A34, 2.2, 2.8, 5], tamarisk: [0x7A8A68, 1.8, 3.6, 5], willow: [0x6A8A3A, 2.0, 4.2, 6], olive: [0x7A8A5A, 1.9, 2.6, 4] }[kind] || [0x4E7A2A, 2, 3, 5];
var th = spec[2] * s, t2 = wndCyl(0.2 * s, th, bark, 0, th / 2, 0, g, 6, 0.14 * s);
t2.rotation.z = 0.12;
for (var c = 0; c < (lite ? Math.ceil(spec[3] / 2) : spec[3]); c++) {
var a = c * 2.39, rad = (c ? spec[1] * 0.7 : 0) * s;
babLeaves(spec[1] * s * (c ? 0.75 : 1), spec[0], Math.cos(a) * rad, th + 0.4 * s + ((c * 3) % 2) * 0.5 * s, Math.sin(a) * rad, g, kind === "willow" ? 1.5 : 0.8);
if (kind === "willow" && !lite) {
var dr = babLeaves(1.0 * s, 0x7A9A48, Math.cos(a) * rad * 1.3, th - 0.8 * s, Math.sin(a) * rad * 1.3, g, 2.2);
}
}
if (kind === "pomegranate" && !lite)
for (var q = 0; q < 7; q++)
wndSph(0.11 * s, wndMat(0xB82A22, null), Math.cos(q * 0.9) * 1.3 * s, th + ((q * 5) % 3) * 0.4 * s, Math.sin(q * 0.9) * 1.3 * s, g, 6);
wndRound(x, z, 0.4 * s, y, th + 2 * s);
return g;
},
function () {
var m = wndCanvasMat("bab-vines", 128, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
var cols = ["#2E5A20", "#3A6A26", "#4A7A2E", "#567E36", "#3E5E22"];
for (var st = 0; st < 14; st++) {
var x0 = 4 + st * (W - 8) / 13 + Math.sin(st * 7) * 3, len = H * (0.45 + 0.55 * Math.abs(Math.sin(st * 3.7)));
c.strokeStyle = "#4A3A20";
c.lineWidth = 1;
c.beginPath();
c.moveTo(x0, 0);
c.quadraticCurveTo(x0 + Math.sin(st) * 6, len / 2, x0 + Math.sin(st * 2) * 4, len);
c.stroke();
for (var yy = 0; yy < len; yy += 5) {
var w2 = 3 + ((st * 13 + yy) % 5), xx = x0 + Math.sin(st * 2) * 4 * (yy / len) + ((yy * 7 + st) % 9) - 4;
c.fillStyle = cols[(st + yy) % 5];
c.beginPath();
c.ellipse(xx, yy, w2, w2 * 0.6, ((yy + st) % 6) * 0.5, 0, Math.PI * 2);
c.fill();
if ((yy + st * 3) % 37 === 0) {
c.fillStyle = ["#E8E0F0", "#C83A6A", "#E8C83A"][st % 3];
c.beginPath();
c.arc(xx + 2, yy + 2, 2.2, 0, Math.PI * 2);
c.fill();
}
}
}
}, { full: 1, ds: 1 });
if (!m.userData.bab) {
m.transparent = false;
m.alphaTest = 0.4;
m.side = THREE.DoubleSide;
m.userData.bab = 1;
m.needsUpdate = true;
}
return m;
},
function (x0, z0, x1, z1, y, n, cols) {
if (!n)
return;
var M = new THREE.Matrix4(), q = new THREE.Quaternion(), S = new THREE.Vector3(), Pv = new THREE.Vector3(), seed = Math.abs((x0 * 31 + z0 * 17 + y * 7) | 0) + 3, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
cols.forEach(function (col, ci) {
var cnt = Math.ceil(n / cols.length), im = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.11, 0), new THREE.MeshLambertMaterial({ color: col }), cnt);
for (var i = 0; i < cnt; i++) {
Pv.set(x0 + (x1 - x0) * rnd(), y + 0.3 + rnd() * 0.35, z0 + (z1 - z0) * rnd());
var sc = 0.7 + rnd() * 0.8;
S.set(sc, sc * 0.7, sc);
M.compose(Pv, q, S);
im.setMatrixAt(i, M);
}
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
im.name = "bab-flowers";
wndP().add(im);
});
},
function () {
var D = WND_GDN, lite = WND.lite, M = babM(), vm = babVineM();
var kinds = [["palm", 1.0], ["pomegranate", 1.0], ["fig", 1.0], ["cypress", 0.9], ["cedar", 0.9], ["tamarisk", 1.0], ["olive", 1.0]];
D.tiers.forEach(function (T, i) {
var x0 = T[0], y = T[1] + 0.5, xe = i < 3 ? D.tiers[i + 1][0] - 10 : D.x1 - 2, w = xe - x0, prevY = i ? D.tiers[i - 1][1] + 0.5 : 0, faceH = y - 0.5 - prevY + 0.9;
for (var vz = D.z0 + 2; vz < D.z1 - 1; vz += lite ? 4.2 : 2.1) {
if (Math.abs(vz) < 4.2)
continue;
var vh = faceH * (0.75 + 0.25 * Math.abs(Math.sin(vz * 1.7 + i)));
wndPlane(lite ? 4.2 : 2.4, vh, vm, x0 - 0.18 - (vz % 2 ? 0.04 : 0), y + 0.4 - vh / 2, vz, -Math.PI / 2);
}
[D.z0, D.z1].forEach(function (ez, k) { for (var vx = x0 + 1.5; vx < (i < 3 ? D.tiers[i + 1][0] : D.x1) - 0.5; vx += lite ? 4.2 : 2.2) {
var vh = (y - 0.5) * (0.5 + 0.4 * Math.abs(Math.sin(vx * 1.3 + k)));
wndPlane(lite ? 4.2 : 2.4, vh, vm, vx, y + 0.4 - vh / 2, ez + (k ? 0.18 : -0.18), k ? 0 : Math.PI);
} });
var nt = lite ? 8 : 30, seed = i * 97 + 13, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
for (var t = 0; t < nt; t++) {
var tx = x0 + 4 + rnd() * (w - 6), tz = D.z0 + 5 + rnd() * (D.z1 - D.z0 - 10);
if (Math.abs(tz) < 7)
tz += tz < 0 ? -8 : 8;
if (i === 3 && Math.hypot(tx - 45, tz - 8) < 7)
continue;
if (i === 3 && tx > D.x1 - 14 && tz < -40)
continue;
var kd = kinds[(t + i * 2) % kinds.length];
babTree(kd[0], tx, y, tz, kd[1] * (0.85 + rnd() * 0.35));
}
for (var b = 0; b < (lite ? 10 : 60); b++) {
var bx = x0 + 1.2 + rnd() * (w - 2), bz = D.z0 + 2 + rnd() * (D.z1 - D.z0 - 4);
if (Math.abs(bz) < 4.5 || (i === 3 && Math.hypot(bx - 45, bz - 8) < 4))
continue;
babShrub(bx, y, bz, 0.8 + rnd() * 0.7, [0x4A6E2A, 0x5A7A30, 0x3E6226, 0x6A8A3A][b % 4]);
wndRound(bx, bz, 0.6, y, 1.2);
}
babFlowers(x0 + 0.6, D.z0 + 1, x0 + 2.2, -4.5, y, lite ? 30 : 120, [0xC83A5A, 0xE8C83A, 0xF0F0E8, 0x9A4AC8]);
babFlowers(x0 + 0.6, 4.5, x0 + 2.2, D.z1 - 1, y, lite ? 30 : 120, [0xE86A3A, 0xE8E0A0, 0xC83A3A, 0x6A5AC8]);
if (!lite)
for (var fb = 0; fb < 5; fb++) {
var fx = x0 + 4 + fb * (w - 8) / 5, fz = (fb % 2 ? 1 : -1) * (12 + fb * 7);
babFlowers(fx, fz - 2.5, fx + 3, fz + 2.5, y, 50, [[0xC83A5A, 0xF0F0E8], [0xE8C83A, 0xE86A3A], [0x9A4AC8, 0xF0F0E8]][fb % 3]);
wndBox(3.4, 0.25, 5.4, M.brick, fx + 1.5, y + 0.05, fz);
}
var px = x0 + w * 0.55, pz = (i % 2 ? -1 : 1) * 30, pw = Math.min(10, w * 0.4), pd = 8;
wndBox(pw + 0.8, 0.35, pd + 0.8, M.brick, px, y + 0.17, pz);
wndBox(pw, 0.06, pd, M.water, px, y + 0.3, pz);
wndSolid(px, pz, pw / 2 + 0.4, pd / 2 + 0.4, y, 0.6);
if (!lite)
for (var lp = 0; lp < 7; lp++) {
var pad = new THREE.Mesh(new THREE.CircleGeometry(0.35 + (lp % 3) * 0.1, 10), wndMat(0x4A7A2A, null));
pad.rotation.x = -Math.PI / 2;
pad.position.set(px - pw / 2 + 1 + ((lp * 13) % Math.max(1, pw - 2)), y + 0.34, pz - pd / 2 + 1 + ((lp * 7) % (pd - 2)));
wndP().add(pad);
if (lp % 2 === 0)
wndSph(0.14, wndMat(0xF0C8D8, null), pad.position.x, y + 0.45, pad.position.z, null, 7);
}
babTree("willow", px + pw / 2 + 2, y, pz + (i % 2 ? 3 : -3), 0.9);
wndPlaque("bab-gdn-" + i, ["The first terrace", "The second terrace", "The third terrace", "The top terrace"][i], [
"Date palms, the tree of Babylon: food, timber, rope and shade. Pomegranates and figs for the table. The soil is laid deep over reeds and bitumen, so the trees can root.",
"Writers said the gardens were planted with every kind of tree, and the trees of the queen's mountains among them: cedars and cypresses, here beside the palms of the plain.",
"Water climbs from the river by the shadufs on the east side, runs in channels along each terrace and falls to the one below. Lotus floats in the pools.",
"The top of the gardens, level with the palace roofs: the queen's pavilion, shade, and the whole city below. Etemenanki rises to the south."
][i], 2.2, 1.3, x0 + 3.5, y + 1.1, i % 2 ? 14 : -14, -Math.PI / 2);
});
var T3 = D.tiers[3], ty = T3[1] + 0.5, pg = wndGroup(42, ty, -22, 0), wd = M.wood;
[[-4, -3], [4, -3], [-4, 3], [4, 3], [0, -3], [0, 3]].forEach(function (p) { wndCyl(0.16, 3.2, wd, p[0], 1.6, p[1], pg, 8); wndRound(42 + p[0], -22 + p[1], 0.2, ty, 3.2); });
wndBox(9, 0.25, 7, wndMat(0x8A6A3A, "wood"), 0, 3.3, 0, pg);
for (var vr = -3.6; vr <= 3.6; vr += 1.2)
babLeaves(0.8, 0x4E7A2A, vr, 3.6, ((vr * 3) | 0) % 2 ? 1.6 : -1.6, pg, 0.5);
wndBox(8.4, 0.08, 6.4, wndMat(0x8A2A2A, null), 0, 0.05, 0, pg);
babBed(39.5, -22, Math.PI / 2, { cover: M.woolB, legs: M.gold, y: ty });
wndBox(0.6, 0.25, 0.6, M.cloth[2], 44, ty + 0.12, -24);
wndBox(0.6, 0.25, 0.6, M.cloth[0], 44.8, ty + 0.12, -21);
babTable(42.5, -22, { gold: 1, bowls: 3, w: 1.2, d: 0.7, y: ty });
wndArea(37.5, -25.5, 46.5, -18.5, ty, 4, "The queen's pavilion");
babTalker("amytis", 44.6, ty, -19.6, -2.6);
},
function () {
var D = WND_GDN, sc = D.screw, M = babM(), top = D.tiers[3][1] + 0.5, n = 8, lite = WND.lite;
sc.poles = [];
for (var k = 0; k < n; k++) {
var y = top * (k + 1) / n, x = 74 - k * 1.75, z = -51;
wndBox(1.9, y, 7, M.brickD, x, y / 2, z);
wndBox(1.5, 0.08, 5.4, M.water, x, y + 0.02, z);
wndSolid(x, z, 0.95, 3.5, 0, y);
var pg = wndGroup(x - 0.6, y, z - 2.6, 0);
wndBox(0.18, 2.2, 0.18, M.woodD, 0, 1.1, -0.45, pg);
wndBox(0.18, 2.2, 0.18, M.woodD, 0, 1.1, 0.45, pg);
wndBox(0.12, 0.12, 1.1, M.woodD, 0, 2.2, 0, pg);
var pole = new THREE.Group();
pole.position.set(0, 2.2, 0);
pg.add(pole);
var bar = wndBox(4.6, 0.1, 0.1, M.wood, 0, 0, 0, pole);
bar.position.x = 0.6;
wndSph(0.32, M.clay, -1.5, -0.1, 0, pole, 8);
var rope = wndBox(0.03, 1.6, 0.03, M.reed, 2.85, -0.8, 0, pole);
var bk = wndCyl(0.2, 0.3, M.reed, 2.85, -1.7, 0, pole, 8, 0.25);
pole.rotation.z = 0.25 * (k % 2 ? 1 : -1);
pole.userData.keep = 1;
pg.userData.keep = 1;
sc.poles.push({ p: pole, ph: k * 0.8 });
if (k < n - 1)
wndBox(0.3, 0.25, 0.9, M.brick, x - 0.9, y + 0.6, z - 2.6);
}
wndSolid(66, -51, 8, 3.6, 0, 2.6);
sc.g = null;
sc.helix = null;
sc.crank = null;
wndThen("gardens");
var wm = wndMat(0x5AB8E8, null, { op: 0.75 });
D.water = [];
var ch = wndBox(1, 0.3, 100, wm, 58, top + 0.1, -2);
D.water.push(ch);
ch.visible = false;
sc.channel = ch;
D.tiers.forEach(function (T, i) { if (!i)
return; var fall = wndBox(0.08, T[1] - D.tiers[i - 1][1], 3, wndMat(0x9AD8F4, null, { op: 0.5 }), T[0] - 0.3, (T[1] + D.tiers[i - 1][1]) / 2 + 0.5, -40); fall.visible = false; D.water.push(fall); });
sc.falls = D.water.slice(1);
[[74, 0, -47.6], [67, top * 4 / n, -47.6], [62, top, -47.6]].forEach(function (p, i) {
if (lite && i === 1)
return;
var w = wndPersonFig("shaduf" + i, p[0], p[1], p[2], Math.PI, { top: 0xE8DCC0, bottom: 0xA8784A, skin: 0xA87A54, sex: "m" }, "labourer");
WND.people.push({ g: w, site: "gardens", v: "then:gardens" });
});
wndActSpot("gardens", "screw", 62.5, -46.5, "The shadufs", "work them", function () { wndScrewTurn(); }, { y: top });
wndActSpot("gardens", "screw", 74, -46.5, "The shadufs", "work them", function () { wndScrewTurn(); }, { y: 0 });
wndPlaque("gdn-screw", "The shadufs", "A shaduf is a long pole on a post: a bucket on one end, a weight of clay on the other. Mesopotamians used it from about 2300 BC (it is carved on Akkadian seals). One lifts water two or three metres, so here eight of them stand one above another, each filling the tank above. Strabo, writing in Greek centuries later, said screws lifted the water; the screw is named after Archimedes, who lived three hundred years after Nebuchadnezzar, so this Babylon uses what Babylon had.", 3.2, 2.2, 58.6, top + 1.7, -55.5, 0);
},
function (cx, cz, w, d, y0, y1, mat, step) {
var e = step || (WND.lite ? 7 : 4.2), h = y1 - y0;
for (var a = -w / 2 + e / 2; a < w / 2; a += e) {
wndBox(1.3, h, 0.7, mat, cx + a, y0 + h / 2, cz - d / 2 - 0.3);
wndBox(1.3, h, 0.7, mat, cx + a, y0 + h / 2, cz + d / 2 + 0.3);
}
for (var b = -d / 2 + e / 2; b < d / 2; b += e) {
wndBox(0.7, h, 1.3, mat, cx - w / 2 - 0.3, y0 + h / 2, cz + b);
wndBox(0.7, h, 1.3, mat, cx + w / 2 + 0.3, y0 + h / 2, cz + b);
}
if (!WND.lite)
for (var yy = y0 + 2.4; yy < y1 - 0.5; yy += 2.4) {
var m = babM().bitumen;
wndBox(w + 0.1, 0.12, 0.06, m, cx, yy, cz - d / 2 - 0.02);
wndBox(w + 0.1, 0.12, 0.06, m, cx, yy, cz + d / 2 + 0.02);
wndBox(0.06, 0.12, d + 0.1, m, cx - w / 2 - 0.02, yy, cz);
wndBox(0.06, 0.12, d + 0.1, m, cx + w / 2 + 0.02, yy, cz);
}
},
function () {
babChunk("zig");
var E = BAB.E, M = babM(), S = BAB.stages, lite = WND.lite;
S.forEach(function (s, i) {
var y0 = i ? S[i - 1][2] : 0, top = s[2], mat = i % 2 ? M.zig2 : M.zig;
wndBox(s[0], top - y0, s[1], mat, E.x, y0 + (top - y0) / 2, E.z);
if (i < 2 || !lite)
babZigFaces(E.x, E.z, s[0], s[1], y0, top, mat, i >= 2 ? 5 : null);
wndSolid(E.x, E.z, s[0] / 2, s[1] / 2, 0, top);
wndFloor(E.x - s[0] / 2, E.z - s[1] / 2, E.x + s[0] / 2, E.z + s[1] / 2, top);
wndBox(s[0] + 0.4, 0.5, s[1] + 0.4, M.brickD, E.x, top - 0.25, E.z);
babMerlons("x", E.x - s[0] / 2, E.x + s[0] / 2, E.z - s[1] / 2 + 0.3, top, 0.6, mat, lite ? 6 : 3);
});
var nf = function (i) { return E.z - S[i][1] / 2; };
var y2 = S[1][2], a1 = nf(1), a0 = a1 - 70;
babStair({ axis: "z", a0: a0, a1: a1, y0: 0, y1: y2, c0: -4.5, c1: 4.5, base: 0, mat: M.zig, tread: M.brick, rail: 1, railMat: M.zig2 });
wndArea(-4.5, a0, 4.5, a1, 0, y2 + 4, "Etemenanki · the great stair");
[[-1], [1]].forEach(function (sd) {
sd = sd[0];
babStair({ axis: "x", a0: E.x + sd * 44, a1: E.x + sd * 6.2, y0: 0, y1: S[0][2], c0: nf(0) - 6.5, c1: nf(0), base: 0, mat: M.zig, tread: M.brick, sides: "lo", railMat: M.zig2 });
wndArea(Math.min(E.x + sd * 44, E.x + sd * 6.2), nf(0) - 6.5, Math.max(E.x + sd * 44, E.x + sd * 6.2), nf(0), 0, S[0][2] + 4, "Etemenanki · the side stair");
});
wndBox(4.5, 9, 4, M.zig2, -6.75, 4.5, a0 - 3);
wndBox(4.5, 9, 4, M.zig2, 6.75, 4.5, a0 - 3);
wndBox(18, 2.6, 4, M.zig2, 0, 10.3, a0 - 3);
wndBox(9, 0.4, 4.1, M.blue, 0, 8.8, a0 - 3);
wndSolid(-6.75, a0 - 3, 2.25, 2, 0, 9);
wndSolid(6.75, a0 - 3, 2.25, 2, 0, 9);
wndFloor(-2.5, a0 - 5, 2.5, a0 - 1, 0);
for (var k = 1; k < S.length - 1; k++) {
var lo = S[k][2], hi = S[k + 1][2], face = nf(k + 1), east = k % 2 === 1;
babStair({ axis: "x", a0: east ? 6 : 16, a1: east ? 16 : 6, y0: lo, y1: hi, c0: face - 3, c1: face, base: lo, mat: M.zig2, tread: M.brick, sides: "lo", railMat: M.zig });
}
var ty = BAB.templeY, tz0 = E.z - 10.5, room = wndRoom({ x0: -12, x1: 12, z0: tz0, z1: tz0 + 21, y: ty, h: 10, floor: M.pave, wall: M.blue, ceil: wndMat(0x6A4A2A, "wood"), inset: 0,
doors: { n: [{ at: 0, w: 3, h: 5.2, frame: M.gold }] }, name: "Etemenanki · the temple on the top" });
wndBox(25, 1, 22, M.gold, 0, ty + 10.6, tz0 + 10.5);
if (!lite)
for (var hz = 0; hz < 4; hz++) {
var hx = hz % 2 ? 11.5 : -11.5, hzz = hz < 2 ? tz0 + 0.5 : tz0 + 20.5;
wndCyl(0.15, 1.6, M.gold, hx, ty + 11.8, hzz, null, 6, 0.4).rotation.z = hz % 2 ? -0.4 : 0.4;
}
babMerlons("x", -12, 12, tz0, ty + 10, 0.5, M.blueL, 1.6);
babBed(0, tz0 + 16, 0, { cover: M.woolB, legs: M.gold, high: 1, y: ty });
babTable(4, tz0 + 15.5, { gold: 1, w: 1.6, d: 0.9, h: 0.8, bowls: 2, y: ty });
wndBox(6, 0.03, 4, wndMat(0x8A2A2A, null), 0, ty + 0.03, tz0 + 16);
[[-9, tz0 + 3], [9, tz0 + 3], [-9, tz0 + 18], [9, tz0 + 18]].forEach(function (p) { babLampStand(p[0], p[1], ty); });
wndCyl(0.35, 0.9, M.bronze, -4, ty + 0.45, tz0 + 15, null, 10, 0.2);
wndLamp(-4, ty + 1.2, tz0 + 15, 0xFFC880, 1.2);
wndPlaque("bab-zig-top", "The temple on the top", "Herodotus (Histories, Book 1, 181) says the topmost tower held a great temple with a large couch, richly covered, and a golden table beside it, and no statue at all. Here the god Marduk was thought to come down to rest. You stand 91 metres up, as high as a thirty-storey building.", 2.4, 1.6, -11.6, ty + 2.2, tz0 + 10, Math.PI / 2);
babTalker("zigpriest", 6.5, ty, tz0 + 12, -Math.PI / 2);
wndPlaque("bab-zig", "Etemenanki", "'The house of the foundation of heaven and earth': the ziggurat of Marduk, finished by Nebuchadnezzar II about 590 BC. The Esagila Tablet gives its measures: 91 m a side and 91 m high, in seven stages, the temple on top. Ziggurats are not pyramids: they are solid stepped towers of mud brick faced with baked brick, climbed by stairs, with a temple at the top and no tomb inside. Many think it was the Tower of Babel of the Bible. Alexander the Great had it pulled down to rebuild it, and died before he could.", 3.6, 2.4, -9.5, 2.2, a0 - 1.2, Math.PI);
wndNowL("gardens");
wndPlaque("bab-zig-now", "Etemenanki today", "Its bricks were carried off for 2,000 years. All that is left is the outline of its base: a square hollow 91 m a side, which fills with water in the wet season.", 3, 1.6, E.x, 1.6, E.z - 50, Math.PI);
[[0, -45.5, 91, 2], [0, 45.5, 91, 2], [-45.5, 0, 2, 91], [45.5, 0, 2, 91]].forEach(function (r) { wndBox(r[2], 0.8, r[3], wndMat(0xA88E68, "earth"), E.x + r[0], 0.4, E.z + r[1]); });
wndThen("gardens");
babChunk("");
},
function () {
babChunk("esg");
var M = babM(), lite = WND.lite, x0 = -108, x1 = -58, z0 = 150, z1 = 202, h = 12, wm = M.brick, t = 1.6;
wndWall("x", x0, x1, z0, 0, h, t, wm);
wndWall("x", x0, x1, z1, 0, h, t, wm);
wndWall("z", z0, z1, x0, 0, h, t, wm);
wndWall("z", z0, z1, x1, 0, h, t, wm, [{ at: 176, w: 4, h: 7, frame: M.gold }]);
babMerlons("x", x0, x1, z0, h, t, wm);
babMerlons("x", x0, x1, z1, h, t, wm);
babMerlons("z", z0, z1, x0, h, t, wm);
babMerlons("z", z0, z1, x1, h, t, wm);
if (!lite)
for (var bz = z0 + 3; bz < z1; bz += 5) {
if (Math.abs(bz - 176) < 4)
continue;
wndBox(0.6, h, 1.4, wm, x1 + 0.9, h / 2, bz);
}
[[-1], [1]].forEach(function (s) { s = s[0]; wndBox(4, h + 3, 4, M.brickD, x1 + 1, (h + 3) / 2, 176 + s * 5); wndSolid(x1 + 1, 176 + s * 5, 2, 2, 0, h + 3); });
wndBox(9, 0.4, 1, M.blue, x1 + 0.9, 7.6, 176);
wndBox(0.3, 1.2, 8, M.ishtar, x1 + 1.9, 8.6, 176);
wndBox(x1 - x0 - 3, 0.08, z1 - z0 - 3, M.pave, (x0 + x1) / 2, 0.04, (z0 + z1) / 2);
wndArea(-90, 160, -60, 192, 0, h, "Esagila · the court");
wndCyl(1.6, 0.8, M.brick, -75, 0.4, 176, null, 16);
wndCyl(1.4, 0.06, M.water, -75, 0.78, 176, null, 16);
wndRound(-75, 176, 1.6, 0, 0.8);
wndRoom({ x0: -107, x1: -90, z0: 161, z1: 191, h: 11, floor: wndMat(0xC8B490, "paving"), wall: wndMat(0xE0C890, "plaster"), ceil: wndMat(0x5A3A22, "wood"), inset: 0, doors: { e: [{ at: 176, w: 4, h: 7, frame: M.gold }] }, name: "Esagila · the cella of Marduk" });
var G = wndGroup(-104, 0, 176, Math.PI / 2), gold = M.gold;
wndBox(3.2, 1.2, 3.6, M.brickD, 0, 0.6, 0, G);
wndBox(2.2, 2.4, 0.4, gold, 0, 2.4, -1.1, G);
wndBox(2.4, 0.4, 2, gold, 0, 1.6, -0.1, G);
var robe = wndCyl(0.75, 2.6, gold, 0, 3, 0.1, G, 14, 0.55);
var hd = wndSph(0.42, gold, 0, 4.75, 0.2, G, 14);
var beard = wndBox(0.5, 0.6, 0.25, wndMat(0x2A4A9A, null, { phong: 60 }), 0, 4.35, 0.55, G);
var crown = wndCyl(0.42, 0.75, gold, 0, 5.4, 0.2, G, 12, 0.48);
for (var ho = 0; ho < 3; ho++)
wndBox(0.9, 0.06, 0.06, wndMat(0xE8C860, null), 0, 5.15 + ho * 0.22, 0.62, G);
wndBox(0.3, 1.0, 0.3, gold, -0.85, 2.9, 0.6, G);
wndBox(0.3, 1.0, 0.3, gold, 0.85, 2.9, 0.6, G);
wndBox(1.2, 0.3, 0.8, gold, 0, 1.35, 1.4, G);
wndSph(0.3, wndMat(0x2A4A9A, null), 0.6, 3.4, 0.9, G, 8);
wndSolid(-104, 176, 1.8, 2.2, 0, 6);
babTable(-99, 176, { gold: 1, w: 1.6, d: 0.9, h: 0.85, bowls: 3 });
var dg = wndGroup(-101, 0, 171, Math.PI / 2), dm = wndMat(0xC8A038, "metal", { phong: 60 });
wndBox(1.6, 0.6, 0.5, dm, 0, 1.3, 0, dg);
wndBox(0.25, 1.1, 0.25, dm, 0.6, 0.55, 0, dg);
wndBox(0.25, 1.1, 0.25, dm, -0.6, 0.55, 0, dg);
wndCyl(0.15, 1.0, dm, 1.0, 1.8, 0, dg, 8).rotation.z = -0.5;
wndBox(0.5, 0.25, 0.3, dm, 1.3, 2.25, 0, dg);
var tl = wndCyl(0.1, 1.2, dm, -1.2, 1.5, 0, dg, 6, 0.04);
tl.rotation.z = 1.0;
wndSolid(-101, 171, 0.6, 1.0, 0, 2.4);
for (var lp = 0; lp < 4; lp++)
babLampStand(-97, 164 + lp * 8);
wndBox(0.12, 9, 26, wndMat(0x2A4A8A, null), -106.8, 5.5, 176);
for (var st = 0; st < 12; st++)
wndSph(0.18, M.gold, -106.7, 2 + ((st * 5) % 8), 165 + st * 2, null, 6);
wndPlaque("bab-esg", "Esagila", "'The house whose top is high': the great temple of Marduk, god of Babylon. Herodotus (Book 1, 183) was told its golden statue of the seated god, with the throne, footstool and table, used 800 talents of gold. At the New Year festival (Akitu) the king took Marduk's hand here, and the statue was carried in procession along the Processional Way.", 2.6, 1.7, -91, 2.2, 184, -Math.PI / 2);
babTalker("esgpriest", -93, 0, 170, -Math.PI / 2);
var shr = [["Esagila · the shrine of Zarpanitu", -107, -90, 151, 159.4, "s", -98.5], ["Esagila · the shrine of Nabu", -89, -73, 151, 159.4, "s", -81], ["Esagila · the shrine of Ea", -107, -90, 192.6, 201, "n", -98.5], ["Esagila · the tablet room", -89, -73, 192.6, 201, "n", -81]];
shr.forEach(function (r, i) {
var dd = {};
dd[r[5]] = [{ at: r[6], w: 2, h: 3.4, frame: M.gold }];
wndRoom({ x0: r[1], x1: r[2], z0: r[3], z1: r[4], h: 7, floor: M.pave, wall: wndMat(0xE0C890, "plaster"), ceil: wndMat(0x5A3A22, "wood"), inset: 0, doors: dd, name: r[0] });
var cz = r[5] === "s" ? r[3] + 2.2 : r[4] - 2.2, cx = (r[1] + r[2]) / 2;
if (i < 3) {
wndBox(2.4, 1, 1.6, M.brickD, cx, 0.5, cz);
var f = wndCyl(0.4, 1.8, i === 0 ? wndMat(0xC8A048, "metal", { phong: 60 }) : i === 1 ? M.blueL : wndMat(0x3A7AA8, null), cx, 1.9, cz, null, 10, 0.3);
wndSph(0.28, M.gold, cx, 3.0, cz, null, 10);
wndSolid(cx, cz, 1.2, 0.8, 0, 3.2);
babLampStand(cx - 2.5, cz);
babLampStand(cx + 2.5, cz);
}
else {
for (var sh = 0; sh < 3; sh++) {
wndBox(5, 0.08, 0.6, M.wood, cx - 0.5, 0.8 + sh * 0.6, cz + 0.5);
babTablets(cx - 2.4, 0.84 + sh * 0.6, cz + 0.3, lite ? 4 : 12);
}
babTable(cx + 2, cz - 2.2, { bowls: 1 });
babStool(cx + 2, cz - 1.2);
}
});
babChunk("");
},
function (x, W, H) {
x.fillStyle = "#1E4A9A";
x.fillRect(0, 0, W, H);
var k = W / 1024;
x.save();
x.scale(k, k);
H = 256;
for (var r = 0; r < 16; r++)
for (var c = 0; c < 32; c++) {
x.fillStyle = ["#2456AE", "#1A3E88", "#20509E", "#1C4692", "#2A5CB4"][(r * 7 + c * 13) % 5];
x.fillRect(c * 32 + (r % 2) * 16, r * 16, 30, 14);
}
for (var i = 0; i < 6; i++) {
var px = i * 170 + 85;
x.fillStyle = "#E8C048";
x.fillRect(px - 6, 40, 12, 120);
x.fillStyle = "#F2EEDC";
x.beginPath();
x.arc(px - 14, 40, 12, 0, Math.PI * 2);
x.arc(px + 14, 40, 12, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#1E4A9A";
x.beginPath();
x.arc(px - 14, 40, 6, 0, Math.PI * 2);
x.arc(px + 14, 40, 6, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#E8C048";
x.beginPath();
x.arc(px - 14, 72, 10, 0, Math.PI * 2);
x.arc(px + 14, 72, 10, 0, Math.PI * 2);
x.fill();
if (i < 5) {
x.strokeStyle = "#F2EEDC";
x.lineWidth = 4;
x.beginPath();
x.moveTo(px + 20, 20);
x.quadraticCurveTo(px + 85, 60, px + 150, 20);
x.stroke();
wndRosette(x, px + 85, 30, 9);
}
}
x.fillStyle = "#E8B848";
x.fillRect(0, 166, 1024, 4);
for (i = 0; i < 26; i++)
wndRosette(x, i * 40 + 20, 178, 7);
x.restore();
x.save();
x.scale(k, k);
x.translate(0, 0);
for (i = 0; i < 4; i++) {
x.save();
x.translate(60 + i * 250, 186);
x.scale(0.6, 0.6);
try {
wndGlazeLion(x, 256, 128);
}
catch (e) { }
x.restore();
}
x.restore();
},
function () {
babChunk("pal");
var M = babM(), lite = WND.lite, x0 = -66, x1 = 56, z0 = -162, z1 = -66, h = 11, t = 2, wm = M.brick;
wndWall("x", x0, x1, z0, 0, h, t, wm);
wndWall("x", x0, x1, z1, 0, h, t, wm, [{ at: -40, w: 3, h: 4.5, frame: M.woodD }]);
wndWall("z", z0, z1, x0, 0, h, t, wm, [{ at: -112, w: 5, h: 7.5, frame: M.gold }]);
wndWall("z", z0, z1, x1, 0, h, t, wm);
babMerlons("x", x0, x1, z0, h, t, wm);
babMerlons("x", x0, x1, z1, h, t, wm);
babMerlons("z", z0, z1, x0, h, t, wm);
babMerlons("z", z0, z1, x1, h, t, wm);
[[-1], [1]].forEach(function (s) { s = s[0]; wndBox(5, h + 4, 5, M.brickD, x0 - 0.5, (h + 4) / 2, -112 + s * 5.5); wndSolid(x0 - 0.5, -112 + s * 5.5, 2.5, 2.5, 0, h + 4); });
wndBox(0.4, 3, 10, M.ishtar, x0 - 1.2, 9, -112);
wndSign(["THE SOUTHERN PALACE", "of Nebuchadnezzar II"], 6, 1.2, "#1E3A7A", "#F4D88A", x0 - 3.2, 4.2, -120, -Math.PI / 2);
wndBox(x1 - x0 - 4, 0.08, z1 - z0 - 4, M.pave, (x0 + x1) / 2, 0.04, (z0 + z1) / 2);
wndWall("z", z0 + 1, z1 - 1, -20, 0, h - 1, 1.6, wm, [{ at: -104, w: 4, h: 6, frame: M.gold }]);
wndArea(x0 + 1, z0 + 1, -20, z1 - 1, 0, h, "The Southern Palace · the entrance court");
wndArea(-20, -141, 42, z1 - 1, 0, h, "The Southern Palace · the central court");
var tz0 = z0 + 1, tz1 = tz0 + 17, tm = wndMat(0xE8DCC0, "plaster");
wndRoom({ x0: -10, x1: 42, z0: tz0, z1: tz1, h: 14, floor: wndMat(0xC8B490, "paving"), wall: tm, ceil: wndMat(0x5A3A22, "wood"), inset: 0,
doors: { s: [{ at: 2, w: 3, h: 6, frame: M.gold }, { at: 16, w: 5, h: 8, frame: M.gold }, { at: 30, w: 3, h: 6, frame: M.gold }] }, name: "The Southern Palace · the throne room" });
var fm = wndCanvasMat("bab-throne", 1024, 256, babThronePaint, { full: !lite });
[[-10, 0.5], [3.5, 14.5], [18.5, 28.5], [31.5, 42]].forEach(function (s) { var w = s[1] - s[0]; if (w < 0.5)
return; wndBox(w, 7, 0.12, fm, (s[0] + s[1]) / 2, 9.5, tz1 + 0.28); });
wndBox(51.4, 3, 0.1, fm, 16, 9.5, tz0 + 0.27);
wndBox(0.1, 3, 16, fm, -9.73, 9.5, (tz0 + tz1) / 2);
wndBox(0.1, 3, 16, fm, 41.73, 9.5, (tz0 + tz1) / 2);
for (var gl = 0; gl < 5; gl++)
wndLamp(-4 + gl * 10, 6, tz0 + 8.5, 0xFFD8A0, 4);
wndBox(7, 3, 1.4, tm, 16, 7, tz0 + 0.7);
wndBox(6.6, 5.6, 0.1, M.ishtar, 16, 2.8, tz0 + 0.27);
wndBox(6, 0.6, 3.4, M.brickD, 16, 0.3, tz0 + 2.4);
wndFloor(13, tz0 + 0.8, 19, tz0 + 4.1, 0.6);
var th = wndGroup(16, 0.6, tz0 + 1.9, 0);
wndBox(1.6, 0.6, 1.1, M.gold, 0, 0.45, 0, th);
wndBox(1.6, 1.9, 0.18, M.gold, 0, 1.3, -0.5, th);
wndBox(0.16, 0.5, 1, M.gold, -0.75, 1.0, 0, th);
wndBox(0.16, 0.5, 1, M.gold, 0.75, 1.0, 0, th);
wndBox(1.2, 0.14, 0.6, M.woolB, 0, 0.8, 0.05, th);
wndBox(0.8, 0.16, 0.5, M.gold, 0, 0.08, 0.8, th);
wndSolid(16, tz0 + 1.9, 0.85, 0.6, 0.6, 1.8);
wndBox(44, 0.03, 4, wndMat(0x7A2A2A, null), 16, 0.04, tz0 + 9);
for (var lp = 0; lp < 6; lp++)
babLampStand(-6 + lp * 9, tz0 + 4);
wndPlaque("bab-throne", "The throne room", "Nebuchadnezzar's throne room, 52 m long and 17 m wide, with the throne in the niche facing the middle door. Its front on the court was faced with glazed bricks: lions striding below, palm columns and palmettes above. Koldewey's team found the pieces, and the front stands again in the Pergamon Museum, Berlin.", 2.6, 1.7, -9.6, 2.2, tz0 + 9, Math.PI / 2);
babTalker("king", 16, 0.6, tz0 + 3.8, 0);
[[11, tz0 + 5], [21, tz0 + 5]].forEach(function (p, i) {
var gd = wndPersonFig("palguard" + i, p[0], 0, p[1], 0, { top: 0x8A2A2A, bottom: 0x6A3A2A, skin: 0x9A6A44, sex: "m" }, "guard");
WND.people.push({ g: gd, site: "gardens", v: "then:gardens" });
wndCyl(0.03, 2.6, M.woodD, p[0] + 0.4, 1.3, p[1], null, 5);
});
var rooms = [["The Southern Palace · the king's chamber", "bed"], ["The Southern Palace · the queen's chamber", "bed2"], ["The Southern Palace · the banquet hall", "dine"], ["The Southern Palace · the scribes' room", "scribe"]];
rooms.forEach(function (r, i) {
var rz0 = -141 + i * 18.5, rz1 = rz0 + 18, rx0 = 42, rx1 = x1 - 1;
wndRoom({ x0: rx0, x1: rx1, z0: rz0, z1: rz1, h: 7, floor: wndMat(0xC8B490, "paving"), wall: wndMat(0xE0CCA8, "plaster"), ceil: wndMat(0x5A3A22, "wood"), inset: 0, doors: { w: [{ at: (rz0 + rz1) / 2, w: 2.2, h: 3.4, frame: M.gold }] }, name: r[0] });
var cx = (rx0 + rx1) / 2, cz = (rz0 + rz1) / 2;
wndBox(rx1 - rx0 - 2, 0.03, rz1 - rz0 - 4, M.cloth[i % 6], cx, 0.03, cz);
if (r[1] === "bed" || r[1] === "bed2") {
babBed(cx + 3, cz - 4, Math.PI / 2, { cover: r[1] === "bed" ? M.wool : M.woolB, legs: M.gold, high: 1 });
babChest(rx1 - 1, cz + 4, Math.PI / 2);
babChest(rx1 - 1, cz + 6, Math.PI / 2);
babTable(cx - 1, cz + 2, { bowls: 2 });
babStool(cx - 1, cz + 3.2);
babLampStand(rx0 + 1, rz0 + 1.2);
babLampStand(rx0 + 1, rz1 - 1.2);
if (r[1] === "bed2" && !lite) {
babLoom(cx + 2, rz1 - 1.2, 0);
wndBox(0.6, 1.2, 0.4, M.bronze, rx1 - 0.9, 0.6, rz0 + 1);
}
}
else if (r[1] === "dine") {
babTable(cx, cz, { w: 3.4, d: 1.2, h: 0.7, bowls: lite ? 2 : 5 });
for (var s = 0; s < (lite ? 2 : 6); s++)
babStool(cx - 1.4 + (s % 3) * 1.4, cz + (s < 3 ? -1.2 : 1.2));
[[rx0 + 1.2, rz0 + 1.2], [rx1 - 1.2, rz1 - 1.2]].forEach(function (p) { babJar(p[0], 0, p[1], 1.4); });
babLampStand(cx, rz0 + 1.2);
}
else {
for (var sh = 0; sh < 3; sh++) {
wndBox(0.6, 0.08, 9, M.wood, rx1 - 0.8, 0.8 + sh * 0.6, cz);
babTablets(rx1 - 1.0, 0.84 + sh * 0.6, cz - 4, lite ? 4 : 16);
}
babTable(cx - 1, cz, { bowls: 1 });
babStool(cx - 1, cz + 1);
babTablets(cx - 1.3, 0.48, cz - 0.1, 4);
wndPlaque("bab-jehoiachin", "The ration tablets", "In the vaulted storerooms of this palace Koldewey's team found clay tablets listing oil rations for people kept at the king's court, about 592 BC: Ya'u-kinu (Jehoiachin), king of Judah, and his five sons, and men from Tyre, Byblos, Egypt, Ionia, Media, Persia and Elam. Babylon gathered the peoples of its world.", 2.4, 1.6, rx0 + 0.4, 2.2, cz + 5, Math.PI / 2);
}
});
wndRoom({ x0: -65, x1: -40, z0: z0 + 1, z1: z0 + 12, h: 6, floor: wndMat(0xB8A078, "earth"), wall: wndMat(0xD0BC98, "plaster"), ceil: wndMat(0x5A3A22, "wood"), inset: 0, doors: { s: [{ at: -52, w: 2.2, h: 3.2, frame: M.woodD }] }, name: "The Southern Palace · the guard room" });
for (var sp = 0; sp < (lite ? 3 : 8); sp++)
wndCyl(0.03, 2.6, M.woodD, -63 + sp * 0.5, 1.3, z0 + 1.8, null, 5);
wndBox(10, 0.45, 0.6, M.wood, -52, 0.45, z0 + 9);
babTable(-46, z0 + 6, { bowls: 2 });
babJar(-63, 0, z0 + 10, 1.2);
babTalker("jehoiachin", -10, 0, -100, Math.PI / 2);
babChunk("");
},
function () {
babChunk("wall");
var M = babM(), h = 14, t = 3.2, wm = M.brickD, X = -113, lite = WND.lite;
var seg = function (dir, a, b, c) {
if (Math.abs(b - a) < 1)
return;
wndWall(dir, a, b, c, 0, h, t, wm);
babMerlons(dir, a, b, c, h, t, wm);
for (var p = Math.min(a, b) + 10; p < Math.max(a, b) - 4; p += 20) {
if (dir === "z") {
wndBox(7, h + 4, 7, wm, c - 1.5, (h + 4) / 2, p);
wndSolid(c - 1.5, p, 3.5, 3.5, 0, h + 4);
if (!lite)
babMerlons("z", p - 3.5, p + 3.5, c - 5, h + 4, 0.6, wm, 1.8);
}
else {
wndBox(7, h + 4, 7, wm, p, (h + 4) / 2, c + (c < 0 ? -1.5 : 1.5));
wndSolid(p, c + (c < 0 ? -1.5 : 1.5), 3.5, 3.5, 0, h + 4);
}
}
};
seg("z", -171, -16.5, X);
seg("z", 16.5, 82, X);
seg("z", 98, 248, X);
[[-1], [1]].forEach(function (s) { s = s[0]; wndBox(10, h + 6, 6, wm, X - 1, (h + 6) / 2, 90 + s * 5); wndSolid(X - 1, 90 + s * 5, 5, 3, 0, h + 6); });
wndBox(10, 4, 4.4, wm, X - 1, h + 2, 90);
wndBox(10.2, 0.6, 4.6, M.blue, X - 1, h - 0.2, 90);
wndFloor(X - 6, 86, X + 4, 94, 0);
wndSign(["THE ADAD GATE", "into Babylon"], 5, 1.1, "#1E3A7A", "#F4D88A", X - 4.2, h - 3, 90, -Math.PI / 2);
seg("x", X, 72, -172);
seg("x", X, 72, 248);
wndBox(2, 1.2, 300, M.brick, 75, 0.3, 40);
for (var qz = -108; qz < 190; qz += 40)
if (Math.abs(qz - 67) > 8)
wndBox(2.2, 0.35, 1.2, M.bitumen, 75, 0.95, qz);
babChunk("");
},
function (L) {
babChunk("bridge");
var M = babM(), z0 = 63, z1 = 71, y = 1.6, lite = WND.lite;
wndRamp(64, z0, 76, z1, "x", 64, 0, 76, y);
wndFloor(76, z0, 116, z1, y);
wndRamp(116, z0, 128, z1, "x", 128, 0, 116, y);
var deck = wndMat(0x7A5A3A, "wood");
wndBox(40, 0.3, z1 - z0, deck, 96, y - 0.15, (z0 + z1) / 2);
var gr = wndGroup(70, y / 2, (z0 + z1) / 2, 0);
var r1 = wndBox(12.4, 0.3, z1 - z0, M.brick, 0, 0, 0, gr);
r1.rotation.z = Math.atan2(y, 12);
var gr2 = wndGroup(122, y / 2, (z0 + z1) / 2, 0);
var r2 = wndBox(12.4, 0.3, z1 - z0, M.brick, 0, 0, 0, gr2);
r2.rotation.z = -Math.atan2(y, 12);
for (var px = 78; px < 116; px += lite ? 12 : 6.5) {
wndBox(3.2, y + 2, z1 - z0 + 2, wndMat(0xA89A86, "stone"), px, (y - 2) / 2, (z0 + z1) / 2);
}
[z0 - 0.2, z1 + 0.2].forEach(function (rz) { for (var bx = 67; bx < 126; bx += 2.5)
wndCyl(0.07, 1, M.woodD, bx, y + 0.5, rz, null, 5); wndBox(58, 0.1, 0.12, M.woodD, 96, y + 1.0, rz); wndSolid(96, rz, 30, 0.15, 0, y + 1.1); });
(L.water || []).forEach(function (W) { if (!W.r && W.hd > 100) {
W.not = (W.not || []).concat([[76 + WNK.ox, z0 + WNK.oz, 116 + WNK.ox, z1 + WNK.oz]]);
W.boats = { z: -60, hd: 95 };
} });
wndArea(64, z0, 128, z1, 0, 6, "The bridge over the Euphrates");
wndPlaque("bab-bridge", "The bridge", "Herodotus (Book 1, 186) says the queen Nitocris joined the two halves of Babylon with a bridge of stone piers bound with iron and lead, with beams laid across that were taken up at night. Koldewey found its piers: seven of them, 123 m long, of baked brick and stone.", 2.4, 1.6, 62, 2, 58.5, 0);
babChunk("");
},
function (x, z, ry, kind, i) {
var M = babM(), g = wndGroup(x, 0, z, ry), aw = M.cloth[i % 6];
[[-1.4, -0.9], [1.4, -0.9], [-1.4, 0.9], [1.4, 0.9]].forEach(function (p) { wndBox(0.1, 2.4, 0.1, M.woodD, p[0], 1.2, p[1], g); });
var a = wndBox(3.2, 0.05, 2.2, aw, 0, 2.45, 0, g);
a.rotation.x = 0.12;
wndBox(2.8, 0.8, 0.7, M.wood, 0, 0.4, 0.55, g);
var gm = { dates: [0x7A3A1A, 0x5A2A10], grain: [0xD8C078, 0xC8B068], pots: [0xA8643A, 0xC08A5A], cloth: [0x5A2A6A, 0xC8A040], fish: [0x9AA8B0, 0x8A9AA0], oil: [0xC8B048, 0xA89038], copper: [0xB06A3A, 0xC87A48], spice: [0xC84A2A, 0xD8A030] }[kind] || [0x8A6A3A, 0x6A4A2A];
if (kind === "pots" || kind === "oil") {
for (var p = 0; p < 5; p++)
babJar(-1.1 + p * 0.55, 0.8, 0.55, 0.45, wndMat(gm[p % 2], null));
}
else if (kind === "cloth") {
for (var c = 0; c < 4; c++)
wndBox(0.6, 0.18, 0.5, wndMat(gm[c % 2], null), -1 + c * 0.65, 0.9 + ((c % 2) * 0.1), 0.55, g);
}
else if (kind === "grain") {
for (var s = 0; s < 4; s++)
wndCyl(0.3, 0.6, wndMat(gm[s % 2], null), -1.05 + s * 0.7, 1.1, 0.55, g, 8, 0.22);
}
else
for (var q = 0; q < 6; q++)
wndSph(0.22, wndMat(gm[q % 2], null), -1.1 + q * 0.44, 0.95, 0.55, g, 7);
wndSolid(x, z, 1.6, 1.1, 0, 2.5, ry);
},
function () {
var lite = WND.lite;
babChunk("mkt");
var M = babM();
wndBox(52, 0.06, 58, M.pave, 152, 0.03, 72);
wndArea(126, 43, 178, 101, 0, 8, "The market of the New City");
var goods = ["dates", "grain", "pots", "cloth", "fish", "oil", "copper", "spice", "dates", "cloth", "pots", "grain"], n = lite ? 6 : 12;
for (var i = 0; i < n; i++) {
var col = i % 4, row = Math.floor(i / 4);
babStall(134 + col * 12, 52 + row * 16, row % 2 ? Math.PI : 0, goods[i], i);
}
wndCyl(1.2, 0.9, M.brick, 152, 0.45, 92, null, 14);
wndCyl(1.0, 0.05, M.water, 152, 0.88, 92, null, 14);
wndRound(152, 92, 1.2, 0, 0.9);
wndBox(0.12, 2.4, 0.12, M.woodD, 151, 1.2, 92);
wndBox(0.12, 2.4, 0.12, M.woodD, 153, 1.2, 92);
wndBox(2.2, 0.12, 0.12, M.woodD, 152, 2.4, 92);
wndPlaque("bab-mkt", "The market", "Babylon traded with the whole known world: tin and copper, wine and olive oil, cedar from Lebanon, linen from Egypt, purple cloth from Phoenicia, incense from Arabia, horses from Media. Prices were set in silver by weight (a shekel is about 8.3 g), and dates and barley were the everyday food.", 2.4, 1.6, 128, 2, 46, Math.PI / 2);
babTalker("dates", 134, 0, 49.6, Math.PI);
babTalker("tyre", 146, 0, 49.6, Math.PI);
babTalker("egypt", 158, 0, 49.6, Math.PI);
if (!lite)
babTalker("ionian", 134, 0, 81.6, Math.PI);
[["camel", 176, 60], ["camel", 176, 66], ["donkey", 176, 80]].forEach(function (b, k) {
if (lite && k)
return;
var g = null;
try {
if (typeof build === "function")
g = build({ id: "bab_" + b[0] + k, archetype: b[0] === "donkey" ? "horse" : "camel", attrs: { s: b[0] === "donkey" ? 0.9 : 1.4 }, x: 0, z: 0, rot: 0, solid: false, detail: lite ? 2 : 3, nights: [] });
}
catch (e) {
g = null;
}
if (!g)
return;
g.position.set(b[1], 0, b[2]);
g.rotation.y = -Math.PI / 2;
g.userData.keep = 1;
if (b[0] === "donkey")
g.scale.setScalar(0.65);
wndP().add(g);
wndRound(b[1], b[2], 1.4, 0, 2.2);
});
babChunk("");
babChunk("nc");
var cells = [], A = WND_AT.gardens;
for (var cx = 126; cx <= 246; cx += 17)
for (var cz = -152; cz <= 140; cz += 17) {
if (cx < 180 && cz > 36 && cz < 104)
continue;
if (cz > 56 && cz < 80 && cx < 180)
continue;
var wx = A.x + cx + 7, wz = A.z + cz + 7;
if (wndRegion(wx, wz) !== "gardens" || wndRidgeH(wx, wz) > 18)
continue;
cells.push([cx, cz, Math.hypot(cx - 150, cz - 70)]);
}
cells.sort(function (a, b) { return a[2] - b[2]; });
cells = cells.slice(0, lite ? 9 : 24);
cells.forEach(function (c, k) { var door = c[0] < 150 ? "e" : c[1] < 70 ? "s" : "n"; babHouse(c[0], c[1], c[0] + 14, c[1] + 14, door, k + 11, { name: "A house of the New City" }); });
BAB.ncCells = cells;
babChunk("");
},
function () {
var lite = WND.lite;
babChunk("oc");
var k = 0, list = [];
for (var z = -166; z < -22; z += 15)
list.push([-107, z, -87, z + 13, "e"]);
for (var z2 = 20; z2 < 80; z2 += 15)
list.push([-107, z2, -87, z2 + 13, "e"]);
for (var z3 = 100; z3 < 146; z3 += 15)
list.push([-107, z3, -87, z3 + 13, "e"]);
for (var z4 = 80; z4 < 140; z4 += 15)
list.push([-68, z4, -52, z4 + 13, "w"]);
if (lite)
list = list.filter(function (r, i) { return i % 2 === 0; });
list.forEach(function (r) { babHouse(r[0], r[1], r[2], r[3], r[4], k++, { name: "A house of Babylon" }); });
var M = babM();
wndBox(12, 0.06, 240, M.pave, -76, 0.03, -45);
wndBox(12, 0.06, 70, M.pave, -76, 0.03, 110);
wndBox(140, 0.06, 10, M.pave, -6, 0.03, 67);
if (!lite)
for (var sz = -150; sz < 140; sz += 24)
if (Math.abs(sz) > 10 && Math.abs(sz - 67) > 8)
babTree("palm", -71, 0, sz, 0.9);
babChunk("");
babChunk("quay");
var qs = lite ? 2 : 5;
for (var q = 0; q < qs; q++)
babStall(20 + q * 10, 76, 0, ["fish", "grain", "pots", "oil", "copper"][q], q + 3);
babChunk("");
},
function (key, x, y, z, ry) {
var T = BAB_TALK[key];
if (!T)
return null;
var look = Object.assign({ sex: T.sex }, T.look || {});
var g = wndPersonFig("bab_" + key, x, y || 0, z, ry, look, "");
WND.people.push({ g: g, site: "gardens", v: WNK.v });
wndSpot(x, z, 2.6, T.n, "talk with " + (T.sex === "f" ? "her" : "him"), function () { babTalk(key); }, { y: y || 0 });
BAB.talk.push(key);
return g;
},
function (key) {
var T = BAB_TALK[key];
if (!T)
return;
if (!wndCfg().talk && !wndKeeper()) {
wndSay("🏛️ The people of Babylon are busy for now (the Keeper's choice).");
return;
}
if (typeof wTalk === "function")
wTalk({ name: T.n, persona: T.p + " Speak in the first person, wholly in character, warmly, two to five sentences; answer exactly what was asked; never say you are an AI or in a game. Nothing frightening or sexual, no instructions for harm.", greet: T.hi, doing: "in Babylon" });
},
function () {
return {
way: [[-140, 1], [-112, 1], [-96, 1], [-76, 2], [-76, 40], [-76, 67], [-40, 67], [0, 67], [40, 66], [64, 67], [96, 67], [128, 67], [150, 70], [160, 90]],
north: [[-76, -6], [-76, -60], [-76, -112], [-70, -112], [-60, -112], [-40, -104], [-30, -104], [-21, -104], [0, -110], [16, -125], [16, -138]],
tower: [[-76, 67], [-30, 70], [0, 70], [0, 76], [0, 110], [0, 140], [0, 146], [0, 150], [10, 151], [15, 153.5]],
temple: [[-76, 67], [-52, 74], [-52, 120], [-52, 148], [-52, 176], [-62, 176], [-75, 172], [-86, 176], [-95, 176]],
garden: [[-76, 2], [-72, 0], [-58, 0], [-44, 0], [-28, 0], [-12, 0], [4, 0], [22, 0], [34, 0], [40, 20], [30, 40], [12, 30]],
market: [[128, 67], [140, 60], [164, 60], [164, 84], [140, 88], [130, 76]],
newcity: [[128, 67], [124, 30], [124, -10], [141, -10], [141, -40], [124, -40], [124, 30]]
};
},
function () {
var R = BAB.routes = babRoutes(), lite = WND.lite, plan = [["way", lite ? 3 : 6], ["north", lite ? 1 : 4], ["tower", lite ? 1 : 3], ["temple", lite ? 1 : 3], ["garden", lite ? 2 : 4], ["market", lite ? 2 : 6], ["newcity", lite ? 1 : 3]];
var lands = ["babylon", "babylon", "babylon", "egypt", "phoenicia", "ionia", "media", "judah", "arabia"], n = 0;
plan.forEach(function (p) {
var rt = R[p[0]];
for (var i = 0; i < p[1]; i++, n++) {
var ri = (i * 5 + n) % rt.length, pt = rt[ri], land = lands[(n * 7) % lands.length], dr = BAB_DRESS[land], look = Object.assign({ sex: n % 3 === 1 ? "f" : "m" }, dr[n % dr.length]);
if (land === "babylon" && look.sex === "f")
look.top = [0x8A2A4A, 0x3A5A8A, 0xC89A40, 0x6A3A6A][n % 4];
var x = pt[0] + ((n * 13) % 3) - 1, z = pt[1] + ((n * 7) % 3) - 1, y = babGround(x, z, 200);
var g = wndPersonFig("bab_w" + n, x, y, z, (n * 1.7) % 6.28, look, "");
WND_LV.people.push({ g: g, site: "gardens", pts: rt, route: rt, ri: ri, rd: i % 2 ? 1 : -1, tx: x, tz: z, wait: Math.random() * 4, sp: 0.9 + Math.random() * 0.5 });
}
});
},
function () {
BAB.talk = [];
BAB.m = null;
var run = function (n, f) { try {
f();
}
catch (e) {
if (window.console)
console.warn("[wonders] babylon " + n, e);
} babChunk(""); wndThen("gardens"); };
wndThen("gardens");
run("walls", babWalls);
run("palace", babPalace);
run("zig", babEtemenanki);
run("esagila", babEsagila);
run("old", babOldCity);
run("bridge", function () { babBridge(WNK.lists.gardens || { water: [] }); });
run("newcity", babNewCity);
run("guard", function () { var gd = wndPersonFig("bab_gateguard", -104, 0, -5.5, -Math.PI / 2, { top: 0x8A2A2A, bottom: 0x6A3A2A, skin: 0x9A6A44, sex: "m" }, "guard"); WND.people.push({ g: gd, site: "gardens", v: "then:gardens" }); });
wndThen("gardens");
},
function (x, W, H) {
x.fillStyle = "#4A3420";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 8; r++)
for (var c = 0; c < 8; c++) {
var px = c * W / 8, py = r * H / 8;
x.fillStyle = "#2A1C10";
x.fillRect(px + 2, py + 2, W / 8 - 4, H / 8 - 4);
for (var s = 0; s < 5; s++) {
var sx = px + 6 + (s % 3) * 9 + ((r + c) % 2) * 3, sy = py + 8 + Math.floor(s / 3) * 12;
x.fillStyle = ["#E8D8A8", "#D8C090", "#C8A870", "#F0E2B8"][(r + c + s) % 4];
x.beginPath();
x.arc(sx, sy, 4.4, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#8A6A3A";
x.beginPath();
x.arc(sx, sy, 1.4, 0, Math.PI * 2);
x.fill();
if ((r * 3 + c + s) % 5 === 0) {
x.fillStyle = "#A83A2A";
x.fillRect(sx - 1, sy + 3, 2, 5);
}
}
}
},
function (key, x, y, z, ry) {
var T = LIB_TALK[key];
if (!T)
return;
var g = wndPersonFig("lib_" + key, x, y, z, ry, Object.assign({ sex: T.sex }, T.look), "");
WND.people.push({ g: g, site: "pharos", v: WNK.v });
wndSpot(x, z, 2.6, T.n, "talk with " + (T.sex === "f" ? "her" : "him"), function () { if (typeof alxTalkStep === "function" && alxTalkStep(key))
return; if (!wndCfg().talk && !wndKeeper())
return; if (typeof wTalk === "function")
wTalk({ name: T.n, persona: T.p + " Speak in the first person, wholly in character, warmly, two to five sentences; answer exactly what was asked; never say you are an AI or in a game. Nothing frightening or sexual, no instructions for harm.", greet: T.hi, doing: "at the Library" }); }, { y: y || 0, when: function () { return !(typeof alxRuined === "function" && alxRuined()); } });
},
function () {
var lite = WND.lite, M = babM(), lime = wndMat(0xF0E8D8, "marble", { phong: 30 }), st = wndMat(0xE4DCCA, "stone"), sh = wndCanvasMat("lib-shelves", 256, 256, libShelfPaint, { full: !lite, rep: [0.25, 0.33] });
var x0 = 30, x1 = 104, z0 = -80, z1 = -14, h = 10, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
alxLibThen();
wndWall("x", x0, x1, z0, 0, h, 1.2, st);
wndWall("x", x0, x1, z1, 0, h, 1.2, st);
wndWall("z", z0, z1, x1, 0, h, 1.2, st);
wndWall("z", z0, z1, x0, 0, h, 1.2, st, [{ at: cz, w: 4, h: 6.5, frame: wndMat(0xC8A048, "metal", { phong: 60 }) }]);
wndBox(x1 - x0 + 1, 0.8, z1 - z0 + 1, lime, cx, h + 0.4, cz - 0.0).visible = false;
var por = [];
for (var pz = z0 + 4; pz <= z1 - 4; pz += lite ? 8 : 4)
por.push([x0 - 5, 0.6, pz]);
wndBox(7, 0.6, z1 - z0, lime, x0 - 4, 0.3, cz);
wndFloor(x0 - 7.5, z0, x0, z1, 0.6);
wndColumnsInst(por, 8.5, 0.45, "ionic", lime);
wndBox(7.6, 1.2, z1 - z0 + 1, lime, x0 - 4, 9.7, cz);
babStair({ axis: "x", a0: x0 - 10.5, a1: x0 - 7.5, y0: 0, y1: 0.6, c0: cz - 8, c1: cz + 8, base: 0, mat: lime });
var sign = wndSign(["THE MOUSEION AND THE LIBRARY", "the house of the Muses · Alexandria"], 8, 1.4, "#1E4A6A", "#F4E8C0", x0 - 7.6, 7.2, cz, -Math.PI / 2);
var c0x = x0 + 16, c1x = x1 - 18, c0z = z0 + 15, c1z = z1 - 15;
wndBox(c1x - c0x, 0.06, c1z - c0z, wndMat(0x6A8A4A, "grass"), (c0x + c1x) / 2, 0.03, (c0z + c1z) / 2);
var col = [];
for (var ax = c0x; ax <= c1x + 0.1; ax += lite ? 8 : 4) {
col.push([ax, 0, c0z]);
col.push([ax, 0, c1z]);
}
for (var az = c0z + 4; az < c1z - 0.1; az += lite ? 8 : 4) {
col.push([c0x, 0, az]);
col.push([c1x, 0, az]);
}
wndColumnsInst(col, 5.5, 0.3, "ionic", lime);
wndArea(c0x, c0z, c1x, c1z, 0, h, "The Mouseion · the garden court");
for (var t = 0; t < (lite ? 3 : 6); t++)
babTree(["palm", "olive", "cypress"][t % 3], c0x + 5 + (t % 3) * ((c1x - c0x - 10) / 2), 0, c0z + 6 + Math.floor(t / 3) * (c1z - c0z - 12), 0.8);
wndCyl(1.4, 0.7, lime, (c0x + c1x) / 2, 0.35, (c0z + c1z) / 2, null, 16);
wndRound((c0x + c1x) / 2, (c0z + c1z) / 2, 1.4, 0, 0.7);
var room = function (a, b, c, d, nm, door, nofl) { var dd = {}; dd[door[0]] = [{ at: door[1], w: 2.4, h: 3.6 }]; if (nofl)
alxMedFloor(a, b, c, d); return wndRoom({ x0: a, x1: b, z0: c, z1: d, h: 7, floor: nofl ? null : wndMat(0xD8CCB4, "marble"), wall: wndMat(0xE8DCC4, "plaster"), ceil: wndMat(0x6A4A2A, "wood"), inset: 0, doors: dd, name: nm }); };
var names = ["The Library · poetry and Homer", "The Library · histories and geography", "The Library · medicine and mathematics"];
for (var r = 0; r < 3; r++) {
var rx0 = x0 + 16 + r * ((x1 - 18 - (x0 + 16)) / 3), rx1 = rx0 + (x1 - 18 - (x0 + 16)) / 3;
room(rx0, rx1, z0 + 0.6, c0z - 1.5, names[r], ["s", (rx0 + rx1) / 2], r === 2);
wndBox(rx1 - rx0 - 1.2, 5, 0.6, sh, (rx0 + rx1) / 2, 2.5, z0 + 1.3);
wndSolid((rx0 + rx1) / 2, z0 + 1.3, (rx1 - rx0) / 2 - 0.6, 0.3, 0, 5);
if (!lite) {
wndBox(0.6, 4, c0z - z0 - 6, sh, rx0 + 0.9, 2, (z0 + c0z) / 2);
wndBox(0.6, 4, c0z - z0 - 6, sh, rx1 - 0.9, 2, (z0 + c0z) / 2);
}
babTable((rx0 + rx1) / 2, (z0 + c0z) / 2 + 1, { w: 2, d: 0.9, h: 0.8 });
babTablets((rx0 + rx1) / 2 - 0.5, 0.82, (z0 + c0z) / 2 + 1, 0);
babLampStand(rx0 + 2, c0z - 3);
}
room(x0 + 16, x1 - 18, c1z + 1.5, z1 - 0.6, "The Library · the reading hall", ["n", cx - 1]);
for (var k = 0; k < (lite ? 3 : 6); k++) {
var tx = x0 + 21 + k * ((x1 - 18 - (x0 + 16) - 10) / 5);
babTable(tx, (c1z + z1) / 2, { w: 2.2, d: 1, h: 0.8 });
babStool(tx - 0.7, (c1z + z1) / 2 + 1.0);
babStool(tx + 0.7, (c1z + z1) / 2 + 1.0);
var scr = wndCyl(0.06, 0.9, wndMat(0xE8D8A8, null), tx, 0.86, (c1z + z1) / 2, null, 8);
scr.rotation.z = Math.PI / 2;
}
wndBox(x1 - 18 - (x0 + 16) - 2, 4, 0.6, sh, cx - 1, 2, z1 - 1.3);
libTalker("copyist", x0 + 22, 0, (c1z + z1) / 2 - 1.3, 0);
room(x1 - 16.5, x1 - 0.6, z0 + 0.6, cz - 1, "The Mouseion · the lecture hall", ["w", (z0 + cz) / 2]);
for (var s = 0; s < 4; s++)
wndBox(1.0, 0.45 * (s + 1), cz - z0 - 6, st, x1 - 3 - s * 1.1, 0.225 * (s + 1), (z0 + cz) / 2);
wndSolid(x1 - 4.6, (z0 + cz) / 2, 2.2, (cz - z0 - 6) / 2, 0, 0.9);
libTalker("eratosthenes", x1 - 12, 0, (z0 + cz) / 2, Math.PI / 2);
var gn = wndGroup(x1 - 9, 0, (z0 + cz) / 2 + 3, 0);
wndCyl(0.5, 1, lime, 0, 0.5, 0, gn, 12);
wndSph(0.55, wndMat(0xC8A048, "metal", { phong: 60 }), 0, 1.55, 0, gn, 14);
room(x1 - 16.5, x1 - 0.6, cz + 1, z1 - 0.6, "The Mouseion · the scholars' dining hall", ["w", (cz + z1) / 2]);
babTable(x1 - 8.5, (cz + z1) / 2, { w: 5, d: 1.2, h: 0.45, bowls: lite ? 2 : 5 });
for (var cch = 0; cch < (lite ? 2 : 4); cch++)
babBed(x1 - 12 + cch * 2.4, (cz + z1) / 2 + (cch % 2 ? -2 : 2), 0, { cover: M.cloth[cch % 6] });
wndArea(x0 + 0.6, z0 + 0.6, x0 + 16, z1 - 0.6, 0, h, "The Mouseion · the entrance hall");
wndPlaque("lib-1", "The Library of Alexandria", "Founded by Ptolemy I and II (about 295 to 280 BC), perhaps on the advice of Demetrius of Phalerum. Its scholars edited Homer, catalogued every book (the Pinakes of Callimachus), measured the earth (Eratosthenes) and built on Euclid. Ships in the harbour had their books copied. How many scrolls it held is unknown: ancient writers give 40,000 to 700,000.", 3, 2, x0 + 1.0, 2.6, cz - 6, Math.PI / 2);
wndPlaque("lib-2", "How it ended", "Not in one great fire. Some scrolls burned when Julius Caesar fought in Alexandria in 48 BC; the Ptolemies' funding ended; scholars were expelled in 145 BC and again later; the royal quarter was ruined in the wars of AD 272. By then the Library had faded away. Nothing of its building has been found.", 3, 2, x0 + 1.0, 2.6, cz + 6, Math.PI / 2);
wndNowL("pharos");
wndPlaque("lib-now", "The Library today", "Nothing of the ancient Library has been found; the royal quarter lies under the modern city and the sea. Since 2002 the Bibliotheca Alexandrina, a new great library, stands near where it was.", 3, 1.8, x0, 1.8, cz, -Math.PI / 2);
alxLibThen();
},
function (x0, x1, z0, z1) {
var fl = wndMat(0xD8CCB4, "marble"), H = ALX_HOLE, pcs = [[x0, z0, H.x0, z1], [H.x1, z0, x1, z1], [H.x0, z0, H.x1, H.z0], [H.x0, H.z1, H.x1, z1]];
pcs.forEach(function (p) { if (p[2] - p[0] < 0.05 || p[3] - p[1] < 0.05)
return; wndBox(p[2] - p[0], 0.3, p[3] - p[1], fl, (p[0] + p[2]) / 2, -0.15, (p[1] + p[3]) / 2); wndFloor(p[0], p[1], p[2], p[3], 0); });
ALX.lidL = wndL();
ALX.lidF = wndFloor(H.x0, H.z0, H.x1, H.z1, 0);
var lid = ALX.lid = alxDyn((H.x0 + H.x1) / 2, 0, (H.z0 + H.z1) / 2, 0), M = babM();
wndBox(H.x1 - H.x0 + 0.1, 0.1, H.z1 - H.z0 + 0.1, M.woodD, 0, -0.05, 0, lid);
var rug = wndBox(H.x1 - H.x0 + 1.6, 0.03, H.z1 - H.z0 - 1.0, M.cloth[2], 0, 0.02, 0.2, lid);
rug.name = "rug";
wndCyl(0.12, 0.03, M.bronze, 0, 0.045, -(H.z1 - H.z0) / 2 + 0.5, lid, 10);
var st = wndMat(0x9A8E78, "stone");
babStair({ axis: "z", a0: H.z0, a1: H.z1, y0: ALX_Y, y1: 0, c0: H.x0, c1: H.x1, base: ALX_Y - 0.3, mat: st });
wndWall("z", H.z0, H.z1, H.x0 - 0.2, ALX_Y, 6, 0.3, st);
wndWall("z", H.z0, H.z1, H.x1 + 0.2, ALX_Y, 6, 0.3, st);
},
function (open) {
var L = ALX.lidL, F = ALX.lidF;
if (!L || !F)
return;
if (ALX.ruinOn) {
var j = L.floors.indexOf(F);
if (j >= 0)
L.floors.splice(j, 1);
return;
}
var i = L.floors.indexOf(F);
if (open && i >= 0)
L.floors.splice(i, 1);
if (!open && i < 0)
L.floors.push(F);
if (ALX.lid) {
ALX.lid.visible = !open;
}
if (ALX.lidOpen)
ALX.lidOpen.visible = !!open;
},
function (kind, g) {
var M = babM(), gold = M.gold, br = M.bronze, wd = M.wood, cl = M.clayL, pap = wndMat(0xE8D8A8, null), ivory = wndMat(0xF0E6CC, null, { phong: 40 }), y = 1.0;
switch (kind) {
case "elements":
for (var i = 0; i < 6; i++) {
var s = wndCyl(0.06, 0.32, pap, -0.3 + i * 0.12, y + 0.07, 0, g, 8);
s.rotation.x = Math.PI / 2;
}
wndBox(0.9, 0.2, 0.4, wndMat(0x8A5A2A, "wood"), 0, y + 0.1, 0.25, g);
break;
case "receipt":
wndBox(0.5, 0.02, 0.35, pap, 0, y + 0.02, 0, g);
wndBox(0.08, 0.06, 0.08, wndMat(0xA83A2A, null), 0.15, y + 0.04, 0.1, g);
break;
case "tusk":
var t = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.07, 8, 18, Math.PI * 0.7), ivory);
t.position.set(0, y + 0.1, 0);
t.rotation.set(Math.PI / 2, 0, 0.3);
g.add(t);
break;
case "beasts":
wndBox(1.2, 0.8, 0.05, wndCanvasMat("alx-beasts", 256, 170, alxBeastsPaint, { full: true }), 0, y + 0.5, 0, g);
break;
case "tablet":
wndBox(0.18, 0.05, 0.24, cl, 0, y + 0.03, 0, g);
break;
case "coins":
[[-0.15, gold], [0, wndMat(0xC8C8C8, "metal", { phong: 80 })], [0.15, gold]].forEach(function (c) { wndCyl(0.04, 0.008, c[1], c[0], y + 0.01, 0, g, 14); });
break;
case "deadbook":
wndBox(1.0, 0.01, 0.3, wndCanvasMat("alx-dead", 256, 80, alxDeadPaint, { full: true }), 0, y + 0.01, 0, g);
break;
case "tools":
wndBox(0.6, 0.06, 0.3, wd, 0, y + 0.03, 0, g);
for (var k = 0; k < 5; k++)
wndBox(0.02, 0.01, 0.22, br, -0.2 + k * 0.1, y + 0.07, 0, g);
break;
case "casket":
wndBox(0.6, 0.3, 0.35, gold, 0, y + 0.15, 0, g);
wndBox(0.64, 0.06, 0.39, gold, 0, y + 0.33, 0, g);
break;
case "map":
wndBox(1.4, 0.9, 0.05, wndCanvasMat("alx-map", 256, 160, alxMapPaint, { full: true }), 0, y + 0.55, 0, g);
break;
case "maid":
wndCyl(0.12, 0.9, br, 0, y + 0.45, 0, g, 10, 0.2);
wndSph(0.11, br, 0, y + 1.0, 0, g, 10);
wndCyl(0.06, 0.18, br, 0.18, y + 0.65, 0.05, g, 8);
break;
case "dedication":
wndBox(0.9, 0.6, 0.12, wndMat(0xE8E0CC, "marble"), 0, y + 0.3, 0, g);
break;
case "edict":
wndBox(0.7, 0.5, 0.1, wndMat(0xC8BCA0, "stone"), 0, y + 0.25, 0, g);
break;
}
},
function (c, W, H) {
c.fillStyle = "#E8D8B0";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#6A3A1A";
c.lineWidth = 4;
c.strokeRect(4, 4, W - 8, H - 8);
var f = function (col, x, y, w, h) { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, w, h, 0, 0, Math.PI * 2); c.fill(); };
f("#7A7A7A", 50, 95, 32, 18);
c.fillRect(30, 100, 6, 26);
c.fillRect(64, 100, 6, 26);
f("#C89A40", 140, 90, 20, 12);
c.fillStyle = "#C89A40";
c.fillRect(150, 40, 6, 50);
f("#C89A40", 156, 40, 8, 6);
f("#F4F4F0", 210, 105, 26, 14);
c.fillStyle = "#2A1A10";
c.font = "12px Georgia";
c.fillText("THE PROCESSION OF PTOLEMY", 40, 24);
},
function (c, W, H) {
c.fillStyle = "#E4D2A0";
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A1A10";
for (var i = 0; i < 14; i++)
c.fillRect(8 + i * 18, 6, 1, H - 12);
c.fillStyle = "#2A6A4A";
c.fillRect(80, 20, 30, 40);
c.fillStyle = "#C8A040";
c.fillRect(120, 30, 14, 4);
c.fillRect(126, 18, 2, 30);
c.fillStyle = "#A83A2A";
c.beginPath();
c.arc(150, 50, 8, 0, Math.PI * 2);
c.fill();
},
function (c, W, H) {
c.fillStyle = "#F0E8D4";
c.fillRect(0, 0, W, H);
c.fillStyle = "#C8B888";
c.beginPath();
c.ellipse(W / 2, H / 2, W * 0.44, H * 0.28, 0, 0, Math.PI * 2);
c.fill();
c.fillStyle = "#6A9AC8";
c.fillRect(W * 0.2, H * 0.48, W * 0.35, 5);
c.strokeStyle = "#8A2A2A";
c.lineWidth = 1;
c.beginPath();
c.moveTo(0, H * 0.45);
c.lineTo(W, H * 0.45);
c.moveTo(W * 0.55, 0);
c.lineTo(W * 0.55, H);
c.stroke();
c.fillStyle = "#2A1A10";
c.font = "10px Georgia";
c.fillText("OIKOUMENE", W * 0.4, H * 0.3);
},
function () {
var lite = WND.lite, M = babM(), lime = wndMat(0xF0E8D8, "marble", { phong: 30 }), plaster = wndMat(0xB8503A, "plaster"), x0 = 30, x1 = 104, z0 = -126, z1 = -92;
wndRoom({ x0: x0, x1: x1, z0: z0, z1: z1, h: 8, floor: wndMat(0xE0D4BC, "marble", { phong: 40 }), wall: plaster, ceil: wndMat(0x5A3A22, "wood"), inset: 0,
doors: { s: [{ at: 67, w: 3.2, h: 4.4, frame: wndMat(0xC8A048, "metal", { phong: 60 }) }], w: [{ at: -109, w: 3.2, h: 4.4 }] }, name: "The king's treasures" });
wndBox(x1 - x0 + 1.2, 1.2, z1 - z0 + 1.2, lime, (x0 + x1) / 2, 8.6, (z0 + z1) / 2);
var col = [];
for (var cx = 38; cx <= 96; cx += lite ? 16 : 8) {
col.push([cx, 0, -102]);
col.push([cx, 0, -116]);
}
wndColumnsInst(col, 8, 0.35, "ionic", lime);
wndSign(["THE KING'S TREASURES", "marvels of the house of Ptolemy"], 7, 1.2, "#1E4A6A", "#F4E8C0", 67, 5.6, -91.6, 0);
for (var k in ALX_CASE_AT) {
var A = ALX_CASE_AT[k], g = wndGroup(A[0], 0, A[1], A[2]);
wndBox(1.6, 1.0, 1.0, wndMat(0xD8CCB0, "marble"), 0, 0.5, 0, g);
alxCaseMesh(k, g);
wndSolid(A[0], A[1], 0.8, 0.5, 0, 1.2);
var dz = A[1] < -109 ? 1.8 : -1.8;
alxSpot("case_" + k, A[0], A[1] + dz, 0, 1.6, ALX_CASES[k].t, "look at it");
babLampStand(A[0] + 1.4, A[1]);
}
var cg = wndGroup(48, 0, -109, 0);
wndBox(1.4, 0.5, 1.4, lime, 0, 0.25, 0, cg);
wndCyl(0.35, 1.2, M.bronze, -0.5, 1.6, 0, cg, 14);
wndCyl(0.3, 1.8, wndMat(0xC8D8E0, null, { op: 0.45 }), 0.2, 1.4, 0, cg, 16);
wndCyl(0.12, 2.6, wndCanvasMat("alx-hours", 64, 256, function (c, W, H) { c.fillStyle = "#E8DCC0"; c.fillRect(0, 0, W, H); c.fillStyle = "#2A1A10"; c.font = "14px Georgia"; for (var i = 0; i < 12; i++)
c.fillText(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][i], 18, H - 10 - i * 20); }, { full: true }), 0.75, 1.8, 0, cg, 12);
var fl = ALX.clock = alxDyn(48.2, 0.6, -109, 0);
wndCyl(0.26, 0.06, M.bronze, 0, 0, 0, fl, 14);
wndCyl(0.02, 0.9, M.bronze, 0, 0.45, 0, fl, 6);
wndSph(0.07, M.gold, 0.5, 0.9, 0, fl, 8);
wndSolid(48, -109, 0.8, 0.8, 0, 2.6);
alxSpot("case_clock", 48, -106.6, 0, 1.6, ALX_CASES.clock.t, "look at it");
wndCyl(0.45, 1.1, lime, 67, 0.55, -109, null, 12);
var sp = ALX.sphere = alxDyn(67, 2.1, -109, 0);
for (var r = 0; r < (lite ? 3 : 5); r++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.03, 6, lite ? 20 : 32), M.bronze);
ring.rotation.set([Math.PI / 2, 0, Math.PI / 2, 0.41 + Math.PI / 2, Math.PI / 2][r], [0, 0, 0, 0, Math.PI / 2][r], 0);
sp.add(ring);
}
wndSph(0.12, wndMat(0x4A6A8A, null), 0, 0, 0, sp, 10);
wndRound(67, -109, 0.6, 0, 3);
alxSpot("case_sphere", 67, -106.6, 0, 1.6, ALX_CASES.sphere.t, "look at it");
var og = wndGroup(86, 0, -109, 0);
wndBox(1.6, 0.9, 1.0, lime, 0, 0.45, 0, og);
wndCyl(0.35, 0.8, M.bronze, 0, 1.2, 0, og, 12);
for (var p = 0; p < (lite ? 6 : 12); p++)
wndCyl(0.05, 0.8 + p * 0.12, M.bronze, -0.66 + p * 0.12, 1.6 + (0.8 + p * 0.12) / 2, -0.25, og, 6);
[-1, 1].forEach(function (s) { wndCyl(0.12, 0.8, M.bronze, s * 0.95, 0.6, 0.2, og, 8); });
wndSolid(86, -109, 1.0, 0.6, 0, 3);
alxSpot("case_organ", 86, -106.6, 0, 1.6, ALX_CASES.organ.t, "look at it");
wndPlaque("alx-gal", "The king's treasures", "No list of the Mouseion's rooms survives. This hall gathers things the Ptolemies and their scholars are known to have had, made or described: Ctesibius's clock and organ, Eratosthenes' sphere and map, a war elephant's tusk, Egyptian and Babylonian writing, the coins of the kings.", 3, 1.8, x0 + 0.6, 2.4, -100, Math.PI / 2);
},
function () {
var lite = WND.lite, M = babM(), wl = wndMat(0xE4DCCA, "stone"), x0 = 110, x1 = 142, z0 = -76, z1 = -18;
wndWall("x", x0, x1, z0, 0, 1.4, 0.5, wl);
wndWall("x", x0, x1, z1, 0, 1.4, 0.5, wl);
wndWall("z", z0, z1, x0, 0, 1.4, 0.5, wl, [{ at: -47, w: 3 }]);
wndBox(x1 - x0, 0.06, z1 - z0, wndMat(0x7A8A4A, "grass"), (x0 + x1) / 2, 0.03, (z0 + z1) / 2);
wndArea(x0, z0, x1, z1, 0, 6, "The physicians' garden");
wndBox(x1 - x0 - 2, 0.05, 3, wndMat(0xC8B890, "sand"), (x0 + x1) / 2, 0.05, -47);
for (var k in ALX_BEDS) {
var B = ALX_BEDS[k], L = ALX_BED_LOOK[k];
wndBox(5, 0.35, 5, wndMat(0x5A3E26, "earth"), B[0], 0.17, B[1]);
wndSolid(B[0], B[1], 2.5, 2.5, 0, 0.35);
for (var i = 0; i < (lite ? 3 : 7); i++) {
var a = i * 2.4, rr = 0.6 + (i % 3) * 0.6;
babShrub(B[0] + Math.cos(a) * rr, 0.35, B[1] + Math.sin(a) * rr, 0.55 + (i % 2) * 0.25, L[0]);
}
babFlowers(B[0] - 2, B[1] - 2, B[0] + 2, B[1] + 2, 0.4, lite ? 6 : 14, [L[1]]);
alxSpot("bed_" + k, B[0] - 3.2, B[1], 0, 1.8, "A bed of herbs", "look closely");
}
for (var t = 0; t < (lite ? 2 : 5); t++)
babTree(["olive", "palm", "cypress"][t % 3], x0 + 4 + t * 6, 0, z0 + 3, 0.8);
ALX.asp = alxDyn(113, 0, -24, 0);
var snM = wndMat(0x6A5A3A, null);
for (var s = 0; s < 8; s++) {
var q = wndSph(0.07, snM, Math.sin(s * 0.9) * 0.2, 0.06, s * 0.12, ALX.asp, 6);
q.scale.set(1, 0.7, 1.4);
}
var hood = wndSph(0.1, snM, 0, 0.4, 0.9, ALX.asp, 8);
hood.scale.set(1.6, 1.4, 0.4);
ALX.aspHood = hood;
hood.visible = false;
var hx0 = 142, hx1 = 162, hz0 = -64, hz1 = -30;
wndRoom({ x0: hx0, x1: hx1, z0: hz0, z1: hz1, h: 4.5, floor: wndMat(0xD8CCB4, "stone"), wall: wndMat(0xEDE4D2, "plaster"), ceil: wndMat(0x6A4A2A, "wood"), inset: 0, doors: { w: [{ at: -47, w: 2.4, h: 3.2 }] }, name: "The house of Andreas the physician · the infirmary" });
wndBox(hx1 - hx0 + 1, 0.5, hz1 - hz0 + 1, wndMat(0xD8CCB0, "stone"), (hx0 + hx1) / 2, 4.85, (hz0 + hz1) / 2);
wndBox(2.2, 0.85, 0.9, wndMat(0xE8E0D0, "marble"), 152, 0.42, -52);
wndSolid(152, -52, 1.1, 0.45, 0, 0.85);
for (var b = 0; b < (lite ? 2 : 4); b++)
babBed(146 + b * 4, -34, 0, { cover: M.cloth[(b + 1) % 6] });
wndBox(0.5, 2.4, 6, wndMat(0x6A4A2A, "wood"), 161.2, 1.2, -50);
for (var j = 0; j < (lite ? 4 : 9); j++)
babJar(161, 0.9 + (j % 3) * 0.7, -53 + Math.floor(j / 3) * 2.2, 0.35, M.clayL);
babLampStand(148, -46);
babLampStand(157, -60);
babTable(156, -42, { w: 1.6, d: 0.8, h: 0.8 });
babTablets(155.6, 0.82, -42, 4);
wndPlaque("alx-phys", "The physicians of Alexandria", "Herophilus and Erasistratus made Alexandria the home of anatomy about 290 to 250 BC. Their followers, like Andreas of Carystus (later physician to Ptolemy IV), studied drugs, poisons and the bites of snakes and spiders.", 2.6, 1.6, hx0 + 0.6, 2.2, -56, Math.PI / 2);
},
function () {
var lite = WND.lite, M = babM(), Y = ALX_Y, st = wndMat(0x9A8E78, "stone"), fl = wndMat(0x857A66, "stone"), rock = wndMat(0x7A6E5A, "stone"), cedar = wndMat(0x7A4A2A, "wood");
var cover = function (a, b, c, d) { wndFloor(a, b, c, d, 0); };
wndRoom({ x0: 74, x1: 94, z0: -100, z1: -76, y: Y, h: 3.6, floor: fl, wall: st, ceil: wndMat(0x5A4A3A, "wood"), inset: 0, doors: { s: [{ at: 83.4, w: 2.2, h: 3.2 }], n: [{ at: 84, w: 2.4, h: 3 }] }, name: "The stores beneath the Library" });
cover(74, -100, 94, -76.01);
[-80, -86, -92].forEach(function (z) {
[[76, 81], [87, 92]].forEach(function (xx) {
wndBox(xx[1] - xx[0], 1.8, 0.9, cedar, (xx[0] + xx[1]) / 2, Y + 0.9, z);
wndSolid((xx[0] + xx[1]) / 2, z, (xx[1] - xx[0]) / 2, 0.45, Y, 1.8);
for (var j = 0; j < (lite ? 3 : 6); j++)
babJar(xx[0] + 0.5 + j * ((xx[1] - xx[0] - 1) / 5), Y + 1.8, z, 0.45, M.clayL);
});
});
babChest(77, -96.5, 0);
babChest(79, -96.5, 0);
babChest(90, -96.5, 0);
ALX.sandJar = babJar(85.8, Y, -78.4, 0.9, M.clay);
wndRound(85.8, -78.4, 0.35, Y, 1);
wndLamp(84, Y + 3.2, -82, 0xFFC890, 3);
wndLamp(84, Y + 3.2, -94, 0xFFC890, 3);
var fg = ALX.fire = alxDyn(84, Y, -86, 0);
for (var fi = 0; fi < 5; fi++)
wndFlame(3 + fi * 1.0, 1.9, -0.1, 2.2, 0xFF9040, fg);
wndLamp(5, 2.2, 0, 0xFF8030, 5, fg);
fg.visible = false;
var sc = ALX.scorch = alxDyn(89.5, Y, -86, 0);
wndBox(5.2, 1.9, 1.0, wndMat(0x1A1612, null), 0, 0.95, 0, sc);
sc.visible = false;
alxSpot("sand", 85.8, -79.6, Y, 1.5, "A great jar by the stair", "look in it");
alxSpot("jarsA", 78.5, -83, Y, 1.8, "Jars of scrolls, sealed", "search them");
alxSpot("jarsB", 89.5, -89, Y, 1.8, "Jars of scrolls, sealed", "search them");
alxSpot("chest", 78, -95, Y, 1.8, "A cedar chest, sealed with the king's seal", "search it");
wndRoom({ x0: 82, x1: 86, z0: -112, z1: -100, y: Y, h: 3, floor: fl, wall: st, ceil: st, inset: 0, skip: "sn", name: "A passage beneath the street" });
cover(82, -112, 86, -100);
var cx0 = 54, cx1 = 114, cz0 = -168, cz1 = -112, top = -0.6, low = Y - 1.5;
wndWall("x", cx0, cx1, cz1, low, top - low, 0.6, st, [{ at: 84, w: 2.4, h: 3 + 1.5, sill: 0 }]);
wndWall("x", cx0, cx1, cz0, low, top - low, 0.6, st, [{ at: 84, w: 2.4, h: 4.5 }]);
wndWall("z", cz0, cz1, cx0, low, top - low, 0.6, st);
wndWall("z", cz0, cz1, cx1, low, top - low, 0.6, st);
wndBox(cx1 - cx0, 0.4, cz1 - cz0, wndMat(0x6A5E4C, "stone"), (cx0 + cx1) / 2, top + 0.2, (cz0 + cz1) / 2);
cover(cx0, cz0, cx1, cz1);
var led = function (a, b, c, d) { wndBox(c - a, 1.5, d - b, fl, (a + c) / 2, Y - 0.75, (b + d) / 2); wndFloor(a, b, c, d, Y); };
led(cx0, cz1 - 3, cx1, cz1);
led(cx0, cz0, cx1, cz0 + 3);
led(cx0, cz0 + 3, cx0 + 3, cz1 - 3);
led(cx1 - 3, cz0 + 3, cx1, -142);
led(cx1 - 3, -134, cx1, cz1 - 3);
var wat = wndMat(0x1E3A3A, null, { phong: 90, spec: 0x6A8A8A });
wndFlat(cx1 - cx0 - 6, cz1 - cz0 - 6, wat, (cx0 + cx1) / 2, Y - 0.9, (cz0 + cz1) / 2);
wndFlat(3, 8, wat, cx1 - 1.5, Y - 0.9, -138);
[wndWater((cx0 + cx1) / 2, (cz0 + cz1) / 2, (cx1 - cx0) / 2 - 3, (cz1 - cz0) / 2 - 3), wndWater(cx1 - 1.5, -138, 1.5, 4)].forEach(function (W) { W.top = Y; });
var cols = [];
for (var ix = 62; ix <= 106; ix += lite ? 11 : 8.8)
for (var iz = -158; iz <= -122; iz += lite ? 12 : 9)
if (Math.abs(ix - 84) > 2)
cols.push([ix, low, iz]);
wndColumnsInst(cols, top - low, 0.42, "doric", wndMat(0xB8AC94, "stone"));
for (var rz = -158; rz <= -122; rz += lite ? 12 : 9)
wndBox(cx1 - cx0 - 6, 0.7, 0.8, st, (cx0 + cx1) / 2, top - 0.35, rz);
var plank = ALX.plank = alxDyn(84, Y - 0.05, -140, 0);
wndBox(0.5, 0.08, 49, wndMat(0x5A4A32, "wood"), 0, 0, 0, plank);
wndBox(0.5, 0.1, 6, wndMat(0x4A3A28, "wood"), 0, -0.04, 6, plank);
for (var lz = -160; lz <= -118; lz += lite ? 14 : 7) {
wndFlame(cx0 + 0.5, Y + 1.6, lz, 1.2, 0xFFB060);
wndLamp(cx0 + 0.6, Y + 1.8, lz, 0xFFB070, 3);
}
wndFlame(80, Y + 1.6, cz0 + 0.7, 1.2, 0xFFB060);
wndLamp(80, Y + 1.8, cz0 + 0.8, 0xFFB070, 3);
wndArea(cx0, cz0, cx1, cz1, Y, 6, "The great cistern");
alxSpot("plank", 84, cz1 - 2.0, Y, 1.6, "An old plank across the water", "look at it");
alxSpot("niche", 80, cz0 + 1.8, Y, 1.4, "A lamp in a niche", "light your lamp from it");
var dr = ALX.door = alxDyn(84, Y, cz0, 0);
wndBox(2.4, 3, 0.25, wndMat(0x5A3A22, "wood"), 0, 1.5, 0, dr);
wndBox(2.5, 0.12, 0.3, M.bronze, 0, 0.9, 0.02, dr);
wndBox(2.5, 0.12, 0.3, M.bronze, 0, 2.2, 0.02, dr);
wndBox(1.8, 0.06, 0.02, wndMat(0x8A5A3A, null), 0, 1.6, 0.15, dr);
ALX.doorL = wndL();
ALX.doorS = wndSolid(84, cz0, 1.3, 0.4, Y, 3.2);
alxSpot("door", 84, cz0 + 1.8, Y, 1.6, "A sealed door, a strip of letters across it", "read the strip");
var fx0 = 74, fx1 = 94, fz0 = -186, fz1 = -168;
wndRoom({ x0: fx0, x1: fx1, z0: fz0, z1: fz1, y: Y, h: 3.4, floor: fl, wall: wndMat(0x8A7A62, "plaster"), ceil: wndMat(0x4A3A2A, "wood"), inset: 0, skip: "s", doors: { e: [{ at: -177, w: 1.8, h: 2.4 }] }, name: "The room the kings keep closed" });
cover(fx0, fz0, fx1, fz1 - 0.01);
wndBox(fx1 - fx0, 0.6, 0.6, cedar, (fx0 + fx1) / 2, Y + 3.1, fz0 + 0.4);
[[78, -171, "dissect"], [91, -171, "pots"], [77.6, -183, "map"], [91.4, -182.6, "manetho"], [86.5, -184.2, "setne"]].forEach(function (F) {
babTable(F[0], F[1], { w: 1.6, d: 0.8, h: 0.8, y: Y });
wndSolid(F[0], F[1], 0.8, 0.4, Y, 0.8);
});
for (var pp = 0; pp < (lite ? 5 : 12); pp++)
babJar(90.4 + (pp % 4) * 0.35, Y + 0.8, -171.2 + Math.floor(pp / 4) * 0.25, 0.22, wndMat(0xA8402A, null));
babTablets(77.6, Y + 0.82, -171, 3);
wndBox(0.5, 0.04, 0.35, wndMat(0xE8D8A8, null), 77.6, Y + 0.83, -183, null);
wndBox(6, 2.4, 0.6, wndCanvasMat("lib-shelves", 256, 256, libShelfPaint, { rep: [0.25, 0.33] }), 84, Y + 1.2, fz0 + 0.5);
wndSolid(84, fz0 + 0.5, 3, 0.3, Y, 2.4);
ALX.debtG = alxDyn(84, Y + 0.01, -178, 0.4);
wndBox(0.16, 0.02, 0.11, wndMat(0x2A2A20, null), 0, 0.01, 0, ALX.debtG);
wndBox(0.13, 0.021, 0.08, wndMat(0xC8A848, null), 0, 0.012, 0, ALX.debtG);
wndLamp(84, Y + 3, -177, 0xFFB880, 2.6);
for (var rb = 0; rb < (lite ? 4 : 9); rb++)
wndBox(0.3 + (rb % 3) * 0.15, 0.25, 0.35, rock, 95 + (rb % 3) * 0.5, Y + 0.12, -176.2 - (rb % 4) * 0.5);
var F0 = { dissect: [78, -169.6], pots: [91, -169.6], map: [77.6, -181.6], manetho: [91.4, -181.2], setne: [86.5, -182.8], debt: [84, -176.8] };
for (var fk in F0)
alxSpot("f_" + fk, F0[fk][0], F0[fk][1], Y, 1.4, ALX_FORBID[fk].t, "look");
alxSpot("breach", 92.6, -177, Y, 1.4, "A hole broken through the wall", "look through it");
var tz0 = -178.2, tz1 = -175.8, tx0 = 94, tx1 = 130;
wndWall("x", tx0, tx1, tz0, Y, 2.6, 0.5, rock);
wndWall("x", tx0, tx1, tz1, Y, 2.6, 0.5, rock);
wndBox(tx1 - tx0, 0.4, tz1 - tz0 + 1, rock, (tx0 + tx1) / 2, Y + 2.8, (tz0 + tz1) / 2);
wndBox(tx1 - tx0, 0.2, tz1 - tz0, fl, (tx0 + tx1) / 2, Y - 0.1, (tz0 + tz1) / 2);
wndFloor(tx0, tz0, tx1, tz1, Y);
cover(tx0, tz0 - 1, tx1, tz1 + 1);
for (var px = 97; px < tx1; px += 4) {
var cracked = px >= 105 && px <= 113;
[-1, 1].forEach(function (s) { var b2 = wndBox(0.18, 2.5, 0.18, cedar, px, Y + 1.25, -177 + s * 1.0); if (cracked)
b2.rotation.z = s * 0.08; });
wndBox(0.2, 0.2, 2.3, cedar, px, Y + 2.55, -177);
}
ALX.rubble = alxDyn(110, Y, -177, 0);
for (var cr = 0; cr < 6; cr++)
wndBox(0.4, 0.3, 0.4, rock, -1.2 + cr * 0.5, 0.15, (cr % 2 ? 0.5 : -0.5), ALX.rubble);
ALX.rubble.visible = false;
wndArea(tx0, tz0, tx1, tz1, Y, 3, "The tunnel of Sostratus");
alxSpot("crack", 104.5, -177, Y, 1.4, "A crack across the roof, and a bent prop", "look at it");
var sx0 = 130, sx1 = 154, sz0 = -190, sz1 = -164;
wndRoom({ x0: sx0, x1: sx1, z0: sz0, z1: sz1, y: Y, h: 5, floor: wndMat(0x2A2A2A, "marble", { phong: 60 }), wall: wndCanvasMat("alx-tomb", 256, 128, alxTombPaint, { rep: [3, 1] }), ceil: wndMat(0x1A2A4A, null), inset: 0, doors: { w: [{ at: -177, w: 2.4, h: 2.6 }] }, name: "The lower chamber of the Sema" });
cover(sx0, sz0, sx1, sz1);
wndBox(4, 0.8, 2.4, wndMat(0xE8E0CC, "marble"), 144, Y + 0.4, -177);
wndSolid(144, -177, 2, 1.2, Y, 2);
var cof = alxDyn(144, Y + 0.8, -177, 0);
wndBox(2.6, 1.0, 1.1, M.gold, 0, 0.5, 0, cof);
wndBox(2.7, 0.12, 1.2, M.gold, 0, 1.05, 0, cof);
for (var lf = 0; lf < (lite ? 6 : 14); lf++) {
var la = lf / (lite ? 6 : 14) * Math.PI * 2;
wndSph(0.06, M.gold, Math.cos(la) * 0.3, 1.15, Math.sin(la) * 0.25, cof, 5);
}
ALX.coffin = cof;
[[136, -168], [152, -168], [136, -186], [152, -186]].forEach(function (L) { wndFlame(L[0], Y + 1.8, L[1], 1.4, 0xFFB060); wndLamp(L[0], Y + 2, L[1], 0xFFB070, 4); });
wndBox(2.6, 3.2, 0.3, M.bronze, 142, Y + 1.6, sz0 + 0.2);
wndSign(["ΑΛΕΞΑΝΔΡΟΣ"], 3, 0.6, "#2A1A10", "#E8C060", 144, Y + 3.4, -183, 0);
alxSpot("coffin", 141.6, -174.8, Y, 1.6, "The coffin of gold", "look");
[[64, -130], [100, -150], [70, -160]].forEach(function (W) { wndCyl(0.9, 0.8, wndMat(0xD8CCB0, "stone"), W[0], 0.4, W[1], null, 12); wndRound(W[0], W[1], 0.95, 0, 0.8); });
for (var ph = 0; ph < (lite ? 3 : 8); ph++)
wndTree("palm", 48 + ph * 9, 0, -140 - (ph % 3) * 12, 1);
},
function (c, W, H) {
c.fillStyle = "#E8DCC4";
c.fillRect(0, 0, W, H);
c.fillStyle = "#8A2A1E";
c.fillRect(0, H * 0.62, W, H * 0.38);
c.fillStyle = "#1A1A1A";
c.fillRect(0, H * 0.58, W, 4);
c.fillStyle = "#2A4A6A";
c.fillRect(0, 0, W, 10);
c.strokeStyle = "#8A6A2A";
c.lineWidth = 2;
for (var i = 0; i < 8; i++) {
c.beginPath();
c.arc(16 + i * 32, 34, 9, 0, Math.PI * 2);
c.stroke();
}
},
function (key) {
var T = ALX_TALK[key] || {}, L = LIB_TALK[key];
if (L)
T = { n: L.n, p: L.p, hi: L.hi, sex: L.sex };
if (!wndCfg().talk && !wndKeeper()) {
wndSay("🏛️ The scholars are busy for now (the Keeper's choice).");
return;
}
if (typeof wTalk === "function")
wTalk({ name: T.n, persona: T.p + " Speak in the first person, wholly in character, warmly, two to five sentences; answer exactly what was asked; never say you are an AI or in a game. Nothing sexual, no instructions for harm.", greet: T.hi, doing: "at the Library of Alexandria" });
},
function (kind) {
var g = new THREE.Group(), M = babM();
if (kind === "scroll") {
var s = wndCyl(0.05, 0.32, wndMat(0xE8D8A8, null), 0, 0.05, 0, g, 8);
s.rotation.z = Math.PI / 2;
wndBox(0.03, 0.005, 0.08, wndMat(0xA83A2A, null), 0.1, 0.05, 0.05, g);
}
else if (kind === "letter") {
wndBox(0.24, 0.01, 0.16, wndMat(0xE8D8A8, null), 0, 0.01, 0, g);
wndBox(0.05, 0.02, 0.05, wndMat(0xA83A2A, null), 0, 0.02, 0, g);
}
else if (kind === "lamp") {
wndCyl(0.07, 0.05, M.clayL, 0, 0.03, 0, g, 10, 0.05);
wndCyl(0.02, 0.04, M.clayL, 0.09, 0.03, 0, g, 6);
}
else if (kind === "rod") {
var r = wndCyl(0.03, 0.6, M.wood, 0, 0.04, 0, g, 8);
r.rotation.z = Math.PI / 2;
}
if (typeof wGlow === "function") {
var gl = wGlow(0xFFE8B0, 0.5, 0.45);
gl.position.y = 0.25;
g.add(gl);
}
return g;
},
function () {
ALX_SHIPS.forEach(function (S) {
var P = ALX_FIND[S.k];
var g = ALX.items[S.k] = alxDyn(P[0], P[2], P[1], (P[0] * 3) % 6);
g.add(alxFindMesh("scroll"));
g.visible = false;
alxSpot(S.k, P[0], P[1], P[2], 1.5, "A scroll from a ship", "pick it up");
});
[["letter", "letter", "A letter, sealed"], ["lamp", "lamp", "An oil lamp"], ["rod", "rod", "A smooth wooden rod among the jars"]].forEach(function (F) {
var P = ALX_FIND[F[0]];
var g = ALX.items[F[0]] = alxDyn(P[0], P[2] + (F[0] === "letter" ? 0.46 : F[0] === "lamp" ? 0 : 0.0), P[1], 0);
g.add(alxFindMesh(F[1]));
g.visible = false;
alxSpot(F[0], P[0], P[1], P[2], 1.5, F[2], "take it");
});
},
function () {
alxSpot("register", 26.5, -53, 0.6, 2, "The register of readers", "open it");
babTable(26.5, -55, { w: 1.4, d: 0.7, h: 0.8 });
babTablets(26.2, 0.82, -55, 2);
babTable(38, -57.5, { w: 2.4, d: 1, h: 0.8 });
for (var i = 0; i < 6; i++) {
var s = wndCyl(0.05, 0.3, wndMat(0xE8D8A8, null), 37.2 + i * 0.3, 0.86, -57.5, null, 8);
s.rotation.x = Math.PI / 2;
}
alxSpot("pinakes", 38, -56, 0, 1.8, "The Tables of Callimachus (the catalogue)", "read it");
alxSpot("shelf_poetry", 52.7, -77, 0, 2.2, "The shelves: poetry and Homer", "read from them");
alxSpot("shelf_history", 66, -77, 0, 2.2, "The shelves: histories and geography", "read from them");
alxSpot("shelf_science", 75.5, -77, 0, 2, "The shelves: medicine and mathematics", "read from them");
alxSpot("shelf_hall", 66, -17.3, 0, 2.4, "The reading hall's shelves", "read from them");
alxSpot("trap", 83.4, -66.9, 0, 1.4, "A rug on the floor, oddly placed", "look under it");
wndCyl(0.35, 1.0, wndMat(0xF0E8D8, "marble"), 56, 0.5, -55, null, 10);
wndSph(0.4, wndMat(0xE8E0D0, "marble"), 56, 1.1, -55, null, 12).scale.y = 0.5;
wndRound(56, -55, 0.4, 0, 1.2);
alxSpot("sundial", 56, -53.4, 0, 1.4, "A sundial: a stone bowl with a pointer", "watch the shadow");
alxSpot("sec_tile", 58, -20, 0, 1.2, "A tile that rocks underfoot", "lift it");
alxSpot("sec_timon", 92.4, -29, 0, 1.2, "Under the long table", "look");
alxSpot("sec_obelus", 52.7, -70.2, 0, 1.2, "An old Iliad on the desk", "look closely");
alxSpot("sec_globe", 95, -58.6, 0, 1.2, "Under the bronze globe", "look");
ALX.lidOpen = alxDyn(ALX_HOLE.x0 - 0.6, 0.02, (ALX_HOLE.z0 + ALX_HOLE.z1) / 2, 0);
wndBox(0.1, 0.1, ALX_HOLE.z1 - ALX_HOLE.z0, babM().woodD, 0, 0.05, 0, ALX.lidOpen);
ALX.lidOpen.visible = false;
},
function () {
var lite = WND.lite, R = [[[46, -66], [86, -66], [86, -28], [46, -28], [46, -66]], [[20, -86], [60, -86], [100, -86], [108, -60], [108, -30]], [[24, -20], [24, -70], [10, -90]]];
var looks = [{ top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0xC89A70, hair: 0x3A2A1A }, { top: 0x2A5A9A, bottom: 0xF2EEE2, skin: 0xC08A60, hair: 0x2A1A10 }, { top: 0xE8D8B8, bottom: 0x8A6A3A, skin: 0x8A5A3A, hair: 0x101010 }, { top: 0x8A2A4A, bottom: 0xE8E0D0, skin: 0xB88A60, hair: 0x2A1A10 }];
for (var i = 0; i < (lite ? 3 : 8); i++) {
var rt = R[i % 3], ri = i % rt.length, p = rt[ri], look = Object.assign({ sex: i % 3 === 2 ? "f" : "m" }, looks[i % 4]);
var g = wndPersonFig("alx_w" + i, p[0], 0, p[1], 0, look, "");
WND_LV.people.push({ g: g, site: "pharos", alxCourt: i % 3 === 0, pts: rt, route: rt, ri: ri, rd: i % 2 ? 1 : -1, tx: p[0], tz: p[1], wait: Math.random() * 4, sp: 0.8 + Math.random() * 0.4 });
}
},
function () {
var run = function (n, f) { try {
f();
}
catch (e) {
if (window.console)
console.warn("[wonders] alexandria " + n, e);
} wndThen("pharos"); };
wndThen("pharos");
ALX.sp = {};
ALX.items = {};
ALX.figs = {};
run("gallery", alxGallery);
run("garden", alxGarden);
run("under", alxUnder);
run("finds", alxFinds);
run("spots", function () { alxLibThen(); var c1 = alxColMark(); alxMouseionSpots(); alxColTake(c1); });
run("ruins", alxRuinsBuild);
run("people", function () { for (var k in ALX_TALK)
alxTalker(k); });
run("refresh", function () { alxRefresh(); });
},
function () {
var p = wndProg();
if (!p.alx || typeof p.alx !== "object")
p.alx = {};
var S = p.alx;
["f", "sec", "read", "seen", "got", "shelved", "ends"].forEach(function (k) { if (!S[k] || typeof S[k] !== "object")
S[k] = {}; });
if (typeof S.ch !== "number")
S.ch = 0;
if (typeof S.s !== "number")
S.s = 0;
if (typeof S.vit !== "number")
S.vit = 100;
if (typeof S.trust !== "number")
S.trust = 0;
return S;
},
function (id) {
var S = alxS(), st = alxStep(), Pq = ALX.sp[id];
if (alxRuined() && Pq && (alxInLib(Pq.x, Pq.z, Pq.y) || Pq.y < -3))
return false;
if (alxUnderId(id) && !S.f.light)
return id === "niche" && !!S.f.lampOut;
if (id === "niche")
return !!S.f.lampOut;
if (st && alxAccepts(st, id))
return true;
if (/^s\d+$|^letter$|^lamp$|^rod$/.test(id))
return false;
if (id === "trap")
return !!S.f.trap && !S.f.lidOpen;
if (id === "plank")
return !!S.f.lidOpen && !S.f.crossed;
if (id === "door")
return false;
if (/^sec_/.test(id))
return !S.sec[id.slice(4)];
if (/^bed_/.test(id) || /^case_/.test(id) || /^shelf_/.test(id) || /^p_/.test(id) || /^f_/.test(id))
return true;
return ["register", "pinakes", "sundial", "sand", "jarsA", "jarsB", "chest", "breach", "crack", "coffin", "lampchain"].indexOf(id) >= 0;
},
function (title, html, btns, o) {
o = o || {};
var fns = {}, b = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + alxEsc(title) + "</div>" + (o.sub ? "<div style='opacity:.75;font-size:12px;margin-bottom:4px'>" + alxEsc(o.sub) + "</div>" : "") +
"<div style='max-height:56vh;overflow:auto;line-height:1.45'>" + html + "</div>";
(btns || []).forEach(function (B, i) { if (!B)
return; b += worldBtn("a" + i, B[0], B[1] || ""); fns["a" + i] = function () { if (!B[3])
worldCard(null); B[2] && B[2](); }; });
if (!btns || !btns.length) {
b += worldBtn("ok", "Close", "");
fns.ok = function () { worldCard(null); };
}
worldCard(b, fns);
},
function (title, intro, q, answers, right, o) {
o = o || {};
var btns = answers.map(function (A) { return [A[0], "", function () { if (A[1]) {
alxTone(880, 0.08);
right();
}
else {
alxCard(title, "<p>" + alxEsc(A[2] || "Not that one. Think again.") + "</p>", [["Try again", "", function () { alxQuiz(title, intro, q, answers, right, o); }]]);
} }]; });
alxCard(title, (intro ? "<p>" + alxEsc(intro) + "</p>" : "") + "<p><b>" + alxEsc(q) + "</b></p>", btns, { sub: o.sub });
},
function (col, peak) {
try {
var v = ALX.vfx;
if (!v) {
v = ALX.vfx = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:40;opacity:0;transition:opacity .45s";
document.body.appendChild(v);
}
v.style.background = "radial-gradient(ellipse at center,rgba(0,0,0,0) 45%," + (col || "rgba(150,20,10,.55)") + " 100%)";
v.style.opacity = String(peak || 1);
setTimeout(function () { v.style.transition = "opacity 2.2s"; v.style.opacity = "0"; setTimeout(function () { v.style.transition = "opacity .45s"; }, 2300); }, 500);
}
catch (e) { }
},
function () {
var S = alxS();
S.vit = 60;
S.f.faints = (S.f.faints || 0) + 1;
alxSave();
worldCard(null);
alxPut(150, -40, 0, Math.PI / 2);
alxVfx("rgba(0,0,0,.85)", 1);
alxCard("You wake in the infirmary", "<p>The ceiling of Andreas's house, and the smell of vinegar and myrrh. 'Somebody carried you up,' says Andreas, washing his hands. 'You were lucky. Rest, then go on, and more carefully.'</p><p>(❤ " + S.vit + ". Your place in the story is kept: the light shows where you were going.)</p>");
},
function (k, show) {
var S = alxS(), X = ALX_SECRETS[k];
if (!X)
return;
var first = !S.sec[k];
if (first) {
S.sec[k] = Date.now();
alxSave();
}
if (show)
alxCard((first ? "🗝️ A secret: " : "") + X.t, "<p>" + alxEsc(X.p) + "</p><p style='opacity:.8'>Danger: " + alxSkulls(X.d) + " · secrets found " + alxN(S.sec) + " of " + alxN(ALX_SECRETS) + "</p>");
else if (first)
alxSay("🗝️ <b>A secret: " + alxEsc(X.t) + "</b> · danger " + alxSkulls(X.d) + " (" + alxN(S.sec) + " of " + alxN(ALX_SECRETS) + ")");
},
function () {
var S = alxS(), h = "<p>Secrets found: <b>" + alxN(S.sec) + " of " + alxN(ALX_SECRETS) + "</b>. Danger runs from none to ☠☠☠.</p><ul style='margin:4px 0 0 16px;padding:0'>";
for (var k in ALX_SECRETS) {
var X = ALX_SECRETS[k];
h += "<li style='margin:3px 0'>" + (S.sec[k] ? "<b>" + alxEsc(X.t) + "</b> · " + alxSkulls(X.d) : "<span style='opacity:.6'>(not yet found)</span>") + "</li>";
}
alxCard("The secrets of the Library", h + "</ul>", [["Back", "", alxStoryCard]]);
},
function (k, back) {
var H = ALX_HIST[k], S = alxS();
if (!H)
return;
var first = !S.read[k];
S.read[k] = S.read[k] || Date.now();
alxSave();
alxCard(H.t, alxP(H.p) + "<p style='opacity:.7;font-size:12px'>" + alxEsc(H.by) + "</p>", [["Roll it up", "histories read " + alxN(S.read) + " of " + alxN(ALX_HIST), function () { if (back)
back(); alxCheck(); }]], { sub: "from the shelves of " + ALX_ROOMS[H.room] });
if (first)
alxTone(660, 0.06);
},
function (room) {
var S = alxS(), st = alxStep(), b = [], h = "";
if (st && st.shelving && room !== "hall") {
var carry = ALX_SHIPS.filter(function (x) { return S.got[x.k] && !S.shelved[x.k]; });
if (carry.length) {
h += "<p><b>The ships' scrolls you carry.</b> Shelve each in its room: poetry and Homer, histories and geography, or medicine and mathematics. This is the room of <b>" + ALX_ROOMS[room] + "</b>.</p>";
carry.forEach(function (x) { b.push(["Shelve: " + x.t, "", function () { alxShelve(x, room); }]); });
}
}
var list = Object.keys(ALX_HIST).filter(function (k) { return ALX_HIST[k].room === room; });
h += "<p>On these shelves:</p>";
list.forEach(function (k) { b.push([(S.read[k] ? "✓ " : "📜 ") + ALX_HIST[k].t, ALX_HIST[k].by, function () { alxReadCard(k, function () { alxShelfCard(room); }); }]); });
b.push(["Close", "", null]);
alxCard("The shelves of " + ALX_ROOMS[room], h, b);
},
function (x, room) {
var S = alxS();
if (x.room === room) {
S.shelved[x.k] = 1;
alxSave();
alxTone(880, 0.06);
alxSay("Shelved: <b>" + alxEsc(x.w) + "</b> (" + alxN(S.shelved) + " of " + ALX_SHIPS.length + ")");
if (alxN(S.shelved) < ALX_SHIPS.length)
alxShelfCard(room);
alxCheck();
}
else {
S.f.misshelf = (S.f.misshelf || 0) + 1;
alxSave();
alxCard("Not here", "<p>Theodote, passing, takes it from your hand. '" + alxEsc(x.t) + "... That is not " + ALX_ROOMS[room] + ". Read the first words again: what kind of book begins like that?'</p>", [["Back to the shelf", "", function () { alxShelfCard(room); }]]);
}
},
function (k) {
var C = ALX_CASES[k], S = alxS();
if (!C)
return;
S.seen[k] = S.seen[k] || Date.now();
alxSave();
var b = [];
if (k === "organ")
b.push(["Press the keys", "", function () { alxOrgan(false); }]);
if (k === "edict" && !S.sec.ashoka)
b.push(["Take out the note behind it", "", function () { alxSecret("ashoka", true); }]);
if (k === "dedication" && !S.sec.ring)
b.push(["Look at the mason's mark", "", function () { alxSecret("ring", true); }]);
b.push(["Close", "treasures seen " + alxN(S.seen) + " of " + alxN(ALX_CASES), function () { alxCheck(); }]);
alxCard(C.t, "<p>" + alxEsc(C.p) + "</p>", b, { sub: "the king's treasures" });
},
function (k, step) {
var S = alxS(), txt = ALX_BED_TXT[k];
if (!step) {
alxCard("A bed of herbs", "<p>" + alxEsc(txt) + "</p>" + (S.f.herbsDone || S.sec.poison ? "<p style='opacity:.8'>" + (ALX_HERBS[k] ? "A healing herb: " + k + "." : "Poison: " + ALX_POISON[k] + ".") + "</p>" : ""));
return;
}
if (k === "carrot" && !S.f.aspDone && !S.f.aspUp)
return alxAsp();
if (S.got["herb_" + k]) {
alxCard("A bed of herbs", "<p>You already have some of this.</p>");
return;
}
S.f["looked_" + k] = 1;
alxSave();
alxCard("A bed of herbs", "<p>" + alxEsc(txt) + "</p>", [["Pick some", "", function () { alxPick(k); }], ["Leave it", "", null]]);
},
function (k) {
var S = alxS();
if (ALX_HERBS[k]) {
S.got["herb_" + k] = 1;
alxSave();
alxTone(880, 0.06);
var n = Object.keys(ALX_HERBS).filter(function (h) { return S.got["herb_" + h]; }).length;
alxSay("You have <b>" + k + "</b> (" + n + " of 4 herbs)");
alxCheck();
return;
}
alxSecret("poison", false);
S.f.poisoned = (S.f.poisoned || 0) + 1;
alxSave();
var dmg = k === "monkshood" ? 25 : k === "hemlock" ? 20 : 15;
alxCard("Poison", "<p>" + (k === "monkshood" ? "Your fingers tingle, then go numb; your lips burn. Monkshood poisons through the skin." : k === "hemlock" ? "It is hemlock: the smooth spotted stem, the smell of mice. The sap is on your hands; your mouth goes dry and your legs feel heavy." : "The smell alone makes your head swim.") + "</p><p>Andreas sees from across the garden and comes running with water and vinegar. 'Not that one! Wash, now. Look at the stems before you pick.'</p>", [["Wash your hands", "", function () { alxHurt(dmg, "Poisoned by " + ALX_POISON[k]); }]]);
},
function () {
var S = alxS();
S.f.aspUp = 1;
alxSave();
if (ALX.aspHood)
ALX.aspHood.visible = true;
alxSecret("asp", false);
alxCard("A cobra!", "<p>As you reach into the bed, something moves in the warm stones of the wall: an Egyptian cobra lifts its head and spreads its hood, a pace from your hand. It sways, watching you.</p>", [
["Freeze. Keep perfectly still.", "", function () { S.f.aspHold = 1; ALX.hold = 0; alxSave(); alxSay("<b>Keep perfectly still</b> (do not move or turn)..."); }],
["Snatch your hand back and run", "", function () { S.f.aspUp = 0; S.f.aspDone = 1; if (ALX.aspHood)
ALX.aspHood.visible = false; alxSave(); alxCard("Bitten", "<p>It strikes at the movement. A sting like a hot nail in your wrist. Andreas is there in a moment with a cord and a knife, cuts, sucks, spits. 'Cobras strike what moves. You will live, I think; you got little of the poison.'</p>", [["Go on", "", function () { alxHurt(35, "Bitten by the cobra"); }]]); }],
["Strike at it with a hoe", "", function () { S.f.aspUp = 0; S.f.aspDone = 1; S.trust -= 1; if (ALX.aspHood)
ALX.aspHood.visible = false; alxSave(); alxCard("Bitten", "<p>You miss; it does not. Andreas cuts and sucks the wound, angry and frightened at once. 'It has lived in that wall longer than you have been in Alexandria. It keeps the rats off the seed. Next time, be still.'</p>", [["Go on", "", function () { alxHurt(30, "Bitten by the cobra"); }]]); }]
]);
},
function (k) {
var F = ALX_FORBID[k], S = alxS();
if (!F)
return;
S.seen["f_" + k] = 1;
alxSave();
var b = [];
if (k === "dissect")
b = [["Read it, all of it", "", function () { S.f.readDissect = 1; alxSecret("dissect", true); alxCheck(); }], ["Close it", "", function () { alxCheck(); }]];
else if (k === "pots")
b = [["Smash one, as the priests do", "", function () { alxSecret("pots", false); S.f.smashed = 1; alxSave(); alxCard("Smashed", "<p>The pot bursts on the floor and a shard opens the side of your hand. The names lie broken among the pieces.</p>", [["Bind your hand", "", function () { alxHurt(6, "Cut by a shard"); alxCheck(); }]]); }], ["Leave them", "", function () { alxCheck(); }]];
else if (k === "map")
b = [["Study the plan", "", function () { S.f.map = 1; alxSecret("map", true); alxCheck(); }]];
else if (k === "debt")
b = [["Keep the tablet", "", function () { S.f.debt = 1; if (ALX.debtG)
ALX.debtG.visible = false; alxSecret("debt", true); alxCheck(); }]];
else if (k === "setne")
b = [["Read to the end", "", function () { alxSecret("setne", true); alxCheck(); }]];
else
b = [["Roll it up", "", function () { alxCheck(); }]];
alxCard(F.t, "<p>" + alxEsc(F.p) + "</p>", b, { sub: "the room the kings keep closed" });
},
function (step) {
var h = "<p>The Tables of Callimachus: one hundred and twenty rolls in pigeonholes. Each kind of book in its own Tables, the authors in the order of the alphabet, with their lives, their works, the first words and the number of lines.</p>";
if (!step) {
var b = [];
["hall", "poetry", "history", "science"].forEach(function (r) { b.push(["Look up: " + ALX_ROOMS[r], "", function () { alxShelfCard(r); }]); });
b.push(["Close", "", null]);
alxCard("The Tables of Callimachus", h, b);
return;
}
alxQuiz("The Tables of Callimachus", h + "<p>You look for the book Archimedes mentioned. Under the class of 'everything else', in Callimachus's own hand: <i>Sostratus son of Dexiphanes, of Cnidus: 'Of the rooms beneath', one roll. Kept: under Asclepius, beneath the rug.</i></p><p>Asclepius is the god of healing.</p>", "Which room is 'under Asclepius'?", [["The room of poetry and Homer", 0, "The Muses keep poetry, not Asclepius."], ["The room of histories and geography", 0, "Clio keeps the histories."], ["The room of medicine and mathematics", 1], ["The physicians' garden", 0, "A garden has no rug."]], function () { alxSay("The room of <b>medicine and mathematics</b>: look under its rug."); alxDone(); });
},
function (step) {
var tune = ["E", "D", "C", "B", "A", "G", "F", "E"], fq = { E: 330, D: 294, C: 262, B: 247, A: 220, G: 196, F: 175 }, got = [];
var draw = function () {
var h = "<p>Ctesibius has chalked on a slate: <b>the Dorian scale, falling: E D C B A G F E</b>. Press the keys in that order.</p><p style='font-size:20px;letter-spacing:4px'>" + (got.join(" ") || "&nbsp;") + "</p>";
var b = ["A", "B", "C", "D", "E", "F", "G"].map(function (n) {
return [n, "", function () {
alxTone(fq[n], 0.35);
got.push(n);
var ok = got.every(function (g, i) { return g === tune[i]; });
if (!ok) {
got = [];
alxSay("A wrong note: the scale starts again from E.");
}
if (ok && got.length === tune.length) {
alxCard("The hydraulis", "<p>The pipes sound, steady as a breath, and fall through the scale to the low E. Ctesibius claps. 'You see? The water keeps the air even. Thais herself could not have done better.'</p>", [["Go on", "", function () { alxS().f.organ = 1; alxSave(); if (step)
alxDone(); }]]);
return;
}
draw();
}, 1];
});
b.push(["Stop", "", null]);
alxCard("The hydraulis", h, b);
};
draw();
},
function () {
var P = "SAYTHENINENAMES", k = 3, m = P.length / k, strip = "", i, j;
for (i = 0; i < P.length; i++) {
var o = i % k, jj = Math.floor(i / k);
strip += P[o * m + jj];
}
var dec = function (kk) { var out = ""; for (var o = 0; o < kk; o++)
for (j = o; j < strip.length; j += kk)
out += strip[j]; return out; };
var S = alxS();
if (!S.f.rod) {
alxCard("The strip of letters", "<p>A leather strip nailed across the door, its letters jumbled: <b style='letter-spacing:3px'>" + strip + "</b></p><p>Wound round a rod of the right thickness it would read plain. You have no rod.</p>");
return;
}
alxSecret("scytale", false);
alxQuiz("The strip and the rod", "You wind the strip round rods of three thicknesses: round the thin end of your rod (every 2nd letter), round its middle (every 3rd), round the thick end (every 4th). The letters line up along the rod: <b style='letter-spacing:3px'>" + strip + "</b>", "Which reading makes sense?", [[dec(2), 0, "Nonsense: the letters do not join up."], [dec(3), 1], [dec(4), 0, "Nonsense: the letters do not join up."]], function () {
alxQuiz("The names of the nine", "SAY THE NINE NAMES. Whose nine? The Mouseion is the house of the Muses. You speak to the door:", "Which are the nine?", [["Calliope, Clio, Erato, Euterpe, Melpomene, Polyhymnia, Terpsichore, Thalia, Urania", 1], ["Calliope, Clio, Athena, Euterpe, Hestia, Polyhymnia, Terpsichore, Thalia, Urania", 0, "Athena and Hestia are goddesses, but not Muses."], ["Clio, Erato, Euterpe, Melpomene, Pandora, Thalia, Urania, Helen, Calliope", 0, "Pandora and Helen were never Muses."]], function () {
var S2 = alxS();
S2.f.doorOpen = 1;
alxSave();
alxRefresh();
alxTone(196, 0.5);
alxCard("The door", "<p>As you say the last name there is a click from inside the door, and the bar lifts. Whoever made this lock trusted that only a scholar of the Mouseion would know the nine. The door swings in on the dark.</p>", [["Go in", "", function () { alxDone(); }]]);
});
});
},
function () { alxCard("Kallias, the doorkeeper", "<p>The old man reads your letter at arm's length. 'For Eratosthenes, eh? The new keeper. He is in the lecture hall, east across the court. Sign the register first: the king likes to know who reads his books.'</p><p>'And read something before you go bothering him. He will ask. The reading hall is south of the court; start with the founding of the city.'</p>", [["Sign the register", "", function () { alxS().f.signed = 1; alxDone(); }]]); },
function () { alxCard("Eratosthenes", "<p>A tall man with a measuring rod in one hand and a bread roll in the other. 'A reader! Good. I need hands more than I need readers. Can you read Greek quickly? Good.'</p><p>'A ship from Rhodes came in last night. The porters carried up her books to be copied, and some fool dropped the basket in the court: the labels came off and the scrolls went everywhere, ten of them, some even outside. Find all ten. Read the first words of each, and shelve it in the right room: poetry and Homer, histories and geography, or medicine and mathematics. The rooms are along the north side of the court.'</p>", [["Begin the search", "", alxDone]]); },
function (id) {
var S = alxS(), x = ALX_SHIPS.filter(function (y) { return y.k === id; })[0];
S.got[id] = 1;
alxSave();
alxRefresh();
alxTone(980, 0.05);
var n = ALX_SHIPS.filter(function (y) { return S.got[y.k]; }).length;
alxCard("A scroll from the ship", "<p>No label. You unroll the first column: <i>" + alxEsc(x.t) + "</i></p><p style='opacity:.8'>" + n + " of 10 found.</p>", [["Keep it", "", function () { alxCheck(); }]]);
},
function () {
var S = alxS(), m = S.f.misshelf || 0;
if (m <= 2)
S.trust += 1;
alxSave();
alxCard("Eratosthenes", "<p>He checks the shelves himself, which you expected. " + (m <= 2 ? "'All ten, and all in the right place. Callimachus will be pleased, and he is never pleased.'" : "'All ten. Theodote tells me some of them went on a little journey round the rooms first. Well. They are where they belong now.'") + "</p><p>'Go and find Theodote in the reading hall. She will show you how a book is made. You cannot keep books if you do not know what they are.'</p>", [["Go on", "", alxDone]]);
},
function () {
alxQuizzes("Callimachus's test", [
["'So you have been reading. Let us see if you can find a book. My Tables put every author in his class.'", "Herodotus, who wrote of the Persian wars: which Tables?", [["History", 1], ["Oratory", 0, "Herodotus made no speeches; he asked questions."], ["Epic", 0, "He wrote prose, not verse."]]],
["'Good. Next.'", "Sappho of Lesbos: which Tables?", [["Lyric poetry", 1], ["Tragedy", 0, "She wrote songs for the lyre, not plays."], ["Philosophy", 0, "Songs of love, not philosophy."]]],
["'Next.'", "Hippocrates of Cos: which Tables?", [["Medicine", 1], ["Laws", 0, "His oath is no law."], ["History", 0, "He wrote of diseases."]]],
["'Last.'", "Euclid: which Tables?", [["Mathematics", 1], ["Everything else", 0, "He has his own class, surely."], ["Philosophy", 0, "Close, but no."]]]
], function () { alxS().trust += 1; alxSave(); alxCard("Callimachus", "<p>'Hm. You will do.' From him, that is a speech of praise. 'A big book is a big evil, remember. Now go away; Apollonius is in the court packing his big book, and he wants to say goodbye to someone who is not me.'</p>", [["Go on", "", alxDone]]); });
},
function () { alxCard("Apollonius", "<p>'You are the new reader? Then take some advice from an old keeper. This house has more rooms than the plans show. Sostratus of Cnidus, who built the lighthouse, built for the old king too, and he liked his secrets. If you ever find his name somewhere it should not be, follow it.'</p><p>He presses a strip of papyrus into your hand: a list of the treasures in the king's hall across the street. 'See them before you do anything else. Ctesibius will talk your ears off, but it is worth it.'</p>", [["Go on", "", alxDone]]); },
function () {
alxQuizzes("Ctesibius's clock", [
["'Everyone asks me what hour it is. Nobody asks how the clock knows! Look: water drips from this little tank into the tall jar, and the float rises with it.'", "Why does the water drip at the same speed all day?", [["The tank above is kept brim-full by an overflow, so the water always presses the same", 1], ["The water is warmed by the sun", 0, "Warm water would run faster at noon. No good!"], ["A slave pours it in carefully", 0, "Slaves get bored. Machines do not."]]],
["'Yes! Now, the Egyptians cut daylight into twelve hours, summer and winter alike.'", "So in summer, an hour of daylight is...", [["Longer than in winter", 1], ["Shorter than in winter", 0, "Summer days are long; twelve hours of a long day are long hours."], ["The same as in winter", 0, "Only if the day is the same length, and it is not."]]]
], function () { alxCard("Ctesibius", "<p>'So I made the column of hours to turn with the seasons. Now go and look at everything. And try my organ: I have chalked a scale for you.'</p>", [["Go on", "", alxDone]]); });
},
function () {
alxQuizzes("The measure of the earth", [
["'At Syene, at noon on midsummer's day, the sun shines down a well and a pole has no shadow. Here, at the same hour, a pole's shadow makes an angle of one fiftieth of a circle. Syene is 5,000 stadia away.'", "How far is it round the whole earth?", [["250,000 stadia", 1], ["50,000 stadia", 0, "That is only ten times 5,000. The angle is one fiftieth."], ["5,000,000 stadia", 0, "Too many: fifty times 5,000."]]],
["'And what must be true of the sun for this to work?'", "", [["It is so far away that its rays fall parallel", 1], ["It is close, just above Syene", 0, "Then the shadows would tell you the sun's height, not the earth's size. Some argued so."], ["It goes round the earth once a day", 0, "True or not, it does not matter here."]]]
], function () { alxCard("Eratosthenes", "<p>'Exactly so.' He beams. 'Go and watch the shadow in the court for yourself: the sundial by the colonnade. Then come back; a letter came for me from Syracuse, and I have mislaid it, as usual. Somewhere in the dining hall.'</p>", [["Go on", "", alxDone]]); });
},
function () { var S = alxS(); S.got.letter = 1; alxSave(); alxRefresh(); alxCard("A letter from Syracuse", "<p><i>Archimedes to Eratosthenes, greetings. Since I see you are a serious student, and a man of the first rank in philosophy, I am sending you a way of looking at certain problems by means of mechanics: weighing figures against one another, as if on a balance, to find what is true before one proves it...</i></p><p><i>...and here is a little problem of the cattle of the Sun, for the mathematicians of Alexandria, if they are as clever as they say.</i></p><p style='opacity:.8'>(Archimedes really did dedicate his book 'The Method' to Eratosthenes, and the Cattle Problem was sent to him.)</p>", [["Take it to Eratosthenes", "", alxDone]]); },
function () {
alxQuizzes("The sieve", [
["'Ha! Archimedes and his cattle. Never mind. While you are here, my sieve: write the numbers, cross out every second after 2, every third after 3, and so on. What is left are the primes, the numbers nothing divides.'", "Which of these is prime?", [["41", 1], ["39", 0, "39 is 3 times 13."], ["49", 0, "49 is 7 times 7."]]],
["'Good.'", "And which of these?", [["59", 1], ["57", 0, "57 is 3 times 19."], ["63", 0, "63 is 7 times 9."]]],
["'To find all the primes up to 100, which numbers' multiples need crossing out?'", "", [["2, 3, 5 and 7", 1], ["Every number up to 50", 0, "Far more work than you need: 11 times 11 is already more than 100."], ["Only 2", 0, "Then 9 would be left, and 9 is 3 times 3."]]]
], function () { var S = alxS(); S.trust += 1; alxSave(); alxCard("Eratosthenes", "<p>'You will be a scholar yet. Now, I have a favour to ask. Theodote has a cough that will not go. Go to the physicians' garden, east of the Library, and ask Andreas for something for it.'</p>", [["Go on", "", alxDone]]); });
},
function () { alxCard("Andreas", "<p>'A cough? I can make a syrup. I need four herbs: <b>fennel</b>, tall and feathery, smelling of aniseed; <b>rue</b>, a low grey-blue bush, bitter; <b>poppy</b>, red, with round seed heads; and <b>wild carrot</b>, white flower umbrellas with one dark red floweret in the middle, and <b>hairy</b> stems.'</p><p>'Careful. Hemlock looks like wild carrot, but its stems are <b>smooth and spotted purple</b> and it smells of mice. Half of these beds can kill you. And there is a cobra in the wall by the carrot. If she rises, <b>keep perfectly still</b>. Cobras strike what moves.'</p>", [["Go and gather them", "", alxDone]]); },
function () { var S = alxS(); S.f.herbsDone = 1; S.vit = 100; alxSave(); alxCard("Andreas", "<p>He pounds the herbs with honey and boils them down. 'For her cough. And sit: let me see you.' He takes your wrist and counts, watching a little water clock no bigger than a cup. 'Herophilus taught us this: a healthy pulse has its own time. Yours is quick, but you are well.'</p><p>He cleans your scratches with wine. (❤ 100)</p>", [["Take the syrup to Theodote", "", alxDone]]); },
function () { var S = alxS(); S.trust += 1; alxSave(); alxCard("Theodote", "<p>'Andreas made this? Then it will taste like a goat's foot, and work.' She drinks it and makes a face. 'Thank you. Read about Herophilus before you trust any physician, by the way. He is on the shelves of medicine and mathematics.'</p>", [["Go on", "", alxDone]]); },
function () {
var S = alxS();
alxSecret("trap", false);
S.f.trap = 1;
alxSave();
alxCard("Under the rug", "<p>Under the rug, a long trap of old planks, and a bronze ring. You heave it up. A stair goes down into cold dark air that smells of wet stone and old papyrus.</p><p>You will need a light. And someone ought to know where you have gone.</p>", [
["Tell Eratosthenes first", "", function () { S.f.lidOpen = 1; S.f.path = "told"; alxSave(); alxRefresh(); alxDone(); }],
["Go down alone, now: take an oil lamp from the reading hall", "", function () { S.f.lidOpen = 1; S.f.path = "alone"; alxSave(); alxRefresh(); alxDone(); }]
]);
},
function () {
var S = alxS();
S.f.light = "lantern";
S.trust += 1;
alxSave();
alxCard("Eratosthenes", "<p>He is quiet a long moment. 'Sostratus's rooms. The old king's stores. Some say the originals of the ships are there; some say worse things.' He gives you a horn lantern with a closed door. 'Never an open flame among papyrus. Never. Go and look, and come back and tell me. If you are not back by dark, I will send the guard.'</p>", [["Take the lantern", "", alxDone]]);
},
function () {
var S = alxS();
alxSecret("tunnel", false);
alxCard("The breach", "<p>The east wall has been broken through, and recently: fresh chisel marks, chips of plaster on the floor. Beyond is a narrow tunnel propped with old cedar" + (S.f.map ? ", the way of Sostratus's plan, to the lower chamber of the Sema, where Alexander lies." : ".") + " Far down it, a light moves.</p>", [
["Chalk an arrow on the wall for the guards, then follow", "", function () { S.f.chalk = 1; alxSave(); alxDone(); }],
["Follow at once, quietly", "", function () { alxDone(); }]
]);
},
function () {
var order = ["Cut the papyrus stems in the marsh", "Peel off the green rind", "Slice the pith into thin strips", "Lay one layer of strips, and a second across it", "Press and beat them; the sap glues them", "Dry the sheet in the sun", "Polish it smooth with a shell", "Glue twenty sheets into a roll"], done = 0;
var draw = function () {
var left = order.slice(done), opts = left.slice().sort(function (a, b) { return (a.length * 7 % 5) - (b.length * 7 % 5) || a.localeCompare(b); });
var h = "<p>Theodote sets out reeds, a knife, a board, a mallet. 'Show me you know how papyrus is made. What comes next?'</p><ol style='margin:4px 0 4px 18px;padding:0'>" + order.slice(0, done).map(function (s) { return "<li>" + alxEsc(s) + "</li>"; }).join("") + "</ol>";
alxCard("Making papyrus", h, opts.map(function (o) {
return [o, "", function () {
if (o === order[done]) {
done++;
alxTone(700 + done * 40, 0.05);
if (done >= order.length) {
alxCard("Theodote", "<p>'Good. Now you know why a book costs what it does. Ink is soot and gum; the pen a split reed. You read by unrolling with the right hand and rolling up with the left. Now go and read; the shelves are yours.'</p>", [["Go on", "", alxDone]]);
return;
}
draw();
}
else
alxCard("Making papyrus", "<p>'Not yet,' says Theodote. 'Think: what has to happen before that?'</p>", [["Try again", "", draw]]);
}, 1];
}));
};
draw();
},
function (id) {
var S = alxS();
S.f["srch_" + id] = 1;
alxSave();
var n = ["jarsA", "jarsB", "chest"].filter(function (k) { return S.f["srch_" + k]; }).length;
var after = function () { if (n >= 2 && S.f.light === "open" && !S.f.fireDone)
return alxFire(); alxCheck(); };
if (id === "chest") {
alxSecret("tragedies", false);
alxCard("The king's chest", "<p>The seal is old and cracked. Inside, wrapped in linen, three bundles of scrolls, very old, labelled in the Attic letters of a hundred years ago: <b>Aeschylus. Sophocles. Euripides. The copies of the city of Athens.</b> The fifteen talents' worth. The king never sent them back.</p>", [["Wrap them again", "", after]]);
}
else if (id === "jarsA")
alxCard("The jars", "<p>Jar after jar, tag after tag: from the ships. One jar, unlabelled, holds a single roll: <i>Sostratus of Cnidus, Of the rooms beneath</i>. It is a plan of what lies under the Library: these stores, a passage north, a cistern, and a door 'which opens to those who know the nine, when the strip is read upon the rod'.</p>", [["Roll it up", "", after]]);
else {
if (ALX.items.rod)
ALX.items.rod.visible = true;
alxSecret("scytale", false);
alxCard("The jars", "<p>Behind the last jar, laid carefully on the shelf, a smooth wooden rod that tapers from thick to thin. Not a scroll's stick. Something else.</p>", [["Go on", "", after]]);
}
},
function () {
var S = alxS();
S.f.fireDone = 1;
alxSave();
alxSecret("fire", false);
if (ALX.fire)
ALX.fire.visible = true;
var end = function (t, h, dmg, tr, burnt) { S.trust += tr; S.f.burnt = burnt ? 1 : 0; alxSave(); if (ALX.fire)
ALX.fire.visible = false; if (burnt && ALX.scorch)
ALX.scorch.visible = true; alxCard(t, "<p>" + h + "</p>", [["Go on", "", function () { if (dmg)
alxHurt(dmg, "Burned"); alxCheck(); }]]); };
var b = [];
if (S.f.sand)
b.push(["Throw sand from the great jar by the stair", "", function () { end("Out", "Three scoops of the dry sand and the flame is gone, smothered, before it has taken more than one label. The keepers of these stores knew what they were doing when they left that jar.", 0, 1, 0); }]);
b.push(["Beat it out with your cloak", "", function () { end("Out", "You smother the flame with your cloak and your bare hands. It is out; your palms are blistered and the cloak is ruined.", 15, 0, 0); }]);
b.push(["Run back for water", "", function () { end("Burning", "By the time you are back the whole row of jars is smoking. You beat it out at last, coughing, eyes streaming. Thirty scrolls are ash: books from the ships that no one will ever read again.", 20, -2, 1); }]);
alxCard("Fire!", "<p>Your open lamp gutters as you lean over the jars, and a drop of burning oil falls on a dry papyrus label. A blue flame runs up it, and the next, and the next.</p>", b);
},
function () {
var S = alxS();
alxSecret("plank", false);
alxCard("The plank", "<p>An old plank laid straight across the water to the door, fifty paces, half rotten, green with slime. The water beneath is black and deep and cold. The ledges go round the walls, the long way.</p>", [
["Run across it", "", function () {
S.f.plankBroke = 1;
S.f.lightWas = S.f.light;
S.f.light = 0;
S.f.lampOut = 1;
S.f.crossed = 1;
alxSave();
alxPut(84, -165.6, ALX_Y, Math.PI);
alxCard("Into the water", "<p>Halfway across the plank cracks like a whip and you are under, in black water so cold it stops your breath. Your light hisses out. You flounder among the columns, find a ledge with your hands, and drag yourself out, shaking, at the foot of the door.</p><p>There is a lamp burning in a niche beside it.</p>", [["Get your breath", "", function () { alxHurt(25, "Nearly drowned in the cistern"); alxCheck(); }]]);
}],
["Crawl across slowly, spreading your weight", "", function () { S.f.crossed = 1; alxSave(); alxPut(84, -165.6, ALX_Y, Math.PI); alxCard("Across", "<p>On hands and knees, an inch at a time, holding your light in your teeth. The plank groans and sags but holds. You are across.</p>", [["Go on", "", alxCheck]]); }],
["Go round by the ledges", "", null]
]);
},
function () {
var S = alxS();
alxSecret("tunnel", false);
alxCard("The crack", "<p>Halfway along, the roof is cracked right across, and a cedar prop is bent like a bow. Grit is falling in a thin stream. The light ahead is closer now.</p>", [
["Shore up the prop first, carefully", "", function () { S.f.shoring = 1; ALX.hold = 0; alxSave(); alxDone(); }],
["Dash under it", "", function () { if (ALX.rubble)
ALX.rubble.visible = true; alxSave(); alxPut(116, -177, ALX_Y, -Math.PI / 2); alxCard("Falling stone", "<p>You are halfway under when the prop gives. A shower of stone comes down behind you and across your shoulders. You stagger on into the dark, bruised and bleeding, and the way back is half choked with rubble.</p>", [["Go on", "", function () { alxHurt(20, "Struck by falling stone"); alxDone(); }]]); }]
]);
},
function () {
var S = alxS(), F = S.f, b = [];
var fin = function (end, tr, h, dmg) { F.end = end; S.trust += tr; alxSave(); alxCard("The Sema", h, [["Go on", "", function () { if (dmg)
alxHurt(dmg, end === "fled" ? "Shoved against the stone" : "Cut by Kleon's knife"); alxDone(); }]]); };
if (F.debt)
b.push(["'I know about Myrrhine, Kleon. The keeper can help.'", "", function () { fin("mercy", 3, "<p>The chisel stops. He looks at you, and then he is crying, an ugly, frightened sound. 'Three talents by the new moon or they sell her. What was I to do?' He gives you the chisel. You walk him back together, and you promise to ask Eratosthenes. Alexander's gold is untouched.</p>"); }]);
b.push(["Shout for the guards", "", function () { if (F.chalk)
fin("guards", 1, "<p>Your shout booms through the chamber, and to your astonishment it is answered: torches in the tunnel, the guard of the palace under Nikanor, who followed your chalk arrows. Kleon drops the chisel and does not run. They take him away. The gold is safe.</p>");
else
fin("fled", 0, "<p>Your shout booms and dies in the stone. No one comes. Kleon panics, shoulders past you into the tunnel with a fistful of gold leaves from the wreath, and is gone.</p>", 8); }]);
b.push(["Step in and stop him", "", function () { fin("fought", 2, "<p>You grab his arm. He swings the knife without looking and it opens your forearm, and then he is running, and the chisel rings on the floor. You have stopped him. The gold is safe, and you are bleeding on the floor of Alexander's tomb.</p>", 30); }]);
b.push(["Help him: the gold would pay a lifetime", "", function () { fin("banished", -5, "<p>You take the other side of the lid. It is heavier than you thought, and louder. Torches come up the stair from the Sema above: the palace guard, who heard the chisel. There is no talking to them. To touch the tomb of Alexander is death; the keeper's word saves your life but not your place.</p>"); }]);
b.push(["Back away and leave him to it", "", function () { fin("fled", -1, "<p>You slip back into the tunnel. Behind you the chisel goes on, and then stops, and then there is nothing but the drip of the cistern.</p>"); }]);
alxCard("Kleon", "<p>The chamber is painted like a Macedonian tomb, red and black and white, and in the middle on a white stone stands a coffin of gold under a gold wreath of oak leaves. Kneeling on the stone with a chisel and a knife, prying at the lid, is Kleon the porter.</p><p>He sees you. 'Go back. Go back! This is nothing to do with you.'</p>", b);
},
function () {
var S = alxS(), F = S.f, end = F.end || "fled", t = "", h = "";
if (end === "banished") {
S.ends.banished = 1;
S.done = 1;
S.on = 1;
alxSave();
alxCard("Banished from Alexandria", "<p>Eratosthenes does not look at you. 'I spoke for you. They will not kill you. But you are no reader of the Mouseion any more, and you must be on a ship by morning.'</p><p><b>Ending: Banished.</b> (1 of 5 endings found: " + alxN(S.ends) + ")</p>", [["Go back to the Sema and choose again", "the chapter starts again", function () { var S2 = alxS(); S2.done = 0; S2.ch = 10; S2.s = 0; S2.f.end = ""; S2.trust += 5; alxSave(); alxChapterBegin(true); }], ["Close", "", null]]);
return;
}
var titles = { mercy: ["The Keeper's Friend", "'You saw a man drowning and threw him a rope, not a stone. I will speak to the king's treasurer about the moneylender Philon; the law on selling free women for debt is not on his side.'"],
guards: ["Guardian of the Sema", "'Chalk on the wall! Nikanor says he would never have found you otherwise. That was clear thinking.'"],
fought: ["Defender of the Sema", "'You fought a man with a knife in the dark for a dead king's gold. Brave; foolish; brave. Andreas will sew your arm.'"],
fled: ["Witness in the Dark", "'Some of the gold is gone, and the thief with it. But we know the way now, and it will be walled up tonight. You came back, and you told me. That is worth more than you think.'"] };
var T = titles[end] || titles.fled;
S.ends[end] = 1;
S.done = 1;
S.on = 1;
var rank = S.trust >= 6 ? "a Scholar of the Mouseion, paid by the king" : S.trust >= 3 ? "a Reader of the Mouseion" : "a Reader of the Mouseion, on trial";
alxSave();
h = "<p>Eratosthenes hears it all, from the rug to the coffin of gold. " + alxEsc(T[1]) + "</p>" + (F.burnt ? "<p>'And thirty scrolls of the ships are ash. Never an open flame. Never.'</p>" : "") + (F.readDissect ? "<p>'You read Herophilus's notebook. Yes: knowledge bought like that. It stays where it is. Some things are kept so that we remember the price.'</p>" : "") +
"<p>'The stores, the cistern, the closed room: they are yours to walk now, as a keeper's reader. You are " + rank + ".'</p><p><b>Ending: " + T[0] + ".</b> Endings found " + alxN(S.ends) + " of 5 · secrets " + alxN(S.sec) + " of " + alxN(ALX_SECRETS) + " · histories read " + alxN(S.read) + " of " + alxN(ALX_HIST) + "</p>";
alxCard("The keeper of the scrolls", h, [["The end", "the Library is yours to explore; the register keeps your secrets and endings", function () { alxRefresh(); }]]);
},
function () {
var S = alxS(), guard = 0;
while (guard++ < 40) {
var C = ALX_CH[S.ch];
if (!C) {
S.done = 1;
alxSave();
return;
}
if (S.s >= C.steps.length) {
S.ch++;
S.s = 0;
alxSave();
if (!ALX_CH[S.ch]) {
S.done = 1;
alxSave();
return;
}
alxChapterCard();
continue;
}
var st = C.steps[S.s];
if (st.skip && st.skip(S)) {
S.s++;
continue;
}
if (st.begin && !S.f["b" + S.ch + "_" + S.s]) {
S.f["b" + S.ch + "_" + S.s] = 1;
st.begin(S);
}
alxSave();
alxSay(st.say);
return;
}
},
function () {
var S = alxS(), C = ALX_CH[S.ch];
if (!C)
return;
alxChapterSetup();
setTimeout(function () { alxCard("Chapter " + (S.ch + 1) + ": " + C.t, "<p>" + alxEsc(C.intro) + "</p>", [["▶ Go on", "", function () { var st = alxStep(); if (st)
alxSay(st.say); }]], { sub: "The Keeper of the Scrolls · the Library of Alexandria" }); }, 600);
},
function (place) {
var S = alxS();
S.on = 1;
alxSave();
alxChapterSetup();
alxRefresh();
if (place) {
var C = ALX_CH[S.ch];
if (S.ch === 10)
alxPut(96, -177, ALX_Y, -Math.PI / 2);
else if (S.ch >= 7 && S.ch <= 9)
alxPut(84, -80, ALX_Y, Math.PI);
else
alxPut(26, -47, 0.6, -Math.PI / 2);
}
alxChapterCard();
var st = alxStep();
if (st && st.begin && !S.f["b" + S.ch + "_" + S.s]) {
S.f["b" + S.ch + "_" + S.s] = 1;
st.begin(S);
alxSave();
}
},
function () {
var S = alxS(), b = [], C = ALX_CH[S.ch];
var h = "<p>A story of the Library of Alexandria, about 243 BC, in twelve chapters: about three hours if you read what you find. Histories to read on every shelf, sixteen treasures on show, " + alxN(ALX_SECRETS) + " secrets, some of them deadly, and five endings that come from your own choices. Your strength (❤) runs down when you choose badly; at nothing you wake in the infirmary.</p>";
if (S.done)
h += "<p><b>You have finished the story.</b> Endings found: " + alxN(S.ends) + " of 5.</p>";
else if (S.on)
h += "<p>You are in chapter " + (S.ch + 1) + ": <b>" + alxEsc(C ? C.t : "") + "</b>. ❤ " + S.vit + "</p>";
if (!S.on || S.done)
b.push([S.done ? "▶ Play it again from the start" : "▶ Begin the story", "Chapter 1: A stranger at the gate", function () { alxRestart(); }]);
else {
b.push(["▶ Go on", "chapter " + (S.ch + 1) + ": " + (C ? C.t : ""), function () { var st = alxStep(); if (st)
alxSay(st.say); }]);
b.push(["Start again from the beginning", "", function () { alxRestart(); }]);
}
b.push(["🗝️ The secrets you have found", alxN(S.sec) + " of " + alxN(ALX_SECRETS), function () { alxSecretsCard(); }, 1]);
if (wndKeeper() && alxRuined())
b.push(["Keeper: raise the Library again now", "it lies in ruins for everyone", function () { alxKeeperRaise(); }]);
if (wndKeeper())
ALX_CH.forEach(function (c, i) { b.push(["Keeper: chapter " + (i + 1) + ", " + c.t, "", function () { var S2 = alxS(); S2.ch = i; S2.s = 0; S2.done = 0; S2.on = 1; alxSave(); alxChapterBegin(true); }]); });
b.push(["Close", "", null]);
alxCard("📜 The Keeper of the Scrolls", h, b, { sub: "the register of readers of the Mouseion" });
},
function () {
var S = alxS(), st = alxStep(), want = alxAtList(st);
for (var k in ALX.items) {
var g = ALX.items[k];
if (!g)
continue;
var vis = want.indexOf(k) >= 0 && !S.got[k];
if (k === "rod")
vis = vis || (S.f.srch_jarsB && !S.f.rod);
g.visible = !!vis;
}
alxLid(!!S.f.lidOpen);
var dOpen = !!S.f.doorOpen, L = ALX.doorL, D = ALX.doorS;
if (L && D) {
var i = L.solids.indexOf(D);
if (dOpen && i >= 0)
L.solids.splice(i, 1);
if (!dOpen && i < 0)
L.solids.push(D);
}
if (ALX.door)
ALX.door.visible = !dOpen;
if (ALX.plank)
ALX.plank.visible = !S.f.plankBroke;
if (ALX.debtG)
ALX.debtG.visible = !S.f.debt;
if (ALX.rubble && S.ch < 10)
ALX.rubble.visible = false;
var K = ALX.figs.kleon, A = WND_AT.pharos, sp = ALX.sp.p_kleon;
if (K && sp && sp.S) {
var down = alxActive() && S.ch === 10;
var p = down ? [141, ALX_Y, -175.4, Math.PI / 2] : [76, 0, -60, Math.PI];
K.position.set(p[0], p[1], p[2]);
K.rotation.y = p[3];
sp.x = p[0];
sp.z = p[2];
sp.y = p[1];
sp.S.x = p[0] + A.x;
sp.S.z = p[2] + A.z;
sp.S.y = p[1];
K.visible = !(S.f.end && !down);
}
},
function (st) {
if (!st)
return null;
var L = worldLocal(), A = WND_AT.pharos, lx = L.x - A.x, lz = L.z - A.z, best = null, bd = 1e9;
if (st.hold) {
var H = ALX.sp[st.hold.id];
return H ? { x: H.x, z: H.z, y: H.y } : null;
}
if (st.go && (st.preferGo || !st.at))
return st.go;
alxAtList(st).forEach(function (id) { var P = ALX.sp[id] || (id === "p_eratosthenes" ? { x: ALX_ER[0], z: ALX_ER[1], y: 0 } : id === "p_copyist" ? { x: ALX_TH[0], z: ALX_TH[1], y: 0 } : null); if (!P)
return; var d = Math.hypot(P.x - lx, P.z - lz) + Math.abs(P.y - (L.y - 1.72)) * 4; if (d < bd) {
bd = d;
best = P;
} });
return best || st.go || null;
},
function (P) {
var L = worldLocal(), A = WND_AT.pharos, dx = P.x + A.x - L.x, dz = P.z + A.z - L.z, d = Math.hypot(dx, dz);
if (d < 2.5)
return "right here";
var a = Math.atan2(-dx, -dz) - (typeof yaw !== "undefined" ? yaw : 0);
while (a > Math.PI)
a -= Math.PI * 2;
while (a < -Math.PI)
a += Math.PI * 2;
var feet = L.y - 1.72, up = (P.y || 0) - feet > 2 ? " (on the level above)" : (P.y || 0) - feet < -2 ? " (on the level below)" : "";
return Math.round(d) + " m " + (Math.abs(a) < 0.4 ? "ahead" : Math.abs(a) > 2.6 ? "behind you" : a > 0 ? "to your left" : "to your right") + up;
},
function () {
if (ALX.beam && ALX.beam.parent)
return ALX.beam;
var V = WND.vgroups && WND.vgroups.pharos;
if (!V)
return null;
var g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: 0xFFE8B0, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 6, 14, 1, true), m);
c.position.y = 3;
g.add(c);
var rm = new THREE.MeshBasicMaterial({ color: 0xFFE0A0, transparent: true, opacity: 0.45, depthWrite: false, side: THREE.DoubleSide, fog: false });
var r = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.85, 28), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.04;
g.add(r);
g.userData.keep = 1;
g.raycast = function () { };
V.all.add(g);
ALX.beam = g;
return g;
},
function (dt) {
if (!WND.K || !ALX.sp)
return;
ALX.t += dt;
try {
alxCollapseTick(dt);
}
catch (e) {
if (!ALX.e2) {
ALX.e2 = 1;
if (window.console)
console.warn("[wonders] collapse", e);
}
}
if (ALX.clock)
ALX.clock.position.y = 0.6 + ((ALX.t % 90) / 90) * 1.6;
if (ALX.sphere)
ALX.sphere.rotation.y += dt * 0.08;
var S = alxS(), L = worldLocal(), feet = L.y - 1.72, A = WND_AT.pharos, lx = L.x - A.x, lz = L.z - A.z, reg = wndRegion(L.x, L.z);
ALX.line = "";
if (reg !== "pharos" || wndView("pharos") === "now") {
if (ALX.beam)
ALX.beam.visible = false;
return;
}
if (feet > -2 && S.vit < 100) {
ALX.reg = (ALX.reg || 0) + dt;
if (ALX.reg > 5) {
ALX.reg = 0;
S.vit = Math.min(100, S.vit + 1);
}
}
var under = alxUnderNow();
var ruinL = alxRuinLine();
if (!alxActive()) {
if (ALX.beam)
ALX.beam.visible = false;
ALX.line += ruinL;
return;
}
var st = alxStep();
if (!st) {
if (ALX.beam)
ALX.beam.visible = false;
return;
}
var cardUp = WLD.card && WLD.card.style.display === "block";
if (S.f.aspHold && !cardUp) {
var m0 = ALX.last ? Math.hypot(lx - ALX.last.x, lz - ALX.last.z) + Math.abs((typeof yaw !== "undefined" ? yaw : 0) - ALX.last.yaw) * 0.5 : 0;
if (m0 > 0.04) {
S.f.aspHold = 0;
S.f.aspUp = 0;
S.f.aspDone = 1;
if (ALX.aspHood)
ALX.aspHood.visible = false;
alxSave();
alxCard("Bitten", "<p>You moved. The cobra strikes at the movement, quick as a whip. Andreas comes running with a cord and a knife.</p>", [["Go on", "", function () { alxHurt(35, "Bitten by the cobra"); }]]);
}
else {
ALX.hold += dt;
if (ALX.hold > 6) {
S.f.aspHold = 0;
S.f.aspUp = 0;
S.f.aspDone = 1;
if (ALX.aspHood)
ALX.aspHood.visible = false;
alxSave();
alxCard("Still", "<p>You do not move. You do not breathe. The cobra sways, watching, and slowly, slowly lowers its hood and pours itself back into the stones. Andreas lets out his breath across the garden. 'Well done.'</p>", [["Pick the wild carrot", "", function () { alxBedCard("carrot", true); }]]);
}
}
}
ALX.last = { x: lx, z: lz, yaw: typeof yaw !== "undefined" ? yaw : 0 };
var T = alxTarget(st);
if (!cardUp) {
if (st.go && Math.hypot(lx - st.go.x, lz - st.go.z) < (st.go.r || 3) && Math.abs(feet - (st.go.y || 0)) < 2) {
if (st.done)
st.done();
else
alxDone();
return;
}
if (st.hold) {
var H = ALX.sp[st.hold.id];
if (H && Math.hypot(lx - H.x, lz - H.z) < 2.2 && Math.abs(feet - H.y) < 2) {
ALX.hold += dt;
if (ALX.hold >= st.hold.secs) {
ALX.hold = 0;
st.done();
return;
}
}
else
ALX.hold = 0;
}
if (st.cond && st.cond(S)) {
alxDone();
return;
}
}
if (ruinL && T && (alxInLib(T.x, T.z, T.y) || (T.y || 0) < -3)) {
if (ALX.beam)
ALX.beam.visible = false;
ALX.line = " · 📜 " + alxEsc(st.say) + ruinL + " · ❤ " + S.vit;
return;
}
var B = alxBeam();
if (B && T) {
B.visible = true;
B.position.set(T.x, T.y || 0, T.z);
}
else if (B)
B.visible = false;
var dark = under && !S.f.light;
ALX.line = " · 📜 " + alxEsc(st.say) + (st.n ? " (" + st.n(S) + ")" : "") + (T ? " · " + alxWay(T) : "") + (st.hold && ALX.hold > 0 ? " · " + Math.ceil(st.hold.secs - ALX.hold) + " s" : "") + " · ❤ " + S.vit + (dark ? " · <b>It is pitch dark: you need a light.</b>" : "") + ruinL;
},
function () {
var lite = WND.lite, V = WND.vgroups.pharos, M = babM(), st = wndMat(0xE4DCCA, "stone"), mb = wndMat(0xF0E8D8, "marble"), dk = wndMat(0x8A8070, "stone"), wd = wndMat(0x4A3424, "wood"), soot = wndMat(0x2A2420, null);
alxLibThen();
var lx = 72, lz = -21;
wndCyl(0.02, 3.6, M.bronze, lx, 5.2, lz, null, 5);
var bowl = wndCyl(0.28, 0.12, M.bronze, lx, 3.3, lz, null, 12, 0.12);
wndFlame(lx, 3.38, lz, 0.9, 0xFFB060);
wndLamp(lx, 3.5, lz, 0xFFD8A0, 2.6);
alxSpot("lampchain", lx, lz - 1.0, 0, 1.5, "A bronze lamp hanging on a chain", "trim its wick");
var R = ALX.ruin = wndGroup(0, 0, 0, 0, V.then);
R.name = "libruin";
(WND.selfBake = WND.selfBake || []).push(R);
WNK.F = R;
WNK.v = "then:pharos";
var seed = 77, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
var stub = function (dir, a, b, c) { for (var p = a; p < b; p += 4) {
var h = 0.6 + rnd() * (rnd() < 0.3 ? 6 : 2.8);
if (rnd() < 0.18)
continue;
if (dir === "x")
wndBox(4.05, h, 1.2, st, p + 2, h / 2, c);
else
wndBox(1.2, h, 4.05, st, c, h / 2, p + 2);
} };
stub("x", 30, 104, -80);
stub("x", 30, 104, -14);
stub("z", -80, -14, 104);
stub("z", -80, -14, 30);
for (var i = 0; i < (lite ? 12 : 26); i++) {
var w = 3 + rnd() * 7, h = 1 + rnd() * 2.6, d = 3 + rnd() * 6, b = wndBox(w, h, d, rnd() < 0.5 ? st : dk, 33 + rnd() * 68, h / 2 - 0.3, -77 + rnd() * 60);
b.rotation.set((rnd() - 0.5) * 0.5, rnd() * 3, (rnd() - 0.5) * 0.5);
}
for (var j = 0; j < (lite ? 20 : 70); j++) {
var s = 0.3 + rnd() * 0.9, q = wndBox(s, s * 0.7, s, rnd() < 0.6 ? st : mb, 32 + rnd() * 72, s * 0.3, -79 + rnd() * 64);
q.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
}
for (var c = 0; c < (lite ? 6 : 14); c++) {
var cy = wndCyl(0.42, 1.2 + rnd() * 2.4, mb, 40 + rnd() * 56, 0.42, -70 + rnd() * 48, null, lite ? 8 : 14);
cy.rotation.set(Math.PI / 2, 0, rnd() * 3);
}
for (var k = 0; k < (lite ? 6 : 16); k++) {
var bm = wndBox(0.35, 0.35, 6 + rnd() * 8, wd, 34 + rnd() * 66, 1 + rnd() * 2.5, -76 + rnd() * 58);
bm.rotation.set((rnd() - 0.5) * 0.9, rnd() * 3, (rnd() - 0.5) * 0.7);
}
var pap = wndMat(0xE8D8A8, null);
for (var p2 = 0; p2 < (lite ? 10 : 40); p2++) {
var sc = wndCyl(0.05, 0.3, rnd() < 0.3 ? soot : pap, 32 + rnd() * 70, 0.05 + rnd() * 0.4, -78 + rnd() * 62, null, 6);
sc.rotation.set(Math.PI / 2, 0, rnd() * 3);
}
wndBox(74, 0.12, 66, wndMat(0x7A7064, "stone"), 67, 0.04, -47);
for (var f = 0; f < (lite ? 3 : 6); f++) {
var fx = 40 + rnd() * 56, fz = -72 + rnd() * 50;
wndFlame(fx, 0.6, fz, 1.6, 0xFF8030);
wndLamp(fx, 0.9, fz, 0xFF9040, 4);
}
wndPlaque("alx-ruin", "The Mouseion has fallen", "The roof of the Library has come down. The king's masons are clearing the way; it will stand again within the hour. (Someone found Sostratus's safeguard.)", 2.6, 1.4, 26, 1.6, -60, -Math.PI / 2);
var rs = wndSolid(67, -47, 37.5, 33.5, 0, 6);
ALX.ruinCol = { solids: [rs] };
var L = wndL(), ix = L.solids.indexOf(rs);
if (ix >= 0)
L.solids.splice(ix, 1);
R.visible = false;
var dg = ALX.dust = alxDyn(67, 0, -47, 0), dcv = document.createElement("canvas");
dcv.width = dcv.height = 64;
var dx = dcv.getContext("2d"), grd = dx.createRadialGradient(32, 32, 2, 32, 32, 31);
grd.addColorStop(0, "rgba(255,255,255,1)");
grd.addColorStop(1, "rgba(255,255,255,0)");
dx.fillStyle = grd;
dx.fillRect(0, 0, 64, 64);
var dm = new THREE.MeshBasicMaterial({ color: 0xA89C88, map: new THREE.CanvasTexture(dcv), transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: true });
for (var n = 0; n < (lite ? 4 : 9); n++) {
var pl = new THREE.Mesh(new THREE.PlaneGeometry(40, 18), dm);
pl.position.set((rnd() - 0.5) * 60, 7 + rnd() * 5, (rnd() - 0.5) * 50);
pl.rotation.y = rnd() * 3;
dg.add(pl);
}
ALX.dustM = dm;
dg.visible = false;
wndThen("pharos");
},
function () {
try {
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl || typeof fetch !== "function")
return;
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/wonders_collapse_now", { method: "POST", headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify({ p_place: "alexandria" }) })
.then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { if (j)
alxNetSet(j);
else
ALX.net = "none"; }).catch(function () { ALX.net = "none"; });
}
catch (e) { }
},
function () {
if (alxRuined())
return;
var now = Date.now();
ALX.mine = now;
ALX.down = { fell: now, until: now + ALX_FALL_MS };
var local = function () { try {
localStorage.setItem(ALX_LS, JSON.stringify({ fell: now, until: now + ALX_FALL_MS }));
}
catch (e) { } };
if (typeof signedIn === "function" && signedIn() && typeof cityRpc === "function")
cityRpc("wonders_collapse_trip", { p_place: "alexandria" }).then(function (r) { if (r && r.ok && r.until) {
alxNetSet({ down: true, fell: r.fell, until: r.until, now: r.now });
}
else
local(); }, function () { local(); });
else
local();
},
function (on) {
if (ALX.ruinOn === on)
return;
ALX.ruinOn = on;
var L = ALX.colL, C = ALX.libCol, Rc = ALX.ruinCol;
if (ALX.stand)
ALX.stand.visible = !on;
if (ALX.ruin)
ALX.ruin.visible = on;
if (L && C) {
["solids", "floors", "ramps"].forEach(function (k) { var set = C[k]; if (on)
L[k] = L[k].filter(function (x) { return set.indexOf(x) < 0; });
else
set.forEach(function (x) { if (L[k].indexOf(x) < 0)
L[k].push(x); }); });
if (Rc)
Rc.solids.forEach(function (x) { var i = L.solids.indexOf(x); if (on && i < 0)
L.solids.push(x); if (!on && i >= 0)
L.solids.splice(i, 1); });
}
["kallias", "callimachus", "apollonius"].forEach(function (k) { if (ALX.figs[k])
ALX.figs[k].visible = !on; });
if (ALX.figs.kleon && ALX.figs.kleon.position.y > -1)
ALX.figs.kleon.visible = !on;
(typeof WND_LV !== "undefined" && WND_LV.people || []).forEach(function (P) { if (P.alxCourt)
P.g.visible = !on; });
if (!on) {
if (ALX.dust)
ALX.dust.visible = false;
try {
alxRefresh();
}
catch (e) { }
}
else
alxLid(false);
},
function (mine) {
var L = worldLocal(), A = WND_AT.pharos, lx = L.x - A.x, lz = L.z - A.z, feet = L.y - 1.72, S = alxS();
var inLib = wndRegion(L.x, L.z) === "pharos" && (alxInLib(lx, lz, feet) || alxUnderLib(lx, lz, feet)), under = !inLib && typeof alxUnderNow === "function" && alxUnderNow();
if (!inLib && !under) {
if (wndRegion(L.x, L.z) === "pharos")
alxSay("🏚️ <b>With a roar the Library of Alexandria comes down.</b> Dust rolls over the harbour. It will be an hour before the way is clear.");
return;
}
worldCard(null);
alxVfx("rgba(20,14,8,.95)", 1);
S.vit = inLib ? 25 : Math.max(40, S.vit);
S.f.buried = (S.f.buried || 0) + 1;
alxSave();
alxPut(150, -40, 0, Math.PI / 2);
var h = inLib ? (mine ? "<p>You reach up to trim the lamp's wick. The chain comes down far too easily, an arm's length, two, and from high in the roof there is a sound like a ship's cable parting.</p><p>Then the roof is falling. Beams, tiles, the painted ceiling, the shelves and the scrolls on them, all of it, on top of you.</p>" : "<p>The floor shakes. A groan runs through the roof beams, and then the roof of the Mouseion is falling, beams and tiles and shelves of scrolls, on top of you.</p>") +
"<p>You wake in Andreas's house, bandaged, every bone aching. 'They dug you out of the reading hall,' he says. 'Alive, which is more than the books are. Someone found Sostratus's old safeguard. The masons say it will take them an hour to clear the way.'</p>"
: "<p>The ground shakes and the dark fills with dust: somewhere above, the Library has come down, and the way up is buried. Hours later, it seems, picks break through and the king's diggers haul you out into the light.</p><p>You wake in Andreas's house. The Library lies in ruins; it will be an hour before the way is clear.</p>";
if (mine)
alxSecret("safeguard", false);
setTimeout(function () { alxCard(inLib ? "The Library falls" : "Buried alive", h + (mine ? "<p style='opacity:.8'>🗝️ A secret: " + alxEsc(ALX_SECRETS.safeguard.t) + " · danger ☠☠☠</p>" : "") + "<p style='opacity:.8'>(❤ " + alxS().vit + ". Your place in the story is kept.)</p>"); }, 700);
},
function (dt) {
if (!WND.K || !ALX.stand)
return;
ALX.pollT = (ALX.pollT === undefined ? 40 : ALX.pollT) + dt;
if (ALX.pollT > 45) {
ALX.pollT = 0;
alxNetPoll();
}
var D = alxDownNow(), now = Date.now();
if (ALX.anim) {
var A = ALX.anim;
A.t += dt;
if (A.t < 2.6) {
if (typeof pitch !== "undefined") {
var sw = Math.sin(A.t * 5.5) * 0.012 * Math.min(1, A.t);
pitch += sw - (A.sw || 0);
A.sw = sw;
}
if (ALX.dust) {
ALX.dust.visible = true;
ALX.dustM.opacity = Math.min(0.18, A.t * 0.07);
}
return;
}
if (typeof pitch !== "undefined" && A.sw) {
pitch -= A.sw;
A.sw = 0;
}
ALX.anim = null;
alxRuinShow(true);
alxCaught(A.mine);
return;
}
if (D && now < D.until) {
if (ALX.animFell !== D.fell) {
ALX.animFell = D.fell;
if (now - D.fell < 120000 && ALX.ruinOn !== true) {
ALX.anim = { t: 0, mine: ALX.mine === D.fell || (ALX.mine && Math.abs(ALX.mine - D.fell) < 15000) };
alxTone(48, 2.4);
alxTone(36, 2.6);
return;
}
}
if (ALX.ruinOn !== true)
alxRuinShow(true);
if (ALX.dust) {
var age = (now - D.fell) / 1000, op = age < 600 ? 0.18 * (1 - age / 600) : 0;
ALX.dust.visible = op > 0.01;
ALX.dustM.opacity = op;
}
}
else if (ALX.ruinOn !== false)
alxRuinShow(false);
},
function (key, lx, lz, r) {
var A = WND_AT[key], T = WND.taken;
for (var k = 0; k < 80; k++) {
var a = k * 2.4, d = k * 1.5, x = lx + Math.cos(a) * d, z = lz + Math.sin(a) * d, wx = A.x + x, wz = A.z + z;
if (wndRegion(wx, wz) !== key || wndIsSea(wx, wz) || wndRidgeH(wx, wz) > 0.2)
continue;
if (T && T.near(wx, wz, r) < 1e9)
continue;
var ok = true;
for (var e = 0; e < 8 && ok; e++) {
var ea = e * Math.PI / 4;
if (wndIsSea(wx + Math.cos(ea) * r, wz + Math.sin(ea) * r))
ok = false;
}
if (!ok)
continue;
return [x, z];
}
return null;
},
function () {
WND_SITES.forEach(function (r) {
var key = r[0], S = WND_SWEEP[key], V = WND.vgroups[key];
if (!S || !V)
return;
WNK.site = key;
WNK.ox = WND_AT[key].x;
WNK.oz = WND_AT[key].z;
WNK.v = "";
WNK.F = V.all;
try {
if (S.kind === "foundry")
wndSweepFoundry(key, S);
else if (S.kind === "quay")
wndSweepQuay(key, S);
}
catch (e) {
if (window.console)
console.warn("[wonders] sweep", key, e);
}
});
WNK.F = WND.G;
WNK.v = "";
WNK.ox = 0;
WNK.oz = 0;
WNK.site = "hall";
},
function (g, x, z, col, lay) {
var m = wndMat(col || 0xA8643A, "plaster"), a = new THREE.Group();
a.position.set(x, 0, z);
g.add(a);
var body = wndSph(0.28, m, 0, 0.55, 0, a, 10);
body.scale.set(1, 1.55, 1);
wndCyl(0.07, 0.3, m, 0, 1.05, 0, a, 8, 0.1);
wndCyl(0.05, 0.25, m, 0, 0.12, 0, a, 6, 0.02);
[-1, 1].forEach(function (s) { var h = wndBox(0.04, 0.3, 0.04, m, s * 0.13, 1.0, 0, a); h.rotation.z = s * 0.4; });
if (lay) {
a.rotation.z = Math.PI / 2;
a.position.y = 0.28;
}
return a;
},
function (key, list) {
var dress = WND_DRESS[key === "pharos" ? "egypt" : "greek"], dress2 = WND_DRESS.greek;
list.forEach(function (p, i) {
if (!wndSweepLite(i))
return;
var d = (i % 2 ? dress2 : dress)[i % dress.length], look = Object.assign({ sex: p[3] || "m" }, d);
var g = wndPersonFig("sw_" + key + i, p[0], 0, p[1], p[2], look, p[4] || "");
if (p[5])
WND_LV.people.push({ g: g, site: key, pts: p[5], tx: p[0], tz: p[1], wait: Math.random() * 6, sp: 0.8 + Math.random() * 0.4 });
});
},
function (key, S) {
var P = wndSweepSpot(key, S.at[0], S.at[1], 14);
if (!P)
return;
var x = P[0], z = P[1], A = WND_AT[key];
var g = wndGroup(x, 0, z, 0), earth = wndMat(0x6A5440, "earth"), brick = wndMat(0x9A5A3A, "brick"), clay = wndMat(0xA86A48, "plaster"), bronze = wndMat(0x8A6A38, "metal", { phong: 50, spec: 0x5A4A2A }), wood = wndMat(0x6A4A2E, "wood"), sack = wndMat(0x6A5A44, "thatch");
WND.taken.mark(A.x + x, A.z + z, 14);
(WND.sweepAt = WND.sweepAt || {}).foundry = [A.x + x, A.z + z];
wndFlat(22, 16, earth, 0, 0.03, 0, g);
var pit = wndCyl(2.2, 0.5, brick, -5, 0.25, -2, g, 18);
wndCyl(1.6, 0.06, wndMat(0x2A2018, null), -5, 0.51, -2, g, 16);
wndRound(x - 5, z - 2, 2.4, 0, 1);
var fz = wndSph(1.6, brick, 4, 0.6, -4, g, 14);
fz.scale.y = 1.1;
wndCyl(0.4, 2.2, brick, 4, 2.6, -4, g, 10);
wndBox(0.9, 0.7, 0.1, wndMat(0xC85A1A, null, { e: 0xA83A0A, ei: 0.7 }), 4, 0.55, -2.45, g);
wndRound(x + 4, z - 4, 1.8, 0, 3);
for (var m = 0; m < (WND.lite ? 3 : 6); m++) {
var mc = wndCyl(0.45 + (m % 3) * 0.12, 0.9 + (m % 2) * 0.5, clay, -8 + m * 1.3, 0.5, 4, g, 12, 0.35 + (m % 3) * 0.1);
}
wndSolid(x - 4.75, z + 4, 4, 0.8, 0, 1.5);
for (var b = 0; b < (WND.lite ? 4 : 9); b++) {
var pl = wndBox(1.4, 0.06, 0.9, bronze, 6 + (b % 3) * 0.3, 0.05 + b * 0.07, 4 + (b % 2) * 0.2, g);
pl.rotation.y = b * 0.4;
}
var hand = wndSph(0.7, bronze, 8.5, 0.5, 3.5, g, 10);
hand.scale.set(1.4, 0.6, 0.8);
wndRound(x + 7, z + 4, 2, 0, 1.2);
for (var s = 0; s < (WND.lite ? 3 : 6); s++) {
var sk = wndSph(0.4, sack, -9 + s * 0.9, 0.35, -6.5, g, 8);
sk.scale.y = 0.9;
}
for (var a = 0; a < (WND.lite ? 3 : 6); a++)
wndSweepAmphora(g, -2 + a * 0.7, -6.6, a % 2 ? 0xA8643A : 0x8A5232);
wndSolid(x - 3, z - 6.5, 7, 0.6, 0, 1.4);
var bn = wndGroup(1, 0, 5, 0, g);
wndBox(3, 0.1, 0.9, wood, 0, 0.85, 0, bn);
[[-1.4, -0.35], [1.4, -0.35], [-1.4, 0.35], [1.4, 0.35]].forEach(function (q) { wndBox(0.1, 0.85, 0.1, wood, q[0], 0.42, q[1], bn); });
for (var t = 0; t < 5; t++)
wndBox(0.08, 0.06, 0.5, wndMat(0x3A3A3A, "metal"), -1 + t * 0.5, 0.93, 0, bn);
wndRound(x + 1, z + 5, 1.6, 0, 1);
var Q = wndSweepSpot(key, S.stalls[0], S.stalls[1], 10);
if (Q) {
WND.taken.mark(A.x + Q[0], A.z + Q[1], 10);
WND.sweepAt.stalls = [A.x + Q[0] + 4, A.z + Q[1]];
[[0xA83A2A, 0xE8DCC0], [0x2A5A9A, 0xE8DCC0], [0xC8A040, 0x7A4A2A]].forEach(function (c, i) {
if (!wndSweepLite(i))
return;
var st = wndGroup(Q[0] + i * 4.2, 0, Q[1], 0.3);
wndBox(3, 0.9, 1.2, wood, 0, 0.45, 0, st);
[[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]].forEach(function (q) { wndBox(0.08, 2.4, 0.08, wood, q[0], 1.2, q[1], st); });
var aw = wndBox(3.4, 0.05, 1.8, wndMat(c[0], "plaster"), 0, 2.45, 0, st);
aw.rotation.x = 0.12;
for (var f = 0; f < 6; f++)
wndSph(0.16, wndMat([0xC8822A, 0x6A8A3A, 0x8A3A5A, 0xD8C890][(f + i) % 4], null), -1.1 + f * 0.44, 1.0, 0, st, 8);
wndSolid(Q[0] + i * 4.2, Q[1], 1.6, 0.7, 0, 1, 0.3);
});
}
var pts = [[x - 6, z - 1], [x + 3, z - 2], [x + 1, z + 4], [x - 7, z + 4]];
wndSweepPeople(key, [[x - 3.6, z - 1.5, -1.2, "m", "Bronze-caster"], [x + 3, z - 1.2, 2.8, "m", "Furnace-man"], [x + 1, z + 3.6, 0, "m", "", pts], [x - 7, z + 3, 1.4, "m", "Mould-maker"],
Q ? [Q[0] + 0.4, Q[1] + 1.6, Math.PI, "f", ""] : null, Q ? [Q[0] + 4.6, Q[1] + 1.8, Math.PI + 0.3, "m", ""] : null, Q ? [Q[0] + 2, Q[1] + 5, 0.4, "f", "", [[Q[0] - 3, Q[1] + 5], [Q[0] + 10, Q[1] + 5], [x, z + 8]]] : null].filter(Boolean));
},
function (key, S) {
var P = wndSweepSpot(key, S.at[0], S.at[1], 9);
if (!P)
return;
var x = P[0], z = P[1], A = WND_AT[key];
var wood = wndMat(0x6A4A2E, "wood"), rope = wndMat(0x9A8460, "thatch"), bale = wndMat(0xB8A478, "thatch"), wool = wndMat(0xC8BCA4, "plaster"), stone = wndMat(0x8A8070, "stone");
WND.taken.mark(A.x + x, A.z + z, 10);
(WND.sweepAt = WND.sweepAt || {}).quay = [A.x + x, A.z + z];
var g = wndGroup(x, 0, z, 0);
for (var i = 0; i < (WND.lite ? 5 : 10); i++) {
var row = Math.floor(i / 5);
wndSweepAmphora(g, -4 + (i % 5) * 0.6, -3 + row * 0.0, i % 2 ? 0xA8643A : 0x9A5A34, true).position.y = 0.28 + row * 0.5;
}
wndSolid(x - 2.8, z - 3, 1.8, 0.6, 0, 1.2);
var rk = wndGroup(-3, 0, 0, 0, g);
wndBox(3.2, 0.08, 0.7, wood, 0, 0.5, 0, rk);
for (var j = 0; j < (WND.lite ? 3 : 5); j++)
wndSweepAmphora(rk, -1.2 + j * 0.6, 0, 0x8A5232);
wndSolid(x - 3, z, 1.7, 0.5, 0, 1.4);
for (var b = 0; b < (WND.lite ? 3 : 6); b++)
wndBox(1.1, 0.6, 0.8, b % 2 ? bale : wool, 2 + (b % 3) * 1.15, 0.3 + Math.floor(b / 3) * 0.6, -3, g);
wndSolid(x + 3.15, z - 3, 1.8, 0.5, 0, 1.4);
for (var c = 0; c < 4; c++)
wndBox(0.7, 0.6, 0.7, wndMat(0x8A6A44, "wood"), 3 + (c % 2) * 0.75, 0.3 + Math.floor(c / 2) * 0.6, 0.5, g);
wndSolid(x + 3.4, z + 0.5, 0.8, 0.4, 0, 1.3);
for (var r = 0; r < 2; r++) {
var co = wndCyl(0.5, 0.25, rope, -6 + r * 1.2, 0.12, 3, g, 14);
}
[[-7, 5], [0, 5.5], [7, 5]].forEach(function (p) { wndCyl(0.22, 0.9, stone, p[0], 0.45, p[1], g, 10, 0.26); wndRound(x + p[0], z + p[1], 0.4, 0, 1); });
var cr = wndGroup(6.5, 0, 1, 0, g);
[-1, 1].forEach(function (s) { var l = wndBox(0.18, 7, 0.18, wood, s * 1.1, 3.3, 0, cr); l.rotation.z = s * 0.16; });
wndBox(0.4, 0.4, 0.4, wood, 0, 6.7, 0, cr);
wndCyl(0.02, 3.2, rope, 0, 5.0, 0, cr, 4);
var load = wndSph(0.55, rope, 0, 3.2, 0, cr, 8);
load.scale.y = 1.2;
wndRound(x + 5.4, z + 1, 0.4, 0, 7);
wndRound(x + 7.6, z + 1, 0.4, 0, 7);
var fs = wndGroup(-6, 0, -0.5, 0.2, g);
wndBox(2.4, 0.8, 1, wood, 0, 0.4, 0, fs);
for (var f = 0; f < 7; f++) {
var fi = wndSph(0.12, wndMat(0x8A9AA8, "metal", { phong: 60 }), -0.9 + f * 0.3, 0.86, (f % 2 - 0.5) * 0.3, fs, 8);
fi.scale.set(2.4, 0.6, 0.8);
}
wndBox(0.06, 2.2, 0.06, wood, -1.1, 1.1, -0.5, fs);
wndBox(0.06, 2.2, 0.06, wood, 1.1, 1.1, -0.5, fs);
wndBox(2.6, 0.04, 1.3, wndMat(0xE8D8B0, "plaster"), 0, 2.2, -0.1, fs);
wndSolid(x - 6, z - 0.5, 1.3, 0.6, 0, 1);
var pts = [[x - 8, z + 2], [x + 8, z + 2], [x, z + 3], [x - 2, z - 5]];
wndSweepPeople(key, [[x - 1.6, z - 3.4, 0.2, "m", "Docker"], [x + 6.5, z + 2.4, Math.PI, "m", "Docker"], [x - 6, z + 0.8, Math.PI, "f", "Fishwife"], [x + 1, z + 2, 1.5, "m", "", pts], [x - 4, z + 3, 0.5, "m", "", pts], [x + 3, z - 1.6, -0.6, "m", "Merchant"]]);
}
];
});
