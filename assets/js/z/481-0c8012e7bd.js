/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(481, function () {
return [
function (grp, port, seed, n, looks, o) {
o = o || {};
var R = wRand(seed);
for (var i = 0; i < n; i++) {
var L = looks[i % looks.length], s = (o.s0 != null ? o.s0 : -55) + R() * (o.sw || 110), off = (o.o0 != null ? o.o0 : -48) + R() * (o.ow || 26), p = e8XZ(port, s, off);
vrnFolk(grp, seed + i, p.x, p.z, Object.assign({ y: e8Y(p), r: o.r || 10, look: Object.assign({}, L) }, o.say && o.say[i] ? { name: o.say[i][0], say: o.say[i][1], greet: o.say[i][2] } : {}));
}
},
function (grp, port, s, off, n, R) {
var g = e8Grp(grp, port, s, off, "e"), wood = vrnSurf("wood", 0x8A6A44, 1);
for (var i = 0; i < n; i++) {
var c = vrnBoxM(1.2, 1, 1.2, wood, (R() - 0.5) * 4, 0.5 + (i > 3 ? 1 : 0), (R() - 0.5) * 4, g);
c.rotation.y = R();
}
for (var b = 0; b < 2; b++)
wCyl(0.45, 0.45, 1.1, vrnSurf("wood", 0x6A4A2A, 1), 2.6, 0.55, -1.4 + b * 1.1, g, 10);
var p = e8XZ(port, s, off);
vrnSolid({ x: p.x, z: p.z, r: 2.6 });
return g;
},
function (grp, port, col) {
var stone = vrnSurf("stone", col || 0xC8BCA4, 3);
for (var s = -64; s <= 64; s += 16) {
var g = e8Grp(grp, port, s, -14, "e");
vrnBoxM(16.4, 0.1, 6, stone, 0, 0.05, 0, g);
wCyl(0.25, 0.3, 0.8, vrnMetal(0x2A2A2E), 2.6, 0.4, 2.4, g, 8);
}
var pv = e8Grp(grp, port, 0, -34, "e");
vrnPave(pv, 0, 0, 128, 34, 0, 0xD0C6B4, 4);
},
function (grp, R) {
var P = "suez", sand = 0xD8C8A0;
e8Quay(grp, P, 0xD8C8A8);
[[-56, -70, 14, 12, 0xE8DCC4], [-38, -74, 12, 16, 0xE0D0B0], [-20, -70, 14, 12, 0xEEE6D4], [22, -72, 16, 14, 0xE4D6BC], [42, -70, 12, 12, 0xE8DCC4], [58, -76, 10, 16, 0xD8C8A8],
[-50, -104, 16, 14, 0xE0D4BC], [-28, -108, 14, 16, 0xE8DCC8], [-6, -104, 12, 12, sand], [16, -108, 18, 14, 0xE8E0D0], [40, -106, 14, 16, 0xDCCCB0]].forEach(function (b, i) {
e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: "stone", col: b[4], floors: 1 + (i % 2), roof: false });
});
e8Bld(grp, P, 0, -72, 18, 14, { style: "stone", col: 0xF0E8D8, floors: 2, roof: false, sign: ["H.B.M. CONSULATE"] });
var fl = e8Grp(grp, P, 0, -63, "out");
wCyl(0.08, 0.08, 9, vrnMetal(0x3A3A3A), 4, 4.5 + 9, 0, fl, 6);
var fg = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), e8UnionMat());
fg.position.set(5.2, 17, 0);
fl.add(fg);
e8Spot(P, 0, -63, 3, "The British consulate, Suez", "go in", function () { vrnEnter("e8_consul"); });
e8Bld(grp, P, -36, -46, 10, 8, { style: "stone", col: 0xE8E0CC, floors: 1, roof: false, sign: ["PENINSULAR & ORIENTAL"] });
var ck = e8Grp(grp, P, -8, -36, "out");
wCyl(0.15, 0.2, 5, vrnMetal(0x2A2A2E), 0, 2.5, 0, ck, 8);
var face = wCyl(0.6, 0.6, 0.15, e8M(0xF4F0E4), 0, 5.4, 0, ck, 20);
face.rotation.x = Math.PI / 2;
wBox(0.05, 0.45, 0.03, e8M(0x141414), 0, 5.5, 0.1, ck);
wBox(0.3, 0.05, 0.03, e8M(0x141414), 0.12, 5.4, 0.1, ck);
e8Spot(P, -8, -36, 2.4, "The port clock", "look at the time", function () { setStatus("🕰️ The port clock of Suez: two hours ahead of London. Passepartout's watch will not believe it."); });
e8Spot(P, 30, -48, 2.6, "The shop for shirts and shoes", "look in", function () { setStatus("👞 A little shop under an awning: shirts, socks, Indian slippers, a hat or two. The shopkeeper bows you in."); });
e8Bld(grp, P, 30, -50, 10, 6, { style: "stone", col: 0xE8DCB8, floors: 1, roof: false });
for (var a = 0; a < 4; a++) {
var aw = e8Grp(grp, P, 24 + a * 3, -45, "out");
wBox(2.8, 0.08, 2.4, e8M([0xC83A2A, 0xF0E8D8, 0x2A6A8A, 0xE8C048][a]), 0, 3.4, 0, aw).rotation.x = 0.25;
}
for (var p = 0; p < 8; p++) {
var q = e8XZ(P, -60 + p * 17, -60 + (p % 2) * -4);
e8Palm(grp, q.x, q.z, 3, R);
}
e8Crates(grp, P, -50, -28, 6, R);
e8Crates(grp, P, 46, -26, 5, R);
for (var c = 0; c < 3; c++) {
var cg = e8Grp(grp, P, 52 + c * 4, -92, "e");
var bd = wSph(1, e8M(0xB8946A), 0, 1.6, 0, cg, 10);
bd.scale.set(0.8, 0.7, 1.5);
wSph(0.5, e8M(0xB8946A), 0, 2.3, 0, cg, 8);
var nk = wCyl(0.18, 0.25, 1.6, e8M(0xB8946A), 0, 2.2, 1.3, cg, 6);
nk.rotation.x = 0.8;
wSph(0.3, e8M(0xB8946A), 0, 2.8, 1.9, cg, 8);
[-0.4, 0.4].forEach(function (k) { [-0.8, 0.8].forEach(function (j) { wCyl(0.1, 0.08, 1.4, e8M(0xA88458), k, 0.7, j, cg, 5); }); });
}
for (var j = 0; j < 5; j++) {
var jg = e8Grp(grp, P, -62 + j * 1.2, -50, "e");
wSph(0.4, e8M(0xB86A3A), 0, 0.45, 0, jg, 8).scale.y = 1.3;
}
E8.mongolia = e8Steamer(grp, P, 10, 22, { name: "MONGOLIA" });
e8Folk(grp, P, 1301, 10, [{ _vb: "hindoo", sex: "m" }, { _vb: "man", sex: "m", hat: "none" }, { _vb: "sailor", sex: "m" }, { _vb: "clerk", sex: "m" }, { _vb: "woman", sex: "f" }], { say: [["An Arab boatman", "You are a boatman of the port of Suez in 1872, who rows passengers between the steamers and the quay. You speak a little English and much Arabic, and know every ship of the Peninsular and Oriental line.", "Boat, sir? To the steamer, quick, quick!"], null, ["A coal-heaver of the port", "You are a coal-heaver of Suez in 1872, carrying baskets of coal aboard the P. and O. steamers for the voyage down the Red Sea: hot, heavy, honest work.", "Four hours to coal her. She burns a mountain between here and Aden."]] });
},
function (grp, R) {
var P = "bombay";
e8Quay(grp, P, 0xB8B0A0);
[[-58, -74, 16, 14, 0xD8CCB0, "stone"], [-36, -72, 14, 12, 0xE8DCC0, "stone"], [-14, -76, 16, 18, 0xC8B898, "club"], [30, -72, 14, 14, 0xE0D4B8, "stone"], [50, -74, 16, 12, 0xD8C8A8, "stone"],
[-52, -108, 14, 14, 0xE8D0B0, "stone"], [-30, -110, 12, 12, 0xD8B898, "brick"], [-8, -108, 14, 16, 0xE8DCC4, "stone"], [38, -110, 16, 14, 0xE0C8A8, "stone"]].forEach(function (b, i) {
e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: b[5], col: b[4], floors: 2 + (i % 2), pitch: i % 3 === 0 ? 3 : 0 });
});
e8Bld(grp, P, 10, -70, 22, 14, { style: "club", col: 0xD8C8A8, floors: 2, sign: ["G. I. P. RAILWAY · BOMBAY"] });
e8Spot(P, 10, -62, 3, "The railway station", "look in", function () { setStatus("🚂 Bori Bunder station: the night train for Allahabad and Calcutta, eight o'clock. Passengers, porters, a sacred cow that walks where it likes."); });
e8Bld(grp, P, -36, -46, 10, 8, { style: "stone", col: 0xE8E0CC, floors: 1, roof: false, sign: ["PASSPORT OFFICE"] });
e8Spot(P, -36, -41, 2.6, "The passport office", "look in", function () { setStatus("📜 The passport office: a clerk with a pen, a fan turning overhead, a stamp."); });
var hill = e8Grp(grp, P, -30, -128, "out");
var hm = wSph(16, vrnSurf("grass", 0x5A7A3A, 3), 0, -8, 0, hill, 12);
hm.scale.set(1.6, 0.7, 1);
var pg = e8Grp(grp, P, -30, -124, "out", 6.5);
var stn = vrnSurf("stone", 0xE8DCC4, 2);
vrnBoxM(10, 6, 8, stn, 0, 3, 0, pg);
for (var t = 0; t < 5; t++)
vrnBoxM(9 - t * 1.6, 1.6, 7 - t * 1.2, stn, 0, 6.8 + t * 1.6, 0, pg);
wCone(0.8, 2, e8M(0xD8A830, { m: 0.6, r: 0.3 }), 0, 15.6, 0, pg, 8);
vrnBoxM(3, 4, 0.4, e8M(0x3A2A1A), 0, 2, 4.1, pg);
[-1, 1].forEach(function (k) { wCyl(0.35, 0.4, 5, stn, k * 2.4, 2.5, 4.4, pg, 10); });
for (var st = 0; st < 8; st++) {
var sp = e8Grp(grp, P, -30, -116 - st * 0.9, "out", 3 + st * 0.45);
vrnBoxM(5, 0.45, 0.9, stn, 0, 0, 0, sp);
}
e8Spot(P, -30, -116, 3.2, "The pagoda on Malabar Hill", "go in (take off your shoes!)", function () { vrnEnter("e8_pagoda"); });
var pq = e8XZ(P, -30, -121);
vrnFloor(pq.x, pq.z, 6, 6, 6.5);
for (var p = 0; p < 9; p++) {
var q = e8XZ(P, -62 + p * 15, -58 - (p % 3) * 3);
e8Palm(grp, q.x, q.z, 3, R);
}
for (var b = 0; b < 6; b++) {
var bg = e8Grp(grp, P, -58 + b * 9, -92, "out");
vrnBoxM(3.4, 0.9, 1.6, vrnSurf("wood", 0x7A5A3A, 1), 0, 0.45, 0, bg);
wBox(3.8, 0.08, 2.6, e8M([0xC83A2A, 0xE8A030, 0x2A8A6A, 0xD84A8A, 0xE8D040, 0x3A5AA8][b]), 0, 2.6, 0, bg).rotation.x = 0.2;
[0, 1, 2].forEach(function (k) { wCyl(0.32, 0.26, 0.3, e8M(0x8A6A3A), -1.1 + k * 1.1, 1.05, 0, bg, 8); wSph(0.26, e8M([0xD8742A, 0xE8C048, 0xA83A1A][k]), -1.1 + k * 1.1, 1.2, 0, bg, 8).scale.y = 0.5; });
}
e8Spot(P, -40, -90, 3, "The bazaar", "look at the stalls", function () { setStatus("🌶️ Turmeric, cardamom, chillies, cotton cloth, brass and copper pots, sugar cane: and every voice in Bombay bargaining at once."); });
E8.mongoliaB = e8Steamer(grp, P, -8, 22, { name: "MONGOLIA" });
e8Folk(grp, P, 2201, 12, [{ _vb: "hindoo", sex: "m" }, { _vb: "hindoow", sex: "f" }, { _vb: "parsee", sex: "m" }, { _vb: "gent", sex: "m" }, { _vb: "hindoo", sex: "m" }, { _vb: "hindoow", sex: "f" }], { say: [["A porter of the station", "You are a railway porter at the Bombay terminus of the Great Indian Peninsula Railway in 1872. Proud of the new line, which goes all the way to Calcutta now: or nearly all the way.", "The Calcutta train, sahib? Eight o'clock. All the way, they say."], null, ["A Parsee merchant of Bombay", "You are a Parsee cotton merchant of Bombay in 1872, prosperous and courteous, in a tall hat of the Parsee kind, who has seen the city grow with the new railway and the Suez Canal.", "Welcome to Bombay. The canal has brought all Europe to our door."]] });
},
function (grp, R) {
var P = "kholby", wood = vrnSurf("wood", 0x7A5A3A, 1), thatch = e8M(0xB89A5A);
[[-40, -60], [-20, -66], [20, -62], [40, -68], [-30, -96], [10, -98]].forEach(function (b, i) {
var g = e8Grp(grp, P, b[0], b[1], i < 4 ? "out" : "out");
vrnBoxM(8, 3, 6, vrnSurf("plaster", 0xE8DCC0, 2), 0, 1.5, 0, g);
var rf = new THREE.Mesh(vrnPitchGeo(9, 7, 2.2, 0.5), thatch);
rf.position.y = 3;
g.add(rf);
wBox(9.4, 0.2, 1.6, wood, 0, 2.4, 3.6, g);
[-4, 4].forEach(function (k) { wCyl(0.1, 0.1, 2.4, wood, k, 1.2, 4.2, g, 5); });
var q = e8XZ(P, b[0], b[1]);
vrnSolid({ x: q.x, z: q.z, r: 4.5 });
});
var end = e8Grp(grp, P, 30, 0, "e");
vrnBoxM(4, 1.4, 0.6, e8M(0xC83A2A), 0, 0.7, 0, end);
vrnSign(["END OF THE LINE"], 3.4, 0.6, 0, 1.9, 0.4, 0, end);
for (var s = 0; s < 6; s++) {
var sl = e8Grp(grp, P, 34 + s * 1.2, 8, "e");
vrnBoxM(2.6, 0.3, 0.3, wood, 0, 0.15 + s * 0.3, 0, sl);
}
e8Spot(P, 30, 0, 3, "The end of the rails", "look", function () { setStatus("🛤️ The rails stop here, in the middle of a forest of dates and acacias. Fifty miles still to lay to Allahabad."); });
for (var t = 0; t < 26; t++) {
var q = e8XZ(P, -70 + R() * 140, (R() < 0.5 ? -1 : 1) * (80 + R() * 55));
e8Palm(grp, q.x, q.z, 3, R);
}
var el = e8Grp(grp, P, -6, -44, "e");
var em = e8ElephantModel();
el.add(em);
E8.kiouniHome = el;
var hut = e8Grp(grp, P, -12, -50, "out");
vrnBoxM(5, 2.6, 4, vrnSurf("plaster", 0xD8C8A8, 2), 0, 1.3, 0, hut);
var hr = new THREE.Mesh(vrnPitchGeo(6, 5, 1.8, 0.4), thatch);
hr.position.y = 2.6;
hut.add(hr);
e8Folk(grp, P, 2701, 7, [{ _vb: "hindoo", sex: "m" }, { _vb: "clerk", sex: "m" }, { _vb: "hindoow", sex: "f" }, { _vb: "gent", sex: "m" }], { o0: -40, ow: 30, say: [["A workman of the railway", "You are a workman laying the Great Indian Peninsula Railway near Kholby in 1872. The rails stop here; there are fifty miles still to lay to Allahabad. You are paid by the mile.", "Fifty miles more, sahib. Next year, perhaps."]] });
},
function (grp, R) {
var P = "pillaji";
for (var t = 0; t < 60; t++) {
var s = -70 + R() * 140, off = (R() < 0.5 ? -1 : 1) * (20 + R() * 120);
if (Math.abs(off) < 26 && Math.abs(s - 10) < 30)
continue;
var q = e8XZ(P, s, off);
if (R() < 0.4)
e8Palm(grp, q.x, q.z, 3 + R() * 1.5, R);
else
e8Tree(grp, q.x, q.z, "jungle", R, 0.6);
}
var pg = e8Grp(grp, P, 10, -62, "out");
var stn = vrnSurf("stone", 0xB8A888, 2);
vrnBoxM(16, 8, 12, stn, 0, 4, 0, pg);
for (var k = 0; k < 6; k++)
vrnBoxM(14 - k * 2.2, 2, 10 - k * 1.6, stn, 0, 9 + k * 2, 0, pg);
wCone(1, 3, e8M(0xC8A040, { m: 0.5 }), 0, 22, 0, pg, 8);
vrnBoxM(3, 4.4, 0.4, e8M(0x2A1A10), 0, 2.2, 6.1, pg);
[-1, 1].forEach(function (s2) { wCyl(0.45, 0.5, 7, stn, s2 * 3, 3.5, 6.6, pg, 10); });
for (var w = -1; w <= 1; w += 2) {
var wn = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.6), e8M(0xE8A040, { e: 0xC86A20, ei: 0.8 }));
wn.position.set(w * 5, 4.6, 6.02);
pg.add(wn);
}
var q0 = e8XZ(P, 10, -62);
vrnSolid({ x: q0.x, z: q0.z, r: 8.5 });
e8Spot(P, 10, -54, 3, "The pagoda of Pillaji", "go in (by night, quietly)", function () { vrnEnter("e8_temple"); });
for (var tc = 0; tc < 8; tc++) {
var a = tc / 8 * Math.PI * 2, tq = e8XZ(P, 10 + Math.cos(a) * 16, -36 + Math.sin(a) * 12);
var tg = new THREE.Group();
tg.position.set(tq.x, 3, tq.z);
grp.add(tg);
wCyl(0.06, 0.08, 2.4, vrnSurf("wood", 0x5A4030, 1), 0, 1.2, 0, tg, 5);
var fl = wGlow(0xFFA040, 2.6, 0.6);
fl.position.y = 2.6;
tg.add(fl);
}
var pyre = e8Grp(grp, P, 10, -36, "e");
for (var l = 0; l < 6; l++) {
var lg = wCyl(0.2, 0.2, 4, vrnSurf("wood", 0x9A7A54, 1), 0, 0.3 + l * 0.35, (l % 2 ? 0.3 : -0.3), pyre, 6);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = l % 2 ? 0 : Math.PI / 2;
}
E8.pyre = pyre;
e8Spot(P, 10, -36, 3, "The pyre in the glade", "look", function () { setStatus(e8A("🔥 A pile of sandal-wood, already soaked with perfumed oil. At dawn the priests will light it.", "🪵 A great pile of sandal-wood in the glade. At dawn the priests mean to finish their dreadful rite here; you mean to stop them.")()); });
e8Spot(P, -14, -20, 3, "The thicket at the edge of the glade", "hide here", function () { setStatus("🌿 Under the trees, in the dark, five hundred paces from the pagoda. Nobody sees you."); });
},
function (grp, R) {
var P = "allahabad";
e8Quay(grp, P, 0xC8B898);
[[-50, -70, 14, 12], [-28, -74, 12, 14], [24, -70, 14, 12], [46, -72, 12, 16], [-40, -106, 16, 14], [30, -104, 14, 16]].forEach(function (b, i) { e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: "stone", col: [0xE8D8B8, 0xD8C098, 0xE0CCA8][i % 3], floors: 1 + (i % 2), roof: false }); });
e8Bld(grp, P, 0, -66, 20, 12, { style: "club", col: 0xD8C8A8, floors: 2, sign: ["ALLAHABAD · E. I. RAILWAY"] });
e8Spot(P, 0, -58, 3, "Allahabad station", "look in", function () { setStatus("🚂 Allahabad: the line begins again here, east to Benares and Calcutta. Where the Ganges and the Jumna meet, the most sacred meeting of rivers in India."); });
for (var p = 0; p < 8; p++) {
var q = e8XZ(P, -62 + p * 17, -56);
e8Palm(grp, q.x, q.z, 3, R);
}
e8Folk(grp, P, 3101, 8, [{ _vb: "hindoo", sex: "m" }, { _vb: "hindoow", sex: "f" }, { _vb: "clerk", sex: "m" }]);
},
function (grp, R) {
var P = "calcutta";
e8Quay(grp, P, 0xB8B0A0);
[[-58, -72, 16, 14], [-38, -76, 14, 16], [30, -72, 16, 14], [52, -74, 12, 12], [-50, -108, 14, 16], [-26, -110, 16, 14], [24, -108, 14, 14], [46, -110, 16, 16]].forEach(function (b, i) {
var g = e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: "stone", col: [0xF0E8D8, 0xE8DCC4, 0xEEE4D0][i % 3], floors: 2 + (i % 2), roof: false });
for (var c = 0; c < 5; c++)
wCyl(0.35, 0.4, 5, e8M(0xF4EEE2), -b[2] / 2 + 1.2 + c * (b[2] - 2.4) / 4, 2.5, b[3] / 2 + 0.8, g, 10);
});
e8Bld(grp, P, 0, -72, 22, 16, { style: "club", col: 0xF2EADA, floors: 2, roof: false, sign: ["THE COURT-HOUSE"] });
e8Spot(P, 0, -63, 3, "The court-house", "go in", function () { vrnEnter("e8_court"); });
for (var gh = 0; gh < 6; gh++) {
var gg = e8Grp(grp, P, -60 + gh * 2, -20 + gh * 1.6, "out", 3 - gh * 0.5);
vrnBoxM(10, 0.5, 1.6, vrnSurf("stone", 0xC8BCA4, 2), 0, 0, 0, gg);
}
e8Spot(P, -56, -18, 3, "The ghats", "look at the river", function () { setStatus("🌊 Steps down to the Hooghly: bathers, washermen, boats with high prows, and the steamers for Hong Kong lying in the stream."); });
E8.rangoon = e8Steamer(grp, P, 16, 22, { name: "RANGOON" });
for (var p = 0; p < 8; p++) {
var q = e8XZ(P, -60 + p * 17, -56);
e8Palm(grp, q.x, q.z, 3, R);
}
e8Folk(grp, P, 3501, 11, [{ _vb: "hindoo", sex: "m" }, { _vb: "hindoow", sex: "f" }, { _vb: "gent", sex: "m" }, { _vb: "clerk", sex: "m" }, { _vb: "lady", sex: "f" }], { say: [["A boatman of the Hooghly", "You are a boatman on the Hooghly at Calcutta in 1872, rowing passengers out to the steamers in the stream. You know the tides and every captain.", "The Rangoon sails at noon, sahib. Noon exactly."]] });
},
function (grp, R) {
var P = "hongkong";
e8Quay(grp, P, 0xA8A098);
[[-58, -74, 14, 12, "stone"], [-40, -72, 12, 14, "stone"], [24, -74, 14, 12, "brick"], [44, -70, 12, 12, "stone"], [-50, -106, 16, 14, "stone"], [-28, -108, 14, 14, "brick"], [20, -106, 16, 14, "stone"], [44, -108, 12, 16, "stone"]].forEach(function (b, i) {
e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: b[4], col: [0xE8E0D0, 0xD8D0C4, 0xE8DCC8][i % 3], floors: 2 + (i % 3), pitch: i % 2 ? 3 : 0 });
});
e8Bld(grp, P, 0, -72, 20, 14, { style: "club", col: 0xEEE6D8, floors: 3, sign: ["CLUB HOTEL"] });
e8Spot(P, 0, -64, 3, "The Club Hotel", "look in", function () { setStatus("🏨 The Club Hotel: verandas, punkahs, an English dinner, and a list of the steamers on the wall."); });
for (var sh = 0; sh < 6; sh++) {
var sg = e8Grp(grp, P, -58 + sh * 8, -46, "out");
vrnBoxM(6, 4, 5, vrnSurf("wood", 0x5A3A2A, 1), 0, 2, 0, sg);
var rf = new THREE.Mesh(vrnPitchGeo(7, 6, 1.6, 0.6), e8M(0x2A3A3A));
rf.position.y = 4;
sg.add(rf);
vrnSign([["茶", "酒", "藥", "米", "布", "當"][sh]], 0.8, 1.6, 2.4, 2.6, 2.6, 0, sg);
var ln = wGlow(0xFF6A3A, 1.6, 0.6);
ln.position.set(-1.6, 3, 2.8);
sg.add(ln);
}
e8Spot(P, -34, -41, 2.8, "A tavern on the quay", "go in", function () { vrnEnter("e8_tavern"); });
for (var j = 0; j < 5; j++) {
var jg = e8Grp(grp, P, -60 + j * 28, 30 + (j % 2) * 18, "e", 3.4);
var hl = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), vrnSurf("wood", 0x5A3A22, 1));
hl.scale.set(2.6, 1.6, 8);
jg.add(hl);
wCyl(0.12, 0.14, 9, vrnSurf("wood", 0x5A3A22, 1), 0, 4.5, 0, jg, 6);
var sl = wBox(0.06, 6, 4, e8M(0xA8582A, { ds: true }), 0, 5.6, 0.6, jg);
for (var r = 0; r < 6; r++)
wBox(0.1, 0.06, 4.2, e8M(0x3A2A1A), 0.04, 3 + r * 1.1, 0.6, jg);
}
var tk = e8Grp(grp, P, 40, 24, "e", 2.9);
E8.tankaHome = tk;
e8TankaModel(tk);
e8Spot(P, 40, -14, 3, "The wharf of the pilot-boats", "look at No. 43", function () { setStatus("⛵ The Tankadere, pilot-boat No. 43, twenty tons, a pretty schooner with all her sails furled: \"the best in the harbour\"."); });
E8.carnatic = e8Steamer(grp, P, -24, 30, { name: "CARNATIC" });
e8Folk(grp, P, 4701, 13, [{ _vb: "chinese", sex: "m" }, { _vb: "chinese", sex: "m" }, { _vb: "sailor", sex: "m" }, { _vb: "gent", sex: "m" }, { _vb: "lady", sex: "f" }, { _vb: "chinese", sex: "m" }], { say: [["A Chinese shopkeeper of Victoria", "You are a tea merchant with a shop on the waterfront at Victoria, Hong Kong, in 1872. You sell fine teas and silks to the English and the ships' officers.", "Good tea, good silk, good price. Come in, come in."], null, ["A sailor of the harbour", "You are an English sailor on shore leave at Hong Kong in 1872. The harbour is crowded with junks, tankas and steamers.", "The Carnatic? Repairing her boiler. Off tomorrow morning, they say."]] });
},
function (grp, R) {
var P = "yokohama", wood = vrnSurf("wood", 0x6A5038, 1), dark = e8M(0x2A2A2E);
e8Quay(grp, P, 0xA8A8A0);
[[-56, -50, 12, 10], [-40, -52, 14, 12], [40, -52, 12, 10], [56, -50, 10, 12]].forEach(function (b) { e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: "stone", col: 0xE8E0D0, floors: 2, pitch: 3 }); });
for (var h = 0; h < 14; h++) {
var s = -62 + (h % 7) * 20, off = h < 7 ? -80 : -112, g = e8Grp(grp, P, s, off, "out");
vrnBoxM(10, 3.2, 8, wood, 0, 1.6, 0, g);
var sc = new THREE.Mesh(new THREE.PlaneGeometry(8, 2.2), e8M(0xF4EEDC, { e: 0x6A5A3A, ei: 0.15 }));
sc.position.set(0, 1.6, 4.02);
g.add(sc);
for (var b2 = -3; b2 <= 3; b2++)
wBox(0.08, 2.2, 0.06, wood, b2 * 1.2, 1.6, 4.06, g);
var rf = new THREE.Mesh(vrnPitchGeo(12, 10, 2.6, 0.4), dark);
rf.position.y = 3.2;
g.add(rf);
var ln = wGlow(0xFF7A3A, 1.2, 0.5);
ln.position.set(3.6, 2.8, 4.6);
g.add(ln);
wSph(0.3, e8M(0xE84A2A, { e: 0xC83A1A, ei: 0.6 }), 3.6, 2.8, 4.6, g, 8).scale.y = 1.3;
var q = e8XZ(P, s, off);
vrnSolid({ x: q.x, z: q.z, r: 5.5 });
}
var tg = e8Grp(grp, P, 0, -96, "out");
[-2.6, 2.6].forEach(function (k) { wCyl(0.35, 0.4, 7, e8M(0xC8301E), k, 3.5, 0, tg, 10); });
wBox(8, 0.6, 0.8, e8M(0xC8301E), 0, 7, 0, tg);
wBox(9.4, 0.4, 1, dark, 0, 7.6, 0, tg);
wBox(6.4, 0.4, 0.6, e8M(0xC8301E), 0, 6, 0, tg);
e8Spot(P, 0, -92, 3, "The temple gate", "look", function () { setStatus("⛩️ A great red gate; beyond it, cedars, stone lanterns, a temple of dark wood. The city is quiet here."); });
e8Spot(P, -22, -72, 3, "A tea-house", "look in", function () { setStatus("🍵 A tea-house of modest appearance: rice, a little fish, tea in small cups, and girls in bright robes who bow as they pour."); });
var bt = e8Grp(grp, P, 30, -64, "out");
vrnBoxM(16, 7, 12, vrnSurf("wood", 0x8A3A2A, 1), 0, 3.5, 0, bt);
var br = new THREE.Mesh(vrnPitchGeo(18, 14, 3.4, 0.6), dark);
br.position.y = 7;
bt.add(br);
vrnSign(["THE LONG NOSES! · BATULCAR'S JAPANESE TROUPE"], 13, 1.4, 0, 8.6, 6.2, 0, bt);
for (var f = 0; f < 7; f++) {
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.6), e8M([0xE83A2A, 0xF0E040, 0x2A6AE8][f % 3], { ds: true }));
fl.position.set(-6 + f * 2, 10.6, 6);
bt.add(fl);
}
var q2 = e8XZ(P, 30, -64);
vrnSolid({ x: q2.x, z: q2.z, r: 8 });
e8Spot(P, 30, -56, 3, "Batulcar's circus", "go in", function () { vrnEnter("e8_circus"); });
for (var c = 0; c < 10; c++) {
var q3 = e8XZ(P, -64 + c * 14, -128);
e8Tree(grp, q3.x, q3.z, "pine", R, 0.9);
}
E8.grant = e8Steamer(grp, P, 10, 26, { name: "GENERAL GRANT", len: 64, beam: 10 });
e8Folk(grp, P, 5601, 13, [{ _vb: "japan", sex: "m" }, { _vb: "japanw", sex: "f" }, { _vb: "japan", sex: "m" }, { _vb: "sailor", sex: "m" }, { _vb: "gent", sex: "m" }], { o0: -70, ow: 40, say: [["A shopkeeper of Yokohama", "You are a shopkeeper in the Japanese town of Yokohama in 1872, selling old clothes, fans, lacquer and porcelain. You will buy a European coat in exchange for a Japanese robe and a few coins.", "Welcome! An old robe for your fine coat? A good bargain, a good bargain."], null, ["A rickshaw man", "You are a man who pulls a rickshaw (jinrikisha) in Yokohama in 1872, a new and very popular way of getting about.", "Where to? The harbour, the temple, the circus?"]] });
},
function (grp, R) {
var P = "sanfran";
e8Quay(grp, P, 0x9A9A98);
[[-58, -72, 14, 12, "brick", 3, ["DRY GOODS"]], [-40, -74, 14, 14, "stone", 4, null], [-20, -72, 12, 12, "brick", 3, ["SALOON"]], [22, -72, 14, 12, "brick", 3, ["WELLS, FARGO & CO."]], [42, -74, 14, 14, "stone", 4, null], [58, -72, 10, 12, "brick", 3, ["GUNS"]],
[-50, -106, 14, 14, "timber", 2, null], [-28, -108, 12, 12, "timber", 2, null], [-6, -106, 14, 14, "timber", 2, null], [18, -108, 12, 12, "timber", 2, null], [40, -106, 14, 14, "timber", 2, null]].forEach(function (b) {
e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: b[4], col: b[4] === "brick" ? 0xA85A40 : b[4] === "timber" ? 0xD8CCB0 : 0xD8D0C0, floors: b[5], sign: b[6] });
});
e8Bld(grp, P, 0, -72, 20, 14, { style: "stone", col: 0xE0D8C8, floors: 5, sign: ["INTERNATIONAL HOTEL"] });
var mt = e8Grp(grp, P, -6, -44, "out");
vrnBoxM(10, 1.6, 5, vrnSurf("wood", 0x8A6A44, 1), 0, 0.8, 0, mt);
for (var st = 0; st < 4; st++)
vrnBoxM(4, 0.4, 0.6, vrnSurf("wood", 0x8A6A44, 1), 0, 0.2 + st * 0.4, 3 + st * 0.6, mt);
[-4, 4].forEach(function (k) { wCyl(0.06, 0.06, 5, vrnMetal(0x2A2A2A), k, 3.4, -2, mt, 5); var fl = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.1), typeof vlgFlagMat === "function" ? vlgFlagMat() : e8M(0x2A3A8A)); fl.position.set(k + 0.9, 5.4, -2); mt.add(fl); });
vrnSign(["HURRAH FOR CAMERFIELD!"], 5, 0.8, -3, 3, -2.4, 0, mt);
vrnSign(["MANDIBOY FOREVER!"], 5, 0.8, 3, 3, -2.4, 0, mt);
E8.meeting = mt;
e8Spot(P, -6, -38, 3.2, "The meeting in Montgomery Street", "look", function () { setStatus("📣 Placards, banners, a crowd: \"Hurrah for Camerfield!\" \"Mandiboy forever!\" Nobody can say for what office."); });
for (var c = 0; c < 3; c++) {
var cg = e8Grp(grp, P, 30 + c * 10, -34, "e");
vrnBoxM(2.2, 1.2, 4, vrnSurf("wood", 0x5A3A22, 1), 0, 1.4, 0, cg);
[-1, 1].forEach(function (k) { [-1.4, 1.4].forEach(function (j) { var w = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 5, 14), e8M(0x3A2A1A)); w.rotation.y = Math.PI / 2; w.position.set(k * 1.2, 0.6, j); cg.add(w); }); });
}
E8.grantSF = e8Steamer(grp, P, -14, 26, { name: "GENERAL GRANT", len: 64, beam: 10 });
e8Folk(grp, P, 7201, 14, [{ _vb: "yankee", sex: "m" }, { _vb: "lady", sex: "f" }, { _vb: "chinese", sex: "m" }, { _vb: "yankee", sex: "m" }, { _vb: "gent", sex: "m" }, { _vb: "woman", sex: "f" }], { say: [["A San Francisco newsboy", "You are a newsboy in San Francisco in 1872 selling the Alta California and the Bulletin. The city is booming; the railway to the East was finished three years ago.", "Paper! Paper! Election news! Camerfield or Mandiboy!"], null, null, ["A miner back from the diggings", "You are a gold miner come down to San Francisco in 1872 with a little dust to spend, in a red shirt and big boots, revolver at your belt.", "Struck it middlin' rich, mister. Middlin'."]] });
},
function (grp, R) {
var P = "bow", wood = vrnSurf("wood", 0x6A5038, 1), iron = vrnMetal(0x3A3A3E);
var gz = e8Grp(grp, P, 0, 0, "e", 3);
var river = new THREE.Mesh(new THREE.PlaneGeometry(300, 34), vrnWaterMat(0x4A7A8A));
river.rotation.x = -Math.PI / 2;
river.position.y = 0.12;
gz.add(river);
for (var fo = 0; fo < 24; fo++) {
var foam = wSph(0.8 + R() * 1.2, e8M(0xF0F4F4), -140 + fo * 12 + R() * 4, 0.15, (R() - 0.5) * 26, gz, 6);
foam.scale.y = 0.15;
}
[-1, 1].forEach(function (e) { vrnBoxM(300, 1.2, 4, vrnSurf("stone", 0x8A7A6A, 3), 0, 0.3, e * 18, gz); for (var rk = 0; rk < 14; rk++) {
var r0 = new THREE.Mesh(new THREE.DodecahedronGeometry(1 + R() * 2, 0), vrnSurf("stone", 0x7A6A5A, 2));
r0.position.set(-140 + rk * 20 + R() * 8, 1, e * (19 + R() * 4));
gz.add(r0);
} });
var br = e8Grp(grp, P, 0, 0, "e", 3.4);
for (var k = -30; k <= 30; k += 2)
vrnBoxM(3.4, 0.3, 0.4, wood, 0, -0.15, k, br);
[-1.7, 1.7].forEach(function (x) { var tr = wBox(0.25, 0.4, 62, iron, x, -0.3, 0, br); for (var r = -28; r <= 28; r += 4) {
var rod = wCyl(0.03, 0.03, 6, iron, x, 2.6, r, br, 4);
rod.rotation.x = 0.1 * (r % 8 ? 1 : -1);
} wBox(0.12, 0.12, 62, iron, x, 5.4, 0, br); });
[-1, 1].forEach(function (e) { [-1.9, 1.9].forEach(function (x) { wCyl(0.3, 0.4, 8, wood, x, 3, e * 31, br, 8); }); });
E8.bridge = br;
var hut = e8Grp(grp, P, -50, -20, "out");
vrnBoxM(4, 3, 4, wood, 0, 1.5, 0, hut);
var hr = new THREE.Mesh(vrnPitchGeo(5, 5, 1.4, 0.4), e8M(0x4A3A2A));
hr.position.y = 3;
hut.add(hr);
e8Spot(P, -50, -14, 3, "The signal-man's hut", "look", function () { setStatus("🚩 The signal-man of Medicine Bow, with his red flag: the bridge is shaky, he has telegraphed for a relief train."); });
for (var t = 0; t < 16; t++) {
var q = e8XZ(P, -70 + R() * 140, (R() < 0.5 ? -1 : 1) * (40 + R() * 90));
e8Tree(grp, q.x, q.z, "pine", R, 0.7);
}
},
function (grp, R) {
var P = "sioux";
for (var t = -60; t <= 60; t += 20) {
var pg = e8Grp(grp, P, t, -10, "e");
wCyl(0.12, 0.15, 7, vrnSurf("wood", 0x6A5A44, 1), 0, 3.5, 0, pg, 6);
wBox(1.4, 0.1, 0.1, vrnSurf("wood", 0x6A5A44, 1), 0, 6.6, 0, pg);
}
for (var d = 0; d < 12; d++) {
var q = e8XZ(P, -70 + R() * 140, (R() < 0.5 ? -1 : 1) * (30 + R() * 100));
var dr = wSph(3 + R() * 4, e8M(0xF2F4F6), q.x, 3, q.z, grp, 8);
dr.scale.y = 0.25;
}
},
function (grp, R) {
var P = "kearney", wood = vrnSurf("wood", 0x6A5038, 1), snow = e8M(0xF2F4F6);
var st = e8Grp(grp, P, 0, -26, "out");
vrnBoxM(16, 4, 8, wood, 0, 2, 0, st);
var rf = new THREE.Mesh(vrnPitchGeo(18, 10, 2, 0.6), snow);
rf.position.y = 4;
st.add(rf);
vrnSign(["FORT KEARNEY"], 6, 0.9, 0, 3.2, 4.1, 0, st);
var q0 = e8XZ(P, 0, -26);
vrnSolid({ x: q0.x, z: q0.z, r: 8 });
e8Spot(P, 0, -20, 3, "Fort Kearney station", "look", function () { setStatus("🚉 A wooden station on the open plain, its stove red-hot; the soldiers of the fort crowding the platform; the snow coming down."); });
var fort = e8Grp(grp, P, 0, -90, "out");
for (var a = 0; a < 40; a++) {
var ang = a / 40 * Math.PI * 2, px = Math.cos(ang) * 30, pz = Math.sin(ang) * 22;
if (Math.abs(ang - Math.PI / 2) < 0.12)
continue;
var lg = wCyl(0.35, 0.35, 5, wood, px, 2.5, pz, fort, 6);
}
[[-30, 0], [30, 0]].forEach(function (b) { vrnBoxM(6, 7, 6, wood, b[0], 3.5, b[1], fort); var r2 = new THREE.Mesh(vrnPitchGeo(7, 7, 2, 0.4), snow); r2.position.set(b[0], 7, b[1]); fort.add(r2); });
for (var bk = 0; bk < 3; bk++) {
vrnBoxM(14, 3, 6, wood, -14 + bk * 14, 1.5, -10, fort);
var r3 = new THREE.Mesh(vrnPitchGeo(15, 7, 1.4, 0.4), snow);
r3.position.set(-14 + bk * 14, 3, -10);
fort.add(r3);
}
wCyl(0.1, 0.12, 14, vrnMetal(0x3A3A3A), 0, 7, 4, fort, 6);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.8), typeof vlgFlagMat === "function" ? vlgFlagMat() : e8M(0x2A3A8A));
fl.position.set(1.6, 13, 4);
fort.add(fl);
var qf = e8XZ(P, 0, -90);
vrnSolid({ x: qf.x, z: qf.z, r: 20 });
e8Spot(P, 0, -66, 3.4, "The gate of Fort Kearney", "look in", function () { setStatus("🏰 A stockade of logs, blockhouses at the corners, barracks inside, the flag; a hundred soldiers of the United States Army, and a captain who must keep the fort."); });
for (var d = 0; d < 16; d++) {
var q = e8XZ(P, -70 + R() * 140, (R() < 0.5 ? -1 : 1) * (40 + R() * 95));
var dr = wSph(3 + R() * 4, snow, q.x, 3, q.z, grp, 8);
dr.scale.y = 0.25;
}
var sl = e8Grp(grp, P, 24, -12, "e");
e8SledgeModel(sl);
E8.sledgeHome = sl;
e8Spot(P, 24, -16, 3, "Mudge's sledge", "look", function () { setStatus("🛷 A sort of frame on two long beams, a little raised in front like a sledge's runners; room for five or six; a high mast, a great brigantine sail, a jib, and a rudder behind."); });
e8Folk(grp, P, 8201, 8, [{ _vb: "soldier", sex: "m" }, { _vb: "soldier", sex: "m" }, { _vb: "yankee", sex: "m" }, { _vb: "lady", sex: "f" }], { o0: -40, ow: 24, say: [["A soldier of Fort Kearney", "You are a private soldier of the United States Army at Fort Kearney, Nebraska, in December 1872: cold, tired, brave, ready to do your duty, and fond of your captain.", "Cold enough to freeze a whistle, sir."]] });
},
function (grp, R) {
var P = "omaha", snow = e8M(0xF2F4F6);
e8Quay(grp, P, 0xA8A8A8);
[[-50, -66, 14, 12], [-30, -70, 12, 12], [26, -66, 14, 12], [46, -70, 12, 14], [-40, -102, 14, 14], [10, -104, 14, 12], [36, -100, 12, 14]].forEach(function (b, i) { var g = e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: i % 2 ? "brick" : "timber", col: i % 2 ? 0xA85A40 : 0xD8CCB0, floors: 2, pitch: 3 }); });
e8Bld(grp, P, 0, -62, 22, 12, { style: "brick", col: 0x9A5040, floors: 2, pitch: 3, sign: ["OMAHA · UNION PACIFIC"] });
e8Spot(P, 0, -54, 3, "Omaha station", "look", function () { setStatus("🚉 Omaha: the Union Pacific begins here, and from here the Chicago and Rock Island runs east every day. A train is ready to start."); });
for (var d = 0; d < 14; d++) {
var q = e8XZ(P, -70 + R() * 140, (R() < 0.5 ? -1 : 1) * (80 + R() * 55));
var dr = wSph(3 + R() * 3, snow, q.x, 3, q.z, grp, 8);
dr.scale.y = 0.22;
}
e8Folk(grp, P, 8601, 9, [{ _vb: "yankee", sex: "m" }, { _vb: "lady", sex: "f" }, { _vb: "clerk", sex: "m" }, { _vb: "gent", sex: "m" }]);
},
function (grp, R) {
var P = "newyork";
e8Quay(grp, P, 0x989898);
[[-58, -74, 14, 12, "brick"], [-40, -72, 14, 14, "stone"], [-20, -76, 12, 16, "brick"], [22, -72, 14, 12, "stone"], [40, -74, 14, 14, "brick"], [58, -72, 10, 12, "stone"], [-46, -108, 16, 14, "brick"], [-20, -108, 14, 16, "stone"], [16, -108, 16, 14, "brick"], [44, -108, 14, 16, "stone"]].forEach(function (b, i) {
e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: b[4], col: b[4] === "brick" ? 0x8A4A3A : 0x6A5048, floors: 4 + (i % 3) });
});
var shed = e8Grp(grp, P, -30, -24, "out");
vrnBoxM(30, 7, 10, vrnSurf("wood", 0x5A5A5A, 2), 0, 3.5, 0, shed);
vrnSign(["CUNARD LINE · PIER No. 50"], 12, 1.2, 0, 8, 5.2, 0, shed);
e8Spot(P, -30, -16, 3, "The Cunard pier", "look", function () { setStatus("⚓ Pier 50, the Cunard line. The China, for Liverpool, left at a quarter before nine. Her smoke is still on the river."); });
e8Crates(grp, P, 14, -4, 7, R);
e8Crates(grp, P, 52, -3, 6, R);
e8Crates(grp, P, -52, -6, 5, R);
E8.henriHome = e8Grp(grp, P, 36, 26, "e", 2.6);
e8HenriModel(E8.henriHome);
e8Spot(P, 36, -12, 3, "The Henrietta, at her moorings", "look", function () { setStatus("⚓ The Henrietta: a trading steamer with a screw, iron hull, wooden upper works, her funnel puffing smoke. Bound for Bordeaux."); });
e8Folk(grp, P, 8901, 13, [{ _vb: "gent", sex: "m" }, { _vb: "lady", sex: "f" }, { _vb: "sailor", sex: "m" }, { _vb: "clerk", sex: "m" }, { _vb: "yankee", sex: "m" }], { say: [["A New York cabman", "You are a hack driver on the West Street piers of New York in December 1872, cold and cheerful, who knows every ship.", "The China? Gone, sir. Three-quarters of an hour ago."]] });
},
function (grp, R) {
var P = "liverpool";
e8Quay(grp, P, 0x8A8A88);
[[-58, -74, 14, 12], [-40, -72, 14, 14], [-20, -76, 12, 16], [22, -72, 14, 12], [40, -74, 14, 14], [58, -72, 10, 12], [-46, -108, 16, 14], [-20, -108, 14, 16], [16, -108, 16, 14], [44, -108, 14, 16]].forEach(function (b, i) {
e8Bld(grp, P, b[0], b[1], b[2], b[3], { style: i % 2 ? "stone" : "brick", col: i % 2 ? 0xA89A88 : 0x7A4A3A, floors: 3 + (i % 2), pitch: i % 3 ? 3 : 0 });
});
var ch = e8Bld(grp, P, 0, -76, 26, 18, { style: "club", col: 0xC8C0B0, floors: 3, roof: false, sign: ["H.M. CUSTOM HOUSE"] });
var dm = wSph(6, e8M(0x6A7A7A, { m: 0.4 }), 0, 22, 0, ch, 16);
dm.scale.y = 0.8;
for (var c = 0; c < 6; c++)
wCyl(0.6, 0.7, 10, e8M(0xD8D0C0), -10 + c * 4, 5, 10.5, ch, 12);
e8Spot(P, 0, -64, 3.2, "The Custom House", "go in", function () { vrnEnter("e8_custom"); });
var ck = e8Grp(grp, P, -20, -36, "out");
wCyl(0.15, 0.2, 5, vrnMetal(0x2A2A2E), 0, 2.5, 0, ck, 8);
var face = wCyl(0.6, 0.6, 0.15, e8M(0xF4F0E4), 0, 5.4, 0, ck, 20);
face.rotation.x = Math.PI / 2;
e8Spot(P, -20, -36, 2.4, "The quay clock", "look at the time", function () { setStatus("🕰️ Twenty minutes before noon, the 21st of December. London is six hours away by the express."); });
e8Crates(grp, P, -50, -26, 7, R);
e8Crates(grp, P, 44, -24, 6, R);
e8Folk(grp, P, 9801, 12, [{ _vb: "sailor", sex: "m" }, { _vb: "clerk", sex: "m" }, { _vb: "gent", sex: "m" }, { _vb: "woman", sex: "f" }], { say: [["A Liverpool docker", "You are a docker of Liverpool in 1872, unloading cotton bales from America in the rain. Sharp, funny, strong.", "Mind your back, sir! Cotton from New Orleans, coming through."]] });
},
function (g) {
var hl = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), vrnSurf("wood", 0xE8E0D0, 1));
hl.scale.set(2.6, 1.8, 9);
g.add(hl);
wBox(4.6, 0.1, 15, vrnSurf("wood", 0xB89A6A, 2), 0, 0.05, 0, g);
[-2.6, 3.4].forEach(function (z, k) { wCyl(0.12, 0.16, k ? 11 : 13, vrnSurf("wood", 0x6A4A2A, 1), 0, (k ? 11 : 13) / 2, z, g, 6); var sl = wBox(0.05, k ? 8 : 10, 4.6, e8M(0xF0E8D8, { ds: true }), 0, (k ? 6 : 7), z - 2.5, g); });
var jb = wBox(0.05, 6, 3, e8M(0xF0E8D8, { ds: true }), 0, 5, 7.5, g);
jb.rotation.x = -0.4;
var bs = wCyl(0.08, 0.08, 4, vrnSurf("wood", 0x6A4A2A, 1), 0, 1, 9, g, 5);
bs.rotation.x = Math.PI / 2 - 0.2;
return g;
},
function (g) {
var wood = vrnSurf("wood", 0x7A5A3A, 2);
[-1.2, 1.2].forEach(function (x) { var b = wBox(0.3, 0.25, 7, wood, x, 0.2, 0, g); var tip = wBox(0.3, 0.25, 1, wood, x, 0.45, 3.7, g); tip.rotation.x = -0.5; });
vrnBoxM(2.8, 0.3, 4.6, wood, 0, 0.6, -0.4, g);
wCyl(0.1, 0.12, 7, wood, 0, 4, 0.6, g, 6);
wBox(0.04, 5, 3.4, e8M(0xE8DCC0, { ds: true }), 0, 4.2, -1.2, g);
var jb = wBox(0.04, 3.4, 1.6, e8M(0xE8DCC0, { ds: true }), 0, 3, 2.2, g);
jb.rotation.x = -0.35;
var rd = wBox(0.08, 0.8, 0.6, wood, 0, 0.6, -3.2, g);
return g;
},
function (g) {
var hl = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), e8M(0x1E1E22, { m: 0.4 }));
hl.scale.set(4.4, 3, 24);
g.add(hl);
wBox(8, 0.2, 40, vrnSurf("wood", 0xB89A6A, 3), 0, 0.1, 0, g);
vrnBoxM(5, 2.4, 8, vrnSurf("wood", 0x8A6A44, 2), 0, 1.3, -6, g);
wCyl(0.8, 0.8, 8, e8M(0x1A1A1A), 0, 5, 2, g, 12);
wCyl(0.82, 0.82, 1, e8M(0xB8302A), 0, 8.6, 2, g, 12);
[-12, 12].forEach(function (z) { wCyl(0.18, 0.24, 16, vrnSurf("wood", 0x6A4A2A, 1), 0, 8, z, g, 6); for (var y = 6; y < 14; y += 3.4) {
var yd = wCyl(0.08, 0.08, 7, vrnSurf("wood", 0x6A4A2A, 1), 0, y, z, g, 5);
yd.rotation.z = Math.PI / 2;
} });
return g;
},
function (k) {
var T = E8_TOWNS[k], u = E8_PORT[k];
if (!T || !VRN.rwGroup)
return;
var D = E8.ports[k];
if (D && D.grp)
return;
var n0 = { sol: VRN.solids.length, sp: VRN.spots.length, pe: VRN.people.length, ta: VRN.talk.length, fl: VRN.floors.length };
var grp = new THREE.Group();
grp.name = "e8-port-" + k;
VRN.rwGroup.add(grp);
try {
T.build(grp, wRand(Math.round(u * 10000)));
}
catch (e) {
if (window.console)
console.warn("[e8] port " + k, e);
}
try {
e8Dress(grp, k, wRand(Math.round(u * 10000) + 7));
}
catch (e) {
if (window.console)
console.warn("[e8] dress " + k, e);
}
var D2 = { grp: grp, sol: VRN.solids.slice(n0.sol), sp: VRN.spots.slice(n0.sp), pe: VRN.people.slice(n0.pe), ta: VRN.talk.slice(n0.ta), fl: VRN.floors.slice(n0.fl) };
try {
if (typeof gwBake === "function")
gwBake(grp);
}
catch (e) { }
E8.ports[k] = D2;
},
function (k) {
var D = E8.ports[k];
if (!D || !D.grp)
return;
if (D.grp.parent)
D.grp.parent.remove(D.grp);
D.grp.traverse(function (m) { if (m.geometry && !m.geometry.userData.shared)
try {
m.geometry.dispose();
}
catch (e) { } });
var drop = function (arr, list) { return arr.filter(function (x) { return list.indexOf(x) < 0; }); };
VRN.solids = drop(VRN.solids, D.sol);
VRN.spots = drop(VRN.spots, D.sp);
VRN.people = drop(VRN.people, D.pe);
VRN.talk = drop(VRN.talk, D.ta);
VRN.floors = drop(VRN.floors, D.fl);
var g = VRN.sgrid;
if (g)
for (var key in g) {
var L = g[key], hit = false;
for (var i = 0; i < L.length; i++)
if (D.sol.indexOf(L[i]) >= 0) {
hit = true;
break;
}
if (hit)
g[key] = drop(L, D.sol);
}
delete E8.ports[k];
},
function (L) {
if (!VRN.rwGroup)
return;
if (Math.hypot(L.x - VRN_RW.x, L.z - VRN_RW.z) > VRN_RW.r + 1400 && !Object.keys(E8.ports).length)
return;
var lite = VRN.lite || (typeof wlgHeavy === "function" && wlgHeavy());
Object.keys(E8_TOWNS).forEach(function (k) {
var p = vrnRwPt(E8_PORT[k], -40), d = Math.hypot(L.x - p.x, L.z - p.z);
if (d < 700 && !E8.ports[k])
e8PortBuild(k);
else if (E8.ports[k] && d > (lite ? 1300 : 4200))
e8PortDrop(k);
});
},
function (grp, k, R) {
var Lk = E8_LOOK[k];
if (!Lk)
return;
var lite = VRN.lite || (typeof wlgHeavy === "function" && wlgHeavy());
var gr = e8Grp(grp, k, 0, 0, "e", 3.012), gw = Lk.sea ? 148 : 278;
var gm = new THREE.Mesh(vrnUVm(new THREE.BoxGeometry(gw, 0.02, 150)), vrnSurf(Lk.g, Lk.t, Lk.g === "snow" ? 6 : 4));
gm.position.x = Lk.sea ? -(278 - gw) / 2 - 1 : 0;
gr.add(gm);
if (Lk.sea) {
var hb = e8Grp(grp, k, 0, 0, "e", 0), C = vrnSurf("stone", 0x9A9284, 3);
var w = new THREE.Mesh(new THREE.PlaneGeometry(132, 150), vrnWaterMat(Lk.river ? 0x5A6A4A : 0x2A5468, 0.94));
w.rotation.x = -Math.PI / 2;
w.position.set(74, 3.06, 0);
w.userData.realWater = 1;
hb.add(w);
vrnBoxM(132, 0.02, 150, vrnC(Lk.river ? 0x2A3020 : 0x0E2430), 74, 3.025, 0, hb);
vrnBoxM(1.2, 3.4, 150, C, 8.4, 1.6, 0, hb);
vrnBoxM(2, 0.35, 150, vrnSurf("stone", 0xB0A898, 3), 8.2, 3.2, 0, hb);
for (var st = -60; st <= 60; st += 40) {
for (var q = 0; q < 5; q++)
vrnBoxM(1 + q * 0.5, 0.3, 3, C, 9.4 + q * 0.25, 2.9 - q * 0.6, st, hb);
}
for (var r = -70; r <= 70; r += 3.2) {
var e = e8XZ(k, r, 9);
vrnSolid({ x: e.x, z: e.z, r: 1.7 });
}
for (var bl = -66; bl <= 66; bl += 11)
wCyl(0.22, 0.28, 0.7, vrnMetal(0x1E2226), 7.4, 3.6, bl, hb, 8);
for (var b = 0; b < (lite ? 2 : 5); b++) {
var bt = new THREE.Group();
bt.position.set(16 + R() * 10, 3.1, -50 + b * 24 + R() * 6);
bt.rotation.y = Math.PI / 2 + (R() - 0.5) * 0.4;
hb.add(bt);
var hull = new THREE.Mesh(new THREE.CylinderGeometry(1, 0.9, 5.5, 10, 1, true, 0, Math.PI), vrnSurf("wood", [0x6A4A2A, 0x3A4A5A, 0x8A3A2A][b % 3], 1, { ds: 1 }));
hull.rotation.set(0, 0, Math.PI);
hull.rotation.x = Math.PI / 2;
bt.add(hull);
vrnBoxM(1.6, 0.08, 0.4, vrnSurf("wood", 0x8A6A44, 1), 0, -0.1, 0.6, bt);
}
}
if (Lk.tree && Lk.n) {
var K = vrnTreeKinds()[Lk.tree], n = lite ? Math.round(Lk.n * 0.4) : Lk.n, placed = 0;
for (var t = 0; t < n * 4 && placed < n; t++) {
var s = -68 + R() * 136, off = Lk.wild ? (R() < 0.5 ? -1 : 1) * (18 + R() * 118) : (Lk.sea ? -(118 + R() * 20) : (R() < 0.5 ? -1 : 1) * (116 + R() * 22));
if (Lk.wild && Math.abs(off) < 26)
continue;
var p = e8XZ(k, s, off);
if (vrnSolidAt(p.x, p.z, 3.5))
continue;
var tg = new THREE.Group();
tg.position.set(p.x, e8Y(p), p.z);
tg.rotation.y = R() * 6.28;
var sc = 0.7 + R() * 0.6;
tg.scale.setScalar(sc);
grp.add(tg);
K.forEach(function (part) { tg.add(new THREE.Mesh(part.g, part.m)); });
vrnSolid({ x: p.x, z: p.z, r: 0.6 * sc });
placed++;
}
}
if (!Lk.wild) {
var wood = vrnSurf("wood", 0x7A5A3A, 1), cloth = [0xC8B48A, 0xA84A3A, 0x3A6A8A, 0xE8E0D0];
for (var lm = -60; lm <= 60; lm += 20) {
var lp = e8XZ(k, lm, -88);
vrnLamp(grp, lp.x, e8Y(lp), lp.z);
vrnSolid({ x: lp.x, z: lp.z, r: 0.3 });
}
for (var c = 0; c < (lite ? 2 : 5); c++) {
var cs = -56 + R() * 112, cg = e8Grp(grp, k, cs, -86 - R() * 4, "e");
vrnBoxM(1.6, 0.6, 3, wood, 0, 1, 0, cg);
[-1, 1].forEach(function (sd) { var wh = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 5, 14), vrnC(0x3A2A1A)); wh.rotation.y = Math.PI / 2; wh.position.set(sd * 0.85, 0.55, 0.4); cg.add(wh); });
vrnBoxM(0.08, 0.08, 2.4, wood, 0.4, 0.7, -2.4, cg);
vrnBoxM(0.08, 0.08, 2.4, wood, -0.4, 0.7, -2.4, cg);
for (var sk = 0; sk < 3; sk++)
wSph(0.3, vrnSurf("wood", 0xC8B48A, 1), (R() - 0.5) * 1, 1.5, (R() - 0.5) * 2, cg, 6).scale.y = 0.7;
var cp = e8XZ(k, cs, -87);
vrnSolid({ x: cp.x, z: cp.z, r: 1.6 });
}
for (var bb = 0; bb < (lite ? 3 : 8); bb++) {
var bs = -62 + R() * 124, bo = -60 + R() * 4, bp = e8XZ(k, bs, bo);
wCyl(0.38, 0.42, 0.9, wood, bp.x, e8Y(bp) + 0.45, bp.z, grp, 10);
}
for (var aw = 0; aw < (lite ? 2 : 4); aw++) {
var as = -50 + aw * 32 + R() * 6, ag = e8Grp(grp, k, as, -63, "in");
var a = vrnBoxM(5, 0.06, 2.4, vrnSurf("plaster", cloth[aw % 4], 2), 0, 3, 1.2, ag);
a.rotation.x = 0.25;
[-2.3, 2.3].forEach(function (px) { wCyl(0.05, 0.05, 3, vrnMetal(0x2A2A2E), px, 1.5, 2.3, ag, 5); });
}
}
},
function () {
if (E8.ukM)
return E8.ukM;
var c = document.createElement("canvas");
c.width = 200;
c.height = 100;
var x = c.getContext("2d");
x.fillStyle = "#1E2A6A";
x.fillRect(0, 0, 200, 100);
x.strokeStyle = "#F4F0E6";
x.lineWidth = 20;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(200, 100);
x.moveTo(200, 0);
x.lineTo(0, 100);
x.stroke();
x.strokeStyle = "#C8202A";
x.lineWidth = 7;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(200, 100);
x.moveTo(200, 0);
x.lineTo(0, 100);
x.stroke();
x.fillStyle = "#F4F0E6";
x.fillRect(84, 0, 32, 100);
x.fillRect(0, 34, 200, 32);
x.fillStyle = "#C8202A";
x.fillRect(90, 0, 20, 100);
x.fillRect(0, 40, 200, 20);
var t = new THREE.CanvasTexture(c);
return (E8.ukM = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
},
function (grp, I, o) {
var X = I.x, Z = I.z, deck = vrnSurf("wood", 0xC8A878, 4), wood = vrnSurf("wood", 0x6A4A2A, 2), white = e8M(0xEDE8DC), brass = vrnBrass(), black = e8M(0x1A1A1E);
vlgSea(grp, X, Z, -3, 1100, o.sea);
I.night = vlgDome(grp, X, Z, 360, 0x050A18, 0.86);
I.night.visible = false;
if (I.night.userData.stars)
I.night.userData.stars.visible = false;
var hl = vlgHullMesh(o.len, o.beam + 1.6, 8, { sheer: 0.8 });
hl.position.set(X, -0.2, Z);
grp.add(hl);
var L2 = o.len / 2 - 4, B2 = o.beam / 2;
vrnInFloor(grp, X, Z, o.len - 8, o.beam, 0, deck);
vlgRail(grp, X - L2, Z - B2, X + L2, Z - B2, 0, 1.1, wood);
vlgRail(grp, X - L2, Z + B2, X + L2, Z + B2, 0, 1.1, wood);
vlgRail(grp, X - L2, Z - B2, X - L2, Z + B2, 0, 1.1, wood);
vlgRail(grp, X + L2, Z - B2, X + L2 + 6, Z, 0, 1.1, wood);
vlgRail(grp, X + L2, Z + B2, X + L2 + 6, Z, 0, 1.1, wood);
vrnFloor(X + L2 + 3, Z, 3, B2 * 0.6, 0, { inside: 1 });
vrnBoxM(6, 0.2, o.beam * 0.6, deck, X + L2 + 3, -0.1, Z, grp);
(o.funnels || [0]).forEach(function (fx) { wCyl(1.6, 1.7, 10, black, X + fx, 5, Z, grp, 16); wCyl(1.7, 1.7, 1.6, e8M(o.band || 0x1A1A1A), X + fx, 9.4, Z, grp, 16); vrnSolid({ x: X + fx, z: Z, r: 1.9 }); var sm = wGlow(0x8A8A90, 6, 0.18); sm.position.set(X + fx - 2, 13, Z); grp.add(sm); });
[-L2 + 10, L2 - 10].forEach(function (mx) { wCyl(0.3, 0.4, 22, vrnSurf("wood", 0x6A5A44, 1), X + mx, 11, Z, grp, 8); vrnSolid({ x: X + mx, z: Z, r: 0.5 }); var yd = wCyl(0.12, 0.12, 11, vrnSurf("wood", 0x6A5A44, 1), X + mx, 14, Z, grp, 5); yd.rotation.x = Math.PI / 2; wCyl(0.28, 0.28, 10, white, X + mx, 14.3, Z, grp, 6).rotation.x = Math.PI / 2; });
for (var b = 0; b < 4; b++) {
var bx = X - L2 + 16 + b * ((o.len - 40) / 3);
[-1, 1].forEach(function (s) { var bt = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), white); bt.scale.set(3, 0.8, 0.9); bt.position.set(bx, 2.4, Z + s * (B2 - 0.6)); grp.add(bt); wBox(0.1, 2.2, 0.1, black, bx - 2, 1.2, Z + s * (B2 - 0.4), grp); wBox(0.1, 2.2, 0.1, black, bx + 2, 1.2, Z + s * (B2 - 0.4), grp); });
}
var aw = new THREE.Mesh(new THREE.PlaneGeometry(o.len * 0.36, o.beam - 1), e8M(0xF0EADA, { ds: true }));
aw.rotation.x = -Math.PI / 2;
aw.position.set(X - L2 * 0.55, 3.4, Z);
grp.add(aw);
for (var p = 0; p < 6; p++)
[-1, 1].forEach(function (s) { wCyl(0.05, 0.05, 3.4, brass, X - L2 * 0.55 - o.len * 0.16 + p * o.len * 0.064, 1.7, Z + s * (B2 - 1.2), grp, 5); });
var dh = e8Grain(0x8A6A44), sx = X - L2 + 8;
vrnIWall(grp, sx - 6, Z - 4.5, sx + 8, Z - 4.5, 2.8, dh);
vrnIWall(grp, sx - 6, Z + 4.5, sx + 8, Z + 4.5, 2.8, dh);
vrnIWall(grp, sx - 6, Z - 4.5, sx - 6, Z + 4.5, 2.8, dh);
vrnIWall(grp, sx + 8, Z - 4.5, sx + 8, Z + 4.5, 2.8, dh, [[4.5, 1.6, 2.2]]);
vrnBoxM(14.4, 0.2, 9.4, dh, sx + 1, 2.9, Z, grp);
vrnRug(grp, sx + 1, Z, 10, 6, 0x5A1E1E);
var tb = new THREE.Group();
tb.position.set(sx + 1, 0, Z);
grp.add(tb);
wCyl(1.1, 1.1, 0.08, e8M(0x2A5A3A), 0, 0.82, 0, tb, 16);
wCyl(0.14, 0.28, 0.8, e8M(0x4A2A1A), 0, 0.4, 0, tb, 8);
for (var q = 0; q < 4; q++) {
var a = q / 4 * Math.PI * 2 + Math.PI / 4;
vrnChair(grp, sx + 1 + Math.cos(a) * 1.7, Z + Math.sin(a) * 1.7, -a - Math.PI / 2, 0x6A2A22);
}
vrnSolid({ x: sx + 1, z: Z, r: 1.2 });
for (var cd = 0; cd < 8; cd++) {
var cc = wBox(0.064, 0.004, 0.09, e8M(0xF4F0E4), sx + 1 + (cd % 4 - 1.5) * 0.2, 0.87, Z + (cd < 4 ? -0.3 : 0.3), grp);
cc.rotation.y = cd * 0.7;
}
var gl = wGlow(0xFFE0A0, 3, 0.35);
gl.position.set(sx + 1, 2.4, Z);
grp.add(gl);
vrnSpot(sx + 1, Z + 1.8, 2.2, "The whist table in the saloon", "look at the game", function () { setStatus("🃏 Mr Fogg's rubber: four players, not a word more than the game needs. The thirty-third rubber of the voyage, or the fortieth."); }, 0);
I.nameSign = vrnSign([o.name || "THE STEAMER"], 7, 1.2, X - L2 - 0.4, 1.6, Z, -Math.PI / 2, grp);
vrnBoxM(5, 1.1, 3.2, wood, X + 6, 0.55, Z, grp);
vrnSolid({ x: X + 6, z: Z, hw: 2.6, hd: 1.7 });
var sk = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.8), e8M(0xFFC880, { e: 0xC86A20, ei: 0.5 }));
sk.rotation.x = -Math.PI / 2;
sk.position.set(X + 6, 1.12, Z);
grp.add(sk);
vrnSpot(X + 6, Z + 2.4, 2.4, "The engine-room skylight", "look down at the engines", function () { setStatus("🔥 Down below, the furnaces roar, the great cranks go round, the screw drives her on; the stokers' shovels flash in the glare."); }, 0);
vrnBoxM(o.beam, 0.3, 2.4, wood, X + L2 - 14, 4, Z, grp);
vrnFloor(X + L2 - 14, Z, B2, 1.2, 4.15, { inside: 1 });
for (var st = 0; st < 5; st++)
vrnBoxM(1.2, 0.2, 0.6, wood, X + L2 - 18 + st * 0.7, 0.2 + st * 0.8, Z + B2 - 1.4, grp);
wCyl(0.35, 0.4, 1.1, brass, X + L2 - 14, 4.7, Z, grp, 10);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.05, 5, 20), wood);
wh.position.set(X + L2 - 15, 5.3, Z);
wh.rotation.y = Math.PI / 2;
grp.add(wh);
vrnSpot(X + L2 - 17, Z + B2 - 1.4, 2.4, "The stair to the bridge", "go up onto the bridge", function () { vrnMove(X + L2 - 14, Z + 1, -Math.PI / 2, "⚓ <b>The bridge.</b> The officer of the watch, the helmsman, the compass; the whole sea ahead.", 4.15); }, 0);
vrnSpot(X + L2 - 14, Z + 2, 1.8, "The way down from the bridge", "go down to the deck", function () { vrnMove(X + L2 - 18, Z + B2 - 2, null, null, 0); }, 4.15);
var lb = vrnBoxM(1.6, 1.1, 0.1, e8M(0x1E2A22), X - 4, 1.6, Z - B2 + 0.3, grp);
vrnSign(["NOON"], 1.4, 0.3, X - 4, 2.3, Z - B2 + 0.4, 0, grp);
vrnSpot(X - 4, Z - B2 + 1.6, 2.2, "The log-board", "read the noon position", function () { setStatus("📋 The noon position, chalked on the board: latitude, longitude, and the miles run since yesterday. Mr Fogg reads it every day, and enters it in his book."); }, 0);
vrnSpot(X + L2 + 3, Z, 2.6, "The bow", "look ahead", function () { setStatus("🌊 Spray, the stem cutting the sea, porpoises playing under the bow; far ahead, a smudge of smoke from another ship."); }, 0);
vrnSpot(X, Z + B2 - 1, 2.6, "The ship's rail", "look out to sea", function () { setStatus("🌅 The sea, going by: a long swell, flying fish, a sail far off."); }, 0);
[[-L2 + 20, -2], [-L2 + 24, 2], [4, -B2 + 1.4], [10, B2 - 1.4], [L2 - 24, -1]].forEach(function (f, i) { vrnFolk(grp, 1873 + i, X + f[0], Z + f[1], { still: i < 2, r: 6, look: { _vb: ["gent", "lady", "clerk", "man", "sailor"][i], sex: i === 1 ? "f" : "m" } }); });
},
function (name, port, s, off) {
var I = VRN_IN.e8_deck;
I.name = "the " + name;
I.say = "⚓ <b>The " + name + ".</b> " + ({ Mongolia: "The Peninsular Company's iron screw steamer, two thousand eight hundred tons, five hundred horse-power, Suez to Bombay.", Rangoon: "The Peninsular Company's Rangoon, Calcutta to Hong Kong by Singapore: as fast as the Mongolia, not as comfortable.", Carnatic: "The Peninsular Company's Carnatic, Hong Kong to Yokohama.", "General Grant": "The Pacific Mail Company's General Grant: a great paddle-wheel steamer of two thousand five hundred tons, with three masts, Yokohama to San Francisco." }[name] || "");
if (I.built && I.nameSign) {
try {
var p = I.nameSign.parent, pos = I.nameSign.position.clone(), r = I.nameSign.rotation.y;
p.remove(I.nameSign);
I.nameSign = vrnSign([name.toUpperCase()], 7, 1.2, pos.x, pos.y, pos.z, r, p);
}
catch (e) { }
}
if (port)
e8Out("e8_deck", port, s || 0, off != null ? off : -20, "Down the gangway onto the quay.");
},
function (grp, I) {
var X = I.x, Z = I.z, wall = vrnSurf("plaster", 0xF0E8D8, 2);
vrnRoom(grp, X, Z, 30, 20, 5, { wall: wall, floor: vrnSurf("stone", 0xD8CCB8, 2), gaps: { s: [[15, 2.4, 0]] }, lamps: false, ceilM: e8Ceil(0xF2ECE0) });
vrnDoorOut(grp, X, Z + 10.6, "e8_consul", "The door to the square");
vrnTable(grp, X, Z - 5, 4, 1.8, 0, 0x4A2A16);
vrnChair(grp, X, Z - 6.4, 0, 0x5A2A1A);
vrnChair(grp, X - 1, Z - 3, Math.PI, 0x5A2A1A);
vrnChair(grp, X + 1, Z - 3, Math.PI, 0x5A2A1A);
wBox(0.3, 0.12, 0.2, e8M(0x6A4A2A), X + 1.2, 0.9, Z - 5, grp);
wCyl(0.06, 0.07, 0.1, e8M(0x141414), X - 1.2, 0.9, Z - 5.2, grp, 8);
wBox(0.4, 0.01, 0.3, e8M(0xF4F0E4), X, 0.86, Z - 4.8, grp);
var pt = wBox(1.6, 2, 0.1, e8M(0x6A4A2A), X, 3, Z - 9.9, grp);
var pf = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.7), e8M(0x4A3A3A));
pf.position.set(X, 3, Z - 9.84);
grp.add(pf);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.1), e8UnionMat());
fl.position.set(X + 4, 3.6, Z - 9.85);
grp.add(fl);
vrnShelf(grp, X - 14.6, Z - 2, 8, Math.PI / 2, 3.6);
vrnShelf(grp, X + 14.6, Z - 2, 8, -Math.PI / 2, 3.6);
var fan = new THREE.Group();
fan.position.set(X, 4.6, Z - 2);
grp.add(fan);
for (var b = 0; b < 4; b++) {
var bl = wBox(2.2, 0.02, 0.3, e8M(0x6A4A2A), 0, 0, 0, fan);
bl.rotation.y = b * Math.PI / 4;
}
I.fan = vlgLoose(fan);
vrnRug(grp, X, Z, 10, 7, 0x6A2A2A);
vrnSpot(X, Z - 3.4, 2.4, "The consul's desk", "look", function () { setStatus("🖋️ The consul's desk: passports to sign, the seal of the consulate, a list of the steamers due, and Mr Fix's telegram form, half filled in."); }, 0);
vrnSpot(X + 9, Z + 8.6, 2.4, "The window on the square", "look out", function () { setStatus("🪟 The square: palms, camels, white walls; two hundred steps off, the quay and the Mongolia."); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, stn = vrnSurf("stone", 0xD8C8A8, 2), gold = e8M(0xD8A830, { m: 0.6, r: 0.3 });
vrnRoom(grp, X, Z, 34, 28, 8, { wall: stn, floor: vrnSurf("stone", 0xC8B898, 2), gaps: { s: [[17, 3, 0]] }, lamps: false });
vrnDoorOut(grp, X, Z + 14.6, "e8_pagoda", "The door to the hill");
for (var c = -2; c <= 2; c++)
[-1, 1].forEach(function (s) { var col = wCyl(0.6, 0.7, 8, stn, X + c * 6, 4, Z + s * 6, grp, 12); for (var r = 0; r < 4; r++)
wCyl(0.75, 0.75, 0.25, gold, X + c * 6, 1 + r * 2, Z + s * 6, grp, 12); vrnSolid({ x: X + c * 6, z: Z + s * 6, r: 0.8 }); });
vrnBoxM(10, 7, 1, stn, X, 3.5, Z - 12, grp);
var dw = new THREE.Mesh(new THREE.PlaneGeometry(3, 4.4), e8M(0x2A1A10));
dw.position.set(X, 2.2, Z - 11.48);
grp.add(dw);
wBox(4, 0.6, 0.4, gold, X, 4.8, Z - 11.4, grp);
for (var l = 0; l < 9; l++) {
var lp = wGlow(0xFFB050, 1.4, 0.6);
lp.position.set(X - 8 + l * 2, 1.2, Z - 10.6);
grp.add(lp);
wCyl(0.1, 0.14, 0.12, gold, X - 8 + l * 2, 1, Z - 10.6, grp, 8);
}
for (var g = 0; g < 14; g++) {
wSph(0.15, e8M(g % 2 ? 0xF0A020 : 0xF0F0E0), X - 3.5 + g * 0.54, 4.2 - Math.sin(g / 13 * Math.PI) * 0.8, Z - 11.3, grp, 6);
}
vrnSpot(X, Z - 9.6, 3, "The sanctuary", "look, from a respectful distance", function () { setStatus("🪔 The inner shrine, behind its carved doorway: lamps, flowers, the smell of incense. Only the priests go further."); }, 0);
var rk = new THREE.Group();
rk.position.set(X + 6, 0, Z + 12.4);
grp.add(rk);
vrnBoxM(4, 0.8, 0.8, vrnSurf("wood", 0x6A4A2A, 1), 0, 0.4, 0, rk);
for (var sh = 0; sh < 6; sh++)
wBox(0.12, 0.1, 0.3, e8M(0x3A2A1A), -1.5 + sh * 0.6, 0.85, 0, rk);
vrnSpot(X + 6, Z + 11, 2.4, "The place for shoes", "read the custom", function () { setStatus("👞 Here, by the door, every worshipper leaves his shoes: it is forbidden to enter a temple shod. The English government itself has a law that its subjects must respect the religions of the country."); }, 0);
vrnRug(grp, X, Z, 16, 10, 0xA83A2A);
},
function (grp, I) {
var X = I.x, Z = I.z, wood = e8Grain(0x7A4A2A), plush = e8M(0x7A2A2A), brass = vrnBrass();
vrnInFloor(grp, X, Z, 44, 4, 0, vrnSurf("wood", 0x5A3A22, 2));
vrnRug(grp, X, Z, 42, 1.1, 0x4A1E1E);
[-2, 2].forEach(function (s) {
for (var w = -21; w < 21; w += 3) {
vrnBoxM(0.8, 0.9, 0.12, wood, X + w, 0.45, Z + s, grp);
vrnBoxM(0.2, 1.0, 0.12, wood, X + w + 1.4, 2.4, Z + s, grp);
var win = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.1), e8M(0xD8E8F0, { op: 0.18 }));
win.position.set(X + w + 1.5, 1.75, Z + s * 0.98);
win.rotation.y = s > 0 ? Math.PI : 0;
grp.add(win);
}
vrnBoxM(44, 0.3, 0.12, wood, X, 1.1, Z + s, grp);
vrnBoxM(44, 0.5, 0.12, wood, X, 2.95, Z + s, grp);
});
[-22, 22].forEach(function (e) { vrnBoxM(0.12, 3.2, 4, wood, X + e, 1.6, Z, grp); });
vrnBoxM(44, 0.2, 4.4, e8M(0xE8DCC0), X, 3.25, Z, grp);
for (var r = -20; r < 20; r += 2.4)
[-1, 1].forEach(function (s) { vrnBoxM(1.1, 0.45, 0.9, plush, X + r, 0.5, Z + s * 1.3, grp); vrnBoxM(0.15, 0.7, 0.9, plush, X + r - 0.5, 0.95, Z + s * 1.3, grp); });
var stove = wCyl(0.35, 0.4, 1.2, e8M(0x1A1A1A), X + 19, 0.6, Z + 1.4, grp, 10);
wCyl(0.08, 0.08, 2, e8M(0x1A1A1A), X + 19, 2.2, Z + 1.4, grp, 6);
var sg = wGlow(0xFF7A3A, 0.8, 0.5);
sg.position.set(X + 19, 0.5, Z + 1.1);
grp.add(sg);
vrnSpot(X + 19, Z + 0.6, 1.8, "The stove", "warm your hands", function () { setStatus("🔥 A cast-iron stove, red-hot; the conductor feeds it with coal from a box. Outside, the wind."); }, 0);
vrnTable(grp, X - 12, Z + 1.3, 1.2, 0.8, 0, 0x4A2A16);
vrnSpot(X - 12, Z + 0.4, 1.8, "The card table", "look", function () { setStatus("🃏 A little folding table between two seats: cards, counters, a pencil and the score."); }, 0);
for (var l = -18; l <= 18; l += 9) {
var lp = wGlow(0xFFE0A0, 1.6, 0.35);
lp.position.set(X + l, 3, Z);
grp.add(lp);
wCyl(0.1, 0.14, 0.3, brass, X + l, 3.05, Z, grp, 8);
}
vrnSpot(X + 21, Z, 1.8, "The door to the platform", "go out onto the platform", function () { setStatus("🌬️ The little open platform at the end of the car: the rails flying away behind, the wind enough to take your hat."); }, 0);
vrnSpot(X, Z + 1.6, 1.8, "The carriage window", "look out", function () { setStatus(E8.carView === "snow" ? "❄️ Snow, a white plain to the horizon, the telegraph poles going by." : E8.carView === "plains" ? "🦬 Prairie and mountains; once, a herd of buffaloes crossing the line." : "🌴 Palms and paddy-fields, villages, temples, a river; a tiger, perhaps, in the jungle."); }, 0);
var out = new THREE.Group();
out.userData.keep = 1;
grp.add(out);
I.scroll = [];
var R = wRand(1872);
var ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), e8M(0x6A8A4A));
ground.rotation.x = -Math.PI / 2;
ground.position.set(X, -1.6, Z);
out.add(ground);
I.ground = ground;
for (var t = 0; t < 36; t++) {
var tr = new THREE.Group(), side = t % 2 ? 1 : -1;
tr.position.set(X - 120 + t * 7 + R() * 4, -1.6, Z + side * (8 + R() * 40));
out.add(tr);
var h = 4 + R() * 6;
tr.add(wCyl(0.2, 0.3, h, e8M(0x5A4632), 0, h / 2, 0, null, 6));
var cr = wSph(2 + R() * 2, e8M(0x2E5A26), 0, h + 0.5, 0, null, 8);
cr.scale.y = 0.7;
tr.add(cr);
tr.userData.cr = cr;
I.scroll.push(tr);
}
for (var p = 0; p < 8; p++) {
var pole = new THREE.Group();
pole.position.set(X - 120 + p * 30, -1.6, Z + 6);
out.add(pole);
pole.add(wCyl(0.1, 0.12, 7, e8M(0x6A5A44), 0, 3.5, 0, null, 6));
pole.add(wBox(1.2, 0.08, 0.08, e8M(0x6A5A44), 0, 6.6, 0, null));
I.scroll.push(pole);
}
I.view = function (kind) { E8.carView = kind; var g = kind === "snow" ? 0xF2F4F6 : kind === "plains" ? 0x9A9A5A : 0x6A8A4A, c = kind === "snow" ? 0x3A4A3A : kind === "plains" ? 0x5A6A3A : 0x2E5A26; I.ground.material = e8M(g); I.scroll.forEach(function (o) { if (o.userData.cr)
o.userData.cr.material = e8M(c); }); };
I.view(E8.carView || "india");
},
function (grp, I) {
var X = I.x, Z = I.z, stn = vrnSurf("stone", 0x8A7A64, 2), dark = e8M(0x0A0806);
vrnRoom(grp, X, Z, 36, 28, 9, { wall: stn, floor: vrnSurf("stone", 0x6A5E4E, 2), gaps: { s: [[18, 3, 0]] }, lamps: false });
vrnDoorOut(grp, X, Z + 14.6, "e8_temple", "The door to the glade");
for (var c = -2; c <= 2; c++)
[-1, 1].forEach(function (s) { wCyl(0.7, 0.8, 9, stn, X + c * 6.4, 4.5, Z + s * 7, grp, 10); vrnSolid({ x: X + c * 6.4, z: Z + s * 7, r: 0.9 }); });
for (var t = 0; t < 6; t++) {
var tg = wGlow(0xFF9A3A, 2.2, 0.55);
tg.position.set(X - 15 + t * 6, 4, Z + (t % 2 ? -13.4 : 13.4));
grp.add(tg);
}
vrnIWall(grp, X - 8, Z - 6, X + 8, Z - 6, 9, stn, [[8, 2.4, 3.4]]);
var bed = vrnBoxM(3, 0.5, 1.4, e8M(0xC8A040), X, 0.25, Z - 10, grp);
wBox(3, 0.06, 1.4, e8M(0xE8D8B8), X, 0.52, Z - 10, grp);
for (var k = 0; k < 8; k++) {
var fl = wSph(0.2, e8M([0xF0A020, 0xE84A2A, 0xF0F0E0][k % 3]), X - 1.4 + k * 0.4, 0.62, Z - 10.6 + (k % 2) * 1.2, grp, 6);
}
var bw = new THREE.Group();
bw.position.set(X, 0, Z - 13.8);
grp.add(bw);
for (var r = 0; r < 8; r++)
for (var q = 0; q < 10; q++)
wBox(0.78, 0.36, 0.3, e8M(r % 2 ? 0x7A5A3A : 0x6A4A30), -3.6 + q * 0.8 + (r % 2) * 0.4, 0.2 + r * 0.4, 0, bw);
I.backWall = vlgLoose(bw);
vrnSpot(X, Z - 12.4, 2.6, "The back wall of the pagoda", "look", function () { setStatus("🧱 Brick and timber, the mortar soft with age. A way could be made through it, quietly, with a knife."); }, 0);
vrnSpot(X, Z - 8, 2.6, "The inner room", "look", e8A ? function () { setStatus(e8A("🌙 A young woman of great beauty lies there, senseless: the priests have drugged her with opium and hemp, so that she will not resist at dawn.", "🌙 A young woman lies there, asleep: the priests have given her something to make her sleep. At dawn they mean to take her life. You mean to save her.")()); } : null, 0);
vrnSpot(X + 12, Z + 11, 2.4, "The guards at the door", "look", function () { setStatus("🗡️ The rajah's guards, their swords drawn, watching by the torches. These ones are not asleep."); }, 0);
I.night = vlgDome(grp, X, Z, 60, 0x05060C, 0.6);
},
function (grp, I) {
var X = I.x, Z = I.z, wood = e8Grain(0x5A3418);
vrnRoom(grp, X, Z, 34, 28, 8, { wall: vrnSurf("plaster", 0xF0EADC, 2), floor: vrnSurf("wood", 0x7A5432, 2), gaps: { s: [[17, 3, 0]] }, lamps: false, ceilM: e8Ceil(0xF2ECE0) });
vrnDoorOut(grp, X, Z + 14.6, "e8_court", "The door to the street");
vrnBoxM(10, 1.4, 3, wood, X, 0.7, Z - 10, grp);
vrnBoxM(10, 1.2, 0.3, wood, X, 2, Z - 8.6, grp);
vrnSolid({ x: X, z: Z - 10, hw: 5, hd: 1.6 });
vrnChair(grp, X, Z - 11, 0, 0x2A1A12);
vrnFloor(X, Z - 10.4, 5, 1.4, 1.4, { inside: 1 });
var ck = wCyl(1, 1, 0.2, e8M(0xF4F0E4), X, 6, Z - 13.8, grp, 24);
ck.rotation.x = Math.PI / 2;
var hh = wBox(0.08, 0.7, 0.04, e8M(0x141414), X, 6.25, Z - 13.68, grp);
var mh = wBox(0.06, 0.9, 0.04, e8M(0x141414), X, 6, Z - 13.66, grp);
I.hand = vlgLoose(mh);
mh.geometry.translate(0, 0.4, 0);
mh.position.y = 6;
vrnSpot(X, Z - 7, 2.6, "The big clock over the judge", "look at the time", function () { setStatus("🕰️ The big clock over the judge: its hands seem to go round with terrible rapidity. The steamer for Hong Kong leaves at noon."); }, 0);
vrnBoxM(4, 1.1, 3, wood, X + 9, 0.55, Z - 4, grp);
vrnSolid({ x: X + 9, z: Z - 4, hw: 2, hd: 1.5 });
vrnSpot(X + 9, Z - 2, 2.4, "The dock", "look", function () { setStatus("🪵 The prisoners' dock: a wooden pen, its rail worn smooth."); }, 0);
vrnBoxM(4, 1, 1.4, wood, X - 9, 0.5, Z - 4, grp);
vrnSpot(X - 9, Z - 2.6, 2.4, "The clerk's table", "look", function () { setStatus("📜 The clerk's table: the charge-sheet, the Bible, and a bundle tied in cloth: the evidence."); }, 0);
for (var r = 0; r < 4; r++)
[-1, 1].forEach(function (s) { e8Bench(grp, X + s * 6, Z + 3.6 + r * 2.4, 10, 0, e8Grain(0x5A3418), true, true); });
for (var f = 0; f < 6; f++)
vrnFolk(grp, 1500 + f, X - 8 + f * 3.2, Z + 5 + (f % 2) * 2.4, { still: 1, look: { _vb: ["hindoo", "gent", "hindoow", "clerk", "hindoo", "lady"][f], sex: f === 2 || f === 5 ? "f" : "m" } });
},
function (grp, I) {
var X = I.x, Z = I.z, wood = e8Grain(0x4A2A1A);
vrnRoom(grp, X, Z, 30, 18, 4.6, { wall: e8Grain(0x5A3420), floor: vrnSurf("wood", 0x5A3A22, 2), gaps: { s: [[15, 2.4, 0]] }, lamps: false });
vrnDoorOut(grp, X, Z + 9.6, "e8_tavern", "The door to the quay");
for (var t = 0; t < 4; t++) {
vrnTable(grp, X - 9 + t * 6, Z + 2, 2.2, 1, 0, 0x4A2A16);
[-1, 1].forEach(function (s) { vrnBoxM(2.2, 0.45, 0.4, wood, X - 9 + t * 6, 0.45, Z + 2 + s * 1.1, grp); });
wCyl(0.05, 0.06, 0.2, e8M(0x2A5A2A, { op: 0.8 }), X - 9 + t * 6, 0.95, Z + 2, grp, 8);
}
vrnBoxM(10, 1.2, 1, wood, X - 6, 0.6, Z - 3.6, grp);
for (var b = 0; b < 10; b++)
wCyl(0.06, 0.07, 0.36, e8M([0x2A5A2A, 0x6A2A1A, 0xD8C8A0][b % 3]), X - 10 + b * 0.9, 1.4, Z - 4.4, grp, 6);
for (var l = 0; l < 8; l++) {
var ln = wSph(0.3, e8M(0xE84A2A, { e: 0xC83A1A, ei: 0.7 }), X - 12 + l * 3.4, 3.8, Z + (l % 2 ? -2 : 2), grp, 8);
ln.scale.y = 1.3;
var g = wGlow(0xFF7A3A, 1.6, 0.45);
g.position.copy(ln.position);
grp.add(g);
}
var cu = new THREE.Mesh(new THREE.PlaneGeometry(6, 3.6), e8M(0x6A1E1E, { ds: true }));
cu.position.set(X + 8, 1.8, Z - 4);
grp.add(cu);
for (var c = 0; c < 4; c++) {
vrnBoxM(2.2, 0.5, 0.9, e8M(0x5A2A2A), X + 5.4 + c * 2.6, 0.25, Z - 7.6, grp);
}
vrnSpot(X + 8, Z - 3, 2.4, "The curtain to the back room", "look", function () { setStatus(e8A("💨 The back room: couches, a sweet heavy smoke, men lying in a stupor with long pipes beside them. Opium: forbidden in China, and sold in Hong Kong.", "💨 The back room: couches in a dim haze of smoke, men lying asleep. Not a good place.")()); }, 0);
vrnSpot(X - 6, Z - 2.4, 2.4, "The counter", "look", function () { setStatus("🍶 The counter: port, gin, brandy, rice wine, and the tavern-keeper polishing a glass, watching everyone."); }, 0);
for (var f = 0; f < 5; f++)
vrnFolk(grp, 1600 + f, X - 10 + f * 4.4, Z + 3.4, { still: 1, look: { _vb: ["sailor", "chinese", "sailor", "clerk", "chinese"][f], sex: "m" } });
},
function (grp, I) {
var X = I.x, Z = I.z, deck = vrnSurf("wood", 0xC8A878, 3), wood = vrnSurf("wood", 0x6A4A2A, 2), white = e8M(0xF0E8D8, { ds: true });
vlgSea(grp, X, Z, -1.4, 1000, 0x2E5A74);
I.night = vlgDome(grp, X, Z, 300, 0x0A1018, 0.82);
I.night.visible = false;
if (I.night.userData.stars)
I.night.userData.stars.visible = false;
I.storm = vlgDome(grp, X, Z, 260, 0x2A3038, 0.7);
I.storm.visible = false;
var hl = vlgHullMesh(22, 5, 3, { sheer: 1 });
hl.position.set(X, -0.15, Z);
grp.add(hl);
vrnInFloor(grp, X, Z, 18, 4.4, 0, deck);
vlgRail(grp, X - 9, Z - 2.2, X + 9, Z - 2.2, 0, 0.6, wood);
vlgRail(grp, X - 9, Z + 2.2, X + 9, Z + 2.2, 0, 0.6, wood);
[[-3, 13], [4, 11]].forEach(function (m) { wCyl(0.14, 0.2, m[1], wood, X + m[0], m[1] / 2, Z, grp, 6); vrnSolid({ x: X + m[0], z: Z, r: 0.3 }); var sl = wBox(4.2, m[1] - 3, 0.05, white, X + m[0] - 2.3, m[1] / 2 + 0.6, Z, grp); });
var jb = wBox(3.4, 6, 0.05, white, X + 8, 4, Z, grp);
jb.rotation.z = 0.4;
var bs = wCyl(0.08, 0.08, 4, wood, X + 10, 1, Z, grp, 5);
bs.rotation.z = Math.PI / 2 - 0.25;
I.sails = grp.children.slice(-4);
vrnBoxM(3, 0.8, 2.4, wood, X - 5, 0.4, Z, grp);
vrnSolid({ x: X - 5, z: Z, hw: 1.5, hd: 1.2 });
vrnSpot(X - 5, Z + 1.6, 2, "The cabin hatch", "look below", function () { setStatus("🛏️ The one little cabin: two cots, a lamp, a locker; Fix lies on one, saying nothing."); }, 0);
var tl = wBox(1.6, 0.12, 0.12, wood, X - 8.2, 1, Z, grp);
vrnSpot(X - 8, Z + 1, 2, "The tiller", "take the tiller", function () { setStatus("🧭 The tiller: John Bunsby's own place. He lets you hold her a moment, steady, steady."); }, 0);
var lt = wGlow(0x40FF60, 0.8, 0.7);
lt.position.set(X + 2, 2, Z + 2.3);
grp.add(lt);
var rt = wGlow(0xFF4040, 0.8, 0.7);
rt.position.set(X + 2, 2, Z - 2.3);
grp.add(rt);
vrnSpot(X + 8.4, Z, 2.2, "The bow of the Tankadere", "look ahead", function () { setStatus("🌊 She leaps like a fish through the swell. Far ahead, the coast of China."); }, 0);
var gn = wCyl(0.12, 0.16, 1, vrnBrass(), X + 5, 0.5, Z + 1.4, grp, 8);
gn.rotation.z = Math.PI / 2;
vrnSpot(X + 5, Z + 1.4, 1.8, "The signal gun", "look", function () { setStatus("💥 A little brass gun, for signals in fog. And for other signals, if needed."); }, 0);
},
function (grp, I) {
var X = I.x, Z = I.z, wood = e8Grain(0x6A3A22);
vrnRoom(grp, X, Z, 42, 36, 12, { wall: vrnSurf("plaster", 0xF2ECDE, 2), floor: vrnSurf("wood", 0x8A6A44, 2), gaps: { s: [[21, 3, 0]] }, lamps: false });
vrnDoorOut(grp, X, Z + 18.6, "e8_circus", "The door to the street");
vrnBoxM(20, 1.2, 12, wood, X, 0.6, Z - 10, grp);
vrnFloor(X, Z - 10, 10, 6, 1.2, { inside: 1 });
for (var s = 0; s < 3; s++)
vrnBoxM(4, 0.4, 0.6, wood, X + 8, 0.2 + s * 0.4, Z - 3.6 + s * 0.6 - 1.6, grp);
for (var g = 0; g < 4; g++) {
var gl = wGlow(0xFFB070, 6, 0.4);
gl.position.set(X - 12 + g * 8, 8, Z - 8);
grp.add(gl);
}
var gong = wCyl(1, 1, 0.1, e8M(0xC8A040, { m: 0.7, r: 0.3 }), X - 9, 2.4, Z - 15, grp, 24);
gong.rotation.x = Math.PI / 2;
wBox(2.6, 0.2, 0.2, wood, X - 9, 3.5, Z - 15, grp);
vrnSpot(X - 9, Z - 13.4, 2.4, "The gong", "strike it", function () { if (typeof playTone === "function")
playTone(110, 0.8); setStatus("🔔 BONG. The whole troupe looks round."); }, 1.2);
var py = new THREE.Group();
py.position.set(X, 1.2, Z - 10);
grp.add(py);
I.pyramid = vlgLoose(py);
vrnSpot(X, Z - 5, 3, "The stage", "look", function () { setStatus("🎭 The stage: drums and flutes, a juggler with lighted candles, and the great act still to come: the Long Noses' pyramid."); }, 1.2);
vrnSpot(X + 12, Z - 14, 2.4, "The dressing-room", "look in", function () { setStatus("👺 Wings of painted paper, noses of bamboo five, six, ten feet long, in a rack; costumes; a cat asleep in a basket."); }, 0);
for (var f = 0; f < 12; f++)
vrnFolk(grp, 1700 + f, X - 13 + (f % 6) * 5.2, Z + 2.6 + Math.floor(f / 6) * 2.6, { still: 1, y: 0.5 + Math.floor(f / 6) * 0.5, look: { _vb: f % 3 ? "japan" : "japanw", sex: f % 3 ? "m" : "f" } });
},
function (n) {
var I = VRN_IN.e8_circus, py = I && I.pyramid;
if (!py)
return;
while (py.children.length)
py.remove(py.children[0]);
for (var t = 0; t < n; t++) {
var k = 5 - t;
if (k < 1)
break;
for (var i = 0; i < k; i++) {
var x = (i - (k - 1) / 2) * 1.4, y = t * 1.6;
var bd = wBox(0.5, 0.3, 1.6, e8M([0x2A3A6A, 0xC83A2A, 0xE8C048][t % 3]), x, y + 0.2, 0, py);
var hd = wSph(0.16, e8M(0xE8C8A0), x, y + 0.3, 0.9, py, 8);
var ns = wCyl(0.03, 0.05, 1.4, e8M(0xC83A2A), x, y + 1, 0.9, py, 6);
var wg = wBox(1.2, 0.02, 0.4, e8M(0xF0E8D0), x, y + 0.4, 0, py);
}
}
},
function (grp, I) {
var X = I.x, Z = I.z, deck = vrnSurf("wood", 0xB89A6A, 3), wood = vrnSurf("wood", 0x8A6A44, 2), dark = vrnSurf("wood", 0x5A3A22, 2), black = e8M(0x1A1A1E);
vlgSea(grp, X, Z, -2.6, 1100, 0x2A4A5A);
var hl = vlgHullMesh(66, 10, 6, { sheer: 0.6 });
hl.position.set(X, -0.15, Z);
grp.add(hl);
vrnInFloor(grp, X, Z, 58, 9, 0, deck);
vlgRail(grp, X - 29, Z - 4.5, X + 29, Z - 4.5, 0, 1, dark);
vlgRail(grp, X - 29, Z + 4.5, X + 29, Z + 4.5, 0, 1, dark);
vlgRail(grp, X - 29, Z - 4.5, X - 29, Z + 4.5, 0, 1, dark);
wCyl(1.2, 1.2, 9, black, X + 2, 4.5, Z, grp, 14);
wCyl(1.25, 1.25, 1.2, e8M(0xB8302A), X + 2, 8.4, Z, grp, 14);
vrnSolid({ x: X + 2, z: Z, r: 1.4 });
var sm = wGlow(0x6A6A70, 6, 0.2);
sm.position.set(X, 12, Z);
grp.add(sm);
I.parts = [];
var cab = new THREE.Group();
grp.add(cab);
vrnIWall(cab, X - 24, Z - 3, X - 14, Z - 3, 2.6, wood);
vrnIWall(cab, X - 24, Z + 3, X - 14, Z + 3, 2.6, wood);
vrnIWall(cab, X - 24, Z - 3, X - 24, Z + 3, 2.6, wood);
vrnIWall(cab, X - 14, Z - 3, X - 14, Z + 3, 2.6, wood, [[3, 1.4, 2.1]]);
vrnBoxM(10.4, 0.2, 6.4, wood, X - 19, 2.7, Z, cab);
I.parts.push(vlgLoose(cab));
var bunks = new THREE.Group();
grp.add(bunks);
for (var b = 0; b < 4; b++)
vrnBoxM(2, 0.5, 0.9, dark, X - 22 + b * 2.2, 0.6, Z - 2.2, bunks);
I.parts.push(vlgLoose(bunks));
var masts = new THREE.Group();
grp.add(masts);
[-16, 16].forEach(function (mx) { wCyl(0.2, 0.28, 16, dark, X + mx, 8, Z, masts, 6); for (var y = 6; y < 14; y += 3.4) {
var yd = wCyl(0.08, 0.08, 7, dark, X + mx, y, Z, masts, 5);
yd.rotation.x = Math.PI / 2;
} });
I.parts.push(vlgLoose(masts));
var house = new THREE.Group();
grp.add(house);
vrnBoxM(6, 2.2, 5, wood, X + 12, 1.1, Z, house);
I.parts.push(vlgLoose(house));
var bul = new THREE.Group();
grp.add(bul);
for (var r = -26; r < 26; r += 2)
[-1, 1].forEach(function (s) { vrnBoxM(1.8, 0.9, 0.12, wood, X + r, 0.45, Z + s * 4.4, bul); });
I.parts.push(vlgLoose(bul));
I.burn = function (n) { I.parts.forEach(function (p, i) { p.visible = i >= n; }); };
vrnBoxM(3, 1, 2.6, black, X + 6, 0.5, Z, grp);
vrnSolid({ x: X + 6, z: Z, hw: 1.5, hd: 1.3 });
var fh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2), e8M(0xFF8A30, { e: 0xE85A10, ei: 0.9 }));
fh.rotation.x = -Math.PI / 2;
fh.position.set(X + 6, 1.02, Z);
grp.add(fh);
vrnSpot(X + 6, Z + 1.8, 2.2, "The furnace hatch", "look down", function () { setStatus("🔥 The stokehold: the furnaces roaring white, the stokers black with coal dust. The bunker is nearly empty."); }, 0);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.05, 5, 20), dark);
wh.position.set(X - 26, 1.4, Z);
wh.rotation.y = Math.PI / 2;
grp.add(wh);
vrnBoxM(0.3, 1.4, 0.3, dark, X - 26.4, 0.7, Z, grp);
vrnSpot(X - 25, Z + 1.2, 2.2, "The Henrietta's wheel", "take the wheel", function () { setStatus("🧭 Mr Fogg's course: east-north-east, for Liverpool. Not Bordeaux."); }, 0);
vrnSpot(X - 19, Z + 3.6, 2.2, "The captain's cabin", "listen at the door", function () { setStatus("🔒 From inside, a furious voice, kicks at the door, and words that cannot be written down. Captain Speedy is locked in his cabin."); }, 0);
I.burn(0);
},
function (grp, I) {
var X = I.x, Z = I.z, marble = vrnSurf("marble", 0xD8D0C0, 2), wood = vrnSurf("wood", 0x5A3A22, 2);
vrnRoom(grp, X, Z, 36, 24, 10, { wall: marble, floor: vrnSurf("marble", 0xC8C0B0, 2), gaps: { s: [[18, 3, 0]] }, lamps: false, ceilM: e8Ceil(0xF4F0E8) });
vrnDoorOut(grp, X, Z + 12.6, "e8_custom", "The door to the quay");
for (var c = -2; c <= 2; c++)
[-1, 1].forEach(function (s) { wCyl(0.6, 0.65, 10, marble, X + c * 7, 5, Z + s * 4, grp, 14); vrnSolid({ x: X + c * 7, z: Z + s * 4, r: 0.7 }); });
for (var d = 0; d < 4; d++) {
vrnTable(grp, X - 12 + d * 8, Z + 6, 2.4, 1, 0, 0x4A2A16);
vrnChair(grp, X - 12 + d * 8, Z + 7.2, Math.PI, 0x3A2A1A);
}
var lw = vrnSurf("stone", 0x8A8478, 2);
vrnIWall(grp, X - 8, Z - 6, X + 8, Z - 6, 4, lw, [[8, 1.4, 2.4]]);
vrnBoxM(4, 0.5, 1, wood, X, 0.25, Z - 10.6, grp);
for (var b = 0; b < 6; b++)
wCyl(0.04, 0.04, 1.4, vrnMetal(0x2A2A2E), X - 1.25 + b * 0.5, 2.6, Z - 11.88, grp, 5);
var wn = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.4), e8M(0xC8D0D8, { e: 0x8A9AA8, ei: 0.5 }));
wn.position.set(X, 2.6, Z - 11.9);
grp.add(wn);
vrnSpot(X, Z - 5, 2.4, "The door of the lock-up", "look", function () { setStatus("🔒 The door of the lock-up, a grille in it. Inside: a bench, a barred window, and the rain."); }, 0);
var ck = wCyl(1, 1, 0.2, e8M(0xF4F0E4), X, 7, Z + 11.8, grp, 24);
ck.rotation.x = Math.PI / 2;
vrnSpot(X, Z + 9, 2.6, "The Custom House clock", "look at the time", function () { setStatus("🕰️ The clock of the Custom House. Every tick, a second Mr Fogg cannot spend."); }, 0);
for (var f = 0; f < 5; f++)
vrnFolk(grp, 1800 + f, X - 12 + f * 6, Z + 4.4, { still: 1, look: { _vb: "clerk", sex: "m" } });
},
function (key, w, h, draw) {
E8.cv = E8.cv || {};
if (E8.cv[key])
return E8.cv[key];
var c = document.createElement("canvas");
c.width = w;
c.height = h;
draw(c.getContext("2d"), w, h);
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
try {
t.anisotropy = Math.min(VRN.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
if (THREE.sRGBEncoding && typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (E8.cv[key] = t);
},
function (key, tex, o) {
o = o || {};
var k = "e8t:" + key + ":" + (o.col || 0) + ":" + (o.e || 0);
if (VRN.mats[k])
return VRN.mats[k];
var p = { map: tex, color: o.col || 0xFFFFFF };
var m = VRN.lite ? new THREE.MeshLambertMaterial(p) : new THREE.MeshPhongMaterial(Object.assign(p, { shininess: o.shine || 8, specular: o.spec || 0x161410 }));
if (o.ds)
m.side = THREE.DoubleSide;
if (o.e) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
m.emissiveMap = tex;
}
if (o.op) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
return (VRN.mats[k] = m);
},
function (tint) {
var t = e8Canvas("grain", 256, 256, function (x, w, h) {
x.fillStyle = "#c4c4c4";
x.fillRect(0, 0, w, h);
var R = wRand(77);
for (var i = 0; i < 260; i++) {
var y = R() * h, a = 0.025 + R() * 0.07, v = R() < 0.55 ? 255 : 30, k = 1 + ((R() * 3) | 0), ph = R() * 6.28, amp = 0.6 + R() * 2.4;
x.strokeStyle = "rgba(" + v + "," + v + "," + v + "," + a + ")";
x.lineWidth = 0.5 + R() * 2.4;
x.beginPath();
for (var px = 0; px <= w; px += 8) {
var yy = y + Math.sin(px / w * 6.283 * k + ph) * amp;
if (px)
x.lineTo(px, yy);
else
x.moveTo(px, yy);
}
x.stroke();
}
for (var n = 0; n < 5; n++) {
var cx = R() * w, cy = R() * h;
x.strokeStyle = "rgba(40,30,20,0.1)";
for (var r = 2; r < 12; r += 2.5) {
x.beginPath();
x.ellipse(cx, cy, r * 2.2, r * 0.7, 0, 0, 6.283);
x.stroke();
}
}
});
t.repeat.set(0.6, 0.6);
return e8TexMat("grain", t, { col: tint, shine: 18, spec: 0x221c14 });
},
function () {
var t = e8Canvas("tatami", 256, 256, function (x, w, h) {
x.fillStyle = "#C9B57C";
x.fillRect(0, 0, w, h);
var R = wRand(31);
for (var i = 0; i < w; i += 2) {
x.fillStyle = "rgba(" + (R() < 0.5 ? 255 : 90) + "," + (R() < 0.5 ? 240 : 80) + ",160," + (0.05 + R() * 0.08) + ")";
x.fillRect(i, 0, 1, h);
}
x.fillStyle = "#2E3424";
x.fillRect(0, 0, w, 7);
x.fillRect(0, 124, w, 7);
x.fillRect(0, 0, 6, 128);
x.fillRect(128, 128, 6, 128);
});
t.repeat.set(1 / 3.6, 1 / 3.6);
return e8TexMat("tatami", t, { shine: 4 });
},
function () {
var t = e8Canvas("checker", 256, 256, function (x, w, h) {
var R = wRand(52);
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
x.fillStyle = (i + j) % 2 ? "#6E6C68" : "#E8E2D4";
x.fillRect(i * 128, j * 128, 128, 128);
x.strokeStyle = (i + j) % 2 ? "rgba(220,220,210,0.25)" : "rgba(120,110,100,0.25)";
for (var v = 0; v < 5; v++) {
x.lineWidth = 0.6 + R();
x.beginPath();
var px = i * 128 + R() * 128, py = j * 128 + R() * 128;
x.moveTo(px, py);
for (var s = 0; s < 6; s++) {
px += (R() - 0.5) * 50;
py += (R() - 0.3) * 40;
x.lineTo(px, py);
}
x.stroke();
}
}
x.strokeStyle = "rgba(40,36,30,0.6)";
x.lineWidth = 2;
x.strokeRect(1, 1, 126, 126);
x.strokeRect(129, 129, 126, 126);
x.strokeRect(129, 1, 126, 126);
x.strokeRect(1, 129, 126, 126);
});
t.repeat.set(1 / 2.4, 1 / 2.4);
return e8TexMat("checker", t, { shine: 60, spec: 0x3a3a3a });
},
function (tint) {
var t = e8Canvas("frieze", 512, 128, function (x, w, h) {
x.fillStyle = "#B0A894";
x.fillRect(0, 0, w, h);
function rel(f) { x.strokeStyle = "rgba(255,250,235,0.55)"; x.lineWidth = 3; x.save(); x.translate(-1.5, -1.5); f(); x.stroke(); x.restore(); x.strokeStyle = "rgba(30,24,16,0.6)"; x.save(); x.translate(1.5, 1.5); f(); x.stroke(); x.restore(); }
for (var i = 0; i < 16; i++) {
var cx = i * 32 + 16;
rel(function () { x.beginPath(); x.moveTo(cx - 14, 40); x.quadraticCurveTo(cx, 4, cx + 14, 40); });
rel(function () { x.beginPath(); x.moveTo(cx - 7, 40); x.quadraticCurveTo(cx, 16, cx + 7, 40); });
}
rel(function () { x.beginPath(); x.moveTo(0, 46); x.lineTo(w, 46); x.moveTo(0, 54); x.lineTo(w, 54); });
for (var k = 0; k < 8; k++) {
var ax = k * 64 + 32;
rel(function () { x.beginPath(); x.moveTo(ax - 24, 120); x.lineTo(ax - 24, 82); x.arc(ax, 82, 24, Math.PI, 0); x.lineTo(ax + 24, 120); });
x.fillStyle = "rgba(20,16,10,0.45)";
x.beginPath();
x.moveTo(ax - 16, 118);
x.lineTo(ax - 16, 84);
x.arc(ax, 84, 16, Math.PI, 0);
x.lineTo(ax + 16, 118);
x.fill();
rel(function () { x.beginPath(); x.arc(ax, 70, 4, 0, 6.283); });
}
var R = wRand(9);
for (var n = 0; n < 900; n++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? 255 : 0) + "," + (R() < 0.5 ? 255 : 0) + ",0,0.05)";
x.fillRect(R() * w, R() * h, 2, 2);
}
});
return e8TexMat("frieze", t, { col: tint || 0xFFFFFF, shine: 4 });
},
function () {
var t = e8Canvas("jali", 128, 128, function (x, w, h) {
x.fillStyle = "#3A3226";
x.fillRect(0, 0, w, h);
x.fillStyle = "#FFE6B0";
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = i * 32 + 16, cy = j * 32 + 16;
x.beginPath();
for (var a = 0; a < 8; a++) {
var r = a % 2 ? 6 : 13, an = a / 8 * 6.283;
x[a ? "lineTo" : "moveTo"](cx + Math.cos(an) * r, cy + Math.sin(an) * r);
}
x.closePath();
x.fill();
}
});
return e8TexMat("jali", t, { e: 0xFFFFFF, ei: 0.75 });
},
function () {
var t = e8Canvas("backdrop", 1024, 512, function (x, w, h) {
var g = x.createLinearGradient(0, 0, 0, h);
g.addColorStop(0, "#9EC4D8");
g.addColorStop(0.55, "#F2E2C4");
g.addColorStop(1, "#E8C89A");
x.fillStyle = g;
x.fillRect(0, 0, w, h);
x.fillStyle = "rgba(255,250,235,0.9)";
x.beginPath();
x.arc(780, 120, 46, 0, 6.283);
x.fill();
x.fillStyle = "#6A7A94";
x.beginPath();
x.moveTo(180, 380);
x.lineTo(470, 110);
x.quadraticCurveTo(512, 92, 554, 110);
x.lineTo(860, 380);
x.fill();
x.fillStyle = "#F4F2EE";
x.beginPath();
x.moveTo(400, 175);
x.lineTo(470, 110);
x.quadraticCurveTo(512, 92, 554, 110);
x.lineTo(626, 175);
x.lineTo(590, 160);
x.lineTo(560, 182);
x.lineTo(520, 158);
x.lineTo(486, 184);
x.lineTo(450, 162);
x.fill();
x.fillStyle = "rgba(250,244,230,0.85)";
for (var c = 0; c < 5; c++) {
x.beginPath();
x.ellipse(120 + c * 190, 260 + (c % 2) * 30, 120, 18, 0, 0, 6.283);
x.fill();
}
x.fillStyle = "#3E6A78";
x.fillRect(0, 380, w, 132);
x.strokeStyle = "rgba(250,250,240,0.8)";
x.lineWidth = 3;
for (var r = 0; r < 5; r++)
for (var k = 0; k < 14; k++) {
var bx = k * 80 + (r % 2) * 40, by = 400 + r * 24;
x.beginPath();
x.arc(bx, by, 16, Math.PI, 0);
x.stroke();
}
function pine(px, py, s) { x.fillStyle = "#3A2A1E"; x.fillRect(px - 3 * s, py - 60 * s, 6 * s, 60 * s); x.fillStyle = "#24402A"; for (var l = 0; l < 4; l++) {
x.beginPath();
x.ellipse(px + (l % 2 ? 14 : -10) * s, py - (70 + l * 22) * s, (40 - l * 6) * s, 10 * s, 0, 0, 6.283);
x.fill();
} }
pine(70, 420, 1.6);
pine(180, 400, 1.1);
pine(930, 420, 1.7);
pine(860, 396, 1.0);
});
return e8TexMat("backdrop", t, { shine: 2 });
},
function () {
var t = e8Canvas("arms", 256, 256, function (x, w, h) {
x.fillStyle = "#4A2E1A";
x.fillRect(0, 0, w, h);
x.fillStyle = "#C8A040";
x.beginPath();
x.moveTo(78, 60);
x.lineTo(178, 60);
x.lineTo(178, 140);
x.quadraticCurveTo(178, 196, 128, 214);
x.quadraticCurveTo(78, 196, 78, 140);
x.closePath();
x.fill();
x.fillStyle = "#B8202A";
x.fillRect(84, 66, 42, 70);
x.fillRect(130, 140, 42, 48);
x.fillStyle = "#1E3A8A";
x.fillRect(130, 66, 42, 70);
x.fillStyle = "#E8C040";
x.fillRect(84, 140, 42, 48);
x.fillStyle = "#E8C040";
x.beginPath();
x.moveTo(98, 52);
x.lineTo(104, 26);
x.lineTo(116, 40);
x.lineTo(128, 18);
x.lineTo(140, 40);
x.lineTo(152, 26);
x.lineTo(158, 52);
x.fill();
x.font = "bold 15px serif";
x.textAlign = "center";
x.fillStyle = "#E8D8A8";
x.fillText("DIEU ET MON DROIT", 128, 240);
});
return e8TexMat("arms", t, { shine: 20 });
},
function (seed) {
var t = e8Canvas("scroll" + seed, 64, 256, function (x, w, h) {
x.fillStyle = "#EDE4CC";
x.fillRect(0, 0, w, h);
x.fillStyle = "#6A3A22";
x.fillRect(0, 0, w, 10);
x.fillRect(0, h - 12, w, 12);
var R = wRand(seed);
x.strokeStyle = "#1A1612";
x.lineCap = "round";
for (var c = 0; c < 5; c++) {
var cy = 30 + c * 42;
for (var s = 0; s < 4; s++) {
x.lineWidth = 2 + R() * 4;
x.beginPath();
var sx = 14 + R() * 36, sy = cy + R() * 24;
x.moveTo(sx, sy);
x.quadraticCurveTo(sx + (R() - 0.5) * 30, sy + (R() - 0.5) * 20, sx + (R() - 0.5) * 26, sy + R() * 18);
x.stroke();
}
}
x.fillStyle = "#B8202A";
x.fillRect(40, h - 40, 12, 12);
});
return e8TexMat("scroll" + seed, t, { ds: true });
},
function () {
var t = e8Canvas("canalmap", 256, 192, function (x, w, h) {
x.fillStyle = "#E8DCB8";
x.fillRect(0, 0, w, h);
x.fillStyle = "#9CC0C8";
x.fillRect(0, 0, w, 40);
x.beginPath();
x.moveTo(150, 192);
x.lineTo(200, 120);
x.lineTo(256, 110);
x.lineTo(256, 192);
x.fill();
x.strokeStyle = "#2A6A8A";
x.lineWidth = 4;
x.beginPath();
x.moveTo(120, 40);
x.lineTo(126, 90);
x.lineTo(140, 120);
x.lineTo(176, 160);
x.stroke();
x.fillStyle = "#9CC0C8";
x.beginPath();
x.ellipse(132, 100, 12, 7, 0.5, 0, 6.283);
x.fill();
x.fillStyle = "#3A2A1A";
x.font = "11px serif";
x.fillText("PORT SAID", 126, 52);
x.fillText("ISMAILIA", 72, 104);
x.fillText("SUEZ", 182, 168);
x.font = "bold 13px serif";
x.fillText("THE SUEZ CANAL, 1869", 50, 186);
x.strokeStyle = "#6A4A2A";
x.lineWidth = 6;
x.strokeRect(3, 3, w - 6, h - 6);
});
return e8TexMat("canalmap", t, {});
},
function () {
var t = e8Canvas("portrait", 128, 160, function (x, w, h) {
var g = x.createRadialGradient(64, 60, 10, 64, 80, 100);
g.addColorStop(0, "#5A4A34");
g.addColorStop(1, "#1E1810");
x.fillStyle = g;
x.fillRect(0, 0, w, h);
x.fillStyle = "#141210";
x.beginPath();
x.moveTo(20, 160);
x.quadraticCurveTo(26, 96, 64, 92);
x.quadraticCurveTo(102, 96, 108, 160);
x.fill();
x.fillStyle = "#E8D8C8";
x.beginPath();
x.ellipse(64, 66, 15, 19, 0, 0, 6.283);
x.fill();
x.fillStyle = "#3A2A1E";
x.beginPath();
x.ellipse(64, 52, 17, 10, 0, Math.PI, 0);
x.fill();
x.fillStyle = "#F4F0E8";
x.beginPath();
x.moveTo(44, 50);
x.quadraticCurveTo(64, 30, 84, 50);
x.lineTo(90, 92);
x.lineTo(38, 92);
x.fill();
x.fillStyle = "#E8D8C8";
x.beginPath();
x.ellipse(64, 66, 14, 18, 0, 0, 6.283);
x.fill();
x.fillStyle = "#C8A040";
x.fillRect(56, 36, 16, 6);
x.fillStyle = "#2A5AA8";
x.fillRect(48, 112, 32, 4);
x.fillStyle = "rgba(255,240,200,0.06)";
x.fillRect(0, 0, w, h);
});
return e8TexMat("portrait", t, { shine: 30 });
},
function () {
if (E8.shaftM)
return E8.shaftM;
var t = e8Canvas("shaft", 64, 128, function (x, w, h) {
var g = x.createLinearGradient(0, 0, 0, h);
g.addColorStop(0, "rgba(255,244,214,0.55)");
g.addColorStop(1, "rgba(255,244,214,0)");
x.fillStyle = g;
x.fillRect(0, 0, w, h);
var s = x.createLinearGradient(0, 0, w, 0);
s.addColorStop(0, "rgba(0,0,0,1)");
s.addColorStop(0.2, "rgba(0,0,0,0)");
s.addColorStop(0.8, "rgba(0,0,0,0)");
s.addColorStop(1, "rgba(0,0,0,1)");
x.globalCompositeOperation = "destination-out";
x.fillStyle = s;
x.fillRect(0, 0, w, h);
});
return (E8.shaftM = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
},
function (grp, X, Z, w, d, y, hh, th, mat, door, tex) {
var f = 0.15 + th / 2, L = [[X, Z - d / 2 + f, w, 0], [X - w / 2 + f, Z, d, Math.PI / 2], [X + w / 2 - f, Z, d, -Math.PI / 2]], dw = door || 0;
if (dw) {
var seg = (w - dw) / 2;
L.push([X - w / 2 + seg / 2, Z + d / 2 - f, seg, Math.PI], [X + w / 2 - seg / 2, Z + d / 2 - f, seg, Math.PI]);
}
else
L.push([X, Z + d / 2 - f, w, Math.PI]);
L.forEach(function (s) {
if (tex) {
e8Strip(grp, s[0] + Math.sin(s[3]) * 0.01, y, s[1] + Math.cos(s[3]) * 0.01, s[2], hh, s[3], mat, hh * 4);
return;
}
var b = vrnBoxM(s[3] % Math.PI ? th : s[2], hh, s[3] % Math.PI ? s[2] : th, mat, s[0], y, s[1], grp);
});
},
function (grp, X, Z, w, d, hh, mat, frame, door) {
e8Band(grp, X, Z, w, d, hh / 2, hh, 0.05, mat, door);
e8Band(grp, X, Z, w, d, 0.12, 0.24, 0.1, frame, door);
e8Band(grp, X, Z, w, d, hh + 0.04, 0.1, 0.12, frame, door);
if (VRN.lite)
return;
var walls = [[X - w / 2, Z - d / 2 + 0.21, X + w / 2, 0], [X - w / 2 + 0.21, Z - d / 2, Z + d / 2, 1], [X + w / 2 - 0.21, Z - d / 2, Z + d / 2, 1], [X - w / 2, Z + d / 2 - 0.21, X + w / 2, 2]];
walls.forEach(function (W) {
var a = W[3] === 1 ? W[1] : W[0], b = W[3] === 1 ? W[2] : W[2], len = b - a, n = Math.max(1, Math.round(len / 1.6));
for (var i = 0; i < n; i++) {
var c = a + (i + 0.5) * len / n, pw = len / n - 0.36;
if (W[3] === 2 && door && Math.abs(c - X) < door / 2 + 0.6)
continue;
var py = 0.24 + (hh - 0.34) / 2, ph = hh - 0.64;
if (W[3] === 1) {
[[0, ph / 2], [0, -ph / 2]].forEach(function (o) { vrnBoxM(0.04, 0.06, pw, frame, W[0], py + o[1], c, grp); });
[-1, 1].forEach(function (s) { vrnBoxM(0.04, ph, 0.06, frame, W[0], py, c + s * pw / 2, grp); });
}
else {
[[0, ph / 2], [0, -ph / 2]].forEach(function (o) { vrnBoxM(pw, 0.06, 0.04, frame, c, py + o[1], W[1], grp); });
[-1, 1].forEach(function (s) { vrnBoxM(0.06, ph, 0.04, frame, c + s * pw / 2, py, W[1], grp); });
}
}
});
},
function (grp, x, y, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
var fr = o.frame || vrnC(0xEDE6D6, { shine: 24 }), sky = o.sky || 0xE8F0F4, gl = vrnC(sky, { e: sky, ei: o.ei || 0.9 });
var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), gl);
p.position.z = 0.01;
g.add(p);
if (o.arch) {
var a = new THREE.Mesh(new THREE.CircleGeometry(w / 2, 18, 0, Math.PI), gl);
a.position.set(0, h / 2, 0.01);
g.add(a);
var ar = new THREE.Mesh(new THREE.TorusGeometry(w / 2 + 0.04, 0.07, 4, 18, Math.PI), fr);
ar.position.set(0, h / 2, 0.06);
g.add(ar);
}
else
wBox(w + 0.3, 0.16, 0.2, fr, 0, h / 2 + 0.08, 0.08, g);
wBox(w + 0.5, 0.1, 0.34, fr, 0, -h / 2 - 0.05, 0.14, g);
[-1, 1].forEach(function (s) { wBox(0.14, h, 0.2, fr, s * (w / 2 + 0.07), 0, 0.08, g); });
var nx = o.nx || 2, ny = o.ny || 3;
for (var i = 1; i < nx; i++)
wBox(0.05, h, 0.06, fr, -w / 2 + i * w / nx, 0, 0.04, g);
for (var j = 1; j < ny; j++)
wBox(w, 0.05, 0.06, fr, 0, -h / 2 + j * h / ny, 0.04, g);
if (o.shut) {
var sm = vrnC(o.shut, { shine: 12 });
[-1, 1].forEach(function (s) { var sx = s * (w * 0.75 + 0.14); wBox(0.06, h, 0.05, sm, sx - w / 4, 0, 0.06, g); wBox(0.06, h, 0.05, sm, sx + w / 4, 0, 0.06, g); for (var k = 0; k < Math.floor(h / 0.16); k++) {
var sl = wBox(w / 2, 0.12, 0.03, sm, sx, -h / 2 + 0.1 + k * 0.16, 0.07, g);
sl.rotation.x = 0.5;
} });
}
if (o.cur) {
var cm = vrnC(o.cur, { shine: 3 });
[-1, 1].forEach(function (s) { for (var k = 0; k < 4; k++) {
var cy = wCyl(0.08, 0.11, h + 0.9, cm, s * (w / 2 + 0.12 + k * 0.13), 0.15, 0.24 + (k % 2) * 0.05, g, 6);
} });
wCyl(0.03, 0.03, w + 1.6, vrnBrass(), 0, h / 2 + 0.62, 0.3, g, 6).rotation.z = Math.PI / 2;
}
if (!VRN.lite && o.shaft !== false) {
var L = o.shaftL || 6, sh = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.95, L), e8ShaftMat());
sh.position.set(0, -L * 0.25, L * 0.43);
sh.rotation.x = -1.05;
g.add(sh);
}
return g;
},
function (grp, x, y, z, ceil, kind, col) {
var chain = vrnMetal(0x2A2622);
if (ceil > y + 0.4)
wCyl(0.02, 0.02, ceil - y - 0.3, chain, x, (ceil + y + 0.3) / 2, z, grp, 4);
if (kind === "paper") {
var c = col || 0xD8402A;
var ln = wSph(0.42, vrnC(c, { e: c, ei: 0.55 }), x, y, z, grp, 12);
ln.scale.y = 1.25;
wCyl(0.24, 0.24, 0.08, vrnC(0x141414), x, y + 0.5, z, grp, 10);
wCyl(0.24, 0.24, 0.08, vrnC(0x141414), x, y - 0.5, z, grp, 10);
wCyl(0.02, 0.02, 0.4, vrnC(0xE8C040), x, y - 0.75, z, grp, 4);
}
else if (kind === "chand") {
var br = vrnBrass();
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.04, 5, 24), br);
ring.rotation.x = Math.PI / 2;
ring.position.set(x, y, z);
grp.add(ring);
wSph(0.16, br, x, y + 0.1, z, grp, 8);
for (var a = 0; a < 8; a++) {
var an = a / 8 * 6.283;
wSph(0.11, vrnC(0xFFF0C8, { e: 0xFFE0A0, ei: 1 }), x + Math.cos(an) * 0.9, y + 0.16, z + Math.sin(an) * 0.9, grp, 6);
}
}
else {
var br2 = vrnBrass();
wCyl(0.12, 0.2, 0.16, br2, x, y + 0.18, z, grp, 10);
wSph(0.24, vrnC(0xFFF4D8, { e: 0xFFE2A8, ei: 0.95, op: 0.9 }), x, y - 0.05, z, grp, 12);
wCyl(0.32, 0.05, 0.06, br2, x, y - 0.3, z, grp, 12);
}
var gw = wGlow(kind === "paper" ? 0xFF9A5A : 0xFFDCA0, kind === "chand" ? 4 : 2.4, kind === "chand" ? 0.4 : 0.45);
gw.position.set(x, y, z);
grp.add(gw);
},
function (grp, I, x, y, z, len, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = e8Grain(0x6A4A2A);
vrnBoxM(len, 0.1, 0.1, wood, 0, 0, 0, g);
var cl = new THREE.Mesh(new THREE.PlaneGeometry(len - 0.1, 0.9), vrnC(0xF2ECDC, { ds: true }));
cl.position.y = -0.5;
g.add(cl);
wBox(len - 0.1, 0.06, 0.03, vrnC(0xC83A2A), 0, -0.96, 0, g);
[-1, 1].forEach(function (s) { wCyl(0.01, 0.01, 1.2, vrnC(0x8A7A5A), s * len * 0.4, 0.6, 0, g, 3); });
g.userData.ph = x * 0.37;
vlgLoose(g);
(I.sway = I.sway || []).push(g);
return g;
},
function (grp, x, z, len, ry, mat, back, open) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
vrnBoxM(len, 0.07, 0.42, mat, 0, 0.46, 0, g);
for (var l = -len / 2 + 0.3; l <= len / 2 - 0.2; l += Math.max(1, (len - 0.6) / Math.max(1, Math.round(len / 1.8)))) {
vrnBoxM(0.07, 0.44, 0.36, mat, l, 0.22, 0, g);
}
vrnBoxM(len - 0.6, 0.06, 0.06, mat, 0, 0.12, 0, g);
if (back) {
vrnBoxM(len, 0.36, 0.05, mat, 0, 0.86, -0.2, g);
for (var k = -len / 2 + 0.3; k <= len / 2 - 0.2; k += 1.8)
vrnBoxM(0.06, 0.46, 0.06, mat, k, 0.67, -0.2, g);
}
if (open)
return g;
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
vrnSolid({ x: x, z: z, hw: Math.abs(c) * len / 2 + Math.abs(s) * 0.25, hd: Math.abs(s) * len / 2 + Math.abs(c) * 0.25, h: 0.5 });
return g;
},
function (grp, x, z, kind, hh, pot) {
var g = new THREE.Group();
g.position.set(x, 0, z);
grp.add(g);
var pm = vrnC(pot || 0xA85A3A, { shine: 10 });
wCyl(0.34, 0.26, 0.6, pm, 0, 0.3, 0, g, 12);
wCyl(0.37, 0.37, 0.08, pm, 0, 0.6, 0, g, 12);
var t = new THREE.Group();
g.add(t);
try {
var parts = vrnTreeKinds()[kind];
var top = 1;
parts.forEach(function (p) { p.g.computeBoundingBox(); top = Math.max(top, p.g.boundingBox.max.y); t.add(new THREE.Mesh(p.g, p.m)); });
t.scale.setScalar((hh - 0.5) / top);
t.position.y = 0.5;
t.rotation.y = x * 1.7;
}
catch (e) { }
vrnSolid({ x: x, z: z, r: 0.45 });
return g;
},
function (grp, x, z, r, h, stn, gold) {
vrnBoxM(r * 3, 0.5, r * 3, stn, x, 0.25, z, grp);
vrnBoxM(r * 2.6, 0.3, r * 2.6, stn, x, 0.65, z, grp);
for (var k = 0; k < 3; k++)
wCyl(r * 1.18, r * 1.18, 0.22, gold || stn, x, 1.6 + k * (h - 3) / 2.6, z, grp, 12);
vrnBoxM(r * 2.8, 0.4, r * 2.8, stn, x, h - 1.1, z, grp);
vrnBoxM(r * 4, 0.3, r * 1.4, stn, x, h - 0.7, z, grp);
vrnBoxM(r * 1.4, 0.3, r * 4, stn, x, h - 0.7, z, grp);
vrnBoxM(r * 3.4, 0.4, r * 3.4, stn, x, h - 0.3, z, grp);
},
function (grp, x, z, hh, br) {
br = br || vrnBrass();
wCyl(0.3, 0.36, 0.1, br, x, 0.05, z, grp, 10);
wCyl(0.05, 0.07, hh, br, x, hh / 2, z, grp, 8);
for (var k = 0; k < 3; k++)
wCyl(0.32 - k * 0.08, 0.2 - k * 0.05, 0.08, br, x, hh * (0.45 + k * 0.25), z, grp, 10);
var f = wSph(0.07, vrnC(0xFFC060, { e: 0xFFA030, ei: 1 }), x, hh + 0.1, z, grp, 6);
f.scale.y = 1.8;
var gw = wGlow(0xFFA850, 1.5, 0.6);
gw.position.set(x, hh + 0.15, z);
grp.add(gw);
},
function (grp, I, X, Z, w, d, h, cols, r, stn, gold, night, door, lz) {
e8Band(grp, X, Z, w, d, h - 0.9, 1.2, 0, e8Frieze(night ? 0x8A7A64 : 0xE0D4BC), door, true);
e8Band(grp, X, Z, w, d, h - 0.2, 0.4, 0.3, stn, door);
e8Band(grp, X, Z, w, d, 0.3, 0.6, 0.25, stn, door);
cols.forEach(function (c) { e8Pillar(grp, X + c[0], Z + c[1], r, h, stn, gold); });
for (var c2 = 1; c2 < cols.length; c2++) {
var A = cols[c2 - 1], B = cols[c2];
if (A[1] === B[1])
e8Garland(grp, X + A[0], h - 1.6, Z + A[1], X + B[0], h - 1.6, Z + B[1], 0.9);
}
[-1, 1].forEach(function (s) {
for (var j = -1; j <= 1; j++) {
var jz = Z + j * (d / 3.2), jx = X + s * (w / 2 - 0.16), jl = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.8), e8Jali());
jl.position.set(jx, h - 3.4, jz);
jl.rotation.y = -s * Math.PI / 2;
grp.add(jl);
vrnBoxM(0.16, 0.3, 2.8, stn, jx, h - 1.85, jz, grp);
vrnBoxM(0.2, 0.3, 3.0, stn, jx, h - 4.95, jz, grp);
[-1, 1].forEach(function (q) { vrnBoxM(0.16, 3.4, 0.26, stn, jx, h - 3.4, jz + q * 1.2, grp); });
}
});
for (var k = 0; k < 4; k++)
e8LampStand(grp, X + (k < 2 ? -1 : 1) * (4 + (k % 2) * 5), Z + lz, 1.5 + (k % 2) * 0.4);
e8Incense(grp, X - 2, 0, Z + lz + 1);
e8Incense(grp, X + 2, 0, Z + lz + 1);
for (var b = 0; b < 5; b++) {
var bx = X - 6 + b * 3;
wCyl(0.01, 0.01, 1.2, vrnMetal(0x3A3226), bx, h - 0.9, Z + d / 2 - 3, grp, 3);
var bell = wCone(0.16, 0.3, vrnBrass(), bx, h - 1.6, Z + d / 2 - 3, grp, 10);
}
for (var m = 0; m < 6; m++)
vrnRug(grp, X - 7.5 + m * 3, Z + d / 2 - 6, 2.4, 1.2, [0xB8302A, 0x2A5A3A, 0xC89A2A][m % 3], 0.01);
},
function () {
var g = new THREE.Group(), sk = vrnSurf("stone", 0x7A746E, 2), dk = e8M(0x5A544E);
var bd = wSph(1.6, sk, 0, 2.6, 0, g, 14);
bd.scale.set(1, 0.95, 1.5);
var hd = wSph(0.9, sk, 0, 3.1, 2.2, g, 12);
hd.scale.set(1, 1.05, 0.95);
[-1, 1].forEach(function (s) { var ear = wSph(0.9, dk, s * 0.85, 3.1, 1.9, g, 10); ear.scale.set(0.15, 1, 0.8); var tk = wCyl(0.06, 0.1, 0.9, e8M(0xF4EEDC), s * 0.35, 2.4, 2.9, g, 6); tk.rotation.x = 1.2; });
var tr = new THREE.Group();
tr.position.set(0, 2.8, 2.9);
g.add(tr);
for (var i = 0; i < 6; i++) {
var seg = wCyl(0.24 - i * 0.03, 0.27 - i * 0.03, 0.5, sk, 0, -i * 0.42, Math.sin(i * 0.35) * 0.25, tr, 8);
seg.rotation.x = 0.15 * i;
}
g.userData.trunk = tr;
[[-0.8, 1], [0.8, 1], [-0.8, -1], [0.8, -1]].forEach(function (l) { wCyl(0.42, 0.45, 2, sk, l[0], 1, l[1], g, 10); });
var tl = wCyl(0.05, 0.03, 1.4, dk, 0, 2.2, -2.4, g, 5);
tl.rotation.x = -0.3;
var hw = new THREE.Group();
hw.position.set(0, 4.1, -0.2);
g.add(hw);
vrnBoxM(1.8, 0.5, 2.2, vrnSurf("wood", 0x8A5A2A, 1), 0, 0, 0, hw);
wBox(2.2, 0.04, 2.6, e8M(0xC83A2A), 0, -0.3, 0, hw);
[-0.8, 0.8].forEach(function (x) { [-1, 1].forEach(function (z) { wCyl(0.04, 0.04, 1.4, vrnBrass(), x, 0.9, z, hw, 5); }); });
wBox(2, 0.06, 2.4, e8M(0xE8C048), 0, 1.6, 0, hw);
var cl = wBox(2.6, 0.02, 3, e8M(0xA82A2A), 0, -0.26, 0, hw);
return g;
},
function (kind) {
var B = E8.boats[kind];
if (B && B.parent)
return B;
if (B) {
VRN.rwGroup.add(B);
return B;
}
var g = new THREE.Group();
g.userData.keep = 1;
if (kind === "steamer" || kind === "grant") {
var s = vrnSteamerModel({ len: kind === "grant" ? 64 : 56, beam: kind === "grant" ? 10 : 9 });
s.rotation.y = Math.PI / 2;
g.add(s);
}
else if (kind === "train") {
g.add(vrnTrainModel());
}
else if (kind === "elephant") {
var e = e8ElephantModel();
e.rotation.y = Math.PI;
g.add(e);
}
else if (kind === "tanka") {
var t = new THREE.Group();
e8TankaModel(t);
t.rotation.y = Math.PI;
g.add(t);
}
else if (kind === "sledge") {
var sl = new THREE.Group();
e8SledgeModel(sl);
sl.rotation.y = Math.PI;
g.add(sl);
}
else if (kind === "henri") {
var h = new THREE.Group();
e8HenriModel(h);
h.rotation.y = Math.PI;
g.add(h);
}
(VRN.rwGroup || VRN.G).add(g);
E8.boats[kind] = g;
return g;
},
function (u0, u1, y, says, off) {
var pts = [], n = Math.max(2, Math.ceil((u1 - u0) / 0.006));
for (var i = 0; i <= n; i++) {
var u = u0 + (u1 - u0) * i / n, p = vrnRwPt(u, off || 0);
pts.push({ x: p.x, z: p.z, y: y, u: u });
}
(says || []).forEach(function (sy) { var best = null; pts.forEach(function (p) { if (!best || Math.abs(p.u - sy[0]) < Math.abs(best.u - sy[0]))
best = p; }); if (best)
best.say = sy[1]; });
return pts;
},
function (S) {
vbkTune("e8nacht");
var b = "<h3 style='margin:4px 0'>Five minutes late</h3><p style='font-style:italic'>" + vbkEsc(Q8("Having made the tour of the world, he was behind-hand five minutes. He had lost the wager!")) + "</p>" +
"<p>Your keepsakes from the road: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + vbkEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></p><p>The rest of the book is walked in London: the house in Saville Row, the long Sunday, and the Reform Club at a quarter to nine.</p>";
var fns = { home: function () { worldCard(null); e8ToLondon(3); } };
b += worldBtn("home", "▶ Home to No. 7, Saville Row", "Chapter XXXV, in London");
worldCard(b, fns);
},
function (k) {
try {
var P = typeof pmbS === "function" ? pmbS() : null;
if (P && P.ch < k && !P.done) {
P.ch = k;
P.s = 0;
P.f = {};
}
if (P)
P.started = 1;
if (typeof pmbSave === "function")
pmbSave();
}
catch (e) { }
e8Restore();
if (typeof shkGo === "function")
shkGo({ pmb: 1 });
else if (typeof SHK_KEY !== "undefined")
worldGo(SHK_KEY, { pmb: 1 });
},
function (n) {
if (typeof vlgSailEnd === "function" && typeof VLG !== "undefined" && VLG.sail)
vlgSailEnd(true);
e8BoatsAway();
E8.carSp = 14;
var C = VBK_CH[n];
if (E8.bridge)
E8.bridge.visible = !(C && ["XXIX", "XXX", "XXXI", "XXXII", "XXXIII", "XXXIV"].indexOf(C.n) >= 0);
var T = VRN_IN.e8_tanka;
if (T && T.storm)
T.storm.visible = false;
if (T && T.night) {
T.night.visible = false;
if (T.night.userData.stars)
T.night.userData.stars.visible = false;
}
},
function (dt) {
if (!VRN.built)
return;
E8.t += dt;
if (E8.t > 0.5) {
E8.t = 0;
e8PortsTick(worldLocal());
}
if (VRN.insideOf && typeof e8RoomTick === "function")
e8RoomTick(dt);
var I = VRN_IN.e8_car;
if (I && I.built && I.scroll && VRN.insideOf === I) {
var sp = (E8.carSp == null ? 14 : E8.carSp) * dt;
I.scroll.forEach(function (o) { o.position.x += sp; if (o.position.x > I.x + 126)
o.position.x -= 252; });
}
}
];
});
