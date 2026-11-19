/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HDF = { base: "assets/models/characters/", files: {}, list: [], skinTex: {}, mats: {}, utils: null, utilsWait: null, failed: false,
shown: 0, max: 0, radius: 0, at: 0, clips: {}, v: null, v2: null };
var HDF_PHONE = (typeof GFX_PHONE !== "undefined") ? GFX_PHONE : /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent || "");
(function () {
if (typeof SPECIES === "undefined" || typeof SPECIES_FEATS === "undefined")
return;
[["skeleton", "Skeleton", { feats: ["bones", "thin"], s: 1 }], ["ghost", "Ghost", { feats: ["glow"], s: 1, hover: .25 }],
["yeti", "Yeti", { feats: ["wide", "beard"], s: 1.25 }], ["frogfolk", "Frogfolk", { feats: ["wide"], s: .8 }],
["lizardfolk", "Lizardfolk", { feats: ["tail:dragon", "scales"], s: .95 }], ["alien", "Alien", { feats: ["thin", "blackeyes"], s: .9 }]
].forEach(function (q) { if (SPECIES.indexOf(q[0]) < 0) {
SPECIES.push(q[0]);
SPECIES_LABEL.push(q[1]);
} if (!SPECIES_FEATS[q[0]])
SPECIES_FEATS[q[0]] = q[2]; });
})();
var HDF_KIND = {
orc: { m: "creatures/orc.glb", set: "monster" },
goblin: { m: "creatures/orc.glb", set: "monster", tint: 0x7FA65A },
skeleton: { m: ["kaykit/skeleton-minion.glb", "kaykit/skeleton-rogue.glb", "kaykit/skeleton-warrior.glb", "kaykit/skeleton-mage.glb"], set: "kaykit" },
ghost: { m: "creatures/ghost.glb", set: "flyer", ghost: true },
yeti: { m: "creatures/yeti.glb", set: "monster" },
frogfolk: { m: "creatures/frog.glb", set: "monster" },
lizardfolk: { m: "creatures/dino.glb", set: "monster" },
alien: { m: "creatures/alien.glb", set: "monster" }
};
var HDF_FOLK_NOT = /^(head|wrapped|smoketail|horsebody|goatlegs|birdlegs|blocky|see-through|faceless)$/;
var HDF_FOLK_AS = { goblin: "goblin", skeleton: "skeleton", troll: "orc", ogre: "orc", oni: "orc", alien: "alien", grey: "alien" };
var HDF_FOLK_KIT = { trooper: 1, cyborg: 1, spacewalker: 1 };
function hdfFolk(spec) {
if (!spec || typeof CREATURE === "undefined" || HDF_FOLK_KIT[spec.archetype])
return null;
var o = CREATURE[spec.archetype];
if (!o || o.kind !== "folk")
return null;
return o.feats.some(function (f) { return HDF_FOLK_NOT.test(f.split(":")[0]); }) ? null : o;
}
function hdfFolkHas(o, k) { return !!o && o.feats.some(function (f) { return f.split(":")[0] === k; }); }
var HDF_CLIPS = {
human: { idle: "Idle_Loop", walk: "Walk_Loop", run: "Jog_Fwd_Loop", sit: "Sitting_Idle_Loop", drive: "Driving_Loop", attack: "Sword_Attack", cast: "Spell_Simple_Shoot", from: "quaternius/anims-ual1.glb" },
monster: { idle: "Idle", walk: "Walk", run: "Run", sit: "Duck", attack: "Weapon", cast: "Punch", hurt: "HitReact", fall: "Death" },
flyer: { idle: "Flying_Idle", walk: "Flying_Idle", run: "Fast_Flying", sit: "Flying_Idle", attack: "Headbutt", hurt: "HitReact", fall: "Death" },
kaykit: { idle: "Idle", walk: "Walking_A", run: "Running_A", sit: "Sit_Chair_Idle", attack: "1H_Melee_Attack_Chop", cast: "Spellcast_Shoot", from: "kaykit/anims-rig-medium.glb" },
mini: { idle: "idle", walk: "walk", run: "sprint", sit: "sit", drive: "drive" }
};
var HDF_CHILD_HEAD = 1.22;
var HDF_HAIR = { long: "long", ponytail: "long", braids: "long", locs: "long", bun: "buns", buzz: "buzz", short: "parted", waves: "parted" };
var HDF_KEEP_HAIR = { afro: 1, coily: 1, curly: 1, headwrap: 1 };
var HDF_HAT = { hatcap: 1, brimcap: 1, crown: 1, brim: 1, hood: 1 };
function hdfOn() {
if (HDF.failed || location.protocol === "file:")
return false;
var c = (typeof cfg === "function") ? cfg() : {};
return c.people !== "simple";
}
function hdfBudget() {
var lite = typeof LITE !== "undefined" && LITE;
HDF.max = lite ? 10 : HDF_PHONE ? 26 : 72;
HDF.radius = lite ? 35 : HDF_PHONE ? 75 : 150;
HDF.near = lite ? 18 : HDF_PHONE ? 24 : 48;
}
function hdfUtils(cb) {
if (THREE.SkeletonUtils) {
HDF.utils = THREE.SkeletonUtils;
return cb(HDF.utils);
}
if (HDF.utilsWait) {
HDF.utilsWait.push(cb);
return;
}
HDF.utilsWait = [cb];
var s = document.createElement("script");
s.src = "assets/models/SkeletonUtils.js";
s.async = true;
s.onload = function () { if (!THREE.SkeletonUtils) {
HDF.failed = true;
return;
} HDF.utils = THREE.SkeletonUtils; var w = HDF.utilsWait; HDF.utilsWait = null; w.forEach(function (f) { try {
f(HDF.utils);
}
catch (e) {
console.warn("[people]", e);
} }); };
s.onerror = function () { HDF.failed = true; HDF.utilsWait = null; };
document.head.appendChild(s);
}
function hdfFile(file, cb) {
var F = HDF.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = HDF.files[file] = { scene: null, clips: [], bad: false, wait: [cb] };
if (typeof modelsLoader !== "function") {
F.bad = true;
return;
}
modelsLoader(function (L) {
L.load(HDF.base + file, function (gl) {
gl.scene.traverse(function (m) {
if (!m.isMesh)
return;
var ca = m.geometry && m.geometry.attributes && m.geometry.attributes.color, noVC = !!(ca && ca.itemSize === 4);
var conv = function (x) { var n = (typeof modelMat === "function") ? modelMat(x) : x.clone(); n.name = x.name || ""; if (m.isSkinnedMesh)
n.skinning = true; if (noVC)
n.vertexColors = false; return n; };
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
m.castShadow = true;
m.receiveShadow = true;
m.frustumCulled = false;
});
F.scene = gl.scene;
F.clips = gl.animations || [];
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[people]", file, e);
} });
}, undefined, function () { F.bad = true; F.wait = []; });
});
}
function hdfFiles(list, cb) {
var left = list.length, out = {}, bad = false;
if (!left)
return cb(out);
list.forEach(function (f) { hdfFile(f, function (F) { out[f] = F; if (--left === 0 && !bad)
cb(out); }); });
}
function hdfHash(s) { var h = 0; s = String(s || ""); for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function hdfTint(mat, col, k) {
var key = mat.uuid + ":" + col + ":" + k, M = HDF.mats[key];
if (M)
return M;
M = mat.clone();
M.skinning = mat.skinning;
var c = new THREE.Color(col), w = new THREE.Color(0xffffff).lerp(c, k);
M.color.multiply(w);
return (HDF.mats[key] = M);
}
var HDF_GREY = {};
function hdfGreyTex(mat, kind) { return __ZC(135, 0, this, arguments, new.target); }
function hdfGreyShaderSrgb(sh) { sh.fragmentShader = sh.fragmentShader.replace("#include <map_fragment>", "#ifdef USE_MAP\n  vec4 hgT = texture2D( map, vUv );\n  diffuseColor.rgb = sRGBToLinear( vec4( min( diffuseColor.rgb * hgT.rgb * 2.0, vec3( 1.0 ) ), 1.0 ) ).rgb;\n  diffuseColor.a *= hgT.a;\n#endif"); }
function hdfGreyShaderLin(sh) { sh.fragmentShader = sh.fragmentShader.replace("#include <map_fragment>", "#ifdef USE_MAP\n  vec4 hgT = texture2D( map, vUv );\n  diffuseColor.rgb = min( diffuseColor.rgb * hgT.rgb * 2.0, vec3( 1.0 ) );\n  diffuseColor.a *= hgT.a;\n#endif"); }
function hdfGreyMat(M, mat, kind, col) { return __ZC(135, 1, this, arguments, new.target); }
function hdfGreyClone() { var c = THREE.Material.prototype.clone.call(this); c.onBeforeCompile = this.onBeforeCompile; c.customProgramCacheKey = this.customProgramCacheKey; c.clone = hdfGreyClone; return c; }
function hdfSkinMat(mat, col) { return __ZC(135, 2, this, arguments, new.target); }
function hdfPlan(spec) {
var L = (typeof lookOf === "function") ? lookOf(spec) : (spec.look || {});
var sp = L.species || null, child = spec.archetype === "child" || L.age === "child";
var kind = sp && HDF_KIND[sp], fo = hdfFolk(spec);
if (!kind && fo && HDF_FOLK_AS[spec.archetype]) {
var fk = HDF_KIND[HDF_FOLK_AS[spec.archetype]];
kind = { m: fk.m, set: fk.set, ghost: fk.ghost, tint: (fk.m === "creatures/orc.glb" && L.skin != null) ? L.skin : fk.tint };
}
if (kind) {
var f = Array.isArray(kind.m) ? kind.m[hdfHash(spec.id) % kind.m.length] : kind.m;
var files = [f];
if (HDF_CLIPS[kind.set].from)
files.push(HDF_CLIPS[kind.set].from);
return { type: "own", files: files, main: f, set: kind.set, tint: kind.tint || null, ghost: !!kind.ghost, L: L, key: "own:" + f + ":" + (kind.tint || "") };
}
var g = L.sex === "m" ? "male" : "female", G = L.sex === "m" ? "male" : "female";
var heavy = hdfFolkHas(fo, "armor") || /armor|uniform|cloak/.test(String(L.layer || "")) || L.gear === "cloak" || L.back === "cloak" || L.hat === "hood" || /hunter|rider|guard|warden/.test(String(L.role || ""));
var out = heavy ? "ranger" : "peasant", parts = [];
if (out === "peasant")
["arms", "body", "feet", "legs"].forEach(function (p) { parts.push("quaternius/outfit-" + G + "-peasant-" + p + ".glb"); });
else {
["arms", "body", "legs"].forEach(function (p) { parts.push("quaternius/outfit-" + G + "-ranger-" + p + ".glb"); });
parts.push("quaternius/outfit-" + G + "-ranger-" + (G === "male" ? "feet-boots" : "feet") + ".glb");
if (L.hat === "hood")
parts.push("quaternius/outfit-" + G + "-ranger-head-hood.glb");
if (L.layer === "armor" || hdfFolkHas(fo, "armor"))
parts.push("quaternius/outfit-" + G + "-ranger-acc-" + (G === "male" ? "pauldron" : "pauldrons") + ".glb");
}
var style = L.hairStyle || (L.sex === "f" ? "long" : "short"), hk = HDF_HAIR[style] || "parted", hair = null;
if (L.hat !== "hood" && style !== "bald" && !hdfFolkHas(fo, "helm") && !HDF_KEEP_HAIR[style] && hk) {
hair = hk === "long" ? "hair-long" : hk === "buns" ? "hair-buns" : hk === "buzz" ? (G === "male" ? "hair-buzzed" : "hair-buzzedfemale") : "hair-simpleparted";
parts.push("quaternius/" + hair + ".glb");
}
var dv = spec.deity && typeof DEITY !== "undefined" && DEITY[spec.deity];
if (G === "male" && (L.beard || (sp && /dwarf|giant|gnome/.test(sp)) || (dv && /beard/.test(dv.icons.join(","))) || hdfFolkHas(fo, "beard")))
parts.push("quaternius/hair-beard.glb");
var body = "quaternius/body-" + g + ".glb";
return { type: "human", files: [body].concat(parts).concat([HDF_CLIPS.human.from]), body: body, parts: parts, set: "human", L: L, keepHair: !!HDF_KEEP_HAIR[style], child: child,
key: [body].concat(parts).join("|") + ":" + L.skin + ":" + L.hair + ":" + L.top + ":" + L.bottom + ":" + L.shoes + (child ? ":child" : "") };
}
function hdfColourFor(name, L) {
var n = String(name || "");
if (/Superhero|Regular/i.test(n))
return { skin: L.skin != null ? L.skin : 0xC89878 };
if (/Hair/i.test(n))
return { tint: L.hair != null ? L.hair : 0x3A2A1A, k: 0.85 };
if (/Eyes/i.test(n))
return null;
return null;
}
function hdfDress(mesh, L, part) { return __ZC(135, 3, this, arguments, new.target); }
function hdfAssemble(plan, files) {
var U = HDF.utils;
if (plan.type === "own") {
var F = files[plan.main], root = U.clone(F.scene);
root.traverse(function (m) {
if (!m.isMesh)
return;
m.frustumCulled = false;
if (plan.tint || plan.ghost) {
var conv = function (x) {
if (plan.tint && /Main|Secondary/.test(x.name))
x = hdfTint(x, plan.tint, 0.8);
if (plan.ghost) {
var k = "ghost:" + x.uuid;
if (!HDF.mats[k]) {
var g = x.clone();
g.skinning = x.skinning;
g.transparent = true;
g.opacity = 0.72;
g.depthWrite = false;
HDF.mats[k] = g;
}
x = HDF.mats[k];
}
return x;
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
}
});
var clips = F.clips.slice();
var from = HDF_CLIPS[plan.set].from;
if (from && files[from])
clips = clips.concat(files[from].clips);
return { root: root, clips: clips };
}
var B = files[plan.body], r = U.clone(B.scene), L = plan.L, bones = {}, skel = null;
r.traverse(function (m) { if (m.isBone)
bones[m.name] = m; if (m.isSkinnedMesh && !skel)
skel = m; if (m.isMesh) {
m.frustumCulled = false;
hdfDress(m, L, null);
} });
r.traverse(function (m) { if (m.isSkinnedMesh && /Superhero|SuperHero/.test(m.name))
m.geometry = hdfHeadOnly(m); });
plan.parts.forEach(function (p) {
var P = files[p];
if (!P)
return;
var c = U.clone(P.scene), move = [];
c.traverse(function (m) { if (m.isSkinnedMesh)
move.push(m); });
move.forEach(function (m) {
var nb = m.skeleton.bones.map(function (b) { return bones[b.name] || b; });
var bm = m.bindMatrix.clone();
m.bind(new THREE.Skeleton(nb, m.skeleton.boneInverses), bm);
m.frustumCulled = false;
hdfDress(m, L, p.replace(/^.*\//, ""));
if (/\/hair-(?!beard)/.test(p))
m.userData.hdfHair = 1;
var parent = (skel && skel.parent) || r;
parent.add(m);
});
});
return { root: r, clips: files[HDF_CLIPS.human.from] ? files[HDF_CLIPS.human.from].clips : [] };
}
function hdfHeadOnly(m) { return __ZC(135, 4, this, arguments, new.target); }
function hdfFitScale(root) {
root.updateMatrixWorld(true);
var b = new THREE.Box3(), v = new THREE.Vector3();
root.traverse(function (m) {
if (!m.isMesh || !m.geometry)
return;
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
var bb = m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld);
b.union(bb);
});
return b;
}
function hdfUnderLimb(m, g, body) {
var Lb = g.userData.limbs;
if (!Lb)
return false;
for (var o = m.parent; o && o !== body; o = o.parent)
if (o === Lb.la || o === Lb.ra || o === Lb.ll || o === Lb.rl)
return true;
return false;
}
function hdfHide(E) {
var g = E.g, body = g.children[0], plan = E.plan, own = plan.type === "own";
body.updateMatrixWorld(true);
var v = new THREE.Vector3(), hid = [], hats = [], backs = [], kitTop = -1e9, kitHead = null, inv = new THREE.Matrix4().copy(body.matrixWorld).invert();
body.traverse(function (m) {
if (!m.isMesh || m.userData.contact || m.userData.hdf || !m.visible)
return;
if (m.parent && m.parent.userData && m.parent.userData.hdfRoot)
return;
var p = m.userData.part;
var hide = false;
if (own)
hide = true;
else if (p) {
hide = true;
if (HDF_HAT[p] && !(p === "hood" && plan.L.hat === "hood")) {
hide = false;
hats.push(m);
}
if (p === "robe" && E.spec.deity) {
hide = false;
if (!m.userData.hdfRobe) {
m.userData.hdfRobe = 1;
m.scale.x *= 1.2;
m.scale.z *= 1.4;
(E.robes = E.robes || []).push(m);
}
}
if (plan.keepHair && /^(haircap|hairlong|bun|tail|afro|coily|locs|braid|braidband|buzzcap|waves|wrap|wrapknot|curly)$/.test(p)) {
hide = false;
hats.push(m);
}
if (p === "worn" && hdfUnderLimb(m, g, body)) { }
else if (p === "worn") {
m.getWorldPosition(v);
body.worldToLocal(v);
if (v.y > 1.6 || (v.z < -0.12 && v.y > 0.75)) {
hide = false;
if (v.y <= 1.6)
backs.push(m);
}
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
if (m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld).applyMatrix4(inv).min.y > 1.6)
hats.push(m);
}
}
else if (!p && (E.spec.deity || E.folk) && hdfUnderLimb(m, g, body))
hide = true;
else if (!p && E.folk && hdfFolkHas(E.folk, "fishtail") && m.parent === body && !(E.g.userData.hdfKit && E.g.userData.hdfKit.has(m)))
hide = false;
else if (!p && m.parent === body) {
m.getWorldPosition(v);
body.worldToLocal(v);
if (v.y > 0.3 && v.y < 1.62 && v.z > -0.12 && Math.abs(v.x) < 0.32)
hide = true;
}
if (p === "head" && !own) {
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
var bt = m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld).applyMatrix4(inv);
if (bt.max.y > kitTop) {
kitTop = bt.max.y;
kitHead = bt;
}
}
if (hide) {
m.visible = false;
hid.push(m);
}
});
E.hid = hid;
E.hatTodo = hats.length && kitTop > 0 ? { hats: hats, top: kitTop, head: kitHead } : null;
E.backTodo = backs.length ? backs : null;
}
function hdfBoneBox(mesh, hb, headOnly) { return __ZC(135, 5, this, arguments, new.target); }
function hdfBoxIn(box, hb, inv) {
var M = new THREE.Matrix4().multiplyMatrices(inv, hb.matrixWorld);
return box.clone().applyMatrix4(M);
}
var HDF_CROWN = /^(hatcap|brimcap|crown|brim|hood|haircap|hairlong|bun|tail|afro|coily|curly|locs|braid|braidband|buzzcap|waves|wrap|wrapknot)$/;
function hdfSeatHats(E) {
var T = E.hatTodo, body = E.g.children[0];
E.hatTodo = null;
if (!T || !body || !E.model)
return;
if (E.mixer)
E.mixer.update(0);
body.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(body.matrixWorld).invert(), hb = null, skull = null, all = null;
E.model.traverse(function (b) { if (!hb && b.isBone && /^head$/i.test(b.name))
hb = b; });
if (hb && T.head) {
E.model.updateMatrixWorld(true);
E.model.traverse(function (m) {
if (!m.isSkinnedMesh || !m.visible)
return;
if (/Superhero|SuperHero/.test(m.name)) {
var b = hdfBoneBox(m, hb, true);
if (b)
skull = hdfBoxIn(b, hb, inv);
}
});
E.model.traverse(function (m) {
if (!m.isSkinnedMesh || !m.visible || !m.userData.hdfHair)
return;
var b = hdfBoneBox(m, hb, false);
if (b) {
b = hdfBoxIn(b, hb, inv);
b.min.y = Math.max(b.min.y, skull ? skull.min.y + (skull.max.y - skull.min.y) * 0.45 : b.min.y);
all = (all || (skull ? skull.clone() : new THREE.Box3())).union(b);
}
});
}
if (skull) {
all = all || skull;
var K = T.head, kc = K.getCenter(new THREE.Vector3()), ks = K.getSize(new THREE.Vector3());
var sc = skull.getCenter(new THREE.Vector3()), ss = skull.getSize(new THREE.Vector3()), as = all.getSize(new THREE.Vector3());
var sFace = Math.max(0.6, Math.min(1.4, ss.x / ks.x)), sCrown = Math.max(sFace, Math.min(sFace * 1.18, Math.max(as.x, as.z * 0.92) / ks.x * 1.03));
var cTop = Math.min(all.max.y, skull.max.y + ss.y * 0.05);
var hatted = T.hats.some(function (m) { var q = m.userData.part; return q === "hatcap" || q === "crown" || q === "hood" || (q === "worn" && m.geometry.boundingBox && m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld).applyMatrix4(inv).min.y > kc.y); });
T.hats.forEach(function (m) {
var p = m.userData.part, crown = HDF_CROWN.test(p || "") || (p === "worn" && m.geometry.boundingBox && m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld).applyMatrix4(inv).min.y > kc.y);
var k = crown ? sCrown : sFace;
if (!m.userData.hdfHat)
m.userData.hdfHat = { par: m.parent, pos: m.position.clone(), quat: m.quaternion.clone(), scale: m.scale.clone() };
var P = m.parent, wp = new THREE.Vector3();
m.getWorldPosition(wp);
wp.applyMatrix4(inv);
var rel = wp.clone().sub(kc), to = new THREE.Vector3();
if (crown) {
to.set(sc.x, cTop - ks.y / 2 * k, (all.min.z + all.max.z) / 2);
}
else
to.copy(sc);
if (p === "afro") {
var ka = hatted ? 0.64 : 0.8;
rel.z -= hatted ? 0.085 : 0.06;
rel.y += hatted ? -0.035 : 0;
m.scale.multiplyScalar(ka);
m.scale.z *= 0.9;
}
if (p === "curly") {
rel.z -= 0.04;
m.scale.multiplyScalar(hatted ? 0.82 : 0.92);
}
wp.copy(to).add(rel.multiplyScalar(k)).applyMatrix4(body.matrixWorld);
P.worldToLocal(wp);
m.position.copy(wp);
m.scale.multiplyScalar(k);
if (crown && m.geometry.type === "SphereGeometry" && m.material && !Array.isArray(m.material) && m.material.side !== THREE.DoubleSide) {
var dk = "2s:" + m.material.uuid;
if (!HDF.mats[dk]) {
HDF.mats[dk] = m.material.clone();
HDF.mats[dk].side = THREE.DoubleSide;
}
m.userData.hdfMat = m.material;
m.material = HDF.mats[dk];
}
m.updateMatrixWorld(true);
hb.attach(m);
});
E.hats = T.hats;
return;
}
var top = new THREE.Box3().setFromObject(E.model).applyMatrix4(inv).max.y;
var d = Math.max(-0.3, Math.min(0.3, top - T.top)), bs = new THREE.Vector3();
body.getWorldScale(bs);
T.hats.forEach(function (m) {
var w = new THREE.Vector3();
m.parent.getWorldScale(w);
if (m.userData.hdfY == null)
m.userData.hdfY = m.position.y;
if (Math.abs(d) >= 0.02)
m.position.y = m.userData.hdfY + d * bs.y / (w.y || 1);
});
E.hats = T.hats;
}
function hdfSeatBacks(E) {
var L = E.backTodo;
E.backTodo = null;
if (!L || !E.model)
return;
var sb = null;
E.model.traverse(function (b) { if (b.isBone && !sb && /^(spine_03|spine_02|spine2|chest|upperchest)$/i.test(b.name))
sb = b; });
if (!sb)
return;
if (E.mixer)
E.mixer.update(0);
E.g.updateMatrixWorld(true);
L.forEach(function (m) { if (m.userData.hdfBack)
return; m.userData.hdfBack = { par: m.parent, pos: m.position.clone(), quat: m.quaternion.clone(), scale: m.scale.clone() }; m.updateMatrixWorld(true); sb.attach(m); });
E.backs = L;
}
function hdfAttach(E, files) {
if (E.model || !E.g || !E.g.parent)
return;
var A = hdfAssemble(E.plan, files), root = A.root, body = E.g.children[0];
if (!body)
return;
var B = hdfFitScale(root), h = B.max.y - B.min.y;
if (!(h > 0))
return;
var want = E.plan.type === "own" && E.plan.set === "flyer" ? 1.6 : 1.84;
var k = want / h;
var wrap = new THREE.Group();
wrap.userData.hdfRoot = 1;
wrap.userData.hdf = 1;
wrap.name = "hd-person";
wrap.add(root);
root.scale.setScalar(k);
root.position.set(-(B.min.x + B.max.x) / 2 * k, -B.min.y * k, -(B.min.z + B.max.z) / 2 * k);
root.traverse(function (m) { m.userData.hdf = 1; if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
m.raycast = function () { };
} });
if ((E.plan.type === "own" || E.folk) && body.scale.y > 0)
wrap.scale.set(body.scale.y / (body.scale.x || 1), 1, body.scale.y / (body.scale.z || 1));
body.add(wrap);
hdfHide(E);
var mixer = new THREE.AnimationMixer(root), set = HDF_CLIPS[E.plan.set], acts = {};
if (E.plan.child) {
var hb = null;
root.traverse(function (b) { if (b.isBone && !hb && /^head$/i.test(b.name))
hb = b; });
if (hb) {
var mu = mixer.update;
mixer.update = function (t) { var r = mu.call(this, t); hb.scale.setScalar(HDF_CHILD_HEAD); return r; };
hb.scale.setScalar(HDF_CHILD_HEAD);
}
}
["idle", "walk", "run", "sit", "drive", "attack", "cast", "hurt", "fall"].forEach(function (n) {
var nm = set[n];
if (!nm)
return;
var c = null;
for (var i = 0; i < A.clips.length; i++)
if (A.clips[i].name === nm) {
c = A.clips[i];
break;
}
if (c)
acts[n] = mixer.clipAction(c);
});
E.model = wrap;
E.mixer = mixer;
E.acts = acts;
E.state = null;
E.phase = (hdfHash(E.id) % 100) / 100;
hdfPlay(E, "idle", 0);
if (acts.idle)
acts.idle.time = E.phase * (acts.idle.getClip().duration || 1);
try {
mixer.update(0);
wrap.updateMatrixWorld(true);
}
catch (e) { }
hdfSeatHats(E);
hdfSeatBacks(E);
hdfDeityIcons(E);
if (E.folk && hdfFolkHas(E.folk, "fishtail")) {
E.shrink = [];
root.traverse(function (b) { if (b.isBone && /^thigh_[lr]$/i.test(b.name))
E.shrink.push(b); });
}
HDF.shown++;
}
function hdfDetach(E) { return __ZC(135, 6, this, arguments, new.target); }
function hdfForget(g) {
if (!g || typeof HDF === "undefined" || !HDF.list)
return;
for (var i = HDF.list.length - 1; i >= 0; i--) {
var E = HDF.list[i], eg = E.g || (E.gw && E.gw.deref());
if (eg !== g)
continue;
if (E.model)
hdfDetach(E);
E.asked = false;
E.bshJ = null;
E.g = null;
E.gw = null;
HDF.list.splice(i, 1);
}
}
var HDF_ONCE = { attack: 1, cast: 1, hurt: 1, fall: 1 };
function hdfPlay(E, n, fade) {
if (!E.acts)
return;
var a = E.acts[n] || E.acts.idle;
if (!a)
return;
if (E.cur === a)
return;
a.reset();
a.enabled = true;
a.setEffectiveWeight(1);
if (HDF_ONCE[n]) {
a.setLoop(THREE.LoopOnce, 1);
a.clampWhenFinished = true;
}
a.play();
if (E.cur && fade)
E.cur.crossFadeTo(a, fade, false);
else if (E.cur)
E.cur.stop();
E.cur = a;
E.state = n;
}
var HDF_DEITY_NOT = /^(head|skull|formless|serpenttail|tripleface|fourfaces|twoface|halfface|arms4|arms8|arms10|onehand)$/;
function hdfDeityOK(spec) {
if (!spec || spec.archetype !== "deity" || !spec.deity || typeof DEITY === "undefined")
return false;
var d = DEITY[spec.deity];
if (!d || d.dragon)
return false;
return !d.icons.some(function (t) { return HDF_DEITY_NOT.test(t.split(":")[0]); });
}
function hdfDeityIcons(E) {
if (!E.spec || !(E.spec.deity || E.folk) || !E.model)
return;
var body = E.g.children[0], kit = E.g.userData.hdfKit;
if (!body || !kit)
return;
if (E.mixer)
E.mixer.update(0);
body.updateMatrixWorld(true);
var bones = {};
E.model.traverse(function (b) { if (b.isBone && /^(head|hand_l|hand_r)$/i.test(b.name))
bones[b.name.toLowerCase()] = b; });
var inv = new THREE.Matrix4().copy(body.matrixWorld).invert(), icons = [], kitTop = null;
body.children.forEach(function (m) { if (m.userData && m.userData.part === "head") {
var b = new THREE.Box3().setFromObject(m).applyMatrix4(inv);
kitTop = b.max.y;
} });
var headTop = bones.head ? bones.head.getWorldPosition(new THREE.Vector3()).applyMatrix4(inv).y + 0.23 : null;
var dHead = (kitTop != null && headTop != null) ? Math.max(-0.3, Math.min(0.3, headTop - kitTop)) : 0;
body.children.slice().forEach(function (o) {
if (kit.has(o) || o.userData.hdfRoot || o.userData.wing)
return;
var b = new THREE.Box3().setFromObject(o);
if (b.isEmpty())
return;
b.applyMatrix4(inv);
var cx = (b.min.x + b.max.x) / 2, p = o.position, bone = null;
if ((!o.isMesh || E.folk) && p.z > 0.15 && p.z < 0.35 && p.y > 0.85 && p.y < 1.2 && Math.abs(p.x) > 0.18 && Math.abs(p.x) < 0.45)
bone = p.x < 0 ? bones.hand_r : bones.hand_l;
else if (b.min.y > 1.58 && Math.abs(cx) < 0.2)
bone = bones.head;
if (!bone)
return;
icons.push({ o: o, parent: o.parent, pos: o.position.clone(), quat: o.quaternion.clone(), scale: o.scale.clone() });
if (bone === bones.head) {
o.position.y += dHead;
o.updateMatrixWorld(true);
bone.attach(o);
}
else {
var w = bone.getWorldPosition(new THREE.Vector3());
bone.attach(o);
o.position.set(0, 0, 0);
o.updateMatrixWorld(true);
var off = new THREE.Vector3(0, 0, 0.05).applyQuaternion(body.getWorldQuaternion(new THREE.Quaternion()));
w.add(off);
o.parent.worldToLocal(w);
o.position.copy(w);
}
});
E.icons = icons;
}
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec, f) {
var g = bf.apply(this, arguments);
try {
var fo = spec && !spec.deity ? hdfFolk(spec) : null;
if (g && spec && !spec.statue && (((spec.archetype === "human" || spec.archetype === "child") && !spec.deity) || hdfDeityOK(spec) || fo))
HDF.list.push({ g: g, spec: spec, f: (f === undefined ? 1 : f), id: String(spec.id || Math.random()), model: null, born: performance.now(), gone: 0, folk: fo });
if (g && spec && (spec.deity || fo) && g.children[0])
g.userData.hdfKit = new Set(g.children[0].children);
}
catch (e) { }
return g;
};
})();
function hdfMotion(E, dt) {
var g = E.g, v = HDF.v || (HDF.v = new THREE.Vector3());
g.getWorldPosition(v);
if (!E.last) {
E.last = v.clone();
E.spd = 0;
}
var d = Math.hypot(v.x - E.last.x, v.z - E.last.z);
E.last.copy(v);
var sp = dt > 0 ? Math.min(d / dt, 40) : 0;
E.spd = E.spd + (sp - E.spd) * Math.min(1, dt * 6);
var Lb = g.userData.limbs, seated = false;
if (Lb && Lb.ll && Lb.rl && Lb.ll.rotation.x < -0.9 && Lb.rl.rotation.x < -0.9)
seated = true;
if (g.userData.pose === "sit" || g.userData.seated)
seated = true;
if (g.parent && g.parent.userData && g.parent.userData.mount)
seated = true;
if (seated)
return "sit";
if (g.userData.me) {
if (typeof rideArch !== "undefined" && rideArch && rideArch !== "dragon" && typeof RIDE_FLIES !== "undefined" && RIDE_FLIES[rideArch])
return "sit";
if (g.userData.fly > 0.5)
return "idle";
}
if (E.spd > 5.5)
return "run";
if (E.spd > 0.35)
return "walk";
return "idle";
}
var HDF_DRESS_MS = 40;
var HDF_HIDDEN_MS = 30000;
function hdfTick(dt) {
if (!HDF.list.length)
return;
var on = hdfOn();
HDF.at -= dt;
var cam = camera.position, v = HDF.v2 || (HDF.v2 = new THREE.Vector3());
if (HDF.at <= 0) {
HDF.at = 0.6;
hdfBudget();
var near = [];
for (var i = HDF.list.length - 1; i >= 0; i--) {
var E = HDF.list[i], g = E.g;
if (!g && E.gw) {
g = E.gw.deref();
if (!g) {
HDF.list.splice(i, 1);
continue;
}
}
var vis = true, o = g, top = g;
while (o) {
if (o.visible === false)
vis = false;
top = o;
o = o.parent;
}
if (top !== scene) {
if (E.model)
hdfDetach(E);
var nowG = performance.now();
if (!E.goneAt)
E.goneAt = nowG;
if (nowG - E.goneAt > 8000) {
if (typeof WeakRef !== "undefined") {
if (E.g) {
E.gw = new WeakRef(g);
E.g = null;
}
}
else if (!g.parent)
HDF.list.splice(i, 1);
else if (nowG - E.goneAt > 60000)
HDF.list.splice(i, 1);
}
continue;
}
if (!E.g) {
E.g = g;
E.gw = null;
}
E.gone = 0;
E.goneAt = 0;
if (!vis && !(g.userData && g.userData.me)) {
var nowH = performance.now();
if (!E.hidAt)
E.hidAt = nowH;
if (E.model && (!on || nowH - E.hidAt > HDF_HIDDEN_MS))
hdfDetach(E);
continue;
}
E.hidAt = 0;
if (!on) {
if (E.model)
hdfDetach(E);
continue;
}
if (E.f < 0.3 && !E.spec.city && !E.spec.hub && String(E.id).indexOf("presence_") !== 0 && E.id !== "__me") {
if (E.model)
hdfDetach(E);
continue;
}
g.getWorldPosition(v);
var d = Math.hypot(v.x - cam.x, v.z - cam.z, (v.y - cam.y) * 0.5);
if (E.spec.look && E.spec.look.src && E.spec.look.src.species === "dream" && typeof HDF_KIND !== "undefined" && HDF_KIND[E.spec.look.species])
d *= 0.3;
if (g.userData && g.userData.me)
d = 0;
near.push({ E: E, d: d });
}
near.sort(function (a, b) { return a.d - b.d; });
var t0d = performance.now();
near.forEach(function (q, k) {
q.E.d = q.d;
var E = q.E, want = k < HDF.max && q.d < HDF.radius, keep = k < HDF.max + 4 && q.d < HDF.radius * 1.25;
if (E.model && !keep) {
hdfDetach(E);
return;
}
if (!E.model && want && !E.asked && performance.now() - t0d < HDF_DRESS_MS) {
E.asked = true;
var plan;
try {
plan = hdfPlan(E.spec);
}
catch (e) {
return;
}
E.plan = plan;
hdfUtils(function () { hdfFiles(plan.files, function (files) { try {
if (hdfOn() && E.asked && !E.model)
hdfAttach(E, files);
}
catch (e) {
if (window.console)
console.warn("[people]", e);
} }); });
}
});
}
for (var j = 0; j < HDF.list.length; j++) {
var E2 = HDF.list[j];
if (!E2.model || !E2.mixer)
continue;
var st = hdfMotion(E2, dt), ud = E2.g.userData;
if (ud.act && ud.actUntil > performance.now() && E2.acts[ud.act]) {
st = ud.act;
if (ud.actSeq !== E2.actSeq) {
E2.actSeq = ud.actSeq;
if (E2.state === st) {
E2.cur = null;
E2.state = null;
}
}
}
if (st !== E2.state)
hdfPlay(E2, st, 0.25);
if (E2.cur && (st === "walk" || st === "run"))
E2.cur.timeScale = st === "walk" ? Math.max(0.6, Math.min(1.6, E2.spd / 1.4)) : Math.max(0.7, Math.min(1.5, E2.spd / 6));
else if (E2.cur)
E2.cur.timeScale = 1;
E2.acc = (E2.acc || 0) + dt;
if ((E2.d || 0) > (HDF.near || 48) && ((E2.tick = (E2.tick || 0) + 1) % 3))
continue;
E2.mixer.update(E2.acc);
E2.acc = 0;
if (E2.shrink)
for (var s2 = 0; s2 < E2.shrink.length; s2++)
E2.shrink[s2].scale.setScalar(0.02);
}
}
(function () {
if (typeof stepFigures !== "function")
return;
var sf = stepFigures;
stepFigures = function (dt) { sf.apply(this, arguments); try {
hdfTick(dt);
}
catch (e) {
if (window.console && !HDF.warned) {
HDF.warned = 1;
console.warn("[people]", e);
}
} };
})();
(function () {
if (typeof rebuildMe !== "function")
return;
var rm = rebuildMe;
rebuildMe = function () { var old = meG, r = rm.apply(this, arguments); try {
if (old && old !== meG)
hdfForget(old);
if (meG)
meG.userData.me = 1;
}
catch (e) { } return r; };
})();
function hdfSetting() {
var lite = document.getElementById("lite");
if (!lite || document.getElementById("people-on"))
return;
var lab = document.createElement("label");
lab.setAttribute("for", "people-on");
lab.textContent = "Detailed people — hand-made, animated bodies for everyone near you";
var sel = document.createElement("select");
sel.id = "people-on";
sel.innerHTML = '<option value="on">On</option><option value="simple">Off — the simple shapes</option>';
sel.value = (cfg().people === "simple") ? "simple" : "on";
sel.addEventListener("change", function () { var c = cfg(); c.people = this.value === "simple" ? "simple" : null; setCfg(c); HDF.at = 0; });
var lab0 = lite.previousElementSibling, at = (lab0 && lab0.tagName === "LABEL") ? lab0 : lite;
at.parentNode.insertBefore(lab, at);
at.parentNode.insertBefore(sel, at);
}
(function () {
if (typeof openPanel === "function") {
var o0 = openPanel;
openPanel = function () { var r = o0.apply(this, arguments); try {
hdfSetting();
}
catch (e) { } return r; };
}
if (document.readyState !== "loading")
hdfSetting();
else
document.addEventListener("DOMContentLoaded", hdfSetting);
})();
