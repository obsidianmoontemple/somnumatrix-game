/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(436, function () {
"use strict";
return [
function (id, n) {
var rs = lpRs(id), side = n <= 6 ? -1 : 1, k = (n - 1) % 6, j = k % 3, sg = k < 3 ? -1 : 1, t = sg * (LP_ROAD + LP_PAVE + LP_W / 2 + 6 + j * (LP_W + 4));
var r = rs + side * (LP_ROAD + LP_PAVE + LP_DEEP / 2 + 0.5), a = lpMid(id) + t / r;
var rot = side < 0 ? rotOut(a) : rotIn(a);
return { id: id * 100 + n, d: id, n: n, r: r, a: a, rot: rot, side: side, x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r, y: typeof terrainY === "function" ? terrainY(ATLC.x + Math.cos(a) * r, ATLC.z + Math.sin(a) * r) : 25 };
},
function () {
var need = false;
((LP.b && LP.b.plots) || []).forEach(function (p) { (p.build || []).forEach(function (e) { if (e.k === "model" && typeof FURN !== "undefined" && !FURN[e.a])
need = true; }); });
if ((need || (LP.b && LP.b.models && LP.b.models.length)) && typeof mwLoadList === "function" && !LP.mwAsked) {
LP.mwAsked = true;
mwLoadList(false).then(function () { LP.key = ""; LP.sk = {}; Object.keys(LP.built).forEach(function (k) { LP.built[k].key = ""; }); lpDress(); }).catch(function () { });
}
},
function (k, col, tex, o) {
if (LP.mats[k])
return LP.mats[k];
o = o || {};
var m = o.basic ? new THREE.MeshBasicMaterial({ color: col }) : new THREE.MeshLambertMaterial({ color: col });
if (tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
if (o.e !== undefined && !o.basic) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.ds)
m.side = THREE.DoubleSide;
if (o.po) {
m.polygonOffset = true;
m.polygonOffsetFactor = -1;
m.polygonOffsetUnits = o.po;
}
return (LP.mats[k] = m);
},
function (pts, y, mat) {
var pos = [], uv = [], nor = [], idx = [];
for (var i = 0; i < pts.length; i += 2) {
var a = pts[i], b = pts[i + 1];
pos.push(a.x, y, a.z, b.x, y, b.z);
uv.push(a.x / 2, a.z / 2, b.x / 2, b.z / 2);
nor.push(0, 1, 0, 0, 1, 0);
if (i >= 2) {
var q = i - 2;
lpTri(idx, pos, q, q + 1, q + 2);
lpTri(idx, pos, q + 1, q + 3, q + 2);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
return m;
},
function (g, x, y, z, face) {
var post = lpMat("post", 0x2E3236, "metal"), head = lpMat("lamphead", 0x1E2024, "metal"), glow = lpMat("glow", 0xFFE6B0, null, { basic: true });
lpCyl(g, 0.09, 5.4, post, x, y + 2.7, z, 8, 0.07);
lpCyl(g, 0.2, 0.5, post, x, y + 0.25, z, 8, 0.16);
var arm = lpBox(g, 1.3, 0.08, 0.08, post, x + Math.cos(face) * 0.6, y + 5.3, z + Math.sin(face) * 0.6, -face);
lpBox(g, 0.5, 0.24, 0.34, head, x + Math.cos(face) * 1.2, y + 5.2, z + Math.sin(face) * 1.2, -face);
lpBox(g, 0.42, 0.05, 0.28, glow, x + Math.cos(face) * 1.2, y + 5.06, z + Math.sin(face) * 1.2, -face);
},
function (g, x, y, z, seed, s) {
s = s || 1;
if (typeof KIT !== "undefined" && KIT.tree && typeof build === "function" && !lpLite()) {
try {
var t = build({ id: "lp-tree-" + seed, archetype: seed % 4 === 0 && KIT.pine ? "pine" : "tree", attrs: { s: 0.8 + (seed % 3) * 0.12 }, x: 0, z: 0, rot: seed * 1.3, detail: 2, found: true, city: true });
t.position.set(x, y, z);
t.rotation.y = seed * 1.3;
g.add(t);
return;
}
catch (e) { }
}
var bark = lpMat("bark", 0x5A4632, "bark"), L = [lpMat("leafA", 0x4E7A36, "foliage"), lpMat("leafB", 0x5E8A3A, "foliage"), lpMat("leafC", 0x46703E, "foliage")];
var h = (3.2 + (seed % 5) * 0.35) * s;
lpCyl(g, 0.22 * s, h, bark, x, y + h / 2, z, 7, 0.15 * s);
var n = lpLite() ? 2 : 3;
for (var i = 0; i < n; i++) {
var a = seed * 1.7 + i * 2.1, rr = (1.9 + ((seed + i) % 3) * 0.3) * s;
var m = new THREE.Mesh(new THREE.IcosahedronGeometry(rr, 1), L[(seed + i) % 3]);
m.position.set(x + Math.cos(a) * 0.7 * s, y + h + 0.6 * s + i * 0.8 * s, z + Math.sin(a) * 0.7 * s);
m.scale.y = 0.82;
m.castShadow = !lpLite();
g.add(m);
}
},
function (g, x, y, z, ry) {
var wood = lpMat("benchwood", 0x8A5A34, "wood"), iron = lpMat("iron", 0x2A2C30, "metal"), b = new THREE.Group();
b.position.set(x, y, z);
b.rotation.y = ry;
g.add(b);
lpBox(b, 1.8, 0.06, 0.45, wood, 0, 0.46, 0);
lpBox(b, 1.8, 0.4, 0.05, wood, 0, 0.75, -0.2);
[-0.8, 0.8].forEach(function (px) { lpBox(b, 0.06, 0.46, 0.42, iron, px, 0.23, 0); });
},
function (g, x, y, z, ry, seed) {
var stone = lpMat("planter", 0xA89C88, "stone"), soil = lpMat("soil", 0x4A3A2A, "earth"), fl = [lpMat("flA", 0xD85A78), lpMat("flB", 0xE8C04A), lpMat("flC", 0x8A6AD8), lpMat("flD", 0xF0F0E8)];
var p = new THREE.Group();
p.position.set(x, y, z);
p.rotation.y = ry;
g.add(p);
lpBox(p, 2.4, 0.5, 1.0, stone, 0, 0.25, 0, 0, true);
lpBox(p, 2.2, 0.04, 0.8, soil, 0, 0.5, 0);
for (var i = 0; i < (lpLite() ? 4 : 9); i++) {
var m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), fl[(seed + i) % 4]);
m.position.set(-0.95 + (i % 5) * 0.48, 0.62 + (i % 2) * 0.08, (i % 3 - 1) * 0.24);
p.add(m);
}
},
function (lines, w, h, bg, fg, accent) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, w, h);
x.strokeStyle = accent || "#E8C67A";
x.lineWidth = Math.max(4, w / 90);
x.strokeRect(6, 6, w - 12, h - 12);
x.textAlign = "center";
var y = h * 0.3;
lines.forEach(function (L, i) {
var fs = i === 0 ? Math.round(h * 0.2) : Math.round(h * 0.11);
x.font = (i === 0 ? "700 " : "") + fs + "px " + (i === 0 ? "Georgia,serif" : "sans-serif");
x.fillStyle = i === 0 ? fg : "#D8C8A0";
var t = String(L);
while (x.measureText(t).width > w - 40 && fs > 10) {
fs -= 2;
x.font = (i === 0 ? "700 " : "") + fs + "px " + (i === 0 ? "Georgia,serif" : "sans-serif");
}
x.fillText(t, w / 2, y);
y += i === 0 ? h * 0.2 : h * 0.14;
});
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace)
t.colorSpace = THREE.SRGBColorSpace;
t.lpOwn = 1;
return t;
},
function (g, x, y, z, ry, lines, W, H, o) {
o = o || {};
var post = lpMat("signpost", 0x3A2A1C, "wood"), b = new THREE.Group();
b.position.set(x, y, z);
b.rotation.y = ry;
g.add(b);
var top = (o.low ? 1.1 : 1.6) + H;
lpBox(b, 0.12, top, 0.12, post, -W / 2 + 0.15, top / 2, 0);
lpBox(b, 0.12, top, 0.12, post, W / 2 - 0.15, top / 2, 0);
lpBox(b, W + 0.1, H + 0.1, 0.08, post, 0, top - H / 2, -0.03);
var face = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: lpSignTex(lines, 512, Math.round(512 * H / W), o.bg || "#1A1612", o.fg || "#F2E6C4", o.accent) }));
face.position.set(0, top - H / 2, 0.02);
face.userData.keep = 1;
face.userData.lpOwn = 1;
b.add(face);
var back = face.clone();
back.rotation.y = Math.PI;
back.position.z = -0.08;
b.add(back);
return b;
},
function (id, G0) {
var D = lpDistrict(id), st = D ? D.status : "waiting", use = (D && D.use) || "homes", rs = lpRs(id), am = lpMid(id), half = lpHalfArc(id), y = G0.y;
var g = new THREE.Group();
g.name = "land-" + id;
g.position.set(ATLC.x, 0, ATLC.z);
var asph = lpMat("asph", 0x3E4044, "asphalt", { po: -2, ds: 1 }), pave = lpMat("pave", 0xB8B2A6, "paving", { po: -3, ds: 1 }), kerb = lpMat("kerb", 0x9A968E, "stone", { ds: 1 }), line = lpMat("line", 0xE8E4D8, null, { po: -4, ds: 1 }), grass = lpMat("plotgrass", 0x6E9A4E, "grass", { po: -1, ds: 1 });
var lite = lpLite(), lane0 = 1790 + 6, laneEnd = rs + (LP_D[id].band === 0 && lpDistrict(id + 4) && lpDistrict(id + 4).status !== "waiting" ? 0 : 0);
if (st !== "open") {
var stake = lpMat("stake", 0xD8C8A8, "wood"), red = lpMat("staketop", 0xC83A2A), tape = lpMat("tape", 0xE8E0D0, null, { ds: 1 });
for (var t = -half; t <= half + 1e-6; t += 12 / rs) {
[rs - LP_ROAD, rs + LP_ROAD].forEach(function (rr) { var p = lpAt(rr, am + t); lpBox(g, 0.1, 1.2, 0.1, stake, p.x, y + 0.6, p.z); lpBox(g, 0.12, 0.18, 0.12, red, p.x, y + 1.15, p.z); });
}
[rs - LP_ROAD, rs + LP_ROAD].forEach(function (rr) { var m = lpFlat(lpArcPts(rr - 0.03, rr + 0.03, am - half, am + half), y + 1.0, tape); m.material = tape; g.add(m); });
var bed = lpMat("roadbed", 0x7A6A52, "earth", { po: -1, ds: 1 });
g.add(lpFlat(lpArcPts(rs - LP_ROAD, rs + LP_ROAD, am - half, am + half), y + 0.03, bed));
if (LP_D[id].band === 0)
g.add(lpFlat(lpRadPts(am, LP_ROAD, 1796, rs - LP_ROAD), y + 0.03, bed));
var tp = lpAt(rs + LP_ROAD + 3, am + 6 / rs), leg = lpMat("tripod", 0xC8A040, "wood"), inst = lpMat("theo", 0x2A3A4A, "metal");
for (var l = 0; l < 3; l++) {
var la = l * 2.09, m2 = lpBox(g, 0.06, 1.5, 0.06, leg, tp.x + Math.cos(la) * 0.3, y + 0.72, tp.z + Math.sin(la) * 0.3);
m2.rotation.set(Math.sin(la) * 0.25, 0, -Math.cos(la) * 0.25);
}
lpBox(g, 0.3, 0.25, 0.22, inst, tp.x, y + 1.55, tp.z);
var hp = lpAt(rs + LP_ROAD + 12, am - 14 / rs), hut = lpMat("hut", 0x8A7050, "wood"), hroof = lpMat("hutroof", 0x4A4C50, "metalroof");
lpBox(g, 3.2, 2.4, 2.4, hut, hp.x, y + 1.2, hp.z, rotAlong(am), true);
lpBox(g, 3.6, 0.12, 2.8, hroof, hp.x, y + 2.5, hp.z, rotAlong(am));
var lp = lpAt(lane0 + 10, am + 7 / (lane0 + 10)), payers = (LP.b && LP.b.payers) || 0;
var lines = st === "vote" ? [D.name, "Surveyed for a new street", "The High Council chooses what it becomes", "homes · shops · gardens · workshops", "by " + new Date(D.vote_until).toLocaleDateString()] :
[D ? D.name : "A new street", "Marked out for the city to grow", "Opens when Somnucor has " + (D ? lpG(D.need) : "more") + " dreamers", "whose dues are paid (now " + lpG(payers) + ")"];
lpBoard(g, lp.x, y, lp.z, rotIn(am) + Math.PI, lines, 3.4, 2.0, { accent: st === "vote" ? "#7AB8E8" : "#C8A06A" });
if (typeof gwBake === "function")
try {
gwBake(g);
}
catch (e) { }
return g;
}
g.add(lpFlat(lpArcPts(rs - LP_ROAD, rs + LP_ROAD, am - half, am + half), y + 0.05, asph));
for (var dl = -half; dl < half; dl += 6 / rs)
g.add(lpFlat(lpArcPts(rs - 0.08, rs + 0.08, am + dl, am + dl + 3 / rs), y + 0.06, line));
[-1, 1].forEach(function (s) {
var r0 = rs + s * LP_ROAD, r1 = rs + s * (LP_ROAD + LP_PAVE);
g.add(lpFlat(lpArcPts(Math.min(r0, r1), Math.max(r0, r1), am - half, am + half), y + 0.12, pave));
var kp = lpArcPts(r0 - 0.12, r0 + 0.12, am - half, am + half);
g.add(lpFlat(kp, y + 0.16, kerb));
});
var far = LP_D[id].band === 0 ? lpDistrict(id + 4) : null, toR = (far && far.status === "open") ? LP_RS[1] - LP_ROAD : rs - LP_ROAD;
if (LP_D[id].band === 0) {
g.add(lpFlat(lpRadPts(am, LP_ROAD, lane0, rs - LP_ROAD), y + 0.05, asph));
[-1, 1].forEach(function (s) { g.add(lpFlat(lpRadPts(am + s * (LP_ROAD + LP_PAVE / 2) / ((lane0 + rs) / 2), LP_PAVE / 2, lane0 + 2, rs - LP_ROAD), y + 0.12, pave)); });
if (toR > rs + LP_ROAD)
g.add(lpFlat(lpRadPts(am, LP_ROAD, rs + LP_ROAD, toR), y + 0.05, asph));
}
else
g.add(lpFlat(lpRadPts(am, LP_ROAD, LP_RS[0] + LP_ROAD, rs - LP_ROAD), y + 0.05, asph));
var step = lite ? 36 : 24, n = 0;
for (var tt = -half + 8 / rs; tt <= half; tt += step / rs) {
if (Math.abs(tt) * rs < LP_ROAD + 3)
continue;
[-1, 1].forEach(function (s) {
var rr = rs + s * (LP_ROAD + LP_PAVE - 0.5), p = lpAt(rr, am + tt + (s > 0 ? step / 2 / rs : 0));
lpLamp(g, p.x, y + 0.12, p.z, Math.atan2(-p.z, -p.x) + (s > 0 ? 0 : Math.PI));
});
if (!lite || n % 2 === 0) {
var s2 = n % 2 ? 1 : -1, rt = rs + s2 * (LP_ROAD + LP_PAVE - 1.1), pt = lpAt(rt, am + tt + step / 4 / rs);
lpTree(g, pt.x, y + 0.12, pt.z, id * 31 + n, 0.9);
}
n++;
}
for (var k = 0; k < 6; k++) {
var tk = (k < 3 ? -1 : 1) * (LP_ROAD + LP_PAVE + LP_W + 8 + (k % 3) * (LP_W + 4)) / rs, sd = k % 2 ? 1 : -1;
var p2 = lpAt(rs + sd * (LP_ROAD + LP_PAVE - 0.9), am + tk), face = Math.atan2(p2.x, p2.z) + (sd > 0 ? 0 : Math.PI);
if (use === "homes" || use === "gardens")
lpBench(g, p2.x, y + 0.12, p2.z, rotAlong(am + tk) + (sd > 0 ? Math.PI / 2 : -Math.PI / 2));
if (use === "gardens" || use === "shops") {
var p3 = lpAt(rs - sd * (LP_ROAD + LP_PAVE - 0.9), am + tk);
lpPlanter(g, p3.x, y + 0.12, p3.z, rotAlong(am + tk), k);
}
}
if (use === "shops")
lpBunting(g, rs, am, half, y);
if (use === "gardens")
lpFountain(g, rs, am, y);
if (use === "workshops")
lpYardThings(g, rs, am, y);
var bp = lpAt(lane0 + 12, am + (LP_ROAD + LP_PAVE + 2.5) / (lane0 + 12)), free = ((LP.b && LP.b.plots) || []).filter(function (p) { return p.d === id && !p.owner; }).length;
if (LP_D[id].band === 1)
bp = lpAt(LP_RS[0] + LP_ROAD + 12, am + (LP_ROAD + 2.5) / (LP_RS[0] + 16));
lpBoard(g, bp.x, y, bp.z, rotIn(am) + Math.PI, [D.name, "A district of " + use + " · " + LP_USE_NOTE[use], free ? free + " of 12 plots for sale · " + lpG(D.price) + " gold" : "Every plot is taken", "Press E here, or ☰ Menu → 🏙️ City → 🏡 Land"], 3.4, 1.8);
LP.signs.push({ x: ATLC.x + bp.x, z: ATLC.z + bp.z, d: id });
if (typeof gwBake === "function")
try {
gwBake(g);
}
catch (e) { }
return g;
},
function (g, rs, am, half, y) {
var cols = [lpMat("bA", 0xD8443A, null, { ds: 1 }), lpMat("bB", 0xE8C04A, null, { ds: 1 }), lpMat("bC", 0x3A7AC8, null, { ds: 1 }), lpMat("bD", 0xF0EEE6, null, { ds: 1 })], cord = lpMat("cord", 0x2A2A2A);
for (var t = -half + 20 / rs; t < half; t += 40 / rs) {
var a = lpAt(rs - LP_ROAD - LP_PAVE + 0.6, am + t), b = lpAt(rs + LP_ROAD + LP_PAVE - 0.6, am + t), len = Math.hypot(b.x - a.x, b.z - a.z), ry = -Math.atan2(b.z - a.z, b.x - a.x);
lpBox(g, len, 0.02, 0.02, cord, (a.x + b.x) / 2, y + 6.2, (a.z + b.z) / 2, ry);
for (var i = 1; i < 12; i++) {
var f = i / 12, tri = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 3), cols[i % 4]);
tri.rotation.z = Math.PI;
tri.position.set(a.x + (b.x - a.x) * f, y + 5.95 - Math.sin(f * Math.PI) * 0.35, a.z + (b.z - a.z) * f);
g.add(tri);
}
}
},
function (g, rs, am, y) {
var p = lpAt(rs, am), stone = lpMat("fstone", 0xC8C0B0, "stone"), water = lpMat("fwater", 0x5A8AB0, null, { e: 0x10283A });
var pave = lpMat("pave", 0xB8B2A6, "paving", { po: -3, ds: 1 }), P = [];
for (var i = 0; i <= 24; i++) {
var a = i / 24 * Math.PI * 2;
P.push({ x: p.x + Math.cos(a) * 2, z: p.z + Math.sin(a) * 2 }, { x: p.x + Math.cos(a) * 7, z: p.z + Math.sin(a) * 7 });
}
g.add(lpFlat(P, y + 0.13, pave));
lpCyl(g, 3.0, 0.6, stone, p.x, y + 0.3, p.z, 24, 3.2);
lpCyl(g, 2.7, 0.05, water, p.x, y + 0.56, p.z, 24);
lpCyl(g, 0.35, 2.2, stone, p.x, y + 1.1, p.z, 12);
lpCyl(g, 1.1, 0.25, stone, p.x, y + 2.2, p.z, 16, 0.8);
},
function (g, rs, am, y) {
var crate = lpMat("crate", 0x9A7A4A, "wood"), barrel = lpMat("barrel", 0x6A4A2A, "wood"), hoop = lpMat("iron", 0x2A2C30, "metal");
[-1, 1].forEach(function (s) {
var p = lpAt(rs + s * (LP_ROAD + LP_PAVE + 1.2), am + s * (LP_ROAD + 3) / rs);
lpBox(g, 1.2, 1.2, 1.2, crate, p.x, y + 0.72, p.z, 0.3, true);
lpBox(g, 1.0, 1.0, 1.0, crate, p.x + 1.3, y + 0.62, p.z + 0.2, 1.1, true);
lpBox(g, 0.9, 0.9, 0.9, crate, p.x + 0.4, y + 1.77, p.z, 0.6, true);
lpCyl(g, 0.42, 1.1, barrel, p.x - 1.3, y + 0.67, p.z + 0.6, 10);
lpCyl(g, 0.44, 0.06, hoop, p.x - 1.3, y + 0.95, p.z + 0.6, 10);
});
},
function (g, G, p, D) {
var gr = lpMat("plotgrass", 0x6E9A4E, "grass", { po: -1, ds: 1 }), y = G.y, post = lpMat("fpost", 0x6A4A2E, "wood"), rail = lpMat("frail", 0xD8CCB4, "wood");
var c = [lpW(G, -LP_W / 2, -LP_DEEP / 2), lpW(G, LP_W / 2, -LP_DEEP / 2), lpW(G, -LP_W / 2, LP_DEEP / 2), lpW(G, LP_W / 2, LP_DEEP / 2)].map(function (q) { return { x: q.x - ATLC.x, z: q.z - ATLC.z }; });
g.add(lpFlat([c[0], c[1], c[2], c[3]], y + 0.03, gr));
var lines = [[-LP_W / 2, -LP_DEEP / 2, LP_W / 2, -LP_DEEP / 2], [-LP_W / 2, -LP_DEEP / 2, -LP_W / 2, LP_DEEP / 2], [LP_W / 2, -LP_DEEP / 2, LP_W / 2, LP_DEEP / 2]];
if (p && p.owner)
lines.push([-LP_W / 2, LP_DEEP / 2, -2, LP_DEEP / 2], [2, LP_DEEP / 2, LP_W / 2, LP_DEEP / 2]);
var every = lpLite() ? 6 : 3;
lines.forEach(function (L) {
var len = Math.hypot(L[2] - L[0], L[3] - L[1]), n = Math.max(1, Math.round(len / every));
for (var i = 0; i <= n; i++) {
var f = i / n, q = lpW(G, L[0] + (L[2] - L[0]) * f, L[1] + (L[3] - L[1]) * f);
lpBox(g, 0.14, 1.1, 0.14, post, q.x - ATLC.x, y + 0.55, q.z - ATLC.z);
}
var m = lpW(G, (L[0] + L[2]) / 2, (L[1] + L[3]) / 2), ry = G.rot + (L[0] === L[2] ? Math.PI / 2 : 0);
[0.45, 0.9].forEach(function (h) { lpBox(g, len, 0.08, 0.05, rail, m.x - ATLC.x, y + h, m.z - ATLC.z, ry); });
});
var sp = lpW(G, -LP_W / 2 + 3, LP_DEEP / 2 - 0.6), sg = G.rot;
if (!p || !p.owner) {
lpBoard(g, sp.x - ATLC.x, y, sp.z - ATLC.z, sg, ["For sale", "Plot " + G.n + ", " + D.name, lpG(D.price) + " gold · press E"], 1.9, 1.0, { bg: "#F2EEE4", fg: "#8A2A1E", accent: "#8A2A1E", low: true });
LP.sale[G.id] = { x: sp.x, z: sp.z };
}
else {
lpBoard(g, sp.x - ATLC.x, y, sp.z - ATLC.z, sg, [p.name || (p.owner + "'s"), "Plot " + G.n + ", " + D.name], 1.6, 0.7, { low: true });
LP.sale[G.id] = { x: sp.x, z: sp.z, own: true };
}
},
function (S, lite) {
var g = new THREE.Group(), Z = lpStudioSize(S), w = Z.w, d = Z.d, H = Z.h, sk = LP_SKIN[S.skin] || LP_SKIN.brick;
var wall = lpMat("sw-" + sk[0], sk[1], sk[0]), trim = lpMat("strim", 0xE8E2D6, "plaster"), dark = lpMat("swin", 0x26323C, null, { e: 0x0A1620 }), frame = lpMat("sframe", 0x3A3E44, "metal"), roof = lpMat("sroof", 0x4A4C50, "slate");
lpBox(g, w, H, d, wall, 0, H / 2, 0, 0, true);
lpBox(g, w + 0.3, 0.4, d + 0.3, trim, 0, 0.2, 0, 0, true);
var st = S.storeys, sh = H / st;
for (var f = 0; f < st; f++) {
var wy = f * sh + sh * 0.55;
[[0, d / 2 + 0.03, w, 0], [0, -d / 2 - 0.03, w, Math.PI], [w / 2 + 0.03, 0, d, Math.PI / 2], [-w / 2 - 0.03, 0, d, -Math.PI / 2]].forEach(function (F) {
var len = F[2], n = Math.max(1, Math.floor((len - 2) / (lite ? 4.5 : 3)));
for (var i = 0; i < n; i++) {
var u = -len / 2 + 1 + (i + 0.5) * (len - 2) / n;
if (f === 0 && F[3] === 0 && Math.abs(u) < 1.8)
continue;
var ox = F[3] === 0 || F[3] === Math.PI ? u : 0, oz = F[3] === 0 || F[3] === Math.PI ? 0 : u;
var px = F[0] + (F[3] === Math.PI ? -ox : ox), pz = F[1] + (F[3] === -Math.PI / 2 ? -oz : oz);
lpBox(g, 1.3, sh * 0.48, 0.06, dark, px, wy, pz, F[3]);
if (!lite)
lpBox(g, 1.45, 0.08, 0.12, trim, px, wy - sh * 0.26, pz, F[3]);
}
});
}
lpBox(g, 2.0, 2.5, 0.08, frame, 0, 1.25, d / 2 + 0.04);
lpBox(g, 1.7, 2.3, 0.06, dark, 0, 1.2, d / 2 + 0.08);
lpBox(g, 2.6, 0.12, 1.2, trim, 0, 2.75, d / 2 + 0.6);
if (S.type === "house") {
var rg = new THREE.CylinderGeometry(0.01, w * 0.62, 2.6, 4, 1);
var rm = new THREE.Mesh(rg, roof);
rm.rotation.y = Math.PI / 4;
rm.scale.set(1, 1, d / w);
rm.position.y = H + 1.3;
g.add(rm);
}
else {
lpBox(g, w + 0.2, 0.7, 0.3, trim, 0, H + 0.35, d / 2);
lpBox(g, w + 0.2, 0.7, 0.3, trim, 0, H + 0.35, -d / 2);
lpBox(g, 0.3, 0.7, d, trim, w / 2, H + 0.35, 0);
lpBox(g, 0.3, 0.7, d, trim, -w / 2, H + 0.35, 0);
lpBox(g, w, 0.1, d, roof, 0, H + 0.05, 0);
}
var nm = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w - 1, 6), 0.8), new THREE.MeshBasicMaterial({ map: lpSignTex([S.name || "Building"], 512, 72, "#1A1612", "#F2E6C4") }));
nm.position.set(0, 3.25, d / 2 + 0.08);
nm.userData.keep = 1;
nm.userData.lpOwn = 1;
g.add(nm);
return { g: g, w: w, d: d, h: H };
},
function (G, p, list) {
var B = { specs: [], groups: [], solid: [], doors: [] }, cr = somnucorRealm(), lite = lpLite();
(list || []).forEach(function (e, i) {
var q = lpW(G, e.x, e.z), rot = G.rot + (e.r || 0) * Math.PI / 2, y = G.y;
if (e.k === "kit" && KIT[e.a]) {
var spec = { id: "lp" + G.id + "-" + i + "-" + e.a, archetype: e.a, label: i === 0 && p.name ? p.name : null, attrs: {}, x: q.x, z: q.z, rot: rot, solid: KIT[e.a].cat !== "being", detail: 3,
nights: [store.session], realm: cr ? cr.id : 0, hub: true, city: true, found: true, addr: null, name: i === 0 && p.name ? p.name : null, named: p.name ? "stated" : null, peopled: false, lpPlot: G.id };
store.objects.push(spec);
if (typeof addMesh === "function")
addMesh(spec);
B.specs.push(spec);
}
else if (e.k === "studio") {
var S = lpStudioSpec(e.t), sb = lpStudio(S, lite);
sb.g.position.set(q.x, y, q.z);
sb.g.rotation.y = rot;
sb.g.userData.lpStudio = 1;
scene.add(sb.g);
B.groups.push(sb.g);
if (typeof gwBake === "function")
try {
gwBake(sb.g);
}
catch (err) { }
B.solid.push({ x: q.x, z: q.z, rot: rot, hw: sb.w / 2, hd: sb.d / 2, h: y + sb.h + 1 });
var dr = { x: q.x + Math.sin(rot) * (sb.d / 2 + 0.9), z: q.z + Math.cos(rot) * (sb.d / 2 + 0.9), S: S, name: S.title || S.name, owner: p.owner };
B.doors.push(dr);
}
else if (e.k === "model") {
var mg = (typeof FURN !== "undefined" && FURN[e.a]) ? FURN[e.a]() : null;
if (!mg) {
var Z = lpPieceSize(e);
mg = new THREE.Group();
var ph = new THREE.Mesh(new THREE.BoxGeometry(Z.w, Z.h, Z.d), lpMat("ghost", 0x8A8478));
ph.position.y = Z.h / 2;
mg.add(ph);
}
mg.position.set(q.x, y + 0.03, q.z);
mg.rotation.y = rot;
scene.add(mg);
B.groups.push(mg);
var Zm = lpPieceSize(e);
if (Zm.h > 0.5)
B.solid.push({ x: q.x, z: q.z, rot: rot, hw: Math.max(0.2, Zm.w / 2 - 0.1), hd: Math.max(0.2, Zm.d / 2 - 0.1), h: y + Zm.h });
}
});
return B;
},
function () {
if (!LP.g)
return;
var cr = somnucorRealm(), inCity = !!(cr && (store.here || 0) === cr.id && !store.inside && !(typeof WLD !== "undefined" && WLD.on)), P = camera.position;
LP.g.visible = inCity;
LP.g.children.forEach(function (c) {
var id = +String(c.name).replace(/\D+/g, "") || 0;
if (!id)
return;
var a = lpMid(id), r = lpRs(id), d = Math.hypot(P.x - (ATLC.x + Math.cos(a) * r), P.z - (ATLC.z + Math.sin(a) * r));
c.visible = inCity && d < (lpLite() ? 650 : 1100);
});
Object.keys(LP.built).forEach(function (k) {
var B = LP.built[k].B, G = lpPlotGeo(Math.floor(k / 100), k % 100), d = Math.hypot(P.x - G.x, P.z - G.z);
B.groups.forEach(function (g) { g.visible = inCity && d < (lpLite() ? 320 : 600); });
});
},
function (e) {
if (e.k === "studio")
return "🏗️ " + ((lpStudioSpec(e.t).title) || "Studio building");
if (e.k === "model") {
var m = ((LP.b && LP.b.models) || []).filter(function (x) { return x.a === e.a; })[0];
return "🧊 " + (m ? m.name : "Workshop model");
}
var L = LP_BUILDINGS.concat(LP_YARD);
for (var i = 0; i < L.length; i++)
if (L[i][0] === e.a)
return L[i][1];
return e.a;
},
function () {
var B = LP.b;
if (!lpSigned())
return lpDim("Sign in to see the land for sale and how the city grows.");
if (LP.missing && !B)
return lpDim("The land office opens soon.");
if (!B)
return lpDim("Opening the city's survey…");
if (LP.ed)
return lpEditHtml();
if (LP.view === "plots")
return lpPlotsHtml();
return lpMapHtml();
},
function () {
var B = LP.b, h = '', mine = (B.plots || []).filter(function (p) { return p.mine; });
h += lpDim("Somnucor has <b style='color:#F2E6C4'>" + lpG(B.payers) + "</b> dreamers whose dues are paid. As more join, new streets open in the Harvest Ring, and the High Council chooses what each becomes. " +
"A plot is yours to build on: houses and shops you walk into, gardens, your Model Workshop models, and buildings made in Simulation Studio.");
if (!B.on)
h += lpBoxHtml(lpDim("Land is not for sale just now. What stands on the plots stays."));
if (mine.length)
h += lpBoxHtml('<b style="color:#F2E6C4">🏡 Your land</b>' + mine.map(function (p) {
var D = lpDistrict(p.d);
return '<div style="margin-top:4px">' + esc(p.name || ("Plot " + p.n)) + ' · ' + esc(D ? D.name : "") + ' · ' + (p.build || []).length + ' piece' + ((p.build || []).length === 1 ? "" : "s") + '<br>' +
lpBtn("lpedit", "🔨 Build", ' data-id="' + p.id + '"', true) + lpBtn("lpgo", "📍 Show me the way", ' data-id="' + p.id + '"') + '</div>';
}).join(""), true);
var next = (B.districts || []).filter(function (d) { return d.status === "waiting"; }).sort(function (a, b) { return a.need - b.need; })[0];
if (next) {
var pct = Math.min(1, B.payers / Math.max(1, next.need));
h += lpBoxHtml('<b>The next street: ' + esc(next.name) + '</b>' + lpDim("Opens at " + lpG(next.need) + " dreamers whose dues are paid: " + lpG(Math.max(0, next.need - B.payers)) + " more to go.") +
'<div style="height:10px;background:#2A2620;border-radius:5px;overflow:hidden"><div style="height:10px;width:' + Math.round(pct * 100) + '%;background:#E8C67A"></div></div>');
}
(B.districts || []).forEach(function (d) {
var x = '<b style="color:' + (d.status === "open" ? "#F2E6C4" : "#C8C0B0") + '">' + esc(d.name) + '</b> <span style="color:#9AA3B5">· ' + esc(d.note) + '</span>';
if (d.status === "open") {
x += lpDim((LP_USE[d.use] || d.use) + " · " + (12 - d.sold) + " of 12 plots for sale · " + lpG(d.price) + " gold each");
x += lpBtn("lpd", "See the plots", ' data-id="' + d.id + '"', true) + lpBtn("lpgod", "📍 Show me the way", ' data-id="' + d.id + '"');
}
else if (d.status === "vote") {
x += lpDim("Surveyed. The High Council chooses what it becomes by " + lpDay(d.vote_until) + "; if it has not, it opens as homes.");
(d.motions || []).forEach(function (m) {
x += '<div style="margin:4px 0">🗳️ <b>' + esc(LP_USE[m.use] || m.use) + '</b>, moved by ' + esc(m.by) + ' · ' + m.yes + ' yes, ' + m.no + ' no, of ' + m.body +
(B.warden ? ' ' + lpBtn("lpvote", "Yes", ' data-id="' + m.id + '" data-y="1"', m.said === "yes") + lpBtn("lpvote", "No", ' data-id="' + m.id + '" data-y="0"', m.said === "no") : "") + '</div>';
});
if (B.warden)
x += '<div>' + lpDim("As a Warden, move what it becomes:") + Object.keys(LP_USE).map(function (u) { return lpBtn("lpmove", LP_USE[u], ' data-id="' + d.id + '" data-u="' + u + '"'); }).join("") + '</div>';
else
x += lpDim("The Wardens vote on it (☰ Menu → 🏙️ City → 🗳️ Council).");
}
else
x += lpDim("Opens when Somnucor has " + lpG(d.need) + " dreamers whose dues are paid.");
h += lpBoxHtml(x, d.status === "vote");
});
return h;
},
function () {
var B = LP.b, D = lpDistrict(LP.d);
if (!D) {
LP.view = "map";
return lpMapHtml();
}
var h = lpBtn("lpback", "← All districts") + '<div style="margin:6px 0"><b style="font-size:14px;color:#F2E6C4">' + esc(D.name) + '</b> · ' + esc(LP_USE[D.use] || "") + ' · ' + lpG(D.price) + ' gold a plot</div>';
function cell(n) {
var p = lpPlot(D.id * 100 + n), sel = LP.plot === D.id * 100 + n, col = !p ? "#2A3040" : p.mine ? "#E8C67A" : p.owner ? "#5A4A3A" : "#3A6A44";
return '<button class="btn" data-cty="lpplot" data-id="' + (D.id * 100 + n) + '" style="flex:1;min-width:0;padding:8px 2px;border-color:' + (sel ? "#F2E6C4" : col) + ';background:' + (p && !p.owner ? "rgba(58,106,68,.25)" : p && p.mine ? "rgba(232,198,122,.2)" : "rgba(0,0,0,.2)") + '">' + n + (p && p.owner ? "<br><span style='font-size:10px'>" + (p.mine ? "yours" : "sold") + "</span>" : "<br><span style='font-size:10px'>for sale</span>") + '</button>';
}
function row(ns) { return '<div style="display:flex;gap:4px">' + ns.slice(0, 3).map(cell).join("") + '<div style="width:22px;text-align:center;color:#9AA3B5;padding-top:8px">┃</div>' + ns.slice(3).map(cell).join("") + '</div>'; }
h += lpDim("The far side of the street") + row([9, 8, 7, 10, 11, 12]) + '<div style="text-align:center;color:#9AA3B5;margin:4px 0;letter-spacing:2px">━━━━━━━━ the street ━━━━━━━━</div>' + row([3, 2, 1, 4, 5, 6]) + lpDim("The near side, by the lane from the ring road (┃)");
var p = LP.plot && lpPlot(LP.plot);
if (p && p.d === D.id) {
var x = '<b style="color:#F2E6C4">Plot ' + p.n + '</b>';
if (p.mine)
x += lpDim("Yours" + (p.name ? ": " + esc(p.name) : "") + ". " + (p.build || []).length + " piece" + ((p.build || []).length === 1 ? "" : "s") + " on it.") + lpBtn("lpedit", "🔨 Build", ' data-id="' + p.id + '"', true) + lpBtn("lpgo", "📍 Show me the way", ' data-id="' + p.id + '"');
else if (p.owner)
x += lpDim("Belongs to " + esc(p.owner) + (p.name ? ": <b>" + esc(p.name) + "</b>" : "") + ". " + (p.build || []).length + " piece" + ((p.build || []).length === 1 ? "" : "s") + " on it.") + lpBtn("lpgo", "📍 Show me the way", ' data-id="' + p.id + '"') + (B.keeper ? lpBtn("lpedit", "👑 Set it out", ' data-id="' + p.id + '"') : "");
else {
x += lpDim("34 by 40 metres, on the " + (p.n <= 6 ? "near" : "far") + " side of the street. " + lpG(D.price) + " gold, paid to the city.");
if (B.keeper)
x += lpDim("👑 The Keeper gives plots from the Keeper page (In the game › Land and districts).");
else if (B.young)
x += lpDim("Land is for dreamers aged 13 and over.");
else if (!B.paid)
x += lpDim("Land is for dreamers whose dues are paid.");
else if (!B.on)
x += lpDim("Land is not for sale just now.");
else if (LP.sure === "buy" + p.id)
x += lpBtn("lpbuy", "Sure? Pay " + lpG(D.price) + " gold", ' data-id="' + p.id + '"', true) + lpBtn("lpnot", "Not now");
else
x += lpBtn("lpsure", "Buy · " + lpG(D.price) + " gold", ' data-id="' + p.id + '"', true) + (B.gold != null ? lpDim("You have " + lpG(B.gold) + " gold.") : "");
x += lpBtn("lpgo", "📍 Show me the way", ' data-id="' + p.id + '"');
}
h += lpBoxHtml(x, true);
}
else
h += lpDim("Tap a plot to see it.");
return h;
},
function (e) {
var E = LP.ed, max = (LP.b.rules && LP.b.rules.pieces_max) || 16;
if (E.build.length >= max) {
CTY.say = "A plot holds " + max + " pieces at most.";
return;
}
if (e.k === "studio" && E.build.filter(function (o) { return o.k === "studio"; }).length >= 2) {
CTY.say = "Two Simulation Studio buildings at most on one plot.";
return;
}
e.r = 0;
if (!lpFreeSpot(e))
CTY.say = "There is not much room left: it is put in the middle. Move things about on the plan.";
E.build.push(e);
LP.edSel = E.build.length - 1;
E.dirty = true;
lpDress();
},
function () {
var E = LP.ed, p = lpPlot(E.id), D = p && lpDistrict(p.d), B = LP.b, h = '';
h += '<div style="margin:0 0 6px"><b style="font-size:14px;color:#F2E6C4">🔨 Building on plot ' + (p ? p.n : "") + ', ' + esc(D ? D.name : "") + '</b></div>';
h += lpDim("What you set out shows on your plot straight away, so walk over and look. Nobody else sees it until you press <b>Save</b>.");
h += '<div style="margin:4px 0"><input id="lp-name" maxlength="40" placeholder="A name for your place (shown on the sign)" style="width:100%;box-sizing:border-box"></div>';
h += '<canvas id="lp-plan" width="340" height="400" style="width:100%;max-width:340px;display:block;margin:6px auto;border:1px solid #3A4050;border-radius:4px;touch-action:none;cursor:crosshair"></canvas>';
h += lpDim("The street is at the bottom. Tap a piece to choose it; with a piece chosen, tap anywhere on the plan to put it there.");
var sel = E.build[LP.edSel];
if (sel)
h += lpBoxHtml('<b>' + esc(lpName(sel)) + '</b>' + (sel.k === "studio" ? lpDim("“" + esc(sel.t) + "”: walk in at its door and Simulation Studio builds the inside.") : "") + '<div>' +
lpBtn("lpmv", "◀", ' data-x="-1" data-z="0"') + lpBtn("lpmv", "▲", ' data-x="0" data-z="-1"') + lpBtn("lpmv", "▼", ' data-x="0" data-z="1"') + lpBtn("lpmv", "▶", ' data-x="1" data-z="0"') +
lpBtn("lpturn", "↻ Turn") + lpBtn("lpdel", "✕ Take it away") + '</div>', true);
h += '<div style="margin:6px 0">' + [["build", "🏠 Buildings"], ["yard", "🌳 Garden and yard"], ["models", "🧊 My models"], ["studio", "🏗️ Simulation Studio"]].map(function (c) { return lpBtn("lpcat", c[1], ' data-c="' + c[0] + '"', LP.edCat === c[0]); }).join("") + '</div>';
if (LP.edCat === "build" || LP.edCat === "yard")
h += '<div>' + (LP.edCat === "build" ? LP_BUILDINGS : LP_YARD).filter(function (k) { return KIT[k[0]]; }).map(function (k) { return lpBtn("lpadd", "+ " + k[1], ' data-a="' + k[0] + '"'); }).join("") + '</div>';
else if (LP.edCat === "models") {
var M = B.models || [];
h += M.length ? '<div>' + M.map(function (m) { return lpBtn("lpaddm", "+ " + esc(m.name), ' data-a="' + esc(m.a) + '"'); }).join("") + '</div>' : lpDim("You have no Model Workshop models yet. They are sold at the Workshop counter in the Tower (☰ Menu → 🧊 Model Workshop).");
}
else
h += lpDim("Say in a few words what the building is, as in Simulation Studio: “a two-storey bakery in red brick”, “a small glass office”, “a warehouse with forklifts”. It stands on your plot, and walking in at its door builds the whole inside.") +
'<textarea id="lp-studio" maxlength="300" rows="2" style="width:100%;box-sizing:border-box" placeholder="a two-storey bakery in red brick"></textarea>' + lpBtn("lpaddst", "+ Put this building up", '', true);
h += '<div style="margin-top:10px;border-top:1px solid #2A3040;padding-top:8px">' + lpBtn("lpsave", "💾 Save", '', true) + lpBtn("lpcancel", E.dirty ? "Leave without saving" : "Done") + '</div>';
if (p && p.mine) {
var back = Math.floor((p.paid || 0) * ((B.rules && B.rules.sell_back_pct) || 0) / 100);
h += LP.sure === "sell" + p.id ? lpBtn("lpsell", "Sure? Hand it back for " + lpG(back) + " gold", ' data-id="' + p.id + '"') + lpBtn("lpnot", "Keep it") : lpBtn("lpsellq", "Hand the plot back to the city", ' data-id="' + p.id + '"');
}
return h;
},
function () {
var c = document.getElementById("lp-plan");
if (!c || !LP.ed)
return;
var x = c.getContext("2d"), S = 10, ox = 170, oz = 200;
x.fillStyle = "#4E6E3A";
x.fillRect(0, 0, 340, 400);
x.strokeStyle = "rgba(255,255,255,.08)";
for (var g = 0; g <= 340; g += 40) {
x.beginPath();
x.moveTo(g, 0);
x.lineTo(g, 400);
x.stroke();
}
for (var gz = 0; gz <= 400; gz += 40) {
x.beginPath();
x.moveTo(0, gz);
x.lineTo(340, gz);
x.stroke();
}
x.fillStyle = "#8A7A5A";
x.fillRect(150, 392, 40, 8);
x.fillStyle = "#D8D0C0";
x.font = "11px sans-serif";
x.textAlign = "center";
x.fillText("the street ↓", 170, 388);
LP.ed.build.forEach(function (e, i) {
var F = lpFoot(e), px = ox + e.x * S, pz = oz + e.z * S, sel = i === LP.edSel;
x.fillStyle = e.k === "studio" ? "rgba(138,168,188,.85)" : e.k === "model" ? "rgba(200,160,220,.85)" : (KIT[e.a] && KIT[e.a].cat === "structure") ? "rgba(200,150,110,.9)" : "rgba(120,170,90,.9)";
x.fillRect(px - F.w * S / 2, pz - F.d * S / 2, F.w * S, F.d * S);
x.strokeStyle = sel ? "#F2E6C4" : "rgba(0,0,0,.5)";
x.lineWidth = sel ? 3 : 1;
x.strokeRect(px - F.w * S / 2, pz - F.d * S / 2, F.w * S, F.d * S);
var r = (e.r || 0) * Math.PI / 2, fx = Math.sin(r), fz = Math.cos(r);
x.fillStyle = "#1A1612";
x.beginPath();
x.arc(px + fx * F.w * S * 0.0 + fx * Math.min(F.w, F.d) * S * 0.35, pz + fz * Math.min(F.w, F.d) * S * 0.35, 3, 0, 7);
x.fill();
x.fillStyle = "#101010";
x.font = (sel ? "700 " : "") + "10px sans-serif";
x.fillText(lpName(e).replace(/^[^A-Za-z“"]+/, "").slice(0, 16), px, pz - F.d * S / 2 - 3 < 10 ? pz + 4 : pz - F.d * S / 2 - 3);
});
if (!c.lpWired) {
c.lpWired = 1;
c.addEventListener("pointerdown", function (ev) {
ev.preventDefault();
ev.stopPropagation();
var R = c.getBoundingClientRect(), mx = (ev.clientX - R.left) * 340 / R.width, mz = (ev.clientY - R.top) * 400 / R.height, lx = (mx - ox) / S, lz = (mz - oz) / S, hit = -1;
LP.ed.build.forEach(function (e, i) { var F = lpFoot(e); if (Math.abs(e.x - lx) <= F.w / 2 && Math.abs(e.z - lz) <= F.d / 2)
hit = i; });
if (hit >= 0 && hit !== LP.edSel)
LP.edSel = hit;
else if (LP.edSel >= 0) {
var e = LP.ed.build[LP.edSel];
e.x = lx;
e.z = lz;
lpClamp(e);
LP.ed.dirty = true;
lpDress();
}
ctyPaint();
});
}
},
function (t, a) {
var E = LP.ed, sel = E && E.build[LP.edSel];
if (a === "lpcat") {
LP.edCat = t.getAttribute("data-c");
ctyPaint();
return;
}
if (a === "lpadd") {
lpAdd({ k: "kit", a: t.getAttribute("data-a") });
ctyPaint();
return;
}
if (a === "lpaddm") {
lpAdd({ k: "model", a: t.getAttribute("data-a") });
ctyPaint();
return;
}
if (a === "lpaddst") {
var ta = document.getElementById("lp-studio"), v = String(ta && ta.value || "").trim();
if (v.length < 3) {
CTY.say = "Say in a few words what the building is first.";
ctyPaint();
return;
}
lpAdd({ k: "studio", t: v.slice(0, 300) });
if (ta)
ta.value = "";
ctyPaint();
return;
}
if (a === "lpmv" && sel) {
sel.x += +t.getAttribute("data-x");
sel.z += +t.getAttribute("data-z");
lpClamp(sel);
E.dirty = true;
lpDress();
ctyPaint();
return;
}
if (a === "lpturn" && sel) {
sel.r = ((sel.r || 0) + 1) % 4;
lpClamp(sel);
E.dirty = true;
lpDress();
ctyPaint();
return;
}
if (a === "lpdel" && sel) {
E.build.splice(LP.edSel, 1);
LP.edSel = Math.min(LP.edSel, E.build.length - 1);
E.dirty = true;
lpDress();
ctyPaint();
return;
}
if (a === "lpsave") {
var nm = document.getElementById("lp-name");
E.name = String(nm && nm.value || "").trim().slice(0, 40);
lpAct("land_build", { p_plot: E.id, p_name: E.name, p_build: E.build }, function (o) { if (o && o.ok) {
var p = lpPlot(E.id);
if (p) {
p.build = o.build || E.build;
p.name = E.name;
}
LP.ed = null;
LP.view = "map";
} });
return;
}
if (a === "lpcancel") {
LP.ed = null;
CTY.say = "";
lpDress();
ctyPaint();
return;
}
},
function (t, a) {
var id = +t.getAttribute("data-id");
if (LP.ed && /^lp(cat|add|addm|addst|mv|turn|del|save|cancel)$/.test(a))
return lpEditClick(t, a);
if (a === "lpd") {
LP.view = "plots";
LP.d = id;
LP.plot = null;
CTY.say = "";
ctyPaint();
return;
}
if (a === "lpback") {
LP.view = "map";
CTY.say = "";
ctyPaint();
return;
}
if (a === "lpplot") {
LP.plot = id;
LP.sure = "";
CTY.say = "";
ctyPaint();
return;
}
if (a === "lpsure") {
LP.sure = "buy" + id;
ctyPaint();
return;
}
if (a === "lpnot") {
LP.sure = "";
ctyPaint();
return;
}
if (a === "lpbuy") {
lpAct("land_buy", { p_plot: id });
return;
}
if (a === "lpedit") {
lpEditStart(id);
CTY.say = "";
ctyPaint();
return;
}
if (a === "lpsellq") {
LP.sure = "sell" + id;
ctyPaint();
return;
}
if (a === "lpsell") {
lpAct("land_sell", { p_plot: id }, function (o) { if (o && o.ok) {
LP.ed = null;
LP.view = "map";
} });
return;
}
if (a === "lpmove") {
lpAct("district_motion", { p_district: id, p_use: t.getAttribute("data-u") });
return;
}
if (a === "lpvote") {
lpAct("district_vote", { p_motion: id, p_yes: t.getAttribute("data-y") === "1" });
return;
}
if (a === "lpgo" || a === "lpgod") {
var at, nm;
if (a === "lpgo") {
var p = lpPlot(id);
if (!p || typeof ATLC === "undefined" || !ATLC) {
CTY.say = "The way is shown once you are in the city.";
ctyPaint();
return;
}
var G = lpPlotGeo(p.d, p.n), f = lpW(G, 0, LP_DEEP / 2 + 2);
at = f;
nm = (p.name || "Plot " + p.n) + ", " + (lpDistrict(p.d) || {}).name;
}
else {
if (typeof ATLC === "undefined" || !ATLC) {
CTY.say = "The way is shown once you are in the city.";
ctyPaint();
return;
}
var am = lpMid(id), r = LP_D[id].band ? LP_RS[0] + 12 : 1800;
at = { x: ATLC.x + Math.cos(am) * r, z: ATLC.z + Math.sin(am) * r };
nm = (lpDistrict(id) || {}).name;
}
guideTo = { key: nm, x: at.x, z: at.z };
var cr = somnucorRealm();
if (cr && (store.here || 0) !== cr.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("<b>" + esc(nm) + "</b>: follow the pointer at the top of the screen.");
CTY.open = false;
ctyPaint();
return;
}
},
function (S) {
if (typeof ptxLaunch !== "function") {
setStatus("🏗️ The doors are shut just now.");
return;
}
var S2 = JSON.parse(JSON.stringify(S));
S2.src = "ai";
var al = typeof ptxAllowed === "function" ? ptxAllowed : null;
if (al)
ptxAllowed = function () { return true; };
try {
ptxLaunch(S2);
}
finally {
if (al)
ptxAllowed = al;
}
}
];
});
