/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var VOCAB = {
house: ["house", "home", "bungalow", "farmhouse", "dwelling", "residence"],
cottage: ["log cabin", "wooden cabin", "cottage", "shack", "hut", "cabin"],
apartment: ["apartment", "flat", "block of flats", "condo", "projects"],
tower: ["tower", "highrise", "high-rise", "spire"],
skyscraper: ["skyscraper", "tower block"],
motel: ["motel", "inn", "lodge"],
hotel: ["hotel", "resort"],
institution: ["institution", "asylum", "facility", "complex", "office", "offices", "government"],
hospital: ["hospital", "clinic", "infirmary", "ward", "emergency room", "surgery"],
school: ["school", "classroom", "college", "university", "academy", "gymnasium"],
church: ["church", "chapel", "parish", "steeple", "synagogue"],
cathedral: ["cathedral", "basilica", "minster"],
bank: ["bank vault", "bank", "treasury"],
library: ["library", "archive", "records"],
station: ["train depot", "bus depot", "railway station", "train station", "bus station", "station", "terminal", "platform", "airport", "depot"],
courthouse: ["courthouse", "court", "tribunal", "city hall", "town hall"],
shop: ["shop", "store", "market", "cafe", "diner", "bar", "pub", "restaurant", "bakery", "boutique", "pharmacy"],
warehouse: ["storage depot", "supply depot", "goods depot", "warehouse", "storage"],
factory: ["steel mill", "cotton mill", "paper mill", "factory", "plant", "refinery", "foundry", "mill"],
barn: ["barn", "byre"],
shed: ["garden shed", "tool shed", "shed", "outhouse"],
garage: ["garage", "carport", "workshop"],
ruin: ["ruin", "ruins", "rubble", "wreckage", "derelict", "collapsed"],
tent: ["tent", "teepee", "canopy", "marquee"],
bunker: ["bomb shelter", "air raid shelter", "bunker", "shelter", "pillbox", "vault"],
bridge: ["bridge", "crossing", "overpass", "viaduct", "footbridge"],
stairs: ["stairs", "staircase", "steps", "stairway", "stairwell", "escalator"],
tunnel: ["tunnel", "underpass", "subway", "passage", "culvert"],
gate: ["stone archway", "iron gate", "garden gate", "gateway", "entrance", "gate"],
statue: ["statue", "effigy", "idol", "figure on a plinth"],
monument: ["monument", "memorial", "pillar"],
fountain: ["fountain", "basin"],
well: ["well", "cistern"],
tomb: ["tomb", "mausoleum", "sepulchre"],
grave: ["grave", "headstone", "gravestone"],
lighthouse: ["lighthouse", "beacon"],
windmill: ["windmill", "water mill", "watermill", "old mill"],
pier: ["pier", "jetty", "dock", "wharf", "boardwalk"],
booth: ["booth", "phone box", "telephone box", "kiosk"],
tree: ["tree", "trees", "oak", "elm", "willow", "birch", "orchard", "grove", "woods", "forest"],
pine: ["pine tree", "pine trees", "pine", "fir tree", "fir", "spruce", "conifer", "evergreen"],
deadtree: ["dead tree", "dead trees", "bare tree", "burnt tree", "skeleton tree"],
palm: ["palm tree", "palm trees", "palm"],
bush: ["bush", "shrub", "thicket", "bracken"],
hedge: ["hedge", "hedgerow"],
grass: ["grass", "lawn", "meadow", "field", "clearing"],
water: ["water", "river", "lake", "sea", "ocean", "canal", "stream", "marsh", "bay"],
gasstation: ["gas station", "petrol station", "filling station", "service station", "gas pumps", "forecourt"],
parking: ["parking lot", "car park", "parking garage", "parking"],
playground: ["playground", "swings", "play park", "swing set"],
pool: ["swimming pool", "pool", "lido"],
busstop: ["bus stop", "bus shelter"],
hill: ["hill", "mound", "rise", "knoll"],
mountain: ["mountain", "peak", "summit", "range", "cliff", "ridge"],
rock: ["rock", "boulder", "crag", "stones"],
cave: ["cave", "cavern", "grotto", "hollow", "burrow"],
stump: ["stump"],
log: ["log", "fallen tree", "trunk"],
flowers: ["flowers", "blossom", "roses", "garden bed", "wildflowers"],
road: ["road", "street", "avenue", "highway", "motorway", "hallway", "corridor", "alley", "driveway", "path", "lane", "track", "asphalt"],
sidewalk: ["sidewalk", "pavement", "kerb", "curb"],
fence: ["fence", "picket", "railing", "paling"],
chainlink: ["chain link", "chainlink", "wire fence", "mesh fence", "chain-link"],
stonewall: ["stone wall", "brick wall", "garden wall", "wall", "barrier", "rampart"],
streetlight: ["streetlight", "street light", "lamp post", "lamppost", "streetlamp"],
trafficlight: ["traffic light", "stoplight", "signal"],
sign: ["sign", "signpost", "notice", "placard", "marker"],
billboard: ["billboard", "hoarding", "advertisement", "poster board"],
bench: ["bench", "seat", "pew"],
pylon: ["pylon", "transmission tower", "power line", "powerline", "electricity tower"],
hydrant: ["hydrant", "fire hydrant"],
mailbox: ["mailbox", "postbox", "letterbox"],
trashcan: ["bin", "trash can", "dumpster", "garbage can", "rubbish bin"],
bollard: ["bollard", "post"],
car: ["car", "automobile", "sedan", "taxi", "cab", "vehicle"],
truck: ["truck", "lorry", "van", "pickup", "tanker"],
bus: ["bus", "coach", "tram", "trolley"],
train: ["train", "carriage", "locomotive", "railcar", "boxcar"],
boat: ["boat", "ferry", "yacht", "barge", "canoe", "raft"],
bicycle: ["bicycle", "bike", "cycle", "motorcycle", "moped"],
plane: ["plane", "aeroplane", "airplane", "aircraft", "jet"],
human: ["man", "woman", "person", "stranger", "someone", "somebody", "figure", "adult", "guard", "nurse", "priest", "driver", "teacher", "doctor", "soldier",
"lady", "gentleman", "mother", "father", "grandmother", "grandfather", "grandma", "grandpa", "sister", "brother", "aunt", "uncle",
"husband", "wife", "nun", "monk", "king", "queen", "bride", "groom", "widow", "old man", "old woman"],
child: ["child", "kid", "boy", "girl", "infant", "baby", "toddler"],
crowd: ["crowd", "people", "mob", "queue", "congregation", "audience", "throng"],
shadow: ["shadow", "shade", "dark figure", "silhouette", "presence", "watcher"],
dog: ["dog", "hound", "wolf", "puppy"],
cat: ["cat", "kitten", "feline"],
horse: ["horse", "pony", "mare", "stallion"],
bird: ["bird", "crow", "raven", "pigeon", "hawk"],
creature: ["creature", "beast", "monster", "thing", "entity", "animal"],
portal: ["door", "doorway", "portal", "threshold", "mirror", "opening", "hatch"],
circle: ["ritual circle", "stone circle", "summoning circle", "circle of salt", "sigil on the ground", "circle"],
altar: ["altar", "shrine table", "offering table"],
standingstones: ["standing stones", "stone ring", "menhirs", "henge"],
rift: ["rift", "tear in the air", "crack in the world", "seam"],
impossiblestair: ["impossible stairs", "escher stairs", "stairs that went nowhere", "endless staircase", "stairs that folded"],
veil: ["veil", "curtain of light", "membrane", "barrier of light", "shimmer"],
brazier: ["brazier", "fire bowl", "burning bowl", "censer"],
secretdoor: ["secret door", "hidden door", "concealed door", "false wall", "hidden panel", "secret passage", "hidden passage"]
};
var MODIFIERS = {
tall: { h: 1.9 }, towering: { h: 2.6 }, huge: { s: 1.9 }, giant: { s: 2.3 }, enormous: { s: 2.4 }, massive: { s: 2.1 },
vast: { s: 2 }, endless: { h: 3 }, immense: { s: 2.2 }, high: { h: 1.6 }, "double": { s: 1.4 },
grand: { s: 1.3 }, majestic: { s: 1.3 }, magnificent: { s: 1.3 }, mighty: { s: 1.4 }, imposing: { s: 1.3 }, stately: { s: 1.2 }, splendid: { s: 1.2 },
tiny: { s: .45 }, small: { s: .6 }, little: { s: .6 }, low: { h: .55 }, squat: { h: .6 }, miniature: { s: .35 },
narrow: { w: .45 }, thin: { w: .45 }, slim: { w: .5 }, wide: { w: 1.9 }, broad: { w: 1.8 }, long: { d: 2.3 }, deep: { d: 1.9 },
old: { c: 0x453F34 }, ancient: { c: 0x3E3830 }, ruined: { c: 0x37322A }, broken: { c: 0x37322A },
burnt: { c: 0x221D19 }, charred: { c: 0x1C1815 }, abandoned: { c: 0x3D392F }, rotting: { c: 0x33301F },
dark: { c: 0x181A20 }, black: { c: 0x101116 }, white: { c: 0xB9B3A6 }, pale: { c: 0x9A9486 },
red: { c: 0x7A3128 }, crimson: { c: 0x6B2420 }, blue: { c: 0x2E4566 }, green: { c: 0x33502F },
yellow: { c: 0x8A7A2E }, gold: { c: 0x8A6A2E }, golden: { c: 0x8A6A2E }, grey: { c: 0x4B4C50 }, gray: { c: 0x4B4C50 },
brown: { c: 0x4C3B2C }, rust: { c: 0x6A3A22 }, rusted: { c: 0x6A3A22 }, silver: { c: 0x6E7278 },
"flat-roofed": { rm: "flat" }
};
Object.keys(WALLWORDS).forEach(function (w) { MODIFIERS[w] = { m: WALLWORDS[w] }; });
Object.keys(ROOFWORDS).forEach(function (w) { if (w !== "flat")
MODIFIERS[w] = { rm: ROOFWORDS[w] }; });
Object.keys(NAMED).forEach(function (w) { MODIFIERS[w] = { c: NAMED[w] }; });
var EMOTIONS = ["afraid", "scared", "terrified", "fear", "dread", "panic", "calm", "peaceful", "safe",
"joy", "happy", "elated", "sad", "grief", "crying", "weeping", "angry", "rage", "furious", "confused",
"lost", "watched", "chased", "hunted", "ashamed", "guilt", "urgent", "relieved", "numb", "longing",
"awe", "nostalgia", "dreadful", "uneasy", "trapped", "free", "falling"];
var LUCID = ["lucid", "knew i was dreaming", "realised i was dreaming", "realized i was dreaming",
"aware i was dreaming", "i was dreaming", "took control", "woke up inside", "knew it was a dream"];
Object.keys(MORE_VOCAB).forEach(function (k) { VOCAB[k] = (VOCAB[k] || []).concat(MORE_VOCAB[k]); });
if (typeof EXTRA_VOCAB !== "undefined") {
var taken = {};
Object.keys(VOCAB).forEach(function (k) { VOCAB[k].forEach(function (w) { taken[w] = k; }); });
Object.keys(EXTRA_VOCAB).forEach(function (k) {
if (!KIT[k])
return;
EXTRA_VOCAB[k].forEach(function (w) {
w = String(w).toLowerCase().trim();
if (!w || taken[w])
return;
taken[w] = k;
(VOCAB[k] = VOCAB[k] || []).push(w);
if (w.indexOf(" ") === -1 && !/(s|x|z|ch|sh)$/.test(w)) {
var pl = /[^aeiou]y$/.test(w) ? w.slice(0, -1) + "ies" : w + "s";
if (!taken[pl]) {
taken[pl] = k;
VOCAB[k].push(pl);
}
}
});
});
}
if (VOCAB.road)
VOCAB.road = VOCAB.road.filter(function (w) { return w !== "driveway" && w !== "drive way"; });
var PHRASES = [];
Object.keys(VOCAB).forEach(function (arch) {
VOCAB[arch].forEach(function (w) { PHRASES.push([w, arch]); });
});
PHRASES.sort(function (a, b) { return b[0].length - a[0].length; });
function scanText(chunk) { return __ZC(58, 0, this, arguments, new.target); }
var DEFINITE = ["the", "that", "this", "same", "her", "his", "its", "their", "my", "our", "said"];
var INDEFINITE = ["a", "an", "another", "one", "some", "new", "other", "second", "third"];
function articleBefore(low, at) { return __ZC(58, 1, this, arguments, new.target); }
function findExisting(arch, word) {
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if (o.filler || o.archetype !== arch)
continue;
if (!o.nights || o.nights.indexOf(store.session) === -1)
continue;
return o;
}
return null;
}
function archList() {
return Object.keys(KIT).filter(function (k) { return k !== "dreamplaceholder"; }).join(", ");
}
function buildSys() { return __ZC(58, 2, this, arguments, new.target); }
var parseTimer = null;
var AI_AWAY_WORDS = "Built from the catalogue. The AI will finish it when you're back online.", aiAwayRetry = null, aiAwayTries = 0;
function aiAway() { return __ZC(58, 3, this, arguments, new.target); }
function aiOwnKey() { var c = cfg(); return c.mode === "direct" && !!c.key; }
function aiBought() { return aiOwnKey() || typeof hasAccess !== "function" || hasAccess(); }
function scheduleParse(delay) { return __ZC(58, 4, this, arguments, new.target); }
var DREAM_UNKNOWN = {};
function dreamUnknown(w, weight) { w = String(w || "").trim(); if (!w || w.length < 3)
return; DREAM_UNKNOWN[w.toLowerCase()] = { w: w, n: (DREAM_UNKNOWN[w.toLowerCase()] || { n: 0 }).n + (weight || 1), at: Date.now() }; }
var LOOKUP_SKIP = /^(I|The|A|An|And|But|Then|There|They|We|He|She|It|My|Our|His|Her|Their|This|That|When|While|After|Before|Suddenly|So|Later|Next|Everyone|Someone|Nobody|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|God|Mom|Dad|Mum)$/;
function lookupTerms(text) { return __ZC(58, 5, this, arguments, new.target); }
function aiNormal(p) { return __ZC(58, 6, this, arguments, new.target); }
function aiJson(raw) {
raw = String(raw || "").replace(/```json|```/g, "").trim();
try {
return JSON.parse(raw);
}
catch (e) { }
var a = raw.indexOf("{"), b = raw.lastIndexOf("}");
if (a > -1 && b > a) {
try {
return JSON.parse(raw.slice(a, b + 1));
}
catch (e) { }
}
throw new Error("the AI's answer was cut short or not readable");
}
function aiSay(html, quiet) { if (typeof setStatus === "function")
setStatus(html); if (window.console && !quiet)
console.info("[AI] " + String(html).replace(/<[^>]+>/g, "")); }
var AI_COOL_UNTIL = 0;
function aiPlainWhy(e) { return __ZC(58, 7, this, arguments, new.target); }
function aiCooling() { return Date.now() < AI_COOL_UNTIL; }
function tokenAge() { return (typeof signedIn === "function" && signedIn()) ? Date.now() - (session.at || 0) : 0; }
var parseTokAt = 0;
function runParse(retry) { return __ZC(58, 8, this, arguments, new.target); }
var APP_LLM_DOWN = 0, AI_WAITING = false, AI_NO_JSONMODE = false;
if (typeof window !== "undefined")
window.addEventListener("online", function () { if (AI_WAITING) {
AI_WAITING = false;
if (aiBought())
scheduleParse(800);
} });
function hexToInt(h) {
if (typeof h !== "string")
return undefined;
var n = parseInt(h.replace("#", ""), 16);
return isNaN(n) ? undefined : n;
}
function reconcile(p) { return __ZC(58, 9, this, arguments, new.target); }
