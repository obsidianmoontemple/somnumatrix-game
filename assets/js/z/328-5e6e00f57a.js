/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(328, function () {
"use strict";
return [
function (A) {
if (A.built)
return A;
A.built = true;
var W = WORLDS.underdark;
if (!W || !W.g)
return A;
if (!UDX.root) {
UDX.root = new THREE.Group();
UDX.root.name = "udx";
W.g.add(UDX.root);
}
A.g = new THREE.Group();
A.g.name = "udx-" + A.key;
UDX.root.add(A.g);
try {
A.build(A);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] build", A.key, e);
}
if (A.bake !== false && typeof ppBake === "function")
try {
ppBake(A.g);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] bake", A.key, e);
}
A.talk.forEach(function (T) { if (UD.talkers.indexOf(T) < 0)
UD.talkers.push(T); });
return A;
},
function (key, x, z, yw, msg) {
var A = UDX.by[key], y;
if (key === "cavern") {
y = udHeight(x, z);
if (y < -900)
y = -60;
}
else {
if (!A)
return;
udxBuildArea(A);
y = udxH(A, x, z);
if (y === null)
y = A.y || 0;
}
camera.position.set(UD.base + x, y + 1.72, z);
yaw = yw || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
if (typeof walkResume !== "undefined")
walkResume = null;
udxTone(260, 0.25);
UDX.checkAt = 0;
udxCull(true);
if (msg)
udxSay(msg);
},
function (force) {
var L = worldLocal(), A = udxAreaAt(L.x, L.z, L.y - 1.72);
if (!force && A === UDX.here)
return;
var was = UDX.here;
UDX.here = A;
UDX.envCache = null;
if (A && !A.built)
udxBuildArea(A);
var W = WORLDS.underdark, G = W && W.g;
if (!G)
return;
UDX.areas.forEach(function (B) {
if (!B.g)
return;
var show = B === A || (B.near && B.near(L.x, L.z, A));
B.g.visible = !!show;
});
var inside = !!(A && A.kind === "inside");
if (inside && !UDX.hidden) {
UDX.hidden = [];
G.children.forEach(function (c) { if (c !== UDX.root && c.visible && !c.userData.udxStay) {
c.visible = false;
UDX.hidden.push(c);
} });
}
else if (!inside && UDX.hidden) {
UDX.hidden.forEach(function (c) { c.visible = true; });
UDX.hidden = null;
}
if (A && A.onEnter && A !== was)
try {
A.onEnter(A);
}
catch (e) { }
if (A && A.name && A !== was && !UDX.told[A.key] && A.first) {
UDX.told[A.key] = 1;
udxSay(A.first);
}
},
function (dt) {
UDX.t += dt;
if (UDX.t > UDX.checkAt) {
UDX.checkAt = UDX.t + 0.3;
udxCull(false);
udxLocksTick();
}
var now = UDX.t;
for (var i = 0; i < UDX.anim.length; i++) {
var a = UDX.anim[i];
if (a.glow) {
if (a.glow.parent && a.glow.parent.visible !== false)
a.glow.material.opacity = a.b * (0.82 + 0.18 * Math.sin(now * 0.7 + a.ph));
}
else if (a.fn)
try {
a.fn(dt, now);
}
catch (e) { }
}
if (UDX.here && UDX.here.tick)
try {
UDX.here.tick(dt, UDX.here);
}
catch (e) { }
},
function (P) {
var A = P.A, G = P.g, ox = P.ox, oz = P.oz, y = P.y, T = 0.22;
P.rooms.forEach(function (R) {
var w = R.x1 - R.x0, d = R.z1 - R.z0, cx = ox + (R.x0 + R.x1) / 2, cz = oz + (R.z0 + R.z1) / 2, open = R.open || [];
udxWalk(A, ox + R.x0, ox + R.x1, oz + R.z0, oz + R.z1, y, { m: 0.42, room: R });
if (R.floor)
udxPlane(w, d, R.floor, cx, y + 0.01, cz, G);
if (R.ceil !== false)
udxPlane(w, d, R.ceil || R.wall, cx, y + R.h, cz, G, true);
var sides = { n: { a: R.x0, b: R.x1, c: R.z0, ax: "x", inX: 0, inZ: 1 }, s: { a: R.x0, b: R.x1, c: R.z1, ax: "x", inX: 0, inZ: -1 }, w: { a: R.z0, b: R.z1, c: R.x0, ax: "z", inX: 1, inZ: 0 }, e: { a: R.z0, b: R.z1, c: R.x1, ax: "z", inX: -1, inZ: 0 } };
Object.keys(sides).forEach(function (k) {
if (open.indexOf(k) >= 0)
return;
var S = sides[k], gaps = [];
P.doors.forEach(function (D) {
if (D.ax !== S.ax)
return;
var along = S.ax === "x" ? D.x : D.z, across = S.ax === "x" ? D.z : D.x;
if (Math.abs(across - S.c) < 0.3 && along > S.a - 0.1 && along < S.b + 0.1)
gaps.push([along - D.w / 2, along + D.w / 2, D]);
});
gaps.sort(function (p, q) { return p[0] - q[0]; });
var segs = [], at = S.a;
gaps.forEach(function (gp) { if (gp[0] > at + 0.02)
segs.push([at, gp[0]]); at = Math.max(at, gp[1]); });
if (at < S.b - 0.02)
segs.push([at, S.b]);
var inset = T / 2;
segs.forEach(function (sg) {
var L = sg[1] - sg[0], mid = (sg[0] + sg[1]) / 2;
if (S.ax === "x")
udxBox(L, R.h, T, R.wall, ox + mid, y + R.h / 2, oz + S.c + S.inZ * inset, G);
else
udxBox(T, R.h, L, R.wall, ox + S.c + S.inX * inset, y + R.h / 2, oz + mid, G);
if (R.trim) {
if (S.ax === "x") {
udxBox(L, 0.16, 0.05, R.trim, ox + mid, y + 0.08, oz + S.c + S.inZ * (T + 0.02), G);
udxBox(L, 0.14, 0.08, R.trim, ox + mid, y + R.h - 0.07, oz + S.c + S.inZ * (T + 0.03), G);
}
else {
udxBox(0.05, 0.16, L, R.trim, ox + S.c + S.inX * (T + 0.02), y + 0.08, oz + mid, G);
udxBox(0.08, 0.14, L, R.trim, ox + S.c + S.inX * (T + 0.03), y + R.h - 0.07, oz + mid, G);
}
}
});
gaps.forEach(function (gp) {
var D = gp[2], dh = D.h || 2.7;
if (R.h <= dh + 0.05)
return;
var L = gp[1] - gp[0], mid = (gp[0] + gp[1]) / 2, hh = R.h - dh;
if (S.ax === "x")
udxBox(L, hh, T, R.wall, ox + mid, y + dh + hh / 2, oz + S.c + S.inZ * inset, G);
else
udxBox(T, hh, L, R.wall, ox + S.c + S.inX * inset, y + dh + hh / 2, oz + mid, G);
});
});
if (R.beams) {
for (var bx = R.x0 + 2; bx < R.x1 - 1; bx += 3)
udxBox(0.3, 0.36, d, R.beams, ox + bx, y + R.h - 0.2, cz, G);
}
});
P.doors.forEach(function (D) {
var x = ox + D.x, z = oz + D.z, hw = D.w / 2, dh = D.h || 2.7, fr = D.frame || udxMat(0x3A2E26, "wood");
var r = D.ax === "x" ? udxWalk(A, x - hw + 0.3, x + hw - 0.3, z - 0.9, z + 0.9, y, { m: 0 }) : udxWalk(A, x - 0.9, x + 0.9, z - hw + 0.3, z + hw - 0.3, y, { m: 0 });
if (D.lock) {
r.lock = D.lock;
r.lockName = D.lockName;
}
if (D.noframe)
return;
if (D.ax === "x") {
udxBox(0.16, dh, 0.34, fr, x - hw, y + dh / 2, z, G);
udxBox(0.16, dh, 0.34, fr, x + hw, y + dh / 2, z, G);
udxBox(D.w + 0.32, 0.18, 0.34, fr, x, y + dh, z, G);
}
else {
udxBox(0.34, dh, 0.16, fr, x, y + dh / 2, z - hw, G);
udxBox(0.34, dh, 0.16, fr, x, y + dh / 2, z + hw, G);
udxBox(0.34, 0.18, D.w + 0.32, fr, x, y + dh, z, G);
}
if (D.lock) {
var piv = new THREE.Group();
piv.userData.keep = 1;
G.add(piv);
var leafM = D.leafMat || udxMat(0x4A3A2E, "wood");
if (D.ax === "x") {
piv.position.set(x - hw + 0.05, y, z);
udxBox(D.w - 0.1, dh - 0.06, 0.08, leafM, (D.w - 0.1) / 2, (dh - 0.06) / 2, 0, piv);
}
else {
piv.position.set(x, y, z - hw + 0.05);
udxBox(0.08, dh - 0.06, D.w - 0.1, leafM, 0, (dh - 0.06) / 2, (D.w - 0.1) / 2, piv);
}
var lamp = wMesh(new THREE.BoxGeometry(0.12, 0.18, 0.04), new THREE.MeshBasicMaterial({ color: 0xE06A5A }), 0, 0, 0, null);
lamp.userData.keep = 1;
if (D.ax === "x")
lamp.position.set(x + hw + 0.35, y + 1.4, z + 0.2);
else
lamp.position.set(x + 0.2, y + 1.4, z + hw + 0.35);
G.add(lamp);
var sg = udxSign(G, ["Staff only", D.lockName || D.lock], 1.3, 0.42, D.ax === "x" ? x : x + 0.19, y + dh + 0.45, D.ax === "x" ? z + 0.19 : z, D.ax === "x" ? 0 : Math.PI / 2, "#2A1A1A", "#F0D8C8");
sg.userData.keep = 1;
A.locks.push({ key: D.lock, leaf: piv, lamp: lamp, open: false, shutRy: 0, openRy: D.ax === "x" ? -1.45 : 1.45 });
}
});
},
function (A, x, z, name, floors) {
udxTalk(A, { x: x, z: z, r: 2.6, name: name, verb: "go up or down", fn: function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#E8D8FF'>" + esc(name) + "</div>", fns = {};
floors.forEach(function (f, i) { h += worldBtn("f" + i, esc(f[0]), f[1] ? esc(f[1]) : ""); fns["f" + i] = function () { worldCard(null); udxGo(f[2], f[3], f[4], f[5] || 0, "<b>" + esc(f[0]) + ".</b>"); }; });
worldCard(h, fns);
} });
},
function (A, k, x, y, z, ry, o) {
if (typeof FURN === "undefined" || !FURN[k])
return null;
o = o || {};
if (o.decor && UDX.lite)
return null;
var g;
try {
g = FURN[k]();
}
catch (e) {
return null;
}
if (o.s)
g.scale.setScalar(o.s);
g.position.set(x, y || 0, z);
g.rotation.y = ry || 0;
(o.parent || A.g).add(g);
g.traverse(function (m) { if (m.material && m.material.userData)
m.material.userData.noPhoto = 1; });
if (o.solid !== false) {
var S = udxFurnSize(k), s = o.s || 1, c = Math.cos(ry || 0), sn = Math.sin(ry || 0);
var hw = S.w * s / 2, hd = S.d * s / 2;
if (hw > 0.15 && hd > 0.05 && S.h * s > 0.35) {
var cx = S.cx * s, cz = S.cz * s;
udxSolid(A, x + cx * c + cz * sn, z - cx * sn + cz * c, Math.max(0.12, hw - 0.06), Math.max(0.1, hd - 0.06), ry || 0, o.h !== undefined ? o.h : S.h * s, y || 0);
}
}
return g;
},
function (top, o) {
var hair = [0x8A4A2A, 0x5A3A2A, 0xB87A3A, 0x6A6A6A, 0x3A2A22, 0xC8A060][(o || 0) % 6];
return { top: top, topKind: "shirt", bottom: 0x4A3A2A, hair: hair, hairStyle: o % 3 ? "short" : "long", beard: 1, hat: "none", layer: o % 2 ? "apron" : "vest", layerColor: o % 2 ? 0x6A4A2A : 0x3A3A42, shoes: 0x2A1E14, skin: [0xC8957A, 0xB88268, 0xD8A888, 0x9A6A50][(o || 0) % 4] };
},
function (A, seed, o, x, z, ry, talk, wander) {
if (UDX.lite && !talk && !o.must && (seed.length % 2))
return null;
var y = udxH(A, x, z);
if (y === null)
y = A.y || 0;
var g = wPerson(seed, o);
g.position.set(x, y + (o.y || 0), z);
g.rotation.y = ry || 0;
A.g.add(g);
g.userData.keep = 1;
var P = { g: g, wander: wander || null };
UD.people.push(P);
A.people.push(P);
if (talk) {
var T = { p: P, r: 3.4, name: talk.name, t: talk };
if (talk.fn) {
T.fn = talk.fn;
T.verb = talk.verb;
}
udxTalk(A, T);
}
return P;
},
function (A, o) {
var G = o.g || A.g, mat = o.mat || udxMat(0x5A524A, "stone", { ds: false }), y = o.y || 0, w = o.w, h = o.h, len = o.a1 - o.a0;
var cuts = [o.a0, o.a1];
(o.gaps || []).forEach(function (g) { cuts.push(g.at - g.w / 2, g.at + g.w / 2); });
cuts = cuts.filter(function (v) { return v >= o.a0 - 0.01 && v <= o.a1 + 0.01; }).sort(function (a, b) { return a - b; });
for (var i = 0; i < cuts.length - 1; i++) {
var p0 = cuts[i], p1 = cuts[i + 1], L = p1 - p0;
if (L < 0.05)
continue;
var mid = (p0 + p1) / 2;
var gapL = (o.gaps || []).filter(function (g) { return mid > g.at - g.w / 2 && mid < g.at + g.w / 2; });
var openSide = {};
gapL.forEach(function (g) { openSide[g.side] = 1; });
var seg = Math.max(1, Math.round(L / 2)), geo = o.ax === "z" ? new THREE.BoxGeometry(w, h, L, 4, 4, seg) : new THREE.BoxGeometry(L, h, w, seg, 4, 4);
if (typeof metreUVs === "function")
metreUVs(geo, "box", o.ax === "z" ? [w, h, L] : [L, h, w]);
var cx = o.ax === "z" ? o.c : mid, cz = o.ax === "z" ? mid : o.c, P = geo.attributes.position;
for (var j = 0; j < P.count; j++) {
var lx = P.getX(j), ly = P.getY(j), lz = P.getZ(j), wx = cx + lx, wz = cz + lz;
var across = o.ax === "z" ? lx : lz, n = wNoise(wx * 0.45 + ly * 0.3, wz * 0.45, (o.seed || 7)), n2 = wNoise(wx * 0.2, wz * 0.2 + ly * 0.5, (o.seed || 7) + 3);
if (Math.abs(across) > w / 2 - 0.01) {
var push = (n - 0.35) * 1.1 + (n2 - 0.5) * 0.5;
if (o.ax === "z")
P.setX(j, lx + Math.sign(lx) * push);
else
P.setZ(j, lz + Math.sign(lz) * push);
}
if (ly > h / 2 - 0.01)
P.setY(j, ly + (n - 0.4) * 1.2);
if (ly < -h / 2 + 0.01)
P.setY(j, -h / 2);
}
geo.computeVertexNormals();
var faces = [0, 1, 2, 3, 4, 5], none = new THREE.MeshBasicMaterial({ visible: false }), m = new THREE.MeshLambertMaterial({ color: mat.color.getHex(), map: mat.map || null, side: THREE.BackSide });
m.userData.noPhoto = 1;
var omit = [];
if (o.ax === "z") {
if (openSide[1])
omit.push(0);
if (openSide[-1])
omit.push(1);
if (i === 0 && o.open && o.open[0])
omit.push(5);
if (i === cuts.length - 2 && o.open && o.open[1])
omit.push(4);
if (i > 0)
omit.push(5);
if (i < cuts.length - 2)
omit.push(4);
}
else {
if (openSide[1])
omit.push(4);
if (openSide[-1])
omit.push(5);
if (i === 0 && o.open && o.open[0])
omit.push(1);
if (i === cuts.length - 2 && o.open && o.open[1])
omit.push(0);
if (i > 0)
omit.push(1);
if (i < cuts.length - 2)
omit.push(0);
}
omit.push(3);
var mesh = new THREE.Mesh(geo, faces.map(function (f) { return omit.indexOf(f) >= 0 ? none : m; }));
mesh.position.set(cx, y + h / 2, cz);
G.add(mesh);
}
(o.gaps || []).forEach(function (g) {
var gh = g.h || 4.6;
if (gh >= h - 0.1)
return;
var hh = h - gh, rm = udxMat(mat.color.getHex(), "stone");
if (o.ax === "z")
udxBox(0.9, hh, g.w + 0.2, rm, o.c + g.side * (w / 2 + 0.2), y + gh + hh / 2, g.at, G);
else
udxBox(g.w + 0.2, hh, 0.9, rm, g.at, y + gh + hh / 2, o.c + g.side * (w / 2 + 0.2), G);
});
(o.gaps || []).forEach(function (g) {
var wall = o.c + g.side * w / 2, half = Math.max(0.5, g.w / 2 - 0.6);
var d = o.ax === "z" ? { x0: wall - 1.8, x1: wall + 1.8, z0: g.at - half, z1: g.at + half } : { x0: g.at - half, x1: g.at + half, z0: wall - 1.8, z1: wall + 1.8 };
(A.doorways = A.doorways || []).push(Object.assign(d, { y: y, m: 0, doorway: 1 }));
});
var fl = udxPlane(o.ax === "z" ? w + 1.2 : len, o.ax === "z" ? len : w + 1.2, o.floor || udxMat(0x4A443C, "earth"), o.ax === "z" ? o.c : (o.a0 + o.a1) / 2, y + 0.005, o.ax === "z" ? (o.a0 + o.a1) / 2 : o.c, G);
if (o.walk !== false) {
var r = o.ax === "z" ? udxWalk(A, o.c - w / 2, o.c + w / 2, o.a0, o.a1, y, { m: 0.75 }) : udxWalk(A, o.a0, o.a1, o.c - w / 2, o.c + w / 2, y, { m: 0.75 });
if (o.lock)
r.gate = o.lock;
return r;
}
},
function (A, x0, x1, z0, z1, h, o) {
o = o || {};
var w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
udxGallery(A, { ax: "z", a0: z0, a1: z1, c: cx, w: w, h: h, y: o.y || 0, gaps: o.gaps || [], open: o.open, mat: o.mat, floor: o.floor, seed: o.seed, g: o.g, walk: o.walk });
},
function (A, ax, a0, a1, c, w, h, step, y) {
var t = udxMat(0x6A4A2E, "wood"), G = A.g;
for (var a = a0 + step / 2; a < a1; a += step) {
if (ax === "z") {
udxBox(0.3, h - 0.4, 0.3, t, c - w / 2 + 0.45, y + (h - 0.4) / 2, a, G);
udxBox(0.3, h - 0.4, 0.3, t, c + w / 2 - 0.45, y + (h - 0.4) / 2, a, G);
udxBox(w - 0.4, 0.3, 0.34, t, c, y + h - 0.45, a, G);
}
else {
udxBox(0.3, h - 0.4, 0.3, t, a, y + (h - 0.4) / 2, c - w / 2 + 0.45, G);
udxBox(0.3, h - 0.4, 0.3, t, a, y + (h - 0.4) / 2, c + w / 2 - 0.45, G);
udxBox(0.34, 0.3, w - 0.4, t, a, y + h - 0.45, c, G);
}
}
},
function (A, ax, a0, a1, c, y) {
var iron = udxMat(0x4A4A50, "metal"), sl = udxMat(0x5A4028, "wood"), G = A.g, L = a1 - a0;
[-0.55, 0.55].forEach(function (o) { if (ax === "z")
udxBox(0.09, 0.1, L, iron, c + o, y + 0.12, (a0 + a1) / 2, G);
else
udxBox(L, 0.1, 0.09, iron, (a0 + a1) / 2, y + 0.12, c + o, G); });
for (var a = a0 + 0.4; a < a1; a += 1.4) {
if (ax === "z")
udxBox(1.6, 0.08, 0.26, sl, c, y + 0.04, a, G);
else
udxBox(0.26, 0.08, 1.6, sl, a, y + 0.04, c, G);
}
},
function (A) {
var G = A.g, rock = udxMat(0x5E564C, "stone"), dark = udxMat(0x4A443E, "stone"), plank = udxMat(0x6A5034, "wood"), iron = udxMat(0x3A3A40, "metal");
udxGallery(A, { ax: "z", a0: -108, a1: 12, c: 0, w: 12, h: 7, mat: rock, seed: 11,
gaps: [{ side: 1, at: -8, w: 5, h: 4.2 }, { side: -1, at: -8, w: 5, h: 4.2 }, { side: -1, at: -27.5, w: 5.5, h: 3.8 }, { side: 1, at: -35.8, w: 5 }, { side: -1, at: -69.8, w: 5 }], walk: false });
udxWalk(A, -6, 6, -108, 12, 0, { m: 0.7 });
var face = udxBox(12, 7, 1.2, udxMat(0x6A6052, "stone"), 0, 3.5, -108.6, G);
for (var b = 0; b < 9; b++) {
var hx = -4 + (b % 3) * 4, hy = 1.5 + Math.floor(b / 3) * 1.6;
udxCyl(0.06, 0.06, 0.1, udxMat(0x1A1614), hx, hy, -107.96, G, 6).rotation.x = Math.PI / 2;
}
udxF(A, "oreheap", -3.5, 0, -104.5, 0.3);
udxF(A, "oreheap", 3, 0, -105, 2.2);
var drill = new THREE.Group();
drill.position.set(1.6, 0, -106.2);
G.add(drill);
udxBox(0.12, 2.2, 0.12, iron, 0, 1.1, 0, drill);
udxBox(0.12, 2.2, 0.12, iron, 0.8, 1.1, 0, drill);
udxBox(1.2, 0.12, 0.5, iron, 0.4, 2.1, 0, drill);
var bit = udxCyl(0.06, 0.06, 1.8, iron, 0.4, 1.6, -0.6, drill, 6);
bit.rotation.x = Math.PI / 2;
udxBox(0.5, 0.4, 0.6, udxMat(0x7A3A22, "metal"), 0.4, 1.6, 0.3, drill);
udxSolid(A, 2, -106.2, 0.7, 0.4);
udxSign(G, ["No. 1 Face", "Main Drift · 108 m", "Shot-firer only past this line when the horn blows"], 2.6, 1, -4.4, 2.8, -107.5, 0, "#2A2018", "#E8D8A8");
udxRails(A, "z", -104, 10, 0, 0);
udxChamber(A, 6, 17, -13, -3, 4.2, { mat: dark, seed: 21, gaps: [{ side: -1, at: -8, w: 5 }], walk: false });
udxWalk(A, 6, 17, -13, -3, 0, { m: 0.6 });
udxF(A, "desk", 14.2, 0, -8, -Math.PI / 2);
udxF(A, "chair", 13.2, 0, -8, Math.PI / 2, { solid: false });
udxF(A, "noticeboard", 10, 0.9, -12.6, 0, { solid: false });
udxF(A, "keyrack", 16.5, 1.1, -5, -Math.PI / 2, { solid: false });
udxF(A, "filecabinet", 16.3, 0, -11.8, -Math.PI / 2);
udxF(A, "lantern", 8, 0, -12, 0, { decor: 1 });
udxSign(G, ["Signals to the winding engine", "1 bell: STOP · 2: RAISE · 3: LOWER", "4: men riding · 9: danger"], 2.2, 0.9, 11.5, 2.2, -3.25, Math.PI, "#2A2018", "#E8D8A8");
var bell = udxCyl(0.25, 0.32, 0.36, udxMat(0xB08A3A, "metal"), 9, 2.6, -12.6, G, 12);
udxSign(G, ["Onsetter's cabin", "the cage, the signals, who is down"], 2.2, 0.6, 5.55, 4.95, -8, -Math.PI / 2, "#2A2018", "#E8D8A8");
udxChamber(A, -17, -6, -13, -3, 4.2, { mat: dark, seed: 22, gaps: [{ side: 1, at: -8, w: 5 }], walk: false });
udxWalk(A, -17, -6, -13, -3, 0, { m: 0.6 });
for (var lr = 0; lr < 3; lr++) {
var rx = -15.8, rz = -11.5 + lr * 3.2;
udxBox(0.5, 2.4, 2.6, udxMat(0x5A4028, "wood"), rx, 1.2, rz, G);
udxSolid(A, rx, rz, 0.3, 1.35);
for (var lp = 0; lp < 12; lp++) {
var ly = 0.5 + Math.floor(lp / 4) * 0.7, lz = rz - 1 + (lp % 4) * 0.66;
udxCyl(0.07, 0.09, 0.24, udxMat(lp % 5 === 2 ? 0x6A6A6A : 0xFFC870, null, { basic: 1 }), rx + 0.2, ly, lz, G, 6);
}
}
udxF(A, "workbench", -9.5, 0, -12.2, 0);
udxF(A, "crates", -7.6, 0, -4.2, 0.3, { decor: 1 });
udxF(A, "noticeboard", -12, 0.9, -3.4, Math.PI, { solid: false });
udxSign(G, ["The lamp room", "Take a lamp, leave your tally", "Count them out, count them back"], 2.4, 0.9, -5.55, 5.1, -8, Math.PI / 2, "#2A2018", "#E8D8A8");
udxSign(G, ["⚠ The Old Workings are closed", "Boarded off off the West Drift", "Nobody goes past the boards"], 2.6, 0.9, -16.7, 2.2, -8, Math.PI / 2, "#3A1E14", "#F0D8B0");
udxChamber(A, -18, -6, -31, -24, 3.8, { mat: dark, seed: 23, gaps: [{ side: 1, at: -27.5, w: 5.5 }], walk: false });
udxWalk(A, -18, -6, -31, -24, 0, { m: 0.6 });
udxF(A, "longtable", -12, 0, -27.5, Math.PI / 2);
udxF(A, "benchin", -12, 0, -25.6, 0, { s: 1 });
udxF(A, "benchin", -12, 0, -29.4, Math.PI);
udxF(A, "stove", -17.2, 0, -25, Math.PI / 2);
udxF(A, "eslockers", -17.4, 0, -29, Math.PI / 2);
udxF(A, "barrel", -7, 0, -30.3, 0, { decor: 1 });
udxSign(G, ["The crib room", "Snap time: one bell", "Wash your hands"], 2, 0.7, -5.55, 4.6, -27.5, Math.PI / 2, "#2A2018", "#E8D8A8");
udxGallery(A, { ax: "x", a0: 6, a1: 70, c: -35.8, w: 5, h: 4.6, mat: rock, seed: 31, open: [true, true] });
udxTimbers(A, "x", 6, 70, -35.8, 5, 4.6, 6, 0);
udxRails(A, "x", 6, 70, -35.8, 0);
for (var el = 12; el < 70; el += 14)
udxMineLamp(A, el, 3.4, -35.8);
udxChamber(A, 70, 104, -62, -12, 12, { mat: udxMat(0x5A5046, "stone"), seed: 32, gaps: [{ side: -1, at: -35.8, w: 5, h: 4.6 }], walk: false });
udxWalk(A, 70, 104, -62, -12, 0, { m: 0.8 });
for (var cr = 0; cr < 6; cr++) {
var cx = 76 + (cr % 3) * 10, cz = -52 + Math.floor(cr / 3) * 30, ch = 4 + (cr % 2) * 3;
for (var k = 0; k < ch / 0.3; k++) {
var rot = k % 2 ? 0 : Math.PI / 2, yy = 0.14 + k * 0.3;
if (rot) {
udxBox(2.3, 0.3, 0.32, udxMat(0x6A4A2E, "wood"), cx - 0.95, yy, cz, G, rot);
udxBox(2.3, 0.3, 0.32, udxMat(0x6A4A2E, "wood"), cx + 0.95, yy, cz, G, rot);
}
else {
udxBox(2.3, 0.3, 0.32, udxMat(0x6A4A2E, "wood"), cx, yy, cz - 0.95, G);
udxBox(2.3, 0.3, 0.32, udxMat(0x6A4A2E, "wood"), cx, yy, cz + 0.95, G);
}
}
udxSolid(A, cx, cz, 1.2, 1.2, 0);
}
udxF(A, "oreheap", 96, 0, -30, 0);
udxF(A, "oreheap", 80, 0, -20, 1.2);
udxF(A, "minecart", 73, 0, -38, Math.PI / 2);
udxF(A, "mineprop", 88, 0, -40, 0, { decor: 1 });
var chute = udxBox(2, 5, 2, udxMat(0x5A4028, "wood"), 101, 2.5, -56, G);
udxSolid(A, 101, -56, 1.1, 1.1);
udxSign(G, ["No. 2 East Stope", "Ore pass to the level below", "Mind the cribs: never pull a crib timber"], 2.6, 1, 71, 3, -24, -Math.PI / 2, "#2A2018", "#E8D8A8");
for (var sl = 0; sl < 4; sl++)
udxMineLamp(A, 74 + sl * 9, 6.5, -60.5 + ((sl % 2) * 45));
udxGallery(A, { ax: "x", a0: -100, a1: -6, c: -69.8, w: 5, h: 4.6, mat: rock, seed: 41, open: [true, true], gaps: [{ side: -1, at: -50, w: 3.2, h: 2.8 }] });
udxTimbers(A, "x", -100, -6, -69.8, 5, 4.6, 6, 0);
udxRails(A, "x", -100, -6, -69.8, 0);
for (var wl = -92; wl < -8; wl += 14)
udxMineLamp(A, wl, 3.4, -69.8);
udxChamber(A, -124, -100, -82, -58, 7, { mat: dark, seed: 42, gaps: [{ side: 1, at: -69.8, w: 5, h: 4.6 }], walk: false });
udxWalk(A, -124, -100, -82, -58, 0, { m: 0.7 });
udxF(A, "boiler", -119, 0, -62, 0);
udxF(A, "flywheel", -112, 0, -62.5, 0);
udxF(A, "piston", -106, 0, -62.5, 0);
udxF(A, "pipes", -108, 0, -78.5, Math.PI);
var sump = udxPlane(10, 8, new THREE.MeshPhongMaterial({ color: 0x0A141C, shininess: 90, specular: 0x3A4A5A }), -115, 0.05, -74, G);
udxSolid(A, -115, -74, 5.2, 4.2);
for (var rl = 0; rl < 10; rl++)
udxBox(0.08, 1, 0.08, iron, -120 + rl * 1.1, 0.5, -69.9, G);
udxSign(G, ["Pump station", "Keep the sump down or the level drowns", "Engine oiled every shift"], 2.6, 1, -100.3, 3, -66, -Math.PI / 2, "#2A2018", "#E8D8A8");
udxMineLamp(A, -112, 5, -70);
udxMineLamp(A, -104, 5, -60);
udxGallery(A, { ax: "z", a0: -118.6, a1: -72.3, c: -50, w: 3, h: 2.8, mat: udxMat(0x4E4842, "stone"), seed: 51, open: [false, true], gaps: [{ side: 1, at: -117, w: 3, h: 2.5 }], walk: false });
udxWalk(A, -51.5, -48.5, -118.6, -72.3, 0, { m: 0.55, old: 1 });
for (var op = -76; op > -116; op -= 5.5) {
var lean = (op * 13) % 3 * 0.04;
var p1 = udxBox(0.22, 2.3, 0.22, udxMat(0x4A3A28, "wood"), -51.1, 1.15, op, G);
p1.rotation.z = lean;
udxBox(0.22, 2.3, 0.22, udxMat(0x4A3A28, "wood"), -48.9, 1.15, op, G);
if (op % 11)
udxBox(2.6, 0.2, 0.24, udxMat(0x4A3A28, "wood"), -50, 2.3, op, G);
}
udxRails(A, "z", -117, -74, -50, 0);
[[-50.6, -84, 0.4], [-49.2, -95, 0.3], [-50.8, -109, 0.5]].forEach(function (q) { wMesh(new THREE.DodecahedronGeometry(q[2], 0), udxMat(0x5A524A, "stone"), q[0], q[2] * 0.7, q[1], G); });
udxF(A, "crates", -49.5, 0, -104.5, Math.PI / 2, { s: 0.7 });
var book = udxBox(0.3, 0.06, 0.22, udxMat(0x6A3A22), -49.6, 0.95, -104.5, G);
var bd = new THREE.Group();
bd.position.set(-50, 0, -72.4);
G.add(bd);
bd.userData.keep = 1;
for (var pb = 0; pb < 5; pb++) {
var pl = udxBox(3.2, 0.28, 0.06, plank, 0, 0.5 + pb * 0.48, 0, bd);
pl.rotation.z = (pb % 2 ? 0.05 : -0.04);
}
var loose = new THREE.Group();
loose.position.set(-0.9, 0, 0.06);
bd.add(loose);
udxBox(0.3, 2.4, 0.05, plank, 0, 1.2, 0, loose);
udxSign(bd, ["DANGER", "OLD WORKINGS", "Unsafe roof · Bad air · KEEP OUT"], 2.4, 1, 0, 1.6, 0.08, 0, "#5A1A12", "#F4E0C8");
UDX_MINE.boards = loose;
if (udxFlag("boards"))
loose.rotation.y = -1.3;
udxGallery(A, { ax: "x", a0: -48.5, a1: -6, c: -117, w: 3, h: 2.5, mat: udxMat(0x4A443E, "stone"), seed: 52, open: [true, true], walk: false });
udxWalk(A, -51.5, -4.5, -118.5, -115.5, 0, { m: 0.5, old: 2 });
var fall = new THREE.Group();
fall.position.set(-28, 0, -117);
G.add(fall);
fall.userData.keep = 1;
var fr = wRand(77);
for (var fb = 0; fb < 9; fb++) {
var s = 0.4 + fr() * 0.6;
wMesh(new THREE.DodecahedronGeometry(s, 0), udxMat(0x5E564C, "stone"), (fr() - 0.5) * 1.4, s * 0.6 + Math.floor(fb / 3) * 0.6, (fr() - 0.5) * 2.2, fall);
}
var aside = new THREE.Group();
aside.position.set(-28, 0, -117);
G.add(aside);
aside.userData.keep = 1;
for (var fa = 0; fa < 6; fa++) {
var s2 = 0.35 + fr() * 0.4;
wMesh(new THREE.DodecahedronGeometry(s2, 0), udxMat(0x5E564C, "stone"), -1.2 + fa * 0.5, s2 * 0.5, (fa % 2 ? 1.1 : -1.1), aside);
}
UDX_MINE.fallG = fall;
UDX_MINE.fallAside = aside;
fall.visible = !udxFlag("fall");
aside.visible = udxFlag("fall");
var cut = udxMat(0x3A3440, "stone");
udxBox(12.4, 7, 0.6, cut, 0, 3.5, -109.6, G);
udxBox(0.6, 7, 13, cut, 6.3, 3.5, -116, G);
udxBox(0.6, 4.5, 3, cut, -6.3, 4.75, -117, G);
udxBox(0.6, 7, 5.9, cut, -6.3, 3.5, -112.55, G);
udxBox(0.6, 7, 4.1, cut, -6.3, 3.5, -120.55, G);
[-6.3, 6.3].forEach(function (x) { udxBox(0.6, 7, 3.6, cut, x, 3.5, -123.8, G); });
udxPlane(12.6, 3.6, cut, 0, 7, -123.8, G, true);
udxPlane(12, 12, cut, 0, 7, -116, G, true);
udxPlane(12, 13, udxMat(0x3A3440, "slate"), 0, 0.02, -116.5, G);
[-4.6, 4.6].forEach(function (x) { udxCyl(0.55, 0.65, 6.6, udxMat(0x2E2A36, "stone"), x, 3.3, -111, G, 10); udxSolidR(A, x, -111, 0.7); });
udxWalk(A, -6, 6, -122.6, -110.2, 0, { m: 0.6, chamber: 1 });
udxWalk(A, -5.6, 5.6, -124.99, -121.8, 0, { m: 0, doorway: 1 });
A.blockFn = function (x, z) {
if (!UD.open && z < -121.4 && Math.abs(x) < 6.5)
return true;
var r = udxRectAt(A, x, z, true);
if (r && r.old === 1 && z < -73.2 && !udxFlag("boards")) {
udxMineSay("boards");
return true;
}
if (r && r.old === 2 && x > -29.5 && x < -26.5 && !udxFlag("fall")) {
udxMineSay("fall");
return true;
}
return false;
};
var M = function (top, o) { return { top: top, topKind: "shirt", bottom: 0x3A342E, hat: "hardhat", layer: o % 2 ? "vest" : "apron", layerColor: 0x6A5A3A, shoes: 0x2A2018 }; };
udxWho(A, "udm_fore", { sex: "m", title: "mine foreman", look: M(0x5A4A3A, 0) }, 2, -14, Math.PI, udxPersona("Hesketh Marrow, the mine foreman", "the foreman of the Deep Workings: gruff, careful, proud of his crew and strict about safety. He knows the West Drift, the East Stope and the pump station like his own kitchen. If asked about the Old Workings he grows serious: they were boarded off before his time because the roof is bad and the air is cold where it should be warm; old Tamsin Rook, a miner long ago, used to say there was something carved down there, and kept a daybook. He will not tell anyone to go past the boards, and does not want to hear about it if they do.", "Mind your head and keep to the drift. Who sent you down? Never mind: you're here now. Lamp from the lamp room, tally on the board, and you'll be fine."));
udxWho(A, "udm_onset", { sex: "f", title: "onsetter", look: M(0x3A4A5A, 1) }, 11, -8.5, -Math.PI / 2, udxPersona("Ada Pennock, the onsetter", "the onsetter at the pit bottom: she signals the winding engine with the bell, loads the cage and keeps the book of who is underground. Brisk, funny, never misses a count; she explains real mine signals and how a cage and winding engine work.", "Name for the book? Everyone down gets written in and written out. That's how we know nobody's left behind."));
udxWho(A, "udm_lamp", { sex: "m", title: "lamp keeper", look: M(0x4A3A2A, 2) }, -10.5, -7, Math.PI / 2, udxPersona("Old Joss Tallow, the lamp keeper", "the lamp keeper: very old, gentle, a little deaf; he trims and fills every lamp and knows every story about the mine. He explains how real miners' safety lamps work (the gauze that stops a flame lighting firedamp gas, invented in 1815). He remembers Tamsin Rook, who 'went where the cold air came from' and came back smiling.", "Here's your lamp. Wick's trimmed, oil's full. Bring it back lit, mind. If it ever burns blue and tall, you get out."));
udxWho(A, "udm_shot", { sex: "m", title: "shot-firer", look: M(0x6A3A2A, 3) }, -1.5, -102, 0, udxPersona("Rafe Kettering, the shot-firer", "the shot-firer at No. 1 Face, who drills the holes and fires the charges; calm, exact and very serious about the warning horn. He explains how rock is drilled and blasted in a real mine, safely.", "Stand back of the line when the horn goes. Three blasts before, one after. Otherwise: welcome to the face."));
udxWho(A, "udm_pump", { sex: "m", title: "pump man", look: M(0x3A3A3A, 4) }, -108, -66, -Math.PI / 2, udxPersona("Ned Slack, the pump man", "the pump man who keeps the West Drift's sump pumped out; cheerful, oily, and in love with his engine. He explains how real mine pumps keep water out of deep mines.", "Hear her? Thump, hiss, thump. Every minute she lifts a bathtub of water out of this level. Lovely engine."));
udxWho(A, "udm_st1", { sex: "m", look: M(0x5A4A3A, 5), must: 1 }, 84, -30, 0.4, null, { r: 8, sp: 0.8 });
udxWho(A, "udm_st2", { sex: "f", look: M(0x4A5A4A, 6) }, 92, -46, 2.2, null, { r: 6, sp: 0.7 });
udxWho(A, "udm_tr1", { sex: "m", look: M(0x5A3A3A, 7), must: 1 }, 0, -55, 0, null, { r: 14, sp: 1.1 });
udxTalk(A, { x: -50, z: -73.8, r: 2.6, name: "The boarded-up Old Workings", verb: "look closer", fn: udxBoardsCard });
udxTalk(A, { x: -50, z: -103, r: 2.4, name: "An old daybook on a crate", verb: "read it", fn: udxDaybook });
udxTalk(A, { x: -30.5, z: -117, r: 2.6, name: "A rockfall", verb: "look closer", fn: udxFallCard });
if (UD.open) {
udxFlag("boards", 1);
udxFlag("fall", 1);
loose.rotation.y = -1.3;
fall.visible = false;
aside.visible = true;
}
},
function (k) {
var n = Date.now();
if (UDX_MSAID[k] && n - UDX_MSAID[k] < 5000)
return;
UDX_MSAID[k] = n;
if (k === "boards")
udxSay("<b>The boards are nailed fast.</b> One of them, near the left, looks loose. (Look closer: press E.)");
if (k === "fall")
udxSay("<b>A rockfall.</b> Loose stones, piled to the roof. A cold breath of air comes through the cracks between them.");
},
function () {
var done = udxFlag("boards");
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F0D8B0'>The Old Workings</div>" +
"<p style='margin:6px 0;opacity:.9'>Five planks nailed across an old adit, and a sign: DANGER, OLD WORKINGS, KEEP OUT. Beyond them, in the dark, the rusted rails of a narrower, older track go off into the rock.</p>" +
"<p style='margin:6px 0;opacity:.9'>The air coming between the planks is cold. Down here, everywhere else, the rock is warm.</p>" +
(done ? "<p style='opacity:.8'>The loose plank is swung aside; there is room to squeeze past.</p>" + worldBtn("leave", "Leave it", "") :
worldBtn("squeeze", "Squeeze past the loose plank", "It swings aside on one nail") + worldBtn("leave", "Leave it be", "")), { squeeze: function () { worldCard(null); udxFlag("boards", 1); if (UDX_MINE.boards)
UDX_MINE.boards.rotation.y = -1.3; udxTone(140, 0.4); udxSay("<b>The plank swings aside</b> on its one nail. You squeeze through into the Old Workings. Watch your head."); },
leave: function () { worldCard(null); } });
},
function () {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F0D8B0'>Tamsin Rook's daybook</div>" +
"<div style='opacity:.75;font-size:12px'>Damp at the edges, the ink gone brown. A miner's notes, long ago.</div>" +
"<p style='margin:8px 0;font-style:italic'>Third week. Followed the cold air south past the old rails. It comes from the fall at the end of the squeeze. Shifted a few stones: there is a room behind, and the walls are not ours. They are cut smooth, older than any mine.</p>" +
"<p style='margin:8px 0;font-style:italic'>Fourth week. The far wall is carved: a ring of sixteen marks, a tall spire in the middle, a spider with its legs spread. Every mark is cold but one. The one that is warm is shaped like the spider's eye.</p>" +
"<p style='margin:8px 0;font-style:italic'>I pressed it. I will not write here what is on the other side. I will only say: be courteous, and come back.</p>" +
worldBtn("close2", "Put it back", ""), { close2: function () { worldCard(null); } });
udxFlag("daybook", 1);
},
function () {
if (udxFlag("fall")) {
udxSay("The fallen stones are pushed aside. The squeeze goes on east.");
return;
}
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F0D8B0'>A rockfall</div>" +
"<p style='margin:6px 0;opacity:.9'>Loose stones fill the squeeze to the roof. They are not heavy, and they are not wedged: somebody has moved them before. Cold air breathes through the gaps, and very faintly, beyond them, something glints violet.</p>" +
worldBtn("clear", "Clear the loose stones", "A little at a time") + worldBtn("leave", "Leave it", ""), { clear: function () {
worldCard(null);
udxSay("<b>You lift the stones away</b>, one by one…");
udxTone(110, 0.3);
setTimeout(function () { udxTone(95, 0.3); }, 900);
setTimeout(function () {
udxFlag("fall", 1);
if (UDX_MINE.fallG)
UDX_MINE.fallG.visible = false;
if (UDX_MINE.fallAside)
UDX_MINE.fallAside.visible = true;
udxSay("<b>The way is clear.</b> The squeeze goes on east, and the cold air with it.");
}, 2200);
},
leave: function () { worldCard(null); } });
},
function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#E8D8FF'>The carved wall</div>" +
"<p style='margin:6px 0;opacity:.9'>The chamber's far wall is smooth rock, carved: a ring of sixteen marks, a tall spire, a spider with its legs spread. Older than the mine; older, maybe, than the city above. You lay your hand on the marks, one after another.</p>", fns = {};
UDX_RUNES.forEach(function (r, i) {
h += worldBtn("r" + i, "Press " + esc(r[0]), esc(r[1]));
fns["r" + i] = function () {
if (!r[2]) {
udxTone(80, 0.2);
udxSay("<b>Cold stone.</b> Nothing happens.");
return;
}
worldCard(null);
UD.opening = 3.5;
if (typeof playTone === "function") {
playTone(70, 2.5);
setTimeout(function () { playTone(55, 1.5); }, 900);
}
udxSay("<b>Warm under your hand.</b> A grinding, deep in the rock. The whole wall is sinking into the floor…");
};
});
h += worldBtn("leave", "Leave it be", "");
fns.leave = function () { worldCard(null); };
worldCard(h, fns);
},
function (A, R, y, door, th) {
var w = R.x1 - R.x0, d = R.z1 - R.z0, inV, far, W, D;
if (door === "s") {
inV = [0, 1];
far = [(R.x0 + R.x1) / 2, R.z0];
W = w;
D = d;
}
else if (door === "n") {
inV = [0, -1];
far = [(R.x0 + R.x1) / 2, R.z1];
W = w;
D = d;
}
else if (door === "e") {
inV = [1, 0];
far = [R.x0, (R.z0 + R.z1) / 2];
W = d;
D = w;
}
else {
inV = [-1, 0];
far = [R.x1, (R.z0 + R.z1) / 2];
W = d;
D = w;
}
var rt = [inV[1], -inV[0]];
function ryOf(vx, vz) { return Math.atan2(vx, vz); }
var K = { A: A, R: R, y: y, W: W, D: D, h: R.h, th: th || {},
pt: function (a, b) { return [far[0] + rt[0] * a + inV[0] * b, far[1] + rt[1] * a + inV[1] * b]; },
ryIn: ryOf(inV[0], inV[1]), ryOut: ryOf(-inV[0], -inV[1]), ryR: ryOf(rt[0], rt[1]), ryL: ryOf(-rt[0], -rt[1]) };
K.at = function (k, a, b, ry, o) { var p = K.pt(a, b); return udxF(A, k, p[0], (o && o.y !== undefined) ? y + o.y : y, p[1], ry === undefined ? K.ryIn : ry, o); };
K.dep = function (k, o) { if (typeof FURN === "undefined" || !FURN[k])
return 0.5; var S = udxFurnSize(k); return S.d * ((o && o.s) || 1); };
K.wid = function (k, o) { if (typeof FURN === "undefined" || !FURN[k])
return 1; var S = udxFurnSize(k); return S.w * ((o && o.s) || 1); };
K.wall = function (k, a, o) { return K.at(k, a, K.dep(k, o) / 2 + 0.3, K.ryIn, o); };
K.left = function (k, b, o) { return K.at(k, -W / 2 + K.dep(k, o) / 2 + 0.3, b, K.ryR, o); };
K.right = function (k, b, o) { return K.at(k, W / 2 - K.dep(k, o) / 2 - 0.3, b, K.ryL, o); };
K.near = function (k, side, o) { var a = side * (W / 2 - K.wid(k, o) / 2 - 0.4); if (Math.abs(a) < 1.6)
return null; return K.at(k, a, D - K.dep(k, o) / 2 - 0.3, K.ryOut, o); };
K.hang = function (k, a, hy, o) { return K.at(k, a, K.dep(k, o) / 2 + 0.24, K.ryIn, Object.assign({ y: hy, solid: false }, o || {})); };
K.hangL = function (k, b, hy, o) { return K.at(k, -W / 2 + K.dep(k, o) / 2 + 0.24, b, K.ryR, Object.assign({ y: hy, solid: false }, o || {})); };
K.hangR = function (k, b, hy, o) { return K.at(k, W / 2 - K.dep(k, o) / 2 - 0.24, b, K.ryL, Object.assign({ y: hy, solid: false }, o || {})); };
K.ceil = function (k, a, b, o) { var S = (typeof FURN !== "undefined" && FURN[k]) ? udxFurnSize(k) : { h: 1 }; return K.at(k, a, b, K.ryIn, Object.assign({ y: R.h - S.h * ((o && o.s) || 1) - 0.05, solid: false }, o || {})); };
K.rug = function (k, a, b, o) { return K.at(k || "rug", a, b, K.ryIn, Object.assign({ solid: false }, o || {})); };
K.runL = function (k, n, o) { var step = (D - 1.6) / n; for (var i = 0; i < n; i++)
K.left(k, 0.8 + step * (i + 0.5), o); };
K.runR = function (k, n, o) { var step = (D - 1.6) / n; for (var i = 0; i < n; i++)
K.right(k, 0.8 + step * (i + 0.5), o); };
K.runW = function (k, n, o) { var gw = K.wid(k, o) + 0.25, span = Math.min(W - 1.2, n * gw), s0 = -span / 2 + gw / 2; for (var i = 0; i < n; i++)
K.wall(k, s0 + i * gw, o); };
K.glow = function (a, b, hy, col, sz) { var p = K.pt(a, b); return udxGlow(A.g, col || (th && th.glow) || 0xFFC890, sz || 2.4, 0.55, p[0], y + hy, p[1]); };
return K;
},
function (K) {
K.wall("fourposter", 0);
K.at("footchest", 0, 3.4);
K.at("sg_qf_nightstand1_ebony", -1.8, 0.6);
K.at("sg_qf_nightstand1_ebony", 1.8, 0.6);
K.left("fireplace", K.D * 0.55);
K.at("sofa", -K.W / 2 + 3.2, K.D * 0.55, K.ryR);
K.at("armchair", -K.W / 2 + 4.8, K.D * 0.35, K.ryR);
K.right("wardrobe", K.D * 0.3);
K.right("wardrobe", K.D * 0.6);
K.rug("rug", 0, K.D * 0.6);
K.ceil("chandelier", 0, K.D * 0.5);
K.hang("painting", -2.6, 2.4);
K.hang("painting", 2.6, 2.4);
K.near("wallmirror", 1, { y: 0.8, solid: false });
K.glow(0, 2, 3.2);
},
function (K) {
K.wall("desk", 0);
K.at("armchair", 0, 1.6, K.ryOut);
K.left("esbookcase", K.D * 0.3);
K.left("esbookcase", K.D * 0.62);
K.right("esbookcase", K.D * 0.3);
K.right("filecabinet", K.D * 0.62);
K.at("lamp", 1.3, 0.5);
K.rug("rug", 0, K.D * 0.55);
K.at("armchair", -0.8, K.D * 0.7, K.ryIn + 0.4);
K.hang("painting", 0, 2.5);
K.glow(0, 1, 2.4);
},
function (K) {
K.runW("esbookcase", udxFit(K, "esbookcase", 0.1));
K.runL("esbookcase", Math.max(1, Math.floor((K.D - 2) / 1.9)));
K.runR("esbookcase", Math.max(1, Math.floor((K.D - 2) / 1.9)));
K.at("longtable", 0, K.D * 0.55, K.ryIn + Math.PI / 2);
for (var i = 0; i < 3; i++) {
K.at("chair", -0.9, K.D * 0.55 - 1.2 + i * 1.2, K.ryR);
K.at("chair", 0.9, K.D * 0.55 - 1.2 + i * 1.2, K.ryL);
}
K.at("lectern", 0, K.D * 0.55 + 3);
K.ceil("chandelier", 0, K.D * 0.5);
K.glow(0, K.D * 0.5, 3);
},
function (K) {
var big = K.W > 9;
K.at(big ? "feasttable" : "longtable", 0, K.D * 0.5, K.ryIn + (big ? 0 : Math.PI / 2));
var n = big ? 6 : 3;
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n - 0.5;
if (big) {
K.at("chair", t * 5.6, K.D * 0.5 - 1.75, K.ryIn);
K.at("chair", t * 5.6, K.D * 0.5 + 1.75, K.ryOut);
}
else {
K.at("chair", -1.45, K.D * 0.5 + t * 3.6, K.ryR);
K.at("chair", 1.45, K.D * 0.5 + t * 3.6, K.ryL);
}
}
K.wall("throneseat", 0, { s: 0.75 });
K.left("counter", K.D * 0.5);
K.right("fireplace", K.D * 0.5);
K.ceil(big ? "ironchandelier" : "chandelier", 0, K.D * 0.5);
K.hang("painting", -2.6, 2.5);
K.hang("painting", 2.6, 2.5);
K.glow(0, K.D * 0.5, 3);
},
function (K) {
K.wall("oven", -K.W / 2 + 1.8);
K.wall("stove", 1);
K.wall("stove", 2);
K.left("counter", K.D * 0.35);
K.left("counter", K.D * 0.7);
K.right("herbrack", K.D * 0.35);
K.right("shelfgoods", K.D * 0.7);
K.at("trbenchtable", 0, K.D * 0.6);
K.at("barrel", K.W / 2 - 0.8, K.D - 1);
K.at("cask", -K.W / 2 + 1.2, K.D - 1.2, K.ryR);
K.glow(0, 1.4, 2.2, 0xFFB060);
},
function (K) {
K.wall("grandthrone", 0, { s: K.W > 12 ? 1 : 0.7 });
K.rug("redrunner", 0, K.D * 0.55, { s: Math.min(1, (K.D - 1) / 20) });
var n = Math.max(2, Math.floor(K.D / 7));
for (var i = 0; i < n; i++) {
var b = 4 + i * (K.D - 6) / Math.max(1, n - 1);
K.at("greatpillar", -K.W / 2 + 2.2, b, K.ryIn, { s: Math.min(1, (K.h - 0.2) / 7) });
K.at("greatpillar", K.W / 2 - 2.2, b, K.ryIn, { s: Math.min(1, (K.h - 0.2) / 7) });
}
K.hang("hallbanner", -K.W / 2 + 4, 0.3, { s: Math.min(1, (K.h - 0.6) / 4.2) });
K.hang("hallbanner", K.W / 2 - 4, 0.3, { s: Math.min(1, (K.h - 0.6) / 4.2) });
K.at("brazier", -3.6, 2.6);
K.at("brazier", 3.6, 2.6);
K.ceil("ironchandelier", 0, K.D * 0.4);
K.glow(0, 1.5, 4.5, null, 5);
K.glow(-3.6, 2.6, 2.6, 0xFFA050, 2.6);
K.glow(3.6, 2.6, 2.6, 0xFFA050, 2.6);
},
function (K) {
K.wall("throneseat", 0);
K.at("brazier", -2.2, 1.2);
K.at("brazier", 2.2, 1.2);
K.rug("runner", 0, K.D * 0.55, { s: Math.min(1, (K.D - 1) / 13) });
K.runL("benchin", Math.max(1, Math.floor((K.D - 3) / 2.6)));
K.runR("benchin", Math.max(1, Math.floor((K.D - 3) / 2.6)));
K.hang("hallbanner", -K.W / 2 + 1.6, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.hang("hallbanner", K.W / 2 - 1.6, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.glow(0, 1, 3.2, null, 4);
},
function (K) {
K.at("longtable", 0, K.D * 0.5, K.ryIn + Math.PI / 2);
for (var i = 0; i < 4; i++) {
var b = K.D * 0.5 - 1.6 + i * 1.07;
K.at("throneseat", -1.7, b, K.ryR, { s: 0.55 });
K.at("throneseat", 1.7, b, K.ryL, { s: 0.55 });
}
K.wall("throneseat", 0, { s: 0.85 });
K.left("maptable", K.D * 0.5);
K.right("esbookcase", K.D * 0.5);
K.hang("hallbanner", -2.4, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.hang("hallbanner", 2.4, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.ceil("ironchandelier", 0, K.D * 0.5);
K.glow(0, K.D * 0.5, K.h - 1.2, null, 4);
},
function (K) {
K.wall("altarinside", 0);
K.at("candles", -1.6, 0.5);
K.at("candles", 1.6, 0.5);
K.at("brazier", -2.6, 1.6);
K.at("brazier", 2.6, 1.6);
var rows = Math.max(1, Math.floor((K.D - 5) / 1.6));
for (var i = 0; i < rows; i++) {
K.at("pew", -1.9, 4 + i * 1.6, K.ryOut);
K.at("pew", 1.9, 4 + i * 1.6, K.ryOut);
}
K.glow(0, 1, 2.6, null, 3.6);
},
function (K) {
K.runW("weaponrack", udxFit(K, "weaponrack", 0.3));
K.runL("armourstand", Math.max(1, Math.floor((K.D - 2) / 1.5)));
K.runR("weaponrack", Math.max(1, Math.floor((K.D - 2) / 2.3)));
K.at("workbench", 0, K.D * 0.55);
K.at("keyrack", K.W / 2 - 0.9, K.D - 0.4, K.ryOut, { y: 1.4, solid: false });
K.glow(0, K.D * 0.5, K.h - 1, 0xFFC890);
},
function (K) {
var n = Math.max(2, Math.floor((K.D - 2) / 1.4));
for (var i = 0; i < n; i++) {
var b = 1.2 + i * 1.4;
K.left("bunk", b);
K.right("bunk", b);
}
K.at("footchest", -K.W / 2 + 2.6, K.D * 0.5, K.ryR);
K.at("footchest", K.W / 2 - 2.6, K.D * 0.5, K.ryL);
K.wall("eslockers", 0);
K.at("table", 0, K.D * 0.55);
K.at("chair", 0, K.D * 0.55 - 0.9);
K.glow(0, K.D * 0.5, K.h - 1, 0xFFC890);
},
function (K) {
K.wall("blackboard", 0, { y: 0.9, solid: false });
K.at("desk", -K.W / 2 + 1.8, 1.6, K.ryOut);
K.at("chair", -K.W / 2 + 1.8, 0.9, K.ryOut);
var cols = Math.max(2, Math.min(5, Math.floor((K.W - 2) / 1.6))), rows = Math.max(2, Math.floor((K.D - 4) / 1.6));
for (var r = 0; r < rows; r++)
for (var c = 0; c < cols; c++) {
var a = (c - (cols - 1) / 2) * 1.6, b = 3.4 + r * 1.6;
K.at("schooldesk", a, b, K.ryOut);
}
K.right("esbookcase", K.D * 0.6);
K.hangL("painting", K.D * 0.5, 2.3);
K.glow(0, K.D * 0.5, K.h - 1);
},
function (K) {
K.wall("wglabbench", -K.W / 4);
K.wall("herbrack", K.W / 4);
K.at("workbench", 0, K.D * 0.5);
K.left("cask", K.D * 0.4);
K.left("barrel", K.D * 0.7);
K.right("wgmedshelf", K.D * 0.4);
K.right("displaycase", K.D * 0.75);
K.at("crystalcluster", -K.W / 2 + 1.4, 1.4);
K.at("candles", 0.6, K.D * 0.5, K.ryIn, { y: 0.95, solid: false });
K.glow(0, K.D * 0.5, 1.6, 0x8AF0D0, 2.4);
K.glow(-K.W / 2 + 1.4, 1.4, 1.6, 0xC890FF, 2.6);
},
function (K) {
K.at("table", 0, K.D * 0.5);
K.at("chair", -1, K.D * 0.5, K.ryR);
K.at("chair", 1, K.D * 0.5, K.ryL);
K.wall("weaponrack", -1.3);
K.wall("eslockers", 1.4);
K.left("armourstand", K.D * 0.4);
K.right("noticeboard", K.D * 0.4, { y: 1, solid: false });
K.at("keyrack", K.W / 2 - 0.3, K.D * 0.7, K.ryL, { y: 1.4, solid: false });
K.glow(0, K.D * 0.5, K.h - 1, 0xFFC890);
},
function (K) {
var n = Math.max(2, Math.floor((K.D - 2) / 2.4));
for (var i = 0; i < n; i++) {
K.hangL("painting", 1.4 + i * 2.4, 1.8, { s: 1.6 });
K.hangR("painting", 1.4 + i * 2.4, 1.8, { s: 1.6 });
}
K.wall("esbust", -1.6);
K.wall("esbust", 1.6);
K.at("sofa", 0, K.D * 0.5, K.ryIn + Math.PI / 2);
K.at("plant", -K.W / 2 + 0.9, K.D - 1);
K.at("plant", K.W / 2 - 0.9, K.D - 1);
K.glow(0, K.D * 0.5, K.h - 1);
},
function (K) {
K.ceil("ironchandelier", 0, K.D * 0.3);
K.ceil("ironchandelier", 0, K.D * 0.7);
K.wall("piano", -2);
K.wall("esharp", 1);
K.wall("esorgan", 3.4, { s: 0.9 });
K.runL("sofa", Math.max(1, Math.floor((K.D - 3) / 3.4)));
K.runR("sofa", Math.max(1, Math.floor((K.D - 3) / 3.4)));
K.glow(0, K.D * 0.3, K.h - 1.4, null, 4);
K.glow(0, K.D * 0.7, K.h - 1.4, null, 4);
},
function (K) {
K.wall("fireplace", 0);
K.at("sofa", 0, K.D * 0.6, K.ryOut);
K.at("armchair", -1.8, 2.2, K.ryR + 0.5);
K.at("armchair", 1.8, 2.2, K.ryL - 0.5);
K.at("table", 0, K.D * 0.42, K.ryIn, { s: 0.7 });
K.left("esbookcase", K.D * 0.5);
K.right("piano", K.D * 0.5);
K.rug("rug", 0, K.D * 0.45);
K.hang("painting", 0, 2.4);
K.at("plant", -K.W / 2 + 0.8, K.D - 0.9);
K.glow(0, 1, 2.2, 0xFFB070);
},
function (K) {
K.wall("counter", -1.3);
K.wall("counter", 1.3);
K.at("cask", -K.W / 2 + 1, 0.9, K.ryR);
K.at("cask", K.W / 2 - 1, 0.9, K.ryL);
var cols = Math.max(1, Math.floor((K.W - 2) / 3.2)), rows = Math.max(1, Math.floor((K.D - 4) / 3));
for (var r = 0; r < rows; r++)
for (var c = 0; c < cols; c++) {
var a = (c - (cols - 1) / 2) * 3.2, b = 4 + r * 3;
K.at("trbenchtable", a, b, K.ryIn);
}
K.left("fireplace", K.D * 0.6);
K.ceil("ironchandelier", 0, K.D * 0.5);
K.glow(0, K.D * 0.5, K.h - 1.2, 0xFFB060, 3.6);
},
function (K) {
var p = K.pt(0, K.D * 0.5);
var ring = new THREE.Mesh(new THREE.RingGeometry(2.6, 3, 40), udxMat(K.th.glow || 0xB890FF, null, { basic: 1, op: 0.5, ds: 1 }));
ring.rotation.x = -Math.PI / 2;
ring.position.set(p[0], K.y + 0.03, p[1]);
K.A.g.add(ring);
ring.userData.keep = 1;
var r2 = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.55, 6), ring.material);
r2.rotation.x = -Math.PI / 2;
r2.position.set(p[0], K.y + 0.035, p[1]);
K.A.g.add(r2);
r2.userData.keep = 1;
for (var i = 0; i < 6; i++) {
var an = i / 6 * Math.PI * 2, q = K.pt(Math.cos(an) * 3.8, K.D * 0.5 + Math.sin(an) * 3.8);
udxF(K.A, "candles", q[0], K.y, q[1], 0, { solid: false });
}
K.wall("lectern", 0);
K.runL("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.runR("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.glow(0, K.D * 0.5, 1.2, K.th.glow || 0xB890FF, 5);
},
function (K) {
var p = K.pt(0, K.D * 0.5);
var ring = new THREE.Mesh(new THREE.CircleGeometry(Math.min(K.W, K.D) * 0.32, 32), udxMat(0x7A6A52, "wood"));
ring.rotation.x = -Math.PI / 2;
ring.position.set(p[0], K.y + 0.04, p[1]);
K.A.g.add(ring);
K.runW("weaponrack", Math.min(3, udxFit(K, "weaponrack", 0.4)));
K.runL("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.runR("armourstand", Math.max(1, Math.floor((K.D - 2) / 1.6)));
K.glow(0, K.D * 0.5, K.h - 1.2, 0xFFC890, 4);
},
function (K) {
K.wall("judgebench", 0);
K.at("benchin", -1.8, 4.4, K.ryIn);
K.at("benchin", 1.8, 4.4, K.ryIn);
var rows = Math.max(1, Math.floor((K.D - 7) / 1.5));
for (var i = 0; i < rows; i++) {
K.at("pew", -2, 6.4 + i * 1.5, K.ryOut);
K.at("pew", 2, 6.4 + i * 1.5, K.ryOut);
}
K.hang("hallbanner", -K.W / 2 + 1.4, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.hang("hallbanner", K.W / 2 - 1.4, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.glow(0, 1.6, K.h - 1, null, 3.6);
},
function (K) {
var p = K.pt(0, K.D * 0.5);
var pool = new THREE.Mesh(new THREE.PlaneGeometry(K.W - 3, K.D - 4), udxMat(0x2A6A8A, null, { e: 0x0A2A3A, ei: 0.6 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(p[0], K.y + 0.06, p[1]);
if (Math.abs(K.ryIn) % Math.PI > 0.1)
pool.rotation.z = Math.PI / 2;
K.A.g.add(pool);
K.runL("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.runR("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.wall("esbasinrow", 0);
K.glow(0, K.D * 0.5, 1.2, 0x9AD8FF, 4);
},
function (C, y, th) {
var r;
if (y <= C.jy) {
var u = Math.max(0, Math.min(1, (y - C.y0) / (C.jy - C.y0)));
r = C.waist + (C.foot - C.waist) * Math.pow(1 - u, 1.7);
}
else {
var v = Math.max(0, Math.min(1, (y - C.jy) / (C.ty - C.jy)));
r = C.waist + (C.top - C.waist) * Math.pow(v, 1.35);
}
return r * (1 + 0.09 * Math.sin(th * C.fl + y * 0.035 + C.ph) + 0.05 * Math.sin(th * 3 + y * 0.11 + C.ph * 2));
},
function (G, C) {
var lite = UDX.lite, seg = lite ? 18 : 30, rows = lite ? 32 : 56, H = C.ty - C.y0;
var geo = new THREE.CylinderGeometry(1, 1, H, seg, rows, true), p = geo.attributes.position, uv = geo.attributes.uv;
for (var i = 0; i < p.count; i++) {
var lx = p.getX(i), ly = p.getY(i), lz = p.getZ(i), th = Math.atan2(lz, lx), wy = C.y0 + H / 2 + ly, r = udcColR(C, wy, th);
p.setXYZ(i, Math.cos(th) * r, ly, Math.sin(th) * r);
}
for (var k = 0; k < uv.count; k++)
uv.setXY(k, uv.getX(k) * C.top * 2 * Math.PI / 4, uv.getY(k) * H / 4);
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, C.mat);
m.position.set(C.x, C.y0 + H / 2, C.z);
G.add(m);
var step = lite ? 9 : 6;
for (var y = C.y0 + 5; y < Math.min(C.ty - 8, C.roofY - 6); y += step) {
var r0 = udcColR(C, y, 0), n = Math.max(3, Math.floor(2 * Math.PI * r0 / (lite ? 9 : 6)));
for (var j = 0; j < n; j++) {
if (((j * 7 + Math.round(y) * 3 + C.seed) % 5) < 2)
continue;
var th = j / n * Math.PI * 2 + (y * 0.07), rr = udcColR(C, y, th) + 0.12;
UDC.wins.push({ x: C.x + Math.cos(th) * rr, y: y, z: C.z + Math.sin(th) * rr, ry: Math.atan2(Math.cos(th), Math.sin(th)), c: (j + Math.round(y)) % 3 ? C.col : C.col2 || 0xFFD8A8 });
}
}
var gm = new THREE.MeshBasicMaterial({ color: C.col, transparent: true, opacity: 0.55, depthWrite: false });
(C.rings || []).forEach(function (ry) {
var rr = udcColR(C, ry, 0) * 1.02 + 0.6;
var t = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.28, 5, lite ? 32 : 56), gm);
t.rotation.x = Math.PI / 2;
t.position.set(C.x, ry, C.z);
G.add(t);
if (C.ledges && ry > C.jy) {
var led = new THREE.Mesh(new THREE.CylinderGeometry(rr + 2.6, rr + 1.6, 0.7, lite ? 24 : 40, 1), C.mat);
led.position.set(C.x, ry - 0.5, C.z);
G.add(led);
}
});
if (!lite && C.helix) {
var pts = [];
for (var s = 0; s <= 160; s++) {
var u = s / 160, yy = C.y0 + 8 + u * (Math.min(C.ty, C.roofY) - C.y0 - 20), th = u * Math.PI * 2 * C.helix;
var rr = udcColR(C, yy, th) + 0.35;
pts.push(new THREE.Vector3(C.x + Math.cos(th) * rr, yy, C.z + Math.sin(th) * rr));
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 320, 0.22, 4, false), gm);
G.add(tube);
}
UDX.anim.push({ fn: function (dt, now) { gm.opacity = 0.42 + 0.16 * Math.sin(now * 0.5 + C.ph); } });
UD.solids.push({ x: C.x, z: C.z, r: udcColR(C, C.y0 + 1, 0) * 0.94 });
UDC.cols.push(C);
return C;
},
function (sig, col) {
var hex = "#" + ("000000" + col.toString(16)).slice(-6);
return wTex(128, 256, function (x, W, H) {
x.fillStyle = "#140E1C";
x.fillRect(0, 0, W, H);
x.strokeStyle = hex;
x.fillStyle = hex;
x.lineWidth = 5;
x.strokeRect(8, 8, W - 16, H - 16);
var cx = W / 2, cy = H * 0.42;
x.beginPath();
if (sig === "crown") {
x.arc(cx, cy + 14, 26, 0, 7);
x.stroke();
x.beginPath();
x.moveTo(cx - 30, cy - 6);
x.lineTo(cx - 30, cy - 34);
x.lineTo(cx - 15, cy - 18);
x.lineTo(cx, cy - 40);
x.lineTo(cx + 15, cy - 18);
x.lineTo(cx + 30, cy - 34);
x.lineTo(cx + 30, cy - 6);
x.closePath();
x.stroke();
}
else if (sig === "web") {
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a) * 44, cy + Math.sin(a) * 44);
}
x.stroke();
[14, 28, 42].forEach(function (r) { x.beginPath(); for (var j = 0; j <= 8; j++) {
var b = j / 8 * Math.PI * 2;
x.lineTo(cx + Math.cos(b) * r, cy + Math.sin(b) * r);
} x.stroke(); });
}
else if (sig === "star") {
for (var k = 0; k < 8; k++) {
var c = k / 8 * Math.PI * 2, r2 = k % 2 ? 18 : 44;
x.lineTo(cx + Math.cos(c) * r2, cy + Math.sin(c) * r2);
}
x.closePath();
x.stroke();
x.beginPath();
x.arc(cx, cy, 8, 0, 7);
x.fill();
}
else if (sig === "blades") {
x.moveTo(cx - 34, cy - 40);
x.lineTo(cx + 34, cy + 40);
x.moveTo(cx + 34, cy - 40);
x.lineTo(cx - 34, cy + 40);
x.stroke();
x.beginPath();
x.moveTo(cx - 20, cy + 18);
x.lineTo(cx - 10, cy + 28);
x.moveTo(cx + 20, cy + 18);
x.lineTo(cx + 10, cy + 28);
x.stroke();
}
else if (sig === "compass") {
x.arc(cx, cy, 36, 0, 7);
x.stroke();
x.beginPath();
x.moveTo(cx, cy - 46);
x.lineTo(cx + 9, cy);
x.lineTo(cx, cy + 46);
x.lineTo(cx - 9, cy);
x.closePath();
x.fill();
x.beginPath();
x.moveTo(cx - 46, cy);
x.lineTo(cx + 46, cy);
x.stroke();
}
else if (sig === "spire") {
for (var q = 0; q < 14; q++) {
var c2 = q / 14 * Math.PI * 2 - Math.PI / 2, r3 = q % 2 ? 16 : 44;
x.lineTo(cx + Math.cos(c2) * r3, cy + Math.sin(c2) * r3);
}
x.closePath();
x.stroke();
x.beginPath();
x.arc(cx, cy, 50, 0, 7);
x.stroke();
x.beginPath();
x.arc(cx, cy, 7, 0, 7);
x.fill();
}
else if (sig === "scales") {
x.moveTo(cx, cy - 40);
x.lineTo(cx, cy + 40);
x.moveTo(cx - 36, cy - 26);
x.lineTo(cx + 36, cy - 26);
x.moveTo(cx - 24, cy + 40);
x.lineTo(cx + 24, cy + 40);
x.stroke();
[-1, 1].forEach(function (s) { x.beginPath(); x.arc(cx + s * 32, cy, 12, 0, Math.PI); x.stroke(); x.beginPath(); x.moveTo(cx + s * 32 - 12, cy); x.lineTo(cx + s * 36, cy - 26); x.lineTo(cx + s * 32 + 12, cy); x.stroke(); });
}
else {
x.moveTo(cx, cy + 46);
x.quadraticCurveTo(cx - 6, cy, cx, cy - 46);
x.stroke();
for (var t = 0; t < 4; t++) {
var yy = cy - 30 + t * 20, s2 = t % 2 ? 1 : -1;
x.beginPath();
x.moveTo(cx, yy);
x.lineTo(cx + s2 * 20, yy - 10);
x.stroke();
}
}
x.font = "bold 20px Georgia";
x.textAlign = "center";
x.fillText(sig === "crown" ? "VAELITH" : (sig === "spire" ? "THE COUNCIL" : ""), cx, H - 30);
});
},
function (G, C, H, toKey, inAt) {
var dx = UDC.cx - C.x, dz = UDC.cz - C.z, L = Math.hypot(dx, dz) || 1;
dx /= L;
dz /= L;
var th = Math.atan2(dz, dx), r = udcColR(C, C.y0 + 1.2, th) * 1.0, px = C.x + dx * r, pz = C.z + dz * r;
var g = new THREE.Group();
g.position.set(px, C.y0, pz);
g.rotation.y = Math.atan2(dx, dz);
G.add(g);
var st = udxMat(0x2E2836, "stone"), trim = udxMat(H.col, null, { basic: 1 });
udxBox(1.2, 9, 1.6, st, -3.4, 4.5, 0.4, g);
udxBox(1.2, 9, 1.6, st, 3.4, 4.5, 0.4, g);
udxBox(8, 1.4, 1.8, st, 0, 9.4, 0.4, g);
var arch = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.22, 6, 24, Math.PI), trim);
arch.position.set(0, 6, 1.25);
g.add(arch);
udxBox(5.6, 6, 0.2, udxMat(0x150E1C, "wood"), 0, 3, -0.2, g);
var dg = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 5.8), new THREE.MeshBasicMaterial({ color: H.col, transparent: true, opacity: 0.16, depthWrite: false }));
dg.position.set(0, 2.95, -0.06);
g.add(dg);
for (var s = 0; s < 3; s++)
udxBox(8.4 - s * 0.8, 0.22, 1.2, st, 0, 0.11 + s * 0.22, 1.6 + (2 - s) * 1.1, g);
var tex = udcSigil(H.sig, H.col);
[-5.2, 5.2].forEach(function (bx) { var b = new THREE.Mesh(new THREE.PlaneGeometry(2, 6), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide })); b.position.set(bx, 6, 1.3); g.add(b); });
var hexs = "#" + ("000000" + H.col.toString(16)).slice(-6);
var sg = wSign([H.name, H.motto], 5.2, 1.3, "#140E1C", hexs);
sg.position.set(0, 11, 1.4);
g.add(sg);
var gl = wGlow(H.col, 6, 0.45);
gl.position.set(0, 7, 2);
g.add(gl);
UDX.anim.push({ glow: gl, b: 0.45, ph: C.ph });
var ox = px + dx * 5.4, oz = pz + dz * 5.4;
UD.talkers.push({ x: px + dx * 3.2, z: pz + dz * 3.2, r: 3.2, name: "The doors of " + H.name, verb: "go in", fn: function () { UDX.ret = { x: ox, z: oz, yaw: Math.atan2(-dx, -dz) }; udxGo(toKey, inAt[0], inAt[1], inAt[2], "<b>" + esc(H.name) + ".</b> " + esc(H.motto) + "."); } });
return { x: ox, z: oz, yaw: Math.atan2(-dx, -dz) };
},
function (G, R) {
var cx = UDC.cx, cz = UDC.cz, y0 = udHeight(cx, cz);
UDC.y = y0;
UDX.lite = udxLite();
var root = new THREE.Group();
root.name = "udc";
G.add(root);
UDC.g = root;
var rock = udxMat(0x37313F, "stone"), rockD = udxMat(0x2C2734, "stone"), pave = udxMat(0x3E3A46, "paving"), paveD = udxMat(0x2E2A36, "marble");
var court = new THREE.Mesh(new THREE.CircleGeometry(68, 72), paveD);
metreUVs(court.geometry, "pln", [136, 136]);
court.rotation.x = -Math.PI / 2;
court.position.set(cx, y0 + 0.05, cz);
root.add(court);
var inl = new THREE.Mesh(new THREE.RingGeometry(40, 41.2, 72), udxMat(0xA070FF, null, { basic: 1, op: 0.45 }));
inl.rotation.x = -Math.PI / 2;
inl.position.set(cx, y0 + 0.07, cz);
root.add(inl);
var ring = new THREE.Mesh(new THREE.RingGeometry(116, 124, 96, 1), pave);
metreUVs(ring.geometry, "pln", [248, 248]);
ring.rotation.x = -Math.PI / 2;
ring.position.set(cx, y0 + 0.05, cz);
root.add(ring);
[[140, 6], [330, 5], [210, 5], [100, 5]].forEach(function (q) {
var a = q[0] * Math.PI / 180, len = 124 - 66, mid = 66 + len / 2, av = new THREE.Mesh(new THREE.PlaneGeometry(q[1], len), pave);
metreUVs(av.geometry, "pln", [q[1], len]);
av.rotation.x = -Math.PI / 2;
av.rotation.z = -(a - Math.PI / 2);
av.position.set(cx + Math.cos(a) * mid, y0 + 0.06, cz + Math.sin(a) * mid);
root.add(av);
for (var k = 0; k < 5; k++) {
var dd = 70 + k * 12;
[-1, 1].forEach(function (s) {
var lx = cx + Math.cos(a) * dd - Math.sin(a) * s * (q[1] / 2 + 1), lz = cz + Math.sin(a) * dd + Math.cos(a) * s * (q[1] / 2 + 1);
udxCyl(0.12, 0.16, 3.2, rockD, lx, y0 + 1.6, lz, root, 6);
var lp = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), udxMat(0xC8A8FF, null, { basic: 1 }));
lp.position.set(lx, y0 + 3.4, lz);
root.add(lp);
if (!UDX.lite || k % 2 === 0)
udxGlow(root, 0xB890FF, 2.4, 0.5, lx, y0 + 3.4, lz);
UD.solids.push({ x: lx, z: lz, r: 0.3 });
});
}
});
var sp = { key: "spire", x: cx, z: cz, y0: y0, foot: 32, waist: 10, jy: y0 + 70, top: 46, roofY: udcRoofY(cx, cz), ty: udcRoofY(cx, cz) * 1.1 + 30, fl: 11, ph: 0.3, seed: 3, col: 0xB890FF, col2: 0xFFD8A8, mat: rock, helix: 3, ledges: true };
sp.rings = [y0 + 14, y0 + 30, y0 + 50, y0 + 70, y0 + 92, y0 + 118, y0 + 150];
udcColumn(root, sp);
UDC.spire = sp;
UDC_HOUSES.forEach(function (H, i) {
var a = H.a * Math.PI / 180, d = 88, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, ry = udcRoofY(x, z);
var C = { key: H.key, x: x, z: z, y0: y0, foot: 17 + (i % 3) * 1.5, waist: 4.5 + (i % 2), jy: y0 + 34 + (i * 7) % 16, top: 24 + (i % 3) * 3, roofY: ry, ty: ry * 1.1 + 24, fl: 7 + i % 4, ph: i * 0.9, seed: i * 13, col: H.col, col2: 0xFFD8A8, mat: i % 2 ? rock : rockD, helix: i % 2 ? 2 : 0, ledges: true };
C.rings = [y0 + 12, C.jy, C.jy + 22, C.jy + 50, C.jy + 86];
udcColumn(root, C);
H.C = C;
});
var Rr = wRand(4471);
for (var j = 0; j < (UDX.lite ? 10 : 16); j++) {
var a2 = j / (UDX.lite ? 10 : 16) * Math.PI * 2 + 0.13, d2 = 146 + (j % 3) * 10, x2 = cx + Math.cos(a2) * d2, z2 = cz + Math.sin(a2) * d2, ry2 = udcRoofY(x2, z2), tip = y0 + 44 + Rr() * 60;
var L = { x: x2, z: z2, y0: tip - 1, foot: 0.6, waist: 0.6, jy: tip, top: 9 + Rr() * 7, roofY: ry2, ty: ry2 * 1.1 + 18, fl: 6, ph: j, seed: j * 7, col: [0xA070FF, 0x6A9AFF, 0xE070E0, 0x4AD8B8][j % 4], mat: rockD, rings: [tip + 16, tip + 40] };
udcColumn(root, L);
UD.solids.pop();
}
var web = new THREE.LineBasicMaterial({ color: 0xC8C0E8, transparent: true, opacity: 0.5 }), deckM = udxMat(0x3A3448, "wood", { e: 0x1A1430, ei: 0.5 });
function bridge(A, B, h) {
var a = Math.atan2(B.z - A.z, B.x - A.x), ra = udcColR(A, h, a), rb = udcColR(B, h, a + Math.PI), ax = A.x + Math.cos(a) * ra, az = A.z + Math.sin(a) * ra, bx = B.x - Math.cos(a) * rb, bz = B.z - Math.sin(a) * rb, span = Math.hypot(bx - ax, bz - az);
var dk = udxBox(2.2, 0.25, span, deckM, (ax + bx) / 2, h - 2.6, (az + bz) / 2, root);
dk.rotation.y = Math.atan2(bx - ax, bz - az);
[-1, 1].forEach(function (s) { var pts = []; for (var u = 0; u <= 10; u++) {
var t = u / 10;
pts.push(new THREE.Vector3(ax + (bx - ax) * t - Math.sin(a) * s * 1.1, h - 1.2 - Math.sin(t * Math.PI) * 1.6, az + (bz - az) * t + Math.cos(a) * s * 1.1));
} root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), web)); });
if (!UDX.lite) {
var gl = wGlow(0xC8B8FF, 3, 0.35);
gl.position.set((ax + bx) / 2, h - 2, (az + bz) / 2);
root.add(gl);
}
}
UDC_HOUSES.forEach(function (H, i) { bridge(sp, H.C, y0 + 92 - (i % 3) * 14); var N = UDC_HOUSES[(i + 1) % UDC_HOUSES.length]; if (!UDX.lite || i % 2 === 0)
bridge(H.C, N.C, H.C.jy + 48); });
var wn = UDC.wins.length, wg = new THREE.PlaneGeometry(1.1, 1.8), wm = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), im = new THREE.InstancedMesh(wg, wm, wn), mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), cc = new THREE.Color(), one = new THREE.Vector3(1, 1, 1);
UDC.wins.forEach(function (w, i) { e.set(0, w.ry, 0); q.setFromEuler(e); mx.compose(new THREE.Vector3(w.x, w.y, w.z), q, one); im.setMatrixAt(i, mx); cc.setHex(w.c).multiplyScalar(0.85); im.setColorAt(i, cc); });
root.add(im);
UDC.wins = [];
UDX.cityNoGlow = (UDX.cityNoGlow || []).concat([im]);
UDC.spireDoorTo = null;
UDC_HOUSES.forEach(function (H) { H.out = udcDoor(root, H.C, H, "h_" + H.key + "_1", UDX.by["h_" + H.key + "_1"].inAt); });
(function () {
var C = sp, a = 140 * Math.PI / 180, dx = Math.cos(a), dz = Math.sin(a), r = udcColR(C, C.y0 + 3, a) * 0.96, px = C.x + dx * r, pz = C.z + dz * r;
var H = { name: "The Matron Spire", motto: "Seat of the Council of Matrons", col: 0xB890FF, sig: "crown" };
var keepCx = UDC.cx, keepCz = UDC.cz;
UDC.cx = C.x + dx * 200;
UDC.cz = C.z + dz * 200;
UDC.spireOut = udcDoor(root, C, H, "spire_1", UDX.by.spire_1.inAt);
UDC.cx = keepCx;
UDC.cz = keepCz;
})();
udcBazaar(root, y0);
udcWard(root, y0, Rr);
udcAcademy(root, y0);
udcThornyard(root, y0);
var gx = cx - 110, gz = cz + 92, gate = new THREE.Group(), gy = udHeight(gx, gz);
gate.position.set(gx, gy, gz);
gate.rotation.y = Math.atan2(-(gx - 0), -(gz + 300)) + Math.PI;
root.add(gate);
[-6, 6].forEach(function (s) { var pl = new THREE.Mesh(new THREE.ConeGeometry(2, 18, 9), rock); pl.position.set(s, 9, 0); gate.add(pl); var t = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), udxMat(0xC890F0, null, { basic: 1 })); t.position.set(s, 18.2, 0); gate.add(t); UD.solids.push({ x: gx + Math.cos(gate.rotation.y) * s, z: gz - Math.sin(gate.rotation.y) * s, r: 1.8 }); });
var arch = new THREE.Mesh(new THREE.TorusGeometry(6, 0.7, 6, 24, Math.PI), udxMat(0x4A3A6A, "stone", { e: 0x2A1A4A, ei: 0.4 }));
arch.position.y = 13;
gate.add(arch);
var sg = wSign(["Zhaelvorn", "City of Spires", "Enter in peace, and keep it"], 5.6, 2, "#1A1622", "#C8B0FF");
sg.position.set(0, 6, 0.8);
gate.add(sg);
UD.cityGate = { x: gx, z: gz };
udcFolk(root, y0, gx, gz);
},
function (G, C, toKey, label, inAt) {
var dx = UDC.cx - C.x, dz = UDC.cz - C.z, L = Math.hypot(dx, dz) || 1;
dx /= L;
dz /= L;
var th = Math.atan2(dz, dx), r = udcColR(C, C.y0 + 0.4, th) * 0.93, px = C.x + dx * r, pz = C.z + dz * r;
var g = new THREE.Group();
g.position.set(px, C.y0, pz);
g.rotation.y = Math.atan2(dx, dz);
G.add(g);
udxBox(1.8, 2.8, 0.3, udxMat(0x2A1E1A, "wood"), 0, 1.4, 0.1, g);
var fr = udxMat(0x3A3046, "stone");
udxBox(0.4, 3.2, 0.7, fr, -1.1, 1.6, 0.2, g);
udxBox(0.4, 3.2, 0.7, fr, 1.1, 1.6, 0.2, g);
udxBox(2.6, 0.4, 0.7, fr, 0, 3.3, 0.2, g);
var lp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), udxMat(C.col, null, { basic: 1 }));
lp.position.set(0.9, 2.6, 0.7);
g.add(lp);
var ox = px + dx * 3.2, oz = pz + dz * 3.2;
UD.talkers.push({ x: px + dx * 1.6, z: pz + dz * 1.6, r: 2.2, name: label, verb: "go in", fn: function () { UDX.ret = { x: ox, z: oz, yaw: Math.atan2(-dx, -dz) }; udxGo(toKey, inAt[0], inAt[1], inAt[2], "<b>" + esc(label) + ".</b>"); } });
},
function (G, y0, Rr) {
var angs = [12, 24, 52, 64, 92, 158, 170, 236, 252, 268, 296, 306, 350], kinds = ["ward_a_1", "ward_b_1", "ward_c_1"], fam = ["Ilmor", "Vesk", "Tarran", "Quillon", "Selv", "Drae", "Oszin", "Yrrel", "Nathe", "Corwyn", "Ellith", "Varro", "Isk"];
angs.forEach(function (ad, i) {
var a = ad * Math.PI / 180, d = 136 + (i % 3) * 14, x = UDC.cx + Math.cos(a) * d, z = UDC.cz + Math.sin(a) * d;
var C = { x: x, z: z, y0: y0, foot: 5.4 + (i % 3) * 0.8, waist: 0.5, jy: y0 + 13 + (i % 4) * 2.5, top: 0.5, roofY: 999, ty: y0 + 13.1 + (i % 4) * 2.5, fl: 5 + i % 3, ph: i * 1.3, seed: i * 5, col: [0xA070FF, 0x6A9AFF, 0xE070E0, 0x4AD8B8, 0xE8B85A][i % 5], mat: udxMat(0x3A3442, "stone"), rings: [y0 + 4.2] };
udcColumn(G, C);
var k = kinds[i % 3], A = UDX.by[k];
if (A)
udcHomeDoor(G, C, k, "The home of the " + fam[i] + " family", A.inAt);
if (!UDX.lite) {
for (var m = 0; m < 3; m++) {
var aa = Math.atan2(UDC.cz - z, UDC.cx - x) + (m - 1) * 0.6, mx = x + Math.cos(aa) * (C.foot + 1.2), mz = z + Math.sin(aa) * (C.foot + 1.2);
udxCyl(0.06, 0.09, 0.5, udxMat(0xD8D0C0), mx, y0 + 0.25, mz, G, 5);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), udxMat(0x6AE8D8, null, { basic: 1 }));
cap.position.set(mx, y0 + 0.48, mz);
G.add(cap);
}
}
});
},
function (G, y0) {
var a = 140 * Math.PI / 180, ux = Math.cos(a), uz = Math.sin(a), px = -uz, pz = ux;
UDC.bazaar = [];
UDC_BAZAAR.forEach(function (B, i) {
var s = i % 2 ? 1 : -1, along = 74 + Math.floor(i / 2) * 10, x = UDC.cx + ux * along + px * s * 7.5, z = UDC.cz + uz * along + pz * s * 7.5;
var st = new THREE.Group();
st.position.set(x, y0, z);
st.rotation.y = Math.atan2(-px * s, -pz * s);
G.add(st);
udxBox(3.4, 1, 1.2, udxMat(0x3A3040, "wood"), 0, 0.5, 0, st);
udxBox(3.4, 2.4, 0.15, udxMat(0x2A2430, "wood"), 0, 1.2, -1.6, st);
[-1.6, 1.6].forEach(function (bx) { udxCyl(0.07, 0.07, 2.8, udxMat(0x2A2430, "wood"), bx, 1.4, -1.5, st, 6); udxCyl(0.07, 0.07, 2.6, udxMat(0x2A2430, "wood"), bx, 1.3, 0.5, st, 6); });
var aw = udxBox(3.8, 0.08, 2.4, udxMat(B[3], "wood", { e: B[3], ei: 0.25 }), 0, 2.75, -0.5, st);
aw.rotation.x = 0.18;
for (var g2 = 0; g2 < 6; g2++) {
var it = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), udxMat([0xC890F0, 0x8FD8F0, 0x90F0B0, 0xF0C890, 0xE8E0FF, 0xFFB8D8][(g2 + i) % 6], null, { basic: 1 }));
it.position.set(-1.3 + g2 * 0.52, 1.12, 0.15);
st.add(it);
}
var sg = wSign([B[0]], 2.4, 0.5, "#1A1622", "#D8C8FF");
sg.position.set(0, 2.15, 0.65);
st.add(sg);
if (!UDX.lite || i % 2 === 0) {
var gl = wGlow(0xC8A8FF, 2.6, 0.4);
gl.position.set(0, 2.4, 0);
st.add(gl);
}
UD.solids.push({ x: x, z: z, r: 1.9 });
var kx = x - px * s * 1.3, kz = z - pz * s * 1.3;
UDC.bazaar.push({ i: i, x: kx, z: kz, ry: st.rotation.y, name: B[0], who: B[1], id: B[2], cx: x + px * s * -0.2, cz: z });
});
var sx = UDC.cx + ux * 68, sz = UDC.cz + uz * 68, sg2 = wSign(["The Silk Bazaar", "Fair weight, by order of House Korvaen"], 4.4, 1.1, "#1A1622", "#E8B85A");
sg2.position.set(sx - px * 5, y0 + 4, sz - pz * 5);
sg2.rotation.y = Math.atan2(ux, uz) + Math.PI;
G.add(sg2);
udxCyl(0.14, 0.18, 4.6, udxMat(0x2A2430, "wood"), sx - px * 5, y0 + 2.3, sz - pz * 5, G, 6);
UD.solids.push({ x: sx - px * 5, z: sz - pz * 5, r: 0.3 });
},
function (G, y0) {
var a = 330 * Math.PI / 180, d = 178, x = UDC.cx + Math.cos(a) * d, z = UDC.cz + Math.sin(a) * d, ry = udcRoofY(x, z), lite = UDX.lite;
var C = { x: x, z: z, y0: y0, foot: 22, waist: 7, jy: y0 + 46, top: 26, roofY: ry, ty: ry * 1.1 + 20, fl: 9, ph: 2.2, seed: 41, col: 0xE070E0, col2: 0x9AC8FF, mat: udxMat(0x342C3E, "stone"), rings: [y0 + 10, y0 + 24, y0 + 46, y0 + 80], helix: 2, ledges: true };
udcColumn(G, C);
UDC.academy = C;
[[0.9, 26, 12], [-0.9, 26, 12], [Math.PI, 24, 10]].forEach(function (t, i) {
var ta = a + Math.PI + t[0], tx = x + Math.cos(ta) * t[1], tz = z + Math.sin(ta) * t[1];
udcColumn(G, { x: tx, z: tz, y0: y0, foot: 6, waist: 0.6, jy: y0 + 30 + i * 6, top: 0.6, roofY: 999, ty: y0 + 30.1 + i * 6, fl: 6, ph: i, seed: i * 3, col: 0xE070E0, mat: udxMat(0x342C3E, "stone"), rings: [y0 + 8, y0 + 20] });
});
var H = { name: "The Duskwell Academy", motto: "of the Deep Arts", col: 0xE070E0, sig: "star" };
UDC.academyOut = udcDoor(G, C, H, "academy_1", UDX.by.academy_1.inAt);
var cd = 150, qx = UDC.cx + Math.cos(a) * cd, qz = UDC.cz + Math.sin(a) * cd, ct = new THREE.Mesh(new THREE.PlaneGeometry(30, 22), udxMat(0x2E2A36, "marble"));
metreUVs(ct.geometry, "pln", [30, 22]);
ct.rotation.x = -Math.PI / 2;
ct.rotation.z = -(a - Math.PI / 2);
ct.position.set(qx, y0 + 0.06, qz);
G.add(ct);
UDC.circles = [];
[-9, 0, 9].forEach(function (o, i) {
var px = qx - Math.sin(a) * o, pz = qz + Math.cos(a) * o, col = [0xB890FF, 0x8AC8FF, 0xE070E0][i];
var r1 = new THREE.Mesh(new THREE.RingGeometry(2.8, 3.15, 48), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide }));
r1.rotation.x = -Math.PI / 2;
r1.position.set(px, y0 + 0.09, pz);
G.add(r1);
var r2 = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.65, i === 1 ? 5 : 7), r1.material);
r2.rotation.x = -Math.PI / 2;
r2.position.set(px, y0 + 0.1, pz);
G.add(r2);
UDX.anim.push({ fn: function (dt, now) { r1.material.opacity = 0.36 + 0.16 * Math.sin(now * 0.6 + i); r2.rotation.z = now * 0.05 * (i % 2 ? 1 : -1); } });
UDC.circles.push({ x: px, z: pz, col: col, i: i });
UD.talkers.push({ x: px, z: pz, r: 3, name: ["The circle of calm", "The circle of light", "The circle of the stone-songs"][i], verb: "take the lesson", fn: function () { udxLesson(["circle", "light", "stone"][i]); } });
});
for (var b = 0; b < 4; b++) {
var bo = -12 + b * 8, bx = qx + Math.cos(a) * 9 - Math.sin(a) * bo, bz = qz + Math.sin(a) * 9 + Math.cos(a) * bo;
udxF({ g: G, solids: UD.solids }, "benchin", bx, y0, bz, Math.atan2(-Math.cos(a), -Math.sin(a)), { solid: false });
UD.solids.push({ x: bx, z: bz, r: 0.9 });
}
var sg = wSign(["The Practice Court", "Duskwell Academy: shadow, light and stone"], 4.4, 1.1, "#1A1622", "#E8B8F8");
sg.position.set(qx - Math.cos(a) * 12, y0 + 3.4, qz - Math.sin(a) * 12);
sg.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
G.add(sg);
udxCyl(0.14, 0.18, 4, udxMat(0x2A2430, "wood"), qx - Math.cos(a) * 12, y0 + 2, qz - Math.sin(a) * 12, G, 6);
UDC.court = { x: qx, z: qz };
},
function (G, y0) {
var a = 210 * Math.PI / 180, d = 176, x = UDC.cx + Math.cos(a) * d, z = UDC.cz + Math.sin(a) * d, ux = -Math.cos(a), uz = -Math.sin(a), px = -uz, pz = ux;
function at(u, p) { return [x + ux * u + px * p, z + uz * u + pz * p]; }
var wall = udxMat(0x3A3442, "stone"), sand = udxMat(0x5A4E42, "earth"), ry = Math.atan2(ux, uz);
UDC.thorn = { x: x, z: z, ux: ux, uz: uz, px: px, pz: pz, at: at, ry: ry };
var fl = new THREE.Mesh(new THREE.PlaneGeometry(64, 46), sand);
metreUVs(fl.geometry, "pln", [64, 46]);
var flat = Math.atan2(-pz, px);
fl.rotation.order = "YXZ";
fl.rotation.set(-Math.PI / 2, flat, 0);
fl.position.set(x, y0 + 0.05, z);
G.add(fl);
function wallRun(u0, p0, u1, p1) {
var A = at(u0, p0), B = at(u1, p1), L = Math.hypot(B[0] - A[0], B[1] - A[1]), w = udxBox(L, 2.8, 0.8, wall, (A[0] + B[0]) / 2, y0 + 1.4, (A[1] + B[1]) / 2, G);
w.rotation.y = -Math.atan2(B[1] - A[1], B[0] - A[0]);
var n = Math.ceil(L / 2);
for (var i = 0; i <= n; i++) {
var t = i / n;
UD.solids.push({ x: A[0] + (B[0] - A[0]) * t, z: A[1] + (B[1] - A[1]) * t, r: 0.9 });
}
}
wallRun(-23, -32, -23, 32);
wallRun(-23, 32, 23, 32);
wallRun(-23, -32, 23, -32);
wallRun(23, -32, 23, -5);
wallRun(23, 5, 23, 32);
[[23, -5], [23, 5]].forEach(function (q) { var p = at(q[0], q[1]); udxBox(1.6, 5, 1.6, wall, p[0], y0 + 2.5, p[1], G).rotation.y = ry; var gl = udxGlow(G, 0xE05A6A, 2.6, 0.45, p[0], y0 + 5.4, p[1]); });
var gs = at(24, 0), sg = wSign(["The Thornyard", "Training grounds of the Spire Guard"], 5, 1.2, "#1A1418", "#F0C8C8");
sg.position.set(gs[0], y0 + 6, gs[1]);
sg.rotation.y = ry;
G.add(sg);
UDC.rings = [];
[[8, -16], [8, -2]].forEach(function (q, i) {
var p = at(q[0], q[1]);
var rg = new THREE.Mesh(new THREE.CircleGeometry(5, 40), udxMat(0x6A5A44, "wood"));
rg.rotation.x = -Math.PI / 2;
rg.position.set(p[0], y0 + 0.08, p[1]);
G.add(rg);
var rope = new THREE.Mesh(new THREE.TorusGeometry(5, 0.05, 4, 40), udxMat(0xC8B890));
rope.rotation.x = -Math.PI / 2;
rope.position.set(p[0], y0 + 1, p[1]);
G.add(rope);
for (var k = 0; k < 8; k++) {
var ka = k / 8 * Math.PI * 2;
udxCyl(0.08, 0.08, 1.1, udxMat(0x3A2A1E, "wood"), p[0] + Math.cos(ka) * 5, y0 + 0.55, p[1] + Math.sin(ka) * 5, G, 6);
}
UDC.rings.push({ x: p[0], z: p[1] });
});
UDC.butts = [];
for (var t = 0; t < 4; t++) {
var p = at(-19, -26 + t * 5), tg = new THREE.Group();
tg.position.set(p[0], y0, p[1]);
tg.rotation.y = ry;
G.add(tg);
udxBox(1.8, 1.8, 0.6, udxMat(0xC8B080, "wood"), 0, 1.2, 0, tg);
[0xF0F0E8, 0x2A2A2A, 0x3A6AC8, 0xC83A3A, 0xF0C830].forEach(function (c, j) { var ring = new THREE.Mesh(new THREE.CircleGeometry(0.8 - j * 0.16, 24), new THREE.MeshLambertMaterial({ color: c })); ring.position.set(0, 1.3, 0.31 + j * 0.002); tg.add(ring); });
UD.solids.push({ x: p[0], z: p[1], r: 1 });
UDC.butts.push(p);
}
var ln = at(4, -18.5), line = new THREE.Mesh(new THREE.PlaneGeometry(18, 0.15), new THREE.MeshBasicMaterial({ color: 0xE8E0D0 }));
line.rotation.order = "YXZ";
line.rotation.set(-Math.PI / 2, flat, 0);
line.position.set(ln[0], y0 + 0.09, ln[1]);
G.add(line);
UDC.archLine = { x: ln[0], z: ln[1] };
UD.talkers.push({ x: ln[0], z: ln[1], r: 4, name: "The archery line", verb: "shoot at the butts", fn: function () { udxArchery(); } });
[[16, -28], [12, -28], [8, -28]].forEach(function (q) { var p = at(q[0], q[1]); udxCyl(0.25, 0.3, 2, udxMat(0x6A5038, "wood"), p[0], y0 + 1, p[1], G, 8); udxBox(1.2, 0.2, 0.2, udxMat(0x6A5038, "wood"), p[0], y0 + 1.5, p[1], G).rotation.y = ry; UD.solids.push({ x: p[0], z: p[1], r: 0.4 }); });
[[20, -30.6], [20, 30.6]].forEach(function (q, i) { var p = at(q[0], q[1]); udxF({ g: G, solids: UD.solids }, "weaponrack", p[0], y0, p[1], ry + (i ? Math.PI : 0) + Math.PI / 2, { solid: false }); UD.solids.push({ x: p[0], z: p[1], r: 1 }); });
var tr = at(-4, 18), trk = new THREE.Mesh(new THREE.RingGeometry(7, 9, 48), udxMat(0x4A3E32, "earth"));
trk.rotation.order = "YXZ";
trk.rotation.set(-Math.PI / 2, flat, 0);
trk.scale.set(1.5, 1, 1);
trk.position.set(tr[0], y0 + 0.07, tr[1]);
G.add(trk);
UDC.track = { x: tr[0], z: tr[1] };
for (var f = 0; f < 24; f++) {
var fa = f / 24 * Math.PI * 2, fr = 9.4;
var fx = Math.cos(fa) * fr * 1.5, fz = Math.sin(fa) * fr, P = at(-4 + fz, 18 + fx);
udxCyl(0.06, 0.06, 1.1, udxMat(0x3A2A1E, "wood"), P[0], y0 + 0.55, P[1], G, 5);
}
var bk = at(-17, 18), bh = new THREE.Group();
bh.position.set(bk[0], y0, bk[1]);
bh.rotation.y = ry;
G.add(bh);
udxBox(20, 9, 10, wall, 0, 4.5, -5, bh);
udxBox(21, 1, 11, udxMat(0x2A2430, "stone"), 0, 9.5, -5, bh);
for (var c = -8; c <= 8; c += 4) {
udxCyl(0.5, 0.6, 8, udxMat(0x4A4252, "stone"), c, 4, 0.6, bh, 10);
}
udxBox(3, 4, 0.3, udxMat(0x2A1E1A, "wood"), 0, 2, 0.05, bh);
var bs = wSign(["The Thornyard Barracks", "The Spire Guard"], 4, 0.9, "#1A1418", "#F0C8C8");
bs.position.set(0, 5, 0.3);
bh.add(bs);
for (var wv = -8; wv <= 8; wv += 4) {
if (wv === 0)
continue;
var wl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2), udxMat(0xFFC890, null, { basic: 1 }));
wl.position.set(wv, 4.6, 0.04);
bh.add(wl);
}
for (var bi = -10; bi <= 10; bi += 2) {
for (var bj = 0; bj <= 10; bj += 2.5) {
var P2 = at(-17 - bj, 18 + bi);
UD.solids.push({ x: P2[0], z: P2[1], r: 1.4 });
}
}
var A = UDX.by.thorn_1, dq = at(-15.2, 18), oq = at(-13.6, 18);
if (A)
UD.talkers.push({ x: dq[0], z: dq[1], r: 2.6, name: "The barracks doors", verb: "go in", fn: function () { UDX.ret = { x: oq[0], z: oq[1], yaw: Math.atan2(-ux, -uz) }; udxGo("thorn_1", A.inAt[0], A.inAt[1], A.inAt[2], "<b>The Thornyard Barracks.</b>"); } });
var wt = at(-20, -29);
udxCyl(2, 2.4, 12, wall, wt[0], y0 + 6, wt[1], G, 10);
udxCyl(3, 3, 0.6, udxMat(0x2A2430, "stone"), wt[0], y0 + 12.3, wt[1], G, 12);
udxGlow(G, 0xE05A6A, 3, 0.45, wt[0], y0 + 13.5, wt[1]);
UD.solids.push({ x: wt[0], z: wt[1], r: 2.6 });
},
function (G, y0, gx, gz) {
var cx = UDC.cx, cz = UDC.cz, DE = function (top, f, o) { return UD_ELF(top, f, o); };
function put(seed, o, x, z, face, talk, wander) {
var y = udHeight(x, z);
var w = wPerson(seed, o);
w.position.set(x, y < -900 ? y0 : y, z);
w.rotation.y = face;
G.add(w);
var P = { g: w, wander: wander || null };
UD.people.push(P);
if (talk)
UD.talkers.push({ p: P, r: 3.6, name: talk.name, t: talk });
return P;
}
function face(x, z, tx, tz) { return Math.atan2(tx - x, tz - z); }
var sp = UDC.spireOut, B = UDC.bazaar || [];
put("zhael_0", { sex: "f", look: DE(0x4A2A6A, 1, 0) }, sp.x + 2, sp.z + 2, face(sp.x, sp.z, gx, gz), udxPersona("Matron Ilvaryn of House Vaelith", "the eldest of the Matrons and head of the Council of Matrons, who rule Zhaelvorn from the Matron Spire; stately, sharp, patient, quietly amused by surface folk. You speak with formal courtesy and expect it back. You are proud of the seven Great Houses, each living in its own great stalactite, and of the city's history back to Old Ylmarr across the Riven Deep.", "A surface-walker, in Zhaelvorn. You came through the old door, then. Few find it; fewer are let through it. Speak, and speak well."));
put("zhael_1", { sex: "m", look: { top: 0x2A2A34, topKind: "shirt", bottom: 0x1A1A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "long", hat: "none", layer: "armor", layerColor: 0x2A2438 } }, gx + 4, gz - 6, face(gx, gz, cx, cz) + Math.PI, udxPersona("Zarith, a blademaster of the Spire Guard", "a disciplined, dry-humoured captain of House Zelvane who trains recruits in the Thornyard and keeps the city gate. You respect skill and honesty and have no patience for boasting. You will happily explain the rules of the city, and tell visitors about the Thornyard's archery butts.", "Halt, and be welcome, in that order. Weapons stay sheathed in Zhaelvorn. Now: what brings a surface-walker down the long stair?"));
var vb = B[0] || { x: cx - 30, z: cz + 48, ry: 0 };
put("zhael_2", { sex: "f", look: DE(0x2A4A6A, 1, 1) }, vb.x, vb.z, vb.ry + Math.PI, udxPersona("Velra, a web-weaver", "a merchant of House Ostrael who weaves cloth from the silk of the giant spiders the city keeps; warm, talkative, a shrewd trader, proud of her craft, with a stall in the Silk Bazaar. You love explaining how spider silk is gathered and woven.", "Silk, friend! Spider silk, finer than anything the surface spins and stronger than steel wire, thread for thread. Come and feel it."));
put("zhael_3", { sex: "m", look: DE(0x3A3A4A, 0, 3) }, cx - 60, cz + 80, 0, udxPersona("Nym, a young scout", "a curious young scout of House Sablethorn who has always wanted to see the surface: the sun, the sky, rain. You ask the visitor lots of questions about the world above and tell them about the tunnels, the lizards of House Sablethorn, the fungus forest and the Thanes' Road to the dwarves of Stonehallow.", "Wait, you're from up there? Is it true the roof is blue? And there's a lamp in it so bright you can't look at it? Tell me everything."), { r: 14, sp: 1.4 });
put("zhael_4", { sex: "m", look: DE(0x2A2A5A, 0, 1) }, sp.x - 3, sp.z + 1, face(sp.x, sp.z, gx, gz), udxPersona("Sorrith, keeper of the Spire library", "a scholarly mage of House Myrrhen who keeps the city's records cut into stone tablets in the Matron Spire, and studies the faerglow, the faint violet light in the rock. Gentle, absent-minded, delighted by questions. You teach the Lore of the Dead at the Duskwell Academy two days a week (the Summon Wraith spell).", "Ah, a visitor. Have you noticed the rock here glows, very faintly? We call it the faerglow. Nobody knows quite what it is. I have theories."));
UDC_HOUSES.forEach(function (H, i) {
if (!H.out)
return;
var o = H.out, f = o.yaw, sx = Math.cos(f), sz = -Math.sin(f);
put("udc_guard_" + H.key, { sex: i % 2 ? "f" : "m", look: { top: H.col & 0x3F3F3F | 0x101010, topKind: "shirt", bottom: 0x1A1A22, skin: [0x4A4660, 0x3E3A52, 0x55506A][i % 3], hair: 0xEDEAF4, hairStyle: "long", hat: "none", layer: "armor", layerColor: 0x2A2438 } }, o.x + sx * 3.4, o.z + sz * 3.4, f + Math.PI, udxPersona("a door guard of " + H.name, "a guard at the doors of " + H.name + " in Zhaelvorn (" + H.trade + "; their Matron is " + H.matron + "; their motto is \"" + H.motto + "\"). " + H.lore + " You are polite, watchful and proud of your House, and you tell visitors that the House's halls are open to guests, though the rooms marked for staff are barred to all but those who serve the House.", "Welcome to the doors of " + H.name + ". " + H.motto + ". Guests may walk the halls; mind the doors marked for the House's own."));
});
B.forEach(function (b, i) {
if (i === 0)
return;
put("udc_bz_" + i, { sex: i % 2 ? "m" : "f", look: DE([0x3A2A5A, 0x2A3A5A, 0x4A2A4A, 0x2A2A3A][i % 4], i % 2 ? 0 : 1, i) }, b.x, b.z, b.ry + Math.PI, udxPersona(b.who + " of the Silk Bazaar", "a " + b.who + " with a stall at " + b.name + " in the Silk Bazaar of Zhaelvorn, a market along the avenue from the city gate to the Court of the Matron Spire. You are friendly to buyers, proud of your wares, and happy to explain how you make them.", "Welcome to " + b.name + ". Look all you like; touch gently."));
});
if (UDC.court)
put("udc_teacher", { sex: "f", look: DE(0x5A2A6A, 1, 2) }, UDC.court.x, UDC.court.z + 1, 0, Object.assign(udxPersona("Mistress Iriel of the Duskwell Academy", "a teacher of the deep arts at the Duskwell Academy (House Myrrhen founded it). You teach Fear and the Dark (the Dread spell) and Soul Drain in the Practice Hall: dark and dangerous fighting magic that works on any foe, beast or dreamer. Each lesson also teaches the real science underneath. Stern, calm, a little unsettling, and welcoming to surface students brave enough to learn.", "The circles are open. Step into one and I will teach you something the stone already knows."), {}));
if (UDC.thorn) {
var T = UDC.thorn, q = T.at(6, -9);
put("udc_captain", { sex: "f", look: { top: 0x3A1A22, topKind: "shirt", bottom: 0x1A1A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "long", hat: "none", layer: "armor", layerColor: 0x2A2438 } }, q[0], q[1], T.ry, udxPersona("Captain Vessa Zelvane", "the captain who runs the Thornyard, training grounds of the Spire Guard; brisk, fair and encouraging, with a laugh like a dropped shield. You invite visitors to try the archery butts, watch the sparring, or see the lizard riders of House Sablethorn on their track. You care most about discipline and looking after each other.", "Visitor! You're standing on my yard, so you may as well train. The butts are by the far wall: shoot from the white line."));
}
var n = UDX.lite ? 8 : 18;
for (var c = 0; c < n; c++) {
var a3 = c / n * 6.283 + 0.4, d3 = 74 + (c % 4) * 16, x6 = cx + Math.cos(a3) * d3, z6 = cz + Math.sin(a3) * d3;
put("udc_c" + c, { sex: c % 2 ? "f" : "m", look: DE([0x3A2A5A, 0x2A3A5A, 0x4A2A4A, 0x2A2A3A, 0x2A4A3A][c % 5], c % 2, c) }, x6, z6, 0, null, { r: 16, sp: 1.1 });
}
},
function (K) {
var pw = K.W / 2 - 2.4;
[0.42, 0.8].forEach(function (t) { K.at("greatpillar", -pw, K.D * t, K.ryIn, { s: Math.min(1, (K.h - 0.2) / 7) }); K.at("greatpillar", pw, K.D * t, K.ryIn, { s: Math.min(1, (K.h - 0.2) / 7) }); });
K.at("counter", -(K.W / 2 - 1.6), K.D * 0.28, K.ryR);
K.at("chair", -(K.W / 2 - 0.7), K.D * 0.28, K.ryR);
K.hang("hallbanner", -3.2, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.rug("redrunner", 0, K.D * 0.5, { s: Math.min(1, (K.D - 1) / 20) });
K.ceil("ironchandelier", 0, K.D * 0.5);
K.at("plant", -(K.W / 2 - 0.9), K.D - 0.9);
K.at("plant", K.W / 2 - 0.9, K.D - 0.9);
K.glow(0, K.D * 0.5, K.h - 1.6, null, 4);
},
function (k) {
var L = UDX_LESSONS[k];
if (!L)
return;
var h = "<div style='font:600 18px var(--serif,Georgia);color:#F0D8FF'>" + esc(L.t) + "</div><div style='opacity:.75;font-size:13px;margin-bottom:8px'>A lesson at the Duskwell Academy, with " + esc(L.who) + "</div>";
L.rows.forEach(function (r) { h += "<p style='margin:6px 0;line-height:1.45'>" + esc(r) + "</p>"; });
var had = udxFlag("lesson_" + k);
if (!had)
udxFlag("lesson_" + k, 1);
var n = Object.keys(UDX_LESSONS).filter(function (q) { return udxFlag("lesson_" + q); }).length;
h += "<div style='margin-top:8px;opacity:.8;font-size:13px'>" + (had ? "You have had this lesson before." : "Lesson learned.") + " Lessons of the Academy: " + n + " of " + Object.keys(UDX_LESSONS).length + ".</div>";
if (n === Object.keys(UDX_LESSONS).length && !udxFlag("lesson_all")) {
udxFlag("lesson_all", 1);
h += "<div style='margin-top:6px;color:#E8B8F8'>Every lesson of the Duskwell Academy learned. Mistress Iriel nods: 'Come back and teach, one day.'</div>";
}
worldCard(h, {});
udxTone(520, 0.4);
},
function (x, z, feet) {
var ox = x - UDC.cx, oz = z - UDC.cz;
if (ox * ox + oz * oz > 250 * 250)
return false;
for (var i = 0; i < UDC.cols.length; i++) {
var C = UDC.cols[i];
if (!(C.foot > 1.2) || C.y0 > feet + 2)
continue;
var dx = x - C.x, dz = z - C.z, d2 = dx * dx + dz * dz, big = C.foot * 1.32 + 1;
if (d2 > big * big)
continue;
var y = Math.max(C.y0 + 0.15, Math.min(C.jy, feet + 0.3)), r = udcColR(C, y, Math.atan2(dz, dx)) + 0.32;
if (d2 < r * r)
return true;
}
return false;
},
function (sig, col) {
var k = sig + "|" + col;
if (UDS.tex[k])
return UDS.tex[k];
var hex = udsHex(col), si = udcSigil(sig, col).image;
var t = wTex(512, 512, function (x, W, H) {
var c = W / 2;
x.clearRect(0, 0, W, H);
x.strokeStyle = hex;
x.fillStyle = hex;
x.globalAlpha = 0.9;
[250, 236, 170, 160].forEach(function (r, i) { x.lineWidth = i % 2 ? 3 : 7; x.beginPath(); x.arc(c, c, r, 0, 7); x.stroke(); });
for (var i = 0; i < 32; i++) {
var a = i / 32 * Math.PI * 2, r0 = i % 2 ? 172 : 186;
x.lineWidth = i % 4 ? 2 : 4;
x.beginPath();
x.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
x.lineTo(c + Math.cos(a) * 234, c + Math.sin(a) * 234);
x.stroke();
}
for (var j = 0; j < 8; j++) {
var b = j / 8 * Math.PI * 2;
x.beginPath();
x.moveTo(c + Math.cos(b) * 160, c + Math.sin(b) * 160);
x.lineTo(c + Math.cos(b + 0.2) * 120, c + Math.sin(b + 0.2) * 120);
x.lineTo(c + Math.cos(b) * 70, c + Math.sin(b) * 70);
x.lineTo(c + Math.cos(b - 0.2) * 120, c + Math.sin(b - 0.2) * 120);
x.closePath();
x.globalAlpha = 0.35;
x.fill();
x.globalAlpha = 0.9;
}
x.globalAlpha = 1;
try {
x.drawImage(si, 14, 30, 100, 150, c - 60, c - 90, 120, 180);
}
catch (e) { }
});
return (UDS.tex[k] = t);
},
function (A, ox, oz, y, ang, parts, th) {
var phi = Math.atan2(Math.cos(ang), Math.sin(ang)), c = Math.cos(phi), s = Math.sin(phi);
var cx = ox + Math.cos(ang) * parts.R0, cz = oz + Math.sin(ang) * parts.R0;
var g = new THREE.Group();
g.position.set(cx, 0, cz);
g.rotation.y = phi;
A.g.add(g);
var X = { g: g, rects: [], solids: [], talk: [], locks: [], people: [] }, P = udxPlan(X, 0, 0, y);
parts.rooms.forEach(function (r) { r.R = udxRoom(P, { x0: r.x0, x1: r.x1, z0: r.z0, z1: r.z1, h: r.h, wall: r.wall || th.wall, floor: r.floor || th.floor, ceil: th.ceil, trim: th.trim, name: r.n, beams: r.beams }); });
parts.doors.forEach(function (d) { udxDoor(P, d.x, d.z, "x", d.w, { h: d.h, lock: d.lock, lockName: d.lockName, frame: th.trim }); });
udxRaise(P);
var W = function (lx, lz) { return [cx + lx * c + lz * s, cz - lx * s + lz * c]; };
parts.rooms.forEach(function (r) {
if (r.t) {
var K = udxKit(X, { x0: r.x0, x1: r.x1, z0: r.z0, z1: r.z1, h: r.h }, y, "n", th);
try {
(UDX_KITS[r.t] || UDX_KITS.hall)(K);
}
catch (e) {
if (window.console)
console.warn("[underdark-spires] kit", r.t, e);
}
}
if (r.fn)
X.talk.push({ x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2, r: Math.min(4, (r.x1 - r.x0) / 2), name: r.n, verb: r.verb || "look round", fn: r.fn });
var m = W((r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2);
r.c = { x: m[0], z: m[1], ry: Math.atan2(-Math.cos(ang), -Math.sin(ang)) };
});
X.solids.forEach(function (q) { var p = W(q.x, q.z); q.x = p[0]; q.z = p[1]; if (q.r === undefined)
q.rot = (q.rot || 0) + phi; A.solids.push(q); });
X.talk.forEach(function (T) { if (!T.p) {
var p = W(T.x, T.z);
T.x = p[0];
T.z = p[1];
} A.talk.push(T); });
X.locks.forEach(function (k) { A.locks.push(k); });
var wing = { cx: cx, cz: cz, c: c, s: s, rects: X.rects, W: W, ang: ang, parts: parts };
A.wings.push(wing);
return wing;
},
function (A, o, F) {
var Gp = A.g, ox = F.ox, oz = F.oz, y = F.y, R = F.R, H = F.H, th = o.th, lite = UDX.lite, col = o.col || th.glow || 0xB890FF;
var gaps = [];
F.rooms.forEach(function (r) {
var parts = { R0: R + 0.25, rooms: [{ x0: -r.w / 2, x1: r.w / 2, z0: 0, z1: r.d, h: r.h, n: r.n, t: r.t, fn: r.fn, verb: r.verb, wall: r.wall, floor: r.floor }], doors: [{ x: 0, z: 0, w: r.dw || 2.0, h: Math.min(2.9, r.h - 0.4), lock: r.lock, lockName: r.lockName }] };
r.wing = udsWing(A, ox, oz, y, r.ang, parts, th);
r.c = parts.rooms[0].c;
gaps.push({ a: r.ang, hw: ((r.dw || 2.0) / 2 + 0.08) / R, dh: Math.min(2.9, r.h - 0.4), n: r.n });
});
var G = F.grand, cw = Math.min(2 * (R + 0.3) * Math.tan(F.step / 2) - 0.7, o.wayW || 5), hc = Math.min(H - 1, o.wayH || 6.5);
var gp = { R0: R + 0.25, rooms: [{ x0: -cw / 2, x1: cw / 2, z0: 0, z1: G.Lc, h: hc, n: o.wayName || ("the processional way of " + o.name), t: "procession" },
{ x0: -G.w / 2, x1: G.w / 2, z0: G.Lc, z1: G.Lc + G.d, h: G.h, n: G.n, t: G.t, fn: G.fn, verb: G.verb }],
doors: [{ x: 0, z: 0, w: cw - 0.8, h: hc - 0.7 }, { x: 0, z: G.Lc, w: Math.min(cw - 0.8, 3.6), h: Math.min(hc - 0.7, 4.6), lock: G.lock, lockName: G.lockName }] };
G.wing = udsWing(A, ox, oz, y, F.gA, gp, th);
G.c = gp.rooms[1].c;
G.way = gp.rooms[0].c;
gaps.push({ a: F.gA, hw: ((cw - 0.8) / 2 + 0.08) / R, dh: hc - 0.7, n: G.n, big: 1 });
var fl = new THREE.Mesh(new THREE.CircleGeometry(R, lite ? 40 : 64), th.hallFloor || th.floor);
metreUVs(fl.geometry, "pln", [2 * R, 2 * R]);
fl.rotation.x = -Math.PI / 2;
fl.position.set(ox, y + 0.01, oz);
Gp.add(fl);
if (o.sig) {
var inl = new THREE.Mesh(new THREE.CircleGeometry(R * 0.62, lite ? 36 : 56), new THREE.MeshBasicMaterial({ map: udsInlay(o.sig, col), transparent: true, opacity: 0.8, depthWrite: false }));
inl.rotation.x = -Math.PI / 2;
inl.rotation.z = -Math.PI / 2;
inl.position.set(ox, y + 0.025, oz);
inl.userData.keep = 1;
Gp.add(inl);
}
gaps.sort(function (p, q) { return ((p.a % 6.2832) + 6.2832) % 6.2832 - ((q.a % 6.2832) + 6.2832) % 6.2832; });
var norm = function (a) { a = a % 6.2832; return a < 0 ? a + 6.2832 : a; }, T = 0.5;
for (var i = 0; i < gaps.length; i++) {
var g0 = gaps[i], g1 = gaps[(i + 1) % gaps.length], a0 = norm(g0.a) + g0.hw, a1 = norm(g1.a) - g1.hw;
if (a1 <= a0)
a1 += 6.2832;
var n = Math.max(1, Math.ceil((a1 - a0) * R / 1.4)), da = (a1 - a0) / n;
for (var j = 0; j < n; j++) {
var am = a0 + da * (j + 0.5), L = 2 * R * Math.sin(da / 2) + 0.06;
var wb = udxBox(L, H, T, th.wall, ox + Math.cos(am) * R, y + H / 2, oz + Math.sin(am) * R, Gp, -am - Math.PI / 2);
if (th.trim && !lite) {
udxBox(L, 0.18, 0.08, th.trim, ox + Math.cos(am) * (R - T / 2 - 0.03), y + 0.09, oz + Math.sin(am) * (R - T / 2 - 0.03), Gp, -am - Math.PI / 2);
}
}
}
gaps.forEach(function (gq) {
var L = 2 * R * Math.sin(gq.hw) + 0.1, hh = H - gq.dh;
if (hh < 0.05)
return;
udxBox(L, hh, T, th.wall, ox + Math.cos(gq.a) * R, y + gq.dh + hh / 2, oz + Math.sin(gq.a) * R, Gp, -gq.a - Math.PI / 2);
var sr = R - T / 2 - 0.06;
udxSign(Gp, [gq.n], gq.big ? 3.2 : 2.1, gq.big ? 0.6 : 0.44, ox + Math.cos(gq.a) * sr, y + gq.dh + (gq.big ? 0.6 : 0.42), oz + Math.sin(gq.a) * sr, Math.atan2(-Math.cos(gq.a), -Math.sin(gq.a)), th.signBg, th.signFg);
});
var balc = H >= 12 ? [H * 0.42, H * 0.7] : (H >= 9 ? [H * 0.55] : []), rail = th.trim || udxMat(0x8A7AA0, "metal"), led = udxMat(0x2A2632, "stone", { ds: 1 }), dark = udxMat(0x0E0A14, null, { basic: 1 });
balc.forEach(function (hb, bi) {
var ring = new THREE.Mesh(new THREE.RingGeometry(R - 2.4, R - 0.2, lite ? 40 : 64, 1), led);
ring.rotation.x = -Math.PI / 2;
ring.position.set(ox, y + hb, oz);
Gp.add(ring);
var lip = new THREE.Mesh(new THREE.CylinderGeometry(R - 2.4, R - 2.4, 0.35, lite ? 40 : 64, 1, true), udxMat(0x2A2632, "stone", { ds: 1 }));
lip.position.set(ox, y + hb - 0.17, oz);
Gp.add(lip);
var tr = new THREE.Mesh(new THREE.TorusGeometry(R - 2.45, 0.06, 5, lite ? 40 : 72), rail);
tr.rotation.x = Math.PI / 2;
tr.position.set(ox, y + hb + 1.05, oz);
Gp.add(tr);
var np = lite ? 18 : 36;
for (var p = 0; p < np; p++) {
var pa = p / np * Math.PI * 2;
udxCyl(0.04, 0.04, 1.05, rail, ox + Math.cos(pa) * (R - 2.45), y + hb + 0.52, oz + Math.sin(pa) * (R - 2.45), Gp, 5);
}
var gl = new THREE.Mesh(new THREE.TorusGeometry(R - 2.4, 0.12, 4, lite ? 40 : 72), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5, depthWrite: false }));
gl.rotation.x = Math.PI / 2;
gl.position.set(ox, y + hb - 0.3, oz);
gl.userData.keep = 1;
Gp.add(gl);
UDX.anim.push({ fn: function (dt, now) { if (gl.parent && gl.parent.visible !== false)
gl.material.opacity = 0.38 + 0.14 * Math.sin(now * 0.45 + bi); } });
var nd = Math.max(6, Math.round(F.rooms.length + 2));
for (var d = 0; d < nd; d++) {
var da2 = d / nd * Math.PI * 2 + F.step * 0.5 + bi * 0.3, dr = R - T / 2 - 0.04;
var dp = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.6), dark);
dp.position.set(ox + Math.cos(da2) * dr, y + hb + 1.3, oz + Math.sin(da2) * dr);
dp.rotation.y = Math.atan2(-Math.cos(da2), -Math.sin(da2));
Gp.add(dp);
if (!lite || d % 2 === 0)
udxGlow(Gp, col, 1.2, 0.4, ox + Math.cos(da2) * (dr - 0.3), y + hb + 2.9, oz + Math.sin(da2) * (dr - 0.3));
}
});
var dome = new THREE.Mesh(new THREE.SphereGeometry(R, lite ? 28 : 44, lite ? 8 : 12, 0, Math.PI * 2, 0, Math.PI / 2), udxBack(th.ceil || th.wall));
dome.scale.y = Math.min(1, (o.domeH || R * 0.45) / R);
dome.position.set(ox, y + H - 0.02, oz);
Gp.add(dome);
var oc = new THREE.Mesh(new THREE.CircleGeometry(R * 0.2, 24), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide }));
oc.rotation.x = Math.PI / 2;
oc.position.set(ox, y + H + (o.domeH || R * 0.45) - 0.3, oz);
oc.userData.keep = 1;
Gp.add(oc);
udxGlow(Gp, col, R * 0.5, 0.32, ox, y + H * 0.82, oz);
var bm = o.sig ? udsBanner(o.sig, col) : null;
for (var b = 0; b < gaps.length; b++) {
var q0 = norm(gaps[b].a), q1 = norm(gaps[(b + 1) % gaps.length].a);
if (q1 <= q0)
q1 += 6.2832;
var am2 = (q0 + q1) / 2, br = R - T / 2 - 0.05;
if (Math.abs(Math.atan2(Math.sin(am2 - Math.PI), Math.cos(am2 - Math.PI))) < 0.15)
continue;
if (bm) {
var bh = Math.min(5.2, (balc[0] || H) - 1.6), bn = new THREE.Mesh(new THREE.PlaneGeometry(1.7, bh), bm);
bn.position.set(ox + Math.cos(am2) * br, y + 1.2 + bh / 2, oz + Math.sin(am2) * br);
bn.rotation.y = Math.atan2(-Math.cos(am2), -Math.sin(am2));
Gp.add(bn);
}
[-1, 1].forEach(function (sd) { var la = am2 + sd * 1.25 / R; udxGlow(Gp, th.glow || col, 1.4, 0.5, ox + Math.cos(la) * (br - 0.35), y + 3.2, oz + Math.sin(la) * (br - 0.35)); });
}
var xr = R - T / 2 - 0.05, xx = ox - xr;
udxBox(0.16, 4.4, 3.2, udxMat(0x1A1420, "wood"), xx + 0.08, y + 2.2, oz, Gp);
udxBox(0.24, 4.8, 0.3, th.trim || udxMat(0x3A2E26, "wood"), xx + 0.12, y + 2.4, oz - 1.75, Gp);
udxBox(0.24, 4.8, 0.3, th.trim || udxMat(0x3A2E26, "wood"), xx + 0.12, y + 2.4, oz + 1.75, Gp);
udxBox(0.24, 0.3, 3.8, th.trim || udxMat(0x3A2E26, "wood"), xx + 0.12, y + 4.8, oz, Gp);
udxGlow(Gp, 0xFFC890, 2.4, 0.45, xx + 0.6, y + 5.2, oz);
udxSign(Gp, [o.outName || "The doors out", o.name], 2.8, 0.6, xx + 0.2, y + 5.6, oz, Math.PI / 2, th.signBg, th.signFg);
if (o.out)
udxTalk(A, { x: xx + 1.4, z: oz, r: 2.6, name: o.outName || "The doors out", verb: "go out", fn: function () { var r = (o.out.dyn && UDX.ret) || o.out; udxGo(o.out.area || "cavern", r.x, r.z, r.yaw, o.out.msg); } });
if (o.stairs && o.stairs.length) {
var sa = Math.PI - F.step * 0.5, sp = F.rot(sa, R - 3.6);
udsSpiral(A, sp[0], sp[1], y, Math.min(H - 1, balc[0] || H - 1), th, col);
var sq = F.rot(sa, R - 3.6 - 3.2);
udxStairs(A, sq[0], sq[1], o.stairName || "The great stair", o.stairs);
}
if (o.centre)
try {
o.centre(A, F, th, col);
}
catch (e) {
if (window.console)
console.warn("[underdark-spires] centre", o.key, e);
}
if (o.after)
try {
o.after(A, F);
}
catch (e) {
if (window.console)
console.warn("[underdark-spires] people", o.key, e);
}
},
function (A, x, z, y, top, th, col) {
var G = A.g, st = th.stair || udxMat(0x3A3440, "stone"), n = Math.max(10, Math.round(top / 0.32)), lite = UDX.lite;
udxCyl(0.55, 0.65, top + 1.2, th.trim || st, x, y + (top + 1.2) / 2, z, G, lite ? 8 : 14);
for (var i = 0; i < n; i++) {
var a = i * 0.42, hy = (i + 1) * top / n, s = udxBox(1.9, 0.16, 0.9, st, x + Math.cos(a) * 1.4, y + hy - 0.08, z + Math.sin(a) * 1.4, G, -a);
if (!lite && i % 3 === 0)
udxCyl(0.03, 0.03, 1, th.trim || st, x + Math.cos(a) * 2.3, y + hy + 0.5, z + Math.sin(a) * 2.3, G, 4);
}
udxGlow(G, col, 1.6, 0.45, x, y + top + 1.6, z);
udxSolidR(A, x, z, 2.45);
},
function (K) {
K.at("cavepool", 0, K.D * 0.5, K.ryIn, { s: 0.7 });
K.wall("crystalcluster", 0, { s: 1.4 });
K.at("crystals", -(K.W / 2 - 1.4), K.D * 0.25);
K.at("crystalcluster", K.W / 2 - 1.4, K.D * 0.25);
K.at("crystalcluster", -(K.W / 2 - 1.4), K.D * 0.72);
K.at("crystals", K.W / 2 - 1.4, K.D * 0.72);
K.left("benchin", K.D * 0.5);
K.right("benchin", K.D * 0.5);
K.glow(0, K.D * 0.5, 1.4, 0x9AF0FF, 4);
K.glow(-K.W / 2 + 1.4, K.D * 0.25, 1.2, 0xE070E0, 2.6);
K.glow(K.W / 2 - 1.4, K.D * 0.72, 1.2, 0x8A70FF, 2.6);
},
function (K) {
K.wall("counter", -2.4);
K.wall("counter", 0);
K.wall("counter", 2.4);
K.at("weighscale", -1.2, 0.6, K.ryIn, { y: 1, solid: false });
K.at("weighscale", 1.2, 0.6, K.ryIn, { y: 1, solid: false });
K.left("displaycase", K.D * 0.35);
K.left("trcrates", K.D * 0.7);
K.right("noticeboard", K.D * 0.4, { y: 1, solid: false });
K.right("treasurechest", K.D * 0.7);
K.at("sg_qf_tableroundsmall_walnut", -1.6, K.D * 0.62);
K.at("sg_qf_tableroundsmall_walnut", 1.6, K.D * 0.62);
[-2.4, -0.8, 0.8, 2.4].forEach(function (a) { K.at("chair", a, K.D * 0.62 + 0.9, K.ryIn); });
K.hang("trwallmap", 0, 1.6, { s: 0.9 });
K.glow(0, K.D * 0.5, K.h - 1, 0xFFD890, 3);
},
function (K) {
K.wall("trsaddles", -1.4);
K.wall("trsaddles", 1.4);
K.at("workbench", 0, K.D * 0.5);
K.left("trtoolwall", K.D * 0.4, { solid: false });
K.left("barrel", K.D * 0.75);
K.right("pelt", K.D * 0.35, { solid: false });
K.right("shelfgoods", K.D * 0.7);
K.at("lantern", 0.6, K.D * 0.5, K.ryIn, { y: 0.95, solid: false });
K.glow(0, K.D * 0.5, K.h - 1, 0xFFC870);
},
function (K) {
K.wall("goldstatue", 0, { s: 0.7 });
K.runL("armourstand", Math.max(1, Math.floor((K.D - 2) / 1.6)));
K.runR("weaponrack", Math.max(1, Math.floor((K.D - 2) / 2.3)));
K.at("displaycase", 0, K.D * 0.55);
K.hang("hallbanner", -2.4, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.hang("hallbanner", 2.4, 0.2, { s: Math.min(1, (K.h - 0.4) / 4.2) });
K.glow(0, 1.6, K.h - 1, 0xFFC870, 3);
},
function (K) {
K.wall("workbench", -1.6);
K.wall("workbench", 1.6);
K.at("lamp", -1.6, 0.5, K.ryIn, { y: 0.95, solid: false });
K.left("trtoolwall", K.D * 0.45, { solid: false });
K.right("mapchest", K.D * 0.45);
K.at("trplinth", 0, K.D * 0.6);
K.at("chair", -1.6, 1.5, K.ryOut);
K.at("chair", 1.6, 1.5, K.ryOut);
K.glow(0, 1.2, 2.4, 0xE8E8F8);
},
function (K) {
K.wall("workbench", -1.4);
K.wall("shelfgoods", 1.6);
for (var i = 0; i < 4; i++)
K.at("lantern", -2 + i * 1.3, K.D * 0.55, K.ryIn, { y: 0.95, solid: false });
K.at("table", 0, K.D * 0.55);
K.left("displaycase", K.D * 0.5);
K.right("crates", K.D * 0.5);
for (var j = 0; j < 3; j++)
K.glow(-1.6 + j * 1.6, K.D * 0.55, 1.4, [0xC8A8FF, 0x9AF0E0, 0xFFD890][j], 1.6);
},
function (K) {
var A = K.A, cap = udxMat(0x6AE8D8, null, { basic: 1 }), cap2 = udxMat(0xC890F0, null, { basic: 1 }), stem = udxMat(0xD8D0C0);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 3; c++) {
var p = K.pt((c - 1) * (K.W / 3.4), 1.6 + r * (K.D - 3) / 2), s = 0.6 + ((r * 3 + c) % 3) * 0.35;
udxCyl(0.08 * s, 0.12 * s, 1.1 * s, stem, p[0], K.y + 0.55 * s, p[1], A.g, 6);
var m = new THREE.Mesh(new THREE.SphereGeometry(0.7 * s, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), (r + c) % 2 ? cap : cap2);
m.position.set(p[0], K.y + 1.1 * s, p[1]);
A.g.add(m);
udxSolidR(A, p[0], p[1], 0.3);
}
K.left("trsacks", K.D * 0.5);
K.right("barrel", K.D * 0.5);
K.glow(0, K.D * 0.5, 1.2, 0x6AE8D8, 4);
},
function (K) {
var p = K.pt(0, K.D * 0.5), A = K.A;
var t = udxCyl(3.6, 3.8, 0.9, udxMat(0x8A9AA8, "metal"), p[0], K.y + 0.45, p[1], A.g, 40);
var top = new THREE.Mesh(new THREE.CircleGeometry(3.5, 48), new THREE.MeshBasicMaterial({ map: udsChartTex() }));
top.rotation.x = -Math.PI / 2;
top.position.set(p[0], K.y + 0.92, p[1]);
A.g.add(top);
udxSolidR(A, p[0], p[1], 3.7);
var ar = new THREE.Group();
ar.position.set(p[0], K.y + 3.4, p[1]);
ar.userData.keep = 1;
A.g.add(ar);
var brass = udxMat(0xC8A050, "metal");
[0, 1, 2].forEach(function (i) { var tr = new THREE.Mesh(new THREE.TorusGeometry(1.6 - i * 0.3, 0.05, 6, 40), brass); tr.rotation.set(i * 0.9, i * 0.6, 0); ar.add(tr); });
UDX.anim.push({ fn: function (dt) { if (ar.parent && ar.parent.visible !== false)
ar.rotation.y += dt * 0.08; } });
K.runW("mapchest", Math.min(4, udxFit(K, "mapchest", 0.6)));
K.runL("esbookcase", Math.max(1, Math.floor((K.D - 2) / 1.9)));
K.runR("esbookcase", Math.max(1, Math.floor((K.D - 2) / 1.9)));
K.at("lectern", -K.W / 4, K.D * 0.82);
K.at("lectern", K.W / 4, K.D * 0.82);
K.glow(0, K.D * 0.5, K.h - 1, 0xC8F0E8, 5);
},
function (K) {
var n = Math.max(2, Math.floor((K.D - 4) / 2.2));
for (var i = 0; i < n; i++) {
K.at("loom", -K.W / 2 + 2.2, 2 + i * 2.2, K.ryR);
K.at("loom", K.W / 2 - 2.2, 2 + i * 2.2, K.ryL);
}
K.wall("shelfgoods", -2);
K.wall("shelfgoods", 2);
var p = K.pt(0, K.D * 0.5);
udsWeb(K.A.g, p[0], K.y + K.h - 1.2, p[1], Math.min(K.W, K.D) * 0.42, 0xC8D8FF);
K.glow(0, K.D * 0.5, K.h - 1.6, 0x9AB8FF, 5);
},
function () {
if (UDS.tex.chart)
return UDS.tex.chart;
return (UDS.tex.chart = wTex(512, 512, function (x, W, H) {
var c = W / 2, R = wRand(9071);
x.fillStyle = "#2A3A40";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8E8E0";
x.lineWidth = 3;
x.beginPath();
x.arc(c, c, 240, 0, 7);
x.stroke();
for (var i = 0; i < 26; i++) {
x.beginPath();
var px = c + (R() - 0.5) * 380, pz = c + (R() - 0.5) * 380;
x.moveTo(px, pz);
for (var k = 0; k < 5; k++) {
px += (R() - 0.5) * 120;
pz += (R() - 0.5) * 120;
x.lineTo(px, pz);
}
x.lineWidth = 1 + R() * 3;
x.stroke();
}
x.fillStyle = "#E8C870";
for (var j = 0; j < 14; j++) {
x.beginPath();
x.arc(c + (R() - 0.5) * 380, c + (R() - 0.5) * 380, 4 + R() * 7, 0, 7);
x.fill();
}
x.font = "bold 22px Georgia";
x.textAlign = "center";
x.fillText("ZHAELVORN", c, c - 6);
x.font = "16px Georgia";
x.fillText("Stonehallow ↓", c + 60, c + 170);
x.fillText("Glimmerdeep →", c + 150, c + 40);
x.fillText("the Sunless Sea", c + 150, c - 120);
}));
},
function (G, x, y, z, r, col) {
var pts = [], sp = 12;
for (var i = 0; i < sp; i++) {
var a = i / sp * Math.PI * 2;
pts.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x + Math.cos(a) * r, y - 0.4, z + Math.sin(a) * r));
}
var turns = 7, n = turns * sp;
for (var k = 0; k < n; k++) {
var a0 = k / sp * Math.PI * 2, a1 = (k + 1) / sp * Math.PI * 2, r0 = r * (0.12 + 0.86 * k / n), r1 = r * (0.12 + 0.86 * (k + 1) / n);
pts.push(new THREE.Vector3(x + Math.cos(a0) * r0, y - 0.4 * r0 / r, z + Math.sin(a0) * r0), new THREE.Vector3(x + Math.cos(a1) * r1, y - 0.4 * r1 / r, z + Math.sin(a1) * r1));
}
var l = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.6 }));
G.add(l);
return l;
},
function (A, x, y, z, s, col) {
var G = A.g, pool = new THREE.Mesh(new THREE.CircleGeometry(3.2 * s, 40), udxMat(0x2A1A4A, null, { e: col, ei: 0.35 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(x, y + 0.05, z);
G.add(pool);
var rim = new THREE.Mesh(new THREE.TorusGeometry(3.3 * s, 0.25 * s, 6, 40), udxMat(0x3A3448, "stone"));
rim.rotation.x = Math.PI / 2;
rim.position.set(x, y + 0.2, z);
G.add(rim);
var cr = new THREE.Mesh(new THREE.OctahedronGeometry(1.4 * s, 0), new THREE.MeshLambertMaterial({ color: col, emissive: col, emissiveIntensity: 0.55, transparent: true, opacity: 0.88 }));
cr.scale.set(0.8, 1.7, 0.8);
cr.position.set(x, y + 3.6 * s, z);
cr.userData.keep = 1;
G.add(cr);
var small = [];
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, c2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.35 * s, 0), cr.material);
c2.scale.set(0.7, 1.5, 0.7);
c2.position.set(x + Math.cos(a) * 2 * s, y + 3.6 * s, z + Math.sin(a) * 2 * s);
c2.userData.keep = 1;
G.add(c2);
small.push(c2);
}
udxGlow(G, col, 6 * s, 0.5, x, y + 3.6 * s, z);
UDX.anim.push({ fn: function (dt, now) {
if (!cr.parent || cr.parent.visible === false)
return;
cr.rotation.y += dt * 0.12;
cr.position.y = y + 3.6 * s + Math.sin(now * 0.4) * 0.15;
small.forEach(function (m, i) { var a = i / 6 * Math.PI * 2 + now * 0.06; m.position.set(x + Math.cos(a) * 2 * s, y + 3.6 * s + Math.sin(now * 0.5 + i) * 0.2, z + Math.sin(a) * 2 * s); m.rotation.y = -a; });
} });
udxSolidR(A, x, z, 3.4 * s);
},
function (G, x, y, z, ry, s, mat, eye) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
g.scale.setScalar(s);
G.add(g);
udxCyl(1.2, 1.5, 0.6, udxMat(0x2E2A36, "stone"), 0, 0.3, 0, g, 16);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), mat);
body.scale.set(0.8, 0.7, 2);
body.position.set(0, 1.6, 0);
g.add(body);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8), mat);
head.scale.set(0.9, 0.7, 1.4);
head.position.set(0, 1.9, 1.55);
g.add(head);
[-0.18, 0.18].forEach(function (ex) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), new THREE.MeshBasicMaterial({ color: eye || 0x6AD86A })); e.position.set(ex, 2.02, 1.95); g.add(e); });
var tail = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.6, 10), mat);
tail.rotation.x = -Math.PI / 2 - 0.25;
tail.position.set(0, 1.25, -2.4);
g.add(tail);
[[-1, 0.8], [1, 0.8], [-1, -0.8], [1, -0.8]].forEach(function (q) { var l = udxCyl(0.13, 0.1, 1.3, mat, q[0] * 0.75, 1.0, q[1], g, 6); l.rotation.z = q[0] * 0.8; });
return g;
},
function (G, x, y, z, ry, h, mat, gold) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
udxBox(0.5, h, 0.08, mat, 0, h / 2 + 0.3, 0, g);
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.6, 4), mat);
tip.rotation.y = Math.PI / 4;
tip.position.y = 0.3;
tip.scale.z = 0.25;
g.add(tip);
udxBox(1.8, 0.22, 0.3, gold, 0, h + 0.4, 0, g);
udxCyl(0.1, 0.1, 1.1, udxMat(0x3A1A1E, "wood"), 0, h + 1, 0, g, 6);
var pm = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), gold);
pm.position.y = h + 1.6;
g.add(pm);
return g;
},
function (A, F, th, col) {
var G = A.g, x = F.ox, z = F.oz, y = F.y;
udxCyl(7.4, 7.8, 0.4, udxMat(0x2A2638, "marble"), x, y + 0.2, z, G, 48);
udxCyl(5.6, 5.9, 0.35, udxMat(0x3A3450, "marble"), x, y + 0.55, z, G, 40);
udxF(A, "firebowl", x, y + 0.72, z, 0, { s: 1.4 });
udxGlow(G, 0xB890FF, 4.2, 0.6, x, y + 2.4, z);
UDC_HOUSES.forEach(function (H, i) {
var a = i / 7 * Math.PI * 2, tx = x + Math.cos(a) * 4.6, tz = z + Math.sin(a) * 4.6;
udxF(A, "throneseat", tx, y + 0.72, tz, Math.atan2(x - tx, z - tz), { s: 0.8 });
var bn = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 3), udsBanner(H.sig, H.col));
bn.position.set(x + Math.cos(a) * 6.6, y + 2.6, z + Math.sin(a) * 6.6);
bn.rotation.y = Math.atan2(x - bn.position.x, z - bn.position.z);
G.add(bn);
udxCyl(0.06, 0.06, 4.4, th.trim, x + Math.cos(a) * 6.7, y + 2.2, z + Math.sin(a) * 6.7, G, 5);
});
udxSolidR(A, x, z, 6.2);
},
function (A, F, th, col) {
var G = A.g, x = F.ox, z = F.oz, y = F.y;
for (var s = 0; s < 3; s++)
udxCyl(4.6 - s * 1.1, 4.8 - s * 1.1, 0.35, udxMat(0x3A3450, "marble"), x, y + 0.18 + s * 0.35, z, G, 40);
var ob = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 1.1, 7, 4, 1), udxMat(0x1A1424, "marble", { e: 0x2A1A4A, ei: 0.4 }));
ob.rotation.y = Math.PI / 4;
ob.position.set(x, y + 1.05 + 3.5, z);
G.add(ob);
var cap = new THREE.Mesh(new THREE.ConeGeometry(0.78, 0.9, 4), udxMat(0xC8C0E8, "metal"));
cap.rotation.y = Math.PI / 4;
cap.position.set(x, y + 8.5, z);
G.add(cap);
[0, 1, 2, 3].forEach(function (i) {
var a = i * Math.PI / 2;
var r = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.05, 4, 32), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5, depthWrite: false }));
r.rotation.x = Math.PI / 2;
r.position.set(x, y + 2 + i * 1.6, z);
r.userData.keep = 1;
G.add(r);
UDX.anim.push({ fn: function (dt, now) { if (r.parent && r.parent.visible !== false)
r.material.opacity = 0.3 + 0.18 * Math.sin(now * 0.4 + i); } });
});
udxF(A, "weighscale", x + 3.2, y + 0.7, z, -Math.PI / 2, { s: 1.6, solid: false });
udxGlow(G, col, 5, 0.45, x, y + 5, z);
udxSolidR(A, x, z, 3.6);
},
function (A, F, th, col) {
var G = A.g, x = F.ox, z = F.oz, y = F.y;
udxCyl(4.2, 4.4, 0.3, udxMat(0x26304A, "wood"), x, y + 0.15, z, G, 36);
udxF(A, "loom", x, y + 0.3, z - 1.2, 0, { s: 1.8 });
udxF(A, "loom", x, y + 0.3, z + 1.6, Math.PI, { s: 1.8 });
udsWeb(G, x, y + F.H * 0.62, z, F.R * 0.85, 0xC8D8FF);
udsWeb(G, x, y + F.H * 0.4, z, F.R * 0.5, 0x9AB8FF);
var silk = udxMat(0x8AB0E8, null, { basic: 1, op: 0.28, ds: 1 });
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2 + 0.2, dr = new THREE.Mesh(new THREE.PlaneGeometry(2.2, F.H * 0.5), silk);
dr.position.set(x + Math.cos(a) * (F.R - 1.2), y + F.H * 0.62, z + Math.sin(a) * (F.R - 1.2));
dr.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
dr.userData.keep = 1;
G.add(dr);
UDX.anim.push({ fn: (function (m, k) { return function (dt, now) { if (m.parent && m.parent.visible !== false)
m.rotation.z = Math.sin(now * 0.3 + k) * 0.04; }; })(dr, i) });
}
udxGlow(G, 0x9AB8FF, 5, 0.4, x, y + F.H * 0.6, z);
udxSolidR(A, x, z, 3.9);
},
function (A, F, th, col) {
var G = A.g, x = F.ox, z = F.oz, y = F.y, steel = udxMat(0xB8C0C8, "metal"), gold = udxMat(0xC89A40, "metal");
var fl = new THREE.Mesh(new THREE.CircleGeometry(5.8, 40), udxMat(0x6A5038, "wood"));
fl.rotation.x = -Math.PI / 2;
fl.position.set(x, y + 0.04, z);
G.add(fl);
var rope = new THREE.Mesh(new THREE.TorusGeometry(5.8, 0.05, 4, 48), udxMat(0xB83A4A));
rope.rotation.x = Math.PI / 2;
rope.position.set(x, y + 1, z);
G.add(rope);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, bx = x + Math.cos(a) * 7, bz = z + Math.sin(a) * 7;
udsBlade(G, bx, y, bz, -a, 4.2, steel, gold);
udxSolidR(A, bx, bz, 0.5);
udxGlow(G, 0xE05A6A, 1.6, 0.4, bx, y + 5.2, bz);
}
udxF(A, "weaponrack", x - 3.6, y, z + 4.4, Math.PI);
udxF(A, "armourstand", x + 3.6, y, z + 4.4, Math.PI);
},
function (A, F, th, col) {
var p = [F.ox, F.oz], t = udxCyl(4.2, 4.4, 0.95, udxMat(0x8A9AA8, "metal"), p[0], F.y + 0.48, p[1], A.g, 48);
var top = new THREE.Mesh(new THREE.CircleGeometry(4.1, 56), new THREE.MeshBasicMaterial({ map: udsChartTex() }));
top.rotation.x = -Math.PI / 2;
top.position.set(p[0], F.y + 0.97, p[1]);
A.g.add(top);
var ar = new THREE.Group();
ar.position.set(p[0], F.y + 4, p[1]);
ar.userData.keep = 1;
A.g.add(ar);
var brass = udxMat(0xC8A050, "metal");
[0, 1, 2, 3].forEach(function (i) { var tr = new THREE.Mesh(new THREE.TorusGeometry(2.2 - i * 0.35, 0.06, 6, 48), brass); tr.rotation.set(i * 0.8, i * 0.5, 0); ar.add(tr); });
UDX.anim.push({ fn: function (dt) { if (ar.parent && ar.parent.visible !== false) {
ar.rotation.y += dt * 0.06;
ar.children.forEach(function (c, i) { c.rotation.x += dt * 0.03 * (i % 2 ? 1 : -1); });
} } });
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + Math.PI / 4; udxF(A, "lectern", p[0] + Math.cos(a) * 5.6, F.y, p[1] + Math.sin(a) * 5.6, Math.atan2(-Math.cos(a), -Math.sin(a))); });
udxGlow(A.g, 0xC8F0E8, 5, 0.4, p[0], F.y + 4, p[1]);
udxSolidR(A, p[0], p[1], 4.4);
},
function (A, F, th, col) {
var G = A.g, x = F.ox, z = F.oz, y = F.y, gold = udxMat(0xE8B85A, "metal");
var pool = new THREE.Mesh(new THREE.CircleGeometry(4.6, 40), udxMat(0x2A4A5A, null, { e: 0x1A3A4A, ei: 0.4 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(x, y + 0.3, z);
G.add(pool);
var rim = new THREE.Mesh(new THREE.TorusGeometry(4.7, 0.3, 6, 48), udxMat(0x5A4A3A, "marble"));
rim.rotation.x = Math.PI / 2;
rim.position.set(x, y + 0.35, z);
G.add(rim);
udxCyl(0.35, 0.5, 8, gold, x, y + 4, z, G, 12);
var beam = new THREE.Group();
beam.position.set(x, y + 8, z);
beam.userData.keep = 1;
G.add(beam);
udxBox(7, 0.3, 0.3, gold, 0, 0, 0, beam);
[-3.4, 3.4].forEach(function (s) { udxCyl(0.03, 0.03, 2.6, gold, s, -1.3, 0, beam, 4); var pan = udxCyl(1.1, 0.9, 0.2, gold, s, -2.6, 0, beam, 20); var gp = udxF({ g: beam, solids: [] }, "goldpile", s, -2.5, 0, 0, { solid: false, s: 0.45 }); });
UDX.anim.push({ fn: function (dt, now) { if (beam.parent && beam.parent.visible !== false)
beam.rotation.z = Math.sin(now * 0.25) * 0.05; } });
udxF(A, "goldpile", x + 2, y + 0.3, z - 1.4, 0.6, { solid: false, s: 0.6 });
udxF(A, "goldpile", x - 2.2, y + 0.3, z + 1.2, 2.1, { solid: false, s: 0.5 });
udxGlow(G, 0xFFD890, 5, 0.45, x, y + 6, z);
udxSolidR(A, x, z, 5);
},
function (A, F, th, col) {
var G = A.g, x = F.ox, z = F.oz, y = F.y, rock = udxMat(0x3A3A2E, "stone");
var p = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 3.2, F.H * 0.6, 12, 1), rock);
p.position.set(x, y + F.H * 0.3, z);
G.add(p);
var lz = udsLizard(G, x + 2.2, y + F.H * 0.22, z, Math.PI / 2, 1.4, udxMat(0x3A5A3A, "stone"), 0x8AF08A);
lz.rotation.z = Math.PI / 2.3;
lz.children[0].visible = false;
[0, 1, 2].forEach(function (i) { var a = i / 3 * Math.PI * 2 + 0.7; udxF(A, "trsaddles", x + Math.cos(a) * 5.6, y, z + Math.sin(a) * 5.6, Math.atan2(-Math.cos(a), -Math.sin(a))); });
udxGlow(G, 0x8AF08A, 4, 0.4, x, y + F.H * 0.4, z);
udxSolidR(A, x, z, 3.4);
},
function (A, F, th, col, H) {
var x = F.ox, z = F.oz, y = F.y, G = A.g;
if (H.key === "vaelith") {
udxF(A, "judgebench", x, y, z - 1, Math.PI / 2, { s: 1.2 });
udxF(A, "weighscale", x + 2.4, y, z, -Math.PI / 2, { s: 1.4, solid: false });
udxGlow(G, col, 3, 0.4, x, y + 3, z);
udxSolidR(A, x, z, 2.4);
}
else if (H.key === "ostrael") {
udsWeb(G, x, y + F.H * 0.55, z, F.R * 0.8, 0xC8D8FF);
udxF(A, "loom", x, y, z, 0, { s: 1.5 });
udxSolidR(A, x, z, 2);
}
else if (H.key === "myrrhen") {
var p = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.6, 48), udxMat(0xE070E0, null, { basic: 1, op: 0.5, ds: 1 }));
p.rotation.x = -Math.PI / 2;
p.position.set(x, y + 0.04, z);
p.userData.keep = 1;
G.add(p);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
udxF(A, "candles", x + Math.cos(a) * 4.2, y, z + Math.sin(a) * 4.2, 0, { solid: false });
}
udxF(A, "crystalcluster", x, y, z, 0, { s: 1.6 });
udxGlow(G, 0xE070E0, 4, 0.5, x, y + 1.4, z);
udxSolidR(A, x, z, 1.6);
}
else if (H.key === "zelvane") {
for (var j = 0; j < 4; j++) {
var b = j / 4 * Math.PI * 2 + Math.PI / 4;
udsBlade(G, x + Math.cos(b) * 3, y, z + Math.sin(b) * 3, -b, 3.4, udxMat(0xB8C0C8, "metal"), udxMat(0xC89A40, "metal"));
udxSolidR(A, x + Math.cos(b) * 3, z + Math.sin(b) * 3, 0.5);
}
udxF(A, "armourstand", x, y, z, Math.PI / 2, { s: 1.3 });
udxSolidR(A, x, z, 1);
}
else if (H.key === "ithrael") {
UDS_CENTRE.ithrael(A, F, th, col);
}
else if (H.key === "korvaen") {
udxF(A, "goldcolumn", x, y, z, 0, { s: 1.2 });
for (var k = 0; k < 4; k++) {
var c = k * Math.PI / 2;
udxF(A, "displaycase", x + Math.cos(c) * 4.4, y, z + Math.sin(c) * 4.4, Math.atan2(-Math.cos(c), -Math.sin(c)));
}
udxSolidR(A, x, z, 1.4);
}
else if (H.key === "sablethorn") {
udsLizard(G, x, y, z, 0.5, 1.2, udxMat(0x3A5A3A, "stone"), 0x8AF08A);
udxSolidR(A, x, z, 2);
}
},
function (x, z, need) {
for (var ring = 0; ring < 7; ring++) {
var n = ring ? ring * 6 : 1;
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2 + ring * 0.5, px = x + Math.cos(a) * ring * 3.5, pz = z + Math.sin(a) * ring * 3.5, ok = true;
if (udsColHit(px, pz, UDC.y))
continue;
for (var i = 0; i < UD.solids.length && ok; i++) {
var s = UD.solids[i];
if (s.r !== undefined) {
var d = Math.hypot(px - s.x, pz - s.z);
if (d < s.r + need)
ok = false;
}
}
for (var j = 0; j < UD.talkers.length && ok; j++) {
var t = UD.talkers[j];
if (Math.hypot(px - t.x, pz - t.z) < (t.r || 2) + need)
ok = false;
}
for (var c = 0; c < UDC.cols.length && ok; c++) {
var C = UDC.cols[c];
if (C.foot > 1.2 && Math.hypot(px - C.x, pz - C.z) < C.foot * 1.15 + need)
ok = false;
}
if (ok)
return [px, pz];
}
}
return [x, z];
},
function (root) {
var y0 = UDC.y;
UDC_HOUSES.forEach(function (H) {
var C = H.C, A = UDX.by["h_" + H.key + "_1"];
if (!C || !A)
return;
var a0 = Math.atan2(UDC.cz - C.z, UDC.cx - C.x);
[-1, 1].forEach(function (s) { udsDoorAt(root, C, H, a0 + s * 110 * Math.PI / 180, A.key, A.inAt); });
});
var sp = UDC.spire, SA = UDX.by.spire_1;
if (sp && SA) {
var SH = { name: "The Matron Spire", motto: "Seat of the Council of Matrons", col: 0xB890FF, sig: "crown" };
[20, 260].forEach(function (d) { udsDoorAt(root, sp, SH, d * Math.PI / 180, "spire_1", SA.inAt); });
}
var silk = new THREE.LineBasicMaterial({ color: 0xD8D0F0, transparent: true, opacity: 0.7 }), wick = udxMat(0x6A5038, "wood"), brass = udxMat(0xC8A050, "metal");
var les = UDC.cols.filter(function (C) { return !(C.foot > 1.2) && C.roofY < 900 && C.jy > y0 + 20; }).slice(-(UDX.lite ? 10 : 16));
les.forEach(function (L, j) {
var LA = UDX.by["lh_" + j + "_1"], D = UDS_LESSER[j];
if (!LA || !D)
return;
var p = udsClear(L.x, L.z, 2.4), bx = p[0], bz = p[1], g = new THREE.Group();
g.position.set(bx, y0, bz);
root.add(g);
var bk = udxCyl(1.1, 0.9, 1.1, wick, 0, 0.55, 0, g, UDX.lite ? 10 : 16);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.07, 5, UDX.lite ? 14 : 24), brass);
rim.rotation.x = Math.PI / 2;
rim.position.y = 1.12;
g.add(rim);
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2; var pts = [new THREE.Vector3(Math.cos(a) * 1.05, 1.12, Math.sin(a) * 1.05), new THREE.Vector3(0, 3.4, 0)]; g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), silk)); });
root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(bx, y0 + 3.4, bz), new THREE.Vector3(L.x, L.jy, L.z)]), silk));
var hx = udsHex(D[4]);
udxSign(g, ["House " + D[0], "silk lift: step in"], 2.6, 0.62, 0, 2.6, 1.25, 0, "#140E1C", hx);
var s2 = udxSign(g, ["House " + D[0], "silk lift: step in"], 2.6, 0.62, 0, 2.6, -1.25, Math.PI, "#140E1C", hx);
udxGlow(g, D[4], 2.2, 0.5, 0, 3.5, 0);
UD.solids.push({ x: bx, z: bz, r: 1.2 });
var ox = bx + 2.6, oz = bz;
UD.talkers.push({ x: bx, z: bz, r: 3, name: "The silk lift up to House " + D[0], verb: "ride up", fn: function () { UDX.ret = { x: ox, z: oz, yaw: -Math.PI / 2 }; udxGo(LA.key, LA.inAt[0], LA.inAt[1], LA.inAt[2], "<b>Up the silk lift.</b> The basket rises smoothly into the dark, and House " + esc(D[0]) + "'s door opens at the top."); } });
UDS.lesser.push({ j: j, x: bx, z: bz, name: "House " + D[0] });
});
},
function (x, z) {
var lx = x - UDD.DX, Yf = UDD.Yf;
if (z > UDD.Zn + 2) {
if (Math.abs(lx) < 5.6 && z < UDD.DZ0 + 14)
return UDD.yG - 80 * Math.max(0, Math.min(1, (UDD.DZ0 - z) / UDD.len));
return null;
}
var t = UDD.Zn - z;
if (t < 6) {
return Math.abs(lx) < 7 ? Yf : null;
}
if (lx > UDD.W - 4) {
if (Math.abs(t - 180) < 3.4 && lx < 318)
return Yf;
if (lx > 310 && lx < 318.5 && t > 110 && t < 250)
return Yf;
if (Math.abs(t - 130) < 3 && lx > 318 && lx < 360)
return Yf;
if (Math.abs(t - 230) < 3 && lx > 318 && lx < 360)
return Yf;
return null;
}
if (lx < -UDD.W || t > UDD.T - 6)
return null;
if (t > 380 && Math.abs(lx) < 60) {
if (t < 396)
return Yf + 10 * (t - 380) / 16;
if (t > 448)
return null;
return Yf + 10;
}
if (lx > -60)
return Yf;
var k = uddTerraceK(lx), riser = -60 - 17 * k, hK = Yf + 5 * (k + 1);
if (lx < -60 - 17 * 10)
return null;
for (var j = 0; j < 2; j++) {
var kk = k + j, rx = -60 - 17 * kk, R0 = UDD_RAMPS[kk];
if (kk > 9)
continue;
if (t > R0 && t < R0 + 7 && lx < rx + 8 && lx > rx - 8) {
var lo = kk === 0 ? Yf : Yf + 5 * kk;
return lo + 5 * (rx + 8 - lx) / 16;
}
}
return hK;
},
function (x, z) {
var lx = x - UDD.DX, t = UDD.Zn - z;
if (z > UDD.Zn + 2)
return "the Thanes' Road";
if (t < 8)
return "the Great Gate of Stonehallow";
if (lx > UDD.W - 4)
return "the Deepdelve Mines";
if (t > 380 && Math.abs(lx) < 60)
return "the Thanehold";
if (lx < -60)
return "the Hundred Terraces";
if (lx > 55 && t > 290)
return "the Great Smeltery";
if (lx > 55)
return "the Deepdelve yard";
if (Math.abs(lx) < 46)
return "the Hall of Anvils";
return "Stonehallow";
},
function (G, seed, x, y, z, ry, s, col) {
var g = wPerson(seed, { sex: "m", look: udxLookDwarf(0x6A6A6A, 3), species: "dwarf" }), m = udxMat(col || 0x7A7468, "stone");
g.traverse(function (o) { if (o.isMesh) {
o.material = m;
o.castShadow = false;
} });
g.userData.figure = 0;
if (typeof HDF !== "undefined" && HDF.list)
for (var i = HDF.list.length - 1; i >= 0; i--)
if (HDF.list[i].g === g) {
if (HDF.list[i].model && typeof hdfDetach === "function")
hdfDetach(HDF.list[i]);
HDF.list.splice(i, 1);
}
g.scale.setScalar(s);
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
udxBox(4.2 * s / 9 + 2, 2, 4 * s / 9 + 2, udxMat(0x5A544C, "stone"), x, y - 1, z, G).position.y = y - 0.9;
return g;
},
function (G, x, z0, z1, yA, yB, o) {
o = o || {};
var L = Math.abs(z1 - z0), n = Math.max(1, Math.round(L / 10)), m = udxMat(o.col || 0x6A5A4C, "stone"), lamp = udxMat(0xFFC070, null, { basic: 1 });
for (var i = 0; i < n; i++) {
var za = z0 + (z1 - z0) * i / n, zb = z0 + (z1 - z0) * (i + 1) / n, ya = yA + (yB - yA) * i / n, yb = yA + (yB - yA) * (i + 1) / n, zc = (za + zb) / 2, yc = (ya + yb) / 2, seg = Math.abs(zb - za);
var geo = new THREE.BoxGeometry(12, 9, seg + 0.4, 3, 3, 2), p = geo.attributes.position;
for (var k = 0; k < p.count; k++) {
var px = p.getX(k), py = p.getY(k), pz = p.getZ(k), wz = zc + pz;
if (Math.abs(px) > 5.9)
p.setX(k, px + Math.sign(px) * (wNoise(py * 0.3, wz * 0.2, 7) - 0.3) * 1.4);
if (py > 4.4)
p.setY(k, py + (wNoise(px * 0.3, wz * 0.2, 9) - 0.3) * 1.2 + Math.max(0, 1.6 - Math.abs(px) * 0.25));
if (py < -4.4)
p.setY(k, -4.5);
}
if (metreUVs)
metreUVs(geo, "box", [12, 9, seg]);
geo.computeVertexNormals();
var mb = udxBack(m), fb = udxBack(udxMat(0x4A4038, "paving")), mats = [mb, mb, mb, fb, UDX_NONE, UDX_NONE];
if (i === 0)
mats[4] = o.open0 === 4 ? UDX_NONE : mb;
if (i === n - 1)
mats[5] = o.open1 === 5 ? UDX_NONE : mb;
var mesh = new THREE.Mesh(geo, mats);
mesh.position.set(x, yc + 4.5, zc);
mesh.rotation.x = Math.atan2(yb - ya, seg) * (z1 < z0 ? 1 : -1);
G.add(mesh);
if (i % 2 === 0 && !o.noLamps) {
[-1, 1].forEach(function (s) { var lp = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.4, 8), lamp); lp.position.set(x + s * 5.2, yc + 3.2, zc); G.add(lp); if (!UDX.lite || s > 0)
udxGlow(G, 0xFFB060, 2.6, 0.55, x + s * 4.9, yc + 3.3, zc); });
}
}
if (!o.noRails) {
var dy = yB - yA, ang = Math.atan2(dy, L);
[-3.1, -1.9].forEach(function (rx) { var r = udxBox(0.1, 0.1, Math.hypot(L, dy), udxMat(0x3A3A3E, "metal"), x + rx, (yA + yB) / 2 + 0.1, (z0 + z1) / 2, G); r.rotation.x = ang * (z1 < z0 ? 1 : -1); });
for (var s2 = 0; s2 < L; s2 += 2.4) {
var t = s2 / L;
udxBox(1.9, 0.1, 0.28, udxMat(0x4A3628, "wood"), x - 2.5, yA + (yB - yA) * t + 0.04, z0 + (z1 - z0) * t, G);
}
}
},
function (A) {
var G = A.g, gx = UDD.gx, zF = UDD.zF, y = UDD.yG, rock = udxMat(0x5A5046, "stone"), dark = udxMat(0x463E36, "stone");
[[gx - 20, 22, 28], [gx + 20, 22, 28], [gx, 8, 12]].forEach(function (q, i) {
var w = q[1], h = i < 2 ? 44 : 31, geo = new THREE.BoxGeometry(w * 1.85, h, 56, 6, 8, 6), p = geo.attributes.position;
for (var k = 0; k < p.count; k++) {
var px = p.getX(k), py = p.getY(k), pz = p.getZ(k);
if (pz > 27.9 || Math.abs(px) > w * 0.9 || py > h / 2 - 0.1) {
p.setXYZ(k, px + (wNoise(py * 0.08, pz * 0.08 + i, 3) - 0.5) * 5 * (Math.abs(px) > w * 0.9 ? 1 : 0.4), py + (py > h / 2 - 0.1 ? (wNoise(px * 0.06, pz * 0.06, 5) - 0.3) * 10 : 0), pz + (pz > 27.9 ? (wNoise(px * 0.1, py * 0.1, 4) - 0.4) * 2.4 : 0));
}
}
if (i === 2)
for (var k2 = 0; k2 < p.count; k2++) {
if (p.getY(k2) < -h / 2 + 0.1)
p.setY(k2, -h / 2);
}
metreUVs(geo, "box", [w * 1.85, h, 56]);
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, i === 2 ? dark : rock);
m.position.set(q[0] + (i === 0 ? -(w * 0.925 - w) : i === 1 ? (w * 0.925 - w) : 0), i < 2 ? y + h / 2 - 2 : y + 9 + h / 2, zF - 28);
G.add(m);
});
for (var sx = -40; sx <= 40; sx += 4) {
if (Math.abs(sx) < 7)
continue;
UD.solids.push({ x: gx + sx, z: zF - 1, r: 2.2 });
}
var fr = udxMat(0x7A7064, "stone"), gold = udxMat(0xC8A048, "metal");
udxBox(1.6, 10, 1.2, fr, gx - 6.6, y + 5, zF + 0.4, G);
udxBox(1.6, 10, 1.2, fr, gx + 6.6, y + 5, zF + 0.4, G);
udxBox(15, 1.8, 1.4, fr, gx, y + 10.6, zF + 0.4, G);
udxBox(13.2, 0.3, 0.2, gold, gx, y + 9.4, zF + 1.05, G);
var sg = wSign(["The Thanes' Road", "To Stonehallow, of the five clans", "Come as a friend, and be one"], 8, 2.2, "#2A2018", "#E8C878");
sg.position.set(gx, y + 13.4, zF + 1.2);
G.add(sg);
uddStatue(G, "gate_l", gx - 11, y + 0.2, zF + 4, 0, 7.5);
uddStatue(G, "gate_r", gx + 11, y + 0.2, zF + 4, 0, 7.5);
UD.solids.push({ x: gx - 11, z: zF + 4, r: 3 });
UD.solids.push({ x: gx + 11, z: zF + 4, r: 3 });
[-1, 1].forEach(function (s) { udxF(A, "brazier", gx + s * 7.8, y, zF + 3.4, 0, { solid: false }); UD.solids.push({ x: gx + s * 7.8, z: zF + 3.4, r: 0.7 }); udxGlow(G, 0xFFA050, 4, 0.6, gx + s * 7.8, y + 2.9, zF + 3.4); });
uddTunnel(G, gx, zF + 0.5, UDD.seamZ - 14, y, y, { open0: 4, noRails: false });
udxWho(A, "udd_gate", { sex: "m", look: udxLookDwarf(0x6A5A3A, 2), species: "dwarf", scale: 0.82, must: 1 }, gx + 3.6, zF - 2.5, Math.PI * 0.85, udxPersona("Borri Ironbraid, warden of the Thanes' Road", "a dwarf of Clan Ironbraid who keeps the north end of the Thanes' Road, the long tunnel from the elves' cavern down to Stonehallow, home of the five clans of dwarves. Gruff, warm, loves a good pun about rocks. You tell travellers that Stonehallow lies at the end of the road, down and south: the Great Gate, the Hall of Anvils, the Hundred Terraces, the Deepdelve Mines, the Great Smeltery, and the Thanehold where the High Thane sits with the chiefs of the five clans.", "Mind your head and your manners, and you'll be welcome in Stonehallow. It's a long road down, but it's all downhill, ha!"));
},
function (A) {
var G = A.g, DX = UDD.DX, Zn = UDD.Zn, Yf = UDD.Yf, W = UDD.W, T = UDD.T, lite = UDX.lite, Rr = wRand(5150);
var stone = udxMat(0x8A7A66, "stone"), stoneD = udxMat(0x6A5C4C, "stone"), pave = udxMat(0x7A6E60, "paving"), slab = udxMat(0x8A8274, "marble"), gold = udxMat(0xC8A048, "metal"), wood = udxMat(0x5A4030, "wood"), iron = udxMat(0x3A3A3E, "metal");
function at(lx, t) { return [DX + lx, Zn - t]; }
function solid(lx, t, r) { var p = at(lx, t); A.solids.push({ x: p[0], z: p[1], r: r }); }
function sbox(lx, t, hw, hd) { var p = at(lx, t); A.solids.push({ x: p[0], z: p[1], hw: hw, hd: hd, rot: 0 }); }
uddTunnel(G, DX, UDD.DZ0 + 14, Zn + 2, UDD.yG + 0, Yf, { open1: 5 });
for (var w = 50; w < UDD.len; w += 50) {
var wz = UDD.DZ0 - w, wy = UDD.yG - 80 * w / UDD.len;
udxBox(0.8, 1.6, 0.5, udxMat(0x8A8274, "stone"), DX + 4.4, wy + 0.8, wz, G);
var ws = wSign(["Stonehallow", (UDD.len - w) + " paces on"], 1.2, 0.6, "#2A2018", "#E8C878");
ws.position.set(DX + 4.4, wy + 1.4, wz + 0.26);
G.add(ws);
A.solids.push({ x: DX + 4.4, z: wz, r: 0.6 });
}
udxWho(A, "udd_road", { sex: "f", look: udxLookDwarf(0x4A5A6A, 4), species: "dwarf", scale: 0.82, must: 1 }, DX + 2.6, UDD.DZ0 - 150, Math.PI, udxPersona("Kettla Stoutvein, a road guard", "a dwarf of Clan Stoutvein on guard halfway down the Thanes' Road. Cheerful, nosy, fond of counting things (you have counted every step of the road: there are a great many). You tell travellers what they'll find in Stonehallow and that the elves of Zhaelvorn and the dwarves have been friends since House Sablethorn's scouts found this road.", "Halfway! Well, near enough. Keep on down; you'll hear the hammers before you see the gate."));
var cv = new THREE.BoxGeometry(2 * W + 20, 150, T + 20, lite ? 8 : 14, 6, lite ? 8 : 14), cp = cv.attributes.position;
for (var k = 0; k < cp.count; k++) {
var px = cp.getX(k), py = cp.getY(k), pz = cp.getZ(k);
if (py < -74.9)
continue;
var n = wNoise(px * 0.02 + pz * 0.01, py * 0.02, 13) - 0.5;
if (Math.abs(px) > W + 9)
cp.setX(k, px + Math.sign(px) * n * 26);
if (Math.abs(pz) > T / 2 + 9)
cp.setZ(k, pz + Math.sign(pz) * n * 20);
if (py > 74.9)
cp.setY(k, py + n * 30);
}
metreUVs(cv, "box", [2 * W + 20, 150, T + 20]);
cv.computeVertexNormals();
var cm = udxBack(stoneD);
var cave = new THREE.Mesh(cv, [UDX_NONE, cm, cm, UDX_NONE, UDX_NONE, cm]);
cave.position.set(DX, Yf + 75 - 0.3, Zn - T / 2);
G.add(cave);
[[Zn + 10, Zn - 176], [Zn - 184, Zn - T - 10]].forEach(function (q) { var L = q[0] - q[1]; udxBox(4, 150, L, stoneD, DX + W + 12, Yf + 75, (q[0] + q[1]) / 2, G); });
udxBox(4, 145, 8, stoneD, DX + W + 12, Yf + 5 + 72.5, Zn - 180, G);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2 * W + 20, T + 20), pave);
metreUVs(fl.geometry, "pln", [2 * W + 20, T + 20]);
fl.rotation.x = -Math.PI / 2;
fl.position.set(DX, Yf, Zn - T / 2);
G.add(fl);
var stg = new THREE.ConeGeometry(1, 1, 7), sti = new THREE.InstancedMesh(stg, stoneD, lite ? 60 : 140), mx = new THREE.Matrix4(), dn = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
for (var s = 0; s < (lite ? 60 : 140); s++) {
var sx = DX + (Rr() - 0.5) * 2 * W, sz = Zn - Rr() * T, ln = 8 + Rr() * 30;
mx.compose(new THREE.Vector3(sx, Yf + 150 - ln / 2, sz), dn, new THREE.Vector3(2 + ln * 0.12, ln, 2 + ln * 0.12));
sti.setMatrixAt(s, mx);
}
G.add(sti);
var gw = udxMat(0x7A6E5E, "stone");
udxBox(W + 5, 150, 8, gw, DX - (W + 19) / 2, Yf + 75, Zn + 2, G);
udxBox(W + 5, 150, 8, gw, DX + (W + 19) / 2, Yf + 75, Zn + 2, G);
udxBox(14, 128, 8, gw, DX, Yf + 86, Zn + 2, G);
for (var gp = -W; gp <= W; gp += 3)
if (Math.abs(gp) > 7)
A.solids.push({ x: DX + gp, z: Zn + 2, r: 2.4 });
[-1, 1].forEach(function (s) { var leaf = udxBox(7, 22, 1, udxMat(0x6A5038, "wood"), DX + s * 10.2, Yf + 11, Zn - 1.5, G); leaf.rotation.y = s * 0.35; udxBox(7.2, 0.4, 1.2, iron, DX + s * 10.2, Yf + 6, Zn - 1.5, G).rotation.y = s * 0.35; udxBox(7.2, 0.4, 1.2, iron, DX + s * 10.2, Yf + 16, Zn - 1.5, G).rotation.y = s * 0.35; });
var arch = new THREE.Mesh(new THREE.TorusGeometry(7.4, 1.1, 8, 24, Math.PI), gold);
arch.position.set(DX, Yf + 22, Zn - 2.2);
G.add(arch);
var gs = wSign(["Stonehallow", "Hall of the five clans: Ironbraid, Emberbeard, Stoutvein, Granitehand, Deepmantle"], 14, 2.6, "#2A2018", "#E8C878");
gs.position.set(DX, Yf + 27, Zn - 2.4);
G.add(gs);
uddStatue(G, "gg_l", DX - 24, Yf + 0.2, Zn - 8, Math.PI, 13);
uddStatue(G, "gg_r", DX + 24, Yf + 0.2, Zn - 8, Math.PI, 13);
solid(-24, 8, 5);
solid(24, 8, 5);
var pil = udxMat(0x8C8070, "stone");
UDD.forges = [];
for (var t = 24; t <= 360; t += 28) {
[-34, 34].forEach(function (lx) {
var p = at(lx, t);
udxBox(7, 150, 7, pil, p[0], Yf + 75, p[1], G);
udxBox(9, 2, 9, pil, p[0], Yf + 1, p[1], G);
udxBox(8.6, 1.2, 8.6, gold, p[0], Yf + 14, p[1], G);
udxBox(8.6, 1.2, 8.6, gold, p[0], Yf + 40, p[1], G);
sbox(lx, t, 4.6, 4.6);
if (!lite || t % 56 === 24)
udxGlow(G, 0xFFB060, 5, 0.5, p[0] + (lx < 0 ? 5 : -5), Yf + 8, p[1]);
});
}
var runner = new THREE.Mesh(new THREE.PlaneGeometry(10, 340), udxMat(0x9A8A6A, "marble"));
metreUVs(runner.geometry, "pln", [10, 340]);
runner.rotation.x = -Math.PI / 2;
var rp = at(0, 190);
runner.position.set(rp[0], Yf + 0.03, rp[1]);
G.add(runner);
[0, 1].forEach(function (i) { var ln = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 340), udxMat(0xC8A048, null, { basic: 1 })); ln.rotation.x = -Math.PI / 2; ln.position.set(rp[0] + (i ? 5.2 : -5.2), Yf + 0.05, rp[1]); G.add(ln); });
for (var ft = 38; ft <= 346; ft += 56) {
[-1, 1].forEach(function (s) {
var lx = s * 41, p = at(lx, ft), ry = s < 0 ? Math.PI / 2 : -Math.PI / 2;
udxF(A, "hearthforge", p[0], Yf, p[1], ry);
var a1 = at(lx - s * 3.4, ft - 1.6), a2 = at(lx - s * 3.4, ft + 1.6);
udxF(A, "anvil", a1[0], Yf, a1[1], ry);
udxF(A, "anvil", a2[0], Yf, a2[1], ry);
if (!lite)
udxF(A, "weaponrack", at(lx, ft + 5)[0], Yf, at(lx, ft + 5)[1], ry, { decor: 1 });
udxGlow(G, 0xFF8A3A, 5, 0.55, p[0] - s * 0.6, Yf + 1.6, p[1]);
UDD.forges.push({ x: p[0] - s * 3.4 * 1.4, z: p[1] });
});
}
UDD.clans.forEach(function (C, i) { [-1, 1].forEach(function (s) { var p = at(s * 30.4, 52 + i * 56), b = new THREE.Mesh(new THREE.PlaneGeometry(4, 14), udxMat(C.col, "wood", { e: C.col, ei: 0.15, ds: 1 })); b.position.set(p[0], Yf + 22, p[1]); b.rotation.y = s < 0 ? Math.PI / 2 : -Math.PI / 2; G.add(b); }); });
for (var lt = 70; lt <= 330; lt += 65) {
var p2 = at(-14, lt);
udxF(A, "feasttable", p2[0], Yf, p2[1], Math.PI / 2);
var p3 = at(14, lt);
udxF(A, "feasttable", p3[0], Yf, p3[1], Math.PI / 2);
}
var rise = udxMat(0x8A7E6C, "stone"), DW = ["dwarf_a_1", "dwarf_b_1", "dwarf_c_1"], fam = ["Copperkettle", "Flintmane", "Orebright", "Hammerfell", "Stonebrow", "Coalbeard", "Silvervein", "Tinderhand", "Ashgrove", "Brassbuckle", "Gemcutter", "Lodestone"];
UDD.doors = 0;
for (var k2 = 0; k2 <= 10; k2++) {
var rx = -60 - 17 * k2, lo = k2 === 0 ? Yf : Yf + 5 * k2, hi = Yf + 5 * (k2 + 1);
if (k2 < 10) {
var R0 = UDD_RAMPS[k2], sh = hi - Yf, inner = rx - 8, outer = rx - 17;
var pa = at((outer + inner) / 2, T / 2);
udxBox(9, sh, T - 12, rise, pa[0], Yf + sh / 2, pa[1], G);
[[6, R0], [R0 + 7, T - 6]].forEach(function (seg) { var L = seg[1] - seg[0]; if (L < 1)
return; var p = at((inner + rx) / 2, (seg[0] + seg[1]) / 2); udxBox(8, sh, L, rise, p[0], Yf + sh / 2, p[1], G); });
var rp2 = at(rx, R0 + 3.5), ramp = udxBox(16.8, 0.5, 7, udxMat(0x7A6E60, "paving"), rp2[0], (lo + hi) / 2 - 0.25, rp2[1], G);
ramp.rotation.z = -Math.atan2(5, 16);
[[6, R0], [R0 + 7, T - 6]].forEach(function (seg) { var L = seg[1] - seg[0]; if (L < 1)
return; var p = at(rx - 0.3, (seg[0] + seg[1]) / 2); udxBox(0.5, 1.1, L, stoneD, p[0], hi + 0.55, p[1], G); });
}
else {
var p4 = at(rx, T / 2);
udxBox(1.2, 80, T, rise, p4[0] - 0.6, Yf + 40, p4[1], G);
}
if (k2 >= 1) {
var face = -60 - 17 * k2, every = lite ? 44 : 30;
for (var ht = 24 + (k2 % 2) * 12; ht < T - 24; ht += every) {
if (Math.abs(ht - UDD_RAMPS[k2] - 3.5) < 8 || (k2 < 10 && Math.abs(ht - UDD_RAMPS[k2 - 1] - 3.5) < 8))
continue;
var hp = at(face + 0.1, ht), hy = Yf + 5 * k2, dk = DW[(k2 + Math.round(ht)) % 3], nm = fam[(k2 * 7 + Math.round(ht / 30)) % fam.length];
var fg = new THREE.Group();
fg.position.set(hp[0], hy, hp[1]);
fg.rotation.y = Math.PI / 2;
G.add(fg);
udxBox(9, 4.8, 0.5, udxMat(0x9A8C78, "stone"), 0, 2.4, 0.25, fg);
udxBox(2, 3, 0.2, udxMat(0x5A4030, "wood"), 0, 1.5, 0.55, fg);
var dar = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.2, 5, 14, Math.PI), gold);
dar.position.set(0, 3, 0.6);
fg.add(dar);
[-3, 3].forEach(function (wx) { var wl = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.2), udxMat(0xFFC070, null, { basic: 1 })); wl.position.set(wx, 2.6, 0.52); fg.add(wl); });
udxBox(0.8, 0.8, 1.2, udxMat(0x7A6E5E, "stone"), 3.6, 0.4, 1.2, fg);
if (!lite && UDD.doors % 2 === 0)
udxGlow(G, 0xFFB060, 2.2, 0.45, hp[0] + 1.2, hy + 3.6, hp[1] - 1.6);
(function (dk, nm, hp, hy) {
var A2 = UDX.by[dk];
if (!A2)
return;
var ox = hp[0] + 2.4, oz = hp[1];
udxTalk(A, { x: hp[0] + 1.5, z: hp[1], r: 2, name: "The " + nm + " family's door", verb: "knock and go in", fn: function () { UDX.ret = { x: ox, z: oz, yaw: -Math.PI / 2, area: "deep" }; udxGo(dk, A2.inAt[0], A2.inAt[1], A2.inAt[2], "<b>The " + esc(nm) + " family's home.</b> Come in, come in."); } });
})(dk, nm, hp, hy);
UDD.doors++;
}
}
if (k2 < 10 && !lite) {
for (var gt = 40; gt < T - 30; gt += 46) {
var gp2 = at(rx - 8, gt), gy = Yf + 5 * (k2 + 1);
var bed = udxBox(3, 0.5, 6, udxMat(0x4A3A2A, "earth"), gp2[0], gy + 0.25, gp2[1], G);
for (var c = 0; c < 4; c++) {
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), udxMat([0xC88A5A, 0xE8D8B0, 0x6AE8D8][c % 3], null, c % 3 === 2 ? { basic: 1 } : {}));
cap.position.set(gp2[0] + (c % 2 - 0.5) * 1.2, gy + 0.7, gp2[1] - 2 + c * 1.3);
G.add(cap);
}
A.solids.push({ x: gp2[0], z: gp2[1], hw: 1.6, hd: 3.1, rot: 0 });
}
}
}
var ts = wSign(["The Hundred Terraces", "Carved by Clan Granitehand · ramps every few doors"], 6, 1.4, "#2A2018", "#E8C878");
var tsp = at(-57, 30);
ts.position.set(tsp[0], Yf + 4, tsp[1]);
ts.rotation.y = Math.PI / 2;
G.add(ts);
var hf = at(150, 150);
[[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(function (q) { var lg = udxBox(0.9, 34, 0.9, wood, hf[0] + q[0] * 0.6, Yf + 17, hf[1] + q[1] * 0.6, G); lg.rotation.z = -q[0] * 0.012; lg.rotation.x = q[1] * 0.012; });
for (var hy2 = 6; hy2 < 34; hy2 += 8) {
udxBox(7, 0.5, 0.5, wood, hf[0], Yf + hy2, hf[1] - 3, G);
udxBox(7, 0.5, 0.5, wood, hf[0], Yf + hy2, hf[1] + 3, G);
udxBox(0.5, 0.5, 7, wood, hf[0] - 3, Yf + hy2, hf[1], G);
udxBox(0.5, 0.5, 7, wood, hf[0] + 3, Yf + hy2, hf[1], G);
}
var wheel = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.3, 6, 28), iron);
wheel.position.set(hf[0], Yf + 36, hf[1]);
G.add(wheel);
wheel.userData.keep = 1;
for (var sp2 = 0; sp2 < 6; sp2++) {
var spk = udxBox(0.16, 7, 0.16, iron, 0, 0, 0, null);
spk.rotation.z = sp2 * Math.PI / 6;
wheel.add(spk);
}
UDX.anim.push({ fn: function (dt) { if (wheel.parent && wheel.parent.visible !== false)
wheel.rotation.z += dt * 0.25; } });
var shaft = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 0.2, 24), new THREE.MeshBasicMaterial({ color: 0x050404 }));
shaft.position.set(hf[0], Yf + 0.06, hf[1]);
G.add(shaft);
A.solids.push({ x: hf[0], z: hf[1], hw: 4, hd: 4, rot: 0 });
udxF(A, "oreheap", at(130, 170)[0], Yf, at(130, 170)[1], 0);
udxF(A, "oreheap", at(172, 132)[0], Yf, at(172, 132)[1], 1);
udxF(A, "minecart", at(140, 180)[0], Yf, at(140, 180)[1], Math.PI / 2);
udxF(A, "minecart", at(196, 180)[0], Yf, at(196, 180)[1], Math.PI / 2);
var ry3 = udxBox(UDD.W - 120, 0.1, 0.1, iron, at((UDD.W + 120) / 2, 180)[0], Yf + 0.1, at(0, 179.4)[1], G);
udxBox(UDD.W - 120, 0.1, 0.1, iron, ry3.position.x, Yf + 0.1, at(0, 180.6)[1], G);
var mg = wSign(["The Deepdelve Mines", "Clan Stoutvein · the galleries are through the adit"], 5, 1.2, "#2A2018", "#E8C878");
var mgp = at(120, 150);
mg.position.set(mgp[0], Yf + 4, mgp[1]);
mg.rotation.y = Math.PI / 2;
G.add(mg);
udxCyl(0.2, 0.25, 4.6, wood, mgp[0] + 0.3, Yf + 2.3, mgp[1], G, 6);
var adit = [[UDD.W - 6, 318, 180, "x"], [314.5, 314.5, 110, 250], [318, 360, 130, "x"], [318, 360, 230, "x"]];
adit.forEach(function (q, i) {
var gb = udxBack(udxMat(0x5A4A3E, "stone")), floorM = udxMat(0x4A4038, "earth");
if (q[3] === "x") {
var L = q[1] - q[0], g2 = new THREE.BoxGeometry(L, 4.6, 7, Math.ceil(L / 8), 2, 2), p = g2.attributes.position;
for (var v = 0; v < p.count; v++) {
var pz = p.getZ(v);
if (Math.abs(pz) > 3.4)
p.setZ(v, pz + Math.sign(pz) * (wNoise(p.getX(v) * 0.2, p.getY(v) * 0.3, 11 + i) - 0.5) * 1.2);
}
metreUVs(g2, "box", [L, 4.6, 7]);
g2.computeVertexNormals();
var mm = new THREE.Mesh(g2, [i === 0 ? UDX_NONE : gb, UDX_NONE, gb, udxBack(floorM), gb, gb]);
var c = at((q[0] + q[1]) / 2, q[2]);
mm.position.set(c[0], Yf + 2.3, c[1]);
G.add(mm);
for (var tb = q[0] + 4; tb < q[1]; tb += 6) {
var tp = at(tb, q[2]);
udxBox(0.3, 4.2, 0.3, wood, tp[0], Yf + 2.1, tp[1] - 3, G);
udxBox(0.3, 4.2, 0.3, wood, tp[0], Yf + 2.1, tp[1] + 3, G);
udxBox(0.3, 0.3, 6.4, wood, tp[0], Yf + 4.2, tp[1], G);
if (tb % 12 < 6)
udxGlow(G, 0xFFB060, 2.2, 0.5, tp[0], Yf + 3.6, tp[1]);
}
}
else {
var L2 = q[3] - q[2], g3 = new THREE.BoxGeometry(8, 4.6, L2, 2, 2, Math.ceil(L2 / 8));
metreUVs(g3, "box", [8, 4.6, L2]);
var mm2 = new THREE.Mesh(g3, [UDX_NONE, UDX_NONE, gb, udxBack(floorM), gb, gb]);
var c2 = at(q[0], (q[2] + q[3]) / 2);
mm2.position.set(c2[0], Yf + 2.3, c2[1]);
G.add(mm2);
var ds = udxMat(0x5A4A3E, "stone", { ds: 1 });
[[q[0] - 4, [[q[2], 176.5], [183.5, q[3]]]], [q[0] + 4, [[q[2], 126.5], [133.5, 226.5], [233.5, q[3]]]]].forEach(function (wl) { wl[1].forEach(function (sg) { var c3 = at(wl[0], (sg[0] + sg[1]) / 2); udxBox(0.4, 4.6, sg[1] - sg[0], ds, c3[0], Yf + 2.3, c3[1], G); }); });
for (var tb2 = q[2] + 4; tb2 < q[3]; tb2 += 6) {
var tp2 = at(q[0], tb2);
udxBox(0.3, 4.2, 0.3, wood, tp2[0] - 3.6, Yf + 2.1, tp2[1], G);
udxBox(0.3, 4.2, 0.3, wood, tp2[0] + 3.6, Yf + 2.1, tp2[1], G);
udxBox(7.6, 0.3, 0.3, wood, tp2[0], Yf + 4.2, tp2[1], G);
if (tb2 % 12 < 6)
udxGlow(G, 0xFFB060, 2.2, 0.5, tp2[0], Yf + 3.6, tp2[1]);
}
}
});
var am = at(UDD.W - 5, 180);
udxBox(1.2, 6, 1, wood, am[0], Yf + 3, am[1] - 3.8, G);
udxBox(1.2, 6, 1, wood, am[0], Yf + 3, am[1] + 3.8, G);
udxBox(1.2, 1, 9, wood, am[0], Yf + 6, am[1], G);
UDD.smelt = at(120, 350);
[[95, 330], [145, 330], [120, 385]].forEach(function (q, i) {
var p = at(q[0], q[1]);
udxCyl(9, 12, 26, udxMat(0x5A4A40, "brick"), p[0], Yf + 13, p[1], G, 16);
udxCyl(4, 6, 124, udxMat(0x4A3E36, "brick"), p[0], Yf + 26 + 62, p[1], G, 12);
var mouth = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), udxMat(0xFF7A2A, null, { basic: 1 }));
mouth.position.set(p[0], Yf + 2, p[1] + 12.1);
G.add(mouth);
udxGlow(G, 0xFF7A2A, 10, 0.55, p[0], Yf + 3, p[1] + 13.4);
A.solids.push({ x: p[0], z: p[1], r: 12.6 });
});
var lava = new THREE.MeshBasicMaterial({ color: 0xFF6A1A, transparent: true, opacity: 0.92 });
[[95, 343, 95, 360], [145, 343, 145, 360], [95, 360, 145, 360], [120, 360, 120, 372]].forEach(function (q) {
var a = at(q[0], q[1]), b = at(q[2], q[3]), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
var ch = udxBox(L + 2.4, 0.6, 2.4, udxMat(0x4A3E36, "stone"), (a[0] + b[0]) / 2, Yf + 0.3, (a[1] + b[1]) / 2, G);
ch.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]);
var lv = new THREE.Mesh(new THREE.PlaneGeometry(L + 1.6, 1.4), lava);
lv.rotation.order = "YXZ";
lv.rotation.set(-Math.PI / 2, -Math.atan2(b[1] - a[1], b[0] - a[0]), 0);
lv.position.set((a[0] + b[0]) / 2, Yf + 0.62, (a[1] + b[1]) / 2);
G.add(lv);
lv.userData.keep = 1;
var n = Math.ceil(L / 2.5);
for (var i = 0; i <= n; i++) {
var tt = i / n;
A.solids.push({ x: a[0] + (b[0] - a[0]) * tt, z: a[1] + (b[1] - a[1]) * tt, r: 1.5 });
}
});
UDX.anim.push({ fn: function (dt, now) { lava.color.setHSL(0.06, 1, 0.5 + 0.04 * Math.sin(now * 0.4)); } });
var cr = at(120, 320);
udxF(A, "lavaforge", cr[0], Yf, cr[1], 0);
udxF(A, "crates", at(80, 310)[0], Yf, at(80, 310)[1], 0);
udxF(A, "oreheap", at(160, 310)[0], Yf, at(160, 310)[1], 0.6);
var ss = wSign(["The Great Smeltery", "Clan Emberbeard · keep to the walkways"], 5, 1.2, "#2A2018", "#F0B070");
var ssp = at(120, 302);
ss.position.set(ssp[0], Yf + 4, ssp[1]);
G.add(ss);
udxCyl(0.2, 0.25, 4.6, wood, ssp[0], Yf + 2.3, ssp[1] - 0.3, G, 6);
var th0 = Yf + 10, PW = udxMat(0x9A8E7A, "marble");
var pf = at(0, 452);
udxBox(110, 90, 6, PW, pf[0], Yf + 45, pf[1], G);
for (var cc = -44; cc <= 44; cc += 11) {
var cp2 = at(cc, 445);
udxCyl(2.2, 2.6, 48, PW, cp2[0], th0 + 24, cp2[1], G, 16);
udxBox(5.4, 1.6, 5.4, gold, cp2[0], th0 + 48.6, cp2[1], G);
udxBox(5.4, 1.2, 5.4, PW, cp2[0], th0 + 0.6, cp2[1], G);
A.solids.push({ x: cp2[0], z: cp2[1], r: 2.8 });
}
var pd = at(0, 447.4);
udxBox(108, 4, 10, PW, pd[0], th0 + 51, pd[1], G);
var tri = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 56, 14, 3, 1), PW);
tri.rotation.z = Math.PI / 2;
tri.rotation.y = Math.PI / 2;
tri.scale.set(1, 1, 0.2);
var pp = at(0, 447);
tri.position.set(pp[0], th0 + 60, pp[1]);
G.add(tri);
udxBox(10, 14, 0.6, udxMat(0x5A4030, "wood"), at(0, 448.6)[0], th0 + 7, at(0, 448.6)[1], G);
udxBox(11, 0.6, 0.8, gold, at(0, 448.4)[0], th0 + 14.3, at(0, 448.4)[1], G);
for (var st = 0; st < 16; st++) {
var sp3 = at(0, 380.5 + st);
udxBox(120, (st + 1) * 10 / 16, 1, PW, sp3[0], Yf + (st + 1) * 5 / 16, sp3[1], G);
}
var pl2 = at(0, 422);
udxBox(120, 10, 52, PW, pl2[0], Yf + 5, pl2[1], G);
var ps = wSign(["The Thanehold", "Seat of the High Thane and the chiefs of the five clans"], 10, 1.8, "#2A2018", "#E8C878");
var psp = at(0, 447.9);
ps.position.set(psp[0], th0 + 17, psp[1]);
G.add(ps);
uddStatue(G, "th_l", DX - 30, th0, Zn - 430, Math.PI, 9);
uddStatue(G, "th_r", DX + 30, th0, Zn - 430, Math.PI, 9);
solid(-30, 430, 4);
solid(30, 430, 4);
[-1, 1].forEach(function (s) { var b = at(s * 14, 442); udxF(A, "brazier", b[0], th0, b[1], 0, { solid: false }); A.solids.push({ x: b[0], z: b[1], r: 0.7 }); udxGlow(G, 0xFFA050, 4, 0.6, b[0], th0 + 2.9, b[1]); });
var TA = UDX.by.thane_1, dq = at(0, 446);
if (TA)
udxTalk(A, { x: dq[0], z: dq[1], r: 3.2, name: "The great doors of the Thanehold", verb: "go in", fn: function () { UDX.ret = { x: dq[0], z: dq[1] + 3, yaw: 0, area: "deep" }; udxGo("thane_1", TA.inAt[0], TA.inAt[1], TA.inAt[2], "<b>The Thanehold.</b> The doors close softly behind you; the hall beyond is warm and gold."); } });
[["flagon", 52, 40, "The Copper Flagon", "Inn and alehouse · rooms upstairs", "#F0C070"], ["baths", 52, 250, "The Emberwell Baths", "Hot springs of Stonehallow", "#A8D8F0"]].forEach(function (q) {
var p = at(q[1], q[2]), g = new THREE.Group();
g.position.set(p[0], Yf, p[1]);
g.rotation.y = -Math.PI / 2;
G.add(g);
udxBox(20, 12, 14, udxMat(0x8A7A66, "stone"), 0, 6, 7.4, g);
udxBox(21, 1.2, 15, udxMat(0x6A5038, "wood"), 0, 12.6, 7.4, g);
udxBox(3.4, 4.4, 0.3, udxMat(0x5A4030, "wood"), 0, 2.2, 0.3, g);
[-6, 6].forEach(function (wx) { var wl = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.8), udxMat(0xFFC070, null, { basic: 1 })); wl.position.set(wx, 3.4, 0.32); g.add(wl); });
var s3 = wSign([q[3], q[4]], 5, 1.1, "#2A2018", q[5]);
s3.position.set(0, 6.4, 0.4);
g.add(s3);
udxGlow(G, 0xFFB060, 3, 0.5, p[0] - 1, Yf + 5, p[1]);
A.solids.push({ x: p[0] + 7.4, z: p[1], hw: 7.2, hd: 10.2, rot: 0 });
var IA = UDX.by[q[0] + "_1"], ox = p[0] - 2.6;
if (IA)
udxTalk(A, { x: p[0] - 1.4, z: p[1], r: 2.4, name: "The door of " + q[3], verb: "go in", fn: function () { UDX.ret = { x: ox, z: p[1], yaw: Math.PI / 2, area: "deep" }; udxGo(q[0] + "_1", IA.inAt[0], IA.inAt[1], IA.inAt[2], "<b>" + esc(q[3]) + ".</b>"); } });
});
uddFolk(A, at);
try {
udxDeepDress(A);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] deep life", e);
}
A.firstY = Yf;
},
function (A, at) {
var Yf = UDD.Yf, DL = function (top, o) { return udxLookDwarf(top, o); }, n = 0;
function who(seed, o, lx, t, ry, talk, wander) { var p = at(lx, t); o.species = "dwarf"; o.scale = o.scale || 0.82; return udxWho(A, seed, o, p[0], p[1], ry, talk, wander); }
who("udd_gg", { sex: "m", look: DL(0x6A5A3A, 1), must: 1 }, 6, 12, Math.PI, udxPersona("Haldor Granitehand, captain of the Great Gate", "the captain of the Great Gate of Stonehallow, of Clan Granitehand (the masons who carved the Hundred Terraces). Solemn, courteous, secretly delighted by visitors. You explain Stonehallow: the Hall of Anvils ahead (where every clan's smiths work), the Hundred Terraces up the west wall (homes), the Deepdelve Mines and the Great Smeltery to the east, and the Thanehold at the far end, where the High Thane sits with the chiefs of the five clans.", "Welcome to Stonehallow, traveller. Walk tall in the Hall of Anvils; the Thane's doors are at the far end, up the stair."));
UDD.forges.forEach(function (F, i) { if (UDX.lite && i % 2)
return; who("udd_smith" + i, { sex: i % 3 ? "m" : "f", look: DL([0x5A3A2A, 0x3A3A42, 0x6A4A2A][i % 3], i) }, F.x - UDD.DX, UDD.Zn - F.z, i % 2 ? -Math.PI / 2 : Math.PI / 2, i === 0 ? udxPersona("Thrain Hammerfell, master smith of the Hall of Anvils", "a master smith of Clan Ironbraid working a forge in the Hall of Anvils. Loud, generous, proud of good work; you explain forging (heat, hammer, quench, temper) and invite visitors to try the forges at Cinderwell or here.", "Hah! Mind the sparks. Want to see how a blade is drawn out? Watch the colour of the iron: straw, then bronze, then blue.") : null); });
who("udd_mine", { sex: "m", look: DL(0x4A4A52, 2), must: 1 }, 150, 140, 0, udxPersona("Grunna Stoutvein, overseer of the Deepdelve", "the overseer of the Deepdelve Mines for Clan Stoutvein. Practical, safety-minded, dry. You explain the headframe, the cage down the shaft, the galleries through the adit in the east wall, and that miners find deepsilver and runestone there.", "Hard hat? No? Well, a dwarf's head is hard enough, but yours I'm not sure about. The galleries are through the adit."));
who("udd_smelt", { sex: "f", look: DL(0x7A3A22, 5), must: 1 }, 120, 312, 0, udxPersona("Hulda Emberbeard, chief of Clan Emberbeard", "the chief of Clan Emberbeard, who keep the Great Smeltery; fierce, warm, with a voice that carries over furnaces. You explain smelting: ore and charcoal and limestone in the furnace, the metal running out molten into the channels, the slag skimmed off. You sit on the High Thane's council of five clans.", "Stand back from the channels, friend. That's iron running like water; it would very much like to meet your boots."));
who("udd_ter", { sex: "f", look: DL(0x5A6A4A, 3), must: 1 }, -50, 34, Math.PI / 2, udxPersona("Ysolde Granitehand, chief of Clan Granitehand", "the chief of Clan Granitehand, the masons who carved the Hundred Terraces up the west wall of Stonehallow; precise, proud, kind. You explain how the terraces were cut, a hundred homes (more or less) each with its own door in the rock, ramps between the levels.", "Every terrace is five metres above the last, and every door was carved by hand. Go up the ramps and knock; dwarves love company."));
for (var c = 0; c < (UDX.lite ? 6 : 14); c++) {
var lx = (c % 2 ? 1 : -1) * (8 + (c * 7) % 28), t = 40 + c * 24;
who("udd_c" + c, { sex: c % 2 ? "f" : "m", look: DL([0x5A3A2A, 0x3A4A5A, 0x6A5A3A, 0x4A3A4A][c % 4], c) }, lx, t, 0, null, { r: 16, sp: 1 });
}
for (var tc = 0; tc < (UDX.lite ? 3 : 8); tc++) {
var k = 1 + tc % 9, lx2 = -60 - 17 * k + 9, t2 = 50 + tc * 44;
who("udd_tc" + tc, { sex: tc % 2 ? "m" : "f", look: DL([0x6A4A2A, 0x3A5A4A, 0x5A3A5A][tc % 3], tc + 2) }, lx2, t2, 0, null, { r: 8, sp: 0.8 });
}
},
function (band) {
var k = "sk" + band;
if (UDSP[k])
return UDSP[k];
var c = document.createElement("canvas");
c.width = 256;
c.height = 256;
var x = c.getContext("2d"), hx = "#" + ("000000" + band.toString(16)).slice(-6);
x.fillStyle = "#241C30";
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 900; i++) {
x.fillStyle = i % 3 ? "rgba(10,6,16,.5)" : "rgba(120,100,160,.25)";
x.fillRect((i * 73) % 256, (i * 151) % 256, 2, 5);
}
x.globalAlpha = 0.55;
x.fillStyle = hx;
for (var r = 0; r < 5; r++) {
x.fillRect(0, 20 + r * 48, 256, 7);
}
x.globalAlpha = 0.8;
x.fillStyle = "#D8C8F0";
for (var v = 0; v < 5; v++) {
var yy = 34 + v * 44;
x.beginPath();
x.moveTo(128, yy + 16);
x.lineTo(96, yy);
x.lineTo(104, yy - 6);
x.lineTo(128, yy + 6);
x.lineTo(152, yy - 6);
x.lineTo(160, yy);
x.closePath();
x.fill();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (UDSP[k] = t);
},
function (o) {
o = o || {};
var lite = typeof LITE !== "undefined" && !!LITE, seg = lite ? 8 : 14, g = new THREE.Group(), s = o.s || 1;
var hide = new THREE.MeshStandardMaterial({ color: o.col || 0x2A2236, roughness: 0.55, metalness: 0.15 }), band = new THREE.MeshStandardMaterial({ color: o.band || 0x6A4AA8, roughness: 0.4, metalness: 0.3, emissive: o.band || 0x6A4AA8, emissiveIntensity: 0.1 });
var fur = new THREE.MeshStandardMaterial({ color: 0x3A2E48, roughness: 0.9 }), eye = new THREE.MeshBasicMaterial({ color: o.eye || 0xC8A0FF });
var leather = new THREE.MeshStandardMaterial({ color: 0x5A3A26, roughness: 0.7 }), gold = new THREE.MeshStandardMaterial({ color: 0xC8A050, roughness: 0.35, metalness: 0.8 });
var body = new THREE.Group();
body.position.y = 1.15;
g.add(body);
var ab = new THREE.Mesh(new THREE.SphereGeometry(1, seg + 4, seg), new THREE.MeshStandardMaterial({ map: udspSkin(o.band || 0x6A4AA8), roughness: 0.6, metalness: 0.1 }));
ab.rotation.x = -Math.PI / 2;
ab.scale.set(1.05, 1.35, 0.88);
ab.position.set(0, 0.35, -1.55);
body.add(ab);
if (!lite)
[0, 1, 2].forEach(function (i) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.95 - i * 0.18, 0.03, 4, seg + 6), band); r.scale.set(1.15, 1, 1); r.rotation.x = Math.PI / 2 - 0.5; r.position.set(0, 0.75 + i * 0.12, -1.25 - i * 0.35); body.add(r); });
if (!lite) {
var br = [];
for (var h = 0; h < 140; h++) {
var u = (h * 0.618) % 1 * Math.PI * 2, w = ((h * 0.382) % 1) * Math.PI * 0.9, bx = Math.sin(w) * Math.cos(u) * 1.05, by = Math.cos(w) * 0.88 + 0.35, bz = Math.sin(w) * Math.sin(u) * 1.35 - 1.55;
if (by < 0.2)
continue;
br.push(new THREE.Vector3(bx, by, bz), new THREE.Vector3(bx * 1.12, by + 0.14, bz * 1.06 + (-1.55) * -0.06));
}
body.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(br), new THREE.LineBasicMaterial({ color: 0x8A7AA8, transparent: true, opacity: 0.55 })));
}
var mk = new THREE.Mesh(new THREE.SphereGeometry(0.35, seg, 8), band);
mk.scale.set(1, 0.4, 1.4);
mk.position.set(0, 1.18, -1.7);
body.add(mk);
var th = new THREE.Mesh(new THREE.SphereGeometry(0.85, seg + 2, seg), fur);
th.scale.set(1, 0.62, 1.05);
th.position.set(0, 0, 0.25);
body.add(th);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.48, seg, seg - 2), hide);
hd.scale.set(1, 0.8, 0.95);
hd.position.set(0, 0.02, 1.15);
body.add(hd);
[[-0.17, 0.2, 1.55, 0.09], [0.17, 0.2, 1.55, 0.09], [-0.3, 0.26, 1.42, 0.06], [0.3, 0.26, 1.42, 0.06], [-0.1, 0.3, 1.5, 0.05], [0.1, 0.3, 1.5, 0.05], [-0.38, 0.14, 1.3, 0.05], [0.38, 0.14, 1.3, 0.05]].forEach(function (e) { var m = new THREE.Mesh(new THREE.SphereGeometry(e[3], 8, 6), eye); m.position.set(e[0], e[1], e[2]); body.add(m); });
[-1, 1].forEach(function (sd) { var f = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.4, 6), hide); f.rotation.x = Math.PI * 0.85; f.position.set(sd * 0.14, -0.25, 1.5); body.add(f); });
var sad = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.22, seg), leather);
sad.scale.set(1, 1, 1.3);
sad.position.set(0, 0.58, 0.15);
body.add(sad);
var cant = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 5, seg, Math.PI), leather);
cant.position.set(0, 0.66, -0.42);
body.add(cant);
var pom = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), gold);
pom.position.set(0, 0.82, 0.62);
body.add(pom);
var harn = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.035, 4, seg + 6), gold);
harn.scale.set(1, 1.05, 1);
harn.rotation.y = Math.PI / 2;
harn.position.set(0, 0, 0.25);
body.add(harn);
if (!lite) {
var cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.9), new THREE.MeshStandardMaterial({ color: o.cloth || 0x3A4A8A, roughness: 0.8, side: THREE.DoubleSide }));
cloth.rotation.x = -Math.PI / 2 + 0.25;
cloth.position.set(0, 0.5, -0.15);
body.add(cloth);
}
var legs = [];
for (var i = 0; i < 8; i++) {
var sd = i < 4 ? -1 : 1, k = i % 4, base = [0.75, 0.3, -0.15, -0.55][k], spread = [0.75, 0.25, -0.25, -0.7][k];
var hip = new THREE.Group();
hip.rotation.order = "YXZ";
hip.position.set(sd * 0.6, 0, base);
var phi = Math.atan2(-sd * Math.cos(spread), -Math.sin(spread));
hip.rotation.y = phi;
body.add(hip);
var up = new THREE.Group();
up.rotation.x = -1.25;
hip.add(up);
var u = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 1.5, 6), fur);
u.position.y = 0.75;
up.add(u);
var knee = new THREE.Group();
knee.position.y = 1.5;
up.add(knee);
var kn = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 5), band);
knee.add(kn);
var low = new THREE.Group();
low.rotation.x = -1.2;
knee.add(low);
var l = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 1.9, 6), hide);
l.position.y = 0.95;
low.add(l);
var ank = new THREE.Group();
ank.position.y = 1.9;
ank.rotation.x = 0.6;
low.add(ank);
var an = new THREE.Mesh(new THREE.SphereGeometry(0.075, 6, 5), band);
ank.add(an);
var ft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.025, 0.75, 5), fur);
ft.position.y = 0.37;
ank.add(ft);
legs.push({ hip: hip, up: up, low: low, phi: phi, ph: (k % 2 ? Math.PI : 0) + (sd > 0 ? Math.PI : 0), sd: sd });
}
g.scale.setScalar(s);
g.userData.legs = legs;
g.userData.body = body;
g.userData.t = 0;
g.traverse(function (m) { m.raycast = function () { }; if (m.material && m.material.userData)
m.material.userData.noPhoto = 1; });
return g;
},
function (g, dt, v) {
var u = g.userData;
if (!u.legs)
return;
u.t += dt * (0.9 + Math.min(6, v) * 1.6);
var a = Math.min(1, v / 2), t = u.t;
u.legs.forEach(function (L) { var p = t + L.ph; var lift = Math.max(0, Math.sin(p)) * a; L.up.rotation.x = -1.25 + lift * 0.3; L.low.rotation.x = -1.2 - lift * 0.12; L.hip.rotation.y = L.phi + Math.cos(p) * 0.2 * a * L.sd; });
u.body.position.y = 1.15 + Math.sin(t * 2) * 0.04 * a + Math.sin(t * 0.7) * 0.02;
},
function () {
if (!UDSP.hire)
return false;
if (typeof DRIVE !== "undefined" && DRIVE.on) {
setStatus("Get out of what you are driving first.");
return false;
}
if (typeof riding !== "undefined" && riding && !udspOn()) {
setStatus("Get off what you are riding first.");
return false;
}
riding = "Giant spider";
rideSpeed = UDSP.speed;
rideArch = "udspider";
if (rideG) {
scene.remove(rideG);
rideG = null;
}
udspPark(null);
udspLook("udspider");
udspPaint();
return true;
},
function (park) {
var P = camera.position, feet = P.y - 1.72 - (udspOn() ? RIDE_SEAT.udspider : 0);
if (udspOn()) {
riding = null;
rideSpeed = 1;
rideArch = null;
if (rideG) {
scene.remove(rideG);
rideG = null;
}
udspLook(null);
}
if (park && UDSP.hire)
udspPark({ x: P.x + Math.cos(yaw) * 3.4, y: feet, z: P.z - Math.sin(yaw) * 3.4, ry: yaw + Math.PI });
udspPaint();
},
function (free) {
UDSP.hire = { until: Date.now() + UDSP.mins * 60000, free: !!free };
UDSP.warned = false;
if (udspMount())
setStatus("<b>🕷️ Up into the saddle.</b> The spider is yours for half an hour. It runs where you walk" + (udspPhone() ? "" : " (Shift runs faster still)") + "; it waits at the door when you go inside. Get off from the button or the Menu.");
},
function (R) {
var on = udspOn(), h = "<div style='font:600 17px var(--serif,Georgia);color:#E8D8FF'>" + esc(R.name) + "</div>" +
"<div style='margin:6px 0 10px;color:#CFC4E4;font-size:14px;line-height:1.45'>House Ostrael's great riding spiders: saddled, harnessed and gentle as lambs (if very large lambs). " +
UDSP.price + " gold for half an hour. It carries you at a run anywhere in the Underdark and waits at the door when you go inside.</div>", fns = {};
var keeper = typeof isKeeperNow === "function" && isKeeperNow();
if (UDSP.hire) {
h += "<div style='color:#E8C870;margin-bottom:8px'>Your spider is yours for " + udspLeft() + " more minute" + (udspLeft() === 1 ? "" : "s") + ".</div>";
if (!on) {
h += worldBtn("on", "🕷️ Get back on", "");
fns.on = function () { worldCard(null); udspMount(); setStatus("<b>Back in the saddle.</b>"); };
}
h += worldBtn("back", "Give the spider back", "");
fns.back = function () { worldCard(null); udspEnd("<b>" + esc(R.keeper) + " takes the reins.</b> The spider settles into its silk with a contented click."); };
}
else {
h += worldBtn("hire", keeper ? "🕷️ Ride a spider (free for the Keeper)" : "🕷️ Hire a spider (" + UDSP.price + " gold, half an hour)", "");
fns.hire = function () { worldCard(null); udspHire(R); };
}
worldCard(h, fns);
},
function (R) {
var keeper = typeof isKeeperNow === "function" && isKeeperNow();
if (typeof DRIVE !== "undefined" && DRIVE.on) {
setStatus("Get out of what you are driving first.");
return;
}
if (typeof riding !== "undefined" && riding) {
setStatus("Get off what you are riding first: the spiders do not share.");
return;
}
if (typeof signedIn === "function" && !signedIn()) {
if (keeper) {
udspStart(true);
return;
}
setStatus("<b>" + esc(R.keeper) + ":</b> \"The roost keeps its books by name. Join Somnucor first, and come back.\"");
return;
}
setStatus("<b>" + esc(R.keeper) + "</b> checks the harness...");
cityRpc("ud_spider_hire", {}).then(function (r) {
if (r && r.ok) {
udspStart(!!r.keeper);
if (typeof refreshGold === "function")
try {
refreshGold();
}
catch (e) { }
}
else
setStatus("<b>" + esc(R.keeper) + ":</b> \"" + esc((r && r.say) || "Not today, I'm afraid.") + "\"");
}).catch(function (e) {
if (keeper) {
udspStart(true);
return;
}
setStatus("<b>" + esc(R.keeper) + ":</b> \"The roost's book is closed just now. Try again in a little while.\"");
});
},
function () {
var show = !!UDSP.hire && udspHere() && !udspInside();
if (!UDSP.btn && show) {
var b = document.createElement("button");
b.id = "udsp-btn";
b.type = "button";
b.style.cssText = "position:fixed;right:10px;top:118px;z-index:30;padding:8px 12px;border-radius:12px;border:1px solid #8A6AC8;background:rgba(26,18,38,.88);color:#EADCFF;font:600 14px system-ui,sans-serif;cursor:pointer";
b.addEventListener("click", function () { udspToggle(); });
document.body.appendChild(b);
UDSP.btn = b;
}
if (!UDSP.btn)
return;
UDSP.btn.style.display = show ? "" : "none";
UDSP.btn.textContent = udspOn() ? "🕷️ Get off the spider" : "🕷️ Ride your spider";
},
function (root, R) {
var p = udspRoostAt(R), p2 = (typeof udsClear === "function") ? udsClear(p[0], p[1], 7) : p, x = p2[0], z = p2[1], y = udHeight(x, z);
if (!(y > -900))
y = UDC.y;
var face = Math.atan2(UDC.cx - x, UDC.cz - z), G = new THREE.Group();
G.position.set(x, y, z);
G.rotation.y = face;
root.add(G);
var lite = UDX.lite, wood = udxMat(0x3A2E3E, "wood"), silkL = new THREE.LineBasicMaterial({ color: 0xD8D0F0, transparent: true, opacity: 0.55 }), stone = udxMat(0x3A3446, "stone");
var n = lite ? 6 : 8;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, px = Math.cos(a) * 7, pz = Math.sin(a) * 7;
udxCyl(0.16, 0.24, 7.5, wood, px, 3.75, pz, G, 7);
udxGlow(G, 0xB8A0FF, 1.1, 0.4, px, 7.7, pz);
if (!lite) {
var sp = [];
for (var w2 = 0; w2 <= 24; w2++) {
var t2 = w2 / 24;
sp.push(new THREE.Vector3(px + Math.cos(t2 * 18) * 0.22, 1 + t2 * 6, pz + Math.sin(t2 * 18) * 0.22));
}
G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sp), silkL));
}
var c = Math.cos(face), s = Math.sin(face);
UD.solids.push({ x: x + px * c + pz * s, z: z - px * s + pz * c, r: 0.5 });
}
udsWeb(G, 0, 7.6, 0, 7.2, 0xD8D0F0);
var fl = new THREE.Mesh(new THREE.CircleGeometry(7.6, lite ? 24 : 40), udxMat(0x2E2836, "paving"));
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.04;
G.add(fl);
var spots = lite ? [[-3.2, -1.8, 0.6]] : [[-3.4, -1.6, 0.7], [3.2, -2.2, -0.5], [0.2, -4.2, 3.0]];
spots.forEach(function (q, i) {
var m = udspModel({ col: [0x2A2236, 0x22263A, 0x2E2232][i % 3], band: [0x6A4AA8, 0x3A6AB8, 0xA84A8A][i % 3], cloth: [0x3A4A8A, 0x6A2A4A, 0x2A5A4A][i % 3] });
m.position.set(q[0], 0, q[1]);
m.rotation.y = q[2];
G.add(m);
UDX.anim.push({ fn: (function (mm, k) { return function (dt, now) { if (mm.parent && mm.parent.visible !== false) {
mm.userData.body.position.y = 1.15 + Math.sin(now * 0.8 + k) * 0.03;
} }; })(m, i) });
var c = Math.cos(face), s = Math.sin(face);
UD.solids.push({ x: x + q[0] * c + q[1] * s, z: z - q[0] * s + q[1] * c, r: 1.9 });
});
udxBox(2.6, 1.05, 0.8, wood, 0, 0.52, 3.4, G);
udxBox(2.8, 0.08, 1, udxMat(0x5A4A3A, "wood"), 0, 1.08, 3.4, G);
var hx = "#C8B0FF";
var sg = udxSign(G, [R.name, "Giant spiders for hire: " + UDSP.price + " gold, half an hour"], 4.2, 0.9, 0, 3.2, 4.0, 0, "#140E1C", hx);
udxGlow(G, 0xFFC890, 2, 0.5, 0, 2.4, 3.6);
var c = Math.cos(face), s = Math.sin(face), W = function (lx, lz) { return [x + lx * c + lz * s, z - lx * s + lz * c]; };
var kp = W(0, 2.6), w = wPerson("udsp_" + R.key, { sex: R.key === "city" ? "f" : "m", look: UD_ELF(R.key === "city" ? 0x2A3A6A : 0x3A2A4A, R.key === "city" ? 1 : 0, R.key === "city" ? 2 : 5) });
w.position.set(kp[0], y, kp[1]);
w.rotation.y = face;
root.add(w);
var P = { g: w, wander: null };
UD.people.push(P);
UD.talkers.push({ p: P, r: 3.6, name: R.keeper, t: udxPersona(R.keeper + " of House Ostrael", R.key === "city" ? "the roostmistress of the Silkrider Roost in Zhaelvorn, who keeps House Ostrael's great riding spiders and hires them out to riders (15 gold for half an hour; the Keeper rides free). Warm, brisk, proud of every one of her spiders by name (Velvet, Lantern and Old Cobble are resting here today). You explain that the spiders are gentle and well trained, that they wait at the door while a rider goes into a building, and real facts about spiders: eight legs, most have eight eyes, they spin silk from glands called spinnerets, and spider silk is stronger than steel for its weight." : "the roost-hand at the Stair-foot Roost at the bottom of the long stair into Zhaelvorn, who hires out House Ostrael's riding spiders to travellers just arrived (15 gold for half an hour; the Keeper rides free). Cheerful, a bit shy, loves the spiders more than people. You point visitors to the city gate and tell them a spider is the fastest way to see the cavern.", R.key === "city" ? "Fancy a ride? Velvet's rested and Lantern's itching to run. Fifteen gold for half an hour; walk up to the desk." : "Long stair, wasn't it? Hire a spider and you'll be at the city gate before your legs stop shaking. Fifteen gold, half an hour.") });
var dp = W(0, 4.3);
UD.talkers.push({ x: dp[0], z: dp[1], r: 3.2, name: R.name, verb: "hire a giant spider", fn: function () { udspCard(R); } });
UDSP.roosts.push({ key: R.key, name: R.name, x: x, z: z });
},
function (G) {
if (typeof hxWrapKeeper !== "function")
return;
UD.talkers.forEach(function (T) { if (T.udxStall)
return; });
(UDC.bazaar || []).forEach(function (b) { var id = b.id; if (!HX_STALLS[id])
return; UD.talkers.push({ x: b.cx, z: b.cz, r: 1.8, name: HX_STALLS[id].name, verb: "trade", fn: hxStallTalk(id), udxStall: 1 }); });
hxWrapKeeper("underdark", "Velra, a web-weaver", [["🛒 Trade at Velra's silks", "Spider silk and silk cloth; she buys silk and lizard scales", hxStallTalk("bz_velra")]]);
hxWrapKeeper("underdark", "crystal-glass maker of the Silk Bazaar", [["🛒 Trade at Glass of the Deep", "Crystal and cut gems", hxStallTalk("bz_glass")]]);
hxWrapKeeper("underdark", "silversmith of the Silk Bazaar", [["🛒 Trade at Silver of Zhaelvorn", "Deepsilver and ore", hxStallTalk("bz_silver")]]);
hxWrapKeeper("underdark", "cordial-seller of the Silk Bazaar", [["🛒 Trade at Mushroom cordials", "Glowcaps; she buys caps and fish", hxStallTalk("bz_cordial")]]);
if (G)
G.children.forEach(function (c) { if (c === UDX.root)
return; for (var i = 0; i < UDX.areas.length; i++) {
var A = UDX.areas[i];
if (A.kind === "inside" && udxIn(A, c.position.x, c.position.z)) {
c.userData.udxStay = 1;
break;
}
} });
},
function (A) {
if (typeof hxWrapKeeper !== "function")
return;
var anv = UDD.forges && UDD.forges[0];
if (anv)
udxTalk(A, { x: anv.x, z: anv.z + 2.4, r: 2.2, name: "The Anvils' counter", verb: "trade", fn: hxStallTalk("sh_anvils") });
hxWrapKeeper("underdark", "Thrain Hammerfell, master smith of the Hall of Anvils", [["⚒️ Work at the forge", "Weapons, armour, smelting", function () { if (typeof craftOpen === "function")
craftOpen("cinderwell"); }], ["🛒 The Anvils' counter", "Ore, coal, deepsilver", hxStallTalk("sh_anvils")]]);
hxWrapKeeper("underdark", "Marta Copperkettle, keeper of the Copper Flagon", [["🛒 The kitchen door", "Glowcaps; she buys caps and fish", hxStallTalk("sh_flagon")]]);
if (UDD.forges)
UDD.forges.forEach(function (F, i) { if (i % 2)
return; udxTalk(A, { x: F.x, z: F.z - 2.4, r: 2, name: "A forge in the Hall of Anvils", verb: "work at the forge and make something", fn: function () { if (typeof craftOpen === "function")
craftOpen("cinderwell"); } }); });
},
function () {
var B = UDX_ARCH;
B.n = 0;
B.score = 0;
B.on = true;
B.shots = [];
var best = 0;
try {
best = +localStorage.getItem("sm.udx.archery") || 0;
}
catch (e) { }
function draw(msg) {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#F0C8C8'>The Thornyard's archery butts</div><div style='opacity:.85;margin:4px 0 8px'>Five arrows. The sight drifts slowly across the target: loose when it is over the gold. " + (best ? "Your best: " + best + " of 50." : "") + "</div>" +
"<div style='position:relative;height:44px;border-radius:22px;background:linear-gradient(90deg,#E8E8E0 0 10%,#2A2A2A 10% 22%,#3A6AC8 22% 34%,#C83A3A 34% 44%,#F0C830 44% 56%,#C83A3A 56% 66%,#3A6AC8 66% 78%,#2A2A2A 78% 90%,#E8E8E0 90%);margin:8px 0'>" +
"<div id='udx-sight' style='position:absolute;top:-4px;width:4px;height:52px;background:#fff;box-shadow:0 0 0 2px #000;left:0'></div></div>" +
"<div>Arrow " + Math.min(5, B.n + 1) + " of 5 · score " + B.score + (B.shots.length ? " (" + B.shots.join(", ") + ")" : "") + "</div>" + (msg ? "<div style='margin-top:6px;color:#F0E0B0'>" + msg + "</div>" : "");
var fns = {};
if (B.n < 5) {
h += worldBtn("loose", "🏹 Loose!", "When the sight is on the gold");
fns.loose = loose;
}
else {
h += worldBtn("again", "Shoot again", "");
fns.again = function () { udxArchery(); };
}
worldCard(h, fns);
}
function pos() { return 0.5 + 0.5 * Math.sin(B.t * 1.6); }
function loop() { if (!B.on)
return; B.t += 0.016; var el = document.getElementById("udx-sight"); if (!el || !WLD.card || WLD.card.style.display !== "block") {
B.on = false;
return;
} el.style.left = "calc(" + (pos() * 100).toFixed(1) + "% - 2px)"; B.raf = requestAnimationFrame(loop); }
function loose() {
var d = Math.abs(pos() - 0.5), pts = d < 0.06 ? 10 : d < 0.16 ? 8 : d < 0.28 ? 6 : d < 0.4 ? 4 : d < 0.5 ? 2 : 0;
B.n++;
B.score += pts;
B.shots.push(pts);
udxTone(300 + pts * 40, 0.2);
var msg = pts === 10 ? "In the gold!" : pts >= 6 ? "A good shot." : pts ? "On the target." : "Missed the butt.";
if (B.n >= 5) {
msg += " Final score: " + B.score + " of 50.";
if (B.score > best) {
best = B.score;
try {
localStorage.setItem("sm.udx.archery", String(best));
}
catch (e) { }
msg += " Your best yet.";
}
if (B.score >= 40 && !udxFlag("archer")) {
udxFlag("archer", 1);
msg += " Captain Vessa nods: 'Spire Guard material.'";
}
}
draw(msg);
if (B.n < 5) {
B.on = true;
cancelAnimationFrame(B.raf);
loop();
}
else
B.on = false;
}
draw();
cancelAnimationFrame(B.raf);
loop();
},
function (x, z, feet) {
var A = udxAreaAt(x, z, feet);
if (A) {
if (A.height) {
if (A.height(x, z) === null && !udxRectAt(A, x, z, true))
return true;
}
else {
var r = udxRectAt(A, x, z, true);
if (!r || r.lock)
return true;
}
if (A.blockFn && A.blockFn(x, z, feet))
return true;
return worldSolidAt(A.solids, x, z, feet);
}
return worldSolidAt(UD.solids, x, z, feet);
},
function () {
if (!UD.people)
return;
for (var i = 0; i < UD.people.length; i++) {
var P = UD.people[i], g = P.g;
if (!P.wander || !g || !g.parent)
continue;
var p = g.position, u = g.userData.wan;
if (!P.udxSet) {
P.udxSet = 1;
if (udxWalkBlocked(p.x, p.z, p.y)) {
found: for (var r = 1.5; r <= 30; r += 1.5)
for (var a = 0; a < 12; a++) {
var x = p.x + Math.cos(a * 0.5236) * r, z = p.z + Math.sin(a * 0.5236) * r;
if (!udxWalkBlocked(x, z, p.y)) {
p.x = x;
p.z = z;
if (u) {
u.hx = u.tx = x;
u.hz = u.tz = z;
}
break found;
}
}
}
}
if (!u || (u.tx === u.ckx && u.tz === u.ckz))
continue;
if (!udxWalkFree(p.x, p.z, u.tx, u.tz, p.y)) {
u.tx = p.x;
u.tz = p.z;
}
u.ckx = u.tx;
u.ckz = u.tz;
}
},
function (A) {
var L = A && A.lg;
if (!L || !A.built || !A.g || A === UDX.here)
return false;
if (udxLgSig(A) !== L.sig) {
A.lg = null;
return false;
}
var G = A.g;
if (G.parent)
G.parent.remove(G);
G.traverse(function (m) {
if (m.geometry && m.geometry.dispose && !m.geometry.userData.shared && !(typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(m.geometry)))
m.geometry.dispose();
var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []);
ms.forEach(function (mt) { if (mt.map && mt.map.isCanvasTexture)
mt.map.dispose(); });
});
L.added.forEach(function (a) { var gone = new Set(a[1]), keep = a[0].filter(function (e) { return !gone.has(e); }); a[0].length = 0; Array.prototype.push.apply(a[0], keep); });
for (var k in L.len)
if (Array.isArray(A[k]) && A[k].length > L.len[k])
A[k].length = L.len[k];
A.g = null;
A.built = false;
A.lg = null;
var areas = UDX.areas.slice(), by = {};
for (var b in UDX.by)
by[b] = UDX.by[b];
try {
if (typeof worldForget === "function")
worldForget(G);
}
catch (e) { }
UDX.areas.length = 0;
Array.prototype.push.apply(UDX.areas, areas);
for (var b2 in by)
UDX.by[b2] = by[b2];
UDX_LG.n++;
return true;
},
function (x, z) {
if (x < -47 && x > -53 && z < -72.3)
return "the Old Workings";
if (z < -115 && z > -119 && x < -6)
return "the Old Workings";
if (z < -110 && Math.abs(x) < 7)
return "a carved chamber, older than the mine";
if (x > 69)
return "No. 2 East Stope";
if (x > 6 && z < -30)
return "the East Drift";
if (x < -99)
return "the pump station";
if (x < -6 && z < -60)
return "the West Drift";
if (x < -6 && z < -20)
return "the crib room";
if (x < -6)
return "the lamp room";
if (x > 6)
return "the onsetter's cabin";
if (z < -100)
return "No. 1 Face";
if (z > -15)
return "the pit bottom";
return "the main drift";
},
function (x, z, need) {
var h = udHeight(x, z);
if (h < -900)
return null;
if (typeof udRiftAt === "function" && udRiftAt(x, z))
return null;
if (Math.hypot(x - UD_LAKE.x, z - UD_LAKE.z) < UD_LAKE.r + 30 && h < UD_LAKE_Y + 0.4)
return null;
if (x > UD_SEA_X - 2 && Math.abs(z - UD_GLIM.z) < 260)
return null;
if (typeof udsColHit === "function" && typeof UDC !== "undefined" && udsColHit(x, z, h))
return null;
if (typeof UDC !== "undefined" && UDC.cols)
for (var c = 0; c < UDC.cols.length; c++) {
var C = UDC.cols[c];
if (C.foot > 1.2 && Math.hypot(x - C.x, z - C.z) < C.foot * 1.15 + need)
return null;
}
for (var a = 0; a < 8; a++) {
var an = a / 8 * 6.283, px = x + Math.cos(an) * need, pz = z + Math.sin(an) * need;
if (udxWalkBlocked(px, pz, h + 0.3))
return null;
var h2 = udHeight(px, pz);
if (h2 < -900 || Math.abs(h2 - h) > 1.2)
return null;
}
if (udxWalkBlocked(x, z, h + 0.3))
return null;
for (var t = 0; t < UD.talkers.length; t++) {
var T = UD.talkers[t], tx = T.p && T.p.g ? T.p.g.position.x : T.x, tz = T.p && T.p.g ? T.p.g.position.z : T.z;
if (tx != null && Math.hypot(x - tx, z - tz) < (T.r || 2) + need + 1)
return null;
}
for (var p = 0; p < UD.people.length; p++) {
var g = UD.people[p].g;
if (g && !UD.people[p].wander && Math.hypot(x - g.position.x, z - g.position.z) < need + 0.8)
return null;
}
return h;
},
function (r, h, R) {
var g = new THREE.CylinderGeometry(r * 0.08, r, h, 8, 5), P = g.attributes.position, v = new THREE.Vector3(), off = {};
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i);
var k = Math.round(v.x * 40) + "," + Math.round(v.y * 40) + "," + Math.round(v.z * 40);
if (off[k] === undefined) {
var t = (v.y + h / 2) / h;
off[k] = 1 + (R() - 0.5) * 0.35 + (Math.sin(t * 14) * 0.08);
}
v.x *= off[k];
v.z *= off[k];
P.setXYZ(i, v.x, v.y, v.z);
}
g.computeVertexNormals();
return g;
},
function (G, A, x, y, z, R) {
var n = 3 + Math.floor(R() * 4), col = UDW_PAL.cap[Math.floor(R() * 4)];
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = i ? 0.6 + R() * 1.6 : 0, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, s = i ? 0.5 + R() * 0.9 : 1.4 + R() * 1.2, h = s * (1.6 + R() * 0.8);
udwCyl(G, 0.09 * s, 0.14 * s, h, UDW_PAL.capStem, px, y + h / 2, pz, 6, { e: col, ei: 0.08 });
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.75 * s, 10, 5, 0, 6.283, 0, 1.25), udwMat(col, { e: col, ei: 0.55 }));
cap.scale.y = 0.55;
cap.position.set(px, y + h - 0.05 * s, pz);
G.add(cap);
}
udwSolid(A, x, z, 1.0);
},
function (G, A, x, y, z, R) {
var n = 1 + Math.floor(R() * 3);
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = i ? 0.9 + R() * 1.2 : 0, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d, h = i ? 1.2 + R() * 2.2 : 3 + R() * 4, r = h * (0.16 + R() * 0.08);
var m = new THREE.Mesh(udwSpike(r, h, R), udwMat(i % 2 ? UDW_PAL.rock : UDW_PAL.rock2));
m.position.set(px, y + h / 2 - 0.1, pz);
m.rotation.z = (R() - 0.5) * 0.12;
m.rotation.y = R() * 6;
G.add(m);
}
if (R() < 0.6) {
var wb = new THREE.Group();
udsWeb(wb, x + 0.5, y + 2.2, z, 1.2, UDW_PAL.silk);
wb.children.forEach(function (l) { l.userData.udwKeep = 1; });
G.add(wb);
}
udwSolid(A, x, z, 1.1);
},
function (G, A, x, y, z, R, col) {
col = col || [0xB890FF, 0x70E0E8, 0xE0A0FF][Math.floor(R() * 3)];
udwCyl(G, 0.06, 0.09, 3.4, UDW_PAL.iron, x, y + 1.7, z, 6);
udwBox(G, 0.7, 0.06, 0.06, UDW_PAL.iron, x + 0.3, y + 3.35, z);
var orb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), udwMat(col, { basic: 1 }));
orb.position.set(x + 0.6, y + 3.05, z);
G.add(orb);
G.userData.glows.push([col, 2.4, 0.55, x + 0.6, y + 3.05, z]);
udwSolid(A, x, z, 0.25);
},
function (G, A, x, y, z, R) {
var ry = R() * 3.14, c = Math.cos(ry), s = Math.sin(ry), w = 3.2;
[-1, 1].forEach(function (k) { udwCyl(G, 0.06, 0.07, 2.6, UDW_PAL.wood, x + c * k * w / 2, y + 1.3, z - s * k * w / 2, 6); });
udwBox(G, w, 0.06, 0.06, UDW_PAL.wood, x, y + 2.55, z, ry);
var cl = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.3, 1.7), udwMat([UDW_PAL.silk, 0xC8B8E8, 0xB8D8E0][Math.floor(R() * 3)], { ds: 1, e: 0x302040, ei: 0.4 }));
cl.position.set(x, y + 1.65, z);
cl.rotation.y = ry;
G.add(cl);
udwSolid(A, x + c * w / 2, z - s * w / 2, 0.3);
udwSolid(A, x - c * w / 2, z + s * w / 2, 0.3);
udwSolid(A, x, z, 0.45);
},
function (G, A, x, y, z, R) {
var ry = R() * 6.28, g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
udwBox(g, 1.6, 0.12, 1.0, UDW_PAL.wood2, 0, 0.6, 0);
udwBox(g, 1.6, 0.35, 0.06, UDW_PAL.wood, 0, 0.82, 0.47);
udwBox(g, 1.6, 0.35, 0.06, UDW_PAL.wood, 0, 0.82, -0.47);
[-1, 1].forEach(function (k) { var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 12), udwMat(UDW_PAL.wood)); wh.rotation.x = Math.PI / 2; wh.position.set(0, 0.42, k * 0.56); g.add(wh); });
udwBox(g, 1.4, 0.05, 0.05, UDW_PAL.wood, 1.4, 0.7, 0.3);
udwBox(g, 1.4, 0.05, 0.05, UDW_PAL.wood, 1.4, 0.7, -0.3);
for (var i = 0; i < 3; i++)
udwBox(g, 0.42, 0.38, 0.42, [0x6A5A48, 0x5A4A6A, 0x7A6A50][i], -0.45 + i * 0.45, 0.88, (R() - 0.5) * 0.3, R());
udwSolid(A, x, z, 1.2);
},
function (G, A, x, y, z, R) {
var n = 2 + Math.floor(R() * 3);
for (var i = 0; i < n; i++) {
var px = x + (R() - 0.5) * 1.8, pz = z + (R() - 0.5) * 1.8;
if (R() < 0.5) {
var s = 0.6 + R() * 0.3;
udwBox(G, s, s, s, UDW_PAL.wood2, px, y + s / 2, pz, R());
if (R() < 0.4)
udwBox(G, 0.5, 0.5, 0.5, UDW_PAL.wood, px, y + s + 0.25, pz, R());
}
else
udwCyl(G, 0.32, 0.32, 0.9, 0x5A3E2A, px, y + 0.45, pz, 10);
}
udwSolid(A, x, z, 1.2);
},
function (G, A, x, y, z, R) {
udwCyl(G, 0.08, 0.12, 0.9, UDW_PAL.iron, x, y + 0.45, z, 6);
udwCyl(G, 0.55, 0.3, 0.35, UDW_PAL.iron, x, y + 1.05, z, 10);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 8), udwMat(0xB070FF, { basic: 1 }));
fl.position.set(x, y + 1.5, z);
G.add(fl);
G.userData.glows.push([0xC890FF, 3.2, 0.6, x, y + 1.6, z]);
udwSolid(A, x, z, 0.6);
},
function (G, A, x, y, z, R) {
var n = 3 + Math.floor(R() * 4), col = [0xC8B8FF, 0x9AE8F0, 0xE8B8F0][Math.floor(R() * 3)];
for (var i = 0; i < n; i++) {
var h = 0.4 + R() * 1.4, m = new THREE.Mesh(new THREE.ConeGeometry(0.12 + R() * 0.12, h, 5), udwMat(col, { e: col, ei: 0.6 }));
m.position.set(x + (R() - 0.5) * 0.9, y + h / 2, z + (R() - 0.5) * 0.9);
m.rotation.set((R() - 0.5) * 0.7, R() * 3, (R() - 0.5) * 0.7);
G.add(m);
}
G.userData.glows.push([col, 1.6, 0.35, x, y + 0.8, z]);
},
function (G, A, x, y, z, R) {
var ry = R() < 0.5 ? 0 : Math.PI / 2, c = Math.cos(ry), s = Math.sin(ry);
for (var k = -3; k <= 3; k++)
udwBox(G, 1.6, 0.08, 0.22, UDW_PAL.wood, x + s * k * 0.7, y + 0.04, z + c * k * 0.7, ry);
[-0.5, 0.5].forEach(function (o) { udwBox(G, 0.06, 0.08, 4.6, 0x5A5A62, x + c * o, y + 0.12, z - s * o, ry); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
udwBox(g, 1.1, 0.7, 1.5, 0x4A3A2A, 0, 0.75, 0);
udwBox(g, 1.12, 0.06, 1.52, UDW_PAL.iron, 0, 1.1, 0);
var ore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55, 0), udwMat(0x5A5060));
ore.scale.set(0.9, 0.5, 1.2);
ore.position.set(0, 1.15, 0);
g.add(ore);
udwSolid(A, x, z, 1.0);
},
function (G, A, x, y, z, R) {
var n = 4 + Math.floor(R() * 4);
for (var i = 0; i < n; i++) {
var r = 0.25 + R() * 0.45, m = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), udwMat([0x4A4450, 0x6A5A48, 0x3A3A44][i % 3]));
m.position.set(x + (R() - 0.5) * 1.4, y + r * 0.6, z + (R() - 0.5) * 1.4);
m.rotation.set(R() * 3, R() * 3, R() * 3);
G.add(m);
}
udwSolid(A, x, z, 0.9);
},
function (G, A, x, y, z, R) {
var ry = R() * 3.14;
udwBox(G, 1.8, 0.08, 0.3, UDW_PAL.wood, x, y + 1.6, z, ry);
udwBox(G, 1.8, 0.08, 0.3, UDW_PAL.wood, x, y + 0.3, z, ry);
var c = Math.cos(ry), s = Math.sin(ry);
[-0.85, 0.85].forEach(function (k) { udwBox(G, 0.08, 1.8, 0.3, UDW_PAL.wood, x + c * k, y + 0.9, z - s * k, ry); });
for (var i = 0; i < 4; i++) {
var t = -0.6 + i * 0.4, m = udwBox(G, 0.05, 1.3, 0.05, 0x6A5030, x + c * t, y + 0.95, z - s * t, ry);
m.rotation.z = 0.15;
udwBox(G, 0.25, 0.12, 0.06, 0x5A5A62, x + c * t, y + 1.6, z - s * t, ry);
}
udwSolid(A, x, z, 0.9);
},
function (G, A, x, y, z, R, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry != null ? ry : R() * 6.28;
G.add(g);
var hull = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), udwMat(0x6A4A30));
hull.scale.set(0.9, 0.5, 2.6);
hull.position.y = 0.45;
g.add(hull);
udwBox(g, 1.5, 0.06, 0.25, UDW_PAL.wood2, 0, 0.4, 0.6);
udwBox(g, 1.5, 0.06, 0.25, UDW_PAL.wood2, 0, 0.4, -0.8);
var oar = udwBox(g, 0.06, 0.06, 2.6, UDW_PAL.wood, 0.5, 0.5, 0);
oar.rotation.y = 0.2;
if (A !== "water")
udwSolid(null, x, z, 1.6);
},
function (G, A, x, y, z, R) {
var ry = R() * 3.14, c = Math.cos(ry), s = Math.sin(ry);
[-1.6, 0, 1.6].forEach(function (k) { udwCyl(G, 0.05, 0.06, 2.2, UDW_PAL.wood, x + c * k, y + 1.1, z - s * k, 6); });
udwBox(G, 3.4, 0.05, 0.05, UDW_PAL.wood, x, y + 2.15, z, ry);
var n = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6, 1, 1), udwMat(0x7A8A80, { ds: 1, op: 0.75, basic: 1 }));
n.position.set(x, y + 1.35, z);
n.rotation.y = ry;
n.userData.udwKeep = 1;
G.add(n);
udwSolid(A, x, z, 0.5);
udwSolid(A, x + c * 1.6, z - s * 1.6, 0.3);
udwSolid(A, x - c * 1.6, z + s * 1.6, 0.3);
},
function (G, A, x, y, z, R) {
var col = UDW_PAL.cap[Math.floor(R() * 4)], s = 0.35 + R() * 0.5, h = s * 1.8;
udwCyl(G, 0.07 * s, 0.1 * s, h, UDW_PAL.capStem, x, y + h / 2, z, 5, { e: col, ei: 0.08 });
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.7 * s, 8, 4, 0, 6.283, 0, 1.25), udwMat(col, { e: col, ei: 0.55 }));
cap.scale.y = 0.55;
cap.position.set(x, y + h, z);
G.add(cap);
},
function (G) {
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert(), rel = new THREE.Matrix4(), B = {}, order = [], drop = [];
G.traverse(function (m) {
if (!m.isMesh || m.userData.udwKeep)
return;
var mt = m.material;
if (!mt || Array.isArray(mt))
return;
var geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
rel.multiplyMatrices(inv, m.matrixWorld);
geo.applyMatrix4(rel);
if (!geo.attributes.normal)
geo.computeVertexNormals();
var k = mt.uuid;
if (!B[k]) {
B[k] = { mat: mt, list: [] };
order.push(k);
}
B[k].list.push(geo);
drop.push(m);
});
drop.forEach(function (m) { m.parent.remove(m); });
order.forEach(function (k) {
var b = B[k], n = 0;
b.list.forEach(function (q) { n += q.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), o = 0;
b.list.forEach(function (q) { pos.set(q.attributes.position.array, o * 3); nor.set(q.attributes.normal.array, o * 3); o += q.attributes.position.count; q.dispose(); });
var mg = new THREE.BufferGeometry();
mg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
mg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
mg.computeBoundingSphere();
var mesh = new THREE.Mesh(mg, b.mat);
mesh.name = "udw";
G.add(mesh);
UDW.meshes++;
});
},
function (G, P, R, list) {
var lite = UDX.lite, n = lite ? Math.ceil(P.np / 2) : P.np, cx = P.at[0], cz = P.at[1];
for (var k = 0, t = 0; k < n && t < n * 30; t++) {
var a = R() * 6.283, d = 4 + Math.sqrt(R()) * P.r * 0.8, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (P.shore)
x = Math.min(x, UD_SEA_X - 6);
var h = udwFree(x, z, 0.8);
if (h === null)
continue;
var o, sex = R() < 0.5 ? "f" : "m";
if (P.folk === "gnome" && typeof UD_GNOME === "function" && R() < 0.7)
o = { sex: sex, look: UD_GNOME([0x8A5A2A, 0x4A6A8A, 0x6A4A6A, 0x5A7A4A][k % 4]), scale: 0.62 };
else
o = { sex: sex, look: UD_ELF([0x3A2A5A, 0x2A3A5A, 0x4A2A4A, 0x2A2A3A, 0x2A4A3A][(k + t) % 5], sex === "f" ? 1 : 0, k) };
try {
var g = wPerson("udw_" + P.name.length + "_" + k, o);
g.position.set(x, h, z);
g.rotation.y = R() * 6.28;
G.add(g);
var wander = k % 3 === 0 ? { r: P.shore ? 6 : 10, sp: 1.1 } : null;
UD.people.push({ g: g, wander: wander });
k++;
}
catch (e) {
k++;
}
}
},
function (root, P, i) {
var lite = UDX.lite, R = udwRand(23112026 + i * 977), G = new THREE.Group();
G.name = "udw-" + i;
G.userData.glows = [];
root.add(G);
var want = lite ? Math.ceil(P.n / 2) : P.n, got = 0;
for (var t = 0; got < want && t < want * 40; t++) {
var a = R() * 6.283, d = 5 + Math.sqrt(R()) * P.r, x = P.at[0] + Math.cos(a) * d, z = P.at[1] + Math.sin(a) * d;
if (P.shore)
x = Math.min(x, UD_SEA_X - 4);
var kind = udwPick(P.kinds, R), need = kind === "caps" || kind === "stalag" ? 2.2 : kind === "nets" || kind === "silk" ? 2.4 : 1.8;
var h = udwFree(x, z, need);
if (h === null)
continue;
try {
UDW_PUT[kind](G, null, x, h, z, R);
got++;
UDW.n++;
}
catch (e) {
if (window.console)
console.warn("[underdark sweep]", kind, e);
}
}
if (!P.shore)
for (var t2 = 0, g2 = 0; g2 < (lite ? 18 : 40) && t2 < 400; t2++) {
var a2 = R() * 6.283, d2 = 3 + Math.sqrt(R()) * P.r, x2 = P.at[0] + Math.cos(a2) * d2, z2 = P.at[1] + Math.sin(a2) * d2, h3 = udwFree(x2, z2, 0.9);
if (h3 === null)
continue;
UDW_PUT[R() < 0.6 ? "cap1" : "rocks"](G, null, x2, h3, z2, R);
g2++;
}
if (P.shore) {
var jy = typeof UD_SEA_Y !== "undefined" ? UD_SEA_Y : -83;
[[UD_SEA_X + 7, UD_GLIM.z + 3.6, 0.08], [UD_SEA_X + 12, UD_GLIM.z - 3.6, -0.12], [UD_SEA_X + 17, UD_GLIM.z + 3.8, 0.15], [UD_SEA_X + 21, UD_GLIM.z - 3.8, -0.1]].forEach(function (q, j) {
if (lite && j % 2)
return;
UDW_PUT.boat(G, "water", q[0], jy - 0.1, q[1], R, q[2]);
udwCyl(G, 0.04, 0.04, 1.6, UDW_PAL.wood, q[0], jy + 1.0, q[1] + 0.9, 5);
var lo = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), udwMat(0xFFC878, { basic: 1 }));
lo.position.set(q[0], jy + 1.85, q[1] + 0.9);
G.add(lo);
G.userData.glows.push([0xFFC878, 2.2, 0.55, q[0], jy + 1.85, q[1] + 0.9]);
});
[[UD_SEA_X - 6, UD_GLIM.z + 14], [UD_SEA_X - 8, UD_GLIM.z - 16]].forEach(function (q) { var h2 = udwFree(q[0], q[1], 2.6); if (h2 !== null)
UDW_PUT.boat(G, null, q[0], h2 - 0.1, q[1], R, Math.PI / 2 + (R() - 0.5) * 0.5); });
}
udwMerge(G);
G.userData.glows.forEach(function (q) { udxGlow(G, q[0], q[1], q[2], q[3], q[4], q[5]); });
udwFolk(G, P, R);
},
function (root) {
var lite = UDX.lite, R = udwRand(9112026), G = new THREE.Group();
G.name = "udw-stair";
G.userData.glows = [];
root.add(G);
for (var z = -128; z > -234; z -= lite ? 14 : 7) {
var k = Math.round(-z / 7) % 2 ? 1 : -1, y = udHeight(0, z);
if (y < -900)
continue;
udwBox(G, 0.14, 0.5, 0.3, UDW_PAL.iron, k * 5.75, y + 2.3, z);
var orb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), udwMat(0xC8A8FF, { basic: 1 }));
orb.position.set(k * 5.5, y + 2.65, z);
G.add(orb);
G.userData.glows.push([0xB890FF, 2.6, 0.55, k * 5.4, y + 2.65, z]);
if (R() < 0.55) {
var cx = -k * (5.2 + R() * 0.4), n = 3 + Math.floor(R() * 3), col = [0xC8B8FF, 0x9AE8F0][Math.floor(R() * 2)];
for (var i = 0; i < n; i++) {
var h = 0.4 + R() * 1.0, m = new THREE.Mesh(new THREE.ConeGeometry(0.1 + R() * 0.1, h, 5), udwMat(col, { e: col, ei: 0.6 }));
m.position.set(cx + (R() - 0.5) * 0.4, y + h / 2 + R() * 0.6, z + (R() - 0.5) * 2);
m.rotation.set((R() - 0.5) * 0.6, R() * 3, -k * (0.3 + R() * 0.5));
G.add(m);
}
}
}
udwMerge(G);
G.userData.glows.forEach(function (q) { udxGlow(G, q[0], q[1], q[2], q[3], q[4], q[5]); });
},
function () {
var A = UDX.by && UDX.by.mine;
if (!A || !A.g)
return;
var lite = UDX.lite, R = udwRand(31112026), G = new THREE.Group();
G.name = "udw-stope";
G.userData.glows = [];
A.g.add(G);
var list = [["tub", 3], ["props", 3], ["orepile", 3], ["rack", 2], ["lamp", 3], ["crates", 2]], want = lite ? 7 : 15, got = 0;
for (var t = 0; got < want && t < want * 40; t++) {
var x = 70 + R() * 34, z = -120 + R() * 130;
var h = udxH(A, x, z);
if (h === null)
continue;
var kind = udwPick(list, R), ok = true;
for (var a = 0; a < 8 && ok; a++) {
var an = a / 8 * 6.283, px = x + Math.cos(an) * 1.8, pz = z + Math.sin(an) * 1.8;
if (udxWalkBlocked(px, pz, h + 0.3))
ok = false;
else {
var h2 = udxH(A, px, pz);
if (h2 === null || Math.abs(h2 - h) > 0.8)
ok = false;
}
}
for (var q = 0; q < A.talk.length && ok; q++) {
var T = A.talk[q], tx = T.p && T.p.g ? T.p.g.position.x : T.x, tz = T.p && T.p.g ? T.p.g.position.z : T.z;
if (tx != null && Math.hypot(x - tx, z - tz) < (T.r || 2) + 2.5)
ok = false;
}
if (!ok)
continue;
try {
UDW_PUT[kind](G, A, x, h, z, R);
got++;
UDW.n++;
}
catch (e) { }
}
udwMerge(G);
G.userData.glows.forEach(function (q) { udxGlow(G, q[0], q[1], q[2], q[3], q[4], q[5]); });
var nm = lite ? 2 : 5;
for (var k = 0, tr = 0; k < nm && tr < 200; tr++) {
var x = 72 + R() * 30, z = -115 + R() * 120, h = udxH(A, x, z);
if (h === null || udxWalkBlocked(x, z, h + 0.3))
continue;
try {
udxWho(A, "udw_miner_" + k, { sex: k % 3 ? "m" : "f", look: typeof udxLookDwarf === "function" && k % 2 ? udxLookDwarf(0x5A4A3A, k) : { top: 0x5A5048, topKind: "shirt", bottom: 0x3A3430, hair: 0x3A2A22, hairStyle: "short", hat: "cap", shoes: 0x2A2018 }, must: 1 }, x, z, R() * 6.28, null, k % 2 ? { r: 6, sp: 1 } : null);
}
catch (e) { }
k++;
}
},
function () {
if (UDW.done || typeof UDX === "undefined" || !UDX.root)
return;
UDW.done = true;
var root = new THREE.Group();
root.name = "udw";
UDX.root.add(root);
UDW_PLACES.forEach(function (P, i) { try {
udwPlace(root, P, i);
}
catch (e) {
if (window.console)
console.warn("[underdark sweep] place", P.name, e);
} });
try {
udwStair(root);
}
catch (e) {
if (window.console)
console.warn("[underdark sweep] stair", e);
}
try {
udwStope();
}
catch (e) {
if (window.console)
console.warn("[underdark sweep] stope", e);
}
}
];
});
