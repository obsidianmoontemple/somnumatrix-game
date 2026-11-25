/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(361, function () {
"use strict";
return [
function (L, inner, top) {
var S = dlShelves(inner, top), out = [];
if (!S.length)
return out;
function add(t, r, p, real) {
r = Math.round(+r || 0);
if (!(r >= 1))
r = 3;
r = Math.min(r, S.length);
p = Math.round(+p || 0);
if (!(p >= 1 && p <= 5))
p = 3;
var sh = S[r - 1], x = (p - 3) / 2 * Math.max(0, sh[1] - 0.24);
for (var i = 0; i < out.length; i++)
if (out[i].row === r && Math.abs(out[i].x - x) < 0.15)
return;
out.push({ t: t, real: real, x: x, y: sh[0], row: r, rows: S.length, pos: p });
}
add(dlBookName(L), L.bkrow, L.bkpos, true);
(Array.isArray(L.decoys) ? L.decoys : []).slice(0, DL_DECOY_MAX).forEach(function (d) {
var t = d && typeof d === "object" ? String(d.t || "").replace(/[<>\u0000-\u001f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 40) : "";
if (t)
add(t, d.r, d.p, false);
});
return out;
},
function (title, trim) {
var key = "dlbk|" + trim + "|" + title;
if (typeof SIGN_TEX !== "undefined" && SIGN_TEX[key])
return SIGN_TEX[key];
var c = document.createElement("canvas");
c.width = 96;
c.height = 384;
var x = c.getContext("2d");
var base = new THREE.Color(trim), dark = base.getHSL({}).l > 0.45;
x.fillStyle = "#" + base.getHexString();
x.fillRect(0, 0, 96, 384);
var ink = dark ? "#1A1208" : "#F4E4B8";
x.strokeStyle = ink;
x.globalAlpha = 0.7;
x.lineWidth = 3;
x.strokeRect(7, 7, 82, 370);
x.globalAlpha = 1;
x.fillStyle = ink;
x.save();
x.translate(48, 192);
x.rotate(Math.PI / 2);
var F = typeof fitLines === "function" ? fitLines(x, title, 340, 1, 50, 16, "700", "Georgia, serif") : { size: 30, lines: [title] };
x.font = "700 " + F.size + "px Georgia, serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(F.lines[0] || "", 0, 2);
x.restore();
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
if (typeof SIGN_TEX !== "undefined")
SIGN_TEX[key] = t;
return t;
},
function (L) {
var o = {};
for (var k in DL_BASE)
o[k] = (L && L[k] !== undefined) ? L[k] : DL_BASE[k];
if (Array.isArray(o.decoys))
o.decoys = o.decoys.filter(function (d) { return d && typeof d === "object"; }).map(function (d) { return { t: d.t, r: d.r, p: d.p }; });
return o;
},
function (shape, d) {
var P = [], i, a, N = 18;
if (shape === "arch") {
var hw = 1.1 + d;
P.push([-hw, 0], [hw, 0]);
for (i = 0; i <= N; i++) {
a = Math.PI * i / N;
P.push([hw * Math.cos(a), 3 + hw * Math.sin(a)]);
}
}
else if (shape === "pointed") {
var w = 1.1 + d, R = 2 * w;
P.push([-w, 0], [w, 0]);
for (i = 0; i <= N / 2; i++) {
a = (Math.PI / 3) * i / (N / 2);
P.push([-w + R * Math.cos(a), 2.8 + R * Math.sin(a)]);
}
for (i = N / 2 - 1; i >= 0; i--) {
a = (Math.PI / 3) * i / (N / 2);
P.push([w - R * Math.cos(a), 2.8 + R * Math.sin(a)]);
}
}
else if (shape === "round") {
var r = 1.6 + d, cy = 1.5, c = Math.sqrt(r * r - cy * cy), a0 = Math.atan2(-cy, c), a1 = Math.atan2(-cy, -c) + Math.PI * 2;
P.push([-c, 0]);
for (i = 0; i <= N * 2; i++) {
a = a0 + (a1 - a0) * i / (N * 2);
P.push([r * Math.cos(a), cy + r * Math.sin(a)]);
}
}
else if (shape === "hex") {
var hw3 = 1.2 + d;
P.push([-hw3, 0], [hw3, 0], [hw3, 2.9], [hw3 * 0.45, 3.9 + d], [-hw3 * 0.45, 3.9 + d], [-hw3, 2.9]);
}
else if (shape === "keyhole") {
var rk = 1.0 + d, nk = 0.62 + d, bk = 1.15 + d, ck = 3.0, yj = ck - Math.sqrt(Math.max(0.01, rk * rk - nk * nk)), ak = Math.atan2(yj - ck, nk);
P.push([-bk, 0], [bk, 0], [nk, yj]);
for (i = 1; i < N * 2; i++) {
a = ak + (Math.PI - 2 * ak) * i / (N * 2);
P.push([rk * Math.cos(a), ck + rk * Math.sin(a)]);
}
P.push([-nk, yj]);
}
else if (shape === "porthole") {
var rp = 1.55 + d, cp = 1.75;
for (i = 0; i < N * 2; i++) {
a = -Math.PI / 2 + Math.PI * 2 * i / (N * 2);
P.push([rp * Math.cos(a), cp + rp * Math.sin(a)]);
}
}
else {
var hw2 = (shape === "double" ? 1.4 : shape === "wide" ? 1.8 : 1.1) + d, h = (shape === "wide" ? 3.6 : 4) + d;
P.push([-hw2, 0], [hw2, 0], [hw2, h], [-hw2, h]);
}
return P;
},
function (leaf) {
var key = "st|" + leaf;
if (DLK.tex[key])
return DLK.tex[key];
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d");
var base = new THREE.Color(leaf), hsl = {};
base.getHSL(hsl);
for (var j = 0; j < 8; j++)
for (var i = 0; i < 4; i++) {
var col = new THREE.Color().setHSL((hsl.h + ((i * 3 + j * 5) % 7 - 3) * 0.06 + 1) % 1, Math.max(0.45, hsl.s), Math.min(0.72, Math.max(0.35, hsl.l + ((i + j) % 3 - 1) * 0.1)));
x.fillStyle = "#" + col.getHexString();
x.fillRect(i * 64, j * 32, 64, 32);
}
x.strokeStyle = "#15120E";
x.lineWidth = 5;
for (var k = 0; k <= 4; k++) {
x.beginPath();
x.moveTo(k * 64, 0);
x.lineTo(k * 64, 256);
x.stroke();
}
for (var m = 0; m <= 8; m++) {
x.beginPath();
x.moveTo(0, m * 32);
x.lineTo(256, m * 32);
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(0.45, 0.25);
DLK.tex[key] = t;
return t;
},
function (name, plate) {
var P = dlRow(DL_PLATES, plate), key = "dl|" + plate + "|" + name;
if (typeof SIGN_TEX !== "undefined" && SIGN_TEX[key])
return SIGN_TEX[key];
var c = document.createElement("canvas");
c.width = 512;
c.height = 96;
var x = c.getContext("2d");
x.fillStyle = dlCss(P[2]);
x.fillRect(0, 0, 512, 96);
x.strokeStyle = P[3];
x.globalAlpha = 0.5;
x.lineWidth = 4;
x.strokeRect(8, 8, 496, 80);
x.globalAlpha = 1;
x.fillStyle = P[3];
var F = typeof fitLines === "function" ? fitLines(x, String(name || ""), 470, 1, 56, 22, "700", "Georgia, serif") : { size: 40, lines: [String(name || "")] };
x.font = "700 " + F.size + "px Georgia, serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(F.lines[0] || "", 256, 50);
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
if (typeof SIGN_TEX !== "undefined")
SIGN_TEX[key] = t;
return t;
},
function (G0, spec, L0) {
var L = dlFull(L0);
while (G0.children.length)
G0.remove(G0.children[0]);
delete G0.userData.anim;
delete G0.userData.dlBooks;
var g = new THREE.Group();
G0.add(g);
var TY = dlRow(DL_TYPES, L.type)[0], tyAnim = null;
var inner = dlPts(L.shape, 0), outer = dlPts(L.shape, 0.5), top = dlTop(inner), oTop = dlTop(outer), oHW = dlHalfW(outer), iHW = dlHalfW(inner);
var F = dlRow(DL_FRAMES, L.frame), trim = dlHex(L.trim, 0xC9A868), leaf = dlHex(L.leaf, 0x141620), glow = dlHex(L.glow, 0x9FD8FF);
if (TY === "ringgate") {
var rgAnim = dlRingGate(g, spec, L, F, trim, leaf, glow);
if (typeof gwBake === "function")
try {
gwBake(G0);
}
catch (e) { }
if (typeof shadowsFor === "function")
shadowsFor(G0, true);
var rph = (spec.x || 0) * 0.37;
G0.userData.anim = function (t) { rgAnim(t + rph); };
return;
}
var fg = dlGeo("f|" + L.shape, function () {
var fs = dlShape(outer);
fs.holes.push(new THREE.Path(inner.map(function (p) { return new THREE.Vector2(p[0], p[1]); })));
var g0 = new THREE.ExtrudeGeometry(fs, { depth: 0.8, bevelEnabled: false, curveSegments: 4 });
g0.translate(0, 0, -0.4);
return g0;
});
var fm = L.frame === "crystal" ? dlMat(F[4], null, { emissive: new THREE.Color(0x1A3A48), transparent: true, opacity: 0.88 })
: L.frame === "gilded" ? dlMat(F[4], F[3], { emissive: new THREE.Color(0x3A2A08) }) : dlMat(F[4], F[3]);
g.add(new THREE.Mesh(fg, fm));
if (TY === "classic") {
var lg = dlGeo("l|" + L.shape, function () { var g0 = new THREE.ExtrudeGeometry(dlShape(inner), { depth: 0.15, bevelEnabled: false, curveSegments: 4 }); g0.translate(0, 0, 0.05); return g0; });
var lm = L.finish === "stained" ? (DLK.mats["st|" + L.leaf] || (DLK.mats["st|" + L.leaf] = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: dlStainedTex(L.leaf), emissive: new THREE.Color(0x202020) })))
: L.finish === "painted" ? dlMat(leaf) : dlMat(leaf, "wood");
g.add(new THREE.Mesh(lg, lm));
if (L.shape === "double")
dlBox(g, 0.06, top - 0.1, 0.04, 0, top / 2, 0.22, dlMat(trim));
if (L.finish === "studded") {
var sm = dlMat(0x3A3A40, "metal");
for (var sy = 0.6; sy < Math.min(top - 0.5, 3.6); sy += 0.7)
for (var sx = -iHW + 0.35; sx <= iHW - 0.34; sx += (iHW * 2 - 0.7) / 2)
if (sy < dlTopAt(inner, sx) - 0.3)
dlBall(g, 0.05, sx, sy, 0.21, sm);
}
}
else {
tyAnim = dlLeafType(g, TY, L, inner, top, iHW, leaf, trim, glow);
if (g.userData.dlBooks)
G0.userData.dlBooks = g.userData.dlBooks;
}
var pane = null;
if (L.light !== "none" && TY !== "portal" && TY !== "gate" && TY !== "curtain") {
pane = new THREE.Mesh(new THREE.ShapeGeometry(dlShape(inner), 4), dlGlowMat(glow, L.finish === "stained" ? 0.16 : 0.3));
pane.position.z = 0.215;
g.add(pane);
var back = new THREE.Mesh(pane.geometry, pane.material);
back.position.z = 0.035;
back.rotation.y = Math.PI;
g.add(back);
}
var tm = dlMat(trim, L.frame === "oak" || L.frame === "burl" ? "wood" : null);
dlBox(g, oHW * 2 + 0.4, 0.18, 1.3, 0, 0.09, 0.1, tm);
dlBox(g, oHW * 2 + 0.3, 0.36, 1.0, 0, oTop + 0.18, 0, tm);
if (L.plate !== "none") {
var pl = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.34), new THREE.MeshBasicMaterial({ map: dlPlateTex(String(spec.label || spec.name || "").replace(/ — yours$/, ""), L.plate) }));
pl.position.set(0, oTop + 0.18, 0.51);
g.add(pl);
var pb = new THREE.Mesh(pl.geometry, pl.material);
pb.position.set(0, oTop + 0.18, -0.51);
pb.rotation.y = Math.PI;
g.add(pb);
}
var outerG = g;
g = new THREE.Group();
if (TY !== "classic" && TY !== "mirror")
L.knock = "none";
var km = dlMat(L.plate === "silver" ? 0xC8CDD4 : 0xC9A24A, "metal", { emissive: new THREE.Color(0x201808) }), ky = Math.min(2.3, top * 0.55);
if (L.knock === "ring" || L.knock === "lion") {
var kx = L.shape === "double" ? [-0.35, 0.35] : [0];
kx.forEach(function (x0) {
if (L.knock === "lion")
dlBall(g, 0.13, x0, ky + 0.12, 0.27, km);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 6, 16), km);
ring.position.set(x0, ky - 0.08, 0.3);
g.add(ring);
});
}
else if (L.knock === "knob") {
if (L.shape === "double") {
dlBall(g, 0.08, -0.18, 1.9, 0.28, km);
dlBall(g, 0.08, 0.18, 1.9, 0.28, km);
}
else
dlBall(g, 0.08, iHW - 0.32, 1.9, 0.28, km);
}
outerG.add(g);
var kb = g.clone();
kb.position.z = 0.25;
kb.rotation.y = Math.PI;
outerG.add(kb);
g = outerG;
var og = new THREE.Group();
dlOrnament(og, L.orn, oHW, oTop, trim);
g.add(og);
var dgAnim = null;
if (L.orn === "dragon" && typeof dlDragon === "function")
try {
dgAnim = dlDragon(g, oHW, oTop, L, glow, function (x) { return dlTopAt(outer, x); });
}
catch (e) {
if (window.console)
console.warn("[door-looks] dragon", e);
}
if (/^(ivy|flowers|clover|runes|stars)$/.test(L.orn)) {
var ob = og.clone();
ob.rotation.y = Math.PI;
g.add(ob);
}
if (typeof gwBake === "function")
try {
gwBake(G0);
}
catch (e) { }
if (typeof shadowsFor === "function")
shadowsFor(G0, true);
var ph = (spec.x || 0) * 0.37, breath = null;
if (pane && L.light === "breath") {
var base = pane.material.opacity;
breath = function (t) { pane.material.opacity = base * (0.8 + 0.25 * Math.sin(t * 0.9 + ph)); };
}
if (breath || tyAnim || dgAnim)
G0.userData.anim = function (t) { if (breath)
breath(t); if (tyAnim)
tyAnim(t + ph); if (dgAnim)
dgAnim(t + ph); };
},
function () {
if (DLK.tex.glyphs)
return DLK.tex.glyphs;
var c = document.createElement("canvas");
c.width = c.height = 384;
var x = c.getContext("2d"), R = function (n) { var v = Math.sin(n * 91.7 + 3.1) * 43758.5; return v - Math.floor(v); };
x.strokeStyle = "#FFFFFF";
x.fillStyle = "#FFFFFF";
x.lineCap = "round";
x.lineJoin = "round";
for (var k = 0; k < 36; k++) {
var cx = (k % 6) * 64 + 32, cy = Math.floor(k / 6) * 64 + 32;
x.lineWidth = 4.5;
x.beginPath();
x.arc(cx, cy, 5 + R(k) * 5, 0, Math.PI * 2 * (0.4 + R(k + 7) * 0.6));
x.stroke();
var n = 2 + Math.floor(R(k + 3) * 3);
for (var j = 0; j < n; j++) {
var a = R(k * 5 + j) * Math.PI * 2, r0 = 8 + R(k + j) * 6, r1 = r0 + 10 + R(k * 3 + j) * 10;
x.beginPath();
x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
x.stroke();
if (R(k + j * 9) > 0.5) {
x.beginPath();
x.arc(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, 3.5, 0, Math.PI * 2);
x.fill();
}
}
if (R(k + 11) > 0.6) {
x.beginPath();
x.moveTo(cx - 18, cy + 20);
x.lineTo(cx + 18, cy + 20);
x.stroke();
}
}
var t = new THREE.CanvasTexture(c);
DLK.tex.glyphs = t;
return t;
},
function (leaf, glow, web) {
var key = "lq|" + leaf + "|" + glow + "|" + (web ? 1 : 0);
if (DLK.tex[key])
return DLK.tex[key];
var c = document.createElement("canvas");
c.width = c.height = 512;
var x = c.getContext("2d");
if (!web) {
var gr = x.createRadialGradient(256, 256, 0, 256, 256, 256);
gr.addColorStop(0, "#F4FCFF");
gr.addColorStop(0.22, glow);
gr.addColorStop(0.7, leaf);
gr.addColorStop(1, "#020610");
x.fillStyle = gr;
x.fillRect(0, 0, 512, 512);
for (var r = 12; r < 256; r += 14) {
x.beginPath();
for (var a = 0; a <= 64; a++) {
var t = a / 64 * Math.PI * 2, rr = r + Math.sin(t * 5 + r * 0.13) * 4 + Math.sin(t * 9 - r * 0.07) * 2.5;
var px = 256 + Math.cos(t) * rr, py = 256 + Math.sin(t) * rr;
if (a)
x.lineTo(px, py);
else
x.moveTo(px, py);
}
x.strokeStyle = "rgba(255,255,255," + (0.05 + 0.12 * (1 - r / 256)) + ")";
x.lineWidth = 5;
x.stroke();
}
}
else {
x.fillStyle = "#000";
x.fillRect(0, 0, 512, 512);
for (var arm = 0; arm < 7; arm++) {
x.beginPath();
for (var k = 0; k <= 80; k++) {
var f = k / 80, an = arm * Math.PI * 2 / 7 + f * Math.PI * 1.8 + Math.sin(f * 14 + arm) * 0.12, ra = 20 + f * 230;
var qx = 256 + Math.cos(an) * ra, qy = 256 + Math.sin(an) * ra;
if (k)
x.lineTo(qx, qy);
else
x.moveTo(qx, qy);
}
x.strokeStyle = "rgba(200,240,255," + (0.35 + 0.1 * (arm % 3)) + ")";
x.lineWidth = 14 - arm;
x.stroke();
}
for (var d = 0; d < 140; d++) {
var a2 = Math.sin(d * 12.9) * 1e4 % (Math.PI * 2), r2 = 30 + Math.abs(Math.sin(d * 7.7)) * 210;
x.fillStyle = "rgba(255,255,255," + (0.15 + 0.3 * Math.abs(Math.sin(d))) + ")";
x.beginPath();
x.arc(256 + Math.cos(a2) * r2, 256 + Math.sin(a2) * r2, 2 + Math.abs(Math.sin(d * 3.3)) * 4, 0, Math.PI * 2);
x.fill();
}
}
var t = new THREE.CanvasTexture(c);
t.center.set(0.5, 0.5);
DLK.tex[key] = t;
return t;
},
function (g, spec, L, F, trim, leaf, glow) {
var Rg = 2.35, cy = Rg + 0.55, i, a;
var stone = dlMat(new THREE.Color(F[4]).multiplyScalar(0.55).getHex(), F[3]), ringM = dlMat(new THREE.Color(F[4]).lerp(new THREE.Color(0x4A505A), 0.6).getHex(), "metal", { emissive: new THREE.Color(0x0C0E12) });
var tm = dlMat(trim, "metal", { emissive: new THREE.Color(0x181208) });
dlBox(g, 6.0, 0.55, 2.4, 0, 0.275, 0, stone);
[-1, 1].forEach(function (s) { dlBox(g, 3.2, 0.28, 0.9, 0, 0.14, s * 1.6, stone); dlBox(g, 6.04, 0.06, 0.08, 0, 0.56, s * 1.2, tm); });
[-1, 1].forEach(function (s) { var b = dlBox(g, 0.9, 1.5, 1.2, s * (Rg + 0.15), 1.2, 0, ringM); b.rotation.z = s * 0.18; });
var rg = dlGeo("rg|ring", function () {
var sh = new THREE.Shape();
sh.absarc(0, 0, Rg + 0.42, 0, Math.PI * 2, false);
var ho = new THREE.Path();
ho.absarc(0, 0, Rg - 0.3, 0, Math.PI * 2, true);
sh.holes.push(ho);
var g0 = new THREE.ExtrudeGeometry(sh, { depth: 0.7, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2, curveSegments: 48 });
g0.translate(0, 0, -0.35);
return g0;
});
var ring = new THREE.Mesh(rg, ringM);
ring.position.y = cy;
g.add(ring);
var lip = new THREE.Mesh(new THREE.TorusGeometry(Rg - 0.3, 0.06, 6, 64), tm);
lip.position.set(0, cy, 0.38);
g.add(lip);
var lipB = lip.clone();
lipB.position.z = -0.38;
g.add(lipB);
var band = new THREE.Group();
band.position.set(0, cy, 0);
band.userData.keep = 1;
g.add(band);
var gm = DLK.mats["rg|gl|" + L.glow] || (DLK.mats["rg|gl|" + L.glow] = new THREE.MeshBasicMaterial({ color: new THREE.Color(glow).lerp(new THREE.Color(0xFFFFFF), 0.35), map: dlGlyphTex(), alphaTest: 0.4 }));
var bandBase = dlMat(0x1A1E26, "metal");
for (i = 0; i < 36; i++) {
a = i / 36 * Math.PI * 2;
[1, -1].forEach(function (face) {
var pg = new THREE.PlaneGeometry(0.3, 0.3), uv = pg.attributes.uv, cx = (i % 6) / 6, cyy = 1 - Math.floor(i / 6) / 6 - 1 / 6;
for (var k = 0; k < uv.count; k++)
uv.setXY(k, cx + uv.getX(k) / 6, cyy + uv.getY(k) / 6);
var m = new THREE.Mesh(pg, gm), r = Rg + 0.06;
m.position.set(Math.cos(a) * r, Math.sin(a) * r, face * 0.42);
m.rotation.z = a - Math.PI / 2;
if (face < 0)
m.rotation.y = Math.PI;
band.add(m);
});
}
var bandRing = new THREE.Mesh(new THREE.RingGeometry(Rg - 0.2, Rg + 0.32, 48), bandBase);
bandRing.position.z = 0.405;
band.add(bandRing);
var bandRingB = bandRing.clone();
bandRingB.position.z = -0.405;
bandRingB.rotation.y = Math.PI;
band.add(bandRingB);
if (typeof gwBake === "function")
try {
gwBake(band);
}
catch (e) { }
var studs = new THREE.Group();
studs.position.set(0, cy, 0);
studs.userData.keep = 1;
g.add(studs);
var lit = [], cg = new THREE.OctahedronGeometry(0.26, 0), base = new THREE.Color(glow), dim = base.clone().multiplyScalar(0.28);
for (i = 0; i < 9; i++) {
a = Math.PI / 2 + i / 9 * Math.PI * 2;
var sm = new THREE.MeshBasicMaterial({ color: dim.clone() }), st = new THREE.Mesh(cg, sm);
st.position.set(Math.cos(a) * (Rg + 0.42), Math.sin(a) * (Rg + 0.42), 0);
st.scale.set(1, 1.5, 1.9);
st.rotation.z = a - Math.PI / 2;
studs.add(st);
var hold = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.9), tm);
hold.position.copy(st.position).multiplyScalar(0.985);
hold.position.y += cy;
hold.rotation.z = a - Math.PI / 2;
g.add(hold);
lit.push(sm);
}
var lqA = dlLiquidTex(dlCss(leaf === 0x141620 ? 0x0E2A6A : leaf), dlCss(glow), false), lqB = dlLiquidTex("#000", "#000", true);
var Rin = Rg - 0.3, disc = new THREE.RingGeometry(0.001, Rin, 64, 10), pos = disc.attributes.position, base0 = new Float32Array(pos.count);
for (i = 0; i < pos.count; i++)
base0[i] = Math.hypot(pos.getX(i), pos.getY(i));
var dmA = new THREE.MeshBasicMaterial({ map: lqA, side: THREE.DoubleSide }), dmB = new THREE.MeshBasicMaterial({ map: lqB, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
var liq = new THREE.Mesh(disc, dmA);
liq.position.y = cy;
liq.userData.keep = 1;
g.add(liq);
var web = new THREE.Mesh(disc, dmB);
web.position.set(0, cy, 0.02);
g.add(web);
var webB = new THREE.Mesh(disc, dmB);
webB.position.set(0, cy, -0.02);
g.add(webB);
var spill = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.2), new THREE.MeshBasicMaterial({ color: glow, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }));
spill.rotation.x = -Math.PI / 2;
spill.position.set(0, 0.57, 0);
g.add(spill);
if (L.plate !== "none") {
var pl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.4), new THREE.MeshBasicMaterial({ map: dlPlateTex(String(spec.label || spec.name || "").replace(/ — yours$/, ""), L.plate) }));
pl.position.set(0, 0.3, 1.21);
g.add(pl);
var pb = pl.clone();
pb.position.z = -1.21;
pb.rotation.y = Math.PI;
g.add(pb);
}
var lastRip = -1;
return function (t) {
lqA.rotation = t * 0.22;
lqB.rotation = -t * 0.4;
lqB.offset.set(Math.sin(t * 0.3) * 0.02, Math.cos(t * 0.27) * 0.02);
band.rotation.z = t * 0.05;
for (var k = 0; k < 9; k++) {
var w = 0.5 + 0.5 * Math.sin(t * 0.9 - k * 0.7);
lit[k].color.copy(dim).lerp(base, 0.25 + 0.75 * w * w);
}
if (t - lastRip < 0.06 && t >= lastRip)
return;
lastRip = t;
for (var q = 0; q < pos.count; q++) {
var r = base0[q], f = 1 - r / Rin;
pos.setZ(q, f > 0 ? Math.sin(r * 5.5 - t * 2.6) * 0.07 * f + Math.sin(r * 11 + t * 1.7) * 0.02 * f : 0);
}
pos.needsUpdate = true;
};
},
function (leaf, glow) {
var key = "sw|" + leaf + "|" + glow;
if (DLK.tex[key])
return DLK.tex[key];
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d");
var gr = x.createRadialGradient(128, 128, 4, 128, 128, 180);
gr.addColorStop(0, "#FFFFFF");
gr.addColorStop(0.18, glow);
gr.addColorStop(0.75, leaf);
gr.addColorStop(1, "#05060C");
x.fillStyle = gr;
x.fillRect(0, 0, 256, 256);
x.lineCap = "round";
for (var arm = 0; arm < 5; arm++) {
x.beginPath();
for (var k = 0; k <= 60; k++) {
var t = k / 60, a = arm * Math.PI * 2 / 5 + t * Math.PI * 2.4, r = 8 + t * 150;
var px = 128 + Math.cos(a) * r, py = 128 + Math.sin(a) * r;
if (k)
x.lineTo(px, py);
else
x.moveTo(px, py);
}
x.strokeStyle = "rgba(255,255,255," + (0.22 + 0.06 * (arm % 2)) + ")";
x.lineWidth = 10 - arm;
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.center.set(0.5, 0.5);
DLK.tex[key] = t;
return t;
},
function (g, TY, L, inner, top, iHW, leaf, trim, glow) {
var i, y, w, sk = L.shape;
if (TY === "portal") {
var tex = dlSwirlTex(dlCss(leaf), dlCss(glow)), pm = DLK.mats["pt|" + L.leaf + L.glow] || (DLK.mats["pt|" + L.leaf + L.glow] = new THREE.MeshBasicMaterial({ map: tex }));
dlFlat(inner, sk, 0.12, false, pm, g);
dlFlat(inner, sk, 0.1, true, pm, g);
var ring = dlGlowMat(glow, 0.5), rr = new THREE.Mesh(new THREE.TorusGeometry(Math.min(iHW, top / 2) * 0.55, 0.03, 6, 40), ring);
rr.position.set(0, Math.min(top * 0.5, 2.1), 0.24);
g.add(rr);
var rb = rr.clone();
rb.position.z = 0;
g.add(rb);
return function (t) { tex.rotation = -t * 0.35; rr.rotation.z = t * 0.6; rb.rotation.z = -t * 0.6; };
}
if (TY === "sliding") {
var mm = dlMat(leaf, "metal", { emissive: new THREE.Color(0x0A0C10) });
var lg = dlGeo("l|" + sk, function () { var g0 = new THREE.ExtrudeGeometry(dlShape(inner), { depth: 0.15, bevelEnabled: false, curveSegments: 4 }); g0.translate(0, 0, 0.05); return g0; });
g.add(new THREE.Mesh(lg, mm));
var gm = dlGlowMat(glow, 0.95);
[0.215, 0.035].forEach(function (z) {
dlBox(g, 0.05, Math.max(0.4, dlTopAt(inner, 0) - 0.15), 0.02, 0, Math.max(0.4, dlTopAt(inner, 0) - 0.15) / 2 + 0.05, z, gm);
for (y = 0.9; y < top - 0.3; y += 1.0) {
w = dlWideAt(inner, y);
if (w > 0.4)
dlBox(g, w * 2 - 0.24, 0.035, 0.02, 0, y, z, gm);
}
dlBox(g, 0.14, 0.22, 0.03, Math.min(iHW - 0.3, 0.55), 1.3, z, dlGlowMat(0x7AF0B0, 0.95));
});
return null;
}
if (TY === "vault") {
var vm = dlMat(leaf, "metal", { emissive: new THREE.Color(0x101216) }), steel = dlMat(0xB8BEC6, "metal", { emissive: new THREE.Color(0x181A1E) });
var vg = dlGeo("l|" + sk, function () { var g0 = new THREE.ExtrudeGeometry(dlShape(inner), { depth: 0.15, bevelEnabled: false, curveSegments: 4 }); g0.translate(0, 0, 0.05); return g0; });
g.add(new THREE.Mesh(vg, vm));
var cy = Math.min(top * 0.5, 1.9), R = Math.min(iHW * 0.62, top * 0.28, 0.75), wheel = new THREE.Group();
wheel.position.set(0, cy, 0.3);
g.add(wheel);
var tor = new THREE.Mesh(new THREE.TorusGeometry(R, 0.06, 8, 28), steel);
wheel.add(tor);
for (i = 0; i < 6; i++) {
var sp = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, R * 2, 6), steel);
sp.rotation.z = i * Math.PI / 6;
wheel.add(sp);
}
var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), steel);
hub.rotation.x = Math.PI / 2;
wheel.add(hub);
for (i = 0; i < inner.length; i += Math.max(1, Math.floor(inner.length / 14))) {
var q = inner[i];
if (q[1] < 0.3)
continue;
dlBall(g, 0.06, q[0] * 0.86, 0.3 + (q[1] - 0.3) * 0.9, 0.22, steel);
}
dlBox(g, iHW * 1.6, 0.08, 0.03, 0, 0.45, 0.22, steel);
return null;
}
if (TY === "gate") {
dlFlat(inner, sk, 0.04, false, dlGlowMat(glow, 0.55), g);
dlFlat(inner, sk, 0.04, true, dlGlowMat(glow, 0.55), g);
var im = dlMat(0x1E1E24, "metal"), gold = dlMat(trim, "metal", { emissive: new THREE.Color(0x201808) });
for (var bx = -iHW + 0.16; bx <= iHW - 0.15; bx += 0.24) {
var lo = dlLowAt(inner, bx), hi = dlTopAt(inner, bx) - 0.04;
if (hi - lo < 0.3)
continue;
var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, hi - lo, 5), im);
bar.position.set(bx, (hi + lo) / 2, 0.12);
g.add(bar);
if (hi - lo > 1.2)
dlBall(g, 0.05, bx, Math.min(hi - 0.05, lo + 2.6), 0.12, gold);
}
[0.45, 2.2].forEach(function (cy2) { w = dlWideAt(inner, cy2); if (w > 0.3)
dlBox(g, w * 2 - 0.05, 0.06, 0.06, 0, cy2, 0.12, im); });
var sc = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.03, 6, 20), gold);
sc.position.set(0, 1.35, 0.14);
g.add(sc);
if (L.shape === "double")
dlBox(g, 0.07, dlTopAt(inner, 0) - 0.1, 0.08, 0, dlTopAt(inner, 0) / 2, 0.12, im);
return null;
}
if (TY === "mirror") {
var mk = "mr|" + L.leaf, mr = DLK.mats[mk] || (DLK.mats[mk] = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xD8E0E8).lerp(new THREE.Color(leaf), 0.12), emissive: new THREE.Color(0x343A44), specular: new THREE.Color(0xFFFFFF), shininess: 120 }));
var mg = dlGeo("l|" + sk, function () { var g0 = new THREE.ExtrudeGeometry(dlShape(inner), { depth: 0.15, bevelEnabled: false, curveSegments: 4 }); g0.translate(0, 0, 0.05); return g0; });
g.add(new THREE.Mesh(mg, mr));
var sheen = dlGlowMat(0xFFFFFF, 0.18);
[-0.35, 0.15].forEach(function (x0, k) { var s = new THREE.Mesh(new THREE.PlaneGeometry(0.16 + k * 0.12, Math.max(0.6, top * 0.7)), sheen); s.position.set(x0 * iHW, top * 0.45, 0.205); s.rotation.z = 0.5; g.add(s); });
return null;
}
if (TY === "bookcase") {
var wd = dlMat(leaf, "wood"), shelf = dlMat(trim, "wood");
var bg = dlGeo("l|" + sk, function () { var g0 = new THREE.ExtrudeGeometry(dlShape(inner), { depth: 0.15, bevelEnabled: false, curveSegments: 4 }); g0.translate(0, 0, 0.05); return g0; });
g.add(new THREE.Mesh(bg, wd));
var cols = [0x8A1020, 0x1A3A9A, 0x0E6B4A, 0x5A1A7A, 0xB08D57, 0x3A2A1A, 0xD8C8A0], bm = cols.map(function (c) { return dlMat(c); }), n = 0, BK = dlBooks(L, inner, top), q, hit;
for (y = 0.35; y < top - 0.5; y += 0.62) {
w = Math.min(dlWideAt(inner, y), dlWideAt(inner, y + 0.5));
if (w < 0.35)
continue;
dlBox(g, w * 2 - 0.12, 0.05, 0.16, 0, y, 0.27, shelf);
for (var x = -w + 0.1; x < w - 0.14;) {
var bw = 0.06 + ((n * 7) % 5) * 0.015, bh = 0.3 + ((n * 11) % 4) * 0.045;
for (hit = null, q = 0; q < BK.length; q++)
if (BK[q].y === y && x + bw > BK[q].x - 0.07 && x < BK[q].x + 0.07)
hit = BK[q];
if (hit) {
x = hit.x + 0.078;
continue;
}
dlBox(g, bw, bh, 0.13, x + bw / 2, y + 0.025 + bh / 2, 0.27, bm[n % bm.length]);
x += bw + 0.008;
n++;
}
}
if (!BK.length)
return null;
var gilt = dlMat(0xD4AF37, "metal", { emissive: new THREE.Color(0x2A2008) }), made = [];
BK.forEach(function (b) {
var bk = new THREE.Group();
bk.userData.keep = 1;
bk.position.set(b.x, b.y + 0.025, 0.2);
var bkCol = DL_SPINES[(b.row * 3 + b.pos * 5) % DL_SPINES.length];
dlBox(bk, 0.12, 0.44, 0.17, 0, 0.22, 0.085, dlMat(bkCol));
dlBox(bk, 0.126, 0.018, 0.174, 0, 0.05, 0.085, gilt);
dlBox(bk, 0.126, 0.018, 0.174, 0, 0.39, 0.085, gilt);
var sp = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.3), new THREE.MeshBasicMaterial({ map: dlSpineTex(b.t, dlCss(bkCol)) }));
sp.position.set(0, 0.22, 0.1715);
bk.add(sp);
g.add(bk);
made.push(bk);
});
g.userData.dlBooks = made;
return function () {
for (var i = 0; i < made.length; i++) {
var bk = made[i], at = bk.userData.pullAt;
if (!at)
continue;
var s = (performance.now() - at) / 1000, k = s < 0.4 ? s / 0.4 : s < 1.5 ? 1 : s < 2.1 ? 1 - (s - 1.5) / 0.6 : 0;
if (s >= 2.1)
bk.userData.pullAt = 0;
k = k * k * (3 - 2 * k);
bk.rotation.x = k * 0.48;
bk.position.z = 0.2 + k * 0.05;
}
};
}
if (TY === "curtain") {
dlFlat(inner, sk, 0.05, false, dlMat(new THREE.Color(leaf).multiplyScalar(0.35).getHex()), g);
dlFlat(inner, sk, 0.05, true, dlMat(new THREE.Color(leaf).multiplyScalar(0.35).getHex()), g);
var cm = dlMat(leaf, null, { emissive: new THREE.Color(leaf).multiplyScalar(0.12) }), fold = 0;
for (var fx = -iHW + 0.12; fx <= iHW - 0.1; fx += 0.2) {
var tp = dlTopAt(inner, fx) - 0.03, lw = dlLowAt(inner, fx);
if (tp - lw < 0.3)
continue;
var f = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, tp - lw, 7), cm);
f.position.set(fx, (tp + lw) / 2, 0.12 + (fold++ % 2) * 0.04);
g.add(f);
}
var gold2 = dlMat(0xD4AF37, "metal", { emissive: new THREE.Color(0x2A2008) });
[-1, 1].forEach(function (s2) { var tx = s2 * (iHW - 0.2); dlBall(g, 0.09, tx, 1.15, 0.25, gold2); var ts = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.28, 8), gold2); ts.position.set(tx, 0.95, 0.25); g.add(ts); });
return null;
}
return null;
},
function (g, orn, hw, top, trim) {
var i, R = function (n) { var s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); };
if (orn === "lanterns" || orn === "embers") {
[-1, 1].forEach(function (s) {
var x = s * (hw + 0.38), y = orn === "embers" ? 0 : top * 0.62, dark = dlMat(0x2A2A30, "metal");
if (orn === "lanterns") {
dlBox(g, 0.42, 0.06, 0.06, s * (hw + 0.17), y + 0.3, 0.3, dark);
dlBox(g, 0.28, 0.38, 0.28, x, y, 0.3, dark);
dlBox(g, 0.2, 0.28, 0.2, x, y, 0.3, dlGlowMat(0xFFD27A, 0.95));
}
else {
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 1.3, 8), dark);
post.position.set(x, 0.65, 0.6);
g.add(post);
var bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.16, 0.2, 12), dark);
bowl.position.set(x, 1.38, 0.6);
g.add(bowl);
dlBall(g, 0.2, x, 1.55, 0.6, dlGlowMat(0xFF8A3A, 0.92));
dlBall(g, 0.12, x, 1.72, 0.6, dlGlowMat(0xFFD27A, 0.9));
}
});
}
else if (orn === "ivy" || orn === "flowers" || orn === "clover") {
var greens = [dlMat(0x3E7A34, "foliage"), dlMat(0x5A9A44, "foliage")], pts = [];
for (i = 0; i < 14; i++)
pts.push([(i % 2 ? 1 : -1) * (hw - 0.1 + R(i) * 0.2), 0.3 + (i >> 1) * top / 7.5]);
for (i = 0; i < 9; i++)
pts.push([-hw + 0.2 + i * (hw * 2 - 0.4) / 8, top + 0.38 + R(i + 20) * 0.1]);
pts.forEach(function (p, j) { dlBall(g, 0.14 + R(j + 40) * 0.08, p[0], p[1], 0.45, greens[j % 2]); });
if (orn !== "ivy") {
var bright = orn === "clover" ? [0xFFFFFF, 0xFF9AC8] : [0xFF3A6A, 0xFFD21A, 0xFF7A1A, 0xB45AF0, 0xFFFFFF];
pts.forEach(function (p, j) { if (j % 2 === 0)
dlBall(g, 0.07, p[0] + 0.06, p[1] + 0.08, 0.6, dlMat(bright[j % bright.length], null, { emissive: new THREE.Color(0x181818) })); });
}
}
else if (orn === "stars") {
var sm = dlMat(0xFFD86A, null, { emissive: new THREE.Color(0x6A5418) });
for (i = 0; i < 7; i++) {
var a = Math.PI * (0.12 + 0.76 * i / 6);
var st = new THREE.Mesh(new THREE.OctahedronGeometry(0.15), sm);
st.position.set(Math.cos(a) * (hw + 0.5), top * 0.72 + Math.sin(a) * 1.1, 0.3);
g.add(st);
}
}
else if (orn === "runes") {
var rm = dlGlowMat(0xB48AFF, 0.85);
for (i = 0; i < 8; i++) {
var ru = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 4, i % 2 ? 3 : 6), rm);
ru.position.set((i % 2 ? 1 : -1) * (hw - 0.25), 0.7 + (i >> 1) * top / 4.5, 0.42);
g.add(ru);
}
}
else if (orn === "crystals") {
var cm = dlMat(0x9FE8FF, null, { emissive: new THREE.Color(0x1A4A5A), transparent: true, opacity: 0.85 });
for (i = 0; i < 5; i++) {
var h = 0.4 + (i === 2 ? 0.5 : (i % 2 ? 0.25 : 0));
var cr = new THREE.Mesh(new THREE.ConeGeometry(0.14, h, 6), cm);
cr.position.set((i - 2) * 0.42, top + 0.36 + h / 2, 0);
cr.rotation.z = (i - 2) * -0.12;
g.add(cr);
}
}
else if (orn === "antlers") {
var am = dlMat(0xD8C8A8);
[-1, 1].forEach(function (s) {
var cyl = function (len, x, y, rz) { var c = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, len, 6), am); c.position.set(x, y, 0); c.rotation.z = rz; g.add(c); };
cyl(0.9, s * 0.5, top + 0.75, -s * 0.5);
cyl(0.4, s * 0.62, top + 0.95, s * 0.4);
cyl(0.4, s * 0.82, top + 1.05, -s * 0.9);
});
}
},
function (userId) {
(store.objects || []).forEach(function (s) {
if (s.dreamerDoor !== userId || !meshes[s.id] || typeof refresh !== "function")
return;
if (typeof BAKE !== "undefined" && typeof bakeChunkKey === "function" && typeof bakeUnbake === "function") {
var bk = bakeChunkKey(s), ch = BAKE.chunks[bk];
if (ch && ch.meshes && ch.meshes.length) {
bakeUnbake(bk);
if (BAKE.queue.indexOf(bk) < 0)
BAKE.queue.unshift(bk);
}
}
refresh(s);
});
},
function () {
if (typeof restRpc !== "function")
return Promise.resolve(null);
return restRpc("door_looks_board", {}).then(function (o) {
if (!o || !o.ok)
return null;
var M = {};
(o.looks || []).forEach(function (r) { if (r && r.u && r.look)
M[r.u] = r.look; });
DLK.looks = M;
DLK.open = o.open !== false;
DLK.at = Date.now();
return o;
}).catch(function () { return null; });
},
function () {
if (!dlkMe() || typeof cityRpc !== "function")
return Promise.resolve(null);
return cityRpc("my_stock", {}).then(function (rows) { var S = {}; (Array.isArray(rows) ? rows : []).forEach(function (r) { S[r.kind] = +r.amount || 0; }); DLK.stock = S; return S; }).catch(function () { DLK.stock = DLK.stock || {}; return null; });
},
function (L0) {
L0 = dlFull(L0);
var pts = function (P) { return P.map(function (p) { return (p[0] * 30).toFixed(1) + "," + (-p[1] * 30).toFixed(1); }).join(" "); };
var inner = dlPts(L0.shape, 0), outer = dlPts(L0.shape, 0.5), oTop = dlTop(outer), oHW = dlHalfW(outer), F = dlRow(DL_FRAMES, L0.frame), P = dlRow(DL_PLATES, L0.plate);
var TY = dlRow(DL_TYPES, L0.type)[0], SZ = dlRow(DL_SIZES, L0.size);
if (TY === "ringgate") {
var gl = "", k, an;
for (k = 0; k < 9; k++) {
an = Math.PI / 2 + k / 9 * Math.PI * 2;
gl += "<polygon points='" + [[0, -9], [5, 0], [0, 9], [-5, 0]].map(function (q) { var c = Math.cos(an - Math.PI / 2), s2 = Math.sin(an - Math.PI / 2); return ((Math.cos(an) * 83 + q[0] * c - q[1] * s2)).toFixed(1) + "," + (-(87 + Math.sin(an) * 83) + (q[0] * s2 + q[1] * c)).toFixed(1); }).join(" ") + "' fill='" + L0.glow + "'/>";
}
return "<svg viewBox='-125 -265 250 270' width='150' height='162' style='display:block;margin:0 auto 6px'><g transform='scale(" + SZ[2] + "," + SZ[3] + ")'>" +
"<defs><radialGradient id='dlLq'><stop offset='0' stop-color='#F4FCFF'/><stop offset='.25' stop-color='" + L0.glow + "'/><stop offset='.75' stop-color='" + L0.leaf + "'/><stop offset='1' stop-color='#020610'/></radialGradient></defs>" +
"<rect x='-90' y='-17' width='180' height='17' fill='#555a64'/>" +
"<circle cx='0' cy='-87' r='83' fill='none' stroke='#5A606A' stroke-width='22'/><circle cx='0' cy='-87' r='83' fill='none' stroke='" + L0.glow + "' stroke-opacity='.45' stroke-width='3' stroke-dasharray='4 7'/>" +
"<circle cx='0' cy='-87' r='62' fill='url(#dlLq)'/>" + gl + "</g></svg>";
}
var leaf = TY === "portal" ? "url(#dlPo)" : TY === "mirror" ? "#D8E0E8" : TY === "gate" ? L0.glow : (L0.finish === "stained" && TY === "classic") ? "url(#dlSt)" : L0.leaf;
var iP = inner.map(function (p) { return [p[0] * 30, -p[1] * 30]; }), iTop = dlTop(inner), iHW = dlHalfW(inner), over = "", x, y, w;
if (TY === "sliding") {
over += "<line x1='0' y1='-3' x2='0' y2='" + (-(dlTopAt(inner, 0) - 0.1) * 30) + "' stroke='" + L0.glow + "' stroke-width='2'/>";
for (y = 0.9; y < iTop - 0.3; y += 1) {
w = dlWideAt(inner, y) * 30 - 4;
over += "<line x1='" + (-w) + "' y1='" + (-y * 30) + "' x2='" + w + "' y2='" + (-y * 30) + "' stroke='" + L0.glow + "' stroke-width='1.2'/>";
}
}
else if (TY === "vault") {
var cy = Math.min(iTop * 0.5, 1.9) * 30, R = Math.min(iHW * 0.62, iTop * 0.28, 0.75) * 30;
over += "<circle cx='0' cy='" + (-cy) + "' r='" + R + "' fill='none' stroke='#C8CED6' stroke-width='3'/><path d='M" + (-R) + " " + (-cy) + "H" + R + "M0 " + (-cy - R) + "V" + (-cy + R) + "' stroke='#C8CED6' stroke-width='2'/>";
}
else if (TY === "gate") {
for (x = -iHW + 0.16; x <= iHW - 0.15; x += 0.24) {
over += "<line x1='" + (x * 30) + "' y1='" + (-dlLowAt(inner, x) * 30) + "' x2='" + (x * 30) + "' y2='" + (-(dlTopAt(inner, x) - 0.04) * 30) + "' stroke='#1E1E24' stroke-width='1.6'/>";
}
}
else if (TY === "bookcase") {
var cs = ["#8A1020", "#1A3A9A", "#0E6B4A", "#B08D57", "#5A1A7A"], n = 0;
for (y = 0.35; y < iTop - 0.5; y += 0.62) {
w = Math.min(dlWideAt(inner, y), dlWideAt(inner, y + 0.5));
if (w < 0.35)
continue;
over += "<rect x='" + (-w * 30 + 3) + "' y='" + (-y * 30 - 1) + "' width='" + (w * 60 - 6) + "' height='2' fill='" + L0.trim + "'/>";
for (x = -w + 0.1; x < w - 0.14; x += 0.1) {
over += "<rect x='" + (x * 30) + "' y='" + (-(y + 0.4) * 30) + "' width='2.4' height='11' fill='" + cs[(n++) % 5] + "'/>";
}
}
dlBooks(L0, inner, iTop).forEach(function (bs) { over += "<rect x='" + (bs.x * 30 - 2.4) + "' y='" + (-(bs.y + 0.47) * 30) + "' width='4.8' height='13.5' fill='" + (bs.real ? "#FFD95A" : "#A8842A") + "' stroke='" + (bs.real ? "#FFFFFF" : "#3A2A08") + "' stroke-width='1'/>"; });
}
else if (TY === "curtain") {
for (x = -iHW + 0.12; x <= iHW - 0.1; x += 0.2) {
over += "<line x1='" + (x * 30) + "' y1='" + (-dlLowAt(inner, x) * 30) + "' x2='" + (x * 30) + "' y2='" + (-(dlTopAt(inner, x) - 0.03) * 30) + "' stroke='#000' stroke-opacity='.35' stroke-width='1.4'/>";
}
}
else if (TY === "mirror") {
over += "<line x1='" + (-iHW * 12) + "' y1='" + (-iTop * 12) + "' x2='" + (iHW * 4) + "' y2='" + (-iTop * 24) + "' stroke='#fff' stroke-opacity='.6' stroke-width='5'/>";
}
var s = "<svg viewBox='-125 -265 250 270' width='150' height='162' style='display:block;margin:0 auto 6px'><g transform='scale(" + SZ[2] + "," + SZ[3] + ")'>" +
"<defs><pattern id='dlSt' width='16' height='12' patternUnits='userSpaceOnUse'><rect width='16' height='12' fill='" + L0.leaf + "'/><rect width='8' height='6' fill='#fff' opacity='.25'/><path d='M0 0H16M0 6H16M8 0V12' stroke='#111' stroke-width='1.4'/></pattern>" +
"<radialGradient id='dlPo'><stop offset='0' stop-color='#fff'/><stop offset='.25' stop-color='" + L0.glow + "'/><stop offset='.8' stop-color='" + L0.leaf + "'/><stop offset='1' stop-color='#05060C'/></radialGradient></defs>" +
"<polygon points='" + pts(outer) + "' fill='" + dlCss(F[4]) + "' stroke='#000' stroke-opacity='.4'/>" +
"<polygon points='" + pts(inner) + "' fill='" + leaf + "'/>" +
(L0.light !== "none" && TY !== "portal" && TY !== "gate" && TY !== "curtain" ? "<polygon points='" + pts(inner) + "' fill='" + L0.glow + "' opacity='.3'/>" : "") + over +
"<rect x='" + (-(oHW * 30 + 5)) + "' y='" + (-(oTop * 30 + 11)) + "' width='" + (oHW * 60 + 10) + "' height='11' fill='" + L0.trim + "'/>" +
"<rect x='" + (-(oHW * 30 + 6)) + "' y='-5' width='" + (oHW * 60 + 12) + "' height='5' fill='" + L0.trim + "'/>" +
(L0.plate !== "none" ? "<rect x='-28' y='" + (-(oTop * 30 + 10)) + "' width='56' height='9' fill='" + dlCss(P[2]) + "'/>" : "") +
(L0.shape === "double" && TY === "classic" ? "<line x1='0' y1='0' x2='0' y2='" + (-dlTop(inner) * 30) + "' stroke='" + L0.trim + "' stroke-width='2'/>" : "") +
"</g></svg>";
return s;
},
function (name, label, on, locked) {
return "<span data-w='" + name + "' role='button' tabindex='0' style='display:inline-block;margin:3px 4px 3px 0;padding:5px 9px;border-radius:14px;font-size:12.5px;border:1px solid " +
(on ? "#FFE7B0" : "rgba(143,180,232,.45)") + ";background:" + (on ? "rgba(255,231,176,.18)" : "rgba(143,180,232,.06)") + ";opacity:" + (locked ? ".55" : "1") + "'>" + (on ? "✓ " : "") + (locked ? "🔒 " : "") + label + "</span>";
},
function (fns, field, list) {
var D = DLK.draft, cur = dlHex(D[field], -1);
return "<div style='display:flex;flex-wrap:wrap;gap:5px;margin:4px 0 8px'>" + list.map(function (c, i) {
var nm = "sw_" + field + "_" + i;
fns[nm] = function () { D[field] = dlCss(c); dlCard(); };
return "<span data-w='" + nm + "' role='button' tabindex='0' title='" + dlCss(c) + "' style='width:24px;height:24px;border-radius:4px;background:" + dlCss(c) + ";border:2px solid " + (cur === c ? "#FFE7B0" : "rgba(0,0,0,.35)") + "'></span>";
}).join("") + "</div>";
},
function (fns, field, list, needIdx) {
var D = DLK.draft;
return "<div>" + list.map(function (r) {
var nm = "ch_" + field + "_" + r[0], need = needIdx !== undefined ? r[needIdx] : null, locked = !dlHolds(need);
fns[nm] = function () {
if (locked) {
setStatus("🔒 <b>" + esc(r[1]) + "</b> is made from " + esc(DL_FOUND[need] || "a rare find") + ", which is only ever found, never sold. Find one and hold it in your 🎒 Backpack, and it is yours to use.");
return;
}
D[field] = r[0];
dlCard();
};
return dlChip(nm, esc(r[1]), dlFull(D)[field] === r[0], locked);
}).join("") + "</div>";
},
function (fns) {
var D = DLK.draft, L = dlFull(D), inner = dlPts(L.shape, 0), sp = dlBookSpot(L, inner, dlTop(inner)), rows = sp ? sp.rows : 1, r, h;
h = "<div style='font-size:12px;opacity:.8'>The book that opens it (in place of a knocker or handle)</div>" +
"<input id='dl-book' maxlength='40' value='" + esc(String(D.book || "")) + "' placeholder='" + esc(DL_BOOK_DFLT) + "' autocomplete='off' style='width:100%;box-sizing:border-box;padding:7px 8px;margin:4px 0 8px;background:#0A0E16;color:#F2EAD8;border:1px solid #C9A868;border-radius:4px;font:15px Georgia,serif'>" +
"<div style='font-size:12px;opacity:.8'>Which shelf it stands on</div><div>";
for (r = rows; r >= 1; r--)
(function (r0) {
var nm = "bkrow_" + r0;
fns[nm] = function () { D.bkrow = r0; dlCard(); };
h += dlChip(nm, r0 === rows && rows > 1 ? "Top shelf" : r0 === 1 ? "Bottom shelf" : "Shelf " + r0 + " up", sp && sp.row === r0, false);
})(r);
h += "</div><div style='font-size:12px;opacity:.8;margin-top:6px'>Where along the shelf</div><div>";
DL_BKPOS.forEach(function (p) { var nm = "bkpos_" + p[0]; fns[nm] = function () { D.bkpos = p[0]; dlCard(); }; h += dlChip(nm, p[1], sp && sp.pos === p[0], false); });
h += "</div><div style='opacity:.7;font-size:12px;margin-top:4px'>It shows bright gold, ringed in white, on the little drawing above. At the door, pulling this book opens it: you go home, and a visitor knocks.</div>";
var dc = Array.isArray(D.decoys) ? D.decoys : [], inS = "padding:6px 7px;background:#0A0E16;color:#F2EAD8;border:1px solid rgba(201,168,104,.6);border-radius:4px;font:14px Georgia,serif;min-width:0";
h += "<div style='font-size:12px;opacity:.8;margin-top:8px'>Other labelled books (they open nothing; a visitor sees every title and has to guess)</div>";
dc.forEach(function (d, i) {
var rs = "", ps = "";
for (r = rows; r >= 1; r--)
rs += "<option value='" + r + "'" + (+d.r === r ? " selected" : "") + ">" + (r === rows && rows > 1 ? "Top shelf" : r === 1 ? "Bottom shelf" : "Shelf " + r + " up") + "</option>";
DL_BKPOS.forEach(function (p) { ps += "<option value='" + p[0] + "'" + (+d.p === p[0] ? " selected" : "") + ">" + p[1] + "</option>"; });
fns["dcdel_" + i] = function () { D.decoys.splice(i, 1); dlCard(); };
h += "<div style='display:flex;gap:4px;margin:4px 0;align-items:center'><input data-dc='t' data-i='" + i + "' maxlength='40' value='" + esc(String(d.t || "")) + "' placeholder='Another title' autocomplete='off' style='flex:1 1 40%;" + inS + "'>" +
"<select data-dc='r' data-i='" + i + "' style='flex:0 1 auto;" + inS + "'>" + rs + "</select><select data-dc='p' data-i='" + i + "' style='flex:0 1 auto;" + inS + "'>" + ps + "</select>" +
"<span data-w='dcdel_" + i + "' role='button' tabindex='0' title='Take this book away' style='padding:4px 8px;border:1px solid rgba(143,180,232,.45);border-radius:12px'>✕</span></div>";
});
if (dc.length < DL_DECOY_MAX) {
fns.dcadd = function () {
var used = {}, a, b, got = null;
if (sp)
used[sp.row + "|" + sp.pos] = 1;
dc.forEach(function (d) { used[d.r + "|" + d.p] = 1; });
for (a = rows; a >= 1 && !got; a--)
for (b = 1; b <= 5 && !got; b += 2)
if (!used[a + "|" + b])
got = [a, b];
if (!got)
for (a = rows; a >= 1 && !got; a--)
for (b = 2; b <= 4 && !got; b += 2)
if (!used[a + "|" + b])
got = [a, b];
if (!got) {
setStatus("Every place on the shelves has a labelled book already.");
return;
}
D.decoys = dc.concat([{ t: "", r: got[0], p: got[1] }]);
dlCard();
};
h += dlChip("dcadd", "＋ Label another book", false, false);
}
h += "<div style='opacity:.7;font-size:12px;margin-top:2px'>All the labelled books are bound alike. A book with no title typed is left off the shelf, and two books cannot share a place.</div>";
return h;
},
function (msg) {
var me = dlkMe();
if (!me) {
worldCard(dqHeadSafe("🚪 Your door") + "<div>Sign in first. A door in the Hall belongs to an account, and only its owner may change it.</div>", {});
return;
}
if (!DLK.draft) {
var sv = DLK.looks[me];
DLK.draft = dlFull(sv && Object.keys(sv).length ? sv : dlHallLook(me));
}
if (DLK.stock === null) {
DLK.stock = {};
dlLoadStock().then(function () { if (DLK.draft)
dlCard(msg); });
}
var D = DLK.draft, fns = {}, h = dqHeadSafe("🚪 Your door in the Hall of Doors");
h += "<div style='opacity:.85;font-size:12.5px;margin-bottom:6px'>Only you can change your door, and everyone in the Hall sees it. " +
(typeof myDoor !== "undefined" && myDoor ? "It changes in the Hall as you choose; press Save to keep it." : "You have no door standing yet: take one in Settings, under \"Your door in the great hall\" (that is also where its name and line are written). The look you save here goes on it.") + "</div>";
if (!DLK.open && !dlKeeper())
h += "<div style='color:#FFB27A;margin-bottom:6px'>The Keeper has paused door changes for now.</div>";
if (msg)
h += "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>";
h += dlPreview(D);
h += "<div style='display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px'>" + DL_TABS.map(function (t) {
var nm = "tab_" + t[0];
fns[nm] = function () { DLK.tab = t[0]; dlCard(); };
return "<span data-w='" + nm + "' role='button' tabindex='0' style='padding:4px 8px;border-radius:4px;font-size:12px;border-bottom:2px solid " + (DLK.tab === t[0] ? "#FFE7B0" : "transparent") + ";opacity:" + (DLK.tab === t[0] ? "1" : ".7") + "'>" + t[1] + "</span>";
}).join("") + "</div>";
if (DLK.tab === "shape")
h += dlChoices(fns, "shape", DL_SHAPES);
else if (DLK.tab === "size")
h += dlChoices(fns, "size", DL_SIZES) + "<div style='opacity:.7;font-size:12px'>The whole door grows or shrinks, frame and all. A tall one only grows upward.</div>";
else if (DLK.tab === "type")
h += dlChoices(fns, "type", DL_TYPES) + "<div style='opacity:.7;font-size:12px'>What fills the doorway. Its colours come from the Door and Light tabs." + (dlFull(D).type === "bookcase" ? " <b>A secret bookcase is opened by pulling one book:</b> name it and place it on the Door tab." : "") + "</div>";
else if (DLK.tab === "frame")
h += dlChoices(fns, "frame", DL_FRAMES, 2) + "<div style='opacity:.7;font-size:12px'>🔒 Star crystal, Dreamheart burl and Moonpearl frames are made from rare finds. Holding one in your Backpack is enough; nothing is used up.</div>";
else if (DLK.tab === "door" && dlFull(D).type === "bookcase")
h += dlBookChoices(fns) + "<div style='font-size:12px;opacity:.8;margin-top:6px'>The wood of the case (the shelves take the Trim colour)</div>" + dlSwatches(fns, "leaf", DL_PAL);
else if (DLK.tab === "door")
h += dlChoices(fns, "finish", DL_FINISHES) + "<div style='font-size:12px;opacity:.8;margin-top:6px'>Its colour</div>" + dlSwatches(fns, "leaf", DL_PAL) + "<div style='font-size:12px;opacity:.8'>The knocker or handle</div>" + dlChoices(fns, "knock", DL_KNOCKS);
else if (DLK.tab === "light")
h += dlChoices(fns, "light", DL_LIGHTS) + "<div style='font-size:12px;opacity:.8;margin-top:6px'>Its colour (soft, never bright enough to dazzle)</div>" + dlSwatches(fns, "glow", DL_GLOWS);
else if (DLK.tab === "trim")
h += "<div style='font-size:12px;opacity:.8'>The step, the cornice over the door, the seam of double doors</div>" + dlSwatches(fns, "trim", DL_PAL) + "<div style='font-size:12px;opacity:.8'>The nameplate (lettered with your door's name)</div>" + dlChoices(fns, "plate", DL_PLATES);
else
h += dlChoices(fns, "orn", DL_ORNS, 2) + "<div style='opacity:.7;font-size:12px'>🔒 The crystal crown, antler crown, clover garland and ember braziers are made from rare finds you hold in your Backpack.</div>";
h += worldBtn("save", "💾 Save my door", "everyone in the Hall sees it");
fns.save = dlSave;
h += worldBtn("reset", "Back to the Hall's own decoration", "the stone arch with lanterns every door starts with");
fns.reset = function () { DLK.draft = dlFull(dlHallLook(me)); dlSave(true); };
if (typeof toHall === "function" && typeof hallRealm === "function" && !(store.here && hallRealm() && store.here === hallRealm().id)) {
h += worldBtn("go", "Go to the Hall of Doors", "and see it standing");
fns.go = function () { var b = document.getElementById("door-hall"); if (b && b.onclick)
b.onclick(); };
}
worldCard(h, fns);
var bkIn = document.getElementById("dl-book");
if (bkIn) {
bkIn.oninput = function () { D.book = String(bkIn.value || "").slice(0, 40); };
bkIn.onchange = function () { D.book = String(bkIn.value || "").slice(0, 40); dlRedraw(me); };
bkIn.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
bkIn.blur(); };
}
Array.prototype.forEach.call(document.querySelectorAll("[data-dc]"), function (el) {
var d = (D.decoys || [])[+el.getAttribute("data-i")], k = el.getAttribute("data-dc");
if (!d)
return;
if (k === "t") {
el.oninput = function () { d.t = String(el.value || "").slice(0, 40); };
el.onchange = function () { d.t = String(el.value || "").slice(0, 40); dlCard(); };
el.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
el.blur(); };
}
else
el.onchange = function () { d[k] = +el.value; dlCard(); };
});
dlRedraw(me);
},
function (reset) {
if (DLK.busy || typeof cityRpc !== "function")
return;
DLK.busy = true;
var send = reset === true ? {} : DLK.draft;
cityRpc("door_look_set", { p_look: send }).then(function (o) {
DLK.busy = false;
if (!o || o.ok === false) {
dlCard(esc((o && o.say) || "That didn't take."));
return;
}
var me = dlkMe();
DLK.looks[me] = o.look || {};
DLK.draft = dlFull(Object.keys(DLK.looks[me]).length ? DLK.looks[me] : dlHallLook(me));
dlCard(esc(o.say || "Saved."));
}).catch(function (e) {
DLK.busy = false;
var m = String((e && e.message) || e || "");
dlCard(/function|404|PGRST|does not exist|schema cache/i.test(m) ? "Door changes open in a moment (the city is being readied for them)." : esc(m));
});
},
function () {
if (DLK.scaleTex)
return DLK.scaleTex;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#9a9a9a";
x.fillRect(0, 0, 128, 128);
for (var r = 0; r < 9; r++)
for (var k = -1; k < 9; k++) {
var cx = k * 16 + (r % 2 ? 8 : 0), cy = r * 16 - 4, gr = x.createRadialGradient(cx, cy - 3, 1, cx, cy, 11);
gr.addColorStop(0, "#d8d8d8");
gr.addColorStop(0.7, "#a8a8a8");
gr.addColorStop(1, "#4a4a4a");
x.fillStyle = gr;
x.beginPath();
x.arc(cx, cy, 10, 0, Math.PI);
x.closePath();
x.fill();
x.strokeStyle = "rgba(30,30,30,0.55)";
x.lineWidth = 1.2;
x.beginPath();
x.arc(cx, cy, 10, 0, Math.PI);
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(10, 2);
return (DLK.scaleTex = t);
},
function (pts, prof, segs, rad, mat) {
var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }), false, "centripetal");
var len = curve.getLength(), geo = new THREE.TubeGeometry(curve, segs, 1, rad, false), pos = geo.attributes.position, v = new THREE.Vector3();
for (var i = 0; i <= segs; i++) {
var c = curve.getPointAt(i / segs), r = prof(len * i / segs, len);
for (var j = 0; j <= rad; j++) {
var n = i * (rad + 1) + j;
v.fromBufferAttribute(pos, n).sub(c).multiplyScalar(r).add(c);
pos.setXYZ(n, v.x, v.y, v.z);
}
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, mat);
m.userData.curve = curve;
m.userData.len = len;
return m;
},
function (L) {
var f = L.frame;
if (f === "obsidian" || f === "iron")
return [0x3E3858, 0x7A6A90, 0x1A1622];
if (f === "gilded")
return [0xB8902E, 0xE8C870, 0x6A4A12];
if (f === "marble" || f === "pearl" || f === "crystal")
return [0xC8CCD4, 0xEEF0F4, 0x6A7080];
if (f === "coral")
return [0x2E6A5A, 0x8ACAB0, 0x1A3A30];
if (f === "oak" || f === "burl")
return [0x3E5A2A, 0xB0A060, 0x22341A];
return [0x7E2016, 0xD8A050, 0x3A0E0A];
},
function (g, hw, top, L, glow, topAt) {
var lite = typeof LITE !== "undefined" && LITE, C = dlDragonCols(L), Y0 = top + 0.36, K = 1.65, i;
var W = function (x, y, z) { return [x / K, (y - Y0) / K, z / K]; };
var key = "dg|" + C[0];
var body = DLK.mats[key] || (DLK.mats[key] = new THREE.MeshLambertMaterial({ color: C[0], map: dlScaleTex(), emissive: new THREE.Color(C[2]).multiplyScalar(0.35) }));
var belly = dlMat(C[1]), dark = dlMat(C[2]), horn = dlMat(0xE8DCC0), claw = dlMat(0x1E1A16);
var wingM = DLK.mats[key + "|w"] || (DLK.mats[key + "|w"] = new THREE.MeshLambertMaterial({ color: new THREE.Color(C[0]).lerp(new THREE.Color(C[2]), 0.35), side: THREE.DoubleSide, emissive: new THREE.Color(C[2]).multiplyScalar(0.3) }));
var D = new THREE.Group();
D.position.set(0, Y0, 0);
D.scale.setScalar(K);
g.add(D);
var sideY = Math.min(top, topAt ? topAt(hw - 0.15) : top);
var tail = [[0, 1.32, 0.5], [0, 1.4, 0.22], [0, 1.0, -0.02], [0, 0.62, -0.22], [-0.25, 0.32, -0.42], [-0.5, 0.16, -0.4],
W(-hw - 0.1, Y0 - 0.15, -0.3), W(-hw - 0.3, top * 0.62, -0.1), W(-hw - 0.34, top * 0.3, 0.1), W(-hw - 0.24, 0.32, 0.55), W(-hw + 0.15, 0.17, 0.95), W(-hw - 0.3, 0.13, 1.25), W(-hw - 0.75, 0.11, 1.05)];
var spine = dlTaper(tail, function (d, len) {
if (d < 0.95)
return 0.13 + 0.08 * d / 0.95;
if (d < 1.75)
return 0.21 + 0.17 * Math.sin(Math.PI * (d - 0.95) / 0.8);
var q = (d - 1.75) / (len - 1.75);
return 0.02 + 0.17 * Math.pow(1 - q, 1.15);
}, lite ? 48 : 80, lite ? 7 : 10, body);
D.add(spine);
var torso = new THREE.Mesh(new THREE.SphereGeometry(0.42, lite ? 10 : 16, lite ? 8 : 12), body);
torso.scale.set(1.05, 1.2, 0.95);
torso.position.set(0, 0.55, -0.2);
torso.userData.keep = 1;
D.add(torso);
for (i = 0; i < 6; i++) {
var pl = new THREE.Mesh(new THREE.CylinderGeometry(0.2 - i * 0.012, 0.2 - i * 0.012, 0.07, 10, 1, false, -Math.PI / 2, Math.PI), belly);
pl.rotation.x = -0.35 + i * 0.05;
pl.position.set(0, 1.05 - i * 0.12, 0.1 + i * 0.012 - (i > 3 ? (i - 3) * 0.03 : 0));
pl.scale.set(1, 1, 0.7);
D.add(pl);
}
var cv = spine.userData.curve, len = spine.userData.len, tmp = new THREE.Vector3();
for (var dd = 0.12; dd < len - 0.2; dd += dd < 1.9 ? 0.15 : 0.2) {
var t = dd / len, p = cv.getPointAt(t), tg = cv.getTangentAt(t);
var up = dd < 1.9 ? new THREE.Vector3(0, -tg.z, tg.y) : new THREE.Vector3(-1, 0.25, -0.35);
if (dd < 1.9 && up.dot(tmp.set(0, 0.5, -1)) < 0)
up.negate();
up.normalize();
var rr = dd < 0.95 ? 0.13 + 0.08 * dd / 0.95 : dd < 1.75 ? 0.21 + 0.17 * Math.sin(Math.PI * (dd - 0.95) / 0.8) : 0.02 + 0.17 * Math.pow(1 - (dd - 1.75) / (len - 1.75), 1.15);
var big = dd < 1.9 ? 0.16 : Math.max(0.04, 0.12 * (1 - dd / len)), sp = new THREE.Mesh(new THREE.ConeGeometry(big * 0.38, big, 4), dark);
sp.position.copy(p).addScaledVector(up, rr + big * 0.35);
sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
D.add(sp);
}
var tip = cv.getPointAt(1), spade = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), dark);
spade.scale.set(1.3, 0.25, 0.8);
spade.position.copy(tip);
D.add(spade);
[-1, 1].forEach(function (s) {
var px = s * (hw + 0.04), py = sideY - 0.32, P1 = W(px, py + 0.22, 0.3), P2 = W(px, py, 0.42);
var arm = dlTaper([[s * 0.26, 0.85, 0.02], [s * 0.62, 0.78, 0.22], [s * (Math.abs(P1[0]) * 0.92), P1[1] + 0.38, 0.34], P1, P2], function (d, len) { return 0.15 - 0.07 * d / len; }, lite ? 16 : 26, lite ? 6 : 8, body);
D.add(arm);
var paw = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), body);
paw.scale.set(1.1, 1.3, 1.2);
paw.position.set(P2[0], P2[1], P2[2]);
D.add(paw);
for (var k = 0; k < 4; k++) {
var tl = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.24, 6), claw), q = W(s * (hw - 0.06 - k * 0.09), py - 0.12 - (k % 2) * 0.05, 0.44);
tl.position.set(q[0], q[1], q[2]);
tl.rotation.set(-0.25, 0, Math.PI + s * 0.15);
D.add(tl);
}
var thumbT = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.22, 6), claw), q2 = W(s * (hw + 0.12), py - 0.05, 0.15);
thumbT.position.set(q2[0], q2[1], q2[2]);
thumbT.rotation.set(0, 0, Math.PI - s * 0.2);
D.add(thumbT);
var haunch = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), body);
haunch.scale.set(0.85, 1.15, 1.35);
haunch.position.set(s * 0.4, 0.3, -0.28);
D.add(haunch);
var shin = dlTaper([[s * 0.42, 0.2, -0.42], [s * 0.46, 0.1, -0.25], [s * 0.48, 0.05, -0.05]], function () { return 0.08; }, 6, 6, body);
D.add(shin);
var foot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), body);
foot.scale.set(1.2, 0.6, 1.6);
foot.position.set(s * 0.48, 0.05, 0.0);
D.add(foot);
for (k = 0; k < 3; k++) {
var ft = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.16, 6), claw);
ft.position.set(s * 0.48 + (k - 1) * 0.065, 0.04, 0.15);
ft.rotation.x = Math.PI / 2 + 0.4;
D.add(ft);
}
});
var H = new THREE.Group();
H.userData.keep = 1;
H.position.set(0, 1.34, 0.52);
D.add(H);
var skull = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), body);
skull.scale.set(1, 0.82, 1.15);
H.add(skull);
var snout = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.17, 0.5, 10), body);
snout.rotation.x = Math.PI / 2;
snout.position.set(0, -0.03, 0.36);
H.add(snout);
var jaw = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.07, 0.46), belly);
jaw.position.set(0, -0.15, 0.32);
jaw.rotation.x = 0.12;
H.add(jaw);
[-1, 1].forEach(function (s) {
var brow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.2), dark);
brow.position.set(s * 0.12, 0.12, 0.18);
brow.rotation.set(0.2, s * 0.25, s * 0.2);
H.add(brow);
var eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), dlGlowMat(glow, 0.95));
eye.position.set(s * 0.14, 0.06, 0.22);
H.add(eye);
var hn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.55, 8), horn);
hn.position.set(s * 0.13, 0.2, -0.2);
hn.rotation.set(-2.15, 0, s * -0.25);
H.add(hn);
var h2 = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.26, 6), horn);
h2.position.set(s * 0.21, 0.04, -0.14);
h2.rotation.set(-1.9, 0, s * -0.7);
H.add(h2);
for (var k = 0; k < 4; k++) {
var tooth = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.07, 4), horn);
tooth.position.set(s * (0.075 - k * 0.004), -0.11, 0.5 - k * 0.09);
tooth.rotation.x = Math.PI;
H.add(tooth);
}
});
var nose = dlGlowMat(0xFF7A2A, 0.55), nos = [];
[-1, 1].forEach(function (s) { var n = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), nose); n.position.set(s * 0.05, 0.03, 0.6); H.add(n); nos.push(n); });
var wings = [];
[-1, 1].forEach(function (s) {
var Wg = new THREE.Group();
Wg.userData.keep = 1;
Wg.position.set(s * 0.26, 1.0, -0.4);
Wg.scale.set(s * 0.95, 0.95, 0.95);
D.add(Wg);
var wr = [0.95, 1.05], tips = [[1.85, 1.75], [2.25, 0.85], [1.95, -0.05], [1.2, -0.55]], P = [[0, 0.05], wr], j;
for (j = 0; j < tips.length; j++) {
P.push(tips[j]);
var nx = tips[j + 1] || [0.12, -0.45];
P.push([(tips[j][0] + nx[0]) / 2 * 0.82 + wr[0] * 0.18, (tips[j][1] + nx[1]) / 2 * 0.82 + wr[1] * 0.18]);
}
P.push([0.12, -0.45]);
var sh = new THREE.Shape(P.map(function (p) { return new THREE.Vector2(p[0], p[1]); })), mem = new THREE.Mesh(new THREE.ShapeGeometry(sh), wingM);
Wg.add(mem);
var bone = function (a, b, r) {
var A = new THREE.Vector3(a[0], a[1], 0.02), B = new THREE.Vector3(b[0], b[1], 0.02), d = B.clone().sub(A), c = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.6, r, d.length(), 6), body);
c.position.copy(A).add(B).multiplyScalar(0.5);
c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
Wg.add(c);
};
bone([0, 0.05], wr, 0.07);
tips.forEach(function (t) { bone(wr, t, 0.04); });
var thumb = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 6), claw);
thumb.position.set(wr[0], wr[1] + 0.12, 0.02);
Wg.add(thumb);
Wg.rotation.y = s * 0.5;
Wg.rotation.z = s * 0.12;
Wg.userData.s = s;
wings.push(Wg);
});
var torsoY = torso.scale.y;
return function (t) {
var b = Math.sin(t * 0.9);
torso.scale.y = torsoY * (1 + 0.025 * b);
H.rotation.set(0.5 + 0.05 * Math.sin(t * 0.37), 0.22 * Math.sin(t * 0.23), 0.04 * Math.sin(t * 0.31));
wings.forEach(function (Wg, k) { Wg.rotation.y = Wg.userData.s * (0.5 + 0.06 * Math.sin(t * 0.5 + k * 0.4)); });
nose.opacity = 0.4 + 0.25 * (0.5 + 0.5 * b);
};
},
function (spec, i) {
var B = dlBookList(spec), b = B[i || 0];
if (!b || DLB.busy)
return;
try {
var m = (typeof meshes !== "undefined") ? meshes[spec.id] : null, bk = m && m.userData.dlBooks && m.userData.dlBooks[i || 0];
if (bk)
bk.userData.pullAt = performance.now();
}
catch (e) { }
if (!b.real) {
if (typeof playTone === "function")
try {
playTone(120, 0.1);
}
catch (e) { }
setStatus("You pull <i>" + esc(b.t) + "</i>. It tips out, and settles back. Nothing opens.");
return;
}
DLB.busy = true;
if (typeof WCITY !== "undefined" && DLB.fn && WCITY.fn === DLB.fn)
worldPromptCity(null);
if (DLB.card) {
DLB.card = false;
try {
worldCard(null);
}
catch (e) { }
}
if (typeof playTone === "function")
try {
playTone(170, 0.12);
}
catch (e) { }
setStatus("You pull <i>" + esc(b.t) + "</i>. Something clicks behind the shelves…");
setTimeout(function () {
DLB.busy = false;
DLB.go = spec;
try {
if (typeof walkIntoDoor === "function")
walkIntoDoor(spec);
}
catch (e) {
if (window.console)
console.warn("[door-looks] book pull", e);
}
DLB.go = null;
}, 700);
},
function (spec) {
var B = dlBookList(spec), fns = {}, order = B.map(function (b, i) { return i; }).sort(function (a, c) { return (B[c].row - B[a].row) || (B[a].x - B[c].x); });
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📚 " + esc(String(spec.name || "A door")) + "</div>" +
"<div style='opacity:.85;font-size:12.5px;margin:4px 0 6px'>A bookcase with no handle. One of these books opens it. Which will you pull?</div>";
order.forEach(function (i) { fns["bk" + i] = function () { dlBookPull(spec, i); }; h += worldBtn("bk" + i, "📕 " + esc(B[i].t), dlBookWhere(B[i])); });
DLB.card = true;
worldCard(h, fns);
}
];
});
