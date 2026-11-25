/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DP_WOODS = { tree: 1, pine: 1, deadtree: 1, palm: 1 };
function dpIsWoods(of, n, opts) {
if (!of || !of.length || (opts && (opts.grid || opts.at || opts.lift)))
return false;
if (!DP_WOODS[of[0][0]])
return false;
return (n | 0) >= 150;
}
function fieldBlockers(spec) { return __ZC(155, 0, this, arguments, new.target); }
function dpRingWoods(spec) { return __ZC(155, 1, this, arguments, new.target); }
(function () {
if (typeof makeField !== "function")
return;
var mk = makeField;
makeField = function (label, of, n, r, opts) {
var woods = dpIsWoods(of, n, opts);
var spec = mk.apply(this, arguments);
if (!spec || !woods || !spec.field)
return spec;
try {
var F = spec.field;
if (!F.n0) {
F.n0 = F.n;
F.width = F.r;
}
F.hole = F.hole || 1;
dpRingWoods(spec);
if (typeof refresh === "function")
refresh(spec);
if (typeof save === "function")
save();
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
return spec;
};
function refit() {
try {
var here = store.here || 0;
store.objects.forEach(function (o) {
if (o.archetype !== "field" || (o.realm || 0) !== here || !o.field || !o.field.hole)
return;
var was = [o.x, o.z, o.field.hole].join(",");
dpRingWoods(o);
if ([o.x, o.z, o.field.hole].join(",") !== was || !o.dpFit) {
o.dpFit = 1;
if (typeof refresh === "function")
refresh(o);
}
});
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
}
if (typeof reconcile === "function") {
var rc = reconcile;
reconcile = function () { var r = rc.apply(this, arguments); refit(); dpStreets(); return r; };
}
if (typeof scanText === "function") {
var st = scanText;
scanText = function () { var r = st.apply(this, arguments); refit(); dpStreets(); return r; };
}
})();
var DP_URBAN = { apartment: 1, skyscraper: 1, hotel: 1, hospital: 1, bank: 1, station: 1, warehouse: 1, factory: 1,
streetlight: 1, trafficlight: 1, car: 1, bus: 1, gasstation: 1, parking: 1, busstop: 1, wreckedcar: 1, collapsedtower: 1,
hovercar: 1, tenementblock: 1, sportscar: 1, taxicab: 1, subwayentrance: 1, neonsign: 1, controltower: 1, watertower: 1,
office: 1, mall: 1, policestation: 1, firestation: 1, supermarket: 1, diner: 1, stadium: 1, airport: 1, motel: 1 };
function dpLandKind() { return __ZC(155, 2, this, arguments, new.target); }
var DP_LANE = { village: { tex: "paving", col: 0x9A9488 }, wild: { tex: "earth", col: 0xA08A6A } };
var dpLaneMats = {};
function dpLaneMat(kind) {
if (dpLaneMats[kind])
return dpLaneMats[kind];
var L = DP_LANE[kind], t = (typeof landOpt === "function" && landOpt("detail") && typeof texOf === "function") ? texOf(L.tex) : null;
return (dpLaneMats[kind] = new THREE.MeshLambertMaterial({ color: t ? L.col : (kind === "wild" ? 0x7A6448 : 0x7E7A72), map: t || null }));
}
function dpStreets() { return __ZC(155, 3, this, arguments, new.target); }
(function () {
if (typeof drawStreet !== "function")
return;
var ds = drawStreet;
drawStreet = function () { var r = ds.apply(this, arguments); dpStreets(); return r; };
})();
(function () {
if (typeof THREE === "undefined" || !THREE.InstancedMesh || (typeof LOOK_OFF !== "undefined" && LOOK_OFF))
return;
var P = THREE.InstancedMesh.prototype;
if (P.__dpLin)
return;
P.__dpLin = 1;
var set = P.setColorAt, get = P.getColorAt, tmp = new THREE.Color();
P.setColorAt = function (i, c) { tmp.copy(c).convertSRGBToLinear(); return set.call(this, i, tmp); };
if (get)
P.getColorAt = function (i, c) { get.call(this, i, c); c.convertLinearToSRGB(); return c; };
})();
var DP_LEAFY = { tree: 1, pine: 1, palm: 1, bush: 1, deadtree: 1, hedge: 1, shrub: 1 };
(function () {
if (typeof modelSwap !== "function")
return;
var ms = modelSwap;
modelSwap = function (g, spec) {
var r = ms.apply(this, arguments);
try {
if (!spec || !DP_LEAFY[spec.archetype] || typeof natureColor !== "function")
return r;
var root = g && g.getObjectByName && g.getObjectByName("model");
if (!root || root.userData.dpSeason)
return r;
root.userData.dpSeason = 1;
var leaf = new THREE.Color(natureColor(spec)), bark = new THREE.Color(spec.archetype === "deadtree" ? 0x5A5048 : 0x6A4E38);
if (typeof LOOK_OFF === "undefined" || !LOOK_OFF) {
leaf.convertSRGBToLinear();
bark.convertSRGBToLinear();
}
var done = {};
root.traverse(function (m) {
if (!m.isMesh || !m.material)
return;
var one = function (x) {
var nm = String(x.name || "");
var want = /leaf|leaves|green|grass|foliage|needle|frond/i.test(nm) ? leaf : (/wood|bark|trunk|branch/i.test(nm) ? bark : null);
if (!want || !x.color)
return x;
if (done[x.uuid])
return done[x.uuid];
var n = x.clone();
n.color.copy(want);
if (/dark/i.test(nm))
n.color.multiplyScalar(0.7);
return (done[x.uuid] = n);
};
m.material = Array.isArray(m.material) ? m.material.map(one) : one(m.material);
});
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
return r;
};
})();
function dpWordColour(spec) { return __ZC(155, 4, this, arguments, new.target); }
function dpRecolour(root, col) { return __ZC(155, 5, this, arguments, new.target); }
var DP_REST = /\b(sleep|sleeping|asleep|slept|resting|rested|lying|lay|curled|napping|dozing|snoozing|sitting|sat|guarding|perched|walking|walked|crawling|crept)\b/;
function dpDragonGround(chunk, had) { return __ZC(155, 6, this, arguments, new.target); }
var DP_SMALL = /\b(small|little|tiny|baby|young|wee|miniature|pocket|pet)\b/, DP_BIG = /\b(huge|giant|enormous|colossal|massive|great|vast|gigantic)\b/;
function dpDragonSize() { return __ZC(155, 7, this, arguments, new.target); }
(function () {
if (typeof modelSwap === "function") {
var msw = modelSwap;
modelSwap = function (g, spec) {
var r = msw.apply(this, arguments);
try {
if (spec && spec.archetype === "dragon" && spec.attrs && spec.attrs.c !== undefined) {
var root = g.getObjectByName && g.getObjectByName("model");
if (root && !root.userData.dpCol) {
root.userData.dpCol = 1;
dpRecolour(root, spec.attrs.c);
}
}
}
catch (e) { }
return r;
};
}
if (typeof scanText === "function") {
var st2 = scanText;
scanText = function (chunk) {
var had = {};
try {
store.objects.forEach(function (o) { had[o.id] = 1; });
}
catch (e) { }
var r = st2.apply(this, arguments);
dpDragonGround(String(chunk || ""), had);
dpDragonSize();
return r;
};
}
if (typeof reconcile === "function") {
var rc2 = reconcile;
reconcile = function () { var r = rc2.apply(this, arguments); dpDragonSize(); return r; };
}
if (typeof hdfPlan === "function") {
var hp = hdfPlan;
hdfPlan = function (spec) {
var p = hp.apply(this, arguments);
try {
if (p && p.type === "own" && !p.ghost && p.set !== "mini") {
var c = dpWordColour(spec);
if (c !== null && c !== undefined) {
p.dpCol = c;
p.key += ":c" + c;
}
}
}
catch (e) { }
return p;
};
}
if (typeof hdfAssemble === "function") {
var ha = hdfAssemble;
hdfAssemble = function (plan) {
var r = ha.apply(this, arguments);
try {
if (r && r.root && plan && plan.dpCol !== undefined)
dpRecolour(r.root, plan.dpCol);
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
return r;
};
}
if (typeof lexFind === "function") {
var lf = lexFind;
lexFind = function (w) {
var low = String(w || "").toLowerCase().trim();
var got = lf.apply(this, arguments);
if (got && /\s(dragon|dragons|unicorn|unicorns|phoenix|griffin|griffins|gryphon)$/.test(low) && !/komodo/.test(low)) {
var last = low.split(/\s+/).pop().replace(/s$/, "");
if (last === "gryphon")
last = "griffin";
var gk = KIT[got];
if (KIT[last] && got !== last && (!gk || gk.cat === "nature" || got === "snake" || got === "flowers" || got === "human"))
return last;
}
return got;
};
}
})();
var DP_SEA_WORDS = /\b(beach(?:es)?|seashore|seaside|sea ?front|shore(?:line)?|the coast|coastline|coastal|by the sea|the ocean|an ocean|the sea|out at sea|harbou?r|the bay|a bay|cove|lagoon|desert island|tropical island|an island)\b/;
var DP_UNDER = /\b(under the sea|beneath the sea|under the water|underwater|bottom of the (?:sea|ocean)|sea floor|ocean floor)\b/;
var DP_AFLOAT = { boat: 1, ship: 1, fishingboat: 1, soulferry: 1, shipwreck: 1, wreckedship: 1, submarine: 1, whale: 1, dolphin: 1 };
var DP_SHORE_LINE = { lighthouse: 1, pier: 1 };
if (typeof A === "function" && !KIT.shore)
A("shore", "nature", [10, 0.1, 10], [{ g: "box", s: [0.01, 0.01, 0.01], p: [0, 0, 0], c: "nature" }]);
if (typeof DREAM_GROUND !== "undefined")
DREAM_GROUND.shore = 1;
function dpShoreHere() { var here = store.here || 0; return store.objects.filter(function (o) { return o.archetype === "shore" && (o.realm || 0) === here; })[0] || null; }
function dpShoreFrame(S) {
var dx = Math.cos(S.shore.dir), dz = Math.sin(S.shore.dir);
return { dx: dx, dz: dz,
along: function (o) { return (o.x - S.x) * dx + (o.z - S.z) * dz; }, side: function (o) { return -(o.x - S.x) * dz + (o.z - S.z) * dx; },
at: function (a, s) { return { x: S.x + dx * a - dz * s, z: S.z + dz * a + dx * s }; } };
}
function dpMakeShore() { return __ZC(155, 8, this, arguments, new.target); }
function dpSettleShore(S) { return __ZC(155, 9, this, arguments, new.target); }
function buildShore(spec) { return __ZC(155, 10, this, arguments, new.target); }
(function () {
if (typeof build === "function") {
var b1 = build;
build = function (spec) { if (spec && spec.archetype === "shore" && spec.shore)
return buildShore(spec); return b1.apply(this, arguments); };
}
if (typeof flatZones === "function") {
var fz1 = flatZones;
flatZones = function () {
var z = fz1.apply(this, arguments);
try {
store.objects.forEach(function (S) {
if (S.archetype !== "shore" || !S.shore || (S.realm || 0) !== 0)
return;
var F = dpShoreFrame(S), s0 = S.shore.s0, p;
z.push([S.x, S.z, S.shore.r + 10]);
for (var l = -1500; l <= 1500; l += 150) {
p = F.at(s0 + 150, l);
z.push([p.x, p.z, 150]);
}
for (var l2 = -2100; l2 <= 2100; l2 += 700) {
p = F.at(s0 + 300 + 700, l2);
z.push([p.x, p.z, 700]);
}
});
}
catch (e) { }
return z;
};
}
if (typeof landSignature === "function") {
var ls = landSignature;
landSignature = function () { var s = ls.apply(this, arguments); try {
var S = dpShoreHere();
if (S)
s += "|sea" + Math.round(S.x) + "," + Math.round(S.z) + "," + Math.round(S.shore.dir * 100);
}
catch (e) { } return s; };
}
var t = 0, tick = function () {
t += 0.016;
try {
var S = dpShoreHere(), g = S && meshes[S.id];
if (g && g.userData.foam)
g.userData.foam.forEach(function (f, i) {
var w = Math.sin(t * 0.6 + f.ph * Math.PI);
f.m.position.x = f.x0 + 3 + i * 9 + w * 3.5;
f.m.material.opacity = 0.45 + 0.35 * (0.5 + 0.5 * w);
});
}
catch (e) { }
if (typeof requestAnimationFrame === "function")
requestAnimationFrame(tick);
};
if (typeof requestAnimationFrame === "function")
requestAnimationFrame(tick);
function seaside(chunk) {
try {
var low = " " + String(chunk || "").toLowerCase() + " ";
var S = dpShoreHere();
if (!S && DP_SEA_WORDS.test(low) && !DP_UNDER.test(low))
S = dpMakeShore();
if (S) {
dpSettleShore(S);
if (typeof refresh === "function")
refresh(S);
if (typeof save === "function")
save();
[1500, 5000].forEach(function (ms) { setTimeout(function () { try {
var S2 = dpShoreHere();
if (S2 && dpSettleShore(S2) && typeof save === "function")
save();
}
catch (e) { } }, ms); });
}
}
catch (e) {
if (window.console)
console.warn("dream-polish:", e);
}
}
if (typeof scanText === "function") {
var st3 = scanText;
scanText = function (chunk) { var r = st3.apply(this, arguments); seaside(chunk); return r; };
}
if (typeof reconcile === "function") {
var rc3 = reconcile;
reconcile = function () { var r = rc3.apply(this, arguments); try {
var S = dpShoreHere();
if (S) {
dpSettleShore(S);
}
}
catch (e) { } return r; };
}
})();
if (typeof FURN !== "undefined" && !FURN.goldpile) {
FURN.goldpile = function () { return __ZC(155, 11, this, arguments, new.target); };
}
var DP_ITEMS = [["goldpile", /\b(pile of gold|piles of gold|heap of gold|hoard|treasure|gold coins|pile of coins|mound of gold)\b/],
["candles", /\b(candlelight|candle ?light|candlesticks?|candelabra)\b/], ["bookshelf", /\b(shelves|stacks)\b/]];
var DP_SETTING = /\b(?:i was|we were|i found myself|i woke up|i stood|i was standing|i was walking|i walked|i wandered|i was wandering|i was sitting|i sat|i went|i was lost)\s+(?:all\s+)?(?:alone\s+)?(?:in|inside|into|through|around|about|deep in)\s+(?:a|an|the|my|our|some|this|that)\s+((?:[a-z'-]+\s*){1,5})/;
var DP_FURNISH = { bookshelf: 1, desk: 1, chair: 1, table: 1, bed: 1, sofa: 1, lamp: 1, fire: 1, fireplace: 1, candle: 1, candles: 1, piano: 1, clock: 1, rug: 1, painting: 1, chandelier: 1, wardrobe: 1, throne: 1, armchair: 1 };
var DP_FURN_WORD = /\b(book|books|shelf|shelves|candle|candlelight|pile|gold|coins|treasure|hoard|scroll|scrolls|lamp|lantern|fireplace|hearth|rug|carpet|table|chair|desk|painting|portrait|chandelier|throne|bed|clock)\b/;
function dpIndoorOwner(phrase, had) { return __ZC(155, 12, this, arguments, new.target); }
function dpIndoor(chunk, had) { return __ZC(155, 13, this, arguments, new.target); }
(function () {
if (typeof scanText === "function") {
var st4 = scanText;
scanText = function (chunk) {
var had = {};
try {
store.objects.forEach(function (o) { had[o.id] = 1; });
}
catch (e) { }
var r = st4.apply(this, arguments);
dpIndoor(chunk, had);
setTimeout(function () { dpIndoor(chunk, had); }, 1500);
return r;
};
}
if (typeof setWalk === "function") {
var sw = setWalk;
setWalk = function (on) {
var r = sw.apply(this, arguments);
try {
if (on && store.dpStartIn && !store.inside && typeof enterBuilding === "function") {
var b = specById(store.dpStartIn);
delete store.dpStartIn;
if (b && (b.realm || 0) === (store.here || 0))
enterBuilding(b);
}
}
catch (e) { }
return r;
};
}
})();
(function () {
if (typeof bringOccupants !== "function")
return;
var bo = bringOccupants;
bringOccupants = function () {
var r = bo.apply(this, arguments);
try {
if (!INT || !INT.spec || !INT.spec.dpText)
return r;
var sents = INT.spec.dpText.split(/[.!?;]+/), dream = [];
INT.root.traverse(function (o) { if (o.userData && o.userData.dpDream)
dream.push(o); });
if (!dream.length)
return r;
var words = (typeof ITEMWORDS !== "undefined" ? ITEMWORDS : []).concat(DP_ITEMS), n = 0;
store.characters.forEach(function (c) {
if (c.atId !== INT.spec.id || !c.objId)
return;
var sp = specById(c.objId), g = meshes[c.objId];
if (!sp || !g)
return;
var w = String(sp.label || sp.archetype).toLowerCase().split(/\s+/).pop();
var sen = sents.filter(function (x) { return x.indexOf(w) > -1; })[0];
if (!sen)
return;
var at = sen.indexOf(w), pick = null, pd = 1e9;
words.forEach(function (it) {
var m = it[1].exec(sen);
if (!m)
return;
var d = Math.abs(m.index - at);
var f = dream.filter(function (o) { return o.userData.furn === it[0]; })[0];
if (f && d < pd) {
pd = d;
pick = { f: f, on: /\b(on|upon|atop|on top of)\s+(?:a|an|the|his|her|its|their)?\s*\S*\s*$/.test(sen.slice(0, m.index)) };
}
});
if (!pick)
return;
var v = new THREE.Vector3();
pick.f.getWorldPosition(v);
var side = (n++ % 2 ? 1 : -1);
var x = pick.on ? v.x : v.x + side * 1.3, z = pick.on ? v.z + 0.35 : v.z + 1.1;
g.position.x = x;
g.position.z = z;
if (pick.on)
g.position.y = (g.position.y || 0) + 0.72;
g.userData.target = { x: x, z: z };
g.userData.path = null;
g.userData.dpStay = 1;
g.rotation.y = Math.PI;
c.x = x;
c.z = z;
});
}
catch (e) {
if (window.console)
console.warn("dream-polish occupants:", e);
}
return r;
};
})();
var DP_CITY_WORDS = /\b(city|cities|downtown|metropolis|skyscrapers?|high-?rises?|tower blocks?|city streets?|busy streets?|the avenue|avenues|new york|manhattan|times square|tokyo|london|chicago|hong kong|shanghai|neon city|cyberpunk|rush hour|traffic jam)\b/;
var DP_CITY_TALL = ["skyscraper", "tower", "apartment", "bank", "hotel", "tower", "apartment", "tenementblock"];
var DP_CITY_LOW = ["shop", "tenementblock", "shop", "apartment", "bank", "shop", "tenementblock", "hotel"];
function dpCity(chunk) { return __ZC(155, 14, this, arguments, new.target); }
if (typeof A === "function" && !KIT.citypad)
A("citypad", "infra", [90, 0.1, 90], [{ g: "box", s: [0.01, 0.01, 0.01], p: [0, 0, 0], c: "road" }]);
if (typeof DREAM_GROUND !== "undefined")
DREAM_GROUND.citypad = 1;
(function () {
if (typeof build === "function") {
var b2 = build;
build = function (spec) {
if (!spec || spec.archetype !== "citypad")
return b2.apply(this, arguments);
var g = new THREE.Group();
g.userData.id = spec.id;
var W = typeof BLOCK !== "undefined" ? BLOCK : 90, geo = new THREE.PlaneGeometry(W, W);
if (typeof metreUVs === "function")
metreUVs(geo, "pln", [W, W]);
var t = (typeof landOpt === "function" && landOpt("detail") && typeof texOf === "function") ? texOf("paving") : null;
var m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: t ? 0xA8A49C : 0x8A867E, map: t, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }));
m.rotation.x = -Math.PI / 2;
m.position.y = 0.03;
m.receiveShadow = true;
g.add(m);
var kerb = new THREE.MeshLambertMaterial({ color: 0xB8B4AC });
[[0, W / 2, W, 0.3], [0, -W / 2, W, 0.3], [W / 2, 0, 0.3, W], [-W / 2, 0, 0.3, W]].forEach(function (k) { var b = new THREE.Mesh(new THREE.BoxGeometry(k[2], 0.15, k[3]), kerb); b.position.set(k[0], 0.075, k[1]); g.add(b); });
return g;
};
}
if (typeof scanText === "function") {
var st5 = scanText;
scanText = function (chunk) { var r = st5.apply(this, arguments); setTimeout(function () { dpCity(chunk); }, 1200); return r; };
}
})();
(function () {
var WARM = ["car", "taxicab", "bus", "truck", "sportscar", "tree", "pine", "bush", "palm", "deadtree", "boat", "ship", "rock", "lamppost", "streetlight", "bench", "fence", "cottage", "house"];
function warm() {
try {
if (typeof modelsManifest !== "function" || typeof modelFile !== "function" || (typeof modelsOn === "function" && !modelsOn()))
return;
if (typeof LITE !== "undefined" && LITE)
return;
modelsManifest(function (man) {
var list = [];
WARM.forEach(function (k) { var e = man && man.a && man.a[k]; if (!e || !e.f)
return; (Array.isArray(e.f) ? e.f : [e.f]).forEach(function (f) { list.push(f); }); });
var i = 0;
(function next() { if (i >= list.length)
return; modelFile(list[i++], function () { }); setTimeout(next, 120); })();
});
}
catch (e) { }
}
if (document.readyState === "complete")
setTimeout(warm, 2500);
else
window.addEventListener("load", function () { setTimeout(warm, 2500); });
})();
if (typeof KIT !== "undefined" && KIT.bus) {
KIT.bus.parts = [
{ g: "box", s: [2.55, 1.15, 10.8], p: [0, .98, 0], c: "paint" },
{ g: "box", s: [2.55, 1.3, 10.8], p: [0, 2.2, 0], c: 0xE8E6E0 },
{ g: "box", s: [2.58, .16, 10.82], p: [0, 1.5, 0], c: 0xF2C230 },
{ g: "box", s: [2.6, .92, 9.3], p: [0, 2.22, -.55], c: "glass" },
{ g: "box", s: [2.42, .14, 10.5], p: [0, 2.92, 0], c: "metal" },
{ g: "box", s: [1.9, .28, 2.2], p: [0, 3.06, -1.5], c: "metal" },
{ g: "box", s: [2.34, 1.45, .06], p: [0, 2.02, 5.41], c: "glass" },
{ g: "box", s: [2.1, .78, .06], p: [0, 2.3, -5.41], c: "glass" },
{ g: "box", s: [1.6, .26, .05], p: [0, 2.8, 5.45], c: 0xFFB030, glow: 1 },
{ g: "box", s: [.34, .18, .05], p: [-.9, .78, 5.42], c: 0xFFF4D8, glow: 1, rep: [2, 1.8, 0, 0] },
{ g: "box", s: [.3, .18, .05], p: [-.95, .85, -5.42], c: 0xD03020, glow: 1, rep: [2, 1.9, 0, 0] },
{ g: "box", s: [2.62, .32, .16], p: [0, .42, 5.44], c: "dark" },
{ g: "box", s: [2.62, .32, .16], p: [0, .42, -5.44], c: "dark" },
{ g: "box", s: [.06, 1.95, 1.05], p: [1.29, 1.4, 4.3], c: "dark" },
{ g: "box", s: [.06, 1.95, 1.05], p: [1.29, 1.4, -.4], c: "dark" },
{ g: "box", s: [.08, .36, .08], p: [-1.42, 2.25, 5.15], c: "dark", rep: [2, 2.84, 0, 0] },
{ g: "cyl", s: [.5, .5, .32, 14], p: [-1.2, .5, 3.8], r: [0, 0, 1.5708], c: "dark", rep: [2, 2.4, 0, 0] },
{ g: "cyl", s: [.5, .5, .32, 14], p: [-1.2, .5, -3.4], r: [0, 0, 1.5708], c: "dark", rep: [2, 2.4, 0, 0] },
{ g: "cyl", s: [.24, .24, .34, 10], p: [-1.21, .5, 3.8], r: [0, 0, 1.5708], c: "metal", rep: [2, 2.42, 0, 0] },
{ g: "cyl", s: [.24, .24, .34, 10], p: [-1.21, .5, -3.4], r: [0, 0, 1.5708], c: "metal", rep: [2, 2.42, 0, 0] }
];
}
(function () {
if (typeof modelEntry !== "function")
return;
var me = modelEntry;
modelEntry = function (spec) { if (spec && spec.archetype === "bus")
return null; return me.apply(this, arguments); };
})();
if (typeof KIT !== "undefined" && KIT.lighthouse) {
(function () {
var P = [{ g: "cyl", s: [5, 5.4, 1.6, 18], p: [0, .8, 0], c: 0x8A8578 }], y = 1.6, H = 25.4, n = 6, r0 = 4.2, r1 = 2.5;
for (var i = 0; i < n; i++) {
var a = r0 + (r1 - r0) * (i / n), b = r0 + (r1 - r0) * ((i + 1) / n), h = H / n;
P.push({ g: "cyl", s: [b, a, h, 18], p: [0, y + h / 2, 0], c: i % 2 ? 0xB8332B : 0xF2EFE8 });
y += h;
}
P.push({ g: "box", s: [1.3, 2.3, .4], p: [0, 2.75, 4.05], c: 0x4A3426 });
P.push({ g: "box", s: [1.7, .3, .5], p: [0, 4.05, 4.05], c: 0xF2EFE8 });
[[9, 3.62], [15.5, 3.22], [21.5, 2.86]].forEach(function (w) { P.push({ g: "box", s: [.6, 1, .2], p: [0, w[0], w[1]], c: "glass" }); });
P.push({ g: "cyl", s: [3.9, 3.6, .4, 18], p: [0, 27.2, 0], c: 0x2A2C30 });
P.push({ g: "tor", s: [3.75, .06], p: [0, 28.3, 0], r: [Math.PI / 2, 0, 0], c: 0x2A2C30 });
P.push({ g: "tor", s: [3.75, .05], p: [0, 27.8, 0], r: [Math.PI / 2, 0, 0], c: 0x2A2C30 });
P.push({ g: "cyl", s: [2.5, 2.5, .5, 16], p: [0, 27.65, 0], c: 0xF2EFE8 });
P.push({ g: "cyl", s: [2.3, 2.3, 2.6, 16], p: [0, 29.2, 0], c: 0xFFF2C0, glow: 1, opa: .45 });
P.push({ g: "sph", s: [.9], p: [0, 29.2, 0], c: 0xFFF6D8, glow: 1, pulse: 1 });
P.push({ g: "box", s: [.12, 2.6, .12], p: [2.3, 29.2, 0], c: 0x2A2C30 });
P.push({ g: "box", s: [.12, 2.6, .12], p: [-2.3, 29.2, 0], c: 0x2A2C30 });
P.push({ g: "box", s: [.12, 2.6, .12], p: [0, 29.2, 2.3], c: 0x2A2C30 });
P.push({ g: "box", s: [.12, 2.6, .12], p: [0, 29.2, -2.3], c: 0x2A2C30 });
P.push({ g: "cyl", s: [2.7, 2.7, .3, 16], p: [0, 30.6, 0], c: 0x2A2C30 });
P.push({ g: "cone", s: [2.8, 2.4, 16], p: [0, 31.95, 0], c: 0xB8332B });
P.push({ g: "sph", s: [.38], p: [0, 33.4, 0], c: 0x2A2C30 });
KIT.lighthouse.parts = P;
})();
}
