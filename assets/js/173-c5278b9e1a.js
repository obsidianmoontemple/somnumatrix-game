/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SP_SKINS = {
orc: [0x5E7A3A, 0x6B8A44, 0x4E6A34, 0x7A8A52, 0x8A9A5E, 0x5A6E4A, 0x6A7A3E, 0x48602E, 0x7E8E66, 0x3E5A2E],
goblin: [0x7FA65A, 0x8AB060, 0x6E9A4A, 0x9AB86A, 0x7A9A3E, 0xA0B070, 0x6A8A3A, 0x8AA04A],
tiefling: [0xB8423A, 0x9A2E2E, 0xC8604A, 0x7A2E4A, 0x8A4A8A, 0x6A3A7A, 0x4A4A8A, 0xC88AA0, 0xA03A5A, 0x5A2A3A],
dragonborn: [0xB8863A, 0xA0602E, 0xC8A040, 0x8A2E22, 0x2E5A8A, 0x3A6E3A, 0x2E2E34, 0xD8DCE0, 0x7A8A9A, 0xA67A3A, 0x5A3A7A, 0x2E7A7A],
fairy: [0xF6E8F4, 0xE6F4EC, 0xF4ECD8, 0xDDEBF8, 0xEBDDF8, 0xCDEBD6],
angel: [0xFBF4EA, 0xF4E6CE, 0xEAD4A6],
elf: [0xEEF4F4, 0xCCDCEA, 0x7A7A9A, 0x56567A]
};
var SP_OWN = { orc: 1, goblin: 1, tiefling: 1, dragonborn: 1 };
var SP_EYES = { dragonborn: 0xE8B030, tiefling: 0xF0C040, goblin: 0xD8C040, orc: 0xC8402A, fairy: 0x7AD8E8, angel: 0x9AC8FF, elf: 0x6AC89A };
var SP_PAT = { dragonborn: "scales", orc: "rough", goblin: "spots", fairy: "shimmer", tiefling: "shade" };
var SP_NOW = null, SP_WARD = null, SP_LIVE = [];
function spSkinFix(L) {
if (!L || !L.species || !SP_OWN[L.species] || L.skin == null)
return L;
var pal = SP_SKINS[L.species];
if (pal.indexOf(L.skin) > -1)
return L;
var i = SKIN.indexOf(L.skin);
if (i > -1) {
L.skin = pal[i % pal.length];
return L;
}
var c = new THREE.Color(L.skin), hsl = {};
c.getHSL(hsl);
if (hsl.h > 0.015 && hsl.h < 0.13 && hsl.s < 0.8 && hsl.l > 0.12 && hsl.l < 0.92)
L.skin = pal[Math.min(pal.length - 1, Math.floor((1 - hsl.l) * pal.length * 1.2) % pal.length)];
return L;
}
(function () {
var lo = lookOf;
lookOf = function (spec) { var L = lo.apply(this, arguments); try {
spSkinFix(L);
}
catch (e) { } return L; };
if (typeof meLook === "function") {
var ml = meLook;
meLook = function () { var L = ml.apply(this, arguments); try {
spSkinFix(L);
}
catch (e) { } return L; };
}
var sw = swatchRow;
swatchRow = function (title, src, colors, current, onPick) {
if (title === "Skin" && colors === SKIN && SP_WARD && SP_SKINS[SP_WARD])
colors = SP_OWN[SP_WARD] ? SP_SKINS[SP_WARD].slice() : SP_SKINS[SP_WARD].concat(SKIN);
return sw.call(this, title, src, colors, current, onPick);
};
if (typeof renderWardrobe === "function") {
var rw = renderWardrobe;
renderWardrobe = function () { try {
SP_WARD = meLook().species || null;
}
catch (e) {
SP_WARD = null;
} try {
return rw.apply(this, arguments);
}
finally {
SP_WARD = null;
} };
}
})();
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec, f) { try {
if (spec && spec.look)
spSkinFix(spec.look);
}
catch (e) { } return bf.apply(this, arguments); };
})();
(function () {
if (typeof hdfPlan !== "function")
return;
var hp = hdfPlan;
hdfPlan = function (spec) {
var L = (typeof lookOf === "function") ? lookOf(spec) : (spec.look || {}), sp = L && L.species;
if ((sp === "orc" || sp === "goblin") && !(L.src && L.src.species === "dream") && spec.archetype !== "child") {
var L2 = Object.assign({}, L, { species: null, _sp: sp }), s2 = Object.assign({}, spec, { look: L2 });
var pl = hp.call(this, s2);
if (pl && pl.key)
pl.key += ":" + sp;
return pl;
}
var p = hp.apply(this, arguments);
if (p && p.type === "human" && sp && p.L) {
p.L = Object.assign({}, p.L, { _sp: sp });
p.key += ":" + sp;
}
return p;
};
var ha = hdfAssemble;
hdfAssemble = function (plan, files) {
SP_NOW = plan && plan.L ? (plan.L._sp || plan.L.species || null) : null;
try {
return ha.apply(this, arguments);
}
finally {
SP_NOW = null;
}
};
var hc = hdfColourFor;
hdfColourFor = function (name, L) {
var sp = L && (L._sp || L.species);
if (sp && SP_EYES[sp] && /Eyes/i.test(String(name || "")))
return { tint: SP_EYES[sp], k: 0.85 };
return hc.apply(this, arguments);
};
var hs = hdfSkinMat;
hdfSkinMat = function (mat, col) {
var pat = SP_NOW && SP_PAT[SP_NOW];
if (!pat)
return hs.apply(this, arguments);
var key = mat.uuid + ":skin:" + col + ":" + pat, M = HDF.mats[key];
if (M)
return M;
var base = hs.call(this, mat, col);
M = base.clone();
M.skinning = base.skinning;
var src = base.map && base.map.image;
if (src && src.width) {
try {
var cv = document.createElement("canvas");
cv.width = src.width;
cv.height = src.height;
var x = cv.getContext("2d");
x.drawImage(src, 0, 0);
spPattern(x, cv.width, cv.height, pat, col);
var T = new THREE.CanvasTexture(cv);
T.flipY = base.map.flipY;
T.encoding = base.map.encoding;
T.wrapS = base.map.wrapS;
T.wrapT = base.map.wrapT;
M.map = T;
if (pat === "shimmer") {
M.emissive = new THREE.Color(0x2A2A3A);
}
}
catch (e) { }
}
M.needsUpdate = true;
return (HDF.mats[key] = M);
};
})();
function spPattern(x, w, h, pat, col) { return __ZC(173, 0, this, arguments, new.target); }
function spHornGeo(pts, r0, seg) { return __ZC(173, 1, this, arguments, new.target); }
function spMat(col, o) { var m = new THREE.MeshLambertMaterial({ color: col }); if (o && o.side)
m.side = THREE.DoubleSide; if (o && o.em)
m.emissive = new THREE.Color(o.em); return m; }
function spEar(sd, len, wide, skin, hy, droop) { return __ZC(173, 2, this, arguments, new.target); }
function spDragonWing(sd, col) { return __ZC(173, 3, this, arguments, new.target); }
function spFeatherTex() { return __ZC(173, 4, this, arguments, new.target); }
function spFeatherWing(sd, col) { return __ZC(173, 5, this, arguments, new.target); }
function spFairyTex() { return __ZC(173, 6, this, arguments, new.target); }
function spFairyWing(sd) { return __ZC(173, 7, this, arguments, new.target); }
function spDragonTail(col) { return __ZC(173, 8, this, arguments, new.target); }
function spDevilTail(col) { return __ZC(173, 9, this, arguments, new.target); }
var SP_MADE = { ears: 1, horns: 1, tusks: 1, wings: 1, tail: 1, scales: 1, halo: 1 };
function spDress(g, spec, o, sp) { return __ZC(173, 10, this, arguments, new.target); }
(function () {
if (typeof dressFolk !== "function")
return;
var df = dressFolk;
dressFolk = function (g, spec, f, o) {
if (!(o && typeof csIsSpecies === "function" && csIsSpecies(o)))
return df.apply(this, arguments);
var sp = null;
for (var k in SPECIES_FEATS)
if (SPECIES_FEATS[k] === o) {
sp = k;
break;
}
var o2 = Object.assign({}, o, { feats: o.feats.filter(function (ft) { return !SP_MADE[ft.split(":")[0]]; }) });
var r = df.call(this, g, spec, f, o2);
try {
spDress(g, spec, o, sp);
if (typeof csAfter === "function")
csAfter(g);
}
catch (e) {
if (window.console)
console.warn("race:", e);
}
return r;
};
})();
function raceTick(dt) {
if (!SP_LIVE.length)
return;
var t = performance.now() / 1000, keep = [];
for (var i = 0; i < SP_LIVE.length; i++) {
var L = SP_LIVE[i];
if (!L.g || !L.g.parent)
continue;
keep.push(L);
if (!L.g.visible)
continue;
var ph = t + L.seed * 10;
L.wings.forEach(function (w) {
var sd = w.userData.sd;
if (L.wk === "fairy")
w.rotation.y = sd * (-0.5 + Math.sin(ph * 16) * 0.45);
else if (L.wk === "dragon")
w.rotation.y = sd * (-0.42 + Math.sin(ph * 1.3) * 0.12);
else
w.rotation.y = sd * (-0.42 + Math.sin(ph * 1.1) * 0.1);
});
if (L.tail)
L.tail.rotation.y = Math.sin(ph * 1.4) * 0.22;
if (L.halo)
L.halo.position.y += Math.sin(ph * 2) * 0.0004;
}
keep.ftex = SP_LIVE.ftex;
keep.ytex = SP_LIVE.ytex;
keep.fgeo = SP_LIVE.fgeo;
SP_LIVE = keep;
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
raceTick(dt);
}
catch (e) {
if (window.console)
console.warn("race tick:", e);
} };
})();
function spSeat(E) {
var live = null;
for (var i = 0; i < SP_LIVE.length; i++)
if (SP_LIVE[i].g === E.g) {
live = SP_LIVE[i];
break;
}
if (!live || !E.model || live.seated)
return;
var body = E.g.children[0];
if (!body)
return;
if (E.mixer)
E.mixer.update(0);
body.updateMatrixWorld(true);
E.model.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(body.matrixWorld).invert(), hb = null, sb = null, skull = null, K = null;
E.model.traverse(function (b) { if (!b.isBone)
return; if (!hb && /^head$/i.test(b.name))
hb = b; if (!sb && /^(spine_03|spine_02|spine2|chest|upperchest)$/i.test(b.name))
sb = b; });
if (hb)
E.model.traverse(function (m) { if (!skull && m.isSkinnedMesh && /Superhero|SuperHero/.test(m.name)) {
var b = hdfBoneBox(m, hb, true);
if (b)
skull = hdfBoxIn(b, hb, inv);
} });
body.traverse(function (m) { if (!K && m.isMesh && m.userData.part === "head") {
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
K = m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld).applyMatrix4(inv);
} });
live.save = { hp: live.head.position.clone(), hs: live.head.scale.clone(), hq: live.head.quaternion.clone(), bp: live.back.position.clone(), bq: live.back.quaternion.clone(), bs: live.back.scale.clone() };
if (hb && skull && K) {
var kc = K.getCenter(new THREE.Vector3()), ks = K.getSize(new THREE.Vector3()), sc = skull.getCenter(new THREE.Vector3()), ss = skull.getSize(new THREE.Vector3());
var k = Math.max(0.6, Math.min(1.4, ss.x / (ks.x || 1)));
live.head.scale.setScalar(k);
live.head.position.copy(sc).sub(kc.clone().multiplyScalar(k));
live.head.updateMatrixWorld(true);
hb.attach(live.head);
}
if (sb) {
live.back.updateMatrixWorld(true);
sb.attach(live.back);
}
live.seated = true;
}
function spUnseat(E) { return __ZC(173, 11, this, arguments, new.target); }
(function () {
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E, files) { var r = ha.apply(this, arguments); try {
spSeat(E);
}
catch (e) {
if (window.console)
console.warn("race seat:", e);
} return r; };
var hd = hdfDetach;
hdfDetach = function (E) { try {
spUnseat(E);
}
catch (e) { } return hd.apply(this, arguments); };
})();
