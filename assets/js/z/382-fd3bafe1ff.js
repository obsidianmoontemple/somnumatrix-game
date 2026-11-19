/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(382, function () {
return [
function (text) {
var low = ptxLow(text), S = { v: 1, text: String(text || "").trim().slice(0, 600), seed: ptxHash(ptxLow(text).trim()), items: {}, drills: [], src: "words" };
var tBest = null;
PTX_TYPES.forEach(function (T) { var f = ptxFind(low, T[1]); if (f && (!tBest || f.at < tBest.at))
tBest = { at: f.at, k: T[0], n: T[2] }; });
S.type = tBest ? tBest.k : "office";
S.name = tBest ? tBest.n : "Office";
PTX_THINGS.forEach(function (T) { var f = ptxFind(low, T[1]); if (!f)
return; var n = ptxCountBefore(low, f.at); S.items[T[0]] = n || -1; });
Object.keys(PTX_DRILL_WORDS).forEach(function (k) { if (ptxFind(low, PTX_DRILL_WORDS[k]))
S.drills.push(k); });
if (S.items.forklift && S.drills.indexOf("forklift") < 0)
S.drills.push("forklift");
if (S.items.exit && S.drills.indexOf("fire") < 0)
S.drills.push("fire");
var st = null, m = / (\w+) (storey|story|stories|storeys|floors|floor|levels|level) /.exec(low);
if (m) {
var n = /^\d+$/.test(m[1]) ? +m[1] : PTX_NUM[m[1]];
if (n)
st = n;
}
if (/ ground floor and (a )?first floor | upstairs | upper floor /.test(low) && !st)
st = 2;
if (/ bungalow | single storey | one storey | single story /.test(low))
st = 1;
var D0 = { warehouse: 1, factory: 1, retail: 1, datacentre: 1, restaurant: 1, site: 1, office: 2, house: 2, hospital: 2, school: 2, hotel: 3, lab: 1 };
S.storeys = Math.max(1, Math.min(6, st || D0[S.type] || 1));
if ((S.type === "warehouse" || S.type === "factory" || S.type === "retail" || S.type === "datacentre") && S.storeys > 1) {
S.items.mezzanine = S.items.mezzanine || -1;
S.storeys = 1;
}
var DEF = { warehouse: [64, 48], factory: [60, 44], retail: [44, 34], datacentre: [36, 28], restaurant: [26, 20], site: [40, 30], office: [40, 24], house: [12, 10], hospital: [56, 18], school: [56, 18], hotel: [48, 16], lab: [36, 22] };
var w = DEF[S.type][0], d = DEF[S.type][1];
var dm = / (\d+(?:\.\d+)?) ?(m|metres|meters|metre|meter|ft|feet|foot)? ?(by|x) ?(\d+(?:\.\d+)?) ?(m|metres|meters|metre|meter|ft|feet|foot)? /.exec(low);
if (dm) {
var f = /ft|feet|foot/.test((dm[2] || "") + (dm[5] || "")) ? 0.3048 : 1;
w = +dm[1] * f;
d = +dm[4] * f;
S.dims = 1;
}
var ar = / (\d[\d,]*) ?(sq ft|square feet|square foot|sqft|sq\. ft|square metres|square meters|sq m|sqm|m2) /.exec(low);
if (ar && !dm) {
var a = +ar[1].replace(/,/g, "");
if (/ft|feet|foot/.test(ar[2]))
a *= 0.0929;
a = a / S.storeys;
w = Math.sqrt(a * 1.5);
d = a / w;
S.dims = 1;
}
if (/ small | tiny | compact /.test(low)) {
w *= 0.7;
d *= 0.7;
}
else if (/ huge | massive | enormous | giant | vast /.test(low)) {
w *= 1.5;
d *= 1.4;
}
else if (/ large | big /.test(low)) {
w *= 1.2;
d *= 1.15;
}
var cap = S.type === "house" ? 30 : 140;
S.w = Math.round(Math.max(8, Math.min(cap, w)));
S.d = Math.round(Math.max(8, Math.min(cap * 0.8, d)));
if (S.w < S.d) {
var sw = S.w;
S.w = S.d;
S.d = sw;
}
S.skin = null;
PTX_SKINS.forEach(function (K) { if (!S.skin && ptxFind(low, K[1]))
S.skin = K[0]; });
if (!S.skin)
S.skin = { warehouse: "metal", factory: "metal", datacentre: "concrete", office: "glass", retail: "glass", hospital: "plaster", school: "brick", hotel: "brick", lab: "glass", restaurant: "brick", house: "brick", site: "concrete" }[S.type];
S.blocked = / blocked (fire )?(exit|door|route)|exit (is )?blocked|blocked by /.test(low);
S.night = / at night | night shift | in the dark | dark | power cut | blackout | power outage /.test(low);
S.title = ptxTitle(S);
return S;
},
function (o, text) {
var base = ptxRead(text || (o && o.text) || "");
if (!o || typeof o !== "object")
return base;
var types = {};
PTX_TYPES.forEach(function (T) { types[T[0]] = T[2]; });
if (types[o.type]) {
base.type = o.type;
base.name = types[o.type];
}
if (+o.storeys)
base.storeys = Math.max(1, Math.min(6, Math.round(+o.storeys)));
if (+o.w)
base.w = Math.round(Math.max(8, Math.min(140, +o.w)));
if (+o.d)
base.d = Math.round(Math.max(8, Math.min(112, +o.d)));
if (base.w < base.d) {
var sw = base.w;
base.w = base.d;
base.d = sw;
}
if (PTX_SKINS.some(function (K) { return K[0] === o.skin; }))
base.skin = o.skin;
var known = {};
PTX_THINGS.forEach(function (T) { known[T[0]] = 1; });
if (o.items && typeof o.items === "object")
Object.keys(o.items).forEach(function (k) { if (known[k]) {
var n = Math.round(+o.items[k]);
if (n)
base.items[k] = Math.max(-1, Math.min(200, n));
} });
if (Array.isArray(o.drills))
o.drills.forEach(function (k) { if (PTX_DRILL_WORDS[k] && base.drills.indexOf(k) < 0)
base.drills.push(k); });
if (o.blocked)
base.blocked = true;
if (o.night)
base.night = true;
if (o.src === "ai")
base.src = "ai";
base.title = ptxTitle(base);
return base;
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (PTX.mats[k])
return PTX.mats[k];
var m = new THREE.MeshLambertMaterial({ color: col });
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
PTX.mats[k] = m;
return m;
},
function (dir, a, b, c, y, h, t, mat, opens, o) {
o = o || {};
opens = (opens || []).slice().sort(function (p, q) { return p.at - q.at; });
var lo = Math.min(a, b), hi = Math.max(a, b), cur = lo;
function seg(s0, s1, y0, y1, m, solid) {
if (s1 - s0 < 0.02 || y1 - y0 < 0.02)
return;
var mid = (s0 + s1) / 2, len = s1 - s0, hh = y1 - y0;
if (dir === "x")
ptxBox(len, hh, t, m, mid, y0 + hh / 2, c);
else
ptxBox(t, hh, len, m, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
ptxSolid(mid, c, len / 2, t / 2, y0, hh);
else
ptxSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2);
seg(cur, s0, y, y + h, mat, true);
var top = Math.min(h, O.h || 2.2);
if (O.glass) {
var sill = O.sill || 0;
seg(s0, s1, y, y + sill, mat, true);
seg(s0, s1, y + top, y + h, mat, false);
var mid = (s0 + s1) / 2, len = s1 - s0, gh = top - sill;
if (dir === "x")
ptxBox(len, gh, 0.04, ptxGlass(), mid, y + sill + gh / 2, c);
else
ptxBox(0.04, gh, len, ptxGlass(), c, y + sill + gh / 2, mid);
if (dir === "x")
ptxSolid(mid, c, len / 2, 0.12, y, h);
else
ptxSolid(c, mid, 0.12, len / 2, y, h);
var fr = ptxMat(0x3A3E44, "metal"), n = Math.max(1, Math.round(len / 1.5));
for (var i = 0; i <= n; i++) {
var p = s0 + len * i / n;
if (dir === "x")
ptxBox(0.06, gh, 0.1, fr, p, y + sill + gh / 2, c);
else
ptxBox(0.1, gh, 0.06, fr, c, y + sill + gh / 2, p);
}
if (dir === "x")
ptxBox(len, 0.06, 0.14, fr, mid, y + sill, c);
else
ptxBox(0.14, 0.06, len, fr, c, y + sill, mid);
}
else {
seg(s0, s1, y + top, y + h, mat, false);
if (!O.noDoor)
ptxDoorway(dir, (s0 + s1) / 2, c, y, s1 - s0, top, t, O);
}
cur = s1;
});
seg(cur, hi, y, y + h, mat, true);
if (o.skirt) {
var sk = ptxMat(0x2E2E30, null);
if (dir === "x")
ptxBox(hi - lo, 0.1, t + 0.03, sk, (lo + hi) / 2, y + 0.05, c);
else
ptxBox(t + 0.03, 0.1, hi - lo, sk, c, y + 0.05, (lo + hi) / 2);
}
},
function (dir, p, c, y, w, h, t, O) {
var fr = ptxMat(O.frame || 0xE8E4DC, "wood"), lf = ptxMat(O.leaf || 0xB8946A, "wood");
if (dir === "x") {
ptxBox(0.08, h, t + 0.06, fr, p - w / 2, y + h / 2, c);
ptxBox(0.08, h, t + 0.06, fr, p + w / 2, y + h / 2, c);
ptxBox(w + 0.16, 0.08, t + 0.06, fr, p, y + h, c);
}
else {
ptxBox(t + 0.06, h, 0.08, fr, c, y + h / 2, p - w / 2);
ptxBox(t + 0.06, h, 0.08, fr, c, y + h / 2, p + w / 2);
ptxBox(t + 0.06, 0.08, w + 0.16, fr, c, y + h, p);
}
if (O.open === false || w > 2.4)
return;
var s = O.swing || 1, lw = Math.min(w - 0.1, 1.0);
if (dir === "x")
ptxBox(0.05, h - 0.04, lw, lf, p - w / 2 + 0.06, y + h / 2, c + s * (lw / 2 + t / 2));
else
ptxBox(lw, h - 0.04, 0.05, lf, c + s * (lw / 2 + t / 2), y + h / 2, p - w / 2 + 0.06);
if (O.exit) {
var bar = ptxMat(0xC8CCD0, "metal");
if (dir === "x")
ptxBox(0.06, 0.06, lw * 0.8, bar, p - w / 2 + 0.12, y + 1.0, c + s * (lw / 2 + t / 2));
else
ptxBox(lw * 0.8, 0.06, 0.06, bar, c + s * (lw / 2 + t / 2), y + 1.0, p - w / 2 + 0.12);
}
},
function (x0, z0, x1, z1, y, th, mat, hole, under) {
var rects = [[x0, z0, x1, z1]];
if (hole)
rects = [[x0, z0, x1, hole[1]], [x0, hole[3], x1, z1], [x0, hole[1], hole[0], hole[3]], [hole[2], hole[1], x1, hole[3]]];
rects.forEach(function (r) {
var w = r[2] - r[0], d = r[3] - r[1];
if (w < 0.05 || d < 0.05)
return;
ptxBox(w, th, d, mat, (r[0] + r[2]) / 2, y - th / 2, (r[1] + r[3]) / 2);
ptxFloor(r[0], r[1], r[2], r[3], y);
if (under)
ptxBox(w, 0.02, d, under, (r[0] + r[2]) / 2, y - th - 0.012, (r[1] + r[3]) / 2);
});
},
function (x0, z0, y, H, top) {
var W = 3.4, D = 5.6, half = H / 2, n = Math.max(6, Math.round(half / 0.19)), rise = half / n, run = 2.6 / n;
var st = ptxMat(0xB8B4AC, "concrete"), nose = ptxMat(0xE8C020, null), rail = ptxMat(0x6A6E74, "metal");
for (var i = 0; i < n; i++) {
var zz = z0 + 1.5 + i * run, yy = y + (i + 1) * rise;
ptxBox(1.5, yy - y, run, st, x0 + 0.85, y + (yy - y) / 2, zz + run / 2);
ptxBox(1.5, 0.02, 0.05, nose, x0 + 0.85, yy + 0.01, zz + 0.03);
ptxFloor(x0 + 0.1, zz, x0 + 1.6, zz + run, yy);
}
ptxBox(W, 0.25, 1.5, st, x0 + W / 2, y + half - 0.125, z0 + D - 0.75);
ptxFloor(x0, z0 + D - 1.5, x0 + W, z0 + D, y + half);
for (var j = 0; j < n; j++) {
var zj = z0 + D - 1.5 - (j + 1) * run, yj = y + half + (j + 1) * rise;
ptxBox(1.5, 0.22, run, st, x0 + W - 0.85, yj - 0.11, zj + run / 2);
ptxBox(1.5, 0.02, 0.05, nose, x0 + W - 0.85, yj + 0.01, zj + run - 0.03);
ptxFloor(x0 + W - 1.6, zj, x0 + W - 0.1, zj + run, yj);
}
ptxBox(0.16, H, 2.6, ptxMat(0xD8D4CC, "plaster"), x0 + W / 2, y + H / 2, z0 + 1.5 + 1.3);
ptxSolid(x0 + W / 2, z0 + 2.8, 0.1, 1.3, y, H);
ptxBox(0.06, 0.06, 2.8, rail, x0 + W / 2 - 0.12, y + half + 0.9, z0 + 2.8);
return [x0, z0 + 1.5, x0 + W, z0 + D];
},
function (x0, z0, y, H, mat, label) {
var W = 3.4, D = 5.6, t = 0.2;
ptxWall("x", x0, x0 + W, z0 + D, y, H, t, mat, []);
ptxWall("z", z0, z0 + D, x0, y, H, t, mat, []);
ptxWall("z", z0, z0 + D, x0 + W, y, H, t, mat, []);
ptxWall("x", x0, x0 + W, z0, y, H, t, mat, [{ at: x0 + W / 2, w: 1.4, h: 2.2, exit: 1, swing: -1, leaf: 0xA03A2A }]);
ptxSign([label || "STAIRS", "fire escape route"], 1.2, 0.36, "#0E8A3E", "#FFFFFF", x0 + W / 2, y + 2.55, z0 - 0.12, 0);
},
function (x, y, z, ry, load, g) {
var p = new THREE.Group();
p.position.set(x, y, z);
p.rotation.y = ry || 0;
(g || PTX.G).add(p);
var wd = ptxMat(0xB89A6A, "wood");
for (var i = -1; i <= 1; i++)
ptxBox(1.2, 0.1, 0.1, wd, 0, 0.05, i * 0.45, p);
ptxBox(1.2, 0.03, 1.0, wd, 0, 0.115, 0, p);
if (load) {
var c = ptxMat(PTX_CARD[(Math.abs(x * 7 + z * 3) | 0) % 4], "wood"), lh = 0.4 + ((Math.abs(x + z) * 10 | 0) % 5) * 0.18;
ptxBox(1.14, lh, 0.96, c, 0, 0.13 + lh / 2, 0, p);
ptxBox(1.16, 0.02, 0.98, ptxMat(0xD8E4EC, null, { op: 0.35 }), 0, 0.13 + lh + 0.01, 0, p);
}
return p;
},
function (x, z0, len, h, lv) {
var up = ptxMat(0x1E4E9A, "metal"), bm = ptxMat(0xE86A1A, "metal"), dk = 2.3, bay = 2.7, nb = Math.max(1, Math.round(len / bay));
lv = lv || 4;
for (var i = 0; i <= nb; i++) {
var zz = z0 + i * len / nb;
[-dk / 2, 0, dk / 2].forEach(function (dx) { ptxBox(0.09, h, 0.09, up, x + dx, h / 2, zz); });
}
for (var l = 1; l <= lv; l++) {
var yy = l * h / (lv + 0.6);
[-dk / 2, dk / 2].forEach(function (dx) { ptxBox(0.06, 0.12, len, bm, x + dx, yy, z0 + len / 2); });
for (var b = 0; b < nb; b++) {
var zc = z0 + (b + 0.5) * len / nb;
for (var s = 0; s < 2; s++)
if (((b * 3 + l * 5 + s) % 7) !== 0)
[-0.6, 0.6].forEach(function (dx) { ptxPallet(x + dx, yy + 0.06, zc + (s - 0.5) * 1.2, Math.PI / 2, 1); });
}
}
for (var b2 = 0; b2 < nb; b2++) {
var zc2 = z0 + (b2 + 0.5) * len / nb;
for (var s2 = 0; s2 < 2; s2++)
if ((b2 + s2) % 3)
[-0.6, 0.6].forEach(function (dx) { ptxPallet(x + dx, 0, zc2 + (s2 - 0.5) * 1.2, Math.PI / 2, 1); });
}
ptxSolid(x, z0 + len / 2, dk / 2 + 0.05, len / 2, 0, h);
ptxSign(["AISLE " + (PTX.aisle = (PTX.aisle || 0) + 1)], 0.9, 0.5, "#1E4E9A", "#FFFFFF", x, h - 0.6, z0 + len + 0.08, 0);
},
function (x, z0, len) {
var mt = ptxMat(0xE0E2E4, "metal"), n = Math.max(1, Math.round(len / 1.2));
ptxBox(0.1, 1.8, len, mt, x, 0.9, z0 + len / 2);
ptxBox(1.0, 0.12, len, mt, x, 0.06, z0 + len / 2);
for (var l = 0; l < 4; l++) {
var yy = 0.25 + l * 0.42;
ptxBox(1.0, 0.03, len, mt, x, yy, z0 + len / 2);
for (var i = 0; i < n; i++) {
var col = [0xC83A2A, 0x2A6AC8, 0xE8C020, 0x3A9A4A, 0xE87A1A, 0xF0F0F0][(i * 5 + l * 3) % 6];
ptxBox(0.3, 0.3, 1.0, ptxMat(col, null), x - 0.3, yy + 0.17, z0 + (i + 0.5) * len / n);
ptxBox(0.3, 0.3, 1.0, ptxMat([0x8A4AA8, 0x2AA8A8, 0xC8A86A][(i + l) % 3], null), x + 0.3, yy + 0.17, z0 + (i + 0.5) * len / n);
}
}
ptxSolid(x, z0 + len / 2, 0.52, len / 2, 0, 1.8);
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
var top = ptxMat(0xD8CCB4, "wood"), leg = ptxMat(0x404448, "metal"), blk = ptxMat(0x1A1C20, null), scr = ptxMat(0x2A4A6A, null, { e: 0x1A3A5A, ei: 0.7 });
ptxBox(1.6, 0.04, 0.8, top, 0, 0.73, 0, g);
[[-0.75, -0.35], [0.75, -0.35], [-0.75, 0.35], [0.75, 0.35]].forEach(function (p) { ptxBox(0.05, 0.72, 0.05, leg, p[0], 0.36, p[1], g); });
ptxBox(0.55, 0.34, 0.03, blk, 0, 1.1, -0.25, g);
ptxBox(0.51, 0.3, 0.01, scr, 0, 1.1, -0.233, g);
ptxBox(0.06, 0.18, 0.06, blk, 0, 0.84, -0.27, g);
ptxBox(0.44, 0.02, 0.15, blk, 0, 0.76, 0.05, g);
ptxBox(0.42, 0.6, 0.55, ptxMat(0x6A6E74, "metal"), 0.55, 0.3, 0.0, g);
ptxBox(0.5, 0.06, 0.5, ptxMat(0x2A2E3A, null), 0, 0.48, 0.62, g);
ptxBox(0.5, 0.55, 0.06, ptxMat(0x2A2E3A, null), 0, 0.8, 0.86, g);
ptxCyl(0.04, 0.42, leg, 0, 0.24, 0.62, g, 6);
ptxBox(1.6, 0.45, 0.03, ptxMat(0x6A8AA0, null), 0, 0.98, -0.41, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
ptxSolid(x + s * 0.1, z + c * 0.1, Math.abs(c) * 0.82 + Math.abs(s) * 0.45, Math.abs(s) * 0.82 + Math.abs(c) * 0.45, y, 1.2);
return g;
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
var f = ptxMat(0x2A3A5A, null), l = ptxMat(0x404448, "metal");
ptxBox(0.45, 0.05, 0.45, f, 0, 0.46, 0, g);
ptxBox(0.45, 0.45, 0.05, f, 0, 0.7, 0.2, g);
[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(function (p) { ptxBox(0.03, 0.46, 0.03, l, p[0], 0.23, p[1], g); });
},
function (x, y, z, ry, missing) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
ptxBox(0.3, 0.04, 0.08, ptxMat(0x404448, "metal"), 0, 0.95, 0.03, g);
if (!missing) {
var red = ptxMat(0xC81A1A, null);
ptxCyl(0.09, 0.55, red, 0, 0.65, 0.1, g, 12);
ptxCyl(0.03, 0.08, ptxMat(0x1A1A1A, null), 0, 0.97, 0.1, g, 8);
ptxBox(0.04, 0.04, 0.12, ptxMat(0x1A1A1A, null), 0.05, 0.98, 0.14, g);
}
var sg = ptxSign(["🧯 FIRE EXTINGUISHER"], 0.5, 0.2, "#C81A1A", "#FFFFFF", 0, 1.55, 0.02, 0, g);
return g;
},
function (x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
ptxBox(0.45, 0.35, 0.15, ptxMat(0x1A8A3E, null), 0, 1.3, 0.08, g);
ptxBox(0.18, 0.05, 0.01, ptxMat(0xFFFFFF, null), 0, 1.3, 0.16, g);
ptxBox(0.05, 0.18, 0.01, ptxMat(0xFFFFFF, null), 0, 1.3, 0.16, g);
ptxBox(0.3, 0.4, 0.15, ptxMat(0x1A8A3E, null), 0.5, 1.15, 0.08, g);
ptxSign(["AED", "first aid"], 0.4, 0.2, "#1A8A3E", "#FFFFFF", 0.25, 1.75, 0.02, 0, g);
return g;
},
function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
g.userData.keep = 1;
var y = ptxMat(0xE8B010, "metal"), dk = ptxMat(0x2A2A2E, "metal"), tyre = ptxMat(0x141414, null);
ptxBox(1.1, 0.7, 1.9, y, 0, 0.75, -0.1, g);
ptxBox(1.1, 0.55, 0.5, dk, 0, 0.95, -1.0, g);
ptxBox(0.5, 0.08, 0.5, dk, 0, 1.12, -0.3, g);
ptxBox(0.5, 0.5, 0.08, dk, 0, 1.4, -0.55, g);
[[-0.5, 0.55], [0.5, 0.55], [-0.5, -0.85], [0.5, -0.85]].forEach(function (p) { var w = ptxCyl(0.28, 0.22, tyre, p[0], 0.28, p[1], g, 14); w.rotation.z = Math.PI / 2; });
[[-0.5, 0.45], [0.5, 0.45], [-0.5, -0.75], [0.5, -0.75]].forEach(function (p) { ptxBox(0.06, 1.3, 0.06, dk, p[0], 1.75, p[1], g); });
ptxBox(1.1, 0.06, 1.3, dk, 0, 2.4, -0.15, g);
var mast = new THREE.Group();
mast.position.set(0, 0, 0.95);
g.add(mast);
ptxBox(0.08, 2.6, 0.12, dk, -0.35, 1.35, 0, mast);
ptxBox(0.08, 2.6, 0.12, dk, 0.35, 1.35, 0, mast);
var car = new THREE.Group();
car.position.set(0, 0.12, 0.1);
mast.add(car);
ptxBox(0.9, 0.5, 0.06, dk, 0, 0.3, 0, car);
ptxBox(0.1, 0.05, 1.1, ptxMat(0x6A6E74, "metal"), -0.25, 0.03, 0.55, car);
ptxBox(0.1, 0.05, 1.1, ptxMat(0x6A6E74, "metal"), 0.25, 0.03, 0.55, car);
var b = ptxBox(0.16, 0.08, 0.16, ptxMat(0xF08A10, null, { e: 0xF08A10, ei: 0.8 }), 0, 2.48, -0.6, g);
return { g: g, car: car, beacon: b };
},
function (x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
var box = ptxMat(0xE8ECEE, "metal"), cab = ptxMat(0x2A5A9A, "metal"), dk = ptxMat(0x1E1E20, null), gl = ptxMat(0x2A3A4A, null);
ptxBox(2.5, 2.8, 12, box, 0, 2.6, 0, g);
ptxBox(2.5, 0.3, 12.2, dk, 0, 1.05, 0, g);
ptxBox(2.5, 2.6, 2.2, cab, 0, 2.1, 7.5, g);
ptxBox(2.3, 1.0, 0.05, gl, 0, 2.7, 8.62, g);
[-4.5, -3.2, 5.5, 7.6].forEach(function (zz) { [-1.1, 1.1].forEach(function (xx) { var w = ptxCyl(0.5, 0.35, dk, xx, 0.5, zz, g, 14); w.rotation.z = Math.PI / 2; }); });
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
ptxSolid(x + s * 1.3, z + c * 1.3, Math.abs(c) * 1.3 + Math.abs(s) * 7.4, Math.abs(s) * 1.3 + Math.abs(c) * 7.4, 0, 4);
},
function (x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
var b = ptxMat(col || 0x8A8E94, null), gl = ptxMat(0x1E2A34, null), dk = ptxMat(0x141414, null);
ptxBox(1.8, 0.7, 4.4, b, 0, 0.65, 0, g);
ptxBox(1.6, 0.55, 2.3, gl, 0, 1.25, -0.2, g);
ptxBox(1.62, 0.06, 2.0, b, 0, 1.54, -0.2, g);
[[-0.85, 1.4], [0.85, 1.4], [-0.85, -1.4], [0.85, -1.4]].forEach(function (p) { var w = ptxCyl(0.33, 0.22, dk, p[0], 0.33, p[1], g, 12); w.rotation.z = Math.PI / 2; });
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
ptxSolid(x, z, Math.abs(c) * 0.9 + Math.abs(s) * 2.2, Math.abs(s) * 0.9 + Math.abs(c) * 2.2, 0, 1.6);
},
function (x, z, k) {
var bd = ptxMat([0x3A6A9A, 0x4A7A4A, 0x8A8E94][k % 3], "metal"), dk = ptxMat(0x2A2E34, "metal"), gl = ptxMat(0x9FC4D8, null, { op: 0.35 });
ptxBox(2.2, 1.9, 1.8, bd, x, 0.95, z);
ptxBox(1.4, 0.8, 0.04, gl, x, 1.3, z + 0.92);
ptxBox(0.4, 0.5, 0.3, dk, x + 1.0, 1.3, z + 1.05);
ptxBox(0.1, 0.1, 0.02, ptxGlow(0x2AD84A), x + 0.9, 1.5, z + 1.21);
ptxBox(0.1, 0.1, 0.02, ptxGlow(0xD8A010), x + 1.1, 1.5, z + 1.21);
ptxSolid(x, z, 1.15, 0.95, 0, 2);
var yl = ptxMat(0xE8C020, null);
ptxBox(3.0, 0.012, 0.1, yl, x, 0.006, z - 1.4);
ptxBox(3.0, 0.012, 0.1, yl, x, 0.006, z + 1.6);
ptxBox(0.1, 0.012, 3.0, yl, x - 1.5, 0.006, z + 0.1);
ptxBox(0.1, 0.012, 3.0, yl, x + 1.5, 0.006, z + 0.1);
},
function (x0, x1, z) {
var fr = ptxMat(0x6A6E74, "metal"), belt = ptxMat(0x1E1E20, null), len = x1 - x0;
ptxBox(len, 0.08, 0.9, belt, (x0 + x1) / 2, 0.85, z);
ptxBox(len, 0.16, 0.08, fr, (x0 + x1) / 2, 0.82, z - 0.48);
ptxBox(len, 0.16, 0.08, fr, (x0 + x1) / 2, 0.82, z + 0.48);
for (var x = x0 + 0.5; x < x1; x += 2) {
ptxBox(0.08, 0.8, 0.08, fr, x, 0.4, z - 0.45);
ptxBox(0.08, 0.8, 0.08, fr, x, 0.4, z + 0.45);
}
ptxSolid((x0 + x1) / 2, z, len / 2, 0.55, 0, 1.0);
var boxes = [];
for (var i = 0; i < Math.max(2, Math.round(len / 4)); i++) {
var b = ptxBox(0.5, 0.35, 0.45, ptxMat(PTX_CARD[i % 4], "wood"), x0 + i * 4 + 1, 1.07, z);
b.userData.keep = 1;
boxes.push(b);
}
PTX.fx.push({ k: "belt", list: boxes, x0: x0, x1: x1 });
},
function (x, z, len) {
var bk = ptxMat(0x16181C, "metal"), n = Math.max(1, Math.round(len / 0.62));
ptxBox(1.1, 2.1, len, bk, x, 1.05, z + len / 2);
var ld = [ptxGlow(0x2AD84A), ptxGlow(0x2A8AE8)];
for (var i = 0; i < n; i++)
for (var r = 0; r < (PTX.lite ? 3 : 7); r++)
ptxBox(0.01, 0.02, 0.04, ld[(i + r) % 2], x + 0.56, 0.4 + r * 0.22, z + (i + 0.5) * len / n);
ptxSolid(x, z + len / 2, 0.56, len / 2, 0, 2.2);
},
function (x, y, z, ry, hospital) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
PTX.G.add(g);
var fr = ptxMat(hospital ? 0xD8DCE0 : 0x6A4A32, hospital ? "metal" : "wood"), mt = ptxMat(0xF0F2F4, null), bl = ptxMat(hospital ? 0x6A9ACA : 0x8A5A6A, null);
ptxBox(1.0, 0.5, 2.1, fr, 0, 0.3, 0, g);
ptxBox(0.96, 0.18, 2.0, mt, 0, 0.62, 0, g);
ptxBox(0.98, 0.08, 1.3, bl, 0, 0.73, 0.35, g);
ptxBox(0.6, 0.12, 0.35, mt, 0, 0.76, -0.75, g);
ptxBox(1.0, 0.9, 0.06, fr, 0, 0.75, -1.05, g);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
ptxSolid(x, z, Math.abs(c) * 0.52 + Math.abs(s) * 1.05, Math.abs(s) * 0.52 + Math.abs(c) * 1.05, y, 0.9);
},
function (x, z) {
var g = new THREE.Group();
g.position.set(x, 0, z);
PTX.G.add(g);
g.userData.keep = 1;
ptxCyl(0.05, 2.6, ptxMat(0x8A8E94, "metal"), 0, 1.3, 0, g, 8);
ptxSign(["FIRE ASSEMBLY POINT", "gather here · report to the fire warden"], 2.2, 0.9, "#0E8A3E", "#FFFFFF", 0, 2.9, 0.06, 0, g);
var gr = ptxMat(0x0E8A3E, null, { op: 0.25 });
var ring = new THREE.Mesh(new THREE.RingGeometry(4.6, 5, 40), gr);
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.03;
g.add(ring);
return g;
},
function (rects, h) {
var out = [];
rects.forEach(function (r) {
if (h[0] >= r[2] || h[2] <= r[0] || h[1] >= r[3] || h[3] <= r[1]) {
out.push(r);
return;
}
if (h[1] > r[1])
out.push([r[0], r[1], r[2], h[1]]);
if (h[3] < r[3])
out.push([r[0], h[3], r[2], r[3]]);
var zA = Math.max(r[1], h[1]), zB = Math.min(r[3], h[3]);
if (h[0] > r[0])
out.push([r[0], zA, h[0], zB]);
if (h[2] < r[2])
out.push([h[2], zA, r[2], zB]);
});
return out;
},
function (G) {
var S = PTX.spec;
PTX.G = G;
PTX.lite = typeof LITE !== "undefined" && !!LITE;
PTX.storeyH = 0;
PTX.pod = null;
PTX.front = undefined;
PTX.goodsIn = null;
PTX.rooms = [];
PTX.solids = [];
PTX.floors = [];
PTX.spots = [];
PTX.people = [];
PTX.fx = [];
PTX.exits = [];
PTX.lifts = [];
PTX.hazards = [];
PTX.forks = [];
PTX.open = [];
PTX.aisle = 0;
PTX.geos = {};
PTX.rnd = typeof wRand === "function" ? wRand(S.seed) : Math.random;
function step(n, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[sim-studio] " + n, e);
} }
var w = S.w, d = S.d, x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2;
step("outside", function () { ptxOutside(S); });
if (S.type === "site")
step("site", function () { ptxSite(S); });
else if (/warehouse|factory|retail|datacentre/.test(S.type))
step("hall", function () { ptxHall(S); });
else
step("block", function () { ptxBlockBuilding(S); });
step("safety", function () { ptxSafetyKit(S); });
step("people", function () { ptxPeople(S); });
step("board", function () { ptxBoards(S); });
step("bake", function () { if (typeof gwBake === "function")
gwBake(G); });
PTX.built = true;
},
function (S) {
var w = S.w, d = S.d, gr = ptxMat(0x5A7A42, "grass"), as = ptxMat(0x4A4C50, "asphalt"), pv = ptxMat(0xB8B4AC, "paving"), wl = ptxMat(0xF0F0F0, null), yl = ptxMat(0xE8C020, null);
var big = Math.max(w, d) + 220;
var g = new THREE.Mesh(new THREE.PlaneGeometry(big, big), gr);
if (typeof metreUVs === "function")
metreUVs(g.geometry, "pln", [big, big]);
g.rotation.x = -Math.PI / 2;
g.position.y = -0.02;
PTX.G.add(g);
var pz0 = d / 2 + 4, pz1 = d / 2 + 42, pw = Math.max(w + 20, 60);
ptxBox(pw, 0.04, pz1 - pz0, as, 0, 0.0, (pz0 + pz1) / 2);
ptxBox(pw + 60, 0.04, 9, as, 0, 0.0, pz1 + 6);
for (var x = -pw / 2 - 28; x < pw / 2 + 28; x += 6)
ptxBox(3, 0.01, 0.15, wl, x, 0.025, pz1 + 6);
ptxBox(w + 4, 0.06, 3.2, pv, 0, 0.01, d / 2 + 1.6);
ptxBox(2.4, 0.06, pz1 - pz0, pv, 0, 0.012, (pz0 + pz1) / 2);
ptxBox(0.15, 0.02, pz1 - pz0, yl, -1.3, 0.04, (pz0 + pz1) / 2);
ptxBox(0.15, 0.02, pz1 - pz0, yl, 1.3, 0.04, (pz0 + pz1) / 2);
var cols = [0x8A8E94, 0x2A3A5A, 0xC8C8C8, 0x6A1A1A, 0x1A1A1A, 0x3A5A3A, 0xE0E0E0, 0x4A5A7A], n = 0, lim = PTX.lite ? 10 : 22;
[d / 2 + 12, d / 2 + 24].forEach(function (rz, ri) {
for (var x = -pw / 2 + 5; x < pw / 2 - 4; x += 3) {
if (Math.abs(x) < 3.5)
continue;
ptxBox(0.12, 0.01, 5, wl, x - 1.5, 0.025, rz);
if (n < lim && PTX.rnd() < 0.55 && !(ri === 1 && x > w / 2 - 16)) {
ptxCar(x, rz, ri ? Math.PI : 0, cols[n % cols.length]);
n++;
}
}
});
var A = { x: Math.min(w / 2 - 6, pw / 2 - 10), z: d / 2 + 33 };
PTX.assembly = A;
ptxAssembly(A.x, A.z);
var lp = ptxMat(0x5A5E64, "metal"), lmp = ptxGlow(0xFFF0D0);
for (var lx = -pw / 2 + 4; lx < pw / 2; lx += 18) {
ptxCyl(0.08, 6, lp, lx, 3, pz0 + 18, null, 8);
ptxBox(0.6, 0.12, 0.3, lmp, lx, 6, pz0 + 18);
}
var hd = ptxMat(0x3A5A2E, "grass"), tr = ptxMat(0x5A4030, "bark"), lf = ptxMat(0x4A6A32, null);
ptxBox(0.9, 1.1, pz1 - pz0, hd, -pw / 2 - 1, 0.55, (pz0 + pz1) / 2);
ptxBox(0.9, 1.1, pz1 - pz0, hd, pw / 2 + 1, 0.55, (pz0 + pz1) / 2);
for (var t = 0; t < (PTX.lite ? 6 : 14); t++) {
var side = t % 2 ? 1 : -1, tx = side * (w / 2 + 10 + PTX.rnd() * 20), tz = -d / 2 + PTX.rnd() * d;
ptxCyl(0.2, 3, tr, tx, 1.5, tz, null, 8, 0.28);
for (var k = 0; k < 4; k++) {
var s = new THREE.Mesh(new THREE.SphereGeometry(1.6 + PTX.rnd(), 9, 7), lf);
s.position.set(tx + (PTX.rnd() - 0.5) * 1.6, 3.6 + k * 0.7, tz + (PTX.rnd() - 0.5) * 1.6);
PTX.G.add(s);
}
PTX.solids.push({ x: tx, z: tz, r: 0.35 });
}
PTX.arrive = { x: 0, z: d / 2 + 16 };
},
function (S, storeys, H, doors, o) {
o = o || {};
var w = S.w, d = S.d, x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2, sk = PTX_SKINMAT[S.skin] || PTX_SKINMAT.concrete, mat = ptxMat(sk[0], sk[1]), t = 0.3;
var glassy = S.skin === "glass";
for (var k = 0; k < storeys; k++) {
var y = k * H, sides = { s: [], n: [], w: [], e: [] };
if (k === 0)
(doors || []).forEach(function (D) {
sides[D.side].push({ at: D.at, w: D.w || 1.2, h: D.h || 2.3, exit: D.exit, noDoor: D.noDoor, swing: (D.side === "s" || D.side === "e") ? 1 : -1, leaf: D.exit ? 0x2A6A3A : 0x3A3E44 });
PTX.exits.push(ptxExitPoint(D, w, d));
});
["s", "n", "w", "e"].forEach(function (sd) {
var len = (sd === "s" || sd === "n") ? w : d, lo = (sd === "s" || sd === "n") ? x0 : z0, list = sides[sd];
var sill = o.high ? H - 2.6 : (glassy ? 0.15 : 0.9), top = o.high ? H - 1.0 : (glassy ? H - 0.35 : Math.min(H - 0.5, 2.4)), step = glassy ? 3.0 : (o.high ? 6 : 3.2), ww = glassy ? 2.8 : (o.high ? 4.5 : 1.6);
if (o.noWin && o.noWin.indexOf(sd) >= 0)
return;
for (var p = lo + step / 2 + 0.6; p < lo + len - step / 2; p += step) {
var clash = list.some(function (O) { return Math.abs(O.at - p) < O.w / 2 + ww / 2 + 0.4; });
if (!clash)
list.push({ at: p, w: ww, h: top, sill: sill, glass: 1 });
}
});
ptxWall("x", x0, x1, z1, y, H, t, mat, sides.s);
ptxWall("x", x0, x1, z0, y, H, t, mat, sides.n);
ptxWall("z", z0, z1, x0, y, H, t, mat, sides.w);
ptxWall("z", z0, z1, x1, y, H, t, mat, sides.e);
if (k > 0) {
var band = ptxMat(0x4A4E54, "metal");
ptxBox(w + 0.4, 0.3, 0.12, band, 0, y, z1 + 0.2);
ptxBox(w + 0.4, 0.3, 0.12, band, 0, y, z0 - 0.2);
ptxBox(0.12, 0.3, d + 0.4, band, x0 - 0.2, y, 0);
ptxBox(0.12, 0.3, d + 0.4, band, x1 + 0.2, y, 0);
}
}
var top = storeys * H, rf = ptxMat(0x5A5E62, "concrete");
ptxBox(w + 0.6, 0.35, d + 0.6, rf, 0, top + 0.17, 0);
if (S.type === "house") {
var tile = ptxMat(0x7A3A2A, "shingle"), ridge = Math.min(4, d * 0.4);
var r1 = ptxBox(w + 0.8, 0.18, d / 2 * 1.25, tile, 0, top + ridge / 2 + 0.3, -d / 4 - 0.1);
r1.rotation.x = Math.atan2(ridge, d / 2);
var r2 = ptxBox(w + 0.8, 0.18, d / 2 * 1.25, tile, 0, top + ridge / 2 + 0.3, d / 4 + 0.1);
r2.rotation.x = -Math.atan2(ridge, d / 2);
if (typeof triPrism === "function") {
var gm = new THREE.Mesh(triPrism(d, ridge, 0.3), mat);
gm.rotation.y = Math.PI / 2;
gm.position.set(x0 + 0.15, top + 0.35, 0);
PTX.G.add(gm);
var gm2 = gm.clone();
gm2.position.x = x1 - 0.15;
PTX.G.add(gm2);
}
}
else {
var pp = ptxMat(sk[0], sk[1]);
ptxBox(w + 0.6, 1.0, 0.3, pp, 0, top + 0.85, z1 + 0.15);
ptxBox(w + 0.6, 1.0, 0.3, pp, 0, top + 0.85, z0 - 0.15);
ptxBox(0.3, 1.0, d, pp, x0 - 0.15, top + 0.85, 0);
ptxBox(0.3, 1.0, d, pp, x1 + 0.15, top + 0.85, 0);
var pl = ptxMat(0x9AA0A6, "metal");
ptxBox(3, 1.6, 2, pl, x0 + w * 0.3, top + 1.1, 0);
ptxBox(2, 1.2, 2, pl, x0 + w * 0.7, top + 0.9, -d / 4);
}
ptxSign([S.name.toUpperCase(), S.storeys > 1 ? S.storeys + " storeys · " + S.w + " × " + S.d + " m" : S.w + " × " + S.d + " m"], Math.min(8, w * 0.4), 1.2, "#1E2632", "#F0F2F4", 0, Math.min(H * storeys - 0.7, 3.3), z1 + 0.2, 0);
},
function (D, w, d) {
var x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2, o = 2.5, i = 2.0, P;
if (D.side === "s")
P = { x: D.at, z: z1 + o, ix: D.at, iz: z1 - i };
else if (D.side === "n")
P = { x: D.at, z: z0 - o, ix: D.at, iz: z0 + i };
else if (D.side === "w")
P = { x: x0 - o, z: D.at, ix: x0 + i, iz: D.at };
else
P = { x: x1 + o, z: D.at, ix: x1 - i, iz: D.at };
P.name = D.name || "exit";
P.side = D.side;
P.exit = !!D.exit || D.main;
P.main = !!D.main;
var ry = { s: 0, n: Math.PI, w: -Math.PI / 2, e: Math.PI / 2 }[D.side];
if (P.exit)
ptxExitSign(P.ix + (P.x - P.ix) * 0.36, Math.min(2.75, (D.h || 2.3) + 0.35), P.iz + (P.z - P.iz) * 0.36, ry + Math.PI);
return P;
},
function (B) {
var S = PTX.spec, inner = ptxMat(0xC4BFB4, "plaster"), fm = PTX_FLOORMAT[S.type] || PTX_FLOORMAT.office, floor = ptxMat(fm[0], fm[1]), cor = ptxMat(0xC8C4BA, "floortile"), ceil = ptxMat(0xD0CEC8, "plaster");
var cz0 = B.zc - B.cw / 2, cz1 = B.zc + B.cw / 2, WH = B.H - 0.3, holes = [];
B.wells = [];
(B.stairs || []).forEach(function (sx) { B.wells.push([sx, cz1]); holes.push([sx, cz1 + 1.5, sx + 3.4, cz1 + 5.6]); });
for (var k = 0; k < B.storeys; k++) {
var y = B.y0 + k * B.H;
if (k === 0)
ptxSlabHoles(B.x0, B.z0, B.x1, B.z1, y + 0.001, 0.12, floor, []);
else
ptxSlabHoles(B.x0, B.z0, B.x1, B.z1, y, 0.3, floor, holes);
ptxBox(B.x1 - B.x0, 0.012, B.cw, cor, (B.x0 + B.x1) / 2, y + 0.008, B.zc);
B.wells.forEach(function (W, wi) { var hole = k < B.storeys - 1; if (hole)
ptxStairs(W[0], W[1], y, B.H); ptxStairWalls(W[0], W[1], y, WH + 0.3, inner, wi ? "STAIRS B" : "STAIRS A"); });
if (B.lift !== null && B.lift !== undefined)
ptxLiftCar(B.lift, cz1, y, WH, k, B);
[["n", B.north], ["s", B.south]].forEach(function (side) {
var list = (typeof side[1] === "function" ? side[1](k) : side[1]) || [], north = side[0] === "n", za = north ? B.z0 : cz1, zb = north ? cz0 : B.z1, cx = B.x0, taken = [];
if (!north) {
B.wells.forEach(function (W) { taken.push([W[0] - 0.1, W[0] + 3.5]); });
if (B.lift !== null && B.lift !== undefined)
taken.push([B.lift - 0.1, B.lift + 2.5]);
}
var free = [];
var cur = B.x0;
taken.sort(function (a, b) { return a[0] - b[0]; }).forEach(function (T) { if (T[0] - cur > 1.5)
free.push([cur, T[0]]); cur = Math.max(cur, T[1]); });
if (B.x1 - cur > 1.5)
free.push([cur, B.x1]);
var ri = 0;
free.forEach(function (F) {
var x = F[0];
while (x < F[1] - 1.4) {
var R = list.length ? list[ri % list.length] : { n: "Room", w: 5, k: "room" };
ri++;
var rw = Math.min(R.w || 5, F[1] - x);
if (F[1] - (x + rw) < 2.5)
rw = F[1] - x;
ptxRoom(R, x, x + rw, za, zb, y, WH, north, inner, k, B);
x += rw;
}
});
});
PTX.open.push({ x0: B.x0 + 1.2, x1: B.x1 - 1.2, z0: cz0 + 0.4, z1: cz1 - 0.4, y: y, k: "corridor", B: B, floor: k });
ptxBox(B.x1 - B.x0, 0.02, B.z1 - B.z0, ceil, (B.x0 + B.x1) / 2, y + WH + 0.27, (B.z0 + B.z1) / 2);
ptxCeilLights(B.x0, B.z0, B.x1, B.z1, y + WH + 0.27, PTX.lite ? 6 : 4.2);
if (B.walls) {
var wm = ptxMat(0xB8B4AC, "plaster");
if (B.walls.e)
ptxWall("z", B.z0, B.z1, B.x1, y, B.H, 0.2, wm, k === 0 ? (B.walls.e.doors || []) : [{ at: B.zc, w: 1.6, h: 2.1, glass: 1, sill: 0.9 }]);
if (B.walls.n)
ptxWall("x", B.x0, B.x1, B.z0, y, B.H, 0.2, wm, k === 0 ? (B.walls.n.doors || []) : []);
}
}
if (B.roof) {
ptxBox(B.x1 - B.x0, 0.3, B.z1 - B.z0, ptxMat(0x8A8E94, "concrete"), (B.x0 + B.x1) / 2, B.y0 + B.storeys * B.H + 0.15, (B.z0 + B.z1) / 2);
}
return B;
},
function (R, xa, xb, za, zb, y, WH, north, inner, k, B) {
var cz = north ? zb : za, mid = (xa + xb) / 2, door = { at: Math.min(xb - 1.0, xa + 1.2), w: 1.0, h: 2.15, swing: north ? -1 : 1, frame: 0x8A8E94 };
if (R.open) { }
else if (R.glassy) {
ptxWall("x", xa, xb, cz, y, WH + 0.3, 0.12, inner, [{ at: (xa + door.at + 0.5) / 2 + 0.2, w: Math.max(0.8, door.at - 0.5 - xa - 0.4), h: WH, glass: 1, sill: 0.05 }, door]);
}
else
ptxWall("x", xa, xb, cz, y, WH + 0.3, 0.15, inner, [door], { skirt: 1 });
if (!R.open || R.wallEnd)
ptxWall("z", za, zb, xb, y, WH + 0.3, 0.15, inner, []);
if (R.n && !R.open)
ptxSign([R.n], 1.1, 0.28, "#2A2E36", "#F0F2F4", door.at, y + 2.45, cz + (north ? 0.09 : -0.09), north ? 0 : Math.PI);
var rm = { x0: xa + 0.3, x1: xb - 0.3, z0: Math.min(za, zb) + 0.3, z1: Math.max(za, zb) - 0.3, y: y, north: north, k: R.k, n: R.n, floor: k, door: { x: door.at, z: cz } };
try {
ptxFurnish(rm);
}
catch (e) {
if (window.console)
console.warn("[sim-studio] furnish", R.k, e);
}
if (R.open || R.k === "open" || R.k === "dining" || R.k === "ward" || R.k === "lobby") {
var via = R.open ? [] : [{ x: door.at, z: cz + (north ? -0.9 : 0.9) }, { x: door.at, z: cz + (north ? 0.9 : -0.9) }];
PTX.open.push({ x0: rm.x0 + 0.6, x1: rm.x1 - 0.6, z0: rm.z0 + 0.6, z1: rm.z1 - 0.6, y: y, k: R.k, via: via, B: B, floor: k });
}
(PTX.rooms = PTX.rooms || []).push(rm);
},
function (x, cz1, y, WH, k, B) {
var st = ptxMat(0xB8BCC0, "metal"), inner = ptxMat(0xB8B4AC, "plaster");
ptxWall("x", x, x + 2.4, cz1, y, WH + 0.3, 0.2, inner, [{ at: x + 1.2, w: 1.1, h: 2.1, noDoor: 1 }]);
ptxWall("z", cz1, cz1 + 2.4, x, y, WH + 0.3, 0.2, inner, []);
ptxWall("z", cz1, cz1 + 2.4, x + 2.4, y, WH + 0.3, 0.2, inner, []);
ptxWall("x", x, x + 2.4, cz1 + 2.4, y, WH + 0.3, 0.2, inner, []);
ptxBox(0.5, 2.1, 0.04, st, x + 0.6, y + 1.05, cz1 - 0.12);
ptxBox(0.5, 2.1, 0.04, st, x + 1.8, y + 1.05, cz1 - 0.12);
ptxSign(["LIFT", "do not use in a fire"], 1.0, 0.32, "#2A2E36", "#F0C040", x + 1.2, y + 2.45, cz1 - 0.13, Math.PI);
ptxFloor(x + 0.1, cz1 + 0.1, x + 2.3, cz1 + 2.3, y + 0.002);
var L = { x: x + 1.2, z: cz1 + 1.2, y: y, k: k, B: B };
PTX.lifts.push(L);
ptxSpot(L.x, L.z, y, 1.4, "Lift (floor " + ptxFloorName(k) + ")", "choose a floor", function () { ptxLiftCard(L); });
},
function (L) {
var b = "", fns = {}, B = L.B;
for (var k = 0; k < B.storeys; k++) {
(function (k) {
b += worldBtn("f" + k, (k === L.k ? "● " : "") + ptxFloorName(k).charAt(0).toUpperCase() + ptxFloorName(k).slice(1) + " floor", "");
fns["f" + k] = function () {
worldCard(null);
if (PTX.drill && PTX.drill.k === "fire" && PTX.drill.on) {
PTX.drill.lift = (PTX.drill.lift || 0) + 1;
setStatus("🚫 <b>Never use a lift in a fire.</b> It can stop between floors or open onto smoke. Use the stairs.");
return;
}
var P = camera.position;
P.y = B.y0 + k * B.H + 1.72;
setStatus("🛗 The doors close, and open on the <b>" + ptxFloorName(k) + " floor</b>.");
};
})(k);
}
worldCard(worldFacts("🛗 Lift", "Which floor?", [], []) + b, fns);
},
function (S) {
var T = S.type, n = function (k, d) { return ptxN(S, k, d); };
var meet = { n: "Meeting room", w: 5, k: "meeting", glassy: 1 }, kit = { n: "Kitchen", w: 5, k: "kitchen" }, wc = { n: "Toilets", w: 4, k: "toilets" }, store = { n: "Store", w: 3, k: "store" };
var R = { north: [], south: [], H: 3.6 };
if (T === "office") {
R.north = function (k) { var a = []; if (k === 0 && S.items.reception)
a.push({ n: "Reception", w: 6, k: "lobby" }); a.push(meet, meet, { n: "Open plan", w: Math.max(8, S.w * 0.3), k: "open", open: 1 }, kit, wc); if (S.items.serverroom && k === 0)
a.push({ n: "Server room", w: 4, k: "server" }); return a; };
R.south = function (k) { return k === 0 ? [{ n: "Open plan", w: Math.max(6, S.w / 2 - 8), k: "open", open: 1 }, { n: "Reception", w: 7, k: "lobby", open: 1 }, { n: "Open plan", w: 40, k: "open", open: 1 }] : [{ n: "Open plan", w: 60, k: "open", open: 1 }]; };
R.H = 3.8;
}
else if (T === "hospital") {
R.north = [{ n: "Ward", w: 8, k: "ward" }, { n: "Ward", w: 8, k: "ward" }, { n: "Treatment room", w: 5, k: "treat" }, { n: "Ward", w: 8, k: "ward" }, wc, store];
R.south = function (k) { return k === 0 ? [{ n: "Waiting area", w: 8, k: "lobby", open: 1 }, { n: "Nurses' station", w: 6, k: "nurses", open: 1 }, { n: "Ward", w: 8, k: "ward" }, { n: "Treatment room", w: 5, k: "treat" }] : [{ n: "Nurses' station", w: 6, k: "nurses", open: 1 }, { n: "Ward", w: 8, k: "ward" }, { n: "Ward", w: 8, k: "ward" }, wc]; };
R.H = 3.8;
}
else if (T === "school") {
R.north = [{ n: "Classroom", w: 8, k: "class" }, { n: "Classroom", w: 8, k: "class" }, { n: "Classroom", w: 8, k: "class" }, wc, store];
R.south = function (k) { return k === 0 ? [{ n: "Office", w: 5, k: "office" }, { n: "Entrance hall", w: 8, k: "lobby", open: 1 }, { n: "Classroom", w: 8, k: "class" }, { n: "Staff room", w: 6, k: "kitchen" }] : [{ n: "Classroom", w: 8, k: "class" }, { n: "Library", w: 8, k: "library" }, wc]; };
R.H = 3.6;
}
else if (T === "hotel") {
R.north = [{ n: "Room", w: 4, k: "hotel" }];
R.south = function (k) { return k === 0 ? [{ n: "Lobby", w: 12, k: "lobby", open: 1 }, { n: "Restaurant", w: 10, k: "dining", open: 1 }, { n: "Room", w: 4, k: "hotel" }] : [{ n: "Room", w: 4, k: "hotel" }, { n: "Linen store", w: 3, k: "store" }, { n: "Room", w: 4, k: "hotel" }]; };
R.H = 3.2;
}
else if (T === "lab") {
R.north = [{ n: "Laboratory", w: 9, k: "lab" }, { n: "Laboratory", w: 9, k: "lab" }, { n: "Clean room", w: 6, k: "lab" }, wc, store];
R.south = function (k) { return k === 0 ? [{ n: "Write-up area", w: 8, k: "open", open: 1 }, { n: "Reception", w: 6, k: "lobby", open: 1 }, { n: "Laboratory", w: 9, k: "lab" }, { n: "Changing room", w: 4, k: "store" }] : [{ n: "Laboratory", w: 9, k: "lab" }, { n: "Office", w: 5, k: "office" }]; };
R.H = 3.8;
}
else if (T === "restaurant") {
R.north = [{ n: "Kitchen", w: Math.max(8, S.w * 0.45), k: "pro-kitchen" }, { n: "Cold store", w: 3, k: "store" }, { n: "Office", w: 3.5, k: "office" }, wc];
R.south = [{ n: "Dining room", w: 60, k: "dining", open: 1 }];
R.H = 3.4;
}
else if (T === "house") {
R.north = function (k) { return k === 0 ? [{ n: "Kitchen", w: 4.4, k: "home-kitchen" }, { n: "Living room", w: 9, k: "living" }] : [{ n: "Bedroom", w: 4.2, k: "bedroom" }, { n: "Bedroom", w: 9, k: "bedroom" }]; };
R.south = function (k) { return k === 0 ? [{ n: "Hall", w: 3.4, k: "lobby", open: 1 }, { n: "WC", w: 2, k: "toilets" }, { n: "Study", w: 9, k: "office" }] : [{ n: "Bathroom", w: 3, k: "bath" }, { n: "Bedroom", w: 9, k: "bedroom" }]; };
R.H = 2.8;
}
return R;
},
function (S) {
var R = ptxRoomsFor(S), w = S.w, d = S.d, cw = S.type === "house" ? 1.4 : (S.type === "hospital" ? 3.0 : 2.4);
var zc = S.type === "house" ? -0.6 : (S.type === "restaurant" ? -d / 2 + Math.max(6, d * 0.4) : 0);
var two = S.type !== "house" && w >= 22;
var B = { x0: -w / 2 + 0.15, x1: w / 2 - 0.15, z0: -d / 2 + 0.15, z1: d / 2 - 0.15, zc: zc, cw: cw, storeys: S.storeys, H: R.H, y0: 0, north: R.north, south: R.south,
stairs: S.storeys > 1 ? (two ? [-w / 2 + 0.25, w / 2 - 3.65] : [-w / 2 + 0.25]) : [], lift: (S.storeys > 1 && S.type !== "house") ? (-w / 2 + 3.9) : null };
var doors = [{ side: "s", at: S.type === "house" ? (B.x0 + (B.stairs.length ? 3.6 : 0) + 1.7) : 0, w: S.type === "house" ? 1.0 : 2.4, h: 2.4, name: "main entrance", main: 1, exit: 1 }];
if (S.type !== "house") {
doors.push({ side: "w", at: zc, w: 1.2, h: 2.2, exit: 1, name: "west fire exit" });
doors.push({ side: "e", at: zc, w: 1.2, h: 2.2, exit: 1, name: "east fire exit" });
}
else
doors.push({ side: "n", at: w / 4, w: 0.9, h: 2.1, exit: 1, name: "back door" });
ptxShell(S, S.storeys, R.H, doors, {});
PTX.storeyH = R.H;
ptxBlock(B);
},
function (S) {
var T = S.type, w = S.w, d = S.d, x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2, H = { warehouse: 10, factory: 8, retail: 5.2, datacentre: 4.6 }[T];
var fm = PTX_FLOORMAT[T], floor = ptxMat(fm[0], fm[1]), yl = ptxMat(0xE8C020, null), gn = ptxMat(0x2A9A4A, null);
ptxSlabHoles(x0, z0, x1, z1, 0.001, 0.15, floor, []);
var pw = Math.min(18, Math.max(12, w * 0.28)), pd = Math.min(12, Math.max(9, d * 0.24)), two = !!S.items.mezzanine || T === "warehouse" && w >= 50;
var doors = [{ side: "s", at: 0, w: T === "retail" ? 4 : 2.4, h: T === "retail" ? 3 : 2.4, name: "main entrance", main: 1, exit: 1, noDoor: T === "retail" },
{ side: "w", at: z0 + d * 0.45, w: 1.2, h: 2.2, exit: 1, name: "west fire exit" }, { side: "e", at: z0 + d * 0.45, w: 1.2, h: 2.2, exit: 1, name: "east fire exit" },
{ side: "s", at: x0 + pw / 2, w: 1.2, h: 2.3, exit: 1, name: "office door" }];
if (T === "warehouse" || T === "factory") {
var nd = Math.max(2, Math.min(PTX.lite ? 4 : 7, ptxN(S, "dock", Math.round(w / 12))));
S.docks = [];
for (var i = 0; i < nd; i++) {
var dx = x0 + w * (i + 0.5) / nd;
doors.push({ side: "n", at: dx, w: 3.2, h: 4, noDoor: 1, name: "dock door " + (i + 1) });
S.docks.push(dx);
}
doors.push({ side: "n", at: x1 - 3, w: 1.2, h: 2.2, exit: 1, name: "north fire exit" });
}
ptxShell(S, 1, H, doors, { high: T !== "retail", noWin: T === "datacentre" ? ["n", "w", "e", "s"] : null });
var stl = ptxMat(0x3A5A8A, "metal"), bay = 8;
for (var x = x0 + bay; x < x1 - 1; x += bay) {
ptxBox(w > 0 ? 0.3 : 0.3, 0.6, d, stl, x, H - 0.4, 0);
}
var hb = ptxMat(0xF4F6F8, null, { e: 0xF4F2EA, ei: S.night ? 0.12 : 0.55 });
for (var lx = x0 + bay / 2; lx < x1; lx += bay)
for (var lz = z0 + 6; lz < z1; lz += PTX.lite ? 12 : 8)
ptxCyl(0.35, 0.25, hb, lx, H - 1.2, lz, null, 12, 0.45);
var pod = { x0: x0 + 0.15, x1: x0 + pw, z0: z1 - pd, z1: z1 - 0.15 };
PTX.storeyH = 3.4;
ptxBlock({ x0: pod.x0, x1: pod.x1, z0: pod.z0, z1: pod.z1, zc: z1 - pd / 2, cw: 1.8, storeys: two ? 2 : 1, H: 3.4, y0: 0, roof: 1,
north: function (k) { return k === 0 ? [{ n: "Office", w: pw - 6, k: "office" }, { n: "Toilets", w: 4, k: "toilets" }] : [{ n: "Training room", w: pw - 5, k: "meeting" }, { n: "First aid room", w: 4, k: "firstaid" }]; },
south: function (k) { return k === 0 ? [{ n: "Break room", w: pw * 0.55, k: "kitchen" }, { n: "Shift office", w: pw, k: "office" }] : [{ n: "Manager's office", w: pw, k: "office" }]; },
stairs: two ? [pod.x1 - 3.6] : [], lift: null, walls: { e: { doors: [{ at: z1 - pd / 2, w: 1.2, h: 2.2, swing: 1 }] }, n: { doors: [{ at: pod.x0 + 3, w: 1.2, h: 2.2, swing: -1 }] } } });
var cx0 = x0 + 2.5, cx1 = x1 - 2.5, front = z1 - (pd + 4), back = z0 + (T === "warehouse" || T === "factory" ? 13 : 4);
if (T === "warehouse") {
var pitch = 5.8, nr = Math.max(1, Math.min(PTX.lite ? 7 : 12, ptxN(S, "rack", Math.floor((cx1 - cx0) / pitch)))), len = Math.min(PTX.lite ? 30 : 44, front - back - 2), rx = cx0 + 1.2;
for (var r = 0; r < nr && rx < cx1 - 1.2; r++, rx += pitch) {
if (rx < pod.x1 + 2 && back + len > pod.z0 - 2)
ptxRack(rx, back, Math.max(6, pod.z0 - 3 - back), Math.min(H - 1.6, 8), PTX.lite ? 3 : 4);
else
ptxRack(rx, back, len, Math.min(H - 1.6, 8), PTX.lite ? 3 : 4);
PTX.open.push({ x0: rx + 1.7, x1: rx + pitch - 1.7, z0: back, z1: back + len, y: 0, k: "aisle" });
}
(S.docks || []).forEach(function (dx, i) {
ptxBox(2.8, 0.08, 2.4, ptxMat(0x5A5E62, "metal"), dx, 0.05, z0 + 1.4);
ptxBox(3.4, 0.6, 0.25, ptxMat(0x1A1A1A, null), dx, 4.2, z0 - 0.05);
ptxBox(3.2, 0.04, 3.2, yl, dx, 0.004, z0 + 4);
if (i % 2 === 0)
ptxPallet(dx + 1.8, 0, z0 + 6, 0, 1);
if (i < 4)
ptxLorry(dx, z0 - 8.2, Math.PI);
});
PTX.open.push({ x0: cx0, x1: cx1, z0: z0 + 3, z1: back - 2, y: 0, k: "dock" });
if (S.docks && S.docks.length) {
PTX.goodsIn = { x: S.docks[0] + 2.6, z: z0 + 3.4 };
ptxCounter(PTX.goodsIn.x, 0, PTX.goodsIn.z, 1.6, 0.7, 0x3A5A8A);
ptxSign(["GOODS IN"], 1.0, 0.3, "#1E4E9A", "#FFFFFF", PTX.goodsIn.x, 1.9, PTX.goodsIn.z - 0.3, 0);
}
}
else if (T === "factory") {
var lines = Math.max(1, Math.min(PTX.lite ? 3 : 5, ptxN(S, "conveyor", Math.floor((front - back) / 8)))), lz = back + 3;
for (var l = 0; l < lines; l++, lz += 8) {
var lx0 = Math.max(cx0, pod.x1 + 3), lx1 = cx1 - 2;
ptxConveyor(lx0, lx1, lz);
var nm = Math.max(2, Math.min(6, ptxN(S, "machine", Math.floor((lx1 - lx0) / 9))));
for (var m = 0; m < nm; m++)
ptxMachine(lx0 + 3 + m * (lx1 - lx0 - 6) / Math.max(1, nm - 1), lz + 2.6, m + l);
PTX.open.push({ x0: lx0, x1: lx1, z0: lz - 3.4, z1: lz - 1, y: 0, k: "aisle" });
}
(S.docks || []).forEach(function (dx, i) { ptxBox(3.4, 0.6, 0.25, ptxMat(0x1A1A1A, null), dx, 4.2, z0 - 0.05); if (i < 2)
ptxLorry(dx, z0 - 8.2, Math.PI); });
PTX.open.push({ x0: cx0, x1: cx1, z0: z0 + 3, z1: back - 2, y: 0, k: "dock" });
}
else if (T === "retail") {
var gp = 3.4, ng = Math.max(2, Math.min(PTX.lite ? 8 : 14, ptxN(S, "rack", Math.floor((cx1 - cx0) / gp)))), gx = Math.max(cx0, pod.x1 + 1.5) + 1, glen = Math.min(24, front - back - 8);
for (var gi = 0; gi < ng && gx < cx1 - 1; gi++, gx += gp) {
ptxGondola(gx, back + 4, glen);
PTX.open.push({ x0: gx + 0.8, x1: gx + gp - 0.8, z0: back + 4, z1: back + 4 + glen, y: 0, k: "aisle" });
}
var nc = Math.max(2, Math.min(8, ptxN(S, "checkout", 4)));
for (var c = 0; c < nc; c++) {
var ccx = 4 + c * 3.4;
if (ccx > cx1 - 2)
break;
ptxCounter(ccx, 0, z1 - 6, 0.9, 3.2, 0x3A3E44);
ptxBox(0.4, 0.3, 0.3, ptxMat(0x1A1A1A, null), ccx, 1.1, z1 - 5.4);
ptxCyl(0.04, 1.6, ptxMat(0x6A6E74, "metal"), ccx + 0.4, 0.8, z1 - 7.5, null, 6);
ptxSign(["CHECKOUT " + (c + 1)], 0.8, 0.3, "#C81A1A", "#FFFFFF", ccx + 0.4, 1.8, z1 - 7.5, 0);
}
var sk = ptxMat(0xB8B4AC, "plaster");
ptxWall("x", x0 + 0.15, x1 - 0.15, back + 1, 0, H, 0.2, sk, [{ at: x1 - 6, w: 2.4, h: 2.6, swing: -1 }, { at: x0 + pw + 4, w: 1.2, h: 2.2, swing: -1 }]);
for (var sx = x0 + 3; sx < x1 - 8; sx += 4)
ptxPallet(sx, 0, z0 + 2.5, 0, 1);
PTX.open.push({ x0: 0, x1: cx1, z0: z1 - 12, z1: z1 - 8, y: 0, k: "shopfloor" });
}
else if (T === "datacentre") {
var sp = 3.2, ns = Math.max(2, Math.min(PTX.lite ? 6 : 10, ptxN(S, "server", Math.floor((cx1 - cx0 - pw) / sp)))), sx2 = Math.max(cx0, pod.x1 + 2);
for (var si = 0; si < ns && sx2 < cx1 - 1; si++, sx2 += sp) {
ptxServer(sx2, back + 2, front - back - 4);
PTX.open.push({ x0: sx2 + 0.8, x1: sx2 + sp - 0.8, z0: back + 2, z1: front - 2, y: 0, k: "aisle" });
}
for (var cu = z0 + 3; cu < z1 - pd - 2; cu += 6) {
ptxBox(1.0, 2.2, 2.4, ptxMat(0xE0E4E8, "metal"), x1 - 1.2, 1.1, cu);
ptxSolid(x1 - 1.2, cu, 0.55, 1.25, 0, 2.3);
}
}
if (T !== "retail" && T !== "datacentre") {
ptxBox(cx1 - pod.x1 - 1, 0.012, 1.4, gn, (pod.x1 + 1 + cx1) / 2, 0.008, front + 1.6);
ptxBox(1.4, 0.012, z1 - front - 1.6, gn, 0, 0.008, (front + z1) / 2 + 0.6);
ptxBox(cx1 - cx0, 0.012, 0.12, yl, (cx0 + cx1) / 2, 0.008, front + 0.6);
ptxBox(cx1 - cx0, 0.012, 0.12, yl, (cx0 + cx1) / 2, 0.008, front + 2.6);
PTX.walk = { x0: pod.x1 + 1, x1: cx1, z0: front + 0.9, z1: front + 2.3 };
PTX.sign = ptxSign(["PEDESTRIANS", "use the green walkway"], 1.4, 0.6, "#0E8A3E", "#FFFFFF", pod.x1 + 2, 2.6, front + 2.4, 0);
}
PTX.open.push({ x0: pod.x1 + 2, x1: cx1, z0: front - 1, z1: front + 3, y: 0, k: "main" });
PTX.hallH = H;
PTX.front = front;
PTX.back = back;
PTX.pod = pod;
},
function (S) {
var w = S.w, d = S.d, x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2, stl = ptxMat(0x8A3A2A, "metal"), cn = ptxMat(0xB8B4AC, "concrete"), sc = ptxMat(0x9AA0A6, "metal"), mud = ptxMat(0x7A6A52, "earth"), H = 3.8, st = Math.max(2, S.storeys);
ptxBox(w + 16, 0.06, d + 16, mud, 0, 0.01, 0);
ptxFloor(x0 - 8, z0 - 8, x1 + 8, z1 + 8, 0.04);
var fx0 = x0 + 4, fx1 = x1 - 10, fz0 = z0 + 4, fz1 = z1 - 8, bay = 6;
for (var k = 0; k < st; k++) {
var y = k * H;
for (var x = fx0; x <= fx1 + 0.1; x += bay)
for (var z = fz0; z <= fz1 + 0.1; z += bay) {
ptxBox(0.35, H, 0.35, stl, x, y + H / 2, z);
if (k === 0)
ptxSolid(x, z, 0.25, 0.25, 0, H * st);
}
for (var x2 = fx0; x2 <= fx1 + 0.1; x2 += bay)
ptxBox(0.25, 0.45, fz1 - fz0, stl, x2, y + H - 0.2, (fz0 + fz1) / 2);
for (var z2 = fz0; z2 <= fz1 + 0.1; z2 += bay)
ptxBox(fx1 - fx0, 0.45, 0.25, stl, (fx0 + fx1) / 2, y + H - 0.2, z2);
if (k < st - 1)
ptxBox(fx1 - fx0, 0.25, fz1 - fz0, cn, (fx0 + fx1) / 2, y + H + 0.1, (fz0 + fz1) / 2);
}
ptxBox(fx1 - fx0 + 1, 0.3, fz1 - fz0 + 1, cn, (fx0 + fx1) / 2, 0.15, (fz0 + fz1) / 2);
ptxFloor(fx0 - 0.5, fz0 - 0.5, fx1 + 0.5, fz1 + 0.5, 0.3);
for (var lv = 1; lv <= st; lv++) {
var yy = lv * 2;
ptxBox(fx1 - fx0, 0.06, 1.2, ptxMat(0xB89A6A, "wood"), (fx0 + fx1) / 2, yy, fz1 + 1.4);
ptxBox(fx1 - fx0, 0.05, 0.05, sc, (fx0 + fx1) / 2, yy + 1.0, fz1 + 2.0);
}
for (var sx = fx0; sx <= fx1; sx += 2.4) {
ptxCyl(0.03, st * 2 + 1, sc, sx, (st * 2 + 1) / 2, fz1 + 0.85, null, 6);
ptxCyl(0.03, st * 2 + 1, sc, sx, (st * 2 + 1) / 2, fz1 + 2.0, null, 6);
}
ptxSolid((fx0 + fx1) / 2, fz1 + 1.4, (fx1 - fx0) / 2, 0.8, 0, st * 2 + 1);
if (S.items.crane || w > 30) {
var ty = ptxMat(0xE8B010, "metal"), cx = x1 - 4, cz = z0 + 5, ch = st * H + 14;
for (var i = 0; i < 4; i++)
ptxBox(0.12, ch, 0.12, ty, cx + (i % 2 ? 0.9 : -0.9), ch / 2, cz + (i > 1 ? 0.9 : -0.9));
for (var yh = 2; yh < ch; yh += 3) {
ptxBox(1.9, 0.08, 0.08, ty, cx, yh, cz - 0.9);
ptxBox(1.9, 0.08, 0.08, ty, cx, yh, cz + 0.9);
}
ptxBox(30, 0.9, 0.9, ty, cx - 10, ch + 0.5, cz);
ptxBox(3, 2, 2, ptxMat(0xC8CCD0, "metal"), cx, ch + 1.8, cz + 1.4);
ptxBox(4, 1.4, 1.4, cn, cx + 7, ch, cz);
ptxSolid(cx, cz, 1.1, 1.1, 0, ch);
ptxCyl(0.02, ch - 6, sc, cx - 18, ch - (ch - 6) / 2, cz, null, 4);
}
ptxBlock({ x0: x1 - 9, x1: x1 - 0.4, z0: z1 - 7, z1: z1 - 0.6, zc: z1 - 3.8, cw: 1.4, storeys: 1, H: 2.8, y0: 0, roof: 1, north: [{ n: "Site office", w: 4.4, k: "office" }, { n: "Welfare cabin", w: 4.4, k: "kitchen" }], south: [{ n: "Induction room", w: 8.6, k: "meeting" }], stairs: [], lift: null,
walls: { e: null, n: { doors: [{ at: x1 - 6, w: 1.0, h: 2.1, swing: -1 }] } } });
var cab = ptxMat(0x2A6A3A, "metal");
ptxWall("z", z1 - 7, z1 - 0.6, x1 - 9, 0, 2.8, 0.12, cab, [{ at: z1 - 3.8, w: 1.0, h: 2.1 }]);
ptxWall("x", x1 - 9, x1 - 0.4, z1 - 0.6, 0, 2.8, 0.12, cab, []);
ptxWall("z", z1 - 7, z1 - 0.6, x1 - 0.4, 0, 2.8, 0.12, cab, []);
var fn = ptxMat(0xC8CCD0, null, { op: 0.55 }), ft = ptxMat(0x6A6E74, "metal");
[[x0 - 6, x1 + 6, z0 - 6, "x"], [x0 - 6, x1 + 6, z1 + 5, "x"], [z0 - 6, z1 + 5, x0 - 6, "z"], [z0 - 6, z1 + 5, x1 + 6, "z"]].forEach(function (F, i) {
var a = F[0], b = F[1], c = F[2], gate = i === 1;
for (var p = a; p < b - 0.1; p += 3.5) {
if (gate && Math.abs(p + 1.75) < 4)
continue;
var m = p + 1.75;
if (F[3] === "x") {
ptxBox(3.4, 2, 0.04, fn, m, 1.1, c);
ptxBox(0.5, 0.12, 0.6, ft, p, 0.06, c);
}
else {
ptxBox(0.04, 2, 3.4, fn, c, 1.1, m);
ptxBox(0.6, 0.12, 0.5, ft, c, 0.06, p);
}
}
if (F[3] === "x") {
if (gate) {
ptxSolid((a - 4) / 2, c, (-4 - a) / 2, 0.1, 0, 2);
ptxSolid((4 + b) / 2, c, (b - 4) / 2, 0.1, 0, 2);
}
else
ptxSolid((a + b) / 2, c, (b - a) / 2, 0.1, 0, 2);
}
else
ptxSolid(c, (a + b) / 2, 0.1, (b - a) / 2, 0, 2);
});
ptxSign(["CONSTRUCTION SITE", "hard hats, boots and hi-vis must be worn", "report to the site office"], 3.6, 1.4, "#1A4A9A", "#FFFFFF", -5, 2.2, z1 + 5.1, 0);
PTX.exits.push({ x: 0, z: z1 + 8, ix: 0, iz: z1 + 2, name: "site gate", exit: 1, main: 1, side: "s" });
for (var m = 0; m < (PTX.lite ? 4 : 8); m++)
ptxPallet(x0 + 2 + m * 2.4, 0.04, z1 - 2, 0, 1);
var cone = ptxMat(0xF06A10, null);
for (var c = 0; c < 10; c++)
ptxCyl(0.03, 0.6, cone, fx0 + c * 2, 0.34, fz1 + 3.6, null, 10, 0.2);
PTX.open.push({ x0: fx0 + 1, x1: fx1 - 1, z0: fz0 + 1, z1: fz1 - 1, y: 0.3, k: "frame" });
PTX.open.push({ x0: x0, x1: x1 - 10, z0: z1 - 6, z1: z1 - 3, y: 0.04, k: "yard" });
PTX.siteH = st * H;
},
function (rm) {
var k = rm.k, y = rm.y, w = rm.x1 - rm.x0, d = rm.z1 - rm.z0, cx = (rm.x0 + rm.x1) / 2, cz = (rm.z0 + rm.z1) / 2, far = rm.north ? rm.z0 + 0.6 : rm.z1 - 0.6, near = rm.north ? rm.z1 - 1.2 : rm.z0 + 1.2, face = rm.north ? 0 : Math.PI;
var lim = PTX.lite ? 10 : 24, n = 0;
function deskGrid() {
for (var x = rm.x0 + 1.2; x < rm.x1 - 1.0 && n < lim; x += 2.0)
for (var z = rm.z0 + 1.4; z < rm.z1 - 1.2 && n < lim; z += 2.6) {
if (Math.abs(x - rm.door.x) < 1.4 && Math.abs(z - rm.door.z) < 2.2)
continue;
ptxDesk(x, y, z, ((z - rm.z0) / 2.6 | 0) % 2 ? Math.PI : 0);
n++;
}
}
switch (k) {
case "open":
deskGrid();
if (w > 8)
ptxPlant(rm.x1 - 0.6, y, cz);
break;
case "office":
ptxDesk(cx, y, far + (rm.north ? 0.8 : -0.8), face);
if (w > 4)
ptxDesk(cx + 1.8, y, far + (rm.north ? 0.8 : -0.8), face);
ptxBox(0.45, 1.9, 1.2, ptxMat(0x6A6E74, "metal"), rm.x0 + 0.3, y + 0.95, cz);
ptxSolid(rm.x0 + 0.3, cz, 0.25, 0.6, y, 1.9);
ptxPlant(rm.x1 - 0.5, y, far + (rm.north ? 0.3 : -0.3));
break;
case "meeting":
ptxTable(cx, y, cz, Math.min(w - 2, 4.4), Math.min(d - 2.2, 1.4));
for (var i = 0; i < Math.min(8, Math.floor((w - 2) / 0.9)); i++) {
ptxChair(rm.x0 + 1.4 + i * 0.9, y, cz - 1.1, Math.PI);
ptxChair(rm.x0 + 1.4 + i * 0.9, y, cz + 1.1, 0);
}
ptxBox(Math.min(2.4, w - 1), 1.3, 0.06, ptxMat(0x141418, null), cx, y + 1.5, far - (rm.north ? 0.25 : -0.25));
break;
case "kitchen":
ptxCounter(cx, y, far + (rm.north ? 0.4 : -0.4), Math.min(w - 0.8, 4), 0.65, 0xE8E4DC);
ptxBox(0.7, 1.9, 0.7, ptxMat(0xE8ECEE, "metal"), rm.x1 - 0.6, y + 0.95, far + (rm.north ? 0.4 : -0.4));
ptxSolid(rm.x1 - 0.6, far + (rm.north ? 0.4 : -0.4), 0.36, 0.36, y, 1.9);
if (d > 3.5)
ptxTable(cx, y, cz + (rm.north ? -0.2 : 0.2), 1.6, 0.9, ptxMat(0xE8E4DC, "wood"));
break;
case "toilets":
ptxToiletRow(rm.x0 + 0.9, far + (rm.north ? 0.75 : -0.75), Math.max(1, Math.min(4, Math.floor((w - 0.6) / 1.2))), y, 0);
ptxCounter(cx, y, near - (rm.north ? 0.2 : -0.2), Math.min(2.4, w - 1.2), 0.5, 0xE8E8E8);
break;
case "store":
case "linen":
for (var s = rm.x0 + 0.6; s < rm.x1 - 0.4; s += 1.0) {
ptxBox(0.9, 2.0, 0.45, ptxMat(0x6A6E74, "metal"), s, y + 1.0, far);
}
ptxSolid(cx, far, w / 2, 0.25, y, 2.0);
break;
case "lobby":
if (w > 4) {
ptxCounter(cx, y, far + (rm.north ? 1.2 : -1.2), Math.min(4, w - 2), 0.7, 0xD8C8A8);
ptxChair(cx, y, far + (rm.north ? 0.5 : -0.5), face + Math.PI);
}
for (var c = 0; c < Math.min(4, w / 1.5 | 0); c++)
ptxChair(rm.x0 + 0.8 + c * 0.8, y, near, face);
ptxPlant(rm.x0 + 0.5, y, far + (rm.north ? 0.4 : -0.4));
break;
case "ward":
for (var b = 0; b < Math.max(1, Math.min(4, Math.floor(w / 2.2))); b++) {
var bx = rm.x0 + 1.0 + b * 2.2;
ptxBed(bx, y, far + (rm.north ? 1.1 : -1.1), face, true);
ptxBox(0.5, 0.8, 0.45, ptxMat(0xD8DCE0, "metal"), bx + 0.9, y + 0.4, far + (rm.north ? 0.3 : -0.3));
}
break;
case "treat":
ptxBed(cx, y, cz, Math.PI / 2, true);
ptxCounter(rm.x0 + 0.5, y, cz, 0.6, Math.min(2.4, d - 1), 0xE8ECEE);
break;
case "nurses":
ptxCounter(cx, y, cz, Math.min(w - 1.5, 4), 1.2, 0xC8D8E0);
ptxChair(cx - 0.8, y, cz - 1, Math.PI);
ptxChair(cx + 0.8, y, cz - 1, Math.PI);
break;
case "class":
var rows = Math.max(1, Math.min(5, Math.floor((d - 2.6) / 1.2))), cols = Math.max(1, Math.min(6, Math.floor((w - 1.2) / 1.2)));
for (var r = 0; r < rows; r++)
for (var cc = 0; cc < cols && n < lim * 1.5; cc++, n++) {
var px = rm.x0 + 0.9 + cc * 1.2, pz = (rm.north ? rm.z0 + 2.0 + r * 1.2 : rm.z1 - 2.0 - r * 1.2);
ptxTable(px, y, pz, 0.9, 0.55, ptxMat(0xC8A87A, "wood"));
ptxChair(px, y, pz + (rm.north ? 0.5 : -0.5), face + Math.PI);
}
ptxWhiteboard(cx, y, far - (rm.north ? 0.15 : -0.15), face, Math.min(3.6, w - 1));
ptxDesk(rm.x1 - 1.2, y, far + (rm.north ? 1.0 : -1.0), face);
break;
case "library":
for (var l = rm.x0 + 0.7; l < rm.x1 - 0.5; l += 1.4) {
ptxBox(1.2, 2.0, 0.4, ptxMat(0x6A4A32, "wood"), l, y + 1.0, far);
}
ptxSolid(cx, far, w / 2, 0.25, y, 2);
ptxTable(cx, y, cz, 2.0, 1.0);
break;
case "hotel":
case "bedroom":
ptxBed(cx, y, far + (rm.north ? 1.15 : -1.15), face, false);
if (w > 3.4)
ptxBed(cx - 1.6, y, far + (rm.north ? 1.15 : -1.15), face, false);
ptxBox(0.6, 1.9, 0.6, ptxMat(0x6A4A32, "wood"), rm.x1 - 0.4, y + 0.95, near);
ptxSolid(rm.x1 - 0.4, near, 0.32, 0.32, y, 1.9);
break;
case "bath":
ptxBox(0.8, 0.55, 1.7, ptxMat(0xF4F4F4, null), rm.x0 + 0.5, y + 0.28, cz);
ptxSolid(rm.x0 + 0.5, cz, 0.42, 0.86, y, 0.6);
ptxBox(0.4, 0.4, 0.6, ptxMat(0xF4F4F4, null), rm.x1 - 0.4, y + 0.2, far + (rm.north ? 0.4 : -0.4));
break;
case "lab":
for (var lb = rm.z0 + 1.4; lb < rm.z1 - 1.4; lb += 2.4)
ptxBenchLab(cx, y, lb, Math.min(w - 2.2, 5));
ptxBox(1.2, 2.2, 0.8, ptxMat(0xE0E4E8, "metal"), rm.x0 + 0.7, y + 1.1, far + (rm.north ? 0.4 : -0.4));
ptxSolid(rm.x0 + 0.7, far + (rm.north ? 0.4 : -0.4), 0.6, 0.4, y, 2.2);
ptxSign(["EYE WASH"], 0.5, 0.2, "#1A8A3E", "#FFFFFF", rm.x1 - 0.4, y + 1.6, far + (rm.north ? 0.06 : -0.06), face);
break;
case "pro-kitchen":
for (var sv = rm.x0 + 0.9; sv < rm.x1 - 0.8 && n < 8; sv += 1.1, n++)
ptxStove(sv, y, far + (rm.north ? 0.45 : -0.45));
ptxCounter(cx, y, cz + (rm.north ? 0.3 : -0.3), Math.min(w - 2.6, 6), 0.9, 0xC8CCD0);
ptxBox(1.4, 2.0, 0.7, ptxMat(0xC8CCD0, "metal"), rm.x1 - 0.8, y + 1.0, near);
ptxSolid(rm.x1 - 0.8, near, 0.72, 0.36, y, 2);
break;
case "dining":
for (var tx = rm.x0 + 1.6; tx < rm.x1 - 1.2 && n < lim; tx += 2.6)
for (var tz = rm.z0 + 1.6; tz < rm.z1 - 1.2 && n < lim; tz += 2.4, n++) {
ptxTable(tx, y, tz, 1.0, 1.0, ptxMat(0x7A5A3A, "wood"));
ptxChair(tx, y, tz - 0.75, Math.PI);
ptxChair(tx, y, tz + 0.75, 0);
}
break;
case "home-kitchen":
ptxCounter(cx, y, far + (rm.north ? 0.35 : -0.35), w - 0.8, 0.6, 0xE8E4DC);
ptxTable(cx, y, cz + (rm.north ? 0.4 : -0.4), 1.4, 0.9);
break;
case "living":
ptxBox(2.2, 0.45, 0.9, ptxMat(0x5A6A7A, null), cx, y + 0.23, far + (rm.north ? 0.6 : -0.6));
ptxBox(2.2, 0.5, 0.2, ptxMat(0x4A5A6A, null), cx, y + 0.6, far + (rm.north ? 0.15 : -0.15));
ptxSolid(cx, far + (rm.north ? 0.5 : -0.5), 1.1, 0.5, y, 0.9);
ptxBox(1.2, 0.7, 0.05, ptxMat(0x141418, null), cx, y + 1.1, near + (rm.north ? 0.5 : -0.5));
ptxPlant(rm.x1 - 0.4, y, cz);
break;
case "server":
ptxServer(cx - 0.6, rm.z0 + 0.5, Math.max(1, d - 1.2));
break;
case "firstaid":
ptxBed(cx, y, cz, Math.PI / 2, true);
ptxFirstAid(rm.x0 + 0.1, y, cz, Math.PI / 2);
break;
}
},
function (S) {
var pts = [];
PTX.exits.forEach(function (E) {
var dx = E.x - E.ix, dz = E.z - E.iz, l = Math.hypot(dx, dz) || 1, nx = dx / l, nz = dz / l, sx = -nz, sz = nx;
var wx = E.ix + nx * 1.75 + sx * 1.6, wz = E.iz + nz * 1.75 + sz * 1.6, ry = Math.atan2(-nx, -nz);
pts.push({ x: wx, z: wz, y: 0, ry: ry, exit: E });
});
(PTX.rooms || []).forEach(function (rm) { if (rm.k === "kitchen" || rm.k === "pro-kitchen" || rm.k === "lab")
pts.push({ x: rm.door.x + 0.9, z: rm.door.z + (rm.north ? 0.12 : -0.12), y: rm.y, ry: rm.north ? 0 : Math.PI }); });
PTX.safety = [];
pts.forEach(function (p, i) {
if (PTX.lite && i > 10)
return;
ptxExtinguisher(p.x, p.y, p.z, p.ry);
var c = Math.cos(p.ry), s = Math.sin(p.ry);
ptxCallPoint(p.x + c * 0.7, p.y, p.z - s * 0.7, p.ry);
var cp = { x: p.x + c * 0.7 + s * 0.3, z: p.z - s * 0.7 + c * 0.3, y: p.y };
PTX.safety.push(cp);
ptxSpot(cp.x, cp.z, p.y, 1.3, "Fire alarm call point", "break the glass", function () { ptxCallPoint_E(cp); });
});
var M = PTX.exits.filter(function (E) { return E.main; })[0] || PTX.exits[0];
if (M) {
var dx = M.x - M.ix, dz = M.z - M.iz, l = Math.hypot(dx, dz) || 1, nx = dx / l, nz = dz / l, ax = M.ix + nx * 1.75 - (-nz) * 2.4, az = M.iz + nz * 1.75 - nx * 2.4, ry = Math.atan2(-nx, -nz);
ptxFirstAid(ax, 0, az, ry);
PTX.aed = { x: ax - nx * 0.5, z: az - nz * 0.5, y: 0 };
ptxSpot(PTX.aed.x, PTX.aed.z, 0, 1.4, "First aid kit and AED", "take them", function () { ptxAedTake(); });
}
var sp = PTX.open.filter(function (o) { return o.y === 0; })[0];
if (sp) {
var kx = sp.x0 + 0.4, kz = sp.z0 + 0.4;
ptxCyl(0.35, 0.8, ptxMat(0xE8C020, null), kx, 0.4, kz, null, 12);
ptxSign(["SPILL KIT"], 0.6, 0.22, "#E8C020", "#1A1A1A", kx, 1.2, kz, 0);
PTX.spillKit = { x: kx, z: kz, y: 0 };
ptxSpot(kx, kz, 0, 1.4, "Spill kit", "take it", function () { ptxSpillKitTake(); });
}
},
function (S) {
if (typeof wPerson !== "function")
return;
var def = { warehouse: 5, factory: 6, retail: 6, datacentre: 2, office: 8, hospital: 7, school: 8, hotel: 4, lab: 5, restaurant: 6, house: 2, site: 5 }[S.type] || 4;
var n = Math.max(0, Math.min(PTX.lite ? 3 : 10, ptxN(S, "people", def))), areas = PTX.open.filter(function (o) { return o.x1 - o.x0 > 1 && o.z1 - o.z0 > 0.6; });
if (!areas.length)
return;
for (var i = 0; i < n; i++) {
var A = areas[(i * 7 + 3) % areas.length], x = A.x0 + PTX.rnd() * (A.x1 - A.x0), z = A.z0 + PTX.rnd() * (A.z1 - A.z0);
var g = null;
try {
g = wPerson("sim" + S.seed + "_" + i, { title: PTX_JOB[S.type] || "worker" });
}
catch (e) {
g = null;
}
if (!g)
continue;
g.position.set(x, A.y, z);
g.rotation.y = PTX.rnd() * 6.28;
g.userData.keep = 1;
PTX.G.add(g);
var r = Math.max(0.6, Math.min(3, Math.min(A.x1 - A.x0, A.z1 - A.z0) / 2 - 0.3));
PTX.people.push({ g: g, A: A, home: { x: x, z: z, y: A.y }, r: r, state: "work", path: null });
}
if ((S.type === "warehouse" || S.type === "factory") && PTX.front !== undefined) {
var nf = Math.max(0, Math.min(PTX.lite ? 2 : 4, ptxN(S, "forklift", S.type === "warehouse" ? 2 : 1))), x0 = -S.w / 2, x1 = S.w / 2, z0 = -S.d / 2, lane = PTX.front - 0.6, dz = z0 + 6;
var aisles = PTX.open.filter(function (o) { return o.k === "aisle"; });
for (var f = 0; f < nf; f++) {
var F = ptxForklift(0, lane, Math.PI / 2), a1 = aisles[(f * 2) % Math.max(1, aisles.length)], a2 = aisles[(f * 2 + 1) % Math.max(1, aisles.length)];
var path = [];
if (S.type === "warehouse" && a1 && a2) {
var ax = (a1.x0 + a1.x1) / 2, bx = (a2.x0 + a2.x1) / 2;
path = [{ x: ax, z: lane }, { x: ax, z: (a1.z0 + a1.z1) / 2, lift: 1 }, { x: ax, z: dz }, { x: bx, z: dz, lift: 1 }, { x: bx, z: lane }, { x: Math.max(PTX.pod.x1 + 3, Math.min(ax, bx) - 6), z: lane }];
}
else
path = [{ x: PTX.pod.x1 + 4, z: lane }, { x: x1 - 4, z: lane, lift: 1 }, { x: x1 - 4, z: dz }, { x: PTX.pod.x1 + 4, z: dz, lift: 1 }];
F.path = path;
F.i = f % path.length;
F.g.position.set(path[F.i].x, 0, path[F.i].z);
F.sp = 2.2;
F.wait = 0;
F.lift = 0;
F.solid = { x: F.g.position.x, z: F.g.position.z, r: 1.1 };
PTX.solids.push(F.solid);
PTX.forks.push(F);
}
}
},
function (S) {
var M = PTX.exits.filter(function (E) { return E.main; })[0] || { ix: 0, iz: S.d / 2 - 2, x: 0, z: S.d / 2 + 2 };
var dx = M.x - M.ix, dz = M.z - M.iz, l = Math.hypot(dx, dz) || 1, nx = dx / l, nz = dz / l;
var bx = M.ix - (-nz) * 2.6 + nx * 0.6, bz = M.iz - nx * 2.6 + nz * 0.6;
[{ x: bx, z: bz, ry: Math.atan2(-nx, -nz) + Math.PI }, { x: PTX.arrive.x + 3, z: PTX.arrive.z - 3, ry: 0 }].forEach(function (B) {
var g = new THREE.Group();
g.position.set(B.x, 0, B.z);
g.rotation.y = B.ry;
PTX.G.add(g);
g.userData.keep = 1;
ptxBox(0.08, 1.2, 0.08, ptxMat(0x5A5E64, "metal"), -0.7, 0.6, 0, g);
ptxBox(0.08, 1.2, 0.08, ptxMat(0x5A5E64, "metal"), 0.7, 0.6, 0, g);
ptxSign(["TRAINING BOARD", "press E: drills, floor plan, results"], 1.6, 0.9, "#1E2632", "#F0C040", 0, 1.6, 0.05, 0, g);
PTX.solids.push({ x: B.x, z: B.z, r: 0.45 });
ptxSpot(B.x, B.z, 0, 2.2, "Training board", "choose a drill", function () { ptxBoardCard(); });
});
},
function () {
var S = PTX.spec, out = [];
["fire", "hazard", "firstaid", "spill", "forklift"].forEach(function (k) { if (k === "forklift" && !PTX.forks.length)
return; out.push(k); });
out.sort(function (a, b) { return (S.drills.indexOf(a) < 0) - (S.drills.indexOf(b) < 0); });
return out;
},
function () {
try {
if (typeof WSN !== "undefined" && WSN && WSN.ctx) {
if (WSN.set && WSN.set.all === false)
return null;
return WSN.ctx;
}
}
catch (e) { }
try {
if (!PTXA.ctx) {
var AC = window.AudioContext || window.webkitAudioContext;
if (!AC)
return null;
PTXA.ctx = new AC();
}
if (PTXA.ctx.state === "suspended")
PTXA.ctx.resume();
return PTXA.ctx;
}
catch (e) {
return null;
}
},
function (f, dur, vol, type, at) {
var c = ptxCtx();
if (!c)
return;
try {
var t = c.currentTime + (at || 0), o = c.createOscillator(), g = c.createGain();
o.type = type || "square";
o.frequency.value = f;
g.gain.setValueAtTime(0, t);
g.gain.linearRampToValueAtTime(vol || 0.05, t + 0.02);
g.gain.setValueAtTime(vol || 0.05, t + dur - 0.03);
g.gain.linearRampToValueAtTime(0, t + dur);
o.connect(g);
g.connect(c.destination);
o.start(t);
o.stop(t + dur + 0.02);
}
catch (e) { }
},
function (k) {
ptxDrillEnd(true);
worldCard(null);
var L = worldLocal(), feet = camera.position.y - 1.72, D = PTX.drill = { k: k, on: true, t: 0, start: { x: L.x, z: L.z }, notes: [], bad: [], good: [] };
if (k === "fire")
ptxFireStart(D);
else if (k === "hazard")
ptxHazardStart(D);
else if (k === "firstaid")
ptxAidStart(D);
else if (k === "spill")
ptxSpillStart(D);
else if (k === "forklift")
ptxForkStart(D);
if (typeof playTone === "function")
playTone(620, 0.3);
},
function (quiet) {
var D = PTX.drill;
if (!D)
return;
D.on = false;
D.alarm = false;
PTX.drill = null;
ptxDynClear();
PTX.people.forEach(function (P) { if (P.state !== "work") {
P.state = "work";
P.path = null;
P.g.visible = true;
P.g.position.set(P.home.x, P.home.y, P.home.z);
} });
if (PTX.casualty) {
PTX.casualty = null;
}
if (!quiet)
setStatus("The drill is stopped. Press E at the training board for another.");
},
function (passed, rows, lines) {
var D = PTX.drill;
if (!D)
return;
var t = Math.round(D.t), mm = Math.floor(t / 60), ss = t % 60, time = (mm ? mm + " min " : "") + ss + " s";
var rec = { at: Date.now(), title: PTX.spec.title, text: PTX.spec.text, drill: D.k, pass: !!passed, time: t, rows: rows || [] };
ptxRecordAdd(rec);
var b = worldBtn("again", "↻ Try it again", "Same building, same drill") + worldBtn("board", "📋 Training board", "Another drill, the floor plan, your results");
worldCard(worldFacts((passed ? "✅ " : "🔁 ") + PTX_DRILLS[D.k].n + (passed ? ": passed" : ": needs practice"), "Time: " + time, rows || [], lines || []) + b, { again: function () { ptxDrillStart(D.k); }, board: function () { ptxBoardCard(); } });
ptxDrillEnd(true);
},
function (D) {
var o = ptxFarArea(D.start, 12), p = ptxAreaPoint(o);
D.fire = p;
D.smoke = [];
D.alarm = false;
D.raised = false;
D.smokeT = 0;
D.lift = 0;
D.blockedUsed = false;
D.out = false;
D.reported = false;
var gl = typeof wGlow === "function" ? wGlow(0xFF7A20, 3.4, 0.75) : null;
if (gl) {
gl.position.set(p.x, p.y + 0.8, p.z);
ptxDyn().add(gl);
D.glow = gl;
}
var L = new THREE.PointLight(0xFF7A30, PTX.lite ? 0 : 1.4, 10, 2);
L.position.set(p.x, p.y + 1, p.z);
ptxDyn().add(L);
D.light = L;
var n = PTX.lite ? 8 : 16;
for (var i = 0; i < n; i++) {
var a = i / n * 6.28, r = 0.6 + PTX.rnd() * 3.2;
D.smoke.push({ s: ptxSmokeSprite(p.x + Math.cos(a) * r, p.y + 1.6 + PTX.rnd() * 1.4, p.z + Math.sin(a) * r, 2.6 + PTX.rnd() * 2, 0.5), a: a, r: r, ph: PTX.rnd() * 6 });
}
D.zones = [{ x: p.x, z: p.z, y: p.y, r: 5 }];
var near = null, nd = 1e9;
PTX.exits.forEach(function (E) { var dd = Math.hypot(E.ix - p.x, E.iz - p.z); if (dd < nd) {
nd = dd;
near = E;
} });
if (near && (PTX.spec.blocked || nd < 14) && PTX.exits.length > 1) {
D.blocked = near;
for (var j = 0; j < (PTX.lite ? 4 : 8); j++)
ptxSmokeSprite(near.ix + (PTX.rnd() - 0.5) * 3, 1.2 + PTX.rnd() * 1.4, near.iz + (PTX.rnd() - 0.5) * 3, 3, 0.55);
D.zones.push({ x: near.ix, z: near.iz, y: 0, r: 3.2 });
}
var A = PTX.assembly;
D.warden = null;
if (typeof wPerson === "function" && A) {
try {
var g = wPerson("simwarden", { title: "fire warden", look: {} });
g.position.set(A.x - 1.5, 0, A.z + 1.5);
g.rotation.y = Math.PI;
ptxDyn().add(g);
D.warden = g;
}
catch (e) { }
}
if (A)
ptxDrillSpot(A.x - 1.5, A.z + 1.5, 0, 3, "Fire warden", "report that you are out", function () { ptxFireReport(); });
var where = p.o && p.o.k && p.o.k !== "corridor" && p.o.k !== "aisle" ? " in the " + (p.o.k === "open" ? "open-plan office" : p.o.k === "main" ? "main aisle" : p.o.k) : "";
setStatus("🔥 <b>Fire drill.</b> You smell smoke" + esc(where) + ". <b>Raise the alarm</b> at a red call point (press E), then <b>get out</b> by the nearest safe exit, never the lift, and report to the fire warden at the <b>assembly point</b> in the car park.");
},
function (cp) {
var D = PTX.drill;
if (!D || D.k !== "fire") {
setStatus("🔴 A fire alarm call point. In a real fire you break the glass to set off the alarm. (Start the fire drill at the training board to practise.)");
return;
}
if (D.alarm) {
setStatus("🔔 The alarm is already sounding. <b>Get out</b>: nearest safe exit, then the assembly point.");
return;
}
D.alarm = true;
D.raised = true;
D.raisedAt = D.t;
ptxEvacuate();
setStatus("🔔 <b>You raised the alarm.</b> Everyone is leaving. Now get out yourself: nearest safe exit, never the lift.");
},
function () {
var D = PTX.drill;
if (!D || D.k !== "fire")
return;
if (!D.out) {
setStatus("Get right out of the building first.");
return;
}
var rows = [["Alarm", D.raised ? "you raised it after " + Math.round(D.raisedAt) + " s" : "someone else raised it"], ["Way out", D.exitName || "—"], ["Lift", D.lift ? "you tried the lift (" + D.lift + "×): never in a fire" : "not used ✓"],
["Smoke", D.smokeT > 1 ? "you were in smoke for " + Math.round(D.smokeT) + " s" : "kept clear ✓"], ["Blocked exit", D.blockedUsed ? "you went through the smoke at " + (D.blocked && D.blocked.name) : "avoided ✓"], ["Reported to the warden", "yes ✓"]];
var pass = !D.lift && D.smokeT <= 4 && !D.blockedUsed && (D.raised || D.t < 240);
var lines = ["Close doors behind you as you go: it holds the smoke back.", "If smoke blocks a way out, turn back and use another one.", "Never go back in for belongings. Wait at the assembly point until the fire warden says it is safe."];
ptxDrillFinish(pass, rows, lines);
},
function (dt) {
var D = PTX.drill, P = camera.position, L = worldLocal(), feet = P.y - 1.72;
D.smoke.forEach(function (s) { s.ph += dt * 0.25; var g = Math.min(1, D.t / 40); s.s.position.x = D.fire.x + Math.cos(s.a + s.ph * 0.2) * (s.r + g * 3); s.s.position.z = D.fire.z + Math.sin(s.a + s.ph * 0.2) * (s.r + g * 3); s.s.material.opacity = 0.45 + 0.1 * Math.sin(s.ph); });
if (D.glow)
D.glow.material.opacity = 0.65 + 0.1 * Math.sin(D.t * 1.2);
if (D.zones[0])
D.zones[0].r = 5 + Math.min(4, D.t / 15);
if (!D.alarm && D.t > 30) {
D.alarm = true;
ptxEvacuate();
setStatus("🔔 <b>A colleague has raised the alarm.</b> Get out now: nearest safe exit, never the lift.");
}
var inSmoke = D.zones.some(function (Z) { return Math.abs(feet - Z.y) < 2.5 && Math.hypot(L.x - Z.x, L.z - Z.z) < Z.r; });
if (inSmoke) {
D.smokeT += dt;
if (!D.coughed || D.t - D.coughed > 6) {
D.coughed = D.t;
setStatus("😷 <b>Smoke!</b> Get low and turn back: find another way out.");
}
}
if (D.blocked && Math.hypot(L.x - D.blocked.ix, L.z - D.blocked.iz) < 2.2)
D.blockedUsed = true;
var S = PTX.spec, outside = Math.abs(L.x) > S.w / 2 + 0.8 || L.z > S.d / 2 + 0.8 || L.z < -S.d / 2 - 0.8;
if (outside && !D.out) {
D.out = true;
var ne = null, nd = 1e9;
PTX.exits.forEach(function (E) { var dd = Math.hypot(E.x - L.x, E.z - L.z); if (dd < nd) {
nd = dd;
ne = E;
} });
D.exitName = ne ? ne.name : "a way out";
D.outAt = D.t;
setStatus("🚪 <b>You are out</b> by the " + esc(D.exitName) + ". Now go to the <b>fire assembly point</b> in the car park and report to the fire warden (press E).");
}
if (!outside && D.out && D.t - D.outAt > 3 && !D.backIn) {
D.backIn = true;
setStatus("⛔ <b>Never go back in</b> once you are out, not even for your things.");
}
},
function (P) {
var S = PTX.spec, A = P.A, g = P.g.position, out = [], x0 = -S.w / 2, x1 = S.w / 2, z0 = -S.d / 2, z1 = S.d / 2, blocked = PTX.drill && PTX.drill.blocked;
function ok(E) { return E && E !== blocked; }
function nearestExit(px, pz, pred) { var best = null, bd = 1e9; PTX.exits.forEach(function (E) { if (!ok(E) || (pred && !pred(E)))
return; var dd = Math.hypot(E.ix - px, E.iz - pz); if (dd < bd) {
bd = dd;
best = E;
} }); return best; }
(A.via || []).forEach(function (v) { out.push({ x: v.x, z: v.z, y: A.y }); });
var cur = out.length ? out[out.length - 1] : { x: g.x, z: g.z };
if (A.B) {
var B = A.B, zc = B.zc, y = A.y;
out.push({ x: cur.x, z: zc, y: y });
if (A.floor > 0 && B.wells.length) {
var W = B.wells.reduce(function (a, b) { return Math.abs(b[0] + 1.7 - cur.x) < Math.abs(a[0] + 1.7 - cur.x) ? b : a; });
out.push({ x: W[0] + 1.7, z: zc, y: y });
out.push({ x: W[0] + 1.7, z: W[1] + 0.6, y: y, hide: 1 });
out.push({ x: W[0] + 1.7, z: W[1] + 0.6, y: B.y0, show: 1 });
out.push({ x: W[0] + 1.7, z: zc, y: B.y0 });
cur = { x: W[0] + 1.7, z: zc };
}
var E = nearestExit(cur.x, zc, function (E) { return Math.abs(E.iz - zc) < 3 || E.main; });
if (E) {
if (E.main) {
out.push({ x: E.ix, z: zc, y: B.y0 });
}
else
out.push({ x: E.ix, z: zc, y: B.y0 });
out.push({ x: E.ix, z: E.iz, y: B.y0 });
out.push({ x: E.x, z: E.z, y: 0 });
}
}
else if (PTX.front !== undefined) {
var fr = PTX.front + 1, lw = x0 + 1.3, le = x1 - 1.3;
if (A.k === "dock") {
out.push({ x: le, z: cur.z });
var Ee = nearestExit(le, cur.z, function (E) { return E.side === "e" || E.side === "n"; });
if (Ee) {
out.push({ x: le, z: Ee.iz });
out.push({ x: Ee.ix, z: Ee.iz });
out.push({ x: Ee.x, z: Ee.z });
}
}
else {
if (A.k === "aisle")
out.push({ x: cur.x, z: S.type === "factory" ? cur.z : PTX.front - 0.6 });
if (S.type === "factory" && A.k === "aisle") {
out.push({ x: le, z: cur.z });
var Ef = nearestExit(le, cur.z, function (E) { return E.side === "e"; });
if (Ef) {
out.push({ x: le, z: Ef.iz });
out.push({ x: Ef.ix, z: Ef.iz });
out.push({ x: Ef.x, z: Ef.z });
}
}
else {
var Wt = PTX.exits.filter(function (E) { return ok(E) && E.side === "w"; })[0], Et = PTX.exits.filter(function (E) { return ok(E) && E.side === "e"; })[0], Mn = PTX.exits.filter(function (E) { return ok(E) && E.main; })[0];
if (S.type !== "datacentre" && S.type !== "retail" && Wt && cur.x < x0 + S.w * 0.3) {
out.push({ x: lw, z: fr });
out.push({ x: lw, z: Wt.iz });
out.push({ x: Wt.ix, z: Wt.iz });
out.push({ x: Wt.x, z: Wt.z });
}
else if (S.type !== "datacentre" && S.type !== "retail" && Et && cur.x > x1 - S.w * 0.3) {
out.push({ x: le, z: fr });
out.push({ x: le, z: Et.iz });
out.push({ x: Et.ix, z: Et.iz });
out.push({ x: Et.x, z: Et.z });
}
else if (Mn) {
out.push({ x: Mn.ix, z: Math.min(fr, Mn.iz) });
out.push({ x: Mn.ix, z: Mn.iz });
out.push({ x: Mn.x, z: Mn.z });
}
}
}
}
else {
var Es = nearestExit(cur.x, cur.z);
if (Es) {
out.push({ x: Es.ix, z: Es.iz });
out.push({ x: Es.x, z: Es.z });
}
}
var As = PTX.assembly;
if (As)
out.push({ x: As.x + (PTX.rnd() - 0.5) * 6, z: As.z + (PTX.rnd() - 0.5) * 5, y: 0, end: 1 });
return out;
},
function (dt) {
var L = worldLocal();
PTX.people.forEach(function (P) {
var g = P.g, p = g.position;
if (P.state === "evac" && P.path) {
var T = P.path[P.pi];
if (!T) {
P.state = "out";
return;
}
if (T.hide) {
g.visible = false;
}
if (T.show) {
g.visible = true;
p.y = T.y;
}
var dx = T.x - p.x, dz = T.z - p.z, d = Math.hypot(dx, dz), st = P.sp * dt;
if (d <= st + 0.05) {
p.x = T.x;
p.z = T.z;
if (T.y !== undefined)
p.y = T.y;
P.pi++;
if (T.end) {
P.state = "out";
g.rotation.y = Math.PI;
}
return;
}
p.x += dx / d * st;
p.z += dz / d * st;
g.rotation.y = Math.atan2(dx, dz);
return;
}
if (P.state !== "work")
return;
if (Math.abs(p.x - L.x) > 60 || Math.abs(p.z - L.z) > 60)
return;
if (typeof wWander === "function") {
wWander(g, dt, function () { return P.home.y; }, { r: P.r, sp: 0.9 });
}
});
},
function (dt) {
var L = worldLocal(), feet = camera.position.y - 1.72, D = PTX.drill;
PTX.forks.forEach(function (F) {
var g = F.g, p = g.position, T = F.path[F.i];
if (F.wait > 0) {
F.wait -= dt;
F.lift = Math.min(1, F.lift + dt * 0.5) * (F.wait > 1.5 ? 1 : F.wait / 1.5);
F.car.position.y = 0.12 + F.lift * 2.2;
return;
}
var dx = T.x - p.x, dz = T.z - p.z, d = Math.hypot(dx, dz);
if (d < 0.2) {
F.i = (F.i + 1) % F.path.length;
if (T.lift)
F.wait = 4;
return;
}
var hx = dx / d, hz = dz / d;
var px = L.x - p.x, pz = L.z - p.z, ahead = px * hx + pz * hz, side = Math.abs(px * hz - pz * hx), close = Math.hypot(px, pz);
if (feet < 1.5 && ahead > 0 && ahead < 4.5 && side < 1.4) {
if (!F.honk || PTX.t - F.honk > 2.5) {
F.honk = PTX.t;
ptxHorn();
if (D && D.k === "forklift" && D.on) {
D.near = (D.near || 0) + 1;
setStatus("📯 <b>Near miss!</b> A forklift had to stop for you. Keep to the green walkway and look both ways before you cross.");
}
}
return;
}
var st = Math.min(d, F.sp * dt);
p.x += hx * st;
p.z += hz * st;
var want = Math.atan2(hx, hz), cur = g.rotation.y, df = Math.atan2(Math.sin(want - cur), Math.cos(want - cur));
g.rotation.y = cur + df * Math.min(1, dt * 3);
F.solid.x = p.x;
F.solid.z = p.z;
if (F.beacon)
F.beacon.material.emissiveIntensity = 0.6;
});
},
function (D) {
var dockX = (PTX.spec.docks && PTX.spec.docks[0]) || (-PTX.spec.w / 2 + 8), z0 = -PTX.spec.d / 2;
D.stage = 0;
D.near = 0;
var desk = PTX.goodsIn || { x: dockX + 2.5, z: z0 + 3.5 };
var b = ptxBox(0.3, 0.02, 0.22, ptxMat(0xF4F4F4, null), desk.x, 0.95, desk.z, ptxDyn());
ptxDrillSpot(desk.x, desk.z + 0.9, 0, 1.8, "Goods-in desk", "pick up the delivery note", function () {
if (D.stage !== 0)
return;
D.stage = 1;
D.t1 = D.t;
b.visible = false;
setStatus("📄 <b>You have the delivery note.</b> Take it to the <b>shift office</b> in the office block by the front doors. Keep to the walkway and watch for forklifts.");
});
var pod = PTX.pod;
if (pod) {
var ox = (pod.x0 + pod.x1) / 2, oz = pod.z1 - 1.5;
ptxDrillSpot(ox, oz, 0, 3, "Shift office", "hand in the delivery note", function () {
if (D.stage !== 1) {
setStatus("First fetch the delivery note from the goods-in desk by dock door 1.");
return;
}
var rows = [["Near misses", D.near ? String(D.near) : "none ✓"], ["There", Math.round(D.t1) + " s"], ["Back", Math.round(D.t - D.t1) + " s"]];
ptxDrillFinish(D.near === 0, rows, ["Forklifts cannot always see you: make eye contact with the driver before you cross.", "Walk on the green walkway, and cross only where the lines are.", "Never walk under raised forks or a load."]);
});
}
setStatus("🚜 <b>Forklift safety.</b> Go to the <b>goods-in desk</b> by dock door 1 (at the back of the warehouse) and pick up the delivery note, then bring it to the <b>shift office</b>. Forklifts are working: keep out of their way.");
},
function (D) {
var n = PTX.lite ? 5 : 7, list = PTX_HAZ.slice();
D.found = 0;
D.list = [];
for (var i = list.length - 1; i > 0; i--) {
var j = Math.floor(PTX.rnd() * (i + 1));
var t = list[i];
list[i] = list[j];
list[j] = t;
}
var areas = PTX.open.filter(function (o) { return (o.x1 - o.x0) > 1.2 && (o.z1 - o.z0) > 0.8; }), dyn = ptxDyn();
list.slice(0, n).forEach(function (H, i) {
var at;
if ((H.k === "exit" || H.k === "wedge") && PTX.exits.length) {
var E = PTX.exits[i % PTX.exits.length];
at = { x: E.ix + (E.x - E.ix) * 0.15, z: E.iz + (E.z - E.iz) * 0.15, y: 0 };
}
else if (H.k === "ext" && PTX.safety && PTX.safety.length) {
var C = PTX.safety[i % PTX.safety.length];
at = { x: C.x, z: C.z, y: C.y };
}
else
at = ptxAreaPoint(areas[(i * 5 + 2) % areas.length]);
var g = new THREE.Group();
g.position.set(at.x, at.y, at.z);
dyn.add(g);
if (H.k === "spill") {
var m = new THREE.Mesh(new THREE.CircleGeometry(0.9, 20), ptxMat(0x6A8AA8, null, { op: 0.6 }));
m.rotation.x = -Math.PI / 2;
m.position.y = 0.015;
m.scale.set(1.3, 0.8, 1);
g.add(m);
}
else if (H.k === "cable") {
var c = ptxBox(3.2, 0.03, 0.03, ptxMat(0xE86A10, null), 0, 0.02, 0, g);
c.rotation.y = 0.4;
}
else if (H.k === "exit") {
for (var b = 0; b < 5; b++)
ptxBox(0.7, 0.55, 0.55, ptxMat(PTX_CARD[b % 4], "wood"), (b % 3 - 1) * 0.75, 0.28 + (b > 2 ? 0.56 : 0), 0, g);
}
else if (H.k === "stack") {
for (var s = 0; s < 8; s++)
ptxBox(0.6, 0.45, 0.5, ptxMat(PTX_CARD[s % 4], "wood"), (s % 2) * 0.05, 0.23 + s * 0.45, 0, g).rotation.y = s * 0.06;
}
else if (H.k === "wedge") {
ptxBox(0.14, 0.05, 0.25, ptxMat(0xB89A6A, "wood"), 0, 0.03, 0, g);
}
else if (H.k === "ext") {
ptxBox(0.5, 0.3, 0.02, ptxMat(0xF4F4F4, null), 0, 1.2, 0, g);
}
else if (H.k === "pallet") {
var pl = ptxPallet(0, 0, 0, 0.3, false, g);
pl.rotation.z = 0.08;
}
else if (H.k === "drawer") {
ptxBox(0.45, 0.25, 0.5, ptxMat(0x6A6E74, "metal"), 0, 0.5, 0.3, g);
}
var rec = { H: H, x: at.x, z: at.z, y: at.y, found: false, g: g };
D.list.push(rec);
ptxDrillSpot(at.x, at.z, at.y, 1.8, H.n, "report it", function () {
if (rec.found)
return;
rec.found = true;
D.found++;
var tk = typeof wGlow === "function" ? wGlow(0x2AD84A, 0.8, 0.9) : null;
if (tk) {
tk.position.set(0, 1.4, 0);
g.add(tk);
}
setStatus("✅ <b>Reported: " + esc(H.n) + ".</b> " + esc(H.why) + " (" + D.found + " of " + D.list.length + " found)");
if (D.found >= D.list.length)
ptxHazardDone();
});
});
setStatus("⚠️ <b>Hazard hunt.</b> There are <b>" + D.list.length + " hazards</b> somewhere in this building. Walk round, look carefully, and press E by each one to report it. The training board can end the hunt early.");
},
function (D) {
var o = ptxFarArea(D.start, 10), p = ptxAreaPoint(o);
D.cas = p;
D.aed = false;
D.step = 0;
D.wrong = 0;
D.reached = false;
if (typeof wPerson === "function") {
try {
var g = wPerson("simcasualty", { title: PTX_JOB[PTX.spec.type] || "worker" });
g.rotation.x = -Math.PI / 2;
g.position.set(p.x, p.y + 0.18, p.z);
ptxDyn().add(g);
}
catch (e) { }
}
ptxDrillSpot(p.x, p.z, p.y, 2.2, "Colleague on the floor", "help them", function () { ptxAidCard(); });
setStatus("⛑️ <b>First aid response.</b> A colleague has collapsed somewhere in the building. <b>Find them</b> and help. The <b>first aid kit and AED</b> hang by the main entrance.");
},
function () {
var D = PTX.drill;
if (!D || D.k !== "firstaid") {
setStatus("⛑️ The first aid kit and the AED (defibrillator). An AED talks you through using it.");
return;
}
if (D.aed) {
setStatus("You already have the AED and first aid kit.");
return;
}
D.aed = true;
D.aedAt = D.t;
setStatus("⛑️ <b>You have the AED and the first aid kit.</b> " + (D.reached ? "Hurry back to your colleague." : "Now find your colleague."));
},
function () {
var D = PTX.drill;
if (!D || D.k !== "firstaid")
return;
if (!D.reached) {
D.reached = true;
D.reachAt = D.t;
}
if (D.step >= PTX_AID.length) {
if (!D.aed) {
setStatus("Fetch the AED from by the main entrance and bring it here.");
return;
}
ptxAidDone();
return;
}
var order = PTX_AID.map(function (s, i) { return i; });
order.sort(function (a, b) { return ((a * 7 + D.step * 3) % 5) - ((b * 7 + D.step * 3) % 5); });
var b = "", fns = {};
order.forEach(function (i) { if (i < D.step)
return; b += worldBtn("s" + i, PTX_AID[i], ""); fns["s" + i] = function () { if (i === D.step) {
D.step++;
setStatus("✅ " + esc(PTX_AID[i]) + ".");
if (D.step === 5 && !D.aed)
setStatus("✅ Good. Now <b>fetch the AED</b> yourself from by the main entrance, and come back.");
ptxAidCard();
}
else {
D.wrong++;
setStatus("Not yet: think what comes first.");
} }; });
worldCard(worldFacts("⛑️ Your colleague", "They are lying still on the floor. What do you do next? (step " + (D.step + 1) + " of " + PTX_AID.length + ")", [], []) + b, fns);
},
function () {
var D = PTX.drill;
var rows = [["Reached them", Math.round(D.reachAt) + " s"], ["AED brought", D.aed ? "yes ✓" : "no"], ["Steps in the right order", D.wrong ? (D.wrong + " wrong first") : "all ✓"]];
ptxDrillFinish(D.aed && D.wrong <= 1 && D.reachAt < 180, rows, ["Follow your own workplace's first aid procedure and training: this drill is practice in staying calm and getting help fast."]);
},
function (D) {
var o = ptxFarArea(D.start, 8), p = ptxAreaPoint(o);
D.sp = p;
D.step = 0;
D.kit = false;
D.wrong = 0;
var m = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), ptxMat(0x8A7A3A, null, { op: 0.65 }));
m.rotation.x = -Math.PI / 2;
m.position.set(p.x, p.y + 0.015, p.z);
m.scale.set(1.4, 0.9, 1);
ptxDyn().add(m);
D.puddle = m;
ptxDrillSpot(p.x, p.z, p.y, 2.4, "A spill on the floor", "deal with it", function () { ptxSpillCard(); });
setStatus("🧽 <b>Spill response.</b> Someone has knocked something over: there is a spill on the floor somewhere. Find it and make it safe. The <b>spill kit</b> is the yellow bin.");
},
function () {
var D = PTX.drill;
if (!D || D.k !== "spill")
return;
var b = "", fns = {};
PTX_SPILL.forEach(function (s, i) {
if (i < D.step)
return;
b += worldBtn("s" + i, s, "");
fns["s" + i] = function () {
if (i !== D.step) {
D.wrong++;
setStatus("Not yet: what keeps people safe first?");
return;
}
if (i === 2 && !D.kit) {
worldCard(null);
setStatus("Go and fetch the <b>spill kit</b> (the yellow bin), then come back.");
D.step = 3;
return;
}
if (i === 3 && !D.kit) {
setStatus("You need the spill kit first.");
return;
}
D.step++;
if (i === 0) {
for (var k = 0; k < 3; k++) {
var a = k * 2.1;
ptxCyl(0.02, 0.7, ptxMat(0xE8C020, null), D.sp.x + Math.cos(a) * 1.8, D.sp.y + 0.35, D.sp.z + Math.sin(a) * 1.6, ptxDyn(), 4, 0.3);
}
}
if (i === 3) {
if (D.puddle)
D.puddle.visible = false;
worldCard(null);
ptxDrillFinish(D.wrong <= 1, [["Signs out first", D.wrong ? "no" : "yes ✓"], ["Spill kit used", "yes ✓"]], ["Signs first, then report it, then clear it up with the kit.", "If you do not know what has spilled, keep away and tell your supervisor."]);
return;
}
ptxSpillCard();
};
});
worldCard(worldFacts("🧽 The spill", "What do you do next?", [], []) + b, fns);
},
function () {
var night = PTX.spec && PTX.spec.night;
return night ? { top: 0x0A1022, low: 0x1A2236, fogD: 0.004, sun: 0.12, sunCol: 0x8A9AD8, hemi: 0.42, hemiCol: 0x9AA8C8, hemiGround: 0x2A2A30, stars: 0.6 }
: { top: 0x4F86CC, low: 0xAFC6DC, fogD: 0.0007, sun: 0.72, sunCol: 0xFFF0DC, sunDir: [0.5, 0.85, 0.35], hemi: 0.62, hemiCol: 0xDCE6F0, hemiGround: 0x6A6458, stars: 0 };
},
function (opt) {
var A = PTX.arrive;
camera.position.set(PTX.base + A.x, 1.72, A.z);
if (typeof yaw !== "undefined")
yaw = 0;
if (typeof pitch !== "undefined")
pitch = 0;
PTX.enteredAt = Date.now();
PTX.drill = null;
var S = PTX.spec, dr = ptxDrillsHere().filter(function (k) { return S.drills.indexOf(k) >= 0; });
setStatus("🏗️ <b>" + esc(S.title) + "</b> is built. Walk in through the front doors: every door opens and every floor is there." + (dr.length ? " The <b>training board</b> by the doors starts the " + esc(dr.map(function (k) { return PTX_DRILLS[k].n.toLowerCase(); }).join(" and ")) + "." : " Press E at the <b>training board</b> for drills and the floor plan."));
},
function (dt) {
if (!PTX.built)
return;
PTX.t += dt;
try {
ptxPeopleTick(dt);
}
catch (e) {
if (!PTX.e1) {
PTX.e1 = 1;
console.warn("[sim-studio] people", e);
}
}
try {
ptxForksTick(dt);
}
catch (e) {
if (!PTX.e2) {
PTX.e2 = 1;
console.warn("[sim-studio] forklifts", e);
}
}
try {
ptxDrillTick(dt);
}
catch (e) {
if (!PTX.e3) {
PTX.e3 = 1;
console.warn("[sim-studio] drill", e);
}
}
PTX.fx.forEach(function (f) { if (f.k === "belt")
f.list.forEach(function (b) { b.position.x += dt * 0.8; if (b.position.x > f.x1 - 0.4)
b.position.x = f.x0 + 0.4; }); });
var D = PTX.drill, S = PTX.spec, st = ptxStorey();
worldBanner("<b>🏗️ " + esc(S.title) + "</b>" + (S.storeys > 1 || PTX.pod ? " · " + (st === 0 ? "ground floor" : ptxFloorName(st) + " floor") : "") + (D && D.on ? " · " + PTX_DRILLS[D.k].i + " " + Math.floor(D.t / 60) + ":" + ("0" + Math.floor(D.t % 60)).slice(-2) + (D.k === "hazard" ? " · " + D.found + "/" + D.list.length + " found" : "") : ""));
PTX.pt += dt;
if (PTX.pt < 0.15)
return;
PTX.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
var L = worldLocal(), feet = camera.position.y - 1.72, best = null, bd = 1e9;
PTX.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
if (Math.abs((s.y || 0) - feet) > 2.2)
return;
var d = Math.hypot(L.x - s.x, L.z - s.z);
if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
}
});
if (best)
worldPrompt("<b>" + esc(best.name) + "</b> · <b>press E</b> to " + esc(best.verb), best.fn);
else
worldPrompt(null);
},
function () {
var S = PTX.spec, D = PTX.drill, b = "", fns = {};
if (D && D.on) {
b += worldBtn("stop", "⏹ Stop the " + PTX_DRILLS[D.k].n.toLowerCase(), "");
fns.stop = function () { if (D.k === "hazard") {
ptxHazardDone();
return;
} worldCard(null); ptxDrillEnd(); };
}
ptxDrillsHere().forEach(function (k) { var R = PTX_DRILLS[k]; b += worldBtn("d" + k, R.i + " " + R.n + (S.drills.indexOf(k) >= 0 ? " ★" : ""), R.sub); fns["d" + k] = function () { ptxDrillStart(k); }; });
b += worldBtn("plan", "🗺️ Floor plan", "Where you are, the exits and the assembly point");
fns.plan = function () { ptxPlanCard(); };
b += worldBtn("rec", "📈 Training records", "Every drill done on this device");
fns.rec = function () { ptxRecordsCard(); };
b += worldBtn("studio", "🏗️ Build something else", "Back to the studio: type or say a new scenario");
fns.studio = function () { worldCard(null); ptxOpen(); };
var area = Math.round(S.w * S.d * S.storeys);
worldCard(worldFacts("📋 Training board", S.text ? ("“" + S.text.slice(0, 160) + (S.text.length > 160 ? "…" : "") + "”") : S.title, [["Building", S.title.split(" · ")[0]], ["Size", S.w + " × " + S.d + " m" + (S.storeys > 1 ? ", " + S.storeys + " floors" : "")], ["Floor area", area.toLocaleString() + " m² (" + Math.round(area * 10.764).toLocaleString() + " sq ft)"], ["Ways out", PTX.exits.filter(function (E) { return E.exit; }).length + " doors to the outside"]], []) + b, fns);
},
function () {
var S = PTX.spec, st = ptxStorey(), H = PTX.storeyH || 3.4, y0 = st * H, pad = 8, W = S.w + pad * 2, Dd = S.d + pad * 2 + 34, px = 300, sc = px / W, ph = Math.round(Dd * sc);
var cv = document.createElement("canvas");
cv.width = px * 2;
cv.height = ph * 2;
var x = cv.getContext("2d");
x.scale(2, 2);
function X(v) { return (v + S.w / 2 + pad) * sc; }
function Z(v) { return (v + S.d / 2 + pad) * sc; }
x.fillStyle = "#E8ECEF";
x.fillRect(0, 0, px, ph);
x.fillStyle = "#C8D0C8";
x.fillRect(0, Z(S.d / 2 + 4), px, ph);
x.fillStyle = "#FFFFFF";
x.fillRect(X(-S.w / 2), Z(-S.d / 2), S.w * sc, S.d * sc);
x.fillStyle = "#2A2E36";
PTX.solids.forEach(function (s) { if (s.r !== undefined || s.hw === undefined)
return; if (s.b !== undefined && (s.b > y0 + 1 || s.b + s.h < y0 + 0.5))
return; x.fillRect(X(s.x - s.hw), Z(s.z - s.hd), Math.max(1, s.hw * 2 * sc), Math.max(1, s.hd * 2 * sc)); });
x.fillStyle = "#0E8A3E";
PTX.exits.forEach(function (E) { if (!E.exit)
return; x.beginPath(); x.arc(X(E.ix + (E.x - E.ix) * 0.5), Z(E.iz + (E.z - E.iz) * 0.5), 4, 0, 6.3); x.fill(); });
if (PTX.assembly) {
x.strokeStyle = "#0E8A3E";
x.lineWidth = 2;
x.beginPath();
x.arc(X(PTX.assembly.x), Z(PTX.assembly.z), 6, 0, 6.3);
x.stroke();
x.font = "9px sans-serif";
x.fillText("assembly point", X(PTX.assembly.x) - 30, Z(PTX.assembly.z) + 16);
}
var L = worldLocal();
x.fillStyle = "#D81A1A";
x.beginPath();
x.arc(X(L.x), Z(L.z), 4, 0, 6.3);
x.fill();
x.fillStyle = "#1E2632";
x.font = "bold 10px sans-serif";
x.fillText((st === 0 ? "Ground floor" : ptxFloorName(st) + " floor") + " · " + S.w + " × " + S.d + " m · north ↑", 6, 12);
var url = "";
try {
url = cv.toDataURL("image/png");
}
catch (e) { }
worldCard(worldFacts("🗺️ Floor plan", "Red: you. Green: the ways out and the assembly point.", [], [], url ? "<img alt='Floor plan' src='" + url + "' style='width:100%;margin-top:8px;border-radius:4px;border:1px solid #445'>" : "") + worldBtn("back", "← Training board", ""), { back: function () { ptxBoardCard(); } });
},
function () {
var R = ptxRecords().slice(0, 20);
var rows = R.map(function (r) { var d = new Date(r.at); return [d.toLocaleDateString() + " " + d.toLocaleTimeString().slice(0, 5), (r.pass ? "✅ " : "🔁 ") + (PTX_DRILLS[r.drill] ? PTX_DRILLS[r.drill].n : r.drill) + ", " + r.time + " s · " + r.title.split(" · ")[0]]; });
worldCard(worldFacts("📈 Training records", R.length ? "The last " + R.length + " drills on this device" : "No drills done yet on this device.", rows, []) + worldBtn("back", "← Training board", ""), { back: function () { ptxBoardCard(); } });
},
function (S) {
if (!S || !S.text) {
ptxMsg("Type or say a scenario first.");
return false;
}
if (!ptxAllowed()) {
setStatus("🏗️ The " + PTX_NAME + " is closed just now.");
return false;
}
if (typeof worldGo !== "function" || typeof WORLDS === "undefined" || !WORLDS[PTX_KEY])
return false;
var W = WORLDS[PTX_KEY], was = WLD.on === PTX_KEY;
if (was)
worldOff(true);
if (W.g) {
if (typeof worldLetGo === "function" && WLG.keys.indexOf(PTX_KEY) >= 0)
worldLetGo(PTX_KEY);
if (W.g) {
scene.remove(W.g);
W.g = null;
}
ptxForget();
}
PTX.spec = S;
PTX.e1 = PTX.e2 = PTX.e3 = 0;
ptxSaveAdd(S);
ptxClose();
var ok = worldGo(PTX_KEY, { keepFrom: was });
if (ok && S.src !== "ai")
ptxAiLater(S);
return ok;
},
function (text) {
var cf = typeof cfg === "function" ? cfg() : { mode: "off" }, K = ptxKeeper();
if (K.ai === false || cf.mode === "off" || typeof llmTarget !== "function" || !(typeof aiBought !== "function" || aiBought()))
return Promise.resolve(null);
var types = PTX_TYPES.map(function (T) { return T[0]; }).join(", "), things = PTX_THINGS.map(function (T) { return T[0]; }).join(", ");
var msgs = [{ role: "system", content: "You turn a short description of a training scenario or a building into a plan for a 3D walk-through simulator. Reply with ONE JSON object and nothing else: " +
"{\"type\": one of [" + types + "], \"storeys\": 1-6, \"w\": width in metres, \"d\": depth in metres, \"skin\": one of [glass, brick, timber, metal, concrete, plaster], " +
"\"items\": {key: count} using only these keys [" + things + "] (use -1 for 'some'), \"drills\": a list from [fire, forklift, hazard, firstaid, spill], \"blocked\": true if an exit is blocked, \"night\": true if it is dark}. " +
"Pick the type that best fits even if the words are unusual. Sizes must be realistic for the building." }, { role: "user", content: String(text).slice(0, 600) }];
var ready = (cf.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
return ready.then(function () { var T = llmTarget(cf); return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(cf, { temperature: 0.2, max_tokens: 900, messages: msgs })) }); })
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) {
var c = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "", i = c.indexOf("{"), j = c.lastIndexOf("}");
if (i < 0 || j <= i)
return null;
var o = JSON.parse(c.slice(i, j + 1));
o.src = "ai";
return ptxClean(o, text);
})
.catch(function () { return null; });
},
function (S) {
if (PTX.aiBusy)
return;
PTX.aiBusy = true;
ptxAiRead(S.text).then(function (A) {
PTX.aiBusy = false;
if (!A || PTX.spec !== S || WLD.on !== PTX_KEY || !ptxDiffers(A, S))
return;
PTX.aiSpec = A;
var L = worldLocal(), near = Math.hypot(L.x - PTX.arrive.x, L.z - PTX.arrive.z) < 12 && Date.now() - PTX.enteredAt < 9000 && !PTX.drill;
if (near) {
ptxLaunch(A);
setStatus("✨ <b>Read in full:</b> " + esc(A.title) + ". Rebuilt with everything your words describe.");
return;
}
worldCard(worldFacts("✨ A fuller version is ready", "The city's AI read your scenario and has a more detailed layout.", [["Now", S.title], ["Fuller", A.title]], []) +
worldBtn("go", "Rebuild it with the fuller layout", "You start again at the front") + worldBtn("no", "Keep this one", ""), { go: function () { worldCard(null); ptxLaunch(A); }, no: function () { worldCard(null); } });
});
},
function () {
if (!ptxAllowed()) {
setStatus("🏗️ The " + PTX_NAME + " is closed just now.");
return;
}
if (typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting) {
var last = ptxSaved()[0];
ptxLaunch(last ? (last.s ? ptxClean(last.s, last.t) : ptxRead(last.t)) : ptxRead(PTX_EXAMPLES[0]));
return;
}
var p = document.getElementById("ptx-panel");
if (!p) {
p = document.createElement("div");
p.id = "ptx-panel";
p.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:70;width:min(560px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow:auto;" +
"background:rgba(10,14,24,.97);border:1px solid #8FB4E8;border-radius:10px;padding:16px 18px;font:14px/1.5 var(--sans,system-ui);color:#E8ECF4;box-shadow:0 10px 40px rgba(0,0,0,.5)";
document.body.appendChild(p);
p.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Escape")
ptxClose(); });
p.addEventListener("keyup", function (e) { e.stopPropagation(); });
}
var SR = window.SpeechRecognition || window.webkitSpeechRecognition, K = ptxKeeper(), ex = PTX_EXAMPLES.concat(Array.isArray(K.examples) ? K.examples.filter(function (s) { return typeof s === "string" && s.trim(); }).slice(0, 12) : []);
var saved = ptxSaved();
p.innerHTML = "<div style='display:flex;justify-content:space-between;align-items:center'><div style='font:600 19px var(--serif,Georgia);color:#FFE7B0'>🏗️ " + PTX_NAME + "</div><span id='ptx-x' role='button' tabindex='0' aria-label='Close' style='cursor:pointer;font-size:18px;opacity:.75'>✕</span></div>" +
"<p style='margin:6px 0 10px;opacity:.85'>Type or say a scenario, and walk straight into it: the building, what is in it, and the drill. On a computer, a phone or a Quest 2.</p>" +
"<textarea id='ptx-text' rows='3' maxlength='600' placeholder='e.g. a warehouse with three forklifts and a fire exit drill' style='width:100%;box-sizing:border-box;padding:10px;border-radius:6px;border:1px solid #556;background:#0E1420;color:#F0F2F8;font:15px var(--sans,system-ui);resize:vertical'></textarea>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap;margin:8px 0'>" +
(SR ? "<button class='btn' id='ptx-mic' type='button'>🎤 Speak</button>" : "") +
"<button class='btn primary' id='ptx-go' type='button' style='flex:1;min-width:180px'>▶ Build it and walk in</button></div>" +
"<div style='margin:0 0 8px;font-size:12.5px;opacity:.9'>Made your own 3D model? <button class='btn' id='ptx-up' type='button'>🧊 Upload your own model</button> <span style='opacity:.75'>(a .glb file; a moderator looks at it first, then it can be a door, a sign or a vending machine)</span></div>" +
"<div id='ptx-msg' style='min-height:18px;font-size:13px;color:#F0C040'>" + (SR ? "" : "Speaking needs a browser that can listen (Chrome, Edge, Android). You can type instead.") + "</div>" +
"<div style='margin-top:8px;font-weight:600;opacity:.9'>Try one</div><div id='ptx-ex' style='display:flex;flex-wrap:wrap;gap:6px;margin-top:4px'>" +
ex.map(function (t, i) { return "<span role='button' tabindex='0' data-ex='" + i + "' style='cursor:pointer;padding:4px 9px;border:1px solid rgba(143,180,232,.5);border-radius:14px;font-size:12.5px;background:rgba(143,180,232,.08)'>" + esc(t) + "</span>"; }).join("") + "</div>" +
(saved.length ? "<div style='margin-top:12px;font-weight:600;opacity:.9'>Your scenarios</div><div id='ptx-saved'>" + saved.slice(0, 12).map(function (r, i) {
return "<div style='display:flex;gap:6px;align-items:center;margin:5px 0;padding:6px 8px;border:1px solid rgba(143,180,232,.25);border-radius:6px'><div style='flex:1;font-size:13px'><b>" + esc(r.title || "Scenario") + "</b><div style='opacity:.7;font-size:12px'>" + esc(r.t.slice(0, 90)) + "</div></div>" +
"<button class='btn' data-open='" + i + "' type='button'>Open</button><button class='btn' data-share='" + i + "' type='button'>Share</button><button class='btn' data-del='" + i + "' type='button' aria-label='Remove'>✕</button></div>";
}).join("") + "</div>" : "") +
"<input id='ptx-link' readonly style='display:none;width:100%;box-sizing:border-box;margin-top:6px;padding:6px;border-radius:4px;border:1px solid #556;background:#0E1420;color:#CFE'>" +
"<p style='margin:10px 0 0;font-size:12px;opacity:.65'>Scenarios are kept on this device. Share makes a link with your words in it, so anyone who opens it walks into the same place. Every drill is kept as a training record (the training board, inside the building).</p>";
p.style.display = "block";
var ta = document.getElementById("ptx-text");
ta.focus();
document.getElementById("ptx-x").onclick = ptxClose;
document.getElementById("ptx-go").onclick = function () { ptxGoText(ta.value); };
var up = document.getElementById("ptx-up");
if (up)
up.onclick = function () { ptxClose(); if (typeof mwOpen === "function")
mwOpen("mine"); };
ta.onkeydown = function (e) { if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
ptxGoText(ta.value);
} };
var mic = document.getElementById("ptx-mic");
if (mic)
mic.onclick = function () { if (PTX.rec)
ptxListenStop();
else
ptxListen(ta, mic); };
Array.prototype.forEach.call(p.querySelectorAll("[data-ex]"), function (s) { s.onclick = function () { ta.value = ex[+s.getAttribute("data-ex")]; ptxMsg("Press <b>Build it and walk in</b>, or change the words first."); }; });
Array.prototype.forEach.call(p.querySelectorAll("[data-open]"), function (b) { b.onclick = function () { var r = saved[+b.getAttribute("data-open")]; if (r)
ptxLaunch(r.s ? ptxClean(r.s, r.t) : ptxRead(r.t)); }; });
Array.prototype.forEach.call(p.querySelectorAll("[data-del]"), function (b) { b.onclick = function () { var r = saved[+b.getAttribute("data-del")]; if (r) {
ptxSaveDel(r.t);
ptxOpen();
} }; });
Array.prototype.forEach.call(p.querySelectorAll("[data-share]"), function (b) {
b.onclick = function () {
var r = saved[+b.getAttribute("data-share")];
if (!r)
return;
var S = r.s ? ptxClean(r.s, r.t) : ptxRead(r.t), url = ptxLink(S), li = document.getElementById("ptx-link");
li.style.display = "block";
li.value = url;
li.select();
var done = function () { ptxMsg("🔗 <b>Link copied.</b> Anyone who opens it walks into the same place."); };
try {
if (navigator.clipboard && navigator.clipboard.writeText)
navigator.clipboard.writeText(url).then(done, function () { ptxMsg("Copy the link below."); });
else {
document.execCommand("copy");
done();
}
}
catch (e) {
ptxMsg("Copy the link below.");
}
};
});
},
function (ta, btn) {
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR)
return;
try {
var r = new SR();
r.lang = navigator.language || "en-US";
r.interimResults = true;
r.continuous = false;
var base = ta.value.trim(), got = "";
r.onresult = function (e) { got = ""; for (var i = 0; i < e.results.length; i++)
got += e.results[i][0].transcript; ta.value = (base ? base + " " : "") + got; };
r.onerror = function (e) { ptxMsg(e && e.error === "not-allowed" ? "The microphone is blocked for this page. Allow it in the browser, or type instead." : "I did not catch that. Try again, or type it."); };
r.onend = function () { PTX.rec = null; btn.textContent = "🎤 Speak"; if (got.trim())
ptxMsg("Got it. Press <b>Build it and walk in</b>, or speak again to add more."); };
PTX.rec = r;
r.start();
btn.textContent = "⏹ Stop";
ptxMsg("Listening… say the building, what is in it, and the drill.");
}
catch (e) {
PTX.rec = null;
ptxMsg("The microphone could not start. You can type instead.");
}
}
];
});
