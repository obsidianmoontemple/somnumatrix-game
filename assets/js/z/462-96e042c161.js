/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(462, function () {
"use strict";
return [
function (g, len) {
g.updateMatrixWorld(true);
var box = new THREE.Box3().setFromObject(g), c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3());
var k = len / Math.max(0.01, Math.max(s.z, s.x * 0.85));
var holder = new THREE.Group();
g.position.sub(c);
holder.add(g);
holder.scale.setScalar(k);
holder.userData.len = len;
holder.userData.r = Math.max(s.x, s.y, s.z) * k * 0.5;
return holder;
},
function (P, body, col, r, x, y, z, len) {
var E = mmG(P, x, y, z);
mmCyl(E, body, r * 0.92, r * 1.08, len || r * 2.2, 0, 0, 0, Math.PI / 2, 0, 0, 18);
mmTorus(E, mmMat(0x2A2C30, { shine: 40, tex: "plate" }), r * 1.02, r * 0.12, 0, 0, (len || r * 2.2) * 0.5, 0, 0, 0);
var t = mmMesh(new THREE.CircleGeometry(r * 0.8, mmSeg(18)), mmMat(col, { glow: 1, op: 0.92 }), 0, 0, (len || r * 2.2) * 0.5 + 0.02, E);
if (!sbLite()) {
var gl = mmGlow(E, col, r * 5.5, 0.55, 0, 0, (len || r * 2.2) * 0.5 + r * 0.8);
if (gl)
gl.userData.sbFlame = 1;
}
t.userData.sbFlame = 1;
return E;
},
function (hullCol, trimCol) {
var g = new THREE.Group(), hull = mmMat(hullCol || 0xEEF0F2, { shine: 40, tex: "plate", rep: 2 }), trim = mmMat(trimCol || 0xC9A868, { shine: 60, metal: 0.8 }), blue = mmMat(0x2A5AA8, { shine: 40 }), dark = mmMat(0x2E3238, { shine: 30, tex: "plate" }), glass = mmMat(0x7AB8E0, { shine: 95, e: 0x10304A, ei: 0.6 });
var f = mmLathe(g, hull, [[0, -5.6], [0.9, -5.5], [1.45, -4.6], [1.7, -2.2], [1.62, 0.8], [1.25, 3.4], [0.7, 5.1], [0.18, 5.9], [0, 6.0]], 0, 0, 0, 22);
f.rotation.x = -Math.PI / 2;
mmTorus(g, blue, 1.66, 0.08, 0, 0, -0.4, 0, 0, 0);
mmTorus(g, trim, 1.5, 0.06, 0, 0, -2.6, 0, 0, 0);
mmEll(g, glass, 0.82, 0.62, 1.9, 0, 1.05, -2.5, 18);
for (var i = 0; i < 3; i++)
mmTorus(g, dark, 0.78 - i * 0.06, 0.045, 0, 1.02, -3.4 + i * 0.9, Math.PI / 2.4, 0, 0, Math.PI);
[-1, 1].forEach(function (s) {
sbWing(g, hull, [[1.2, -1.4], [5.9, 2.3], [6.1, 3.7], [1.2, 3.3]], 0.26, 0, -0.25, 0, s);
sbWing(g, blue, [[2.4, 0.2], [4.8, 2.4], [4.9, 2.9], [2.4, 1.0]], 0.3, 0, -0.25, 0, s);
mmRod(g, trim, [s * 1.3, -0.25, -1.4], [s * 5.95, -0.25, 2.3], 0.07);
mmCaps(g, hull, 0.28, 0.32, 2.6, s * 6.05, -0.25, 3.0, Math.PI / 2, 0, 0, 12);
sbNav(g, s < 0 ? 0xFF4A3A : 0x4AFF7A, s * 6.05, -0.25, 1.55);
mmSlab(g, dark, 0.5, 0.9, 2.2, s * 1.55, 0.15, 3.4);
sbEngine(g, hull, 0x8FD8FF, 0.6, s * 1.85, 0.15, 4.6, 3.0);
mmRod(g, dark, [s * 0.55, -1.05, -2.2], [s * 0.55, -1.05, -5.0], 0.09);
mmEll(g, mmMat(0xFF5A3A, { glow: 1 }), 0.08, 0.08, 0.08, s * 0.55, -1.05, -5.05, 8);
});
mmFlat(g, hull, [[1.0, 0], [-2.3, 0], [-1.9, 2.1], [-0.6, 2.1]], 0.22, 0, 1.3, 3.5, 0, Math.PI / 2, 0);
mmFlat(g, blue, [[-0.6, 0.5], [-1.9, 0.5], [-1.75, 1.2], [-0.75, 1.2]], 0.26, 0, 1.3, 3.5, 0, Math.PI / 2, 0);
sbNav(g, 0xFFFFFF, 0, 3.4, 5.2);
mmVents(g, dark, mmMat(0x4A4E56, { shine: 30 }), 1.2, 0.6, 4, 0, 0.9, 1.6, -Math.PI / 2, 0, 0);
return g;
},
function () {
var g = new THREE.Group(), hull = mmMat(0xF2F2EE, { shine: 35, tex: "plate", rep: 2 }), shield = mmMat(0x2A2A2E, { shine: 20, tex: "worn" }), gold = mmMat(0xC9A868, { shine: 60, metal: 0.85 }), glass = mmMat(0x6AA8D8, { shine: 95, e: 0x10304A, ei: 0.6 }), dark = mmMat(0x3A3E46, { shine: 30, tex: "plate" });
mmSlab(g, hull, 3.8, 3.0, 9.0, 0, 0, 0.6);
var n = mmLathe(g, hull, [[0, -0.2], [1.9, 0], [1.75, 1.6], [1.2, 3.0], [0.4, 3.7], [0, 3.8]], 0, -0.05, -3.9, 20);
n.rotation.x = -Math.PI / 2;
n.scale.set(1, 1, 0.82);
mmSlab(g, shield, 3.9, 0.5, 9.2, 0, -1.45, 0.6);
var nb = mmLathe(g, shield, [[0, 0], [1.85, 0], [1.2, 2.8], [0, 3.4]], 0, -1.2, -3.9, 16);
nb.rotation.x = -Math.PI / 2;
nb.scale.set(1, 0.25, 0.82);
mmSlab(g, glass, 2.6, 0.7, 0.2, 0, 1.0, -4.9, -0.75, 0, 0);
[-1, 1].forEach(function (s) {
for (var i = 0; i < 6; i++)
mmCyl(g, glass, 0.24, 0.24, 0.1, s * 1.92, 0.5, -1.8 + i * 1.1, 0, 0, Math.PI / 2, 14);
mmSlab(g, gold, 0.08, 0.18, 8.0, s * 1.94, 1.05, 0.6);
sbWing(g, hull, [[1.6, -0.6], [6.2, 3.4], [6.3, 4.6], [1.6, 4.6]], 0.35, 0, -1.0, 0, s);
sbWing(g, shield, [[1.6, -0.6], [6.2, 3.4], [6.25, 3.9], [1.6, 1.0]], 0.4, 0, -1.05, 0, s);
sbNav(g, s < 0 ? 0xFF4A3A : 0x4AFF7A, s * 6.25, -1.0, 4.1);
mmRod(g, dark, [s * 1.2, -1.6, -3.0], [s * 1.2, -1.6, -5.4], 0.1);
});
mmFlat(g, hull, [[0.4, 0], [-3.4, 0], [-2.8, 3.2], [-1.2, 3.2]], 0.3, 0, 1.5, 3.6, 0, Math.PI / 2, 0);
mmFlat(g, gold, [[-1.2, 2.7], [-2.85, 2.7], [-2.8, 3.2], [-1.2, 3.2]], 0.34, 0, 1.5, 3.6, 0, Math.PI / 2, 0);
mmSlab(g, dark, 0.1, 0.06, 7.6, 0, 1.52, 0.6);
[[-1.1, 0.3], [1.1, 0.3], [0, -0.7]].forEach(function (q) { sbEngine(g, dark, 0xFFD08A, 0.72, q[0], q[1], 5.6, 1.6); });
return g;
},
function () {
var g = new THREE.Group(), hull = mmMat(0xC8CED6, { shine: 70, tex: "plate", rep: 3 }), dark = mmMat(0x4A5058, { shine: 40, tex: "plate" }), glass = mmMat(0x9AD8F0, { shine: 95, e: 0x204A6A, ei: 0.5, op: 0.7 }), neon = 0x8AF0FF;
mmLathe(g, hull, [[0, -1.05], [2.6, -1.0], [5.4, -0.45], [6.5, -0.08], [6.7, 0.06], [6.4, 0.3], [4.6, 0.75], [2.6, 1.1], [0, 1.15]], 0, 0, 0, 40);
mmTorus(g, dark, 6.55, 0.16, 0, 0.05, 0, Math.PI / 2, 0, 0);
mmTorus(g, dark, 4.3, 0.08, 0, 0.68, 0, Math.PI / 2, 0, 0);
mmEll(g, glass, 2.4, 1.5, 2.4, 0, 1.35, 0, 24);
mmTorus(g, mmMat(0xB8C0CA, { shine: 80 }), 2.4, 0.12, 0, 1.12, 0, Math.PI / 2, 0, 0);
mmSlab(g, dark, 0.9, 0.9, 0.7, 0, 1.45, 0.3);
var ring = mmTorus(g, mmMat(neon, { glow: 1, op: 0.75 }), 2.0, 0.32, 0, -1.08, 0, Math.PI / 2, 0, 0);
ring.userData.sbFlame = 1;
if (!sbLite())
mmGlow(g, neon, 9, 0.45, 0, -1.6, 0);
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2;
mmEll(g, mmMat(i % 2 ? neon : 0xFFE08A, { glow: 1 }), 0.2, 0.12, 0.2, Math.cos(a) * 6.62, 0.08, Math.sin(a) * 6.62, 8);
}
mmCyl(g, dark, 0.45, 0.6, 0.6, 0, -0.6, -5.2, Math.PI / 2, 0, 0, 16);
mmEll(g, mmMat(neon, { glow: 1 }), 0.32, 0.32, 0.12, 0, -0.6, -5.52, 12);
return g;
},
function () {
if (SB.tmpl.rm)
return SB.tmpl.rm;
return (SB.tmpl.rm = { grey: mmMat(0x6E7074, { shine: 25, tex: "worn", rep: 2 }), rust: mmMat(0x8A3A22, { shine: 15, tex: "worn" }), dark: mmMat(0x2A2C30, { shine: 20, tex: "plate" }),
slit: mmMat(0xFFB060, { e: 0x8A3A10, ei: 0.9, shine: 80 }), amber: 0xFFA040, bone: mmMat(0xB8B0A0, { shine: 20, tex: "worn" }) });
},
function () {
var g = new THREE.Group(), M = sbRaiderMats();
mmFlat(g, M.grey, [[0, -5.2], [1.3, -1.2], [3.8, 3.4], [1.3, 4.4], [0, 3.7], [-1.3, 4.4], [-3.8, 3.4], [-1.3, -1.2]], 0.8, 0, 0, 0, Math.PI / 2, 0, 0);
mmEll(g, M.grey, 1.1, 0.7, 3.6, 0, 0.25, 0.2, 14);
mmSlab(g, M.slit, 1.1, 0.22, 1.4, 0, 0.82, -1.3, -0.25, 0, 0);
mmSlab(g, M.dark, 1.5, 0.3, 1.8, 0, 0.72, -1.2, -0.25, 0, 0);
[-1, 1].forEach(function (s) {
mmRod(g, M.dark, [s * 1.4, -0.1, -0.6], [s * 1.6, -0.1, -5.4], 0.16, 0.12);
mmEll(g, mmMat(M.amber, { glow: 1 }), 0.12, 0.12, 0.12, s * 1.6, -0.1, -5.45, 8);
mmSlab(g, M.rust, 1.2, 0.12, 1.0, s * 2.3, 0.42, 2.4, 0, s * 0.3, s * 0.1);
mmFlat(g, M.rust, [[0, 0], [1.6, 0], [1.1, 1.5], [0.3, 1.4]], 0.14, s * 1.9, 0.4, 3.2, 0, Math.PI / 2, s * -0.35);
sbEngine(g, M.dark, M.amber, 0.45, s * 1.0, 0.1, 4.2, 1.4);
});
mmSlab(g, M.bone, 0.5, 0.1, 1.6, 0.6, 0.55, 1.4, 0, 0.2, 0);
return g;
},
function () {
var g = new THREE.Group(), M = sbRaiderMats();
var h = mmLathe(g, M.grey, [[0, -8.5], [1.6, -8.2], [2.8, -6], [3.1, -1], [2.9, 4], [2.2, 7.2], [1.0, 8.6], [0, 8.8]], 0, 0, 0, 16);
h.rotation.x = -Math.PI / 2;
h.scale.set(1.25, 1, 0.75);
[-1, 1].forEach(function (s) {
mmCaps(g, M.grey, 1.1, 1.0, 9, s * 4.4, -0.4, 0.6, Math.PI / 2, 0, 0, 12);
mmSlab(g, M.rust, 0.4, 1.4, 6.0, s * 3.6, 0.0, -0.8, 0, 0, s * 0.2);
sbEngine(g, M.dark, M.amber, 0.85, s * 4.4, -0.4, 5.6, 1.6);
mmRod(g, M.dark, [s * 4.4, -0.4, -3.6], [s * 4.4, -0.4, -7.6], 0.22, 0.18);
sbWing(g, M.grey, [[0, 0], [3.4, 1.8], [3.4, 3.2], [0, 2.8]], 0.25, s * 3.6, -0.4, 1.6, s);
});
var T = mmG(g, 0, 2.0, -2.0);
T.userData.turret = 1;
mmCyl(T, M.dark, 1.2, 1.5, 0.9, 0, 0, 0, 0, 0, 0, 16);
[-0.35, 0.35].forEach(function (x) { mmRod(T, M.dark, [x, 0.1, -0.4], [x, 0.1, -3.6], 0.14); mmEll(T, mmMat(M.amber, { glow: 1 }), 0.1, 0.1, 0.1, x, 0.1, -3.65, 8); });
mmSlab(g, M.slit, 1.6, 0.3, 1.4, 0, 1.55, -5.0, -0.4, 0, 0);
mmSlab(g, M.rust, 2.0, 0.2, 2.6, -0.8, 1.7, 2.4, 0, 0.3, 0.06);
mmSlab(g, M.bone, 1.0, 0.16, 2.2, 1.2, 1.65, 4.2, 0, -0.2, 0);
sbEngine(g, M.dark, M.amber, 1.2, 0, 0.2, 8.4, 1.6);
return g;
},
function () {
var g = sbBuildGunship(), M = sbRaiderMats();
var T = mmG(g, 0, 1.7, 3.6);
T.userData.turret = 1;
mmCyl(T, M.dark, 1.0, 1.3, 0.8, 0, 0, 0, 0, 0, 0, 14);
[-0.3, 0.3].forEach(function (x) { mmRod(T, M.dark, [x, 0.1, -0.3], [x, 0.1, -3.0], 0.12); });
mmCone(g, M.rust, 1.6, 3.6, 0, -0.6, -10.0, -Math.PI / 2, 0, 0, 10);
for (var i = 0; i < 6; i++)
mmSlab(g, i % 2 ? M.rust : M.grey, 1.4, 0.2, 1.8, (i % 3 - 1) * 1.6, 1.9 - (i % 2) * 0.2, -2 + i * 1.4, 0, (i - 3) * 0.12, (i % 2 ? 0.1 : -0.08));
return g;
},
function (k) {
var D = SB_SHIPS[k], g = null, B = null;
try {
if (k === "corp")
g = sbBuildCutter();
else if (k === "shuttle")
g = sbBuildShuttle();
else if (k === "saucer")
g = sbBuildSaucer();
else if (typeof SB_GXB !== "undefined" && SB_GXB[k])
g = SB_GXB[k]();
else if (typeof MM_BUILD !== "undefined" && MM_BUILD[k]) {
B = MM_BUILD[k]();
g = B.g;
}
}
catch (e) {
console.warn("space ship model", k, e);
}
if (!g)
g = sbBuildCutter();
var H = sbFit(g, D.len);
H.userData.B = B;
H.userData.k = k;
H.traverse(function (o) { if (o.isMesh) {
o.frustumCulled = false;
} });
return H;
},
function (type) {
if (!SB.tmpl[type]) {
var g = type === "dart" ? sbBuildDart() : type === "gunship" ? sbBuildGunship() : type === "marauder" ? sbBuildMarauder() : sbBuildCutter(0xD8DCE4, 0x3A6AB8);
SB.tmpl[type] = sbFit(g, type === "ally" ? SB_ALLY.len : SB_FOE[type].len);
}
var c = SB.tmpl[type].clone(true);
c.userData = Object.assign({}, SB.tmpl[type].userData);
return c;
},
function (k) {
var D = SB_SHIPS[k];
if (!D)
return false;
if (D.own === "all" || sbKeeper())
return true;
var p = D.own.split(":");
if (p[0] === "thing")
return (typeof myThings !== "undefined" ? myThings : []).some(function (t) { return t && t.archetype === p[1]; });
if (p[0] === "gx")
return typeof D.can === "function" && !!D.can();
if (p[0] === "mm")
return (typeof MM !== "undefined" && MM.mine ? MM.mine : []).some(function (r) { return r && r.k === p[1]; });
return false;
},
function (k, quiet) {
if (!SB_SHIPS[k] || !sbOwns(k))
k = "corp";
var D = SB_SHIPS[k], was = SB.k;
SB.k = k;
sbSave();
if (SP.ship) {
if (SB.model && SB.model.parent)
SB.model.parent.remove(SB.model);
if (SB.model && SB.modelK !== k) {
SB.model.traverse(function (o) { if (o.geometry && o.geometry.dispose)
o.geometry.dispose(); });
SB.model = null;
}
if (!SB.model) {
SB.model = sbShipModel(k);
SB.modelK = k;
SB.flames = [];
SB.model.traverse(function (o) { if (o.userData && o.userData.sbFlame && o.material) {
o.material = o.material.clone();
SB.flames.push(o);
} });
}
if (!SB.rollG) {
SB.rollG = new THREE.Group();
SP.ship.add(SB.rollG);
}
SP.ship.children.forEach(function (c) { if (c !== SB.rollG)
c.visible = false; });
SP.ship.scale.setScalar(1);
SB.rollG.add(SB.model);
SB.rollG.visible = true;
}
SB.hull = Math.min(SB.hull / Math.max(1, (SB_SHIPS[was] || D).hull), 1) * D.hull;
if (!(SB.hull > 0))
SB.hull = D.hull;
SB.shield = D.shield;
SB.second = sbSecondGun();
sbHud(true);
if (!quiet)
sbSay("<b>" + sbEsc(D.name) + "</b> is yours to fly. " + sbEsc(D.gun.charAt(0).toUpperCase() + D.gun.slice(1)) + " on <b>" + (sbTouch() ? "Fire" : "F") + "</b>" + (SB.second ? "; your " + sbEsc(SB.second.name.toLowerCase()) + " is mounted as a second gun on <b>" + (sbTouch() ? "Gun 2" : "G") + "</b>" : "") + ". <b>" + (sbTouch() ? "View" : "V") + "</b> changes the view.");
},
function () {
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Your ships</div><div style='opacity:.8'>The Corp lends every traveller a cutter. Ships you have found or bought fly here too.</div>";
SB_ORDER.forEach(function (k) {
var D = SB_SHIPS[k], mine = sbOwns(k), cur = SB.k === k;
if (!mine && D.own.indexOf("mm:") === 0 && !(typeof MM !== "undefined" && MM.list && MM.list[D.own.slice(3)]))
return;
var how = D.how || (D.own === "all" ? "Lent by the Space Corp" : D.own.indexOf("thing:") === 0 ? "Sold at the Transport Yard, Somnucor" : "Hidden somewhere in the worlds: find it and it is yours");
h += worldBtn("s-" + k, (cur ? "✓ " : "") + D.icon + " " + sbEsc(D.name), (mine ? "" : "🔒 ") + sbEsc(how) + " · hull " + D.hull + ", shields " + D.shield + ", " + sbEsc(D.gun));
fns["s-" + k] = function () {
if (!sbOwns(k)) {
worldCard(worldFacts(D.name, how, [["Hull", String(D.hull)], ["Shields", String(D.shield)], ["Speed", D.spd.toFixed(2) + " times the cutter's"], ["Guns", D.gun]], [D.about]), {});
return;
}
worldCard(null);
sbBoard(k);
};
});
var held = Object.keys(SB_SECOND).filter(function (k) { return typeof bwOwns === "function" && (bwOwns(k) || sbKeeper()); });
h += "<div style='margin-top:8px;font-weight:600'>Second gun</div>";
if (!held.length)
h += "<div style='opacity:.8;font-size:12.5px'>Take a star weapon from the Armoury in Ironfray (a rail gun, an ion cannon, a micro-missile pod, an arc caster...) and keep it: it mounts on your ship here.</div>";
held.forEach(function (k) { var S = SB_SECOND[k], on = SB.second && SB.second.k === k; h += worldBtn("g-" + k, (on ? "✓ " : "") + sbEsc(S.name), "Hits for " + S.dmg + (S.n ? " × " + S.n : "") + ", ready every " + S.cool + " s"); fns["g-" + k] = function () { try {
localStorage.setItem("sb.second", k);
}
catch (e) { } SB.second = sbSecondGun(); worldCard(null); sbHud(true); sbSay("<b>" + sbEsc(S.name) + "</b> mounted as your second gun."); }; });
worldCard(h, fns);
var re = [];
if (sbSigned() && typeof loadThings === "function")
re.push(loadThings());
if (sbSigned() && typeof mmMineLoad === "function")
re.push(mmMineLoad());
if (re.length && !SB.cardRe) {
SB.cardRe = 1;
Promise.all(re).then(function () { SB.cardRe = 0; if (WLD.card && WLD.card.style.display !== "none" && /Your ships/.test(WLD.card.innerHTML))
sbShipsCard(); }).catch(function () { SB.cardRe = 0; });
}
},
function (dt, y0) {
SB.t += dt;
var turn = ((yaw - (SB.lastYaw == null ? yaw : SB.lastYaw) + Math.PI * 3) % (Math.PI * 2)) - Math.PI, want = Math.max(-0.7, Math.min(0.7, -turn / Math.max(dt, 0.001) * 0.35));
SB.lastYaw = yaw;
SB.rollAng = (SB.rollAng || 0) + (want - (SB.rollAng || 0)) * Math.min(1, dt * 3);
if (SB.rollG)
SB.rollG.rotation.z = SB.rollAng;
if (SP.ship)
SP.ship.visible = SB.view === "chase" && !sbVR();
if (!SB.fill) {
SB.fill = new THREE.DirectionalLight(0xDDE6FF, sbLite() ? 0.5 : 0.65);
SB.fill.target = new THREE.Object3D();
scene.add(SB.fill);
scene.add(SB.fill.target);
}
var ff = sbFwd(yaw, pitch);
SB.fill.visible = true;
SB.fill.position.set(camera.position.x - ff.x * 50, camera.position.y + 40, camera.position.z - ff.z * 50);
SB.fill.target.position.copy(camera.position);
var B = SB.model && SB.model.userData.B;
if (B && B.K && typeof mmBeastAnim === "function") {
SB.beastSt = SB.beastSt || { alt: 5 };
try {
mmBeastAnim(B.K, SB.beastSt, dt, 0);
}
catch (e) { }
}
var thr = Math.min(1, SP.speed / Math.max(1, SP_CRUISE * 1.2));
if (SB.flames && !sbLite())
SB.flames.forEach(function (o) { o.material.opacity = o.isSprite ? 0.25 + 0.45 * thr : 0.6 + 0.35 * thr; });
sbCombatTick(dt);
sbHudTick(dt);
},
function () {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
var out = { mph: SP.speed * 2.23694, vmaxMph: SP_BOOST * 2.23694, thr: Math.min(1, SP.speed / Math.max(1, SP_CRUISE)), brk: 0, gear: "", steer: 0, limit: null, road: "", heading: 0,
alt: 0, climb: 0, fly: true, next: null, note: "", reverse: false, shield: SB.shield / Math.max(1, D.shield), hp: SB.hull / Math.max(1, D.hull), name: D.name, armed: true,
space: true, heading: ((-yaw * 180 / Math.PI) % 360 + 360) % 360, gun: D.gun, charge: D.cool ? 1 - Math.max(0, SB.cool || 0) / D.cool : 1,
gun2: SB.second ? (SB.second.name || "Second gun") : (SB.k === "domeship" ? "Battle pods" : null), charge2: SB.second && SB.second.cool ? 1 - Math.max(0, SB.cool2 || 0) / SB.second.cool : 1,
reactor: Math.min(1, 0.3 + Math.min(1, SP.speed / Math.max(1, SP_BOOST)) * 0.55 + (D.cool ? Math.max(0, SB.cool || 0) / D.cool * 0.15 : 0)) };
try {
var range = 1500, c = Math.cos(yaw), s = Math.sin(yaw), bl = [], near = null, nd = 1e9, add = function (F, ally) {
if (F.down)
return;
var dx = F.p.x - SP.pos.x, dz = F.p.z - SP.pos.z, d = F.p.distanceTo(SP.pos);
if (!ally && d < nd) {
nd = d;
near = F;
}
if (d > range || bl.length > 48)
return;
var fx = dx * c - dz * s, fz = -(dx * s + dz * c);
bl.push([fx / range, -fz / range, ally, F === SB.target]);
};
(SB.foes || []).forEach(function (F) { add(F, false); });
(SB.allies || []).forEach(function (F) { add(F, true); });
out.blips = bl;
out.foes = (SB.foes || []).filter(function (F) { return !F.down; }).length;
var T = SB.target && !SB.target.down ? SB.target : near;
if (T)
out.target = { name: (T.T && (T.T.name || T.T.label)) || "Raider", dist: T.p.distanceTo(SP.pos) };
}
catch (e) { }
return out;
},
function (kind) {
var S = SB_SHOT[kind] || SB_SHOT.phaser, g = new THREE.Group(), key = kind, m;
if (!SB_GEO[key]) {
SB_GEO[key] = { geo: S.ring ? new THREE.TorusGeometry(S.r, S.r * 0.22, 6, 20) : S.len ? new THREE.CylinderGeometry(S.r, S.r, S.len, 6) : new THREE.SphereGeometry(S.r, 10, 8),
mat: new THREE.MeshBasicMaterial({ color: S.col, fog: false, transparent: true, opacity: 0.95 }) };
}
m = new THREE.Mesh(SB_GEO[key].geo, SB_GEO[key].mat);
if (S.len && !S.ring)
m.rotation.x = Math.PI / 2;
g.add(m);
if (!sbLite())
g.add(wGlow(S.glow, (S.len ? S.r * 14 : S.r * 6) + 2, 0.55));
return g;
},
function (from, dir, kind, dmg, side, o) {
var G = sbG();
if (!G)
return;
var S = SB_SHOT[kind] || SB_SHOT.phaser, g = sbShotMesh(kind);
g.position.copy(from);
G.add(g);
sbLook(g, SB_V3.copy(from).add(dir));
var list = side === "foe" ? SB.bolts : SB.shots;
list.push({ g: g, p: from.clone(), d: dir.clone().normalize(), v: S.spd + (side === "me" ? SP.speed * 0.6 : 0), life: (o && o.life) || 1.8, dmg: dmg, side: side, kind: kind, o: o || {}, hit: [] });
if (list.length > 90) {
var x = list.shift();
if (x.g.parent)
x.g.parent.remove(x.g);
}
},
function (range) {
var f = sbFwd(yaw, pitch), best = null, bestA = sbTouch() ? 0.16 : 0.09;
SB.foes.forEach(function (F) { if (F.down)
return; SB_V1.copy(F.p).sub(SP.pos); var d = SB_V1.length(); if (d > range)
return; var a = SB_V1.normalize().angleTo(f); if (a < bestA) {
bestA = a;
best = F;
} });
if (!best && SB.target && !SB.target.down && SB.target.p.distanceTo(SP.pos) < range) {
SB_V1.copy(SB.target.p).sub(SP.pos);
if (SB_V1.normalize().angleTo(f) < 0.2)
best = SB.target;
}
if (!best)
return f;
var d = best.p.distanceTo(SP.pos), t = d / 700, at = best.p.clone().addScaledVector(best.v, t);
return at.sub(SP.pos).normalize();
},
function () {
if (!sbHere())
return;
if (SB.cool > 0)
return;
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp, f = sbFwd(yaw, pitch), right = SB_V2.set(Math.cos(yaw), 0, -Math.sin(yaw)).clone();
SB.cool = D.cool;
var aim = D.turret ? sbAim(1100) : sbAim(900), n = D.n || 1;
for (var i = 0; i < n; i++) {
var off = n === 1 ? 0 : (i / (n - 1) - 0.5) * D.len * 0.32, from = SP.pos.clone().addScaledVector(f, D.len * 0.55).addScaledVector(right, off).add(SB_V3.set(0, -D.len * 0.04, 0));
var dir = aim.clone();
if (n === 3)
dir.addScaledVector(right, (i - 1) * 0.035).normalize();
sbShoot(from, dir, D.shot, D.dmg, "me");
}
sbTone(D.shot === "ion" || D.shot === "orb" ? 520 : D.shot === "ring" ? 760 : 980, 0.07);
},
function () {
if (!sbHere())
return;
if (SB.k === "domeship" && SB.model && SB.model.userData.B && SB.model.userData.B.drop)
SB.model.userData.B.drop();
var S = SB.second;
if (!S) {
sbSay("No second gun mounted. Keep a star weapon from Ironfray's Armoury and it mounts here (<b>Ships</b> card).");
return;
}
if (SB.cool2 > 0)
return;
SB.cool2 = S.cool;
var f = sbFwd(yaw, pitch), aim = sbAim(1400), n = S.n || 1, right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
for (var i = 0; i < n; i++) {
var from = SP.pos.clone().addScaledVector(f, 6).addScaledVector(right, (i - (n - 1) / 2) * 1.4);
var dir = aim.clone();
if (n > 1)
dir.add(new THREE.Vector3((Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06)).normalize();
sbShoot(from, dir, S.shot, S.dmg, "me", { pierce: S.pierce, splash: S.splash, chain: S.chain, slow: S.slow, seek: SB_SHOT[S.shot].seek ? (SB.target && !SB.target.down ? SB.target : sbNearestFoe(SP.pos, 1400)) : null, life: S.shot === "missile" ? 4 : 2.2 });
}
sbTone(S.shot === "rail" ? 1400 : S.shot === "missile" ? 420 : 660, 0.12);
},
function (type, at, side, name) {
var G = sbG();
if (!G)
return null;
var T = side === "ally" ? SB_ALLY : SB_FOE[type], g = sbFoeModel(side === "ally" ? "ally" : type);
g.position.copy(at);
G.add(g);
var F = { g: g, p: at.clone(), v: new THREE.Vector3(), type: type, T: T, side: side, hp: T.hp, max: T.hp, cool: 1 + Math.random() * 1.5, t: 0, phase: Math.random() * 6.28,
name: name || T.name, down: 0, run: 0, slow: 0, turrets: [] };
g.traverse(function (o) { if (o.userData && o.userData.turret)
F.turrets.push(o); });
(side === "ally" ? SB.allies : SB.foes).push(F);
return F;
},
function (F, dt) {
F.t += dt;
if (F.down) {
F.down += dt;
F.p.addScaledVector(F.v, dt);
F.v.multiplyScalar(1 - dt * 0.3);
F.g.rotation.x += dt * 0.4;
F.g.rotation.z += dt * 0.25;
F.g.position.copy(F.p);
return;
}
var T = F.T, foe = F.side === "foe";
var tp = null, tv = null, tgt = null;
if (foe) {
var dMe = SP.pos.distanceTo(F.p), al = null, ad = 1e9;
SB.allies.forEach(function (A) { if (A.down || A.run)
return; var d = A.p.distanceTo(F.p); if (d < ad) {
ad = d;
al = A;
} });
if (al && ad < dMe * 0.7 && (F.phase % 2) > 1) {
tgt = al;
tp = al.p;
tv = al.v;
}
else {
tp = SP.pos;
tv = SP.vel;
}
}
else {
tgt = SB.foes.filter(function (x) { return !x.down; }).sort(function (a, b) { return a.p.distanceTo(F.p) - b.p.distanceTo(F.p); })[0];
if (F.run || !tgt) {
tp = SP.pos.clone().add(new THREE.Vector3(Math.cos(F.phase) * 90, 40, Math.sin(F.phase) * 90));
tv = SP.vel;
tgt = null;
}
else {
tp = tgt.p;
tv = tgt.v;
}
}
var to = SB_V1.copy(tp).sub(F.p), d = to.length();
var runIn = Math.sin(F.t * 0.45 + F.phase) > 0.1, want = new THREE.Vector3();
if (runIn && d > 70)
want.copy(tp).addScaledVector(tv || SB_V2.set(0, 0, 0), 0.6);
else {
var a = F.t * 0.5 + F.phase, R = T === SB_ALLY ? 110 : (T.r > 10 ? 220 : 150);
want.set(tp.x + Math.cos(a) * R, tp.y + Math.sin(a * 0.7) * R * 0.35, tp.z + Math.sin(a) * R);
}
var dir = want.sub(F.p);
var dl = dir.length();
if (dl > 0.01)
dir.multiplyScalar(1 / dl);
var spd = T.spd * (F.slow > 0 ? 0.5 : 1);
if (F.slow > 0)
F.slow -= dt;
F.v.lerp(dir.multiplyScalar(spd), Math.min(1, dt * T.turn * 0.8));
F.p.addScaledVector(F.v, dt);
sbKeepClear(F.p, F.T.len * 0.6);
F.g.position.copy(F.p);
if (F.v.lengthSq() > 1)
sbLook(F.g, SB_V2.copy(F.p).sub(F.v));
F.turrets.forEach(function (tu) { tu.rotation.y = Math.sin(F.t * 0.8 + F.phase) * 0.6; });
F.cool -= dt;
if (F.cool <= 0 && d < T.range && tp) {
var nose = F.v.clone().normalize(), aimDir = SB_V3.copy(tp).sub(F.p).normalize(), ang = nose.angleTo(aimDir);
if (ang < (T.pair ? 1.2 : 0.35)) {
F.cool = T.cool * (0.8 + Math.random() * 0.5);
var miss = foe ? (0.03 + Math.min(0.06, d / 12000)) : 0.02;
var shot = aimDir.clone().add(new THREE.Vector3((Math.random() - 0.5) * miss * 2, (Math.random() - 0.5) * miss * 2, (Math.random() - 0.5) * miss * 2)).normalize();
sbShoot(F.p.clone().addScaledVector(nose, T.len * 0.5), shot, foe ? "raider" : "corpally", T.dmg, foe ? "foe" : "ally");
if (foe && d < 400)
sbTone(330, 0.05);
}
}
},
function (p, pad) {
if (typeof SP_BODIES === "undefined")
return;
for (var i = 0; i < SP_BODIES.length; i++) {
var b = SP_BODIES[i], h = SP.bodies[b.k];
if (!h)
continue;
var min = b.r * (b.k === "sun" ? 1.7 : 1.1) + pad;
SB_V3.copy(p).sub(h.position);
var d = SB_V3.length();
if (d < min && d > 0.01)
p.copy(h.position).addScaledVector(SB_V3.multiplyScalar(1 / d), min);
}
for (var k in SP.stations) {
var st = SP.stations[k];
if (!st)
continue;
SB_V3.copy(p).sub(st.position);
var d2 = SB_V3.length();
if (d2 < 60 + pad && d2 > 0.01)
p.copy(st.position).addScaledVector(SB_V3.multiplyScalar(1 / d2), 60 + pad);
}
},
function (dt) {
[SB.shots, SB.bolts].forEach(function (list) {
for (var i = list.length - 1; i >= 0; i--) {
var s = list[i], a = s.p.clone();
if (s.o.seek && !s.o.seek.down) {
var want = s.o.seek.p.clone().sub(s.p).normalize();
s.d.lerp(want, Math.min(1, dt * 2.4)).normalize();
sbLook(s.g, s.p.clone().add(s.d));
}
s.p.addScaledVector(s.d, s.v * dt);
s.g.position.copy(s.p);
s.life -= dt;
var done = false;
if (s.side === "foe") {
if (sbSeg(a, s.p, SP.pos) < (SB_SHIPS[SB.k].len * 0.42 + 1.5)) {
sbHurt(s.dmg);
done = true;
}
else
SB.allies.forEach(function (A) { if (done || A.down)
return; if (sbSeg(a, s.p, A.p) < A.T.len * 0.5) {
A.hp -= s.dmg;
done = true;
sbPuff(s.p, 0xFFA040, 5);
if (A.hp < A.max * 0.3 && !A.run) {
A.run = 1;
sbSay("<b>" + sbEsc(A.name) + "</b>: \"Hull's breached, I'm pulling back. Keep at them!\"");
}
} });
}
else {
SB.foes.forEach(function (F) {
if (done || F.down || s.hit.indexOf(F) >= 0)
return;
if (sbSeg(a, s.p, F.p) < F.T.len * 0.5 + 1) {
sbDamage(F, s.dmg, s);
s.hit.push(F);
if (s.o.pierce && s.hit.length <= s.o.pierce)
return;
done = true;
}
});
if (!done && s.side === "me" && typeof SC !== "undefined" && SC.drones)
SC.drones.forEach(function (dr) { if (done || dr.down)
return; var w = dr.g.getWorldPosition(new THREE.Vector3()).sub(sbG().position); if (sbSeg(a, s.p, w) < (dr.big ? 6 : 2)) {
done = true;
if (typeof scDroneHit === "function")
scDroneHit(dr, 1);
} });
}
if (done || s.life <= 0 || !sbHere()) {
if (s.g.parent)
s.g.parent.remove(s.g);
list.splice(i, 1);
}
}
});
},
function (F, dmg, s) {
F.hp -= dmg;
sbPuff(s ? s.p : F.p, SB_SHOT[s ? s.kind : "phaser"].glow, s && s.kind === "ion" ? 14 : 6);
if (s && s.o.slow)
F.slow = s.o.slow;
if (s && s.o.splash)
SB.foes.forEach(function (o) { if (o !== F && !o.down && o.p.distanceTo(F.p) < s.o.splash) {
o.hp -= dmg * 0.5;
if (o.hp <= 0)
sbKnockOut(o);
} });
if (s && s.o.chain) {
var from = F;
for (var c = 0; c < s.o.chain; c++) {
var nx = SB.foes.filter(function (o) { return !o.down && o !== from && o.p.distanceTo(from.p) < 160; })[0];
if (!nx)
break;
nx.hp -= dmg * 0.6;
sbPuff(nx.p, 0xBFE0FF, 8);
if (nx.hp <= 0)
sbKnockOut(nx);
from = nx;
}
}
if (F.hp <= 0)
sbKnockOut(F);
if (!SB.target || SB.target.down)
SB.target = F;
},
function (F) {
if (F.down)
return;
F.down = 0.001;
F.hp = 0;
F.v.multiplyScalar(0.25);
sbPuff(F.p, 0xFFC080, F.T.len * 1.4, 1.1);
F.g.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
var G = sbG();
if (G) {
var pod = new THREE.Group();
mmEll(pod, mmMat(0xD8D0C0, { shine: 30 }), 0.9, 0.9, 1.3, 0, 0, 0, 10);
mmGlow(pod, 0xFFD8A0, 4, 0.6, 0, 0, 1.2);
pod.position.copy(F.p);
G.add(pod);
SB.pods.push({ g: pod, v: new THREE.Vector3((Math.random() - 0.5) * 30, 18, (Math.random() - 0.5) * 30), life: 8 });
}
if (F.side === "foe") {
SB.battle && (SB.battle.down += F.T.worth || 1);
sbTone(440, 0.12);
setTimeout(function () { sbTone(330, 0.18); }, 120);
}
if (SB.target === F)
SB.target = null;
},
function (dt) {
for (var i = SB.fx.length - 1; i >= 0; i--) {
var f = SB.fx[i];
f.t += dt;
var k = f.t / f.life;
f.g.scale.setScalar(f.size * (1 + k * 1.2));
f.g.material.opacity = 0.7 * (1 - k) * (1 - k);
if (k >= 1) {
if (f.g.parent)
f.g.parent.remove(f.g);
f.g.material.dispose();
SB.fx.splice(i, 1);
}
}
for (var j = SB.pods.length - 1; j >= 0; j--) {
var q = SB.pods[j];
q.life -= dt;
q.g.position.addScaledVector(q.v, dt);
q.g.rotation.y += dt;
if (q.life <= 0 || !sbHere()) {
if (q.g.parent)
q.g.parent.remove(q.g);
SB.pods.splice(j, 1);
}
}
},
function () {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
SB.downs++;
sbEndBattle("lost");
if (typeof spFlash === "function")
spFlash(0x3A4A6A);
var best = "aurora", bd = 1e12;
for (var k in SP.stations) {
if (SP.stations[k].userData.alien)
continue;
var d = SP.stations[k].position.distanceTo(SP.pos);
if (d < bd) {
bd = d;
best = k;
}
}
SB.hull = D.hull;
SB.shield = D.shield;
setTimeout(function () {
if (!sbHere())
return;
var st = SP.stations[best];
SP.pos.copy(st.position).add(new THREE.Vector3(0, 10, 120));
SP.vel.set(0, 0, 0);
SP.auto = null;
sbSay("<b>Your hull gave out.</b> The escape pod carried you to " + sbEsc(st.userData.name) + ", and the Corp's dock crew have patched " + sbEsc(D.short) + " good as new. The raiders went on their way.");
}, 400);
},
function (col, op) {
if (sbVR())
return;
var v = SB.vig;
if (!v) {
v = document.createElement("div");
v.id = "sb-vig";
v.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:41;opacity:0;transition:opacity .6s ease";
document.body.appendChild(v);
SB.vig = v;
}
v.style.background = "radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,#" + ("000000" + col.toString(16)).slice(-6) + " 130%)";
v.style.transition = "opacity .15s ease";
v.style.opacity = String(op * 4);
clearTimeout(SB.vigT);
SB.vigT = setTimeout(function () { v.style.transition = "opacity .7s ease"; v.style.opacity = "0"; }, 160);
},
function (o) {
o = o || {};
if (!sbHere() || SB.battle)
return;
try {
if (!o.why && typeof dgrLevelOf === "function" && dgrLevelOf("space") === 0)
return;
}
catch (e) { }
var far = sbAU(), n = o.n || (far > 4 ? 3 + ((Math.random() * 2) | 0) : 2 + ((Math.random() * 2) | 0));
var f = sbFwd(yaw, 0), right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
var c = SP.pos.clone().addScaledVector(f, o.ahead || 620).addScaledVector(right, (Math.random() - 0.5) * 500).add(new THREE.Vector3(0, (Math.random() - 0.5) * 160, 0));
SB.battle = { t: 0, c: c, down: 0, n: 0, allyAt: o.noAllies ? 1e9 : (far < 9 ? 10 + Math.random() * 8 : 22), why: o.why || "strike", start: Date.now(), paid: false };
if (SP.auto) {
SP.auto = null;
}
for (var i = 0; i < n; i++) {
var at = c.clone().add(new THREE.Vector3((Math.random() - 0.5) * 160, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 160));
sbSpawn("dart", at, "foe");
}
if (o.gunship || far > 3.5)
sbSpawn("gunship", c.clone().add(new THREE.Vector3(0, 30, -80)), "foe");
SB.battle.n = SB.foes.length;
SB.target = SB.foes[0];
sbTone(220, 0.25);
setTimeout(function () { sbTone(180, 0.3); }, 260);
sbSay("<b>Grey raiders!</b> " + SB.foes.length + " raider ships drop out of the dark ahead of you" + (o.why === "hunt" ? ", right where the Corp said they would be" : "") + ". " + (sbTouch() ? "<b>Fire</b> and <b>Gun 2</b> to fight; fly hard away to escape." : "<b>F</b> fires, <b>G</b> the second gun, <b>T</b> picks a target; fly hard away to escape."));
sbServerStart();
},
function (dt) {
if (!sbHere()) {
if (SB.battle || SB.foes.length || SB.allies.length)
sbClearAll();
return;
}
if (SB.cool > 0)
SB.cool -= dt;
if (SB.cool2 > 0)
SB.cool2 -= dt;
sbRegen(dt);
var B = SB.battle;
if (B) {
B.t += dt;
if (B.t > B.allyAt && !B.allies) {
B.allies = 1;
var nA = sbAU() < 5 ? 2 : 1;
for (var i = 0; i < nA; i++) {
var nm = SB_ALLY_NAMES[(Math.random() * SB_ALLY_NAMES.length) | 0];
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((i ? -1 : 1) * 120, 40, 160)), "ally", nm);
}
sbSay("<b>Space Corp cutters</b> come in on your wing: \"Corp patrol, we see them. Stay with us, pilot.\"");
sbTone(660, 0.12);
setTimeout(function () { sbTone(880, 0.14); }, 150);
}
var live = SB.foes.filter(function (F) { return !F.down; }).length;
if (!live)
sbEndBattle("won");
else if (SP.pos.distanceTo(B.c) > 3200 && B.t > 8)
sbEndBattle("fled");
}
if (!SB.freeze) {
SB.foes.forEach(function (F) { sbShipTick(F, dt); });
SB.allies.forEach(function (A) { sbShipTick(A, dt); });
}
for (var i2 = SB.foes.length - 1; i2 >= 0; i2--) {
var F2 = SB.foes[i2];
if (F2.down > 9 || (!SB.battle && F2.p.distanceTo(SP.pos) > 4000)) {
sbDrop(F2);
SB.foes.splice(i2, 1);
}
}
for (var j = SB.allies.length - 1; j >= 0; j--) {
var A2 = SB.allies[j];
if (!SB.battle) {
A2.run = 1;
A2.home = (A2.home || 0) + dt;
}
if ((A2.home || 0) > 14 || A2.hp <= 0) {
sbDrop(A2);
SB.allies.splice(j, 1);
}
}
sbShotsTick(dt);
sbFxTick(dt);
sbStrikeClock(dt);
},
function () {
SB.foes.concat(SB.allies).forEach(sbDrop);
SB.foes = [];
SB.allies = [];
SB.battle = null;
SB.target = null;
SB.shots.concat(SB.bolts).forEach(function (s) { if (s.g.parent)
s.g.parent.remove(s.g); });
SB.shots = [];
SB.bolts = [];
SB.fx.forEach(function (f) { if (f.g.parent)
f.g.parent.remove(f.g); });
SB.fx = [];
SB.pods.forEach(function (q) { if (q.g.parent)
q.g.parent.remove(q.g); });
SB.pods = [];
},
function (how) {
var B = SB.battle;
if (!B)
return;
SB.battle = null;
var downs = B.down;
if (B.why === "duel") {
if (how !== "won" && SB.duel && !SB.duel.done) {
SB.duel.ready = true;
if (SB.duel.F)
SB.duel.F.down = 8;
SB.duel.F = null;
}
SB.strikeAt = sbStrikeGap();
return;
}
if (how === "won") {
SB.wins++;
sbTone(660, 0.15);
setTimeout(function () { sbTone(880, 0.15); }, 160);
setTimeout(function () { sbTone(1100, 0.25); }, 320);
sbSay("<b>The strike is broken.</b> Every raider ship is knocked out; their crews are in the pods, and the Corp will pick them up." + (SB.allies.length ? " The cutters dip their wings to you." : ""));
sbServerWon(B, downs);
if (typeof sbAfterWin === "function")
try {
sbAfterWin(B);
}
catch (e) { }
}
else if (how === "fled") {
sbSay("<b>You outran them.</b> The raiders break off and slip back into the dark.");
SB.foes.forEach(function (F) { if (!F.down) {
F.down = 0.001;
F.v.set(F.p.x - SP.pos.x, 0, F.p.z - SP.pos.z).normalize().multiplyScalar(300);
F.down = 7;
} });
}
else {
SB.foes.forEach(function (F) { F.down = 8.5; });
}
SB.strikeAt = sbStrikeGap();
},
function () {
if (document.getElementById("sb-css"))
return;
var st = document.createElement("style");
st.id = "sb-css";
st.textContent = "#sb-hud{position:fixed;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:44;min-width:210px;max-width:250px;" +
"background:linear-gradient(180deg,rgba(12,18,34,.88),rgba(8,12,24,.9));border:1px solid rgba(143,180,232,.55);border-radius:10px;padding:8px 10px;color:#E8ECF4;font:12px var(--sans,system-ui);box-shadow:0 4px 18px rgba(0,0,0,.45)}" +
"#sb-hud .t{font:600 13px var(--serif,Georgia);color:#FFE7B0;display:flex;justify-content:space-between;gap:8px}" +
"#sb-hud .bar{height:7px;border-radius:4px;background:rgba(255,255,255,.1);overflow:hidden;margin:3px 0 5px}#sb-hud .bar i{display:block;height:100%;border-radius:4px;transition:width .25s}" +
"#sb-hud .r{display:flex;justify-content:space-between;opacity:.85;font-size:11px}#sb-hud .b{display:flex;gap:5px;margin-top:6px;flex-wrap:wrap}" +
"#sb-hud button,#sb-pad button{background:rgba(143,180,232,.12);color:#E8ECF4;border:1px solid rgba(143,180,232,.55);border-radius:8px;padding:3px 8px;cursor:pointer;font:11.5px var(--sans,system-ui)}" +
"#sb-hud .foe{margin-top:6px;padding-top:6px;border-top:1px solid rgba(143,180,232,.25)}" +
"#sb-mark{position:fixed;z-index:43;pointer-events:none;border:2px solid rgba(255,170,90,.85);border-radius:6px;box-shadow:0 0 8px rgba(255,140,60,.35);display:none}" +
"#sb-mark .n{position:absolute;left:50%;top:-20px;transform:translateX(-50%);white-space:nowrap;font:11px var(--sans,system-ui);color:#FFD8B0;text-shadow:0 1px 2px #000}" +
"#sb-mark .h{position:absolute;left:0;right:0;bottom:-8px;height:4px;background:rgba(0,0,0,.5);border-radius:2px;overflow:hidden}#sb-mark .h i{display:block;height:100%;background:#FF9A4A}" +
"#sb-arrow{position:fixed;z-index:43;pointer-events:none;width:0;height:0;border-left:11px solid transparent;border-right:11px solid transparent;border-bottom:20px solid rgba(255,150,70,.85);display:none;filter:drop-shadow(0 0 4px rgba(255,120,40,.5))}" +
"#sb-cross{position:fixed;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;z-index:42;pointer-events:none;display:none}" +
"#sb-pad{position:fixed;right:calc(108px + env(safe-area-inset-right,0px));bottom:calc(22px + env(safe-area-inset-bottom,0px));z-index:45;display:none;flex-direction:row;gap:10px;align-items:flex-end}" +
"#sb-hud.touch{bottom:auto;top:calc(52px + env(safe-area-inset-top,0px));min-width:170px;max-width:200px;padding:6px 8px;font-size:11px}#sb-hud.touch .bar{height:5px;margin:2px 0 3px}" +
"#sb-pad .big{width:74px;height:74px;border-radius:50%;font:600 14px var(--sans,system-ui);background:rgba(200,70,40,.35);border-color:rgba(255,150,100,.8)}" +
"#sb-pad .mid{width:58px;height:58px;border-radius:50%;font:600 12px var(--sans,system-ui)}";
document.head.appendChild(st);
},
function (on) {
sbCss();
var h = SB.hud;
if (!h && on) {
h = document.createElement("div");
h.id = "sb-hud";
document.body.appendChild(h);
SB.hud = h;
h.addEventListener("click", function (e) {
var b = e.target.closest("button");
if (!b)
return;
e.stopPropagation();
var n = b.getAttribute("data-sb");
if (n === "ships")
sbShipsCard();
else if (n === "view")
sbToggleView();
else if (n === "target")
sbNextTarget();
else if (n === "hunt")
sbBattlesCard();
});
var m = document.createElement("div");
m.id = "sb-mark";
m.innerHTML = "<div class='n'></div><div class='h'><i></i></div>";
document.body.appendChild(m);
SB.mark = m;
var a = document.createElement("div");
a.id = "sb-arrow";
document.body.appendChild(a);
SB.arrow = a;
var c = document.createElement("div");
c.id = "sb-cross";
c.innerHTML = "<svg viewBox='0 0 26 26' width='26' height='26'><circle cx='13' cy='13' r='9' fill='none' stroke='rgba(190,220,255,.75)' stroke-width='1.5'/><path d='M13 1v6M13 19v6M1 13h6M19 13h6' stroke='rgba(190,220,255,.75)' stroke-width='1.5'/></svg>";
document.body.appendChild(c);
SB.cross = c;
var p = document.createElement("div");
p.id = "sb-pad";
p.innerHTML = "<button class='mid' data-sb='target'>Target</button><button class='mid' data-sb='fire2'>Gun 2</button>";
var hold = null;
p.addEventListener("pointerdown", function (e) {
var b = e.target.closest("button");
if (!b)
return;
e.preventDefault();
e.stopPropagation();
var n = b.getAttribute("data-sb");
if (n === "fire") {
sbFire();
clearInterval(hold);
hold = setInterval(function () { sbFire(); }, 120);
}
else if (n === "fire2")
sbFire2();
else if (n === "target")
sbNextTarget();
}, true);
["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) { p.addEventListener(ev, function () { clearInterval(hold); hold = null; }, true); });
document.body.appendChild(p);
SB.pad = p;
SB.hudKey = "";
}
if (!h)
return;
var show = on && sbHere() && !sbVR();
h.style.display = show ? "block" : "none";
h.classList.toggle("touch", sbTouch());
if (SB.pad)
SB.pad.style.display = show && sbTouch() ? "flex" : "none";
if (!show) {
if (SB.mark)
SB.mark.style.display = "none";
if (SB.arrow)
SB.arrow.style.display = "none";
if (SB.cross)
SB.cross.style.display = "none";
}
SB.hudKey = "";
},
function (dt) {
if (!SB.hud)
sbHud(true);
var show = sbHere() && !sbVR() && !(typeof walkMode !== "undefined" && !walkMode);
if (SB.hud.style.display !== (show ? "block" : "none"))
sbHud(show);
if (!show)
return;
SB.hudAt = (SB.hudAt || 0) + dt;
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp, T = SB.target && !SB.target.down ? SB.target : null;
if (SB.hudAt > 0.2) {
SB.hudAt = 0;
var sh = Math.round(SB.shield / D.shield * 100), hu = Math.round(SB.hull / D.hull * 100), k2 = SB.second ? SB.second.name : "";
var key = [SB.k, sh, hu, k2, SB.battle ? SB.foes.filter(function (F) { return !F.down; }).length : -1, T ? T.name + Math.round(T.hp) : "", SB.view, Math.round(SB.cool2 * 2)].join("|");
if (key !== SB.hudKey) {
SB.hudKey = key;
var live = SB.battle ? SB.foes.filter(function (F) { return !F.down; }).length : 0, touch = sbTouch();
SB.hud.innerHTML = "<div class='t'><span>" + D.icon + " " + sbEsc(D.short) + "</span><span style='opacity:.75;font:11px var(--sans,system-ui)'>" + (SB.view === "seat" ? "seat" : "behind") + "</span></div>" +
"<div class='r'><span>Shields</span><span>" + sh + "%</span></div><div class='bar'><i style='width:" + sh + "%;background:linear-gradient(90deg,#4AA8FF,#9AD8FF)'></i></div>" +
"<div class='r'><span>Hull</span><span>" + hu + "%</span></div><div class='bar'><i style='width:" + hu + "%;background:" + (hu < 30 ? "linear-gradient(90deg,#D8502A,#FF8A4A)" : "linear-gradient(90deg,#C9A868,#F0D898)") + "'></i></div>" +
"<div class='r'><span>" + (touch ? "Fire" : "F") + ": " + sbEsc(D.gun) + "</span></div>" +
(SB.second ? "<div class='r'><span>" + (touch ? "Gun 2" : "G") + ": " + sbEsc(SB.second.name.toLowerCase()) + "</span><span>" + (SB.cool2 > 0 ? "…" : "ready") + "</span></div>" : "") +
(SB.battle ? "<div class='foe'><b style='color:#FFB070'>" + (SB.battle.why === "duel" ? "The champion's challenge" : (SB.battle.foeName || "Grey raiders") + ": " + live + " left") + "</b>" + (T ? "<div class='r'><span>" + sbEsc(T.name) + "</span> <span>" + Math.max(0, Math.round(T.hp / T.max * 100)) + "%</span></div>" : "") + "</div>" : "") +
"<div class='b'><button data-sb='ships'>Ships</button><button data-sb='view'>View" + (touch ? "" : " (V)") + "</button>" + (SB.battle ? "<button data-sb='target'>Target" + (touch ? "" : " (T)") + "</button>" : "<button data-sb='hunt'>Battles</button>") + "</div>";
}
}
if (!T && SB.battle) {
SB.target = sbNearestFoe(SP.pos, 3000);
}
},
function () {
if (!SB.hud || !SB.mark || SB.hud.style.display === "none")
return;
var T = SB.target && !SB.target.down ? SB.target : null;
if (SB.cross) {
var Gs = sbG(), aim = SP.pos.clone().addScaledVector(sbFwd(yaw, pitch), 700);
if (Gs)
aim.add(Gs.position);
var pr = aim.project(camera), on = pr.z < 1 && Math.abs(pr.x) < 1 && Math.abs(pr.y) < 1;
SB.cross.style.display = on ? "block" : "none";
if (on) {
SB.cross.style.left = ((pr.x + 1) / 2 * innerWidth) + "px";
SB.cross.style.top = ((1 - pr.y) / 2 * innerHeight) + "px";
}
}
if (!T) {
SB.mark.style.display = "none";
SB.arrow.style.display = "none";
return;
}
var G = sbG(), w = T.p.clone();
if (G)
w.add(G.position);
var cam = camera, v = w.clone().project(cam), W = innerWidth, H = innerHeight;
var inFront = v.z < 1;
if (inFront && Math.abs(v.x) < 1 && Math.abs(v.y) < 1) {
var x = (v.x + 1) / 2 * W, y = (1 - v.y) / 2 * H, d = T.p.distanceTo(SP.pos), s = Math.max(26, Math.min(120, T.T.len * 900 / Math.max(30, d)));
var M = SB.mark;
M.style.display = "block";
M.style.left = (x - s / 2) + "px";
M.style.top = (y - s / 2) + "px";
M.style.width = s + "px";
M.style.height = s + "px";
var lbl = sbEsc(T.name) + " · " + Math.round(d) + " m";
if (M.dataset.l !== lbl) {
M.dataset.l = lbl;
M.firstChild.innerHTML = lbl;
}
M.lastChild.firstChild.style.width = Math.max(0, T.hp / T.max * 100) + "%";
SB.arrow.style.display = "none";
}
else {
SB.mark.style.display = "none";
var ax = inFront ? v.x : -v.x, ay = inFront ? v.y : -v.y, ang = Math.atan2(-ay, ax), r = Math.min(W, H) * 0.42;
var A = SB.arrow;
A.style.display = "block";
A.style.left = (W / 2 + Math.cos(ang) * r - 11) + "px";
A.style.top = (H / 2 + Math.sin(ang) * r - 10) + "px";
A.style.transform = "rotate(" + (ang + Math.PI / 2) + "rad)";
}
},
function () {
var fns = {}, h = worldFacts("Battles in open space", "The grey raiders", [["Strikes broken", String(SB.wins)], ["Times your hull gave out", String(SB.downs)], ["Raids", SB.cfg.on ? "on, about every " + SB.cfg.every + " minutes past Mars" : "called off by the Keeper"]], ["The grey raiders came through the Far Gate long ago; some of them crashed in Ironfray's Glass Crater. Past Mars they still prey on traders and travellers.",
"Ships are knocked out, never destroyed: raider crews eject in pods and the Space Corp picks them up.",
"Dues-paying dreamers are paid a bounty for each strike they break, a few times a day."]);
h += worldBtn("hunt", "⚔ Hunt raiders in the belt", "The Corp has a sighting: the shuttle flies you there and they come");
h += worldBtn("hunt2", "⚔ Hunt raiders by Saturn", "A bigger pack, with a gunship");
h += worldBtn("ships", "🚀 Your ships and guns", "Fly a ship you found or bought; mount a star weapon");
h += worldBtn("log", "📖 Your Star Log", "What you have found past the Far Gate, and how its peoples stand with you");
fns.log = function () { if (typeof frLogCard === "function")
frLogCard(); };
fns.hunt = function () { worldCard(null); sbHunt("belt"); };
fns.hunt2 = function () { worldCard(null); sbHunt("saturn"); };
fns.ships = function () { sbShipsCard(); };
worldCard(h, fns);
},
function (where) {
if (!sbHere()) {
sbSay("Take off from the Spaceport first.");
return;
}
if (SB.battle) {
sbSay("You are in a fight already.");
return;
}
var p;
if (where === "saturn") {
p = SP.bodies.saturn.position.clone();
var off = p.clone().normalize().multiplyScalar(-SP_BY.saturn.r * 5);
p.add(off).add(new THREE.Vector3(0, 60, 0));
}
else {
var r = (SP_BY.mars.orbit + SP_BY.jupiter.orbit) * 0.5, a = Math.atan2(SP.pos.z, SP.pos.x);
p = new THREE.Vector3(Math.cos(a) * r, 30, Math.sin(a) * r);
}
SB.hunt = { where: where };
spFlyTo({ pos: p, name: where === "saturn" ? "the raider sighting by Saturn" : "the raider sighting in the belt", after: "Eyes open, pilot.", done: function () { SB.hunt = null; setTimeout(function () { sbStrike({ why: "hunt", ahead: 520, gunship: where === "saturn", n: where === "saturn" ? 4 : 3 }); }, 1800); } });
},
function () {
if (SB.t - SB.cfgAt < 120 && SB.cfgAt > 0)
return;
SB.cfgAt = SB.t || 1;
if (!sbSigned())
return;
sbRpc("space_battle_cfg", {}).then(function (o) { if (o && typeof o === "object") {
SB.cfg = { on: o.on !== false, every: +o.every || 6, bounty: o.bounty == null ? 15 : +o.bounty };
} })
.catch(function (e) { if (sbMissing(e))
SB.missing = true; });
sbRpc("space_reach_me", {}).then(function (o) {
if (!o || !o.ok || typeof frLogGet !== "function")
return;
var L = frLogGet();
(o.log || []).forEach(function (k) { if (!L[k])
L[k] = Date.now(); });
try {
localStorage.setItem("sb.log", JSON.stringify(L));
}
catch (e) { }
var S = frStandGet();
Object.keys(o.standing || {}).forEach(function (p) { if (+o.standing[p] > (+S[p] || 0))
S[p] = +o.standing[p]; });
try {
localStorage.setItem("sb.stand", JSON.stringify(S));
}
catch (e) { }
}).catch(function () { });
sbRpc("space_battle_me", {}).then(function (o) { if (o && o.ok) {
SB.wins = Math.max(SB.wins, +o.wins || 0);
SB.downs = Math.max(SB.downs, +o.downs || 0);
SB.goldWon = +o.gold || 0;
} }).catch(function () { });
},
function (B, downs) {
if (!sbSigned()) {
return;
}
if (SB.missing) {
sbSay("<b>The strike is broken.</b> Bounties open once the server has the latest server update.");
return;
}
sbRpc("space_battle_won", { p_downs: Math.max(1, downs | 0) }).then(function (o) {
if (o && o.say)
setTimeout(function () { sbSay("<b>The strike is broken.</b> " + sbEsc(o.say)); }, 2200);
if (o && o.wins)
SB.wins = Math.max(SB.wins, +o.wins);
if (o && o.paid && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function (e) { if (sbMissing(e))
SB.missing = true; });
},
function (G) {
if (FR.built && FR.g && FR.g.parent === G)
return;
FR.built = true;
FR.bodies = {};
FR.disc = {};
FR.gate = null;
FR.in = false;
var g = new THREE.Group();
g.position.copy(FR.c);
G.add(g);
FR.g = g;
var L = new THREE.PointLight((typeof GX_SYS !== "undefined" && GX_SYS[FR.sys] && GX_SYS[FR.sys].light) || 0xFFD0C0, 0, 0);
g.add(L);
FR.light = L;
FR_BODIES.forEach(function (b) {
var h = new THREE.Group();
g.add(h);
FR.bodies[b.k] = h;
if (b.star) {
var m = new THREE.Mesh(new THREE.SphereGeometry(b.r, 48, 32), new THREE.MeshBasicMaterial({ map: frPaint(b.k), fog: false }));
h.add(m);
h.userData.mesh = m;
[[b.r * 3, 0.85], [b.r * 7, 0.32], [b.r * 14, 0.12]].forEach(function (q) { h.add(wGlow(b.col, q[0], q[1])); });
}
else {
var mesh = new THREE.Mesh(new THREE.SphereGeometry(b.r, sbLite() ? 32 : 56, sbLite() ? 20 : 36), new THREE.MeshStandardMaterial({ map: frPaint(b.paint || b.k), roughness: 0.9, metalness: 0.0 }));
h.add(mesh);
h.userData.mesh = mesh;
if (b.k !== "cinder" && !b.noAir && !sbLite()) {
var at = new THREE.Mesh(new THREE.SphereGeometry(b.r * 1.03, 40, 24), new THREE.MeshBasicMaterial({ color: b.air || (b.k === "orr" ? 0x8AB8FF : b.k === "skeldmar" ? 0xFFB08A : b.k === "hoon" ? 0xE8E0A0 : 0x9AE0FF), transparent: true, opacity: 0.12, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending }));
h.add(at);
}
if (b.ring) {
var rg = spRing(b.r * 1.4, b.r * 2.4, 0.8, spRingTex());
rg.rotation.x = -Math.PI / 2 + 0.35;
h.add(rg);
}
if (b.k === "orr" || b.lights)
frOrrLights(h, b.r, b.lights);
if (b.build)
try {
b.build(h, b);
}
catch (e) {
console.warn("galaxy body", b.k, e);
}
if (b.drift)
frDrift(h, b.r);
}
});
if (FR.sys === "reach") {
var gate = new THREE.Group(), st = wM(0x5A5A6A), gl = wM(0x8AE0FF, { e: 0x2A80A0 });
wMesh(new THREE.TorusGeometry(70, 9, 10, 40), st, 0, 0, 0, gate);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, ch = wBox(12, 8, 22, gl, Math.cos(a) * 70, Math.sin(a) * 70, 0, gate);
ch.rotation.z = a;
}
var film = wMesh(new THREE.CircleGeometry(62, 48), new THREE.MeshBasicMaterial({ color: 0x6AC8FF, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }), 0, 0, 0, gate);
gate.userData.film = film;
gate.position.set(0, 700, 12000);
g.add(gate);
gate.lookAt(FR.c.x + (G.position.x), FR.c.y + 700, FR.c.z + (G.position.z));
FR.gate = gate;
}
FR_DISC.forEach(function (d) { var o = frDiscBuild(d); o.position.set(d.at[0], d.at[1], d.at[2]); g.add(o); FR.disc[d.k] = o; });
},
function (k) {
SP.tex = SP.tex || {};
if (SP.tex["fr_" + k])
return SP.tex["fr_" + k];
var W = 512, H = 256, d = (typeof spxTake === "function" && spxTake("fr|" + k)) || frPaintData(k);
var t = wTex(W, H, function (x) { var img = x.createImageData(W, H); img.data.set(d); x.putImageData(img, 0, 0); });
SP.tex["fr_" + k] = t;
return t;
},
function (h, r) {
var R = wRand(4040), rock = new THREE.DodecahedronGeometry(1, 0), rm = wM(0x4A4642), hm = sbRaiderMats();
var n = sbLite() ? 80 : 220, inst = new THREE.InstancedMesh(rock, rm, n), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3();
for (var i = 0; i < n; i++) {
var a = R() * Math.PI * 2, d = r * 2 + R() * r * 4, y = (R() - 0.5) * r * 0.8;
p.set(Math.cos(a) * d, y, Math.sin(a) * d);
e.set(R() * 3, R() * 3, R() * 3);
q.setFromEuler(e);
var k = 2 + Math.pow(R(), 3) * 30;
s.set(k, k * 0.7, k * 1.2);
m.compose(p, q, s);
inst.setMatrixAt(i, m);
}
h.add(inst);
for (var j = 0; j < (sbLite() ? 6 : 16); j++) {
var w = j % 3 === 0 ? sbFoeModel("gunship") : j % 3 === 1 ? sbFoeModel("dart") : sbBuildCutter(0xB8BCC4, 0x8A3A22);
var a2 = R() * Math.PI * 2, d2 = r * 2.2 + R() * r * 3;
w.position.set(Math.cos(a2) * d2, (R() - 0.5) * r * 0.6, Math.sin(a2) * d2);
w.rotation.set(R() * 3, R() * 3, R() * 3);
w.scale.multiplyScalar(1.4 + R() * 1.5);
w.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
h.add(w);
}
var M = sbFoeModel("marauder");
M.scale.multiplyScalar(5);
M.position.set(r * 2.6, r * 0.4, 0);
h.add(M);
h.userData.maw = M;
},
function (d) {
var g = new THREE.Group();
if (d.build) {
try {
d.build(g, d);
}
catch (e) {
console.warn("galaxy find", d.k, e);
}
return g;
}
if (d.k === "veil") {
var R = wRand(31);
for (var i = 0; i < (sbLite() ? 10 : 26); i++) {
var s = wGlow(i % 3 === 0 ? 0x5AE8D0 : i % 3 === 1 ? 0xFF7AB8 : 0xC88AFF, d.r * (0.5 + R() * 0.9), 0.16 + R() * 0.12);
s.position.set((R() - 0.5) * d.r * 1.6, (R() - 0.5) * d.r * 0.7, (R() - 0.5) * d.r * 1.2);
g.add(s);
}
for (var j = 0; j < 6; j++) {
var st = wGlow(0xF0F4FF, 90, 0.9);
st.position.set((R() - 0.5) * d.r, (R() - 0.5) * d.r * 0.4, (R() - 0.5) * d.r);
g.add(st);
}
}
else if (d.k === "lantern") {
var cr = wM(0xC8A0F0, { e: 0x4A2A7A, op: 0.92 }), cr2 = wM(0x80F0E0, { e: 0x1A6A60 });
var core = wMesh(new THREE.OctahedronGeometry(14, 0), cr, 0, 0, 0, g);
core.scale.set(1, 2.6, 1);
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2, sh = wMesh(new THREE.OctahedronGeometry(5, 0), cr2, Math.cos(a) * 24, 0, Math.sin(a) * 24, g);
sh.scale.set(0.5, 2, 0.5);
}
g.add(wGlow(0xFFE8B0, 260, 0.55));
g.userData.spin = 0.06;
}
else if (d.k === "ark") {
var hull = wM(0x4A4E58), dark = wM(0x22252B), lit = wB(0x3A5A8A);
var b = wMesh(new THREE.CylinderGeometry(26, 30, 260, 12), hull, 0, 0, 0, g);
b.rotation.x = Math.PI / 2;
for (var r2 = 0; r2 < 5; r2++) {
var ring = wMesh(new THREE.TorusGeometry(44, 5, 8, 24), dark, 0, 0, -100 + r2 * 50, g);
}
for (var w = 0; w < 40; w++) {
var a3 = w / 40 * Math.PI * 2;
wBox(2, 1, 6, lit, Math.cos(a3) * 30.5, Math.sin(a3) * 30.5, -120 + (w % 8) * 30, g).rotation.z = a3;
}
wMesh(new THREE.ConeGeometry(26, 60, 12), hull, 0, 0, -160, g).rotation.x = -Math.PI / 2;
g.rotation.set(0.3, 1.1, 0.6);
g.userData.spin = 0.004;
}
else if (d.k === "kethrin") {
var m = new THREE.Mesh(new THREE.SphereGeometry(d.r, 40, 24), new THREE.MeshBasicMaterial({ color: 0x6A1A12, fog: false }));
g.add(m);
var bands = new THREE.Mesh(new THREE.SphereGeometry(d.r * 1.01, 40, 24), new THREE.MeshBasicMaterial({ map: frPaint("ilsa"), transparent: true, opacity: 0.18, fog: false }));
g.add(bands);
g.add(wGlow(0xC83A1A, d.r * 3.4, 0.35));
}
else if (d.k === "comet") {
wSph(d.r, wM(0xE8F0FF, { e: 0x406080 }), 0, 0, 0, g, 14);
var tl = wGlow(0x9AD8FF, d.r * 14, 0.45);
tl.position.set(d.r * 6, 0, 0);
g.add(tl);
g.add(wGlow(0xE8F4FF, d.r * 5, 0.5));
}
else if (d.k === "wreck") {
var wr = sbBuildCutter(0xB8BCC4, 0x8A3A22);
var H = sbFit(wr, 40);
H.rotation.set(0.6, 0.4, 1.9);
g.add(H);
g.userData.spin = 0.01;
H.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
}
return g;
},
function () {
spFlash(0x8AE0FF);
setTimeout(function () {
if (!sbHere())
return;
var gp = SP.gate.position.clone(), back = gp.clone().normalize().multiplyScalar(-280);
SP.pos.copy(gp).add(back);
SP.vel.set(0, 0, 0);
SP.auto = null;
yaw = Math.atan2(gp.x, gp.z);
pitch = 0;
sbSay("<b>Home sky.</b> The Far Gate is behind you, Pluto ahead, and the Sun a bright star a long way in.");
}, 380);
},
function (dt) {
if (!FR.g)
return;
FR.t += dt;
var inR = frIn(), v = new THREE.Vector3();
if (inR !== FR.in) {
FR.in = inR;
if (SP.light) {
if (SP.light.userData.sb0 == null)
SP.light.userData.sb0 = SP.light.intensity;
SP.light.intensity = inR ? SP.light.userData.sb0 * 0.08 : SP.light.userData.sb0;
}
FR.light.intensity = inR ? 1.8 : 0;
FR.g.visible = inR || SP.pos.distanceTo(FR.c) < 60000;
}
if (!inR && !FR.g.visible)
return;
FR.near = null;
var best = 1e9;
FR_BODIES.forEach(function (b) {
var h = FR.bodies[b.k];
if (!h)
return;
frBodyPos(b.k, v);
h.position.copy(v);
if (h.userData.mesh)
h.userData.mesh.rotation.y += dt * (b.star ? 0.01 : 0.03);
if (!inR)
return;
var w = v.clone().add(FR.c), d = SP.pos.distanceTo(w), min = b.r * (b.star ? 1.6 : 1.1) + 4;
if (d < min) {
SP.pos.copy(w).addScaledVector(SP.pos.clone().sub(w).normalize(), min);
SP.vel.multiplyScalar(0.2);
}
var rel = (d - b.r) / Math.max(b.r, 20);
if (rel < best && d < b.r * 3.4 + 60) {
best = rel;
FR.near = { b: b, d: d };
}
});
if (FR.gate && FR.gate.userData.film)
FR.gate.userData.film.material.opacity = 0.35 + 0.15 * Math.sin(WLD.t * 2);
FR_DISC.forEach(function (d) {
var o = FR.disc[d.k];
if (o && o.userData.spin)
o.rotation.y += dt * o.userData.spin;
if (!inR)
return;
var dd = SP.pos.distanceTo(frDiscPos(d));
if (dd < d.r * 1.8 + 260) {
frSee(d.k);
if (!(FR.near && FR.near.b && dd > d.r * 0.25 + 200))
FR.near = { disc: d, d: dd };
}
});
if (inR && FR_BY.cinder && !SB.battle && SB.cfg.on && SP.pos.distanceTo(frWorld("cinder")) < FR_BY.cinder.r * 12) {
SB.strikeAt = Math.min(SB.strikeAt, 20);
}
},
function (k) {
var L = frLogGet();
if (L[k])
return false;
L[k] = Date.now();
try {
localStorage.setItem("sb.log", JSON.stringify(L));
}
catch (e) { }
if (sbSigned() && !SB.missing)
sbRpc("space_log_add", { p_k: k }).catch(function () { });
var nm = k === "reach" ? "the Far Reach" : (FR_BY[k] ? FR_BY[k].name : (FR_DISC.filter(function (d) { return d.k === k; })[0] || {}).name) || k;
setTimeout(function () { sbSay("✦ <b>New in your Star Log:</b> " + sbEsc(nm) + "."); sbTone(988, 0.12); setTimeout(function () { sbTone(1318, 0.16); }, 140); }, 900);
return true;
},
function () {
var L = frLogGet(), fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📖 Your Star Log</div>";
var all = FR_BODIES.map(function (b) { return { k: b.k, name: b.name, kind: b.kind, card: function () { frInfo(b.k); } }; }).concat(FR_DISC.map(function (d) { return { k: d.k, name: d.name, kind: d.kind, card: function () { worldCard(worldFacts(d.name, d.kind, [], d.notes), {}); } }; }));
var found = all.filter(function (x) { return L[x.k]; });
h += "<div style='opacity:.8'>" + found.length + " of " + all.length + " things in the Far Reach found." + (L.reach ? "" : " Go through the Far Gate past Pluto to begin.") + "</div>";
found.forEach(function (x) { h += worldBtn("l-" + x.k, "✦ " + sbEsc(x.name), sbEsc(x.kind)); fns["l-" + x.k] = x.card; });
if (found.length < all.length)
h += "<div style='opacity:.7;font-size:12px;margin-top:6px'>" + (all.length - found.length) + " more to find. Fly close to anything strange and press E.</div>";
if (typeof frStandHtml === "function")
h += frStandHtml();
worldCard(h, fns);
},
function (p, why) {
var W = FR_WHY[why];
if (!W || !FR_PEOPLES[p])
return 0;
var S = frStandGet(), key = "_" + p + "_" + why, day = new Date().toISOString().slice(0, 10), was = frLevel(p);
S._log = S._log || {};
if (W.once && S._log[key])
return 0;
if (W.day) {
var dk = key + "_" + day;
if ((S._log[dk] || 0) >= W.day)
return 0;
S._log[dk] = (S._log[dk] || 0) + 1;
}
S._log[key] = 1;
S[p] = (+(S[p] || 0)) + W.pts;
try {
localStorage.setItem("sb.stand", JSON.stringify(S));
}
catch (e) { }
if (sbSigned() && !SB.missing)
sbRpc("space_standing_add", { p_people: p, p_why: why }).catch(function () { });
var now = frLevel(p);
if (now !== was)
setTimeout(function () { sbSay("<b>" + sbEsc(FR_PEOPLES[p].name.charAt(0).toUpperCase() + FR_PEOPLES[p].name.slice(1)) + "</b> now count you as " + (now === "Ally" ? "an ally" : now === "Honoured" ? "honoured" : "a friend") + "." + (now === "Ally" && FR_PEOPLES[p].ally ? " Their ships will fly beside you in the Reach's battles." : "") + (now === "Honoured" ? " They give you a gift: <b>" + sbEsc(FR_PEOPLES[p].gift) + "</b>. It is in your backpack." : "")); if (now === "Honoured")
frGift(p); }, 1400);
return W.pts;
},
function () {
var h = "<div style='margin-top:10px;font-weight:600'>The peoples you know</div>", L = frLogGet();
Object.keys(FR_PEOPLES).forEach(function (p) {
var P = FR_PEOPLES[p], n = frStand(p);
if (!n && !L[P.world])
return;
var done = frStandGet()._log && frStandGet()._log["_" + p + "_task"];
h += "<div style='font-size:12.5px;margin:3px 0'><b>" + sbEsc(P.name.charAt(0).toUpperCase() + P.name.slice(1)) + "</b>: " + frLevel(p) + " (" + n + ")" + (done ? " · ✓ " + sbEsc(P.task.name) : " · " + sbEsc(P.task.name)) + "</div>";
});
return h;
},
function (seed, o) {
var g = wPerson(seed, { title: o.title, sex: o.sex, look: o.look || {} });
if (o.feats && typeof dressFolk === "function")
try {
dressFolk(g, { look: o.look || {} }, 1, { feats: o.feats });
}
catch (e) { }
if (o.arms) {
var sk = mmMat(o.look && o.look.skin != null ? o.look.skin : 0x6A9A4A, { shine: 10 });
[-1, 1].forEach(function (s) { mmCaps(g, sk, 0.045, 0.04, 0.42, s * 0.2, 1.12, 0.06, 0.6, 0, s * 0.9, 8); });
}
if (o.scale)
g.scale.setScalar(o.scale);
return g;
},
function (seed, col) {
var g = new THREE.Group(), body = mmMat(col || 0x6A707C, { shine: 50, tex: "plate" }), dark = mmMat(0x2A2E36, { shine: 30 }), eye = mmMat(0x8AC8FF, { glow: 1 });
mmCaps(g, body, 0.28, 0.22, 0.8, 0, 1.35, 0, 0, 0, 0, 12);
mmEll(g, body, 0.2, 0.24, 0.22, 0, 2.08, 0, 14);
mmSlab(g, eye, 0.26, 0.04, 0.06, 0, 2.1, 0.18);
[-1, 1].forEach(function (s) { mmRod(g, dark, [s * 0.34, 1.7, 0], [s * 0.42, 1.05, 0.05], 0.05); mmRod(g, dark, [s * 0.42, 1.05, 0.05], [s * 0.4, 0.62, 0.12], 0.04); mmRod(g, dark, [s * 0.12, 0.95, 0], [s * 0.14, 0.05, 0], 0.06); mmEll(g, body, 0.09, 0.06, 0.16, s * 0.14, 0.04, 0.04, 8); });
mmCyl(g, dark, 0.3, 0.3, 0.06, 0, 1.78, 0, 0, 0, 0, 14);
g.userData.wSeed = seed;
return g;
},
function (k, i) {
if (k === "tullimar")
return { look: { skin: [0x6A9A4A, 0x7AA858, 0x5A8A3A][i % 3], hair: 0x2A3A1A, hairStyle: "bald" }, feats: ["ears", "wide"], scale: 0.62, arms: 1 };
if (k === "maruondo")
return { look: { skin: [0x4A7AC8, 0x5A8AD8, 0x3A6AB8][i % 3], hair: [0xE8F0FF, 0x9AE0E8, 0x2A3A5A][i % 3], layer: "robe", layerColor: [0x3AC8B0, 0xE8D8F0, 0x2A8AC8][i % 3] }, feats: ["ears", "glow"], scale: 1.42 };
if (k === "skeldmar")
return { look: { skin: [0x8A8680, 0x7A766E, 0x9A9288][i % 3], hair: 0x2A2420, layer: "cloak", layerColor: [0x8A2A1A, 0x2A2A2A, 0x6A1A10][i % 3] }, feats: ["horns", "wide"], scale: 1.22 };
return {};
},
function (G, k) {
var T = FR_TOWN[k], C = T.center, R = wRand(k.length * 911), sol = SF.solids;
var hy = function (x, z) { return sfHeight(x, z); };
if (k === "tullimar") {
var brass = mmMat(0xC8A060, { shine: 60, tex: "brass" }), canvas = [mmMat(0x3A8A4A, { ds: true }), mmMat(0xE8C27A, { ds: true }), mmMat(0x8A3A6A, { ds: true }), mmMat(0x2A6AA8, { ds: true })], wood = mmMat(0x6A4A2A, { tex: "worn" });
var bt = mmG(G, C[0], hy(C[0], C[1]), C[1]);
mmCyl(bt, brass, 2.2, 3, 10, 0, 5, 0);
mmCone(bt, canvas[0], 3.4, 4, 0, 12, 0);
var bell = mmLathe(bt, brass, [[0, 0], [1.4, 0.1], [1.2, 1.2], [0.5, 2.1], [0, 2.2]], 0, 6.5, 0, 20);
bell.rotation.x = Math.PI;
sol.push({ x: C[0], z: C[1], r: 3.2 });
for (var ring = 0; ring < 2; ring++) {
var n = ring ? 12 : 8, rr = ring ? 44 : 24;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + ring * 0.2, x = C[0] + Math.cos(a) * rr, z = C[1] + Math.sin(a) * rr, y = hy(x, z), s = mmG(G, x, y, z, 0, -a + Math.PI / 2, 0);
mmCyl(s, wood, 2.6, 2.8, 1.0, 0, 0.5, 0, 0, 0, 0, 14);
var dome = mmMesh(new THREE.SphereGeometry(3.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), canvas[(i + ring) % 4], 0, 2.6, 0, s);
for (var p = 0; p < 4; p++) {
var pa = p / 4 * Math.PI * 2 + 0.4;
mmCyl(s, brass, 0.07, 0.07, 2.2, Math.cos(pa) * 2.7, 1.6, Math.sin(pa) * 2.7);
}
for (var w = 0; w < 5; w++) {
mmEll(s, mmMat([0xE8C27A, 0xC86A3A, 0x6AC8A8, 0xB8A0E8, 0xF0E0C0][(w + i) % 5], { shine: 40 }), 0.22, 0.18, 0.22, (w - 2) * 0.42, 1.2, 1.9, 10);
}
sol.push({ x: x, z: z, r: 2.9 });
}
}
for (var L = 0; L < 16; L++) {
var la = L / 16 * Math.PI * 2, lx = C[0] + Math.cos(la) * 34, lz = C[1] + Math.sin(la) * 34;
mmCyl(G, wood, 0.1, 0.12, 4.2, lx, hy(lx, lz) + 2.1, lz);
var lan = mmEll(G, mmMat([0xFFD08A, 0xFF9A6A, 0xA8F0C8][L % 3], { glow: 1 }), 0.32, 0.42, 0.32, lx, hy(lx, lz) + 4.3, lz, 10);
if (!sbLite())
mmGlow(G, 0xFFD08A, 3.2, 0.45, lx, hy(lx, lz) + 4.3, lz);
}
var dk = mmG(G, C[0] + 70, hy(C[0] + 70, C[1]), C[1]);
mmSlab(dk, wood, 14, 0.5, 10, 0, 0.25, 0);
var bg = spAlienShip(0x7AD87A, "tullik");
bg.scale.setScalar(0.45);
bg.position.set(0, 6, 0);
dk.add(bg);
sol.push({ x: C[0] + 70, z: C[1], r: 7 });
}
if (k === "maruondo") {
var coral = [mmMat(0xF08A7A, { shine: 20 }), mmMat(0xE8C8A0, { shine: 20 }), mmMat(0xB87AE0, { shine: 20 }), mmMat(0x6AD8C8, { shine: 20 })], shell = mmMat(0xF4EDE0, { shine: 70, tex: "pearl" });
var sea = new THREE.Mesh(new THREE.CircleGeometry(4000, 64), new THREE.MeshStandardMaterial({ color: 0x1A6A9A, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.88 }));
sea.rotation.x = -Math.PI / 2;
sea.position.y = -0.6;
G.add(sea);
SF.frSea = sea;
for (var c2 = 0; c2 < 22; c2++) {
var a2 = R() * Math.PI * 2, d2 = 40 + R() * 170, x2 = Math.cos(a2) * d2, z2 = Math.sin(a2) * d2 + C[1] * 0.3, h2 = 6 + R() * 16;
var sp = mmG(G, x2, hy(x2, z2), z2);
for (var b = 0; b < 4; b++) {
mmHorn(sp, coral[(c2 + b) % 4], [[0, 0, 0], [(R() - 0.5) * 2, h2 * 0.5, (R() - 0.5) * 2], [(R() - 0.5) * 3, h2, (R() - 0.5) * 3]], 0.9 - b * 0.15, (b - 1.5) * 1.2, 0, (b % 2) * 1.1);
}
sol.push({ x: x2, z: z2, r: 2.4 });
}
for (var hs = 0; hs < 10; hs++) {
var ah = hs / 10 * Math.PI * 2, xh = C[0] + Math.cos(ah) * 38, zh = C[1] + Math.sin(ah) * 38, hh = mmG(G, xh, hy(xh, zh), zh, 0, -ah, 0);
mmLathe(hh, shell, [[0, 0], [4.2, 0], [4.6, 1.4], [4, 3.6], [2.6, 5.6], [1, 7], [0, 7.4]], 0, 0, 0, 20);
mmSlab(hh, mmMat(0x2A4A6A, { shine: 40 }), 1.6, 2.6, 0.3, 0, 1.3, 4.4);
mmGlow(hh, 0x8AF0FF, 2.6, 0.4, 0, 3.4, 4.6);
sol.push({ x: xh, z: zh, r: 4.6 });
}
var pool = new THREE.Mesh(new THREE.CircleGeometry(9, 32), mmMat(0x3AE8D0, { glow: 1, op: 0.55 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(C[0], hy(C[0], C[1]) + 0.08, C[1]);
G.add(pool);
mmTorus(G, coral[1], 9.2, 0.6, C[0], hy(C[0], C[1]) + 0.2, C[1], Math.PI / 2, 0, 0);
}
if (k === "orr") {
var plate = mmMat(0x4A505A, { shine: 45, tex: "plate" }), dark2 = mmMat(0x23262C, { shine: 30, tex: "plate" }), line = mmMat(0x6AB8FF, { glow: 1 });
for (var gx = -3; gx <= 3; gx++)
for (var gz = -4; gz <= 1; gz++) {
if (Math.abs(gx) <= 1 && gz >= -1)
continue;
var tx = gx * 48, tz = gz * 48 - 40;
if (Math.hypot(tx - C[0], tz - (C[1] - 30)) < 26)
continue;
var th = 20 + ((gx * 7 + gz * 13 + 40) % 5) * 14;
var tw = mmG(G, tx, hy(tx, tz), tz);
mmSlab(tw, (gx + gz) % 2 ? plate : dark2, 10, th, 10, 0, th / 2, 0);
mmSlab(tw, line, 0.4, th * 0.9, 10.2, 5.05, th / 2, 0);
mmSlab(tw, line, 10.2, 0.3, 0.3, 0, th * 0.95, 5.05);
mmCone(tw, dark2, 2, 6, 0, th + 3, 0, 0, 0, 0, 4);
sol.push({ x: tx, z: tz, hw: 5.2, hd: 5.2 });
}
for (var rd = -3; rd <= 3; rd++) {
mmSlab(G, line, 0.25, 0.06, 300, rd * 48 + 24, hy(0, 0) + 0.04, -60);
}
var ar = mmG(G, C[0], hy(C[0], C[1] - 30), C[1] - 30);
var eyeM = mmEll(ar, mmMat(0x8AC8FF, { glow: 1 }), 3.2, 1.2, 0.6, 0, 11.9, 13.6, 16);
SF.frEye = eyeM;
frOrrHall(ar, C[0], C[1] - 30, dark2, line, sol);
}
if (k === "skeldmar") {
var stone = mmMat(0x8A5A44, { shine: 10, tex: "worn", rep: 2 }), stone2 = mmMat(0x6A3E2E, { shine: 10, tex: "worn" }), iron = mmMat(0x3A3A3E, { shine: 40, tex: "plate" }), red = mmMat(0x8A1A10, { ds: true }), black = mmMat(0x1A1A1E, { ds: true });
for (var wi = 0; wi < 14; wi++) {
var aw = Math.PI * 1.15 + wi / 13 * Math.PI * 0.7, xw = C[0] + Math.cos(aw) * 90, zw = C[1] + Math.sin(aw) * 90 + 40, yw = hy(xw, zw);
var wg = mmG(G, xw, yw, zw, 0, -aw + Math.PI / 2, 0);
mmSlab(wg, stone, 22, 14, 5, 0, 7, 0);
for (var m = 0; m < 6; m++)
mmSlab(wg, stone2, 2.2, 2, 5.4, -9 + m * 3.6, 15, 0);
sol.push({ x: xw, z: zw, r: 9 });
if (wi % 3 === 0) {
var tg = mmG(G, xw, yw, zw);
mmCyl(tg, stone2, 6, 7, 26, 0, 13, 0, 0, 0, 0, 10);
mmCone(tg, iron, 7.5, 9, 0, 30, 0, 0, 0, 0, 10);
var bn = mmFlat(tg, wi % 2 ? red : black, [[0, 0], [3, 0], [3, 7], [1.5, 5.6], [0, 7]], 0.05, 6.6, 12, 0, 0, Math.PI / 2, 0);
sol.push({ x: xw, z: zw, r: 7.2 });
}
}
var hl = mmG(G, C[0], hy(C[0], C[1] - 24), C[1] - 24);
mmSlab(hl, stone, 34, 16, 22, 0, 8, 0);
mmFlat(hl, stone2, [[-19, 0], [19, 0], [0, 12]], 22, 0, 16, 0);
mmSlab(hl, iron, 6, 9, 0.6, 0, 4.5, 11.2);
mmSlab(hl, red, 8, 10, 0.2, -11, 9, 11.15);
mmSlab(hl, black, 8, 10, 0.2, 11, 9, 11.15);
sol.push({ x: C[0], z: C[1] - 24, hw: 17.5, hd: 11.5 });
var fire = mmG(G, C[0], hy(C[0], C[1] + 4), C[1] + 4);
mmCyl(fire, stone2, 2.6, 3, 1, 0, 0.5, 0, 0, 0, 0, 14);
mmGlow(fire, 0xFF8A3A, 7, 0.7, 0, 2, 0);
sol.push({ x: C[0], z: C[1] + 4, r: 3 });
var ringG = mmG(G, C[0] + 40, hy(C[0] + 40, C[1] + 10), C[1] + 10);
for (var rs = 0; rs < 16; rs++) {
var ar2 = rs / 16 * Math.PI * 2;
mmCyl(ringG, stone2, 0.6, 0.8, 2.4, Math.cos(ar2) * 12, 1.2, Math.sin(ar2) * 12, 0, 0, 0, 8);
}
}
},
function (G, k) {
var T = FR_TOWN[k];
if (!T)
return;
try {
frBuildTown(G, k);
}
catch (e) {
console.warn("far reach town", k, e);
}
SF.frFolk = [];
var people = Object.keys(FR_PEOPLES).filter(function (p) { return FR_PEOPLES[p].world === k; })[0];
var Lp = T.leader.at, lead;
if (k === "orr")
lead = null;
else {
var fl = frFolkLook(k, 0);
lead = frFolk("fr_" + k + "_lead", { title: T.leader.title, sex: T.leader.sex || (k === "skeldmar" || k === "tullimar" ? "f" : "m"), look: fl.look, feats: fl.feats, scale: (fl.scale || 1) * 1.06, arms: fl.arms });
lead.position.set(Lp[0], sfHeight(Lp[0], Lp[1] + 6), Lp[1] + 6);
G.add(lead);
}
SF.sites.push({ x: Lp[0], z: Lp[1] + 6, r: k === "orr" ? 24 : 4, name: T.leader.name + ", " + T.leader.title, frLead: { k: k, p: people }, talk: { name: T.leader.name, persona: T.leader.persona, greet: T.leader.greet } });
T.folk.forEach(function (f, i) {
var a = i / T.folk.length * Math.PI * 2 + 0.3, d = k === "tullimar" ? (i % 2 ? 30 : 16) : 18 + (i % 3) * 9, x = T.center[0] + Math.cos(a) * d, z = T.center[1] + Math.sin(a) * d;
var g = k === "orr" ? frRobot("fr_" + k + i, [0x6A707C, 0x8A8070, 0x5A6A7A][i % 3]) : (function () { var fl = frFolkLook(k, i + 1); return frFolk("fr_" + k + i, { title: f[1], sex: i % 2 ? "f" : "m", look: fl.look, feats: fl.feats, scale: fl.scale, arms: fl.arms }); })();
g.position.set(x, sfHeight(x, z), z);
g.rotation.y = -a - Math.PI / 2;
G.add(g);
SF.frFolk.push(g);
SF.sites.push({ x: x, z: z, r: 2.6, name: f[0] + ", " + f[1], talk: { name: f[0], persona: T.persona + " Your name is " + f[0] + " and you are the " + f[1].toLowerCase() + ".", greet: null } });
});
frLog(k);
},
function (site) {
var p = site.frLead.p, P = FR_PEOPLES[p], T = P.task, S = frStandGet(), done = S._log && S._log["_" + p + "_task"], fns = {};
frStandAdd(p, "meet");
var ready = T.need ? frLogged(T.need) : false;
var h = worldFacts(site.talk.name, (P.name.charAt(0).toUpperCase() + P.name.slice(1)) + " · they count you as: " + frLevel(p), [], []);
h += worldBtn("talk", "💬 Talk with them", "They answer in their own words");
if (!done) {
h += worldBtn("task", "★ " + sbEsc(T.name), sbEsc(T.say));
if (ready)
h += worldBtn("give", "✓ Give them what you found", "From your Star Log");
}
else
h += "<div style='opacity:.8;margin-top:6px'>✓ You have done them a great service: " + sbEsc(T.name) + ".</div>";
if (p === "tullik")
h += worldBtn("trade", "⚖ Trade at the swap-stalls", "A friendly swap: they remember who trades fairly");
fns.talk = function () { worldCard(null); wTalk(site.talk); };
fns.task = function () { frTaskStart(p); };
fns.give = function () { worldCard(null); frTaskDone(p); };
fns.trade = function () { var n = frStandAdd(p, "trade"); worldCard(null); sbSay(n ? "<b>A fair swap.</b> The Tullik like you a little better for it." : "The stalls have had all your trade they can take today. Come back tomorrow."); };
worldCard(h, fns);
},
function (p) {
var T = FR_PEOPLES[p].task;
worldCard(null);
if (T.k === "escort")
return frEscortOffer();
if (T.k === "duel")
return frDuelOffer();
var where = "the Reach";
try {
if (typeof GX_SYS !== "undefined")
Object.keys(GX_SYS).forEach(function (k) { (GX_SYS[k].disc || []).forEach(function (d) { if (d.k === T.need && k !== "reach")
where = String(GX_SYS[k].name).replace(/^The /, "the "); }); });
}
catch (e) { }
sbSay("<b>" + sbEsc(T.name) + ".</b> " + sbEsc(T.say) + " Take off and open the chart (M): it is out in " + sbEsc(where) + (where !== "the Reach" ? " (Star Drive, J)" : "") + ".");
},
function (p) {
var T = FR_PEOPLES[p].task;
if (T.need && !frLogged(T.need)) {
sbSay("You have not found it yet.");
return;
}
frStandAdd(p, "task");
var say = { lantern: "Ilun holds the reading to the light and smiles. \"So the Lantern still burns. Then our first ships were not lost. Thank you, friend.\"",
veil: "Elder Moana-Rhu closes her eyes and hums the Veil's song back to you. Out on the reef, the coral begins to grow in a new shape.",
ark: "The Archive is silent a long time. \"They fled the grey ones. They meant to come back for me.\" Its eye glows a little brighter. \"Thank you for telling me. I am not forgotten.\"" }[T.k] || T.done || "They thank you.";
sbSay("<b>" + sbEsc(T.name) + ": done.</b> " + say);
if (T.k === "ark" && SF.frEye && SF.frEye.material)
SF.frEye.material = mmMat(0xB8E8FF, { glow: 1 });
},
function (ar, cx, cz, dark2, line, sol) {
var lite = typeof sbLite === "function" && sbLite(), gap = 0.24, R = 18;
var shell = mmMat(0x2A2E36, { shine: 30, tex: "plate", ds: true }), inner = mmMat(0x3A4250, { shine: 20, tex: "plate", ds: true });
function V(L, f) { return L.map(function (q) { return new THREE.Vector2(q[0] * f, q[1] * f); }); }
var low = [[0, 0], [18, 0], [17, 6], [16.2, 7.3]], top = [[16.2, 7.3], [12, 14], [5, 19], [0, 20]];
mmMesh(new THREE.LatheGeometry(V(low, 1), 48, gap, Math.PI * 2 - gap * 2), shell, 0, 0, 0, ar);
mmMesh(new THREE.LatheGeometry(V(top, 1), 48), shell, 0, 0, 0, ar);
mmMesh(new THREE.LatheGeometry(V(low, 0.97), 48, gap, Math.PI * 2 - gap * 2), inner, 0, 0.05, 0, ar);
mmMesh(new THREE.LatheGeometry(V(top, 0.97), 48), inner, 0, 0.05, 0, ar);
var dw = Math.sin(gap) * R, dz = Math.cos(gap) * R;
mmSlab(ar, dark2, 1.2, 7, 1.4, -dw, 3.5, dz);
mmSlab(ar, dark2, 1.2, 7, 1.4, dw, 3.5, dz);
mmSlab(ar, dark2, dw * 2 + 1.2, 1.2, 1.4, 0, 7.4, dz);
mmSlab(ar, line, 0.2, 6.8, 0.2, -dw + 0.7, 3.4, dz + 0.75);
mmSlab(ar, line, 0.2, 6.8, 0.2, dw - 0.7, 3.4, dz + 0.75);
mmSlab(ar, line, dw * 2 - 1.2, 0.2, 0.2, 0, 6.75, dz + 0.75);
try {
var sg = wSign(["THE READING HALL", "the Archive of Orr · come in"], 8, 1.6, "#0C1420", "#CFEAFF");
sg.material = new THREE.MeshBasicMaterial({ map: sg.material.map, side: THREE.DoubleSide });
sg.position.set(0, 8.85, dz + 0.1);
ar.add(sg);
}
catch (e) { }
var fl = mmMat(0x6AB8FF, { glow: 1, op: 0.55 });
[5, 9.5, 14].forEach(function (r) { mmTorus(ar, fl, r, 0.07, 0, 0.06, 0, Math.PI / 2, 0, 0); });
mmSlab(ar, fl, 0.12, 0.03, R - 4, 0, 0.05, (R - 4) / 2 + 4);
mmCyl(ar, dark2, 2.6, 3.2, 1.2, 0, 0.6, 0, 0, 0, 0, 24);
mmCyl(ar, mmMat(0x9AD8FF, { glow: 1, op: 0.35 }), 1.3, 1.3, 15, 0, 8, 0, 0, 0, 0, 20);
mmCyl(ar, mmMat(0xE0F4FF, { glow: 1 }), 0.35, 0.35, 15, 0, 8, 0, 0, 0, 0, 10);
var rings = mmG(ar, 0, 0, 0);
[4, 7.5, 11].forEach(function (y, i) { mmTorus(rings, line, 2.2 + i * 0.6, 0.08, 0, y, 0, Math.PI / 2 + 0.25 * (i - 1), 0, 0.2 * i); });
mmEll(ar, mmMat(0xBFE8FF, { glow: 1 }), 1.6, 1.0, 1.6, 0, 12.5, 0, 16);
mmGlow(ar, 0x8AC8FF, 14, 0.45, 0, 12.5, 0);
mmGlow(ar, 0x6AB8FF, 9, 0.3, 0, 3, 0);
sol.push({ x: cx, z: cz, r: 3.4 });
var desk = mmMat(0x3A404A, { shine: 35, tex: "plate" }), scr = [mmMat(0x8AE0FF, { glow: 1 }), mmMat(0xB8F0D8, { glow: 1 }), mmMat(0xFFE0A0, { glow: 1 })];
[[7.5, 10], [12, 16]].forEach(function (rw, ri) {
for (var i = 0; i < rw[1]; i++) {
var a = (i + 0.5) / rw[1] * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.5)
continue;
var x = Math.sin(a) * rw[0], z = Math.cos(a) * rw[0], d = mmG(ar, x, 0, z, 0, a + Math.PI, 0);
mmSlab(d, desk, 1.4, 1.0, 0.8, 0, 0.5, 0);
mmSlab(d, desk, 1.6, 0.08, 1.0, 0, 1.05, 0.05, -0.35, 0, 0);
mmSlab(d, scr[(i + ri) % 3], 1.2, 0.7, 0.04, 0, 1.55, -0.32, -0.25, 0, 0);
if (!lite && i % 3 === 0)
mmSlab(d, scr[(i + 1) % 3], 0.5, 0.02, 0.36, 0.3, 1.1, 0.1, -0.35, 0, 0);
}
});
var core = [mmMat(0x6AB8FF, { glow: 1 }), mmMat(0x2A4A6A, { shine: 40 }), mmMat(0x9AF0D8, { glow: 1 })];
for (var j = 0; j < 22; j++) {
var b = (j + 0.5) / 22 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(b), Math.cos(b))) < 0.45)
continue;
var rx = Math.sin(b) * 15.6, rz = Math.cos(b) * 15.6, rk = mmG(ar, rx, 0, rz, 0, b, 0);
mmSlab(rk, dark2, 2.4, 4.2, 0.6, 0, 2.1, 0);
for (var row = 0; row < 4; row++)
for (var c = 0; c < 4; c++)
mmSlab(rk, core[(j * 3 + row * 2 + c) % 3], 0.36, 0.5, 0.1, -0.84 + c * 0.56, 0.7 + row * 0.95, -0.33);
}
if (!lite) {
var L = new THREE.PointLight(0xA8D8FF, 1.6, 34, 1.2);
L.position.set(0, 9, 0);
ar.add(L);
var L2 = new THREE.PointLight(0xFFE8C0, 0.6, 22, 1.5);
L2.position.set(0, 4, 10);
ar.add(L2);
}
try {
var G = ar.parent;
G.children.slice().forEach(function (m) {
if (!m.isMesh || !/Icosahedron|Dodecahedron/.test(m.geometry.type))
return;
if (Math.abs(m.position.x - cx) < 7 && m.position.z > cz + 15 && m.position.z < cz + 40) {
G.remove(m);
for (var q = sol.length - 1; q >= 0; q--)
if (Math.hypot(sol[q].x - m.position.x, sol[q].z - m.position.z) < 0.5 && sol[q].r && !sol[q].hw)
sol.splice(q, 1);
}
});
}
catch (e) { }
for (var k = 0; k < 40; k++) {
var t = (k + 0.5) / 40 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(t), Math.cos(t))) < gap + 0.04)
continue;
sol.push({ x: cx + Math.sin(t) * R, z: cz + Math.cos(t) * R, r: 1.6 });
}
},
function (kind) {
var g = new THREE.Group();
if (kind === "skiff") {
var m = mmMat(0xB890F0, { e: 0x3A1A6A, ei: 0.5, shine: 60, tex: "pearl" });
var h = mmEll(g, m, 5.2, 1.1, 2.8, 0, 0, 0, 20);
mmEll(g, mmMat(0xF0E0FF, { e: 0x6A4A9A, ei: 0.6, op: 0.85 }), 1.6, 1.1, 1.6, 0, 1.0, -0.6, 14);
[-1, 1].forEach(function (s) { mmFlat(g, m, [[0, 0], [3.4, 1.2], [3.6, 2.2], [0, 1.6]], 0.2, s * 2.4, 0, 1, Math.PI / 2, 0, s < 0 ? 0 : 0); });
mmGlow(g, 0xC8A0FF, 14, 0.5, 0, 0, 3);
}
else {
var st = mmMat(0x6A5A4E, { shine: 15, tex: "worn" }), ir = mmMat(0x3A3A3E, { shine: 40, tex: "plate" }), rd = mmMat(0x8A1A10, { ds: true });
var hl = mmLathe(g, st, [[0, -7], [1.6, -6], [2.4, -2], [2.4, 3], [1.6, 6], [0, 7.4]], 0, 0, 0, 8);
hl.rotation.x = -Math.PI / 2;
hl.scale.set(1.3, 0.8, 1);
mmCone(g, ir, 1.2, 3.4, 0, 0, -8.6, -Math.PI / 2, 0, 0, 6);
mmFlat(g, rd, [[0, 0], [4, 0], [4, 5], [2, 4], [0, 5]], 0.05, 0, 2.2, 0, 0, Math.PI / 2, 0);
mmCyl(g, ir, 0.12, 0.12, 6, 0, 4, 0);
[-1, 1].forEach(function (s) { mmSlab(g, ir, 0.4, 1.4, 9, s * 2.8, 0, 0); sbEngine(g, ir, 0xFF8A4A, 0.7, s * 1.4, 0, 7.2, 1.4); });
}
return sbFit(g, kind === "skiff" ? 14 : 18);
},
function () {
if (SB.esc && !SB.esc.done) {
sbSay("The barge is waiting for you above Tullimar.");
return;
}
SB.esc = { name: "the barge Spice Wind", from: "tullimar", to: "veyar", started: false, done: false, hp: 200, max: 200, g: null, p: null, v: new THREE.Vector3(), ambush: 0 };
sbSay("<b>The barge to Veyar.</b> Take off: the barge <b>Spice Wind</b> waits above Tullimar. Fly up beside it and press E when you are ready.");
},
function (dt) {
var E = SB.esc;
if (!E || E.done)
return;
if (!frIn() || FR.sys !== "reach") {
if (E.g && E.g.parent) {
E.g.parent.remove(E.g);
E.g = null;
}
return;
}
if (!E.g)
frEscortPlace();
if (!E.started)
return;
E.t += dt;
var to = frWorld(E.to), d = to.distanceTo(E.p), dir = to.clone().sub(E.p).normalize();
var slow = SB.battle ? 0.35 : 1, gap = SP.pos.distanceTo(E.p);
var spd = (gap > 1500 ? 0 : 140) * slow;
E.v.lerp(dir.multiplyScalar(spd), Math.min(1, dt * 0.8));
E.p.addScaledVector(E.v, dt);
E.g.position.copy(E.p);
E.g.rotation.y += dt * 0.4;
var path = frWorld(E.to).distanceTo(frWorld(E.from)), done = 1 - d / Math.max(1, path);
if (!SB.battle && ((E.ambush === 0 && done > 0.25) || (E.ambush === 1 && done > 0.65))) {
E.ambush++;
sbStrike({ why: "barge", ahead: 300, n: E.ambush === 1 ? 3 : 4, gunship: E.ambush === 2 });
sbSay("<b>Raiders on the barge!</b> Ollo-Tullik: \"They are after the cake! Help!\"");
}
if (SB.battle)
SB.foes.forEach(function (F) { if (!F.down && F.p.distanceTo(E.p) < 260 && Math.random() < dt * 0.5) {
E.hp -= 4;
sbPuff(E.p, 0xFFA040, 10);
} });
if (E.hp <= 0) {
E.done = true;
sbSay("<b>The Spice Wind is crippled.</b> Ollo-Tullik limps home in the life-pod, unhurt. \"Next time, pilot!\" You can try again from the Matron's stall.");
if (E.g && E.g.parent)
E.g.parent.remove(E.g);
SB.esc = null;
return;
}
if (d < FR_BY[E.to].r * 3) {
E.done = true;
frStandAdd("tullik", "task");
frStandAdd("veyari", "defend");
sbSay("<b>The barge to Veyar: done.</b> The Spice Wind settles toward Veyar with every cake whole. Ollo-Tullik: \"You fly like a Tullik! Matron will hear of this.\"");
setTimeout(function () { if (E.g && E.g.parent)
E.g.parent.remove(E.g); SB.esc = null; }, 8000);
}
},
function () {
var S = frStandGet();
if (S._log && S._log._hrovan_duel) {
sbSay("Kaldra laughs. \"You beat me once. Once is enough for the sagas.\"");
return;
}
SB.duel = { name: "Kaldra's longship, the Unbowed", ready: true, done: false };
sbSay("<b>The champion's challenge.</b> Take off: Kaldra's longship will meet you above Skeldmar. No allies, no Corp, ship to ship. Knock her out and the Hrovan will fly beside you.");
},
function (dt) {
var D = SB.duel;
if (!D || D.done || !frIn() || FR.sys !== "reach")
return;
var sk = frWorld("skeldmar");
if (D.ready && !SB.battle && SP.pos.distanceTo(sk) < FR_BY.skeldmar.r * 6) {
D.ready = false;
SB.battle = { t: 0, c: SP.pos.clone(), down: 0, n: 1, allyAt: 1e9, allies: 1, why: "duel", start: Date.now(), paid: true };
var at = SP.pos.clone().addScaledVector(sbFwd(yaw, 0), 500).add(new THREE.Vector3(0, 40, 0));
var F = sbSpawn("gunship", at, "foe", D.name);
var G = sbG();
if (F.g.parent)
F.g.parent.remove(F.g);
F.g = frAllyShip("longship");
F.g.scale.multiplyScalar(1.4);
F.g.position.copy(F.p);
G.add(F.g);
F.turrets = [];
F.hp = F.max = 420;
F.T = Object.assign({}, SB_FOE.gunship, { name: D.name, len: 24, spd: 140, turn: 1.5, cool: 0.45, dmg: 8, worth: 0 });
F.duel = 1;
D.F = F;
SB.target = F;
sbSay("<b>Kaldra:</b> \"There you are, small one. Shields up. Fight well!\" Her longship swings in, banner flying.");
}
if (D.F && D.F.down && !D.done) {
D.done = true;
SB.battle = null;
frStandAdd("hrovan", "duel");
frStandAdd("hrovan", "task");
sbSay("<b>Kaldra:</b> \"Ha! Knocked out fair and square. Skeldmar will sing of you. When you fight in the Reach, the Hrovan fly beside you.\"");
D.F.down = 7;
}
},
function (g, d, c1, c2) {
var R = wRand(77), wing = new THREE.PlaneGeometry(1, 1), m1 = new THREE.MeshBasicMaterial({ color: c1, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }), m2 = m1.clone();
m2.color.setHex(c2);
var n = sbLite() ? 60 : 180, inst = new THREE.InstancedMesh(wing, m1, n), inst2 = new THREE.InstancedMesh(wing, m2, n), M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3();
for (var i = 0; i < n; i++) {
p.set((R() - 0.5) * d.r * 1.6, (R() - 0.5) * d.r * 0.5, (R() - 0.5) * d.r * 1.6);
e.set(R() * 0.6, R() * 6, R() * 0.6);
q.setFromEuler(e);
var k = 10 + R() * 40;
s.set(k, k * 0.4, 1);
M.compose(p, q, s);
inst.setMatrixAt(i, M);
p.x += k * 0.3;
M.compose(p, q, s);
inst2.setMatrixAt(i, M);
}
g.add(inst);
g.add(inst2);
g.add(wGlow(c1, d.r * 1.2, 0.12));
g.userData.spin = 0.02;
},
function (g) {
var skin = gxMat(0x3A4A6A, { shine: 20 }), belly = gxMat(0x9AA8C8, { shine: 20 }), glow = gxMat(0x8AE8FF, { glow: 1 });
for (var w = 0; w < (sbLite() ? 2 : 4); w++) {
var W = new THREE.Group(), L = 160 + w * 40;
var b = mmLathe(W, skin, [[0, -L * 0.5], [L * 0.09, -L * 0.4], [L * 0.13, -L * 0.1], [L * 0.12, L * 0.2], [L * 0.06, L * 0.42], [L * 0.02, L * 0.5]], 0, 0, 0, 18);
b.rotation.x = Math.PI / 2;
mmEll(W, belly, L * 0.1, L * 0.05, L * 0.3, 0, -L * 0.07, -L * 0.05, 14);
[-1, 1].forEach(function (s) { var f = mmFlat(W, skin, [[0, 0], [L * 0.3, L * 0.08], [L * 0.34, L * 0.18], [0, L * 0.12]], L * 0.01, s * L * 0.1, -L * 0.03, -L * 0.1, 0, 0, s * 0.3); if (s < 0)
f.scale.x = -1; });
mmFlat(W, skin, [[-L * 0.16, 0], [L * 0.16, 0], [0, L * 0.12]], L * 0.01, 0, 0, L * 0.48, Math.PI / 2, 0, 0);
for (var i = 0; i < 10; i++)
mmEll(W, glow, L * 0.008, L * 0.008, L * 0.008, (i % 2 ? 1 : -1) * L * 0.1, L * 0.03, -L * 0.3 + i * L * 0.05, 6);
W.position.set((w - 1.5) * 500, (w % 2) * 200, w * 260);
W.rotation.y = 0.4;
g.add(W);
}
g.add(wGlow(0x8AE8FF, 1200, 0.08));
g.userData.spin = 0.006;
},
function (g) {
var m = gxMat(0x5A5450, { shine: 30, tex: "worn" }), y = gxMat(0xC8A030, { shine: 30 }), d = gxMat(0x2A2828, { shine: 40, tex: "plate" });
mmSlab(g, m, 40, 16, 60, 0, 0, 0);
mmCyl(g, d, 6, 6, 50, 0, -28, 10);
mmCone(g, y, 6, 14, 0, -58, 10, Math.PI, 0, 0);
for (var i = 0; i < 4; i++)
mmSlab(g, y, 42, 2, 2, 0, 8.5, -24 + i * 16);
mmCyl(g, d, 4, 4, 20, 14, 14, -20);
mmCyl(g, d, 4, 4, 20, -14, 14, -20);
g.rotation.set(0.5, 0.3, 0.8);
g.userData.spin = 0.008;
},
function (g) {
var st = gxMat(0xE8ECF0, { shine: 30, tex: "worn" }), dk = gxMat(0x3A2A2A, { shine: 10 }), bl = gxMat(0x8AC8FF, { glow: 1 });
mmCyl(g, st, 30, 34, 18, 0, 0, 0, 0, 0, 0, 12);
mmLathe(g, st, [[0, 0], [30, 0], [24, 10], [10, 18], [0, 20]], 0, 9, 0, 16);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
mmSlab(g, i % 3 === 0 ? dk : st, 6, 26, 4, Math.cos(a) * 38, 0, Math.sin(a) * 38).rotation.y = -a;
}
mmGlow(g, 0xFF5A2A, 40, 0.25, 10, 0, 20);
mmEll(g, dk, 12, 9, 2, 12, 2, 32, 10);
mmGlow(g, 0x8AC8FF, 26, 0.35, 0, 32, 0);
mmEll(g, bl, 2, 2, 2, 0, 30, 0, 10);
g.rotation.set(0.2, 0, 0.3);
g.userData.spin = 0.004;
},
function (g, d, cols) {
var R = wRand(d.k.length * 31);
for (var i = 0; i < (sbLite() ? 10 : 24); i++) {
var s = wGlow(cols[i % cols.length], d.r * (0.4 + R() * 0.9), 0.14 + R() * 0.12);
s.position.set((R() - 0.5) * d.r * 1.5, (R() - 0.5) * d.r * 0.6, (R() - 0.5) * d.r * 1.3);
g.add(s);
}
for (var j = 0; j < 5; j++) {
var st = wGlow(0xFFFFFF, 70, 0.9);
st.position.set((R() - 0.5) * d.r * 0.8, (R() - 0.5) * d.r * 0.3, (R() - 0.5) * d.r * 0.8);
g.add(st);
}
},
function (h) {
var m = gxMat(0xB8BCC4, { shine: 60, tex: "plate" }), gold = gxMat(0xD8B060, { shine: 70, tex: "brass" }), lit = gxMat(0xFFE8B0, { glow: 1 });
var R = 240;
mmTorus(h, m, R, 10, 0, 0, 0, Math.PI / 2, 0, 0);
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2, x = Math.cos(a) * R, z = Math.sin(a) * R, dock = mmG(h, x, 0, z, 0, -a, 0);
mmSlab(dock, i % 2 ? m : gold, 26, 18, 30, 0, 0, 0);
mmSlab(dock, lit, 26.4, 1, 0.6, 0, 6, 15.2);
mmSlab(dock, lit, 26.4, 1, 0.6, 0, -6, 15.2);
if (i % 3 === 0) {
var s = sbBuildCutter(0xE8E8F0, 0x3A6AB8);
sbFit(s, 24);
s.position.set(0, 16, 0);
s.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
dock.add(s);
}
}
for (var k = 0; k < 4; k++) {
var a2 = k / 4 * Math.PI * 2;
mmRod(h, m, [0, 0, 0], [Math.cos(a2) * R, 0, Math.sin(a2) * R], 2.4);
}
mmEll(h, gold, 30, 30, 30, 0, 0, 0, 20);
h.userData.spinY = 0.02;
},
function (g) {
var w = gxMat(0xE8DCC0, { shine: 40, tex: "worn" }), gold = gxMat(0xD8B060, { shine: 70, tex: "brass" }), lit = gxMat(0xFFE8B0, { glow: 1 });
for (var i = 0; i < 5; i++) {
mmCyl(g, i % 2 ? gold : w, 30 - i * 4, 30 - i * 4, 8, 0, i * 9, 0, 0, 0, 0, 24);
mmTorus(g, lit, 30 - i * 4, 0.5, 0, i * 9 + 4, 0, Math.PI / 2, 0, 0);
}
mmLathe(g, gold, [[0, 0], [12, 0], [6, 8], [0, 14]], 0, 44, 0, 16);
g.add(wGlow(0xFFE0A0, 120, 0.3));
g.userData.spin = 0.03;
},
function (g, col, dark) {
var m = gxMat(dark ? 0x1A1618 : 0xE8E0C8, { shine: dark ? 20 : 50, tex: dark ? "plate" : "worn" });
mmCone(g, m, 14, 90, 0, 0, 0, 0, 0, 0, 6);
mmCone(g, m, 14, 40, 0, -60, 0, Math.PI, 0, 0, 6);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
mmRod(g, m, [0, -20, 0], [Math.cos(a) * 40, -30, Math.sin(a) * 40], 1.2);
mmEll(g, gxMat(col, { glow: 1 }), 3, 3, 3, Math.cos(a) * 40, -30, Math.sin(a) * 40, 8);
}
mmGlow(g, col, 60, 0.4, 0, 46, 0);
g.userData.spin = 0.02;
},
function (g, col, broken) {
var m = gxMat(0xD8DCE4, { shine: 70, tex: "plate" }), d = gxMat(0x2A2E36, { shine: 40 }), gl = gxMat(col, { glow: 1 });
var hull = mmFlat(g, m, [[0, -22], [3, -10], [3.6, 10], [2.2, 18], [-2.2, 18], [-3.6, 10], [-3, -10]], 2.2, 0, 0, 0, Math.PI / 2, 0, 0);
mmEll(g, gxMat(0x2A4A6A, { shine: 90, op: 0.85 }), 1.6, 1.2, 4, 0, 1.6, -2, 12);
[-1, 1].forEach(function (s) { var w = mmFlat(g, m, [[0, 0], [9, 6], [10, 12], [0, 8]], 0.5, s * 3.4, 0, 4, Math.PI / 2, 0, 0); if (s < 0)
w.scale.x = -1; mmSlab(g, gl, 0.3, 0.2, 8, s * 8, 0.3, 10); });
mmTorus(g, d, 3, 0.8, 0, 0, 18.4, 0, 0, 0);
mmTorus(g, gl, 2.4, 0.35, 0, 0, 18.8, 0, 0, 0);
if (broken) {
g.rotation.set(0.8, 0.5, 2.2);
g.userData.spin = 0.01;
mmGlow(g, 0xFF8A4A, 8, 0.3, 3, 0, 6);
}
return g;
},
function (h) {
var R = wRand(4242), cab = gxMat(0x3A3634, { shine: 30 });
for (var i = 0; i < (sbLite() ? 18 : 46); i++) {
var s = i % 4 === 0 ? sbBuildCutter([0xC8B8A0, 0x8A9AA8, 0xA88A6A][i % 3], [0x8A3A22, 0x3A6AB8, 0xC8A030][i % 3]) : i % 4 === 1 ? spAlienShip([0x7AD87A, 0xB890F0, 0xE8A86A][i % 3], "tullik") : i % 4 === 2 ? sbFoeModel("gunship") : sbFoeModel("marauder");
var a = R() * Math.PI * 2, d = R() * 110, y = (R() - 0.5) * 40;
s.position.set(Math.cos(a) * d, y, Math.sin(a) * d);
s.rotation.set((R() - 0.5) * 0.4, R() * 6, (R() - 0.5) * 0.4);
s.scale.multiplyScalar(i % 4 === 3 ? 1.4 : 2.6 + R() * 2);
s.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
h.add(s);
if (i > 0 && i % 2 === 0)
mmRod(h, cab, [s.position.x, s.position.y, s.position.z], [0, 0, 0], 0.6);
}
for (var j = 0; j < (sbLite() ? 8 : 24); j++) {
var a2 = R() * Math.PI * 2, d2 = R() * 120;
mmGlow(h, [0xFFB060, 0xFFE0A0, 0x8AE8FF][j % 3], 18, 0.5, Math.cos(a2) * d2, (R() - 0.5) * 40, Math.sin(a2) * d2);
}
h.userData.spinY = 0.01;
},
function (k) {
if (!GX_SYS[k])
return false;
var K = gxKnown();
if (K[k])
return false;
K[k] = 1;
try {
localStorage.setItem("gx.known", JSON.stringify(K));
}
catch (e) { }
if (typeof frLog === "function")
frLog("star_" + k);
setTimeout(function () { sbSay("✦ <b>A new star on your map:</b> " + sbEsc(GX_SYS[k].name) + ". Open the Star Drive (J) to jump there."); }, 2600);
return true;
},
function (k) {
if (!GX_SYS[k] || k === FR.sys && FR.g)
return;
var G = sbG();
if (FR.g) {
FR.g.traverse(function (o) { if (o.geometry && o.geometry.dispose && !(o.geometry.userData && o.geometry.userData.shared))
o.geometry.dispose(); });
if (FR.g.parent)
FR.g.parent.remove(FR.g);
FR_BODIES.forEach(function (b) { var t = SP.tex && SP.tex["fr_" + (b.paint || b.k)]; if (t) {
t.dispose();
delete SP.tex["fr_" + (b.paint || b.k)];
} });
}
FR.g = null;
FR.built = false;
FR.near = null;
FR.sys = k;
var S = GX_SYS[k];
FR_BODIES.length = 0;
S.bodies.forEach(function (b) { FR_BODIES.push(b); });
FR_DISC.length = 0;
S.disc.forEach(function (d) { FR_DISC.push(d); });
Object.keys(FR_BY).forEach(function (x) { delete FR_BY[x]; });
FR_BODIES.forEach(function (b) { FR_BY[b.k] = b; });
if (G)
frBuild(G);
if (FR.light)
FR.light.color.setHex(S.light || 0xFFFFFF);
},
function (to) {
if (GX.jumping)
return;
if (!sbHere()) {
sbSay("Take off first: the Star Drive works in open space.");
return;
}
if (SB.battle) {
sbSay("The drive will not line up with raiders firing on you. Break off, or win first.");
return;
}
if (to === FR.sys && frIn()) {
sbSay("You are at " + sbEsc(gxName()) + " already.");
return;
}
worldCard(null);
GX.jumping = true;
GX.riding = true;
SP.auto = null;
var name = to === "sol" ? "home, the Sun" : GX_SYS[to].name, ly = to === "sol" ? 0 : GX_SYS[to].ly;
var SPOOL = 2.4, RIDE = gxRide(to), OUT = 1.4, END = SPOOL + RIDE + OUT;
var tint = new THREE.Color(to === "sol" ? 0xFFF0C0 : (GX_SYS[to].light || 0xC8D8FF)), tr = Math.round(tint.r * 255), tg = Math.round(tint.g * 255), tb = Math.round(tint.b * 255);
sbSay("<b>Star Drive.</b> Coordinates set for " + sbEsc(name) + ". Spinning up... about " + Math.round(RIDE) + " seconds at light speed.");
sbTone(220, 0.5);
setTimeout(function () { sbTone(330, 0.4); }, 600);
setTimeout(function () { sbTone(440, 0.7); }, 1200);
setTimeout(function () { sbTone(110, 1.2); }, SPOOL * 1000);
GX.viewWas = SB.view;
SB.view = "seat";
var T = gxTunnel(tint), c = gxCanvas(), x = c.getContext("2d"), t0 = performance.now();
c.width = innerWidth;
c.height = innerHeight;
c.style.opacity = "1";
var swapped = false, last = t0, flow = 0;
function frame(now) {
var t = GX.dbgT != null ? GX.dbgT : (now - t0) / 1000, dt = Math.min(0.05, (now - last) / 1000), W = c.width, H = c.height, cx = W / 2;
last = now;
var rideK = t < SPOOL ? Math.pow(t / SPOOL, 2) : t < SPOOL + RIDE ? 1 : Math.max(0, 1 - (t - SPOOL - RIDE) / OUT);
var sp = t < SPOOL ? 0.05 + Math.pow(t / SPOOL, 3) * 2.2 : t < SPOOL + RIDE ? 2.2 + 0.25 * Math.sin(t * 0.5) : 2.2 * rideK;
flow += sp * dt;
gxTunnelTick(T, rideK, flow, t);
var inLight = t > SPOOL - 0.15 && t < SPOOL + RIDE + 0.1, Wg = WORLDS[WLD.on] && WORLDS[WLD.on].g;
if (Wg && Wg.visible === inLight) {
Wg.visible = !inLight;
GX.hidW = inLight ? Wg : null;
}
x.clearRect(0, 0, W, H);
var sw = Math.max(0, 1 - Math.abs(t - SPOOL) / 0.45) * 0.5 + Math.max(0, 1 - Math.abs(t - SPOOL - RIDE) / 0.45) * 0.4;
if (sw > 0) {
x.fillStyle = "rgba(255,255,255," + sw.toFixed(3) + ")";
x.fillRect(0, 0, W, H);
}
if (t > SPOOL * 0.5 && t < SPOOL + RIDE) {
var left = Math.max(0, Math.ceil(SPOOL + RIDE - t));
x.font = "600 16px Georgia, serif";
x.textAlign = "center";
x.fillStyle = "rgba(240,246,255,.92)";
x.shadowColor = "rgba(0,0,0,.7)";
x.shadowBlur = 6;
x.fillText("LIGHT SPEED · " + name.toUpperCase() + (ly ? " · " + ly + " LIGHT-YEARS" : ""), cx, H - 96);
x.font = "14px system-ui, sans-serif";
x.fillStyle = "rgba(220,232,255,.85)";
x.fillText(t < SPOOL ? "spinning up..." : "dropping out in " + left + " s", cx, H - 74);
x.shadowBlur = 0;
}
if (!swapped && t > SPOOL + RIDE * 0.5) {
swapped = true;
try {
gxArrive(to, true);
}
catch (e) {
console.warn("star drive", e);
}
}
if (t < END)
GX.raf = requestAnimationFrame(frame);
else {
c.style.opacity = "0";
x.clearRect(0, 0, W, H);
gxTunnelEnd(T);
if (GX.hidW) {
GX.hidW.visible = true;
GX.hidW = null;
}
(WORLDS[WLD.on] && WORLDS[WLD.on].g || {}).visible = true;
GX.jumping = false;
GX.riding = false;
if (GX.viewWas) {
SB.view = GX.viewWas;
GX.viewWas = null;
}
if (to !== "sol")
gxArrived(to);
}
}
GX.raf = requestAnimationFrame(frame);
},
function () {
if (GX.stTex)
return GX.stTex;
var c = document.createElement("canvas");
c.width = 256;
c.height = 512;
var x = c.getContext("2d"), R = wRand(77);
x.fillStyle = "#000";
x.fillRect(0, 0, 256, 512);
for (var i = 0; i < 220; i++) {
var px = R() * 256, py = R() * 512, L = 20 + R() * 160, w = 0.6 + R() * 2.2, a = 0.25 + R() * 0.75;
var g = x.createLinearGradient(0, py, 0, py + L);
g.addColorStop(0, "rgba(255,255,255,0)");
g.addColorStop(0.7, "rgba(255,255,255," + a + ")");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(px, py, w, L);
if (py + L > 512)
x.fillRect(px, py - 512, w, L);
}
var T = new THREE.CanvasTexture(c);
T.wrapS = T.wrapT = THREE.RepeatWrapping;
T.repeat.set(3, 2);
GX.stTex = T;
return T;
},
function (tint) {
var G = new THREE.Group(), lite = sbLite(), seg = lite ? 16 : 28, tex = gxStreakTex();
function tube(r, col, op, rep, blend) {
var m = new THREE.MeshBasicMaterial({ color: col, side: THREE.BackSide, transparent: true, opacity: 0, depthWrite: false, fog: false, blending: blend || THREE.AdditiveBlending });
if (rep) {
m.map = tex.clone();
m.map.needsUpdate = true;
m.map.repeat.set(rep[0], rep[1]);
}
var me = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.35, 1800, seg, 1, true), m);
me.rotation.x = -Math.PI / 2;
me.position.z = -500;
me.frustumCulled = false;
me.userData.op = op;
G.add(me);
return me;
}
var deep = tint.clone().multiplyScalar(0.18).add(new THREE.Color(0x02040C));
G.userData.base = tube(60, deep, 1, null, THREE.NormalBlending);
G.userData.tubes = [tube(46, tint.clone().lerp(new THREE.Color(0xFFFFFF), 0.15), 0.9, [4, 3]), tube(30, new THREE.Color(0xE8F0FF), 0.65, [3, 2])];
if (!lite)
G.userData.tubes.push(tube(18, tint, 0.5, [2, 2]));
var cv = document.createElement("canvas");
cv.width = cv.height = 128;
var x = cv.getContext("2d"), gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
gr.addColorStop(0, "rgba(255,255,255,1)");
gr.addColorStop(0.25, "rgba(255,255,255,.6)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 128, 128);
var sm = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), color: tint, transparent: true, opacity: 0, depthWrite: false, fog: false, blending: THREE.AdditiveBlending });
var mouth = new THREE.Sprite(sm);
mouth.position.z = -900;
mouth.scale.set(420, 420, 1);
G.add(mouth);
G.userData.mouth = mouth;
var L = new THREE.PointLight(tint.getHex(), 0, 30);
L.position.set(0, 1, -4);
G.add(L);
G.userData.light = L;
G.renderOrder = -1;
scene.add(G);
return G;
},
function (G, k, flow, t) {
if (!G || !camera)
return;
G.position.copy(camera.position);
G.quaternion.copy(camera.quaternion);
var U = G.userData;
U.base.material.opacity = Math.min(1, k * 1.2);
U.tubes.forEach(function (m, i) { m.material.opacity = m.userData.op * k; if (m.material.map)
m.material.map.offset.y = flow * (0.55 + i * 0.35); m.rotation.y = t * (i % 2 ? -0.05 : 0.07); });
U.mouth.material.opacity = 0.85 * k;
var s = 380 + Math.sin(t * 0.8) * 30;
U.mouth.scale.set(s, s, 1);
U.light.intensity = sbLite() ? 0 : 1.6 * k;
},
function (to) {
if (to === "sol") {
GX.riding = false;
worldGo("space", { station: "aurora", msg: "<b>Home.</b> The Sun, the blue Earth, and Station Aurora ahead." });
return;
}
gxSwap(to);
var S = GX_SYS[to], first = S.bodies[0], at = FR.c.clone().add(new THREE.Vector3(0, first.star ? 700 : 300, first.star ? 14000 : 2400));
SP.pos.copy(at);
SP.vel.set(0, 0, 0);
SP.auto = null;
var d = FR.c.clone().sub(SP.pos).normalize();
yaw = Math.atan2(-d.x, -d.z);
pitch = Math.asin(Math.max(-1, Math.min(1, d.y)));
frLog("star_" + to);
},
function () {
var K = gxKnown(), fns = {}, here = frIn() ? FR.sys : "sol";
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>✦ The Star Drive</div><div style='opacity:.8'>The stars are very far apart: light-speed is the only way between them. Pick one you know and the ship jumps.</div>";
h += worldBtn("j-sol", (here === "sol" ? "● " : "") + "Home: the Sun", "Earth, the stations and the Solar System" + (here === "sol" ? " · you are here" : ""));
fns["j-sol"] = function () { if (here === "sol") {
sbSay("You are home already.");
return;
} gxJump("sol"); };
GX_ORDER.forEach(function (k) {
var S = GX_SYS[k];
if (!K[k]) {
h += "<div style='opacity:.55;font-size:13px;margin:5px 2px'>✧ Uncharted star, about " + S.ly + " light-years out: you need its coordinates.</div>";
return;
}
h += worldBtn("j-" + k, (here === k ? "● " : "") + sbEsc(S.name), sbEsc(S.star) + " · " + (S.ly ? S.ly + " light-years past the Far Gate" : "through the Far Gate") + (S.safe ? " · protected" : S.danger ? " · danger" : "") + (here === k ? " · you are here" : ""));
fns["j-" + k] = function () { if (k === "reach" && !(typeof spKnowsGate === "function" ? spKnowsGate() : frLogged("reach")) && here === "sol") {
sbSay("Find the Far Gate past Pluto first: that is how every Star Drive learns the way out.");
return;
} gxJump(k); };
});
worldCard(h, fns);
},
function (b) {
frLog(b.k);
var h = worldFacts(b.name, b.kind, b.rows, b.notes.concat(["Every ship you own is kept and mended here for nothing: hull and shields are full again."]), worldBtn("ships", "🚀 Your ships and guns", "Change ship, mount a star weapon"));
try {
var D = SB_SHIPS[SB.k] || SB_SHIPS.corp;
SB.hull = D.hull;
SB.shield = D.shield;
}
catch (e) { }
worldCard(h, { ships: function () { sbShipsCard(); } });
},
function (B) {
if (FR.sys === "reach")
return false;
B.allies = 1;
var come = [];
["kharn", "wardens", "veyari", "hrovan"].forEach(function (p) { var lv = frLevel(p); if (lv === "Ally" || lv === "Honoured")
come.push(p); });
come.slice(0, 3).forEach(function (p, i) {
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((i - 1) * 150, 50, 180)), "ally", { kharn: "A Kharn hammership", wardens: "A Warden blade-ship", veyari: "A Veyari skiff", hrovan: "A Hrovan longship" }[p]);
if (A) {
var G = sbG();
if (A.g.parent)
A.g.parent.remove(A.g);
A.g = p === "wardens" ? sbFit(gxBladeShip(new THREE.Group(), 0x8AC8FF), 15) : frAllyShip(p === "veyari" ? "skiff" : "longship");
A.g.position.copy(A.p);
G.add(A.g);
A.turrets = [];
}
});
if (come.length)
sbSay("<b>Your allies drop out of light speed beside you.</b> \"We heard you call. We fly with you.\"");
return true;
},
function () {
var L = frLogGet(), K = gxKnown(), fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📖 Your Star Log</div>";
var tot = 0, got = 0;
GX_ORDER.forEach(function (k) {
var S = GX_SYS[k];
if (!K[k])
return;
var all = S.bodies.map(function (b) { return { k: b.k, name: b.name, kind: b.kind, b: b }; }).concat(S.disc.map(function (d) { return { k: d.k, name: d.name, kind: d.kind, d: d }; }));
var found = all.filter(function (x) { return L[x.k]; });
tot += all.length;
got += found.length;
h += "<div style='margin-top:9px;font-weight:600;color:#BFD8FF'>" + sbEsc(S.name) + " <span style='opacity:.7;font-weight:400'>· " + found.length + " of " + all.length + "</span></div>";
found.forEach(function (x) { h += worldBtn("l-" + x.k, "✦ " + sbEsc(x.name), sbEsc(x.kind)); fns["l-" + x.k] = function () { var o = x.b || x.d; worldCard(worldFacts(o.name, o.kind, o.rows || [], o.notes || []), {}); }; });
});
h = "<div>" + h + "<div style='opacity:.8;margin-top:6px'>" + got + " of " + tot + " things found at the stars you know. " + (GX_ORDER.length - Object.keys(K).filter(function (k) { return GX_SYS[k]; }).length) + " stars still uncharted.</div></div>";
if (typeof frStandHtml === "function")
h += frStandHtml();
worldCard(h, fns);
},
function (G, C, R, sol, hy) {
var bark = mmMat(0x4A3420, { shine: 8, tex: "worn", rep: 3 }), bark2 = mmMat(0x5A4028, { shine: 8, tex: "worn" }), leaf = [mmMat(0x2A6A2A, { shine: 10 }), mmMat(0x3A7A30, { shine: 10 }), mmMat(0x4A8A3A, { shine: 10 })], wood = mmMat(0x8A6A3A, { tex: "worn" }), rope = mmMat(0xC8B080, {});
var trees = [];
for (var i = 0; i < (sbLite() ? 10 : 22); i++) {
var a = i / 22 * Math.PI * 2 + R() * 0.2, d = i < 8 ? 48 + R() * 20 : 110 + R() * 260, x = C[0] + Math.cos(a) * d, z = C[1] + Math.sin(a) * d, r = i < 8 ? 5 + R() * 2 : 6 + R() * 5, h = 260 + R() * 220, y = hy(x, z);
var t = mmG(G, x, y, z);
mmCyl(t, i % 2 ? bark : bark2, r * 0.55, r, h, 0, h / 2, 0, 0, 0, 0, 12);
for (var rt = 0; rt < 5; rt++) {
var ra = rt / 5 * Math.PI * 2;
mmHorn(t, bark, [[0, 6, 0], [Math.cos(ra) * r * 1.3, 1.5, Math.sin(ra) * r * 1.3], [Math.cos(ra) * r * 2.4, -0.5, Math.sin(ra) * r * 2.4]], r * 0.3, 0, 0, 0);
}
for (var c = 0; c < 4; c++)
mmEll(t, leaf[(i + c) % 3], r * 5, r * 2.2, r * 5, (R() - 0.5) * r * 3, h * (0.62 + c * 0.1), (R() - 0.5) * r * 3, 12);
sol.push({ x: x, z: z, r: r * 1.1 });
trees.push({ x: x, z: z, r: r, y: y });
if (i < 8) {
var py = 14 + (i % 3) * 6;
mmCyl(t, wood, r + 5, r + 5, 0.6, 0, py, 0, 0, 0, 0, 18);
mmTorus(t, rope, r + 5, 0.12, 0, py + 1.1, 0, Math.PI / 2, 0, 0);
var hs = mmG(t, r + 2.2, py + 0.3, 0);
mmCyl(hs, bark2, 2, 2.2, 3, 0, 1.5, 0, 0, 0, 0, 10);
mmCone(hs, leaf[i % 3], 2.8, 2.6, 0, 4.2, 0, 0, 0, 0, 10);
mmGlow(t, 0xC8FFB0, 3, 0.45, -(r + 3), py + 2.4, 0);
mmEll(t, mmMat(0xC8FFB0, { glow: 1 }), 0.35, 0.45, 0.35, -(r + 3), py + 2.4, 0, 10);
for (var s = 0; s < Math.floor(py / 0.8); s++) {
var sa = s * 0.42;
mmSlab(t, wood, 2.2, 0.15, 0.9, Math.cos(sa) * (r + 1.1), s * 0.8, Math.sin(sa) * (r + 1.1)).rotation.y = -sa;
}
}
}
for (var b = 0; b < 8; b++) {
var A = trees[b], B = trees[(b + 1) % 8], ya = hy(A.x, A.z) + 14 + (b % 3) * 6, yb = hy(B.x, B.z) + 14 + ((b + 1) % 3) * 6;
mmRod(G, rope, [A.x, ya + 0.6, A.z], [B.x, yb + 0.6, B.z], 0.18);
mmRod(G, rope, [A.x, ya + 1.6, A.z], [B.x, yb + 1.6, B.z], 0.06);
}
for (var st = 0; st < 12; st++) {
var sa2 = st / 12 * Math.PI * 2, sx = C[0] + Math.cos(sa2) * 14, sz = C[1] - 20 + Math.sin(sa2) * 14;
mmSlab(G, mmMat(0x6A7A6A, { tex: "worn" }), 1.4, 3.6, 0.8, sx, hy(sx, sz) + 1.8, sz).rotation.y = -sa2;
sol.push({ x: sx, z: sz, r: 0.9 });
}
for (var m = 0; m < (sbLite() ? 10 : 30); m++) {
mmGlow(G, [0xC8FFB0, 0xA8E8FF, 0xFFE8A0][m % 3], 1.2, 0.6, C[0] + (R() - 0.5) * 80, 4 + R() * 12, C[1] + (R() - 0.5) * 80);
}
for (var f = 0; f < (sbLite() ? 20 : 60); f++) {
var fx = (R() - 0.5) * 400, fz = (R() - 0.5) * 400;
if (Math.hypot(fx, fz) < 30)
continue;
var fg = mmG(G, fx, hy(fx, fz), fz, 0, R() * 6, 0);
for (var l = 0; l < 5; l++)
mmFlat(fg, leaf[l % 3], [[0, 0], [0.5, 1.4], [0, 2.6], [-0.5, 1.4]], 0.02, 0, 0, 0, -0.6, l * 1.25, 0);
}
},
function (G, C, R, sol, hy) {
var clay = mmMat(0xE0C8A0, { shine: 8, tex: "worn" }), clay2 = mmMat(0xC8A878, { shine: 8, tex: "worn" }), cloth = [mmMat(0xC84A2A, { ds: true }), mmMat(0x2A6A8A, { ds: true }), mmMat(0xE8C060, { ds: true })], metal = mmMat(0x9AA0A8, { shine: 60, tex: "plate" }), water = mmMat(0x5AB8E8, { shine: 90, op: 0.8 });
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2, d = 36 + (i % 2) * 22, x = C[0] + Math.cos(a) * d, z = C[1] + Math.sin(a) * d, y = hy(x, z), s = 4 + R() * 3;
var h = mmG(G, x, y, z, 0, -a, 0);
mmMesh(new THREE.SphereGeometry(s, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), i % 3 ? clay : clay2, 0, 0, 0, h);
mmSlab(h, mmMat(0x3A2A1A, {}), 1.6, 2.4, 0.4, 0, 1.2, s * 0.98);
mmCyl(h, clay2, 0.6, 0.7, 1.4, s * 0.4, s * 0.9, 0, 0, 0, 0, 8);
mmFlat(h, cloth[i % 3], [[0, 0], [3, 0], [3, 1.6], [0, 1.6]], 0.03, -1.5, 2.6, s + 0.6, -1.2, 0, 0);
sol.push({ x: x, z: z, r: s });
}
for (var v = 0; v < 8; v++) {
var va = v / 8 * Math.PI * 2 + 0.2, vx = C[0] + Math.cos(va) * 80, vz = C[1] + Math.sin(va) * 80, vy = hy(vx, vz), vg = mmG(G, vx, vy, vz);
mmCyl(vg, metal, 0.3, 0.45, 14, 0, 7, 0);
var hub = mmG(vg, 0, 14, 0);
for (var b = 0; b < 3; b++)
mmFlat(hub, mmMat(0xE8E4D8, { ds: true }), [[0, 0], [1.2, 0], [0.6, 6]], 0.04, 0, 0, 0, 0, 0, b * 2.09);
(SF.gxSpin = SF.gxSpin || []).push(hub);
mmCyl(vg, metal, 1.2, 1.2, 2, 0, 1, 0);
sol.push({ x: vx, z: vz, r: 1.4 });
}
var cs = mmG(G, C[0], hy(C[0], C[1]), C[1]);
mmCyl(cs, clay2, 8, 8.6, 1.6, 0, 0.8, 0, 0, 0, 0, 24);
var wt = mmCyl(cs, water, 7.6, 7.6, 0.1, 0, 1.5, 0, 0, 0, 0, 24);
for (var aw = 0; aw < 6; aw++) {
var aa = aw / 6 * Math.PI * 2;
mmCyl(cs, metal, 0.12, 0.12, 4.5, Math.cos(aa) * 12, 2.25, Math.sin(aa) * 12);
mmFlat(cs, cloth[aw % 3], [[0, 0], [6, 0], [6, 4], [0, 4]], 0.03, Math.cos(aa) * 9, 4.4, Math.sin(aa) * 9, -Math.PI / 2, 0, -aa);
}
sol.push({ x: C[0], z: C[1], r: 8.8 });
var rx = C[0] + 70, rz = C[1] - 40, rg = mmG(G, rx, hy(rx, rz), rz);
for (var t = 0; t < 3; t++)
mmTorus(rg, clay2, 16 + t * 2.4, 1.1, 0, 0.5 + t * 1.1, 0, Math.PI / 2, 0, 0);
for (var p = 0; p < 10; p++) {
var pa = p / 10 * Math.PI * 2;
mmCyl(rg, clay, 0.5, 0.6, 5, Math.cos(pa) * 22, 2.5, Math.sin(pa) * 22, 0, 0, 0, 8);
mmFlat(rg, cloth[p % 3], [[0, 0], [1.2, 0], [1.2, 2.4], [0, 2.4]], 0.03, Math.cos(pa) * 22, 3.4, Math.sin(pa) * 22, 0, -pa, 0);
}
for (var c = 0; c < 5; c++) {
var cx = C[0] - 60 + c * 7, cz = C[1] + 30, cg = mmG(G, cx, hy(cx, cz), cz, 0, 0.3, 0);
mmEll(cg, mmMat(0xB89A70, {}), 1.1, 1, 2.2, 0, 2.2, 0, 12);
mmEll(cg, mmMat(0xA88A60, {}), 0.5, 0.6, 0.8, 0, 3, 2.2, 10);
for (var lg = 0; lg < 4; lg++)
mmCyl(cg, mmMat(0x8A6A48, {}), 0.18, 0.14, 1.8, (lg % 2 ? 0.6 : -0.6), 0.9, (lg < 2 ? 1.2 : -1.2));
mmSlab(cg, cloth[c % 3], 2.4, 0.3, 2, 0, 3.2, 0);
sol.push({ x: cx, z: cz, r: 2 });
}
for (var k = 0; k < 12; k++) {
var kx = C[0] + (R() - 0.5) * 60, kz = C[1] + (R() - 0.5) * 60;
if (Math.hypot(kx - C[0], kz - C[1]) < 11)
continue;
mmSlab(G, mmMat(0x8A6A3A, { tex: "worn" }), 1, 1, 1, kx, hy(kx, kz) + 0.5, kz);
}
},
function (G, C, R, sol, hy) {
var sea = new THREE.Mesh(new THREE.CircleGeometry(3800, 64), new THREE.MeshStandardMaterial({ color: 0x2A7A9A, roughness: 0.12, metalness: 0.1, transparent: true, opacity: 0.86 }));
sea.rotation.x = -Math.PI / 2;
sea.position.y = 0.1;
G.add(sea);
SF.frSea = sea;
var pile = mmMat(0x4A3A2A, { tex: "worn" }), plank = mmMat(0x9A7A50, { tex: "worn" }), wall = [mmMat(0xE8D8C0, { tex: "worn" }), mmMat(0x8AB8C8, { tex: "worn" }), mmMat(0xD8A890, { tex: "worn" })], roof = mmMat(0x3A6A7A, { shine: 30 });
var dk = mmG(G, C[0], 0, C[1]);
mmSlab(dk, plank, 90, 0.1, 90, 0, 0.12, 0);
for (var pl = 0; pl < 30; pl++)
mmSlab(dk, mmMat(0x6A5034, {}), 0.08, 0.02, 90, -44 + pl * 3, 0.18, 0);
for (var p = 0; p < 16; p++) {
var pa = p / 16 * Math.PI * 2;
mmCyl(dk, pile, 0.3, 0.35, 3, Math.cos(pa) * 45, 0.5, Math.sin(pa) * 45);
}
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, x = C[0] + Math.cos(a) * 28, z = C[1] + Math.sin(a) * 28, h = mmG(G, x, 0.05, z, 0, -a + Math.PI / 2, 0);
mmSlab(h, wall[i % 3], 6, 4, 5, 0, 2, 0);
mmFlat(h, roof, [[-3.6, 0], [3.6, 0], [0, 2.6]], 5.4, 0, 4, -2.7, 0, 0, 0);
mmSlab(h, mmMat(0x2A3A4A, { shine: 60 }), 1.2, 2.2, 0.2, 0, 1.1, 2.55);
mmSlab(h, mmMat(0xFFE0A0, { glow: 1 }), 1, 1, 0.2, 1.8, 2.4, 2.55);
sol.push({ x: x, z: z, r: 3.6 });
}
SF.gxLamps = [];
for (var l = 0; l < 8; l++) {
var la = l / 8 * Math.PI * 2 + 0.4, lx = C[0] + Math.cos(la) * 20, lz = C[1] + Math.sin(la) * 20;
var lm = mmMat(0xFFE0A0, { glow: 1 });
mmCyl(G, mmMat(0x2A3A4A, { shine: 50 }), 0.12, 0.16, 4, lx, 2, lz);
var gl = mmEll(G, lm, 0.45, 0.6, 0.45, lx, 4.2, lz, 12);
SF.gxLamps.push(gl);
if (!sbLite())
mmGlow(G, 0xFFE0A0, 3, 0.4, lx, 4.2, lz);
sol.push({ x: lx, z: lz, r: 0.4 });
}
for (var o = 0; o < 16; o++) {
var oa = R() * Math.PI * 2, od = 60 + R() * 160, ox = Math.cos(oa) * od, oz = Math.sin(oa) * od + C[1], og = mmG(G, ox, 0, oz, 0, R() * 6, 0);
for (var q = 0; q < 4; q++)
mmCyl(og, pile, 0.25, 0.3, 5, (q % 2 ? 2.4 : -2.4), 1.5, (q < 2 ? 2 : -2));
mmSlab(og, wall[o % 3], 5.6, 3.6, 4.6, 0, 5.6, 0);
mmFlat(og, roof, [[-3.2, 0], [3.2, 0], [0, 2.2]], 5, 0, 7.4, -2.5, 0, 0, 0);
}
for (var bt = 0; bt < 6; bt++) {
var bx = C[0] + 38 + bt * 4, bz = C[1] + (bt % 2 ? 6 : -6), bg = mmG(G, bx, 0.5, bz, 0, 0.2, 0);
mmEll(bg, mmMat([0xC84A3A, 0x3A8AC8, 0xE8C060][bt % 3], {}), 0.9, 0.5, 3, 0, 0, 0, 12);
mmCyl(bg, pile, 0.06, 0.06, 3, 0, 1.6, 0);
}
},
function (G, C, R, sol, hy) {
var st = mmMat(0x2A2628, { shine: 15, tex: "worn", rep: 2 }), st2 = mmMat(0x3A3434, { shine: 15, tex: "worn" }), iron = mmMat(0x4A4A50, { shine: 60, tex: "plate" }), fire = mmMat(0xFF7A2A, { glow: 1 }), brass = mmMat(0xC89A50, { shine: 70, tex: "brass" });
var fg = mmG(G, C[0], hy(C[0], C[1] - 28), C[1] - 28);
mmSlab(fg, st, 40, 8, 24, 0, 4, 0);
mmSlab(fg, st2, 32, 6, 18, 0, 11, 0);
mmSlab(fg, st, 22, 5, 12, 0, 16.5, 0);
mmSlab(fg, fire, 10, 5, 0.4, 0, 2.6, 12.1);
mmGlow(fg, 0xFF7A2A, 14, 0.55, 0, 3, 13);
for (var ch = 0; ch < 3; ch++)
mmCyl(fg, iron, 1.4, 1.8, 10, -8 + ch * 8, 24, 0, 0, 0, 0, 8);
sol.push({ x: C[0], z: C[1] - 28, hw: 20.5, hd: 12.5 });
for (var a = 0; a < 6; a++) {
var ax = C[0] - 15 + a * 6, az = C[1] - 8, ag = mmG(G, ax, hy(ax, az), az);
mmSlab(ag, st2, 1.2, 0.8, 1.2, 0, 0.4, 0);
mmSlab(ag, iron, 1.6, 0.5, 0.7, 0, 1.05, 0);
mmCone(ag, iron, 0.3, 0.7, 0.95, 1.05, 0, 0, 0, -Math.PI / 2, 8);
sol.push({ x: ax, z: az, r: 0.9 });
}
for (var q = 0; q < 2; q++) {
var qx = C[0] + (q ? 18 : -18), qz = C[1] + 2;
mmCyl(G, st2, 3, 3.2, 0.8, qx, hy(qx, qz) + 0.4, qz, 0, 0, 0, 16);
mmCyl(G, mmMat(0x2A4A6A, { shine: 90, op: 0.85 }), 2.7, 2.7, 0.1, qx, hy(qx, qz) + 0.82, qz, 0, 0, 0, 16);
sol.push({ x: qx, z: qz, r: 3.2 });
}
for (var h = 0; h < 12; h++) {
var ha = h / 12 * Math.PI * 2, hx = C[0] + Math.cos(ha) * 62, hz = C[1] + Math.sin(ha) * 62 + 10, hg = mmG(G, hx, hy(hx, hz), hz, 0, -ha - Math.PI / 2, 0);
mmMesh(new THREE.SphereGeometry(7, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), st, 0, 0, 0, hg).scale.set(1.3, 0.6, 1);
mmSlab(hg, brass, 2, 2.6, 0.3, 0, 1.3, 6.9);
mmGlow(hg, 0xFFA060, 2.6, 0.4, 0, 2, 7.2);
sol.push({ x: hx, z: hz, r: 8 });
}
for (var c = 0; c < 6; c++) {
var cx = C[0] + (c - 2.5) * 14, cz = C[1] + 30;
mmCyl(G, iron, 0.8, 1, 9, cx, hy(cx, cz) + 4.5, cz, 0, 0, 0, 8);
for (var k = 0; k < 7; k++)
mmTorus(G, iron, 0.5, 0.14, cx + 0.9 + k * 0.8, hy(cx, cz) + 8.2 - k * 1.1, cz, 0, k % 2 ? Math.PI / 2 : 0, 0);
sol.push({ x: cx, z: cz, r: 1 });
}
for (var l = 0; l < 3; l++) {
mmSlab(G, fire, 1.4, 0.1, 90, C[0] - 30 + l * 30, hy(C[0], C[1]) + 0.06, C[1] + 30);
}
},
function (G, C, R, sol, hy) {
var w = mmMat(0xF0F0EC, { shine: 30, tex: "worn" }), w2 = mmMat(0xD8DCE0, { shine: 30, tex: "worn" }), blue = mmMat(0x5A8AC8, { shine: 50 }), gold = mmMat(0xD8B060, { shine: 70, tex: "brass" }), lit = mmMat(0xC8E8FF, { glow: 1 });
var hl = mmG(G, C[0], hy(C[0], C[1] - 30), C[1] - 30);
mmSlab(hl, w2, 28, 1, 44, 0, 0.5, 0);
for (var i = 0; i < 8; i++) {
[-1, 1].forEach(function (s) { mmCyl(hl, w, 0.9, 1, 12, s * 11, 6.5, -18 + i * 5.2, 0, 0, 0, 14); mmSlab(hl, w2, 2.4, 0.8, 2.4, s * 11, 12.8, -18 + i * 5.2); });
}
mmSlab(hl, w, 28, 1.2, 44, 0, 13.8, 0);
mmFlat(hl, w2, [[-15, 0], [15, 0], [0, 5]], 44, 0, 14.4, -22, 0, 0, 0);
mmEll(hl, lit, 2, 2, 2, 0, 6, -14, 14);
mmGlow(hl, 0xC8E8FF, 9, 0.4, 0, 6, -14);
[-1, 1].forEach(function (s) { sol.push({ x: C[0] + s * 11, z: C[1] - 30, hw: 1.1, hd: 22 }); });
for (var t = 0; t < 3; t++) {
var tx = C[0] - 40 + t * 40, tz = C[1] + 20, tg = mmG(G, tx, hy(tx, tz), tz);
mmCyl(tg, w2, 10, 10.4, 0.4, 0, 0.2, 0, 0, 0, 0, 32);
mmTorus(tg, blue, 9.6, 0.12, 0, 0.42, 0, Math.PI / 2, 0, 0);
for (var m = 0; m < 8; m++) {
var ma = m / 8 * Math.PI * 2;
mmCyl(tg, w, 0.3, 0.35, 1.4, Math.cos(ma) * 10.8, 0.7, Math.sin(ma) * 10.8, 0, 0, 0, 8);
}
}
var lk = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.MeshStandardMaterial({ color: 0x8AB0D8, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.9 }));
lk.rotation.x = -Math.PI / 2;
lk.position.set(C[0] + 70, hy(C[0] + 70, C[1] - 40) + 0.15, C[1] - 40);
G.add(lk);
for (var s2 = 0; s2 < 9; s2++) {
var sa = s2 / 9 * Math.PI * 2, sx = C[0] + 70 + Math.cos(sa) * 33, sz = C[1] - 40 + Math.sin(sa) * 33;
mmEll(G, w2, 1.2, 0.5, 1.2, sx, hy(sx, sz) + 0.3, sz, 10);
}
var sp = mmG(G, C[0] - 60, hy(C[0] - 60, C[1] - 60), C[1] - 60);
mmCyl(sp, w, 4, 5, 40, 0, 20, 0, 0, 0, 0, 8);
mmCone(sp, gold, 4.6, 10, 0, 45, 0, 0, 0, 0, 8);
mmEll(sp, lit, 1.6, 2.4, 1.6, 0, 41, 0, 12);
mmGlow(sp, 0xC8E8FF, 16, 0.45, 0, 41, 0);
sol.push({ x: C[0] - 60, z: C[1] - 60, r: 5.2 });
for (var av = 0; av < 8; av++) {
[-1, 1].forEach(function (sd) {
var ax = C[0] + sd * 7, az = C[1] + 30 - av * 7, ag = mmG(G, ax, hy(ax, az), az, 0, sd > 0 ? -Math.PI / 2 : Math.PI / 2, 0);
mmSlab(ag, w2, 1.6, 0.8, 1.6, 0, 0.4, 0);
mmCyl(ag, w, 0.55, 0.8, 2.6, 0, 2.1, 0, 0, 0, 0, 12);
mmEll(ag, w, 0.36, 0.42, 0.36, 0, 3.7, 0, 12);
mmCone(ag, w, 0.48, 0.7, 0, 3.95, -0.05, 0, 0, 0, 12);
mmCyl(ag, w2, 0.05, 0.05, 1.6, 0, 2.2, 0.62, 0, 0, 0, 6);
mmSlab(ag, gold, 0.36, 0.06, 0.1, 0, 2.95, 0.62);
sol.push({ x: ax, z: az, r: 0.95 });
if (av % 2 === 0) {
var lx = C[0] + sd * 4, lz = az - 3.5;
gxLamp(G, lx, hy(lx, lz), lz, 0xC8E8FF, 2.8);
}
});
}
var blos = [mmMat(0xF0C8E0, {}), mmMat(0xE8E0FF, {}), mmMat(0xC8E8F0, {})], trunk = mmMat(0x5A4A40, { tex: "worn" });
for (var bt = 0; bt < (sbLite() ? 10 : 26); bt++) {
var ba = bt / 26 * Math.PI * 2, bd = 40 + (bt % 3) * 14, bx = C[0] + Math.cos(ba) * bd, bz = C[1] - 10 + Math.sin(ba) * bd;
if (Math.abs(bx - C[0]) < 12 && bz > C[1] - 40)
continue;
var tg = mmG(G, bx, hy(bx, bz), bz);
mmCyl(tg, trunk, 0.3, 0.45, 4, 0, 2, 0, 0, 0, 0, 8);
for (var cl = 0; cl < 4; cl++)
mmEll(tg, blos[(bt + cl) % 3], 2.2, 1.5, 2.2, (cl % 2 ? 1 : -1) * 0.9, 4.6 + cl * 0.5, (cl < 2 ? 0.8 : -0.8), 10);
sol.push({ x: bx, z: bz, r: 0.6 });
}
var stream = new THREE.Mesh(new THREE.PlaneGeometry(6, 160), new THREE.MeshStandardMaterial({ color: 0x8AB8E0, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.85 }));
stream.rotation.x = -Math.PI / 2;
stream.rotation.z = 0.6;
stream.position.set(C[0] + 40, hy(C[0] + 40, C[1]) + 0.12, C[1]);
G.add(stream);
var br = mmG(G, C[0] + 40, hy(C[0] + 40, C[1]), C[1], 0, 0.6, 0);
mmFlat(br, w2, [[-5, 0], [5, 0], [4, 1.2], [-4, 1.2]], 3, 0, 0, -1.5, 0, 0, 0);
for (var bp = 0; bp < 6; bp++)
mmCyl(br, w, 0.15, 0.15, 1, -4 + bp * 1.6, 1.7, 1.4);
for (var tr = 0; tr < 4; tr++) {
var ty = hy(C[0], C[1] - 80 - tr * 14);
mmSlab(G, w2, 90 - tr * 14, 2 + tr * 2, 12, C[0], ty + tr + 1, C[1] - 80 - tr * 14);
for (var g = 0; g < 6; g++)
mmEll(G, mmMat([0x4A8A4A, 0x6AA85A, 0xC8A0E0][g % 3], {}), 1.6, 1.2, 1.6, C[0] - 35 + tr * 7 + g * (12 - tr * 2), ty + tr * 2 + 2.6, C[1] - 80 - tr * 14, 10);
}
},
function (G, C, R, sol, hy) {
var gold = mmMat(0xD8B060, { shine: 80, tex: "brass" }), cream = mmMat(0xF0E4C8, { shine: 40, tex: "worn" }), glass = mmMat(0x6A8AB8, { shine: 95, op: 0.9 }), lit = mmMat(0xFFE8B0, { glow: 1 }), stone = mmMat(0xE8DCC0, { shine: 20, tex: "worn", rep: 4 });
mmSlab(G, stone, 220, 0.2, 220, C[0], 0.1, C[1] + 20);
var se = mmG(G, C[0], 0, C[1] - 58);
mmCyl(se, cream, 34, 36, 4, 0, 2, 0, 0, 0, 0, 40);
for (var i = 0; i < 28; i++) {
if (i === 7)
continue;
var a = i / 28 * Math.PI * 2;
mmCyl(se, cream, 1.1, 1.2, 16, Math.cos(a) * 31, 12, Math.sin(a) * 31, 0, 0, 0, 12);
}
mmCyl(se, gold, 33, 33, 3, 0, 21.5, 0, 0, 0, 0, 40);
mmMesh(new THREE.SphereGeometry(30, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), glass, 0, 23, 0, se);
mmTorus(se, gold, 30, 0.8, 0, 23.2, 0, Math.PI / 2, 0, 0);
mmLathe(se, gold, [[0, 0], [3, 0], [2, 4], [0.6, 9], [0, 10]], 0, 52, 0, 16);
mmGlow(se, 0xFFE0A0, 10, 0.5, 0, 62, 0);
sol.push({ x: C[0], z: C[1] - 58, r: 34 });
SF.gxSenate = { x: C[0], z: C[1] - 58 };
for (var s = 0; s < 6; s++)
mmSlab(G, stone, 30 - s * 2, 0.5, 1.4, C[0], 0.25 + s * 0.5, C[1] - 22 - s * 1.4);
var fcol = [0x6A2A8A, 0x8A1A10, 0x3AC8B0, 0x7AD87A, 0x2A6AA8, 0xE8C060, 0xF0F0F0, 0x3A3A3A];
for (var f = 0; f < 16; f++) {
var fa = f / 16 * Math.PI * 2, fx = C[0] + Math.cos(fa) * 52, fz = C[1] - 58 + Math.sin(fa) * 52;
if (fz > C[1] - 20)
continue;
mmCyl(G, gold, 0.12, 0.14, 12, fx, 6, fz);
mmFlat(G, mmMat(fcol[f % 8], { ds: true }), [[0, 0], [3, 0], [3, 2], [0, 2]], 0.03, fx, 10.4, fz, 0, -fa, 0);
}
for (var t = 0; t < (sbLite() ? 30 : 70); t++) {
var ta = R() * Math.PI * 2, td = 110 + R() * 600, tx = C[0] + Math.cos(ta) * td, tz = C[1] + Math.sin(ta) * td, th = 60 + R() * 260, tw = 12 + R() * 16;
var tg = mmG(G, tx, 0, tz);
mmCyl(tg, t % 3 ? cream : gold, tw * 0.45, tw * 0.55, th, 0, th / 2, 0, 0, 0, 0, t % 2 ? 6 : 8);
for (var b = 0; b < Math.min(8, Math.floor(th / 30)); b++)
mmCyl(tg, lit, tw * 0.52, tw * 0.52, 0.8, 0, 20 + b * 30, 0, 0, 0, 0, t % 2 ? 6 : 8);
mmCone(tg, gold, tw * 0.3, th * 0.12, 0, th + th * 0.06, 0, 0, 0, 0, 8);
sol.push({ x: tx, z: tz, r: tw * 0.56 });
}
for (var h = 0; h < 10; h++) {
var side = h < 5 ? -1 : 1, hx = C[0] + side * 44, hz = C[1] + 40 - (h % 5) * 16, hg = mmG(G, hx, 0, hz, 0, side > 0 ? -Math.PI / 2 : Math.PI / 2, 0);
mmSlab(hg, cream, 12, 9, 8, 0, 4.5, 0);
mmSlab(hg, glass, 9, 3, 0.2, 0, 2.2, 4.05);
mmFlat(hg, mmMat(fcol[h % 8], { ds: true }), [[0, 0], [10, 0], [10, 2.6], [0, 2.6]], 0.03, -5, 4.2, 4, -1.1, 0, 0);
mmSlab(hg, lit, 10, 0.3, 0.2, 0, 8.6, 4.05);
sol.push({ x: hx, z: hz, hw: 6.2, hd: 4.2 });
}
for (var l = 0; l < 10; l++)
gxLamp(G, C[0] + (l % 2 ? -30 : 30), 0, C[1] + 40 - Math.floor(l / 2) * 16, 0xFFE8B0, 4);
SF.gxTraffic = [];
for (var k = 0; k < (sbLite() ? 8 : 20); k++) {
var sh = k % 2 ? sbBuildCutter(0xE8E8F0, 0xD8B060) : spAlienShip([0x7AD87A, 0xB890F0, 0xE8A86A][k % 3], "tullik");
sbFit(sh, k % 2 ? 8 : 6);
sh.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
G.add(sh);
SF.gxTraffic.push({ g: sh, lane: k % 4, ph: R() * Math.PI * 2, y: 60 + (k % 4) * 22, r: 180 + (k % 3) * 60, sp: 0.05 + R() * 0.04 });
}
},
function (G, C, R, sol, hy) {
var ice = mmMat(0xD8ECFF, { shine: 70, op: 0.95 }), snow = mmMat(0xF8FBFF, { shine: 20 }), wood = mmMat(0x5A4430, { tex: "worn" }), fur = [mmMat(0xF0EEE8, {}), mmMat(0xC8BCA8, {}), mmMat(0x8A7A68, {})], fire = mmMat(0xFF9A4A, { glow: 1 });
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2, x = C[0] + Math.cos(a) * 34, z = C[1] + Math.sin(a) * 34, h = mmG(G, x, hy(x, z), z, 0, -a - Math.PI / 2, 0);
mmMesh(new THREE.SphereGeometry(5, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), ice, 0, 0, 0, h);
mmCyl(h, ice, 1.4, 1.6, 2.2, 0, 1.1, 4.6, Math.PI / 2, 0, 0, 10);
mmGlow(h, 0xFFB060, 2.6, 0.4, 0, 1.4, 5.8);
sol.push({ x: x, z: z, r: 5.4 });
}
var fp = mmG(G, C[0], hy(C[0], C[1]), C[1]);
mmCyl(fp, mmMat(0x4A4A50, {}), 2.4, 2.8, 0.8, 0, 0.4, 0, 0, 0, 0, 14);
mmCone(fp, fire, 1.6, 2.4, 0, 1.8, 0, 0, 0, 0, 10);
mmGlow(fp, 0xFF9A4A, 7, 0.6, 0, 2, 0);
sol.push({ x: C[0], z: C[1], r: 2.8 });
for (var r = 0; r < 4; r++) {
var rx = C[0] - 16 + r * 10, rz = C[1] + 18;
mmCyl(G, wood, 0.12, 0.12, 3, rx - 1.6, hy(rx, rz) + 1.5, rz);
mmCyl(G, wood, 0.12, 0.12, 3, rx + 1.6, hy(rx, rz) + 1.5, rz);
mmSlab(G, fur[r % 3], 3.4, 1.6, 0.2, rx, hy(rx, rz) + 2, rz);
}
SF.gxHerd = [];
for (var w = 0; w < (sbLite() ? 5 : 12); w++) {
var wa = R() * Math.PI * 2, wd = 70 + R() * 120, wx = C[0] + Math.cos(wa) * wd, wz = C[1] + Math.sin(wa) * wd, g = mmG(G, wx, hy(wx, wz), wz, 0, R() * 6, 0), f = fur[w % 3];
mmEll(g, f, 1.8, 1.7, 2.8, 0, 2.8, 0, 14);
mmEll(g, f, 1, 1.1, 1.2, 0, 3.2, 2.8, 12);
for (var lg = 0; lg < 4; lg++)
mmCyl(g, fur[2], 0.32, 0.28, 1.8, (lg % 2 ? 0.9 : -0.9), 0.9, (lg < 2 ? 1.6 : -1.6));
[-1, 1].forEach(function (s) { mmHorn(g, ice, [[s * 0.5, 3.9, 2.8], [s * 1.4, 5, 2.6], [s * 1.8, 5.6, 3.2]], 0.14, 0, 0, 0); });
SF.gxHerd.push(g);
sol.push({ x: wx, z: wz, r: 2.4 });
}
var wt = mmG(G, C[0] + 50, hy(C[0] + 50, C[1] - 50), C[1] - 50);
mmCyl(wt, wood, 2, 2.6, 16, 0, 8, 0, 0, 0, 0, 8);
mmCyl(wt, ice, 3.6, 3.6, 3, 0, 17.5, 0, 0, 0, 0, 8);
mmCone(wt, snow, 4.4, 4, 0, 21, 0, 0, 0, 0, 8);
mmGlow(wt, 0xFFB060, 4, 0.4, 0, 17.5, 3.8);
sol.push({ x: C[0] + 50, z: C[1] - 50, r: 2.8 });
for (var s = 0; s < (sbLite() ? 10 : 26); s++) {
var sx = (R() - 0.5) * 700, sz = (R() - 0.5) * 700;
if (Math.hypot(sx - C[0], sz - C[1]) < 60)
continue;
var sh = 8 + R() * 30;
mmCone(G, ice, 1.5 + R() * 3, sh, sx, hy(sx, sz) + sh / 2, sz, (R() - 0.5) * 0.3, 0, (R() - 0.5) * 0.3, 6);
sol.push({ x: sx, z: sz, r: 2.5 });
}
},
function (G, C, R, sol, hy) {
var ash = mmMat(0x2A2422, { shine: 8, tex: "worn", rep: 2 }), ash2 = mmMat(0x3A3230, { shine: 8, tex: "worn" }), ember = mmMat(0xFF5A2A, { glow: 1 }), iron = mmMat(0x1A1618, { shine: 40, tex: "plate" });
for (var i = 0; i < (sbLite() ? 14 : 34); i++) {
var a = R() * Math.PI * 2, d = 30 + R() * 300, x = Math.cos(a) * d, z = Math.sin(a) * d, h = 6 + R() * 40, w = 4 + R() * 8;
var t = mmG(G, x, hy(x, z), z, (R() - 0.5) * 0.15, R() * 6, (R() - 0.5) * 0.15);
mmSlab(t, i % 2 ? ash : ash2, w, h, w, 0, h / 2, 0);
for (var k = 0; k < 3; k++)
mmSlab(t, mmMat(0x0A0808, {}), w * 0.2, w * 0.3, 0.2, (k - 1) * w * 0.3, h * 0.6, w / 2 + 0.05);
mmSlab(t, ash2, w * 1.2, 1.2, w * 0.4, R() * 2, h + 0.4, 0).rotation.z = (R() - 0.5) * 0.8;
sol.push({ x: x, z: z, hw: w / 2 + 0.2, hd: w / 2 + 0.2 });
}
var hd = mmG(G, C[0], hy(C[0], C[1]), C[1]);
mmSlab(hd, ash, 14, 4, 1, 0, 2, -6);
mmSlab(hd, ash2, 1, 3, 10, -7, 1.5, 0);
mmFlat(hd, mmMat(0x4A4440, { ds: true }), [[0, 0], [12, 0], [12, 9], [0, 9]], 0.04, -6, 3.6, -6, -1.35, 0, 0);
mmCyl(hd, ash2, 1, 1.2, 0.5, 0, 0.25, -1, 0, 0, 0, 10);
mmGlow(hd, 0xFF8A3A, 2.2, 0.5, 0, 0.8, -1);
for (var b = 0; b < 3; b++)
mmSlab(hd, mmMat(0x5A4A3A, {}), 0.8, 0.2, 2, -4 + b * 1.6, 0.1, -3.6);
sol.push({ x: C[0], z: C[1] - 6, hw: 7, hd: 0.6 });
var fx = C[0] - 260, fz = C[1] - 520, fy = hy(fx, fz), ft = mmG(G, fx, fy, fz);
mmSlab(ft, iron, 160, 40, 30, 0, 20, 0);
for (var tw = 0; tw < 5; tw++) {
mmCyl(ft, iron, 8, 10, 70, -80 + tw * 40, 35, 0, 0, 0, 0, 6);
mmCone(ft, iron, 9, 24, -80 + tw * 40, 82, 0, 0, 0, 0, 6);
mmSlab(ft, ember, 1, 6, 0.4, -80 + tw * 40, 50, 10.2);
}
mmCone(ft, iron, 14, 180, 0, 90, -10, 0, 0, 0, 6);
mmEll(ft, ember, 3, 4, 3, 0, 170, -10, 10);
mmGlow(ft, 0xFF5A2A, 30, 0.4, 0, 170, -10);
for (var l = 0; l < 12; l++)
mmSlab(ft, ember, 4, 0.8, 0.3, -66 + l * 12, 12, 15.2);
mmSlab(ft, mmMat(0x050404, {}), 16, 22, 0.6, 0, 11, 15.3);
mmSlab(ft, iron, 20, 2, 1.6, 0, 23, 15.4);
mmGlow(ft, 0xFF5A2A, 10, 0.35, 0, 8, 17);
for (var c = 0; c < (sbLite() ? 6 : 16); c++) {
var cx = (R() - 0.5) * 400, cz = (R() - 0.5) * 400;
mmSlab(G, ember, 0.18, 0.03, 6 + R() * 14, cx, hy(cx, cz) + 0.02, cz).rotation.y = R() * 6;
}
for (var bz = 0; bz < 10; bz++) {
var bx = C[0] - 26 * bz, bzz = C[1] - 52 * bz, bg = mmG(G, bx + 8, hy(bx + 8, bzz), bzz);
mmCyl(bg, iron, 0.5, 0.3, 1.2, 0, 0.6, 0, 0, 0, 0, 8);
mmEll(bg, ember, 0.45, 0.3, 0.45, 0, 1.3, 0, 10);
mmGlow(bg, 0xFF7A3A, 3.4, 0.55, 0, 1.6, 0);
sol.push({ x: bx + 8, z: bzz, r: 0.6 });
}
for (var bn = 0; bn < 6; bn++) {
var bnx = C[0] - 60 - bn * 30, bnz = C[1] - 120 - bn * 60, bng = mmG(G, bnx, hy(bnx, bnz), bnz);
mmCyl(bng, iron, 0.12, 0.12, 7, 0, 3.5, 0);
mmFlat(bng, mmMat(0x3A0A08, { ds: true }), [[0, 0], [1.6, 0], [1.6, 4], [0.8, 3.2], [0, 4]], 0.02, 0.12, 2.6, 0, 0, 0, 0);
mmEll(bng, ember, 0.2, 0.2, 0.2, 0, 7.2, 0, 8);
}
},
function (G, C, R, sol, hy) {
var deck = mmMat(0x4A4440, { shine: 40, tex: "plate", rep: 6 }), hull = [mmMat(0x6A625A, { shine: 40, tex: "worn" }), mmMat(0x5A6A7A, { shine: 40, tex: "plate" }), mmMat(0x8A5A3A, { shine: 30, tex: "worn" })], cab = mmMat(0x2A2826, { shine: 30 }), canvas = [mmMat(0xC84A2A, { ds: true }), mmMat(0x3A8A6A, { ds: true }), mmMat(0xE8C060, { ds: true }), mmMat(0x6A3A8A, { ds: true })];
for (var i = 0; i < (sbLite() ? 8 : 18); i++) {
var a = i / 18 * Math.PI * 2, d = 150 + R() * 80, x = Math.cos(a) * d, z = Math.sin(a) * d + C[1], s = i % 3 === 0 ? sbFoeModel("marauder") : i % 3 === 1 ? sbBuildCutter([0xC8B8A0, 0x8A9AA8][i % 2], 0x8A3A22) : spAlienShip([0x7AD87A, 0xB890F0][i % 2], "tullik");
sbFit(s, 40 + R() * 50);
s.position.set(x, 10 + R() * 30, z);
s.rotation.set((R() - 0.5) * 0.3, -a, (R() - 0.5) * 0.3);
s.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
G.add(s);
mmRod(G, cab, [x * 0.5, 4, C[1] + (z - C[1]) * 0.5], [x, s.position.y, z], 0.4);
}
for (var m = 0; m < 16; m++) {
var ma = m / 16 * Math.PI * 2, mx = C[0] + Math.cos(ma) * (m % 2 ? 34 : 20), mz = C[1] + Math.sin(ma) * (m % 2 ? 34 : 20), mg = mmG(G, mx, 0, mz, 0, -ma + Math.PI / 2, 0);
mmSlab(mg, hull[m % 3], 4, 1.1, 1.6, 0, 0.55, 0);
mmSlab(mg, hull[(m + 1) % 3], 0.2, 2.8, 1.6, -2, 1.4, 0);
mmSlab(mg, hull[(m + 1) % 3], 0.2, 2.8, 1.6, 2, 1.4, 0);
mmFlat(mg, canvas[m % 4], [[0, 0], [4.6, 0], [4.6, 2.4], [0, 2.4]], 0.03, -2.3, 2.8, 0.8, -1.25, 0, 0);
for (var w = 0; w < 4; w++)
mmEll(mg, mmMat([0xE8C27A, 0x8AE8FF, 0xFF8A6A, 0xB8A0E8][(w + m) % 4], { shine: 50 }), 0.18, 0.16, 0.18, (w - 1.5) * 0.7, 1.25, 0.4, 8);
sol.push({ x: mx, z: mz, r: 2.3 });
}
for (var l = 0; l < 24; l++) {
var la = l / 24 * Math.PI * 2, lx = C[0] + Math.cos(la) * 44, lz = C[1] + Math.sin(la) * 44;
gxLamp(G, lx, 0, lz, [0xFFB060, 0xFFE0A0, 0x8AE8FF][l % 3], 5);
}
var rs = mmG(G, C[0] + 60, 0, C[1] - 30);
mmCyl(rs, hull[1], 6, 7, 22, 0, 11, 0, 0, 0, 0, 12);
for (var r = 0; r < 4; r++)
mmTorus(rs, mmMat(0x8AE8FF, { glow: 1 }), 6.6, 0.25, 0, 4 + r * 5, 0, Math.PI / 2, 0, 0);
mmGlow(rs, 0x8AE8FF, 14, 0.35, 0, 22, 0);
sol.push({ x: C[0] + 60, z: C[1] - 30, r: 7.2 });
var br = mmG(G, C[0], 0, C[1] - 40);
mmSlab(br, hull[0], 24, 8, 12, 0, 4, 0);
mmSlab(br, mmMat(0x2A4A6A, { shine: 90, op: 0.85 }), 20, 2.2, 0.2, 0, 5.4, 6.05);
mmSlab(br, hull[2], 26, 1, 14, 0, 8.5, 0);
sol.push({ x: C[0], z: C[1] - 40, hw: 12.2, hd: 6.2 });
for (var c = 0; c < 20; c++) {
var cx = C[0] + (R() - 0.5) * 90, cz = C[1] + (R() - 0.5) * 90;
if (Math.hypot(cx - C[0], cz - C[1]) < 12)
continue;
mmSlab(G, hull[c % 3], 1.2, 1.2, 1.2, cx, 0.6, cz);
}
for (var s2 = -5; s2 <= 5; s2++)
mmSlab(G, cab, 0.2, 0.04, 220, C[0] + s2 * 20, 0.03, C[1]);
},
function (col) {
var g = new THREE.Group(), metal = mmMat(0xB8BCC4, { shine: 80, tex: "plate" }), grip = mmMat(0x2A2420, { shine: 20 }), gold = mmMat(0xC8A060, { shine: 70, tex: "brass" });
mmCyl(g, grip, 0.022, 0.024, 0.16, 0, 0.08, 0, 0, 0, 0, 10);
mmCyl(g, metal, 0.026, 0.026, 0.07, 0, 0.195, 0, 0, 0, 0, 10);
mmTorus(g, gold, 0.028, 0.006, 0, 0.235, 0, Math.PI / 2, 0, 0);
mmCyl(g, metal, 0.03, 0.022, 0.03, 0, 0.25, 0, 0, 0, 0, 10);
var core = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.014, 0.95, 10), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
core.position.y = 0.74;
g.add(core);
var glow = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.036, 0.98, 12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
glow.position.y = 0.74;
g.add(glow);
var halo = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 1.02, 12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending }));
halo.position.y = 0.74;
g.add(halo);
g.userData.beam = [core, glow, halo];
if (!sbLite()) {
var L = new THREE.PointLight(col, 0.9, 7, 2);
L.position.y = 0.7;
g.add(L);
}
return g;
},
function (on) {
var S = wdGet();
if (on && !S.blade) {
sbSay("You have no starblade yet. Become a Seeker of the Order on Aster Still, find a heart-shard, and build one.");
return;
}
if (on && !wdLawBlade())
return;
WD.drawn = on;
if (on) {
if (!WD.blade || WD.blade.userData.col !== S.blade) {
if (WD.blade && WD.blade.parent)
WD.blade.parent.remove(WD.blade);
WD.blade = wdBuildBlade(S.blade);
WD.blade.userData.col = S.blade;
}
WORLDS.surface.g.add(WD.blade);
WD.blade.visible = true;
sbTone(110, 0.25);
setTimeout(function () { sbTone(220, 0.2); }, 90);
}
else if (WD.blade) {
if (WD.blade.parent)
WD.blade.parent.remove(WD.blade);
sbTone(180, 0.12);
}
wdPadPaint();
},
function (dt) {
if (!WD.drawn || !WD.blade)
return;
var W = WORLDS.surface, c = camera.position, fw = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)), rt = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
var B = WD.blade, sw = WD.swing > 0 ? 1 - WD.swing / 0.28 : 0, q = camera.quaternion;
var off = WD.guard ? new THREE.Vector3(0.04, -0.26, -0.55) : new THREE.Vector3(0.3, -0.36, -0.55);
B.position.copy(c).sub(W.g.position).add(off.applyQuaternion(q));
B.quaternion.copy(q);
if (WD.guard) {
B.rotateZ(1.3);
B.rotateX(-0.2);
}
else if (WD.swing > 0) {
B.rotateX(-0.4 - sw * 1.6);
B.rotateZ(0.7 - sw * 1.9);
}
else {
B.rotateX(-0.55 + Math.sin(WD.t * 1.3) * 0.02);
B.rotateZ(0.42);
}
var hum = 0.5 + Math.sin(WD.t * 23) * 0.03;
B.userData.beam[1].material.opacity = hum;
},
function () {
var k = SF.k, L = wdLocal();
if (k === "aurelion") {
sbSay("<b>The city guard:</b> \"No weapons in Aurelion, friend. Leave it on your ship.\" Your blade stays sheathed.");
return false;
}
if (k === "sereth") {
sbSay("<b>Mother Ilvane's voice, quiet in your head:</b> \"Not in the groves.\" The trees lean closer. You put it away.");
if (WD.t - WD.lawTold > 30) {
WD.lawTold = WD.t;
wdBal(-1);
}
return false;
}
if (k === "aster" && !wdOnFloor(L)) {
sbSay("Blades are drawn only on the training floors, Seeker. They are just south of the Hall.");
return false;
}
return true;
},
function () {
if (!WD.drawn || WD.swing > 0)
return;
WD.swing = 0.28;
sbTone(260 + Math.random() * 60, 0.08);
var L = wdLocal(), fw = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
WD.foes.forEach(function (F) {
var dx = F.x - L.x, dz = F.z - L.z, d = Math.hypot(dx, dz);
if (d > 2.9)
return;
if ((dx * fw.x + dz * fw.z) / Math.max(0.01, d) < 0.35)
return;
if (F.yield) {
if (!F.struck) {
F.struck = 1;
wdBal(-5, "A Warden never strikes one who yields.");
}
return;
}
if (F.kind === "drone")
return;
var dmg = wdGet().rank >= 3 ? 30 : 22;
F.hp -= dmg;
F.hit = 0.2;
F.stun = Math.max(F.stun || 0, 0.35);
wdSpark(F.x, F.y + 1.2, F.z, wdGet().blade);
if (F.hp <= 0)
wdYield(F);
});
},
function (g) {
var S = wdGet(), G = WD_GIFTS[g];
var allowed = S.gifts[g] || (WD.trial && WD.trial.g === g);
if (!allowed)
return false;
if ((WD.cool[g] || 0) > WD.t) {
return true;
}
WD.cool[g] = WD.t + G.cool;
var L = wdLocal(), fw = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
if (g === "push") {
sbTone(140, 0.3);
wdRipple(L.x + fw.x * 2, L.z + fw.z * 2, 0xC8E8FF);
WD.foes.forEach(function (F) { var dx = F.x - L.x, dz = F.z - L.z, d = Math.hypot(dx, dz); if (d > 9 || (dx * fw.x + dz * fw.z) / Math.max(0.01, d) < 0.5)
return; if (F.kind === "drone")
return; F.kx = dx / d * 12; F.kz = dz / d * 12; F.stun = 1.8; if (!F.yield) {
F.hp -= 8;
if (F.hp <= 0)
wdYield(F);
} });
if (WD.trial && WD.trial.stones)
WD.trial.stones.forEach(function (s) { var dx = s.x - L.x, dz = s.z - L.z, d = Math.hypot(dx, dz); if (d < 9 && (dx * fw.x + dz * fw.z) / Math.max(0.01, d) > 0.45) {
s.vx = dx / d * 14;
s.vz = dz / d * 14;
} });
}
if (g === "pull") {
var best = null, bd = 26;
WD.foes.forEach(function (F) { var dx = F.x - L.x, dz = F.z - L.z, d = Math.hypot(dx, dz); if (d < bd && (dx * fw.x + dz * fw.z) / Math.max(0.01, d) > 0.8 && !F.yield && F.kind !== "drone") {
best = F;
bd = d;
} });
if (WD.trial && WD.trial.lamps)
WD.trial.lamps.forEach(function (s) { if (s.got)
return; var dx = s.x - L.x, dz = s.z - L.z, d = Math.hypot(dx, dz); if (d < bd && (dx * fw.x + dz * fw.z) / Math.max(0.01, d) > 0.75) {
best = s;
bd = d;
} });
if (!best) {
sbSay("Nothing there to pull. Face it, then pull.");
return true;
}
sbTone(320, 0.25);
if (best.lamp) {
best.pulled = 1;
return true;
}
if (best.ranged) {
best.ranged = false;
best.disarmed = 1;
if (best.gun && best.gun.parent)
best.gun.parent.remove(best.gun);
sbSay("You pull the weapon from " + sbEsc(best.name) + "'s hands. It clatters at your feet.");
}
else {
best.kx = (L.x - best.x) / bd * 10;
best.kz = (L.z - best.z) / bd * 10;
best.stun = 1.2;
}
}
if (g === "leap") {
var grav = WORLDS.surface.gravity || 9.8;
WLD.hv = Math.sqrt(2 * grav * 7.5);
WD.leap = 0.8;
sbTone(400, 0.18);
}
if (g === "sense") {
WD.sense = 12;
sbTone(520, 0.4);
wdVeil(true);
}
if (g === "mend") {
WD.hp = Math.min(100, WD.hp + 45);
sbTone(660, 0.4);
wdRipple(L.x, L.z, 0x9AF0C8);
if (WD.trial && WD.trial.hurt)
WD.trial.hurt.forEach(function (h) { if (!h.done && Math.hypot(h.x - L.x, h.z - L.z) < 3.4) {
h.done = 1;
h.g.rotation.x = 0;
h.g.position.y = sfHeight(h.x, h.z);
wdRipple(h.x, h.z, 0x9AF0C8);
} });
}
if (g === "calm") {
var tgt = null, td = 7;
WD.foes.forEach(function (F) { var d = Math.hypot(F.x - L.x, F.z - L.z); if (d < td && !F.yield && !F.boss && F.kind !== "drone") {
tgt = F;
td = d;
} });
if (WD.trial && WD.trial.angry)
WD.trial.angry.forEach(function (a) { if (!a.done && Math.hypot(a.x - L.x, a.z - L.z) < 5) {
a.done = 1;
if (a.tag)
a.tag.visible = false;
sbSay("<b>" + sbEsc(a.name) + "</b> lets out a long breath. \"...You're right. It's not worth it.\"");
} });
if (tgt) {
wdYield(tgt, true);
wdBal(2);
sbSay("You speak quietly. <b>" + sbEsc(tgt.name) + "</b> lowers their weapon. \"I... don't want this fight.\" They yield.");
}
}
return true;
},
function (kind, seed) {
var robe = kind === "acolyte" ? 0x3A3434 : kind === "hunter" ? 0x5A4A3A : 0x6A5A4A;
var g = frFolk("wd_" + kind + seed, { title: kind, sex: seed % 2 ? "f" : "m", look: { skin: [0xC89A78, 0x8A6A50, 0xE0C0A0][seed % 3], hair: 0x1A1614, layer: kind === "acolyte" ? "robe" : "coat", layerColor: robe, hat: kind === "acolyte" ? "hood" : null } });
if (kind === "acolyte") {
var b = wdBuildBlade(0xFF5A2A);
b.scale.setScalar(0.95);
b.position.set(0.32, 0.95, 0.25);
b.rotation.set(-0.9, 0, 0.2);
g.add(b);
g.userData.weap = b;
}
else if (kind === "drone") {
g = new THREE.Group();
var m = mmMat(0x8A9AA8, { shine: 70, tex: "plate" });
mmEll(g, m, 0.35, 0.35, 0.35, 0, 1.8, 0, 16);
mmEll(g, mmMat(0x8AC8FF, { glow: 1 }), 0.12, 0.12, 0.05, 0, 1.8, 0.34, 10);
[-1, 1].forEach(function (s) { mmSlab(g, m, 0.5, 0.05, 0.2, s * 0.42, 1.8, 0); });
}
else {
var gun = new THREE.Group(), gm = mmMat(0x2A2A2E, { shine: 50, tex: "plate" });
mmSlab(gun, gm, 0.08, 0.12, 0.5, 0, 0, 0);
mmCyl(gun, gm, 0.025, 0.025, 0.25, 0, 0.02, -0.36, Math.PI / 2, 0, 0, 8);
mmEll(gun, mmMat(kind === "hunter" ? 0xFFB040 : 0xFF4A3A, { glow: 1 }), 0.03, 0.03, 0.03, 0, 0.02, -0.5, 6);
gun.position.set(0.3, 1.15, 0.3);
g.add(gun);
g.userData.gun = gun;
}
return g;
},
function (kind, x, z, o) {
var T = WD_FOE[kind], seed = (WD.seq = (WD.seq || 0) + 1), g = wdFoeModel(kind, seed);
var F = { kind: kind, g: g, x: x, z: z, y: sfHeight(x, z), hp: T.hp, max: T.hp, T: T, cool: 1 + Math.random(), ranged: !!T.ranged, name: (o && o.name) || T.name, gun: g.userData.gun, boss: o && o.boss, home: { x: x, z: z }, alert: o && o.alert };
if (o && o.hp) {
F.hp = F.max = o.hp;
}
g.position.set(x, F.y, z);
WORLDS.surface.g.add(g);
WD.foes.push(F);
return F;
},
function (dt) {
var L = wdLocal(), me = { x: L.x, z: L.z, y: camera.position.y - 1.2 };
WD.foes.forEach(function (F) {
var T = F.T, dx = me.x - F.x, dz = me.z - F.z, d = Math.hypot(dx, dz);
if (F.yield) {
F.yieldT += dt;
if (F.g) {
F.g.position.y = F.y - 0.35;
}
if (F.yieldT > 25 && !F.boss) {
F.gone = 1;
}
return;
}
if (F.kx || F.kz) {
F.x += F.kx * dt;
F.z += F.kz * dt;
F.kx *= Math.pow(0.08, dt);
F.kz *= Math.pow(0.08, dt);
if (Math.abs(F.kx) + Math.abs(F.kz) < 0.3) {
F.kx = 0;
F.kz = 0;
}
}
if (F.stun > 0) {
F.stun -= dt;
}
else if (d < (F.alert ? 90 : 40) || F.hp < F.max) {
F.alert = 1;
var want = F.ranged ? (T.range * 0.7) : T.reach * 0.85 || 1.8;
if (F.kind !== "drone") {
var mv = d > want ? 1 : (F.ranged && d < want * 0.6 ? -1 : 0);
F.x += dx / Math.max(0.01, d) * mv * T.spd * dt;
F.z += dz / Math.max(0.01, d) * mv * T.spd * dt;
if (F.ranged) {
var side = Math.sin(WD.t * 0.7 + F.home.x);
F.x += -dz / Math.max(0.01, d) * side * 1.4 * dt;
F.z += dx / Math.max(0.01, d) * side * 1.4 * dt;
}
}
F.cool -= dt;
if (F.cool <= 0) {
F.cool = T.cool * (0.8 + Math.random() * 0.5);
if (F.ranged && d < T.range)
wdBolt(F, me);
else if (!F.ranged && d < (T.reach || 2.3)) {
F.swing = 0.3;
if (WD.guard) {
sbTone(500, 0.06);
wdSpark(L.x - Math.sin(yaw) * 0.6, camera.position.y - 0.3, L.z - Math.cos(yaw) * 0.6, 0xFF8A3A);
}
else
wdHurt(T.dmg, F);
}
}
}
F.y = sfHeight(F.x, F.z) + (F.kind === "drone" ? 1.2 + Math.sin(WD.t * 2) * 0.2 : 0);
if (F.g) {
F.g.position.set(F.x, F.y, F.z);
F.g.rotation.y = Math.atan2(dx, dz);
if (F.g.userData.weap) {
F.g.userData.weap.rotation.x = F.swing > 0 ? -0.2 - F.swing * 4 : -0.9;
}
}
if (F.swing > 0)
F.swing -= dt;
});
WD.foes = WD.foes.filter(function (F) { if (F.gone) {
if (F.g && F.g.parent)
F.g.parent.remove(F.g);
return false;
} return true; });
},
function (F, me) {
var col = F.kind === "hunter" ? 0xFFB040 : F.kind === "drone" ? 0x8AC8FF : 0xFF4A3A;
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
var p = new THREE.Vector3(F.x, F.y + 1.4, F.z), to = new THREE.Vector3(me.x + (Math.random() - 0.5) * 0.6, camera.position.y - 0.25, me.z + (Math.random() - 0.5) * 0.6), v = to.clone().sub(p).normalize().multiplyScalar(F.kind === "drone" ? 16 : 22);
m.position.copy(p);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
WORLDS.surface.g.add(m);
WD.bolts.push({ m: m, p: p, v: v, from: F, col: col, t: 0 });
sbTone(880, 0.04);
},
function (dt) {
var c = camera.position, L = wdLocal(), eye = new THREE.Vector3(L.x, c.y - 0.25, L.z);
WD.bolts.forEach(function (b) {
b.t += dt;
b.p.addScaledVector(b.v, dt);
b.m.position.copy(b.p);
if (b.back) {
WD.foes.forEach(function (F) { if (!b.done && F !== null && !F.yield && Math.hypot(F.x - b.p.x, F.z - b.p.z) < 0.8 && Math.abs(F.y + 1.2 - b.p.y) < 1.3) {
b.done = 1;
if (F.kind === "drone") {
wdSpark(b.p.x, b.p.y, b.p.z, 0x8AC8FF);
return;
}
F.hp -= 30;
F.stun = 0.6;
wdSpark(b.p.x, b.p.y, b.p.z, b.col);
if (F.hp <= 0)
wdYield(F);
} });
}
else if (b.p.distanceTo(eye) < 0.75) {
b.done = 1;
var since = WD.t - WD.guardAt, fwd = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)), facing = b.v.clone().normalize().dot(fwd) < -0.3;
if (WD.guard && facing && since < 0.45 && (wdHas("turn") || (WD.trial && WD.trial.g === "turn"))) {
var nb = { m: b.m, p: b.p.clone(), v: new THREE.Vector3(b.from.x, b.from.y + 1.3, b.from.z).sub(b.p).normalize().multiplyScalar(30), from: null, col: wdGet().blade || 0x8AC8FF, t: 0, back: 1 };
b.m.material.color.setHex(nb.col);
b.m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), nb.v.clone().normalize());
WD.bolts.push(nb);
b.keep = 1;
sbTone(1200, 0.07);
wdSpark(b.p.x, b.p.y, b.p.z, nb.col);
if (WD.trial && WD.trial.g === "turn")
WD.trial.n++;
}
else if (WD.guard && facing) {
sbTone(700, 0.05);
wdSpark(b.p.x, b.p.y, b.p.z, b.col);
}
else
wdHurt(b.from && b.from.T ? b.from.T.dmg : 8, b.from);
}
if (b.t > 3)
b.done = 1;
});
WD.bolts = WD.bolts.filter(function (b) { if (b.done && !b.keep) {
if (b.m.parent)
b.m.parent.remove(b.m);
return false;
} if (b.keep) {
b.keep = 0;
return false;
} return true; });
},
function (n, F) {
if (WD.downT > 0)
return;
WD.hp -= n;
if (typeof sbVig === "function")
sbVig(0xFF6A3A, 0.16);
if (WD.hp <= 0) {
WD.hp = 100;
WD.downT = 3;
WD.drawn && wdDraw(false);
var W = WORLDS.surface;
camera.position.set(W.base + 8, 1.72 + sfHeight(8, 12), 12);
sbSay("<b>You are knocked down.</b> You wake by your lander, bruised but whole. Nothing is lost. " + (F && F.boss ? "The Hollow do not chase you; they want you to come back." : "Mend, and try again."));
}
},
function (x, z, col) { var r = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.8, 32), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })); r.rotation.x = -Math.PI / 2; r.position.set(x, sfHeight(x, z) + 0.1, z); WORLDS.surface.g.add(r); WD.fx.push({ m: r, t: 0, life: 0.9, grow: 9 }); },
function (dt) { WD.fx.forEach(function (f) { f.t += dt; var k = f.t / f.life; if (f.grow)
f.m.scale.setScalar(1 + k * f.grow); if (f.m.material)
f.m.material.opacity = Math.max(0, (f.grow ? 0.6 : 0.85) * (1 - k)); }); WD.fx = WD.fx.filter(function (f) { if (f.t >= f.life) {
if (f.m.parent)
f.m.parent.remove(f.m);
return false;
} return true; }); },
function (on) {
var v = document.getElementById("wd-veil");
if (!v) {
v = document.createElement("div");
v.id = "wd-veil";
v.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:61;opacity:0;transition:opacity .8s;box-shadow:inset 0 0 220px 90px rgba(110,170,255,.55);background:radial-gradient(ellipse at center,rgba(140,190,255,0) 55%,rgba(110,170,255,.18) 100%)";
document.body.appendChild(v);
}
v.style.opacity = on ? "1" : "0";
},
function (k) {
var S = wdGet(), G = WORLDS.surface.g;
if (S.rank >= 1 && WD_SHARDS[k] && !S.shards[k]) {
var sh = WD_SHARDS[k], x = sh.at[0], z = sh.at[1], y = sfHeight(x, z), g = mmG(G, x, y, z), m = mmMat(sh.col, { glow: 1, op: 0.9 });
for (var i = 0; i < 5; i++) {
var c = mmMesh(new THREE.OctahedronGeometry(0.25 + i * 0.04, 0), m, (i - 2) * 0.18, 0.35 + (i % 2) * 0.2, (i % 3 - 1) * 0.15, g);
c.scale.set(0.5, 1.8, 0.5);
c.rotation.z = (i - 2) * 0.25;
}
var beam = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.4, 60, 10, 1, true), new THREE.MeshBasicMaterial({ color: sh.col, transparent: true, opacity: 0.08, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
beam.position.y = 30;
g.add(beam);
WD.shard = { k: k, x: x, z: z, g: g, beam: beam };
}
if (S.rank >= 2)
WD_GIFT_ORDER.forEach(function (gk) {
var Gf = WD_GIFTS[gk];
if (Gf.world !== k || S.gifts[gk])
return;
var x = Gf.at[0], z = Gf.at[1], y = sfHeight(x, z), g = mmG(G, x, y, z), ring = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.5, 40), new THREE.MeshBasicMaterial({ color: 0x8AC8FF, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.06;
g.add(ring);
mmSlab(g, mmMat(0xE8ECF0, { shine: 30, tex: "worn" }), 0.6, 1.6, 0.3, 0, 0.8, -2.6);
mmEll(g, mmMat(0x8AC8FF, { glow: 1 }), 0.12, 0.12, 0.12, 0, 1.75, -2.6, 8);
WD.marks.push({ g: gk, x: x, z: z, m: g });
});
if (k === "nharos")
wdNharosFoes();
},
function (gk) {
var Gf = WD_GIFTS[gk], G = WORLDS.surface.g, C = { x: Gf.at[0], z: Gf.at[1] }, T = { g: gk, t: 0, n: 0, need: 5, limit: 150 };
if (gk === "push") {
T.stones = [];
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2, x = C.x + Math.cos(a) * 4, z = C.z + Math.sin(a) * 4, m = mmEll(G, mmMat(0xC8CCD4, { shine: 20, tex: "worn" }), 0.6, 0.5, 0.6, x, sfHeight(x, z) + 0.5, z, 12);
T.stones.push({ x: x, z: z, vx: 0, vz: 0, m: m });
}
T.limit = 90;
}
if (gk === "leap") {
T.lamps = [];
for (var j = 0; j < 5; j++) {
var a2 = j / 5 * Math.PI * 2 + 0.3, x2 = C.x + Math.cos(a2) * (6 + j * 2.5), z2 = C.z + Math.sin(a2) * (6 + j * 2.5), y2 = sfHeight(x2, z2) + 5.5 + j * 0.5, lm = mmEll(G, mmMat(0xFFB060, { glow: 1 }), 0.35, 0.45, 0.35, x2, y2, z2, 10);
mmRod(G, mmMat(0x3A3634, {}), [x2, y2 + 0.4, z2], [x2, y2 + 14, z2], 0.04);
T.lamps.push({ x: x2, z: z2, y: y2, m: lm, leap: 1 });
}
}
if (gk === "sense") {
T.moths = [];
for (var k = 0; k < 5; k++) {
var a3 = k * 1.37, d3 = 14 + k * 9, x3 = C.x + Math.cos(a3) * d3, z3 = C.z + Math.sin(a3) * d3, m3 = mmGlow(G, 0xC8E8FF, 1.4, 0.9, x3, sfHeight(x3, z3) + 1.6, z3);
m3.visible = false;
T.moths.push({ x: x3, z: z3, m: m3 });
}
}
if (gk === "turn") {
T.need = 8;
T.limit = 120;
if (!WD.drawn)
wdDraw(true);
T.drone = wdSpawn("drone", C.x, C.z - 10, { alert: 1 });
}
if (gk === "calm") {
T.need = 3;
T.angry = [];
var who = [["Brakka's porter", "m"], ["A Tullik stall-keeper", "f"], ["A Hrovan sailor", "m"]];
for (var q = 0; q < 3; q++) {
var x4 = C.x + (q - 1) * 3, z4 = C.z - 4, fl = frFolkLook(q === 2 ? "skeldmar" : q === 1 ? "tullimar" : "aurelion", q), p = frFolk("wd_angry" + q, { title: "Angry", sex: who[q][1], look: fl.look, feats: fl.feats, scale: fl.scale, arms: fl.arms });
p.position.set(x4, sfHeight(x4, z4), z4);
p.rotation.y = (q - 1) * 1.2;
G.add(p);
var tag = wGlow(0xFF6A4A, 0.7, 0.8);
tag.position.set(x4, sfHeight(x4, z4) + 2.6 * (fl.scale || 1), z4);
G.add(tag);
T.angry.push({ x: x4, z: z4, g: p, tag: tag, name: who[q][0] });
}
}
if (gk === "pull") {
T.lamps = [];
for (var l = 0; l < 5; l++) {
var x5 = C.x + (l - 2) * 4, z5 = C.z - 16 - (l % 2) * 2, m5 = mmEll(G, mmMat(0xFFB060, { glow: 1 }), 0.3, 0.4, 0.3, x5, sfHeight(x5, z5) - 2.4, z5, 10);
T.lamps.push({ x: x5, z: z5, m: m5, lamp: 1 });
}
var cv = mmSlab(G, mmMat(0x5A7AA8, { shine: 60, op: 0.8 }), 24, 0.1, 5, C.x, sfHeight(C.x, C.z - 17) - 2.6, C.z - 17);
T.crev = cv;
}
if (gk === "mend") {
T.need = 4;
T.hurt = [];
for (var h = 0; h < 4; h++) {
var x6 = C.x + (h - 1.5) * 3.4, z6 = C.z - 3, fl6 = frFolkLook("ysolde", h), p6 = frFolk("wd_hurt" + h, { title: "Fisher", sex: h % 2 ? "f" : "m", look: fl6.look, feats: fl6.feats });
p6.position.set(x6, sfHeight(x6, z6) + 0.3, z6);
p6.rotation.x = -Math.PI / 2;
G.add(p6);
T.hurt.push({ x: x6, z: z6, g: p6 });
}
}
WD.trial = T;
sbSay("<b>The trial of " + sbEsc(Gf.name) + ".</b> " + sbEsc(Gf.trial) + " Use the gift with <b>" + Gf.kl + "</b>" + (sbTouch() ? " (the " + Gf.icon + " button)" : "") + ". You have " + Math.round(T.limit / 60 * 10) / 10 + " minutes.");
wdPadPaint();
},
function (dt) {
var T = WD.trial;
if (!T)
return;
T.t += dt;
var L = wdLocal(), Gf = WD_GIFTS[T.g];
if (T.stones) {
T.n = 0;
T.stones.forEach(function (s) { s.x += s.vx * dt; s.z += s.vz * dt; s.vx *= Math.pow(0.15, dt); s.vz *= Math.pow(0.15, dt); s.m.position.set(s.x, sfHeight(s.x, s.z) + 0.5, s.z); if (Math.hypot(s.x - Gf.at[0], s.z - Gf.at[1]) > 11)
T.n++; });
}
if (T.g === "leap")
T.lamps.forEach(function (s) { if (!s.got && Math.hypot(s.x - L.x, s.z - L.z) < 2 && Math.abs(camera.position.y - s.y) < 2.2) {
s.got = 1;
s.m.material = mmMat(0x8AC8FF, { glow: 1 });
T.n++;
sbTone(880 + T.n * 80, 0.1);
} });
if (T.moths) {
T.moths.forEach(function (s) { s.m.visible = WD.sense > 0 && !s.got; if (!s.got && WD.sense > 0 && Math.hypot(s.x - L.x, s.z - L.z) < 2.6) {
s.got = 1;
s.m.visible = false;
T.n++;
sbTone(988, 0.1);
} });
}
if (T.angry) {
T.n = T.angry.filter(function (a) { return a.done; }).length;
}
if (T.hurt) {
T.n = T.hurt.filter(function (a) { return a.done; }).length;
}
if (T.g === "pull")
T.lamps.forEach(function (s) { if (s.pulled && !s.got) {
var dx = L.x - s.x, dz = L.z - s.z, d = Math.hypot(dx, dz);
s.x += dx / d * 12 * dt;
s.z += dz / d * 12 * dt;
var y = Math.min(camera.position.y - 0.5, s.m.position.y + 10 * dt);
s.m.position.set(s.x, y, s.z);
if (d < 1.5) {
s.got = 1;
s.m.visible = false;
T.n++;
sbTone(880 + T.n * 80, 0.1);
}
} });
if (T.n >= T.need) {
wdTrialDone(T);
return;
}
if (T.t > T.limit) {
sbSay("<b>The trial of " + sbEsc(Gf.name) + " is not passed this time.</b> The quiet does not hurry. Step into the ring again when you are ready.");
wdTrialEnd(T);
}
},
function (T) {
(T.stones || []).concat(T.lamps || []).forEach(function (s) { if (s.m && s.m.parent)
s.m.parent.remove(s.m); });
(T.moths || []).forEach(function (s) { if (s.m.parent)
s.m.parent.remove(s.m); });
(T.angry || []).concat(T.hurt || []).forEach(function (a) { if (a.g && a.g.parent)
a.g.parent.remove(a.g); if (a.tag && a.tag.parent)
a.tag.parent.remove(a.tag); });
if (T.crev && T.crev.parent)
T.crev.parent.remove(T.crev);
if (T.drone) {
T.drone.gone = 1;
}
WD.trial = null;
wdPadPaint();
},
function (T) {
var S = wdGet(), Gf = WD_GIFTS[T.g];
S.gifts[T.g] = Date.now();
var n = Object.keys(S.gifts).length;
wdTrialEnd(T);
WD.marks.forEach(function (m) { if (m.g === T.g && m.m.parent)
m.m.parent.remove(m.m); });
if (n >= 4 && S.rank < 3)
S.rank = 3;
wdSave();
wdBal(3);
sbTone(660, 0.2);
setTimeout(function () { sbTone(880, 0.2); }, 180);
setTimeout(function () { sbTone(1175, 0.35); }, 360);
sbSay("<b>You have the gift of " + sbEsc(Gf.name) + ".</b> " + sbEsc(Gf.about) + " (" + Gf.kl + ")" + (n === 4 ? " <b>You are a Warden of the Order of the Quiet Star now.</b> Elder Warden Teodric will want to see you." : " " + n + " of 7 gifts."));
wdPadPaint();
},
function () {
var sh = WD.shard;
if (!sh)
return;
var S = wdGet();
S.shards[sh.k] = Date.now();
wdSave();
wdBal(1);
if (sh.g.parent)
sh.g.parent.remove(sh.g);
WD.shard = null;
worldPrompt(null);
sbTone(784, 0.2);
setTimeout(function () { sbTone(1046, 0.3); }, 160);
sbSay("<b>A " + WD_SHARDS[sh.k].name + " heart-shard.</b> It is warm in your hand and hums very quietly. " + (S.blade ? "You can change your blade's shard at Aster Still." : "Take it to Warden Corvin on Aster Still to build your starblade."));
},
function () {
if (!WD.bar || WD.bar.style.display === "none")
return;
var hp = WD.bar.querySelector(".hp i");
if (hp)
hp.style.width = Math.round(WD.hp) + "%";
var t = WD.bar.querySelector("[data-k='trial']");
if (t && WD.trial)
t.textContent = WD_GIFTS[WD.trial.g].name + ": " + WD.trial.n + " of " + WD.trial.need + " · " + Math.max(0, Math.ceil(WD.trial.limit - WD.trial.t)) + " s";
},
function (site) {
frStandAdd("wardens", "meet");
var S = wdGet(), fns = {}, gifts = Object.keys(S.gifts).length, shards = Object.keys(S.shards);
var bal = S.bal || 0, balW = bal >= 40 ? "the Quiet is strong in you" : bal >= 10 ? "the Quiet grows in you" : bal > -10 ? "still, and listening" : bal > -40 ? "the Hollow tugs at you" : "the Hollow is loud in you";
var h = worldFacts(site.talk.name, "Eldest of the Order of the Quiet Star", [["You are", S.rank ? "a " + wdRank() : "not of the Order"], ["Gifts", gifts + " of 7"], ["Heart-shards", shards.length ? shards.map(function (k) { return WD_SHARDS[k].name; }).join(", ") : "none yet"], ["Your balance", balW]], []);
h += worldBtn("talk", "💬 Talk with him", "He answers in his own words");
if (bal <= -40)
h += "<div style='margin:6px 0;opacity:.85'>\"The Hollow is loud in you. I will not teach you until you have made amends. Go and help people who need it. Then come back.\"</div>";
else {
if (!S.rank)
h += worldBtn("join", "✦ Ask to join the Order", "Become a Seeker");
if (S.rank >= 1 && !S.blade)
h += worldBtn("blade", "⚔ Build your starblade", shards.length ? "With Warden Corvin, at the Lantern spire" : "You need a heart-shard first");
if (S.blade)
h += worldBtn("blade", "⚔ Your starblade", "Change the heart-shard that colours it");
if (S.rank >= 2)
h += worldBtn("trials", "◎ The trials of the gifts", "Seven gifts, each learned on a different world");
}
var P = FR_PEOPLES.wardens, done = frStandGet()._log && frStandGet()._log._wardens_task;
if (!done) {
h += worldBtn("task", "★ " + sbEsc(P.task.name), sbEsc(P.task.say));
if (frLogged(P.task.need))
h += worldBtn("give", "✓ Tell him what you found", "From your Star Log");
}
fns.talk = function () { worldCard(null); wTalk(site.talk); };
fns.join = function () { S.rank = 1; wdSave(); worldCard(null); wdBal(2); sbSay("<b>You are a Seeker of the Order of the Quiet Star.</b> Teodric: \"Every Warden builds their own blade around a heart-shard. They are hidden on Veyar, Sereth Vale, Dunmarrow, Ysolde, Isk and Aurelion: look for a thin light rising from the ground. Bring one to Corvin.\""); wdPlace(SF.k); };
fns.blade = function () { wdBladeCard(); };
fns.trials = function () { wdTrialsCard(); };
fns.task = function () { frTaskStart("wardens"); };
fns.give = function () { worldCard(null); frTaskDone("wardens"); };
worldCard(h, fns);
},
function () {
var S = wdGet(), fns = {}, have = Object.keys(S.shards);
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚔ Your starblade</div><div style='opacity:.85'>Warden Corvin sets your heart-shard into a hilt you shape yourself. The shard chooses the colour.</div>";
if (!have.length)
h += "<div style='margin-top:8px'>You have no heart-shard yet. They are hidden on Veyar, Sereth Vale, Dunmarrow, Ysolde, Isk and Aurelion: look for a thin light rising from the ground (Sense makes it bright).</div>";
have.forEach(function (k) {
var sh = WD_SHARDS[k];
h += worldBtn("s-" + k, "<span style='color:#" + ("000000" + sh.col.toString(16)).slice(-6) + "'>◆</span> The " + sh.name + " shard", "Found on " + sh.from + (S.blade === sh.col ? " · in your blade now" : ""));
fns["s-" + k] = function () {
var first = !S.blade;
S.blade = sh.col;
if (S.rank < 2)
S.rank = 2;
wdSave();
worldCard(null);
sbSay(first ? "<b>You build your starblade.</b> Corvin watches as you fit the " + sh.name + " shard, close the hilt, and press the stud. The blade hums into being, " + sh.name + " and steady. \"Welcome, Kindled.\" <b>X</b> to draw it, on the training floors here, and anywhere past the Far Gate where blades are allowed." : "Your blade burns " + sh.name + " now.");
wdPlace(SF.k);
wdPadPaint();
};
});
worldCard(h, fns);
},
function () {
var S = wdGet(), h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>◎ The seven gifts of the Quiet</div><div style='opacity:.85'>Each is learned by a trial on a different world. Look for a ring of light on the ground there.</div>";
WD_GIFT_ORDER.forEach(function (g) {
var G = WD_GIFTS[g], b = gxBody(G.world) || {};
var where = (FR_TOWN[G.world] && G.world) ? ({ aster: "Aster Still", kharn: "Kharn's Anvil", sereth: "Sereth Vale", dunmarrow: "Dunmarrow, in the Ring", aurelion: "Aurelion", isk: "Isk", ysolde: "Ysolde" }[G.world]) : G.world;
h += "<div style='margin:6px 0;font-size:13px'>" + (S.gifts[g] ? "✓ " : "○ ") + "<b>" + G.icon + " " + sbEsc(G.name) + "</b> (" + G.kl + ") · " + sbEsc(where) + "<br><span style='opacity:.8'>" + sbEsc(G.about) + (S.gifts[g] ? "" : " Trial: " + sbEsc(G.trial)) + "</span></div>";
});
worldCard(h, {});
},
function (cb) {
if (sbSigned() && !SB.missing && Date.now() - SEN.at > 60000) {
SEN.at = Date.now();
sbRpc("senate_now", {}).then(function (o) { if (o && o.ok) {
SEN.now = o;
if (o.passed && o.passed.drifters && typeof gxLearn === "function")
gxLearn("wanderers");
} if (cb)
cb(); }).catch(function () { if (cb)
cb(); });
}
else if (cb)
cb();
},
function () {
senRefresh(function () {
var N = SEN.now, M = N && N.motion ? { k: N.motion, closes: Date.parse(N.closes) || 0, yes: +N.yes || 0, no: +N.no || 0, mine: N.mine, keeper: N.keeper } : senLocalMotion();
var m = GX_MOTION_BY[M.k] || GX_MOTIONS[0], seats = senSeats(m.k), env = senEnvoyOf(), fns = {};
if (M.local) {
var lv = senLocal().votes[m.k];
M.mine = lv == null ? null : lv;
M.yes = lv === true ? 1 : 0;
M.no = lv === false ? 1 : 0;
}
var left = Math.max(0, M.closes - Date.now()), hrs = Math.round(left / 36e5);
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏛 The floor of the Concord of a Thousand Suns</div>";
h += "<div style='margin:6px 0;padding:8px;border:1px solid rgba(255,220,150,.35);border-radius:10px'><b>Before the Senate:</b> " + sbEsc(m.name) + "<br><span style='opacity:.85'>" + sbEsc(m.about) + "</span><br><span style='opacity:.75;font-size:12px'>If it passes: " + sbEsc(m.effect) + "</span></div>";
h += "<div style='font-size:13px'>Senators: <b>" + seats.y + " for</b>, <b>" + seats.n + " against</b>, the rest undecided. Dreamer envoys (" + ((M.yes || 0) + (M.no || 0)) + " voted): <b>" + (M.yes || 0) + " for</b>, <b>" + (M.no || 0) + " against</b>; together they cast three seats. The vote closes " + (hrs > 48 ? "in about " + Math.round(hrs / 24) + " days" : hrs > 1 ? "in about " + hrs + " hours" : "within the hour") + (M.keeper ? " (called by the Keeper)" : "") + ".</div>";
if (env.length) {
h += "<div style='margin-top:6px;font-size:13px'>You are an <b>Envoy</b> of " + env.map(function (p) { return sbEsc(FR_PEOPLES[p].name); }).join(", ") + ".</div>";
if (M.mine == null) {
h += worldBtn("yes", "✔ Vote for", "Your voice joins the dreamers' bloc");
h += worldBtn("no", "✘ Vote against", "Your voice joins the dreamers' bloc");
}
else
h += "<div style='margin-top:4px'>You voted <b>" + (M.mine ? "for" : "against") + "</b>.</div>";
}
else
h += "<div style='margin-top:6px;font-size:13px;opacity:.85'>You watch from the gallery. Become an ally of any people past the Far Gate and they will name you their Envoy, with a vote here.</div>";
if (senHonoured() >= 3)
h += worldBtn("propose", "📜 Bring a motion", "Three peoples honour you: you may put the next motion before the Senate");
var passed = GX_MOTIONS.filter(function (x) { return gxPassed(x.k); });
if (passed.length) {
h += "<div style='margin-top:8px;font-weight:600'>The law of the Concord now</div>";
passed.forEach(function (x) { h += "<div style='font-size:12.5px'>✓ " + sbEsc(x.name) + ": " + sbEsc(x.effect) + "</div>"; });
}
fns.yes = function () { senVote(m.k, true); };
fns.no = function () { senVote(m.k, false); };
fns.propose = function () { senProposeCard(); };
worldCard(h, fns);
});
},
function (k, yes) {
worldCard(null);
if (sbSigned() && !SB.missing && SEN.now && SEN.now.motion) {
sbRpc("senate_vote", { p_motion: k, p_yes: yes }).then(function (o) { SEN.at = 0; sbSay("<b>Your vote is cast.</b> " + sbEsc((o && o.say) || "")); }).catch(function () { sbSay("The vote could not be recorded just now."); });
}
else {
var L = senLocal();
L.votes[k] = yes;
var s = senSeats(k), y = s.y + (yes ? 3 : 0), n = s.n + (yes ? 0 : 3);
if (y > n)
L.passed[k] = Date.now();
senLocalSave();
sbSay("<b>The Senate votes.</b> " + y + " for, " + n + " against: the motion " + (y > n ? "<b>passes</b>. " + sbEsc(GX_MOTION_BY[k].effect) : "<b>fails</b>."));
}
if (typeof wdBal === "function" && wdGet().rank)
wdBal(1);
},
function () {
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📜 Bring a motion</div><div style='opacity:.85'>Your motion goes before the Senate next.</div>";
GX_MOTIONS.forEach(function (m) {
if (gxPassed(m.k))
return;
h += worldBtn("p-" + m.k, sbEsc(m.name), sbEsc(m.effect));
fns["p-" + m.k] = function () {
worldCard(null);
if (sbSigned() && !SB.missing)
sbRpc("senate_propose", { p_motion: m.k }).then(function (o) { SEN.at = 0; sbSay(sbEsc((o && o.say) || "Your motion is set before the Senate next.")); }).catch(function () { });
else
sbSay("Your motion is set before the Senate next.");
};
});
worldCard(h, fns);
},
function (F, i, col, gold, lit) {
var cl = mmMat(col, { shine: 25 }), dark = mmMat(new THREE.Color(col).multiplyScalar(0.45).getHex(), { shine: 30 }), cush = mmMat(new THREE.Color(col).lerp(new THREE.Color(0xFFFFFF), 0.25).getHex(), {}), T = mmG(F, 0, 0, -0.85);
mmSlab(T, dark, 1.5, 0.18, 1.1, 0, 0.09, 0.15);
mmSlab(T, gold, 1.3, 0.45, 0.9, 0, 0.4, 0.15);
mmSlab(T, cush, 1.1, 0.16, 0.8, 0, 0.7, 0.2);
[-1, 1].forEach(function (s) { mmSlab(T, dark, 0.18, 0.5, 0.9, s * 0.66, 0.95, 0.2); mmEll(T, gold, 0.13, 0.13, 0.13, s * 0.66, 1.24, 0.62, 8); mmCyl(T, gold, 0.06, 0.06, 0.5, s * 0.66, 0.45, 0.62, 0, 0, 0, 6); });
mmSlab(T, dark, 1.3, 2.0, 0.2, 0, 1.6, -0.28);
mmSlab(T, cush, 1.0, 1.4, 0.06, 0, 1.55, -0.16);
var k = i % 5, top = 2.6;
if (k === 0) {
mmCyl(T, dark, 0.65, 0.65, 0.2, 0, 2.6, -0.28, Math.PI / 2, 0, 0, 16);
mmTorus(T, gold, 0.65, 0.05, 0, 2.6, -0.17, 0, 0, 0);
top = 3.3;
}
else if (k === 1) {
mmCone(T, dark, 0.6, 1.6, 0, 3.4, -0.28);
mmCone(T, gold, 0.12, 0.5, 0, 4.4, -0.28);
top = 4.6;
}
else if (k === 2) {
for (var b = 0; b < 7; b++) {
var a = (b - 3) * 0.32;
mmSlab(T, b % 2 ? gold : dark, 0.16, 1.3, 0.08, Math.sin(a) * 0.55, 2.6 + Math.cos(a) * 0.55, -0.3).rotation.z = -a;
}
top = 3.6;
}
else if (k === 3) {
[-1, 1].forEach(function (s) { mmFlat(T, dark, [[0, 0], [0.9, 0.3], [1.2, 1.3], [0.5, 1.0], [0, 1.2]], 0.08, s * 0.55, 2.2, -0.26, 0, s > 0 ? 0 : Math.PI, 0); });
mmEll(T, gold, 0.2, 0.2, 0.2, 0, 2.95, -0.2, 10);
top = 3.3;
}
else {
mmTorus(T, gold, 0.6, 0.07, 0, 2.9, -0.28, 0, 0, 0);
mmTorus(T, dark, 0.42, 0.05, 0, 2.9, -0.28, 0, 0, 0);
top = 3.5;
}
mmEll(T, lit, 0.14, 0.14, 0.05, 0, 2.25, -0.14, 10);
mmEll(T, mmMat(col, { glow: 1 }), 0.09, 0.09, 0.06, 0, 2.25, -0.11, 10);
if (!sbLite())
mmGlow(T, col, 1.2, 0.3, 0, 2.25, -0.05);
mmEll(T, gold, 0.1, 0.1, 0.1, -0.6, top - 0.6, -0.28, 8);
mmEll(T, gold, 0.1, 0.1, 0.1, 0.6, top - 0.6, -0.28, 8);
var L = mmG(F, 0, 0, 1.15);
mmCyl(L, gold, 0.1, 0.16, 0.95, 0, 0.48, 0, 0, 0, 0, 8);
mmSlab(L, dark, 0.7, 0.06, 0.45, 0, 1.0, 0).rotation.x = -0.35;
mmSlab(L, cl, 0.72, 0.2, 0.04, 0, 0.88, 0.22);
},
function (P) {
worldPrompt(null);
sbSay("<b>You call him out.</b> The chamber falls silent. Under the Quiet, Venn burns like a coal. He smiles. \"Clever. Too late.\" He touches his collar, and the great doors burst open: <b>the Hollow!</b>");
if (P.who.parent)
P.who.parent.remove(P.who);
SF.hlVennGone = 1;
var cx = SF.gxSenate.x, cz = SF.gxSenate.z;
SF.hlFight = { done: 0 };
setTimeout(function () {
for (var i = 0; i < 6; i++) {
wdSpawn(i % 3 === 2 ? "raider" : "acolyte", cx + (i - 2.5) * 2.2, cz + 24 - (i % 2) * 2, { alert: 1 });
}
if (wdGet().blade && !WD.drawn)
wdDraw(true);
sbSay("<b>The city guard:</b> \"Wardens! Blades out, the law allows it now!\"");
}, 1500);
},
function (F) {
if (!F || !F.g || F.hl)
return;
F.hl = 1;
F.g.traverse(function (o) { if (o.isMesh && o.material && !(o.userData && o.userData.sbFlame)) {
var m = o.material.clone();
if (m.color)
m.color.multiplyScalar(0.3);
if (m.emissive) {
m.emissive.setHex(0x5A1A08);
}
o.material = m;
} });
F.name = F.name && F.name.indexOf("Hollow") < 0 ? F.name.replace(/raider/i, "Hollow") : F.name;
},
function (o) {
sbStrike({ why: o.why, ahead: o.ahead || 700, n: o.n || 4, gunship: true, noAllies: o.noAllies });
var B = SB.battle;
if (!B)
return;
B.foeName = "The Hollow";
B.hl = o.why;
for (var i = 0; i < (o.big || 0); i++)
sbSpawn("marauder", B.c.clone().add(new THREE.Vector3((i - 0.5) * 260, 40, -200)), "foe");
for (var j = 0; j < (o.more || 0); j++)
sbSpawn(j % 3 ? "dart" : "gunship", B.c.clone().add(new THREE.Vector3((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 500)), "foe");
SB.foes.forEach(hlTint);
B.n = SB.foes.length;
sbSay("<b>The Hollow!</b> " + SB.foes.length + " black ships with ember-lit wings come out of the dark. " + (o.say || ""));
},
function (al) {
var kinds = { kharn: "longship", hrovan: "longship", veyari: "skiff" };
al.slice(0, 6).forEach(function (p, i) {
for (var j = 0; j < 2; j++) {
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((i - 2.5) * 120, 40 + j * 30, 160 + j * 60)), "ally", FR_PEOPLES[p].name.replace(/^the /, "") + " ship");
if (A && kinds[p]) {
var G = sbG();
if (A.g.parent)
A.g.parent.remove(A.g);
A.g = frAllyShip(kinds[p]);
A.g.position.copy(A.p);
G.add(A.g);
A.turrets = [];
}
if (A && p === "wardens") {
var G2 = sbG();
if (A.g.parent)
A.g.parent.remove(A.g);
A.g = sbFit(gxBladeShip(new THREE.Group(), wdGet().blade || 0x8AC8FF), 15);
A.g.position.copy(A.p);
G2.add(A.g);
A.turrets = [];
}
}
});
if (SB.battle)
SB.battle.allies = 1;
},
function (F) {
setTimeout(function () {
var S = wdGet(), canRedeem = S.gifts.calm && (S.bal || 0) >= 10, fns = {};
var h = worldFacts("Vael Ashkarran yields", "The Hollow Lord, on his knees in the ash", [], ["His ember blade gutters out. \"Finish it,\" he says. \"That is what I would do.\"", "A Warden never strikes one who yields."]);
h += worldBtn("redeem", "☮ Bring him back to the Quiet", canRedeem ? "Speak to him with Calm Voice" : "You need the gift of Calm Voice and the Quiet strong in you");
h += worldBtn("hand", "⚖ Hand him to the Concord", "The Senate will judge him fairly");
fns.redeem = function () { if (!canRedeem) {
sbSay("You reach for the Quiet, but it is not strong enough in you yet. Learn Calm Voice on Aurelion, and keep the peace.");
return;
} worldCard(null); hlEnd("redeemed"); };
fns.hand = function () { worldCard(null); hlEnd("judged"); };
worldCard(h, fns);
}, 1500);
},
function (how) {
var S = wdGet();
HOL.s.end = how;
hlTo(9);
if (Object.keys(S.gifts).length >= 7 && S.rank < 4) {
S.rank = 4;
}
wdSave();
wdBal(how === "redeemed" ? 10 : 4);
sbSay(how === "redeemed" ? "<b>You speak to him quietly</b>, the way Ilvane once did. For a long time he does not move. Then Vael Ashkarran weeps, and his ember blade goes cold for ever. \"Take me home,\" he says. \"Take me to her.\"" : "<b>Concord cutters land in the ash.</b> Vael Ashkarran is led away in chains to be judged by the Senate. As he goes he looks back at you. \"She chose well,\" he says.");
setTimeout(function () { sbSay("<b>The Hollow is broken.</b> The raiders lose their masters, the Senate is safe, and every people past the Far Gate knows your name." + (S.rank >= 4 ? " <b>Elder Warden Teodric names you an Elder Warden of the Order of the Quiet Star.</b>" : " When you have all seven gifts, Teodric will name you an Elder Warden.")); Object.keys(FR_PEOPLES).forEach(function (p) { if (frStand(p) > 0)
frStandAdd(p, "task"); }); }, 6000);
},
function () {
return srTex("bark", 256, 512, function (x, W, H) {
var R = wRand(31);
x.fillStyle = "#4E3E2C";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 46; i++) {
var px = R() * W, wd = 3 + R() * 9, sh = R() < 0.5 ? "rgba(30,22,14," : "rgba(110,96,78,";
x.strokeStyle = sh + (0.35 + R() * 0.4) + ")";
x.lineWidth = wd;
x.beginPath();
x.moveTo(px, 0);
for (var y = 0; y <= H; y += 24)
x.lineTo(px + Math.sin(y * 0.03 + i) * 4 + (R() - 0.5) * 3, y);
x.stroke();
}
for (var j = 0; j < 90; j++) {
x.fillStyle = "rgba(" + (140 + R() * 40 | 0) + "," + (150 + R() * 40 | 0) + "," + (120 + R() * 30 | 0) + "," + (0.12 + R() * 0.18) + ")";
x.beginPath();
x.ellipse(R() * W, R() * H, 1 + R() * 3, 1 + R() * 5, 0, 0, 7);
x.fill();
}
var g = x.createLinearGradient(0, H, 0, H * 0.9);
g.addColorStop(0, "rgba(70,110,40,.95)");
g.addColorStop(1, "rgba(70,110,40,0)");
x.fillStyle = g;
x.fillRect(0, H * 0.9, W, H * 0.1);
for (var m = 0; m < 120; m++) {
x.fillStyle = "rgba(80," + (120 + R() * 40 | 0) + ",46," + (0.3 + R() * 0.5) + ")";
x.beginPath();
x.ellipse(R() * W, H - R() * R() * H * 0.22, 3 + R() * 10, 2 + R() * 6, 0, 0, 7);
x.fill();
}
}, [2, 1]);
},
function () {
return srTex("frond", 64, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "#3A5A22";
x.lineWidth = 3;
x.beginPath();
x.moveTo(W / 2, H);
x.lineTo(W / 2, 4);
x.stroke();
for (var y = H - 10; y > 8; y -= 9) {
var t = y / H, L = (W / 2 - 3) * Math.sin(Math.min(1, (1 - t) * 1.4 + 0.15) * Math.PI * 0.9);
x.fillStyle = ["#4A7A2E", "#5A8A34", "#3E6A28"][(y / 9 | 0) % 3];
[-1, 1].forEach(function (s) { x.beginPath(); x.moveTo(W / 2, y); x.quadraticCurveTo(W / 2 + s * L * 0.6, y - 7, W / 2 + s * L, y - 10); x.quadraticCurveTo(W / 2 + s * L * 0.5, y - 2, W / 2, y + 2); x.fill(); });
}
});
},
function () {
return srTex("canopy", 512, 512, function (x, W, H) {
var R = wRand(55);
x.clearRect(0, 0, W, H);
for (var i = 0; i < 2600; i++) {
var c = ["#1E3A18", "#28461C", "#1A3014", "#335A22", "#3E6A2A"][i % 5];
x.fillStyle = c;
x.beginPath();
x.ellipse(R() * W, R() * H, 3 + R() * 9, 2 + R() * 6, R() * 3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "destination-out";
for (var j = 0; j < 160; j++) {
x.beginPath();
x.ellipse(R() * W, R() * H, 1.5 + R() * 7, 1 + R() * 5, R() * 3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "source-over";
}, [14, 14]);
},
function () {
return srTex("soft", 128, 128, function (x, W, H) {
var R = wRand(9);
x.clearRect(0, 0, W, H);
for (var i = 0; i < 40; i++) {
var px = R() * W, py = R() * H, r = 10 + R() * 30, g = x.createRadialGradient(px, py, 0, px, py, r);
g.addColorStop(0, "rgba(255,255,255,.35)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}
}, [3, 3]);
},
function (G, geo, mat, list, col) {
if (!list.length)
return null;
var M = new THREE.InstancedMesh(geo, mat, list.length), o = new THREE.Object3D(), c = new THREE.Color();
list.forEach(function (q, i) { o.position.set(q[0], q[1], q[2]); o.rotation.set(q[3] || 0, q[4] || 0, q[5] || 0); o.scale.set(q[6] || 1, q[7] || q[6] || 1, q[8] || q[6] || 1); o.updateMatrix(); M.setMatrixAt(i, o.matrix); if (col && q[9] != null) {
c.setHex(q[9]);
M.setColorAt(i, c);
} });
M.instanceMatrix.needsUpdate = true;
if (M.instanceColor)
M.instanceColor.needsUpdate = true;
M.frustumCulled = false;
G.add(M);
return M;
},
function (G, C, R, sol, hy) {
var lite = sbLite(), bark = new THREE.MeshLambertMaterial({ map: srBarkTex() }), wood = mmMat(0x8A6A3A, { tex: "worn" }), rope = mmMat(0xC8B080, {}), moss = new THREE.MeshLambertMaterial({ color: 0x4A7A2E });
var leaf = [mmMat(0x2A5A22, { shine: 6 }), mmMat(0x335F26, { shine: 6 }), mmMat(0x3E6E2A, { shine: 6 })];
function brook(x) { return 64 + Math.sin(x / 70) * 26 + Math.sin(x / 23) * 6; }
function clear(x, z, pad) { return Math.abs(z - brook(x)) < 7 + (pad || 0) || Math.hypot(x - 8, z - 6) < 26 + (pad || 0) || Math.hypot(x - C[0], z - C[1]) < 36 + (pad || 0); }
var prof = [[2.5, -2], [2.4, 0], [1.7, 2], [1.3, 5], [1.08, 12], [1, 26], [0.9, 80], [0.72, 160], [0.55, 240], [0.42, 300]].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
var trunkG = new THREE.LatheGeometry(prof, lite ? 10 : 16), sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.lineTo(3.2, 0);
sh.quadraticCurveTo(1.2, 0.6, 0, 7);
sh.lineTo(0, 0);
var finG = new THREE.ExtrudeGeometry(sh, { depth: 0.7, bevelEnabled: false });
finG.translate(0, 0, -0.35);
var trees = [], tl = [], fins = [], clumps = [], vines = [], N = lite ? 34 : 90;
for (var i = 0; i < N; i++) {
var near = i < 8, a = near ? i / 8 * Math.PI * 2 + 0.3 : R() * Math.PI * 2, d = near ? 50 + R() * 16 : 60 + Math.sqrt(R()) * 780, x = (near ? C[0] : 0) + Math.cos(a) * d, z = (near ? C[1] : 0) + Math.sin(a) * d;
if (!near && (clear(x, z, 8) || trees.some(function (t) { return Math.hypot(t.x - x, t.z - z) < t.r * 3 + 16; })))
continue;
var r = near ? 5.5 + R() * 1.5 : 4 + R() * 6, h = (260 + R() * 240) / 300, y = hy(x, z), ry = R() * 6.28;
tl.push([x, y, z, 0, ry, 0, r, h, r]);
trees.push({ x: x, z: z, r: r, y: y, near: near });
for (var f = 0; f < (lite ? 3 : 5); f++) {
var fa = ry + f / 5 * Math.PI * 2 + R() * 0.4, rr = r * 0.95;
fins.push([x + Math.cos(fa) * rr, y - 0.3, z + Math.sin(fa) * rr, 0, -fa, 0, r * 0.55 * (0.8 + R() * 0.5), r * 0.55 * (0.8 + R() * 0.6), 1 + r * 0.08]);
}
sol.push({ x: x, z: z, r: r * 1.75 });
if (!lite || i % 2 === 0)
for (var c = 0; c < 3; c++)
clumps.push([x + (R() - 0.5) * r * 6, y + h * 300 * (0.66 + c * 0.11), z + (R() - 0.5) * r * 6, 0, R() * 6, 0, r * 6, r * 2.2, r * 6, [0x26501E, 0x2E5A22, 0x3A6A2A][(i + c) % 3]]);
if (!lite && R() < 0.6)
for (var v = 0; v < 4; v++) {
var va = R() * 6.28, L = 30 + R() * 70;
vines.push([x + Math.cos(va) * (r * 1.1 + 2 + R() * 6), y + 20 + L / 2 + R() * 50, z + Math.sin(va) * (r * 1.1 + 2 + R() * 6), 0, 0, 0, 1, L, 1, [0x3A5A28, 0x4A6A30, 0x6A7A50][v % 3]]);
}
}
var fm = bark.map.clone();
fm.needsUpdate = true;
fm.repeat.set(0.35, 0.14);
srInst(G, trunkG, bark, tl);
srInst(G, finG, new THREE.MeshLambertMaterial({ map: fm }), fins);
srInst(G, new THREE.SphereGeometry(1, lite ? 8 : 12, lite ? 6 : 8), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), clumps, true);
srInst(G, new THREE.CylinderGeometry(0.05, 0.18, 1, 4, 1, true), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }), vines, true);
trees.filter(function (t) { return t.near; }).forEach(function (T, i) {
var t = mmG(G, T.x, T.y, T.z), py = 14 + (i % 3) * 6, r = T.r, pr = r * 1.04 + 5;
mmCyl(t, wood, pr, pr, 0.6, 0, py, 0, 0, 0, 0, 20);
mmTorus(t, rope, pr, 0.12, 0, py + 1.1, 0, Math.PI / 2, 0, 0);
for (var b = 0; b < 10; b++) {
var ba = b / 10 * Math.PI * 2;
mmCyl(t, wood, 0.1, 0.1, 1.1, Math.cos(ba) * pr, py + 0.6, Math.sin(ba) * pr, 0, 0, 0, 5);
mmRod(t, wood, [Math.cos(ba) * pr * 0.9, py - 0.2, Math.sin(ba) * pr * 0.9], [Math.cos(ba) * r * 1.02, py - 4, Math.sin(ba) * r * 1.02], 0.14);
}
var hs = mmG(t, r + 2.6, py + 0.3, 0);
mmCyl(hs, mmMat(0x6A5034, { tex: "worn" }), 2, 2.2, 3, 0, 1.5, 0, 0, 0, 0, 12);
mmCone(hs, leaf[i % 3], 2.9, 2.6, 0, 4.3, 0, 0, 0, 0, 12);
mmSlab(hs, mmMat(0x2A1A0E, {}), 0.9, 1.8, 0.1, 0, 0.9, 2.15);
mmGlow(hs, 0xFFD890, 1.6, 0.35, 0, 1.2, 2.3);
mmGlow(t, 0xC8FFB0, 3, 0.45, -(r + 3), py + 2.4, 0);
mmEll(t, mmMat(0xC8FFB0, { glow: 1 }), 0.35, 0.45, 0.35, -(r + 3), py + 2.4, 0, 10);
for (var s = 0; s < Math.floor(py / 0.8); s++) {
var sa = s * 0.42, sr = r * (s < 4 ? 1.6 : 1.12) + 1.1;
mmSlab(t, wood, 2.2, 0.15, 0.9, Math.cos(sa) * sr, s * 0.8, Math.sin(sa) * sr).rotation.y = -sa;
}
T.py = py;
});
var nr = trees.filter(function (t) { return t.near; });
for (var b2 = 0; b2 < nr.length; b2++) {
var A = nr[b2], B = nr[(b2 + 1) % nr.length], ya = A.y + A.py, yb = B.y + B.py;
for (var k = 0; k <= 10; k++) {
var u = k / 10, sag = Math.sin(u * Math.PI) * 1.6, px = A.x + (B.x - A.x) * u, pz = A.z + (B.z - A.z) * u, pyy = ya + (yb - ya) * u - sag + 0.4;
if (u > 0.12 && u < 0.88)
mmSlab(G, wood, 1.4, 0.1, 0.5, px, pyy, pz).rotation.y = -Math.atan2(B.z - A.z, B.x - A.x);
}
mmRod(G, rope, [A.x, ya + 1.6, A.z], [B.x, yb + 1.6, B.z], 0.06);
}
for (var st = 0; st < 12; st++) {
var sa2 = st / 12 * Math.PI * 2, sx = C[0] + Math.cos(sa2) * 14, sz = C[1] - 20 + Math.sin(sa2) * 14, sy = hy(sx, sz), sg = mmG(G, sx, sy, sz, 0, -sa2, 0);
mmSlab(sg, mmMat(0x6A7268, { tex: "worn" }), 1.4, 3.6 + (st % 3) * 0.6, 0.8, 0, 1.8, 0);
mmEll(sg, moss, 0.8, 0.25, 0.5, 0, 3.7 + (st % 3) * 0.6, 0, 8);
sol.push({ x: sx, z: sz, r: 0.9 });
}
var fire = mmG(G, C[0], hy(C[0], C[1] - 20), C[1] - 20);
mmCyl(fire, mmMat(0x5A5A50, { tex: "worn" }), 1.6, 1.8, 0.5, 0, 0.25, 0, 0, 0, 0, 14);
mmCone(fire, mmMat(0x9AFFC0, { glow: 1, op: 0.75 }), 0.9, 2.2, 0, 1.6, 0);
mmGlow(fire, 0x9AFFC0, 6, 0.5, 0, 1.6, 0);
for (var l = 0; l < (lite ? 3 : 7); l++) {
var la = R() * 6.28, ld = 90 + R() * 420, lx = Math.cos(la) * ld, lz = Math.sin(la) * ld;
if (clear(lx, lz, 20))
continue;
var len = 40 + R() * 40, lr = 3 + R() * 2, ry2 = R() * 6.28, lg = mmG(G, lx, hy(lx, lz) + lr * 0.7, lz, 0, ry2, 0);
var tr = new THREE.Mesh(new THREE.CylinderGeometry(lr, lr * 1.1, len, 14, 1), bark);
tr.rotation.z = Math.PI / 2;
lg.add(tr);
mmEll(lg, moss, len * 0.48, lr * 0.35, lr * 0.8, 0, lr * 0.85, 0, 12);
mmCyl(lg, mmMat(0x5A4430, { tex: "worn" }), lr * 0.9, lr * 0.9, 0.3, len / 2 + 0.1, 0, 0, 0, 0, Math.PI / 2, 14);
for (var q = -2; q <= 2; q++)
sol.push({ x: lx + Math.cos(-ry2) * q * len / 5, z: lz + Math.sin(-ry2) * q * len / 5, r: lr + 0.6 });
}
var frond = new THREE.MeshLambertMaterial({ map: srFrondTex(), alphaTest: 0.5, side: THREE.DoubleSide }), fg = new THREE.PlaneGeometry(0.9, 2.6);
fg.translate(0, 1.3, 0);
var fr = [], mounds = [], stems = [], caps = [], flowers = [], NF = lite ? 260 : 1100;
for (var n = 0; n < NF; n++) {
var fa0 = R() * 6.28, fd0 = 8 + Math.pow(R(), 1.6) * 620, fx = Math.cos(fa0) * fd0, fz = Math.sin(fa0) * fd0 - 30;
if (Math.abs(fz - brook(fx)) < 6 || Math.hypot(fx - 8, fz - 6) < 9 || Math.hypot(fx - C[0], fz - C[1] + 20) < 17)
continue;
var fy = hy(fx, fz), s2 = 0.7 + R() * 1.1, fa2 = R() * 6.28;
if (trees.some(function (t) { return Math.hypot(t.x - fx, t.z - fz) < t.r * 1.6; }))
continue;
for (var e = 0; e < (lite ? 5 : 7); e++) {
var ea = fa2 + e / 7 * Math.PI * 2;
fr.push([fx, fy, fz, -0.85 + R() * 0.25, ea, 0, s2, s2, s2]);
}
if (n % 3 === 0)
mounds.push([fx + (R() - 0.5) * 4, fy - 0.2, fz + (R() - 0.5) * 4, 0, R() * 6, 0, 1 + R() * 2, 0.4 + R() * 0.5, 1 + R() * 2, [0x3A6A26, 0x4A7A2E, 0x2E5A20][n % 3]]);
}
trees.forEach(function (T, i) {
if (lite && i % 2)
return;
for (var m = 0; m < 6; m++) {
var ma = R() * 6.28, md = T.r * 2.4 + R() * 4, mx = T.x + Math.cos(ma) * md, mz = T.z + Math.sin(ma) * md, my = hy(mx, mz), ms = 0.4 + R() * 0.9, glow = R() < 0.4;
stems.push([mx, my, mz, 0, 0, 0, ms, ms, ms]);
caps.push([mx, my + ms * 0.9, mz, 0, 0, 0, ms * 0.55, ms * 0.28, ms * 0.55, glow ? 0x7AF0E0 : [0xC8A070, 0xA8603A, 0xE8D8B8][m % 3]]);
}
});
for (var w = 0; w < (lite ? 120 : 420); w++) {
var wa0 = R() * 6.28, wd0 = 6 + Math.pow(R(), 1.5) * 400, wx = Math.cos(wa0) * wd0, wz = Math.sin(wa0) * wd0 - 30;
if (Math.hypot(wx - 8, wz - 6) < 6)
continue;
flowers.push([wx, hy(wx, wz) + 0.25 + R() * 0.3, wz, 0, 0, 0, 0.12 + R() * 0.1, 0.12 + R() * 0.1, 0.12 + R() * 0.1, [0xA8E8FF, 0xE8A8FF, 0xFFE890, 0xA8FFC8][w % 4]]);
}
srInst(G, fg, frond, fr);
var lit2 = [];
for (var lf = 0; lf < (lite ? 400 : 1600); lf++) {
var la1 = R() * 6.28, ld1 = 4 + Math.pow(R(), 1.4) * 300, lx1 = Math.cos(la1) * ld1, lz1 = Math.sin(la1) * ld1 - 30;
if (Math.abs(lz1 - brook(lx1)) < 5)
continue;
var ls = 0.4 + R() * 1.1;
lit2.push([lx1, hy(lx1, lz1) + 0.03, lz1, -Math.PI / 2, 0, R() * 6, ls, ls * 0.7, 1, [0x6A4A22, 0x8A5A26, 0x4A3A1C, 0x7A6A2A, 0x9A6A2A][lf % 5]]);
}
srInst(G, new THREE.CircleGeometry(1, 6), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }), lit2, true);
srInst(G, new THREE.SphereGeometry(1, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), mounds, true);
srInst(G, new THREE.CylinderGeometry(0.12, 0.16, 1, 6), new THREE.MeshLambertMaterial({ color: 0xE8E0C8 }), stems.map(function (q) { var p = q.slice(); p[1] += q[7] * 0.45; return p; }));
srInst(G, new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x0A2A26 }), caps, true);
srInst(G, new THREE.IcosahedronGeometry(1, 0), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), flowers, true);
var pts = [], wpts = [];
for (var sx2 = -640; sx2 <= 640; sx2 += 16) {
var szz = brook(sx2);
pts.push([sx2, szz]);
}
var sp = [], si = [], wv = 0;
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L, nz = dx / L, y = Math.min(hy(p[0] - nx * 4, p[1] - nz * 4), hy(p[0] + nx * 4, p[1] + nz * 4)) + 0.12;
sp.push(p[0] - nx * 4, y, p[1] - nz * 4, p[0] + nx * 4, y, p[1] + nz * 4);
wpts.push({ x: p[0], z: p[1], nx: nx, nz: nz });
if (i > 0) {
var b0 = (i - 1) * 2;
si.push(b0, b0 + 1, b0 + 2, b0 + 1, b0 + 3, b0 + 2);
}
});
var wg = new THREE.BufferGeometry();
wg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
wg.setIndex(si);
wg.computeVertexNormals();
var wm = new THREE.MeshStandardMaterial({ color: 0x1E4646, roughness: 0.06, metalness: 0.3, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
var water = new THREE.Mesh(wg, wm);
G.add(water);
var stones = [];
wpts.forEach(function (p, i) { if (lite && i % 2)
return; [-1, 1].forEach(function (sd) { for (var k2 = 0; k2 < 2; k2++) {
var px = p.x + p.nx * sd * (4 + R() * 1.5) + (R() - 0.5) * 6, pz = p.z + p.nz * sd * (4 + R() * 1.5) + (R() - 0.5) * 6, s3 = 0.4 + R() * 1.2;
stones.push([px, hy(px, pz) + s3 * 0.2, pz, R() * 3, R() * 3, R() * 3, s3, s3 * 0.6, s3 * 1.2]);
} }); });
srInst(G, new THREE.DodecahedronGeometry(1, 0), new THREE.MeshLambertMaterial({ color: 0x6A7066 }), stones);
var bp = wpts.reduce(function (a, p) { return Math.abs(p.x) < Math.abs(a.x) ? p : a; }), bg = mmG(G, bp.x, hy(bp.x, bp.z) + 0.6, bp.z, 0, -Math.atan2(bp.nz, bp.nx) + Math.PI / 2, 0);
for (var pk = 0; pk < 9; pk++)
mmSlab(bg, wood, 2.6, 0.14, 0.55, 0, Math.sin(pk / 8 * Math.PI) * 0.7, -6 + pk * 1.5);
[-1.3, 1.3].forEach(function (sd) { for (var pk2 = 0; pk2 < 5; pk2++)
mmCyl(bg, wood, 0.07, 0.07, 1, sd, 0.5 + Math.sin(pk2 / 4 * Math.PI) * 0.7, -6 + pk2 * 3, 0, 0, 0, 5); mmRod(bg, rope, [sd, 1.1, -6], [sd, 1.8, 0], 0.05); mmRod(bg, rope, [sd, 1.8, 0], [sd, 1.1, 6], 0.05); });
var can = new THREE.Mesh(new THREE.PlaneGeometry(3400, 3400), new THREE.MeshLambertMaterial({ map: srCanopyTex(), alphaTest: 0.4, side: THREE.DoubleSide, color: 0x9ACB88 }));
can.rotation.x = -Math.PI / 2;
can.position.y = 300;
G.add(can);
var cm2 = can.material.clone();
cm2.map = can.material.map.clone();
cm2.map.needsUpdate = true;
cm2.map.repeat.set(9, 9);
cm2.color.setHex(0x7AAA70);
var can2 = new THREE.Mesh(new THREE.PlaneGeometry(3400, 3400), cm2);
can2.rotation.set(-Math.PI / 2, 0, 0.65);
can2.position.y = 250;
G.add(can2);
if (!lite) {
var sm = new THREE.MeshBasicMaterial({ map: srShaftTex(), color: 0xF0FFE0, transparent: true, opacity: 0.09, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false });
for (var sf = 0; sf < 14; sf++) {
var ax = (R() - 0.5) * 420, az = (R() - 0.5) * 420 - 40, sh2 = new THREE.Mesh(new THREE.CylinderGeometry(3 + R() * 5, 7 + R() * 9, 180, 10, 1, true), sm);
sh2.position.set(ax, hy(ax, az) + 85, az);
sh2.rotation.set(0.32, 0, -0.28);
G.add(sh2);
}
}
var mm = new THREE.MeshBasicMaterial({ map: srSoftTex(), color: 0xC8E0C8, transparent: true, opacity: lite ? 0.12 : 0.14, depthWrite: false });
SF.srMist = [];
[0.5, 1.1, 4.4].slice(0, lite ? 1 : 3).forEach(function (my) { var mp = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), mm); mp.rotation.x = -Math.PI / 2; mp.position.set(0, my, 0); G.add(mp); SF.srMist.push(mp); });
mm.map.repeat.set(4, 4);
for (var m2 = 0; m2 < (lite ? 10 : 30); m2++) {
mmGlow(G, [0xC8FFB0, 0xA8E8FF, 0xFFE8A0][m2 % 3], 1.2, 0.6, C[0] + (R() - 0.5) * 80, 4 + R() * 12, C[1] + (R() - 0.5) * 80);
}
},
function (g, k, col) {
var steel = mmMat(0xB8BCC4, { shine: 80, tex: "plate" }), gold = mmMat(0xC8A060, { shine: 70, tex: "brass" }), silver = mmMat(0xE0E4EC, { shine: 90, tex: "plate" });
if (k === "crescent") {
var bone = mmMat(0xEDE4D0, { shine: 30 });
mmCyl(g, bone, 0.021, 0.023, 0.17, 0, 0.085, 0, 0, 0, 0, 12);
for (var i = 0; i < 4; i++)
mmTorus(g, silver, 0.023, 0.003, 0, 0.03 + i * 0.04, 0, Math.PI / 2, 0, 0);
[-1, 1].forEach(function (s) { var cr = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.007, 6, 16, Math.PI), silver); cr.position.set(0, 0.2, 0); cr.rotation.set(0, 0, s > 0 ? 0 : Math.PI); cr.scale.set(1, 0.55, 1); g.add(cr); });
var pm = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.007, 6, 14, Math.PI * 1.3), silver);
pm.position.y = -0.02;
pm.rotation.z = Math.PI * 0.85;
g.add(pm);
mmCyl(g, silver, 0.026, 0.03, 0.05, 0, 0.235, 0, 0, 0, 0, 12);
}
else if (k === "lantern") {
mmCyl(g, mmMat(0x3A2A1A, {}), 0.016, 0.016, 0.2, 0, 0.1, 0, 0, 0, 0, 8);
mmEll(g, mmMat(col, { glow: 1 }), 0.016, 0.04, 0.016, 0, 0.12, 0, 8);
for (var b = 0; b < 6; b++) {
var a = b / 6 * Math.PI * 2;
mmCyl(g, gold, 0.004, 0.004, 0.2, Math.cos(a) * 0.028, 0.11, Math.sin(a) * 0.028, 0, 0, 0, 4);
}
mmCyl(g, gold, 0.032, 0.03, 0.025, 0, 0.0, 0, 0, 0, 0, 12);
mmEll(g, gold, 0.028, 0.022, 0.028, 0, -0.02, 0, 10);
mmCyl(g, gold, 0.036, 0.03, 0.04, 0, 0.22, 0, 0, 0, 0, 12);
mmTorus(g, gold, 0.04, 0.005, 0, 0.245, 0, Math.PI / 2, 0, 0);
}
else if (k === "thorn") {
var iron = mmMat(0x2A2A30, { shine: 50, tex: "plate" });
mmCyl(g, iron, 0.023, 0.025, 0.18, 0, 0.09, 0, 0, 0, 0, 8);
for (var r = 0; r < 6; r++)
mmTorus(g, iron, 0.026, 0.004, 0, 0.02 + r * 0.03, 0, Math.PI / 2, 0, 0);
mmCone(g, iron, 0.018, 0.07, 0, -0.035, 0, Math.PI, 0, 0);
mmCyl(g, iron, 0.03, 0.028, 0.04, 0, 0.205, 0, 0, 0, 0, 8);
for (var t = 0; t < 6; t++) {
var ta = t / 6 * Math.PI * 2;
var sp = mmCone(g, mmMat(0x5A1A1A, { shine: 40 }), 0.006, 0.05, Math.cos(ta) * 0.028, 0.245, Math.sin(ta) * 0.028);
if (sp) {
sp.rotation.z = -Math.cos(ta) * 0.4;
sp.rotation.x = Math.sin(ta) * 0.4;
}
}
}
else if (k === "wing") {
var blue = mmMat(0x2A4A8A, { shine: 20 });
mmCyl(g, blue, 0.02, 0.022, 0.17, 0, 0.085, 0, 0, 0, 0, 10);
for (var w = 0; w < 6; w++)
mmTorus(g, silver, 0.022, 0.003, 0, 0.015 + w * 0.03, 0, Math.PI / 2, 0, 0);
[-1, 1].forEach(function (s) { mmFlat(g, silver, [[0, 0], [0.09, 0.03], [0.12, 0.07], [0.05, 0.035], [0, 0.02]], 0.008, s * 0.02, 0.19, 0, 0, s > 0 ? 0 : Math.PI, 0); });
mmCyl(g, silver, 0.026, 0.02, 0.05, 0, 0.225, 0, 0, 0, 0, 10);
mmEll(g, silver, 0.024, 0.02, 0.024, 0, -0.01, 0, 10);
}
else if (k === "elder") {
var wood = mmMat(0x6A4A2A, { shine: 15, tex: "worn" });
mmCyl(g, wood, 0.022, 0.026, 0.19, 0, 0.095, 0, 0, 0, 0, 10);
[0.01, 0.09, 0.17].forEach(function (y) { mmTorus(g, gold, 0.025, 0.004, 0, y, 0, Math.PI / 2, 0, 0); });
for (var l = 0; l < 3; l++) {
var la = l / 3 * Math.PI * 2;
mmFlat(g, mmMat(0x5A8A3A, { shine: 20 }), [[0, 0], [0.03, 0.02], [0.05, 0.06], [0.02, 0.05]], 0.005, Math.cos(la) * 0.018, 0.2, Math.sin(la) * 0.018, 0, -la, 0);
}
mmCyl(g, gold, 0.03, 0.026, 0.035, 0, 0.225, 0, 0, 0, 0, 10);
mmEll(g, wood, 0.03, 0.025, 0.03, 0, -0.01, 0, 10);
}
else {
var grip = mmMat(0x2A2420, { shine: 20 });
mmCyl(g, grip, 0.022, 0.024, 0.16, 0, 0.08, 0, 0, 0, 0, 10);
for (var p = 0; p < 5; p++)
mmTorus(g, mmMat(0x4A3A2A, {}), 0.024, 0.003, 0, 0.02 + p * 0.03, 0, Math.PI / 2, 0, 0);
mmCyl(g, steel, 0.026, 0.026, 0.07, 0, 0.195, 0, 0, 0, 0, 10);
mmTorus(g, gold, 0.028, 0.006, 0, 0.235, 0, Math.PI / 2, 0, 0);
mmCyl(g, steel, 0.03, 0.022, 0.03, 0, 0.25, 0, 0, 0, 0, 10);
}
},
function (col, hilt, fx) {
var g = new THREE.Group();
fx = fx || "steady";
hilt = hilt || "pilgrim";
wdHilt(g, hilt, col);
var coreCol = fx === "twin" ? wdTwin(col) : 0xFFFFFF;
var core = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.014, 0.95, 10), new THREE.MeshBasicMaterial({ color: coreCol }));
core.position.y = 0.74;
g.add(core);
var glow = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.036, 0.98, 12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
glow.position.y = 0.74;
g.add(glow);
var halo = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 1.02, 12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending }));
halo.position.y = 0.74;
g.add(halo);
g.userData.beam = [core, glow, halo];
g.userData.fx = fx;
g.userData.parts = [];
if (fx === "twin") {
var tw = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 0.96, 10), new THREE.MeshBasicMaterial({ color: wdTwin(col), transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
tw.position.y = 0.74;
g.add(tw);
}
if (fx === "crackle") {
g.userData.threads = [];
for (var c = 0; c < 3; c++) {
var ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(wdThread(c, 0)), new THREE.LineBasicMaterial({ color: new THREE.Color(col).lerp(new THREE.Color(0xFFFFFF), 0.5), transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
g.add(ln);
g.userData.threads.push(ln);
}
}
if (fx === "flame" || fx === "starfall") {
var n = sbLite() ? 8 : 18, sm = new THREE.SpriteMaterial({ map: wdDotTex(), color: fx === "flame" ? col : new THREE.Color(col).lerp(new THREE.Color(0xFFFFFF), 0.6), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
for (var i = 0; i < n; i++) {
var s = new THREE.Sprite(sm.clone());
s.userData.t = Math.random();
g.add(s);
g.userData.parts.push(s);
}
}
if (!sbLite()) {
var L = new THREE.PointLight(col, 0.9, 7, 2);
L.position.y = 0.7;
g.add(L);
}
return g;
},
function () { if (WD.dotT)
return WD.dotT; var c = document.createElement("canvas"); c.width = c.height = 32; var x = c.getContext("2d"), g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.4, "rgba(255,255,255,.5)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, 32, 32); WD.dotT = new THREE.CanvasTexture(c); return WD.dotT; },
function (S) {
if (!S.blade)
return "";
var c = wdHex(S.blade), fx = S.fx || "steady", core = fx === "twin" ? wdHex(wdTwin(S.blade)) : "#FFFFFF";
var hiltCol = { pilgrim: "#3A3028", crescent: "#EDE4D0", lantern: "#C8A060", thorn: "#2A2A30", wing: "#2A4A8A", elder: "#6A4A2A" }[S.hilt || "pilgrim"];
var anim = fx === "shimmer" ? "animation:wdShim 2.2s ease-in-out infinite;" : "";
var extra = fx === "flame" ? "box-shadow:0 0 6px 2px " + c + ",0 -4px 14px 6px " + c + "88,0 0 26px 10px " + c + "55;" : fx === "starfall" ? "box-shadow:0 0 6px 2px " + c + ",0 0 18px 6px " + c + "66, 6px 10px 0 -2px #fff,-8px 22px 0 -2px #fff,4px 34px 0 -2px #fff;" : fx === "crackle" ? "box-shadow:0 0 6px 2px " + c + ",0 0 18px 6px " + c + "66;outline:1px dashed " + c + "aa;outline-offset:3px;" : "box-shadow:0 0 6px 2px " + c + ",0 0 18px 6px " + c + "66;";
return "<div style='display:flex;align-items:center;gap:0;margin:10px 0 8px;height:34px'><div style='width:58px;height:14px;border-radius:4px;background:" + hiltCol + ";border:1px solid rgba(255,255,255,.35)'></div>" +
"<div style='width:6px;height:22px;background:#C8A060;border-radius:2px'></div><div style='flex:1;height:8px;border-radius:5px;background:linear-gradient(180deg," + c + "," + core + " 45%," + core + " 55%," + c + ");" + extra + anim + "'></div></div>";
},
function () {
var S = wdGet(), fns = {}, have = Object.keys(S.shards);
var h = WD_BENCH_CSS + "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚔ Your starblade</div><div style='opacity:.85'>Warden Corvin's bench. The heart-shard chooses the colour; the hilt and the way the light moves are yours.</div>";
h += wdBladePreview(S);
if (typeof wdPowLine === "function")
h += wdPowLine(S);
h += "<div style='margin-top:6px;font-weight:600'>Heart-shard (" + have.length + " of " + WD_SHARD_ORDER.length + " found)</div><div>";
WD_SHARD_ORDER.forEach(function (k) {
var sh = WD_SHARDS[k];
if (!sh)
return;
var got = !!S.shards[k], on = got && S.blade === sh.col;
h += "<div class='wd-chip" + (on ? " on" : "") + (got ? "" : " off") + "' " + (got ? "data-w='s-" + k + "' role='button' tabindex='0'" : "") + " title='" + sbEsc(sh.name + (typeof WD_POW !== "undefined" && WD_POW[k] ? ": " + WD_POW[k].surge + ". " + WD_POW[k].about : "")) + "'><i style='background:" + (got ? wdHex(sh.col) : "#222") + ";box-shadow:" + (got ? "0 0 10px " + wdHex(sh.col) : "none") + ";border:1px solid " + wdHex(sh.col) + "'></i>" + (got ? sbEsc(sh.name) : "?") + "<span style='opacity:.6'>" + sbEsc(sh.from) + "</span></div>";
if (got)
fns["s-" + k] = function () {
var first = !S.blade;
S.blade = sh.col;
if (S.rank < 2)
S.rank = 2;
if (!S.hilt)
S.hilt = "pilgrim";
if (!S.fx)
S.fx = "steady";
wdSave();
if (sh.hollow)
wdBal(-2, "The crimson shard is angry and hot in the hilt. It wants a fight.");
if (first)
sbSay("<b>You build your starblade.</b> Corvin watches as you fit the " + sbEsc(sh.name) + " shard, close the hilt, and press the stud. The blade hums into being. \"Welcome, Kindled.\" <b>X</b> to draw it, on the training floors here, and anywhere past the Far Gate where blades are allowed.");
else
sbTone(523, 0.15);
if (WD.drawn)
wdDraw(true);
wdBladeCard();
};
});
h += "</div>";
if (!have.length)
h += "<div style='margin-top:6px;font-size:12.5px;opacity:.85'>You have no heart-shard yet. Each lies on its own world: look for a thin light rising from the ground (Sense makes it bright).</div>";
if (S.blade) {
h += "<div style='margin-top:10px;font-weight:600'>Hilt</div><div>";
WD_HILT_ORDER.forEach(function (k) { var on = (S.hilt || "pilgrim") === k; h += "<span class='wd-opt" + (on ? " on" : "") + "' data-w='h-" + k + "' role='button' tabindex='0' title='" + sbEsc(WD_HILTS[k].about) + "'>" + sbEsc(WD_HILTS[k].name) + "</span>"; fns["h-" + k] = function () { S.hilt = k; wdSave(); sbTone(392, 0.12); if (WD.drawn)
wdDraw(true); wdBladeCard(); }; });
h += "</div><div style='font-size:12px;opacity:.75;margin:2px 4px'>" + sbEsc(WD_HILTS[S.hilt || "pilgrim"].about) + "</div>";
h += "<div style='margin-top:10px;font-weight:600'>The light</div><div>";
WD_FX_ORDER.forEach(function (k) { var on = (S.fx || "steady") === k; h += "<span class='wd-opt" + (on ? " on" : "") + "' data-w='f-" + k + "' role='button' tabindex='0'>" + sbEsc(WD_FX[k].name) + "</span>"; fns["f-" + k] = function () { S.fx = k; wdSave(); sbTone(659, 0.12); if (WD.drawn)
wdDraw(true); wdBladeCard(); }; });
h += "</div><div style='font-size:12px;opacity:.75;margin:2px 4px'>" + sbEsc(WD_FX[S.fx || "steady"].about) + " Never flashing.</div>";
}
worldCard(h, fns);
},
function (k) {
var sc = GX_OUT[k].scatter;
if (sc === "desert")
return { stone: mmMat(0xC8A878, { tex: "worn" }), wood: mmMat(0x8A6A48, { tex: "worn" }), cloth: [mmMat(0xC84A2A, { ds: true }), mmMat(0xE8C060, { ds: true }), mmMat(0x2A6A8A, { ds: true })], metal: mmMat(0x9AA0A8, { shine: 60, tex: "plate" }) };
if (sc === "ice")
return { stone: mmMat(0xB8C8D8, { tex: "worn", shine: 40 }), wood: mmMat(0x5A4A3A, { tex: "worn" }), cloth: [mmMat(0x4A6A9A, { ds: true }), mmMat(0xE8E8F0, { ds: true }), mmMat(0x8A3A3A, { ds: true })], metal: mmMat(0x8A98A8, { shine: 60, tex: "plate" }) };
if (sc === "hollow")
return { stone: mmMat(0x2A2422, { tex: "worn" }), wood: mmMat(0x2A1A14, { tex: "worn" }), cloth: [mmMat(0x6A0A0A, { ds: true }), mmMat(0x1A1A1A, { ds: true }), mmMat(0x8A2A0A, { ds: true })], metal: mmMat(0x3A3A40, { shine: 50, tex: "plate" }) };
if (sc === "forge")
return { stone: mmMat(0x4A4240, { tex: "worn" }), wood: mmMat(0x4A3424, { tex: "worn" }), cloth: [mmMat(0x8A3A1A, { ds: true }), mmMat(0x2A2A2A, { ds: true }), mmMat(0xC8A060, { ds: true })], metal: mmMat(0x6A6A70, { shine: 60, tex: "plate" }) };
return { stone: mmMat(0x9A9488, { tex: "worn" }), wood: mmMat(0x7A5A3A, { tex: "worn" }), cloth: [mmMat(0x3A6AA8, { ds: true }), mmMat(0xE8D8B0, { ds: true }), mmMat(0x6A2A5A, { ds: true })], metal: mmMat(0xA8B0B8, { shine: 60, tex: "plate" }) };
},
function (g, M, R, sol, x, z) {
for (var t = 0; t < 4; t++) {
var a = t / 4 * Math.PI * 2 + 0.4, tx = Math.cos(a) * 9, tz = Math.sin(a) * 9, tg = mmG(g, tx, 0, tz, 0, -a + Math.PI / 2, 0);
mmCone(tg, M.cloth[t % 3], 3.2, 4, 0, 2, 0, 0, 0, 0, 4);
mmCyl(tg, M.wood, 0.08, 0.08, 4.6, 0, 2.3, 0, 0, 0, 0, 5);
mmSlab(tg, mmMat(0x1A1410, {}), 1.2, 1.8, 0.1, 0, 0.9, 2.1);
sol.push({ x: x + tx, z: z + tz, r: 3 });
}
mmCyl(g, M.stone, 1.2, 1.3, 0.4, 0, 0.2, 0, 0, 0, 0, 12);
mmCone(g, mmMat(0xFFA040, { glow: 1, op: 0.8 }), 0.7, 1.4, 0, 1.0, 0);
mmGlow(g, 0xFFA040, 5, 0.5, 0, 1, 0);
for (var l = 0; l < 4; l++) {
var la = l / 4 * Math.PI * 2;
mmCyl(g, M.wood, 0.25, 0.25, 2.2, Math.cos(la) * 3, 0.25, Math.sin(la) * 3, 0, -la, Math.PI / 2, 8);
}
for (var c = 0; c < 6; c++)
mmSlab(g, M.wood, 1, 0.8, 1, -6 + R() * 12, 0.4, 13 + R() * 3).rotation.y = R() * 3;
var aw = mmG(g, -12, 0, -4);
[[-2, -1.5], [2, -1.5], [-2, 1.5], [2, 1.5]].forEach(function (p) { mmCyl(aw, M.wood, 0.08, 0.08, 3, p[0], 1.5, p[1], 0, 0, 0, 5); });
mmSlab(aw, M.cloth[1], 4.6, 0.06, 3.6, 0, 3, 0);
mmSlab(aw, M.wood, 3.6, 1, 1.4, 0, 0.5, 0);
sol.push({ x: x - 12, z: z - 4, r: 2.5 });
return 2;
},
function (g, M, R, sol, x, z) {
for (var c = 0; c < 10; c++) {
var a = c / 10 * Math.PI * 2, cx = Math.cos(a) * 11, cz = Math.sin(a) * 7, h = c % 3 === 0 ? 1.5 + R() * 2 : 5 + R() * 4;
mmCyl(g, M.stone, 0.7, 0.8, h, cx, h / 2, cz, 0, 0, (R() - 0.5) * 0.12, 12);
if (h > 5)
mmSlab(g, M.stone, 1.9, 0.5, 1.9, cx, h + 0.25, cz);
sol.push({ x: x + cx, z: z + cz, r: 0.9 });
}
mmSlab(g, M.stone, 7, 0.9, 1.4, 0, 8.2, -7).rotation.z = 0.06;
mmSlab(g, M.stone, 18, 0.4, 12, 0, 0.2, 0);
for (var b = 0; b < 12; b++) {
var s = 0.6 + R() * 1.4;
mmSlab(g, M.stone, s * 1.6, s, s, (R() - 0.5) * 26, s / 2, (R() - 0.5) * 20).rotation.set(R() * 0.4, R() * 3, R() * 0.4);
}
mmSlab(g, M.stone, 3, 4, 0.6, 0, 2.4, 0);
mmSlab(g, M.stone, 2.4, 0.6, 1.2, 0, 4.6, 0);
sol.push({ x: x, z: z, r: 1.8 });
return 1;
},
function (g, M, R, sol, x, z, lamp) {
mmCyl(g, M.stone, 4.2, 5, 16, 0, 8, 0, 0, 0, 0, 16);
mmCyl(g, M.stone, 5, 5, 1, 0, 16.5, 0, 0, 0, 0, 16);
for (var m = 0; m < 10; m++) {
var ma = m / 10 * Math.PI * 2;
mmSlab(g, M.stone, 1.4, 1.4, 0.8, Math.cos(ma) * 4.6, 17.6, Math.sin(ma) * 4.6).rotation.y = -ma;
}
mmCone(g, M.cloth[0], 5.4, 5, 0, 21, 0, 0, 0, 0, 16);
mmEll(g, mmMat(lamp, { glow: 1 }), 0.9, 0.9, 0.9, 0, 18, 0, 12);
mmGlow(g, lamp, 10, 0.5, 0, 18, 0);
mmSlab(g, mmMat(0x1A1410, {}), 1.6, 2.8, 0.3, 0, 1.4, 4.9);
for (var w = 0; w < 3; w++) {
var wa = w * 2.1;
mmSlab(g, mmMat(lamp, { glow: 1, op: 0.7 }), 0.5, 1.2, 0.1, Math.cos(wa) * 4.5, 9 + w * 2, Math.sin(wa) * 4.5).rotation.y = -wa + Math.PI / 2;
}
sol.push({ x: x, z: z, r: 5.2 });
return 1;
},
function (g, M, R, sol, x, z, lamp) {
for (var s = 0; s < 9; s++) {
var a = s / 9 * Math.PI * 2, sx = Math.cos(a) * 9, sz = Math.sin(a) * 9;
mmSlab(g, M.stone, 1.2, 3 + (s % 3) * 0.8, 0.7, sx, 1.5 + (s % 3) * 0.4, sz).rotation.y = -a;
sol.push({ x: x + sx, z: z + sz, r: 0.8 });
}
mmCyl(g, M.stone, 3.2, 3.6, 0.6, 0, 0.3, 0, 0, 0, 0, 20);
mmCyl(g, mmMat(lamp, { glow: 1, op: 0.55 }), 2.6, 2.6, 0.08, 0, 0.66, 0, 0, 0, 0, 20);
mmEll(g, mmMat(lamp, { glow: 1 }), 0.5, 0.7, 0.5, 0, 2.4, 0, 12);
mmGlow(g, lamp, 7, 0.55, 0, 2.4, 0);
for (var c = 0; c < 8; c++) {
var ca = c / 8 * Math.PI * 2;
mmCyl(g, mmMat(0xF0E8D0, {}), 0.06, 0.06, 0.3, Math.cos(ca) * 2.9, 0.8, Math.sin(ca) * 2.9, 0, 0, 0, 6);
mmGlow(g, 0xFFD890, 0.8, 0.5, Math.cos(ca) * 2.9, 1.05, Math.sin(ca) * 2.9);
}
return 1;
},
function (g, M, R, sol, x, z) {
var hull = mmMat(0x6A7078, { shine: 50, tex: "plate" }), burnt = mmMat(0x2A2624, { tex: "worn" }), w = mmG(g, 0, 1, 0, 0.15, 0.4, 0.25);
mmEll(w, hull, 4, 3, 16, 0, 0, 0, 16);
mmEll(w, burnt, 3.2, 2.4, 6, 0, 0.4, -12, 12);
mmSlab(w, hull, 16, 0.4, 5, -6, -0.6, 2).rotation.z = 0.3;
mmSlab(w, burnt, 9, 0.4, 4, 8, -1.4, -2).rotation.z = -0.5;
mmCyl(w, burnt, 1.6, 2, 4, 0, 0, 15, Math.PI / 2, 0, 0, 12);
mmCyl(w, mmMat(0x5AA8FF, { glow: 1, op: 0.5 }), 1.2, 1.2, 0.2, 0, 0, 17, Math.PI / 2, 0, 0, 12);
for (var d = 0; d < 14; d++)
mmSlab(g, R() < 0.5 ? hull : burnt, 0.5 + R() * 2.5, 0.15, 0.5 + R() * 2, (R() - 0.5) * 40, 0.1, (R() - 0.5) * 40).rotation.set(R() * 0.5, R() * 3, R() * 0.5);
for (var p = -2; p <= 2; p++)
sol.push({ x: x + Math.sin(0.4) * p * 6, z: z + Math.cos(0.4) * p * 6, r: 4.2 });
return 1;
},
function (g, M, R, sol, x, z, lamp, k) {
var crop = k === "sereth" ? mmMat(0x3A6A2A, {}) : k === "dunmarrow" ? mmMat(0xF0F0E8, { shine: 40 }) : mmMat(0x6A9A3A, {});
for (var r = 0; r < 6; r++)
for (var c = 0; c < (sbLite() ? 6 : 12); c++) {
var cx = -14 + c * 2.6, cz = -10 + r * 3.4;
if (k === "dunmarrow")
mmSlab(g, crop, 1.4, 0.3, 1.4, cx, 0.15, cz);
else if (k === "sereth") {
mmCyl(g, mmMat(0x4A3420, { tex: "worn" }), 0.3, 0.4, 6, cx, 3, cz, 0, 0, 0, 6);
mmEll(g, crop, 1.6, 1.4, 1.6, cx, 6.5, cz, 8);
}
else {
mmCyl(g, mmMat(0x5A4028, {}), 0.1, 0.14, 1.6, cx, 0.8, cz, 0, 0, 0, 5);
mmEll(g, crop, 0.9, 0.8, 0.9, cx, 1.9, cz, 8);
}
}
var h = mmG(g, 20, 0, 4);
mmSlab(h, M.stone, 7, 3.4, 6, 0, 1.7, 0);
mmCone(h, M.cloth[0], 5.6, 2.6, 0, 4.7, 0, 0, Math.PI / 4, 0, 4);
mmSlab(h, mmMat(0x1A1410, {}), 1.2, 2.2, 0.1, 0, 1.1, 3.05);
mmSlab(h, mmMat(lamp, { glow: 1, op: 0.7 }), 1, 0.8, 0.1, 2.2, 2, 3.05);
sol.push({ x: x + 20, z: z + 4, r: 4.4 });
for (var f = 0; f < 10; f++)
mmCyl(g, M.wood, 0.08, 0.08, 1.2, -17 + f * 3.6, 0.6, -13, 0, 0, 0, 5);
mmSlab(g, M.wood, 36, 0.1, 0.1, 1, 1, -13);
return 2;
},
function (g, M, R, sol, x, z, lamp) {
mmEll(g, M.stone, 14, 9, 10, 0, 0, -6, 14);
mmSlab(g, mmMat(0x0A0806, {}), 5, 5.6, 1, 0, 2.8, 3.2);
[-1, 1].forEach(function (s) { mmSlab(g, M.wood, 0.6, 6, 0.6, s * 2.8, 3, 3.6); });
mmSlab(g, M.wood, 6.4, 0.6, 0.7, 0, 6.2, 3.6);
for (var r = 0; r < 12; r++)
mmSlab(g, M.wood, 2.4, 0.12, 0.3, 0, 0.06, 4 + r * 1.4);
[-0.7, 0.7].forEach(function (s) { mmSlab(g, M.metal, 0.08, 0.1, 18, s, 0.16, 11.5); });
for (var c = 0; c < 2; c++) {
var cg = mmG(g, 0, 0.5, 8 + c * 5);
mmSlab(cg, M.metal, 1.6, 0.9, 2.2, 0, 0.5, 0);
mmEll(cg, M.stone, 0.7, 0.4, 0.9, 0, 1.1, 0, 8);
}
gxLamp(g, -3.6, 0, 4, lamp, 3);
gxLamp(g, 3.6, 0, 4, lamp, 3);
sol.push({ x: x, z: z - 6, r: 11 });
return 1;
},
function (g, M, R, sol, x, z, lamp) {
mmSlab(g, M.wood, 6, 0.3, 30, 0, 0.8, 0);
for (var p = 0; p < 8; p++) {
mmCyl(g, M.wood, 0.25, 0.3, 3, -2.8, -0.5, -14 + p * 4, 0, 0, 0, 6);
mmCyl(g, M.wood, 0.25, 0.3, 3, 2.8, -0.5, -14 + p * 4, 0, 0, 0, 6);
}
for (var b = 0; b < 3; b++) {
var bg = mmG(g, (b % 2 ? 6 : -6), 0.2, -8 + b * 8, 0, b * 0.4, 0);
mmEll(bg, M.wood, 1.2, 0.6, 3.6, 0, 0, 0, 10);
mmCyl(bg, M.wood, 0.06, 0.06, 4, 0, 2, 0, 0, 0, 0, 5);
mmFlat(bg, M.cloth[b % 3], [[0, 0], [1.6, 0], [0, 2.8]], 0.02, 0.05, 0.6, 0, 0, Math.PI / 2, 0);
}
gxLamp(g, -2.6, 0.95, 14, lamp, 2.6);
gxLamp(g, 2.6, 0.95, 14, lamp, 2.6);
return 2;
},
function () {
return srTex("tuft", 64, 64, function (x, W, H) {
var R = wRand(5);
x.clearRect(0, 0, W, H);
for (var i = 0; i < 26; i++) {
var bx = 6 + R() * 52, lean = (R() - 0.5) * 18, h = 24 + R() * 38;
x.strokeStyle = "rgba(" + (200 + R() * 55 | 0) + "," + (200 + R() * 55 | 0) + "," + (170 + R() * 60 | 0) + ",1)";
x.lineWidth = 1.2 + R() * 1.6;
x.beginPath();
x.moveTo(bx, H);
x.quadraticCurveTo(bx + lean * 0.4, H - h * 0.6, bx + lean, H - h);
x.stroke();
}
});
},
function () {
if (GX.tuftG)
return GX.tuftG;
var pos = [], uv = [], idx = [];
for (var k = 0; k < 3; k++) {
var a = k / 3 * Math.PI, c = Math.cos(a) * 0.6, s2 = Math.sin(a) * 0.6, b = pos.length / 3;
pos.push(-c, 0, -s2, c, 0, s2, c, 1.1, s2, -c, 1.1, -s2);
uv.push(0, 0, 1, 0, 1, 1, 0, 1);
idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
g.userData.shared = true;
GX.tuftG = g;
return g;
},
function (G, k, R, sol) {
var sc = GX_OUT[k] && GX_OUT[k].scatter;
if (!sc)
return;
var lite = sbLite(), N = lite ? 220 : 900, list = [], rocks = [], spikes = [], C = FR_TOWN[k].center;
function ok(x, z) { return Math.hypot(x - 8, z - 6) > 14 && Math.hypot(x - C[0], z - C[1]) > 42; }
for (var i = 0; i < N; i++) {
var a = R() * 6.28, d = 14 + Math.pow(R(), 1.8) * 560, x = Math.cos(a) * d, z = Math.sin(a) * d;
if (!ok(x, z))
continue;
var y = sfHeight(x, z), s = 0.6 + R() * 1.0;
if (sc === "desert") {
list.push([x, y, z, 0, R() * 6, 0, s, s * 0.8, s, [0xC8A860, 0xB89850, 0xD8C080][i % 3]]);
if (i % 3 === 0)
rocks.push([x + 3, y, z - 2, R() * 3, R() * 3, R() * 3, s * 1.4, s * 0.8, s * 1.2, 0xB89A70]);
}
else if (sc === "meadow") {
list.push([x, y, z, 0, R() * 6, 0, s, s, s, [0x6A9A3A, 0x7AAA48, 0x5A8A30][i % 3]]);
if (i % 2 === 0)
spikes.push([x + 1.5, y + 0.3, z, 0, 0, 0, 0.18, 0.18, 0.18, [0xF0E060, 0xE87AA8, 0xA8C8FF, 0xFFFFFF][i % 4]]);
}
else if (sc === "ice") {
spikes.push([x, y, z, (R() - 0.5) * 0.4, 0, (R() - 0.5) * 0.4, 0.8 + R() * 1.4, 2 + R() * 6, 0.8 + R() * 1.4, [0xC8E8FF, 0xA8D0F0, 0xE8F4FF][i % 3]]);
if (i % 2 === 0)
rocks.push([x + 2, y - 0.2, z, 0, R() * 3, 0, 2 + R() * 3, 0.6, 2 + R() * 3, 0xF0F6FF]);
}
else if (sc === "forge") {
rocks.push([x, y, z, R() * 3, R() * 3, R() * 3, s * 1.6, s * 1.1, s * 1.4, [0x2A2624, 0x3A3230, 0x1A1818][i % 3]]);
if (i % 4 === 0)
spikes.push([x, y + 0.05, z, 0, 0, 0, 0.5 + R(), 0.05, 0.5 + R(), 0xFF6A1A]);
}
else if (sc === "hollow") {
spikes.push([x, y, z, (R() - 0.5) * 0.3, 0, (R() - 0.5) * 0.3, 0.6 + R(), 3 + R() * 7, 0.6 + R(), [0x1A1414, 0x2A1A18, 0x140C0C][i % 3]]);
if (i % 3 === 0)
rocks.push([x + 2, y, z, R() * 3, R() * 3, R() * 3, s * 1.4, s, s * 1.2, 0x2A2220]);
if (i % 6 === 0)
list.push([x - 2, y + 0.05, z, 0, 0, 0, 0.6, 0.05, 0.6, 0xFF3A1A]);
}
if (s > 1.3 && sc !== "meadow")
sol.push({ x: x, z: z, r: s * 0.8 });
}
if (sc === "desert" || sc === "meadow")
srInst(G, gxTuftGeo(), new THREE.MeshLambertMaterial({ map: gxTuftTex(), alphaTest: 0.45, side: THREE.DoubleSide, color: 0xFFFFFF }), list, true);
if (sc === "hollow")
srInst(G, new THREE.CylinderGeometry(1, 1, 1, 10), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), list, true);
srInst(G, new THREE.DodecahedronGeometry(1, 0), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), rocks, true);
if (sc === "meadow")
srInst(G, new THREE.IcosahedronGeometry(1, 0), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), spikes, true);
else if (sc === "forge")
srInst(G, new THREE.CylinderGeometry(1, 1, 1, 10), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), spikes, true);
else if (spikes.length) {
var cg = new THREE.ConeGeometry(0.5, 1, 6);
cg.translate(0, 0.5, 0);
srInst(G, cg, sc === "ice" ? new THREE.MeshLambertMaterial({ color: 0x9AB8D0, transparent: true, opacity: 0.82 }) : new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), spikes, true);
}
},
function (G, k) {
var O = GX_OUT[k];
if (!O || !FR_TOWN[k])
return;
var R = wRand(k.length * 313 + 7), M = gxOutMats(k), sol = SF.solids, C = FR_TOWN[k].center;
O.places.forEach(function (P, i) {
var x = P.at[0], z = P.at[1], y = O.water ? 0.2 : sfHeight(x, z), g = mmG(G, x, y, z);
if (O.water) {
mmCyl(g, M.wood, 22, 22, 0.4, 0, 0.6, 0, 0, 0, 0, 24);
for (var p = 0; p < 10; p++) {
var pa = p / 10 * Math.PI * 2;
mmCyl(g, M.wood, 0.3, 0.35, 4, Math.cos(pa) * 21, -1, Math.sin(pa) * 21, 0, 0, 0, 6);
}
g.position.y = -0.2;
var dx0 = x - C[0], dz0 = z - C[1], L0 = Math.hypot(dx0, dz0), ux = dx0 / L0, uz = dz0 / L0, a0 = Math.atan2(ux, uz), mid = (L0 + 30) / 2, len = L0 - 30 - 18;
var wk = mmG(G, C[0] + ux * mid, 0, C[1] + uz * mid, 0, a0, 0);
mmSlab(wk, M.wood, 3, 0.2, len, 0, 0.5, 0);
for (var wp = 0; wp < len / 8; wp++) {
[-1.4, 1.4].forEach(function (sd) { mmCyl(wk, M.wood, 0.15, 0.18, 2.4, sd, -0.2, -len / 2 + wp * 8, 0, 0, 0, 6); mmCyl(wk, M.wood, 0.05, 0.05, 1, sd, 1.1, -len / 2 + wp * 8, 0, 0, 0, 4); });
}
[-1.4, 1.4].forEach(function (sd) { mmSlab(wk, mmMat(0xC8B080, {}), 0.06, 0.06, len, sd, 1.55, 0); });
(SF.ysWalk = SF.ysWalk || []).push({ ax: C[0] + ux * 30, az: C[1] + uz * 30, bx: x, bz: z, ux: ux, uz: uz, L: L0 - 30, px: x, pz: z });
}
var folk = 0;
try {
folk = GX_OUTB[P.k](g, M, R, sol, x, z, O.lamp, k) || 0;
}
catch (e) {
console.warn("outskirts", k, P.n, e);
}
var who = null;
for (var f = 0; f < folk; f++) {
var fl = frFolkLook(k, i * 3 + f), fp = frFolk("out_" + k + i + f, Object.assign({ title: "", sex: (i + f) % 2 ? "f" : "m" }, fl));
var fa = f * 2.4 + 0.6;
fp.position.set(Math.cos(fa) * 5, O.water ? 0.8 : 0, Math.sin(fa) * 5 + 3);
fp.rotation.y = fa + Math.PI;
g.add(fp);
if (!who)
who = fp;
}
var nm = P.n, bodyNm = (gxBody(k) || {}).name || k;
SF.sites.push({ x: x, z: z, r: folk ? 9 : 12, name: nm, info: worldFacts(nm, "Out in the country of " + bodyNm, [], [P.a]),
talk: folk ? { name: "Someone at " + nm, persona: "You live at " + nm + " on " + bodyNm + ". " + P.a + " You are friendly to travellers, you know the local stories and dangers, you talk in short lines. Never use the words Jedi, Force, Republic, Empire or Sith.", greet: null } : null, out: k + i });
var dx = x - C[0], dz = z - C[1], L = Math.hypot(dx, dz), n = Math.floor((L - 40) / (sbLite() ? 40 : 24));
for (var q = 1; q <= n; q++) {
var u = (40 + q * (L - 56) / n) / L, lx = C[0] + dx * u + (q % 2 ? 2.5 : -2.5) * dz / L, lz = C[1] + dz * u - (q % 2 ? 2.5 : -2.5) * dx / L;
if (O.water)
continue;
gxLamp(G, lx, sfHeight(lx, lz), lz, O.lamp, 2.4);
}
});
gxScatter(G, k, R, sol);
},
function (from) {
var S = wdGet(), fns = {}, h = wdHollow();
var head = from === "venn" ? "Senator Malric Venn draws you aside, behind his throne" : from === "ember" ? "The ember fire on Nharos" : "The Hermit's Cell, Aster Still";
var talk = from === "venn" ? "\"The Order keeps you small,\" he says, very quietly. \"Ilvane keeps you small. The Hollow keeps nothing from anyone. Power, and the will to use it. Come to us.\"" : from === "ember" ? "The fire is warm, and angry, and very easy to listen to. It says you could be strong. It says nobody could ever make you afraid again." : "The old Warden pours you tea and says nothing for a long time. \"Anyone can come back,\" she says at last. \"That is the whole of it. Anyone.\"";
var html = worldFacts("Two paths", head, [["You walk", h ? "the Hollow (" + wdRank() + ")" : "the Quiet (" + wdRank() + ")"], ["Your balance", (S.bal || 0) >= 0 ? "Quiet " + (S.bal || 0) : "Hollow " + (-(S.bal || 0))]], [talk]);
if (!S.blade) {
html += "<div style='margin-top:6px'>Only one with a starblade can choose. Build yours on Aster Still first.</div>";
worldCard(html, {});
return;
}
html += "<div style='margin-top:8px;font-size:12.5px;opacity:.9'><b style='color:#9ACBFF'>The Quiet (Warden):</b> protect, calm, mend. The Concord trusts you, raiders hunt you, the Order teaches you, and the story ends with the Hollow broken.<br><b style='color:#FF9A7A'>The Hollow:</b> crush, command, drain. The Hollow fly with you, Concord bounty hunters hunt you, the Order shuts its doors, and the story ends with Ilvane at your feet. Either way, nobody dies, and you can turn back.</div>";
if (!h)
html += worldBtn("hollow", "🔥 Take the Hollow path", "Your gifts turn to Crush, Command, Drain and the rest; your rank becomes Ember-Bound");
else
html += worldBtn("quiet", "☮ Come back to the Quiet", "Your gifts and your rank return to the Order's");
html += worldBtn("stay", "Not now", "Walk away and think about it");
fns.hollow = function () {
S.path = "hollow";
if (S.rank < 1)
S.rank = 1;
S.bal = Math.min(S.bal || 0, -10);
var st = hlGet();
if (st.step >= 5 && st.step < 9) {
st.step = 5;
hlSave();
}
wdSave();
wdApplyPath();
worldCard(null);
sbTone(196, 0.5);
sbSay("<b>You choose the Hollow.</b> " + (from === "venn" ? "Venn smiles. \"Vael will be glad.\" " : "") + "Something in you goes hot and hard and certain. You are <b>" + sbEsc(wdRank()) + "</b>." + (hlGet().step >= 5 ? " <b>The Hollow · 5 of 9.</b> " + sbEsc(HL_STEPS_H[5]) : " When the story reaches the Senate, the Hollow's road opens for you."));
};
fns.quiet = function () {
S.path = "warden";
if (S.end === "claimed")
S.end = "returned";
S.bal = Math.max(S.bal || 0, 0);
var st = hlGet();
if (st.step >= 5 && st.step < 9) {
st.step = 5;
hlSave();
}
wdSave();
wdApplyPath();
worldCard(null);
sbTone(523, 0.4);
sbSay("<b>You come back to the Quiet.</b> It is like putting down something very heavy. You are <b>" + sbEsc(wdRank()) + "</b> of the Order again." + (hlGet().step >= 5 && hlGet().step < 9 ? " <b>The Hollow · 5 of 9.</b> " + sbEsc(HL_STEPS_W[5]) : ""));
};
fns.stay = function () { worldCard(null); };
worldCard(html, fns);
},
function (L) {
if (!wdHollow())
return;
var st = hlGet().step;
if (st === 5 && SF.k === "aster") {
var tf = WD_GIFTS.push.at;
if (!SF.hhSent && Math.hypot(L.x - tf[0], L.z - tf[1]) < 40) {
SF.hhSent = [];
for (var i = 0; i < 5; i++)
SF.hhSent.push(wdTintFoe(wdSpawn("acolyte", tf[0] + (i - 2) * 3, tf[1] - 6, { alert: 1, hp: 80 }), [0x4A9AFF, 0xDCE6FF, 0x40E0B0][i % 3], "A Warden sentinel"));
sbSay("<b>The sentinels of the Order</b> step onto the training floor, blades lit. \"We hoped you would come back to us. Not like this.\"");
}
if (SF.hhSent && !SF.hhSent.some(function (F) { return !F.yield; })) {
SF.hhSent = [];
hlToH(6, "<b>The sentinels kneel.</b> Vael's voice, in your head, warm as a coal: \"Good. Now the sky.\"");
}
}
if (st === 7 && SF.k === "sereth") {
var T = FR_TOWN.sereth, at = T.leader.at;
if (!SF.hhIl && Math.hypot(L.x - at[0], L.z - at[1]) < 50) {
SF.hhIl = wdTintFoe(wdSpawn("acolyte", at[0], at[1], { name: "Mother Ilvane", hp: 480, boss: 1, alert: 1 }), 0x40E0B0);
SF.hhIl.hh = 1;
SF.hhIl.T = Object.assign({}, SF.hhIl.T, { spd: 4.2, dmg: 12, cool: 0.95 });
for (var j = 0; j < 3; j++)
wdTintFoe(wdSpawn("acolyte", at[0] + (j - 1) * 5, at[1] + 5, { alert: 1 }), 0x4A9AFF, "A Warden of Sereth");
sbSay("<b>Mother Ilvane</b> stands under her tree, an old blade the colour of the sea in her hand. \"I taught Vael too,\" she says. \"I am so sorry, child.\"");
}
}
if (SF.k === "nharos" && !SF.hhNh) {
SF.hhNh = 1;
var n = 0;
WD.foes.forEach(function (F) { if (!F.boss && !F.yield) {
F.yield = 1;
F.hp = 0;
F.kneel = 0;
n++;
if (F.g && F.g.parent)
F.g.parent.remove(F.g);
} });
WD.foes = WD.foes.filter(function (F) { return F.g && F.g.parent; });
if (n)
sbSay("The Hollow guards of Nharos see your blade and nod you through.");
}
},
function () {
var g = new THREE.Group(), blk = mmMat(0x16120F, { shine: 60, tex: "plate" }), dk = mmMat(0x2A1E1A, { shine: 40, tex: "plate" }), em = mmMat(0xFF4A1A, { glow: 1 }), gl = mmMat(0x3A0A04, { shine: 95, e: 0x5A1A08, ei: 0.7 });
mmFlat(g, blk, [[0, -9], [1.6, -4], [2.2, 3], [1.2, 6], [-1.2, 6], [-2.2, 3], [-1.6, -4]], 1.4, 0, 0, 0, Math.PI / 2, 0, 0);
mmEll(g, gl, 0.9, 0.7, 2.2, 0, 0.9, -2.4, 12);
[-1, 1].forEach(function (s) {
var w = mmFlat(g, dk, [[0, 0], [7, 4], [8, 9], [6, 7], [1, 6]], 0.35, s * 1.8, 0, -1, Math.PI / 2, 0, 0);
if (s < 0)
w.scale.x = -1;
mmCone(g, blk, 0.5, 5, s * 8.2, 0, -1.5, -Math.PI / 2, 0, 0, 6);
mmSlab(g, em, 0.12, 0.12, 7, s * 4.6, 0.25, 2.4).rotation.y = s * 0.45;
sbEngine(g, dk, 0xFF5A1A, 0.7, s * 1.2, 0, 6.4, 1.6);
});
mmSlab(g, em, 0.1, 0.1, 10, 0, 0.75, 0);
mmCone(g, dk, 0.5, 2.4, 0, 0.9, 3.6, 0, 0, 0, 4);
return g;
},
function () {
var g = new THREE.Group(), ir = mmMat(0x4A4440, { shine: 40, tex: "plate" }), st = mmMat(0x6A5A4A, { shine: 20, tex: "worn" }), br = mmMat(0xB8863A, { shine: 70, tex: "brass" }), fire = mmMat(0xFF8A2A, { glow: 1 });
mmSlab(g, ir, 4.4, 3.4, 14, 0, 0, 1);
mmSlab(g, st, 7.6, 4.6, 3.2, 0, 0, -7.4);
mmSlab(g, br, 8, 0.4, 3.4, 0, 2.5, -7.4);
mmSlab(g, br, 8, 0.4, 3.4, 0, -2.5, -7.4);
for (var v = 0; v < 4; v++) {
mmSlab(g, fire, 0.2, 0.6, 1.6, 2.25, 0.4, -2 + v * 3);
mmSlab(g, fire, 0.2, 0.6, 1.6, -2.25, 0.4, -2 + v * 3);
}
mmSlab(g, mmMat(0x2A3A4A, { shine: 90, op: 0.85 }), 2.4, 0.8, 1.2, 0, 1.9, -3.6);
mmCyl(g, br, 0.15, 0.15, 3, 0, 3.2, 2, 0, 0, 0, 6);
[-1, 1].forEach(function (s) { mmSlab(g, ir, 1.2, 1.6, 8, s * 3, -0.6, 3); sbEngine(g, ir, 0xFF7A2A, 0.9, s * 1.4, 0, 8.4, 2); sbEngine(g, ir, 0xFF7A2A, 0.6, s * 3, -0.6, 7.4, 1.4); });
return g;
},
function () {
var g = new THREE.Group(), gr = mmMat(0x6AB83A, { shine: 60, tex: "plate" }), wh = mmMat(0xE8F0D8, { shine: 70 }), gl = mmMat(0x2A4A2A, { shine: 95, e: 0x10301A, ei: 0.6 });
mmLathe(g, gr, [[0, -8], [0.6, -6], [1.1, -1], [1.2, 3], [0.9, 6], [0, 7]], 0, 0, 0, 12).rotation.x = -Math.PI / 2;
mmEll(g, gl, 0.7, 0.6, 1.8, 0, 0.8, -1.5, 12);
[-1, 1].forEach(function (s) { mmSlab(g, wh, 5, 0.12, 1.2, s * 2.6, 0, 1.5); var pod = mmG(g, s * 5, 0, 1.5); mmLathe(pod, gr, [[0, -3], [0.5, -2], [0.6, 2], [0, 3]], 0, 0, 0, 10).rotation.x = -Math.PI / 2; sbEngine(pod, wh, 0xB8FF7A, 0.45, 0, 0, 3.2, 1); mmSlab(g, mmMat(0xFFE040, { glow: 1 }), 0.1, 0.1, 3, s * 5, 0.55, 1.5); });
mmFlat(g, wh, [[0, 0], [1.4, 0], [0.4, 2.2]], 0.1, 0, 0.6, 5, 0, Math.PI / 2, 0);
sbEngine(g, wh, 0xB8FF7A, 0.6, 0, 0, 7, 1.2);
return g;
},
function () {
var g = new THREE.Group(), hu = mmMat(0x8A7A6A, { shine: 30, tex: "worn" }), rust = mmMat(0x9A5A3A, { tex: "worn" }), cols = [0xC84A2A, 0x2A6A9A, 0xE8B040, 0x4A8A4A];
mmSlab(g, hu, 3.4, 3, 4, 0, 0.6, -8);
mmSlab(g, mmMat(0x2A3A4A, { shine: 90, op: 0.85 }), 3, 1, 0.3, 0, 1.4, -10.05);
mmSlab(g, rust, 1.2, 1.2, 18, 0, 0, 0);
for (var c = 0; c < 6; c++) {
var cz = -4 + c * 2.6;
[-1, 1].forEach(function (s) { mmSlab(g, mmMat(cols[(c + (s > 0 ? 1 : 0)) % 4], { tex: "worn", shine: 20 }), 2.2, 2.2, 2.4, s * 1.9, 0, cz); });
mmSlab(g, mmMat(cols[(c + 2) % 4], { tex: "worn" }), 2.2, 2.2, 2.4, 0, 2.2, cz);
}
mmSlab(g, hu, 6.4, 2.4, 3, 0, 0, 10);
[-1.6, 0, 1.6].forEach(function (x) { sbEngine(g, hu, 0xFFC870, 0.8, x, 0, 12, 1.6); });
mmCyl(g, hu, 0.08, 0.08, 3, 1, 2.6, -8.4, 0, 0, 0, 5);
mmEll(g, mmMat(0xFF4A3A, { glow: 1 }), 0.12, 0.12, 0.12, 1, 4.1, -8.4, 6);
return g;
},
function () {
var g = new THREE.Group(), sk = mmMat(0x2A8AA0, { shine: 70, tex: "pearl" }), bel = mmMat(0xE8F0E8, { shine: 60, tex: "pearl" }), gl = mmMat(0x9AF0FF, { glow: 1 });
var b = mmEll(g, sk, 7, 1.2, 5.5, 0, 0, 0, 24);
mmEll(g, bel, 6.6, 0.6, 5, 0, -0.5, 0, 20);
mmEll(g, mmMat(0x1A4A5A, { shine: 95, op: 0.85 }), 1.4, 0.8, 1.8, 0, 1, -3, 12);
[-1, 1].forEach(function (s) { mmFlat(g, sk, [[0, 0], [2.4, 0.4], [3.2, 2.4], [1, 1.4]], 0.25, s * 1.6, 0, -5.4, Math.PI / 2, 0, s * 0.2); for (var d = 0; d < 5; d++)
mmEll(g, gl, 0.18, 0.06, 0.18, s * (1.5 + d * 1.1), 0.95, -1 + d * 0.6, 8); });
mmHorn(g, sk, [[0, 0, 5], [0, 0.3, 9], [0, 1, 13]], 0.5, 0, 0, 0);
sbEngine(g, sk, 0x9AF0FF, 0.7, 0, -0.2, 5.6, 1.2);
return g;
},
function () {
var g = new THREE.Group(), ic = new THREE.MeshStandardMaterial({ color: 0xC8E8FF, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.88 }), fr = mmMat(0xE8F4FF, { shine: 80, tex: "plate" }), gl = mmMat(0x8AD8FF, { glow: 1 });
var core = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 0), ic);
core.scale.set(1, 0.7, 3.2);
g.add(core);
[-1, 1].forEach(function (s) { var c = new THREE.Mesh(new THREE.OctahedronGeometry(1.4, 0), ic); c.scale.set(0.6, 0.5, 3); c.position.set(s * 3.4, -0.3, 1); c.rotation.z = s * 0.3; g.add(c); mmSlab(g, fr, 2.8, 0.15, 0.8, s * 1.8, -0.2, 1); sbEngine(g, fr, 0x8AD8FF, 0.45, s * 3.4, -0.3, 5.4, 1); });
mmSlab(g, gl, 0.1, 0.1, 12, 0, 0.2, 0);
mmEll(g, mmMat(0x2A4A6A, { shine: 95, op: 0.85 }), 0.8, 0.6, 1.6, 0, 1.2, -3, 10);
sbEngine(g, fr, 0x8AD8FF, 0.7, 0, 0, 7.6, 1.2);
return g;
},
function (k) {
var b = FR_BY[k];
if (b)
return { p: frWorld(k), r: (b.r || 60) * 5 + (b.ring || 0), name: b.name };
var d = (typeof FR_DISC !== "undefined" ? FR_DISC : []).filter(function (x) { return x.k === k; })[0];
if (!d)
return null;
if (FR) {
FR.seen = FR.seen || {};
FR.seen[k] = 1;
}
return { p: frDiscPos(d), r: Math.max(320, (d.r || 40) * 3 + 200), name: d.name };
},
function (id, say) {
var S = gqGet(), A = S.act[id], Q = gqQ(id);
if (!A || !Q)
return;
A.i++;
A.n = 0;
A.spawned = 0;
if (A.i >= Q.steps.length) {
delete S.act[id];
S.done[id] = 1;
gqSave();
var p = id.split("_")[0];
FR_WHY["q_" + id] = { pts: 8, once: 1 };
try {
frStandAdd(p, "q_" + id);
}
catch (e) { }
var left = GX_QUESTS[p].q.filter(function (q, i) { return !S.done[p + "_" + i]; }).length;
sbTone(659, 0.2);
setTimeout(function () { sbTone(880, 0.3); }, 180);
sbSay((say ? say + " " : "") + "<b>Task done: " + sbEsc(Q.n) + ".</b> " + sbEsc(FR_PEOPLES[p].name.charAt(0).toUpperCase() + FR_PEOPLES[p].name.slice(1)) + " count you a better friend for it." + (left ? " They have " + left + " more task" + (left > 1 ? "s" : "") + " for you." : " <b>You have done every task they had.</b>"));
return;
}
gqSave();
sbTone(587, 0.12);
sbSay((say ? say + " " : "") + "<b>" + sbEsc(Q.n) + ":</b> next, " + sbEsc(gqStepLine(Q.steps[A.i])) + ".");
},
function (p) {
var C = GX_QUESTS[p], S = gqGet(), fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📜 Tasks for " + sbEsc(FR_PEOPLES[p].name) + "</div>";
C.q.forEach(function (Q, i) {
var id = p + "_" + i, A = S.act[id], done = S.done[id], open = i === 0 || S.done[p + "_" + (i - 1)];
if (done)
h += "<div style='margin:6px 0;opacity:.75'>✓ <b>" + sbEsc(Q.n) + "</b></div>";
else if (A)
h += "<div style='margin:6px 0'>➤ <b>" + sbEsc(Q.n) + "</b><br><span style='font-size:12.5px;opacity:.85'>Now: " + sbEsc(gqStepLine(Q.steps[A.i])) + " (step " + (A.i + 1) + " of " + Q.steps.length + ")</span></div>";
else if (open) {
h += worldBtn("q" + i, "★ " + sbEsc(Q.n), sbEsc(Q.say));
fns["q" + i] = function () { gqStart(id); };
}
else
h += "<div style='margin:6px 0;opacity:.5'>🔒 " + sbEsc(Q.n) + " (after the one before)</div>";
});
worldCard(h, fns);
},
function (dt) {
GQ.tick += dt;
if (GQ.tick < 0.4)
return;
GQ.tick = 0;
var S = gqGet(), ids = Object.keys(S.act);
if (!ids.length)
return;
var onSurf = WLD.on === "surface" && SF.k, L = onSurf ? worldLocal() : null, inSys = frIn() ? FR.sys : null;
ids.forEach(function (id) {
var A = S.act[id], Q = gqQ(id);
if (!A || !Q)
return;
var st = Q.steps[A.i];
if (!st)
return;
var k = st[0];
if (k === "land" && onSurf === st[1])
return gqNext(id, "You have landed on " + sbEsc((gxBody(st[1]) || {}).name || st[1]) + ".");
if ((k === "visit" || k === "gather" || k === "foes") && onSurf === st[1]) {
var P = GX_OUT[st[1]].places[st[2]], d = Math.hypot(L.x - P.at[0], L.z - P.at[1]);
if (k === "visit" && d < 14)
return gqNext(id, "<b>" + sbEsc(P.n) + ".</b>");
if (k === "gather") {
if (!A.spawned || !SF.gqItems || SF.gqItems.id !== id) {
gqSpawnItems(id, st, P);
A.spawned = 1;
}
SF.gqItems.list.forEach(function (it) { if (!it.got && Math.hypot(L.x - it.x, L.z - it.z) < 2.2) {
it.got = 1;
if (it.m.parent)
it.m.parent.remove(it.m);
A.n++;
gqSave();
sbTone(784, 0.08);
sbSay("<b>" + A.n + " of " + st[3] + "</b> " + sbEsc(st[4]) + ".");
} });
if (A.n >= st[3]) {
SF.gqItems = null;
return gqNext(id);
}
}
if (k === "foes") {
if (d < 45 && !(SF.gqFoes && SF.gqFoes.id === id)) {
SF.gqFoes = { id: id, list: [] };
for (var i = 0; i < st[3]; i++)
SF.gqFoes.list.push(wdSpawn(i % 3 === 2 ? "hunter" : "raider", P.at[0] + (i - st[3] / 2) * 3, P.at[1] + 8 + (i % 2) * 3, { alert: 1 }));
sbSay("<b>There they are.</b> " + sbEsc(st[4]) + ". (Blade X, gifts, or fists if you have none: they yield when beaten.)");
if (wdGet().blade && !WD.drawn && wdLawBlade())
wdDraw(true);
}
if (SF.gqFoes && SF.gqFoes.id === id && SF.gqFoes.list.every(function (F) { return F.yield; })) {
SF.gqFoes = null;
return gqNext(id, "<b>They yield.</b>");
}
}
}
if (k === "fly" && inSys === st[1]) {
var b = gqSite(st[2]);
if (b && SP.pos.distanceTo(b.p) < b.r)
return gqNext(id, "<b>" + sbEsc(b.name) + ".</b>");
}
if (k === "win" && inSys === st[1] && !SB.battle && !GX.jumping && !A.fight) {
A.fight = 1;
setTimeout(function () { if (SB.battle || !frIn() || FR.sys !== st[1]) {
A.fight = 0;
return;
} sbStrike({ why: "quest", ahead: 650, n: 4, gunship: true }); if (SB.battle) {
SB.battle.gq = id;
SB.battle.foeName = SB.battle.foeName || "Raiders";
}
else
A.fight = 0; }, 3000);
}
});
},
function (id, st, P) {
if (SF.gqItems)
SF.gqItems.list.forEach(function (it) { if (it.m.parent)
it.m.parent.remove(it.m); });
var R = wRand(id.length * 37 + st[3]), list = [], m = mmMat(st[5] || 0xFFE8A0, { glow: 1 }), G = WORLDS.surface.g, A = gqGet().act[id];
for (var i = A.n; i < st[3]; i++) {
var a = R() * 6.28, d = 10 + R() * 22, x = P.at[0] + Math.cos(a) * d, z = P.at[1] + Math.sin(a) * d, y = GX_OUT[st[1]].water ? 0.8 : sfHeight(x, z), g = mmG(G, x, y + 0.6, z);
gsItemMesh(g, st[4], st[5] || 0xFFE8A0);
list.push({ x: x, z: z, m: g, y: y + 0.6 });
}
SF.gqItems = { id: id, list: list };
},
function () {
var S = gbGet(), fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚖ " + (typeof wdHollow === "function" && wdHollow() ? "Contracts (the board does not ask who you serve)" : "The bounty board") + "</div><div style='opacity:.85'>Named captains. Find them in their system and beat them; the Concord pays in standing, and the people they hurt remember.</div>";
GX_BOUNTY.forEach(function (B) {
var on = S.on === B.k, done = S.done[B.k];
var where = GX_SYS[B.sys] ? GX_SYS[B.sys].name : B.sys;
if (done)
h += "<div style='margin:5px 0;opacity:.7'>✓ " + sbEsc(B.n) + " · brought in</div>";
else {
h += worldBtn("b-" + B.k, (on ? "➤ " : "") + sbEsc(B.n) + (B.big ? " ☠" : ""), sbEsc(B.about) + " · last seen: " + sbEsc(where) + (on ? " · you are hunting them" : ""));
fns["b-" + B.k] = function () { S.on = B.k; gbSave(S); worldCard(null); sbSay("<b>You take the bounty on " + sbEsc(B.n) + ".</b> Last seen in " + sbEsc(where) + ". Jump there (J) and fly about: they will come for you."); };
}
});
worldCard(h, fns);
},
function (Bt, how) {
var S = gbGet(), B = GX_BOUNTY.filter(function (x) { return x.k === Bt.bounty; })[0];
if (!B)
return;
if (how === "won") {
S.done[B.k] = 1;
S.on = null;
gbSave(S);
FR_WHY.bounty = { pts: 6, day: 3 };
try {
frStandAdd("concord", "bounty");
}
catch (e) { }
sbSay("<b>" + sbEsc(B.n) + " is brought in</b>, alive and very cross, in a Concord cutter's hold. The board pays out. " + (Object.keys(S.done).length >= GX_BOUNTY.length ? "<b>Every name on the board is brought in.</b>" : ""));
}
else
sbSay(sbEsc(B.n) + " got away this time. They will be back in " + sbEsc(GX_SYS[B.sys].name) + ".");
},
function () {
var best = {};
try {
best = JSON.parse(localStorage.getItem("gx.race") || "{}") || {};
}
catch (e) { }
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏁 The Tullik races</div><div style='opacity:.85'>Fly through every ring in order. Gold, silver or bronze for your time. Any ship may race.</div>";
Object.keys(GX_RACES).forEach(function (k) {
var R = GX_RACES[k];
h += worldBtn("r-" + k, "🏁 " + sbEsc(R.n), sbEsc(R.about) + " · in " + sbEsc(GX_SYS[R.sys].name) + (best[k] ? " · your best " + best[k].toFixed(1) + " s" : "") + " · gold under " + R.par[0] + " s");
fns["r-" + k] = function () { worldCard(null); if (FR.sys !== R.sys || !frIn()) {
sbSay("That race starts in " + sbEsc(GX_SYS[R.sys].name) + ". Jump there (J), then start it from the chart or the Tullik.");
GXR.want = k;
return;
} gxrStart(k); };
});
worldCard(h, fns);
},
function (k) {
var R = GX_RACES[k];
gxrStop();
var b = FR_BY[R.body];
if (!b)
return;
var g = new THREE.Group();
FR.g.add(g);
var rings = [], rr = (b.r || 60) * R.rad, m = new THREE.MeshBasicMaterial({ color: 0xFFE060, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
for (var i = 0; i < R.rings; i++) {
var a = i / R.rings * Math.PI * 2, wob = Math.sin(i * 1.7) * 0.35, ring = new THREE.Mesh(new THREE.TorusGeometry(26, 2.2, 8, 32), m.clone());
ring.userData.a = a;
ring.userData.r = rr * (1 + wob * 0.4);
ring.userData.y = Math.sin(i * 1.1) * rr * 0.25;
g.add(ring);
rings.push(ring);
}
GXR.on = { k: k, g: g, rings: rings, i: 0, t: 0, b: R.body };
gxrPlace();
var p0 = rings[0].position.clone().add(FR.c), d = p0.clone().sub(SP.pos);
SP.pos.copy(p0).sub(d.normalize().multiplyScalar(300));
SP.vel.set(0, 0, 0);
var f = p0.clone().sub(SP.pos).normalize();
yaw = Math.atan2(-f.x, -f.z);
pitch = Math.asin(f.y);
sbSay("<b>" + sbEsc(R.n) + ".</b> Three... two... one... <b>go!</b> Fly through the gold ring.");
sbTone(440, 0.15);
setTimeout(function () { sbTone(440, 0.15); }, 500);
setTimeout(function () { sbTone(880, 0.3); }, 1000);
},
function () {
var G = GXR.on;
if (!G)
return;
var c = frBodyPos(G.b);
G.rings.forEach(function (r, i) {
var a = r.userData.a;
r.position.set(c.x + Math.cos(a) * r.userData.r, c.y + r.userData.y, c.z + Math.sin(a) * r.userData.r);
r.lookAt(c.x + Math.cos(a + 0.2) * r.userData.r, c.y + r.userData.y, c.z + Math.sin(a + 0.2) * r.userData.r);
r.material.color.setHex(i === G.i ? 0xFFE060 : i < G.i ? 0x5AC85A : 0x8AA0C8);
r.material.opacity = i === G.i ? 0.85 : i < G.i ? 0.2 : 0.45;
});
},
function (S) {
var k = wdShardKey(), P = k && WD_POW[k];
if (!P)
return "";
return "<div style='margin:8px 0 2px;padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.05);border-left:3px solid " + wdHex(S.blade) + "'><b>Shard power: " + sbEsc(P.surge) + "</b> <span style='opacity:.7'>(T, or Surge on a phone)</span><div style='font-size:12.5px;opacity:.9'>" + sbEsc(P.about) + "</div><div style='font-size:12.5px;opacity:.75;margin-top:3px'>Always on: " + sbEsc(P.edge) + "</div></div>";
},
function (r, front) {
var L = wdLocal(), fw = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
return WD.foes.filter(function (F) { if (F.yield || F.thrall || F.kind === "drone")
return false; var dx = F.x - L.x, dz = F.z - L.z, d = Math.hypot(dx, dz); if (d > r)
return false; if (front && (dx * fw.x + dz * fw.z) / Math.max(0.01, d) < front)
return false; F._d = d; return true; });
},
function (col, spread) {
var L = wdLocal(), y = camera.position.y - 0.3, a = yaw + spread, v = new THREE.Vector3(-Math.sin(a), 0, -Math.cos(a)).multiplyScalar(30);
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 6), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
var p = new THREE.Vector3(L.x, y, L.z);
m.position.copy(p);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
WORLDS.surface.g.add(m);
WD.bolts.push({ m: m, p: p, v: v, from: null, col: col, t: 0, back: 1, lance: 1 });
},
function (a, b, col) {
var pts = [], n = 8;
for (var i = 0; i <= n; i++) {
var k = i / n;
pts.push(new THREE.Vector3(a.x + (b.x - a.x) * k + (i && i < n ? (Math.random() - 0.5) * 0.5 : 0), a.y + (b.y - a.y) * k + (i && i < n ? (Math.random() - 0.5) * 0.5 : 0), a.z + (b.z - a.z) * k + (i && i < n ? (Math.random() - 0.5) * 0.5 : 0)));
}
var ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
WORLDS.surface.g.add(ln);
WD.fx.push({ m: ln, t: 0, life: 0.3 });
},
function () {
if (!WD.drawn || WD.swing > 0)
return;
var k = wdShardKey(), S = wdGet();
WD.swing = k === "driftward" ? 0.2 : k === "kharn" ? 0.34 : 0.28;
sbTone(k === "kharn" ? 190 : 260 + Math.random() * 60, 0.08);
var L = wdLocal(), fw = { x: -Math.sin(yaw), z: -Math.cos(yaw) }, reach = k === "aster" ? 3.7 : 2.9, struck = 0;
WD.foes.slice().forEach(function (F) {
if (F.thrall)
return;
var dx = F.x - L.x, dz = F.z - L.z, d = Math.hypot(dx, dz);
if (d > reach)
return;
if ((dx * fw.x + dz * fw.z) / Math.max(0.01, d) < 0.35)
return;
if (F.yield) {
if (!F.struck) {
F.struck = 1;
wdBal(-5, wdHollow() ? "You strike one who yielded. The Hollow in you likes it." : "A Warden never strikes one who yields.");
}
return;
}
if (F.kind === "drone")
return;
var dmg = S.rank >= 3 ? 30 : 22, stun = 0.35;
if (k === "kharn")
dmg += 10;
if (k === "dunmarrow")
dmg += 5;
if (k === "aurelion" && F.boss)
dmg += 14;
if (k === "tullimar") {
WD.hits++;
if (WD.hits % 3 === 0) {
dmg *= 2;
sbTone(880, 0.06);
}
}
if (WD.fury > WD.t)
dmg *= 2;
if (k === "veyar")
stun += 0.4;
if (k === "isk")
stun += 0.6;
if (k === "ysolde") {
F.kx = dx / Math.max(0.01, d) * 7;
F.kz = dz / Math.max(0.01, d) * 7;
}
wdHit(F, dmg, stun, S.blade);
struck++;
if (k === "sereth")
WD.hp = Math.min(100, WD.hp + 3);
if (k === "nharos" || WD.fury > WD.t)
WD.hp = Math.min(100, WD.hp + (WD.fury > WD.t ? 5 : 4));
if (k === "orr") {
var o = null, od = 4;
WD.foes.forEach(function (G) { if (G === F || G.yield || G.thrall || G.kind === "drone")
return; var e = Math.hypot(G.x - F.x, G.z - F.z); if (e < od) {
o = G;
od = e;
} });
if (o) {
wdArc({ x: F.x, y: F.y + 1.2, z: F.z }, { x: o.x, y: o.y + 1.2, z: o.z }, S.blade);
wdHit(o, 10, 0.5, S.blade);
}
}
if (k === "skeldmar")
WD.foes.forEach(function (G) { if (G !== F && !G.yield && G.kind !== "drone" && Math.hypot(G.x - F.x, G.z - F.z) < 3)
G.stun = Math.max(G.stun || 0, 0.6); });
});
return struck;
},
function () {
var S = wdGet(), k = wdShardKey(), P = k && WD_POW[k];
if (!WD.drawn || !P)
return false;
if (S.rank < 2) {
sbSay("The shard is quiet in you yet. It wakes once you are Kindled.");
return true;
}
var left = (WD.pc || 0) - WD.t;
if (left > 0) {
sbSay("<b>" + sbEsc(P.surge) + "</b> is still gathering. " + Math.ceil(left) + " s.");
return true;
}
WD.pc = WD.t + P.cool;
var L = wdLocal(), col = S.blade, fw = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
sbTone(300, 0.2);
setTimeout(function () { sbTone(600, 0.25); }, 110);
if (typeof sbVig === "function")
sbVig(col, 0.1);
if (k === "veyar") {
WD.veil = WD.t + 4;
WD.foes.forEach(function (F) { if (!F.yield) {
F.alert = 0;
F.stun = Math.max(F.stun || 0, 2.5);
} });
}
else if (k === "sereth") {
WD.hp = Math.min(100, WD.hp + 30);
WD.regen = WD.t + 6;
wdRipple(L.x, L.z, 0x9AF0C8);
}
else if (k === "isk") {
wdRipple(L.x, L.z, 0xE8F4FF);
wdFoesNear(9).forEach(function (F) { wdHit(F, 10, 3.5, 0xE8F4FF); });
}
else if (k === "aster") {
[-0.12, 0, 0.12].forEach(function (s) { wdLance(col, s); });
}
else if (k === "ysolde") {
wdRipple(L.x + fw.x * 3, L.z + fw.z * 3, 0x40E0B0);
wdFoesNear(12, 0.3).forEach(function (F) { F.kx = (F.x - L.x) / F._d * 16; F.kz = (F.z - L.z) / F._d * 16; wdHit(F, 10, 2, 0x40E0B0); });
}
else if (k === "maruondo") {
WD.ward = WD.t + 6;
wdRipple(L.x, L.z, 0x2AD06A);
}
else if (k === "aurelion") {
wdRipple(L.x, L.z, 0xFFD860);
wdFoesNear(10).forEach(function (F) { F.stun = Math.max(F.stun || 0, 2.5); if (!F.boss && F.hp < F.max * 0.5) {
wdYield(F, true);
sbSay("<b>" + sbEsc(F.name) + "</b> shields their eyes and kneels.");
} });
}
else if (k === "dunmarrow") {
wdRipple(L.x, L.z, 0xFFB040);
wdFoesNear(16).forEach(function (F) { F.cool = (F.cool || 0) + 4; F.stun = Math.max(F.stun || 0, 1.5); });
}
else if (k === "driftward") {
var n = 0;
wdFoesNear(16).forEach(function (F) { if (F.ranged) {
F.ranged = false;
F.disarmed = 1;
if (F.gun && F.gun.parent)
F.gun.parent.remove(F.gun);
n++;
wdArc({ x: F.x, y: F.y + 1.2, z: F.z }, { x: L.x, y: camera.position.y - 0.4, z: L.z }, col);
} });
sbSay(n ? "You tear " + n + " gun" + (n > 1 ? "s" : "") + " from their hands." : "No shooters near enough.");
}
else if (k === "kharn") {
wdRipple(L.x, L.z, 0xFF7A1E);
sbTone(90, 0.4);
wdFoesNear(6).forEach(function (F) { F.kx = (F.x - L.x) / Math.max(0.1, F._d) * 10; F.kz = (F.z - L.z) / Math.max(0.1, F._d) * 10; wdHit(F, 25, 1.5, 0xFF7A1E); });
}
else if (k === "orr") {
wdFoesNear(14).sort(function (a, b) { return a._d - b._d; }).slice(0, 4).forEach(function (F) { wdArc({ x: L.x, y: camera.position.y - 0.3, z: L.z }, { x: F.x, y: F.y + 1.2, z: F.z }, 0xD8783A); wdHit(F, 20, 1, 0xD8783A); });
}
else if (k === "tullimar") {
WD.dash = 0.36;
WD.dashId = (WD.dashId || 0) + 1;
}
else if (k === "skeldmar") {
wdRipple(L.x, L.z, 0x6A5AF0);
sbTone(70, 0.5);
wdFoesNear(14).forEach(function (F) { wdHit(F, 8, 2.5, 0x6A5AF0); });
}
else if (k === "nharos") {
WD.fury = WD.t + 6;
wdRipple(L.x, L.z, 0xE0202A);
if (!wdHollow())
wdBal(-2, "The crimson shard's fury is not the Quiet's way.");
}
sbSay("<b>" + sbEsc(P.surge) + "!</b> " + sbEsc(P.about));
wdPadPaint();
return true;
},
function (G, C, R, sol, hy) {
var ox = C[0] - 260, oz = C[1] - 520;
for (var i = G.children.length - 1; i >= 0; i--) {
var o = G.children[i];
if (Math.abs(o.position.x - ox) < 0.01 && Math.abs(o.position.z - oz) < 0.01) {
G.remove(o);
}
}
var lite = sbLite(), K = nhkCenter(), Y = sfHeight(K.x, K.z), k = mmG(G, K.x, Y, K.z);
var basalt = mmMat(0x2A2426, { shine: 10, tex: "worn", rep: 6 }), basalt2 = mmMat(0x3A3234, { shine: 10, tex: "worn", rep: 3 }), iron = mmMat(0x1A1618, { shine: 45, tex: "plate" }), bronze = mmMat(0x6A4A2A, { shine: 60, tex: "brass" }), ember = mmMat(0xFF5A2A, { glow: 1 }), emberDim = mmMat(0xC83A1A, { glow: 1, op: 0.8 }), cloth = mmMat(0x5A0A0C, { ds: true }), cloth2 = mmMat(0x2A0606, { ds: true }), floor = mmMat(0x242022, { shine: 20, tex: "worn", rep: 10 }), carpet = mmMat(0x6A0A10, { shine: 5 }), ash = mmMat(0x4A4440, { shine: 5, tex: "worn" });
var S = function (x, z, hw, hd) { sol.push({ x: K.x + x, z: K.z + z, hw: hw, hd: hd }); }, Rr = function (x, z, r) { sol.push({ x: K.x + x, z: K.z + z, r: r }); };
mmSlab(k, basalt, NHK.hw * 2 + 6, 6, NHK.hd * 2 + 6, 0, -2.95, 0);
mmSlab(k, floor, NHK.hw * 2 - 4, 0.08, NHK.hd * 2 - 4, 0, 0.05, 0);
var flags = [];
for (var fx = -56; fx <= 56; fx += 8)
flags.push([fx, 0.1, 0, 0, 0, 0, 0.12, 0.02, NHK.hd * 2 - 6, 0x141012]);
for (var fz = -46; fz <= 46; fz += 8)
flags.push([0, 0.1, fz, 0, 0, 0, NHK.hw * 2 - 6, 0.02, 0.12, 0x141012]);
srInst(k, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), flags, true);
var H = 16, W2 = NHK.hw, D2 = NHK.hd;
mmSlab(k, basalt, W2 * 2, H, 3, 0, H / 2, -D2);
S(0, -D2, W2, 1.7);
mmSlab(k, basalt, 3, H, D2 * 2, -W2, H / 2, 0);
S(-W2, 0, 1.7, D2);
mmSlab(k, basalt, 3, H, D2 * 2, W2, H / 2, 0);
S(W2, 0, 1.7, D2);
var segW = W2 - 7;
mmSlab(k, basalt, segW, H, 3, -(7 + segW / 2), H / 2, D2);
mmSlab(k, basalt, segW, H, 3, 7 + segW / 2, H / 2, D2);
S(-(7 + segW / 2), D2, segW / 2, 1.7);
S(7 + segW / 2, D2, segW / 2, 1.7);
mmSlab(k, basalt2, 14, 5, 3.4, 0, H - 2.5, D2);
[[0, -D2 + 1.8, W2 * 2, 0.6], [0, D2 - 1.8, W2 * 2, 0.6]].forEach(function (b) { mmSlab(k, basalt2, b[2], 0.5, 1.6, b[0], H - 1.2, b[1]); });
[[-W2 + 1.8, 0], [W2 - 1.8, 0]].forEach(function (b) { mmSlab(k, basalt2, 1.6, 0.5, D2 * 2, b[0], H - 1.2, b[1]); });
for (var lx = -54; lx <= 54; lx += 12) {
mmSlab(k, ember, 1.2, 0.5, 0.15, lx, 9, -D2 + 1.6);
if (Math.abs(lx) > 10)
mmSlab(k, ember, 1.2, 0.5, 0.15, lx, 9, D2 - 1.6);
}
for (var lz = -42; lz <= 42; lz += 12) {
mmSlab(k, ember, 0.15, 0.5, 1.2, -W2 + 1.6, 9, lz);
mmSlab(k, ember, 0.15, 0.5, 1.2, W2 - 1.6, 9, lz);
}
var mer = [];
for (var mx = -W2; mx <= W2; mx += 3.2) {
mer.push([mx, H + 1, -D2, 0, 0, 0, 1.6, 2, 3.2, 0x2A2426]);
if (Math.abs(mx) > 8)
mer.push([mx, H + 1, D2, 0, 0, 0, 1.6, 2, 3.2, 0x2A2426]);
}
for (var mz = -D2; mz <= D2; mz += 3.2) {
mer.push([-W2, H + 1, mz, 0, 0, 0, 3.2, 2, 1.6, 0x2A2426]);
mer.push([W2, H + 1, mz, 0, 0, 0, 3.2, 2, 1.6, 0x2A2426]);
}
srInst(k, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: basalt.map || null }), mer, true);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
var tx = c[0] * W2, tz = c[1] * D2, t = mmG(k, tx, 0, tz);
mmCyl(t, basalt, 7, 8, 30, 0, 15, 0, 0, 0, 0, 6);
mmCyl(t, basalt2, 8.2, 7.4, 2, 0, 30, 0, 0, 0, 0, 6);
mmCone(t, iron, 8.6, 16, 0, 39, 0, 0, 0, 0, 6);
mmEll(t, ember, 0.6, 0.8, 0.6, 0, 47.5, 0, 8);
for (var s = 0; s < 6; s++) {
var a = s / 6 * Math.PI * 2 + Math.PI / 6;
mmSlab(t, ember, 0.4, 2.4, 0.2, Math.sin(a) * 7.3, 20, Math.cos(a) * 7.3, 0, a, 0);
}
if (!lite)
mmGlow(t, 0xFF5A2A, 8, 0.25, 0, 47.5, 0);
Rr(tx, tz, 8.4);
});
[-1, 1].forEach(function (s) {
var t = mmG(k, s * 10, 0, D2);
mmCyl(t, basalt, 4.5, 5, 22, 0, 11, 0, 0, 0, 0, 6);
mmCone(t, iron, 5.4, 9, 0, 26.5, 0, 0, 0, 0, 6);
mmSlab(t, ember, 0.3, 2, 0.2, 0, 15, 5);
Rr(s * 10, D2, 5.2);
mmFlat(t, cloth, [[0, 0], [3, 0], [3, 12], [1.5, 10.5], [0, 12]], 0.04, -1.5, 1.4, 5.1, Math.PI, 0, 0);
var bz = mmG(k, s * 8, 0, D2 + 5);
mmCyl(bz, iron, 0.7, 0.4, 1.8, 0, 0.9, 0, 0, 0, 0, 8);
mmEll(bz, ember, 0.7, 0.45, 0.7, 0, 1.95, 0, 10);
if (!lite)
mmGlow(bz, 0xFF7A3A, 4, 0.5, 0, 2.4, 0);
Rr(s * 8, D2 + 5, 0.9);
});
for (var pb = 0; pb < 11; pb++)
mmSlab(k, iron, 0.22, 4, 0.22, -6 + pb * 1.2, H - 4, D2 + 0.6);
for (var ph = 0; ph < 3; ph++)
mmSlab(k, iron, 13, 0.22, 0.22, 0, H - 5.6 + ph * 1.4, D2 + 0.6);
mmSlab(k, iron, 14.6, 0.6, 0.8, 0, H - 6.2, D2 + 1.6);
for (var bn = 0; bn < (lite ? 4 : 10); bn++) {
var side = bn % 2 ? 1 : -1, bzz = -36 + Math.floor(bn / 2) * 18;
var bg = mmG(k, side * (W2 - 1.7), 0, bzz, 0, side > 0 ? -Math.PI / 2 : Math.PI / 2, 0);
mmSlab(bg, iron, 3.6, 0.2, 0.2, 0, 13.2, 0);
mmFlat(bg, bn % 3 ? cloth : cloth2, [[0, 0], [3.2, 0], [3.2, 9], [1.6, 7.6], [0, 9]], 0.03, -1.6, 4, 0.12, 0, 0, 0);
mmEll(bg, ember, 0.5, 0.5, 0.1, 0, 10.6, 0.2, 10);
}
var hz = -32, hall = mmG(k, 0, 0, hz), HH = 18;
mmSlab(hall, basalt2, 1.6, HH, 36, -22, HH / 2, 0);
S(-22, hz, 0.9, 18);
mmSlab(hall, basalt2, 1.6, HH, 36, 22, HH / 2, 0);
S(22, hz, 0.9, 18);
mmSlab(hall, basalt2, 19, HH, 1.6, -12.5, HH / 2, 18);
mmSlab(hall, basalt2, 19, HH, 1.6, 12.5, HH / 2, 18);
mmSlab(hall, basalt2, 6, HH - 8, 1.6, 0, 8 + (HH - 8) / 2, 18);
S(-12.5, hz + 18, 9.5, 0.9);
S(12.5, hz + 18, 9.5, 0.9);
mmSlab(hall, iron, 46, 1.2, 38, 0, HH + 0.6, 0);
mmSlab(hall, bronze, 6.6, 0.5, 0.4, 0, 8.2, 18.9);
[-1, 1].forEach(function (s) { mmSlab(hall, iron, 0.6, 8, 0.6, s * 3.3, 4, 18.9); mmFlat(hall, cloth2, [[0, 0], [2.4, 0], [2.4, 6]], 0.03, s * 1.6 - 1.2, 1.6, 19.2, 0, 0, 0); });
for (var p = 0; p < 6; p++) {
[-1, 1].forEach(function (s) { var pz = -13 + p * 5.4; mmCyl(hall, basalt, 0.9, 1.1, HH, s * 9, HH / 2, pz, 0, 0, 0, 8); mmCyl(hall, bronze, 1.3, 1.3, 0.5, s * 9, 0.25, pz, 0, 0, 0, 8); mmCyl(hall, bronze, 1.3, 1.3, 0.5, s * 9, HH - 0.5, pz, 0, 0, 0, 8); Rr(s * 9, hz + pz, 1.2); });
}
mmSlab(hall, carpet, 4, 0.06, 30, 0, 0.12, 3);
mmSlab(hall, bronze, 4.4, 0.07, 0.15, 0, 0.13, 18);
for (var bz2 = 0; bz2 < 4; bz2++) {
[-1, 1].forEach(function (s) {
var bx = s * 19.5, bzz = -12 + bz2 * 9, b = mmG(hall, bx, 0, bzz);
mmCyl(b, iron, 0.5, 0.3, 1.6, 0, 0.8, 0, 0, 0, 0, 8);
mmEll(b, ember, 0.5, 0.35, 0.5, 0, 1.7, 0, 10);
if (!lite && bz2 % 2 === 0)
mmGlow(b, 0xFF7A3A, 3, 0.45, 0, 2.1, 0);
Rr(bx, hz + bzz, 0.7);
mmFlat(hall, bz2 % 2 ? cloth : cloth2, [[0, 0], [2.6, 0], [2.6, 7], [1.3, 6], [0, 7]], 0.03, s * 21.1 - 1.3, 7, bzz, 0, s > 0 ? -Math.PI / 2 : Math.PI / 2, 0);
});
}
var ring = mmG(hall, 0, 12, -2);
mmTorus(ring, iron, 4.2, 0.12, 0, 0, 0, Math.PI / 2, 0, 0);
for (var e = 0; e < 8; e++) {
var ea = e / 8 * Math.PI * 2;
mmEll(ring, ember, 0.22, 0.3, 0.22, Math.cos(ea) * 4.2, 0.3, Math.sin(ea) * 4.2, 8);
}
for (var ch = 0; ch < 4; ch++) {
var ca = ch / 4 * Math.PI * 2;
mmCyl(ring, iron, 0.04, 0.04, 6, Math.cos(ca) * 2.1, 3, Math.sin(ca) * 2.1, 0, 0, Math.cos(ca) * 0.6, 4);
}
if (!lite) {
var hl = new THREE.PointLight(0xFF7A3A, 1.1, 46, 2);
hl.position.set(0, 10, -2);
hall.add(hl);
}
var dz = -14.5;
mmSlab(hall, basalt, 16, 0.5, 6, 0, 0.25, dz);
mmSlab(hall, basalt2, 12, 0.5, 4.6, 0, 0.75, dz - 0.4);
mmSlab(hall, basalt, 8, 0.5, 3.4, 0, 1.25, dz - 0.8);
var th = mmG(hall, 0, 1.5, dz - 1.1);
mmSlab(th, iron, 2.4, 0.7, 1.8, 0, 0.35, 0);
mmSlab(th, cloth, 2, 0.18, 1.5, 0, 0.79, 0.05);
mmSlab(th, iron, 2.6, 5.2, 0.4, 0, 2.6, -0.8);
[-1, 1].forEach(function (s) { mmSlab(th, iron, 0.3, 1, 1.8, s * 1.25, 1.2, 0); mmEll(th, ember, 0.14, 0.14, 0.14, s * 1.25, 1.8, 0.8, 8); });
for (var sp = 0; sp < 7; sp++) {
var sx = -1.2 + sp * 0.4, sh2 = 1 + Math.abs(3 - sp) * -0.22 + 1.4;
mmCone(th, iron, 0.16, sh2, sx, 5.2 + sh2 / 2, -0.8, 0, 0, (sx) * 0.12, 6);
}
mmEll(th, ember, 0.36, 0.46, 0.12, 0, 3.8, -0.56, 12);
if (!lite)
mmGlow(th, 0xFF4A2A, 3.2, 0.45, 0, 3.8, -0.4);
mmCone(hall, iron, 13, 110, 0, HH + 56, -4, 0, 0, 0, 6);
mmEll(hall, ember, 2.4, 3.2, 2.4, 0, HH + 92, -4, 10);
if (!lite)
mmGlow(hall, 0xFF5A2A, 24, 0.35, 0, HH + 92, -4);
var pit = mmG(k, -30, 0, 18);
mmCyl(pit, ash, 12, 12, 0.2, 0, 0.1, 0, 0, 0, 0, 28);
mmTorus(pit, basalt2, 12.2, 0.4, 0, 0.3, 0, Math.PI / 2, 0, 0);
for (var po = 0; po < 16; po++) {
var poa = po / 16 * Math.PI * 2;
mmCyl(pit, iron, 0.18, 0.22, 2.4, Math.cos(poa) * 12.9, 1.2, Math.sin(poa) * 12.9, 0, 0, 0, 6);
mmEll(pit, ember, 0.16, 0.16, 0.16, Math.cos(poa) * 12.9, 2.5, Math.sin(poa) * 12.9, 6);
}
for (var cr = 0; cr < 9; cr++) {
var cra = cr * 0.7, crl = 3 + R() * 6;
mmSlab(pit, emberDim, 0.16, 0.03, crl, Math.cos(cra) * 4, 0.21, Math.sin(cra) * 4, 0, cra, 0);
}
for (var q = 0; q < 4; q++) {
var qa = q / 4 * Math.PI * 2 + Math.PI / 4, qb = mmG(pit, Math.cos(qa) * 13.4, 0, Math.sin(qa) * 13.4);
mmCyl(qb, iron, 0.6, 0.35, 1.7, 0, 0.85, 0, 0, 0, 0, 8);
mmEll(qb, ember, 0.6, 0.4, 0.6, 0, 1.8, 0, 10);
if (!lite)
mmGlow(qb, 0xFF7A3A, 3.6, 0.45, 0, 2.2, 0);
Rr(-30 + Math.cos(qa) * 13.4, 18 + Math.sin(qa) * 13.4, 0.8);
}
var fg = mmG(k, 32, 0, 16, 0, -Math.PI / 2, 0);
mmSlab(fg, basalt2, 7, 4, 5, 0, 2, 0);
mmSlab(fg, mmMat(0x0A0606, {}), 3, 1.8, 0.2, 0, 1.5, 2.52);
mmSlab(fg, ember, 2.6, 1.2, 0.1, 0, 1.3, 2.5);
if (!lite)
mmGlow(fg, 0xFF6A2A, 6, 0.5, 0, 1.6, 3);
mmCyl(fg, basalt, 1.4, 1.8, 12, 0, 10, -1, 0, 0, 0, 8);
mmEll(fg, emberDim, 0.9, 0.3, 0.9, 0, 16.1, -1, 8);
var av = mmG(fg, 0, 0, 6);
mmSlab(av, iron, 0.8, 0.8, 0.6, 0, 0.4, 0);
mmSlab(av, iron, 1.6, 0.35, 0.6, 0.1, 0.95, 0);
mmCone(av, iron, 0.3, 0.6, -0.95, 0.95, 0, 0, 0, Math.PI / 2, 6);
mmSlab(fg, basalt, 3.4, 0.9, 1.2, 4.6, 0.45, 5);
mmSlab(fg, mmMat(0x1A2A30, { shine: 90, op: 0.85 }), 3.1, 0.05, 0.9, 4.6, 0.91, 5);
var rack = mmG(fg, -5.2, 0, 4, 0, Math.PI / 2, 0);
mmSlab(rack, iron, 4, 0.12, 0.8, 0, 1, 0);
mmSlab(rack, iron, 4.2, 2.6, 0.12, 0, 2.2, -0.4);
for (var bl = 0; bl < (lite ? 2 : 4); bl++) {
var b2 = wdBuildBlade(bl === 3 ? 0xE0202A : 0xFF5A2A, bl % 2 ? "thorn" : "crescent", "steady");
b2.traverse(function (o) { if (o.isPointLight && o.parent)
o.parent.remove(o); });
b2.position.set(-1.4 + bl * 0.95, 1.1, -0.28);
b2.scale.setScalar(1.2);
rack.add(b2);
}
S(32, 16, 3, 4);
Rr(32 + 6 * Math.cos(Math.PI / 2), 16, 1);
for (var tn = 0; tn < 3; tn++) {
var tg = mmG(k, W2 - 10, 0, -6 + tn * 12);
mmFlat(tg, cloth2, [[0, 0], [10, 0], [5, 4.2]], 9, -5, 0, -4.5, 0, 0, 0);
mmSlab(tg, iron, 0.15, 4.6, 0.15, 0, 2.3, 4.6);
for (var br = 0; br < 3; br++)
mmSlab(tg, mmMat(0x4A3A30, {}), 0.9, 0.15, 2.2, -2.5 + br * 2.5, 0.1, 0);
S(W2 - 10, -6 + tn * 12, 5.2, 4.6);
}
for (var cg = 0; cg < 3; cg++) {
var cgx = -W2 + 8, cgz = -8 + cg * 8, cgg = mmG(k, cgx, 0, cgz);
mmSlab(cgg, iron, 4, 0.2, 4, 0, 0.1, 0);
mmSlab(cgg, iron, 4, 0.2, 4, 0, 4, 0);
for (var cb = 0; cb < 12; cb++) {
var ca2 = cb / 12 * Math.PI * 2;
if (cb === 3)
continue;
mmCyl(cgg, iron, 0.06, 0.06, 3.8, Math.cos(ca2) * 1.9, 2, Math.sin(ca2) * 1.9, 0, 0, 0, 4);
}
mmSlab(cgg, iron, 0.1, 3.6, 1.4, 1.9 + 0.5, 2, 1.2, 0, 0.9, 0);
S(cgx, cgz, 2.1, 2.1);
}
for (var ad = 0; ad < (lite ? 6 : 16); ad++) {
var adx = (R() - 0.5) * 100, adz = (R() - 0.5) * 80;
if (nhkHall(K.x + adx, K.z + adz) || Math.hypot(adx + 30, adz - 18) < 14 || Math.abs(adx) < 5)
continue;
mmEll(k, ash, 1 + R() * 2, 0.25, 1 + R() * 1.5, adx, 0.1, adz, 8);
}
for (var ws = 0; ws < 4; ws++) {
var wsx = -12 + ws * 8, wsz = 38, wsg = mmG(k, wsx, 0, wsz);
if (Math.abs(wsx) < 6)
continue;
mmSlab(wsg, iron, 2.4, 0.15, 0.6, 0, 1.1, 0);
[-1, 1].forEach(function (s) { mmSlab(wsg, iron, 0.15, 1.2, 0.15, s * 1.1, 0.6, 0); });
for (var sv = 0; sv < 3; sv++)
mmCyl(wsg, iron, 0.04, 0.04, 2.2, -0.7 + sv * 0.7, 1.4, 0, 0.15, 0, 0, 4);
Rr(wsx, wsz, 1.3);
}
var hood = function (i, t, s) { return frFolk("nhk_" + i, { title: t, sex: s, look: { skin: [0xC89A78, 0x8A6A50, 0xE0C0A0, 0x6A4A3A][i % 4], hair: 0x1A1614, layer: "robe", layerColor: [0x3A3434, 0x2A1A1A, 0x4A2020][i % 3], hat: i % 3 ? "hood" : null } }); };
var folk = [
[-30, 8, 0, "Mistress Kethra Vahl", "Ash-Mistress of the Keep", "f", "You are Mistress Kethra Vahl, Ash-Mistress of the Ashen Keep on Nharos, who trains the Hollow in the Ember Pit. You are cold, proud and sharp, and you respect strength. You test every newcomer. You believe the Quiet is weakness. To one of the Hollow you are a hard teacher; to a Warden you are an enemy who will not fight dirty. Speak in short lines. Never use the words Jedi, Force, Republic, Empire or Sith.", "kethra"],
[32, 24, Math.PI, "Smith Oruk", "Forge-master of the Hollow", "m", "You are Oruk, forge-master of the Hollow at the Ash Forge on Nharos. You make ember blades. You are gruff, proud of your work and say little. Never use the words Jedi, Force, Republic, Empire or Sith.", "oruk"],
[0, -26, Math.PI, "Steward Mael", "Keeper of the empty throne", "m", "You are Steward Mael, who keeps the great hall of the Ashen Keep and the empty throne of the Hollow Lord. You are quiet, watchful and a little afraid of who will sit there next. Never use the words Jedi, Force, Republic, Empire or Sith.", "mael"]
];
folk.forEach(function (f, i) {
var p = hood(i, f[4], f[5]);
p.position.set(f[0], 0, f[1]);
p.rotation.y = f[2];
k.add(p);
SF.sites.push({ x: K.x + f[0], z: K.z + f[1], r: 3.2, name: f[3] + ", " + f[4], nhk: f[7], talk: { name: f[3], persona: f[6], greet: null } });
});
for (var gd = 0; gd < (lite ? 4 : 10); gd++) {
var ga = gd / 10 * Math.PI * 2, gx = gd < 4 ? [-9, 9, -9, 9][gd] : (-40 + (gd - 4) * 16), gz = gd < 4 ? [D2 - 6, D2 - 6, 8, 8][gd] : (gd % 2 ? -4 : 30);
var gp = hood(10 + gd, "Hollow guard", gd % 3 ? "m" : "f");
gp.position.set(gx, 0, gz);
gp.rotation.y = gd < 2 ? 0 : ga;
var gb = wdBuildBlade(0xFF5A2A);
gb.traverse(function (o) { if (o.isPointLight && o.parent)
o.parent.remove(o); });
gb.position.set(0.32, 0.95, 0.25);
gb.rotation.set(-0.9, 0, 0.2);
gp.add(gb);
k.add(gp);
SF.sites.push({ x: K.x + gx, z: K.z + gz, r: 2.4, name: "A Hollow guard", talk: { name: "A Hollow guard", persona: "You are a guard of the Ashen Keep on Nharos, sworn to the Hollow. You are suspicious and blunt, and you answer in one or two short lines. Never use the words Jedi, Force, Republic, Empire or Sith.", greet: null } });
}
if (!lite)
for (var sp2 = 0; sp2 < 2; sp2++) {
[-1, 1].forEach(function (s) { var a = hood(30 + sp2 * 2 + (s > 0 ? 1 : 0), "Hollow acolyte", s > 0 ? "f" : "m"); a.position.set(-30 + s * 2.2, 0.2, 14 + sp2 * 8); a.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2; var ab = wdBuildBlade(0xFF5A2A); ab.traverse(function (o) { if (o.isPointLight && o.parent)
o.parent.remove(o); }); ab.position.set(0.32, 1.1, 0.3); ab.rotation.set(-1.4, 0, 0.4); a.add(ab); k.add(a); });
}
SF.sites.push({ x: K.x, z: K.z + D2, r: 9, name: "The Ashen Keep", info: worldFacts("The Ashen Keep", "The fortress of the Hollow on Nharos · danger 4: Deadly, no law", [["The Ember Pit", "where the Hollow spar"], ["The Ash Forge", "where a Hollow blade is made"], ["The great hall", "the empty throne of the Hollow Lord"]], ["Black walls, ember light, and a guard on every gate. The Hollow live here."]) });
SF.nhk = { y: Y, guards: 0, told: 0 };
},
function () {
var S = wdGet(), h = wdHollow(), fns = {};
if (!h) {
worldCard(worldFacts("Mistress Kethra Vahl", "Ash-Mistress of the Keep", [], ["\"A Warden, in the Ashen Keep. Bold. Or foolish.\" She does not draw her blade. \"Choose the Hollow, and I will teach you. Until then, you have nothing to say to me.\""]) + worldBtn("x", "Leave her be", ""), { x: function () { worldCard(null); } });
return;
}
var spars = S.spars || 0;
var html = worldFacts("Mistress Kethra Vahl", "Ash-Mistress of the Ashen Keep", [["You are", wdRank()], ["Bouts in the Ember Pit", String(spars)], ["Your balance", "Hollow " + Math.max(0, -(S.bal || 0))]], ["\"Strength is the only teacher that never lies. Show me yours.\""]);
html += worldBtn("spar", "⚔ Spar in the Ember Pit", "Three acolytes at once. Win and the Hollow grows in you");
html += worldBtn("forge", "🔥 The Ash Forge", "Choose your shard, hilt and light at Oruk's anvil");
fns.spar = function () { worldCard(null); nhkSpar(); };
fns.forge = function () { worldCard(null); if (!S.blade && Object.keys(S.shards || {}).length)
sbSay("Pick a shard to build your blade."); wdBladeCard(); };
worldCard(html, fns);
},
function () {
if (NHK.spar)
return;
var K = nhkCenter(), cx = K.x - 30, cz = K.z + 18, L = wdLocal();
if (Math.hypot(L.x - cx, L.z - cz) > 14) {
camera.position.x = WORLDS.surface.base + cx;
camera.position.z = cz + 6;
}
NHK.spar = { foes: [] };
for (var i = 0; i < 3; i++) {
var a = i / 3 * Math.PI * 2;
NHK.spar.foes.push(wdSpawn("acolyte", cx + Math.cos(a) * 7, cz + Math.sin(a) * 7, { name: "Sparring acolyte", hp: 90, alert: 1 }));
}
if (!WD.drawn && wdGet().blade)
wdDraw(true);
sbSay("<b>Kethra:</b> \"Begin.\" Three acolytes step into the Pit with you, ember blades up.");
},
function () {
var S = gsGet(), st0 = Math.floor(hlGet().step || 0), keys = ["1", "2", "3", "4", "5"].concat(wdHollow() ? ["h6", "h7"] : ["w7", "w8"]), out = null;
keys.some(function (k) {
var n = parseInt(k.replace(/\D/g, ""), 10);
if (st0 < n)
return false;
var L = GS_GATE[k];
if (!L.some(function (id) { return S.done[id]; }))
return false;
var nx = L.filter(function (id) { return !S.done[id]; })[0];
if (nx) {
out = nx;
return true;
}
return false;
});
return out;
},
function (p) {
try {
var P = FR_PEOPLES[p], T = P && FR_TOWN[P.world], B = P && gxBodyAny(P.world);
if (!T || !T.leader)
return "";
var n = T.leader.name.replace(/^The /, "the ");
return " (speak with " + n + (P.world === "orr" ? ", in the Reading Hall: the great dome, door facing the town" : "") + " on " + ((B && B.name) || P.world) + ")";
}
catch (e) {
return "";
}
},
function () {
var Q = gqGet(), ideas = [];
Object.keys(GX_QUESTS).forEach(function (p) { var i = GX_QUESTS[p].q.findIndex(function (q, j) { return !Q.done[p + "_" + j]; }); if (i >= 0 && !Q.act[p + "_" + i])
ideas.push("take " + FR_PEOPLES[p].name + "'s task \"" + GX_QUESTS[p].q[i].n + "\" from their leader"); });
var B = gbGet();
GX_BOUNTY.forEach(function (b) { if (!B.done[b.k])
ideas.push("bring in " + b.n + " from the bounty board at Pell's Halo"); });
Object.keys(WD_GIFTS).forEach(function (g) { if (!wdGet().gifts[g])
ideas.push("learn " + WD_GIFTS[g].name + " in its trial"); });
return ideas.length ? ideas[Math.floor(Math.random() * ideas.length)] : "race the Tullik, or hunt the heart-shards you have not found";
},
function (id, free) {
var S = gsGet(), C = GS_CH[id];
if (!C || S.act)
return;
S.act = { id: id, i: 0, n: 0, free: free ? 1 : 0 };
gsSave();
sbTone(392, 0.2);
setTimeout(function () { sbTone(523, 0.3); }, 200);
sbSay("<b>Chapter " + gsNum(id) + ": " + sbEsc(C.n) + ".</b> " + sbEsc(C.say) + "<br>First: <b>" + sbEsc(gsLine(C.steps[0])) + "</b>. (The Star Log shows where you are.)");
},
function (say) {
var S = gsGet(), A = S.act;
if (!A)
return;
var C = GS_CH[A.id];
A.i++;
A.n = 0;
A.w = 0;
A.fight = 0;
A.sp = 0;
SF.gsFoes = null;
SF.gsItems = null;
if (A.i >= C.steps.length) {
S.done[A.id] = 1;
S.act = null;
gsSave();
GS.wait = gsClock() + 9;
GS.freeAt = Date.now() + 8000;
sbTone(659, 0.2);
setTimeout(function () { sbTone(880, 0.35); }, 200);
sbSay((say ? say + " " : "") + "<b>Chapter done: " + sbEsc(C.n) + ".</b> " + sbEsc(C.end || ""));
return;
}
gsSave();
sbTone(587, 0.12);
sbSay((say ? say + " " : "") + "<b>" + sbEsc(C.n) + ":</b> next, " + sbEsc(gsLine(C.steps[A.i])) + ".");
},
function (side, i, x, z, o) {
var kind = side === "hollow" ? (i % 3 === 2 ? "raider" : "acolyte") : side === "concord" ? "hunter" : side === "warden" ? "acolyte" : (i % 3 === 2 ? "hunter" : "raider");
var F = wdSpawn(kind, x, z, Object.assign({ alert: 1 }, o || {}));
if (side === "warden")
wdTintFoe(F, [0x4A9AFF, 0xDCE6FF, 0x40E0B0][i % 3], (o && o.name) || "A Warden of the Order");
if (side === "concord" && !(o && o.name))
F.name = "A Concord marshal";
F.gs = 1;
return F;
},
function (C, P, n, boss) {
var list = [], side = C.f;
if (boss) {
var B = gsFoe(side, 0, P.at[0], P.at[1] - 4, { name: boss[0], hp: boss[1], boss: 1 });
B.T = Object.assign({}, B.T, { spd: 4.4, dmg: 13, cool: 0.9 });
if (B.g)
B.g.scale.setScalar(1.1);
list.push(B);
}
for (var i = 0; i < n; i++)
list.push(gsFoe(side, i + (boss ? 1 : 0), P.at[0] + (i - n / 2) * 3, P.at[1] + 8 + (i % 2) * 3));
if (wdGet().blade && !WD.drawn)
try {
wdDraw(true);
}
catch (e) { }
return list;
},
function (C, big, n) {
HOL.noCC = 1;
try {
sbStrike({ why: "saga", ahead: 700, n: n, gunship: true });
}
finally {
HOL.noCC = 0;
}
var B = SB.battle;
if (!B)
return null;
B.hl = "gs";
B.gs = 1;
for (var i = 0; i < big; i++)
sbSpawn("marauder", B.c.clone().add(new THREE.Vector3((i - 0.5) * 260, 40, -200)), "foe");
if (C.f === "hollow") {
SB.foes.forEach(hlTint);
B.foeName = "The Hollow";
}
else if (C.f === "concord" || C.f === "warden") {
SB.foes.forEach(function (F) { wdConcordTint(F); F.name = C.f === "warden" ? "A Warden ship" : "A Concord cutter"; });
B.foeName = C.f === "warden" ? "Warden ships" : "The Concord";
}
else
B.foeName = "Raiders";
if (wdHollow())
for (var j = 0; j < 2; j++) {
var A = sbSpawn("ally", SP.pos.clone().add(new THREE.Vector3((j - 0.5) * 90, 30, 120)), "ally", "Hollow wing");
if (A)
hlTint(A);
}
B.n = SB.foes.length;
return B;
},
function (A, st, P) {
var R = wRand(A.id.length * 41 + A.i * 7), list = [], col = st[5] || 0xFFE8A0, m = mmMat(col, { glow: 1 }), G = WORLDS.surface.g;
for (var i = A.n; i < st[3]; i++) {
var a = R() * 6.28, d = 10 + R() * 22, x = P.at[0] + Math.cos(a) * d, z = P.at[1] + Math.sin(a) * d, y = (GX_OUT[st[1]].water ? 0.8 : sfHeight(x, z)) + 0.6, g = mmG(G, x, y, z);
gsItemMesh(g, st[4], col);
list.push({ x: x, z: z, m: g, y: y });
}
SF.gsItems = { id: A.id, i: A.i, list: list };
},
function (dt) {
GS.tick += dt;
if (GS.tick < 0.4)
return;
var T = GS.tick;
GS.tick = 0;
var S = gsGet(), onSurf = WLD.on === "surface" && SF.k && GX_OUT[SF.k] ? SF.k : null, inSys = frIn() ? FR.sys : null;
if ((onSurf || inSys) && (S.act || S.gate || hlGet().step < 9) && Date.now() - GS.lastIn < 45000) {
S.t = (S.t || 0) + T;
GS.saveT += T;
if (GS.saveT > 15) {
GS.saveT = 0;
gsSave();
}
}
if (S.gate && S.gate.n >= 6 && S.gate.h !== (wdHollow() ? 1 : 0)) {
S.gate = null;
if (S.act && !S.act.free && /^[wh]/.test(S.act.id))
S.act = null;
gsSave();
}
if (S.gate && wdHollow() && !HOL.hhSky) {
HOL.hhSky = 1;
GS.heldSky = 1;
}
if (S.gate && !S.act && gsClock() > GS.wait) {
var nx = gsNext(gsKey(S.gate.n, S.gate.h));
if (nx)
gsBegin(nx);
else if (gsReady(S.gate))
gsOpen();
else if (!GS.toldT || gsClock() - GS.toldT > 300) {
GS.toldT = gsClock();
sbSay("<b>The galaxy turns slowly.</b> The next turning point of the story is not ready yet (story time " + gsHrs(S.t || 0) + " of " + gsHrs(gsNeed(S.gate)) + "). Meanwhile: " + sbEsc(gsIdea()) + ".");
}
}
if (onSurf === "aurelion" && SF.senPods && !SF.hlVennGone && hlGet().step >= 6) {
var P0 = SF.senPods.filter(function (x) { return x.S.hollow; })[0];
if (P0 && P0.who && P0.who.parent) {
P0.who.parent.remove(P0.who);
SF.hlVennGone = 1;
}
}
if (!S.act && !S.gate && Date.now() > (GS.freeAt || 0)) {
var nf = gsNextFree();
if (nf) {
GS.freeAt = Date.now() + 9000;
gsBegin(nf, 1);
return;
}
}
var A = S.act;
if (!A)
return;
var C = GS_CH[A.id], st = C && C.steps[A.i];
if (!st)
return;
var k = st[0], L = onSurf ? worldLocal() : null;
if (k === "gather" && (A.n || 0) >= st[3])
return gsStep();
if (k === "land" && onSurf === st[1])
return gsStep("You have landed on " + sbEsc((gxBody(st[1]) || {}).name || st[1]) + ".");
if (k === "gift" && wdGet().gifts[st[1]])
return gsStep("<b>" + sbEsc(WD_GIFTS[st[1]].name) + "</b> is yours.");
if (k === "allies") {
var al = Object.keys(FR_PEOPLES).filter(function (p) { var l = frLevel(p); return l === "Ally" || l === "Honoured"; }).length;
if (al >= st[1])
return gsStep("<b>" + al + " peoples count you an ally.</b>");
}
if (k === "fly" && inSys === st[1]) {
var b = gqSite(st[2]);
if (b && SP.pos.distanceTo(b.p) < b.r)
return gsStep("<b>" + sbEsc(b.name) + ".</b>");
}
if ((k === "win" || k === "waves") && inSys === st[1] && !SB.battle && !GX.jumping && !A.fight && gsClock() > GS.wait) {
A.fight = 1;
var wave = A.n || 0;
setTimeout(function () {
var A2 = gsGet().act;
if (!A2 || A2 !== A || SB.battle || !frIn() || FR.sys !== st[1]) {
A.fight = 0;
return;
}
var B = gsBattle(C, k === "waves" ? Math.min(2, wave) : 0, k === "waves" ? 4 + wave * 2 : 5);
if (!B) {
A.fight = 0;
return;
}
if (k === "waves")
sbSay("<b>Wave " + (wave + 1) + " of " + st[2] + ".</b>");
}, 3000);
}
if (onSurf && onSurf === st[1] && (k === "visit" || k === "gather" || k === "foes" || k === "hold" || k === "duel")) {
var P = gsPlace(st[1], st[2]);
if (!P)
return gsStep();
var d = Math.hypot(L.x - P.at[0], L.z - P.at[1]);
if (k === "visit" && d < 14)
return gsStep("<b>" + sbEsc(P.n) + ".</b>");
if (k === "gather") {
if (!SF.gsItems || SF.gsItems.id !== A.id || SF.gsItems.i !== A.i)
gsItems(A, st, P);
SF.gsItems.list.forEach(function (it) { if (!it.got && Math.hypot(L.x - it.x, L.z - it.z) < 2.2) {
it.got = 1;
if (it.m.parent)
it.m.parent.remove(it.m);
A.n++;
gsSave();
sbTone(784, 0.08);
sbSay("<b>" + A.n + " of " + st[3] + "</b> " + sbEsc(st[4]) + ".");
} });
if (A.n >= st[3])
return gsStep();
}
var mine = SF.gsFoes && SF.gsFoes.id === A.id && SF.gsFoes.i === A.i;
if (k === "foes") {
if (!mine && d < 45) {
SF.gsFoes = { id: A.id, i: A.i, list: gsSpawnWave(C, P, st[3]) };
sbSay("<b>There they are.</b> " + sbEsc(st[4]) + ".");
}
else if (mine && SF.gsFoes.list.every(function (F) { return F.yield; }))
return gsStep("<b>They yield.</b>");
}
if (k === "hold") {
if (!mine && d < 45) {
A.w = 0;
SF.gsFoes = { id: A.id, i: A.i, list: gsSpawnWave(C, P, 3) };
sbSay("<b>Hold!</b> " + sbEsc(st[4]) + ". <b>Wave 1 of " + st[3] + ".</b>");
}
else if (mine && !SF.gsFoes.next && SF.gsFoes.list.every(function (F) { return F.yield; })) {
A.w = (A.w || 0) + 1;
if (A.w >= st[3])
return gsStep("<b>The last of them yield. You held.</b>");
SF.gsFoes.next = 1;
sbSay("<b>More are coming.</b> Wave " + (A.w + 1) + " of " + st[3] + ".");
setTimeout(function () { if (!SF.gsFoes || SF.gsFoes.id !== A.id)
return; SF.gsFoes.list = gsSpawnWave(C, P, 3 + A.w * 2); SF.gsFoes.next = 0; }, 5000);
}
}
if (k === "duel") {
if (!mine && d < 55) {
SF.gsFoes = { id: A.id, i: A.i, list: gsSpawnWave(C, P, 3, [st[3], st[4]]) };
sbSay("<b>" + sbEsc(st[3]) + "</b> steps out to meet you, with guards at their back. " + ["\"You should not have come.\"", "\"At last. A real fight.\"", "\"Turn round. Last chance.\""][A.i % 3]);
}
else if (mine && SF.gsFoes.list[0].yield && SF.gsFoes.list.every(function (F) { return F.yield; }))
return gsStep("<b>" + sbEsc(st[3]) + " yields.</b>");
}
}
},
function () {
var s = vqStep(), L = worldLocal();
if (!s)
return "<div style='color:#9AE0B0'>✓ Veyar quest done: the Veyari count you as " + frLevel("veyari").toLowerCase() + ". More waits in the Reach: the Tullik of Tullimar, the Ondai of Maru-Ondo, the Archive of Orr (chart, M).</div>";
var dx = VQ_ILUN[0] - L.x, dz = VQ_ILUN[1] - L.z, d = Math.round(Math.hypot(dx, dz));
var head = "<b>★ Veyar quest, step " + s + " of 3:</b> ";
if (s === 1)
return "<div style='color:#FFD98A'>" + head + "speak with Ilun of the Veyari, at the foot of the crystal towers · " + (d > 5 ? d + " m " + vqArrow(dx, dz) : "<b>press E</b>") + "</div>";
if (s === 3)
return "<div style='color:#FFD98A'>" + head + "you have the Lantern's reading: give it to Ilun · " + (d > 5 ? d + " m " + vqArrow(dx, dz) : "<b>press E</b>, then ✓ Give them what you found") + "</div>";
var lx = 8 - L.x, lz = 6 - L.z, ld = Math.round(Math.hypot(lx, lz));
return "<div style='color:#FFD98A'>" + head + "Ilun asks you to find the Sael Lantern, an old Veyari beacon out in the Reach, and scan it. It is not on Veyar: walk to your lander" + (ld > 7 ? " (" + ld + " m " + vqArrow(lx, lz) + ")" : "") + ", take off, press <b>M</b> and choose ✦ The Sael Lantern, then <b>E</b> to scan it and come back.</div>";
},
function () {
var s = vqStep(), site = (SF.sites || []).filter(function (x) { return x.frLead && x.frLead.p === "veyari"; })[0];
var L = worldLocal();
if (site && s !== 2 && wNear(L.x, L.z, site.x, site.z, 6))
return frLeaderCard(site);
sbSay(s === 0 ? "<b>Veyar quest done.</b> More waits in the Reach: open the chart with <b>M</b>." : s === 2 ? "<b>Light on your path.</b> Find the Sael Lantern out in the Reach: walk to your lander, take off, press <b>M</b> and choose ✦ The Sael Lantern." : "<b>Follow the ★ on the banner</b> to Ilun, under the pillar of light, and press <b>E</b>.");
},
function () {
if (VQ_QST || typeof QST_LIST === "undefined" || typeof qstAdd !== "function")
return;
VQ_QST = 1;
var onV = function () { return typeof WLD !== "undefined" && WLD.on === "surface" && typeof SF !== "undefined" && SF.k === "veyar"; };
QST_LIST.forEach(function (E) { if (E.id !== "gx")
return; var w0 = E.w; E.w = function () { return onV() ? ["space", "station"] : (typeof w0 === "function" ? w0() : w0); }; });
qstAdd({ id: "vq", w: function () { return onV() ? "surface" : "-"; }, icon: "🔆", t: "Light on your path (the Veyar quest)", look: "star", open: "vqOpen",
state: function () {
var s = vqStep();
if (!s)
return { st: 2 };
return { st: s === 1 ? 0 : 1, h: s === 2 ? "Find the Sael Lantern out in the Reach and scan it: walk to your lander, take off, M, ✦ The Sael Lantern." : "Bring the Lantern's reading to Ilun, under the pillar of light." };
},
start: "Ilun of the Veyari waits at the foot of the crystal towers, under the pillar of light. Follow the ★ on the banner and press E." });
},
function () {
var o = FR.disc && FR.disc.wreck;
if (!o)
return null;
if (WRH.glow && WRH.glow.parent === o)
return WRH.glow;
if (WRH.glow && WRH.glow.parent)
WRH.glow.parent.remove(WRH.glow);
var g = new THREE.Group(), a = wGlow(0xFF3A2A, 2400, 0), b = wGlow(0xFFB090, 520, 0);
g.add(a);
g.add(b);
g.userData.s = [[a, 0.75], [b, 1]];
o.add(g);
WRH.glow = g;
return g;
},
function (dt) {
if (!FR.g)
return;
var want = FR.in && wrhWant();
if (want)
WRH.t += dt;
var on = want && WRH.t > 60;
if (on && WRH.said < 1) {
WRH.said = 1;
sbSay("<b>A faint ping on your scanner</b>, from behind the Far Gate, out away from the two suns. Something there is still sending.");
}
if (on && WRH.t > 240 && WRH.said < 2) {
WRH.said = 2;
sbSay("The ping again: turn your back on the suns at the Far Gate and look for a dim red light. It is not far.");
}
if (FR.in)
WRH.inT = (WRH.inT || 0) + dt;
else
WRH.inT = 0;
var lit = FR.in && WRH.inT > 3, o = FR.disc && FR.disc.wreck, near = 1;
if (lit && o && typeof camera !== "undefined") {
try {
var p = new THREE.Vector3();
o.getWorldPosition(p);
near = Math.max(0.33, Math.min(1, camera.position.distanceTo(p) / 3000));
}
catch (e) { }
}
WRH.a += ((lit ? near : 0) - WRH.a) * Math.min(1, dt * 0.5);
if (o && (WRH.a > 0.01 || WRH.glow)) {
var g = wrhGlow();
if (g) {
g.visible = WRH.a > 0.01;
g.userData.s.forEach(function (q) { q[0].material.opacity = q[1] * WRH.a; });
}
}
},
function () {
var now = Date.now();
SCN.recent = SCN.recent.filter(function (t) { return now - t < 120000; });
var p = Math.min(0.7, 0.25 + 0.15 * SCN.recent.length);
SCN.recent.push(now);
try {
if (SB.battle || !SB.cfg.on || sbAU() < 1.6)
return;
var S = typeof gxSys === "function" ? gxSys() : null;
if (S && S.safe)
return;
}
catch (e) {
return;
}
if (Math.random() >= p)
return;
var t = 10 + Math.random() * 15;
if (SB.strikeAt > t)
SB.strikeAt = t;
setTimeout(function () { if (!SB.battle)
sbSay("⚠️ <b>Your scan carried.</b> Something out in the dark heard it, and it is coming this way."); }, 1600);
},
function () {
var now = Date.now();
if (now - SCN.at < 1200)
return;
SCN.at = now;
try {
sbTone(1180, 0.08);
setTimeout(function () { sbTone(1480, 0.1); }, 110);
}
catch (e) { }
var near = FR && FR.in ? FR.near : null;
scnRisk();
if (near && near.disc) {
frScan(near.disc);
return;
}
var n = scnNearestNew();
if (n) {
var km = n.d / 1000;
sbSay("📡 <b>Scanner:</b> a faint return, about " + (km < 1 ? Math.max(100, Math.round(n.d / 100) * 100) + " m" : (km < 10 ? km.toFixed(1) : Math.round(km)) + " km") + " away. Something out there has not been logged yet.");
return;
}
sbSay("📡 <b>Scanner:</b> nothing new in range.");
},
function () {
var cur = trSeason();
if (TRH.s && TRH.s.season === cur)
return TRH.s;
if (!TRH.s) {
try {
TRH.s = JSON.parse(localStorage.getItem("sb.tr") || "null");
}
catch (e) { }
}
TRH.s = TRH.s || { c: {}, p: 0 };
TRH.s.c = TRH.s.c || {};
TRH.s.p = +TRH.s.p || 0;
if (TRH.s.season !== cur) {
TRH.s = { c: {}, p: 0, season: cur, last: TRH.s.season || null };
try {
localStorage.setItem("sb.tr", JSON.stringify(TRH.s));
}
catch (e) { }
}
return TRH.s;
},
function (kind) {
var g = new THREE.Group();
if (kind === "cache") {
var dark = wM(0x3A3026), gold = wM(0xC8A050, { e: 0x4A3410 });
wBox(7, 4.4, 4.6, dark, 0, 0, 0, g);
wBox(7.3, 1.1, 4.9, gold, 0, 1.7, 0, g);
wBox(7.3, 0.7, 4.9, gold, 0, -1.6, 0, g);
wBox(1.1, 4.7, 4.9, gold, -2.8, 0, 0, g);
wBox(1.1, 4.7, 4.9, gold, 2.8, 0, 0, g);
wBox(1.4, 1.6, 0.6, gold, 0, 0.4, 2.5, g);
var l = wGlow(0xFFC870, 46, 0);
g.add(l);
g.userData.lamp = l;
g.userData.lop = 0.85;
g.userData.spin = 0.06;
}
else {
var case_ = wM(0x4A4458), band = wM(0xB8A0FF, { e: 0x3A2A7A });
var c = wMesh(new THREE.CylinderGeometry(1.8, 1.8, 9, 14), case_, 0, 0, 0, g);
c.rotation.z = Math.PI / 2;
[-3.6, 0, 3.6].forEach(function (x) { var r = wMesh(new THREE.TorusGeometry(1.9, 0.35, 6, 16), band, x, 0, 0, g); r.rotation.y = Math.PI / 2; });
var l2 = wGlow(0xC8A8FF, 70, 0);
g.add(l2);
g.userData.lamp = l2;
g.userData.lop = 0.9;
g.userData.spin = 0.04;
}
g.rotation.set(0.4, 0.3, 0.2);
return g;
},
function (dt) {
var G = sbG();
if (!G || !sbHere())
return;
if (!TRH.g || TRH.g.parent !== G) {
TRH.g = new THREE.Group();
G.add(TRH.g);
TRH.objs = {};
}
var here = trHere(), keep = {};
TRH.near = null;
var best = 1e9;
here.forEach(function (h) {
var id = h.kind === "piece" ? "p" + h.o.n : h.o.id, p = trPos(h.o), d = SP.pos.distanceTo(p);
if (d > 5000)
return;
keep[id] = 1;
var o = TRH.objs[id];
if (!o) {
o = trBuild(h.kind);
o.position.copy(p);
TRH.g.add(o);
TRH.objs[id] = o;
}
o.rotation.y += dt * o.userData.spin;
var want = d < 1500 ? o.userData.lop * Math.min(1, (1500 - d) / 400) : 0, m = o.userData.lamp.material;
m.opacity += (want - m.opacity) * Math.min(1, dt * 0.8);
if (d < 140 && d < best) {
best = d;
TRH.near = { kind: h.kind, o: h.o, id: id };
}
});
Object.keys(TRH.objs).forEach(function (id) { if (keep[id])
return; var o = TRH.objs[id]; TRH.g.remove(o); o.traverse(function (x) { if (x.geometry && x.geometry.dispose && !(x.geometry.userData && x.geometry.userData.shared))
x.geometry.dispose(); }); delete TRH.objs[id]; });
},
function () {
try {
if (SB.battle || !SB.cfg.on || sbAU() < 1.6)
return;
var S = typeof gxSys === "function" ? gxSys() : null;
if (S && S.safe)
return;
}
catch (e) {
return;
}
var t = 12 + Math.random() * 10;
if (SB.strikeAt > t)
SB.strikeAt = t;
setTimeout(function () { if (!SB.battle)
sbSay("⚠️ <b>Raiders on your scope.</b> Others hunt Saffa Morrow's hoard too, and they saw you lift the case."); }, 2600);
},
function (N) {
var S = trGet();
if (!N)
return;
if (N.kind === "cache") {
if (S.c[N.o.id])
return;
S.c[N.o.id] = Date.now();
trSave();
try {
sbTone(660, 0.12);
setTimeout(function () { sbTone(880, 0.18); }, 140);
}
catch (e) { }
var first = Object.keys(S.c).length === 1;
var lv = N.o.sys === "sol" ? 8 : N.o.sys === "reach" ? 14 : 20;
if (typeof dglTake === "function")
dglTake("world", 1, { src: "champ", lv: lv, theme: "space", where: "a corsair's cache in " + (TR_NAMES[N.o.sys] || "space") }, "🪙 A corsair's cache");
else
sbSay("🪙 <b>A corsair's cache</b>, broken open. Its gold is long gone.");
if (first)
setTimeout(function () { sbSay("Inside the lid, scratched by a knife: <b>S.M.</b> and a hundred tiny suns. Saffa Morrow's mark. Your Star Log has the old legend now (🗺️ Legends)."); }, 3500);
return;
}
var P = N.o;
if (S.p !== P.n - 1)
return;
S.p = P.n;
trSave();
if (sbSigned())
sbRpc("tr_piece", { p_n: P.n }).then(function (r) { if (r && r.ok === false && r.say && trGet().p === P.n) {
trGet().p = P.n - 1;
trSave();
sbSay("The case slips from your grapple and drifts off: " + sbEsc(r.say) + " Try again in a moment.");
} }).catch(function () { });
if (P.n === 7 && typeof gxLearn === "function")
gxLearn("halcyra");
try {
sbTone(523, 0.16);
setTimeout(function () { sbTone(659, 0.16); }, 160);
setTimeout(function () { sbTone(784, 0.26); }, 320);
}
catch (e) { }
var h = "<div style='font:600 17px var(--serif,Georgia);color:#E0D0FF'>🗺️ Piece " + P.n + " of 7 of Saffa Morrow's chart</div>" +
"<div style='opacity:.85;margin:6px 0'>Rolled tight in the case, a torn strip of star chart, and on its back a verse in a sailor's hand:</div>" +
"<div style='font:italic 15px var(--serif,Georgia);line-height:1.55;white-space:pre-line;color:#F4EEFF;margin:8px 0'>" + sbEsc(P.n < 7 ? TRH_PIECES[P.n].verse : P.verse) + "</div>" +
(P.n < 7 ? "<div style='opacity:.75;font-size:12px'>That is where the next piece lies (" + sbEsc(TR_NAMES[TRH_PIECES[P.n].sys]) + "). Every verse is kept in your Star Log, 🗺️ Legends.</div>"
: "<div style='margin-top:8px;color:#FFE7A0'>" + sbEsc(TR_END) + "</div>");
worldCard(h, {});
if (P.n > 1)
trRaiders();
},
function () {
var S = trGet(), n = Object.keys(S.c).length;
var h = "<div style='font:600 17px var(--serif,Georgia);color:#E0D0FF'>🗺️ Legends</div>" +
"<div style='font:600 14px var(--serif,Georgia);color:#FFE7B0;margin-top:8px'>The Corsair of a Hundred Suns</div>" +
"<div style='opacity:.88;margin:4px 0 8px'>" + sbEsc(TR_OPEN) + "</div>" +
"<div style='font:italic 14px var(--serif,Georgia);line-height:1.5;white-space:pre-line;color:#F4EEFF;border-left:2px solid #8A70D8;padding-left:10px;margin:6px 0'>" + sbEsc(TRH_PIECES[0].verse) + "</div>";
for (var i = 1; i <= S.p && i < 7; i++)
h += "<div style='font:italic 14px var(--serif,Georgia);line-height:1.5;white-space:pre-line;color:#F4EEFF;border-left:2px solid #8A70D8;padding-left:10px;margin:6px 0'>" + sbEsc(TRH_PIECES[i].verse) + "</div>";
h += "<div style='margin-top:8px'>Pieces of the chart: <b>" + S.p + " of 7</b>" + (S.p >= 7 ? ". The chart is whole." : "") + "</div>";
if (S.p >= 7)
h += "<div style='color:#FFE7A0;margin-top:4px'>" + sbEsc(TR_END) + "</div>";
h += "<div style='margin-top:6px;opacity:.85'>Corsairs' caches opened: <b>" + n + " of " + TR_CACHES.length + "</b>. They lie dark among the stars; a small lamp shows once you are close. From the pilot's seat, 📡 Scan hears them further off.</div>";
worldCard(h, {});
},
function (G, C, R, sol, hy) {
var lite = sbLite();
var stone = mmMat(0xB8A888, { tex: "worn", rep: 2 }), stone2 = mmMat(0x9A8A70, { tex: "worn" }), slate = mmMat(0x4A5058, { shine: 20 }), wood = mmMat(0x6A4A2A, { tex: "worn" }), wood2 = mmMat(0x4A3420, { tex: "worn" });
var rock = mmMat(0x8A7258, { tex: "worn", rep: 4 }), vein = mmMat(0xD8B050, { shine: 90, glow: 0.06 }), brass = mmMat(0xC8A050, { shine: 70, tex: "brass" }), sail = mmMat(0xE8DCC0, { ds: true }), sea = mmMat(0x2A8AA0, { shine: 80 });
var cz = C[1] - 60, ch = 46;
for (var i = -7; i <= 7; i++) {
var x = C[0] + i * 16;
if (i === 0)
continue;
var h = ch + ((i * 37) % 11), y = hy(x, cz);
mmSlab(G, rock, 16.5, h, 10, x, y + h / 2 - 2, cz - 5, 0, (i % 3) * 0.03, 0);
for (var v = 0; v < 3; v++) {
var sy = hy(C[0], cz) + 9 + v * 10 + Math.sin(i * 1.7 + v) * 1.6;
mmSlab(G, vein, 16.6, 0.45 - v * 0.1, 0.2, x, sy + ((i + v) % 2 ? 0.4 : -0.4), cz + 0.12, 0, 0, ((i * 7 + v * 3) % 5 - 2) * 0.025);
}
for (var s = -8; s <= 8; s += 3)
sol.push({ x: x + s, z: cz - 1, r: 2.2 });
}
var dy = hy(C[0], cz);
mmSlab(G, rock, 16, ch - 9, 10, C[0], dy + 9 + (ch - 9) / 2 - 2, cz - 5);
[-5, 5].forEach(function (s) { mmCyl(G, stone, 1.1, 1.3, 9, C[0] + s, dy + 4.5, cz + 0.6, 0, 0, 0, 12); sol.push({ x: C[0] + s, z: cz + 0.6, r: 1.4 }); });
mmSlab(G, stone, 13, 1.6, 2.2, C[0], dy + 9.6, cz + 0.6);
for (var su = 0; su < 9; su++) {
mmEll(G, brass, 0.32, 0.32, 0.12, C[0] - 4.8 + su * 1.2, dy + 9.6, cz + 1.75, 10);
}
[-1, 1].forEach(function (s) { var d = mmG(G, C[0] + s * 4, dy, cz + 0.2, 0, s * 1.25, 0); mmSlab(d, wood2, 4, 8.6, 0.4, -s * 2, 4.3, 0); for (var b = 0; b < 3; b++)
mmSlab(d, brass, 4.1, 0.3, 0.5, -s * 2, 1.5 + b * 2.8, 0); mmTorus(d, brass, 0.4, 0.07, -s * 3.4, 4.2, 0.3); });
var vz = cz - 3, vd = 34, vw = 22;
mmSlab(G, stone2, vw, 0.4, vd, C[0], dy + 0.05, vz - vd / 2);
mmSlab(G, rock, vw + 2, 1.2, vd + 2, C[0], dy + 10, vz - vd / 2);
[-1, 1].forEach(function (s) { mmSlab(G, rock, 1.4, 10, vd, C[0] + s * (vw / 2 + 0.6), dy + 5, vz - vd / 2); for (var q = 0; q < vd; q += 2.5)
sol.push({ x: C[0] + s * (vw / 2 + 0.4), z: vz - q, r: 1.2 }); });
mmSlab(G, rock, vw + 2, 10, 1.4, C[0], dy + 5, vz - vd - 0.6);
for (var q2 = -vw / 2; q2 <= vw / 2; q2 += 2.5)
sol.push({ x: C[0] + q2, z: vz - vd - 0.2, r: 1.2 });
for (var l = 0; l < 4; l++) {
[-1, 1].forEach(function (s) { var lz = vz - 5 - l * 8; mmCyl(G, brass, 0.12, 0.18, 0.9, C[0] + s * (vw / 2 - 0.4), dy + 5, lz, 0, 0, 0, 8); mmEll(G, mmMat(0xFFC870, { glow: 1 }), 0.3, 0.38, 0.3, C[0] + s * (vw / 2 - 0.4), dy + 5.6, lz, 10); if (!lite)
mmGlow(G, 0xFFC870, 4, 0.45, C[0] + s * (vw / 2 - 0.7), dy + 5.6, lz); });
}
var gold = mmMat(0xF0C850, { shine: 95 }), gold2 = mmMat(0xD8A838, { shine: 85 }), gem = [mmMat(0xE83A5A, { shine: 95 }), mmMat(0x3AC88A, { shine: 95 }), mmMat(0x4A7AE8, { shine: 95 })];
var bz = vz - vd + 5;
for (var p = 0; p < (lite ? 5 : 9); p++) {
var a = p / 9 * Math.PI * 2, px = C[0] + Math.cos(a) * (5 + R() * 3), pz = bz + 2 + Math.sin(a) * 3.4, pr = 1.6 + R() * 1.4;
mmEll(G, p % 2 ? gold : gold2, pr, pr * 0.45, pr, px, dy + 0.3, pz, 14);
for (var c = 0; c < (lite ? 4 : 10); c++)
mmCyl(G, gold, 0.22, 0.22, 0.06, px + (R() - 0.5) * pr * 1.6, dy + 0.35 + R() * pr * 0.4, pz + (R() - 0.5) * pr * 1.6, R() * 1.5, 0, R() * 1.5, 10);
if (p % 3 === 0)
mmEll(G, gem[p % 3], 0.28, 0.28, 0.28, px, dy + pr * 0.45 + 0.3, pz, 8);
}
var sb = mmG(G, C[0], dy, bz);
mmSlab(sb, mmMat(0x1E1C22, { shine: 40 }), 3.4, 1.9, 2.2, 0, 1, 0);
mmSlab(sb, gold, 3.5, 0.25, 2.3, 0, 1.95, 0);
mmSlab(sb, gold, 0.3, 2, 2.3, -1.2, 1, 0);
mmSlab(sb, gold, 0.3, 2, 2.3, 1.2, 1, 0);
mmEll(sb, gold, 0.5, 0.5, 0.15, 0, 1.1, 1.15, 12);
if (!lite)
mmGlow(sb, 0xFFE0A0, 6, 0.35, 0, 2.4, 0);
sol.push({ x: C[0], z: bz, r: 2.2 });
HAL.box = [C[0], bz + 2.6];
HAL.door = [C[0], cz + 2];
for (var hI = 0; hI < (lite ? 8 : 14); hI++) {
var ha = Math.PI * (0.15 + hI / 14 * 0.7), hd = 34 + (hI % 3) * 9, hx = C[0] + Math.cos(ha) * hd * (hI % 2 ? 1 : -1), hz = C[1] + Math.sin(ha) * hd * 0.6 - 6, hyy = hy(hx, hz), w = 6 + R() * 2, dpt = 5 + R() * 2;
var H = mmG(G, hx, hyy, hz, 0, Math.atan2(C[0] - hx, C[1] - hz), 0);
mmSlab(H, stone, w, 3.6, dpt, 0, 1.8, 0);
[-1, 1].forEach(function (s2) { mmSlab(H, slate, w + 0.8, 0.22, dpt * 0.6, 0, 4.35, s2 * dpt * 0.24, s2 * 0.62, 0, 0); });
mmSlab(H, stone, w, 0.9, dpt * 0.05, 0, 3.95, 0);
mmSlab(H, wood2, 1.1, 2.2, 0.15, 0, 1.1, dpt / 2 + 0.05);
mmSlab(H, mmMat(0xFFD890, { glow: 0.6 }), 0.9, 0.8, 0.12, -w / 3, 2.2, dpt / 2 + 0.06);
mmSlab(H, mmMat(0xFFD890, { glow: 0.6 }), 0.9, 0.8, 0.12, w / 3, 2.2, dpt / 2 + 0.06);
sol.push({ x: hx, z: hz, r: Math.max(w, dpt) * 0.55 });
}
var T = mmG(G, C[0] - 14, hy(C[0] - 14, C[1] + 4), C[1] + 4);
mmSlab(T, wood, 12, 0.3, 2, 0, 1, 0);
for (var tl = 0; tl < 4; tl++) {
mmCyl(T, wood2, 0.12, 0.12, 1, -5.4 + tl * 3.6, 0.5, -0.8);
mmCyl(T, wood2, 0.12, 0.12, 1, -5.4 + tl * 3.6, 0.5, 0.8);
}
[-1, 1].forEach(function (s) { mmSlab(T, wood, 12, 0.2, 0.5, 0, 0.55, s * 1.5); });
sol.push({ x: C[0] - 14, z: C[1] + 4, r: 5 });
for (var lp = 0; lp < (lite ? 4 : 8); lp++) {
var la = lp / 8 * Math.PI * 2, lx = C[0] + Math.cos(la) * 22, lz2 = C[1] + Math.sin(la) * 16;
gxLamp(G, lx, hy(lx, lz2), lz2, 0xFFC870, 3.6);
}
var S = mmG(G, C[0] + 46, hy(C[0] + 46, C[1] + 30) - 0.8, C[1] + 30, 0.05, -0.6, 0.14);
var hull = mmMesh(new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wood2, 0, 2.4, 0, S);
hull.scale.set(4, 3, 16);
mmSlab(S, wood, 7.2, 0.3, 28, 0, 2.3, 0);
mmCyl(S, wood, 0.4, 0.5, 12, 0, 8, 2, 0.25, 0, 0);
mmCyl(S, wood, 0.3, 0.4, 5, 0, 4, -7);
var sl = mmMesh(new THREE.PlaneGeometry(7, 5), sail, 1.5, 6, 3, S);
sl.rotation.set(0.3, 0.4, 0.2);
for (var r = 0; r < 5; r++)
mmCyl(S, wood2, 0.08, 0.08, 4.2, (r - 2) * 1.3, 1.4, -15, 0.3, 0, 0);
sol.push({ x: C[0] + 46, z: C[1] + 30, r: 6 });
sol.push({ x: C[0] + 46 + 6, z: C[1] + 30 - 9, r: 5 });
sol.push({ x: C[0] + 46 - 6, z: C[1] + 30 + 9, r: 5 });
var w2 = mmMesh(new THREE.PlaneGeometry(900, 300), sea, C[0], hy(C[0], C[1] + 90) - 0.3 + 0.05, C[1] + 210, G);
w2.rotation.x = -Math.PI / 2;
for (var bt = 0; bt < (lite ? 3 : 6); bt++) {
var bx = C[0] - 60 + bt * 14, bz2 = C[1] + 58 + (bt % 2) * 4, b = mmG(G, bx, hy(bx, bz2), bz2, 0, 0.3 * bt, 0.1);
var bh = mmMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wood, 0, 0.9, 0, b);
bh.scale.set(1.3, 0.9, 3.6);
sol.push({ x: bx, z: bz2, r: 2.4 });
}
for (var n = 0; n < (lite ? 3 : 6); n++) {
var nx = C[0] - 40 + n * 9, nz = C[1] + 40;
mmCyl(G, wood2, 0.08, 0.08, 2.4, nx, hy(nx, nz) + 1.2, nz);
mmCyl(G, wood2, 0.08, 0.08, 2.4, nx + 4, hy(nx + 4, nz) + 1.2, nz);
var net = mmMesh(new THREE.PlaneGeometry(4, 1.8), mmMat(0x8A7A5A, { ds: true, op: 0.75 }), nx + 2, hy(nx, nz) + 1.4, nz, G);
}
var trunk = mmMat(0x8A6A48, { tex: "worn" }), frond = mmMat(0x3A8A3A, { ds: true });
for (var pm = 0; pm < (lite ? 8 : 18); pm++) {
var pa2 = R() * Math.PI * 2, pd = 60 + R() * 120, px2 = C[0] + Math.cos(pa2) * pd, pz2 = C[1] + 30 + Math.sin(pa2) * pd * 0.5;
if (pz2 < cz + 10)
continue;
var ph = 6 + R() * 4, P = mmG(G, px2, hy(px2, pz2), pz2, 0.08, R() * 6, 0.05);
mmCyl(P, trunk, 0.18, 0.28, ph, 0, ph / 2, 0, 0, 0, 0, 8);
for (var f = 0; f < 6; f++) {
var fr = mmMesh(new THREE.PlaneGeometry(0.9, 4), frond, 0, ph, 0, P);
fr.rotation.set(-1.0, f / 6 * Math.PI * 2, 0);
fr.translateY(1.8);
}
sol.push({ x: px2, z: pz2, r: 0.5 });
}
},
function (r) {
if (!r || !r.finders || !r.finders.length)
return "<div style='opacity:.8;margin-top:6px'>The book of finders has no name in it yet.</div>";
return "<div style='margin-top:8px;font:600 13px var(--serif,Georgia);color:#FFE7B0'>The book of finders</div>" + r.finders.map(function (f) { return "<div style='font-size:13px'>" + sbEsc(trSeasonName(f.season)) + ": <b>" + sbEsc(f.name) + "</b> <span style='opacity:.7'>(" + sbEsc(halDate(f.at)) + (f.won ? ", " + f.won + " siege" + (f.won > 1 ? "s" : "") + " beaten" : "") + (f.took ? ", taken by siege" : "") + (f.lost ? ", " + (f.how === "unanswered" ? "fell to a siege nobody came to" : f.how && f.how.indexOf("taken by") === 0 ? sbEsc(f.how) : "fell to a siege") : ", holds it still") + ")</span></div>"; }).join("");
},
function (site) {
var T = FR_TOWN.halcyra.leader, S = trGet(), fns = {};
var h = worldFacts(T.name, T.title + " · the Keepers of Halcyra", [], []);
h += "<div style='margin:6px 0;opacity:.9'>\"" + sbEsc(T.greet) + "\"</div>";
h += "<div style='margin:6px 0'>You hold <b>" + S.p + " of 7</b> pieces of the chart this season (" + sbEsc(trSeasonName()) + "). The season turns on " + sbEsc(halDate(halNext())) + ".</div>";
h += "<div id='hal-st' style='opacity:.85'>" + (sbSigned() ? "Brannoc opens the book of finders…" : "Sign in, and the Keepers will write your name if you are first.") + "</div>";
h += worldBtn("talk", "💬 Talk with him", "He answers in his own words");
fns.talk = function () { worldCard(null); wTalk({ name: T.name, persona: T.persona, greet: T.greet }); };
worldCard(h, fns);
halStatus().then(function (r) {
var el = document.getElementById("hal-st");
if (!el)
return;
if (!r) {
if (sbSigned())
el.textContent = "The book of finders is at the vault-watch's house just now.";
return;
}
if (r.missing) {
el.textContent = "The book of finders is not open yet (the Keeper still has to run the latest server update).";
return;
}
el.innerHTML = halHoldLine(r) + (r.found && r.v ? worldBtn("hw", "🏰 Halcyra at war", "The shield, the guns, the sieges") : "") + halFindersHtml(r);
var hb = el.querySelector("[data-w=hw]");
if (hb)
hb.onclick = function (e) { e.stopPropagation(); hwCard(); };
});
},
function () {
var S = trGet(), fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>🗝️ Saffa Morrow's strongbox</div>" +
"<div style='margin:6px 0;opacity:.9'>Black iron bound in gold, the hundred suns on its lid. Seven slots in the lock, each the shape of a torn strip of chart.</div>";
if (S.p < 7) {
h += "<div>You hold " + S.p + " of 7 pieces. The lock will not turn.</div>";
worldCard(h, {});
return;
}
if (!sbSigned()) {
h += "<div>The Keepers write the finder's name in their book: sign in first.</div>";
worldCard(h, {});
return;
}
h += worldBtn("open", "🗝️ Fit the seven pieces", "The first this season opens the hoard");
fns.open = function () { worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFE7A0'>The pieces slide home, one by one…</div>", {}); halClaim(); };
worldCard(h, fns);
},
function () {
sbRpc("tr_claim", {}).then(function (r) {
r = r || {};
if (r.first) {
var S = trGet();
S.found = r.season;
trSave();
try {
sbTone(523, 0.2);
setTimeout(function () { sbTone(659, 0.2); }, 200);
setTimeout(function () { sbTone(784, 0.2); }, 400);
setTimeout(function () { sbTone(1046, 0.45); }, 600);
}
catch (e) { }
worldCard("<div style='font:600 18px var(--serif,Georgia);color:#FFE7A0'>👑 Saffa Morrow's hoard</div><div style='margin:8px 0'>The lid swings up. Gold, gems, a captain's coat stiff with gold thread, and on top a letter in her hand: <i>\"To whoever brings my chart home: it was never the gold. It was the finding. Take what you can carry, and leave the rest for next year's fool.\"</i></div><div>Old Brannoc writes your name in the book of finders: <b>" + sbEsc(r.name || "") + "</b>, " + sbEsc(trSeasonName(r.season)) + ". Halcyra is yours to hold.</div>" + (r.gold > 0 ? "<div style='margin-top:6px;font-size:16px'>🪙 <b>" + Number(r.gold).toLocaleString() + " gold</b> into your purse.</div>" : "") + "<div style='margin-top:6px;color:#FFB070'>Word travels. A planet full of treasure draws fleets: the first siege comes about " + sbEsc(halDate(r.next_siege)) + " " + sbEsc(halTime(r.next_siege)) + ". Keep its shield fed at the shield house in the cove, and break every siege, or it falls. Anyone may come for it, whenever they like.</div>", {});
HAL.at = 0;
setTimeout(function () { if (typeof dglTake === "function")
dglTake("world", 1, { src: "boss", lv: 30, theme: "space", where: "Saffa Morrow's hoard, Halcyra" }, "👑 Saffa Morrow's hoard"); }, 6000);
setTimeout(function () { if (typeof dglTake === "function")
dglTake("world", 1, { src: "champ", lv: 30, theme: "space", where: "Saffa Morrow's hoard, Halcyra" }, "👑 More of the hoard"); }, 20000);
return;
}
if (r.mine) {
worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFE7A0'>🗝️ The strongbox</div><div style='margin-top:6px'>It is open, and empty but for her letter. You hold Halcyra: keep it.</div>", {});
return;
}
if (r.by) {
worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFB070'>🗝️ Too late</div><div style='margin-top:6px'>The lock turns on nothing. <b>" + sbEsc(r.by) + "</b> brought the chart first, " + sbEsc(halDate(r.at)) + ", and holds Halcyra. Brannoc shrugs: \"Every holder falls to a siege in the end. When they do, the box is yours, if you still have the whole chart.\"</div>", {});
return;
}
worldCard("<div style='font:600 16px var(--serif,Georgia);color:#FFB070'>🗝️ The lock holds</div><div style='margin-top:6px'>" + sbEsc(r.say || "The pieces do not fit.") + "</div>", {});
}).catch(function (e) { worldCard("<div style='font:600 16px var(--serif,Georgia)'>🗝️ The lock holds</div><div style='margin-top:6px'>" + (sbMissing(e) ? "The Keepers' book is not open yet (the latest server update still has to be run)." : "The Keepers cannot reach their book just now. Try again soon.") + "</div>", {}); });
},
function () {
var g = new THREE.Group(), ivory = mmMat(0xF2EADA, { shine: 85, tex: "plate" }), gold = mmMat(0xE0B850, { shine: 95 }), glass = mmMat(0x3A5A7A, { shine: 98, op: 0.85 }), sailM = mmMat(0xFFE6B0, { glow: 0.35, op: 0.6, ds: true });
mmFlat(g, ivory, [[0, -10], [1.3, -6], [1.9, 0], [1.6, 5], [-1.6, 5], [-1.9, 0], [-1.3, -6]], 1.3, 0, 0, 0, Math.PI / 2, 0, 0);
mmSlab(g, gold, 0.25, 0.3, 15, 0, 0.72, -1.5);
mmEll(g, glass, 0.8, 0.6, 2.0, 0, 0.95, -4.2, 14);
[-1, 1].forEach(function (s) {
mmFlat(g, ivory, [[0, -2], [s * 7.5, 3.6], [s * 7.8, 5.2], [0, 4.6]], 0.35, 0, -0.1, 0, Math.PI / 2, 0, 0);
mmSlab(g, gold, 0.15, 0.2, 6.6, s * 3.9, 0.12, 1.6, 0, s * 0.95, 0);
sbEngine(g, gold, 0xFFD890, 0.55, s * 2.1, 0, 5.6, 1.4);
var sl = mmMesh(new THREE.PlaneGeometry(3.2, 5.4), sailM, s * 4.6, 2.6, 1.2, g);
sl.rotation.set(0, 0, s * 0.35);
mmCyl(g, gold, 0.06, 0.06, 5.6, s * 3.7, 2.4, 1.2, 0, 0, s * 0.35);
});
sbEngine(g, gold, 0xFFD890, 0.75, 0, 0.2, 6.2, 1.6);
return g;
},
function () {
var S = trGet(), D = SB_SHIPS.sunwake;
if (sbOwns("sunwake")) {
worldCard(worldFacts(D.name, "Yours. She flies from your Ships list.", [["Hull", String(D.hull)], ["Shields", String(D.shield)], ["Guns", D.gun]], [D.about]), {});
return;
}
var head = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>☀️ The Sunwake</div><div style='margin:6px 0'>Ivory and gold under the cloth, sails of light folded along her back. On her bow, small: <i>S.M.</i> and a hundred suns. Saffa Morrow's own ship.</div>";
var r = HAL.st;
if (!sbSigned()) {
worldCard(head + "<div>The Keepers' chains hold her fast. (Sign in: only the one who holds the hoard may take her.)</div>", {});
return;
}
if (!r || !r.mine) {
halRefresh(true);
worldCard(head + "<div>The Keepers' chains hold her fast, and their lock has the hundred suns on it. Only the one who holds Saffa Morrow's hoard may take her.</div>", {});
return;
}
worldCard(head + worldBtn("take", "⛓️ Strike the chains", "The holder of the hoard may take her"), { take: function () {
S.ship = Date.now();
trSave();
try {
localStorage.setItem("sb.sunwake", "1");
}
catch (e) { }
try {
sbTone(659, 0.2);
setTimeout(function () { sbTone(988, 0.35); }, 200);
}
catch (e) { }
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>☀️ The Sunwake is yours</div><div style='margin-top:6px'>The chains fall. Her sails wake, faint gold, as if she knew. She flies from your <b>Ships</b> list, out in space: hull " + D.hull + ", shields " + D.shield + ", " + sbEsc(D.gun) + ". She stays yours even if Halcyra falls.</div>", {});
} });
},
function (r) {
if (!r || !r.sieges || !r.sieges.length)
return "No fleet besieges Halcyra just now.";
return r.sieges.map(function (s) {
var p = Math.max(0, Math.round(s.power)), p0 = Math.max(1, Math.round(s.power0 || s.power));
return (s.kind === "raiders" ? "🏴‍☠️ " : "⚔️ ") + "<b>" + sbEsc(s.by || "A fleet") + "</b>" + (s.mine ? " (yours)" : "") + ": power " + p + " of " + p0 + ", since " + sbEsc(halTime(s.at));
}).join("<br>");
},
function (v) {
v = Math.max(0, Math.min(100, +v || 0));
var col = v > 60 ? "#7AD0FF" : v > 30 ? "#FFD070" : "#FF7A6A";
return "<div style='margin:6px 0 2px;font-size:13px'>🛡️ Planetary shield: <b>" + v.toFixed(0) + "%</b></div><div style='height:8px;border-radius:5px;background:rgba(255,255,255,.12);overflow:hidden'><div style='height:100%;width:" + v + "%;background:" + col + "'></div></div>";
},
function (r, where) {
if (!r || !r.found)
return "\"Nobody holds Halcyra this season. Others are looking, mind: hunters and raiders both. Keep your shields up.\"";
var h = "<b>" + sbEsc(r.by || "A dreamer") + "</b> holds Halcyra" + (r.took ? ", taken by siege," : " and the hoard,") + " since " + sbEsc(halDate(r.at)) + "." + (r.guild ? " The banners of <b>" + sbEsc(r.guild.name || "their guild") + "</b> hang over the cove." : "");
if (r.mine)
h += " That is you.";
else if (r.defender)
h += " Your guild holds it: you defend it too.";
h += hwShieldBar(r.shield) + "<div style='font-size:13px;margin-top:4px'>" + hwSiegesLine(r) + "</div>";
if (r.defender && r.siege_open)
h += "<div style='color:#FFB070;margin-top:4px'>Halcyra is under siege: break it, and keep the shield fed, or it falls.</div>";
return h;
},
function () {
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>🏰 Halcyra at war</div>";
if (!sbSigned()) {
worldCard(h + "<div style='margin-top:6px'>Sign in: the war for Halcyra is fought in your name.</div>", {});
return;
}
h += "<div id='hw-body' style='margin-top:6px'>Reading the war…</div>";
worldCard(h, fns);
halRefresh(true, function (r) {
var el = document.getElementById("hw-body");
if (!el)
return;
if (!r) {
el.textContent = "The war cannot be read just now. Try again soon.";
return;
}
if (r.missing || !r.v) {
el.textContent = "The war for Halcyra waits on the Keeper (the latest server update still have to be run).";
return;
}
var b = halHoldLine(r), inSky = FR.sys === "halcyra" && frIn() && sbHere(), F = {};
if (r.found && r.defender) {
if (r.sieges.length)
b += inSky ? worldBtn("hw-wave", "⚔️ Break the siege", "Fly at " + sbEsc(r.sieges[0].by || "them") + "'s ships") : "<div style='opacity:.8;font-size:13px;margin-top:4px'>Fly to Morrow's Lamp to fight the besiegers, or man the batteries in the cove.</div>";
if (SF && SF.k === "halcyra" || inSky)
b += hwDefendBtns(r, F);
F["hw-wave"] = function () { worldCard(null); hwWave(r.sieges[0]); };
}
else if (r.found && r.my_siege) {
b += "<div style='margin-top:6px'>Your siege stands. Wear the shield down: beat Halcyra's defence ships.</div>";
if (inSky) {
b += worldBtn("hw-strike", "⚔️ Strike at the shield", "Halcyra's guns: " + r.batteries + ", lance towers: " + r.lances);
F["hw-strike"] = function () { worldCard(null); hwAssault(r); };
}
else
b += "<div style='opacity:.8;font-size:13px'>Fly to Morrow's Lamp to strike.</div>";
b += worldBtn("hw-off", "🏳️ Lift your siege", "Your fleet goes home; the gold is spent");
F["hw-off"] = function () { sbRpc("tr_withdraw", {}).then(function () { sbSay("🏳️ Your fleet turns for home."); halRefresh(true); worldCard(null); }).catch(function () { }); };
}
else if (r.found) {
b += worldBtn("hw-lay", "🏴 Lay siege to Halcyra", (r.lay_gold || 0) + " gold · your " + sbEsc((SB_SHIPS[SB.k] || {}).name || "ship") + " gives power " + hwPower());
F["hw-lay"] = function () {
sbRpc("tr_lay", { p_power: hwPower() }).then(function (o) {
if (o && o.ok) {
sbSay("🏴 <b>Your siege of Halcyra stands.</b> Power " + o.power + ". Beat its defence ships to wear the shield down: whoever strikes it hardest takes Halcyra when it falls.");
halRefresh(true);
hwCard();
}
else
worldCard("<div style='font:600 16px var(--serif,Georgia)'>🏴 Not now</div><div style='margin-top:6px'>" + sbEsc((o && o.say) || "The fleet will not sail.") + "</div>", {});
}).catch(function (e) { sbSay(sbMissing(e) ? "The war waits on the Keeper." : "The fleet cannot be raised just now."); });
};
}
else
b += "<div style='margin-top:6px'>Bring the whole chart to Saffa Morrow's strongbox in the cove.</div>";
if (r.found && r.mine) {
if (r.guild) {
b += worldBtn("hw-gout", "🏳️ Take your guild's banners down", "Your guild stops defending Halcyra");
F["hw-gout"] = function () { hwGuild(false); };
}
else if (r.my_guild) {
b += worldBtn("hw-gin", "🏰 Move your whole guild to Halcyra", r.my_role === "member" ? "Your guild's leader or an officer must hold Halcyra to move it" : "Every member defends it with you, and lands here");
F["hw-gin"] = function () { hwGuild(true); };
}
}
el.innerHTML = b;
WLD.card.querySelectorAll("[data-w]").forEach(function (x) { var k = x.getAttribute("data-w"); if (F[k])
x.onclick = function (e) { e.stopPropagation(); F[k](); }; });
});
},
function (r, F) {
var g = r.shield_gold || 10, b = "";
[[10, "+10%"], [25, "+25%"], [100, "Fill it"]].forEach(function (q) {
var n = Math.min(q[0], Math.floor(100 - (+r.shield || 0)));
if (n < 1)
return;
b += worldBtn("hw-f" + q[0], "🛡️ Feed the shield " + q[1], (n * g).toLocaleString() + " gold");
F["hw-f" + q[0]] = function () { sbRpc("tr_feed", { p_pct: n }).then(function (o) { sbSay(o && o.ok ? "🛡️ The shield brightens: <b>" + o.shield + "%</b>." : "🛡️ " + sbEsc((o && o.say) || "No.")); halRefresh(true); hwCard(); }).catch(function () { }); };
});
[["battery", "🏗️ Build up the gun batteries", r.batteries], ["lance", "🏗️ Build up the lance towers", r.lances]].forEach(function (q) {
if (q[2] >= 5) {
b += "<div style='font-size:13px;opacity:.8'>" + (q[0] === "battery" ? "Gun batteries" : "Lance towers") + ": level 5, as high as they go.</div>";
return;
}
b += worldBtn("hw-b" + q[0], q[1], "Level " + q[2] + " to " + (q[2] + 1) + " · " + ((r.build_gold || 1000) * q[2]).toLocaleString() + " gold" + (q[0] === "battery" ? " · slows the siege and wears it down" : " · your strikes hit harder, theirs softer"));
F["hw-b" + q[0]] = function () { sbRpc("tr_build", { p_what: q[0] }).then(function (o) { sbSay(o && o.ok ? "🏗️ Built: gun batteries " + o.batteries + ", lance towers " + o.lances + "." : "🏗️ " + sbEsc((o && o.say) || "No.")); halRefresh(true); hwCard(); }).catch(function () { }); };
});
return b;
},
function (on) {
sbRpc("tr_guild_move", { p_on: on }).then(function (o) {
if (o && o.ok) {
worldCard(on ? "<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>🏰 " + sbEsc(o.name || "Your guild") + " comes to Halcyra</div><div style='margin-top:6px'>Their banners go up on the cliff and over the hall by the Long Table. Every member now lands on Halcyra, keeps its shield and fights its sieges with you.</div>" : "<div style='font:600 16px var(--serif,Georgia)'>🏳️ The banners come down</div>", {});
halRefresh(true);
}
else
worldCard("<div style='font:600 16px var(--serif,Georgia)'>🏰 Not yet</div><div style='margin-top:6px'>" + sbEsc((o && o.say) || "No.") + "</div>", {});
}).catch(function (e) { sbSay(sbMissing(e) ? "The war waits on the Keeper." : "Try again soon."); });
},
function (s) {
if (!s || SB.battle || !sbHere())
return;
var n = Math.max(3, Math.min(8, 3 + Math.round((+s.power || 60) / 60)));
sbStrike({ n: n, gunship: (+s.power || 0) > 110, noAllies: true, why: "siege", ahead: 700 });
if (!SB.battle)
return;
SB.battle.sg = s.id;
HWAR.waveAt = Date.now();
setTimeout(function () { sbSay("⚔️ <b>The siege of Halcyra!</b> " + sbEsc(s.by || "A fleet") + "'s ships ring the planet. Break this line; the Keepers' lamps are watching from the cove."); }, 900);
},
function (r) {
if (SB.battle || !sbHere())
return;
sbStrike({ n: 2 + (r.batteries || 1) + ((r.lances || 1) > 2 ? 1 : 0), gunship: true, noAllies: true, why: "assault", ahead: 700 });
if (!SB.battle)
return;
setTimeout(function () { sbSay("⚔️ <b>Halcyra's defence ships</b> rise to meet you. Beat them and your guns reach the shield."); }, 900);
},
function () {
var r = HAL.st;
if (!r || !r.defender || !r.sieges)
return;
r.sieges.forEach(function (s) {
if (HWAR.warned[s.id])
return;
HWAR.warned[s.id] = 1;
sbSay("⚠️ <b>Halcyra is under siege!</b> " + sbEsc(s.by || "A fleet") + " has come for the hoard (power " + Math.round(s.power) + "). Shield " + Math.round(r.shield) + "%. Jump to Morrow's Lamp and break it, or feed the shield from the cove.");
});
if (r.shield < 30 && Date.now() - HWAR.lowWarned > 600000) {
HWAR.lowWarned = Date.now();
sbSay("⚠️ <b>Halcyra's shield is at " + Math.round(r.shield) + "%.</b> Feed it at the shield house in the cove, or it falls.");
}
if (r.defender && typeof gxLearn === "function" && !gxKnown().halcyra)
gxLearn("halcyra");
},
function () {
return srTex("hw-hex", 256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "rgba(200,235,255,0.9)";
x.lineWidth = 2;
var s = 22;
for (var row = -1; row < 14; row++)
for (var c = -1; c < 8; c++) {
var cx = c * s * 3 + (row % 2 ? s * 1.5 : 0), cy = row * s * 0.866;
x.beginPath();
for (var k = 0; k < 7; k++) {
var a = k / 6 * Math.PI * 2;
x[k ? "lineTo" : "moveTo"](cx + Math.cos(a) * s, cy + Math.sin(a) * s);
}
x.stroke();
}
});
},
function (dt, r) {
var P = FR.bodies && FR.bodies.halcyra;
if (!P)
return;
var b = null;
FR_BODIES.forEach(function (x) { if (x.k === "halcyra")
b = x; });
var R = b ? b.r : 160;
var held = r && r.found;
if (held && !HWAR.dome) {
var t = null;
try {
t = hwHexTex();
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(6, 3);
}
catch (e) { }
var m = new THREE.MeshBasicMaterial({ color: 0x9AD8FF, map: t, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
HWAR.dome = new THREE.Mesh(new THREE.SphereGeometry(R * 1.22, 48, 32), m);
P.add(HWAR.dome);
}
if (HWAR.dome) {
if (HWAR.dome.parent !== P) {
P.add(HWAR.dome);
}
HWAR.dome.visible = !!held && (+r.shield > 0);
var v = held ? Math.max(0, Math.min(100, +r.shield || 0)) / 100 : 0, tt = performance.now() / 1000;
HWAR.dome.material.opacity = (0.05 + 0.2 * v) * (v < 0.3 ? 0.6 + 0.4 * Math.abs(Math.sin(tt * 7)) : 1) * (0.85 + 0.15 * Math.sin(tt * 1.3));
HWAR.dome.material.color.setHex(v > 0.6 ? 0x9AD8FF : v > 0.3 ? 0xFFE0A0 : 0xFF9A8A);
HWAR.dome.rotation.y += dt * 0.02;
}
var sig = held && r.sieges ? r.sieges.map(function (s) { return s.id + ":" + Math.ceil((+s.power || 0) / 40); }).join(",") : "";
if (sig !== HWAR.fleetSig || (HWAR.fleet && HWAR.fleet.parent !== P)) {
HWAR.fleetSig = sig;
if (HWAR.fleet && HWAR.fleet.parent)
HWAR.fleet.parent.remove(HWAR.fleet);
HWAR.fleet = null;
if (sig) {
var g = new THREE.Group();
P.add(g);
HWAR.fleet = g;
r.sieges.forEach(function (s, si) {
var n = Math.max(2, Math.min(7, 2 + Math.round((+s.power || 0) / 40)));
for (var i = 0; i < n; i++) {
var a = si * 1.9 + i / n * 1.3, rr = R * (1.7 + 0.15 * (i % 3)), m = sbFoeModel(s.kind === "raiders" ? (i % 3 === 0 ? "gunship" : "dart") : "marauder");
m.position.set(Math.cos(a) * rr, (i % 2 ? 1 : -1) * R * 0.2 + si * R * 0.15, Math.sin(a) * rr);
m.lookAt(0, 0, 0);
m.scale.multiplyScalar(4);
g.add(m);
if (typeof wGlow === "function") {
var gl = wGlow(s.kind === "raiders" ? 0xFF5A3A : 0xFFB04A, 40, 0.6);
gl.position.copy(m.position);
g.add(gl);
}
}
});
g.userData.spin = 0.004;
}
}
if (HWAR.fleet)
HWAR.fleet.rotation.y += dt * 0.004;
},
function (g) {
var c = (g && g.crest) || {}, a = c.a || "#2A3F7A", b = c.b || "#C9A85A", mark = c.mark || "⚜️", nm = (g && g.name) || "";
return srTex("hw-ban-" + a + b + mark + nm, 128, 256, function (x, W, H) {
x.fillStyle = a;
x.fillRect(0, 0, W, H);
x.fillStyle = b;
x.fillRect(0, 0, W, 10);
x.fillRect(0, 0, 8, H);
x.fillRect(W - 8, 0, 8, H);
x.beginPath();
x.moveTo(0, H);
x.lineTo(W / 2, H - 34);
x.lineTo(W, H);
x.fillStyle = "rgba(0,0,0,1)";
x.globalCompositeOperation = "destination-out";
x.fill();
x.globalCompositeOperation = "source-over";
x.font = "64px serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(mark, W / 2, 96);
x.fillStyle = b;
x.font = "bold 15px Georgia,serif";
var w = nm.split(" "), y = 170;
w.forEach(function (t) { x.fillText(t.slice(0, 12), W / 2, y); y += 18; });
});
},
function (G, C, hy) {
HWAR.ggC = C;
HWAR.ggHy = hy;
if (HWAR.gg && HWAR.gg.parent)
HWAR.gg.parent.remove(HWAR.gg);
HWAR.gg = new THREE.Group();
G.add(HWAR.gg);
HWAR.ggSig = hwGuildSig();
var g = HAL.st && HAL.st.found && HAL.st.guild;
if (!g)
return;
var tex = null;
try {
tex = hwBannerTex(g);
}
catch (e) { }
var cloth = new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.85, transparent: true, alphaTest: 0.4 });
var cz = C[1] - 60, dy = hy(C[0], cz), brass = mmMat(0xC8A050, { shine: 70, tex: "brass" });
[-16, -9, 9, 16].forEach(function (x) { var m = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 9), cloth); m.position.set(C[0] + x, dy + 17, cz + 0.35); HWAR.gg.add(m); mmCyl(HWAR.gg, brass, 0.1, 0.1, 5.2, C[0] + x, dy + 21.6, cz + 0.4, 0, 0, Math.PI / 2); });
var hx = C[0] - 30, hz = C[1] - 22, H = mmG(HWAR.gg, hx, hy(hx, hz), hz, 0, 0.25, 0), wood = mmMat(0x5A3A22, { tex: "worn" }), stone = mmMat(0xB8A888, { tex: "worn", rep: 2 }), slate = mmMat(0x4A5058, { shine: 20 });
mmSlab(H, stone, 16, 1, 10, 0, 0.5, 0);
mmSlab(H, wood, 15, 5, 9, 0, 3.5, 0);
[-1, 1].forEach(function (s) { mmSlab(H, slate, 16.5, 0.25, 6.4, 0, 7.3, s * 2.4, s * 0.75, 0, 0); });
mmSlab(H, mmMat(0x2A1A10, { tex: "worn" }), 2.4, 3.4, 0.2, 0, 2.7, 4.55);
mmSlab(H, mmMat(0xFFD890, { glow: 0.6 }), 1.2, 1, 0.12, -4.5, 3.6, 4.56);
mmSlab(H, mmMat(0xFFD890, { glow: 0.6 }), 1.2, 1, 0.12, 4.5, 3.6, 4.56);
var bn = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 5.2), cloth);
bn.position.set(0, 6.3, 4.7);
H.add(bn);
mmCyl(H, wood, 0.12, 0.15, 10, 7.4, 5, 4.4);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.8), cloth);
fl.position.set(8.9, 9, 4.4);
H.add(fl);
},
function (B) {
var r = HAL.st;
if (!r || !r.found) {
sbSay("The battery's crew shrug: there is nobody to shoot at.");
return;
}
if (!r.defender) {
sbSay("The Keepers' gunners will not let you near the guns: you do not hold Halcyra.");
return;
}
if (!r.sieges || !r.sieges.length) {
sbSay("The sky is clear: no siege stands. The guns wait.");
return;
}
var s = r.sieges[0];
HWAR.bat = { B: B, s: s, t: 0, left: 60, kills: 0, landed: 0, ships: [], spawn: 0, n: 0, cool: 0, shots: [] };
var L = worldLocal();
camera.position.x += B.x - L.x;
camera.position.z += B.z - L.z;
sbSay("🎯 <b>You man the battery.</b> " + sbEsc(s.by || "Their") + " landers are coming down. Aim with your view; <b>click</b> or <b>F</b> to fire. One minute.");
if (!HWAR.fireOn) {
HWAR.fireOn = 1;
window.addEventListener("keydown", function (e) { if (HWAR.bat && e.code === "KeyF") {
e.preventDefault();
e.stopPropagation();
hwFire();
} }, true);
window.addEventListener("mousedown", function (e) { if (HWAR.bat && e.button === 0 && !(e.target.closest && e.target.closest("button,.world-card,#world-card,input")))
hwFire(); }, true);
window.addEventListener("touchstart", function (e) { if (HWAR.bat && !(e.target.closest && e.target.closest("button,.world-card,#world-card,input")))
hwFire(); }, { passive: true, capture: true });
}
},
function () {
var H = HWAR.bat;
if (!H || H.cool > 0)
return;
H.cool = 0.35;
var d = new THREE.Vector3();
camera.getWorldDirection(d);
var o = camera.getWorldPosition(new THREE.Vector3());
var best = null, bd = 1e9;
H.ships.forEach(function (S) { if (S.dead)
return; var w = S.m.getWorldPosition(new THREE.Vector3()), to = w.clone().sub(o), dist = to.length(), ang = to.normalize().angleTo(d); if (ang < Math.atan(5 / dist) + 0.02 && dist < bd) {
bd = dist;
best = S;
} });
try {
sbTone(140, 0.08);
}
catch (e) { }
var end = best ? best.m.getWorldPosition(new THREE.Vector3()) : o.clone().addScaledVector(d, 300);
var g = new THREE.BufferGeometry().setFromPoints([o.clone().addScaledVector(d, 2).add(new THREE.Vector3(0, -0.6, 0)), end]);
var ln = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0xFFD070, transparent: true, opacity: 0.9 }));
scene.add(ln);
H.shots.push({ m: ln, t: 0.12 });
if (H.B.gun)
H.B.gun.position.z = -0.3;
if (best) {
best.dead = 1;
H.kills++;
try {
sbTone(90, 0.2);
}
catch (e) { }
var fx = wGlow(0xFFA040, 14, 0.95);
fx.position.copy(best.m.position);
best.m.parent.add(fx);
H.shots.push({ m: fx, t: 0.5, grow: 1 });
best.m.visible = false;
}
},
function (dt) {
var H = HWAR.bat;
H.t += dt;
H.left -= dt;
H.cool -= dt;
H.spawn -= dt;
var G = HWAR.G || scene, B = H.B;
if (H.spawn <= 0 && H.left > 8 && H.n < 14) {
H.spawn = 2.6 + Math.random() * 2;
H.n++;
var a = (Math.random() - 0.5) * 1.6, d = 90 + Math.random() * 90, m = sbFoeModel("dart");
m.scale.multiplyScalar(1.4);
m.position.set(B.x + Math.sin(a) * d, B.y + 110 + Math.random() * 40, B.z + Math.cos(a) * d);
G.add(m);
var gl = wGlow(0xFF4A2A, 6, 0.8);
m.add(gl);
H.ships.push({ m: m, v: 7 + Math.random() * 4, floor: B.y + 2 });
}
H.ships.forEach(function (S) { if (S.dead || S.down)
return; S.m.position.y -= S.v * dt; S.m.rotation.y += dt * 0.6; if (S.m.position.y <= S.floor) {
S.down = 1;
H.landed++;
S.m.visible = false;
} });
H.shots = H.shots.filter(function (s) { s.t -= dt; if (s.grow)
s.m.scale.multiplyScalar(1 + dt * 2); if (s.t <= 0) {
if (s.m.parent)
s.m.parent.remove(s.m);
return false;
} return true; });
if (H.B.gun && H.B.gun.position.z < 0)
H.B.gun.position.z = Math.min(0, H.B.gun.position.z + dt * 2);
if (H.B.T) {
H.B.T.rotation.y = yaw + Math.PI;
}
worldPrompt("🎯 <b>The battery</b> · " + Math.ceil(Math.max(0, H.left)) + " s · shot down <b>" + H.kills + "</b>" + (H.landed ? " · " + H.landed + " got through" : ""), function () { hwFire(); });
if (H.left <= 0)
hwBatEnd();
},
function () {
var H = HWAR.bat;
HWAR.bat = null;
if (!H)
return;
H.ships.forEach(function (S) { if (S.m.parent)
S.m.parent.remove(S.m); });
H.shots.forEach(function (s) { if (s.m.parent)
s.m.parent.remove(s.m); });
if (!H.kills) {
sbSay("The landers got through. The siege still stands.");
return;
}
sbRpc("tr_repel", { p_siege: H.s.id, p_how: "battery", p_n: H.kills }).then(function (o) {
halRefresh(true);
if (!o || !o.ok) {
sbSay(sbEsc((o && o.say) || "The gunners need a breather."));
return;
}
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7A0'>🎯 " + H.kills + " landers shot down</div><div style='margin-top:6px'>" + (o.broken ? "That breaks " + sbEsc(o.by || "the siege") + ": the rest turn for home." + (o.gold > 0 ? " 🪙 <b>" + Number(o.gold).toLocaleString() + " gold</b> from the hoard." : "") : sbEsc(o.by || "The siege") + "'s power falls by " + o.down + " to <b>" + o.power + "</b>.") + "</div>", {});
}).catch(function () { });
},
function () {
if (TC.el) {
tcClose();
}
var d = document.createElement("div");
d.id = "tc-chart";
d.style.cssText = "position:fixed;inset:0;z-index:99000;visibility:visible;background:radial-gradient(ellipse at center,#2A1C12 0%,#120C08 80%);display:flex;flex-direction:column;font-family:Georgia,serif;color:#F4E6C8;touch-action:none";
d.innerHTML = "<div style='display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(0,0,0,.35)'>" +
"<b style='font-size:17px;flex:1'>🗺️ Saffa Morrow's chart · " + tcHave() + " of 7 strips</b>" +
"<button data-tc='in' style='" + tcBtnCss() + "'>＋</button><button data-tc='out' style='" + tcBtnCss() + "'>－</button><button data-tc='fit' style='" + tcBtnCss() + "'>Fit</button><button data-tc='x' style='" + tcBtnCss() + "'>✕ Close</button></div>" +
"<div style='position:relative;flex:1;overflow:hidden'><canvas style='position:absolute;inset:0;width:100%;height:100%;cursor:grab'></canvas>" +
"<div data-tc='tip' style='position:absolute;pointer-events:none;display:none;max-width:280px;background:rgba(24,16,10,.92);border:1px solid #C9A85A;border-radius:8px;padding:6px 9px;font-size:13px'></div>" +
"<div data-tc='side' style='position:absolute;left:12px;bottom:12px;max-width:min(420px,calc(100% - 24px));background:rgba(24,16,10,.92);border:1px solid #C9A85A;border-radius:10px;padding:10px 12px;font-size:14px;display:none'></div></div>";
if (!document.getElementById("tc-css")) {
var st = document.createElement("style");
st.id = "tc-css";
st.textContent = "body.tc-open > :not(#world):not(script):not(style), body.tc-open #world > :not(#tc-chart):not(canvas) { visibility:hidden !important; } body.tc-open #tc-chart { visibility:visible !important; }";
document.head.appendChild(st);
}
document.body.classList.add("tc-open");
(document.getElementById("world") || document.body).appendChild(d);
TC.el = d;
TC.cv = d.querySelector("canvas");
TC.tip = d.querySelector("[data-tc=tip]");
TC.side = d.querySelector("[data-tc=side]");
d.querySelector("[data-tc=x]").onclick = tcClose;
d.querySelector("[data-tc=in]").onclick = function () { tcZoom(1.25); };
d.querySelector("[data-tc=out]").onclick = function () { tcZoom(0.8); };
d.querySelector("[data-tc=fit]").onclick = tcFit;
var cv = TC.cv;
cv.addEventListener("pointerdown", function (e) { cv.setPointerCapture(e.pointerId); TC.drag = { x: e.clientX, y: e.clientY, ox: TC.x, oy: TC.y, moved: 0 }; cv.style.cursor = "grabbing"; });
cv.addEventListener("pointermove", function (e) { var D = TC.drag; if (D) {
var dx = e.clientX - D.x, dy = e.clientY - D.y;
if (Math.abs(dx) + Math.abs(dy) > 4)
D.moved = 1;
TC.x = D.ox + dx;
TC.y = D.oy + dy;
} tcHoverAt(e.offsetX, e.offsetY); });
cv.addEventListener("pointerup", function (e) { var D = TC.drag; TC.drag = null; cv.style.cursor = "grab"; if (D && !D.moved)
tcClick(e.offsetX, e.offsetY); });
cv.addEventListener("pointerleave", function () { TC.hover = null; TC.tip.style.display = "none"; });
cv.addEventListener("wheel", function (e) { e.preventDefault(); tcZoom(e.deltaY < 0 ? 1.12 : 0.89, e.offsetX, e.offsetY); }, { passive: false });
cv.addEventListener("touchmove", function (e) { if (e.touches.length === 2) {
var a = e.touches[0], b = e.touches[1], dd = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
if (TC.pinch)
tcZoom(dd / TC.pinch);
TC.pinch = dd;
TC.drag = null;
} }, { passive: true });
cv.addEventListener("touchend", function () { TC.pinch = 0; }, { passive: true });
d.addEventListener("keydown", function (e) { if (e.code === "Escape")
tcClose(); });
TC.keyEsc = function (e) { if (TC.el && (e.code === "Escape" || e.code === "KeyM")) {
e.stopPropagation();
e.preventDefault();
tcClose();
} };
window.addEventListener("keydown", TC.keyEsc, true);
tcFit();
TC.sel = null;
try {
if (document.pointerLockElement)
document.exitPointerLock();
}
catch (e) { }
var loop = function () { if (!TC.el)
return; TC.t = performance.now() / 1000; tcDraw(); TC.raf = requestAnimationFrame(loop); };
loop();
try {
sbTone(330, 0.12);
setTimeout(function () { sbTone(392, 0.14); }, 110);
}
catch (e) { }
},
function (px, py) {
var c = tcToChart(px, py), P = tcPlaceAt(c[0], c[1]), n = tcStripAt(c[0]), have = tcHave(), h = "";
if (c[1] < 0 || c[1] > 600 || c[0] < 0 || c[0] > 1000) {
TC.hover = null;
TC.tip.style.display = "none";
return;
}
if (P && tcSeen(P))
h = "<b>" + sbEsc(P.name) + "</b><br>" + sbEsc(P.note) + (P.k !== "halcyra" && tcKnown(P.k) ? "<br><i>Click to set a course</i>" : P.k === "halcyra" ? "<br><i>Click to set a course</i>" : "<br><i>Not yet on your Star Drive</i>");
else if (n >= 1 && n <= 7)
h = n <= have ? "Strip " + n + " of 7 · <i>click to read its verse</i>" : "Strip " + n + ": torn away. <i>" + (n === have + 1 ? "The last verse you hold tells where it lies." : "Find the strips before it first.") + "</i>";
else if (n === 8)
h = have >= 7 ? "<b>Halcyra</b>" : "The edge of the chart: nothing is drawn here.";
TC.hover = P && tcSeen(P) ? P : null;
if (!h) {
TC.tip.style.display = "none";
return;
}
TC.tip.innerHTML = h;
TC.tip.style.display = "block";
TC.tip.style.left = Math.min(px + 14, TC.cv.clientWidth - 290) + "px";
TC.tip.style.top = (py + 14) + "px";
},
function (px, py) {
var c = tcToChart(px, py), P = tcPlaceAt(c[0], c[1]), n = tcStripAt(c[0]), have = tcHave(), h = "", act = null;
if (P && tcSeen(P)) {
var known = P.k === "sol" || tcKnown(P.k);
h = "<div style='font:600 16px Georgia,serif;color:#FFE7A0'>✦ " + sbEsc(P.name) + "</div><div style='margin:4px 0'>" + sbEsc(P.note) + "</div>";
if (known && sbHere()) {
h += "<button data-tc='go' style='" + tcBtnCss() + "'>✦ Set the Star Drive for " + sbEsc(P.name) + "</button>";
act = function () { tcClose(); if (P.k === "sol")
gxJump("sol");
else
gxJump(P.k); };
}
else if (known)
h += "<div style='opacity:.8;font-size:13px'>On your Star Drive. Take off, and press J or set the course here.</div>";
else
h += "<div style='opacity:.8;font-size:13px'>Your Star Drive does not have its coordinates yet.</div>";
TC.sel = P.k;
}
else if (n >= 1 && n <= 7 && n <= have) {
var V = TRH_PIECES[n - 1], back = n < 7 ? TRH_PIECES[n].verse : TR_END;
h = "<div style='font:600 16px Georgia,serif;color:#FFE7A0'>Strip " + n + " of 7</div><div style='font-size:12px;opacity:.75'>Lifted in " + sbEsc(TR_NAMES[V.sys] || V.sys) + ". On its back, in a sailor's hand:</div><div style='font:italic 14px Georgia,serif;line-height:1.5;white-space:pre-line;margin:6px 0'>" + sbEsc(back) + "</div>";
TC.sel = "strip" + n;
}
else if (n >= 1 && n <= 7) {
h = "<div style='font:600 16px Georgia,serif;color:#C8B090'>A torn gap</div><div style='margin-top:4px'>" + (n === have + 1 ? "Read the last verse you hold: it tells where strip " + n + " lies." : "Strip " + n + " lies beyond the ones you still need.") + "</div>";
if (n === have + 1)
h += "<div style='font:italic 13px Georgia,serif;white-space:pre-line;margin-top:6px;opacity:.9'>" + sbEsc(TRH_PIECES[have].verse) + "</div>";
TC.sel = null;
}
else {
TC.side.style.display = "none";
TC.sel = null;
return;
}
TC.side.innerHTML = h + "<div style='text-align:right;margin-top:6px'><button data-tc='sx' style='" + tcBtnCss() + ";padding:2px 8px;font-size:12px'>close</button></div>";
TC.side.style.display = "block";
TC.side.querySelector("[data-tc=sx]").onclick = function () { TC.side.style.display = "none"; TC.sel = null; };
var g = TC.side.querySelector("[data-tc=go]");
if (g && act)
g.onclick = act;
try {
sbTone(520, 0.06);
}
catch (e) { }
},
function () {
var key = tcArtKey();
if (TC.art && TC.artKey === key)
return TC.art;
var S = 2, c = TC.art || document.createElement("canvas");
c.width = 1000 * S;
c.height = 600 * S;
var x = c.getContext("2d"), R = tcRnd(4111);
x.setTransform(1, 0, 0, 1, 0, 0);
var g = x.createRadialGradient(1000, 560, 120, 1000, 600, 1250);
g.addColorStop(0, "#EFE1BF");
g.addColorStop(0.55, "#E3CFA2");
g.addColorStop(1, "#BE9C66");
x.fillStyle = g;
x.fillRect(0, 0, 2000, 1200);
var id = x.getImageData(0, 0, 2000, 1200), d = id.data;
for (var py = 0; py < 1200; py++) {
var row = Math.sin(py * 0.9) * 1.5 + Math.sin(py * 0.137) * 2.5;
for (var px = 0; px < 2000; px++) {
var i = (py * 2000 + px) * 4, n = (R() - 0.5) * 9 + row + Math.sin(px * 0.021 + py * 0.004) * 2;
d[i] += n;
d[i + 1] += n * 0.92;
d[i + 2] += n * 0.75;
}
}
x.putImageData(id, 0, 0);
x.scale(S, S);
for (var f = 0; f < 26; f++) {
var fx = R() * 1000, fy = R() * 600, fr = 4 + R() * 26, fg = x.createRadialGradient(fx, fy, 0, fx, fy, fr);
fg.addColorStop(0, "rgba(140,90,40," + (0.05 + R() * 0.09) + ")");
fg.addColorStop(0.7, "rgba(140,90,40," + (0.02 + R() * 0.03) + ")");
fg.addColorStop(1, "rgba(140,90,40,0)");
x.fillStyle = fg;
x.beginPath();
x.arc(fx, fy, fr, 0, 7);
x.fill();
}
x.globalCompositeOperation = "multiply";
[[500, 300, 520, "rgba(160,175,190,.10)"], [735, 420, 110, "rgba(200,120,90,.2)"], [850, 255, 95, "rgba(140,185,170,.2)"], [625, 190, 80, "rgba(160,180,215,.22)"], [500, 300, 85, "rgba(210,150,125,.16)"], [955, 360, 75, "rgba(235,195,100,.26)"], [235, 250, 80, "rgba(220,165,145,.16)"]].forEach(function (W) {
for (var k = 0; k < 7; k++) {
var wx = W[0] + (R() - 0.5) * W[2] * 0.6, wy = W[1] + (R() - 0.5) * W[2] * 0.4, wr = W[2] * (0.45 + R() * 0.5), wg = x.createRadialGradient(wx, wy, 0, wx, wy, wr);
wg.addColorStop(0, W[3]);
wg.addColorStop(0.75, W[3].replace(/[\d.]+\)$/, function (a) { return (parseFloat(a) * 0.45) + ")"; }));
wg.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = wg;
x.beginPath();
x.arc(wx, wy, wr, 0, 7);
x.fill();
}
});
x.globalCompositeOperation = "source-over";
tcRhumbs(x, 128, 468, R);
tcRhumbs(x, 890, 112, R, true);
for (var st = 0; st < 520; st++) {
var sx = 48 + R() * 904, sy = 48 + R() * 504, m = Math.pow(R(), 3);
x.fillStyle = TC_INK2 + (0.35 + m * 0.5) + ")";
x.beginPath();
x.arc(sx, sy, 0.35 + m * 1.4, 0, 7);
x.fill();
}
var figs = [[[300, 500], [332, 486], [356, 512], [392, 500], [420, 520]], [[560, 90], [590, 110], [612, 96], [640, 120], [628, 150]], [[690, 520], [720, 500], [760, 505], [780, 480]], [[160, 120], [190, 150], [222, 140], [240, 170]], [[860, 480], [880, 450], [915, 445], [930, 470], [905, 500]]];
figs.forEach(function (F) { x.strokeStyle = TC_INK2 + "0.35)"; x.lineWidth = 0.5; x.setLineDash([1.5, 2]); x.beginPath(); F.forEach(function (p, i) { if (i)
x.lineTo(p[0], p[1]);
else
x.moveTo(p[0], p[1]); }); x.stroke(); x.setLineDash([]); F.forEach(function (p) { tcEngStar(x, p[0], p[1], 2.2 + R() * 1.6, 0.7); }); });
tcFrame(x);
tcCartouche(x, 500, 62);
tcScale(x, 500, 552);
tcRose(x, 128, 468, 62);
tcRose(x, 890, 112, 26, true);
x.save();
x.strokeStyle = TC_INK;
x.lineWidth = 0.9;
x.beginPath();
x.arc(168, 226, 7, Math.PI, 0);
x.moveTo(161, 226);
x.lineTo(161, 232);
x.moveTo(175, 226);
x.lineTo(175, 232);
x.stroke();
tcText(x, "the Old Stone Gate", 168, 212, 9.5, "italic", TC_INK2 + "0.8)");
x.restore();
tcText(x, "Raiders' Water", 735, 476, 12, "italic", TC_RED + "0.85)", 2);
tcText(x, "here be the grey hulls", 735, 490, 8.5, "italic", TC_RED + "0.7)");
tcText(x, "The Deep Between", 500, 212, 10, "italic", TC_INK2 + "0.55)", 3);
TC_PLACES.forEach(function (P, i) { if (!tcSeen(P))
return; tcPlaceArt(x, P, i, R); });
TC.art = c;
TC.artKey = key;
return c;
},
function (x, t, px, py, size, style, col, track) {
x.save();
x.font = (style || "") + " " + size + "px 'Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = col || TC_INK;
if (track) {
var w = 0, cs = t.split("");
cs.forEach(function (ch) { w += x.measureText(ch).width + track; });
var cx = px - w / 2;
x.textAlign = "left";
cs.forEach(function (ch) { x.fillText(ch, cx, py); cx += x.measureText(ch).width + track; });
}
else
x.fillText(t, px, py);
x.restore();
},
function (x, px, py, r, a) {
x.save();
x.translate(px, py);
x.strokeStyle = TC_INK2 + (a || 1) + ")";
x.fillStyle = TC_INK2 + (a || 1) + ")";
x.lineWidth = 0.5;
x.beginPath();
for (var i = 0; i < 8; i++) {
var an = i / 8 * Math.PI * 2 - Math.PI / 2, L = i % 2 ? r * 0.55 : r * 1.5;
x.lineTo(Math.cos(an) * L, Math.sin(an) * L);
var an2 = an + Math.PI / 8;
x.lineTo(Math.cos(an2) * r * 0.3, Math.sin(an2) * r * 0.3);
}
x.closePath();
x.fill();
x.restore();
},
function (x) {
x.save();
x.strokeStyle = TC_INK;
x.fillStyle = TC_INK;
x.lineWidth = 2.2;
x.strokeRect(16, 16, 968, 568);
x.lineWidth = 0.7;
x.strokeRect(21, 21, 958, 558);
x.strokeRect(31, 31, 938, 538);
x.lineWidth = 1.1;
x.strokeRect(34, 34, 932, 532);
var step = 18.6, n = 0;
for (var bx = 31; bx < 969 - 0.1; bx += step, n++) {
var w = Math.min(step, 969 - bx);
if (n % 2 === 0) {
x.fillRect(bx, 21, w, 10);
x.fillRect(bx, 569, w, 10);
}
if (n % 5 === 0 && n > 0) {
x.font = "7px Georgia,serif";
x.textAlign = "center";
x.fillText(String(n * 2), bx, 14);
x.fillText(String(n * 2), bx, 591);
}
}
n = 0;
for (var by = 31; by < 569 - 0.1; by += step, n++) {
var h = Math.min(step, 569 - by);
if (n % 2 === 0) {
x.fillRect(21, by, 10, h);
x.fillRect(969, by, 10, h);
}
}
x.strokeStyle = TC_INK2 + "0.13)";
x.lineWidth = 0.5;
for (var gx = 34 + 93.2; gx < 966; gx += 93.2) {
x.beginPath();
x.moveTo(gx, 34);
x.quadraticCurveTo(gx + (gx - 500) * 0.05, 300, gx, 566);
x.stroke();
}
for (var gy = 34 + 88.7; gy < 566; gy += 88.7) {
x.beginPath();
x.moveTo(34, gy);
x.quadraticCurveTo(500, gy + (gy - 300) * 0.06, 966, gy);
x.stroke();
}
[[26, 26], [974, 26], [26, 574], [974, 574]].forEach(function (p) {
x.save();
x.translate(p[0], p[1]);
x.fillStyle = "#E6D3A8";
x.beginPath();
x.arc(0, 0, 9, 0, 7);
x.fill();
x.strokeStyle = TC_INK;
x.lineWidth = 0.8;
x.stroke();
x.beginPath();
x.arc(0, 0, 6, 0, 7);
x.stroke();
x.fillStyle = TC_INK;
for (var q = 0; q < 4; q++) {
x.beginPath();
x.moveTo(0, 0);
x.arc(0, 0, 6, q * Math.PI / 2, q * Math.PI / 2 + Math.PI / 4);
x.closePath();
x.fill();
}
x.restore();
});
x.restore();
},
function (x, cx, cy, r, small) {
x.save();
x.translate(cx, cy);
x.fillStyle = "rgba(236,222,186,.92)";
x.beginPath();
x.arc(0, 0, r * 1.18, 0, 7);
x.fill();
x.strokeStyle = TC_INK;
x.lineWidth = 0.9;
x.beginPath();
x.arc(0, 0, r * 1.18, 0, 7);
x.stroke();
x.lineWidth = 0.5;
x.beginPath();
x.arc(0, 0, r * 1.04, 0, 7);
x.stroke();
x.beginPath();
x.arc(0, 0, r * 0.9, 0, 7);
x.stroke();
for (var dg = 0; dg < 360; dg += small ? 10 : 2) {
var a = dg * Math.PI / 180 - Math.PI / 2, L = dg % 10 === 0 ? r * 0.14 : r * 0.07;
x.lineWidth = dg % 10 === 0 ? 0.7 : 0.35;
x.beginPath();
x.moveTo(Math.cos(a) * r * 1.04, Math.sin(a) * r * 1.04);
x.lineTo(Math.cos(a) * (r * 1.04 - L), Math.sin(a) * (r * 1.04 - L));
x.stroke();
}
if (!small) {
x.fillStyle = TC_INK;
x.font = "6.5px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
for (var dn = 30; dn < 360; dn += 30) {
if (dn % 90 === 0)
continue;
var an = dn * Math.PI / 180 - Math.PI / 2;
x.save();
x.translate(Math.cos(an) * r * 1.11, Math.sin(an) * r * 1.11);
x.rotate(an + Math.PI / 2);
x.fillText(String(dn), 0, 0);
x.restore();
}
}
var pts = [[32, 0.36, 0.035, "#9A7B4F", "#E8D5A8"], [16, 0.62, 0.06, "#3E5A44", "#D8D2B0"], [8, 0.86, 0.085, TC_INK, "#EADBB4"], [4, 1.0, 0.11, TC_INK, "#F2E6C6"]];
pts.forEach(function (P) {
for (var i = 0; i < P[0]; i++) {
var a = i / P[0] * Math.PI * 2 - Math.PI / 2, L = r * P[1], w = r * P[2];
x.beginPath();
x.moveTo(Math.cos(a) * L, Math.sin(a) * L);
x.lineTo(Math.cos(a + Math.PI / 2) * w, Math.sin(a + Math.PI / 2) * w);
x.lineTo(0, 0);
x.closePath();
x.fillStyle = P[3];
x.fill();
x.beginPath();
x.moveTo(Math.cos(a) * L, Math.sin(a) * L);
x.lineTo(Math.cos(a - Math.PI / 2) * w, Math.sin(a - Math.PI / 2) * w);
x.lineTo(0, 0);
x.closePath();
x.fillStyle = P[4];
x.fill();
x.strokeStyle = TC_INK;
x.lineWidth = 0.4;
x.stroke();
}
});
x.fillStyle = "#7A1E12";
x.beginPath();
x.arc(0, 0, r * 0.06, 0, 7);
x.fill();
x.strokeStyle = TC_INK;
x.lineWidth = 0.5;
x.stroke();
if (!small) {
x.save();
x.translate(0, -r * 1.32);
x.fillStyle = TC_INK;
x.beginPath();
x.moveTo(0, -9);
x.bezierCurveTo(3, -5, 3, -1, 0, 3);
x.bezierCurveTo(-3, -1, -3, -5, 0, -9);
x.fill();
x.beginPath();
x.moveTo(-1, 1);
x.bezierCurveTo(-6, -4, -9, 0, -6, 4);
x.bezierCurveTo(-4, 2, -2, 2, -1, 3);
x.fill();
x.beginPath();
x.moveTo(1, 1);
x.bezierCurveTo(6, -4, 9, 0, 6, 4);
x.bezierCurveTo(4, 2, 2, 2, 1, 3);
x.fill();
x.fillRect(-4, 3, 8, 1.5);
x.restore();
x.save();
x.translate(r * 1.3, 0);
x.strokeStyle = TC_INK;
x.lineWidth = 1.2;
x.beginPath();
x.moveTo(-4, 0);
x.lineTo(4, 0);
x.moveTo(0, -4);
x.lineTo(0, 4);
x.stroke();
x.restore();
tcText(x, "S", 0, r * 1.3, 9, "bold", TC_INK);
tcText(x, "W", -r * 1.3, 0, 9, "bold", TC_INK);
}
x.restore();
},
function (x, cx, cy) {
x.save();
x.translate(cx, cy);
var w = 220, h = 30;
x.fillStyle = "rgba(240,228,198,.96)";
x.strokeStyle = TC_INK;
x.lineWidth = 1;
x.beginPath();
x.moveTo(-w, -h);
x.lineTo(w, -h);
x.bezierCurveTo(w + 18, -h, w + 18, h, w, h);
x.lineTo(-w, h);
x.bezierCurveTo(-w - 18, h, -w - 18, -h, -w, -h);
x.closePath();
x.fill();
x.stroke();
[-1, 1].forEach(function (sd) {
x.save();
x.scale(sd, 1);
x.fillStyle = "rgba(222,204,165,1)";
x.beginPath();
x.ellipse(w + 6, -h + 9, 10, 9, 0, 0, 7);
x.fill();
x.stroke();
x.beginPath();
x.ellipse(w + 6, -h + 9, 5, 4.5, 0, 0, 7);
x.stroke();
x.beginPath();
x.moveTo(w + 6, -h + 18);
x.bezierCurveTo(w + 28, -h + 20, w + 28, h + 6, w + 8, h + 10);
x.bezierCurveTo(w + 14, h - 2, w + 12, -h + 22, w + 6, -h + 18);
x.closePath();
x.fill();
x.stroke();
x.lineWidth = 0.4;
for (var k = 0; k < 9; k++) {
x.beginPath();
x.moveTo(w + 12 + k * 0.8, -h + 20 + k * 5);
x.lineTo(w + 20 + k * 0.5, -h + 22 + k * 5);
x.stroke();
}
x.lineWidth = 1;
x.restore();
});
x.lineWidth = 0.5;
x.strokeRect(-w + 10, -h + 5, 2 * w - 20, 2 * h - 10);
x.strokeRect(-w + 13, -h + 8, 2 * w - 26, 2 * h - 16);
tcText(x, "THE CHART OF SAFFA MORROW", 0, -7, 17, "600", TC_INK, 2.4);
tcText(x, "Corsair of a Hundred Suns · the skies as she sailed them, by her own hand", 0, 11, 9, "italic", TC_INK2 + "0.85)");
x.restore();
},
function (x, cx, cy) {
x.save();
x.translate(cx, cy);
var W = 180, seg = W / 6;
x.strokeStyle = TC_INK;
x.fillStyle = TC_INK;
x.lineWidth = 0.6;
x.strokeRect(-W / 2, -3, W, 6);
for (var i = 0; i < 6; i++) {
if (i % 2 === 0)
x.fillRect(-W / 2 + i * seg, -3, seg, 3);
else
x.fillRect(-W / 2 + i * seg, 0, seg, 3);
}
for (var j = 0; j <= 6; j++) {
x.beginPath();
x.moveTo(-W / 2 + j * seg, -6);
x.lineTo(-W / 2 + j * seg, -3);
x.stroke();
if (j % 2 === 0) {
x.font = "7px Georgia,serif";
x.textAlign = "center";
x.fillText(String(j * 10), -W / 2 + j * seg, -9);
}
}
tcText(x, "A Scale of Light-Years", 0, 13, 8.5, "italic", TC_INK2 + "0.85)", 1);
x.restore();
},
function (x, px, py, r, col, rays) {
var wg = x.createRadialGradient(px, py, 0, px, py, r * 3.4);
wg.addColorStop(0, col.replace("1)", "0.55)"));
wg.addColorStop(1, col.replace("1)", "0)"));
x.save();
x.globalCompositeOperation = "multiply";
x.fillStyle = wg;
x.beginPath();
x.arc(px, py, r * 3.4, 0, 7);
x.fill();
x.restore();
x.save();
x.strokeStyle = TC_INK;
x.lineWidth = 0.5;
var n = rays || 24;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, L = r * (i % 2 ? 1.75 : 2.3);
x.beginPath();
x.moveTo(px + Math.cos(a) * r * 1.2, py + Math.sin(a) * r * 1.2);
x.lineTo(px + Math.cos(a) * L, py + Math.sin(a) * L);
x.stroke();
}
x.lineWidth = 0.9;
x.fillStyle = col.replace("1)", "0.85)");
x.beginPath();
x.arc(px, py, r, 0, 7);
x.fill();
x.stroke();
x.lineWidth = 0.35;
for (var h = -r; h < r; h += 1.3) {
var cw = Math.sqrt(Math.max(0, r * r - h * h));
if (h > -r * 0.1) {
x.beginPath();
x.moveTo(px - cw * 0.2 + h * 0.1, py + h);
x.lineTo(px + cw, py + h);
x.stroke();
}
}
x.restore();
},
function (x, P, i, R) {
var col = TC_COL[P.k] || "rgba(255,230,180,1)", known = P.k === "sol" || P.k === "halcyra" || tcKnown(P.k);
if (P.k === "hallowmere") {
tcSunArt(x, P.x - 8, P.y, 4.6, col, 20);
tcSunArt(x, P.x + 8, P.y + 3, 3.8, col, 18);
}
else if (P.k === "reach") {
tcSunArt(x, P.x - 7, P.y, 4.8, col, 20);
tcSunArt(x, P.x + 8, P.y - 3, 3.4, "rgba(200,220,255,1)", 16);
}
else if (P.k === "lantern") {
for (var s = 0; s < 260; s++) {
var a = R() * 6.283, d = Math.pow(R(), 0.6) * 34;
x.fillStyle = TC_INK2 + (0.15 + R() * 0.35) + ")";
x.beginPath();
x.arc(P.x + Math.cos(a) * d * 1.2, P.y + Math.sin(a) * d * 0.8, 0.35 + R() * 0.5, 0, 7);
x.fill();
}
tcSunArt(x, P.x, P.y, 4.2, col, 20);
}
else if (P.k === "wanderers") {
x.save();
x.strokeStyle = TC_INK;
x.lineWidth = 0.8;
x.fillStyle = "rgba(190,215,225,.8)";
x.beginPath();
x.arc(P.x, P.y, 6.5, 0, 7);
x.fill();
x.stroke();
x.lineWidth = 0.35;
for (var h = -6; h < 6; h += 1.2) {
x.beginPath();
x.moveTo(P.x - Math.sqrt(36 - h * h) * 0.1, P.y + h);
x.lineTo(P.x + Math.sqrt(Math.max(0, 36 - h * h)), P.y + h);
x.stroke();
}
x.setLineDash([1, 2]);
x.beginPath();
x.ellipse(P.x, P.y, 14, 5, -0.3, 0, 7);
x.stroke();
x.restore();
}
else if (P.k === "halcyra") {
tcSunArt(x, P.x, P.y - 18, 5.6, col, 28);
x.save();
x.strokeStyle = TC_INK;
x.lineWidth = 0.9;
x.fillStyle = "rgba(70,140,150,.75)";
x.beginPath();
x.arc(P.x, P.y + 4, 8, 0, 7);
x.fill();
x.stroke();
x.lineWidth = 0.35;
for (var hh = -8; hh < 8; hh += 1.3) {
var cw = Math.sqrt(Math.max(0, 64 - hh * hh));
if (hh > -2) {
x.beginPath();
x.moveTo(P.x, P.y + 4 + hh);
x.lineTo(P.x + cw, P.y + 4 + hh);
x.stroke();
}
}
x.restore();
tcSeal(x, P.x - 2, P.y + 44);
}
else
tcSunArt(x, P.x, P.y, P.k === "sol" ? 5.6 : 4.4, col, P.k === "sol" ? 28 : 20);
var big = P.k === "halcyra" || P.k === "sol";
var ly = P.k === "halcyra" ? P.y + 72 : P.y + 19, lx = P.k === "halcyra" ? P.x - 22 : P.x;
tcText(x, P.name.toUpperCase(), lx, ly, big ? 11.5 : 10, "600", P.k === "halcyra" ? "#6A160C" : TC_INK, 1.6);
if (!known)
tcText(x, "coordinates not yet taken", lx, ly + 12, 8, "italic", TC_INK2 + "0.65)");
},
function (x, px, py) {
x.save();
x.translate(px, py);
var R = tcRnd(77);
x.fillStyle = "rgba(0,0,0,.25)";
x.beginPath();
x.arc(1.5, 2.5, 15, 0, 7);
x.fill();
x.beginPath();
for (var i = 0; i <= 28; i++) {
var a = i / 28 * Math.PI * 2, r = 14 + (R() - 0.5) * 3;
x.lineTo(Math.cos(a) * r, Math.sin(a) * r);
}
x.closePath();
var g = x.createRadialGradient(-4, -5, 1, 0, 0, 16);
g.addColorStop(0, "#C2402C");
g.addColorStop(0.6, "#8E1E14");
g.addColorStop(1, "#5A0E08");
x.fillStyle = g;
x.fill();
x.strokeStyle = "rgba(60,8,4,.8)";
x.lineWidth = 0.8;
x.beginPath();
x.arc(0, 0, 9.5, 0, 7);
x.stroke();
x.fillStyle = "rgba(255,190,160,.35)";
x.beginPath();
for (var k = 0; k < 10; k++) {
var an = k / 10 * Math.PI * 2 - Math.PI / 2, L = k % 2 ? 3 : 7.5;
x.lineTo(Math.cos(an) * L, Math.sin(an) * L);
}
x.closePath();
x.fill();
x.strokeStyle = "rgba(60,8,4,.7)";
x.lineWidth = 0.5;
x.stroke();
x.restore();
},
function (x, i, o) {
var L = i === 0 ? [[0, 0], [0, 600]] : tcTear(i), R2 = i === 7 ? [[1000, 0], [1000, 600]] : tcTear(i + 1);
if (i === 0)
L = [[-1, 0], [-1, 600]];
if (i === 7)
R2 = [[1001, 0], [1001, 600]];
x.beginPath();
x.moveTo(L[0][0], L[0][1]);
L.forEach(function (p) { x.lineTo(p[0], p[1]); });
for (var k = R2.length - 1; k >= 0; k--)
x.lineTo(R2[k][0], R2[k][1]);
x.closePath();
return [L, R2];
},
function () {
var cv = TC.cv, dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight;
if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
cv.width = Math.round(W * dpr);
cv.height = Math.round(H * dpr);
}
var x = cv.getContext("2d"), t = TC.t, have = tcHave(), art = tcArt();
x.setTransform(dpr, 0, 0, dpr, 0, 0);
x.clearRect(0, 0, W, H);
x.fillStyle = "#1A110A";
x.fillRect(0, 0, W, H);
if (!TC.wood) {
var wc = document.createElement("canvas");
wc.width = 512;
wc.height = 512;
var wx = wc.getContext("2d"), Rw = tcRnd(5);
wx.fillStyle = "#2A1A0E";
wx.fillRect(0, 0, 512, 512);
for (var gl = 0; gl < 180; gl++) {
var yy = Rw() * 512, amp = 2 + Rw() * 6;
wx.strokeStyle = "rgba(" + (Rw() < 0.5 ? "60,38,20" : "20,12,6") + "," + (0.2 + Rw() * 0.35) + ")";
wx.lineWidth = 0.5 + Rw() * 2;
wx.beginPath();
for (var xx = 0; xx <= 512; xx += 16)
wx.lineTo(xx, yy + Math.sin(xx * 0.02 + gl) * amp);
wx.stroke();
}
TC.wood = x.createPattern(wc, "repeat");
}
x.fillStyle = TC.wood;
x.fillRect(0, 0, W, H);
var fl = 0.92 + 0.05 * Math.sin(t * 7) + 0.03 * Math.sin(t * 19), lg = x.createRadialGradient(W * 0.48, H * 0.42, 30, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
lg.addColorStop(0, "rgba(255,190,110," + (0.22 * fl) + ")");
lg.addColorStop(0.5, "rgba(120,70,30,.08)");
lg.addColorStop(1, "rgba(0,0,0,.72)");
x.fillStyle = lg;
x.fillRect(0, 0, W, H);
x.save();
x.translate(TC.x, TC.y);
x.scale(TC.z, TC.z);
for (var i = 0; i < 8; i++) {
var held = i < 7 ? (i + 1) <= have : have >= 7, lie = tcStripLie(i), mx = ((TC_TEARS[i] || 0) + (TC_TEARS[i + 1] || 1000)) / 2;
x.save();
x.translate(mx, 300);
x.rotate(lie.a);
x.translate(-mx + lie.dx, -300 + lie.dy);
if (held) {
x.save();
x.shadowColor = "rgba(0,0,0,.42)";
x.shadowBlur = 12 * TC.z;
x.shadowOffsetX = 2 * TC.z;
x.shadowOffsetY = 5 * TC.z;
tcStripPath(x, i);
x.fillStyle = "#D9C392";
x.fill();
x.restore();
x.save();
var E = tcStripPath(x, i);
x.clip();
x.drawImage(art, 0, 0, 1000, 600);
[E[0], E[1]].forEach(function (Ln, side) { if ((i === 0 && side === 0) || (i === 7 && side === 1))
return; x.strokeStyle = "rgba(110,70,30,.22)"; x.lineWidth = 9; x.beginPath(); Ln.forEach(function (p, k) { if (k)
x.lineTo(p[0], p[1]);
else
x.moveTo(p[0], p[1]); }); x.stroke(); x.strokeStyle = "rgba(110,70,30,.25)"; x.lineWidth = 3; x.stroke(); });
x.restore();
var E2 = [i === 0 ? null : tcTear(i), i === 7 ? null : tcTear(i + 1)];
E2.forEach(function (Ln) { if (!Ln)
return; x.strokeStyle = "rgba(248,238,212,.85)"; x.lineWidth = 1.3; x.beginPath(); Ln.forEach(function (p, k) { if (k)
x.lineTo(p[0], p[1]);
else
x.moveTo(p[0], p[1]); }); x.stroke(); x.strokeStyle = "rgba(80,50,20,.45)"; x.lineWidth = 0.4; x.stroke(); });
if (TC.sel === "strip" + (i + 1)) {
tcStripPath(x, i);
x.strokeStyle = "rgba(255,214,120," + (0.55 + 0.3 * Math.sin(t * 4)) + ")";
x.lineWidth = 2.5;
x.stroke();
}
}
else {
tcStripPath(x, i);
x.setLineDash([4, 6]);
x.strokeStyle = "rgba(214,180,110,0.3)";
x.lineWidth = 1;
x.stroke();
x.setLineDash([]);
if (i < 7) {
tcText(x, "strip " + ["I", "II", "III", "IV", "V", "VI", "VII"][i], mx, 292, 15, "italic", "rgba(226,196,140,.5)", 1);
tcText(x, "not yet found", mx, 312, 10, "italic", "rgba(226,196,140,.38)");
}
}
x.restore();
}
x.save();
x.beginPath();
for (var c = 0; c < 8; c++) {
var held2 = c < 7 ? (c + 1) <= have : have >= 7;
if (held2) {
var lie2 = tcStripLie(c), m2 = ((TC_TEARS[c] || 0) + (TC_TEARS[c + 1] || 1000)) / 2;
x.save();
x.translate(m2, 300);
x.rotate(lie2.a);
x.translate(-m2 + lie2.dx, -300 + lie2.dy);
tcStripPath(x, c);
x.restore();
}
}
x.clip();
var route = TC_PLACES.filter(function (P) { return P.k !== "aurelion" && tcSeen(P); });
x.strokeStyle = TC_RED + "0.8)";
x.lineWidth = 1.1;
x.setLineDash([1.2, 4.2]);
x.lineCap = "round";
x.lineDashOffset = -t * 5;
x.beginPath();
route.forEach(function (P, j) { if (j === 0)
x.moveTo(P.x, P.y);
else {
var Q = route[j - 1];
x.quadraticCurveTo((P.x + Q.x) / 2, (P.y + Q.y) / 2 - 40, P.x, P.y);
} });
x.stroke();
x.setLineDash([]);
x.lineCap = "butt";
for (var pn = 1; pn <= Math.min(7, have); pn++) {
var PP = TC_PLACES.filter(function (q) { return q.n === pn && q.k !== "aurelion"; })[0];
if (!PP)
continue;
x.strokeStyle = TC_RED + "0.85)";
x.lineWidth = 1.2;
x.beginPath();
x.moveTo(PP.x + 16, PP.y - 16);
x.lineTo(PP.x + 23, PP.y - 9);
x.moveTo(PP.x + 23, PP.y - 16);
x.lineTo(PP.x + 16, PP.y - 9);
x.stroke();
}
TC_PLACES.forEach(function (P) { if (!tcSeen(P))
return; if (TC.hover === P || TC.sel === P.k) {
x.strokeStyle = TC_RED + (0.55 + 0.3 * Math.sin(t * 5)) + ")";
x.lineWidth = 1.2;
x.setLineDash([3, 3]);
x.beginPath();
x.arc(P.x, P.y, 18, 0, 7);
x.stroke();
x.setLineDash([]);
} });
var hal = TC_PLACES.filter(function (P) { return P.k === "halcyra"; })[0];
if (hal && tcSeen(hal)) {
var hg = x.createRadialGradient(hal.x, hal.y - 18, 0, hal.x, hal.y - 18, 34);
hg.addColorStop(0, "rgba(255,205,90," + (0.22 + 0.12 * Math.sin(t * 2)) + ")");
hg.addColorStop(1, "rgba(255,205,90,0)");
x.fillStyle = hg;
x.beginPath();
x.arc(hal.x, hal.y - 18, 34, 0, 7);
x.fill();
}
x.restore();
x.restore();
if (have === 0) {
tcText(x, "You hold no strip of the chart yet. The first verse is in your Star Log's Legends.", W / 2, H - 30, 15, "italic", "rgba(244,230,200,0.85)");
}
},
function (where, kind) {
var G = SPG_GOODS[kind], P = SPG_PLACES[where];
if (!G || !P)
return 0;
if (G.home === where)
return Math.max(1, Math.floor(G.base * 0.6));
var hp = spgPlaceOf(G.home), d = hp ? Math.abs((SPG_LY[hp.sys] || 0) - (SPG_LY[P.sys] || 0)) : 0;
var m = P.wants.indexOf(G.cat) >= 0 ? 1.15 + Math.min(0.85, d / 300 + (hp && hp.sys !== P.sys ? 0.12 : 0.04)) : 0.8;
return Math.max(1, Math.round(G.base * m * spgDrift(spgDay(), where, kind)));
},
function (view, sys) {
if (SKC.el)
skcClose();
if (typeof TC !== "undefined" && TC.el)
tcClose();
var d = document.createElement("div");
d.id = "skc-chart";
d.style.cssText = "position:fixed;inset:0;z-index:99000;visibility:visible;background:#03060E;display:flex;flex-direction:column;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#DCE8F6;touch-action:none";
var B = function (k, t, tt) { return "<button data-sc='" + k + "' title='" + (tt || "") + "' style='" + skcBtnCss() + "'>" + t + "</button>"; };
d.innerHTML = "<div style='display:flex;align-items:center;gap:6px;padding:7px 10px;background:linear-gradient(#0B1426,#060B16);border-bottom:1px solid rgba(120,190,255,.25);flex-wrap:wrap'>" +
"<b data-sc='title' style='font-size:16px;letter-spacing:.06em;flex:1;min-width:160px;color:#BFE2FF'>🧭 STAR CHART</b>" +
B("gal", "✦ Galaxy", "Every star you know") + B("home", "◎ Here", "The star you are at") +
((typeof tcHave === "function" && tcHave() > 0) ? B("tc", "🗺️ Morrow's chart", "Saffa Morrow's old chart, " + tcHave() + " of 7 strips") : "") +
B("in", "＋") + B("out", "－") + B("x", "✕ Close", "Close (M or Esc)") + "</div>" +
"<div style='position:relative;flex:1;overflow:hidden'><canvas style='position:absolute;inset:0;width:100%;height:100%;cursor:grab'></canvas>" +
"<div data-sc='tip' style='position:absolute;pointer-events:none;display:none;max-width:260px;background:rgba(6,14,28,.94);border:1px solid rgba(120,200,255,.5);border-radius:8px;padding:6px 9px;font-size:13px;line-height:1.35'></div>" +
"<div data-sc='side' style='position:absolute;right:10px;top:10px;bottom:10px;width:min(360px,calc(100% - 20px));overflow:auto;background:rgba(5,12,26,.93);border:1px solid rgba(120,200,255,.35);border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.4;display:none;box-shadow:0 8px 40px rgba(0,0,0,.6)'></div>" +
"<div data-sc='key' style='position:absolute;left:10px;bottom:10px;font-size:12px;opacity:.75;pointer-events:none'></div></div>";
if (!document.getElementById("skc-css")) {
var st = document.createElement("style");
st.id = "skc-css";
st.textContent = "body.skc-open > :not(#world):not(script):not(style), body.skc-open #world > :not(#skc-chart):not(canvas) { visibility:hidden !important; } body.skc-open #skc-chart, body.skc-open #skc-chart * { visibility:visible !important; }" +
"#skc-chart .scg{display:flex;align-items:center;gap:8px;margin:4px 0;padding:4px 6px;border-radius:8px;background:rgba(120,190,255,.06)} #skc-chart .scg img{width:34px;height:34px;border-radius:7px;flex:none}" +
"#skc-chart .scb{display:block;width:100%;text-align:left;margin-top:7px;padding:8px 10px;border-radius:9px;border:1px solid rgba(120,200,255,.55);background:rgba(30,70,120,.45);color:#E8F4FF;cursor:pointer;font:inherit}" +
"#skc-chart .scb:hover{background:rgba(50,110,180,.6)} #skc-chart h3{margin:0 0 2px;font-size:18px;color:#FFF;letter-spacing:.02em} #skc-chart .scs{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#7FBFEF;margin:12px 0 4px}" +
"#skc-chart .scw{display:inline-block;margin:2px 4px 2px 0;padding:2px 8px;border-radius:10px;background:rgba(255,200,110,.12);border:1px solid rgba(255,200,110,.35);font-size:12px;color:#FFE2B0}" +
"@media (max-width:640px){ #skc-chart [data-sc=side]{top:auto!important;height:46%;width:calc(100% - 20px)!important} }";
document.head.appendChild(st);
}
document.body.classList.add("skc-open");
(document.getElementById("world") || document.body).appendChild(d);
SKC.el = d;
SKC.cv = d.querySelector("canvas");
SKC.tip = d.querySelector("[data-sc=tip]");
SKC.side = d.querySelector("[data-sc=side]");
SKC.key = d.querySelector("[data-sc=key]");
SKC.title = d.querySelector("[data-sc=title]");
d.querySelector("[data-sc=x]").onclick = skcClose;
d.querySelector("[data-sc=in]").onclick = function () { skcZoom(1.25); };
d.querySelector("[data-sc=out]").onclick = function () { skcZoom(0.8); };
d.querySelector("[data-sc=gal]").onclick = function () { skcView("galaxy"); };
d.querySelector("[data-sc=home]").onclick = function () { skcView("system", skcHere()); };
var tb = d.querySelector("[data-sc=tc]");
if (tb)
tb.onclick = function () { skcClose(); tcOpen(); };
var cv = SKC.cv;
cv.addEventListener("pointerdown", function (e) { try {
cv.setPointerCapture(e.pointerId);
}
catch (x) { } SKC.drag = { x: e.clientX, y: e.clientY, ox: SKC.x, oy: SKC.y, moved: 0 }; cv.style.cursor = "grabbing"; });
cv.addEventListener("pointermove", function (e) { var D = SKC.drag; if (D) {
var dx = e.clientX - D.x, dy = e.clientY - D.y;
if (Math.abs(dx) + Math.abs(dy) > 5)
D.moved = 1;
if (D.moved) {
SKC.x = D.ox + dx;
SKC.y = D.oy + dy;
}
} skcHoverAt(e.offsetX, e.offsetY); });
cv.addEventListener("pointerup", function (e) { var D = SKC.drag; SKC.drag = null; cv.style.cursor = "grab"; if (D && !D.moved)
skcClick(e.offsetX, e.offsetY); });
cv.addEventListener("pointerleave", function () { SKC.hover = null; SKC.tip.style.display = "none"; });
cv.addEventListener("wheel", function (e) { e.preventDefault(); skcZoom(e.deltaY < 0 ? 1.12 : 0.89, e.offsetX, e.offsetY); }, { passive: false });
cv.addEventListener("dblclick", function (e) { var h = skcPick(e.offsetX, e.offsetY); if (h && h.t === "star" && skcKnown(h.k))
skcView("system", h.k); });
cv.addEventListener("touchmove", function (e) { if (e.touches.length === 2) {
var a = e.touches[0], b = e.touches[1], dd = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
if (SKC.pinch)
skcZoom(dd / SKC.pinch);
SKC.pinch = dd;
SKC.drag = null;
} }, { passive: true });
cv.addEventListener("touchend", function () { SKC.pinch = 0; }, { passive: true });
SKC.keyEsc = function (e) { if (!SKC.el)
return; if (e.code === "Escape" || e.code === "KeyM") {
e.stopPropagation();
e.preventDefault();
if (e.code === "Escape" && SKC.view === "system" && SKC.sel) {
SKC.sel = null;
skcSide();
return;
}
skcClose();
} };
window.addEventListener("keydown", SKC.keyEsc, true);
try {
if (document.pointerLockElement)
document.exitPointerLock();
}
catch (e) { }
SKC.sel = null;
skcView(view || "galaxy", sys || skcHere());
var loop = function () { if (!SKC.el)
return; SKC.t = performance.now() / 1000; skcWork(); skcDraw(); SKC.raf = requestAnimationFrame(loop); };
loop();
},
function (v, sys) {
SKC.view = v;
SKC.sys = v === "system" ? sys : null;
SKC.sel = null;
SKC.hover = null;
SKC.pos = null;
if (v === "system" && !skcKnown(sys)) {
SKC.view = "galaxy";
SKC.sys = null;
}
if (SKC.title)
SKC.title.textContent = SKC.view === "galaxy" ? "🧭 STAR CHART · THE GALAXY" : "🧭 STAR CHART · " + skcSysName(SKC.sys).toUpperCase();
if (SKC.view === "galaxy") {
SKC.sel = { t: "star", k: skcHere() };
}
skcSide();
skcFit();
},
function () {
var cv = SKC.cv, W = cv.clientWidth || 800, H = cv.clientHeight || 500, phone = W <= 640, side = (!phone && SKC.side && SKC.side.style.display !== "none") ? 370 : 0, Wu = W - side, Hu = phone && SKC.side && SKC.side.style.display !== "none" ? H * 0.54 : H;
var B = SKC.view === "galaxy" ? [40, 60, 1000, 500] : [150, 115, 860, 490], bw = B[2] - B[0], bh = B[3] - B[1];
SKC.z = Math.min(Wu / (bw + 40), Hu / (bh + 30));
SKC.x = (Wu - bw * SKC.z) / 2 - B[0] * SKC.z;
SKC.y = (Hu - bh * SKC.z) / 2 - B[1] * SKC.z;
if (SKC.key)
SKC.key.style.display = (phone && Hu < H) ? "none" : "block";
},
function () {
if (SKC.bg)
return SKC.bg;
var W = 2000, H = 1200, c = document.createElement("canvas");
c.width = W;
c.height = H;
var x = c.getContext("2d"), R = skcRand(9137);
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#050A18");
g.addColorStop(0.5, "#070B1C");
g.addColorStop(1, "#04060F");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.globalCompositeOperation = "lighter";
for (var i = 0; i < 900; i++) {
var t = R(), px = t * W, py = H * 0.52 + Math.sin(t * 3.2 + 0.6) * H * 0.2 + (R() - 0.5) * (R() * H * 0.32), r = 20 + R() * 90;
var cg = x.createRadialGradient(px, py, 0, px, py, r), warm = R() < 0.55, a = 0.018 + R() * 0.03;
cg.addColorStop(0, warm ? "rgba(255,214,170," + a + ")" : "rgba(150,180,255," + a + ")");
cg.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = cg;
x.beginPath();
x.arc(px, py, r, 0, 7);
x.fill();
}
[[300, 560, 260, [255, 120, 170]], [1130, 880, 300, [255, 210, 120]], [1340, 420, 240, [255, 90, 70]], [1620, 240, 260, [90, 220, 180]], [620, 280, 200, [120, 150, 255]], [1840, 800, 220, [255, 170, 90]]].forEach(function (N) {
for (var j = 0; j < 70; j++) {
var a2 = R() * 6.28, d2 = Math.pow(R(), 0.7) * N[2], px2 = N[0] + Math.cos(a2) * d2, py2 = N[1] + Math.sin(a2) * d2 * 0.7, r2 = 30 + R() * 110;
var ng = x.createRadialGradient(px2, py2, 0, px2, py2, r2), al = 0.012 + R() * 0.03, col = N[3].map(function (v) { return Math.round(Math.min(255, v * (0.75 + R() * 0.4))); });
ng.addColorStop(0, "rgba(" + col + "," + al + ")");
ng.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = ng;
x.beginPath();
x.arc(px2, py2, r2, 0, 7);
x.fill();
}
});
x.globalCompositeOperation = "source-over";
for (var k = 0; k < 160; k++) {
var t2 = R(), px3 = t2 * W, py3 = H * 0.54 + Math.sin(t2 * 3.2 + 0.9) * H * 0.18 + (R() - 0.5) * 80, r3 = 18 + R() * 60;
var dg = x.createRadialGradient(px3, py3, 0, px3, py3, r3);
dg.addColorStop(0, "rgba(2,3,8,.22)");
dg.addColorStop(1, "rgba(2,3,8,0)");
x.fillStyle = dg;
x.beginPath();
x.arc(px3, py3, r3, 0, 7);
x.fill();
}
x.globalCompositeOperation = "lighter";
var cols = [[155, 176, 255], [170, 191, 255], [202, 215, 255], [248, 247, 255], [255, 244, 234], [255, 210, 161], [255, 204, 111]];
for (var s = 0; s < 5200; s++) {
var t3 = R(), inArm = R() < 0.6, px4 = inArm ? t3 * W : R() * W, py4 = inArm ? H * 0.52 + Math.sin(t3 * 3.2 + 0.6) * H * 0.2 + (R() - 0.5) * R() * H * 0.5 : R() * H;
var m = Math.pow(R(), 6), sz = 0.35 + m * 1.9, cc = cols[Math.floor(R() * cols.length)], al2 = 0.25 + R() * 0.6;
x.fillStyle = "rgba(" + cc + "," + al2 + ")";
x.beginPath();
x.arc(px4, py4, sz, 0, 7);
x.fill();
if (m > 0.45) {
var sg = x.createRadialGradient(px4, py4, 0, px4, py4, sz * 7);
sg.addColorStop(0, "rgba(" + cc + ",.35)");
sg.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = sg;
x.beginPath();
x.arc(px4, py4, sz * 7, 0, 7);
x.fill();
}
}
x.globalCompositeOperation = "source-over";
SKC.bg = c;
return c;
},
function () {
var key = SKC.queue.shift();
if (!key)
return;
var J = SKC.sph[key + ":b"];
if (!J)
return;
var img = skcTexFor(J.b, J.sys), S = J.px * 2, c = document.createElement("canvas");
c.width = c.height = S;
var x = c.getContext("2d");
var src = null, sw = 0, sh = 0;
if (img) {
try {
var tc = document.createElement("canvas");
sw = tc.width = img.width || 512;
sh = tc.height = img.height || 256;
var tx = tc.getContext("2d");
tx.drawImage(img, 0, 0);
src = tx.getImageData(0, 0, sw, sh).data;
}
catch (e) {
src = null;
}
}
var out = x.createImageData(S, S), o = out.data, base = J.b.col || 0x8899AA, br = (base >> 16) & 255, bg = (base >> 8) & 255, bb = base & 255;
var L = [-0.55, -0.45, 0.7], ll = Math.hypot(L[0], L[1], L[2]);
L = [L[0] / ll, L[1] / ll, L[2] / ll];
var rot = (J.b.k.length * 0.37) % 1, tilt = J.b.tilt || 0.2;
for (var py = 0; py < S; py++)
for (var pxi = 0; pxi < S; pxi++) {
var nx = (pxi + 0.5) / J.px - 1, ny = (py + 0.5) / J.px - 1, rr = nx * nx + ny * ny;
if (rr > 1)
continue;
var nz = Math.sqrt(1 - rr), i = (py * S + pxi) * 4;
var cy = Math.cos(tilt), sy = Math.sin(tilt), ny2 = ny * cy - nz * sy, nz2 = ny * sy + nz * cy;
var lon = Math.atan2(nx, nz2) / (Math.PI * 2) + 0.5 + rot, lat = Math.asin(Math.max(-1, Math.min(1, -ny2)));
var u = ((lon % 1) + 1) % 1, v = 0.5 - lat / Math.PI, r, g, bl;
if (src) {
var sx = Math.min(sw - 1, Math.floor(u * sw)), syy = Math.min(sh - 1, Math.max(0, Math.floor(v * sh))), si = (syy * sw + sx) * 4;
r = src[si];
g = src[si + 1];
bl = src[si + 2];
}
else {
r = br;
g = bg;
bl = bb;
}
var lam = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]), sh2 = 0.08 + 0.92 * Math.pow(lam, 0.85), rim = Math.pow(1 - nz, 3);
var air = J.b.air || J.b.atmo, ar = air ? (air >> 16) & 255 : 150, ag = air ? (air >> 8) & 255 : 190, ab = air ? air & 255 : 255, ak = air ? 0.9 : 0.25;
o[i] = Math.min(255, r * sh2 + ar * rim * ak * lam * 1.4 + ar * rim * 0.15);
o[i + 1] = Math.min(255, g * sh2 + ag * rim * ak * lam * 1.4 + ag * rim * 0.15);
o[i + 2] = Math.min(255, bl * sh2 + ab * rim * ak * lam * 1.4 + ab * rim * 0.15);
o[i + 3] = rr > 0.96 ? Math.round(255 * (1 - rr) / 0.04) : 255;
}
x.putImageData(out, 0, 0);
SKC.sph[key] = c;
delete SKC.sph[key + ":b"];
},
function (k) {
if (SKC.pos && SKC.pos.k === k)
return SKC.pos;
var B = skcBodies(k), P = { k: k, list: [], by: {}, max: 1 }, cx = 500, cy = 300;
var tops = B.filter(function (b) { return !b.parent; }), max = 1;
tops.forEach(function (b) { if (!skcIsStar(b) || b.orbit)
max = Math.max(max, b.orbit || 0); });
(skcSites(k)).forEach(function (d) { max = Math.max(max, Math.hypot(d.at[0], d.at[2]) * 0.92); });
P.max = max;
function rad(o) { return o <= 0 ? 0 : 40 + Math.pow(o / max, 0.62) * 250; }
tops.forEach(function (b) {
var r = rad(b.orbit || 0), a = b.ang || 0, s = skcIsStar(b) ? Math.max(20, Math.min(42, Math.sqrt(b.r || 300) * 1.5)) : Math.max(5.5, Math.min(24, 3 + Math.sqrt(b.r || 40) * 1.25));
if (skcIsStar(b) && b.orbit)
r = Math.min(r, 70);
var E = { b: b, r: r, a: a, s: s, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.52, moons: [] };
P.list.push(E);
P.by[b.k] = E;
});
B.filter(function (b) { return b.parent; }).forEach(function (b) {
var p = P.by[b.parent];
if (!p)
return;
var n = p.moons.length, s = Math.max(4, Math.min(12, 2.5 + Math.sqrt(b.r || 20) * 1.1)), mr = p.s + 10 + s + n * 14, a = (b.ang || 0) + n * 1.3;
var E = { b: b, r: mr, a: a, s: s, x: p.x + Math.cos(a) * mr, y: p.y + Math.sin(a) * mr * 0.6, moon: 1, parent: p };
p.moons.push(E);
P.list.push(E);
P.by[b.k] = E;
});
P.sites = skcSites(k).map(function (d) { var dd = Math.hypot(d.at[0], d.at[2]), a = Math.atan2(d.at[2], d.at[0]), r = rad(dd); return { d: d, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.52, r: r }; });
SKC.pos = P;
return P;
},
function () {
var cv = SKC.cv, W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
cv.width = Math.round(W * dpr);
cv.height = Math.round(H * dpr);
}
var x = cv.getContext("2d");
x.setTransform(dpr, 0, 0, dpr, 0, 0);
x.clearRect(0, 0, W, H);
var bg = skcBackdrop(), par = SKC.view === "galaxy" ? 1 : 0.35, bz = SKC.z * par + (1 - par) * Math.min(W / 1000, H / 600);
x.globalAlpha = SKC.view === "galaxy" ? 1 : 0.55;
var bx = SKC.x * par + (1 - par) * (W - 1000 * bz) / 2, by = SKC.y * par + (1 - par) * (H - 600 * bz) / 2;
x.fillStyle = "#04070F";
x.fillRect(0, 0, W, H);
x.drawImage(bg, bx - 500 * bz, by - 400 * bz, 2000 * bz, 1400 * bz);
x.globalAlpha = 1;
x.save();
x.translate(SKC.x, SKC.y);
x.scale(SKC.z, SKC.z);
if (SKC.view === "galaxy")
skcDrawGalaxy(x);
else
skcDrawSystem(x);
x.restore();
skcFrame(x, W, H);
},
function (x, W, H) {
x.save();
x.strokeStyle = "rgba(120,200,255,.35)";
x.lineWidth = 1;
x.strokeRect(6.5, 6.5, W - 13, H - 13);
x.fillStyle = "rgba(140,200,255,.55)";
x.font = "10px system-ui,sans-serif";
for (var i = 0; i <= 40; i++) {
var px = 6.5 + (W - 13) * i / 40, l = i % 5 ? 4 : 9;
x.fillRect(px, 6.5, 1, l);
x.fillRect(px, H - 6.5 - l, 1, l);
if (i % 10 === 0 && i > 0 && i < 40)
x.fillText(String(i * 9).padStart(3, "0") + "°", px + 3, 22);
}
for (var j = 0; j <= 24; j++) {
var py = 6.5 + (H - 13) * j / 24, l2 = j % 4 ? 4 : 9;
x.fillRect(6.5, py, l2, 1);
x.fillRect(W - 6.5 - l2, py, l2, 1);
}
var ly = SKC.view === "galaxy" ? 50 : 0;
if (ly) {
var len = ly * 2.8 * SKC.z;
x.strokeStyle = "rgba(190,230,255,.8)";
x.beginPath();
x.moveTo(20, H - 28);
x.lineTo(20 + len, H - 28);
x.moveTo(20, H - 32);
x.lineTo(20, H - 24);
x.moveTo(20 + len, H - 32);
x.lineTo(20 + len, H - 24);
x.stroke();
x.fillStyle = "rgba(210,236,255,.9)";
x.font = "11px system-ui,sans-serif";
x.fillText("50 light-years", 24, H - 34);
}
x.restore();
},
function (x, px, py, r, col, t, bright) {
x.save();
x.globalCompositeOperation = "lighter";
skcGlow(x, px, py, r * 5, col, 0.35 * bright);
skcGlow(x, px, py, r * 2, col, 0.8 * bright);
x.strokeStyle = skcRgba(col, 0.5 * bright);
x.lineWidth = 0.8;
var sp = r * (4.5 + Math.sin(t * 1.3) * 0.3);
x.beginPath();
x.moveTo(px - sp, py);
x.lineTo(px + sp, py);
x.moveTo(px, py - sp);
x.lineTo(px, py + sp);
x.stroke();
x.globalAlpha = 0.5;
x.beginPath();
x.moveTo(px - sp * 0.5, py - sp * 0.5);
x.lineTo(px + sp * 0.5, py + sp * 0.5);
x.moveTo(px + sp * 0.5, py - sp * 0.5);
x.lineTo(px - sp * 0.5, py + sp * 0.5);
x.stroke();
x.globalAlpha = 1;
x.fillStyle = "#FFFFFF";
x.beginPath();
x.arc(px, py, r * 0.7, 0, 7);
x.fill();
x.restore();
},
function (x, txt, px, py, size, col, align, sub) {
size = size / Math.min(1.25, Math.max(0.45, SKC.z));
x.save();
x.font = "600 " + size + "px system-ui,-apple-system,'Segoe UI',sans-serif";
x.textAlign = align || "left";
x.lineWidth = 3 / SKC.z;
x.strokeStyle = "rgba(2,6,14,.85)";
x.strokeText(txt, px, py);
x.fillStyle = col;
x.fillText(txt, px, py);
if (sub) {
x.font = (size * 0.72) + "px system-ui,sans-serif";
x.strokeText(sub, px, py + size * 1.05);
x.fillStyle = "rgba(170,205,235,.85)";
x.fillText(sub, px, py + size * 1.05);
}
x.restore();
},
function (x) {
var t = SKC.t, here = skcHere(), L = skcSysList(), z = SKC.z;
var H0 = skcAt(here);
x.save();
x.strokeStyle = "rgba(110,180,255,.13)";
x.lineWidth = 1 / z;
x.setLineDash([4 / z, 6 / z]);
for (var r = 1; r <= 6; r++) {
x.beginPath();
x.arc(H0[0], H0[1], r * 140, 0, 7);
x.stroke();
}
x.setLineDash([]);
x.fillStyle = "rgba(140,200,255,.45)";
x.font = (10 / Math.max(0.7, z)) + "px system-ui,sans-serif";
for (var r2 = 1; r2 <= 4; r2++)
x.fillText(Math.round(r2 * 140 / 2.8) + " ly", H0[0] + r2 * 140 * 0.707 + 3, H0[1] - r2 * 140 * 0.707);
x.restore();
L.forEach(function (k) {
if (k === here || !skcKnown(k))
return;
var A = skcAt(k), sel = SKC.sel && SKC.sel.k === k;
x.save();
x.strokeStyle = sel ? "rgba(140,230,255,.85)" : "rgba(110,190,255,.22)";
x.lineWidth = (sel ? 1.8 : 1) / z;
x.setLineDash([10 / z, 7 / z]);
x.lineDashOffset = -t * 18 / z;
x.beginPath();
x.moveTo(H0[0], H0[1]);
x.lineTo(A[0], A[1]);
x.stroke();
if (sel) {
var ly = Math.abs(((k === "sol") ? -12 : (GX_SYS[k].ly || 0)) - ((here === "sol") ? -12 : ((GX_SYS[here] || {}).ly || 0))), mx = (H0[0] + A[0]) / 2, my = (H0[1] + A[1]) / 2;
var secs = (typeof gxRide === "function") ? Math.round(gxRide(k)) : 0;
skcLabel(x, (here === "sol" || k === "sol" ? "via the Far Gate · " : "") + Math.max(1, ly) + " ly" + (secs ? " · ~" + secs + " s at light speed" : ""), mx, my - 6 / z, 11 / Math.max(0.8, z), "#BFEFFF", "center");
}
x.restore();
});
var a1 = skcAt("sol"), a2 = skcAt("reach");
x.save();
x.strokeStyle = "rgba(160,220,255,.5)";
x.lineWidth = 2 / z;
x.beginPath();
x.moveTo(a1[0], a1[1]);
x.lineTo(a2[0], a2[1]);
x.stroke();
var gx = (a1[0] + a2[0]) / 2, gy = (a1[1] + a2[1]) / 2;
x.strokeStyle = "rgba(190,235,255,.9)";
x.beginPath();
x.ellipse(gx, gy, 5, 9, 0.4, 0, 7);
x.stroke();
skcLabel(x, "Far Gate", gx, gy + 20, 10, "rgba(190,230,255,.9)", "center");
x.restore();
L.forEach(function (k) {
var A = skcAt(k), kn = skcKnown(k), col = skcStarCol(k), S = k === "sol" ? null : GX_SYS[k];
if (k === "halcyra" && !kn)
return;
if (!kn) {
x.save();
x.globalAlpha = 0.55 + Math.sin(t * 1.2 + A[0]) * 0.1;
skcStarGlyph(x, A[0], A[1], 3, [170, 190, 220], t, 0.6);
x.restore();
skcLabel(x, "Uncharted", A[0] + 12, A[1] + 4, 11, "rgba(170,190,215,.75)", "left", "about " + (S.ly || 0) + " ly · coordinates needed");
return;
}
var sel = SKC.sel && SKC.sel.k === k, hov = SKC.hover && SKC.hover.k === k;
skcStarGlyph(x, A[0], A[1], k === "reach" ? 6 : 5.5, col, t, sel || hov ? 1.25 : 1);
if (k === "reach") {
var c2 = [180, 210, 255];
skcStarGlyph(x, A[0] + 9, A[1] - 5, 3.5, c2, t, 0.9);
}
if (k === "hallowmere") {
skcStarGlyph(x, A[0] + 7, A[1] + 4, 3.5, col, t, 0.9);
}
var n = skcBodies(k).filter(function (b) { return !skcIsStar(b); }).length;
for (var i = 0; i < Math.min(n, 12); i++) {
var aa = i / Math.min(n, 12) * 6.283 + t * 0.15;
x.fillStyle = "rgba(200,225,255,.55)";
x.beginPath();
x.arc(A[0] + Math.cos(aa) * 16, A[1] + Math.sin(aa) * 16 * 0.5, 1.1, 0, 7);
x.fill();
}
if (sel) {
x.save();
x.strokeStyle = "rgba(140,230,255,.9)";
x.lineWidth = 1.4 / z;
var rr = 22 + Math.sin(t * 3) * 1.5;
x.beginPath();
for (var q = 0; q < 4; q++) {
var a0 = q * Math.PI / 2 + t * 0.6;
x.arc(A[0], A[1], rr, a0 + 0.2, a0 + 1.2);
x.moveTo(A[0] + Math.cos(a0 + Math.PI / 2 + 0.2) * rr, A[1] + Math.sin(a0 + Math.PI / 2 + 0.2) * rr);
}
x.stroke();
x.restore();
}
var sub = (k === "sol" ? "Home · 10 worlds" : (S.star || "").split(",")[0] + " · " + (S.ly ? S.ly + " ly" : "through the Far Gate")) + (S && S.safe ? " · protected" : S && S.danger ? " · danger" : "");
if (k === "sol")
skcLabel(x, skcSysName(k), A[0] - 12, A[1] + 16, 14, k === here ? "#FFE7A8" : "#EAF4FF", "right", sub);
else
skcLabel(x, skcSysName(k), A[0] + 14, A[1] - 12, 14, k === here ? "#FFE7A8" : "#EAF4FF", "left", sub);
if (k === here) {
x.save();
var pr = 10 + ((t * 20) % 26);
x.strokeStyle = "rgba(255,226,150," + (1 - (pr - 10) / 26) + ")";
x.lineWidth = 1.5 / z;
x.beginPath();
x.arc(A[0], A[1], pr, 0, 7);
x.stroke();
x.restore();
skcLabel(x, "YOU ARE HERE", A[0], A[1] + 34, 9, "#FFE7A8", "center");
}
});
if (SKC.key)
SKC.key.textContent = "Drag to move · wheel or pinch to zoom · tap a star · double-tap to open it";
},
function (x) {
var k = SKC.sys, P = skcSysLayout(k), t = SKC.t, z = SKC.z, here = skcHere(), col = skcStarCol(k);
x.save();
x.strokeStyle = "rgba(90,160,240,.08)";
x.lineWidth = 1 / z;
for (var gr = 50; gr <= 320; gr += 30) {
x.beginPath();
x.ellipse(500, 300, gr, gr * 0.52, 0, 0, 7);
x.stroke();
}
for (var ga = 0; ga < 12; ga++) {
var a = ga / 12 * 6.283;
x.beginPath();
x.moveTo(500, 300);
x.lineTo(500 + Math.cos(a) * 330, 300 + Math.sin(a) * 330 * 0.52);
x.stroke();
}
x.restore();
P.list.forEach(function (E) { if (E.moon || !E.r)
return; var sel = SKC.sel && SKC.sel.k === E.b.k; x.save(); x.strokeStyle = sel ? "rgba(150,230,255,.75)" : "rgba(140,200,255,.28)"; x.lineWidth = (sel ? 1.6 : 1) / z; x.beginPath(); x.ellipse(500, 300, E.r, E.r * 0.52, 0, 0, 7); x.stroke(); x.restore(); });
P.sites.forEach(function (S) {
var d = S.d, sel = SKC.sel && SKC.sel.k === d.k, hv = SKC.hover && SKC.hover.k === d.k, gd = (typeof SPG_SITES !== "undefined") && SPG_SITES[d.k];
x.save();
x.translate(S.x, S.y);
x.rotate(Math.PI / 4);
x.strokeStyle = gd ? "rgba(120,240,200,.9)" : "rgba(200,200,220,.7)";
x.lineWidth = (sel || hv ? 2 : 1.2) / z;
x.strokeRect(-5, -5, 10, 10);
x.restore();
if (gd) {
x.save();
x.globalCompositeOperation = "lighter";
skcGlow(x, S.x, S.y, 14, [90, 240, 190], 0.25 + 0.1 * Math.sin(t * 2 + S.x));
x.restore();
}
if (z > 0.85 || sel || hv)
skcLabel(x, d.name.replace(/^The /, ""), S.x + 9, S.y + 4, 10, "rgba(190,240,225,.92)", "left");
});
var L = P.list.slice().sort(function (a, b) { return a.y - b.y; });
L.forEach(function (E) {
var b = E.b, sel = SKC.sel && SKC.sel.k === b.k, hv = SKC.hover && SKC.hover.k === b.k;
if (skcIsStar(b)) {
var c = b.col ? [(b.col >> 16) & 255, (b.col >> 8) & 255, b.col & 255] : col;
x.save();
x.globalCompositeOperation = "lighter";
skcGlow(x, E.x, E.y, E.s * 4.5, c, 0.45);
skcGlow(x, E.x, E.y, E.s * 1.7, c, 0.9);
x.restore();
var sg = x.createRadialGradient(E.x - E.s * 0.2, E.y - E.s * 0.2, 0, E.x, E.y, E.s);
sg.addColorStop(0, "#FFFFFF");
sg.addColorStop(0.55, skcRgba(c, 1));
sg.addColorStop(1, skcRgba(c.map(function (v) { return Math.round(v * 0.75); }), 1));
x.fillStyle = sg;
x.beginPath();
x.arc(E.x, E.y, E.s, 0, 7);
x.fill();
if (b.orbit)
skcLabel(x, b.name, E.x, E.y - E.s - 8, 11, "#DCEBFF", "center");
else
skcLabel(x, b.name, E.x, E.y + E.s + 16, 12, "#FFF0D0", "center");
return;
}
if (b.ring) {
x.save();
x.strokeStyle = "rgba(230,215,180,.55)";
x.lineWidth = E.s * 0.35;
x.beginPath();
x.ellipse(E.x, E.y, E.s * 2.0, E.s * 0.55, -0.25, Math.PI, Math.PI * 2);
x.stroke();
x.restore();
}
var px = Math.max(8, Math.round(E.s * Math.min(3, Math.max(1.4, z * 1.4)))), img = skcSphere(b, k, px);
if (img)
x.drawImage(img, E.x - E.s, E.y - E.s, E.s * 2, E.s * 2);
else {
var pg = x.createRadialGradient(E.x - E.s * 0.35, E.y - E.s * 0.35, 0, E.x, E.y, E.s);
var bc = b.col || 0x8899AA;
pg.addColorStop(0, "#" + (0x1000000 + bc).toString(16).slice(1));
pg.addColorStop(1, "#05070C");
x.fillStyle = pg;
x.beginPath();
x.arc(E.x, E.y, E.s, 0, 7);
x.fill();
}
if (b.ring) {
x.save();
x.strokeStyle = "rgba(240,225,190,.7)";
x.lineWidth = E.s * 0.35;
x.beginPath();
x.ellipse(E.x, E.y, E.s * 2.0, E.s * 0.55, -0.25, 0, Math.PI);
x.stroke();
x.restore();
}
if (sel || hv) {
x.save();
x.strokeStyle = sel ? "rgba(140,235,255,.95)" : "rgba(140,235,255,.55)";
x.lineWidth = 1.4 / z;
x.beginPath();
x.arc(E.x, E.y, E.s + 5 + Math.sin(t * 3), 0, 7);
x.stroke();
x.restore();
}
var gf = typeof SPG_PLACES !== "undefined" && SPG_PLACES[b.k];
if (!E.moon || gf || z > 1.1 || sel || hv)
skcLabel(x, b.name, E.x + E.s + 5, E.y - 2, E.moon ? 10 : 12, b.land ? "#EAF6FF" : "rgba(200,215,235,.8)", "left", (gf && (sel || hv)) ? gf.good : null);
if (gf) {
x.save();
x.fillStyle = "#FFCB6A";
x.beginPath();
x.arc(E.x - E.s * 0.75, E.y - E.s * 0.75, 2.6, 0, 7);
x.fill();
x.restore();
}
});
if (here === k) {
var me = skcMePos(P);
if (me) {
x.save();
x.translate(me[0], me[1]);
x.rotate(me[2]);
x.fillStyle = "#FFE7A8";
x.beginPath();
x.moveTo(0, -8);
x.lineTo(5, 6);
x.lineTo(0, 3);
x.lineTo(-5, 6);
x.closePath();
x.fill();
x.restore();
skcLabel(x, "YOU", me[0] + 8, me[1] + 12, 9, "#FFE7A8", "left");
}
}
if (SKC.key)
SKC.key.innerHTML = "<span style='color:#FFCB6A'>●</span> trading post &nbsp; <span style='color:#7FF0C8'>◇</span> something to gather &nbsp;·&nbsp; tap a world";
},
function (P) {
try {
var c = (skcHere() === "sol") ? ((typeof SP !== "undefined" && SP.bodies && SP.bodies.sun) ? SP.bodies.sun.position : null) : FR.c;
if (!c || !SP.pos)
return null;
var dx = SP.pos.x - c.x, dz = SP.pos.z - c.z, d = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
var r = d <= 0 ? 0 : 40 + Math.pow(d / P.max, 0.62) * 250;
return [500 + Math.cos(a) * r, 300 + Math.sin(a) * r * 0.52, -yaw];
}
catch (e) {
return null;
}
},
function (px, py) {
var c = skcToChart(px, py), best = null, bd = 22 / Math.max(0.6, SKC.z) + 4;
if (SKC.view === "galaxy") {
skcSysList().forEach(function (k) { if (k === "halcyra" && !skcKnown(k))
return; var A = skcAt(k), d = Math.hypot(A[0] - c[0], A[1] - c[1]); if (d < bd) {
bd = d;
best = { t: "star", k: k };
} });
}
else {
var P = skcSysLayout(SKC.sys);
P.list.forEach(function (E) { var d = Math.hypot(E.x - c[0], E.y - c[1]) - E.s; if (d < bd * 0.6) {
bd = d / 0.6;
best = { t: "body", k: E.b.k };
} });
P.sites.forEach(function (S) { var d = Math.hypot(S.x - c[0], S.y - c[1]); if (d < bd * 0.7) {
bd = d / 0.7;
best = { t: "site", k: S.d.k };
} });
}
return best;
},
function (px, py) {
var h = skcPick(px, py);
SKC.hover = h;
SKC.cv.style.cursor = h ? "pointer" : "grab";
if (!h) {
SKC.tip.style.display = "none";
return;
}
var s = "";
if (h.t === "star") {
s = skcKnown(h.k) ? "<b>" + sbEsc(skcSysName(h.k)) + "</b><br>" + sbEsc(h.k === "sol" ? "Our Sun and its ten worlds" : (GX_SYS[h.k].about || "")) : "<b>An uncharted star</b><br>You need its coordinates: find them out there, or hear of it from someone.";
}
else if (h.t === "body") {
var b = skcFindBody(SKC.sys, h.k);
var gf = typeof SPG_PLACES !== "undefined" && SPG_PLACES[h.k];
s = "<b>" + sbEsc(b ? b.name : h.k) + "</b><br>" + sbEsc(b ? b.kind || "" : "") + (gf ? "<br><span style='color:#FFCB6A'>" + sbEsc(gf.good) + "</span>" : "");
}
else {
var d = skcFindSite(SKC.sys, h.k), gs = typeof SPG_SITES !== "undefined" && SPG_SITES[h.k];
s = "<b>" + sbEsc(d ? d.name : h.k) + "</b><br>" + sbEsc(d ? d.kind || "" : "") + (gs ? "<br><span style='color:#7FF0C8'>Gather: " + sbEsc(SPG_GOODS[gs.good].n) + "</span>" : "");
}
SKC.tip.innerHTML = s;
SKC.tip.style.display = "block";
var W = SKC.cv.clientWidth;
SKC.tip.style.left = Math.min(W - 270, px + 14) + "px";
SKC.tip.style.top = (py + 14) + "px";
},
function (kind, price, lbl) {
var G = SPG_GOODS[kind];
if (!G)
return "";
return "<div class='scg'><img src='" + spgPic(kind) + "' alt=''><div style='flex:1;min-width:0'><b style='font-size:13px'>" + sbEsc(G.n) + "</b><div style='font-size:11.5px;opacity:.78'>" + sbEsc(G.note || "") + "</div></div>" +
(price ? "<div style='text-align:right;font-size:12px;white-space:nowrap'><b style='color:#FFD98A'>" + price + " g</b><div style='opacity:.6;font-size:10.5px'>" + (lbl || "") + "</div></div>" : "") + "</div>";
},
function () {
var el = SKC.side;
if (!el)
return;
var S = SKC.sel, h = "", fns = {};
if (!S) {
if (SKC.view === "system")
S = { t: "sys", k: SKC.sys };
else {
el.style.display = "none";
return;
}
}
el.style.display = "block";
var here = skcHere();
if (S.t === "star" || S.t === "sys") {
var k = S.k, kn = skcKnown(k), Sy = k === "sol" ? null : GX_SYS[k];
if (!kn) {
h = "<h3>An uncharted star</h3><div style='opacity:.8'>About " + (Sy.ly || 0) + " light-years past the Far Gate. You need its coordinates before the Star Drive can find it: they turn up in wrecks, buoys and in what people tell you.</div>";
el.innerHTML = h;
return;
}
h = "<h3>" + sbEsc(skcSysName(k)) + "</h3><div style='opacity:.75;font-size:12.5px'>" + sbEsc(k === "sol" ? "Our Sun, a yellow dwarf" : Sy.star || "") + (k === here ? " · <b style='color:#FFE7A8'>you are here</b>" : "") + "</div>";
h += "<div style='margin-top:6px'>" + sbEsc(k === "sol" ? "Home: Earth, the stations, and the far Gate past Pluto." : Sy.about || "") + "</div>";
var places = Object.keys(typeof SPG_PLACES !== "undefined" ? SPG_PLACES : {}).filter(function (p) { return SPG_PLACES[p].sys === k; });
if (places.length) {
h += "<div class='scs'>Worlds and what they are good for</div>";
places.forEach(function (p) { var P = SPG_PLACES[p]; h += "<div style='margin:6px 0'><b>" + sbEsc(spgName(p)) + "</b> · <span style='opacity:.85'>" + sbEsc(P.good) + "</span><div style='display:flex;gap:4px;margin-top:3px'>" + P.goods.map(function (g) { return "<img src='" + spgPic(g) + "' title='" + sbEsc(SPG_GOODS[g].n) + "' style='width:30px;height:30px;border-radius:6px'>"; }).join("") + "</div></div>"; });
}
var sites = Object.keys(typeof SPG_SITES !== "undefined" ? SPG_SITES : {}).filter(function (s) { return SPG_SITES[s].sys === k; });
if (sites.length) {
h += "<div class='scs'>To gather in open space</div>";
sites.forEach(function (s) { var d = skcFindSite(k, s); h += "<div style='margin:3px 0'>◇ <b>" + sbEsc(d ? d.name : s) + "</b>: " + sbEsc(SPG_GOODS[SPG_SITES[s].good].n) + "</div>"; });
}
if (Sy && Sy.bodies) {
var laws = [];
Sy.bodies.forEach(function (b) { if (b.law && b.law[0])
laws.push("<b>" + sbEsc(b.name) + ":</b> " + sbEsc(b.law[0])); });
if (laws.length)
h += "<div class='scs'>Local law</div><div style='font-size:12.5px;opacity:.85'>" + laws.join("<br>") + "</div>";
}
if (SKC.view === "galaxy") {
h += "<button class='scb' data-f='open'>◎ Open the " + sbEsc(skcSysName(k)) + " system</button>";
fns.open = function () { skcView("system", k); };
}
if (k !== here) {
h += "<button class='scb' data-f='jump'>✦ Set course: jump there with the Star Drive</button>";
fns.jump = function () { skcGo(k, null); };
}
}
else if (S.t === "body") {
var b = skcFindBody(SKC.sys, S.k), P = typeof SPG_PLACES !== "undefined" && SPG_PLACES[S.k];
if (!b) {
el.style.display = "none";
return;
}
h = "<h3>" + sbEsc(b.name) + "</h3><div style='opacity:.75;font-size:12.5px'>" + sbEsc(b.kind || "") + "</div>";
if (P) {
h += "<div style='margin-top:8px;padding:7px 9px;border-radius:8px;background:rgba(255,200,110,.1);border-left:3px solid #FFCB6A'><b style='color:#FFE2A8'>Good for:</b> " + sbEsc(P.good) + "</div>";
h += "<div class='scs'>Made here · today at its trading post</div>";
P.goods.forEach(function (g) { h += skcGoodRow(g, spgBuyPrice(S.k, g), "to buy"); });
h += "<div class='scs'>Wants, and pays well for</div><div>" + P.wants.map(function (c) { return "<span class='scw'>" + sbEsc(SPG_CATS[c] || c) + "</span>"; }).join("") + "</div>";
var best = skcBestSells(S.k);
if (best.length) {
h += "<div style='font-size:12px;opacity:.8;margin-top:6px'>Best to bring here today: " + best.map(function (q) { return sbEsc(SPG_GOODS[q[0]].n) + " (" + q[1] + " g)"; }).join(", ") + "</div>";
}
}
else if (b.land) {
h += "<div style='margin-top:8px;opacity:.8'>No trading post here yet.</div>";
}
(b.rows || []).slice(0, 4).forEach(function (r) { h += "<div style='font-size:12.5px;margin-top:3px'><span style='opacity:.6'>" + sbEsc(r[0]) + ":</span> " + sbEsc(r[1]) + "</div>"; });
if (b.law && b.law.length)
h += "<div class='scs'>Local law</div><div style='font-size:12.5px'>" + b.law.map(sbEsc).join("<br>") + "</div>";
h += "<button class='scb' data-f='go'>" + (SKC.sys === here ? "➤ Set course: autopilot there" : "✦ Set course: jump to " + sbEsc(skcSysName(SKC.sys)) + ", then fly there") + "</button>";
fns.go = function () { skcGo(SKC.sys, { k: b.k, name: b.name }); };
}
else if (S.t === "site") {
var d = skcFindSite(SKC.sys, S.k), gs = typeof SPG_SITES !== "undefined" && SPG_SITES[S.k];
h = "<h3>" + sbEsc(d ? d.name : S.k) + "</h3><div style='opacity:.75;font-size:12.5px'>" + sbEsc(d ? d.kind || "" : "") + "</div>";
if (gs) {
h += "<div class='scs'>To gather here</div>" + skcGoodRow(gs.good, 0, "") + "<div style='font-size:12.5px;opacity:.85'>Fly in close and use 📡 Scan: up to " + gs.n + " each hour, and sell it at any trading post.</div>";
}
if (d && d.notes && d.notes[0])
h += "<div style='margin-top:8px;font-size:12.5px;opacity:.85'>" + sbEsc(d.notes[0]) + "</div>";
h += "<button class='scb' data-f='go'>" + (SKC.sys === here ? "➤ Set course: autopilot there" : "✦ Set course: jump to " + sbEsc(skcSysName(SKC.sys)) + ", then fly there") + "</button>";
fns.go = function () { skcGo(SKC.sys, { site: S.k, name: d ? d.name : S.k }); };
}
el.innerHTML = h;
Array.prototype.forEach.call(el.querySelectorAll("[data-f]"), function (btn) { var f = fns[btn.getAttribute("data-f")]; if (f)
btn.onclick = function (e) { e.stopPropagation(); f(); }; });
},
function (T) {
if (!T)
return;
try {
if (skcHere() === "sol") {
if (T.k && SP.bodies && SP.bodies[T.k]) {
SP.auto = { k: T.k, name: T.name };
setStatus("<b>Autopilot:</b> on course for " + esc(T.name) + ". Steer to take the helm back.");
}
return;
}
var p = null, r = 200;
if (T.k) {
p = frWorld(T.k);
var b = FR_BY && FR_BY[T.k];
r = b ? b.r * 2.6 + 40 : 300;
}
else if (T.site) {
var d = FR_DISC.filter(function (q) { return q.k === T.site; })[0];
if (d) {
p = frDiscPos(d);
r = (d.r || 40) * 1.8 + 120;
}
}
if (!p)
return;
var from = SP.pos.clone().sub(p);
from.y = 0;
if (from.lengthSq() < 1)
from.set(1, 0, 0);
from.normalize();
SP.auto = { pos: p.clone().addScaledVector(from, r).add(new THREE.Vector3(0, r * 0.15, 0)), fr: T.k && FR_BY[T.k] ? T.k : null, frR: r, frFrom: from, name: T.name };
setStatus("<b>Autopilot:</b> on course for " + esc(T.name) + ". Steer to take the helm back.");
}
catch (e) {
console.warn("star chart course", e);
}
},
function () {
var out = [];
if (typeof frIn === "function" && frIn())
FR_BODIES.forEach(function (b) { if (FR.bodies[b.k])
out.push({ c: frWorld(b.k), r: b.r * (b.star ? 1.6 : 1.1) }); });
else if (typeof SP_BODIES !== "undefined" && SP.bodies)
SP_BODIES.forEach(function (b) { var h = SP.bodies[b.k]; if (h)
out.push({ c: h.position.clone(), r: b.r * (b.k === "sun" ? 1.7 : 1.12) }); });
return out;
},
function (t) {
var p = SP.pos, dir = t.clone().sub(p), L = dir.length();
if (L < 1)
return null;
dir.divideScalar(L);
var best = null, bt = 1e18;
skcSolids().forEach(function (s) {
var oc = s.c.clone().sub(p), tc = oc.dot(dir);
if (tc < 0 || tc > L + s.r)
return;
var R = s.r * 1.25 + 30, d2 = oc.lengthSq() - tc * tc;
if (d2 > R * R)
return;
if (t.distanceTo(s.c) < s.r)
return;
if (tc < bt) {
bt = tc;
best = { s: s, R: R };
}
});
if (!best)
return null;
var c = best.s.c, off = p.clone().sub(c), perp = off.clone().addScaledVector(dir, -off.dot(dir));
if (perp.lengthSq() < 1)
perp.set(0, 1, 0);
perp.normalize();
var w = c.clone().addScaledVector(perp, best.R * 1.3);
if (w.distanceTo(p) < 40)
w.addScaledVector(dir, 80);
return w;
},
function () {
if (typeof SPG_PLACES === "undefined" || !sbHere())
return null;
var best = null, bd = 1e9, v = new THREE.Vector3();
try {
if (typeof frIn === "function" && frIn()) {
FR_BODIES.forEach(function (b) { var P = SPG_PLACES[b.k]; if (!P)
return; frBodyPos(b.k, v).add(FR.c); var d = v.distanceTo(SP.pos) - (b.r || 50); if (d < Math.max(900, (b.r || 50) * 5) && d < bd) {
bd = d;
best = b.k;
} });
}
else if (typeof SP_BODIES !== "undefined" && SP.bodies) {
SP_BODIES.forEach(function (b) { var P = SPG_PLACES[b.k]; if (!P || !SP.bodies[b.k])
return; SP.bodies[b.k].getWorldPosition(v); var d = v.distanceTo(SP.pos) - (b.r || 50); if (d < Math.max(600, (b.r || 50) * 5) && d < bd) {
bd = d;
best = b.k;
} });
}
}
catch (e) {
return null;
}
return best;
},
function (where) {
where = where || MK.near;
if (!where || !SPG_PLACES[where])
return;
var P = SPG_PLACES[where];
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚖ Trading post · " + sbEsc(spgName(where)) + "</div><div style='opacity:.8'>" + sbEsc(P.good) + "</div><div style='margin-top:8px;opacity:.7'>Opening the books...</div>", {});
mkCall("sp_market", { p_where: where }).then(function (r) {
if (!r || !r.ok) {
mkSay(r);
worldCard(null);
return;
}
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚖ Trading post · " + sbEsc(spgName(where)) + "</div><div style='opacity:.8;font-size:13px'>" + sbEsc(P.good) + "</div>", fns = {};
var row = function (kind, price, have, btns, tag) {
var G = SPG_GOODS[kind] || { n: (typeof ltfName === "function" ? ltfName(kind) : kind) };
return "<div style='display:flex;align-items:center;gap:8px;margin:5px 0;padding:4px 6px;border-radius:8px;background:rgba(143,180,232,.07)'><img src='" + spgPic(kind) + "' alt='' style='width:36px;height:36px;border-radius:7px;flex:none' onerror=\"this.style.visibility='hidden'\">" +
"<div style='flex:1;min-width:0'><b style='font-size:13px'>" + sbEsc(G.n) + "</b>" + (tag ? " <span style='font-size:11px;color:#FFCB6A'>" + tag + "</span>" : "") + "<div style='font-size:11.5px;opacity:.7'>you carry " + (have || 0) + "</div></div>" +
"<b style='color:#FFD98A;font-size:13px;white-space:nowrap'>" + price + " g</b>" + btns + "</div>";
};
var bb = function (id, t) { return "<span data-w='" + id + "' role='button' style='padding:4px 8px;border-radius:7px;border:1px solid rgba(255,210,130,.6);background:rgba(255,200,110,.12);font-size:12px;white-space:nowrap'>" + t + "</span>"; };
h += "<div style='margin-top:8px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.7'>Made here · buy</div>";
(r.sells || []).forEach(function (s, i) { h += row(s.kind, s.price, s.have, bb("b1" + i, "Buy 1") + bb("b5" + i, "Buy 5")); fns["b1" + i] = function () { mkTrade("sp_buy", where, s.kind, 1); }; fns["b5" + i] = function () { mkTrade("sp_buy", where, s.kind, 5); }; });
var left = Math.max(0, (r.cap || 0) - (r.sold_today || 0));
h += "<div style='margin-top:10px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.7'>What you carry · sell</div><div style='font-size:11.5px;opacity:.7'>They want: " + P.wants.map(function (c) { return sbEsc(SPG_CATS[c] || c); }).join(", ") + ". The traders here will pay you up to " + left + " more gold today.</div>";
var buys = (r.buys || []).filter(function (b) { return SPG_GOODS[b.kind]; });
if (!buys.length)
h += "<div style='opacity:.7;margin:6px 0'>You carry no star goods yet. Buy at one world and bring them to another that wants them, or gather them in open space.</div>";
buys.forEach(function (b, i) { h += row(b.kind, b.price, b.have, bb("s1" + i, "Sell 1") + (b.have > 1 ? bb("sa" + i, "Sell all") : ""), b.wanted ? "wanted" : ""); fns["s1" + i] = function () { mkTrade("sp_sell", where, b.kind, 1); }; fns["sa" + i] = function () { mkTrade("sp_sell", where, b.kind, b.have); }; });
h += worldBtn("mk-chart", "🧭 Star chart", "Where else wants what you carry");
fns["mk-chart"] = function () { worldCard(null); skcOpen("system", skcHere()); SKC.sel = { t: "body", k: where }; skcSide(); };
worldCard(h, fns);
}).catch(function (e) { sbSay(sbEsc(e && e.message || "The trading post did not answer.")); worldCard(null); });
},
function (fn, where, kind, n) {
if (MK.busy)
return;
MK.busy = true;
mkCall(fn, { p_where: where, p_kind: kind, p_n: n }).then(function (r) {
MK.busy = false;
if (!r || !r.ok) {
mkSay(r);
return;
}
var G = SPG_GOODS[kind] || { n: kind };
sbSay(fn === "sp_buy" ? "⚖ Bought " + r.n + " × " + sbEsc(G.n) + " for " + r.gold + " gold." : "⚖ Sold " + r.n + " × " + sbEsc(G.n) + " for " + r.gold + " gold.");
try {
sbTone(fn === "sp_buy" ? 520 : 780, 0.12);
}
catch (e) { }
try {
if (typeof FG !== "undefined" && FG.loaded && typeof cityRpc === "function")
cityRpc("my_stock").then(function (rows) { var S = {}; (rows || []).forEach(function (q) { S[q.kind] = +q.amount || 0; }); FG.stock = S; }).catch(function () { });
}
catch (e) { }
mkCard(where);
}).catch(function (e) { MK.busy = false; sbSay(sbEsc(e && e.message || "The trading post did not answer.")); });
},
function (dt) {
for (var i = SV.wrecks.length - 1; i >= 0; i--) {
var w = SV.wrecks[i], F = w.F;
w.t += dt;
if (!sbHere() || w.t > 540) {
svDropWreck(w);
SV.wrecks.splice(i, 1);
continue;
}
F.p.addScaledVector(F.v, dt);
F.v.multiplyScalar(1 - dt * 0.05);
F.g.position.copy(F.p);
F.g.rotation.x += dt * 0.03;
F.g.rotation.z += dt * 0.02;
if (w.done && F.g.userData.svGlow)
F.g.userData.svGlow.material.opacity = 0.15;
}
},
function () {
var best = null, bd = 1e9;
SV.wrecks.forEach(function (w) { if (w.done)
return; var d = w.F.p.distanceTo(SP.pos) - (w.F.T.len || 15); if (d < 110 && d < bd) {
bd = d;
best = { w: w };
} });
if (typeof frIn === "function" && frIn() && FR_BY.cinder && FR.sys === "reach")
SV.drift.forEach(function (h) { var p = svHulkPos(h, new THREE.Vector3()), d = p.distanceTo(SP.pos) - h.r; if (d < 120 && d < bd) {
bd = d;
best = { h: h };
} });
var T = svTipPos();
if (T && !svTipDone()) {
var d = T.distanceTo(SP.pos) - 30;
if (d < 130 && d < bd) {
bd = d;
best = { tip: SV.tip.k };
}
}
return best;
},
function (N) {
if (!N || SV.busy)
return;
if (SB.battle) {
svSaid("Not with raiders firing on you. Win first.");
return;
}
var kind = N.w ? "raider" : N.h ? "drift" : "tip", key = N.w ? N.w.ship : N.h ? N.h.key : N.tip, ship = N.w ? N.w.ship : null;
var what = N.w ? "the " + (SB_FOE[ship] ? SB_FOE[ship].name.toLowerCase() : "raider ship") : N.h ? "the old hulk" : "the wreck of " + SV_TIPS[N.tip].ship;
SV.busy = true;
SP.vel.multiplyScalar(0.2);
try {
sbTone(330, 0.4);
}
catch (e) { }
svSaid("🔧 <b>Cutting into " + sbEsc(what) + "...</b> Your ship's arm anchors to the hull and the cutters bite.");
setTimeout(function () {
if (N.w)
N.w.done = true;
if (!sbSigned()) {
SV.busy = false;
svSaid("🔧 You cut into " + sbEsc(what) + ". <b>Sign in</b> and what you salvage is kept in your backpack.");
return;
}
sbRpc("sv_salvage", { p_kind: kind, p_key: key, p_ship: ship }).then(function (o) {
SV.busy = false;
if (!o || o.ok === false) {
if (N.w && o && /towed/.test(o.say || ""))
N.w.done = true;
else if (N.w)
N.w.done = false;
svSaid("🔧 " + sbEsc((o && o.say) || "The cutters jammed. Try again."));
return;
}
if (N.h) {
N.h.done = svDay();
svHulkSave();
}
if (N.tip) {
SV.tip.done = svDay();
svTipSave();
}
var rows = (o.items || []).map(function (it) { return { kind: it.kind, t: "<b>" + (+it.n || 1) + " × " + sbEsc(it.name || it.kind) + "</b>", i: it.icon || "📦" }; });
if (o.gold)
rows.push({ t: "<b>" + o.gold + " gold</b> in a strongbox", i: "🪙", q: "#FFD98A" });
if (typeof dglShow === "function")
dglShow("🔧 Salvage: " + sbEsc(what), rows, sbEsc(o.say || "") + (o.empty ? "" : " In your backpack; the Maker's Book shows what it makes."));
else
svSaid("🔧 " + sbEsc(o.say || "") + " " + rows.map(function (r) { return r.t; }).join(", "));
try {
sbTone(o.empty ? 440 : 880, 0.18);
if (!o.empty)
setTimeout(function () { sbTone(1175, 0.2); }, 160);
}
catch (e) { }
try {
if (typeof loadStock === "function")
loadStock();
if (o.gold && typeof refreshStanding === "function")
refreshStanding();
}
catch (e) { }
}).catch(function (e) {
SV.busy = false;
if (N.w)
N.w.done = false;
var miss = typeof rpcMissing === "function" && rpcMissing(e);
svSaid("🔧 " + (miss ? "Salvage opens once the server has the latest server update. The wreck will wait a few minutes." : "The cutters jammed. Try again in a moment."));
});
}, 2600);
},
function (dt) {
if (!sbHere() || (typeof GX !== "undefined" && GX.riding)) {
SV.heatT = 0;
SV.heatAt = 0;
return;
}
var c = null, r = 0, nm = "", v = new THREE.Vector3();
if (typeof frIn === "function" && frIn()) {
FR_BODIES.forEach(function (b) { if (!b.star)
return; frBodyPos(b.k, v); v.add(FR.c); if (!c || v.distanceTo(SP.pos) / b.r < c.distanceTo(SP.pos) / r) {
c = v.clone();
r = b.r;
nm = b.name;
} });
}
else if (SP.bodies && SP.bodies.sun && typeof SP_BY !== "undefined") {
c = SP.bodies.sun.position.clone();
r = SP_BY.sun.r;
nm = "the Sun";
}
if (!c)
return;
var d = c.distanceTo(SP.pos);
var now = performance.now();
if (d < r * 2.05) {
if (!SV.heatAt)
SV.heatAt = now;
SV.heatT = (now - SV.heatAt) / 1000;
}
else {
SV.heatT = 0;
SV.heatAt = 0;
}
if (SV.heatT > 1.2) {
SV.heatAt = 0;
SV.heatT = 0;
SV.rescued++;
var out = SP.pos.clone().sub(c);
if (out.lengthSq() < 1)
out.set(0, 0, 1);
out.normalize();
SP.pos.copy(c).addScaledVector(out, r * 4.2);
SP.vel.set(0, 0, 0);
SP.auto = null;
yaw = Math.atan2(-out.x, -out.z);
pitch = Math.asin(Math.max(-1, Math.min(1, out.y))) * 0.5;
if (typeof spFlash === "function")
spFlash(0xFF9A5A);
if (SB.battle)
try {
sbEndBattle("fled");
}
catch (e) { }
svSaid("🔥 <b>Heat alarm!</b> The ship's safety took the helm and pulled you clear of " + sbEsc(nm) + ": nothing can land on a star, and its glare blinds every screen. You are facing away from it now, safe.");
}
},
function () {
if (!SV.tip || !sbHere() || (typeof frIn === "function" && frIn()))
return null;
var T = SV_TIPS[SV.tip.k], h = SP.bodies && SP.bodies[T.body], B = SP_BY[T.body];
if (!h || !B)
return null;
var o = new THREE.Vector3(T.off[0], T.off[1], T.off[2]).normalize();
return h.position.clone().addScaledVector(o, B.r * 3 + 160);
},
function () {
var best = null, bd = 1e12;
SV_ICE.forEach(function (k) { var h = SP.bodies && SP.bodies[SV_TIPS[k].body]; if (!h)
return; if (SV.tip && SV.tip.k === k && SV.tip.done === svDay())
return; var d = h.position.distanceTo(SP.pos); if (d < bd) {
bd = d;
best = k;
} });
if (!best)
best = SV_ICE[0];
if (!SV.tip || SV.tip.k !== best || SV.tip.done)
SV.tip = { k: best, at: Date.now(), done: null };
svTipSave();
svTipBuild();
return best;
},
function () {
var G = sbG();
if (!G)
return;
if (SV.tipG && SV.tipG.parent)
SV.tipG.parent.remove(SV.tipG);
SV.tipG = null;
var p = svTipPos();
if (!p || svTipDone())
return;
var g = new THREE.Group(), w = sbBuildCutter(0xB8BCC4, 0x5A6A7A), H = sbFit(w, 34);
H.rotation.set(0.5, 0.9, 2.2);
g.add(H);
H.traverse(function (o) { if (o.userData && o.userData.sbFlame)
o.visible = false; });
g.add(wGlow(0xC8A0FF, 90, 0.55));
var b2 = wGlow(0xFFE8C0, 26, 0.7);
b2.position.set(0, 12, 0);
g.add(b2);
g.position.copy(p);
G.add(g);
SV.tipG = g;
},
function () {
var on = orwCount(), all = on >= 3;
var c0 = new THREE.Color(0x2A3A4A), c1 = new THREE.Color(0xBFE8FF);
ORW.lines.forEach(function (m) { m.color.copy(c0).lerp(c1, on / 3); });
if (ORW.eye && ORW.eye.material && ORW.eye.material.color)
ORW.eye.material.color.setHex(all ? 0xE0F4FF : on ? 0x8AC8FF : 0x4A6A8A);
ORW.sites.forEach(function (s) { if (s.glow)
s.glow.material.opacity = orwGet()[s.k] ? 0.7 : 0.18; });
},
function (k) {
var S = orwGet();
if (S[k])
return;
if (k === "core" && !(S.works && S.relay)) {
sbSay("The Deep Core will not wake on its own: it needs power from the Works and a voice from the Relay first. Wake those, then come back.");
return;
}
S[k] = Date.now();
orwSet(S);
try {
sbTone(220, 0.5);
setTimeout(function () { sbTone(330, 0.5); }, 400);
setTimeout(function () { sbTone(495, 0.6); }, 800);
}
catch (e) { }
orwLook();
var n = orwCount(S), H = ORW_HEARTS[k];
sbSay("<b>" + sbEsc(H.n.charAt(0).toUpperCase() + H.n.slice(1)) + " wakes.</b> " + H.woke + " <b>" + n + " of 3</b> hearts awake." + (n === 3 ? "" : " The Archive will want to hear."));
if (n === 3)
setTimeout(function () {
sbSay("<b>Orr is awake.</b> Every tower lights. The machines walk their roads again. The Archive: \"You have given me my world back. Orr works for you now: Unit Seven has opened the workshop, and my machines will mend your ship whenever you land.\" The Orrem count you a friend; an Orrem memory-core is in your backpack.");
try {
frStandAdd("orrem", "task");
frStandAdd("orrem", "clue");
if (typeof frGift === "function")
frGift("orrem");
}
catch (e) { }
}, 4200);
},
function (A) {
if (!frLogged(A.k)) {
worldCard(null);
sbSay("<b>The Archive's question:</b> \"What is " + sbEsc(A.name) + " now? Go and look, and tell me.\" It is out in the Far Reach: take off, open the chart (M) and scan it (E), then come back.");
return;
}
var S = orwGet();
S.ask = orwDay();
S.asked = (S.asked || 0) + 1;
orwSet(S);
try {
frStandAdd("orrem", "defend");
frStandAdd("orrem", "trade");
}
catch (e) { }
var lines = ["\"So it is still there. My people passed it on the way out. I had wondered.\"", "\"I will keep this. One day someone will ask me, and I will know.\"", "\"The arks went that way. Thank you for looking where they looked.\"", "\"Every reading you bring, I am a little less alone.\""];
worldCard(null);
sbSay("<b>The Archive's question, answered.</b> " + lines[(S.asked || 0) % lines.length] + " The Orrem think better of you.");
},
function (G) {
var O = typeof GX_OUT !== "undefined" && GX_OUT.tullimar;
if (!O)
return;
var A = tmShrineAt(), dx = A[0] - TM_C[0], dz = A[1] - TM_C[1], L = Math.hypot(dx, dz), px = TM_C[0] + dx / L * 50, pz = TM_C[1] + dz / L * 50 + 3, y = tmY(px, pz);
var g = mmG(G, px, y, pz), wood = mmMat(0x6A4A2A, { tex: "worn" });
mmCyl(g, wood, 0.12, 0.14, 3.6, 0, 1.8, 0, 0, 0, 0, 8);
mmEll(g, mmMat(O.lamp, { glow: 1 }), 0.18, 0.22, 0.18, 0, 3.75, 0, 10);
O.places.forEach(function (P, i) {
var ax = P.at[0] - px, az = P.at[1] - pz, d = Math.round(Math.hypot(ax, az) / 10) * 10, ry = Math.atan2(-az, ax);
var arm = mmG(g, 0, 2.9 - i * 0.62, 0, 0, ry, 0), sign = wSign([P.n, "about " + d + " m · follow the green lamps"], 2.6, 0.5, "#2A2018", "#F0DCA8");
sign.position.set(1.4, 0, 0);
arm.add(sign);
});
SF.solids.push({ x: px, z: pz, r: 0.3 });
},
function () {
var out = [], lander = Math.atan2(6 - TM_C[1], 8 - TM_C[0]), n = 14;
for (var i = 0; i < n && out.length < 12; i++) {
var a = i / n * Math.PI * 2 + 0.22;
var d1 = Math.abs(Math.atan2(Math.sin(a - lander), Math.cos(a - lander))), d2 = Math.abs(Math.atan2(Math.sin(a), Math.cos(a)));
if (d1 < 0.3 || d2 < 0.3)
continue;
out.push(a);
}
while (out.length < 12)
out.push(out.length * 0.5);
return out;
},
function (G) {
var lite = tmLite(), C = TM_C, B = kitBatch(), sol = SF.solids, R = wRand(7177), c = function (h, f) { return kitCol(h, f || 1); };
TM.shops = [];
TM.folk = [];
TM.built = true;
var F0 = function (x, z, ry) { return { x: x, y: tmY(x, z), z: z, ry: ry || 0 }; };
var step = lite ? 4 : 3, rad = 44;
for (var x = -rad; x <= rad; x += step)
for (var z = -rad; z <= rad; z += step) {
var d = Math.hypot(x, z);
if (d > rad)
continue;
var px = C[0] + x, pz = C[1] + z, y = tmY(px, pz), t = 0.86 + R() * 0.22, ring = d > rad - 4;
kitAdd(B, "stone", c(ring ? 0x9A8C74 : 0xC8BCA4, t), kitBoxG(step - 0.05, 0.16, step - 0.05), px, y + 0.02, pz);
}
var bf = F0(C[0], C[1]);
kitAddF(B, bf, "stone", c(0x9A8A74), kitCylG(3.4, 3.8, 1.2, 8), 0, 0.6, 0);
kitAddF(B, bf, "stone", c(0xA89880), kitCylG(2.9, 3.2, 7, 8), 0, 4.7, 0);
kitAddF(B, bf, "stone", c(0x8A7A64), kitCylG(3.2, 3.2, 0.4, 8), 0, 8.3, 0);
for (var p = 0; p < 8; p++) {
var pa = p / 8 * Math.PI * 2 + Math.PI / 8;
kitAddF(B, bf, "metal", c(0xC8A060), kitCylG(0.16, 0.2, 4.2, 8), Math.cos(pa) * 2.5, 10.6, Math.sin(pa) * 2.5);
}
kitAddF(B, bf, "metal", c(0xB8904A), kitCylG(3.0, 3.0, 0.35, 16), 0, 12.8, 0);
kitAdd(B, "metal", c(0xC8A060), new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(3.0, 0), new THREE.Vector2(2.8, 0.9), new THREE.Vector2(2.1, 2.0), new THREE.Vector2(1.0, 2.8), new THREE.Vector2(0.3, 3.3), new THREE.Vector2(0, 3.4)], lite ? 10 : 20), bf.x, bf.y + 13, bf.z);
kitAdd(B, "metal", c(0xE8C870), kitBallG(0.35, 1), bf.x, bf.y + 16.7, bf.z);
var bell = new THREE.LatheGeometry([new THREE.Vector2(0, 2.2), new THREE.Vector2(0.5, 2.15), new THREE.Vector2(1.0, 1.6), new THREE.Vector2(1.15, 0.6), new THREE.Vector2(1.5, 0.05), new THREE.Vector2(1.45, 0)], lite ? 10 : 20);
kitAdd(B, "metal", c(0xC89A50), bell, bf.x, bf.y + 9.1, bf.z);
[0, 1, 2, 3].forEach(function (q) {
var a = q * Math.PI / 2;
var cx = Math.cos(a) * 3.0, cz = Math.sin(a) * 3.0;
kitAdd(B, "plain", c(0xF4ECD8), kitCylG(1.1, 1.1, 0.12, lite ? 12 : 20), bf.x + cx, bf.y + 6.4, bf.z + cz, -a + Math.PI / 2, Math.PI / 2);
kitAdd(B, "metal", c(0xC8A060), new THREE.TorusGeometry(1.15, 0.1, 6, lite ? 12 : 20), bf.x + cx * 1.02, bf.y + 6.4, bf.z + cz * 1.02, -a + Math.PI / 2);
kitAdd(B, "plain", c(0x2A2420), kitBoxG(0.08, 0.8, 0.05), bf.x + cx * 1.03, bf.y + 6.6, bf.z + cz * 1.03, -a + Math.PI / 2, 0, 0.6);
kitAdd(B, "plain", c(0x2A2420), kitBoxG(0.06, 0.55, 0.05), bf.x + cx * 1.03, bf.y + 6.35, bf.z + cz * 1.03, -a + Math.PI / 2, 0, -1.2);
});
sol.push({ x: C[0], z: C[1], r: 3.9 });
var la = Math.atan2(6 - C[1], 8 - C[0]), ax = C[0] + Math.cos(la) * 46, az = C[1] + Math.sin(la) * 46, af = F0(ax, az, -la + Math.PI / 2);
[-1, 1].forEach(function (s) { kitAddF(B, af, "stone", c(0xA89880), kitBoxG(1.2, 6.5, 1.2), s * 4.2, 3.25, 0); kitAddF(B, af, "metal", c(0xC8A060), kitBallG(0.5, 1), s * 4.2, 7.0, 0); sol.push({ x: ax + Math.cos(af.ry) * s * 4.2, z: az - Math.sin(af.ry) * s * 4.2, r: 0.9 }); });
kitAddF(B, af, "metal", c(0xB8904A), kitBoxG(9.6, 0.5, 0.6), 0, 6.4, 0);
kitAddF(B, af, "metal", new THREE.Color(0xB8904A), new THREE.TorusGeometry(4.2, 0.22, 6, lite ? 10 : 18, Math.PI), 0, 6.4, 0);
tmSign(G, "TULLIMAR MARKET", "The market that never closes", ax, af.y + 5.2, az, af.ry, 5.6, 1.3);
var nL = lite ? 8 : 14, lp = [];
for (var L = 0; L < nL; L++) {
var lA = L / nL * Math.PI * 2 + 0.1, lx = C[0] + Math.cos(lA) * 40, lz = C[1] + Math.sin(lA) * 40;
if (Math.abs(Math.atan2(Math.sin(lA - la), Math.cos(lA - la))) < 0.12)
continue;
var lf = F0(lx, lz);
kitAddF(B, lf, "metal", c(0x3A3430), kitCylG(0.09, 0.14, 4.6, 8), 0, 2.3, 0);
kitAddF(B, lf, "metal", c(0x3A3430), kitBoxG(0.9, 0.08, 0.08), 0.4, 4.5, 0);
kitAddF(B, lf, "glow", c([0xFFD08A, 0xFFB070, 0xC8F0B0][L % 3]), kitCylG(0.2, 0.22, 0.5, 8), 0.8, 4.1, 0);
kitAddF(B, lf, "metal", c(0xC8A060), kitConeG(0.3, 0.25, 8), 0.8, 4.45, 0);
lp.push([lx, lf.y + 4.2, lz]);
sol.push({ x: lx, z: lz, r: 0.3 });
}
if (!lite)
lp.forEach(function (a, i) {
var b = lp[(i + 1) % lp.length];
for (var s2 = 1; s2 < 8; s2++) {
var t = s2 / 8, sag = Math.sin(t * Math.PI) * 1.3;
kitAdd(B, "glow", c([0xFFD08A, 0xFF9A6A, 0xA8F0C8, 0xF0A8E8][s2 % 4], 0.85), kitBallG(0.12, 0), a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - sag, a[2] + (b[2] - a[2]) * t);
}
});
var slots = tmSlots();
TM_SHOPS.forEach(function (m, i) {
var a = slots[i], r = 20 + (i % 2) * 3.5, x = C[0] + Math.cos(a) * r, z = C[1] + Math.sin(a) * r, ry = Math.atan2(C[0] - x, C[1] - z);
var F = F0(x, z, ry), sr = tmStall(B, F, m, wRand(900 + i * 37));
tmWares(B, F, m, wRand(400 + i * 91));
sol.push({ x: x, z: z, r: sr });
TM.shops.push({ m: m, x: x, z: z, ry: ry, fx: x + Math.sin(ry) * (sr + 0.9), fz: z + Math.cos(ry) * (sr + 0.9) });
tmSign(G, m.n.split("-")[0], tmSignLine(m), x + Math.sin(ry) * (m.form === "cart" ? 1.4 : 1.9), F.y + (m.form === "cart" ? 3.0 : 3.5), z + Math.cos(ry) * (m.form === "cart" ? 1.4 : 1.9), ry, 2.6, 0.9, m.pic);
if (!lite) {
var bx = C[0], by = bf.y + 8.4, bz = C[1], ex = x, ey = F.y + 3.2, ez = z, nB = 14;
for (var q = 1; q < nB; q++) {
var t = q / nB, sag = Math.sin(t * Math.PI) * 1.6;
kitAdd(B, "plain", c(m.col[q % 2]), new THREE.ConeGeometry(0.22, 0.42, 3).scale(1, 1, 0.12), bx + (ex - bx) * t, by + (ey - by) * t - sag - 0.2, bz + (ez - bz) * t, Math.atan2(ex - bx, ez - bz), Math.PI);
}
}
});
for (var j = 0; j < slots.length; j++) {
var a0 = slots[j], a1 = slots[(j + 1) % slots.length], am = Math.atan2(Math.sin(a0) + Math.sin(a1), Math.cos(a0) + Math.cos(a1)), rr = 21 + R() * 3;
var px2 = C[0] + Math.cos(am) * rr, pz2 = C[1] + Math.sin(am) * rr, PF = F0(px2, pz2, am);
if (j % 3 === 0)
tmPlanter(B, PF, R);
else
tmCargo(B, PF, R, lite);
sol.push({ x: px2, z: pz2, r: 1.3 });
}
var nr = lite ? 5 : 10;
for (var rg = 0; rg < nr; rg++) {
var ra = rg / nr * Math.PI * 2 + 0.5, rx = C[0] + Math.cos(ra) * 32, rz = C[1] + Math.sin(ra) * 32;
if (Math.abs(Math.atan2(Math.sin(ra - la), Math.cos(ra - la))) < 0.25 || Math.abs(Math.atan2(Math.sin(ra), Math.cos(ra))) < 0.25)
continue;
var RF = F0(rx, rz, -ra);
tmRug(B, RF, wRand(5100 + rg), rg);
sol.push({ x: rx, z: rz, r: 1.6 });
}
var bk = TM.shops[0];
if (bk) {
for (var tb = 0; tb < (lite ? 1 : 3); tb++) {
var ta = Math.atan2(bk.z - C[1], bk.x - C[0]) + (tb - 1) * 0.16, tx = C[0] + Math.cos(ta) * 13, tz = C[1] + Math.sin(ta) * 13, TF = F0(tx, tz, ta);
kitAddF(B, TF, "wood", c(0x7A5232), kitCylG(0.8, 0.8, 0.08, lite ? 10 : 16), 0, 0.82, 0);
kitAddF(B, TF, "metal", c(0xC8A060), kitCylG(0.06, 0.12, 0.8, 8), 0, 0.4, 0);
[0, 1, 2].forEach(function (s3) { var sa = s3 / 3 * Math.PI * 2; kitAddF(B, TF, "wood", c(0x6A4428), kitCylG(0.25, 0.25, 0.06, 10), Math.cos(sa) * 1.2, 0.46, Math.sin(sa) * 1.2); kitAddF(B, TF, "metal", c(0x8A7A60), kitCylG(0.04, 0.04, 0.45, 6), Math.cos(sa) * 1.2, 0.22, Math.sin(sa) * 1.2); });
kitAddF(B, TF, "plain", c(0xC88A4A), kitCylG(0.16, 0.17, 0.12, 10), 0.2, 0.92, 0.1);
kitAddF(B, TF, "plain", c(0xF8E8F0), kitCylG(0.13, 0.15, 0.05, 10), 0.2, 1.0, 0.1);
sol.push({ x: tx, z: tz, r: 1.2 });
}
}
var dx = C[0] + 72, dz = C[1], DF = F0(dx, dz, Math.PI / 2);
kitAddF(B, DF, "wood", c(0x7A5838), kitBoxG(16, 0.5, 12), 0, 0.9, 0);
for (var pz3 = -1; pz3 <= 1; pz3 += 2)
for (var px3 = -1; px3 <= 1; px3 += 2)
kitAddF(B, DF, "wood", c(0x5A4028), kitCylG(0.3, 0.3, 1.4, 8), px3 * 7.4, 0.35, pz3 * 5.4);
for (var pl = 0; pl < 8; pl++)
kitAddF(B, DF, "wood", c(0x8A6440, 0.9 + ((pl % 3) * 0.06)), kitBoxG(15.8, 0.04, 1.4), 0, 1.17, -5.25 + pl * 1.5);
sol.push({ x: dx, z: dz, hw: 6.2, hd: 8.2 });
var CF = F0(dx + 5, dz - 5.5, 0);
kitAddF(B, CF, "metal", c(0xC8A040), kitBoxG(0.7, 11, 0.7), 0, 5.5, 0);
kitAddF(B, CF, "metal", c(0xB89038), kitBoxG(11, 0.6, 0.6), 4, 10.6, 0);
kitAddF(B, CF, "metal", c(0x8A7030), kitBoxG(2.4, 0.9, 1.2), -2.2, 10.4, 0);
for (var cb = 0; cb < 5; cb++)
kitAddF(B, CF, "metal", c(0xB89038), kitBoxG(0.08, 1.6, 0.08), cb * 2 - 0.2, 9.6, 0, 0, 0, 0.6);
kitAddF(B, CF, "metal", c(0x2A2A2A), kitCylG(0.03, 0.03, 3.6, 4), 8.5, 8.6, 0);
kitAddF(B, CF, "wood", c(0x9A6A3A), kitBoxG(1.3, 1.0, 1.3), 8.5, 6.4, 0);
sol.push({ x: dx + 5, z: dz - 5.5, r: 0.6 });
var BF = F0(dx + 14, dz, 0), hullG = new THREE.SphereGeometry(6, lite ? 14 : 24, lite ? 8 : 14);
hullG.scale(1, 0.42, 1.55);
kitAddF(B, BF, "metal", c(0x5A9A4A), hullG, 0, 3.4, 0);
kitAddF(B, BF, "metal", c(0xC8A040), new THREE.TorusGeometry(6.05, 0.22, 6, lite ? 16 : 32).scale(1, 1.55, 1), 0, 3.4, 0, 0, Math.PI / 2);
kitAddF(B, BF, "metal", c(0x4A7A3A), kitCylG(4.2, 4.6, 0.4, lite ? 12 : 20), 0, 5.85, 0);
kitAddF(B, BF, "plain", c(0xA8D8E8), new THREE.SphereGeometry(1.6, lite ? 10 : 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0, 6.0, 6.0);
kitAddF(B, BF, "metal", c(0xC8A040), new THREE.TorusGeometry(1.6, 0.08, 4, lite ? 12 : 20), 0, 6.02, 6.0, 0, Math.PI / 2);
for (var ck = 0; ck < (lite ? 3 : 7); ck++)
kitAddF(B, BF, "wood", c([0x9A6A3A, 0x7A5030, 0xA87A48][ck % 3]), kitBoxG(1.1, 0.9, 1.1), -1.6 + (ck % 3) * 1.4, 6.5 + (ck >= 3 ? 0.9 : 0) * (ck < 6 ? 1 : 2), -2.5 + Math.floor(ck / 3) * 1.4 - (ck >= 6 ? 1.4 : 0), ck * 0.3);
[-1, 1].forEach(function (sd) { kitAddF(B, BF, "metal", c(0x4A5A40), kitCylG(1.0, 1.2, 3.2, lite ? 8 : 14), sd * 4.2, 3.6, -8.2, 0, Math.PI / 2); kitAddF(B, BF, "glow", c(0x8AF0C8, 0.7), kitCylG(0.8, 0.8, 0.1, lite ? 8 : 14), sd * 4.2, 3.6, -9.85, 0, Math.PI / 2); });
[[-3.6, -5], [3.6, -5], [-3.6, 5], [3.6, 5]].forEach(function (q) { kitAddF(B, BF, "metal", c(0x5A5A50), kitCylG(0.18, 0.22, 2.6, 6), q[0], 1.3, q[1], 0, 0, q[0] > 0 ? -0.25 : 0.25); kitAddF(B, BF, "metal", c(0x5A5A50), kitCylG(0.6, 0.7, 0.2, 8), q[0] * 1.18, 0.1, q[1]); });
kitAddF(B, BF, "wood", c(0x7A5838), kitBoxG(1.6, 0.12, 6), -6.5, 2.0, 0, 0, 0, 0.3);
sol.push({ x: dx + 14, z: dz, hw: 6.5, hd: 9.5 });
kitPress(B, G);
tmPeople(G);
},
function (G, title, line, x, y, z, ry, w, h, pic) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = Math.round(512 * h / w);
var g = cv.getContext("2d"), W = cv.width, H = cv.height;
var draw = function (img) {
var gr = g.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#5A3A22");
gr.addColorStop(1, "#3A2414");
g.fillStyle = gr;
g.fillRect(0, 0, W, H);
for (var i = 0; i < 14; i++) {
g.strokeStyle = "rgba(0,0,0," + (0.08 + (i % 3) * 0.03) + ")";
g.beginPath();
g.moveTo(0, H * i / 14);
g.lineTo(W, H * i / 14 + ((i * 37) % 9) - 4);
g.stroke();
}
g.strokeStyle = "#D8B060";
g.lineWidth = 7;
g.strokeRect(6, 6, W - 12, H - 12);
var tx = img ? H * 0.95 : W / 2;
g.textAlign = img ? "left" : "center";
g.fillStyle = "#F8E8B8";
g.font = "bold " + Math.round(H * 0.36) + "px Georgia,serif";
g.fillText(title, tx, H * 0.48);
g.fillStyle = "#E8D0A0";
g.font = Math.round(H * 0.2) + "px Georgia,serif";
g.fillText(line, tx, H * 0.8);
if (img) {
g.fillStyle = "rgba(255,240,210,.15)";
g.fillRect(H * 0.12, H * 0.12, H * 0.76, H * 0.76);
try {
g.drawImage(img, H * 0.14, H * 0.14, H * 0.72, H * 0.72);
}
catch (e) { }
}
tex.needsUpdate = true;
};
var tex = new THREE.CanvasTexture(cv);
if (THREE.sRGBEncoding)
tex.encoding = THREE.sRGBEncoding;
draw(null);
if (pic && typeof spgPic === "function") {
var im = new Image();
im.onload = function () { draw(im); };
im.src = spgPic(pic);
}
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }));
m.position.set(x, y, z);
m.rotation.y = ry;
G.add(m);
return m;
},
function (B, F, m, r) {
var lite = tmLite(), wd = kitCol(0x7A5232, 0.9 + r() * 0.2), dk = kitCol(0x4A3020), br = kitCol(0xC8A060), c0 = kitCol(m.col[0]), c1 = kitCol(m.col[1]);
if (m.form === "dome") {
kitAddF(B, F, "wood", dk, kitCylG(0.9, 0.95, 0.3, 10), 0, 0.15, 0);
kitAddF(B, F, "wood", wd, new THREE.CylinderGeometry(2.1, 2.15, 1.0, lite ? 12 : 20, 1, true, Math.PI * 0.25, Math.PI * 1.5), 0, 0.5, 0, Math.PI);
kitAddF(B, F, "wood", dk, new THREE.TorusGeometry(2.12, 0.09, 5, lite ? 12 : 20, Math.PI * 1.5), 0, 1.02, 0, Math.PI * 0.25 + Math.PI, Math.PI / 2);
for (var p = 0; p < 6; p++) {
var a = p / 6 * Math.PI * 2;
kitAddF(B, F, "metal", br, kitCylG(0.07, 0.08, 2.8, 6), Math.cos(a) * 2.05, 1.4, Math.sin(a) * 2.05);
}
var seg = lite ? 8 : 14;
for (var s = 0; s < seg; s++) {
kitAddF(B, F, "plain", s % 2 ? c1 : c0, new THREE.ConeGeometry(2.9, 1.5, 2, 1, true, s / seg * Math.PI * 2, Math.PI * 2 / seg), 0, 3.55, 0);
}
kitAddF(B, F, "plain", c0, new THREE.LatheGeometry([new THREE.Vector2(0.9, 0), new THREE.Vector2(0.6, 0.5), new THREE.Vector2(0.15, 0.9), new THREE.Vector2(0, 1.0)], 8), 0, 4.25, 0);
kitAddF(B, F, "metal", br, kitBallG(0.16, 1), 0, 5.3, 0);
if (!lite)
for (var v = 0; v < seg; v++) {
var va = (v + 0.5) / seg * Math.PI * 2;
kitAddF(B, F, "plain", v % 2 ? c0 : c1, new THREE.ConeGeometry(0.22, 0.4, 3), Math.cos(va) * 2.8, 2.62, Math.sin(va) * 2.8, -va, Math.PI);
}
return 2.5;
}
if (m.form === "cart") {
kitAddF(B, F, "wood", wd, kitBoxG(2.6, 0.22, 1.5), 0, 0.95, 0);
[-1, 1].forEach(function (sd) {
kitAddF(B, F, "wood", dk, kitBoxG(2.6, 0.4, 0.08), 0, 1.25, sd * 0.73);
kitAddF(B, F, "wood", dk, new THREE.TorusGeometry(0.62, 0.07, 6, lite ? 10 : 16), -0.2, 0.62, sd * 0.86);
for (var sp = 0; sp < (lite ? 3 : 6); sp++)
kitAddF(B, F, "wood", dk, kitBoxG(1.2, 0.05, 0.05), -0.2, 0.62, sd * 0.86, 0, 0, sp / (lite ? 3 : 6) * Math.PI);
kitAddF(B, F, "wood", dk, kitBoxG(1.6, 0.08, 0.08), -2.0, 0.62, sd * 0.5, 0, 0, -0.4);
});
kitAddF(B, F, "metal", kitCol(0x3A3A3A), kitCylG(0.05, 0.05, 1.9, 6), -0.2, 0.62, 0, 0, Math.PI / 2);
var hoops = lite ? 3 : 5;
for (var h = 0; h < hoops; h++) {
kitAddF(B, F, "wood", dk, new THREE.TorusGeometry(0.8, 0.035, 4, 10, Math.PI), -1.1 + h * (2.2 / (hoops - 1)), 1.35, 0, Math.PI / 2);
}
for (var cs = 0; cs < (lite ? 4 : 8); cs++) {
var t0 = cs / (lite ? 4 : 8) * Math.PI;
kitAddF(B, F, "plain", cs % 2 ? c1 : c0, new THREE.CylinderGeometry(0.82, 0.82, 2.3, 2, 1, true, t0, Math.PI / (lite ? 4 : 8)), 0, 1.35, 0, 0, 0, Math.PI / 2);
}
return 1.9;
}
var w = 3.4, d = 2.2;
kitAddF(B, F, "wood", dk, kitBoxG(w - 0.3, 0.3, 0.9), 0, 0.15, 0);
kitAddF(B, F, "wood", wd, kitBoxG(w, 1.0, 0.6), 0, 0.5, 0.75);
kitAddF(B, F, "wood", dk, kitBoxG(w + 0.15, 0.07, 0.75), 0, 1.03, 0.75);
kitAddF(B, F, "wood", dk, kitBoxG(w, 2.2, 0.08), 0, 1.1, -1.05);
[0.55, 1.15, 1.75].forEach(function (sy) { kitAddF(B, F, "wood", wd, kitBoxG(w - 0.1, 0.05, 0.4), 0, sy, -0.85); });
[[-w / 2, -1.05], [w / 2, -1.05], [-w / 2, 1.05], [w / 2, 1.05]].forEach(function (q) { kitAddF(B, F, "wood", dk, kitCylG(0.06, 0.07, q[1] < 0 ? 2.9 : 2.4, 6), q[0], q[1] < 0 ? 1.45 : 1.2, q[1]); });
var ns = lite ? 4 : 8;
for (var st = 0; st < ns; st++) {
kitAddF(B, F, "plain", st % 2 ? c1 : c0, kitBoxG((w + 0.4) / ns, 0.04, d + 0.7), -(w + 0.4) / 2 + (w + 0.4) / ns * (st + 0.5), 2.65, 0.25, 0, -0.2);
}
if (!lite)
for (var sc = 0; sc < ns * 2; sc++) {
kitAddF(B, F, "plain", sc % 2 ? c0 : c1, new THREE.ConeGeometry(0.16, 0.32, 3), -(w + 0.4) / 2 + (w + 0.4) / (ns * 2) * (sc + 0.5), 2.25, 1.62, 0, Math.PI);
}
return 2.2;
},
function (B, F, m, r) {
var lite = tmLite(), n = lite ? 4 : 9, k = m.wares, top = m.form === "cart" ? 1.08 : 1.08, z0 = m.form === "awning" ? 0.75 : m.form === "cart" ? 0 : 0.9, at = function (i, cnt) { return (i - (cnt - 1) / 2) * (m.form === "awning" ? 0.36 : m.form === "cart" ? 0.4 : 0.3); };
var col = function (h, f) { return kitCol(h, f || 1); };
var put = function (kind, cl, geo, lx, ly, lz, ry, rx, rz) { kitAddF(B, F, kind, cl, geo, lx, ly, lz, ry, rx, rz); };
var shelf = function (fn) { if (m.form !== "awning" || lite)
return; [0.55, 1.15, 1.75].forEach(function (sy, row) { for (var i = 0; i < 7; i++)
fn((i - 3) * 0.45, sy + 0.03, -0.85, row, i); }); };
var front = function (fn) { for (var i = 0; i < n; i++) {
var x = m.form === "dome" ? Math.sin((i / (n - 1) - 0.5) * 2.2) * 1.85 : at(i, n), z = m.form === "dome" ? Math.cos((i / (n - 1) - 0.5) * 2.2) * 1.85 : z0;
fn(x, top, z, i);
} };
if (k === "cakes") {
front(function (x, y, z, i) { put("metal", col(0xD8C8A8), kitCylG(0.2, 0.08, 0.12, 8), x, y + 0.06, z); put("plain", col([0xC88A4A, 0xA8683A, 0xE0A85A][i % 3]), kitCylG(0.17, 0.18, 0.14, 10), x, y + 0.19, z); put("plain", col([0xF8E0E8, 0xFFF4E0, 0xE8B0C8][i % 3]), kitCylG(0.15, 0.17, 0.05, 10), x, y + 0.28, z); if (i % 2 === 0)
put("plain", col(0xE83A3A), kitBallG(0.035, 0), x, y + 0.33, z); });
put("stone", col(0x8A6A5A), kitBoxG(1.3, 1.6, 1.1), 0, 0.8, -0.6);
put("stone", col(0x7A5A4A), new THREE.SphereGeometry(0.75, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), 0, 1.6, -0.6);
put("glow", col(0xFF8A3A), kitBoxG(0.55, 0.4, 0.05), 0, 0.75, -0.04);
put("stone", col(0x5A4A40), kitCylG(0.14, 0.16, 1.2, 8), 0.3, 2.4, -0.8);
}
else if (k === "crystals") {
front(function (x, y, z, i) {
put("plain", col([0x8A6AD8, 0xA88AE8, 0x6A4AB8][i % 3]), kitBallG(0.12 + (i % 3) * 0.03, 0), x, y + 0.12, z, i, i * 0.7);
if (i % 3 === 1)
put("glow", col(0xC8A8FF, 0.7), new THREE.ConeGeometry(0.05, 0.32, 5), x + 0.08, y + 0.2, z, 0, 0, 0.3);
});
shelf(function (x, y, z, row, i) { for (var q = 0; q < 3; q++)
put(row === 1 && q === 1 ? "glow" : "plain", col(row === 1 && q === 1 ? 0xB89AF0 : [0x7A5AC8, 0x9A7AE0, 0xC8B8F0][q], row === 1 && q === 1 ? 0.6 : 1), new THREE.ConeGeometry(0.05, 0.25 + q * 0.08, 5), x + (q - 1) * 0.08, y + 0.12 + q * 0.03, z, 0, (q - 1) * 0.3, (q - 1) * 0.25); });
}
else if (k === "lanterns") {
front(function (x, y, z, i) { put("plain", col([0xE8B040, 0xC88A20, 0xF0D070][i % 3], 0.9), kitCylG(0.07, 0.09, 0.28, 8), x, y + 0.14, z); put("metal", col(0x8A6A30), kitCylG(0.03, 0.04, 0.06, 6), x, y + 0.31, z); });
var nl = lite ? 4 : 10;
for (var l = 0; l < nl; l++) {
var la = (l / nl) * Math.PI * 2;
var lx = Math.cos(la) * 1.3, lz = Math.sin(la) * 1.3;
put("metal", col(0x3A3430), kitCylG(0.01, 0.01, 0.6, 3), lx, 2.4, lz);
put("glow", col([0xFFD08A, 0xFF9A6A, 0xA8F0C8, 0xF8E0A0][l % 4], 0.75), kitCylG(0.11, 0.13, 0.26, 8), lx, 1.95, lz);
put("metal", col(0xC8A060), kitConeG(0.17, 0.12, 8), lx, 2.16, lz);
}
}
else if (k === "maps") {
front(function (x, y, z, i) { if (i % 3 === 0)
put("plain", col(0xE8D8B0), kitBoxG(0.42, 0.01, 0.32), x, y + 0.01, z, i * 0.2);
else
put("plain", col([0xE8D8B0, 0xD8C498, 0xF0E4C8][i % 3]), kitCylG(0.035, 0.035, 0.42, 6), x, y + 0.05, z, 0.4, 0, Math.PI / 2); });
put("plain", col(0x2A5AA8), kitBallG(0.28, 2), -1.2, 1.45, 0.75);
put("metal", col(0xC8A060), new THREE.TorusGeometry(0.31, 0.015, 4, 16), -1.2, 1.45, 0.75, 0, 0, 0.4);
put("metal", col(0x6A4A2A), kitCylG(0.03, 0.08, 0.32, 6), -1.2, 1.15, 0.75);
shelf(function (x, y, z, row, i) { put("plain", col([0xE8D8B0, 0xD8C498][i % 2]), kitCylG(0.04, 0.04, 0.38, 6), x, y + 0.05, z, 0.2 * i, 0, Math.PI / 2); });
}
else if (k === "glass") {
front(function (x, y, z, i) { var h = 0.25 + (i % 3) * 0.12; put("glow", col([0xC8B8FF, 0xA8E0FF, 0xE8D0FF][i % 3], 0.55), new THREE.LatheGeometry([new THREE.Vector2(0.06, 0), new THREE.Vector2(0.1, h * 0.3), new THREE.Vector2(0.05, h * 0.7), new THREE.Vector2(0.08, h)], 8), x, y, z); });
if (!lite)
for (var g2 = 0; g2 < 5; g2++)
put("metal", col(0xD8D8E8), new THREE.TorusGeometry(0.12, 0.02, 4, 12), -0.8 + g2 * 0.4, 2.0, 0, 0);
}
else if (k === "pearls") {
front(function (x, y, z, i) {
if (i % 2 === 0) {
put("plain", col(0x6A8A9A), new THREE.SphereGeometry(0.18, 10, 5, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), x, y + 0.18, z);
for (var q = 0; q < (lite ? 2 : 5); q++)
put("plain", col([0xF8F4F0, 0xF0E8F0, 0xE8F0F8][q % 3]), kitBallG(0.04, 1), x + (q - 2) * 0.05, y + 0.17, z + ((q * 7) % 3 - 1) * 0.04);
}
else
put("plain", col([0x5A8A4A, 0x4A7A3A][i % 2]), kitCylG(0.09, 0.09, 0.45, 8), x, y + 0.09, z, 0.3, 0, Math.PI / 2);
});
shelf(function (x, y, z, row, i) { put("plain", col([0xF0D8C8, 0xE8C8B0, 0xF8E8E0][i % 3]), new THREE.ConeGeometry(0.08, 0.18, 6), x, y + 0.06, z, i, 0, 1.4); });
}
else if (k === "iron") {
front(function (x, y, z, i) { if (i % 2)
put("metal", col(0x5A5A60), kitBoxG(0.3, 0.08, 0.12), x, y + 0.04, z, 0.3 * i);
else {
put("wood", col(0x5A3A20), kitCylG(0.025, 0.025, 0.7, 6), x, y + 0.05, z, 0.5, 0, Math.PI / 2);
put("metal", col(0x8A8A90), kitBoxG(0.18, 0.03, 0.22), x + 0.3, y + 0.05, z, 0.5);
} });
if (m.form === "awning")
[-1, 0, 1].forEach(function (s) { put("metal", col([0x8A2A1A, 0x3A3A3A, 0x8A2A1A][s + 1]), kitCylG(0.4, 0.4, 0.05, 14), s * 1.05, 1.6, -0.98, 0, Math.PI / 2); put("metal", col(0xC8A060), kitBallG(0.07, 0), s * 1.05, 1.6, -0.94); });
}
else if (k === "parts") {
front(function (x, y, z, i) { if (i % 3 === 0)
put("metal", col(0xA8B0B8), new THREE.TorusGeometry(0.11, 0.035, 4, 10), x, y + 0.04, z, 0, Math.PI / 2);
else if (i % 3 === 1) {
put("metal", col(0x2A4A48), kitBoxG(0.2, 0.12, 0.2), x, y + 0.06, z);
put("glow", col(0x5AD8C8, 0.7), kitBoxG(0.16, 0.02, 0.16), x, y + 0.13, z);
}
else
put("metal", col(0x8A9098), kitBoxG(0.32, 0.03, 0.24), x, y + 0.02, z, 0.2 * i); });
}
else if (k === "scrap") {
for (var sc2 = 0; sc2 < (lite ? 5 : 12); sc2++) {
put(sc2 % 3 ? "metal" : "plain", col([0x6A6A6A, 0x8A4A2A, 0x4A4A50, 0x9A8A70][sc2 % 4]), kitBoxG(0.25 + r() * 0.5, 0.08 + r() * 0.3, 0.2 + r() * 0.4), (r() - 0.5) * 1.8, 1.1 + r() * 0.35, (r() - 0.5) * 0.8, r() * 3, r() * 0.6, r() * 0.6);
}
put("metal", col(0x5A5A5A), kitCylG(0.08, 0.08, 1.4, 8), 0.5, 1.2, 0.2, 0.4, 0, 1.3);
}
else if (k === "spice") {
front(function (x, y, z, i) { put("plain", col(0x9A7A50), kitCylG(0.15, 0.18, 0.3, 8), x, y + 0.15, z); put("plain", col([0xC83A1A, 0xE8A020, 0xF0D040, 0x8A5A2A, 0xF0F0F0][i % 5]), kitConeG(0.13, 0.12, 8), x, y + 0.36, z); });
shelf(function (x, y, z, row, i) { put("plain", col([0xC85A8A, 0x5A8AC8, 0xE8C060, 0x6AB86A, 0xC8B8FF][(row + i) % 5]), kitCylG(0.12, 0.12, 0.38, 8), x, y + 0.12, z, 0, 0, Math.PI / 2); });
}
else if (k === "junk" || k === "sundries") {
front(function (x, y, z, i) {
var q = i % 4;
if (q === 0)
put("metal", col(0xC8A060), kitCylG(0.08, 0.12, 0.25, 8), x, y + 0.12, z);
else if (q === 1)
put("wood", col(0x8A6A40), kitBoxG(0.24, 0.18, 0.2), x, y + 0.09, z, i);
else if (q === 2)
put("plain", col([0x8A6AD8, 0xC88A4A, 0x6AC8A8][i % 3]), kitBallG(0.1, 0), x, y + 0.1, z);
else
put("metal", col(0x8A8A90), new THREE.TorusGeometry(0.1, 0.03, 4, 10), x, y + 0.03, z, 0, Math.PI / 2);
});
}
if (!lite) {
var side = m.form === "awning" ? 2.1 : 2.4;
kitAddF(B, F, "wood", col(0x8A6440), kitBoxG(0.6, 0.5, 0.6), side, 0.25, -0.3, 0.3);
kitAddF(B, F, "plain", col(0x9A8058), kitCylG(0.22, 0.28, 0.55, 8), side + 0.2, 0.27, 0.4);
}
},
function (B, F, R, i) {
var lite = tmLite(), cols = [[0x8A2A2A, 0xE8C880], [0x2A3A6A, 0xE8D8A8], [0xA86A2A, 0xF0E0C0], [0x3A6A3A, 0xE8C8A0], [0x5A2A4A, 0xF0C8D8]], cp = cols[i % cols.length];
kitAddF(B, F, "plain", kitCol(cp[0]), kitBoxG(2.6, 0.03, 1.8), 0, 0.04, 0);
kitAddF(B, F, "plain", kitCol(cp[1]), kitBoxG(2.3, 0.035, 0.12), 0, 0.045, -0.6);
kitAddF(B, F, "plain", kitCol(cp[1]), kitBoxG(2.3, 0.035, 0.12), 0, 0.045, 0.6);
var n = lite ? 3 : 7;
for (var k = 0; k < n; k++) {
var x = (k - (n - 1) / 2) * 0.34, z = (k % 2) * 0.4 - 0.2, q = (i + k) % 4;
if (q === 0)
kitAddF(B, F, "plain", kitCol([0xC86A3A, 0xB8A060, 0x6A8AC8][k % 3]), new THREE.LatheGeometry([new THREE.Vector2(0.06, 0), new THREE.Vector2(0.14, 0.12), new THREE.Vector2(0.1, 0.3), new THREE.Vector2(0.05, 0.36)], 8), x, 0.05, z);
else if (q === 1)
kitAddF(B, F, "plain", kitCol([0xE8A020, 0xC83A1A, 0x8A5A2A][k % 3]), kitConeG(0.14, 0.14, 8), x, 0.12, z);
else if (q === 2)
kitAddF(B, F, "wood", kitCol(0x9A7A48), new THREE.CylinderGeometry(0.18, 0.14, 0.16, 10, 1, true), x, 0.13, z);
else
kitAddF(B, F, "plain", kitCol([0x8A6AD8, 0xF8F0F0, 0x6AC8A8][k % 3]), kitBallG(0.09, 1), x, 0.13, z);
}
if (!lite) {
kitAddF(B, F, "wood", kitCol(0x5A4028), kitCylG(0.03, 0.03, 2.3, 5), 1.1, 1.15, -0.7);
for (var s = 0; s < 8; s++)
kitAddF(B, F, "plain", kitCol(s % 2 ? cp[1] : cp[0]), new THREE.ConeGeometry(1.1, 0.4, 2, 1, true, s / 8 * Math.PI * 2, Math.PI / 4), 1.1, 2.3, -0.7);
}
},
function (B, F, R) {
var lite = tmLite();
kitAddF(B, F, "stone", kitCol(0xA88A6A), new THREE.LatheGeometry([new THREE.Vector2(0.5, 0), new THREE.Vector2(0.75, 0.1), new THREE.Vector2(0.85, 0.7), new THREE.Vector2(0.9, 0.8), new THREE.Vector2(0, 0.8)], lite ? 8 : 14), 0, 0, 0);
var n = lite ? 3 : 6;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R(), h = 0.9 + R() * 0.9, x = Math.cos(a) * 0.3, z = Math.sin(a) * 0.3;
kitAddF(B, F, "plain", kitCol(0x5A8A3A, 0.8 + R() * 0.3), kitCylG(0.03, 0.05, h, 5), x, 0.8 + h / 2, z, 0, x * 0.4, z * 0.4);
kitAddF(B, F, i % 2 ? "glow" : "plain", kitCol([0xE8F070, 0xF0A8E8, 0x9AF0C8][i % 3], i % 2 ? 0.55 : 1), kitBallG(0.13, 1), x * 1.4, 0.8 + h, z * 1.4);
}
},
function (B, F, R, lite) {
var n = lite ? 2 : 5;
for (var i = 0; i < n; i++) {
var q = i % 3, x = (R() - 0.5) * 1.6, z = (R() - 0.5) * 1.2;
if (q === 0)
kitAddF(B, F, "wood", kitCol([0x9A6A3A, 0x7A5030, 0xA87A48][i % 3]), kitBoxG(0.7, 0.6, 0.7), x, 0.3 + (i >= 3 ? 0.6 : 0), z, R());
else if (q === 1) {
kitAddF(B, F, "wood", kitCol(0x7A5232), new THREE.LatheGeometry([new THREE.Vector2(0.28, 0), new THREE.Vector2(0.34, 0.4), new THREE.Vector2(0.28, 0.8), new THREE.Vector2(0, 0.8)], lite ? 8 : 12), x, 0, z);
kitAddF(B, F, "metal", kitCol(0x3A3A3A), new THREE.TorusGeometry(0.33, 0.02, 4, 12), x, 0.25, z, 0, Math.PI / 2);
}
else
kitAddF(B, F, "plain", kitCol(0xB8A070, 0.9 + R() * 0.2), kitBallG(0.3, 1), x, 0.24, z, R(), 0, 0);
}
},
function (G) {
var lite = tmLite();
TM.shops.forEach(function (s, i) {
var fl = frFolkLook("tullimar", i), g = frFolk("tm_m" + i, { title: s.m.t, sex: i % 2 ? "f" : "m", look: fl.look, feats: fl.feats, scale: fl.scale, arms: fl.arms });
var back = s.m.form === "awning" ? 0.0 : s.m.form === "cart" ? -1.4 : 0;
var x = s.x - Math.sin(s.ry) * (s.m.form === "cart" ? -2.0 : -back), z = s.z - Math.cos(s.ry) * (s.m.form === "cart" ? -2.0 : -back);
if (s.m.form === "cart") {
x = s.x + Math.sin(s.ry) * 1.7 + Math.cos(s.ry) * 1.2;
z = s.z + Math.cos(s.ry) * 1.7 - Math.sin(s.ry) * 1.2;
}
g.scale.setScalar(0.85);
g.position.set(x, tmY(x, z) + (s.m.form === "cart" ? 0 : 0.3), z);
g.rotation.y = s.ry;
G.add(g);
s.g = g;
});
var add = function (seed, nm, title, x, z, ry, talk) {
var fl = frFolkLook("tullimar", seed.length);
var g = frFolk(seed, { title: title, sex: "f", look: fl.look, feats: fl.feats, scale: fl.scale, arms: fl.arms });
g.position.set(x, tmY(x, z), z);
g.rotation.y = ry;
G.add(g);
SF.sites.push({ x: x, z: z, r: 2.6, name: nm + ", " + title, talk: talk });
return g;
};
var T = FR_TOWN.tullimar;
add("tm_zuzu", "Zuzu-Tullik", "bell-ringer", TM_C[0] + 4.6, TM_C[1] - 1, -1.4, { name: "Zuzu-Tullik", persona: T.persona + " Your name is Zuzu-Tullik and you ring the Bargain Bell: once for opening, twice for a good bargain, three times for cake. " + TM_HONEST });
add("tm_ollo", "Ollo-Tullik", "barge pilot", TM_C[0] + 64, TM_C[1] + 5, Math.PI / 2, { name: "Ollo-Tullik", persona: T.persona + " Your name is Ollo-Tullik and you fly the barge Spice Wind to Veyar; the raiders keep attacking it and you would love a pilot to fly with you (Matron Quillo-Tullik gives that task). " + TM_HONEST });
var who = ["tullimar", "tullimar", "tullimar", "maruondo", "skeldmar", "tullimar", "robot", "tullimar", "maruondo", "tullimar", "skeldmar", "tullimar"], n = lite ? 2 : who.length;
for (var i2 = 0; i2 < n; i2++) {
var k = who[i2], a = i2 / n * Math.PI * 2 + 0.4, d = i2 % 4 === 3 ? 31 : 9 + (i2 % 3) * 4, x2 = TM_C[0] + Math.cos(a) * d, z2 = TM_C[1] + Math.sin(a) * d, g2;
if (k === "robot")
g2 = frRobot("tm_r" + i2, 0x6A707C);
else {
var fl2 = frFolkLook(k, i2 + 3);
g2 = frFolk("tm_s" + i2, { title: "shopper", sex: i2 % 2 ? "m" : "f", look: fl2.look, feats: fl2.feats, scale: fl2.scale, arms: fl2.arms });
}
g2.position.set(x2, tmY(x2, z2), z2);
g2.rotation.y = a;
G.add(g2);
TM.folk.push({ g: g2, r: 7 });
}
for (var j = 0; j < (lite ? 0 : 3); j++) {
var fl3 = frFolkLook("tullimar", j + 7), g3 = frFolk("tm_d" + j, { title: "dock hand", sex: j % 2 ? "f" : "m", look: fl3.look, feats: fl3.feats, scale: fl3.scale, arms: fl3.arms });
var x3 = TM_C[0] + 62 - j * 2, z3 = TM_C[1] - 8 + j * 6;
g3.position.set(x3, tmY(x3, z3), z3);
G.add(g3);
TM.folk.push({ g: g3, r: 4 });
}
},
function (m) {
var T = FR_TOWN.tullimar, goods = tmWant(m).map(function (k) { return SPG_GOODS[k].n; }).concat((m.ow || []).map(function (k) { return (typeof OW_GOOD !== "undefined" && OW_GOOD[k]) ? OW_GOOD[k].n : k; }));
wTalk({ name: m.n, persona: T.persona + " Your name is " + m.n + " and you are the " + m.t + " at your own stall in the market. " + (goods.length ? "You really sell: " + goods.join(", ") + ". " : "") + TM_HONEST, greet: m.hi });
},
function (m) {
if (typeof SPG_GOODS === "undefined" || !m.f)
return [];
var reach = ["veyar", "maruondo", "tullimar", "orr", "skeldmar"];
return Object.keys(SPG_GOODS).filter(function (k) { var G = SPG_GOODS[k]; if (reach.indexOf(G.home) < 0)
return false; if (m.f.home)
return m.f.home.indexOf(G.home) >= 0; return m.f.cat.indexOf(G.cat) >= 0; });
},
function (m, msg) {
if (m.pip && typeof owTullikCard === "function") {
worldCard(null);
return owTullikCard(msg);
}
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>⚖ " + sbEsc(m.n) + "</div><div style='opacity:.8;font-size:13px'>" + sbEsc(m.t.charAt(0).toUpperCase() + m.t.slice(1)) + ", Tullimar market</div>" +
"<div style='margin:6px 0;font-style:italic;opacity:.9'>\"" + sbEsc(m.hi) + "\"</div>";
if (msg)
h += "<div style='margin:6px 0;color:#FFE7B0'>" + msg + "</div>";
var pic = function (k) { return "<img src='" + spgPic(k) + "' alt='' style='width:36px;height:36px;border-radius:7px;flex:none' onerror=\"this.style.visibility='hidden'\">"; };
var bb = function (id, t) { return "<span data-w='" + id + "' role='button' style='padding:4px 8px;border-radius:7px;border:1px solid rgba(255,210,130,.6);background:rgba(255,200,110,.12);font-size:12px;white-space:nowrap;cursor:pointer'>" + t + "</span>"; };
var row = function (k, name, price, have, btns, tag, ic) {
return "<div style='display:flex;align-items:center;gap:8px;margin:5px 0;padding:4px 6px;border-radius:8px;background:rgba(143,180,232,.07)'>" + (ic || pic(k)) +
"<div style='flex:1;min-width:0'><b style='font-size:13px'>" + sbEsc(name) + "</b>" + (tag ? " <span style='font-size:11px;color:#FFCB6A'>" + tag + "</span>" : "") + "<div style='font-size:11.5px;opacity:.7'>you carry " + (have || 0) + "</div></div><b style='color:#FFD98A;font-size:13px;white-space:nowrap'>" + price + " g</b>" + btns + "</div>";
};
var tail = function () {
if (m.chart && typeof skcOpen === "function") {
h += worldBtn("tm-chart", "🧭 Look at the star chart", "Fennick shows you where everything is");
fns["tm-chart"] = function () { worldCard(null); skcOpen("system", skcHere()); };
}
h += worldBtn("tm-talk", "💬 Talk with " + sbEsc(m.n.split("-")[0]), "Gossip, prices, the raiders");
fns["tm-talk"] = function () { worldCard(null); tmTalk(m); };
if (typeof sgAskWay === "function") {
h += worldBtn("tm-way", "🧭 Ask the way", "To the crater shrine and the racers' camp, out past the market");
fns["tm-way"] = function () { sgAskWay("tullimar", m.n); };
}
worldCard(h, fns);
};
if (m.ow && typeof OW_GOOD !== "undefined") {
h += "<div style='margin-top:8px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.7'>For sale</div>";
m.ow.forEach(function (k) {
var g = OW_GOOD[k];
if (!g)
return;
var have = 0;
try {
(myStock || []).forEach(function (s) { if (s.kind === k)
have = +s.amount || 0; });
}
catch (e) { }
h += row(k, g.n, g.pr, have, bb("ow-" + k, "Buy 1"), "", '<span style="font-size:28px;width:36px;text-align:center;flex:none">' + g.e + '</span>');
fns["ow-" + k] = function () { owBuy(k, 1, function (say) { tmShop(m, say); }); };
});
h += "<div style='font-size:11.5px;opacity:.7;margin-top:4px'>" + sbEsc(m.ow.map(function (k) { return OW_GOOD[k] ? OW_GOOD[k].note : ""; }).join(" ")) + "</div>";
if (!m.f)
return tail();
}
if (typeof SPG_GOODS === "undefined") {
return tail();
}
var want = tmWant(m);
worldCard(h + "<div style='opacity:.7;margin-top:8px'>Opening the ledger...</div>", {});
var show = function (r, off) {
var have = {};
((r && r.buys) || []).forEach(function (b) { have[b.kind] = b; });
h += "<div style='margin-top:8px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.7'>On the stall · buy</div>";
var sells = r ? (r.sells || []).filter(function (s) { return tmMatch(m, s.kind) && (!m.buys || want.indexOf(s.kind) >= 0); }) : want.map(function (k) { return { kind: k, price: tmPrice(k), have: 0 }; });
if (!sells.length)
h += "<div style='opacity:.7;margin:4px 0'>Nothing on the stall today: " + sbEsc(m.n.split("-")[0]) + " is buying.</div>";
sells.forEach(function (s, i) {
var G = SPG_GOODS[s.kind] || { n: s.kind };
h += row(s.kind, G.n, s.price, s.have, off ? "" : bb("b1" + i, "Buy 1") + bb("b5" + i, "Buy 5"), G.home !== "tullimar" && SPG_GOODS[s.kind] ? "from " + spgName(G.home) : "");
fns["b1" + i] = function () { tmTrade("sp_buy", m, s.kind, 1); };
fns["b5" + i] = function () { tmTrade("sp_buy", m, s.kind, 5); };
});
if (r) {
var buys = (r.buys || []).filter(function (b) { return tmMatch(m, b.kind); }), left = Math.max(0, (r.cap || 0) - (r.sold_today || 0));
h += "<div style='margin-top:10px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.7'>What you carry · sell</div><div style='font-size:11.5px;opacity:.7'>The traders here will pay you up to " + left + " more gold today.</div>";
if (!buys.length)
h += "<div style='opacity:.7;margin:4px 0'>You carry nothing " + sbEsc(m.n.split("-")[0]) + " deals in. " + (m.buys ? "Search raider wrecks for scrap and ship pieces." : "Buy at one world and bring it to another.") + "</div>";
buys.forEach(function (b, i) {
var G = SPG_GOODS[b.kind] || { n: b.kind };
h += row(b.kind, G.n, b.price, b.have, bb("s1" + i, "Sell 1") + (b.have > 1 ? bb("sa" + i, "Sell all") : ""), b.wanted ? "wanted" : "");
fns["s1" + i] = function () { tmTrade("sp_sell", m, b.kind, 1); };
fns["sa" + i] = function () { tmTrade("sp_sell", m, b.kind, b.have); };
});
}
else
h += "<div style='opacity:.75;margin:6px 0'>" + (off === "sign" ? "<b>Sign in</b> to trade: what you buy is kept in your backpack." : "The market's ledger is not open on the server yet; trading here opens with the next update.") + "</div>";
tail();
};
if (!(typeof signedIn === "function" && signedIn()))
return show(null, "sign");
cityRpc("sp_market", { p_where: "tullimar" }).then(function (r) { if (!r || !r.ok)
return show(null, "off"); show(r); }).catch(function () { show(null, "off"); });
},
function (fn, m, kind, n) {
if (TM.busy)
return;
TM.busy = true;
cityRpc(fn, { p_where: "tullimar", p_kind: kind, p_n: n }).then(function (r) {
TM.busy = false;
var G = SPG_GOODS[kind] || { n: kind };
if (!r || !r.ok) {
tmShop(m, sbEsc((r && r.say) || "Not just now."));
return;
}
try {
sbTone(fn === "sp_buy" ? 520 : 780, 0.12);
}
catch (e) { }
try {
if (typeof frStandAdd === "function")
frStandAdd("tullik", "trade");
}
catch (e) { }
try {
if (typeof loadStock === "function")
loadStock();
if (typeof refreshStanding === "function")
refreshStanding();
}
catch (e) { }
tmShop(m, (fn === "sp_buy" ? "Bought " : "Sold ") + r.n + " × " + sbEsc(G.n) + (fn === "sp_buy" ? " for " : ", paid ") + r.gold + " gold. It is " + (fn === "sp_buy" ? "in your backpack." : "theirs now."));
}).catch(function (e) { TM.busy = false; tmShop(m, sbEsc((e && e.message) || "The ledger would not open.")); });
},
function () {
var L = [];
if (adnReach() && typeof FR_BODIES !== "undefined")
FR_BODIES.forEach(function (b) { if (!b.star)
L.push({ k: b.k, name: b.name, r: b.r || 50, sys: "reach" }); });
else if (typeof SP_BODIES !== "undefined")
SP_BODIES.forEach(function (b) { if (b.k !== "sun")
L.push({ k: b.k, name: b.name, r: b.r || 20, sys: "home" }); });
return L;
},
function () {
var L = [], seen = {};
if (!adnSurf())
return L;
function add(n, x, z) { if (!n || seen[n])
return; seen[n] = 1; L.push({ label: n, x: x, z: z }); }
(SF.sites || []).forEach(function (s) { var n = s.name || (s.talk && s.talk.name) || (s.frLead && "the leader"); add(n, s.x, s.z); });
if (SF.k === "tullimar" && typeof TM !== "undefined")
(TM.shops || []).forEach(function (s) { add(s.m.n + "'s stall (" + s.m.t + ")", s.fx, s.fz); });
if (SF.k === "orr" && typeof ORW_HEARTS !== "undefined")
Object.keys(ORW_HEARTS).forEach(function (k) { var H = ORW_HEARTS[k]; add(adnCap(H.n), H.at[0], H.at[1]); });
return L;
},
function (ctx) {
if (adnSurf() && SF.k === "tullimar" && ADN.stall && ADN.stall.n === ctx.name && typeof tmShop === "function")
return { k: "stall" };
if (adnSpace() && ADN.byName[ctx.name] === "tullik" && typeof owTullikCard === "function")
return { k: "tullik" };
if (typeof SPG_PLACES !== "undefined" && typeof mkCard === "function") {
if (adnSurf() && SPG_PLACES[SF.k])
return { k: "post", w: SF.k };
if (adnSpace() && typeof mkNearPlace === "function") {
var w = mkNearPlace();
if (w)
return { k: "post", w: w };
}
}
return null;
},
function () {
var M = ADN.mark;
if (!M)
return null;
if (M.sys === "reach") {
if (!(typeof frIn === "function" && frIn()) || typeof FR_BY === "undefined" || !FR_BY[M.k])
return null;
return { k: M.k, name: FR_BY[M.k].name, r: FR_BY[M.k].r || 50, sys: "reach" };
}
if (typeof frIn === "function" && frIn())
return null;
var b = (typeof SP_BY !== "undefined") && SP_BY[M.k];
return b ? { k: M.k, name: b.name, r: b.r || 20, sys: "home" } : null;
},
function (ctx) {
var T = adnTradeWhat(ctx);
if (!T)
return { ok: false, say: "(There is nothing to trade from here.)" };
var p = adnPeople(ctx);
if (p)
try {
frStandAdd(p, "trade");
}
catch (e) { }
stfSoon(function () { if (T.k === "stall")
tmShop(ADN.stall);
else if (T.k === "tullik")
owTullikCard();
else
mkCard(T.w); });
return { ok: true };
},
function (ctx, arg) {
var P = stfBest(arg, adnPlaces(), function (p) { return p.label; });
if (!P)
return { ok: false, say: "There's no place called " + arg + " here." };
var W = WORLDS.surface;
guideTo = { key: P.label, x: (W.base || 0) + P.x, z: P.z, chase: false };
return { ok: true, say: "<b>" + sbEsc(P.label) + "</b>: follow the pointer at the top of the screen." };
},
function (ctx, arg) {
var B = adnFindBody(arg);
if (!B)
return { ok: false, say: "There's no world called " + arg + " in this star system." };
ADN.mark = { k: B.k, sys: B.sys, by: ctx.name, at: Date.now() };
adnMarkSave();
return { ok: true, say: "✦ <b>" + sbEsc(B.name) + "</b> is marked on your star chart" + (adnSpace() ? ": its distance is on the banner." : ". You will see it when you are back in your ship.") };
},
function (ctx) {
var p = adnPeople(ctx), P = FR_PEOPLES[p];
var site = adnSurf() && (SF.sites || []).filter(function (s) { return s.frLead && s.frLead.p === p; })[0];
if (site && typeof frLeaderCard === "function") {
stfSoon(function () { frLeaderCard(site); });
return { ok: true };
}
var B = (typeof FR_BY !== "undefined" && FR_BY[P.world] && adnReach()) ? { k: P.world, sys: "reach" } : null;
if (B) {
ADN.mark = { k: B.k, sys: "reach", by: ctx.name, at: Date.now() };
adnMarkSave();
}
return { ok: true, say: "📜 <b>" + sbEsc(P.task.name) + "</b>: " + sbEsc(P.task.say) + (B ? " Their world is marked on your chart." : "") };
},
function (col, o) {
o = o || {};
var k = col + "|" + JSON.stringify(o);
if (ALN.mats[k])
return ALN.mats[k];
var m = o.glow ? new THREE.MeshBasicMaterial({ color: col, transparent: !!o.op, opacity: o.op || 1, depthWrite: !o.op, fog: false })
: new THREE.MeshStandardMaterial({ color: col, roughness: o.rough != null ? o.rough : 0.55, metalness: o.metal || 0, emissive: o.e || 0x000000, emissiveIntensity: o.ei || 1, transparent: !!o.op, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
ALN.mats[k] = m;
return m;
},
function (P, mat, pts, r0, r1, seg) {
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
var g = new THREE.TubeGeometry(c, seg || 12, 1, 8, false), pos = g.attributes.position, n = (seg || 12) + 1, ring = 9, cen = c.getSpacedPoints(seg || 12);
for (var i = 0; i < n; i++) {
var t = i / (n - 1), r = r0 + (r1 - r0) * t, C = cen[i];
for (var j = 0; j < ring; j++) {
var q = i * ring + j;
if (q >= pos.count)
break;
var x = pos.getX(q) - C.x, y = pos.getY(q) - C.y, z = pos.getZ(q) - C.z;
pos.setXYZ(q, C.x + x * r, C.y + y * r, C.z + z * r);
}
}
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
P.add(m);
return m;
},
function (P, x, y, z, r, iris, ry, sq) {
var e = alnEll(P, alnMat(0x0A0A12, { rough: 0.08, metal: 0.2 }), r, r * (sq || 1), r * 0.7, x, y, z, 16);
e.rotation.y = ry || 0;
if (iris != null) {
var i = alnEll(P, alnMat(iris, { glow: 1 }), r * 0.42, r * 0.42 * (sq || 1), r * 0.2, x + Math.sin(ry || 0) * r * 0.55, y, z + Math.cos(ry || 0) * r * 0.55, 10);
}
alnEll(P, alnMat(0xFFFFFF, { glow: 1 }), r * 0.14, r * 0.14, r * 0.08, x + r * 0.25 + Math.sin(ry || 0) * r * 0.6, y + r * 0.25, z + Math.cos(ry || 0) * r * 0.62, 6);
return e;
},
function (kind, skin) {
var H = new THREE.Group(), S = alnMat(skin, { rough: kind === "hrovan" ? 0.85 : kind === "tullik" ? 0.5 : 0.38, e: kind === "veyari" ? 0x10143A : 0 });
if (kind === "veyari") {
var sk = alnEll(H, S, 0.095, 0.15, 0.12, 0, 0.05, -0.035, 24);
sk.rotation.x = -0.55;
alnEll(H, S, 0.075, 0.085, 0.08, 0, -0.02, 0.035, 20);
alnEll(H, S, 0.035, 0.05, 0.035, 0, -0.09, 0.0, 10);
[-1, 1].forEach(function (s) { alnEye(H, s * 0.042, 0.008, 0.082, 0.036, 0xFFD860, s * 0.4, 0.55); });
alnEll(H, alnMat(skin - 0x101010, { rough: 0.4 }), 0.008, 0.02, 0.01, 0, -0.035, 0.11, 6);
for (var c = 0; c < 5; c++) {
var a = -0.2 - c * 0.32;
alnEll(H, alnMat(0xC8F0FF, { glow: 1 }), 0.011, 0.011, 0.011, 0, 0.06 + Math.cos(a + 1.6) * 0.15 * 0.9, -0.035 + Math.sin(a + 1.6) * -0.13, 6);
}
[-1, 1].forEach(function (s) { var ln = alnEll(H, alnMat(0xC8F0FF, { glow: 1, op: 0.75 }), 0.005, 0.05, 0.005, s * 0.08, 0.03, 0.04, 6); ln.rotation.z = s * 0.25; });
}
else if (kind === "tullik") {
alnEll(H, S, 0.15, 0.135, 0.14, 0, 0.04, 0, 24);
alnEll(H, alnMat(skin + 0x101808, { rough: 0.5 }), 0.11, 0.06, 0.09, 0, -0.03, 0.06, 16);
var mo = alnEll(H, alnMat(0x2A1418, { rough: 0.6 }), 0.07, 0.012, 0.02, 0, -0.045, 0.135, 12);
[-1, 1].forEach(function (s) { alnEye(H, s * 0.065, 0.06, 0.115, 0.038, 0xA8FF8A, s * 0.3); });
[-1, 1].forEach(function (s) {
alnTube(H, S, [[s * 0.05, 0.16, 0], [s * 0.08, 0.25, 0.02], [s * 0.13, 0.31, 0.06]], 0.012, 0.006, 10);
alnEll(H, alnMat(0xFFE08A, { glow: 1 }), 0.022, 0.022, 0.022, s * 0.13, 0.31, 0.06, 10);
var ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 10, 1, true), alnMat(skin - 0x081008, { rough: 0.6, ds: true }));
ear.position.set(s * 0.15, 0.06, -0.01);
ear.rotation.set(0, 0, s * -1.25);
ear.scale.set(1, 1, 0.35);
H.add(ear);
});
for (var sp = 0; sp < 7; sp++) {
var aa = sp * 0.9;
alnEll(H, alnMat(skin - 0x182010, { rough: 0.6 }), 0.016, 0.016, 0.006, Math.cos(aa) * 0.1, 0.1 + Math.sin(sp) * 0.03, -0.06 + Math.sin(aa) * 0.04, 8);
}
}
else if (kind === "ondai") {
alnEll(H, S, 0.1, 0.13, 0.115, 0, 0.03, 0, 24);
alnEll(H, S, 0.075, 0.07, 0.08, 0, -0.05, 0.03, 18);
var fin = new THREE.Shape();
fin.moveTo(0.02, 0);
fin.quadraticCurveTo(0.02, 0.07, -0.06, 0.1);
fin.quadraticCurveTo(-0.18, 0.1, -0.26, -0.02);
fin.lineTo(0.02, 0);
var fm = new THREE.Mesh(new THREE.ShapeGeometry(fin, 10), alnMat(0x3AC8B0, { op: 0.78, ds: true, rough: 0.3, e: 0x0A3A34 }));
fm.rotation.y = Math.PI / 2;
fm.position.set(0, 0.1, 0.07);
H.add(fm);
[-1, 1].forEach(function (s) {
alnEye(H, s * 0.045, 0.01, 0.09, 0.03, 0x60E8FF, s * 0.4, 0.8);
for (var g = 0; g < 3; g++) {
var gl = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.016), alnMat(0x2A8AC8, { op: 0.85, ds: true, rough: 0.3 }));
gl.position.set(s * 0.09, -0.04 - g * 0.022, 0.0);
gl.rotation.set(0, s * 1.3, s * 0.3);
H.add(gl);
}
});
for (var f = 0; f < 9; f++) {
alnEll(H, alnMat(0xB8FFF8, { glow: 1 }), 0.0055, 0.0055, 0.0055, (f % 3 - 1) * 0.025 + (f > 4 ? 0.05 : -0.05), -0.005 - Math.floor(f / 3) * 0.012, 0.098, 5);
}
}
else if (kind === "hrovan") {
alnEll(H, S, 0.11, 0.12, 0.12, 0, 0.03, 0, 22);
alnEll(H, S, 0.1, 0.075, 0.09, 0, -0.06, 0.03, 18);
[-1, 1].forEach(function (s) {
alnEye(H, s * 0.04, 0.02, 0.105, 0.016, 0xFF8A3A, 0);
var bw = alnEll(H, alnMat(skin - 0x101010, { rough: 0.9 }), 0.045, 0.022, 0.035, s * 0.04, 0.048, 0.1, 12);
bw.rotation.z = s * -0.25;
alnTube(H, alnMat(0xD8CCB0, { rough: 0.5 }), [[s * 0.08, 0.1, -0.01], [s * 0.16, 0.15, -0.06], [s * 0.2, 0.22, -0.15], [s * 0.18, 0.28, -0.22]], 0.03, 0.005, 14);
alnCone(H, alnMat(0xEDE4CC, { rough: 0.4 }), 0.012, 0.05, s * 0.035, -0.06, 0.11, 0, 0, s * -0.2, 8);
});
for (var r = 0; r < 6; r++) {
var ra = r * 1.1;
alnEll(H, alnMat(skin - 0x141414, { rough: 0.95 }), 0.02, 0.012, 0.02, Math.cos(ra) * 0.09, 0.08 + Math.sin(r) * 0.03, Math.sin(ra) * 0.08 - 0.02, 6);
}
}
return H;
},
function (g, kind, skin) {
if (!g || !kind || g.userData.aln)
return g;
var keepS = g.scale.clone(), keepP = g.position.clone(), keepR = g.rotation.clone();
g.scale.set(1, 1, 1);
g.position.set(0, 0, 0);
g.rotation.set(0, 0, 0);
g.updateMatrixWorld(true);
var all = new THREE.Box3().setFromObject(g), top = all.max.y, Hh = top - all.min.y;
if (!(Hh > 0.5)) {
g.scale.copy(keepS);
g.position.copy(keepP);
g.rotation.copy(keepR);
return g;
}
var neck = top - Hh * 0.135, bb = new THREE.Box3(), hb = new THREE.Box3(), any = false;
g.traverse(function (o) {
if (!o.isMesh || !o.visible)
return;
bb.setFromObject(o);
var c = (bb.min.y + bb.max.y) / 2, h = bb.max.y - bb.min.y;
if (c > neck && h < Hh * 0.3 && Math.abs((bb.min.x + bb.max.x) / 2) < 0.2) {
hb.union(bb);
any = true;
o.visible = false;
}
});
if (any) {
var cy = Math.min(hb.min.y + 0.12, top - 0.11), cz = (hb.min.z + hb.max.z) / 2;
var head = alnHead(kind, skin);
head.position.set(0, cy, cz * 0.6);
head.userData.alnHead = 1;
g.add(head);
g.userData.alnY = cy;
if (kind === "veyari") {
var nk = alnCyl(g, alnMat(skin, { rough: 0.4 }), 0.035, 0.045, 0.12, 0, cy - 0.13, cz * 0.6, 0, 0, 0, 10);
}
}
g.userData.aln = kind;
g.userData.alnSkin = skin;
g.scale.copy(keepS);
g.position.copy(keepP);
g.rotation.copy(keepR);
return g;
},
function (file, cb) {
var F = HDF.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = HDF.files[file] = { scene: null, clips: [], bad: false, wait: [cb] };
var fail = function (e) { if (window.console)
console.warn("[aliens]", file, e && e.message || e); F.bad = true; F.wait = []; };
modelsLoader(function (Ld) {
Ld.load(ALN_DIR + file.slice(4) + ".glb", function (gl) {
gl.scene.traverse(function (m) {
if (!m.isMesh)
return;
m.castShadow = true;
m.receiveShadow = true;
m.frustumCulled = false;
(Array.isArray(m.material) ? m.material : [m.material]).forEach(function (x) { if (x && x.map)
x.map.anisotropy = 4; });
});
gl.scene.userData.araBody = 1;
F.scene = gl.scene;
F.clips = gl.animations || [];
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[aliens]", e);
} });
}, undefined, fail);
});
},
function (name) {
if (ALN_HAILER[name])
return ALN_HAILER[name];
if (/Tullik/.test(name))
return "tullik";
if (/Veyari|Vey\b/.test(name))
return "veyari";
if (typeof SF !== "undefined" && typeof WLD !== "undefined" && WLD && WLD.on === "surface" && ALN_OF[SF.k])
return ALN_OF[SF.k];
if (/Orrem|Archive|Unit Seven/.test(name))
return "robot";
return null;
},
function (kind, obj, aim, dist, lift) {
var S = 320, W = 160, url = null;
var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(24, 1, 0.02, 50), rt = new THREE.WebGLRenderTarget(S, S);
sc.background = new THREE.Color(ALN_BG[kind] || 0x141C28);
sc.add(new THREE.HemisphereLight(0xD8E0FF, 0x302820, 0.85));
var key = new THREE.DirectionalLight(0xFFF0E0, 1.5);
key.position.set(1.2, 1.4, 2);
sc.add(key);
var rim = new THREE.DirectionalLight(kind === "tullik" ? 0x9AE8FF : kind === "hrovan" ? 0xFFB08A : 0xB8A8FF, 1.0);
rim.position.set(-1.6, 0.9, -1.4);
sc.add(rim);
var was = obj.parent;
sc.add(obj);
obj.updateMatrixWorld(true);
cam.position.set(aim.x + dist * 0.28, aim.y + lift, aim.z + dist);
cam.lookAt(aim);
var old = renderer.getRenderTarget();
renderer.setRenderTarget(rt);
renderer.clear();
renderer.render(sc, cam);
var px = new Uint8Array(S * S * 4);
renderer.readRenderTargetPixels(rt, 0, 0, S, S, px);
renderer.setRenderTarget(old);
sc.remove(obj);
if (was)
was.add(obj);
var big = document.createElement("canvas");
big.width = big.height = S;
var bx = big.getContext("2d"), id = bx.createImageData(S, S);
for (var y = 0; y < S; y++)
id.data.set(px.subarray((S - 1 - y) * S * 4, (S - y) * S * 4), y * S * 4);
bx.putImageData(id, 0, 0);
var cv = document.createElement("canvas");
cv.width = cv.height = W;
var cx = cv.getContext("2d");
cx.imageSmoothingEnabled = true;
cx.imageSmoothingQuality = "high";
cx.drawImage(big, 0, 0, W, W);
url = cv.toDataURL("image/jpeg", 0.9);
rt.dispose();
return url;
},
function (kind, cb) {
if (ALN.portraits[kind])
return cb(ALN.portraits[kind]);
if (typeof renderer === "undefined" || !renderer)
return cb(null);
try {
if (kind === "robot") {
var g = frRobot("aln_port", 0x6A707C), u = alnSnap(kind, g, new THREE.Vector3(0, 2.04, 0), 1.3, 0.05);
if (u)
ALN.portraits[kind] = u;
return cb(u);
}
if (!ALN_SKIN[kind])
return cb(null);
alnLoad(alnFile(kind, "f"), function (F) {
var u = null;
try {
var m = F.scene, hb = null, ft = null;
m.traverse(function (b) { if (!b.isBone)
return; if (!hb && /^head$/i.test(b.name))
hb = b; if (!ft && /^leftfoot$/i.test(b.name))
ft = b; });
if (!hb || !ft)
return cb(null);
m.updateMatrixWorld(true);
var h = hb.getWorldPosition(new THREE.Vector3()), H = (h.y - ft.getWorldPosition(new THREE.Vector3()).y) * 1.12;
h.y += H * (kind === "tullik" ? 0.1 : 0.045);
u = alnSnap(kind, m, h, H * (kind === "tullik" ? 1.25 : kind === "veyari" ? 0.55 : 0.42), H * 0.01);
}
catch (e) {
if (window.console)
console.warn("alien portrait", e);
}
if (u)
ALN.portraits[kind] = u;
cb(u);
});
}
catch (e) {
cb(null);
}
},
function (c) {
var box = document.getElementById("aln-face"), name = document.getElementById("t-name");
var kind = c && c.wKey && alnWho(c.name);
if (box)
box.style.display = "none";
if (!kind)
return;
alnPortrait(kind, function (url) {
if (!url || typeof talkWith === "undefined" || talkWith !== c)
return;
box = document.getElementById("aln-face");
if (!box && name) {
box = document.createElement("img");
box.id = "aln-face";
box.alt = "";
box.style.cssText = "width:84px;height:84px;border-radius:12px;float:left;margin:0 10px 6px 0;border:1px solid rgba(200,190,255,.45);box-shadow:0 0 14px rgba(140,160,255,.25);object-fit:cover";
name.parentNode.insertBefore(box, name);
}
if (box) {
box.src = url;
box.style.display = "";
}
});
},
function (dx, dz) {
var b = (Math.atan2(dx, -dz) * 180 / Math.PI + 360) % 360;
return ["north", "north-north-east", "north-east", "east-north-east", "east", "east-south-east", "south-east", "south-south-east",
"south", "south-south-west", "south-west", "west-south-west", "west", "west-north-west", "north-west", "north-north-west"][Math.round(b / 22.5) % 16];
},
function () {
if (SGW.towns)
return;
SGW.towns = 1;
try {
if (typeof FR_TOWN === "undefined" || typeof GX_OUT === "undefined")
return;
Object.keys(GX_OUT).forEach(function (k) {
var T = FR_TOWN[k], O = GX_OUT[k];
if (!T || !O)
return;
var C = T.center;
var s = " If anyone asks the way, you know your country well and tell them plainly: " + O.places.map(function (P) { return P.n + " lies " + sgFrom(P, C[0], C[1]) + " of the middle of town" + (O.water ? "" : ", along the line of lamps that leads out to it"); }).join("; ") + ". You can also really show them the way (the pointer at the top of their screen).";
if (T.persona && T.persona.indexOf("If anyone asks the way") < 0)
T.persona += s;
if (T.leader && T.leader.persona && T.leader.persona.indexOf("If anyone asks the way") < 0)
T.leader.persona += s;
});
}
catch (e) { }
},
function (k, who) {
var O = GX_OUT[k];
if (!O)
return;
var L = worldLocal(), fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🧭 The way out of town</div>" +
"<div style='opacity:.85;font-size:13px;margin:4px 0 8px'>" + sbEsc(who ? who.split("-")[0] + " points with all four arms at once, then sorts out which arm meant what." : "Out in the country of " + ((gxBody(k) || {}).name || k) + ":") + "</div>";
O.places.forEach(function (P, i) {
h += worldBtn("sgw" + i, "🧭 " + sbEsc(P.n), sbEsc(sgFrom(P, L.x, L.z)) + " from here" + (O.water ? "" : ", along the green lamps") + ". " + sbEsc(P.a));
fns["sgw" + i] = function () { worldCard(null); sgPoint(P); sbSay("<b>" + sbEsc(P.n) + "</b>: " + sbEsc(sgFrom(P, worldLocal().x, worldLocal().z)) + ". Follow the pointer at the top of the screen and the lamps."); };
});
worldCard(h, fns);
},
function () {
if (typeof WLD === "undefined" || WLD.on !== "surface" || !SF.k || !GX_OUT[SF.k])
return null;
var PL = { visit: 1, gather: 1, foes: 1, hold: 1, duel: 1, scene: 1, search: 1, make: 1, race: 1, follow: 1, escort: 1 };
try {
var A = gsGet().act, st = A && GS_CH[A.id] && GS_CH[A.id].steps[A.i];
if (st && (st[0] === "follow" || st[0] === "escort") && st[1] === SF.k && typeof GD !== "undefined" && GD.npc && GD.npc.id === A.id)
return null;
if (st && PL[st[0]] && st[1] === SF.k) {
var P = gsPlace(SF.k, st[2]);
if (P)
return { P: P, key: "gs:" + A.id + ":" + A.i, line: gsLine(st) };
}
if (st && st[0] === "talk" && FR_PEOPLES[st[1]] && FR_PEOPLES[st[1]].world === SF.k) {
var site = (SF.sites || []).filter(function (s) { return s.frLead && s.frLead.p === st[1]; })[0];
if (site)
return { P: { n: site.name.split(",")[0], at: [site.x, site.z], a: "" }, town: 1, key: "gs:" + A.id + ":" + A.i, line: st[2] };
}
}
catch (e) { }
try {
var G0 = gsGet(), Sw = typeof wdGet === "function" ? wdGet() : null, n0 = Math.floor(hlGet().step || 0);
if (!G0.act && !G0.gate && Sw) {
if (n0 === 3 && !Sw.blade && WD.shard && WD.shard.k === SF.k && WD_SHARDS[SF.k])
return { P: { n: "The " + WD_SHARDS[SF.k].name + " heart-shard", at: [WD.shard.x, WD.shard.z], a: "" }, key: "tp:shard:" + SF.k, line: "Take the heart-shard (press E beside it), then bring it to Warden Corvin on Aster Still" };
var want = n0 === 5 && !Sw.gifts.sense ? "sense" : null;
if (want && WD_GIFTS[want].world === SF.k) {
var Gf = WD_GIFTS[want];
return { P: { n: "The trial of " + Gf.name, at: Gf.at, a: "" }, key: "tp:gift:" + want, line: "Learn " + Gf.name + " in its trial (press E in the ring of light)" };
}
}
}
catch (e) { }
try {
var S = gqGet(), ids = Object.keys(S.act || {});
for (var j = 0; j < ids.length; j++) {
var B = S.act[ids[j]], Q = gqQ(ids[j]), s2 = B && Q && Q.steps[B.i];
if (s2 && (s2[0] === "visit" || s2[0] === "gather" || s2[0] === "foes") && s2[1] === SF.k) {
var P2 = GX_OUT[SF.k].places[s2[2]];
if (P2)
return { P: P2, key: "gq:" + ids[j] + ":" + B.i, line: (typeof gqStepLine === "function" ? gqStepLine(s2) : s2[s2.length - 1]) };
}
}
}
catch (e) { }
return null;
},
function (P) {
var G = WORLDS.surface && WORLDS.surface.g;
if (!G)
return;
var key = SF.k + ":" + P.n;
if (SGW.beam && SGW.bk === key && SGW.beam.parent === G)
return;
sgBeamOff();
var lite = typeof sbLite === "function" && sbLite(), y = GX_OUT[SF.k].water ? 0.6 : sfHeight(P.at[0], P.at[1]), g = new THREE.Group();
var mk = function (r0, r1, op) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, 90, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFD98A, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false })); m.position.y = 45; m.renderOrder = 3; g.add(m); return m; };
mk(0.3, 0.55, 0.2);
if (!lite)
mk(1.2, 2.2, 0.06);
g.position.set(P.at[0], y, P.at[1]);
G.add(g);
SGW.beam = g;
SGW.bk = key;
},
function (col, o) {
o = o || {};
var k = col + "|" + (o.e || 0) + "|" + (o.b ? 1 : 0);
if (GSI.mat[k])
return GSI.mat[k];
var m = o.b ? new THREE.MeshBasicMaterial({ color: col }) : (sbLite() ? new THREE.MeshLambertMaterial({ color: col, emissive: o.e || 0 }) : new THREE.MeshStandardMaterial({ color: col, roughness: o.r === undefined ? 0.7 : o.r, metalness: o.m || 0, emissive: o.e || 0 }));
return GSI.mat[k] = m;
},
function (name) {
var s = String(name || "").toLowerCase();
if (/ledger|book|log-book|journal/.test(s))
return "book";
if (/key/.test(s))
return "key";
if (/shard|glass|crystal|cell/.test(s))
return "crystal";
if (/stone/.test(s))
return "stone";
if (/flask|water/.test(s))
return "flask";
if (/lump|iron|ore/.test(s))
return "lump";
if (/seed|fruit|flower/.test(s))
return "seed";
if (/shell/.test(s))
return "shell";
if (/moss/.test(s))
return "moss";
return "orb";
},
function (t) {
if (GSI.tex[t])
return GSI.tex[t];
var c = document.createElement("canvas");
c.width = 512;
c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "rgba(12,16,26,0.78)";
var r = 26;
x.beginPath();
x.moveTo(r, 8);
x.lineTo(512 - r, 8);
x.quadraticCurveTo(504, 8, 504, 8 + r);
x.lineTo(504, 120 - r);
x.quadraticCurveTo(504, 120, 512 - r, 120);
x.lineTo(r, 120);
x.quadraticCurveTo(8, 120, 8, 120 - r);
x.lineTo(8, 8 + r);
x.quadraticCurveTo(8, 8, r, 8);
x.fill();
x.strokeStyle = "rgba(255,216,144,0.85)";
x.lineWidth = 4;
x.stroke();
x.textAlign = "center";
x.fillStyle = "#FFE7B0";
x.font = "600 44px Georgia,serif";
x.fillText(t, 256, 62, 480);
x.fillStyle = "rgba(230,236,250,0.85)";
x.font = "28px system-ui,sans-serif";
x.fillText("walk up to it to take it", 256, 102, 480);
var tx = new THREE.CanvasTexture(c);
try {
if (THREE.SRGBColorSpace)
tx.colorSpace = THREE.SRGBColorSpace;
}
catch (e) { }
return GSI.tex[t] = tx;
},
function (g, name, col) {
col = col || 0xFFE8A0;
var k = gsiKind(name), m;
if (k === "book") {
var b = mmG(g, 0, 0, 0, -0.35, 0.5, 0.12), lea = gsiMat(0x5A1E16, { r: 0.8 }), pg = gsiMat(0xEDE2C4, { r: 0.95 }), br = gsiMat(0xC8A048, { r: 0.35, m: 0.8 });
mmMesh(new THREE.BoxGeometry(0.36, 0.035, 0.48), lea, 0, -0.045, 0, b);
mmMesh(new THREE.BoxGeometry(0.36, 0.035, 0.48), lea, 0, 0.045, 0, b);
mmMesh(new THREE.BoxGeometry(0.035, 0.125, 0.48), lea, -0.18, 0, 0, b);
mmMesh(new THREE.BoxGeometry(0.33, 0.06, 0.45), pg, 0.01, 0, 0, b);
mmMesh(new THREE.BoxGeometry(0.06, 0.13, 0.06), br, 0.18, 0, 0, b);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { mmMesh(new THREE.BoxGeometry(0.05, 0.13, 0.05), br, q[0] * 0.165, 0, q[1] * 0.225, b); });
var sl = mmMesh(new THREE.BoxGeometry(0.04, 0.004, 0.3), gsiMat(0xD03020, { e: 0x401008 }), 0, 0.064, 0, b);
sl.rotation.y = 0.6;
}
else if (k === "key") {
var kk = mmG(g, 0, 0, 0, 0, 0, 0.3), km = gsiMat(0xC8A048, { r: 0.3, m: 0.85 });
mmMesh(new THREE.TorusGeometry(0.09, 0.025, 8, 18), km, 0, 0.2, 0, kk);
mmMesh(new THREE.CylinderGeometry(0.022, 0.022, 0.42, 8), km, 0, -0.07, 0, kk);
mmMesh(new THREE.BoxGeometry(0.1, 0.04, 0.03), km, 0.05, -0.22, 0, kk);
mmMesh(new THREE.BoxGeometry(0.07, 0.04, 0.03), km, 0.035, -0.15, 0, kk);
}
else if (k === "crystal") {
var cm = gsiMat(col, { e: col, r: 0.15, m: 0.1 });
[[0, 0, 0, 0.3, 0], [0.1, -0.06, 0.05, 0.2, 0.5], [-0.09, -0.07, -0.04, 0.18, -0.45]].forEach(function (q) { var c = mmMesh(new THREE.OctahedronGeometry(1, 0), cm, q[0], q[1], q[2], g); c.scale.set(q[3] * 0.32, q[3], q[3] * 0.32); c.rotation.z = q[4]; });
}
else if (k === "stone") {
var s = mmMesh(new THREE.DodecahedronGeometry(0.2, 0), gsiMat(0x8A8C94, { r: 0.95 }), 0, 0, 0, g);
s.scale.set(1.2, 0.45, 0.9);
var rn = mmMesh(new THREE.TorusGeometry(0.08, 0.012, 6, 16), gsiMat(col, { b: 1 }), 0, 0.095, 0, g);
rn.rotation.x = Math.PI / 2;
}
else if (k === "flask") {
var gl = gsiMat(col, { e: col, r: 0.1 });
mmMesh(new THREE.SphereGeometry(0.13, 14, 10), gl, 0, -0.05, 0, g);
mmMesh(new THREE.CylinderGeometry(0.04, 0.05, 0.16, 10), gl, 0, 0.13, 0, g);
mmMesh(new THREE.CylinderGeometry(0.045, 0.045, 0.05, 10), gsiMat(0x8A5A30), 0, 0.23, 0, g);
}
else if (k === "lump") {
var l = mmMesh(new THREE.DodecahedronGeometry(0.17, 0), gsiMat(col, { r: 0.4, m: 0.85 }), 0, 0, 0, g);
l.scale.set(1.2, 0.8, 1);
l.rotation.set(0.4, 0.7, 0.2);
}
else if (k === "seed") {
var sm = gsiMat(col, { e: col, r: 0.5 });
mmEll(g, sm, 0.11, 0.14, 0.11, 0, 0, 0, 10);
mmEll(g, gsiMat(0x4A8A3A), 0.05, 0.02, 0.09, 0, 0.14, 0.03, 8);
}
else if (k === "shell") {
var sh = mmMesh(new THREE.ConeGeometry(0.14, 0.3, 10, 1, true), gsiMat(col, { e: col, r: 0.35 }), 0, 0, 0, g);
sh.rotation.z = 1.2;
}
else if (k === "moss") {
mmEll(g, gsiMat(col, { e: col, r: 0.9 }), 0.22, 0.08, 0.18, 0, 0, 0, 10);
}
else
mmEll(g, mmMat(col, { glow: 1 }), 0.18, 0.28, 0.18, 0, 0, 0, 8);
if (!sbLite())
mmGlow(g, col, 1.6, 0.42, 0, 0, 0);
try {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: gsiLabelTex(gsiOne(name)), transparent: true, depthWrite: false, fog: false }));
sp.scale.set(1.5, 0.375, 1);
sp.position.set(0, 0.85, 0);
sp.renderOrder = 4;
g.add(sp);
}
catch (e) { }
g.userData.gsiKind = k;
return g;
},
function () {
if (document.getElementById("nav-css"))
return;
var st = document.createElement("style");
st.id = "nav-css";
st.textContent = "#nav-radar{position:fixed;z-index:44;display:none;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
"#nav-radar canvas{display:block;border-radius:50%;box-shadow:0 2px 12px rgba(0,0,0,.5)}" +
"#nav-line{position:fixed;z-index:44;display:none;max-width:230px;font:12px var(--sans,system-ui);color:#FFE7B0;background:rgba(8,12,24,.82);border:1px solid rgba(255,217,138,.45);border-radius:9px;padding:4px 8px;text-shadow:0 1px 2px #000;pointer-events:none;line-height:1.3}" +
".nav-tag{position:fixed;z-index:42;pointer-events:none;font:11px var(--sans,system-ui);color:#DCE8F6;text-shadow:0 1px 2px #000,0 0 4px #000;white-space:nowrap;transform:translate(-50%,-140%);display:none}" +
".nav-tag i{font-style:normal;opacity:.7;font-size:10px}" +
".nav-tag.goal{color:#FFD98A;font-weight:600}.nav-tag.low{transform:translate(-50%,60%)}" +
"#nav-mark{position:fixed;z-index:42;pointer-events:none;width:18px;height:18px;margin:-9px 0 0 -9px;border:2px solid #FFD98A;transform:rotate(45deg);display:none;box-shadow:0 0 8px rgba(255,217,138,.6)}" +
"#nav-arrow{position:fixed;z-index:43;pointer-events:none;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:18px solid #FFD98A;display:none;filter:drop-shadow(0 0 4px rgba(255,200,90,.6))}" +
"body.nav-on #compass{visibility:hidden}";
document.head.appendChild(st);
},
function () {
if (NAV.el)
return;
navCss();
var d = document.createElement("div");
d.id = "nav-radar";
d.title = "Radar · tap for the star chart (M)";
var c = document.createElement("canvas");
d.appendChild(c);
document.body.appendChild(d);
d.addEventListener("click", function (e) { e.stopPropagation(); try {
if (typeof skcOpen === "function")
skcOpen();
else if (typeof spChart === "function")
spChart();
}
catch (er) { } });
var l = document.createElement("div");
l.id = "nav-line";
document.body.appendChild(l);
var m = document.createElement("div");
m.id = "nav-mark";
document.body.appendChild(m);
var a = document.createElement("div");
a.id = "nav-arrow";
document.body.appendChild(a);
NAV.el = d;
NAV.cv = c;
NAV.ctx = c.getContext("2d");
NAV.line = l;
NAV.mark = m;
NAV.arrow = a;
if (typeof VO_KEEP_ALL !== "undefined") {
VO_KEEP_ALL["nav-radar"] = 1;
VO_KEEP_ALL["nav-line"] = 1;
VO_KEEP_ALL["nav-mark"] = 1;
VO_KEEP_ALL["nav-arrow"] = 1;
}
},
function () {
var out = [];
try {
if (typeof frIn === "function" && frIn()) {
FR_BODIES.forEach(function (b) { if (b.hidden)
return; out.push({ k: b.k, name: b.name, p: frWorld(b.k), col: b.star ? 0xFFE0A0 : (b.col || 0xBFD0E8), kind: b.star ? "star" : "world", r: b.r || 40 }); });
FR_DISC.forEach(function (d) { if (!d.at || !(frSeen(d.k) || frLogged(d.k)))
return; out.push({ k: d.k, name: d.name, p: frDiscPos(d), col: 0x9AC8FF, kind: "place", r: d.r || 40 }); });
if (FR.sys === "reach") {
var g = frGatePos();
out.push({ k: "_gate", name: "The Far Gate (home)", p: g, col: 0xC8A0FF, kind: "gate", r: 120 });
}
}
else {
SP_BODIES.forEach(function (b) { if (b.hidden || b.k === "charon" || !SP.bodies[b.k])
return; out.push({ k: b.k, name: b.name, p: SP.bodies[b.k].position.clone(), col: b.k === "sun" ? 0xFFE0A0 : (b.col || 0xBFD0E8), kind: b.k === "sun" ? "star" : "world", r: b.r || 20 }); });
Object.keys(SP.stations || {}).forEach(function (k) { var s = SP.stations[k]; if (!s || !s.userData || !s.userData.name)
return; out.push({ k: "st_" + k, name: s.userData.name, p: s.position.clone(), col: 0xA8E0C8, kind: "station", r: 60 }); });
if (SP.gate && typeof spKnowsGate === "function" && spKnowsGate())
out.push({ k: "_gate", name: "The Far Gate", p: SP.gate.position.clone(), col: 0xC8A0FF, kind: "gate", r: 200 });
}
}
catch (e) {
if (!NAV.w1) {
NAV.w1 = 1;
console.warn("nav things", e);
}
}
return out;
},
function () {
try {
if (SP.auto) {
var A = SP.auto;
return { name: A.name || "your course", p: (typeof spTargetPos === "function" ? spTargetPos(A) : null), auto: 1 };
}
}
catch (e) { }
var here = (typeof frIn === "function" && frIn()) ? FR.sys : "sol";
function toWorld(w, line) {
var S = navSysOf(w);
if (!S)
return null;
if (S.sys === here && here !== "sol") {
return { name: S.b.name, p: frWorld(S.b.k), line: line };
}
return navToStar(S.sys, S.b.name, line);
}
function toSite(sys, k, line) {
if (sys === here && here !== "sol") {
var b = typeof gqSite === "function" ? gqSite(k) : null;
if (b)
return { name: b.name, p: b.p, line: line };
return null;
}
return navToStar(sys, null, line);
}
try {
var G = typeof gsGet === "function" ? gsGet() : null, A = G && G.act, st = A && GS_CH[A.id] && GS_CH[A.id].steps[A.i];
if (st) {
var k = st[0], line = gsLine(st);
if (k === "fly")
return toSite(st[1], st[2], line);
if (k === "win" || k === "waves") {
if (st[1] === here)
return { name: navStarName(here), here: 1, line: line + " (they come to you here)" };
return navToStar(st[1], null, line);
}
if (k === "land" || k === "visit" || k === "gather" || k === "foes" || k === "hold" || k === "duel")
return toWorld(st[1], line);
if (/^(scene|search|follow|escort|make|race)$/.test(k))
return toWorld(st[1], line);
if (k === "call")
return { name: "Your comms", here: 1, line: line + " (they are calling you now)" };
if (k === "talk" && FR_PEOPLES[st[1]])
return toWorld(FR_PEOPLES[st[1]].world, line);
if (k === "gift" && WD_GIFTS[st[1]])
return toWorld(WD_GIFTS[st[1]].world, line);
}
if (typeof hlGet === "function" && !(G && (G.gate || A)) && !(typeof wdHollow === "function" && wdHollow())) {
var n = Math.floor(hlGet().step || 0), Sw = typeof wdGet === "function" ? wdGet() : { gifts: {}, shards: {} }, tl = typeof HL_STEPS !== "undefined" ? HL_STEPS[n] : "";
if (n === 1)
return toWorld("sereth", tl);
if (n === 2)
return toWorld("aster", tl);
if (n === 3) {
if (!Sw.blade && !Object.keys(Sw.shards || {}).length) {
var near = ["veyar", "sereth", "dunmarrow", "ysolde", "isk", "aurelion"].map(function (w) { var S = navSysOf(w); return S ? { w: w, here: S.sys === here } : null; }).filter(Boolean);
var pick = near.filter(function (q) { return q.here; })[0] || near[0];
if (pick)
return toWorld(pick.w, "A heart-shard lies on " + ((navSysOf(pick.w) || {}).b || { name: pick.w }).name + ": land and look for the thin light rising from the ground");
}
return toWorld("aster", tl);
}
if (n === 4)
return toWorld("aurelion", tl);
if (n === 5)
return toWorld(Sw.gifts && Sw.gifts.sense ? "aurelion" : "sereth", tl);
if (n === 6)
return toWorld("aurelion", tl);
if (n === 7 || n === 8)
return toWorld("nharos", tl);
}
if (typeof hlGet === "function" && !(hlGet().step > 0) && !(G && (G.gate || A))) {
if (here === "reach") {
var d = FR_DISC.filter(function (x) { return x.k === "wreck"; })[0];
if (d)
return { name: d.name, p: frDiscPos(d), line: "The Hollow begins here: scan the raider wreck (E)" };
}
if (here === "sol" && SP.gate && spKnowsGate())
return { name: "The Far Gate", p: SP.gate.position.clone(), line: "Through the Far Gate past Pluto, the Hollow begins at a raider wreck" };
}
}
catch (e) {
if (!NAV.w2) {
NAV.w2 = 1;
console.warn("nav goal", e);
}
}
return null;
},
function (sys, world, line) {
var here = (typeof frIn === "function" && frIn()) ? FR.sys : "sol";
if (sys === "reach" && here === "sol") {
if (SP.gate && spKnowsGate())
return { name: "The Far Gate", p: SP.gate.position.clone(), line: line, via: "through the Far Gate to the Far Reach" + (world ? ", then on to " + world : "") };
return { name: "the Far Reach", far: "past Pluto: hail the Veyari watch-station by Neptune to learn the way", line: line };
}
return { name: navStarName(sys), far: "Star Drive (J) to " + navStarName(sys) + (world ? ", then " + world : ""), line: line };
},
function (on) {
if (!NAV.el)
return;
var v = on ? "block" : "none";
if (NAV.el.style.display !== v)
NAV.el.style.display = v;
document.body.classList.toggle("nav-on", !!on);
if (!on) {
NAV.line.style.display = "none";
NAV.mark.style.display = "none";
NAV.arrow.style.display = "none";
Object.keys(NAV.tags).forEach(function (k) { NAV.tags[k].style.display = "none"; });
}
},
function (things, goal, fwd, right, dpr) {
var x = NAV.ctx, S = NAV.S * dpr, c = S / 2, R = c - 3 * dpr;
x.setTransform(1, 0, 0, 1, 0, 0);
x.clearRect(0, 0, S, S);
var g = x.createRadialGradient(c, c, R * 0.1, c, c, R);
g.addColorStop(0, "rgba(16,30,52,.92)");
g.addColorStop(1, "rgba(6,12,24,.92)");
x.fillStyle = g;
x.beginPath();
x.arc(c, c, R, 0, 7);
x.fill();
x.strokeStyle = "rgba(143,180,232,.6)";
x.lineWidth = 1.5 * dpr;
x.stroke();
x.strokeStyle = "rgba(143,180,232,.18)";
x.lineWidth = 1 * dpr;
[0.33, 0.66].forEach(function (f) { x.beginPath(); x.arc(c, c, R * f, 0, 7); x.stroke(); });
x.beginPath();
x.moveTo(c, c - R);
x.lineTo(c, c + R);
x.moveTo(c - R, c);
x.lineTo(c + R, c);
x.stroke();
var far = 500;
things.forEach(function (T) { far = Math.max(far, Math.min(80000, T.p.distanceTo(SP.pos))); });
var lf = Math.log(1 + far / 60);
function at(p) { var rel = p.clone().sub(SP.pos), f = rel.dot(fwd), r = rel.dot(right), d = Math.hypot(f, r) || 1, k = Math.min(1, Math.log(1 + d / 60) / lf) * (R - 6 * dpr); return [c + r / d * k, c - f / d * k]; }
things.forEach(function (T) {
var q = at(T.p), s = (T.kind === "star" ? 3.4 : T.kind === "world" ? 2.6 : 2) * dpr;
x.fillStyle = navHex(T.col);
x.globalAlpha = 0.95;
x.beginPath();
if (T.kind === "station" || T.kind === "place" || T.kind === "gate")
x.rect(q[0] - s, q[1] - s, s * 2, s * 2);
else
x.arc(q[0], q[1], s, 0, 7);
x.fill();
});
x.globalAlpha = 1;
if (goal && goal.p) {
var q = at(goal.p), s = 4.5 * dpr;
x.strokeStyle = "#FFD98A";
x.lineWidth = 2 * dpr;
x.beginPath();
x.moveTo(q[0], q[1] - s);
x.lineTo(q[0] + s, q[1]);
x.lineTo(q[0], q[1] + s);
x.lineTo(q[0] - s, q[1]);
x.closePath();
x.stroke();
x.strokeStyle = "rgba(255,217,138,.35)";
x.setLineDash([3 * dpr, 3 * dpr]);
x.beginPath();
x.moveTo(c, c);
x.lineTo(q[0], q[1]);
x.stroke();
x.setLineDash([]);
}
x.fillStyle = "#F4F0E4";
x.beginPath();
x.moveTo(c, c - 6 * dpr);
x.lineTo(c + 4 * dpr, c + 4 * dpr);
x.lineTo(c, c + 2 * dpr);
x.lineTo(c - 4 * dpr, c + 4 * dpr);
x.closePath();
x.fill();
},
function (w, key, who, x, z, o) {
o = o || {};
var G = gdG();
if (!G)
return null;
var look = frFolkLook(w, (key.length * 7) % 11), g = GS_ROBOT[who] ? frRobot("gd_" + key, GS_ROBOT[who]) : frFolk("gd_" + key, Object.assign({ title: "", sex: o.sex || (key.length % 2 ? "f" : "m") }, look, o.look ? { look: Object.assign({}, look.look || {}, o.look) } : {}));
g.position.set(x, gdY(w, x, z), z);
G.add(g);
var ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.75, 24), new THREE.MeshBasicMaterial({ color: 0xFFD98A, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide, fog: false }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.05;
g.add(ring);
return { g: g, x: x, z: z, who: who, key: key };
},
function (key, done) {
var D = GS_SCENES[key];
if (!D) {
if (done)
done();
return;
}
var show = function (id) {
var N = D.nodes[id];
if (!N) {
worldCard(null);
if (done)
done();
return;
}
var t = N.t;
if (N.ift)
Object.keys(N.ift).forEach(function (f) { if (gdHas(f))
t = N.ift[f]; });
var opts = (N.o || []).filter(function (o) { return !o[3] || gdHas(o[3]); }), fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + sbEsc(D.who) + "</div>" +
(D.where ? "<div style='opacity:.7;font-size:12px;margin-bottom:4px'>" + sbEsc(D.where) + "</div>" : "") +
"<div style='font-size:14px;line-height:1.45;margin:6px 0 8px'>" + t + "</div>";
if (!opts.length) {
h += worldBtn("gdgo", "Go on", "");
fns.gdgo = function () { worldCard(null); if (N.set)
gdFlags()[N.set] = 1; gsSave(); if (done)
done(); };
}
opts.forEach(function (o, i) { h += worldBtn("gdo" + i, "“" + sbEsc(o[0]) + "”", ""); fns["gdo" + i] = function () { if (o[2])
gdFlags()[o[2]] = 1; gsSave(); sbTone(523, 0.05); show(o[1]); }; });
worldCard(h, fns);
};
show(D.start || "a");
},
function (A, st, P) {
var G = gdG(), R = wRand(A.id.length * 53 + A.i * 11), L = GS_CLUES[st[3]] || [], list = [];
var got = A.got || {};
L.forEach(function (c, i) {
var a = R() * 6.28, d = 9 + R() * 24, x = P.at[0] + Math.cos(a) * d, z = P.at[1] + Math.sin(a) * d, y = gdY(st[1], x, z), g = mmG(G, x, y, z);
var m = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), new THREE.MeshBasicMaterial({ color: 0xBFE0FF, transparent: true, opacity: 0.85, depthWrite: false, fog: false }));
m.position.y = 0.35;
g.add(m);
var pool = new THREE.Mesh(new THREE.CircleGeometry(0.7, 18), new THREE.MeshBasicMaterial({ color: 0x9AC8FF, transparent: true, opacity: 0.18, depthWrite: false, fog: false }));
pool.rotation.x = -Math.PI / 2;
pool.position.y = 0.04;
g.add(pool);
g.visible = false;
list.push({ x: x, z: z, g: g, m: m, c: c, i: i, got: !!got[i] });
if (got[i])
g.visible = false;
});
GD.spots = { id: A.id, i: A.i, list: list };
},
function (A, st, P) {
var G = gdG(), x = P.at[0] + 7, z = P.at[1] - 5, g = mmG(G, x, gdY(st[1], x, z), z), w = mmMat(0x6A4A30, { tex: "worn" }), mt = mmMat(0x8A9098, { shine: 60, tex: "plate" });
mmSlab(g, w, 2.2, 0.12, 1, 0, 0.95, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { mmSlab(g, w, 0.1, 0.9, 0.1, q[0] * 1, 0.45, q[1] * 0.42); });
mmSlab(g, mt, 0.5, 0.15, 0.35, -0.6, 1.1, 0);
mmCyl(g, mt, 0.08, 0.08, 0.3, 0.5, 1.16, 0.1, 0, 0, 0, 8);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), new THREE.MeshBasicMaterial({ color: 0xFFD98A }));
lamp.position.set(0.9, 1.4, -0.3);
g.add(lamp);
GD.bench = { id: A.id, i: A.i, x: x, z: z, g: g };
},
function (key, done) {
var M = GS_MAKE[key];
if (!M) {
done();
return;
}
var order = M.parts.slice(), shown = M.parts.slice().sort(function (a, b) { return (a.length * 7 + a.charCodeAt(0)) % 5 - (b.length * 7 + b.charCodeAt(0)) % 5 || a.localeCompare(b); }), put = [];
var draw = function (msg) {
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🔧 " + sbEsc(M.n) + "</div><div style='font-size:13px;opacity:.85;margin:4px 0 6px'>" + sbEsc(M.hint) + "</div>";
h += "<div style='font-size:13px;margin:4px 0'>Put together so far: <b>" + (put.length ? put.map(sbEsc).join(" → ") : "nothing yet") + "</b></div>";
if (msg)
h += "<div style='font-size:13px;color:#FFB8A0;margin:4px 0'>" + msg + "</div>";
shown.forEach(function (p, i) {
if (put.indexOf(p) >= 0)
return;
h += worldBtn("gdp" + i, sbEsc(p), "");
fns["gdp" + i] = function () {
if (order[put.length] === p) {
put.push(p);
sbTone(660, 0.06);
if (put.length === order.length) {
worldCard(null);
sbSay("<b>" + sbEsc(M.n) + "</b>: " + sbEsc(M.done));
done();
return;
}
draw();
}
else {
put = [];
sbTone(220, 0.12);
draw("That does not sit right, and the rest comes apart in your hands. Start again.");
}
};
});
worldCard(h, fns);
};
draw();
},
function (A, st, P) {
var G = gdG(), n = st[3], list = [], r = Math.max(30, Math.min(80, n * 9));
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = P.at[0] + Math.cos(a) * r, z = P.at[1] + Math.sin(a) * r, y = gdY(st[1], x, z), g = mmG(G, x, y, z);
var m = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.14, 8, 28), new THREE.MeshBasicMaterial({ color: i === 0 ? 0x8AFFB0 : 0xFFD98A, transparent: true, opacity: 0.8, depthWrite: false, fog: false }));
m.position.y = 2.6;
m.rotation.y = a;
g.add(m);
list.push({ x: x, z: z, g: g, m: m });
}
GD.ring = { id: A.id, i: A.i, list: list, next: 0, t0: 0, on: 0 };
},
function (dt) {
var S = gsGet(), A = S.act, busy = false;
if (A) {
var C = GS_CH[A.id], st = C && C.steps[A.i];
if (Date.now() - GS.lastIn < 60000) {
S.am = S.am || {};
S.am[A.id] = (S.am[A.id] || 0) + dt;
}
if (st) {
var i0 = A.i, c0 = A.id;
busy = gdRun(dt, A, st, C, function (say) { gsStep(say); }, function () { var a = gsGet().act; return !!a && a.id === c0 && a.i === i0; });
}
}
if (!busy && typeof gqGet === "function") {
var Q = gqGet();
Object.keys(Q.act || {}).some(function (id) {
var B = Q.act[id], q = gqQ(id), s2 = q && B && q.steps[B.i];
if (!s2 || !GD_KINDS.test(s2[0]) || s2[0] === "land")
return false;
B.id = "q:" + id;
var j0 = B.i;
busy = gdRun(dt, B, s2, { f: q.f || "raider" }, function (say) { gqNext(id, say); }, function () { var b = gqGet().act[id]; return !!b && b.i === j0; });
return busy;
});
}
if (!busy && (GD.npc || GD.spots || GD.ring || GD.bench))
gdClear();
},
function (dt, A, st, C, next, alive) {
var k = st[0];
if (!GD_KINDS.test(k))
return false;
var mine = function (o) { return o && o.id === A.id && o.i === A.i; };
if (GD.npc && !mine(GD.npc)) {
gdDrop(GD.npc.g);
GD.npc = null;
}
if (GD.spots && !mine(GD.spots)) {
GD.spots.list.forEach(function (s) { gdDrop(s.g); });
GD.spots = null;
}
if (GD.ring && !mine(GD.ring)) {
GD.ring.list.forEach(function (r) { gdDrop(r.g); });
GD.ring = null;
}
if (GD.bench && !mine(GD.bench)) {
gdDrop(GD.bench.g);
GD.bench = null;
}
if (k === "land") {
if (WLD.on === "surface" && SF.k === st[1] && !GX_OUT[st[1]])
next("You have landed on " + sbEsc((gxBody(st[1]) || {}).name || st[1]) + ".");
return false;
}
if (k === "call") {
if (typeof SB !== "undefined" && SB.battle)
return true;
if (WLD.card && WLD.card.style.display !== "none")
return true;
var key = "call:" + A.id + ":" + A.i;
if (GD.said[key] && Date.now() - GD.said[key] < 20000)
return true;
GD.said[key] = Date.now();
sbTone(880, 0.08);
setTimeout(function () { sbTone(988, 0.1); }, 160);
gdSceneOpen(st[1], function () { if (alive())
next(); });
return true;
}
var onSurf = WLD.on === "surface" && SF.k === st[1];
if (!onSurf)
return true;
var L = worldLocal(), P = gsPlace(st[1], st[2]);
if (!P) {
next();
return true;
}
var d = Math.hypot(L.x - P.at[0], L.z - P.at[1]);
if (k === "scene") {
if (!GD.npc && d < 90) {
var D = GS_SCENES[st[3]] || { who: "Someone" };
GD.npc = gdPerson(st[1], st[3], D.who, P.at[0] + 4, P.at[1] + 3, { sex: D.sex, look: D.look });
if (GD.npc) {
GD.npc.id = A.id;
GD.npc.i = A.i;
}
}
if (GD.npc) {
var dn = Math.hypot(L.x - GD.npc.x, L.z - GD.npc.z);
if (dn < 20)
gdFace(GD.npc, L.x, L.z);
if (dn < 3.2)
worldPrompt("<b>" + sbEsc(GD.npc.who) + "</b> · <b>press E</b> to talk", function () { gdSceneOpen(st[3], function () { if (alive())
next(); }); });
}
return true;
}
if (k === "search") {
if (!GD.spots && d < 90)
gdSpots(A, st, P);
if (!GD.spots)
return true;
var near = null;
GD.spots.list.forEach(function (s) { if (s.got) {
s.g.visible = false;
return;
} var ds = Math.hypot(L.x - s.x, L.z - s.z); s.g.visible = ds < 16; s.m.rotation.y += dt * 1.5; s.m.position.y = 0.35 + Math.sin(WLD.t * 2 + s.i) * 0.06; if (ds < 2.4 && (!near || ds < near.ds))
near = { s: s, ds: ds }; });
if (near)
worldPrompt("<b>" + sbEsc(near.s.c.n) + "</b> · <b>press E</b> to look closely", function () {
var s = near.s;
if (s.got)
return;
s.got = true;
A.got = A.got || {};
A.got[s.i] = 1;
A.n = (A.n || 0) + 1;
gdSaveAll();
sbTone(784, 0.06);
var all = GD.spots.list.length, left = all - A.n;
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🔎 " + sbEsc(s.c.n) + "</div><div style='font-size:14px;line-height:1.45;margin:6px 0'>" + s.c.t + "</div><div style='opacity:.75;font-size:12.5px'>" + (left ? left + " more to find here. They shine faintly when you are close." : "That is everything here.") + "</div>" + worldBtn("gdok", "Go on", ""), { gdok: function () { worldCard(null); if (A.n >= all) {
if (alive())
next();
} } });
});
else if (d < 40 && !GD.said["srch:" + A.id + A.i]) {
GD.said["srch:" + A.id + A.i] = 1;
sbSay("<b>Look about.</b> " + sbEsc(st[4]) + ": what matters here shines faintly when you are close. (" + (GS_CLUES[st[3]] || []).length + " things to find.)");
}
return true;
}
if (k === "make") {
if (!GD.bench && d < 90)
gdBenchAt(A, st, P);
if (GD.bench && Math.hypot(L.x - GD.bench.x, L.z - GD.bench.z) < 3)
worldPrompt("<b>A work-bench</b> · <b>press E</b> to make " + sbEsc((GS_MAKE[st[3]] || { n: "it" }).n), function () { gdMakeOpen(st[3], function () { if (alive())
next(); }); });
return true;
}
if (k === "race") {
if (!GD.ring && d < 120) {
gdRings(A, st, P);
gdRingPaint();
}
var R = GD.ring;
if (!R)
return true;
R.list.forEach(function (r) { r.m.rotation.z += dt * 0.4; });
if (R.on && (WLD.t - R.t0) > st[4]) {
R.on = 0;
R.next = 0;
gdRingPaint();
sbSay("<b>Too slow.</b> " + st[4] + " seconds is the mark. Back to the green ring to try again.");
}
if (R.next < R.list.length) {
var q = R.list[R.next];
if (Math.hypot(L.x - q.x, L.z - q.z) < 3.4) {
if (R.next === 0) {
R.on = 1;
R.t0 = WLD.t;
sbSay("<b>Go!</b> Run the rings in order, then back to this one: " + st[4] + " seconds.");
sbTone(660, 0.1);
}
else
sbTone(720 + R.next * 20, 0.05);
R.next++;
gdRingPaint();
if (R.next >= R.list.length)
R.list[0].m.material.color.setHex(0x8AFFB0);
}
}
if (R.on && R.next >= R.list.length) {
var q0 = R.list[0];
if (Math.hypot(L.x - q0.x, L.z - q0.z) < 3.4) {
var tt = Math.round(WLD.t - R.t0);
R.on = 0;
{
next("<b>Round in " + tt + " seconds.</b>");
return true;
}
}
}
if (R.on) {
var left = Math.max(0, Math.ceil(st[4] - (WLD.t - R.t0)));
worldPrompt("🏁 Ring " + Math.min(R.next + 1, R.list.length) + " of " + R.list.length + (R.next >= R.list.length ? " · back to the green one" : "") + " · <b>" + left + " s</b> left", function () { });
}
return true;
}
if (k === "follow") {
var B = gsPlace(st[1], st[3]);
if (!B) {
next();
return true;
}
if (!GD.npc && d < 70) {
GD.npc = gdPerson(st[1], "fol" + A.id + A.i, st[4], P.at[0] + 3, P.at[1] + 3, { sex: GS_WHO_SEX[st[4]] });
if (GD.npc) {
GD.npc.id = A.id;
GD.npc.i = A.i;
}
GD.fol = { near: 0, far: 0, go: 0 };
sbSay("<b>" + sbEsc(gdCap(st[4])) + "</b> is about to set off. Keep them in sight, but never come close: about 10 to 40 metres back.");
}
if (!GD.npc)
return true;
var F = GD.fol, dn = Math.hypot(L.x - GD.npc.x, L.z - GD.npc.z);
if (!F.go) {
if (dn < 45)
F.go = 1;
else
return true;
}
var rest = gdMove(GD.npc, B.at[0], B.at[1], 2.3, dt);
if (dn < 8) {
F.near += dt;
if (F.near > 2) {
sbSay("<b>" + sbEsc(gdCap(st[4])) + " turns and sees you.</b> They hurry back the way they came. Wait a little, then try again, further back.");
gdDrop(GD.npc.g);
GD.npc = null;
GD.fol = null;
}
}
else
F.near = Math.max(0, F.near - dt);
if (GD.npc && dn > 48) {
F.far += dt;
if (F.far > 4 && !F.toldFar) {
F.toldFar = 1;
sbSay("<b>You are losing them.</b> Close in a little.");
}
if (F.far > 10) {
sbSay("<b>You lost " + sbEsc(st[4]) + ".</b> They will set off again from " + sbEsc(P.n) + ".");
gdDrop(GD.npc.g);
GD.npc = null;
GD.fol = null;
}
}
else if (F) {
F.far = 0;
F.toldFar = 0;
}
if (GD.npc && rest < 1) {
gdDrop(GD.npc.g);
GD.npc = null;
GD.fol = null;
{
next("<b>" + sbEsc(gdCap(st[4])) + " went in at " + sbEsc(B.n) + ".</b> Now you know where.");
return true;
}
}
return true;
}
if (k === "escort") {
var B2 = gsPlace(st[1], st[3]);
if (!B2) {
next();
return true;
}
if (!GD.npc && d < 70) {
GD.npc = gdPerson(st[1], "esc" + A.id + A.i, st[4], P.at[0] + 3, P.at[1] + 3, { sex: GS_WHO_SEX[st[4]] });
if (GD.npc) {
GD.npc.id = A.id;
GD.npc.i = A.i;
}
GD.esc = { x0: P.at[0], z0: P.at[1], foes: 0 };
}
if (!GD.npc)
return true;
var E = GD.esc, dn2 = Math.hypot(L.x - GD.npc.x, L.z - GD.npc.z);
var all = Math.hypot(B2.at[0] - E.x0, B2.at[1] - E.z0), gone = Math.hypot(GD.npc.x - E.x0, GD.npc.z - E.z0);
var fighting = SF.gsFoes && SF.gsFoes.id === A.id && SF.gsFoes.i === A.i && SF.gsFoes.list.some(function (F) { return !F.yield; });
if (!E.foes && gone > all * 0.45) {
E.foes = 1;
SF.gsFoes = { id: A.id, i: A.i, list: gsSpawnWave(C, { at: [GD.npc.x + (L.x - GD.npc.x) * 0.2 + 10, GD.npc.z + 6] }, st[5] || 4) };
sbSay("<b>Ambush!</b> " + sbEsc(gdCap(st[4])) + " ducks down. Drive them off.");
}
if (fighting) {
gdFace(GD.npc, L.x, L.z);
return true;
}
if (dn2 < 12) {
var r2 = gdMove(GD.npc, B2.at[0], B2.at[1], 2.0, dt);
if (r2 < 2) {
gdDrop(GD.npc.g);
GD.npc = null;
GD.esc = null;
{
next("<b>" + sbEsc(gdCap(st[4])) + " is safe at " + sbEsc(B2.n) + ".</b>");
return true;
}
}
}
else if (!GD.said["esc:" + A.id + A.i] || Date.now() - GD.said["esc:" + A.id + A.i] > 15000) {
GD.said["esc:" + A.id + A.i] = Date.now();
if (dn2 < 80)
sbSay("<b>" + sbEsc(gdCap(st[4])) + "</b> waits for you. Stay close (within 12 m) and they will walk.");
}
if (dn2 < 3.2 && !fighting)
worldPrompt("<b>" + sbEsc(gdCap(st[4])) + "</b> · walking with you to " + sbEsc(B2.n), function () { });
return true;
}
}
];
});
