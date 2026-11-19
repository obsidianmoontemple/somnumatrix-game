/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(473, function () {
"use strict";
return [
function (B, x, z, ry, w, h, k) {
var C = WSL_C, c = [C.rust, C.tin, C.rustL, C.tinD, C.rustD, C.tarp, C.wood][k % 7];
B.sub(x, 0, z, ry, 1, function () {
B.box(w, h, 0.12, c, 0, h / 2, 0);
for (var i = 0; i < Math.floor(w / 0.45); i++)
B.box(0.08, h, 0.05, lglMix(c, 0x000000, 0.22), -w / 2 + 0.25 + i * 0.45, h / 2, 0.08);
B.box(0.16, h + 0.5, 0.16, C.woodD, -w / 2, (h + 0.5) / 2, -0.1);
if (k % 3 === 0)
B.box(w * 0.5, 0.5, 0.03, [C.yellow, C.tarpR, C.cloth][k % 3], w * 0.1, h * 0.6, 0.1);
});
},
function (B, cx, cz, r, gaps, seed) {
var R = lglRand(seed), n = Math.round(6.283 * r / 3.1), i;
for (i = 0; i < n; i++) {
var a = i / n * 6.283, x = cx + Math.sin(a) * r, z = cz + Math.cos(a) * r, skip = false;
gaps.forEach(function (g) { var d = Math.abs(((a - g + 9.42) % 6.283) - 3.1416); if (d < 4.2 / r)
skip = true; });
if (skip)
continue;
wslPanel(B, x, z, a, 3.3, 3 + R() * 1.2, Math.floor(R() * 7));
lglSolid(x, z, 1.7, 0.3, 4, a);
}
gaps.forEach(function (g) {
[-1, 1].forEach(function (sd) { var a = g + sd * 4.6 / r, x = cx + Math.sin(a) * r, z = cz + Math.cos(a) * r; B.box(0.5, 6, 0.5, WSL_C.woodD, x, 3, z); B.box(0.9, 0.3, 0.9, WSL_C.rust, x, 6.1, z); lglRound(x, z, 0.4, 6); });
var mx = cx + Math.sin(g) * r, mz = cz + Math.cos(g) * r;
B.box(9.6, 0.4, 0.4, WSL_C.woodD, mx, 5.6, mz, g);
B.box(5, 1, 0.1, WSL_C.tin, mx, 6.4, mz, g);
});
},
function (B, G, x, z, h, turning, blades) {
var C = WSL_C, L = G.userData.lgl, i;
[[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (p) { B.cyl(0.07, 0.09, h + 0.2, C.tinD, x + p[0] * 0.55, h / 2, z + p[1] * 0.55, 5, -p[1] * 0.09, p[0] * 0.09); });
for (i = 1; i < 5; i++) {
var w = 1.9 - i * 0.3, y = i * h / 5;
B.box(w, 0.06, 0.06, C.tinD, x, y, z - w / 2);
B.box(w, 0.06, 0.06, C.tinD, x, y, z + w / 2);
B.box(0.06, 0.06, w, C.tinD, x - w / 2, y, z);
B.box(0.06, 0.06, w, C.tinD, x + w / 2, y, z);
}
B.box(0.4, 0.4, 1.2, C.rust, x, h + 0.2, z);
B.box(0.05, 1.1, 1.3, C.rustL, x, h + 0.3, z - 1.4);
lglRound(x, z, 1, h);
B.cyl(1.1, 1.1, 0.7, C.tin, x + 2.2, 0.35, z, 14);
B.cyl(1, 1, 0.04, turning ? 0x4A8AB0 : 0x5A4A3A, x + 2.2, 0.68, z, 14);
B.cyl(0.05, 0.05, 2.2, C.tinD, x + 1.1, 0.9, z, 5, 0, Math.PI / 2);
lglRound(x + 2.2, z, 1.1, 1);
var W = lglB();
W.cyl(0.18, 0.18, 0.2, C.tinD, 0, 0, 0, 10, Math.PI / 2);
for (i = 0; i < 12; i++) {
if (i >= blades)
continue;
var a = i / 12 * 6.283;
W.add(new THREE.BoxGeometry(0.34, 1.5, 0.03), i % 3 ? C.tin : C.rustL, Math.sin(a) * 1.05, Math.cos(a) * 1.05, 0, 0.25, 0, -a);
}
W.tor(1.75, 0.03, C.tinD, 0, 0, 0);
W.tor(0.6, 0.03, C.tinD, 0, 0, 0);
var wm = W.mesh({ ds: 1 });
wm.position.set(x - L.cx, h + 0.2, z - L.cz + 0.75);
G.add(wm);
if (turning)
wm.userData.ldAnim = function (m, t) { m.rotation.z = t * 1.1; };
},
function (B, x, z, w, d, h, ry, seed) {
var C = WSL_C, R = lglRand(seed), c = lglMix(C.conc, C.concD, R()), i, j;
B.sub(x, 0, z, ry, 1, function () {
B.box(w, h, d, c, 0, h / 2, 0);
var fl = Math.floor(h / 3.4), cols = Math.floor(w / 2.6), cd = Math.floor(d / 2.6);
for (j = 0; j < fl; j++) {
for (i = 0; i < cols; i++) {
if (R() < 0.12)
continue;
var wx = -w / 2 + 1.3 + i * (w - 2.6) / Math.max(1, cols - 1), wy = 2 + j * 3.4, lit = R() < 0.04;
B.box(1.2, 1.6, 0.1, lit ? 0xE8B860 : 0x1C1C20, wx, wy, d / 2 + 0.02);
B.box(1.2, 1.6, 0.1, 0x1C1C20, wx, wy, -d / 2 - 0.02);
}
for (i = 0; i < cd; i++) {
if (R() < 0.12)
continue;
var wz = -d / 2 + 1.3 + i * (d - 2.6) / Math.max(1, cd - 1);
B.box(0.1, 1.6, 1.2, 0x1C1C20, w / 2 + 0.02, 2 + j * 3.4, wz);
B.box(0.1, 1.6, 1.2, 0x1C1C20, -w / 2 - 0.02, 2 + j * 3.4, wz);
}
B.box(w + 0.3, 0.18, d + 0.3, lglMix(c, 0x000000, 0.15), 0, 3.5 + j * 3.4 - 0.2, 0);
}
B.box(w * 0.55, h * 0.16, d * 0.6, c, -w * 0.22, h + h * 0.08, -d * 0.2);
B.box(w * 0.3, h * 0.1, d * 0.4, c, w * 0.2, h + h * 0.05, d * 0.25, 0.2, 0, 0.12);
for (i = 0; i < 7; i++)
B.cyl(0.04, 0.04, 2 + R() * 3, C.rust, -w / 2 + R() * w, h + 1 + R() * 1.5, -d / 2 + R() * d, 4, (R() - 0.5) * 0.9, (R() - 0.5) * 0.9);
for (i = 0; i < 6; i++) {
var s = 1.2 + R() * 2.4;
B.box(s, s * 0.6, s * 0.9, lglMix(c, 0x000000, 0.1), (R() < 0.5 ? -1 : 1) * (w / 2 + 1 + R() * 3), s * 0.3, -d / 2 + R() * d, R() * 3, R() * 0.4, R() * 0.4);
}
});
lglSolid(x, z, w / 2 + 0.2, d / 2 + 0.2, h, ry);
},
function (B, x, z, ry, k) {
var c = [WSL_C.rust, 0x6A6E72, WSL_C.rustD, 0x7A6A3A, 0x4A5A6A][k % 5];
B.sub(x, 0, z, ry, 1, function () {
B.box(1.9, 0.7, 4.3, c, 0, 0.6, 0, 0, 0, k % 2 ? 0.05 : 0);
B.box(1.7, 0.6, 2.1, lglMix(c, 0x000000, 0.15), 0, 1.2, -0.2);
B.box(1.5, 0.45, 0.05, 0x1A1A1E, 0, 1.22, 0.86);
B.box(1.5, 0.45, 0.05, 0x1A1A1E, 0, 1.22, -1.26);
[[-0.95, 1.35], [0.95, 1.35], [-0.95, -1.35], [0.95, -1.35]].forEach(function (p, i) { if (k % 4 === i)
return; B.cyl(0.36, 0.36, 0.24, WSL_C.char, p[0], 0.34, p[1], 10, 0, Math.PI / 2); });
});
lglSolid(x, z, 1, 2.2, 1.5, ry);
},
function (B, x, z, ry, lean) {
var C = WSL_C;
B.sub(x, 0, z, ry, 1, function () {
if (lean)
B.base.multiply(new THREE.Matrix4().makeRotationZ(lean));
[[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (p) { B.cyl(0.1, 0.14, 22, C.tinD, p[0] * 1.1, 11, p[1] * 1.1, 5, -p[1] * 0.08, p[0] * 0.08); });
for (var i = 1; i < 7; i++) {
var w = 3.6 - i * 0.42, y = i * 3;
B.box(w, 0.08, 0.08, C.tinD, 0, y, -w / 2);
B.box(w, 0.08, 0.08, C.tinD, 0, y, w / 2);
B.box(0.08, 0.08, w, C.tinD, -w / 2, y, 0);
B.box(0.08, 0.08, w, C.tinD, w / 2, y, 0);
B.box(w * 1.35, 0.06, 0.06, C.rust, 0, y + 1.5, w / 2, 0, 0, 0.75);
}
B.box(13, 0.2, 0.3, C.tinD, 0, 20, 0);
B.box(9, 0.2, 0.3, C.tinD, 0, 16.5, 0);
[-6, 6, -4.2, 4.2].forEach(function (dx, i) { B.cyl(0.06, 0.1, 1, 0x4A6A5A, dx, (i < 2 ? 20 : 16.5) - 0.6, 0, 5); });
});
lglRound(x, z, 1.8, 20);
},
function (B, x, z, k, grown, R) {
var C = WSL_C;
if (k % 3 === 0) {
B.tor(0.6, 0.24, C.char, x, 0.24, z, Math.PI / 2);
B.cyl(0.52, 0.52, 0.3, 0x5A4630, x, 0.22, z, 10);
}
else if (k % 3 === 1) {
B.box(1.7, 0.5, 0.8, 0xE8E4DC, x, 0.3, z, k);
B.box(1.5, 0.1, 0.6, 0x5A4630, x, 0.52, z, k);
}
else {
B.box(1.3, 0.4, 1.3, C.wood, x, 0.2, z);
B.box(1.15, 0.1, 1.15, 0x5A4630, x, 0.4, z);
}
var n = grown ? 6 : 2;
for (var i = 0; i < n; i++) {
var a = i * 1.05 + k, r = 0.14 + ((i * 5) % 3) * 0.14, h = grown ? 0.45 + R() * 0.45 : 0.16;
B.cyl(0.02, 0.03, h, C.green, x + Math.cos(a) * r, 0.5 + h / 2, z + Math.sin(a) * r, 4);
B.blob(grown ? 0.16 : 0.07, i % 2 ? C.greenL : C.green, x + Math.cos(a) * r, 0.52 + h, z + Math.sin(a) * r);
if (grown && i % 3 === 0)
B.sph(0.07, [0xD83A2A, 0xE8B030, 0xE86A9A][k % 3], x + Math.cos(a) * r + 0.1, 0.5 + h * 0.7, z + Math.sin(a) * r);
}
},
function (P) {
var C = WSL_C, lite = P.lite, R = lglRand(2087), n = function (k) { return lite ? Math.ceil(k * 0.45) : k; }, i, L = "the Wasteland";
if (WSL.fix)
WSL.fix();
var S = wslState(), D = function (k) { return !!S.done[k]; };
var who = function (name, what, greet, extra) { return ldWho(name, L, what + ", in Haven, a town built from scrap in the Wasteland that is slowly bringing the land back to life", greet, "Haven's rules: share the water; plant something. " + (extra || "")); };
P.path([[0, 8], [0, -26], [0, -56]], 5, 0x6A6258);
P.path([[0, -84], [0, -112], [0, -146]], 5, 0x6A6258);
P.path([[-38, -70], [-60, -66], [-82, -30]], 3.5, 0x6A6258);
P.path([[38, -66], [70, -52], [104, -44]], 3.5, 0x6A6258);
lglZone(P, 0, -70, 1, function (B, G) {
wslWall(B, 0, -70, 42, [0, Math.PI, Math.PI / 2, -Math.PI / 2], 11);
var lit = D("lights"), poles = [[-12, -58], [12, -58], [12, -80], [-12, -80]];
poles.forEach(function (p, k) { B.cyl(0.08, 0.1, 5, C.woodD, p[0], 2.5, p[1], 6); lglRound(p[0], p[1], 0.2, 5); var q = poles[(k + 1) % 4]; for (var j = 1; j < 9; j++) {
var t = j / 9, x = p[0] + (q[0] - p[0]) * t, z = p[1] + (q[1] - p[1]) * t, y = 4.9 - Math.sin(t * Math.PI) * 0.7;
B.sph(lit ? 0.12 : 0.06, lit ? [0xFFD070, 0xFF9A5A, 0x9AD0FF, 0xB0F090][j % 4] : 0xA8A498, x, y, z);
if (j < 8)
B.box(0.02, 0.02, Math.hypot(q[0] - p[0], q[1] - p[1]) / 9, 0x3A3632, x + (q[0] - p[0]) / 18, y + 0.06, z + (q[1] - p[1]) / 18, Math.atan2(q[0] - p[0], q[1] - p[1]));
} });
if (lit && typeof ldHalo === "function")
poles.forEach(function (p, k) { var q = poles[(k + 1) % 4]; ldHalo(G, (p[0] + q[0]) / 2, 4.3, (p[1] + q[1]) / 2 + 70, 0xFFD890, 7, 0.35); });
B.box(0.16, 2.6, 0.16, C.woodD, -3.4, 1.3, -52);
B.box(0.16, 2.6, 0.16, C.woodD, -0.6, 1.3, -52);
B.box(3, 1.7, 0.1, C.wood, -2, 1.7, -52);
for (i = 0; i < 5; i++)
B.box(0.7, 0.5, 0.02, [0xF2E8D0, 0xE8D8A8, 0xD8E8F0][i % 3], -3 + (i % 3) * 0.95, 2 + (i > 2 ? -0.62 : 0), -51.94, 0, 0, (i - 2) * 0.04);
lglSolid(-2, -52, 1.5, 0.15, 2.6);
if (typeof wSign === "function") {
var s = wSign(["HAVEN", "share the water · plant something"], 6, 1.1, "#4E3A26", "#F2E2B0");
s.position.set(0, 6.4, -28 + 70 + 0.12);
G.add(s);
}
if (D("road"))
for (i = 0; i < 3; i++)
B.sub(-9 + i * 0.4, 0, -60 - i * 3.2, 0.5, 1, function () { B.box(1.3, 0.5, 2, C.wood, 0, 0.8, 0); B.box(1.1, 0.7, 1.6, [C.tarp, C.tarpR, C.cloth][i], 0, 1.4, 0); B.cyl(0.5, 0.5, 0.1, C.woodD, -0.72, 0.5, 0, 12, 0, Math.PI / 2); B.cyl(0.5, 0.5, 0.1, C.woodD, 0.72, 0.5, 0, 12, 0, Math.PI / 2); }), lglRound(-9 + i * 0.4, -60 - i * 3.2, 1.2, 1.6);
[[-6, -64, 0], [7, -74, 1], [-9, -76, 2], [9, -60, 3], [5, -66, 4]].forEach(function (p) { if (p[2] % 2)
B.cyl(0.45, 0.45, 1.1, p[2] % 3 ? 0x3A6A8A : C.rust, p[0], 0.55, p[1], 10);
else {
B.box(1, 0.9, 1, C.wood, p[0], 0.45, p[1], p[2]);
B.box(0.8, 0.7, 0.8, C.woodD, p[0] + 0.2, 1.25, p[1], p[2] + 0.4);
} lglRound(p[0], p[1], 0.6, 1.5); });
});
P.ring("shanty", 8, 28, 0, -70, 1, null, 1, 0.2);
P.k("watertower", -22, -90, 0, 1);
P.k("soupkitchen", 24, -92, -0.6, 1);
P.k("falloutshelter", -2, -102, 0, 0.9);
P.ring("marketstall", 4, 9, 0, -69, 1, null, 1, 0.4);
P.k("firebarrel", 0, -69, 0, 1);
P.k("firebarrel", -15, -44, 0, 1);
P.k("firebarrel", 15, -88, 0, 1);
P.k("watchtower", 33, -40, 0, 0.8);
P.person("trader", 6, -62, Math.PI, { sex: "f", look: { top: 0x6A5A3A, topKind: "coat", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0xC89068, hair: 0x6A3A1A, hat: "bandana", hatColor: 0x8A2A1A } }, who("Rook the trader", "Rook, who trades at the market", "Water, batteries, seeds, stories: everything's for trade in Haven. Seeds are worth most. Things grow again, if you're patient."));
P.person("cook", 21, -88, -0.6, { sex: "m", look: { top: 0xD8D0C0, topKind: "shirt", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0x8A5A3A, hair: 0x1A1010, beard: "short", layer: "apron", layerColor: 0xE8E0D0 } }, who("The soup cook", "the cook at the soup kitchen, who feeds anyone who comes, no questions asked", "Bowl's on the house. Always is. Bean and whatever-we-grew-this-week. Sit by the barrel, it's warm."));
P.person("lookout", 30, -37, 0, { sex: "f", look: { top: 0x4A5A3A, topKind: "coat", bottom: 0x3A3A2A, shoes: 0x2A2018, skin: 0xE8C8A8, hair: 0xC8A060, hat: "cap", hatColor: 0x4A5A3A } }, who("The lookout", "the lookout, who watches the road from the tower", "Road's quiet. Dust storm maybe by evening. Good to see a friendly face."));
P.person("warden", 3.4, -24, 0, { sex: "m", look: { top: 0x5A4A3A, topKind: "coat", bottom: 0x3A3A2A, shoes: 0x2A2018, skin: 0x7A5238, hair: 0x1A1010, beard: "full", hat: "brimmed", hatColor: 0x4A3A2A } }, who("Brann the gate warden", "Brann, who keeps the south gate and greets every stranger", "Welcome to Haven. Two rules: share the water, plant something. The work board's in the square if your hands are idle."));
P.person("story", -3, -72, Math.PI / 2, { sex: "f", look: { top: 0x7A4A6A, topKind: "robe", bottom: 0x4A3A4A, shoes: 0x2A2018, skin: 0xD8B090, hair: 0xE0E0E0, hairStyle: "bun" } }, who("Granny Wren", "Granny Wren, the oldest in town, who tells stories by the fire barrel and remembers the world before", "Sit, sit. I remember when the whole plain was wheat. It will be again; not for me, but it will."));
P.person("fiddler", 4, -73, -Math.PI / 2, { sex: "m", look: { top: 0x3A5A6A, topKind: "shirt", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0xE0B898, hair: 0x8A5A2A, hat: "cap", hatColor: 0x3A3A3A } }, who("Joss the fiddler", "Joss, who plays a fiddle mended with fence wire in the square each evening", "Any request, so long as it's one of the four tunes I know."), { r: 5 });
["Pip", "Nell", "Tobias"].forEach(function (nm, k) { P.person("kid" + k, 10 + k * 2.4, -50 + k * 1.6, k, { child: 1, look: { top: [0xC84A3A, 0x3A8A6A, 0xD8A820][k] } }, who(nm, "one of the children of Haven, who go to school in the old bus", "We found a whole box of chalk in the city! Miss Ines says it's worth more than batteries.", "You are a cheerful child."), { r: 6 }); });
P.being("dog", 8, -58, 0, 1, null, { r: 12, sp: 1.2 });
P.being("scavenger", -20, -66, 1, 1, null, { r: 14, sp: 0.6 });
P.being("scavenger", 18, -76, 2, 1, null, { r: 14, sp: 0.6 });
lglZone(P, 17, -56, 6, function (B, G) {
var grown = D("garden");
B.box(9, 0.3, 4.4, C.concD, 22, 0.15, -58);
for (i = 0; i < 6; i++) {
B.box(0.1, 2.4, 0.1, C.wood, 17.6 + i * 1.76, 1.5, -55.85);
B.box(0.1, 2.4, 0.1, C.wood, 17.6 + i * 1.76, 1.5, -60.15);
B.box(0.1, 0.1, 4.4, C.wood, 17.6 + i * 1.76, 2.7, -58);
B.box(0.08, 1.5, 0.08, C.wood, 17.6 + i * 1.76, 3.3, -58);
}
B.box(8.9, 0.1, 0.1, C.wood, 22, 4, -58);
var gm = new THREE.MeshPhongMaterial({ color: 0xD6ECF0, transparent: true, opacity: 0.32, shininess: 120, specular: 0xFFFFFF, side: THREE.DoubleSide, depthWrite: false });
[[22, 1.5, -55.8, 8.8, 2.4, 0], [22, 1.5, -60.2, 8.8, 2.4, 0]].forEach(function (p) { var m = new THREE.Mesh(new THREE.PlaneGeometry(p[3], p[4]), gm); m.position.set(p[0] - 17, p[1], p[2] + 56); G.add(m); });
[-1, 1].forEach(function (sd) { var m = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 2.6), gm); m.position.set(22 - 17, 3.35, -58 + 56 + sd * 1.1); m.rotation.x = sd * (Math.PI / 2 - 0.55); G.add(m); });
lglSolid(22, -55.85, 4.5, 0.15, 2.8);
lglSolid(22, -60.15, 4.5, 0.15, 2.8);
lglSolid(26.4, -58, 0.15, 2.2, 2.8);
for (i = 0; i < 8; i++) {
B.box(0.8, 0.7, 0.5, C.wood, 18.6 + (i % 4) * 2, 0.5, -57 + Math.floor(i / 4) * -2);
for (var q = 0; q < 3; q++) {
B.blob(0.2, q % 2 ? C.greenL : C.green, 18.4 + (i % 4) * 2 + q * 0.2, 1 + q * 0.12, -57 + Math.floor(i / 4) * -2);
if (grown)
B.sph(0.07, 0xD83A2A, 18.5 + (i % 4) * 2 + q * 0.2, 0.95, -56.8 + Math.floor(i / 4) * -2);
}
}
for (i = 0; i < n(15); i++) {
var px = 12 + (i % 5) * 2.3, pz = -64 - Math.floor(i / 5) * 2.4;
wslPlanter(B, px, pz, i, grown, R);
lglRound(px, pz, 0.6, 0.6);
}
if (grown) {
[[11, -71.5], [15.5, -71.8], [20, -71.4], [23.5, -66]].forEach(function (t) { lglTree(B, t[0], t[1], "blossom", 0.62, R); lglRound(t[0], t[1], 0.25, 3); });
B.cyl(4.6, 4.6, 0.05, 0x7A9A52, 17, 0.05, -71.5, 18);
}
[[25.5, -64], [26.6, -65.4], [25.2, -66.6]].forEach(function (p, k) { B.box(0.6, 0.5, 0.6, [0xE8D8A0, 0xD8E8F0, 0xF0C8A0][k], p[0], 0.55, p[1]); B.box(0.6, 0.5, 0.6, [0xD8E8F0, 0xF0C8A0, 0xE8D8A0][k], p[0], 1.05, p[1]); B.box(0.76, 0.08, 0.76, C.tin, p[0], 1.34, p[1]); B.box(0.5, 0.3, 0.5, C.woodD, p[0], 0.15, p[1]); lglRound(p[0], p[1], 0.45, 1.4); });
});
P.person("grower", 14, -62, Math.PI / 2, { sex: "f", look: { top: 0x5A7A4A, topKind: "shirt", bottom: 0x5A4A3A, shoes: 0x2A2018, skin: 0xB88060, hair: 0x2A1A10, hat: "brimmed", hatColor: 0xD8C8A0, layer: "apron", layerColor: 0x6A5A3A } }, who("Juniper the grower", "Juniper, who keeps the glass-house and the first garden", "Soil's the slow part. We make it: kitchen scraps, straw, worms, patience. " + (D("garden") ? "Look at it now. Tomatoes. Actual tomatoes." : "If I had the old seed boxes from the city, I could fill every bed.")), { r: 5 });
P.person("bees", 27.6, -63, -Math.PI / 2, { sex: "m", look: { top: 0xE8E0D0, topKind: "coat", bottom: 0xE8E0D0, shoes: 0x4A3A2A, skin: 0xE0B898, hair: 0x6A6A6A, hat: "brimmed", hatColor: 0xE8E0D0 } }, who("Tam the beekeeper", "Tam, who found one wild swarm in the ruins and now keeps three hives", "Three hives from one swarm. Without bees there's no beans, no squash, no orchard. Mind, they're gentle."));
lglZone(P, -18, -52, 6, function (B, G) {
B.box(9, 0.2, 7, C.concD, -19, 0.1, -52);
[[-23.3, -55.3], [-14.7, -55.3], [-23.3, -48.7], [-14.7, -48.7]].forEach(function (p) { B.box(0.24, 3.6, 0.24, C.woodD, p[0], 1.8, p[1]); lglRound(p[0], p[1], 0.2, 3.6); });
B.box(9.6, 0.14, 7.8, C.rust, -19, 3.75, -52, 0, 0.06);
B.box(9, 2.6, 0.12, C.tin, -19, 1.5, -55.4);
lglSolid(-19, -55.4, 4.5, 0.1, 3);
B.sub(-20, 0, -51.6, 0.2, 1, function () { B.box(2.2, 0.9, 5, 0x4A6A5A, 0, 1, 0); B.box(2.1, 1.3, 1.7, 0x4A6A5A, 0, 2, 1.4); B.box(1.9, 0.7, 0.06, 0x1A1A1E, 0, 2.2, 2.28); B.box(2.3, 0.5, 2.9, C.wood, 0, 1.7, -1); [[-1.1, 1.6], [1.1, 1.6], [-1.1, -1.6]].forEach(function (p) { B.cyl(0.5, 0.5, 0.3, C.char, p[0], 0.5, p[1], 12, 0, Math.PI / 2); }); B.box(0.5, 0.5, 0.5, C.concD, 1.1, 0.25, -1.6); });
lglSolid(-20, -51.6, 1.3, 2.7, 2.6, 0.2);
B.box(2.6, 0.9, 0.8, C.wood, -15.8, 0.45, -54.6);
for (i = 0; i < 5; i++)
B.box(0.3, 0.12, 0.1, [C.tin, C.rust, C.yellow, 0xC83A3A, C.tinD][i], -16.8 + i * 0.5, 0.96, -54.6, i);
lglSolid(-15.8, -54.6, 1.3, 0.4, 1);
B.cyl(0.05, 0.05, 3, C.tinD, -16.2, 1.5, -50, 5);
B.box(1.6, 0.08, 0.08, C.tinD, -16.9, 3, -50);
B.cyl(0.02, 0.02, 1.2, C.char, -17.6, 2.4, -50, 3);
B.box(0.7, 0.6, 0.5, C.tinD, -17.6, 1.5, -50);
});
lglZone(P, 13, -45, 5, function (B, G) {
B.sub(13, 0, -45, 0.25, 1, function () {
B.box(2.5, 2.1, 9, C.yellow, 0, 1.65, 0);
B.box(2.5, 0.5, 1.6, C.yellow, 0, 0.85, 5);
B.box(2.52, 0.7, 7.6, 0x2A2A2E, 0, 2.15, -0.4);
for (var k = 0; k < 6; k++)
B.box(2.56, 0.74, 0.12, C.yellow, 0, 2.15, -3.8 + k * 1.3);
B.box(2.3, 0.8, 0.06, 0x2A3A4A, 0, 2.1, 4.53);
B.box(2.6, 0.12, 9.1, 0xE8E0D0, 0, 2.76, 0);
[[-1.25, 3.2], [1.25, 3.2], [-1.25, -3]].forEach(function (p) { B.cyl(0.5, 0.5, 0.3, C.char, p[0], 0.5, p[1], 12, 0, Math.PI / 2); });
B.box(0.6, 0.6, 0.6, C.concD, 1.25, 0.3, -3);
B.box(1, 1.9, 0.06, 0x3A3A3A, 1.28, 1.4, 3.6, Math.PI / 2);
B.box(1.6, 1, 0.1, 0x2A3A2A, 2.4, 1.6, 0, Math.PI / 2);
B.box(0.1, 1.6, 0.1, C.woodD, 2.4, 0.8, -0.7);
B.box(0.1, 1.6, 0.1, C.woodD, 2.4, 0.8, 0.7);
});
lglSolid(13, -45, 1.4, 4.8, 3, 0.25);
for (i = 0; i < 4; i++) {
B.box(0.9, 0.06, 0.5, C.wood, 17 + (i % 2) * 1.6, 0.6, -44 - Math.floor(i / 2) * 1.6);
B.box(0.5, 0.4, 0.4, C.woodD, 17 + (i % 2) * 1.6, 0.2, -44.6 - Math.floor(i / 2) * 1.6);
}
if (typeof wSign === "function") {
var s = wSign(["HAVEN SCHOOL"], 2.6, 0.5, "#D8A820", "#1A1A1A");
s.position.set(-0.3, 3.2, 0.6);
s.rotation.y = 0.25 + Math.PI / 2;
G.add(s);
}
});
P.person("teacher", 16.6, -46.4, -Math.PI / 2, { sex: "f", look: { top: 0x6A4A7A, topKind: "dress", bottom: 0x6A4A7A, shoes: 0x2A2018, skin: 0x9A6A4A, hair: 0x1A1010, hairStyle: "bun" } }, who("Miss Ines", "Miss Ines, who teaches the children of Haven in an old school bus: letters, numbers, how to test water, how to graft a tree", "Today: fractions, and why you never drink from a puddle with a rainbow on it."));
P.person("mechanic", -17, -49, 0.6, { sex: "m", look: { top: 0x4A5A6A, topKind: "shirt", bottom: 0x3A3A3A, shoes: 0x2A2018, skin: 0xC89068, hair: 0x8A8A8A, beard: "full", hat: "cap", hatColor: 0x8A2A1A, layer: "apron", layerColor: 0x4A3A2A } }, who("Old Dez the mechanic", "Old Dez, who can mend anything with wire, patience and bad language he keeps to himself", "Nothing's scrap till Dez says it's scrap. " + (D("lights") ? "See those lights? First time the square's been lit in twenty years." : "I've a generator that would light the whole square, if I had bulbs and a belt for it.")), { r: 4 });
lglZone(P, -30, -70, 6, function (B, G) {
wslWindPump(B, G, -31, -64, 9, D("pump"), D("pump") ? 12 : 5);
wslWindPump(B, G, -33, -78, 7.5, true, 12);
B.box(4, 0.5, 1, C.tin, -27, 0.25, -70);
B.box(3.8, 0.06, 0.8, D("pump") ? 0x5AA0C8 : 0x6A5A40, -27, 0.48, -70);
lglSolid(-27, -70, 2, 0.5, 0.6);
if (D("pump")) {
B.cyl(7, 7, 0.05, 0x7A9A52, -27, 0.05, -70, 20);
for (i = 0; i < n(60); i++) {
var a = R() * 6.283, r = R() * 6.5;
B.cone(0.06, 0.4, i % 2 ? C.green : C.greenL, -27 + Math.cos(a) * r, 0.2, -70 + Math.sin(a) * r, 4);
}
lglTree(B, -24, -74, "oak", 0.6, R);
}
B.sub(-8, 0, -96, 0.3, 1, function () { var g = new THREE.CylinderGeometry(0.02, 3, 2.6, 4, 1); g.rotateY(Math.PI / 4); B.add(g, C.cloth, 0, 2.9, 0, 0, 0, 0, 1.1, 1, 1.4); B.box(4.4, 1.6, 5.6, C.cloth, 0, 0.8, 0); B.box(1.4, 1.5, 0.1, 0x3A3632, 0, 0.75, 2.82); B.box(0.8, 0.2, 0.04, 0xC83A3A, 0, 2.2, 2.86); B.box(0.2, 0.8, 0.04, 0xC83A3A, 0, 2.2, 2.86); });
lglSolid(-8, -96, 2.2, 2.8, 3, 0.3);
for (i = 0; i < 6; i++) {
var sx = 10 + (i % 3) * 3, sz = -100 - Math.floor(i / 3) * 3;
B.box(2.4, 0.08, 1.5, 0x24406A, sx, 1.2, sz, 0, 0.5);
B.box(2.5, 0.04, 1.6, C.tin, sx, 1.17, sz, 0, 0.5);
B.box(0.1, 1.1, 0.1, C.tinD, sx, 0.55, sz - 0.3);
lglSolid(sx, sz, 1.2, 0.6, 1.6);
}
});
P.person("water", -28, -67, Math.PI / 2, { sex: "f", look: { top: 0x3A6A8A, topKind: "shirt", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0x8A5A3A, hair: 0x1A1010, hat: "bandana", hatColor: 0x3A6A8A } }, who("Mara the water-keeper", "Mara, who keeps the wind pumps and tests every bucket: whoever keeps the water keeps the peace", "Sand filter, charcoal, then boil. Three steps, every drop. " + (D("pump") ? "Hear that? Both pumps turning. First time in years." : "The big pump lost its blades in the last storm. One pump can't water a town.")), { r: 4 });
P.person("medic", -6, -92, 0, { sex: "m", look: { top: 0xE8E8E8, topKind: "coat", bottom: 0x4A4A5A, shoes: 0x2A2018, skin: 0xE8C8A8, hair: 0x6A3A1A } }, who("Doc Hollis", "Doc Hollis, who runs the clinic tent with boiled bandages, willow bark and good sense", "Mostly it's blisters and bad water. Wash your hands: that's the whole of medicine, nearly."));
lglZone(P, 30, -76, 3, function (B, G) {
var lit = D("radio");
for (i = 0; i < 9; i++) {
var w = 1.8 - i * 0.17, y = i * 3;
[[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (p) { B.cyl(0.05, 0.05, 3.05, C.tinD, 30 + p[0] * w / 2, y + 1.5, -76 + p[1] * w / 2, 4); });
B.box(w, 0.05, 0.05, C.rust, 30, y + 3, -76 - w / 2);
B.box(w, 0.05, 0.05, C.rust, 30, y + 3, -76 + w / 2);
B.box(0.05, 0.05, w, C.rust, 30 - w / 2, y + 3, -76);
B.box(0.05, 0.05, w, C.rust, 30 + w / 2, y + 3, -76);
B.box(w * 1.5, 0.04, 0.04, C.tinD, 30, y + 1.5, -76 + w / 2, 0, 0, 1.0);
}
B.cyl(0.03, 0.03, 4, C.tin, 30, 29, -76, 4);
B.sph(0.22, lit ? 0xFF4030 : 0x4A2A26, 30, 31.1, -76);
lglRound(30, -76, 1.2, 27);
if (lit && typeof ldHalo === "function") {
var h = ldHalo(G, 0, 31.1, 0, 0xFF5038, 5, 0.8);
if (h)
h.userData.ldAnim = function (m, t) { m.material.opacity = 0.45 + 0.35 * Math.sin(t * 2); };
}
B.box(3, 2.4, 2.6, C.tin, 33.4, 1.2, -78);
B.box(3.3, 0.12, 3, C.rust, 33.4, 2.46, -78, 0, 0.05);
B.box(0.9, 1.8, 0.06, C.woodD, 33.4, 0.9, -76.68);
lglSolid(33.4, -78, 1.5, 1.3, 2.5);
});
P.person("sparks", 31.8, -74.4, 0.5, { sex: "f", look: { top: 0x7A3A2A, topKind: "coat", bottom: 0x3A3A3A, shoes: 0x2A2018, skin: 0xD8B090, hair: 0xC83A2A, hat: "cap", hatColor: 0x2A2A2A } }, who("Sparks", "Sparks, Haven's radio operator, who listens every night for other towns", "I call every night on the hour. " + (D("radio") ? "And now they answer! Wellspring, by the old dam. And a ship. A SHIP." : "Mast's dead without power cells. Somebody out there is listening, I know it.")), { r: 3 });
lglZone(P, 0, -152, 2, function (B, G) {
B.box(560, 0.08, 11, C.asph, 0, 0.05, -152);
for (i = -27; i <= 27; i++) {
if ((i * 7) % 11 === 0)
continue;
B.box(4, 0.02, 0.22, 0xD8C890, i * 10, 0.1, -152);
}
B.box(560, 0.02, 0.2, 0xB8B0A0, 0, 0.1, -146.8);
B.box(560, 0.02, 0.2, 0xB8B0A0, 0, 0.1, -157.2);
for (i = 0; i < n(26); i++) {
var cx = -250 + i * 19 + R() * 8;
if (Math.abs(cx) < 9)
continue;
wslCar(B, cx, -150 + (i % 2 ? -3.6 : 3) + R(), Math.PI / 2 + (R() - 0.5) * 0.5, i);
}
for (i = 0; i < n(40); i++) {
var gx = -270 + R() * 540, gz = -157 + R() * 10;
B.box(1.6 + R() * 2, 0.02, 0.1, 0x24221F, gx, 0.11, gz, R() * 3);
B.cone(0.05, 0.3, C.green, gx, 0.2, gz, 4);
}
});
lglZone(P, 120, -152, 8, function (B, G) {
[[108, -140], [108, -164], [132, -140], [132, -164]].forEach(function (p) { B.cyl(0.9, 1, 7, C.conc, p[0], 3.5, p[1], 10); lglRound(p[0], p[1], 1, 7); });
B.box(9, 1, 60, C.conc, 108, 7.5, -152);
B.box(9.4, 0.6, 0.5, C.concD, 108, 8.3, -122);
B.box(0.3, 0.9, 60, C.concD, 103.6, 8.4, -152);
B.box(0.3, 0.9, 60, C.concD, 112.4, 8.4, -152);
B.box(9, 1, 30, C.conc, 132, 3.2, -170, 0, 0.26);
B.box(9, 1, 22, C.conc, 132, 6.6, -131);
for (i = 0; i < 8; i++)
B.cyl(0.04, 0.04, 2 + R() * 2, C.rust, 128.5 + i, 6.2, -142.5 - R(), 4, 0.9 + R() * 0.5);
lglSolid(132, -170, 4.5, 14, 3);
B.box(7, 2.6, 0.2, 0x2A5A3A, 120, 5.4, -145.6);
if (typeof wSign === "function") {
var s = wSign(["HAVEN  2", "WELLSPRING  41"], 6.4, 2, "#2A5A3A", "#F0F0E8");
s.position.set(0, 5.4, -145.6 + 152 + 0.14);
G.add(s);
}
B.cyl(0.14, 0.14, 5, C.tinD, 117, 2.5, -145.6, 6);
B.cyl(0.14, 0.14, 5, C.tinD, 123, 2.5, -145.6, 6);
});
lglZone(P, 62, -168, 9, function (B, G) {
B.box(16, 0.14, 12, C.concD, 62, 0.07, -169);
B.box(12, 0.4, 7, 0xE8E0D0, 62, 5, -166);
B.box(12.2, 0.6, 7.2, 0xC83A2A, 62, 5.4, -166);
[[57, -164], [67, -164], [57, -168], [67, -168]].forEach(function (p) { B.cyl(0.16, 0.16, 5, C.tin, p[0], 2.5, p[1], 8); lglRound(p[0], p[1], 0.2, 5); });
[59, 65].forEach(function (x) { B.box(0.8, 1.7, 0.6, 0xC83A2A, x, 0.95, -166); B.box(0.6, 0.5, 0.04, 0xE8E8E0, x, 1.4, -165.68); B.box(1.6, 0.2, 1.2, C.conc, x, 0.1, -166); lglRound(x, -166, 0.6, 1.8); });
B.box(10, 3.4, 5, 0xD8D0BC, 62, 1.7, -174.5);
B.box(10.4, 0.3, 5.4, C.concD, 62, 3.5, -174.5);
B.box(4, 1.6, 0.08, 0x1C1C20, 60, 1.9, -171.96);
B.box(1.1, 2.2, 0.08, 0x3A3632, 65.4, 1.1, -171.96);
lglSolid(62, -174.5, 5, 2.5, 3.6);
B.cyl(0.2, 0.2, 9, C.tin, 71, 4.5, -161, 8);
B.box(3.4, 2.2, 0.3, 0xE8E0D0, 71, 8, -161);
B.box(3, 0.6, 0.34, 0xC83A2A, 71, 8.5, -161);
lglRound(71, -161, 0.3, 9);
wslCar(B, 60.5, -167.8, 0.1, 3);
});
P.person("hank", 66.5, -170.4, Math.PI, { sex: "m", look: { top: 0x3A4A6A, topKind: "shirt", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0xE0B898, hair: 0x8A8A8A, beard: "short", hat: "cap", hatColor: 0xC83A2A } }, who("Hank at the pumps", "Hank, who lives in the old fuel station on the long road and keeps a lamp lit for travellers", "No fuel. Hasn't been for thirty years. But there's tea, and a roof, and I know every wreck from here to the overpass."), { r: 4 });
P.person("zeke", -14, -140, Math.PI / 2, { sex: "m", look: { top: 0x7A5A3A, topKind: "coat", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0x8A5A3A, hair: 0x1A1010, beard: "full", hat: "brimmed", hatColor: 0x5A4A3A } }, who("Zeke the caravan master", "Zeke, who walks the long road between Haven and Wellspring with a train of hand-carts", "Forty-one miles to Wellspring, if the road's clear. " + (D("road") ? "And it is clear, thanks to you. First caravan through in a season." : "It isn't. Three falls of rubble between here and the overpass.")), { r: 5 });
lglZone(P, -14, -143, 3, function (B) { for (i = 0; i < 3; i++)
B.sub(-18 + i * 4, 0, -143.5, Math.PI / 2 + i * 0.1, 1, function () { B.box(1.3, 0.5, 2, C.wood, 0, 0.8, 0); B.box(1.1, 0.6, 1.6, [C.tarp, C.tarpR, C.cloth][i], 0, 1.3, 0); B.cyl(0.5, 0.5, 0.1, C.woodD, -0.72, 0.5, 0, 12, 0, Math.PI / 2); B.cyl(0.5, 0.5, 0.1, C.woodD, 0.72, 0.5, 0, 12, 0, Math.PI / 2); B.box(0.08, 0.08, 1.6, C.woodD, -0.4, 0.8, 1.7); B.box(0.08, 0.08, 1.6, C.woodD, 0.4, 0.8, 1.7); }), lglRound(-18 + i * 4, -143.5, 1.2, 1.6); });
lglZone(P, 200, -250, 10, function (B, G) {
var blocks = [[150, -212, 16, 14, 34, 0.1], [176, -206, 14, 18, 52, -0.05], [204, -214, 20, 16, 28, 0.2], [232, -208, 16, 16, 66, 0], [158, -250, 18, 14, 44, 0.05], [190, -246, 14, 14, 22, -0.2], [220, -252, 22, 18, 58, 0.1], [250, -244, 16, 20, 36, 0], [164, -290, 20, 16, 30, 0.15], [198, -286, 16, 16, 72, 0], [232, -292, 18, 14, 40, -0.1], [262, -284, 14, 18, 26, 0.25]];
blocks.forEach(function (b, k) { if (lite && k % 2)
return; wslRuin(B, b[0], b[1], b[2], b[3], b[4], b[5], k * 31 + 5); });
B.box(130, 0.06, 9, C.asph, 206, 0.04, -229);
B.box(130, 0.06, 9, C.asph, 206, 0.04, -268);
B.box(9, 0.06, 100, C.asph, 177, 0.04, -250);
B.box(9, 0.06, 100, C.asph, 241, 0.04, -250);
for (i = 0; i < n(16); i++) {
wslCar(B, 150 + R() * 110, (i % 2 ? -229 : -268) + (R() - 0.5) * 5, R() * 6, i + 2);
}
for (i = 0; i < n(12); i++) {
var lx = 150 + i * 10, lz = (i % 2 ? -224 : -273);
B.cyl(0.08, 0.1, 6, C.tinD, lx, 3, lz, 5, (R() - 0.5) * 0.3, (R() - 0.5) * 0.3);
B.box(1.2, 0.1, 0.2, C.tinD, lx + 0.5, 6, lz);
}
B.sub(209, 0, -249, 0.5, 1, function () { B.box(9, 2.5, 2.6, 0x8A3A2A, 0, 1.3, 0, 0, 0, 0); B.box(8.6, 0.9, 2.64, 0x1C1C20, 0, 1.9, 0); });
lglSolid(209, -249, 4.5, 1.3, 2.6, 0.5);
});
P.k("collapsedtower", 120, -250, 0.4, 1);
P.k("collapsedtower", 285, -262, 1, 0.9);
P.k("collapsedtower", 210, -325, 2, 1.1);
P.person("rhett", 150, -196, Math.PI, { sex: "m", look: { top: 0x5A5A3A, topKind: "coat", bottom: 0x3A3A2A, shoes: 0x2A2018, skin: 0xC89068, hair: 0x3A2A1A, beard: "short", hat: "bandana", hatColor: 0x3A3A3A } }, who("Rhett of the salvage crew", "Rhett, who leads Haven's salvage crew into the dead city: never alone, never after dark, never without water", "Glass, copper, books. Books most of all. The city's a mine, if you respect it. Don't go in the tall ones: they're still falling."), { r: 6 });
P.being("scavenger", 168, -226, 1, 1, null, { r: 16, sp: 0.7 });
P.being("scavenger", 226, -232, 2, 1, null, { r: 16, sp: 0.7 });
P.being("scavenger", 196, -266, 0, 1, null, { r: 14, sp: 0.6 });
P.person("pilar", 188, -222, -0.6, { sex: "f", look: { top: 0x7A6A4A, topKind: "coat", bottom: 0x4A4030, shoes: 0x2A2018, skin: 0xB88060, hair: 0x1A1010, hat: "brimmed", hatColor: 0x7A6A4A } }, who("Pilar the map-maker", "Pilar, who is drawing the first new map of the country since the old ones stopped being true", "Every map from before is a map of somewhere that isn't there. So I'm walking it, street by street. Where have you come from? I'll put it on."), { r: 6 });
lglZone(P, -150, -120, 12, function (B, G) {
B.sub(-150, 0, -120, 0.6, 1, function () {
var w = 0xD8D8D4, d = 0x9A9A98;
var f = new THREE.CylinderGeometry(2.4, 2.4, 26, 16);
f.rotateX(Math.PI / 2);
B.add(f, w, 0, 2.1, 0);
B.sph(2.4, w, 0, 2.1, 13, 1, 1, 1.6);
B.box(0.1, 0.7, 22, 0x2A3A5A, 2.38, 2.6, 0);
B.box(0.1, 0.7, 22, 0x2A3A5A, -2.38, 2.6, 0);
for (var k = 0; k < 16; k++) {
B.box(0.06, 0.4, 0.5, 0x1C1C20, 2.42, 3.1, -10 + k * 1.35);
B.box(0.06, 0.4, 0.5, 0x1C1C20, -2.42, 3.1, -10 + k * 1.35);
}
B.box(20, 0.4, 5.5, d, -11, 1.6, 2, 0.35, 0, 0.1);
B.cyl(1, 1, 3.6, d, -8, 0.9, 3.6, 12, Math.PI / 2);
B.cyl(0.9, 0.9, 0.2, C.char, -8, 0.9, 5.4, 12, Math.PI / 2);
var t = new THREE.CylinderGeometry(1.2, 2.4, 9, 14);
t.rotateX(Math.PI / 2);
B.add(t, w, 2, 3, -26, 0.1, 0.25, 0.2);
B.box(0.4, 7, 4.6, 0xC83A2A, 2.4, 7.6, -27, 0.25, -0.3, 0.2);
B.box(9, 0.3, 3, d, 2.4, 4.4, -27.5, 0.25, 0, 0.2);
B.box(8, 0.4, 5, d, 7, 0.3, 5, -0.5, 0, 0.05);
for (k = 0; k < 8; k++)
B.box(0.6, 0.6, 0.6, [0x3A4A7A, 0x7A3A3A, 0x5A5A5A][k % 3], 6 + (k % 4) * 1.6, 0.3, -14 - Math.floor(k / 4) * 1.5 - (k % 3), k);
});
lglSolid(-150, -120, 2.6, 14, 5, 0.6);
lglRound(-166, -133, 4, 6);
for (i = 0; i < n(10); i++) {
var a = R() * 6.283, r = 10 + R() * 16;
B.box(0.8 + R() * 1.6, 0.1, 0.6 + R(), 0xD0D0CC, -150 + Math.cos(a) * r, 0.06, -120 + Math.sin(a) * r, R() * 6, R() * 0.3);
}
});
P.person("ida", -140, -112, -1, { sex: "f", look: { top: 0x4A5A7A, topKind: "coat", bottom: 0x3A3A4A, shoes: 0x2A2018, skin: 0xE8C8A8, hair: 0xE0E0E0, hat: "cap", hatColor: 0x2A3A5A } }, who("Captain Ida", "Captain Ida, who was the pilot of the airliner that came down here long ago, set everyone aboard safely on the ground, and has lived beside it ever since", "Flight nine-oh-two. Every soul walked away, and that's the only landing that counts. I keep the old bird tidy. Silly, I know."), { r: 5 });
lglZone(P, 108, -44, 12, function (B, G) {
var L2 = G.userData.lgl;
B.box(0.5, 13, 0.5, C.tinD, 104, 6.5, -48, 0, 0, 0.16);
B.box(0.5, 13, 0.5, C.tinD, 112, 6.5, -48, 0, 0, -0.16);
B.box(0.5, 13, 0.5, C.tinD, 104, 6.5, -44, 0, 0, 0.16);
B.box(0.5, 13, 0.5, C.tinD, 112, 6.5, -44, 0, 0, -0.16);
B.box(1, 1, 5, C.rust, 108, 12.6, -46);
var W = lglB();
W.tor(10, 0.14, C.rust, 0, 0, -0.9);
W.tor(10, 0.14, C.rust, 0, 0, 0.9);
W.tor(3, 0.1, C.rustD, 0, 0, 0);
for (i = 0; i < 12; i++) {
var a = i / 12 * 6.283;
W.add(new THREE.BoxGeometry(0.1, 10, 0.1), C.tinD, Math.sin(a) * 5, Math.cos(a) * 5, 0, 0, 0, -a);
if (i % 4 !== 2) {
W.box(1.5, 1.2, 1.5, [0xC83A2A, 0xD8A820, 0x3A6A8A, 0x5E9A48][i % 4], Math.sin(a) * 10, Math.cos(a) * 10 - 0.9, 0);
W.box(1.7, 0.12, 1.7, C.cloth, Math.sin(a) * 10, Math.cos(a) * 10 - 0.2, 0);
}
}
var wm = W.mesh();
wm.position.set(108 - L2.cx, 12.6, -46 - L2.cz);
G.add(wm);
wm.userData.ldAnim = function (m, t) { m.rotation.z = Math.sin(t * 0.12) * 0.12; };
lglSolid(108, -46, 5, 2.6, 3);
B.cyl(4.5, 4.5, 0.4, 0xB8A070, 92, 0.2, -34, 20);
B.cone(5, 2.2, 0xC83A2A, 92, 4.5, -34, 12);
B.cyl(0.3, 0.3, 3.6, C.yellow, 92, 2, -34, 8);
for (i = 0; i < 6; i++) {
var ca = i / 6 * 6.283;
B.cyl(0.05, 0.05, 3, C.yellow, 92 + Math.cos(ca) * 3.4, 1.9, -34 + Math.sin(ca) * 3.4, 5);
B.sub(92 + Math.cos(ca) * 3.4, 0.5, -34 + Math.sin(ca) * 3.4, -ca, 0.55, function () { lglBeast(B, { kind: "horse", col: [0xF0E8D8, 0x8A5A3A, 0x3A3A3A][i % 3], len: 1.4, h: 1, neck: 0.5 }); });
}
lglRound(92, -34, 4.6, 4);
B.box(2, 2.6, 2, 0xD8A820, 100, 1.3, -28);
B.cone(1.8, 1.2, 0xC83A2A, 100, 3.2, -28, 4, 0, 0);
B.box(1.2, 0.9, 0.06, 0x1C1C20, 100, 1.7, -26.98);
lglSolid(100, -28, 1, 1, 3);
for (i = 0; i < 10; i++) {
var sa = i / 10 * 6.283;
B.add(new THREE.CylinderGeometry(0.1, 5.5, 5, 3, 1, true, sa, 0.63), i % 2 ? 0xC83A2A : 0xF0E8D8, 124, 3.5, -30);
}
B.cyl(5.5, 5.5, 1, 0xD8D0BC, 124, 0.5, -30, 20);
lglRound(124, -30, 5.6, 5);
for (i = 0; i < 14; i++) {
var t = i / 13;
B.cone(0.22, 0.4, [0xC83A2A, 0xD8A820, 0x3A6A8A][i % 3], 100 + t * 24, 4.2 - Math.sin(t * 3.14) * 1, -28 - t * 2, 3, Math.PI);
}
});
P.person("odell", 102.2, -26, 0, { sex: "m", look: { top: 0xC83A2A, topKind: "coat", bottom: 0x2A2A2A, shoes: 0x2A2018, skin: 0xE0B898, hair: 0x8A8A8A, beard: "full", hat: "tophat", hatColor: 0x2A2A2A } }, who("Odell the ticket-seller", "Odell, who sold tickets at the fair the day everything stopped, and still opens the booth every morning", "Roll up! One ride still turns, if four of you push. First go's free; so is every other go."), { r: 3 });
lglZone(P, -78, -22, 10, function (B, G) {
for (i = 0; i < n(9); i++) {
var sx = -92 + (i % 3) * 9, sz = -32 + Math.floor(i / 3) * 9;
for (var k = 0; k < 3; k++)
B.box(2, 0.8, 4.2, [C.rust, 0x6A6E72, C.rustD, 0x7A6A3A][(i + k) % 4], sx, 0.5 + k * 0.85, sz, (k - 1) * 0.12, 0, (k % 2 ? 0.05 : -0.04));
lglSolid(sx, sz, 1.1, 2.2, 2.8);
}
B.box(3, 3, 3, C.yellow, -70, 1.5, -12);
B.box(2.6, 1.2, 0.1, 0x1C1C20, -70, 2.2, -10.46);
B.box(0.6, 0.6, 16, C.yellow, -70, 6, -18, 0, 0.5);
B.cyl(0.03, 0.03, 5, C.char, -70, 7, -24.8, 3);
B.cyl(1, 1, 0.4, C.tinD, -70, 4.4, -24.8, 14);
lglSolid(-70, -12, 1.6, 1.6, 3.2);
B.box(3.4, 0.9, 5, C.tinD, -70, 0.45, -12);
for (i = 0; i < 8; i++)
wslPanel(B, -97 + i * 3.6, -36.5, 0, 3.4, 2.4, i + 2), lglSolid(-97 + i * 3.6, -36.5, 1.7, 0.2, 2.6);
});
P.person("mags", -74, -14, Math.PI / 2, { sex: "f", look: { top: 0xD8A820, topKind: "shirt", bottom: 0x3A3A3A, shoes: 0x2A2018, skin: 0x7A5238, hair: 0x1A1010, hat: "bandana", hatColor: 0xC83A2A } }, who("Mags of the breaker's yard", "Mags, who runs the breaker's yard: every wreck sorted into steel, copper, glass and rubber", "Everything here was something once, and it'll be something again. That's not junk: that's a town's worth of ploughs."), { r: 5 });
lglZone(P, 0, 40, 1, function (B) { [[-240, -70, 0.2, 0], [-170, -52, 0.2, 0], [-100, 6, 0.25, 0.5], [-30, 34, 0.2, 0], [44, 22, -0.15, 0], [150, 6, -0.2, -0.38], [230, -20, -0.2, 0]].forEach(function (p, k) { if (lite && k % 2)
return; wslPylon(B, p[0], p[1], p[2], p[3]); }); });
lglZone(P, 0, -420, 1, function (B) {
var Rs = lglRand(91);
for (i = 0; i < n(26); i++) {
var a = -1.15 + i / 25 * 2.3 + (Rs() - 0.5) * 0.06, r = 470 + Rs() * 110, w = 16 + Rs() * 18, h = 18 + Rs() * 52, c = lglMix(0x7E7670, 0x94887A, Rs());
if (Math.abs(a - 0.72) < 0.22)
continue;
var x = Math.sin(a) * r, z = -Math.cos(a) * r, tilt = (Rs() - 0.5) * 0.1;
B.box(w, h, w, c, x, h / 2, z, a, 0, tilt);
B.box(w * 0.6, h * 0.22, w * 0.5, c, x - w * 0.15, h + h * 0.1, z, a, 0, tilt);
B.box(w * 0.25, h * 0.16, w * 0.3, c, x + w * 0.3, h + h * 0.07, z, a + 0.3, 0.1, tilt + 0.1);
for (var f = 1; f < Math.floor(h / 7); f++)
B.box(w + 0.4, 0.5, w + 0.4, lglMix(c, 0x000000, 0.18), x, f * 7, z, a, 0, tilt);
}
});
lglZone(P, 0, -90, 1, function (B) {
var Rg = lglRand(407);
for (i = 0; i < n(520); i++) {
var ga = Rg() * 6.283, gr = 46 + Math.sqrt(Rg()) * 230, gx = Math.sin(ga) * gr, gz = -90 + Math.cos(ga) * gr, k = i % 6;
if (Math.abs(gz + 152) < 7)
continue;
if (k < 3) {
for (var q = 0; q < 4; q++)
B.cone(0.05, 0.35 + Rg() * 0.35, q % 2 ? 0xB8A058 : 0x9A8A48, gx + (q - 1.5) * 0.09, 0.2, gz + ((q * 7) % 3) * 0.07, 3, (Rg() - 0.5) * 0.4, (Rg() - 0.5) * 0.4);
}
else if (k < 5)
B.blob(0.14 + Rg() * 0.3, lglMix(0x8A7E6A, 0x6A6258, Rg()), gx, 0.08, gz, 1, 0.55, 1);
else
B.box(0.5 + Rg() * 0.9, 0.06, 0.3 + Rg() * 0.5, [WSL_C.rust, WSL_C.tinD, WSL_C.conc][i % 3], gx, 0.05, gz, Rg() * 6, Rg() * 0.2);
}
});
P.strew("wreckedcar", 10, 60, 250, 1601, 1, 1, null, -60, 40);
P.strew("scrapheap", 8, 60, 260, 1602, 1, 1.3);
P.strew("deadtree", 22, 46, 300, 1603, 0.9, 1.5);
P.strew("radsign", 5, 70, 200, 1604, 1, 1);
P.strew("rock", 22, 46, 280, 1605, 0.8, 2.2);
P.strew("dustbowl", 5, 110, 280, 1606, 1, 1.4);
P.sign(-7, -8, 0.4, ["The Wasteland", "Press E to read"], ["The Wasteland", "What was left, and what comes next", [
"Haven stands straight ahead, behind its wall of scrap. Its two rules: share the water; plant something.",
"The WORK BOARD in Haven's square lists five jobs that bring the place back to life: the wind pump, the radio mast, the first garden, the lights, and the long road. Each one changes Haven for good.",
"Round about: the long road with its overpass and fuel station to the north, the ruined city north-east, a dead fairground east, the breaker's yard west, and a fallen airliner far to the north-west.",
"Everybody you meet can be talked with. Most of them have something that needs doing."
]]);
},
function (key) {
var B = lglB(), C = WSL_C, k = key.replace(/\d+$/, "");
if (k === "pump") {
B.box(1.4, 0.06, 0.8, key === "pump2" ? 0x2A5A3A : (key === "pump1" ? C.rust : 0xD8D8D4), 0, 0.5, 0, 0.4, 0.3, 0.5);
B.box(0.1, 0.9, 0.1, C.tinD, 0.4, 0.3, 0);
}
else if (k === "radio") {
B.box(0.4, 0.3, 0.26, 0x2A2A30, 0, 0.2, 0);
B.cyl(0.04, 0.04, 0.08, 0xC83A2A, -0.1, 0.38, 0, 6);
B.cyl(0.04, 0.04, 0.08, 0x3A3A3A, 0.1, 0.38, 0, 6);
B.box(0.36, 0.1, 0.01, 0x5EC060, 0, 0.2, 0.135);
}
else if (k === "garden") {
B.cyl(0.18, 0.18, 0.3, 0x9AA6AE, 0, 0.18, 0, 12);
B.cyl(0.19, 0.19, 0.04, 0x6A767E, 0, 0.34, 0, 12);
B.box(0.22, 0.16, 0.01, [0x5E9A48, 0xD8A820, 0xD83A2A, 0xE8C830, 0xE86A6A][+key.slice(6) || 0], 0, 0.18, 0.18);
}
else if (k === "lights") {
if (key === "lights3")
B.tor(0.24, 0.04, 0x1A1A1A, 0, 0.3, 0, 0.4);
else
for (var i = 0; i < 7; i++)
B.sph(0.07, [0xFFD070, 0xFF9A5A, 0x9AD0FF, 0xB0F090][i % 4], -0.45 + i * 0.15, 0.3 + Math.sin(i) * 0.08, 0);
}
else {
var R = lglRand(key.charCodeAt(4) * 7);
for (var j = 0; j < 14; j++) {
var s = 0.6 + R() * 1.2;
B.box(s, s * 0.6, s * 0.8, lglMix(C.conc, C.concD, R()), (R() - 0.5) * 8, s * 0.3, (R() - 0.5) * 5, R() * 3, R() * 0.5, R() * 0.5);
}
for (j = 0; j < 4; j++)
B.cyl(0.04, 0.04, 2.4, C.rust, (R() - 0.5) * 6, 0.9, (R() - 0.5) * 4, 4, R() * 1.2, R() * 1.2);
}
var g = new THREE.Group();
g.add(B.mesh());
if (typeof wGlow === "function") {
var gl = wGlow(0xFFE0A0, k === "road" ? 4 : 1.8, 0.5);
gl.position.y = k === "road" ? 1.6 : 0.5;
g.add(gl);
}
return g;
},
function () {
if (typeof LD === "undefined")
return;
LD.talkers = LD.talkers.filter(function (T) { return T.wsl === undefined; });
if (LD.near && LD.near.wsl !== undefined) {
LD.near = null;
if (LD.prompted && typeof worldPrompt === "function") {
worldPrompt(null);
LD.prompted = false;
}
}
WSL.items.forEach(function (m) { if (m.parent)
m.parent.remove(m); m.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); }); });
WSL.items = [];
},
function () {
wslClearMarks();
var S = wslState();
LD.talkers.unshift({ x: -2, z: -51, r: 3.2, name: "📋 Haven's work board", verb: "read", wsl: "board" });
WSL_JOBS.forEach(function (J) {
if (S.done[J.k])
return;
var left = wslJobLeft(J);
left.forEach(function (it) { var m = wslItemMesh(it[0]); m.position.set(it[1], 0, it[2]); LD.g.add(m); WSL.items.push(m); LD.talkers.unshift({ x: it[1], z: it[2], r: J.k === "road" ? 5.5 : 2.8, name: it[3], verb: it[4], wsl: "pick", key: it[0], job: J.k }); });
if (!left.length) {
var at = wslWhoAt(J.who);
if (at)
LD.talkers.unshift({ x: at[0], z: at[1], r: 4.2, name: J.who, verb: J.hand.replace(/ (to|for)$/, ""), wsl: "hand", job: J.k, follow: J.who });
}
});
if (S.done.radio)
LD.talkers.unshift({ x: 33.4, z: -76, r: 2.6, name: "The radio", verb: "listen to", wsl: "listen" });
WSL.set = Object.keys(S.pk).length + ":" + Object.keys(S.done).length;
},
function () {
var S = wslState(), fns = {}, all = WSL_JOBS.every(function (J) { return S.done[J.k]; });
var h = dqHead("📋 Haven's work board") + "<div style='opacity:.8;margin-bottom:6px'>" + (all ? "Every job is done. Haven has water, light, a garden, a voice and a road. Thank you." : "Five jobs. Each one changes Haven for good. Do them in any order; what you find is kept if you leave.") + "</div>";
WSL_JOBS.forEach(function (J, i) {
var left = wslJobLeft(J).length, tot = J.items.length;
h += dqBtn("j" + i, (S.done[J.k] ? "✓ " : left < tot ? "▸ " : "○ ") + esc(J.n), S.done[J.k] ? "done" : ("for " + esc(J.who) + " · " + (tot - left) + " of " + tot + (left ? "" : " · take them back")));
fns["j" + i] = function () { wslJobCard(J); };
});
worldCard(h, fns);
},
function (J) {
var S = wslState(), left = wslJobLeft(J), fns = {}, h = dqHead("📋 " + esc(J.n)) + "<div style='opacity:.8'>for " + esc(J.who) + "</div><div style='margin:8px 0;line-height:1.45'>" + esc(S.done[J.k] ? J.done : "\"" + J.ask + "\"") + "</div>";
if (!S.done[J.k]) {
J.items.forEach(function (it) { h += "<div style='margin:2px 0;opacity:" + (S.pk[it[0]] ? 0.55 : 1) + "'>" + (S.pk[it[0]] ? "✓ " : "○ ") + esc(it[3]) + "</div>"; });
h += dqBtn("way", "Show me the way", left.length ? "to the nearest thing still to find" : "back to " + esc(J.who));
fns.way = function () {
var P = camera.position, lx = P.x - LD.ox, lz = P.z - LD.oz, t = null, bd = 1e9;
left.forEach(function (it) { var d = Math.hypot(it[1] - lx, it[2] - lz); if (d < bd) {
bd = d;
t = [it[1], it[2]];
} });
if (!t)
t = wslWhoAt(J.who);
worldCard(null);
if (t && typeof guideTo !== "undefined") {
try {
guideTo = { key: "wsl", x: LD.ox + t[0], z: LD.oz + t[1] };
}
catch (e) { }
setStatus("<b>" + esc(J.n) + ".</b> Follow the pointer at the top of the screen.");
}
};
}
h += dqBtn("back", "‹ The board");
fns.back = wslBoard;
worldCard(h, fns);
},
function (T) {
var S = wslState();
LD.near = null;
if (LD.prompted && typeof worldPrompt === "function") {
worldPrompt(null);
LD.prompted = false;
}
if (T.wsl === "board") {
wslBoard();
return;
}
if (T.wsl === "listen") {
WSL.rad = ((WSL.rad || 0) + 1) % WSL_RADIO.length;
worldCard(dqHead("📻 The radio") + "<div style='margin:8px 0;font:italic 14.5px var(--serif,Georgia,serif);line-height:1.5'>" + esc(WSL_RADIO[WSL.rad]) + "</div>" + dqBtn("again", "Turn the dial") + dqBtn("ok", "Leave it"), { again: function () { wslAct(T); }, ok: function () { worldCard(null); } });
return;
}
var J = null;
WSL_JOBS.forEach(function (x) { if (x.k === T.job)
J = x; });
if (!J)
return;
if (T.wsl === "pick") {
S.pk[T.key] = 1;
wslSave();
WSL.set = null;
if (typeof playTone === "function")
try {
playTone(760, 0.15);
}
catch (e) { }
var left = wslJobLeft(J).length;
setStatus("<b>" + esc(T.name) + ".</b> " + (left ? left + " more for " + esc(J.n) + "." : "That is everything for <b>" + esc(J.n) + "</b>. Take it to " + esc(J.who) + "."));
return;
}
if (T.wsl === "hand") {
S.done[J.k] = 1;
J.items.forEach(function (it) { delete S.pk[it[0]]; });
wslSave();
WSL.set = null;
if (J.gift && typeof dqBasketAdd === "function")
try {
dqBasketAdd(J.gift[0], J.gift[1]);
}
catch (e) { }
if (typeof playTone === "function")
try {
playTone(880, 0.3);
}
catch (e) { }
var all = WSL_JOBS.every(function (x) { return S.done[x.k]; });
worldCard(dqHead("✓ " + esc(J.n)) + "<div style='margin:8px 0;line-height:1.5'>" + esc(J.done) + "</div>" + (J.gift && typeof dqName === "function" ? "<div style='opacity:.85'>" + esc(J.who) + " gives you: " + J.gift[1] + " × " + esc(dqName(J.gift[0])) + ".</div>" : "") +
(all ? "<div style='margin-top:8px;color:#FFE7B0'>That was the last of the five. Haven has water, light, a garden, a voice and a road.</div>" : "") + dqBtn("ok", "Look at it"), { ok: function () { worldCard(null); } });
LD.rid = null;
}
}
];
});
