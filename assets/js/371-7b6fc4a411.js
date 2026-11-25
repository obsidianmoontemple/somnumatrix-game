/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var EBS_KEY = "erebos", EBS_NAME = "Erebos", EBS_LONG = "Erebos, the Underworld of Hades";
var EBS = { base: -1700000, G: null, built: false, t: 0, lite: false, zone: "descent", region: "main", mats: {}, tex: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
fx: [], lights: [], flames: [], districts: [], tiles: [], crowds: [], flows: [], state: null, rules: null, room: null, busy: false, pt: 0, vt: 0, moving: false, veil: null,
ride: null, run: null, game: null, cerb: null, boat: null, hydra: null, outside: null };
var EBS_TAE_X = 20000, EBS_TAR_X = -30000, EBS_ELY_X = 30000, EBS_PATH_X = -15000, EBS_IN_X = 40000;
var EBS_BOUND = 4560;
function ebsKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function ebsOpen() { var S = EBS.state; return !(S && S.ok !== false && S.open === false); }
var EBS_AT = {
top: { x: 0, z: 4180, name: "the top of the Descent" },
foot: { x: 0, z: 3480, name: "the foot of the Descent" },
vest: { x: 0, z: 3080, r: 260, name: "the Vestibule" },
elm: { x: 0, z: 3020, name: "the Elm of False Dreams" },
iron: { x: -210, z: 3110, name: "the Iron Chambers of the Furies" },
sibyl: { x: 34, z: 3330, name: "the Sibyl of Cumae" },
monsters: { x: 0, z: 2840, name: "the threshold of monsters" },
landS: { x: 0, z: 2440, name: "Charon's landing" },
landN: { x: 0, z: 2160, name: "the far landing" },
boathouse: { x: 96, z: 2500, name: "Charon's boathouse" },
lake: { x: 2500, z: 2250, r: 720, name: "the Acherusian Lake" },
rock: { x: -1720, z: 2330, name: "the Rock of the Two Rivers" },
grove: { x: -1900, z: 2880, r: 520, name: "the Grove of Persephone" },
pit: { x: -1480, z: 2520, name: "Odysseus's offering pit" },
bough: { x: -2310, z: 3130, name: "a dark holm-oak" },
gate: { x: 0, z: 1760, name: "the Gate of Hades" },
den: { x: 70, z: 1830, name: "Cerberus's den" },
gatehouse: { x: -52, z: 1808, name: "the Gatehouse of Hades" },
mourn: { x: -760, z: 1260, r: 380, name: "the Fields of Mourning" },
wardead: { x: 760, z: 1260, r: 380, name: "the Fields of the War-Dead" },
cross: { x: 0, z: 760, name: "the Crossroads" },
hecate: { x: 70, z: 800, name: "Hecate's shrine" },
judge: { x: -190, z: 620, name: "the Hall of Judgement" },
asph: { x: 900, z: -300, r: 1500, name: "the Asphodel Meadows" },
palace: { x: 0, z: -1560, r: 420, h: 22, name: "the Palace of Hades" },
stables: { x: 190, z: -1470, name: "the stables of the black horses" },
lethe: { x: -470, z: -1380, name: "the spring of Lethe" },
memory: { x: -830, z: -1620, name: "the Pool of Mnemosyne" },
styx: { x: -3200, z: -3760, name: "the House of Styx" },
fall: { x: -3640, z: -4180, name: "the falls of the Styx" },
tmouth: { x: -2160, z: 20, r: 560, name: "the walls of Tartarus" },
tgate: { x: -1660, z: 20, name: "the Gate of Tartarus" },
night: { x: 2480, z: -3360, name: "the House of Night" },
sleep: { x: 3300, z: -3300, name: "the Cave of Sleep" },
dreamgates: { x: 3720, z: -3820, name: "the Gates of Horn and Ivory" },
egate: { x: 4240, z: -380, name: "the golden gate of Elysium" },
orph: { x: -340, z: -1880, name: "the steep path's foot" }
};
var EBS_RIVERS = {
acheron: { n: "the Acheron", w: 96, lvl: -2.4, col: 0x3A4A44, pts: [[-4700, 2520], [-3600, 2420], [-2600, 2300], [-1720, 2250], [-900, 2330], [0, 2300], [800, 2260], [1500, 2300], [1900, 2270]] },
cocytus: { n: "the Cocytus", w: 46, lvl: -2.2, col: 0x0C1418, pts: [[-3300, -1420], [-3520, -600], [-3380, 180], [-3000, 900], [-2420, 1600], [-1980, 2060], [-1720, 2250]] },
phleg: { n: "the Phlegethon", w: 40, lvl: -1.6, col: 0xFF6A1A, fire: 1, pts: [[-2160, 600], [-2120, 980], [-1960, 1500], [-1840, 1960], [-1720, 2250]] },
styx: { n: "the Styx", w: 56, lvl: -2.6, col: 0x0A1426, pts: [[-3640, -4120], [-3420, -3760], [-3700, -3460], [-3260, -3200], [-3620, -2900], [-3160, -2620], [-3560, -2320], [-3120, -2060], [-3500, -1780], [-3300, -1420]] },
lethe: { n: "the Lethe", w: 30, lvl: -1.4, col: 0xBCCCD4, pts: [[3300, -3220], [3500, -2800], [3760, -2300], [3980, -1600], [4100, -1000], [4260, -560]] }
};
var EBS_PHLEG_RING = { x: -2160, z: 20, r: 560, w: 40 };
var EBS_PAY = {
ferry: ["Crossing the Acheron with Charon", 15], honey: ["Past Cerberus with the Sibyl's honey cake", 10], lyre: ["Charming Cerberus with Orpheus's tune", 15],
labour: ["The twelfth labour: Cerberus bare-handed", 40], judge: ["Judged worthy of Elysium", 30], springs: ["The Pool of Memory and the password", 20],
orpheus: ["Leading Eurydice up to the light", 50], furies: ["The trial of Orestes: the Furies made kindly", 25], sisyphus: ["Rolling Sisyphus's boulder", 10],
hydra: ["Beating the Hydra of Tartarus", 60], race: ["The Elysian footrace", 20], discus: ["The Elysian discus", 10], er: ["Choosing a life at the Spindle of Necessity", 20],
tour: ["Hermes's tour of the Underworld", 20], lesson: ["A lesson in the Hall of Shades", 5], exam: ["The Psychopomp's examination", 50], horn: ["Leaving by the Gate of Horn", 10]
};
var EBS_KEEP = {
ferry: ["ebs_obol", "Charon's obol (a silver coin, given back)", "🪙"], honey: ["ebs_honeycake", "A crumb of the Sibyl's honey cake", "🍯"], lyre: ["ebs_lyrestring", "A gut string from Orpheus's lyre", "🎵"],
labour: ["ebs_collar", "A link of Cerberus's chain", "⛓️"], judge: ["ebs_verdict", "Minos's verdict on a clay tablet", "📜"], springs: ["ebs_goldleaf", "A gold tablet of the initiates", "🪙"],
orpheus: ["ebs_eurydice", "A white flower Eurydice gave you", "🌼"], furies: ["ebs_kindly", "A torch of the Kindly Ones", "🔥"], sisyphus: ["ebs_pebble", "A pebble from Sisyphus's hill", "🪨"],
hydra: ["ebs_hydrafang", "A fang of the Hydra of Tartarus", "🐍"], race: ["ebs_laurel", "An Elysian laurel crown", "🌿"], discus: ["ebs_discus", "A bronze discus", "🥏"], er: ["ebs_lot", "A lot drawn from the lap of Lachesis", "🎲"],
tour: ["ebs_caduceus", "A feather from Hermes's winged cap", "🪶"], lesson: ["ebs_tablet", "A wax tablet of notes", "📝"], exam: ["ebs_psychopomp", "The Psychopomp's staff", "🔱"], horn: ["ebs_horn", "A sliver of the Gate of Horn", "📯"]
};
function ebsDangerZone(z) { return z === "tartarus" ? 4 : (z === "phleg" || z === "twall") ? 3 : 0; }
function ebsZoneLevel(base) { var d = ebsDangerZone(EBS.zone); return d ? Math.min(base, d) : 0; }
var EBS_BEASTS = {
ebs_fury: { name: "a Fury of Tartarus", body: "kit", arch: "gorgon", scale: 1.1, glow: 0xC0201A, hp: 90, spd: 4.6, dmg: 12, reach: 2.2, shot: { r: 15, c: 0xFF5A2A }, spoil: ["A scale from a Fury's serpent hair", "🐍"], growl: 240 },
ebs_shade: { name: "a hungry shade", body: "kit", arch: "wraith", glow: 0x8AA0D8, hp: 45, spd: 3.8, dmg: 8, reach: 2, spoil: ["A wisp of a shade", "🌫️"], growl: 150 },
ebs_empusa: { name: "an Empusa", body: "kit", arch: "nighthag", scale: 1.05, glow: 0xE07A2A, hp: 70, spd: 4.8, dmg: 11, reach: 2.1, spoil: ["The Empusa's bronze sandal", "👡"], growl: 300 },
ebs_hound: { name: "an ember hound of the Phlegethon", body: "kit", arch: "hellhound", hp: 75, spd: 5.2, dmg: 11, reach: 2.2, spoil: ["An ember hound's fang", "🦷"], growl: 130 },
ebs_flame: { name: "a fire shade of the Phlegethon", body: "kit", arch: "fireelemental", hp: 55, spd: 3.8, dmg: 9, reach: 2, shot: { r: 15, c: 0xFF8A3A }, spoil: ["A coal of the Phlegethon that never cools", "🔥"], growl: 410 },
ebs_harpy: { name: "a Harpy", body: "kit", arch: "harpy", fly: 2.2, hp: 50, spd: 5, dmg: 9, reach: 2, spoil: ["A Harpy's iron feather", "🪶"], growl: 520 },
ebs_titanson: { name: "a giant of the old war", body: "kit", arch: "giant", scale: 0.9, hp: 200, spd: 2.6, dmg: 18, reach: 3, big: 1, spoil: ["A giant's bronze ring", "💍"], growl: 80 },
ebs_hydra: { name: "the Hydra of Tartarus", body: "own", hp: 900, spd: 0.6, dmg: 20, reach: 9, big: 1, shot: { r: 24, c: 0x7AE04A }, spoil: ["A fang of the Hydra of Tartarus", "🐍"], growl: 70 }
};
var EBS_BEASTS_AT = { phleg: ["ebs_hound", "ebs_flame", "ebs_flame", "ebs_hound"], twall: ["ebs_shade", "ebs_harpy", "ebs_hound"], tartarus: ["ebs_fury", "ebs_fury", "ebs_shade", "ebs_empusa", "ebs_harpy", "ebs_titanson", "ebs_shade"] };
var EBS_TOUR = [
{ at: "taenarum", n: "Cape Taenarum", t: "Here at the southern tip of Greece, the ancients said, a cave goes down to the house of Hades. Heracles came this way to fetch Cerberus, and Orpheus to fetch Eurydice. I am Hermes, guide of souls: the dead come down with me, and so, today, do you." },
{ at: "elm", n: "The Vestibule and the Elm of False Dreams", t: "Virgil's Aeneas saw this: a great elm spreading its old arms, and under every leaf a false dream clinging. Round the doorway stand Grief and Cares, pale Disease, sad Old Age, Fear, Hunger, Want, Toil, Death and Death's brother Sleep, and the iron chambers of the Furies." },
{ at: "monsters", n: "The threshold of monsters", t: "Centaurs, two-shaped Scylla, hundred-handed Briareus, the Hydra of Lerna, the Chimaera breathing fire, Gorgons, Harpies, three-bodied Geryon. Aeneas drew his sword on them, and the Sibyl stopped him: they are empty shapes, shadows without bodies. Try it yourself." },
{ at: "landS", n: "The Acheron and Charon", t: "The river of woe, and Charon the ferryman in his patched sail and filthy cloak, his eyes like flames. The Greeks put an obol, a small silver coin, with their dead to pay him. Those who were never buried must wait on this shore a hundred years." },
{ at: "gate", n: "The Gate and Cerberus", t: "Hesiod says Cerberus fawns on everyone who comes in, wagging his tail and ears, but lets no one out again. Three heads in most of the stories, a mane of snakes and a serpent for a tail. Heracles carried him up to the light as his twelfth and last labour." },
{ at: "mourn", n: "The Fields of Mourning", t: "Myrtle woods for those who died of love. Here Aeneas met Dido, Queen of Carthage, and wept; she would not speak to him, and turned back into the shadows." },
{ at: "judge", n: "The Crossroads and the Judges", t: "Plato tells it: three judges sit at the place where the road divides. Minos holds the golden sceptre and gives the final word; Rhadamanthus judges those from Asia, Aeacus those from Europe. The good go right, to the Isles of the Blessed; the wicked left, down to Tartarus." },
{ at: "asph", n: "The Asphodel Meadows", t: "Homer's meadow of asphodel, where the shades of the ordinary dead drift and murmur. Odysseus met Achilles here, who told him he would rather be a poor man's hired hand on earth than king of all the dead." },
{ at: "palace", n: "The Palace of Hades", t: "The house of Hades and Persephone, which the poets call broad-gated, with its bronze threshold. Hades is lord of the dead and of the riches under the earth; Persephone is his queen for half the year, for she ate the seeds of a pomegranate here." },
{ at: "lethe", n: "The Two Springs", t: "The gold tablets buried with the initiates told them: on the left of the house of Hades is a spring with a white cypress by it; do not go near. Further on is cold water flowing from the Lake of Memory, with guardians before it. Tell them who you are." },
{ at: "tgate", n: "The walls of Tartarus", t: "Virgil saw a fortress under a cliff, ringed by three walls and by the Phlegethon's racing flames, its gate held by columns of adamant, an iron tower, and Tisiphone, a Fury, sitting there night and day. Below lies Tartarus, as far beneath as the sky is above." },
{ at: "sleep", n: "The Cave of Sleep and the Gates of Dreams", t: "Ovid's Cave of Sleep, where no cock crows and the Lethe murmurs over pebbles, and the sons of Sleep, Morpheus, Phobetor and Phantasos, shape the dreams of the world. Beyond are the two gates of dreams: true ones through the gate of horn, false ones through the ivory gate." }
];
var EBS_JUDGE = [
["A stranger knocks at your door at night, lost and hungry. The Greeks held xenia, the law of guests, sacred to Zeus. What do you do?", ["Take them in, feed them, and ask their name only after", "Send them on to the next house", "Charge them for the bed"], 0],
["Who carries the souls of the dead down to Hades?", ["Hermes, the guide of souls", "Apollo", "Ares"], 0],
["You find a body by the roadside, unburied. What did the Greeks believe you owed it?", ["Three handfuls of earth at least, so the soul can cross", "Nothing at all", "A song"], 0],
["What did the dead need to pay Charon?", ["An obol, a small silver coin", "A golden apple", "A lock of hair"], 0],
["A friend tells you a secret and asks you to keep it. Later, telling it would win you a prize. What do you do?", ["Keep my word", "Tell it, quietly", "Tell it, loudly"], 0],
["Which of these was punished in Tartarus for trying to cheat death itself, twice?", ["Sisyphus", "Achilles", "Orpheus"], 0],
["You are strong and the man before you is weak, and you have quarrelled. What would Rhadamanthus want?", ["Fairness: settle it justly, not by force", "Take what you want", "Shame him in the market"], 0]
];
var EBS_LIVES = [
["The quiet life of a private person, minding their own affairs", "Odysseus, drawing last, chose this: he had had enough of ambition. He found it lying in a corner where everyone else had passed it by, and said he would have chosen it first."],
["The life of a swan", "Orpheus chose to be a swan, Er saw, rather than be born of a woman again."],
["The life of a nightingale", "Thamyras the singer chose the nightingale's life."],
["The life of a lion", "Ajax, son of Telamon, chose the lion's life: he still remembered the judgement of the arms."],
["The life of an eagle", "Agamemnon chose to be an eagle, from hatred of mankind for all he had suffered."],
["The life of an athlete", "Atalanta chose an athlete's life, seeing the great honours it held."],
["The life of a skilled craftswoman", "Epeius, who built the wooden horse, chose to be a woman skilled in crafts."],
["The life of a tyrant", "The first to choose took the greatest tyranny, and only afterwards saw it held the fate of eating his own children. He wept, and blamed everyone but himself."]
];
var EBS_LESSONS = [
{ k: "rivers", n: "The five rivers", f: ["Styx, the hateful: the gods swore their great oaths by her water, and a god who broke one lay breathless for a year (Hesiod).", "Acheron, the river of woe, where Charon keeps his ferry.", "Lethe, forgetting: the dead drink and forget their lives.", "Phlegethon (or Pyriphlegethon), the river of fire, round Tartarus.", "Cocytus, the river of wailing, a branch of the Styx."], q: ["Which river did the gods swear by?", ["The Styx", "The Lethe", "The Cocytus"], 0] },
{ k: "obol", n: "Charon's obol", f: ["An obol was a small silver coin of ancient Greece: six made a drachma.", "The Greeks placed one with the dead, often in the mouth, to pay the ferryman.", "Archaeologists have found such coins in graves all over the Greek world.", "The unburied could not cross: they wandered the shore for a hundred years (Virgil)."], q: ["Where was the obol often placed?", ["In the mouth of the dead", "In a temple", "In the river"], 0] },
{ k: "judges", n: "The three judges", f: ["Minos, Rhadamanthus and Aeacus were sons of Zeus, famed for justice in life.", "In Plato's Gorgias, Rhadamanthus judges souls from Asia, Aeacus those from Europe, and Minos has the final word.", "Homer shows Minos holding a golden sceptre, giving judgement among the dead.", "Aeacus later was said to hold the keys of Hades."], q: ["Who gave the final judgement?", ["Minos", "Aeacus", "Hermes"], 0] },
{ k: "tartarus", n: "Tartarus", f: ["Hesiod: a bronze anvil falling from the sky would fall nine days and nights to reach the earth, and nine more to reach Tartarus.", "It is walled with bronze, and Night is poured round it in three rows, like a collar round a neck.", "The Titans were shut in it after their war with the Olympians; the Hundred-Handed guard them.", "Later poets put the great wrongdoers there: Sisyphus, Tantalus, Ixion, the Danaids, Tityos."], q: ["How long would an anvil fall from earth to Tartarus?", ["Nine days and nights", "One hour", "A year"], 0] },
{ k: "elysium", n: "Elysium and the Isles of the Blessed", f: ["Homer: the Elysian plain at the ends of the earth, where life is easiest, with no snow or storm, only the west wind.", "Pindar: the Isles of the Blessed, where breezes blow from the ocean and golden flowers blaze, by the tower of Kronos.", "Virgil: Elysium has its own sun and its own stars, and heroes there wrestle, dance and sing.", "Only the very good, the heroes, and those judged three times pure went there."], q: ["What did Virgil say Elysium has of its own?", ["Its own sun and stars", "Its own Charon", "Its own Cerberus"], 0] },
{ k: "seasons", n: "Persephone and the seasons", f: ["The Homeric Hymn to Demeter: Persephone was picking flowers, and reached for a wonderful narcissus, when the earth opened and Hades carried her off.", "Her mother Demeter searched the world with torches and, in her grief, let nothing grow.", "Zeus sent Hermes to bring her back, but she had eaten a pomegranate seed below.", "So she stays part of every year with Hades: then it is winter; when she comes up, spring comes with her."], q: ["What did Persephone eat below?", ["Pomegranate seeds", "An apple", "Honey cake"], 0] },
{ k: "orpheus", n: "Orpheus and Eurydice", f: ["Eurydice died of a snake bite on her wedding day (Ovid, Virgil).", "Orpheus went down through Taenarum and sang to Hades and Persephone, and even the Furies wept; Sisyphus sat on his stone.", "They let her follow him up, on one condition: he must not look back until they were out.", "At the very edge of the light he turned, and she slipped back into the dark, saying a last farewell he could barely hear."], q: ["What was the one condition?", ["Not to look back", "Not to sing", "Not to speak"], 0] },
{ k: "heracles", n: "Heracles and Cerberus", f: ["The twelfth labour of Heracles was to bring Cerberus up from Hades (Apollodorus).", "Hades allowed it if he could master the dog without weapons.", "Heracles gripped him round the neck and would not let go, though the serpent tail bit him.", "He showed Cerberus to King Eurystheus, who hid in a jar, and then took the dog back down."], q: ["What did Hades forbid Heracles to use?", ["Weapons", "His hands", "His voice"], 0] },
{ k: "furies", n: "The Furies and the first court", f: ["The Erinyes (Furies) punished crimes against family, above all murder: Alecto (unceasing), Megaera (grudging), Tisiphone (avenger of murder).", "Aeschylus's Eumenides (458 BC): they hunt Orestes, who killed his mother to avenge his father.", "Athena set up a court of citizens on the Areopagus hill to judge him: the first trial by jury in the stories.", "The votes were equal; Athena's vote freed Orestes, and she gave the Furies a home and honour in Athens, as the Kindly Ones."], q: ["Where did Athena hold the trial?", ["The Areopagus in Athens", "Mount Olympus", "Charon's boat"], 0] },
{ k: "er", n: "The Myth of Er", f: ["Plato, Republic book X: Er, a soldier killed in battle, woke on his funeral pyre after twelve days and told what he had seen.", "Souls came to a meadow, then to the Spindle of Necessity, where the three Fates sing: Lachesis the past, Clotho the present, Atropos the future.", "Each soul drew a lot and chose its next life: 'the blame is the chooser's; God is blameless'.", "Then they drank from the river of Unmindfulness on the plain of Lethe; the wise drank only a little."], q: ["Who chose the quiet life of a private person?", ["Odysseus", "Agamemnon", "Ajax"], 0] },
{ k: "tablets", n: "The gold tablets", f: ["Thin gold leaves inscribed with directions for the dead have been found in graves in Greece and southern Italy, from the 400s BC on.", "They warn: do not drink from the spring by the white cypress (forgetting); go on to the Lake of Memory.", "The dead must say to its guardians: 'I am a child of Earth and starry Heaven'.", "They were buried with initiates of mystery cults that promised a better life after death."], q: ["What tree stands by the spring of forgetting?", ["A white cypress", "A golden oak", "A black olive"], 0] },
{ k: "journeys", n: "Journeys below", f: ["Odyssey book 11: Odysseus calls up the dead at the edge of the world and speaks with Tiresias, his mother, and Achilles.", "Aeneid book 6: Aeneas goes down with the Sibyl of Cumae, carrying the golden bough as a gift for Proserpina, and sees the whole underworld.", "Aristophanes' Frogs (405 BC): the god Dionysus rows across the lake with Charon while frogs sing 'Brekekekex koax koax'.", "Aeneas leaves by the ivory gate, the gate of false dreams: scholars still argue why."], q: ["What did Aeneas carry as a gift for Proserpina?", ["The golden bough", "A pomegranate", "A lyre"], 0] }
];
var EBS_LYRE = [196, 220, 247, 262, 294, 330, 392];
var EBS_TUNE = [2, 4, 3, 1, 5];
function ebsLiteNow() { return typeof LITE !== "undefined" && !!LITE; }
function ebsPhotoTex(name, mpt, nrm) { return __ZC(371, 0, this, arguments, new.target); }
function ebsS(name, col, mpt, o) { return __ZC(371, 1, this, arguments, new.target); }
function ebsStone(k) { return __ZC(371, 2, this, arguments, new.target); }
function ebsCanvas(key, w, h, fn, rep) {
if (EBS.tex[key])
return EBS.tex[key];
var t = wTex(w, h, fn, rep || null);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (EBS.tex[key] = t);
}
function ebsM(key, make) { return EBS.mats[key] || (EBS.mats[key] = make()); }
function ebsLam(col, o) { return __ZC(371, 3, this, arguments, new.target); }
function ebsGlowM(col, op, add) {
var k = "g" + col + "|" + (op || 1) + "|" + (add ? 1 : 0);
return ebsM(k, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} if (add)
m.blending = THREE.AdditiveBlending; m.userData.noPhoto = 1; return m; });
}
function ebsMeander(fg, bg) { return __ZC(371, 4, this, arguments, new.target); }
function ebsFresco(kind) { return __ZC(371, 5, this, arguments, new.target); }
function ebsFireTex() { return __ZC(371, 6, this, arguments, new.target); }
function ebsRippleTex() { return __ZC(371, 7, this, arguments, new.target); }
function ebsVeinTex() { return __ZC(371, 8, this, arguments, new.target); }
function ebsAsphTex() { return __ZC(371, 9, this, arguments, new.target); }
var EBS_CELL = 64;
function ebsCellKeys(x0, z0, x1, z1) {
var out = [], a = Math.floor(x0 / EBS_CELL), b = Math.floor(x1 / EBS_CELL), c = Math.floor(z0 / EBS_CELL), d = Math.floor(z1 / EBS_CELL);
for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j);
return out;
}
function ebsGridAdd(S) {
var g = EBS.sgrid || (EBS.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42;
ebsCellKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); });
}
function ebsSolid(x, z, w, d, y0, y1, rot) {
var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -20 : y0, y1: y1 === undefined ? 80 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) };
EBS.solids.push(S);
ebsGridAdd(S);
return S;
}
function ebsRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -20 : y0, y1: y1 === undefined ? 80 : y1 }; EBS.solids.push(S); ebsGridAdd(S); return S; }
function ebsSolidOff(S) { if (!S)
return; S.off = true; }
function ebsSolidAt(x, z, feet) { return __ZC(371, 10, this, arguments, new.target); }
function ebsFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, inside: !!o.inside, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r }; EBS.floors.push(F); return F; }
function ebsRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; EBS.floors.push(F); return F; }
function ebsFloorIn(F, x, z) {
var dx = x - F.x, dz = z - F.z;
if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r;
var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c;
return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd;
}
function ebsFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function ebsFloorAt(x, z, feet) { var best = null; for (var i = 0; i < EBS.floors.length; i++) {
var F = EBS.floors[i];
if (F.off || !ebsFloorIn(F, x, z))
continue;
var y = ebsFloorY(F, x, z);
if (y <= feet + 0.95 && (best === null || y > best))
best = y;
} return best; }
function ebsInsideWalk(x, z) { for (var i = 0; i < EBS.floors.length; i++) {
var F = EBS.floors[i];
if (F.inside && !F.off && ebsFloorIn(F, x, z))
return true;
} return false; }
function ebsSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; EBS.spots.push(S); return S; }
var EBS_DOORS = [];
function ebsDoor(x, z, r, name, room, y) { EBS_DOORS.push({ x: x, z: z, name: name, room: room }); return ebsSpot(x, z, r || 3, name, "go in", function () { ebsEnterRoom(room); }, y); }
var EBS_LSRC = [];
function ebsLightSrc(x, y, z, col, k, dist, flick) { var S = { x: x, y: y, z: z, col: col, k: k, dist: dist, flick: flick !== false, ph: Math.random() * 20 }; EBS_LSRC.push(S); return S; }
function ebsLightPool(G) {
EBS.pool = [];
var n = EBS.lite ? 3 : 7;
for (var i = 0; i < n; i++) {
var L = new THREE.PointLight(0xFF9A50, 0, 30, 2);
L.position.set(0, -500, 0);
G.add(L);
EBS.pool.push({ L: L, src: null });
}
}
function ebsLightPoolTick(dt, L, full) { return __ZC(371, 11, this, arguments, new.target); }
function ebsFlame(g, x, y, z, s, col) { return __ZC(371, 12, this, arguments, new.target); }
function ebsFlameTick(dt) {
EBS.flames.forEach(function (f) { f.ph += dt; var s = 1 + 0.13 * Math.sin(f.ph * 8.3) + 0.07 * Math.sin(f.ph * 5.1); f.m.scale.set(f.s * (1.6 - s * 0.6), f.s * s, f.s * (1.6 - s * 0.6)); });
}
function ebsBrazier(g, x, y, z, s, wx, wz, col) { return __ZC(371, 13, this, arguments, new.target); }
function ebsTorch(g, x, y, z, ry, wx, wz, col) { return __ZC(371, 14, this, arguments, new.target); }
function ebsPerson(seed, x, z, y, o, rot) {
var p;
try {
p = wPerson("ebs" + seed, o || {});
}
catch (e) {
p = new THREE.Group();
wBox(0.5, 1.7, 0.3, ebsLam(0x4A3A2A), 0, 0.85, 0, p);
}
p.position.set(x, y, z);
if (rot !== undefined)
p.rotation.y = rot;
(o && o.parent || EBS.G).add(p);
var P = { g: p, y: y };
EBS.people.push(P);
return P;
}
function ebsShadeify(g, col, op) { return __ZC(371, 15, this, arguments, new.target); }
function ebsTalk(P, name, persona, greet, r, fn) { EBS.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona, greet: greet } }); return P; }
var EBS_SHADE_GEO = null;
function ebsShadeGeo() { return __ZC(371, 16, this, arguments, new.target); }
function ebsCrowd(cx, cz, r, n, yfn, col, op, seed) { return __ZC(371, 17, this, arguments, new.target); }
function ebsCrowdTick(C, dt, L) { return __ZC(371, 18, this, arguments, new.target); }
function ebsAsphodel(cx, cz, r, n, yfn, seed, col) { return __ZC(371, 19, this, arguments, new.target); }
function ebsCrown(g, x, y, z, rx, ry, rz, col, flat) { return __ZC(371, 20, this, arguments, new.target); }
function ebsTree(kind, g, x, y, z, s, seed) { return __ZC(371, 21, this, arguments, new.target); }
function ebsDeadTree(g, x, y, z, s, seed) { return __ZC(371, 22, this, arguments, new.target); }
function ebsRock(g, x, y, z, s, seed, mat) { return __ZC(371, 23, this, arguments, new.target); }
function ebsSignAt(text, x, y, z, g, ry) { var w = Math.max(2, Math.min(6, String(text).length * 0.22)); var s = wSign([String(text)], w, 0.7, "#2A1E14", "#E8D8A8"); s.position.set(x, y, z); if (ry)
s.rotation.y = ry; (g || EBS.G).add(s); return s; }
function ebsW(o, lx, lz) { var c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0); return [o.x + lx * c + lz * s, o.z - lx * s + lz * c]; }
function ebsColumn(g, x, y, z, h, r, mat, capMat) {
var seg = EBS.lite ? 10 : 18, sh = wCyl(r * 0.8, r, h - r * 0.9, mat, x, y + (h - r * 0.9) / 2, z, g, seg);
wCyl(r * 1.25, r * 0.82, r * 0.5, capMat || mat, x, y + h - r * 0.65, z, g, seg);
wBox(r * 2.7, r * 0.4, r * 2.7, capMat || mat, x, y + h - r * 0.2, z, g);
return sh;
}
function ebsIonic(g, x, y, z, h, r, mat, capMat) { return __ZC(371, 24, this, arguments, new.target); }
function ebsSteps(g, o, w, d, n, st, mat) {
var gg = new THREE.Group();
gg.position.set(o.x, o.y, o.z);
gg.rotation.y = o.rot || 0;
g.add(gg);
for (var i = 0; i < n; i++) {
var ww = w + (n - 1 - i) * 1.4, dd = d + (n - 1 - i) * 1.4;
wBox(ww, st, dd, mat, 0, st * (i + 0.5), 0, gg);
ebsFloor(o.x, o.z, ww, dd, o.y + st * (i + 1), { rot: o.rot });
}
return gg;
}
function ebsPediment(g, x, y, z, w, h, dep, mat, ry) { return __ZC(371, 25, this, arguments, new.target); }
function ebsRoof(g, x, y, z, w, len, h, mat) {
var sl = Math.hypot(w / 2, h), a = Math.atan2(h, w / 2);
[-1, 1].forEach(function (sd) { var p = wBox(sl + 0.4, 0.22, len, mat, x + sd * w / 4, y + h / 2, z, g); p.rotation.z = -sd * a; });
wBox(0.5, 0.4, len + 0.2, mat, x, y + h + 0.1, z, g);
}
function ebsTemple(G, o) { return __ZC(371, 26, this, arguments, new.target); }
function ebsHall(G, o) { return __ZC(371, 27, this, arguments, new.target); }
function ebsWallLine(g, x0, z0, x1, z1, y, h, th, mat, crenel) { return __ZC(371, 28, this, arguments, new.target); }
function ebsTower(g, x, y, z, r, h, mat, capMat) { return __ZC(371, 29, this, arguments, new.target); }
function ebsStatue(g, x, y, z, s, mat, o) { return __ZC(371, 30, this, arguments, new.target); }
function ebsStele(g, x, y, z, ry, title, sub, facts, wx, wz) { return __ZC(371, 31, this, arguments, new.target); }
function ebsSm(d, r) { if (d >= r)
return 0; var t = 1 - d / r; return t * t * (3 - 2 * t); }
function ebsSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz, t = L ? ((x - ax) * dx + (z - az) * dz) / L : 0; t = Math.max(0, Math.min(1, t)); return Math.hypot(x - (ax + dx * t), z - (az + dz * t)); }
function ebsPathD(x, z, P) { var b = 1e9, SB = wSegBoxes(P); for (var i = 0; i < P.length - 1; i++) {
if (b < 1e9 && wSegFar(SB, i, x, z, b))
continue;
var d = ebsSegD(x, z, P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]);
if (d < b)
b = d;
} return b; }
var EBS_PBOX = new WeakMap();
function ebsPathFar(x, z, P, m) { return __ZC(371, 32, this, arguments, new.target); }
function ebsRegion(x) {
if (x >= EBS_IN_X - 1000)
return "inside";
if (Math.abs(x - EBS_TAE_X) < 3000)
return "taenarum";
if (Math.abs(x - EBS_TAR_X) < 4000)
return "tartarus";
if (Math.abs(x - EBS_ELY_X) < 4000)
return "elysium";
if (Math.abs(x - EBS_PATH_X) < 2500)
return "path";
return "main";
}
var EBS_STAIR = (function () {
var out = [], z = 4140, y = 240, fl = 6, rise = 40;
out.push({ k: "land", z0: 4120, z1: 4170, y: 240 });
z = 4120;
for (var i = 0; i < fl; i++) {
out.push({ k: "flight", z0: z - 70, z1: z, y0: y - rise, y1: y });
z -= 70;
y -= rise;
if (i < fl - 1) {
out.push({ k: "land", z0: z - 26, z1: z, y: y });
z -= 26;
}
}
out.push({ k: "land", z0: 3470, z1: z, y: 0 });
return out;
})();
function ebsStairY(z) {
for (var i = 0; i < EBS_STAIR.length; i++) {
var S = EBS_STAIR[i];
if (z >= S.z0 && z <= S.z1) {
if (S.k === "land")
return S.y;
return S.y0 + (S.y1 - S.y0) * (z - S.z0) / (S.z1 - S.z0);
}
}
return null;
}
function ebsRimH(x, z) {
var q = Math.pow(Math.pow(Math.abs(x) / 4420, 4) + Math.pow(Math.abs(z) / 4420, 4), 0.25);
return q > 0.93 ? Math.pow(q - 0.93, 1.4) * 26000 * (0.8 + 0.4 * wNoise(x * 0.004, z * 0.004, 3)) : 0;
}
var EBS_RIM_CLEAR = [[0, 4180, 160, 300], [3720, -3820, 140, 260], [4240, -380, 140, 260], [-3200, -3760, 110, 200]];
function ebsRimKeep(x, z) { var k = 1; for (var i = 0; i < EBS_RIM_CLEAR.length; i++) {
var C = EBS_RIM_CLEAR[i], d = Math.hypot(x - C[0], z - C[1]);
if (d < C[2] + C[3])
k = Math.min(k, d < C[2] ? 0 : 1 - ebsSm(d - C[2], C[3]));
} return k; }
function ebsRiverCut(x, z) { return __ZC(371, 33, this, arguments, new.target); }
function ebsLakeD(x, z) { var A = EBS_AT.lake; var dc = Math.hypot(x - A.x, z - A.z) - A.r; var dr = (x > A.x) ? Math.abs(z - A.z) - 300 : 1e9; return Math.min(dc, dr); }
function ebsLandMain(x, z) { return __ZC(371, 34, this, arguments, new.target); }
function ebsWaterMain(x, z) { return __ZC(371, 35, this, arguments, new.target); }
function ebsLandTae(x, z) { return __ZC(371, 36, this, arguments, new.target); }
function ebsWaterTae(x, z) { return ebsLandTae(x, z) < 0 ? { lvl: 0, k: "sea" } : null; }
var EBS_TT = { arrive: { x: 0, z: 1500 }, prison: { x: 0, z: -1250 }, sis: { x: -900, z: -200, h: 110, r: 420 }, tant: { x: 850, z: -150, r: 120 }, ixion: { x: -300, z: 600 }, danaids: { x: 700, z: 700 }, tityos: { x: -1100, z: 800 }, salm: { x: 1150, z: -700 }, hydra: { x: -700, z: -1100, r: 180 }, tower: { x: 0, z: 1680 } };
function ebsLandTar(x, z) { return __ZC(371, 37, this, arguments, new.target); }
function ebsWaterTar(x, z) { return __ZC(371, 38, this, arguments, new.target); }
var EBS_EL = { arrive: { x: 0, z: 1600 }, stadium: { x: -700, z: 500 }, hall: { x: 500, z: 300 }, odeion: { x: -200, z: -300 }, temple: { x: 900, z: -700 }, valley: { x: -900, z: -700, r: 420 }, isle: { x: 0, z: -1500, r: 260 }, sea: -1050 };
var EBS_ERID = [[1500, 1200], [900, 900], [300, 700], [0, 200], [-300, -300], [-500, -800], [-400, -1050]];
function ebsLandEly(x, z) { return __ZC(371, 39, this, arguments, new.target); }
function ebsWaterEly(x, z) {
var lx = x - EBS_ELY_X, E = EBS_EL;
if (ebsPathD(lx, z, EBS_ERID) < 18)
return { lvl: -1.2, k: "eridanus" };
if (Math.hypot(lx - E.valley.x, z - E.valley.z) < 60)
return { lvl: -19.5, k: "lethe" };
if (ebsLandEly(x, z) < -1)
return { lvl: -1, k: "sea" };
return null;
}
var EBS_OP = [[0, 420], [18, 330], [-14, 240], [22, 150], [-10, 60], [16, -30], [-18, -120], [10, -210], [-6, -300], [0, -400]];
function ebsOrphT(z) { return Math.max(0, Math.min(1, (420 - z) / 820)); }
function ebsLandPath(x, z) { var lx = x - EBS_PATH_X, d = ebsPathD(lx, z, EBS_OP), base = ebsOrphT(z) * 70; return d < 4.5 ? base : base + Math.min(60, (d - 4.5) * 6) + wFbm(lx * 0.05, z * 0.05, 61, 2) * 4; }
function ebsLand(x, z) { var r = ebsRegion(x); return r === "main" ? ebsLandMain(x, z) : r === "taenarum" ? ebsLandTae(x, z) : r === "tartarus" ? ebsLandTar(x, z) : r === "elysium" ? ebsLandEly(x, z) : r === "path" ? ebsLandPath(x, z) : 0; }
function ebsWaterAt(x, z) { var r = ebsRegion(x); return r === "main" ? ebsWaterMain(x, z) : r === "taenarum" ? ebsWaterTae(x, z) : r === "tartarus" ? ebsWaterTar(x, z) : r === "elysium" ? ebsWaterEly(x, z) : null; }
function ebsColMain(x, z, h) { return __ZC(371, 40, this, arguments, new.target); }
function ebsColRegion(x, z, h) { return __ZC(371, 41, this, arguments, new.target); }
function ebsTile(G, cx, cz, size, cells, mat, fine) { return __ZC(371, 42, this, arguments, new.target); }
function ebsGroundMat(kind) {
return ebsM("ground" + kind, function () {
var name = { main: "earth", tartarus: "earth", elysium: "grass", taenarum: "b:limestone", path: "b:cave" }[kind] || "earth";
var m = new THREE.MeshLambertMaterial({ vertexColors: true, map: ebsPhotoTex(name, kind === "elysium" ? 4 : 9) });
m.userData.noPhoto = 1;
return m;
});
}
function ebsTerrain(G) { return __ZC(371, 43, this, arguments, new.target); }
function ebsRibbon(pts, w, y) { return __ZC(371, 44, this, arguments, new.target); }
function ebsWaterMat(col, fire, op) { return __ZC(371, 45, this, arguments, new.target); }
function ebsRivers(G) { return __ZC(371, 46, this, arguments, new.target); }
function ebsDim(pts, fn, every) { var carry = every * 0.5; for (var i = 1; i < pts.length; i++) {
var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var d = carry; d < L; d += every)
fn(a[0] + (b[0] - a[0]) * d / L, a[1] + (b[1] - a[1]) * d / L);
carry = (carry - L) % every;
if (carry < 0)
carry += every;
} }
function ebsMistAlong(G, pts, w, lvl, col) { return __ZC(371, 47, this, arguments, new.target); }
function ebsFalls(G) { return __ZC(371, 48, this, arguments, new.target); }
function ebsVaultTex() { return __ZC(371, 49, this, arguments, new.target); }
var EBS_VR = 7600, EBS_VS = 0.2;
function ebsVaultY(x, z) { var d2 = x * x + z * z; return d2 >= EBS_VR * EBS_VR ? -40 : -40 + EBS_VS * Math.sqrt(EBS_VR * EBS_VR - d2); }
function ebsVault(G) { return __ZC(371, 50, this, arguments, new.target); }
var EBS_ENV = {
main: { top: 0x0C0810, low: 0x2E2430, fog: 0x2A2230, fogD: 0.00055, sun: 0.7, sunCol: 0xE0A080, sunDir: [-0.3, 0.8, 0.2], hemi: 1.25, hemiCol: 0xB0B4E0, hemiGround: 0x5A4434, stars: 0 },
descent: { top: 0x0C0810, low: 0x2E2430, fog: 0x2C2430, fogD: 0.0005, sun: 0.7, sunCol: 0xE0A080, sunDir: [-0.3, 0.8, 0.2], hemi: 1.2, hemiCol: 0xB0B4E0, hemiGround: 0x5A4434, stars: 0 },
phleg: { top: 0x140604, low: 0x5A1E10, fog: 0x4A1A0E, fogD: 0.0009, sun: 0.9, sunCol: 0xFF8A4A, sunDir: [0.2, 0.5, 0.3], hemi: 1.1, hemiCol: 0xE89A70, hemiGround: 0x6A2410, stars: 0 },
styx: { top: 0x04060E, low: 0x1E2A40, fog: 0x1C2638, fogD: 0.0009, sun: 0.6, sunCol: 0xA0B0E8, sunDir: [-0.3, 0.8, 0.2], hemi: 1.15, hemiCol: 0x9AAAE0, hemiGround: 0x2A3040, stars: 0 },
night: { top: 0x04040C, low: 0x221A3A, fog: 0x201836, fogD: 0.001, sun: 0.55, sunCol: 0xB0A0F0, sunDir: [-0.3, 0.8, 0.2], hemi: 1.1, hemiCol: 0xA898F0, hemiGround: 0x2A2040, stars: 0.5 },
palace: { top: 0x0C0810, low: 0x30242C, fog: 0x2C222C, fogD: 0.0005, sun: 0.8, sunCol: 0xF0B080, sunDir: [-0.3, 0.8, 0.2], hemi: 1.3, hemiCol: 0xB8B8E0, hemiGround: 0x5A4434, stars: 0 },
taenarum: { top: 0x2A6AD0, low: 0xBFE0F8, fog: 0xC8E0F0, fogD: 0.0005, sun: 1.15, sunCol: 0xFFF4DE, sunDir: [0.5, 0.8, 0.4], hemi: 0.85, hemiCol: 0xCFE4F8, hemiGround: 0x6A5A40, stars: 0 },
tartarus: { top: 0x140404, low: 0x5A160A, fog: 0x4A140A, fogD: 0.001, sun: 1.0, sunCol: 0xFF8A50, sunDir: [0.2, 0.6, 0.3], hemi: 1.3, hemiCol: 0xE8A088, hemiGround: 0x5A1808, stars: 0 },
elysium: { top: 0x4A80E0, low: 0xE8DCC0, fog: 0xDCD8C8, fogD: 0.0004, sun: 0.75, sunCol: 0xFFF0C0, sunDir: [0.6, 0.45, -0.6], hemi: 0.55, hemiCol: 0xFFF4E0, hemiGround: 0x6A8A4A, stars: 0.25 },
path: { top: 0x000000, low: 0x16161E, fog: 0x14141C, fogD: 0.008, sun: 0.35, sunCol: 0x9AA0C0, sunDir: [0, 0.9, -0.4], hemi: 0.45, hemiCol: 0x8A90B0, hemiGround: 0x101010, stars: 0 }
};
function ebsEnvNow(dt) { return __ZC(371, 51, this, arguments, new.target); }
function ebsSnake(g, pts, r, mat, eye) { return __ZC(371, 52, this, arguments, new.target); }
function ebsScales(col) { return ebsS("b:moss", col || 0x2A3A22, 0.6, { shine: 60, spec: 0x6A8A5A, n: 0.8 }); }
function ebsCerberus() { return __ZC(371, 53, this, arguments, new.target); }
function ebsCerbTick(g, dt, awake, look) { return __ZC(371, 54, this, arguments, new.target); }
function ebsBoat() { return __ZC(371, 55, this, arguments, new.target); }
function ebsCharon(seed) { return __ZC(371, 56, this, arguments, new.target); }
function ebsFury(seed, name) { return __ZC(371, 57, this, arguments, new.target); }
function ebsHermes(seed) { return __ZC(371, 58, this, arguments, new.target); }
function ebsHydra() { return __ZC(371, 59, this, arguments, new.target); }
function ebsHydraTick(g, dt, rage) { return __ZC(371, 60, this, arguments, new.target); }
function ebsMonsterShade(arch, s) { return __ZC(371, 61, this, arguments, new.target); }
function ebsDistrict(G, x, z, r, far) { var g = new THREE.Group(); G.add(g); EBS.districts.push({ g: g, x: x, z: z, r: r, far: !!far }); return g; }
function ebsY(x, z) { return ebsLand(x, z); }
function ebsStepTex() { return __ZC(371, 62, this, arguments, new.target); }
var EBS_SHAPES = [
["Grief", "Luctus", "grief", "Grief and avenging Cares have made their beds in the very jaws of the underworld."],
["Cares", "Curae", "grief", "Avenging Cares (Virgil, Aeneid 6.274)."],
["Disease", "Morbi", "stand", "Pale Diseases live here."],
["Old Age", "Senectus", "grief", "And sad Old Age."],
["Fear", "Metus", "raise", "And Fear."],
["Hunger", "Fames", "grief", "And Hunger, that counsels wrong."],
["Want", "Egestas", "stand", "And shameful Want: shapes terrible to see."],
["Toil", "Labor", "stand", "And Toil."],
["Death", "Letum", "sickle", "Then Death, and Death's own brother, Sleep."],
["Sleep", "Sopor", "poppies", "Sleep, the brother of Death (Hesiod calls them both children of Night)."]
];
function ebsDescent(G) { return __ZC(371, 63, this, arguments, new.target); }
function ebsVestibule(G) { return __ZC(371, 64, this, arguments, new.target); }
function ebsRoad(g, pts, w, lamps, col) { return __ZC(371, 65, this, arguments, new.target); }
function ebsAcheron(G) { return __ZC(371, 66, this, arguments, new.target); }
function ebsGrove(G) { return __ZC(371, 67, this, arguments, new.target); }
function ebsGate(G) { return __ZC(371, 68, this, arguments, new.target); }
function ebsBeast(arch, seed, s, tint) { return __ZC(371, 69, this, arguments, new.target); }
function ebsPool(g, x, y, z, r, waterCol, rimMat, glow) { return __ZC(371, 70, this, arguments, new.target); }
function ebsFields(G) { return __ZC(371, 71, this, arguments, new.target); }
function ebsCrossroads(G) { return __ZC(371, 72, this, arguments, new.target); }
function ebsAsphodelMeadow(G) { return __ZC(371, 73, this, arguments, new.target); }
function ebsPalace(G) { return __ZC(371, 74, this, arguments, new.target); }
function ebsSprings(G) { return __ZC(371, 75, this, arguments, new.target); }
function ebsStyx(G) { return __ZC(371, 76, this, arguments, new.target); }
function ebsTartarusWalls(G) { return __ZC(371, 77, this, arguments, new.target); }
function ebsNight(G) { return __ZC(371, 78, this, arguments, new.target); }
function ebsSleep(G) { return __ZC(371, 79, this, arguments, new.target); }
function ebsElysianGate(G) { return __ZC(371, 80, this, arguments, new.target); }
function ebsLookout(G) {
var g = ebsDistrict(G, 0, 4100, 120, true);
wBox(14, 1, 8, ebsStone("dark"), 22, 240, 4110, g);
ebsFloor(22, 4110, 14, 8, 240.5);
ebsSolid(29.4, 4110, 0.8, 8, 236, 243);
ebsSolid(22, 4106, 14, 0.8, 236, 243);
ebsSpot(22, 4110, 5, "The lookout", "look out over the underworld", function () { ebsLookoutCard(); }, 240.5);
}
function ebsBuild(G) {
EBS.districts.length = 0;
ebsDescent(G);
ebsLookout(G);
ebsVestibule(G);
ebsAcheron(G);
ebsGrove(G);
ebsGate(G);
ebsFields(G);
ebsCrossroads(G);
ebsAsphodelMeadow(G);
ebsPalace(G);
ebsSprings(G);
ebsStyx(G);
ebsTartarusWalls(G);
ebsNight(G);
ebsSleep(G);
ebsElysianGate(G);
}
var EBS_IN = {};
function ebsInDef(key, o) { o.key = key; o.i = Object.keys(EBS_IN).length; o.x = EBS_IN_X + o.i * 400; o.z = 0; EBS_IN[key] = o; return o; }
function ebsInAt(x) { if (x < EBS_IN_X - 200)
return null; var k = Math.round((x - EBS_IN_X) / 400); for (var key in EBS_IN)
if (EBS_IN[key].i === k)
return EBS_IN[key]; return null; }
function ebsVeil() { if (EBS.veil)
return EBS.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#05040A;opacity:0;pointer-events:none;transition:opacity .6s ease;z-index:43"; document.body.appendChild(v); EBS.veil = v; return v; }
function ebsGround(x, z, feet) { var f = ebsFloorAt(x, z, feet === undefined ? 1e4 : feet), l = ebsLand(x, z); if (ebsRegion(x) === "inside")
return f === null ? 0 : f; return f === null ? l : Math.max(f, l); }
function ebsMove(x, z, yawTo, msg, y, after) { return __ZC(371, 81, this, arguments, new.target); }
function ebsInBuild(I) { return __ZC(371, 82, this, arguments, new.target); }
function ebsEnterRoom(key, alt) { return __ZC(371, 83, this, arguments, new.target); }
function ebsLeaveRoom() { var O = EBS.outside; if (!O) {
ebsMove(EBS_AT.landN.x, EBS_AT.landN.z + 20, 0, null);
return;
} EBS.outside = null; ebsMove(O.x, O.z, O.yaw, null, O.y); }
function ebsInDrop() { return __ZC(371, 84, this, arguments, new.target); }
function ebsInFloor(grp, cx, cz, w, d, y, mat) { var m = wBox(w, 0.3, d, mat, cx, y - 0.15, cz, grp); ebsFloor(cx, cz, w, d, y, { inside: true }); return m; }
function ebsIWall(grp, x0, z0, x1, z1, h, mat, gaps, y) { return __ZC(371, 85, this, arguments, new.target); }
function ebsInRoom(grp, cx, cz, w, d, h, o) { return __ZC(371, 86, this, arguments, new.target); }
function ebsLamp(grp, x, y, z, col) { var br = ebsStone("bronze"); wCyl(0.02, 0.02, 1.2, br, x, y + 0.6, z, grp, 3); var b = wSph(0.32, br, x, y, z, grp, 8); b.scale.y = 0.45; ebsFlame(grp, x, y + 0.2, z, 0.45, col); ebsLightSrc(x, y, z, col || 0xFF9A50, 1.1, 22); }
function ebsInDoorOut(grp, x, z, ry, label) { return __ZC(371, 87, this, arguments, new.target); }
function ebsLook(x, z, r, name, sub, facts, y, verb) { return ebsSpot(x, z, r || 2.6, name, verb || "look", function () { worldCard(worldFacts(name, sub || "", [], facts)); }, y || 0); }
function ebsThrone(grp, x, y, z, ry, s, mat, trim) { return __ZC(371, 88, this, arguments, new.target); }
function ebsTable(grp, x, y, z, w, d, ry, mat) { return __ZC(371, 89, this, arguments, new.target); }
function ebsKline(grp, x, y, z, ry, mat) { return __ZC(371, 90, this, arguments, new.target); }
function ebsAmphora(grp, x, y, z, s, col) { return __ZC(371, 91, this, arguments, new.target); }
function ebsChest(grp, x, y, z, ry, mat, open) { return __ZC(371, 92, this, arguments, new.target); }
function ebsScrolls(grp, x, y, z, w, h, ry) { return __ZC(371, 93, this, arguments, new.target); }
function ebsHearth(grp, x, y, z, r, col) { return __ZC(371, 94, this, arguments, new.target); }
function ebsLoom(grp, x, y, z, ry, clothCol) { return __ZC(371, 95, this, arguments, new.target); }
function ebsInPerson(grp, seed, x, z, look, rot, shade) { var P = ebsPerson(seed, x, z, 0, { sex: look.sex || "m", look: look, parent: grp }, rot); if (shade)
ebsShadeify(P.g, shade, 0.6); return P; }
function ebsInFury(grp, seed, name, x, z, rot, s) { var f = ebsFury(seed, name); f.position.set(x, 0, z); f.rotation.y = rot || 0; if (s)
f.scale.multiplyScalar(s); grp.add(f); var P = { g: f, y: 0 }; EBS.people.push(P); return P; }
ebsInDef("iron", { name: "the Iron Chambers of the Furies", arrive: [0, 16, 0],
say: "⛓️ <b>The Iron Chambers of the Furies.</b> Virgil's <i>ferrei Eumenidum thalami</i>: walls of iron, red torchlight, and the avenging sisters on their seats. They try those who wronged their own family. You can stand trial before them.",
build: function (grp, I) { return __ZC(371, 96, this, arguments, new.target); } });
ebsInDef("boathouse", { name: "Charon's boathouse", arrive: [0, 9, 0],
say: "⛵ <b>Charon's boathouse.</b> Where the ferryman mends his boat: a slipway down to the grey water, oars and poles, nets, and a great bronze basin brimming with the obols of the dead.",
build: function (grp, I) { return __ZC(371, 97, this, arguments, new.target); } });
ebsInDef("den", { name: "Cerberus's den", arrive: [0, 12, 0],
say: "🐕 <b>Cerberus's den.</b> A cave of black rock, warm and rank. Gnawed bones, a heap of fleeces for a bed, the great chain Heracles once led him up into the light with. If the dog is here, you could try the twelfth labour: wrestle him with your bare hands.",
build: function (grp, I) { return __ZC(371, 98, this, arguments, new.target); } });
ebsInDef("gatehouse", { name: "the Gatehouse of Hades", arrive: [0, 10, 0],
say: "🗝️ <b>The Gatehouse.</b> Aeacus's hall: the great bronze keys of Hades on the wall, the scales, benches for those waiting, and the doorkeeper's table where (in Aristophanes' <i>Frogs</i>) Dionysus came knocking dressed as Heracles.",
build: function (grp, I) { return __ZC(371, 99, this, arguments, new.target); } });
ebsInDef("judge", { name: "the Hall of Judgement", arrive: [0, 24, 0],
say: "⚖️ <b>The Hall of Judgement.</b> Minos in the middle with his golden sceptre, Rhadamanthus beside him; Aeacus's seat is empty while he keeps the gate. Behind them, two doors: the right-hand way up to Elysium, the left-hand way down. Stand on the bronze disc to be judged.",
build: function (grp, I) { return __ZC(371, 100, this, arguments, new.target); } });
ebsInDef("palace", { name: "the Palace of Hades", arrive: [0, 18, 0],
say: "👑 <b>The Palace of Hades.</b> The great hall: four black columns round a hearth of blue-white fire, the throne of the Unseen King. Doors lead off to the banquet hall (west), the treasury (east), the Hall of Orpheus (north), and beyond the banquet hall, the Chairs of Forgetfulness.",
build: function (grp, I) { return __ZC(371, 101, this, arguments, new.target); } });
ebsInDef("persephone", { name: "Persephone's rooms", arrive: [0, 14, 0],
say: "🌸 <b>Persephone's rooms.</b> The queen's chamber: her loom, her chests of spring flowers that never fade, a painted wall of the upper world in spring, a little sheaf of her mother's wheat, the bowl of pomegranate seeds, and the owl Ascalaphus on his perch.",
build: function (grp, I) { return __ZC(371, 102, this, arguments, new.target); } });
var EBS_HEROINES = [["Tyro", "daughter of Salmoneus, loved by Poseidon, who wrapped her in a dark wave; mother of Pelias and Neleus."], ["Antiope", "mother of Amphion and Zethus, who built the walls of Thebes: Amphion's lyre made the stones move into place."], ["Alcmene", "mother of Heracles."], ["Chloris", "the youngest daughter of Amphion, queen of Pylos, mother of wise old Nestor."], ["Leda", "mother of Castor and Polydeuces (Pollux), the twins who live and die on alternate days."], ["Phaedra, Procris and Ariadne", "three queens of Athens and Crete; Ariadne gave Theseus the thread that led him out of the labyrinth."], ["Epicaste (Jocasta)", "the mother of Oedipus, queen of Thebes."], ["Iphimedeia", "mother of the giant twins Otus and Ephialtes, who piled Mount Ossa on Olympus and Pelion on Ossa to climb to heaven."]];
ebsInDef("shades", { name: "the Hall of Shades", arrive: [0, 20, 0],
say: "🌫️ <b>The Hall of Shades.</b> A long hall with a dark pool down its length. In the Odyssey, Odysseus poured offerings and the famous dead came to drink and tell their stories. Touch the water to call one.",
build: function (grp, I) { return __ZC(371, 103, this, arguments, new.target); } });
ebsInDef("stables", { name: "the stables of Hades", arrive: [0, 12, 0],
say: "🐎 <b>The stables of Hades.</b> Four black horses in their stalls, the ones that drew the golden chariot up through the earth when he took Persephone. Their names come from Claudian's poem: Orphnaeus, Aethon, Nycteus and Alastor.",
build: function (grp, I) { return __ZC(371, 104, this, arguments, new.target); } });
ebsInDef("styxhouse", { name: "the house of Styx", arrive: [0, 10, 0],
say: "💧 <b>The house of Styx.</b> Silver pillars, cold air, the sound of falling water. The golden jug Iris carries, the stone of oaths, and four statues: Styx's children Victory, Power, Force and Rivalry, who stand by Zeus's throne.",
build: function (grp, I) { return __ZC(371, 105, this, arguments, new.target); } });
ebsInDef("tower", { name: "the iron tower", arrive: [0, 8, 0],
say: "🗼 <b>The iron tower.</b> Inside the tower where Tisiphone keeps watch: iron walls, her whips on their hooks, and arrow slits looking down into Tartarus. From here you can see who is punished there, as the Sibyl told Aeneas.",
build: function (grp, I) { return __ZC(371, 106, this, arguments, new.target); } });
ebsInDef("night", { name: "the House of Night", arrive: [0, 22, 0],
say: "🌑 <b>The House of Night.</b> A hall with a roof of stars. Night's children live here: the three Fates spinning, measuring and cutting the thread of every life, and Death himself, winged and iron-hearted.",
build: function (grp, I) { return __ZC(371, 107, this, arguments, new.target); } });
ebsInDef("sleep", { name: "the Cave of Sleep", arrive: [0, 16, 0],
say: "💤 <b>The Cave of Sleep.</b> Ovid's cave: silence, a dim glow, the murmur of the Lethe over its pebbles. On an ebony couch with black feathers, the god Sleep lies dozing, and round him the dreams hang thick as leaves.",
build: function (grp, I) { return __ZC(371, 108, this, arguments, new.target); } });
function ebsTX(x) { return EBS_TAR_X + x; }
function ebsEX(x) { return EBS_ELY_X + x; }
function ebsKX(x) { return EBS_TAE_X + x; }
function ebsTaenarum(G) { return __ZC(371, 109, this, arguments, new.target); }
ebsInDef("poseidon", { name: "the temple of Poseidon", arrive: [0, 12, 0],
say: "🔱 <b>The temple of Poseidon at Taenarum.</b> The god's bronze statue with his trident, offerings of ships and dolphins, and at the back a stair cut in the rock: the shrine where the ancients called up the dead.",
build: function (grp, I) { return __ZC(371, 110, this, arguments, new.target); } });
function ebsTartarus(G) { return __ZC(371, 111, this, arguments, new.target); }
ebsInDef("titans", { name: "the prison of the Titans", arrive: [0, 26, 0],
say: "⛓️ <b>The prison of the Titans.</b> Behind bronze gates, in the misty dark: Kronos and the Titans who fought Zeus for ten years, chained, with the Hundred-Handed on guard. Atlas is not here; he holds up the sky by the House of Night.",
build: function (grp, I) { return __ZC(371, 112, this, arguments, new.target); } });
var EBS_DANAIDS_JARS = null;
ebsInDef("danaids", { name: "the Danaids' hall", arrive: [0, 12, 0],
say: "🏺 <b>The Danaids' hall.</b> The daughters of Danaus carry water from a fountain in jars full of holes, to fill a great jar that has no bottom. You can try to help.",
build: function (grp, I) { return __ZC(371, 113, this, arguments, new.target); } });
function ebsElysium(G) { return __ZC(371, 114, this, arguments, new.target); }
ebsInDef("heroes", { name: "the Hall of Heroes", arrive: [0, 22, 0],
say: "🏛️ <b>The Hall of Heroes.</b> The blessed feast here: Cadmus who founded Thebes, old Peleus, and others. Garlands on every couch, painted walls of their deeds, and the light of Elysium's own sun through the door.",
build: function (grp, I) { return __ZC(371, 115, this, arguments, new.target); } });
ebsInDef("odeion", { name: "the odeion", arrive: [0, 13, 0],
say: "🎶 <b>The odeion.</b> Elysium's music hall: Orpheus in his long robe plays here for the blessed (Virgil). Sit and listen, or try his lyre yourself.",
build: function (grp, I) { return __ZC(371, 116, this, arguments, new.target); } });
ebsInDef("necessity", { name: "the Temple of Necessity", arrive: [0, 13, 0],
say: "🌀 <b>The Temple of Necessity.</b> From Plato's Myth of Er: the Spindle of Necessity turning in her lap, its eight nested whorls the circles of the heavens, a Siren singing one note on each, and the three Fates. Here souls choose their next lives.",
build: function (grp, I) { return __ZC(371, 117, this, arguments, new.target); } });
ebsInDef("kronos", { name: "the Tower of Kronos", arrive: [0, 9, 0],
say: "🗼 <b>The Tower of Kronos.</b> On the Isles of the Blessed: Kronos, freed at last, is king here, and Rhadamanthus judges beside him. A golden age, the old one, before work and sorrow.",
build: function (grp, I) { return __ZC(371, 118, this, arguments, new.target); } });
function ebsOrphPath(G) { return __ZC(371, 119, this, arguments, new.target); }
function ebsGoTae() { ebsMove(EBS_TAE_X, -66, Math.PI, "☀️ <b>Out into the sunlight at Cape Taenarum,</b> the southern tip of Greece. The temple of Poseidon stands on its terrace; the sea is all round."); }
function ebsTarGate() { return __ZC(371, 120, this, arguments, new.target); }
function ebsElyGate() { return __ZC(371, 121, this, arguments, new.target); }
var EBS_H = "<div style='font:600 17px var(--serif,Georgia);color:#E8D0FF'>";
function ebsData() { var d = store.ebs; if (!d || typeof d !== "object")
d = store.ebs = {}; if (!Array.isArray(d.keeps))
d.keeps = []; d.lessons = d.lessons || {}; d.done = d.done || {}; return d; }
function ebsSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function ebsKeep(icon, name, why) { var d = ebsData(); d.keeps.push({ i: icon, n: name, w: why || "", at: Date.now() }); if (d.keeps.length > 200)
d.keeps.splice(0, d.keeps.length - 200); ebsSave(); }
function ebsSignedIn() { return typeof cityRpc === "function" && typeof signedIn === "function" && signedIn(); }
function ebsPayLine(kind) { return __ZC(371, 122, this, arguments, new.target); }
function ebsReward(kind, say) { return __ZC(371, 123, this, arguments, new.target); }
function ebsStateFetch() { return __ZC(371, 124, this, arguments, new.target); }
var EBS_AC = null;
function ebsAudio() { if (EBS_AC)
return EBS_AC; try {
var C = window.AudioContext || window.webkitAudioContext;
if (C)
EBS_AC = new C();
}
catch (e) { } return EBS_AC; }
function ebsTone(f, dur, type, vol, when) { return __ZC(371, 125, this, arguments, new.target); }
function ebsPluck(f, when) { ebsTone(f, 1.4, "triangle", 0.2, when); ebsTone(f * 2, 0.6, "sine", 0.06, when); }
function ebsCroak(when) { var A = ebsAudio(); if (!A)
return; for (var i = 0; i < 3; i++)
ebsTone(90 + Math.random() * 40, 0.08, "square", 0.08, (when || 0) + i * 0.07); }
function ebsGrowl() { ebsTone(70, 0.9, "sawtooth", 0.12); ebsTone(55, 1.1, "sawtooth", 0.1, 0.1); }
function ebsChoose(title, lines, opts) {
var h = EBS_H + title + "</div>" + (lines || []).map(function (l) { return "<div style='opacity:.9;line-height:1.45;margin-top:6px'>" + l + "</div>"; }).join(""), fns = {};
(opts || []).forEach(function (o, i) { h += worldBtn("o" + i, o[0], ""); fns["o" + i] = function () { o[1](); }; });
worldCard(h, fns);
}
function ebsShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function ebsAsk(title, q, opts, right, ok, no, extra) {
var order = ebsShuffle(opts.map(function (o, i) { return i; }));
ebsChoose(title, [esc(q)].concat(extra || []), order.map(function (i) { return [esc(opts[i]), function () { if (i === right)
ok();
else
no(i); }]; }));
}
function ebsSibyl() { return __ZC(371, 126, this, arguments, new.target); }
function ebsMonstersStrike() { return __ZC(371, 127, this, arguments, new.target); }
function ebsLookoutCard() { return __ZC(371, 128, this, arguments, new.target); }
function ebsCharonTalk() { return __ZC(371, 129, this, arguments, new.target); }
function ebsFerry(dir) { return __ZC(371, 130, this, arguments, new.target); }
function ebsFerryTick(C, dt) { return __ZC(371, 131, this, arguments, new.target); }
function ebsCerbPass(kind, say) { var d = ebsData(); d.passed = 1; ebsSave(); if (EBS.cerb) {
ebsSolidOff(EBS.cerb.block);
EBS.cerb.asleep = kind === "honey" ? 1 : 0.5;
} worldCard(null); if (kind)
ebsReward(kind, say);
else
setStatus(say); }
function ebsCerbTalk() { return __ZC(371, 132, this, arguments, new.target); }
function ebsLabour() { return __ZC(371, 133, this, arguments, new.target); }
function ebsLyrePlay(teach, onWin) { return __ZC(371, 134, this, arguments, new.target); }
function ebsJudge() { return __ZC(371, 135, this, arguments, new.target); }
function ebsFuriesTrial() { return __ZC(371, 136, this, arguments, new.target); }
function ebsSpring(kind) { return __ZC(371, 137, this, arguments, new.target); }
function ebsOrpheusOffer() { return __ZC(371, 138, this, arguments, new.target); }
function ebsOrpheusStart() { return __ZC(371, 139, this, arguments, new.target); }
function ebsOrpheusTick(R, dt) { return __ZC(371, 140, this, arguments, new.target); }
function ebsOath() { return __ZC(371, 141, this, arguments, new.target); }
function ebsSisyphus() { return __ZC(371, 142, this, arguments, new.target); }
function ebsTantalus() { return __ZC(371, 143, this, arguments, new.target); }
function ebsDanaids() { return __ZC(371, 144, this, arguments, new.target); }
function ebsHydraWake() { return __ZC(371, 145, this, arguments, new.target); }
function ebsHydraSpawn() { return __ZC(371, 146, this, arguments, new.target); }
function ebsHydraTickAll(dt) { return __ZC(371, 147, this, arguments, new.target); }
function ebsRaceStart() { return __ZC(371, 148, this, arguments, new.target); }
function ebsRaceTick(R, dt) { return __ZC(371, 149, this, arguments, new.target); }
function ebsDiscus() { return __ZC(371, 150, this, arguments, new.target); }
function ebsEr() { return __ZC(371, 151, this, arguments, new.target); }
function ebsDreamGate(kind) { return __ZC(371, 152, this, arguments, new.target); }
function ebsObol() { var d = ebsData(); if (!d.obol) {
d.obol = 1;
ebsSave();
setStatus("🪙 The priest gives you an <b>obol</b> for Charon. The cave is just behind the temple.");
}
else
setStatus("🪙 \"You have your obol already. Keep it safe.\""); }
function ebsTourAt(k) { return __ZC(371, 153, this, arguments, new.target); }
function ebsTourOffer() { return __ZC(371, 154, this, arguments, new.target); }
function ebsTourStop(i) { return __ZC(371, 155, this, arguments, new.target); }
function ebsLessonAt(x, z, k) { return __ZC(371, 156, this, arguments, new.target); }
function ebsLesson(k) { return __ZC(371, 157, this, arguments, new.target); }
function ebsLessonList() { return __ZC(371, 158, this, arguments, new.target); }
function ebsExam() { return __ZC(371, 159, this, arguments, new.target); }
function ebsFrogs() { return __ZC(371, 160, this, arguments, new.target); }
function ebsRideOff() { EBS.cine = null; }
function ebsZoneAt(x, z) { return __ZC(371, 161, this, arguments, new.target); }
var EBS_PLACES = [["top", 120, "the top of the Descent"], ["foot", 120, "the foot of the Descent"], ["vest", 260, "the Vestibule"], ["iron", 60, "the Iron Chambers"], ["monsters", 90, "the threshold of monsters"], ["landS", 200, "the shore of the Acheron"], ["landN", 160, "the far bank of the Acheron"], ["lake", 820, "the Acherusian Lake"], ["grove", 600, "the Grove of Persephone"], ["rock", 140, "the Rock of the Two Rivers"],
["gate", 200, "the Gate of Hades"], ["mourn", 400, "the Fields of Mourning"], ["wardead", 400, "the fields of the war-dead"], ["cross", 120, "the Crossroads"], ["judge", 120, "the Hall of Judgement"], ["hecate", 50, "Hecate's shrine"], ["palace", 460, "the Palace of Hades"], ["lethe", 120, "the pool by the white cypress"], ["memory", 140, "the Lake of Memory"], ["orph", 140, "Orpheus's cleft"],
["styx", 400, "the house of Styx"], ["tmouth", 720, "the walls of Tartarus"], ["night", 360, "the House of Night"], ["sleep", 360, "the Cave of Sleep"], ["dreamgates", 200, "the Gates of Horn and Ivory"], ["egate", 240, "the gate of Elysium"], ["asph", 1600, "the Asphodel Meadow"]];
function ebsPlaceName(L) { return __ZC(371, 162, this, arguments, new.target); }
function ebsBlock(x, z, feet) { return __ZC(371, 163, this, arguments, new.target); }
function ebsFxTick(dt, L) { return __ZC(371, 164, this, arguments, new.target); }
function ebsVisTick(L) { return __ZC(371, 165, this, arguments, new.target); }
function ebsTick(dt) { return __ZC(371, 166, this, arguments, new.target); }
function ebsBakeTree(D) { return __ZC(371, 167, this, arguments, new.target); }
function ebsWorldBuild(G) { return __ZC(371, 168, this, arguments, new.target); }
function ebsHome() { ebsRideOff(); EBS.run = null; if (EBS.eury)
EBS.eury.g.visible = false; worldHome("<b>Back from " + EBS_NAME + ".</b> 'Easy is the way down; to come back up, that is the labour.' You managed it."); }
if (typeof worldDef === "function")
worldDef(EBS_KEY, {
base: EBS.base, far: 16000, ownSky: true, tone: 180,
env: function () { return ebsEnvNow(); },
build: function (G) { ebsWorldBuild(G); },
enter: function (opt) { return __ZC(371, 169, this, arguments, new.target); },
leave: function () { ebsRideOff(); EBS.run = null; if (EBS.veil)
EBS.veil.style.opacity = "0"; EBS.moving = false; EBS.outside = null; if (EBS.hydra && EBS.hydra.B) {
try {
dgbRemove(EBS.hydra.B);
}
catch (e) { }
EBS.hydra.B = null;
DGB.force = false;
} },
ground: function (x, z, feet) { if (EBS.cine)
return feet; return ebsGround(x, z, feet); },
block: function (x, z, feet) { return ebsBlock(x, z, feet); },
tick: function (dt) { ebsTick(dt); },
back: function () { ebsHome(); }
});
function ebsGo(opt) {
if (EBS.state && EBS.state.open === false && !ebsKeeper()) {
setStatus("🔱 <b>" + EBS_NAME + " is closed for now</b> by the Keeper. Try again later.");
return false;
}
return worldGo(EBS_KEY, opt || {});
}
if (typeof WLG !== "undefined" && WLG.keys.indexOf(EBS_KEY) < 0)
WLG.keys.push(EBS_KEY);
function ebsForget() { return __ZC(371, 170, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () {
var f = worldLetGo;
worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === EBS_KEY)
ebsForget(); return r; };
})();
function ebsFromLand() { return __ZC(371, 171, this, arguments, new.target); }
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.underworld !== "function")
return;
var orig = LD_SETS.underworld;
LD_SETS.underworld = function (P) {
orig.apply(this, arguments);
try {
P.make(130, -186, 0, 7, function (G) {
var rk = new THREE.MeshLambertMaterial({ color: 0x2A2426 }), dk = new THREE.MeshBasicMaterial({ color: 0x030204 });
[-1, 1].forEach(function (s) { var r = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 0), rk); r.position.set(s * 5.4, 3, 0); r.scale.set(0.8, 1.4, 0.9); G.add(r); });
var top = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 0), rk);
top.position.set(0, 8, -0.6);
top.scale.set(1.3, 0.6, 0.9);
G.add(top);
var m = new THREE.Mesh(new THREE.CircleGeometry(3.6, 16, 0, Math.PI), dk);
m.position.set(0, 0, 0.9);
G.add(m);
for (var i = 0; i < 4; i++) {
var st = new THREE.Mesh(new THREE.BoxGeometry(5, 0.3, 0.8), rk);
st.position.set(0, 0.15 - i * 0.3, 0.4 - i * 0.8 + 3);
G.add(st);
}
[-1, 1].forEach(function (s) { var t = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.6, 6), new THREE.MeshLambertMaterial({ color: 0x3A2A1A })); t.position.set(s * 3.4, 2, 1.4); G.add(t); if (typeof wGlow === "function") {
var gl = wGlow(0xFF8A3A, 2.2, 0.7);
gl.position.set(s * 3.4, 3, 1.4);
G.add(gl);
} });
}, { hw: 8, hd: 2.5, h: 8 });
var card = ["The Mouth of Erebos", "the way down to the Greek underworld", ["Press E again to go down."]];
card.ebs = 1;
P.fact(130, -180, 5, "The Mouth of Erebos", "go down into the underworld", card);
var c2 = ["Charon", "\"All the way down?\"", ["Press E again to go down."]];
c2.ebs = 1;
P.fact(9, -46, 3, "Charon: \"All the way down?\"", "ask him to take you to Erebos", c2);
P.sign(124, -176, 0.2, ["The Mouth of Erebos", "the whole Greek underworld below"], ["The Mouth of Erebos", "Erebos: the darkness under the earth", ["Hesiod names Erebos, the darkness, among the first things born from Chaos. The Greeks used the word for the whole dark underworld.", "Down this cleft lies the underworld as the ancient poets told it: Homer, Hesiod, Virgil, Ovid and Plato."]]);
}
catch (e) {
if (window.console)
console.warn("[erebos] land", e);
}
};
})();
if (typeof ldUse === "function")
(function () { var lu = ldUse; ldUse = function (T) { if (T && T.card && T.card.ebs) {
ebsFromLand();
return;
} return lu.apply(this, arguments); }; })();
function ebsTravel(where) { return __ZC(371, 172, this, arguments, new.target); }
function ebsMenu() { return __ZC(371, 173, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-erebos"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-erebos";
b.title = EBS_NAME;
b.textContent = "🔱 Erebos";
b.onclick = function () { ebsMenu(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1750);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-ebs]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-ebs", "1");
b.textContent = "🔱 " + EBS_NAME + " (the head of the stair)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } ebsGo({}); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
setTimeout(function () {
try {
var m = /[?&]kerebos=([a-z0-9]+)/.exec(location.search);
if (!m)
return;
var where = { tartarus: "tar", elysium: "ely", palace: "palace", gate: "gate", taenarum: "tae" }[m[1]] || "top";
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!ebsKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
ebsTravel(where);
try {
var q = new URLSearchParams(location.search);
q.delete("kerebos");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === EBS_KEY; })) {
DGR_WORLDS.push([EBS_KEY, EBS_NAME + " (Safe everywhere but the Phlegethon's banks and the walls of Tartarus, which are Dangerous, and Tartarus, which is Deadly)", 4, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[EBS_KEY] = { id: EBS_KEY, name: EBS_NAME, def: 4, group: "hidden" };
}
(function () {
if (typeof dgrLevelOf === "function") {
var lo = dgrLevelOf;
dgrLevelOf = function (id) { var n = lo.apply(this, arguments); if (id === EBS_KEY && typeof WLD !== "undefined" && WLD.on === EBS_KEY)
return ebsZoneLevel(n); return n; };
}
if (typeof DGB_KINDS !== "undefined")
Object.keys(EBS_BEASTS).forEach(function (k) { DGB_KINDS[k] = EBS_BEASTS[k]; });
if (typeof dgbList === "function") {
var dl = dgbList;
dgbList = function () { if (typeof WLD !== "undefined" && WLD.on === EBS_KEY) {
return EBS_BEASTS_AT[EBS.zone] || EBS_BEASTS_AT.tartarus;
} return dl.apply(this, arguments); };
}
if (typeof dgbBarred === "function") {
var db = dgbBarred;
dgbBarred = function (x, z, feet) {
if (typeof WLD !== "undefined" && WLD.on === EBS_KEY) {
var zn = ebsZoneAt(x, z);
if (!ebsDangerZone(zn))
return true;
if (ebsWaterAt(x, z) !== null)
return true;
if (ebsSolidAt(x, z, feet || ebsLand(x, z)))
return true;
if (zn === "tartarus" && Math.hypot(x - (EBS_TAR_X + EBS_TT.arrive.x), z - EBS_TT.arrive.z) < 40)
return true;
}
return db.apply(this, arguments);
};
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === EBS_KEY; }))
try {
DK_PLACES.push([EBS_KEY, EBS_NAME]);
}
catch (e) { }
})();
function ebsHasBough() { try {
return typeof raOwns === "function" && raOwns("goldenbough");
}
catch (e) {
return false;
} }
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.goldenbough)
return;
var d = { k: "goldenbough", name: "The Golden Bough", icon: "🌿", at: EBS_KEY, seed: [0, 0], spot: "stump", mark: 0xE8C040,
what: "a dark holm-oak with one bough that glints", look: "Deep in the grove, among black poplars, a holm-oak. In the dark green of its leaves, one bough shines: leaves of gold that tinkle faintly when the air moves.", act: "Reach up and pluck the bough",
open: "It comes away easily in your hand, as the Sibyl said it would for the one the Fates have called. At once, Virgil says, another golden branch begins to grow in its place.",
tale: "The Sibyl told Aeneas: 'Hidden in a shady tree is a bough, golden in leaf and pliant stem, sacred to the queen of the underworld. No one may go down into the hidden places of the earth until they pluck it' (Aeneid 6.136-148). Two doves sent by his mother Venus led him to it. With it, Charon let him cross, and at the threshold of the palace of Dis he fixed it as a gift to Persephone.",
rumour: "The Sibyl at the Vestibule says the golden bough grows somewhere in the Grove of Persephone, west across the shore. Watch for two white doves." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.goldenbough = d;
RA.order.push("goldenbough");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "goldenbough") {
var key = "goldenbough@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.goldenbough;
if (c && c.key === key)
return c;
var B = EBS_AT.bough, x = B.x + 2.4, z = B.z + 2.4;
return (RA.spots.goldenbough = { x: x, z: z, y: ebsLand(x, z) + 0.2, key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.goldenbough = function () {
var g = new THREE.Group(), gm = new THREE.MeshPhongMaterial({ color: 0xE8C040, emissive: 0x4A3008, shininess: 110, specular: 0xFFF0C0 });
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.02, 0.5, 5), gm);
st.rotation.z = 0.5;
st.position.y = 0.22;
g.add(st);
for (var i = 0; i < 9; i++) {
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), gm);
lf.scale.set(1, 0.25, 2);
lf.position.set(-0.1 + i * 0.03, 0.12 + i * 0.025, (i % 2 ? 0.03 : -0.03));
lf.rotation.y = i;
g.add(lf);
}
var glow = wGlow(0xFFE080, 0.5, 0.25);
glow.position.y = 0.25;
g.add(glow);
return { g: g, h: 0.5, anim: function (dt) { g.rotation.y += dt * 0.3; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.goldenbough = { n: "The Fated Branch", col: 0xE8C040, cd: 45, pas: { speed: 1.08, regen: 1.4 },
act: [{ aoe: 16, dmg: 80, knock: 6 }, { aoe: 16, slow: 7 }],
pasT: "The way opens for you: you move 8% faster and heal a little all the time; Charon takes you across without a coin.",
actT: "Persephone's Gift: a ring of golden light bursts from the bough: 80 to every foe within 16 m, thrown back; then they are slowed for 7 seconds (dreamers too, where dreamers may fight). A soft gold glow, never a flash." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.ebs;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
var by = {};
d.keeps.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Keepsakes from " + EBS_NAME) + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("");
}
if (d && d.oath)
h += bkpRow("💧 Your oath by the Styx", esc(d.oath));
}
catch (e) { }
return h;
};
})();
function ebsTest() { return { EBS: EBS, go: ebsGo, travel: ebsTravel, zoneAt: ebsZoneAt, ground: ebsGround, land: ebsLand, water: ebsWaterAt, enter: ebsEnterRoom, leave: ebsLeaveRoom, move: ebsMove, doors: EBS_DOORS, rooms: EBS_IN, data: ebsData, block: ebsBlock }; }
var EBS_ROADS = [];
function ebsNearRoad(x, z, m) { for (var i = 0; i < EBS_ROADS.length; i++) {
var R = EBS_ROADS[i];
if (x < R.x0 - m - R.w || x > R.x1 + m + R.w || z < R.z0 - m - R.w || z > R.z1 + m + R.w)
continue;
if (ebsPathD(x, z, R.pts) < R.w / 2 + m)
return true;
} return false; }
function ebsRoadNote(pts, w) { var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; pts.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); }); EBS_ROADS.push({ pts: pts, w: w, x0: x0, x1: x1, z0: z0, z1: z1 }); }
function ebsFreeAt(x, z, r) { return __ZC(371, 174, this, arguments, new.target); }
function ebsMany(geo, mat, n, place, o) { return __ZC(371, 175, this, arguments, new.target); }
function ebsBoulderGeo(seed, detail) { return __ZC(371, 176, this, arguments, new.target); }
function ebsSpireGeo(seed, h) { return __ZC(371, 177, this, arguments, new.target); }
function ebsCrystalGeo() { var parts = [], r = wRand(77); for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(0.18 + r() * 0.12, 1.2 + r() * 1.4, 5);
c.translate(0, 0.6, 0);
c.rotateZ((r() - 0.5) * 0.9);
c.rotateX((r() - 0.5) * 0.9);
c.translate((r() - 0.5) * 0.5, 0, (r() - 0.5) * 0.5);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }
function ebsStoneSlabGeo() { var a = new THREE.BoxGeometry(0.8, 1.3, 0.18); a.translate(0, 0.55, 0); var top = new THREE.CylinderGeometry(0.4, 0.4, 0.18, 10, 1, false, 0, Math.PI); top.rotateX(Math.PI / 2); top.rotateZ(Math.PI / 2); top.rotateY(Math.PI / 2); top.translate(0, 1.2, 0); return gwMerge([a.toNonIndexed(), top.toNonIndexed()]); }
function ebsBrokenColGeo() { return __ZC(371, 178, this, arguments, new.target); }
function ebsPoplarGeo() { var t = new THREE.CylinderGeometry(0.12, 0.3, 4, 6); t.translate(0, 2, 0); var c = new THREE.SphereGeometry(1, EBS.lite ? 6 : 8, EBS.lite ? 4 : 7); c.scale(1.1, 3.6, 1.1); c.translate(0, 6.5, 0); return [t, c]; }
function ebsDeadGeo() { return __ZC(371, 179, this, arguments, new.target); }
function ebsMistTex() { return __ZC(371, 180, this, arguments, new.target); }
function ebsRimQ(x, z) { return Math.pow(Math.pow(Math.abs(x) / 4420, 4) + Math.pow(Math.abs(z) / 4420, 4), 0.25); }
function ebsMainSpot(R, rmin, margin) {
for (var t = 0; t < 4; t++) {
var x = (R() - 0.5) * 8400, z = (R() - 0.5) * 8400;
if (ebsRimQ(x, z) > 0.95)
continue;
if (ebsRegion(x) !== "main")
continue;
if (z > 3460 && Math.abs(x) < 120)
continue;
if (!ebsFreeAt(x, z, margin || 2))
continue;
return { x: x, z: z };
}
return null;
}
function ebsDress(G) { return __ZC(371, 181, this, arguments, new.target); }
var EBS_SW = {};
function ebsSwFree(x, z, y, r) {
if (typeof ebsNearRoad === "function" && ebsNearRoad(x, z, 1.5))
return false;
for (var a = 0; a < 6; a++) {
var px = x + Math.cos(a * 1.047) * r, pz = z + Math.sin(a * 1.047) * r;
if (ebsSolidAt(px, pz, y + 0.3))
return false;
if (Math.abs(ebsLand(px, pz) - y) > 1.2)
return false;
}
return !ebsSolidAt(x, z, y + 0.3);
}
function ebsSwAsphodel(G, cx, cz, r0, r1, n, seed) { return __ZC(371, 182, this, arguments, new.target); }
function ebsSwShades(G, cx, cz, r0, r1, n, seed, col) { return __ZC(371, 183, this, arguments, new.target); }
function ebsSwStele(G, x, z, y, rot, seed) { return __ZC(371, 184, this, arguments, new.target); }
function ebsSwOffering(G, x, z, y, rot, seed) { return __ZC(371, 185, this, arguments, new.target); }
function ebsSwChains(G, x, z, y, rot) { return __ZC(371, 186, this, arguments, new.target); }
function ebsSwPlace(G, cx, cz, o, seed) { return __ZC(371, 187, this, arguments, new.target); }
function ebsSweep(G0) { return __ZC(371, 188, this, arguments, new.target); }
(function () {
if (typeof ebsDress !== "function")
return;
var d = ebsDress;
ebsDress = function (G) { var r = d.apply(this, arguments); try {
ebsSweep(G);
}
catch (e) {
if (window.console)
console.warn("[erebos] sweep", e);
} return r; };
})();
