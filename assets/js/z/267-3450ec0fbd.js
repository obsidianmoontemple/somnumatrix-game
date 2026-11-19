/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(267, function () {
"use strict";
return [
function () {
if (SFX.dot)
return SFX.dot;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(0.35, "rgba(255,255,255,0.55)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, 64, 64);
return (SFX.dot = new THREE.CanvasTexture(c));
},
function (S) {
if (S.pat === "bark")
return [0x7A9A3A, 0xA87A3A, 0x5A7A2A];
if (S.pat === "stone")
return [0xB8B4A8, 0x9A968C];
if (S.pat === "woad")
return [0x6A8AE0, 0x4A6AC8];
if (S.pat === "spots")
return [0xA8D07A, 0x7AA04A];
if (S.pat === "freckles")
return [0xFFD8A0, 0xFFE8C0];
var g = S.glow || S.ink || S.col, c = new THREE.Color(g), w = c.clone().lerp(new THREE.Color(0xFFFFFF), 0.5);
return [g, w.getHex()];
},
function (g, S) {
var A = SFX_AIR[S.pat];
if (!A || !g || !g.children[0])
return;
var n = SFX.phone ? Math.ceil(A.n * 0.5) : A.n, pos = new Float32Array(n * 3), col = new Float32Array(n * 3), st = [], cols = sfxAirCols(S).map(function (h) { return new THREE.Color(h); });
for (var i = 0; i < n; i++)
st.push({ life: Math.random(), span: 2.5 + Math.random() * 2.5, a: Math.random() * 6.283, r: 0.3 + Math.random() * 0.3, y: 0.2 + Math.random() * 1.7, dx: 0, dz: 0, c: cols[i % cols.length], sp: 0.7 + Math.random() * 0.6 });
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
var P = new THREE.Points(geo, sfxPointsMat(A.s, A.add));
P.frustumCulled = false;
P.raycast = function () { };
P.name = "skin air";
P.userData.sfx = 1;
g.children[0].add(P);
SFX.list.push({ g: g, P: P, A: A, st: st, add: !!A.add, gone: 0 });
},
function (style, col) {
var key = "w:" + style + ":" + col;
if (SFX.mats[key])
return SFX.mats[key];
var cv = document.createElement("canvas");
cv.width = cv.height = 256;
var x = cv.getContext("2d"), C = new THREE.Color(col == null ? 0xC8A8FF : col);
function rgba(c, a) { return "rgba(" + Math.round(c.r * 255) + "," + Math.round(c.g * 255) + "," + Math.round(c.b * 255) + "," + a + ")"; }
var dark = C.clone().multiplyScalar(0.45), light = C.clone().lerp(new THREE.Color(0xFFFFFF), 0.55);
if (style === "bubble" || style === "crystal") {
var g = x.createLinearGradient(0, 256, 256, 0);
(col == null ? ["#9AF0FF", "#C8A8FF", "#FFB8E8", "#FFF0A8", "#A8FFD0"] : [rgba(light, 1), rgba(C, 1), rgba(light, 1), rgba(C, 1), rgba(light, 1)]).forEach(function (c, i) { g.addColorStop(i / 4, c); });
x.fillStyle = g;
x.fillRect(0, 0, 256, 256);
x.strokeStyle = "rgba(255,255,255,0.85)";
x.lineWidth = style === "crystal" ? 3 : 2.5;
if (style === "crystal") {
for (var q = 0; q < 14; q++) {
x.beginPath();
x.moveTo(0, 256);
x.lineTo(30 + q * 17, (q % 2 ? 40 : 0) + q * 6);
x.stroke();
}
}
else
for (var i = 0; i < 7; i++) {
x.beginPath();
x.moveTo(0, 256);
x.quadraticCurveTo(60 + i * 20, 200 - i * 14, 40 + i * 32, 0 + i * 12);
x.stroke();
}
}
else if (style === "butterfly" || style === "moth") {
var base = style === "moth" ? C.clone().lerp(new THREE.Color(0x8A7A62), 0.55) : C;
var g2 = x.createRadialGradient(0, 256, 10, 0, 256, 330);
g2.addColorStop(0, rgba(base.clone().lerp(new THREE.Color(0xFFFFFF), 0.25), 1));
g2.addColorStop(0.75, rgba(base, 1));
g2.addColorStop(1, rgba(base.clone().multiplyScalar(0.35), 1));
x.fillStyle = g2;
x.fillRect(0, 0, 256, 256);
x.strokeStyle = rgba(dark, 0.85);
x.lineWidth = 3;
for (var v = 0; v < 6; v++) {
x.beginPath();
x.moveTo(0, 256);
x.lineTo(60 + v * 36, v * 30);
x.stroke();
}
x.lineWidth = 18;
x.strokeStyle = rgba(base.clone().multiplyScalar(0.3), 0.9);
x.beginPath();
x.arc(0, 256, 300, -Math.PI / 2, 0);
x.stroke();
x.fillStyle = "rgba(255,255,255,0.85)";
for (var sp = 0; sp < 9; sp++) {
var aa = -Math.PI / 2 + sp * 0.17;
x.beginPath();
x.arc(Math.cos(aa) * 292, 256 + Math.sin(aa) * 292, 5, 0, 7);
x.fill();
}
x.fillStyle = rgba(dark, 1);
x.beginPath();
x.arc(150, 120, 22, 0, 7);
x.fill();
x.fillStyle = rgba(light, 1);
x.beginPath();
x.arc(150, 120, 12, 0, 7);
x.fill();
if (style === "moth")
for (var k = 0; k < 900; k++) {
x.fillStyle = "rgba(255,255,255,0.05)";
x.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
}
}
else if (style === "dragonfly") {
x.fillStyle = rgba(light, 0.55);
x.fillRect(0, 0, 256, 256);
x.strokeStyle = rgba(dark, 0.6);
x.lineWidth = 1;
for (var a2 = 0; a2 < 256; a2 += 10) {
x.beginPath();
x.moveTo(a2, 0);
x.lineTo(a2 + 20, 256);
x.stroke();
x.beginPath();
x.moveTo(0, a2);
x.lineTo(256, a2 - 12);
x.stroke();
}
x.lineWidth = 3;
x.strokeStyle = rgba(dark, 0.9);
x.beginPath();
x.moveTo(0, 250);
x.lineTo(256, 200);
x.stroke();
}
else if (style === "petal") {
var g3 = x.createRadialGradient(0, 256, 10, 0, 256, 340);
g3.addColorStop(0, "rgba(255,255,255,1)");
g3.addColorStop(0.5, rgba(light, 1));
g3.addColorStop(1, rgba(C, 1));
x.fillStyle = g3;
x.fillRect(0, 0, 256, 256);
x.strokeStyle = rgba(C.clone().multiplyScalar(0.8), 0.5);
x.lineWidth = 1.5;
for (var p2 = 0; p2 < 12; p2++) {
x.beginPath();
x.moveTo(0, 256);
x.quadraticCurveTo(80 + p2 * 8, 180 - p2 * 6, 40 + p2 * 20, p2 * 8);
x.stroke();
}
}
else {
var lc = col == null ? new THREE.Color(0x6AA84A) : C;
x.fillStyle = rgba(lc, 1);
x.fillRect(0, 0, 256, 256);
x.strokeStyle = rgba(lc.clone().lerp(new THREE.Color(0xFFFFE0), 0.5), 0.9);
x.lineWidth = 4;
x.beginPath();
x.moveTo(0, 256);
x.lineTo(256, 0);
x.stroke();
x.lineWidth = 2;
for (var l = 1; l < 9; l++) {
var t = l / 9;
x.beginPath();
x.moveTo(t * 256, 256 - t * 256);
x.lineTo(t * 256 + 40, 256 - t * 256 + 20);
x.moveTo(t * 256, 256 - t * 256);
x.lineTo(t * 256 - 20, 256 - t * 256 - 40);
x.stroke();
}
}
return (SFX.mats[key] = new THREE.CanvasTexture(cv));
},
function (L) {
var S = typeof atSkinOf === "function" ? atSkinOf(L) : null;
if (S) {
if (S.pat === "ember")
return "fire";
if (S.pat === "frost")
return "frost";
if (S.pat === "gild")
return "radiant";
if (S.pat === "star" || S.pat === "moon")
return "arcane";
}
var c = new THREE.Color(L && L.skin != null ? L.skin : 0xB8863A), h = {};
c.getHSL(h);
if (h.s < 0.18)
return h.l > 0.55 ? "frost" : h.l < 0.25 ? "acid" : "lightning";
var d = h.h * 360;
if (d < 22 || d > 330)
return "fire";
if (d < 38)
return h.l < 0.42 ? "acid" : "fire";
if (d < 65)
return "radiant";
if (d < 165)
return "poison";
if (d < 250)
return "lightning";
return "arcane";
},
function (g, L, fromCam) {
var K = SFX_BREATH[sfxBreathKind(L)] || SFX_BREATH.fire, n = SFX.phone ? 70 : 130;
var pos = new Float32Array(n * 3), col = new Float32Array(n * 3), st = [];
for (var i = 0; i < n; i++)
st.push({ t0: (i / n) * 1.6, life: 0.75 + Math.random() * 0.35, rx: (Math.random() - 0.5) * 2, ry: (Math.random() - 0.5) * 2, rz: Math.random(), o: null, d: null });
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
var P = new THREE.Points(geo, sfxPointsMat(K.size, K.add));
P.frustumCulled = false;
P.raycast = function () { };
if (typeof scene !== "undefined" && scene)
scene.add(P);
SFX.breaths.push({ g: g, cam: !!fromCam, P: P, K: K, st: st, t: 0, cols: K.c.map(function (h) { return new THREE.Color(h); }) });
},
function (b, o, d) {
if (b.cam && typeof camera !== "undefined") {
camera.getWorldDirection(d);
o.copy(camera.position).addScaledVector(d, 0.45);
o.y -= 0.12;
return true;
}
var g = b.g;
if (!g || !g.parent)
return false;
var body = g.children[0];
if (!body)
return false;
var hb = null;
body.traverse(function (m) { if (!hb && m.isBone && /^head$/i.test(m.name))
hb = m; });
if (hb) {
hb.getWorldPosition(o);
}
else {
o.set(0, 1.62, 0);
body.localToWorld(o);
}
d.set(0, -0.08, 1);
d.transformDirection(body.matrixWorld).normalize();
if (hb) {
var up = new THREE.Vector3(0, 1, 0).transformDirection(body.matrixWorld);
o.addScaledVector(up, 0.02).addScaledVector(d, 0.16);
}
return true;
},
function () {
if (!(typeof walkMode !== "undefined" && walkMode))
return;
var L = meLook();
if (L.species !== "dragonborn") {
setStatus("Only a Dragonborn has a breath. Choose Dragonborn in the Wardrobe (You).");
return;
}
var now = performance.now();
if (now < SFX.cool)
return;
SFX.cool = now + 2600;
var first = typeof meView !== "undefined" && meView === "eyes";
sfxBreathe(meG, L, first || !meG);
try {
L.breath = { n: ((L.breath && L.breath.n) || 0) + 1 };
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
if (!SFX.told) {
SFX.told = 1;
setStatus("<b>You breathe " + SFX_BREATH[sfxBreathKind(L)].name + ".</b> Your skin decides your breath.");
}
},
function (L, S, set) {
var h = "";
if (L.species === "fairy") {
h += selectRow("Wings", S.wingStyle, SFX_WSTYLE, L.wingStyle || "bubble", function (v) { set("wingStyle", v || "bubble"); }, SFX_WSTYLE_L);
h += swatchRow("Wing colour", S.wingColor, SFX_WCOL, L.wingColor, function (v) { set("wingColor", v); });
h += selectRow("Wing size", S.wingSize, SFX_WSIZE, String(L.wingSize || "1"), function (v) { set("wingSize", v || "1"); }, SFX_WSIZE_L);
h += selectRow("Wing glow", S.wingGlow, ["on", "off"], L.wingGlow === false ? "off" : "on", function (v) { set("wingGlow", v !== "off"); }, ["glowing", "no glow"]);
}
if (L.species === "dragonborn") {
var k = sfxBreathKind(L);
h += '<div class="lk-row"><div class="lk-h">Your breath</div><span style="font-size:12.5px;color:var(--bone,#ddd)">' + SFX_BREATH[k].name.charAt(0).toUpperCase() + SFX_BREATH[k].name.slice(1) +
'</span> <span style="font-size:11.5px;color:var(--dim,#999)">from your skin. Press Z, or Breathe, to use it. Another skin gives another breath.</span></div>';
}
return h;
}
];
});
