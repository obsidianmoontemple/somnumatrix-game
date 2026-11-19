/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HWD = { mats: {}, tex: {}, geos: {}, warned: 0, lite: (typeof LITE !== "undefined" && !!LITE) };
function hwdMat(col, tex, o) { return __ZC(379, 0, this, arguments, new.target); }
function hwdSeg(n) { return HWD.lite ? Math.max(5, Math.round(n * 0.6)) : n; }
function hwdUV(geo, kind, s) { if (typeof metreUVs === "function")
try {
metreUVs(geo, kind, s);
}
catch (e) { } return geo; }
function hwdAdd(g, geo, m, x, y, z) { var me = new THREE.Mesh(geo, m); me.position.set(x || 0, y || 0, z || 0); g.add(me); return me; }
function hwdBox(g, w, h, d, x, y, z, m, ry) { var b = hwdAdd(g, hwdUV(new THREE.BoxGeometry(w, h, d), "box", [w, h, d]), m, x, y, z); if (ry)
b.rotation.y = ry; return b; }
function hwdCyl(g, rt, rb, h, x, y, z, m, seg) { return hwdAdd(g, hwdUV(new THREE.CylinderGeometry(rt, rb, h, hwdSeg(seg || 12)), "cyl", [rt, rb, h]), m, x, y, z); }
function hwdBall(g, r, x, y, z, m, seg) { var s = hwdSeg(seg || 12); return hwdAdd(g, hwdUV(new THREE.SphereGeometry(r, s, Math.max(5, s * 0.7 | 0)), "sph", [r]), m, x, y, z); }
function hwdCone(g, r, h, x, y, z, m, seg) { return hwdAdd(g, hwdUV(new THREE.ConeGeometry(r, h, hwdSeg(seg || 10)), "cone", [r, h]), m, x, y, z); }
function hwdTor(g, R, r, x, y, z, m, arc, seg) { var t = hwdAdd(g, new THREE.TorusGeometry(R, r, hwdSeg(8), hwdSeg(seg || 24), arc || Math.PI * 2), m, x, y, z); return t; }
function hwdGlow(g, col, size, x, y, z, op) {
if (typeof wGlow !== "function")
return null;
var s = wGlow(col, size, op === undefined ? 0.5 : op);
s.position.set(x, y, z);
g.add(s);
return s;
}
function hwdPts(shape, hw, h) { return __ZC(379, 1, this, arguments, new.target); }
function hwdTop(P) { var t = 0; P.forEach(function (p) { if (p[1] > t)
t = p[1]; }); return t; }
function hwdShape(P) { return new THREE.Shape(P.map(function (p) { return new THREE.Vector2(p[0], p[1]); })); }
function hwdDoorway(g, o) { return __ZC(379, 2, this, arguments, new.target); }
function hwdPlateTex(name, bg, fg, sub) { return __ZC(379, 3, this, arguments, new.target); }
function hwdPlate(g, name, y, z, bg, fg, sub, w) { return __ZC(379, 4, this, arguments, new.target); }
function hwdLantern(g, x, y, z, col, metal, glass) { return __ZC(379, 5, this, arguments, new.target); }
function hwdPot(g, x, z, pot, plant, kind) { return __ZC(379, 6, this, arguments, new.target); }
function hwdMotes(g, n, spread, col, size, mode, speed, x, y, z, op) {
if (typeof particles !== "function")
return null;
var p = particles(HWD.lite ? Math.max(6, n >> 1) : n, spread, col, size, op === undefined ? 0.75 : op);
p.position.set(x || 0, y || 0, z || 0);
p.userData.keep = 1;
p.userData.hwd = { mode: mode, speed: speed || 0.5 };
g.add(p);
return p;
}
function hwdTwoFaces(g, draw) { return __ZC(379, 7, this, arguments, new.target); }
var HWD_WORLDS = {
town: { sub: "where everything you dreamt stands", glow: 0xFFE0A0, draw: function (g) { return __ZC(379, 8, this, arguments, new.target); } },
somnucor: { sub: "the city, and the plaza where you came in", glow: 0x9FD8FF, draw: function (g) { return __ZC(379, 9, this, arguments, new.target); } },
underworld: { sub: "Erebos · the house of Hades", glow: 0xFF7A3A, draw: function (g) { return __ZC(379, 10, this, arguments, new.target); } },
heavens: { sub: "above the clouds", glow: 0xFFF0C0, draw: function (g) { return __ZC(379, 11, this, arguments, new.target); } },
depths: { sub: "the sea king's palace and Atlantis", glow: 0x5AC8D8, draw: function (g) { return __ZC(379, 12, this, arguments, new.target); } },
faerie: { sub: "the hollow hills and the fair folk", glow: 0xC8F0A0, draw: function (g) { return __ZC(379, 13, this, arguments, new.target); } },
void: { sub: "the dark between", glow: 0x7A5AE8, draw: function (g) { return __ZC(379, 14, this, arguments, new.target); } },
mirror: { sub: "through the looking glass", glow: 0xE8F0FF, draw: function (g) { return __ZC(379, 15, this, arguments, new.target); } },
dead: { sub: "beyond the veil", glow: 0xB8D8D0, draw: function (g) { return __ZC(379, 16, this, arguments, new.target); } },
frozen: { sub: "the ice palace and the long winter", glow: 0xBFE8FF, draw: function (g) { return __ZC(379, 17, this, arguments, new.target); } },
elsewhere: { sub: "a place entirely other", glow: 0x6AE8C8, draw: function (g) { return __ZC(379, 18, this, arguments, new.target); } },
templerow: { sub: "the temples of every faith, side by side", glow: 0xFFD890, draw: function (g) { return __ZC(379, 19, this, arguments, new.target); } },
fire: { sub: "the volcano and the forges", glow: 0xFF6A1A, draw: function (g) { return __ZC(379, 20, this, arguments, new.target); } },
stars: { sub: "the sky beyond the sky", glow: 0x9AB8FF, plateY: 5.95, draw: function (g) { return __ZC(379, 21, this, arguments, new.target); } },
wasteland: { sub: "the broken road", glow: 0xE8C080, draw: function (g) { return __ZC(379, 22, this, arguments, new.target); } },
desert: { sub: "the dunes and the oasis", glow: 0xFFD898, draw: function (g) { return __ZC(379, 23, this, arguments, new.target); } },
station: { sub: "the station above the world", glow: 0x9AE8FF, draw: function (g) { return __ZC(379, 24, this, arguments, new.target); } },
future: { sub: "the city that is coming", glow: 0xE85AE8, draw: function (g) { return __ZC(379, 25, this, arguments, new.target); } }
};
function hwdKey(spec) {
if (!spec || spec.archetype !== "hubdoor" || spec.dreamerDoor)
return null;
if (spec.leadsTo)
return HWD_WORLDS[spec.leadsTo] ? spec.leadsTo : null;
if (!spec.hub)
return null;
var n = spec.name || spec.label;
if (!n)
return null;
if (n === "Your own town")
return "town";
if (n === "Back to Somnucor")
return "somnucor";
if (typeof REALMS !== "undefined")
for (var k in REALMS)
if (REALMS[k] && REALMS[k].name === n && HWD_WORLDS[k])
return k;
return null;
}
var HWD_PLATES = { town: ["#1E3A26", "#F0E0B0"], somnucor: ["#2A2E3A", "#E8D090"], underworld: ["#1A1214", "#E89A5A"], heavens: ["#F4EEE0", "#8A6A20"],
depths: ["#0E3A44", "#BFF0F0"], faerie: ["#2A3A1E", "#F0E8B0"], void: ["#08080E", "#B8A8FF"], mirror: ["#D8DEE6", "#2A3040"], dead: ["#4A4A44", "#F0EDE0"],
frozen: ["#DCEEFA", "#1E4A6A"], elsewhere: ["#10302E", "#9AFFE0"], templerow: ["#E8E0CC", "#5A3A10"], fire: ["#1A0E0A", "#FFB050"], stars: ["#0E1430", "#F0D070"],
wasteland: ["#3A2E22", "#E8C890"], desert: ["#E8D4AA", "#1E4A7A"], station: ["#2A3038", "#9AE8FF"], future: ["#10121C", "#F0A0F0"] };
function hwdDress(g, spec, key) { return __ZC(379, 26, this, arguments, new.target); }
function hwdAnim(g, spec) { return __ZC(379, 27, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments);
try {
var k = hwdKey(spec);
if (k)
hwdDress(g, spec, k);
}
catch (e) {
if (!HWD.warned && window.console) {
HWD.warned = 1;
console.warn("[hall-doors]", e);
}
}
return g;
};
if (typeof EFFECTS !== "undefined") {
var fx0 = EFFECTS.hubdoor;
EFFECTS.hubdoor = function (g, spec) { if (g && g.userData.hwd)
return hwdAnim(g, spec); return fx0 ? fx0(g, spec) : null; };
}
})();
function hwdMirror(g) { return __ZC(379, 28, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments);
try {
if (spec && spec.archetype === "hubmirror" && spec.hub)
hwdMirror(g);
}
catch (e) {
if (!HWD.warned && window.console) {
HWD.warned = 1;
console.warn("[hall-doors]", e);
}
}
return g;
};
})();
var HWD_STORY = [
{ g: function () { return typeof LBYD !== "undefined" && LBYD.g; }, surf: { 0x8A8478: "stone", 0x2A2420: "wood" }, draw: function (f) { return __ZC(379, 29, this, arguments, new.target); } },
{ g: function () { return typeof DAVD !== "undefined" && DAVD.g; }, surf: { 0xD8C8A8: "stone", 0x6A4426: "wood" }, draw: function (f) { return __ZC(379, 30, this, arguments, new.target); } },
{ g: function () { return typeof SHKD !== "undefined" && SHKD.g; }, surf: { 0x4A3424: "wood", 0xF2EEE4: "plaster", 0xC8A878: "thatch", 0x8A1A2A: "wood" }, draw: function (f) { return __ZC(379, 31, this, arguments, new.target); } },
{ g: function () { return typeof VRND !== "undefined" && VRND.g; }, surf: { 0x3A4A52: "metal", 0x6A4426: "wood" }, draw: function (f) { return __ZC(379, 32, this, arguments, new.target); } },
{ g: function () { return typeof SHNC !== "undefined" && SHNC.door; }, surf: { 0x2A1A10: "wood", 0x6A665E: "stone" }, draw: function (f) { return __ZC(379, 33, this, arguments, new.target); } },
{ g: function () { return typeof GMMC !== "undefined" && GMMC.door; }, surf: { 0x4A2E1A: "wood", 0x8A847A: "stone", 0x2E5A2A: "foliage", 0x3A6A2A: "foliage" }, draw: function (f) { return __ZC(379, 34, this, arguments, new.target); } }
];
function hwdCanvas(key, w, h, draw) {
if (HWD.tex[key])
return HWD.tex[key];
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d");
draw(x, w, h);
return (HWD.tex[key] = new THREE.CanvasTexture(c));
}
function hwdSketchTex() { return __ZC(379, 35, this, arguments, new.target); }
function hwdBillTex() { return __ZC(379, 36, this, arguments, new.target); }
function hwdGaugeTex() { return __ZC(379, 37, this, arguments, new.target); }
function hwdStoryDress(S) { return __ZC(379, 38, this, arguments, new.target); }
var HWD_T = 0;
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
try {
HWD_T += dt || 0.016;
for (var i = 0; i < HWD_STORY.length; i++) {
var S = HWD_STORY[i], g = S.g();
if (!g)
continue;
if (!g.userData.hwd)
hwdStoryDress(S);
if (S.anim && g.visible)
S.anim(HWD_T, dt);
}
}
catch (e) {
if (!HWD.warned && window.console) {
HWD.warned = 1;
console.warn("[hall-doors] story", e);
}
}
};
})();
function hwdHallDoorNear(x, z) { return __ZC(379, 39, this, arguments, new.target); }
(function () {
if (typeof hubTick === "function") {
var h0 = hubTick;
hubTick = function (dt) {
var was = store.here || 0, P = camera.position, px = P.x, pz = P.z;
h0.apply(this, arguments);
try {
if ((store.here || 0) === was || !store.lastId)
return;
var hall = hallRealm();
if (!hall || was !== hall.id)
return;
var door = hwdHallDoorNear(px, pz);
if (!door)
return;
var ps = store.passages || [];
for (var i = ps.length - 1; i >= 0; i--) {
var p = ps[i], other = p.to === store.lastId ? p.from : (p.from === store.lastId ? p.to : null);
if (!other)
continue;
var a = specById(other);
if (a && a.realm === hall.id) {
a.hwdDoor = door.id;
if (typeof save === "function")
save();
}
break;
}
}
catch (e) {
if (!HWD.warned && window.console) {
HWD.warned = 1;
console.warn("[hall-doors] way in", e);
}
}
};
}
if (typeof stepThrough === "function") {
var s0 = stepThrough;
stepThrough = function () {
var cool = portalCool;
s0.apply(this, arguments);
try {
if (cool > 0 || portalCool !== 140 || !lastPlace || !lastPlace.hwdDoor)
return;
var d = specById(lastPlace.hwdDoor), hall = hallRealm();
if (!d || !hall)
return;
var h = blockOrigin(hall.grid.bx, hall.grid.bz), ux = h.x - d.x, uz = h.z - d.z, L = Math.hypot(ux, uz) || 1;
ux /= L;
uz /= L;
camera.position.x = d.x + ux * 4.5;
camera.position.z = d.z + uz * 4.5;
yaw = Math.atan2(-ux, -uz);
hubCool = 3;
if (typeof beHere === "function" && (store.here || 0) !== hall.id)
beHere(hall.id);
var nm = d.name || "the Hall of Doors";
setStatus("<b>The Hall of Doors.</b> Back through the door to " + esc(String(nm).replace(/^Back to /, "")) + ".");
}
catch (e) {
if (!HWD.warned && window.console) {
HWD.warned = 1;
console.warn("[hall-doors] way back", e);
}
}
};
}
})();
var HWDP = { cur: null, owner: null, on: false, doors: [
{ k: "lby", tick: "lbyHallTick", S: function () { return typeof LBYD !== "undefined" ? LBYD : null; }, flag: true },
{ k: "dav", tick: "davHallTick", S: function () { return typeof DAVD !== "undefined" ? DAVD : null; }, flag: true },
{ k: "shk", tick: "shkHallTick", S: function () { return typeof SHKD !== "undefined" ? SHKD : null; }, flag: true },
{ k: "vrn", tick: "vrnHallTick", S: function () { return typeof VRND !== "undefined" ? VRND : null; }, flag: true },
{ k: "stc", tick: "stcHallTick", S: function () { return typeof STCD !== "undefined" ? STCD : null; }, flag: true },
{ k: "shn", tick: "shnHallTick", S: function () { return typeof SHNC !== "undefined" ? SHNC : null; }, flag: "door" },
{ k: "gmm", tick: "gmmCityTick", S: function () { return typeof GMMC !== "undefined" ? GMMC : null; }, flag: "door" }
] };
function hwdpShown() {
if (typeof WCITY === "undefined" || !WCITY.fn || typeof WLD === "undefined")
return false;
var p = WLD.prompt;
return WLD.promptFn === WCITY.fn && !!p && p.style.display !== "none";
}
function hwdpAfter(d) {
var S = d.S();
if (!S || S.on !== d.flag)
return;
if (HWDP.owner !== d.k || !hwdpShown())
S.on = d.flag === true ? false : null;
}
function hwdpInstall() {
if (HWDP.on || typeof worldPromptCity !== "function")
return;
HWDP.on = true;
var wpc = worldPromptCity;
worldPromptCity = function (html, fn) {
var c = HWDP.cur;
if (!html) {
if (c && HWDP.owner && HWDP.owner !== c)
return;
HWDP.owner = null;
}
else
HWDP.owner = c;
return wpc.apply(this, arguments);
};
HWDP.doors.forEach(function (d) {
var f = window[d.tick];
if (typeof f !== "function")
return;
window[d.tick] = function () {
var was = HWDP.cur;
HWDP.cur = d.k;
var r;
try {
r = f.apply(this, arguments);
}
finally {
HWDP.cur = was;
}
try {
hwdpAfter(d);
}
catch (e) { }
return r;
};
});
}
if (typeof addEventListener === "function")
addEventListener("load", function () { try {
hwdpInstall();
}
catch (e) {
if (window.console)
console.warn("[hall-doors] prompts:", e);
} });
