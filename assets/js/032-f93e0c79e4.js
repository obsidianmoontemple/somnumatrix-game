/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RUST = 0x7A4A2A, RUST2 = 0x5A3A22, SCRAP = 0x6E6A62, CONCRETE = 0x8A8680, CHAR = 0x2A2622;
S("wreckedcar", "infra", [2.2, 1.4, 4.6], [
{ g: "box", s: [2, .8, 4.4], p: [0, .55, 0], r: [0, 0, .06], c: RUST },
{ g: "box", s: [1.7, .6, 2], p: [0, 1.2, -.2], r: [.05, 0, .06], c: RUST2 },
{ g: "box", s: [1.5, .5, .06], p: [0, 1.2, .82], c: 0x1A1A1E },
{ g: "cyl", s: [.36, .36, .25, 10], p: [-1, .3, 1.4], r: [0, 0, Math.PI / 2], c: CHAR, rep: [2, 2, 0, 0] },
{ g: "cyl", s: [.36, .36, .25, 10], p: [-1, .18, -1.4], r: [.3, 0, Math.PI / 2], c: CHAR }
], ["wrecked car", "burnt-out car", "burned out car", "rusted car", "rusting car", "abandoned car", "car wreck", "wrecked cars", "abandoned cars"]);
S("collapsedtower", "structure", [24, 40, 20], [
{ g: "box", s: [20, 26, 16], p: [0, 13, 0], c: CONCRETE },
{ g: "box", s: [16, 14, 14], p: [-3, 30, 0], r: [0, 0, .35], c: CONCRETE },
{ g: "box", s: [1.2, 1.8, .2], p: [-7, 4, 8.05], c: 0x141416, rep: [6, 2.8, 0, 0], rep2: [6, 0, 4, 0] },
{ g: "box", s: [6, 3, 6], p: [9, 1.5, 6], r: [.2, .4, .3], c: CONCRETE }, { g: "box", s: [4, 2, 5], p: [-10, 1, 7], r: [-.3, .2, .1], c: CONCRETE },
{ g: "cyl", s: [.08, .08, 6, 4], p: [5, 33, 0], r: [.4, 0, .5], c: RUST, rep: [4, 1.2, 0, .4] }
], ["collapsed building", "collapsed tower", "ruined skyscraper", "broken skyscraper", "bombed-out building", "bombed out building", "ruined tower", "ruined city", "ruined buildings", "crumbling tower"]);
S("barricade", "infra", [8, 2, 2], [
{ g: "box", s: [2.2, .4, .6], p: [-2.4, .2, 0], c: 0xA89A78, rep: [3, 2.3, 0, 0] }, { g: "box", s: [2.2, .4, .6], p: [-1.2, .6, 0], c: 0xA89A78, rep: [2, 2.3, 0, 0] },
{ g: "box", s: [3, .12, .12], p: [0, 1.4, .2], r: [0, 0, .5], c: RUST, rep: [2, 2, 0, 0] },
{ g: "box", s: [1.6, 1.2, .08], p: [2.8, .9, -.3], r: [0, .2, .1], c: SCRAP }
], ["barricade", "barricades", "sandbags", "roadblock", "barbed wire", "wall of scrap"]);
S("scrapheap", "nature", [8, 4, 8], [
{ g: "ico", s: [2.2], p: [0, .9, 0], c: SCRAP }, { g: "box", s: [2, .8, 1.2], p: [1.6, 1.8, .4], r: [.4, .3, .6], c: RUST },
{ g: "cyl", s: [.4, .4, 1, 10], p: [-1.6, 1.6, .6], r: [1, 0, .4], c: 0x3A5A6A }, { g: "box", s: [3, .1, 1.4], p: [-.4, 2.6, -.4], r: [.2, .8, .3], c: RUST2 },
{ g: "cyl", s: [.5, .5, .3, 12], p: [1.8, .3, -1.6], r: [Math.PI / 2, 0, 0], c: CHAR, rep: [3, 0, .3, 0] }
], ["scrap heap", "scrap pile", "junk pile", "pile of junk", "junkyard", "scrapyard", "pile of scrap", "heap of junk", "pile of tyres", "pile of tires"]);
S("shanty", "structure", [7, 4, 6], [
{ g: "box", s: [6, 3, 5], p: [0, 1.5, 0], c: SCRAP },
{ g: "box", s: [6.6, .12, 5.6], p: [0, 3.2, 0], r: [0, 0, .12], c: RUST },
{ g: "box", s: [2, 1.6, .06], p: [-1.4, 1.8, 2.53], c: RUST2 }, { g: "box", s: [1.6, 1.2, .06], p: [1.6, 1.2, 2.53], c: 0x3A5A6A },
{ g: "box", s: [1, 2, .2], p: [.2, 1, 2.55], c: "dark" }
], ["shacks", "shanty", "shanty town", "shantytown", "makeshift shelter", "hut made of scrap", "lean-to", "scrap hut"]);
S("firebarrel", "infra", [1, 1.4, 1], [
{ g: "cyl", s: [.36, .36, 1, 12], p: [0, .5, 0], c: RUST },
{ g: "cone", s: [.3, .6, 6], p: [0, 1.2, 0], c: 0xFF8A3A, glow: 1, pulse: 1 }
], ["burning barrel", "fire barrel", "oil drum", "oil drums", "barrel fire", "burning barrels"], {});
S("radsign", "infra", [1.2, 2.4, .3], [
{ g: "cyl", s: [.05, .05, 2, 6], p: [0, 1, 0], c: SCRAP },
{ g: "box", s: [1, 1, .05], p: [0, 2, .05], r: [0, 0, Math.PI / 4], c: 0xD4B83C },
{ g: "cyl", s: [.18, .18, .02, 3], p: [0, 2, .09], r: [Math.PI / 2, 0, 0], c: 0x141414 }
], ["radiation sign", "radiation warning", "hazard sign", "radioactive", "warning sign", "keep out sign"]);
S("watertower", "structure", [8, 20, 8], [
{ g: "cyl", s: [3.4, 3.4, 5, 16], p: [0, 15.5, 0], c: 0x8A6A5A }, { g: "cone", s: [3.6, 2, 16], p: [0, 19, 0], c: RUST2 },
{ g: "cyl", s: [.2, .2, 13, 6], p: [-2.4, 6.5, -2.4], c: RUST, rep: [2, 4.8, 0, 0], rep2: [2, 0, 0, 4.8] }
], ["water tower", "water tank on legs", "old water tower"]);
S("brokenhighway", "structure", [14, 10, 50], [
{ g: "box", s: [12, 1, 22], p: [0, 8, -12], c: CONCRETE }, { g: "box", s: [12, 1, 16], p: [0, 5, 14], r: [.35, 0, 0], c: CONCRETE },
{ g: "cyl", s: [1, 1.2, 8, 10], p: [0, 4, -12], c: CONCRETE }, { g: "box", s: [5, 2, 4], p: [3, 1, 4], r: [.5, .3, .2], c: CONCRETE },
{ g: "box", s: [.2, .8, 22], p: [5.9, 8.9, -12], c: 0x9A968E }, { g: "box", s: [.2, .8, 22], p: [-5.9, 8.9, -12], c: 0x9A968E }
], ["broken highway", "collapsed bridge", "broken overpass", "collapsed overpass", "ruined motorway", "broken freeway", "highway that ended"]);
S("falloutshelter", "structure", [8, 4, 8], [
{ g: "box", s: [7, 2.4, 7], p: [0, 1.2, 0], c: CONCRETE }, { g: "cyl", s: [1.8, 1.8, .3, 20], p: [0, 1.4, 3.52], r: [Math.PI / 2, 0, 0], c: 0x6A6C72 },
{ g: "cyl", s: [.3, .3, .4, 8], p: [0, 1.4, 3.8], r: [Math.PI / 2, 0, 0], c: 0xD4B83C }, { g: "box", s: [1, .6, 1], p: [2.5, 2.7, -2], c: SCRAP },
{ g: "box", s: [6, .2, 1.4], p: [0, .1, 5.2], c: 0x5A5854 }
], ["fallout shelter", "nuclear bunker", "shelter door", "underground shelter", "vault entrance"]);
S("dustbowl", "nature", [40, 1, 40], [
{ g: "cyl", s: [18, 18, .06, 30], p: [0, .04, 0], c: 0x9A8A64, opa: .7 },
{ g: "ico", s: [.6], p: [5, .2, 3], c: 0x7A6A4A, rep: [5, -3, 0, -1.5] }
], ["wasteland", "dust bowl", "barren land", "dead land", "scorched earth", "irradiated land", "ash waste", "toxic waste"]);
S("oasis", "nature", [30, 12, 30], [
{ g: "cyl", s: [7, 7.4, .4, 28], p: [0, .1, 0], c: "water" },
{ g: "cyl", s: [8, 8.6, .3, 28], p: [0, .05, 0], c: 0xC8B078 },
{ g: "cyl", s: [.28, .4, 9, 7], p: [7, 4.5, 3], r: [0, 0, -.12], c: "bark" }, { g: "cone", s: [3.4, 1.4, 7], p: [6, 9.3, 3], c: 0x3F7A3A },
{ g: "cyl", s: [.28, .4, 10, 7], p: [-6, 5, 5], r: [.1, 0, .1], c: "bark" }, { g: "cone", s: [3.6, 1.4, 7], p: [-5.4, 10.2, 5.4], c: 0x4A8A42 },
{ g: "cyl", s: [.28, .4, 8, 7], p: [2, 4, -8], r: [-.1, 0, .05], c: "bark" }, { g: "cone", s: [3.2, 1.3, 7], p: [2.2, 8.3, -8.4], c: 0x3F7A3A },
{ g: "cyl", s: [.28, .4, 8.5, 7], p: [-7, 4.2, -4], r: [0, 0, .14], c: "bark" }, { g: "cone", s: [3.2, 1.3, 7], p: [-7.6, 8.6, -4], c: 0x4A8A42 },
{ g: "cyl", s: [.03, .03, 1.4, 4], p: [5, .7, -4], c: 0x6A8A3A, rep: [8, .5, 0, .3] },
{ g: "ico", s: [1], p: [-3, .4, 7.6], c: 0xB8A070, rep: [3, 2, 0, -.6] }
], ["oasis", "desert oasis", "an oasis", "oasis in the desert", "spring in the desert", "pool in the desert"]);
S("bedouintent", "structure", [12, 4, 8], [
{ g: "box", s: [11, .1, 7], p: [0, 3.4, 0], r: [0, 0, .05], c: 0x3A2A22 },
{ g: "box", s: [11, 3.2, .08], p: [0, 1.7, -3.4], c: 0x4A3A2A },
{ g: "cyl", s: [.08, .08, 3.4, 5], p: [-5, 1.7, 3.2], c: 0x6B4A32, rep: [3, 5, 0, 0] },
{ g: "box", s: [8, .05, 5], p: [0, .05, 0], c: 0x8A2A22 }
], ["bedouin tent", "desert tent", "nomad tent", "tent in the desert", "great tent", "sultan's tent"]);
S("sandpillars", "structure", [16, 12, 6], [
{ g: "cyl", s: [.9, 1, 10, 10], p: [-6, 5, 0], c: 0xC8B078 }, { g: "cyl", s: [.9, 1, 7, 10], p: [-2, 3.5, 0], c: 0xC8B078 },
{ g: "cyl", s: [.9, 1, 11, 10], p: [2, 5.5, 0], c: 0xC8B078 }, { g: "box", s: [6, 1, 1.6], p: [4, 11.4, 0], c: 0xC8B078 },
{ g: "box", s: [3, 1.2, 2], p: [6, .4, 2], r: [.2, .3, .4], c: 0xC8B078 }
], ["ancient pillars", "pillars in the sand", "buried temple", "lost city", "sand-buried ruins", "desert ruins", "ruins in the sand"]);
var LAIR_R = 34, LAIR_GAP = 0.34;
A("volcanolair", "structure", [LAIR_R * 2, 36, LAIR_R * 2], [{ g: "box", s: [1, 1, 1], p: [0, -10, 0], c: "stone" }], { hollow: 1 });
MORE_VOCAB.volcanolair = ["volcano lair", "lair inside a volcano", "lair in a volcano", "lair in the volcano", "lair inside the volcano",
"volcanic lair", "hollow volcano", "inside the volcano", "inside a volcano", "base inside a volcano", "secret base in a volcano",
"villain's lair", "evil lair", "lair under the volcano", "hideout in a volcano"];
DECOR.volcanolair = function (g, spec, f) { return __ZC(32, 0, this, arguments, new.target); };
C("raider", ["raider", "raiders", "marauder", "marauders", "bandit", "bandits", "road warrior", "road warriors"], "folk", { feats: ["mask", "held:machete", "spikes"], top: 0x3A3028, night: 1, realm: "wasteland" });
C("scavenger", ["scavenger", "scavengers", "survivor", "survivors", "wanderer in rags", "wastelander", "wastelanders"], "folk", { feats: ["mask", "pack"], top: 0x6A5A48, realm: "wasteland" });
C("mutant", ["mutant", "mutants", "mutated man", "ghoul of the wastes", "irradiated man"], "folk", { s: 1.2, skin: 0x8A9A6A, feats: ["hunched", "claws", "growths"], top: 0x4A4238, night: 1, realm: "wasteland" });
C("camel", ["camel", "camels", "dromedary", "camel train"], "beast", { col: 0xC8A070, head: "horse", s: 1.6, feats: ["hump"], roam: 1, realm: "desert" });
C("vulture", ["vulture", "vultures", "buzzard", "buzzards"], "flyer", { col: 0x2A2420, s: 1.2, night: 1, realm: "desert" });
function extendRealms2() {
REALMS.wasteland = { name: "The Wasteland", ground: 0x8A7A5A, tex: "sand", path: 0x6E6A62, skyTop: 0x6A6450, skyLow: 0xC8B078, dens: 2.2, light: 0xE8D8A8, amb: .6, sun: .55, stars: 0,
mix: ["scavenger", "raider", "mutant", "dog", "scavenger", "rat"] };
REALMS.desert = { name: "The Endless Desert", ground: 0xD8C088, tex: "sand", path: 0xC0A870, skyTop: 0x4A82C8, skyLow: 0xF0D8A8, dens: .9, light: 0xFFF0D0, amb: .85, sun: .95, stars: 0,
mix: ["camel", "human", "snake", "scorpion", "vulture"] };
REALM_WORDS.push(["wasteland", ["the wasteland", "a wasteland", "post-apocalyptic", "post apocalyptic", "after the apocalypse", "the apocalypse", "after the bombs", "after the end of the world", "the end of the world", "nuclear winter", "after the war ended everything", "the ruined world"]]);
REALM_WORDS.push(["desert", ["the desert", "a desert", "the endless desert", "sea of sand", "the sands", "across the desert", "the dunes", "the sahara"]]);
REALM_SCENERY.wasteland = ["collapsedtower", "wreckedcar", "barricade", "scrapheap", "shanty", "firebarrel", "radsign", "watertower", "brokenhighway", "falloutshelter", "wreckedcar", "deadtree", "shanty", "dustbowl"];
REALM_SCENERY.desert = ["dune", "oasis", "dune", "bedouintent", "sandpillars", "cactus", "dune", "rock", "dune", "oasis"];
}
