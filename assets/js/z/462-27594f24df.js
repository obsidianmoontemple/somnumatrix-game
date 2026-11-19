/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(462, function () {
"use strict";
return [
function (L, o) {
if (typeof wfIds !== "function")
return null;
var r = L._pw || (o.f ? "woman" : "man"), W = PRW_WEAR[r] || PRW_WEAR.man, R = o.r || 0;
var dk = function (c, k) { return typeof wfDark === "function" ? wfDark(c, k) : c; };
var top = L.top != null && L.top !== 0xF2EEE2 ? L.top : null;
var coat = prwOwn(W.coat, prwOwn(L.layerColor, [0x4A3A2A, 0x2A3A4A, 0x5A2A1E, 0x3A4A3A, 0x6A5A3A][Math.floor(R * 5)]));
var vest = prwOwn(W.vest, prwOwn(top, 0x8A7A5A)), trou = prwOwn(W.trou, prwOwn(L.bottom, 0x3A3028));
var shirt = R < 0.3 ? 0xE8E4D8 : R < 0.55 ? 0xD8D4C8 : R < 0.8 ? 0xC8C0A8 : 0xE0D8C8;
var shirtK = r === "crew" || r === "sailor" || r === "deckhand" ? (R < 0.35 ? "oz:shirt:long:check" : R < 0.7 ? "oz:shirt:long:stripe" : "oz:shirt:long:worn7") : "oz:shirt:long";
switch (W.cut) {
case "lady": {
var d = prwOwn(W.coat, prwOwn(top, prwOwn(L.layerColor, [0x6A2A2A, 0x2A3A5A, 0x5A4A2A, 0x3A5A3A, 0x8A6A4A][Math.floor(R * 5)])));
var ids = ["oz:bodice:long:cloth", "oz:skirt:ankle:0.24:cloth", "oz:collar:low:none"];
if (W.apron || R < 0.45)
ids.push("oz:apron:half:long:0.2");
if (R > 0.75)
ids.push("oz:pelerine");
return wfIds({ ids: ids, col: { dress: d, skirt: d, trim: 0xF0ECE4, collar: 0xF8F6F0, apron: 0xF0ECE0, cape: dk(d, 0.3) }, shoes: 0x2A1E14 });
}
case "womanpirate":
return wfIds({ ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:coat:jacket:cloth", "oz:sash", "oz:trousers:cloth", "oz:boots:roll"], col: { shirt: 0xF0ECE0, collar: 0xF0ECE0, coat: coat, sash: W.sash, trou: trou }, shoes: 0x2A1E14 });
case "military":
return wfIds({ ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:military:cloth", "oz:breeches:cloth", "oz:stock:knit:thigh", "oz:boots"], col: { shirt: 0xF4F0E4, collar: 0xF4F0E4, tie: 0xF4F0E4, vest: vest, coat: coat, trou: trou, stock: 0xE8E4DC, belt: 0xE8E0CC }, shoes: 0x141010 });
case "priest":
return wfIds({ ids: ["oz:shirt:long", "oz:collar:high:none", "oz:coat:long:cloth", "oz:skirt:ankle:0.06:cloth"], col: { shirt: 0x141414, collar: 0xF4F0E4, coat: 0x141414, skirt: 0x141414 }, shoes: 0x141010 });
case "slave":
return wfIds({ ids: ["oz:shirt:long:cloth", "oz:collar:low:soft", "oz:trousers:cloth"], col: { shirt: W.coat, collar: W.coat, trou: W.trou }, shoes: L.skin != null ? L.skin : 0x6A4A30 });
case "shirt":
return wfIds({ ids: [shirtK, "oz:collar:low:soft", "oz:sash", "oz:trousers:cloth"].concat(W.vest && R > 0.4 ? ["oz:vest:cloth"] : []).concat(W.held === "musket" ? ["oz:boots"] : []),
col: { shirt: W.coat || shirt, collar: shirt, sash: prwOwn(W.sash, [0xA82A1E, 0x2A4A8A, 0x1A1A1A, 0x6A4A1A][Math.floor(R * 4)]), trou: trou, vest: vest }, shoes: W.held === "musket" ? 0x3A2A1A : (L.skin != null ? L.skin : 0x8A6A4A) });
case "jacket": {
var ids2 = [shirtK, "oz:collar:low:soft", "oz:trousers:cloth"];
if (R > 0.35)
ids2.push("oz:coat:jacket:cloth");
if (R > 0.55)
ids2.push("oz:sash");
if (W.shoes || R > 0.65)
ids2.push("oz:boots");
return wfIds({ ids: ids2, col: { shirt: shirt, collar: shirt, coat: coat, sash: [0xA82A1E, 0x2A4A8A, 0x1A1A1A, 0x6A4A1A][Math.floor(R * 7) % 4], trou: trou }, shoes: W.shoes || R > 0.65 ? 0x2A1E14 : (L.skin != null ? L.skin : 0x8A6A4A) });
}
default: {
var ids3 = ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth" + (W.lace ? ":chain" : ""), "oz:coat:long:cloth", "oz:breeches:cloth", "oz:stock:knit:thigh", "oz:boots:roll"];
if (W.sash)
ids3.push("oz:sash");
return wfIds({ ids: ids3, col: { shirt: 0xF4F0E4, collar: 0xF4F0E4, tie: prwOwn(W.stock, 0xF0ECE0), vest: vest, coat: coat, trou: trou, stock: W.cut === "coat" ? 0xE8E4DC : trou, sash: W.sash }, shoes: 0x141010 });
}
}
},
function (add, c, W) {
var g = new THREE.Group(), m = prwM(c, { r: 0.95 });
var cr = new THREE.Mesh(prwG("slc", function () { return new THREE.CylinderGeometry(0.11, 0.13, 0.12, 16); }), m);
cr.position.y = 0.05;
g.add(cr);
var br = new THREE.Mesh(prwG("slb", function () { var gg = new THREE.CylinderGeometry(0.27, 0.27, 0.012, 26), p = gg.attributes.position; for (var i = 0; i < p.count; i++) {
var x = p.getX(i), z = p.getZ(i), d = Math.hypot(x, z);
if (d > 0.14)
p.setY(i, p.getY(i) - (d - 0.14) * 0.35 + (x > 0.1 ? (x - 0.1) * 0.6 : 0));
} gg.computeVertexNormals(); return gg; }), m);
br.material.side = THREE.DoubleSide;
g.add(br);
if (W && W.plume != null) {
var f = new THREE.Mesh(prwG("plume", function () { var gg = new THREE.SphereGeometry(0.05, 10, 8); return gg; }), prwM(W.plume, { r: 1 }));
f.scale.set(0.6, 0.7, 3.4);
f.position.set(0.12, 0.1, -0.05);
f.rotation.set(0.5, 0.3, 0.2);
g.add(f);
}
add("Head", [0, 0.12, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), m = prwM(c, { r: 1 });
m.side = THREE.DoubleSide;
var v = new THREE.Mesh(prwG("mant", function () { return new THREE.SphereGeometry(0.16, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.72); }), m);
v.scale.set(1.05, 1.3, 1.2);
v.rotation.x = -0.35;
g.add(v);
var cb = new THREE.Mesh(prwG("comb", function () { return new THREE.BoxGeometry(0.12, 0.1, 0.01); }), prwM(0x3A2410, { r: 0.5 }));
cb.position.set(0, 0.16, -0.02);
g.add(cb);
add("Head", [0, 0.08, -0.05], g);
},
function (add, W) {
var g = new THREE.Group();
var bl = new THREE.Mesh(prwG("cutb", function () { var gg = new THREE.BoxGeometry(0.045, 0.62, 0.008), p = gg.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setX(i, p.getX(i) + Math.pow((y + 0.31) / 0.62, 2) * 0.05);
} gg.computeVertexNormals(); return gg; }), prwM(0xC8CCD4, { r: 0.25, m: 0.9 }));
bl.position.y = -0.4;
g.add(bl);
if (W && W.blood) {
var b = new THREE.Mesh(prwG("cutbl", function () { return new THREE.BoxGeometry(0.047, 0.3, 0.009); }), prwM(0x6A0A08, { r: 0.4 }));
b.position.y = -0.55;
g.add(b);
}
var sh = new THREE.Mesh(prwG("cuts", function () { return new THREE.SphereGeometry(0.05, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5); }), prwM(0x8A8A90, { r: 0.3, m: 0.85 }));
sh.rotation.x = Math.PI;
sh.position.y = -0.08;
g.add(sh);
var gr = new THREE.Mesh(prwG("cutg", function () { return new THREE.CylinderGeometry(0.016, 0.016, 0.12, 6); }), prwM(0x2A1A10));
g.add(gr);
add("hand_r", [0, -0.02, 0], g);
},
function (add) {
[["hand_r", 1], ["hand_l", -1]].forEach(function (h) {
var g = new THREE.Group();
var br = new THREE.Mesh(prwG("pisb", function () { return new THREE.CylinderGeometry(0.012, 0.014, 0.26, 8); }), prwM(0x4A4A50, { r: 0.3, m: 0.85 }));
br.rotation.x = Math.PI / 2;
br.position.z = 0.13;
g.add(br);
var st = new THREE.Mesh(prwG("piss", function () { return new THREE.BoxGeometry(0.03, 0.11, 0.06); }), prwM(0x5A3A1E, { r: 0.6 }));
st.position.y = -0.04;
st.rotation.x = 0.4;
g.add(st);
add(h[0], [0, -0.03, 0.03], g);
});
},
function (add) {
var g = new THREE.Group();
var b = new THREE.Mesh(prwG("musb", function () { return new THREE.CylinderGeometry(0.012, 0.014, 1.1, 8); }), prwM(0x4A4A50, { r: 0.3, m: 0.85 }));
b.position.y = 0.4;
g.add(b);
var s = new THREE.Mesh(prwG("muss", function () { return new THREE.BoxGeometry(0.05, 0.6, 0.07); }), prwM(0x5A3A1E, { r: 0.6 }));
s.position.y = -0.15;
g.add(s);
add("hand_r", [0, 0, 0.02], g);
},
function (add) {
var g = new THREE.Group(), m = prwM(0xB89A40, { r: 0.3, m: 0.85 });
var a = new THREE.Mesh(prwG("spya", function () { return new THREE.CylinderGeometry(0.022, 0.026, 0.24, 10); }), m);
g.add(a);
var b = new THREE.Mesh(prwG("spyb", function () { return new THREE.CylinderGeometry(0.018, 0.02, 0.16, 10); }), prwM(0x2A1E14, { r: 0.6 }));
b.position.y = 0.19;
g.add(b);
g.rotation.x = 0.4;
add("hand_l", [0, -0.02, 0.04], g);
},
function (add) {
var g = new THREE.Group();
[0xC83A5A, 0xF0E040, 0xF4F0F0, 0xC83A5A, 0x8A5AC8].forEach(function (c, i) { var f = new THREE.Mesh(prwG("posyf", function () { return new THREE.SphereGeometry(0.022, 8, 6); }), prwM(c, { r: 1 })); f.position.set(Math.cos(i * 1.3) * 0.025, 0.05 + (i % 2) * 0.01, Math.sin(i * 1.3) * 0.025); g.add(f); });
var s = new THREE.Mesh(prwG("posys", function () { return new THREE.CylinderGeometry(0.008, 0.006, 0.1, 5); }), prwM(0x3A6A2A));
g.add(s);
add("hand_l", [0, -0.03, 0.03], g);
},
function (add, E) {
var bm = prwM(0x0A0A0A, { r: 1 }), rib = prwM(0xA81E1E, { r: 0.9 });
for (var i = 0; i < 7; i++) {
var t = new THREE.Mesh(prwG("bbt", function () { return new THREE.CylinderGeometry(0.014, 0.006, 0.2, 6); }), bm);
var a = (i - 3) * 0.17;
t.position.set(Math.sin(a) * 0.07, -0.07 - Math.abs(i - 3) * 0.008, 0.075 + Math.cos(a) * 0.02);
t.rotation.set(0.25, 0, a * 0.8);
add("Head", [t.position.x, t.position.y, t.position.z], t);
var r = new THREE.Mesh(prwG("bbr", function () { return new THREE.TorusGeometry(0.012, 0.004, 5, 8); }), rib);
r.rotation.x = Math.PI / 2;
add("Head", [Math.sin(a) * 0.075, -0.13 - Math.abs(i - 3) * 0.008, 0.09 + Math.cos(a) * 0.02], r);
}
var mass = new THREE.Mesh(prwG("bbm", function () { return new THREE.SphereGeometry(0.075, 12, 8); }), bm);
mass.scale.set(1.15, 0.8, 0.6);
add("Head", [0, -0.03, 0.07], mass);
var sl = new THREE.Mesh(prwG("bbsl", function () { return new THREE.BoxGeometry(0.06, 0.72, 0.012); }), prwM(0x2A1A10, { r: 0.7 }));
sl.rotation.z = 0.75;
add("Spine2", [0, 0.05, 0.12], sl);
for (var k = 0; k < 6; k++) {
var p = new THREE.Mesh(prwG("bbp", function () { return new THREE.BoxGeometry(0.03, 0.14, 0.04); }), prwM(0x4A3A2A, { r: 0.5 }));
add("Spine2", [-0.18 + k * 0.07, 0.2 - k * 0.07, 0.14], p);
}
for (var m = 0; m < 4; m++) {
var a2 = -0.9 + m * 0.6, mt = new THREE.Mesh(prwG("bbmt", function () { return new THREE.CylinderGeometry(0.005, 0.005, 0.14, 4); }), prwM(0x6A5A40, { r: 1 }));
mt.rotation.z = a2 * 0.6;
add("Head", [Math.sin(a2) * 0.15, 0.08, Math.cos(a2) * 0.06], mt);
var gl = new THREE.Mesh(prwG("bbgl", function () { return new THREE.SphereGeometry(0.009, 6, 4); }), new THREE.MeshBasicMaterial({ color: 0xFF6A1A }));
add("Head", [Math.sin(a2) * 0.19, 0.02, Math.cos(a2) * 0.06], gl);
}
},
function (add) {
var g = new THREE.Group(), gold = prwM(0xE8C040, { r: 0.25, m: 0.95 }), dia = prwM(0xF4F8FF, { r: 0.05, m: 0.6 });
var v = new THREE.Mesh(prwG("crv", function () { return new THREE.BoxGeometry(0.018, 0.07, 0.008); }), gold);
g.add(v);
var h = new THREE.Mesh(prwG("crh", function () { return new THREE.BoxGeometry(0.05, 0.018, 0.008); }), gold);
h.position.y = 0.012;
g.add(h);
[[0, 0.03], [0, -0.025], [0.018, 0.012], [-0.018, 0.012], [0, 0.012]].forEach(function (q) { var d = new THREE.Mesh(prwG("crd", function () { return new THREE.OctahedronGeometry(0.008); }), dia); d.position.set(q[0], q[1], 0.006); g.add(d); });
add("Spine2", [0, 0.08, 0.15], g);
},
function (add, c) {
var m = new THREE.Mesh(prwG("wig", function () { return new THREE.SphereGeometry(0.15, 14, 10); }), prwM(c, { r: 1 }));
m.scale.set(1.1, 1.05, 1.05);
add("Head", [0, 0.05, -0.03], m);
[-1, 1].forEach(function (s) { var l = new THREE.Mesh(prwG("wigl", function () { return new THREE.SphereGeometry(0.07, 10, 8); }), prwM(c, { r: 1 })); l.scale.set(0.8, 2.2, 0.9); add("Head", [s * 0.12, -0.12, -0.02], l); });
},
function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, W = PRW_WEAR[L._pw] || null;
if (!W)
return;
var hat = W.hat, hc = W.hc != null ? W.hc : (L.hatColor != null ? L.hatColor : [0x1A1A1A, 0x3A2A1E, 0x5A2A1E, 0x2A3A5A][Math.floor((L._pr || 0) * 4)]);
if (W.wig)
prwWig(add, (W.wigWhite || L._pr > 0.5) ? 0xE8E4DC : 0x8A6A4A);
if (hat) {
if (PRW_HAT[hat])
PRW_HAT[hat](add, hc, W);
else if (typeof WF_HAT !== "undefined" && WF_HAT[hat])
WF_HAT[hat](add, hc, E);
}
else if ((L._pw === "crew" || L._pw === "sailor" || L._pw === "deckhand") && typeof WF_HAT !== "undefined") {
var q = L._pr || 0;
if (q < 0.4 && WF_HAT.kerchief)
WF_HAT.kerchief(add, [0xA82A1E, 0x2A4A8A, 0x1A1A1A, 0xC8A040, 0xE8E0CC][Math.floor(q * 12) % 5], E);
else if (q < 0.7)
PRW_HAT.monmouth(add, [0x8A2A1E, 0x3A3A4A, 0x6A5A3A][Math.floor(q * 9) % 3]);
else if (q < 0.85 && WF_HAT.tricorn)
WF_HAT.tricorn(add, 0x2A2420, E);
}
if (W.beard === "tails" || W.matches)
prwBlackbeard(add, E);
if (W.cross)
prwCross(add);
if (W.ruff)
prwRuff(add);
var h = W.held;
if (!h && (L._pw === "crew") && (L._pr || 0) > 0.5)
h = "cutlass";
if (h) {
if (PRW_HELD[h])
PRW_HELD[h](add, W);
else if (typeof WF_HELD !== "undefined" && WF_HELD[h])
WF_HELD[h](add);
}
if (W.bando && h !== "pistols")
PRW_HELD.pistols(add);
},
function () {
PRW.ports = PRW_PORTS.map(function (d) {
var q = prwXZ(d.lon, d.lat), a = (d.face || 0) * Math.PI / 180, fx = Math.sin(a), fz = -Math.cos(a);
var land = { x: q.x + fx * d.r * 0.8, z: q.z + fz * d.r * 0.8 }, dock = { x: q.x + fx * (d.r * 1.02 + 40), z: q.z + fz * (d.r * 1.02 + 40) };
var tc = { dx: fx * d.r * 0.42, dz: fz * d.r * 0.42 };
return Object.assign({}, d, { x: q.x, z: q.z, prw: 1, dock: dock, land: land, town: { x: q.x + tc.dx, z: q.z + tc.dz, ry: Math.atan2(fx, fz) },
flat: [[tc.dx, tc.dz, d.r * 0.46, d.k === "portroyal" || d.k === "charlestown" || d.k === "barataria" || d.k === "ocracoke" || d.k === "tortugas" ? 3.2 : 4.5], [fx * d.r * 0.72, fz * d.r * 0.72, d.r * 0.16, 2.2]],
h: Math.max(d.h, 8) });
});
PRW.lands = PRW_LANDS.filter(function (l) { return !l.skip; }).map(function (l) {
var q = prwXZ(l.lon, l.lat);
return { k: "prwl_" + l.n.replace(/\W+/g, "").toLowerCase(), name: l.n, x: q.x, z: q.z, r: l.a + 60, ea: l.a, eb: l.b, rot: (l.rot || 0) * Math.PI / 180, h: l.h, col: l.col, rock: 0x8A8070, prwLand: 1, gen: 0 };
});
},
function (p, x, z) {
var dx = x - p.x, dz = z - p.z, c = Math.cos(p.rot), s = Math.sin(p.rot), u = (dx * c + dz * s) / p.ea, v = (-dx * s + dz * c) / p.eb;
var a = Math.atan2(v, u), rag = 0.9 + 0.2 * wFbm(Math.cos(a) * 2 + p.x * 0.001, Math.sin(a) * 2, 17, 3), d = Math.hypot(u, v) / rag;
if (d > 1)
return Math.max(-30, (1 - d) * Math.min(p.ea, p.eb) * 0.25);
var t = 1 - d;
return Math.min(p.h, p.h * Math.pow(t, 0.8) * 1.2) * (0.7 + 0.3 * wFbm(x * 0.003, z * 0.003, 23, 2)) + 0.8;
},
function (col, o) {
var k = col + "|" + (o ? JSON.stringify(o) : "");
var m = PRW_MC[k];
if (m)
return m;
m = new THREE.MeshLambertMaterial({ color: col });
if (o) {
if (o.e != null) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.ds)
m.side = THREE.DoubleSide;
if (o.op != null) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.map)
m.map = o.map;
}
m.userData.ldShared = 1;
PRW_MC[k] = m;
return m;
},
function () {
var inB = prwInBox(SEA.sx, SEA.sz), html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏴‍☠️ The Sweet Trade</div><div style='opacity:.85'>" +
(inB ? "You are in the pirates' waters. Choose a port and the ship takes you; or steer her yourself." : "Far to the west of the home buoy, past the Odyssey's islands. The trade wind and the current carry a ship set on course there faster than she could sail.") +
"</div><div style='margin:6px 0;padding:6px 8px;border-left:3px solid #C8462A;background:rgba(160,40,30,.12);font-size:12.5px'>Danger level 4: the Navy, the Spanish coastguard, other pirates, storms, reefs, disease, the stocks and the gallows. A dreamer who loses a fight out here loses a tenth of the gold they carry.</div>", fns = {};
PRW.ports.slice().sort(function (a, b) { return prwDist(a) - prwDist(b); }).forEach(function (p) {
var dx = p.x - SEA.sx, dz = p.z - SEA.sz, d = Math.hypot(dx, dz), b = Math.round(((Math.atan2(dx, -dz) * 180 / Math.PI) + 360) % 360);
html += worldBtn("pgo-" + p.k, prwEsc(p.name) + " <span style='opacity:.6;font-weight:400'>(" + prwEsc(p.year) + ")</span>", prwEsc(p.card) + " · " + (d > 1000 ? (d / 1000).toFixed(1) + " km" : Math.round(d) + " m") + " · bearing " + b + "°");
fns["pgo-" + p.k] = function () { SEA.auto = { x: p.dock.x, z: p.dock.z, name: p.name, after: "Press E to go ashore.", prw: 1 }; worldCard(null); setStatus("<b>Course set</b> for " + prwEsc(p.name) + ". " + (inB ? "" : "The trade wind is behind you. ") + "Touch the helm to take her yourself."); };
});
html += worldBtn("pback", "⬅ The chart of the Endless Sea", "");
fns.pback = function () { worldCard(null); seaChart(); };
worldCard(html, fns);
},
function (dt) {
PRW.t += dt;
PRW.lite = prwLite();
if (SEA.aboard && SEA.auto && SEA.auto.prw) {
var A = SEA.auto, d = Math.hypot(A.x - SEA.sx, A.z - SEA.sz);
if (d > 2500) {
var k = Math.min(d - 2400, (prwInBox(SEA.sx, SEA.sz) ? 60 : 260) * dt);
SEA.sx += Math.sin(SEA.h) * k;
SEA.sz += Math.cos(SEA.h) * k;
}
}
var inB = prwInBox(SEA.sx, SEA.sz);
if (inB !== PRW.inBox) {
PRW.inBox = inB;
if (inB && SEA.aboard)
setStatus("<b>🏴‍☠️ The Sweet Trade.</b> Warm blue water, the trade wind, and somewhere ahead the pirates' Caribbean. This is <b>danger level 4</b>: the Navy, the Spaniards and other pirates sail here, and the gallows wait in every port.");
if (!inB && SEA.aboard)
setStatus("<b>Out of the pirates' waters.</b> The Endless Sea again.");
}
var now = performance.now() / 1000;
if (now - PRW.lastBuild > 0.5) {
PRW.lastBuild = now;
var L = worldLocal(), px = SEA.aboard ? SEA.sx : L.x, pz = SEA.aboard ? SEA.sz : L.z, near = PRW.lite ? 1900 : 2800, far = near + 900, landNear = PRW.lite ? 4500 : 7500;
var did = false;
PRW.ports.forEach(function (p) {
var d = Math.hypot(p.x - px, p.z - pz) - p.r;
if (!PRW.built[p.k] && d < near && !did) {
prwBuildPort(p);
did = true;
}
else if (PRW.built[p.k] && d > far && SEA.shore !== p)
prwDropPort(p);
});
PRW.lands.forEach(function (p) {
var d = Math.hypot(p.x - px, p.z - pz) - p.r;
if (!PRW.built[p.k] && d < landNear && !did) {
prwBuildLand(p);
did = true;
}
else if (PRW.built[p.k] && d > landNear + 2000)
prwDropLand(p);
});
}
PRW.tickers.forEach(function (f) { try {
f(dt);
}
catch (e) { } });
prwShoreTick(dt);
},
function (p) {
var G = WORLDS.sea.g;
if (!G)
return;
var g = new THREE.Group();
g.name = "prw:" + p.k;
G.add(g);
PRW.built[p.k] = { g: g };
var s = p.r * 2 + 200, n = Math.min(PRW.lite ? 60 : 110, Math.max(30, Math.round(s / 60)));
var gr = wGround(s, n, function (x, z) { var h = prwLandH(p, p.x + x, p.z + z); var c = h < 1.4 ? 0xE0D0A0 : h < p.h * 0.35 ? p.col : blendHex(p.col, 0x7A7058, Math.min(1, (h / p.h - 0.35) * 1.6)); if (h < -1)
c = 0x5A6A50; return [h, c]; });
prwGroundLook(gr, s);
gr.position.set(p.x, 0, p.z);
g.add(gr);
var R = wRand(p.x * 3 + p.z * 7 | 0), np = PRW.lite ? 14 : 40;
for (var i = 0; i < np; i++) {
var a = R() * Math.PI * 2, c = Math.cos(p.rot), sn = Math.sin(p.rot), u = Math.cos(a) * p.ea * 0.93, v = Math.sin(a) * p.eb * 0.9, x = p.x + u * c - v * sn, z = p.z + u * sn + v * c, h = prwLandH(p, x, z);
if (h < 1.5 || h > 14)
continue;
if (typeof nvPalm === "function")
nvPalm(g, x, h, z, R);
}
},
function (p) {
var G = WORLDS.sea.g;
if (!G)
return;
var t0 = performance.now();
var g = new THREE.Group();
g.name = "prw:" + p.k;
G.add(g);
var B = PRW.built[p.k] = { g: g, people: [], talkers: [], solids: [], tick: [], doors: [] };
var s = p.r * 2 + 260, n = Math.min(PRW.lite ? 90 : 150, Math.round(s / 8));
var dirt = new THREE.Color(p.style === 'spa' ? 0x9A8A70 : 0x8E7A56), sand = new THREE.Color(0xD2BE92), grass = new THREE.Color(p.col);
var colAt = function (h, x, z) { var c, nz = typeof wFbm === 'function' ? wFbm((x || 0) * 0.03, (z || 0) * 0.03) : 0.5; if (h < 1.2)
c = sand.clone().lerp(dirt, nz * 0.25);
else {
c = grass.clone().lerp(dirt, Math.min(1, Math.max(0, 0.25 + nz * 0.9 - (h - 2) * 0.08)));
if (h < 1.9)
c.lerp(sand, (1.9 - h) / 0.7);
} if (h > p.h * 0.6)
c.lerp(new THREE.Color(p.rock), 0.6); if (h < -1)
c.setHex(0x6A5A40); return c.getHex(); };
var gr = wGround(s, n, function (x, z) { var h = seaIsleH(p, p.x + x, p.z + z); return [h, colAt(h, x, z)]; });
prwGroundLook(gr, s);
gr.position.set(p.x, 0, p.z);
g.add(gr);
var sh = new THREE.Mesh(new THREE.RingGeometry(p.r * 0.7, p.r * 1.25, 48, 1), prwMat(0x3AB8B8, { op: 0.45, ds: 1 }));
sh.rotation.x = -Math.PI / 2;
sh.position.set(p.x, -0.35, p.z);
g.add(sh);
try {
prwTown(p, g, B);
}
catch (e) {
if (window.console)
console.warn("[prw] town " + p.k, e);
}
B.people.forEach(function (P) { SEA.people.push(P); });
B.talkers.forEach(function (T) { SEA.talkers.push(T); });
B.solids.forEach(function (S) { SEA.solids = SEA.solids || []; SEA.solids.push(S); });
if (typeof EVB_WD !== "undefined") {
var L = EVB_WD.sea || (EVB_WD.sea = []);
B.doors.forEach(function (D) { L.push(D); });
}
B.ms = Math.round(performance.now() - t0);
},
function (p) {
var B = PRW.built[p.k];
if (!B)
return;
delete PRW.built[p.k];
SEA.people = SEA.people.filter(function (P) { return B.people.indexOf(P) < 0; });
SEA.talkers = SEA.talkers.filter(function (T) { return B.talkers.indexOf(T) < 0; });
if (SEA.solids)
SEA.solids = SEA.solids.filter(function (S) { return B.solids.indexOf(S) < 0; });
if (typeof EVB_WD !== "undefined" && EVB_WD.sea)
EVB_WD.sea = EVB_WD.sea.filter(function (D) { return B.doors.indexOf(D) < 0; });
prwLetGo(B.g);
},
function (g, w, d, h, col, kind, y) {
var m;
if (kind === "hip" || kind === "thatch") {
m = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1, 1, 4, 1), prwMat(col));
m.scale.set(w * 0.74, h, d * 0.74);
m.rotation.y = Math.PI / 4;
m.position.y = y + h / 2;
g.add(m);
if (kind === "thatch") {
var fr = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.25, 4, 1, true), prwMat(blendHex(col, 0x000000, 0.2), { ds: 1 }));
fr.scale.set(w * 0.76, 1, d * 0.76);
fr.rotation.y = Math.PI / 4;
fr.position.y = y + 0.05;
g.add(fr);
}
return m;
}
var sh = new THREE.Shape();
sh.moveTo(-d / 2 - 0.4, 0);
sh.lineTo(0, h);
sh.lineTo(d / 2 + 0.4, 0);
sh.lineTo(-d / 2 - 0.4, 0);
var geo = new THREE.ExtrudeGeometry(sh, { depth: w + 0.6, bevelEnabled: false });
geo.translate(0, 0, -(w + 0.6) / 2);
geo.rotateY(Math.PI / 2);
m = new THREE.Mesh(geo, prwMat(col));
m.position.y = y;
g.add(m);
return m;
},
function (g, x, y, z, ry, shut, frame, w, h) {
var q = new THREE.Group();
q.position.set(x, y, z);
q.rotation.y = ry;
g.add(q);
prwBox(w || 0.9, h || 1.2, 0.08, 0x1A1612, 0, 0, 0.02, q);
prwBox((w || 0.9) + 0.16, 0.1, 0.14, frame, 0, -(h || 1.2) / 2 - 0.05, 0.04, q);
prwBox((w || 0.9) + 0.16, 0.08, 0.12, frame, 0, (h || 1.2) / 2 + 0.04, 0.04, q);
if (shut != null) {
prwBox(0.42, h || 1.2, 0.05, shut, -(w || 0.9) / 2 - 0.24, 0, 0.08, q);
prwBox(0.42, h || 1.2, 0.05, shut, (w || 0.9) / 2 + 0.24, 0, 0.08, q);
}
},
function (g, S, R, o) {
o = o || {};
var w = o.w || (7 + R() * 4), d = o.d || (6 + R() * 3), fl = o.floors || (R() < 0.45 ? 2 : 1), fh = 3.1, h = fl * fh;
var wall = o.wall || S.walls[Math.floor(R() * S.walls.length)], roofC = o.roof || S.roof[Math.floor(R() * S.roof.length)], shut = S.shut[Math.floor(R() * S.shut.length)];
prwBox(w + 0.3, 0.5, d + 0.3, 0x8A8070, 0, 0.25, 0, g);
prwBox(w, h, d, wall, 0, 0.5 + h / 2, 0, g);
if (S === PRW_STY.eng || S === PRW_STY.camp)
for (var cb = 0; cb < h / 0.5; cb++)
prwBox(w + 0.04, 0.04, d + 0.04, blendHex(wall, 0x000000, 0.12), 0, 0.5 + cb * 0.5 + 0.25, 0, g);
if (S === PRW_STY.spa) {
prwBox(w + 0.08, 0.35, d + 0.08, blendHex(wall, 0x8A6A4A, 0.25), 0, 0.68, 0, g);
}
prwRoof(g, w, d, S.kind === "steep" ? d * 0.62 : S.kind === "hip" ? 2.2 : 2.6, roofC, S.kind, 0.5 + h);
var dx = o.doorX || 0;
prwBox(1.3, 2.3, 0.12, o.doorCol || 0x4A3420, dx, 1.65, d / 2 + 0.02, g);
prwBox(1.6, 0.18, 0.2, S.trim, dx, 2.9, d / 2 + 0.06, g);
for (var f = 0; f < fl; f++) {
var y = 0.5 + f * fh + 1.8, n = Math.max(1, Math.round(w / 3));
for (var i = 0; i < n; i++) {
var x = -w / 2 + w * (i + 0.5) / n;
if (f === 0 && Math.abs(x - dx) < 1.4)
continue;
prwWin(g, x, y, d / 2 + 0.04, 0, S === PRW_STY.camp ? null : shut, S.trim);
}
[-1, 1].forEach(function (s) { prwWin(g, s * (w / 2 + 0.04), y, 0, s * Math.PI / 2, S === PRW_STY.camp ? null : shut, S.trim); });
}
if (S.chim && !o.noChim)
prwBox(0.9, 2.4, 0.9, S.chim, w / 2 - 1.2, 0.5 + h + 1.6, -d / 4, g);
if (R() < S.porch && !o.noPorch) {
var py = Math.min(h, 3) + 0.5;
prwBox(w + 0.6, 0.14, 2.2, blendHex(roofC, 0x000000, 0.1), 0, py, d / 2 + 1.1, g).rotation.x = -0.12;
for (var k = 0; k < 4; k++)
prwCyl(0.09, 0.1, py - 0.5, 0x6A5A44, -w / 2 + 0.1 + k * (w - 0.2) / 3, 0.5 + (py - 0.5) / 2, d / 2 + 2.1, g, 6);
prwBox(w + 0.6, 0.16, 2.3, 0x7A6A52, 0, 0.42, d / 2 + 1.1, g);
}
if (S.balc && fl > 1 && R() < 0.8) {
prwBox(w * 0.6, 0.12, 1.1, 0x5A3A1E, 0, 0.5 + fh + 0.1, d / 2 + 0.55, g);
for (var b = 0; b < 9; b++)
prwBox(0.05, 0.9, 0.05, 0x2A1E14, -w * 0.3 + b * w * 0.6 / 8, 0.5 + fh + 0.6, d / 2 + 1.08, g);
prwBox(w * 0.6, 0.06, 0.08, 0x2A1E14, 0, 0.5 + fh + 1.05, d / 2 + 1.08, g);
}
return { hw: w / 2, hd: d / 2, h: h };
},
function (g, S, R, name) {
var b = prwHouse(g, S, R, { floors: 2, w: 10 + R() * 3, d: 8, noPorch: false });
prwSign(g, [name.replace(/^(A |The )/, "").replace(/,.*$/, "")], b.hw - 1.2, 3.6, b.hd + 1.5);
for (var i = 0; i < 4; i++)
prwCyl(0.4, 0.4, 0.9, 0x6A4A2A, -b.hw + 0.8 + i * 0.95, 0.95, b.hd + 2.6, g, 10);
prwBox(2.2, 0.08, 0.9, 0x6A4A2A, b.hw - 2, 1.2, b.hd + 3.2, g);
[-0.8, 0.8].forEach(function (s) { prwBox(0.08, 0.75, 0.08, 0x5A3A1E, b.hw - 2 + s, 0.8, b.hd + 3.2, g); });
return b;
},
function (g, S, R) {
var w = 10, d = 18, h = 7, wall = S === PRW_STY.camp ? 0xC8BCA8 : S.walls[0];
prwBox(w + 0.4, 0.6, d + 0.4, 0x8A8070, 0, 0.3, 0, g);
prwBox(w, h, d, wall, 0, 0.6 + h / 2, 0, g);
prwRoof(g, w, d, 4, S.roof[0], S === PRW_STY.spa ? "gable" : S.kind === "thatch" ? "gable" : "gable", 0.6 + h);
prwBox(1.8, 3.2, 0.14, 0x3A2414, 0, 2.2, d / 2 + 0.02, g);
for (var i = 0; i < 4; i++)
[-1, 1].forEach(function (s) { prwWin(g, s * (w / 2 + 0.04), 3.8, -d / 2 + 3 + i * 4, s * Math.PI / 2, null, S.trim, 1, 2.4); });
if (S === PRW_STY.spa) {
prwBox(w * 0.7, 4.5, 0.8, wall, 0, 0.6 + h + 2.6, d / 2 - 0.4, g);
[-1.2, 1.2].forEach(function (x) { prwBox(1.1, 1.4, 0.9, 0x2A2018, x, 0.6 + h + 3.4, d / 2 - 0.4, g); prwCone(0.42, 0.7, 0xB8883A, x, 0.6 + h + 3.3, d / 2 - 0.4, g, 10); });
prwBox(0.2, 1.2, 0.2, 0xE8E0CC, 0, 0.6 + h + 5.6, d / 2 - 0.4, g);
prwBox(0.8, 0.2, 0.2, 0xE8E0CC, 0, 0.6 + h + 5.8, d / 2 - 0.4, g);
}
else {
prwBox(4, h + 5, 4, wall, 0, 0.6 + (h + 5) / 2, d / 2 + 1.6, g);
prwCone(3.0, 6, S.roof[0], 0, 0.6 + h + 5 + 3, d / 2 + 1.6, g, 4).rotation.y = Math.PI / 4;
prwWin(g, 0, h + 3, d / 2 + 3.64, 0, null, S.trim, 0.9, 1.6);
}
return { hw: w / 2, hd: d / 2 + (S === PRW_STY.spa ? 0 : 3.6), h: h };
},
function (g, S, R, o) {
var r = o.r || 22, ruin = !!o.ruin, wall = 0xA89A80, cap = 0xC8BCA0;
for (var side = 0; side < 4; side++) {
var a = side * Math.PI / 2, cx = Math.sin(a) * r, cz = Math.cos(a) * r;
for (var seg = 0; seg < 8; seg++) {
var u = -r + seg * r / 4 + r / 8;
if (side === 0 && Math.abs(u) < 3)
continue;
var hh = ruin && R() < 0.35 ? 1.5 + R() * 2.5 : 6;
var px = cx + Math.cos(a) * u, pz = cz - Math.sin(a) * u;
var b = prwBox(r / 4 + 0.05, hh, 2.4, wall, px, hh / 2, pz, g);
b.rotation.y = a;
if (hh > 5) {
var c = prwBox(r / 4 * 0.45, 1, 2.6, cap, px + Math.cos(a) * r / 16, hh + 0.5, pz - Math.sin(a) * r / 16, g);
c.rotation.y = a;
}
}
}
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { var b = prwBox(7, ruin ? 4 : 6.6, 7, wall, q[0] * r, (ruin ? 4 : 6.6) / 2, q[1] * r, g); b.rotation.y = Math.PI / 4; });
prwBox(7, 1.6, 2.8, cap, 0, 6.6, r, g);
prwBox(1.4, 6, 2.8, wall, -3.2, 3, r, g);
prwBox(1.4, 6, 2.8, wall, 3.2, 3, r, g);
var ng = prwLite() ? 6 : 14;
for (var i = 0; i < ng; i++) {
var sd = i % 4, a2 = sd * Math.PI / 2 + Math.PI, u2 = -r * 0.7 + ((i / 4) | 0) * r * 0.45, gx = Math.sin(a2 + Math.PI) * (r - 0.4) + Math.cos(a2) * u2, gz = Math.cos(a2 + Math.PI) * (r - 0.4) - Math.sin(a2) * u2;
if (ruin && R() < 0.4)
continue;
var gun = new THREE.Group();
gun.position.set(gx, 6.2, gz);
gun.rotation.y = a2 + Math.PI;
g.add(gun);
prwBox(1.0, 0.4, 1.6, 0x5A3A1E, 0, 0.2, 0, gun);
[-0.45, 0.45].forEach(function (s) { prwCyl(0.32, 0.32, 0.12, 0x3A2A1A, s * 1, 0.3, 0.5, gun, 10).rotation.z = Math.PI / 2; });
var bar = prwCyl(0.16, 0.24, 2.6, 0x1A1A1E, 0, 0.62, 0.9, gun, 10);
bar.rotation.x = Math.PI / 2;
}
prwCyl(0.12, 0.16, 14, 0x5A3A1E, -r * 0.6, 7, -r * 0.6, g, 6);
var fl = prwFlag(o.flag || "eng");
fl.position.set(-r * 0.6 + 1.6, 12.6, -r * 0.6);
fl.userData.keep = 1;
g.add(fl);
if (!ruin) {
prwBox(10, 5, 6, 0xB8A890, 0, 2.5, -r * 0.45, g);
prwRoof(g, 10, 6, 2, 0x6A5A4A, "gable", 5);
}
return { hw: r + 3.5, hd: r + 3.5, h: 6, fort: 1 };
},
function (k) {
if (PRW_FLAGTEX[k])
return PRW_FLAGTEX[k];
var t = wTex(160, 100, function (x, W, H) {
var bone = "#F0ECE0";
switch (k) {
case "eng":
x.fillStyle = "#B82A2A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#F4F4F4";
x.fillRect(0, 0, 64, 40);
x.fillStyle = "#B82A2A";
x.fillRect(26, 0, 12, 40);
x.fillRect(0, 14, 64, 12);
x.fillStyle = "#1E2A6A";
x.globalAlpha = 0;
x.globalAlpha = 1;
break;
case "spa":
x.fillStyle = "#F4F2EA";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#B82A2A";
x.lineWidth = 12;
x.beginPath();
x.moveTo(20, 10);
x.lineTo(140, 90);
x.moveTo(140, 10);
x.lineTo(20, 90);
x.stroke();
break;
case "fr":
x.fillStyle = "#F4F2EA";
x.fillRect(0, 0, W, H);
x.fillStyle = "#C8A040";
for (var i = 0; i < 3; i++) {
x.beginPath();
x.arc(50 + i * 30, 50 + (i === 1 ? -12 : 6), 7, 0, 7);
x.fill();
}
break;
case "red":
x.fillStyle = "#9A0E0E";
x.fillRect(0, 0, W, H);
break;
case "teach":
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
x.fillStyle = bone;
x.beginPath();
x.arc(56, 30, 10, 0, 7);
x.fill();
x.fillRect(53, 40, 6, 30);
x.fillRect(44, 48, 24, 4);
x.fillRect(50, 70, 4, 22);
x.fillRect(58, 70, 4, 22);
x.fillRect(66, 42, 20, 3);
x.fillStyle = "#B82A2A";
x.beginPath();
x.moveTo(108, 44);
x.arc(102, 42, 6, Math.PI, 0);
x.arc(114, 42, 6, Math.PI, 0);
x.lineTo(108, 60);
x.closePath();
x.fill();
x.fillStyle = bone;
x.fillRect(84, 36, 3, 18);
break;
case "rackham":
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
x.fillStyle = bone;
x.beginPath();
x.arc(80, 38, 15, 0, 7);
x.fill();
x.fillRect(70, 46, 20, 10);
x.fillStyle = "#0A0A0A";
x.beginPath();
x.arc(74, 36, 4, 0, 7);
x.arc(86, 36, 4, 0, 7);
x.fill();
x.strokeStyle = bone;
x.lineWidth = 5;
x.beginPath();
x.moveTo(50, 90);
x.lineTo(110, 62);
x.moveTo(110, 90);
x.lineTo(50, 62);
x.stroke();
break;
case "roberts":
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
x.fillStyle = bone;
x.beginPath();
x.arc(80, 24, 9, 0, 7);
x.fill();
x.fillRect(76, 32, 8, 26);
x.fillRect(64, 36, 32, 4);
x.fillRect(76, 56, 3, 16);
x.fillRect(81, 56, 3, 16);
[52, 108].forEach(function (cx) { x.beginPath(); x.arc(cx, 80, 9, 0, 7); x.fill(); });
x.font = "bold 11px Georgia";
x.fillText("ABH", 40, 98);
x.fillText("AMH", 98, 98);
break;
default:
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
x.fillStyle = bone;
x.beginPath();
x.arc(80, 40, 15, 0, 7);
x.fill();
x.fillRect(70, 48, 20, 10);
x.fillStyle = "#0A0A0A";
x.beginPath();
x.arc(74, 38, 4.5, 0, 7);
x.arc(86, 38, 4.5, 0, 7);
x.fill();
x.fillStyle = bone;
x.save();
x.translate(80, 74);
x.rotate(0.5);
x.fillRect(-30, -3, 60, 6);
x.rotate(-1);
x.fillRect(-30, -3, 60, 6);
x.restore();
}
});
PRW_FLAGTEX[k] = t;
return t;
},
function (kind, o) {
o = o || {};
var g = new THREE.Group(), L = { sloop: 20, brig: 28, ship: 38, galleon: 44 }[kind] || 24, B = L * 0.27, H = L * 0.16;
var hc = o.hull != null ? o.hull : 0x3A2A1C, wale = o.wale != null ? o.wale : 0x1A1410, band = o.band != null ? o.band : 0xA8883A;
var hg = new THREE.BoxGeometry(B, H, L, 1, 3, 12), p = hg.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = z / (L / 2);
var taper = 1 - Math.pow(Math.abs(k), 2.4) * (k > 0 ? 0.9 : 0.35), bottom = y < 0 ? 0.5 : 1;
p.setX(i, x * taper * bottom);
if (y > 0)
p.setY(i, y + Math.pow(Math.abs(k), 2) * (k < 0 ? H * 0.45 : H * 0.25));
}
hg.computeVertexNormals();
var hull = new THREE.Mesh(hg, prwMat(hc));
hull.position.y = H * 0.3;
g.add(hull);
prwBox(B * 0.92, 0.25, L * 0.86, 0x8A6A42, 0, H * 0.8, -L * 0.02, g);
prwBox(B * 1.01, 0.3, L * 0.82, wale, 0, H * 0.55, 0, g);
prwBox(B * 1.02, 0.18, L * 0.8, band, 0, H * 0.82, 0, g);
var guns = o.guns != null ? o.guns : { sloop: 5, brig: 7, ship: 10, galleon: 12 }[kind];
for (var c = 0; c < guns; c++) {
var z = -L * 0.32 + c * (L * 0.62 / Math.max(1, guns - 1));
[-1, 1].forEach(function (s) { prwBox(0.08, 0.55, 0.6, 0x0A0806, s * B * 0.5, H * 0.62, z, g); if (!o.shut) {
var gb = prwCyl(0.11, 0.13, 0.9, 0x141414, s * (B * 0.5 + 0.3), H * 0.62, z, g, 6);
gb.rotation.z = Math.PI / 2;
} });
}
var qd = kind === "sloop" ? 0.18 : 0.26;
prwBox(B * 0.92, H * 0.45, L * qd, hc, 0, H * 1.02, -L * (0.5 - qd / 2) + 0.6, g);
prwBox(B * 0.94, 0.16, L * qd + 0.2, band, 0, H * 1.25, -L * (0.5 - qd / 2) + 0.6, g);
if (kind === "galleon") {
prwBox(B * 0.8, H * 0.5, L * 0.14, hc, 0, H * 1.5, -L * 0.42, g);
prwBox(B * 0.86, H * 0.35, L * 0.12, hc, 0, H * 0.95, L * 0.4, g);
}
for (var w = 0; w < (kind === "sloop" ? 3 : 5); w++)
prwBox(0.6, 0.5, 0.06, 0xF0D890, -B * 0.36 + w * B * 0.72 / ((kind === "sloop" ? 3 : 5) - 1), H * 1.05, -L * 0.5 + 0.35, g, { e: 0x6A5020, ei: 0.6 });
if (kind !== "sloop")
[-1, 1].forEach(function (s) { prwSph(0.35, 0xFFD890, s * B * 0.32, H * 1.6, -L * 0.5 + 0.2, g, 8, { e: 0xC89A40 }); });
var bs = prwCyl(0.14, 0.22, L * 0.4, 0x5A3A1E, 0, H * 1.1, L * 0.55, g, 6);
bs.rotation.x = 1.2;
if (o.figure)
prwSph(0.6, o.figure, 0, H * 0.9, L * 0.48, g, 8);
var sail = prwMat(o.sails != null ? o.sails : 0xE4DCC4, { ds: 1 }), mast = 0x5A3A1E;
var masts = kind === "sloop" ? [[0.1, L * 1.05]] : kind === "brig" ? [[0.18, L * 0.95], [-0.15, L * 1.0]] : [[0.28, L * 0.82], [0.02, L * 0.92], [-0.28, L * 0.66]];
var furl = !!o.furled;
masts.forEach(function (m, mi) {
var mz = m[0] * L, mh = m[1];
prwCyl(0.18, 0.3, mh, mast, 0, H * 0.8 + mh / 2, mz, g, 8);
if (kind === "sloop") {
var boom = prwCyl(0.1, 0.1, L * 0.55, mast, 0, H * 0.8 + 2.2, mz - L * 0.27, g, 6);
boom.rotation.x = Math.PI / 2;
if (!furl) {
var sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.Float32BufferAttribute([0, H * 0.8 + 2.4, mz - 0.2, 0, H * 0.8 + 2.4, mz - L * 0.53, 0, H * 0.8 + mh * 0.78, mz - L * 0.42, 0, H * 0.8 + 2.4, mz - 0.2, 0, H * 0.8 + mh * 0.78, mz - L * 0.42, 0, H * 0.8 + mh * 0.86, mz - 0.2], 3));
sg.computeVertexNormals();
g.add(new THREE.Mesh(sg, sail));
var jg = new THREE.BufferGeometry();
jg.setAttribute("position", new THREE.Float32BufferAttribute([0, H * 0.8 + mh * 0.8, mz + 0.2, 0, H * 1.4, L * 0.68, 0, H * 1.1, mz + 0.6], 3));
jg.computeVertexNormals();
g.add(new THREE.Mesh(jg, sail));
}
else
prwCyl(0.35, 0.35, L * 0.5, 0xD8D0B8, 0, H * 0.8 + 2.5, mz - L * 0.27, g, 6).rotation.x = Math.PI / 2;
return;
}
var ny = mi === 2 && kind !== "brig" ? 2 : 3;
for (var y = 0; y < ny; y++) {
var yy = H * 0.8 + mh * (0.32 + y * 0.24), yw = B * (1.9 - y * 0.42);
prwCyl(0.1, 0.1, yw, mast, 0, yy + mh * 0.11, mz, g, 6).rotation.z = Math.PI / 2;
if (furl) {
prwCyl(0.28, 0.28, yw * 0.9, 0xD8D0B8, 0, yy + mh * 0.1, mz, g, 6).rotation.z = Math.PI / 2;
continue;
}
var sw = yw * 0.92, shh = mh * 0.21, sg2 = new THREE.PlaneGeometry(sw, shh, 5, 3), sp = sg2.attributes.position;
for (var j = 0; j < sp.count; j++) {
var sx = sp.getX(j);
sp.setZ(j, (1 - Math.pow(sx / (sw / 2), 2)) * shh * 0.14);
}
sg2.computeVertexNormals();
var s = new THREE.Mesh(sg2, sail);
s.position.set(0, yy, mz + 0.25);
g.add(s);
}
if (mi === masts.length - 1 && kind !== "brig") {
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute([0, H * 0.8 + 3, mz - 0.3, 0, H * 0.8 + 3, mz - L * 0.2, 0, H * 0.8 + mh * 0.55, mz - 0.3], 3));
lg.computeVertexNormals();
g.add(new THREE.Mesh(lg, sail));
}
});
var top = masts[masts.length - 1], fl = prwFlag(o.flag || "eng", L * 0.1, L * 0.064);
fl.position.set(0, H * 0.8 + top[1] + 0.3, top[0] * L);
g.add(fl);
g.userData.flag = fl;
var rg = [];
masts.forEach(function (m) { for (var s = -1; s <= 1; s += 2)
for (var k = 0; k < 4; k++) {
rg.push(s * B * 0.5, H * 0.85, m[0] * L - 1 + k * 0.6, 0, H * 0.8 + m[1] * 0.8, m[0] * L);
} rg.push(0, H * 0.8 + m[1] * 0.9, m[0] * L, 0, H * 1.3, L * 0.62); });
var lgeo = new THREE.BufferGeometry();
lgeo.setAttribute("position", new THREE.Float32BufferAttribute(rg, 3));
var ln = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: 0x2A2018 }));
g.add(ln);
g.userData.L = L;
g.userData.B = B;
g.userData.H = H;
return g;
},
function (g, R) {
var wd = 0x4A3A28;
prwBox(5, 1.2, 3, 0x6A5A44, 0, 0.6, 0, g);
[-2, 2].forEach(function (x) { prwBox(0.35, 6.4, 0.35, wd, x, 3.2, 0, g); });
prwBox(5.2, 0.4, 0.4, wd, 0, 6.3, 0, g);
[-1, 1].forEach(function (s) { var br = prwBox(0.2, 1.6, 0.2, wd, s * 1.55, 5.6, 0, g); br.rotation.z = s * 0.7; });
for (var i = 0; i < 6; i++)
prwBox(1.6, 0.2, 0.4, 0x6A5A44, -3.2, 0.15 + i * 0.2, -1.4 + i * 0.2, g).rotation.y = Math.PI / 2;
var ns = [-1, 0, 1];
ns.forEach(function (x) { prwCyl(0.025, 0.025, 1.6, 0xB8A880, x, 5.3, 0, g, 4); var n = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 5, 10), prwMat(0xB8A880)); n.position.set(x, 4.35, 0); g.add(n); });
return { hw: 2.6, hd: 1.6, hanged: ns };
},
function (g) {
var wd = 0x5A4A34;
prwBox(2.6, 0.22, 0.3, wd, 0, 0.5, 0, g);
prwBox(2.6, 0.3, 0.14, wd, 0, 0.75, 0, g);
[-1.2, 1.2].forEach(function (x) { prwBox(0.18, 1.1, 0.3, wd, x, 0.55, 0, g); });
prwBox(2.4, 0.12, 0.6, 0x6A5A44, 0, 0.42, -0.9, g);
[-1, 1].forEach(function (x) { prwBox(0.12, 0.4, 0.5, 0x6A5A44, x, 0.2, -0.9, g); });
return { hw: 1.4, hd: 1.1 };
},
function (g, adult) {
var wd = 0x3A2E22, iron = 0x2A2A2A;
prwBox(0.4, 8, 0.4, wd, 0, 4, 0, g);
prwBox(2.4, 0.3, 0.3, wd, 1.1, 7.8, 0, g);
var b = prwBox(0.18, 1.4, 0.18, wd, 0.6, 7.2, 0, g);
b.rotation.z = -0.8;
prwCyl(0.03, 0.03, 1.0, iron, 2.0, 7.3, 0, g, 4);
var cage = new THREE.Group();
cage.position.set(2.0, 5.6, 0);
g.add(cage);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
prwBox(0.05, 2.0, 0.05, iron, Math.cos(a) * 0.32, 0, Math.sin(a) * 0.25, cage);
}
[-1, 0, 1].forEach(function (y) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.03, 4, 12), prwMat(iron)); r.rotation.x = Math.PI / 2; r.scale.z = 0.78; r.position.y = y * 0.9; cage.add(r); });
prwSph(0.2, iron, 0, 1.05, 0, cage, 8);
if (adult)
prwBones(cage, 0, -0.15, 0);
cage.userData.keep = 1;
g.userData.cage = cage;
return { hw: 0.5, hd: 0.5 };
},
function (g, x, y, z) {
var bone = 0xD8CCB0, rag = 0x2A2420;
prwSph(0.11, bone, x, y + 0.85, z, g, 8);
prwBox(0.08, 0.05, 0.04, 0x1A1410, x - 0.04, y + 0.86, z + 0.09, g);
prwBox(0.08, 0.05, 0.04, 0x1A1410, x + 0.04, y + 0.86, z + 0.09, g);
prwCyl(0.03, 0.03, 0.6, bone, x, y + 0.45, z, g, 5);
for (var r = 0; r < 5; r++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.13 - r * 0.01, 0.012, 4, 10, Math.PI * 1.4), prwMat(bone));
t.rotation.x = Math.PI / 2;
t.position.set(x, y + 0.65 - r * 0.07, z);
g.add(t);
}
prwBox(0.34, 0.5, 0.2, rag, x, y + 0.45, z - 0.02, g, { op: 0.85 });
[-1, 1].forEach(function (s) { var a = prwCyl(0.025, 0.022, 0.65, bone, x + s * 0.17, y + 0.38, z, g, 5); a.rotation.z = s * 0.12; var l = prwCyl(0.03, 0.025, 0.8, bone, x + s * 0.08, y - 0.3, z, g, 5); });
},
function (g, x, y, z, R) {
var q = new THREE.Group(), lean = (R() - 0.5) * 0.5;
for (var i = 0; i < 6; i++) {
var s = prwCyl(0.28 - i * 0.02, 0.32 - i * 0.02, 1.6, 0x8A6A42, Math.sin(lean) * i * 1.3, 0.8 + i * 1.5, 0, q, 6);
s.rotation.z = -lean;
}
var top = new THREE.Vector3(Math.sin(lean) * 7.8, 9.4, 0);
for (var l = 0; l < 7; l++) {
var lf = prwBox(0.7, 0.06, 4.4, 0x4A8A34, 0, 0, 0, q, { ds: 1 });
lf.position.copy(top);
lf.rotation.y = l / 7 * Math.PI * 2;
lf.rotateX(0.5);
lf.translateZ(2);
}
q.position.set(x, y, z);
q.rotation.y = R() * 6;
g.add(q);
return q;
},
function (p, B, S, u, v, ry, fn, R, solid) {
var c = prwT(p, u, v), q = new THREE.Group(), y = prwGy(p, c.x, c.z);
q.position.set(c.x, y - 0.3, c.z);
q.rotation.y = ry;
B.stat.add(q);
var r = fn(q, S, R) || { hw: 3, hd: 3 };
r.x = c.x;
r.z = c.z;
r.ry = ry;
r.y = y;
if (solid !== false && !r.fort)
B.solids.push({ x: c.x, z: c.z, hw: r.hw, hd: r.hd, rot: ry });
if (r.fort) {
var hw = r.hw - 3.5;
[[0, hw], [0, -hw], [hw, 0], [-hw, 0]].forEach(function (o, i) {
var wx = c.x + Math.cos(ry) * o[0] + Math.sin(ry) * o[1], wz = c.z - Math.sin(ry) * o[0] + Math.cos(ry) * o[1];
if (i === 0) {
[-1, 1].forEach(function (s) { var ox = c.x + Math.cos(ry) * (s * hw * 0.6) + Math.sin(ry) * hw, oz = c.z - Math.sin(ry) * (s * hw * 0.6) + Math.cos(ry) * hw; B.solids.push({ x: ox, z: oz, hw: hw * 0.4, hd: 1.4, rot: ry }); });
return;
}
B.solids.push({ x: wx, z: wz, hw: i < 2 ? hw + 1 : 1.4, hd: i < 2 ? 1.4 : hw + 1, rot: ry });
});
}
return r;
},
function (p, g, B) {
var S = PRW_STY[p.style] || PRW_STY.eng, R = wRand((p.x * 13 + p.z * 7) | 0), lite = PRW.lite, adult = prwAdult();
B.stat = new THREE.Group();
g.add(B.stat);
B.live = new THREE.Group();
g.add(B.live);
var spa = p.style === "spa", lr = p.r;
var door = function (r, theme, name, o) { if (!theme || typeof evbWorldDoor !== "function")
return; var D = evbWorldDoor("sea", r.x, r.z, r.ry, r.hd, theme, name, Object.assign({ y: r.y }, o || {})); if (D) {
var L = EVB_WD.sea;
if (L && L[L.length - 1] === D)
L.pop();
B.doors.push(D);
} };
var sq = prwT(p, 0, 0), sy = prwGy(p, sq.x, sq.z);
var plaza = new THREE.Mesh(new THREE.CircleGeometry(lite ? 18 : 28, lite ? 24 : 40), prwPlazaMat(p));
plaza.rotation.x = -Math.PI / 2;
plaza.position.set(sq.x, sy + 0.04, sq.z);
B.stat.add(plaza);
if (!lite)
prwSquareDress(p, B.stat, sq, sy, R);
if (spa) {
prwCyl(1.6, 1.8, 0.9, 0xD8D0C0, sq.x, sy + 0.45, sq.z, B.stat, 16);
prwCyl(0.3, 0.4, 2.2, 0xD8D0C0, sq.x, sy + 1.6, sq.z, B.stat, 8);
}
else {
prwCyl(1.0, 1.0, 0.8, 0x8A8070, sq.x, sy + 0.4, sq.z, B.stat, 12);
prwBox(0.15, 2.2, 0.15, 0x4A3A28, sq.x - 0.9, sy + 1.1, sq.z, B.stat);
prwBox(0.15, 2.2, 0.15, 0x4A3A28, sq.x + 0.9, sy + 1.1, sq.z, B.stat);
prwBox(2.0, 0.15, 0.15, 0x4A3A28, sq.x, sy + 2.2, sq.z, B.stat);
}
B.spots = [];
B.prompts = [];
var ring = 0, slots = [[-30, -6], [30, -6], [-26, -30], [26, -30], [0, -38], [-48, -18], [48, -18], [-50, 8], [50, 8], [-14, -58], [14, -58], [-40, -48], [40, -48], [-62, -34], [62, -34], [-70, 0], [70, 0]];
var pub = [[-10, 14], [10, 14], [-18, 22]], pubi = 0;
(p.b || []).forEach(function (b) {
var kind = b[0], name = b[1];
if (kind === "fort") {
var fu = (ring % 2 ? -1 : 1) * Math.min(lr * 0.55, 90), fv = Math.min(lr * 0.3, 60);
ring++;
var r0 = prwPlace(p, B, S, fu, fv, prwFacing(p, fu, fv) + Math.PI, function (q, S2, R2) { return prwFort(q, S2, R2, { r: lite ? 18 : 22, ruin: p.k === "nassau", flag: p.k === "nassau" ? "black" : spa ? "spa" : p.style === "fr" ? "fr" : "eng" }); }, R);
B.spots.push({ x: r0.x, z: r0.z, r: 26, name: name, verb: "read its story", fn: prwFortCard(p, name) });
door({ x: r0.x + Math.sin(r0.ry) * -(r0.hd - 6), z: r0.z + Math.cos(r0.ry) * -(r0.hd - 6), ry: r0.ry, hd: 4, y: r0.y }, "prfort", name, { doors: "the powder house door" });
return;
}
if (kind === "stocks" || kind === "pillory" || kind === "gallows") {
var pp = pub[pubi++ % pub.length];
if (kind === "gallows") {
pp = [-(lr * 0.25), lr * 0.1];
}
var r1 = prwPlace(p, B, S, pp[0], pp[1], prwFacing(p, pp[0], pp[1]), kind === "stocks" ? prwStocks : kind === "pillory" ? prwPillory : prwGallows, R);
prwPunished(p, B, kind, r1, adult);
B.law = B.law || {};
B.law[kind] = r1;
B.spots.push({ x: r1.x, z: r1.z, r: kind === "gallows" ? 6 : 3.4, name: kind === "gallows" ? (name || "The gallows") : kind === "stocks" ? "The stocks" : "The pillory", verb: "read", fn: prwLawCard(kind, p, name) });
return;
}
if (kind === "gibbet") {
prwGibbets(p, B, adult);
return;
}
if (kind === "drowned") {
prwDrowned(p, B, R);
return;
}
if (kind === "careen") {
prwCareen(p, B, R);
return;
}
if (kind === "tents") {
prwTents(p, B, R);
return;
}
if (kind === "camp") {
prwCampSpot(p, B, R, name);
return;
}
if (kind === "market") {
prwMarket(p, B, R, name);
return;
}
if (kind === "wright") {
prwWright(p, B, R, name);
return;
}
var s = slots[ring++ % slots.length], su = s[0] * (lr > 500 ? 1 : 0.85), sv = s[1] * (lr > 500 ? 1 : 0.85), ry = prwFacing(p, su, sv);
var fn = kind === "tavern" ? function (q, S2, R2) { return prwTavern(q, S2, R2, name); } : kind === "church" ? prwChurch : kind === "boucan" ? prwBoucan :
function (q, S2, R2) { var big = kind === "court" || kind === "store" || kind === "chandler" || /Governor/.test(name); return prwHouse(q, S2, R2, { floors: big ? 2 : undefined, w: big ? 12 : undefined, d: big ? 9 : undefined }); };
var r2 = prwPlace(p, B, S, su, sv, ry, fn, R);
var theme = /Governor/.test(name) ? "prgov" : PRW_THEME[kind] || "prhouse";
if (spa && theme === "prtavern")
theme = "prbodega";
if (kind === "boucan") {
B.spots.push({ x: r2.x, z: r2.z, r: 5, name: name, verb: "read", fn: function () { worldCard(worldFacts(name, "Tortuga", [], ["The buccaneers took their name from this: a grill of green sticks over a slow fire, the Taíno barbacoa, on which they smoked strips of beef and pork. Boucan meat kept for weeks at sea and was sold to passing ships with the hides.", "They lived rough: rawhide shoes, shirts stiff with blood and fat, long muskets made in France for them, and packs of dogs to hunt with."])); } });
return;
}
door(r2, theme, name, { doors: kind === "tavern" ? "the tavern door" : kind === "church" ? "the church door" : kind === "gaol" ? "the gaol door" : "the door" });
if (kind === "gaol" || kind === "court")
B.spots.push({ x: r2.x + Math.sin(ry) * (r2.hd + 2.5), z: r2.z + Math.cos(ry) * (r2.hd + 2.5), r: 3, name: name, verb: "read", fn: prwLawCard(kind, p, name) });
});
var nh = lite ? 8 : Math.min(26, Math.round(lr / 22)), hi = 0;
for (var row = 0; row < 4 && hi < nh; row++)
for (var col = -4; col <= 4 && hi < nh; col++) {
if (Math.abs(col) < 2 && row < 2)
continue;
var hu = col * 16 + (R() - 0.5) * 3, hv = -(70 + row * 20) + (R() - 0.5) * 3;
if (Math.hypot(hu, hv) > lr * 0.42)
continue;
var hr = prwPlace(p, B, S, hu, hv, prwFacing(p, hu, hv * 0.4), function (q, S2, R2) { return prwHouse(q, S2, R2); }, R);
door(hr, spa ? "prspahouse" : "prhouse", p.style === "camp" ? "A shack" : spa ? "A Spanish house" : "A house", {});
hi++;
}
prwWharf(p, B, R);
var np = lite ? 10 : 30;
for (var i = 0; i < np; i++) {
var a = R() * Math.PI * 2, d = lr * (0.45 + R() * 0.45), x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, h = seaIsleH(p, x, z);
if (h < 1.2 || h > p.h * 0.8)
continue;
if (Math.hypot(x - sq.x, z - sq.z) < lr * 0.4)
continue;
prwPalm(B.stat, x, h, z, R);
B.solids.push({ x: x, z: z, r: 0.5 });
}
try {
prwPeople(p, B, R);
}
catch (e) {
if (window.console)
console.warn("[prw] people", e);
}
if (typeof ctnMerge === "function" && typeof CTN_TM !== "undefined")
try {
ctnMerge(B.stat);
}
catch (e) {
if (window.console)
console.warn("[prw] merge", e);
}
B.spots.forEach(function (s) { B.talkers.push(s); });
B.talkers.push({ x: sq.x, z: sq.z, r: 5, name: p.name, verb: "read its story", fn: function () { prwPortCard(p); } });
},
function (p, name) {
return function () {
var t = { nassau: ["The old fort was burned by a French and Spanish raid in 1703 and left in ruins. The pirates mounted a few guns of their own on it. When Woodes Rogers came in 1718 he set his men and the pardoned pirates to rebuild it, and they grumbled, and some ran off."],
portroyal: ["Fort Charles, the oldest of Port Royal's forts, built in the 1650s and rebuilt after the earthquake. Its guns covered the way into Kingston Harbour."],
tortuga: ["Le Vasseur's fort on a rock above the harbour, built in 1640, with a cistern of rain water and an iron ladder that could be pulled up. Its guns kept the Spanish out of the harbour."],
havana: ["El Morro (the Castillo de los Tres Reyes del Morro), finished in 1630 on the rock at the harbour's mouth. With La Punta across the channel and a chain between them, no enemy ship could get in."],
charlestown: ["Charles Town was walled in the early 1700s against the Spanish, the French and the Yamasee, with bastions and a half-moon battery facing the harbour."],
portobelo: ["Santiago de la Gloria and San Jerónimo guarded the bay. Morgan took them from the land side in 1668."],
cartagena: ["San Felipe de Barajas, on its hill, the greatest fortress Spain built in the Americas, with tunnels in which a whisper carries from end to end."],
maracaibo: ["The fort at the bar, guarding the narrow way into the lake. Morgan tricked its garrison in 1669 into thinking he would land; they turned their guns inland, and he slipped past them in the night."] };
worldCard(worldFacts(name, p.name, [], t[p.k] || ["Guns and walls, to keep enemies out of the harbour."]));
};
},
function (p, B, R) {
var a = Math.atan2(p.dock.x - p.land.x, p.dock.z - p.land.z), len = Math.hypot(p.dock.x - p.land.x, p.dock.z - p.land.z) + 14, mx = (p.dock.x + p.land.x) / 2, mz = (p.dock.z + p.land.z) / 2;
var w = prwBox(7, 0.5, len, 0x7A5A3A, mx, 1.7, mz, B.stat);
w.rotation.y = a;
for (var i = 0; i < len / 4; i++) {
[-1, 1].forEach(function (s) { var px = p.land.x + Math.sin(a) * (i * 4 - 7) + Math.cos(a) * s * 3.3, pz = p.land.z + Math.cos(a) * (i * 4 - 7) - Math.sin(a) * s * 3.3; prwCyl(0.22, 0.22, 5, 0x4A3A28, px, -0.8, pz, B.stat, 6); });
}
PRW.decks = PRW.decks || [];
PRW.decks = PRW.decks.filter(function (d) { return d.port !== p.k; });
var dk = { x: mx, z: mz, hw: 3.5, hd: len / 2, rot: a, y: 1.95, port: p.k };
PRW.decks.push(dk);
B.decks = [dk];
for (var c = 0; c < (PRW.lite ? 3 : 8); c++) {
var t = (c + 1) / 9 * len - len / 2, sx = mx + Math.sin(a) * t + Math.cos(a) * (R() < 0.5 ? -2 : 2), sz = mz + Math.cos(a) * t - Math.sin(a) * (R() < 0.5 ? -2 : 2);
if (c % 2)
prwCyl(0.4, 0.4, 0.9, 0x6A4A2A, sx, 2.4, sz, B.stat, 10);
else
prwBox(0.9, 0.9, 0.9, 0x8A6A42, sx, 2.4, sz, B.stat);
}
var fleet = { nassau: [["sloop", "black"], ["sloop", "teach"], ["brig", "black"], ["ship", "teach"], ["sloop", "rackham"], ["sloop", "black"]], portroyal: [["ship", "eng"], ["sloop", "eng"], ["brig", "eng"], ["ship", "eng"]],
tortuga: [["sloop", "fr"], ["brig", "fr"], ["sloop", "black"]], havana: [["galleon", "spa"], ["galleon", "spa"], ["ship", "spa"], ["brig", "spa"]], charlestown: [["ship", "eng"], ["brig", "eng"], ["sloop", "eng"]],
portobelo: [["galleon", "spa"], ["ship", "spa"]], cartagena: [["galleon", "spa"], ["galleon", "spa"], ["brig", "spa"]], maracaibo: [["ship", "spa"], ["sloop", "spa"]], ocracoke: [["sloop", "teach"]],
wreck1715: [["sloop", "spa"]], barataria: [["brig", "black"], ["sloop", "black"]], gardiners: [["ship", "eng"]], capecod: [], tortugas: [["sloop", "eng"]] }[p.k] || [["sloop", "eng"]];
var n = Math.min(fleet.length, PRW.lite ? 2 : 6);
for (var s = 0; s < n; s++) {
var f = fleet[s], side = s % 2 ? 1 : -1, along = len * 0.15 + Math.floor(s / 2) * 30, dist = (f[0] === "galleon" ? 28 : f[0] === "ship" ? 24 : f[0] === "brig" ? 20 : 15) + Math.floor(s / 2) * 6;
along = len * 0.55 + Math.floor(s / 2) * 28;
var sx2, sz2, ok = false;
for (var tr = 0; tr < 14 && !ok; tr++) {
sx2 = p.land.x + Math.sin(a) * along + Math.cos(a) * side * dist;
sz2 = p.land.z + Math.cos(a) * along - Math.sin(a) * side * dist;
ok = seaIsleH(p, sx2, sz2) < -3;
if (!ok)
along += 14;
}
if (!ok)
continue;
var sh = prwShip(f[0], { flag: f[1], furled: true, hull: f[1] === "spa" ? 0x5A3A22 : undefined, band: f[1] === "spa" ? 0xC8A040 : f[1] === "fr" ? 0x2A4A8A : undefined });
sh.position.set(sx2, 0, sz2);
sh.rotation.y = a + (R() - 0.5) * 0.4;
B.live.add(sh);
B.solids.push({ x: sx2, z: sz2, hw: sh.userData.B * 0.5, hd: sh.userData.L * 0.5, rot: sh.rotation.y });
}
},
function (p, B, R) {
var a = Math.atan2(p.dock.x - p.land.x, p.dock.z - p.land.z) + 0.9, S = PRW_STY.eng;
for (var i = 0; i < (PRW.lite ? 5 : 12); i++) {
var d = p.r * 1.08 + R() * 70, aa = a + (R() - 0.5) * 0.9, x = p.x + Math.sin(aa) * d, z = p.z + Math.cos(aa) * d;
var q = new THREE.Group();
q.position.set(x, -6.5 - R() * 2, z);
q.rotation.set((R() - 0.5) * 0.25, R() * 6, (R() - 0.5) * 0.25);
B.stat.add(q);
prwHouse(q, S, R, { floors: 2, noPorch: true });
}
var c = prwT(p, 0, 0), m = { x: p.x + Math.sin(a) * (p.r * 1.1), z: p.z + Math.cos(a) * (p.r * 1.1) };
B.talkers.push({ x: p.x + Math.sin(a) * (p.r * 0.85), z: p.z + Math.cos(a) * (p.r * 0.85), r: 10, name: "The drowned town", verb: "look down into the water", fn: function () { worldCard(worldFacts("The drowned town", "Port Royal, 7 June 1692", [], ["Out there, under six to ten metres of clear water, the streets that slid into the sea in the earthquake still stand: brick walls, doorways, a tavern, a cook's shop with its pots, a pewterer's, and the bones of the people caught inside.", "A pocket watch found in the ruins in 1959 stopped at 11:43, the minute of the earthquake.", "Divers have mapped it since the 1960s. It is the best-kept town of the 1600s in the Americas, because it went down all at once."])); } });
},
function (p, B, R) {
var c = prwT(p, (R() < 0.5 ? -1 : 1) * p.r * 0.35, p.r * 0.33), a = Math.atan2(p.x - c.x, p.z - c.z) + Math.PI / 2;
var sh = prwShip("sloop", { flag: p.k === "nassau" ? "black" : "eng", furled: true, shut: true });
sh.position.set(c.x, 0.5, c.z);
sh.rotation.set(0, a, 1.05);
B.stat.add(sh);
var fire = prwCone(0.5, 1.0, 0xFF7A2A, c.x + Math.cos(a) * 6, prwGy(p, c.x, c.z) + 0.5, c.z - Math.sin(a) * 6, B.live, 7, { e: 0xFF6A1A });
fire.userData.keep = 1;
prwCyl(0.6, 0.5, 0.8, 0x1A1410, c.x + Math.cos(a) * 6, prwGy(p, c.x, c.z) + 1.2, c.z - Math.sin(a) * 6, B.stat, 10);
B.talkers.push({ x: c.x, z: c.z, r: 12, name: "Careening", verb: "read", fn: function () { worldCard(worldFacts("Careening", "Cleaning a ship's bottom", [], ["In warm water the ship-worm (a kind of clam) bores into a wooden hull and weed and barnacles grow on it, making her slow. Every few months a pirate ship had to be careened: emptied of guns and stores, hauled over on her side on a hidden beach at high tide, and her bottom scraped, burned clean and coated with tar, tallow and sulphur. Then the other side.", "It took days, and while she was over the crew could not fight or run. That is why pirates wanted remote beaches and why their enemies hunted for them there.", "Bart Roberts was caught careening more than once."])); } });
B.prompts.push({ x: c.x, z: c.z, k: "careen" });
},
function (p, B, R) {
var n = PRW.lite ? 5 : 14;
for (var i = 0; i < n; i++) {
var u = (R() - 0.5) * p.r * 0.7, v = p.r * 0.18 + R() * p.r * 0.15, c = prwT(p, u, v), y = prwGy(p, c.x, c.z);
var t = prwCone(2.4, 2.8, [0xE8E0C8, 0xD8D0B8, 0xC8BCA0][i % 3], c.x, y + 1.4, c.z, B.stat, 4);
t.rotation.y = R() * 2;
B.solids.push({ x: c.x, z: c.z, r: 1.8 });
if (i % 3 === 0) {
var f = prwCone(0.5, 1.1, 0xFF8A2A, c.x + 3, y + 0.55, c.z, B.live, 7, { e: 0xFF6A1A });
f.userData.keep = 1;
for (var b = 0; b < 3; b++)
prwCyl(0.4, 0.4, 0.9, 0x6A4A2A, c.x - 3 + b, y + 0.45, c.z + 2.5, B.stat, 10);
}
}
},
function (p, B, R, name) {
var c = prwT(p, 0, 8), y = prwGy(p, c.x, c.z);
var f = prwCone(0.6, 1.2, 0xFF8A2A, c.x, y + 0.6, c.z, B.live, 7, { e: 0xFF6A1A });
f.userData.keep = 1;
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2;
prwBox(2.2, 0.4, 0.5, 0x5A4A3A, c.x + Math.cos(a) * 3, y + 0.2, c.z + Math.sin(a) * 3, B.stat).rotation.y = a + Math.PI / 2;
}
if (p.k === "gardiners") {
var h = prwT(p, 30, -40), hy = prwGy(p, h.x, h.z);
var hole = new THREE.Mesh(new THREE.CircleGeometry(1.6, 16), prwMat(0x3A2A1A));
hole.rotation.x = -Math.PI / 2;
hole.position.set(h.x, hy + 0.05, h.z);
B.stat.add(hole);
prwBox(1.2, 0.7, 0.8, 0x5A3A1E, h.x, hy + 0.2, h.z, B.stat);
prwBox(1.25, 0.1, 0.85, 0xA8883A, h.x, hy + 0.55, h.z, B.stat);
B.talkers.push({ x: h.x, z: h.z, r: 4, name: "Kidd's Hollow", verb: "look", fn: function () { worldCard(worldFacts("Kidd's Hollow", "Gardiners Island, June 1699", [], ["Here Kidd buried a chest and a box. The list made when they were dug up for the governor survives: bags of gold dust and gold bars, silver bars and coin, rubies, diamonds, candlesticks and porringers of silver.", "It was all handed over. Kidd was taken to London, tried, and hanged at Execution Dock in May 1701. The rope broke the first time; he was hanged again. His body was tarred and hung in chains over the Thames at Tilbury for years, as a warning to sailors going by."])); } });
}
if (p.k === "capecod") {
var w = prwT(p, 0, p.r * 0.95);
var wr = prwShip("ship", { flag: "black", furled: true });
wr.position.set(w.x, -3.8, w.z);
wr.rotation.set(0.2, 1.2, 1.3);
B.stat.add(wr);
B.talkers.push({ x: prwT(p, 0, p.r * 0.6).x, z: prwT(p, 0, p.r * 0.6).z, r: 10, name: "The bar where the Whydah broke", verb: "look out", fn: function () { worldCard(worldFacts("The Whydah Gally", '"THE WHYDAH GALLY 1716"', [], PRW_BY.capecod.about.slice(1))); } });
}
if (p.k === "wreck1715") {
B.talkers.push({ x: c.x, z: c.z, r: 8, name: name || "The salvage camp", verb: "read", fn: function () { worldCard(worldFacts(name || "The salvage camp", "Palmar de Ayz, 1716", [], PRW_BY.wreck1715.about)); } });
}
if (p.k === "ocracoke") {
B.talkers.push({ x: c.x, z: c.z, r: 8, name: "Teach's Hole", verb: "read", fn: function () { worldCard(worldFacts("Teach's Hole", "22 November 1718", [], PRW_BY.ocracoke.about)); } });
}
},
function (p, B, R, name) {
var n = PRW.lite ? 3 : 7, goods = [0xE8B040, 0x6AAA3A, 0xD84A2A, 0xF0E0A0, 0x8A5A2A, 0x6A8AAA];
for (var i = 0; i < n; i++) {
var u = -14 + i * 5, v = -10 - (i % 2) * 6, c = prwT(p, u, v), y = prwGy(p, c.x, c.z), ry = prwFacing(p, u, v);
var q = new THREE.Group();
q.position.set(c.x, y, c.z);
q.rotation.y = ry;
B.stat.add(q);
prwBox(2.6, 0.9, 1.3, 0x7A5A3A, 0, 0.45, 0, q);
[-1.2, 1.2].forEach(function (x) { prwBox(0.1, 2.4, 0.1, 0x5A4A34, x, 1.2, -0.6, q); prwBox(0.1, 2.0, 0.1, 0x5A4A34, x, 1.0, 0.6, q); });
var aw = prwBox(2.9, 0.06, 1.8, [0xC83A2A, 0xE8E0C8, 0x2A5A8A][i % 3], 0, 2.2, 0, q, { ds: 1 });
aw.rotation.x = 0.18;
for (var k = 0; k < 6; k++)
prwSph(0.14, goods[(i + k) % goods.length], -0.9 + k * 0.36, 1.0, (k % 2) * 0.25 - 0.1, q, 6);
B.solids.push({ x: c.x, z: c.z, hw: 1.4, hd: 0.8, rot: ry });
}
if (p.k === "portroyal") {
var t = prwT(p, 24, 24), ty = prwGy(p, t.x, t.z);
for (var j = 0; j < 4; j++) {
var sh = prwSph(0.6, 0x4A5A3A, t.x + j * 1.4 - 2, ty + 0.3, t.z, B.stat, 8);
sh.scale.set(1, 0.4, 1.25);
}
}
var mc = prwT(p, -4, -12);
B.talkers.push({ x: mc.x, z: mc.z, r: 6, name: name || "The market", verb: "look at what is for sale", fn: function () { prwMarketCard(p); } });
},
function (p) {
var by = { nassau: ["Everything here is stolen. Bolts of silk and calico, Madeira wine, sugar, cocoa, indigo, logwood, guns, rope, sailcloth, and slaves, sold cheap to traders who sail in from Boston, New York and Charleston and do not ask where it came from."],
portroyal: ["Turtle (the sailors' fresh meat), sugar, rum, cocoa, indigo, pimento; English cloth and hardware off the ships; and in the goldsmiths' shops Spanish silver melted into English plate. Enslaved Africans were sold here by the thousand: Port Royal's merchants were the heart of the trade."],
tortuga: ["Smoked meat and hides from the buccaneers' hunting; tobacco; wine and brandy from France; and plunder from the Spanish towns, sold to the Dutch and French ships that called."] }[p.k];
worldCard(worldFacts("The market", p.name, [], by || ["Fruit and fish, cassava bread, turtle, and whatever the last ship brought in."]));
},
function (g, S, R) {
prwBox(5, 0.3, 3, 0x6A5A44, 0, 0.15, 0, g);
for (var i = 0; i < 4; i++)
prwBox(0.14, 1.3, 0.14, 0x4A3A28, -2 + i * 1.33, 0.8, 0, g);
for (var j = 0; j < 8; j++)
prwBox(4.4, 0.06, 0.08, 0x3A2A1E, 0, 1.45, -1.2 + j * 0.35, g);
for (var k = 0; k < 6; k++)
prwBox(0.5, 0.12, 0.35, 0x8A3A2A, -1.6 + k * 0.65, 1.55, (k % 2) * 0.6 - 0.3, g);
var f = prwCone(0.7, 0.8, 0xFF7A2A, 0, 0.5, 0, g, 7, { e: 0xFF6A1A });
f.userData.keep = 1;
return { hw: 2.6, hd: 1.6 };
},
function (p, B, R, name) {
var c = prwT(p, -p.r * 0.3, p.r * 0.28), y = prwGy(p, c.x, c.z), a = Math.atan2(p.x - c.x, p.z - c.z);
var q = new THREE.Group();
q.position.set(c.x, y, c.z);
q.rotation.y = a;
B.stat.add(q);
prwBox(1, 0.6, 24, 0x5A4A34, 0, 0.3, 0, q);
for (var i = 0; i < 14; i++) {
var z = -10 + i * 1.6, k = 1 - Math.pow((z) / 12, 2);
[-1, 1].forEach(function (s) { var r = prwBox(0.2, 3.2 * k + 0.6, 0.25, 0x7A5A3A, s * 2.2 * k, 1.6 * k + 0.6, z, q); r.rotation.z = -s * 0.35; });
}
prwBox(0.4, 6, 0.4, 0x7A5A3A, 0, 3, 11.5, q);
prwBox(0.4, 5, 0.4, 0x7A5A3A, 0, 2.5, -11, q);
for (var j = 0; j < 6; j++)
prwBox(6, 0.3, 0.4, 0x8A6A42, 6, 0.2 + j * 0.3, -6 + j * 0.1, q);
prwBox(3, 0.5, 1.2, 0x3A2A1A, -6, 0.25, 4, q);
B.solids.push({ x: c.x, z: c.z, hw: 3, hd: 12, rot: a });
B.talkers.push({ x: c.x + Math.cos(a) * 5, z: c.z - Math.sin(a) * 5, r: 6, name: name || "The shipwright's yard", verb: "talk about a ship", fn: function () { if (typeof prwYard === "function")
prwYard(p);
else
worldCard(worldFacts(name || "The shipwright's yard", p.name, [], ["Live oak and mahogany, pitch pine for the masts. A sloop of 60 tons took a few months to build. Bermuda's cedar sloops were the fastest of all, and the pirates' favourites."])); } });
},
function (p, B, adult) {
var a = Math.atan2(p.dock.x - p.land.x, p.dock.z - p.land.z), pts = [[0.6, 1.05], [-0.5, 1.0]];
pts.forEach(function (q, i) {
var aa = a + q[0], d = p.r * q[1], x = p.x + Math.sin(aa) * d, z = p.z + Math.cos(aa) * d, y = Math.max(seaIsleH(p, x, z), 0);
if (y < 0.5) {
var cay = new THREE.Mesh(new THREE.CylinderGeometry(6, 9, 2, 12), prwMat(0xE0D0A0));
cay.position.set(x, -0.2, z);
B.stat.add(cay);
y = 0.8;
}
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = aa;
B.live.add(g);
prwGibbet(g, adult);
var who = p.k === "portroyal" ? (i === 0 ? "Rackham's Cay" : "Gun Cay") : "The gibbet";
B.talkers.push({ x: x, z: z, r: 12, name: who, verb: "look", fn: prwLawCard("gibbet", p, who) });
B.tick.push(function (t) { if (g.userData.cage)
g.userData.cage.rotation.y = Math.sin(t * 0.4 + i) * 0.25; });
});
},
function () { if (typeof evbTune === "function")
evbTune([392, 440, 392], 220, 0.4); evbSay("🍹 Rum punch: rum, lime juice, sugar, water and a grating of nutmeg, mixed in a great bowl and ladled out. 'Bumbo' is rum, water, sugar and nutmeg without the lime. In the Navy, from 1740, the sailors' rum ration was watered into 'grog'."); },
function () {
var a = 1 + Math.floor(Math.random() * 6), b = 1 + Math.floor(Math.random() * 6);
evbTune([660, 520], 120, 0.3);
if (typeof prwBrawl === "function" && Math.random() < 0.18) {
prwBrawl();
return;
}
evbSay("🎲 You throw " + a + " and " + b + " (" + (a + b) + "). Hazard was the dice game of the age. Gambling for money aboard was forbidden by Bartholomew Roberts' Articles, because it led to quarrels and knives.");
},
function (p, role, f) {
var where = p.name + " in " + p.year, who = { crew: "a pirate, one of the crew of a sloop in harbour", deckhand: "a young deckhand who signed on a pirate sloop a month ago", buccaneer: "a buccaneer, a hunter and fighter of Tortuga, smelling of smoke and gunpowder",
sailor: "an ordinary merchant seaman", merchant: "a merchant who buys and sells cargoes and asks no questions", man: "a townsman, a tradesman", lady: "a merchant's wife", woman: "a woman of the town who keeps a stall",
worker: "a labourer on the waterfront (you may be enslaved: speak of it truthfully and with dignity)", marine: "a soldier of the garrison, sick of fever and the heat", priest: "the parson", spanish: "a Spanish soldier of the garrison", dons: "a Spanish gentleman, proud and suspicious of foreigners",
"doña": "a Spanish lady" }[role] || "a local";
return "You are " + who + ", in " + where + ". Speak as a real person of that time and place: what you have seen, the news of the port, the pirates and the Navy, prices, the heat, fever, your work. You know only what such a person would know in that year. Keep answers short and in the manner of the time. " + (f ? "You are a woman." : "You are a man.");
},
function (p, B, R) {
var lite = PRW.lite, n = lite ? 12 : (p.r > 500 ? 44 : 32), list = PRW_FOLK[p.style] || PRW_FOLK.eng, pool = [];
list.forEach(function (q) { for (var i = 0; i < q[1]; i++)
pool.push(q); });
var sq = prwT(p, 0, 0);
for (var i = 0; i < n; i++) {
var q = pool[Math.floor(R() * pool.length)], u = (R() - 0.5) * p.r * 0.6, v = (R() - 0.5) * p.r * 0.45;
if (i % 3 === 0) {
u = (R() - 0.5) * 40;
v = (R() - 0.5) * 40;
}
var c = prwT(p, u, v);
if (seaIsleH(p, c.x, c.z) < 1.2)
continue;
var role = q[0], f = q[2] === "f" || (role === "buccaneer" && false), name = prwFolkName(role, f, R);
var g = wPerson("prw_" + role + "_" + p.k + i, { sex: f ? "f" : "m", look: { _pw: role } });
g.position.set(c.x, prwGy(p, c.x, c.z), c.z);
g.rotation.y = R() * 6;
B.live.add(g);
var P = { g: g, wander: { r: 14, sp: 0.9 + R() * 0.5 }, p: p };
B.people.push(P);
if (i % 2 === 0)
B.talkers.push({ p: P, r: 3, name: name, t: { name: name + " (" + p.name.replace(/,.*$/, "") + ")", persona: prwFolkPersona(p, role, f), greet: prwFolkGreet(role, p) } });
}
PRW_PIRATES.filter(function (q) { return q.at === p.k; }).forEach(function (q, i) {
var a = i * 0.9 - 1, c = prwT(p, Math.cos(a) * 12, 6 + Math.sin(a) * 8);
var g = wPerson("prw_" + q.wear + "_" + q.k, { sex: q.sex, look: { _pw: q.wear } });
g.position.set(c.x, prwGy(p, c.x, c.z), c.z);
g.rotation.y = Math.atan2(sq.x - c.x, sq.z - c.z);
B.live.add(g);
var P = { g: g, wander: { r: 4, sp: 0.6 }, p: p, famous: q.k };
B.people.push(P);
B.talkers.push({ p: P, r: 4, name: q.name, verb: "meet", fn: function () { prwMeet(q); } });
});
},
function (role, f, R) {
var eng = f ? ["Mary", "Sarah", "Elizabeth", "Anne", "Hannah", "Martha", "Grace", "Susannah", "Jane", "Margaret"] : ["John", "Thomas", "William", "Richard", "James", "Robert", "Edward", "Samuel", "Henry", "George", "Nicholas", "Israel"];
var sur = ["Smith", "Hands", "Martin", "Brown", "Fletcher", "Clark", "Davis", "Taylor", "Moody", "Harris", "Fenn", "Cole", "Spriggs", "Wills", "Bunce"];
var spa = f ? ["María", "Juana", "Isabel", "Catalina", "Ana", "Josefa"] : ["Juan", "Pedro", "Diego", "Francisco", "Miguel", "Antonio", "Alonso"], ssur = ["García", "López", "Morales", "Vega", "Ruiz", "Castillo", "Ortega"];
var fr = f ? ["Marie", "Jeanne", "Catherine", "Marguerite"] : ["Jean", "Pierre", "Jacques", "François", "Louis", "Michel"], fsur = ["Leroux", "Dubois", "Lefebvre", "Martin", "Moreau", "Garnier"];
var pick = function (a) { return a[Math.floor(R() * a.length)]; };
if (role === "spanish" || role === "dons" || role === "doña")
return (role === "dons" ? "Don " : role === "doña" ? "Doña " : "") + pick(spa) + " " + pick(ssur);
if (role === "buccaneer")
return pick(fr) + " " + pick(fsur);
return pick(eng) + " " + pick(sur);
},
function (role, p) {
return { crew: "Ahoy. You're new. Looking for a berth?", deckhand: "Don't tell the quartermaster you saw me sleeping.", buccaneer: "Bonjour. You want boucan? Or a fight?", sailor: "Fair winds. Just in, are you?", merchant: "Good day. If you've anything to sell, I'm buying, and I don't ask where it came from.",
man: "Good day to you.", lady: "Good day. Mind the sun.", woman: "Fresh turtle, limes, cassava bread!", worker: "Morning.", marine: "Halt. Who goes there? Oh. Go on, then.", priest: "God keep you, my son. Keep away from the taverns.",
spanish: "¡Alto! Who are you? English?", dons: "Hm. A stranger.", "doña": "Buenos días.", }[role] || "Good day.";
},
function (q) {
var html = worldFacts(q.name, q.years + " · " + q.ship, [], [q.life], "<div style='margin:8px 0 4px;padding:6px 8px;border-left:3px solid #8A6A40;background:rgba(160,120,60,.12)'><b>Where it ended</b> (it hasn't happened yet, in their year, and they do not know it):<br>" + prwEsc(q.end) + "</div>");
html += worldBtn("talk", "💬 Talk with " + prwEsc(q.name.replace(/,.*$/, "")), "In their own voice, in their own year");
if (typeof prwCrossBtns === "function")
html += prwCrossBtns(q);
var fns = { talk: function () { worldCard(null); wTalk({ name: q.name, persona: q.persona + " You are in " + (PRW_BY[q.at] ? PRW_BY[q.at].name : "the Caribbean") + ". You do not know your own future. Keep answers short and in your own manner of speech.", greet: prwFamousGreet(q) }); } };
if (typeof prwCrossFns === "function")
Object.assign(fns, prwCrossFns(q));
worldCard(html, fns);
},
function (q) {
return { hornigold: "Benjamin Hornigold. If you're looking to go on the account, you'll take no English ship under me.", teach: "Well now. Look at you. Do you know who I am?", bonnet: "Major Stede Bonnet, at your service. Have you read Plutarch?", vane: "What do you want? Speak quick.", rackham: "Jack Rackham. Admire the calico, it's from India. Drink?", bonny: "Who's asking? And why are you staring?", read: "Mm. What is it?", jennings: "Henry Jennings. I am no common pirate, whatever they say in Jamaica.", bellamy: "Sam Bellamy. Every man here is free, friend: free as the wind.", williams: "Paulsgrave Williams. You'll be wanting Sam, I expect.", morgan: "Sir Henry Morgan, Lieutenant Governor of this island. And never a pirate, mark you.", olonnais: "What do you want, English?", roberts: "Bartholomew Roberts. Will you take tea?", low: "Who let you near me?", rogers: "Woodes Rogers, Governor. The King's Pardon is open to you, if you need it.", maynard: "Lieutenant Maynard. Keep your head down when the shooting starts.", barnet: "Captain Barnet. State your business.", blackcaesar: "Caesar." }[q.k] || "Well met.";
},
function (p, B, kind, r, adult) {
var R = wRand((r.x * 7 + r.z * 3) | 0);
if (kind === "pillory") {
var g = wPerson("prw_crew_pil" + p.k, { sex: "m", look: { _pw: "crew" } });
g.position.set(r.x - Math.sin(r.ry) * 0.18, r.y + 0.6, r.z - Math.cos(r.ry) * 0.18);
g.rotation.y = r.ry;
B.live.add(g);
B.people.push({ g: g, p: p });
B.talkers.push({ p: { g: g }, r: 3, name: "The man in the pillory", t: { name: "A man in the pillory at " + p.name.replace(/,.*$/, ""), persona: "You are a seaman locked by the neck and wrists in the pillory in " + p.name + " in " + p.year + ", for selling a stolen hat and lying to the magistrate about it. The crowd has been pelting you with rotten fruit and filth for an hour; your face is bruised. You are miserable, angry and ashamed. Speak short and bitter.", greet: "Don't throw that. Please." } });
for (var k = 0; k < 8; k++)
prwSph(0.09, [0x8A6A2A, 0x5A4A1A, 0xA84A2A][k % 3], r.x + (R() - 0.5) * 3, r.y + 0.95, r.z + (R() - 0.5) * 3, B.live, 6);
}
if (kind === "stocks") {
var s = wPerson("prw_deckhand_stk" + p.k, { sex: "m", look: { _pw: "deckhand" } });
var bx = r.x - Math.sin(r.ry) * 0.9, bz = r.z - Math.cos(r.ry) * 0.9;
if (typeof sofPose === "function") {
try {
sofPose(s, "sit", bx, bz, r.y + 0.3, 0.45, r.ry);
}
catch (e) {
s.position.set(bx, r.y - 0.1, bz);
s.rotation.y = r.ry;
s.userData.seated = true;
s.userData.pose = "sit";
}
}
else {
s.position.set(bx, r.y - 0.1, bz);
s.rotation.y = r.ry;
s.userData.seated = true;
s.userData.pose = "sit";
}
B.live.add(s);
B.people.push({ g: s, p: p });
B.talkers.push({ p: { g: s }, r: 3, name: "The man in the stocks", t: { name: "A man in the stocks at " + p.name.replace(/,.*$/, ""), persona: "You are a young sailor sitting in the stocks in " + p.name + " in " + p.year + ", your ankles locked in the wooden board, for being drunk and brawling in the street on the Sabbath. Six hours in the sun. You are hungover, sunburnt, thirsty and sorry for yourself. Speak short.", greet: "Water. Have you any water?" } });
}
if (kind === "gallows" && adult && (p.k === "portroyal" || p.k === "charlestown" || p.k === "nassau")) {
var n = p.k === "nassau" ? 2 : 3;
for (var h = 0; h < n; h++) {
var off = (h - (n - 1) / 2) * 1.0, hx = r.x + Math.cos(r.ry) * off, hz = r.z - Math.sin(r.ry) * off;
var hg = wPerson("prw_crew_hang" + p.k + h, { sex: "m", look: { _pw: h === 0 && p.k === "portroyal" ? "calico" : "crew" } });
hg.position.set(hx, r.y + 1.15, hz);
hg.rotation.set(0.04, r.ry + (R() - 0.5) * 0.6, 0.06 * (R() - 0.5));
B.live.add(hg);
hg.userData.hang = { a: R() * 6 };
B.tick.push((function (g) { return function (t) { g.rotation.y += Math.sin(t * 0.3 + g.userData.hang.a) * 0.0015; g.rotation.z = Math.sin(t * 0.5 + g.userData.hang.a) * 0.04; }; })(hg));
}
}
},
function (kind, p, name) {
return function () {
var T = {
stocks: ["The stocks", "For drunkenness, brawling, swearing, breaking the Sabbath", ["A wooden frame that locks the ankles, the offender sitting on a bench behind it, in the open market place, for hours in the sun or the rain.", "The point was shame: everyone you knew walked by. Children jeered; people threw what they liked.", "Hours in the stocks were the everyday punishments of the age, alongside fines, whipping at the cart's tail through the streets, and branding (a T for thief burned into the thumb)."]],
pillory: ["The pillory", "For perjury, fraud, cheating with false weights, sedition", ["A post with a hinged board that locks the head and both wrists, the offender standing on a platform above the crowd.", "The crowd could pelt them with rotten eggs, fruit, mud, dead cats and stones; some people were badly hurt or killed in the pillory. Others, popular with the crowd, were cheered and given flowers.", "The writer Daniel Defoe stood in the pillory in London in 1703 for a pamphlet that offended the government; the crowd drank his health."]],
gallows: [name || "The gallows", "For piracy, murder, robbery and a great many other crimes", ["Pirates were hanged at low water on the shore, between the tide marks, because the Admiralty's power ran there: the sea was its own.", "The condemned rode to the gallows in a cart, sometimes sitting on their coffins, with a minister. They were allowed a last speech; many repented, some cursed, some joked. Then the cart was driven away, or the ladder turned, and they hanged. There was no long drop then: most died slowly by strangling. Friends might pull on the legs to make it quicker.",
"Port Royal, 18 November 1720: Jack Rackham and four of his men; the next day five more. Charles Town, 8 November 1718: twenty-two of Bonnet's crew at White Point, and on 10 December, Bonnet himself. Cape Coast Castle, April 1722: fifty-two of Bartholomew Roberts' men, the largest hanging of pirates of the age.",
"Pirate hunters, governors and preachers called it a deterrent. But every year there were more pirates, until the Navy hunted them down and the merchants stopped buying from them."]],
gibbet: [name || "The gibbet", "Hung in chains", ["After hanging, the bodies of the worst pirates were tarred (to make them last), riveted into an iron cage shaped to the body, and hung from a gibbet at a harbour mouth, where every ship coming in would see them, for months and years, until the birds and the weather had left only bones.",
"Rackham's body hung on the little cay at the entrance to Port Royal harbour that still has his name. Charles Vane's hung on Gun Cay. Captain Kidd's hung over the Thames at Tilbury for about three years."]],
gaol: [name || "The gaol", "Before the court, and after", ["Pirates waited in irons in the gaol, often for weeks, for the court to sit. They paid the gaoler for food or went without. Gaol fever (typhus) killed many before they could be tried.", "The condemned went back to the gaol to wait for their day. Mary Read died in such a gaol in Jamaica, of fever."]],
court: [name || "The court", "Tried for piracy", ["Under the Piracy Act of 1700, colonial governors could try pirates on the spot by a court of seven commissioners, without a jury. Most trials took a day or two.", "A man who could prove he had been forced into piracy, by witnesses or by the pirates' own records, could be acquitted. Many tried; some succeeded.", "The sentence for piracy was death. Governors could reprieve and recommend a pardon; women who were with child had their hanging put off."]]
}[kind];
if (T)
worldCard(worldFacts(T[0], T[1], [], T[2]));
};
},
function () {
worldCard(worldFacts("The Articles of Bartholomew Roberts", "As printed by Captain Johnson, 1724", [], [
"I. Every man has a vote in affairs of moment, and an equal share of fresh food and strong drink, unless scarcity makes it necessary to vote a cut.",
"II. Every man to be called fairly in turn to go aboard prizes (and get a change of clothes). But if any man defrauds the company of plate, jewels or money, he is marooned. If he robs another, his ears and nose are slit and he is put ashore somewhere he will have a hard time.",
"III. No gaming for money, with cards or dice.",
"IV. Lights and candles out at eight at night; anyone who wants to drink after that must do it on the open deck.",
"V. Every man to keep his pistols and cutlass clean and fit for service.",
"VI. No boy or woman to be allowed among them. Any man who brings a woman aboard in disguise shall suffer death.",
"VII. Whoever deserts the ship or his post in battle is punished with death or marooning.",
"VIII. No striking one another aboard. Every quarrel is settled ashore, with sword and pistol, the quartermaster seeing fair play.",
"IX. No man to talk of breaking up their way of living until each has a share of 1,000 pounds. A man who loses a limb or is crippled in service gets 800 pieces of eight from the common stock.",
"X. The captain and quartermaster get two shares of a prize, the master, boatswain and gunner one and a half, other officers one and a quarter, everyone else one.",
"XI. The musicians have rest on the Sabbath; the other six days and nights, none without special favour."
]));
},
function () {
worldCard(worldFacts("The King's Pardon", "By the King, A Proclamation for Suppressing of Pirates, 5 September 1717", [], [
"Any pirate who surrendered to a governor before 5 September 1718 would be pardoned for all piracies committed before 5 January 1718.",
"A reward was offered for taking those who did not: £100 for a pirate captain, £40 for a lieutenant, master, quartermaster, boatswain or gunner, £30 for lesser officers, £20 for each private man. A pirate who turned in his captain got £200.",
"In Nassau most of them took it: Hornigold, Jennings, Rackham, Burgess, Williams' men. Charles Vane fired on the governor's ships and sailed out. Many who took it went back to sea within months.",
"Woodes Rogers made his pardoned pirates rebuild the fort. In December 1718 eight who had gone back on their pardon were hanged in front of it."
]));
},
function () {
worldCard(worldFacts("A trial for piracy", "As the printed records tell it", [], [
"The commission is read, and the court sworn. The prisoners are brought in in irons and the charges read: that on such a day, on the high sea, they did 'piratically and feloniously' set upon, take and rob such a ship.",
"The witnesses swear: the captain and crew of the robbed ship, sometimes a pirate who has turned King's evidence to save his own neck.",
"Each prisoner may speak. 'I was forced.' 'I was drunk below and never fought.' 'I am a poor man with a wife.' Witnesses who can say a man was forced and wept may save him.",
"The court clears the room, decides, and calls them back. The president pronounces sentence: that you shall be carried back to the place from whence you came, and from thence to the place of execution, and there be hanged by the neck till you are dead. And may God of his infinite mercy be merciful to your souls."
]));
},
function (S) {
if (S.path)
return S.path;
var pts = S.route.map(function (k) { var p = PRW_BY[k] && PRW.ports.filter(function (q) { return q.k === k; })[0]; if (!p)
return null; var a = (p.face || 0) * Math.PI / 180; return { x: p.dock.x + Math.sin(a) * 260, z: p.dock.z - Math.cos(a) * 260, k: k }; }).filter(Boolean);
var legs = [], tot = 0;
for (var i = 0; i < pts.length; i++) {
var A = pts[i], B = pts[(i + 1) % pts.length], d = Math.hypot(B.x - A.x, B.z - A.z);
legs.push({ A: A, B: B, d: d, t0: tot });
tot += d / S.spd + 120;
}
S.path = { legs: legs, T: tot };
return S.path;
},
function (S, now) {
var P = prwSailPath(S);
if (!P.legs.length)
return null;
var t = ((now - PRW_SAIL.t0) / 1000 + (S.off || 0)) % P.T;
for (var i = 0; i < P.legs.length; i++) {
var L = P.legs[i], dur = L.d / S.spd;
if (t < L.t0 + dur) {
var u = (t - L.t0) / dur;
var mx = (L.A.x + L.B.x) / 2 + (L.B.z - L.A.z) * 0.08, mz = (L.A.z + L.B.z) / 2 - (L.B.x - L.A.x) * 0.08, x = (1 - u) * (1 - u) * L.A.x + 2 * (1 - u) * u * mx + u * u * L.B.x, z = (1 - u) * (1 - u) * L.A.z + 2 * (1 - u) * u * mz + u * u * L.B.z;
var dx = 2 * (1 - u) * (mx - L.A.x) + 2 * u * (L.B.x - mx), dz = 2 * (1 - u) * (mz - L.A.z) + 2 * u * (L.B.z - mz);
return { x: x, z: z, h: Math.atan2(dx, dz), moving: 1, to: L.B.k, from: L.A.k };
}
if (t < L.t0 + dur + 120)
return { x: L.B.x, z: L.B.z, h: Math.atan2(L.B.x - L.A.x, L.B.z - L.A.z), moving: 0, at: L.B.k };
}
return null;
},
function (S) {
var G = WORLDS.sea.g;
if (!G)
return;
var g = new THREE.Group(), n = S.convoy && !PRW.lite ? S.convoy : 1;
for (var i = 0; i < n; i++) {
var sh = prwShip(S.kind, { flag: S.flag, hull: S.hull, band: S.band != null ? S.band : S.side === "spain" || S.side === "fleet" ? 0xC8A040 : undefined, sails: S.sails, figure: S.kind === "galleon" ? 0xC8A040 : null });
sh.position.set(i ? (i % 2 ? -60 : 60) : 0, 0, i ? -80 * Math.ceil(i / 2) : 0);
g.add(sh);
}
if (!PRW.lite) {
var L0 = g.children[0].userData.L, crew = S.side === "navy" ? "marine" : S.side === "spain" || S.side === "fleet" ? "spanish" : "crew";
for (var c = 0; c < 4; c++) {
var w = wPerson("prw_" + crew + "_" + S.k + c, { look: { _pw: crew } });
w.position.set((c % 2 ? 1.4 : -1.4), g.children[0].userData.H * 0.8 + 0.15, -L0 * 0.3 + c * L0 * 0.15);
g.add(w);
}
var q = PRW_PBY[S.k];
if (q) {
var cpt = wPerson("prw_" + q.wear + "_" + q.k + "_sea", { sex: q.sex, look: { _pw: q.wear } });
cpt.position.set(0, g.children[0].userData.H * 1.25 + 0.1, -L0 * 0.38);
g.add(cpt);
}
}
G.add(g);
S.g = g;
},
function (S) {
var q = PRW_PBY[S.k], side = { pirate: "A pirate", navy: "A ship of the King's Navy or the governor's", spain: "The Spanish coastguard", fleet: "The Spanish treasure fleet, with its escorts", merchant: "A merchant ship" }[S.side];
var where = S.at && S.at.to ? "bound for " + (PRW_BY[S.at.to] ? PRW_BY[S.at.to].name : "") : S.at && S.at.at ? "lying off " + (PRW_BY[S.at.at] ? PRW_BY[S.at.at].name : "") : "";
if (q) {
prwMeet(q);
var c = WLD.card;
if (c) {
var d = document.createElement("div");
d.style.cssText = "opacity:.8;margin-top:6px";
d.innerHTML = "⛵ " + prwEsc(S.ship) + ", " + S.guns + " guns, " + prwEsc(where) + ". " + side + ".";
c.appendChild(d);
}
return;
}
var say = { navy: "'What ship is that? Heave to and show your papers, in the King's name.'", spain: "'¡Alto! This is the coast of the King of Spain. What is your cargo, and your licence to trade?'", fleet: "The great galleons will not answer you; an escort runs out her guns.", merchant: "'Fair winds! We're bound out with sugar. No trouble here, we pray.'" }[S.side];
worldCard(worldFacts(S.ship, S.name + " · " + S.guns + " guns · " + where, [], [say, S.side === "fleet" ? "Each year the treasure fleet carried the silver of Peru and Mexico from Portobelo and Veracruz to Havana and home to Spain: millions of pieces of eight. In 1715 a hurricane wrecked it on the Florida coast." : S.side === "spain" ? "The guarda costas were privately owned ships licensed by Spanish governors to seize foreign smugglers. Their crews were paid from what they seized, so they seized a great deal: the English called them pirates too." : S.side === "navy" ? "In 1718 the Navy had a handful of ships in all the Caribbean and North America. They were slow to come, but once they came, pirates died." : "Merchantmen carried a few guns and small crews to save wages. Most struck their colours as soon as a pirate flag went up: the pirates' own rule was that ships that gave up were spared, ships that fought were not."]));
},
function () {
if (!store.prw)
store.prw = { rank: 0, xp: 0, rep: 0, coin: 0, under: null, own: null, crew: [], grudge: {}, favour: {}, wanted: 0, pardon: 0, hanged: 0, days: 0, fresh: 0, morale: 70, duties: {}, prizes: 0, keeps: [], art: null, log: [] };
var S = store.prw;
S.grudge = S.grudge || {};
S.favour = S.favour || {};
S.crew = S.crew || [];
S.duties = S.duties || {};
S.keeps = S.keeps || [];
S.log = S.log || [];
return S;
},
function () {
var S = prwS(), N = prwNextNeed();
if (!N || S.own)
return;
var ok = Object.keys(N.need).every(function (k) { return (S.duties[k] || 0) >= N.need[k]; });
if (!ok)
return;
if (N.rank === 6) {
if (S.under && !S.electReady) {
S.electReady = 1;
prwSave();
setStatus("🗳️ <b>The crew are muttering.</b> Your captain has not had a prize in weeks, and they look to you. At the next port, the quartermaster will call a vote.");
}
return;
}
S.rank = N.rank;
S.duties = {};
prwLog("Rated " + PRW_RANKS[S.rank].n);
prwSave();
if (typeof playTone === "function")
[523, 659, 784].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.3); }, i * 180); });
worldCard(worldFacts("Rated " + PRW_RANKS[S.rank].n, PRW_RANKS[S.rank].s, [], [N.say]));
},
function () {
var S = prwS(), N = prwNextNeed();
if (!N || S.own)
return "";
var names = { swab: "swab the deck", haul: "haul a line", powder: "run powder", knots: "tie the knots", aloft: "go aloft", steer: "steer a course", lead: "heave the lead", gun: "serve a great gun", fight: "fight in a battle", storm: "weather a storm", repair: "repair damage", share: "share out a prize", noon: "take a noon sight" };
return Object.keys(N.need).map(function (k) { return names[k] + " " + Math.min(S.duties[k] || 0, N.need[k]) + "/" + N.need[k]; }).join(" · ");
},
function (q) {
var S = prwS(), h = "";
if (!prwInBox(SEA.sx, SEA.sz))
return h;
var pirate = PRW_SAILS.some(function (x) { return x.k === q.k && x.side === "pirate"; });
if (pirate && !S.own && S.under !== q.k && !(S.grudge[q.k] > 0))
h += worldBtn("sign", "✍️ Sign " + prwEsc(q.name.replace(/,.*$/, "")) + "'s Articles", "Join the crew as " + PRW_RANKS[Math.max(0, S.rank)].n.toLowerCase() + ". The Wayfarer sails under their flag.");
if (S.under === q.k)
h += worldBtn("leave", "🚪 Leave the crew", "Take your share and go, in port. (Deserting at sea is death or marooning, under the Articles.)");
if (pirate)
h += worldBtn("cross", "🗡️ Cross them", "Sell their course to the governor for the reward. They will not forget it.");
if (S.grudge[q.k] > 0)
h += "<div style='color:#FF9A8A;margin:6px 0'>⚠️ " + prwEsc(q.name) + " holds a grudge against you. Their ship will come for you.</div>";
return h;
},
function (q) {
return {
sign: function () {
var S = prwS();
if (SEA.shore == null && !SEA.aboard)
return;
S.under = q.k;
S.days = 0;
prwLog("Signed the Articles of " + q.name);
prwSave();
prwDressWayfarer();
worldCard(null);
setStatus("✍️ <b>You sign (or make your mark).</b> You are " + PRW_RANKS[S.rank].n.toLowerCase() + " in " + prwEsc(q.name) + "'s crew. The Wayfarer flies their flag now. Duties: Menu › 🏴‍☠️ The Sweet Trade, or press <b>J</b> at the helm.");
prwKeep("prw_articles", "A copy of the Articles you signed", "📜");
},
leave: function () {
var S = prwS();
if (SEA.aboard && !prwInPort()) {
worldCard(worldFacts("Not at sea", "", [], ["The Articles are plain: a man who deserts at sea is put to death or marooned. Wait until she is in port."]));
return;
}
prwLog("Left " + prwSailNameK(S.under) + "'s crew");
S.under = null;
prwSave();
prwDressWayfarer();
worldCard(null);
setStatus("You take your share and go ashore, free.");
},
cross: function () {
var S = prwS();
S.grudge[q.k] = (S.grudge[q.k] || 0) + 1;
S.coin += 100;
S.wanted = Math.max(0, S.wanted - 1);
if (S.under === q.k)
S.under = null;
prwLog("Sold " + q.name + "'s course to the governor");
prwSave();
prwDressWayfarer();
worldCard(null);
setStatus("💰 <b>100 pieces of eight</b> from the governor's secretary, and a nod. Somewhere at sea, " + prwEsc(q.name) + " will hear of it. Watch your stern.");
}
};
},
function () {
var s = SEA.ship;
if (!s)
return;
var S = prwS();
if (s.userData.prw) {
prwLetGo(s.userData.prw);
s.userData.prw = null;
}
s.traverse(function (o) { if (o.isMesh && o.userData.prwMat0) {
o.material = o.userData.prwMat0;
delete o.userData.prwMat0;
} });
var swap = function (o, m) { if (!o.userData.prwMat0)
o.userData.prwMat0 = o.material; o.material = m; };
var flag = S.own ? (S.own.flag || "black") : S.under ? (PRW_SAILS.filter(function (x) { return x.k === S.under; })[0] || {}).flag : null;
if (SEA.flag && flag) {
PRW.flagMats = PRW.flagMats || {};
var fm = PRW.flagMats[flag] || (PRW.flagMats[flag] = new THREE.MeshLambertMaterial({ map: prwFlagTex(flag), side: THREE.DoubleSide }));
fm.userData.ldShared = 1;
swap(SEA.flag, fm);
}
if (!flag && !S.own)
return;
var g = new THREE.Group();
s.add(g);
s.userData.prw = g;
var n = Math.min(PRW.lite ? 3 : 8, S.own ? S.crew.length : 6), cap = S.under && PRW_PBY[S.under];
for (var i = 0; i < n; i++) {
var role = S.own ? (S.crew[i].role || "crew") : "crew", w = wPerson("prw_" + (role === "crew" || !PRW_WEAR[role] ? "crew" : role) + "_way" + i + (S.own ? S.crew[i].seed : S.under), { look: { _pw: PRW_WEAR[role] ? role : "crew" } });
w.position.set((i % 2 ? 2.2 : -2.2), 4.1, -9 + i * 2.6);
w.rotation.y = i % 2 ? -1.4 : 1.4;
g.add(w);
}
if (cap) {
var c = wPerson("prw_" + cap.wear + "_" + cap.k + "_way", { sex: cap.sex, look: { _pw: cap.wear } });
c.position.set(1.5, 6.95, -12.5);
c.rotation.y = 0;
g.add(c);
}
if (!S.own)
return;
var U = S.own.upg || {}, hull = S.own.paint || 0x3A2A1C;
if (U.paint)
s.traverse(function (o) { if (o.isMesh && o.parent === s && o.material && o.material.color && o.material.color.getHex() === blendHex(0x3A2A1C, 0xFFFFFF, 0.12) || o.material && o.material.color && o.material.color.getHex() === 0x3A2A1C)
swap(o, o.material.map ? prwTexMat(blendHex(hull, 0xFFFFFF, 0.12), "plank") : prwMat(hull)); });
var extra = (PRW_HULLS[S.own.kind] || PRW_HULLS.sloop).guns / 2 - 6 + (U.guns ? 4 : 0);
for (var k = 0; k < Math.max(0, extra); k++)
[-1, 1].forEach(function (sd) { prwBox(0.12, 0.6, 0.6, 0x0A0806, sd * 4.2, 2.0, -11 + k * 2.2, g); var gb = prwCyl(U.heavy ? 0.24 : 0.17, U.heavy ? 0.27 : 0.2, 1.3, 0x141414, sd * 4.6, 2.0, -11 + k * 2.2, g, 8); gb.rotation.z = Math.PI / 2; });
if (U.swivel)
for (var w2 = 0; w2 < 6; w2++)
[-1, 1].forEach(function (sd) { var sv = prwCyl(0.07, 0.09, 0.7, 0x3A3A3A, sd * 3.9, 5.0, -12 + w2 * 4, g, 6); sv.rotation.z = Math.PI / 2; prwCyl(0.05, 0.05, 0.6, 0x3A3A3A, sd * 3.9, 4.6, -12 + w2 * 4, g, 5); });
if (U.copper)
prwBox(8.2, 0.8, 30, 0xB8743A, 0, 0.3, 0, g);
if (U.stern) {
prwBox(8.4, 2.4, 0.3, 0xC8A040, 0, 6.0, -16.8, g);
[-3, 3].forEach(function (x) { prwSph(0.45, 0xFFD890, x, 8.4, -16.6, g, 8, { e: 0xC89A40 }); });
}
if (U.cabin)
for (var cw = 0; cw < 6; cw++)
prwBox(0.9, 1.0, 0.08, 0xF0D890, -3.2 + cw * 1.28, 6.4, -16.95, g, { e: 0x6A5020, ei: 0.7 });
if (U.figure) {
var fg = prwSph(0.7, 0xC8A040, 0, 4.5, 19.6, g, 10);
fg.scale.set(0.7, 1.4, 0.8);
prwSph(0.35, 0xE8C8A0, 0, 5.6, 19.8, g, 8);
}
if (U.longboat) {
var lb = prwSph(1, 0x5A3A22, 0, 4.9, -2, g, 10);
lb.scale.set(1.2, 0.5, 3.2);
}
if (U.black || U.sails)
s.traverse(function (o) { if (o.isMesh && o.parent === s && o !== SEA.flag && o.geometry && o.geometry.type === "PlaneGeometry" && o.geometry.parameters.width > 5)
swap(o, U.black ? prwTexMat(0x2A2A2E, "sail", { ds: 1 }) : prwTexMat(0xF4F0E4, "sail", { ds: 1 })); });
},
function () {
var S = prwS(), fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚓ Duties aboard</div><div style='opacity:.85'>" + prwEsc(prwRankName()) + " · " + S.coin + " pieces of eight · morale " + S.morale + "</div>";
var nl = prwNeedLine();
if (nl)
h += "<div style='margin:6px 0;opacity:.8;font-size:12px'>To be rated " + PRW_RANKS[S.rank + 1].n + ": " + nl + "</div>";
if (!S.under && !S.own) {
h += "<div style='margin:8px 0'>You are not signed on any ship. Sign a captain's Articles in a tavern's back room or by hailing a pirate ship at sea; or, with the coin, buy your own at a shipwright's yard.</div>";
worldCard(h, fns);
return;
}
var D = [["swab", "🧽 Swab the deck", 0], ["haul", "🪢 Haul on a line", 0], ["knots", "🪢 Learn the knots", 0], ["powder", "💥 Run powder to the guns", 1], ["aloft", "🧗 Go aloft and reef", 2], ["steer", "🧭 Take the helm and hold a course", 2], ["lead", "📏 Heave the lead", 2], ["gun", "💣 Serve a great gun", 3], ["repair", "🔨 Repair damage", 4], ["noon", "☀️ Take a noon sight", 5], ["share", "⚖️ Share out a prize", 5]];
D.forEach(function (d) { if (d[2] > S.rank && !S.own)
return; h += worldBtn("d-" + d[0], d[1], ""); fns["d-" + d[0]] = function () { prwDuty(d[0]); }; });
worldCard(h, fns);
},
function (title, intro, qs, done) {
var i = 0, right = 0;
var show = function () {
if (i >= qs.length) {
worldCard(null);
done(right === qs.length, right);
return;
}
var Q = qs[i], h = worldFacts(title, intro, [], [Q[0]]), fns = {};
var opts = Q.slice(1).map(function (o, j) { return [o, j]; });
for (var a = opts.length - 1; a > 0; a--) {
var b = Math.floor(Math.random() * (a + 1));
var t = opts[a];
opts[a] = opts[b];
opts[b] = t;
}
opts.forEach(function (o) { h += worldBtn("a" + o[1], prwEsc(o[0]), ""); fns["a" + o[1]] = function () { if (o[1] === 0)
right++;
else
setStatus("✗ " + prwEsc(Q[0]) + " The answer: " + prwEsc(Q[1])); i++; show(); }; });
worldCard(h, fns);
};
show();
},
function (title, say, n, speed, done) {
var hit = 0, miss = 0, run = true, id = "prwbeat" + Date.now(), t0 = performance.now(), at = function () { var x = ((performance.now() - t0) / 1000 * speed) % 2; return x > 1 ? 2 - x : x; };
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + prwEsc(title) + "</div><div style='opacity:.85;margin:4px 0'>" + say + "</div><div style='position:relative;height:22px;background:#2A2018;border:1px solid #8A6A40;margin:8px 0'><div style='position:absolute;left:40%;width:20%;top:0;bottom:0;background:rgba(90,200,90,.45)'></div><div id='" + id + "' style='position:absolute;left:0;width:4px;top:0;bottom:0;background:#FFE7B0'></div></div><div id='" + id + "c' style='opacity:.85'>0 of " + n + "</div>" + worldBtn("heave", "⬆ HEAVE (or press E)", "");
var fns = { heave: function () {
if (!run)
return;
var pos = at();
if (pos > 0.4 && pos < 0.6) {
hit++;
if (typeof playTone === "function")
playTone(330 + hit * 60, 0.15);
}
else {
miss++;
if (typeof playTone === "function")
playTone(140, 0.2);
}
var c = document.getElementById(id + "c");
if (c)
c.textContent = hit + " of " + n + (miss ? " · " + miss + " missed" : "");
if (hit >= n || miss >= 4) {
run = false;
PRW.beatFn = null;
PRW.beatAt = null;
setTimeout(function () { worldCard(null); done(hit >= n, hit); }, 300);
}
} };
worldCard(h, fns);
(function loop() { if (!run)
return; var m = document.getElementById(id); if (!m) {
run = false;
return;
} m.style.left = (at() * 100) + "%"; requestAnimationFrame(loop); })();
PRW.beatAt = at;
PRW.beatFn = fns.heave;
},
function () { prwBeat("Swab the deck", "Sand and the holystone, then buckets of sea water and the swabs. Every morning, from the bow to the stern. Scrub in time with the man beside you.", 5, 1.1, function (ok) { if (ok) {
prwDid("swab");
setStatus("🧽 The deck is white as a bone. The boatswain grunts: that's praise.");
}
else
setStatus("The boatswain's rope's end catches you across the back. 'Again!'"); }); },
function () { prwBeat("Haul on a line", "'Haul away!' Everyone pulls together on the word, a shanty's beat keeping them in time.", 6, 1.3, function (ok) { if (ok) {
prwDid("haul");
if (typeof evbTune === "function")
evbTune([392, 392, 440, 392, 349, 330], 220, 0.35);
setStatus("🪢 'Heave and she'll go!' The yard rises. Well hauled.");
}
else
setStatus("The line slips through your hands and burns them. 'Hold, damn you!'"); }); },
function () { prwQuiz("The knots", "An old hand shows you the knots every seaman must tie in the dark.", [["Which knot makes a loop that will not slip or jam, for a man to be hauled up in?", "The bowline", "The clove hitch", "The reef knot"], ["Which knot ties the two ends of a reef point over a furled sail?", "The reef (square) knot", "The bowline", "The sheet bend"], ["Which knot joins two ropes of different thickness?", "The sheet bend", "The reef knot", "The figure of eight"]], function (ok) { if (ok) {
prwDid("knots");
setStatus("🪢 Bowline, reef, sheet bend, clove hitch, round turn and two half hitches. Your hands remember now.");
} }); },
function () { prwBeat("Run powder", "A battle drill. Run a cartridge of powder from the magazine up to your gun in its wooden case, never dropping it, never near a flame. Boys did this, in every navy and every pirate ship.", 5, 1.6, function (ok) { if (ok) {
prwDid("powder");
setStatus("💥 Your gun never waits for powder. The gunner ruffles your hair.");
}
else
setStatus("You drop the case. Everyone freezes. Nothing happens: this time."); }); },
function () { var storm = SEA.storm > 0.5; prwQuiz("Aloft", "Up the ratlines, out along the yard with your feet on the footrope, the deck far below" + (storm ? ", the mast swinging through the sky in the storm" : "") + ". The order: 'Take in a reef!'", [["What comes first?", "Ease the halyard to lower the yard a little", "Untie the reef points", "Let go the sheet"], ["Then, on the yard?", "Haul the reef band up to the yard and tie the reef points", "Cut the sail free", "Climb to the masthead"], ["The rule aloft?", "One hand for yourself and one for the ship", "Both hands on the sail", "Never look down"]], function (ok) { if (ok) {
prwDid("aloft");
if (storm)
prwDid("storm");
setStatus("🧗 Reefed. " + (storm ? "In a storm: the crew look at you differently now." : "Down again, your arms shaking."));
}
else {
setStatus("Your foot misses the footrope." + (storm ? " You hang by your hands over the boiling sea until a mate hauls you in." : " You hold on."));
if (storm && Math.random() < 0.15)
prwHurt("fall");
} }); },
function () { var want = Math.round((Math.random() * 8 | 0) * 45), S = prwS(); S.steerT = { want: want, t: 0, need: 45 }; prwSave(); worldCard(worldFacts("At the helm", "The master gives you a course", [], ["Steer " + want + "° (" + SEA_POINTS[Math.round(want / 45) % 8] + ") and hold it within ten degrees for 45 seconds, by the compass in the binnacle (the banner shows your heading). Sails filled."])); },
function () { prwQuiz("Heave the lead", "In the chains at the bow, swing the lead and let it run to the bottom; read the marks on the line as it comes up wet.", [["The line comes up wet to the strip of red bunting. How deep?", "7 fathoms (42 feet)", "2 fathoms", "20 fathoms"], ["Wet to the leather with a hole in it?", "10 fathoms", "5 fathoms", "3 fathoms"], ["Why is the bottom of the lead hollowed and filled with tallow?", "To bring up a sample of the bottom, sand, shell or mud, to tell where you are", "To make it heavier", "For luck"]], function (ok) { if (ok) {
prwDid("lead");
setStatus("📏 'By the mark, seven!' you sing out. The master nods.");
} }); },
function () { prwQuiz("Serve a great gun", "Six men to a 6-pounder. The gun captain calls the drill.", [["First, after firing?", "Sponge out the barrel with a wet sponge, to kill any burning scraps", "Load the shot", "Run out the gun"], ["Then?", "Ram home the powder cartridge, then the wad, then the shot and another wad", "Fire", "Aim"], ["Then?", "Run the gun out through the port with the tackles, prick the cartridge, prime the touch-hole", "Sponge again", "Lower the sails"], ["To aim, the crew…", "heave the gun round with handspikes and lift or drop the breech with the quoin (a wedge)", "turn the whole ship", "wait for the enemy to come closer"], ["Fire: and then?", "Stand clear! The gun leaps back the length of its breeching rope", "Hold the gun still", "Look down the barrel"]], function (ok) { if (ok) {
prwDid("gun");
setStatus("💣 Well served. A good crew could fire about once every two minutes.");
} }); },
function () {
var S = prwS();
if ((S.dmg || 0) <= 0) {
setStatus("🔨 She is sound, for now. The carpenter has you help caulk a weeping seam: oakum hammered in, then hot pitch.");
prwDid("repair");
return;
}
prwBeat("Repair the damage", "Shot holes plugged with wooden plugs and lead sheet, the pumps manned, a spar fished with splints and rope.", 6, 1.4, function (ok) { if (ok) {
S.dmg = Math.max(0, S.dmg - 40);
prwDid("repair");
setStatus("🔨 The pumps are winning. She will float.");
}
else
setStatus("The water gains on the pumps. Keep at it."); });
},
function () { prwQuiz("A noon sight", "With the backstaff, your back to the sun, measure its height above the horizon at noon.", [["The sun at noon stands 70° above the southern horizon, and today its declination is 13° north. Your latitude?", "33° north (90 − 70 + 13)", "70° north", "13° south"], ["Why only latitude?", "Longitude needs the exact time at home; no clock could keep it at sea until the 1760s", "The sun lies", "The backstaff is broken"], ["So how did they find a place?", "'Run down the latitude': sail north or south to the place's latitude, then due east or west along it", "Guess", "Follow the birds"]], function (ok) { if (ok) {
prwDid("noon");
setStatus("☀️ You have your latitude, and the master lets you prick it on the chart.");
} }); },
function () { prwQuiz("Share out a prize", "As quartermaster you share the plunder, by the Articles. A prize worth 2,000 pieces of eight, after the 800 set aside for a man who lost a leg. Captain and quartermaster 2 shares each, master, boatswain and gunner 1½ each, 40 men 1 each.", [["How many shares is that?", "48½ (4 + 4½ + 40)", "42", "100"], ["Roughly how much is one share?", "About 25 pieces of eight (1,200 ÷ 48½)", "50", "10"], ["A man is found with a gold ring he did not declare. By the Articles?", "Marooned", "Given a double share", "Nothing"]], function (ok) { if (ok) {
prwDid("share");
setStatus("⚖️ Shared fair, every man watching the scales. Nobody grumbles: that is a quartermaster's whole art.");
} }); },
function (p) {
var S = prwS(), h = worldFacts(p.name.replace(/,.*$/, "") + ": the shipwright's yard", "You have " + S.coin + " pieces of eight", [], ["Live oak and mahogany for frames, cedar for planking, pitch pine for masts. A Bermuda sloop of 60 tons took a few months to build; here, for the coin, they will have her ready while you drink."]), fns = {};
Object.keys(PRW_HULLS).forEach(function (k) {
var H = PRW_HULLS[k], cur = S.own && S.own.kind === k;
h += worldBtn("h-" + k, (cur ? "✓ " : "") + H.n + " · " + H.cost + " pieces of eight", H.s);
fns["h-" + k] = function () { if (cur)
return; if (S.coin < H.cost) {
setStatus("The shipwright laughs. 'Come back with " + H.cost + " pieces of eight.'");
return;
} prwNameShip(function (nm) { S.coin -= H.cost; S.own = { kind: k, name: nm, upg: (S.own && S.own.upg) || {}, flag: (S.own && S.own.flag) || "black" }; S.under = null; S.rank = Math.max(S.rank, 6); prwLog("Bought " + H.n + ", the " + nm); prwSave(); prwDressWayfarer(); worldCard(null); setStatus("⚓ <b>She is yours: the " + prwEsc(nm) + ".</b> Captain. Now find a crew (any tavern) and write your Articles."); prwKeep("prw_ship", "A ship in a bottle: the " + nm, "🍾"); }); };
});
if (S.own) {
h += "<div style='margin-top:8px;font-weight:600'>Fit her out</div>";
Object.keys(PRW_UPG).forEach(function (k) {
var U = PRW_UPG[k], have = S.own.upg && S.own.upg[k], need = U.need && ["sloop", "brig", "ship", "frigate"].indexOf(S.own.kind) < ["sloop", "brig", "ship", "frigate"].indexOf(U.need);
h += worldBtn("u-" + k, (have ? "✓ " : "") + U.n + (have ? "" : " · " + U.cost), U.s + (need ? " (needs a bigger ship)" : ""));
fns["u-" + k] = function () { if (have || need)
return; if (S.coin < U.cost) {
setStatus("Not enough coin: " + U.cost + " pieces of eight.");
return;
} S.coin -= U.cost; S.own.upg = S.own.upg || {}; S.own.upg[k] = 1; if (k === "paint")
S.own.paint = [0x1A1A1E, 0x5A1A14, 0x1E2A4A, 0x2A4A2A, 0xC8A040][Math.floor(Math.random() * 5)]; prwSave(); prwDressWayfarer(); worldCard(null); setStatus("🔨 Done: " + prwEsc(U.n) + ". Look at her!"); };
});
h += worldBtn("flag", "🏴 Choose her flag", "");
fns.flag = function () { prwFlagPick(); };
}
worldCard(h, fns);
},
function (done) {
var names = ["Revenge", "Fortune", "Ranger", "Adventure", "Fancy", "Night Rambler", "Happy Delivery", "Good Fortune", "Black Joke", "Sea Nymph", "Defiance", "Liberty"];
var h = worldFacts("Name her", "Pirates loved defiant, lucky or cheerful names", [], []), fns = {};
names.forEach(function (n, i) { h += worldBtn("n" + i, prwEsc(n), ""); fns["n" + i] = function () { done(n); }; });
worldCard(h, fns);
},
function () {
var S = prwS(), h = worldFacts("Her flag", "The pirates' flags were meant to frighten: surrender now, and live", [], ["The black flag meant quarter would be given; the red ('the bloody flag') meant none."]), fns = {};
[["black", "The plain skull and bones"], ["red", "The bloody red flag: no quarter"], ["teach", "A skeleton with an hourglass and a spear at a bleeding heart (later said to be Blackbeard's)"], ["rackham", "Skull and crossed swords (later said to be Rackham's)"], ["roberts", "Yourself on two skulls (as Roberts flew it)"]].forEach(function (f) { h += worldBtn("f-" + f[0], prwEsc(f[1]), ""); fns["f-" + f[0]] = function () { S.own.flag = f[0]; prwSave(); prwDressWayfarer(); worldCard(null); }; });
worldCard(h, fns);
},
function () {
var S = prwS();
if (!S.own) {
worldCard(worldFacts("Hands wanted?", "", [], ["You need a ship of your own first. Or sign on with a captain: ask in the back room."]));
return;
}
var R = wRand((Date.now() / 600000 | 0)), h = worldFacts("Hands for the " + S.own.name, "You have " + S.crew.length + " hands · " + S.coin + " pieces of eight", [], ["Pirates were not paid wages: they signed for shares. But a new man wants something in hand: a bounty to sign, and a good captain's name. Morale: " + S.morale + "."]), fns = {};
for (var i = 0; i < 6; i++) {
var T = PRW_TRADES[Math.floor(R() * PRW_TRADES.length)], nm = prwFolkName(T[0], false, R), cost = Math.round(20 * T[2] + R() * 20), mood = ["cheerful", "sullen", "eager", "drunk", "quiet", "a hard case"][Math.floor(R() * 6)];
h += worldBtn("hire" + i, prwEsc(nm) + ", " + prwEsc(T[1]) + " · " + cost + " to sign", "Seems " + mood);
(function (T, nm, cost, mood, i) { fns["hire" + i] = function () { if (S.coin < cost) {
setStatus("Not enough coin.");
return;
} if (S.crew.length >= (S.own.upg && S.own.upg.hold ? 40 : 24)) {
setStatus("No room aboard for more.");
return;
} S.coin -= cost; S.crew.push({ name: nm, trade: T[1], role: T[0], share: T[2], mood: mood, seed: Math.floor(R() * 1e6) }); prwSave(); prwDressWayfarer(); worldCard(null); setStatus("🤝 " + prwEsc(nm) + " signs your Articles."); }; })(T, nm, cost, mood, i);
}
worldCard(h, fns);
},
function () {
var S = prwS();
if (!S.own)
return prwArticlesCard();
var A = S.art || { share: "roberts", drink: 1, lights: 1, women: 1, limb: 800, gaming: 0 };
var h = worldFacts("The Articles of the " + S.own.name, "Your rules. Your crew vote on them; harsh ones keep order, generous ones keep hearts", [], []), fns = {};
[["share", "Shares: captain and quartermaster 2, officers 1½, men 1", A.share === "roberts"], ["limb", "800 pieces of eight for a lost limb", A.limb > 0], ["gaming", "No gaming for money aboard", !A.gaming], ["lights", "Lights out at eight", A.lights], ["drink", "An equal share of drink to every man", A.drink]].forEach(function (r) { h += worldBtn("a-" + r[0], (r[2] ? "✓ " : "✗ ") + prwEsc(r[1]), ""); fns["a-" + r[0]] = function () { if (r[0] === "limb")
A.limb = A.limb ? 0 : 800;
else if (r[0] === "gaming")
A.gaming = A.gaming ? 0 : 1;
else if (r[0] === "share")
A.share = A.share === "roberts" ? "captain" : "roberts";
else
A[r[0]] = A[r[0]] ? 0 : 1; S.art = A; prwSave(); prwMyArticles(); }; });
worldCard(h, fns);
},
function () {
var S = prwS();
worldCard(worldFacts("Mutiny!", "The quartermaster comes aft with the crew behind him", [], ["'The company have voted. You've had no prize in weeks, no fresh victuals, and you keep the best for yourself. You're captain no more.' Under the Articles, a captain could be voted out at any time, and many were: Hornigold, Vane, Edward England.",
"What happens next depends on how they feel about you."]), {});
setTimeout(function () {
if (S.morale < 5) {
prwMaroon("Your own crew put you ashore on a sandbar with a pistol, a flask of powder, a bottle of water and a shot.");
}
else {
S.own.captain = 0;
var old = S.own.name;
S.under = null;
S.rank = 5;
S.ownLost = S.own;
S.own = null;
S.crew = [];
S.mutiny = 0;
S.morale = 50;
prwLog("Voted out of the " + old);
prwSave();
prwDressWayfarer();
worldCard(worldFacts("Voted out", "", [], ["They take the " + old + " and give you a boat. You row for the nearest port, a quartermaster again in all but name. Ships can be won back."]));
}
}, 4000);
},
function (why) {
var S = prwS(), c = { x: -24800 + Math.random() * 3000, z: -1500 + Math.random() * 3000 }, p = { k: "prwmaroon", name: "A sandbar, nowhere", x: c.x, z: c.z, r: 60, h: 2.5, col: 0xE8D8A8, rock: 0xE8D8A8, prwLand: 0, prw: 0, dock: { x: c.x + 90, z: c.z }, land: { x: c.x + 40, z: c.z }, card: "Marooned", about: [why] };
if (!PRW.maroon) {
SEA.isles.push(p);
var G = WORLDS.sea.g, g = new THREE.Group();
G.add(g);
var gr = wGround(200, 30, function (x, z) { var h = seaIsleH(p, p.x + x, p.z + z); return [h, 0xE8D8A8]; });
gr.position.set(p.x, 0, p.z);
g.add(gr);
prwPalm(g, p.x, 2, p.z, wRand(5));
p.g = g;
PRW.maroon = p;
}
else
p = PRW.maroon;
S.marooned = Date.now();
S.under = null;
prwSave();
prwDressWayfarer();
seaAshore(p);
SEA.aboard = false;
worldCard(null);
worldCard(worldFacts("Marooned", "", [], [why, "It was the pirates' own punishment for cheating the company or deserting: a 'governor' of an island with no water. Some were found by passing ships; Alexander Selkirk lived four years alone on Juan Fernández before Woodes Rogers took him off. Most died.", "Wait, and watch the sea. Wave at a sail (press E at the water's edge when one passes)."]));
},
function () {
var S = prwS(), h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏴‍☠️ The Sweet Trade</div><div style='opacity:.85;margin-bottom:6px'>" + prwEsc(prwRankName()) + " · " + S.coin + " pieces of eight · wanted: " + ["no", "a little", "yes", "very", "the most wanted man in the Indies"][Math.min(4, S.wanted | 0)] + "</div>", fns = {};
h += worldBtn("go", "⛵ Sail there", "Board the Wayfarer at the last pier and set a course for the Caribbean");
fns.go = function () { worldCard(null); if (WLD.on !== "sea") {
worldGo("sea");
setTimeout(function () { try {
prwChart();
}
catch (e) { } }, 2500);
}
else
prwChart(); };
h += worldBtn("duty", "⚓ Duties aboard", "Work your way up: " + (prwNeedLine() || "captain"));
fns.duty = prwDuties;
h += worldBtn("art", "📜 The Articles", S.own ? "Your own" : "Bartholomew Roberts', as Johnson printed them");
fns.art = prwMyArticles;
h += worldBtn("who", "👥 The pirates and the hunters", "Who they were and how it ended");
fns.who = prwWho;
h += worldBtn("chest", "🧰 Your sea chest", S.keeps.length + " keepsakes");
fns.chest = function () { worldCard(worldFacts("Your sea chest", "", [], S.keeps.length ? S.keeps.map(function (k) { return k[2] + " " + k[1]; }) : ["Empty, so far."])); };
h += worldBtn("log", "📓 Your log", "What you have done");
fns.log = function () { worldCard(worldFacts("Your log", "", [], S.log.length ? S.log.slice(0, 20).map(function (l) { return new Date(l.t).toLocaleDateString() + ": " + l.s; }) : ["Nothing yet."])); };
worldCard(h, fns);
},
function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The pirates and the hunters</div>", fns = {};
PRW_PIRATES.forEach(function (q) { h += worldBtn("w-" + q.k, prwEsc(q.name) + " <span style='opacity:.6;font-weight:400'>(" + prwEsc(q.years) + ")</span>", prwEsc(q.end.split(". ")[0]) + "."); fns["w-" + q.k] = function () { prwMeet(q); }; });
worldCard(h, fns);
},
function (S, side) {
var G = WORLDS.sea.g;
if (!G)
return;
var x, z, h;
if (side === "us") {
x = SEA.sx;
z = SEA.sz;
h = SEA.h;
}
else {
if (!S.at)
return;
x = S.at.x;
z = S.at.z;
h = S.at.h;
}
var tx = side === "us" ? S.at.x : SEA.sx, tz = side === "us" ? S.at.z : SEA.sz, sd = (Math.sin(h + Math.PI / 2) * (tx - x) + Math.cos(h + Math.PI / 2) * (tz - z)) > 0 ? 1 : -1;
var g = new THREE.Group();
G.add(g);
var puffs = [];
for (var i = 0; i < 6; i++) {
var a = h + Math.PI / 2 * sd, along = -10 + i * 4, px = x + Math.sin(a) * 6 + Math.sin(h) * along, pz = z + Math.cos(a) * 6 + Math.cos(h) * along;
var f = prwSph(0.9, 0xFFD070, px, 3, pz, g, 6, { e: 0xFF9A30 });
var s = prwSph(1.6, 0xD8D4CC, px, 3, pz, g, 6, { op: 0.75 });
puffs.push([f, s, Math.sin(a), Math.cos(a)]);
}
var t = 0;
PRW.tickers.push(function tk(dt) {
t += dt;
puffs.forEach(function (P) { P[0].visible = t < 0.2; P[1].scale.setScalar(1 + t * 2.5); P[1].position.x += P[2] * dt * 4; P[1].position.z += P[3] * dt * 4; P[1].position.y += dt * 1.5; });
if (t > 4) {
prwLetGo(g);
var i = PRW.tickers.indexOf(tk);
if (i >= 0)
PRW.tickers.splice(i, 1);
}
});
if (typeof playTone === "function")
for (var b = 0; b < 4; b++)
setTimeout(function () { playTone(55 + Math.random() * 30, 0.5); }, b * 140);
},
function (kind) {
var S = prwS(), r = Math.random(), adult = prwAdult();
if (r < 0.12) {
var leg = Math.random() < 0.5;
S.coin += 800;
prwLog("Lost a " + (leg ? "leg" : "hand") + " in a fight; 800 pieces of eight from the common stock");
worldCard(worldFacts(leg ? "Your leg" : "Your hand", "The surgeon's work", [], [adult ? (leg ? "A round shot smashed your leg below the knee. Four men hold you on the chest in the cockpit while the surgeon saws it off above the break, in about a minute; the stump is seared with pitch. Many died of the shock or of fever after. You live." : "Your hand is crushed to pulp under a gun's wheel. The surgeon takes it off at the wrist; the stump is seared with pitch, and you live.") : "You are badly hurt, and the surgeon has to take off your " + (leg ? "leg" : "hand") + ". You live.",
"By the Articles, 800 pieces of eight from the common stock for a lost limb: the first insurance most seamen ever had. (The game gives your leg or hand back to you; the purse stays.)"]));
prwKeep(leg ? "prw_peg" : "prw_hook", leg ? "A peg leg (you got your own back)" : "An iron hook (you got your own back)", leg ? "🦿" : "🪝");
return;
}
setStatus(kind === "fall" ? "You fall to the deck and lie winded, a rib cracked." : "🩸 You are cut, and bound up. You keep fighting.");
},
function (S, theyStart) {
var why = prwFightCan(S);
if (why && !theyStart) {
worldCard(worldFacts("Not with this crew", "", [], [why]));
return;
}
var me = prwS(), base = { merchant: 30, fleet: 340, spain: 90, navy: 140, pirate: 110 }[S.side] || 60;
PRW_FIGHT = { S: S, hull: Math.round(base + S.guns * 4), hull0: Math.round(base + S.guns * 4), round: 0, theyStart: !!theyStart, us: prwOurGuns() || 6 };
me.dmg = me.dmg || 0;
SEA.v = Math.min(SEA.v, 6);
if (S.side === "merchant" && !theyStart && Math.random() < 0.7) {
worldCard(worldFacts("She strikes!", "The black flag goes up, a gun across her bow", [], ["The merchant's captain looks at your guns and your crowded deck, and at his own twelve men, and hauls down his colours. Most merchantmen did. The pirates' whole art was to make fighting look hopeless: surrender and live, resist and get no quarter."]), {});
setTimeout(function () { prwPrize(); }, 2600);
return;
}
prwFightCard(theyStart ? (S.side === "navy" ? "She runs out her guns and fires a gun to windward: 'Heave to, in the King's name!'" : "She bears down on you with her guns run out.") : "You hoist your colours and run out the guns. She does the same.");
},
function (say) {
var F = PRW_FIGHT;
if (!F)
return;
var me = prwS(), S = F.S;
var bar = function (v, m, c) { return "<div style='height:8px;background:#2A2018;margin:2px 0 6px'><div style='height:8px;width:" + Math.max(0, Math.min(100, v / m * 100)) + "%;background:" + c + "'></div></div>"; };
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚔️ " + prwEsc(S.ship) + "</div><div style='opacity:.85;margin:4px 0'>" + say + "</div>" +
"<div style='font-size:12px'>Her hull (" + S.guns + " guns)</div>" + bar(F.hull, F.hull0, "#C8604A") + "<div style='font-size:12px'>Your ship (" + F.us + " guns)</div>" + bar(100 - me.dmg, 100, "#5AB86A");
var fns = {};
h += worldBtn("fire", "💣 Fire a broadside", "Your gun crews' timing decides how many guns bear");
fns.fire = function () { prwBeat("Broadside!", "'Fire as she bears!' Press as each gun comes onto her hull.", 3, 1.9, function (ok, hits) { prwFlash(S, "us"); var d = Math.round(F.us * (0.6 + hits * 0.5) * prwOurWeight() * (0.8 + Math.random() * 0.5)); F.hull -= d; prwDid("gun"); prwFightBack("Your broadside crashes into her: " + (hits >= 3 ? "every gun told." : hits ? "some went home." : "most went high, into her rigging.")); }); };
if (F.hull < F.hull0 * 0.6 || S.side === "merchant") {
h += worldBtn("board", "🪝 Close and board", "Grapnels over, and across her rail with cutlass and pistol");
fns.board = prwBoard;
}
h += worldBtn("run", "🏃 Run for it", "Crowd on sail and try to get away");
fns.run = function () {
var fast = (me.own && (me.own.upg || {}).sails ? 0.15 : 0) + (me.own && (me.own.upg || {}).copper ? 0.15 : 0) + (S.kind === "sloop" ? -0.15 : S.kind === "galleon" ? 0.3 : 0);
if (Math.random() < 0.4 + fast) {
worldCard(null);
PRW_FIGHT = null;
SEA.v = Math.max(SEA.v, 10);
setStatus("🏃 You crowd on every sail and she falls astern. Away!");
}
else
prwFightBack("She keeps with you. No escape this time.");
};
h += worldBtn("strike", "🏳️ Strike your colours", "Haul down your flag and surrender");
fns.strike = function () { prwStruck(); };
worldCard(h, fns);
},
function (say) {
var F = PRW_FIGHT;
if (!F)
return;
var me = prwS(), S = F.S;
if (F.hull <= 0) {
worldCard(null);
if (S.side === "merchant" || S.side === "fleet" || S.side === "spain") {
setTimeout(prwPrize, 400);
return;
}
PRW_FIGHT = null;
setStatus("💥 <b>She is beaten.</b> Her masts gone, her colours shot away, she drifts out of the fight. " + (S.side === "navy" ? "The Navy will hear of it: you are wanted more than ever." : ""));
me.wanted = Math.min(4, (me.wanted || 0) + 1);
prwDid("fight");
prwSave();
return;
}
setTimeout(function () {
prwFlash(S, "them");
var d = Math.round(S.guns * (0.5 + Math.random() * 0.9) * (S.side === "navy" ? 1.2 : 1) / Math.max(1, F.us / 12));
me.dmg = Math.min(100, (me.dmg || 0) + d);
if (Math.random() < 0.25)
prwHurt();
prwSave();
if (me.dmg >= 100) {
prwSinking();
return;
}
prwFightCard(say + " She answers: " + prwWound());
}, 900);
},
function () {
var F = PRW_FIGHT;
if (!F)
return;
var S = F.S, adult = prwAdult();
prwBeat("Boarders away!", "Grapnels, then over the rail into the smoke: cutlass, pistol, the boarding axe. Press as you see your chance.", 4, 2.1, function (ok, hits) {
if (ok) {
prwDid("fight");
worldCard(null);
setStatus(adult ? "🗡️ It is short and horrible. A pistol fired into a face at arm's length; a man pinned to the mast with a half-pike; then their captain throws down his sword and cries for quarter." : "🗡️ A short, wild fight on her deck, and then their captain throws down his sword and cries for quarter.");
setTimeout(prwPrize, 1800);
}
else {
prwSave();
prwFightBack("They throw you back over the rail. " + (adult ? "Two of yours are left dead on her deck." : "Some of yours do not come back."));
}
});
},
function () {
var F = PRW_FIGHT;
PRW_FIGHT = null;
var me = prwS(), S = F ? F.S : { side: "merchant", ship: "a prize" }, R = Math.random();
var total = { merchant: 300 + R * 900, fleet: 6000 + R * 14000, spain: 500 + R * 1500, pirate: 600 + R * 1800, navy: 0 }[S.side] | 0, cargo = { merchant: "sugar, rum, cloth, a few hundred pieces of eight in the captain's chest", fleet: "silver bars, chests of pieces of eight, cochineal and indigo", spain: "a little silver, cocoa and hides", pirate: "their own plunder: coins of five kingdoms, gold dust, a chest of watches and rings" }[S.side] || "";
var share = me.own ? Math.round(total * (2 / (me.crew.length + 4))) : Math.round(total / 48 * (me.rank >= 5 ? 2 : me.rank >= 4 ? 1.5 : 1));
if (me.own)
me.morale = Math.min(100, me.morale + 25);
me.coin += share;
me.prizes = (me.prizes || 0) + 1;
me.lastPrize = Date.now();
me.wanted = Math.min(4, (me.wanted || 0) + (S.side === "merchant" ? 0.5 : 1));
prwDid("fight");
prwLog("Took the " + S.ship + ": " + share + " pieces of eight as your share");
if (me.electReady && me.under && !me.own) {
me.electReady = 0;
prwElect();
}
prwSave();
worldCard(worldFacts("A prize!", prwEsc(S.ship), [], ["In her hold: " + cargo + ".", "The quartermaster takes it all into the common stock, then shares it out under the Articles. Your share: <b>" + share + " pieces of eight</b>. You have " + me.coin + ".",
"The prize itself is sold, burned or kept: a good ship might become a pirate's next flagship. Her crew are put in a boat, or let go in their own ship; some of them sign your Articles, and some are forced, especially carpenters and surgeons."]));
if (S.side === "fleet")
prwKeep("prw_bar", "A silver bar from the treasure fleet, with the King's mark", "🥈");
else if (me.prizes === 1)
prwKeep("prw_coin", "Your first piece of eight", "🪙");
},
function () {
var F = PRW_FIGHT, me = prwS();
PRW_FIGHT = null;
worldCard(worldFacts("She is sinking", "", [], ["Her masts are gone and the water is over the orlop. " + (F && F.S.side === "navy" ? "The Navy sloop sends boats: you are hauled out of the water in irons." : "Men are jumping. You grab a spar and kick for it.")]), {});
setTimeout(function () { me.dmg = 0; prwSave(); if (F && F.S.side === "navy")
prwCaught(F.S);
else
prwMaroon("You wash up on a sandbar after a night clinging to a spar. Your ship is on the bottom."); }, 3500);
},
function () {
var F = PRW_FIGHT, S = F.S, me = prwS();
PRW_FIGHT = null;
worldCard(null);
if (S.side === "navy")
return prwCaught(S);
if (S.side === "spain" || S.side === "fleet") {
me.coin = 0;
prwLog("Taken by the Spaniards");
prwSave();
worldCard(worldFacts("Taken by the Spaniards", "", [], ["They take everything you have and put you in irons. Spain treated all foreign interlopers in its waters as pirates; captured crews were hanged, sent to the galleys, or put to work on the fortifications.", "After months carrying stone for the walls of Havana you slip away one night and steal a fishing boat."]));
return;
}
if (S.side === "pirate") {
var half = Math.round(me.coin / 2);
me.coin -= half;
me.grudge[S.k] = 0;
prwLog("Struck to " + S.ship);
prwSave();
worldCard(worldFacts("Struck to " + S.ship, "", [], ["They come aboard laughing and take " + half + " pieces of eight and all your rum. 'Professional courtesy,' says their quartermaster. Pirates mostly left pirates alone; the trouble came when they didn't."]));
return;
}
setStatus("You haul down your colours. She sails on.");
},
function () {
var me = prwS();
var C = prwSailNameK(me.under);
worldCard(worldFacts("The vote", "The quartermaster calls the company together", [], ["'Gentlemen of fortune: " + C + " has given us poor prizes and hard words. Who here is for a new captain?' Hands go up. They are looking at you.", "Pirate captains were elected, and deposed, by vote. The captain ruled only in a fight or a chase; the quartermaster ruled the rest."]), {});
setTimeout(function () {
var k = me.under;
me.own = { kind: (PRW_SAILS.filter(function (x) { return x.k === k; })[0] || {}).kind === "sloop" ? "sloop" : "brig", name: "Revenge", upg: {}, flag: "black" };
if (PRW_HULLS[me.own.kind] == null)
me.own.kind = "sloop";
me.crew = [];
for (var i = 0; i < 10; i++)
me.crew.push({ name: prwFolkName("crew", false, Math.random), trade: "Able seaman", role: "crew", share: 1, mood: "hopeful", seed: Math.floor(Math.random() * 1e6) });
me.grudge[k] = (me.grudge[k] || 0) + 1;
me.under = null;
me.rank = 6;
me.morale = 80;
prwLog("Voted captain over " + C);
prwSave();
prwDressWayfarer();
worldCard(worldFacts("Captain!", "", [], ["They give " + C + " a boat and a fair share, and send him off cursing. You are captain of the Revenge and ten hands. He will not forget this.", "Rename her and fit her out at any shipwright's yard."]));
prwKeep("prw_elected", "The vote that made you captain", "🗳️");
}, 4500);
},
function () {
try {
if (typeof exitInterior === "function" && typeof INT !== "undefined" && INT)
exitInterior();
}
catch (e) { }
var p = PRW.ports.filter(function (q) { return PRW.built[q.k] && PRW.built[q.k].law && (PRW.built[q.k].law.stocks || PRW.built[q.k].law.pillory) && Math.hypot(SEA.sx - q.dock.x, SEA.sz - q.dock.z) < 3000; })[0];
if (!p) {
setStatus("🗡️ A quarrel over the dice: knives out, a table over, and you are thrown into the street with a split lip.");
return;
}
var B = PRW.built[p.k], L = B.law.stocks || B.law.pillory, kind = B.law.stocks ? "stocks" : "pillory", sq = prwT(p, 0, 0);
prwS().stocked = (prwS().stocked || 0) + 1;
prwLog("Put in the " + kind + " at " + p.name);
prwSave();
setStatus("🗡️ <b>A quarrel over the dice.</b> Knives out, a table over, and the watch drag you off to the " + kind + ".");
setTimeout(function () {
seaAshore(p);
worldCard(null);
prwHoldAt(L.x, L.y + (kind === "pillory" ? 0.9 : -0.5), L.z, prwLookAt(L.x, L.z, sq.x, sq.z), 90, function () { setStatus("The constable unlocks you. 'Keep the King's peace.' You can walk again: stiff, filthy and laughed at."); });
worldCard(worldFacts("In the " + kind, "An hour and a half, before the whole town (here, a minute and a half)", [], [kind === "stocks" ? "Your ankles locked in the boards, sitting on the bench, while the town walks past." : "Standing on the platform with your head and hands locked through the boards, unable to shield your face.",
"People threw rotten fruit, mud, dung, dead cats; for hated offenders, stones. Men died in the pillory. Being liked by the crowd could save you; being hated could kill you.",
"Drunkenness, swearing, brawling, cheating at dice, petty theft and slander all earned the stocks or the pillory in the colonies."]));
prwPelt(L);
}, 1200);
},
function (L) {
var G = WORLDS.sea.g;
if (!G)
return;
var n = 0;
var id = setInterval(function () {
if (!PRW.hold || n++ > 14) {
clearInterval(id);
return;
}
var a = Math.random() * Math.PI * 2, from = { x: L.x + Math.cos(a) * 9, z: L.z + Math.sin(a) * 9 }, m = prwSph(0.12, [0x7A5A20, 0x4A3A1A, 0x8A2A1A][n % 3], from.x, L.y + 1.4, from.z, G, 6), t = 0;
PRW.tickers.push(function tk(dt) {
t += dt * 1.6;
if (t >= 1 || !m.parent) {
if (m.parent)
G.remove(m);
var i = PRW.tickers.indexOf(tk);
if (i >= 0)
PRW.tickers.splice(i, 1);
if (t >= 1 && typeof playTone === "function")
playTone(90, 0.12);
return;
}
m.position.set(from.x + (L.x - from.x) * t, L.y + 1.4 + Math.sin(t * Math.PI) * 2.5 + 0.6 * t, from.z + (L.z - from.z) * t);
});
if (n % 4 === 1)
setStatus(["'Pirate scum!' A rotten plantain hits you in the ear.", "A boy throws a handful of mud and runs.", "Something soft and stinking hits your chest.", "An old woman spits at you."][n % 4 | 0] || "");
}, 5500);
},
function (by) {
var me = prwS(), k = by && by.k === "rogers" ? "nassau" : (Math.random() < 0.5 ? "portroyal" : "charlestown"), p = prwPortK(k);
PRW_FIGHT = null;
me.caught = Date.now();
prwSave();
worldCard(worldFacts("In irons", "", [], ["They put you in irons below, with the rest of the crew, in the dark and the bilge stink. " + (by && by.ship ? "The " + prwEsc(by.ship) + " sails for " + p.name + "." : "You are taken to " + p.name + "."), "Rewards were paid for every pirate brought in: £100 for a captain, £20 for a common man."]), {});
setTimeout(function () { SEA.sx = p.dock.x; SEA.sz = p.dock.z; prwPortBuilt(k); seaAshore(p); worldCard(null); prwGaol(p); }, 3500);
},
function (p) {
var me = prwS(), B = PRW.built[p.k], G = B && B.law && (B.law.gaol || null);
worldCard(worldFacts("The gaol at " + p.name, "Days, or weeks, waiting for the court", [], ["Stone walls, straw, chains to a ring in the floor, a bucket. Prisoners paid the gaoler for food and water, or went without. Fever killed many before the trial did.", "A chaplain comes to tell you to repent, and to write down your life; the printed 'last dying speeches' of pirates sold well."]), {});
setTimeout(function () { prwTrial(p); }, 5000);
},
function (p) {
var me = prwS(), cap = !!me.own || me.rank >= 6, officer = me.rank >= 3, h = worldFacts("The Court of Admiralty, " + p.name, "Present: the governor, the judge of the Vice-Admiralty, naval captains, members of the council", [], [
"The charge is read: that you, on the high sea, within the jurisdiction of the Admiralty, did piratically and feloniously set upon, board, break and enter, and rob, " + (me.prizes || 0) + " vessels" + (me.prizes ? "" : " (none, by the witnesses' account, but you were taken in arms aboard a pirate)") + ".",
"A witness swears: the master of a ship you took. 'That's one of them. I'd know that face.'", "How do you plead?"
]), fns = {};
h += worldBtn("forced", "\"Not guilty. I was forced.\"", "Forced men, especially carpenters, surgeons and boys, were often acquitted if witnesses said they wept or tried to escape");
h += worldBtn("mercy", "\"Guilty, and I beg the court's mercy.\"", "A few were reprieved, or sold as indentured servants");
if (me.pardon && !me.pardonBroken)
h += worldBtn("pardon", "📜 Show the King's Pardon", "You took it in Nassau");
var go = function (chance, say) {
worldCard(null);
var guilty = Math.random() < chance;
prwLog((guilty ? "Found guilty at " : "Acquitted at ") + p.name);
prwSave();
worldCard(worldFacts("The verdict", "The court is cleared, and called back", [], [say, guilty ? "Guilty. The judge puts on the black cap: 'You shall be carried back to the place from whence you came, and from thence to the place of execution, and there be hanged by the neck until you are dead. And the Lord have mercy on your soul.'" : "Not guilty. You are let go, with nothing, onto the street."]), {});
setTimeout(function () { worldCard(null); if (guilty)
prwGallowsWalk(p, cap);
else
prwFreed(); }, 6000);
};
fns.forced = function () { go(cap ? 0.97 : officer ? 0.75 : me.rank <= 1 ? 0.25 : 0.55, cap ? "The court laughs: a captain, forced?" : "Your shipmates are asked: were you forced? " + (me.rank <= 1 ? "One says you cried for your mother the day you were taken." : "They shrug.")); };
fns.mercy = function () { go(cap ? 0.9 : officer ? 0.7 : 0.45, "You beg. The court looks at you a long time."); };
fns.pardon = function () { worldCard(null); me.wanted = 0; me.pardonBroken = 1; prwSave(); worldCard(worldFacts("The King's Pardon", "", [], ["The judge reads the pardon, slowly. 'This covers your piracies before the fifth of January, 1718. Your newer crimes…' He looks at the governor. The governor nods: let him go, this once.", "Released. Your pardon is spent."])); };
worldCard(h, fns);
},
function (p, cap) {
var me = prwS(), B = PRW.built[p.k] || prwPortBuilt(p.k), L = B && B.law && B.law.gallows, adult = prwAdult();
if (!L) {
prwHanged(p, cap);
return;
}
var sq = prwT(p, 0, 0), face = prwLookAt(L.x, L.z, sq.x, sq.z);
var crowd = new THREE.Group();
B.g.add(crowd);
var R = wRand(77);
for (var i = 0; i < (PRW.lite ? 8 : 22); i++) {
var a = face + Math.PI + (R() - 0.5) * 1.8, d = 9 + R() * 10, x = L.x - Math.sin(a + Math.PI) * d, z = L.z - Math.cos(a + Math.PI) * d;
x = L.x + (sq.x - L.x) / Math.max(1, Math.hypot(sq.x - L.x, sq.z - L.z)) * d + (R() - 0.5) * 14;
z = L.z + (sq.z - L.z) / Math.max(1, Math.hypot(sq.x - L.x, sq.z - L.z)) * d + (R() - 0.5) * 14;
var w = wPerson("prw_" + ["worker", "woman", "man", "sailor", "lady", "merchant", "marine"][i % 7] + "_crowd" + i, { look: { _pw: ["worker", "woman", "man", "sailor", "lady", "merchant", "marine"][i % 7] } });
w.position.set(x, prwGy(p, x, z), z);
w.rotation.y = Math.atan2(L.x - x, L.z - z);
crowd.add(w);
}
var chap = wPerson("prw_priest_chaplain", { look: { _pw: "priest" } });
chap.position.set(L.x + Math.sin(face) * 1.2 + 1.2, L.y + 0.9, L.z + Math.cos(face) * 1.2);
chap.rotation.y = face + Math.PI;
crowd.add(chap);
var hang = wPerson("prw_crew_hangman", { look: { _pw: "worker" } });
hang.position.set(L.x - 1.6, L.y + 0.9, L.z);
hang.rotation.y = face;
crowd.add(hang);
prwHoldAt(L.x, L.y + 0.9, L.z, face, 1e9);
if (typeof evbTune === "function")
evbTune([196, 196, 196, 174, 164], 700, 0.5);
var steps = [
[0, "🥁 The drum. You are brought on the cart to " + prwEsc(p.name) + "'s gallows, your hands tied, a halter already around your neck. The crowd is " + (adult ? "thick and loud: people bring their children and something to eat" : "quiet now") + "."],
[7, "✝️ The chaplain prays and asks if you have anything to say. Pirates made famous last speeches: some repented and warned the young men watching; some cursed the court; one asked for a drink and got it."],
[15, "The hangman puts the rope over the beam and draws the cart close. There is no long drop yet (that came in the 1870s): when the cart pulls away, you will hang."],
[22, adult ? "The cart is whipped away." : "The cart is whipped away, and the world goes dark."]
];
steps.forEach(function (s) { setTimeout(function () { if (!PRW.hold)
return; setStatus(s[1]); }, s[0] * 1000); });
setTimeout(function () { prwDrop(p, L, cap, adult, crowd); }, 23000);
},
function (p, L, cap, adult, crowd) {
var veil = document.createElement("div");
veil.style.cssText = "position:fixed;inset:0;background:#000;opacity:0;transition:opacity " + (adult ? "9s" : "1.2s") + ";z-index:9998;pointer-events:none";
document.body.appendChild(veil);
if (PRW.hold) {
PRW.hold.y = L.y - 0.2;
}
var t = 0, base = pitch;
PRW.dropT = function (dt) { t += dt; if (!PRW.hold)
return; if (adult) {
var k = Math.max(0, 1 - t / 8);
pitch = base - 0.35 + Math.sin(t * 9) * 0.05 * k;
yaw += Math.sin(t * 2.3) * 0.004;
camera.position.y = L.y + 1.0 - Math.min(0.5, t * 2);
} };
PRW.tickers.push(function tk(dt) { if (!PRW.dropT) {
var i = PRW.tickers.indexOf(tk);
if (i >= 0)
PRW.tickers.splice(i, 1);
return;
} PRW.dropT(dt); });
requestAnimationFrame(function () { veil.style.opacity = "1"; });
if (adult)
setStatus("The rope bites. With no drop to break the neck, a hanged man strangled: it could take a quarter of an hour. His friends were allowed to pull on his legs to end it sooner. The crowd watches you kick. Then the light goes.");
setTimeout(function () { PRW.dropT = null; PRW.hold = null; PRW.holdT = null; if (crowd && crowd.parent)
prwLetGo(crowd); prwHanged(p, cap); setTimeout(function () { veil.style.transition = "opacity 2.5s"; veil.style.opacity = "0"; setTimeout(function () { veil.remove(); }, 2600); }, 1500); }, adult ? 10000 : 2500);
},
function (p, cap) {
var me = prwS(), adult = prwAdult();
me.hanged = (me.hanged || 0) + 1;
prwLog("Hanged at " + p.name);
if (adult)
prwKeep("prw_rope", "A twist of the hangman's rope (sold by the hangman, for luck, as they were)", "🪢");
me.rank = 0;
me.under = null;
me.own = null;
me.crew = [];
me.coin = 0;
me.wanted = 0;
me.duties = {};
me.dmg = 0;
me.morale = 70;
me.electReady = 0;
me.scurvy = 0;
me.days = 0;
prwSave();
prwDressWayfarer();
var n = prwPortK('nassau');
SEA.sx = n.dock.x;
SEA.sz = n.dock.z;
prwPortBuilt("nassau");
seaAshore(n);
worldCard(worldFacts("You wake", "Nassau, the harbour, morning", [], [
cap ? "Your body was tarred and hung in chains at the harbour mouth as a warning to seamen, as Kidd's was at Tilbury and Rackham's on the cay at Port Royal that still bears his name." : "Your body was buried below the tide line, as pirates were: outside the King's land and the church's.",
"And then you wake, a ship's boy again, on the beach at Nassau with nothing but your shirt. Your rank, your ship and your pieces of eight are gone. Your sea chest is still under the boat, untouched.",
"Hanged " + me.hanged + " time" + (me.hanged > 1 ? "s" : "") + ". Try not to make it " + (me.hanged + 1) + "."
]));
},
function () {
var me = prwS(), p = SEA.shore && SEA.shore.prw ? SEA.shore : null, h = worldFacts("The back room", "A long table, a jug, the ship's Articles and an ink-horn", [], []), fns = {};
var here = p ? PRW_PIRATES.filter(function (q) { return q.at === p.k && PRW_SAILS.some(function (x) { return x.k === q.k && x.side === "pirate"; }); }) : [];
if (!here.length)
here = PRW_PIRATES.filter(function (q) { return PRW_SAILS.some(function (x) { return x.k === q.k && x.side === "pirate"; }); }).slice(0, 3);
if (!me.own)
here.forEach(function (q) { if (me.grudge[q.k] > 0 || me.under === q.k)
return; h += worldBtn("s-" + q.k, "✍️ Sign " + prwEsc(q.name.replace(/,.*$/, "")) + "'s Articles", "Their quartermaster is recruiting. " + prwEsc(q.ship)); fns["s-" + q.k] = function () { prwCrossFns(q).sign(); }; });
h += worldBtn("hire", "🤝 Hire hands", me.own ? "For the " + me.own.name : "You need your own ship first");
fns.hire = prwHire;
h += worldBtn("art", "📜 " + (me.own ? "Write your Articles" : "Read a ship's Articles"), "");
fns.art = prwMyArticles;
worldCard(h, fns);
},
function (x, z) {
var lx = x - TI.x, lz = z - TI.z;
var nz = typeof wFbm === "function" ? wFbm(lx * 0.004 + 3, lz * 0.004 + 7) - 0.45 : 0;
var e = Math.pow(lx / (430 + (lz < 0 ? 40 : 0)), 2) + Math.pow(lz / 720, 2) + nz * 0.32;
e += Math.max(0, 1 - Math.hypot(lx - 20, lz - 820) / 160) * 0.5 + Math.max(0, 1 - Math.hypot(lx + 60, lz + 760) / 120) * 0.6;
if (e > 1)
return Math.max(-9, 1.6 - (e - 1) * 55);
var h = 1.6 + Math.min(1, (1 - e) * 6) * 2.4;
for (var i = 0; i < TI_HILLS.length; i++) {
var H = TI_HILLS[i], dx = lx - H[0], dz = lz - H[1];
h += H[2] * Math.exp(-(dx * dx + dz * dz) / (2 * H[3] * H[3]));
}
var dm = Math.hypot(lx - 40, lz - 430);
if (dm < 90)
h = Math.min(h, 1.3 + dm / 90 * 1.5);
return h * Math.min(1, (1 - e) * 8);
},
function () {
var G = WORLDS.sea.g;
if (!G || TI.built)
return;
var t0 = performance.now(), lite = TI.lite = prwLite();
var g = new THREE.Group();
g.name = "prw:ti";
G.add(g);
TI.g = g;
TI.built = true;
TI.people = [];
TI.talkers = [];
TI.solids = [];
TI.tick = [];
var stat = new THREE.Group();
g.add(stat);
var forest = new THREE.Color(0x4A5A3A), grey = new THREE.Color(0x6A7058), sand = new THREE.Color(0xD8C8A0), rock = new THREE.Color(0x8A8478), marsh = new THREE.Color(0x4A5232);
var s = 1700, n = lite ? 110 : 170;
var gr = wGround(s, n, function (x, z) {
var X = TI.x + x, Z = TI.z + z, h = Math.max(tiH(X, Z), tiSkH(X, Z)), c, nz = wFbm(X * 0.02, Z * 0.02);
if (h < 2.6)
c = sand.clone();
else if (Math.hypot(X - TI.x - 40, Z - TI.z - 430) < 95)
c = marsh.clone().lerp(forest, nz * 0.4);
else if (h > 70)
c = rock.clone().lerp(grey, nz);
else
c = forest.clone().lerp(grey, Math.min(1, nz * 0.9 + h / 120));
if (h < -1)
c.setHex(0x5A6A50);
return [h, c.getHex()];
});
prwGroundLook(gr, s);
gr.position.set(TI.x, 0, TI.z + 60);
g.add(gr);
var sh = new THREE.Mesh(new THREE.RingGeometry(500, 980, 48, 1), prwMat(0x3AB8B8, { op: 0.4, ds: 1 }));
sh.rotation.x = -Math.PI / 2;
sh.scale.set(0.75, 1, 1);
sh.position.set(TI.x, -0.35, TI.z + 40);
g.add(sh);
var R = wRand(1883), nt = lite ? 260 : 620, put = 0;
for (var i = 0; i < nt * 3 && put < nt; i++) {
var X = TI.x + (R() - 0.5) * 900, Z = TI.z + (R() - 0.5) * 1500, h = tiH(X, Z);
if (h < 3.2 || h > 80)
continue;
var skip = ["stockade", "cave", "cache", "landing", "pointer"].some(function (k) { var p = tiXZ(k); return Math.hypot(p.x - X, p.z - Z) < (k === "stockade" ? 34 : 18); });
if (skip)
continue;
if (Math.hypot(X - TI.x - 40, Z - TI.z - 430) < 80) {
if (R() < 0.5)
tiReeds(stat, X, h, Z, R);
continue;
}
put++;
if (R() < 0.62)
tiPine(stat, X, h, Z, R, 1);
else
tiOak(stat, X, h, Z, R);
}
var tt = tiXZ("tree");
tiPine(stat, tt.x, tiH(tt.x, tt.z), tt.z, R, 3.2);
TI.solids.push({ x: tt.x, z: tt.z, r: 2.6 });
tiStockade(g, stat);
tiCave(g, stat);
tiCache(stat);
tiPointer(stat);
tiWhiteRock(stat);
tiLookout(stat);
tiPlaceShip(g);
if (typeof ctnMerge === "function")
try {
ctnMerge(stat);
}
catch (e) { }
TI.ms = Math.round(performance.now() - t0);
try {
if (typeof tiCastBuild === "function")
tiCastBuild();
}
catch (e) {
if (window.console)
console.warn("[prw] ti cast", e);
}
},
function (g, stat) {
var c = tiXZ("stockade"), y = tiH(c.x, c.z), log = 0x6A5034, logD = 0x4A3824, n = TI.lite ? 40 : 64, R = 21;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
if (Math.abs(a - Math.PI * 0.5) < 0.09)
continue;
var x = c.x + Math.cos(a) * R, z = c.z + Math.sin(a) * R, py = tiH(x, z);
prwCyl(0.22, 0.24, 3.4, i % 2 ? log : logD, x, py + 1.5, z, stat, 5);
prwCone(0.24, 0.5, logD, x, py + 3.45, z, stat, 5);
}
for (var k = 0; k < 24; k++) {
var a2 = k / 24 * Math.PI * 2;
if (Math.abs(a2 - Math.PI * 0.5) < 0.3)
continue;
TI.solids.push({ x: c.x + Math.cos(a2) * R, z: c.z + Math.sin(a2) * R, r: 2.8 });
}
var hw = 7, hd = 5, wh = 3.2, by = y + 0.3;
[[0, -hd, hw * 2, 0.5], [-hw, 0, 0.5, hd * 2], [hw, 0, 0.5, hd * 2]].forEach(function (w) { for (var r = 0; r < 5; r++) {
var b = prwBox(w[2], 0.62, w[3], r % 2 ? log : logD, c.x + w[0], by + 0.31 + r * 0.64, c.z + w[1], stat);
} });
[-1, 1].forEach(function (sd) { for (var r = 0; r < 5; r++)
prwBox(hw - 1.1, 0.62, 0.5, r % 2 ? log : logD, c.x + sd * (hw + 1.1) / 2, by + 0.31 + r * 0.64, c.z + hd, stat); });
prwBox(hw * 2 + 0.8, 0.4, hd * 2 + 0.8, logD, c.x, by + wh + 0.3, c.z, stat);
for (var l = 0; l < 8; l++)
prwBox(0.3, 0.16, 0.6, 0x141008, c.x - hw + 1 + l * 1.8, by + 2.2, c.z - hd - 0.05, stat);
TI.solids.push({ x: c.x, z: c.z - hd, hw: hw, hd: 0.4, rot: 0 }, { x: c.x - hw, z: c.z, hw: 0.4, hd: hd, rot: 0 }, { x: c.x + hw, z: c.z, hw: 0.4, hd: hd, rot: 0 }, { x: c.x - 4.3, z: c.z + hd, hw: 2.5, hd: 0.4, rot: 0 }, { x: c.x + 4.3, z: c.z + hd, hw: 2.5, hd: 0.4, rot: 0 });
var sp = tiXZ("spring");
var pool = new THREE.Mesh(new THREE.CircleGeometry(1.4, 14), prwMat(0x3A7AA8, { e: 0x0A2A3A, ei: 0.4 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(sp.x, tiH(sp.x, sp.z) + 0.06, sp.z);
stat.add(pool);
prwCyl(0.08, 0.1, 9, 0x5A4A3A, c.x + 12, y + 4.5, c.z - 8, stat, 6);
var fl = prwFlag(g, "eng", c.x + 12 + 1.1, y + 8.2, c.z - 8);
prwCyl(0.5, 0.6, 0.4, 0x3A3A3A, c.x + 3, by + 0.2, c.z + 1, stat, 8);
prwCone(0.5, 0.9, 0xFF8A2A, c.x + 3, by + 0.8, c.z + 1, g, 6, { e: 0xFF6A1A });
for (var b = 0; b < 4; b++)
prwCyl(0.4, 0.4, 0.9, 0x6A4A2A, c.x - 5 + b * 0.95, by + 0.45, c.z - 3.5, stat, 8);
},
function (g, stat) {
var c = tiXZ("cave"), y = tiH(c.x, c.z), rk = 0x6A665C;
for (var i = 0; i < 14; i++) {
var a = Math.PI * (0.15 + i / 14 * 1.7), x = c.x + Math.cos(a) * 7, z = c.z + Math.sin(a) * 7, s = prwSph(2.4 + ((i * 37) % 10) / 10, i % 2 ? rk : 0x7A766A, x, tiH(x, z) + 1.6, z, stat, 6);
s.scale.set(1, 1.5, 1);
TI.solids.push({ x: x, z: z, r: 2.3 });
}
var roof = prwSph(8, rk, c.x, y + 3.5, c.z, stat, 10);
roof.scale.set(1, 0.55, 1);
var dark = new THREE.Mesh(new THREE.CircleGeometry(6.5, 16), prwMat(0x2A2620));
dark.rotation.x = -Math.PI / 2;
dark.position.set(c.x, y + 0.05, c.z);
stat.add(dark);
var G = new THREE.Group();
G.userData.keep = 1;
g.add(G);
TI.gold = G;
for (var h = 0; h < 6; h++) {
var hx = c.x - 3 + h * 1.2, hz = c.z - 2 + (h % 2) * 1.4;
var heap = prwSph(0.9, 0xE8C048, hx, y, hz, G, 8, { e: 0x5A3A08, ei: 0.35 });
heap.scale.set(1, 0.45, 1);
}
for (var b = 0; b < 10; b++)
prwBox(0.5, 0.16, 0.22, 0xF0C840, c.x + 2 + (b % 3) * 0.55, y + 0.1 + Math.floor(b / 3) * 0.17, c.z + 1.6, G, { e: 0x5A3A08, ei: 0.3 });
var lt = new THREE.PointLight(0xFFC060, 0.8, 14);
lt.position.set(c.x, y + 2.5, c.z);
G.add(lt);
},
function (stat) {
var c = tiXZ("cache"), y = tiH(c.x, c.z);
var pit = new THREE.Mesh(new THREE.CircleGeometry(3.4, 16), prwMat(0x3A2A1A));
pit.rotation.x = -Math.PI / 2;
pit.position.set(c.x, y + 0.06, c.z);
stat.add(pit);
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
var m = prwSph(1.2, 0x8A6A44, c.x + Math.cos(a) * 4.4, y + 0.2, c.z + Math.sin(a) * 4.4, stat, 6);
m.scale.set(1, 0.4, 1);
}
prwCyl(0.04, 0.04, 0.9, 0x6A4A2A, c.x + 1, y + 0.15, c.z, stat, 5).rotation.z = 1.4;
prwBox(1.4, 0.05, 0.3, 0x8A6A44, c.x - 1, y + 0.12, c.z + 1, stat);
prwBox(1.2, 0.05, 0.3, 0x7A5A3A, c.x - 0.6, y + 0.12, c.z + 1.5, stat);
},
function (stat) {
var c = tiXZ("pointer"), y = tiH(c.x, c.z), bone = 0xE0D4BC, g = new THREE.Group();
g.position.set(c.x, y + 0.08, c.z);
g.rotation.y = Math.atan2(TI_AT.cache.x - TI_AT.pointer.x, TI_AT.cache.z - TI_AT.pointer.z);
stat.add(g);
prwSph(0.12, bone, 0, 0, 0.5, g, 8);
prwCyl(0.03, 0.03, 0.6, bone, 0, 0, 0.05, g, 5).rotation.x = Math.PI / 2;
for (var r = 0; r < 5; r++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.012, 4, 10, Math.PI), prwMat(bone));
t.position.set(0, 0, 0.25 - r * 0.08);
stat.add(t);
g.add(t);
}
[-0.1, 0.1].forEach(function (x) { prwCyl(0.025, 0.025, 0.85, bone, x, 0, -0.65, g, 5).rotation.x = Math.PI / 2; prwCyl(0.02, 0.02, 0.7, bone, x * 0.6, 0, 1.05, g, 5).rotation.x = Math.PI / 2; });
prwBox(0.4, 0.04, 0.6, 0x3A3020, 0, -0.02, -0.3, g, { op: 0.8 });
},
function (stat) {
var c = tiXZ("whiterock"), y = tiH(c.x, c.z);
var r = prwSph(4, 0xE8E4DA, c.x, y + 1.5, c.z, stat, 8);
r.scale.set(1.2, 0.9, 1);
TI.solids.push({ x: c.x, z: c.z, r: 4.4 });
var co = prwSph(1, 0x6A5038, c.x + 4.5, y + 0.3, c.z + 2, stat, 10);
co.scale.set(1, 0.38, 1.2);
},
function (g) {
var S = prwS(), beached = S.ti && S.ti.beached, at = beached ? tiXZ("inlet") : tiXZ("anchorage");
var sh = prwShip("brig", { flag: "eng", hull: 0x2A3A2A, band: 0xC8A040, furled: !beached });
sh.position.set(at.x, beached ? -0.6 : 0, at.z);
sh.rotation.y = beached ? 0.4 : -0.3;
if (beached)
sh.rotation.z = 0.22;
g.add(sh);
TI.ship = sh;
TI.shipName = "The Hispaniola";
var L = sh.userData.L, Bm = sh.userData.B, H = sh.userData.H;
TI.deck = { x: sh.position.x, z: sh.position.z, hw: Bm * 0.42, hd: L * 0.4, y: sh.position.y + H * 0.8 + 0.13, rot: sh.rotation.y };
},
function (ref) {
if (!ref)
return null;
if (ref.ti) {
var a = tiXZ(ref.ti);
if (!a)
return null;
var x = a.x + (ref.dx || 0), z = a.z + (ref.dz || 0);
return { x: x, z: z, y: Math.max(tiH(x, z), tiSkH(x, z), 0.4), name: ref.name || a.name, area: "ti" };
}
if (ref.port) {
var p = tiPortOf(ref.port);
if (!p)
return null;
var B = PRW.built[p.k], q;
if (ref.door && B) {
var D = B.doors.filter(function (d) { return d.name === ref.door; })[0];
if (D)
q = { x: D.x + D.out.x * (ref.d || 3), z: D.z + D.out.z * (ref.d || 3) };
}
if (!q && ref.door && !B)
q = { x: p.town.x, z: p.town.z };
if (!q && ref.wharf)
q = { x: p.land.x, z: p.land.z };
if (!q) {
var t = prwT(p, ref.u || 0, ref.v || 0);
q = { x: t.x, z: t.z };
}
return { x: q.x + (ref.dx || 0), z: q.z + (ref.dz || 0), y: prwGy(p, q.x, q.z), name: ref.name || ref.door || p.name, area: p.k };
}
return null;
},
function () {
var T = tiS(), C = TI_BOOK[T.ch];
T.s++;
TIB.holdT = 0;
TIB.ask = null;
tiItemsDrop();
if (!C || T.s >= C.steps.length) {
T.ch++;
T.s = 0;
if (T.ch >= TI_BOOK.length) {
T.done = Date.now();
prwSave();
tiCastBuild();
tiFinish();
return;
}
prwSave();
tiCastBuild();
tiChapterCard();
return;
}
prwSave();
tiStepStart();
},
function () {
var st = tiStep();
if (!st)
return;
TIB.holdT = 0;
if (st.k === "read")
return tiReadCard(st.title, st.text, st.adult);
if (st.k === "choose")
return tiChoose(st);
if (st.k === "beat")
return prwBeat(st.title, st.say, st.n, st.speed, function (ok) { if (ok)
tiNext();
else {
setStatus("Again! " + prwEsc(st.t));
setTimeout(tiStepStart, 1200);
} });
if (st.k === "find")
tiItemsMake(st);
if (st.k === "act" && st.fn === "beach")
return tiBeach();
if (st.k === "act" && st.fn === "board")
return tiBoard();
if (st.k === "talk") {
var cd = TI_BOOK[tiS().ch].cast && TI_BOOK[tiS().ch].cast[st.who];
if (cd && cd.ship) {
setStatus("📖 " + prwEsc(st.t));
setTimeout(function () { tiTalkCard(st.who); }, 900);
return;
}
}
if (st.k === "sail") {
var P = tiPos(st.at) || tiPosFar(st.at);
if (P && !SEA.aboard && !SEA.shore) { }
}
setStatus("📖 <b>" + prwEsc(TI_BOOK[tiS().ch].t) + "</b> · " + prwEsc(st.t));
},
function () {
var st = tiStep();
if (!st)
return null;
if (st.k === "talk") {
var c = TIB.cast[st.who];
if (c && c.g && c.g.parent)
return { x: c.x, z: c.z, y: c.y, name: TI_WHO[st.who].name };
var d = TI_BOOK[tiS().ch].cast && TI_BOOK[tiS().ch].cast[st.who];
return d ? (d.ship ? null : (tiPos(d) || tiPosFar(d))) : null;
}
if (st.k === "go" || st.k === "hold" || st.k === "find")
return tiPos(st.at) || tiPosFar(st.at);
if (st.k === "sail") {
if (st.at.port) {
var p = tiPortOf(st.at.port);
return p ? { x: p.dock.x, z: p.dock.z, y: 0, name: p.name, sea: 1 } : null;
}
var q = tiPosFar(st.at);
if (q)
q.sea = 1;
return q;
}
return null;
},
function () {
var T = tiS(), C = TI_BOOK[T.ch];
if (!C)
return;
var h = (C.part ? "<div style='opacity:.7;font-size:12px;letter-spacing:.05em;text-transform:uppercase'>" + prwEsc(C.part) + "</div>" : "") + worldFacts(C.t, "Treasure Island · Robert Louis Stevenson, 1883", [], C.text);
h += worldBtn("go", "▶ Read on", "Chapter " + (T.ch + 1) + " of " + TI_BOOK.length);
worldCard(h, { go: function () { worldCard(null); tiStepStart(); } });
if (typeof evbTune === "function")
evbTune([294, 330, 349, 392, 349, 330, 294], 260, 0.32);
},
function (st) {
var opts = st.o.map(function (o, i) { return [o, i]; });
for (var a = opts.length - 1; a > 0; a--) {
var b = Math.floor(Math.random() * (a + 1));
var t = opts[a];
opts[a] = opts[b];
opts[b] = t;
}
var h = worldFacts(TI_BOOK[tiS().ch].t, "", [], [st.q]), fns = {};
opts.forEach(function (o) { h += worldBtn("a" + o[1], prwEsc(o[0]), ""); fns["a" + o[1]] = function () { if (o[1] === 0) {
worldCard(worldFacts("Right", "", [], [st.why]) + worldBtn("go", "▶ On", ""), { go: function () { worldCard(null); tiNext(); } });
}
else {
setStatus("Not that. Think again.");
} }; });
worldCard(h, fns);
},
function (who) {
var st = tiStep(), W = TI_WHO[who];
if (st && st.k === "talk" && st.who === who) {
var i = 0;
var show = function () { var h = worldFacts(W.name, TI_BOOK[tiS().ch].t, [], [st.say[i]]); h += worldBtn("go", i < st.say.length - 1 ? "▶ …" : "▶ On", ""); worldCard(h, { go: function () { i++; if (i < st.say.length)
show();
else {
worldCard(null);
tiNext();
} } }); };
show();
return;
}
worldCard(null);
wTalk({ name: W.name, persona: W.persona + " Keep answers short and in the book's manner of speech; never mention films.", greet: { billy: "Fifteen men on the dead man's chest… What d'ye want, boy?", silver: "Ah, Jim, my son! Sit ye down. Pieces of eight!", ben: "Cheese! You mightn't happen to have a piece of cheese about you?", livesey: "Ah, Jim. Steady, lad.", smollett: "Hawkins. What is it?", squire: "Hawkins! Splendid, splendid!", pew: "Who's that? Give me your hand, boy…", hands: "Brandy, boy. Fetch me brandy." }[who] || "Well, Jim?" });
},
function () {
tiCastDrop();
var T = tiS();
if (!T.started || T.done)
return;
var C = TI_BOOK[T.ch];
if (!C || !C.cast)
return;
Object.keys(C.cast).forEach(function (k) {
var d = C.cast[k], W = TI_WHO[k];
if (!W || d.ship)
return;
var P = d.deck ? tiDeckPt(d) : tiPos(d);
if (!P)
return;
var host = d.ti || d.deck ? (TI.built ? TI.g : null) : (PRW.built[d.port] ? PRW.built[d.port].g : null);
if (!host)
return;
var g = wPerson("prw_" + W.role + "_ti_" + k, { sex: W.sex || "m", look: { _pw: W.role } });
g.position.set(P.x, P.y, P.z);
var tgt = SEA.shore ? SEA.shore.land : null;
g.rotation.y = tgt ? Math.atan2(tgt.x - P.x, tgt.z - P.z) : 0;
host.add(g);
var tk = { x: P.x, z: P.z, r: 3.4, name: W.name, verb: "talk", fn: function () { tiTalkCard(k); } };
SEA.talkers.push(tk);
TIB.cast[k] = { g: g, x: P.x, z: P.z, y: P.y, tk: tk, host: host };
});
},
function (st) {
tiItemsDrop();
var P = tiPos(st.at);
if (!P) {
TIB.itemsWait = 1;
return;
}
TIB.itemsWait = 0;
var G = WORLDS.sea.g, R = wRand(tiS().ch * 31 + tiS().s);
for (var i = 0; i < st.n; i++) {
var a = R() * Math.PI * 2, d = 1.5 + R() * st.spread, x = P.x + Math.cos(a) * d, z = P.z + Math.sin(a) * d, y = Math.max(WORLDS.sea.ground(x, z, P.y + 2) || P.y, P.y - 1);
var m = prwSph(0.22, 0xFFD870, x, y + 0.5, z, G, 8, { e: 0xC89A30, ei: 0.9 });
TIB.items.push({ m: m, x: x, z: z, name: (st.items && st.items[i]) || st.name, got: 0 });
}
},
function () {
var T = tiS();
worldCard(worldFacts("Into the North Inlet", "", [], ["Israel Hands gives the orders from the deck: \"Starboard a little … steady … larboard a little.\" You steer her round the island, into the narrow North Inlet, and run her softly up the sand at high water."]) + worldBtn("go", "▶ On", ""), { go: function () {
worldCard(null);
T.beached = 1;
prwSave();
if (TI.built && TI.g) {
if (TI.ship && TI.ship.parent)
TI.g.remove(TI.ship);
tiPlaceShip(TI.g);
}
tiNext();
} });
},
function () {
worldCard(worldFacts("Aboard", "", [], ["The schooner's bowsprit swings over you. You leap, catch the jib-boom, and the coracle goes down under your feet. You tumble onto the deck."]) + worldBtn("go", "▶ On", ""), { go: function () {
worldCard(null);
if (!TI.built)
tiBuild();
var P = tiDeckPt({ dz: 8 });
if (P) {
if (!SEA.shore || !SEA.shore.ti)
seaAshore(TI_ISLE);
worldCard(null);
TI.onDeck = 1;
camera.position.set(SEA.base + P.x, P.y + 1.72, P.z);
}
tiNext();
} });
},
function (fresh) {
var T = tiS();
try {
if (typeof ctRpc === "function")
ctRpc("tale_start", { p_key: "treasureisland" }).catch(function () { });
}
catch (e) { }
if (fresh || T.done) {
prwS().ti = { ch: 0, s: 0, started: Date.now(), done: 0, beached: 0 };
}
else if (!T.started)
T.started = Date.now();
prwSave();
if (typeof WLD !== "undefined" && WLD.on !== "sea") {
worldGo("sea");
setTimeout(function () { tiCastBuild(); tiChapterCard(); }, 2600);
return;
}
tiCastBuild();
tiChapterCard();
},
function () {
var T = tiS();
prwKeep("prw_ti_coin", "A piece of eight from Flint's treasure", "🪙");
prwKeep("prw_ti_parrot", "A green feather from Captain Flint the parrot", "🦜");
worldCard(worldFacts("Treasure Island: the end", "You have played the whole book", [], ["Robert Louis Stevenson wrote it in 1881 for his stepson Lloyd, who had drawn a map of an imaginary island on a rainy day in Scotland. It came out as a serial in a boys' magazine, then as a book in 1883.", "Nearly everything we picture about pirates comes from it: the treasure map with its X, the one-legged sea-cook with his parrot, the black spot, 'Fifteen men on the dead man's chest', 'Shiver my timbers!', buried chests of gold."]));
try {
if (typeof ctRpc === "function" && typeof ctSigned === "function" && ctSigned())
ctRpc("tale_done", { p_key: "treasureisland" }).then(function (o) { if (o && o.say)
setStatus("🎉 " + o.say); }).catch(function () { });
}
catch (e) { }
},
function () {
var T = tiS(), h = worldFacts("📖 Treasure Island", "Robert Louis Stevenson, 1883 · the whole book, played as Jim Hawkins", [], ["From the Admiral Benbow on the coast of England, to Bristol, across the sea, and over every part of Flint's island. " + TI_BOOK.length + " chapters, about three hours."]), fns = {};
if (T.started && !T.done) {
h += worldBtn("go", "▶ Go on: " + prwEsc(TI_BOOK[T.ch].t), "Where you left off");
fns.go = function () { worldCard(null); tiStart(false); };
}
h += worldBtn("new", T.started ? "↺ Begin again" : "▶ Begin: The Old Sea-dog at the Admiral Benbow", "");
fns["new"] = function () { worldCard(null); tiStart(true); };
if (T.started && !T.done) {
h += worldBtn("stop", "⏸ Put the book down", "Your place is kept");
fns.stop = function () { T.started = 0; prwSave(); tiCastDrop(); worldCard(null); PRW.tiLine = ""; };
}
worldCard(h, fns);
},
function () {
var S = prwS(), R = PRW.rules || {}, inPort = SEA.shore && SEA.shore.prw, h = worldFacts("💰 Bank your plunder", "The Treasury's agent: " + (R.rate || 100) + " pieces of eight a gold, up to " + (R.cap || 40) + " gold a day", [], [
"You have <b>" + S.coin + " pieces of eight</b>. Banked today: " + (R.today || 0) + " gold.",
"Pieces of eight were the world's money in the age of the pirates: Spanish silver dollars, struck in Mexico and Peru, cut into eight 'bits' for small change (so 'two bits' is a quarter). The gold is real, in your purse in Somnucor; the coin stays here."
]), fns = {};
if (!inPort) {
h += "<div style='margin:6px 0;opacity:.85'>Go ashore in any of the Sweet Trade's ports to bank it.</div>";
worldCard(h, fns);
return;
}
[[R.rate || 100, "A small purse"], [(R.rate || 100) * 10, "A bag"], [S.coin, "All of it"]].forEach(function (o, i) {
if (o[0] > S.coin || o[0] < (R.rate || 100))
return;
h += worldBtn("b" + i, o[1] + ": " + o[0] + " pieces of eight", "For " + Math.floor(o[0] / (R.rate || 100)) + " gold (within today's limit)");
fns["b" + i] = function () { worldCard(null); prwBank(o[0]); };
});
worldCard(h, fns);
},
function (n) {
var S = prwS();
if (typeof cityRpc !== "function") {
setStatus("Sign in, and your plunder can be banked for gold.");
return;
}
setStatus("💰 The clerk counts it out, coin by coin…");
cityRpc("prw_bank", { p_coin: n }).then(function (o) {
o = o || {};
var used = +o.used || 0;
if (used > 0) {
S.coin = Math.max(0, S.coin - used);
prwLog("Banked " + used + " pieces of eight for " + o.paid + " gold");
prwSave();
if (PRW.rules)
PRW.rules.today = (PRW.rules.today || 0) + (+o.paid || 0);
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}
setStatus((used > 0 ? "💰 " : "") + prwEsc(o.say || "Done."));
}).catch(function (e) { setStatus(/function|does not exist|404/.test(String(e && e.message || e)) ? "Banking plunder opens soon. Your pieces of eight are kept in your sea chest." : prwEsc((e && e.message) || String(e))); });
},
function (p) {
var cob = p.style === "spa" || p.style === "stone" || p.style === "moor" || p.style === "chi" || (typeof PRW_COLD !== "undefined" && PRW_COLD[p.k]);
var k = (cob ? "cob" : "earth") + (p.style === "spa" || p.style === "moor" ? "w" : "");
if (PRW_PLAZA[k])
return PRW_PLAZA[k];
var c = document.createElement("canvas");
c.width = c.height = 512;
var x = c.getContext("2d"), R = wRand(k.length * 977 + 31);
if (cob) {
var warm = /w$/.test(k);
x.fillStyle = warm ? "#7A6A58" : "#5E5A52";
x.fillRect(0, 0, 512, 512);
for (var row = 0; row < 30; row++) {
var y0 = row * 512 / 30, off = R() * 20;
for (var col = -1; col < 26; col++) {
var w = 16 + R() * 10, cx = col * 21 + off + R() * 2, cy = y0 + 8.5 + R() * 1.5, v = warm ? 132 + R() * 30 : 100 + R() * 34, t = R() * 10 - 5, hh = 12.5 + R() * 2;
x.fillStyle = "rgb(" + ((v + t + (warm ? 22 : 8)) | 0) + "," + ((v + t + (warm ? 12 : 5)) | 0) + "," + ((v + t) | 0) + ")";
x.beginPath();
var rx = cx - w / 2, ry = cy - hh / 2, rr = 4;
x.moveTo(rx + rr, ry);
x.lineTo(rx + w - rr, ry);
x.quadraticCurveTo(rx + w, ry, rx + w, ry + rr);
x.lineTo(rx + w, ry + hh - rr);
x.quadraticCurveTo(rx + w, ry + hh, rx + w - rr, ry + hh);
x.lineTo(rx + rr, ry + hh);
x.quadraticCurveTo(rx, ry + hh, rx, ry + hh - rr);
x.lineTo(rx, ry + rr);
x.quadraticCurveTo(rx, ry, rx + rr, ry);
x.fill();
x.fillStyle = "rgba(255,255,255,0.07)";
x.fillRect(rx + 2, ry + 1.5, w - 4, 2.5);
x.fillStyle = "rgba(0,0,0,0.12)";
x.fillRect(rx + 2, ry + hh - 3, w - 4, 2.5);
}
}
for (var d = 0; d < 3000; d++) {
x.fillStyle = "rgba(" + (warm ? "90,70,50" : "60,55,45") + "," + (0.1 + R() * 0.2) + ")";
x.fillRect(R() * 512, R() * 512, 1 + R() * 2, 1 + R() * 2);
}
for (var bl = 0; bl < 14; bl++) {
var bx = R() * 512, by = R() * 512, br = 30 + R() * 70, g2 = x.createRadialGradient(bx, by, 0, bx, by, br);
g2.addColorStop(0, "rgba(40,35,25,0.18)");
g2.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g2;
x.fillRect(bx - br, by - br, br * 2, br * 2);
}
for (var m = 0; m < 26; m++) {
x.fillStyle = "rgba(60,80,40," + (0.15 + R() * 0.2) + ")";
x.fillRect(R() * 512, R() * 512, 2 + R() * 5, 1 + R() * 2);
}
}
else {
var g = x.createRadialGradient(256, 256, 40, 256, 256, 360);
g.addColorStop(0, "#9C8462");
g.addColorStop(1, "#86704E");
x.fillStyle = g;
x.fillRect(0, 0, 512, 512);
for (var i = 0; i < 9000; i++) {
var v2 = R();
x.fillStyle = v2 < 0.5 ? "rgba(70,52,32," + (0.08 + R() * 0.15) + ")" : v2 < 0.85 ? "rgba(200,180,140," + (0.08 + R() * 0.15) + ")" : "rgba(120,110,95,0.5)";
x.fillRect(R() * 512, R() * 512, 1 + R() * 2.4, 1 + R() * 2.4);
}
x.strokeStyle = "rgba(60,44,26,0.30)";
x.lineWidth = 7;
[[60, 140], [110, 190]].forEach(function (o) { x.beginPath(); x.moveTo(-10, o[0]); x.bezierCurveTo(160, o[0] + 60, 340, o[1] - 80, 522, o[1]); x.stroke(); });
for (var h = 0; h < 70; h++) {
var hx = R() * 512, hy = R() * 512;
x.fillStyle = "rgba(60,44,26,0.28)";
x.beginPath();
x.ellipse(hx, hy, 3, 4, R() * 3, 0, Math.PI * 2);
x.fill();
}
for (var q = 0; q < 4; q++) {
var px = R() * 512, py = R() * 512, pr = 10 + R() * 22;
x.fillStyle = "rgba(70,58,44,0.35)";
x.beginPath();
x.ellipse(px, py, pr, pr * 0.6, R() * 3, 0, Math.PI * 2);
x.fill();
}
for (var s = 0; s < 40; s++) {
x.fillStyle = "rgba(90,110,50," + (0.2 + R() * 0.25) + ")";
for (var b = 0; b < 6; b++)
x.fillRect(R() * 512, R() * 512, 1, 3 + R() * 4);
}
}
var T = new THREE.CanvasTexture(c);
T.wrapS = T.wrapT = THREE.RepeatWrapping;
T.repeat.set(cob ? 22 : 4, cob ? 22 : 4);
if (THREE.SRGBColorSpace)
T.colorSpace = THREE.SRGBColorSpace;
T.anisotropy = 4;
var M = new THREE.MeshLambertMaterial({ map: T });
M.userData.ldShared = 1;
PRW_PLAZA[k] = M;
return M;
},
function (p, g, sq, sy, R) {
var at = function (a, d) { return { x: sq.x + Math.sin(a) * d, z: sq.z + Math.cos(a) * d }; }, Y = function (q) { return prwGy(p, q.x, q.z); };
var barrel = function (q, s) { var y = Y(q); prwCyl(0.42 * s, 0.38 * s, 0.95 * s, 0x6A4626, q.x, y + 0.48 * s, q.z, g, 10); prwCyl(0.44 * s, 0.44 * s, 0.06, 0x2A2A2A, q.x, y + 0.22 * s, q.z, g, 10); prwCyl(0.44 * s, 0.44 * s, 0.06, 0x2A2A2A, q.x, y + 0.74 * s, q.z, g, 10); };
var crate = function (q, s, r) { var m = prwBox(0.9 * s, 0.7 * s, 0.9 * s, 0x8A6A40, q.x, Y(q) + 0.35 * s, q.z, g); m.rotation.y = r; var l = prwBox(0.94 * s, 0.08, 0.94 * s, 0x5A4228, q.x, Y(q) + 0.5 * s, q.z, g); l.rotation.y = r; };
var sack = function (q) { var m = prwSph(0.36, 0xB8A07A, q.x, Y(q) + 0.3, q.z, g, 8); m.scale.set(1, 0.8, 0.8); };
for (var i = 0; i < 6; i++) {
var q = at(i * Math.PI / 3 + 0.3, 24.5), y = Y(q);
prwCyl(0.07, 0.09, 3.2, 0x2A2620, q.x, y + 1.6, q.z, g, 6);
prwBox(0.34, 0.44, 0.34, 0x1E1A14, q.x, y + 3.3, q.z, g);
prwBox(0.24, 0.3, 0.24, 0xFFD890, q.x, y + 3.3, q.z, g, { e: 0xFFB050, ei: 0.6 });
}
for (var j = 0; j < 7; j++) {
var a = R() * Math.PI * 2, d = 14 + R() * 9, q2 = at(a, d);
if (j % 3 === 0) {
barrel(q2, 1);
barrel({ x: q2.x + 0.9, z: q2.z + 0.2 }, 1);
barrel({ x: q2.x + 0.45, z: q2.z - 0.8 }, 0.9);
}
else if (j % 3 === 1) {
crate(q2, 1, a);
crate({ x: q2.x + 0.2, z: q2.z + 0.1 }, 0.85, a + 0.4);
var top = { x: q2.x + 0.1, z: q2.z };
prwBox(0.7, 0.55, 0.7, 0x9A7A4A, top.x, Y(top) + 0.98, top.z, g).rotation.y = a + 0.2;
}
else {
sack(q2);
sack({ x: q2.x + 0.6, z: q2.z + 0.3 });
sack({ x: q2.x + 0.3, z: q2.z - 0.5 });
}
}
var c = at(R() * 6.28, 11 + R() * 5), cy = Y(c), ry = R() * 6.28, cart = new THREE.Group();
cart.position.set(c.x, cy, c.z);
cart.rotation.y = ry;
g.add(cart);
prwBox(1.4, 0.12, 2.2, 0x7A5A36, 0, 0.75, 0, cart);
prwBox(1.4, 0.4, 0.08, 0x6A4A2A, 0, 0.95, 1.08, cart);
prwBox(1.4, 0.4, 0.08, 0x6A4A2A, 0, 0.95, -1.08, cart);
prwBox(0.08, 0.4, 2.2, 0x6A4A2A, 0.68, 0.95, 0, cart);
prwBox(0.08, 0.4, 2.2, 0x6A4A2A, -0.68, 0.95, 0, cart);
[-0.82, 0.82].forEach(function (wx) { var w = prwCyl(0.55, 0.55, 0.1, 0x4A3420, wx, 0.55, 0.2, cart, 14); w.rotation.z = Math.PI / 2; });
prwBox(0.08, 0.08, 1.6, 0x6A4A2A, 0.4, 0.7, -1.8, cart);
prwBox(0.08, 0.08, 1.6, 0x6A4A2A, -0.4, 0.7, -1.8, cart);
prwSph(0.3, 0xB8A07A, 0.2, 1.15, 0.3, cart, 8);
prwSph(0.28, 0xA89068, -0.3, 1.12, -0.4, cart, 8);
var t = at(R() * 6.28, 19), ty = Y(t), tr = new THREE.Group();
tr.position.set(t.x, ty, t.z);
tr.rotation.y = R() * 6.28;
g.add(tr);
prwBox(2.4, 0.6, 0.8, 0x5A4430, 0, 0.3, 0, tr);
prwBox(2.2, 0.04, 0.6, 0x4A6A7A, 0, 0.56, 0, tr, { op: 0.85 });
prwBox(0.12, 1.1, 0.12, 0x4A3A28, -1.6, 0.55, 1.2, tr);
prwBox(0.12, 1.1, 0.12, 0x4A3A28, 1.6, 0.55, 1.2, tr);
prwBox(3.4, 0.1, 0.1, 0x4A3A28, 0, 1.05, 1.2, tr);
for (var h = 0; h < 5; h++) {
var hq = at(R() * 6.28, 6 + R() * 14), hy = Y(hq), hen = new THREE.Group();
hen.position.set(hq.x, hy, hq.z);
hen.rotation.y = R() * 6.28;
g.add(hen);
var col = R() < 0.5 ? 0xF2EEE4 : 0x8A4A24;
prwSph(0.18, col, 0, 0.22, 0, hen, 8).scale.set(1, 0.85, 1.3);
prwSph(0.09, col, 0, 0.36, 0.17, hen, 8);
prwCone(0.03, 0.07, 0xE0A020, 0, 0.36, 0.27, hen, 5).rotation.x = Math.PI / 2;
prwBox(0.05, 0.08, 0.03, 0xC02020, 0, 0.46, 0.18, hen);
}
for (var s = 0; s < 10; s++) {
var sq2 = at(R() * 6.28, 4 + R() * 20), st = prwBox(0.5 + R() * 0.6, 0.02, 0.2 + R() * 0.3, 0xC8B070, sq2.x, Y(sq2) + 0.06, sq2.z, g);
st.rotation.y = R() * 6.28;
}
},
function (k, draw) {
if (PRW_TX[k])
return PRW_TX[k];
var N = prwTxN(), c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
var R = wRand(k.split("").reduce(function (a, ch) { return a * 31 + ch.charCodeAt(0) | 0; }, 7));
x.save();
x.scale(N / 512, N / 512);
draw(x, R);
x.restore();
var T = new THREE.CanvasTexture(c);
T.wrapS = T.wrapT = THREE.RepeatWrapping;
T.anisotropy = PRW.lite ? 2 : 8;
PRW_TX[k] = T;
return T;
},
function (x, R, n, col, r0, r1) {
for (var i = 0; i < n; i++) {
var cx = R() * 512, cy = R() * 512, r = r0 + R() * (r1 - r0), g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
g.addColorStop(0, col);
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(cx - r, cy - r, r * 2, r * 2);
[[512, 0], [-512, 0], [0, 512], [0, -512]].forEach(function (o) { x.save(); x.translate(o[0], o[1]); x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); x.restore(); });
}
},
function (x, R) {
x.fillStyle = "#EDE8DC";
x.fillRect(0, 0, 512, 512);
prwBlot(x, R, 40, "rgba(150,130,100,0.10)", 30, 120);
prwBlot(x, R, 26, "rgba(255,255,255,0.18)", 20, 90);
prwNoise(x, R, 9000, 0.10, 0.10, 1.6);
var g = x.createLinearGradient(0, 380, 0, 512);
g.addColorStop(0, "rgba(90,70,40,0)");
g.addColorStop(1, "rgba(90,70,40,0.32)");
x.fillStyle = g;
x.fillRect(0, 380, 512, 132);
for (var s = 0; s < 6; s++) {
var sx = R() * 512, g2 = x.createLinearGradient(0, 0, 0, 200);
g2.addColorStop(0, "rgba(80,70,50,0.18)");
g2.addColorStop(1, "rgba(80,70,50,0)");
x.fillStyle = g2;
x.fillRect(sx, 0, 6 + R() * 14, 140 + R() * 120);
}
x.strokeStyle = "rgba(70,60,45,0.45)";
x.lineWidth = 1;
for (var c = 0; c < 9; c++) {
var px = R() * 512, py = R() * 512;
x.beginPath();
x.moveTo(px, py);
for (var k = 0; k < 6; k++) {
px += (R() - 0.5) * 26;
py += 6 + R() * 14;
x.lineTo(px, py);
}
x.stroke();
}
for (var p = 0; p < 1; p++) {
var bx = R() * 440, by = 300 + R() * 140, bw = 24 + R() * 30, bh = 16 + R() * 20;
x.fillStyle = "rgba(150,90,60,0.55)";
x.fillRect(bx, by, bw, bh);
x.strokeStyle = "rgba(230,220,200,0.6)";
for (var r = 0; r < bh; r += 8) {
x.beginPath();
x.moveTo(bx, by + r);
x.lineTo(bx + bw, by + r);
x.stroke();
}
x.strokeStyle = "rgba(60,50,40,0.5)";
x.strokeRect(bx, by, bw, bh);
}
},
function (x, R) {
var n = 12, h = 512 / n;
for (var i = 0; i < n; i++) {
var y = i * h, g = x.createLinearGradient(0, y, 0, y + h);
g.addColorStop(0, "#F4F0E6");
g.addColorStop(0.85, "#D8D2C4");
g.addColorStop(1, "#8A8478");
x.fillStyle = g;
x.fillRect(0, y, 512, h);
for (var s = 0; s < 14; s++) {
x.fillStyle = "rgba(120,100,80," + (0.05 + R() * 0.08) + ")";
x.fillRect(R() * 512, y + 2 + R() * (h - 6), 40 + R() * 160, 1);
}
var j = R() * 512;
x.fillStyle = "rgba(60,50,40,0.5)";
x.fillRect(j, y, 2, h);
}
for (var p = 0; p < 16; p++) {
x.fillStyle = "rgba(110,85,60," + (0.25 + R() * 0.3) + ")";
var px = R() * 512, py = R() * 512;
x.beginPath();
x.ellipse(px, py, 3 + R() * 16, 1.5 + R() * 4, 0, 0, Math.PI * 2);
x.fill();
}
prwNoise(x, R, 4000, 0.06, 0.06, 1.4);
var g3 = x.createLinearGradient(0, 420, 0, 512);
g3.addColorStop(0, "rgba(80,70,50,0)");
g3.addColorStop(1, "rgba(80,70,50,0.25)");
x.fillStyle = g3;
x.fillRect(0, 420, 512, 92);
},
function (x, R) {
x.fillStyle = "#B8AE9C";
x.fillRect(0, 0, 512, 512);
var rows = 28, bh = 512 / rows, bw = 512 / 9;
for (var r = 0; r < rows; r++) {
var off = (r % 2) * bw / 2;
for (var c = -1; c < 10; c++) {
var t = R(), cr = t < 0.15 ? [110, 52, 36] : t < 0.3 ? [150, 80, 52] : t < 0.45 ? [90, 50, 40] : [130 + R() * 30, 62 + R() * 18, 44 + R() * 12];
x.fillStyle = prwRgb(cr[0], cr[1], cr[2]);
x.fillRect(c * bw + off + 2, r * bh + 1.6, bw - 4, bh - 3.2);
x.fillStyle = "rgba(0,0,0," + (R() * 0.15) + ")";
x.fillRect(c * bw + off + 2, r * bh + bh - 4, bw - 4, 2.4);
x.fillStyle = "rgba(255,240,220," + (R() * 0.12) + ")";
x.fillRect(c * bw + off + 2, r * bh + 1.6, bw - 4, 2);
}
}
prwNoise(x, R, 7000, 0.15, 0.07, 1.6);
prwBlot(x, R, 10, "rgba(40,30,20,0.18)", 30, 90);
var g = x.createLinearGradient(0, 0, 0, 120);
g.addColorStop(0, "rgba(30,25,20,0.25)");
g.addColorStop(1, "rgba(30,25,20,0)");
x.fillStyle = g;
x.fillRect(0, 0, 512, 120);
},
function (x, R) {
x.fillStyle = "#8A8478";
x.fillRect(0, 0, 512, 512);
var rows = 10, bh = 512 / rows;
for (var r = 0; r < rows; r++) {
var cx = -R() * 60;
while (cx < 512) {
var w = 60 + R() * 90, v = 175 + R() * 40, t = R() * 14 - 7;
x.fillStyle = prwRgb(v + t, v - 4 + t, v - 16);
x.fillRect(cx + 2, r * bh + 2, w - 4, bh - 4);
x.fillStyle = "rgba(255,255,255,0.12)";
x.fillRect(cx + 2, r * bh + 2, w - 4, 3);
x.fillStyle = "rgba(0,0,0,0.18)";
x.fillRect(cx + 2, r * bh + bh - 6, w - 4, 4);
cx += w;
}
}
prwNoise(x, R, 12000, 0.14, 0.10, 1.8);
prwBlot(x, R, 16, "rgba(60,70,40,0.20)", 20, 70);
prwBlot(x, R, 10, "rgba(40,35,30,0.20)", 30, 110);
},
function (x, R) {
x.fillStyle = "#6E6A62";
x.fillRect(0, 0, 512, 512);
for (var i = 0; i < 210; i++) {
var cx = R() * 512, cy = R() * 512, rw = 14 + R() * 26, rh = 9 + R() * 16, v = 120 + R() * 70, t = R() * 16 - 8;
x.fillStyle = prwRgb(v + t + 8, v + t, v - 10 + t);
x.beginPath();
for (var k = 0; k < 7; k++) {
var a = k / 7 * Math.PI * 2, rr = 0.75 + R() * 0.3;
x.lineTo(cx + Math.cos(a) * rw * rr, cy + Math.sin(a) * rh * rr);
}
x.closePath();
x.fill();
x.fillStyle = "rgba(255,255,255,0.10)";
x.beginPath();
x.ellipse(cx - rw * 0.2, cy - rh * 0.3, rw * 0.5, rh * 0.3, 0, 0, Math.PI * 2);
x.fill();
}
prwNoise(x, R, 9000, 0.15, 0.08, 1.6);
prwBlot(x, R, 14, "rgba(70,90,40,0.25)", 14, 50);
},
function (x, R) {
x.fillStyle = "#5A2A18";
x.fillRect(0, 0, 512, 512);
var rows = 11, rh = 512 / rows, n = 10, tw = 512 / n;
for (var r = 0; r < rows; r++) {
for (var c = 0; c < n; c++) {
var cx = c * tw + (r % 2) * tw / 2, base = [176 + R() * 30, 86 + R() * 24, 52 + R() * 16], dark = R() < 0.12;
if (dark)
base = [120, 70, 50];
var g = x.createLinearGradient(cx, 0, cx + tw, 0);
g.addColorStop(0, prwRgb(base[0] * 0.55, base[1] * 0.55, base[2] * 0.55));
g.addColorStop(0.45, prwRgb(base[0] * 1.08, base[1] * 1.08, base[2] * 1.08));
g.addColorStop(1, prwRgb(base[0] * 0.5, base[1] * 0.5, base[2] * 0.5));
x.fillStyle = g;
[0, 512].forEach(function (o) { x.fillRect(cx + 1 - o, r * rh, tw - 2, rh + 6); });
}
var sh = x.createLinearGradient(0, r * rh + rh - 8, 0, r * rh + rh + 2);
sh.addColorStop(0, "rgba(0,0,0,0)");
sh.addColorStop(1, "rgba(0,0,0,0.55)");
x.fillStyle = sh;
x.fillRect(0, r * rh + rh - 8, 512, 10);
}
prwNoise(x, R, 8000, 0.15, 0.08, 1.6);
prwBlot(x, R, 12, "rgba(60,70,40,0.30)", 12, 40);
prwBlot(x, R, 8, "rgba(255,255,255,0.10)", 30, 80);
},
function (x, R) {
x.fillStyle = "#3A342C";
x.fillRect(0, 0, 512, 512);
var rows = 16, rh = 512 / rows;
for (var r = 0; r < rows; r++) {
var cx = -R() * 30;
while (cx < 512) {
var w = 18 + R() * 26, v = 160 + R() * 50;
x.fillStyle = prwRgb(v, v * 0.94, v * 0.86);
x.fillRect(cx + 1, r * rh, w - 2, rh + 4);
for (var s = 0; s < 3; s++) {
x.fillStyle = "rgba(60,50,40,0.18)";
x.fillRect(cx + 2 + R() * (w - 4), r * rh, 1, rh);
}
cx += w;
}
x.fillStyle = "rgba(0,0,0,0.45)";
x.fillRect(0, r * rh + rh - 3, 512, 3);
}
prwNoise(x, R, 6000, 0.12, 0.06, 1.4);
prwBlot(x, R, 14, "rgba(70,90,50,0.30)", 10, 50);
},
function (x, R) {
x.fillStyle = "#2A2C30";
x.fillRect(0, 0, 512, 512);
var rows = 14, rh = 512 / rows;
for (var r = 0; r < rows; r++) {
var cx = (r % 2) * 16 - R() * 10;
while (cx < 512) {
var w = 28 + R() * 10, v = 150 + R() * 50;
x.fillStyle = prwRgb(v * 0.95, v, v * 1.06);
x.fillRect(cx + 1.5, r * rh, w - 3, rh + 3);
x.fillStyle = "rgba(255,255,255,0.08)";
x.fillRect(cx + 1.5, r * rh, w - 3, 2);
cx += w;
}
x.fillStyle = "rgba(0,0,0,0.5)";
x.fillRect(0, r * rh + rh - 2.5, 512, 2.5);
}
prwNoise(x, R, 6000, 0.12, 0.08, 1.2);
prwBlot(x, R, 10, "rgba(200,200,170,0.18)", 8, 24);
},
function (x, R) {
x.fillStyle = "#6A5A38";
x.fillRect(0, 0, 512, 512);
var rows = 8, rh = 512 / rows;
for (var r = 0; r < rows; r++) {
for (var i = 0; i < 900; i++) {
var sx = R() * 512, sy = r * rh + R() * rh, l = rh * (0.5 + R() * 0.7), v = 150 + R() * 80;
x.strokeStyle = prwRgb(v, v * 0.86, v * 0.56, 0.8);
x.lineWidth = 0.8 + R() * 1.2;
x.beginPath();
x.moveTo(sx, sy);
x.lineTo(sx + (R() - 0.5) * 6, sy + l);
x.stroke();
}
var sh = x.createLinearGradient(0, r * rh + rh * 0.7, 0, r * rh + rh);
sh.addColorStop(0, "rgba(0,0,0,0)");
sh.addColorStop(1, "rgba(0,0,0,0.45)");
x.fillStyle = sh;
x.fillRect(0, r * rh + rh * 0.7, 512, rh * 0.3);
}
prwBlot(x, R, 10, "rgba(40,30,20,0.25)", 20, 70);
},
function (x, R) {
var n = 8, h = 512 / n;
for (var i = 0; i < n; i++) {
var y = i * h, v = 200 + R() * 35;
x.fillStyle = prwRgb(v, v * 0.92, v * 0.82);
x.fillRect(0, y, 512, h);
for (var s = 0; s < 30; s++) {
x.strokeStyle = "rgba(90,65,40," + (0.08 + R() * 0.14) + ")";
x.lineWidth = 0.6 + R() * 1.2;
var yy = y + 2 + R() * (h - 4);
x.beginPath();
x.moveTo(0, yy);
x.bezierCurveTo(170, yy + (R() - 0.5) * 6, 340, yy + (R() - 0.5) * 6, 512, yy);
x.stroke();
}
for (var k = 0; k < 2; k++) {
var kx = R() * 512, ky = y + h / 2;
x.fillStyle = "rgba(80,55,30,0.35)";
x.beginPath();
x.ellipse(kx, ky, 6 + R() * 6, 3 + R() * 2, 0, 0, Math.PI * 2);
x.fill();
}
var j = R() * 512;
x.fillStyle = "rgba(30,22,14,0.8)";
x.fillRect(j, y, 2, h);
[j - 10, j + 12].forEach(function (nx) { x.fillStyle = "rgba(30,30,30,0.7)"; x.fillRect(nx, y + h * 0.25, 3, 3); x.fillRect(nx, y + h * 0.7, 3, 3); });
x.fillStyle = "rgba(20,14,8,0.85)";
x.fillRect(0, y + h - 2.5, 512, 2.5);
}
prwNoise(x, R, 6000, 0.12, 0.06, 1.4);
prwBlot(x, R, 10, "rgba(40,30,20,0.18)", 20, 80);
},
function (x, R) {
x.fillStyle = "#F2EDE0";
x.fillRect(0, 0, 512, 512);
var n = 8, w = 512 / n;
for (var i = 0; i < n; i++) {
var v = 232 + R() * 16;
x.fillStyle = prwRgb(v, v - 4, v - 14);
x.fillRect(i * w, 0, w, 512);
x.fillStyle = "rgba(120,100,70,0.35)";
x.fillRect(i * w, 0, 2, 512);
x.fillStyle = "rgba(255,255,255,0.4)";
x.fillRect(i * w + 2, 0, 1, 512);
}
[150, 300].forEach(function (y) { x.fillStyle = "rgba(120,100,70,0.35)"; x.fillRect(0, y, 512, 3); for (var k = 0; k < 16; k++) {
x.fillStyle = "rgba(70,60,45,0.7)";
x.fillRect(k * 32 + 14, y + 4, 2, 12);
} });
prwBlot(x, R, 16, "rgba(150,120,80,0.14)", 30, 110);
prwBlot(x, R, 6, "rgba(90,80,70,0.12)", 50, 140);
prwNoise(x, R, 5000, 0.06, 0.05, 1.2);
var g = x.createLinearGradient(0, 440, 0, 512);
g.addColorStop(0, "rgba(80,60,40,0)");
g.addColorStop(1, "rgba(80,60,40,0.25)");
x.fillStyle = g;
x.fillRect(0, 440, 512, 72);
},
function (m, kind, col, o) {
var geo = m.geometry;
if (!geo || !geo.attributes || !geo.attributes.position)
return m;
var g = geo.index ? geo.toNonIndexed() : geo.clone(), P = g.attributes.position, uv = new Float32Array(P.count * 2), t = (o && o.tile) || PRW_TILE[kind] || 3, sx = m.scale.x, sy = m.scale.y, sz = m.scale.z;
var a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3(), U = new THREE.Vector3(), V = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), q = new THREE.Vector3();
var rot = new THREE.Matrix4().makeRotationFromEuler(m.rotation);
for (var i = 0; i + 2 < P.count; i += 3) {
a.set(P.getX(i) * sx, P.getY(i) * sy, P.getZ(i) * sz).applyMatrix4(rot);
b.set(P.getX(i + 1) * sx, P.getY(i + 1) * sy, P.getZ(i + 1) * sz).applyMatrix4(rot);
c.set(P.getX(i + 2) * sx, P.getY(i + 2) * sy, P.getZ(i + 2) * sz).applyMatrix4(rot);
n.subVectors(b, a).cross(q.subVectors(c, a));
if (n.lengthSq() < 1e-12)
continue;
n.normalize();
if (Math.abs(n.y) > 0.97) {
U.set(1, 0, 0);
V.set(0, 0, n.y > 0 ? -1 : 1);
}
else {
U.crossVectors(up, n).normalize();
V.crossVectors(n, U).normalize();
}
[a, b, c].forEach(function (p, j) { uv[(i + j) * 2] = p.dot(U) / t; uv[(i + j) * 2 + 1] = p.dot(V) / t; });
}
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
if (!g.attributes.normal)
g.computeVertexNormals();
if (g !== geo)
geo.dispose();
m.geometry = g;
m.material = prwTexMat(col, kind, o);
return m;
},
function (p, S, R) {
var st = p.style, cold = typeof PRW_COLD !== "undefined" && PRW_COLD[p.k];
if (R() < (PRW_BRICK[p.k] || 0))
return "brick";
if (st === "spa" || st === "moor")
return "plaster";
if (st === "stone")
return R() < 0.7 ? "rubble" : "plaster";
if (st === "fr")
return R() < 0.35 ? "ashlar" : "plaster";
if (st === "camp")
return "plank";
if (st === "chi")
return R() < 0.3 ? "brick" : "plaster";
if (cold)
return R() < 0.55 ? "clap" : "plaster";
return R() < 0.7 ? "clap" : "plaster";
},
function (p, S, R) {
var st = p.style;
if (st === "spa" || st === "moor")
return "rtile";
if (st === "chi")
return "rtile";
if (st === "fr")
return "slate";
if (st === "camp")
return "thatch";
if (st === "stone")
return p.k === "clare" && R() < 0.6 ? "thatch" : "slate";
if (typeof PRW_COLD !== "undefined" && PRW_COLD[p.k])
return R() < 0.5 ? "slate" : "shingle";
return "shingle";
},
function (p, q, S, R, r) {
var wallK = prwWallKind(p, S, R), roofK = prwRoofKind(p, S, R), walls = {}, roofs = {};
(S.walls || []).forEach(function (c) { walls[c] = 1; });
(S.roof || []).forEach(function (c) { roofs[c] = 1; });
var kill = [];
q.children.slice().forEach(function (m) {
if (!m.isMesh || !m.material || !m.material.color || m.userData.keep)
return;
var c = m.material.color.getHex(), gp = m.geometry && m.geometry.parameters;
if (gp && gp.height === 0.04 && (gp.width > 2 || gp.depth > 2)) {
kill.push(m);
return;
}
if (walls[c] || c === 0xC8BCA8 || c === 0xB8A890)
prwLay(m, wallK, wallK === "brick" ? 0xFFFFFF : wallK === "rubble" || wallK === "ashlar" ? blendHex(c, 0xFFFFFF, 0.55) : c);
else if (roofs[c] || (m.geometry && (m.geometry.type === "ExtrudeGeometry" || m.geometry.type === "CylinderGeometry" && gp && gp.radialSegments === 4)))
prwLay(m, roofK, roofK === "rtile" || roofK === "slate" || roofK === "thatch" ? (p.style === "chi" ? 0x9AA8A0 : 0xFFFFFF) : c);
else if (c === 0x8A8070 || c === 0xA89A80 || c === 0xC8BCA0 || c === 0xD8D0C0 || c === 0x8A7A6A || c === 0x6A6A64)
prwLay(m, "ashlar", blendHex(c, 0xFFFFFF, 0.5));
else if (S.chim && c === S.chim)
prwLay(m, "brick", 0xFFFFFF);
else if (PRW_WOOD[c] && gp && Math.max(gp.width || 0, gp.height || 0, gp.depth || 0) > 0.8)
prwLay(m, "plank", blendHex(c, 0xFFFFFF, 0.25), { tile: 1.6 });
});
kill.forEach(function (m) { q.remove(m); if (m.geometry)
m.geometry.dispose(); });
if (PRW.lite || r.fort || !r.hw)
return;
var door = null;
q.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.parameters && m.geometry.parameters.height >= 2.2 && m.geometry.parameters.height <= 3.3 && m.geometry.parameters.depth <= 0.15 && m.position.z > 0)
door = m; });
if (!door)
return;
var hw = r.hw, hd = door.position.z - 0.02, h = r.h || 3, top = 0.5 + h, trim = S.trim || 0xF0ECE0, lamp = prwMat(0xFFD890, { e: 0xFFB050, ei: 0.7 });
[[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (s) {
var cx = s[0] * (hw + 0.02), cz = s[1] * (hd + 0.02);
if (wallK === "clap" || wallK === "plank")
prwBox(0.2, h, 0.2, trim, cx, 0.5 + h / 2, cz, q);
else
for (var y = 0; y < h - 0.2; y += 0.6) {
var lg = (y / 0.6 | 0) % 2;
prwLay(prwBox(lg ? 0.55 : 0.3, 0.28, lg ? 0.3 : 0.55, 0xD8D0C0, cx, 0.75 + y, cz, q), "ashlar", 0xE8E0D0);
}
});
if (S.kind !== "flat") {
prwBox(hw * 2 + 0.5, 0.24, 0.08, trim, 0, top - 0.05, hd + 0.25, q);
prwBox(hw * 2 + 0.5, 0.24, 0.08, trim, 0, top - 0.05, -hd - 0.25, q);
}
else {
prwBox(hw * 2 + 0.3, 0.5, 0.3, blendHex(trim, 0xFFFFFF, 0.6), 0, top + 0.2, hd, q);
for (var c = 0; c < Math.floor(hw * 2 / 1.2); c++)
prwBox(0.4, 0.5, 0.4, 0xF0ECE0, -hw + 0.4 + c * 1.2, top + 0.6, hd, q);
}
if (h > 4)
prwBox(hw * 2 + 0.06, 0.16, 0.12, trim, 0, 0.5 + 3.1, hd + 0.04, q);
prwBox(1.75, 0.12, 0.18, trim, 0, 3.0, hd + 0.1, q);
[-0.82, 0.82].forEach(function (x) { prwBox(0.14, 2.5, 0.16, trim, x, 1.75, hd + 0.08, q); });
prwLay(prwBox(2.0, 0.3, 0.9, 0x9A9284, 0, 0.35, hd + 0.45, q), "ashlar", 0xC8C0B0);
var lx = R() < 0.5 ? -1.3 : 1.3;
prwBox(0.06, 0.06, 0.5, 0x1A1612, lx, 2.75, hd + 0.25, q);
prwBox(0.26, 0.38, 0.26, 0x1E1A14, lx, 2.5, hd + 0.5, q);
var L1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.26, 0.18), lamp);
L1.position.set(lx, 2.5, hd + 0.5);
q.add(L1);
var nb = Math.max(1, Math.round(hw * 2 / 3));
for (var i = 0; i < nb; i++) {
if (R() < 0.45)
continue;
var x = -hw + hw * 2 * (i + 0.5) / nb;
if (Math.abs(x) < 1.4)
continue;
prwBox(1.0, 0.22, 0.3, 0x5A3A22, x, 0.5 + 1.8 - 0.78, hd + 0.2, q);
var fc = [0xC83A3A, 0xE8C040, 0xD86AA0, 0xF0F0F0, 0xE87A2A][(R() * 5) | 0];
for (var f = 0; f < 4; f++) {
var bl = prwSph(0.13, R() < 0.5 ? fc : 0x3A6A2A, x - 0.36 + f * 0.24, 0.5 + 1.8 - 0.6, hd + 0.22, q, 6);
bl.scale.y = 0.8;
}
}
if (R() < 0.6) {
var bx = R() < 0.5 ? -hw + 0.8 : hw - 0.8;
for (var b = 0; b < 2 + (R() * 2 | 0); b++) {
var br = prwCyl(0.36, 0.32, 0.85, 0x6A4626, bx + (b % 2) * 0.75, 0.92, hd + 0.6 + (b > 1 ? 0.75 : 0), q, 10);
prwLay(br, "plank", 0x9A7046, { tile: 1 });
prwCyl(0.37, 0.37, 0.05, 0x2A2A2A, bx + (b % 2) * 0.75, 1.2, hd + 0.6 + (b > 1 ? 0.75 : 0), q, 10);
}
}
else if (R() < 0.5) {
prwLay(prwBox(1.8, 0.1, 0.45, 0x6A4A2A, R() < 0.5 ? -hw + 1.4 : hw - 1.4, 0.95, hd + 0.45, q), "plank", 0x9A7A52, { tile: 1.2 });
}
if ((p.style === "spa" || p.style === "moor" || p.style === "eng" && !(typeof PRW_COLD !== "undefined" && PRW_COLD[p.k])) && R() < 0.4) {
var aw = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6), prwTexMat(0xFFFFFF, "awning", { ds: 1 }));
aw.position.set(0, 3.25, hd + 0.75);
aw.rotation.x = -1.0;
q.add(aw);
[-1.5, 1.5].forEach(function (x) { prwCyl(0.04, 0.04, 2.6, 0x3A2A1A, x, 1.95, hd + 1.4, q, 5); });
}
if (S.kind === "gable" || S.kind === "steep")
prwBox(hw * 2 + 0.6, 0.16, 0.3, 0x5A5048, 0, top + (S.kind === "steep" ? hd * 2 * 0.62 : 2.6) + 0.02, 0, q);
},
function (p, g, a, b, w, mat) {
var len = Math.hypot(b.x - a.x, b.z - a.z);
if (len < 2)
return;
var n = Math.max(2, Math.ceil(len / 4)), dx = (b.x - a.x) / len, dz = (b.z - a.z) / len, nx = -dz, nz = dx, pos = [], uv = [], T = 56;
for (var i = 0; i <= n; i++) {
var t = i / n * len, cx = a.x + dx * t, cz = a.z + dz * t;
[-1, 1].forEach(function (s) { var x = cx + nx * s * w / 2, z = cz + nz * s * w / 2; pos.push(x, prwGy(p, x, z) + 0.07, z); uv.push(t / T, (s + 1) * w / 2 / T); });
}
var idx = [];
for (var j = 0; j < n; j++) {
var k = j * 2;
idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
if (geo.attributes.normal.getY(0) < 0) {
idx = [];
for (var j2 = 0; j2 < n; j2++) {
var k2 = j2 * 2;
idx.push(k2, k2 + 2, k2 + 1, k2 + 1, k2 + 2, k2 + 3);
}
geo.setIndex(idx);
geo.computeVertexNormals();
}
var m = new THREE.Mesh(geo, mat);
m.userData.keep = 1;
g.add(m);
return m;
},
function (p, B, R) {
var g = B.stat, mat = prwPlazaMat(p), sq = prwT(p, 0, 0), lr = p.r;
prwStrip(p, g, sq, { x: p.land.x, z: p.land.z }, 7, mat);
[-60, -90].forEach(function (v) { if (Math.abs(v) > lr * 0.42)
return; var a = prwT(p, -Math.min(80, lr * 0.4), v), b = prwT(p, Math.min(80, lr * 0.4), v); prwStrip(p, g, a, b, 5.5, mat); });
[-40, 40].forEach(function (u) { prwStrip(p, g, prwT(p, u * 0.6, -20), prwT(p, u, -Math.min(100, lr * 0.42)), 4.5, mat); });
},
function (p, B, R) {
var g = B.stat, a = Math.atan2(p.dock.x - p.land.x, p.dock.z - p.land.z), len = Math.hypot(p.dock.x - p.land.x, p.dock.z - p.land.z) + 14, mx = (p.dock.x + p.land.x) / 2, mz = (p.dock.z + p.land.z) / 2;
var at = function (t, s) { return { x: mx + Math.sin(a) * t + Math.cos(a) * s, z: mz + Math.cos(a) * t - Math.sin(a) * s }; };
for (var i = 0; i < len / 7; i++) {
[-1, 1].forEach(function (s) { var q = at(-len / 2 + 4 + i * 7, s * 3.2); prwCyl(0.2, 0.24, 0.6, 0x2A2620, q.x, 2.25, q.z, g, 8); if (R() < 0.4) {
var co = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.09, 6, 14), prwMat(0xB8A070));
co.rotation.x = Math.PI / 2;
co.position.set(q.x + 0.5 * s * Math.cos(a), 2.0, q.z - 0.5 * s * Math.sin(a));
g.add(co);
} });
}
var c = at(len / 2 - 5, 2.2), cr = new THREE.Group();
cr.position.set(c.x, 1.95, c.z);
cr.rotation.y = a;
g.add(cr);
prwLay(prwBox(0.5, 6, 0.5, 0x5A4A34, 0, 3, 0, cr), "plank", 0x8A7050, { tile: 1 });
var jib = prwBox(0.3, 0.3, 5, 0x5A4A34, 0, 5.6, 1.8, cr);
jib.rotation.x = -0.5;
prwLay(jib, "plank", 0x8A7050, { tile: 1 });
var rope = prwCyl(0.025, 0.025, 3, 0x2A2018, 0, 3.9, 3.9, cr, 4);
var hook = prwBox(0.9, 0.6, 0.9, 0x8A6A42, 0, 2.2, 3.9, cr);
prwLay(hook, "plank", 0xB8946A, { tile: 0.9 });
for (var n = 0; n < 2; n++) {
var q = at(-len / 2 + 6 + n * 9, -2.5);
[-1.4, 1.4].forEach(function (o) { prwCyl(0.06, 0.06, 2.4, 0x4A3A28, q.x + Math.cos(a) * 0, 3.15, q.z + o, g, 5); });
var net = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.8, 1, 1), prwMat(0x5A5A48, { ds: 1, op: 0.7 }));
net.position.set(q.x, 3.2, q.z);
net.rotation.y = Math.PI / 2;
g.add(net);
}
for (var k = 0; k < 4; k++) {
var lp = at(-len / 2 + 3 + k * 1.1, 2.4);
var pot = prwCyl(0.35, 0.4, 0.5, 0x8A6A42, lp.x, 2.2, lp.z, g, 8);
}
var bt = at(-len / 2 - 4, 5), boat = new THREE.Group();
boat.position.set(bt.x, prwGy(p, bt.x, bt.z) + 0.25, bt.z);
boat.rotation.set(0, a + 0.6, 0.25);
g.add(boat);
var hull = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), prwMat(0x6A4A2A, { ds: 1 }));
hull.scale.set(0.8, 0.5, 2.4);
hull.rotation.x = Math.PI;
hull.position.y = 0.5;
boat.add(hull);
prwLay(hull, "plank", 0x9A7046, { tile: 0.8, ds: 1 });
[-0.5, 0.5].forEach(function (z) { prwBox(1.4, 0.06, 0.25, 0x6A4A2A, 0, 0.42, z, boat); });
var oar = prwCyl(0.04, 0.04, 3, 0x8A6A42, 0.3, 0.55, 0, boat, 5);
oar.rotation.x = Math.PI / 2;
},
function (hc, band) {
var k = "hull|" + hc + "|" + band;
if (PRW_TX[k])
return PRW_TX[k];
var hcol = new THREE.Color(hc), bcol = new THREE.Color(band), rgb = function (c, f) { return prwRgb(c.r * 255 * f, c.g * 255 * f, c.b * 255 * f); };
return prwCanvas(k, function (x, R) {
var Y = function (v) { return 512 - v * 0.85 * 512; };
x.fillStyle = "#5A4A36";
x.fillRect(0, 0, 512, 512);
x.fillStyle = "#C8C0A8";
x.fillRect(0, Y(0.38), 512, 512 - Y(0.38));
x.fillStyle = rgb(hcol, 1);
x.fillRect(0, Y(1), 512, Y(0.38) - Y(1));
var n = 22;
for (var i = 0; i < n; i++) {
var y = Y((i + 1) / n);
x.fillStyle = "rgba(10,8,6,0.55)";
x.fillRect(0, y, 512, 2.2);
x.fillStyle = "rgba(255,255,255,0.06)";
x.fillRect(0, y + 2.2, 512, 2);
var bt = R() * 512;
x.fillStyle = "rgba(10,8,6,0.6)";
x.fillRect(bt, y, 2, 512 / n);
for (var t = 0; t < 8; t++) {
x.fillStyle = "rgba(20,16,10,0.5)";
x.fillRect(R() * 512, y + 512 / n / 2, 2.4, 2.4);
}
}
for (var s = 0; s < 1400; s++) {
x.fillStyle = "rgba(0,0,0," + (R() * 0.12) + ")";
x.fillRect(R() * 512, R() * 512, 6 + R() * 40, 1);
}
x.fillStyle = "#141210";
x.fillRect(0, Y(0.56), 512, Y(0.48) - Y(0.56));
x.fillStyle = "#141210";
x.fillRect(0, Y(0.82), 512, Y(0.79) - Y(0.82));
x.fillStyle = rgb(bcol, 1);
x.fillRect(0, Y(0.79), 512, Y(0.6) - Y(0.79));
var px = 200, pw = 110, py0 = Y(0.765), py1 = Y(0.625);
x.fillStyle = "#7A1E14";
x.fillRect(px - 8, py0 - 6, pw + 16, py1 - py0 + 12);
x.fillStyle = "#140E0A";
x.fillRect(px, py0, pw, py1 - py0);
x.fillStyle = "#0A0A0C";
x.beginPath();
x.arc(px + pw / 2, (py0 + py1) / 2, 18, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#2A2A2E";
x.beginPath();
x.arc(px + pw / 2, (py0 + py1) / 2, 12, 0, Math.PI * 2);
x.fill();
x.fillStyle = rgb(hcol, 0.85);
x.fillRect(px - 6, py0 - 34, pw + 12, 26);
x.fillStyle = "#141210";
x.fillRect(px + 10, py0 - 12, 4, 10);
x.fillRect(px + pw - 14, py0 - 12, 4, 10);
x.fillStyle = "#2A1E14";
x.fillRect(0, 0, 512, Y(0.96));
x.fillStyle = "#B8903A";
x.fillRect(0, Y(0.885), 512, 5);
var g = x.createLinearGradient(0, Y(0.44), 0, Y(0.36));
g.addColorStop(0, "rgba(40,60,30,0)");
g.addColorStop(1, "rgba(40,60,30,0.6)");
x.fillStyle = g;
x.fillRect(0, Y(0.44), 512, Y(0.36) - Y(0.44));
for (var r = 0; r < 5; r++) {
var sx = R() * 512, g2 = x.createLinearGradient(0, Y(0.6), 0, Y(0.4));
g2.addColorStop(0, "rgba(110,60,30,0.35)");
g2.addColorStop(1, "rgba(110,60,30,0)");
x.fillStyle = g2;
x.fillRect(sx, Y(0.6), 5, Y(0.4) - Y(0.6));
}
x.fillStyle = rgb(hcol, 1.08);
x.fillRect(0, 0, 512, Y(1));
for (var u2 = 0; u2 < 4; u2++) {
x.fillStyle = "rgba(10,8,6,0.5)";
x.fillRect(0, Y(1) * (u2 + 1) / 5, 512, 2);
}
x.fillStyle = "#C8A048";
x.fillRect(0, 512 * 0.035, 512, 6);
x.fillStyle = "#2A1E14";
x.fillRect(0, 0, 512, 512 * 0.012);
prwNoise(x, R, 6000, 0.12, 0.06, 1.4);
});
},
function (L, B, H, kind) {
var ns = 24, nr = 10, pos = [], uv = [], idx = [], draft = H * 0.62, free = H * 0.82, sheerS = kind === "galleon" ? H * 1.0 : kind === "sloop" ? H * 0.2 : H * 0.55, sheerB = kind === "galleon" ? H * 0.45 : H * 0.3;
var hv = function (y) { return y <= free ? (y + draft) / (free + draft) * 0.85 : 0.85 + Math.min(0.145, (y - free) / Math.max(1, sheerS) * 0.145); };
var half = function (t) { return t > 0 ? B / 2 * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.55) : B / 2 * (1 - Math.pow(-t, 3) * 0.32); };
var rail = function (t) { return free + (t < 0 ? Math.pow(-t, 2) * sheerS : Math.pow(t, 2) * sheerB); };
var keel = function (t) { return -draft * (t > 0 ? 1 - Math.pow(t, 6) * 0.85 : 1 - Math.pow(-t, 6) * 0.5); };
for (var i = 0; i <= ns; i++) {
var t = -1 + 2 * i / ns, z = t * L / 2, hb = half(t), yk = keel(t), yr = rail(t);
for (var j = 0; j <= nr; j++) {
var s = j / nr, y = yk + (yr - yk) * s, w = hb * (s < 0.75 ? Math.pow(Math.sin(s / 0.75 * Math.PI / 2), 0.5) : 1 - (s - 0.75) * 0.22);
[-1, 1].forEach(function (sd) { pos.push(sd * w, y, z); uv.push(z / 3 * sd, hv(y)); });
}
}
var row = (nr + 1) * 2;
for (var i2 = 0; i2 < ns; i2++)
for (var j2 = 0; j2 < nr; j2++) {
for (var sd2 = 0; sd2 < 2; sd2++) {
var a = i2 * row + j2 * 2 + sd2, b = a + 2, c = a + row, d = c + 2;
if (sd2 === 0)
idx.push(a, c, b, b, c, d);
else
idx.push(a, b, c, b, d, c);
}
}
var base = pos.length / 3;
for (var j3 = 0; j3 <= nr; j3++) {
var pL = j3 * 2, pR = j3 * 2 + 1;
pos.push(pos[pL * 3], pos[pL * 3 + 1], pos[pL * 3 + 2], pos[pR * 3], pos[pR * 3 + 1], pos[pR * 3 + 2]);
uv.push(pos[pL * 3] / 3, hv(pos[pL * 3 + 1]), pos[pR * 3] / 3, hv(pos[pR * 3 + 1]));
}
for (var j4 = 0; j4 < nr; j4++) {
var e = base + j4 * 2;
idx.push(e, e + 1, e + 2, e + 1, e + 3, e + 2);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
geo.userData = { half: half, rail: rail, keel: keel, draft: draft, free: free };
return geo;
},
function (w0, w1, h, belly) {
var g = new THREE.PlaneGeometry(1, 1, 6, 5), p = g.attributes.position, uv = g.attributes.uv;
for (var i = 0; i < p.count; i++) {
var u = p.getX(i) + 0.5, v = p.getY(i) + 0.5, w = w0 + (w1 - w0) * (1 - v);
p.setX(i, (u - 0.5) * w);
p.setY(i, (v - 0.5) * h);
p.setZ(i, Math.sin(u * Math.PI) * Math.sin(Math.min(1, v * 1.15) * Math.PI * 0.9) * belly);
uv.setXY(i, (u - 0.5) * w / 4, (v - 0.5) * h / 4);
}
g.computeVertexNormals();
return g;
},
function (kind, o) {
o = o || {};
var g = new THREE.Group(), L = { sloop: 20, brig: 28, ship: 38, galleon: 44 }[kind] || 24, B = L * 0.27, H = L * 0.16, lite = PRW.lite;
var hc = o.hull != null ? o.hull : 0x3A2A1C, band = o.band != null ? o.band : 0xA8883A, gild = prwMat(0xC8A048), wood = 0x5A3A1E, tar = 0x1A1612;
var hgeo = prwHullGeo(L, B, H, kind), HU = hgeo.userData, hm = new THREE.MeshLambertMaterial({ map: prwHullTex(hc, band), side: THREE.DoubleSide });
hm.userData.ldShared = 1;
var hull = new THREE.Mesh(hgeo, hm);
hull.userData.keep = 1;
hull.userData.prwHull = 1;
g.add(hull);
var dy = H * 0.8, deckMat = prwTexMat(0xD8C8A8, "plank");
var deckShape = function (z0, z1, k) { var sh = new THREE.Shape(), n = 14, pts = []; for (var i = 0; i <= n; i++) {
var z = z0 + (z1 - z0) * i / n;
pts.push([HU.half(z / (L / 2)) * k, z]);
} sh.moveTo(pts[0][0], -pts[0][1]); pts.forEach(function (q) { sh.lineTo(q[0], -q[1]); }); for (var j = n; j >= 0; j--)
sh.lineTo(-pts[j][0], -pts[j][1]); var gg = new THREE.ShapeGeometry(sh); gg.rotateX(-Math.PI / 2); return gg; };
var deck = new THREE.Mesh(deckShape(-L / 2 + 0.25, L / 2 - L * 0.06, 0.97), deckMat);
deck.position.set(0, dy + 0.11, 0);
g.add(deck);
prwLay(deck, "plank", 0xD8C8A8, { tile: 2 });
var qd = kind === "sloop" ? 0.2 : 0.28, qz = -L / 2 + L * qd / 2 + 0.3, qh = Math.max(1.1, HU.rail(-0.75) - dy - 0.9);
if (kind !== "sloop") {
var qdk = new THREE.Mesh(deckShape(qz - L * qd / 2, qz + L * qd / 2, 0.95), deckMat);
qdk.position.set(0, dy + qh + 0.1, 0);
g.add(qdk);
prwLay(qdk, "plank", 0xD8C8A8, { tile: 2 });
prwBox(B * 0.8, 0.2, 0.12, 0x5A3A1E, 0, dy + qh, qz + L * qd / 2, g);
var bh = prwBox(B * 0.86, qh, 0.15, hc, 0, dy + qh / 2, qz + L * qd / 2, g);
prwLay(bh, "plank", blendHex(hc, 0xFFFFFF, 0.3), { tile: 1.2 });
for (var b = 0; b < 5; b++)
prwBox(0.08, 0.8, 0.08, 0xE8E0C8, -B * 0.38 + b * B * 0.19, dy + qh + 0.5, qz + L * qd / 2 - 0.05, g);
prwBox(B * 0.86, 0.08, 0.1, wood, 0, dy + qh + 0.92, qz + L * qd / 2 - 0.05, g);
if (kind !== "brig") {
var fz = L / 2 - L * 0.12;
var fc = prwBox(B * 0.7, 0.2, L * 0.16, 0xD8C8A8, 0, dy + qh * 0.8, fz - L * 0.02, g);
prwLay(fc, "plank", 0xD8C8A8, { tile: 2 });
}
}
var sz = -L / 2, sr = HU.rail(-1), sw = HU.half(-1) * 2 * 0.86, ny = kind === "galleon" ? 3 : kind === "sloop" ? 1 : 2;
var trn = prwBox(sw, sr - dy + 0.4, 0.2, hc, 0, (sr + dy) / 2 + 0.2, sz - 0.05, g);
prwLay(trn, "plank", blendHex(hc, 0xFFFFFF, 0.2), { tile: 1.4 });
var glow = prwMat(0xF0D890, { e: 0x8A6A30, ei: 0.7 });
for (var row = 0; row < ny; row++) {
var wy = dy + 0.6 + row * 1.35, nw = kind === "sloop" ? 3 : 5;
for (var w = 0; w < nw; w++) {
var wx = -sw * 0.4 + w * sw * 0.8 / (nw - 1);
var win = new THREE.Mesh(new THREE.BoxGeometry(sw * 0.11, 0.75, 0.06), glow);
win.position.set(wx, wy, sz - 0.18);
g.add(win);
prwBox(sw * 0.13, 0.08, 0.1, 0xC8A048, wx, wy + 0.42, sz - 0.2, g);
prwBox(0.07, 0.85, 0.1, 0xC8A048, wx - sw * 0.06, wy, sz - 0.2, g);
}
prwBox(sw * 1.02, 0.14, 0.5, wood, 0, wy - 0.5, sz - 0.4, g);
if (!lite)
for (var bb = 0; bb < 12; bb++)
prwBox(0.06, 0.4, 0.06, 0xC8A048, -sw * 0.48 + bb * sw * 0.96 / 11, wy - 0.25, sz - 0.6, g);
}
var crest = new THREE.Mesh(new THREE.CylinderGeometry(sw * 0.45, sw * 0.45, 0.2, 16, 1, false, 0, Math.PI), gild);
crest.rotation.set(Math.PI / 2, 0, Math.PI / 2);
crest.position.set(0, sr + 0.1, sz - 0.05);
g.add(crest);
if (kind !== "sloop")
[-1, 0, 1].forEach(function (s) { if (kind === "brig" && s === 0)
return; var lt = new THREE.Group(); lt.position.set(s * sw * 0.42, sr + 0.9, sz - 0.4); g.add(lt); prwCyl(0.3, 0.18, 0.25, 0x2A2018, 0, 0.8, 0, lt, 8); prwCyl(0.26, 0.3, 0.9, 0xFFE0A0, 0, 0.25, 0, lt, 8, { e: 0xE0A040, ei: 0.8 }); prwCone(0.3, 0.5, 0xC8A048, 0, 0.95, 0, lt, 8); prwCyl(0.05, 0.05, 0.8, 0x2A2018, 0, -0.5, 0.2, lt, 4); });
var gy = -HU.draft + 0.695 * (HU.free + HU.draft), guns = 0;
for (var gz = -L * 0.33; gz < L * 0.34; gz += 3) {
var ht = HU.half(gz / (L / 2));
if (ht < B * 0.38)
continue;
guns++;
if (o.shut || lite && guns % 2)
continue;
[-1, 1].forEach(function (s) { var gb = prwCyl(0.11, 0.15, 1.2, 0x141414, s * (ht + 0.35), gy, gz - 0.1, g, 8); gb.rotation.z = Math.PI / 2; });
}
var stem = L / 2, sy = HU.rail(1);
for (var hr = 0; hr < 2; hr++)
[-1, 1].forEach(function (s) { var rl = prwBox(0.12, 0.12, L * 0.1, wood, s * B * 0.12, sy - 0.6 - hr * 0.5, stem + L * 0.04, g); rl.rotation.x = -0.35; rl.rotation.y = -s * 0.3; });
var fg = new THREE.Group();
fg.position.set(0, sy - 0.7, stem + L * 0.06);
fg.rotation.x = -0.5;
g.add(fg);
var fcol = o.figure != null ? o.figure : 0xC8A048;
var fbody = prwCyl(0.28, 0.4, 1.6, fcol, 0, 0, 0, fg, 8);
prwSph(0.3, fcol, 0, 1.0, 0.05, fg, 10);
var fw = prwCone(0.5, 1.3, fcol, 0, 0.2, -0.4, fg, 6);
fw.rotation.x = 0.8;
[-1, 1].forEach(function (s) { var ch = prwBox(0.35, 0.35, 1.6, wood, s * B * 0.42, sy - 0.3, L * 0.38, g); ch.rotation.y = s * 0.5; var an = new THREE.Group(); an.position.set(s * B * 0.52, sy - 1.6, L * 0.4); g.add(an); prwCyl(0.07, 0.07, 2.2, 0x2A2A2E, 0, 0, 0, an, 6); var arm = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 6, 12, Math.PI), prwMat(0x2A2A2E)); arm.position.y = -1.0; arm.rotation.z = Math.PI; an.add(arm); prwBox(1.4, 0.1, 0.1, 0x5A3A1E, 0, 1.0, 0, an); });
var bsl = L * 0.42, bs = prwCyl(0.16, 0.3, bsl, wood, 0, sy + 0.4 + Math.cos(1.2) * bsl / 2 * 0.2, stem + Math.sin(1.2) * bsl / 2 - 0.6, g, 8);
bs.rotation.x = 1.2;
var jbl = bsl * 0.6, jb = prwCyl(0.08, 0.14, jbl, wood, 0, sy + 0.4 + Math.cos(1.2) * bsl * 0.92, stem + Math.sin(1.2) * bsl * 0.92 - 0.6, g, 6);
jb.rotation.x = 1.25;
var bowTip = { x: 0, y: sy + 0.4 + Math.cos(1.2) * bsl * 1.15, z: stem + Math.sin(1.2) * bsl * 1.15 - 0.6 };
if (!lite) {
for (var h = 0; h < (kind === "sloop" ? 1 : 3); h++) {
var hz = -L * 0.08 + h * L * 0.16;
prwBox(B * 0.3, 0.3, 1.8, 0x5A3A1E, 0, dy + 0.25, hz, g);
var gr = prwBox(B * 0.28, 0.05, 1.7, 0x2A1E14, 0, dy + 0.42, hz, g);
}
var cap = prwCyl(0.45, 0.55, 1.0, 0x5A3A1E, 0, dy + 0.6, -L * 0.18, g, 10);
for (var bar = 0; bar < 4; bar++) {
var cb = prwBox(2.4, 0.07, 0.07, 0x8A6A42, 0, dy + 1.0, -L * 0.18, g);
cb.rotation.y = bar * Math.PI / 4;
}
if (kind === "sloop") {
var til = prwBox(0.12, 0.12, 2.6, 0x8A6A42, 0, dy + 0.8, -L * 0.42, g);
til.rotation.x = 0.18;
}
else {
var wz = qz - L * qd * 0.12, wh = new THREE.Group();
wh.position.set(0, dy + qh + 1.15, wz);
g.add(wh);
var wm = prwMat(0x7A5432), wd = prwMat(0x4A3018), brass = prwMat(0xC8A048);
[-0.34, 0.34].forEach(function (dz) {
var w1 = new THREE.Group();
w1.position.z = dz;
wh.add(w1);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.055, 8, 28), wm);
w1.add(rim);
var rin = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 6, 18), wm);
w1.add(rin);
var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.16, 12), brass);
hub.rotation.x = Math.PI / 2;
w1.add(hub);
for (var sp = 0; sp < 10; sp++) {
var a = sp * Math.PI / 5, spk = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.04, 0.62, 6), wm);
spk.position.set(Math.sin(a) * 0.33, Math.cos(a) * 0.33, 0);
spk.rotation.z = -a;
w1.add(spk);
var hd = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.26, 6), wd);
hd.position.set(Math.sin(a) * 0.8, Math.cos(a) * 0.8, 0);
hd.rotation.z = -a;
w1.add(hd);
}
});
var barrel = prwCyl(0.2, 0.2, 0.66, 0x5A3A1E, 0, 0, 0, wh, 12);
barrel.rotation.x = Math.PI / 2;
prwLay(barrel, "plank", 0x8A6A42, { tile: 0.6 });
[-0.34, 0.34].forEach(function (dx) { var st = prwBox(0.12, 1.25, 0.3, 0x5A3A1E, dx, -0.55, 0, wh); prwLay(st, "plank", 0x8A6A42, { tile: 0.6 }); prwSph(0.08, 0xC8A048, dx, 0.16, 0, wh, 8); });
var bn = prwBox(0.5, 1.0, 0.5, 0x5A3A1E, 0, dy + qh + 0.6, wz + 1.1, g);
prwLay(bn, "plank", 0x8A6A42, { tile: 0.6 });
prwCyl(0.24, 0.26, 0.22, 0xC8A048, 0, dy + qh + 1.2, wz + 1.1, g, 14);
}
if (kind !== "sloop") {
var sb = new THREE.Group();
sb.position.set(0, dy + 0.75, L * 0.06);
g.add(sb);
var bh2 = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), prwMat(0x6A4A2A, { ds: 1 }));
bh2.scale.set(0.9, 0.55, 2.6);
bh2.rotation.x = Math.PI;
bh2.position.y = 0.55;
sb.add(bh2);
prwLay(bh2, "plank", 0xE8E0D0, { tile: 0.8, ds: 1 });
[-1.2, 1.2].forEach(function (z) { prwBox(0.2, 1.0, 0.2, 0x3A2A1A, 0, 0, z, sb); });
}
[-1, 1].forEach(function (s) { for (var r2 = 0; r2 < L * 0.8 / 1.6; r2++) {
var rz = -L * 0.38 + r2 * 1.6, rt = HU.rail(rz / (L / 2));
prwBox(0.08, 0.06, 1.6, 0x2A1E14, s * HU.half(rz / (L / 2)) * 0.98, rt + 0.03, rz, g);
} });
}
var sailM = prwTexMat(o.sails != null ? o.sails : 0xF4EEE0, "sail", { ds: 1 }), mastM = "plank", furl = !!o.furled, lines = [], live = [], liveFA = function (m) { if (o.live) {
m.userData.keep = 1;
m.userData.fa = 1;
live.push(m);
} return m; };
var masts = kind === "sloop" ? [[0.12, L * 1.05]] : kind === "brig" ? [[0.2, L * 0.95], [-0.14, L * 1.0]] : [[0.3, L * 0.82], [0.04, L * 0.92], [-0.27, L * 0.66]];
masts.forEach(function (m, mi) {
var mz = m[0] * L, mh = m[1], lower = mh * 0.58, topm = mh * 0.42;
var lm = prwCyl(0.2, 0.32, lower, wood, 0, dy + lower / 2, mz, g, 10);
prwLay(lm, "plank", 0xB89A70, { tile: 1.5 });
var tm = prwCyl(0.12, 0.18, topm, wood, 0, dy + lower + topm / 2 - 0.6, mz, g, 8);
prwLay(tm, "plank", 0xB89A70, { tile: 1.5 });
var top = prwBox(B * 0.42, 0.18, B * 0.28, 0x3A2A1A, 0, dy + lower - 0.4, mz, g);
prwLay(top, "plank", 0x8A7050, { tile: 1 });
prwBox(B * 0.42, 0.5, 0.06, 0x2A1E14, 0, dy + lower - 0.1, mz - B * 0.14, g);
prwBox(0.5, 0.5, 0.6, 0x3A2A1A, 0, dy + mh - 0.5, mz, g);
if (kind === "sloop") {
var bm = prwCyl(0.12, 0.12, L * 0.58, wood, 0, dy + 2.2, mz - L * 0.28, g, 6);
bm.rotation.x = Math.PI / 2;
var gf = prwCyl(0.1, 0.1, L * 0.42, wood, 0, dy + mh * 0.74, mz - L * 0.2, g, 6);
gf.rotation.x = Math.PI / 2 - 0.35;
if (!furl) {
var sg = new THREE.BufferGeometry(), A = [0, dy + 2.4, mz - 0.3], Bp = [0, dy + 2.4, mz - L * 0.56], C = [0, dy + mh * 0.62, mz - L * 0.4], D = [0, dy + mh * 0.86, mz - 0.3], ps = [], us = [];
for (var i = 0; i <= 4; i++)
for (var j = 0; j <= 4; j++) {
var u = i / 4, v = j / 4, x0 = A.map(function (a, k) { return a + (Bp[k] - a) * u; }), x1 = D.map(function (a, k) { return a + (C[k] - a) * u; }), pp = x0.map(function (a, k) { return a + (x1[k] - a) * v; });
pp[0] += Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * 1.6;
ps.push(pp[0], pp[1], pp[2]);
us.push(pp[2] / 4, pp[1] / 4);
}
var id = [];
for (var i2 = 0; i2 < 4; i2++)
for (var j2 = 0; j2 < 4; j2++) {
var a = i2 * 5 + j2;
id.push(a, a + 5, a + 1, a + 1, a + 5, a + 6);
}
sg.setAttribute("position", new THREE.Float32BufferAttribute(ps, 3));
sg.setAttribute("uv", new THREE.Float32BufferAttribute(us, 2));
sg.setIndex(id);
sg.computeVertexNormals();
g.add(liveFA(new THREE.Mesh(sg, sailM)));
var jg = new THREE.BufferGeometry();
jg.setAttribute("position", new THREE.Float32BufferAttribute([0, dy + mh * 0.8, mz + 0.3, bowTip.x, bowTip.y, bowTip.z, 0.6, dy + 1.6, mz + L * 0.12], 3));
jg.setAttribute("uv", new THREE.Float32BufferAttribute([0, mh * 0.2, L * 0.12, 0, 0.4, 0], 2));
jg.computeVertexNormals();
g.add(liveFA(new THREE.Mesh(jg, sailM)));
}
else {
var fs = prwCyl(0.38, 0.3, L * 0.52, 0xE8E0C8, 0, dy + 2.5, mz - L * 0.28, g, 8);
fs.rotation.x = Math.PI / 2;
prwLay(fs, "sail", 0xF4EEE0, { tile: 2 });
}
lines.push(0, dy + mh * 0.95, mz, bowTip.x, bowTip.y, bowTip.z);
}
else {
var nyd = mi === 2 && kind !== "brig" ? 2 : 3;
for (var y = 0; y < nyd; y++) {
var yy = dy + mh * (0.34 + y * 0.25), yw = B * (1.95 - y * 0.45);
var yd = prwCyl(0.09, 0.14, yw, wood, 0, yy + mh * 0.11, mz, g, 6);
yd.rotation.z = Math.PI / 2;
if (furl) {
var fu = prwCyl(0.3, 0.3, yw * 0.88, 0xE8E0C8, 0, yy + mh * 0.1 - 0.25, mz, g, 8);
fu.rotation.z = Math.PI / 2;
prwLay(fu, "sail", 0xF4EEE0, { tile: 2 });
continue;
}
var sh = mh * 0.23, s = new THREE.Mesh(prwSailGeo(yw * 0.86, yw * 0.94, sh, yw * 0.12), sailM);
s.position.set(0, yy + mh * 0.11 - sh / 2, mz + 0.3);
g.add(s);
if (o.live) {
s.userData.keep = 1;
s.userData.sailH = sh;
live.push(s);
}
}
if (mi === 0)
lines.push(0, dy + lower, mz, bowTip.x, bowTip.y, bowTip.z, 0, dy + mh * 0.95, mz, bowTip.x, bowTip.y, bowTip.z);
if (mi === 0 && !furl) {
[[0.92, 1.0, 0.55], [0.62, 0.55, 0.2]].forEach(function (J) {
var top = [0, dy + mh * J[0] * 0.86, mz + 0.3], tip = [bowTip.x, sy + 0.4 + (bowTip.y - sy - 0.4) * J[1], L / 2 + (bowTip.z - L / 2) * J[1]], ft = [0, sy + 0.9, L / 2 - 1.2 - J[2] * L * 0.1];
var jg = new THREE.BufferGeometry();
jg.setAttribute("position", new THREE.Float32BufferAttribute(top.concat(tip, ft), 3));
jg.setAttribute("uv", new THREE.Float32BufferAttribute([0, mh * 0.2, L * 0.12, 0, 0.4, 0], 2));
jg.computeVertexNormals();
g.add(liveFA(new THREE.Mesh(jg, sailM)));
});
}
if (mi === masts.length - 1 && !furl) {
var sfy = kind === "sloop" ? dy + 2.6 : dy + qh + 3.2;
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute([0, sfy, mz - 0.3, 0, sfy, mz - L * 0.22, 0, dy + mh * 0.6, mz - 0.3], 3));
var sbm = prwCyl(0.1, 0.12, L * 0.23, wood, 0, sfy - 0.1, mz - L * 0.11, g, 6);
sbm.rotation.x = Math.PI / 2;
lg.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, L * 0.22 / 4, 0, 0, mh * 0.6 / 4], 2));
lg.computeVertexNormals();
g.add(liveFA(new THREE.Mesh(lg, sailM)));
}
}
if (mi > 0)
lines.push(0, dy + mh * 0.9, mz, 0, dy + masts[mi - 1][1] * 0.55, masts[mi - 1][0] * L);
var hb = HU.half(mz / (L / 2)) * 0.98, chT = HU.rail(mz / (L / 2)), topY = dy + lower - 0.4;
[-1, 1].forEach(function (s) {
var feet = [];
for (var k = 0; k < (lite ? 3 : 5); k++) {
var fz = mz - 1.2 + k * 0.6;
feet.push([s * hb, chT, fz]);
lines.push(s * hb, chT, fz, s * B * 0.2, topY, mz);
}
if (!lite)
for (var rl = 0.4; rl < topY - chT - 0.3; rl += 0.42) {
var f = rl / (topY - chT), a = feet[0], b = feet[feet.length - 1];
lines.push(a[0] + (s * B * 0.2 - a[0]) * f, a[1] + rl, a[2] + (mz - a[2]) * f, b[0] + (s * B * 0.2 - b[0]) * f, b[1] + rl, b[2] + (mz - b[2]) * f);
}
lines.push(s * B * 0.2, topY, mz, s * hb * 0.9, chT, mz - L * 0.12, s * B * 0.12, dy + mh * 0.92, mz, s * hb, chT, mz - 3);
});
});
var tp = masts[masts.length - 1], fl = prwFlag(o.flag || "eng", L * 0.1, L * 0.064);
fl.position.set(0, dy + tp[1] + 0.3, tp[0] * L);
g.add(fl);
g.userData.flag = fl;
if (!lite) {
var pen = new THREE.Mesh(new THREE.PlaneGeometry(L * 0.12, 0.3), prwMat(0xB02A20, { ds: 1 }));
pen.geometry.translate(L * 0.06, 0, 0);
pen.position.set(0, dy + masts[0][1] + 0.3, masts[0][0] * L);
pen.userData.keep = 1;
g.add(pen);
}
var lgeo = new THREE.BufferGeometry();
lgeo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
g.add(new THREE.LineSegments(lgeo, PRW.lineMat || (PRW.lineMat = new THREE.LineBasicMaterial({ color: 0x1E1812 }))));
PRW.lineMat.userData.ldShared = 1;
if (typeof ctnMerge === "function" && typeof CTN_TM !== "undefined")
try {
ctnMerge(g);
}
catch (e) {
if (window.console)
console.warn("[prw] ship merge", e);
}
g.userData.L = L;
g.userData.B = B;
g.userData.H = H;
g.userData.dy = dy;
g.userData.sails = live;
g.userData.qd = { y: kind !== "sloop" ? dy + qh + 0.2 : dy + 0.11, z: kind !== "sloop" ? qz - L * qd * 0.12 - 1.0 : -L * 0.42 + 1.6 };
return g;
},
function (x, R) {
x.fillStyle = "#5A4836";
x.fillRect(0, 0, 512, 512);
for (var i = 0; i < 260; i++) {
var bx = R() * 512, w = 3 + R() * 10, v = 70 + R() * 70;
x.fillStyle = prwRgb(v, v * 0.82, v * 0.64);
x.fillRect(bx, 0, w, 512);
for (var k = 0; k < 6; k++) {
x.fillStyle = "rgba(20,14,8,0.5)";
x.fillRect(bx, R() * 512, w, 2 + R() * 4);
}
}
prwNoise(x, R, 8000, 0.2, 0.08, 1.6);
prwBlot(x, R, 12, "rgba(80,100,50,0.25)", 14, 50);
},
function (x, R) {
x.fillStyle = "#8A7254";
x.fillRect(0, 0, 512, 512);
for (var r = 0; r < 16; r++) {
var y = r * 32, g = x.createLinearGradient(0, y, 0, y + 32);
g.addColorStop(0, "#A08A68");
g.addColorStop(0.7, "#7A6448");
g.addColorStop(1, "#3A2E22");
x.fillStyle = g;
x.fillRect(0, y, 512, 32);
for (var k = 0; k < 40; k++) {
x.fillStyle = "rgba(40,30,20," + (0.2 + R() * 0.3) + ")";
x.fillRect(R() * 512, y + R() * 30, 8 + R() * 30, 1.4);
}
}
prwNoise(x, R, 6000, 0.15, 0.08, 1.4);
},
function (x, R) {
x.clearRect(0, 0, 512, 512);
x.strokeStyle = "#6A5A2A";
x.lineWidth = 6;
x.beginPath();
x.moveTo(256, 512);
x.lineTo(256, 0);
x.stroke();
for (var i = 0; i < 70; i++) {
var y = 512 - i * 7.3, len = 200 * Math.sin(Math.min(1, (i + 4) / 70) * Math.PI * 0.85) + 20;
[-1, 1].forEach(function (s) {
var v = 90 + R() * 60, g = prwRgb(40 + R() * 30, v, 30 + R() * 20);
x.strokeStyle = g;
x.lineWidth = 5.5;
x.beginPath();
x.moveTo(256, y);
x.quadraticCurveTo(256 + s * len * 0.5, y - 24, 256 + s * len, y - 14 - R() * 20);
x.stroke();
x.strokeStyle = "rgba(200,220,120,0.25)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(256, y);
x.quadraticCurveTo(256 + s * len * 0.5, y - 24, 256 + s * len, y - 14);
x.stroke();
});
}
},
function (x, R) {
x.fillStyle = "#24361E";
x.fillRect(0, 0, 512, 512);
for (var i = 0; i < 5200; i++) {
var px = R() * 512, py = R() * 512, v = 50 + R() * 70;
x.strokeStyle = prwRgb(v * 0.6, v, v * 0.5, 0.9);
x.lineWidth = 1.3;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (R() - 0.5) * 10, py + 6 + R() * 8);
x.stroke();
}
prwBlot(x, R, 20, "rgba(0,0,0,0.25)", 20, 60);
},
function (x, R) {
x.fillStyle = "#34482A";
x.fillRect(0, 0, 512, 512);
for (var i = 0; i < 3000; i++) {
var px = R() * 512, py = R() * 512, v = 60 + R() * 90;
x.fillStyle = prwRgb(v * 0.7, v, v * 0.45, 0.85);
x.beginPath();
x.ellipse(px, py, 3 + R() * 4, 2 + R() * 2.5, R() * 3, 0, Math.PI * 2);
x.fill();
}
prwBlot(x, R, 24, "rgba(0,0,0,0.28)", 20, 70);
prwBlot(x, R, 14, "rgba(220,230,150,0.12)", 14, 50);
},
function (len, wid, droop) {
var n = 8, pos = [], uv = [], idx = [];
for (var i = 0; i <= n; i++) {
var t = i / n, a = t * droop, z = Math.sin(a) / Math.max(0.01, droop) * len, y = (Math.cos(a) - 1) / Math.max(0.01, droop) * len * 0.9 + t * len * 0.25, w = wid * (0.35 + 0.65 * Math.sin(Math.min(1, t * 1.2 + 0.1) * Math.PI * 0.9));
pos.push(-w / 2, y - Math.abs(w) * 0.12, z, w / 2, y - Math.abs(w) * 0.12, z, 0, y + 0.04, z);
uv.push(0, t, 1, t, 0.5, t);
}
for (var j = 0; j < n; j++) {
var a2 = j * 3;
idx.push(a2, a2 + 3, a2 + 2, a2 + 2, a2 + 3, a2 + 5, a2 + 2, a2 + 5, a2 + 1, a2 + 1, a2 + 5, a2 + 4);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function (g, x, y, z, R) {
if (PRW.curPort && typeof PRW_COLD !== "undefined" && PRW_COLD[PRW.curPort.k]) {
if (R() < 0.5)
tiOak(g, x, y, z, R);
else
tiPine(g, x, y, z, R, 0.9);
return;
}
var q = new THREE.Group(), lean = (R() - 0.5) * 0.6, hgt = 7 + R() * 5, seg = PRW.lite ? 4 : 7, px = 0, py = 0;
for (var i = 0; i < seg; i++) {
var t = i / seg, bend = lean * (0.3 + t * 1.1), l = hgt / seg;
var s = prwCyl(0.26 - t * 0.08, 0.34 - t * 0.08, l * 1.05, 0x8A6A42, px + Math.sin(bend) * l / 2, py + Math.cos(bend) * l / 2, 0, q, 8);
s.rotation.z = -bend;
prwLay(s, "palmbark", 0xFFFFFF);
px += Math.sin(bend) * l;
py += Math.cos(bend) * l;
}
var top = new THREE.Vector3(px, py, 0), fm = prwFrondMat(), nf = PRW.lite ? 7 : 11;
prwSph(0.45, 0x5A4A2A, top.x, top.y - 0.2, 0, q, 8);
if (!PRW.lite)
for (var c = 0; c < 5; c++)
prwSph(0.16, 0x6A5A22, top.x + Math.cos(c * 1.3) * 0.3, top.y - 0.55, Math.sin(c * 1.3) * 0.3, q, 6);
for (var f = 0; f < nf; f++) {
var lf = new THREE.Mesh(prwFrondGeo(3.6 + R() * 1.4, 1.5 + R() * 0.4, 1.2 + R() * 0.8 + (f % 3 ? 0 : 0.6)), fm);
lf.position.copy(top);
lf.rotation.y = f / nf * Math.PI * 2 + R() * 0.3;
lf.rotateX(-0.15 - R() * 0.35);
lf.userData.keep = 1;
q.add(lf);
}
q.position.set(x, y, z);
q.rotation.y = R() * 6;
g.add(q);
return q;
},
function (g, x, y, z, R, k) {
var s = (0.8 + R() * 0.6) * (k || 1), hgt = 11 * s;
var tr = prwCyl(0.22 * s, 0.34 * s, hgt * 0.72, k > 2 ? 0x8A3A22 : 0x5A4232, x, y + hgt * 0.36, z, g, 7);
prwLay(tr, "bark", k > 2 ? 0xD08A70 : 0xFFFFFF);
var nl = PRW.lite ? 3 : 5;
for (var i = 0; i < nl; i++) {
var r = (2.9 - i * 0.48) * s, c = prwCone(r, 3.0 * s, i % 2 ? 0x3E5A36 : 0x4A6A40, x + (R() - 0.5) * 0.3, y + hgt * 0.42 + i * 1.5 * s, z + (R() - 0.5) * 0.3, g, 9);
c.rotation.y = R() * 6;
prwLay(c, "needles", 0xFFFFFF);
}
},
function (g, x, y, z, R) {
var s = 0.8 + R() * 0.5, tr = prwCyl(0.3 * s, 0.5 * s, 3.4 * s, 0x4A3A2A, x, y + 1.7 * s, z, g, 7);
prwLay(tr, "bark", 0xFFFFFF);
var nb = PRW.lite ? 2 : 5;
for (var i = 0; i < nb; i++) {
var a = i / nb * 6.28 + R(), d = i ? 1.6 * s : 0, c = prwSph((i ? 2.1 : 2.8) * s, R() < 0.5 ? 0xFFFFFF : 0xE8F0D8, x + Math.cos(a) * d, y + 4.4 * s + (i ? R() * 1.2 - 0.3 : 0.6) * s, z + Math.sin(a) * d, g, 8);
c.scale.set(1.2, 0.8, 1.15);
prwLay(c, "leafy", R() < 0.5 ? 0xFFFFFF : 0xD8E0C0);
}
},
function (x, R) {
x.fillStyle = "#E4E0D8";
x.fillRect(0, 0, 512, 512);
prwBlot(x, R, 40, "rgba(120,110,90,0.16)", 20, 90);
prwBlot(x, R, 30, "rgba(255,255,255,0.16)", 20, 80);
for (var i = 0; i < 14000; i++) {
var px = R() * 512, py = R() * 512, v = 95 + R() * 150;
x.strokeStyle = prwRgb(v * 0.92, v, v * 0.8, 0.7);
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (R() - 0.5) * 4, py - 3 - R() * 7);
x.stroke();
}
for (var s = 0; s < 260; s++) {
var sx = R() * 512, sy = R() * 512, r = 1.5 + R() * 3.5, v2 = 150 + R() * 80;
x.fillStyle = prwRgb(v2, v2 * 0.97, v2 * 0.92);
x.beginPath();
x.ellipse(sx, sy, r, r * 0.7, R() * 3, 0, Math.PI * 2);
x.fill();
x.fillStyle = "rgba(0,0,0,0.25)";
x.beginPath();
x.ellipse(sx + 0.8, sy + 0.8, r, r * 0.6, 0, 0, Math.PI * 2);
x.fill();
}
prwNoise(x, R, 12000, 0.16, 0.10, 1.4);
},
function (gr, s) {
try {
var g = gr.geometry, uv = g.attributes.uv, rep = s / 3.5;
if (uv) {
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * rep, uv.getY(i) * rep);
uv.needsUpdate = true;
}
gr.material.map = prwTex("ground");
gr.material.color = new THREE.Color(1.08, 1.08, 1.08);
gr.material.needsUpdate = true;
}
catch (e) { }
return gr;
},
function (s) {
if (!s || s.userData.prwLook)
return;
s.userData.prwLook = 1;
s.traverse(function (o) {
if (!o.isMesh || o === SEA.flag || !o.material || !o.material.color || o.material.map || o.material.transparent)
return;
var p0 = o;
while (p0 && p0 !== s) {
if (p0 === s.userData.prw)
return;
p0 = p0.parent;
}
var c = o.material.color, hex = c.getHex(), gp = o.geometry && o.geometry.parameters, big = gp && Math.max(gp.width || 0, gp.height || 0, gp.depth || 0, (gp.radiusTop || 0) * 2) > 1.2;
if (o.geometry && o.geometry.type === "PlaneGeometry" && gp && gp.width > 3) {
o.material = prwTexMat(hex, "sail", { ds: 1 });
return;
}
if (big && c.r >= c.b && (c.r + c.g + c.b) / 3 < 0.62 && o.geometry.type !== "SphereGeometry")
prwLay(o, "plank", blendHex(hex, 0xFFFFFF, 0.12), { tile: 2 });
});
},
function (dt) {
var W = PRW.wind;
W.t += dt;
var base = 67 + Math.sin(W.t * 0.004) * 22 + Math.sin(W.t * 0.0013 + 1) * 14, st = SEA.storm || 0;
W.from = (base - st * 40 + 360) % 360;
PRW_SEA.gust = Math.max(0, Math.sin(W.t * 0.09) * Math.sin(W.t * 0.031 + 2)) * 6;
W.kn = 11 + Math.sin(W.t * 0.002) * 4 + PRW_SEA.gust + st * 22;
},
function (s) {
if (!s)
return [];
if (s.userData.prwSails)
return s.userData.prwSails;
var L = [];
s.traverse(function (o) {
if (o.isMesh && o !== SEA.flag && o.geometry && o.geometry.type === "PlaneGeometry" && o.geometry.parameters && o.geometry.parameters.width > 3) {
var p = o.parent, inPrw = false;
while (p && p !== s) {
if (p === s.userData.prw)
inPrw = true;
p = p.parent;
}
if (inPrw)
return;
o.userData.sail0 = { sy: o.scale.y, sx: o.scale.x, y: o.position.y, ry: o.rotation.y, h: o.geometry.parameters.height };
L.push(o);
}
});
L.sort(function (a, b) { return a.userData.sail0.y - b.userData.sail0.y; });
var ys = L.map(function (o) { return o.userData.sail0.y; }), mid = (Math.min.apply(null, ys.concat([0])) + Math.max.apply(null, ys.concat([0]))) / 2;
L.forEach(function (o) { o.userData.top = o.userData.sail0.y >= mid; });
s.userData.prwSails = L;
return L;
},
function (dt) {
var s = SEA.ship, L = prwSailsOf(s);
if (!L.length)
return;
var on = prwSeaOn(), lv = on ? PRW_SEA.cur : 3, off = prwOff(), ba = { sharp: 0.55, reach: 0.3, square: 0, aback: 0.55 }[PRW_SEA.brace] || 0, sign = off.d > 0 ? -1 : 1;
L.forEach(function (o) {
var u = o.userData.sail0, want = on ? (o.userData.top ? (lv >= 2 ? 1 : lv >= 1 ? 0.62 : 0.08) : (lv >= 3 ? 1 : 0.08)) : 1;
if (on && PRW_SEA.lost && o.userData.top && o.userData.sail0.y === L[L.length - 1].userData.sail0.y)
want = 0.0001;
o.userData.f = (o.userData.f == null ? want : o.userData.f) + (want - (o.userData.f == null ? want : o.userData.f)) * Math.min(1, dt * 0.9);
var f = o.userData.f;
o.scale.y = u.sy * Math.max(0.02, f);
o.scale.x = u.sx * (on && lv >= 4 ? 1.12 : 1);
o.position.y = u.y + u.h * u.sy * (1 - f) / 2;
o.rotation.y = u.ry + (on ? sign * ba * (PRW_SEA.brace === "aback" && o.userData.top ? -1 : 1) : 0);
o.visible = f > 0.03;
});
},
function () { var d = -seaHeight(SEA.sx, SEA.sz); if (d >= 29.5) {
PRW_SEA.said.anchorNo = 1;
return null;
} if (PRW_SEA.cur > 1.5 && SEA.v > 8) {
PRW_SEA.set = 0;
SEA.v *= 0.4;
return "the cable smokes as it runs out, and holds; next time take the way off her first";
} PRW_SEA.anchor = true; PRW_SEA.set = 0; return "the anchor bites in " + Math.round(Math.max(3, d) / 1.83) + " fathoms"; },
function () { prwBeat("Heave round the capstan", "Press <b>E</b> (or the button) when the marker is in the green: push the bars round together.", 5, 0.85, function (ok) { PRW_SEA.anchor = false; prwSeaSay(ok ? "Anchor's aweigh! Up and down, and away!" : "Anchor's aweigh, at last. Your arms ache."); prwSeaLearn("weigh"); }); return "capstan manned"; },
function () {
var best = null;
(PRW_SAIL.ships || []).forEach(function (S) { if (!S.at)
return; var d = Math.hypot(S.at.x - SEA.sx, S.at.z - SEA.sz); if (d < 9000 && (!best || d < best.d))
best = { S: S, d: d }; });
if (!best)
return "\"Nothing in sight, sir! Only the sea.\"";
var b = (Math.atan2(best.S.at.x - SEA.sx, -(best.S.at.z - SEA.sz)) * 180 / Math.PI + 360) % 360, rel = ((b - prwBear(SEA.h) + 540) % 360) - 180;
return "\"Sail ho! " + (Math.abs(rel) < 20 ? "Dead ahead" : Math.abs(rel) > 160 ? "Right astern" : (Math.abs(rel) < 70 ? "Broad on the " : Math.abs(rel) < 110 ? "Abeam to " : "On the ") + (rel > 0 ? "starboard" : "larboard") + (Math.abs(rel) < 70 ? " bow" : Math.abs(rel) < 110 ? "" : " quarter")) + ", " + (best.d / 1852 * 2.4).toFixed(0) + " miles! " + (best.S.side === "navy" ? "A man-of-war, by her look!" : best.S.side === "pirate" ? "She's flying black!" : best.S.side === "fleet" || best.S.side === "spain" ? "A Spaniard, deep-laden!" : "A merchantman!") + "\"";
},
function (k) {
var O = PRW_OBY[k];
if (!O)
return;
if (!prwSeaOn()) {
setStatus("Orders are given aboard, in the pirates' waters.");
return;
}
if (!O.can()) {
setStatus("🗣️ \"" + O.say + "\" <i>… \"Begging your pardon, sir, that's done already.\"</i>");
return;
}
var r = O.go();
if (r === null) {
if (k === "anchor")
setStatus("🗣️ \"Let go the anchor!\" <i>\"No bottom, sir! No bottom with this line!\"</i> Too deep here: find shallower water near land.");
return;
}
prwWhistle();
prwSeaLearn(k);
prwSeaSeen("orders", 1);
setStatus("🗣️ <b>\"" + O.say + "\"</b> <i>\"" + O.reply + "\"</i>" + (r ? " · " + prwEsc(r) : ""));
if (PRW_SEA.school)
prwSchoolCheck(k);
},
function (dt) {
prwWindTick(dt);
var T = PRW_SEA, W = PRW.wind, rig = prwRig(), o = prwOff();
T.wkeyT = Math.max(0, T.wkeyT - dt);
var f = 0, s = 0;
if (keys["KeyW"] || keys["ArrowUp"])
f = 1;
if (keys["KeyS"] || keys["ArrowDown"])
f = -1;
if (keys["KeyA"] || keys["ArrowLeft"])
s = -1;
if (keys["KeyD"] || keys["ArrowRight"])
s = 1;
var jv = (typeof joyInput === "function" && joyInput()) || (typeof padInput === "function" && padInput());
if (jv && !f && !s) {
f = Math.abs(jv.f) > 0.6 ? Math.sign(jv.f) : 0;
s = Math.abs(jv.s) > 0.2 ? jv.s : 0;
}
if (f && T.wkeyT <= 0) {
T.wkeyT = 1.2;
prwOrder(f > 0 ? "make" : "shorten");
}
T.cur += (T.set - T.cur) * Math.min(1, dt * 0.35);
if (Math.abs(T.set - T.cur) < 0.02)
T.cur = T.set;
var close = rig.close, a = o.a, drive;
if (a < close - 8)
drive = 0;
else if (a < close + 12)
drive = 0.45 + (a - close + 8) / 20 * 0.25;
else if (a < 90)
drive = 0.7 + (a - close - 12) / (90 - close - 12) * 0.2;
else if (a < 135)
drive = 0.9 + (a - 90) / 45 * 0.1;
else
drive = 1 - (a - 135) / 45 * 0.18;
var want = prwBraceFor(a), bf = T.brace === "aback" ? 0 : (T.brace === want ? 1 : (T.brace === "reach" || want === "reach") ? 0.72 : 0.42);
var lvlF = [0.06, 0.42, 0.62, 0.86, 1][Math.max(0, Math.min(4, Math.round(T.cur)))] * (Math.round(T.cur) === 4 && a < 100 ? 0.88 : 1);
var wf = Math.max(0.35, Math.min(1.5, W.kn / 14)), Sx = prwS(), hullF = Sx.own && Sx.own.upg && Sx.own.upg.copper ? 1.1 : 1, lostF = T.lost ? 0.78 : 1;
var target = 20 * drive * bf * lvlF * wf * hullF * lostF;
if (T.heave)
target = 0.4;
if (T.anchor)
target = 0;
if (a < close - 8 && !T.tack && !T.wear) {
target = Math.min(target, 0.3);
SEA.h += (o.d > 0 ? -1 : 1) * dt * 0.04;
if (!T.said.irons) {
T.said.irons = 1;
prwSeaSay("<b>In irons!</b> Her head is right into the wind and the sails are flat aback. She will not answer the helm. Bear away (A or D) till the sails fill, or let her fall off.");
}
}
else
T.said.irons = 0;
if (T.anchor)
SEA.v *= Math.max(0, 1 - dt * 1.5);
else if (!T.tack)
SEA.v += (target - SEA.v) * Math.min(1, dt * (target < SEA.v ? 0.18 : 0.1));
if (!T.anchor) {
var rate = 0.32 * Math.min(1, Math.abs(SEA.v) / 5 + 0.12);
if (T.tack || T.wear)
rate = Math.max(rate, 0.16);
SEA.h -= s * dt * rate;
}
if (T.tack) {
var K = T.tack, o2 = prwOff(), crossed = (o2.d > 0 ? 1 : -1) !== K.s0;
K.t += dt;
if (!(crossed && o2.a >= close - 4)) {
SEA.h += K.dir * dt * 0.16;
K.wait = 0;
}
SEA.v = Math.max(0, SEA.v - dt * 0.25);
if (!crossed && SEA.v < 1.0) {
T.tack = null;
prwSeaSay("<b>She's missed stays!</b> Too little way on her: she hangs head to wind in irons. Bear away, fill the sails and gather speed, then try again.");
}
else if (crossed && K.st === 1 && o2.a > 24) {
T.tack = null;
prwSeaSay("<b>She's missed stays!</b> Nobody hauled the main yards round as she came through the wind (<b>Mainsail haul!</b>), so the sails pressed her back. Bear away and try again.");
}
else if (crossed && o2.a >= close - 4 && K.st === 2) {
K.wait += dt;
if (K.wait > 7)
K.st = 3;
}
if (T.tack && K.st === 3) {
T.tack = null;
prwSeaSeen("tacks", 1);
var good = K.haulAt != null && K.haulAt < 26 && K.wait <= 7;
T.brace = "sharp";
prwSeaSay(good ? "<b>Smartly done!</b> She's round on the " + prwOff().side + " tack and gathering way. The old hands nod." : "She's round on the new tack: a little lubberly, but round.");
if (good)
prwSeaSeen("goodTacks", 1);
if (PRW_SEA.school)
prwSchoolCheck("tacked");
}
if (T.tack && K.t > 60) {
T.tack = null;
prwSeaSay("The tack has gone wrong and the crew stand waiting. Bear away and try again.");
}
}
if (T.wear) {
var Wr = T.wear, o3 = prwOff();
Wr.t += dt;
SEA.h += Wr.dir * dt * 0.14;
if (Wr.t > 3 && T.brace !== "square" && !((o3.d > 0 ? 1 : -1) !== Wr.s0))
T.brace = "square";
if ((o3.d > 0 ? 1 : -1) !== Wr.s0 && o3.a < close + 16) {
T.wear = null;
T.brace = "sharp";
prwSeaSeen("wears", 1);
prwSeaSay("Steady! She's worn round onto the " + o3.side + " tack. Brace up sharp: done.");
if (PRW_SEA.school)
prwSchoolCheck("wore");
}
else if (Wr.t > 60)
T.wear = null;
}
if (!T.lost && T.cur >= 3.2 && W.kn > 24 && Math.random() < dt * 0.04) {
T.lost = 1;
T.lostT = 90;
T.set = Math.min(T.set, 2);
if (typeof playTone === "function")
playTone(90, 0.6);
prwSeaSay("<b>Crack!</b> The fore topmast has carried away, too much sail in this wind! Wreckage over the side. The carpenter and the bosun will rig a jury mast; until then she can carry no more than topsails.");
}
if (T.lost) {
T.lostT -= dt;
if (T.lostT <= 0) {
T.lost = 0;
prwSeaSay("The jury topmast is up and stayed. She can carry all sail again.");
}
}
if (T.cleared) {
T.clearedT -= dt;
if (T.clearedT <= 0)
T.cleared = false;
}
if (T.logT > 0)
T.logT -= dt;
prwSeaS().miles += Math.abs(SEA.v) * 0.48 * dt / 3600;
var heelW = Math.sin(Math.min(Math.PI, a * Math.PI / 180)) * Math.min(1, T.cur / 3) * Math.min(1.4, W.kn / 16) * (T.heave ? 0.4 : 1);
T.heel += ((o.d > 0 ? 1 : -1) * heelW * 0.13 - T.heel) * Math.min(1, dt * 0.6);
},
function (dt) {
var s = SEA.ship;
if (!s || PRW.lite)
return;
var sp = s.userData.prwSpray;
if (!sp) {
var n = 60, g = new THREE.BufferGeometry(), p = new Float32Array(n * 3);
g.setAttribute("position", new THREE.BufferAttribute(p, 3));
sp = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xF4F8FF, size: 0.5, transparent: true, opacity: 0.8, depthWrite: false }));
sp.userData.v = new Float32Array(n * 3);
sp.userData.life = new Float32Array(n);
sp.frustumCulled = false;
s.add(sp);
s.userData.prwSpray = sp;
}
var P = sp.geometry.attributes.position, V = sp.userData.v, Lf = sp.userData.life, sp2 = Math.abs(SEA.v), rate = sp2 > 9 ? (sp2 - 9) * 6 : 0;
for (var i = 0; i < Lf.length; i++) {
if (Lf[i] > 0) {
Lf[i] -= dt;
V[i * 3 + 1] -= 9.8 * dt;
P.setXYZ(i, P.getX(i) + V[i * 3] * dt, P.getY(i) + V[i * 3 + 1] * dt, P.getZ(i) + V[i * 3 + 2] * dt);
if (Lf[i] <= 0)
P.setXYZ(i, 0, -50, 0);
}
else if (Math.random() < rate * dt / Lf.length * 10) {
Lf[i] = 0.8 + Math.random() * 0.5;
var sd = Math.random() < 0.5 ? -1 : 1;
P.setXYZ(i, sd * 1.2, 1.2, 15 + Math.random() * 2);
V[i * 3] = sd * (2 + Math.random() * 3);
V[i * 3 + 1] = 3 + Math.random() * 4;
V[i * 3 + 2] = -2 - Math.random() * 3;
}
}
P.needsUpdate = true;
sp.visible = PRW_SEA.on;
},
function () {
var el = document.getElementById("prw-rose");
if (!PRW_SEA.on) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("canvas");
el.id = "prw-rose";
el.width = el.height = 124;
el.style.cssText = "position:fixed;right:12px;top:118px;width:124px;height:124px;z-index:30;pointer-events:none;border-radius:50%;background:rgba(10,14,24,.55);box-shadow:0 0 0 1px rgba(255,231,176,.35)";
document.body.appendChild(el);
}
el.style.display = "block";
var x = el.getContext("2d"), c = 62, hb = prwBear(SEA.h), rad = function (d) { return (d - hb) * Math.PI / 180; };
x.clearRect(0, 0, 124, 124);
x.strokeStyle = "rgba(255,231,176,.5)";
x.lineWidth = 1;
x.beginPath();
x.arc(c, c, 54, 0, Math.PI * 2);
x.stroke();
x.fillStyle = "#FFE7B0";
x.font = "bold 11px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
["N", "E", "S", "W"].forEach(function (n, i) { var a = rad(i * 90); x.fillText(n, c + Math.sin(a) * 45, c - Math.cos(a) * 45); });
var rig = prwRig(), wa = rad(PRW.wind.from);
x.fillStyle = "rgba(220,90,70,.28)";
x.beginPath();
x.moveTo(c, c);
x.arc(c, c, 54, wa - Math.PI / 2 - rig.close * Math.PI / 180, wa - Math.PI / 2 + rig.close * Math.PI / 180);
x.closePath();
x.fill();
x.strokeStyle = "#9FD0FF";
x.fillStyle = "#9FD0FF";
x.lineWidth = 3;
var wx = Math.sin(wa), wy = -Math.cos(wa);
x.beginPath();
x.moveTo(c + wx * 52, c + wy * 52);
x.lineTo(c + wx * 18, c + wy * 18);
x.stroke();
x.beginPath();
x.moveTo(c + wx * 12, c + wy * 12);
x.lineTo(c + wx * 22 - wy * 6, c + wy * 22 + wx * 6);
x.lineTo(c + wx * 22 + wy * 6, c + wy * 22 - wx * 6);
x.fill();
x.fillStyle = "#E8D0A0";
x.beginPath();
x.moveTo(c, c - 16);
x.quadraticCurveTo(c + 7, c - 4, c + 5, c + 12);
x.lineTo(c - 5, c + 12);
x.quadraticCurveTo(c - 7, c - 4, c, c - 16);
x.fill();
x.fillStyle = "#FFE7B0";
x.font = "10px Georgia";
x.fillText(prwKnots().toFixed(1) + " kn", c, c + 26);
},
function () {
if (!prwSeaOn()) {
worldCard(worldFacts("⚓ Orders", "", [], ["Orders are given at the helm, in the pirates' waters."]));
return;
}
var Q = prwSeaS(), o = prwOff(), rig = prwRig(), h = worldFacts("⚓ Give your orders", "Wind " + prwPoint16(PRW.wind.from) + " " + Math.round(PRW.wind.kn) + " knots · " + prwPointOfSail(o.a, rig.close) + " · " + PRW_SETS[Math.round(PRW_SEA.cur)], [], []), fns = {};
var groups = [["Sail", ["make", "shorten", "reef", "furl"]], ["Yards", ["sharp", "reach", "square"]], ["Turning", ["about", "haul", "letgo", "wear"]], ["Stopping", ["heave", "anchor", "weigh"]], ["Ship's business", ["log", "masthead", "action", "colours", "strike"]]];
groups.forEach(function (G) {
h += "<div style='margin:8px 0 2px;color:#FFE7B0;font-weight:600'>" + G[0] + "</div>";
G[1].forEach(function (k) {
var O = PRW_OBY[k], ok = O.can(), learnt = !!Q.learned[k];
h += worldBtn("o_" + k, (learnt ? "" : "📘 ") + "\"" + O.say + "\"" + (O.keyHint ? " (" + O.keyHint + ")" : ""), ok ? prwEsc(O.what.slice(0, 110)) + (O.what.length > 110 ? "…" : "") : "(not now)");
fns["o_" + k] = function () { worldCard(null); prwOrder(k); };
});
});
h += worldBtn("o_school", "🎓 The sailing master's school", "Learn every order, its history, and pass his test");
fns.o_school = function () { prwSchool(); };
h += worldBtn("o_easy", "Simple sailing instead", "W and S just go faster and slower, without the wind (you can switch back from the pirate menu)");
fns.o_easy = function () { var S = prwS(); S.easySail = 1; prwSave(); worldCard(null); setStatus("Simple sailing: W and S for speed, A and D to steer. Real sailing comes back from the pirate menu."); };
worldCard(h, fns);
},
function () {
var Q = prwSeaS(), done = Q.lessons || {}, h = worldFacts("🎓 The sailing master's school", "The sailing master was the ship's navigator and her best seaman: he set her course and trimmed her sails. Pirates elected theirs, and paid him a share and a quarter.", [], []), fns = {};
PRW_LESSONS.forEach(function (L, i) { h += worldBtn("l" + i, (done[L.k] ? "✅ " : "📘 ") + (i + 1) + ". " + L.t, L.task); fns["l" + i] = function () { prwLesson(i); }; });
var all = PRW_LESSONS.every(function (L) { return done[L.k]; });
h += worldBtn("ltest", (Q.passed ? "🏅 " : "📝 ") + "The sailing master's test", "Twelve questions. Pass it, and the crew will rate you a seaman fit to be master" + (all ? "" : " (finish the lessons first)"));
fns.ltest = function () { prwSeaTest(); };
worldCard(h, fns);
},
function (i) {
var L = PRW_LESSONS[i], h = worldFacts("📘 " + L.t, "The sailing master", [], L.read) + "<div style='margin:8px 0;color:#FFE7B0'><b>Now do it:</b> " + prwEsc(L.task) + "</div>", fns = {};
h += worldBtn("go", "▶ To the helm", "The lesson is done when you have done it at sea");
fns.go = function () { worldCard(null); PRW_SEA.school = { i: i, k: L.k, got: {} }; if (!prwSeaOn())
setStatus("📘 Go aboard in the pirates' waters to practise: " + prwEsc(L.task));
else
setStatus("📘 " + prwEsc(L.task) + " <b>O</b> for orders."); };
h += worldBtn("back", "‹ The school", "");
fns.back = prwSchool;
worldCard(h, fns);
},
function (L) {
var Q = prwSeaS();
Q.lessons = Q.lessons || {};
PRW_SEA.school = null;
if (Q.lessons[L.k])
return;
Q.lessons[L.k] = Date.now();
prwDid("steer");
prwSave();
if (typeof playTone === "function") {
playTone(660, 0.15);
setTimeout(function () { playTone(880, 0.2); }, 160);
}
setStatus("✅ <b>" + prwEsc(L.t) + "</b>: the sailing master is satisfied. " + (PRW_LESSONS.every(function (x) { return Q.lessons[x.k]; }) ? "That's every lesson: take his test from the school." : "Next lesson in the school (O, then the school)."));
},
function () {
var Q = prwSeaS();
Q.lessons = Q.lessons || {};
if (!PRW_LESSONS.every(function (L) { return Q.lessons[L.k]; }) && !Q.passed) {
setStatus("Finish the sailing master's lessons first.");
return;
}
prwQuiz("The sailing master's test", "Answer as a seaman would.", [
["The wind is dead ahead. What is she?", "In irons", "Running", "On a broad reach"],
["How close to the wind can a square-rigged ship sail?", "About six points, 67°", "Straight into it", "About one point, 11°"],
["Which is usually her fastest point of sailing?", "A broad reach, wind on the quarter", "Close-hauled", "Head to wind"],
["What is the first order in tacking?", "Ready about! Helm's a-lee!", "Let go and haul!", "Square away!"],
["When do you give 'Mainsail haul!'?", "As her head comes through the wind", "Before you start the tack", "When she is at anchor"],
["What is it called when a tack fails and she hangs head to wind?", "Missing stays", "Wearing ship", "Heaving to"],
["Which way of changing tack never fails, but loses ground?", "Wearing ship", "Tacking", "Club-hauling"],
["How do you stop a ship at sea without anchoring?", "Heave to: back the main topsail", "Furl the jib", "Square the yards"],
["Why measure speed in 'knots'?", "Knots on the log line were counted as it ran out for 28 seconds", "Sailors tied a knot for every mile", "It was the Spanish word for a mile"],
["The wind is rising past 25 knots with all sail set. What do you do?", "Shorten sail and reef the topsails", "Set the studding sails", "Brace up sharp"],
["A merchantman heaves to as you come up. What does it mean?", "She is surrendering", "She is about to fire", "She is in irons"],
["What does 'striking your colours' mean?", "Hauling down your flag: surrender", "Painting the hull", "Firing a salute"]
], function (all, n) {
if (n >= 10) {
Q.passed = Date.now();
prwSave();
prwKeep("prw_master", "The sailing master's commendation: rated a seaman fit to command", "🧭");
prwDid("steer", 3);
setStatus("🏅 <b>" + n + " of 12.</b> The sailing master shakes your hand: \"You'll do. You'll do very well.\"");
}
else
setStatus("📝 " + n + " of 12. \"Not yet, my lad. Ten right to pass. Back to your lessons.\"");
});
},
function () {
var F = PRW_FIGHT;
PRW_FIGHT = null;
var me = prwS(), S = F ? F.S : { side: "merchant", ship: "a prize" }, side = S.side || "merchant", name = S.ship || "a prize";
var haul = prwHaulFor(side), worth = prwHaulWorth(haul), sh = prwShares(me), frac = sh.mine / sh.total, coinPart = 0, goodsGot = [], H = prwHold();
haul.forEach(function (i) { var G = PRW_GOODS[i.k]; if (!G)
return; if (G.coin)
coinPart += G.v * i.n;
else if (i.k !== "powder" && i.k !== "cordage") {
var my = Math.max(1, Math.round(i.n * frac * (me.own ? 1 : 3)));
H[i.k] = (H[i.k] || 0) + my;
goodsGot.push({ k: i.k, n: my });
} });
var myCoin = Math.round(coinPart * frac);
if (me.own)
me.morale = Math.min(100, (me.morale || 70) + 25);
me.coin += myCoin;
me.prizes = (me.prizes || 0) + 1;
me.lastPrize = Date.now();
me.wanted = Math.min(4, (me.wanted || 0) + (side === "merchant" ? 0.5 : 1));
prwDid("fight");
prwLog("Took the " + name + ": " + myCoin + " pieces of eight" + (goodsGot.length ? " and goods" : "") + " as your share");
if (me.electReady && me.under && !me.own) {
me.electReady = 0;
setTimeout(prwElect, 4000);
}
prwSave();
try {
prwHoldShow();
}
catch (e) { }
if (side === "fleet")
prwKeep("prw_bar", "A silver bar from the treasure fleet, with the King's mark", "🥈");
else if (me.prizes === 1)
prwKeep("prw_coin", "Your first piece of eight", "🪙");
var rows = haul.map(function (i) { var G = PRW_GOODS[i.k]; return "<tr><td>" + G.icon + " " + prwEsc(G.n) + "</td><td style='text-align:right'>" + i.n.toLocaleString() + " " + G.u + "</td><td style='text-align:right;opacity:.8'>" + (G.v * i.n).toLocaleString() + "</td></tr>"; }).join("");
var h = worldFacts("📜 The quartermaster's tally", prwEsc(name), [], ["Everything is brought on deck and written down before anyone may touch it. Hiding so much as a ring meant marooning, by the Articles."]) +
"<table style='width:100%;font-size:13px;border-collapse:collapse;margin:6px 0'><tr style='color:#FFE7B0'><td>Goods</td><td style='text-align:right'>How much</td><td style='text-align:right'>Worth (pieces of eight)</td></tr>" + rows + "<tr style='border-top:1px solid #8A6A40;color:#FFE7B0'><td><b>The whole haul</b></td><td></td><td style='text-align:right'><b>" + worth.toLocaleString() + "</b></td></tr></table>" +
"<div style='margin:6px 0;opacity:.9'>The shares: " + sh.total + " shares among " + sh.crew + " " + (me.own ? "of your company (you take two, as captain)" : "men") + ". <b>Yours: " + sh.mine + (sh.mine === 1 ? " share" : " shares") + "</b>: <b>" + myCoin.toLocaleString() + " pieces of eight</b> in coin" + (goodsGot.length ? ", and in goods: " + goodsGot.map(function (g) { return g.n + " " + PRW_GOODS[g.k].u + " of " + PRW_GOODS[g.k].n.toLowerCase(); }).join(", ") + " (stowed in your hold: sell them in a port that buys plunder)" : "") + ". You have " + me.coin.toLocaleString() + ".</div>" +
"<div style='opacity:.8;font-size:12.5px'>" + haul.filter(function (i) { return !PRW_GOODS[i.k].coin; }).slice(0, 3).map(function (i) { return "<b>" + prwEsc(PRW_GOODS[i.k].n) + ":</b> " + prwEsc(PRW_GOODS[i.k].s); }).join("<br>") + "</div>" +
"<div style='opacity:.75;font-size:12px;margin-top:4px'>The prize herself is sold, burned or kept; her crew are let go, and some sign your Articles.</div>";
h += worldBtn("go", "▶ Stow it", "");
worldCard(h, { go: function () { worldCard(null); } });
},
function () {
var s = SEA.ship;
if (!s)
return;
if (s.userData.prwHold) {
prwLetGo(s.userData.prwHold);
s.userData.prwHold = null;
}
var H = prwHold(), keys = Object.keys(H).filter(function (k) { return H[k] > 0; });
if (!keys.length)
return;
var g = new THREE.Group();
s.add(g);
s.userData.prwHold = g;
var S = prwS(), coin = S.coin || 0, i = 0, put = function (fn) { var x = -2.2 + (i % 4) * 1.5, z = -4 + Math.floor(i / 4) * 1.4; i++; if (i > 16)
return; fn(x, z); };
keys.forEach(function (k) {
var n = Math.min(3, Math.ceil(Math.log10(H[k] + 1))), G = PRW_GOODS[k];
for (var j = 0; j < n; j++)
put(function (x, z) {
var y = 4.25;
if (/bales|sacks|bundles/.test(G.u)) {
var b = prwBox(1.1, 0.7, 0.8, k === "cochineal" ? 0x9A2A2A : k === "silk" ? 0xD8C8A0 : 0xB8A07A, x, y + 0.35, z, g);
prwLay(b, "sail", k === "cochineal" ? 0xC86060 : 0xE8D8B8, { tile: 1 });
prwBox(1.12, 0.06, 0.82, 0x5A4A2A, x, y + 0.45, z, g);
}
else if (/casks|hogsheads|pipes|barrels/.test(G.u)) {
var c = prwCyl(0.42, 0.36, 0.9, 0x6A4626, x, y + 0.45, z, g, 10);
prwLay(c, "plank", 0x9A7046, { tile: 1 });
prwCyl(0.43, 0.43, 0.05, 0x2A2A2A, x, y + 0.7, z, g, 10);
prwCyl(0.43, 0.43, 0.05, 0x2A2A2A, x, y + 0.2, z, g, 10);
}
else if (k === "ivory") {
var t = prwCyl(0.08, 0.14, 1.6, 0xF0E8D8, x, y + 0.15, z, g, 8);
t.rotation.z = 1.4;
}
else if (k === "logwood") {
for (var l = 0; l < 3; l++) {
var lg = prwCyl(0.12, 0.14, 1.4, 0x7A3A22, x, y + 0.12 + l * 0.22, z - 0.2 + l * 0.2, g, 6);
lg.rotation.z = Math.PI / 2;
prwLay(lg, "bark", 0xC08070);
}
}
else {
var ch = prwBox(0.9, 0.55, 0.6, 0x5A3A1E, x, y + 0.28, z, g);
prwLay(ch, "plank", 0x8A6A42, { tile: 0.8 });
prwBox(0.94, 0.06, 0.64, 0xB8903A, x, y + 0.5, z, g);
prwBox(0.12, 0.16, 0.04, 0xC8A048, x, y + 0.4, z + 0.31, g);
}
});
});
if (coin > 2000)
put(function (x, z) { var ch = prwBox(1.0, 0.6, 0.65, 0x4A2A14, x, 4.55, z, g); prwLay(ch, "plank", 0x8A5A32, { tile: 0.8 }); var heap = prwSph(0.42, 0xE8C048, x, 4.86, z, g, 10, { e: 0x5A3A08, ei: 0.4 }); heap.scale.set(1.1, 0.45, 0.75); });
},
function () {
var H = prwHold(), S = prwS(), port = SEA.shore && SEA.shore.prw ? SEA.shore : null, rate = port ? PRW_FENCE[port.k] : null, spa = port && port.style === "spa";
var keys = Object.keys(H).filter(function (k) { return H[k] > 0; }), h = worldFacts("📦 Your hold", "Pieces of eight: " + S.coin.toLocaleString(), [], [keys.length ? "What you carry, your share of every prize:" : "Your hold is empty. Take a prize, and your share of her goods is stowed here."]), fns = {};
keys.forEach(function (k) { var G = PRW_GOODS[k]; h += "<div style='margin:3px 0'>" + G.icon + " <b>" + H[k] + " " + G.u + "</b> of " + prwEsc(G.n.toLowerCase()) + " <span style='opacity:.7'>(worth " + (G.v * H[k]).toLocaleString() + " in Europe)</span><div style='opacity:.75;font-size:12.5px'>" + prwEsc(G.s) + "</div></div>"; });
if (keys.length) {
if (!port)
h += "<div style='margin:6px 0;opacity:.85'>Go ashore in a port to sell it.</div>";
else if (spa || !rate)
h += "<div style='margin:6px 0;color:#FFB0A0'>" + prwEsc(port.name) + " will not buy plunder: the Spanish hang pirates, and their goods are proof. Try Nassau or Tortuga.</div>";
else {
var tot = keys.reduce(function (a, k) { return a + Math.round(PRW_GOODS[k].v * H[k] * rate); }, 0);
h += worldBtn("sell", "💰 Sell it all here for " + tot.toLocaleString() + " pieces of eight", prwEsc(port.name) + " pays " + Math.round(rate * 100) + " in the hundred of its worth" + (rate >= 0.8 ? ": no questions asked" : rate < 0.5 ? ": they know where it came from, and pay accordingly" : ""));
fns.sell = function () { keys.forEach(function (k) { H[k] = 0; }); S.coin += tot; prwLog("Sold your goods at " + port.name + " for " + tot + " pieces of eight"); prwSave(); try {
prwHoldShow();
}
catch (e) { } worldCard(null); setStatus("💰 Sold, for <b>" + tot.toLocaleString() + " pieces of eight</b>. You have " + S.coin.toLocaleString() + ". (Bank them for gold from the pirate menu.)"); };
}
}
worldCard(h, fns);
},
function (name, w) {
var m = PRW_NAMEMAT[name];
if (!m) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 64;
var x = c.getContext("2d");
x.fillStyle = "#1A120C";
x.fillRect(0, 0, 512, 64);
x.strokeStyle = "#C8A048";
x.lineWidth = 3;
x.strokeRect(4, 4, 504, 56);
x.fillStyle = "#E8C860";
x.font = "bold 34px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(name, 256, 34, 480);
m = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(c) });
m.userData.ldShared = 1;
PRW_NAMEMAT[name] = m;
}
var b = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 8), m);
b.rotation.y = Math.PI;
b.userData.keep = 1;
return b;
},
function (S) {
var G = WORLDS.sea.g;
if (!G)
return;
var g = new THREE.Group(), n = S.convoy && !PRW.lite ? S.convoy : 1, look = PRW_SHIPLOOK[S.k] || (S.side === "fleet" ? PRW_SHIPLOOK._flota : S.side === "spain" ? PRW_SHIPLOOK._guarda : null) || {};
for (var i = 0; i < n; i++) {
var sh = prwShip(S.kind, { flag: S.flag, hull: look.hull != null ? look.hull : S.hull, band: look.band != null ? look.band : S.band != null ? S.band : S.side === "spain" || S.side === "fleet" ? 0xC8A040 : undefined, sails: S.sails, figure: look.figure != null ? look.figure : S.kind === "galleon" ? 0xC8A040 : null,
name: i === 0 ? look.name : null, oars: look.oars, gilt: look.gilt, booty: i === 0 ? look.booty : 0 });
sh.position.set(i ? (i % 2 ? -60 : 60) : 0, 0, i ? -80 * Math.ceil(i / 2) : 0);
g.add(sh);
}
if (!PRW.lite) {
var L0 = g.children[0].userData.L, B0 = g.children[0].userData.B, H0 = g.children[0].userData.H, crew = S.side === "navy" ? "marine" : S.side === "spain" || S.side === "fleet" ? "spanish" : "crew", nc = Math.min(8, look.crowd || 4);
for (var c = 0; c < nc; c++) {
var w = wPerson("prw_" + crew + "_" + S.k + c, { look: { _pw: crew } });
w.position.set((c % 2 ? 1 : -1) * B0 * (0.18 + 0.12 * ((c >> 1) % 2)), H0 * 0.8 + 0.15, -L0 * 0.32 + (c >> 1) * L0 * 0.16);
w.rotation.y = (c % 3) * 2.1;
g.add(w);
}
var q = PRW_PBY[S.k];
if (q) {
var cpt = wPerson("prw_" + q.wear + "_" + q.k + "_sea", { sex: q.sex, look: { _pw: q.wear } });
cpt.position.set(0, H0 * 1.25 + 0.1, -L0 * 0.38);
g.add(cpt);
}
}
G.add(g);
S.g = g;
},
function () {
var S = prwS(), O = S.own, U = O && O.upg || {};
var kind = O ? (O.kind === "sloop" ? "sloop" : O.kind === "ship" ? "ship" : "brig") : "ship";
var flag = O ? (O.flag || "black") : S.under ? ((PRW_SAILS.filter(function (x) { return x.k === S.under; })[0] || {}).flag || "black") : "eng";
var o = { flag: flag, live: 1, hull: O && U.paint && O.paint != null ? O.paint : 0x2A1E14, band: U.stern ? 0xC8A040 : 0xA8883A, sails: U.black ? 0x2A2A2E : undefined,
figure: U.figure ? 0xC8A040 : null, gilt: U.stern || U.cabin ? 1 : 0, name: (O && O.name ? O.name : S.under && PRW_SHIPLOOK[S.under] && PRW_SHIPLOOK[S.under].name ? PRW_SHIPLOOK[S.under].name : "WAYFARER").toUpperCase() };
return { kind: kind, o: o, copper: !!U.copper, key: kind + "|" + JSON.stringify(o) + "|" + (U.copper ? 1 : 0) };
},
function () {
var s = SEA.ship, sp = prwHelmSpec();
if (PRW_HELM.g && PRW_HELM.key === sp.key)
return;
prwHelmDrop(true);
var g = prwShip(sp.kind, sp.o);
g.userData.prwHelm = 1;
s.add(g);
PRW_HELM.g = g;
PRW_HELM.key = sp.key;
var dy = g.userData.dy, L = g.userData.L, B = g.userData.B;
if (sp.copper) {
var cu = prwBox(B * 0.62, 1.2, L * 0.8, 0xB8743A, 0, -0.9, 0, g, { e: 0x3A1E08, ei: 0.15 });
prwLay(cu, "plank", 0xC8844A, { tile: 0.6 });
}
if (!PRW.lite) {
var S = prwS(), own = !!(s.userData.prw && s.userData.prw.children.some(function (c) { return !c.isMesh; })), Q = g.userData.qd, crew = new THREE.Group();
g.add(crew);
var off = wPerson("prw_" + (S.own ? "capt_plain" : "capt_rough") + "_watch", { look: { _pw: S.own ? "capt_plain" : "capt_rough" } });
off.position.set(-B * 0.22, Q.y, Q.z + 2.2);
off.rotation.y = 0.4;
crew.add(off);
if (!own)
for (var c = 0; c < 6; c++) {
var w = wPerson("prw_crew_hand" + c, { look: { _pw: "crew" } });
w.position.set((c % 2 ? 1 : -1) * B * (0.2 + 0.14 * ((c >> 1) % 2)), dy + 0.11, -L * 0.12 + (c >> 1) * L * 0.14);
w.rotation.y = (c % 2 ? -1 : 1) * (0.6 + c * 0.4);
crew.add(w);
}
}
var wk = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 6), new THREE.MeshBasicMaterial({ color: 0xF4F8FF, transparent: true, opacity: 0.0, depthWrite: false }));
var wp = wk.geometry.attributes.position;
for (var i = 0; i < wp.count; i++) {
var v = wp.getY(i) + 0.5;
wp.setX(i, wp.getX(i) * (B * 0.7 + v * B * 2.2));
wp.setY(i, -v * L * 1.6);
}
wp.needsUpdate = true;
wk.rotation.x = -Math.PI / 2;
wk.position.set(0, 0.12, -L / 2 + 0.5);
wk.userData.keep = 1;
wk.renderOrder = 2;
g.add(wk);
g.userData.wake = wk;
s.children.forEach(function (c) { if (c === g || c === s.userData.prw || c === s.userData.prwHold || c === s.userData.prwSpray)
return; if (c.visible) {
c.visible = false;
PRW_HELM.hid.push(c);
} });
prwHelmFit();
},
function (keepOld) {
var s = SEA.ship, g = PRW_HELM.g;
if (!g)
return;
if (g.parent)
g.parent.remove(g);
try {
prwLetGo(g);
}
catch (e) { }
PRW_HELM.g = null;
PRW_HELM.key = "";
if (!keepOld) {
PRW_HELM.hid.forEach(function (c) { c.visible = true; });
PRW_HELM.hid = [];
if (s) {
var P = s.userData.prw;
if (P) {
P.position.y = 0;
P.children.forEach(function (c) { c.visible = true; });
}
if (s.userData.prwHold)
s.userData.prwHold.position.y = 0;
}
}
}
];
});
