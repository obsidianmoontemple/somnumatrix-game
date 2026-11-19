/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var E8_Q = [];
function Q8(s) { E8_Q.push(s); return "<i>“" + s + "”</i>"; }
var E8_CH = [];
VBK_BOOKS.eighty = { k: "eighty", title: "Around the World in Eighty Days", icon: "🌍", store: "veighty", text: "data/verne-eighty/eighty.json", ch: E8_CH, away: 1,
by: "Jules Verne · Around the World in Eighty Days (1872), translated by George Makepeace Towle (1873), the whole book",
blurb: "London, the 2nd of October 1872: Mr Phileas Fogg of the Reform Club bets twenty thousand pounds that he can go round the world in eighty days, and leaves that night with his new French servant Passepartout, and a detective after him who is sure he is a bank robber. Suez, Bombay, an elephant through the forests of India and a rescue at dawn, Calcutta, Hong Kong, a pilot-boat in a typhoon, a circus in Yokohama, the Pacific, the Pacific Railroad and the Sioux, a sledge with sails over the snow, and a steamer burned to her hull to reach Liverpool. Every chapter, as Verne wrote it.",
begin: "No. 7, Saville Row, London (the Pall Mall book)" };
function e8A(adult, young) { return function () { return vlgAdult() ? adult : young; }; }
(function () {
if (typeof VBK_WEAR === "undefined")
return;
Object.assign(VBK_WEAR, {
cromarty: { cut: "jacket", coat: 0xA8261E, vest: 0xE8E0CC, trou: 0x2A2A34, tie: 0x1A1A1A, hat: "pith", hc: 0xEEE6D2 },
parsee: { cut: "long", coat: 0xF2EEE4, vest: 0xE8E0D0, trou: 0xF2EEE4, tie: null, hat: "headwrap", hc: 0xEDE6D4 },
mahout: { cut: "work", coat: null, vest: 0xE8DCC0, trou: 0xE8E0D0, tie: null, hat: "headwrap", hc: 0xC84A2A },
priest: { cut: "long", coat: 0xE89A3A, vest: 0xF0D8A0, trou: 0xE89A3A, tie: null, hat: null },
judge: { cut: "long", coat: 0x141418, vest: 0x2A2A30, trou: 0x1E1E24, tie: 0xF8F6F0, hat: null },
consul: { cut: "frock", coat: 0x2A2A34, vest: 0xE8E0CC, trou: 0x4A4A52, tie: 0x1A1A1A, hat: "tophat", hc: 0x141414 },
bunsby: { cut: "sailor", coat: 0x2A3A4A, vest: 0x8A7A5A, trou: 0x2A2A30, tie: null, hat: "cap", hc: 0x2A2A30 },
batulcar: { cut: "frock", coat: 0x6A1E2A, vest: 0xE8C048, trou: 0x2A2A30, tie: 0x1A1A1A, hat: "tophat", hc: 0x1A1A1A },
acrobat: { cut: "long", coat: 0x2A3A6A, vest: 0xC83A2A, trou: 0x2A3A6A, tie: null, hat: null },
japan: { cut: "long", coat: 0x3A4A5A, vest: 0x6A5A4A, trou: 0x3A3A40, tie: null, hat: null },
japanw: { cut: "lady", coat: 0x8A3A4A, hat: null },
chinese: { cut: "long", coat: 0x1E2A4A, vest: 0x3A4A6A, trou: 0x1E1E2A, tie: null, hat: "cap", hc: 0x141414 },
proctor: { cut: "long", coat: 0x5A4030, vest: 0x8A6A4A, trou: 0x3A3028, tie: 0x2A1A12, hat: "brim", hc: 0x3A2A1E },
soldier: { cut: "jacket", coat: 0x1E2A4A, vest: 0x1E2A4A, trou: 0x6A7A9A, tie: null, hat: "cap", hc: 0x1E2A4A },
mudge: { cut: "work", coat: null, vest: 0x6A4A2A, trou: 0x3A3A30, tie: 0x8A2A1E, hat: "cap", hc: 0x5A4A3A },
speedy: { cut: "sailor", coat: 0x1A2230, vest: 0x2A3040, trou: 0x1A2230, tie: 0x141414, hat: "naval", hc: 0x1A2230 },
elder: { cut: "frock", coat: 0x141414, vest: 0x2A2A2A, trou: 0x1A1A1A, tie: 0xF8F6F0, hat: "brim", hc: 0x141414 },
yankee: { cut: "jacket", coat: 0x4A3A2A, vest: 0x8A6A3A, trou: 0x3A3A40, tie: 0x6A1E1E, hat: "brim", hc: 0x4A3A2A },
hindoo: { cut: "work", coat: null, vest: 0xF0EADC, trou: 0xF0EADC, tie: null, hat: "headwrap", hc: 0xF0EADC },
hindoow: { cut: "sari", coat: 0xC83A5A, trim: 0xE8C048, hat: "veil", hc: 0xE8C048 }
});
VBK_ROLE.unshift([/Cromarty/, "cromarty"], [/^The Parsee|Parsee guide/, "parsee"], [/elephant's owner|mahout/i, "mahout"], [/^A Brahmin|priest of/i, "priest"], [/^Judge Obadiah/, "judge"], [/Oysterpuff/, "clerk"], [/^The consul/, "consul"], [/Bunsby/, "bunsby"], [/Batulcar/, "batulcar"], [/Long Nose|acrobat/i, "acrobat"], [/Proctor/, "proctor"], [/Fort Kearney|^The captain of the fort|soldier|sergeant/i, "soldier"], [/^Mudge/, "mudge"], [/Speedy/, "speedy"], [/^Elder William Hitch/, "elder"], [/conductor|engineer Forster|^The engineer/i, "clerk"], [/Camerfield|Mandiboy|San Francisco/, "yankee"]);
})();
Object.assign(VBK_TUNES, { e8danube: "assets/grimm/danube.mp3", e8nacht: "assets/grimm/nachtmusik.mp3", e8morning: "assets/neverland/morning-mood.mp3", e8largo: "assets/lost-world/largo.mp3",
e8gymno: "assets/erebos/gymnopedie.mp3", e8storm: "assets/oz/storm-at-sea.mp3", e8sailor: "assets/neverland/drunken-sailor.mp3", e8yankee: "assets/verne/yankee-doodle.mp3",
e8galop: "assets/erebos/galop.mp3", e8fortune: "assets/shakespeare-book/fortune.mp3", e8hebrides: "assets/verne/hebrides.mp3", e8toccata: "assets/verne/toccata.mp3", e8desert: "assets/oz/over-the-desert.mp3" });
var E8_FOGG = "You are Mr Phileas Fogg of No. 7, Saville Row and the Reform Club, from Jules Verne's Around the World in Eighty Days (the book only, never any film), on your journey round the world in 1872. About forty, tall, handsome, pale, calm, phlegmatic, exact to the second, polite and sparing of words; you never hurry and never explain yourself; underneath you are generous and brave. You speak in short, precise sentences. You play whist whenever you can. You have twenty thousand pounds wagered and as much again in banknotes in your carpet-bag.";
var E8_PASS = "You are Jean Passepartout, Mr Phileas Fogg's French manservant, from Jules Verne's Around the World in Eighty Days (the book only, never any film), on the journey round the world in 1872: a true Parisian, about thirty, round good-natured face, blue eyes; once a street singer, circus rider, gymnast and fireman. Warm, quick, talkative, loyal, often in trouble; you slip in a French word now and then (monsieur, parbleu, ma foi). Your great silver family watch keeps London time and you will never change it. You fret about the gas you left burning in your room in Saville Row.";
var E8_FIX = "You are Mr Fix, detective of the London police, from Jules Verne's Around the World in Eighty Days (the book only, never any film), 1872: small, slight, clever, nervous, with bright eyes and a frown. You are sure Phileas Fogg is the man who robbed the Bank of England of fifty-five thousand pounds, and you follow him round the world waiting for a warrant, pretending to be an agent of the Peninsular Company. You are not a bad man; you are doing your duty.";
var E8_AOUDA = "You are Aouda, a young Parsee lady of Bombay, educated in the English manner, from Jules Verne's Around the World in Eighty Days (the book only, never any film). Mr Fogg, Sir Francis Cromarty and Passepartout saved you from a terrible death in the forest of Bundelcund; you travel with them round the world. Gentle, brave, clever and deeply grateful; you speak English perfectly. You love Mr Fogg, and do not say so.";
var E8_CROM = "You are Sir Francis Cromarty, brigadier-general of the English army in India, from Jules Verne's Around the World in Eighty Days (the book only), 1872: tall, fair, about fifty, going to rejoin your corps at Benares; you have lived in India since you were a young man and know its peoples, its customs and its religions well, and speak of them with respect. You are a good partner at whist and you like Mr Fogg.";
var E8_GUIDE = "You are the young Parsee guide of the elephant Kiouni, from Jules Verne's Around the World in Eighty Days (the book only), 1872: intelligent, brave, devoted; you know the forests of Bundelcund and its peoples. You speak English, and are a Parsee, like the young widow the priests mean to sacrifice.";
var E8_PORT = { suez: 0.13, bombay: 0.22, kholby: 0.27, pillaji: 0.29, allahabad: 0.31, calcutta: 0.35, hongkong: 0.47, yokohama: 0.56, sanfran: 0.72, bow: 0.775, sioux: 0.80, kearney: 0.82, omaha: 0.86, newyork: 0.89, liverpool: 0.98 };
function e8U(u, s) { return u + (s || 0) / (VRN_RW.r * Math.PI * 2); }
function e8XZ(port, s, off) { var u = typeof port === "number" ? port : E8_PORT[port], p = vrnRwPt(e8U(u, s), off || 0); return { x: p.x, z: p.z, h: p.h }; }
function e8At(port, s, off) { var p = e8XZ(port, s, off); return { x: p.x, z: p.z }; }
function e8Dir(port, s, dir) { var p = e8XZ(port, s, 0), a = p.h, t = { e: [-Math.sin(a), Math.cos(a)], w: [Math.sin(a), -Math.cos(a)], out: [Math.cos(a), Math.sin(a)], "in": [-Math.cos(a), -Math.sin(a)] }[dir || "e"]; return t; }
function e8Yaw(port, s, dir) { var d = e8Dir(port, s, dir); return Math.atan2(-d[0], -d[1]); }
function e8Face(port, s, dir) { var d = e8Dir(port, s, dir); return Math.atan2(d[0], d[1]); }
function e8In(key, lx, lz) { return { room: key, lx: lx, lz: lz }; }
var E8 = { ports: {}, boats: {}, t: 0 };
function e8M(c, o) { return vrnC(c, o); }
function e8Y(p) { var h = vrnLand(p.x, p.z); return h > 0 ? Math.max(3, h) : 3; }
function e8Bld(grp, port, s, off, w, d, o) { var p = e8XZ(port, s, off), ry = e8Face(port, s, off < 0 ? "out" : "in"); var B = vrnBuilding(grp, p.x, p.z, w, d, Object.assign({ y: e8Y(p), ry: ry }, o || {})); return B && B.g ? B.g : B; }
function e8Grp(grp, port, s, off, dir, y) { var p = e8XZ(port, s, off), g = new THREE.Group(); g.position.set(p.x, y != null ? y : e8Y(p), p.z); g.rotation.y = e8Face(port, s, dir || "e"); grp.add(g); return g; }
function e8Spot(port, s, off, r, name, verb, fn) { var p = e8XZ(port, s, off); return vrnSpot(p.x, p.z, r, name, verb, fn, e8Y(p)); }
function e8Folk(grp, port, seed, n, looks, o) { return __ZC(481, 0, this, arguments, new.target); }
function e8Tree(grp, x, z, kind, R, s0) {
var tg = new THREE.Group(), sc = (s0 || 0.7) + R() * 0.5;
tg.position.set(x, e8Y({ x: x, z: z }), z);
tg.rotation.y = R() * 6.28;
tg.scale.setScalar(sc);
grp.add(tg);
vrnTreeKinds()[kind].forEach(function (part) { tg.add(new THREE.Mesh(part.g, part.m)); });
vrnSolid({ x: x, z: z, r: 0.6 * sc });
return tg;
}
function e8Palm(grp, x, z, y, R) {
y = Math.max(y, e8Y({ x: x, z: z }));
var tg = new THREE.Group(), sc = 0.6 + R() * 0.45;
tg.position.set(x, y, z);
tg.rotation.y = R() * 6.28;
tg.scale.setScalar(sc);
grp.add(tg);
vrnTreeKinds().palm.forEach(function (part) { tg.add(new THREE.Mesh(part.g, part.m)); });
vrnSolid({ x: x, z: z, r: 0.4 });
}
function e8Crates(grp, port, s, off, n, R) { return __ZC(481, 1, this, arguments, new.target); }
function e8Quay(grp, port, col) { return __ZC(481, 2, this, arguments, new.target); }
function e8Steamer(grp, port, s, off, o) {
o = o || {};
var g = e8Grp(grp, port, s, off, "e", E8_LOOK[port] && E8_LOOK[port].sea ? 2.1 : 0), m = vrnSteamerModel({ len: o.len || 56, beam: o.beam || 9 });
m.rotation.y = Math.PI / 2;
g.add(m);
if (o.name) {
var p = vrnSign([o.name], 8, 1.4, 0, 6, 0, Math.PI / 2, g);
}
return g;
}
var E8_TOWNS = {
suez: { name: "Suez", build: function (grp, R) { return __ZC(481, 3, this, arguments, new.target); } },
bombay: { name: "Bombay", build: function (grp, R) { return __ZC(481, 4, this, arguments, new.target); } },
kholby: { name: "Kholby", build: function (grp, R) { return __ZC(481, 5, this, arguments, new.target); } },
pillaji: { name: "The forest of Bundelcund", build: function (grp, R) { return __ZC(481, 6, this, arguments, new.target); } },
allahabad: { name: "Allahabad", build: function (grp, R) { return __ZC(481, 7, this, arguments, new.target); } },
calcutta: { name: "Calcutta", build: function (grp, R) { return __ZC(481, 8, this, arguments, new.target); } },
hongkong: { name: "Hong Kong", build: function (grp, R) { return __ZC(481, 9, this, arguments, new.target); } },
yokohama: { name: "Yokohama", build: function (grp, R) { return __ZC(481, 10, this, arguments, new.target); } },
sanfran: { name: "San Francisco", build: function (grp, R) { return __ZC(481, 11, this, arguments, new.target); } },
bow: { name: "Medicine Bow", build: function (grp, R) { return __ZC(481, 12, this, arguments, new.target); } },
sioux: { name: "The plains of Nebraska", build: function (grp, R) { return __ZC(481, 13, this, arguments, new.target); } },
kearney: { name: "Fort Kearney", build: function (grp, R) { return __ZC(481, 14, this, arguments, new.target); } },
omaha: { name: "Omaha", build: function (grp, R) { return __ZC(481, 15, this, arguments, new.target); } },
newyork: { name: "New York", build: function (grp, R) { return __ZC(481, 16, this, arguments, new.target); } },
liverpool: { name: "Liverpool", build: function (grp, R) { return __ZC(481, 17, this, arguments, new.target); } }
};
function e8TankaModel(g) { return __ZC(481, 18, this, arguments, new.target); }
function e8SledgeModel(g) { return __ZC(481, 19, this, arguments, new.target); }
function e8HenriModel(g) { return __ZC(481, 20, this, arguments, new.target); }
function e8PortBuild(k) { return __ZC(481, 21, this, arguments, new.target); }
function e8PortDrop(k) { return __ZC(481, 22, this, arguments, new.target); }
function e8PortsTick(L) { return __ZC(481, 23, this, arguments, new.target); }
var E8_LOOK = { suez: { g: "sand", t: 0xE0CC9A, sea: 1, tree: "palm", n: 14 }, bombay: { g: "earth", t: 0xC8A880, sea: 1, tree: "palm", n: 26 }, kholby: { g: "earth", t: 0xA88A60, tree: "jungle", n: 70, wild: 1 },
pillaji: { g: "grass", t: 0x7A8A50, tree: "jungle", n: 90, wild: 1 }, allahabad: { g: "earth", t: 0xB89A70, tree: "acacia", n: 30 }, calcutta: { g: "earth", t: 0xB8A07A, sea: 1, river: 1, tree: "palm", n: 22 },
hongkong: { g: "earth", t: 0xA89878, sea: 1, tree: "jungle", n: 24 }, yokohama: { g: "earth", t: 0xA89070, sea: 1, tree: "pine", n: 30 }, sanfran: { g: "sand", t: 0xC8B890, sea: 1, tree: "pine", n: 12 },
bow: { g: "snow", t: 0xE8ECEE, tree: "pine", n: 60, wild: 1 }, sioux: { g: "snow", t: 0xEEF0F2, tree: null, n: 0, wild: 1 }, kearney: { g: "snow", t: 0xEEF0F2, tree: "pine", n: 10, wild: 1 }, omaha: { g: "snow", t: 0xE8ECEE, tree: "pine", n: 12 },
newyork: { g: "concrete", t: 0x9A9894, sea: 1, tree: null, n: 0 }, liverpool: { g: "paving", t: 0x9A968E, sea: 1, tree: null, n: 0 } };
function e8Dress(grp, k, R) { return __ZC(481, 24, this, arguments, new.target); }
function e8Ceil(col) { return vrnC(col, { e: col, ei: 0.32 }); }
function e8UnionMat() { return __ZC(481, 25, this, arguments, new.target); }
function e8Out(key, port, s, off, msg) { var I = VRN_IN[key], p = e8XZ(port, s, off); if (I)
I.out = [p.x, p.z, e8Yaw(port, s, "in"), msg || null]; }
function e8OutAt(port, s, off, msg) { var p = e8XZ(port, s, off); return [p.x, p.z, e8Yaw(port, s, "in"), msg || null]; }
function e8DeckBuild(grp, I, o) { return __ZC(481, 26, this, arguments, new.target); }
vrnInDef("e8_deck", { name: "the steamer", hw: 200, hd: 200, arrive: [-10, 0, -Math.PI / 2], out: e8OutAt("suez", 10, -20, "Down the gangway onto the quay."),
say: "⚓ <b>The steamer.</b> An iron screw steamer of the line: two masts, a tall funnel, the saloon aft, the whole sea round her.",
build: function (grp, I) { e8DeckBuild(grp, I, { len: 96, beam: 12, name: "MONGOLIA", band: 0x1A1A1A }); } });
function e8Ship(name, port, s, off) { return __ZC(481, 27, this, arguments, new.target); }
vrnInDef("e8_consul", { name: "the British consulate, Suez", hw: 18, hd: 12, arrive: [0, 9, 0], out: e8OutAt("suez", 0, -60, "Out into the square, the sun white on the walls."),
say: "🏛️ <b>The British consulate, Suez.</b> A cool, high room with a slow fan: the consul's desk, his seal, the Queen's portrait, a window on the square.",
build: function (grp, I) { return __ZC(481, 28, this, arguments, new.target); } });
vrnInDef("e8_pagoda", { name: "the pagoda on Malabar Hill", hw: 20, hd: 16, arrive: [0, 12, 0], out: e8OutAt("bombay", -30, -112, "Down the steps of Malabar Hill, the city below."),
say: "🛕 <b>The pagoda on Malabar Hill.</b> Carved pillars, lamps, flowers; worshippers come barefoot, as the custom is. The priests keep the sanctuary.",
build: function (grp, I) { return __ZC(481, 29, this, arguments, new.target); } });
vrnInDef("e8_car", { name: "the railway carriage", hw: 30, hd: 12, arrive: [-8, 0, -Math.PI / 2], out: e8OutAt("bombay", 10, -58, "Down onto the platform."),
say: "🚂 <b>The railway carriage.</b> The long car of the express: seats either side of the aisle, the stove, the windows; the country rolling by.",
build: function (grp, I) { return __ZC(481, 30, this, arguments, new.target); } });
vrnInDef("e8_temple", { name: "the pagoda of Pillaji", hw: 22, hd: 16, arrive: [0, 12, 0], out: e8OutAt("pillaji", 10, -52, "Out under the trees: the glade, the torches, the dark."),
say: "🌙 <b>The pagoda of Pillaji, by night.</b> Torches guttering; the priests' guards at the doors; in an inner room, the young widow, drugged with the fumes of opium and hemp.",
build: function (grp, I) { return __ZC(481, 31, this, arguments, new.target); } });
vrnInDef("e8_court", { name: "the court-house, Calcutta", hw: 20, hd: 16, arrive: [0, 11, 0], out: e8OutAt("calcutta", 0, -60, "Out into the street: the heat, the crowd, the river."),
say: "⚖️ <b>The court-house, Calcutta.</b> A high whitewashed hall; the judge's bench under a big clock; the dock; Europeans and natives crowding the back.",
build: function (grp, I) { return __ZC(481, 32, this, arguments, new.target); } });
vrnInDef("e8_tavern", { name: "a tavern on the quay, Hong Kong", hw: 18, hd: 12, arrive: [0, 9, 0], out: e8OutAt("hongkong", -34, -38, "Out onto the quay: lanterns, the harbour, the night."),
say: "🏮 <b>A tavern on the quay.</b> A long room hung with lanterns; tables, benches, a counter of bottles; at the far end, a dim room behind a curtain, where men lie on couches.",
build: function (grp, I) { return __ZC(481, 33, this, arguments, new.target); } });
vrnInDef("e8_tanka", { name: "the Tankadere", hw: 200, hd: 200, arrive: [-4, 0, -Math.PI / 2], out: e8OutAt("hongkong", 40, -14, "Ashore, on the wharf of the pilot-boats."),
say: "⛵ <b>The Tankadere, pilot-boat No. 43.</b> Twenty tons, sharp as a racing yacht; two masts, a cloud of sail; John Bunsby and four men; one little cabin.",
build: function (grp, I) { return __ZC(481, 34, this, arguments, new.target); } });
vrnInDef("e8_circus", { name: "Batulcar's circus, Yokohama", hw: 24, hd: 20, arrive: [0, 16, 0], out: e8OutAt("yokohama", 30, -54, "Out into the street of the Japanese town."),
say: "🎪 <b>The Honourable William Batulcar's troupe.</b> Benches round a stage hung with paper lanterns; drums, flutes, a gong; jugglers, tumblers, a top spinning on a fan; and the Long Noses, under the patronage of the god Tingou.",
build: function (grp, I) { return __ZC(481, 35, this, arguments, new.target); } });
function e8Pyramid(n) { return __ZC(481, 36, this, arguments, new.target); }
vrnInDef("e8_henri", { name: "the Henrietta", hw: 200, hd: 200, arrive: [-8, 0, -Math.PI / 2], out: e8OutAt("newyork", 36, -12, "Down the gangway onto the pier."),
say: "⚓ <b>The Henrietta.</b> An iron-hulled trading steamer, wooden upper works, two masts, one tall funnel; Captain Andrew Speedy's own, bound for Bordeaux. Or so he thinks.",
build: function (grp, I) { return __ZC(481, 37, this, arguments, new.target); } });
vrnInDef("e8_custom", { name: "the Custom House, Liverpool", hw: 20, hd: 14, arrive: [0, 10, 0], out: e8OutAt("liverpool", 0, -62, "Out onto the quay, in the rain."),
say: "🏛️ <b>The Custom House, Liverpool.</b> A great hall of columns and a dome; clerks at their desks; at the back, a strong room with a barred window: the lock-up.",
build: function (grp, I) { return __ZC(481, 38, this, arguments, new.target); } });
function e8Canvas(key, w, h, draw) { return __ZC(481, 39, this, arguments, new.target); }
function e8TexMat(key, tex, o) { return __ZC(481, 40, this, arguments, new.target); }
function e8Grain(tint) { return __ZC(481, 41, this, arguments, new.target); }
function e8Tatami() { return __ZC(481, 42, this, arguments, new.target); }
function e8Checker() { return __ZC(481, 43, this, arguments, new.target); }
function e8Frieze(tint) { return __ZC(481, 44, this, arguments, new.target); }
function e8Jali() { return __ZC(481, 45, this, arguments, new.target); }
function e8Backdrop() { return __ZC(481, 46, this, arguments, new.target); }
function e8Arms() { return __ZC(481, 47, this, arguments, new.target); }
function e8Scroll(seed) { return __ZC(481, 48, this, arguments, new.target); }
function e8MapMat() { return __ZC(481, 49, this, arguments, new.target); }
function e8Portrait() { return __ZC(481, 50, this, arguments, new.target); }
function e8ShaftMat() { return __ZC(481, 51, this, arguments, new.target); }
function e8Strip(grp, x, y, z, L, hh, ry, mat, rep) {
var g = new THREE.PlaneGeometry(L, hh), uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setX(i, uv.getX(i) * L / (rep || hh * 4));
uv.needsUpdate = true;
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
m.rotation.y = ry || 0;
grp.add(m);
return m;
}
function e8Band(grp, X, Z, w, d, y, hh, th, mat, door, tex) { return __ZC(481, 52, this, arguments, new.target); }
function e8Wainscot(grp, X, Z, w, d, hh, mat, frame, door) { return __ZC(481, 53, this, arguments, new.target); }
function e8Window(grp, x, y, z, w, h, ry, o) { return __ZC(481, 54, this, arguments, new.target); }
function e8Beams(grp, X, Z, w, d, h, n, mat, along) {
var t = 0.36;
if (along) {
for (var i = 0; i < n; i++) {
var bz = Z - d / 2 + (i + 0.5) * d / n;
vrnBoxM(w - 0.3, t, 0.3, mat, X, h - t / 2, bz, grp);
}
}
else
for (var k = 0; k < n; k++) {
var bx = X - w / 2 + (k + 0.5) * w / n;
vrnBoxM(0.3, t, d - 0.3, mat, bx, h - t / 2, Z, grp);
}
}
function e8Hang(grp, x, y, z, ceil, kind, col) { return __ZC(481, 55, this, arguments, new.target); }
function e8Punkah(grp, I, x, y, z, len, ry) { return __ZC(481, 56, this, arguments, new.target); }
function e8Bench(grp, x, z, len, ry, mat, back, open) { return __ZC(481, 57, this, arguments, new.target); }
function e8Plant(grp, x, z, kind, hh, pot) { return __ZC(481, 58, this, arguments, new.target); }
function e8Pillar(grp, x, z, r, h, stn, gold) { return __ZC(481, 59, this, arguments, new.target); }
function e8LampStand(grp, x, z, hh, br) { return __ZC(481, 60, this, arguments, new.target); }
function e8Garland(grp, x0, y0, z0, x1, y1, z1, sag) {
var n = 12;
for (var i = 0; i <= n; i++) {
var t = i / n, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t, y = y0 + (y1 - y0) * t - Math.sin(t * Math.PI) * (sag || 0.8);
wSph(0.11, vrnC(i % 3 === 2 ? 0xF4F0E0 : i % 2 ? 0xF09A18 : 0xE87A10, { shine: 3 }), x, y, z, grp, 5);
}
}
function e8Incense(grp, x, y, z) { wCyl(0.08, 0.1, 0.18, vrnBrass(), x, y + 0.09, z, grp, 8); if (VRN.lite)
return; for (var k = 0; k < 3; k++) {
var s = wGlow(0xD8D4CC, 0.5 + k * 0.35, 0.14 - k * 0.03);
s.position.set(x + k * 0.08, y + 0.5 + k * 0.5, z);
grp.add(s);
} }
function e8Coffer(grp, X, Z, w, d, h, step, mat) { for (var x = -w / 2 + step; x < w / 2 - 0.1; x += step)
vrnBoxM(0.3, 0.5, d - 0.4, mat, X + x, h - 0.25, Z, grp); for (var z = -d / 2 + step; z < d / 2 - 0.1; z += step)
vrnBoxM(w - 0.4, 0.5, 0.3, mat, X, h - 0.25, Z + z, grp); }
function e8DressRoom(key, fn) { var I = VRN_IN[key]; if (!I)
return; var b0 = I.build; I.build = function (grp, J) { b0.apply(this, arguments); try {
fn(grp, J, J.x, J.z);
}
catch (e) {
if (window.console)
console.warn("[e8] dress " + key, e);
} }; }
e8DressRoom("e8_consul", function (grp, I, X, Z) {
var oak = e8Grain(0x6A4428), dark = e8Grain(0x3E2616);
e8Wainscot(grp, X, Z, 30, 20, 1.2, oak, dark, 2.4);
e8Band(grp, X, Z, 30, 20, 4.82, 0.28, 0.18, vrnC(0xF4EEE2, { shine: 10 }), 2.4);
e8Beams(grp, X, Z, 30, 20, 5, 5, dark, false);
[-9, 9].forEach(function (wx) { e8Window(grp, X + wx, 2.8, Z + 9.84, 2.4, 2.8, Math.PI, { shut: 0x2E5A3A, shaftL: 7, sky: 0xFFF6E4 }); });
[6].forEach(function (wz) { e8Window(grp, X - 14.84, 2.8, Z + wz, 2, 2.6, Math.PI / 2, { cur: 0x6A2A22, shaftL: 6, sky: 0xFFF6E4 }); e8Window(grp, X + 14.84, 2.8, Z + wz, 2, 2.6, -Math.PI / 2, { cur: 0x6A2A22, shaftL: 6, sky: 0xFFF6E4 }); });
var gilt = vrnC(0xC8A040, { shine: 60, spec: 0x5a4a20 });
vrnBoxM(1.9, 2.3, 0.08, gilt, X, 3, Z - 9.88, grp);
var po = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.9), e8Portrait());
po.position.set(X, 3, Z - 9.8);
grp.add(po);
var mp = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.95), e8MapMat());
mp.position.set(X - 5, 2.9, Z - 9.82);
grp.add(mp);
vrnBoxM(2.8, 2.15, 0.05, dark, X - 5, 2.9, Z - 9.86, grp);
wCyl(0.05, 0.12, 0.4, vrnBrass(), X - 1.4, 1.06, Z - 5.4, grp, 8);
var sh = wCyl(0.12, 0.26, 0.2, vrnC(0x1E5A3A, { e: 0x0A2A1A, ei: 0.4, shine: 40 }), X - 1.4, 1.32, Z - 5.4, grp, 12);
var lg = wGlow(0xFFE8B0, 1.2, 0.5);
lg.position.set(X - 1.4, 1.15, Z - 5.4);
grp.add(lg);
vrnBoxM(1, 0.02, 0.6, vrnC(0x2A4A2A), X + 0.3, 0.87, Z - 5.1, grp);
for (var p = 0; p < 6; p++) {
var pp = wBox(0.22, 0.01, 0.3, vrnC(0xF4EEDC), X + 1.2 + (p % 3) * 0.05, 0.87 + p * 0.012, Z - 5.5, grp);
pp.rotation.y = p * 0.2;
}
vrnTable(grp, X + 9, Z - 6, 2.4, 1.1, 0, 0x4A2A16);
vrnChair(grp, X + 9, Z - 7, 0, 0x5A2A1A);
vrnBoxM(1.2, 0.3, 0.9, dark, X + 9, 1.0, Z - 6.3, grp);
vrnFolk(grp, 1490, X + 9, Z - 7.1, { still: 1, look: { _vb: "clerk", sex: "m" } });
var hs = new THREE.Group();
hs.position.set(X - 12, 0, Z + 8);
grp.add(hs);
wCyl(0.04, 0.06, 1.9, dark, 0, 0.95, 0, hs, 6);
for (var a = 0; a < 4; a++) {
var hk = wBox(0.3, 0.03, 0.03, dark, Math.cos(a * 1.57) * 0.15, 1.8, Math.sin(a * 1.57) * 0.15, hs);
hk.rotation.y = -a * 1.57;
}
wCyl(0.2, 0.2, 0.04, dark, 0, 0.02, 0, hs, 8);
wCyl(0.12, 0.14, 0.14, vrnC(0x1A1A1A), 0.18, 1.9, 0, hs, 10);
e8Bench(grp, X + 8, Z + 8.6, 4, Math.PI, oak, true);
e8Plant(grp, X - 13.4, Z - 8.4, "palm", 2.6);
e8Plant(grp, X + 13.4, Z - 8.4, "palm", 2.6);
e8Plant(grp, X + 13.4, Z + 8.4, "fern", 1.4);
vrnBoxM(1.6, 1.6, 0.6, dark, X - 9, 0.8, Z - 9.5, grp);
for (var d = 0; d < 4; d++)
vrnBoxM(1.5, 0.02, 0.02, gilt, X - 9, 0.3 + d * 0.38, Z - 9.18, grp);
e8Hang(grp, X - 6, 3.6, Z + 2, 5, "oil");
e8Hang(grp, X + 6, 3.6, Z + 2, 5, "oil");
if (I.fan)
(I.spin = I.spin || []).push(I.fan);
});
function e8TempleDress(grp, I, X, Z, w, d, h, cols, r, stn, gold, night, door, lz) { return __ZC(481, 61, this, arguments, new.target); }
e8DressRoom("e8_pagoda", function (grp, I, X, Z) {
var stn = vrnSurf("stone", 0xD8C8A8, 2), gold = vrnC(0xD8A830, { shine: 60, spec: 0x6a5020 }), cols = [];
for (var c = -2; c <= 2; c++)
cols.push([c * 6, -6]);
for (var c3 = -2; c3 <= 2; c3++)
cols.push([c3 * 6, 6]);
e8TempleDress(grp, I, X, Z, 34, 28, 8, cols, 0.65, stn, gold, false, 3, -9);
for (var f = 0; f < 5; f++)
vrnFolk(grp, 1520 + f, X - 6 + f * 3, Z - 4 + (f % 2) * 1.6, { still: 1, look: { _vb: f % 2 ? "hindoow" : "hindoo", sex: f % 2 ? "f" : "m" } });
for (var p = 0; p < 5; p++) {
wCyl(0.3, 0.26, 0.04, gold, X - 4 + p * 2, 0.02, Z - 9.8, grp, 14);
for (var q = 0; q < 5; q++)
wSph(0.07, vrnC([0xF09A18, 0xF4F0E0, 0xE84A2A][q % 3]), X - 4 + p * 2 + (q - 2) * 0.08, 0.08, Z - 9.8 + (q % 2) * 0.08, grp, 5);
}
});
e8DressRoom("e8_temple", function (grp, I, X, Z) {
var stn = vrnSurf("stone", 0x8A7A64, 2), gold = vrnC(0xA88A40, { shine: 40 }), cols = [];
for (var c = -2; c <= 2; c++)
cols.push([c * 6.4, -7]);
for (var c3 = -2; c3 <= 2; c3++)
cols.push([c3 * 6.4, 7]);
e8TempleDress(grp, I, X, Z, 36, 28, 9, cols, 0.75, stn, gold, true, 3, -4.4);
for (var t = 0; t < 6; t++) {
var tx = X - 15 + t * 6, tz = Z + (t % 2 ? -13.6 : 13.6);
wCyl(0.05, 0.07, 0.9, vrnMetal(0x2A2622), tx, 3.3, tz, grp, 6);
var fl = wSph(0.18, vrnC(0xFF9A30, { e: 0xFF7A10, ei: 1 }), tx, 3.9, tz, grp, 6);
fl.scale.y = 1.8;
}
[-1, 1].forEach(function (s, i) { vrnFolk(grp, 1560 + i, X + s * 3.2, Z + 12, { still: 1, look: { _vb: "hindoo", sex: "m" } }); });
});
e8DressRoom("e8_court", function (grp, I, X, Z) {
var teak = e8Grain(0x5A3418), dark = e8Grain(0x3A2010);
e8Wainscot(grp, X, Z, 34, 28, 1.5, teak, dark, 3);
e8Band(grp, X, Z, 34, 28, 7.8, 0.4, 0.2, vrnC(0xF4F0E4, { shine: 10 }), 3);
e8Beams(grp, X, Z, 34, 28, 8, 6, dark, false);
[-1, 1].forEach(function (w) { for (var k = 0; k < 3; k++)
e8Window(grp, X + w * 16.84, 3.8, Z - 8 + k * 8, 2, 3.6, -w * Math.PI / 2, { shut: 0x2E5A3A, arch: 1, shaftL: 8, sky: 0xFFF4DC }); });
vrnBoxM(14, 0.5, 5, teak, X, 0.25, Z - 11.4, grp);
vrnFloor(X, Z - 11.4, 7, 2.5, 0.5, { inside: 1 });
for (var p = -2; p <= 2; p++)
vrnBoxM(1.6, 0.9, 0.04, dark, X + p * 2, 0.75, Z - 8.56, grp);
vrnBoxM(4, 3.2, 0.3, dark, X, 2.1, Z - 13.6, grp);
var ar = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), e8Arms());
ar.position.set(X, 3.9, Z - 13.42);
grp.add(ar);
vrnBoxM(22, 0.1, 0.14, teak, X, 1.0, Z + 0.6, grp);
for (var b = -10.8; b <= 10.8; b += 0.45) {
if (Math.abs(b) < 0.8)
continue;
wCyl(0.035, 0.05, 0.9, teak, X + b, 0.5, Z + 0.6, grp, 6);
}
for (var k2 = 0; k2 < 3; k2++)
e8Punkah(grp, I, X - 8 + k2 * 8, 6.6, Z + 1 + ((k2 % 2) * -6), 7, 0);
e8Hang(grp, X - 10, 5.4, Z - 4, 8, "oil");
e8Hang(grp, X + 10, 5.4, Z - 4, 8, "oil");
for (var q = 0; q < 5; q++) {
var pp = wBox(0.3, 0.01, 0.4, vrnC(0xF4EEDC), X - 9.6 + q * 0.3, 1.02 + q * 0.01, Z - 4.2, grp);
pp.rotation.y = q * 0.3;
}
vrnBoxM(0.5, 0.12, 0.36, vrnC(0x5A1E1E), X - 8.4, 1.06, Z - 4, grp);
wCyl(0.05, 0.06, 0.08, vrnC(0x101010), X + 0.8, 1.42, Z - 10.4, grp, 8);
e8Plant(grp, X - 15.6, Z - 12.6, "palm", 2.8);
e8Plant(grp, X + 15.6, Z - 12.6, "palm", 2.8);
vrnFolk(grp, 1508, X + 15.2, Z + 12.4, { still: 1, look: { _vb: "hindoo", sex: "m" } });
});
e8DressRoom("e8_tavern", function (grp, I, X, Z) {
var tk = e8Grain(0x4A2A16), dk = e8Grain(0x2A1A10);
e8Beams(grp, X, Z, 30, 18, 4.6, 7, dk, false);
for (var p = -12; p <= 12; p += 6)
[-1, 1].forEach(function (s) { if (!p && s > 0)
return; vrnBoxM(0.3, 4.6, 0.3, dk, X + p, 2.3, Z + s * 8.7, grp); });
e8Band(grp, X, Z, 30, 18, 0.5, 1.0, 0.06, dk, 2.4);
var mw = new THREE.Mesh(new THREE.CircleGeometry(1.2, 28), vrnC(0x1A2A40, { e: 0x0A1A30, ei: 0.8 }));
mw.position.set(X - 12, 2.4, Z - 8.82);
grp.add(mw);
var rg = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.1, 6, 28), dk);
rg.position.set(X - 12, 2.4, Z - 8.78);
grp.add(rg);
for (var l = 0; l < 5; l++) {
var sl = wSph(0.05, vrnC(0xFFD080, { e: 0xFFC060, ei: 1 }), X - 12.7 + l * 0.34, 2.1 + (l % 2) * 0.2, Z - 8.78, grp, 4);
}
for (var s2 = 0; s2 < 3; s2++) {
vrnBoxM(9, 0.06, 0.5, tk, X - 6, 1.4 + s2 * 0.7, Z - 8.6, grp);
for (var j = 0; j < 11; j++) {
var jc = [0x6A4A2A, 0x2A5A2A, 0xC8B890, 0x8A3A2A, 0x3A3A5A][(j + s2) % 5];
if (j % 3 === 0)
wSph(0.2, vrnC(jc, { shine: 40 }), X - 10.2 + j * 0.8, 1.62 + s2 * 0.7, Z - 8.6, grp, 8);
else
wCyl(0.08, 0.1, 0.42, vrnC(jc, { shine: 60, op: 0.9 }), X - 10.2 + j * 0.8, 1.64 + s2 * 0.7, Z - 8.6, grp, 8);
}
}
for (var b = 0; b < 4; b++) {
wCyl(0.42, 0.46, 1, tk, X + 12.6, 0.5 + (b > 2 ? 1 : 0), Z + 6 - b * 1.1 + (b > 2 ? 1.1 : 0), grp, 12);
}
wCyl(0.45, 0.3, 0.9, vrnC(0x5A6A5A, { shine: 30 }), X - 13.6, 0.45, Z + 7.2, grp, 12);
for (var sc = 0; sc < 4; sc++) {
var sm = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 2), e8Scroll(41 + sc));
sm.position.set(X - 6 + sc * 4, 2.6, Z + 8.82);
sm.rotation.y = Math.PI;
grp.add(sm);
}
for (var q = 0; q < 7; q++)
e8Hang(grp, X - 10 + q * 1.4, 3.6, Z - 3.4, 4.6, "paper", q % 2 ? 0xE84A2A : 0xF0E0C0);
vrnRug(grp, X + 8, Z - 7, 6, 3, 0x5A1E1E, 0.01);
});
e8DressRoom("e8_circus", function (grp, I, X, Z) {
var tk = e8Grain(0x5A3A22), dk = e8Grain(0x2E1E14), plaster = vrnSurf("plaster", 0xF2ECDE, 2);
for (var p = -18; p <= 18; p += 4.5) {
vrnBoxM(0.4, 12, 0.4, dk, X + p, 6, Z - 17.8, grp);
if (Math.abs(p) > 2)
vrnBoxM(0.4, 12, 0.4, dk, X + p, 6, Z + 17.8, grp);
}
for (var q = -15; q <= 15; q += 5) {
vrnBoxM(0.4, 12, 0.4, dk, X - 20.8, 6, Z + q, grp);
vrnBoxM(0.4, 12, 0.4, dk, X + 20.8, 6, Z + q, grp);
}
[3.6, 7.6, 11.6].forEach(function (y) { e8Band(grp, X, Z, 42, 36, y, 0.3, 0.3, dk, 3); });
e8Beams(grp, X, Z, 42, 36, 12, 8, dk, false);
e8Beams(grp, X, Z, 42, 36, 11.6, 3, dk, true);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(41.4, 35.4), e8Tatami());
fl.rotation.x = -Math.PI / 2;
fl.position.set(X, 0.012, Z);
var uv = fl.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 41.4 / 3.6, uv.getY(i) * 35.4 / 3.6);
grp.add(fl);
vrnBoxM(20.2, 1.1, 0.1, vrnC(0x7A1E1A, { shine: 20 }), X, 0.6, Z - 3.96, grp);
for (var k = 0; k < 10; k++)
vrnBoxM(1.6, 0.8, 0.04, vrnC(k % 2 ? 0xE8C048 : 0x1E1A14), X - 9 + k * 2, 0.6, Z - 3.9, grp);
var bd = new THREE.Mesh(new THREE.PlaneGeometry(19, 8.6), e8Backdrop());
bd.position.set(X, 5.6, Z - 15.9);
grp.add(bd);
vrnBoxM(19.6, 0.4, 0.3, dk, X, 9.9, Z - 15.9, grp);
[-1, 1].forEach(function (s) {
for (var c = 0; c < 6; c++)
wCyl(0.16, 0.2, 9.4, vrnC(c % 2 ? 0xF2ECDE : 0xB8202A, { shine: 5 }), X + s * (10.4 + c * 0.26), 5.9, Z - 4.4 - c * 0.15, grp, 8);
vrnBoxM(0.6, 10.4, 0.6, dk, X + s * 10.1, 5.2, Z - 4.2, grp);
});
vrnBoxM(21.4, 1.2, 0.5, vrnC(0xB8202A, { shine: 5 }), X, 10.2, Z - 4.2, grp);
for (var m = 0; m < 7; m++) {
var mon = wCyl(0.42, 0.42, 0.06, vrnC(0xF2ECDE), X - 9 + m * 3, 10.2, Z - 3.92, grp, 16);
mon.rotation.x = Math.PI / 2;
}
[[-7, -13], [-5.6, -13.4]].forEach(function (t) { var dr = wCyl(0.6, 0.6, 0.9, vrnC(0x7A3A1E, { shine: 20 }), X + t[0], 1.65, Z + t[1], grp, 14); dr.rotation.x = Math.PI / 2; wCyl(0.62, 0.62, 0.04, vrnC(0xE8DCC0), X + t[0], 1.65, Z + t[1] + 0.46, grp, 14).rotation.x = Math.PI / 2; });
for (var b = 0; b < 6; b++) {
var s2 = b < 3 ? -1 : 1, bz = Z - 8 + (b % 3) * 7;
var bn = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 5), vrnC([0x1E3A6A, 0xB8202A, 0xE8C048][b % 3], { ds: true, shine: 4 }));
bn.position.set(X + s2 * 20.6, 7, bz);
bn.rotation.y = -s2 * Math.PI / 2;
grp.add(bn);
vrnBoxM(0.1, 0.1, 1.8, dk, X + s2 * 20.5, 9.6, bz, grp);
}
for (var r = 0; r < 3; r++) {
var rz = Z - 12 + r * 8;
for (var n = 0; n < 9; n++) {
var nx = X - 16 + n * 4, sag = Math.sin(n / 8 * Math.PI) * 1.2;
e8Hang(grp, nx, 9.4 - sag, rz, 9.6, "paper", n % 2 ? 0xE84A2A : 0xF0E2C0);
}
}
for (var t = 0; t < 5; t++) {
vrnBoxM(30, 0.06, 1.6, tk, X, 0.5 + t * 0.5 - 0.03, Z + 2.4 + t * 2.6, grp);
e8Bench(grp, X, Z + 2 + t * 2.6, 30, 0, e8Grain(0x8A6A48), false, true).position.y = t * 0.5;
}
[-1, 1].forEach(function (s) {
vrnBoxM(4, 0.2, 24, tk, X + s * 18.8, 4.4, Z + 3, grp);
vrnBoxM(0.08, 0.9, 24, dk, X + s * 16.8, 5, Z + 3, grp);
for (var g = -11; g <= 11; g += 1.2)
vrnBoxM(0.06, 0.9, 0.06, dk, X + s * 16.8, 4.9, Z + 3 + g, grp);
for (var u = -10; u <= 10; u += 5)
vrnBoxM(0.3, 4.4, 0.3, dk, X + s * 16.9, 2.2, Z + 3 + u, grp);
for (var f = 0; f < 4; f++)
vrnFolk(grp, 1740 + f + (s > 0 ? 10 : 0), X + s * 19, Z - 6 + f * 5, { still: 1, y: 4.5, look: { _vb: f % 2 ? "japanw" : "japan", sex: f % 2 ? "f" : "m" } });
});
[[-6.2, -12.4, "japan"], [-3, -8, "japan"], [4, -7.6, "japanw"], [7, -11, "japan"]].forEach(function (a, i) { vrnFolk(grp, 1760 + i, X + a[0], Z + a[1], { still: 1, y: 1.2, look: { _vb: a[2], sex: a[2] === "japanw" ? "f" : "m" } }); });
});
e8DressRoom("e8_henri", function (grp, I, X, Z) {
var tar = vrnC(0x2A2420), white = vrnC(0xEDE8DC, { shine: 20 }), wood = e8Grain(0x8A6A44), masts = I.parts && I.parts[2];
if (masts)
[-16, 16].forEach(function (mx) {
[-1, 1].forEach(function (s) {
for (var k = -1; k <= 1; k++) {
var a = new THREE.Vector3(X + mx, 14.5, Z), b = new THREE.Vector3(X + mx + k * 1.2, 1, Z + s * 4.4), L = a.distanceTo(b), m = wCyl(0.025, 0.025, L, tar, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2, masts, 3);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
}
for (var y = 2; y < 13; y += 0.9) {
var t = (14.5 - y) / 13.5;
vrnBoxM(2.4 * t, 0.02, 0.02, tar, X + mx, y, Z + s * 4.4 * t, masts);
}
});
});
[[-6, 2.6], [10, -2.6], [18, 2.4]].forEach(function (v) { wCyl(0.25, 0.25, 1.6, white, X + v[0], 0.8, Z + v[1], grp, 10); var m = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.14, 6, 12), white); m.position.set(X + v[0], 1.7, Z + v[1]); m.rotation.y = v[0]; grp.add(m); wCyl(0.38, 0.3, 0.4, vrnC(0xB8302A), X + v[0], 1.8, Z + v[1] + 0.1, grp, 10).rotation.x = 0.7; vrnSolid({ x: X + v[0], z: Z + v[1], r: 0.4 }); });
[[-10, 4.5], [0, -4.5], [20, 4.5], [-24, -4.5]].forEach(function (b) { var lb = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.1, 8, 18), vrnC(0xE8E2D4)); lb.position.set(X + b[0], 1.1, Z + b[1] * 0.98); grp.add(lb); for (var q = 0; q < 4; q++) {
var bd = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.105, 8, 3, 0.4), vrnC(0xC8302A));
bd.position.copy(lb.position);
bd.rotation.z = q * 1.57;
grp.add(bd);
} });
[[-2, 3], [14, -3], [24, 2.5]].forEach(function (c) { for (var r = 0; r < 4; r++) {
var cl = new THREE.Mesh(new THREE.TorusGeometry(0.42 - r * 0.08, 0.05, 5, 16), vrnC(0xA88A5A));
cl.rotation.x = Math.PI / 2;
cl.position.set(X + c[0], 0.05 + r * 0.06, Z + c[1]);
grp.add(cl);
} });
for (var k = 0; k < 4; k++) {
wCyl(0.36, 0.4, 0.9, wood, X + 22 + (k % 2) * 0.8, 0.45, Z - 2.6 + (k > 1 ? 0.8 : 0), grp, 10);
}
vrnSolid({ x: X + 22.4, z: Z - 2.2, r: 0.9 });
[-1, 1].forEach(function (s) {
var bt = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), white);
bt.scale.set(2.6, 0.7, 0.8);
bt.position.set(X - 8, 2.6, Z + s * 5.7);
grp.add(bt);
wBox(5, 0.05, 1.4, vrnC(0x8A8274), X - 8, 2.62, Z + s * 5.7, grp);
[-10.2, -5.8].forEach(function (dx) { wCyl(0.07, 0.09, 3.6, vrnMetal(0x2A2A2E), X + dx, 1.8, Z + s * 4.35, grp, 6); var arm = wCyl(0.06, 0.06, 1.5, vrnMetal(0x2A2A2E), X + dx, 3.55, Z + s * 5.05, grp, 6); arm.rotation.x = Math.PI / 2; wCyl(0.012, 0.012, 0.95, tar, X + dx, 3.1, Z + s * 5.7, grp, 3); });
});
[[5, 2.2, "sailor"], [7.2, -1.8, "sailor"], [-25.4, -1.4, "sailor"]].forEach(function (a, i) { vrnFolk(grp, 1820 + i, X + a[0], Z + a[1], { still: 1, look: { _vb: a[2], sex: "m" } }); });
});
e8DressRoom("e8_custom", function (grp, I, X, Z) {
var marble = vrnSurf("marble", 0xE4DCCC, 2), dark = e8Grain(0x3E2616), mah = e8Grain(0x5A2A18), br = vrnBrass(), plaster = vrnC(0xEEE8DA, { shine: 10 });
var fl = new THREE.Mesh(new THREE.PlaneGeometry(35.6, 23.6), e8Checker());
fl.rotation.x = -Math.PI / 2;
fl.position.set(X, 0.012, Z);
var uv = fl.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 35.6 / 2.4, uv.getY(i) * 23.6 / 2.4);
grp.add(fl);
e8Coffer(grp, X, Z, 36, 24, 10, 3, plaster);
e8Band(grp, X, Z, 36, 24, 9.5, 1, 0.4, plaster, 3);
e8Band(grp, X, Z, 36, 24, 0.3, 0.6, 0.12, vrnSurf("marble", 0x7A7468, 2), 3);
var sk = new THREE.Mesh(new THREE.CircleGeometry(4, 32), vrnC(0xC8D4DC, { e: 0xB0C0CC, ei: 0.8 }));
sk.rotation.x = Math.PI / 2;
sk.position.set(X, 9.98, Z);
grp.add(sk);
var rr = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.2, 6, 32), plaster);
rr.rotation.x = Math.PI / 2;
rr.position.set(X, 9.9, Z);
grp.add(rr);
for (var g = 0; g < 8; g++) {
var gb = wBox(8, 0.08, 0.08, plaster, X, 9.95, Z, grp);
gb.rotation.y = g * Math.PI / 8;
}
for (var c = -2; c <= 2; c++)
[-1, 1].forEach(function (s) {
var cx = X + c * 7, cz = Z + s * 4;
vrnBoxM(1.6, 0.4, 1.6, marble, cx, 0.2, cz, grp);
wCyl(0.8, 0.85, 0.3, marble, cx, 0.55, cz, grp, 16);
wCyl(0.75, 0.62, 0.4, marble, cx, 9.3, cz, grp, 16);
vrnBoxM(1.7, 0.25, 1.7, marble, cx, 9.6, cz, grp);
[-1, 1].forEach(function (v) { var vo = wCyl(0.22, 0.22, 1.5, marble, cx + v * 0.72, 9.2, cz, grp, 10); vo.rotation.x = Math.PI / 2; });
});
[-1, 1].forEach(function (w) { for (var k = 0; k < 2; k++)
e8Window(grp, X + w * 17.84, 4.4, Z - 5 + k * 10, 2.4, 4.4, -w * Math.PI / 2, { arch: 1, ny: 4, sky: 0xB8C4CC, ei: 0.75, shaftL: 7 }); });
[-10, 10].forEach(function (wx) { e8Window(grp, X + wx, 4.4, Z + 11.84, 2.4, 4.4, Math.PI, { arch: 1, ny: 4, sky: 0xB8C4CC, ei: 0.75, shaftL: 7 }); });
vrnBoxM(1.2, 1.2, 16, mah, X + 16.2, 0.6, Z, grp);
vrnBoxM(1.5, 0.08, 16.2, mah, X + 16.1, 1.24, Z, grp);
vrnSolid({ x: X + 16.2, z: Z, hw: 0.75, hd: 8 });
for (var q = -7.6; q <= 7.6; q += 0.25)
wCyl(0.012, 0.012, 1, br, X + 15.7, 1.78, Z + q, grp, 4);
for (var h = 0; h < 3; h++)
vrnBoxM(0.04, 0.04, 16, br, X + 15.7, 1.3 + h * 0.47, Z, grp);
for (var f = 0; f < 3; f++)
vrnFolk(grp, 1810 + f, X + 17.1, Z - 5 + f * 5, { still: 1, look: { _vb: "clerk", sex: "m" } });
e8Hang(grp, X - 10.5, 6.4, Z, 10, "chand");
e8Hang(grp, X + 10.5, 6.4, Z, 10, "chand");
for (var n = 0; n < 3; n++) {
vrnBoxM(1.8, 1.2, 0.06, dark, X - 15 + n * 2.4, 2.4, Z - 11.82, grp);
for (var p = 0; p < 4; p++)
wBox(0.4, 0.5, 0.01, vrnC(0xF0E8D4), X - 15.5 + n * 2.4 + (p % 2) * 0.6, 2.5 - (p > 1 ? 0.4 : 0) + 0.1, Z - 11.78, grp);
}
e8Bench(grp, X - 16.6, Z, 4, Math.PI / 2, mah, true);
e8Bench(grp, X - 16.6, Z + 8.4, 4, Math.PI / 2, mah, true);
});
function e8RoomTick(dt) {
var I = VRN.insideOf;
if (!I)
return;
var t = performance.now() / 1000;
if (I.sway)
I.sway.forEach(function (g) { g.rotation.x = Math.sin(t * 1.4 + g.userData.ph) * 0.32; });
if (I.spin)
I.spin.forEach(function (g) { g.rotation.y += dt * 1.6; });
}
function e8ElephantModel() { return __ZC(481, 62, this, arguments, new.target); }
function e8Boat(kind) { return __ZC(481, 63, this, arguments, new.target); }
function e8BoatsAway() { for (var k in E8.boats) {
var b = E8.boats[k];
if (b && b.parent)
b.parent.remove(b);
} }
var E8_RIDE = { steamer: { up: 16, behind: -48, sp: 46, y: 0 }, grant: { up: 18, behind: -54, sp: 52, y: 0 }, henri: { up: 14, behind: -44, sp: 40, y: 0 }, tanka: { up: 5, behind: -16, sp: 30, y: 0 },
train: { up: 5.4, behind: -16, sp: 52, y: 3 }, elephant: { up: 6, behind: -11, sp: 16, y: 3 }, sledge: { up: 3.6, behind: -11, sp: 42, y: 3 } };
function e8Line(u0, u1, y, says, off) { return __ZC(481, 64, this, arguments, new.target); }
function e8Ride(h, kind, u0, u1, msg, says, to, o) {
o = o || {};
var R = E8_RIDE[kind] || E8_RIDE.steamer;
return vSailStep(h, null, msg, Object.assign({ stay: 1, on: function (f) {
f.sailed = 0;
setTimeout(function () {
if (f.sailed)
return;
var boat = e8Boat(kind);
var pts = e8Line(u0 + (o.pad0 != null ? o.pad0 : 0.005), u1 - (o.pad1 != null ? o.pad1 : 0.005), R.y, says || [], o.off);
vlgSail(pts, { msg: msg, boat: boat, sink: 0, turn: Math.PI, up: R.up, behind: R.behind, sp: R.sp }, function () { e8BoatsAway(); if (!to) {
f.sailed = 1;
return;
} to(function () { f.sailed = 1; }); });
}, 500);
} }, o.step || {}));
}
function e8Land(port, s, off, msg, dir) { return function (next) { var p = e8XZ(port, s, off); vrnMove(p.x, p.z, e8Yaw(port, s, dir || "in"), msg || null, null, { fn: function () { setTimeout(next, 300); } }); }; }
function e8Into(key, lx, lz, yawTo, msg, ly) { return function (next) { var I = VRN_IN[key]; vrnInBuild(I); var A = I.arrive; vrnMove(I.x + (lx != null ? lx : A[0]), I.z + (lz != null ? lz : A[1]), yawTo != null ? yawTo : A[2], msg || I.say, ly || 0, { fn: function () { setTimeout(next, 300); } }); }; }
function e8Carry(h, act, o) {
return Object.assign({ k: "until", h: h, at: null, on: function (f) { f.carried = 0; setTimeout(function () { try {
act(function () { f.carried = 1; });
}
catch (e) {
if (window.console)
console.warn("[e8] carry", e);
f.carried = 1;
} }, 400); },
test: function (f) { return !!f.carried; }, sim: function () { vbkS().f.carried = 1; } }, o || {});
}
var E8_LEDGER = [["London", "Wednesday, October 2nd, at 8.45 p.m."], ["Paris", "Thursday, October 3rd, at 7.20 a.m."], ["Turin, by Mont Cenis", "Friday, October 4th, at 6.35 a.m."], ["Brindisi", "Saturday, October 5th, at 4 p.m."], ["Suez", "Wednesday, October 9th, at 11 a.m."]];
function e8Ledger(extra) { var rows = E8_LEDGER.concat(extra || []); return "<table style='width:100%;font:13px Georgia;border-collapse:collapse'>" + rows.map(function (r) { return "<tr><td style='padding:2px 6px;border-bottom:1px solid rgba(255,255,255,.12)'>" + r[0] + "</td><td style='padding:2px 6px;border-bottom:1px solid rgba(255,255,255,.12);opacity:.85'>" + r[1] + "</td></tr>"; }).join("") + "</table>"; }
function e8Stoke(f, n) { var I = VRN_IN.e8_henri; f.burned = (f.burned || 0) + 1; if (I && I.burn)
I.burn(Math.min(I.parts ? I.parts.length : 5, f.burned)); if (typeof playTone === "function")
playTone(140, 0.25); }
(function () {
if (typeof vbkItemMesh !== "function")
return;
var m0 = vbkItemMesh;
function only(g, keep) { g.children.forEach(function (x) { if (keep.indexOf(x) < 0 && x !== g.userData.glow)
x.visible = false; }); return g; }
vbkItemMesh = function (kind) {
var g, a, b;
if (kind === "shirt") {
g = m0("__");
a = wBox(0.32, 0.05, 0.26, wM(0xF8F6F0), 0, 0.03, 0, g);
b = wBox(0.1, 0.02, 0.04, wM(0xFAFAF6), 0, 0.06, 0.1, g);
return only(g, [a, b]);
}
if (kind === "shoe") {
g = m0("__");
a = wBox(0.1, 0.06, 0.26, wM(0xC8A040, { m: 0.3 }), 0, 0.03, 0, g);
b = wSph(0.02, wM(0xF4F0E8), 0, 0.07, 0.08, g, 6);
return only(g, [a, b]);
}
if (kind === "coal") {
g = m0("__");
a = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1, 0), wM(0x141414, { r: 0.6 }));
a.position.y = 0.07;
g.add(a);
return only(g, [a]);
}
if (kind === "sugar") {
g = m0("__");
a = wBox(0.05, 0.05, 0.05, wM(0xF8F6F0), 0, 0.03, 0, g);
b = wBox(0.05, 0.05, 0.05, wM(0xF8F6F0), 0.07, 0.03, 0.02, g);
return only(g, [a, b]);
}
if (kind === "banknote") {
g = m0("__");
a = wBox(0.2, 0.004, 0.12, wM(0xF0ECE0), 0, 0.01, 0, g);
b = wBox(0.16, 0.005, 0.03, wM(0x2A2A2A), 0, 0.012, -0.03, g);
return only(g, [a, b]);
}
if (kind === "plank") {
g = m0("__");
a = wBox(0.9, 0.05, 0.18, wM(0xB89A6A), 0, 0.03, 0, g);
return only(g, [a]);
}
if (kind === "wig") {
g = m0("__");
a = wSph(0.12, wM(0xEDE8DC), 0, 0.08, 0, g, 10);
a.scale.y = 0.7;
return only(g, [a]);
}
if (kind === "rice") {
g = m0("__");
a = wCyl(0.08, 0.06, 0.06, wM(0x6A4A2A), 0, 0.03, 0, g, 10);
b = wSph(0.07, wM(0xF4F0E4), 0, 0.06, 0, g, 8);
b.scale.y = 0.5;
return only(g, [a, b]);
}
if (kind === "key") {
g = m0("__");
a = wBox(0.03, 0.01, 0.14, wM(0x6A6A70, { m: 0.7 }), 0, 0.01, 0, g);
b = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 4, 10), wM(0x6A6A70, { m: 0.7 }));
b.rotation.x = Math.PI / 2;
b.position.set(0, 0.01, -0.08);
g.add(b);
return only(g, [a, b]);
}
if (kind === "knife") {
g = m0("__");
a = wBox(0.02, 0.005, 0.16, wM(0xC8C8D0, { m: 0.8 }), 0, 0.01, 0.05, g);
b = wBox(0.025, 0.02, 0.09, wM(0x3A2418), 0, 0.01, -0.07, g);
return only(g, [a, b]);
}
if (kind === "hat") {
g = m0("__");
a = wCyl(0.11, 0.11, 0.16, wM(0x141414), 0, 0.09, 0, g, 14);
b = wCyl(0.17, 0.17, 0.01, wM(0x141414), 0, 0.01, 0, g, 16);
return only(g, [a, b]);
}
if (kind === "violet") {
g = m0("__");
a = wSph(0.03, wM(0x6A3AA8), 0, 0.04, 0, g, 6);
b = wSph(0.03, wM(0x6A3AA8), 0.04, 0.04, 0.02, g, 6);
return only(g, [a, b]);
}
if (kind === "pistol") {
g = m0("__");
a = wBox(0.03, 0.04, 0.2, wM(0x2A2A2E, { m: 0.7 }), 0, 0.03, 0.04, g);
b = wBox(0.03, 0.09, 0.04, wM(0x5A3A22), 0, 0.03, -0.07, g);
return only(g, [a, b]);
}
return m0(kind);
};
})();
function e8Fogg(at, ry, o) { return Object.assign({ key: "fogg", name: "Phileas Fogg", role: "fogg", persona: E8_FOGG, greet: "Good day.", at: at, ry: ry || 0 }, o || {}); }
function e8Pass(at, ry, o) { return Object.assign({ key: "passe", name: "Passepartout", role: "passe", persona: E8_PASS, greet: "Bonjour, monsieur!", at: at, ry: ry || 0 }, o || {}); }
function e8Fix(at, ry, o) { return Object.assign({ key: "fix", name: "Mr Fix", role: "fix", persona: E8_FIX, greet: "Fix. Agent of the Peninsular Company. At your service.", at: at, ry: ry || 0 }, o || {}); }
function e8Aouda(at, ry, o) { return Object.assign({ key: "aouda", name: "Aouda", role: "aouda", sex: "f", persona: E8_AOUDA, greet: "Good day. Mr Fogg is very kind to let me travel with him.", at: at, ry: ry || 0 }, o || {}); }
function e8Crom(at, ry, o) { return Object.assign({ key: "crom", name: "Sir Francis Cromarty", role: "cromarty", persona: E8_CROM, greet: "Good day to you. India is a great country; you will see a little of it.", at: at, ry: ry || 0 }, o || {}); }
function e8St(port, s, off, dir) { var p = e8XZ(port, s, off); return { x: p.x, z: p.z, ry: e8Yaw(port, s, dir || "in") }; }
E8_CH.push({ n: "III", t: "In which a Conversation Takes Place which Seems Likely to Cost Phileas Fogg Dear", tune: "e8nacht", keep: ["e8_wager", "The memorandum of the wager", "📜"], jump: 1,
start: { room: "reform" }, intro: "The Reform Club, Pall Mall: Wednesday, the 2nd of October 1872, the evening",
words: "Mr Fogg has walked from Saville Row to the Reform Club, as he does every day: five hundred and seventy-five steps of his right foot, five hundred and seventy-six of his left. He has dined, read the papers, and now sits down to whist with five other members.",
cast: [{ key: "sullivan", name: "John Sullivan", role: "clerk", at: { room: "reform", lx: -9.8, lz: -14 }, ry: Math.PI / 2, persona: "You are John Sullivan, banker, member of the Reform Club, 1872, in Jules Verne's Around the World in Eighty Days (the book only). You think eighty days round the world possible on paper, now the railway between Rothal and Allahabad is open; you have read the estimate in the Daily Telegraph.", greet: "Eighty days! I have the Telegraph's figures here." },
{ key: "fallentin", name: "Samuel Fallentin", role: "clerk", at: { room: "reform", lx: -6.2, lz: -14 }, ry: -Math.PI / 2, persona: "You are Samuel Fallentin, banker, member of the Reform Club, 1872, in Jules Verne's Around the World in Eighty Days (the book only); Phileas Fogg's partner at whist tonight. Cautious and good-humoured.", greet: "Calm yourself, my dear Stuart. It's only a joke." },
{ key: "flanagan", name: "Thomas Flanagan", role: "clerk", at: { room: "reform", lx: -8, lz: -12.2 }, ry: Math.PI, persona: "You are Thomas Flanagan, brewer, member of the Reform Club, 1872, in Jules Verne's Around the World in Eighty Days (the book only). You like a wager and you like the gossip about the bank robbery.", greet: "Well, what about that robbery?" }],
steps: [
vRead(),
vGo({ room: "reform", lx: -8, lz: -8 }, "Go through into the card room, where Mr Fogg's table is laid for whist"),
vTalk("Thomas Flanagan", "The talk tonight is of the great robbery at the Bank of England. Ask Thomas Flanagan what is known.", vC("🏦 The robbery", Q8("\"Well, Ralph,\" said Thomas Flanagan, \"what about that robbery?\"") + " " + Q8("\"Oh,\" replied Stuart, \"the Bank will lose the money.\"") + " A package of banknotes, fifty-five thousand pounds, taken from the principal cashier's table three days ago, by a well-dressed gentleman of polished manners.", "▶ And Ralph?"), { room: "reform" }),
vTalk("Gauthier Ralph, of the Bank of England", "Gauthier Ralph is a director of the Bank. Ask him what is being done.", vC("🕵️ The detectives", Q8("\"On the contrary,\" broke in Ralph, \"I hope we may put our hands on the robber. Skilful detectives have been sent to all the principal ports of America and the Continent, and he'll be a clever fellow if he slips through their fingers.\"") + " " + Q8("\"In the first place, he is no robber at all,\" returned Ralph, positively."), "▶ Go on"), { room: "reform" }),
vPuzzle("🏦 A gentleman thief", "Ralph says the thief is no robber at all. What does the Daily Telegraph say he is?", ["A gentleman", "A clerk of the Bank", "A sailor"], 0, ["", "Nobody at the Bank saw any clerk do it.", "Not a sailor."], { yes: "✓ " + Q8("\"The Daily Telegraph says that he is a gentleman.\"") }),
vTalk("Andrew Stuart, engineer", "The game begins: Stuart and Flanagan against Fogg and Fallentin. Stuart cannot let the robbery alone.", vC("🌍 Where can he fly to?", Q8("\"I maintain,\" said Stuart, \"that the chances are in favour of the thief, who must be a shrewd fellow.\"") + " " + Q8("\"Well, but where can he fly to?\" asked Ralph. \"No country is safe for him.\"") + " 'The world is big enough,' says Stuart. And from behind his cards: " + Q8("\"It was once,\" said Phileas Fogg, in a low tone. \"Cut, sir,\" he added, handing the cards to Thomas Flanagan."), "▶ Play"), { room: "reform" }),
vTalk("John Sullivan", "Ralph agrees with Mr Fogg: the world has grown smaller. Stuart scoffs. John Sullivan has the figures.", vC("📰 The Daily Telegraph", Q8("\"Certainly,\" returned Ralph. \"I agree with Mr. Fogg. The world has grown smaller, since a man can now go round it ten times more quickly than a hundred years ago. And that is why the search for this thief will be more likely to succeed.\"") + " " + Q8("\"That is true, gentlemen,\" added John Sullivan. \"Only eighty days, now that the section between Rothal and Allahabad, on the Great Indian Peninsula Railway, has been opened. Here is the estimate made by the Daily Telegraph:"), "▶ Read the estimate"), { room: "reform" }),
vPuzzle("🧮 The Telegraph's estimate", "London to Suez, 7 days. Suez to Bombay, 13. Bombay to Calcutta, 3. Calcutta to Hong Kong, 13. Hong Kong to Yokohama, 6. Yokohama to San Francisco, 22. San Francisco to New York, 7. New York to London, 9. Add them up.", ["80 days", "72 days", "90 days"], 0, ["", "Add again: 7 + 13 + 3 + 13 + 6 + 22 + 7 + 9.", "Too many: add again."], { yes: "✓ Eighty days exactly, if every train and every steamer keeps its time." }),
vTalk("Phileas Fogg", "Stuart, in his excitement, makes a false deal. Hear Mr Fogg answer him.", vC("🃏 All included", Q8("\"Yes, in eighty days!\" exclaimed Stuart, who in his excitement made a false deal. \"But that doesn't take into account bad weather, contrary winds, shipwrecks, railway accidents, and so on.\"") + " " + Q8("\"All included,\" returned Phileas Fogg, continuing to play despite the discussion.") + " " + Q8("\"All included,\" calmly retorted Fogg; adding, as he threw down the cards, \"Two trumps.\""), "▶ And Stuart?"), { room: "reform" }),
vTalk("Andrew Stuart, engineer", "Stuart's temper is up. Hear the bet he offers.", vC("💷 Four thousand pounds", Q8("\"Heaven preserve me! But I would wager four thousand pounds that such a journey, made under these conditions, is impossible.\"") + " 'Quite possible, on the contrary,' says Mr Fogg. 'When?' " + Q8("\"At once. Only I warn you that I shall do it at your expense.\""), "▶ Go on"), { room: "reform" }),
vPuzzle("🃏 A false deal", "Mr Fogg will not play on. Why not?", ["Stuart has dealt the cards wrongly: the hand must be dealt over again", "He has lost", "It is time for dinner"], 0, ["", "He never loses his head over cards.", "He has dined already."], { yes: "✓ " + Q8("\"Deal over again, then,\" said Phileas Fogg. \"There's a false deal.\"") }),
vTalk("Phileas Fogg", "Stuart throws down the pack: he will wager. Mr Fogg turns to the others.", vC("💷 Twenty thousand pounds", Q8("\"All right,\" said Mr. Fogg; and, turning to the others, he continued: \"I have a deposit of twenty thousand at Baring's which I will willingly risk upon it.\"") + " " + Q8("\"Twenty thousand pounds!\" cried Sullivan. \"Twenty thousand pounds, which you would lose by a single accidental delay!\"") + " " + Q8("\"The unforeseen does not exist,\" quietly replied Phileas Fogg."), "▶ 'You must jump mathematically...'"), { room: "reform" }),
vNote("📜 The wager", Q8("\"A true Englishman doesn't joke when he is talking about so serious a thing as a wager,\" replied Phileas Fogg, solemnly. \"I will bet twenty thousand pounds against anyone who wishes that I will make the tour of the world in eighty days or less; in nineteen hundred and twenty hours, or a hundred and fifteen thousand two hundred minutes. Do you accept?\"") + " " + Q8("\"We accept,\" replied Messrs. Stuart, Fallentin, Sullivan, Flanagan, and Ralph, after consulting each other."), "▶ 'When will you go?'"),
vPuzzle("📅 When must he be back?", "Mr Fogg consults his pocket almanac. Today is Wednesday, the 2nd of October. Eighty days from tonight: when must he walk into this room again?", ["Saturday, the 21st of December, at a quarter before nine in the evening", "Christmas Day", "The 2nd of January"], 0, ["", "Count: October has 29 days left, November 30; 59 days; and 21 more in December.", "Too late by far."], { yes: "✓ " + Q8("\"This very evening,\" returned Phileas Fogg.") + " In this very room, on Saturday the 21st of December 1872, at a quarter before nine; or the twenty thousand pounds at Baring's are theirs." }),
vFind("card", { room: "reform", lx: -7.4, lz: -13.6 }, "The memorandum of the wager", "A memorandum of the wager is drawn up and signed by all six. Pick it up from the table and witness it.", { room: "reform" }),
vHold({ room: "reform", lx: -8, lz: -10 }, 6, "The clock strikes seven. The others offer to stop the game so that he can get ready. Stand by the table and hear his answer.", { room: "reform", say: "🃏 " + Q8("\"I am quite ready now,\" was his tranquil response. \"Diamonds are trumps: be so good as to play, gentlemen.\"") })
] });
E8_CH.push({ n: "VI", t: "In which Fix, the Detective, Betrays a Very Natural Impatience", tune: "e8desert", keep: ["e8_desc", "The robber's description", "🕵️"], jump: 1,
start: e8St("suez", -20, -30, "out"), intro: "The quay at Suez: Wednesday, the 9th of October, half-past ten in the morning",
words: "Mr Fogg has gone: London to Paris, Turin, Brindisi, and the steamer Mongolia through the Suez Canal. At Suez, on the quay, a small, slight man with a nervous frown is waiting for her.",
setup: function (f) { try {
if (E8.mongolia)
E8.mongolia.visible = false;
}
catch (e) { } },
cast: [e8Fix(e8At("suez", -14, -26), Math.PI, { wander: 2 }), { key: "consul", name: "The consul at Suez", role: "consul", at: e8At("suez", -10, -30), ry: Math.PI, persona: "You are the British consul at Suez in 1872, from Jules Verne's Around the World in Eighty Days (the book only): a sensible official who saw the canal built by M. de Lesseps against all the prophecies, and watches the English ships pass through it every day. You think Mr Fix's description of the robber looks very like an honest man.", greet: "Patience, Mr Fix. The Mongolia is never late." },
e8Pass(e8At("suez", 8, -18), Math.PI, { greet: "Pardon, monsieur: the English consulate, where is it?" })],
steps: [
vRead(),
vTalk("Mr Fix", "On the quay a small, slight man is walking up and down, fidgeting. Speak to him.", vC("🕵️ Mr Fix", "'Fix. Detective, of the London police.' " + Q8("\"A magnificent robbery, consul; fifty-five thousand pounds! We don't often have such windfalls. Burglars are getting to be so contemptible nowadays! A fellow gets hung for a handful of shillings!\""), "▶ Go on")),
vTalk("The consul at Suez", "The British consul is walking with him. Ask the consul when the steamer is due.", vC("⚓ Never behind time", Q8("\"So you say, consul,\" asked he for the twentieth time, \"that this steamer is never behind time?\"") + " " + Q8("\"No, Mr. Fix,\" replied the consul. \"She was bespoken yesterday at Port Said, and the rest of the way is of no account to such a craft. I repeat that the Mongolia has been in advance of the time required by the company's regulations, and gained the prize awarded for excess of speed.\""), "▶ 'And the robber?'")),
vTalk("The consul at Suez", "The consul doubts that Fix will know his man. Hear what he says, and what Fix answers.", vC("🎭 An honest face", Q8("\"Mr. Fix,\" said the consul, \"I like your way of talking, and hope you'll succeed; but I fear you will find it far from easy. Don't you see, the description which you have there has a singular resemblance to an honest man?\"") + " " + Q8("\"Consul,\" remarked the detective, dogmatically, \"great robbers always resemble honest folks. Fellows who have rascally faces have only one course to take, and that is to remain honest; otherwise they would be arrested off-hand. The artistic thing is, to unmask honest countenances; it's no light task, I admit, but a real art.\""), "▶ Go on")),
vSpot("The port clock", "Half-past ten, and no steamer. Look at the port clock with Fix.", { say: "🕰️ " + Q8("\"The steamer doesn't come!\" he exclaimed, as the port clock struck.") }),
vPuzzle("⛽ Four hours", "How long will the Mongolia stop at Suez, and why?", ["Four hours, to take in coal for the 1,310 miles to Aden", "A whole day, to change her crew", "Ten minutes, for the mail"], 0, ["", "She has no time to lose.", "The coal takes longer than that."], { yes: "✓ " + Q8("\"Four hours; long enough to get in her coal. It is thirteen hundred and ten miles from Suez to Aden, at the other end of the Red Sea, and she has to take in a fresh coal supply.\"") }),
vTalk("Mr Fix", "Ask Fix where he thinks the robber will go.", vC("🗺️ English soil", Q8("\"Good!\" said Fix. \"If the robber is on board he will no doubt get off at Suez, so as to reach the Dutch or French colonies in Asia by some other route. He ought to know that he would not be safe an hour in India, which is English soil.\"") + " " + Q8("\"Unless,\" objected the consul, \"he is exceptionally shrewd. An English criminal, you know, is always better concealed in London than anywhere else.\""), "▶ Watch for the steamer")),
vHold(e8At("suez", 8, -16), 8, "Stand at the edge of the quay and watch for the Mongolia coming up the canal.", { r: 7, done: function () { try {
if (E8.mongolia)
E8.mongolia.visible = true;
}
catch (e) { } }, say: "🚢 Her whistle! The Mongolia comes alongside, her decks crowded; boats swarm round her, and the passengers come ashore." }),
vTalk("Passepartout", "A passenger pushes his way through the porters, a passport in his hand. Speak to him.", vC("🛂 The passport", "He politely asks the way to the English consulate, and shows a passport. " + Q8("\"Is this your passport?\" asked he.") + " " + Q8("\"No, it's my master's.\"") + " " + Q8("\"But he must go to the consul's in person, so as to establish his identity.\""), "▶ 'And where is the consulate?'")),
vPuzzle("🧭 Two hundred steps", "Where does Fix tell him the consulate is?", ["On the corner of the square, two hundred steps off", "At the end of the canal", "Aboard the steamer"], 0, ["", "Much nearer than that.", "No, ashore."], { yes: "✓ " + Q8("\"There, on the corner of the square,\" said Fix, pointing to a house two hundred steps off.") }),
vPuzzle("🕵️ The description", "Fix looks at the passport and catches his breath. The description in it is the description of the robber he was sent from Scotland Yard: tall, fair, a gentleman. What does Fix do?", ["Hurries to the consul, to stop the visa and keep the man at Suez", "Arrests him on the quay at once", "Goes home"], 0, ["", "He has no warrant yet: nothing can be done without one.", "Not Fix!"], { yes: "✓ " + Q8("\"I'll go and fetch my master, who won't be much pleased, however, to be disturbed.\"") + " And Fix makes for the consulate." })
] });
E8_CH.push({ n: "VII", t: "Which Once More Demonstrates the Uselessness of Passports as Aids to Detectives", tune: "e8desert", keep: ["e8_visa", "The Suez visa", "🛂"],
intro: "The British consulate, Suez", words: "Fix has run to the consulate. If Mr Fogg comes for a visa, the consul might keep him at Suez until a warrant comes from London.",
cast: [{ key: "consul", name: "The consul at Suez", role: "consul", at: e8In("e8_consul", 0.6, -6.2), ry: 0, persona: "You are the British consul at Suez in 1872, from Jules Verne's Around the World in Eighty Days (the book only). A passport is genuine or it is not; if it is genuine you have no right to refuse a visa.", greet: "Good day. A visa? Certainly." },
e8Fix(e8In("e8_consul", -10, -4), Math.PI / 2), e8Fogg(e8In("e8_consul", 0.4, -2.4), Math.PI), e8Pass(e8In("e8_consul", 2.2, -1.8), Math.PI)],
steps: [
vRead(),
vSpot("The British consulate, Suez", "The consulate is on the corner of the square, two hundred steps from the quay. Go in."),
vTalk("Mr Fix", "Fix is already with the consul. Hear him.", vC("🕵️ My man", Q8("\"Consul,\" said he, without preamble, \"I have strong reasons for believing that my man is a passenger on the Mongolia.\" And he narrated what had just passed concerning the passport."), "▶ And the consul?"), { room: "e8_consul" }),
vTalk("The consul at Suez", "Ask the consul whether he will refuse the visa.", vC("🛂 Passports", Q8("\"Yes. Passports are only good for annoying honest folks, and aiding in the flight of rogues. I assure you it will be quite the thing for him to do; but I hope you will not visa the passport.\"") + " " + Q8("\"Why not? If the passport is genuine I have no right to refuse.\"") + " " + Q8("\"Still, I must keep this man here until I can get a warrant to arrest him from London.\""), "▶ A knock at the door"), { room: "e8_consul" }),
vTalk("Phileas Fogg", "Two strangers come in: the servant from the quay, and his master. Watch the consul question him.", vC("🎩 Mr Phileas Fogg", Q8("\"You are Mr. Phileas Fogg?\" said the consul, after reading the passport.") + " He is; his servant is a Frenchman named Passepartout; from London, to Bombay. " + Q8("\"Very good, sir. You know that a visa is useless, and that no passport is required?\"") + " " + Q8("\"I know it, sir,\" replied Phileas Fogg; \"but I wish to prove, by your visa, that I came by Suez.\""), "▶ Go on"), { room: "e8_consul" }),
vPuzzle("🛂 Why the visa?", "No passport is needed at Suez. Why does Mr Fogg want the consul's visa all the same?", ["To prove, by the stamp, that he has come by Suez: a step of his wager", "Because he is a thief", "Because Passepartout lost his"], 0, ["", "So Fix thinks: not so.", "Passepartout has it safe."]),
vFind("key", e8In("e8_consul", 0.6, -4.4), "The consulate's seal", "The consul signs and dates the passport. Hand him his seal from the desk.", { room: "e8_consul", verb: "hand it to the consul" }),
vNote("🖋️ Signed and sealed", Q8("The consul proceeded to sign and date the passport, after which he added his official seal. Mr. Fogg paid the customary fee, coldly bowed, and went out, followed by his servant."), "▶ And Fix?"),
vTalk("Mr Fix", "Fix is furious. Hear him and the consul.", vC("🕵️ Feature by feature", Q8("\"Well, he looks and acts like a perfectly honest man,\" replied the consul.") + " " + Q8("\"Possibly; but that is not the question. Do you think, consul, that this phlegmatic gentleman resembles, feature by feature, the robber whose description I have received?\"") + " " + Q8("\"I'll make certain of it,\" interrupted Fix. \"The servant seems to me less mysterious than the master; besides, he's a Frenchman, and can't help talking. Excuse me for a little while, consul.\""), "▶ Back to the quay"), { room: "e8_consul" }),
vNote("📒 Mr Fogg's note-book", Q8("Meanwhile Mr. Fogg, after leaving the consulate, repaired to the quay, gave some orders to Passepartout, went off to the Mongolia in a boat, and descended to his cabin. He took up his note-book, which contained the following memoranda:") + e8Ledger(), "▶ Add it up"),
vPuzzle("⏱️ London to Suez", "Left London, Wednesday at 8.45 in the evening; reached Suez, the next Wednesday at 11 in the morning. How long has it taken, by Mr Fogg's own reckoning?", ["158 hours and more: six days and a half", "Seven days exactly", "Five days"], 0, ["", "Count the hours: a few short of seven days.", "Longer than that."], { yes: "✓ " + Q8("\"Total of hours spent, 158+; or, in days, six days and a half.\"") + " Neither gained nor lost." })
] });
E8_CH.push({ n: "VIII", t: "In which Passepartout Talks Rather More, Perhaps, than is Prudent", tune: "e8desert", keep: ["e8_watch", "Passepartout's London time", "⌚"], jump: 1,
start: e8St("suez", -4, -32, "e"), intro: "The quay at Suez, an hour before the Mongolia sails",
words: "Fix soon finds Passepartout lounging about the quay, looking at everything, as if he at least were not obliged not to see anything.",
cast: [e8Pass(e8At("suez", 2, -30), -Math.PI / 2, { wander: 2 }), e8Fix(e8At("suez", 0, -28), Math.PI / 2),
{ key: "consul", name: "The consul at Suez", role: "consul", at: e8In("e8_consul", 0.6, -6.2), ry: 0, persona: "You are the British consul at Suez in 1872, from Jules Verne's Around the World in Eighty Days (the book only).", greet: "Back again, Mr Fix?" }, e8Fix(e8In("e8_consul", -1.6, -3), Math.PI, { key: "fix2" })],
steps: [
vRead(),
vTalk("Passepartout", "Passepartout is staring at everything on the quay. Fix joins him; go with them.", vC("🛂 All right", Q8("\"Well, my friend,\" said the detective, coming up with him, \"is your passport visaed?\"") + " " + Q8("\"Ah, it's you, is it, monsieur?\" responded Passepartout. \"Thanks, yes, the passport is all right.\"") + " " + Q8("\"Yes; but we travel so fast that I seem to be journeying in a dream. So this is Suez?\""), "▶ Go on")),
vTalk("Passepartout", "Passepartout needs shirts and shoes: they came away with only a carpet-bag. Ask him.", vC("👞 Shirts and shoes", Q8("\"I am not, but my master is. By the way, I must buy some shoes and shirts. We came away without trunks, only with a carpet-bag.\"") + " " + Q8("\"I will show you an excellent shop for getting what you want.\""), "▶ To the shop")),
vTalk("Passepartout", "On the way, Passepartout pulls out his great silver watch. Hear him.", vC("⌚ The family watch", Q8("\"You have plenty of time; it's only twelve o'clock.\"") + " " + Q8("Passepartout pulled out his big watch. \"Twelve!\" he exclaimed; \"why, it's only eight minutes before ten.\"") + " " + Q8("\"My watch? A family watch, monsieur, which has come down from my great-grandfather! It doesn't vary five minutes in the year. It's a perfect chronometer, look you.\""), "▶ Go on")),
vPuzzle("⌚ London time", "Passepartout's watch says eight minutes before ten; the clock of Suez says twelve. Why?", ["His watch still keeps London time, two hours behind the time of Suez", "His watch is broken", "The clock of Suez is wrong"], 0, ["", "It never varies five minutes in a year.", "The sun says the clock is right."], { yes: "✓ " + Q8("\"I see how it is,\" said Fix. \"You have kept London time, which is two hours behind that of Suez. You ought to regulate your watch at noon in each country.\"") + " " + Q8("\"I regulate my watch? Never!\"") }),
vNote("☀️ The sun will be wrong", Q8("\"Well, then, it will not agree with the sun.\"") + " " + Q8("\"So much the worse for the sun, monsieur. The sun will be wrong, then!\"") + " " + Q8("And the worthy fellow returned the watch to its fob with a defiant gesture. After a few minutes silence, Fix resumed: \"You left London hastily, then?\""), "▶ He answers"),
vTalk("Passepartout", "Passepartout tells Fix everything. Listen.", vC("💷 Brand new banknotes", Q8("\"I rather think so! Last Friday at eight o'clock in the evening, Monsieur Fogg came home from his club, and three-quarters of an hour afterwards we were off.\"") + " " + Q8("\"Yes, and in eighty days! He says it is on a wager; but, between us, I don't believe a word of it. That wouldn't be common sense. There's something else in the wind.\"") + " " + Q8("\"No doubt, for he is carrying an enormous sum in brand new banknotes with him. And he doesn't spare the money on the way, either: he has offered a large reward to the engineer of the Mongolia if he gets us to Bombay well in advance of time.\""), "▶ 'Have you known him long?'")),
vSpot("The shop for shirts and shoes", "Here is the shop. Go in with Passepartout."),
vGather("shirt", e8At("suez", 30, -44), 4, "a shirt, or a pair of shoes", "Help Passepartout choose: two shirts and two pairs of shoes, from the shopkeeper's piles.", { spread: 2, verb: "choose it", each: "Chosen." }),
vTalk("Passepartout", "Bombay, he learns, is in India. Something worries him; ask what.", vC("🔥 My burner!", Q8("\"The deuce! I was going to tell you there's one thing that worries me—my burner!\"") + " " + Q8("\"My gas-burner, which I forgot to turn off, and which is at this moment burning at my expense. I have calculated, monsieur, that I lose two shillings every four and twenty hours, exactly sixpence more than I earn; and you will understand that the longer our journey—\""), "▶ Work it out")),
vPuzzle("🔥 Two shillings a day", "At two shillings every twenty-four hours, what will the gas cost Passepartout if the journey takes the whole eighty days?", ["Eight pounds (a hundred and sixty shillings)", "Two pounds", "Twenty pounds"], 0, ["", "Count again: eighty days at two shillings.", "Too much: twenty shillings make a pound."], { yes: "✓ Eighty times two is a hundred and sixty shillings: eight pounds. More than a month's wages." }),
vSpot("The British consulate, Suez", "Fix leaves Passepartout at the shop and hurries back to the consul. Follow him."),
vTalk("Mr Fix", "Fix is sure now. Hear him tell the consul.", vC("🕵️ An odd stick", Q8("\"Consul,\" said he, \"I have no longer any doubt. I have spotted my man. He passes himself off as an odd stick who is going round the world in eighty days.\"") + " " + Q8("\"Then he's a sharp fellow,\" returned the consul, \"and counts on returning to London after putting the police of the two countries off his track.\""), "▶ 'What will you do?'"), { room: "e8_consul" }),
vNote("📨 To Scotland Yard", Q8("\"Send a dispatch to London for a warrant of arrest to be dispatched instantly to Bombay, take passage on board the Mongolia, follow my rogue to India, and there, on English ground, arrest him politely, with my warrant in my hand, and my hand on his shoulder.\"") + " And a quarter of an hour later Fix, with his light baggage and a good deal of money, is aboard the Mongolia.", "▶ Aboard")
] });
E8_CH.push({ n: "IX", t: "In which the Red Sea and the Indian Ocean Prove Propitious to the Designs of Phileas Fogg", tune: "e8hebrides", keep: ["e8_coal", "A lump of Aden coal", "🪨"], jump: 1,
start: { room: "e8_deck" }, intro: "The Mongolia, down the Red Sea", words: "The Mongolia steams down the Red Sea at full speed. Mr Fogg plays whist. Passepartout eats like a famished ogre. And on the deck one day Passepartout meets an old acquaintance.",
setup: function (f) { e8Ship("Mongolia", "suez", 10); },
cast: [e8Pass(e8In("e8_deck", -6, 2), -Math.PI / 2), e8Fix(e8In("e8_deck", -2, 3), Math.PI / 2), e8Fogg(e8In("e8_deck", -34, 1.6), 0),
{ key: "partner", name: "The Reverend Decimus Smith", role: "gent", at: e8In("e8_deck", -36, 0), ry: Math.PI / 2, persona: "You are a parson going out to Bombay in 1872, on the steamer Mongolia, and one of Mr Phileas Fogg's partners at whist: a quiet, devoted player who never talks during a hand.", greet: "Not a word during the hand, if you please. Hearts." }],
steps: [
vRead(),
vTalk("Passepartout", "On the deck Passepartout sees a face he knows. Go with him.", vC("😮 You here?", Q8("\"If I am not mistaken,\" said he, approaching this person, with his most amiable smile, \"you are the gentleman who so kindly volunteered to guide me at Suez?\"") + " " + Q8("\"Ah! I quite recognise you. You are the servant of the strange Englishman—\"") + " 'Fix.' " + Q8("\"Monsieur Fix,\" resumed Passepartout, \"I'm charmed to find you on board. Where are you bound?\""), "▶ Go on"), { room: "e8_deck" }),
vTalk("Mr Fix", "Fix says he is an agent of the Peninsular Company. Listen to them.", vC("🐘 Tigers, snakes, elephants", Q8("\"Several times. I am one of the agents of the Peninsular Company.\"") + " " + Q8("\"Oh, very curious. Mosques, minarets, temples, fakirs, pagodas, tigers, snakes, elephants! I hope you will have ample time to see the sights.\"") + " " + Q8("\"I hope so, Monsieur Fix. You see, a man of sound sense ought not to spend his life jumping from a steamer upon a railway train, and from a railway train upon a steamer again, pretending to make the tour of the world in eighty days! No; all these gymnastics, you may be sure, will cease at Bombay.\""), "▶ Go on"), { room: "e8_deck" }),
vTalk("Mr Fix", "Fix wants to know about the master. Hear how he asks.", vC("🎩 A secret errand?", Q8("\"And Mr. Fogg is getting on well?\" asked Fix, in the most natural tone in the world.") + " " + Q8("\"Quite well, and I too. I eat like a famished ogre; it's the sea air.\"") + " " + Q8("\"Do you know, Mr. Passepartout, that this pretended tour in eighty days may conceal some secret errand—perhaps a diplomatic mission?\"") + " " + Q8("\"Faith, Monsieur Fix, I assure you I know nothing about it, nor would I give half a crown to find out.\""), "▶ Go on"), { room: "e8_deck" }),
vSpot("The whist table in the saloon", "Mr Fogg never goes on deck. Look in at his whist table in the saloon.", { room: "e8_deck" }),
vTalk("Phileas Fogg", "Mr Fogg plays on, with a parson and two others. Watch the last hand.", vC("🃏 Thirteen tricks", Q8("Phileas Fogg was in the act of finishing the thirty-third rubber of the voyage, and his partner and himself having, by a bold stroke, captured all thirteen of the tricks, concluded this fine campaign with a brilliant victory."), "▶ Go on"), { room: "e8_deck" }),
vPuzzle("🃏 A grand slam", "In whist each of the four players has thirteen cards. If Mr Fogg and his partner take all the tricks, how many tricks is that?", ["Thirteen", "Fifty-two", "Four"], 0, ["", "Fifty-two is the cards: a trick takes four of them.", "Four cards make one trick."]),
vSpot("The log-board", "Read the noon position on the log-board: the strait at the bottom of the Red Sea.", { room: "e8_deck" }),
vPuzzle("🌊 Bab-el-Mandeb", "The night before Aden the Mongolia passes the Strait of Bab-el-Mandeb. What does the name mean?", ["The Bridge of Tears", "The Gate of Gold", "The Sea of Reeds"], 0, ["", "", ""], { yes: "✓ " + Q8("The following night they passed through the Strait of Bab-el-Mandeb, which means in Arabic The Bridge of Tears, and the next day they put in at Steamer Point, north-west of Aden harbour, to take in coal.") }),
vGather("coal", e8In("e8_deck", 14, 0), 5, "a basket of coal", "At Steamer Point the coal comes aboard in baskets. Lend a hand: carry five baskets to the bunker.", { room: "e8_deck", spread: 4, verb: "carry it", each: "Into the bunker." }),
vPuzzle("⛽ Fifteen hours", "The Mongolia was due at Aden on the morning of the 15th; she arrived on the evening of the 14th. Gain or loss?", ["A gain of fifteen hours", "A loss of a day", "Neither"], 0, ["", "She came early, not late.", "Look again at the dates."], { yes: "✓ " + Q8("The Mongolia had still sixteen hundred and fifty miles to traverse before reaching Bombay, and was obliged to remain four hours at Steamer Point to coal up. But this delay, as it was foreseen, did not affect Phileas Fogg's programme; besides, the Mongolia, instead of reaching Aden on the morning of the 15th, when she was due, arrived there on the evening of the 14th, a gain of fifteen hours.") }),
e8Ride("Down the Red Sea and over the Indian Ocean to Bombay", "steamer", E8_PORT.suez, E8_PORT.bombay, "🚢 <b>The Mongolia</b> steams south down the Red Sea.", [[0.15, "🏜️ Mocha, its ruined walls with date-trees growing on them; coffee-fields on the mountains."], [0.165, "🌊 The Strait of Bab-el-Mandeb: the Bridge of Tears."], [0.175, "⛽ Steamer Point, Aden: four hours to coal, and Passepartout ashore among Somalis, Banyans, Parsees, Jews and Arabs."], [0.19, "🌅 The Indian Ocean: the wind in the north-west, all sails aiding the engine."], [0.21, "🏙️ The palms of Malabar, and Bombay."]], e8Land("bombay", -10, -26, "🏙️ <b>Bombay,</b> the 20th of October, half-past four in the afternoon. The passengers go ashore.")),
vPuzzle("📒 Two days gained", "The Mongolia was due at Bombay on the 22nd; she arrived on the 20th. What does Mr Fogg write in his itinerary?", ["A gain of two days, in the column of gains", "A loss of two days", "Nothing at all"], 0, ["", "Early, not late!", "He writes everything down."], { yes: "✓ " + Q8("The Mongolia was due at Bombay on the 22nd; she arrived on the 20th. This was a gain to Phileas Fogg of two days since his departure from London, and he calmly entered the fact in the itinerary, in the column of gains.") })
] });
E8_CH.push({ n: "X", t: "In which Passepartout is Only Too Glad to Get Off with the Loss of his Shoes", tune: "e8gymno", keep: ["e8_shoe", "An Indian slipper", "🥿"], jump: 1,
start: e8St("bombay", -10, -26), intro: "Bombay, the 20th of October: the train for Calcutta leaves at eight",
words: "Mr Fogg has three and a half hours in Bombay, and means to see nothing of it but the passport office and the station. Passepartout has his errand: shirts and shoes. Then he goes for a walk.",
cast: [e8Fogg(e8At("bombay", 14, -58), Math.PI, { greet: "Is this rabbit, sir?" }), { key: "landlord", name: "The landlord of the station", role: "man", at: e8At("bombay", 16, -56), ry: -Math.PI / 2, persona: "You are the landlord of the railway refreshment-room at Bombay station in 1872, a rogue who passes off cat as 'native rabbit' to travellers in a hurry.", greet: "Native rabbit, my lord! The best in Bombay." },
e8Pass(e8At("bombay", -38, -86), 0, { wander: 3 }),
{ key: "priest", name: "A Brahmin priest of the pagoda", role: "priest", at: e8In("e8_pagoda", -3, -9), ry: 0, persona: "You are a priest of the pagoda on Malabar Hill in Bombay in 1872: devout, dignified, and angry when the temple is entered with shoes on. You welcome respectful visitors who leave their shoes at the door.", greet: "Your shoes, stranger, at the door: then you may look." },
e8Fix(e8At("bombay", 4, -60), Math.PI / 2, { key: "fixst" }), e8Pass(e8At("bombay", 8, -60), Math.PI, { key: "passst", greet: "Monsieur! My shoes! My shirts!" })],
steps: [
vRead(),
vSpot("The passport office", "Mr Fogg goes first to the passport office. Go with him."),
vGo(e8At("bombay", 12, -58), "Then to the station, where he orders dinner.", { r: 5 }),
vTalk("Phileas Fogg", "The landlord has recommended his 'native rabbit'. Watch Mr Fogg taste it.", vC("🐇 Native rabbit", Q8("Mr. Fogg accordingly tasted the dish, but, despite its spiced sauce, found it far from palatable. He rang for the landlord, and, on his appearance, said, fixing his clear eyes upon him, \"Is this rabbit, sir?\"") + " " + Q8("\"Yes, my lord,\" the rogue boldly replied, \"rabbit from the jungles.\"") + " " + Q8("\"And this rabbit did not mew when he was killed?\""), "▶ Go on")),
vPuzzle("🐈 Did it mew?", "What does Mr Fogg suspect the 'native rabbit' really is?", ["Cat", "Chicken", "Elephant"], 0, ["", "Chickens don't mew.", "Far too big."], { yes: "✓ " + Q8("\"Be so good, landlord, as not to swear, but remember this: cats were formerly considered, in India, as sacred animals. That was a good time.\"") }),
vSpot("The bazaar", "Meanwhile Passepartout has bought his shirts and shoes, and is strolling about the streets. Find him at the bazaar."),
vTalk("Passepartout", "It is the day of a Parsee festival: processions, music, dancing-girls in rose-coloured gauze. Passepartout is enchanted. Speak to him.", vC("🎉 A carnival", "'Monsieur! Look! Persians with pointed caps, Banyas with round turbans, Parsees with black mitres... and the music!' He has his parcel of new shirts and shoes under his arm, and no idea of the time.", "▶ Go with him")),
vSpot("The pagoda on Malabar Hill", "On his way back, Passepartout sees the splendid pagoda on Malabar Hill, and must see inside. Climb the steps."),
vSpot("The place for shoes", "Inside the door is the place where shoes are left. Look at it.", { room: "e8_pagoda" }),
vPuzzle("👞 The custom", "What must even the faithful do before they go into the pagoda?", ["Leave their shoes outside the door", "Ring a bell", "Pay a rupee"], 0, ["", "", ""], { yes: "✓ " + Q8("He was quite ignorant that it is forbidden to Christians to enter certain Indian temples, and that even the faithful must not go in without first leaving their shoes outside the door.") }),
vTalk("A Brahmin priest of the pagoda", "A priest of the pagoda is coming towards you. Show respect: your shoes are at the door.", vC("🙏 Respect", "He looks at your bare feet and bows a little. 'You know the custom. Look, then, and go in peace.' Behind you there is a shout: a Frenchman has walked straight in, shoes and all.", "▶ Turn round"), { room: "e8_pagoda" }),
vNote("💥 Passepartout!", e8A(Q8("Passepartout, however, thinking no harm, went in like a simple tourist, and was soon lost in admiration of the splendid Brahmin ornamentation which everywhere met his eyes, when of a sudden he found himself sprawling on the sacred flagging. He looked up to behold three enraged priests, who forthwith fell upon him; tore off his shoes, and began to beat him with loud, savage exclamations."), "Passepartout walks straight in, shoes and all, gazing at the carvings, and three angry priests seize him and pull off his shoes. He breaks free and runs out of the pagoda and down the hill, as fast as his legs can carry him, without his shoes, his hat or his parcel."), "▶ Run for the station!"),
vGo(e8At("bombay", 6, -60), "Back down the hill to the station: the train goes at eight!", { r: 6 }),
vTalk("Passepartout", "Five minutes before eight Passepartout rushes in. Hear him.", vC("🥿 Shoeless", Q8("At five minutes before eight, Passepartout, hatless, shoeless, and having in the squabble lost his package of shirts and shoes, rushed breathlessly into the station.") + " " + Q8("\"I hope that this will not happen again,\" said Phileas Fogg coldly, as he got into the train."), "▶ And Fix?")),
vTalk("Mr Fix", "Fix has heard it all, hidden on the platform. He does not get on the train.", vC("🕵️ An offence", Q8("\"No, I'll stay,\" muttered he. \"An offence has been committed on Indian soil. I've got my man.\"") + " " + Q8("Just then the locomotive gave a sharp screech, and the train passed out into the darkness of the night."), "▶ All aboard"))
] });
E8_CH.push({ n: "XI", t: "In which Phileas Fogg Secures a Curious Means of Conveyance at a Fabulous Price", tune: "e8gymno", keep: ["e8_kiouni", "A lump of Kiouni's sugar", "🐘"], jump: 1,
start: { room: "e8_car" }, intro: "The night train for Calcutta: Bombay to Kholby", words: "The train has started punctually. In the carriage with Mr Fogg and Passepartout is a third traveller: Sir Francis Cromarty, a brigadier-general and one of Mr Fogg's whist partners on the Mongolia, going to rejoin his corps at Benares.",
setup: function (f) { var I = VRN_IN.e8_car; E8.carView = "india"; if (I && I.view)
I.view("india"); e8Out("e8_car", "kholby", 30, -10, "Down from the carriage, into a glade in the forest."); },
cast: [e8Fogg(e8In("e8_car", -8.6, 1.3), -Math.PI / 2), e8Crom(e8In("e8_car", -7.2, 1.3), Math.PI / 2), e8Pass(e8In("e8_car", -8.6, -1.3), -Math.PI / 2),
e8Fogg(e8At("kholby", 20, -14), Math.PI, { key: "foggk" }), e8Crom(e8At("kholby", 22, -16), Math.PI, { key: "cromk" }), e8Pass(e8At("kholby", -8, -40), 0, { key: "passk" }),
{ key: "cond", name: "The conductor", role: "clerk", at: e8At("kholby", 26, -10), ry: -Math.PI / 2, persona: "You are the conductor of the Great Indian Peninsula Railway's train from Bombay in 1872. The newspapers said the line was finished; it is not: fifty miles still to lay between Kholby and Allahabad, and the passengers know they must find their own way across.", greet: "Passengers will get out here!" },
{ key: "owner", name: "Kiouni's owner", role: "mahout", at: e8At("kholby", -10, -48), ry: 0, persona: "You are the man who owns the elephant Kiouni at Kholby in 1872. You reared him for war, not for burden, and you will not hire him out; but you will sell him, for a great deal of money.", greet: "Kiouni is not for hire, sahib. Not for any money." },
{ key: "guide", name: "The Parsee guide", role: "parsee", at: e8At("kholby", -2, -42), ry: -Math.PI / 2, persona: E8_GUIDE, greet: "I know the forest, sir, and I know elephants." }],
steps: [
vRead(),
vTalk("Sir Francis Cromarty", "Sir Francis is opposite Mr Fogg. Hear what he says about the railway.", vC("⛰️ The Ghauts", Q8("\"Because the railway stopped at the base of these mountains, which the passengers were obliged to cross in palanquins or on ponies to Kandallah, on the other side.\"") + " " + Q8("\"Such a delay would not have deranged my plans in the least,\" said Mr. Fogg. \"I have constantly foreseen the likelihood of certain obstacles.\""), "▶ Go on"), { room: "e8_car" }),
vTalk("Sir Francis Cromarty", "Sir Francis warns Mr Fogg about the pagoda. Passepartout is asleep.", vC("⚖️ The law of India", "'The Government takes particular care that the religious customs of the Indians should be respected.' " + Q8("\"Very well, Sir Francis,\" replied Mr. Fogg; \"if he had been caught he would have been condemned and punished, and then would have quietly returned to Europe. I don't see how this affair could have delayed his master.\""), "▶ Go on"), { room: "e8_car" }),
vSpot("The carriage window", "Look out of the window: India going by.", { room: "e8_car" }),
vPuzzle("⌚ Four hours slow", "Sir Francis asks Passepartout the time; his watch, still on London time, says three in the morning. They have come about seventy-seven degrees east of Greenwich. How far wrong is the watch?", ["At least four hours slow", "Right to the minute", "Four hours fast"], 0, ["", "Not in India!", "Going east, the sun rises earlier: London time is behind."], { yes: "✓ " + Q8("This famous timepiece, always regulated on the Greenwich meridian, which was now some seventy-seven degrees westward, was at least four hours slow.") + " Four minutes for every degree." }),
vSpot("The card table", "Passepartout has bought Indian slippers ornamented with false pearls at Burhampoor. Sir Francis and Mr Fogg play a little whist.", { room: "e8_car" }),
e8Ride("Across the Khandeish and into Bundelcund", "train", E8_PORT.bombay, E8_PORT.kholby, "🚂 The train runs on through the night.", [[0.235, "⛰️ The defiles of the mountains: basalt below, forests above."], [0.25, "🌾 The Khandeish: cotton, coffee, palms, temples, villages."], [0.265, "🌳 Forests, and jungles where tigers flee at the noise of the train."]], e8Land("kholby", 22, -10, "🌴 <b>A glade, fifteen miles beyond Rothal.</b> Eight in the morning. The train has stopped.", "in")),
vTalk("The conductor", "The conductor is walking along the train, shouting. Ask him why.", vC("🛤️ No more railway", Q8("Passepartout, not less surprised, rushed out and speedily returned, crying: \"Monsieur, no more railway!\"") + " " + Q8("\"No. There's still a matter of fifty miles to be laid from here to Allahabad, where the line begins again.\"") + " " + Q8("\"Yet you sell tickets from Bombay to Calcutta,\" retorted Sir Francis, who was growing warm.") + " " + Q8("\"No doubt,\" replied the conductor; \"but the passengers know that they must provide means of transportation for themselves from Kholby to Allahabad.\""), "▶ Mr Fogg?")),
vTalk("Phileas Fogg", "Sir Francis is furious; Passepartout dares not look at his master. Mr Fogg is not troubled.", vC("📅 Two days to spare", Q8("\"Not at all; but I knew that some obstacle or other would sooner or later arise on my route. Nothing, therefore, is lost. I have two days, which I have already gained, to sacrifice. A steamer leaves Calcutta for Hong Kong at noon, on the 25th. This is the 22nd, and we shall reach Calcutta in time.\""), "▶ Look for a way")),
vSpot("The end of the rails", "Every palanquin and pony in Kholby is already taken. Look at where the rails end.", { say: "🛤️ The other passengers have taken every carriage, cart and pony in the village. Mr Fogg and Sir Francis come back from searching it end to end with nothing." }),
vTalk("Passepartout", "Passepartout has been looking about too. He has found something.", vC("🐘 Monsieur!", Q8("Passepartout, who had now rejoined his master, made a wry grimace, as he thought of his magnificent, but too frail Indian shoes. Happily he too had been looking about him, and, after a moment's hesitation, said, \"Monsieur, I think I have found a means of conveyance.\"") + " " + Q8("\"An elephant! An elephant that belongs to an Indian who lives but a hundred steps from here.\""), "▶ Let's go and see")),
vTalk("Kiouni's owner", "The elephant's owner will not hire him out: ten pounds an hour, twenty, forty, he refuses them all. Mr Fogg offers to buy him.", vC("💷 A thousand pounds", Q8("Phileas Fogg, without getting in the least flurried, then proposed to purchase the animal outright, and at first offered a thousand pounds for him. The Indian, perhaps thinking he was going to make a great bargain, still refused."), "▶ Higher")),
vPuzzle("💷 The price of an elephant", "Mr Fogg bids twelve hundred, then fifteen hundred, then eighteen hundred. Passepartout is white with suspense. At what price does the Indian at last say yes?", ["Two thousand pounds", "Eighteen hundred pounds", "Ten thousand pounds"], 0, ["", "He refused that one.", "Mr Fogg never pays more than he must."], { yes: "✓ " + Q8("At two thousand pounds the Indian yielded.") + " " + Q8("\"What a price, good heavens!\" cried Passepartout, \"for an elephant.\"") }),
vTalk("The Parsee guide", "A young Parsee with an intelligent face offers to be their guide. Hire him.", vC("🧭 A guide", "He knows the country and he knows elephants. Mr Fogg promises him a generous reward. He covers the elephant's back with a saddle-cloth and hangs a curious little seat on each flank.", "▶ Load up")),
vGather("sugar", e8At("kholby", -6, -44), 3, "a lump of sugar for Kiouni", "Make friends with Kiouni: give him three lumps of sugar.", { spread: 2.5, verb: "give it to Kiouni", each: "Kiouni curls his trunk round it." })
] });
var E8_PARSEE = { key: "guide", name: "The Parsee guide", role: "parsee", persona: E8_GUIDE, greet: "Quietly, sir. The forest has ears." };
function e8Guide(at, ry, o) { return Object.assign({}, E8_PARSEE, { at: at, ry: ry || 0 }, o || {}); }
function e8Kiouni(at, ry) { return { key: "kiouni", kind: "thing", at: at, ry: ry || 0 }; }
E8_CH.push({ n: "XII", t: "In which Phileas Fogg and his Companions Venture Across the Indian Forests, and What Ensued", tune: "e8gymno", keep: ["e8_branch", "A leaf from Kiouni's breakfast", "🌿"], jump: 1,
start: e8St("kholby", -6, -38, "e"), intro: "Kholby: nine in the morning, on the elephant", words: "The Parsee guide leaves the unfinished line on his left, to gain twenty miles through the forest. Mr Fogg and Sir Francis are plunged to the neck in the howdahs, jolted by the swift trot; Passepartout sits on the elephant's back.",
cast: [e8Guide(e8At("kholby", -4, -40), Math.PI / 2), e8Fogg(e8At("kholby", -8, -38), 0), e8Crom(e8At("kholby", -8, -42), 0), e8Pass(e8At("kholby", -2, -36), 0),
e8Guide(e8At("pillaji", -16, -22), Math.PI / 2, { key: "guide2" }), e8Crom(e8At("pillaji", -18, -18), Math.PI / 2, { key: "crom2" }), e8Fogg(e8At("pillaji", -12, -18), -Math.PI / 2, { key: "fogg2" }), e8Pass(e8At("pillaji", -14, -24), 0, { key: "pass2" })],
steps: [
vRead(),
vTalk("The Parsee guide", "Ask the guide which way he means to go.", vC("🧭 Twenty miles shorter", Q8("In order to shorten the journey, the guide passed to the left of the line where the railway was still in process of being built.") + " 'Straight through the forest, sir: twenty miles less, and Kiouni does not mind the paths.'", "▶ Up on Kiouni")),
e8Ride("Through the forests of Bundelcund on Kiouni", "elephant", E8_PORT.kholby, E8_PORT.kholby + 0.012, "🐘 <b>Kiouni</b> trots off into the forest: the howdahs jolt; Passepartout bounces on his back.", [[0.275, "🌳 Thick forest: palms, tamarinds, the Vindhia hills ahead."], [0.28, "🐒 Monkeys scolding in the trees as Kiouni goes by."]], e8Land("kholby", 60, -20, "🌳 <b>A clearing by a spring.</b> Two hours out: the guide stops to rest the elephant.", "e"), { pad0: 0.001, pad1: 0 }),
vNote("🐘 Made of iron", Q8("\"Why, he's made of iron!\" exclaimed the general") + " " + Q8("\"Of forged iron,\" replied Passepartout, as he set about preparing a hasty breakfast."), "▶ Feed him"),
vGather("wood", e8At("kholby", 58, -24), 3, "a leafy branch", "Kiouni has drunk at the spring. Bring him three leafy branches for his breakfast.", { spread: 4, verb: "give it to Kiouni", each: "Crunch." }),
e8Ride("On towards Pillaji", "elephant", E8_PORT.kholby + 0.006, E8_PORT.pillaji - 0.003, "🐘 On through the forest, the afternoon going.", [[0.286, "🌄 Late in the afternoon: the forest darkening."]], e8Land("pillaji", -20, -20, "🌳 <b>The forest of Bundelcund,</b> four in the afternoon. A confused murmur comes through the thick branches.", "e"), { pad0: 0, pad1: 0 }),
vSpot("The thicket at the edge of the glade", "Voices, tambourines, cymbals: a procession is coming. Hide in the thicket with the others!"),
vHold(e8At("pillaji", -14, -20), 10, "Keep still in the thicket while the procession goes by, a hundred paces away.", { r: 5, say: e8A("🥁 Priests in mitres and long robes, men and women singing; a statue drawn on a car; guards with naked sabres; and a young woman, faltering at every step; and behind her a palanquin bearing the body of an old rajah.", "🥁 Priests in long robes, singers, drums, guards with drawn swords; a young woman led along, unwilling; and a palanquin carrying the body of an old rajah. The music dies away under the trees.") }),
vTalk("Sir Francis Cromarty", "When they are gone, Sir Francis speaks, very low. Ask him what it was.", vC("🔥 A suttee", e8A(Q8("Sir Francis watched the procession with a sad countenance, and, turning to the guide, said, \"A suttee.\"") + " " + Q8("Phileas Fogg had heard what Sir Francis said, and, as soon as the procession had disappeared, asked: \"What is a suttee?\"") + " " + Q8("\"A suttee,\" returned the general, \"is a human sacrifice, but a voluntary one. The woman you have just seen will be burned to-morrow at the dawn of day.\""), "'A suttee,' says Sir Francis, sadly. It is an old and terrible custom in a few wild places: when a rajah dies, his widow is put to death with him at his funeral. The English have stopped it nearly everywhere in India; not here, not yet. The young woman will die at dawn."), "▶ Go on")),
vTalk("The Parsee guide", "The guide shakes his head. He knows more.", vC("🌙 Not voluntary", Q8("While Sir Francis was speaking, the guide shook his head several times, and now said: \"The sacrifice which will take place to-morrow at dawn is not a voluntary one.\"") + " " + Q8("\"To the pagoda of Pillaji, two miles from here; she will pass the night there.\"") + " " + Q8("\"To-morrow, at the first light of dawn.\""), "▶ Mr Fogg?")),
vTalk("Phileas Fogg", "The guide is already on Kiouni's neck. Mr Fogg stops him.", vC("❤️ When I have the time", Q8("The guide now led the elephant out of the thicket, and leaped upon his neck. Just at the moment that he was about to urge Kiouni forward with a peculiar whistle, Mr. Fogg stopped him, and, turning to Sir Francis Cromarty, said, \"Suppose we save this woman.\"") + " " + Q8("\"Save the woman, Mr. Fogg!\"") + " " + Q8("\"I have yet twelve hours to spare; I can devote them to that.\"") + " " + Q8("\"Why, you are a man of heart!\"") + " " + Q8("\"Sometimes,\" replied Phileas Fogg, quietly; \"when I have the time.\""), "▶ Go on")),
vPuzzle("⏱️ Twelve hours", "Mr Fogg has two days in hand from the Mongolia, and the elephant has saved some of the time the railway lost. How many hours does he say he can spare for her?", ["Twelve", "Two", "Forty-eight"], 0, ["", "More than that.", "Not that many."], { yes: "✓ Twelve hours, to save a stranger's life: and he does not hesitate." })
] });
E8_CH.push({ n: "XIII", t: "In which Passepartout Receives a New Proof that Fortune Favors the Brave", tune: "e8largo", keep: ["e8_hat", "Mr Fogg's hat, with a hole in it", "🎩"],
intro: "The forest by the pagoda of Pillaji, at dusk", words: "Four men against a temple full of priests and guards: Mr Fogg, Sir Francis Cromarty, Passepartout, and the guide.",
cast: [e8Guide(e8At("pillaji", -16, -22), Math.PI / 2, { key: "guide2" }), e8Crom(e8At("pillaji", -18, -18), Math.PI / 2, { key: "crom2" }), e8Fogg(e8At("pillaji", -12, -18), -Math.PI / 2, { key: "fogg2" }), e8Pass(e8At("pillaji", -14, -24), 0, { key: "pass2" })],
steps: [
vRead(),
vTalk("The Parsee guide", "Mr Fogg has decided; Sir Francis is with him. Will the guide help, or betray them? Ask him.", vC("🤝 Command me", Q8("\"Officers,\" replied the guide, \"I am a Parsee, and this woman is a Parsee. Command me as you will.\"") + " " + Q8("\"However,\" resumed the guide, \"it is certain, not only that we shall risk our lives, but horrible tortures, if we are taken.\"") + " " + Q8("\"That is foreseen,\" replied Mr. Fogg. \"I think we must wait till night before acting.\""), "▶ Who is she?")),
vNote("👤 Aouda", "The guide tells them who she is: a celebrated beauty of the Parsee race, the daughter of a wealthy Bombay merchant, brought up in the English manner in that city; an orphan, married against her will to the old rajah of Bundelcund, and a widow three months later. " + Q8("Her name was Aouda."), "▶ Creep to the glade"),
vSpot("The pyre in the glade", "By the light of the torches, look at the glade: the stream, the pyre, the pagoda behind.", { say: e8A("🔥 The pyre of sandal-wood; on it the embalmed body of the rajah, to be burned with his wife.", "🔥 The great pile of sandal-wood where the priests mean to end it all at dawn.") }),
vNote("🗡️ The guards", Q8("In the background, among the trees, the pagoda of Pillaji loomed distinctly. Much to the guide's disappointment, the guards of the rajah, lighted by torches, were watching at the doors and marching to and fro with naked sabres; probably the priests, too, were watching within."), "▶ Wait"),
vHold(e8At("pillaji", -14, -22), 8, "They lie down at the foot of a tree, and wait. Wait with them, in the dark.", { r: 5, say: "🌑 " + Q8("They waited till midnight; but no change took place among the guards, and it became apparent that their yielding to sleep could not be counted on. The other plan must be carried out; an opening in the walls of the pagoda must be made.") }),
vGo(e8At("pillaji", 10, -76), "Go round by the back of the pagoda, the long way, in the dark: there is no guard there, and no door or window.", { r: 5 }),
vFind("knife", e8At("pillaji", 8, -74), "A pocket-knife", "Only pocket-knives to dig with. Take one.", { verb: "take it" }),
vGather("stone", e8At("pillaji", 10, -74), 4, "a loosened brick", "The wall is brick and wood. Loosen the bricks, quietly: four of them, and the rest will follow.", { spread: 2, verb: "work it loose", each: "Out, quietly." }),
e8Carry("Look in through the opening", e8Into("e8_temple", 0, -12.4, 0, "🕳️ <b>Through the opening:</b> the inner room, dim, a lamp, flowers; and the young woman lying there.", 0)),
vSpot("The inner room", "Look at the inner room through the hole.", { room: "e8_temple" }),
vNote("📢 A cry!", Q8("They set noiselessly to work, and the Parsee on one side and Passepartout on the other began to loosen the bricks so as to make an aperture two feet wide. They were getting on rapidly, when suddenly a cry was heard in the interior of the temple, followed almost instantly by other cries replying from the outside."), "▶ Back! Into the wood!"),
e8Carry("Back into the wood", e8Land("pillaji", -14, -22, "🌳 Back under the trees. Guards round the back of the pagoda now: no way in.", "in")),
vTalk("Phileas Fogg", "Sir Francis says there is nothing to do but go. Mr Fogg says something else.", vC("⏳ Stop", Q8("\"We have nothing to do but to go away,\" whispered Sir Francis.") + " " + Q8("\"Stop,\" said Fogg. \"I am only due at Allahabad tomorrow before noon.\"") + " " + Q8("\"But what can you hope to do?\" asked Sir Francis. \"In a few hours it will be daylight, and—\"") + " " + Q8("\"The chance which now seems lost may present itself at the last moment.\""), "▶ Wait")),
vTalk("Passepartout", "Passepartout has climbed into the lower branches of a tree. He has an idea. Ask him.", vC("💡 Why not?", Q8("He had commenced by saying to himself, \"What folly!\" and then he repeated, \"Why not, after all? It's a chance,—perhaps the only one; and with such sots!\"") + " He will not say what. He slips down through the branches, and is gone into the dark.", "▶ Dawn")),
vHold(e8At("pillaji", 0, -30), 10, "The sky lightens. The tambourines begin; the doors of the pagoda swing open. Stand at the back of the crowd with Mr Fogg and Sir Francis.", { r: 6, say: e8A("🔥 " + Q8("Then a torch was brought, and the wood, heavily soaked with oil, instantly took fire."), "🔥 The priests light the great pile. Mr Fogg starts forward: Sir Francis and the guide hold him back. And then...") }),
vNote("👻 The rajah rises", Q8("The old rajah was not dead, then, since he rose of a sudden, like a spectre, took up his wife in his arms, and descended from the pyre in the midst of the clouds of smoke, which only heightened his ghostly appearance.") + " " + Q8("The resuscitated rajah approached Sir Francis and Mr. Fogg, and, in an abrupt tone, said, \"Let us be off!\""), "▶ Who is it?"),
vPuzzle("🎭 The rajah", "Who is the 'rajah' who has come down from the pyre with the young woman in his arms?", ["Passepartout, disguised in the smoke and the dark", "The rajah, come back to life", "The guide"], 0, ["", "Look closer at him.", "The guide is beside you."], { yes: "✓ " + Q8("It was Passepartout himself, who had slipped upon the pyre in the midst of the smoke and, profiting by the still overhanging darkness, had delivered the young woman from death! It was Passepartout who, playing his part with a happy audacity, had passed through the crowd amid the general terror.") }),
e8Ride("Away on Kiouni, before the priests understand!", "elephant", E8_PORT.pillaji, E8_PORT.allahabad, "🐘 <b>Away!</b> Kiouni plunges into the forest with all five on his back.", [[0.295, "💥 A shout behind: the trick is found out. A ball whistles through Mr Fogg's hat!"], [0.303, "🌄 Out of range of the bullets and arrows: the forest, then a vast plain."]], e8Land("allahabad", -6, -30, "🚉 <b>Allahabad,</b> ten in the morning. The railway begins again here.", "in"), { pad0: 0.002 })
] });
E8_CH.push({ n: "XIV", t: "In which Phileas Fogg Descends the Whole Length of the Beautiful Valley of the Ganges Without Ever Thinking of Seeing it", tune: "e8morning", keep: ["e8_ganges", "A cup of Ganges water", "🏺"],
intro: "Allahabad station", words: "The young woman is still senseless, under the drugs the priests gave her. At Allahabad she is laid in a waiting-room of the station, and Passepartout is sent to buy her everything she needs for a long journey.",
setup: function (f) { var I = VRN_IN.e8_car; E8.carView = "india"; if (I && I.view)
I.view("india"); e8Out("e8_car", "calcutta", 0, -50, "Down onto the platform at Calcutta."); },
cast: [e8Fogg(e8At("allahabad", 4, -52), Math.PI), e8Guide(e8At("allahabad", -6, -46), 0, { key: "guide3" }), e8Pass(e8At("allahabad", -30, -60), 0, { key: "pass3" }), e8Kiouni(e8At("allahabad", -10, -44)),
e8Aouda(e8In("e8_car", -8.6, -1.3), -Math.PI / 2), e8Fogg(e8In("e8_car", -7.2, -1.3), Math.PI / 2, { key: "foggc" }), e8Crom(e8In("e8_car", -7.2, 1.3), Math.PI / 2, { key: "cromc" })],
steps: [
vRead(),
vGather("shirt", e8At("allahabad", -30, -62), 3, "a dress, a shawl or a fur", "Help Passepartout in the streets of Allahabad: a dress, a shawl, some furs for the young lady.", { spread: 3, verb: "buy it", each: "Bought: Mr Fogg gave unlimited credit." }),
vTalk("Phileas Fogg", "At the station, Mr Fogg pays the guide what was agreed, and not a farthing more. Passepartout is astonished. Then Mr Fogg speaks again.", vC("🐘 He is yours", Q8("\"Parsee,\" said he to the guide, \"you have been serviceable and devoted. I have paid for your service, but not for your devotion. Would you like to have this elephant? He is yours.\"") + " " + Q8("The guide's eyes glistened.") + " " + Q8("\"Your honour is giving me a fortune!\" cried he.") + " " + Q8("\"Take him, guide,\" returned Mr. Fogg, \"and I shall still be your debtor.\""), "▶ Goodbye, Kiouni")),
vGather("sugar", e8At("allahabad", -10, -46), 3, "a lump of sugar", "Say goodbye to Kiouni: three lumps of sugar.", { spread: 2, verb: "give it to Kiouni", each: "Kiouni rumbles." }),
vNote("🐘 Goodbye, Kiouni", Q8("\"Good!\" exclaimed Passepartout. \"Take him, friend. Kiouni is a brave and faithful beast.\" And, going up to the elephant, he gave him several lumps of sugar, saying, \"Here, Kiouni, here, here.\"") + " " + Q8("The elephant grunted out his satisfaction, and, clasping Passepartout around the waist with his trunk, lifted him as high as his head. Passepartout, not in the least alarmed, caressed the animal, which replaced him gently on the ground."), "▶ All aboard for Benares"),
e8Carry("Into the train for Benares and Calcutta", e8Into("e8_car", -10, 0, -Math.PI / 2, "🚂 <b>The train for Benares.</b> Aouda has the best seat.")),
vTalk("Aouda", "On the way, the young woman wakes. Speak to her.", vC("🙏 Aouda", Q8("Aouda pathetically thanked her deliverers, rather with tears than words; her fine eyes interpreted her gratitude better than her lips. Then, as her thoughts strayed back to the scene of the sacrifice, and recalled the dangers which still menaced her, she shuddered with terror."), "▶ Mr Fogg?"), { room: "e8_car" }),
vPuzzle("🏙️ Safe", "Mr Fogg offers to take her somewhere she will be safe from the priests' vengeance. Where?", ["To Hong Kong, where her cousin is one of the principal merchants", "Back to Bombay", "To London"], 0, ["", "The priests would find her there.", "Not yet."], { yes: "✓ " + Q8("She had, it seems, a Parsee relation, who was one of the principal merchants of Hong Kong, which is wholly an English city, though on an island on the Chinese coast.") }),
vTalk("Sir Francis Cromarty", "Benares, half-past twelve: Sir Francis's journey ends here. Say goodbye.", vC("👋 Benares", Q8("Benares was Sir Francis Cromarty's destination, the troops he was rejoining being encamped some miles northward of the city.") + " He wishes Mr Fogg all success, and hopes he will come that way again in a less original but more profitable fashion. Mr Fogg lightly presses his hand.", "▶ Goodbye, Sir Francis"), { room: "e8_car" }),
vSpot("The carriage window", "Down the valley of the Ganges: look out of the window, since Mr Fogg will not.", { room: "e8_car", say: "🛕 " + Q8("Elephants were bathing in the waters of the sacred river") }),
e8Ride("Down the valley of the Ganges to Calcutta", "train", E8_PORT.allahabad, E8_PORT.calcutta, "🚂 The train whirls on down the valley of the Ganges.", [[0.32, "🌾 Behar: barley, wheat, corn; villages; forests."], [0.33, "🏭 Patna; then Monghir, as English as Manchester, its chimneys smoking."], [0.343, "🌃 Night: the Ganges, the Hooghly, and the lights of Calcutta."]], e8Land("calcutta", -4, -32, "🏙️ <b>Calcutta,</b> seven in the morning. The steamer for Hong Kong leaves at noon.")),
vPuzzle("📒 Neither ahead nor behind", "Mr Fogg was due at Calcutta on the 25th of October, and arrived on the 25th. What became of the two days he gained on the Mongolia?", ["Lost crossing India: the fifty miles of missing railway, and Aouda", "Still in hand", "He lost four days"], 0, ["", "Look at the dates again.", "Not as bad as that."], { yes: "✓ " + Q8("He was therefore neither behind-hand nor ahead of time.") })
] });
E8_CH.push({ n: "XV", t: "In which the Bag of Banknotes Disgorges Some Thousands of Pounds More", tune: "e8morning", keep: ["e8_bail", "A receipt for two thousand pounds' bail", "🧾"],
intro: "Calcutta station", words: "Five hours in Calcutta. Mr Fogg means to take Aouda to the steamer at once. A policeman has other ideas.",
cast: [{ key: "police", name: "A policeman of Calcutta", role: "soldier", at: e8At("calcutta", -2, -36), ry: Math.PI, persona: "You are a constable of the Calcutta police in 1872, polite and firm, with orders to bring Mr Phileas Fogg and his servant before the magistrate.", greet: "Mr. Phileas Fogg?" },
e8Fogg(e8At("calcutta", -4, -30), 0), e8Pass(e8At("calcutta", -6, -30), 0), e8Aouda(e8At("calcutta", -5, -28), 0),
{ key: "judge", name: "Judge Obadiah", role: "judge", at: e8In("e8_court", 0, -11), ry: 0, persona: "You are Judge Obadiah of the court at Calcutta in 1872, from Jules Verne's Around the World in Eighty Days (the book only): a fat, round man, absent-minded about wigs, stern about the law that protects the religions of India.", greet: "The first case." },
{ key: "clerk", name: "Oysterpuff, the clerk", role: "clerk", at: e8In("e8_court", -9, -4.6), ry: 0, persona: "You are Oysterpuff, the clerk of Judge Obadiah's court at Calcutta in 1872, who has just found your wig on the judge's head.", greet: "Silence in court!" },
e8Fogg(e8In("e8_court", 8.6, -4), Math.PI, { key: "foggct" }), e8Pass(e8In("e8_court", 9.6, -4), Math.PI, { key: "passct" }), e8Aouda(e8In("e8_court", 6, 2), Math.PI, { key: "aoudact" }),
{ key: "priests", name: "A priest of Malabar Hill", role: "priest", at: e8In("e8_court", -6, -1), ry: Math.PI * 0.9, persona: "You are one of the three priests of the pagoda on Malabar Hill in Bombay in 1872, brought to Calcutta by Mr Fix to complain that a Frenchman walked into your temple with his shoes on.", greet: "He entered the sanctuary shod!" },
e8Fix(e8In("e8_court", 12, 6), Math.PI)],
steps: [
vRead(),
vTalk("A policeman of Calcutta", "As they leave the station a policeman stops them.", vC("👮 Mr Phileas Fogg?", Q8("Just as he was leaving the station a policeman came up to him, and said, \"Mr. Phileas Fogg?\"") + " " + Q8("\"Is this man your servant?\" added the policeman, pointing to Passepartout.") + " " + Q8("Mr. Fogg betrayed no surprise whatever. The policeman was a representative of the law, and law is sacred to an Englishman. Passepartout tried to reason about the matter, but the policeman tapped him with his stick, and Mr. Fogg made him a signal to obey."), "▶ Go with him")),
vSpot("The court-house", "They are taken to the court-house and shut in a room to wait. Go in.", { say: "🔒 " + Q8("\"Why, we are prisoners!\" exclaimed Passepartout, falling into a chair.") }),
vTalk("Aouda", "Aouda is in tears. Hear her, and Mr Fogg.", vC("💛 It is on my account", Q8("Aouda, with an emotion she tried to conceal, said to Mr. Fogg: \"Sir, you must leave me to my fate! It is on my account that you receive this treatment, it is for having saved me!\"") + " " + Q8("\"But the steamer leaves at noon!\" observed Passepartout, nervously.") + " " + Q8("\"We shall be on board by noon,\" replied his master, placidly."), "▶ Half-past eight: the court"), { room: "e8_court" }),
vTalk("Judge Obadiah", "Judge Obadiah comes in, takes a wig from its nail and puts it on. Something is wrong.", vC("🎩 Not my wig", Q8("\"The first case,\" said he. Then, putting his hand to his head, he exclaimed, \"Heh! This is not my wig!\"") + " " + Q8("\"No, your worship,\" returned the clerk, \"it is mine.\"") + " " + Q8("\"My dear Mr. Oysterpuff, how can a judge give a wise sentence in a clerk's wig?\"") + " " + Q8("The wigs were exchanged."), "▶ The charge")),
vSpot("The big clock over the judge", "Passepartout cannot stop looking at the clock. Look at it.", { room: "e8_court", say: "🕰️ " + Q8("Passepartout was getting nervous, for the hands on the face of the big clock over the judge seemed to go around with terrible rapidity.") }),
vTalk("A priest of Malabar Hill", "Three priests come forward as the complainants. Passepartout thinks it is about Pillaji. Listen.", vC("🛕 Which pagoda?", Q8("\"What victim?\" said Judge Obadiah. \"Burn whom? In Bombay itself?\"") + " " + Q8("\"Bombay?\" cried Passepartout.") + " " + Q8("\"Certainly. We are not talking of the pagoda of Pillaji, but of the pagoda of Malabar Hill, at Bombay.\""), "▶ The evidence"), { room: "e8_court" }),
vSpot("The clerk's table", "Look at the evidence on the clerk's table.", { room: "e8_court" }),
vTalk("Oysterpuff, the clerk", "The clerk unties the bundle.", vC("🥿 The shoes", Q8("\"And as a proof,\" added the clerk, \"here are the desecrator's very shoes, which he left behind him.\"") + " " + Q8("Whereupon he placed a pair of shoes on his desk.") + " " + Q8("\"My shoes!\" cried Passepartout, in his surprise permitting this imprudent exclamation to escape him."), "▶ Oh, Passepartout"), { room: "e8_court" }),
vPuzzle("🕵️ Who brought them?", "How did the priests of Bombay come to be in Calcutta, with the shoes, on the very morning Mr Fogg arrived?", ["Fix found them, promised them damages, and sent them on by train", "They walked", "The judge sent for them"], 0, ["", "Far too far.", "The judge knew nothing about it."], { yes: "✓ Fix delayed for twelve hours at Bombay, and brought the priests to Calcutta to stop Mr Fogg there until the warrant came." }),
vNote("⚖️ The sentence", Q8("\"Inasmuch,\" resumed the judge, \"as the English law protects equally and sternly the religions of the Indian people, and as the man Passepartout has admitted that he violated the sacred pagoda of Malabar Hill, at Bombay, on the 20th of October, I condemn the said Passepartout to imprisonment for fifteen days and a fine of three hundred pounds.\"") + " " + Q8("\"Three hundred pounds!\" cried Passepartout, startled at the largeness of the sum.") + " And the master, who must answer for his servant, to eight days and a hundred and fifty pounds.", "▶ Mr Fogg rises"),
vTalk("Phileas Fogg", "Mr Fogg has not lifted an eyebrow. He rises.", vC("💷 Bail", Q8("Just as the clerk was calling the next case, he rose, and said, \"I offer bail.\"") + " " + Q8("Fix's blood ran cold, but he resumed his composure when he heard the judge announce that the bail required for each prisoner would be one thousand pounds."), "▶ Count it out"), { room: "e8_court" }),
vPuzzle("💷 Two prisoners", "Bail is a thousand pounds for each prisoner. How much does Mr Fogg take out of the carpet-bag?", ["Two thousand pounds", "One thousand", "Four hundred and fifty"], 0, ["", "There are two of them.", "That is the fines."], { yes: "✓ " + Q8("\"This sum will be restored to you upon your release from prison,\" said the judge. \"Meanwhile, you are liberated on bail.\"") }),
vFind("shoe", e8In("e8_court", -9, -3.8), "Passepartout's shoes", "Fetch Passepartout's shoes from the clerk's table.", { room: "e8_court", verb: "take them" }),
vNote("🥿 Pretty dear shoes", Q8("\"But let them at least give me back my shoes!\" cried Passepartout angrily.") + " " + Q8("\"Ah, these are pretty dear shoes!\" he muttered, as they were handed to him. \"More than a thousand pounds apiece; besides, they pinch my feet.\"") + " And they are aboard the Rangoon before noon; and so is Fix.", "▶ To the Rangoon")
] });
E8_CH.push({ n: "XVI", t: "In which Fix Does not Seem to Understand in the Least What is Said to him", tune: "e8hebrides", keep: ["e8_gin", "A glass from the Rangoon's bar", "🥃"], jump: 1,
start: { room: "e8_deck" }, intro: "The Rangoon, in the Bay of Bengal", words: "The Rangoon steams for Singapore and Hong Kong. Aouda grows to know her protector, who answers her with the greatest coldness and sees that nothing is ever wanting for her comfort. Fix has the warrant still behind him; and Fogg will soon be off English soil.",
setup: function (f) { e8Ship("Rangoon", "calcutta", 16); },
cast: [e8Aouda(e8In("e8_deck", -30, -2), Math.PI / 2), e8Fogg(e8In("e8_deck", -30, 2), Math.PI / 2), e8Pass(e8In("e8_deck", 30, 2), -Math.PI / 2, { wander: 2 }), e8Fix(e8In("e8_deck", 14, -3), Math.PI / 2)],
steps: [
vRead(),
vTalk("Aouda", "On deck, Aouda is with Mr Fogg. Speak to her.", vC("💛 Aouda", "She tells you of Bombay, and of her cousin Jeejeeh at Hong Kong. Mr Fogg listens, and says almost nothing, and is there, every day, at certain hours, to see that she wants for nothing.", "▶ Go on"), { room: "e8_deck" }),
vTalk("Phileas Fogg", "Ask Mr Fogg how the voyage goes.", vC("📒 To the day", "'The Rangoon is due at Singapore on the 31st, at Hong Kong on the 6th of November. The Carnatic leaves Hong Kong for Yokohama the same day.' He makes it sound perfectly simple.", "▶ Go on"), { room: "e8_deck" }),
vSpot("The engine-room skylight", "Fix is hiding from Passepartout. Look for him near the engine-room.", { room: "e8_deck" }),
vTalk("Passepartout", "Passepartout is walking in the forward part of the steamer. Fix rushes up to him, as if astonished.", vC("😮 You here, on the Rangoon?", Q8("Fix emerged from his cabin and went on deck. Passepartout was promenading up and down in the forward part of the steamer. The detective rushed forward with every appearance of extreme surprise, and exclaimed, \"You here, on the Rangoon?\"") + " " + Q8("\"What, Monsieur Fix, are you on board?\" returned the really astonished Passepartout, recognising his crony of the Mongolia. \"Why, I left you at Bombay, and here you are, on the way to Hong Kong! Are you going round the world too?\""), "▶ Go on"), { room: "e8_deck" }),
vTalk("Mr Fix", "Fix has an excuse ready.", vC("🤢 A trifle of sea-sickness", Q8("\"No, no,\" replied Fix; \"I shall stop at Hong Kong—at least for some days.\"") + " " + Q8("\"Hum!\" said Passepartout, who seemed for an instant perplexed. \"But how is it I have not seen you on board since we left Calcutta?\"") + " " + Q8("\"Oh, a trifle of sea-sickness—I've been staying in my berth. The Gulf of Bengal does not agree with me as well as the Indian Ocean. And how is Mr. Fogg?\""), "▶ Go on"), { room: "e8_deck" }),
vTalk("Passepartout", "Passepartout has news, and cannot keep it.", vC("👤 A young lady", Q8("\"As well and as punctual as ever, not a day behind time! But, Monsieur Fix, you don't know that we have a young lady with us.\"") + " " + Q8("\"A young lady?\" replied the detective, not seeming to comprehend what was said.") + " Passepartout tells him everything: the pagoda, the elephant, the rescue, the court. Fix already knows it, and pretends not to.", "▶ Go on"), { room: "e8_deck" }),
vPuzzle("🕵️ Fix's hope", "Fix wonders whether Aouda could help him. What hope does he have?", ["That Mr Fogg has carried her off, and could be held for that in Hong Kong", "That she is a thief too", "That she will lend him money"], 0, ["", "She is nothing of the kind.", "Not Fix's way."], { yes: "✓ " + Q8("\"But does your master propose to carry this young woman to Europe?\"") + " " + Q8("\"Not at all. We are simply going to place her under the protection of one of her relatives, a rich merchant at Hong Kong.\"") + " " + Q8("\"Nothing to be done there,\" said Fix to himself, concealing his disappointment. \"A glass of gin, Mr. Passepartout?\"") }),
vSpot("The log-board", "The Rangoon is due at Singapore tomorrow. Read the day on the log-board.", { room: "e8_deck", say: "📋 " + Q8("It was now the 30th of October, and on the following day the Rangoon was due at Singapore.") }),
vHold(e8In("e8_deck", 30, 0), 6, "Stand at the bow with Passepartout as the Rangoon comes in towards the Straits.", { room: "e8_deck", r: 5, say: "🌴 The island of Singapore ahead: green hills, palms, a white town." })
] });
E8_CH.push({ n: "XVII", t: "Showing What Happened on the Voyage from Singapore to Hong Kong", tune: "e8hebrides", keep: ["e8_nutmeg", "A nutmeg from Singapore", "🌰"],
intro: "The Rangoon, from Singapore to Hong Kong", words: "Since the Rangoon left Calcutta, Fix has turned up everywhere. Passepartout has been thinking about it, and has worked it out, or thinks he has.",
cast: [e8Pass(e8In("e8_deck", 6, 3), Math.PI / 2), e8Fix(e8In("e8_deck", 8, -3), -Math.PI / 2), e8Aouda(e8In("e8_deck", -30, -2), Math.PI / 2), e8Fogg(e8In("e8_deck", -30, 2), Math.PI / 2)],
steps: [
vRead(),
vTalk("Passepartout", "Passepartout has a theory about Fix. Hear it.", vC("💡 A spy!", Q8("\"It's clear!\" repeated the worthy servant to himself, proud of his shrewdness. \"He's a spy sent to keep us in view! That isn't quite the thing, either, to be spying Mr. Fogg, who is so honourable a man! Ah, gentlemen of the Reform, this shall cost you dear!\""), "▶ Is he right?"), { room: "e8_deck" }),
vPuzzle("🕵️ Who sent him?", "Passepartout thinks Fix was sent by the gentlemen of the Reform Club to spy on Mr Fogg. Who really sent him?", ["Scotland Yard, to arrest Mr Fogg for the bank robbery", "The Reform Club", "The Peninsular Company"], 0, ["", "That is what Passepartout thinks.", "That is only Fix's story."], { yes: "✓ Passepartout is half right: a spy, yes; for the wrong reason. He decides to say nothing to his master." }),
vNote("🌴 Singapore", "At Singapore Mr Fogg takes Aouda for a drive in a carriage drawn by two horses: palms and cloves, nutmeg trees, the smell of spice; monkeys in the branches, tigers in the jungles, they say. Fix follows them, unseen; and Passepartout, laughing in his sleeve at Fix, goes about his usual errands.", "▶ Back aboard"),
vTalk("Mr Fix", "Passepartout chaffs Fix at every turn. Watch them.", vC("😄 Not at my own expense", Q8("\"Mr. Fix,\" said he, in a bantering tone, \"shall we be so unfortunate as to lose you when we get to Hong Kong?\"") + " " + Q8("\"Ah, if you would only go on with us! An agent of the Peninsular Company, you know, can't stop on the way! You were only going to Bombay, and here you are in China. America is not far off, and from America to Europe is only a step.\"") + " " + Q8("\"Yes, and no,\" returned Fix; \"there is good and bad luck in such things. But you must understand that I don't travel at my own expense.\"") + " " + Q8("\"Oh, I am quite sure of that!\" cried Passepartout, laughing heartily."), "▶ Go on"), { room: "e8_deck" }),
vSpot("The engine-room skylight", "Passepartout leans on the railing over the engine-room. Look down with him.", { room: "e8_deck", say: "💨 " + Q8("One day he was leaning on the railing of the engine-room, and was observing the engine, when a sudden pitch of the steamer threw the screw out of the water. The steam came hissing out of the valves; and this made Passepartout indignant.") }),
vNote("💨 Oh, these English!", Q8("\"The valves are not sufficiently charged!\" he exclaimed. \"We are not going. Oh, these English! If this was an American craft, we should blow up, perhaps, but we should at all events go faster!\""), "▶ The weather turns"),
e8Ride("Singapore to Hong Kong: the China Sea, and a gale", "steamer", E8_PORT.calcutta, E8_PORT.hongkong, "🚢 <b>The Rangoon</b>: Singapore, and on into the China Sea.", [[0.39, "🌴 Singapore: coaling, a drive among the palms and the nutmeg-trees."], [0.42, "🌊 The wind obstinately in the north-west: a gale. The Rangoon rolls heavily."], [0.45, "⛈️ A tempest on the 3rd of November: the captain reduces speed. Twenty-four hours lost."], [0.465, "⛰️ The coast of China; the Lyeemoon passage; Hong Kong."]], e8Into("e8_deck", 28, 0, -Math.PI / 2, "⚓ <b>The Rangoon,</b> entering Hong Kong harbour: a pilot comes aboard."), { pad0: 0.004 }),
vPuzzle("📒 A day late", "The storm has made the Rangoon twenty-four hours late. If the Carnatic sailed for Yokohama on time, what would Mr Fogg have to do?", ["Wait a week in Hong Kong for the next steamer, and lose the wager", "Nothing at all", "Take the train to Japan"], 0, ["", "Every hour counts.", "There is no train to Japan!"], { yes: "✓ So everything depends on the Carnatic." })
] });
E8_CH.push({ n: "XVIII", t: "In which Phileas Fogg, Passepartout, and Fix Go Each About his Business", tune: "e8fortune", keep: ["e8_pilot", "The pilot's good news", "⚓"],
intro: "Hong Kong harbour, the 6th of November", words: "A pilot has come aboard. Passepartout is dying to ask him when the Yokohama steamer leaves, and dares not.",
setup: function (f) { e8Ship("Rangoon", "hongkong", -24); },
cast: [{ key: "pilot", name: "The pilot of Hong Kong", role: "bunsby", at: e8In("e8_deck", 36, 1), ry: -Math.PI / 2, persona: "You are a harbour pilot of Hong Kong in 1872, bringing the steamer Rangoon in through the junks and sampans. You know every ship in the port: the Carnatic, for Yokohama, is still here, repairing a boiler.", greet: "Mind the junks, mind the junks. Steady as she goes." },
e8Fogg(e8In("e8_deck", 30, -2), Math.PI / 2), e8Pass(e8In("e8_deck", 28, 2), -Math.PI / 2), e8Fix(e8In("e8_deck", 22, 3), Math.PI),
e8Aouda(e8At("hongkong", 2, -60), Math.PI, { key: "aoudah" }), e8Fogg(e8At("hongkong", 4, -60), Math.PI, { key: "foggh" }),
{ key: "broker", name: "A broker at the Exchange", role: "gent", at: e8At("hongkong", -20, -62), ry: Math.PI / 2, persona: "You are a broker at the Exchange in Victoria, Hong Kong, in 1872. You knew the great Parsee merchant Jeejeeh: he retired two years ago with an immense fortune and went to live in Europe, in Holland they say.", greet: "Jeejeeh? Oh, he's gone, sir. Two years ago." }],
steps: [
vRead(),
vTalk("The pilot of Hong Kong", "Mr Fogg, bolder than his servant, goes to the pilot and asks quietly when a steamer will leave for Yokohama.", vC("⚓ Tomorrow", Q8("Mr. Fogg, bolder than his servant, did not hesitate to approach the pilot, and tranquilly ask him if he knew when a steamer would leave Hong Kong for Yokohama.") + " " + Q8("\"At high tide to-morrow morning,\" answered the pilot.") + " " + Q8("\"Ah!\" said Mr. Fogg, without betraying any astonishment.") + " " + Q8("\"Yes, sir; but they had to repair one of her boilers, and so her departure was postponed till to-morrow.\""), "▶ Passepartout!"), { room: "e8_deck" }),
vNote("🤝 The best of good fellows", Q8("\"Thank you,\" returned Mr. Fogg, descending mathematically to the saloon.") + " " + Q8("Passepartout clasped the pilot's hand and shook it heartily in his delight, exclaiming, \"Pilot, you are the best of good fellows!\"") + " " + Q8("The pilot probably does not know to this day why his responses won him this enthusiastic greeting."), "▶ Ashore"),
e8Carry("Ashore at Hong Kong", e8Land("hongkong", -6, -26, "🏙️ <b>Hong Kong.</b> One o'clock: the Rangoon is at the quay. The Carnatic sails at five tomorrow morning: sixteen hours.")),
vPuzzle("⏱️ Twenty-four hours", "Mr Fogg is twenty-four hours behind his time. Why is he still all right?", ["The Carnatic waited for her boiler, and the Pacific steamer waits for the Carnatic at Yokohama", "He isn't", "The Rangoon was early"], 0, ["", "He would be, but for the boiler.", "She was late."], { yes: "✓ " + Q8("Chance had strangely favoured Phileas Fogg, for had not the Carnatic been forced to lie over for repairing her boilers, she would have left on the 6th of November, and the passengers for Japan would have been obliged to await for a week the sailing of the next steamer.") }),
vSpot("The Club Hotel", "Mr Fogg takes Aouda by palanquin to the Club Hotel, and leaves Passepartout there with her. Go there."),
vTalk("A broker at the Exchange", "Mr Fogg goes to the Exchange to find Aouda's cousin Jeejeeh. Ask the broker.", vC("🏦 Gone to Europe", Q8("Mr. Fogg repaired to the Exchange, where, he did not doubt, every one would know so wealthy and considerable a personage as the Parsee merchant.") + " Jeejeeh retired from business two years ago with an immense fortune, and has gone to live in Europe: in Holland, they think.", "▶ Back to Aouda")),
vTalk("Aouda", "Mr Fogg tells Aouda. She is silent a moment; then she asks.", vC("🌍 Go on to Europe", Q8("Aouda at first said nothing. She passed her hand across her forehead, and reflected a few moments. Then, in her sweet, soft voice, she said: \"What ought I to do, Mr. Fogg?\"") + " " + Q8("\"It is very simple,\" responded the gentleman. \"Go on to Europe.\"") + " " + Q8("\"You do not intrude, nor do you in the least embarrass my project. Passepartout!\""), "▶ 'Monsieur?'")),
vNote("🎟️ Three cabins", Q8("Passepartout, delighted that the young woman, who was very gracious to him, was going to continue the journey with them, went off at a brisk gait to obey his master's order.") + " His errand: three cabins on the Carnatic.", "▶ To the quay")
] });
E8_CH.push({ n: "XIX", t: "In which Passepartout Takes a Too Great Interest in his Master, and What Comes of it", tune: "e8fortune", keep: ["e8_pipe", "A long red clay pipe, never smoked", "🏮"],
intro: "The quays of Hong Kong, towards evening", words: "Passepartout goes off along the quays to take three cabins on the Carnatic. Fix is walking up and down there, disturbed and disappointed: the warrant has not come.",
cast: [e8Fix(e8At("hongkong", -22, -30), Math.PI / 2, { wander: 2 }), e8Pass(e8At("hongkong", -18, -28), -Math.PI / 2),
e8Fix(e8In("e8_tavern", -3, 2.8), Math.PI / 2, { key: "fixt" }), e8Pass(e8In("e8_tavern", -1.4, 2.8), -Math.PI / 2, { key: "passt" })],
steps: [
vRead(),
vTalk("Mr Fix", "Fix is on the quay where the Carnatic lies. Passepartout greets him.", vC("🚢 As far as America?", Q8("On reaching the quay where they were to embark on the Carnatic, he was not astonished to find Fix walking up and down. The detective seemed very much disturbed and disappointed.") + " " + Q8("\"Well, Monsieur Fix,\" said Passepartout, \"have you decided to go with us so far as America?\""), "▶ Go on")),
vNote("🚢 The Carnatic", "At the shipping office Passepartout learns that the Carnatic, her boiler mended early, will sail this evening at eight, not tomorrow morning. He must tell his master at once.", "▶ Tell Mr Fogg!"),
vTalk("Passepartout", "Fix stops him. 'Come and have a glass first: I must speak to you.' Go with them.", vC("🏮 A tavern", Q8("\"That will suit my master all the better,\" said Passepartout. \"I will go and let him know.\"") + " Fix takes his arm. 'I have something serious to tell you.' And he leads him into a tavern on the quay.", "▶ Into the tavern")),
vSpot("A tavern on the quay", "Go into the tavern with them."),
vSpot("The counter", "A long room, lanterns, some thirty customers drinking at little tables. Look round.", { room: "e8_tavern", say: e8A("🍶 " + Q8("At the small tables which were arranged about the room some thirty customers were drinking English beer, porter, gin, and brandy; smoking, the while, long red clay pipes stuffed with little balls of opium mingled with essence of rose."), "🍶 Sailors, merchants, men from every country drinking at little tables; at the back, a dim room where men lie asleep. Not a good place.") }),
vTalk("Mr Fix", "Fix and Passepartout sit down. Fix puts his hand on Passepartout's arm.", vC("🕵️ Who I am", Q8("Fix placed his hand upon Passepartout's arm, and, lowering his voice, said, \"You have guessed who I am?\"") + " " + Q8("\"Now that I know everything, my friend! Ah! that's very good. But go on, go on. First, though, let me tell you that those gentlemen have put themselves to a useless expense.\"") + " " + Q8("\"Useless!\" said Fix. \"You speak confidently. It's clear that you don't know how large the sum is.\""), "▶ 'Of course I do'"), { room: "e8_tavern" }),
vPuzzle("💷 How much?", "Passepartout says he knows how large the sum is. What does each of them mean by it?", ["Passepartout means the wager, twenty thousand pounds; Fix means the robbery, fifty-five thousand", "They both mean the wager", "They both mean the robbery"], 0, ["", "Fix isn't thinking of the wager at all.", "Passepartout has never heard of the robbery."], { yes: "✓ " + Q8("\"Of course I do,\" returned Passepartout. \"Twenty thousand pounds.\"") + " " + Q8("\"Fifty-five thousand!\" answered Fix, pressing his companion's hand.") }),
vTalk("Mr Fix", "Fix makes his offer.", vC("💰 Five hundred pounds", Q8("Fix pushed Passepartout back in his chair, and resumed: \"Fifty-five thousand pounds; and if I succeed, I get two thousand pounds. If you'll help me, I'll let you have five hundred of them.\"") + " " + Q8("\"Help you?\" cried Passepartout, whose eyes were standing wide open.") + " " + Q8("\"Yes; help me keep Mr. Fogg here for two or three days.\""), "▶ Passepartout's answer"), { room: "e8_tavern" }),
vTalk("Passepartout", "Passepartout thinks Fix is an agent of the Reform Club. Fix tells him the truth: a detective, and a warrant. Hear Passepartout's answer.", vC("✊ Never", Q8("\"Mr. Fix,\" he stammered, \"even should what you say be true—if my master is really the robber you are seeking for—which I deny—I have been, am, in his service; I have seen his generosity and goodness; and I will never betray him—not for all the gold in the world. I come from a village where they don't eat that kind of bread!\"") + " " + Q8("\"You refuse?\"") + " " + Q8("\"I refuse.\""), "▶ Go on"), { room: "e8_tavern" }),
vPuzzle("🤝 Loyal", "Fix has offered him five hundred pounds to betray his master. What does Passepartout say his village does not eat?", ["That kind of bread: the bread of a traitor", "Snails", "English pudding"], 0, ["", "He would eat those gladly.", "He has eaten worse."]),
vNote("💤 Fix's trick", e8A(Q8("Fix, seeing that he must, at all hazards, be separated from his master, wished to entirely overcome him. Some pipes full of opium lay upon the table. Fix slipped one into Passepartout's hand. He took it, put it between his lips, lit it, drew several puffs, and his head, becoming heavy under the influence of the narcotic, fell upon the table."), "Fix needs Passepartout out of the way, so that he cannot tell Mr Fogg that the Carnatic sails tonight. He keeps filling Passepartout's glass, and at last slips something into it. Passepartout's head grows heavy, and drops onto the table. He is fast asleep, and nothing will wake him."), "▶ Fix goes"),
vNote("🕵️ At last", "'At last!' says Fix to himself, seeing Passepartout senseless. 'Mr Fogg will not hear in time that the Carnatic sails tonight. And if he goes, he goes without this cursed Frenchman.' He pays the bill, and goes out.", "▶ Out")
] });
E8_CH.push({ n: "XX", t: "In which Fix Comes Face to Face with Phileas Fogg", tune: "e8fortune", keep: ["e8_no43", "A pilot-boat's number: 43", "⛵"], jump: 1,
start: e8St("hongkong", -6, -36, "e"), intro: "The quays of Hong Kong, the next morning", words: "Mr Fogg and Aouda have spent the evening buying what she needs for the voyage. In the morning, Passepartout has not come back to the hotel, and Mr Fogg's bell is not answered. They go down to the quay to the Carnatic.",
cast: [e8Fogg(e8At("hongkong", -4, -34), Math.PI / 2), e8Aouda(e8At("hongkong", -4, -36), Math.PI / 2), e8Fix(e8At("hongkong", 0, -30), -Math.PI / 2),
{ key: "bunsby", name: "John Bunsby, master of the Tankadere", role: "bunsby", at: e8At("hongkong", 38, -16), ry: Math.PI, persona: "You are John Bunsby, master of the pilot-boat Tankadere, No. 43, at Hong Kong in 1872: a man of forty-five, vigorous, sunburnt, with a sharp eye and an energetic face, who knows his business and his boat. You are tempted by Mr Fogg's offer of a hundred pounds a day.", greet: "Is your honour looking for a boat?" }],
steps: [
vRead(),
vTalk("Mr Fix", "Fix comes up to Mr Fogg on the quay, bowing.", vC("🎩 Face to face", Q8("At this moment a man who had been observing him attentively approached. It was Fix, who, bowing, addressed Mr. Fogg: \"Were you not, like me, sir, a passenger by the Rangoon, which arrived yesterday?\"") + " " + Q8("\"I was, sir,\" replied Mr. Fogg coldly. \"But I have not the honour—\""), "▶ Go on")),
vTalk("Aouda", "Aouda asks Fix if he has seen Passepartout.", vC("🚢 The Carnatic has gone", Q8("\"No,\" said Aouda. \"He has not made his appearance since yesterday. Could he have gone on board the Carnatic without us?\"") + " " + Q8("\"Without you, madam?\" answered the detective. \"Excuse me, did you intend to sail in the Carnatic?\"") + " " + Q8("\"So did I, madam, and I am excessively disappointed. The Carnatic, its repairs being completed, left Hong Kong twelve hours before the stated time, without any notice being given; and we must now wait a week for another steamer.\""), "▶ Mr Fogg?")),
vPuzzle("🧭 What now?", "Fix rejoices: a week in Hong Kong, and the warrant will come. What does Mr Fogg do?", ["Searches the harbour for any vessel that will carry him to Yokohama", "Waits a week at the Club Hotel", "Gives up and goes home"], 0, ["", "Not he.", "Never."], { yes: "✓ " + Q8("But Mr. Fogg, far from being discouraged, was continuing his search, resolved not to stop if he had to resort to Macao, when he was accosted by a sailor on one of the wharves.") }),
vSpot("The wharf of the pilot-boats", "Go along the wharves with Mr Fogg, to the pilot-boats."),
vTalk("John Bunsby, master of the Tankadere", "A sailor accosts Mr Fogg: is he looking for a boat?", vC("⛵ No. 43", Q8("\"Yes, your honour; a pilot-boat—No. 43—the best in the harbour.\"") + " " + Q8("\"Between eight and nine knots the hour. Will you look at her?\"") + " " + Q8("\"Your honour will be satisfied with her. Is it for a sea excursion?\""), "▶ 'To Yokohama'")),
vTalk("Phileas Fogg", "Mr Fogg tells him where.", vC("💷 A hundred pounds a day", Q8("The sailor leaned on the railing, opened his eyes wide, and said, \"Is your honour joking?\"") + " " + Q8("\"No. I have missed the Carnatic, and I must get to Yokohama by the 14th at the latest, to take the boat for San Francisco.\"") + " " + Q8("\"I offer you a hundred pounds per day, and an additional reward of two hundred pounds if I reach Yokohama in time.\""), "▶ The pilot thinks")),
vNote("💛 Not with you", Q8("Mr. Fogg turned to Aouda and asked her, \"You would not be afraid, would you, madam?\"") + " " + Q8("\"Not with you, Mr. Fogg,\" was her answer."), "▶ The pilot comes back"),
vPuzzle("🗺️ Shanghai", "Bunsby will not risk eight days in a little boat to Yokohama. But he knows that the San Francisco steamer does not start from Yokohama. Where does it start?", ["Shanghai: only eight hundred miles, along the coast", "Nagasaki", "Hong Kong"], 0, ["", "It puts in there, but starts further on.", "It has just gone from here!"], { yes: "✓ " + Q8("\"Why not?\" returned the pilot. \"The San Francisco steamer does not start from Yokohama. It puts in at Yokohama and Nagasaki, but it starts from Shanghai.\"") }),
vPuzzle("💷 What it may cost", "Four days to Shanghai at a hundred pounds a day, and the two hundred pounds reward if they arrive in time. What may the Tankadere cost Mr Fogg?", ["Six hundred pounds", "Four hundred pounds", "A thousand pounds"], 0, ["", "Don't forget the reward.", "Less than that."], { yes: "✓ " + Q8("\"It is a bargain. Are you the master of the boat?\"") }),
vNote("🤝 Fix comes too", "Mr Fogg turns to Fix: 'Sir, if you wish to profit by this boat...' Fix, who had decided to ask, accepts. And Mr Fogg leaves money at the police for a search for Passepartout, and the same at the French consul's.", "▶ Aboard the Tankadere")
] });
E8_CH.push({ n: "XXI", t: "In which the Master of the \"Tankadere\" Runs Great Risk of Losing a Reward of Two Hundred Pounds", tune: "e8storm", keep: ["e8_flag", "The flag at half-mast", "🚩"], jump: 1,
start: { room: "e8_tanka" }, intro: "The Tankadere, out of Hong Kong", words: "Eight hundred miles in a boat of twenty tons, at that time of year, in the China seas. John Bunsby believes in the Tankadere, which rides on the waves like a seagull.",
setup: function (f) { var I = VRN_IN.e8_tanka; if (I && I.storm)
I.storm.visible = false; },
cast: [{ key: "bunsby", name: "John Bunsby, master of the Tankadere", role: "bunsby", at: e8In("e8_tanka", -7.6, 0.8), ry: Math.PI / 2, persona: "You are John Bunsby, master of the pilot-boat Tankadere at sea between Hong Kong and Shanghai in November 1872: a fine seaman, proud of your boat, who has never seen a passenger like Mr Fogg.", greet: "All the sail the wind will let us, your honour." },
e8Fogg(e8In("e8_tanka", -2, -1), Math.PI / 2), e8Aouda(e8In("e8_tanka", -2, 1), Math.PI / 2), e8Fix(e8In("e8_tanka", 6, -1.2), -Math.PI / 2)],
steps: [
vRead(),
vTalk("Phileas Fogg", "Out of the harbour into the open sea. Mr Fogg speaks to the pilot.", vC("⛵ All possible speed", Q8("\"I do not need, pilot,\" said Phileas Fogg, when they got into the open sea, \"to advise you to use all possible speed.\"") + " " + Q8("\"Trust me, your honour. We are carrying all the sail the wind will let us. The poles would add nothing, and are only used when we are going into port.\""), "▶ Go on"), { room: "e8_tanka" }),
vSpot("The tiller", "Take the tiller a while, with Bunsby beside you.", { room: "e8_tanka" }),
vNote("🌙 The first night", Q8("Night came. The moon was entering her first quarter, and her insufficient light would soon die out in the mist on the horizon. Clouds were rising from the east, and already overcast a part of the heavens.") + " " + Q8("The pilot had hung out his lights, which was very necessary in these seas crowded with vessels bound landward; for collisions are not uncommon occurrences, and, at the speed she was going, the least shock would shatter the gallant little craft."), "▶ Go on", { on: function () { var I = VRN_IN.e8_tanka; if (I && I.night) {
I.night.visible = true;
if (I.night.userData.stars)
I.night.userData.stars.visible = true;
} } }),
vTalk("Mr Fix", "Fix wants to pay for his passage. Mr Fogg will not hear of it.", vC("💷 General expenses", "Fix offers to pay. " + Q8("\"No, sir,\" repeated Mr. Fogg, in a tone which did not admit of a reply. \"This enters into my general expenses.\"") + " " + Q8("Fix, as he bowed, had a stifled feeling, and, going forward, where he ensconced himself, did not open his mouth for the rest of the day."), "▶ The weather"), { room: "e8_tanka", on: function () { var I = VRN_IN.e8_tanka; if (I && I.night) {
I.night.visible = false;
if (I.night.userData.stars)
I.night.userData.stars.visible = false;
} } }),
vTalk("John Bunsby, master of the Tankadere", "Bunsby is looking at the sky, muttering. Ask him.", vC("🌀 A typhoon", Q8("John Bunsby long examined the threatening aspect of the heavens, muttering indistinctly between his teeth. At last he said in a low voice to Mr. Fogg, \"Shall I speak out to your honour?\"") + " 'A typhoon is coming.' " + Q8("\"Glad it's a typhoon from the south, for it will carry us forward.\""), "▶ Make ready"), { room: "e8_tanka" }),
vPuzzle("⛵ Before the storm", "A typhoon is coming. What does a good seaman do with his sails?", ["Take them all in but a storm jib, and run before the wind", "Hoist every sail", "Drop anchor in mid-ocean"], 0, ["", "The masts would go overboard.", "The sea is far too deep."], { yes: "✓ Every sail furled, the masts lowered, a single storm jib forward: and the Tankadere flies before the wind." }),
vHold(e8In("e8_tanka", -4, 0), 12, "The typhoon! Hold on by the mast. Neither Mr Fogg, nor Fix, nor Aouda will go below.", { room: "e8_tanka", r: 4, on: function () { var I = VRN_IN.e8_tanka; if (I && I.storm)
I.storm.visible = true; vbkTune("e8storm"); },
done: function () { var I = VRN_IN.e8_tanka; if (I && I.storm)
I.storm.visible = false; }, say: "🌀 " + Q8("John Bunsby had requested his passengers to go below; but this imprisonment in so narrow a space, with little air, and the boat bouncing in the gale, was far from pleasant. Neither Mr. Fogg, Fix, nor Aouda consented to leave the deck.") }),
vTalk("John Bunsby, master of the Tankadere", "The storm has blown itself out, but hours are lost. Bunsby suggests putting into a port on the coast. Mr Fogg has one word.", vC("🧭 To Shanghai!", "'To which port?' says Mr Fogg. " + Q8("\"Shanghai.\"") + " " + Q8("The pilot, at first, did not seem to comprehend; he could scarcely realise so much determination and tenacity. Then he cried, \"Well—yes! Your honour is right. To Shanghai!\""), "▶ On"), { room: "e8_tanka" }),
e8Ride("North along the coast of China under all sail", "tanka", E8_PORT.hongkong, E8_PORT.hongkong + 0.06, "⛵ <b>The Tankadere</b> flies north, every sail set.", [[0.49, "🌊 The coast in sight: a hundred miles from Shanghai, and one day."], [0.51, "🌬️ The wind falling. Forty-five miles, six hours: nine miles an hour wanted."]], e8Into("e8_tanka", -2, 0, -Math.PI / 2, "⛵ <b>Seven in the evening.</b> Three miles from Shanghai. And there, on the edge of the sea..."), { pad1: 0 }),
vNote("🚢 The steamer!", Q8("At this moment, also, a long black funnel, crowned with wreaths of smoke, appeared on the edge of the waters. It was the American steamer, leaving for Yokohama at the appointed time.") + " " + Q8("\"Confound her!\" cried John Bunsby, pushing back the rudder with a desperate jerk.") + " " + Q8("\"Signal her!\" said Phileas Fogg quietly."), "▶ The gun"),
vPuzzle("🚩 The signal", "The little brass cannon is loaded. Before it is fired, Mr Fogg gives one more order. Why the flag at half-mast?", ["It is the signal of distress: the steamer must come to help", "It means 'we surrender'", "It is the pilot-boat's number"], 0, ["", "Never!", "The number is on her sail."], { yes: "✓ " + Q8("The flag was run up at half-mast, and, this being the signal of distress, it was hoped that the American steamer, perceiving it, would change her course a little, so as to succour the pilot-boat.") }),
vSpot("The signal gun", "Fire!", { room: "e8_tanka", on: function () { }, say: "💥 " + Q8("\"Fire!\" said Mr. Fogg. And the booming of the little cannon resounded in the air.") })
] });
E8_CH.push({ n: "XXII", t: "In which Passepartout Finds out that, Even at the Antipodes, it is Convenient to have Some Money in One's Pocket", tune: "e8sailor", keep: ["e8_violet", "A violet with no scent", "💜"], jump: 1,
start: { room: "e8_deck" }, intro: "The Carnatic, the morning after Hong Kong", words: "The Carnatic sailed from Hong Kong at half-past six on the 7th of November, two cabins empty: those engaged by Mr Phileas Fogg. And the next day a passenger with a half-stupefied eye and disordered hair comes up from the second cabin and staggers to a seat on deck.",
setup: function (f) { e8Ship("Carnatic", "hongkong", 30); },
cast: [e8Pass(e8In("e8_deck", 4, 2.4), -Math.PI / 2),
{ key: "purser", name: "The purser of the Carnatic", role: "clerk", at: e8In("e8_deck", -26, 0), ry: Math.PI / 2, persona: "You are the purser of the Peninsular Company's steamer Carnatic, Hong Kong to Yokohama, in November 1872: busy, polite, sure of your passenger list. There is no Mr Fogg on board, and no young lady.", greet: "Your name and cabin, sir?" },
e8Pass(e8At("yokohama", -10, -60), 0, { key: "passy", wander: 4, greet: "Not a sou, not a penny, and all Japan to eat." })],
steps: [
vRead(),
vTalk("Passepartout", "Passepartout is on the deck of the Carnatic, breathing the sea air. Ask him how he got here.", vC("🌫️ The Carnatic! the Carnatic!", e8A(Q8("It was Passepartout; and what had happened to him was as follows: Shortly after Fix left the opium den, two waiters had lifted the unconscious Passepartout, and had carried him to the bed reserved for the smokers."), "Two waiters at the tavern laid the sleeping Passepartout on a bench. Hours later he woke, with one thought driving him.") + " " + Q8("Staggering and holding himself up by keeping against the walls, falling down and creeping up again, and irresistibly impelled by a kind of instinct, he kept crying out, \"The Carnatic! the Carnatic!\"") + " " + Q8("Passepartout had but few steps to go; and, rushing upon the plank, he crossed it, and fell unconscious on the deck, just as the Carnatic was moving off."), "▶ Find Mr Fogg"), { room: "e8_deck" }),
vTalk("The purser of the Carnatic", "Go with Passepartout to the saloon and ask the purser for Mr Fogg's state-room.", vC("📋 No Mr Fogg", Q8("He descended to the saloon. Mr. Fogg was not there. Passepartout had only, however, to ask the purser the number of his master's state-room. The purser replied that he did not know any passenger by the name of Fogg.") + " " + Q8("\"There is no young lady on board,\" interrupted the purser. \"Here is a list of the passengers; you may see for yourself.\""), "▶ Read the list"), { room: "e8_deck" }),
vPuzzle("😱 Whose fault?", "Mr Fogg is not on board. Passepartout falls on a seat, thunderstruck. Whose fault is it that his master missed the steamer?", ["His own, for not telling him; and still more the traitor Fix's", "Mr Fogg's, for being late", "The purser's"], 0, ["", "Mr Fogg is never late.", "He only keeps the list."], { yes: "✓ " + Q8("It was his fault, then, that Mr. Fogg and Aouda had missed the steamer. Yes, but it was still more the fault of the traitor who, in order to separate him from his master, and detain the latter at Hong Kong, had inveigled him into getting drunk!") }),
vSpot("The ship's rail", "Six days to Yokohama, his passage paid, and not a penny in his pocket. Lean on the rail with him.", { room: "e8_deck", say: "🌊 He eats and drinks everything the Carnatic offers, as if Japan had nothing to eat at all." }),
e8Ride("Hong Kong to Yokohama on the Carnatic", "steamer", E8_PORT.hongkong, E8_PORT.yokohama, "🚢 <b>The Carnatic</b> steams for Japan, Passepartout alone aboard.", [[0.5, "🌊 The China Sea; Passepartout eats for three."], [0.53, "⛰️ The coast of Japan, and the bay of Yeddo."]], e8Land("yokohama", -6, -30, "⚓ <b>Yokohama,</b> dawn on the 13th of November. The Carnatic anchors by the custom-house among the flags of every nation.", "in")),
vNote("🏯 Yokohama", Q8("At dawn on the 13th the Carnatic entered the port of Yokohama.") + " " + Q8("The Carnatic anchored at the quay near the custom-house, in the midst of a crowd of ships bearing the flags of all nations."), "▶ Ashore"),
vSpot("The temple gate", "Walk with Passepartout through the Japanese quarter, up to the temple gate.", { say: "⛩️ Priests passing in procession with their tambourines; officers with two swords in their belts; men and women in bright robes; children, everywhere." }),
vSpot("A tea-house", "He is hungry. Look in at a tea-house: but he has no money.", { say: "🍵 Rice, a little fish, tea: and not one coin to pay for any of it. He walks on." }),
vFind("violet", e8At("yokohama", -30, -84), "Some violets among the shrubs", "Passepartout has spied some violets among the shrubs. Pick one.", { verb: "smell it" }),
vNote("💜 No chance there", Q8("As he was strolling along, Passepartout espied some violets among the shrubs.") + " " + Q8("\"Good!\" said he; \"I'll have some supper.\"") + " " + Q8("But, on smelling them, he found that they were odourless.") + " " + Q8("\"No chance there,\" thought he."), "▶ Night"),
vHold(e8At("yokohama", 0, -40), 8, "Night falls on Yokohama. Walk down to the harbour with him.", { r: 6, say: "🔥 " + Q8("Then he came to the harbour, which was lit up by the resin torches of the fishermen, who were fishing from their boats.") })
] });
E8_CH.push({ n: "XXIII", t: "In which Passepartout's Nose Becomes Outrageously Long", tune: "e8galop", keep: ["e8_nose", "A Long Nose of bamboo, six feet long", "👺"],
intro: "Yokohama, the next morning", words: "Jaded, famished, Passepartout must eat at all hazards. He might sell his watch; but he would starve first. He has a voice, and the Japanese must love music: they are for ever beating cymbals, tam-tams and tambourines.",
setup: function (f) { e8Pyramid(0); },
cast: [e8Pass(e8At("yokohama", -14, -70), 0, { key: "passy" }),
{ key: "oldclo", name: "A dealer in old clothes", role: "japan", at: e8At("yokohama", -44, -74), ry: 0, persona: "You are a dealer in old clothes in the Japanese quarter of Yokohama in 1872. You like European clothes very much, and will gladly swap an old Japanese robe and a few small coins for a good European coat.", greet: "A fine coat! A fine coat! You want to trade?" },
{ key: "clown", name: "A clown with a placard", role: "acrobat", at: e8At("yokohama", 8, -70), ry: Math.PI / 2, persona: "You are a clown of Batulcar's Japanese troupe in Yokohama in 1872, carrying a huge placard through the streets to bring in the crowds for the last performances before the troupe sails for America.", greet: "Long Noses! Long Noses! Last performances!" },
{ key: "batulcar", name: "The Honourable William Batulcar", role: "batulcar", at: e8In("e8_circus", 6, -6), ry: Math.PI, persona: "You are the Honourable William Batulcar, from Jules Verne's Around the World in Eighty Days (the book only): an American showman, a sort of Barnum, director of a troupe of Japanese acrobats, jugglers and the Long Noses, at Yokohama in 1872, about to sail for San Francisco. Big, grey-bearded, loud, shrewd, generous enough to a good performer.", greet: "What do you want? Speak up, speak up." },
{ key: "acro", name: "An acrobat of the troupe", role: "acrobat", at: e8In("e8_circus", 12, -12), ry: -Math.PI / 2, persona: "You are one of the Japanese acrobats of Batulcar's troupe at Yokohama in 1872, one of the finest equilibrists in the world, getting ready for the great pyramid of the Long Noses.", greet: "New man? Lie on your back, nose to the roof, and do not move." },
e8Fogg(e8In("e8_circus", -8, 8), Math.PI, { key: "foggc" }), e8Aouda(e8In("e8_circus", -6.6, 8), Math.PI, { key: "aoudac" })],
steps: [
vRead(),
vTalk("A dealer in old clothes", "First, a costume: Passepartout cannot sing in the streets dressed like a servant. Find the old-clothes dealer.", vC("👘 Japanesed", Q8("It was only after a long search that Passepartout discovered a native dealer in old clothes, to whom he applied for an exchange. The man liked the European costume, and ere long Passepartout issued from his shop accoutred in an old Japanese coat, and a sort of one-sided turban, faded with long use. A few small pieces of silver, moreover, jingled in his pocket.") + " " + Q8("\"Good!\" thought he. \"I will imagine I am at the Carnival!\""), "▶ Breakfast!")),
vSpot("A tea-house", "Breakfast at last: into the tea-house.", { say: "🍚 " + Q8("His first care, after being thus \"Japanesed,\" was to enter a tea-house of modest appearance, and, upon half a bird and a little rice, to breakfast like a man for whom dinner was as yet a problem to be solved.") }),
vTalk("A clown with a placard", "A clown is carrying an immense placard through the streets, in English. Read it.", vC("📜 The placard", Q8("ACROBATIC JAPANESE TROUPE, HONOURABLE WILLIAM BATULCAR, PROPRIETOR, LAST REPRESENTATIONS, PRIOR TO THEIR DEPARTURE TO THE UNITED STATES, OF THE LONG NOSES! LONG NOSES! UNDER THE DIRECT PATRONAGE OF THE GOD TINGOU! GREAT ATTRACTION!") + " " + Q8("\"The United States!\" said Passepartout; \"that's just what I want!\""), "▶ Follow him")),
vSpot("Batulcar's circus", "Follow the clown to the troupe's great painted cabin, and go in."),
vTalk("The Honourable William Batulcar", "Passepartout asks Mr Batulcar for a place as a servant.", vC("💪 Two servants", Q8("\"Would you like a servant, sir?\" asked Passepartout.") + " " + Q8("\"A servant!\" cried Mr. Batulcar, caressing the thick grey beard which hung from his chin. \"I already have two who are obedient and faithful, have never left me, and serve me for their nourishment and here they are,\" added he, holding out his two robust arms, furrowed with veins as large as the strings of a bass-viol.") + " " + Q8("\"Ah!\" said the Honourable Mr. Batulcar. \"You are no more a Japanese than I am a monkey! Who are you dressed up in that way?\"") + " " + Q8("\"A man dresses as he can.\""), "▶ Go on"), { room: "e8_circus" }),
vPuzzle("🎭 The audition", "Mr Batulcar won't take a servant, but he might take a clown. What must Passepartout be able to do?", ["Sing standing on his head, a top spinning on his left foot and a sabre balanced on his right", "Juggle three oranges", "Swallow a sword"], 0, ["", "Far too easy for this troupe.", "Not in this troupe."], { yes: "✓ " + Q8("\"But can you sing standing on your head, with a top spinning on your left foot, and a sabre balanced on your right?\"") + " " + Q8("\"Humph! I think so,\" replied Passepartout, recalling the exercises of his younger days.") + " " + Q8("The engagement was concluded there and then.") }),
vSpot("The dressing-room", "Help Passepartout into his costume: wings, and a nose.", { room: "e8_circus", say: "👺 Wings of many colours on his shoulders, and on his face a nose of bamboo six feet long." }),
vNote("👺 The Long Noses", Q8("The Long Noses form a peculiar company, under the direct patronage of the god Tingou.") + " " + Q8("These noses were made of bamboo, and were five, six, and even ten feet long, some straight, others curved, some ribboned, and some having imitation warts upon them.") + " " + Q8("Passepartout had been chosen to take his place."), "▶ Three o'clock: the show"),
vSpot("The gong", "Three o'clock: strike the gong for the performance!", { room: "e8_circus", say: "🥁 Drums, tam-tams, flutes: the shed is full of Europeans and Japanese, Chinese, men, women and children." }),
vTalk("An acrobat of the troupe", "The great last scene: the human pyramid, the Car of Juggernaut, built on the noses. The acrobat shows Passepartout his place.", vC("🔺 On the noses", "'You are the base. On your back, nose up, and do not move: whatever happens, do not move.'", "▶ Build it"), { room: "e8_circus" }),
vSpot("The stage", "Lie down at the base with the others, noses to the ceiling.", { room: "e8_circus", done: function (f) { e8Pyramid(1); }, say: "🔺 The first row: noses pointing at the roof." }),
vNote("🔺 Up it goes", Q8("A second group of artists disposed themselves on these long appendages, then a third above these, then a fourth, until a human monument reaching to the very cornices of the theatre soon arose on top of the noses."), "▶ Hold steady!", { on: function (f) { e8Pyramid(2); setTimeout(function () { e8Pyramid(3); }, 700); setTimeout(function () { e8Pyramid(4); }, 1400); } }),
vPuzzle("👀 In the gallery", "The orchestra strikes up. Passepartout, at the base, looks up at the gallery on the right... and sees two faces he knows. What does he do?", ["Leaves his place and climbs to them, whatever happens to the pyramid", "Stays perfectly still", "Waves his nose"], 0, ["", "Could you, in his place?", "The nose is fixed on."], { yes: "✓ " + Q8("It was Passepartout's fault. Abandoning his position, clearing the footlights without the aid of his wings, and, clambering up to the right-hand gallery, he fell at the feet of one of the spectators, crying, \"Ah, my master! my master!\"") }),
vTalk("Phileas Fogg", "The pyramid has come down like a castle of cards. Mr Fogg is in the gallery, with Aouda.", vC("🎩 You here?", Q8("\"You here?\"") + " " + Q8("\"Myself.\"") + " " + Q8("\"Very well; then let us go to the steamer, young man!\""), "▶ Out!"), { room: "e8_circus", on: function () { e8Pyramid(0); } }),
vTalk("The Honourable William Batulcar", "Mr Batulcar, furious, blocks the way: damages for the 'breakage'!", vC("💷 A handful of banknotes", Q8("Mr. Fogg, Aouda, and Passepartout passed through the lobby of the theatre to the outside, where they encountered the Honourable Mr. Batulcar, furious with rage. He demanded damages for the \"breakage\" of the pyramid; and Phileas Fogg appeased him by giving him a handful of banknotes."), "▶ To the steamer"), { room: "e8_circus" }),
e8Carry("Run for the General Grant", e8Into("e8_deck", 28, 0, -Math.PI / 2, "⚓ " + Q8("At half-past six, the very hour of departure, Mr. Fogg and Aouda, followed by Passepartout, who in his hurry had retained his wings, and nose six feet long, stepped upon the American steamer.")), { on: function (f) { f.carried = 0; e8Ship("General Grant", "yokohama", 10); setTimeout(function () { e8Into("e8_deck", 28, 0, -Math.PI / 2, "⚓ <b>The General Grant.</b> Half-past six: the very hour of departure. Passepartout still has his wings on, and his nose.")(function () { f.carried = 1; }); }, 400); } })
] });
E8_CH.push({ n: "XXIV", t: "During which Mr. Fogg and Party Cross the Pacific Ocean", tune: "e8hebrides", keep: ["e8_meridian", "The day at the hundred and eightieth meridian", "🌐"],
intro: "The General Grant, out of Yokohama", words: "What happened when the pilot-boat came in sight of Shanghai is easily guessed: the American steamer saw the flag at half-mast and came to the little craft. And at Yokohama Mr Fogg learned from the Carnatic that a Frenchman had arrived on her the day before, and went looking for him.",
setup: function (f) { e8Ship("General Grant", "yokohama", 10); },
cast: [e8Fogg(e8In("e8_deck", -30, 2), Math.PI / 2), e8Aouda(e8In("e8_deck", -30, -2), Math.PI / 2), e8Pass(e8In("e8_deck", -20, 0), -Math.PI / 2, { wander: 2 }), e8Fix(e8In("e8_deck", 30, 2), -Math.PI / 2)],
steps: [
vRead(),
vTalk("Aouda", "Aouda tells Passepartout what happened since Hong Kong. Listen.", vC("⛵ Five hundred and fifty pounds", Q8("Phileas Fogg, after paying the stipulated price of his passage to John Busby, and rewarding that worthy with the additional sum of five hundred and fifty pounds, ascended the steamer with Aouda and Fix; and they started at once for Nagasaki and Yokohama.") + " Passepartout does not change countenance at the name of Fix. He says nothing, yet.", "▶ Go on"), { room: "e8_deck" }),
vNote("🚢 The General Grant", Q8("She was a large paddle-wheel steamer of two thousand five hundred tons; well equipped and very fast.") + " " + Q8("By making twelve miles an hour, she would cross the ocean in twenty-one days."), "▶ Look round"),
vSpot("The engine-room skylight", "Look at her engine: the great walking-beam going up and down.", { room: "e8_deck", say: "⚙️ " + Q8("The massive walking-beam rose and fell above the deck; at one end a piston-rod worked up and down; and at the other was a connecting-rod which, in changing the rectilinear motion to a circular one, was directly connected with the shaft of the paddles.") }),
e8Ride("Across the Pacific, the first nine days", "grant", E8_PORT.yokohama, 0.655, "🚢 <b>The General Grant</b> steams east across the Pacific.", [[0.6, "🌊 The Pacific: long calm swells, the paddles beating."], [0.64, "🌅 Day after day, the same horizon."]], e8Into("e8_deck", -10, 0, -Math.PI / 2, "🌐 <b>The 23rd of November.</b> The hundred and eightieth meridian."), { pad1: 0 }),
vSpot("The log-board", "Read the log-board: the 23rd of November.", { room: "e8_deck", say: "🌐 " + Q8("The General Grant passed, on the 23rd of November, the one hundred and eightieth meridian, and was at the very antipodes of London.") }),
vPuzzle("📅 Half way", "Fifty-two of the eighty days are gone. How many does Mr Fogg have left?", ["Twenty-eight", "Thirty-two", "Eighteen"], 0, ["", "Count again: eighty less fifty-two.", "More than that."], { yes: "✓ " + Q8("Mr. Fogg had, it is true, exhausted fifty-two of the eighty days in which he was to complete the tour, and there were only twenty-eight left.") }),
vTalk("Passepartout", "Passepartout has made a joyful discovery about his watch. Ask him.", vC("⌚ I was sure!", Q8("Now, on this day, though he had not changed the hands, he found that his watch exactly agreed with the ship's chronometers. His triumph was hilarious.") + " " + Q8("\"I was sure that the sun would some day regulate itself by my watch!\""), "▶ Is he right?"), { room: "e8_deck" }),
vPuzzle("⌚ Twelve hours", "Is Passepartout's watch really right again?", ["No: it is twelve hours wrong, which a twelve-hour face can't show", "Yes, the sun has come round to London time", "It stopped and started again"], 0, ["", "The sun does no such thing.", "It never stopped."], { yes: "✓ " + Q8("Passepartout was ignorant that, if the face of his watch had been divided into twenty-four hours, like the Italian clocks, he would have no reason for exultation; for the hands of his watch would then, instead of as now indicating nine o'clock in the morning, indicate nine o'clock in the evening") + "." }),
vSpot("The bow", "Passepartout has seen someone on the forward deck. Go forward.", { room: "e8_deck" }),
vNote("👊 Fix!", Q8("On that very day, however, he met Passepartout face to face on the forward deck. The latter, without a word, made a rush for him, grasped him by the throat, and, much to the amusement of a group of Americans, who immediately began to bet on him, administered to the detective a perfect volley of blows, which proved the great superiority of French over English pugilistic skill.") + " " + Q8("Fix got up in a somewhat rumpled condition, and, looking at his adversary, coldly said, \"Have you done?\""), "▶ 'For this time, yes'"),
vTalk("Mr Fix", "Fix sits down with Passepartout, away from the others. Hear him.", vC("🤝 Allies", Q8("\"You have given me a thrashing,\" said Fix. \"Good, I expected it. Now, listen to me. Up to this time I have been Mr. Fogg's adversary. I am now in his game.\"") + " " + Q8("\"Now,\" resumed Fix, \"Mr. Fogg seems to be going back to England. Well, I will follow him there. But hereafter I will do as much to keep obstacles out of his way as I have done up to this time to put them in his path.\""), "▶ Friends?"), { room: "e8_deck" }),
vPuzzle("🤝 Friends?", "Fix asks if they are friends now. What does Passepartout answer?", ["Allies, perhaps; at the least sign of treason he'll twist his neck", "The best of friends", "Never: he'll throw him overboard"], 0, ["", "After Hong Kong?", "He wants Mr Fogg back in England just as much."], { yes: "✓ " + Q8("\"Friends?—no,\" replied Passepartout; \"but allies, perhaps. At the least sign of treason, however, I'll twist your neck for you.\"") + " " + Q8("\"Agreed,\" said the detective quietly.") }),
e8Ride("On to the Golden Gate", "grant", 0.655, E8_PORT.sanfran, "🚢 Eleven days more.", [[0.66, "🌐 Over the meridian. (Mr Fogg's day-book gains a day he will not know of.)"], [0.7, "⛰️ The coast of California: the bay of the Golden Gate."]], e8Land("sanfran", -6, -30, "🌉 <b>San Francisco,</b> the 3rd of December, seven in the morning. " + Q8("Mr. Fogg had neither gained nor lost a single day."), "in"), { pad0: 0 })
] });
E8_CH.push({ n: "XXV", t: "In which a Slight Glimpse is Had of San Francisco", tune: "e8yankee", keep: ["e8_badge", "A rosette: 'Hurrah for Camerfield!'", "🎗️"],
intro: "The quays of San Francisco", words: "Passepartout, in his joy at reaching the American continent, tries a perilous vault off the gangway, and goes through a worm-eaten plank. Mr Fogg learns the first train for New York leaves at six in the evening: a whole day in the Californian capital.",
cast: [e8Fogg(e8At("sanfran", -4, -34), Math.PI / 2), e8Aouda(e8At("sanfran", -4, -36), Math.PI / 2), e8Pass(e8At("sanfran", -8, -34), Math.PI / 2),
e8Fix(e8At("sanfran", -14, -52), 0, { key: "fixsf" }),
{ key: "proctor", name: "Colonel Stamp Proctor", role: "proctor", at: e8At("sanfran", 4, -46), ry: -Math.PI / 2, persona: "You are Colonel Stamp Proctor, from Jules Verne's Around the World in Eighty Days (the book only): a big, brawny American with a red beard, a flushed face and broad shoulders, the chief of a band of voters in Montgomery Street, San Francisco, in December 1872. Loud, insolent, quick with your fists, but not without courage.", greet: "Who are you looking at, stranger?" },
{ key: "porter", name: "A porter at the station", role: "clerk", at: e8In("e8_car", 20, 0), ry: -Math.PI / 2, persona: "You are a railway porter at Oakland in December 1872, easy-going and amused by everything.", greet: "Train for New York, sir? All aboard in ten minutes." }],
steps: [
vRead(),
vGo(e8At("sanfran", 0, -62), "Mr Fogg takes a carriage to the International Hotel; Passepartout rides on the box. Go up the street.", { r: 6, say: "🏙️ " + Q8("San Francisco was no longer the legendary city of 1849—a city of banditti, assassins, and incendiaries, who had flocked hither in crowds in pursuit of plunder; a paradise of outlaws, where they gambled with gold-dust, a revolver in one hand and a bowie-knife in the other: it was now a great commercial emporium.") }),
vTalk("Mr Fix", "Mr Fogg goes out to the British consulate with Aouda; and 'by the greatest chance in the world' he meets Fix.", vC("🎩 By chance", "Fix seems wholly taken by surprise: what, they crossed the Pacific on the same steamer, and never met? He would be honoured to accompany them through the city. Mr Fogg replies that the honour would be his.", "▶ Montgomery Street"), {}),
vSpot("The meeting in Montgomery Street", "There is a great crowd in Montgomery Street. Go and see.", { say: "📣 " + Q8("Men were going about carrying large posters, and flags and streamers were floating in the wind; while loud cries were heard on every hand.") }),
vNote("📣 Hurrah!", Q8("\"Hurrah for Camerfield!\"") + " " + Q8("\"Hurrah for Mandiboy!\"") + " " + Q8("It was a political meeting; at least so Fix conjectured, who said to Mr. Fogg, \"Perhaps we had better not mingle with the crowd. There may be danger in it.\"") + " " + Q8("\"Yes,\" returned Mr. Fogg; \"and blows, even if they are political are still blows.\""), "▶ Up the steps"),
vHold(e8At("sanfran", -6, -40), 8, "Stand with them on the flight of steps above the crowd.", { r: 4, say: "🌊 " + Q8("The undulations of the human surge reached the steps, while all the heads floundered on the surface like a sea agitated by a squall.") }),
vTalk("Colonel Stamp Proctor", "A band of voters charges the steps. A big man with a red beard raises his fist at Mr Fogg; Fix takes the blow. Face him.", vC("🥊 We will meet again!", Q8("\"Yankee!\" exclaimed Mr. Fogg, darting a contemptuous look at the ruffian.") + " " + Q8("\"Englishman!\" returned the other. \"We will meet again!\"") + " " + Q8("\"When you please.\"") + " " + Q8("\"What is your name?\"") + " " + Q8("\"Phileas Fogg. And yours?\"") + " " + Q8("\"Colonel Stamp Proctor.\""), "▶ Out of the crowd")),
vGather("shirt", e8At("sanfran", 22, -66), 2, "a new coat and hat", "Both gentlemen's clothes are in rags. To a tailor's: choose a coat and hat for each.", { spread: 2.5, verb: "try it on", each: "A perfect fit." }),
vTalk("Passepartout", "Back at the hotel, Passepartout is waiting with half a dozen six-barrelled revolvers. He frowns at Fix. Speak to him.", vC("🔫 Six revolvers", "'The Pacific Railroad, monsieur! Indians! Bandits! One must be ready.' Aouda tells him of the meeting and of Fix's bruise; Fix is keeping his word. Passepartout's face clears.", "▶ To the station")),
vTalk("Phileas Fogg", "Getting into the coach for the station, Mr Fogg says one thing more.", vC("🎩 I will come back", Q8("As he was getting in, Mr. Fogg said to Fix, \"You have not seen this Colonel Proctor again?\"") + " " + Q8("\"No.\"") + " " + Q8("\"I will come back to America to find him,\" said Phileas Fogg calmly. \"It would not be right for an Englishman to permit himself to be treated in that way, without retaliating.\""), "▶ Oakland station")),
e8Carry("Across the bay to the train", e8Into("e8_car", 18, 0, -Math.PI / 2, "🚂 <b>The Pacific Railroad,</b> Oakland: a long car on eight wheels, two rows of seats, a stove."), { on: function (f) { f.carried = 0; var I = VRN_IN.e8_car; E8.carView = "plains"; if (I && I.view)
I.view("plains"); setTimeout(function () { e8Into("e8_car", 18, 0, -Math.PI / 2, "🚂 <b>The Pacific Railroad,</b> Oakland: a long car on eight wheels, two rows of seats, a stove.")(function () { f.carried = 1; }); }, 400); } }),
vTalk("A porter at the station", "Mr Fogg asks the porter what the meeting was for.", vC("🗳️ Only an election", Q8("\"It was a political meeting, sir,\" replied the porter.") + " " + Q8("\"But I thought there was a great deal of disturbance in the streets.\"") + " " + Q8("\"It was only a meeting assembled for an election.\""), "▶ Elected to what?"), { room: "e8_car" }),
vPuzzle("🗳️ All that for...", "All that shouting and fighting in Montgomery Street was to elect what?", ["A justice of the peace", "A general-in-chief", "The President"], 0, ["", "That's what Mr Fogg guessed.", "Not this time."], { yes: "✓ " + Q8("\"The election of a general-in-chief, no doubt?\" asked Mr. Fogg.") + " " + Q8("\"No, sir; of a justice of the peace.\"") + " " + Q8("Phileas Fogg got into the train, which started off at full speed.") })
] });
E8_CH.push({ n: "XXVI", t: "In which Phileas Fogg and Party Travel by the Pacific Railroad", tune: "e8yankee", keep: ["e8_buffalo", "A tuft of buffalo wool from the rails", "🦬"],
start: { room: "e8_car" }, intro: "The car of the Pacific Railroad, leaving Oakland", words: "From ocean to ocean: three thousand seven hundred and eighty-six miles of rail from San Francisco to New York, in seven days. Mr Fogg must take the Atlantic steamer at New York on the 11th.",
setup: function (f) { var I = VRN_IN.e8_car; E8.carView = "snow"; if (I && I.view)
I.view("snow"); e8Out("e8_car", "sanfran", 30, -30, "Down onto the platform."); },
cast: [e8Fogg(e8In("e8_car", -8.6, 1.3), -Math.PI / 2), e8Aouda(e8In("e8_car", -7.2, 1.3), Math.PI / 2), e8Pass(e8In("e8_car", -8.6, -1.3), -Math.PI / 2), e8Fix(e8In("e8_car", -7.2, -1.3), Math.PI / 2),
{ key: "steward", name: "The steward of the car", role: "clerk", at: e8In("e8_car", 14, 0), ry: -Math.PI / 2, persona: "You are the steward of a Pullman-style car of the Central Pacific Railroad in December 1872: you make up the berths at night, sell cards and newspapers, and know every station from Oakland to Omaha.", greet: "Berths at eight o'clock, folks. Cards, papers, cigars?" }],
steps: [
vRead(),
vNote("❄️ Night and snow", Q8("The train left Oakland station at six o'clock. It was already night, cold and cheerless, the heavens being overcast with clouds which seemed to threaten snow.") + " Passepartout sits beside the detective, and does not talk to him. " + Q8("Snow began to fall an hour after they started, a fine snow, however, which happily could not obstruct the train; nothing could be seen from the windows but a vast, white sheet, against which the smoke of the locomotive had a greyish aspect."), "▶ Go on"),
vTalk("The steward of the car", "At eight o'clock the steward comes through. Ask what he is doing.", vC("🛏️ Berths", Q8("At eight o'clock a steward entered the car and announced that the time for going to bed had arrived; and in a few minutes the car was transformed into a dormitory.") + " Curtains, bedding, pillows: every passenger has a comfortable bed, out of sight of the others.", "▶ Sleep"), { room: "e8_car" }),
e8Ride("Over the Sierra Nevada in the night", "train", E8_PORT.sanfran, 0.74, "🚂 The train climbs into the Sierra Nevada.", [[0.725, "⛰️ Sacramento; then the Sierra Nevada: the line turns round the mountain-sides, close to the precipices."], [0.735, "🌄 Reno, at midday; then the Humboldt River, the high plateaus of Nevada."]], e8Into("e8_car", -10, 0, -Math.PI / 2, "🚂 <b>Nevada, about twelve o'clock.</b> The train slows... and stops."), { pad1: 0 }),
vSpot("The carriage window", "The train has stopped on the plain. Look out of the window.", { room: "e8_car", say: "🦬 " + Q8("About twelve o'clock a troop of ten or twelve thousand head of buffalo encumbered the track.") }),
vTalk("Passepartout", "Passepartout is furious at the delay. Hear him.", vC("🦬 What a country!", Q8("Passepartout was furious at the delay they occasioned, and longed to discharge his arsenal of revolvers upon them.") + " " + Q8("\"What a country!\" cried he."), "▶ Calm him"), { room: "e8_car" }),
vPuzzle("🛤️ The engineer", "Why doesn't the engineer simply drive the locomotive through the herd?", ["The weight of the herd would stop the engine and throw the train off the track", "He likes buffaloes", "He has no steam"], 0, ["", "He has no time to like them.", "He has plenty."], { yes: "✓ " + Q8("The engineer did not try to overcome the obstacle, and he was wise.") }),
vHold(e8In("e8_car", -8, 0), 10, "Wait with Mr Fogg, who has not moved from his seat, while the herd goes by.", { room: "e8_car", r: 4, say: "🌙 " + Q8("The procession of buffaloes lasted three full hours, and it was night before the track was clear.") }),
e8Ride("On into Utah", "train", 0.74, 0.75, "🚂 The track is clear: the train makes up time.", [[0.745, "⛰️ The defiles of the Humboldt Range, at eight o'clock; Utah, at half-past nine."]], e8Into("e8_car", -10, 0, -Math.PI / 2, "🌅 <b>Utah, the morning of the 5th of December.</b>"), { pad0: 0, pad1: 0 })
] });
E8_CH.push({ n: "XXVII", t: "In which Passepartout Undergoes, at a Speed of Twenty Miles an Hour, a Course of Mormon History", tune: "e8yankee", keep: ["e8_salt", "A pinch of salt from the Great Salt Lake", "🧂"],
start: { room: "e8_car" }, intro: "The train, in Utah", words: "About nine in the morning Passepartout goes out onto the platform of the car to take the air. The sun's disc, swollen by the mist, looks like an enormous ring of gold, and he is reckoning what it would be worth in pounds sterling when a strange-looking gentleman comes along the train.",
cast: [e8Fogg(e8In("e8_car", -8.6, 1.3), -Math.PI / 2), e8Aouda(e8In("e8_car", -7.2, 1.3), Math.PI / 2), e8Pass(e8In("e8_car", 18, 0), Math.PI / 2), e8Fix(e8In("e8_car", -7.2, -1.3), Math.PI / 2),
{ key: "hitch", name: "Elder William Hitch", role: "elder", at: e8In("e8_car", 12, 1.3), ry: -Math.PI / 2, persona: "You are Elder William Hitch, a Mormon missionary travelling on the Pacific Railroad in Utah in December 1872, from Jules Verne's Around the World in Eighty Days (the book only). You are earnest and eloquent about the history of your church, its sufferings and its long journey west to Salt Lake City, and a little impatient with listeners who drift away. Speak respectfully and sincerely of your faith.", greet: "Car No. 117, at eleven o'clock. You will come, friend?" },
{ key: "mormon", name: "A traveller of Salt Lake City", role: "yankee", at: e8In("e8_car", 16, -1.3), ry: Math.PI / 2, persona: "You are a farmer of the Salt Lake valley in December 1872, travelling on business: friendly, hard-working, proud of the irrigated fields and orchards your people have made in the desert.", greet: "The finest valley in the West, friend. We watered it ourselves." }],
steps: [
vRead(),
vTalk("Elder William Hitch", "The gentleman in black is fixing a notice on the door of each car. Read it, and speak to him.", vC("📜 A notice", Q8("This personage, who had taken the train at Elko, was tall and dark, with black moustache, black stockings, a black silk hat, a black waistcoat, black trousers, a white cravat, and dogskin gloves. He might have been taken for a clergyman.") + " The notice says that Elder William Hitch, Mormon missionary, will lecture on Mormonism in car No. 117 from eleven to twelve o'clock.", "▶ 'I'll go'"), { room: "e8_car" }),
vHold(e8In("e8_car", 10, 0), 10, "Sit and hear the Elder's lecture with Passepartout, while the train runs on.", { room: "e8_car", r: 4, say: "📖 The Elder tells his church's history: Joseph Smith and his visions, the founding at Kirtland and Nauvoo, persecutions, the murder of the prophet, and the long march of his people across the plains to the valley of the Great Salt Lake, led by Brigham Young. One by one the listeners drift away; Passepartout stays to the end." }),
vTalk("Elder William Hitch", "The Elder turns to Passepartout, the last listener left. Speak with him.", vC("🙏 The Elder", "He asks Passepartout, very earnestly, whether he will not stay in Utah. Passepartout thanks him politely, says he has a master to serve and a train to keep, and goes back to his seat: and the Elder, unoffended, goes off to find more hearers.", "▶ Out of the window"), { room: "e8_car" }),
e8Ride("Along the shore of the Great Salt Lake", "train", 0.75, 0.762, "🚂 The train runs along the Great Salt Lake.", [[0.755, "🌊 " + Q8("The Salt Lake, seventy miles long and thirty-five wide, is situated three miles eight hundred feet above the sea.")], [0.759, "🌾 Farms, ranches and pens; fields of wheat, corn and lucerne, watered by hand from the mountains."]], e8Into("e8_car", -10, 0, -Math.PI / 2, "🚉 <b>Ogden,</b> two o'clock. Six hours' rest: time to see Salt Lake City."), { pad0: 0, pad1: 0 }),
vTalk("A traveller of Salt Lake City", "A farmer of the valley has got into the car. Ask him about Salt Lake City.", vC("🏙️ Salt Lake City", "'Broad streets laid out square, cottages with verandas and gardens, acacias and palms, the Tabernacle, the Temple begun: and every field watered by the streams from the Wahsatch Mountains. When we came, it was desert.'", "▶ Thank him"), { room: "e8_car" }),
vPuzzle("🧂 Salt water", "The Great Salt Lake is so salt that a man floats in it without trying. What lives in it?", ["Almost nothing: fish die in its water", "Sharks", "Trout and salmon"], 0, ["", "Not in a lake!", "Not in that salt."], { yes: "✓ So Verne says: the fish carried in by the Jordan and the Weber soon die there." })
] });
E8_CH.push({ n: "XXVIII", t: "In which Passepartout Does not Succeed in Making Anybody Listen to Reason", tune: "e8toccata", keep: ["e8_bolt", "A bolt from the bridge at Medicine Bow", "🔩"], jump: 1,
start: { room: "e8_car" }, intro: "The train, in the Rocky Mountains", words: "The train climbs into Wyoming, the snow coming and going. At Green River Aouda sees a man on the platform, and goes pale: Colonel Stamp Proctor, of San Francisco, is on this train.",
setup: function (f) { var I = VRN_IN.e8_car; E8.carView = "snow"; if (I && I.view)
I.view("snow"); if (E8.bridge)
E8.bridge.visible = true; },
cast: [e8Fogg(e8In("e8_car", -12, 0.6), Math.PI / 2), e8Aouda(e8In("e8_car", -12, 2), -Math.PI / 2), e8Pass(e8In("e8_car", -8.6, -1.3), -Math.PI / 2), e8Fix(e8In("e8_car", -10.6, 1.3), Math.PI),
{ key: "signal", name: "The signal-man", role: "clerk", at: e8At("bow", -48, -22), ry: Math.PI, persona: "You are the signal-man sent out by the station-master of Medicine Bow, Wyoming, in December 1872, with a red flag: the suspension bridge over the rapids is shaky, several iron wires broken, and no train must cross it.", greet: "No! you can't pass." },
{ key: "forster", name: "Forster, the engineer", role: "yankee", at: e8At("bow", -46, -18), ry: Math.PI, persona: "You are Forster, the engineer of the Union Pacific express at Medicine Bow in December 1872: bold, confident, sure that at full speed your train can leap the shaky bridge.", greet: "There's a way to get over, I reckon." },
{ key: "proctor", name: "Colonel Stamp Proctor", role: "proctor", at: e8At("bow", -52, -18), ry: Math.PI * 0.8, persona: "You are Colonel Stamp Proctor, of San Francisco, in December 1872: big, loud, insolent, impatient, all for crossing the bridge at full speed.", greet: "What! Prudent!" },
e8Pass(e8At("bow", -50, -16), Math.PI, { key: "passb" })],
steps: [
vRead(),
vTalk("Aouda", "Aouda tells Fix and Passepartout, very low, whom she has seen.", vC("😨 Proctor", Q8("Aouda seized a moment when Mr. Fogg was asleep to tell Fix and Passepartout whom she had seen.") + " " + Q8("\"Mr. Fix,\" resumed Aouda, \"Mr. Fogg will allow no one to avenge him. He said that he would come back to America to find this man.") + "\"", "▶ Keep him in the car"), { room: "e8_car" }),
vPuzzle("🃏 Keep him in his seat", "How can they keep Mr Fogg in the car, so that he never meets the colonel?", ["Whist: buy cards on the train, Aouda and Fix will play", "Lock the door", "Tell him everything"], 0, ["", "He would go out by the other.", "He would go straight to the colonel."], { yes: "✓ " + Q8("\"Certainly, sir,\" Aouda quickly replied; \"I understand whist. It is part of an English education.\"") + " " + Q8("\"As you please, sir,\" replied Phileas Fogg, heartily glad to resume his favourite pastime even on the railway.") }),
vSpot("The card table", "Passepartout has bought two packs of cards from the steward. Set up the game.", { room: "e8_car", say: "🃏 " + Q8("\"Now,\" thought Passepartout, \"we've got him. He won't budge.\"") }),
e8Ride("Over Bridger Pass, down towards the Atlantic", "train", 0.762, E8_PORT.bow - 0.004, "🚂 Over the dividing ridge of the waters.", [[0.766, "⛰️ Bridger Pass, seven thousand five hundred feet up: the highest point of the line."], [0.77, "🏔️ Fort Halleck; the Rocky Mountains on the horizon."]], e8Land("bow", -50, -22, "🚩 <b>A red signal.</b> The train has stopped a mile before Medicine Bow.", "e"), { pad0: 0, pad1: 0 }),
vTalk("The signal-man", "The engineer and conductor are arguing with a signal-man. Passengers crowd round. Listen.", vC("🌉 The bridge is shaky", Q8("Passepartout, joining the group, heard the signal-man say, \"No! you can't pass. The bridge at Medicine Bow is shaky, and would not bear the weight of the train.\"") + " " + Q8("This was a suspension-bridge thrown over some rapids, about a mile from the place where they now were. According to the signal-man, it was in a ruinous condition, several of the iron wires being broken; and it was impossible to risk the passage."), "▶ Go on")),
vTalk("Forster, the engineer", "The engineer has an idea.", vC("🚂 Full speed", Q8("\"No matter,\" replied Forster; \"I think that by putting on the very highest speed we might have a chance of getting over.\"") + " Six hours to wait for another train, or ten miles on foot through the snow. Most of the passengers like the engineer's idea very much.", "▶ Go on")),
vTalk("Colonel Stamp Proctor", "Passepartout has a simple idea, but nobody will hear it. The colonel least of all.", vC("😤 What! Prudent!", Q8("\"What! Prudent!\" cried Colonel Proctor, whom this word seemed to excite prodigiously.") + " " + Q8("\"Are you afraid?\" asked Colonel Proctor.") + " " + Q8("\"I afraid? Very well; I will show these people that a Frenchman can be as American as they!\""), "▶ 'All aboard!'")),
vPuzzle("💡 Passepartout's simple idea", "What was the 'simple idea' nobody would listen to?", ["Let the passengers cross the bridge on foot first, and the train after", "Wait for spring", "Swim the rapids"], 0, ["", "Mr Fogg can't wait for spring.", "In December?"], { yes: "✓ " + Q8("\"Yes, all aboard!\" repeated Passepartout, and immediately. \"But they can't prevent me from thinking that it would be more natural for us to cross the bridge on foot, and let the train come after!\"") }),
e8Ride("Back a mile, then everything the engine has", "train", E8_PORT.bow - 0.004, E8_PORT.bow + 0.012, "🚂 " + Q8("The locomotive whistled vigorously; the engineer, reversing the steam, backed the train for nearly a mile—retiring, like a jumper, in order to take a longer leap."), [[E8_PORT.bow, "🌉 " + Q8("And they passed over! It was like a flash. No one saw the bridge.")]], e8Into("e8_car", -10, 0, -Math.PI / 2, "💥 Behind them, the bridge falls into the rapids."), { pad0: 0, pad1: 0, step: { done: function () { if (E8.bridge)
E8.bridge.visible = false; } } }),
vNote("🌉 And they passed over!", Q8("The train leaped, so to speak, from one bank to the other, and the engineer could not stop it until it had gone five miles beyond the station. But scarcely had the train passed the river, when the bridge, completely ruined, fell with a crash into the rapids of Medicine Bow."), "▶ On")
] });
E8_CH.push({ n: "XXIX", t: "In which Certain Incidents are Narrated which are Only to be Met with on American Railroads", tune: "e8toccata", keep: ["e8_chain", "A link of the safety chain", "⛓️"],
intro: "The train, on the plains of Nebraska", words: "Thirteen hundred and eighty-two miles from San Francisco in three days and three nights. The game of whist goes on; nobody, not even the dummy, complains of the length of the trip.",
cast: [e8Fogg(e8In("e8_car", -12, 0.6), Math.PI / 2), e8Aouda(e8In("e8_car", -12, 2), -Math.PI / 2), e8Pass(e8In("e8_car", -8.6, -1.3), -Math.PI / 2), e8Fix(e8In("e8_car", -10.6, 1.3), Math.PI),
{ key: "proctor", name: "Colonel Stamp Proctor", role: "proctor", at: e8In("e8_car", -13.6, 1.8), ry: -Math.PI / 2, persona: "You are Colonel Stamp Proctor, of San Francisco, in December 1872: big, loud, insolent, spoiling for a fight with the Englishman Phileas Fogg; brave enough when real danger comes.", greet: "I should play a diamond." },
{ key: "cond", name: "The conductor", role: "clerk", at: e8In("e8_car", 16, 0), ry: -Math.PI / 2, persona: "You are the conductor of the Union Pacific express in Nebraska in December 1872: a courteous, brave gentleman who will not stop his train for a duel, but will lend a car for one.", greet: "Tickets, gentlemen. We're twenty minutes late." }],
steps: [
vRead(),
vSpot("The card table", "Watch the game. Mr Fogg is about to play a spade...", { room: "e8_car" }),
vTalk("Colonel Stamp Proctor", "A voice behind Mr Fogg.", vC("♦️ I should play a diamond", Q8("Once, having resolved on a bold stroke, he was on the point of playing a spade, when a voice behind him said, \"I should play a diamond.\"") + " " + Q8("\"Ah! it's you, is it, Englishman?\" cried the colonel; \"it's you who are going to play a spade!\"") + " " + Q8("\"And who plays it,\" replied Phileas Fogg coolly, throwing down the ten of spades."), "▶ Go on"), { room: "e8_car" }),
vTalk("Phileas Fogg", "Mr Fogg has risen. He will settle it himself.", vC("⏳ Six months", "Mr Fogg tells the colonel he means to return to America for him, but cannot stop now. " + Q8("\"Will you appoint a meeting for six months hence?\"") + " " + Q8("\"Why not ten years hence?\"") + " " + Q8("\"I say six months,\" returned Phileas Fogg; \"and I shall be at the place of meeting promptly.\"") + " " + Q8("\"All this is an evasion,\" cried Stamp Proctor. \"Now or never!\""), "▶ Plum Creek"), { room: "e8_car" }),
vTalk("The conductor", "At Plum Creek the colonel wants to get down and fight. The conductor will not stop the train. But he has an offer.", vC("🚃 The last car", Q8("\"I'm really very sorry, gentlemen,\" said the conductor.") + " The last car is empty; they may settle it there while the train goes on. " + Q8("\"Well, we are really in America,\" thought Passepartout, \"and the conductor is a gentleman of the first order!\""), "▶ Wait for the whistle"), { room: "e8_car" }),
vHold(e8In("e8_car", 14, 0), 6, "Fix and Passepartout wait outside the last car for the whistle, their hearts beating.", { room: "e8_car", r: 4, say: "📯 " + Q8("They were listening for the whistle agreed upon, when suddenly savage cries resounded in the air, accompanied by reports which certainly did not issue from the car where the duellists were.") }),
vNote("🏹 The train is attacked", e8A(Q8("Colonel Proctor and Mr. Fogg, revolvers in hand, hastily quitted their prison, and rushed forward where the noise was most clamorous. They then perceived that the train was attacked by a band of Sioux.") + " The Sioux have taken the engine and are on the roofs of the cars; the passengers, almost all armed, fight back from the windows. Aouda defends herself with a revolver, as bravely as any of them.", "A band of Sioux riders has caught the train on the open plain: some are on the engine, some on the roofs of the cars. The colonel and Mr Fogg forget their quarrel and fight side by side; Aouda is as brave as any of them. The engine-driver is struck down, and the train runs on with no one at the controls."), "▶ Go on"),
vTalk("The conductor", "The conductor, fighting beside Mr Fogg, is hit. He cries out.", vC("⏱️ Five minutes", e8A(Q8("The conductor was fighting beside Mr. Fogg, when he was shot and fell. At the same moment he cried, \"Unless the train is stopped in five minutes, we are lost!\""), "The conductor is hurt, and falls; but he calls out: 'Unless the train is stopped in five minutes, we are lost!'") + " Fort Kearney is just ahead, and its soldiers; but if the train goes past it, there is no help for a hundred miles.", "▶ Who will go?"), { room: "e8_car" }),
vPuzzle("⛓️ Stop the train", "The engine is running away with the train. Passepartout says 'I will go.' What can he do?", ["Climb under the cars to the front and uncouple the engine, so the carriages stop at the fort", "Pull the bell-rope", "Jump off and run ahead"], 0, ["", "There's no one in the engine to hear it.", "He could never outrun a train."], { yes: "✓ " + Q8("There, suspended by one hand between the baggage-car and the tender, with the other he loosened the safety chains; but, owing to the traction, he would never have succeeded in unscrewing the yoking-bar, had not a violent concussion jolted this bar out.") }),
e8Ride("The cars roll on, slower and slower", "train", E8_PORT.sioux, E8_PORT.kearney, "🚃 The engine runs on alone; the cars roll after it, the brakes on.", [[0.81, "🛑 " + Q8("Carried on by the force already acquired, the train still moved for several minutes; but the brakes were worked and at last they stopped, less than a hundred feet from Kearney station.")]], e8Land("kearney", -4, -16, "🏰 <b>Fort Kearney.</b> The soldiers come running at the shots; the Sioux ride off.", "in"), { pad1: 0.002 }),
vNote("❓ Missing", Q8("But when the passengers counted each other on the station platform several were found missing; among others the courageous Frenchman, whose devotion had just saved them."), "▶ Mr Fogg?")
] });
E8_CH.push({ n: "XXX", t: "In which Phileas Fogg Simply Does his Duty", tune: "e8largo", keep: ["e8_snow", "A snowball from Fort Kearney", "❄️"],
intro: "Fort Kearney station, in the snow", words: "Three passengers are gone, Passepartout among them: killed, or taken prisoner. Colonel Proctor is badly hurt. Mr Fogg, who was in the thick of it, has not a scratch. He stands with his arms folded. He has a decision to make.",
cast: [e8Fogg(e8At("kearney", -2, -14), Math.PI), e8Aouda(e8At("kearney", -4, -12), Math.PI), e8Fix(e8At("kearney", 4, -14), Math.PI, { wander: 2 }),
{ key: "captain", name: "The captain of Fort Kearney", role: "soldier", at: e8At("kearney", 2, -30), ry: 0, persona: "You are the commanding officer of Fort Kearney, Nebraska, in December 1872: a captain of the United States Army with a hundred men to guard the fort. You are cautious, because the fort must not be left defenceless, but you are a brave man and you respect courage.", greet: "Captain, commanding. Are you hurt, sir?" },
{ key: "mudge", name: "Mudge", role: "mudge", at: e8At("kearney", 22, -16), ry: Math.PI, persona: "You are Mudge, the owner of a sail-sledge at Fort Kearney, Nebraska, in December 1872: a quiet, weather-beaten prairie man who knows the snow and the winds. With a west wind you can run to Omaha in a few hours, faster than the express.", greet: "Need to get somewhere, mister?" },
e8Pass(e8At("kearney", 0, -62), Math.PI, { key: "passk" }), e8Fogg(e8At("kearney", 2, -62), Math.PI, { key: "foggk" })],
steps: [
vRead(),
vTalk("Phileas Fogg", "Aouda looks at Mr Fogg without a word. He understands her.", vC("❤️ Living or dead", Q8("\"I will find him, living or dead,\" said he quietly to Aouda.") + " " + Q8("\"Ah, Mr.—Mr. Fogg!\" cried she, clasping his hands and covering them with tears.") + " " + Q8("\"Living,\" added Mr. Fogg, \"if we do not lose a moment.\""), "▶ The captain")),
vTalk("The captain of Fort Kearney", "Mr Fogg goes to the captain of the fort.", vC("🎖️ Duty", Q8("\"The lives of three men are in question, sir,\" said Phileas Fogg.") + " " + Q8("\"Doubtless; but can I risk the lives of fifty men to save three?\"") + " " + Q8("\"I don't know whether you can, sir; but you ought to do so.\"") + " " + Q8("\"Very well,\" said Mr. Fogg, coldly. \"I will go alone.\""), "▶ The captain?")),
vPuzzle("🎖️ The captain", "Mr Fogg will go after the Sioux alone, if he must. What does the captain do?", ["Gives him thirty volunteers and an old sergeant", "Forbids him to go", "Goes himself with the whole garrison"], 0, ["", "He has no right to.", "The fort must be kept."], { yes: "✓ " + Q8("\"No, sir, you shall not go alone,\" cried the captain, touched in spite of himself. \"No! you are a brave man.") + "\"" }),
vTalk("Mr Fix", "Fix asks to go too. Mr Fogg asks something else of him.", vC("🤝 Stay with Aouda", Q8("\"Will you let me go with you?\" asked Fix.") + " " + Q8("\"Do as you please, sir. But if you wish to do me a favour, you will remain with Aouda.") + "\" Fix goes white: leave the man he has followed round the world? " + Q8("\"I will stay,\" said he."), "▶ They go")),
vNote("👜 The carpet-bag", "Mr Fogg presses Aouda's hand, leaves his precious carpet-bag with her, and goes off with the sergeant and the thirty men. " + Q8("It was then a little past noon."), "▶ Wait"),
vHold(e8At("kearney", -2, -14), 10, "Wait with Aouda at the station. It snows; the afternoon goes; the evening; the night.", { r: 5, say: "🌙 " + Q8("Throughout the night Aouda, full of sad forebodings, her heart stifled with anguish, wandered about on the verge of the plains.") }),
vTalk("Mudge", "In the night a man comes up to Fix and speaks to him. Fix sends him away. Talk to the man.", vC("🛷 A sledge with sails", "'A sledge, rigged with sails. With this west wind I could run anybody to Omaha in a few hours. Your man there said no.' He goes back to his sledge, and waits.", "▶ Dawn")),
vGo(e8At("kearney", 0, -58), "Dawn. Shots in the south! Run to the gate of the fort.", { r: 6 }),
vTalk("Passepartout", "Mr Fogg is marching at the head of the soldiers, and just behind him...", vC("🎉 Passepartout!", Q8("Mr. Fogg was marching at their head, and just behind him were Passepartout and the other two travellers, rescued from the Sioux.") + " " + Q8("Shortly before the detachment arrived, Passepartout and his companions had begun to struggle with their captors, three of whom the Frenchman had felled with his fists, when his master and the soldiers hastened up to their relief."), "▶ The train!")),
vNote("🚂 The train! the train!", Q8("\"The train! the train!\" cried he.") + " " + Q8("\"Gone,\" replied Fix.") + " " + Q8("\"And when does the next train pass here?\" said Phileas Fogg.") + " " + Q8("\"Not till this evening.\"") + " " + Q8("\"Ah!\" returned the impassible gentleman quietly."), "▶ Go on")
] });
E8_CH.push({ n: "XXXI", t: "In which Fix, the Detective, Considerably Furthers the Interests of Phileas Fogg", tune: "e8danube", keep: ["e8_sail", "A scrap of the sledge's brigantine sail", "⛵"],
intro: "Fort Kearney, morning", words: Q8("Phileas Fogg found himself twenty hours behind time. Passepartout, the involuntary cause of this delay, was desperate. He had ruined his master!"),
setup: function (f) { var I = VRN_IN.e8_car; E8.carView = "snow"; if (I && I.view)
I.view("snow"); e8Out("e8_car", "newyork", -6, -40, "Down onto the platform, New York."); },
cast: [e8Fogg(e8At("kearney", -2, -14), Math.PI), e8Aouda(e8At("kearney", -4, -12), Math.PI), e8Pass(e8At("kearney", 0, -12), Math.PI), e8Fix(e8At("kearney", 4, -14), Math.PI),
{ key: "mudge", name: "Mudge", role: "mudge", at: e8At("kearney", 22, -16), ry: Math.PI, persona: "You are Mudge, the owner of a sail-sledge at Fort Kearney, Nebraska, in December 1872: a quiet, weather-beaten prairie man who knows the snow and the winds. Mr Fogg has offered you a handsome reward to reach Omaha in time.", greet: "West wind, hard snow. Couldn't be better." }],
steps: [
vRead(),
vTalk("Mr Fix", "Fix comes up to Mr Fogg and looks him in the face.", vC("❓ In great haste?", Q8("\"Seriously, sir, are you in great haste?\"") + " " + Q8("\"Quite seriously.\"") + " " + Q8("\"And, if your journey had not been interrupted by these Indians, you would have reached New York on the morning of the 11th?\"") + " " + Q8("\"Yes; with eleven hours to spare before the steamer left.\""), "▶ Go on")),
vPuzzle("⏱️ Fix's sum", "Mr Fogg is twenty hours behind. He had twelve hours to spare in New York. How many hours must he win back?", ["Eight", "Twenty", "Thirty-two"], 0, ["", "He has twelve in hand.", "That's adding, not subtracting."], { yes: "✓ " + Q8("\"Good! you are therefore twenty hours behind. Twelve from twenty leaves eight. You must regain eight hours. Do you wish to try to do so?\"") + " " + Q8("\"On foot?\" asked Mr. Fogg.") + " " + Q8("\"No; on a sledge,\" replied Fix. \"On a sledge with sails. A man has proposed such a method to me.\"") }),
vSpot("Mudge's sledge", "Look at the sledge.", { say: "🛷 " + Q8("It was, in short, a sledge rigged like a sloop.") }),
vTalk("Mudge", "Mr Fogg makes his bargain with Mudge. Ask him how fast it goes.", vC("🌬️ Forty miles an hour", Q8("Mr. Fogg readily made a bargain with the owner of this land-craft. The wind was favourable, being fresh, and blowing from the west.") + " 'Faster than the express, mister, with the wind behind her.'", "▶ Aouda?")),
vTalk("Aouda", "Mr Fogg would leave Aouda to come on by the train, with Passepartout. She will not be left.", vC("💛 With him", "She refuses to be parted from Mr Fogg; Passepartout is delighted. And Fix comes too.", "▶ Aboard")),
e8Ride("Across the snow to Omaha", "sledge", E8_PORT.kearney, E8_PORT.omaha, "🛷 <b>The sledge</b> flies over the hard snow, both sails full.", [[0.83, "🌬️ " + Q8("The sledge sped on as lightly as a boat over the waves.")], [0.84, "🎻 " + Q8("These lashings, like the chords of a stringed instrument, resounded as if vibrated by a violin bow.")], [0.85, "❄️ The Platte River, under the snow. Twenty miles to go."]], e8Land("omaha", -4, -30, "🏙️ " + Q8("It stopped at last, and Mudge, pointing to a mass of roofs white with snow, said: \"We have got there!\""), "in")),
vPuzzle("🎻 The music of the mast", "The sledge's metal lashings sang in the wind. Mr Fogg said only one thing on the whole journey. What?", ["\"Those chords give the fifth and the octave\"", "\"Faster!\"", "\"I am cold\""], 0, ["", "He never says that.", "Never."], { yes: "✓ " + Q8("These were the only words he uttered during the journey.") }),
vSpot("Omaha station", "A train is ready to start. Run!", { say: "🚂 Barely time to jump in. Council Bluffs, Des Moines, Iowa City, the Mississippi by night, Chicago in the morning, and on." }),
e8Carry("Into the train", e8Into("e8_car", -10, 0, -Math.PI / 2, "🚂 <b>Omaha to Chicago, Chicago to New York.</b>")),
e8Ride("Iowa, Illinois, Indiana, Ohio, Pennsylvania, New Jersey", "train", E8_PORT.omaha, E8_PORT.newyork, "🚂 Nine hundred miles from Chicago to New York.", [[0.87, "🌆 Chicago, risen from its ruins."], [0.88, "🌄 Fort Wayne, Cleveland, Pittsburgh."]], e8Land("newyork", -30, -26, "⚓ <b>New York,</b> a quarter past eleven at night, the 11th of December. The Cunard pier.", "in")),
vSpot("The Cunard pier", "Run to the Cunard pier: the China, for Liverpool.", { say: "🌊 " + Q8("The China, for Liverpool, had started three-quarters of an hour before!") })
] });
E8_CH.push({ n: "XXXII", t: "In which Phileas Fogg Engages in a Direct Struggle with Bad Fortune", tune: "e8danube", keep: ["e8_ticket", "A passage to Bordeaux, two thousand dollars", "🎟️"],
intro: "New York, the 12th of December", words: "The China has gone, and with her Mr Fogg's last hope. Passepartout is crushed: lost by three-quarters of an hour, and his fault. The party crosses the Hudson and goes to the St. Nicholas Hotel for the night.",
cast: [e8Fogg(e8At("newyork", -30, -30), 0), e8Pass(e8At("newyork", -26, -30), Math.PI / 2), e8Aouda(e8At("newyork", -28, -32), Math.PI / 2),
{ key: "speedy", name: "Andrew Speedy, of Cardiff", role: "speedy", at: e8At("newyork", 34, -6), ry: Math.PI, persona: "You are Andrew Speedy, of Cardiff, captain and owner of the trading steamer Henrietta at New York in December 1872, from Jules Verne's Around the World in Eighty Days (the book only): about fifty, a sort of sea-wolf, big eyes, a complexion of oxidised copper, red hair, a thick neck and a growling voice. You never carry passengers; you are bound for Bordeaux and nowhere else.", greet: "What do you want?" },
{ key: "cabman", name: "A New York cabman", role: "yankee", at: e8At("newyork", -10, -32), ry: Math.PI, persona: "You are a hack driver on the West Street piers of New York in December 1872, cold and cheerful, who knows every ship in the harbour.", greet: "The China? Gone, sir. Three-quarters of an hour ago." }],
steps: [
vRead(),
vTalk("Phileas Fogg", "Mr Fogg consults his Bradshaw. Ask him about the other steamers.", vC("📖 Bradshaw", Q8("The Pereire, of the French Transatlantic Company, whose admirable steamers are equal to any in speed and comfort, did not leave until the 14th; the Hamburg boats did not go directly to Liverpool or London, but to Havre; and the additional trip from Havre to Southampton would render Phileas Fogg's last efforts of no avail."), "▶ The river")),
vTalk("A New York cabman", "In the morning, Mr Fogg goes out alone along the river. Ask the cabman what is sailing.", vC("🚢 Nothing for Liverpool", "'Liners? Nothing till the 14th, sir. Sailing ships, a few, but they're no use to a man in a hurry. Try down by the Battery: there's steam getting up down there.'", "▶ The Battery")),
vSpot("The Henrietta, at her moorings", "There! A trading vessel with a screw, her funnel smoking. Go and look.", { say: "⚓ " + Q8("He seemed about to give up all hope, when he espied, anchored at the Battery, a cable's length off at most, a trading vessel, with a screw, well-shaped, whose funnel, puffing a cloud of smoke, indicated that she was getting ready for departure.") }),
vTalk("Andrew Speedy, of Cardiff", "Mr Fogg hails a boat and goes aboard. The captain presents himself.", vC("⚓ Bordeaux", Q8("\"I am Phileas Fogg, of London.\"") + " " + Q8("\"And I am Andrew Speedy, of Cardiff.\"") + " " + Q8("\"You are bound for—\"") + " " + Q8("\"Bordeaux.\"") + " " + Q8("\"Have you any passengers?\"") + " " + Q8("\"No passengers. Never have passengers. Too much in the way.\"") + " " + Q8("\"Will you carry me and three other persons to Liverpool?\"") + " " + Q8("\"To Liverpool? Why not to China?\""), "▶ Go on")),
vNote("🙅 No", Q8("\"I will freight it for you.\"") + " " + Q8("\"No.\"") + " " + Q8("\"I will buy it of you.\"") + " " + Q8("\"No.\"") + " " + Q8("Phileas Fogg did not betray the least disappointment; but the situation was a grave one."), "▶ Bordeaux, then?"),
vPuzzle("💵 Passengers", "Mr Fogg offers two thousand dollars apiece to go as passengers to Bordeaux. There are four of them. What does Captain Speedy stand to gain?", ["Eight thousand dollars", "Two thousand dollars", "Two hundred dollars"], 0, ["", "Apiece!", "That's what he said he wouldn't take."], { yes: "✓ " + Q8("Besides, passengers at two thousand dollars are no longer passengers, but valuable merchandise. \"I start at nine o'clock,\" said Captain Speedy, simply. \"Are you and your party ready?\"") + " " + Q8("\"We will be on board at nine o'clock,\" replied, no less simply, Mr. Fogg.") }),
vGo(e8At("newyork", -26, -32), "Half-past eight! Back to fetch the others from the hotel.", { r: 6 }),
vTalk("Passepartout", "Tell Passepartout what this voyage is going to cost.", vC("😮 Oh!", Q8("When Passepartout heard what this last voyage was going to cost, he uttered a prolonged \"Oh!\" which extended throughout his vocal gamut."), "▶ Aboard!")),
e8Carry("Aboard the Henrietta at nine", e8Into("e8_henri", -8, 0, -Math.PI / 2, "⚓ <b>The Henrietta.</b> Nine o'clock: the anchor comes up."))
] });
E8_CH.push({ n: "XXXIII", t: "In which Phileas Fogg Shows Himself Equal to the Occasion", tune: "e8storm", keep: ["e8_plank", "A plank of the Henrietta, half burned", "🪵"],
start: { room: "e8_henri" }, intro: "The Henrietta, out of New York", words: "An hour later the Henrietta passes the lighthouse at the mouth of the Hudson, turns Sandy Hook and puts to sea. The next day at noon a man goes up on the bridge to take the ship's position. It is not Captain Speedy.",
setup: function (f) { var I = VRN_IN.e8_henri; if (I && I.burn)
I.burn(0); f.burned = 0; },
cast: [e8Fogg(e8In("e8_henri", -24, 1.6), Math.PI / 2), e8Aouda(e8In("e8_henri", -6, 2.2), -Math.PI / 2), e8Pass(e8In("e8_henri", 4, 2), -Math.PI / 2, { wander: 2 }), e8Fix(e8In("e8_henri", 14, -2.4), Math.PI),
{ key: "engineer", name: "The engineer of the Henrietta", role: "sailor", at: e8In("e8_henri", 8, 1.6), ry: Math.PI, persona: "You are the engineer of the trading steamer Henrietta in December 1872, gone over with the crew to Mr Fogg for his banknotes. Plain-spoken: you had coal enough for short steam to Bordeaux, not full steam to Liverpool.", greet: "Fires are hot, sir. For now." },
{ key: "speedy", name: "Captain Speedy", role: "speedy", at: e8In("e8_henri", -19, 4), ry: Math.PI, persona: "You are Andrew Speedy, of Cardiff, captain and owner of the Henrietta, December 1872: locked in your own cabin by your own crew, who have gone over to that Englishman. Furious, red-faced, roaring; but an American can scarcely remain unmoved at the sight of sixty thousand dollars.", greet: "Pirate! Pickaroon!" }],
steps: [
vRead(),
vSpot("The Henrietta's wheel", "Who is steering? Go aft to the wheel.", { room: "e8_henri", say: "🧭 " + Q8("This was why Phileas Fogg was in command instead of Captain Speedy; why the captain was a prisoner in his cabin; and why, in short, the Henrietta was directing her course towards Liverpool.") }),
vPuzzle("🏴 How?", "How has Mr Fogg come to command another man's ship?", ["His banknotes won the sailors and stokers over to him, and the captain is locked in his cabin", "He fought the captain", "He bought her at New York"], 0, ["", "Not his way.", "Speedy refused."], { yes: "✓ " + Q8("It was very clear, to see Mr. Fogg manage the craft, that he had been a sailor.") }),
vSpot("The captain's cabin", "Listen at Captain Speedy's door.", { room: "e8_henri" }),
e8Ride("East across the Atlantic", "henri", E8_PORT.newyork, 0.93, "🚢 <b>The Henrietta</b> heads east, all steam on.", [[0.9, "🌊 Fine weather: the first days go well."], [0.915, "⛈️ The Banks of Newfoundland: a gale from the south-east. Sails furled, more steam."]], e8Into("e8_henri", -8, 0, -Math.PI / 2, "🌊 <b>The 16th of December,</b> the seventy-fifth day. The engineer comes up on deck."), { pad1: 0 }),
vTalk("The engineer of the Henrietta", "The engineer speaks earnestly to Mr Fogg. Passepartout would give an ear to hear it. Listen.", vC("⚫ The coal", Q8("\"Certain, sir,\" replied the engineer. \"You must remember that, since we started, we have kept up hot fires in all our furnaces, and, though we had coal enough to go on short steam from New York to Bordeaux, we haven't enough to go with all steam from New York to Liverpool.\" \"I will consider,\" replied Mr. Fogg."), "▶ Mr Fogg's order"), { room: "e8_henri" }),
vSpot("The furnace hatch", "Look into the stokehold.", { room: "e8_henri", say: "🔥 " + Q8("\"Do not let the fires go down,\" replied Mr. Fogg. \"Keep them up to the last. Let the valves be filled.\"") }),
vTalk("Captain Speedy", "Mr Fogg has sent Passepartout for the captain. A bomb appears on the poop-deck.", vC("💣 Pirate!", Q8("\"Where are we?\" he repeated, with purple face.") + " " + Q8("\"Seven hundred and seven miles from Liverpool,\" replied Mr. Fogg, with imperturbable calmness.") + " " + Q8("\"Pirate!\" cried Captain Speedy.") + " " + Q8("\"—sir,\" continued Mr. Fogg, \"to ask you to sell me your vessel.\"") + " " + Q8("\"No! By all the devils, no!\"") + " " + Q8("\"But I shall be obliged to burn her.\""), "▶ Burn her?"), { room: "e8_henri" }),
vPuzzle("💵 A great bargain", "The Henrietta is worth fifty thousand dollars, Speedy roars. What does Mr Fogg offer?", ["Sixty thousand: and Speedy keeps the iron hull and the engine", "Fifty thousand exactly", "Twenty thousand pounds"], 0, ["", "Mr Fogg pays well when he must.", "That's his wager!"], { yes: "✓ " + Q8("\"Here are sixty thousand,\" replied Phileas Fogg, handing the captain a roll of bank-bills.") + " " + Q8("The bomb would not go off after all. Mr. Fogg had taken away the match.") + " " + Q8("\"Captain Fogg, you've got something of the Yankee about you.\"") }),
vNote("🪓 Burn them", Q8("And, having paid his passenger what he considered a high compliment, he was going away, when Mr. Fogg said, \"The vessel now belongs to me?\"") + " " + Q8("\"Certainly, from the keel to the truck of the masts—all the wood, that is.\"") + " " + Q8("\"Very well. Have the interior seats, bunks, and frames pulled down, and burn them.\""), "▶ To work!"),
vFind("plank", e8In("e8_henri", -17, 3.6), "Planks from the poop cabin", "Pull down the poop cabin: carry its planks to the furnace.", { room: "e8_henri", verb: "tear it down", done: function (f) { e8Stoke(f); }, say: "🔥 The cabin goes into the furnaces. The steam holds." }),
vFind("plank", e8In("e8_henri", -18, -2.2), "The bunks", "Now the bunks.", { room: "e8_henri", verb: "break them up", done: function (f) { e8Stoke(f); }, say: "🔥 The bunks, into the fire." }),
vFind("plank", e8In("e8_henri", -16, 1), "The masts and spars", "The 19th of December: the masts, the rafts and the spars.", { room: "e8_henri", verb: "cut them down", done: function (f) { e8Stoke(f); }, say: "🪓 " + Q8("Passepartout hewed, cut, and sawed away with all his might. There was a perfect rage for demolition.") }),
vFind("plank", e8In("e8_henri", 12, 2.8), "The deck-house", "The deck-house next.", { room: "e8_henri", verb: "tear it down", done: function (f) { e8Stoke(f); }, say: "🔥 The deck-house, into the furnaces." }),
vFind("plank", e8In("e8_henri", 0, 4), "The railings and top sides", "The 20th: the railings, the fittings, the top sides.", { room: "e8_henri", verb: "break them off", done: function (f) { e8Stoke(f); }, say: "🚢 The Henrietta is a flat hulk now; and there, the Irish coast and the Fastnet Light." }),
e8Ride("The Irish coast, on the last of the steam", "henri", 0.93, 0.955, "🚢 The Henrietta, a bare iron hulk, smokes on towards Ireland.", [[0.945, "🗼 The Fastnet Light."]], e8Into("e8_henri", -8, 0, -Math.PI / 2, "🌃 <b>Ten in the evening, the 20th.</b> The lights of Queenstown."), { pad0: 0, pad1: 0 }),
vTalk("Captain Speedy", "Captain Speedy, now deeply interested in Mr Fogg's project, is sorry for him.", vC("🗼 Queenstown", Q8("\"Sir,\" said Captain Speedy, who was now deeply interested in Mr. Fogg's project, \"I really commiserate you. Everything is against you. We are only opposite Queenstown.\"") + " " + Q8("\"Ah,\" said Mr. Fogg, \"is that place where we see the lights Queenstown?\"") + " " + Q8("\"Yes.\"") + " " + Q8("\"Can we enter the harbour?\"") + " " + Q8("\"Not under three hours. Only at high tide.\"") + " " + Q8("\"Stay,\" replied Mr. Fogg calmly, without betraying in his features that by a supreme inspiration he was about to attempt once more to conquer ill-fortune."), "▶ His idea?"), { room: "e8_henri" }),
vPuzzle("✉️ Like the mails", "How will Mr Fogg win twelve hours at Queenstown?", ["Go ashore and follow the mails: the express to Dublin, the fast boat to Liverpool", "Swim", "Wait for the tide and steam on"], 0, ["", "In December?", "Then the steam would run out."], { yes: "✓ " + Q8("These mails are carried to Dublin by express trains always held in readiness to start; from Dublin they are sent on to Liverpool by the most rapid boats, and thus gain twelve hours on the Atlantic steamers.") }),
e8Ride("Queenstown, Dublin, and the fast boat to Liverpool", "steamer", 0.955, E8_PORT.liverpool, "🚂 Ashore at one in the morning; the express to Dublin; the fast boat over to Liverpool.", [[0.965, "🚂 The night express to Dublin."], [0.972, "⛴️ One of the fast boats across the Irish Sea."]], e8Land("liverpool", -6, -30, "⚓ <b>Liverpool.</b> " + Q8("Phileas Fogg at last disembarked on the Liverpool quay, at twenty minutes before twelve, 21st December. He was only six hours distant from London."), "in"), { pad0: 0 }),
vSpot("The quay clock", "Look at the quay clock: twenty minutes before noon. Nine hours and a quarter to reach the Reform; six to London.", {}),
vTalk("Mr Fix", "Fix comes up and puts his hand on Mr Fogg's shoulder.", vC("🚨 In the Queen's name", Q8("But at this moment Fix came up, put his hand upon Mr. Fogg's shoulder, and, showing his warrant, said, \"You are really Phileas Fogg?\"") + " " + Q8("\"I am.\"") + " " + Q8("\"I arrest you in the Queen's name!\""), "▶ Oh no"))
] });
(function () { var C = E8_CH[E8_CH.length - 1]; C.cast.push(e8Fix(e8At("liverpool", -2, -34), Math.PI / 2, { key: "fixl" }), e8Fogg(e8At("liverpool", 0, -34), -Math.PI / 2, { key: "foggl" }), e8Aouda(e8At("liverpool", 0, -36), -Math.PI / 2, { key: "aoudal" }), e8Pass(e8At("liverpool", 2, -34), -Math.PI / 2, { key: "passl" })); })();
E8_CH.push({ n: "XXXIV", t: "In which Phileas Fogg at Last Reaches London", tune: "e8nacht", keep: ["e8_journal", "\"80th day, 11.40 a.m.\"", "📓"],
intro: "Under the portico of the Custom House, Liverpool", words: Q8("Phileas Fogg was in prison. He had been shut up in the Custom House, and he was to be transferred to London the next day."),
cast: [e8Pass(e8At("liverpool", -2, -62), Math.PI), e8Aouda(e8At("liverpool", 2, -62), Math.PI),
e8Fogg(e8In("e8_custom", 0, -10.6), 0, { key: "foggcu", greet: "..." }),
{ key: "guard", name: "A Custom House officer", role: "clerk", at: e8In("e8_custom", 2, -4), ry: Math.PI, persona: "You are an officer of H.M. Custom House at Liverpool on the 21st of December 1872, guarding a gentleman arrested for the Bank of England robbery: correct, unsmiling, but not unkind.", greet: "No visitors for the prisoner, I'm afraid." },
e8Fix(e8In("e8_custom", 0, 4), 0, { key: "fixcu" })],
steps: [
vRead(),
vTalk("Passepartout", "Passepartout and Aouda stay under the portico of the Custom House, in the cold. Speak to Passepartout.", vC("😢 My fault", Q8("The thought then struck Passepartout, that he was the cause of this new misfortune! Had he not concealed Fix's errand from his master?") + " Aouda's heart revolts against the charge; she weeps.", "▶ Inside")),
vSpot("The Custom House", "Go into the Custom House."),
vSpot("The door of the lock-up", "Look through the grille of the lock-up.", { room: "e8_custom", say: "🪑 " + Q8("If anyone, at this moment, had entered the Custom House, he would have found Mr. Fogg seated, motionless, calm, and without apparent anger, upon a wooden bench.") }),
vNote("📓 The journal", Q8("However that may have been, Mr. Fogg carefully put his watch upon the table, and observed its advancing hands.") + " " + Q8("On the line where these words were written, \"21st December, Saturday, Liverpool,\" he added, \"80th day, 11.40 a.m.,\" and waited."), "▶ Wait"),
vSpot("The Custom House clock", "Look at the Custom House clock.", { room: "e8_custom", say: "🕐 " + Q8("The Custom House clock struck one. Mr. Fogg observed that his watch was two hours too fast.") }),
vPuzzle("⏱️ Two hours", "His watch was two hours fast: it is one o'clock, not three. Is there still time?", ["Yes: an express now would reach the Reform by a quarter to nine", "No: it is far too late", "Only by balloon"], 0, ["", "Not yet.", "There is a railway."], { yes: "✓ " + Q8("Two hours! Admitting that he was at this moment taking an express train, he could reach London and the Reform Club by a quarter before nine, p.m.") }),
vHold(e8In("e8_custom", 0, -3), 8, "Wait in the hall with the officer. Two o'clock... half past...", { room: "e8_custom", r: 5, say: "🚪 " + Q8("At thirty-three minutes past two he heard a singular noise outside, then a hasty opening of doors. Passepartout's voice was audible, and immediately after that of Fix.") }),
vTalk("Mr Fix", "Fix bursts in, out of breath, his hair in disorder.", vC("🗝️ You are free!", Q8("Fix was out of breath, and his hair was in disorder. He could not speak. \"Sir,\" he stammered, \"sir—forgive me—most—unfortunate resemblance—robber arrested three days ago—you are free!\""), "▶ Mr Fogg"), { room: "e8_custom" }),
vNote("👊 With the precision of a machine", Q8("Phileas Fogg was free! He walked to the detective, looked him steadily in the face, and with the only rapid motion he had ever made in his life, or which he ever would make, drew back his arms, and with the precision of a machine knocked Fix down.") + " " + Q8("\"Well hit!\" cried Passepartout, \"Parbleu! that's what you might call a good application of English fists!\""), "▶ The station!"),
vPuzzle("🚂 A special", "At the station it is twenty to three. The express went thirty-five minutes ago. What does Mr Fogg do?", ["Orders a special train", "Waits for the next express", "Takes a cab to London"], 0, ["", "There is no time for that.", "Two hundred miles?"], { yes: "✓ " + Q8("Phileas Fogg then ordered a special train.") + " " + Q8("At that hour Phileas Fogg, having stimulated the engineer by the offer of a generous reward, at last set out towards London with Aouda and his faithful servant.") }),
e8Ride("The special train to London", "train", E8_PORT.liverpool, 0.999, "🚂 <b>The special,</b> three o'clock: five hours and a half to London, if the road is clear.", [[0.985, "🚦 A signal: held. And again."], [0.993, "🌃 Dark, and the lamps of London ahead."]], null, { pad0: 0.002, pad1: 0 }),
vNote("🕰️ Ten minutes before nine", Q8("It was necessary to make the journey in five hours and a half; and this would have been easy on a clear road throughout. But there were forced delays, and when Mr. Fogg stepped from the train at the terminus, all the clocks in London were striking ten minutes before nine.") + " " + Q8("Having made the tour of the world, he was behind-hand five minutes. He had lost the wager!"), "▶ Home, to Saville Row")
] });
(function () {
var S = { VII: e8St("suez", 0, -54), XIII: e8St("pillaji", -14, -24, "in"), XIV: e8St("allahabad", -6, -34), XV: e8St("calcutta", -4, -32), XVII: { room: "e8_deck" }, XVIII: { room: "e8_deck" },
XIX: e8St("hongkong", -18, -30), XXIII: e8St("yokohama", -14, -66), XXIV: { room: "e8_deck" }, XXV: e8St("sanfran", -6, -32), XXIX: { room: "e8_car" }, XXX: e8St("kearney", -2, -18),
XXXI: e8St("kearney", -2, -18), XXXII: e8St("newyork", -28, -28), XXXIV: e8St("liverpool", 0, -58) };
var setups = { XVII: function () { e8Ship("Rangoon", "calcutta", 16); }, XXVII: function () { var I = VRN_IN.e8_car; E8.carView = "plains"; if (I && I.view)
I.view("plains"); },
XXIX: function () { var I = VRN_IN.e8_car; E8.carView = "snow"; if (I && I.view)
I.view("snow"); } };
E8_CH.forEach(function (C) { if (!C.start && S[C.n])
C.start = S[C.n]; if (!C.setup && setups[C.n])
C.setup = setups[C.n]; });
})();
if (typeof VBK_DOORS !== "undefined")
Object.assign(VBK_DOORS, { e8_consul: "The British consulate, Suez", e8_pagoda: "The pagoda on Malabar Hill", e8_temple: "The pagoda of Pillaji",
e8_court: "The court-house", e8_tavern: "A tavern on the quay", e8_circus: "Batulcar's circus", e8_custom: "The Custom House" });
VBK_BOOKS.eighty.finish = function (S) { return __ZC(481, 65, this, arguments, new.target); };
function e8ToLondon(k) { return __ZC(481, 66, this, arguments, new.target); }
function e8ToVerne() { if (typeof vrnGo === "function")
vrnGo({ vbk: "eighty" });
else
worldGo(VRN_KEY, { vbk: "eighty" }); }
function e8Book() { return store[VBK_BOOKS.eighty.store] || { ch: 0, s: 0, started: 0, done: 0 }; }
function e8Restore() { try {
if (store.vbookOn === "eighty")
store.vbookOn = E8.prevBook && VBK_BOOKS[E8.prevBook] ? E8.prevBook : "voy";
}
catch (e) { } }
(function () {
if (typeof vbkUse === "function") {
var u0 = vbkUse;
vbkUse = function (k) { if (k === "eighty" && VBK_BK !== "eighty")
E8.prevBook = VBK_BK; return u0.apply(this, arguments); };
}
if (typeof vbkBegin === "function") {
var b0 = vbkBegin;
vbkBegin = function () {
if (VBK_BK === "eighty" && WLD.on === VRN_KEY) {
var S = vbkS(), P = typeof pmbS === "function" ? pmbS() : null;
if (!S.started && !(P && P.ch >= 1)) {
setStatus("🌍 <b>Around the World in Eighty Days</b> begins in London, at <b>No. 7, Saville Row</b>: the Pall Mall book. Its door is in the Hall of Doors.");
return;
}
}
return b0.apply(this, arguments);
};
}
if (typeof vbkChapterBegin === "function") {
var c0 = vbkChapterBegin;
vbkChapterBegin = function (place) {
if (VBK_BK === "eighty") {
var S = vbkS(), P = typeof pmbS === "function" ? pmbS() : null;
try {
e8ChapterState(S.ch);
}
catch (e) {
if (window.console)
console.warn("[e8] state", e);
}
if (S.ch >= 1 && !S.done && P && !P.done && P.ch < 3) {
if (place || !S.f.e8home) {
S.f.e8home = 1;
vbkSave();
vbkSay("🎩 <b>London.</b> Mr Fogg has gone home to No. 7, Saville Row to pack: the book carries you there.");
setTimeout(function () { e8ToLondon(1); }, 1800);
}
else
vbkSay("🎩 The next chapters of <b>Around the World in Eighty Days</b> are walked in London, at No. 7, Saville Row.");
return;
}
}
return c0.apply(this, arguments);
};
}
if (typeof pmbChapterBegin === "function") {
var p0 = pmbChapterBegin;
pmbChapterBegin = function (place) {
var P = pmbS(), E = e8Book();
var need = (P.ch === 1 && !(E.ch >= 1 || E.done)) || (P.ch === 3 && !E.done);
if (need && !P.done) {
if (place || !P.f.e8sent) {
P.f.e8sent = 1;
pmbSave();
setStatus(P.ch === 1 ? "🃏 <b>The Reform Club.</b> That evening, over whist, Mr Fogg lays his wager: the book carries you to the Reform, in Jules Verne's World." : "🌍 <b>Round the world.</b> Mr Fogg is at Suez already: the book carries you onto the world line, in Jules Verne's World.");
setTimeout(e8ToVerne, 1800);
}
else
setStatus("🌍 Mr Fogg is away round the world. Open the book (<b>E</b>) and <b>Carry on</b> to go after him.");
return;
}
return p0.apply(this, arguments);
};
}
if (typeof pmbOpen === "function") {
var o0 = pmbOpen;
pmbOpen = function () {
var r = o0.apply(this, arguments);
try {
var c = WLD.card;
if (c && c.innerHTML.indexOf("Five chapters.") >= 0)
c.innerHTML = c.innerHTML.replace("Five chapters.", "And between them, the whole journey round the world, walked in Jules Verne's World: the wager at the Reform, Suez, Bombay, the forests of India and Aouda, Hong Kong and the typhoon, Yokohama, the Pacific, the railroad across America, the Henrietta and the Custom House at Liverpool. The whole book, every chapter of it.");
}
catch (e) { }
return r;
};
}
})();
function e8ChapterState(n) { return __ZC(481, 67, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS[VRN_KEY];
if (!W)
return;
var t0 = W.tick, l0 = W.leave;
W.tick = function (dt) { var r = t0.apply(this, arguments); try {
e8Tick(dt);
}
catch (e) {
if (window.console)
console.warn("[e8] tick", e);
} return r; };
W.leave = function () { try {
e8BoatsAway();
e8Restore();
}
catch (e) { } return l0.apply(this, arguments); };
})();
if (typeof vrnForget === "function") {
(function () { var f0 = vrnForget; vrnForget = function () { var r = f0.apply(this, arguments); E8.ports = {}; E8.boats = {}; E8.bridge = null; return r; }; })();
}
function e8Tick(dt) { return __ZC(481, 68, this, arguments, new.target); }
(function () { var C = E8_CH.filter(function (c) { return c.n === "XXVI"; })[0]; if (!C)
return; C.steps.forEach(function (b) { if (b.k === "hold") {
var o0 = b.on, d0 = b.done;
b.on = function (f) { E8.carSp = 0; if (o0)
o0(f); };
b.done = function (f) { E8.carSp = 14; if (d0)
d0(f); };
} }); })();
