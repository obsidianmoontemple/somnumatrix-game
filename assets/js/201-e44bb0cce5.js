/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NL = { mats: {}, tex: {}, list: [], loads: {} };
var NL_FOLK = {
goblin: { skin: "wart", col: 0x5E7A34, eyes: 0xF0C030, hunch: 0.3, claws: 1, rags: 1, bare: 1, bald: 1, ears: 1.6 },
troll: { skin: "wart", col: 0x5A6E58, eyes: 0xE8A030, hunch: 0.32, claws: 1, tusks: 1, rags: 1, bulk: 1.3, bare: 1, bald: 1, ears: 1 },
ogre: { skin: "wart", col: 0x7A8A4A, eyes: 0xE8A030, hunch: 0.2, tusks: 1, rags: 1, bulk: 1.35, bare: 1, bald: 1 },
giant: { skin: "weather", col: 0xB08A68, hunch: 0.1, rags: 1, bulk: 1.15 },
frostgiant: { skin: "frost", col: 0x9EC4DE, eyes: 0x9AE0FF, rags: 1, bulk: 1.2, bare: 1 },
witch: { skin: "wrinkle", col: 0x8A9A78, eyes: 0x7CFF8A, hunch: 0.28, claws: 1, garb: 0x1E1A24, keepHat: 1 },
vampire: { skin: "vein", col: 0xE4DEDA, eyes: 0xFF2A1A, fangs: 1, garb: 0x1A1216 },
werewolf: { skin: "fur", col: 0x4E3E30, eyes: 0xFFC020, hunch: 0.42, claws: 1, head: "wolf", rags: 1, bulk: 1.15, bare: 1 },
zombie: { skin: "rot", col: 0x7E8A6A, eyes: 0xD8E8C8, hunch: 0.25, rags: 2, claws: 1, garb: 0x3E3A2E },
mummy: { skin: "bandage", col: 0xD8CCAE, eyes: 0xFFB040, hunch: 0.12, wrap: 1 },
demon: { skin: "char", col: 0x9A2A22, eyes: 0xFFB020, horns: "big", claws: 1, fangs: 1, bulk: 1.1, bare: 1, garb: 0x1A1010, wings: 0x2A1414, bald: 1, ears: 1 },
imp: { skin: "char", col: 0xB0503A, eyes: 0xFFD040, horns: "small", claws: 1, bare: 1, garb: 0x2A1A14, wings: 0x3A1A14, bald: 1, ears: 1.3 },
siren: { skin: "scale", col: 0x6A8AA0, eyes: 0x5AF0E0 },
minotaur: { skin: "fur", col: 0x5A3A22, eyes: 0xFF3A1E, head: "bull", bulk: 1.3, rags: 1, bare: 1 },
harpy: { skin: "wrinkle", col: 0x8A7A6A, eyes: 0xFFD040, claws: 1, hunch: 0.2, rags: 1 },
gorgon: { skin: "scale", col: 0x5E8A4A, eyes: 0xFFE040, garb: 0x2E3A2A },
oni: { skin: "wart", col: 0x3E5EA8, eyes: 0xFFD040, horns: "big", tusks: 1, bulk: 1.3, bare: 1, garb: 0x6A4A1A },
faceless: { skin: "plain", col: 0xD8C8B8, head: "blank", garb: 0x2A2C32 },
tallman: { skin: "plain", col: 0xD8D4D0, head: "blank", thin: 0.72, garb: 0x141418 },
nighthag: { skin: "wrinkle", col: 0x6E6A66, eyes: 0xFF3A1E, hunch: 0.42, claws: 1, rags: 2, garb: 0x24221E },
boogeyman: { skin: "char", col: 0x1E1C22, eyes: 0xFFE040, hunch: 0.3, claws: 1, head: "blank", bulk: 1.1, bare: 1, garb: 0x121014 },
clown: { skin: "clown", col: 0xF4F0EA, eyes: 0xFF2A1A },
mutant: { skin: "wart", col: 0x7A8A5A, eyes: 0xE8F040, hunch: 0.25, claws: 1, bulk: 1.2, bare: 1, rags: 2 }
};
var NL_SPECTRE = {
ghost: { col: 0xD8E6F2, op: 0.55, ei: 0.35, eyes: 0x9ADCFF, glow: 1 },
wraith: { col: 0x1C1E26, op: 0.88, ei: 0.04, eyes: 0xFF3A1E },
banshee: { col: 0xE4ECF6, op: 0.5, ei: 0.4, eyes: 0xCFEFFF, glow: 1, hair: 1, mouth: 1 }
};
var NL_HUSKY = "../quaternius/animated-animals/husky.glb", NL_HORSE = "../quaternius/animated-animals/horse.glb";
var NL_BEAST = {
hellhound: { file: NL_HUSKY, coat: 0x1A1512, eyes: 0xFF3A1E, embers: 0xFF6A1E },
cerberus: { file: NL_HUSKY, coat: 0x181310, eyes: 0xFF3A1E, heads: 3, embers: 0xFF5A1E },
fenrir: { file: NL_HUSKY, coat: 0x6E6A66, eyes: 0xFFC040 },
nightmare: { file: NL_HORSE, coat: 0x221C1A, embers: 0xFF5A1E, mane: 0x3A1206, maneGlow: 0xC8481A, eyes: 0xFF3A1E },
kelpie: { file: NL_HORSE, coat: 0x2E4A44, mane: 0x2F5A3A, eyes: 0x9AF0C0 }
};
function nlRand(seed) { var s = (seed >>> 0) || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
function nlHex(c, k) { var C = new THREE.Color(c); if (k)
C.multiplyScalar(k); return "#" + C.getHexString(); }
function nlSkinCanvas(style, col, img) { return __ZC(201, 0, this, arguments, new.target); }
function nlSkinMat(mat, kind, cfg, bare) { return __ZC(201, 1, this, arguments, new.target); }
function nlRagMat(mat, kind, cfg) { return __ZC(201, 2, this, arguments, new.target); }
function nlGreyTex(T) { return __ZC(201, 3, this, arguments, new.target); }
function nlEyeMat(mat, col) { return __ZC(201, 4, this, arguments, new.target); }
function nlStd(col, o) { return __ZC(201, 5, this, arguments, new.target); }
function nlFurTex(col) { var k = "fur:" + col; if (NL.tex[k])
return NL.tex[k]; var T = new THREE.CanvasTexture(nlSkinCanvas("fur", col, null)); T.wrapS = T.wrapT = THREE.RepeatWrapping; return (NL.tex[k] = T); }
function nlGlowSprite(col, size, op) {
var mat = new THREE.SpriteMaterial({ map: (typeof softGlow === "function" ? softGlow() : null), color: col, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var s = new THREE.Sprite(mat);
s.scale.set(size, size, 1);
s.userData.hdf = 1;
return s;
}
function nlHorn(len, rad, col, curl, out) { return __ZC(201, 6, this, arguments, new.target); }
function nlFang(len, rad, up) { var c = new THREE.Mesh(new THREE.ConeGeometry(rad, len, 8), nlStd(0xF2EEDC, { r: 0.35 })); if (!up)
c.rotation.x = Math.PI; return c; }
function nlWolfHead(col, eyes) { return __ZC(201, 7, this, arguments, new.target); }
function nlBullHead(col, eyes) { return __ZC(201, 8, this, arguments, new.target); }
function nlBatWing(col, sd) { return __ZC(201, 9, this, arguments, new.target); }
function nlBones(root) { var B = {}; root.traverse(function (b) { if (b.isBone)
B[b.name] = b; }); return B; }
function nlAt(E, body, m, posBody, bone) {
body.add(m);
m.position.copy(posBody);
m.updateMatrixWorld(true);
bone.attach(m);
m.traverse(function (x) { x.userData.hdf = 1; if (x.isMesh) {
x.castShadow = true;
x.raycast = function () { };
} });
}
function nlDress(E) { return __ZC(201, 10, this, arguments, new.target); }
(function () {
if (typeof hdfAttach !== "function")
return;
if (typeof hdfBoneBox === "function") {
hdfBoneBox = function (mesh, hb, headOnly) {
var G = mesh.geometry, key = hb.name + (headOnly ? ":skull" : ":all");
G.userData.nlBox = G.userData.nlBox || {};
if (G.userData.nlBox[key] !== undefined)
return G.userData.nlBox[key];
var box = null;
try {
var SI = G.attributes.skinIndex, SW = G.attributes.skinWeight, hi = mesh.skeleton.bones.indexOf(hb), inv = new THREE.Matrix4().copy(hb.matrixWorld).invert(), v = new THREE.Vector3();
box = new THREE.Box3();
for (var k = 0; k < G.attributes.position.count; k++) {
if (headOnly && hi >= 0) {
var w = 0;
if (SI.getX(k) === hi)
w += SW.getX(k);
if (SI.getY(k) === hi)
w += SW.getY(k);
if (SI.getZ(k) === hi)
w += SW.getZ(k);
if (SI.getW(k) === hi)
w += SW.getW(k);
if (w < 0.6)
continue;
}
nlSkinPos(mesh, k, v).applyMatrix4(inv);
box.expandByPoint(v);
}
if (box.isEmpty())
box = null;
}
catch (e) {
box = null;
}
return (G.userData.nlBox[key] = box);
};
}
if (typeof HDF_FOLK_AS !== "undefined") {
delete HDF_FOLK_AS.troll;
delete HDF_FOLK_AS.ogre;
delete HDF_FOLK_AS.oni;
delete HDF_FOLK_AS.goblin;
}
if (typeof hdfFolk === "function") {
var hf = hdfFolk;
hdfFolk = function (spec) {
if (spec && NL_FOLK[spec.archetype] && typeof CREATURE !== "undefined") {
var o = CREATURE[spec.archetype];
if (o && o.kind === "folk")
return o;
}
return hf.apply(this, arguments);
};
}
if (typeof accessorize === "function") {
var acz = accessorize;
accessorize = function (g, spec) { if (spec && (NL_FOLK[spec.archetype] || NL_SPECTRE[spec.archetype] || NL_BEAST[spec.archetype]))
return; return acz.apply(this, arguments); };
}
if (typeof creatureLook === "function") {
var clk = creatureLook;
creatureLook = function (spec) {
var r = clk.apply(this, arguments);
try {
if (spec && NL_FOLK[spec.archetype]) {
var L = lookOf(spec);
if (!(L.src && L.src.hat === "stated"))
L.hat = "none";
}
}
catch (e) { }
return r;
};
}
var ha = hdfAttach;
hdfAttach = function (E, files) {
var r = ha.apply(this, arguments);
try {
if (E.model && E.spec && NL_FOLK[E.spec.archetype])
nlDress(E);
}
catch (e) {
if (window.console)
console.warn("[nightmare look]", e);
}
return r;
};
var hd = hdfDetach;
hdfDetach = function (E) {
E.nlPose = null;
E.nlWings = null;
(E.nlHid || []).forEach(function (m) { m.visible = true; });
E.nlHid = null;
if (E.nlRx && E.g.children[0]) {
E.g.children[0].rotation.x = E.nlRx;
E.nlRx = 0;
}
return hd.apply(this, arguments);
};
})();
function nlSpectre(spec, o, V) { return __ZC(201, 11, this, arguments, new.target); }
(function () {
if (typeof buildFloat !== "function")
return;
var bfl = buildFloat;
buildFloat = function (spec, f, o) {
var V = spec && NL_SPECTRE[spec.archetype];
if (V && o && !hasFeat(o, "jelly") && !hasFeat(o, "eye")) {
try {
return nlSpectre(spec, o, V);
}
catch (e) {
if (window.console)
console.warn("[nightmare look]", e);
}
}
return bfl.apply(this, arguments);
};
})();
function nlCoatMat(mat, cfg, role) { return __ZC(201, 12, this, arguments, new.target); }
function nlSkinPos(m, i, out) { return __ZC(201, 13, this, arguments, new.target); }
function nlBoneBox(m, bone, toFrame) { return __ZC(201, 14, this, arguments, new.target); }
function nlBeastVerts(root, ginv) { return __ZC(201, 15, this, arguments, new.target); }
function nlBeastPieces(root, ginv, noFlip) { return __ZC(201, 16, this, arguments, new.target); }
function nlBeastCut(root, ginv, P, wrap) { return __ZC(201, 17, this, arguments, new.target); }
function nlBeastAttach(g, spec, cfg) { return __ZC(201, 18, this, arguments, new.target); }
function nlBeastMove(g, t, dt) { return __ZC(201, 19, this, arguments, new.target); }
(function () {
if (typeof buildBeast !== "function")
return;
var bb = buildBeast;
buildBeast = function (spec, f, o) {
var g = bb.apply(this, arguments), cfg = spec && NL_BEAST[spec.archetype];
if (!g || !cfg)
return g;
var prev = g.userData.anim, at = 0;
g.userData.anim = function (t, dt) {
if (prev)
prev(t, dt);
try {
if (!g.userData.nlModel && !g.userData.nlAsked) {
at -= dt || 0.016;
if (at <= 0) {
at = 1;
if (typeof hdfOn === "function" && hdfOn() && camera) {
var p = g.getWorldPosition(new THREE.Vector3());
if (Math.hypot(p.x - camera.position.x, p.z - camera.position.z) < (typeof LITE !== "undefined" && LITE ? 60 : 180)) {
g.userData.nlAsked = true;
nlBeastAttach(g, spec, cfg);
}
}
}
}
nlBeastMove(g, t, dt || 0.016);
}
catch (e) { }
};
return g;
};
})();
