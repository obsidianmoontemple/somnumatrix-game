/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SWR = { own: {}, ownAt: 0, asked: 0, rules: null, lent: null, busy: false };
var SWR_LINE = [
["jackhead", "hat", "Jack-o'-Lantern Head", "legendary", "A great carved pumpkin worn as a head, lit softly from inside."],
["shroud", "back", "Shroud of the Otherworld", "legendary", "A long pale cloak that fades to mist at the hem."],
["candlecrown", "hat", "Crown of Samhain Candles", "rare", "A black iron crown of seven steady candles, lit from the Tlachtga fire."],
["ravencrown", "hat", "Raven-Feather Crown", "rare", "Black raven feathers bound in silver, as the Morrigan might wear."],
["spiritveil", "face", "Veil of the Thin Place", "rare", "A drift of grey-silver gauze over the face, pale at the hem."],
["embertorc", "neck", "Hearth-Ember Torc", "rare", "A twisted bronze torc set with an ember that never goes out."],
["antlers", "hat", "Antlers of the Wild Hunt", "uncommon", "Dark antlers twined with ivy and red berries."],
["bonemask", "face", "Bone-White Half Mask", "uncommon", "A pale carved half mask with silver at the brow."],
["batwings", "back", "Bat-Wing Cape", "uncommon", "A black cape cut in scalloped bat wings, lined in pumpkin orange."],
["guisermask", "face", "Straw Guiser's Mask", "common", "The old guising mask of plaited straw, so the wandering dead won't know you."],
["applebrooch", "neck", "Golden Snap-Apple Brooch", "common", "A little gold apple on an orange ribbon, from the barrel itself."],
["cobwebgloves", "hands", "Cobweb Gloves", "common", "Black lace gloves spun like a spider's web."]
];
var SWR_RARE = { common: { n: "Common", col: "#D8D0C0" }, uncommon: { n: "Uncommon", col: "#7AD07A" }, rare: { n: "Rare", col: "#7AB0FF" }, legendary: { n: "Legendary", col: "#FFB040" } };
var SWR_APPLES = { red: { n: "red apple", col: "#C8201A", r: 15 }, green: { n: "green apple", col: "#6AA83A", r: 14 }, gold: { n: "gold-ribboned apple", col: "#D8A020", r: 11 } };
var SWR_COST = [
["ghostsheet", "layer", "Ghost sheet", 60], ["skeletonsuit", "layer", "Skeleton suit", 120], ["mummywraps", "layer", "Mummy wrappings", 110],
["pumpkinsuit", "layer", "Pumpkin suit", 100], ["vampcloak", "back", "Vampire's cloak", 140], ["catears", "hat", "Black cat ears", 40],
["piratehat", "hat", "Pirate's tricorn", 80], ["scarecrowhat", "hat", "Scarecrow's straw hat", 50], ["eyepatch", "face", "Eye patch", 20],
["dominomask", "face", "Domino mask", 35]
];
var SWR_SETS = [
["ghost", "👻 Friendly ghost", { layer: "ghostsheet", hat: null, back: null, face: null }],
["skeleton", "💀 Skeleton", { layer: "skeletonsuit", hat: null, back: null, face: null }],
["mummy", "🧻 Mummy", { layer: "mummywraps", hat: null, back: null, face: null }],
["pumpkin", "🎃 Pumpkin", { layer: "pumpkinsuit", hat: null, back: null, face: null }],
["vampire", "🧛 Vampire", { layer: "suit", back: "vampcloak", hat: null, face: null }],
["witch", "🧙‍♀️ Witch", { hat: "witch", back: "cloak", layer: null, face: null }],
["wizard", "🧙 Wizard", { hat: "wizard", back: "cape", layer: null, face: null }],
["cat", "🐈‍⬛ Black cat", { hat: "catears", layer: "sweater", back: null, face: "dominomask" }],
["pirate", "🏴‍☠️ Pirate", { hat: "piratehat", face: "eyepatch", layer: "vest", back: null }],
["scarecrow", "🌾 Scarecrow", { hat: "scarecrowhat", layer: "tunic", back: null, face: null }],
["masked", "🎭 Masquerade", { face: "dominomask", back: "cape", layer: "suit", hat: null }]
];
var SWR_SET_COL = { vampire: { layerColor: 0x141418, accColor: 0x8A1020 }, cat: { layerColor: 0x141418 }, pirate: { layerColor: 0x5A2A1A }, scarecrow: { layerColor: 0x8A6A3A }, masked: { layerColor: 0x141418, backColor: 0x5A1A3A }, witch: { backColor: 0x2A1A3A }, wizard: { backColor: 0x2A2A6A } };
(function () {
if (typeof WEAR === "undefined")
return;
SWR_LINE.forEach(function (r) { WEAR[r[0]] = { slot: r[1], label: r[2], price: 0, prize: 1, samhain: 1, rarity: r[3] }; });
SWR_COST.forEach(function (r) { if (!WEAR[r[0]])
WEAR[r[0]] = { slot: r[1], label: r[2], price: r[3], costume: 1 }; });
})();
function swrLine(k) { return SWR_LINE.filter(function (r) { return r[0] === k; })[0] || null; }
function swrLookKey(slot) { return (typeof BKP_LOOKKEY !== "undefined" && BKP_LOOKKEY[slot]) || slot; }
function swrKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function swrSigned() { return typeof signedIn === "function" && signedIn(); }
function swrOn() {
try {
if (typeof shnOn === "function" && shnOn())
return true;
}
catch (e) { }
try {
if (typeof otmSamhainOn === "function" && otmSamhainOn())
return true;
}
catch (e) { }
return false;
}
function swrRpc(name, args) { return (typeof cityRpc === "function") ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
var SWR_MAT = {};
function swrMat(k, make) { return SWR_MAT[k] || (SWR_MAT[k] = make()); }
function swrLam(col, o) { o = o || {}; return swrMat("l" + col + (o.ds ? "d" : "") + (o.op || ""), function () { var m = new THREE.MeshLambertMaterial({ color: col, side: o.ds ? THREE.DoubleSide : THREE.FrontSide }); if (o.op) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
} return m; }); }
function swrLit(col) { return swrMat("b" + col, function () { return new THREE.MeshBasicMaterial({ color: col }); }); }
function swrTex(k, w, h, fn) { return swrMat("t" + k, function () { var c = document.createElement("canvas"); c.width = w; c.height = h; fn(c.getContext("2d"), w, h); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; }); }
function swrWrapMat() { return __ZC(413, 0, this, arguments, new.target); }
function swrStrawMat() { return __ZC(413, 1, this, arguments, new.target); }
function swrShroudMat() { return __ZC(413, 2, this, arguments, new.target); }
function swrWebMat() { return __ZC(413, 3, this, arguments, new.target); }
function swrWingGeo() { return __ZC(413, 4, this, arguments, new.target); }
function swrDress(g, spec, f) {
var L = lookOf(spec), body = g.children[0], limbs = g.userData.limbs;
if (!body || !limbs)
return 0;
var n = 0, sex = L.sex, shoulder = sex === "f" ? 0.185 : sex === "m" ? 0.225 : 0.205;
function add(parent, key, make, mat, x, y, z) { var m = new THREE.Mesh(swrMat("g" + key, make), mat); m.position.set(x || 0, y || 0, z || 0); m.userData.part = "worn"; m.userData.wk = "swr" + key; parent.add(m); n++; return m; }
function cyl(rt, rb, h, s, o) { return function () { return o ? new THREE.CylinderGeometry(rt, rb, h, s, 1, true, o[0], o[1]) : new THREE.CylinderGeometry(rt, rb, h, s); }; }
function sph(r, a, b) { return function () { return new THREE.SphereGeometry(r, 12, 8, 0, Math.PI * 2, 0, b || Math.PI); }; }
function limbMat(mat, parts) { [limbs.la, limbs.ra, limbs.ll, limbs.rl].forEach(function (p) { if (p)
p.children.forEach(function (m) { if (parts.indexOf(m.userData.part) >= 0)
m.material = mat; }); }); }
function bodyMat(mat, parts) { body.children.forEach(function (m) { if (parts.indexOf(m.userData.part) >= 0)
m.material = mat; }); }
var hat = L.hat, face = L.face, back = L.back, neck = L.neck, layer = L.layer;
if (hat === "jackhead") {
var pm = swrLam(0xE0701A), lit = swrLit(0xFFC040);
for (var r = 0; r < 6; r++) {
var rib = add(body, "jrib", sph(0.16), pm, 0, 1.76, 0);
rib.scale.set(0.62, 0.9, 1);
rib.rotation.y = r * Math.PI / 6;
}
add(body, "jstem", cyl(0.018, 0.028, 0.07, 6), swrLam(0x3A5A1A), 0, 1.91, 0).rotation.z = 0.2;
[-1, 1].forEach(function (sd) { add(body, "jeye", function () { return new THREE.ConeGeometry(0.035, 0.05, 3); }, lit, sd * 0.055, 1.79, 0.155).rotation.x = 0.3; });
add(body, "jmouth", function () { return new THREE.BoxGeometry(0.13, 0.03, 0.02); }, lit, 0, 1.7, 0.152);
[-1, 0, 1].forEach(function (u) { add(body, "jtooth", function () { return new THREE.BoxGeometry(0.02, 0.022, 0.02); }, pm, u * 0.04, 1.71, 0.162); });
body.children.forEach(function (m) {
if (/^(hair|afro|coily|locs|braid|bun|pony)/.test(m.userData.part || ""))
m.visible = false;
if (/^swr(jrib|jstem|jeye|jmouth|jtooth)/.test(m.userData.wk || ""))
m.userData.part = "swrhd";
});
}
else if (hat === "candlecrown") {
add(body, "ccband", cyl(0.13, 0.13, 0.06, 16, [0, Math.PI * 2]), swrLam(0x1A1A1E, { ds: true }), 0, 1.85, 0);
for (var c = 0; c < 7; c++) {
var a = c / 7 * Math.PI * 2;
add(body, "ccandle", cyl(0.016, 0.016, 0.13, 6), swrLam(0xF0E8D0), Math.cos(a) * 0.13, 1.93, Math.sin(a) * 0.13);
add(body, "cflame", function () { return new THREE.ConeGeometry(0.013, 0.04, 5); }, swrLit(0xFFB040), Math.cos(a) * 0.13, 2.015, Math.sin(a) * 0.13);
}
body.children.forEach(function (m) { if (/^swr(ccband|ccandle|cflame)/.test(m.userData.wk || ""))
m.userData.part = "swrhd"; });
}
else if (hat === "ravencrown") {
add(body, "rcband", cyl(0.118, 0.118, 0.03, 16, [0, Math.PI * 2]), swrLam(0xC8CCD8, { ds: true }), 0, 1.83, 0);
for (var fe = 0; fe < 11; fe++) {
var fa = -Math.PI * 0.85 + fe / 10 * Math.PI * 1.7 + Math.PI / 2, ff = add(body, "rfeather", function () { return new THREE.ConeGeometry(0.022, 0.2 + 0.0, 4); }, swrLam(0x101016), Math.cos(fa) * 0.12, 1.92 - Math.abs(fe - 5) * 0.008, Math.sin(fa) * 0.12);
ff.scale.z = 0.35;
ff.rotation.y = -fa + Math.PI / 2;
ff.rotation.z = (Math.cos(fa)) * -0.35;
ff.rotation.x = Math.sin(fa) * 0.35;
ff.scale.y = 1 - Math.abs(fe - 5) * 0.06;
}
}
else if (hat === "antlers") {
var am = swrLam(0x3A2A1C);
[-1, 1].forEach(function (sd) {
var b1 = add(body, "ant1", cyl(0.012, 0.02, 0.26, 6), am, sd * 0.09, 1.93, -0.01);
b1.rotation.z = -sd * 0.5;
var b2 = add(body, "ant2", cyl(0.008, 0.013, 0.14, 6), am, sd * 0.17, 2.06, 0.03);
b2.rotation.z = -sd * 0.15;
b2.rotation.x = 0.4;
var b3 = add(body, "ant2", cyl(0.008, 0.013, 0.14, 6), am, sd * 0.22, 2.02, -0.03);
b3.rotation.z = -sd * 1.0;
var b4 = add(body, "ant3", cyl(0.006, 0.01, 0.1, 6), am, sd * 0.13, 2.09, -0.03);
b4.rotation.z = sd * 0.3;
for (var lv = 0; lv < 3; lv++)
add(body, "ivy", sph(0.018), swrLam(0x2E6A2A), sd * (0.06 + lv * 0.035), 1.86 + lv * 0.04, 0.02);
add(body, "berry", sph(0.012), swrLam(0xC0201A), sd * 0.1, 1.88, 0.04);
});
}
if (face === "guisermask") {
var gm = add(body, "guiser", cyl(0.13, 0.15, 0.3, 16, [-1.2, 2.4]), swrStrawMat(), 0, 1.72, 0);
gm.rotation.y = 0;
[-1, 1].forEach(function (sd) { add(body, "gueye", function () { return new THREE.CircleGeometry(0.018, 10); }, swrLit(0x0A0806), sd * 0.042, 1.745, 0.152); });
for (var fr = 0; fr < 9; fr++) {
var fx = -0.12 + fr * 0.03;
var tuft = add(body, "gutuft", function () { return new THREE.ConeGeometry(0.012, 0.09, 4); }, swrStrawMat(), fx, 1.55, 0.11 + Math.cos(fx * 6) * 0.02);
tuft.rotation.x = Math.PI;
}
}
else if (face === "bonemask") {
add(body, "bone", cyl(0.12, 0.12, 0.11, 16, [-0.95, 1.9]), swrLam(0xEDE6D6, { ds: true }), 0, 1.75, 0);
[-1, 1].forEach(function (sd) { var e = add(body, "boneeye", function () { return new THREE.CircleGeometry(0.02, 10); }, swrLit(0x0A0806), sd * 0.042, 1.745, 0.121); e.scale.y = 1.3; });
add(body, "bonebrow", cyl(0.122, 0.122, 0.012, 16, [-0.95, 1.9]), swrLam(0xC8CCD8, { ds: true }), 0, 1.8, 0);
}
else if (face === "spiritveil") {
add(body, "veil", function () { var g = new THREE.CylinderGeometry(0.125, 0.3, 0.62, 18, 1, true); g.translate(0, -0.29, 0); return g; }, swrShroudMat(), 0, 1.81, 0);
add(body, "veilcap", sph(0.13, 0, Math.PI * 0.5), swrLam(0xD8DEEA, { op: 0.6 }), 0, 1.8, 0);
}
if (back === "batwings") {
[-1, 1].forEach(function (sd) {
var w = add(body, "wing", swrWingGeo, swrLam(0x141418, { ds: true }), sd * 0.06, 1.52, -0.13);
w.scale.x = sd;
w.rotation.y = sd * 0.35;
var li = add(body, "wingin", swrWingGeo, swrLam(0xD8601A, { ds: true }), sd * 0.06, 1.52, -0.12);
li.scale.set(sd * 0.92, 0.9, 1);
li.rotation.y = sd * 0.35;
});
add(body, "wingcollar", cyl(0.07, 0.11, 0.06, 12), swrLam(0x141418), 0, 1.58, -0.01);
}
else if (back === "shroud") {
add(body, "shroud", cyl(0.21, 0.42, 1.55, 18, [Math.PI * 0.55, Math.PI * 0.9]), swrShroudMat(), 0, 0.82, -0.02);
var sh = add(body, "shroudhood", sph(0.15, 0, Math.PI * 0.5), swrLam(0xD8DEEA, { ds: true, op: 0.85 }), 0, 1.58, -0.12);
sh.rotation.x = -1.8;
}
else if (back === "vampcloak") {
add(body, "vcloak", cyl(0.21, 0.4, 1.3, 16, [Math.PI * 0.6, Math.PI * 0.8]), swrLam(0x101014, { ds: true }), 0, 0.93, -0.02);
add(body, "vlining", cyl(0.2, 0.39, 1.28, 16, [Math.PI * 0.62, Math.PI * 0.76]), swrLam(0x8A1020, { ds: true }), 0, 0.93, -0.01);
[-1, 1].forEach(function (sd) { var cl = add(body, "vcollar", function () { return new THREE.PlaneGeometry(0.16, 0.2); }, swrLam(0x101014, { ds: true }), sd * 0.09, 1.68, -0.06); cl.rotation.y = sd * 0.6; cl.rotation.x = -0.25; });
}
if (neck === "embertorc") {
var tc = add(body, "torc", function () { return new THREE.TorusGeometry(0.085, 0.011, 6, 18, Math.PI * 1.7); }, swrLam(0xA8702A), 0, 1.55, 0.01);
tc.rotation.x = Math.PI / 2;
tc.rotation.z = Math.PI * 1.35 + Math.PI / 2;
[-1, 1].forEach(function (sd) { add(body, "ember", sph(0.016), swrLit(0xFF7A20), sd * 0.026, 1.55, 0.093); });
}
else if (neck === "applebrooch") {
add(body, "bribbon", function () { return new THREE.BoxGeometry(0.03, 0.07, 0.006); }, swrLam(0xE06A1A), 0.07, 1.43, 0.118);
add(body, "bapple", sph(0.022), swrLam(0xE0B030), 0.07, 1.4, 0.125);
add(body, "bleaf", sph(0.01), swrLam(0x3A7A2A), 0.08, 1.425, 0.13).scale.set(1.6, 0.6, 0.6);
}
if (L.hands === "cobwebgloves")
limbMat(swrWebMat(), ["hand"]);
if (layer === "ghostsheet") {
var gs = add(body, "ghost", function () { var p = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
p.push(new THREE.Vector2(t < 0.18 ? Math.sin(t / 0.18 * Math.PI / 2) * 0.2 : 0.2 + (t - 0.18) * 0.3, 1.96 - t * 1.6));
} return new THREE.LatheGeometry(p, 20); }, swrLam(0xF4F4F0, { ds: true }), 0, 0, 0);
gs.scale.z = 0.8;
[-1, 1].forEach(function (sd) { var e = add(body, "ghosteye", function () { return new THREE.CircleGeometry(0.024, 10); }, swrLit(0x101014), sd * 0.05, 1.76, 0.168); e.scale.y = 1.4; });
limbMat(swrLam(0xF4F4F0), ["arm", "hand"]);
}
else if (layer === "skeletonsuit") {
var bk = swrLam(0x141418), bn = swrLam(0xEDE8DA);
bodyMat(bk, ["torso", "hips", "bust"]);
limbMat(bk, ["arm", "leg"]);
for (var rb = 0; rb < 4; rb++) {
add(body, "rib", function () { return new THREE.BoxGeometry(0.22, 0.022, 0.01); }, bn, 0, 1.46 - rb * 0.065, 0.105 - rb * 0.004);
}
add(body, "spine", function () { return new THREE.BoxGeometry(0.025, 0.4, 0.012); }, bn, 0, 1.3, 0.108);
add(body, "pelvis", function () { return new THREE.BoxGeometry(0.16, 0.05, 0.01); }, bn, 0, 1.06, 0.11);
[limbs.la, limbs.ra, limbs.ll, limbs.rl].forEach(function (p, i) { if (!p)
return; add(p, "bone", function () { return new THREE.BoxGeometry(0.022, 0.5, 0.012); }, bn, 0, i < 2 ? -0.3 : -0.42, i < 2 ? 0.05 : 0.065); });
}
else if (layer === "mummywraps") {
var wm = swrWrapMat();
bodyMat(wm, ["torso", "hips", "bust", "neck", "head"]);
limbMat(wm, ["arm", "leg", "hand"]);
body.children.forEach(function (m) { if (/^(hair|afro|coily|locs|braid|bun|pony)/.test(m.userData.part || ""))
m.visible = false; });
for (var t2 = 0; t2 < 3; t2++) {
var lo = add(body, "loose", function () { return new THREE.BoxGeometry(0.035, 0.2, 0.006); }, wm, -0.08 + t2 * 0.09, 1.0 - t2 * 0.05, 0.12);
lo.rotation.z = 0.3 - t2 * 0.25;
}
}
else if (layer === "pumpkinsuit") {
for (var r2 = 0; r2 < 6; r2++) {
var rb2 = add(body, "psrib", sph(0.4), swrLam(0xE0701A), 0, 1.16, 0);
rb2.scale.set(0.62, 0.8, 1);
rb2.rotation.y = r2 * Math.PI / 6;
}
add(body, "pscol", function () { return new THREE.TorusGeometry(0.075, 0.025, 6, 14); }, swrLam(0x3A6A1A), 0, 1.47, 0).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (sd) { add(body, "pseye", function () { return new THREE.ConeGeometry(0.035, 0.05, 3); }, swrLam(0x141418), sd * 0.1, 1.23, 0.37).rotation.x = 0.2; });
add(body, "psmile", function () { return new THREE.TorusGeometry(0.1, 0.016, 4, 12, Math.PI); }, swrLam(0x141418), 0, 1.12, 0.36).rotation.z = Math.PI;
}
if (hat === "catears") {
[-1, 1].forEach(function (sd) {
var e = add(body, "catear", function () { return new THREE.ConeGeometry(0.055, 0.12, 4); }, swrLam(0x141418), sd * 0.08, 1.9, 0.0);
e.rotation.z = -sd * 0.3;
var ie = add(body, "catin", function () { return new THREE.ConeGeometry(0.03, 0.07, 4); }, swrLam(0xE89AAA), sd * 0.08, 1.89, 0.024);
ie.rotation.z = -sd * 0.3;
});
add(body, "catband", cyl(0.116, 0.116, 0.015, 16, [0, Math.PI * 2]), swrLam(0x141418, { ds: true }), 0, 1.81, 0);
}
else if (hat === "piratehat") {
var tb = add(body, "tricorn", cyl(0.21, 0.21, 0.04, 3), swrLam(0x141418), 0, 1.84, -0.02);
tb.rotation.y = Math.PI;
add(body, "tricr", cyl(0.1, 0.12, 0.1, 12), swrLam(0x141418), 0, 1.9, 0);
add(body, "trisk", sph(0.022), swrLam(0xEDE8DA), 0, 1.9, 0.115);
}
else if (hat === "scarecrowhat") {
var sm2 = swrStrawMat();
add(body, "scbrim", cyl(0.26, 0.27, 0.015, 18), sm2, 0, 1.81, 0).rotation.x = 0.08;
add(body, "sccrown", cyl(0.1, 0.125, 0.13, 12), sm2, 0, 1.88, 0);
add(body, "scband", cyl(0.127, 0.127, 0.03, 12, [0, Math.PI * 2]), swrLam(0x8A2A1A, { ds: true }), 0, 1.83, 0);
for (var tf = 0; tf < 10; tf++) {
var ta = tf / 10 * Math.PI * 2, tt = add(body, "sctuft", function () { return new THREE.ConeGeometry(0.012, 0.08, 4); }, sm2, Math.cos(ta) * 0.14, 1.71, Math.sin(ta) * 0.12);
tt.rotation.x = Math.PI;
}
}
if (face === "eyepatch") {
add(body, "patch", function () { return new THREE.CircleGeometry(0.03, 10); }, swrLam(0x101014), -0.042, 1.738, 0.113);
var strap = add(body, "pstrap", function () { return new THREE.TorusGeometry(0.117, 0.005, 4, 20); }, swrLam(0x101014), 0, 1.76, 0);
strap.rotation.x = Math.PI / 2;
strap.rotation.z = 0.3;
strap.rotation.y = 0.3;
}
else if (face === "dominomask") {
add(body, "domino", cyl(0.118, 0.118, 0.045, 16, [-0.85, 1.7]), swrLam(0x141418, { ds: true }), 0, 1.738, 0);
[-1, 1].forEach(function (sd) { add(body, "domeye", function () { return new THREE.CircleGeometry(0.016, 10); }, swrLam(0xD8C8B0), sd * 0.042, 1.738, 0.119); });
}
return n;
}
(function () {
if (typeof dressWorn !== "function")
return;
var dw = dressWorn;
dressWorn = function (g, spec, f) {
var r = dw.apply(this, arguments);
try {
if (swrDress(g, spec, f)) {
if (typeof csAfter === "function")
csAfter(g);
if (typeof shadowsFor === "function")
shadowsFor(g, true);
}
}
catch (e) {
if (window.console)
console.warn("[samhain-wear] draw", e);
}
return r;
};
})();
function swrLoad(force) { return __ZC(413, 5, this, arguments, new.target); }
function swrOwned(k) { return !!SWR.own[k] || swrKeeper(); }
function swrOwnCount() { return SWR_LINE.filter(function (r) { return SWR.own[r[0]]; }).length; }
(function () {
if (typeof wearOwned === "function") {
var wo = wearOwned;
wearOwned = function (key) { var w = typeof WEAR !== "undefined" && WEAR[key]; if (w && w.samhain) {
if (!SWR.asked) {
SWR.asked = 1;
swrLoad();
}
return swrOwned(key);
} return wo.apply(this, arguments); };
}
if (typeof wearBuy === "function") {
var wb = wearBuy;
wearBuy = function (key) { var w = typeof WEAR !== "undefined" && WEAR[key]; if (w && w.samhain) {
setStatus("🍎 The <b>" + esc(w.label) + "</b> can't be bought. It's one of the Samhain line, found only on the stem of an apple in a Samhain barrel.");
return;
} return wb.apply(this, arguments); };
}
})();
function swrWear(k, on) { return __ZC(413, 6, this, arguments, new.target); }
function swrMyLine() { return __ZC(413, 7, this, arguments, new.target); }
function swrGive(k) { return __ZC(413, 8, this, arguments, new.target); }
var SWR_TUB = { W: 300, H: 300, R: 132 };
function swrBob(o) { return __ZC(413, 9, this, arguments, new.target); }
function swrBobStop() { var B = SWR.bob; if (!B)
return; cancelAnimationFrame(B.raf); window.removeEventListener("keydown", B.kd, true); window.removeEventListener("keyup", B.ku, true); if (B.pu)
window.removeEventListener("pointerup", B.pu, true); SWR.bob = null; }
function swrSay(s) { var B = SWR.bob; if (!B)
return; B.say = s; var e = document.getElementById("swr-tubsay"); if (e)
e.innerHTML = s; }
function swrBobFrame() {
var B = SWR.bob;
if (!B)
return;
if (!document.getElementById("swr-tub")) {
swrBobStop();
return;
}
var now = performance.now(), dt = Math.min(0.05, (now - B.last) / 1000);
B.last = now;
if (!B.done)
swrBobStep(B, dt);
swrBobDraw(B);
B.raf = requestAnimationFrame(swrBobFrame);
}
function swrBobStep(B, dt) { return __ZC(413, 10, this, arguments, new.target); }
function swrBite() { return __ZC(413, 11, this, arguments, new.target); }
function swrCaught(kind) { return __ZC(413, 12, this, arguments, new.target); }
function swrTicketOffer(t, say) { return __ZC(413, 13, this, arguments, new.target); }
function swrPrizeCard(k) { return __ZC(413, 14, this, arguments, new.target); }
function swrBobEnd(head) { return __ZC(413, 15, this, arguments, new.target); }
function swrBobDraw(B) { return __ZC(413, 16, this, arguments, new.target); }
if (typeof shnBobStart === "function")
shnBobStart = function () {
swrBob({ where: "Hollowmere", onCatch: function (k, n) { if (n === 1 && typeof shnReward === "function")
try {
shnReward("bob", "🍎 <b>Got it!</b> You come up soaked to the ears, an apple in your teeth. They say if you sleep with it under your pillow, you'll dream of your true love.");
}
catch (e) { } } });
};
if (typeof SHC_STALLS !== "undefined") {
SHC_STALLS.push({ k: "apples", n: "Bobbing for Apples", sub: "a prize on some stems!", col: "#E8402A", verb: "bob for apples (free)" });
SHC_STALLS.push({ k: "costumes", n: "Mortlake's Costumes", sub: "costumes for grown-ups", col: "#B07AF0", verb: "look round the costume shop" });
}
(function () {
if (typeof shcStallGo === "function") {
var sg = shcStallGo;
shcStallGo = function (k) { if (k === "apples")
return swrBob({ where: "the Samhain Fair" }); if (k === "costumes")
return swrShopOpen(); return sg.apply(this, arguments); };
}
if (typeof shcFairBuild === "function") {
var fb = shcFairBuild;
shcFairBuild = function () { var r = fb.apply(this, arguments); try {
swrFairProps();
}
catch (e) {
if (window.console)
console.warn("[samhain-wear] fair", e);
} return r; };
}
if (typeof shcMenu === "function") {
var sm = shcMenu;
shcMenu = function () { var r = sm.apply(this, arguments); swrMenuBtn(); return r; };
}
if (typeof kzsBuild === "function") {
var kb = kzsBuild;
kzsBuild = function (G) { var r = kb.apply(this, arguments); try {
if (kzsOn())
swrKidsBuild(G);
}
catch (e) {
if (window.console)
console.warn("[samhain-wear] kids", e);
} return r; };
}
})();
function swrMenuBtn() { return __ZC(413, 17, this, arguments, new.target); }
function swrDummy(parent, look, x, z, rot, s) { return __ZC(413, 18, this, arguments, new.target); }
function swrSetLook(k) { var S = SWR_SETS.filter(function (s) { return s[0] === k; })[0]; return S ? Object.assign({}, S[2], SWR_SET_COL[k] || {}) : {}; }
function swrFairProps() { return __ZC(413, 19, this, arguments, new.target); }
var SWRS = { msg: "", busy: false, ask: null };
var SWR_KEEP_KEYS = ["layer", "back", "hat", "face", "layerColor", "backColor", "accColor"];
function swrShopSay(m) { SWRS.msg = m || ""; }
function swrSetName(S) { return S[1].replace(/^\S+ /, ""); }
function swrSetNeed(S) { return Object.keys(S[2]).map(function (lk) { return S[2][lk]; }).filter(function (v) { return v && WEAR[v] && !wearOwned(v); }); }
function swrWearing(look) { var L = meLook(); return Object.keys(look).every(function (lk) { return (L[lk] == null ? null : L[lk]) === (look[lk] == null ? null : look[lk]); }); }
function swrPutOn(look) { return __ZC(413, 20, this, arguments, new.target); }
function swrTakeOff() { return __ZC(413, 21, this, arguments, new.target); }
function swrRowsFor(keys) {
return tailorLoad().then(function (rows) {
if (keys.every(function (k) { return wearRow(rows, k); }))
return rows;
TAILOR = null;
return tailorLoad();
});
}
function swrBuyAll(keys, rows) { return __ZC(413, 22, this, arguments, new.target); }
function swrShopPick(kind, i) { return __ZC(413, 23, this, arguments, new.target); }
function swrShopYes() { return __ZC(413, 24, this, arguments, new.target); }
function swrShopOpen() { if (!SWRS.busy) {
SWRS.msg = "";
SWRS.ask = null;
} return swrShop(); }
function swrShop() { return __ZC(413, 25, this, arguments, new.target); }
function swrInKids() { return typeof KZ !== "undefined" && Math.abs(camera.position.x - KZ.base) < 6000 && Math.abs(camera.position.z) < 6000; }
function swrKidsBuild(G) { return __ZC(413, 26, this, arguments, new.target); }
function swrCloset() { return __ZC(413, 27, this, arguments, new.target); }
function swrLend(k) { return __ZC(413, 28, this, arguments, new.target); }
function swrUnlend() {
var T = store.swrLent;
if (!T)
return;
var L = meLook();
Object.keys(T.keep || {}).forEach(function (lk) { L[lk] = T.keep[lk]; });
store.swrLent = null;
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
try {
publishMyLook();
}
catch (e) { }
}
setInterval(function () { try {
if (typeof store !== "undefined" && store.swrLent && typeof walkMode !== "undefined" && walkMode && !swrInKids()) {
swrUnlend();
setStatus("🎭 Your borrowed costume hops back into the Little Moons' closet.");
}
}
catch (e) { } }, 3000);
function swrFront(D, y) { var z = -1e9, n = 0; for (var i = 0; i < D.V.length; i++) {
var q = D.V[i];
if (q.hair || q.r !== "torso" || Math.abs(q.y - y) > 0.04 * D.s)
continue;
if (q.z > z)
z = q.z;
n++;
} return n ? z : null; }
function swrHdBuild(wb, D, id) {
var s = D.s, P = [], ch = whLm(D, "chest"), nk = whLm(D, "neck"), hd = whLm(D, "head"), bC = whBone(D, "chest"), bN = whBone(D, "neck") || bC, bH = whBone(D, "head");
if (!ch || !nk)
return null;
function tint(list, col, k) { (list || []).forEach(function (p) { var q = Object.assign({}, p); q.c = col; if (k)
q.k = k; P.push(q); }); }
function rigid(g, k, c, b) { if (g && b)
P.push({ g: g, k: k, c: c, bone: b }); }
function at(g, x, y, z) { g.translate(x, y, z); return g; }
var fz = swrFront(D, ch.y);
if (fz == null)
fz = ch.z + 0.1 * s;
switch (id) {
case "ghostsheet":
tint(wb(D, "sweater"), 0xF4F4F0);
tint(wb(D, "robe"), 0xF4F4F0);
if (hd && bH) {
var dome = new THREE.SphereGeometry(0.15 * s, 16, 10);
dome.scale(1, 1.15, 1.05);
rigid(at(dome, hd.x, hd.y + 0.1 * s, hd.z + 0.01 * s), "cloth", 0xF4F4F0, bH);
[-1, 1].forEach(function (sd) { var e = new THREE.CircleGeometry(0.022 * s, 10); e.scale(1, 1.4, 1); rigid(at(e, hd.x + sd * 0.05 * s, hd.y + 0.12 * s, hd.z + 0.165 * s), "cloth", 0x101014, bH); });
}
return P;
case "jackhead":
if (!hd || !bH)
return P;
var cx = hd.x, cy = hd.y + 0.11 * s, cz = hd.z + 0.01 * s, R = 0.2 * s;
for (var j = 0; j < 6; j++) {
var jr = new THREE.SphereGeometry(R, 14, 10);
jr.scale(0.62, 0.88, 1);
jr.rotateY(j * Math.PI / 6);
rigid(at(jr, cx, cy, cz), "cloth", 0xE0701A, bH);
}
rigid(at(new THREE.CylinderGeometry(0.02 * s, 0.03 * s, 0.08 * s, 6), cx, cy + R * 0.9, cz), "cloth", 0x3A5A1A, bH);
[-1, 1].forEach(function (sd) { var e = new THREE.ConeGeometry(0.042 * s, 0.06 * s, 3); e.rotateX(0.3); rigid(at(e, cx + sd * 0.07 * s, cy + 0.04 * s, cz + R * 0.96), "gem", 0xFFC040, bH); });
rigid(at(new THREE.BoxGeometry(0.16 * s, 0.035 * s, 0.02 * s), cx, cy - 0.07 * s, cz + R * 0.95), "gem", 0xFFC040, bH);
return P;
case "candlecrown":
if (!hd || !bH)
return P;
var ky = hd.y + 0.2 * s, kz = hd.z + 0.0 * s, KR = 0.125 * s;
var band = new THREE.CylinderGeometry(KR, KR, 0.05 * s, 18, 1, true);
rigid(at(band, hd.x, ky, kz), "cloth", 0x1A1A1E, bH);
for (var c = 0; c < 7; c++) {
var a = c / 7 * Math.PI * 2;
rigid(at(new THREE.CylinderGeometry(0.016 * s, 0.016 * s, 0.13 * s, 6), hd.x + Math.cos(a) * KR, ky + 0.08 * s, kz + Math.sin(a) * KR), "cloth", 0xF0E8D0, bH);
rigid(at(new THREE.ConeGeometry(0.013 * s, 0.04 * s, 5), hd.x + Math.cos(a) * KR, ky + 0.165 * s, kz + Math.sin(a) * KR), "gem", 0xFFB040, bH);
}
return P;
case "skeletonsuit":
tint(wb(D, "sweater"), 0x141418, "cloth");
for (var r = 0; r < 4; r++) {
var rb = new THREE.BoxGeometry(0.2 * s, 0.02 * s, 0.01 * s);
rigid(at(rb, ch.x, ch.y + 0.04 * s - r * 0.06 * s, fz + 0.02 * s), "cloth", 0xEDE8DA, bC);
}
rigid(at(new THREE.BoxGeometry(0.024 * s, 0.34 * s, 0.01 * s), ch.x, ch.y - 0.08 * s, fz + 0.025 * s), "cloth", 0xEDE8DA, bC);
return P;
case "mummywraps":
tint(wb(D, "sweater"), 0xE8E0CC, "knit");
for (var t = 0; t < 3; t++) {
var st = new THREE.BoxGeometry(0.035 * s, 0.2 * s, 0.006 * s);
st.rotateZ(0.3 - t * 0.25);
rigid(at(st, ch.x - 0.08 * s + t * 0.08 * s, ch.y - 0.2 * s - t * 0.04 * s, fz + 0.03 * s), "cloth", 0xE8E0CC, bC);
}
return P;
case "pumpkinsuit":
for (var k = 0; k < 6; k++) {
var rib = new THREE.SphereGeometry(0.36 * s, 14, 10);
rib.scale(0.62, 0.8, 1);
rib.rotateY(k * Math.PI / 6);
rigid(at(rib, ch.x, ch.y - 0.1 * s, ch.z), "cloth", 0xE0701A, bC);
}
var cl = new THREE.TorusGeometry(0.075 * s, 0.025 * s, 6, 14);
cl.rotateX(Math.PI / 2);
rigid(at(cl, ch.x, ch.y + 0.18 * s, ch.z), "cloth", 0x3A6A1A, bC);
[-1, 1].forEach(function (sd) { var e = new THREE.ConeGeometry(0.035 * s, 0.05 * s, 3); e.rotateX(0.2); rigid(at(e, ch.x + sd * 0.1 * s, ch.y - 0.03 * s, ch.z + 0.345 * s), "cloth", 0x141418, bC); });
var sm = new THREE.TorusGeometry(0.1 * s, 0.016 * s, 4, 12, Math.PI);
sm.rotateZ(Math.PI);
rigid(at(sm, ch.x, ch.y - 0.13 * s, ch.z + 0.335 * s), "cloth", 0x141418, bC);
return P;
case "embertorc":
var tc = new THREE.TorusGeometry(0.075 * s, 0.011 * s, 6, 18, Math.PI * 1.7);
tc.rotateX(Math.PI / 2);
tc.rotateY(Math.PI * 0.35 - Math.PI / 2 + Math.PI);
rigid(at(tc, nk.x, nk.y - 0.02 * s, nk.z + 0.01 * s), "gold", 0xA8702A, bN);
[-1, 1].forEach(function (sd) { rigid(at(new THREE.SphereGeometry(0.016 * s, 8, 6), nk.x + sd * 0.026 * s, nk.y - 0.02 * s, nk.z + 0.085 * s), "gem", 0xFF7A20, bN); });
return P;
case "applebrooch":
rigid(at(new THREE.BoxGeometry(0.03 * s, 0.07 * s, 0.006 * s), ch.x + 0.07 * s, ch.y + 0.03 * s, fz + 0.012 * s), "cloth", 0xE06A1A, bC);
rigid(at(new THREE.SphereGeometry(0.022 * s, 10, 8), ch.x + 0.07 * s, ch.y, fz + 0.02 * s), "gold", 0xE0B030, bC);
return P;
case "cobwebgloves":
tint(wb(D, "gloves"), 0x141418, "cloth");
return P;
}
return null;
}
(function () {
if (typeof whWants === "function") {
var ww = whWants;
whWants = function (L) { var w = ww.apply(this, arguments); if (L && (L.hat === "jackhead" || L.hat === "candlecrown"))
w.push(L.hat); return w; };
}
if (typeof whBuild === "function") {
var wb = whBuild;
whBuild = function (D, id) { try {
var r = swrHdBuild(wb, D, id);
if (r)
return r;
}
catch (e) {
if (window.console)
console.warn("[samhain-wear] hd", id, e);
} return wb.apply(this, arguments); };
}
if (typeof whDress === "function") {
var wd = whDress;
whDress = function (E) {
var L = E && E.plan && E.plan.L, b = L && L.back, map = { shroud: [0xD8DEEA, "cloak"], vampcloak: [0x141418, "cape"] }[b];
if (!map)
return wd.apply(this, arguments);
var col = L.backColor;
L.back = map[1];
L.backColor = map[0];
try {
return wd.apply(this, arguments);
}
finally {
L.back = b;
L.backColor = col;
}
};
}
})();
