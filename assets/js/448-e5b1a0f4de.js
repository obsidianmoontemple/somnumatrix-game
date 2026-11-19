/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var HVN = { key: "heavens", base: -7400000, G: null, built: false, lite: false, t: 0, ct: 0, realms: [], byTrad: {}, cur: {}, solids: [], spots: [], near: null,
figs: {}, palaces: [], court: null, RR: 0, bound: 0, warned: false, builds: 0, drops: 0 };
var HVN_NAME = "The Heavens";
var HVN_REALMS = [
{ k: "olympos", trads: ["Greek"], name: "Olympos", sub: "the Greek gods, on the cloud-wrapped summit above the world", ground: "marble", arch: "grandtemple", fit: 30, set: "olympos",
col: 0xF4F0E6, note: "Homer's Olympos: the bronze-floored halls Hephaistos built for each god on the peak, above the clouds, where it is never shaken by wind nor wet with rain (Odyssey 6)." },
{ k: "capitolium", trads: ["Roman"], name: "The Heavenly Capitol", sub: "the gods of Rome, on their marble hill", ground: "marble", arch: "temple", fit: 26, set: "rome",
col: 0xEDE4D0, note: "The Romans kept their great gods on the Capitol and their Pantheon to all of them; here their temples stand round a forum of white marble under the laurels." },
{ k: "asgard", trads: ["Norse", "Anglo-Saxon"], name: "Asgard", sub: "the Æsir and Vanir, over Bifröst, under the World Tree", ground: "snow", arch: "longhouse", fit: 28, set: "asgard",
col: 0xE8EEF2, note: "The Prose Edda: Asgard, reached over Bifröst, the burning rainbow bridge; each god has a hall of their own (Valhalla, Bilskirnir, Breiðablik, Fensalir), and the ash Yggdrasil stands over all." },
{ k: "aaru", trads: ["Egyptian"], name: "The Field of Reeds", sub: "Aaru, the gods of the Two Lands, by the heavenly Nile", ground: "sand", arch: "temple", fit: 26, set: "aaru",
col: 0xE8D4A8, note: "In the Book of the Dead the blessed dead go to Aaru, the Field of Reeds, a perfect Egypt of canals and fields; the gods' houses have pylon gates, obelisks and avenues of sphinxes." },
{ k: "dilmun", trads: ["Mesopotamian"], name: "Dilmun, the Pure Land", sub: "the gods of Sumer, Akkad and Babylon, by the sweet waters", ground: "sand", arch: "ziggurat", fit: 24, set: "dilmun",
col: 0xE2CCA0, note: "In the Sumerian poem of Enki and Ninhursag, Dilmun is the pure, clean and bright land where the raven does not cry, the lion does not kill, and no one grows old; the sun god Utu brought it sweet water from the earth. The gods' houses stand on stepped platforms of mud brick among date palms, reeds and springs. (Babylon itself, the city of men, stands among the Wonders of the World.)" },
{ k: "garodman", trads: ["Persian"], name: "The House of Song", sub: "Garōdmān, the powers of the Persian light", ground: "marble", arch: "temple", fit: 24, set: "persia",
col: 0xE8DCC0, note: "Zoroastrian Garōdmān, the House of Song, is the highest heaven of light; the Persian garden (paradeisos, the root of 'paradise') is four streams round a pool, with cypresses and fire." },
{ k: "meru", trads: ["Hindu"], name: "Svarga, on Mount Meru", sub: "the devas, round the golden mountain at the centre of the world", ground: "lotus", arch: "mandir", fit: 24, set: "meru",
col: 0xF2D8A0, note: "In the Puranas, Indra's Svarga stands on golden Mount Meru with the cities of the other gods round it; lotus pools, the wish-granting tree, and temple towers carved with a thousand figures." },
{ k: "jade", trads: ["Chinese"], name: "The Jade Court", sub: "the celestial bureaucracy and the immortals", ground: "jade", arch: "pagoda", fit: 20, set: "jade",
col: 0xD8E4D0, note: "The Jade Emperor rules heaven as a court with its ministries; the immortals keep the Peach Garden and the Kunlun mountains, where cranes fly and the gates are lacquer red." },
{ k: "takamagahara", trads: ["Japanese"], name: "Takamagahara", sub: "the kami, on the High Plain of Heaven", ground: "sakura", arch: "shintoshrine", fit: 22, set: "takama",
col: 0xE8D8D4, note: "The Kojiki's Takamagahara, the High Plain of Heaven, where Amaterasu rules; reached by the Floating Bridge of Heaven, with rice fields, a heavenly river and shrines behind their torii." },
{ k: "tirnanog", trads: ["Irish"], name: "Tír na nÓg", sub: "the Tuatha Dé Danann, in the Land of the Young", ground: "meadow", arch: "roundhouse", fit: 17, set: "celtic",
col: 0xC8E0B0, note: "The Irish otherworld over the western sea: Tír na nÓg, Mag Mell, where no one grows old, with apple trees always in fruit and the sídhe under the green hills." },
{ k: "annwn", trads: ["Welsh"], name: "Annwn", sub: "the old powers of the Welsh tales", ground: "meadow", arch: "roundhouse", fit: 17, set: "annwn",
col: 0xB8D4A8, note: "Annwn, the Welsh otherworld of the Mabinogi, a land of plenty with the cauldron that never fails, ruled by Arawn and reached by lake and by mist." },
{ k: "nemeton", trads: ["Gaulish"], name: "The Sacred Grove", sub: "the gods of Gaul, in the oak nemeton", ground: "meadow", arch: "roundhouse", fit: 17, set: "grove",
col: 0xB0CC98, note: "The Gauls worshipped in the nemeton, a sacred grove of oaks (Lucan and Pliny wrote of it), with carved posts and the mistletoe the druids cut with a golden sickle." },
{ k: "iriy", trads: ["Slavic"], name: "Iriy", sub: "the old gods of the forest and the hearth", ground: "meadow", arch: "izba", fit: 16, set: "iriy",
col: 0xD4E0C0, note: "Iriy (Vyraj), the Slavic otherworld where the birds fly for winter, at the top of the world oak; Perun's oak on the hill, the birches, and carved wooden halls." },
{ k: "orun", trads: ["Yoruba"], name: "Ọ̀run", sub: "the orisha, in the compound of heaven", ground: "redearth", arch: "roundhouse", fit: 17, set: "orun",
col: 0xD89A68, note: "For the Yoruba, Ọ̀run is the realm of Olódùmarè and the orisha; Osun's sacred grove at Osogbo with its river, carved posts and shrines under the palms is its likeness on earth." },
{ k: "nyame", trads: ["Akan"], name: "The Sky of Nyame", sub: "Nyame, and the stories the spider bought", ground: "redearth", arch: "roundhouse", fit: 17, set: "akan",
col: 0xD8A060, note: "Nyame, the Akan sky god, kept all the stories until Kwaku Ananse bought them; Asante shrines were whitewashed and carved, and the Golden Stool came down from the sky." },
{ k: "ginen", trads: ["Vodou"], name: "Ginen", sub: "the lwa, beneath the waters and at the crossroads", ground: "redearth", arch: "shrine", fit: 12, set: "ginen",
col: 0xC88A6A, note: "In Vodou the lwa dwell in Ginen, 'under the water', and come through the poto mitan, the centre post of the peristyle; vèvè are drawn on the ground to call them." },
{ k: "omeyocan", trads: ["Aztec"], name: "Omeyocan", sub: "the gods of the Fifth Sun, on their pyramid temples", ground: "jungle", arch: "ziggurat", fit: 24, set: "aztec",
col: 0xB8C890, note: "Omeyocan, the thirteenth heaven of the Mexica, and Tlalocan, Tlaloc's paradise of rain; their temples stood on stepped pyramids above canals and chinampa gardens of marigolds." },
{ k: "thirteen", trads: ["Maya"], name: "The Thirteen Heavens", sub: "the Maya gods, above the ceiba", ground: "jungle", arch: "ziggurat", fit: 22, set: "maya",
col: 0xA8C088, note: "The Maya world tree, the great ceiba, holds up thirteen layers of heaven; the Popol Vuh's hero twins rose to be the sun and the moon. Temples crown stepped pyramids in the forest." },
{ k: "hananpacha", trads: ["Inca"], name: "Hanan Pacha", sub: "Inti and the gods of the upper world", ground: "terrace", arch: "ziggurat", fit: 22, set: "inca",
col: 0xC8BC98, note: "Hanan Pacha, the Inca upper world of Inti the sun and Mama Killa the moon; built in fitted stone on mountain terraces, with the golden sun disc of the Coricancha." },
{ k: "hawaiki", trads: ["Hawaiian", "Polynesian"], name: "Hawaiki", sub: "the gods of the islands and the long voyages", ground: "beach", arch: "stilthouse", fit: 17, set: "islands",
col: 0xF0E2B8, note: "Hawaiki, the homeland the voyagers came from and the souls go back to; Pele's fire in Kīlauea, carved tiki at the heiau, and the open sea all round." },
{ k: "araboth", trads: ["Hebrew"], name: "The Seventh Heaven", sub: "the hosts about the throne", ground: "cloud", arch: "grandtemple", fit: 28, set: "araboth",
col: 0xF8F4EA, note: "Araboth, the seventh heaven of the later Jewish writings, where the hosts stand about the throne; light upon light, and gates of pearl." },
{ k: "shadow", trads: ["Demonology", "Qliphothic", "Adversarial"], name: "The Shadowed Reach", sub: "those who were named elsewhere first, at the dark edge below the clouds", ground: "obsidian", arch: "darkfane", fit: 20, set: "shadow",
col: 0x3A3440, note: "Named here because they were named elsewhere first: the grimoires' spirits, the shells of the tree, and those who refused, in every telling. They keep their halls on the dark rim where the clouds run out." }
];
var HVN_SKY = { top: 0x7FB4F0, low: 0xFFF0D8, fog: 0xF4EEE4, fogD: 0.0009, sun: 0.95, sunCol: 0xFFF4DA, hemi: 1.1, hemiCol: 0xF0F4FF, hemiGround: 0xD8D0C0 };
var HVN_LIGHT = { shadow: { top: 0x140E1E, low: 0x3A2E48, fog: 0x2A2236, fogD: 0.004, sun: 0.45, sunCol: 0xC8A8E0, hemi: 0.8, hemiCol: 0x8878A8, hemiGround: 0x1A141E },
asgard: { top: 0x7AA8E0, low: 0xE8F0F8, fog: 0xE8EEF4, fogD: 0.0012, sun: 0.9, sunCol: 0xF4F8FF, hemi: 1.05, hemiCol: 0xE8F0FF, hemiGround: 0xC8D0D8 },
aaru: { top: 0x6AA8E8, low: 0xF8E4C0, fog: 0xF4E8D0, fogD: 0.001, sun: 1.05, sunCol: 0xFFF0D0, hemi: 1.0, hemiCol: 0xFFF4E0, hemiGround: 0xC8B080 },
hawaiki: { top: 0x5AA0E8, low: 0xD8F0F8, fog: 0xE0F0F4, fogD: 0.0009, sun: 1.0, sunCol: 0xFFF6E0, hemi: 1.05, hemiCol: 0xF0FAFF, hemiGround: 0xD8C8A0 } };
function hvnLite() { return typeof LITE !== "undefined" && !!LITE; }
function hvnDeities(R) { return __ZC(448, 0, this, arguments, new.target); }
var HVN_GLOBE = { olympos: [22, 40], capitolium: [12, 42], asgard: [12, 62], aaru: [31, 26], dilmun: [44, 32.5], garodman: [53, 32], meru: [80, 23], jade: [110, 33],
takamagahara: [138, 36], tirnanog: [-9, 53], annwn: [-4, 52], nemeton: [2, 47], iriy: [35, 55], orun: [4, 8], nyame: [-1, 7], ginen: [-72, 19], omeyocan: [-99, 19],
thirteen: [-89, 17], hananpacha: [-72, -13], hawaiki: [-155, 20], araboth: [35, 31.5], shadow: [28, -34] };
function hvnGlobeXZ(lon, lat) { var d = lon - 15, a = Math.abs(d), x = a <= 60 ? a * 20 : 1200 + (a - 60) * 8; return { x: (d < 0 ? -x : x), z: -(lat - 25) * 20 }; }
function hvnWrapA(a) { while (a > Math.PI)
a -= Math.PI * 2; while (a < -Math.PI)
a += Math.PI * 2; return a; }
function hvnLayout() { return __ZC(448, 1, this, arguments, new.target); }
var HVN_MAT = {}, HVN_TEX = {}, HVN_GEO = {};
function hvnTex(k, fn, rep) {
if (HVN_TEX[k])
return HVN_TEX[k];
var t = wTex(256, 256, fn);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (rep)
t.repeat.set(rep, rep);
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (HVN_TEX[k] = t);
}
function hvnSpeck(x, W, H, n, cols, r0, r1, seed) { var R = wRand(seed); for (var i = 0; i < n; i++) {
x.fillStyle = cols[Math.floor(R() * cols.length)];
x.beginPath();
x.arc(R() * W, R() * H, r0 + R() * (r1 - r0), 0, 7);
x.fill();
} }
var HVN_GROUND = {
cloud: ["#DEDAD4", ["#ECEAE6", "#D2D0D8", "#E2D8C4", "#CCD0DA"]], marble: ["#BEB8AC", ["#CAC6BE", "#ACA498", "#B6AEA2", "#A0988C"]],
snow: ["#D8DEE4", ["#E8ECF0", "#C6CED8", "#D0D8E0", "#B8C2CE"]], meadow: ["#5E9E40", ["#4E8E34", "#6AAE4A", "#7ABA58", "#F4E870", "#FFFFFF"]],
sand: ["#E2CC98", ["#D6BE88", "#ECD8A8", "#C8B07C", "#F0E0B8"]], redearth: ["#B8683A", ["#A85A30", "#C87A48", "#9A5028", "#D08A58"]],
jungle: ["#4A8A3A", ["#3A7A2E", "#5A9A44", "#2E6A26", "#6AAA50"]], terrace: ["#8A9A60", ["#7A8A52", "#9AAA6E", "#A89A78", "#6E7E48"]],
sakura: ["#7AAA5A", ["#6A9A4E", "#8ABA66", "#F4C4D4", "#FFE0EA", "#F0A8C0"]], jade: ["#8AB496", ["#7AA488", "#9AC4A6", "#6A9478", "#C8D8C0"]],
lotus: ["#D8C08A", ["#E8D098", "#C8B07A", "#F2E0B0", "#B8A070"]], beach: ["#F0DEB0", ["#E8D4A0", "#F8EAC4", "#DCC890", "#FFFFFF"]],
obsidian: ["#2A2430", ["#1E1A24", "#3A3242", "#141018", "#4A3E54"]]
};
function hvnGroundMat(k) { return __ZC(448, 2, this, arguments, new.target); }
function hvnM(col, o) { return __ZC(448, 3, this, arguments, new.target); }
function hvnGeo(k, make) { if (HVN_GEO[k])
return HVN_GEO[k]; var g = make(); g.userData.shared = true; return (HVN_GEO[k] = g); }
function hvnWaterMat(col) { return __ZC(448, 4, this, arguments, new.target); }
function hvnKit(parent, arch, x, z, ry, s, o) { return __ZC(448, 5, this, arguments, new.target); }
function hvnBox(p, w, h, d, mat, x, y, z, ry) { var m = new THREE.Mesh(hvnGeo("box", function () { return new THREE.BoxGeometry(1, 1, 1); }), mat); m.scale.set(w, h, d); m.position.set(x, y, z); m.rotation.y = ry || 0; p.add(m); return m; }
function hvnCyl(p, r0, r1, h, mat, x, y, z, seg) { return __ZC(448, 6, this, arguments, new.target); }
function hvnSph(p, r, mat, x, y, z, sy) { var m = new THREE.Mesh(hvnGeo("sph", function () { return new THREE.SphereGeometry(1, 14, 10); }), mat); m.scale.set(r, r * (sy || 1), r); m.position.set(x, y, z); p.add(m); return m; }
function hvnStrip(p, x0, z0, x1, z1, w, mat, y) { return __ZC(448, 7, this, arguments, new.target); }
function hvnDisc(p, r, mat, x, z, y, inner) { return __ZC(448, 8, this, arguments, new.target); }
function hvnTree(p, kind, x, z, s) { return __ZC(448, 9, this, arguments, new.target); }
function hvnPeak(p, x, z, h, r, rock, cap, seed) { return __ZC(448, 10, this, arguments, new.target); }
function hvnRainbow(p, x0, z0, x1, z1, w, H) { return __ZC(448, 11, this, arguments, new.target); }
function hvnWorldTree(p, x, z, s) { return __ZC(448, 12, this, arguments, new.target); }
function hvnHands(R, G, list) { return __ZC(448, 13, this, arguments, new.target); }
function hvnMound(Q, r, ph, s) { return __ZC(448, 14, this, arguments, new.target); }
function hvnCanoe(Q, r, ph) { return __ZC(448, 15, this, arguments, new.target); }
function hvnRiceFields(Q, r, ph, n) { return __ZC(448, 16, this, arguments, new.target); }
function hvnField(Q, r, ph, w, d, col) { return __ZC(448, 17, this, arguments, new.target); }
function hvnReeds(Q, x, z, n) { return __ZC(448, 18, this, arguments, new.target); }
function hvnCloudGate(Q) { return __ZC(448, 19, this, arguments, new.target); }
var HVN_SET = {
olympos: function (Q) { return __ZC(448, 20, this, arguments, new.target); },
rome: function (Q) { return __ZC(448, 21, this, arguments, new.target); },
asgard: function (Q) { return __ZC(448, 22, this, arguments, new.target); },
aaru: function (Q) { return __ZC(448, 23, this, arguments, new.target); },
dilmun: function (Q) { return __ZC(448, 24, this, arguments, new.target); },
persia: function (Q) { return __ZC(448, 25, this, arguments, new.target); },
meru: function (Q) { return __ZC(448, 26, this, arguments, new.target); },
jade: function (Q) { return __ZC(448, 27, this, arguments, new.target); },
takama: function (Q) { return __ZC(448, 28, this, arguments, new.target); },
celtic: function (Q) { return __ZC(448, 29, this, arguments, new.target); },
annwn: function (Q) { return __ZC(448, 30, this, arguments, new.target); },
grove: function (Q) { return __ZC(448, 31, this, arguments, new.target); },
iriy: function (Q) { return __ZC(448, 32, this, arguments, new.target); },
orun: function (Q) { return __ZC(448, 33, this, arguments, new.target); },
akan: function (Q) { return __ZC(448, 34, this, arguments, new.target); },
ginen: function (Q) { return __ZC(448, 35, this, arguments, new.target); },
aztec: function (Q) { return __ZC(448, 36, this, arguments, new.target); },
maya: function (Q) { return __ZC(448, 37, this, arguments, new.target); },
inca: function (Q) { return __ZC(448, 38, this, arguments, new.target); },
islands: function (Q) { return __ZC(448, 39, this, arguments, new.target); },
araboth: function (Q) {
Q.kit("goldengate", Q.R.R - 12, 0, 1.4, { solid: false, tint: 0xF8F4EA, tk: 0.3 });
Q.kit("lightpillar", 0, 0, 1.4, { solid: false });
Q.around(function (r, ph, i) { Q.tree("cloud", r, ph, 1.4); }, 16);
Q.flowers([0xFFFFFF, 0xF8EED0], 700);
},
shadow: function (Q) { return __ZC(448, 40, this, arguments, new.target); }
};
function hvnPalaceCols(d) { return __ZC(448, 41, this, arguments, new.target); }
function hvnPalaceArch(R, d) { if (d.trad === "Anglo-Saxon")
return "longhouse"; if (d.trad === "Qliphothic")
return "crypt"; return R.D.arch; }
function hvnPalaceScale(arch, fit) { var K = KIT[arch]; if (!K)
return 1; return Math.round(fit * 1.18 / Math.max(K.size[0], K.size[2]) * 100) / 100 * (arch === "crypt" ? 1.5 : 1); }
function hvnPalace(R, P, G, list) { return __ZC(448, 42, this, arguments, new.target); }
function Q0obelisk(p, x, z) { return __ZC(448, 43, this, arguments, new.target); }
function hvnBuildRealm(R) { return __ZC(448, 44, this, arguments, new.target); }
function hvnDropRealm(B) { return __ZC(448, 45, this, arguments, new.target); }
function hvnFigBuild(B, P) { return __ZC(448, 46, this, arguments, new.target); }
function hvnFigDrop(B, k) { return __ZC(448, 47, this, arguments, new.target); }
function hvnBuild(G) { return __ZC(448, 48, this, arguments, new.target); }
function hvnCourt(G) { return __ZC(448, 49, this, arguments, new.target); }
function hvnBlock(x, z, feet) { return __ZC(448, 50, this, arguments, new.target); }
function hvnGround(x, z) { return __ZC(448, 51, this, arguments, new.target); }
function hvnTick(dt) { return __ZC(448, 52, this, arguments, new.target); }
function hvnBannerNow(L) { return __ZC(448, 53, this, arguments, new.target); }
function hvnEnv() { return __ZC(448, 54, this, arguments, new.target); }
function hvnTalk(key) { return __ZC(448, 55, this, arguments, new.target); }
function hvnHeraldCard() { return __ZC(448, 56, this, arguments, new.target); }
function hvnRealmCard(R) {
var names = R.keys.map(function (k) { return DEITY[k].name; });
worldCard(worldFacts("✨ " + R.D.name, R.D.sub, [["Palaces", String(R.keys.length)], ["Who lives here", names.slice(0, 40).join(", ") + (names.length > 40 ? "…" : "")]], [R.D.note]), {});
}
function hvnTo(R) { var a = R.inA, r = R.R + 8, x = R.x + Math.cos(a) * r, z = R.z + Math.sin(a) * r; camera.position.set(HVN.base + x, Math.max(0, hvnLandH(x, z)) + 1.72, z); yaw = Math.atan2(-(R.x - x), -(R.z - z)); pitch = 0; HVN.ct = 0; }
if (typeof worldDef === "function")
worldDef(HVN.key, {
base: HVN.base, far: 2600, ownSky: true, tone: 660, shadePlane: true,
env: function () { return hvnEnv(); },
build: function (G) { hvnBuild(G); },
enter: function (opt) { return __ZC(448, 57, this, arguments, new.target); },
leave: function () {
worldBanner(null);
worldPrompt(null);
HVN.near = null;
HVN.inRealm = null;
for (var k in HVN.cur) {
try {
hvnDropRealm(HVN.cur[k]);
}
catch (e) { }
}
HVN.cur = {};
},
ground: function (x, z, feet) { return hvnGround(x, z); },
block: function (x, z, feet) { return hvnBlock(x, z, feet); },
tick: function (dt) { hvnTick(dt); },
back: function () { hvnHome(); }
});
function hvnMay() { try {
return typeof otmMsOk !== "function" || !!otmMsOk();
}
catch (e) {
return false;
} }
function hvnGo(opt) {
if (!hvnMay()) {
if (typeof setStatus === "function")
setStatus("☁️ That way is closed.");
return false;
}
return worldGo(HVN.key, Object.assign({ fromName: "Temple Row" }, opt || {}));
}
function hvnMoonHome() { HVN.moon = false; if (typeof otmGo === "function") {
try {
otmGo("hall");
return;
}
catch (e) { }
} hvnHome(); }
function hvnHome() { if (HVN.moon && typeof otmGo === "function") {
HVN.moon = false;
try {
otmGo("hall");
return;
}
catch (e) { }
} worldHome("☁️ <b>Back on Temple Row.</b> You come down the stair of cloud to the street."); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(HVN.key) < 0)
WLG.keys.push(HVN.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === HVN.key) {
HVN.cur = {};
HVN.built = false;
HVN.G = null;
HVN.solids = [];
HVN.spots = [];
HVN.court = null;
HVN.col = null;
HVN.my = null;
HVN.land = null;
HVN.treeB = null;
HVN.lp = null;
} return r; }; })();
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === HVN.key; })) {
DGR_WORLDS.push([HVN.key, HVN_NAME + " (Always safe: the palaces of the powers)", 0, "safe"]);
if (typeof DGR_W !== "undefined")
DGR_W[HVN.key] = { id: HVN.key, name: HVN_NAME, def: 0, group: "safe" };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === HVN.key; }))
try {
DK_PLACES.push([HVN.key, HVN_NAME]);
}
catch (e) { }
(function () {
if (typeof evbWorldSpec !== "function")
return;
var ws = evbWorldSpec;
evbWorldSpec = function (D) {
if (!D || !D.hvn)
return ws.apply(this, arguments);
var H = D.hvn, d = DEITY[H.key], bx = HVN.base;
try {
worldBanner(null);
worldPrompt(null);
HVN.near = null;
}
catch (e) { }
return { id: "hvn_in_" + H.key, archetype: D.arch, attrs: { s: H.s, c: H.c, rc: H.rc }, x: bx + H.bx, z: H.bz, rot: H.ry, realm: store.here || 0, label: D.name, inside: {},
deity: H.key, templerow: true, templeHouse: true, city: true, hub: true,
evb: { theme: null, src: "w", world: HVN.key }, evbDoor: { x: bx + D.x, z: D.z, out: D.out, y: 0 } };
};
})();
(function () {
if (typeof TL === "undefined")
return;
TL.enter = function (key) {
var D = null;
hvnLayout();
if (!DEITY[key])
return false;
if (!hvnMay()) {
if (typeof otmTempleJobAsk === "function") {
try {
otmTempleJobAsk(true);
}
catch (e) { }
}
else if (typeof setStatus === "function")
setStatus("☁️ That way is closed.");
return true;
}
var go = function () { var L = (typeof EVB_WD !== "undefined" && EVB_WD[HVN.key]) || []; L.forEach(function (q) { if (q.hvn && q.hvn.key === key)
D = q; }); if (D && typeof evbWorldEnter === "function") {
evbWorldEnter(D);
return true;
} return false; };
if (WLD.on !== HVN.key)
hvnGo({ palace: key });
else {
var R = null;
HVN.realms.forEach(function (q) { q.pal.forEach(function (p) { if (p.key === key)
R = q; }); });
if (R)
hvnTo(R);
}
var n = 0, iv = setInterval(function () { n++; HVN.ct = 0; try {
hvnTick(0.01);
}
catch (e) { } if (go() || n > 20)
clearInterval(iv); }, 250);
return true;
};
})();
function hvnMenu() { return __ZC(448, 58, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-hvn")) {
var btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-hvn";
btn.title = HVN_NAME;
btn.textContent = "☁️ Heavens";
btn.onclick = function () { hvnMenu(); };
bar.appendChild(btn);
}
var me = document.getElementById("me-hvn");
if (me) {
var ok = hvnMay();
me.style.display = ok ? "" : "none";
}
setTimeout(hook, 6000);
}
if (typeof document !== "undefined")
setTimeout(hook, 2400);
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-hvn]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-hvn", "1");
b.textContent = "☁️ The Heavens";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } hvnGo({}); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
setTimeout(function () {
try {
var m = /[?&]khvn=([a-z0-9_-]+)/.exec(location.search);
if (!m)
return;
var where = m[1], tries = 0;
var iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
hvnGo(HVN.byTrad[where] || hvnLayout().some(function (R) { return R.k === where; }) ? { realm: where } : {});
try {
var q = new URLSearchParams(location.search);
q.delete("khvn");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
function hvnStats() { return __ZC(448, 59, this, arguments, new.target); }
function hvnSS(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
var HVN_LANDF = {
olympos: { peaks: [[Math.PI, 110, 175, 120, "snow"], [Math.PI + 0.55, 170, 120, 100, "snow"], [Math.PI - 0.6, 170, 110, 90, "snow"]], trees: ["cypress", "olive", "cypress"], dens: 0.7 },
capitolium: { trees: ["umbrella", "cypress", "umbrella"], dens: 0.7, river: [Math.PI / 2] },
asgard: { peaks: [[Math.PI, 150, 150, 140, "snow"], [Math.PI + 0.7, 190, 120, 110, "snow"], [Math.PI - 0.7, 190, 130, 110, "snow"]], trees: ["conifer", "conifer", "birch"], dens: 1.1 },
aaru: { river: [Math.PI / 2], pads: [[Math.PI, 90, 95]], trees: ["palm"], dens: 0.18, desert: 1 },
dilmun: { river: [Math.PI / 2], trees: ["palm"], dens: 0.3, desert: 1 },
garodman: { trees: ["cypress", "plane"], dens: 0.55, peaks: [[Math.PI, 170, 110, 110, "snow"]] },
meru: { peaks: [[Math.PI, 120, 230, 130, "gold"], [Math.PI + 0.6, 200, 140, 100, "snow"], [Math.PI - 0.6, 200, 150, 100, "snow"]], trees: ["banyan", "palm", "banyan"], dens: 0.9, lakes: [[Math.PI / 2, 60, 55], [-Math.PI / 2, 60, 55]] },
jade: { peaks: [[Math.PI - 0.4, 130, 160, 90, "snow"], [Math.PI + 0.4, 140, 140, 85, "snow"], [Math.PI, 220, 190, 110, "snow"]], trees: ["pine", "peach", "pine"], dens: 0.9, lakes: [[Math.PI * 0.6, 70, 60]] },
takamagahara: { peaks: [[Math.PI, 150, 170, 150, "snow", 1]], trees: ["cedar", "sakura", "sakura"], dens: 0.9, river: [Math.PI * 0.25] },
tirnanog: { seas: [[Math.PI, 260]], trees: ["oak", "apple", "oak"], dens: 0.8 },
annwn: { lakes: [[Math.PI * 0.6, 70, 80]], trees: ["oak", "oak", "birch"], dens: 1.1 },
nemeton: { trees: ["oak"], dens: 1.3 },
iriy: { trees: ["birch", "conifer", "birch"], dens: 1.2, river: [Math.PI * 0.4] },
orun: { river: [Math.PI * 0.6], trees: ["palm", "jungle", "palm"], dens: 1.0 },
nyame: { trees: ["jungle", "palm"], dens: 1.1 },
ginen: { seas: [[Math.PI, 220]], trees: ["palm"], dens: 0.8 },
omeyocan: { lakes: [[Math.PI, 80, 110]], trees: ["jungle", "broad"], dens: 1.1, peaks: [[Math.PI + 0.9, 180, 150, 100, "snow", 1]] },
thirteen: { trees: ["jungle", "jungle", "palm"], dens: 1.5 },
hananpacha: { peaks: [[Math.PI, 120, 200, 130, "snow"], [Math.PI + 0.8, 160, 170, 110, "snow"], [Math.PI - 0.8, 160, 160, 110, "snow"]], terraces: 1, trees: ["broad"], dens: 0.35 },
hawaiki: { island: 1, peaks: [[Math.PI, 90, 120, 120, "lava", 1]], trees: ["palm"], dens: 0.9 },
araboth: { trees: ["cloudtree"], dens: 0.6 },
shadow: { trees: ["dead"], dens: 0.6, peaks: [[Math.PI, 140, 120, 90, "obsidian"]] }
};
var HVN_TREE_COL = { conifer: [0x2E5434, 0x3A6440], pine: [0x355E3A, 0x2A4E30], cedar: [0x2E5032, 0x3E6038], birch: [0x8AB848, 0x9CC45A], oak: [0x4A7A30, 0x5A8A3A], broad: [0x4E8A3A, 0x5E9A44],
apple: [0x5A9A3A, 0x6AA844], olive: [0x7A8A5A, 0x8A9A68], cypress: [0x2E5A2E, 0x36662F], umbrella: [0x3E6A34, 0x4A7A3A], plane: [0x5A8A3E, 0x6A9A48], palm: [0x3E7A2E, 0x5A9238],
banyan: [0x3E7A2A, 0x4E8A34], jungle: [0x2E6A26, 0x3E7E2E], peach: [0xF2B8C8, 0xF6D0DA], sakura: [0xF0B0C6, 0xF6C8D6], cloudtree: [0xFFF8E8, 0xF8EED0], dead: [0x2A2430, 0x3A3242] };
function hvnLandPrep() { return __ZC(448, 60, this, arguments, new.target); }
function hvnSegD(x, z, s) { var dx = s.x1 - s.x0, dz = s.z1 - s.z0, L2 = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - s.x0) * dx + (z - s.z0) * dz) / L2)); return Math.hypot(x - (s.x0 + dx * t), z - (s.z0 + dz * t)); }
function hvnRoadD(x, z) { var m = 1e9, L = HVN.roads || []; for (var i = 0; i < L.length; i++) {
var d = hvnSegD(x, z, L[i]);
if (d < m)
m = d;
} return m; }
var HVN_C1 = new THREE.Color(), HVN_C2 = new THREE.Color();
function hvnLandAt(x, z, o) { return __ZC(448, 61, this, arguments, new.target); }
var HVN_LAND_TONE = 0.7;
function hvnLandBuild(G) { return __ZC(448, 62, this, arguments, new.target); }
function hvnSeaMat() { return __ZC(448, 63, this, arguments, new.target); }
function hvnLandH(x, z) { return __ZC(448, 64, this, arguments, new.target); }
function hvnRoadDeck(x, z) { return __ZC(448, 65, this, arguments, new.target); }
function hvnRoadsBuild(G) { return __ZC(448, 66, this, arguments, new.target); }
function hvnTreeGeo(kind) { return __ZC(448, 67, this, arguments, new.target); }
function hvnTrunkH(kind) { return kind === "palm" ? 7.8 : kind === "jungle" ? 10 : kind === "umbrella" ? 7 : kind === "birch" ? 6 : kind === "cypress" ? 1.6 : kind === "dead" ? 5.5 : kind === "banyan" ? 4.6 : kind === "conifer" || kind === "pine" || kind === "cedar" ? 2.2 : 3.6; }
function hvnWoodsBuild(G) { return __ZC(448, 68, this, arguments, new.target); }
function hvnTreeAt(x, z) { return __ZC(448, 69, this, arguments, new.target); }
function hvnCourtDress(G) { return __ZC(448, 70, this, arguments, new.target); }
(function () {
var c = hvnCourt;
hvnCourt = function (G) { var r = c.apply(this, arguments); try {
hvnCourtDress(G);
}
catch (e) {
if (window.console)
console.warn("[heavens] court dress", e);
} return r; };
})();
