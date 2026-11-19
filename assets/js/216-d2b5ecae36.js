/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var STL = { b: null, busy: false, open: false, sel: 0, say: "", row: null, at: 0, q: 0, giveUp: false, promptKey: null, warned: 0, signs: {} };
var STL_N = 16, STL_PITCH = 3.4, STL_AISLE = 4.2;
var STL_COLS = ["#C8283A", "#2E6FB0", "#2F8A4A", "#D89A20", "#7A3FA0", "#1E8C8C", "#C85A20", "#8A6A3A"];
function stlInCity() { return typeof inCityNow === "function" && inCityNow() && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on); }
function stlW(V, lx, lz) { var c = Math.cos(V.th), s = Math.sin(V.th); return { x: V.x + lx * c + lz * s, z: V.z - lx * s + lz * c }; }
function stlL(V, x, z) { var dx = x - V.x, dz = z - V.z, c = Math.cos(V.th), s = Math.sin(V.th); return { x: dx * c - dz * s, z: dx * s + dz * c }; }
function stlSpot(i) { var row = i < 8 ? 0 : 1, k = i % 8; return { lx: (k - 3.5) * STL_PITCH, lz: row ? STL_AISLE : -STL_AISLE, face: row ? Math.PI : 0 }; }
function stlMarketSign() {
var O = (typeof store !== "undefined" && store.objects) || [];
for (var i = 0; i < O.length; i++)
if (O[i].archetype === "signboard" && O[i].sign === "The Night Market")
return O[i];
return null;
}
function stlClear(x, z, th, cityId) {
var V = { x: x, z: z, th: th }, y0 = terrainY(x, z);
if (typeof ATLC !== "undefined" && ATLC && typeof atlNearStair === "function") {
for (var i = -1; i <= 1; i++)
for (var j = -1; j <= 1; j++) {
var p = stlW(V, i * 14, j * 6), dx = p.x - ATLC.x, dz = p.z - ATLC.z;
if (atlNearStair(Math.hypot(dx, dz), Math.atan2(dz, dx)))
return false;
}
}
var far = [];
if (typeof DK !== "undefined" && DK.gate)
far.push(DK.gate);
if (typeof TN !== "undefined" && TN.board)
far.push(TN.board);
if (typeof SHW !== "undefined" && SHW.v)
Object.keys(SHW.v).forEach(function (k) { if (SHW.v[k])
far.push({ x: SHW.v[k].x, z: SHW.v[k].z, r: 34 }); });
if (typeof FEST !== "undefined" && FEST.solids)
FEST.solids.forEach(function (s) { far.push({ x: s.x, z: s.z, r: s.r + 18 }); });
for (var f = 0; f < far.length; f++) {
if (Math.hypot(far[f].x - x, far[f].z - z) < (far[f].r || 30))
return false;
}
for (var lx = -16; lx <= 16; lx += 2)
for (var lz = -7; lz <= 7; lz += 2) {
var q = stlW(V, lx, lz), y = terrainY(q.x, q.z);
if (Math.abs(y - y0) > 0.35)
return false;
try {
if (typeof blockedAt === "function" && blockedAt(q.x, q.z, y + 0.2))
return false;
}
catch (e) { }
if (typeof atlIsWater === "function") {
try {
if (atlIsWater(q.x, q.z))
return false;
}
catch (e) { }
}
if (typeof roadAt === "function") {
try {
var rd = roadAt(q.x, q.z);
if (rd && (rd.kind === "ring" || rd.kind === "avenue"))
return false;
}
catch (e) { }
}
}
var O = store.objects;
for (var o = 0; o < O.length; o++) {
var ob = O[o];
if ((ob.realm || 0) !== cityId)
continue;
if (Math.abs(ob.x - x) > 26 || Math.abs(ob.z - z) > 26)
continue;
var l = stlL(V, ob.x, ob.z);
if (l.x > -18 && l.x < 18 && l.z > -9 && l.z < 9)
return false;
}
return true;
}
function stlPlaceTick() {
if (STL.row || STL.giveUp)
return;
if (typeof ATLC === "undefined" || !ATLC || typeof RMAP === "undefined" || !RMAP.list || !RMAP.list.length)
return;
var cr = somnucorRealm();
if (!cr || (store.here || 0) !== cr.id)
return;
var sg = stlMarketSign();
if (!sg)
return;
var dx = sg.x - ATLC.x, dz = sg.z - ATLC.z, r0 = Math.hypot(dx, dz), a0 = Math.atan2(dz, dx);
var OFF = [-22, -30, -38, -46, -54, -62, 22, 30, 38, 46, 54, 62, -70, -78, 70, 78], nA = 31, phone = typeof LITE !== "undefined" && !!LITE;
for (var t = 0; t < (phone ? 3 : 6); t++) {
var ai = STL.q % nA, ri = Math.floor(STL.q / nA);
if (ri >= OFF.length) {
STL.giveUp = true;
return;
}
var rad = r0 + OFF[ri], a = a0 + (ai % 2 ? 1 : -1) * Math.ceil(ai / 2) * 12 / rad, x = ATLC.x + Math.cos(a) * rad, z = ATLC.z + Math.sin(a) * rad;
var th = Math.atan2(-Math.cos(a), -Math.sin(a));
STL.q++;
if (stlClear(x, z, th, cr.id)) {
stlBuild(x, z, th);
return;
}
}
}
function stlM(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
var STL_GEO = null;
function stlGeo() {
if (STL_GEO)
return STL_GEO;
STL_GEO = { counter: new THREE.BoxGeometry(2.6, 0.95, 0.9), top: new THREE.BoxGeometry(2.8, 0.06, 1.05), post: new THREE.BoxGeometry(0.1, 2.5, 0.1),
awn: new THREE.BoxGeometry(2.9, 0.05, 1.5), valance: new THREE.BoxGeometry(2.9, 0.28, 0.04), sign: new THREE.PlaneGeometry(2.4, 0.6),
good: new THREE.BoxGeometry(0.28, 0.24, 0.28), jar: new THREE.CylinderGeometry(0.12, 0.12, 0.3, 10), lamp: new THREE.SphereGeometry(0.11, 10, 8) };
return STL_GEO;
}
function stlSignTex(i, st) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 128;
var x = c.getContext("2d");
var col = (st && st.holder && st.colour) || "#5A5048";
x.fillStyle = "#1A1410";
x.fillRect(0, 0, 512, 128);
x.strokeStyle = col;
x.lineWidth = 8;
x.strokeRect(6, 6, 500, 116);
x.textAlign = "center";
x.fillStyle = "#F2E6C4";
if (st && st.holder) {
var n = st.name || "A stall", fs = 52;
x.font = "700 " + fs + "px Georgia,serif";
while (x.measureText(n).width > 480 && fs > 22) {
fs -= 4;
x.font = "700 " + fs + "px Georgia,serif";
}
x.fillText(n, 256, st.sign ? 64 : 78);
if (st.sign) {
var s2 = st.sign, f2 = 26;
x.font = f2 + "px sans-serif";
while (x.measureText(s2).width > 480 && f2 > 14) {
f2 -= 2;
x.font = f2 + "px sans-serif";
}
x.fillStyle = "#D8C8A0";
x.fillText(s2, 256, 104);
}
}
else {
x.font = "700 44px Georgia,serif";
x.fillText("To let · Stall " + (i + 1), 256, 64);
x.font = "24px sans-serif";
x.fillStyle = "#B8A888";
x.fillText("25 gold a day · press E", 256, 102);
}
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace)
t.colorSpace = THREE.SRGBColorSpace;
return t;
}
function stlBuild(x, z, th) {
var G = stlGeo(), y0 = terrainY(x, z), g = new THREE.Group();
g.name = "dreamers-row";
g.position.set(x, y0, z);
g.rotation.y = th;
g.userData.noCull = 1;
var V = STL.row = { x: x, z: z, y: y0, th: th, g: g, st: [] };
var wood = stlM(0x6A4A2E), top = stlM(0x8A6A44), post = stlM(0x3A2A1C);
[-1, 1].forEach(function (e) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 128;
var cx = c.getContext("2d");
cx.fillStyle = "#120E1C";
cx.fillRect(0, 0, 512, 128);
cx.strokeStyle = "#E8C67A";
cx.lineWidth = 6;
cx.strokeRect(6, 6, 500, 116);
cx.textAlign = "center";
cx.fillStyle = "#F2E6C4";
cx.font = "700 50px Georgia,serif";
cx.fillText("Dreamers' Row", 256, 62);
cx.font = "24px sans-serif";
cx.fillStyle = "#D8C8A0";
cx.fillText("stalls kept by dreamers · the Night Market", 256, 102);
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace)
t.colorSpace = THREE.SRGBColorSpace;
var arch = new THREE.Group();
arch.add(P(new THREE.BoxGeometry(0.16, 3.4, 0.16), post, -1.5, 1.7, 0));
arch.add(P(new THREE.BoxGeometry(0.16, 3.4, 0.16), post, 1.5, 1.7, 0));
var bm = new THREE.MeshBasicMaterial({ map: t }), bg = new THREE.PlaneGeometry(3.0, 0.75);
arch.add(P(bg, bm, 0, 3.2, 0.02));
arch.add(P(bg, bm, 0, 3.2, -0.02, 0, Math.PI, 0));
arch.position.set(e * (4 * STL_PITCH + 1.6), 0, 0);
arch.rotation.y = Math.PI / 2;
g.add(arch);
});
for (var i = 0; i < STL_N; i++) {
var sp = stlSpot(i), s = new THREE.Group();
s.position.set(sp.lx, 0, sp.lz);
s.rotation.y = sp.face;
var awn = stlM(0x5A5048);
s.add(P(G.counter, wood, 0, 0.475, 0.35));
s.add(P(G.top, top, 0, 0.98, 0.35));
[[-1.35, -0.35], [1.35, -0.35], [-1.35, 0.75], [1.35, 0.75]].forEach(function (q) { s.add(P(G.post, post, q[0], 1.25, q[1])); });
s.add(P(G.awn, awn, 0, 2.55, 0.25, 0.18));
s.add(P(G.valance, awn, 0, 2.32, 1.0));
var signMat = new THREE.MeshBasicMaterial({ map: stlSignTex(i, null) }), sg = P(G.sign, signMat, 0, 2.85, -0.36);
s.add(sg);
var goods = new THREE.Group();
goods.position.set(0, 1.01, 0.35);
s.add(goods);
var lamp = P(G.lamp, new THREE.MeshBasicMaterial({ color: 0xFFD890 }), 1.2, 2.2, 0.9);
s.add(lamp);
g.add(s);
V.st.push({ g: s, awn: awn, sign: signMat, goods: goods, key: "" });
}
scene.add(g);
stlDress();
return V;
}
function stlDress() {
var V = STL.row, B = STL.b;
if (!V || !B || !B.stalls)
return;
var G = stlGeo();
B.stalls.forEach(function (st) {
var i = st.id - 1, S = V.st[i];
if (!S)
return;
var key = (st.holder || "") + "|" + st.name + "|" + st.sign + "|" + st.colour + "|" + (st.goods || []).length;
if (S.key === key)
return;
S.key = key;
S.awn.color.set(st.holder ? (st.colour || "#C8283A") : "#5A5048");
if (S.sign.map)
S.sign.map.dispose();
S.sign.map = stlSignTex(i, st);
S.sign.needsUpdate = true;
while (S.goods.children.length)
S.goods.remove(S.goods.children[0]);
var n = Math.min(6, (st.goods || []).length);
for (var k = 0; k < n; k++) {
var h = stlHash(st.goods[k].name || ""), col = new THREE.Color().setHSL((h % 360) / 360, 0.45, 0.55);
var m = P(k % 2 ? G.jar : G.good, stlM(col), -1.0 + k * 0.4, k % 2 ? 0.15 : 0.12, ((h >>> 9) % 3 - 1) * 0.15);
m.rotation.y = (h % 100) / 50;
S.goods.add(m);
}
});
}
function stlHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
var V = STL.row;
if (V && Math.abs(x - V.x) < 22 && Math.abs(z - V.z) < 22 && !(typeof store !== "undefined" && store.inside) && feet < V.y + 2.6) {
var l = stlL(V, x, z);
if (Math.abs(l.x) < 8 * STL_PITCH / 2 + 0.2) {
var az = Math.abs(l.z);
if (az > STL_AISLE - 1.25 && az < STL_AISLE + 0.65)
return true;
}
}
return ba.apply(this, arguments);
};
})();
function stlLoad(force) { return __ZC(216, 0, this, arguments, new.target); }
function stlAct(name, args, then) { return __ZC(216, 1, this, arguments, new.target); }
function stlMine() { var B = STL.b; return B && B.stalls ? B.stalls.filter(function (s) { return s.mine; })[0] : null; }
function stlGo(i) { return __ZC(216, 2, this, arguments, new.target); }
function stlNear() {
var V = STL.row;
if (!V || !stlInCity())
return -1;
var P = camera.position;
if (Math.abs(P.x - V.x) > 24 || Math.abs(P.z - V.z) > 24)
return -1;
var l = stlL(V, P.x, P.z);
if (Math.abs(l.z) > STL_AISLE - 0.4)
return -1;
var k = Math.round(l.x / STL_PITCH + 3.5);
if (k < 0 || k > 7 || Math.abs(l.x - (k - 3.5) * STL_PITCH) > 1.5)
return -1;
var row = l.z < 0 ? 0 : 1;
if (Math.abs(l.z) < 1.6 && typeof yaw !== "undefined") {
var f = stlL(V, P.x - Math.sin(yaw), P.z - Math.cos(yaw));
row = f.z < l.z ? 0 : 1;
}
return row * 8 + k;
}
function stlPromptTick() {
if (typeof WLD !== "undefined" && WLD.on)
return;
var i = stlNear(), b = null;
if (i >= 0) {
var st = STL.b && STL.b.stalls && STL.b.stalls[i];
var line = st && st.holder ? "🏪 <b>" + esc(st.name) + "</b> · " + (st.goods || []).length + " for sale · <b>press E</b> to look" : "🏪 <b>Stall " + (i + 1) + "</b> · to let · <b>press E</b> to rent it";
b = { html: line, fn: function () { STL.sel = i + 1; stlOpen(); } };
}
var key = b ? b.html : null;
if (key !== STL.promptKey) {
STL.promptKey = key;
if (typeof worldPromptCity === "function")
worldPromptCity(b ? b.html : null, b ? b.fn : null);
}
}
function stlWhen(iso) { try {
var ms = new Date(iso).getTime() - Date.now();
if (ms <= 0)
return "ends now";
var h = Math.round(ms / 3600000);
return h < 48 ? h + " hour" + (h === 1 ? "" : "s") + " left" : Math.round(h / 24) + " days left";
}
catch (e) {
return "";
} }
function stlStallHtml(st) { return __ZC(216, 3, this, arguments, new.target); }
function stlFormHtml(st, fresh) { return __ZC(216, 4, this, arguments, new.target); }
function stlHtml() { return __ZC(216, 5, this, arguments, new.target); }
function stlPaint() { return __ZC(216, 6, this, arguments, new.target); }
function stlClick(e) { return __ZC(216, 7, this, arguments, new.target); }
function stlOpen() { STL.open = true; STL.say = ""; stlPaint(); stlLoad(true); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return STL.open; }, close: function () { STL.open = false; stlPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-stalls"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-stalls";
b.title = "Dreamers' Row at the Night Market: rent a stall, sell from your backpack, buy from others";
b.textContent = "🏪 Stalls";
b.onclick = function () { STL.sel = 0; stlOpen(); };
var pk = document.getElementById("me-worlds") || document.getElementById("me-shows");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
try {
if (stlInCity())
stlPlaceTick();
}
catch (e) {
if (!STL.warned && window.console) {
STL.warned = 1;
console.warn("[stalls]", e);
}
}
try {
var V = STL.row;
if (V) {
var on = stlInCity(), d = Math.hypot(camera.position.x - V.x, camera.position.z - V.z);
V.g.visible = on && d < 360;
}
}
catch (e) { }
try {
stlPromptTick();
}
catch (e) { }
}, 400);
setInterval(function () {
try {
var V = STL.row;
if (STL.open || (V && V.g.visible && Math.hypot(camera.position.x - V.x, camera.position.z - V.z) < 120))
stlLoad(false);
}
catch (e) { }
}, 5000);
