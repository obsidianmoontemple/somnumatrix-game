/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EUP = { on: !(typeof window !== "undefined" && window.EUP_OFF), geos: {}, made: 0 };
function eupG(k, make) { return EUP.geos[k] || (EUP.geos[k] = make()); }
function eupMerge(list) { return gwMerge(list.map(function (g) { return g.index ? g.toNonIndexed() : g; })); }
function eupTuftTex(k) { return __ZC(474, 0, this, arguments, new.target); }
function eupSmokeTex() { return __ZC(474, 1, this, arguments, new.target); }
function eupTuftGeo() { return eupG("tuft", function () { var a = new THREE.PlaneGeometry(1, 0.8); a.translate(0, 0.4, 0); var b = a.clone(); b.rotateY(Math.PI / 3); var c = a.clone(); c.rotateY(-Math.PI / 3); return eupMerge([a, b, c]); }); }
function eupBonesGeo() { return __ZC(474, 2, this, arguments, new.target); }
function eupHermGeo() { return __ZC(474, 3, this, arguments, new.target); }
function eupBrazierGeo() { return __ZC(474, 4, this, arguments, new.target); }
function eupFlameGeo() { return eupG("flame", function () { var a = new THREE.PlaneGeometry(0.9, 1.4); a.translate(0, 0.7, 0); var b = a.clone(); b.rotateY(Math.PI / 2); var c = new THREE.CircleGeometry(0.46, 12); c.rotateX(-Math.PI / 2); c.translate(0, 0.02, 0); return eupMerge([a, b, c]); }); }
function eupFlameMat() { return ebsM("eupFlame", function () { var m = new THREE.MeshBasicMaterial({ map: ebsFireTex(), color: 0xFFB060, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); }
function eupChainGeo(n) { return eupG("chain" + n, function () { var L = []; for (var i = 0; i < n; i++) {
var t = new THREE.TorusGeometry(0.32, 0.09, 4, 7);
t.scale(1, 1.6, 1);
if (i % 2)
t.rotateY(Math.PI / 2);
t.translate(0, -i * 0.82, 0);
L.push(t);
} return eupMerge(L); }); }
function eupCageGeo() { return __ZC(474, 5, this, arguments, new.target); }
function eupGibbetGeo() {
return eupG("gibbet", function () {
var p = new THREE.BoxGeometry(0.35, 9, 0.35);
p.translate(0, 4.5, 0);
var a = new THREE.BoxGeometry(3.2, 0.3, 0.3);
a.translate(1.45, 8.8, 0);
var br = new THREE.BoxGeometry(0.2, 2.2, 0.2);
br.rotateZ(-Math.PI / 4);
br.translate(0.75, 7.9, 0);
return eupMerge([p, a, br]);
});
}
function eupRuinGeo(seed) { return __ZC(474, 6, this, arguments, new.target); }
function eupNearRoadSpot(R, d0, d1) { return __ZC(474, 7, this, arguments, new.target); }
function eupTarSpot(R, mg) { for (var t = 0; t < 4; t++) {
var lx = (R() - 0.5) * 3500, z = (R() - 0.5) * 3500, x = EBS_TAR_X + lx;
if (Math.hypot(lx, z) > 1700)
continue;
if (!ebsFreeAt(x, z, mg || 3))
continue;
return { x: x, z: z };
} return null; }
function eupInAsph(x, z) { var A = EBS_AT.asph; return Math.hypot(x - A.x, z - A.z) < A.r || Math.hypot(x + 1200, z + 200) < 700; }
function eupDress(G) { return __ZC(474, 8, this, arguments, new.target); }
function eupPit(G) { return __ZC(474, 9, this, arguments, new.target); }
function eupTartarus(G) { return __ZC(474, 10, this, arguments, new.target); }
var EUP_FISS = [
{ w: 12, pts: [[-1680, -420], [-1500, -330], [-1380, -480], [-1420, -720], [-1560, -900]] },
{ w: 10, pts: [[1680, 900], [1420, 980], [1230, 1180], [1060, 1380]] },
{ w: 11, pts: [[1690, -120], [1480, -300], [1560, -520], [1450, -980], [1180, -1250]] },
{ w: 9, pts: [[-620, -1620], [-420, -1470], [-260, -1580], [-160, -1700]] },
{ w: 12, pts: [[-1640, 1060], [-1380, 1260], [-1060, 1420], [-780, 1620]] },
{ w: 9, pts: [[380, 1180], [560, 1040], [880, 1060], [1080, 880]] },
{ w: 10, pts: [[-560, -560], [-760, -700], [-900, -820], [-1120, -860]] }
];
function eupFissD(lx, z) { var b = 1e9, w = 10; for (var i = 0; i < EUP_FISS.length; i++) {
var d = ebsPathD(lx, z, EUP_FISS[i].pts) - EUP_FISS[i].w / 2;
if (d < b) {
b = d;
w = EUP_FISS[i].w;
}
} return b; }
(function () {
if (!EUP.on || typeof ebsLandTar !== "function")
return;
var l0 = ebsLandTar, w0 = ebsWaterTar;
ebsLandTar = function (x, z) { var h = l0(x, z), d = eupFissD(x - EBS_TAR_X, z); if (d < 14) {
var k = d <= 0 ? 1 : 1 - d / 14;
k = k * k * (3 - 2 * k);
h = h * (1 - k) + (-3.6) * k;
} return h; };
ebsWaterTar = function (x, z) { var r = w0(x, z); if (r)
return r; if (eupFissD(x - EBS_TAR_X, z) < -1)
return { lvl: -2.5, k: "fire" }; return null; };
})();
(function () {
if (typeof ebsDress !== "function")
return;
var d0 = ebsDress;
ebsDress = function (G) { var r = d0.apply(this, arguments); if (EUP.on) {
try {
eupDress(G);
}
catch (e) {
if (window.console)
console.warn("[erebos-up]", e);
}
} return r; };
})();
var EUP_GROUND = { main: { rock: "b:cave", amt: 0.8, tint: [0.9, 0.88, 0.92] }, tartarus: { rock: "b:strata", amt: 0.9, tint: [0.55, 0.42, 0.4] }, taenarum: { rock: "b:strata", amt: 0.5, tint: [1, 1, 1] }, elysium: { rock: "b:moss", amt: 0.35, tint: [0.9, 1, 0.85] }, path: { rock: "b:strata", amt: 0.5, tint: [0.8, 0.8, 0.8] } };
function eupGroundUp(m, kind) { return __ZC(474, 11, this, arguments, new.target); }
(function () {
if (!EUP.on || typeof ebsGroundMat !== "function")
return;
var g0 = ebsGroundMat;
ebsGroundMat = function (kind) { var m = g0(kind); try {
eupGroundUp(m, kind);
}
catch (e) {
if (window.console)
console.warn("[erebos-up] ground", e);
} return m; };
})();
var EUP_NEAR = { cell: 24, rad: 5, on: false, slots: null, ms: null, cx: null, cz: null, reg: null };
function eupMeshH(x, z) { return __ZC(474, 12, this, arguments, new.target); }
function eupHash(a, b) { var h = (a * 73856093) ^ (b * 19349663); return (h >>> 0) % 2147483647 || 7; }
function eupNearKinds() { return __ZC(474, 13, this, arguments, new.target); }
function eupNearBuild(G) { return __ZC(474, 14, this, arguments, new.target); }
function eupNearCell(cx, cz, slot) { return __ZC(474, 15, this, arguments, new.target); }
function eupNearTick() { return __ZC(474, 16, this, arguments, new.target); }
(function () {
if (!EUP.on || typeof ebsTick !== "function")
return;
var t0 = ebsTick;
ebsTick = function (dt) { var r = t0.apply(this, arguments); try {
eupNearTick();
if (EUP_SEATED.length)
eupSeatTick();
}
catch (e) {
if (!EUP.nearErr) {
EUP.nearErr = 1;
if (window.console)
console.warn("[erebos-up] near", e);
}
} return r; };
})();
var EUP_RIV = {
acheron: { old: 0x3A4A44, col: 0x4E6E3A, glow: 0.22 },
cocytus: { old: 0x0C1418, col: 0x5E92B4, glow: 0.26 },
styx: { old: 0x0A1426, col: 0x4A2A7A, glow: 0.32 },
lethe: { old: 0xBCCCD4, col: 0xE8F0F2, glow: 0.34 }
};
(function () {
if (!EUP.on || typeof ebsWaterMat !== "function")
return;
var map = {};
for (var k in EUP_RIV)
map[EUP_RIV[k].old] = EUP_RIV[k];
var w0 = ebsWaterMat;
ebsWaterMat = function (col, fire, op) {
var R = !fire && map[col];
if (!R)
return w0.apply(this, arguments);
return ebsM("eupRiver" + R.col + "|" + (op || ""), function () {
var m = w0(R.col, false, op), c = m.clone();
c.map = m.map;
c.userData.flow = m.userData.flow;
c.userData.noPhoto = 1;
c.emissive = new THREE.Color(R.col).multiplyScalar(R.glow);
c.shininess = 110;
return c;
});
};
})();
function eupBanks(G) { return __ZC(474, 17, this, arguments, new.target); }
function eupBannerTex() { return __ZC(474, 18, this, arguments, new.target); }
function eupBannerMat() { return ebsM("eupBannerM", function () { var m = new THREE.MeshLambertMaterial({ map: eupBannerTex(), side: THREE.DoubleSide, color: 0xFFFFFF, emissive: 0x0C0614 }); m.userData.noPhoto = 1; return m; }); }
function eupBanner(g, x, y, z, w, h, ry) { var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), eupBannerMat()); p.position.set(x, y, z); p.rotation.y = ry || 0; p.raycast = function () { }; g.add(p); return p; }
function eupAmethystMat() { return ebsM("eupAmethyst", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8A4AD8, emissive: 0x2A0A4A, shininess: 140, specular: 0xE8D0FF, flatShading: true }); m.userData.noPhoto = 1; return m; }); }
function eupBident(g, x, y, z, s, mat, ry) { return __ZC(474, 19, this, arguments, new.target); }
function eupPalaceOut(G) { return __ZC(474, 20, this, arguments, new.target); }
(function () {
if (!EUP.on || typeof ebsPalace !== "function")
return;
var p0 = ebsPalace;
ebsPalace = function (G) { var r = p0.apply(this, arguments); try {
eupPalaceOut(G);
}
catch (e) {
if (window.console)
console.warn("[erebos-up] palace", e);
} return r; };
})();
var EUP_HALL_RIV = [
{ k: "styx", n: "The Styx", sub: "river of hate, by which the gods swear", col: 0x0A1426, pts: [[-22, -21.6], [-10.5, -12.4], [-0.8, -5.95]], ry: 0 },
{ k: "lethe", n: "The Lethe", sub: "river of forgetting", col: 0xBCCCD4, pts: [[22, -21.6], [10.5, -12.4], [0.8, -5.95]], ry: 0 },
{ k: "cocytus", n: "The Cocytus", sub: "river of wailing", col: 0x0C1418, pts: [[-29.6, 6], [-5.9, 1.25]], ry: Math.PI / 2 },
{ k: "phleg", n: "The Phlegethon", sub: "river of fire", col: 0xFF6A1A, fire: true, pts: [[29.6, 6], [5.9, 1.25]], ry: -Math.PI / 2 },
{ k: "acheron", n: "The Acheron", sub: "river of woe", col: 0x3A4A44, pts: [[12, 21.6], [2.05, 5.65]], ry: Math.PI }
];
var EUP_HALL_FACTS = {
styx: ["The Styx winds nine times round the underworld (Hesiod, Theogony 790-792). When the gods swear an oath, Iris brings a jug of its water, and a god who swears falsely by it lies breathless for a year and is shut out of the gods' councils for nine more (Theogony 775-806).", "Here its violet water runs down past the thrones to meet the others."],
lethe: ["Lethe, forgetting. Plato's Myth of Er: souls about to be born again cross the burning Plain of Forgetfulness and drink from the River of Unmindfulness, and forget everything (Republic 621a). Virgil puts the Lethe in Elysium, where the souls drink 'the waters that free from care' (Aeneid 6.713-715).", "Do not drink. Poppies, the flower of sleep, grow along it outside."],
cocytus: ["Cocytus, the river of wailing. Homer: 'Pyriphlegethon and Cocytus, which is a branch of the water of Styx, flow into Acheron, at a rock where the two roaring rivers meet' (Odyssey 10.513-515).", "It runs cold; ice floats on it outside."],
phleg: ["Pyriphlegethon, the river of fire. Plato says it pours into a great place burning with fire and makes a lake boiling with water and mud, then circles round under the earth (Phaedo 113a-b). Outside it rings the walls of Tartarus.", "Here it is led in through the east wall, still burning."],
acheron: ["Acheron, the river of woe, which Charon crosses with the dead in his boat for an obol. Plato: it flows through desert places and under the earth into the Acherusian Lake, where the souls of most of the dead come (Phaedo 112e-113a).", "Its murky green water comes in through the south wall."]
};
function eupSwirlTex() { return __ZC(474, 21, this, arguments, new.target); }
function eupFloorTex() { return __ZC(474, 22, this, arguments, new.target); }
function eupHall(grp, I) { return __ZC(474, 23, this, arguments, new.target); }
(function () {
if (!EUP.on || typeof EBS_IN === "undefined" || !EBS_IN.palace)
return;
var D = EBS_IN.palace, b0 = D.build;
D.build = function (grp, I) { var r = b0.apply(this, arguments); try {
eupHall(grp, I);
}
catch (e) {
if (window.console)
console.warn("[erebos-up] hall", e);
} return r; };
D.say = "👑 <b>The Palace of Hades.</b> The great hall: four black columns round a hearth of blue-white fire, the throne of the Unseen King. The five rivers of the underworld come in through the walls and meet in a ring round the hearth. Doors lead off to the banquet hall (west), the treasury (east), the Hall of Orpheus (north), and beyond the banquet hall, the Chairs of Forgetfulness.";
})();
var EUP_GOD = { hades: 3.4, persephone: 3.1, hip: 0.39 };
function eupPersephoneBelow(d) {
d = d || new Date();
var m = d.getMonth(), day = d.getDate();
if (m > 8 || m < 2)
return true;
if (m === 8)
return day >= 22;
if (m === 2)
return day < 20;
return false;
}
var EUP_PERSEPHONE_LOOK = { sex: "f", hair: 0x4A2A1A, hairStyle: "long", skin: 0xE8C8B0, topKind: "robe", top: 0xC4B4CC, bottom: 0xC4B4CC, layer: "longcoat", layerColor: 0x4A1A3A, hat: "tiara", hatColor: 0xD8B04A };
var EUP_PERSEPHONE_PERSONA = "Persephone (Kore, 'the maiden'), daughter of Demeter and Zeus, queen of the underworld, seated on her throne beside Hades in the great hall. Hades carried her off while she picked a narcissus in a meadow; her mother searched the earth with torches and let nothing grow until Zeus made Hades let her go. But she had eaten pomegranate seeds, so she spends part of each year below (Homeric Hymn to Demeter): from the autumn equinox to the spring equinox, while the earth above is bare. She is not a victim here: she is a respected, compassionate and powerful queen; she let Eurydice go, helped Heracles, gave Psyche a box of beauty. Gracious, warm with a touch of iron; misses sunlight and her mother; speaks of spring coming when she goes up.";
var EUP_SEATED = [];
function eupSeatTick() { for (var i = 0; i < EUP_SEATED.length; i++) {
var S = EUP_SEATED[i], hd = !!(typeof togHD === "function" && togHD(S.P.g));
if (hd !== S.hd) {
S.hd = hd;
eupSeatNow(S);
}
} }
function eupSeatNow(S) { return __ZC(474, 24, this, arguments, new.target); }
function eupSeat(P, x, z, floorY, seatH, s, face) {
P.g.scale.setScalar(s);
EUP_SEATED = EUP_SEATED.filter(function (S) { return S.P.g.parent; });
var S = { P: P, x: x, z: z, f: floorY, h: seatH, s: s, face: face, hd: !!(typeof togHD === "function" && togHD(P.g)) };
EUP_SEATED.push(S);
eupSeatNow(S);
}
function eupTalkOf(name) { for (var i = 0; i < EBS.talk.length; i++)
if (EBS.talk[i].name === name)
return EBS.talk[i]; return null; }
function eupDropSpot(name, x0, x1) { EBS.spots = EBS.spots.filter(function (S) { return !(S.name === name && S.x > x0 && S.x < x1); }); }
function eupArchGeo(hw, y0, y1, ah, d) {
return eupG("arch" + [hw, y0, y1, ah, d].join(","), function () {
var sh = new THREE.Shape();
sh.moveTo(-hw, y0);
sh.lineTo(-hw, y1);
sh.absellipse(0, y1, hw, ah, Math.PI, 0, true);
sh.lineTo(hw, y0);
sh.lineTo(-hw, y0);
return new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false, curveSegments: 14 });
});
}
function eupLegGeo() {
return eupG("throneLeg", function () {
var P = [[0.001, 0], [0.05, 0], [0.055, 0.02], [0.034, 0.05], [0.028, 0.11], [0.044, 0.15], [0.028, 0.19], [0.032, 0.25], [0.048, 0.27], [0.048, 0.28], [0.001, 0.28]];
return new THREE.LatheGeometry(P.map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 12);
});
}
function eupKeyMat(metal) { return __ZC(474, 25, this, arguments, new.target); }
function eupKeyBand(g, w, h, x, y, z, metal, ry) { var t = eupKeyMat(metal); var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), t); m.position.set(x, y, z); m.rotation.y = ry || 0; g.add(m); return m; }
function eupAnthemion(g, x, y, z, s, mat) { return __ZC(474, 26, this, arguments, new.target); }
function eupRosette(g, x, y, z, r, mat) { var c = wSph(r, mat, x, y, z, g, 10); c.scale.z = 0.35; for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, p = wSph(r * 0.45, mat, x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25, z, g, 6);
p.scale.z = 0.3;
} }
function eupGodThrone(grp, x, y, z, s, queen) { return __ZC(474, 27, this, arguments, new.target); }
function eupThrones(grp, I) { return __ZC(474, 28, this, arguments, new.target); }
function eupPersephoneRooms(grp, I) { return __ZC(474, 29, this, arguments, new.target); }
(function () {
if (!EUP.on || typeof EBS_IN === "undefined")
return;
var D = EBS_IN.palace;
if (D) {
var b0 = D.build;
D.build = function (grp, I) { var r = b0.apply(this, arguments); try {
eupThrones(grp, I);
}
catch (e) {
if (window.console)
console.warn("[erebos-up] thrones", e);
} return r; };
}
var Q = EBS_IN.persephone;
if (Q) {
var q0 = Q.build, say0 = Q.say;
Q.build = function (grp, I) { I.say = say0; var r = q0.apply(this, arguments); try {
eupPersephoneRooms(grp, I);
}
catch (e) {
if (window.console)
console.warn("[erebos-up] rooms", e);
} return r; };
}
})();
function eupMeadowTex() { return __ZC(474, 30, this, arguments, new.target); }
function eupSkyCeilTex() { return __ZC(474, 31, this, arguments, new.target); }
function eupMosaicTex() { return __ZC(474, 32, this, arguments, new.target); }
function eupLampStand(grp, x, z, col) { return __ZC(474, 33, this, arguments, new.target); }
function eupPot(grp, x, z, s) { var pts = []; for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2((0.25 + Math.sin(t * Math.PI) * 0.3 + t * 0.1) * s, t * 0.9 * s));
} var m = new THREE.Mesh(new THREE.LatheGeometry(pts, 14), ebsStone("terracotta")); m.position.set(x, 0, z); grp.add(m); return m; }
function eupFlowerPot(grp, x, z, cols, seed) { return __ZC(474, 34, this, arguments, new.target); }
function eupCurtain(grp, x, y, z, w, h, ry, col) { return __ZC(474, 35, this, arguments, new.target); }
function eupPersephoneDress(grp, I) { return __ZC(474, 36, this, arguments, new.target); }
(function () {
if (!EUP.on || typeof EBS_IN === "undefined" || !EBS_IN.persephone)
return;
var Q = EBS_IN.persephone, q0 = Q.build;
Q.build = function (grp, I) { var r = q0.apply(this, arguments); try {
eupPersephoneDress(grp, I);
}
catch (e) {
if (window.console)
console.warn("[erebos-up] queen's rooms", e);
} return r; };
})();
