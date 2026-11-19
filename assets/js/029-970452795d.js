/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CREATURE = {};
function C(key, words, kind, o) {
o = o || {};
o.kind = kind;
o.key = key;
o.feats = o.feats || [];
CREATURE[key] = o;
var sz = o.big ? [20 * (o.s || 1), 10 * (o.s || 1), 20 * (o.s || 1)] : kind === "folk" ? [1, 1.8 * (o.s || 1), 1] : [2 * (o.s || 1), 1.6 * (o.s || 1), 3 * (o.s || 1)];
A(key, "being", sz, [{ g: "sph", s: [.4], p: [0, .6, 0], c: o.col || 0x7A7064 }], { big: !!o.big });
MORE_VOCAB[key] = words;
if (kind === "folk")
PEOPLE[key] = 1;
}
function sc(obj, v) { obj.scale.set(v, v, v); }
function hasFeat(o, f) { return o.feats.indexOf(f) > -1; }
C("fairy", ["fairy", "fairies", "faery", "the fae", "fair folk", "fair one"], "folk", { s: .34, feats: ["wings:fairy", "glow", "hover", "ears"], top: 0x9AD0B8, realm: "faerie" });
C("pixie", ["pixie", "pixies", "sprite", "sprites"], "folk", { s: .26, feats: ["wings:fairy", "glow", "hover", "ears"], top: 0xC8A0E0, realm: "faerie" });
C("elf", ["elf", "elves", "elven", "elvish"], "folk", { s: 1.06, feats: ["ears", "thin"], top: 0x3F7A3A, realm: "faerie" });
C("dwarf", ["dwarf", "dwarves", "dwarfs"], "folk", { s: .66, feats: ["beard", "wide", "held:axe"], top: 0x8A4A2A, sex: "m" });
C("gnome", ["gnome", "gnomes"], "folk", { s: .42, feats: ["beard", "hat:pointed:0xA8322B"], top: 0x2F5E9E, sex: "m", realm: "faerie" });
C("goblin", ["goblin", "goblins", "hobgoblin", "boggart"], "folk", { s: .6, skin: 0x6A8A3A, feats: ["ears", "hunched"], top: 0x5A4A32, night: 1, realm: "faerie" });
C("troll", ["troll", "trolls"], "folk", { s: 1.7, skin: 0x6A7A68, feats: ["hunched", "wide", "held:club", "ears"], top: 0x5A4A32, night: 1 });
C("ogre", ["ogre", "ogres"], "folk", { s: 1.9, skin: 0x8A9A5A, feats: ["wide", "held:club"], top: 0x6B4A32, night: 1 });
C("giant", ["a giant", "the giant", "giants", "great giant"], "folk", { s: 5, big: 1, feats: ["wide", "beard"], top: 0x6B4A32, night: 1 });
C("frostgiant", ["frost giant", "ice giant", "jotun", "frost giants"], "folk", { s: 5, big: 1, skin: 0xA8C8E0, feats: ["wide", "beard", "held:club", "aura:stars"], top: 0xE8F0F8, realm: "frozen", night: 1 });
C("witch", ["witch", "witches", "hag", "crone", "sorceress"], "folk", { feats: ["hat:witch", "held:staff"], top: 0x1B1C20, sex: "f", night: 1 });
C("wizard", ["wizard", "wizards", "sorcerer", "mage", "warlock", "magician", "enchanter"], "folk", { feats: ["hat:pointed:0x2F5E9E", "beard", "held:staff", "orb"], top: 0x2F5E9E, sex: "m" });
C("knight", ["knight", "knights", "paladin"], "folk", { feats: ["armor", "helm", "held:sword", "held:shield"] });
C("vampire", ["vampire", "vampires", "nosferatu"], "folk", { skin: 0xDCD6D2, feats: ["cape", "fangs"], top: 0x1B1C20, night: 1 });
C("werewolf", ["werewolf", "werewolves", "wolfman", "lycan", "lycanthrope"], "folk", { s: 1.2, skin: 0x5A4A3A, feats: ["head:wolf", "hunched", "claws"], top: 0x5A4A3A, night: 1 });
C("zombie", ["zombie", "zombies", "ghoul", "ghouls", "undead", "walking dead"], "folk", { skin: 0x7A8A6A, feats: ["reach", "hunched"], top: 0x5A5448, night: 1 });
C("skeleton", ["skeleton", "skeletons", "skeletal"], "folk", { skin: 0xE6DCC2, feats: ["bones", "thin"], top: 0xE6DCC2, night: 1 });
C("mummy", ["mummies", "a mummy", "the mummy", "egyptian mummy"], "folk", { skin: 0xD8CCAE, feats: ["wrapped", "reach"], top: 0xD8CCAE, night: 1 });
C("ghost", ["ghost", "ghosts", "phantom", "phantoms", "apparition", "poltergeist", "a spirit", "the spirit", "spirits"], "float", { col: 0xE8EEF4, feats: ["see-through"], night: 1 });
C("wraith", ["wraith", "wraiths", "spectre", "specter", "revenant"], "float", { col: 0x2A2E38, feats: ["see-through", "dark"], night: 1 });
C("banshee", ["banshee", "banshees", "keening woman"], "float", { col: 0xDCE4F0, feats: ["see-through", "hair"], night: 1 });
C("angel", ["angel", "angels", "seraph", "seraphim", "cherub", "archangel"], "folk", { s: 1.15, feats: ["wings:feather:0xF2EEE6", "glow", "halo"], top: 0xF2EEE6, realm: "heavens" });
C("demon", ["demon", "demons", "devil", "devils", "fiend", "fiends"], "folk", { s: 1.25, skin: 0xA8322B, feats: ["horns", "wings:bat", "tail:devil", "claws"], top: 0x1B1C20, night: 1, realm: "underworld" });
C("imp", ["imp", "imps"], "folk", { s: .5, skin: 0xB0503A, feats: ["horns", "wings:bat", "tail:devil", "ears"], top: 0x2A1E1C, night: 1, realm: "underworld" });
C("mermaid", ["mermaid", "mermaids"], "folk", { sex: "f", feats: ["fishtail:0x2F7A7A", "hover"], realm: "depths" });
C("merman", ["merman", "mermen", "merfolk", "merrow", "triton", "mer people", "merpeople"], "folk", { sex: "m", feats: ["fishtail:0x2F5E9E", "hover", "held:trident"], realm: "depths" });
C("siren", ["sea siren", "sirens sang", "siren song", "sirens of the sea"], "folk", { sex: "f", feats: ["fishtail:0x5E3A7E", "hover", "glow"], night: 1, realm: "depths" });
C("selkie", ["selkie", "selkies", "seal woman", "seal folk"], "folk", { skin: 0xB0A89A, feats: ["cape"], top: 0x6E6A66, realm: "depths" });
C("nymph", ["nymph", "nymphs", "naiad", "naiads", "dryad", "dryads", "oread"], "folk", { feats: ["glow", "ears"], top: 0x6AA86A, sex: "f", realm: "faerie" });
C("satyr", ["satyr", "satyrs", "faun", "fauns"], "folk", { feats: ["horns", "goatlegs", "held:flute"], sex: "m", realm: "faerie" });
C("centaur", ["centaur", "centaurs"], "folk", { feats: ["horsebody", "held:bow"], realm: "faerie" });
C("minotaur", ["minotaur", "bull-headed man", "bull headed man"], "folk", { s: 1.45, feats: ["head:bull", "wide", "held:axe"], top: 0x5A3A22, night: 1 });
C("harpy", ["harpy", "harpies"], "folk", { feats: ["wings:feather:0x6B4A32", "claws", "birdlegs"], top: 0x6B4A32, sex: "f", night: 1 });
C("gorgon", ["gorgon", "gorgons", "medusa"], "folk", { feats: ["snakehair"], top: 0x3F5A3A, sex: "f", night: 1 });
C("golem", ["golem", "golems", "stone man", "clay man", "living statue"], "folk", { s: 2.1, skin: 0x8A8478, feats: ["wide", "blocky"], top: 0x8A8478 });
C("genie", ["genie", "djinn", "jinn", "djinni", "jinni", "ifrit"], "folk", { skin: 0x4E7AB0, feats: ["smoketail", "hover", "glow"], top: 0xC7A043 });
C("oni", ["oni", "ogre demon"], "folk", { s: 1.6, skin: 0x3E5EA8, feats: ["horns", "wide", "held:club"], top: 0xC7A043, night: 1 });
C("fireelemental", ["fire elemental", "fire spirit", "being of fire", "salamander"], "folk", { s: 1.3, feats: ["see-through:0xFF7A1E", "aura:flames", "glow"], realm: "fire" });
C("waterelemental", ["water elemental", "water spirit", "being of water"], "folk", { s: 1.3, feats: ["see-through:0x4EA8D8", "aura:water"], realm: "depths" });
C("earthelemental", ["earth elemental", "being of stone", "rock creature"], "folk", { s: 1.8, skin: 0x6B5A48, feats: ["wide", "blocky"], top: 0x6B5A48 });
C("airelemental", ["air elemental", "wind spirit", "being of air"], "float", { col: 0xDCE8F0, feats: ["see-through", "aura:smoke"] });
C("faceless", ["faceless man", "faceless woman", "faceless figure", "faceless people", "someone with no face", "a man with no face", "a woman with no face"], "folk", { feats: ["faceless"], top: 0x3A3C42, night: 1 });
C("tallman", ["tall man", "tall thin man", "slender man", "slenderman", "the tall man"], "folk", { s: 1.55, feats: ["faceless", "thin"], top: 0x141418, night: 1 });
C("nighthag", ["night hag", "old hag", "sleep paralysis demon", "something on my chest", "the hag"], "folk", { skin: 0x6E6A66, feats: ["hunched", "claws", "hair"], top: 0x1B1C20, sex: "f", night: 1 });
C("boogeyman", ["boogeyman", "bogeyman", "bogeymen", "the thing under the bed", "monster under the bed", "thing in the closet"], "folk", { s: 1.4, skin: 0x1E1C22, feats: ["hunched", "claws", "faceless", "aura:darkaura"], top: 0x1E1C22, night: 1 });
C("clown", ["clown", "clowns", "jester"], "folk", { feats: ["clown"], top: 0xC0392B, night: 1 });
C("unicorn", ["unicorn", "unicorns"], "beast", { col: 0xF2EEE6, head: "horse", feats: ["horn", "glow", "mane:0xE8D8F0"], realm: "faerie", roam: 1 });
C("pegasus", ["pegasus", "winged horse", "pegasi"], "beast", { col: 0xF2EEE6, head: "horse", feats: ["wings:0xF2EEE6", "mane:0xE6E0D2"], realm: "heavens", roam: 1 });
C("nightmare", ["nightmare horse", "night mare", "demon horse", "black stallion"], "beast", { col: 0x141418, head: "horse", feats: ["eyes:red", "aura:flames", "mane:0x2A1410"], night: 1, roam: 1 });
C("kelpie", ["kelpie", "kelpies", "water horse"], "beast", { col: 0x4E6A62, head: "horse", feats: ["mane:0x2F5A3A", "aura:water"], realm: "depths", night: 1, roam: 1 });
C("griffin", ["griffin", "griffins", "gryphon", "griffon"], "beast", { col: 0xB8883A, head: "eagle", s: 1.4, feats: ["wings:0x7A5A3A"], roam: 1 });
C("hippogriff", ["hippogriff", "hippogryph"], "beast", { col: 0x8A6A4A, head: "eagle", s: 1.3, feats: ["wings:0x7A5A3A"], roam: 1 });
C("sphinx", ["sphinx"], "beast", { col: 0xC9A060, head: "human", s: 2, feats: ["headdress"] });
C("manticore", ["manticore"], "beast", { col: 0xA8583A, head: "lion", s: 1.4, feats: ["tail:scorpion", "wings:0x6A2A22"], night: 1, roam: 1 });
C("chimera", ["chimera", "chimaera"], "beast", { col: 0xB8883A, head: "lion", s: 1.4, feats: ["tail:serpent", "goathead"], night: 1, roam: 1 });
C("cerberus", ["cerberus", "three-headed dog", "three headed dog"], "beast", { col: 0x1A1A1E, head: "dog", s: 2.2, heads: 3, feats: ["eyes:red"], realm: "underworld", night: 1 });
C("hellhound", ["hellhound", "hell hound", "hellhounds", "barghest", "black shuck", "grim"], "beast", { col: 0x141418, head: "dog", s: 1.3, feats: ["eyes:red", "aura:flames"], night: 1, roam: 1 });
C("fenrir", ["fenrir", "fenris", "fenris wolf", "giant wolf"], "beast", { col: 0x5E5A58, head: "dog", s: 4, big: 1, feats: ["eyes:gold"], night: 1, roam: 1 });
C("kitsune", ["kitsune", "fox spirit", "nine-tailed fox", "nine tailed fox"], "beast", { col: 0xE8E0D6, head: "fox", s: .8, tails: 9, feats: ["glow"], realm: "faerie", roam: 1 });
C("fox", ["a fox", "the fox", "foxes", "red fox"], "beast", { col: 0xC8662A, head: "fox", s: .55, roam: 1 });
C("bear", ["a bear", "the bear", "bears", "grizzly", "black bear", "polar bear"], "beast", { col: 0x5A3A22, head: "bear", s: 1.5, roam: 1, night: 1 });
C("lion", ["lion", "lions", "lioness"], "beast", { col: 0xC89A4A, head: "lion", s: 1.2, roam: 1 });
C("tiger", ["tiger", "tigers", "tigress"], "beast", { col: 0xD8782A, head: "lion", s: 1.2, feats: ["stripes"], roam: 1, night: 1 });
C("elephant", ["elephant", "elephants"], "beast", { col: 0x8A8A8E, head: "elephant", s: 2.6, roam: 1 });
C("mammoth", ["mammoth", "mammoths", "woolly mammoth"], "beast", { col: 0x6A4A32, head: "elephant", s: 3, feats: ["tusks"], realm: "frozen", roam: 1 });
C("boar", ["boar", "boars", "wild boar", "hog"], "beast", { col: 0x4A3A30, head: "boar", s: .8, roam: 1 });
C("rabbit", ["rabbit", "rabbits", "hare", "hares", "bunny"], "beast", { col: 0xB0A08A, head: "rabbit", s: .25, roam: 1 });
C("rat", ["rat", "rats", "mouse", "mice", "rodent"], "beast", { col: 0x6E665E, head: "rat", s: .18, roam: 1, night: 1 });
C("frog", ["frog", "frogs", "toad", "toads"], "beast", { col: 0x4E7A3A, head: "frog", s: .2 });
C("turtle", ["turtle", "turtles", "tortoise", "sea turtle"], "beast", { col: 0x5A6A3A, head: "turtle", s: .7, feats: ["shell"] });
C("snake", ["snake", "snakes", "viper", "cobra", "adder", "rattlesnake"], "serpent", { icons: "color:green size:.14", night: 1 });
C("basilisk", ["basilisk"], "serpent", { icons: "color:olive size:.6", night: 1 });
C("seaserpent", ["sea serpent", "sea monster", "sea serpents"], "serpent", { icons: "color:teal size:3 sea", big: 1, realm: "depths", night: 1 });
C("eel", ["eel", "eels", "moray"], "serpent", { icons: "color:olive size:.12 sea", realm: "depths" });
C("giantworm", ["giant worm", "sandworm", "great worm", "sand worm"], "serpent", { icons: "color:bronze size:2.5 sea", big: 1, night: 1 });
C("fish", ["fish", "fishes", "school of fish", "shoal of fish", "koi", "goldfish"], "swim", { col: 0xE8A04A, school: 14, s: .3, realm: "depths" });
C("shark", ["shark", "sharks"], "swim", { col: 0x6E7A86, fin: "shark", s: 1.6, night: 1, realm: "depths" });
C("whale", ["whale", "whales", "blue whale", "humpback"], "swim", { col: 0x3A4A5A, fin: "whale", s: 8, big: 1, realm: "depths" });
C("dolphin", ["dolphin", "dolphins", "porpoise"], "swim", { col: 0x8A98A6, fin: "dolphin", s: 1, realm: "depths" });
C("seahorse", ["seahorse", "seahorses", "sea-horse"], "swim", { col: 0xE8A04A, fin: "seahorse", s: .3, realm: "depths" });
C("jellyfish", ["jellyfish", "jellyfishes", "jelly fish"], "float", { col: 0xE8A0D8, feats: ["see-through", "jelly", "glow"], realm: "depths" });
C("octopus", ["octopus", "octopuses", "octopi", "squid"], "tentacle", { col: 0xA8583A, s: .5, realm: "depths" });
C("kraken", ["kraken", "giant squid", "giant octopus"], "tentacle", { col: 0x6A2A32, s: 9, big: 1, realm: "depths", night: 1 });
C("tentacles", ["tentacles", "tentacles rose", "tentacle"], "tentacle", { col: 0x3A2A3A, s: 2, bare: 1, night: 1 });
C("phoenix", ["a phoenix", "the phoenix", "phoenixes", "firebird"], "flyer", { col: 0xE8561E, s: 2.2, feats: ["aura:flames", "glow"], realm: "fire" });
C("roc", ["roc", "great bird", "giant bird", "thunder bird"], "flyer", { col: 0x6B4A32, s: 10, big: 1 });
C("spider", ["spider", "spiders", "giant spider", "tarantula"], "crawl", { col: 0x1E1A1C, body: "spider", s: .5, night: 1 });
C("scorpion", ["scorpion", "scorpions"], "crawl", { col: 0x3A2A1E, body: "scorpion", s: .5, night: 1 });
C("crab", ["crab", "crabs", "lobster"], "crawl", { col: 0xA8322B, body: "crab", s: .4, realm: "depths" });
C("floatingeye", ["giant eye", "floating eye", "an eye in the sky", "eyes in the dark", "staring eye"], "float", { col: 0xF2EEE6, feats: ["eye"], night: 1, realm: "void" });
C("butterflies", ["butterfly", "butterflies"], "swarm", { col: [0xE8A04A, 0x2F5E9E, 0xE8E0D6, 0xC0392B], n: 14, s: .12 });
C("moths", ["moth", "moths"], "swarm", { col: [0xC8BCA8, 0xA89A88], n: 18, s: .1, night: 1 });
C("bats", ["a bat", "the bat", "bats", "vampire bat"], "swarm", { col: [0x1A1A1E], n: 14, s: .2, night: 1 });
C("bees", ["bees", "bee", "wasps", "hornets", "swarm of bees"], "swarm", { col: [0xD4B83C, 0x1A1A1E], n: 30, s: .05, night: 1 });
C("insects", ["swarm of insects", "insects", "locusts", "swarm of flies", "cockroaches"], "swarm", { col: [0x2A2420], n: 60, s: .04, night: 1 });
function creatureOf(spec) { return CREATURE[spec.archetype] || null; }
function creatureLook(spec) { return __ZC(29, 0, this, arguments, new.target); }
function featVal(o, k) { var v = null; o.feats.forEach(function (f) { var p = f.split(":"); if (p[0] === k)
v = p.slice(1); }); return v; }
function buildCreature(spec, f) { return __ZC(29, 1, this, arguments, new.target); }
function wolfHead(col) { return __ZC(29, 2, this, arguments, new.target); }
function seeThrough(root, col, o) {
root.traverse(function (m) {
if (!m.isMesh)
return;
m.material = new THREE.MeshBasicMaterial({ color: col !== undefined ? col : (m.material.color ? m.material.color.getHex() : 0xFFFFFF), transparent: true, opacity: o || 0.5, depthWrite: false });
});
}
var MERTAIL = { geo: {}, mat: {}, tex: null };
function merTailTex() { return __ZC(29, 3, this, arguments, new.target); }
function merTail(col, L) { return __ZC(29, 4, this, arguments, new.target); }
function buildFolk(spec, f, o) {
creatureLook(spec);
var g = buildFigure(spec, f);
return dressFolk(g, spec, f, o);
}
function dressFolk(g, spec, f, o) { return __ZC(29, 5, this, arguments, new.target); }
function beastHead(kind, col, s) { return __ZC(29, 6, this, arguments, new.target); }
function buildBeast(spec, f, o) { return __ZC(29, 7, this, arguments, new.target); }
function fishShape(col, fin) { return __ZC(29, 8, this, arguments, new.target); }
function buildSwim(spec, f, o) { return __ZC(29, 9, this, arguments, new.target); }
function buildFloat(spec, f, o) { return __ZC(29, 10, this, arguments, new.target); }
function buildTentacle(spec, f, o) { return __ZC(29, 11, this, arguments, new.target); }
function buildFlyer(spec, f, o) { return __ZC(29, 12, this, arguments, new.target); }
function buildCrawl(spec, f, o) { return __ZC(29, 13, this, arguments, new.target); }
function buildSwarm(spec, f, o) { return __ZC(29, 14, this, arguments, new.target); }
