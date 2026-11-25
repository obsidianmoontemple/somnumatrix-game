/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AT_KEY = "The Dreamskin Atelier", LW_KEY = "The Lightworks";
cityWorkplace({ key: AT_KEY, ring: "markets", arch: "shop", s: 1.4, jobs: [1780, 1781, 1782], fit: ["dressform", "dressform", "wardrobe", "displaycase", "workbench"],
note: "Skins for every kind of dreamer, shown on plinths and fitted here. Some of them glow." });
cityWorkplace({ key: LW_KEY, ring: "markets", arch: "shop", s: 1.4, jobs: [1785, 1786, 1787], fit: ["workbench", "workbench", "displaycase", "shelfgoods", "crates"],
note: "Neon, fairy lights, lamps, chandeliers and every kind of light, for your own lot." });
cityMore("xat", function (C) { cityFrontage(C, AT_KEY, 1080, 3) || cityFrontage(C, AT_KEY, 1080, 11); });
cityMore("xlw", function (C) { cityFrontage(C, LW_KEY, 1080, 6) || cityFrontage(C, LW_KEY, 1080, 13); });
var AT_SKINS = [
["human_woad", "human", "Woad-painted", 0xC89878, "woad", 0, 0x2A4AA0, 300],
["human_gilded", "human", "Gilded", 0xD8B048, "gild", 0x5A4010, 0, 700],
["human_starlit", "human", "Starlit", 0x2A2E5A, "star", 0xBFD8FF, 0, 1200],
["elf_moon", "elf", "Moon elf", 0xCCDCEA, "moon", 0x9FC8FF, 0, 1100],
["elf_wood", "elf", "Wood elf", 0xA8885A, "bark", 0, 0x5A3A1E, 400],
["elf_dusk", "elf", "Dusk elf", 0x6A5A8A, "shimmer", 0, 0, 500],
["dwarf_stone", "dwarf", "Stoneborn", 0x8A8A86, "stone", 0, 0x3A3A38, 450],
["dwarf_forge", "dwarf", "Forge-touched", 0x9A5A3A, "ember", 0xFF7A20, 0, 1100],
["dwarf_gilded", "dwarf", "Gilded dwarf", 0xC8A040, "gild", 0x5A4010, 0, 700],
["fairy_starlight", "fairy", "Starlight fairy", 0xEBDDF8, "star", 0xFFFFFF, 0, 1000],
["fairy_bluebell", "fairy", "Bluebell fairy", 0xA8C8F0, "shimmer", 0, 0, 400],
["fairy_rosepetal", "fairy", "Rosepetal fairy", 0xF4C8D8, "shimmer", 0, 0, 400],
["dragonborn_ember", "dragonborn", "Ember dragonborn", 0x2E1A16, "ember", 0xFF6A1A, 0, 1400],
["dragonborn_frost", "dragonborn", "Frost dragonborn", 0xCFE6F2, "frost", 0xBFEFFF, 0, 1400],
["dragonborn_gold", "dragonborn", "Gold dragonborn", 0xC8A040, "gild", 0x5A4010, 0, 900],
["gnome_moss", "gnome", "Mossy gnome", 0x7A9A5A, "spots", 0, 0, 300],
["gnome_clockwork", "gnome", "Clockwork gnome", 0xA88A5A, "gild", 0x3A2A10, 0, 600],
["gnome_toadstool", "gnome", "Toadstool gnome", 0xD86A5A, "dots", 0, 0xF4F0E4, 350],
["halfling_sunkissed", "halfling", "Sunkissed halfling", 0xD8A070, "freckles", 0, 0x8A5030, 250],
["halfling_harvest", "halfling", "Harvest halfling", 0xB07A4A, "rough", 0, 0, 250],
["halfling_hearth", "halfling", "Hearthglow halfling", 0xC88A5A, "ember", 0xFFB050, 0, 900],
["orc_ironhide", "orc", "Ironhide orc", 0x5A6260, "stone", 0, 0x2A2E2E, 450],
["orc_warpaint", "orc", "Warpainted orc", 0x5E7A3A, "woad", 0, 0xA02A22, 400],
["orc_bloodmoon", "orc", "Bloodmoon orc", 0x6A2A22, "rough", 0xFF3020, 0, 1100],
["goblin_bog", "goblin", "Bog goblin", 0x5A7A3A, "spots", 0, 0, 300],
["goblin_cave", "goblin", "Cave goblin", 0x7A8A8A, "rough", 0, 0, 300],
["goblin_glowcap", "goblin", "Glowcap goblin", 0x6A9A4A, "dots", 0x9AFF6A, 0x9AFF6A, 1000],
["angel_seraph", "angel", "Seraph", 0xFBF4EA, "gild", 0xFFE8A0, 0, 1400],
["angel_dawn", "angel", "Dawn angel", 0xF4D8B8, "shimmer", 0, 0, 500],
["angel_storm", "angel", "Stormwing angel", 0xC8D0DC, "frost", 0xCFE0FF, 0, 1100],
["tiefling_infernal", "tiefling", "Infernal tiefling", 0x9A2E2E, "ember", 0xFF5A20, 0, 1300],
["tiefling_amethyst", "tiefling", "Amethyst tiefling", 0x6A3A7A, "shimmer", 0xC890FF, 0, 1100],
["tiefling_midnight", "tiefling", "Midnight tiefling", 0x2A2A4A, "star", 0xA0B0FF, 0, 1200],
["giant_frost", "giant", "Frost giant", 0xBFD8E8, "frost", 0xBFEFFF, 0, 1300],
["giant_fire", "giant", "Fire giant", 0x8A3A22, "ember", 0xFF7020, 0, 1300],
["giant_hill", "giant", "Hill giant", 0xA88A6A, "stone", 0, 0x5A4A3A, 450]
].map(function (r) { return { key: r[0], sp: r[1], name: r[2], col: r[3], pat: r[4], glow: r[5], ink: r[6], price: r[7] }; });
var AT_BY = {};
AT_SKINS.forEach(function (s) { AT_BY[s.key] = s; });
var AT = { open: false, trying: null, cat: null, sp: null, msg: "", shown: null, cool: 0 };
function atSkinOf(L) {
if (!L || !L.skinKey)
return null;
var S = AT_BY[L.skinKey];
if (!S || S.sp !== (L.species || "human") || L.skin !== S.col)
return null;
return S;
}
function atOwned(key) {
if (typeof amKeeper === "function" && amKeeper())
return true;
var mine = (typeof myThings !== "undefined" && myThings) || [], S = AT_BY[key];
return mine.some(function (t) { return t && (t.archetype === "skin_" + key || (S && String(t.name || "") === S.name + " skin")); });
}
(function () {
if (typeof spSkinFix !== "function")
return;
var sf = spSkinFix;
spSkinFix = function (L) { if (atSkinOf(L))
return L; return sf.apply(this, arguments); };
})();
(function () {
if (typeof meLook !== "function")
return;
var ml = meLook;
meLook = function () { var L = ml.apply(this, arguments); try {
if (L && L.skinKey && !atSkinOf(L))
delete L.skinKey;
}
catch (e) { } return L; };
})();
var AT_NOW = null;
(function () {
if (typeof hdfPlan !== "function" || typeof hdfAssemble !== "function" || typeof hdfSkinMat !== "function")
return;
var hp = hdfPlan;
hdfPlan = function (spec) {
var p = hp.apply(this, arguments);
try {
var L = (typeof lookOf === "function") ? lookOf(spec) : (spec.look || {}), S = atSkinOf(L);
if (p && S) {
p.L = Object.assign({}, p.L || L, { _sk: S.key });
p.key = (p.key || "") + ":sk:" + S.key;
}
}
catch (e) { }
return p;
};
var ha = hdfAssemble;
hdfAssemble = function (plan) {
var was = AT_NOW;
AT_NOW = plan && plan.L && plan.L._sk ? AT_BY[plan.L._sk] || null : null;
try {
return ha.apply(this, arguments);
}
finally {
AT_NOW = was;
}
};
var hs = hdfSkinMat;
hdfSkinMat = function (mat, col) {
var S = AT_NOW, base = hs.apply(this, arguments);
if (!S)
return base;
var key = mat.uuid + ":at:" + S.key, M = HDF.mats[key];
if (M)
return M;
M = base.clone();
M.skinning = base.skinning;
var src = base.map && base.map.image;
if (src && src.width) {
try {
var w = src.width, h = src.height, cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d");
x.drawImage(src, 0, 0);
var gv = null, gx = null;
if (S.glow) {
gv = document.createElement("canvas");
gv.width = w;
gv.height = h;
gx = gv.getContext("2d");
gx.fillStyle = "#000";
gx.fillRect(0, 0, w, h);
}
atGrain(x, gx, w, h, S);
var T = new THREE.CanvasTexture(cv);
T.flipY = base.map.flipY;
T.encoding = base.map.encoding;
T.wrapS = base.map.wrapS;
T.wrapT = base.map.wrapT;
M.map = T;
if (gv && "emissiveMap" in M) {
var G = new THREE.CanvasTexture(gv);
G.flipY = base.map.flipY;
G.wrapS = base.map.wrapS;
G.wrapT = base.map.wrapT;
M.emissiveMap = G;
M.emissive = new THREE.Color(0xFFFFFF);
if ("emissiveIntensity" in M)
M.emissiveIntensity = 1;
}
else if (S.glow && M.emissive)
M.emissive = new THREE.Color(S.glow).multiplyScalar(0.3);
}
catch (e) { }
}
else if (S.glow && M.emissive)
M.emissive = new THREE.Color(S.glow).multiplyScalar(0.3);
M.needsUpdate = true;
return (HDF.mats[key] = M);
};
})();
function atGrain(x, g, w, h, S) { return __ZC(182, 0, this, arguments, new.target); }
function atWear(key, trial) { return __ZC(182, 1, this, arguments, new.target); }
function atTakeOff() {
var T = AT.trying;
if (!T)
return;
AT.trying = null;
var L = meLook();
L.species = T.species;
L.skin = T.skin;
if (T.skinKey)
L.skinKey = T.skinKey;
else
delete L.skinKey;
if (L.src)
L.src.species = T.src;
rebuildMe();
}
function atCatalogue() {
if (AT.cat || typeof cityRpc !== "function")
return Promise.resolve(AT.cat || []);
return catalogueRows().then(function (rows) { AT.cat = (rows && rows.length) ? rows : null; return rows || []; }).catch(function () { AT.cat = null; return []; });
}
function atShownPrice(arch, kind, list) { return __ZC(182, 2, this, arguments, new.target); }
function atBuy(key) { return __ZC(182, 3, this, arguments, new.target); }
var LW_LIGHTS = [
["neonheart", "Neon heart (pink)", "wall", 180], ["neonstar", "Neon star (blue)", "wall", 180], ["neonmoon", "Neon crescent moon (violet)", "wall", 180],
["neonbolt", "Neon lightning bolt (yellow)", "wall", 180], ["fairylights", "Fairy lights", "hang", 60], ["stringlights", "String lights", "hang", 80],
["festoonlights", "Festoon lights (coloured bulbs)", "hang", 110], ["icicles", "Icicle lights", "hang", 90], ["pendantlamps", "Pendant lamps", "hang", 220],
["chandelier", "Crystal chandelier", "hang", 650], ["paperlanterns", "Paper lanterns", "hang", 120], ["barlights", "Light bar", "wall", 150],
["ledstrip", "LED strip (cyan)", "wall", 70], ["ledstrippink", "LED strip (pink)", "wall", 70], ["lanternpost", "Lantern post", "ground", 160], ["uplights", "Garden uplights", "ground", 140]
].map(function (r) { return { a: r[0], name: r[1], mount: r[2], price: r[3] }; });
var LW_BY = {};
LW_LIGHTS.forEach(function (l) { LW_BY[l.a] = l; });
var LW_SPOTS = {
wall: [["door", "Over the door"], ["frontwall", "On the front wall"], ["sidel", "On the left wall"], ["sider", "On the right wall"]],
hang: [["eaves", "Along the eaves"], ["porch", "Over the path"], ["door", "Over the door"], ["garden", "Across the garden"]],
ground: [["gardenl", "Garden, left"], ["gardenr", "Garden, right"], ["path", "By the path"]]
};
(function () {
if (typeof S !== "function" || typeof KIT === "undefined")
return;
function tube(pts, col, th) {
var out = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
out.push({ g: "box", s: [L + th * 0.6, th, th], p: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0.08], r: [0, 0, Math.atan2(dy, dx)], c: col, glow: 1 });
}
return out;
}
function curve(f, n) { var p = []; for (var i = 0; i <= n; i++)
p.push(f(i / n)); return p; }
var back = { g: "box", s: [1.7, 1.5, .05], p: [0, 1, 0], c: 0x141418 };
if (!KIT.neonheart)
S("neonheart", "infra", [1.8, 2, .3], [back].concat(tube(curve(function (t) { var a = t * 6.283; return [0.05 * 16 * Math.pow(Math.sin(a), 3) * 0.75, 1.05 + 0.05 * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * 0.75]; }, 36), 0xFF4FA8, .06)), ["neon heart"]);
if (!KIT.neonstar)
S("neonstar", "infra", [1.8, 2, .3], [back].concat(tube(curve(function (t) { var k = Math.round(t * 10) % 10, a = k * 0.6283 + 1.5708, rr = k % 2 ? 0.3 : 0.68; return [Math.cos(a) * rr, 1 + Math.sin(a) * rr]; }, 10), 0x4FC8FF, .06)), ["neon star"]);
if (!KIT.neonmoon)
S("neonmoon", "infra", [1.8, 2, .3], [back].concat(tube(curve(function (t) { var a = 0.6 + t * 5.1; return [Math.cos(a) * 0.6, 1 + Math.sin(a) * 0.6]; }, 24), 0xB070FF, .06), tube(curve(function (t) { var a = 1.15 + t * 4.0; return [0.22 + Math.cos(a) * 0.45, 1 + Math.sin(a) * 0.45]; }, 20), 0xB070FF, .06)), ["neon moon"]);
if (!KIT.neonbolt)
S("neonbolt", "infra", [1.8, 2, .3], [back].concat(tube([[0.2, 1.65], [-0.25, 1.0], [0.08, 1.0], [-0.2, 0.35], [0.35, 1.15], [0.02, 1.15], [0.28, 1.65], [0.2, 1.65]], 0xFFE040, .06)), ["neon bolt", "neon lightning"]);
function sag(col, r, n, len, drop, glowCol, extra) {
var parts = [];
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n, x = -len / 2 + t * len, y = -drop * 4 * t * (1 - t);
parts.push({ g: "sph", s: [r], p: [x, y + (extra || 0), 0], c: Array.isArray(glowCol) ? glowCol[i % glowCol.length] : glowCol, glow: 1, pulse: 1 });
}
for (var j = 0; j < 8; j++) {
var t0 = j / 8, t1 = (j + 1) / 8, x0 = -len / 2 + t0 * len, x1 = -len / 2 + t1 * len, y0 = -drop * 4 * t0 * (1 - t0), y1 = -drop * 4 * t1 * (1 - t1);
parts.push({ g: "box", s: [Math.hypot(x1 - x0, y1 - y0) + .02, .015, .015], p: [(x0 + x1) / 2, (y0 + y1) / 2 + .04, 0], r: [0, 0, Math.atan2(y1 - y0, x1 - x0)], c: col });
}
return parts;
}
if (!KIT.fairylights)
S("fairylights", "infra", [8, 1, .2], sag(0x2A2622, .035, 40, 8, .5, 0xFFE8B0).map(function (p) { var q = Object.assign({}, p); q.p = [p.p[0], p.p[1] + .8, p.p[2]]; return q; })
.concat(sag(0x2A2622, .03, 32, 8, .35, 0xFFF4D8).map(function (p) { var q = Object.assign({}, p); q.p = [p.p[0] + .1, p.p[1] + .9, p.p[2] + .05]; return q; })), ["fairy lights", "twinkle lights"]);
if (!KIT.festoonlights)
S("festoonlights", "infra", [8, 1, .2], sag(0x2A2622, .09, 12, 8, .6, [0xFF5A5A, 0xFFD040, 0x5AE07A, 0x5AA8FF, 0xD070FF]).map(function (p) { var q = Object.assign({}, p); q.p = [p.p[0], p.p[1] + .8, p.p[2]]; return q; }), ["festoon lights", "party lights"]);
var ic = [{ g: "box", s: [8, .03, .03], p: [0, 1, 0], c: 0xD8E8F0 }];
for (var i = 0; i < 26; i++)
ic.push({ g: "box", s: [.03, .2 + ((i * 7) % 5) * .08, .03], p: [-3.9 + i * .31, .9 - ((i * 7) % 5) * .04, 0], c: 0xE8F4FF, glow: 1, pulse: 1 });
if (!KIT.icicles)
S("icicles", "infra", [8, 1, .2], ic, ["icicle lights"]);
var pd = [];
[-1.2, 0, 1.2].forEach(function (x) { pd.push({ g: "cyl", s: [.01, .01, .9, 4], p: [x, 1.55, 0], c: 0x1A1A1A }, { g: "cone", s: [.28, .32, 14], p: [x, 1.0, 0], r: [Math.PI, 0, 0], c: 0xC89A3A }, { g: "sph", s: [.12], p: [x, .86, 0], c: 0xFFE8B0, glow: 1 }); });
if (!KIT.pendantlamps)
S("pendantlamps", "infra", [3, 2, .7], pd, ["pendant lamps", "pendant lights"]);
var ch = [{ g: "cyl", s: [.03, .03, .8, 6], p: [0, 1.7, 0], c: 0xC8A040 }, { g: "sph", s: [.14], p: [0, 1.25, 0], c: 0xC8A040 },
{ g: "tor", s: [.7, .03], p: [0, 1.1, 0], r: [Math.PI / 2, 0, 0], c: 0xC8A040 }, { g: "tor", s: [.42, .025], p: [0, 1.38, 0], r: [Math.PI / 2, 0, 0], c: 0xC8A040 }];
for (var c1 = 0; c1 < 10; c1++) {
var a1 = c1 * 0.628;
ch.push({ g: "cyl", s: [.03, .03, .14, 6], p: [Math.cos(a1) * .7, 1.18, Math.sin(a1) * .7], c: 0xF4F0E4 }, { g: "sph", s: [.045], p: [Math.cos(a1) * .7, 1.29, Math.sin(a1) * .7], c: 0xFFD890, glow: 1, pulse: 1 }, { g: "cone", s: [.035, .14, 6], p: [Math.cos(a1 + .3) * .62, .98, Math.sin(a1 + .3) * .62], r: [Math.PI, 0, 0], c: 0xE8F4FF, glow: 1 });
}
for (var c2 = 0; c2 < 6; c2++) {
var a2 = c2 * 1.047 + .5;
ch.push({ g: "cyl", s: [.025, .025, .12, 6], p: [Math.cos(a2) * .42, 1.45, Math.sin(a2) * .42], c: 0xF4F0E4 }, { g: "sph", s: [.04], p: [Math.cos(a2) * .42, 1.55, Math.sin(a2) * .42], c: 0xFFD890, glow: 1, pulse: 1 });
}
if (!KIT.chandelier)
S("chandelier", "infra", [1.6, 2.2, 1.6], ch, ["chandelier"]);
var pl = [{ g: "box", s: [6, .02, .02], p: [0, 1.6, 0], c: 0x2A2622 }];
[[-2.4, 0xFF7A4A], [-1.2, 0xFFC850], [0, 0xFF5A7A], [1.2, 0xFFC850], [2.4, 0xFF7A4A]].forEach(function (q) { pl.push({ g: "cyl", s: [.01, .01, .2, 4], p: [q[0], 1.5, 0], c: 0x2A2622 }, { g: "sph", s: [.28], p: [q[0], 1.2, 0], c: q[1], glow: 1 }, { g: "cyl", s: [.12, .12, .04, 10], p: [q[0], 1.47, 0], c: 0x2A2622 }); });
if (!KIT.paperlanterns)
S("paperlanterns", "infra", [6, 1.8, .6], pl, ["paper lanterns", "chinese lanterns"]);
if (!KIT.barlights)
S("barlights", "infra", [3, .4, .3], [{ g: "box", s: [3, .16, .14], p: [0, .2, 0], c: 0x2A2A2E }, { g: "box", s: [2.9, .06, .06], p: [0, .12, .06], c: 0xFFF4E0, glow: 1 },
{ g: "box", s: [.06, .25, .25], p: [-1.3, .2, -.08], c: 0x2A2A2E }, { g: "box", s: [.06, .25, .25], p: [1.3, .2, -.08], c: 0x2A2A2E }], ["light bar", "bar lights"]);
if (!KIT.ledstrip)
S("ledstrip", "infra", [6, .1, .1], [{ g: "box", s: [6, .05, .04], p: [0, .05, 0], c: 0x7AE0FF, glow: 1, pulse: 1 }], ["led strip", "led lights"]);
if (!KIT.ledstrippink)
S("ledstrippink", "infra", [6, .1, .1], [{ g: "box", s: [6, .05, .04], p: [0, .05, 0], c: 0xFF7AD0, glow: 1, pulse: 1 }], ["pink led strip"]);
if (!KIT.lanternpost)
S("lanternpost", "infra", [.6, 2.4, .6], [{ g: "cyl", s: [.06, .08, 2, 8], p: [0, 1, 0], c: 0x1E1E22 }, { g: "box", s: [.34, .42, .34], p: [0, 2.15, 0], c: 0xFFE0A0, glow: 1 },
{ g: "cone", s: [.3, .2, 4], p: [0, 2.46, 0], r: [0, .785, 0], c: 0x1E1E22 }, { g: "box", s: [.4, .04, .4], p: [0, 1.93, 0], c: 0x1E1E22 }], ["lantern post", "garden lantern"]);
var up = [];
[-.8, 0, .8].forEach(function (x) { up.push({ g: "cyl", s: [.12, .14, .18, 10], p: [x, .09, 0], c: 0x2A2A2E }, { g: "cyl", s: [.1, .1, .02, 10], p: [x, .19, 0], c: 0xFFF0C8, glow: 1 }); });
if (!KIT.uplights)
S("uplights", "infra", [2, .3, .4], up, ["uplights", "garden spotlights"]);
})();
function lwPlace(home, spot, arch) { return __ZC(182, 4, this, arguments, new.target); }
var LWLOT = { groups: {}, sig: {} };
function lwApplyLots() { return __ZC(182, 5, this, arguments, new.target); }
(function () {
if (typeof applyLotDecor !== "function")
return;
var ad = applyLotDecor;
applyLotDecor = function () { var r = ad.apply(this, arguments); try {
lwApplyLots();
}
catch (e) {
if (window.console)
console.warn("lot lights:", e);
} return r; };
})();
function lwOwnedCount(a) {
if (typeof amKeeper === "function" && amKeeper())
return 99;
var mine = (typeof myThings !== "undefined" && myThings) || [], L = LW_BY[a];
return mine.filter(function (t) { return t && (t.archetype === a || (L && String(t.name || "") === L.name)); }).length;
}
var LWD = { rec: null, board: null, lights: null, open: false, msg: "" };
(function () {
if (typeof offerToDress !== "function")
return;
offerToDress = function (rec, board) {
if (!rec || !ownLot(rec.lot_id))
return setStatus("Only ground you hold can be dressed.");
LWD.rec = rec;
LWD.board = board;
LWD.lights = ((rec.decor && Array.isArray(rec.decor.lights)) ? rec.decor.lights : []).map(function (l) { return { a: l.a, s: l.s }; });
LWD.open = true;
LWD.msg = "";
Promise.resolve(typeof loadThings === "function" ? loadThings() : null).then(lwdPaint);
lwdPaint();
};
})();
function lwdPaint() { return __ZC(182, 6, this, arguments, new.target); }
function lwdClick(e) { return __ZC(182, 7, this, arguments, new.target); }
function lwBuy(a) { return __ZC(182, 8, this, arguments, new.target); }
function atBounds() { return __ZC(182, 9, this, arguments, new.target); }
function atLook(S, i) { return __ZC(182, 10, this, arguments, new.target); }
function atPlinthFigure(G, S, i, x, z, side) { return __ZC(182, 11, this, arguments, new.target); }
function atFurnish() { return __ZC(182, 12, this, arguments, new.target); }
(function () {
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
eb.apply(this, arguments);
try {
atFurnish();
}
catch (e) {
if (window.console)
console.warn("atelier:", e);
}
if (INT && INT.atShop === AT_KEY) {
AT.open = true;
AT.msg = "";
atCatalogue();
if (typeof loadThings === "function" && typeof signedIn === "function" && signedIn())
loadThings().then(atPaint);
setStatus("<b>The Dreamskin Atelier.</b> Every kind of dreamer stands on a plinth in the Atelier's newest skin. Try one on, and buy it to wear for good.");
}
if (INT && INT.atShop === LW_KEY) {
AT.open = true;
AT.msg = "";
atCatalogue();
setStatus("<b>The Lightworks.</b> Every light here is for sale: hang what you buy on your own lot.");
}
atPaint();
};
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () { var was = INT && INT.atShop; ex.apply(this, arguments); if (was) {
AT.open = false;
if (AT.trying)
atTakeOff();
atPaint();
} };
}
})();
function atPaint() { return __ZC(182, 13, this, arguments, new.target); }
function atClick(e) { return __ZC(182, 14, this, arguments, new.target); }
(function () {
if (typeof renderWardrobe !== "function")
return;
var rw = renderWardrobe;
renderWardrobe = function () {
rw.apply(this, arguments);
try {
if (typeof WARD_TAB !== "undefined" && WARD_TAB !== "body")
return;
var w = document.getElementById("me-ward");
if (!w)
return;
var L = meLook(), sp = L.species || "human", cur = atSkinOf(L);
var mine = AT_SKINS.filter(function (s) { return atOwned(s.key); });
var d = document.createElement("div");
d.className = "lk-row";
d.innerHTML = '<div class="lk-h">Atelier skins</div>' + (mine.length ? mine.map(function (s) { return '<button class="btn" data-atw="' + s.key + '" style="margin:0 4px 4px 0' + (cur === s ? ';border-color:#C9A040;color:#F4E6C0' : '') + '">' + esc(s.name) + (s.sp !== sp ? ' <span style="opacity:.7">(' + esc(String(s.sp).charAt(0).toUpperCase() + String(s.sp).slice(1)) + ')</span>' : '') + '</button>'; }).join("") :
'<span style="font-size:12px;color:var(--dim,#999)">None of your own yet. The Dreamskin Atelier on Guild Street has three for every kind, some of which glow.</span>');
var foot = w.querySelector("p:last-of-type");
if (foot)
w.insertBefore(d, foot);
else
w.appendChild(d);
Array.prototype.forEach.call(d.querySelectorAll("[data-atw]"), function (b) { b.onclick = function () { atWear(b.getAttribute("data-atw"), false); renderWardrobe(); }; });
}
catch (e) { }
};
})();
