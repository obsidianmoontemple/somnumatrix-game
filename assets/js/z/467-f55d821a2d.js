/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(467, function () {
"use strict";
return [
function () {
if (BLN.tex)
return BLN.tex;
if (typeof document === "undefined")
return null;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext && c.getContext("2d");
if (!x || !x.createRadialGradient)
return null;
var g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(0.4, "rgba(255,255,255,0.4)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, 64, 64);
var t = new THREE.Texture(c);
t.needsUpdate = true;
BLN.tex = t;
return t;
},
function (n, w, h, col, size, op, speed) {
var pos = new Float32Array(n * 3), R = ldRand(n * 31 + Math.round(w * 7));
for (var i = 0; i < n; i++) {
pos[i * 3] = (R() - 0.5) * w;
pos[i * 3 + 1] = R() * h;
pos[i * 3 + 2] = (R() - 0.5) * w;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var m = new THREE.PointsMaterial({ size: size, map: blnGlowTex(), color: col, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
var p = new THREE.Points(g, m);
p.frustumCulled = false;
p.userData.ldAnim = function (o, t, dt) {
var a = o.geometry.attributes.position, arr = a.array;
for (var i = 0; i < n; i++) {
arr[i * 3 + 1] += dt * speed * (0.6 + ((i * 7) % 5) / 6);
arr[i * 3] += Math.sin(t * 0.7 + i) * dt * 0.15;
if (arr[i * 3 + 1] > h) {
arr[i * 3 + 1] = 0;
arr[i * 3] = (((i * 37) % 17) / 17 - 0.5) * w;
}
}
a.needsUpdate = true;
};
return p;
},
function (B) {
return function (G, H) {
var stone = blnLam(0x4A3A34, { flat: true }), dark = blnLam(0x2A201C, { flat: true }), cap = blnLam(0x6A5448, { flat: true }), N = 14, segL = B.len / N;
for (var i = 0; i < N; i++) {
var t0 = i / N, t1 = (i + 1) / N, y0 = blnDeck(B, t0), y1 = blnDeck(B, t1), zm = -B.len / 2 + segL * (i + 0.5), ym = (y0 + y1) / 2, a = Math.atan2(y1 - y0, segL);
var deck = blnMesh(blnGeo("brDeck" + B.w, function () { return new THREE.BoxGeometry(1, 0.5, 1); }), stone, 0, ym - 0.2, zm, G);
deck.scale.set(B.w, 1, segL + 0.06);
deck.rotation.x = -a;
[-1, 1].forEach(function (sd) {
var p = blnMesh(blnGeo("brPar", function () { return new THREE.BoxGeometry(0.45, 0.9, 1); }), dark, sd * (B.w / 2 - 0.22), ym + 0.4, zm, G);
p.scale.z = segL + 0.04;
p.rotation.x = -a;
var c2 = blnMesh(blnGeo("brCap", function () { return new THREE.BoxGeometry(0.6, 0.16, 1); }), cap, sd * (B.w / 2 - 0.22), ym + 0.92, zm, G);
c2.scale.z = segL + 0.08;
c2.rotation.x = -a;
});
var end = (i < 2 || i >= N - 2), lo = end ? 0 : ym * 0.5, hi = ym - 0.42;
if (hi - lo > 0.15) {
var bd = blnMesh(blnGeo("brBody", function () { return new THREE.BoxGeometry(1, 1, 1); }), dark, 0, (lo + hi) / 2, zm, G);
bd.scale.set(B.w - 0.2, hi - lo, segL + 0.02);
}
}
[-1, 1].forEach(function (e) {
[-1, 1].forEach(function (sd) {
var px = sd * (B.w / 2 + 0.15), pz = e * (B.len / 2 - 0.4);
blnMesh(blnGeo("brPier", function () { return new THREE.BoxGeometry(0.9, 1.8, 0.9); }), dark, px, 0.9, pz, G);
blnMesh(blnGeo("brPierCap", function () { return new THREE.BoxGeometry(1.1, 0.2, 1.1); }), cap, px, 1.9, pz, G);
blnMesh(blnGeo("brLamp", function () { return new THREE.OctahedronGeometry(0.22, 0); }), blnFire(0xFFB040, 0.9), px, 2.25, pz, G);
});
});
return false;
};
},
function (seed, big) {
return function (G, H) {
var R = ldRand(seed), rock = blnLam(0x3A302A, { flat: true }), crust = blnLam(0xD8C040, { flat: true, e: 0x2A2200 }), pale = blnLam(0xE8E0A0, { flat: true }), stain = blnLam(0x8A6A2A, { flat: true });
var s = big ? 1.5 : 1;
var cone = blnMesh(blnGeo("vCone", function () { var g = new THREE.CylinderGeometry(0.7, 2.4, 1.4, 9, 2, true); return g; }), rock, 0, 0.7 * s, 0, G);
cone.scale.setScalar(s);
cone.rotation.y = R() * 6;
blnMesh(blnGeo("vMouth", function () { return new THREE.CircleGeometry(0.72, 9); }), blnLam(0x0E0A08), 0, 1.38 * s, 0, G).rotation.x = -Math.PI / 2;
var lip = blnMesh(blnGeo("vLip", function () { return new THREE.TorusGeometry(0.82, 0.2, 5, 12); }), crust, 0, 1.36 * s, 0, G);
lip.rotation.x = Math.PI / 2;
lip.scale.setScalar(s);
for (var i = 0; i < 7; i++) {
var a = R() * 6.28, d = (0.9 + R() * 1.2) * s;
var c = blnMesh(blnGeo("vXtal", function () { return new THREE.OctahedronGeometry(0.16, 0); }), i % 3 ? crust : pale, Math.cos(a) * d, (1.25 - d * 0.42 / s) * s + 0.1, Math.sin(a) * d, G);
c.scale.set(1, 1.8 + R(), 1);
c.rotation.set(R(), R(), R());
}
var sp = blnMesh(blnGeo("vStain", function () { return new THREE.CircleGeometry(3.2, 10); }), stain, 0, 0.05, 0, G);
sp.rotation.x = -Math.PI / 2;
sp.scale.setScalar(s);
if (!blnLite() || big) {
var pl = blnRise(big ? 26 : 16, 1.4 * s, 9 * s, 0xDDD6C8, 2.4 * s, 0.22, 0.9);
pl.position.y = 1.4 * s;
G.add(pl);
return true;
}
return true;
};
},
function (seed, w) {
return function (G, H) {
var R = ldRand(seed), crust = blnLam(0x1E1614, { flat: true }), glow = blnFire(0xFF5A14, 0.85), hot = blnFire(0xFFA040, 0.9);
var under = blnMesh(blnGeo("bedGlow", function () { return new THREE.CircleGeometry(1, 16); }), blnLam(0xC0400C, { e: 0x8A2000 }), 0, 0.04, 0, G);
under.rotation.x = -Math.PI / 2;
under.scale.set(w * 0.55, w * 0.45, 1);
for (var i = 0; i < 14; i++) {
var a = R() * 6.28, d = Math.sqrt(R()) * w * 0.42;
var pl = blnMesh(blnGeo("bedPlate", function () { return new THREE.CylinderGeometry(1, 1, 0.16, 6); }), crust, Math.cos(a) * d, 0.1, Math.sin(a) * d * 0.82, G);
var ps = 0.7 + R() * 0.9;
pl.scale.set(ps, 1, ps * (0.7 + R() * 0.5));
pl.rotation.y = R() * 6;
}
for (var j = 0; j < 9; j++) {
var b = R() * 6.28, e = Math.sqrt(R()) * w * 0.45;
var st = blnMesh(blnGeo("bedStone", function () { return new THREE.DodecahedronGeometry(0.22, 0); }), blnLam(0x3A1A10, { flat: true, e: 0x6A1A04 }), Math.cos(b) * e, 0.2, Math.sin(b) * e * 0.8, G);
st.rotation.set(R() * 3, R() * 3, 0);
st.scale.setScalar(0.8 + R() * 0.8);
}
for (var k = 0; k < 3; k++) {
var c = R() * 6.28, f = R() * w * 0.3, s = blnSprite(k ? 0xFF6A1A : 0xFFB050, 1.6 + R(), 0.35);
s.position.set(Math.cos(c) * f, 0.4, Math.sin(c) * f * 0.8);
G.add(s);
}
var sp = blnRise(blnLite() ? 8 : 14, w * 0.7, 4, 0xFF8A2A, 0.3, 0.85, 0.7);
sp.position.y = 0.2;
G.add(sp);
void glow;
void hot;
return true;
};
},
function () {
return function (G) {
var st = blnLam(0x3E302A, { flat: true }), wd = blnLam(0x4A3020, { flat: true }), cl = blnLam(0x8A2A1A, { ds: true });
[[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].forEach(function (p) { blnMesh(blnGeo("wLeg", function () { return new THREE.BoxGeometry(0.5, 6, 0.5); }), st, p[0], 3, p[1], G); });
blnMesh(blnGeo("wDeck", function () { return new THREE.BoxGeometry(4, 0.3, 4); }), wd, 0, 6.1, 0, G);
[[0, 1.9, 4, 0.1], [0, -1.9, 4, 0.1], [1.9, 0, 0.1, 4], [-1.9, 0, 0.1, 4]].forEach(function (r) { var m = blnMesh(blnGeo("wRail", function () { return new THREE.BoxGeometry(1, 0.9, 1); }), wd, r[0], 6.7, r[1], G); m.scale.set(r[2], 1, r[3]); });
var roof = blnMesh(blnGeo("wRoof", function () { return new THREE.ConeGeometry(3.3, 1.8, 4, 1); }), cl, 0, 8.6, 0, G);
roof.rotation.y = Math.PI / 4;
[[-1.7, -1.7], [1.7, -1.7], [-1.7, 1.7], [1.7, 1.7]].forEach(function (p) { blnMesh(blnGeo("wPost", function () { return new THREE.BoxGeometry(0.16, 1.6, 0.16); }), wd, p[0], 7.5, p[1], G); });
for (var i = 0; i < 12; i++)
blnMesh(blnGeo("wRung", function () { return new THREE.BoxGeometry(0.8, 0.06, 0.06); }), wd, 0, 0.4 + i * 0.5, 2.05, G);
[-0.4, 0.4].forEach(function (x) { blnMesh(blnGeo("wSide", function () { return new THREE.BoxGeometry(0.08, 6.2, 0.08); }), wd, x, 3.1, 2.05, G); });
blnMesh(blnGeo("wBell", function () { return new THREE.CylinderGeometry(0.16, 0.32, 0.45, 10); }), blnLam(0xB08A3A), 0, 7.6, 0, G);
return false;
};
},
function () {
return function (G) {
var st = blnLam(0x2E2420, { flat: true }), nest = blnLam(0x5A3018, { flat: true }), hot = blnLam(0xFF7A1A, { e: 0xA03000 });
for (var i = 0; i < 6; i++) {
var c = blnMesh(blnGeo("rCol", function () { return new THREE.CylinderGeometry(0.55, 0.62, 1, 6); }), st, Math.cos(i * 1.05) * 0.9, 0, Math.sin(i * 1.05) * 0.9, G);
var h = 4.4 + ((i * 7) % 5) * 0.35;
c.scale.y = h;
c.position.y = h / 2;
}
blnMesh(blnGeo("rTop", function () { return new THREE.CylinderGeometry(1.7, 1.4, 0.5, 6); }), st, 0, 5.2, 0, G);
var ring = blnMesh(blnGeo("rNest", function () { return new THREE.TorusGeometry(1.1, 0.32, 6, 14); }), nest, 0, 5.55, 0, G);
ring.rotation.x = Math.PI / 2;
blnMesh(blnGeo("rCoals", function () { return new THREE.CircleGeometry(1, 12); }), hot, 0, 5.5, 0, G).rotation.x = -Math.PI / 2;
var gl = blnSprite(0xFF8A2A, 4, 0.35);
gl.position.y = 5.8;
G.add(gl);
return false;
};
},
function (P) {
var L = P.lite;
P.items = P.items.filter(function (it) {
if (it.t === "k" && /^(firepillar|emberfield|lavaflow|bridge)$/.test(it.a))
return false;
if (it.t === "b" && /^(phoenix|fireelemental)$/.test(it.a))
return false;
if (it.t === "k" && it.a === "volcano") {
it.o.ring = 0.5;
it.s = Math.min(it.s, 1.25);
}
return true;
});
P.k("volcano", 215, -250, 0.9, 1.25, { ring: 0.5 });
BLN_BRIDGES.forEach(function (B) { P.make(B.x, B.z, B.rot, 3, blnBridgeMaker(B)); });
var R = ldRand(4411);
for (var i = 0; i < (L ? 6 : 9); i++) {
var a = i * 2.39 + R() * 0.4, d = (i === 0 ? 0 : 8 + Math.sqrt(i / 9) * BLN_VENTS.r * 0.85);
P.make(BLN_VENTS.x + Math.sin(a) * d, BLN_VENTS.z + Math.cos(a) * d, R() * 6, 3, blnVentMaker(900 + i, i === 0), { r: 2.2, h: 1.4 });
}
P.sign(BLN_VENTS.x + 16, BLN_VENTS.z + 30, 0.5, ["The Smoking Vents", "Press E to read"], ["The Smoking Vents", "Fumaroles: where the volcano breathes", [
"A fumarole is an opening in the ground where volcanic gas and steam escape. Most of the plume is water vapour.",
"The gas carries sulphur. As it cools at the mouth, yellow sulphur crystals grow round the lip. Gather them here (look for the glow) for the Phoenix's nest and the smiths.",
"The rotten-egg smell is hydrogen sulphide gas. Real fumaroles can be dangerous: in the Burning Lands the keepers watch them for you.",
"Famous fumarole fields: Solfatara near Naples, Yellowstone in the United States, and the Valley of Ten Thousand Smokes in Alaska."
]]);
var R2 = ldRand(5522);
for (var j = 0; j < (L ? 5 : 8); j++) {
var b = j * 2.2 + R2() * 0.5, e = (j === 0 ? 0 : 7 + Math.sqrt(j / 8) * BLN_BEDS.r * 0.85);
P.make(BLN_BEDS.x + Math.sin(b) * e, BLN_BEDS.z + Math.cos(b) * e, R2() * 6, 2, blnBedMaker(700 + j, 7 + R2() * 5));
}
P.sign(BLN_BEDS.x - 22, BLN_BEDS.z + 28, -0.6, ["The Ember Beds", "Press E to read"], ["The Ember Beds", "Where the ground stays hot", [
"Here the lava runs just under a thin crust, and the ground glows through the cracks.",
"Emberstone, the warm rock the smiths burn in the great forge, cools out of it. Gather it here (look for the glow) and take it to the smiths.",
"On Earth, ground this hot is found on fresh lava flows, as on Hawaii's Kīlauea, where a crust can be walked on by scientists in thick boots a few days after it forms.",
"Stay on the dark plates: the bright cracks are hotter than any oven."
]]);
P.make(64, -64, 0.3, 3.2, blnWatchMaker(), { hw: 2.2, hd: 2.2, h: 9 });
P.sign(56, -36, 0.2, ["The Lava Watch", "Press E to read"], ["The Lava Watch", "Watching the river of fire", [
"The watchers ring the bell if the lava rises. Real volcano observatories, like the one on Hawaii, watch with tiltmeters, gas sensors and seismometers.",
"Lava rivers move from a slow crawl to faster than you can run, depending on how runny the lava is and how steep the ground.",
"Cross only by the Ember Bridge and the Ash Bridge."
]]);
P.make(-60, -100, 0, 2.4, blnRoostMaker(), { r: 1.8, h: 5.6 });
P.k("marketstall", 34, 12, -1.2, 1);
P.k("marketstall", 40, 22, -1.9, 1);
P.k("tent", 50, 6, -1.6, 1);
P.k("cauldron", 30, 24, 0, 1, { small: 1 });
P.k("bench", 36, 30, 0.2, 1);
P.k("bench", 26, 18, 1.4, 1);
P.k("barrel", 45, 30, 0, 1, { small: 1 });
P.k("barrel", 46, 28, 0.5, 1, { small: 1 });
P.k("crates", 53, 15, 0.4, 1);
P.k("brazier", 32, 30, 0, 1, { small: 1 });
P.k("banner", 28, 6, -1.2, 1);
P.k("well", 42, 0, 0, 1);
P.sign(22, 8, -1.3, ["Cinder Rest", "Press E to read"], ["Cinder Rest", "The travellers' stop", [
"Water, bread and shade before the road to the Fire Palace.",
"Drink often in heat: a body loses water fast by sweating, even before you feel thirsty.",
"The cooks bake on hot stones, the oldest kind of oven there is."
]]);
if (typeof blnPhoenixPlan === "function")
blnPhoenixPlan(P);
if (typeof blnElementalPlan === "function")
blnElementalPlan(P);
if (typeof blnFolkPlan === "function")
blnFolkPlan(P);
try {
var G = DQ_LANDS.fire.gather;
G.forEach(function (g) { if (g[0] === "dr_sulphur")
g[4] = [BLN_VENTS.x, BLN_VENTS.z, BLN_VENTS.r]; if (g[0] === "cr_ember")
g[4] = [BLN_BEDS.x, BLN_BEDS.z, BLN_BEDS.r]; });
}
catch (e) { }
},
function (len, wid) {
return blnGeo("fth" + len + ":" + wid, function () {
var s = new THREE.Shape();
s.moveTo(0, 0);
s.quadraticCurveTo(len * 0.35, wid, len * 0.8, wid * 0.7);
s.quadraticCurveTo(len, wid * 0.2, len, 0);
s.quadraticCurveTo(len, -wid * 0.2, len * 0.8, -wid * 0.6);
s.quadraticCurveTo(len * 0.35, -wid * 0.9, 0, 0);
var g = new THREE.ShapeGeometry(s, 6);
g.rotateX(-Math.PI / 2);
return g;
});
},
function () {
var G = new THREE.Group(), body = new THREE.Group();
G.add(body);
var red = blnLam(0xD8301A, { e: 0x6A1000, ds: true }), orange = blnLam(0xFF7A1A, { e: 0x8A3000, ds: true }), gold = blnLam(0xFFC040, { e: 0x8A5A00, ds: true }), deep = blnLam(0x9A1A10, { e: 0x3A0600, ds: true });
var tor = blnMesh(blnGeo("phBody", function () { return new THREE.SphereGeometry(0.5, 14, 10); }), red, 0, 0, 0, body);
tor.scale.set(0.9, 0.85, 1.9);
var br = blnMesh(blnGeo("phBreast", function () { return new THREE.SphereGeometry(0.42, 12, 8); }), gold, 0, -0.12, 0.42, body);
br.scale.set(0.95, 0.9, 1.3);
var neck = blnMesh(blnGeo("phNeck", function () { return new THREE.CylinderGeometry(0.17, 0.3, 0.9, 10); }), orange, 0, 0.42, 0.9, body);
neck.rotation.x = 0.75;
var head = new THREE.Group();
head.position.set(0, 0.8, 1.3);
body.add(head);
blnMesh(blnGeo("phHead", function () { return new THREE.SphereGeometry(0.25, 12, 9); }), red, 0, 0, 0, head).scale.set(0.9, 0.95, 1.15);
var bk = blnMesh(blnGeo("phBeak", function () { return new THREE.ConeGeometry(0.09, 0.36, 8); }), gold, 0, -0.05, 0.33, head);
bk.rotation.x = Math.PI / 2 + 0.35;
[-1, 1].forEach(function (sd) {
blnMesh(blnGeo("phEye", function () { return new THREE.SphereGeometry(0.045, 8, 6); }), blnLam(0x101010), sd * 0.15, 0.06, 0.16, head);
blnMesh(blnGeo("phEyeRing", function () { return new THREE.TorusGeometry(0.06, 0.015, 5, 10); }), gold, sd * 0.155, 0.06, 0.155, head).rotation.y = sd * 1.1;
});
for (var c = 0; c < 5; c++) {
var cf = new THREE.Mesh(blnFeatherGeo(0.75 - Math.abs(c - 2) * 0.1, 0.08), c % 2 ? gold : orange);
cf.rotation.set(0, Math.PI / 2 + (c - 2) * 0.18, 1.0 + (c - 2) * 0.05);
cf.position.set(0, 0.15, -0.05);
head.add(cf);
}
var wings = [];
[-1, 1].forEach(function (sd) {
var w = new THREE.Group();
w.position.set(sd * 0.38, 0.18, 0.25);
body.add(w);
var arm = new THREE.Group();
w.add(arm);
for (var i = 0; i < 10; i++) {
var len = 1.2 + i * 0.2, f = new THREE.Mesh(blnFeatherGeo(len, 0.17), i < 3 ? deep : i < 6 ? red : i < 8 ? orange : gold);
f.position.set(sd * (0.15 + i * 0.22), 0, -0.05 * i);
f.rotation.y = sd > 0 ? (0.15 + i * 0.075) : (Math.PI - 0.15 - i * 0.075);
arm.add(f);
}
for (var k = 0; k < 7; k++) {
var cv = new THREE.Mesh(blnFeatherGeo(0.7 + k * 0.08, 0.14), k < 4 ? red : orange);
cv.position.set(sd * (0.1 + k * 0.28), 0.03, 0.1);
cv.rotation.y = sd > 0 ? 0.35 + k * 0.05 : Math.PI - 0.35 - k * 0.05;
arm.add(cv);
}
wings.push({ g: w, sd: sd });
});
var tail = new THREE.Group();
tail.position.set(0, 0.05, -0.85);
body.add(tail);
for (var t = 0; t < 7; t++) {
var tl = 2.6 + (3 - Math.abs(t - 3)) * 0.55, tf = new THREE.Mesh(blnFeatherGeo(tl, 0.2), t % 2 ? gold : red);
tf.rotation.y = Math.PI / 2 + (t - 3) * 0.12;
tf.rotation.z = 0;
tf.position.set((t - 3) * 0.05, -t * 0.004, 0);
tail.add(tf);
var eye = blnSprite(0xFFD060, 0.55, 0.75);
eye.position.set(Math.sin((t - 3) * 0.12) * -tl * 0.95, 0.02, -Math.cos((t - 3) * 0.12) * tl * 0.95);
tail.add(eye);
}
var aura = blnSprite(0xFF7A2A, 5.5, 0.22);
aura.position.set(0, 0.2, 0.1);
body.add(aura);
if (!blnLite()) {
var sp = blnRise(14, 1.2, 2.6, 0xFFA040, 0.22, 0.9, 1.2);
sp.position.set(0, 0.2, -0.6);
body.add(sp);
}
var legs = new THREE.Group();
body.add(legs);
[-1, 1].forEach(function (sd) {
var l = blnMesh(blnGeo("phLeg", function () { return new THREE.CylinderGeometry(0.05, 0.04, 0.6, 6); }), blnLam(0x6A4A2A), sd * 0.2, -0.6, 0.1, legs);
for (var q = 0; q < 3; q++) {
var toe = blnMesh(blnGeo("phToe", function () { return new THREE.ConeGeometry(0.03, 0.22, 5); }), blnLam(0x4A3A2A), sd * 0.2 + (q - 1) * 0.06, -0.9, 0.2, legs);
toe.rotation.x = Math.PI / 2;
}
void l;
});
G.userData.ph = { body: body, wings: wings, tail: tail, head: head, legs: legs };
G.scale.setScalar(2.1);
return G;
},
function (P) {
P.make(BLN_ROOST[0], BLN_ROOST[1], 0.6, 1, function (G) {
var ph = blnPhoenixModel();
ph.position.y = BLN_ROOST[2] + 1.6;
G.add(ph);
var talk = { name: "The Phoenix", persona: "You are the Phoenix of the Burning Lands in SomnuMatrix: an ancient firebird who is reborn from her own ashes. You are serene, kind and speak in a few warm words. You rest on your roost of basalt by the Fire Palace and fly over the land each day, keeping watch. Keep it suitable for all ages.",
greet: "*she lifts her head and her feathers shimmer like embers* I have been ash a hundred times, and every time I rise. What would you ask of me?" };
var T = { x: BLN_ROOST[0], z: BLN_ROOST[1], r: 7, name: "The Phoenix", t: talk };
LD.talkers.push(T);
var st = { t: 0, phase: "rest", off: 0 };
BLN.phx = { g: G, model: ph, T: T, st: st };
G.userData.ldAnim = function (m, t, dt) { blnPhoenixTick(dt); };
return true;
});
},
function (dt) {
var X = BLN.phx;
if (!X)
return;
var st = X.st, M = X.model, U = M.userData.ph;
st.t += dt;
var rx = BLN_ROOST[0], rz = BLN_ROOST[1], ry = BLN_ROOST[2] + 1.6;
var cx = -10, cz = -110, R = 78, H = 34, w = (Math.PI * 2) / BLN_PHX_FLY * 1.6;
var flap = 0, fold = 0, x = rx, y = ry, z = rz, yaw = 0.6, bank = 0;
if (st.phase === "rest") {
fold = 0.55;
U.body.rotation.x = -0.3 + 0.03 * Math.sin(st.t * 0.8);
U.head.rotation.y = 0.5 * Math.sin(st.t * 0.23);
U.legs.visible = true;
var st2 = (st.t % 14);
if (st2 > 11) {
fold = 0.55 - Math.sin((st2 - 11) / 3 * Math.PI) * 0.5;
}
if (st.t > BLN_PHX_REST && LD.near !== X.T && !(typeof talkOpen !== "undefined" && talkOpen)) {
st.phase = "rise";
st.t = 0;
}
}
else if (st.phase === "rise") {
var k = Math.min(1, st.t / 6);
flap = 1;
U.legs.visible = k < 0.3;
U.body.rotation.x = -0.35 * (1 - k);
var a0 = Math.atan2(rx - cx, rz - cz), px = cx + Math.sin(a0) * R, pz = cz + Math.cos(a0) * R, e = k * k * (3 - 2 * k);
x = rx + (px - rx) * e;
z = rz + (pz - rz) * e;
y = ry + (H - ry) * e;
yaw = Math.atan2(px - rx, pz - rz);
if (k >= 1) {
st.phase = "fly";
st.t = 0;
st.a0 = a0;
}
}
else if (st.phase === "fly") {
var a = st.a0 + st.t * w;
x = cx + Math.sin(a) * R;
z = cz + Math.cos(a) * R * 0.8;
y = H + 3 * Math.sin(st.t * 0.4);
yaw = a + Math.PI / 2;
bank = -0.32;
flap = (Math.sin(st.t * 0.35) > 0.2) ? 1 : 0.15;
U.legs.visible = false;
U.body.rotation.x = 0;
if (st.t > BLN_PHX_FLY) {
st.phase = "home";
st.t = 0;
st.hx = x;
st.hy = y;
st.hz = z;
}
}
else if (st.phase === "home") {
var k2 = Math.min(1, st.t / 8), e2 = k2 * k2 * (3 - 2 * k2);
x = st.hx + (rx - st.hx) * e2;
z = st.hz + (rz - st.hz) * e2;
y = st.hy + (ry - st.hy) * e2;
yaw = Math.atan2(rx - st.hx, rz - st.hz);
flap = k2 < 0.8 ? 0.6 : 1;
U.legs.visible = k2 > 0.6;
U.body.rotation.x = -0.45 * k2;
if (k2 >= 1) {
st.phase = "rest";
st.t = 0;
}
}
if (st.phase === "rest")
yaw = 0.6 + 0.15 * Math.sin(st.t * 0.1);
M.position.set(x - rx, y, z - rz);
M.rotation.set(0, yaw - 0.6, bank);
var beat = Math.sin(st.t * 3.2) * 0.85 * flap;
U.wings.forEach(function (W) { W.g.rotation.z = W.sd * (beat * 0.9 - 0.05) + (fold ? W.sd * -0.25 * fold : 0); W.g.rotation.y = fold ? W.sd * 1.15 * fold : 0; W.g.scale.x = 1 - 0.35 * fold; });
U.tail.rotation.x = 0.08 * Math.sin(st.t * 1.3) + (st.phase === "rest" ? 0.6 : 0);
X.T.r = st.phase === "rest" ? 7 : 0;
},
function (seed) {
var R = ldRand(seed || 3), G = new THREE.Group(), b = new THREE.Group();
G.add(b);
var rock = blnLam(0x2A201C, { flat: true }), rock2 = blnLam(0x3A2A22, { flat: true }), magma = blnLam(0xFF6A14, { e: 0xD04000 });
var outer = blnFire(0xFF5A14, 0.45), mid = blnFire(0xFF9A2A, 0.6), core = blnFire(0xFFE08A, 0.8);
var flames = [];
function flame(par, x, y, z, r, h, mat, ph) { var f = blnMesh(blnGeo("elFl", function () { var g = new THREE.ConeGeometry(1, 1, 9, 1, true); g.translate(0, 0.5, 0); return g; }), mat, x, y, z, par); f.scale.set(r, h, r); f.userData.bh = h; f.userData.ph = ph || 0; flames.push(f); return f; }
var col = new THREE.Group();
col.position.y = 1.15;
b.add(col);
flame(col, 0, 0, 0, 0.2, 1.2, core, 0).rotation.x = Math.PI;
for (var tg = 0; tg < 6; tg++) {
var ta = tg / 6 * Math.PI * 2 + R() * 0.4, tr = 0.12 + R() * 0.1, tf = flame(col, Math.cos(ta) * 0.2, 0.05, Math.sin(ta) * 0.2, 0.1 + R() * 0.07, 0.85 + R() * 0.45, tg % 2 ? outer : mid, tg + 1);
tf.rotation.set(Math.PI + Math.sin(ta) * 0.25, 0, -Math.cos(ta) * 0.25);
void tr;
}
var haze = blnSprite(0xFF7A2A, 1.8, 0.3);
haze.position.y = 0.65;
b.add(haze);
var pool = blnSprite(0xFF6A1A, 2.6, 0.35);
pool.position.y = 0.1;
G.add(pool);
var heart = blnMesh(blnGeo("elHeart", function () { return new THREE.SphereGeometry(0.36, 12, 10); }), magma, 0, 1.55, 0, b);
heart.scale.set(1, 1.15, 0.8);
var plates = [[0, 1.62, 0.24, 0.34, 0.3, 0.12, 0], [0.2, 1.48, 0.16, 0.18, 0.24, 0.12, 0.6], [-0.2, 1.48, 0.16, 0.18, 0.24, 0.12, -0.6], [0, 1.86, 0.18, 0.42, 0.14, 0.14, 0], [0.24, 1.68, -0.1, 0.16, 0.3, 0.18, 1.2], [-0.24, 1.68, -0.1, 0.16, 0.3, 0.18, -1.2], [0, 1.6, -0.26, 0.34, 0.36, 0.1, 0], [0, 1.3, 0.1, 0.26, 0.16, 0.18, 0]];
plates.forEach(function (p) { var m = blnMesh(blnGeo("elPlate", function () { return new THREE.DodecahedronGeometry(1, 0); }), R() < 0.5 ? rock : rock2, p[0], p[1], p[2], b); m.scale.set(p[3], p[4], p[5]); m.rotation.set(R() * 0.4, p[6], R() * 0.4); });
var arms = [];
[-1, 1].forEach(function (sd) {
var sh = blnMesh(blnGeo("elSh", function () { return new THREE.DodecahedronGeometry(0.2, 0); }), rock2, sd * 0.44, 1.86, 0, b);
sh.scale.set(1.2, 1, 1.1);
var arm = new THREE.Group();
arm.position.set(sd * 0.5, 1.8, 0);
b.add(arm);
var up = blnMesh(blnGeo("elUp", function () { var g = new THREE.CylinderGeometry(0.1, 0.13, 0.5, 6); g.translate(0, -0.25, 0); return g; }), rock, 0, 0, 0, arm);
blnMesh(blnGeo("elJoint", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), magma, 0, -0.52, 0, arm);
var fore = new THREE.Group();
fore.position.y = -0.52;
arm.add(fore);
blnMesh(blnGeo("elFore", function () { var g = new THREE.CylinderGeometry(0.09, 0.11, 0.46, 6); g.translate(0, -0.23, 0); return g; }), rock2, 0, 0, 0, fore);
var hand = new THREE.Group();
hand.position.y = -0.5;
fore.add(hand);
flame(hand, 0, -0.05, 0, 0.14, 0.42, outer, sd + 2);
flame(hand, 0, -0.03, 0, 0.08, 0.3, core, sd + 3);
fore.rotation.x = -0.5;
arm.rotation.z = sd * 0.25;
arms.push({ g: arm, fore: fore, sd: sd });
void up;
});
var head = new THREE.Group();
head.position.y = 2.12;
b.add(head);
blnMesh(blnGeo("elHead", function () { return new THREE.DodecahedronGeometry(0.2, 0); }), rock, 0, 0, 0, head).scale.set(1, 1.15, 1);
blnMesh(blnGeo("elJaw", function () { return new THREE.BoxGeometry(0.26, 0.08, 0.18); }), rock2, 0, -0.15, 0.04, head);
[-1, 1].forEach(function (sd) { blnMesh(blnGeo("elEye", function () { return new THREE.BoxGeometry(0.075, 0.035, 0.03); }), blnFire(0xFFF0A0, 1), sd * 0.075, 0.02, 0.19, head); });
var eg = blnSprite(0xFFC060, 0.5, 0.4);
eg.position.set(0, 0.02, 0.2);
head.add(eg);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
flame(head, Math.cos(a) * 0.1, 0.1, Math.sin(a) * 0.1 - 0.03, 0.09, 0.5 + R() * 0.25, i % 2 ? outer : mid, i + 5).rotation.set(Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25);
}
flame(head, 0, 0.12, -0.02, 0.12, 0.75, core, 11);
var glow = blnSprite(0xFF7A2A, 3, 0.28);
glow.position.y = 1.6;
b.add(glow);
if (!blnLite()) {
var sp = blnRise(10, 0.8, 2.6, 0xFFA040, 0.16, 0.9, 1.1);
sp.position.y = 1.8;
b.add(sp);
}
G.userData.el = { b: b, flames: flames, arms: arms, head: head, ph: R() * 6 };
G.userData.ldAnim = function (m, t) {
var E = m.userData.el, p = t + E.ph;
E.b.position.y = 0.12 * Math.sin(p * 1.1);
E.flames.forEach(function (f) { var q = f.userData.ph; f.scale.y = f.userData.bh * (0.88 + 0.14 * Math.sin(p * 2.4 + q * 1.7)); });
E.arms.forEach(function (A) { A.g.rotation.x = 0.2 * Math.sin(p * 0.9 + A.sd); A.fore.rotation.x = -0.45 - 0.15 * Math.sin(p * 1.3 + A.sd); });
E.head.rotation.y = 0.35 * Math.sin(p * 0.3);
};
G.scale.setScalar(1.1);
return G;
},
function (P) {
var who = function (n, w, g) { return blnWho(n, w, g); };
blnElemental(P, -8, -110, 0.3, 11, who("Pyrrhos, warden of the gate", "a fire elemental who guards the Fire Palace, warm-hearted though made of flame, proud of the palace and its hundred rooms", "*crackles politely* Welcome, small cool one. Stay on the paths: the ground is warm, and in places it is very warm."), null, 1.25);
blnElemental(P, 8, -110, -0.3, 12, who("Ignatia, warden of the gate", "a fire elemental who guards the Fire Palace beside Pyrrhos; she loves the palace's Lantern Room and tells visitors to light the lanterns there", "*her crown of flame bows* The doors are open to all who come in peace. Light a lantern inside for me."), null, 1.25);
blnElemental(P, -14, -40, 0, 13, who("Calder, keeper of the river", "a fire elemental who walks the north bank of the lava river and keeps travellers to the bridges; it can stand in lava, you cannot", "*steps out of the heat-haze* Bridges only, friend. The lava holds me up; it would not hold you."), { r: 10, sp: 0.5 });
blnElemental(P, 30, -58, 0, 14, who("Scoria, keeper of the river", "a fire elemental who walks the south bank of the lava river; it knows the lava's moods and tells real facts about lava and how it flows", "*a low warm hum* The river runs slow today. Thick lava creeps; thin lava runs like syrup."), { r: 10, sp: 0.5 });
blnElemental(P, -90, -36, 0, 15, null, { r: 14, sp: 0.45 });
if (!P.lite)
blnElemental(P, 120, -44, 0, 16, null, { r: 14, sp: 0.45 });
blnElemental(P, BLN_VENTS.x - 10, BLN_VENTS.z + 8, 0.4, 17, who("Solfa, of the vents", "a fire elemental who tends the Smoking Vents; it explains fumaroles, steam and sulphur, and asks gatherers to stand upwind", "*a puff of yellow steam* Stand upwind of the vents. Sulphur grows on the lips; take what glows."), { r: 6, sp: 0.35 });
blnElemental(P, BLN_BEDS.x + 6, BLN_BEDS.z - 6, -0.4, 18, who("Brasa, of the ember beds", "a fire elemental who tends the Ember Beds; it helps gatherers find emberstone and explains how lava crust forms", "*warmth rolls off it* The dark plates hold you. The bright cracks would not. Emberstone lies where it cooled."), { r: 6, sp: 0.35 });
if (!P.lite)
blnElemental(P, -150, -120, 0, 19, null, { r: 12, sp: 0.4 });
},
function (P) {
BLN_FOLK.forEach(function (F, i) {
if (P.lite && !F[9])
return;
var look = {};
Object.keys(F[8] || {}).forEach(function (k) { if (k !== "child")
look[k] = F[8][k]; });
var o = { title: F[1], place: "the Burning Lands", look: look };
if (F[8] && F[8].child)
o.child = true;
if (look.sex) {
o.sex = look.sex;
}
P.person("bln_" + i + "_" + F[0].replace(/\W/g, ""), F[4], F[5], F[6], o, blnWho(F[0], F[2], F[3]), F[7] ? { r: F[7], sp: 0.6 } : null);
});
P.being("dwarf", 90, 14, -2.2, 1, blnWho("Brokk Emberhand", "a dwarf smith who forges chain and hinges for the Fire Palace's doors, gruff but kind, who tells real facts about metals", "*grunts* Chain. Nine hundred links for the palace gates. Want to count them?"), { r: 4, sp: 0.35 });
},
function () {
BLN.spires = [];
(store.objects || []).forEach(function (o) {
if (!o.scenery || (o.realm || 0) !== LD.rid)
return;
var m = typeof meshes !== "undefined" ? meshes[o.id] : null;
if (BLN_HIDE.test(o.archetype)) {
if (m && m.visible)
m.visible = false;
return;
}
if (o.archetype === "obsidianspire")
BLN.spires.push([o.x - LD.ox, o.z - LD.oz, 2.6]);
});
},
function (pts, w, lift, yfn) {
var step = 4, dense = [pts[0]];
for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / step));
for (var k = 1; k <= n; k++)
dense.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
}
var pos = [], idx = [];
dense.forEach(function (p, i) {
var q = dense[Math.min(i + 1, dense.length - 1)], o = dense[Math.max(i - 1, 0)], dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2;
pos.push(p[0] + nx, yfn(p[0] + nx, p[1] + nz) + lift, p[1] + nz, p[0] - nx, yfn(p[0] - nx, p[1] - nz) + lift, p[1] - nz);
if (i > 0) {
var c = (i - 1) * 2;
idx.push(c, c + 2, c + 1, c + 1, c + 2, c + 3);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
return g;
},
function () {
var all = blnInRoot("blnLamp");
if (!all.length) {
evbCard("The lanterns", "The lanterns here are waiting for a flame.");
return;
}
var left = all.filter(function (o) { return !o.userData.blnLamp.lit; });
if (!left.length) {
evbCard("The Lantern Room", "Every lantern is lit, and the room glows warm gold.<br><br>Paper lanterns came from China about two thousand years ago. At the Lantern Festival, on the fifteenth day of the new year, streets are hung with them. At Diwali, the Hindu, Sikh and Jain festival of lights, homes are lit with rows of little oil lamps called <b>diyas</b>.", [["Let them burn low", function () { all.forEach(function (o) { blnLampSet(o, false); }); if (typeof worldCard === "function")
worldCard(null); evbSay("🏮 The lanterns burn low and go out, one by one. Light them again whenever you like."); }], ["Leave them lit", function () { if (typeof worldCard === "function")
worldCard(null); }]]);
return;
}
var P = camera.position, best = null, bd = 1e9, v = new THREE.Vector3();
left.forEach(function (o) { o.getWorldPosition(v); var d = Math.hypot(v.x - P.x, v.z - P.z); if (d < bd) {
bd = d;
best = o;
} });
blnLampSet(best, true);
evbTune([784, 988], 300, 0.6);
var n = all.length - left.length + 1;
if (n < all.length)
evbCard("The lanterns", "🏮 You touch a taper to the wick and the lantern glows warm gold. <b>" + n + " of " + all.length + "</b> lit. Press E again to light the next.");
else
blnLanterns();
},
function () {
var C = blnCru(), M = BLN_CRU.metal && BLN_METALS[BLN_CRU.metal];
var body = M ? ("<b>Molten " + M.n.toLowerCase() + "</b> fills the crucible, glowing at " + M.t + ".<br><br>" + M.say) : "The great crucible of the fire giants sits on its bed of coals. Choose a metal to melt in it, then pour it into the mould to cast bars.";
var btns = [];
if (!M)
Object.keys(BLN_METALS).forEach(function (k) { var m = BLN_METALS[k]; btns.push(["Melt " + m.n.toLowerCase(), function () { blnMelt(k); }, "melts at " + m.t]); });
else
btns.push(["Pour it into the mould", blnPour, "cast three bars"]);
btns.push(["Read the founder's plaque", blnPlaque]);
evbCard("🫕 The crucible", body, btns);
void C;
},
function (k) {
var C = blnCru(), M = BLN_METALS[k];
BLN_CRU.metal = k;
BLN_CRU.poured = false;
if (C) {
C.melt.material.color.setHex(0x8A2A0A);
C.heat.material.opacity = 0.2;
var t = 0, from = new THREE.Color(0x8A2A0A), to = new THREE.Color(M.col), iv = setInterval(function () { t += 0.1; var k2 = Math.min(1, t / 2.5); C.melt.material.color.copy(from).lerp(to, k2); C.heat.material.opacity = 0.2 + 0.25 * k2; if (k2 >= 1)
clearInterval(iv); }, 100);
}
evbTune([220, 247, 262], 420, 1.0);
blnCrucible();
},
function () {
var C = blnCru(), M = BLN_METALS[BLN_CRU.metal];
if (!M) {
blnCrucible();
return;
}
if (C) {
C.bars.forEach(function (b) { b.material.color.setHex(M.col); });
C.melt.material.color.setHex(0x3A1408);
C.heat.material.opacity = 0.12;
var t = 0, from = new THREE.Color(M.col), to = new THREE.Color(M.cool), iv = setInterval(function () { t += 0.2; var k = Math.min(1, t / 8); C.bars.forEach(function (b) { b.material.color.copy(from).lerp(to, k); }); if (k >= 1)
clearInterval(iv); }, 200);
}
evbTune([523, 659, 784], 260, 0.6);
BLN_CRU.metal = null;
BLN_CRU.poured = true;
evbCard("🫕 Cast!", "The bright metal runs down the spout into the mould and fills three bars. Watch them cool from glowing to their own colour.<br><br>Pouring molten metal into a mould is called <b>casting</b>. People have cast bronze this way for about 5,000 years.", [["Melt another", blnCrucible], ["Read the founder's plaque", blnPlaque]]);
},
function () {
evbCard("The Crucible of the Fire Giants", "<ul style='margin:4px 0 0 18px;padding:0'><li>A <b>crucible</b> is a pot that can hold metal hot enough to melt. Old crucibles were made of clay; modern ones of graphite or ceramic.</li>" +
"<li>Lead melts at 327 °C, tin at 232 °C, gold at 1,064 °C, copper at 1,085 °C and iron at about 1,538 °C.</li>" +
"<li><b>Smelting</b> gets metal out of rock (ore); <b>melting</b> just turns metal liquid.</li>" +
"<li>The colour of hot metal tells its heat: dull red is about 600 °C, orange about 1,000 °C, near white over 1,300 °C.</li></ul>", [["Use the crucible", blnCrucible]]);
}
];
});
