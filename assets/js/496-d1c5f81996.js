/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TMR = { doors: 0, t: 0 };
function tmrCard(title, body) { if (typeof evbCard === "function")
evbCard(title, body);
else if (typeof worldCard === "function")
worldCard("<b>" + title + "</b><p>" + body + "</p>"); }
var TMR_FACTS = {
sky: ["Tormance has two suns. Branchspell is white and huge, much bigger in the sky than our Sun. Alppain is blue, and rises only in the far north, in Barey; its light, the people say, is not for the eyes but for the heart.",
"The moon of Tormance is called Teargeld.", "Tormance is the one inhabited planet of the double star Arcturus. In the book, a torpedo of crystal carries Maskull, Nightspore and Krag there from a tower on the coast of Scotland."],
colour: ["There are two colours here that Earth has not got: ulfire and jale. Lindsay wrote that ulfire was a wild and painful colour, and jale dreamlike, feverish and voluptuous. Nobody on Earth has seen them, so here they are painted as near as paint can go.",
"Corpang of Threal says there are five primary colours on Tormance: two sets of three, with blue in both."],
people: ["The people of Poolingdred have the breve, a soft organ on the brow that reads another's thoughts, and the magn, a tentacle from the chest that loves whatever it touches.",
"Joiwind and Panawe live in Poolingdred; they drink only water, and believe all living things are their brothers and sisters.",
"The Ondren are older than the settlements: tall, slow, humming people. They have walked the long road to Ondrevar for longer than anyone remembers."],
book: ["A Voyage to Arcturus was written by David Lindsay and published in London in 1920. It sold only a few hundred copies at first; it is now counted among the strangest and greatest books of its kind.",
"To walk the whole book, find the crystal torpedo on the scarlet sand, and climb in. Twenty-one chapters, from a séance in Hampstead to the tower of Muspel."]
};
function tmrFact(title, list) { return function () { var R = Math.random(); tmrCard(title, list[Math.floor(R * list.length) % list.length]); }; }
function tmrHum() { return __ZC(496, 0, this, arguments, new.target); }
function tmrSpring() { if (typeof evbTune === "function")
evbTune([523, 659, 784], 260, 0.8); tmrCard("The spring", "The water of Tormance is not like Earth's: in Poolingdred it is so heavy a man can lie on it, and when Joiwind gives Maskull water to drink, it makes him gentler. The family drinks nothing else."); }
function tmrFruit() { tmrCard("The blue fruit", "Bowls of the blue fruit that grows on the trees of Poolingdred. The people of Joiwind's country eat no meat; Maskull, who is a giant, eats it gladly and feels the better for it."); }
if (typeof evbTheme === "function") {
evbTheme("tormhome", { corner: "plant", seed: 91, panel: 0xD8A898,
pal: { fab: "terracotta", fab2: "ivory", wood: "walnut", metal: "copper", stone: "sandstone", art: 5, rug: 6, rugv: 1 },
remap: { "D6D0C6|plaster": [0xC88A78, "plaster"], "D8D0C0|coffer": [0x8A4A4A, "coffer"] },
hello: "🌗 <b>Inside a house of Tormance.</b> Grown stone, round and low, the colour of the scarlet sand: the long room, the spring, the blue fruit, the room where the old ones hum. Look for the ✨ cards. The way out is the round door." });
evbHouse("tormhome", { g: EVB_GRID.mid, h: 3.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The house"], wall: 0xC88A78, trim: 0x6A2A3A,
plan: [{ hall: { k: "tmhall", n: "The Round Door" }, spine: { k: "tmlong", n: "The Long Room" }, gallery: { k: "tmniche", n: "The Window Niches" },
back: { merge: EVB_BACK, k: "tmhum", n: "The Humming Room" },
r1i: { k: "tmspring", n: "The Spring" }, r1o: { k: "tmfruit", n: "The Fruit Store" },
r2i: { k: "tmsleep", n: "The Sleeping Room" }, r2o: { k: "tmweave", n: "The Weaving Room" },
r3i: { k: "tmkids", n: "The Children's Room" }, r3o: { k: "tmstones", n: "The Stone-Reader's Room" },
l1i: { k: "tmsky", n: "The Sky Window" }, l1o: { k: "tmcolour", n: "The Room of New Colours" },
l2i: { k: "tmbook", n: "The Traveller's Room" }, l2o: { k: "tmstore", n: "The Store" },
l3i: { k: "tmguest", n: "The Guest Room" }, l3o: { k: "tmhearth", n: "The Hearth" } }] });
evbRooms({
tmhall: { sides: ["evb_pots", "pelt", "evb_pots", "evb_blanket"], acts: [[0.35, 0, 2.0, "A house of Tormance", "read", tmrFact("Tormance", TMR_FACTS.people)]] },
tmlong: { sides: ["pelt", "evb_blanket", "pelt", "evb_pots"] },
tmniche: { far: ["evb_pots", "evb_blanket", "evb_pots", "evb_blanket"] },
tmhum: { mid: [["pelt", 0.5, 0]], sides: ["benchin", "benchin", "benchin", "benchin"], far: ["evb_blanket", "loom"], ceil: "lantern", acts: [[0.45, 0, 2.4, "The old ones' chord", "hum", tmrHum]] },
tmspring: { mid: [["evb_well", 0.5, 0]], sides: ["evb_pots", "evb_pots", "evb_pots"], acts: [[0.45, 0, 1.8, "The spring", "drink", tmrSpring]] },
tmfruit: { far: ["evb_pots", "shelfgoods"], sides: ["evb_pots", "shelfgoods", "evb_pots", "barrel"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The blue fruit", "look closer", tmrFruit]] },
tmsleep: { far: ["bed", "evb_blanket"], sides: ["footchest", "pelt", "footchest", "chair"], mid: [["pelt", 0.45, 0]] },
tmweave: { mid: [["loom", 0.5, 0]], sides: ["evb_blanket", "loom", "evb_blanket"], acts: [[0.45, 0, 1.8, "The loom", "read", tmrFact("Cloth of Tormance", ["The pale, classically draped robes of Poolingdred are woven here, the colour of green water.", "Skins are worn in Ifdawn and on the shore; on Sant, only loincloths; in Lichstorm, close-fitting fur."])]] },
tmkids: { far: ["bed", "evb_blanket"], sides: ["pelt", "evb_pots", "pelt"], mid: [["pelt", 0.5, 0]] },
tmstones: { far: ["maptable"], sides: ["shelfgoods", "evb_pots", "shelfgoods"], acts: [[0.5, 0, 1.8, "The stone-reader", "read", tmrFact("Colours", TMR_FACTS.colour)]] },
tmsky: { far: ["estelescope"], sides: ["evb_pots", "maptable", "evb_pots"], acts: [[0.5, 0, 1.8, "The sky of Tormance", "look up", tmrFact("Two suns", TMR_FACTS.sky)]] },
tmcolour: { sides: ["evb_blanket", "evb_pots", "evb_blanket", "evb_pots"], acts: [[0.5, 0, 1.8, "Ulfire and jale", "look", tmrFact("New colours", TMR_FACTS.colour)]] },
tmbook: { far: ["bookshelf"], sides: ["chair", "shelfgoods", "chair"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "A traveller's book", "read", tmrFact("A Voyage to Arcturus", TMR_FACTS.book)]] },
tmstore: { grid: ["barrel", 2, 3, "-u", 0.6, 0.6], sides: ["shelfgoods", "shelfgoods"] },
tmguest: { far: ["bed"], sides: ["chair", "footchest", "pelt"] },
tmhearth: { mid: [["evb_kivafire", 0.5, 0]], sides: ["benchin", "benchin", "benchin"], far: ["evb_pots"] }
});
}
(function () {
if (typeof REALMS !== "undefined" && REALMS.elsewhere) {
var E = REALMS.elsewhere;
E.ground = 0x9A3424;
E.path = 0x7A4A3A;
E.skyTop = 0x1E1C6A;
E.skyLow = 0xE8A090;
E.light = 0xFFF2E8;
E.amb = 0.66;
E.sun = 0.95;
E.stars = 0.05;
E.dens = 1.0;
}
if (typeof SKYWORK !== "undefined" && SKYWORK.elsewhere) {
var S = SKYWORK.elsewhere;
S.a = 0x2A1E6A;
S.b = 0xF0A890;
S.c = 0x6AA8FF;
S.amt = 1.0;
S.speed = 0.3;
}
})();
function tmrLite() { return typeof LITE !== "undefined" && !!LITE; }
function tmrM(col, tex, o) { return typeof dpxMat === "function" ? dpxMat(col, tex, o || { flat: true }) : new THREE.MeshLambertMaterial({ color: col }); }
function tmrGlow(col, op) { return typeof dpxGlow === "function" ? dpxGlow(col, op) : new THREE.MeshBasicMaterial({ color: col, transparent: op != null, opacity: op == null ? 1 : op }); }
function tmrTorpedo(g) { return __ZC(496, 1, this, arguments, new.target); }
function tmrBlackTree(g, s) { return __ZC(496, 2, this, arguments, new.target); }
function tmrCrysTree(g, s) { return __ZC(496, 3, this, arguments, new.target); }
function tmrPurple(g, s, seed) { return __ZC(496, 4, this, arguments, new.target); }
function tmrHouse(g, o) { return __ZC(496, 5, this, arguments, new.target); }
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.elsewhere !== "function")
return;
var orig = LD_SETS.elsewhere;
LD_SETS.elsewhere = function (P) { orig(P); try {
tmrLayout(P);
}
catch (e) {
if (window.console)
console.warn("[tormance] layout", e);
} };
})();
var TMR_ROBE = function (c, skin, hair) { return { top: c, topKind: "robe", bottom: c, shoes: 0x8A6A4A, layer: "sash", layerColor: 0xE8E0C8, skin: skin || 0xD8B8A0, hair: hair || 0x2A1A10, hairStyle: "long" }; };
var TMR_SKINS = function (c, skin) { return { top: c, topKind: "shirt", bottom: c, shoes: 0x5A4030, skin: skin || 0xC89878, hair: 0x1A1410 }; };
var TMR_NEW = {
aw_greeter: ["Ulla of Poolingdred, who meets travellers", "a woman of Poolingdred on Tormance who meets every traveller on the scarlet sand; she has the breve on her brow and the magn, a soft tentacle, at her breast, and reads a little of what you are thinking", "Welcome to Tormance. You are thinking that the sand is very red, and that the sun is very large. Both are true. The white one is Branchspell. Wait until you see the blue one."],
aw_grower1: ["Ama, who gathers the blue fruit", "a woman of Poolingdred who gathers the blue fruit; like Joiwind, she eats no meat and drinks only water", "Try one. They taste of something you have no word for. Joiwind says that all living things are brothers and sisters, so we take only what falls."],
aw_parent: ["Lenea, a mother of Poolingdred", "a mother of Poolingdred with two children; she is gentle, as the people here are, and very curious about strangers", "My two have never seen a sky with one sun in it. When I told them of such a place, they laughed for an hour."],
aw_sci1: ["Shalla, a reader of the stones", "a woman of Poolingdred who keeps Shaping's shrine and reads the colours of the stones, and knows the old names of ulfire and jale", "There are two colours here that you have never seen: ulfire and jale. Look at the crystal leaves on the black tree when Branchspell is low. There. That is jale."],
aw_cutter: ["Torrom, a crystal-cutter", "a crystal-cutter of Tormance who takes only the pieces that ring clear, as the Ondren taught him", "Tap it, and listen. The piece that rings is the one that is ready to go. The rest stays with the hill."]
};
function tmrLayout(P) { return __ZC(496, 6, this, arguments, new.target); }
(function () {
if (typeof DQ_ITEM !== "undefined") {
var f = DQ_ITEM.dr_domefruit;
if (f) {
f.n = "Blue fruit";
f.note = "\"Some hard fruit, bright blue in colour, of the size of a large apple, and shaped like an egg\": from the purple trees of Poolingdred.";
}
var b = DQ_ITEM.dr_domebread;
if (b) {
b.n = "Bread of Poolingdred";
b.note = "Baked in a house of grown stone.";
}
var t = DQ_ITEM.dr_twinmoons;
if (t) {
t.n = "Print of the two suns";
t.note = "A keepsake: Branchspell, white, and Alppain, blue, over the scarlet sand.";
}
}
if (typeof DQ_LANDS !== "undefined" && DQ_LANDS.elsewhere) {
var L = DQ_LANDS.elsewhere;
(L.gather || []).forEach(function (g) { if (g[0] === "dr_domefruit") {
g[3] = 0x3A6AE8;
} });
var W = { "A trader of the domes": "Torrom, a crystal-cutter", "The dome keeper": "Shalla, a reader of the stones", "The skyport warden": "Kael, keeper of Joiwind's oasis" };
(L.errands || []).forEach(function (e) {
if (e.k === "el_stone") {
e.who = W["A trader of the domes"];
e.say = "Sky-stones float a little when you let them go: the Ondren say they remember the sky. Bring me four, and I'll pay you well.";
}
else if (e.k === "el_seeds") {
e.who = "Ama, who gathers the blue fruit";
e.n = "Seeds of the blue fruit";
e.say = "We keep a seed from every blue fruit, for the trees to come. Five blue fruit, please.";
}
else if (e.k === "el_moss") {
e.who = W["The dome keeper"];
e.say = "Glow moss lights the houses of grown stone at night, a steady green, no flame. Eight clumps.";
}
else if (W[e.who])
e.who = W[e.who];
});
if (L.stall) {
L.stall.who = "Orrin Mal-Vey, an Ondren seed-seller";
L.stall.n = "The market of Poolingdred";
}
(L.games || []).forEach(function (g) {
if (g.k === "el_monoliths") {
g.who = "Aeloth Sun-Vael, Ondren elder";
g.n = "Wake the singing stones";
g.say = "The singing stones sleep. Touch each one and it wakes and hums. All seven, before they doze again.";
}
else if (g.k === "el_skyport") {
g.who = W["The skyport warden"];
g.n = "The Oasis Loop";
g.say = "Walk the loop round the oasis, where Joiwind brought Maskull from the scarlet sand: through every ring.";
}
else if (W[g.who])
g.who = W[g.who];
});
}
if (typeof DQ_LESSON !== "undefined" && DQ_LESSON.el) {
DQ_LESSON.el.who = "Shalla, a reader of the stones";
}
})();
function tmrOasis(P) { return __ZC(496, 7, this, arguments, new.target); }
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.elsewhere !== "function")
return;
var o = LD_SETS.elsewhere;
LD_SETS.elsewhere = function (P) { o(P); try {
tmrOasis(P);
}
catch (e) {
if (window.console)
console.warn("[tormance] oasis", e);
} };
})();
