/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(457, function () {
return [
function () {
if (typeof THX_FLOORS === "undefined" || typeof thxGoFloor !== "function")
return wfdGo("tower");
var b = "", fns = {};
THX_FLOORS.forEach(function (F) {
var why = typeof thxMayGo === "function" ? thxMayGo(F[0]) : "";
if (why)
return;
b += worldBtn("f" + F[0], F[1] + " · " + F[2], F[4] || "");
fns["f" + F[0]] = function () { worldCard(null); thxGoFloor(F[0]); };
});
if (!b) {
wfdSay("🔒 <b>The Helix Tower.</b> Your card opens none of its floors yet. The Tower's lobby on the plaza gives out the cards.");
return false;
}
worldCard("<b>🧬 The Helix Tower</b><div style='opacity:.8;font-size:12px;margin:4px 0'>The floors your card opens.</div>" + b, fns);
return true;
},
function (h) {
var n = WFD_LIST.length, skip = 0.62, a0 = Math.PI / 2 + skip, span = Math.PI * 2 - skip * 2, out = [];
for (var i = 0; i < n; i++) {
if (i >= WFD_FIXED && typeof hallGallerySlot === "function") {
var g = hallGallerySlot(hallKeyIndex(HALL_GAL_KEYS, WFD_LIST[i].k), 1);
out.push({ x: h.x + g.x, z: h.z + g.z, a: g.a });
continue;
}
var a = a0 + span * (i + 0.5) / Math.min(n, WFD_FIXED);
out.push({ x: h.x + Math.cos(a) * WFD_R, z: h.z + Math.sin(a) * WFD_R, a: a });
}
return out;
},
function (D) {
var g = new THREE.Group(), lite = WFD.lite;
var frame = hwdMat(D.fr, D.tex || "stone"), leaf = hwdMat(D.lf, "wood"), dark = hwdMat(0x2A2620, "stone");
var dw = hwdDoorway(g, { shape: D.sh || "arch", hw: 1.05, h: 2.9, border: 0.5, frame: frame, leaf: leaf, glow: D.gl, step: dark });
var brass = hwdMat(0xC9A04A, "metal", { shine: 70 });
hwdBall(g, 0.07, 0.7, 1.35, 0.16, brass, 8);
hwdBall(g, 0.07, 0.7, 1.35, -0.16, brass, 8);
hwdPlate(g, D.n, dw.oTop + 0.55, 0.46, "#1A1612", "#F0DCA0", D.s, 3.0);
hwdTwoFaces(g, function (f) {
[-1, 1].forEach(function (s) { hwdBox(f, 0.08, 0.08, 0.5, s * 1.85, 2.9, 0.55, hwdMat(0x1A1A1A, "metal")); hwdLantern(f, s * 1.85, 2.55, 0.8, D.gl, hwdMat(0x1A1A1A, "metal", { shine: 30 })); });
if (!lite)
[-1, 1].forEach(function (s) { hwdPot(f, s * 2.3, 1.1, hwdMat(0x8A5A3A, "plaster"), hwdMat(0x3A6A2A, "foliage")); });
});
if (typeof gwBake === "function")
try {
gwBake(g);
}
catch (e) { }
if (typeof shadowsFor === "function")
try {
shadowsFor(g, false);
}
catch (e) { }
return g;
},
function (r) {
if (typeof hwdDoorway !== "function" || typeof THREE === "undefined")
return;
WFD.lite = !!(typeof HWD !== "undefined" && HWD.lite);
var h = blockOrigin(r.grid.bx, r.grid.bz), S = wfdSpots(h), G = new THREE.Group();
G.name = "wfd-hall-doors";
WFD.doors = [];
WFD_LIST.forEach(function (D, i) {
var s = S[i], g = wfdBuildDoor(D), y = 0;
try {
y = typeof terrainY === "function" ? terrainY(s.x, s.z) : 0;
}
catch (e) { }
g.position.set(s.x, y, s.z);
g.rotation.y = -s.a - Math.PI / 2;
g.traverse(function (o) { o.userData.wfdDoor = D.k; });
G.add(g);
WFD.doors.push({ D: D, x: s.x, z: s.z, a: s.a, g: g });
});
scene.add(G);
WFD.g = G;
WFD.built = true;
WFD.hallId = r.id;
},
function (d) {
WFD.on = null;
worldPromptCity(null);
var P = camera.position, back = { here: store.here || 0, x: d.x - Math.cos(d.a) * 3.5, y: P.y, z: d.z - Math.sin(d.a) * 3.5, yaw: Math.atan2(Math.cos(d.a), Math.sin(d.a)), name: "the Hall of Doors" };
if (typeof WLD !== "undefined" && !WLD.on)
WLD.from = back;
var ok = false;
try {
ok = d.D.go();
}
catch (e) {
if (window.console)
console.warn("[world-folk] door", d.D.k, e);
}
if (typeof WLD !== "undefined" && WLD.on && WLD.from && WLD.from.here === back.here)
WLD.from = back;
return ok;
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c, { r: 0.9 });
g.add(new THREE.Mesh(wfGeo("brim", function () { return new THREE.CylinderGeometry(0.24, 0.24, 0.016, 22); }), mt));
var cr = new THREE.Mesh(wfGeo("brimcr", function () { return new THREE.CylinderGeometry(0.11, 0.125, 0.12, 16); }), mt);
cr.position.y = 0.065;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("brimbd", function () { return new THREE.CylinderGeometry(0.127, 0.127, 0.03, 16); }), wfMat(wfDark(c, 0.5)));
bd.position.y = 0.02;
g.add(bd);
add("Head", [0, 0.14, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c, { r: 0.9 });
var cr = new THREE.Mesh(wfGeo("tricr", function () { return new THREE.CylinderGeometry(0.11, 0.125, 0.11, 16); }), mt);
cr.position.y = 0.05;
g.add(cr);
for (var i = 0; i < 3; i++) {
var w = new THREE.Mesh(wfGeo("triw", function () { return new THREE.BoxGeometry(0.27, 0.09, 0.02); }), mt);
var a = i / 3 * Math.PI * 2;
w.position.set(Math.sin(a) * 0.15, 0.05, Math.cos(a) * 0.15);
w.rotation.y = a;
w.rotation.x = -0.25;
g.add(w);
}
add("Head", [0, 0.14, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c, { r: 0.5 });
g.add(new THREE.Mesh(wfGeo("thb", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.014, 22); }), mt));
var cr = new THREE.Mesh(wfGeo("thc", function () { return new THREE.CylinderGeometry(0.105, 0.11, 0.22, 16); }), mt);
cr.position.y = 0.11;
g.add(cr);
add("Head", [0, 0.15, -0.01], g);
},
function (add, c) {
var m = new THREE.Mesh(wfGeo("bonnet", function () { return new THREE.SphereGeometry(0.16, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }), wfMat(c, { r: 1 }));
m.scale.set(1, 0.9, 1.2);
m.rotation.x = -0.6;
add("Head", [0, 0.1, -0.01], m);
var r = new THREE.Mesh(wfGeo("bonr", function () { return new THREE.TorusGeometry(0.15, 0.018, 6, 20, Math.PI); }), wfMat(wfMix(c, 0xFFFFFF, 0.4)));
r.rotation.z = Math.PI;
r.rotation.y = Math.PI / 2;
r.position.set(0, 0.0, 0.06);
add("Head", [0, 0.07, 0.06], r);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x5A7A2A, { r: 0.9 });
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2, l = new THREE.Mesh(wfGeo("leaf", function () { var s = new THREE.SphereGeometry(0.025, 6, 4); s.scale(1.6, 0.4, 0.8); return s; }), mt);
l.position.set(Math.cos(a) * 0.118, 0, Math.sin(a) * 0.118);
l.rotation.y = -a;
g.add(l);
}
add("Head", [0, 0.13, 0], g);
},
function (add, c) {
var m = new THREE.Mesh(wfGeo("kerch", function () { return new THREE.SphereGeometry(0.136, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52); }), wfMat(c, { r: 1 }));
m.scale.set(1, 0.85, 1.1);
add("Head", [0, 0.12, -0.015], m);
var k = new THREE.Mesh(wfGeo("knot", function () { return new THREE.SphereGeometry(0.03, 8, 6); }), wfMat(c));
add("Head", [0.0, 0.08, -0.15], k);
},
function (add, c) {
var g = new THREE.Group(), st = wfMat(c || 0xA8ACB4, { r: 0.35, m: 0.8 });
var d = new THREE.Mesh(wfGeo("helm", function () { return new THREE.SphereGeometry(0.15, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }), st);
d.scale.set(1, 1.05, 1.08);
g.add(d);
var n = new THREE.Mesh(wfGeo("nasal", function () { return new THREE.BoxGeometry(0.025, 0.11, 0.02); }), st);
n.position.set(0, -0.04, 0.15);
g.add(n);
var r = new THREE.Mesh(wfGeo("helmr", function () { return new THREE.TorusGeometry(0.15, 0.012, 6, 22); }), st);
r.rotation.x = Math.PI / 2;
g.add(r);
add("Head", [0, 0.11, -0.005], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c, { r: 1 });
for (var i = 0; i < 3; i++) {
var t = new THREE.Mesh(wfGeo("wrap", function () { return new THREE.TorusGeometry(0.12, 0.035, 8, 20); }), mt);
t.rotation.x = Math.PI / 2 + 0.15 * (i - 1);
t.position.y = i * 0.035;
g.add(t);
}
var top = new THREE.Mesh(wfGeo("wraptop", function () { return new THREE.SphereGeometry(0.12, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), mt);
top.position.y = 0.04;
g.add(top);
add("Head", [0, 0.12, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0xF0E8D0, { r: 0.9 });
var top = new THREE.Mesh(wfGeo("nem", function () { return new THREE.SphereGeometry(0.145, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6); }), mt);
g.add(top);
[-1, 1].forEach(function (s) { var f = new THREE.Mesh(wfGeo("nemf", function () { return new THREE.BoxGeometry(0.07, 0.22, 0.03); }), mt); f.position.set(s * 0.11, -0.13, 0.02); g.add(f); });
add("Head", [0, 0.1, -0.01], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("staff", function () { return new THREE.CylinderGeometry(0.018, 0.022, 1.7, 6); }), wfMat(0x6A4A2A)));
var p = new THREE.Mesh(wfGeo("spearh", function () { return new THREE.ConeGeometry(0.035, 0.18, 6); }), wfMat(0xB8BCC4, { r: 0.3, m: 0.8 }));
p.position.y = 0.93;
g.add(p);
add("hand_r", [0, 0.1, 0], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("lantb", function () { return new THREE.BoxGeometry(0.1, 0.14, 0.1); }), wfMat(0xFFD890, { e: 0xFFB040, ei: 0.8 })));
var cap = new THREE.Mesh(wfGeo("lantc", function () { return new THREE.ConeGeometry(0.08, 0.06, 4); }), wfMat(0x2A2420));
cap.position.y = 0.1;
g.add(cap);
add("hand_l", [0, -0.2, 0], g);
},
function (add) {
var g = new THREE.Group();
var bl = new THREE.Mesh(wfGeo("blade", function () { return new THREE.BoxGeometry(0.04, 0.75, 0.01); }), wfMat(0xC8CCD4, { r: 0.25, m: 0.9 }));
bl.position.y = -0.45;
g.add(bl);
var hl = new THREE.Mesh(wfGeo("hilt", function () { return new THREE.BoxGeometry(0.18, 0.03, 0.03); }), wfMat(0x8A6A2A, { r: 0.4, m: 0.6 }));
hl.position.y = -0.06;
g.add(hl);
add("pelvis", [0.17, 0.02, 0.02], g);
},
function (L, o) {
var t = L.top != null ? L.top : 0xF0E8D8, tr = L.layerColor != null ? L.layerColor : 0xB8603A;
if (o.f)
return wfIds(wfBare({ ids: ["oz:bodice:cap:cloth", "oz:skirt:ankle:0.12:cloth", "oz:sash"].concat(o.r < 0.5 ? ["oz:pelerine"] : []), col: { dress: t, skirt: t, trim: tr, sash: tr, cape: L.bottom != null ? L.bottom : wfMix(tr, 0xFFFFFF, 0.3) }, shoes: 0x8A6A44 }, L, 1, 0));
var knee = o.r < 0.6;
return wfIds(wfBare({ ids: ["oz:bodice:cap:cloth", "oz:skirt:" + (knee ? "knee" : "ankle") + ":0.06:cloth", "oz:sash"].concat(o.r > 0.7 ? ["oz:pelerine"] : []), col: { dress: t, skirt: t, trim: tr, sash: tr, cape: L.bottom != null ? L.bottom : tr }, shoes: 0x8A6A44 }, L, 1, knee));
},
function (L, o) {
var t = 0xF4F0E4, tr = L.layerColor != null ? L.layerColor : 0x2A8AA8;
if (o.f)
return wfIds(wfBare({ ids: ["oz:bodice:cap:cloth", "oz:skirt:ankle:0.05:cloth", "oz:petals:16"], col: { dress: t, skirt: t, trim: tr }, shoes: 0xC8A878 }, L, 1, 0));
return wfIds(wfBare({ ids: ["oz:skirt:knee:0.05:cloth", "oz:sash", "oz:petals:16"], col: { skirt: t, trim: tr, sash: 0xE8C040 }, shoes: 0xC8A878 }, L, 1, 1));
},
function (L, o) {
var t = L.top != null ? L.top : 0x6A5A3A, b = L.bottom != null ? L.bottom : 0x4A3A2A, a = L.layerColor != null ? L.layerColor : 0xE8E0CC;
if (o.f)
return wfIds({ ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.14:cloth"].concat(o.r < 0.55 ? ["oz:apron:half:long:0.14"] : []).concat(o.r > 0.8 ? ["oz:pelerine"] : []), col: { dress: t, skirt: t, trim: wfDark(t, 0.3), apron: a, cape: b } });
return wfIds({ ids: ["oz:coat:long:cloth", "oz:trousers:knit", "oz:boots"].concat(o.r > 0.7 ? ["oz:pelerine"] : []), col: { coat: t, trou: b, belt: 0x2A1E14, cape: wfDark(t, 0.2), shoes: 0x3A2A1E }, shoes: 0x3A2A1E });
},
function (L, o) {
var t = L.top != null ? L.top : 0x8A2A2A, b = L.bottom != null ? L.bottom : 0x2A2A3A, tr = L.layerColor != null ? L.layerColor : 0xD8B048;
if (o.f)
return wfIds({ ids: ["oz:bodice:long:velvet", "oz:skirt:ankle:0.18:velvet", "oz:sash"], col: { dress: t, skirt: t, trim: tr, sash: tr } });
return wfIds({ ids: ["oz:shirt:long", "oz:coat:" + (o.r < 0.5 ? "long" : "jacket") + ":velvet:gold", "oz:breeches:cloth", "oz:stock:knit:thigh", "oz:boots"], col: { shirt: 0xF2EEE4, coat: t, trou: b, stock: b, belt: 0x2A1E14 } });
},
function (L, o) {
var t = L.top != null ? L.top : 0x2A3A5A, b = L.bottom != null ? L.bottom : 0x1A1A22, tr = L.layerColor != null ? L.layerColor : 0xE8E4DC;
if (o.f)
return wfIds({ ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.22:cloth", "oz:collar:high:none"].concat(o.r < 0.4 ? ["oz:apron:half:long:0.2"] : []), col: { dress: t, skirt: wfDark(t, 0.15), trim: tr, collar: 0xF8F6F0, apron: 0xF0ECE0 } });
return wfIds({ ids: ["oz:shirt:long", "oz:vest:cloth", "oz:breeches:cloth", "oz:stock:knit", "oz:collar:high:none", "oz:boots"].concat(o.r > 0.6 ? ["oz:pelerine"] : []), col: { shirt: 0xF2EEE4, vest: t, trou: b, stock: wfMix(b, 0xFFFFFF, 0.15), collar: 0xF8F6F0, cape: wfDark(t, 0.25) } });
},
function (L, o) {
var t = L.top != null ? L.top : 0x7A5A3A, b = L.bottom != null ? L.bottom : 0x4A3A2A, a = L.layerColor != null ? L.layerColor : 0xF0ECE0;
if (o.f)
return wfIds({ ids: ["oz:bodice:long:cloth", "oz:skirt:" + (o.kid ? "calf" : "ankle") + ":0.15:cloth", "oz:apron:" + (o.kid ? "full" : "half") + ":" + (o.kid ? "short" : "long") + ":0.15", "oz:stock:knit"].concat(o.r > 0.75 ? ["oz:pelerine"] : []), col: { dress: t, skirt: wfDark(t, 0.1), trim: wfMix(t, 0xFFFFFF, 0.5), apron: a, stock: 0xE8E4DA, cape: wfDark(t, 0.3) } });
return wfIds({ ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:" + (o.r < 0.5 ? "breeches" : "trousers") + ":cloth", "oz:stock:knit", "oz:boots"], col: { shirt: 0xEAE4D4, collar: 0xEAE4D4, tie: wfDark(t, 0.4), vest: t, trou: b, stock: 0xD8D2C4 } });
},
function (L, o) {
var t = L.top != null ? L.top : 0x2A2A34, b = L.bottom != null ? L.bottom : 0x4A4A54, tr = L.layerColor != null ? L.layerColor : 0x8A2A3A;
if (o.f)
return wfIds({ ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.26:cloth", "oz:collar:low:none"].concat(o.r < 0.4 ? ["oz:pelerine"] : []), col: { dress: t === 0x2A2A34 ? tr : t, skirt: t === 0x2A2A34 ? tr : t, trim: 0xF0ECE4, collar: 0xF8F6F0, cape: wfDark(tr, 0.3) } });
return wfIds({ ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth" + (o.r < 0.5 ? ":chain" : ""), "oz:coat:" + (o.r < 0.6 ? "frock" : "jacket") + ":cloth", "oz:trousers:" + (o.r < 0.4 ? "pinstripe" : "cloth"), "oz:boots"], col: { shirt: 0xF6F4EE, collar: 0xF8F6F0, tie: tr, vest: wfMix(tr, b, 0.5), coat: t, trou: b }, shoes: 0x141010 });
},
function (L, o) {
var t = L.top != null ? L.top : 0xE8E0CC, c = L.layerColor != null ? L.layerColor : 0x6A1A1A;
return wfIds({ ids: ["oz:shirt:long", "oz:" + (o.r < 0.5 ? "vest:cloth" : "coat:long:cloth:gold"), "oz:breeches:cloth", "oz:sash", "oz:boots:roll"], col: { shirt: t, vest: c, coat: c, trou: L.bottom != null ? L.bottom : 0x2A2A3A, sash: wfPick([0xB8202A, 0xE8B020, 0x2A6AA8], o.r), roll: 0x3A2A1E, belt: 0x2A1E14 } });
},
function (L, o) {
var t = L.top != null ? L.top : 0x3A3450, tr = L.layerColor != null ? L.layerColor : 0xC8A848;
return wfIds({ ids: [o.f ? "oz:bodice:long:cloth" : "oz:shirt:long:cloth", "oz:skirt:ankle:0.16:cloth", "oz:sash"].concat(o.r < 0.5 ? ["oz:pelerine"] : []), col: { dress: t, shirt: t, skirt: t, trim: tr, sash: tr, cape: L.bottom != null ? L.bottom : wfDark(t, 0.25) } });
},
function (L, o) {
var t = L.top != null ? L.top : 0x141418, g = L.layerColor != null ? L.layerColor : 0x8A1A3A;
if (o.f) {
var cap = o.r < 0.5;
return wfIds(wfBare({ ids: ["oz:bodice:" + (cap ? "cap" : "long") + ":satin", "oz:skirt:ankle:0.2:satin"].concat(o.r > 0.6 ? ["oz:sash"] : []), col: { dress: g, skirt: g, trim: wfMix(g, 0xFFFFFF, 0.4), sash: wfMix(g, 0x000000, 0.3) }, shoes: 0x141414 }, L, cap, 0));
}
return wfIds({ ids: ["oz:shirt:long", "oz:collar:high:big", "oz:vest:satin", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"], col: { shirt: 0xF8F6F2, collar: 0xF8F6F2, tie: 0x141414, vest: o.r < 0.5 ? 0x141418 : g, coat: t, trou: 0x141418 }, shoes: 0x0A0A0A });
},
function (L, o) {
var t = L.top != null ? L.top : 0x2A2440, tr = 0xB8B8D0;
if (o.f)
return wfIds({ ids: ["oz:bodice:long:satin", "oz:skirt:ankle:0.1:satin", "oz:sash"], col: { dress: t, skirt: t, trim: tr, sash: 0x6A3A9A } });
return wfIds({ ids: ["oz:shirt:long:satin", "oz:coat:long:satin", "oz:trousers:cloth", "oz:boots"].concat(o.r < 0.5 ? ["oz:pelerine"] : []), col: { shirt: wfDark(t, 0.2), coat: t, trou: 0x141218, belt: 0x1A1420, cape: 0x141220 } });
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + (o.e || "") + "|" + (o.op || "");
if (WFP.mats[k])
return WFP.mats[k];
var m = new THREE.MeshLambertMaterial({ color: col });
var t = tex && typeof texOf === "function" ? texOf(tex) : null;
if (t)
m.map = t;
if (o.e != null) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op != null) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
return (WFP.mats[k] = m);
},
function (g, C) {
var wood = wfpMat(C.b || 0x7A5A3A, "wood"), cloth = wfpMat(C.a || 0xB83A2A);
wfpBox(g, 2.2, 0.08, 1.0, wood, 0, 0.9, 0);
[-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { wfpBox(g, 0.08, 0.9, 0.08, wood, s * 1.0, 0.45, t * 0.42); wfpBox(g, 0.07, 1.4, 0.07, wood, s * 1.05, 1.6, t * 0.45); }); });
var c = wfpBox(g, 2.4, 0.05, 1.3, cloth, 0, 2.35, 0.05);
c.rotation.x = -0.18;
for (var i = 0; i < 5; i++)
wfpBall(g, 0.13, wfpMat([0xC83A2A, 0xE8B030, 0x6A9A3A, 0xD87A2A, 0x8A3A6A][(i + (C.n || 0)) % 5]), -0.8 + i * 0.4, 1.05, 0.1);
wfpBox(g, 0.5, 0.25, 0.35, wfpMat(0x9A7A4A, "wood"), 0.5, 1.07, -0.2);
},
function (g, C) {
var w = wfpMat(C.b || 0x5A3A22, "wood"), cl = wfpMat(C.a || 0xF0ECE4);
wfpCyl(g, 0.55, 0.55, 0.05, w, 0, 0.76, 0, 16);
wfpCyl(g, 0.06, 0.08, 0.74, w, 0, 0.37, 0);
wfpCyl(g, 0.58, 0.58, 0.02, cl, 0, 0.79, 0, 16);
[0, 2.1, 4.2].forEach(function (a) {
var cx = Math.cos(a) * 0.95, cz = Math.sin(a) * 0.95;
wfpBox(g, 0.42, 0.05, 0.42, w, cx, 0.46, cz, a);
var bk = wfpBox(g, 0.42, 0.5, 0.05, w, cx + Math.cos(a) * 0.2, 0.72, cz + Math.sin(a) * 0.2);
bk.rotation.y = -a + Math.PI / 2;
[-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { wfpBox(g, 0.04, 0.44, 0.04, w, cx + s * 0.17, 0.22, cz + t * 0.17); }); });
});
wfpCyl(g, 0.05, 0.04, 0.12, wfpMat(0xE8E8F0), 0.15, 0.86, 0.1, 8);
},
function (g, C) {
var w = wfpMat(C.b || 0x7A5A3A, "wood"), iron = wfpMat(0x2A2A2A);
wfpBox(g, 1.6, 0.08, 1.0, w, 0, 0.7, 0);
wfpBox(g, 1.6, 0.35, 0.05, w, 0, 0.9, 0.48);
wfpBox(g, 1.6, 0.35, 0.05, w, 0, 0.9, -0.48);
wfpBox(g, 0.05, 0.35, 1.0, w, -0.78, 0.9, 0);
[-0.52, 0.52].forEach(function (z) { var wh = wfpM(g, "wheel", function () { return new THREE.TorusGeometry(0.42, 0.04, 6, 18); }, iron, 0.2, 0.45, z); wh.rotation.y = 0; wfpCyl(g, 0.06, 0.06, 0.12, w, 0.2, 0.45, z).rotation.x = Math.PI / 2; });
var sh = wfpBox(g, 1.4, 0.06, 0.06, w, 1.4, 0.55, 0.3);
sh.rotation.z = 0.25;
var sh2 = wfpBox(g, 1.4, 0.06, 0.06, w, 1.4, 0.55, -0.3);
sh2.rotation.z = 0.25;
for (var i = 0; i < 4; i++)
wfpBall(g, 0.18, wfpMat([0x6A9A3A, 0xD87A2A, 0xC83A2A, 0xE8C040][i]), -0.4 + i * 0.25, 0.95, (i % 2) * 0.3 - 0.15);
},
function (g, C) {
var t = wfpMat(C.c || 0xB8603A, "plaster");
[[0, 0], [0.5, 0.2], [0.25, -0.35], [-0.35, 0.3]].forEach(function (p) { wfpM(g, "amphora", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var u = i / 12;
pts.push(new THREE.Vector2(0.04 + 0.22 * Math.sin(Math.PI * Math.min(1, u * 1.15)) * (1 - 0.35 * u) + (u > 0.9 ? 0.03 : 0), u * 0.95));
} return new THREE.LatheGeometry(pts, 12); }, t, p[0], 0, p[1]); });
},
function (g, C) {
var iron = wfpMat(0x2A2624);
wfpCyl(g, 0.38, 0.22, 0.3, iron, 0, 0.95, 0, 12);
[0, 2.1, 4.2].forEach(function (a) { var l = wfpBox(g, 0.05, 0.85, 0.05, iron, Math.cos(a) * 0.22, 0.42, Math.sin(a) * 0.22); l.rotation.z = Math.cos(a) * 0.2; l.rotation.x = -Math.sin(a) * 0.2; });
wfpBall(g, 0.24, wfpMat(0xFF8A30, null, { e: 0xFF6A10, ei: 1 }), 0, 1.1, 0).scale.y = 0.6;
wfpGlow(g, 0xFF9A40, 2.2, 0, 1.3, 0);
},
function (g, C) {
var w = wfpMat(0x5A3A22, "bark");
for (var i = 0; i < 5; i++) {
var l = wfpCyl(g, 0.07, 0.07, 1.0, w, 0, 0.12, 0, 6);
l.rotation.z = Math.PI / 2;
l.rotation.y = i / 5 * Math.PI;
}
for (var j = 0; j < 8; j++) {
var a = j / 8 * Math.PI * 2;
wfpBall(g, 0.13, wfpMat(0x6A6A66, "stone"), Math.cos(a) * 0.62, 0.08, Math.sin(a) * 0.62);
}
wfpM(g, "flame", function () { return new THREE.ConeGeometry(0.3, 0.75, 8); }, wfpMat(0xFFA040, null, { e: 0xFF7020, ei: 1, op: 0.85 }), 0, 0.5, 0);
wfpGlow(g, 0xFFA050, 3.2, 0, 0.7, 0);
},
function (g, C) {
var w = wfpMat(0x5A3A22, "wood"), st = wfpMat(0xB8BCC4, null);
wfpBox(g, 1.6, 0.08, 0.3, w, 0, 1.5, 0);
wfpBox(g, 1.6, 0.08, 0.3, w, 0, 0.3, 0);
[-0.75, 0.75].forEach(function (x) { wfpBox(g, 0.08, 1.6, 0.3, w, x, 0.8, 0); });
for (var i = 0; i < 5; i++) {
var sp = wfpCyl(g, 0.02, 0.02, 1.9, w, -0.55 + i * 0.27, 1.0, 0.05, 6);
wfpM(g, "rackhead", function () { return new THREE.ConeGeometry(0.035, 0.18, 6); }, st, -0.55 + i * 0.27, 2.0, 0.05);
}
var sh = wfpCyl(g, 0.42, 0.42, 0.06, wfpMat(C.a || 0x8A2A2A, "wood"), 0.0, 0.75, 0.25, 16);
sh.rotation.x = Math.PI / 2;
},
function (g, C) {
var w = wfpMat(0x7A5232, "wood");
var l1 = wfpBox(g, 0.06, 1.9, 0.06, w, -0.35, 0.95, 0);
l1.rotation.z = 0.12;
var l2 = wfpBox(g, 0.06, 1.9, 0.06, w, 0.35, 0.95, 0);
l2.rotation.z = -0.12;
var l3 = wfpBox(g, 0.06, 1.8, 0.06, w, 0, 0.9, -0.35);
l3.rotation.x = -0.25;
wfpBox(g, 0.8, 0.05, 0.12, w, 0, 0.8, 0.06);
var cv = wfpBox(g, 0.75, 0.6, 0.03, wfpMat(0xE8DCC0, "plaster"), 0, 1.15, 0.07);
cv.rotation.x = -0.12;
wfpBox(g, 0.3, 0.2, 0.01, wfpMat(0x8A5A3A), 0.1, 1.2, 0.1).rotation.x = -0.12;
},
function (W, R) {
var base = W.base || 0, cells = {}, C = 24, people = [], seen = new Set(), v = new THREE.Vector3(), m4 = new THREE.Matrix4(), t0 = performance.now();
W.g.updateMatrixWorld(true);
W.g.traverse(function (o) {
if (o.userData && o.userData.wfMine)
return;
if (o.userData && o.userData.part === "leg") {
if (wfMineUp(o))
return;
var f = o.parent && o.parent.parent && o.parent.parent.parent;
if (f && !seen.has(f)) {
seen.add(f);
f.getWorldPosition(v);
people.push([v.x - base, v.y, v.z]);
}
return;
}
if (o.userData && o.userData.wSeed !== undefined && !seen.has(o) && !o.userData.wfMine) {
seen.add(o);
o.getWorldPosition(v);
people.push([v.x - base, v.y, v.z]);
return;
}
if (!o.isMesh || o.isSprite || !o.geometry || !o.geometry.attributes || !o.geometry.attributes.position || o.visible === false)
return;
if (o.material && (o.material.transparent && o.material.opacity < 0.3))
return;
var pos = o.geometry.attributes.position, n = pos.count;
if (n < 3)
return;
if (!o.geometry.boundingSphere)
o.geometry.computeBoundingSphere();
var bs = o.geometry.boundingSphere;
if (!bs)
return;
var sc = o.matrixWorld.getMaxScaleOnAxis();
if (bs.radius * sc > 1500)
return;
if (wfIsOurs(o))
return;
var inst = o.isInstancedMesh, cnt = inst ? Math.min(o.count, 64) : Math.min(64, Math.max(6, Math.round(n / 180))), wgt = inst ? 0.5 : 1;
for (var i = 0; i < cnt; i++) {
if (inst) {
o.getMatrixAt(Math.floor(i * o.count / cnt), m4);
v.setFromMatrixPosition(m4).applyMatrix4(o.matrixWorld);
}
else {
var k = Math.floor(i * n / cnt);
v.set(pos.getX(k), pos.getY(k), pos.getZ(k)).applyMatrix4(o.matrixWorld);
}
var lx = v.x - base;
if (!isFinite(lx) || !isFinite(v.z))
continue;
var key = Math.floor(lx / C) + "," + Math.floor(v.z / C), q = cells[key] || (cells[key] = { n: 0, ymin: 1e9, ys: 0, cx: Math.floor(lx / C), cz: Math.floor(v.z / C) });
q.n += wgt;
if (v.y < q.ymin)
q.ymin = v.y;
q.ys += v.y * wgt;
}
});
var list = [];
for (var k2 in cells) {
var q2 = cells[k2];
if (q2.n >= 10)
list.push(q2);
}
list.sort(function (a, b) { return b.n - a.n; });
if (list.length > 900)
list.length = 900;
var A = WLD.arrive || { x: 0, z: 0 }, out = [];
for (var j = 0; j < list.length; j++) {
var c = list[j], cx = (c.cx + 0.5) * C, cz = (c.cz + 0.5) * C;
var near = false;
for (var p = 0; p < people.length; p++) {
var pp = people[p];
if (Math.hypot(pp[0] - cx, pp[2] - cz) < 14) {
near = true;
break;
}
}
if (near)
continue;
var spot = wfStand(W, R, cx, cz, c.ymin, people);
if (!spot)
continue;
if (Math.hypot(spot.x - A.x, spot.z - A.z) < 10)
continue;
spot.n = c.n;
out.push(spot);
}
WF.scanMs = Math.round(performance.now() - t0);
return { spots: out, people: people.length, cells: list.length };
},
function (W, R, x, z, feet, wide) {
var y = wfGround(W, x, z, feet);
if (y == null)
return null;
if (R.minY != null && y < R.minY)
return null;
if (y < -600)
return null;
if (feet != null && y > feet + 4)
return null;
if (typeof dkDry === "function") {
try {
if (!dkDry(W, x, z))
return null;
}
catch (e) { }
}
if (W.key === "verne" && typeof vrnWaterAt === "function") {
try {
var wl = vrnWaterAt(x, z);
if (wl != null && wl > y - 0.3)
return null;
}
catch (e) { }
}
if (W.key === "race" && typeof pyNear === "function") {
try {
var rn = pyNear(x, z);
if (rn && rn.w > 0 && rn.ad < rn.w / 2 + 3)
return null;
}
catch (e) {
return null;
}
}
if (W.block) {
var wd = wide || 0.9;
for (var j = 0; j < 5; j++) {
var ox = j === 1 ? wd : j === 2 ? -wd : 0, oz = j === 3 ? wd : j === 4 ? -wd : 0;
try {
if (W.block(x + ox, z + oz, y))
return null;
}
catch (e) {
return null;
}
}
}
var y2 = wfGround(W, x + 1.4, z, y), y3 = wfGround(W, x, z + 1.4, y);
if (y2 == null || y3 == null || Math.abs(y2 - y) > 0.9 || Math.abs(y3 - y) > 0.9)
return null;
if (W.key === "casino" && Math.hypot(x, z) > 27)
return null;
return y;
},
function (W, R, cx, cz, ymin, people) {
var feet = ymin < 1e8 ? ymin + 1.2 : 0;
for (var ring = 0; ring < 3; ring++) {
var rr = ring === 0 ? 0 : ring === 1 ? 5 : 9, nq = ring === 0 ? 1 : 8;
for (var q = 0; q < nq; q++) {
var a = q / nq * Math.PI * 2 + ring * 0.4, x = cx + Math.cos(a) * rr, z = cz + Math.sin(a) * rr;
var y = wfOkAt(W, R, x, z, feet, 1.6);
if (y == null)
continue;
var crowd = false;
for (var p = 0; p < people.length; p++) {
var pp = people[p];
if (Math.abs(pp[1] - y) < 6 && Math.hypot(pp[0] - x, pp[2] - z) < 14) {
crowd = true;
break;
}
}
if (crowd)
continue;
return { x: x, y: y, z: z };
}
}
return null;
},
function (key, R, n) {
var seed = "wf_" + key + "_" + n, r = wfHashF(seed), r2 = wfHashF(seed + "b"), r3 = wfHashF(seed + "c"), w = wfWho(R, r);
var kid = w.kid && r3 < (w.kid === 1 ? 1 : w.kid), sex = r2 < (w.f || 0.5) ? "f" : "m", g;
if (w.seed) {
g = wPerson(w.seed + "wf" + key.replace(/\W/g, "") + n, { sex: sex });
}
else if (w.title) {
g = wPerson(seed, { title: w.title, place: key, sex: sex, child: !!kid });
}
else {
var pal = wfPick(w.pal || WF_P.earth, wfHashF(seed + "p")), era = w.era;
var hatK = w.hat !== undefined ? w.hat : wfPick(WF_ERA_HATS[era] || [null], wfHashF(seed + "hat"));
var old = wfHashF(seed + "age") < 0.2, hair = old ? wfPick([0xB8B4AC, 0xD8D4CC, 0x9A9690], wfHashF(seed + "h")) : wfPick([0x2A1E16, 0x4A3220, 0x6A4A2A, 0x1A1410, 0x8A6A3A, 0xB89A6A, 0x5A3A22], wfHashF(seed + "h"));
var look = { hair: hair, top: pal[0], layerColor: pal[1], bottom: wfDark(pal[0], 0.25), _wfSeed: seed, _wfHat: hatK, _wfEars: !!w.ears,
topKind: (era === "robe" || era === "drow" || (sex === "f" && era !== "spacer" && era !== "wild")) ? (sex === "f" ? "dress" : "robe") : (era === "greek" || era === "egypt" || era === "wild" ? "robe" : "coat"),
bottomKind: "trousers", hat: WF_KIT_HAT[hatK] || "none", hatColor: wfDark(pal[1], 0.2), back: w.back || null, backColor: w.back ? wfDark(pal[0], 0.4) : null, layer: era === "soldier" ? "armor" : null };
g = wPerson(seed, { ozCos: "oz_wf_" + era, look: look, sex: sex, child: !!kid });
}
if (w.scale)
g.scale.multiplyScalar(w.scale);
g.userData.wfMine = 1;
g.userData.wfSeed = seed;
return g;
},
function (S, i) {
var R = S.R, L = wfLimits(), n = 1 + L.per - (i % 2 === 1 && L.per > 2 ? 1 : 0);
var G = { g: new THREE.Group(), people: [], prop: null, spot: null, i: i, t: Math.random() * 4, walker: -1 };
G.g.userData.wfMine = 1;
G.g.visible = false;
for (var k = 0; k < n; k++) {
var p = wfPerson(S.key, R, i * 5 + k);
G.g.add(p);
G.people.push({ g: p, home: null, a: 0 });
}
if (R.props && R.props.length && (!wfLite() || i % 2 === 0)) {
var kind = R.props[i % R.props.length], C = Object.assign({ n: i }, R.C || {});
G.prop = wfProp(kind, C);
if (G.prop) {
G.prop.userData.wfMine = 1;
G.g.add(G.prop);
if (typeof shadowsFor === "function")
try {
shadowsFor(G.prop, !wfLite());
}
catch (e) { }
}
}
if (n >= 3)
G.walker = n - 1;
S.W.g.add(G.g);
return G;
},
function (S, G, spot) {
var W = S.W, R = S.R, cnt = 0, a0 = wfHashF("a" + spot.x.toFixed(0) + spot.z.toFixed(0)) * Math.PI * 2;
G.spot = spot;
G.g.position.set(0, 0, 0);
G.people.forEach(function (P, k) {
var ok = null, px = 0, pz = 0;
for (var tr = 0; tr < 6 && ok == null; tr++) {
var a = a0 + (k / G.people.length) * Math.PI * 2 + tr * 0.5, rr = k === G.walker ? 2.4 : 1.15 + 0.15 * tr;
px = spot.x + Math.cos(a) * rr;
pz = spot.z + Math.sin(a) * rr;
ok = wfOkAt(W, R, px, pz, spot.y + 1, 0.5);
}
if (ok == null) {
P.g.visible = false;
P.home = null;
return;
}
P.g.visible = true;
P.g.position.set(px, ok, pz);
P.g.rotation.y = Math.atan2(spot.x - px, spot.z - pz);
P.home = { x: px, y: ok, z: pz };
P.tx = px;
P.tz = pz;
P.wait = 2 + Math.random() * 5;
cnt++;
});
if (G.prop) {
var pa = a0 + Math.PI / G.people.length, ok2 = null, qx = 0, qz = 0;
for (var t2 = 0; t2 < 6 && ok2 == null; t2++) {
var aa = pa + t2 * 1.05;
qx = spot.x + Math.cos(aa) * 2.6;
qz = spot.z + Math.sin(aa) * 2.6;
ok2 = wfOkAt(W, R, qx, qz, spot.y + 1, 1.3);
}
if (ok2 != null) {
G.prop.visible = true;
G.prop.position.set(qx, ok2, qz);
G.prop.rotation.y = Math.atan2(spot.x - qx, spot.z - qz);
}
else
G.prop.visible = false;
}
G.g.visible = cnt > 0;
return cnt > 0;
},
function (W) {
var key = W.key, R = wfRecipe(key);
if (!R || !W.g)
return null;
var S = WF.st[key];
if (S && S.g === W.g)
return S;
S = WF.st[key] = { key: key, W: W, R: R, g: W.g, groups: [], spots: null, scanAt: performance.now() + 1500, assignAt: 0, made: 0, sig: 0, sigAt: 0, rescans: 0 };
return S;
},
function (S) {
var L = wfLimits(), P = camera.position, base = S.W.base || 0, px = P.x - base, pz = P.z;
var want = Math.round(L.groups * (S.R.n || 1)), first = performance.now() < S.firstUntil;
var c = [];
for (var i = 0; i < S.spots.length; i++) {
var s = S.spots[i], d = Math.hypot(s.x - px, s.z - pz);
if (d < L.reach)
c.push({ s: s, d: d });
}
c.sort(function (a, b) { return a.d - b.d; });
c = c.slice(0, want);
var wanted = new Set(c.map(function (q) { return q.s; }));
for (var mk = 0; mk < 3 && S.groups.length < Math.min(want, c.length); mk++)
S.groups.push(wfMakeGroup(S, S.groups.length));
var free = c.filter(function (q) { return !S.groups.some(function (G) { return G.spot === q.s; }); });
S.groups.forEach(function (G) {
if (G.spot && wanted.has(G.spot))
return;
var gd = G.spot ? Math.hypot(G.spot.x - px, G.spot.z - pz) : 1e9;
if (G.spot && gd < L.pop)
return;
for (var k = 0; k < free.length; k++) {
var q = free[k];
if (!first && q.d < L.pop * 0.8)
continue;
if (wfPlace(S, G, q.s)) {
free.splice(k, 1);
return;
}
else {
free.splice(k, 1);
k--;
}
}
if (G.spot && !wanted.has(G.spot) && gd > L.see) {
G.g.visible = false;
}
});
},
function (S, dt) {
var L = wfLimits(), P = camera.position, base = S.W.base || 0, px = P.x - base, pz = P.z, now = performance.now(), W = S.W;
S.groups.forEach(function (G) {
if (!G.spot)
return;
var d = Math.hypot(G.spot.x - px, G.spot.z - pz), vis = d < L.see;
if (G.g.visible !== vis)
G.g.visible = vis;
if (!vis)
return;
G.t -= dt;
if (G.t <= 0) {
G.t = 2.5 + Math.random() * 3.5;
var talker = G.people[Math.floor(Math.random() * G.people.length)];
if (talker && talker.home && G.people.indexOf(talker) !== G.walker) {
var u = talker.g.userData;
u.act = Math.random() < 0.15 ? "wave" : "talk";
u.actUntil = now + 2400 + Math.random() * 1800;
u.actSeq = (u.actSeq || 0) + 1;
}
}
if (G.walker >= 0) {
var Wk = G.people[G.walker];
if (Wk && Wk.home && Wk.g.visible) {
if (Wk.wait > 0)
Wk.wait -= dt;
else {
var g = Wk.g, dx = Wk.tx - g.position.x, dz = Wk.tz - g.position.z, dd = Math.hypot(dx, dz);
if (dd < 0.3) {
Wk.wait = 3 + Math.random() * 6;
for (var tr = 0; tr < 4; tr++) {
var a = Math.random() * 6.283, r = 1.5 + Math.random() * 4, tx = G.spot.x + Math.cos(a) * r, tz = G.spot.z + Math.sin(a) * r;
if (wfOkAt(W, S.R, tx, tz, G.spot.y + 1, 0.5) != null) {
Wk.tx = tx;
Wk.tz = tz;
break;
}
}
}
else {
var st = Math.min(dd, 1.05 * dt), nx = g.position.x + dx / dd * st, nz = g.position.z + dz / dd * st, ny = wfOkAt(W, S.R, nx, nz, g.position.y + 1, 0.35);
if (ny == null) {
Wk.tx = g.position.x;
Wk.tz = g.position.z;
Wk.wait = 1;
}
else {
g.position.set(nx, ny, nz);
g.rotation.y = Math.atan2(dx, dz);
if (d < 45 && g.userData.anim)
try {
g.userData.anim(now / 1000, dt);
}
catch (e) { }
}
}
}
}
}
});
},
function () {
if (WFDV.el)
return WFDV.el;
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;z-index:99990;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;" +
"background:radial-gradient(ellipse at center,rgba(20,16,30,.88) 0%,rgba(6,5,10,.97) 70%);color:#F0DCA0;font:600 17px/1.4 Georgia,serif;text-align:center;transition:opacity .35s";
document.body.appendChild(v);
WFDV.el = v;
return v;
}
];
});
