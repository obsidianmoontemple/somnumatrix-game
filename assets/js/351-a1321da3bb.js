/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var OVY_CH = [
{ k: "troy", at: "troy", part: 1, title: "The Wooden Horse", book: "Books 4 and 8", ashore: true,
goal: "Hide in the wooden horse, keep silent, and open the gates of Troy",
keep: ["🐴", "Splinter of the wooden horse", "A pale sliver of fir from the horse's flank, from the night the war ended."],
homer: ["Homer never tells the whole story of the horse in one place: Helen remembers it in Book 4, and the bard Demodocus sings it in Book 8. The fuller telling is in Virgil's Aeneid, written about 700 years later.", "Inside the horse a soldier called Anticlus wanted to answer Helen when she called in his wife's voice. Odysseus held his mouth shut until she went away.", "On the way home, Odysseus' fleet raided Ismarus, the town of the Cicones, and stayed too long feasting; the Cicones came back with their neighbours and the Greeks lost men from every ship (Book 9). It was the first of many delays."] },
{ k: "lotus", at: "lotus", part: 1, title: "The Lotus-Eaters", book: "Book 9", ashore: true,
goal: "Find your three scouts who ate the lotus, and bring them back to the ship",
keep: ["🪷", "Pressed lotus flower", "A flower from the Lotus-Eaters' groves, pressed flat. Its scent still makes you forget what you were doing."],
homer: ["Odysseus sent three men inland to find out who lived there. The Lotus-Eaters meant them no harm; they simply shared their food.", "Whoever tasted the honey-sweet fruit no longer wanted to bring news or go home. Odysseus dragged them back weeping, tied them under the benches, and sailed before anyone else could taste it."] },
{ k: "cyclops", at: "cyclops", part: 1, title: "Nobody's Escape", book: "Book 9", ashore: true,
goal: "Outwit Polyphemus in his cave, and get out alive",
keep: ["🐑", "Tuft of ram's fleece", "Thick, curly wool from the belly of the Cyclops' great ram, where you clung on."],
homer: ["Odysseus brought a goatskin of very strong dark wine, a gift from Maron, a priest he had spared at Ismarus. The Cyclops drank three bowls of it.", "When the other Cyclopes heard Polyphemus roar and asked who was hurting him, he shouted 'Nobody!' and they went home.", "As his ship pulled away, Odysseus could not resist shouting his real name. Polyphemus prayed to his father Poseidon, and that curse is why the voyage home took ten years."] },
{ k: "aeolia", at: "aeolia", part: 1, title: "The Bag of Winds", book: "Book 10", ashore: true,
goal: "Take the bag of winds from Aeolus, then stay awake all the way home",
keep: ["🪢", "Silver cord from the bag of winds", "The shining cord that tied the ox-hide bag shut. Hold it to your ear and you can hear a breeze."],
homer: ["Aeolus gave Odysseus every stormy wind, tied in an ox-hide bag with a silver cord, and sent a gentle west wind to blow him home.", "For nine days and nights Odysseus held the sail ropes himself. On the tenth day, with the fires of Ithaca in sight, he fell asleep. His crew opened the bag, sure it held gold, and the storm winds blew them all the way back to Aeolia.", "Aeolus refused to help again: a man the gods hated so much, he said, must not be helped."] },
{ k: "telepylus", at: "telepylus", part: 1, title: "The Harbour of the Giants", book: "Book 10", sea: true, near: 1500,
goal: "Choose where to moor at Telepylus, and escape the giants' boulders",
keep: ["🪨", "Pebble from the giants' harbour", "A smooth grey pebble, chipped off one of the boulders the Laestrygonians threw."],
homer: ["Eleven of Odysseus' twelve ships sailed into the calm harbour, ringed by cliffs. Odysseus alone tied his ship to a rock outside its mouth.", "The Laestrygonians, giants, gathered on the cliffs and smashed the ships with boulders. Only Odysseus' ship, outside, got away; he cut the cable with his sword and his men rowed for their lives."] },
{ k: "aeaea", at: "aeaea", part: 1, title: "Circe's Menagerie", book: "Book 10", ashore: true,
goal: "Win back your crew from Circe, without joining her menagerie yourself",
keep: ["🌼", "Sprig of moly", "Black root, white flower. Hermes said it was hard for mortals to dig; you managed it."],
homer: ["Circe welcomed Odysseus' scouts with cheese, barley, honey and wine, and a drug in it; one tap of her wand and they were pigs, though their minds stayed their own. Only Eurylochus stayed outside and ran back to tell.", "On the way to rescue them, Odysseus met Hermes, looking like a young man, who gave him the herb moly. Circe's potion did nothing to him; she swore an oath and turned his men back, younger and taller and handsomer than before.", "They stayed with her a whole year, feasting."] },
{ k: "cimmeria", at: "cimmeria", part: 1, title: "Speaking with the Dead", book: "Books 10 and 11", ashore: true,
goal: "Pour the offerings, hold back the shades, and hear Tiresias first",
keep: ["🍂", "Poplar leaf from Persephone's grove", "A silvery leaf from the grove at the edge of the world. It never quite turns brown."],
homer: ["Circe told Odysseus to sail to the edge of the world, dig a pit and pour offerings for the dead: milk and honey, then sweet wine, then water, with white barley sprinkled over.", "The first shade to come was Elpenor, a young crewman who had fallen from Circe's roof; he asked to be buried properly, and Odysseus promised. Then came his own mother, Anticleia, whom he had not known was dead. He held her back, weeping, until Tiresias had drunk.", "Tiresias warned him: leave the Sun's cattle unharmed and you may all reach home; harm them, and you will come home late, alone, in a stranger's ship, to trouble in your house."] },
{ k: "sirens", at: "sirens", part: 1, title: "The Sirens' Song", book: "Book 12", sea: true, near: 2600,
goal: "Stop your crew's ears, be tied to the mast, and hear the song as you pass",
keep: ["🕯️", "Beeswax plug", "A soft, honey-smelling plug of beeswax. Your crew needed it more than you did."],
homer: ["Circe told Odysseus how to pass the Sirens. He softened a cake of beeswax in the sun, stopped his men's ears with it, and had them tie him upright to the mast.", "When he heard the song he begged to be untied. Perimedes and Eurylochus only tied him tighter, and the crew rowed on until the singing faded."] },
{ k: "strait", at: "strait", part: 1, title: "Scylla and Charybdis", book: "Book 12", sea: true, near: 2000,
goal: "Sail the strait between Scylla's cliff and Charybdis' whirlpool",
keep: ["🐚", "Whorled shell from the strait", "A spiral shell, twisted like the water in Charybdis."],
homer: ["Circe said: pass close to Scylla's cliff, because it is better to lose six men than the whole ship. Do not stop to fight her.", "Odysseus put on his armour and took two spears anyway, and stood at the bow watching for her. He never saw her coming. Six heads swept down and took six of his best men.", "Later, shipwrecked, he drifted back to Charybdis on a broken mast and saved himself by leaping up and clinging like a bat to the fig tree above the whirlpool until she spat his timbers out again."] },
{ k: "thrinacia", at: "thrinacia", part: 1, title: "The Cattle of the Sun", book: "Book 12", ashore: true,
goal: "Keep your crew fed for a month of contrary winds, and leave the Sun's cattle alone",
keep: ["✨", "Sun-gold tuft", "A tuft of golden hair caught on a thorn where the Sun's cattle graze. Not one of them was harmed for it."],
homer: ["The south wind blew for a whole month. When the ship's food ran out, the men fished and hunted birds with bent hooks, and still they starved.", "Odysseus went inland to pray and fell asleep. Eurylochus persuaded the crew to kill the best of the cattle, promising the Sun a temple at home. The hides crept along the ground and the meat lowed on the spits.", "When they sailed, Zeus struck the ship with a thunderbolt. Only Odysseus lived, clinging to the keel and mast, and drifted nine days to Calypso's island."] },
{ k: "ogygia", at: "ogygia", part: 1, title: "Calypso's Island", book: "Book 5", ashore: true,
goal: "Choose home over forever, build a raft, and survive Poseidon's storm",
keep: ["🪵", "Peg from your raft", "A wooden peg, smoothed by an adze, from the raft you built yourself. The rest of it is driftwood now."],
homer: ["Calypso kept Odysseus seven years and offered to make him immortal and ageless. He sat on the shore every day, weeping for home.", "Zeus sent Hermes to tell her to let him go. She gave him a bronze axe, an adze and augers, and showed him where the tall dry trees grew. He felled twenty and built the raft in four days.", "On the eighteenth day at sea Poseidon saw him and raised a storm. The sea-goddess Ino gave him her veil to tie round himself, and he swam for two days and nights to the coast of Scheria."] },
{ k: "scheria", at: "scheria", part: 1, title: "The Phaeacians", book: "Books 6 to 8 and 13", ashore: true,
goal: "Win the Phaeacians' help: Nausicaa, the queen, the games and your story",
keep: ["🥏", "Phaeacian discus", "A heavy stone discus from the games of the Phaeacians. Yours went further than theirs."],
homer: ["Nausicaa told Odysseus to go to the palace and clasp the knees of her mother, Queen Arete, not her father: if the queen liked him, he would get home.", "A young Phaeacian called Euryalus mocked him at the games. Odysseus picked up a discus bigger than any of theirs and threw it past every mark.", "When Demodocus sang of the wooden horse, Odysseus wept, and told them who he was. The Phaeacians carried him home in one night, asleep, with their gifts."] },
{ k: "ithaca", at: "ithaca", part: 1, title: "Homecoming", book: "Books 13 to 23", ashore: true,
goal: "Come home in disguise, string the great bow, and win back your house",
keep: ["🏹", "Arrow of the twelve axes", "A long arrow with grey goose feathers. It flew through the rings of twelve axes and never touched one."],
homer: ["Athena disguised Odysseus as an old beggar. He stayed with Eumaeus, his loyal swineherd, and there made himself known to his son Telemachus.", "Old Eurycleia, his nurse, knew him by the scar on his leg, from a boar hunt in his youth, when she washed his feet. He made her keep silent.", "Penelope set the contest: whoever could string Odysseus' bow and shoot through twelve axes would marry her. None of the suitors could even string it. Odysseus did it sitting on his stool.", "Penelope tested him last: she told the maid to move their bed. Only Odysseus knew it could not be moved, because he had built it round the trunk of a living olive tree."] },
{ k: "pylos", at: "pylos", part: 2, title: "Telemachus at Pylos", book: "Book 3", ashore: true,
goal: "As Telemachus: join Nestor's feast, mind your manners, and ask about your father",
keep: ["🏖️", "Sand of Pylos", "A little jar of the pale sand of sandy Pylos, from the shore where the bulls were offered."],
homer: ["Telemachus was guided by Athena, disguised as Mentor, an old friend of the family. He was shy of speaking to so famous a king; she told him the words would come.", "Nestor's son Peisistratus offered the cup first to Mentor, as the elder of the two guests.", "Nestor had no news of Odysseus, but told how the Greeks had scattered on the way home from Troy, and sent Telemachus on to Menelaus by chariot, with Peisistratus to drive."] },
{ k: "sparta", at: "sparta", part: 2, title: "The Hall of Menelaus", book: "Book 4", ashore: true,
goal: "As Telemachus: be welcomed by Menelaus and Helen, choose a gift, and hear the news",
keep: ["🥣", "Little silver bowl", "A small copy of the silver mixing bowl with a gold rim that Menelaus gave Telemachus. The real one was the work of Hephaestus."],
homer: ["Helen knew Telemachus at once by his likeness to his father. Menelaus said he would give him three horses and a fine chariot.", "Telemachus answered that rocky Ithaca had no wide meadows for horses. Menelaus laughed, liked him for it, and gave him a silver mixing bowl instead.", "Then Menelaus told what the Old Man of the Sea had told him on Pharos: that Odysseus was alive, held by the nymph Calypso."] },
{ k: "pharos", at: "pharos", part: 2, title: "The Old Man of the Sea", book: "Book 4", ashore: true,
goal: "As Menelaus: hide under a sealskin, seize Proteus, and hold on through every shape",
keep: ["🦭", "Scrap of sealskin", "A scrap of the fresh sealskin Eidothea gave you to hide under. It smells of the sea (and worse)."],
homer: ["Menelaus was stuck twenty days on Pharos with no wind. Eidothea, Proteus' daughter, took pity on him.", "She hid him and three men under fresh sealskins, and put sweet ambrosia under their noses against the smell. At noon Proteus came up, counted his seals, counted the men among them without noticing, and lay down.", "They seized him and held on while he became a lion, a serpent, a leopard, a great boar, running water and a tall tree, until he gave up and answered."] }
];
var OVY_BY = {};
OVY_CH.forEach(function (c, i) { c.n = i + 1; OVY_BY[c.k] = c; });
var OVY_PART = { 1: "Part One · The Voyage of Odysseus", 2: "Part Two · Telemachus' Journey" };
var OVY = { k: null, D: null, G: null, S: null, builtFor: null, done: {}, mine: null, veil: null, line: "", beast: null, moly: null, floors: [], night: 0, mist: 0, raft: null, lock: null, sing: 0 };
try {
OVY.done = JSON.parse(localStorage.getItem("somnu.voyage") || "{}") || {};
}
catch (e) {
OVY.done = {};
}
function ovySave() { try {
localStorage.setItem("somnu.voyage", JSON.stringify(OVY.done));
}
catch (e) { } }
function ovyOn() { return typeof WLD !== "undefined" && WLD.on === "sea" && typeof SEA !== "undefined"; }
function ovySigned() { return typeof signedIn === "function" && signedIn(); }
function ovyKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function ovySay(h) { if (typeof setStatus === "function")
setStatus(h); }
function ovyTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function ovyRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function ovyMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function ovyL() { return worldLocal(); }
function ovyY(x, z) { for (var i = 0; i < OVY.floors.length; i++) {
var f = OVY.floors[i];
if (Math.abs(x - f.x) < f.hw && Math.abs(z - f.z) < f.hd)
return f.y;
} return Math.max(seaHeight(x, z), -1.2); }
function ovyHead(t, c) { return "<div data-ovy='1' style='font:600 17px var(--serif,Georgia);color:" + (c || "#FFE7B0") + "'>" + t + "</div>"; }
function ovyP(t) { return "<div style='margin:6px 0'>" + t + "</div>"; }
function ovyNear(x, z, r) { var L = ovyL(); return Math.hypot(L.x - x, L.z - z) < r; }
function ovyDist(x, z) { var L = ovyL(); return Math.hypot(L.x - x, L.z - z); }
function ovyFree(x, z, r) { return typeof wmsFree === "function" ? wmsFree(x, z, r) : { x: x, z: z }; }
function ovyAt(o, x, z, face) { o.position.set(x, ovyY(x, z), z); if (face != null)
o.rotation.y = face; return o; }
function ovyFace(x, z, tx, tz) { return Math.atan2(tx - x, tz - z); }
function ovyMan(seed, look, x, z, o) { o = o || {}; var g = wPerson("ovy_" + seed, { sex: o.sex || "m", species: o.species, look: look, scale: o.scale }); ovyAt(g, x, z, o.face); (o.into || OVY.G).add(g); return g; }
var OVY_GREEK = function (c, f) { return { top: c, topKind: f ? "dress" : "robe", bottom: c, shoes: 0x8A6A42, hat: "none", layer: "tunic", layerColor: c }; };
function ovyBeast(kind, s, x, z, into) { try {
var a = build({ id: "ovy_" + kind + "_" + Math.random().toString(36).slice(2, 7), archetype: kind, attrs: { s: s || 1 }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
ovyAt(a, x, z, Math.random() * 6);
(into || OVY.G).add(a);
return a;
}
catch (e) {
return null;
} }
function ovyGhostly(g, op) { return __ZC(351, 0, this, arguments, new.target); }
function ovyVeil(html, secs, then) { return __ZC(351, 1, this, arguments, new.target); }
function ovyVeilOff() { if (OVY.veil) {
clearTimeout(OVY.veilT);
OVY.veil.style.opacity = "0";
OVY.veil.style.display = "none";
} }
function ovyPut(x, z, face) { if (SEA.aboard) {
SEA.aboard = false;
} camera.position.set(SEA.base + x, ovyY(x, z) + 1.72, z); if (face != null) {
yaw = face + Math.PI;
} pitch = 0; if (typeof flyY !== "undefined")
flyY = 0; }
function ovyAshore(k, x, z) { var p = SEA_BY[k]; if (!p)
return; seaAshore(p); worldCard(null); if (x != null)
ovyPut(x, z, ovyFace(x, z, p.x, p.z)); }
function ovyCourse(k) { return __ZC(351, 2, this, arguments, new.target); }
function ovyGoal(x, z, name) { if (OVY.D)
OVY.D.goal = x == null ? null : { x: x, z: z, name: name }; }
function ovyArrow(dx, dz) { var a = "➜"; try {
if (typeof bearingOf === "function" && typeof pfindArrow === "function")
a = pfindArrow(bearingOf(dx, dz));
}
catch (e) { } return a; }
function ovyMine(force) {
if (!ovySigned()) {
OVY.mine = null;
return Promise.resolve(null);
}
if (OVY.mine && !force)
return Promise.resolve(OVY.mine);
return ovyRpc("voyage_my", {}).then(function (o) { OVY.mine = (o && o.done) || []; return OVY.mine; }).catch(function () { OVY.mine = OVY.mine || []; return OVY.mine; });
}
function ovyHas(k) { return !!(OVY.mine && OVY.mine.some(function (r) { return r.key === k; })); }
function ovyCount(part) { return OVY_CH.filter(function (c) { return (!part || c.part === part) && OVY.done[c.k]; }).length; }
function ovyBook(msg) { return __ZC(351, 3, this, arguments, new.target); }
function ovyChapterCard(k) { return __ZC(351, 4, this, arguments, new.target); }
function ovyHomer(k, extra) { return __ZC(351, 5, this, arguments, new.target); }
function ovyStart(k) { return __ZC(351, 6, this, arguments, new.target); }
function ovyReady(c) {
var p = SEA_BY[c.at];
if (!p)
return false;
if (c.ashore)
return !SEA.aboard && SEA.shore === p;
return SEA.aboard && Math.hypot(SEA.sx - p.x, SEA.sz - p.z) < c.near;
}
function ovyBegin() { var D = OVY.D, c = OVY_BY[D.k]; D.s = 0; D.t = 0; try {
OVY_PLAY[D.k].begin(D);
}
catch (e) {
if (window.console)
console.warn("[voyage] begin", e);
} }
function ovyStage(s, goal) { var D = OVY.D; if (!D)
return; D.s = s; D.t = 0; if (goal)
ovyGoal(goal[0], goal[1], goal[2]);
else if (goal === null)
ovyGoal(null); }
function ovyEnd(won, honour, line) { return __ZC(351, 7, this, arguments, new.target); }
function ovyTick(dt) { return __ZC(351, 8, this, arguments, new.target); }
function ovyPromptNow(L) { return __ZC(351, 9, this, arguments, new.target); }
function ovyAsk(name, verb, fn) { return ["<b>" + name + "</b> · <b>press E</b> to " + verb, fn]; }
function ovyChoose(title, body, opts) {
var h = ovyHead(title) + (body ? "<div style='margin:6px 0'>" + body + "</div>" : ""), fns = {};
opts.forEach(function (o, i) { h += worldBtn("o" + i, o[0], o[1] || null); fns["o" + i] = function () { worldCard(null); o[2](); }; });
worldCard(h, fns);
}
function ovyTell(title, lines, next, label) {
var h = ovyHead(title) + lines.map(function (t) { return ovyP(t); }).join(""), fns = {};
if (next) {
h += worldBtn("n", label || "Go on", null);
fns.n = function () { worldCard(null); next(); };
}
worldCard(h, fns);
}
function ovyDark(op, html) { return __ZC(351, 10, this, arguments, new.target); }
var OVY_PLAY = {};
OVY_PLAY.troy = { min: 30,
spots: function () { var p = SEA_BY.troy, cx = p.x, cz = p.z + 40; return { horse: { x: cx, z: cz - 52 }, gate: { x: cx, z: cz - 42.5 }, side: { x: cx + 4.5, z: cz - 54 } }; },
begin: function (D) { var S = this.spots(); ovyStage(0, [S.horse.x, S.horse.z - 6, "the wooden horse"]); ovySay("<b>The Wooden Horse.</b> Ten years of war, and Troy still stands. Epeius has built a great hollow horse of fir. Climb inside with the best of the Greeks; the rest of the army sails out of sight."); },
line: function (D) { return D.s === 0 ? "climb into the horse" : D.s === 1 ? "keep silent in the dark" : D.s === 2 ? "open the gates" : ""; },
tick: function (D, dt) { return __ZC(351, 11, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 12, this, arguments, new.target); },
end: function (D) { ovyDark(0); OVY.night = 0; }
};
OVY_PLAY.lotus = { min: 30,
begin: function (D) { return __ZC(351, 13, this, arguments, new.target); },
line: function (D) { var n = D.men.filter(function (m) { return m.st !== "lost"; }).length; return n < 3 ? "found " + n + " of 3 scouts" : "bring them to the landing"; },
tick: function (D, dt, L) { return __ZC(351, 14, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 15, this, arguments, new.target); }
};
OVY_PLAY.cyclops = { min: 60,
spots: function () { var p = SEA_BY.cyclops, cx = p.x + 40, cz = p.z - 90; return { cx: cx, cz: cz, mouth: { x: cx, z: cz + 15.6 }, jar: { x: cx - 9, z: cz - 2 }, trunk: { x: cx + 8.5, z: cz - 6.5 }, fire: { x: cx - 2, z: cz - 4 }, back: { x: cx, z: cz - 7 } }; },
giant: function () { return SEA.cyclops && SEA.cyclops.g; },
walls: function (D, on) { return __ZC(351, 16, this, arguments, new.target); },
begin: function (D) { return __ZC(351, 17, this, arguments, new.target); },
line: function (D) { return ["find the cave", "answer the giant", "make him drunk: three bowls", "make the stake", "use it", "get out of the cave", "back to the ship"][D.s] || ""; },
tick: function (D, dt, L) { return __ZC(351, 18, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 19, this, arguments, new.target); },
end: function (D) { var G = this.giant(); this.walls(D, false); if (G && D.gp) {
G.position.set(D.gp[0], ovyY(D.gp[0], D.gp[1]), D.gp[1]);
G.rotation.y = D.gp[2];
G.userData.pose = null;
if (SEA.cyclops)
SEA.cyclops.wander = D.wander;
} }
};
OVY_PLAY.aeolia = { min: 50,
begin: function (D) { var p = SEA_BY.aeolia; ovyStage(0, [p.x + 3, p.z + 14, "Aeolus"]); ovySay("<b>The Bag of Winds.</b> Aeolus, keeper of the winds, has feasted you a whole month on his floating island inside its wall of bronze. Ask him for help to get home."); },
line: function (D) { return D.s === 0 ? "ask Aeolus" : D.s === 1 ? "back aboard" : D.s === 2 ? "stay awake: " + (D.ok || 0) + " of 9 hours of watch" : ""; },
tick: function (D, dt) { return __ZC(351, 20, this, arguments, new.target); },
prompt: function (D) { return __ZC(351, 21, this, arguments, new.target); },
end: function (D) { ovyDark(0); if (SEA.wind > 1000)
SEA.wind = 0; }
};
OVY_PLAY.telepylus = { min: 40,
begin: function (D) { return __ZC(351, 22, this, arguments, new.target); },
line: function (D) { var p = SEA_BY.telepylus; if (D.s === 1)
return "waiting…"; if (D.s === 2)
return D.inside ? "sail out of the harbour mouth! hits: " + (D.hits || 0) + " of 3" : (D.cut ? "row clear: " + Math.max(0, Math.round(700 - Math.hypot(SEA.sx - D.rock.x, SEA.sz - D.rock.z))) + " m to go" : "cut the cable"); return ""; },
throwAt: function (D, x, z) { var gi = D.giants[Math.random() < 0.5 ? 0 : 1], m = wMesh(new THREE.DodecahedronGeometry(2.6, 0), new THREE.MeshLambertMaterial({ color: 0x7A746A, flatShading: true }), gi.position.x, 64, gi.position.z, OVY.G); D.rocks.push({ m: m, fx: gi.position.x, fz: gi.position.z, tx: x, tz: z, u: 0 }); },
tick: function (D, dt) { return __ZC(351, 23, this, arguments, new.target); },
prompt: function (D) { return __ZC(351, 24, this, arguments, new.target); },
end: function (D) { D.rocks = []; }
};
function ovyAeaeaSpots() { var p = SEA_BY.aeaea, hx = p.x + 60, hz = p.z; return { p: p, hx: hx, hz: hz, circe: { x: hx - 11, z: hz }, table: OVY.S && OVY.S.table || { x: hx - 13.5, z: hz + 4.5 }, sty: { x: hx + 14, z: hz + 15, r: 6.4 }, hermes: OVY.S && OVY.S.hermes || { x: p.x + 170, z: p.z + 6 } }; }
var OVY_FORMS = { pig: { n: "a pig", kind: "pig", s: 1, drop: 1.05, snout: "🐽", say: "Your nose is a snout; you are bristly, pink and four-footed. Your mind is still your own." },
lion: { n: "a lion", kind: "lion", s: 0.9, drop: 0.75, snout: "🦁", say: "You are a tawny lion, gentle as a lapdog, wagging your tail at Circe's door like the others." },
wolf: { n: "a mountain wolf", kind: "dog", s: 1.3, drop: 0.95, snout: "🐺", say: "You are a grey mountain wolf, fawning at Circe's feet with all the others she has charmed." } };
function ovyBeastOn(why) { return __ZC(351, 25, this, arguments, new.target); }
function ovyBeastOff(how, quiet) { return __ZC(351, 26, this, arguments, new.target); }
function ovySnout(e) { return __ZC(351, 27, this, arguments, new.target); }
function ovyBeastTick(dt) { return __ZC(351, 28, this, arguments, new.target); }
function hxClockOvy(s) { var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ":" + (r < 10 ? "0" : "") + r; }
function ovyBeastPrompt(L) { return __ZC(351, 29, this, arguments, new.target); }
function ovyAlwaysTick(dt) { }
function ovyAlwaysPrompt(L) { return __ZC(351, 30, this, arguments, new.target); }
OVY_PLAY.aeaea = { min: 50,
herbs: [["moly", "A small plant with a black root and a flower white as milk. Hermes said it is hard for mortals to dig up."],
["garlic", "Wild garlic: starry white flowers, and a smell that makes your eyes water. The root is a white bulb."],
["chamomile", "Chamomile: white petals round a yellow middle, smelling of apples. Good for a calming tea, useless against witches."],
["hellebore", "White hellebore: a tall spike of greenish-white flowers. Poisonous! Hermes shakes his head."],
["squill", "Sea squill: a huge bulb half out of the ground and a tall spike of little white stars. The root is white, not black."]],
begin: function (D) { return __ZC(351, 31, this, arguments, new.target); },
line: function (D) { return ["meet the stranger on the path", "find the moly", "accept Circe's cup", "free your crew"][D.s] || ""; },
tick: function (D) { return __ZC(351, 32, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 33, this, arguments, new.target); },
end: function (D) { (D.pigs || []).forEach(function (P) { P.g.visible = true; }); }
};
OVY_PLAY.cimmeria = { min: 50,
pit: function () { var p = SEA_BY.cimmeria; return { x: p.x, z: p.z - 160 }; },
tiresias: function () { var t = null; SEA.people.forEach(function (P) { if (P.g && P.g.userData.wSeed === "tiresias")
t = P.g; }); return t; },
shades: [["Elpenor", "your youngest crewman, who fell from Circe's roof", 0xA8B0B8, "m"], ["Anticleia, your mother", "whom you left alive", 0xC8B8C8, "f"], ["A young bride", "in her wedding veil", 0xE8E0E8, "f"], ["An old man", "bent on a stick", 0x989CA0, "m"], ["Tiresias", "the blind prophet, with his golden staff", 0xD8D8D0, "m"], ["A soldier", "in battered armour", 0x8A8E94, "m"]],
begin: function (D) { return __ZC(351, 34, this, arguments, new.target); },
line: function (D) { return D.s === 0 ? "pour the offerings" : D.s === 1 ? "hold back every shade until Tiresias has drunk" : D.s === 2 ? "speak with your mother" : D.s === 3 ? "let the shades go" : ""; },
pour: function (D) { return __ZC(351, 35, this, arguments, new.target); },
rise: function (D) {
var P = this.pit();
D.ghosts = [];
D.next = 1;
D.idx = 0;
ovyStage(1, null);
ovyTone(110, 1.2);
ovySay("<b>The shades come up out of the dark</b>, crowding toward the pit, thirsty for the offering. Hold every one back with your sword until Tiresias has drunk. Even your mother.");
},
spawn: function (D) { return __ZC(351, 36, this, arguments, new.target); },
tick: function (D, dt) { return __ZC(351, 37, this, arguments, new.target); },
prophecy: function (D) { return __ZC(351, 38, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 39, this, arguments, new.target); },
end: function (D) { var t = this.tiresias(); if (t)
t.visible = true; OVY.mist = 0; }
};
OVY_PLAY.sirens = { min: 40,
begin: function (D) { return __ZC(351, 40, this, arguments, new.target); },
go: function (D) { return __ZC(351, 41, this, arguments, new.target); },
line: function (D) { if (D.s !== 1)
return ""; var r = SEA_BY.sirens, d = Math.round(Math.hypot(SEA.sx - r.x, SEA.sz - r.z)); return (D.mast ? "tied to the mast" : "ears stopped") + " · " + d + " m from the Sirens" + (D.begs ? " · you begged " + D.begs + " times" : ""); },
tick: function (D, dt) { return __ZC(351, 42, this, arguments, new.target); },
prompt: function (D) { return __ZC(351, 43, this, arguments, new.target); },
end: function (D) { if (SEA.wax && D.s !== 2)
SEA.wax = false; }
};
OVY_PLAY.strait = { min: 30,
begin: function (D) { return __ZC(351, 44, this, arguments, new.target); },
go: function (D) { var p = SEA_BY.strait; ovyStage(1, [p.x - 50, p.z + D.from * (p.r + 80), "the " + (D.from > 0 ? "south" : "north") + " end of the strait"]); ovySay("Steer for the strait yourself. Keep to the west side, under Scylla's cliff." + (D.armed ? " You stand at the bow in your armour, watching the cliff." : "")); },
line: function (D) { var p = SEA_BY.strait; if (D.s === 1)
return "into the strait"; if (D.s === 2)
return "through to the far end: " + Math.max(0, Math.round(p.r + 20 + (SEA.sz - p.z) * D.from)) + " m" + (D.spun ? " · Charybdis spun you " + D.spun + " times" : ""); return ""; },
tick: function (D, dt) { return __ZC(351, 45, this, arguments, new.target); },
prompt: function () { return null; }
};
OVY_PLAY.thrinacia = { min: 90,
fishSpots: function () { return __ZC(351, 46, this, arguments, new.target); },
cows: function () { return SEA.people.filter(function (P) { return P.g && /^thr_cow_/.test(P.g.userData.id || ""); }); },
begin: function (D) { return __ZC(351, 47, this, arguments, new.target); },
line: function (D) { return "week " + (D.week + 1) + " of 3 · the crew's food: " + Math.max(0, Math.round(D.food)) + "%"; },
thunder: function (D, how) { return __ZC(351, 48, this, arguments, new.target); },
tick: function (D, dt) { return __ZC(351, 49, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 50, this, arguments, new.target); },
end: function (D) { }
};
OVY_PLAY.ogygia = { min: 70,
begin: function (D) { var p = SEA_BY.ogygia; ovyStage(0, [p.x + 3, p.z - 44, "Calypso"]); ovySay("<b>Calypso's Island.</b> Seven years you have lived here with the nymph Calypso, in her cave curtained with vines. Every day you sit on the shore and look out to sea. Today she comes looking for you."); },
line: function (D) { return ["speak with Calypso", "fell twenty trees: " + (D.felled || 0) * 2 + " of 20", "build the raft: " + (D.built || 0) + " of 4", "launch her", "hold on through the storm: " + (D.held || 0) + " of 5", "take Ino's veil"][D.s] || ""; },
trees: function (D) { return __ZC(351, 51, this, arguments, new.target); },
raftAt: function (D) { var p = SEA_BY.ogygia; return D.beach || (D.beach = ovyFree(p.land.x + 26, p.land.z - 14, 6)); },
raftPart: function (D, n, into) { return __ZC(351, 52, this, arguments, new.target); },
begin2: function (D) { return __ZC(351, 53, this, arguments, new.target); },
tick: function (D, dt, L) { return __ZC(351, 54, this, arguments, new.target); },
launch: function (D) { return __ZC(351, 55, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 56, this, arguments, new.target); },
raftOff: function () { if (OVY.raft && OVY.raft.parent)
OVY.raft.parent.remove(OVY.raft); OVY.raft = null; if (SEA.ship)
SEA.ship.visible = true; SEA.auto = null; },
end: function (D) { this.raftOff(); }
};
OVY_PLAY.scheria = { min: 80,
spots: function () { var p = SEA_BY.scheria, px = p.x, pz = p.z + 170, wx = p.x + 60, wz = p.z + 330; return { p: p, naus: { x: wx + 2, z: wz + 4 }, door: { x: px, z: pz + 15 }, arete: { x: px - 2, z: pz + 14 }, demo: { x: px - 6, z: pz + 20 }, throwAt: OVY.S && OVY.S.discus || { x: p.x - 80, z: p.z + 250 } }; },
begin: function (D) { return __ZC(351, 57, this, arguments, new.target); },
line: function (D) { return ["ask Nausicaa for help", "go to the palace", "kneel to Queen Arete", "the games: beat the Phaeacians' mark (" + (D.best ? "your best " + D.best.toFixed(1) + " m" : "48 m") + ")", "hear Demodocus at the feast", "sail home with the Phaeacians"][D.s] || ""; },
tick: function (D, dt) { return __ZC(351, 58, this, arguments, new.target); },
after: function (D, d) { return __ZC(351, 59, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 60, this, arguments, new.target); },
story: function (D, i) { return __ZC(351, 61, this, arguments, new.target); },
end: function (D) { OVY.meter = ""; }
};
OVY_PLAY.ithaca = { min: 120,
hall: function () { return OVY.S && OVY.S.hall; },
spots: function () { return __ZC(351, 62, this, arguments, new.target); },
begin: function (D) { return __ZC(351, 63, this, arguments, new.target); },
line: function (D) { return __ZC(351, 64, this, arguments, new.target); },
rings: function () { var H = this.hall(); if (!H)
return []; var out = []; for (var i = 0; i < 12; i++)
out.push(new THREE.Vector3(SEA.base + H.x - 1 + i, H.y + 1.72, H.z - 2.5)); return out; },
aim: function () {
var o = camera.position, d = new THREE.Vector3();
camera.getWorldDirection(d);
var n = 0;
this.rings().forEach(function (c) { var v = c.clone().sub(o), t = v.dot(d); if (t <= 0)
return; if (v.sub(d.clone().multiplyScalar(t)).length() < 0.24)
n++; });
return n;
},
tick: function (D, dt, L) { return __ZC(351, 65, this, arguments, new.target); },
landed: function (D, hit) { return __ZC(351, 66, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 67, this, arguments, new.target); },
party: function (D) { return __ZC(351, 68, this, arguments, new.target); },
end: function (D) { }
};
OVY_PLAY.pylos = { min: 45,
spots: function () { var p = SEA_BY.pylos, ax = p.x - 200, az = p.z + 60; return { p: p, altar: { x: ax, z: az }, nestor: { x: ax + 5, z: az - 4 }, mentor: { x: p.land.x - 6, z: p.land.z + 4 }, chariot: OVY.S && OVY.S.chariot || { x: p.x - 90, z: p.z + 30 } }; },
begin: function (D) { return __ZC(351, 69, this, arguments, new.target); },
line: function (D) { return ["speak with Mentor", "join the feast on the shore", "ask Nestor about your father", "drive to Sparta"][D.s] || ""; },
prompt: function (D, L) { return __ZC(351, 70, this, arguments, new.target); },
end: function (D) { }
};
OVY_PLAY.sparta = { min: 40,
spots: function () { var p = SEA_BY.sparta, hx = p.x, hz = p.z + 30; return { p: p, door: { x: hx + 3, z: hz + 14 }, helen: { x: hx + 4.6, z: hz + 19.4 }, men: { x: hx - 4, z: hz + 18 } }; },
begin: function (D) { return __ZC(351, 71, this, arguments, new.target); },
line: function (D) { return ["wait at the gate", "Helen is coming", "speak with Menelaus"][D.s] || ""; },
prompt: function (D, L) { return __ZC(351, 72, this, arguments, new.target); },
end: function (D) { }
};
OVY_PLAY.pharos = { min: 50,
spots: function () { var p = SEA_BY.pharos, cx = p.x + 110, cz = p.z + 40; return { p: p, cx: cx, cz: cz, eid: { x: p.x + 140, z: p.z - 6 }, bed: { x: p.x + 132 + 1 * 3.2, z: p.z - 12 }, couch: { x: cx + 16, z: cz - 6 }, sea: { x: cx + 70, z: cz - 30 } }; },
proteus: function () { var t = null; SEA.people.forEach(function (P) { if (P.g && P.g.userData.wSeed === "proteus")
t = P.g; }); return t; },
shapes: [["a bearded lion", "lion"], ["a great serpent", "snake"], ["a leopard", "leopard"], ["a huge wild boar", "boar"], ["running water", "water"], ["a tall, leafy tree", "tree"]],
form: function (D, k) { return __ZC(351, 73, this, arguments, new.target); },
begin: function (D) { return __ZC(351, 74, this, arguments, new.target); },
line: function (D) { return ["speak with the sea-nymph", "lie down in a bed in the sand", "wait for noon…", "seize him!", "hold on: " + (D.held || 0) + " of 6, slips " + (D.slips || 0) + " of 1", ""][D.s] || ""; },
tick: function (D, dt) { return __ZC(351, 75, this, arguments, new.target); },
slip: function (D, line) { return __ZC(351, 76, this, arguments, new.target); },
prompt: function (D, L) { return __ZC(351, 77, this, arguments, new.target); },
end: function (D) { var P = this.proteus(); if (P)
P.visible = true; OVY.lie = 0; OVY.lock = null; }
};
function ovyBuild(G) { return __ZC(351, 78, this, arguments, new.target); }
(function () {
if (typeof SEA === "undefined" || typeof seaTick !== "function" || typeof WORLDS === "undefined" || !WORLDS.sea)
return;
var st = seaTick;
seaTick = function (dt) { try {
st.apply(this, arguments);
}
catch (e) {
if (window.console && !OVY.seaErr) {
OVY.seaErr = 1;
console.warn("[voyage] sea", e && e.stack || e);
}
} try {
ovyTick(dt);
}
catch (e) {
if (window.console)
console.warn("[voyage]", e);
} };
if (typeof seaPromptTick === "function") {
var sp = seaPromptTick;
seaPromptTick = function (L) { sp.apply(this, arguments); try {
var r = ovyPromptNow(L);
if (r)
worldPrompt(r[0], r[1]);
}
catch (e) {
if (window.console)
console.warn("[voyage] prompt", e);
} };
}
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (html) { if (html && (OVY.line || OVY.meter) && WLD.on === "sea")
html = html + (OVY.line || "") + (OVY.meter || ""); return wb.call(this, html); };
}
var addBtn = function (label, sub, fn) { try {
if (!WLD.card || WLD.card.style.display !== "block")
return;
var d = document.createElement("div");
d.innerHTML = worldBtn("ovy", label, sub);
var b = d.firstChild;
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); fn(); };
WLD.card.appendChild(b);
}
catch (e) { } };
if (typeof seaChart === "function") {
var ch = seaChart;
seaChart = function () { ch.apply(this, arguments); if (SEA.lotus > 0)
return; addBtn("📜 The Voyage Home", "Play the Odyssey, chapter by chapter: " + ovyCount() + " of " + OVY_CH.length + " played", function () { ovyBook(); }); };
}
if (typeof seaCard === "function") {
var sc = seaCard;
seaCard = function (p) { sc.apply(this, arguments); if (!p || OVY.beast)
return; OVY_CH.forEach(function (c) { if (c.at !== p.k)
return; addBtn("📜 Play: " + esc(c.title), "Chapter " + c.n + " of the Voyage Home · " + esc(c.goal) + (OVY.done[c.k] ? " · ✓ played" : ""), function () { ovyChapterCard(c.k); }); }); };
}
if (typeof hxHub === "function") {
var hh = hxHub;
hxHub = function () { var r = hh.apply(this, arguments); if (WLD.on === "sea")
addBtn("📜 The Voyage Home: play the Odyssey", "Sixteen chapters, from the Wooden Horse to Homecoming: " + ovyCount() + " played", function () { ovyBook(); }); return r; };
}
if (typeof seaBoard === "function") {
var sbd = seaBoard;
seaBoard = function () { if (OVY.beast) {
ovySay("<b>Circe's creatures can't sail.</b> Get your own shape back first: root for moly in the sty, or wait for her to tire of you.");
return;
} return sbd.apply(this, arguments); };
}
var W = WORLDS.sea, g0 = W.ground, b0 = W.block, l0 = W.leave, e0 = W.env;
W.ground = function (x, z, feet) {
var g = g0.apply(this, arguments);
if (!SEA.aboard) {
for (var i = 0; i < OVY.floors.length; i++) {
var f = OVY.floors[i];
if (Math.abs(x - f.x) < f.hw && Math.abs(z - f.z) < f.hd) {
g = f.y;
break;
}
}
if (OVY.beast)
g -= OVY_FORMS[OVY.beast.form].drop;
else if (OVY.lie)
g -= 1.3;
}
return g;
};
W.block = function (x, z, feet) { if (!SEA.aboard && OVY.beast) {
var A = ovyAeaeaSpots();
if (Math.hypot(x - A.sty.x, z - A.sty.z) > A.sty.r - 0.6)
return true;
} return b0.apply(this, arguments); };
W.leave = function () { try {
if (OVY.k)
ovyEnd(false);
ovyBeastOff("", true);
ovyVeilOff();
if (typeof ovyDark === "function")
ovyDark(0);
OVY.moly = null;
}
catch (e) { } return l0.apply(this, arguments); };
W.env = function () {
var E = e0.apply(this, arguments);
if (OVY.night) {
E.top = 0x0A1028;
E.low = 0x1A2238;
E.fog = 0x0E1626;
E.sun = 0.12;
E.sunCol = 0xA8B8E0;
E.hemi = 0.32;
E.hemiCol = 0x6A7AA8;
E.stars = 1;
}
if (OVY.mist) {
E.fog = 0x6A7078;
E.fogD = Math.max(E.fogD || 0, 0.006);
E.sun = Math.min(E.sun, 0.35);
E.top = 0x4A5058;
E.low = 0x6A7078;
}
return E;
};
if (typeof avatarTick === "function") {
var at = avatarTick;
avatarTick = function (dt) { var r = at.apply(this, arguments); if (OVY.beast && typeof meG !== "undefined" && meG)
meG.visible = false; return r; };
}
if (typeof presenceGroupFor === "function") {
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments), f = row && row.look && row.look.circe && OVY_FORMS[row.look.circe];
if (f)
try {
g.children.forEach(function (c) { if (c !== g.userData.tag)
c.visible = false; });
var a = build({ id: "ovy_cr_" + (row.user_id || ""), archetype: f.kind, attrs: { s: f.s }, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [] });
g.add(a);
if (g.userData.tag)
g.userData.tag.position.y = 1.6;
}
catch (e) { }
return g;
};
}
try {
var L = typeof dreamer === "function" && dreamer().look;
if (L && L.circe) {
delete L.circe;
if (typeof save === "function")
save();
}
}
catch (e) { }
})();
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
if (!ovySigned())
return h;
if (!OVY.mine) {
ovyMine().then(function (m) { if (m && m.length && typeof bkpLoad === "function")
try {
bkpLoad();
}
catch (e) { } });
return h;
}
if (!OVY.mine.length)
return h;
var x = '<div style="margin-top:6px"><b>Odyssey keepsakes</b></div>';
OVY.mine.forEach(function (r) { var c = OVY_BY[r.key]; x += '<div style="padding:3px 0">' + esc(r.icon || "") + " " + esc(r.keepsake) + ' <span style="opacity:.7">· ' + esc(r.title) + (r.honour ? " · ★ better than Odysseus" : "") + '</span>' + (c ? '<div style="opacity:.65;font-size:12px">' + esc(c.keep[2]) + '</div>' : "") + '</div>'; });
if (OVY.mine.length >= OVY_CH.length)
x += '<div style="margin-top:6px"><b>Certificate</b></div><div style="padding:3px 0">🏛️ <b>The Voyage Home</b>: every chapter of the Odyssey played, from the Wooden Horse to Homecoming. <span style="opacity:.7">The Department of Education</span></div>';
return h + x;
}
catch (e) {
return h;
}
};
})();
var OVY_DANGER = {
troy: ["ovy_trojan", "ovy_trojan", "ovy_trojanarcher"],
cyclops: ["ovy_cyclopsherd", "wildboar"],
telepylus: ["ovy_laestry", "ovy_laestry"],
strait: ["ovy_trojan"],
sirens: ["ovy_trojan"]
};
function ovyDangerHere() { return __ZC(351, 79, this, arguments, new.target); }
(function () {
if (typeof dgrLevelOf === "function") {
var lo = dgrLevelOf;
dgrLevelOf = function (id) { var n = lo.apply(this, arguments); if (id === "sea" && ovyDangerHere())
return 4; return n; };
}
if (typeof DGB_KINDS !== "undefined") {
var bronze = { hat: "helmet", hatColor: 0xB8864A, top: 0xA83A2A, bottom: 0x8A6A3A, back: "cloak", backColor: 0x8A2A1A };
DGB_KINDS.ovy_trojan = { name: "Trojan spearman", body: "person", arm: "spear", hp: 60, spd: 3.9, dmg: 10, reach: 3, look: bronze, spoil: ["Bronze spear-point", "🗡️"], growl: 220 };
DGB_KINDS.ovy_trojanarcher = { name: "Trojan archer", body: "person", arm: "longbow", hp: 45, spd: 3.6, dmg: 8, reach: 2, shot: { r: 22, c: 0xD8C8A0 }, look: { hat: "hood", hatColor: 0x6A3A2A, top: 0x8A5A3A, bottom: 0x6A4A2A }, spoil: ["Trojan arrow", "🏹"], growl: 250 };
DGB_KINDS.ovy_cyclopsherd = { name: "Young Cyclops", body: "person", species: "giant", arm: "mace", scale: 1.6, hp: 140, spd: 3.2, dmg: 15, reach: 2.8, big: 1, look: { top: 0x6A5A40, bottom: 0x5A4A30, hat: "none" }, spoil: ["Cyclops' sheep-bell", "🔔"], growl: 90 };
DGB_KINDS.ovy_laestry = { name: "Laestrygonian giant", body: "person", species: "giant", arm: "warhammer", scale: 1.8, hp: 150, spd: 3.4, dmg: 16, reach: 3, big: 1, look: { top: 0x5A4A3A, bottom: 0x4A3A2A, hat: "none" }, spoil: ["Giant's sling-stone", "🪨"], growl: 85 };
}
if (typeof dgbList === "function") {
var dl = dgbList;
dgbList = function () { var k = ovyDangerHere(); if (k && OVY_DANGER[k])
return OVY_DANGER[k]; return dl.apply(this, arguments); };
}
})();
