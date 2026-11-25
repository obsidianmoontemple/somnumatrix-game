/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WEAR = {
jacket: { slot: "layer", label: "Jacket", price: 0 }, longcoat: { slot: "layer", label: "Long coat", price: 0 },
vest: { slot: "layer", label: "Waistcoat", price: 0 }, hoodie: { slot: "layer", label: "Hoodie", price: 0 },
sweater: { slot: "layer", label: "Sweater", price: 0 }, tunic: { slot: "layer", label: "Tunic", price: 0 },
apron: { slot: "layer", label: "Apron", price: 0 },
suit: { slot: "layer", label: "Suit and tie", price: 600 }, kimono: { slot: "layer", label: "Kimono", price: 500 },
labcoat: { slot: "layer", label: "Lab coat", price: 250 }, uniform: { slot: "layer", label: "Uniform", price: 350 },
armor: { slot: "layer", label: "Armour", price: 1500 },
cape: { slot: "back", label: "Cape", price: 400 }, cloak: { slot: "back", label: "Hooded cloak", price: 450 },
backpack: { slot: "back", label: "Backpack", price: 200 },
cap: { slot: "hat", label: "Cap", price: 0 }, brimmed: { slot: "hat", label: "Brimmed hat", price: 0 }, hood: { slot: "hat", label: "Hood", price: 0 },
beanie: { slot: "hat", label: "Beanie", price: 0 }, bandana: { slot: "hat", label: "Bandana", price: 0 },
tophat: { slot: "hat", label: "Top hat", price: 120 }, cowboy: { slot: "hat", label: "Cowboy hat", price: 150 },
wizard: { slot: "hat", label: "Wizard's hat", price: 300 }, witch: { slot: "hat", label: "Witch's hat", price: 300 },
helmet: { slot: "hat", label: "Helmet", price: 400 }, flowercrown: { slot: "hat", label: "Flower crown", price: 90 },
tiara: { slot: "hat", label: "Tiara", price: 900 }, crown: { slot: "hat", label: "Crown", price: 2000 },
vinecrown: { slot: "hat", label: "Bacchanal crown of vines", price: 480, prize: 1 }, jester: { slot: "hat", label: "Jester's hat", price: 220, prize: 1 },
glasses: { slot: "face", label: "Glasses", price: 0 }, mask: { slot: "face", label: "Face mask", price: 0 },
sunglasses: { slot: "face", label: "Sunglasses", price: 80 }, monocle: { slot: "face", label: "Monocle", price: 110 },
carnivalmask: { slot: "face", label: "Carnival mask", price: 120, prize: 1 }, goldmask: { slot: "face", label: "Golden Mask of the Bacchanal", price: 5000, prize: 1 },
scarf: { slot: "neck", label: "Scarf", price: 0 }, bowtie: { slot: "neck", label: "Bow tie", price: 70 }, necklace: { slot: "neck", label: "Necklace", price: 250 },
ribbon: { slot: "neck", label: "Extravaganza ribbon", price: 40, prize: 1 }, medal: { slot: "neck", label: "Grand Opening medal", price: 700, prize: 1 },
earrings: { slot: "ears", label: "Earrings", price: 150 },
gloves: { slot: "hands", label: "Gloves", price: 60 },
belt: { slot: "waist", label: "Belt", price: 0 }, satchel: { slot: "waist", label: "Satchel", price: 150 },
shoes: { slot: "feet", label: "Shoes", price: 0 }, sneakers: { slot: "feet", label: "Trainers", price: 0 }, sandals: { slot: "feet", label: "Sandals", price: 0 },
boots: { slot: "feet", label: "Boots", price: 90 }, heels: { slot: "feet", label: "Heels", price: 120 },
trousers: { slot: "legs", label: "Trousers", price: 0 }, skirt: { slot: "legs", label: "Skirt", price: 0 }, jeans: { slot: "legs", label: "Jeans", price: 0 },
shorts: { slot: "legs", label: "Shorts", price: 0 }, kilt: { slot: "legs", label: "Kilt", price: 80 }
};
var WEAR_SLOTS = [["layer", "Over your top"], ["back", "On your back"], ["hat", "On your head"], ["face", "Your face"], ["neck", "Round your neck"], ["ears", "Ears"], ["hands", "Hands"], ["waist", "At your waist"], ["feet", "On your feet"], ["legs", "Below"]];
var GOLDISH = 0xC9A04A, SILVERISH = 0xC8CCD2;
function wearOwned(key) {
var w = WEAR[key];
if (!w)
return false;
if (!w.price)
return true;
var mine = (typeof myThings !== "undefined" && myThings) || [];
return mine.some(function (t) { return t && (t.archetype === "wear_" + key || String(t.name || "").toLowerCase() === w.label.toLowerCase()); });
}
function wearMat(col) { return new THREE.MeshLambertMaterial({ color: col }); }
function wshade(col, k) { var c = new THREE.Color(col); c.multiplyScalar(k); return c.getHex(); }
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec, f) {
var g = bf.apply(this, arguments);
try {
dressWorn(g, spec, f);
}
catch (e) {
if (window.console)
console.warn("wardrobe:", e);
}
return g;
};
})();
function dressWorn(g, spec, f) {
var L = lookOf(spec), body = g.children[0], limbs = g.userData.limbs;
if (!body || !limbs)
return;
var sex = L.sex, shoulder = sex === "f" ? 0.185 : sex === "m" ? 0.225 : 0.205, hip = sex === "f" ? 0.19 : sex === "m" ? 0.165 : 0.175;
var top = L.top != null ? L.top : 0x8E877B, bottom = L.bottom != null ? L.bottom : 0x77716A, skin = L.skin != null ? L.skin : 0xB8B0A2;
var layerCol = L.layerColor != null ? L.layerColor : wshade(top, 0.62), acc = L.accColor != null ? L.accColor : 0x8A2E2E, hatCol = L.hatColor != null ? L.hatColor : 0x2A2A30;
function add(parent, geoKey, make, col, x, y, z, sx, sy, sz) {
var m = new THREE.Mesh(fg(geoKey, make), typeof col === "number" ? wearMat(col) : col);
m.position.set(x || 0, y || 0, z || 0);
if (sx)
m.scale.set(sx, sy || sx, sz || sx);
m.userData.part = "worn";
m.userData.wk = geoKey;
parent.add(m);
return m;
}
var near = !!(spec.filler || f >= 0.5 || spec.city || spec.hub || String(spec.id || "").indexOf("presence_") === 0 || g === undefined);
var legKind = L.bottomKind;
if (legKind === "shorts") {
[limbs.ll, limbs.rl].forEach(function (p) {
p.children.forEach(function (m) { if (m.userData.part === "leg")
m.material = wearMat(skin); });
add(p, "shortleg", function () { return new THREE.CylinderGeometry(0.082, 0.076, 0.32, 8); }, bottom, 0, -0.14, 0);
});
}
else if (legKind === "jeans") {
[limbs.ll, limbs.rl].forEach(function (p) { p.children.forEach(function (m) { if (m.userData.part === "leg")
m.material = wearMat(L.bottom != null ? L.bottom : 0x3A5A8A); }); });
}
else if (legKind === "kilt") {
[limbs.ll, limbs.rl].forEach(function (p) { p.children.forEach(function (m) { if (m.userData.part === "leg")
m.material = wearMat(skin); }); });
add(body, "kilt", function () { return new THREE.CylinderGeometry(0.19, 0.26, 0.42, 12); }, bottom, 0, 0.76, 0);
add(body, "kiltstripe", function () { return new THREE.CylinderGeometry(0.262, 0.262, 0.03, 12); }, acc, 0, 0.6, 0);
}
var feet = L.shoeKind;
if (feet && feet !== "boots")
[limbs.ll, limbs.rl].forEach(function (p) { p.children.forEach(function (m) { if (m.userData.part === "boot")
m.visible = false; }); });
if (feet && feet !== "shoes")
[limbs.ll, limbs.rl].forEach(function (p) {
var sh = L.shoes != null ? L.shoes : 0x2A2420;
if (feet === "boots" && !p.children.some(function (m) { return m.userData.part === "boot"; }))
add(p, "boot", function () { return new THREE.CylinderGeometry(0.068, 0.07, 0.3, 8); }, sh, 0, -0.72, 0);
if (feet === "sneakers")
add(p, "sole", function () { return new THREE.BoxGeometry(0.115, 0.03, 0.26); }, 0xF2F2EE, 0, -0.905, 0.045);
if (feet === "sandals") {
p.children.forEach(function (m) { if (m.userData.part === "shoe")
m.material = wearMat(skin); });
add(p, "sandal", function () { return new THREE.BoxGeometry(0.12, 0.02, 0.26); }, sh, 0, -0.905, 0.045);
}
if (feet === "heels")
add(p, "heel", function () { return new THREE.CylinderGeometry(0.014, 0.012, 0.08, 6); }, sh, 0, -0.92, -0.06);
});
var layer = L.layer;
function sleeves(col, r) {
[limbs.la, limbs.ra].forEach(function (p) {
add(p, "sleeve" + r, function () { return new THREE.CylinderGeometry(r, r * 0.88, 0.56, 10); }, col, 0, -0.28, 0);
p.children.forEach(function (m) { if (m.userData.part === "shoulder") {
m.material = wearMat(col);
m.scale.setScalar(1.08);
} });
});
}
function shell(col, len, gap) {
var key = "shell" + shoulder + "_" + len + "_" + gap;
var m = add(body, key, function () { return new THREE.CylinderGeometry(shoulder + 0.016, 0.182, len, 24, 1, !!gap, gap ? gap / 2 : 0, Math.PI * 2 - (gap || 0)); }, col, 0, 1.57 - len / 2, 0);
m.scale.z = 0.68;
if (gap) {
m.material.side = THREE.DoubleSide;
}
return m;
}
function panels(col, len) {
[-1, 1].forEach(function (sd) { add(body, "panel" + len, function () { return new THREE.BoxGeometry(shoulder * 0.62, len, 0.025); }, col, sd * shoulder * 0.42, 1.57 - len / 2, 0.115); });
add(body, "back" + len, function () { return new THREE.BoxGeometry(shoulder * 1.7, len, 0.025); }, col, 0, 1.57 - len / 2, -0.112);
}
if (layer === "jacket" || layer === "suit" || layer === "uniform" || layer === "labcoat" || layer === "longcoat") {
var lc = layer === "labcoat" ? 0xF4F4F0 : layerCol;
shell(lc, 0.6, layer === "suit" ? 0.75 : 0.5);
sleeves(lc, 0.06);
[-1, 1].forEach(function (sd) { var lap = add(body, "lapel", function () { return new THREE.BoxGeometry(0.05, 0.18, 0.02); }, wshade(lc, 0.85), sd * 0.05, 1.47, 0.13); lap.rotation.z = sd * 0.35; });
if (layer === "longcoat" || layer === "labcoat") {
add(body, "coatskirt", function () { return new THREE.CylinderGeometry(0.21, 0.27, 0.55, 12, 1, true); }, lc, 0, 0.74, 0).material.side = THREE.DoubleSide;
}
if (layer === "suit") {
add(body, "tie", function () { return new THREE.BoxGeometry(0.032, 0.28, 0.012); }, acc, 0, 1.38, 0.142);
add(body, "tieknot", function () { return new THREE.BoxGeometry(0.04, 0.035, 0.02); }, acc, 0, 1.53, 0.135);
}
if (layer === "uniform") {
for (var b = 0; b < 4; b++)
add(body, "button", function () { return new THREE.SphereGeometry(0.01, 6, 4); }, GOLDISH, 0.03, 1.5 - b * 0.1, 0.13);
add(body, "badge", function () { return new THREE.BoxGeometry(0.04, 0.05, 0.01); }, GOLDISH, -0.09, 1.45, 0.13);
}
}
else if (layer === "vest") {
shell(layerCol, 0.5, 0.6);
for (var vb = 0; vb < 3; vb++)
add(body, "button", function () { return new THREE.SphereGeometry(0.01, 6, 4); }, GOLDISH, 0.02, 1.42 - vb * 0.09, 0.128);
}
else if (layer === "hoodie" || layer === "sweater") {
shell(layerCol, 0.6, 0);
sleeves(layerCol, 0.062);
add(body, "band", function () { return new THREE.TorusGeometry(0.17, 0.016, 5, 14); }, wshade(layerCol, 0.8), 0, 1.0, 0).rotation.x = Math.PI / 2;
if (layer === "hoodie") {
var hb = add(body, "hoodback", function () { return new THREE.SphereGeometry(0.13, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5); }, layerCol, 0, 1.56, -0.1);
hb.rotation.x = -1.9;
add(body, "pocket", function () { return new THREE.BoxGeometry(0.2, 0.1, 0.02); }, wshade(layerCol, 0.85), 0, 1.12, 0.12);
}
}
else if (layer === "tunic") {
var tu = add(body, "tunic", function () { return new THREE.CylinderGeometry(shoulder + 0.01, 0.24, 0.85, 10); }, layerCol, 0, 1.15, 0);
tu.scale.z = 0.7;
add(body, "tunicbelt", function () { return new THREE.TorusGeometry(0.175, 0.018, 5, 14); }, 0x4A3220, 0, 1.02, 0).rotation.x = Math.PI / 2;
}
else if (layer === "kimono") {
var ki = add(body, "kimono", function () { return new THREE.CylinderGeometry(shoulder + 0.015, 0.27, 1.05, 12); }, layerCol, 0, 1.05, 0);
ki.scale.z = 0.72;
add(body, "obi", function () { return new THREE.CylinderGeometry(0.19, 0.19, 0.12, 12); }, acc, 0, 1.1, 0).scale.z = 0.75;
[limbs.la, limbs.ra].forEach(function (p) {
add(p, "kimonosleeve", function () { return new THREE.CylinderGeometry(0.07, 0.15, 0.5, 8); }, layerCol, 0, -0.3, 0);
p.children.forEach(function (m) { if (m.userData.part === "shoulder")
m.material = wearMat(layerCol); });
});
}
else if (layer === "apron") {
add(body, "apron", function () { return new THREE.BoxGeometry(0.3, 0.7, 0.02); }, L.layerColor != null ? L.layerColor : 0xF2EEE2, 0, 1.08, 0.12);
}
else if (layer === "armor") {
var bp = add(body, "breastplate" + shoulder, function () { return new THREE.CylinderGeometry(shoulder + 0.025, 0.19, 0.6, 12); }, SILVERISH, 0, 1.28, 0);
bp.scale.z = 0.7;
bp.material = new THREE.MeshPhongMaterial({ color: SILVERISH, shininess: 80, specular: 0x888888 });
[-1, 1].forEach(function (sd) { add(body, "pauldron", function () { return new THREE.SphereGeometry(0.085, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55); }, SILVERISH, sd * (shoulder + 0.04), 1.55, 0); });
add(body, "armorbelt", function () { return new THREE.TorusGeometry(0.18, 0.02, 5, 14); }, 0x4A3220, 0, 1.0, 0).rotation.x = Math.PI / 2;
}
if (L.back === "cape" || L.back === "cloak") {
var cp = add(body, "cape", function () { return new THREE.CylinderGeometry(0.2, 0.38, 1.25, 14, 1, true, Math.PI * 0.62, Math.PI * 0.76); }, L.backColor != null ? L.backColor : 0x6A1A2A, 0, 0.95, -0.02);
cp.material.side = THREE.DoubleSide;
if (L.back === "cloak" && L.hat !== "hood") {
var ch = add(body, "cloakhood", function () { return new THREE.SphereGeometry(0.15, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5); }, L.backColor != null ? L.backColor : 0x3A2E26, 0, 1.58, -0.12);
ch.rotation.x = -1.8;
}
}
else if (L.back === "backpack") {
add(body, "pack", function () { return new THREE.BoxGeometry(0.28, 0.36, 0.14); }, L.backColor != null ? L.backColor : 0x3A5A3A, 0, 1.3, -0.2);
[-1, 1].forEach(function (sd) { add(body, "strap", function () { return new THREE.BoxGeometry(0.03, 0.42, 0.02); }, 0x2A2A2A, sd * 0.09, 1.32, 0.115); });
}
var hat = L.hat;
if (hat === "beanie") {
add(body, "beanie", function () { return new THREE.SphereGeometry(0.128, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52); }, hatCol, 0, 1.745, 0);
add(body, "beaniefold", function () { return new THREE.TorusGeometry(0.122, 0.02, 5, 14); }, wshade(hatCol, 0.8), 0, 1.75, 0).rotation.x = Math.PI / 2;
}
else if (hat === "bandana") {
add(body, "bandana", function () { return new THREE.SphereGeometry(0.126, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45); }, L.hatColor != null ? L.hatColor : 0xA82A2A, 0, 1.745, 0);
}
else if (hat === "tophat") {
add(body, "tophat", function () { return new THREE.CylinderGeometry(0.1, 0.1, 0.24, 14); }, L.hatColor != null ? L.hatColor : 0x141418, 0, 1.93, 0);
add(body, "topbrim", function () { return new THREE.CylinderGeometry(0.17, 0.17, 0.012, 16); }, L.hatColor != null ? L.hatColor : 0x141418, 0, 1.815, 0);
add(body, "topband", function () { return new THREE.CylinderGeometry(0.102, 0.102, 0.04, 14); }, acc, 0, 1.84, 0);
}
else if (hat === "cowboy") {
add(body, "cbcrown", function () { return new THREE.CylinderGeometry(0.095, 0.11, 0.15, 12); }, L.hatColor != null ? L.hatColor : 0x7A5236, 0, 1.86, 0);
var cb = add(body, "cbbrim", function () { return new THREE.CylinderGeometry(0.25, 0.25, 0.012, 18); }, L.hatColor != null ? L.hatColor : 0x7A5236, 0, 1.79, 0);
cb.scale.z = 0.85;
}
else if (hat === "wizard" || hat === "witch") {
var wc = L.hatColor != null ? L.hatColor : (hat === "wizard" ? 0x2A2A6A : 0x141418);
add(body, "wizcone", function () { return new THREE.ConeGeometry(0.13, 0.42, 14); }, wc, 0, 2.0, 0).rotation.x = hat === "witch" ? -0.12 : 0;
if (hat === "witch")
add(body, "witchbrim", function () { return new THREE.CylinderGeometry(0.26, 0.26, 0.012, 18); }, wc, 0, 1.8, 0);
else
for (var st = 0; st < 4; st++)
add(body, "star", function () { return new THREE.OctahedronGeometry(0.018, 0); }, 0xF0D060, Math.cos(st * 1.6) * 0.08, 1.86 + st * 0.05, Math.sin(st * 1.6) * 0.08 + 0.03);
}
else if (hat === "helmet") {
var hm = add(body, "helmet", function () { return new THREE.SphereGeometry(0.135, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }, SILVERISH, 0, 1.735, 0);
hm.material = new THREE.MeshPhongMaterial({ color: L.hatColor != null ? L.hatColor : SILVERISH, shininess: 70, specular: 0x777777 });
}
else if (hat === "crown") {
add(body, "crownband", function () { return new THREE.CylinderGeometry(0.115, 0.115, 0.06, 14, 1, true); }, GOLDISH, 0, 1.86, 0).material.side = THREE.DoubleSide;
for (var cp2 = 0; cp2 < 6; cp2++) {
var a = cp2 * 1.047;
add(body, "crownpt", function () { return new THREE.ConeGeometry(0.022, 0.07, 5); }, GOLDISH, Math.cos(a) * 0.112, 1.92, Math.sin(a) * 0.112);
}
add(body, "jewel", function () { return new THREE.OctahedronGeometry(0.018, 0); }, 0xC0203A, 0, 1.86, 0.117);
}
else if (hat === "tiara") {
var ti = add(body, "tiara", function () { return new THREE.TorusGeometry(0.11, 0.008, 5, 18, Math.PI); }, SILVERISH, 0, 1.83, 0.02);
ti.rotation.x = -0.3;
add(body, "tiaragem", function () { return new THREE.OctahedronGeometry(0.02, 0); }, 0x6AB0E8, 0, 1.9, 0.09);
}
else if (hat === "vinecrown") {
add(body, "vinering", function () { return new THREE.TorusGeometry(0.118, 0.012, 6, 20); }, 0x3E7A2E, 0, 1.82, 0).rotation.x = Math.PI / 2;
for (var vg = 0; vg < 8; vg++) {
var va = vg * 0.785;
add(body, "vineleaf", function () { return new THREE.SphereGeometry(0.024, 6, 4); }, GOLDISH, Math.cos(va) * 0.122, 1.84, Math.sin(va) * 0.122).scale.set(1, 0.3, 0.6);
if (vg % 2 === 0)
add(body, "grapes", function () { return new THREE.SphereGeometry(0.02, 6, 5); }, 0x6A2A7A, Math.cos(va + 0.4) * 0.13, 1.79, Math.sin(va + 0.4) * 0.13);
}
}
else if (hat === "jester") {
var jc = [L.hatColor != null ? L.hatColor : 0x8A1A9A, 0xE8B020, 0x2A6AC8];
add(body, "jesterband", function () { return new THREE.CylinderGeometry(0.122, 0.122, 0.05, 14, 1, true); }, jc[0], 0, 1.8, 0).material.side = THREE.DoubleSide;
for (var jp = 0; jp < 3; jp++) {
var ja = -Math.PI / 2 + (jp - 1) * 1.1, jx = Math.cos(ja) * 0.06, jz = Math.sin(ja) * 0.06 + 0.0;
var pt3 = add(body, "jesterpoint", function () { return new THREE.ConeGeometry(0.05, 0.22, 8); }, jc[jp], jx * 2.2, 1.92, -jz * 0.4);
pt3.rotation.z = -(jp - 1) * 0.9;
pt3.rotation.x = -0.25;
add(body, "jesterbell", function () { return new THREE.SphereGeometry(0.018, 8, 6); }, GOLDISH, jx * 2.2 + (jp - 1) * 0.11, 1.96, -jz * 0.4 - 0.05);
}
}
else if (hat === "flowercrown") {
for (var fl = 0; fl < 10; fl++) {
var fa = fl * 0.628;
add(body, "flower", function () { return new THREE.SphereGeometry(0.022, 6, 4); }, [0xE8607A, 0xF0D060, 0xF4F0F0, 0xB07AD8][fl % 4], Math.cos(fa) * 0.118, 1.82, Math.sin(fa) * 0.118);
}
}
var face = L.face;
if (face === "glasses" || face === "sunglasses") {
[-1, 1].forEach(function (sd) {
add(body, "lens", function () { return new THREE.TorusGeometry(0.024, 0.004, 5, 12); }, 0x1A1A1A, sd * 0.042, 1.735, 0.112);
if (face === "sunglasses")
add(body, "shade", function () { return new THREE.CircleGeometry(0.024, 12); }, 0x101014, sd * 0.042, 1.735, 0.113);
});
add(body, "bridge", function () { return new THREE.BoxGeometry(0.03, 0.004, 0.004); }, 0x1A1A1A, 0, 1.738, 0.113);
}
else if (face === "monocle") {
add(body, "lens", function () { return new THREE.TorusGeometry(0.024, 0.004, 5, 12); }, GOLDISH, 0.042, 1.735, 0.112);
}
else if (face === "carnivalmask" || face === "goldmask") {
var mk = add(body, "carnivalmask", function () { return new THREE.CylinderGeometry(0.118, 0.118, 0.06, 14, 1, true, -0.9, 1.8); }, face === "goldmask" ? GOLDISH : (L.accColor != null ? L.accColor : 0x8A1A6A), 0, 1.74, 0);
mk.material.side = THREE.DoubleSide;
if (face === "goldmask") {
mk.material = new THREE.MeshPhongMaterial({ color: GOLDISH, shininess: 110, specular: 0xFFE9B0, side: THREE.DoubleSide });
}
[-1, 1].forEach(function (sd) { add(body, "maskfeather", function () { return new THREE.ConeGeometry(0.018, 0.14, 5); }, face === "goldmask" ? 0xF0D060 : 0x3A9AD8, sd * 0.09, 1.82, 0.07).rotation.z = -sd * 0.5; });
}
else if (face === "mask") {
add(body, "facemask", function () { return new THREE.BoxGeometry(0.15, 0.07, 0.03); }, L.accColor != null ? L.accColor : 0x6A9AC8, 0, 1.68, 0.1);
}
if (L.neck === "scarf") {
add(body, "scarf", function () { return new THREE.TorusGeometry(0.075, 0.03, 6, 14); }, acc, 0, 1.585, 0).rotation.x = Math.PI / 2;
add(body, "scarfend", function () { return new THREE.BoxGeometry(0.06, 0.24, 0.025); }, acc, 0.05, 1.45, 0.12);
}
else if (L.neck === "bowtie") {
[-1, 1].forEach(function (sd) { var bt = add(body, "bow", function () { return new THREE.ConeGeometry(0.025, 0.05, 4); }, acc, sd * 0.025, 1.56, 0.12); bt.rotation.z = sd * Math.PI / 2; });
}
else if (L.neck === "necklace") {
add(body, "chain", function () { return new THREE.TorusGeometry(0.085, 0.005, 4, 18); }, GOLDISH, 0, 1.55, 0.02).rotation.x = Math.PI / 2.3;
add(body, "pendant", function () { return new THREE.OctahedronGeometry(0.018, 0); }, 0x3A9AD8, 0, 1.48, 0.11);
}
else if (L.neck === "ribbon") {
add(body, "rosette", function () { return new THREE.CylinderGeometry(0.04, 0.04, 0.012, 14); }, 0x6A2A9A, 0.07, 1.42, 0.12).rotation.x = Math.PI / 2;
add(body, "rosettemid", function () { return new THREE.CylinderGeometry(0.022, 0.022, 0.016, 12); }, GOLDISH, 0.07, 1.42, 0.127).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (sd) { var tl = add(body, "rosettetail", function () { return new THREE.BoxGeometry(0.02, 0.07, 0.006); }, sd < 0 ? GOLDISH : 0x6A2A9A, 0.07 + sd * 0.012, 1.36, 0.122); tl.rotation.z = sd * 0.2; });
}
else if (L.neck === "medal") {
add(body, "medalband", function () { return new THREE.TorusGeometry(0.085, 0.008, 4, 18); }, 0x6A2A9A, 0, 1.55, 0.02).rotation.x = Math.PI / 2.3;
add(body, "medal", function () { return new THREE.CylinderGeometry(0.035, 0.035, 0.008, 16); }, GOLDISH, 0, 1.46, 0.115).rotation.x = Math.PI / 2;
}
if (L.ears === "earrings")
[-1, 1].forEach(function (sd) { add(body, "earring", function () { return new THREE.SphereGeometry(0.012, 6, 4); }, GOLDISH, sd * 0.112, 1.68, 0); });
if (L.hands === "gloves")
[limbs.la, limbs.ra].forEach(function (p) { p.children.forEach(function (m) { if (m.userData.part === "hand")
m.material = wearMat(L.accColor != null ? L.accColor : 0x2A2420); }); });
if (L.waist === "belt")
add(body, "belt", function () { return new THREE.TorusGeometry(hip + 0.005, 0.018, 5, 16); }, 0x3A2618, 0, 1.0, 0).rotation.x = Math.PI / 2;
else if (L.waist === "satchel") {
add(body, "satchel", function () { return new THREE.BoxGeometry(0.2, 0.16, 0.07); }, 0x7A5236, 0.2, 0.96, 0.05);
var sst = add(body, "satchelstrap", function () { return new THREE.BoxGeometry(0.025, 0.8, 0.02); }, 0x5A3A22, 0.02, 1.3, 0.12);
sst.rotation.z = 0.75;
}
if (typeof csAfter === "function")
csAfter(g);
shadowsFor(g, true);
}
(function () {
if (typeof randomLook !== "function")
return;
var rl = randomLook;
randomLook = function (seed, kind) {
var L = rl.apply(this, arguments), h = hash(String(seed) + "w");
if (kind === "child")
return L;
var layers = ["jacket", "longcoat", "vest", "hoodie", "sweater", null, null, null, "apron", "suit", "tunic"];
L.layer = pickSeed(layers, h >>> 2) || null;
if (L.layer)
L.layerColor = pickSeed(TOPS, h >>> 4);
if ((h >>> 6) % 5 === 0)
L.face = "glasses";
if ((h >>> 8) % 6 === 0)
L.neck = pickSeed(["scarf", "necklace", "bowtie"], h >>> 10);
if ((h >>> 12) % 4 === 0)
L.waist = "belt";
if ((h >>> 14) % 7 === 0)
L.back = "backpack";
L.shoeKind = pickSeed(["shoes", "shoes", "sneakers", "boots", "sandals", L.sex === "f" ? "heels" : "shoes"], h >>> 16);
L.bottomKind = L.bottomKind === "skirt" ? "skirt" : pickSeed(["trousers", "trousers", "jeans", "jeans", "shorts"], h >>> 18);
if (L.hat === "none" && (h >>> 20) % 9 === 0)
L.hat = pickSeed(["beanie", "cowboy", "tophat", "bandana"], h >>> 22);
L.accColor = pickSeed(TOPS, h >>> 24);
return L;
};
})();
var WARD_TAB = "clothes", TAILOR = null;
function tailorLoad() { return __ZC(117, 0, this, arguments, new.target); }
function wearRow(rows, k) {
var w = WEAR[k], n = w ? w.label.toLowerCase() : "";
return (rows || []).filter(function (r) { return r.archetype === "wear_" + k; })[0] || (rows || []).filter(function (r) { return String(r.name || "").toLowerCase() === n; })[0];
}
function wearShownPrice(k) { return __ZC(117, 1, this, arguments, new.target); }
function wearBuy(key) { return __ZC(117, 2, this, arguments, new.target); }
renderWardrobe = function () { return __ZC(117, 3, this, arguments, new.target); };
(function () {
function hook() {
var b = document.getElementById("wardbtn");
if (!b)
return setTimeout(hook, 500);
b.onclick = function () { if (!walkMode && typeof setWalk === "function")
setWalk(true); setTimeout(function () { if (typeof openWardrobe === "function")
openWardrobe(); }, 150); };
}
hook();
})();
setInterval(function () { try {
if (typeof presencePublished !== "undefined")
presencePublished = false;
}
catch (e) { } }, 60000);
