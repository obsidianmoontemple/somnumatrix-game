/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SPB_SPELLS = [
{ s: "warding", n: "Arcane Ward", i: "⛨", t: "Ward", sch: "arcane", room: "wards", cd: 50,
use: "A shimmering ward wraps you for 25 seconds and soaks up to 60 harm from any blow: Ironfray's fighters, beasts that ambush you, dreamers where fights are allowed." },
{ s: "wind-calling", n: "Gust", i: "🌬", t: "Gust", sch: "arcane", room: "winds", cd: 8,
use: "A blast of wind in front of you throws back whatever is within 12 m, with a little harm, and the wind at your back speeds you on for 8 seconds." },
{ s: "enchanting", n: "Enchant Weapon", i: "✧", t: "Enchant", sch: "arcane", room: "enchant", cd: 90,
use: "Whatever is in your hand burns with arcane fire for a minute: every blow and shot of yours does half as much again." },
{ s: "potion-brewing", n: "Alchemy", i: "⚗", t: "Potions", sch: "arcane", room: "alchemy", cd: 0,
use: "Brew draughts at any Academy cauldron (the Alchemy Laboratory, or Duskwell's laboratory) from herbs you gather. They go in your backpack: drink one from there, or from the Potions button." },
{ s: "herb-lore", n: "Forage", i: "❀", t: "Forage", sch: "arcane", room: "herbs", cd: 90,
use: "Out in any world, find a herb of that land growing near you (the deep has glowcap and pearlmoss, hot lands emberroot, the night moonmint). It goes in your backpack." },
{ s: "beast-calming", n: "Calm Beast", i: "❦", t: "Calm", sch: "arcane", room: "menag", cd: 25,
use: "The nearest beast that is after you, within 16 m, loses its anger for 30 seconds and wanders off. It does not work on dreamers." },
{ s: "scrying", n: "Far-sight", i: "◈", t: "Far-sight", sch: "arcane", room: "scry", cd: 45,
use: "For 30 seconds a mark shows over every dreamer, fighter and beast within 150 m, through walls and rock, and you are told how dangerous this world is." },
{ s: "rune-marking", n: "Waymark Rune", i: "ᛟ", t: "Waymark", sch: "arcane", room: "runes", cd: 4,
use: "Burn a glowing rune where you stand. Anywhere else in that world, press it again to have the pointer lead you back to it, or press it on the rune to move it." },
{ s: "shadow-stepping", n: "Blink", i: "⇢", t: "Blink", sch: "arcane", room: "passage", cd: 6,
use: "Step in an instant to where you are looking, up to 12 m (never through a wall). Fighters and beasts lose sight of you." },
{ s: "shadow-doubling", n: "Mirror Double", i: "♟", t: "Double", sch: "arcane", room: "veils", cd: 40,
use: "An image of you stays where you stand for 12 seconds. Fighters and beasts go for it instead of you." },
{ s: "darksight", n: "Darksight", i: "◉", t: "Darksight", sch: "arcane", room: "veils", cd: 0, tog: 1,
use: "Your eyes take the dark: caves, the deep, the Sunless Sea and night all show clearly. Switch it on and off." },
{ s: "sigil-warding", n: "Sigil of Warding", i: "⊛", t: "Sigil", sch: "arcane", room: "runes", cd: 80,
use: "Cut a ring of sigils 8 m across round where you stand. For 45 seconds no beast or fighter can cross it, and you are told when a dreamer does." },
{ s: "faerglow-calling", n: "Starlight Wisp", i: "✺", t: "Wisp", sch: "arcane", room: "astro", cd: 0, tog: 1,
use: "A wisp of starlight follows at your shoulder and lifts the dark round you. Switch it on and off." },
{ s: "stone-skin", n: "Stoneskin", i: "⬢", t: "Stoneskin", sch: "arcane", room: "wards", cd: 70,
use: "Your skin turns to stone for 18 seconds: blows do less than half their harm, but you walk a little slower." },
{ s: "polymorph", n: "Polymorph", i: "🐸", t: "Polymorph", sch: "arcane", room: "transfig", cd: 30,
use: "Turn the foe you face (up to 18 m) into a harmless toad for 6 seconds: it cannot fight or chase you. Against a dreamer it strikes hard instead (12)." },
{ s: "starfall", n: "Starfall", i: "☄", t: "Starfall", sch: "arcane", room: "astro", cd: 25,
use: "Call falling stars down on the foe you face, or 14 m ahead: everything within 5 m of where they land is hurt badly (24) and knocked down." },
{ s: "shadow-striking", n: "Shadow Strike", i: "🗡", t: "Strike", sch: "deep", room: "dw_shadow", cd: 8,
use: "Melt into the shadows and come out at the back of the foe you face (up to 20 m), striking for 22. Never through a wall." },
{ s: "night-veiling", n: "Veil of Night", i: "🌑", t: "Veil", sch: "deep", room: "dw_shadow", cd: 35,
use: "Pour darkness round you, 6 m across, for 8 seconds: you cannot be seen, and everything caught in it is blinded for 2 seconds and hurt." },
{ s: "hexing", n: "Hex of Withering", i: "☠", t: "Hex", sch: "deep", room: "dw_wards", cd: 20,
use: "Curse the foe you face (up to 22 m): it withers for 10 seconds, losing 6 every 2 seconds and dragging its feet. Dreamers wither too." },
{ s: "dread-calling", n: "Dread", i: "👁", t: "Dread", sch: "deep", room: "dw_light", cd: 25,
use: "Let the dark look out of your eyes: every foe within 12 m is hurt (8) and beasts and fighters flee in terror for 5 seconds. Dreamers take 12." },
{ s: "soul-draining", n: "Soul Drain", i: "🩸", t: "Drain", sch: "deep", room: "dw_circle", cd: 12,
use: "Tear the life out of the foe you face (up to 22 m): 16 harm to it, and the same mended in you." },
{ s: "stone-singing", n: "Earthrend", i: "≋", t: "Earthrend", sch: "deep", room: "dw_stone", cd: 18,
use: "Sing the stone open: spikes of rock burst from the ground in a line 14 m ahead of you, hurting everything in the way (22) and throwing it down for 2 seconds." },
{ s: "silk-binding", n: "Venom Web", i: "🕸", t: "Venom", sch: "deep", room: "dw_silk", cd: 15,
use: "Venomous shadow-silk flies where you look and holds the first foe it meets (up to 18 m) for 4 seconds, its poison biting 5 every second while it holds." },
{ s: "wraith-raising", n: "Summon Wraith", i: "👻", t: "Wraith", sch: "deep", room: "dw_lore", cd: 45,
use: "Raise a wraith from the dark for 20 seconds. It hunts the nearest foe within 16 m of you and claws it for 9 every second and a half." }
];
var SPB_BY = {};
SPB_SPELLS.forEach(function (p) { SPB_BY[p.s] = p; });
var SPB_LORE = {
"warding": ["Wards", ["A soap bubble holds its shape because its skin pulls inward evenly all round: the same pull everywhere makes a perfect sphere.", "An arcane ward is that skin made of your attention: picture the bubble round you, even on every side, before you need it.", "A ward soaks harm until it is spent, then breaks. Cast it before the blow, not after."],
["Why is a soap bubble round?", "Its skin pulls inward evenly on every side", "Air inside is heavier than outside", "Soap is round by nature"]],
"wind-calling": ["Winds", ["Wind is air moving from high pressure to low. The bigger the difference, the stronger it blows.", "To call a gust, picture the air in front of you emptied, and the air behind you rushing to fill it.", "Stand side-on and push with both hands: the gust goes where your palms face."],
["Which way does wind blow?", "From high pressure to low pressure", "From low pressure to high pressure", "Always from the north"]],
"enchanting": ["Enchanting", ["A blacksmith quenches hot steel in water so it cools fast: the metal's tiny crystals lock hard. That is why tempered blades hold an edge.", "An enchantment is a temper of a different kind: the rune you trace locks a little of your will into the thing in your hand.", "It fades as it is used. Enchant just before the fight, never the night before."],
["Why is hot steel quenched in water?", "Cooling it fast locks its crystals hard", "Water makes steel shiny", "To wash off the soot"]],
"potion-brewing": ["Alchemy", ["Many real medicines began as plants: willow bark gave us aspirin, foxglove a heart medicine. Dose is everything: the same leaf can heal or harm.", "An alchemist measures. Every recipe on the lab wall says exactly how much of each herb it takes.", "Stir clockwise to bind, counter-clockwise to settle, and never taste what you have not finished."],
["Which tree's bark led to aspirin?", "Willow", "Oak", "Pine"]],
"herb-lore": ["Herb-lore", ["Plants grow where their needs are met: sun-lovers on open hillsides, shade plants under trees, mosses where it is damp.", "Read the land and you know what grows there: the deep grows glowing fungus, hot lands tough roots, and some leaves open only at night.", "Take a little from each plant and leave the rest, so it grows back."],
["Where would a moss most likely grow?", "Somewhere damp and shady", "On hot dry sand", "In a fire"]],
"beast-calming": ["Beastcraft", ["An angry animal is usually a frightened one: its heart races and its body gets ready to fight or flee.", "Calming is slowing that heart. Lower your eyes, breathe slowly, and let your voice be low and even.", "Never corner a beast you are calming. Leave it a way to walk off."],
["What is an angry animal most often feeling?", "Fear", "Hunger for sweets", "Boredom"]],
"scrying": ["Scrying", ["Bats find their way in the dark by echolocation: they call out and listen to the echoes coming back off everything around them.", "Scrying calls out the same way, with the mind: every living thing near you answers, and you see where it stands, through walls and rock.", "The farther you reach, the fainter the answer. A hundred and fifty metres is as far as most scryers can hold."],
["How do bats find their way in the dark?", "They listen to the echoes of their own calls", "They see in infrared", "They follow the smell of the moon"]],
"rune-marking": ["Runes", ["Sailors and walkers once piled stones into cairns to mark a path: anyone coming after could find the way.", "A waymark rune is a cairn of light. Burn it into the ground, and it calls you back from anywhere in that land.", "One rune at a time: burn a new one and the old one fades."],
["What is a cairn?", "A pile of stones marking a path", "A kind of boat", "A bird's nest"]],
"shadow-stepping": ["Passage", ["Light crosses a room faster than you can blink: a blink takes about a tenth of a second.", "Blinking is the step taken in that tenth of a second: see where you will stand, and be there.", "You can only blink to where you can see. A wall stops the step as it stops your eye."],
["About how long does a blink of the eye take?", "About a tenth of a second", "About five seconds", "About a minute"]],
"shadow-doubling": ["Veils and Seeing", ["Your eye can be fooled: a still shape the right size in a dim place reads as a person, because the brain fills in what it expects.", "A mirror double is an image of you, left standing where you were. Foes see you there, and strike at it.", "It lasts a dozen heartbeats. Be gone before they notice."],
["Why does a still shape in the dark look like a person?", "The brain fills in what it expects to see", "Shadows are alive", "Eyes see better in the dark"]],
"darksight": ["Veils and Seeing", ["Your eye has rods for dim light and cones for colour. Rods need about twenty minutes in the dark to reach full strength.", "Darksight is the patience of the rods, taken all at once: the dark gives up its shapes.", "Bright light undoes it in a moment."],
["Which cells of the eye see in dim light?", "Rods", "Cones", "Lashes"]],
"sigil-warding": ["Runes", ["A ward was once a thread across a doorway, or a dust of chalk: it showed when something crossed.", "A sigil of warding is a ring of runes that says no. Cut it round you and nothing that hunts you can step over it.", "It holds for about three quarters of a minute. Do not leave the ring if you want it to keep you."],
["What did an old ward of chalk show?", "That something had crossed it", "The time of day", "Where treasure was buried"]],
"faerglow-calling": ["the Stars", ["Starlight that reaches you tonight left its star years ago, some of it thousands of years ago.", "The starlight wisp is a little of that old light, called down to follow at your shoulder.", "It is gentle on purpose: a bright light would spoil the eyes of everyone near you."],
["Starlight you see tonight left its star when?", "Years ago, sometimes thousands", "A second ago", "Tomorrow"]],
"stone-skin": ["Wards", ["Basalt is rock made when lava cools quickly: dense, hard and dark. Much of the ocean floor is basalt.", "Stoneskin borrows that hardness for your skin. Blows that would cut you only bruise you.", "Stone is heavy: you walk slower while it holds. Let it go when the danger has passed."],
["How is basalt made?", "Lava cooling quickly", "Sand pressed by the sea", "Shells piled up for ages"]],
"polymorph": ["Transfiguration", ["A caterpillar becomes a butterfly by metamorphosis: inside the chrysalis its body is broken down and built again.", "Polymorph forces that change on a foe for a few heartbeats, into the smallest, mildest shape: a toad.", "A toad cannot fight. Use the moment to get away, or to deal with the others."],
["What is it called when a caterpillar becomes a butterfly?", "Metamorphosis", "Hibernation", "Migration"]],
"starfall": ["the Stars", ["A shooting star is a speck of space rock burning up as it rushes into the air, often no bigger than a grain of sand.", "Starfall calls bigger ones down, on purpose, onto one spot.", "Mark the spot first: everything near where they land is struck, so never call them on yourself."],
["What is a shooting star?", "A speck of space rock burning up in the air", "A star falling from the sky", "A comet's tail"]],
"shadow-striking": ["the Dark Arts", ["Owls hunt in near silence: soft fringes on their feathers break up the sound of their wings, so prey never hears them coming.", "Shadow Strike is the owl's way: you go into the dark, and come out behind the one you hunt.", "Strike once and be ready: the dark hides you only on the way in."],
["Why can an owl fly almost silently?", "Soft fringes on its feathers break up the sound", "It holds its breath", "It flies very slowly"]],
"night-veiling": ["the Dark Arts", ["Octopus and squid squirt a cloud of ink when hunted: the predator loses them in the dark and they slip away.", "The Veil of Night is that ink, made of shadow: pour it round you and nothing sees in or out.", "Whatever is caught inside it is blind for a moment. Use it to strike or to vanish."],
["Why does a squid squirt ink?", "To hide in the cloud and escape", "To feed", "To glow in the dark"]],
"hexing": ["Curses and Hexes", ["Doctors know the 'nocebo' effect: someone told a harmless pill will hurt them can truly start to feel ill.", "A hex of withering does not wait to be believed. It takes hold of the one you curse, and drains them a little at a time.", "It cannot be shaken off quickly. Curse first, then keep your distance."],
["What is the nocebo effect?", "Feeling ill because you expect to", "A cure for colds", "A kind of vaccine"]],
"dread-calling": ["Fear and the Dark", ["Fear lives in a small part of the brain called the amygdala: it sets the heart racing and readies the body to fight or run.", "Dread reaches into that part of every foe near you at once, and tells it to run.", "Fear passes in a few heartbeats. Strike while they flee."],
["Which part of the brain is most linked with fear?", "The amygdala", "The elbow", "The spine"]],
"soul-draining": ["the Practice Hall", ["Leeches and vampire bats feed on blood, and both make a chemical that stops the blood from clotting while they drink.", "Soul Drain drinks deeper than blood: the strength you tear out of a foe flows into you.", "It takes as much as it gives. The stronger your foe, the more they feel it."],
["What does a leech make to keep blood flowing?", "A chemical that stops clotting", "A tiny pump", "Ice"]],
"stone-singing": ["the Stone-Songs", ["Sound travels through rock about fifteen times faster than through air, and an earthquake is the rock itself ringing.", "Earthrend sings the rock open in a line ahead of you: it bursts upward in spikes.", "Aim along the ground. Everything standing in the line is struck and thrown down."],
["How fast does sound travel through rock, compared with air?", "About fifteen times faster", "About the same", "Slower"]],
"silk-binding": ["Silk and Venom", ["Spider silk is one of the toughest things in nature: for its weight it is stronger than steel and stretches without snapping.", "Venom-silk is spun from the dark and soaked in spider venom. It holds the first thing it touches, and bites.", "It holds for a few heartbeats, and the venom bites every one of them."],
["For its weight, how strong is spider silk?", "Stronger than steel", "Weaker than paper", "As strong as glass"]],
"wraith-raising": ["Lore of the Dead", ["Bones keep their story for thousands of years: scientists can tell from a skeleton how old someone was, what they ate, even how they lived.", "A wraith is the shadow of the long dead, raised for a few heartbeats to serve the one who called it.", "It hunts what is nearest you. When its time ends it sinks back into the dark."],
["What can scientists learn from an old skeleton?", "How old the person was and how they lived", "Their favourite song", "Their name, written on the bones"]]
};
var SPB_ROOMS = [
{ id: "swland", name: "The Spellwright Wing", x0: -8, x1: 8, z0: -134, z1: -122, wing: 1 },
{ id: "swhall", name: "The Spellwrights' Hall", x0: -8, x1: 8, z0: -224, z1: -134, wing: 1 },
{ id: "wards", name: "The Hall of Wards", x0: -36, x1: -8, z0: -152, z1: -134, job: 6600, subj: ["warding", "stone-skin"], col: 0xB08AFF, wing: 1 },
{ id: "winds", name: "The Hall of Winds", x0: -36, x1: -8, z0: -170, z1: -152, job: 6601, subj: ["wind-calling"], col: 0x9AD8F0, wing: 1 },
{ id: "enchant", name: "The Enchanting Forge", x0: -36, x1: -8, z0: -188, z1: -170, job: 6602, subj: ["enchanting"], col: 0xFFB060, wing: 1 },
{ id: "runes", name: "The Hall of Runes", x0: -36, x1: -8, z0: -206, z1: -188, job: 6607, subj: ["rune-marking", "sigil-warding"], col: 0xE8D070, wing: 1 },
{ id: "scry", name: "The Scrying Chamber", x0: -36, x1: -8, z0: -224, z1: -206, job: 6606, subj: ["scrying"], col: 0x8AA0FF, wing: 1 },
{ id: "alchemy", name: "The Alchemy Laboratory", x0: 8, x1: 36, z0: -152, z1: -134, job: 6603, subj: ["potion-brewing"], col: 0x7AE8B0, wing: 1, brew: 1 },
{ id: "stores", name: "The Alchemists' Stores", x0: 8, x1: 36, z0: -170, z1: -152, wing: 1 },
{ id: "dorm", name: "The Students' Dormitory", x0: 8, x1: 36, z0: -188, z1: -170, wing: 1 },
{ id: "masters", name: "The Masters' Common Room", x0: 8, x1: 36, z0: -206, z1: -188, wing: 1 },
{ id: "wandgal", name: "The Wandwright's Gallery", x0: 8, x1: 36, z0: -224, z1: -206, wing: 1 },
{ id: "range", name: "The Practice Range", x0: -36, x1: 36, z0: -252, z1: -224, job: 6610, wing: 1 },
{ id: "grland", name: "The Garden Cloister", x0: -8, x1: 8, z0: 122, z1: 134, grounds: 1 },
{ id: "grwalk", name: "The Glass Walk", x0: -8, x1: 8, z0: 134, z1: 224, grounds: 1 },
{ id: "herbs", name: "The Glasshouse of Herbs", x0: -40, x1: -8, z0: 134, z1: 170, job: 6604, subj: ["herb-lore"], col: 0x8AE070, grounds: 1, beds: ["sunpetal", "emberroot", "sunpetal", "emberroot"] },
{ id: "moon", name: "The Moonlit Glasshouse", x0: -40, x1: -8, z0: 170, z1: 206, grounds: 1, beds: ["moonmint", "moonmint", "moonmint"] },
{ id: "shed", name: "The Potting Shed", x0: -40, x1: -8, z0: 206, z1: 224, job: 6608, grounds: 1 },
{ id: "menag", name: "The Menagerie", x0: 8, x1: 44, z0: 134, z1: 188, job: 6605, subj: ["beast-calming"], col: 0xE8A86A, grounds: 1 },
{ id: "aviary", name: "The Aviary", x0: 8, x1: 44, z0: 188, z1: 224, job: 6609, grounds: 1 },
{ id: "garden", name: "The Reflecting Garden", x0: -40, x1: 44, z0: 224, z1: 242, grounds: 1 }
];
var SPB_CASTLE_SUBJ = { passage: ["shadow-stepping"], veils: ["shadow-doubling", "darksight"], transfig: ["polymorph"], astro: ["starfall", "faerglow-calling"] };
var SPB_DUSK_ROOMS = [
{ id: "dw_shadow", name: "Shadow and Illusion, the Duskwell Academy", subj: ["shadow-striking", "night-veiling"], col: 0xB070E8, teach: "Master Caelos", job: 6611 },
{ id: "dw_wards", name: "Curses and Hexes, the Duskwell Academy", subj: ["hexing"], col: 0xE070A8, teach: "Mistress Orla", job: 6612 },
{ id: "dw_light", name: "Fear and the Dark, the Duskwell Academy", subj: ["dread-calling"], col: 0xC8A0FF, teach: "Mistress Iriel", job: 6613 },
{ id: "dw_circle", name: "The Practice Hall, the Duskwell Academy", subj: ["soul-draining"], col: 0x9A80FF, teach: "Mistress Iriel", job: 6613 },
{ id: "dw_stone", name: "The lecture theatre, the Duskwell Academy", subj: ["stone-singing"], col: 0xC8A070, teach: "Master Caelos", job: 6614 },
{ id: "dw_silk", name: "Silk and Venom, the Duskwell Academy", subj: ["silk-binding"], col: 0xD8D8F0, teach: "Mistress Vhessa of House Ostrael", job: 6616 },
{ id: "dw_lore", name: "Lore of the Dead, the Duskwell Academy", subj: ["wraith-raising"], col: 0x8A7AA0, teach: "Sorrith of the Spire library", job: 6615 }
].map(function (r) { r.x0 = 1; r.x1 = 0; r.z0 = 1; r.z1 = 0; r.dusk = 1; return r; });
var SPB_STAFF = {
6600: ["Professor of Wards", "wards", [8, 6, 15, 6], 0x5A3A9A],
6601: ["Professor of Winds", "winds", [8, 6, 15, 6], 0x3A7A9A],
6602: ["Master Enchanter of the Academy", "enchant", [9, 6, 16, 6], 0x9A5A1A],
6603: ["Professor of Alchemy", "alchemy", [8, 6, 15, 6], 0x2A7A5A],
6604: ["Professor of Herb-lore", "herbs", [7, 6, 14, 6], 0x3A7A2A],
6605: ["Keeper of the Academy Menagerie", "menag", [7, 8, 15, 8], 0x7A5A2A],
6606: ["Professor of Scrying", "scry", [18, 6, 1, 6], 0x2A3A7A],
6607: ["Professor of Runes", "runes", [8, 6, 15, 6], 0x7A6A1A],
6608: ["Academy glasshouse gardener", "shed", [6, 8], 0x4A6A2A],
6609: ["Academy aviary keeper", "aviary", [6, 8], 0x5A5A3A],
6610: ["Warden of the Practice Range", "range", [10, 6, 17, 6], 0x6A2A2A]
};
var SPB_DUSK_JOBS = [
[6611, "Academy teacher of Shadow and Illusion", "The Duskwell Academy", 13, 1, false, [9, 8], [["Teach the shadow strike", "station", ["Dim the lamps to half", "Show the strike on a straw foe", "Pour the veil of night", "Bring the lamps back up"]]]],
[6612, "Academy teacher of Curses and Hexes", "The Duskwell Academy", 13, 1, false, [9, 8], [["Teach the hexes", "station", ["Chalk the cursing ring", "Set out the straw foes", "Watch each student lay a hex", "Burn the straw"]]]],
[6613, "Academy teacher of Fear and the Dark", "The Duskwell Academy", 13, 1, false, [10, 8], [["Teach dread and the drain", "station", ["Douse the lamps", "Call up the dread", "Show the drain on a straw foe", "Light the lamps again"]]]],
[6614, "Academy teacher of the Stone-Songs", "The Duskwell Academy", 13, 1, false, [9, 8], [["Teach the earthrend", "station", ["Brace the benches", "Sing the stone open", "Clear the spikes away", "Check nothing fell from the shelves"]]]],
[6615, "Academy teacher of the Lore of the Dead", "The Duskwell Academy", 13, 1, false, [9, 8], [["Teach the raising of wraiths", "station", ["Set out the old bones", "Read the names of the dead", "Raise a wraith and lay it down", "Put the bones away"]]]],
[6616, "Academy teacher of Silk and Venom", "The Duskwell Academy", 13, 1, false, [9, 8], [["Teach the venom web", "station", ["Milk the venom", "Wind the practice silk", "Snare a straw foe", "Coil the silk"]]]],
[6617, "Keeper of the Glowcap Garden", "The Duskwell Academy", 10, 2, true, [7, 8], [["Tend the Glowcap Garden", "station", ["Mist the glowcap beds", "Turn the pearlmoss", "Pick what is ripe for the laboratory", "Rake the paths"]]]]
];
var SPB_HERBS = {
sunpetal: { name: "Sunpetal", icon: "🌼", note: "a golden flower that drinks the light; grown in the Glasshouse of Herbs, found in sunny lands" },
emberroot: { name: "Emberroot", icon: "🥕", note: "a hot red root; grown in the Glasshouse of Herbs, found in hot and fiery lands" },
moonmint: { name: "Moonmint", icon: "🌿", note: "a pale leaf that opens at night; grown in the Moonlit Glasshouse, found anywhere after dark" },
glowcap: { name: "Glowcap", icon: "🍄", note: "a softly glowing cave fungus; grown in Duskwell's Glowcap Garden, found in the deep" },
pearlmoss: { name: "Pearlmoss", icon: "🪸", note: "a damp silver moss beaded like pearls; grown in the Glowcap Garden, found by water and in caves" }
};
var SPB_POTIONS = {
mend: { name: "Draught of Mending", icon: "❤", col: "#E87A8A", needs: { sunpetal: 2, moonmint: 1 },
does: "mends 40 vigour in any fight (Ironfray, dreamer fights, ambushes)" },
swift: { name: "Draught of Swiftness", icon: "➶", col: "#F0C060", needs: { emberroot: 2, sunpetal: 1 },
does: "you run a third faster for 90 seconds" },
night: { name: "Draught of Night Eyes", icon: "◉", col: "#A890FF", needs: { glowcap: 2, moonmint: 1 },
does: "darksight for 3 minutes, learned or not" },
iron: { name: "Draught of Iron Skin", icon: "⬢", col: "#9AA8B8", needs: { pearlmoss: 2, emberroot: 1 },
does: "blows do a little over half their harm for 60 seconds" },
breath: { name: "Draught of Clear Breath", icon: "≈", col: "#7AD8E8", needs: { moonmint: 1, pearlmoss: 1 },
does: "breathe under water for 2 minutes, learned or not" }
};
var SPB_HERB_CAP = 40, SPB_BED_REGROW = 600;
var SPB = { t: 0, cool: {}, buf: {}, temp: {}, ward: 0, wardHp: 0, fx: [], decoy: null, ring: null, marks: [], dummies: [], pinned: null, warned: {}, curF: null, casting: false,
wisp: null, bubble: null, rune: null, runes: {}, beds: {}, barAt: 0, book: null, potEl: null };
function spbWarn(k, e) { if (!SPB.warned[k] && window.console) {
SPB.warned[k] = 1;
console.warn("[academies] " + k, e);
} }
function spbSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function spbTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function spbLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof GFX_PHONE !== "undefined" && !!GFX_PHONE); }
function spbKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function spbTitle(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
(function () {
try {
if (typeof AC_LORE === "undefined" || typeof AC_ROOMS === "undefined")
return;
Object.keys(SPB_LORE).forEach(function (k) { AC_LORE[k] = SPB_LORE[k]; if (AC_SUBJECTS.indexOf(k) < 0)
AC_SUBJECTS.push(k); });
SPB_ROOMS.concat(SPB_DUSK_ROOMS).forEach(function (r) { if (!AC_ROOM[r.id]) {
AC_ROOMS.push(r);
AC_ROOM[r.id] = r;
} });
Object.keys(SPB_STAFF).forEach(function (j) { AC_STAFF[j] = SPB_STAFF[j]; });
if (typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[AC_KEY]) {
var W = WP_BY_KEY[AC_KEY];
Object.keys(SPB_STAFF).forEach(function (j) { j = +j; if (W.jobs.indexOf(j) < 0)
W.jobs.push(j); if (typeof WP_BY_JOB !== "undefined")
WP_BY_JOB[j] = AC_KEY; });
}
if (typeof HX_JOBS !== "undefined")
SPB_DUSK_JOBS.forEach(function (j) { if (!HX_JOBS.some(function (q) { return q[0] === j[0]; }))
HX_JOBS.push([j[0], "underdark", j[1], j[2], j[3], j[4], j[5], j[6], j[7]]); });
}
catch (e) {
spbWarn("join", e);
}
})();
function spbKnows(s) { return typeof acLearned === "function" && acLearned(s); }
function spbOn(s) { return spbKnows(s) && !(typeof acOff === "function" && acOff(s)); }
function spbAnyKnown() { for (var i = 0; i < SPB_SPELLS.length; i++)
if (spbOn(SPB_SPELLS[i].s))
return true; return false; }
function spbTempOn(n) { return (SPB.temp[n] || 0) > SPB.t; }
(function () {
if (typeof hasAbility !== "function")
return;
var ha = hasAbility;
hasAbility = function (name) {
if (SPB_BY[name])
return spbOn(name) || spbTempOn(name);
if (spbTempOn(name))
return true;
return ha.apply(this, arguments);
};
})();
function spbStore() {
var d = (typeof store !== "undefined" && store) || {};
if (!d.spb || typeof d.spb !== "object")
d.spb = {};
var S = d.spb;
if (!Array.isArray(S.pin))
S.pin = null;
if (!S.herb || typeof S.herb !== "object")
S.herb = {};
if (!S.pot || typeof S.pot !== "object")
S.pot = {};
if (!S.runes || typeof S.runes !== "object")
S.runes = {};
if (!S.beds || typeof S.beds !== "object")
S.beds = {};
return S;
}
function spbSave() { if (typeof save === "function")
try {
save();
}
catch (e) { } }
function spbPinned(s) {
var S = spbStore();
if (S.pin)
return S.pin.indexOf(s) >= 0;
var on = SPB_SPELLS.filter(function (p) { return spbOn(p.s) && p.s !== "potion-brewing"; }).slice(0, 4).map(function (p) { return p.s; });
return on.indexOf(s) >= 0;
}
function spbPinToggle(s) { return __ZC(351, 0, this, arguments, new.target); }
(function () {
if (typeof PW_USE === "undefined")
return;
PW_USE.push({ n: "spellbook", i: "✨", t: "Spells", on: function () { return !!(SPB.book && SPB.book.style.display === "block"); } });
SPB_SPELLS.forEach(function (p) { PW_USE.push({ n: p.s, i: p.i, t: p.t, on: function () { return spbActive(p.s); } }); });
if (typeof pwHas === "function") {
var ph = pwHas;
pwHas = function (n) { if (n === "spellbook")
return spbAnyKnown() || spbPotCount() > 0; if (SPB_BY[n])
return spbOn(n) && spbPinned(n); return ph.apply(this, arguments); };
}
if (typeof pwUse === "function") {
var pu = pwUse;
pwUse = function (n) {
if (n === "spellbook") {
spbBookToggle();
if (typeof pwBarSig !== "undefined")
pwBarSig = "";
return;
}
if (SPB_BY[n]) {
spbCast(n);
if (typeof pwBarSig !== "undefined") {
pwBarSig = "";
pwBarAt = 0;
}
return;
}
return pu.apply(this, arguments);
};
}
})();
function spbActive(s) { return __ZC(351, 1, this, arguments, new.target); }
function spbCoolLeft(s) { return Math.max(0, (SPB.cool[s] || 0) - SPB.t); }
function spbCast(s) { return __ZC(351, 2, this, arguments, new.target); }
var SPB_CAST = {};
function spbWhereTaught(s) {
var r = typeof acRoomOf === "function" ? acRoomOf(s) : null;
if (!r)
return "the Academy";
if (r.dusk)
return r.name.replace(/, the Duskwell Academy$/, "") + ", at the Duskwell Academy in the Underdark";
return r.name + ", at the Somnucor Academy of the Arcane";
}
function spbP() { return camera.position; }
function spbFeetY() { return typeof pwFeet === "function" ? pwFeet().y : camera.position.y - 1.72; }
function spbFwd() { return { x: -Math.sin(yaw), z: -Math.cos(yaw) }; }
function spbWorld() { return (typeof WLD !== "undefined" && WLD && WLD.on) ? WLD.on : ""; }
function spbInside() { return !!(typeof store !== "undefined" && store.inside); }
function spbDark() { return __ZC(351, 3, this, arguments, new.target); }
var SPELL_FOES = window.SPELL_FOES = window.SPELL_FOES || [];
var SPELL_MEND = window.SPELL_MEND = window.SPELL_MEND || [];
function spbFoes(range) { return __ZC(351, 4, this, arguments, new.target); }
function spbAimed(range, cone) {
var P = spbP(), f = spbFwd(), best = null;
spbFoes(range).forEach(function (o) {
var dx = o.x - P.x, dz = o.z - P.z, d = Math.hypot(dx, dz) || 0.01, c = (dx * f.x + dz * f.z) / d;
if (d > 1.6 && c < Math.cos(cone || 0.5))
return;
var score = d * (1.4 - c);
if (!best || score < best.s)
best = { o: o, s: score };
});
return best && best.o;
}
function spbPvpHit(o, d) { return __ZC(351, 5, this, arguments, new.target); }
function spellHarm(d) { return __ZC(351, 6, this, arguments, new.target); }
window.spellHarm = spellHarm;
function spellDecoy() { return SPB.decoy ? { x: SPB.decoy.x, z: SPB.decoy.z } : null; }
function spellRing() { return SPB.ring ? { x: SPB.ring.x, z: SPB.ring.z, r: SPB.ring.r } : null; }
function spellUnseen() { return (typeof PW !== "undefined" && !!PW.unseen) || (SPB.buf.veil || 0) > SPB.t; }
window.spellDecoy = spellDecoy;
window.spellRing = spellRing;
window.spellUnseen = spellUnseen;
function spbMend(n) { return __ZC(351, 7, this, arguments, new.target); }
(function () {
if (typeof bwHurtMe === "function") {
var bh = bwHurtMe;
bwHurtMe = function (dmg, src, raw) { try {
if (!(typeof BW !== "undefined" && BW.ride && !raw))
dmg = spellHarm(dmg);
}
catch (e) { } if (dmg <= 0)
return; return bh.call(this, dmg, src, raw); };
}
if (typeof dgrHurt === "function") {
var dh = dgrHurt;
dgrHurt = function (d, from, name) { try {
if (dgrFightHere() && !DGR.downT && !(DGR.guard > 0))
d = spellHarm(Math.max(0, Math.min(25, +d || 0)));
}
catch (e) { } return dh.call(this, d, from, name); };
}
if (typeof dgrRpc === "function") {
var dr = dgrRpc;
dgrRpc = function (n, a) { try {
if (n === "danger_send" && a && a.p_body && a.p_body.t === "hit" && !SPB.casting && (SPB.buf.enchant || 0) > SPB.t)
a.p_body.d = Math.min(25, Math.round(a.p_body.d * 1.5));
}
catch (e) { } return dr.apply(this, arguments); };
}
if (typeof bwStrikeFoe === "function") {
var bs = bwStrikeFoe;
bwStrikeFoe = function (o, dmg, ex) { if (!SPB.casting && (SPB.buf.enchant || 0) > SPB.t)
dmg *= 1.5; return bs.call(this, o, dmg, ex); };
}
if (typeof bwShoot === "function") {
var bo = bwShoot;
bwShoot = function (o) { try {
if (o && o.owner === "me" && (SPB.buf.enchant || 0) > SPB.t)
o.dmg *= 1.5;
}
catch (e) { } return bo.apply(this, arguments); };
}
})();
(function () {
if (typeof pwHeal === "function") {
var hl = pwHeal;
pwHeal = function () { var r = hl.apply(this, arguments); if (spbMend(35))
spbSay("<b>The light mends you:</b> +35 vigour."); return r; };
}
if (typeof pwStopTime === "function") {
var st = pwStopTime;
pwStopTime = function () { var r = st.apply(this, arguments); spbFoes(60).forEach(function (o) { try {
o.hold(10);
}
catch (e) { } }); return r; };
}
if (typeof bwSpots === "function") {
var sp = bwSpots;
bwSpots = function (x, z, d) { if (spellUnseen() && d > 3)
return false; return sp.apply(this, arguments); };
}
})();
(function () {
if (typeof bwFTick !== "function")
return;
var ft = bwFTick;
bwFTick = function (F, dt) {
if (F && F.st !== "dead" && F.spbHold > 0) {
F.spbHold -= dt;
F.cool = Math.max(F.cool || 0, 0.4);
if (F.g) {
F.g.position.y = F.y + (F.k.fly ? F.k.fly : 0);
F.g.rotation.z = Math.sin(SPB.t * 9 + F.id) * 0.04;
}
if (F.spbHold <= 0 && F.g)
F.g.rotation.z = 0;
return;
}
if (F && F.spbCalm > 0)
F.spbCalm -= dt;
SPB.curF = F;
try {
return ft.apply(this, arguments);
}
finally {
SPB.curF = null;
try {
var R = SPB.ring;
if (R && F && F.st !== "dead" && F.team !== "dummy" && typeof bwHostile === "function" && bwHostile(F.team, bwMyTeam())) {
var lx = R.x - BW.base, dx = F.x - lx, dz = F.z - R.z, d = Math.hypot(dx, dz);
if (d < R.r + 0.6) {
var k = (R.r + 0.7) / (d || 0.01);
F.x = lx + dx * k;
F.z = R.z + dz * k;
if (F.g)
F.g.position.set(F.x, F.g.position.y, F.z);
}
}
}
catch (e) { }
}
};
if (typeof bwPickTarget === "function") {
var pt = bwPickTarget;
bwPickTarget = function (team, x, z, range) {
var r = pt.apply(this, arguments);
if (r === "me") {
var F = SPB.curF;
if (F && F.spbCalm > 0)
return null;
var D = SPB.decoy;
if (D && Math.hypot(D.x - BW.base - x, D.z - z) < range + 6)
return { decoy: D };
}
return r;
};
}
if (typeof bwTgtPos === "function") {
var tp = bwTgtPos;
bwTgtPos = function (t) { if (t && t.decoy) {
var D = t.decoy;
return SPB.decoy === D ? { x: D.x - BW.base, z: D.z, y: D.y + 0.8 } : null;
} return tp.apply(this, arguments); };
}
if (typeof bwDamage === "function") {
var bd = bwDamage;
bwDamage = function (t, dmg) { if (t && t.decoy) {
spbDecoyHit(t.decoy, dmg);
return;
} return bd.apply(this, arguments); };
}
})();
function spbPace() {
var k = 1, B = SPB.buf;
if ((B.swift || 0) > SPB.t)
k *= 1.33;
if ((B.tail || 0) > SPB.t)
k *= 1.25;
if ((B.stone || 0) > SPB.t)
k *= 0.78;
return k;
}
(function () {
if (typeof walkBy !== "function")
return;
var wb = walkBy;
walkBy = function (mx, mz) { var k = spbPace(); if (k !== 1 && !(typeof RAP !== "undefined" && RAP && RAP.noMult)) {
mx *= k;
mz *= k;
} return wb.call(this, mx, mz); };
})();
function spbSeeK() {
var S = spbStore(), k = 1;
var dark = !!S.dark && spbOn("darksight") || spbTempOn("darksight");
if (dark)
k = Math.max(k, 2.1);
if (S.wisp && spbOn("faerglow-calling"))
k = Math.max(k, 1.45);
return k;
}
(function () {
if (typeof renderView !== "function")
return;
var rv = renderView;
renderView = function () {
var k = 1;
try {
k = spbSeeK();
}
catch (e) { }
if (k === 1 || typeof hemi === "undefined" || !hemi)
return rv.apply(this, arguments);
var h0 = hemi.intensity, F = typeof scene !== "undefined" && scene ? scene.fog : null, fd = F && F.density, ff = F && F.far;
var floor = k > 2 ? 1.7 : 1.05;
hemi.intensity = Math.max(h0 * k, floor);
if (F) {
if (fd !== undefined)
F.density = fd / (k > 2 ? 2.6 : 1.5);
else if (ff !== undefined)
F.far = ff * (k > 2 ? 2.4 : 1.4);
}
try {
return rv.apply(this, arguments);
}
finally {
hemi.intensity = h0;
if (F) {
if (fd !== undefined)
F.density = fd;
else if (ff !== undefined)
F.far = ff;
}
}
};
})();
function spbBookToggle() {
var el = spbBookEl();
if (el.style.display === "block") {
el.style.display = "none";
return;
}
spbBookPaint();
el.style.display = "block";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
}
function spbBookEl() { return __ZC(351, 8, this, arguments, new.target); }
function spbBookPaint() { return __ZC(351, 9, this, arguments, new.target); }
function spbShowWay(s) { return __ZC(351, 10, this, arguments, new.target); }
(function () {
if (typeof vrpMenuItems !== "function")
return;
var vm = vrpMenuItems;
vrpMenuItems = function () {
var items = vm.apply(this, arguments);
try {
var sub = [{ t: "◀ All of the menu", keep: true, run: function () { vrpMenuSection(null); } }];
SPB_SPELLS.forEach(function (p) { if (!spbOn(p.s) || p.s === "potion-brewing")
return; sub.push({ t: p.i + " " + p.n + (spbActive(p.s) ? " (on)" : ""), run: function () { spbCast(p.s); } }); });
Object.keys(SPB_POTIONS).forEach(function (k) { var n = spbStore().pot[k] || 0; if (n > 0)
sub.push({ t: "🧪 Drink " + SPB_POTIONS[k].name + " (" + n + ")", run: function () { spbDrink(k); } }); });
if (sub.length > 1 && !items.some(function (i) { return /Spells/.test(i.t); }))
items.splice(Math.min(3, items.length), 0, { t: "✨ Spells ▸", keep: true, run: function () { vrpMenuSection({ t: "✨ Spells", items: sub }); } });
}
catch (e) {
spbWarn("vr menu", e);
}
return items;
};
})();
function spbMat(col, op, o) {
var m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, side: (o && o.ds) ? THREE.DoubleSide : THREE.FrontSide, fog: false });
if (o && o.add)
m.blending = THREE.AdditiveBlending;
return m;
}
function spbGlow(col, size, op) { return typeof wGlow === "function" ? wGlow(col, size, op) : new THREE.Sprite(new THREE.SpriteMaterial({ color: col, transparent: true, opacity: op })); }
function spbBurst(x, y, z, col, n, spread, life, kind, size) { if (typeof pwBurst === "function")
return pwBurst(x, y, z, col, spbLite() ? Math.ceil(n * 0.5) : n, spread, life, kind, size); return null; }
function spbRing(x, y, z, col, r, life) { if (typeof pwRing === "function")
pwRing(x, y, z, col, r, life); }
function spbAdd(o, life, tick) { scene.add(o); SPB.fx.push({ o: o, t: 0, life: life, tick: tick }); return o; }
function spbDrop(o) { if (!o)
return; if (o.parent)
o.parent.remove(o); o.traverse(function (m) { if (m.geometry && !m.geometry.userData.keep)
m.geometry.dispose(); }); }
function spbGlyphTex(ch, col) {
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.clearRect(0, 0, 128, 128);
x.fillStyle = col || "#F0E0A0";
x.font = "bold 92px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(ch, 64, 70);
var t = new THREE.CanvasTexture(c);
return t;
}
function spbFeet() { var P = spbP(); return { x: P.x, y: spbFeetY(), z: P.z }; }
function spbTintEl() {
var d = document.getElementById("spb-tint");
if (d)
return d;
d = document.createElement("div");
d.id = "spb-tint";
d.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:23;transition:box-shadow .8s ease,background .8s ease";
document.body.appendChild(d);
return d;
}
SPB_CAST["warding"] = function () { return __ZC(351, 11, this, arguments, new.target); };
function spbWardHit(n) { SPB.wardPulse = Math.min(1, (SPB.wardPulse || 0) + n / 40); spbTone(880, 0.06); }
SPB_CAST["wind-calling"] = function () { return __ZC(351, 12, this, arguments, new.target); };
SPB_CAST["enchanting"] = function () { return __ZC(351, 13, this, arguments, new.target); };
SPB_CAST["potion-brewing"] = function () { spbPotOpen(); return false; };
function spbForageKind() { return __ZC(351, 14, this, arguments, new.target); }
SPB_CAST["herb-lore"] = function () { return __ZC(351, 15, this, arguments, new.target); };
SPB_CAST["beast-calming"] = function () { return __ZC(351, 16, this, arguments, new.target); };
SPB_CAST["scrying"] = function () { return __ZC(351, 17, this, arguments, new.target); };
function spbScryTick(dt) {
var on = (SPB.buf.scry || 0) > SPB.t;
if (!on) {
if (SPB.marks.length) {
SPB.marks.forEach(spbDrop);
SPB.marks = [];
}
return;
}
SPB.scryAt -= dt;
if (SPB.scryAt > 0)
return;
SPB.scryAt = 0.25;
var P = spbP(), list = [];
try {
if (typeof presenceOthers !== "undefined")
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], g = p && p.group;
if (!g || !g.parent || p.away)
return;
if (Math.hypot(g.position.x - P.x, g.position.z - P.z) < 150)
list.push({ x: g.position.x, y: g.position.y + 2.4, z: g.position.z, c: 0xFFD27A });
});
}
catch (e) { }
spbFoes(150).forEach(function (o) { if (o.kind === "pvp")
return; list.push({ x: o.x, y: o.y + 1.6, z: o.z, c: o.beast ? 0xFF9A5A : 0xFF6A6A }); });
var cap = spbLite() ? 14 : 28;
list = list.slice(0, cap);
while (SPB.marks.length < list.length) {
var s = spbGlow(0xFFFFFF, 1.4, 0.85);
s.material = s.material.clone();
s.material.depthTest = false;
s.renderOrder = 9;
scene.add(s);
SPB.marks.push(s);
}
SPB.marks.forEach(function (s, i) {
var q = list[i];
if (!q) {
s.visible = false;
return;
}
s.visible = true;
s.position.set(q.x, q.y, q.z);
s.material.color.setHex(q.c);
var d = Math.hypot(q.x - P.x, q.z - P.z), k = Math.max(0.9, d * 0.035);
s.scale.set(k, k, 1);
s.material.opacity = 0.55 + 0.25 * Math.sin(SPB.t * 1.6 + i);
});
}
function spbPlace() {
var w = spbWorld();
if (w === "underdark" && typeof UDX !== "undefined" && UDX.here)
return "underdark:" + UDX.here.key;
if (w)
return "world:" + w;
if (spbInside())
return "inside:" + ((typeof INT !== "undefined" && INT && INT.spec && (INT.spec.id || INT.wpKey)) || "room");
return "realm:" + ((typeof store !== "undefined" && store.here) || 0);
}
SPB_CAST["rune-marking"] = function () { return __ZC(351, 18, this, arguments, new.target); };
function spbRuneShow(force) {
var S = spbStore(), k = spbPlace(), R = S.runes[k];
if (R && Date.now() - R.at > 48 * 3600e3) {
delete S.runes[k];
R = null;
}
if (!force && SPB.rune && SPB.rune.k === k && R && SPB.rune.at === R.at)
return;
if (SPB.rune) {
spbDrop(SPB.rune.g);
SPB.rune = null;
}
if (!R)
return;
var g = new THREE.Group();
g.position.set(R.x, R.y + 0.04, R.z);
var disc = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), new THREE.MeshBasicMaterial({ map: spbGlyphTex("ᛟ", "#F4D878"), transparent: true, opacity: 0.85, depthWrite: false, fog: false }));
disc.rotation.x = -Math.PI / 2;
g.add(disc);
var ring = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.18, 40), spbMat(0xF0D070, 0.6, { ds: 1 }));
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.01;
g.add(ring);
var glow = spbGlow(0xF0D070, 3.2, 0.35);
glow.position.y = 0.6;
g.add(glow);
scene.add(g);
SPB.rune = { g: g, k: k, at: R.at, disc: disc, glow: glow };
}
SPB_CAST["shadow-stepping"] = function () { return __ZC(351, 19, this, arguments, new.target); };
SPB_CAST["shadow-doubling"] = function () { return __ZC(351, 20, this, arguments, new.target); };
function spbDecoyHit(D, d) { if (SPB.decoy !== D)
return; D.hp -= d; spbBurst(D.x, D.y + 1, D.z, 0x3A2A5A, 14, [0.4, 1, 0.4], 0.6, "burst", 0.25); if (D.hp <= 0)
spbDecoyEnd(); }
function spbDecoyEnd(quiet) { var D = SPB.decoy; if (!D)
return; SPB.decoy = null; spbBurst(D.x, D.y, D.z, 0x3A2A5A, 50, [0.6, 2, 0.6], 1, "rise", 0.3); spbDrop(D.g); if (!quiet)
spbSay("Your shadow double fades."); }
SPB_CAST["sigil-warding"] = function () { return __ZC(351, 21, this, arguments, new.target); };
function spbRingEnd(quiet) { var R = SPB.ring; if (!R)
return; SPB.ring = null; spbDrop(R.g); if (!quiet)
spbSay("The sigils fade from the ground."); }
function spbRingTick() {
var R = SPB.ring;
if (!R)
return;
if (SPB.t > R.until) {
spbRingEnd();
return;
}
R.marks.rotation.y = SPB.t * 0.15;
try {
if (typeof presenceOthers !== "undefined")
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], g = p && p.group;
if (!g || !g.parent)
return;
var inn = Math.hypot(g.position.x - R.x, g.position.z - R.z) < R.r;
if (inn && !R.seen[id]) {
R.seen[id] = 1;
spbTone(330, 0.2);
spbSay("⊛ <b>" + esc(String(p.name || "A dreamer").split(" · ")[0]) + "</b> crosses your sigils.");
}
if (!inn)
R.seen[id] = 0;
});
}
catch (e) { }
}
SPB_CAST["faerglow-calling"] = function () { return __ZC(351, 22, this, arguments, new.target); };
SPB_CAST["darksight"] = function () {
var S = spbStore();
S.dark = !S.dark;
spbSave();
spbTone(S.dark ? 480 : 360, 0.25);
spbSay(S.dark ? "<b>Darksight.</b> Your eyes take the dark: caves, the deep and night show clear." : "Your eyes are your own again.");
};
function spbWispTick() {
var S = spbStore(), on = S.wisp && spbOn("faerglow-calling");
if (!on) {
if (SPB.wisp) {
spbDrop(SPB.wisp);
SPB.wisp = null;
}
return;
}
if (!SPB.wisp) {
var g = new THREE.Group();
var c = spbGlow(0xE8D8FF, 0.5, 0.95);
g.add(c);
var h = spbGlow(0xB890FF, 2.2, 0.35);
g.add(h);
SPB.wisp = g;
scene.add(g);
}
if (!SPB.wisp.parent)
scene.add(SPB.wisp);
var P = spbP(), r = { x: Math.cos(yaw), z: -Math.sin(yaw) }, f = spbFwd(), t = SPB.t;
var want = new THREE.Vector3(P.x + r.x * 0.55 + f.x * 0.35, P.y + 0.15 + Math.sin(t * 1.3) * 0.08, P.z + r.z * 0.55 + f.z * 0.35);
if (SPB.wisp.position.distanceTo(want) > 6)
SPB.wisp.position.copy(want);
else
SPB.wisp.position.lerp(want, 0.12);
SPB.wisp.children[1].material.opacity = 0.28 + 0.08 * Math.sin(t * 0.9);
}
SPB_CAST["stone-singing"] = function () { return __ZC(351, 23, this, arguments, new.target); };
SPB_CAST["silk-binding"] = function () { return __ZC(351, 24, this, arguments, new.target); };
function spbWeb(x, y, z, life) { return __ZC(351, 25, this, arguments, new.target); }
SPB_CAST["stone-skin"] = function () {
SPB.buf.stone = SPB.t + 18;
var F = spbFeet();
spbBurst(F.x, F.y, F.z, 0x8A8478, 80, [0.8, 2.2, 0.8], 1.3, "fall", 0.3);
spbTone(150, 0.4);
spbSay("<b>Stoneskin.</b> Your skin turns to basalt for 18 seconds: blows do less than half their harm, and you walk slower.");
};
function spbTick(dt) {
SPB.t += dt;
for (var i = SPB.fx.length - 1; i >= 0; i--) {
var F = SPB.fx[i];
F.t += dt;
var k = Math.min(1, F.t / F.life);
try {
if (F.tick)
F.tick(F, k);
}
catch (e) { }
if (F.t >= F.life) {
spbDrop(F.o);
SPB.fx.splice(i, 1);
}
}
var P = spbP();
var wardOn = SPB.wardHp > 0 && (SPB.buf.ward || 0) > SPB.t;
if (SPB.bubble) {
if (!wardOn) {
if (SPB.bubble.parent) {
SPB.bubble.parent.remove(SPB.bubble);
if (SPB.wardHp > 0 && (SPB.buf.ward || 0) <= SPB.t)
spbSay("Your ward fades.");
}
SPB.wardHp = 0;
}
else {
SPB.bubble.position.set(P.x, spbFeetY() + 1.05, P.z);
SPB.wardPulse = Math.max(0, (SPB.wardPulse || 0) - dt * 0.8);
SPB.bubble.material.opacity = 0.07 + 0.025 * Math.sin(SPB.t * 1.4) + 0.18 * SPB.wardPulse;
}
}
if (SPB.decoy) {
var D = SPB.decoy;
if (SPB.t > D.until)
spbDecoyEnd();
else {
D.g.children.forEach(function (c) { if (c.material && c.isMesh)
c.material.opacity = 0.5 + 0.12 * Math.sin(SPB.t * 2); });
}
}
spbRingTick();
if ((SPB.runeAt = (SPB.runeAt || 0) - dt) <= 0) {
SPB.runeAt = 1;
try {
spbRuneShow(false);
}
catch (e) { }
}
if (SPB.rune) {
SPB.rune.glow.material.opacity = 0.28 + 0.08 * Math.sin(SPB.t * 1.1);
SPB.rune.disc.rotation.z = SPB.t * 0.1;
}
spbWispTick();
spbScryTick(dt);
if (SPB.shakeY) {
P.y -= SPB.shakeY;
SPB.shakeY = 0;
}
if (SPB.shake > 0) {
SPB.shake -= dt;
var s = Math.max(0, SPB.shake) / 0.6;
SPB.shakeY = Math.sin(SPB.t * 28) * 0.035 * s;
P.y += SPB.shakeY;
}
spbDummyTick(dt);
if ((SPB.tintAt = (SPB.tintAt || 0) - dt) <= 0) {
SPB.tintAt = 0.3;
var sh = "none", B = SPB.buf;
if ((B.stone || 0) > SPB.t)
sh = "inset 0 0 110px rgba(110,104,96,.55)";
else if ((B.iron || 0) > SPB.t)
sh = "inset 0 0 90px rgba(140,150,170,.4)";
else if (wardOn)
sh = "inset 0 0 90px rgba(176,138,255,.28)";
else if ((B.enchant || 0) > SPB.t)
sh = "inset 0 0 70px rgba(255,176,96,.18)";
var el = document.getElementById("spb-tint") || (sh !== "none" ? spbTintEl() : null);
if (el && el.style.boxShadow !== sh)
el.style.boxShadow = sh;
["enchant", "stone", "swift", "iron"].forEach(function (k) {
var e = B[k] || 0;
if (e && e <= SPB.t && !SPB["told_" + k + e]) {
SPB["told_" + k + e] = 1;
spbSay({ enchant: "The enchantment on your weapon fades.", stone: "Your skin is your own again.", swift: "The swiftness leaves your legs.", iron: "The iron leaves your skin." }[k]);
}
});
}
}
(function () {
if (typeof avatarTick !== "function")
return;
var at = avatarTick;
avatarTick = function (dt) { var r = at.apply(this, arguments); try {
spbTick(dt);
}
catch (e) {
spbWarn("tick", e);
} return r; };
})();
function spbDummy(parent, x, y, z, ry) { return __ZC(351, 26, this, arguments, new.target); }
function spbDummyHit(D, d) {
D.hp -= d;
D.kick = Math.min(1, (D.kick || 0) + d / 25);
spbDummyFx(D, 0xFFE0A0);
if (D.hp <= 0) {
D.hp = 100;
spbSay("<b>" + Math.round(d) + "</b> on the dummy, and it would be down. It is put back up.");
}
else
spbSay("<b>" + Math.round(d) + "</b> on the practice dummy (" + Math.round(D.hp) + " left).");
}
function spbDummyFx(D, col) { var w = new THREE.Vector3(); D.g.getWorldPosition(w); spbBurst(w.x, w.y + 1.2, w.z, col, 16, [0.4, 0.8, 0.4], 0.7, "burst", 0.18); }
function spbDummyTick(dt) {
for (var i = SPB.dummies.length - 1; i >= 0; i--) {
var D = SPB.dummies[i];
var on = D.g;
while (on && on !== scene)
on = on.parent;
if (!on) {
if (!D.g.parent)
SPB.dummies.splice(i, 1);
continue;
}
if (D.kick > 0) {
D.kick = Math.max(0, D.kick - dt * 1.6);
D.g.rotation.x = -Math.sin(SPB.t * 14) * 0.12 * D.kick;
}
else if (D.g.rotation.x)
D.g.rotation.x = 0;
if (D.held > 0) {
D.held -= dt;
D.g.rotation.z = Math.sin(SPB.t * 10) * 0.03;
}
else if (D.g.rotation.z)
D.g.rotation.z = 0;
if (D.hp < 100)
D.hp = Math.min(100, D.hp + dt * 6);
}
}
function spbHerbAdd(k, n) { var S = spbStore(), have = S.herb[k] || 0, room = Math.max(0, SPB_HERB_CAP - have), got = Math.min(room, n); if (got > 0) {
S.herb[k] = have + got;
spbSave();
} return got; }
function spbPotCount() { var S = spbStore(), n = 0; Object.keys(S.pot || {}).forEach(function (k) { n += S.pot[k] || 0; }); return n; }
function spbGather(bed, k) { return __ZC(351, 27, this, arguments, new.target); }
function spbBedReady(bed) { return (spbStore().beds[bed] || 0) <= Date.now(); }
function spbCanBrew(k) { var P = SPB_POTIONS[k], S = spbStore(); return Object.keys(P.needs).every(function (h) { return (S.herb[h] || 0) >= P.needs[h]; }); }
function spbNeedsHtml(k) { return __ZC(351, 28, this, arguments, new.target); }
function spbBrew(k) { return __ZC(351, 29, this, arguments, new.target); }
function spbBrewHtml(where) { return __ZC(351, 30, this, arguments, new.target); }
function spbBrewOpen(where) { return __ZC(351, 31, this, arguments, new.target); }
function spbDrink(k) { return __ZC(351, 32, this, arguments, new.target); }
function spbPotHtml(inBook) { return __ZC(351, 33, this, arguments, new.target); }
function spbPotOpen(brewing) { return __ZC(351, 34, this, arguments, new.target); }
function spbPotPaint() { return __ZC(351, 35, this, arguments, new.target); }
function spbAtCauldron() { try {
var r = typeof acWhere === "function" ? acWhere() : null;
return !!(r && r.brew);
}
catch (e) {
return false;
} }
addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-spbdrink],[data-spbbrew],[data-spbx],[data-spbgather]") : null;
if (!t)
return;
e.preventDefault();
if (t.hasAttribute("data-spbx")) {
var el = document.getElementById("spb-pot");
if (el)
el.style.display = "none";
return;
}
var wc = typeof WLD !== "undefined" && WLD.card && WLD.card.contains(t);
if (t.hasAttribute("data-spbdrink"))
spbDrink(t.getAttribute("data-spbdrink"));
if (t.hasAttribute("data-spbbrew"))
spbBrew(t.getAttribute("data-spbbrew"));
if (t.hasAttribute("data-spbgather")) {
var q = t.getAttribute("data-spbgather").split("|");
spbGather(q[0], q[1]);
}
setTimeout(function () {
spbPotPaint();
if (SPB.book && SPB.book.style.display === "block")
spbBookPaint();
if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint();
if (typeof acPaint === "function")
acPaint();
if (wc && t.hasAttribute("data-spbbrew") && typeof worldCard === "function")
spbBrewOpen("dusk");
if (wc && t.hasAttribute("data-spbgather") && typeof worldCard === "function")
dwGardenCard();
}, 40);
}, true);
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () { var h = bh.apply(this, arguments); try {
h += spbPotHtml(false);
}
catch (e) {
spbWarn("backpack", e);
} return h; };
})();
var SPB_H = 9;
function spbCtx(I) { return __ZC(351, 36, this, arguments, new.target); }
function spbGate(C, z0, z1) { var list = C.anim; return { push: function (f) { list.push(function (t) { var z = camera.position.z - ((typeof INT !== "undefined" && INT && INT.oz) || 0); if (z >= z0 && z <= z1)
f(t); }); } }; }
function spbBeast(C, k, x, z, ry, h) { return __ZC(351, 37, this, arguments, new.target); }
function spbWingBuild(I) { return __ZC(351, 38, this, arguments, new.target); }
function spbFree(G) { return __ZC(351, 39, this, arguments, new.target); }
(function () {
if (typeof AC_PADS !== "undefined") {
AC_PADS.push({ x: -19, z: 43, to: { x: 0, z: -128 }, name: "through the arch, to the Spellwright Wing" }, { x: 4.5, z: -124.5, to: { x: -19, z: 39.5 }, name: "through the arch, back to the West Gallery" }, { x: 19, z: 43, to: { x: 0, z: 128 }, name: "through the arch, to the Academy Grounds" }, { x: 4.5, z: 124.5, to: { x: 19, z: 39.5 }, name: "through the arch, back to the East Gallery" });
}
if (typeof acRoomDress === "function") {
var rd = acRoomDress;
acRoomDress = function (C, r) { if (r && r.dusk)
return; return rd.apply(this, arguments); };
}
if (typeof makeAcademyInterior === "function") {
var ma = makeAcademyInterior;
makeAcademyInterior = function (spec) { var I = ma.apply(this, arguments); try {
spbWingBuild(I);
}
catch (e) {
spbWarn("wing", e);
} return I; };
}
if (typeof acTick === "function") {
var at = acTick;
acTick = function (dt) {
var P = camera.position, x0 = P.x, z0 = P.z, r = at.apply(this, arguments);
try {
if (typeof INT !== "undefined" && INT && INT.academy && Math.hypot(P.x - x0, P.z - z0) > 20) {
var lz = P.z - INT.oz;
if (lz > 100 && lz < 140)
yaw = Math.PI;
var w = typeof acWhere === "function" ? acWhere() : null;
if (w && w.id === "swland")
spbSay("<b>The Spellwright Wing.</b> Wards, winds, enchanting, runes and scrying on the left; alchemy, the stores, the dormitory, the masters' room and the wands on the right; the Practice Range at the far end.");
if (w && w.id === "grland")
spbSay("<b>The Academy Grounds.</b> The glasshouses on the left (gather herbs from the beds), the Menagerie and the Aviary on the right, the Reflecting Garden at the far end.");
}
}
catch (e) { }
return r;
};
}
if (typeof exitInterior === "function") {
var exi = exitInterior;
exitInterior = function () {
var wing = null;
try {
if (typeof INT !== "undefined" && INT && INT.academy && INT.root)
wing = INT.root;
}
catch (e) { }
var r = exi.apply(this, arguments);
if (wing && !wing.parent && !(typeof INT !== "undefined" && INT && INT.root === wing))
try {
spbFree(wing);
}
catch (e) {
spbWarn("free", e);
}
return r;
};
}
if (typeof interiorTick === "function") {
var itk = interiorTick;
interiorTick = function () {
var E = typeof INT !== "undefined" && INT && INT.academy && INT.exit, ez = E ? INT.exit.z : 0, far = E && camera.position.z - INT.oz > 60;
if (far)
INT.exit.z = 1e9;
try {
return itk.apply(this, arguments);
}
finally {
if (far && INT && INT.exit)
INT.exit.z = ez;
}
};
}
if (typeof acStaffSync === "function") {
var ss = acStaffSync;
acStaffSync = function () {
var r = ss.apply(this, arguments);
try {
if (INT && INT.academy)
Object.keys(INT.academy.staff).forEach(function (j) { var S = AC_STAFF[j]; if (!S || !SPB_STAFF[j])
return; var g = INT.academy.staff[j].g, sp = (INT.spots || []).filter(function (q) { return q.room === S[1] && q.face !== undefined; })[0]; if (g && sp) {
g.position.set(sp.x, 0, sp.z);
g.rotation.y = sp.face;
} var G = INT.academy.spbG, R = AC_ROOM[S[1]]; if (g && G && R) {
var to = R.grounds ? G.grounds : G.wing;
if (g.parent !== to)
to.add(g);
} });
}
catch (e) { }
return r;
};
}
})();
var DW_ROOM_OF = { shadow: "dw_shadow", mirror: "dw_shadow", wards: "dw_wards", light: "dw_light", lore: "dw_lore", stone: "dw_stone", circle: "dw_circle", silk: "dw_silk" };
var DW_BEDS = [["dw_g0", "glowcap"], ["dw_g1", "glowcap"], ["dw_g2", "glowcap"], ["dw_g3", "pearlmoss"], ["dw_g4", "pearlmoss"]];
function dwRoom(id) { for (var i = 0; i < SPB_DUSK_ROOMS.length; i++)
if (SPB_DUSK_ROOMS[i].id === id)
return SPB_DUSK_ROOMS[i]; return null; }
(function () {
if (typeof acTeacher !== "function")
return;
var at = acTeacher;
acTeacher = function (r) { if (r && r.dusk)
return r.teach || null; return at.apply(this, arguments); };
})();
function dwSpellsHtml(k) { return __ZC(351, 40, this, arguments, new.target); }
function dwClass(k) {
if (typeof udxLesson === "function")
udxLesson(k);
try {
var c = WLD.card;
if (c && c.style.display === "block") {
var d = document.createElement("div");
d.innerHTML = dwSpellsHtml(k);
c.appendChild(d);
}
}
catch (e) {
spbWarn("dusk class", e);
}
}
(function () {
if (typeof udxLesson !== "function")
return;
var ul = udxLesson;
udxLesson = function (k) { var r = ul.apply(this, arguments); try {
var c = WLD.card;
if (c && c.style.display === "block" && DW_ROOM_OF[k] && !c.querySelector("[data-dwl]")) {
var d = document.createElement("div");
d.innerHTML = dwSpellsHtml(k);
c.appendChild(d);
}
}
catch (e) { } return r; };
dwClass = function (k) { udxLesson(k); };
})();
addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-dwl]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var s = t.getAttribute("data-dwl");
if (typeof worldCard === "function")
worldCard(null);
if (typeof acLesson === "function")
acLesson(s);
}, true);
function dwGardenCard() { return __ZC(351, 41, this, arguments, new.target); }
function dwAnim(A, fn) { UDX.anim.push({ fn: function (dt, t) { if (A.g && A.g.visible !== false)
fn(t, dt); } }); }
function dwMesh(K, geo, mat, a, b, y, ry) { var p = K.pt(a, b), m = new THREE.Mesh(geo, mat); m.position.set(p[0], K.y + (y || 0), p[1]); if (ry !== undefined)
m.rotation.y = ry; K.A.g.add(m); return m; }
function dwSolid(K, a, b, hw, hd, h) { var p = K.pt(a, b); udxSolid(K.A, p[0], p[1], hw, hd, K.ryIn, h || 1.2, K.y); }
function dwFloorRing(K, a, b, r0, r1, col, op, seg) { var m = dwMesh(K, new THREE.RingGeometry(r0, r1, seg || 48), udxMat(col, null, { basic: 1, op: op || 0.5, ds: 1 }), a, b, 0.035); m.rotation.x = -Math.PI / 2; m.userData.keep = 1; return m; }
function dwBuild(K, k, a, b, h, ry, y) { return __ZC(351, 42, this, arguments, new.target); }
function dwCase(K, a, b, inner) {
var wood = udxMat(0x2A2030, "wood"), glass = udxMat(0xC8D8F0, null, { basic: 1, op: 0.16, ds: 1 });
dwMesh(K, new THREE.BoxGeometry(1.4, 0.9, 0.9), wood, a, b, 0.45, K.ryIn);
dwMesh(K, new THREE.BoxGeometry(1.36, 0.9, 0.86), glass, a, b, 1.35, K.ryIn);
dwSolid(K, a, b, 0.72, 0.47, 1.8);
if (inner)
inner(a, b);
}
function dwSigilTex(ch, col) { return typeof spbGlyphTex === "function" ? spbGlyphTex(ch, col) : null; }
UDX_KITS.dwshadow = function (K) { return __ZC(351, 43, this, arguments, new.target); };
UDX_KITS.dwwards = function (K) { return __ZC(351, 44, this, arguments, new.target); };
UDX_KITS.dwlight = function (K) { return __ZC(351, 45, this, arguments, new.target); };
UDX_KITS.dwlore = function (K) { return __ZC(351, 46, this, arguments, new.target); };
UDX_KITS.dwsilkroom = function (K) { return __ZC(351, 47, this, arguments, new.target); };
UDX_KITS.dwgarden = function (K) { return __ZC(351, 48, this, arguments, new.target); };
UDX_KITS.dwmirrors = function (K) { return __ZC(351, 49, this, arguments, new.target); };
UDX_KITS.dwsigils = function (K) { return __ZC(351, 50, this, arguments, new.target); };
UDX_KITS.dwsilkloft = function (K) {
UDX_KITS.loom(K);
var cols = [0xE8E8F8, 0xD8C8F0, 0xC8D8E8, 0xF0E0E8];
for (var i = 0; i < (UDX.lite ? 3 : 6); i++) {
var m = dwMesh(K, new THREE.PlaneGeometry(0.9, 2.6), udxMat(cols[i % 4], null, { ds: 1 }), -K.W / 2 + 1.4 + i * (K.W - 2.8) / 5, 0.5, K.h - 1.6, K.ryIn);
m.userData.keep = 1;
}
};
UDX_KITS.dwecho = function (K) { return __ZC(351, 51, this, arguments, new.target); };
UDX_KITS.dwbestiary = function (K) { return __ZC(351, 52, this, arguments, new.target); };
UDX_KITS.dwwell = function (K) { return __ZC(351, 53, this, arguments, new.target); };
UDX_KITS.dwrange = function (K) { return __ZC(351, 54, this, arguments, new.target); };
function dwRangeCard() { return __ZC(351, 55, this, arguments, new.target); }
var SPB_ROOM_SAY = {
swland: "The Spellwright Wing. Wards, winds, enchanting, runes and scrying on the left; alchemy, the stores, the dormitory, the masters' room and the wands on the right; the Practice Range at the far end.",
swhall: "The Spellwrights' Hall: the statues are the founders of the wing. Every classroom is named over its door.",
stores: "Jars, sacks and bottles for the Laboratory. Herbs are never sold here: they are gathered in the Academy's glasshouses and in Duskwell's Glowcap Garden.",
dorm: "Where the Academy's boarders sleep. Quiet, please.",
masters: "The professors' fire, armchairs and books, where they argue about magic after hours.",
wandgal: "Wands of every wood and core, under glass. A wand helps you aim the casting magics (fire, storm, frost and light).",
range: "Cast at the straw dummies: they glow, shake and keep count. Try Ward, Gust, Calm Beast, Polymorph, Starfall, Blink, a Mirror Double, a Sigil, and an enchanted strike.",
grland: "The Academy Grounds, under glass. The glasshouses on the left, the Menagerie and the Aviary on the right, the Reflecting Garden at the far end.",
grwalk: "The Glass Walk. The sky over the glass is the sky outside, at the hour it is.",
moon: "Moonmint only grows in the dark, under the darkened glass. Gather what is ripe.",
shed: "Pots, trowels and seed trays: where the gardener keeps the beds growing.",
aviary: "The Academy owls. They carry letters, and they watch you.",
garden: "A long, still pool to sit by. Breathe slowly."
};
function spbBedsHtml(r) { return __ZC(351, 56, this, arguments, new.target); }
function spbWhereList() { return __ZC(351, 57, this, arguments, new.target); }
(function () {
if (typeof acPaint !== "function")
return;
var ap = acPaint;
acPaint = function () {
var r = null;
try {
r = acWhere();
}
catch (e) { }
var mine = r && (r.wing || r.grounds || r.id === "hall" || r.id === "entrance" || (r.subj && r.subj.some(function (q) { return !!SPB_BY[q]; })));
if (!mine) {
ap.apply(this, arguments);
return;
}
var el = hallPanel("ac-panel", "#8A6AE8");
if (!el)
return;
if (!walkMode || AC.lesson) {
el.style.display = "none";
return;
}
el.style.display = "block";
var h = '<h4 style="color:' + (r.grounds ? "#C8F0B0" : "#D8C8FF") + '">' + esc(r.name) + '</h4>';
if (r.subj) {
var tch = acTeacher(r), S = AC_STAFF[r.job];
h += '<div class="dim">' + (tch ? esc(tch) + ' is teaching (' + esc(S ? S[0] : "") + ').' : 'The professor is off duty; the lesson book on the lectern teaches in their place.') + '</div>';
r.subj.forEach(function (s) {
var know = acLearned(s), p = SPB_BY[s];
h += '<div class="item"><b>' + (p ? p.i + ' ' : '') + esc(acTitle(s)) + '</b>' + (p ? ' <span class="dim">· the spell ' + esc(p.n) + '</span>' : '') + ' ' + (know ? '<span style="color:#9AE8A0">learned ✓</span>' : '<span class="dim">not yet learned</span>') +
(p ? '<div class="dim" style="font-size:12px;margin-top:2px">' + esc(p.use) + '</div>' : '') +
'<div class="row"><button class="btn" data-acl="' + esc(s) + '">' + (know ? 'Take the lesson again' : 'Take the lesson') + '</button></div></div>';
});
}
else if (SPB_ROOM_SAY[r.id])
h += '<div class="dim">' + esc(SPB_ROOM_SAY[r.id]) + '</div>';
if (r.brew)
h += '<div class="item"><b>🧪 The cauldrons</b><div class="dim" style="font-size:12px">' + Object.keys(SPB_POTIONS).map(function (k) { return SPB_POTIONS[k].icon + ' ' + esc(SPB_POTIONS[k].name); }).join(' · ') + '</div><div class="row"><button class="btn" data-spbpot="1">Brew a draught</button></div></div>';
if (r.id === "menag")
h += '<div class="dim" style="margin-top:6px">Stags, foxes, a unicorn and a griffin, kept calm and well fed. Calm Beast works on the beasts of Ironfray and every wild world.</div>';
if (r.id === "range" && SPB.dummies.length)
h += '<div class="dim" style="margin-top:6px">Dummies standing: ' + SPB.dummies.filter(function (D) { return D.g && D.g.parent; }).length + '.</div>';
h += spbBedsHtml(r);
if (r.id === "hall" || r.id === "entrance") {
h += '<div class="dim">Welcome to the Academy of the Arcane. Every power and magic is taught here to anyone who will learn, once their tuition is paid. ' +
(acKeeper() ? '<b style="color:var(--gold,#C9A868)">Keeper: you know everything already.</b>' : 'You know <b style="color:var(--bone)">' + acCount() + ' of ' + AC_SUBJECTS.length + '</b>.') + '</div>';
h += spbWhereList();
}
el.innerHTML = h;
};
})();
addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-spbpot]") : null;
if (!t)
return;
e.preventDefault();
spbPotOpen(true);
}, true);
(function () {
var last = "";
setInterval(function () {
try {
if (!(typeof INT !== "undefined" && INT && INT.academy))
return;
var r = acWhere();
if (!r || !r.beds)
return;
var sig = r.id + "|" + r.beds.map(function (k, i) { return spbBedReady(r.id + i) ? 1 : 0; }).join("");
if (sig !== last) {
last = sig;
acPaint();
}
}
catch (e) { }
}, 5000);
})();
(function () {
if (typeof acPowersPaint !== "function")
return;
var pp = acPowersPaint;
acPowersPaint = function (p) {
pp.apply(this, arguments);
try {
var h = '<div style="font-size:12px;color:#C8B0FF;margin:10px 0 2px">Spells (cast from ✨ Spells on the power bar)</div>';
SPB_SPELLS.forEach(function (s) {
var know = spbKnows(s.s);
h += '<div style="padding:5px 0;border-bottom:1px solid var(--line,#333);font-size:13.5px' + (know ? '' : ';color:var(--dim,#999)') + '">' + s.i + ' ' + esc(s.n) + (know ? ' <span style="color:#9AE8A0;font-size:11px">known</span>' : '') +
'<br><span style="font-size:11.5px;color:#9A88C8">' + esc(s.use) + (know ? '' : ' · taught in ' + esc(spbWhereTaught(s.s))) + '</span></div>';
});
var d = document.createElement("div");
d.innerHTML = h;
var go = p.querySelector("[data-acgo]");
if (go && go.parentNode)
go.parentNode.parentNode.insertBefore(d, go.parentNode);
else
p.appendChild(d);
Array.prototype.forEach.call(p.querySelectorAll("div"), function (row) { if (row.children.length && row.style.borderBottom && SPB_SPELLS.some(function (s) { var sp = row.querySelector("span[style*='flex:1']"); return sp && sp.firstChild && sp.firstChild.nodeValue === s.s; }))
row.remove(); });
}
catch (e) {
spbWarn("powers", e);
}
};
})();
(function () {
if (typeof exitInterior !== "function" || typeof LOOK === "undefined" || !LOOK.lights)
return;
var ex = exitInterior;
exitInterior = function () {
var root = typeof INT !== "undefined" && INT ? INT.root : null;
var r = ex.apply(this, arguments);
try {
if (root && !root.parent && !(typeof INT !== "undefined" && INT && INT.root === root)) {
var mine = new Set();
root.traverse(function (o) { if (o.isLight)
mine.add(o); });
if (mine.size)
LOOK.lights = LOOK.lights.filter(function (l) { return !mine.has(l); });
}
}
catch (e) {
spbWarn("lights", e);
}
return r;
};
})();
(function () {
var W = "passing through walls", GONE = [W, "changing shape", "changing size", "knowing it was a dream", "changing the dream"];
try {
AC_ROOMS.forEach(function (r) { if (r.subj && !r.wing && !r.grounds && !r.dusk)
r.subj = r.subj.filter(function (s) { return GONE.indexOf(s) < 0; }); });
Object.keys(SPB_CASTLE_SUBJ).forEach(function (id) { var r = AC_ROOM[id]; if (!r)
return; r.subj = r.subj || []; SPB_CASTLE_SUBJ[id].forEach(function (s) { if (r.subj.indexOf(s) < 0)
r.subj.push(s); }); });
GONE.forEach(function (g) { [AC_SUBJECTS, AC_POWERS].forEach(function (L) { var i = L.indexOf(g); if (i >= 0)
L.splice(i, 1); }); delete AC_LORE[g]; });
}
catch (e) {
spbWarn("subjects", e);
}
if (typeof hasAbility === "function") {
var ha = hasAbility;
hasAbility = function (n) { if (n === W)
return false; return ha.apply(this, arguments); };
}
if (typeof throughWalls === "function") {
throughWalls = function () { return false; };
}
if (typeof PW !== "undefined" && PW)
PW.walls = false;
})();
function spbKey(f) { if (!f)
return null; if (f.o && f.o.F)
return f.o.F; if (f.o && f.o.id)
return "d" + f.o.id; if (f.id)
return "x" + f.id; return null; }
function spbFind(f, range) {
var k = spbKey(f), best = null;
spbFoes(range || 80).forEach(function (o) { if (best)
return; if (k && spbKey(o) === k)
best = o; });
if (!best && !k)
spbFoes(range || 80).forEach(function (o) { if (!best && Math.hypot(o.x - f.x, o.z - f.z) < 3)
best = o; });
return best;
}
function spbDot(f, each, n, every, col, hold) { return __ZC(351, 58, this, arguments, new.target); }
function spbBeam(to, col, life) { return __ZC(351, 59, this, arguments, new.target); }
function spbIsPvp(o) { return o.kind === "pvp" || o.kind === "pvp-bw"; }
function spbPvpOr(o, dreamer, other) { return spbIsPvp(o) ? dreamer : other; }
function spbNamed(o) { return "<b>" + esc(o.name || "the foe") + "</b>"; }
SPB_CAST["shadow-striking"] = function () { return __ZC(351, 60, this, arguments, new.target); };
SPB_CAST["night-veiling"] = function () { return __ZC(351, 61, this, arguments, new.target); };
SPB_CAST["hexing"] = function () { return __ZC(351, 62, this, arguments, new.target); };
SPB_CAST["dread-calling"] = function () { return __ZC(351, 63, this, arguments, new.target); };
SPB_CAST["soul-draining"] = function () { return __ZC(351, 64, this, arguments, new.target); };
SPB_CAST["stone-singing"] = function () { return __ZC(351, 65, this, arguments, new.target); };
(function () {
var web = SPB_CAST["silk-binding"];
SPB_CAST["silk-binding"] = function () {
var o = spbAimed(18, 0.4), r = web.apply(this, arguments);
if (o)
setTimeout(function () { spbDot(o, 5, 4, 1, 0x8AE040, 0); }, 300);
spbSay(o ? "<b>Venom Web.</b> Venomous silk wraps " + spbNamed(o) + ": it is held fast and the venom bites." : "<b>Venom Web.</b> The silk finds nothing to hold and lies on the ground.");
return r;
};
})();
SPB_CAST["wraith-raising"] = function () { return __ZC(351, 66, this, arguments, new.target); };
function spbWraithEnd(quiet) { var W = SPB.wraith; if (!W)
return; SPB.wraith = null; spbDrop(W.g); if (!quiet)
spbSay("The wraith sinks back into the dark."); }
function spbWraithTick(dt) {
var W = SPB.wraith;
if (!W)
return;
if (SPB.t > W.until) {
spbWraithEnd();
return;
}
var P = spbP(), g = W.g, foes = spbFoes(16), o = null;
foes.forEach(function (q) { if (!o || Math.hypot(q.x - g.position.x, q.z - g.position.z) < Math.hypot(o.x - g.position.x, o.z - g.position.z))
o = q; });
var tx = o ? o.x : P.x + 1.4, tz = o ? o.z : P.z + 1.4, dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz);
if (d > (o ? 1.4 : 0.6)) {
var step = Math.min(d, (o ? 7 : 5) * dt);
g.position.x += dx / d * step;
g.position.z += dz / d * step;
}
g.position.y = spbFeetY() + 0.2 + Math.sin(SPB.t * 2) * 0.12;
g.rotation.y = Math.atan2(dx, dz);
g.children.forEach(function (c) { if (c.material && c.isMesh)
c.material.opacity = Math.max(0.2, 0.5 * (Math.min(1, (W.until - SPB.t) / 2))); });
if (o && d < 2.2 && SPB.t >= W.next) {
W.next = SPB.t + 1.5;
try {
o.hit(spbPvpOr(o, 8, 9));
}
catch (e) { }
spbBurst(o.x, (o.y || spbFeetY() + 1) - 0.3, o.z, 0x9AB0D0, 16, [0.4, 1, 0.4], 0.8, "swirl", 0.16);
}
}
SPB_CAST["polymorph"] = function () { return __ZC(351, 67, this, arguments, new.target); };
SPB_CAST["starfall"] = function () { return __ZC(351, 68, this, arguments, new.target); };
(function () {
if (typeof spbTick !== "function")
return;
var tk = spbTick;
spbTick = function (dt) { var r = tk.apply(this, arguments); try {
spbWraithTick(dt);
}
catch (e) {
spbWarn("wraith", e);
} return r; };
})();
var ACT = { at: 0, loading: null, st: null, el: null, busy: false };
function actSchool(s) { var r = typeof acRoomOf === "function" ? acRoomOf(s) : null; return r && r.dusk ? "duskwell" : "somnucor"; }
function actName(k) { return k === "duskwell" ? "the Duskwell Academy" : "the Somnucor Academy of the Arcane"; }
function actIn() { return typeof signedIn === "function" && signedIn(); }
function actLoad(force) { return __ZC(351, 69, this, arguments, new.target); }
function actOpen(k) { if (acKeeper())
return true; var S = ACT.st; return !S || !S.open || !!S.open[k]; }
function actFee(k) { var S = ACT.st; return S && S.fees ? Math.max(0, +S.fees[k] || 0) : 0; }
function actTerm() { var S = ACT.st, d = S ? +S.term_days || 0 : 0; return d > 0 ? "for " + d + " days" : "paid once"; }
function actCard(subject, say) { return __ZC(351, 70, this, arguments, new.target); }
function actClose() { if (ACT.el)
ACT.el.style.display = "none"; }
addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target : null;
if (!t || !ACT.el || ACT.el.style.display !== "flex")
return;
if (t.closest("[data-actx]")) {
actClose();
return;
}
var b = t.closest("[data-actp]");
if (!b || ACT.busy)
return;
var s = b.getAttribute("data-actp"), k = actSchool(s);
ACT.busy = true;
actCard(s);
cityRpc("academy_enrol", { p_school: k }).then(function (o) {
ACT.busy = false;
if (o && o.ok) {
actClose();
spbSay("<b>" + esc(o.say || "You are a student now.") + "</b>");
actLoad(true).then(function () { if (typeof acPaint === "function")
acPaint(); if (actOpen(k))
acLesson(s); });
}
else
actCard(s, (o && o.say) || "That did not go through.");
}).catch(function () { ACT.busy = false; actCard(s, "That did not go through. Try again in a moment."); });
});
(function () {
if (typeof acLesson !== "function")
return;
var al = acLesson;
acLesson = function (subject) {
var self = this, args = arguments;
if (acKeeper() || acLearned(subject))
return al.apply(self, args);
if (!actIn()) {
actCard(subject);
return;
}
actLoad(false).then(function () { if (actOpen(actSchool(subject)))
al.apply(self, args);
else
actCard(subject); });
};
})();
function actLine(k) { return __ZC(351, 71, this, arguments, new.target); }
(function () {
if (typeof acPaint !== "function")
return;
var ap = acPaint;
acPaint = function () {
ap.apply(this, arguments);
try {
var r = acWhere(), el = document.getElementById("ac-panel");
if (!r || !el || el.style.display !== "block")
return;
if (!ACT.st && !ACT.loading && Date.now() - ACT.at > 120000)
actLoad(false).then(function (o) { if (o)
acPaint(); });
if (r.subj)
el.insertAdjacentHTML("beforeend", actLine(r.dusk ? "duskwell" : "somnucor"));
else if (r.id === "hall" || r.id === "entrance")
el.insertAdjacentHTML("beforeend", actLine("somnucor"));
}
catch (e) {
spbWarn("tuition panel", e);
}
};
})();
(function () {
if (typeof dwSpellsHtml !== "function")
return;
var dh = dwSpellsHtml;
dwSpellsHtml = function () { var h = dh.apply(this, arguments); try {
actLoad(false);
return h + actLine("duskwell");
}
catch (e) {
return h;
} };
})();
