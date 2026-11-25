/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AID_G = { box: "box", cube: "box", cuboid: "box", block: "box", rect: "box", rectangle: "box", slab: "box", plank: "box",
cyl: "cyl", cylinder: "cyl", tube: "cyl", pipe: "cyl", column: "cyl", pillar: "cyl", disc: "cyl", disk: "cyl", capsule: "ell",
cone: "cone", pyramid: "cone", spike: "cone", horn: "cone",
sph: "sph", sphere: "sph", ball: "sph", orb: "sph", dome: "sph",
ell: "ell", ellipsoid: "ell", ellipse: "ell", oval: "ell", egg: "ell", ovoid: "ell", spheroid: "ell",
tor: "tor", torus: "tor", ring: "tor", donut: "tor", doughnut: "tor", hoop: "tor" };
var AID_CAT = { structure: "structure", building: "structure", place: "structure", architecture: "structure",
nature: "nature", plant: "nature", tree: "nature", natural: "nature",
infra: "infra", object: "infra", item: "infra", furniture: "infra", fixture: "infra", thing: "infra", prop: "infra", tool: "infra",
vehicle: "vehicle", transport: "vehicle", craft: "vehicle", ship: "vehicle",
being: "being", creature: "being", animal: "being", beast: "being", monster: "being", person: "being", character: "being" };
function aidNum(v) { if (typeof v === "string" && v.trim() !== "")
v = +v; return (typeof v === "number" && isFinite(v)) ? v : null; }
function aidClamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function aidPart(pt) { return __ZC(144, 0, this, arguments, new.target); }
function aidDef(def) { return __ZC(144, 1, this, arguments, new.target); }
if (typeof CUSTOM_SHAPE !== "undefined")
CUSTOM_SHAPE.ell = 3;
(function () {
if (typeof compilePart === "function") {
var cp = compilePart;
compilePart = function (pt) { return cp(aidPart(pt)); };
}
if (typeof compileArchetype === "function") {
var ca = compileArchetype;
compileArchetype = function (key, def) { return ca(key, aidDef(def)); };
}
if (typeof geo === "function") {
var g0 = geo;
geo = function (kind, s) {
if (kind !== "ell")
return g0.apply(this, arguments);
var k = "ell:" + s.join(",");
if (GEOCACHE[k])
return GEOCACHE[k];
var G = new THREE.SphereGeometry(1, 14, 10);
G.scale(s[0], s[1], s[2]);
return (GEOCACHE[k] = G);
};
}
})();
(function () {
if (typeof lexFind !== "function")
return;
var lf = lexFind;
lexFind = function (w) {
var k = lf.apply(this, arguments);
try {
if (k && typeof dreamUnknown === "function") {
var low = String(w || "").toLowerCase().trim(), sing = low.replace(/ies$/, "y").replace(/([^s])s$/, "$1");
var known = (typeof VOCAB !== "undefined" && VOCAB[k] && (VOCAB[k].indexOf(low) > -1 || VOCAB[k].indexOf(sing) > -1));
if (low && low !== k && sing !== k && !known && /^[a-z][a-z' -]{2,40}$/.test(low))
dreamUnknown(low, 2);
}
}
catch (e) { }
return k;
};
})();
(function () {
if (typeof buildSys !== "function")
return;
var bs = buildSys;
buildSys = function () {
return bs.apply(this, arguments) + " Animals and creatures that are there in the dream (a dinosaur, a horse, a whale, a dragon) are ALSO listed in objects as physical things, using an archetype from the list only when it truly is that animal, otherwise an invented design. Anything LOOKED UP ON THE WEB for you must be designed to match that description: its true body plan or layout, proportions, distinctive parts and colours. Use ell (an ellipsoid, s=[radiusX,radiusY,radiusZ]) for rounded bodies, heads and limbs. Never answer with a single box for a thing that is not a box.";
};
})();
var AID = { queue: [], busy: false, done: {}, tries: {}, sourced: {}, at: {}, err: {}, failed: {}, gaveUp: {}, serverOld: false, warned: false };
try {
AID.sourced = JSON.parse(localStorage.getItem("somnu.aidSourced") || "{}") || {};
}
catch (e) {
AID.sourced = {};
}
function aidKeepSourced() { try {
localStorage.setItem("somnu.aidSourced", JSON.stringify(AID.sourced));
}
catch (e) { } }
function aidFlat(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
function aidKeyFor(key, label) {
var k = aidFlat(key);
if (!/^[a-z][a-z0-9]{1,23}$/.test(k) || k === "dreamplaceholder")
k = aidFlat(label).slice(0, 23);
if (!/^[a-z]/.test(k))
k = ("d" + k).slice(0, 23);
return /^[a-z][a-z0-9]{1,23}$/.test(k) ? k : null;
}
function aidPoor(key) {
var d = KIT[key];
if (!d || !d.grown)
return false;
var n = (d.parts || []).length;
return n < 5 || (d.cat === "being" && n < 8);
}
function aidWant(key, label, why) { return __ZC(144, 2, this, arguments, new.target); }
var AID_SYS = [
"You design ONE physical thing for a 3D world that is built only from simple solid shapes.",
"A description of it, looked up on the web just now, is given to you when one was found. Follow it faithfully: the real thing's body plan or layout, true proportions, every distinctive part, and its true colours. If no description arrived, use what you truly know of it. The result must be recognisable at a glance as that thing and nothing else.",
"Return ONLY one JSON object, no prose: {\"cat\":\"\",\"size\":[w,h,d],\"parts\":[{\"g\":\"\",\"s\":[],\"p\":[x,y,z],\"r\":[rx,ry,rz],\"c\":\"#RRGGBB\"}],\"source\":\"\"}",
"cat is being for an animal or creature, structure for a building, nature for a plant or grown thing, vehicle for something ridden or driven, infra for any other object.",
"size is its real width (x), height (y) and depth (z) in metres. Real scale matters: a Tyrannosaurus is about 12 m long and 4 m tall at the hips, a horse 2.4 m long and 1.6 m tall, a chair 0.5 m wide.",
"parts: 14 to 36 shapes. g is box (s=[width,height,depth]), cyl (s=[radiusTop,radiusBottom,height], standing upright before rotation), cone (s=[radius,height], point up before rotation), sph (s=[radius]), ell (an ellipsoid, s=[radiusX,radiusY,radiusZ]) or tor (s=[radius,tube]). Use ell for rounded bodies, heads, bellies and thighs, and tapered cyl or cone for necks, tails, legs, horns and claws.",
"p is the centre of the part in metres: x across, y up from the ground (never below 0), z forward; the front of the thing (a face, a bonnet, a door) faces +z, and the whole thing is centred on x=0, z=0 and stands on y=0. r is an optional rotation in radians about x, y and z: a tail or neck that slopes is a cyl rotated about x. Parts must touch or overlap so the thing is one piece, and legs reach the ground.",
"c is each part's true colour as a hex string; give eyes, teeth, claws, windows and markings their own small parts so the colours read.",
"source is the name of the web source you followed, or \"own knowledge\".",
"Example, a horse (abridged): {\"cat\":\"being\",\"size\":[0.7,1.7,2.4],\"parts\":[{\"g\":\"ell\",\"s\":[0.33,0.36,0.85],\"p\":[0,1.15,0],\"c\":\"#7A4A2A\"},{\"g\":\"cyl\",\"s\":[0.16,0.22,0.75],\"p\":[0,1.5,0.75],\"r\":[0.7,0,0],\"c\":\"#7A4A2A\"},{\"g\":\"ell\",\"s\":[0.12,0.13,0.3],\"p\":[0,1.75,1.12],\"r\":[0.5,0,0],\"c\":\"#7A4A2A\"},{\"g\":\"cyl\",\"s\":[0.06,0.05,0.85],\"p\":[0.18,0.43,0.55],\"c\":\"#6A3E22\"},{\"g\":\"cyl\",\"s\":[0.06,0.05,0.85],\"p\":[-0.18,0.43,0.55],\"c\":\"#6A3E22\"},{\"g\":\"cyl\",\"s\":[0.06,0.05,0.85],\"p\":[0.18,0.43,-0.55],\"c\":\"#6A3E22\"},{\"g\":\"cyl\",\"s\":[0.06,0.05,0.85],\"p\":[-0.18,0.43,-0.55],\"c\":\"#6A3E22\"},{\"g\":\"cyl\",\"s\":[0.04,0.09,0.7],\"p\":[0,1.0,-0.95],\"r\":[-0.5,0,0],\"c\":\"#2A1A10\"},{\"g\":\"box\",\"s\":[0.06,0.3,0.6],\"p\":[0,1.75,0.7],\"r\":[0.7,0,0],\"c\":\"#2A1A10\"}],\"source\":\"Wikipedia: Horse\"}"
].join(" ");
function aidFindDesign(o, depth) { return __ZC(144, 3, this, arguments, new.target); }
function aidNext() { return __ZC(144, 4, this, arguments, new.target); }
var AID_MODEL = [
[/(saur|\bdino|raptor|\bt-?rex\b|tyranno|triceratops|diplodocus|iguanodon|theropod|brontosaur|stegosaur|lizard)/, "dinosaur"],
[/\b(yeti|bigfoot|sasquatch|abominable)/, "yeti"], [/\b(ghost|spectre|specter|phantom|wraith|poltergeist)/, "ghost"],
[/\b(alien|martian|extraterrestrial)/, "alien"], [/\b(dragon|wyvern|drake|wyrm)/, "dragonbeast"],
[/\b(goblin|imp|gremlin)/, "goblin"], [/\b(orc|ogre|troll)/, "orc"], [/\b(frog|toad)/, "frogfolk"]
];
if (typeof SPECIES_FEATS !== "undefined") {
if (!SPECIES_FEATS.dinosaur)
SPECIES_FEATS.dinosaur = { feats: ["tail:dragon", "scales"], s: 2.6 };
if (!SPECIES_FEATS.dragonbeast)
SPECIES_FEATS.dragonbeast = { feats: ["tail:dragon", "scales"], s: 2.2 };
}
if (typeof HDF_KIND !== "undefined") {
if (!HDF_KIND.dinosaur)
HDF_KIND.dinosaur = { m: "creatures/dino.glb", set: "monster" };
if (!HDF_KIND.dragonbeast)
HDF_KIND.dragonbeast = { m: "creatures/dragon-evolved.glb", set: "flyer" };
}
function aidModelFor(label) { var low = String(label || "").toLowerCase(); for (var i = 0; i < AID_MODEL.length; i++)
if (AID_MODEL[i][0].test(low))
return AID_MODEL[i][1]; return null; }
function aidFallback(job, why, keep) { return __ZC(144, 5, this, arguments, new.target); }
function aidUse(job, def, looked) { return __ZC(144, 6, this, arguments, new.target); }
function aidServerOld() { return __ZC(144, 7, this, arguments, new.target); }
(function () {
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
var want = [];
AID.gaveUp = {};
try {
var looked = {};
((p && p.__looked) || []).forEach(function (t) { looked[aidFlat(t)] = 1; });
var defs = {};
((p && p.newArchetypes) || []).forEach(function (nd) { if (nd && nd.key)
defs[nd.key] = nd; });
((p && p.objects) || []).forEach(function (o) {
if (!o || !o.archetype)
return;
var label = String(o.label || o.archetype), lf = aidFlat(label), lastw = aidFlat(label.split(/\s+/).pop());
var wasLooked = looked[lf] || looked[lastw] || looked[aidFlat(o.archetype)];
if (!KIT[o.archetype]) {
if (!wasLooked || !defs[o.archetype]) {
if (typeof savedArchetypeKeys !== "undefined")
savedArchetypeKeys[o.archetype] = true;
want.push([o.archetype, label, "new"]);
}
}
else if (aidPoor(o.archetype) && !AID.sourced[o.archetype])
want.push([o.archetype, label, "poor"]);
});
if (p && p.__server === undefined && p.__app)
aidServerOld();
}
catch (e) { }
var r = rc.apply(this, arguments);
try {
var lk = {};
((p && p.__looked) || []).forEach(function (t) { lk[aidFlat(t)] = 1; });
((p && p.objects) || []).forEach(function (o) {
if (!o || !o.archetype || !KIT[o.archetype] || !KIT[o.archetype].grown || AID.sourced[o.archetype])
return;
var label = String(o.label || o.archetype);
if ((lk[aidFlat(label)] || lk[aidFlat(label.split(/\s+/).pop())]) && !aidPoor(o.archetype) && !want.some(function (w) { return w[0] === o.archetype; })) {
KIT[o.archetype].sourced = true;
AID.sourced[o.archetype] = "looked up with the dream";
aidKeepSourced();
}
});
want.forEach(function (w) {
if (KIT[w[0]] && !aidPoor(w[0]) && w[2] === "new" && KIT[w[0]].sourced)
return;
aidWant(w[0], w[1], w[2]);
});
store.objects.forEach(function (sp) { if (sp.archetype === "dreamplaceholder" && !sp.filler)
aidWant(sp.sign || sp.label, sp.sign || sp.label, "box"); });
}
catch (e) { }
return r;
};
})();
setTimeout(function () {
try {
(store.objects || []).forEach(function (sp) { if (sp.archetype === "dreamplaceholder" && !sp.filler)
aidWant(sp.sign || sp.label, sp.sign || sp.label, "box"); });
}
catch (e) { }
}, 9000);
if (typeof window !== "undefined")
window.addEventListener("online", function () { setTimeout(aidNext, 1500); });
var AID_HUMAN = /\b(man|men|woman|women|boy|girl|child|kid|baby|person|people|lady|guy|king|queen|prince|princess|mother|father|mom|mum|dad|sister|brother|friend|teacher|doctor|nurse|police|officer|soldier|stranger|wife|husband|son|daughter|aunt|uncle|grand\w*|cousin|neighbou?r|priest|witch|wizard|god|goddess|me|myself|i)\b/;
var AID_BEASTWORD = /(saur|\bdino|raptor|\bt-?rex\b|tyranno|triceratops|diplodocus|iguanodon|theropod|mammoth|yeti|bigfoot|sasquatch|dragon|wyvern|monster|beast|creature|unicorn|griffin|gryphon|phoenix|kraken|basilisk|chimera|hydra|minotaur|centaur|werewolf|wolf|bear|lion|tiger|elephant|giraffe|horse|dog|cat|whale|shark|snake|spider|bird|eagle|owl)/;
function aidIsBeast(label) {
var low = String(label || "").toLowerCase().trim();
if (!low || AID_HUMAN.test(low))
return false;
if (AID_BEASTWORD.test(low))
return true;
var k = (typeof lexFind === "function") ? lexFind(low.split(/\s+/).pop()) : null;
return !!(k && KIT[k] && KIT[k].cat === "being" && k !== "human");
}
function aidFigureOf(c) { for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.charId === c.id && !o.filler)
return o;
} return null; }
function aidCharNamed(label) {
var lf = aidFlat(label);
return (store.characters || []).filter(function (c) { return c && (aidFlat(c.name) === lf || (c.aka || []).some(function (a) { return aidFlat(a) === lf; })); })[0] || null;
}
function aidBeasts() {
(store.characters || []).forEach(function (c) {
if (!c || c.city)
return;
var name = String(c.name || (c.aka && c.aka[0]) || "");
if (!aidIsBeast(name) || aidModelKind(name))
return;
var f = aidFigureOf(c);
if (!f)
return;
var key = aidKeyFor(name, name);
if (!key)
return;
if (f.archetype === key && KIT[key] && (KIT[key].sourced || AID.sourced[key]))
return;
if (KIT[key] && (KIT[key].sourced || AID.sourced[key])) {
f.archetype = key;
if (typeof refresh === "function")
refresh(f);
return;
}
if (KIT[key] && !KIT[key].grown) {
if (f.archetype !== key) {
f.archetype = key;
if (typeof refresh === "function")
refresh(f);
}
return;
}
aidWant(key, name, "creature");
});
}
(function () {
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
try {
var objs = (p && p.objects) || [];
((p && p.people) || []).forEach(function (pe) {
var label = pe && String(pe.label || "").trim();
if (!label || !aidIsBeast(label))
return;
var lf = aidFlat(label);
if (objs.some(function (o) { return aidFlat(o.label || o.archetype) === lf; }))
return;
var c = aidCharNamed(label);
if (c && aidFigureOf(c)) {
aidWant(aidKeyFor(label, label), label, "creature");
return;
}
var key = aidKeyFor(label, label);
if (key)
objs.push({ archetype: key, label: label });
});
if (p)
p.objects = objs;
}
catch (e) { }
var r = rc.apply(this, arguments);
try {
aidBeasts();
}
catch (e) { }
return r;
};
})();
setInterval(function () { try {
aidBeasts();
}
catch (e) { } }, 5000);
var AID_NOT_ALIVE = /\b(toy|statue|skeleton|bones?|fossils?|skull|plush|stuffed|model|figurine|picture|painting|poster|drawing|photo|sign|costume|mask|egg|eggs|footprints?|museum|park|book|film|movie|tv|television|game|ride|balloon|kite|cake|cookie|shirt|blanket|lamp|doll|puppet|carving|sculpture|mural|tattoo|bed|sofa|chair|rug)\b/;
var AID_KIND_SIZE = { dinosaur: 2.4, dragonbeast: 2.2, yeti: 1.4, orc: 1.1 };
function aidModelKind(label) {
var low = String(label || "").toLowerCase();
if (!low || AID_NOT_ALIVE.test(low) || AID_HUMAN.test(low))
return null;
var k = aidModelFor(low);
return (k && typeof HDF_KIND !== "undefined" && HDF_KIND[k]) ? k : null;
}
function aidOwnPiece(sp) {
var d = KIT[sp.archetype], lab = String(sp.label || sp.sign || "").toLowerCase().split(/\s+/).pop();
return !!(d && !d.grown && sp.archetype !== "dreamplaceholder" && sp.archetype !== "creature" && sp.archetype !== "human" && aidFlat(sp.archetype) === aidFlat(lab));
}
function aidModelSweep(tell) {
var said = {}, changed = 0, walkers = {};
(store.objects || []).forEach(function (sp) { var k = sp && !sp.filler && sp.charId && aidModelKind(sp.label || ""); if (k)
walkers[aidFlat(sp.label)] = 1; });
(store.objects || []).slice().forEach(function (sp) {
if (!sp || sp.filler || sp.city || sp.dreamerDoor || sp.hub || sp.archetype === "hubdoor" || sp.leadsTo)
return;
var label = String(sp.label || sp.sign || ""), kind = aidModelKind(label);
if (!kind)
return;
if (aidOwnPiece(sp))
return;
var L = (typeof lookOf === "function") ? lookOf(sp) : (sp.look || (sp.look = {}));
if (sp.archetype === "human" && L && L.species === kind)
return;
if (!sp.charId && walkers[aidFlat(label)] && typeof removeSpec === "function") {
removeSpec(sp);
changed++;
return;
}
sp.archetype = "human";
L = (typeof lookOf === "function") ? lookOf(sp) : (sp.look || (sp.look = {}));
L.species = kind;
if (!L.src)
L.src = {};
L.src.species = "dream";
var A = sp.attrs || (sp.attrs = {});
if (A.s === undefined && AID_KIND_SIZE[kind])
A.s = AID_KIND_SIZE[kind];
if (sp.sign && aidModelKind(sp.sign))
delete sp.sign;
if (typeof refresh === "function")
refresh(sp);
changed++;
said[label.toLowerCase()] = 1;
});
if (changed && typeof save === "function")
save();
var names = Object.keys(said);
if (tell && names.length && typeof aiSay === "function")
aiSay("<b>" + esc(names.join(", ")) + "</b> " + (names.length > 1 ? "walk" : "walks") + " about in " + (names.length > 1 ? "their" : "its") + " own animated model.");
return changed;
}
(function () {
if (typeof fidelity !== "function")
return;
var fd = fidelity;
fidelity = function (spec) {
var f = fd.apply(this, arguments);
if (f < 1 && spec && spec.archetype === "human" && !spec.filler && f > 0.5) {
var L = spec.look;
if (L && L.species && L.src && L.src.species === "dream" && aidModelKind(L.species))
return 1;
}
return f;
};
})();
(function () {
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
var r = rc.apply(this, arguments);
try {
aidModelSweep(true);
}
catch (e) { }
return r;
};
})();
setTimeout(function () { try {
aidModelSweep(false);
}
catch (e) { } }, 4000);
setInterval(function () { try {
aidModelSweep(false);
}
catch (e) { } }, 6000);
