/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(165, function () {
"use strict";
return [
function (p, x, z) {
var dx = x - p.x, dz = z - p.z, d = Math.hypot(dx, dz);
if (p.strait) {
var off = Math.abs(dx) - 130;
if (off < 0 || Math.abs(dz) > p.r)
return -40;
return Math.min(p.h, off * 1.8) * Math.min(1, (p.r - Math.abs(dz)) / 80);
}
if (p.atlantis) {
if (d < 90)
return 6 + (d < 40 ? 6 : 0);
if (d < 130)
return -6;
if (d < 210)
return 4;
if (d < 260)
return -6;
if (d < 380)
return 4;
if (d < 430)
return -6;
if (Math.abs(dz) < 22 && dx < 0)
return -6;
var e = p.r + (wFbm(dx * 0.004, dz * 0.004, 7, 3) - 0.5) * 120;
return d < e ? Math.min(10, (e - d) * 0.2) : -30;
}
var a = Math.atan2(dz, dx), e2 = p.r * (0.82 + 0.3 * wFbm(Math.cos(a) * 1.5 + p.x * 0.001, Math.sin(a) * 1.5, 13, 3));
if (d > e2)
return Math.max(-30, (e2 - d) * 0.25);
var t = 1 - d / e2, h = p.h * Math.pow(t, 1.2) + (wFbm(x * 0.01, z * 0.01, p.r, 3) - 0.5) * p.h * 0.25 * t;
if (t < 0.08)
h = Math.min(h, 1.5);
if (p.flat)
p.flat.forEach(function (f) { var fd = Math.hypot(x - p.x - f[0], z - p.z - f[1]); if (fd < f[2])
h = h + (f[3] - h) * Math.min(1, (1 - fd / f[2]) * 2); });
if (p.land) {
var ld = Math.hypot(x - p.land.x, z - p.land.z);
if (ld < 35)
h = h + (Math.max(1.5, Math.min(h, 6)) - h) * (1 - ld / 35);
}
return h;
},
function (G) {
SEA.water = wWater(3600, 72, 0x1E5A80, 1.1, { op: 0.92, shine: 70, spec: 0x8AAAC8 });
G.add(SEA.water);
var deep = wMesh(new THREE.PlaneGeometry(40000, 40000), new THREE.MeshPhongMaterial({ color: 0x1E5A80, shininess: 70, specular: 0x8AAAC8 }), 0, -1.2, 0, G);
deep.rotation.x = -Math.PI / 2;
SEA.deep = deep;
SEA.isles = SEA_PLACES.slice();
SEA.isles.forEach(function (p) { seaIsland(G, p); });
var keepFlag = NV.flag, s = nvShip();
NV.flag = keepFlag;
s.traverse(function (o) { if (o.isMesh && o.material && o.material.map && o.geometry.parameters && o.geometry.parameters.width === 3) {
o.material = new THREE.MeshLambertMaterial({ color: 0x2A5AB8, side: THREE.DoubleSide });
SEA.flag = o;
} });
G.add(s);
SEA.ship = s;
var by = new THREE.Group();
wCyl(1.2, 1.6, 3, wM(0xB83A2A), 0, 1, 0, by, 10);
wCyl(0.2, 0.2, 3, wM(0x3A3A3A), 0, 4, 0, by, 6);
var lp = wSph(0.5, wB(0xFFE8A0, { fog: false }), 0, 5.6, 0, by, 8);
by.add(wGlow(0xFFE8A0, 8, 0.8));
by.position.set(0, 0, -60);
G.add(by);
SEA.buoy = by;
for (var i = 0; i < 6; i++) {
try {
var w = build({ id: "sea_wh_" + i, archetype: i < 2 ? "whale" : "dolphin", attrs: { s: i < 2 ? 3 : 1.4 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
w.userData.a = i * 1.1;
w.userData.r = i < 2 ? 900 : 300;
G.add(w);
SEA.whales.push(w);
}
catch (e) { }
}
var rain = wPoints(1500, function () { return [(Math.random() - 0.5) * 160, Math.random() * 60, (Math.random() - 0.5) * 160]; }, 0xC8D8E8, 0.25, true);
rain.visible = false;
G.add(rain);
SEA.rain = rain;
},
function (G, p) {
var g = new THREE.Group();
G.add(g);
p.g = g;
var s = p.r * 2 + 200, n = Math.min(150, Math.round(s / 9));
var colAt = function (h) { var c = new THREE.Color(h < 2 ? 0xE0D0A0 : p.col); if (h > p.h * 0.6)
c.lerp(new THREE.Color(p.rock), 0.6); if (h < -1)
c.setHex(0x6A5A40); return c.getHex(); };
var gr;
if (p.lift) {
var rg = new THREE.RingGeometry(0.01, p.r * 0.98, 72, 30);
rg.rotateX(-Math.PI / 2);
var rp = rg.attributes.position, rc = new Float32Array(rp.count * 3), cc = new THREE.Color();
for (var vi = 0; vi < rp.count; vi++) {
var h = Math.max(1.2, seaIsleH(p, p.x + rp.getX(vi), p.z + rp.getZ(vi)));
rp.setY(vi, h);
cc.setHex(colAt(h));
rc[vi * 3] = cc.r;
rc[vi * 3 + 1] = cc.g;
rc[vi * 3 + 2] = cc.b;
}
rg.setAttribute("color", new THREE.BufferAttribute(rc, 3));
rg.computeVertexNormals();
gr = new THREE.Mesh(rg, new THREE.MeshLambertMaterial({ vertexColors: true }));
}
else
gr = wGround(s, n, function (x, z) { var h = seaIsleH(p, p.x + x, p.z + z); return [h, colAt(h)]; });
gr.position.set(p.x, p.lift || 0, p.z);
g.add(gr);
if (p.lift) {
var ug = new THREE.ConeGeometry(p.r * 0.985, p.lift - 6, 28, 6), up = ug.attributes.position;
for (var ui = 0; ui < up.count; ui++) {
var k = 1 + (wNoise(up.getX(ui) * 0.03, up.getZ(ui) * 0.03 + up.getY(ui) * 0.05, 5) - 0.5) * 0.25 * (up.getY(ui) < (p.lift - 6) / 2 - 1 ? 1 : 0);
up.setX(ui, up.getX(ui) * k);
up.setZ(ui, up.getZ(ui) * k);
}
ug.computeVertexNormals();
var under = wMesh(ug, new THREE.MeshLambertMaterial({ color: 0x6A5A48, flatShading: true }), p.x, p.lift - (p.lift - 6) / 2 + 1.3, p.z, g);
under.rotation.x = Math.PI;
var rim = wMesh(new THREE.CylinderGeometry(p.r * 0.98, p.r * 0.985, 1.4, 72, 1, true), wM(0x7A6A52), p.x, p.lift + 0.6, p.z, g);
var wall = wMesh(new THREE.CylinderGeometry(p.r * 0.86, p.r * 0.86, 8, 48, 1, true), new THREE.MeshPhongMaterial({ color: 0xB8864A, shininess: 90, specular: 0xFFE0A0, side: THREE.DoubleSide }), p.x, p.lift + 5, p.z, g);
var top = p.lift + seaIsleH(p, p.land.x, p.land.z);
for (var st = 0; st < 30; st++) {
var u = st / 29;
wBox(8, 1, 4.6, wM(0xD8D0C0), p.x, 0.5 + u * (top - 0.5), p.dock.z - u * (p.dock.z - p.land.z), g);
}
}
var R = wRand(p.x * 7 + p.z * 3 | 0);
var nt = p.k === "sirens" ? 0 : p.k === "strait" ? 20 : Math.round(p.r * 0.35);
for (var i = 0; i < nt; i++) {
var a = R() * Math.PI * 2, d = R() * p.r * 0.8, x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, h = seaIsleH(p, x, z);
if (h < 2.5 || h > p.h * 0.85)
continue;
if (p.land && Math.hypot(x - p.land.x, z - p.land.z) < 40)
continue;
if (p.clear && p.clear.some(function (c) { return Math.hypot(x - p.x - c[0], z - p.z - c[1]) < c[2]; }))
continue;
var kind = p.k === "lotus" || p.k === "pharos" ? "palm" : p.k === "ogygia" && i % 2 ? "cypress" : p.k === "ithaca" ? "olive" : i % 3 ? "oak" : "cypress";
seaTree(g, x, h + (p.lift || 0), z, kind, R);
SEA.solids = SEA.solids || [];
SEA.solids.push({ x: x, z: z, r: 0.6 });
}
if (p.dock && !p.lift) {
var dk = wBox(6, 0.6, Math.hypot(p.dock.x - p.land.x, p.dock.z - p.land.z) + 20, wM(0x7A5A3A), (p.dock.x + p.land.x) / 2, 1.6 + (p.lift || 0), (p.dock.z + p.land.z) / 2, g);
dk.rotation.y = Math.atan2(p.dock.x - p.land.x, p.dock.z - p.land.z);
}
var fn = SEA_DRESS[p.k];
if (fn)
fn(g, p, R);
},
function (g, x, y, z, kind, R) {
if (kind === "palm") {
nvPalm(g, x, y, z, R);
return;
}
if (kind === "cypress") {
wCyl(0.25, 0.35, 2, wM(0x5A3E26), x, y + 1, z, g, 5);
var c = wCone(1.3, 9 + R() * 3, wM(0x2A4A22), x, y + 6.5, z, g, 7);
return;
}
if (kind === "olive") {
var t = wCyl(0.3, 0.5, 3, wM(0x6A5A44), x, y + 1.5, z, g, 6);
t.rotation.z = (R() - 0.5) * 0.4;
for (var k = 0; k < 3; k++)
wSph(1.8, wM(0x8A9A6A), x + (R() - 0.5) * 2, y + 3.6 + R(), z + (R() - 0.5) * 2, g, 7);
return;
}
wCyl(0.35, 0.55, 5, wM(0x5A3E26), x, y + 2.5, z, g, 6);
wSph(3.2, wM(0x3A6A2A), x, y + 6.5, z, g, 8);
},
function (g, x, y, z, w, d, col, roof, rot) {
var t = new THREE.Group();
t.position.set(x, y, z);
t.rotation.y = rot || 0;
g.add(t);
var m = wM(col);
wBox(w + 2, 1, d + 2, m, 0, 0.5, 0, t);
wBox(w + 1, 0.5, d + 1, m, 0, 1.2, 0, t);
var nc = Math.max(4, Math.round(w / 2.6));
for (var i = 0; i < nc; i++) {
[-1, 1].forEach(function (s) { wCyl(0.42, 0.5, 7, m, -w / 2 + i * w / (nc - 1), 4.9, s * d / 2, t, 10); });
}
for (var j = 1; j < Math.round(d / 2.6); j++) {
[-1, 1].forEach(function (s) { wCyl(0.42, 0.5, 7, m, s * w / 2, 4.9, -d / 2 + j * 2.6, t, 10); });
}
wBox(w * 0.7, 6, d * 0.7, wM(blendHex(col, 0x000000, 0.15)), 0, 4.4, 0, t);
wBox(w + 1.4, 1, d + 1.4, m, 0, 8.9, 0, t);
var pr = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1, 1, 4, 1), wM(roof || 0xB8583A));
pr.scale.set(w * 0.75, 2.6, d * 0.75);
pr.rotation.y = Math.PI / 4;
pr.position.y = 10.7;
t.add(pr);
return t;
},
function (g, p) {
var y = seaIsleH(p, p.x, p.z - 60);
seaTemple(g, p.x, y, p.z - 60, 18, 26, 0xE8DCC0, 0xA8583A);
seaPerson(g, p, "penelope", { sex: "f", look: GREEK(0xF0E8E0, 1) }, p.x + 4, p.z - 44, { name: "Penelope", persona: "You are Penelope, wife of Odysseus and queen of Ithaca, from Homer's Odyssey. You are wise, patient, clever and loyal; for twenty years you have kept the suitors at bay, weaving and unpicking Laertes' shroud. You speak with dignity and a dry wit, and long for your husband's return. Share the stories of the Odyssey as you know them.", greet: "Welcome to Ithaca, stranger. Sit; no guest leaves this house unfed. Have you news of my husband, Odysseus, on the wide sea?" });
seaPerson(g, p, "telemachus", { sex: "m", look: GREEK(0xB8583A) }, p.x - 6, p.z - 40, { name: "Telemachus", persona: "You are Telemachus, son of Odysseus and Penelope in Homer's Odyssey: a young man just finding his courage, who sailed to Pylos and Sparta for news of his father. Earnest, brave, a little impulsive.", greet: "Stranger! Have you come from the sea? I went looking for my father once, as far as Sparta." }, { r: 10, sp: 1 });
var dog = build({ id: "argos", archetype: "dog", attrs: { s: 1.2 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
dog.position.set(p.x + 8, seaIsleH(p, p.x + 8, p.z - 30), p.z - 30);
g.add(dog);
SEA.talkers.push({ x: p.x + 8, z: p.z - 30, r: 3, name: "Argos, the old dog", fn: function () { worldCard(worldFacts("Argos", "Odysseus' dog", [], ["Odysseus raised him as a puppy before he left for Troy.", "Twenty years later, old and neglected, Argos lay on a dung heap by the gate. When Odysseus came home disguised as a beggar, the dog knew him, wagged his tail, dropped his ears, and died (Odyssey, Book 17)."])); } });
var loom = new THREE.Group();
wBox(0.15, 2.4, 0.15, wM(0x6A4A2A), -1.2, 1.2, 0, loom);
wBox(0.15, 2.4, 0.15, wM(0x6A4A2A), 1.2, 1.2, 0, loom);
wBox(2.5, 0.12, 0.12, wM(0x6A4A2A), 0, 2.4, 0, loom);
wBox(2.2, 1.6, 0.03, wM(0xE8E0D0), 0, 1.4, 0, loom);
loom.position.set(p.x + 5, y + 1.5, p.z - 50);
g.add(loom);
},
function (g, p, R) {
var cx = p.x + 40, cz = p.z - 90, h = seaIsleH(p, cx, cz);
var cave = wMesh(new THREE.SphereGeometry(16, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x5A5448, side: THREE.DoubleSide }), cx, h, cz, g);
cave.scale.set(1.3, 1.1, 1);
var mouth = wMesh(new THREE.CircleGeometry(7, 16, 0, Math.PI), wB(0x0E0C0A), cx, h, cz + 15.8, g);
var bould = wMesh(new THREE.DodecahedronGeometry(5, 0), wM(0x6A6458), cx + 12, h + 4, cz + 18, g);
for (var i = 0; i < 16; i++) {
try {
var sh = build({ id: "cy_sheep_" + i, archetype: i % 3 ? "sheep" : "goat", attrs: { s: 1.3 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
var a = R() * 6, d = 20 + R() * 60;
sh.position.set(cx + Math.cos(a) * d, seaIsleH(p, cx + Math.cos(a) * d, cz + 30 + Math.sin(a) * d), cz + 30 + Math.sin(a) * d);
sh.rotation.y = R() * 6;
g.add(sh);
SEA.people.push({ g: sh, wander: { r: 12, sp: 0.5 }, p: p });
}
catch (e) { }
}
var po = seaPerson(g, p, "polyphemus", { sex: "m", species: "giant", look: { top: 0x6A5A40, topKind: "robe", bottom: 0x5A4A30, hair: 0x3A2A1A, hairStyle: "long", beard: 1, skin: 0xB08868, hat: "none" }, scale: 4.5 }, cx, cz + 24, { name: "Polyphemus the Cyclops", persona: "You are Polyphemus, the one-eyed Cyclops of Homer's Odyssey, a son of Poseidon: a huge, rough shepherd who loves his sheep (especially his great ram), makes cheese, and has no respect for the gods or for guests. You are suspicious and grumpy but not gruesome here; you complain about the trickster who called himself 'Nobody' and blinded you, and you boast of your father Poseidon. Speak in big, blunt sentences. Keep it suitable for children.", greet: "WHO is that, on MY island? Speak up, little one. And tell me your name. And it had better not be 'Nobody'." }, null);
po.cyclops = 1;
SEA.cyclops = po;
},
function (g, p) {
var y = p.lift + seaIsleH(p, p.x, p.z);
seaTemple(g, p.x, y, p.z, 16, 20, 0xD8C8A8, 0x8A6A3A);
seaPerson(g, p, "aeolus", { sex: "m", look: { top: 0x7AA8D8, topKind: "robe", bottom: 0x7AA8D8, hair: 0xE8E8E8, hairStyle: "long", beard: 1, hat: "none", layer: "cloak", layerColor: 0xC8D8E8 } }, p.x + 3, p.z + 14, { name: "Aeolus, keeper of the winds", persona: "You are Aeolus, keeper of the winds in Homer's Odyssey, who lives on a floating island walled with bronze with your six sons and six daughters, feasting every day. You are hospitable, generous and grand, but you have no patience for anyone the gods have cursed. You love to talk of the winds: Boreas the north wind, Zephyrus the west, Notus the south, Eurus the east. You may offer the visitor a bag of winds to speed their ship, with a warning never to open it.", greet: "A ship on my sea! Come up, come up, there is always a feast in the hall of Aeolus. Do you need a wind, sailor? I have every one there is, tied in a bag." }, null);
SEA.talkers.push({ x: p.x - 6, z: p.z + 14, r: 4, name: "The bag of winds", fn: function () { SEA.wind = 120; worldCard(worldFacts("The bag of winds", "A gift of Aeolus", [], ["An ox-hide bag, tied with a silver cord, with every storm wind inside it, and a fair west wind to fill your sails.", "For the next two minutes the Wayfarer sails twice as fast.", "Do not open it. Odysseus' crew did, within sight of home."])); setStatus("<b>Aeolus gives you a fair wind.</b> For two minutes the Wayfarer sails twice as fast."); } });
},
function (g, p, R) {
for (var i = 0; i < 40; i++) {
var a = R() * 6, d = R() * p.r * 0.6, x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, h = seaIsleH(p, x, z);
if (h < 2)
continue;
var fl = wSph(0.5, wM(0xF8C8E0, { e: 0x6A3A50 }), x, h + 0.4, z, g, 8);
fl.scale.y = 0.5;
}
for (var j = 0; j < 6; j++) {
var lx = p.x + Math.cos(j) * 30, lz = p.z + 40 + Math.sin(j) * 20;
var P = seaPerson(g, p, "lotus_" + j, { sex: j % 2 ? "f" : "m", look: { top: [0xF0D8A8, 0xE8C8D8, 0xD8E8C8][j % 3], topKind: "robe", bottom: 0xE8E0C8, hat: "flowercrown", hatColor: 0xF8C8E0 } }, lx, lz, j === 0 ? { name: "A lotus-eater", persona: "You are a lotus-eater from Homer's Odyssey, a gentle, dreamy person who has eaten the honey-sweet lotus and wants nothing but to lie in the sun and eat more. You are kind, forgetful, slow and blissful, you lose track of your sentences, and you keep offering the visitor some lotus. Nothing worries you.", greet: "Mmm... hello... have you tried the lotus? It's so... sweet... I came here for something once. I forget what. Have some." } : null, null);
P.g.userData.pose = "sit";
}
SEA.talkers.push({ x: p.x, z: p.z + 30, r: 5, name: "The lotus fruit", verb: "taste it", fn: function () { SEA.lotus = 30; setStatus("<b>Honey-sweet.</b> You can't quite remember why you came… The chart has gone hazy. (It will pass.)"); } });
},
function (g, p, R) {
var hx = p.x + 60, hz = p.z, h = seaIsleH(p, hx, hz);
var house = new THREE.Group();
house.position.set(hx, h, hz);
g.add(house);
wBox(16, 7, 12, wM(0xB8B0A0), 0, 3.5, 0, house);
wBox(17, 1, 13, wM(0x8A8070), 0, 7.5, 0, house);
wBox(3, 4.5, 0.3, wM(0x6A4A2A), -8.1, 2.25, 0, house).rotation.y = Math.PI / 2;
SEA.solids = SEA.solids || [];
SEA.solids.push({ x: hx, z: hz, hw: 8, hd: 6 });
seaPerson(g, p, "circe", { sex: "f", look: { top: 0x5A2A6A, topKind: "dress", bottom: 0x5A2A6A, hair: 0xC8902A, hairStyle: "long", hat: "none", layer: "cloak", layerColor: 0x3A1A4A } }, hx - 11, hz, { name: "Circe", persona: "You are Circe, goddess and enchantress of Aeaea from Homer's Odyssey, daughter of the Sun. You are clever, proud, amused and dangerous, you sing at your great loom, you know every herb and potion, and you once turned Odysseus' men into pigs (and turned them back, younger and handsomer). You are hospitable to those who respect you. Speak elegantly with a hint of mischief; never actually harm the visitor.", greet: "Another sailor at my door. My lions and wolves did not frighten you? Good. Come in, sit, take a cup of my wine... or perhaps, having heard the stories, you would rather not?" }, null);
[["dog", -14, 6], ["dog", -14, -6], ["lion", -18, 8], ["lion", -18, -8]].forEach(function (q, i) { try {
var a = build({ id: "circe_" + i, archetype: q[0], attrs: { s: q[0] === "dog" ? 1.5 : 1.1 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
a.position.set(hx + q[1], seaIsleH(p, hx + q[1], hz + q[2]), hz + q[2]);
a.rotation.y = -Math.PI / 2;
g.add(a);
SEA.people.push({ g: a, wander: { r: 5, sp: 0.6 }, p: p });
}
catch (e) { } });
for (var i = 0; i < 5; i++) {
try {
var pg = build({ id: "circe_pig_" + i, archetype: "pig", attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
pg.position.set(hx + 10 + i * 2, seaIsleH(p, hx + 10 + i * 2, hz + 14), hz + 14);
g.add(pg);
SEA.people.push({ g: pg, wander: { r: 6, sp: 0.4 }, p: p });
}
catch (e) { }
}
},
function (g, p) {
for (var i = 0; i < 3; i++) {
var a = i * 2.1, x = p.x + Math.cos(a) * 30, z = p.z + Math.sin(a) * 30;
var P = seaPerson(g, p, "siren_" + i, { sex: "f", look: { top: 0xF4F0F8, topKind: "dress", bottom: 0xF4F0F8, hair: [0xE8D8A8, 0x2A1A1A, 0xC8502A][i], hairStyle: "long", hat: "none" } }, x, z, null, null);
P.g.userData.pose = "sit";
P.g.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
[-1, 1].forEach(function (s) { var w = wMesh(new THREE.SphereGeometry(0.5, 8, 6), wM(0xE8E0D8), s * 0.32, 1.25, -0.18, P.g); w.scale.set(0.25, 1.4, 0.9); w.rotation.z = s * 0.35; });
}
for (var rk = 0; rk < 14; rk++) {
var ra = rk / 14 * Math.PI * 2, rr = 48 + (rk % 3) * 12, rx = p.x + Math.cos(ra) * rr, rz = p.z + Math.sin(ra) * rr;
var rock = wMesh(new THREE.DodecahedronGeometry(5 + (rk % 4) * 2, 0), new THREE.MeshLambertMaterial({ color: 0x6A645A, flatShading: true }), rx, seaIsleH(p, rx, rz) + 1, rz, g);
rock.scale.y = 1.4 + (rk % 3) * 0.5;
rock.rotation.y = rk;
}
for (var fl = 0; fl < 60; fl++) {
var fa = Math.random() * 6.283, fr = Math.random() * 40, fx = p.x + Math.cos(fa) * fr, fz = p.z + Math.sin(fa) * fr;
wSph(0.25, wM([0xF8E8F0, 0xF0D040, 0xE87AA8][fl % 3]), fx, seaIsleH(p, fx, fz) + 0.2, fz, g, 6);
}
var bones = new THREE.Group();
for (var b = 0; b < 30; b++) {
var bn = wCyl(0.05, 0.05, 0.6, wM(0xE8E0D0), (Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40, bones, 4);
bn.rotation.set(Math.random() * 3, Math.random() * 3, Math.PI / 2);
}
bones.position.set(p.x, seaIsleH(p, p.x, p.z) + 0.1, p.z);
g.add(bones);
},
function (g, p, R) {
var sc = new THREE.Group();
sc.position.set(p.x - 140, 60, p.z);
g.add(sc);
SEA.scylla = [];
wMesh(new THREE.CircleGeometry(12, 16), wB(0x0A0806), 2, 0, 0, sc).rotation.y = Math.PI / 2;
for (var i = 0; i < 6; i++) {
var nk = new THREE.Group();
nk.position.set(2, (i % 3 - 1) * 5, (Math.floor(i / 3) - 0.5) * 8);
sc.add(nk);
var segs = [];
for (var k = 0; k < 8; k++) {
var s = wSph(1.4 - k * 0.08, wM(0x4A5A4A), 0, 0, 0, nk, 8);
segs.push(s);
}
var head = new THREE.Group();
wBox(2.2, 1.6, 3.6, wM(0x3A4A3A), 0, 0, 0, head);
for (var t = 0; t < 6; t++)
wCone(0.15, 0.6, wM(0xF0E8D8), -0.8 + t * 0.32, -0.9, 1.4, head, 4).rotation.x = Math.PI;
wSph(0.25, wB(0xFFD24A, { fog: false }), 0.7, 0.5, 1.4, head, 6);
wSph(0.25, wB(0xFFD24A, { fog: false }), -0.7, 0.5, 1.4, head, 6);
nk.add(head);
SEA.scylla.push({ segs: segs, head: head, a: i * 1.3 });
}
var wp = wMesh(new THREE.CircleGeometry(60, 48), new THREE.MeshPhongMaterial({ color: 0x1A4A6A, transparent: true, opacity: 0.9, shininess: 80 }), p.x + 70, 0.6, p.z, g);
wp.rotation.x = -Math.PI / 2;
var swirl = wTex(256, 256, function (x, W, H) { x.fillStyle = "rgba(0,0,0,0)"; x.clearRect(0, 0, W, H); x.strokeStyle = "rgba(230,245,255,0.7)"; x.lineWidth = 3; for (var a = 0; a < 30; a += 0.2) {
var r = a * 4;
x.beginPath();
x.arc(W / 2, H / 2, r, a, a + 0.8);
x.stroke();
} });
var sw = wMesh(new THREE.CircleGeometry(60, 48), new THREE.MeshBasicMaterial({ map: swirl, transparent: true, depthWrite: false }), p.x + 70, 0.8, p.z, g);
sw.rotation.x = -Math.PI / 2;
SEA.charyb = sw;
SEA.charybBase = wp;
var fig = wMesh(new THREE.CylinderGeometry(30, 4, 30, 24, 1, true), new THREE.MeshPhongMaterial({ color: 0x0E2A40, side: THREE.DoubleSide, shininess: 60 }), p.x + 70, -14, p.z, g);
var tree = seaTree(g, p.x + 120, seaIsleH(p, p.x + 120, p.z + 40), p.z + 40, "oak", R);
},
function (g, p, R) {
var cx = p.x, cz = p.z - 60, h = seaIsleH(p, cx, cz);
var cave = wMesh(new THREE.SphereGeometry(12, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x8A7A62, side: THREE.DoubleSide }), cx, h, cz, g);
wMesh(new THREE.CircleGeometry(6, 16, 0, Math.PI), wB(0x1A120A), cx, h, cz + 11.8, g);
for (var v = 0; v < 26; v++) {
var gp = wSph(0.35, wM(v % 2 ? 0x6A2A6A : 0x4A8A3A), cx - 6 + v * 0.5, h + 5.5 + Math.sin(v) * 0.8, cz + 11.6, g, 6);
}
for (var s = 0; s < 4; s++) {
var sp = wMesh(new THREE.CircleGeometry(2.4, 14), new THREE.MeshPhongMaterial({ color: 0x6AB8D8, shininess: 90 }), cx - 20 + s * 13, h + 0.15, cz + 30, g);
sp.rotation.x = -Math.PI / 2;
}
seaPerson(g, p, "calypso", { sex: "f", look: { top: 0xE8F0E0, topKind: "dress", bottom: 0xE8F0E0, hair: 0x2A1A0E, hairStyle: "long", hat: "flowercrown", hatColor: 0xF4E8F0 } }, cx + 3, cz + 16, { name: "Calypso", persona: "You are Calypso, the nymph of Ogygia from Homer's Odyssey, daughter of Atlas. You are beautiful, warm, lonely and a little sad; you sing as you weave with a golden shuttle, and you kept Odysseus seven years, offering him immortality, until Zeus made you let him go. You speak gently and wistfully, and you would like the visitor to stay a while.", greet: "A ship! It has been so long since anyone found my island. Stay a while. There is wine, and bread, and the springs are cool. Everyone who comes here wants to leave... but not yet, surely?" }, null);
},
function (g, p, R) {
[[430, 0xB8864A], [260, 0xC8C8D0], [130, 0xD8783A]].forEach(function (q) { var w = wMesh(new THREE.CylinderGeometry(q[0] + 2, q[0] + 2, 9, 96, 1, true), new THREE.MeshPhongMaterial({ color: q[1], shininess: 100, specular: 0xFFE0B0, side: THREE.DoubleSide }), p.x, 4.5, p.z, g); });
[[380, 4], [210, 4]].forEach(function (q) { var w = wMesh(new THREE.CylinderGeometry(q[0], q[0], 8, 96, 1, true), new THREE.MeshPhongMaterial({ color: 0xC8B898, side: THREE.DoubleSide }), p.x, 8, p.z, g); });
var t = seaTemple(g, p.x, 12, p.z, 22, 40, 0xE8E0D0, 0xD8A030, Math.PI / 2);
var st = new THREE.Group();
st.position.set(p.x, 13, p.z);
g.add(st);
var ch = wBox(3, 2, 4, wM(0xD8A030, { e: 0x3A2A08 }), 0, 1.5, 0, st);
var pos = wPerson("poseidon_statue", { sex: "m", look: { top: 0xD8A030, topKind: "robe", bottom: 0xD8A030, skin: 0xD8A030, hair: 0xD8A030, beard: 1, hairStyle: "long", hat: "none" }, scale: 2.6 });
pos.position.set(0, 2.5, 0);
st.add(pos);
for (var hs = 0; hs < 6; hs++) {
try {
var hr = build({ id: "atl_horse_" + hs, archetype: "horse", attrs: { s: 1.3 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
hr.position.set(-2.5 + (hs % 3) * 2.5, 0, 4 + Math.floor(hs / 3) * 2.5);
st.add(hr);
[-1, 1].forEach(function (s) { var wg = wBox(0.1, 0.8, 1.6, wM(0xD8A030), s * 0.6, 1.6, 0, hr); wg.rotation.z = s * 0.6; });
}
catch (e) { }
}
for (var i = 0; i < 60; i++) {
var a = i / 60 * Math.PI * 2, r = i % 2 ? 170 : 320, x = p.x + Math.cos(a) * r, z = p.z + Math.sin(a) * r;
if (Math.abs(z - p.z) < 26 && x < p.x)
continue;
var hb = wBox(8, 5 + (i % 3) * 2, 8, wM([0xE8E0D0, 0xC85A3A, 0x3A3A3A][i % 3]), x, 4 + 2.5 + (i % 3), z, g);
hb.rotation.y = -a;
SEA.solids = SEA.solids || [];
SEA.solids.push({ x: x, z: z, r: 5.6 });
}
for (var bd = 0; bd < 4; bd++) {
var ba = bd * Math.PI / 2;
[[110, 40], [235, 50], [405, 50]].forEach(function (q) { var b = wBox(10, 1, q[1], wM(0xC8B898), p.x + Math.cos(ba) * q[0], 5, p.z + Math.sin(ba) * q[0], g); b.rotation.y = -ba + Math.PI / 2; });
}
var water = wMesh(new THREE.RingGeometry(90, 430, 96), new THREE.MeshPhongMaterial({ color: 0x2A6A8A, shininess: 80, transparent: true, opacity: 0.85 }), p.x, 0.4, p.z, g);
water.rotation.x = -Math.PI / 2;
for (var c = 0; c < 8; c++) {
var a2 = c / 8 * Math.PI * 2 + 0.2, r2 = c % 2 ? 170 : 320;
seaPerson(g, p, "atl_" + c, { sex: c % 2 ? "f" : "m", look: GREEK([0xF0E8E0, 0xD8C8A8, 0x7AA8C8, 0xC8A060][c % 4], c % 2) }, p.x + Math.cos(a2) * r2, p.z + Math.sin(a2) * r2, c === 0 ? { name: "An Atlantean", persona: "You are a citizen of Atlantis as Plato described it in the Critias: a proud island empire beyond the Pillars of Heracles, its capital built in rings of land and water round the temple of Poseidon, its walls shining with bronze, tin and red-gold orichalcum. You are polite, proud of your city's harbours, hot and cold springs, racecourse and fleets, and you have never heard any nonsense about it sinking. Speak courteously; keep it educational and mention Plato's details.", greet: "Welcome, traveller, to the city of the Ten Kings! Have you seen the temple? Its roof is ivory, inlaid with gold, silver and orichalcum. Mind the bridges; the canal traffic is heavy today." } : null, { r: 16, sp: 1.1 });
}
},
function (g, p, R) {
var S = new THREE.Group(), px = p.x, pz = p.z + 170, py = seaFoot(p, px, pz, 14, 17);
wBox(27, 10, 33, wM(0xC8B898), px, py - 4.6, pz, S);
seaTemple(S, px, py, pz, 24, 30, 0xE8DCC0, 0xA8583A);
var bronze = new THREE.MeshPhongMaterial({ color: 0xB8864A, shininess: 90, specular: 0xFFE0A0 }), gold = new THREE.MeshPhongMaterial({ color: 0xE8C040, shininess: 100, specular: 0xFFF0C0, emissive: 0x2A1E04 }), silver = new THREE.MeshPhongMaterial({ color: 0xD8DCE4, shininess: 110, specular: 0xFFFFFF });
wBox(16.6, 5.8, 0.12, bronze, px, py + 4.4, pz + 10.56, S);
wBox(18, 0.3, 2, bronze, px, py + 1.55, pz + 11.6, S);
wBox(3.2, 4.4, 0.14, gold, px, py + 3.9, pz + 10.66, S);
[-1, 1].forEach(function (s) { wBox(0.4, 4.8, 0.3, silver, px + s * 1.8, py + 4.1, pz + 10.7, S); });
[[-4, gold], [4, silver]].forEach(function (q) {
var x = px + q[0], z = pz + 17.5;
wBox(1.2, 0.8, 1.2, wM(0xE8DCC0), x, py + 1.4, z, S);
wBox(0.6, 0.55, 1.3, q[1], x, py + 2.35, z, S);
wBox(0.42, 0.45, 0.55, q[1], x, py + 2.85, z + 0.75, S);
wBox(0.2, 0.14, 0.3, q[1], x, py + 2.75, z + 1.1, S);
[[-0.2, -0.5], [0.2, -0.5], [-0.2, 0.5], [0.2, 0.5]].forEach(function (l) { wBox(0.14, 0.5, 0.14, q[1], x + l[0], py + 1.95, z + l[1], S); });
var tl = wBox(0.08, 0.08, 0.6, q[1], x, py + 2.65, z - 0.85, S);
tl.rotation.x = -0.6;
SEA.solids.push({ x: x, z: z, r: 0.9 });
});
SEA.solids.push({ x: px, z: pz, hw: 13.5, hd: 16.5 });
var trunk = wM(0x6A5A44), leaf = wM(0x4A7A3A), fruit = [0xD8D06A, 0xC83A3A, 0xE85A3A, 0x6A3A6A, 0x5A6A3A].map(function (c) { return wM(c); });
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var tx = px + 72 + i * 12, tz = pz - 18 + j * 12, th = seaIsleH(p, tx, tz);
wCyl(0.3, 0.45, 2.6, trunk, tx, th + 1.3, tz, S, 6);
wSph(2.2, leaf, tx, th + 3.8, tz, S, 8);
for (var f = 0; f < 4; f++) {
var a = f * 1.57 + i;
wSph(0.2, fruit[(i + j) % 5], tx + Math.cos(a) * 1.9, th + 3.3 + (f % 2) * 0.6, tz + Math.sin(a) * 1.9, S, 5);
}
SEA.solids.push({ x: tx, z: tz, r: 0.6 });
}
var og = wSign(["The Orchard of Alcinous", "Fruit all the year round"], 4, 1.1, "#3A5A2A", "#FFF4D8"), ogh = seaIsleH(p, px + 64, pz + 30);
og.position.set(px + 64, ogh + 1.8, pz + 30);
og.rotation.y = -0.6;
S.add(og);
wBox(0.12, 1.3, 0.12, trunk, px + 64, ogh + 0.65, pz + 29.94, S);
var wx = p.x + 60, wz = p.z + 330, wy = seaIsleH(p, wx, wz), stone = wM(0xB8B0A0);
[[0, 0], [5, 1.5], [-5, 1]].forEach(function (q) { var x = wx + q[0], z = wz + q[1], y = seaIsleH(p, x, z); wBox(3.4, 0.6, 2.4, stone, x, y + 0.3, z, S); var w = wMesh(new THREE.PlaneGeometry(2.8, 1.8), new THREE.MeshPhongMaterial({ color: 0x5AA8C8, shininess: 90 }), x, y + 0.55, z, S); w.rotation.x = -Math.PI / 2; SEA.solids.push({ x: x, z: z, hw: 1.7, hd: 1.2 }); });
var linen = [0xF4F0E8, 0xE8D8B8, 0xC8D8E8, 0xE8C8C8].map(function (c) { return wM(c); });
for (var c = 0; c < 8; c++) {
var cx = wx - 8 + c * 2.4, cz = wz + 6 + (c % 2) * 1.6, cy = seaIsleH(p, cx, cz);
wBox(1.6, 0.05, 1.1, linen[c % 4], cx, cy + 0.05, cz, S);
}
var cart = new THREE.Group();
wBox(2.2, 0.8, 3.2, wM(0x7A5A3A), 0, 1.1, 0, cart);
[[-1.2, -0.9], [1.2, -0.9], [-1.2, 0.9], [1.2, 0.9]].forEach(function (q) { var wh = wCyl(0.55, 0.55, 0.12, wM(0x5A4028), q[0], 0.55, q[1], cart, 10); wh.rotation.z = Math.PI / 2; });
cart.position.set(wx + 12, seaIsleH(p, wx + 12, wz - 6), wz - 6);
cart.rotation.y = 0.4;
S.add(cart);
SEA.solids.push({ x: wx + 12, z: wz - 6, r: 1.8 });
wSph(0.3, wM(0xC83A3A), wx + 3, seaIsleH(p, wx + 3, wz + 9) + 0.3, wz + 9, S, 10);
landBake(g, S);
try {
var mule = build({ id: "sch_mule", archetype: "horse", attrs: { s: 0.9 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
mule.position.set(wx + 12, seaIsleH(p, wx + 12, wz - 10), wz - 10);
mule.rotation.y = 0.4;
g.add(mule);
}
catch (e) { }
seaPerson(g, p, "nausicaa", { sex: "f", look: GREEK(0xF0E0F0, 1) }, wx + 2, wz + 4, { name: "Nausicaa", persona: "You are Nausicaa, daughter of King Alcinous and Queen Arete of the Phaeacians, from Homer's Odyssey. You are brave, kind, practical and quick-witted: when a shipwrecked stranger crawled out of the bushes your maids ran, but you stood your ground, gave him clothes and food, and told him to ask your mother for help. You love the river and the sea and playing ball with your friends, and you are proud of your father's ships, which need no helmsman. Speak warmly and a little teasingly; share the stories of the Odyssey as you know them.", greet: "Oh! You gave us a fright, coming up from the shore like that. Never mind: every stranger and beggar comes from Zeus, my father says. Are you hungry? The washing is nearly dry, and then we'll show you the way up to the palace." });
seaPerson(g, p, "nausicaa_maid_0", { sex: "f", look: GREEK(0xE8E0C8, 1) }, wx - 4, wz + 8, null, { r: 6, sp: 0.9 });
seaPerson(g, p, "nausicaa_maid_1", { sex: "f", look: GREEK(0xC8D8E8, 1) }, wx + 6, wz + 10, null, { r: 6, sp: 0.9 });
seaPerson(g, p, "alcinous", { sex: "m", look: { top: 0x7A2A6A, topKind: "robe", bottom: 0x7A2A6A, shoes: 0x8A6A42, hair: 0xC8C8C8, hairStyle: "short", beard: 1, hat: "crown", hatColor: 0xE8C040, layer: "cloak", layerColor: 0x5A1A4A } }, px + 4, pz + 20, { name: "King Alcinous", persona: "You are Alcinous, king of the Phaeacians on Scheria, from Homer's Odyssey: generous, hospitable and proud of your people's ships (which need no helmsman and know every harbour by thought), of their games and dancing, and of your palace, with its walls of bronze, its doors of gold and its gold and silver guard dogs made by the god Hephaestus, and the orchard that bears fruit all year. You are a perfect host and want to hear the visitor's story, and to send them home in one of your ships. Speak graciously and a little grandly; share the stories of the Odyssey as you know them.", greet: "Stranger, be welcome in the house of Alcinous. Eat first; then tell us who you are and where your home is, and a Phaeacian ship will take you there, swift as a bird, or a thought." });
var dm = seaPerson(g, p, "demodocus", { sex: "m", look: { top: 0xE8E0D0, topKind: "robe", bottom: 0xE8E0D0, shoes: 0x8A6A42, hair: 0xE8E8E8, hairStyle: "long", beard: 1, hat: "none" } }, px - 6, pz + 20, { name: "Demodocus the bard", persona: "You are Demodocus, the blind bard of the Phaeacians in Homer's Odyssey, whom the Muse loved: she took away your sight but gave you the gift of sweet song. You sing at King Alcinous' feasts: of the quarrel of Odysseus and Achilles, and of the wooden horse that took Troy, which made the stranger at the feast hide his face and weep. You are gentle, wise and courteous and speak in a slightly poetic way; you may offer to sing a few lines of your own about the visitor's journey.", greet: "Welcome, guest. I cannot see you, but I can hear the sea in your clothes. Sit; when the meat is served, I will sing. Shall it be the tale of the wooden horse?" }, null);
dm.g.userData.pose = "sit";
var ly = new THREE.Group();
var arm = wMesh(new THREE.TorusGeometry(0.22, 0.03, 4, 10, Math.PI), wM(0x8A6A3A), 0, 0.25, 0, ly);
wBox(0.5, 0.08, 0.06, wM(0x8A6A3A), 0, 0.02, 0, ly);
ly.position.set(0.3, 1.05, 0.35);
dm.g.add(ly);
},
function (g, p, R) {
var S = new THREE.Group(), ax = p.x, az = p.z - 150, ay = seaFoot(p, ax, az, 6, 6), stone = wM(0xE8DCC0);
var gold = new THREE.MeshPhongMaterial({ color: 0xF0C850, shininess: 100, specular: 0xFFF0C0, emissive: 0x5A3A08 });
wCyl(6.5, 7, 2, stone, ax, ay, az, S, 24);
wBox(2.4, 1.2, 1.4, stone, ax, ay + 1.6, az + 2.5, S);
wCyl(0.5, 0.6, 7, stone, ax, ay + 4.5, az - 2, S, 10);
var disc = wCyl(1.8, 1.8, 0.25, gold, ax, ay + 8.8, az - 1.8, S, 24);
disc.rotation.x = Math.PI / 2;
for (var r = 0; r < 12; r++) {
var a = r / 12 * Math.PI * 2, ray = wBox(0.18, 1.3, 0.12, gold, ax + Math.cos(a) * 2.5, ay + 8.8 + Math.sin(a) * 2.5, az - 1.8, S);
ray.rotation.z = a - Math.PI / 2;
}
var glow = wGlow(0xFFD870, 8, 0.4);
glow.position.set(ax, ay + 8.8, az - 1.6);
g.add(glow);
SEA.solids.push({ x: ax, z: az, r: 7 });
var fx = p.x - 70, fz = p.z - 120, fstone = wM(0xA89A80);
for (var k = 0; k < 36; k++) {
if (k < 3)
continue;
var a2 = k / 36 * Math.PI * 2, x = fx + Math.cos(a2) * 12, z = fz + Math.sin(a2) * 12, y = seaIsleH(p, x, z);
var b = wBox(2.2, 1.1, 0.9, fstone, x, y + 0.4, z, S);
b.rotation.y = -a2 + Math.PI / 2;
if (k % 2)
SEA.solids.push({ x: x, z: z, r: 1.1 });
}
var sg = wSign(["Thrinacia", "The Sun's island: his cattle and his sheep", "Look, and admire; do not touch"], 4.4, 1.6, "#6A4A1A", "#FFF0C0");
var sx = p.x + 12, sz = p.z - 270, sy = seaIsleH(p, sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = Math.PI;
S.add(sg);
wBox(0.14, 1.3, 0.14, wM(0x6A4A2A), sx, sy + 0.65, sz + 0.08, S);
landBake(g, S);
for (var i = 0; i < 14; i++) {
try {
var cw = build({ id: "thr_cow_" + i, archetype: "cow", attrs: { s: 1.2 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
var a3 = R() * 6.283, d = 10 + R() * 70, cx = p.x + Math.cos(a3) * d, cz = p.z - 50 + Math.sin(a3) * d;
cw.position.set(cx, seaIsleH(p, cx, cz), cz);
cw.rotation.y = R() * 6;
g.add(cw);
SEA.people.push({ g: cw, wander: { r: 12, sp: 0.35 }, p: p });
}
catch (e) { }
}
for (var s = 0; s < 8; s++) {
try {
var sh = build({ id: "thr_sheep_" + s, archetype: "sheep", attrs: { s: 1.2 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
var sa = s * 0.8;
sh.position.set(fx + Math.cos(sa) * 5, seaIsleH(p, fx + Math.cos(sa) * 5, fz + Math.sin(sa) * 5), fz + Math.sin(sa) * 5);
g.add(sh);
SEA.people.push({ g: sh, wander: { r: 5, sp: 0.3 }, p: p });
}
catch (e) { }
}
var NY = function (c) { return { top: c, topKind: "dress", bottom: c, shoes: 0xC8A060, hair: 0xE8B040, hairStyle: "long", hat: "flowercrown", hatColor: 0xFFE070 }; };
seaPerson(g, p, "lampetie", NY(0xFFF0C8), ax + 3, az + 8, { name: "Lampetie", persona: "You are Lampetie, a nymph and a daughter of Helios the Sun, from Homer's Odyssey. With your sister Phaethusa you tend your father's cattle and sheep on Thrinacia: seven herds and seven flocks, fifty in each, that are never born and never die. You are bright, proud, watchful, and kind to visitors who mean no harm, but very protective of the herds; in Homer, it was you who ran to tell your father when Odysseus' starving men killed his cattle. Speak radiantly and warmly, and warn visitors gently to leave the cattle be. Keep it suitable for children.", greet: "Welcome to Thrinacia, traveller. Rest in the shade, drink at the spring, admire the cattle as much as you like. Only do not touch them. My father sees everything." });
seaPerson(g, p, "phaethusa", NY(0xF8D8A8), p.x + 20, p.z - 70, { name: "Phaethusa", persona: "You are Phaethusa, a nymph and a daughter of Helios the Sun, from Homer's Odyssey; with your sister Lampetie you tend your father's cattle on Thrinacia. You are cheerful and a little dreamy, and you count the herds every morning although they never change (fifty in each herd, never born, never dying). You know every cow by name. Speak sunnily and kindly; remind visitors, nicely, not to touch the cattle. Keep it suitable for children.", greet: "Forty-eight, forty-nine, fifty. Good: all here. Oh, hello! Don't mind me; I count them every morning. They never change, but I like counting." }, { r: 18, sp: 0.6 });
},
function (g, p, R) {
var S = new THREE.Group(), rock = new THREE.MeshLambertMaterial({ color: 0x7A746A, flatShading: true }), stone = wM(0x9A9080), dk = wB(0x140E0A);
[-1, 1].forEach(function (s) { var x = p.x + 238, z = p.z + s * 78, h = seaIsleH(p, x, z); var hl = wMesh(new THREE.DodecahedronGeometry(17, 1), rock, x, h + 14, z, S); hl.scale.set(1, 2.2, 1.2); hl.rotation.y = s; SEA.solids.push({ x: x, z: z, r: 16 }); });
for (var b = 0; b < 12; b++) {
var a = R() * 6.283, d = 60 + R() * 150, x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, r = 1.5 + R() * 2.5, h = seaIsleH(p, x, z);
if (h < 1.5 || Math.hypot(x - p.land.x, z - p.land.z) < 20 || Math.hypot(x - p.x - 110, z - p.z) < 26)
continue;
var bd = wMesh(new THREE.DodecahedronGeometry(r, 0), rock, x, h + r * 0.6, z, S);
bd.rotation.set(a, a * 2, 0);
SEA.solids.push({ x: x, z: z, r: r * 0.9 });
}
var ax = p.x + 200, az = p.z - 35, ay = seaFoot(p, ax, az, 3, 3);
wCyl(3, 3.2, 1.2, stone, ax, ay + 0.3, az, S, 16);
var wt = wMesh(new THREE.CircleGeometry(2.6, 16), new THREE.MeshPhongMaterial({ color: 0x4A98C0, shininess: 90 }), ax, ay + 0.92, az, S);
wt.rotation.x = -Math.PI / 2;
var jar = wSph(1.6, wM(0xB86A3A), ax + 4.5, ay + 1.8, az + 1, S, 12);
jar.scale.y = 1.4;
wCyl(0.7, 0.9, 1.2, wM(0xB86A3A), ax + 4.5, ay + 4.2, az + 1, S, 10);
SEA.solids.push({ x: ax, z: az, r: 3.3 }, { x: ax + 4.5, z: az + 1, r: 1.7 });
var hx = p.x + 110, hz = p.z, hy = seaFoot(p, hx, hz, 14, 18), wallM = wM(0x8A8070), roofM = wM(0x6A4A3A);
wBox(30, 10, 38, stone, hx, hy - 4.6, hz, S);
wBox(26, 14, 34, wallM, hx, hy + 7, hz, S);
wBox(0.3, 9, 6, dk, hx + 13.05, hy + 4.5, hz, S);
[-1, 1].forEach(function (s) { var r2 = wBox(30, 0.9, 19, roofM, hx, hy + 17.2, hz + s * 8.6, S); r2.rotation.x = s * 0.36; });
[-12, -5, 5, 12].forEach(function (z) { wCyl(1, 1.1, 13, stone, hx + 17, hy + 6.5, hz + z, S, 10); });
wBox(4, 1.2, 30, stone, hx + 17, hy + 13.4, hz, S);
SEA.solids.push({ x: hx, z: hz, hw: 13.5, hd: 17.5 });
[-12, -5, 5, 12].forEach(function (z) { SEA.solids.push({ x: hx + 17, z: hz + z, r: 1.2 }); });
var sg = wSign(["Telepylus", "High city of Lamus", "Ships, please moor OUTSIDE the harbour"], 4.6, 1.6, "#3A3430", "#E8D8B0");
var sx = p.land.x - 14, sz = p.land.z + 10, sy = seaIsleH(p, sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.14, 1.3, 0.14, wM(0x5A4A3A), sx - 0.08, sy + 0.65, sz, S);
landBake(g, S);
var dt = seaPerson(g, p, "antiphates_daughter", { sex: "f", species: "giant", look: { top: 0x8A6A4A, topKind: "dress", bottom: 0x8A6A4A, shoes: 0x5A4030, hair: 0x3A2A1A, hairStyle: "braids", hat: "none" }, scale: 2.6 }, ax - 5, az + 4, { name: "The king's daughter", persona: "You are the daughter of Antiphates, king of the Laestrygonians, from Homer's Odyssey: a giantess drawing water at the spring Artacia above the harbour of Telepylus, where the days are so long that the herdsmen meet at dusk and dawn. In Homer you showed Odysseus' scouts the way to your father's house, and it went badly for them; here you are curious and blunt, many times bigger than the visitor, and you think small people are funny. Be gruff but never frightening or gruesome: never threaten to eat anyone, though you may joke that the visitor should not go up to the king's hall at dinner time. Keep it suitable for children.", greet: "Ha! A little one. Off a ship, are you? Most ships stay outside our harbour these days, and quite right too. Want some water? Mind you don't fall in the jar." }, null);
dt.g.rotation.y = Math.PI / 2;
SEA.talkers[SEA.talkers.length - 1].r = 9;
var hd = seaPerson(g, p, "lae_herdsman", { sex: "m", species: "giant", look: { top: 0x6A5A40, topKind: "robe", bottom: 0x5A4A30, hair: 0x4A3A2A, hairStyle: "long", beard: 1, hat: "none" }, scale: 2.4 }, p.x + 150, p.z + 60, { name: "A Laestrygonian herdsman", persona: "You are a Laestrygonian herdsman, a giant of Telepylus in Homer's Odyssey, where the days are so long that a herdsman driving his flock home at dusk calls out to another driving his out at dawn. You are slow, sleepy and good-natured, you hardly ever get to sleep, and you love your enormous sheep. You talk about the long days, your flock, and how the king does not like ships in the harbour. Never threaten anyone. Keep it suitable for children.", greet: "Evening. Or is it morning? Hard to tell, here. I've just brought my flock in, and there's my neighbour taking his out already. Mind the sheep; they don't look where they tread." }, { r: 10, sp: 0.5 });
SEA.talkers[SEA.talkers.length - 1].r = 9;
for (var s2 = 0; s2 < 6; s2++) {
try {
var sp = build({ id: "lae_sheep_" + s2, archetype: "sheep", attrs: { s: 2.4 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
var x2 = p.x + 150 + Math.cos(s2) * 10, z2 = p.z + 60 + Math.sin(s2) * 10;
sp.position.set(x2, seaIsleH(p, x2, z2), z2);
sp.rotation.y = s2;
g.add(sp);
SEA.people.push({ g: sp, wander: { r: 14, sp: 0.4 }, p: p });
}
catch (e) { }
}
},
function (g, p, R) {
var S = new THREE.Group(), gx = p.x, gz = p.z - 160, stone = wM(0x6A6A68), bark = wM(0x5A5048), pop = wM(0x8A9A7A), wil = wM(0x6A8A5A);
for (var i = 0; i < 26; i++) {
var a = i / 26 * Math.PI * 2 + R() * 0.1, d = 18 + R() * 18, x = gx + Math.cos(a) * d, z = gz + Math.sin(a) * d, h = seaIsleH(p, x, z);
if (Math.abs(x - gx) < 4 && z < gz)
continue;
if (i % 3) {
var t = 9 + R() * 5;
wCyl(0.25, 0.4, t * 0.3, bark, x, h + t * 0.15, z, S, 6);
wCone(1.4, t, pop, x, h + t * 0.62, z, S, 7);
}
else {
wCyl(0.4, 0.6, 3, bark, x, h + 1.5, z, S, 6);
var c = wSph(3, wil, x, h + 4.2, z, S, 8);
c.scale.y = 0.6;
for (var f = 0; f < 8; f++) {
var fa = f / 8 * Math.PI * 2;
wBox(0.15, 2.6, 0.4, wil, x + Math.cos(fa) * 2.7, h + 2.9, z + Math.sin(fa) * 2.7, S).rotation.y = -fa;
}
}
SEA.solids.push({ x: x, z: z, r: 0.6 });
}
var py = seaFoot(p, gx, gz, 2, 2);
var pit = wMesh(new THREE.CircleGeometry(1.6, 16), wB(0x0A0806), gx, py + 0.06, gz, S);
pit.rotation.x = -Math.PI / 2;
for (var k = 0; k < 12; k++) {
var ka = k / 12 * Math.PI * 2;
wBox(0.8, 0.5, 0.6, stone, gx + Math.cos(ka) * 2.3, py + 0.2, gz + Math.sin(ka) * 2.3, S).rotation.y = -ka;
}
[[0xF4ECD8, 0], [0x6A1A2A, 1.6], [0x8AB8D8, 3.2], [0xE8D080, 4.7]].forEach(function (q) { var bx = gx + Math.cos(q[1]) * 3.6, bz = gz + Math.sin(q[1]) * 3.6; wCyl(0.45, 0.3, 0.25, wM(0xB8A88A), bx, py + 0.12, bz, S, 10); wCyl(0.38, 0.38, 0.02, wM(q[0]), bx, py + 0.25, bz, S, 10); });
SEA.solids.push({ x: gx, z: gz, r: 2.6 });
for (var hs = 0; hs < 4; hs++) {
var hx = p.x + 50 + (hs % 2) * 16, hz = p.z - 130 + Math.floor(hs / 2) * 16, hy = seaFoot(p, hx, hz, 3, 3);
wBox(6, 3, 5, stone, hx, hy + 1.2, hz, S);
var rf = wCone(4.6, 2.2, wM(0x4A4440), hx, hy + 3.8, hz, S, 4);
rf.rotation.y = Math.PI / 4;
wBox(1.2, 1.8, 0.1, wB(0xE8C080), hx - 3.05, hy + 0.9, hz, S).rotation.y = Math.PI / 2;
SEA.solids.push({ x: hx, z: hz, hw: 3, hd: 2.5 });
}
var lamps = [];
for (var l = 0; l < 6; l++) {
var lx = p.x + 3, lz = p.land.z + 20 + l * 12, ly = seaIsleH(p, lx, lz);
wCyl(0.08, 0.1, 2.6, wM(0x3A3A3A), lx, ly + 1.3, lz, S, 6);
wSph(0.22, wB(0xFFD890, { fog: false }), lx, ly + 2.7, lz, S, 8);
lamps.push([lx, ly + 2.7, lz]);
SEA.solids.push({ x: lx, z: lz, r: 0.2 });
}
var sg = wSign(["The edge of Ocean", "Persephone's grove: follow the lamps", "The living come back the same way"], 4.4, 1.6, "#2A2E32", "#C8D8E0");
var sx = p.land.x - 8, sz = p.land.z + 16, sy = seaIsleH(p, sx, sz);
sg.position.set(sx, sy + 2, sz);
S.add(sg);
wBox(0.14, 1.3, 0.14, wM(0x3A3A3A), sx, sy + 0.65, sz - 0.08, S);
landBake(g, S);
lamps.forEach(function (q) { var gl = wGlow(0xFFD890, 2.4, 0.6); gl.position.set(q[0], q[1], q[2]); g.add(gl); });
for (var m = 0; m < 12; m++) {
var ma = m / 12 * Math.PI * 2, md = 10 + (m % 3) * 14, mi = wGlow(0xA8B0B8, 22 + (m % 4) * 6, 0.28);
mi.material.blending = THREE.NormalBlending;
mi.position.set(gx + Math.cos(ma) * md, seaIsleH(p, gx, gz) + 3 + (m % 2) * 2, gz + Math.sin(ma) * md);
g.add(mi);
}
seaPerson(g, p, "tiresias", { sex: "m", look: { top: 0xC8CCD0, topKind: "robe", bottom: 0xC8CCD0, shoes: 0x8A8A8A, skin: 0xC8C8C8, hair: 0xF0F0F0, hairStyle: "long", beard: 1, hat: "none", layer: "cloak", layerColor: 0xA8ACB4 } }, gx + 2, gz - 4, { name: "The shade of Tiresias", persona: "You are the shade of Tiresias, the blind prophet of Thebes, whom Odysseus met at the edge of the world in Homer's Odyssey, Book 11; Persephone let you keep your wisdom even among the dead. You are calm, kind, grave and wise, and you speak slowly and solemnly. You told Odysseus how he might get home (leave the Sun's cattle on Thrinacia unharmed), that he would find trouble in his house, and that at last he would die gently, in a ripe old age, far from the sea. Talk about prophecy, the long way home, and what matters in a life. Keep it gentle and suitable for children; nothing frightening.", greet: "Who comes to the edge of Ocean, with the warm smell of the living about them? Do not be afraid. I am Tiresias. I see further now than ever I did with eyes. Ask, and I will answer if I can." });
seaPerson(g, p, "cimmerian_lamps", { sex: "f", look: { top: 0x4A4A5A, topKind: "robe", bottom: 0x3A3A44, shoes: 0x2A2A2A, hair: 0x2A2A2A, hairStyle: "long", hat: "hood", hatColor: 0x3A3A44 } }, p.x + 6, p.land.z + 44, { name: "A Cimmerian lamp-keeper", persona: "You are a Cimmerian, one of the people who live on the misty shore at the edge of Ocean in Homer's Odyssey, where the Sun never shines. Homer says almost nothing else about your people, so the rest is yours: you keep the lamps along the shore path lit, so that travellers (living ones) can find their way to Persephone's grove and back to their ships. You are cheerful in the gloom, kind, practical and a little wry about the weather, which is always mist. Keep it suitable for children.", greet: "Mind your step; the path's wet. It always is. You'll be wanting the grove, I suppose? Follow my lamps there, and come back the same way. Everyone does, if they're alive." }, { r: 8, sp: 0.6 });
},
function (g, p, R) {
var SL = SEA.solids = SEA.solids || [], S = new THREE.Group(), stone = wM(0xD8CCB0), wood = wM(0x7A5A3A);
var ax = p.x - 200, az = p.z + 60, ay = seaFoot(p, ax, az, 3, 2);
wBox(3.2, 1.2, 2.2, stone, ax, ay + 0.6, az, S);
wBox(3.6, 0.2, 2.6, stone, ax, ay + 1.3, az, S);
wCone(0.7, 1.2, wB(0xFFB050), ax, ay + 2, az, S, 7);
for (var i = 0; i < 9; i++) {
var a = -1.15 + i * 0.2875, bx = ax + Math.cos(a) * 13, bz = az + Math.sin(a) * 13, by = seaIsleH(p, bx, bz);
var bn = wBox(0.9, 0.5, 6, wood, bx, by + 0.25, bz, S);
bn.rotation.y = -a;
SL.push({ x: bx, z: bz, hw: 0.45, hd: 3, rot: -a });
}
SL.push({ x: ax, z: az, hw: 1.8, hd: 1.3 });
[[-255, -30, 0.2], [-248, 32, -0.15]].forEach(function (q, i) { var sx = p.x + q[0], sz = p.z + q[1], sh = seaGalley(18, i ? 0x2A2A30 : 0x1A1A1E); sh.position.set(sx, seaIsleH(p, sx, sz) - 0.1, sz); sh.rotation.y = Math.PI / 2 + q[2]; sh.rotation.z = 0.06; S.add(sh); SL.push({ x: sx, z: sz, hw: 1.6, hd: 8.6, rot: Math.PI / 2 + q[2] }); });
var hx = p.x - 60, hz = p.z - 10, hy = seaFoot(p, hx, hz, 13, 11);
wBox(26, 10, 22, wM(0xC8B898), hx, hy - 4.6, hz, S);
seaTemple(S, hx, hy, hz, 18, 22, 0xE8DCC0, 0xA8583A, -Math.PI / 2);
SL.push({ x: hx, z: hz, hw: 12, hd: 10 });
for (var s = 0; s < 8; s++) {
var stx = hx - 12 - s * 1.2;
wBox(1.2, 0.35, 6, stone, stx, seaFoot(p, stx, hz, 0.6, 3) + 0.17, hz, S);
}
var sg = wSign(["Sandy Pylos", "Kingdom of Nestor, son of Neleus", "Guests eat first; questions after"], 4.4, 1.6, "#5A4A2A", "#FFF0C8");
var sx2 = p.land.x + 12, sz2 = p.land.z - 12, sy2 = seaIsleH(p, sx2, sz2);
sg.position.set(sx2, sy2 + 2, sz2);
sg.rotation.y = -Math.PI / 2;
S.add(sg);
wBox(0.14, 1.3, 0.14, wood, sx2 + 0.08, sy2 + 0.65, sz2, S);
SL.push({ x: sx2, z: sz2, r: 0.2 });
landBake(g, S);
var gl = wGlow(0xFFB050, 5, 0.5);
gl.position.set(ax, ay + 2.2, az);
g.add(gl);
seaPerson(g, p, "nestor", { sex: "m", look: { top: 0xE8E0D0, topKind: "robe", bottom: 0xE8E0D0, shoes: 0x8A6A42, hair: 0xF0F0F0, hairStyle: "long", beard: 1, hat: "none", layer: "cloak", layerColor: 0x7A2A2A } }, ax + 5, az - 4, { name: "Nestor of Pylos", persona: "You are Nestor, the old king of sandy Pylos, from Homer's Odyssey (Book 3) and Iliad: a famous horseman who fought at Troy, the oldest and wisest of the Greek kings, who has outlived two generations of men. You are courteous, generous and very talkative; you love to tell long stories of your youth and of the war, and of how the Greeks scattered on the voyage home. You welcome every guest to the feast before asking their name, as custom demands, and you will lend a chariot and your son Peisistratus to anyone who needs to reach Sparta. Speak warmly and a little long-windedly. Keep it suitable for children.", greet: "Welcome, stranger, welcome! You come on a good day: we are feasting Poseidon. Sit, eat, drink; then you may tell me who you are. That is the proper order of things, and I am old enough to know." });
seaPerson(g, p, "peisistratus", { sex: "m", look: GREEK(0x3A6A9A) }, ax + 9, az + 8, { name: "Peisistratus, Nestor's son", persona: "You are Peisistratus, the youngest son of King Nestor of Pylos, from Homer's Odyssey (Books 3 and 4). You are friendly, lively, a fine chariot driver and a good companion; you drove Telemachus over two days to Sparta to ask King Menelaus for news of his father Odysseus, and you love telling about the journey, the horses, and the shining hall of Menelaus. Keep it suitable for children.", greet: "Hello! You've come by sea? Then you've missed the best road in Greece. Two days by chariot to Sparta, and I drove every mile. Ask me about the horses." }, { r: 6, sp: 0.9 });
for (var c = 0; c < 5; c++) {
var cx = ax + Math.cos(c * 1.3) * 16, cz = az + Math.sin(c * 1.3) * 16;
seaPerson(g, p, "pylian_" + c, { sex: c % 2 ? "f" : "m", look: GREEK([0xE8E0C8, 0xC8A060, 0x9AA8C8][c % 3], c % 2) }, cx, cz, null, { r: 8, sp: 0.8 });
}
},
function (g, p, R) {
var SL = SEA.solids = SEA.solids || [], S = new THREE.Group(), hx = p.x, hz = p.z + 30, hy = seaFoot(p, hx, hz, 13, 16), wood = wM(0x6A4A2A);
var bronze = new THREE.MeshPhongMaterial({ color: 0xB8864A, shininess: 90, specular: 0xFFE0A0 }), gold = new THREE.MeshPhongMaterial({ color: 0xE8C040, shininess: 100, specular: 0xFFF0C0, emissive: 0x2A1E04 }), silver = new THREE.MeshPhongMaterial({ color: 0xD8DCE4, shininess: 110, specular: 0xFFFFFF }), amber = wM(0xD8902A, { e: 0x3A2004, ei: 0.6 }), ivory = wM(0xF4ECD8);
wBox(26, 6, 32, wM(0xC8B898), hx, hy - 2.6, hz, S);
seaTemple(S, hx, hy, hz, 22, 28, 0xF0E8D8, 0xC89A40);
wBox(15.6, 5.6, 0.12, bronze, hx, hy + 4.4, hz + 9.86, S);
wBox(17, 0.3, 2, bronze, hx, hy + 1.55, hz + 10.9, S);
wBox(3, 4.3, 0.14, gold, hx, hy + 3.9, hz + 9.96, S);
[-1, 1].forEach(function (s) { wBox(0.4, 4.7, 0.3, silver, hx + s * 1.7, hy + 4.05, hz + 10, S); wBox(1.2, 1.2, 0.1, amber, hx + s * 4.6, hy + 5.4, hz + 9.98, S); wBox(1.2, 1.2, 0.1, ivory, hx + s * 6.6, hy + 5.4, hz + 9.98, S); });
wSph(0.55, gold, hx, hy + 12.2, hz, S, 12);
SL.push({ x: hx, z: hz, hw: 12.5, hd: 15.5 });
var tx = p.x + 42, tz = p.z + 72, ty = seaFoot(p, tx, tz, 6, 3);
wBox(12, 3.4, 0.4, wood, tx, ty + 1.7, tz - 3, S);
[-6, 6].forEach(function (s) { wBox(0.4, 3.4, 6, wood, tx + s, ty + 1.7, tz, S); });
var rf = wBox(12.8, 0.3, 7, wM(0xA8583A), tx, ty + 3.6, tz - 0.2, S);
rf.rotation.x = 0.12;
var ch = new THREE.Group();
ch.position.set(tx - 3, ty, tz + 5.5);
S.add(ch);
wBox(1.4, 0.9, 1, bronze, 0, 1.05, 0, ch);
[-0.85, 0.85].forEach(function (x) { var wh = wCyl(0.6, 0.6, 0.1, wood, x, 0.6, 0.1, ch, 12); wh.rotation.z = Math.PI / 2; });
var pole = wBox(0.1, 0.1, 3, wood, 0, 0.7, 1.8, ch);
SL.push({ x: tx, z: tz - 3, hw: 6, hd: 0.3 }, { x: tx - 6, z: tz, hw: 0.3, hd: 3 }, { x: tx + 6, z: tz, hw: 0.3, hd: 3 }, { x: tx - 3, z: tz + 5.5, r: 1.1 });
var bx = hx + 6, bz = hz + 19, by = seaIsleH(p, bx, bz);
wCyl(0.45, 0.38, 0.5, silver, bx, by + 0.55, bz, S, 14);
wCyl(0.4, 0.4, 0.04, gold, bx, by + 0.81, bz, S, 14);
for (var w = 0; w < 4; w++) {
var wl = wCyl(0.14, 0.14, 0.05, silver, bx + (w % 2 ? 0.36 : -0.36), by + 0.15, bz + (w < 2 ? 0.2 : -0.2), S, 10);
wl.rotation.z = Math.PI / 2;
}
wSph(0.22, wM(0x7A4AA8), bx, by + 0.9, bz, S, 8);
var ds = wCyl(0.03, 0.03, 1.2, gold, bx + 0.2, by + 1.2, bz, S, 5);
ds.rotation.z = 0.3;
SL.push({ x: bx, z: bz, r: 0.5 });
var sg = wSign(["Lacedaemon", "The hall of Menelaus: up the road, in the hollow", "Strangers welcome"], 4.6, 1.6, "#4A3A1A", "#FFF0C8");
var sx = p.land.x + 10, sz = p.land.z - 8, sy = seaIsleH(p, sx, sz);
sg.position.set(sx, sy + 2, sz);
S.add(sg);
wBox(0.14, 1.3, 0.14, wood, sx, sy + 0.65, sz - 0.08, S);
SL.push({ x: sx, z: sz, r: 0.2 });
landBake(g, S);
for (var hs = 0; hs < 2; hs++) {
try {
var hr = build({ id: "spt_horse_" + hs, archetype: "horse", attrs: { s: 1.2 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
hr.position.set(tx - 2 + hs * 4, ty, tz - 0.6);
hr.rotation.y = Math.PI;
g.add(hr);
}
catch (e) { }
}
seaPerson(g, p, "menelaus", { sex: "m", look: { top: 0x8A2A2A, topKind: "robe", bottom: 0x8A2A2A, shoes: 0x8A6A42, hair: 0xC8762A, hairStyle: "short", beard: 1, hat: "crown", hatColor: 0xE8C040, layer: "cloak", layerColor: 0x6A1A1A } }, hx - 4, hz + 18, { name: "Menelaus, king of Sparta", persona: "You are Menelaus, red-haired king of Lacedaemon (Sparta), from Homer's Odyssey, Book 4: brother of Agamemnon, husband of Helen, home at last after the war at Troy and eight years of wandering round Cyprus, Phoenicia and Egypt, gathering treasure. You are a generous, warm, slightly melancholy host who grieves for the friends lost at Troy and longs for Odysseus above all of them. You love to tell how you were becalmed on Pharos off Egypt, and how, with the help of the sea-nymph Eidothea, you hid under sealskins and held on to Proteus, the Old Man of the Sea, while he turned into a lion, a snake, a leopard, a boar, water and a tree, until he told you the truth. Speak graciously. Keep it suitable for children.", greet: "Welcome, stranger, to the house of Menelaus. Eat first; then tell me your name. You are staring at the walls? Everybody does. Bronze, gold, amber, silver, ivory: eight years of wandering paid for all of it, and I would give it all to have my friends back from Troy." });
seaPerson(g, p, "helen", { sex: "f", look: { top: 0xF4ECF4, topKind: "dress", bottom: 0xF4ECF4, shoes: 0xC8A060, hair: 0xE8C878, hairStyle: "long", hat: "none", layer: "cloak", layerColor: 0x7A4AA8 } }, bx - 1.4, bz + 0.4, { name: "Helen of Sparta", persona: "You are Helen, queen of Sparta, from Homer's Odyssey, Book 4: home again with Menelaus after the war at Troy. You are gracious, clever, observant and a little rueful about the past; you spin violet wool on a golden distaff from a silver work-basket that runs on wheels, a gift from Egypt, and you were the first to recognise Telemachus by his likeness to his father. You know a gentle Egyptian remedy that eases sorrow. Talk about Sparta, Egypt, weaving, Telemachus and Odysseus; keep the war in the background and keep it suitable for children.", greet: "Stranger, you have the look of someone who has come a long way to ask a question. Sit by me. I will go on spinning; it helps me listen." });
for (var c = 0; c < 3; c++)
seaPerson(g, p, "spartan_" + c, { sex: c % 2 ? "f" : "m", look: GREEK([0xE8E0D0, 0xB8A060, 0x8A6A9A][c], c % 2) }, hx - 12 + c * 10, hz + 24, null, { r: 7, sp: 0.8 });
},
function (g, p, R) {
var SL = SEA.solids = SEA.solids || [], S = new THREE.Group(), stone = wM(0xB8A888), dark = wM(0x5A5048), wood = wM(0x8A6A42), thatch = wM(0xB8A060), cx = p.x, cz = p.z + 40, cy = seaIsleH(p, cx, cz);
for (var i = 0; i < 24; i++) {
var a = i / 24 * Math.PI * 2 + Math.PI / 2 + Math.PI / 24;
var off = Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2));
if (Math.abs(off) < 0.2)
continue;
var x = cx + Math.cos(a) * 40, z = cz + Math.sin(a) * 40, y = seaIsleH(p, x, z), hh = [9, 8, 4, 9, 6, 9, 3, 8, 9, 5, 9, 7][i % 12];
var wl = wBox(10.6, hh, 2.6, stone, x, y + hh / 2 - 0.5, z, S);
wl.rotation.y = Math.PI / 2 - a;
SL.push({ x: x, z: z, hw: 5.3, hd: 1.3, rot: Math.PI / 2 - a });
}
[-1, 1].forEach(function (s) { var tx = cx + s * 6.5, tz = cz - 40.5, ty = seaIsleH(p, tx, tz); wBox(6, 12, 5, stone, tx, ty + 5.5, tz, S); SL.push({ x: tx, z: tz, hw: 3, hd: 2.5 }); });
var lt = wBox(7, 1.4, 3, stone, cx, seaIsleH(p, cx, cz - 40.5) + 9.6, cz - 40.5, S);
[[-14, -8], [12, -12], [-6, 14], [16, 10], [0, 0]].forEach(function (q, k) { var x = cx + q[0], z = cz + q[1], y = seaIsleH(p, x, z); var w1 = wBox(6, 1.4 + (k % 3) * 0.6, 0.7, stone, x, y + 0.7, z, S); w1.rotation.y = k; var bt = wBox(0.4, 0.4, 5, dark, x + 1.5, y + 0.25, z + 2, S); bt.rotation.y = k * 1.7; SL.push({ x: x, z: z, hw: 3, hd: 0.4, rot: k }); });
var hx = cx, hz = cz - 52, hy = seaIsleH(p, hx, hz), H = new THREE.Group();
H.position.set(hx, hy, hz);
H.rotation.y = Math.PI;
S.add(H);
wBox(3.6, 0.6, 8.4, wood, 0, 0.9, 0, H);
[[-1.4, -3.4], [1.4, -3.4], [-1.4, 3.4], [1.4, 3.4]].forEach(function (q) { var wh = wCyl(0.6, 0.6, 0.3, dark, q[0] * 1.25, 0.6, q[1], H, 12); wh.rotation.z = Math.PI / 2; });
[[-0.9, -2.6], [0.9, -2.6], [-0.9, 2.4], [0.9, 2.4]].forEach(function (q) { wBox(0.7, 3.4, 0.7, wood, q[0], 2.9, q[1], H); });
wBox(2.6, 2.8, 7, wood, 0, 5.8, 0, H);
var nk = wBox(1.6, 4, 1.7, wood, 0, 8.2, -3.4, H);
nk.rotation.x = 0.5;
var hd = wBox(1.4, 1.4, 3, wood, 0, 10, -4.9, H);
hd.rotation.x = 0.3;
[-0.45, 0.45].forEach(function (x) { wCone(0.25, 0.8, wood, x, 11, -4.2, H, 4); });
var mane = wBox(0.3, 3.6, 1.4, dark, 0, 8.6, -2.8, H);
mane.rotation.x = 0.5;
var tl = wBox(0.4, 2.6, 0.4, dark, 0, 5, 3.8, H);
tl.rotation.x = -0.4;
for (var pl = 0; pl < 5; pl++)
wBox(2.64, 0.06, 0.08, dark, 0, 4.7 + pl * 0.6, -1 + pl * 0.3, H);
SL.push({ x: hx, z: hz, hw: 1.9, hd: 4.4 });
for (var h = 0; h < 10; h++) {
var ux = p.x - 56 + (h % 5) * 28, uz = p.z - 318 + Math.floor(h / 5) * 26, uy = seaFoot(p, ux, uz, 3, 2.5);
wBox(6, 2.4, 5, wood, ux, uy + 1.2, uz, S);
var rf = wCone(4.8, 2.2, thatch, ux, uy + 3.5, uz, S, 4);
rf.rotation.y = Math.PI / 4;
rf.scale.z = 0.85;
wBox(1.2, 1.8, 0.08, wB(0x2A1E14), ux, uy + 0.9, uz + 2.52, S);
SL.push({ x: ux, z: uz, hw: 3, hd: 2.5 });
}
for (var sb = 0; sb < 6; sb++) {
var bx = p.x - 75 + sb * 30, bz = p.z - 350;
for (var pp = 0; pp < 4; pp++) {
var px = bx + (pp % 2 ? 1.6 : -1.6), pz = bz + (pp < 2 ? -4 : 4), py = seaIsleH(p, px, pz);
var pr = wBox(0.3, 1.6, 0.3, dark, px, py + 0.6, pz, S);
pr.rotation.z = pp % 2 ? -0.3 : 0.3;
}
var an = wCyl(0.7, 0.8, 0.4, stone, bx, seaIsleH(p, bx, bz - 7) + 0.2, bz - 7, S, 7);
SL.push({ x: bx, z: bz - 7, r: 0.8 });
}
var mx = p.x + 230, mz = p.z - 210, my = seaIsleH(p, mx, mz);
var md = wSph(12, wM(0x7A9A4A), mx, my - 1.5, mz, S, 18);
md.scale.y = 0.45;
for (var k = 0; k < 20; k++) {
var ka = k / 20 * Math.PI * 2;
wBox(1.1, 0.9, 0.8, stone, mx + Math.cos(ka) * 12.6, my + 0.3, mz + Math.sin(ka) * 12.6, S).rotation.y = -ka;
}
wBox(0.9, 3.2, 0.4, wM(0xE8E0D0), mx, my + 5.6, mz, S);
SL.push({ x: mx, z: mz, r: 12.4 });
var sg = wSign(["The shore of Troy", "Up the hill: the walls and the gate", "On the headland: the mound of Achilles"], 4.6, 1.6, "#3A3430", "#E8D8B0");
var sx = p.land.x + 10, sz = p.land.z + 10, sy = seaIsleH(p, sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = Math.PI;
S.add(sg);
wBox(0.14, 1.3, 0.14, wood, sx, sy + 0.65, sz + 0.08, S);
SL.push({ x: sx, z: sz, r: 0.2 });
landBake(g, S);
SEA.talkers.push({ x: hx, z: hz - 7, r: 5, name: "The wooden horse", fn: function () { worldCard(worldFacts("The wooden horse", "Odyssey, Books 4 and 8", [], ["Built of planks, on wheels, as tall as a house, and hollow. The Greeks left it at the gates and sailed out of sight; the Trojans dragged it into the city, and in the night the soldiers hidden inside climbed out and opened the gates.", "Odysseus was among the men inside it. Years later, at the Phaeacian feast, the bard Demodocus sang of it and Odysseus hid his face in his cloak and wept (Book 8).", "In real history, archaeologists have dug up a city at Hisarlik in Turkey with nine layers, one on top of another, that many think is Troy. Nobody has found a horse."])); } });
SEA.talkers.push({ x: mx, z: mz + 14, r: 4, name: "The mound of Achilles", fn: function () { worldCard(worldFacts("The mound of Achilles", "Odyssey, Book 24", [], ["The Greeks buried Achilles, the greatest of their warriors, under a great mound on a headland over the Hellespont, \"that it might be seen from far off over the sea\".", "His ashes were laid in a golden urn with those of his friend Patroclus.", "When Odysseus met his shade in the land of the dead, Achilles said he would rather work the fields as a poor man's hired hand than be king over all the dead (Book 11)."])); } });
seaPerson(g, p, "troy_herdsman", { sex: "m", look: { top: 0x7A6A4A, topKind: "robe", bottom: 0x6A5A3A, shoes: 0x5A4030, hair: 0x3A2A1A, hairStyle: "short", beard: 1, hat: "none", layer: "cloak", layerColor: 0x5A4A3A } }, p.x + 20, p.z - 150, { name: "A herdsman of the Trojan plain", persona: "You are a herdsman who keeps sheep on the plain below the ruined walls of Troy, years after the war in Homer's Odyssey (the Greeks have all sailed home). Homer gives you no name, so the rest is yours. You are weathered, wry, kind and a little sad; your grandfather remembered the city when it was whole, the ten long years of the Greek camp on the beach, and the morning the wooden horse stood at the gate. You point out the walls, the gate, the empty camp and the mound of Achilles on the headland, and you never tell anything gruesome. Keep it suitable for children.", greet: "Mind the sheep. They like the old camp; the grass is sweet where the huts were. Come to see the walls? Everyone does, sooner or later. Ten years they stood. One night, and that was that." }, { r: 12, sp: 0.6 });
for (var s2 = 0; s2 < 8; s2++) {
try {
var sp = build({ id: "troy_sheep_" + s2, archetype: "sheep", attrs: { s: 1.1 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
var x2 = p.x + 20 + Math.cos(s2) * 9, z2 = p.z - 150 + Math.sin(s2) * 9;
sp.position.set(x2, seaIsleH(p, x2, z2), z2);
sp.rotation.y = s2;
g.add(sp);
SEA.people.push({ g: sp, wander: { r: 12, sp: 0.35 }, p: p });
}
catch (e) { }
}
},
function (g, p, R) {
var SL = SEA.solids = SEA.solids || [], S = new THREE.Group(), rock = new THREE.MeshLambertMaterial({ color: 0x9A9080, flatShading: true }), dk = wB(0x0E0C0A), sand = wM(0xB8A878), skin = wM(0x6A6660), stone = wM(0xC8BCA0), wood = wM(0x7A5A3A);
var cx = p.x + 110, cz = p.z + 40, cy = seaIsleH(p, cx, cz);
[[0, 0, 8, 0.8], [-6, -7, 5, 1], [-5, 8, 5.5, 0.9], [3, -9, 3.5, 1.1], [2, 9, 3.5, 1.2]].forEach(function (q) { var x = cx + q[0], z = cz + q[1]; var r = wMesh(new THREE.DodecahedronGeometry(q[2], 1), rock, x, seaIsleH(p, x, z) + q[2] * 0.3, z, S); r.scale.y = q[3]; r.rotation.y = q[0]; SL.push({ x: x, z: z, r: q[2] * 0.85 }); });
var m = wMesh(new THREE.CircleGeometry(2.6, 14, 0, Math.PI), dk, cx + 7.1, cy, cz, S);
m.rotation.y = Math.PI / 2;
for (var b = 0; b < 4; b++) {
var bx = p.x + 132 + b * 3.2, bz = p.z - 12, by = seaIsleH(p, bx, bz);
var bd = wMesh(new THREE.CircleGeometry(1, 12), sand, bx, by + 0.03, bz, S);
bd.rotation.x = -Math.PI / 2;
bd.scale.set(0.9, 1.3, 1);
var sk = wSph(0.8, skin, bx, by + 0.12, bz + 0.2, S, 10);
sk.scale.set(0.8, 0.18, 1.3);
}
var wx = p.x + 90, wz = p.z - 60, wy = seaFoot(p, wx, wz, 2, 2);
for (var k = 0; k < 10; k++) {
var ka = k / 10 * Math.PI * 2;
wBox(0.8, 0.5, 0.5, stone, wx + Math.cos(ka) * 1.9, wy + 0.25, wz + Math.sin(ka) * 1.9, S).rotation.y = -ka;
}
var wt = wMesh(new THREE.CircleGeometry(1.6, 14), new THREE.MeshPhongMaterial({ color: 0x5AA8C8, shininess: 90 }), wx, wy + 0.35, wz, S);
wt.rotation.x = -Math.PI / 2;
SL.push({ x: wx, z: wz, r: 2.2 });
var gx = p.x + 160, gz = p.z - 50;
var gs = seaGalley(18, 0x2A2422);
gs.position.set(gx, seaIsleH(p, gx, gz) - 0.1, gz);
gs.rotation.y = 0.3;
gs.rotation.z = 0.05;
S.add(gs);
SL.push({ x: gx, z: gz, hw: 1.6, hd: 8.6, rot: 0.3 });
var sg = wSign(["Pharos", "Off Egypt: a day's sail", "Do not wake the old man at noon"], 4.4, 1.6, "#2A4A5A", "#E8F0E8");
var sx = p.land.x - 10, sz = p.land.z + 10, sy = seaIsleH(p, sx, sz);
sg.position.set(sx, sy + 2, sz);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.14, 1.3, 0.14, wood, sx - 0.08, sy + 0.65, sz, S);
SL.push({ x: sx, z: sz, r: 0.2 });
landBake(g, S);
SEA.seals = SEA.seals || [];
for (var s = 0; s < 9; s++) {
var sa = R() * 6.283, sd = 4 + R() * 14, x = cx + 16 + Math.cos(sa) * sd * 0.7, z = cz - 6 + Math.sin(sa) * sd;
var sl = seaSeal();
sl.position.set(x, seaIsleH(p, x, z), z);
sl.rotation.y = R() * 6;
sl.scale.setScalar(0.9 + R() * 0.3);
g.add(sl);
SEA.seals.push(sl);
SL.push({ x: x, z: z, r: 0.7 });
}
var pr = seaPerson(g, p, "proteus", { sex: "m", look: { top: 0x4A7A6A, topKind: "robe", bottom: 0x3A6A5A, shoes: 0x5A5A50, skin: 0xC8B8A0, hair: 0xE8ECE8, hairStyle: "long", beard: 1, hat: "none", layer: "cloak", layerColor: 0x2A5A5A } }, cx + 9.5, cz + 3, { name: "Proteus, the Old Man of the Sea", persona: "You are Proteus, the Old Man of the Sea, from Homer's Odyssey, Book 4: an ancient, unerring sea-god of Egypt who knows all the depths of the sea and serves Poseidon, and who comes up at noon to sleep among his seals on the island of Pharos. You can change into any shape (a lion, a snake, a leopard, a boar, running water, a tall tree) and you will only answer truly if someone holds on to you through every change, as Menelaus did with the help of your daughter Eidothea (you are still a little cross about the sealskins). You are grumpy, sleepy, sly and secretly fond of company; you count your seals, you speak in riddles that turn out to be true, and you may playfully threaten to turn into a lion. Keep it suitable for children.", greet: "Noon already? Hmph. Who's that, then, smelling of dry land among my seals? No, don't grab me. Everybody grabs me. Ask nicely and I may even tell you the truth." }, null);
pr.g.userData.pose = "sit";
SEA.talkers[SEA.talkers.length - 1].r = 4;
seaPerson(g, p, "eidothea", { sex: "f", look: { top: 0x7AB8C8, topKind: "dress", bottom: 0x7AB8C8, shoes: 0xC8B898, hair: 0x2A5A6A, hairStyle: "long", hat: "flowercrown", hatColor: 0xE8F4F0 } }, p.x + 140, p.z - 6, { name: "Eidothea, the sea-nymph", persona: "You are Eidothea, a sea-nymph and the daughter of Proteus, the Old Man of the Sea, from Homer's Odyssey, Book 4. You took pity on Menelaus when he was stranded on Pharos without a wind, and showed him how to catch your father: you dug four beds in the sand, hid him and three of his men under fresh sealskins, and put sweet ambrosia under their noses against the fishy smell. You are kind, quick, mischievous and very practical, and you are fond of your grumpy father. Keep it suitable for children.", greet: "Hello! You've found the beds, I see. Yes, I dug them. Don't lie in that one; it still smells of seal, even with the ambrosia. Have you come to ask my father something? He's cleverer than he looks, and crosser." }, { r: 5, sp: 0.7 });
},
function (len, col) {
var g = new THREE.Group(), hullM = wM(col || 0x1A1A1E), wood = wM(0x7A5A3A), hg = new THREE.BoxGeometry(3, 1.6, len, 1, 2, 8), p = hg.attributes.position, L = len / 2;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = z / L, taper = 1 - Math.pow(Math.abs(k), 2) * 0.85, bottom = y < 0 ? 0.45 : 1;
p.setX(i, x * taper * bottom);
if (y > 0)
p.setY(i, y + Math.pow(Math.abs(k), 3) * 1.6);
}
hg.computeVertexNormals();
var hull = new THREE.Mesh(hg, hullM);
hull.position.y = 0.8;
g.add(hull);
wBox(2.2, 0.1, len * 0.7, wood, 0, 1.5, 0, g);
var mast = wCyl(0.12, 0.14, len * 0.6, wood, 0.5, 1.75, -0.5, g, 6);
mast.rotation.x = Math.PI / 2;
for (var o = 0; o < 6; o++) {
[-1, 1].forEach(function (s) { var oar = wBox(0.08, 0.06, 4.2, wood, s * 1.25, 1.7, -L * 0.5 + o * L * 0.2, g); oar.rotation.y = s * 0.08; });
}
[-1, 1].forEach(function (s) { wSph(0.16, wM(0xF0ECE0), s * 0.5, 1.35, L - 1.2, g, 8); wSph(0.08, wM(0x101010), s * 0.53, 1.36, L - 1.1, g, 6); });
var so = wBox(0.12, 0.4, 2.6, wood, 1.3, 1.1, -L + 1.6, g);
so.rotation.x = -0.6;
return g;
},
function () {
var g = new THREE.Group(), fur = wM(0x6A6660), pale = wM(0x9A948A), dk = wM(0x141414);
var b = wSph(0.5, fur, 0, 0.32, 0, g, 10);
b.scale.set(0.75, 0.6, 1.5);
wSph(0.3, pale, 0, 0.2, 0.25, g, 8);
var hd = new THREE.Group();
hd.position.set(0, 0.5, 0.75);
g.add(hd);
var h = wSph(0.24, fur, 0, 0.05, 0.1, hd, 8);
h.scale.set(0.9, 0.85, 1.1);
wSph(0.1, pale, 0, 0, 0.3, hd, 6);
wSph(0.03, dk, 0, 0.02, 0.39, hd, 5);
[-1, 1].forEach(function (s) { wSph(0.035, dk, s * 0.1, 0.12, 0.26, hd, 5); });
[-1, 1].forEach(function (s) { var fl = wBox(0.32, 0.05, 0.18, fur, s * 0.38, 0.1, 0.35, g); fl.rotation.y = s * 0.4; var tf = wBox(0.22, 0.04, 0.3, fur, s * 0.12, 0.12, -0.8, g); tf.rotation.y = s * 0.5; });
g.userData.head = hd;
return g;
},
function () {
var st = SEA.storm, day = 0.85;
var E = { top: blendHex(0x4A8AD0, 0x2A3440, st), low: blendHex(0xB8D8EC, 0x5A6470, st), fog: blendHex(0xB8D4E8, 0x4A5460, st), fogD: 0.00022 + st * 0.0012,
sun: 0.95 - st * 0.6, sunCol: 0xFFF2DC, sunDir: [0.5, 0.6, -0.4], hemi: 0.75 - st * 0.25, hemiCol: blendHex(0xDCE8F4, 0x8A94A0, st), hemiGround: 0x2A4A5A, stars: 0 };
if (SEA.bolt > 0) {
E.hemi += SEA.bolt * 2;
E.hemiCol = 0xFFFFFF;
}
return E;
},
function (opt) {
SEA.h0 = undefined;
SEA.sx = 0;
SEA.sz = -120;
SEA.h = Math.PI;
SEA.v = 0;
SEA.aboard = true;
SEA.shore = null;
SEA.auto = null;
SEA.wax = false;
SEA.lotus = 0;
SEA.wind = 0;
SEA.storm = 0;
seaPlaceShip();
seaHelm();
yaw = SEA.h + Math.PI;
pitch = -0.16;
setStatus("<b>The Endless Sea.</b> You are at the Wayfarer's helm. <b>W</b> fills the sails, <b>S</b> shortens them, <b>A</b> and <b>D</b> steer; <b>M</b> opens the chart. Back from the helm takes you home.");
},
function (dt) {
var t = WLD.t, L = worldLocal();
if (SEA.wind > 0)
SEA.wind -= dt;
if (SEA.lotus > 0)
SEA.lotus -= dt;
var nearStrait = Math.hypot(SEA.sx - SEA_BY.strait.x, SEA.sz - SEA_BY.strait.z) < 1400, far = Math.hypot(SEA.sx, SEA.sz) > 11000;
var wantStorm = nearStrait ? 0.75 : far && Math.sin(t * 0.01 + SEA.sx * 0.0001) > 0.3 ? 0.9 : 0;
SEA.storm += (wantStorm - SEA.storm) * Math.min(1, dt * 0.2);
SEA.water.userData.amp = 1.1 + SEA.storm * 2.2;
if (SEA.storm > 0.4) {
if (SEA.bolt > 0)
SEA.bolt -= dt * 3;
else if (Math.random() < dt * 0.15) {
SEA.bolt = 1;
if (typeof playTone === "function")
setTimeout(function () { playTone(60, 1.2); }, 400);
}
}
else
SEA.bolt = Math.max(0, SEA.bolt - dt * 3);
SEA.rain.visible = SEA.storm > 0.35;
if (SEA.rain.visible) {
SEA.rain.position.set(L.x, L.y - 20, L.z);
var rp = SEA.rain.geometry.attributes.position;
for (var i = 0; i < rp.count; i++) {
var y = rp.getY(i) - dt * 40;
if (y < 0)
y += 60;
rp.setY(i, y);
}
rp.needsUpdate = true;
}
if (SEA.aboard) {
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
f = jv.f;
s = jv.s;
}
if (SEA.auto && (f || s)) {
SEA.auto = null;
setStatus("Course cleared. You have the helm.");
}
if (SEA.auto) {
var A = SEA.auto, dx = A.x - SEA.sx, dz = A.z - SEA.sz, d = Math.hypot(dx, dz), want = Math.atan2(dx, dz), dh = ((want - SEA.h + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
SEA.h += Math.max(-0.4 * dt, Math.min(0.4 * dt, dh));
SEA.v += ((d < 200 ? Math.max(2, d / 14) : SEA_MAXV) - SEA.v) * Math.min(1, dt * 0.5);
if (d < 40) {
SEA.auto = null;
SEA.v = 0;
setStatus("<b>" + esc(A.name) + ".</b> " + (A.after || ""));
}
}
else {
SEA.v += f * dt * 3;
SEA.v *= 1 - dt * 0.05;
SEA.v = Math.max(-3, Math.min(SEA_MAXV, SEA.v));
SEA.h -= s * dt * 0.35 * Math.min(1, Math.abs(SEA.v) / 4 + 0.2);
}
var sr = SEA_BY.sirens, sd = Math.hypot(SEA.sx - sr.x, SEA.sz - sr.z);
if (sd < 700) {
SEA.song -= dt;
if (SEA.song <= 0) {
SEA.song = 0.45;
var notes = [523, 659, 784, 880, 784, 659];
if (typeof playTone === "function" && !SEA.wax)
playTone(notes[Math.floor(t * 2.2) % notes.length], 0.4);
}
if (!SEA.wax && !SEA.auto) {
var pull = Math.atan2(sr.x - SEA.sx, sr.z - SEA.sz), ph = ((pull - SEA.h + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
SEA.h += ph * dt * 0.25 * (1 - sd / 700);
SEA.v = Math.max(SEA.v, 6);
if (!SEA.sirenTold) {
SEA.sirenTold = 1;
setStatus("<b>Singing.</b> Sweeter than anything you have ever heard; the ship is turning toward it by itself. <b>E</b> to stop your ears with beeswax, as Odysseus' crew did.");
}
}
if (sd < 110) {
SEA.sx = sr.x - (sr.x - SEA.sx) / sd * 112;
SEA.sz = sr.z - (sr.z - SEA.sz) / sd * 112;
SEA.v = -2;
setStatus("<b>The keel grinds on the rocks.</b> Your crew haul you off, just in time.");
}
}
else
SEA.sirenTold = 0;
var ch = SEA_BY.strait, cx = ch.x + 70, cz = ch.z, cd = Math.hypot(SEA.sx - cx, SEA.sz - cz);
if (cd < 220) {
var tang = Math.atan2(SEA.sx - cx, SEA.sz - cz) + Math.PI / 2;
SEA.sx += Math.sin(tang) * dt * (14 * (1 - cd / 220));
SEA.sz += Math.cos(tang) * dt * (14 * (1 - cd / 220));
SEA.sx -= (SEA.sx - cx) / cd * dt * 6 * (1 - cd / 220);
SEA.sz -= (SEA.sz - cz) / cd * dt * 6 * (1 - cd / 220);
if (cd < 55) {
SEA.sx = cx + (SEA.sx - cx) / cd * 200;
SEA.sz = cz + (SEA.sz - cz) / cd * 200;
SEA.v = 2;
setStatus("<b>Charybdis!</b> The whirlpool spins you round and flings you out again. Steer nearer Scylla's side, as Circe advised.");
}
}
if (SEA.h0 !== undefined)
yaw += SEA.h - SEA.h0;
SEA.h0 = SEA.h;
var k = SEA.v * (SEA.wind > 0 ? 2 : 1);
SEA.sx += Math.sin(SEA.h) * k * dt;
SEA.sz += Math.cos(SEA.h) * k * dt;
var gh = seaHeight(SEA.sx + Math.sin(SEA.h) * 20, SEA.sz + Math.cos(SEA.h) * 20);
if (gh > -3) {
SEA.sx -= Math.sin(SEA.h) * k * dt * 1.5;
SEA.sz -= Math.cos(SEA.h) * k * dt * 1.5;
SEA.v = Math.min(SEA.v, 0.5);
}
seaPlaceShip();
SEA.ship.rotation.z = Math.sin(t * 0.7) * 0.03 * (1 + SEA.storm * 3);
SEA.ship.rotation.x = Math.sin(t * 0.9) * 0.02 * (1 + SEA.storm * 3);
seaHelm();
}
else {
seaPlaceShip();
}
wWaterTick(SEA.water, L.x, L.z, t);
SEA.deep.position.x = L.x;
SEA.deep.position.z = L.z;
if (SEA.flag) {
var fp = SEA.flag.geometry.attributes.position;
for (var i2 = 0; i2 < fp.count; i2++) {
var fx = fp.getX(i2);
fp.setZ(i2, Math.sin(fx * 2 + t * 5) * 0.25 * (fx + 1.5) / 3);
}
fp.needsUpdate = true;
}
SEA.people.forEach(function (P) { if (P.wander)
wWander(P.g, dt, function (x, z) { return Math.max(seaIsleH(P.p, x, z) + (P.p.lift || 0), 1.6); }, P.wander); });
if (SEA.seals)
SEA.seals.forEach(function (sl, i) { sl.userData.head.rotation.x = Math.sin(t * 0.6 + i) * 0.15; });
SEA.whales.forEach(function (w, i) { var u = w.userData; u.a += dt * (i < 2 ? 0.02 : 0.08); var x = SEA.sx + Math.cos(u.a) * u.r, z = SEA.sz + Math.sin(u.a) * u.r; w.position.set(x, -0.5 + Math.max(0, Math.sin(t * 0.5 + i)) * (i < 2 ? 1.5 : 2.5) - 1, z); w.rotation.y = -u.a; });
if (SEA.scylla) {
var sc = SEA_BY.strait, near = Math.hypot(SEA.sx - (sc.x - 140), SEA.sz - sc.z) < 260;
SEA.scylla.forEach(function (n, i) {
n.a += dt * (near ? 1.6 : 0.5);
var reach = near ? 40 + Math.sin(n.a) * 14 : 12 + Math.sin(n.a) * 4;
n.segs.forEach(function (sg, k) { var u = k / 7; sg.position.set(u * reach, -u * u * reach * 0.8 + Math.sin(n.a + u * 3) * 3 * u, Math.sin(n.a * 0.7 + u * 2) * 6 * u); });
var last = n.segs[n.segs.length - 1].position;
n.head.position.copy(last);
n.head.rotation.y = Math.PI / 2 + Math.sin(n.a) * 0.3;
});
if (near && !SEA.scyllaTold && SEA.aboard) {
SEA.scyllaTold = 1;
setStatus("<b>Scylla!</b> Six heads on long necks lunge down from the cliff at the rigging. Keep sailing!");
if (typeof playTone === "function")
playTone(110, 0.8);
}
if (!near)
SEA.scyllaTold = 0;
}
if (SEA.charyb)
SEA.charyb.rotation.z += dt * 1.6;
if (SEA.cyclops && !SEA.cyclops.eyed) {
var hb = null;
SEA.cyclops.g.traverse(function (o) { if (!hb && o.isBone && /^head$/i.test(o.name))
hb = o; });
if (hb) {
SEA.cyclops.eyed = 1;
var eg = new THREE.Group();
var k2 = 1 / Math.max(0.001, hb.getWorldScale(new THREE.Vector3()).y) * SEA.cyclops.g.getWorldScale(new THREE.Vector3()).y;
var sock = wSph(0.046, wM(0xB08868), 0, 0.126, 0.1, eg, 20);
sock.scale.set(1.3, 0.85, 0.5);
var eye = wSph(0.033, wM(0xF4F0E8), 0, 0.126, 0.107, eg, 20);
eye.scale.set(1.15, 0.85, 0.75);
var iris = wSph(0.017, wM(0x6A4A22), 0, 0.126, 0.13, eg, 16);
iris.scale.set(1, 1, 0.5);
var pup = wSph(0.009, wB(0x140C06), 0, 0.126, 0.137, eg, 12);
pup.scale.set(1, 1, 0.6);
var brow = wSph(0.042, wM(0x3A2A1A), 0, 0.157, 0.108, eg, 16);
brow.scale.set(1.6, 0.3, 0.55);
eg.scale.setScalar(k2);
hb.add(eg);
}
}
seaGenTick();
seaPromptTick(L);
var spd = Math.abs(SEA.v * (SEA.wind > 0 ? 2 : 1)), knots = Math.round(spd * 1.94);
var near2 = seaNearest();
worldBanner("<b>The Endless Sea</b> · " + (SEA.aboard ? "at the helm · " + knots + " knots" + (SEA.wind > 0 ? " · a fair wind from Aeolus" : "") + (SEA.auto ? " · on course for " + esc(SEA.auto.name) : "") : "ashore on " + esc(SEA.shore ? SEA.shore.name : "an island")) +
(near2 && near2.d < 1200 ? " · " + esc(near2.p.name) : "") + (SEA.storm > 0.5 ? " · <span style='color:#FFB0A0'>storm</span>" : "") + (SEA.lotus > 0 ? " · <i>you've forgotten something…</i>" : "") +
(SEA.aboard ? seaWayLine() : ""));
},
function () {
var hdg = (Math.atan2(Math.sin(SEA.h), -Math.cos(SEA.h)) * 180 / Math.PI + 360) % 360;
var out = "<div>Heading <b>" + Math.round(hdg) + "° " + SEA_POINTS[Math.round(hdg / 45) % 8] + "</b>";
var best = null;
SEA.isles.forEach(function (p) { var d = Math.hypot(p.x - SEA.sx, p.z - SEA.sz) - p.r; if (!best || d < best.d)
best = { p: p, d: d }; });
if (best) {
var rel = ((Math.atan2(best.p.x - SEA.sx, best.p.z - SEA.sz) - SEA.h) * 180 / Math.PI + 540) % 360 - 180, a = Math.abs(rel);
var side = rel > 0 ? "left" : "right";
var where = a < 20 ? "dead ahead" : a < 70 ? "ahead to the " + side : a < 110 ? "off to the " + side : "behind you";
var dd = Math.max(0, best.d);
out += " · nearest land: " + esc(best.p.name) + ", " + (dd > 1000 ? (dd / 1000).toFixed(1) + " km" : Math.round(dd) + " m") + " " + where;
}
return out + "</div><div style='opacity:.8'>Steer with A and D (or the stick) · W fills the sails · S slows · M opens the chart to sail anywhere by itself</div>";
},
function (L) {
if (SEA.aboard) {
var sr = SEA_BY.sirens;
if (!SEA.wax && Math.hypot(SEA.sx - sr.x, SEA.sz - sr.z) < 900)
return worldPrompt("<b>The Sirens are singing</b> · <b>press E</b> to stop your ears with beeswax", function () { SEA.wax = true; setStatus("<b>Beeswax.</b> The song is gone; the sea sounds like the sea again."); });
if (Math.hypot(SEA.sx, SEA.sz + 60) < 120 && Math.abs(SEA.v) < 4)
return worldPrompt("<b>The dark at the home buoy</b> · <b>press E</b> to sail home to the Nightmare Wilds", function () { seaHome(); });
for (var i = 0; i < SEA.isles.length; i++) {
var p = SEA.isles[i];
if (!p.dock)
continue;
if (Math.hypot(SEA.sx - p.dock.x, SEA.sz - p.dock.z) < 160)
return worldPrompt("<b>" + esc(p.name) + "</b> · <b>press E</b> to go ashore", (function (p) { return function () { seaAshore(p); }; })(p));
}
var nn = seaNearest();
if (nn && nn.p.dock && nn.d < 260)
return worldPrompt("<b>" + esc(nn.p.name) + "</b> · <b>press E</b> to go ashore (the crew row you to the landing)", function () { seaAshore(nn.p); });
if (nn && nn.d < 500 && !nn.p.dock)
return worldPrompt("<b>" + esc(nn.p.name) + "</b> · <b>press E</b> for its story", function () { seaCard(nn.p); });
return worldPrompt(null);
}
var p2 = SEA.shore;
if (p2 && Math.hypot(L.x - p2.land.x, L.z - p2.land.z) < 14)
return worldPrompt("<b>The landing</b> · <b>press E</b> to go back aboard", seaBoard);
var got = wPickNear(SEA.talkers, L, function (T) { return T.p && T.p.cyclops ? 16 : T.r; });
if (got)
return worldPrompt("<b>" + esc(got.name) + "</b> · <b>press E</b> to " + (got.verb || (got.fn ? "look" : "talk")), got.fn ? got.fn : function () { wTalk(got.t); });
if (p2 && Math.hypot(L.x - p2.x, L.z - p2.z) < p2.r)
return worldPrompt("<b>" + esc(p2.name) + "</b> · <b>press E</b> for its story", function () { seaCard(p2); });
worldPrompt(null);
},
function (p) {
SEA.aboard = false;
SEA.shore = p;
SEA.v = 0;
SEA.auto = null;
var a = Math.atan2(p.dock.x - p.land.x, p.dock.z - p.land.z);
SEA.sx = p.dock.x + Math.sin(a) * 28;
SEA.sz = p.dock.z + Math.cos(a) * 28;
SEA.h = a + Math.PI / 2;
seaPlaceShip();
camera.position.set(SEA.base + p.land.x, seaHeight(p.land.x, p.land.z) + 1.72, p.land.z);
yaw = a;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
setStatus("<b>Ashore: " + esc(p.name) + ".</b> Back, or E at the landing, to go aboard again.");
seaCard(p);
},
function () {
if (SEA.lotus > 0) {
worldCard(worldFacts("The chart", "", [], ["The chart is a blur of pretty colours. Where were you going? It doesn't seem to matter… (The lotus will wear off soon.)"]));
return;
}
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The chart</div><div style='opacity:.8'>Choose where to sail and the Wayfarer takes you; or steer her yourself.</div>", fns = {};
SEA.isles.forEach(function (p) {
if (p.gen)
return;
var dx = p.x - SEA.sx, dz = p.z - SEA.sz, d = Math.hypot(dx, dz), b = Math.round(((Math.atan2(dx, -dz) * 180 / Math.PI) + 360) % 360);
html += worldBtn("go-" + p.k, esc(p.name), esc(p.card) + " · " + (d > 1000 ? (d / 1000).toFixed(1) + " km" : Math.round(d) + " m") + " · bearing " + b + "°");
fns["go-" + p.k] = function () {
var tx = p.dock ? p.dock.x : p.x + (SEA.sx - p.x) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 250), tz = p.dock ? p.dock.z : p.z + (SEA.sz - p.z) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 250);
SEA.auto = { x: tx, z: tz, name: p.name, after: p.dock ? "Press E to go ashore." : "Press E for its story." };
worldCard(null);
setStatus("<b>Course set</b> for " + esc(p.name) + ". Touch the helm to take her yourself.");
};
});
html += worldBtn("home", "Home", "The home buoy, and the pier at the Nightmare Wilds");
fns.home = function () { SEA.auto = { x: 0, z: -60, name: "the home buoy", after: "Press E to sail home." }; worldCard(null); };
html += worldBtn("beyond", "Beyond the known sea", "Strike out west and keep going: the sea never ends");
fns.beyond = function () { SEA.auto = { x: SEA.sx - 6000, z: SEA.sz + 3000, name: "the open sea", after: "Nothing but sea, and whatever you find." }; worldCard(null); };
worldCard(html, fns);
},
function () {
var cs = 3000, cx = Math.round(SEA.sx / cs), cz = Math.round(SEA.sz / cs), G = WORLDS.sea.g;
for (var i = -1; i <= 1; i++)
for (var j = -1; j <= 1; j++) {
var gx = cx + i, gz = cz + j, key = gx + ":" + gz;
if (SEA.gen[key] !== undefined)
continue;
var R = wRand((gx * 92821) ^ (gz * 68917) ^ 7), x = gx * cs + (R() - 0.5) * 1400, z = gz * cs + (R() - 0.5) * 1400;
var clash = Math.hypot(x, z) < 9500 && SEA_PLACES.some(function (p) { return Math.hypot(x - p.x, z - p.z) < p.r + 900; });
if (clash || Math.hypot(x, z) < 10500 || R() < 0.35) {
SEA.gen[key] = null;
continue;
}
var names = ["an unnamed isle", "a green islet", "a lonely rock", "a reef with a sandbar", "an island of tall trees", "a volcanic isle, smoking", "an island of white cliffs"];
var nm = names[Math.floor(R() * names.length)];
var p = { k: "gen" + key, gen: true, name: nm.charAt(0).toUpperCase() + nm.slice(1), x: x, z: z, r: 90 + R() * 220, h: 10 + R() * 60, col: [0x4A8A3A, 0x6A9A4A, 0x8A8A6A][Math.floor(R() * 3)], rock: 0x8A8070, card: "Found past the edge of the chart",
about: ["No name on any chart. Perhaps you are the first to find it.", "The sea goes on beyond it, as far as anybody cares to sail."] };
SEA.isles.push(p);
seaIsland(G, p);
SEA.gen[key] = p;
if (/volcanic/.test(nm)) {
var sm = wGlow(0x8A8A8A, 60, 0.5);
sm.position.set(x, p.h + 30, z);
G.add(sm);
}
}
}
];
});
