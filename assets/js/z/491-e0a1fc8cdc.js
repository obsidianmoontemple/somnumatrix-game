/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(491, function () {
"use strict";
return [
function () { if (typeof evbTune === "function")
evbTune([110, 165, 220, 165], 700, 2.0); tmrCard("The humming room", "The old ones sit here and hum, each on a single note, and together the notes make one long chord. Stand still and you feel it in your chest. Panawe told Maskull that music is the shape of something too great to be seen."); },
function (g) {
var glass = tmrM(0xD8F0FF, null, { op: 0.42, side: 1, e: 0x6AA8C8, ei: 0.25 }), rim = tmrM(0xB8D8E8, "metal", { e: 0x4A6A7A, ei: 0.2 });
var body = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 16), glass);
body.scale.set(1.25, 1.25, 6.2);
body.position.y = 1.35;
body.rotation.z = 0.12;
g.add(body);
var core = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), tmrGlow(0xBFE8FF, 0.25));
core.scale.set(0.6, 0.6, 4.6);
core.position.y = 1.35;
g.add(core);
for (var i = -1; i <= 1; i += 2) {
var f = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 1.6), rim);
f.position.set(i * 1.0, 1.9, -5.4);
f.rotation.z = i * 0.5;
g.add(f);
}
var hatch = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 6, 20), rim);
hatch.position.set(0, 2.55, 1.2);
hatch.rotation.x = Math.PI / 2;
g.add(hatch);
var drift = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), tmrM(0x9A3424, "earth"));
drift.scale.set(2.2, 0.6, 6.8);
drift.position.set(0.9, 0, 0);
g.add(drift);
g.userData.ldAnim = function (m, t) { core.material.opacity = 0.2 + 0.06 * Math.sin(t * 0.6); };
return true;
},
function (g, s) {
var bk = tmrM(0x141214, "bark"), cr = tmrM(0xE8F8FF, null, { op: 0.45, side: 1, e: 0xA8D8F0, ei: 0.4 }), R = ldRand(41 + s);
var t = new THREE.Mesh(new THREE.CylinderGeometry(0.5 * s, 0.9 * s, 14 * s, 9), bk);
t.position.y = 7 * s;
g.add(t);
for (var i = 0; i < 9; i++) {
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.28 * s, 6 * s, 6), bk);
var a = i / 9 * 6.283;
b.position.set(Math.cos(a) * 1.6 * s, 13 * s + R() * 3 * s, Math.sin(a) * 1.6 * s);
b.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
g.add(b);
for (var k = 0; k < 5; k++) {
var l = new THREE.Mesh(new THREE.OctahedronGeometry(0.5 * s, 0), cr);
l.position.set(Math.cos(a) * (2.4 + k * 0.6) * s, (14.5 + R() * 3) * s, Math.sin(a) * (2.4 + k * 0.6) * s);
l.scale.y = 1.8;
l.rotation.y = R() * 6;
g.add(l);
}
}
},
function (g, s) {
var tr = tmrM(0xE0E8F0, "marble", { e: 0x8AA8C8, ei: 0.2 }), cr = tmrM(0xC8F0E8, null, { op: 0.5, side: 1, e: 0x6AD8C8, ei: 0.5 });
var t = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.4 * s, 6 * s, 7), tr);
t.position.y = 3 * s;
g.add(t);
for (var i = 0; i < 6; i++) {
var c = new THREE.Mesh(new THREE.ConeGeometry(0.8 * s, 2.6 * s, 5), cr);
var a = i / 6 * 6.283;
c.position.set(Math.cos(a) * 1.1 * s, (5.4 + (i % 2) * 1.2) * s, Math.sin(a) * 1.1 * s);
c.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(c);
}
},
function (g, s, seed) {
var bk = tmrM(0x4A1A4A, "bark"), lf = tmrM(0x8A2A9A, null, { e: 0x3A0A3A, ei: 0.3 }), R = ldRand(seed);
var t = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.3 * s, 3 * s, 6), bk);
t.position.y = 1.5 * s;
t.rotation.z = (R() - 0.5) * 0.4;
g.add(t);
for (var i = 0; i < 4; i++) {
var b = new THREE.Mesh(new THREE.IcosahedronGeometry((0.8 + R() * 0.6) * s, 0), lf);
b.position.set((R() - 0.5) * 1.6 * s, (2.8 + R() * 1.4) * s, (R() - 0.5) * 1.6 * s);
b.scale.y = 0.7 + R() * 0.6;
g.add(b);
}
},
function (g, o) {
var st = tmrM(o.col || 0xB86A58, "stone"), rf = tmrM(o.roof || 0x6A2A3A, "stone"), dk = tmrM(0x1A0E10), r = o.r || 5;
var w = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.08, 3.2, 22), st);
w.position.y = 1.6;
g.add(w);
var d = new THREE.Mesh(new THREE.SphereGeometry(r * 1.02, 22, 10, 0, Math.PI * 2, 0, Math.PI / 2), rf);
d.scale.y = 0.62;
d.position.y = 3.15;
g.add(d);
var door = new THREE.Mesh(new THREE.CircleGeometry(1.0, 18), dk);
door.position.set(0, 1.2, r * 1.06 + 0.02);
g.add(door);
var arch = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.16, 6, 18, Math.PI), st);
arch.position.set(0, 1.2, r * 1.06 + 0.04);
g.add(arch);
for (var i = 0; i < 5; i++) {
var a = 0.9 + i * 1.1, wn = new THREE.Mesh(new THREE.CircleGeometry(0.34, 12), tmrGlow(0xFFD8A0, 0.9));
wn.position.set(Math.sin(a) * r * 1.03, 2.2, Math.cos(a) * r * 1.03);
wn.rotation.y = a;
g.add(wn);
}
if (o.glow) {
var top = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), tmrGlow(o.glow, 0.9));
top.position.y = 3.15 + r * 0.62;
g.add(top);
}
},
function (P) {
var L = "Another World", lite = P.lite;
P.items = P.items.filter(function (it) {
if (it.t === "k" && /^(biodome|habitat|researchlab|moonpool|planet)$/.test(it.a))
return false;
if (it.t === "b" && /^(alien|grey)$/.test(it.a))
return false;
if (it.t === "s" && it.lines && it.lines[0] === "Another World")
return false;
if (it.t === "k" && it.a === "lanternpost")
return false;
return true;
});
P.items.forEach(function (it, i) {
if (it.t !== "p" || !it.o || !it.o.look || it.o.look.hat !== "helmet")
return;
var robes = [0xC8E8C8, 0xB8E0D0, 0xD8E8C0, 0xE0D8F0, 0xC8D8F0], c = robes[i % robes.length], kid = !!it.o.child;
it.o.look = (i % 4 === 3 && !kid) ? TMR_SKINS([0x8A6A48, 0x6A5038][i % 2], 0xC89878) : TMR_ROBE(c, [0xD8B8A0, 0xE0C0A8, 0xC8A890][i % 3]);
var N = TMR_NEW[it.seed];
if (N)
it.talk = ldWho(N[0], L, N[1], N[2]);
});
P.sign(-8, -14, 0.3, ["Tormance", "Press E to read"], ["Tormance, the planet of Arcturus", "A Voyage to Arcturus (David Lindsay, 1920)", ["You are on Tormance, the one inhabited planet of the double star Arcturus, the world of David Lindsay's novel A Voyage to Arcturus (1920).", "Two suns: Branchspell, white and huge, and Alppain, blue, which rises only in the far north.", "The torpedo of crystal lying in the sand is how Maskull came here. Climb in, and walk the whole book: twenty-one chapters, from a séance in London to the tower of Muspel.", "The people of Poolingdred live here in houses of grown stone, and the Ondren, older than anyone, sing at their stones to the west."]], ["#2A0E14", "#F0D8C8"]);
P.path([[0, 6], [0, -80]], 4, 0x7A4A3A);
P.path([[0, -80], [0, -260]], 3, 0x7A4A3A);
P.make(18, -24, 0.5, 8, tmrTorpedo, { hw: 1.4, hd: 6.4, h: 3 });
if (typeof dpxDo === "function")
dpxDo(P, 18, -24, 7, "The crystal torpedo (A Voyage to Arcturus)", "climb in and walk the whole book", function () { if (typeof arwFromTorpedo === "function")
arwFromTorpedo(); });
P.fact(26, -18, 5, "Where Maskull woke", "look", ["The scarlet desert", "Chapter 6: Joiwind", ["\"Maskull then discovered that he was lying on sand. The colour of the sand was scarlet.\" He woke here, alone, with new organs on his body: the breve on his brow, the magn at his breast, and on his neck, the poigns.", "The torpedo lies where it came down. Its other passengers, Nightspore and Krag, have gone on ahead."]]);
var H = [[-30, -96, 0.5, 0xB86A58, 0x6A2A3A, "Joiwind's house", 0xFFE8A0], [30, -96, -0.5, 0xC0705C, 0x5A2A4A, "A house of Poolingdred"], [-56, -70, 1.1, 0xA86050, 0x6A3A3A, "A weaver's house"],
[56, -70, -1.1, 0xB87060, 0x4A2A4A, "The fruit-gatherers' house"], [0, -128, 0, 0xC88070, 0x7A3A4A, "The stone-readers' house", 0xBFE8FF], [-80, -104, 1.4, 0xA85A4A, 0x5A2A3A, "An old woman's house"], [80, -112, -1.4, 0xB06858, 0x6A2A3A, "A family's house"]];
if (lite)
H = H.slice(0, 5);
H.forEach(function (h) {
var it = P.make(h[0], h[1], h[2], 7, function (g) { tmrHouse(g, { col: h[3], roof: h[4], glow: h[6], r: 5 }); }, { r: 5.2, h: 5 });
it.dpxDoor = { theme: "tormhome", name: h[5], doors: "the round door", lx: 0, lz: 5.9 };
});
P.make(78, -26, 0, 3, function (g) {
var st = tmrM(0x8A4A3A, "stone");
var w = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.9, 16), st);
w.position.y = 0.45;
g.add(w);
var wt = new THREE.Mesh(new THREE.CircleGeometry(1.2, 16), tmrM(0x4A8AB8, null, { e: 0x2A5A8A, ei: 0.4 }));
wt.rotation.x = -Math.PI / 2;
wt.position.y = 0.8;
g.add(wt);
for (var i = 0; i < 14; i++) {
var f = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), tmrM(0x3A6AE8, null, { e: 0x1A2A8A, ei: 0.4 }));
var a = i / 14 * 6.283;
f.position.set(Math.cos(a) * 2.4, 0.9, Math.sin(a) * 2.4);
f.scale.y = 1.3;
g.add(f);
}
}, { r: 1.6, h: 1 });
P.make(-120, -160, 0, 14, function (g) {
tmrBlackTree(g, 1.1);
var st = tmrM(0x2A2428, "stone");
for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283, s = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.6, 0.8), st);
s.position.set(Math.cos(a) * 9, 1.3, Math.sin(a) * 9);
s.rotation.y = -a;
g.add(s);
}
var w = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.3, 0.8, 14), st);
w.position.set(4, 0.4, 0);
g.add(w);
var wt = new THREE.Mesh(new THREE.CircleGeometry(1.0, 14), tmrM(0x2A3A6A, null, { e: 0x1A2A5A, ei: 0.4 }));
wt.rotation.x = -Math.PI / 2;
wt.position.set(4, 0.75, 0);
g.add(wt);
}, { r: 1.2, h: 16 });
P.fact(-110, -150, 6, "Shaping's shrine", "look", ["Shaping's shrine", "Chapter 6: Joiwind", ["\"In the very middle shot up a tall, stately tree, with a black trunk and branches, and transparent, crystal leaves.\" Joiwind brings Maskull here to pray. She calls the maker of the world Shaping, or Crystalman: Panawe tells him Crystalman made all things."]]);
P.make(130, -170, 0, 10, function (g) {
var st = tmrM(0x8A4A5A, "stone");
var b = new THREE.Mesh(new THREE.CylinderGeometry(6, 6.4, 1, 26), st);
b.position.y = 0.5;
g.add(b);
var wt = new THREE.Mesh(new THREE.CircleGeometry(5.6, 26), tmrM(0x5AA8D8, null, { e: 0x2A6A9A, ei: 0.4, op: 0.85 }));
wt.rotation.x = -Math.PI / 2;
wt.position.y = 0.95;
g.add(wt);
var col = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.9, 15, 14, 1, true), tmrM(0x2A6A4A, null, { op: 0.7, side: 1, e: 0x1A4A3A, ei: 0.5 }));
col.position.y = 8.4;
g.add(col);
var spray = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 10), tmrGlow(0xD8F0E8, 0.2));
spray.position.y = 16.2;
g.add(spray);
g.userData.ldAnim = function (m, t) { col.scale.x = col.scale.z = 1 + 0.06 * Math.sin(t * 1.3); spray.scale.setScalar(1 + 0.08 * Math.sin(t * 0.8)); };
return true;
}, { r: 6.4, h: 1 });
P.fact(122, -160, 8, "The fountain", "look", ["The fountain", "Chapter 6: Joiwind", ["\"In the heart of the desert a fountain rose perpendicularly fifty feet into the air, with a cool and pleasant hissing sound.\" Its water \"did not return to the ground but was absorbed by the atmosphere at the summit.\""]]);
P.make(-160, 40, 0, 30, function (g) {
var wt = new THREE.Mesh(new THREE.CircleGeometry(28, 40), tmrM(0x6A3A8A, null, { e: 0x3A1A5A, ei: 0.45, op: 0.92 }));
wt.rotation.x = -Math.PI / 2;
wt.position.y = 0.12;
g.add(wt);
var rim = new THREE.Mesh(new THREE.RingGeometry(27.5, 30, 40), tmrM(0x8A3A2A, "earth"));
rim.rotation.x = -Math.PI / 2;
rim.position.y = 0.1;
g.add(rim);
});
P.fact(-136, 40, 6, "The heavy lake", "walk on it", ["The heavy lake", "Chapter 7: Panawe", ["\"Panawe walked onto the water; it was so heavy that it carried his weight.\" You can too: step on."]]);
var R = ldRand(1311);
for (var i = 0; i < (lite ? 14 : 34); i++) {
var a = R() * 6.283, d = 150 + R() * 110, x = Math.sin(a) * d, z = Math.cos(a) * d - 60, s = 0.9 + R() * 0.8;
if (Math.abs(x) < 10)
continue;
(function (s, k) { P.make(x, z, R() * 6, 2, function (g) { if (k % 3 === 0)
tmrPurple(g, s * 1.4, k);
else
tmrCrysTree(g, s); }, { r: 0.4 * s, h: 6 }); })(s, i);
}
for (i = 0; i < (lite ? 10 : 26); i++) {
var a2 = R() * 6.283, d2 = 30 + R() * 120, x2 = Math.sin(a2) * d2, z2 = Math.cos(a2) * d2 - 80, s2 = 0.8 + R() * 0.6;
if (Math.abs(x2) < 8 || Math.hypot(x2, z2 + 100) < 40)
continue;
(function (s, k) { P.make(x2, z2, R() * 6, 2, function (g) { tmrPurple(g, s, k + 100); }, { r: 0.3 * s, h: 4 }); })(s2, i);
}
var who = [["tm_walk1", 8, -180, "Ilna, walking north", "a woman of Poolingdred walking north toward the Lusion Plain and Ifdawn", "North is the Lusion Plain, and past it the mountains of Ifdawn, where the people are rough. Go gently."],
["tm_shrine", -112, -146, "Fara, at the shrine", "a woman of Poolingdred who prays at Shaping's shrine each morning", "Joiwind brought the giant here, the one who woke by the crystal ship. He did not pray. But he looked a long time at the leaves."],
["tm_lake", -140, 46, "Doray, by the heavy lake", "a boy of Poolingdred who walks out on the heavy lake for fun", "Come on, it holds you! It is like walking on a mattress. Don't jump."],
["tm_fount", 126, -158, "Bel, at the fountain", "an old man of Poolingdred who sits by the fountain that rises into the sky", "The water goes up. It has always gone up. Where it goes, I could not tell you; Panawe says it falls on another world."]];
who.forEach(function (w, k) { P.person(w[0], w[1], w[2], k * 1.3, { sex: k % 2 ? "m" : "f", child: w[0] === "tm_lake" ? 1 : 0, look: TMR_ROBE([0xC8E8C8, 0xE0D8F0, 0xB8E0D0, 0xD8E8C0][k]) }, ldWho(w[3], L, w[4], w[5]), { r: 6, sp: 0.35 }); });
P.strew("rock", 14, 30, 260, 1404, 0.8, 1.6);
},
function (P) {
var L = "Another World", lite = P.lite;
P.items = P.items.filter(function (it) { return !(it.t === "k" && /^(landinglights|saucer|teleportpad)$/.test(it.a)) && !(it.t === "s" && it.lines && it.lines[0] === "The Skyport"); });
P.person("tm_oasis", 120, 30, -1.2, { sex: "m", look: TMR_ROBE(0xD8E8C0, 0xD0B098) }, ldWho("Kael, keeper of Joiwind's oasis", L, "Kael, a man of Poolingdred who keeps the little oasis of purple-treed hills where Joiwind first brought Maskull, and walks its loop every day", "This is the oasis. Joiwind brought the giant here from the sand, and gave him an infusion of her own blood, so he could stand up in our world. Walk the loop with me?"), { r: 6, sp: 0.3 });
P.sign(108, 22, -0.9, ["Joiwind's oasis", "Press E to read"], ["Joiwind's oasis", "Chapter 6: Joiwind", ["\"The desert of scarlet sand stretched in all directions, except one, where there was a sort of little oasis--some low hills, clothed sparsely with little purple trees\": here Joiwind brought Maskull.", "Walk the Oasis Loop with Kael, its keeper."]], ["#2A0E14", "#F0D8C8"]);
var R = ldRand(1505);
for (var i = 0; i < (lite ? 8 : 18); i++) {
var a = R() * 6.283, d = 8 + R() * 30, x = 132 + Math.sin(a) * d, z = 42 + Math.cos(a) * d, s = 0.9 + R() * 0.7;
(function (s, k) { P.make(x, z, R() * 6, 2, function (g) { tmrPurple(g, s, k + 300); }, { r: 0.3 * s, h: 4 }); })(s, i);
}
}
];
});
