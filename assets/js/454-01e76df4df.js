/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var WFD = { g: null, doors: [], on: null, built: false, t: 0, lite: false, hallId: null };
function wfdKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function wfdSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function wfdTemple() { try {
if (wfdKeeper())
return true;
if (typeof otmCoven === "function")
return !!otmCoven();
}
catch (e) { } return false; }
function wfdFn(n) { return typeof window[n] === "function" ? window[n] : null; }
function wfdGo(key, opt) { if (typeof worldGo !== "function" || typeof WORLDS === "undefined" || !WORLDS[key]) {
wfdSay("<b>That door is still shut.</b> The world behind it is not ready.");
return false;
} return worldGo(key, opt || {}); }
function wfdHelix() { return __ZC(454, 0, this, arguments, new.target); }
var WFD_LIST = [
{ k: "space", n: "Outer Space", s: "Station Aurora, the planets and the stars", fr: 0x5A6A7A, lf: 0x1A2440, gl: 0x9FC8FF, sh: "square", tex: "metal", go: function () { return wfdGo("space", { station: "aurora", msg: "<b>Orbit.</b> Station Aurora turns beside you. The planets are yours to fly to." }); } },
{ k: "casino", n: "The Moon Casino", s: "18+ · the hidden resort on the Moon", fr: 0x2A2A34, lf: 0x8A1A2A, gl: 0xFFD080, sh: "arch", tex: "stone", go: function () { var f = wfdFn("casKnock"); return f ? f() : wfdGo("casino"); } },
{ k: "neverland", n: "Neverland", s: "second to the right, and straight on till morning", fr: 0x6A5A3A, lf: 0x2E5A2A, gl: 0xFFE8A0, sh: "round", tex: "bark", go: function () { return wfdGo("neverland"); } },
{ k: "sea", n: "The Endless Sea", s: "the Wayfarer, and the islands of the Odyssey", fr: 0xE8E0CC, lf: 0x2A5A8A, gl: 0x8AD8F0, sh: "arch", tex: "stone", go: function () { return wfdGo("sea"); } },
{ k: "underdark", n: "The Underdark", s: "Zhaelvorn, Glimmerdeep and the Darklake", fr: 0x3A3442, lf: 0x1A1624, gl: 0xB08AFF, sh: "pointed", tex: "stone", go: function () { return wfdGo("underdark"); } },
{ k: "northpole", n: "The North Pole", s: "Santa's village, the elves and the workshop", fr: 0xF4F4F8, lf: 0xB8141C, gl: 0xFFF0D0, sh: "arch", tex: "wood", go: function () { return wfdGo("northpole"); } },
{ k: "party", n: "Jubilee, the Party Planet", s: "the Starport, the stages and the fair", fr: 0x8A3AA8, lf: 0xE8B020, gl: 0xFF9AE8, sh: "round", tex: "metal", go: function () { return wfdGo("party"); } },
{ k: "battle", n: "Ironfray", s: "18+ · the battle world, beyond the War Gate", fr: 0x4A4642, lf: 0x2A2826, gl: 0xFF9A5A, sh: "square", tex: "stone", go: function () { return wfdGo("battle"); } },
{ k: "greenwold", n: "Greenwold", s: "the green country of farms and woods", fr: 0x6A8A4A, lf: 0x3A6A2A, gl: 0xD8F0A0, sh: "round", tex: "wood", go: function () { return wfdGo("greenwold"); } },
{ k: "lounge", n: "GiGi's Lounge", s: "the resort: cards, bingo, the spa and the lawn", fr: 0xD8C8A8, lf: 0x8A2A4A, gl: 0xFFD8B0, sh: "arch", tex: "plaster", go: function () { return wfdGo("lounge"); } },
{ k: "family", n: "Hearthside and Everbloom", s: "the family house and the wedding house", fr: 0xE8D8C0, lf: 0x6A3A22, gl: 0xFFE0B0, sh: "arch", tex: "plaster", go: function () { return wfdGo("family", { at: "fam" }); } },
{ k: "race", n: "The Race Planet", s: "the tracks, the pits and the stands", fr: 0x2A2A2E, lf: 0xE8E8E8, gl: 0xFFE060, sh: "square", tex: "metal", go: function () { var f = wfdFn("pyGo"); return f ? f() : wfdGo("race"); } },
{ k: "kidszone", n: "Wonderglen, the Kids Zone", s: "for young dreamers, bold and bright", fr: 0xF0C040, lf: 0x3A9AE8, gl: 0xFFF0A0, sh: "round", tex: "wood", go: function () {
var M = wfdFn("kzMayEnter");
if (M) {
try {
var ok = M();
if (ok && ok.ok === false) {
wfdSay(typeof esc === "function" ? esc(ok.say) : ok.say);
return false;
}
}
catch (e) { }
}
return wfdGo("kidszone");
} },
{ k: "ctale", n: "The Classic Stories", s: "books, myths and old tales to walk into", fr: 0x7A5A3A, lf: 0x5A2A1A, gl: 0xFFE0A0, sh: "arch", tex: "wood", go: function () { var f = wfdFn("ctAllCard"); if (f) {
f();
return true;
} return false; } },
{ k: "guildlands", n: "The Guildlands", s: "the guild houses, their crafts and their halls", fr: 0x8A7A5A, lf: 0x4A3422, gl: 0xFFC870, sh: "pointed", tex: "stone", go: function () { var f = wfdFn("hndGo"); return f ? f() : wfdGo("guildlands"); } },
{ k: "erebos", n: "Erebos", s: "the Underworld of Hades, past the Acheron", fr: 0x2A2420, lf: 0x141010, gl: 0xC86A3A, sh: "pointed", tex: "stone", go: function () { var f = wfdFn("ebsGo"); return f ? f() : wfdGo("erebos"); } },
{ k: "sim", n: "The Simulation Studio", s: "say a scene, and walk into it", fr: 0xD8DCE4, lf: 0x2A3A5A, gl: 0x8AE8FF, sh: "square", tex: "metal", go: function () { var f = wfdFn("ptxOpen"); if (f) {
f();
return true;
} return false; } },
{ k: "tower", n: "The Helix Tower", s: "its floors, by the level of your card", fr: 0x9AA4B0, lf: 0x1E2A3A, gl: 0x9AE8D0, sh: "square", tex: "metal", go: wfdHelix },
{ k: "otemple", n: "The Temple of the Obsidian Moon", s: "the coven's temple", fr: 0x1A1820, lf: 0x2A2440, gl: 0xC8B8FF, sh: "pointed", tex: "stone", go: function () { var f = wfdFn("otmGo"); return f ? f() : wfdGo("otemple"); } },
{ k: "otdeep", n: "The Depths below the Temple", s: "Temple members only", fr: 0x2A1614, lf: 0x140A0A, gl: 0xFF6A3A, sh: "pointed", tex: "stone", go: function () {
if (!wfdTemple()) {
wfdSay("🌙 <b>The Depths below the Temple</b> are for Temple members only.");
return false;
}
var f = wfdFn("odpGo");
return f ? f() : wfdGo("otdeep");
} },
{ k: "heavens", n: "The Heavens", s: "Temple members only", fr: 0xF4F0E4, lf: 0xE8D8A0, gl: 0xFFF6D8, sh: "round", tex: "marble", go: function () {
if (!wfdTemple()) {
wfdSay("☁️ <b>The Heavens</b> are for Temple members only.");
return false;
}
var f = wfdFn("hvnGo");
return f ? f({ fromName: "the Hall of Doors" }) : wfdGo("heavens");
} },
{ k: "wonders", n: "The Wonders of the World", s: "the Seven Wonders, at their real size", fr: 0xE8DCC0, lf: 0xB89A5A, gl: 0xFFF0C8, sh: "square", tex: "marble", go: function () { var f = wfdFn("wndGo"); return f ? f() : wfdGo("wonders"); } },
{ k: "sports", n: "The Sports Grounds", s: "the arena, the gyms and the league", fr: 0x3A5A8A, lf: 0xE8E8E8, gl: 0xFFFFFF, sh: "square", tex: "metal", go: function () { var f = wfdFn("sptGo"); return f ? f() : wfdGo("sports"); } },
{ k: "airport", n: "Somnucor Airport", s: "the terminal, the tower and the runway", fr: 0xC8D0D8, lf: 0x2A4A6A, gl: 0xD8F0FF, sh: "square", tex: "metal", go: function () { var f = wfdFn("aptGo"); return f ? f() : wfdGo("airport"); } },
{ k: "delve", n: "The Saga's Dungeons", s: "the deep places of the story", fr: 0x4A4038, lf: 0x2A2018, gl: 0xFFB060, sh: "pointed", tex: "stone", go: function () { var f = wfdFn("sgaOpen"); if (f) {
f("dungeons");
return true;
} return false; } }
];
var WFD_R = 44;
function wfdHall() { if (typeof hallRealm !== "function")
return null; var r = hallRealm(); if (!r || !r.grid || (store.here || 0) !== r.id)
return null; return r; }
var WFD_FIXED = 28;
function wfdSpots(h) { return __ZC(454, 1, this, arguments, new.target); }
function wfdBuildDoor(D) { return __ZC(454, 2, this, arguments, new.target); }
function wfdBuild(r) { return __ZC(454, 3, this, arguments, new.target); }
function wfdOpen(d) { return __ZC(454, 4, this, arguments, new.target); }
function wfdTick(dt) {
var r = (typeof walkMode !== "undefined" && walkMode && !store.inside && !(typeof WLD !== "undefined" && WLD.on)) ? wfdHall() : null;
if (!r) {
if (WFD.g)
WFD.g.visible = false;
if (WFD.on) {
WFD.on = null;
worldPromptCity(null);
}
return;
}
if (!WFD.built || WFD.hallId !== r.id) {
if (WFD.g) {
scene.remove(WFD.g);
}
WFD.built = false;
wfdBuild(r);
if (!WFD.built)
return;
}
WFD.g.visible = true;
WFD.t += dt;
var P = camera.position, best = null, bd = 1e9;
for (var i = 0; i < WFD.doors.length; i++) {
var d = WFD.doors[i], dd = Math.hypot(P.x - d.x, P.z - d.z);
if (dd < bd) {
bd = dd;
best = d;
}
}
if (best && bd < 3.4) {
if (WFD.on !== best.D.k || !(typeof WCITY !== "undefined" && WCITY.fn)) {
WFD.on = best.D.k;
var d0 = best;
worldPromptCity("🚪 <b>" + esc(best.D.n) + "</b> · <b>press E</b> to go through (" + esc(best.D.s) + ")", function () { wfdOpen(d0); });
}
}
else if (WFD.on) {
WFD.on = null;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
wfdTick(dt);
}
catch (e) {
if (!WFD.e1) {
WFD.e1 = 1;
if (window.console)
console.warn("[world-folk] hall doors", e);
}
} };
})();
(function () {
if (typeof addEventListener !== "function")
return;
addEventListener("pointerup", function (e) {
if (e.pointerType !== "touch" || !WFD.g || !WFD.g.visible || typeof camera === "undefined")
return;
var cv = renderer && renderer.domElement;
if (!cv || e.target !== cv)
return;
var R = cv.getBoundingClientRect(), v = new THREE.Vector2((e.clientX - R.left) / R.width * 2 - 1, -(e.clientY - R.top) / R.height * 2 + 1), rc = new THREE.Raycaster();
rc.setFromCamera(v, camera);
rc.far = 14;
var hit = rc.intersectObject(WFD.g, true)[0];
if (!hit)
return;
var k = hit.object.userData.wfdDoor;
var d = WFD.doors.filter(function (q) { return q.D.k === k; })[0];
if (d)
wfdOpen(d);
});
})();
function wfMat(col, o) { return typeof wdrMat === "function" ? wdrMat(col, o) : new THREE.MeshStandardMaterial({ color: col, roughness: 0.8 }); }
var WF_GEO = {};
function wfGeo(k, mk) { var g = WF_GEO[k]; if (!g) {
g = WF_GEO[k] = mk();
g.userData.shared = true;
} return g; }
function wfMix(a, b, k) { var A = new THREE.Color(a), B = new THREE.Color(b); A.lerp(B, k); return A.getHex(); }
function wfDark(c, k) { return wfMix(c, 0x000000, k || 0.35); }
var WF_HAT = {
cap: function (add, c) { var m = new THREE.Mesh(wfGeo("cap", function () { return new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5); }), wfMat(c, { r: 0.95 })); m.scale.set(1, 0.7, 1.08); add("Head", [0, 0.13, -0.01], m); },
coif: function (add, c) { var m = new THREE.Mesh(wfGeo("coif", function () { return new THREE.SphereGeometry(0.142, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.62); }), wfMat(c, { r: 1 })); m.scale.set(1, 0.95, 1.05); m.rotation.x = -0.25; add("Head", [0, 0.1, -0.02], m); },
hood: function (add, c) { var m = new THREE.Mesh(wfGeo("hood", function () { var g = new THREE.SphereGeometry(0.16, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.66); return g; }), wfMat(c, { r: 1 })); m.scale.set(1, 1.08, 1.15); m.rotation.x = -0.45; add("Head", [0, 0.09, -0.04], m); },
brim: function (add, c) { return __ZC(454, 5, this, arguments, new.target); },
tricorn: function (add, c) { return __ZC(454, 6, this, arguments, new.target); },
tophat: function (add, c) { return __ZC(454, 7, this, arguments, new.target); },
bonnet: function (add, c) { return __ZC(454, 8, this, arguments, new.target); },
wreath: function (add, c) { return __ZC(454, 9, this, arguments, new.target); },
kerchief: function (add, c) { return __ZC(454, 10, this, arguments, new.target); },
helmet: function (add, c) { return __ZC(454, 11, this, arguments, new.target); },
headwrap: function (add, c) { return __ZC(454, 12, this, arguments, new.target); },
nemes: function (add, c) { return __ZC(454, 13, this, arguments, new.target); },
visor: function (add, c) { var m = new THREE.Mesh(wfGeo("visor", function () { return new THREE.SphereGeometry(0.17, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62); }), wfMat(0x8AC8E8, { r: 0.1, m: 0.3 })); m.material.transparent = true; m.material.opacity = 0.35; add("Head", [0, 0.08, 0], m); },
ears: function (add, c, E) {
var skin = (E.spec.look && E.spec.look.skin != null) ? E.spec.look.skin : 0xD8B898;
[-1, 1].forEach(function (s) { var ear = new THREE.Mesh(wfGeo("ear", function () { return new THREE.ConeGeometry(0.026, 0.14, 6); }), wfMat(skin, { r: 0.9 })); ear.rotation.z = s * -1.2; add("Head", [s * 0.1, 0.08, -0.01], ear); });
}
};
var WF_HELD = {
basket: function (add) { var b = new THREE.Mesh(wfGeo("bask", function () { return new THREE.CylinderGeometry(0.13, 0.1, 0.14, 12, 1, true); }), wfMat(0x9A7A4A, { r: 1 })); b.material.side = THREE.DoubleSide; add("hand_l", [0, -0.12, 0.02], b); },
staff: function (add) { var s = new THREE.Mesh(wfGeo("staff", function () { return new THREE.CylinderGeometry(0.018, 0.022, 1.7, 6); }), wfMat(0x6A4A2A)); add("hand_r", [0, -0.1, 0], s); },
spear: function (add) { return __ZC(454, 14, this, arguments, new.target); },
book: function (add) { var b = new THREE.Mesh(wfGeo("book", function () { return new THREE.BoxGeometry(0.16, 0.22, 0.04); }), wfMat(0x6A2A1A)); add("hand_l", [0, -0.06, 0.05], b); },
lantern: function (add) { return __ZC(454, 15, this, arguments, new.target); },
tablet: function (add) { var b = new THREE.Mesh(wfGeo("tab", function () { return new THREE.BoxGeometry(0.16, 0.22, 0.015); }), wfMat(0x1A1E24, { r: 0.3 })); add("hand_l", [0, -0.06, 0.05], b); },
amphora: function (add) { var a = new THREE.Mesh(wfGeo("amph", function () { var p = []; for (var i = 0; i <= 10; i++) {
var t = i / 10;
p.push(new THREE.Vector2(0.02 + 0.08 * Math.sin(Math.PI * t) * (1 - 0.3 * t), t * 0.34));
} return new THREE.LatheGeometry(p, 10); }), wfMat(0xB8603A, { r: 0.9 })); add("hand_l", [0, -0.3, 0.02], a); },
sword: function (add) { return __ZC(454, 16, this, arguments, new.target); },
mug: function (add) { var m = new THREE.Mesh(wfGeo("mug", function () { return new THREE.CylinderGeometry(0.045, 0.04, 0.11, 10); }), wfMat(0x8A6A4A)); add("hand_r", [0, -0.05, 0.04], m); },
fan: function (add) { var m = new THREE.Mesh(wfGeo("fan", function () { return new THREE.CircleGeometry(0.14, 10, 0, Math.PI); }), wfMat(0xF4E8E8, { r: 0.9 })); m.material.side = THREE.DoubleSide; add("hand_r", [0, -0.02, 0.05], m); },
glass: function (add) { var m = new THREE.Mesh(wfGeo("wglass", function () { return new THREE.CylinderGeometry(0.035, 0.012, 0.12, 10); }), wfMat(0xE8F0F8, { r: 0.1 })); m.material.transparent = true; m.material.opacity = 0.5; add("hand_r", [0, -0.02, 0.05], m); }
};
function wfIds(x) { return { ids: x.ids, col: x.col, shoes: x.shoes != null ? x.shoes : 0x2A1E16, back: x.back || null, backColor: x.backColor }; }
function wfPick(arr, r) { return arr[Math.floor(r * arr.length) % arr.length]; }
function wfSkin(L) { return L.skin != null ? L.skin : 0xC89A78; }
function wfBare(x, L, arms, legs) { var ids = []; if (arms) {
ids.push("oz:shirt:long:satin");
x.col.shirt = wfSkin(L);
} if (legs) {
ids.push("oz:stock:satin:thigh");
x.col.stock = wfSkin(L);
} x.ids = ids.concat(x.ids); return x; }
var WF_ERA = {
greek: function (L, o) { return __ZC(454, 17, this, arguments, new.target); },
egypt: function (L, o) { return __ZC(454, 18, this, arguments, new.target); },
medieval: function (L, o) { return __ZC(454, 19, this, arguments, new.target); },
soldier: function (L, o) {
var t = L.top != null ? L.top : 0x5A4A3A;
return wfIds({ ids: ["oz:coat:military:cloth", "oz:trousers:cloth", "oz:boots"], col: { coat: t, trou: wfDark(t, 0.4), belt: 0x2A1E14 }, shoes: 0x2A1E14, back: o.r > 0.5 ? "cape" : null, backColor: L.layerColor != null ? L.layerColor : 0x6A1A1A });
},
renaissance: function (L, o) { return __ZC(454, 20, this, arguments, new.target); },
elizabethan: function (L, o) { return __ZC(454, 21, this, arguments, new.target); },
country: function (L, o) { return __ZC(454, 22, this, arguments, new.target); },
victorian: function (L, o) { return __ZC(454, 23, this, arguments, new.target); },
pirate: function (L, o) { return __ZC(454, 24, this, arguments, new.target); },
wild: function (L, o) {
var t = L.top != null ? L.top : 0x6A5A3A;
return wfIds(wfBare({ ids: ["oz:bodice:cap:cloth", "oz:skirt:knee:0.05:cloth", "oz:sash"], col: { dress: t, skirt: wfDark(t, 0.15), trim: wfDark(t, 0.3), sash: 0x3A2A1A }, shoes: 0x5A4632 }, L, 1, 1));
},
robe: function (L, o) { return __ZC(454, 25, this, arguments, new.target); },
spacer: function (L, o) {
var t = L.top != null ? L.top : 0x2A4A7A, tr = L.layerColor != null ? L.layerColor : 0xE8E8F0;
return wfIds({ ids: ["oz:shirt:long:cloth", "oz:trousers:cloth", "oz:sash", "oz:boots", "oz:collar:low:none"], col: { shirt: t, trou: t, sash: 0x1E1E24, collar: tr }, shoes: 0x1E1E24 });
},
evening: function (L, o) { return __ZC(454, 26, this, arguments, new.target); },
drow: function (L, o) { return __ZC(454, 27, this, arguments, new.target); }
};
var WF_ERA_HATS = { greek: [null, "wreath", null], egypt: ["nemes", null, "headwrap"], medieval: ["coif", "hood", null, "cap"], soldier: ["helmet"], renaissance: ["cap", null, "cap"], elizabethan: ["brim", "cap", null],
country: ["brim", "kerchief", "bonnet", null, "cap"], victorian: ["tophat", "bonnet", "brim", null], pirate: ["tricorn", "kerchief", null], wild: [null], robe: ["hood", null, null], spacer: [null, null, "visor"], evening: [null], drow: [null] };
var WF_ERA_HELD = { greek: ["amphora", "staff", null, null], egypt: ["basket", null, null], medieval: ["basket", "staff", null, "mug"], soldier: ["spear", "sword", "sword"], renaissance: ["book", null, null], elizabethan: ["book", null, "mug"],
country: ["basket", null, "staff", null], victorian: ["book", null, "staff"], pirate: ["sword", "mug", null], wild: ["spear", null], robe: ["book", "lantern", "staff", null], spacer: ["tablet", null, null], evening: ["glass", "fan", null], drow: ["staff", null, "lantern"] };
function wfHashF(s) {
var h = 2166136261;
s = String(s);
for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
}
h ^= h >>> 16;
h = Math.imul(h, 0x85EBCA6B);
h ^= h >>> 13;
h = Math.imul(h, 0xC2B2AE35);
h ^= h >>> 16;
return (h >>> 0) / 4294967296;
}
(function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined")
return;
Object.keys(WF_ERA).forEach(function (era) {
var key = "oz_wf_" + era;
OZ_WEAR[key] = function (L, o) { var r = wfHashF((L._wfSeed || "") + era); return WF_ERA[era](L, { f: o.f, kid: o.kid, r: r }); };
WDR_COST[key] = { rb: 1, ownHead: true, look: { hat: "none", role: "" }, props: function (add, c, E) {
var L = (E.spec && E.spec.look) || {}, seed = L._wfSeed || E.spec.id || "", r1 = wfHashF(seed + "hat"), r2 = wfHashF(seed + "held");
var hat = L._wfHat !== undefined ? L._wfHat : wfPick(WF_ERA_HATS[era] || [null], r1);
if (hat && WF_HAT[hat])
try {
WF_HAT[hat](add, L._wfHatCol != null ? L._wfHatCol : (L.layerColor != null ? wfDark(L.layerColor, 0.2) : 0x4A3A2A), E);
}
catch (e) { }
if (L._wfEars)
try {
WF_HAT.ears(add, null, E);
}
catch (e) { }
var held = L._wfHeld !== undefined ? L._wfHeld : wfPick(WF_ERA_HELD[era] || [null], r2);
if (held && WF_HELD[held])
try {
WF_HELD[held](add);
}
catch (e) { }
} };
});
})();
var WFP = { mats: {} };
function wfpMat(col, tex, o) { return __ZC(454, 28, this, arguments, new.target); }
function wfpM(g, geoKey, mk, mat, x, y, z, ry) { var m = new THREE.Mesh(wfGeo(geoKey, mk), mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; g.add(m); return m; }
function wfpBox(g, w, h, d, mat, x, y, z, ry) { return wfpM(g, "b" + w + "_" + h + "_" + d, function () { return new THREE.BoxGeometry(w, h, d); }, mat, x, y, z, ry); }
function wfpCyl(g, rt, rb, h, mat, x, y, z, seg) { return wfpM(g, "c" + rt + "_" + rb + "_" + h + "_" + (seg || 10), function () { return new THREE.CylinderGeometry(rt, rb, h, seg || 10); }, mat, x, y, z); }
function wfpBall(g, r, mat, x, y, z) { return wfpM(g, "s" + r, function () { return new THREE.SphereGeometry(r, 10, 8); }, mat, x, y, z); }
function wfpGlow(g, col, size, x, y, z) { if (typeof wGlow !== "function")
return; var s = wGlow(col, size, 0.45); s.position.set(x, y, z); g.add(s); }
var WF_PROP = {
stall: function (g, C) { return __ZC(454, 29, this, arguments, new.target); },
barrels: function (g, C) {
var w = wfpMat(C.b || 0x6A4A2A, "wood"), iron = wfpMat(0x2A2A2A);
[[0, 0], [0.7, 0.15], [0.35, 0.6]].forEach(function (p) { wfpCyl(g, 0.32, 0.32, 0.85, w, p[0], 0.42, p[1], 12); wfpCyl(g, 0.335, 0.335, 0.05, iron, p[0], 0.15, p[1], 12); wfpCyl(g, 0.335, 0.335, 0.05, iron, p[0], 0.7, p[1], 12); });
},
crates: function (g, C) {
var w = wfpMat(C.b || 0x9A7A4A, "wood");
wfpBox(g, 0.7, 0.7, 0.7, w, 0, 0.35, 0);
wfpBox(g, 0.6, 0.6, 0.6, w, 0.75, 0.3, 0.1, 0.3);
wfpBox(g, 0.55, 0.55, 0.55, w, 0.2, 1.0, 0.05, 0.5);
},
bench: function (g, C) {
var w = wfpMat(C.b || 0x7A5A3A, "wood");
wfpBox(g, 1.8, 0.07, 0.42, w, 0, 0.46, 0);
wfpBox(g, 1.8, 0.4, 0.06, w, 0, 0.75, -0.2);
[-0.75, 0.75].forEach(function (x) { wfpBox(g, 0.08, 0.46, 0.4, w, x, 0.23, 0); });
},
tablechairs: function (g, C) { return __ZC(454, 30, this, arguments, new.target); },
haybales: function (g, C) { var h = wfpMat(0xD8B860, "thatch"); [[0, 0], [1.1, 0.1], [0.55, 0.05]].forEach(function (p, i) { var b = wfpCyl(g, 0.5, 0.5, 1.0, h, p[0], i === 2 ? 1.4 : 0.5, p[1], 14); b.rotation.z = Math.PI / 2; }); },
cart: function (g, C) { return __ZC(454, 31, this, arguments, new.target); },
amphorae: function (g, C) { return __ZC(454, 32, this, arguments, new.target); },
brazier: function (g, C) { return __ZC(454, 33, this, arguments, new.target); },
campfire: function (g, C) { return __ZC(454, 34, this, arguments, new.target); },
console: function (g, C) {
var m = wfpMat(C.b || 0xC8CCD4, "metal"), scr = wfpMat(C.c || 0x2AA8D8, null, { e: C.c || 0x2AA8D8, ei: 0.8 });
wfpBox(g, 1.4, 0.9, 0.6, m, 0, 0.45, 0);
var s = wfpBox(g, 1.2, 0.5, 0.04, scr, 0, 1.15, -0.12);
s.rotation.x = -0.3;
wfpBox(g, 1.3, 0.06, 0.4, m, 0, 0.92, 0.15).rotation.x = 0.25;
},
planter: function (g, C) {
var p = wfpMat(C.c || 0x8A8A84, "stone"), leaf = wfpMat(0x3A6A2A, "foliage");
wfpBox(g, 1.4, 0.55, 0.6, p, 0, 0.27, 0);
for (var i = 0; i < 4; i++)
wfpBall(g, 0.3, leaf, -0.45 + i * 0.3, 0.7, (i % 2) * 0.1);
wfpBall(g, 0.06, wfpMat(0xE8607A), 0.2, 0.95, 0.15);
wfpBall(g, 0.06, wfpMat(0xF0D060), -0.3, 0.92, 0.1);
},
rack: function (g, C) { return __ZC(454, 35, this, arguments, new.target); },
easel: function (g, C) { return __ZC(454, 36, this, arguments, new.target); },
lamppost: function (g, C) { var iron = wfpMat(0x1E1E22); wfpCyl(g, 0.06, 0.09, 3.2, iron, 0, 1.6, 0, 8); wfpBox(g, 0.36, 0.46, 0.36, wfpMat(C.c || 0xFFE0A0, null, { e: C.c || 0xFFD080, ei: 0.7 }), 0, 3.4, 0); wfpCone0(g, iron); wfpGlow(g, C.c || 0xFFD890, 2.4, 0, 3.4, 0); },
banner: function (g, C) { var w = wfpMat(0x5A3A22, "wood"); wfpCyl(g, 0.05, 0.05, 4.2, w, 0, 2.1, 0, 6); var f = wfpBox(g, 1.0, 1.6, 0.03, wfpMat(C.a || 0x8A1A2A), 0.55, 3.3, 0); wfpBox(g, 1.1, 0.05, 0.05, w, 0.55, 4.1, 0); },
pumpkins: function (g, C) { var o = wfpMat(0xE07A1A, null), st = wfpMat(0x4A6A2A); [[0, 0, 0.32], [0.55, 0.2, 0.24], [-0.4, 0.3, 0.2], [0.2, -0.45, 0.27]].forEach(function (p) { var b = wfpBall(g, p[2], o, p[0], p[2] * 0.8, p[1]); b.scale.y = 0.78; wfpCyl(g, 0.03, 0.03, 0.12, st, p[0], p[2] * 1.45, p[1], 6); }); },
luggage: function (g, C) { [[0, 0, 0x2A3A5A], [0.55, 0.1, 0x8A2A2A], [0.25, -0.45, 0x3A3A3A]].forEach(function (p) { wfpBox(g, 0.45, 0.65, 0.25, wfpMat(p[2]), p[0], 0.33, p[1]); wfpBox(g, 0.2, 0.04, 0.04, wfpMat(0x1A1A1A), p[0], 0.7, p[1]); }); },
presents: function (g, C) { [[0, 0, 0.6, 0xC8202A], [0.7, 0.1, 0.45, 0x2A7A3A], [0.3, -0.55, 0.4, 0xE8C040], [-0.5, 0.3, 0.35, 0x2A5AA8]].forEach(function (p) { wfpBox(g, p[2], p[2], p[2], wfpMat(p[3]), p[0], p[2] / 2, p[1]); wfpBox(g, p[2] + 0.02, p[2] + 0.02, 0.06, wfpMat(0xF4F0E8), p[0], p[2] / 2, p[1]); }); }
};
function wfpCone0(g, iron) { wfpM(g, "lampcap", function () { return new THREE.ConeGeometry(0.3, 0.25, 4); }, iron, 0, 3.75, 0).rotation.y = Math.PI / 4; }
function wfProp(kind, C) { var f = WF_PROP[kind]; if (!f)
return null; var g = new THREE.Group(); try {
f(g, C || {});
}
catch (e) {
return null;
} g.userData.wfProp = kind; return g; }
var WF_SKIP = {
kidszone: "rebuilt in its own thread (the Kids Zone overhaul)", heavens: "rebuilt in its own thread (the Heavens)", oz: "the Oz books have their own thread", neverland: "the Peter and Wendy book is played there in its own thread",
otmoonstair: "the stairway is rebuilt in its own thread", otdeep: "the highway down is rebuilt in its own thread", space: "open space: no ground to stand on",
sim: "the Studio builds each scene from what you say, its people with it", outbreak: "a contained drill: who is there is the drill", thefall: "a survival story: its few are the story",
delve: "a dungeon run: its foes are the run", mmin: "the inside of a machine you ride"
};
var WF_P = {
earth: [[0x7A5A3A, 0xE8E0CC], [0x5A6A3A, 0xD8CCB0], [0x8A3A2A, 0xE8DCC4], [0x4A5A7A, 0xE0D8C8], [0x6A4A5A, 0xE8E0D0], [0xA8784A, 0xF0E8D8], [0x3A4A3A, 0xC8B898]],
greek: [[0xF0E8D8, 0xB8603A], [0xE8DCC4, 0x2A5A8A], [0xF4F0E4, 0x8A2A2A], [0xD8C8A8, 0x3A6A3A], [0xE8E0D0, 0x6A3A7A], [0xC8B898, 0xB8903A]],
rich: [[0x8A1A2A, 0xD8B048], [0x1E3A6A, 0xE8D8A0], [0x2A5A3A, 0xD8B048], [0x5A2A6A, 0xE8D8A0], [0x6A4A1A, 0xF0E0B0], [0x1A1A22, 0xC8C8D0]],
dark: [[0x2A2440, 0xB8B8D0], [0x1E1A2A, 0x8A6AB8], [0x3A2A4A, 0xC8B8E8], [0x14141C, 0x6A5AA8]],
space: [[0x2A4A7A, 0xE8E8F0], [0xE8E8EC, 0x2A4A7A], [0xD86A2A, 0x1E1E24], [0x3A6A5A, 0xE8E8F0], [0x5A5A64, 0xE8C040], [0x8A2A2A, 0xE8E8F0]],
winter: [[0x2A5A8A, 0xF4F4F8], [0x8A1A2A, 0xF4F0E8], [0x2A6A3A, 0xF4F0E8], [0x6A5A4A, 0xE8E0D0]],
soldier: [[0x5A4A3A, 0x6A1A1A], [0x4A4A3A, 0x1E3A6A], [0x3A3A34, 0x6A5A1A], [0x6A5A44, 0x2A2A2A]],
evening: [[0x141418, 0x8A1A3A], [0x1A1A2A, 0x1E3A6A], [0x141418, 0x2A6A4A], [0x2A2A30, 0xC8A040], [0x141418, 0x6A2A8A]],
pirate: [[0xE8E0CC, 0x6A1A1A], [0xD8CCB0, 0x1E2A44], [0xE8E4D8, 0x2A4A2A], [0xC8B898, 0x4A2A1A]],
wild: [[0x6A5A3A, 0x3A2A1A], [0x5A6A3A, 0x3A2A1A], [0x7A6A4A, 0x4A3A2A]],
ghost: [[0xC8C8C4, 0x8A8A88], [0xB8BCC0, 0x6A6A70], [0xD8D4CC, 0x9A9690]],
sand: [[0xE8D8B0, 0x8A3A2A], [0xD8C090, 0x2A5A8A], [0xF0E4C8, 0x6A3A2A], [0xC8A878, 0x2A6A5A]]
};
function wfLand(pal, extra) { return { who: [{ era: "robe", w: 70, f: 0.5, pal: pal }, { era: extra || "medieval", w: 30, f: 0.5, pal: pal }], props: ["stall", "bench", "planter", "brazier", "banner"], C: { a: pal[0][1], c: pal[0][0] } }; }
var WF_W = {
surface: { who: [{ era: "spacer", w: 100, f: 0.45, pal: WF_P.space }], props: ["crates", "console", "crates", "luggage"], C: { b: 0xC8CCD4, c: 0x2AA8D8 }, n: 0.7 },
station: { who: [{ era: "spacer", w: 75, f: 0.45, pal: WF_P.space }, { title: "passenger", w: 25, f: 0.5 }], props: ["console", "bench", "planter", "luggage"], C: { b: 0xC8CCD4, c: 0x6AD8F0 } },
shuttle: { who: [{ title: "passenger", w: 80, f: 0.5 }, { era: "spacer", w: 20, f: 0.4, pal: WF_P.space }], props: ["luggage"], n: 0.3 },
casino: { who: [{ era: "evening", w: 85, f: 0.5, pal: WF_P.evening }, { title: "croupier", w: 15, f: 0.4 }], props: ["tablechairs", "planter", "tablechairs"], C: { a: 0xF4F0E8, b: 0x3A2418, c: 0x8A8A84 } },
neverland: { who: [{ era: "pirate", w: 55, f: 0.1, pal: WF_P.pirate }, { era: "wild", w: 45, f: 0.2, kid: 1, pal: WF_P.wild }], props: ["barrels", "crates", "campfire", "barrels"], C: { b: 0x6A4A2A }, minY: -1.0 },
sea: { who: [{ era: "greek", w: 100, f: 0.45, kid: 0.12, pal: WF_P.greek }], props: ["amphorae", "stall", "barrels", "bench", "amphorae"], C: { a: 0x2A5A8A, b: 0x8A6A44, c: 0xB8603A }, minY: -0.9 },
underdark: { who: [{ era: "drow", w: 70, f: 0.5, pal: WF_P.dark, ears: 1 }, { era: "medieval", w: 30, f: 0.4, pal: WF_P.earth, scale: 0.74, hat: "cap" }], props: ["stall", "brazier", "crates", "barrels"], C: { a: 0x4A2A6A, b: 0x3A2A22 } },
northpole: { who: [{ seed: "elf_", w: 60, f: 0.5 }, { era: "country", w: 40, f: 0.5, kid: 0.15, pal: WF_P.winter }], props: ["presents", "bench", "lamppost", "presents"], C: { b: 0x7A5A3A, c: 0xFFE0A0 } },
party: { who: [{ title: "party guest", w: 60, f: 0.5 }, { title: "dancer", w: 20, f: 0.6 }, { title: "musician", w: 20, f: 0.4 }], props: ["tablechairs", "banner", "planter", "stall"], C: { a: 0xE84AA8, b: 0x5A3A22 } },
battle: { who: [{ era: "soldier", w: 70, f: 0.15, pal: WF_P.soldier }, { era: "medieval", w: 30, f: 0.4, pal: WF_P.earth }], props: ["rack", "campfire", "crates", "barrels", "banner"], C: { a: 0x6A1A1A, b: 0x5A3A22 } },
greenwold: { who: [{ era: "country", w: 100, f: 0.5, kid: 0.15, pal: WF_P.earth }], props: ["haybales", "cart", "barrels", "bench"], C: { b: 0x7A5A3A } },
lounge: { who: [{ era: "evening", w: 45, f: 0.6, pal: WF_P.evening }, { title: "resort guest", w: 55, f: 0.55 }], props: ["tablechairs", "planter", "bench"], C: { a: 0xF4F0E8, b: 0x5A3A22 } },
family: { who: [{ title: "neighbour", w: 60, f: 0.55, kid: 0.2 }, { title: "wedding guest", w: 40, f: 0.55 }], props: ["bench", "planter", "tablechairs"], C: { b: 0x7A5A3A } },
race: { who: [{ title: "pit crew", w: 35, f: 0.3 }, { title: "race fan", w: 50, f: 0.45 }, { title: "track marshal", w: 15, f: 0.3 }], props: ["crates", "bench", "barrels", "banner"], C: { a: 0xE8C020, b: 0x3A3A3A } },
maze: { who: [{ era: "greek", w: 100, f: 0.4, pal: WF_P.greek }], props: ["amphorae", "brazier"], C: { c: 0xB8603A }, n: 0.5 },
ctale: { who: [{ era: "country", w: 60, f: 0.5, kid: 0.15, pal: WF_P.earth }, { era: "medieval", w: 40, f: 0.5, pal: WF_P.earth }], props: ["stall", "cart", "barrels", "bench"], C: { a: 0xB83A2A, b: 0x7A5A3A } },
davinci: { who: [{ era: "renaissance", w: 100, f: 0.45, kid: 0.1, pal: WF_P.rich }], props: ["easel", "stall", "barrels", "bench", "cart"], C: { a: 0xC8603A, b: 0x7A5232 } },
bard: { who: [{ era: "elizabethan", w: 100, f: 0.45, kid: 0.1, pal: WF_P.rich.concat(WF_P.earth) }], props: ["stall", "barrels", "bench", "cart"], C: { a: 0x8A1A2A, b: 0x4A3424 } },
guildlands: { who: [{ era: "medieval", w: 80, f: 0.45, pal: WF_P.earth }, { era: "renaissance", w: 20, f: 0.4, pal: WF_P.rich }], props: ["stall", "crates", "barrels", "cart", "bench"], C: { a: 0x2A5A8A, b: 0x6A4A2A } },
verne: { who: [{ era: "victorian", w: 100, f: 0.45, kid: 0.1, pal: WF_P.rich }], props: ["crates", "barrels", "bench", "lamppost"], C: { b: 0x6A4426, c: 0xFFD890 } },
samhain: { who: [{ era: "country", w: 70, f: 0.5, kid: 0.15, pal: WF_P.earth, back: "cloak" }, { era: "robe", w: 30, f: 0.6, pal: WF_P.dark }], props: ["pumpkins", "stall", "haybales", "brazier"], C: { a: 0x5A2A6A, b: 0x5A3A22 } },
grimm: { who: [{ era: "country", w: 100, f: 0.5, kid: 0.15, pal: WF_P.earth }], props: ["cart", "haybales", "barrels", "stall"], C: { a: 0x8A3A2A, b: 0x6A4A2A } },
erebos: { who: [{ era: "robe", w: 80, f: 0.5, pal: WF_P.ghost }, { era: "greek", w: 20, f: 0.4, pal: WF_P.ghost }], props: ["brazier", "amphorae"], C: { c: 0x6A6A66 }, n: 0.6 },
tower: { who: [{ title: "scientist", w: 50, f: 0.5 }, { title: "lab technician", w: 30, f: 0.5 }, { title: "researcher", w: 20, f: 0.5 }], props: ["console", "tablechairs", "planter"], C: { b: 0xD8DCE4, c: 0x2AD8B8 }, n: 0.6 },
otemple: { who: [{ era: "robe", w: 100, f: 0.55, pal: WF_P.dark }], props: ["brazier", "bench", "planter"], C: { c: 0x3A3442 }, n: 0.7 },
wonders: { minY: -1, who: [{ era: "egypt", w: 35, f: 0.45, pal: WF_P.sand }, { era: "greek", w: 40, f: 0.45, kid: 0.1, pal: WF_P.greek }, { era: "robe", w: 25, f: 0.45, pal: WF_P.sand, hat: "headwrap" }], props: ["amphorae", "stall", "brazier", "bench"], C: { a: 0x2A5A8A, b: 0x8A6A44, c: 0xB8903A } },
sports: { who: [{ title: "sports fan", w: 60, f: 0.45, kid: 0.15 }, { title: "coach", w: 10, f: 0.3 }, { title: "athlete", w: 20, f: 0.45 }, { title: "food vendor", w: 10, f: 0.5 }], props: ["bench", "stall", "banner"], C: { a: 0x2A5AA8, b: 0x5A3A22 } },
storms: { who: [{ title: "storm chaser", w: 50, f: 0.4 }, { title: "farmer", w: 35, f: 0.4 }, { title: "meteorologist", w: 15, f: 0.5 }], props: ["crates", "haybales", "cart"], C: { b: 0x7A5A3A } },
airport: { who: [{ title: "traveller", w: 65, f: 0.5, kid: 0.1 }, { title: "pilot", w: 10, f: 0.3 }, { title: "flight attendant", w: 10, f: 0.6 }, { title: "ground crew", w: 15, f: 0.3 }], props: ["bench", "luggage", "planter"], C: { b: 0x8A8A90 } },
stillwater: { who: [{ title: "villager", w: 70, f: 0.55, kid: 0.1 }, { title: "gardener", w: 30, f: 0.5 }], props: ["bench", "planter", "cart"], C: { b: 0x7A5A3A }, n: 0.7 },
guild: { who: [{ era: "medieval", w: 100, f: 0.45, pal: WF_P.earth }], props: ["crates", "barrels", "bench", "stall"], C: { b: 0x6A4A2A }, n: 0.6 }
};
(function () {
var sp = { who: [{ era: "spacer", w: 65, f: 0.5, pal: WF_P.space }, { era: "robe", w: 35, f: 0.5, pal: WF_P.space }], props: ["console", "planter", "bench", "stall"], C: { b: 0xC8CCD4, c: 0x6AD8F0 } };
["moon", "mars", "mercury", "venus", "pluto", "jupiter", "saturn", "uranus", "neptune", "veyar", "future"].forEach(function (k) { WF_W["gr_" + k] = sp; });
WF_W.gr_neverland = WF_W.neverland;
delete WF_W.neverland;
WF_W.gr_sea = WF_W.sea;
WF_W.gr_northpole = WF_W.northpole;
WF_W.gr_battle = WF_W.battle;
WF_W.gr_greenwold = WF_W.greenwold;
WF_W.gr_underworld = wfLand([[0x6A1A14, 0xE8A040], [0x3A1410, 0xC8603A], [0x2A2420, 0xB83A2A]]);
WF_W.gr_heavens = wfLand([[0xF4F0E4, 0xD8B048], [0xE8ECF4, 0xC8A848], [0xFAF6EC, 0x8AB8E8]], "greek");
WF_W.gr_depths = wfLand([[0x2A6A6A, 0xC8E8E0], [0x1E4A5A, 0xE8D8A0], [0x3A7A6A, 0xF0E8D0]]);
WF_W.gr_faerie = wfLand([[0x3A6A2A, 0xE8C8F0], [0x5A8A3A, 0xF0E0A0], [0x2A5A4A, 0xD8A8E8]], "renaissance");
WF_W.gr_faerie.who[0].ears = 1;
WF_W.gr_faerie.who[1].ears = 1;
WF_W.gr_void = wfLand([[0x14121C, 0x8A6AE8], [0x1E1A2A, 0xC8B8FF], [0x0E0E14, 0x6A5AB8]]);
WF_W.gr_mirror = wfLand([[0xC8CCD4, 0x6A7A9A], [0xB8BCC8, 0x3A4A6A], [0xE0E4EC, 0x8A8AA8]], "renaissance");
WF_W.gr_dead = wfLand(WF_P.ghost);
WF_W.gr_frozen = wfLand([[0x2A5A8A, 0xF4F4F8], [0xE8F0F8, 0x3A6A9A], [0x3A4A6A, 0xD8E8F4]]);
WF_W.gr_elsewhere = wfLand(WF_P.rich, "renaissance");
WF_W.gr_fire = wfLand([[0xC84A1A, 0xF0C040], [0x8A2A10, 0xE89A30], [0x3A1A10, 0xE86A20]]);
WF_W.gr_stars = wfLand([[0x1A2A5A, 0xE8D080], [0x141E44, 0xC8D8F8], [0x2A2A6A, 0xF0E0A0]]);
WF_W.gr_wasteland = wfLand([[0x6A5A44, 0x3A3024], [0x5A4A3A, 0x8A3A2A], [0x7A6A54, 0x2A2A2A]], "medieval");
WF_W.gr_desert = wfLand(WF_P.sand);
WF_W.gr_desert.who[0].hat = "headwrap";
WF_W.gr_mirror.props = ["planter", "bench", "lamppost", "stall"];
["artisans", "smiths", "merchants", "healers", "scribes", "bards", "mariners"].forEach(function (k) { WF_W["gld_" + k] = WF_W.guild; });
WF_W.gld_merchants = { who: [{ era: "renaissance", w: 60, f: 0.45, pal: WF_P.rich }, { era: "medieval", w: 40, f: 0.45, pal: WF_P.earth }], props: ["stall", "crates", "barrels"], C: { a: 0x2A5A8A, b: 0x6A4A2A }, n: 0.6 };
WF_W.gld_healers = { who: [{ era: "robe", w: 70, f: 0.6, pal: [[0xE8E4DC, 0x3A6A3A], [0xD8E0D0, 0x6A3A2A]] }, { era: "medieval", w: 30, f: 0.5, pal: WF_P.earth }], props: ["bench", "planter", "crates"], C: { b: 0x8A6A44 }, n: 0.6 };
WF_W.gld_scribes = { who: [{ era: "robe", w: 80, f: 0.45, pal: WF_P.rich }, { era: "medieval", w: 20, f: 0.45, pal: WF_P.earth }], props: ["bench", "crates"], C: { b: 0x5A3A22 }, n: 0.6 };
WF_W.gld_bards = { who: [{ era: "elizabethan", w: 100, f: 0.5, pal: WF_P.rich }], props: ["bench", "barrels", "banner"], C: { a: 0x8A1A2A, b: 0x4A3424 }, n: 0.6 };
WF_W.gld_mariners = { who: [{ era: "pirate", w: 70, f: 0.2, pal: WF_P.pirate }, { era: "country", w: 30, f: 0.4, pal: WF_P.earth }], props: ["barrels", "crates"], C: { b: 0x6A4A2A }, n: 0.6 };
WF_W.gld_thieves = { who: [{ era: "medieval", w: 100, f: 0.4, pal: WF_P.dark, hat: "hood" }], props: ["crates", "barrels", "bench"], C: { b: 0x3A2A1E }, n: 0.5 };
WF_W.gld_smugglers = { who: [{ era: "pirate", w: 60, f: 0.3, pal: WF_P.pirate }, { era: "medieval", w: 40, f: 0.4, pal: WF_P.dark, hat: "hood" }], props: ["crates", "barrels"], C: { b: 0x3A2A1E }, n: 0.5 };
WF_W.gld_spider = { who: [{ era: "drow", w: 100, f: 0.5, pal: WF_P.dark, ears: 1 }], props: ["brazier", "crates"], C: { b: 0x2A2026 }, n: 0.5 };
})();
var WF = { st: {}, t: 0, lite: false, off: false, warn: 0 };
function wfLite() { return typeof LITE !== "undefined" && !!LITE; }
function wfLimits() { var L = wfLite(); return { groups: L ? 6 : 16, see: L ? 62 : 120, pop: L ? 46 : 64, reach: L ? 150 : 230, per: L ? 2 : 3 }; }
function wfRecipe(key) { if (WF_SKIP[key])
return null; return WF_W[key] || null; }
function wfMineUp(o) { for (var p = o; p; p = p.parent) {
if (p.userData && p.userData.wfMine)
return true;
} return false; }
function wfIsOurs(o) { for (var p = o; p; p = p.parent) {
if (p.userData && (p.userData.wfMine || p.userData.wSeed !== undefined || p.userData.hdfRoot))
return true;
} return false; }
function wfScan(W, R) { return __ZC(454, 37, this, arguments, new.target); }
function wfGround(W, x, z, feet) { var y; try {
y = (W.key === "sea" && typeof seaHeight === "function") ? seaHeight(x, z) : W.ground ? W.ground(x, z, feet) : 0;
}
catch (e) {
return null;
} return (y == null || !isFinite(y)) ? null : y; }
function wfOkAt(W, R, x, z, feet, wide) { return __ZC(454, 38, this, arguments, new.target); }
function wfStand(W, R, cx, cz, ymin, people) { return __ZC(454, 39, this, arguments, new.target); }
function wfWho(R, r) { var tot = 0; R.who.forEach(function (w) { tot += w.w; }); var t = r * tot; for (var i = 0; i < R.who.length; i++) {
t -= R.who[i].w;
if (t <= 0)
return R.who[i];
} return R.who[0]; }
var WF_KIT_HAT = { hood: "hood", brim: "brimmed", cap: "cap", helmet: "helmet", tophat: "tophat", tricorn: "brimmed", bonnet: "hood", kerchief: "bandana", coif: "hood", headwrap: "hood", nemes: "hood" };
function wfPerson(key, R, n) { return __ZC(454, 40, this, arguments, new.target); }
function wfMakeGroup(S, i) { return __ZC(454, 41, this, arguments, new.target); }
function wfPlace(S, G, spot) { return __ZC(454, 42, this, arguments, new.target); }
function wfState(W) { return __ZC(454, 43, this, arguments, new.target); }
function wfSig(W) { var n = 0; W.g.children.forEach(function (o) { if (!(o.userData && o.userData.wfMine))
n++; }); return n; }
function wfAssign(S) { return __ZC(454, 44, this, arguments, new.target); }
function wfTickGroups(S, dt) { return __ZC(454, 45, this, arguments, new.target); }
function wfTick(dt) {
if (WF.off || typeof WLD === "undefined" || !WLD.on || !WLD.w || !WLD.w.g)
return;
var W = WLD.w, S = wfState(W);
if (!S)
return;
var now = performance.now();
if (S.spots && now > S.sigAt) {
S.sigAt = now + 5000;
var sg = wfSig(W);
if (sg - S.sig >= Math.max(8, S.sig * 0.15) && S.rescans < 4) {
S.rescans++;
S.spots = null;
S.scanAt = now + 1500;
}
}
if (!S.spots) {
if (now < S.scanAt) {
wfTickGroups(S, dt);
return;
}
var sc = wfScan(W, S.R);
S.spots = sc.spots;
S.scan = sc;
S.sig = wfSig(W);
S.sigAt = now + 5000;
S.firstUntil = now + 15000;
S.assignAt = 0;
}
if (!S.spots.length)
return;
S.assignAt -= dt;
if (S.assignAt <= 0) {
S.assignAt = S.groups.length < Math.round(wfLimits().groups * (S.R.n || 1)) ? 0 : 1.0;
wfAssign(S);
}
wfTickGroups(S, dt);
}
(function () {
if (typeof worldLetGo === "function") {
var lg = worldLetGo;
worldLetGo = function (key) { var r = lg.apply(this, arguments); if (r && WF.st[key])
delete WF.st[key]; return r; };
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
wfTick(dt);
}
catch (e) {
if (WF.warn++ < 3 && window.console)
console.warn("[world-folk]", e);
} };
}
})();
