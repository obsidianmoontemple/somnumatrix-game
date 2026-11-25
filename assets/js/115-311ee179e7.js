/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
if (typeof A === "function" && !KIT.field)
A("field", "nature", [10, 1, 10], [{ g: "box", s: [0.01, 0.01, 0.01], p: [0, 0, 0], c: "nature" }]);
if (typeof A === "function" && !KIT.cornstalk)
A("cornstalk", "nature", [0.6, 2.4, 0.6], [
{ g: "cyl", s: [0.04, 0.06, 2.2, 5], p: [0, 1.1, 0], c: 0x7A9A3A },
{ g: "cone", s: [0.25, 0.9, 5], p: [0.12, 1.5, 0], r: [0, 0, -0.8], c: 0x8AAA44 },
{ g: "cone", s: [0.25, 0.9, 5], p: [-0.12, 1.2, 0], r: [0, 0, 0.8], c: 0x8AAA44 },
{ g: "cyl", s: [0.07, 0.07, 0.35, 6], p: [0, 2.25, 0], c: 0xD8B850 }
]);
if (typeof A === "function" && !KIT.lantern) {
A("lantern", "infra", [0.5, 0.7, 0.5], [
{ g: "cyl", s: [0.22, 0.18, 0.5, 10], p: [0, 0.35, 0], c: 0xFFB048, glow: 1 },
{ g: "cyl", s: [0.12, 0.12, 0.04, 8], p: [0, 0.62, 0], c: 0x5A3A20 },
{ g: "cyl", s: [0.1, 0.1, 0.04, 8], p: [0, 0.08, 0], c: 0x5A3A20 }
]);
if (typeof learnWord === "function")
["lantern", "lanterns", "paper lantern", "paper lanterns", "sky lantern", "sky lanterns", "floating lanterns", "glowing lanterns"].forEach(function (w) { learnWord("lantern", w); });
}
if (typeof A === "function" && !KIT.wheat)
A("wheat", "nature", [0.4, 1.1, 0.4], [
{ g: "cyl", s: [0.02, 0.03, 1.0, 4], p: [0, 0.5, 0], c: 0xC8A850 }, { g: "cyl", s: [0.05, 0.03, 0.22, 5], p: [0, 1.05, 0], c: 0xE0C060 }
]);
var FIELD_MAX = 1200;
var FIELD_KINDS = {
forest: { of: [["tree", 0.55], ["pine", 0.35], ["bush", 0.1]], n: 650, r: 95, base: 0x3E4A2A },
pineforest: { of: [["pine", 0.9], ["bush", 0.1]], n: 700, r: 95, base: 0x34402A },
deadforest: { of: [["deadtree", 0.75], ["tree", 0.15], ["bush", 0.1]], n: 450, r: 90, base: 0x3A362A },
jungle: { of: [["palm", 0.4], ["tree", 0.35], ["bush", 0.25]], n: 750, r: 90, base: 0x2E4A22 },
orchard: { of: [["tree", 1]], n: 160, r: 70, grid: 9 },
cornfield: { of: [["cornstalk", 1]], n: 1200, r: 42, grid: 1.6, base: 0x6A5A3A },
wheatfield: { of: [["wheat", 1]], n: 1200, r: 36, grid: 1.3, base: 0x8A7444 },
meadow: { of: [["flowers", 0.7], ["grass", 0.3]], n: 500, r: 55, base: 0x5A7A3A },
dunes: { of: [["dune", 1]], n: 40, r: 220 },
mountains: { of: [["mountain", 1]], n: 9, r: 320 },
graves: { of: [["gravestone", 0.85], ["grave", 0.15]], n: 90, r: 40, grid: 4 },
rocks: { of: [["rock", 1]], n: 80, r: 70 },
mushrooms: { of: [["giantmushroom", 1]], n: 60, r: 60 }
};
var FIELD_WORDS = [
[/\b(pine (?:forest|woods)|snowy (?:forest|woods)|evergreen (?:forest|woods)|taiga|conifer(?:ous)? forest)\b/, "pineforest", "pine forest"],
[/\b(dead (?:forest|woods)|haunted (?:forest|woods)|dark (?:forest|woods)|burnt (?:forest|woods))\b/, "deadforest", "dark forest"],
[/\b(jungles?|rain ?forests?|tropical forests?)\b/, "jungle", "jungle"],
[/\b(forests?|woods|woodlands?|the trees all around|deep in the trees)\b/, "forest", "forest"],
[/\b(orchards?)\b/, "orchard", "orchard"],
[/\b(corn ?fields?|fields? of corn|maize field)\b/, "cornfield", "cornfield"],
[/\b(wheat ?fields?|fields? of wheat|fields? of grain|crop fields?)\b/, "wheatfield", "wheat field"],
[/\b(meadows?|fields? of flowers|wild ?flowers everywhere|flower fields?)\b/, "meadow", "meadow"],
[/\b(mountain ranges?|the mountains|mountains all around|a range of mountains)\b/, "mountains", "mountain range"],
[/\b(graveyards?|cemeter(?:y|ies)|churchyards?)\b/, "graves", "graveyard"],
[/\b(fields? of (?:rocks|stones|boulders)|boulder fields?)\b/, "rocks", "boulder field"],
[/\b(fields? of mushrooms|mushroom forest|giant mushrooms everywhere)\b/, "mushrooms", "mushroom forest"]
];
var FIELD_COUNT = { "a hundred": 100, "hundreds of": 250, "thousands of": 600, "a thousand": 600, "millions of": 600, "countless": 400, "endless": 400, "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90, "forty": 40, "thirty": 30, "twenty": 20, "a dozen": 12, "dozens of": 40, "rows and rows of": 200, "a sea of": 400, "a field of": 200 };
function fieldRnd(seed) { var x = (seed >>> 0) || 1; return function () { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return (x >>> 0) / 4294967296; }; }
function fieldHash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619) >>> 0;
} return h; }
function buildField(spec) { return __ZC(115, 0, this, arguments, new.target); }
function fieldBound(mesh, n) { return __ZC(115, 1, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) { if (spec && spec.archetype === "field" && spec.field)
return buildField(spec); return b0.apply(this, arguments); };
if (typeof flatZones === "function") {
var fz = flatZones;
flatZones = function () {
var z = fz.apply(this, arguments);
store.objects.forEach(function (o) { if (o.archetype === "field" && o.field && !/^(mountain|dune|hill)$/.test((o.field.of[0] || [])[0]))
z.push([o.x, o.z, (+o.field.r || 60) + 14]); });
return z;
};
}
})();
if (typeof DREAM_GROUND !== "undefined")
DREAM_GROUND.field = 1;
function makeField(label, of, n, r, opts) { return __ZC(115, 2, this, arguments, new.target); }
(function () {
if (typeof GROW_PLACES !== "undefined") {
for (var i = GROW_PLACES.length - 1; i >= 0; i--) {
var src = String(GROW_PLACES[i][0]);
if (/forest|jungle|woods|graveyard|cemetery/.test(src))
GROW_PLACES.splice(i, 1);
}
}
if (typeof scanText !== "function")
return;
var inner = scanText;
scanText = function (chunk) {
var res = inner.apply(this, arguments);
try {
var low = " " + String(chunk || "").toLowerCase() + " ", used = {};
FIELD_WORDS.forEach(function (fw) {
if (!fw[0].test(low) || used[fw[1]])
return;
if (fw[1] === "forest" && (used.pineforest || used.deadforest || used.jungle))
return;
used[fw[1]] = 1;
var K = FIELD_KINDS[fw[1]], big = /\b(huge|vast|endless|enormous|giant|great|massive|dense|thick)\b/.test(low) ? 1.6 : 1;
makeField(fw[2], K.of, Math.round(K.n * Math.min(1.4, big)), K.r * Math.sqrt(big), { instant: true, grid: K.grid, base: K.base });
});
var re = /\b(a hundred|hundreds of|thousands of|a thousand|millions of|countless|endless|dozens of|rows and rows of|a sea of|a field of|fifty|sixty|seventy|eighty|ninety|forty|thirty|twenty|\d{2,4})\s+(?:(?:big|small|little|tall|old|tiny|huge|giant|glowing|floating|red|white|black|golden|silver|glass|stone|wooden)\s+)?([a-z][a-z-]+)\b/g, m;
while ((m = re.exec(low))) {
var n = FIELD_COUNT[m[1]] || parseInt(m[1], 10) || 0;
if (n < 13)
continue;
var w = m[2], arch = growHeadArch(w) || growHeadArch(growSingular(w));
if (!arch) {
var lk = (typeof lexFind === "function") ? lexFind(w) : null;
if (lk)
arch = lk;
}
if (!arch || !KIT[arch] || KIT[arch].cat === "being" || arch === "field")
continue;
var sz = KIT[arch].size || [2, 2, 2], foot = Math.min(12, Math.max(sz[0], sz[2]));
var aloft = /\b(floating|flying|hovering|drifting|in the (?:air|sky)|over (?:the|a)|above|overhead|filled the sky)\b/.test(low) && KIT[arch].cat !== "structure";
var at = null, om = /\b(?:over|above|across|around|on|upon|in)\s+(?:the|a|an)\s+([a-z]+)/.exec(low.slice(m.index));
if (om) {
var ta = growHeadArch(om[1]) || growHeadArch(growSingular(om[1]));
if (ta)
at = store.objects.filter(function (o) { return !o.filler && o.archetype === ta && (o.realm || 0) === (store.here || 0); }).slice(-1)[0] || null;
}
store.objects.filter(function (o) { return o.archetype === arch && o.instant && !o.filler; }).slice(1).forEach(function (o) { removeSpec(o); });
makeField(m[1] + " " + w, [[arch, 1]], n, Math.min(aloft ? 80 : 300, Math.sqrt(n) * Math.max(2.5, foot * 1.6)), { instant: true, lift: aloft ? [6, 28] : null, at: at });
}
}
catch (e) {
if (window.console)
console.warn("fields:", e);
}
return res;
};
})();
(function () {
if (typeof buildSys === "function") {
var bs = buildSys;
buildSys = function () {
var t = bs.apply(this, arguments);
t = t.replace("Counts are kept: six houses is six objects, lots of trees is six to ten trees.", "Counts are kept: six houses is six objects.");
return t + " Anything there is a great deal of goes in \"fields\" instead of objects: [{\"archetype\":\"tree\",\"count\":300,\"radius\":120,\"label\":\"forest\",\"mix\":[{\"archetype\":\"pine\",\"share\":0.4}]}]. A forest is a field of hundreds of trees, dense (count 500 to 1000, radius 80 to 150 metres); a jungle is palms, trees and bushes; a cornfield is cornstalk, a wheat field is wheat, a meadow is flowers; a mountain range is a field of 6 to 12 mountains with a radius of 300; a graveyard is a field of gravestones; hundreds of lanterns, statues, umbrellas, crystals or anything else is a field of that thing, using a newArchetypes design when it is not on the list. count is at most 1200; radius is in metres and true to the scale described; add \"height\" in metres when the things float or fly above the ground (lanterns over a lake, stars, balloons). Fields never hold people or creatures.";
};
}
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
var r = rc.apply(this, arguments);
try {
((p && p.fields) || []).forEach(function (f) {
if (!f || !f.archetype)
return;
var key = String(f.archetype).toLowerCase().replace(/[^a-z0-9]/g, "");
if (!KIT[key]) {
var lk = (typeof lexFind === "function") ? lexFind(f.archetype) : null;
if (lk)
key = lk;
}
if (!KIT[key])
return;
var of = [[key, 1 - (f.mix || []).reduce(function (a, m) { return a + (+m.share || 0); }, 0)]];
(f.mix || []).forEach(function (m) { var k = String(m && m.archetype || "").toLowerCase().replace(/[^a-z0-9]/g, ""); if (KIT[k])
of.push([k, +m.share || 0.2]); });
of = of.filter(function (o) { return o[1] > 0; });
var label = String(f.label || f.archetype);
store.objects.filter(function (o) { return o.archetype === "field" && o.instant && (String(o.label).toLowerCase() === label.toLowerCase() || (o.field && o.field.of[0] && o.field.of[0][0] === key)); })
.forEach(function (o) { if (typeof removeSpec === "function")
removeSpec(o); });
var K = null;
Object.keys(FIELD_KINDS).forEach(function (k) { if (FIELD_KINDS[k].of[0][0] === key && !K)
K = FIELD_KINDS[k]; });
var made = makeField(label, of, +f.count || 200, +f.radius || 0, { grid: K && K.grid, base: K && K.base, lift: (+f.height > 0) ? [Math.max(1, +f.height * 0.5), +f.height] : null });
if (made)
delete made.instant;
});
}
catch (e) {
if (window.console)
console.warn("fields/ai:", e);
}
return r;
};
})();
