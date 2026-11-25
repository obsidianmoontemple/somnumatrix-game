/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SGA_FACTIONS = [
{ k: "dragon", n: "The Dragon Corp", icon: "🐉", col: "#E07A5A", what: "Somnucor's riders: the law, the watch and the gaol.",
match: /dragon corp|rider|constable|watch(man|woman)|gaoler|warden of the gaol|police|sergeant|captain of the/i },
{ k: "guilds", n: "The Guilds", icon: "⚒️", col: "#D8B060", what: "The trades and crafts: smiths, masons, glaziers, merchants and every guild hall.",
match: /guild|smith|mason|joiner|glazier|wheelwright|cobbler|tailor|weaver|potter|chandler|merchant|shopkeeper|trader|baker|brewer|butcher|miner|carpenter|engineer/i },
{ k: "temple", n: "The Obsidian Moon Temple", icon: "🌙", col: "#B89AE8", what: "The priests, priestesses and coven of the Temple of the Obsidian Moon, and Temple Row.",
match: /temple|priest|priestess|acolyte|coven|vestry|seanchai|seanchaí|keeper of the fire|chaplain|nun|monk|sister of/i },
{ k: "academies", n: "The Academies", icon: "🎓", col: "#7FB8E8", what: "The academies, the City School, the archive and the museum: teachers, scholars and students.",
match: /academ|school|teacher|professor|scholar|student|archiv|librarian|museum|tutor|lecturer|master of the/i },
{ k: "commons", n: "The People of Somnucor", icon: "🏘️", col: "#9AD08A", what: "Everyone else: the townsfolk, the street, the families and the folk of the worlds.", match: null }
];
var SGA_FBY = {};
SGA_FACTIONS.forEach(function (f) { SGA_FBY[f.k] = f; });
var SGA_LEVELS = [[-60, "Hated", "#E06060"], [-20, "Distrusted", "#E0A060"], [20, "Neutral", "#C9BEA8"], [50, "Liked", "#A8D888"], [80, "Honoured", "#7FD8B0"], [101, "Revered", "#F2D27A"]];
function sgaLevel(v) { v = +v || 0; for (var i = 0; i < SGA_LEVELS.length; i++)
if (v < SGA_LEVELS[i][0])
return { n: SGA_LEVELS[i][1], col: SGA_LEVELS[i][2], i: i }; return { n: "Revered", col: "#F2D27A", i: 5 }; }
var SGA_TREAT = [
"They loathe this dreamer for what they have done to your people: be cold, curt and wary, refuse favours, and let it show. Never threaten.",
"They do not trust this dreamer: be guarded and short with them, and say so if they ask why.",
"They have no name among your people yet: treat them like any stranger.",
"Your people like this dreamer: be friendly and open, and glad to help.",
"Your people honour this dreamer: be warm and generous, speak well of them, and go out of your way to help.",
"Your people revere this dreamer: they are a hero to you. Be openly delighted to meet them and do anything within reason for them."
];
var SGA_STORY_TITLE = "The Bell Beneath the Tower";
var SGA_STORY_INTRO = "Under the Tower of Somnucor hangs the Somnus Bell, rung once on the day the city was founded. Its note is what keeps each dream in its own world. Last night, for the first time, it rang by itself, and cracked. Seven Notes, tones gone solid like singing glass, have flown out into the worlds, and someone is gathering them.";
var SGA_BELL = "The Somnus Bell hangs in a hidden belfry under the Tower of Somnucor; it was rung once at the founding, and its note keeps every dream in its own world. It cracked last night, and seven Notes (the Bell's tones made solid, like humming shards of glass) flew out into seven worlds. Someone called the Hollow Cantor, once a bellwright of Somnucor who lost his family to nightmares, is gathering the Notes in the Belfry Below to silence the Bell for good: no more dreams, so no more nightmares, but no more Somnucor either.";
var SGA_ACTS = [
{ k: "pro", n: "Prologue: The Crack in the Bell" },
{ k: "one", n: "Act I: The Seven Notes" },
{ k: "two", n: "Act II: The Belfry Below" },
{ k: "three", n: "Act III: Who Keeps the Notes" },
{ k: "end", n: "Epilogue: The Bell Rings Again" }
];
var SGA_STEPS = [
{ id: "p1", act: "pro", kind: "talk", fac: "temple", title: "The bell-warden", goal: "Speak with Sister Ysolde Marrow, the bell-warden, outside the Vestry of Temple Row.",
where: { city: "The Vestry of Temple Row" },
who: { name: "Sister Ysolde Marrow", sex: "f", age: 58, title: "bell-warden of the Obsidian Moon Temple", look: { hat: "hood", top: 0x2A2238, bottom: 0x1E1A28, back: "cloak", backColor: 0x3A2A50 },
persona: "You have kept the secret of the Somnus Bell for thirty years. Last night you felt it ring by itself and crack, and you have not slept. You are frightened but steady. You tell the dreamer what the Bell is and that it has cracked, and send them to Master Corwin Ash at the City Archive, who keeps the founding record. You suspect someone who knew the Bell well. You would rather the Dragon Corp were not told everything: the Bell is the Temple's charge." } },
{ id: "p2", act: "pro", kind: "talk", fac: "academies", title: "The founding record", goal: "Find Master Corwin Ash, the archivist, outside the City Archive.",
where: { city: "The City Archive" },
who: { name: "Master Corwin Ash", sex: "m", age: 64, title: "archivist of Somnucor", look: { top: 0x4A3A2A, bottom: 0x2A2420, hat: "none" },
persona: "You keep the founding record of Somnucor. It says the Somnus Bell holds seven Notes, one for each of the oldest worlds: Greenwold, the Endless Sea, the North Pole, the Deep, the Grimm Wood, the Labyrinth and Neverland, and that if it cracks they fly home to those worlds. You are thrilled and appalled at once, and talk a little too much. You mention that bells have been going missing all over the city, and that Captain Hesper Vane of the Dragon Corp has been asking about them." } },
{ id: "p3", act: "pro", kind: "talk", fac: "dragon", title: "The stolen bells", goal: "Report to Captain Hesper Vane of the Dragon Corp, outside the Dragon Roost.",
where: { city: "The Dragon Roost" },
who: { name: "Captain Hesper Vane", sex: "f", age: 44, title: "captain of the Dragon Corp", look: { top: 0x5A1E1E, bottom: 0x1A1A1E, hat: "none" },
persona: "Bells have been stolen all over Somnucor this month: a ship's bell, a school bell, the bell from the Tavern door. A thin man in a grey cantor's robe was seen each time. You want to know what the dreamer knows, and you suspect the Temple is hiding something. You are blunt, fair and tired. You ask the dreamer straight out whether the Temple is keeping secrets from the law." } },
{ id: "pc", act: "pro", kind: "choice", title: "What to tell the Dragon Corp", goal: "Captain Vane asks what the Temple is hiding. Choose what to tell her.",
q: "Captain Vane asks you straight: is the Temple hiding something?",
opts: [{ k: "dragon", n: "Tell her everything", say: "You tell Captain Vane about the Bell and the seven Notes. She is grateful, and puts riders on the lookout. Sister Ysolde will not be pleased." },
{ k: "temple", n: "Keep the Temple's secret", say: "You keep the Bell to yourself. Captain Vane narrows her eyes, but lets you go. Sister Ysolde will hear that you kept faith." }] },
{ id: "n1", act: "one", kind: "talk", fac: "commons", title: "The Green Note", goal: "Find Old Tamsin Reed, the herbwife, in Greenwold.",
where: { world: "greenwold", n: "Greenwold", how: "Greenwold, through the Green Door" },
who: { name: "Old Tamsin Reed", sex: "f", age: 79, title: "herbwife of Greenwold", look: { top: 0x4A6A3A, bottom: 0x3A3020, hat: "hood", hatColor: 0x6A8A4A },
persona: "A humming green shard fell into your herb garden two nights ago, and your lavender has bloomed out of season ever since. You call it the Green Note. You will give it to the dreamer gladly if they are kind to you, because you can feel that it wants to go home. You are sharp, funny and fond of tea." } },
{ id: "n2", act: "one", kind: "talk", fac: "commons", title: "The Deep Note", goal: "Find Captain Absalom Crane on the Endless Sea.",
where: { world: "sea", n: "the Endless Sea", how: "the Endless Sea, aboard the Wayfarer at the last pier of the Nightmare Wilds" },
who: { name: "Captain Absalom Crane", sex: "m", age: 61, title: "captain of a fishing ketch on the Endless Sea", look: { top: 0x2A3A5A, bottom: 0x2A2A2A, hat: "cap", hatColor: 0x1A2030 },
persona: "You hauled up a shard of glass that sings low under the water, and every fish for a mile follows your boat now. You call it the Deep Note. You will part with it for a good story, a true one, from the dreamer's own life or dreams. You are gruff, superstitious and kind underneath." } },
{ id: "n3", act: "one", kind: "talk", fac: "commons", title: "The Cold Note", goal: "Find Ingrid Frostmantle at the North Pole.",
where: { world: "northpole", n: "the North Pole", how: "the North Pole, through a cold hearth" },
who: { name: "Ingrid Frostmantle", sex: "f", age: 35, title: "ice-cutter at the North Pole", look: { top: 0xD8E0EC, bottom: 0x3A4A5A, hat: "beanie", hatColor: 0xB83A3A },
persona: "A shard that rings like frost on a window froze your sled runners solid in a breath. You call it the Cold Note, and you keep it in a mitten. You will give it to the dreamer if they promise to put it back where it belongs. You are cheerful, practical and talk with your hands." } },
{ id: "n4", act: "one", kind: "talk", fac: "guilds", title: "The Low Note", goal: "Find Brannoc Hale, the miner, in the Deep.",
where: { world: "underdark", n: "the Deep", how: "the Deep, by the cage at the Mine Head" },
who: { name: "Brannoc Hale", sex: "m", age: 52, title: "miner of the Deep Workings", look: { top: 0x3A3A3A, bottom: 0x2A2420, hat: "helmet", hatColor: 0xC8A040 },
persona: "A shard that hums so low it shakes dust from the roof turned up in your seam. You call it the Low Note. The guild says it belongs to them, being found underground, but you think it belongs to the city. You will give it to the dreamer if they speak up for the miners when this is all over. You are slow-spoken and stubborn." } },
{ id: "n5", act: "one", kind: "talk", fac: "commons", title: "The Hollow Note", goal: "Find Greta Holm, the woodcutter's widow, in the Grimm Wood.",
where: { world: "grimm", n: "the Grimm Wood", how: "the Grimm Wood (☰ Menu, Story worlds)" },
who: { name: "Greta Holm", sex: "f", age: 47, title: "a woodcutter's widow in the Grimm Wood", look: { top: 0x5A3A2A, bottom: 0x2A2A20, hat: "hood", hatColor: 0x3A2A1A },
persona: "A shard fell on your husband's grave, and when you hold it you hear him whistling as he did when he came home from the wood. You call it the Hollow Note. You know it must go back, but you beg for one more night with it. You are quiet, proud and grieving." } },
{ id: "nc", act: "one", kind: "choice", after: "n5", title: "One more night", goal: "Greta Holm asks to keep the Hollow Note one more night. Choose.",
q: "Greta Holm asks to keep the Hollow Note for one more night with her husband's whistle.",
opts: [{ k: "commons", n: "Let her keep it one more night", say: "Greta weeps and thanks you. Next morning the Note is waiting for you on her doorstep, wrapped in her husband's scarf. Word gets round the city that you were kind." },
{ k: "self", n: "Take it now: there is no time", say: "You take the Note. Greta says nothing. You are right that there is no time, and you will remember her face." }] },
{ id: "n6", act: "one", kind: "talk", fac: "academies", title: "The Turning Note", goal: "Find Mother Linnet, keeper of the thread, in the Labyrinth.",
where: { world: "maze", n: "the Labyrinth", how: "the Labyrinth (☰ Menu, Story worlds)" },
who: { name: "Mother Linnet", sex: "f", age: 83, title: "keeper of the thread in the Labyrinth", look: { top: 0x8A7A5A, bottom: 0x5A4A3A, hat: "hood", hatColor: 0x6A5A40 },
persona: "A shard that keeps turning to face the way out has been leading lost dreamers home through the Labyrinth for two days. You call it the Turning Note. You will give it to the dreamer only if they answer a riddle of your own making, fairly. You are mischievous and wise." } },
{ id: "n7", act: "one", kind: "talk", fac: "commons", title: "The Bright Note", goal: "Find Wren, the sky-sailor, in Neverland.",
where: { world: "neverland", n: "Neverland", how: "Neverland, second star to the right" },
who: { name: "Wren", sex: "f", age: 16, title: "a sky-sailor of Neverland who never wants to grow up", look: { top: 0x3A8A5A, bottom: 0x6A4A2A, hat: "cap", hatColor: 0x2A6A3A },
persona: "You caught a shard that sings so brightly it makes you laugh, and it lets you fly higher than anyone. You call it the Bright Note. You do not want to give it up, but you will, if the dreamer can make you laugh or tell you something about growing up that is not dull. You are quick, cheeky and brave." } },
{ id: "d1", act: "two", kind: "delve", dungeon: "belfry", fac: "guilds", title: "The Belfry Below", goal: "Go down into the Belfry Below with a group and beat the Hollow Cantor.",
need: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"] },
{ id: "fc", act: "three", kind: "choice", title: "Who keeps the Notes", goal: "The seven Notes are yours. Choose who keeps them.",
q: "The seven Notes are in your hands, humming together. The Bell must be mended, but who should keep the Notes?",
opts: [{ k: "dragon", n: "The Dragon Corp: lock them in the Treasury vault", say: "Order wins. The Notes are locked deep in the City Treasury under guard, and the Bell is mended by law, a little colder than before." },
{ k: "temple", n: "The Temple: sing them back into the Bell", say: "Faith wins. The coven sings the Notes back into the Somnus Bell, and it rings warmer than anyone remembers." },
{ k: "academies", n: "The Academies: study them", say: "Knowledge wins. The Notes are studied, and a new science of dreams begins; the Bell is mended with what they learn." },
{ k: "guilds", n: "The Guilds: recast them in a new bell", say: "Craft wins. The Smithy and the Masons' Yard recast the Notes into a new Somnus Bell, the finest work Somnucor has ever done." }] },
{ id: "e1", act: "end", kind: "talk", title: "The Bell rings again", goal: "Tell the head of the faction you chose how it ended.",
where: { byChoice: true },
who: { byChoice: true } }
];
var SGA_EPILOGUE = {
dragon: { city: "The City Treasury", who: { name: "Captain Hesper Vane", sex: "f", age: 44, title: "captain of the Dragon Corp", look: { top: 0x5A1E1E, bottom: 0x1A1A1E }, persona: "The seven Notes are locked in the Treasury vault under your riders' guard, because the dreamer chose the Dragon Corp. You are proud and relieved, and you thank the dreamer properly. The Hollow Cantor is held in the gaol, and you tell them he asked to see the Bell one last time." } },
temple: { city: "The Vestry of Temple Row", who: { name: "Sister Ysolde Marrow", sex: "f", age: 58, title: "bell-warden of the Obsidian Moon Temple", look: { hat: "hood", top: 0x2A2238, bottom: 0x1E1A28 }, persona: "The coven sang the seven Notes back into the Somnus Bell, because the dreamer chose the Temple, and the Bell rings warmer than you have ever heard it. You are overjoyed and tearful, and name the dreamer a Bellwarden of Somnucor." } },
academies: { city: "The City Archive", who: { name: "Master Corwin Ash", sex: "m", age: 64, title: "archivist of Somnucor", look: { top: 0x4A3A2A, bottom: 0x2A2420 }, persona: "The seven Notes are being studied by the Academies, because the dreamer chose them, and you have already filled three notebooks. You are giddy with it, and tell the dreamer what you have learned about how dreams are kept apart." } },
guilds: { city: "The Smithy", who: { name: "Mistress Odile Farrow", sex: "f", age: 51, title: "master bellfounder of the Guilds", look: { top: 0x5A3A20, bottom: 0x2A2018, hat: "none" }, persona: "You recast the seven Notes into a new Somnus Bell in the Smithy, because the dreamer chose the Guilds; it is the finest casting of your life. Your arms still ache. You are proud and plain-spoken and thank the dreamer like a fellow tradesman." } }
};
var SGA_TITLE_DONE = "Bellwarden of Somnucor";
var SGA_COMPANIONS = [
{ k: "bram", name: "Bram Holloway", sex: "m", age: 46, role: "fighter", icon: "🗡️", hire: 120, meet: "The Tavern",
look: { skin: 0xC69C7A, hair: 0x3A2A1E, hairStyle: "short", beard: "long", top: 0x4A3A2A, bottom: 0x2A2420, back: "cloak", backColor: 0x3A2A1A },
persona: "a sellsword who fought in Ironfray for fifteen years and quit when he got tired of it. Loyal once paid, dry humour, hates boasting, carries an old longsword and a dented shield." },
{ k: "isolde", name: "Isolde Fenwick", sex: "f", age: 31, role: "healer", icon: "🩹", hire: 110, meet: "The City Hospital",
look: { skin: 0xE8C8B0, hair: 0x8A4A2A, hairStyle: "bun", top: 0xE8E4DC, bottom: 0x2A3A5A },
persona: "a field medic from the City Hospital who wants to see the worlds before she settles. Calm under pressure, notices everything, keeps a list of the strangest wounds she has treated." },
{ k: "tobs", name: "Tobias Merrin", sex: "m", age: 22, role: "scout", icon: "🧭", hire: 80, meet: "The Map House",
look: { skin: 0xB88A68, hair: 0x1A1410, hairStyle: "curly", top: 0x3A5A3A, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x2A3A2A },
persona: "a map-runner everyone calls Tobs; quick, nosy and cheerful, knows a short cut to everywhere and is usually right. Talks fast and eats constantly." },
{ k: "agatha", name: "Agatha Penrose", sex: "f", age: 67, role: "scholar", icon: "📜", hire: 90, meet: "The City Museum",
look: { skin: 0xE8D0C0, hair: 0xD8D8D8, hairStyle: "bun", top: 0x5A3A5A, bottom: 0x3A2A3A, glasses: 1 },
persona: "a retired scholar of the Academies who has read about every world and visited almost none. Precise, delighted by everything, quietly brave, corrects your grammar." },
{ k: "kestrel", name: "Kestrel Vey", sex: "f", age: 27, role: "fighter", icon: "🏹", hire: 130, meet: "The Hunters' Lodge",
look: { skin: 0x8A5A3A, hair: 0x1A1410, hairStyle: "ponytail", top: 0x3A4A2A, bottom: 0x2A2A1E, back: "backpack", backColor: 0x5A3A1E },
persona: "an archer from the Hunters' Lodge, the best shot in the Harvest Ring. Few words, a sly smile, very loyal to people who keep their word." },
{ k: "hob", name: "Old Hob Tanner", sex: "m", age: 72, role: "light", icon: "🏮", hire: 60, meet: "The Somnucor Inn",
look: { skin: 0xD8B898, hair: 0xE8E8E8, hairStyle: "short", beard: "long", top: 0x5A4A2A, bottom: 0x3A3020, hat: "cap", hatColor: 0x3A3020 },
persona: "a lamplighter turned storyteller; carries a lantern everywhere and lights the dark places. Knows a tale for every road, most of them nearly true. Slow on his feet, quick in his head." },
{ k: "mira", name: "Mira Saltash", sex: "f", age: 38, role: "fighter", icon: "⚓", hire: 120, meet: "The Dock Office",
look: { skin: 0xC8986A, hair: 0x2A1A10, hairStyle: "ponytail", top: 0x2A3A5A, bottom: 0x2A2A2A },
persona: "a sailor and boatswain off the Endless Sea who fights with a belaying pin and a temper. Loud, warm, superstitious about whistling indoors." },
{ k: "dorian", name: "Dorian Quayle", sex: "m", age: 35, role: "healer", icon: "⚗️", hire: 100, meet: "The Apothecary",
look: { skin: 0xE0C0A0, hair: 0x5A3A1E, hairStyle: "short", top: 0x2A4A4A, bottom: 0x2A2A2A, glasses: 1 },
persona: "an alchemist from the Apothecary who brews tonics that mostly work. Nervous, kind, very curious, and keeps tasting things he shouldn't." }
];
var SGA_CBY = {};
SGA_COMPANIONS.forEach(function (c) { SGA_CBY[c.k] = c; });
var SGA_ROLE = { fighter: "Fights beside you in the dungeons.", healer: "Mends your vigour in a fight.", scout: "Points you to your next step.", scholar: "Knows a little about every world you go to.", light: "Carries a lantern in dark places." };
var SGA_DUNGEONS = {
belfry: { n: "The Belfry Below", icon: "🔔", sub: "Under the Tower: ropes, bells and the Hollow Cantor's choir.", col: 0x6A6A88, stone: 0x3A3A46, fog: 0x14141C, light: 0xB8C8FF,
mobs: ["hollowshade", "restless", "discord"], boss: { n: "The Hollow Cantor", kind: "faceless", scale: 1.9, hp: 900, dmg: 14, glow: 0xA8B8FF },
loot: [["cantor_toll", "The Cantor's Tolling Hand", "🔔"], ["bell_shard", "A shard of the old Bell", "💎"], ["grey_robe", "A grey cantor's robe", "🥼"], ["rope_belfry", "A belfry rope, knotted", "🪢"], ["silent_tongue", "The silenced clapper", "🔕"], ["choir_book", "The Cantor's choir book", "📖"]] },
barrow: { n: "The Barrow of the Drowned King", icon: "👑", sub: "Beneath the Nightmare Wilds: wet stone, old gold and the restless dead.", col: 0x3A5A4A, stone: 0x2E3A34, fog: 0x101814, light: 0x9AE8C0,
mobs: ["restless", "ashhusk", "watcher"], boss: { n: "The Drowned King", kind: "restless", scale: 2.3, hp: 1000, dmg: 15, glow: 0x6AE8B0 },
loot: [["drowned_crown", "The Drowned King's crown", "👑"], ["barrow_ring", "A barrow-gold ring", "💍"], ["kelp_cloak", "A cloak of black kelp", "🧥"], ["pearl_eye", "A pearl from the king's eye", "🦪"], ["grave_lamp", "A barrow lamp", "🏮"], ["kings_seal", "The king's seal", "📜"]] },
foundry: { n: "The Ember Foundry", icon: "🔥", sub: "Under the Commons' engines: slag, kilns and the Slag Colossus.", col: 0x8A4A2A, stone: 0x3A2A22, fog: 0x1C100A, light: 0xFFB070,
mobs: ["cinderimp", "emberhound", "kilnimp"], boss: { n: "The Slag Colossus", kind: "magmagolem", scale: 2.2, hp: 1100, dmg: 16, glow: 0xFF8A3A },
loot: [["ember_heart", "The Colossus's ember heart", "❤️‍🔥"], ["foundry_tongs", "Foundry tongs", "🔧"], ["slag_glass", "A lump of slag glass", "🪨"], ["ingot_star", "A star-iron ingot", "🧱"], ["kiln_mask", "A kiln-worker's mask", "🎭"], ["bellows_horn", "A bellows horn", "📯"]] },
silk: { n: "The Silk Hollow", icon: "🕸️", sub: "Below the Warrens: webs, eggs and the Silk Matriarch.", col: 0x5A3A6A, stone: 0x2A2230, fog: 0x120E16, light: 0xD8A8FF,
mobs: ["cavespider", "mirespider", "glassstalker"], boss: { n: "The Silk Matriarch", kind: "cavespider", scale: 2.4, hp: 950, dmg: 14, glow: 0xC88AFF },
loot: [["matriarch_fang", "The Matriarch's fang", "🦷"], ["moonsilk", "A bolt of moonsilk", "🧵"], ["web_crown", "A crown of frosted web", "❄️"], ["egg_amber", "An egg in amber", "🟠"], ["silk_lantern", "A silk lantern", "🏮"], ["spinner", "A spinner's distaff", "🪡"]] }
};
var SGA_DKEYS = ["belfry", "barrow", "foundry", "silk"];
var SGA_TIER = {
belfry: { n: "Beginner", col: "#8FDCA4", lv: 3, ch: 2, side: 0, mobs: [2, 3], hp: 0.55, dmg: 0.45, champ: 0, bossHp: 450, bossDmg: 8, bossScale: 1.6, stars: 1 },
barrow: { n: "Adept", col: "#E8D27A", lv: 9, ch: 3, side: 1, mobs: [3, 3, 4], hp: 0.85, dmg: 0.75, champ: 0, bossHp: 1000, bossDmg: 13, bossScale: 2.1, stars: 2 },
foundry: { n: "Hard", col: "#F0A060", lv: 16, ch: 4, side: 2, mobs: [4, 4, 5, 5], hp: 1.15, dmg: 1.0, champ: 1, bossHp: 1600, bossDmg: 18, bossScale: 2.4, stars: 3 },
silk: { n: "Very hard", col: "#F07A6A", lv: 25, ch: 5, side: 3, mobs: [4, 5, 5, 6, 6], hp: 1.5, dmg: 1.3, champ: 2, bossHp: 2400, bossDmg: 24, bossScale: 2.8, stars: 4 }
};
(function () { for (var k in SGA_TIER) {
var D = SGA_DUNGEONS[k], T = SGA_TIER[k];
if (!D)
continue;
D.tier = T;
D.boss.hp = T.bossHp;
D.boss.dmg = T.bossDmg;
D.boss.scale = T.bossScale;
} })();
var SGA_SEASONS = {
"2026-11": { n: "The Falling Star", icon: "🌠", ring: "harvest", shape: "spire", col: 0x9AD8FF,
ch: ["A star falls into the Harvest Ring in the night, and its shards scatter across the city.", "The shards sing at night; the Guilds want them for a forge, the Temple for a shrine.", "A crowd gathers at the crater to raise something worthy of the star.", "The last week: the spire goes up, or the crater is left to the weather."],
up: ["The Star Spire", "A crystal spire of star-glass where the star fell, lit from within."], down: ["The Star Crater", "The scorched crater where the star fell, still glittering with glass."] },
"2026-12": { n: "The Long Winter Fair", icon: "❄️", ring: "markets", shape: "arch", col: 0xE8F4FF,
ch: ["The canal in the Market Ring freezes overnight, solid to the bottom.", "Stalls go up on the ice; someone has to keep the braziers fed.", "A bridge of ice and timber is planned to cross the frozen canal.", "The last week: the Winter Bridge is finished, or the ice takes the timbers."],
up: ["The Winter Bridge", "A great arched bridge of pale stone and ice-blue glass."], down: ["The Broken Timbers", "The ends of an unfinished bridge, frosted over."] },
"2027-01": { n: "The Lantern Road", icon: "🏮", ring: "commons", shape: "lanterns", col: 0xFFC870,
ch: ["The lamps of the Commons go out one night and will not light again.", "The lamplighters' guild asks every dreamer to carry a flame.", "A road of lanterns is planned to lead the way home.", "The last week: the Lantern Road is lit, or the posts stand dark."],
up: ["The Lantern Road", "A row of tall iron lantern posts, lit warm every night."], down: ["The Dark Posts", "A row of iron posts that never got their lanterns."] },
"2027-02": { n: "The Clockwork Tide", icon: "⚙️", ring: "civic", shape: "clock", col: 0xD8C080,
ch: ["Every clock in Somnucor runs backward for one hour.", "The watchmakers trace it to a gear lost from the Civic Ring.", "A great clock is designed to keep the city's time true.", "The last week: the Great Clock strikes, or its frame stands silent."],
up: ["The Great Clock", "A tall clock tower in the Civic Ring, keeping the city's time."], down: ["The Silent Frame", "The iron frame of a clock tower that never struck."] },
"2027-03": { n: "The Greening", icon: "🌳", ring: "commons", shape: "tree", col: 0x7ACB6A,
ch: ["A seed the size of a fist is found on the Commons' green.", "It sprouts overnight; the gardeners argue about where it should grow.", "Every dreamer's care makes it grow a little more.", "The last week: the Great Oak stands, or a stump is all that is left."],
up: ["The Great Oak", "A huge old oak tree on the Commons' green."], down: ["The Lightning Stump", "A split stump, blackened by a spring storm."] },
"2027-04": { n: "The Tower That Fell", icon: "🗼", ring: "warrens", shape: "tower", col: 0xC8B8A0,
ch: ["The old watchtower in the Warrens cracks down the middle.", "The Warrens folk want it saved; the Dragon Corp want it down.", "Masons and riders work side by side.", "The last week: the watchtower is rebuilt, or it falls."],
up: ["The Warrens Watch", "The old watchtower, rebuilt and standing proud."], down: ["The Fallen Watch", "The watchtower lying where it fell, rubble and all."] },
"2027-05": { n: "The Sky Regatta", icon: "⛵", ring: "harvest", shape: "mast", col: 0xF0F0F0,
ch: ["Sky-ships are sighted over the harbour.", "The regatta needs a mooring mast tall enough to catch them.", "Sailors and smiths raise the mast in sections.", "The last week: the mast stands, or the sections lie on the quay."],
up: ["The Sky Mast", "A tall mooring mast with flags, over the harbour."], down: ["The Fallen Sections", "Sections of a mast lying on the quay."] },
"2027-06": { n: "Midsummer Fires", icon: "🔥", ring: "estates", shape: "stones", col: 0xFFD890,
ch: ["The longest day comes, and the sun will not quite set.", "Old stones are found under the High Ring's lawns.", "The stones are raised into a ring, one by one.", "The last week: the Midsummer Ring stands, or the stones stay where they lie."],
up: ["The Midsummer Ring", "A ring of standing stones on the High Ring's lawn."], down: ["The Sleeping Stones", "Great stones lying in the grass."] },
"2027-07": { n: "The Drowned Bell", icon: "🛎️", ring: "harvest", shape: "belltower", col: 0xB8C8D8,
ch: ["A bell rings under the harbour water at night.", "Divers find a bell from a ship that never came home.", "A tower is planned to hang it where all can hear.", "The last week: the bell rings from its tower, or it sinks again."],
up: ["The Harbour Bell Tower", "A stone bell tower by the harbour."], down: ["The Empty Plinth", "A plinth by the harbour where a bell was to hang."] },
"2027-08": { n: "The Comet Market", icon: "☄️", ring: "markets", shape: "arch", col: 0xA8D8FF,
ch: ["A comet hangs over Somnucor for a month.", "Traders come from every world to sell under it.", "An arch is planned to mark the comet's market.", "The last week: the Comet Arch stands, or the scaffold is taken down."],
up: ["The Comet Arch", "A great arch of stone and blue glass in the Market Ring."], down: ["The Bare Scaffold", "An empty scaffold where an arch was to be."] },
"2027-09": { n: "The Harvest Moon Feast", icon: "🌕", ring: "harvest", shape: "hall", col: 0xE8C870,
ch: ["The harvest moon rises huge and orange.", "The farms bring in more than anyone can eat.", "A feast hall is planned, so no one goes hungry.", "The last week: the Feast Hall opens, or the frame stands empty."],
up: ["The Feast Hall", "A long timber feast hall with a moon on its gable."], down: ["The Empty Frame", "The bare timber frame of a hall."] },
"2027-10": { n: "The Thin Veil", icon: "🕯️", ring: "temples", shape: "lanterns", col: 0xFFA060,
ch: ["The veil between worlds grows thin; voices are heard in the Temple Row gardens.", "The Temple asks for lights to guide the lost home.", "A row of ghost-lanterns is planned.", "The last week: the Veil Lanterns burn, or they go cold."],
up: ["The Veil Lanterns", "A row of tall lanterns along Temple Row, lit at night."], down: ["The Cold Lanterns", "A row of tall lanterns that never caught."] }
};
function sgaSeasonKey(t) { var d = new Date(t || Date.now()); return d.getUTCFullYear() + "-" + String(d.getUTCMonth() + 1).padStart(2, "0"); }
function sgaChapter(t) { var d = new Date(t || Date.now()).getUTCDate(); return d <= 7 ? 0 : d <= 14 ? 1 : d <= 21 ? 2 : 3; }
var SGA = { me: null, at: 0, busy: false, loading: null, saveT: null, off: false, prog: null, st: {}, rum: {}, rumAt: {}, LKEY: "somnu.saga", open: false, tab: "story", say: "",
contact: null, comp: null, mons: null, delve: null, seasonAt: 0 };
function sgaOnline() { return typeof signedIn === "function" && signedIn() && typeof cityRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG && !!DW_CONFIG.supabaseUrl; }
function sgaKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function sgaAdult() { try {
return sgaKeeper() || (typeof ageAdult === "function" && ageAdult());
}
catch (e) {
return false;
} }
function sgaPaid() { try {
return sgaKeeper() || (typeof hasAccess === "function" && hasAccess());
}
catch (e) {
return false;
} }
function sgaName() { var n = ""; try {
n = (typeof dreamer === "function" && dreamer().name) || "";
}
catch (e) { } return String(n).trim().slice(0, 40) || "a dreamer"; }
function sgaLite() { return typeof LITE !== "undefined" && !!LITE; }
function sgaBlank() { return { v: 1, done: {}, choice: {}, side: {}, trips: [], comp: null, started: 0, ls: {}, seen: {} }; }
function sgaLocal() {
try {
var d = JSON.parse(localStorage.getItem(SGA.LKEY) || "null");
if (d && typeof d === "object" && d.v === 1)
return d;
}
catch (e) { }
return sgaBlank();
}
function sgaLocalWrite() { try {
localStorage.setItem(SGA.LKEY, JSON.stringify(SGA.prog));
}
catch (e) { } }
SGA.prog = sgaLocal();
(function () { var P = SGA.prog; ["done", "choice", "side", "ls", "seen"].forEach(function (k) { if (!P[k] || typeof P[k] !== "object")
P[k] = {}; }); if (!Array.isArray(P.trips))
P.trips = []; SGA.st = P.ls || {}; })();
function sgaMerge(a, b) { return __ZC(433, 0, this, arguments, new.target); }
function sgaLoad(force) {
if (!sgaOnline())
return Promise.resolve(false);
if (SGA.loading)
return SGA.loading;
if (!force && Date.now() - SGA.at < 120000 && SGA.me)
return Promise.resolve(true);
SGA.tried = Date.now();
SGA.loading = cityRpc("saga_me", {}).then(function (o) {
if (!o || !o.ok) {
SGA.off = !!(o && o.off);
return false;
}
SGA.me = o;
SGA.at = Date.now();
SGA.off = false;
SGA.st = o.standing || {};
var before = JSON.stringify(SGA.prog.done);
SGA.prog = sgaMerge(SGA.prog, o.progress || {});
SGA.prog.ls = SGA.st;
sgaLocalWrite();
if (JSON.stringify(SGA.prog.done) !== before || !o.progress || !o.progress.v)
sgaSaveSoon();
return true;
}).catch(function (e) { if (/saga_me|function|schema cache|does not exist|404/i.test(String(e && e.message)))
SGA.off = true; return false; })
.then(function (v) { SGA.loading = null; try {
sgaPaint();
}
catch (e) { } return v; });
return SGA.loading;
}
function sgaSaveSoon() {
sgaLocalWrite();
clearTimeout(SGA.saveT);
SGA.saveT = setTimeout(function () {
if (!sgaOnline() || SGA.off)
return;
var P = Object.assign({}, SGA.prog);
delete P.ls;
cityRpc("saga_save", { p_data: P }).catch(function () { });
}, 4000);
}
var SGA_DEED = {
story: function (ref) { var f = String(ref).split(".")[1], o = { commons: 1 }; if (SGA_FBY[f])
o[f] = (o[f] || 0) + 4; return o; },
choice: function (ref) { return __ZC(433, 1, this, arguments, new.target); },
side: function () { return { commons: 4, dragon: 3 }; },
help: function () { return { commons: 2 }; },
talk: function (ref) { var o = {}; if (SGA_FBY[ref])
o[ref] = 1; return o; },
crime: function () { return { dragon: -4, commons: -2 }; }
};
function sgaRingNow() { return __ZC(433, 2, this, arguments, new.target); }
function sgaApply(d) { Object.keys(d || {}).forEach(function (k) { SGA.st[k] = Math.max(-100, Math.min(100, (+SGA.st[k] || 0) + d[k])); }); SGA.prog.ls = SGA.st; sgaLocalWrite(); }
function sgaDeed(kind, ref, note) { return __ZC(433, 3, this, arguments, new.target); }
function sgaStandingSay(before) {
var bits = [];
SGA_FACTIONS.forEach(function (f) { var a = sgaLevel(before[f.k] || 0), b = sgaLevel(SGA.st[f.k] || 0); if (a.n !== b.n)
bits.push(f.icon + " " + f.n + ": you are now " + b.n); });
if (bits.length)
sgaToast(bits[0]);
try {
sgaPaint();
}
catch (e) { }
}
function sgaToast(t) { if (typeof lvlToast === "function")
lvlToast(t);
else if (typeof setStatus === "function")
setStatus(esc(t)); }
function sgaStanding(k) { return +SGA.st[k] || 0; }
function sgaStep(id) { for (var i = 0; i < SGA_STEPS.length; i++)
if (SGA_STEPS[i].id === id)
return SGA_STEPS[i]; return null; }
function sgaDone(id) { return !!SGA.prog.done[id]; }
function sgaNeeds(s) {
if (s.need)
return s.need.concat(["nc"]);
var i = SGA_STEPS.indexOf(s);
if (s.act === "pro")
return i > 0 ? [SGA_STEPS[i - 1].id] : [];
if (s.act === "one")
return s.after ? [s.after] : ["pc"];
if (s.id === "fc")
return ["d1"];
if (s.id === "e1")
return ["fc"];
return [];
}
function sgaOpenStep(s) { return !sgaDone(s.id) && sgaNeeds(s).every(sgaDone); }
function sgaOpenSteps() { return SGA.prog.started ? SGA_STEPS.filter(sgaOpenStep) : []; }
function sgaAllDone() { return sgaDone("e1"); }
function sgaWhere(s) { if (s.where && s.where.byChoice) {
var E = SGA_EPILOGUE[SGA.prog.choice.fc] || SGA_EPILOGUE.temple;
return { city: E.city };
} return s.where || {}; }
function sgaWho(s) { if (s.who && s.who.byChoice) {
var E = SGA_EPILOGUE[SGA.prog.choice.fc] || SGA_EPILOGUE.temple;
return E.who;
} return s.who; }
function sgaFacOf(s) { return s.fac || (s.who && s.who.byChoice ? (SGA.prog.choice.fc || "temple") : "commons"); }
function sgaStart() {
if (SGA.prog.started)
return;
SGA.prog.started = Date.now();
sgaSaveSoon();
sgaToast("📜 " + SGA_STORY_TITLE + ": the story begins");
}
function sgaSpotCity(place) { return __ZC(433, 4, this, arguments, new.target); }
function sgaSpotWorld() { return __ZC(433, 5, this, arguments, new.target); }
function sgaWanted() {
var out = [];
if (!walkMode || store.inside)
return out;
sgaOpenSteps().forEach(function (s) {
if (s.kind !== "talk")
return;
var w = sgaWhere(s);
if (w.world && WLD.on === w.world)
out.push({ s: s, world: true });
else if (w.city && !WLD.on && typeof inCityNow === "function" && inCityNow())
out.push({ s: s, world: false, place: w.city });
});
return out;
}
function sgaFigure(seed, who) { return __ZC(433, 6, this, arguments, new.target); }
function sgaDropContact(C) { if (C && C.g && C.g.parent)
C.g.parent.remove(C.g); }
function sgaContactsTick() {
var want = sgaWanted(), have = SGA.contacts || (SGA.contacts = {}), keep = {}, P = camera.position;
want.forEach(function (w) {
var id = w.s.id;
keep[id] = 1;
var C = have[id];
if (C && (C.world !== w.world || (w.world && C.wk !== WLD.on) || (C.world && C.g && !C.g.parent))) {
sgaDropContact(C);
C = null;
delete have[id];
}
if (!C) {
var spot = w.spotFn ? w.spotFn() : (w.world ? sgaSpotWorld() : sgaSpotCity(w.place));
if (!spot)
return;
if (!w.world && Math.hypot(P.x - spot.x, P.z - spot.z) > 160)
return;
var who = sgaWho(w.s), g = sgaFigure(id, who);
if (w.world) {
g.position.set(spot.x, spot.y, spot.z);
(spot.parent || WLD.w.g).add(g);
}
else {
g.position.set(spot.x, spot.y, spot.z);
scene.add(g);
}
g.rotation.y = spot.face || 0;
have[id] = C = { s: w.s, g: g, world: w.world, wk: WLD.on, spot: spot, who: who };
}
if (!w.world && Math.hypot(P.x - C.spot.x, P.z - C.spot.z) > 220) {
sgaDropContact(C);
delete have[id];
}
});
Object.keys(have).forEach(function (id) { if (!keep[id]) {
sgaDropContact(have[id]);
delete have[id];
} });
}
function sgaNearContact() {
var have = SGA.contacts || {}, P = camera.position, best = null, bd = 4.2;
Object.keys(have).forEach(function (id) {
var C = have[id];
if (!C.g || !C.g.parent)
return;
var wp = new THREE.Vector3();
C.g.getWorldPosition(wp);
var d = Math.hypot(P.x - wp.x, P.z - wp.z);
if (d < bd) {
bd = d;
best = C;
}
});
if (best)
best.d = bd;
return best;
}
function sgaTalk(t) { return __ZC(433, 7, this, arguments, new.target); }
function sgaTalkContact(C) {
var s = C.s, who = C.who;
sgaTalk({ name: who.name, sex: who.sex, age: who.age, step: s.id, fac: sgaFacOf(s),
persona: "You are " + who.name + ", " + who.title + ", a " + who.age + "-year-old " + (who.sex === "f" ? "woman" : "man") + ". " + who.persona,
greet: sgaGreet(s) });
}
function sgaGreet(s) { return __ZC(433, 8, this, arguments, new.target); }
function sgaTalkEnded(c, lines) {
if (!c || !c.sgaStep)
return;
var s = sgaStep(c.sgaStep);
if (!s || sgaDone(s.id) || !sgaOpenStep(s))
return;
if (!lines.some(function (t) { return t.who === "me"; }))
return;
sgaStepDone(s);
}
function sgaStepDone(s, quiet) { return __ZC(433, 9, this, arguments, new.target); }
function sgaChoose(id, k) { return __ZC(433, 10, this, arguments, new.target); }
function sgaShowWay(s) { return __ZC(433, 11, this, arguments, new.target); }
function sgaTrouble() { try {
return (typeof INCD !== "undefined" && INCD.rows || []).filter(function (r) { return !r.closed; });
}
catch (e) {
return [];
} }
function sgaTakeSide(r, giver) { return __ZC(433, 12, this, arguments, new.target); }
function sgaSideOpen() { return Object.keys(SGA.prog.side).map(function (k) { return SGA.prog.side[k]; }).filter(function (q) { return q.st !== "done" && q.st !== "gone"; }); }
function sgaSideFinish(q, how) {
if (!q || q.st === "done")
return;
q.st = "done";
q.done = Date.now();
sgaSaveSoon();
sgaDeed("side", String(q.id), q.what + " at " + q.place);
sgaToast("📜 Side quest done: " + q.what + (how ? " · " + how : ""));
}
function sgaSideTick() {
var open = sgaSideOpen();
if (!open.length)
return;
var rows = (typeof INCD !== "undefined" && INCD.rows) || [], by = {};
rows.forEach(function (r) { by[r.id] = r; });
var P = camera.position;
open.forEach(function (q) {
var r = by[q.id];
if (q.st === "go") {
var F = (typeof cinFrontOf === "function" && q.place && !WLD.on) ? cinFrontOf(q.place) : null;
if (F && Math.hypot(P.x - F.x, P.z - F.z) < 28) {
q.st = "see";
sgaSaveSoon();
sgaToast("📜 You're at " + q.place + ". See it through.");
}
else if ((!r || r.closed) && Date.now() - q.at > 60000 && typeof INCD !== "undefined" && INCD.at) {
q.st = "gone";
sgaSaveSoon();
}
}
else if (q.st === "see") {
if (r && r.closed)
sgaSideFinish(q, "it's over");
else if (!r && typeof INCD !== "undefined" && INCD.at && Date.now() - INCD.at < 120000)
sgaSideFinish(q, "it's over");
}
});
}
(function () {
if (typeof cinDo === "function") {
var cd = cinDo;
cinDo = function (id, what) {
var r = cd.apply(this, arguments);
try {
var q = SGA.prog.side[id];
Promise.resolve(r).then(function (o) {
if (o && o.ok === false)
return;
sgaDeed("help", id + "." + String(what || "").slice(0, 20), "");
if (q && q.st !== "done" && q.st !== "gone") {
q.st = "see";
sgaSideFinish(q, "you helped");
}
}).catch(function () { });
}
catch (e) { }
return r;
};
}
if (typeof cinTake === "function") {
var ct = cinTake;
cinTake = function (id, as) {
var r = ct.apply(this, arguments);
try {
var q = SGA.prog.side[id];
if (q && q.st === "go") {
q.st = "see";
sgaSaveSoon();
}
}
catch (e) { }
return r;
};
}
if (typeof misdeed === "function") {
var md = misdeed;
misdeed = function (kind) {
var cool = typeof misdeedCool !== "undefined" ? misdeedCool : 0;
var r = md.apply(this, arguments);
try {
if (cool <= 0)
sgaDeed("crime", String(kind || "misdeed").slice(0, 30) + "." + Date.now(), "");
}
catch (e) { }
return r;
};
}
})();
function sgaFolkFac(c) { return __ZC(433, 13, this, arguments, new.target); }
function sgaIsFolk(c) { return typeof fmyIsFolk === "function" ? fmyIsFolk(c) : !!(c && typeof c.wKey === "string" && c.wKey.indexOf("wtalk:") === 0); }
function sgaRumours() { return __ZC(433, 14, this, arguments, new.target); }
function sgaGossipBrief(c) { return __ZC(433, 15, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) {
var s = cs.apply(this, arguments);
try {
if (sgaIsFolk(c) && !c.deity && c.archetype !== "deity") {
var b = sgaGossipBrief(c);
if (b)
s += " " + b;
if (c.sgaComp)
s += " " + sgaCompBrief(c.sgaComp);
}
}
catch (e) {
if (window.console)
console.warn("[saga]", e);
}
return s;
};
})();
function sgaStandingGreet(c) { return __ZC(433, 16, this, arguments, new.target); }
function sgaTqHtml(c) { return __ZC(433, 17, this, arguments, new.target); }
function sgaTqPaint(c) { return __ZC(433, 18, this, arguments, new.target); }
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
var r = ot.apply(this, arguments);
try {
if (sgaIsFolk(c)) {
SGA.talk = { c: c, from: Math.max(0, (c.log || []).length - 1) };
if (c.log && c.log.length === 1 && c.log[0].who === "them" && !c.sgaGreeted) {
var g = sgaStandingGreet(c);
if (g) {
c.log[0] = { who: "them", text: g };
c.sgaGreeted = 1;
if (typeof renderLog === "function")
renderLog();
}
}
sgaTqPaint(c);
sgaRumours();
}
else {
SGA.talk = null;
sgaTqPaint(null);
}
}
catch (e) {
if (window.console)
console.warn("[saga]", e);
}
return r;
};
})();
(function () {
if (typeof closeTalk !== "function")
return;
var ct = closeTalk;
closeTalk = function () {
var o = SGA.talk;
SGA.talk = null;
var r = ct.apply(this, arguments);
try {
if (o && o.c && o.c.log) {
var lines = o.c.log.slice(o.from).filter(function (t) { return t && t.text && t.text !== "…"; });
if (lines.some(function (t) { return t.who === "me"; })) {
sgaTalkEnded(o.c, lines);
if (!o.c.sgaComp)
sgaDeed("talk", sgaFolkFac(o.c), "");
else
sgaCompTalked(o.c);
}
}
sgaTqPaint(null);
}
catch (e) {
if (window.console)
console.warn("[saga]", e);
}
return r;
};
})();
var SGA_WORLD_NAMES = { greenwold: "Greenwold", sea: "the Endless Sea", northpole: "the North Pole", underdark: "the Deep", grimm: "the Grimm Wood", maze: "the Labyrinth", neverland: "Neverland",
battle: "Ironfray", space: "space", surface: "another world's surface", station: "a space station", casino: "the Casino", lounge: "GiGi's Lounge", race: "Pyreline", kidszone: "the Kids Zone",
davinci: "Leonardo's Italy", bard: "Shakespeare's London", verne: "Jules Verne's world", guildlands: "the Guildlands", samhain: "Samhain Night", erebos: "Erebos", wonders: "the Wonders",
sports: "the sports grounds", storms: "Tornado Alley", delve: "a dungeon" };
function sgaWorldName(k) { if (k === "delve" && SGA.delve && SGA_DUNGEONS[SGA.delve.d])
return SGA_DUNGEONS[SGA.delve.d].n; return SGA_WORLD_NAMES[k] || (WORLDS[k] && WORLDS[k].name) || "another world"; }
function sgaCompServer() { return (SGA.me && SGA.me.companion) || null; }
function sgaCompMay(k) {
if (sgaKeeper())
return true;
var S = sgaCompServer();
if (S && S.comp === k && S.how === "hired" && Date.parse(S.until) > Date.now())
return true;
var f = (S && S.friends) || SGA.prog.friends || {};
return (+f[k] || 0) >= 3;
}
function sgaCompActive() { var k = SGA.prog.comp; return k && SGA_CBY[k] && sgaCompMay(k) ? SGA_CBY[k] : null; }
function sgaCompBring(k) { if (!sgaCompMay(k))
return; SGA.prog.comp = k; sgaSaveSoon(); sgaToast(SGA_CBY[k].icon + " " + SGA_CBY[k].name + " is with you now"); sgaPaint(); }
function sgaCompHome() { var C = sgaCompActive(); SGA.prog.comp = null; sgaSaveSoon(); sgaCompDrop(); if (C)
sgaToast(C.name + " heads home"); sgaPaint(); }
function sgaCompHire(k) { return __ZC(433, 19, this, arguments, new.target); }
function sgaCompMet(k) { return __ZC(433, 20, this, arguments, new.target); }
function sgaCompTalked(c) { var k = c.sgaComp; if (!k)
return; if (!sgaCompMay(k))
sgaCompMet(k); }
function sgaCompBrief(k) { return __ZC(433, 21, this, arguments, new.target); }
function sgaCompDrop() { var F = SGA.comp; if (F && F.g && F.g.parent)
F.g.parent.remove(F.g); SGA.comp = null; }
function sgaCompGround(x, z) {
if (WLD.on && WLD.w) {
try {
var h = WLD.w.ground ? WLD.w.ground(x, z, camera.position.y - 1.72) : 0;
return (h == null || !isFinite(h)) ? camera.position.y - 1.72 : +h;
}
catch (e) {
return camera.position.y - 1.72;
}
}
return typeof terrainY === "function" ? terrainY(x + (0), z) : 0;
}
function sgaCompTick(dt) {
var C = sgaCompActive();
var where = !walkMode || store.inside || (typeof DRIVE !== "undefined" && DRIVE.on) ? "" : (WLD.on ? "w:" + WLD.on : (typeof inCityNow === "function" && inCityNow() ? "city" : ""));
if (!C || !where) {
if (SGA.comp)
sgaCompDrop();
return;
}
var F = SGA.comp;
if (F && (F.k !== C.k || F.where !== where || !F.g.parent)) {
sgaCompDrop();
F = null;
}
var P = camera.position, base = WLD.on && WLD.w ? WLD.w.base : 0;
if (!F) {
var g = null;
try {
g = wPerson("sgac_" + C.k, { sex: C.sex, look: Object.assign({ sex: C.sex }, C.look) });
}
catch (e) {
g = new THREE.Group();
}
g.userData.sga = 1;
if (C.role === "light" && typeof wGlow === "function")
try {
var gl = wGlow(0xFFD890, 4.5, 0.42);
gl.position.set(0.35, 1.5, 0.2);
g.add(gl);
}
catch (e) { }
var bx = P.x - base - Math.sin(yaw) * -2.2, bz = P.z - Math.cos(yaw) * -2.2;
g.position.set(bx, sgaCompGround(bx, bz), bz);
(WLD.on && WLD.w && WLD.w.g ? WLD.w.g : scene).add(g);
F = SGA.comp = { k: C.k, g: g, where: where, ph: 0, amp: 0 };
if (WLD.on)
sgaCompTrip(C, WLD.on);
}
var lx = P.x - base, lz = P.z, side = 0.9, back = 2.0;
var tx = lx + Math.sin(yaw) * back + Math.cos(yaw) * side, tz = lz + Math.cos(yaw) * back - Math.sin(yaw) * side;
var g2 = F.g, dx = tx - g2.position.x, dz = tz - g2.position.z, d = Math.hypot(dx, dz), moving = false;
if (d > 28) {
g2.position.x = tx;
g2.position.z = tz;
}
else if (d > 0.6) {
var sp = Math.min(9, 1.4 + d * 1.6), st = Math.min(d, sp * dt);
g2.position.x += dx / d * st;
g2.position.z += dz / d * st;
moving = true;
var want = Math.atan2(dx, dz), df = Math.atan2(Math.sin(want - g2.rotation.y), Math.cos(want - g2.rotation.y));
g2.rotation.y += df * Math.min(1, dt * 6);
}
else {
var fw = Math.atan2(lx - g2.position.x, lz - g2.position.z), df2 = Math.atan2(Math.sin(fw - g2.rotation.y), Math.cos(fw - g2.rotation.y));
g2.rotation.y += df2 * Math.min(1, dt * 2);
}
g2.position.y = sgaCompGround(g2.position.x, g2.position.z);
var L = g2.userData.limbs;
if (L) {
F.amp += ((moving ? 0.42 : 0) - F.amp) * Math.min(dt * 6, 1);
F.ph += dt * (moving ? 6 : 0);
var s = Math.sin(F.ph) * F.amp;
L.ll.rotation.x = s;
L.rl.rotation.x = -s;
L.la.rotation.x = -s * 0.75;
L.ra.rotation.x = s * 0.75;
}
}
function sgaCompTrip(C, wk) { return __ZC(433, 22, this, arguments, new.target); }
function sgaCompTalk() { return __ZC(433, 23, this, arguments, new.target); }
function sgaChipTick() {
var C = sgaCompActive(), on = !!C && walkMode && !(typeof talkOpen !== "undefined" && talkOpen);
var el = document.getElementById("sga-chip");
if (!on) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sga-chip";
el.style.cssText = "position:fixed;z-index:44;left:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));display:flex;gap:6px;font:600 12.5px var(--sans,system-ui)";
el.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-sgc]");
if (!b)
return;
e.stopPropagation();
var a = b.getAttribute("data-sgc");
if (a === "talk")
sgaCompTalk();
else if (a === "way") {
var s = sgaOpenSteps().filter(function (x) { return x.kind === "talk"; })[0];
if (s)
sgaShowWay(s);
else
setStatus(esc(C.name) + ": \"Nowhere to go in the story just now.\"");
}
});
document.body.appendChild(el);
}
var h = "<span data-sgc='talk' role='button' tabindex='0' style='cursor:pointer;padding:6px 10px;border-radius:16px;background:rgba(14,16,28,.82);border:1px solid #C9A85A;color:#F2E6C4'>" + C.icon + " Talk to " + esc(C.name.split(" ")[0]) + "</span>";
if (C.role === "scout")
h += "<span data-sgc='way' role='button' tabindex='0' style='cursor:pointer;padding:6px 10px;border-radius:16px;background:rgba(14,16,28,.82);border:1px solid #7FB8E8;color:#D8ECFF'>🧭 Next step</span>";
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
}
el.style.display = "flex";
}
function sgaCompMeetTick() {
var have = SGA.meets || (SGA.meets = {}), keep = {};
var open = walkMode && !store.inside && !WLD.on && typeof inCityNow === "function" && inCityNow() && SGA.prog.started;
var P = camera.position;
if (open)
SGA_COMPANIONS.forEach(function (C) {
if (sgaCompMay(C.k) && SGA.prog.comp === C.k)
return;
var M = have[C.k];
if (!M) {
var spot = sgaSpotCity(C.meet);
if (!spot || Math.hypot(P.x - spot.x, P.z - spot.z) > 140)
return;
var g = null;
try {
g = wPerson("sgac_" + C.k, { sex: C.sex, look: Object.assign({ sex: C.sex }, C.look) });
}
catch (e) {
return;
}
g.position.set(spot.x - 1.6, spot.y, spot.z + 0.8);
g.rotation.y = spot.face || 0;
scene.add(g);
M = have[C.k] = { g: g, C: C };
}
var wp = M.g.position;
if (Math.hypot(P.x - wp.x, P.z - wp.z) > 200) {
scene.remove(M.g);
delete have[C.k];
return;
}
keep[C.k] = 1;
});
Object.keys(have).forEach(function (k) { if (!keep[k]) {
if (have[k].g.parent)
have[k].g.parent.remove(have[k].g);
delete have[k];
} });
}
function sgaNearMeet() { var have = SGA.meets || {}, P = camera.position, best = null, bd = 3.6; Object.keys(have).forEach(function (k) { var g = have[k].g; var d = Math.hypot(P.x - g.position.x, P.z - g.position.z); if (d < bd) {
bd = d;
best = have[k];
} }); if (best)
best.d = bd; return best; }
var SGA_DLV = { base: -5600000, R: [] };
function sgaLayout(d) {
var T = (typeof SGA_TIER !== "undefined" && SGA_TIER[d]) || { ch: 3, side: 0, mobs: [3, 4, 4] }, R = [], top = -12;
R.push({ k: "in", x0: -9, x1: 9, z0: -12, z1: 7, h: 8 });
var sideAt = [];
for (var q = 0; q < T.side; q++)
sideAt.push(T.ch - 1 - q * 1 >= 1 ? T.ch - 1 - q : q);
for (var i = 0; i < T.ch; i++) {
R.push({ k: "p" + (i + 1), x0: -2.4, x1: 2.4, z0: top - 19, z1: top + 1, h: 5 });
var z1 = top - 18, L = 22 + (i % 2) * 3, W = 26 + (i % 3) * 2, ox = i % 2 ? -2 : 2;
var c = { k: "c" + (i + 1), x0: ox - W / 2, x1: ox + W / 2, z0: z1 - L, z1: z1, h: 9 + (i % 2), mobs: T.mobs[i] || 4, champ: i >= 1 ? (T.champ || 0) : 0, i: i };
R.push(c);
if (sideAt.indexOf(i) >= 0) {
var e = (i % 2 ? -1 : 1), mz = (c.z0 + c.z1) / 2, sx = e > 0 ? c.x1 : c.x0;
var px0 = e > 0 ? sx - 1 : sx - 14, px1 = e > 0 ? sx + 14 : sx + 1;
R.push({ k: "pq" + (i + 1), x0: px0, x1: px1, z0: mz - 2.4, z1: mz + 2.4, h: 5 });
var rx0 = e > 0 ? sx + 13 : sx - 13 - 18, rx1 = e > 0 ? sx + 13 + 18 : sx - 13;
R.push({ k: "cs" + (i + 1), x0: rx0, x1: rx1, z0: mz - 10, z1: mz + 10, h: 8, mobs: Math.max(2, (T.mobs[i] || 3) - 1), champ: T.champ ? 1 : 0, side: 1, i: i });
}
top = c.z0;
}
R.push({ k: "p" + (T.ch + 1), x0: -3, x1: 3, z0: top - 21, z1: top + 1, h: 6 });
var bz1 = top - 20, BL = 40 + T.ch * 3, BW = 40 + T.ch * 2;
R.push({ k: "boss", x0: -BW / 2, x1: BW / 2, z0: bz1 - BL, z1: bz1, h: 16 });
return R;
}
var SGA_ROOMS = sgaLayout("barrow");
function sgaBossRoom() { return SGA_ROOMS[SGA_ROOMS.length - 1]; }
function sgaIsPass(r) { return r.k.charAt(0) === "p"; }
function sgaSees(ax, az, bx, bz) {
var dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz);
if (d < 1.6)
return true;
var n = Math.min(120, Math.ceil(d / 0.5));
for (var i = 1; i < n; i++) {
var u = i / n;
if (u * d < 0.5 || (1 - u) * d < 0.7)
continue;
if (sgaDlvBlocked(ax + dx * u, az + dz * u))
return false;
}
return true;
}
function sgaFoesSeen() { var P = camera.position, lx = P.x - WORLDS.delve.base, lz = P.z; return sgaFoes().filter(function (M) { return sgaSees(lx, lz, M.g.position.x, M.g.position.z); }); }
function sgaRoomAt(x, z) { for (var i = 0; i < SGA_ROOMS.length; i++) {
var r = SGA_ROOMS[i];
if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1)
return r;
} return null; }
function sgaDlvBlocked(x, z) { var m = 0.45; for (var i = 0; i < SGA_ROOMS.length; i++) {
var r = SGA_ROOMS[i];
if (x > r.x0 + m && x < r.x1 - m && z > r.z0 + m && z < r.z1 - m)
return false;
} return true; }
function sgaBossDress(g, D) { return __ZC(433, 24, this, arguments, new.target); }
var SGA_SLAG = null;
function sgaSlagTex() { return __ZC(433, 25, this, arguments, new.target); }
function sgaBossDressTick(g, dt, t) { return __ZC(433, 26, this, arguments, new.target); }
function sgaMat(col, o) { return __ZC(433, 27, this, arguments, new.target); }
function sgaStoneTex(col, kind, rep) { return __ZC(433, 28, this, arguments, new.target); }
function sgaDlvBuild(G) { return __ZC(433, 29, this, arguments, new.target); }
function sgaDlvDress(G, d, r, lite) { return __ZC(433, 30, this, arguments, new.target); }
function sgaWeekEnds() { var d = new Date(), day = d.getUTCDay(), add = (8 - day) % 7 || 7; return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + add); }
function sgaDelveGo(d, runId) { return __ZC(433, 31, this, arguments, new.target); }
function sgaDlvFresh(d, run) {
SGA.delve = { d: d, run: run || null, hp: null, max: null, state: run ? run.state : "practice", members: (run && run.members) || [], buf: 0, sent: 0, pollAt: 0, loot: null, boss: null, mobs: [], vig: 100, cool: 0, slam: 0, won: false };
}
function sgaDlvEnter() { return __ZC(433, 32, this, arguments, new.target); }
function sgaDlvLeave() { return __ZC(433, 33, this, arguments, new.target); }
function sgaDlvSpawn() { return __ZC(433, 34, this, arguments, new.target); }
function sgaDlvFlush() { return __ZC(433, 35, this, arguments, new.target); }
function sgaDlvPoll() {
var S = SGA.delve;
if (!S || !S.run || Date.now() - S.pollAt < 2500)
return;
S.pollAt = Date.now();
cityRpc("saga_run_state", { p_run: S.run.id }).then(function (o) { if (o && o.ok)
sgaDlvState(o); }).catch(function () { });
}
function sgaDlvState(o) {
var S = SGA.delve;
if (!S)
return;
S.hp = o.hp;
S.max = o.hp_max;
S.members = o.members || S.members;
S.state = o.state;
if (o.state === "won" && !S.won)
sgaDlvWon(o);
}
function sgaDlvWon(o) { return __ZC(433, 36, this, arguments, new.target); }
function sgaVigHurt(d, name) { return __ZC(433, 37, this, arguments, new.target); }
function sgaFoes() { var S = SGA.delve, out = []; if (!S)
return out; S.mobs.forEach(function (M) { if (M.st !== "dead")
out.push(M); }); if (S.boss && S.boss.st !== "sleep" && !S.boss.fallen)
out.push(S.boss); return out; }
function sgaDlvStrike() { sgaDlvAttack(); }
function sgaDlvDamage(M, dmg, knock, byComp) { return __ZC(433, 38, this, arguments, new.target); }
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () { if (WLD.on === "delve") {
sgaDlvStrike();
return;
} return uc.apply(this, arguments); };
})();
if (typeof addEventListener === "function") {
addEventListener("keydown", function (e) { if (WLD.on !== "delve" || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return; if (e.code === "KeyF" && !e.repeat) {
sgaDlvStrike();
} });
addEventListener("mousedown", function (e) { if (WLD.on === "delve" && e.button === 0 && document.pointerLockElement && walkMode)
sgaDlvStrike(); });
}
function sgaDlvTick(dt) { return __ZC(433, 39, this, arguments, new.target); }
function sgaDlvHud(D) { return __ZC(433, 40, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys && WLG.keys.indexOf("delve") < 0)
WLG.keys.push("delve");
if (typeof worldDef === "function")
worldDef("delve", {
base: SGA_DLV.base, far: 320, ownSky: true, tone: 220,
env: function () { var D = SGA_DUNGEONS[(SGA.delve && SGA.delve.d) || "belfry"]; return { top: D.fog, low: D.fog, fog: D.fog, fogD: 0.022, sun: 0.25, sunCol: D.light, sunDir: [0.2, 1, 0.1], hemi: 0.5, hemiCol: 0x8890A8, hemiGround: 0x201814, stars: 0 }; },
build: function (G) { SGA_DLV.R = []; sgaDlvBuild(G); },
enter: function () { sgaDlvEnter(); },
leave: function () { sgaDlvLeave(); var h = document.getElementById("sga-strike"); if (h)
h.style.display = "none"; },
ground: function (x, z) { var q = SGA_DLV.dais; return q && (x - q.x) * (x - q.x) + (z - q.z) * (z - q.z) < 9.3 * 9.3 ? 0.6 : 0; },
sight: function (ax, az, bx, bz) { return sgaSees(ax, az, bx, bz); },
block: function (x, z) { if (sgaDlvBlocked(x, z))
return true; if (z > 3.1 && Math.abs(x) < 2.7)
return true; var R = SGA_DLV.R; for (var i = 0; i < R.length; i++) {
var q = R[i];
if ((x - q.x) * (x - q.x) + (z - q.z) * (z - q.z) < (q.r + 0.3) * (q.r + 0.3))
return true;
} return false; },
tick: function (dt) { sgaDlvTick(dt); },
back: function () { var out = function () { worldHome("<b>You climb back up into the daylight.</b>"); }; if (typeof dgnLeaveAsk === "function")
dgnLeaveAsk(out);
else
out(); },
indoors: function () { return 2; }
});
var SGA_FX = { vm: null, vmKey: null, swing: 0, kick: 0, shots: [], lines: [], drops: [], bars: [] };
function sgaArm() { return __ZC(433, 41, this, arguments, new.target); }
function sgaVR() { return typeof VRM !== "undefined" && !!VRM.xr; }
function sgaEyes() { return typeof meView === "undefined" || meView === "eyes"; }
function sgaVmSet() { return __ZC(433, 42, this, arguments, new.target); }
function sgaVmDrop() { var v = SGA_FX.vm; if (v && v.parent)
v.parent.remove(v); SGA_FX.vm = null; SGA_FX.vmKey = null; }
function sgaVmTick(dt) { return __ZC(433, 43, this, arguments, new.target); }
function sgaAimDir() {
var d = new THREE.Vector3();
if (sgaVR())
try {
var vc = VRM.cam || (renderer.xr && renderer.xr.getCamera(camera));
if (vc) {
vc.getWorldDirection(d);
if (d.lengthSq() > 0.5)
return d.normalize();
}
}
catch (e) { }
return d.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
}
function sgaFoeR(M) { var S = SGA.delve; if (M === S.boss)
return 1.1 + SGA_DUNGEONS[S.d].boss.scale * 0.6; var K = M.K || {}; return 0.8 * (K.big ? 1.5 : 1) * (K.scale ? Math.min(1.8, K.scale / 2) : 1); }
function sgaAssist(lx, lz, dir, maxD, tol) { return __ZC(433, 44, this, arguments, new.target); }
function sgaDmg(A) {
var d = typeof dgbMyDmg === "function" ? dgbMyDmg() : 12;
if (A && A.dmg && A.dmg < 16)
d = Math.max(1, Math.round(d * A.dmg / 16));
return d;
}
function sgaDlvAttack() { return __ZC(433, 45, this, arguments, new.target); }
function sgaShot(from, dir, speed, dmg, col, splash, knock) { return __ZC(433, 46, this, arguments, new.target); }
function sgaShotsTick(dt) { return __ZC(433, 47, this, arguments, new.target); }
function sgaLine(a, b, col, life, w) { return __ZC(433, 48, this, arguments, new.target); }
function sgaRing(x, z, r, col) { return __ZC(433, 49, this, arguments, new.target); }
function sgaLinesTick(dt) { return __ZC(433, 50, this, arguments, new.target); }
function sgaHitSay(M, d) { return __ZC(433, 51, this, arguments, new.target); }
function sgaBar(M) { return __ZC(433, 52, this, arguments, new.target); }
function sgaBarsTick() { return __ZC(433, 53, this, arguments, new.target); }
function sgaDropAt(M) { return __ZC(433, 54, this, arguments, new.target); }
function sgaDropsTick(dt) {
var P = camera.position, lx = P.x - SGA_DLV.base, lz = P.z;
for (var i = SGA_FX.drops.length - 1; i >= 0; i--) {
var D = SGA_FX.drops[i];
D.t += dt;
D.g.rotation.y += dt * 0.6;
if (D.t > 0.6 && Math.hypot(lx - D.x, lz - D.z) < 1.7) {
if (D.g.parent)
D.g.parent.remove(D.g);
SGA_FX.drops.splice(i, 1);
sgaDropTake(D);
}
}
}
function sgaDropTake(D) { return __ZC(433, 55, this, arguments, new.target); }
function sgaDlvFightTick(dt) {
try {
sgaVmTick(dt);
}
catch (e) { }
sgaShotsTick(dt);
sgaLinesTick(dt);
sgaBarsTick();
sgaDropsTick(dt);
}
function sgaDlvFightClear() { return __ZC(433, 56, this, arguments, new.target); }
var SGA_DDR = { mats: null, d: null };
function sgaDdrMats(d) { return __ZC(433, 57, this, arguments, new.target); }
function sgaDdrOpen(x, z) { for (var i = 0; i < SGA_ROOMS.length; i++) {
var o = SGA_ROOMS[i];
if (x > o.x0 - 1.2 && x < o.x1 + 1.2 && z > o.z0 - 1.2 && z < o.z1 + 1.2) {
var inside = x > o.x0 + 0.05 && x < o.x1 - 0.05 && z > o.z0 + 0.05 && z < o.z1 - 0.05;
if (o.__cur)
continue;
if (inside || sgaIsPass(o) || o.k.charAt(0) === "s")
return true;
}
} return false; }
function sgaDdrRoom(G, d, r, lite) { return __ZC(433, 58, this, arguments, new.target); }
(function () {
if (typeof sgaDlvDress !== "function")
return;
var f = sgaDlvDress;
sgaDlvDress = function (G, d, r, lite) { var res = f.apply(this, arguments); try {
sgaDdrRoom(G, d, r, lite);
}
catch (e) {
if (window.console)
console.warn("[saga] dungeon dress", e);
} return res; };
if (typeof sgaDlvBuild === "function") {
var b = sgaDlvBuild;
sgaDlvBuild = function () { SGA_DDR.mats = null; SGA_DDR.d = null; return b.apply(this, arguments); };
}
})();
function sgaSeasonNow() { return (SGA.me && SGA.me.season) || null; }
function sgaLandmarks() {
var out = [], me = SGA.me;
if (!me || me.seasons_on === false)
return out;
(me.seasons || []).forEach(function (s) { var D = SGA_SEASONS[s.key]; if (!D)
return; if (s.state === "raised" || s.state === "fallen")
out.push({ key: s.key, D: D, up: s.state === "raised" }); });
return out;
}
function sgaSpotHash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function sgaMonSpot(key, D) {
var keep = SGA.prog.spots || (SGA.prog.spots = {});
if (keep[key])
return keep[key];
if (!ATLC || typeof atlRing !== "function")
return null;
var R = atlRing(D.ring) || atlRing("plaza");
if (!R)
return null;
var a0 = (sgaSpotHash(key) % 6283) / 1000, st = typeof lcyStreets === "function" ? lcyStreets() : [], P = camera.position;
var cand = [];
for (var rr = R.S + 16; rr < R.E - 14; rr += 7) {
if (st.some(function (q) { return Math.abs(q - rr) < 9; }))
continue;
cand.push(rr);
}
if (!cand.length)
cand = [(R.S + R.E) / 2];
for (var k = 0; k < 240; k++) {
var a = a0 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.012, r = cand[k % cand.length], x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
if (Math.hypot(P.x - x, P.z - z) > 320)
return null;
if (!atlClearAt(r, a, 9, 4))
continue;
var bad = false;
for (var q = 0; q < 10 && !bad; q++) {
var qa = q / 10 * Math.PI * 2, qr = q ? 7 : 0;
if (typeof blockedAt === "function" && blockedAt(x + Math.cos(qa) * qr, z + Math.sin(qa) * qr, terrainY(x, z)))
bad = true;
}
if (bad)
continue;
keep[key] = { x: x, z: z, a: a };
sgaSaveSoon();
return keep[key];
}
return null;
}
function sgaMon(D, up, key) { return __ZC(433, 59, this, arguments, new.target); }
function sgaMonthName(key) { var p = String(key).split("-"); try {
return new Date(Date.UTC(+p[0], +p[1] - 1, 2)).toLocaleDateString(undefined, { month: "long", year: "numeric", timeZone: "UTC" });
}
catch (e) {
return key;
} }
function sgaMonDrop(key) { return __ZC(433, 60, this, arguments, new.target); }
function sgaMonTick() {
var mons = SGA.mons || (SGA.mons = {}), P = camera.position;
var on = !WLD.on && !store.inside && typeof inCityNow === "function" && inCityNow() && !!ATLC;
var want = {};
if (on)
sgaLandmarks().forEach(function (L) {
var id = L.key + (L.up ? "u" : "d"), sp = sgaMonSpot(L.key, L.D);
if (!sp)
return;
var d = Math.hypot(P.x - sp.x, P.z - sp.z);
if (d > (sgaLite() ? 260 : 420))
return;
want[id] = 1;
if (mons[id])
return;
var made = sgaMon(L.D, L.up, L.key), g = made.g, face = Math.atan2(ATLC.x - sp.x, ATLC.z - sp.z);
g.position.set(sp.x, terrainY(sp.x, sp.z), sp.z);
g.rotation.y = face;
scene.add(g);
var c = Math.cos(face), s = Math.sin(face);
mons[id] = { g: g, solids: made.solids.map(function (q) { return { x: sp.x + q.x * c + q.z * s, z: sp.z - q.x * s + q.z * c, r: q.r, h: q.h, y: g.position.y }; }) };
});
Object.keys(mons).forEach(function (id) { if (!want[id])
sgaMonDrop(id); });
}
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
var M = SGA.mons;
if (M && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on)) {
for (var id in M) {
var L = M[id].solids;
for (var i = 0; i < L.length; i++) {
var q = L[i];
if (feet !== undefined && feet > q.y + q.h - 0.3)
continue;
var dx = x - q.x, dz = z - q.z;
if (dx * dx + dz * dz < (q.r + 0.35) * (q.r + 0.35))
return true;
}
}
}
return ba.apply(this, arguments);
};
})();
function sgaSeasonSay() {
var S = sgaSeasonNow();
if (!S || S.state !== "on" || !SGA.me || SGA.me.seasons_on === false)
return;
var D = SGA_SEASONS[S.key];
if (!D)
return;
var ch = sgaChapter(), id = S.key + ":" + ch;
if (SGA.prog.seen["season:" + id])
return;
SGA.prog.seen["season:" + id] = 1;
sgaSaveSoon();
sgaToast(D.icon + " " + D.n + ", chapter " + (ch + 1) + ": " + D.ch[ch]);
}
var SGA_PLAY = {
"2026-11": { verb: "Mine", tool: "⛏️", item: "star-glass shard", node: "crystal", nodeN: "star-glass", site: "The Star Crater",
who: "Forgemaster Ilda Brask", whoT: "of the Guilds, minding the crater", fell: "across the Harvest Ring",
ask: "Every shard you bring me goes into the Star Spire, and every one counts on the city's tally. Mine the star-glass growing out of the rim (press E on it, three strikes with your pick), and pick up the shards that fell across the Harvest Ring." },
"2026-12": { verb: "Cut", tool: "🪓", item: "block of canal ice", node: "block", nodeN: "canal ice", site: "The Winter Bridge site",
who: "Bridgewright Osk Fennel", whoT: "building the Winter Bridge", fell: "along the frozen canal",
ask: "Every block of ice goes into the Winter Bridge, and counts on the city's tally. Cut it from the frozen canal by the site, and bring in the blocks left lying along the Market Ring." },
"2027-01": { verb: "Fill", tool: "🫙", item: "jar of lamp oil", node: "crate", nodeN: "the oil barrels", site: "The Lantern Road site",
who: "Lamplighter Wren Tallow", whoT: "of the lamplighters' guild", fell: "by the dark lamp posts",
ask: "Every jar of oil lights a lantern on the road, and counts on the city's tally. Fill jars at the barrels, and bring in the ones left by the dark posts across the Commons." },
"2027-02": { verb: "Salvage", tool: "🔧", item: "brass gear", node: "crate", nodeN: "the scrap crates", site: "The Great Clock site",
who: "Watchmaker Tobin Spry", whoT: "building the Great Clock", fell: "about the Civic Ring",
ask: "Every gear goes into the Great Clock, and counts on the city's tally." },
"2027-03": { verb: "Draw", tool: "🪣", item: "pail of well water", node: "crate", nodeN: "the well buckets", site: "The Great Oak's green",
who: "Gardener Moss Ebbet", whoT: "tending the seedling", fell: "across the Commons",
ask: "Every pail of water helps the oak grow, and counts on the city's tally." },
"2027-04": { verb: "Dress", tool: "🔨", item: "squared stone", node: "block", nodeN: "the rough stone", site: "The Warrens Watch site",
who: "Mason Hab Corrie", whoT: "saving the watchtower", fell: "round the cracked tower",
ask: "Every squared stone goes back into the watchtower, and counts on the city's tally." },
"2027-05": { verb: "Coil", tool: "🪢", item: "coil of mast rope", node: "crate", nodeN: "the rope bales", site: "The Sky Mast site",
who: "Bosun Kitt Larrow", whoT: "raising the Sky Mast", fell: "along the quay",
ask: "Every coil of rope helps raise the mast, and counts on the city's tally." },
"2027-06": { verb: "Cut", tool: "🪓", item: "stone wedge", node: "block", nodeN: "the old stones", site: "The Midsummer Ring site",
who: "Stonewarden Aud Haver", whoT: "raising the ring", fell: "on the High Ring's lawns",
ask: "Every wedge helps raise a stone, and counts on the city's tally." },
"2027-07": { verb: "Haul", tool: "🪝", item: "bell-bronze ingot", node: "crate", nodeN: "the salvage nets", site: "The Harbour Bell site",
who: "Diver Sel Marrow", whoT: "bringing up the bell", fell: "along the harbour",
ask: "Every ingot goes into the bell tower's frame, and counts on the city's tally." },
"2027-08": { verb: "Mine", tool: "⛏️", item: "comet-glass shard", node: "crystal", nodeN: "comet-glass", site: "The Comet Arch site",
who: "Trader Esk Varo", whoT: "building the Comet Arch", fell: "across the Market Ring",
ask: "Every shard goes into the Comet Arch, and counts on the city's tally." },
"2027-09": { verb: "Bind", tool: "🌾", item: "sheaf of wheat", node: "crate", nodeN: "the standing wheat", site: "The Feast Hall site",
who: "Reeve Hollis Barrow", whoT: "building the Feast Hall", fell: "across the Harvest Ring",
ask: "Every sheaf feeds the feast, and counts on the city's tally." },
"2027-10": { verb: "Dip", tool: "🕯️", item: "veil candle", node: "crate", nodeN: "the wax vats", site: "The Veil Lanterns site",
who: "Sister Ama Thorne", whoT: "of the Temple", fell: "in the Temple Row gardens",
ask: "Every candle lights a lantern for the lost, and counts on the city's tally." }
};
var SGP = { site: null, loose: null, near: null, pt: 0, said: {}, busy: false, day: "" };
var SGP_NODES = 8, SGP_LOOSE = 8, SGP_REGROW = 120, SGP_STRIKES = 3, SGP_CARRY = 12, SGP_DAY_CAP = 20;
function sgpSeason() {
var key = sgaSeasonKey(), S = sgaSeasonNow();
if (SGA.me && SGA.me.seasons_on === false)
return null;
if (S && S.key === key && S.state && S.state !== "on")
return null;
var D = SGA_SEASONS[key], P = SGA_PLAY[key];
if (!D || !P)
return null;
return { key: key, D: D, P: P, S: S && S.key === key ? S : null };
}
function sgpMine(key) { var A = SGA.prog.sp || (SGA.prog.sp = {}); var m = A[key] || (A[key] = { carry: 0, given: 0, mined: 0, day: "", today: 0 }); var d = new Date().toISOString().slice(0, 10); if (m.day !== d) {
m.day = d;
m.today = 0;
} return m; }
function sgpHash(s) { return sgaSpotHash(s); }
function sgpSpot(key, D) {
var keep = SGA.prog.spots && SGA.prog.spots[key];
if (keep)
return keep;
var sp = sgaMonSpot(key, D);
if (sp)
return sp;
var R = atlRing(D.ring) || atlRing("plaza");
if (!R || !ATLC)
return null;
var a = (sgaSpotHash(key) % 6283) / 1000, r = (R.S + R.E) / 2;
return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r, a: a, guess: 1 };
}
function sgpWord(dx, dz) { var b = (Math.atan2(dx, -dz) * 180 / Math.PI + 360) % 360; return ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(b / 45) % 8]; }
function sgpDist(d) { return d < 1000 ? "about " + Math.max(10, Math.round(d / 10) * 10) + " m" : "about " + (d / 1000).toFixed(1) + " km"; }
var SGP_MAT = {};
function sgpMat(k, col, o) { var id = k + "|" + col; if (SGP_MAT[id])
return SGP_MAT[id]; var m = sgaMat(col, o); m.userData.sgaOwn = false; return SGP_MAT[id] = m; }
function sgpNodeMesh(kind, col) { return __ZC(433, 61, this, arguments, new.target); }
function sgpPieceMesh(kind, col) { return __ZC(433, 62, this, arguments, new.target); }
function sgpSignTex(P, D) { return __ZC(433, 63, this, arguments, new.target); }
function sgpBuild(E, sp) { return __ZC(433, 64, this, arguments, new.target); }
function sgpDrop() {
var S = SGP.site;
if (S) {
if (S.g.parent)
S.g.parent.remove(S.g);
S.g.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); if (o.material && o.material.map && o.material.map.isCanvasTexture) {
o.material.map.dispose();
o.material.dispose();
} });
SGP.site = null;
}
sgpLooseDrop();
}
function sgpLooseSpots(E) {
var day = new Date().toISOString().slice(0, 10), id = E.key + ":" + day;
if (SGP.loose && SGP.loose.id === id)
return SGP.loose;
sgpLooseDrop();
var R = atlRing(E.D.ring), L = [];
if (!R || !ATLC)
return null;
var st = typeof lcyStreets === "function" ? lcyStreets() : [];
for (var i = 0; i < SGP_LOOSE; i++) {
var h = sgpHash(id + ":" + i);
for (var t = 0; t < 30; t++) {
var a = ((h + t * 977) % 6283) / 1000, r = R.S + 10 + ((h >>> 8) + t * 131) % Math.max(1, (R.E - R.S - 20));
if (st.some(function (q) { return Math.abs(q - r) < 3; }))
continue;
if (!atlClearAt(r, a, 2, 1))
continue;
L.push({ i: i, x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r, r: r });
break;
}
}
SGP.loose = { id: id, day: day, L: L, m: {} };
return SGP.loose;
}
function sgpLooseDrop() { var Lo = SGP.loose; if (!Lo)
return; for (var k in Lo.m) {
var g = Lo.m[k];
if (g.parent)
g.parent.remove(g);
} Lo.m = {}; SGP.loose = null; }
function sgpLooseTick(E, mine) {
var Lo = sgpLooseSpots(E);
if (!Lo)
return null;
var P = camera.position, t = performance.now() / 1000, best = null, got = mine.loose && mine.loose.day === Lo.day ? mine.loose.got : [];
Lo.L.forEach(function (s) {
var d = Math.hypot(P.x - s.x, P.z - s.z), g = Lo.m[s.i], taken = got.indexOf(s.i) >= 0;
if (taken || d > 60) {
if (g) {
if (g.parent)
g.parent.remove(g);
delete Lo.m[s.i];
}
return;
}
if (!g) {
g = sgpPieceMesh(E.P.node, E.D.col);
scene.add(g);
Lo.m[s.i] = g;
}
g.position.set(s.x, terrainY(s.x, s.z) + 0.5 + Math.sin(t * 1.3 + s.i) * 0.08, s.z);
g.rotation.y = t * 0.7 + s.i;
if (d < 2.8 && (!best || d < best.d))
best = { s: s, d: d };
});
return best && best.s;
}
function sgpSay(t) { if (typeof setStatus === "function")
setStatus(t); }
function sgpTone(f, s) { try {
if (typeof playTone === "function")
playTone(f, s);
}
catch (e) { } }
function sgpStrike(n, E) { return __ZC(433, 65, this, arguments, new.target); }
function sgpTakeLoose(s, E) { return __ZC(433, 66, this, arguments, new.target); }
function sgpGive(E) { return __ZC(433, 67, this, arguments, new.target); }
function sgpCard(E, msg) { return __ZC(433, 68, this, arguments, new.target); }
function sgpShowWay() { return __ZC(433, 69, this, arguments, new.target); }
function sgpPrompt(html, fn, key) {
if (!html) {
if (SGP.near) {
SGP.near = null;
worldPromptCity(null);
}
return;
}
if (SGP.near !== key) {
SGP.near = key;
worldPromptCity(html, function () { worldPromptCity(null); SGP.near = null; fn(); });
}
}
function sgpTick(dt) {
var city = !WLD.on && !(typeof store !== "undefined" && store.inside) && typeof inCityNow === "function" && inCityNow() && !!ATLC;
var E = city ? sgpSeason() : null;
if (!E) {
if (SGP.site || SGP.loose)
sgpDrop();
if (SGP.near)
sgpPrompt(null);
return;
}
var P = camera.position, sp = sgpSpot(E.key, E.D), far = sgaLite() ? 260 : 420;
if (SGP.site && (SGP.site.key !== E.key || !sp || sp.guess || Math.hypot(P.x - SGP.site.x, P.z - SGP.site.z) > far + 40 || SGP.site.x !== sp.x)) {
var keepLoose = SGP.loose;
SGP.loose = null;
sgpDrop();
SGP.loose = keepLoose;
}
if (!SGP.site && sp && !sp.guess && Math.hypot(P.x - sp.x, P.z - sp.z) < far)
sgpBuild(E, sp);
if (typeof guideTo !== "undefined" && guideTo && guideTo.key === E.P.site && sp && !sp.guess) {
if (Math.hypot(P.x - sp.x, P.z - sp.z) < 18)
guideTo = null;
else {
guideTo.x = sp.x;
guideTo.z = sp.z;
}
}
var mine = sgpMine(E.key), loose = sgpLooseTick(E, mine), S = SGP.site, t = performance.now() / 1000;
if (S) {
var now = Date.now() / 1000, st = mine.nodes || {};
S.nodes.forEach(function (n) { var s = st[String(n.i)], down = s && s.t && now - s.t < SGP_REGROW; n.g.visible = !down; });
if (SGP.heart)
SGP.heart.rotation.y = t * 0.3;
}
if (S && !SGP.said[E.key] && Math.hypot(P.x - S.x, P.z - S.z) < 60) {
SGP.said[E.key] = 1;
sgpSay(E.D.icon + " <b>" + esc(E.P.site) + ".</b> " + esc(E.P.verb) + " the " + esc(E.P.nodeN) + " round the edge (walk up, press E) and bring each " + esc(E.P.item) + " to " + esc(E.P.who) + " at her table: every one counts for the city.");
}
SGP.pt += dt;
if (SGP.pt < 0.15)
return;
SGP.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
sgpPrompt(null);
return;
}
if (loose) {
sgpPrompt(E.D.icon + " <b>A fallen " + esc(E.P.item) + "</b> · <b>press E</b> to pick it up", function () { sgpTakeLoose(loose, E); }, "loose" + loose.i);
return;
}
if (S) {
var K = S.keeper;
if (Math.hypot(P.x - K.x, P.z - K.z) < 3.4) {
sgpPrompt(E.D.icon + " <b>" + esc(E.P.who) + "</b> · <b>press E</b> to " + (mine.carry ? "give her your " + mine.carry + " " + esc(E.P.item) + (mine.carry > 1 ? "s" : "") : "talk about the work"), function () { sgpCard(E); }, "keeper" + mine.carry);
return;
}
var now2 = Date.now() / 1000, st2 = mine.nodes || {}, best = null, bd = 1e9;
S.nodes.forEach(function (n) { var s = st2[String(n.i)]; if (s && s.t && now2 - s.t < SGP_REGROW)
return; var d = Math.hypot(P.x - n.x, P.z - n.z); if (d < 3.2 && d < bd) {
bd = d;
best = n;
} });
if (best) {
var h = (st2[String(best.i)] || {}).h || 0;
sgpPrompt(E.P.tool + " <b>" + esc(E.P.nodeN.charAt(0).toUpperCase() + E.P.nodeN.slice(1)) + "</b> · <b>press E</b> to " + esc(E.P.verb.toLowerCase()) + (h ? " (strike " + (h + 1) + " of " + SGP_STRIKES + ")" : ""), function () { sgpStrike(best, E); }, "node" + best.i + ":" + h);
return;
}
}
sgpPrompt(null);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
sgpTick(dt || 0.016);
}
catch (e) {
if (!SGP.warned) {
SGP.warned = true;
if (window.console)
console.warn("season play:", e);
}
} };
})();
(function () {
if (typeof sgaTabSeason !== "function")
return;
var tb = sgaTabSeason;
sgaTabSeason = function () {
var h = tb.apply(this, arguments);
try {
var E = sgpSeason();
if (E) {
var m = sgpMine(E.key);
h += sgaBox("<b>" + E.P.tool + " Help the city now:</b> " + esc(E.P.verb) + " " + esc(E.P.nodeN) + " at " + esc(E.P.site) + " in " + esc((atlRing(E.D.ring) || { name: "the city" }).name) + ", and pick up the ones lying " + esc(E.P.fell) + ". Give each " + esc(E.P.item) + " to " + esc(E.P.who) + ": one point on the tally each." +
"<div style='font-size:12px;opacity:.8;margin-top:4px'>You carry " + m.carry + " · you have given " + m.given + " this season</div>" +
"<button class='btn' id='sgp-way' style='margin-top:6px' onclick='SGA.open=false;sgaPaint();sgpShowWay();'>🧭 Show me the way to " + esc(E.P.site) + "</button>", "#9AD8FF");
}
}
catch (e) { }
return h;
};
})();
(function () {
if (typeof sgaSeasonSay !== "function")
return;
var ss = sgaSeasonSay;
sgaSeasonSay = function () {
var S = sgaSeasonNow(), before = S && SGA.prog.seen["season:" + S.key + ":" + sgaChapter()];
ss.apply(this, arguments);
try {
var E = sgpSeason();
if (E && S && !before && SGA.prog.seen["season:" + S.key + ":" + sgaChapter()])
setTimeout(function () { sgpSay(E.D.icon + " To help: " + esc(E.P.verb.toLowerCase()) + " " + esc(E.P.nodeN) + " at " + esc(E.P.site) + " in " + esc((atlRing(E.D.ring) || { name: "the city" }).name) + " and bring it to " + esc(E.P.who) + ". (📜 Story and quests > 🌠 Season shows the way.)"); }, 6000);
}
catch (e) { }
};
})();
function sgpStats() { var E = sgpSeason(); return { season: E && E.key, site: !!SGP.site, nodes: SGP.site ? SGP.site.nodes.length : 0, loose: SGP.loose ? SGP.loose.L.length : 0, mine: E ? sgpMine(E.key) : null, spot: E ? sgpSpot(E.key, E.D) : null }; }
function sgaLootFrom(d) { d = String(d || ""); if (d.indexOf("quest:") === 0) {
var L = typeof QLN !== "undefined" && QLN.by[d.slice(6)];
return L ? L.title : "";
} return (SGA_DUNGEONS[d] || {}).n || ""; }
function sgaBtn(a, label, extra, style) { return "<button class='btn' data-sg='" + a + "'" + (extra || "") + " style='margin:3px 4px 3px 0;" + (style || "") + "'>" + label + "</button>"; }
function sgaBox(inner, col) { return "<div style='padding:8px 10px;border:1px solid " + (col || "rgba(201,168,104,.35)") + ";border-radius:6px;margin:6px 0'>" + inner + "</div>"; }
function sgaDim(t) { return "<div style='font-size:12px;opacity:.78'>" + t + "</div>"; }
function sgaStepWhere(s) {
var w = sgaWhere(s);
if (w.city)
return "📍 " + esc(w.city) + ", Somnucor";
if (w.world)
return "📍 " + esc(w.how || w.n);
if (s.kind === "delve")
return "📍 " + esc(SGA_DUNGEONS[s.dungeon].n) + " (Dungeons tab)";
return "";
}
function sgaTabStory() { return __ZC(433, 70, this, arguments, new.target); }
function sgaTabQuests() { return __ZC(433, 71, this, arguments, new.target); }
function sgaTabStanding() { return __ZC(433, 72, this, arguments, new.target); }
function sgaTabComp() { return __ZC(433, 73, this, arguments, new.target); }
function sgaTabDungeons() { return __ZC(433, 74, this, arguments, new.target); }
function sgaTabSeason() { return __ZC(433, 75, this, arguments, new.target); }
function lvlBar0(f) { return "<div style='height:8px;border-radius:4px;background:#232838;overflow:hidden;margin-top:4px'><div style='height:100%;width:" + (f * 100).toFixed(1) + "%;background:#C9A85A'></div></div>"; }
var SGA_TABS = [["story", "📜 Story"], ["quests", "🗒️ Side quests"], ["standing", "🏛️ Standing"], ["comp", "🤝 Companions"], ["dungeons", "⚔️ Dungeons"], ["season", "🌠 Season"]];
function sgaHtml() { return __ZC(433, 76, this, arguments, new.target); }
function sgaPaint() {
var el = document.getElementById("sga-box");
if (!SGA.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sga-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100vw - 32px));max-height:min(86vh,800px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(26,22,16,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", sgaClick);
document.body.appendChild(el);
}
var st = el.scrollTop;
el.innerHTML = sgaHtml();
el.scrollTop = st;
el.style.display = "block";
}
function sgaRunsLoad() {
if (!sgaOnline() || SGA.off)
return;
cityRpc("saga_runs", {}).then(function (o) { if (o && o.ok) {
SGA.runs = {};
(o.runs || []).forEach(function (r) { (SGA.runs[r.dungeon] || (SGA.runs[r.dungeon] = [])).push(r); });
sgaPaint();
} }).catch(function () { });
}
function sgaClick(e) { return __ZC(433, 77, this, arguments, new.target); }
function sgaOpen(tab) {
SGA.open = true;
if (tab)
SGA.tab = tab;
SGA.say = SGA.tab === "story" ? SGA.say : "";
sgaPaint();
sgaLoad();
if (SGA.tab === "dungeons")
sgaRunsLoad();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
}
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return SGA.open; }, close: function () { SGA.open = false; sgaPaint(); } });
(function () {
if (typeof PS_SECTIONS !== "undefined") {
var Y = PS_SECTIONS.filter(function (s) { return s.k === "you"; })[0];
if (Y && Y.ids.indexOf("me-story") < 0) {
var i = Y.ids.indexOf("me-rep");
Y.ids.splice(i < 0 ? Y.ids.length : i + 1, 0, "me-story");
}
}
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-story"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-story";
b.title = "The main story, side quests, your standing, companions, dungeons and the season";
b.textContent = "📜 Story and quests";
b.onclick = function () { sgaOpen(); };
var pk = document.getElementById("me-rep");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var L = (SGA.me && SGA.me.loot) || [];
if (L.length && typeof bkpHead === "function" && typeof bkpRow === "function") {
h += bkpHead("Story and dungeon keepsakes") + L.slice(0, 40).map(function (x) { return bkpRow(esc((x.icon || "") + " " + x.name), esc(sgaLootFrom(x.dungeon))); }).join("");
}
}
catch (e) { }
return h;
};
})();
function sgaPromptPaint(near) {
var el = document.getElementById("sga-prompt");
if (!near) {
if (el)
el.style.display = "none";
SGA.near = null;
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sga-prompt";
el.setAttribute("role", "button");
el.tabIndex = 0;
el.style.cssText = "position:fixed;z-index:44;left:50%;transform:translateX(-50%);bottom:calc(120px + env(safe-area-inset-bottom,0px));padding:7px 14px;border-radius:16px;background:rgba(14,16,28,.88);border:1px solid #F2D27A;color:#F8EED0;font:13px var(--sans,system-ui);cursor:pointer;max-width:calc(100vw - 32px);text-align:center";
el.addEventListener("click", function (e) { e.stopPropagation(); if (SGA.near)
SGA.near.fn(); });
document.body.appendChild(el);
}
SGA.near = near;
if (el.dataset.h !== near.html) {
el.dataset.h = near.html;
el.innerHTML = near.html;
}
el.style.display = (typeof talkOpen !== "undefined" && talkOpen) ? "none" : "block";
}
function sgaNearTick() {
if (!walkMode || (typeof talkOpen !== "undefined" && talkOpen)) {
sgaPromptPaint(null);
return;
}
var C = sgaNearContact();
if (C) {
sgaPromptPaint({ html: "📜 <b>" + esc(C.who.name) + "</b> · press <b>E</b> to talk", close: C.d < 2.6, fn: function () { sgaPromptPaint(null); sgaTalkContact(C); } });
return;
}
var M = sgaNearMeet();
if (M) {
var Cm = M.C;
sgaPromptPaint({ html: Cm.icon + " <b>" + esc(Cm.name) + "</b> · press <b>E</b> to talk", close: M.d < 2.6, fn: function () {
sgaPromptPaint(null);
sgaTalk({ name: Cm.name, sex: Cm.sex, age: Cm.age, comp: Cm.k, fac: "commons", persona: "You are " + Cm.name + ", a " + Cm.age + "-year-old " + (Cm.sex === "f" ? "woman" : "man") + " of Somnucor: " + Cm.persona });
} });
return;
}
sgaPromptPaint(null);
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!SGA.near || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "") || (typeof talkOpen !== "undefined" && talkOpen))
return;
if (e.code === "KeyE" && !e.repeat) {
if (!SGA.near.close && ((WLD.on && WLD.promptFn) || (!WLD.on && typeof WCITY !== "undefined" && WCITY.fn)))
return;
e.preventDefault();
e.stopImmediatePropagation();
SGA.near.fn();
}
}, true);
function sgaNearFire() { var N = SGA.near; if (N)
N.fn(); }
(function () {
function claim(obj, key) {
if (!obj)
return;
var v = obj[key];
try {
Object.defineProperty(obj, key, { configurable: true, enumerable: true,
get: function () { return (SGA.near && SGA.near.close && !(typeof talkOpen !== "undefined" && talkOpen)) ? sgaNearFire : v; },
set: function (x) { v = x; } });
}
catch (e) { }
}
if (typeof WLD !== "undefined")
claim(WLD, "promptFn");
if (typeof WCITY !== "undefined")
claim(WCITY, "fn");
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick, acc = 0, slow = 0;
transitTick = function (dt) {
tt(dt);
try {
sgaCompTick(dt);
acc += dt;
slow += dt;
if (acc > 0.25) {
acc = 0;
sgaNearTick();
sgaChipTick();
}
if (slow > 1.2) {
slow = 0;
sgaContactsTick();
sgaCompMeetTick();
sgaSideTick();
sgaMonTick();
sgaSeasonSay();
if (sgaOnline() && !SGA.loading && Date.now() - (SGA.tried || 0) > (SGA.me ? 600000 : 120000))
sgaLoad(true);
}
}
catch (e) {
if (window.console && !SGA.warned) {
SGA.warned = 1;
console.warn("[saga]", e);
}
}
};
})();
var SGA_ERRANDS = ["talk.temple", "side", "talk.guilds", "delve", "talk.dragon", "talk.academies", "talk.commons"];
var SGA_ERRAND_SAY = {
"talk.temple": ["🌙", "Talk with someone of the Temple", "Priests, priestesses and temple folk keep Temple Row: the Vestry, the shrines and the chapels."],
"side": ["🤝", "Help with a city trouble", "Take one on from anyone you talk to (📜 Take this on), or from the Chronicle Press list on the Quests tab, or help at a call-out."],
"talk.guilds": ["⚒️", "Talk with a guild worker", "Smiths, masons, bakers, merchants: the shops and workshops of the markets."],
"delve": ["⚔️", "Fight in a dungeon, or help with a city trouble", "Go down with a group from the Dungeons tab, or take on a city trouble."],
"talk.dragon": ["🐉", "Talk with someone of the Dragon Corp", "Riders, constables and the watch: the Dragon Roost and the streets."],
"talk.academies": ["🎓", "Talk with a teacher or scholar", "The academies, the City School, the City Archive and the museum."],
"talk.commons": ["🏘️", "Talk with any townsperson", "Anyone of the common folk you meet in the streets of Somnucor."]
};
function sgaToday() { return new Date().toISOString().slice(0, 10); }
function sgaErrandOn(day) { var d = Math.round((Date.parse(day + "T00:00:00Z") - Date.parse("2026-11-02T00:00:00Z")) / 86400000); return SGA_ERRANDS[((d % 7) + 7) % 7]; }
function sgaDaily() {
var D = SGA.me && SGA.me.daily, t = sgaToday();
if (D && String(D.day).slice(0, 10) === t)
return D;
return { day: t, errand: sgaErrandOn(t), done: false, claimed: false, streak: 0, gold: 0, on: true, local: true };
}
function sgaErrandFits(e, kind, ref) {
if (e.indexOf("talk.") === 0)
return kind === "talk" && ref === e.slice(5);
if (e === "side")
return kind === "side" || kind === "help";
if (e === "delve")
return kind === "delve" || kind === "side";
return false;
}
function sgaDailyTry(kind, ref) { return __ZC(433, 78, this, arguments, new.target); }
function sgaDailyAfterLoad() { return __ZC(433, 79, this, arguments, new.target); }
function sgaDailyBox() { return __ZC(433, 80, this, arguments, new.target); }
(function () {
var d0 = sgaDeed;
sgaDeed = function (kind, ref) {
var p = d0.apply(this, arguments), k = kind, r = String(ref || "");
return p.then(function (o) { if (o && o.ok)
sgaDailyTry(k, r); return o; });
};
var w0 = sgaDlvWon;
sgaDlvWon = function () { var v = w0.apply(this, arguments); if (SGA.delve && SGA.delve.run)
setTimeout(function () { sgaDailyTry("delve", ""); }, 1500); return v; };
var l0 = sgaLoad;
sgaLoad = function () { return l0.apply(this, arguments).then(function (v) { if (v)
try {
sgaDailyAfterLoad();
}
catch (e) { } return v; }); };
var t0 = sgaTabStory;
sgaTabStory = function () { return sgaDailyBox() + t0.apply(this, arguments); };
})();
var QLN = { lines: [], by: {}, step: {}, state: null, stateAt: 0, open: {} };
function qlnLine(L) {
L.steps.forEach(function (s, i) { s.line = L.k; s.i = i; s.fac = s.fac || L.fac; QLN.step[s.id] = s; });
QLN.lines.push(L);
QLN.by[L.k] = L;
}
function qlnP(k) { var P = SGA.prog.lines || (SGA.prog.lines = {}); return P[k] || (P[k] = { done: {}, choice: {}, started: 0 }); }
function qlnDone(id) { var s = QLN.step[id]; return !!(s && qlnP(s.line).done[id]); }
function qlnOff(k) { var S = QLN.state; return !!(S && S.off && S.off.indexOf(k) > -1); }
function qlnNext(L) { if (!qlnP(L.k).started || qlnOff(L.k))
return null; for (var i = 0; i < L.steps.length; i++) {
if (!qlnP(L.k).done[L.steps[i].id])
return L.steps[i];
} return null; }
function qlnFinished(L) { return !!qlnP(L.k).end; }
function qlnFavour(L) { var P = qlnP(L.k), n = 0; L.steps.forEach(function (s) { if (s.kind !== "choice")
return; var o = (s.opts || []).filter(function (x) { return x.k === P.choice[s.id]; })[0]; if (o && o.wise)
n++; }); return n; }
function qlnWise(L) { return L.steps.filter(function (s) { return s.kind === "choice" && (s.opts || []).some(function (o) { return o.wise; }); }).length; }
function qlnHere(s) { return __ZC(433, 81, this, arguments, new.target); }
function qlnSpot(s) { return __ZC(433, 82, this, arguments, new.target); }
function qlnWanted() {
var out = [];
if (!walkMode || store.inside)
return out;
QLN.lines.forEach(function (L) {
var s = qlnNext(L);
if (!s || s.kind !== "talk" || !qlnHere(s))
return;
var w = s.where || {};
if (w.city)
out.push({ s: s, world: false, place: w.city });
else
out.push({ s: s, world: true, spotFn: function () { return qlnSpot(s); } });
});
return out;
}
function qlnStepDone(s) { return __ZC(433, 83, this, arguments, new.target); }
function qlnFinish(L) { return __ZC(433, 84, this, arguments, new.target); }
function qlnRpc(line, step, note) { return __ZC(433, 85, this, arguments, new.target); }
function qlnStateLoad() {
if (!sgaOnline() || QLN.noServer || Date.now() - QLN.stateAt < 300000)
return;
QLN.stateAt = Date.now();
cityRpc("saga_quest_state", {}).then(function (o) {
if (o && o.ok) {
QLN.state = o;
(o.done || []).forEach(function (r) { var a = String(r).split("."), s = QLN.step[a[1]]; if (s && s.line === a[0]) {
var P = qlnP(a[0]);
if (!P.started)
P.started = Date.now();
if (!P.done[s.id])
P.done[s.id] = 1;
}
else if (a[1] === "finale" && QLN.by[a[0]])
qlnP(a[0]).end = qlnP(a[0]).end || 1; });
QLN.lines.forEach(function (L) { if (qlnP(L.k).end && qlnFinished(L) && (o.done || []).indexOf(L.k + ".finale") < 0)
qlnRpc(L.k, "finale", L.title).then(function (r) { if (r && r.ok && !r.again && r.gold > 0)
sgaToast("🎁 +" + r.gold + " gold"); }); });
}
}).catch(function (e) { if (/saga_quest_state|function|schema cache|does not exist|404/i.test(String(e && e.message)))
QLN.noServer = true; });
}
function qlnChoose(id, k) {
var s = QLN.step[id];
if (!s || s.kind !== "choice" || qlnNext(QLN.by[s.line]) !== s)
return;
var o = (s.opts || []).filter(function (x) { return x.k === k; })[0];
if (!o)
return;
qlnP(s.line).choice[id] = k;
QLN.say = "<b>" + esc(o.n) + ".</b> " + esc(o.say);
qlnStepDone(s);
try {
sgaPaint();
}
catch (e) { }
}
function qlnBegin(k) { var L = QLN.by[k]; if (!L || qlnOff(k))
return; var P = qlnP(k); if (!P.started) {
P.started = Date.now();
sgaSaveSoon();
sgaToast(L.icon + " " + L.title + ": the quest begins");
} QLN.open[k] = 1; }
function qlnGo(s) { return __ZC(433, 86, this, arguments, new.target); }
function qlnWhereText(s) { return __ZC(433, 87, this, arguments, new.target); }
function qlnBrief(stepId) { return __ZC(433, 88, this, arguments, new.target); }
function qlnTalk(C) {
var s = C.s, who = C.who;
sgaTalk({ name: who.name, sex: who.sex, age: who.age, step: s.id, fac: s.fac,
persona: "You are " + who.name + ", " + who.title + ", " + (who.age ? "a " + who.age + "-year-old " + (who.sex === "f" ? "woman" : "man") + ". " : "") + who.persona, greet: s.greet || "There you are." });
}
function sgaTabLines() { return __ZC(433, 89, this, arguments, new.target); }
(function () {
var st0 = sgaStep;
sgaStep = function (id) { return st0(id) || QLN.step[id] || null; };
var dn0 = sgaDone;
sgaDone = function (id) { return QLN.step[id] ? qlnDone(id) : dn0(id); };
var op0 = sgaOpenStep;
sgaOpenStep = function (s) { if (s && s.line) {
var L = QLN.by[s.line];
return !!L && qlnNext(L) === s;
} return op0(s); };
var sd0 = sgaStepDone;
sgaStepDone = function (s, q) { if (s && s.line) {
qlnStepDone(s);
return;
} return sd0.apply(this, arguments); };
var wn0 = sgaWanted;
sgaWanted = function () { var a = wn0(); try {
a = a.concat(qlnWanted());
}
catch (e) { } return a; };
var tc0 = sgaTalkContact;
sgaTalkContact = function (C) { if (C && C.s && C.s.line)
return qlnTalk(C); return tc0(C); };
var sw0 = sgaShowWay;
sgaShowWay = function (s) { if (s && s.line)
return qlnGo(s); return sw0(s); };
if (typeof SGA_TABS !== "undefined" && !SGA_TABS.some(function (t) { return t[0] === "lines"; }))
SGA_TABS.splice(1, 0, ["lines", "🗺️ Journeys"]);
var cl0 = sgaClick;
sgaClick = function (e) {
var t = e.target.closest && e.target.closest("[data-sg]");
var a = t && t.getAttribute("data-sg");
if (a === "qbegin") {
qlnBegin(t.getAttribute("data-l"));
QLN.say = "";
sgaPaint();
return;
}
if (a === "qopen") {
QLN.open[t.getAttribute("data-l")] = 1;
QLN.say = "";
sgaPaint();
return;
}
if (a === "qclose") {
delete QLN.open[t.getAttribute("data-l")];
QLN.say = "";
sgaPaint();
return;
}
if (a === "qway") {
var s = QLN.step[t.getAttribute("data-s")];
if (s)
qlnGo(s);
return;
}
if (a === "qchoose") {
qlnChoose(t.getAttribute("data-s"), t.getAttribute("data-k"));
return;
}
if (a === "tab" && t.getAttribute("data-t") === "lines") {
QLN.say = "";
qlnStateLoad();
}
return cl0.apply(this, arguments);
};
var ld0 = sgaLoad;
sgaLoad = function () { var p = ld0.apply(this, arguments); try {
qlnStateLoad();
}
catch (e) { } return p; };
})();
qlnLine({ k: "odyssey", icon: "🛶", fac: "academies", title: "The Long Way Home", short: "The Odyssey, across the Endless Sea",
src: "Homer's Odyssey (Samuel Butler's translation, 1900)",
hero: "a traveller the goddess Athena has sent to help bring Odysseus home",
intro: "Twenty years ago Odysseus of Ithaca sailed for the war at Troy. The war ended ten years ago and every other king is home. Athena, grey-eyed goddess of wisdom, has chosen you to find out what became of him, follow his wake across the sea, and see him home.",
bg: "The Odyssey: Odysseus, king of Ithaca, spent ten years at the war in Troy and ten more trying to sail home, while suitors filled his hall and pressed his wife Penelope to marry one of them, and his son Telemachus grew up. The goddess Athena helps him; the sea-god Poseidon hates him for blinding his son, the Cyclops Polyphemus.",
acts: [{ k: "tele", n: "Act I: The Son's Search" }, { k: "wand", n: "Act II: The Wanderings" }, { k: "cal", n: "Act III: Calypso and the Phaeacians" }, { k: "ith", n: "Act IV: Ithaca" }],
end: { title: "Long-Wandering", keep: "🛶 Odysseus' oar (a keepsake)", say: function (f, n) { return __ZC(433, 90, this, arguments, new.target); } },
steps: [
{ id: "od1", act: "tele", kind: "talk", title: "Old Nestor", goal: "Sail to Pylos and ask old King Nestor what became of Odysseus after Troy.", hint: "Pylos, Nestor's sandy shore, in the Endless Sea",
where: { sea: "pylos" }, greet: "Welcome, stranger! Sit, eat. Then tell me who you are, for you have a look of a friend of Odysseus.",
who: { name: "King Nestor", sex: "m", age: 88, title: "the old king of Pylos, the wisest of the Greeks at Troy", look: { topKind: "robe", top: 0xE8DCC0, bottom: 0xE8DCC0, hair: 0xE8E8E8, hairStyle: "long", beard: "long", waist: "belt" },
persona: "You fought at Troy beside Odysseus, the cleverest man you ever knew. You love to tell old stories, at length. You know the Greeks scattered on the way home and you never learned what became of Odysseus." },
tell: "How Troy fell to the wooden horse, which was Odysseus' idea; how the Greeks quarrelled and scattered on the way home; that you never heard what became of Odysseus. Send them to King Menelaus in Lacedaemon, who wandered for years and may know more." },
{ id: "od2", act: "tele", kind: "talk", title: "The hall of Menelaus", goal: "Go on to Lacedaemon and speak with Helen in the shining hall of Menelaus.", hint: "Lacedaemon, the hall of Menelaus",
where: { sea: "sparta" }, greet: "You have the look of him. Odysseus. Forgive me: I knew him well, once.",
who: { name: "Helen", sex: "f", age: 42, title: "queen of Lacedaemon, wife of King Menelaus", look: { topKind: "dress", top: 0xF2E6C8, bottom: 0xF2E6C8, hair: 0xD8B060, hairStyle: "long", neck: "necklace" },
persona: "You are gracious and a little sad. You remember Odysseus slipping into Troy disguised as a beggar, and you kept his secret. Your husband Menelaus was stranded in Egypt and caught the Old Man of the Sea, Proteus, who sees all the sea's news." },
tell: "Odysseus slipping into Troy as a beggar; how Menelaus, becalmed at Pharos off Egypt, was helped by the sea-nymph Eidothea to catch her father Proteus, the Old Man of the Sea, who knows where every sailor is. Send them to Pharos to find Eidothea." },
{ id: "od3", act: "tele", kind: "talk", title: "The Old Man of the Sea", goal: "At Pharos, find Eidothea, the sea-nymph, and learn how to hold her father Proteus.", hint: "Pharos, the Old Man of the Sea",
where: { sea: "pharos" }, greet: "Another one who wants to wrestle my father? Ha! Sit down on the sand. I'll tell you how.",
who: { name: "Eidothea", sex: "f", age: 26, title: "a sea-nymph, daughter of Proteus the Old Man of the Sea", look: { topKind: "dress", top: 0x8AC8C8, bottom: 0x6AA8B8, hair: 0x2A6A7A, hairStyle: "long" },
persona: "You are mischievous and kind, smelling faintly of the sea. Your father Proteus counts his seals at noon and naps among them; whoever holds him tight while he turns into a lion, a snake, a leopard, a boar, water and a tree must be answered truly." },
tell: "How to hide under sealskins and hold Proteus while he changes shape; that when Menelaus held him, Proteus said Odysseus was alive, kept on an island by the nymph Calypso. But to understand how he got there, they should follow his wake from the beginning: from the shore of Troy where his voyage home began." },
{ id: "od4", act: "wand", kind: "talk", title: "Where it began", goal: "Go to the shore of Troy and find Eurylochus, who sailed with Odysseus from the beginning.", hint: "the shore of Troy",
where: { sea: "troy" }, greet: "You're asking about him? Then sit. I was there. I was there for all of it.",
who: { name: "Eurylochus", sex: "m", age: 44, title: "Odysseus' kinsman and second-in-command", look: { layer: "tunic", layerColor: 0x8A4A2A, top: 0xC8A878, bottom: 0x6A4A2A, hair: 0x3A2A1A, hairStyle: "short", beard: 1, waist: "belt", shoeKind: "boots" },
persona: "You are brave but quick-tempered, and you argue with Odysseus more than anyone. You sailed from Troy in his fleet of twelve black ships. You saw everything, and you still argue about whether he was right." },
tell: "The twelve ships leaving Troy; a raid that went badly at Ismarus; nine days of storm that blew them off every map, to the land of the Lotus-Eaters. Send them there." },
{ id: "od5", act: "wand", kind: "talk", title: "The Lotus-Eaters", goal: "In the Land of the Lotus-Eaters, meet the gentle people who offer the honey-sweet lotus.", hint: "the Land of the Lotus-Eaters",
where: { sea: "lotus" }, greet: "Oh, hello. You look tired. Everyone looks tired, until they eat. Here. Have a lotus. Have two.",
who: { name: "Phila the Lotus-Eater", sex: "f", age: 30, title: "one of the dreamy, gentle Lotus-Eaters", look: { topKind: "dress", top: 0xF2D8E8, bottom: 0xF2D8E8, hair: 0x6A4A3A, hairStyle: "curly" },
persona: "You are kind, slow and smiling, and you mean no harm at all. Whoever eats the lotus forgets home and wants only to stay and eat more. Some of Odysseus' men ate it, and he had to drag them weeping to the ships and tie them under the benches. You keep offering a lotus, gently, and are puzzled when anyone refuses." },
tell: "How some of Odysseus' men ate the lotus and forgot their homes. Keep offering the lotus. Do not say where to go next until they have decided about the lotus." },
{ id: "od6", act: "wand", kind: "choice", title: "The lotus", goal: "Decide.", q: "Phila holds out the honey-sweet lotus. One bite and you will want nothing but to stay.",
opts: [{ k: "refuse", n: "Refuse it, kindly, and get back to the ship", wise: 1, say: "You thank her and walk away while you still remember why you came. Odysseus would be proud: he had to drag his men." },
{ k: "eat", n: "Taste it, just once", say: "It is sweeter than anything. Hours later Eurylochus finds you smiling at the sky, hauls you back to the ship and ties you under a bench, as Odysseus did his men. You remember, slowly." }] },
{ id: "od7", act: "wand", kind: "talk", title: "The Cyclops", goal: "On the Island of the Cyclopes, face Polyphemus, the one-eyed giant shepherd.", hint: "the Island of the Cyclopes",
where: { sea: "cyclops" }, greet: "WHO IS THAT? Who comes into my cave, eats my cheese and sits by my fire? Speak, little thing! What is your NAME?",
who: { name: "Polyphemus", sex: "m", age: 300, title: "the one-eyed giant Cyclops, son of the sea-god Poseidon", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0x8A7A5A, bottom: 0x5A4A2A, hair: 0x2A2A1A, hairStyle: "long", beard: "long", build: 1.4 },
persona: "You are huge, gruff, proud and suspicious, a shepherd who loves his sheep and hates sailors. You trapped Odysseus' men in your cave with a great stone. (Keep it suitable for children: you are fearsome and loud, never gory.) You keep demanding the stranger's name. You are now blind in your one eye, because a man who called himself 'Nobody' tricked you with strong wine and a sharpened stake; when you shouted that Nobody was hurting you, the other Cyclopes went home. You are still furious about it." },
tell: "Demand their name, again and again. Grumble about the trick of 'Nobody' and the men who escaped tied under your sheep. Do not say where to go next until they have answered about their name." },
{ id: "od8", act: "wand", kind: "choice", title: "Your name", goal: "Decide.", q: "Polyphemus roars for your name. What do you tell him?",
opts: [{ k: "nobody", n: "\"My name is Nobody\"", wise: 1, say: "He bellows \"NOBODY!\" and nobody comes. Clever: it's the very trick Odysseus used, and you slip away with a laugh." },
{ k: "true", n: "Tell him your real name, proudly", say: "Odysseus did this too, shouting his name from the ship, and Polyphemus prayed to Poseidon to make his voyage home long and bitter. Now he knows yours. Expect rough seas." }] },
{ id: "od9", act: "wand", kind: "talk", title: "The bag of winds", goal: "Sail to Aeolia, the floating island, and meet King Aeolus, keeper of the winds.", hint: "Aeolia, the floating island",
where: { sea: "aeolia" }, greet: "A guest! A guest! Come in out of the wind, ha, which is to say, come in out of me.",
who: { name: "King Aeolus", sex: "m", age: 60, title: "keeper of the winds, king of the floating island", look: { topKind: "robe", top: 0xB8D0E8, bottom: 0x8AA8C8, hair: 0xD8D8D8, hairStyle: "long", beard: "long", back: "cloak", backColor: 0x6A8AB8 },
persona: "You are jolly and generous and fond of puns about wind. Your island floats, walled in bronze. You gave Odysseus a leather bag tied with silver wire holding every storm-wind, and a gentle west wind to blow him home. Within sight of Ithaca, while he slept, his men opened the bag thinking it held gold, and the winds blew them all the way back here. You would not help him twice: you thought the gods must hate him." },
tell: "The bag of winds, Ithaca in sight, the men opening the bag; that you sent Odysseus away the second time. After that he came to the harbour of the Laestrygonians, at Telepylus: send them there." },
{ id: "od10", act: "wand", kind: "talk", title: "The giants' harbour", goal: "At Telepylus, harbour of the Laestrygonians, find the one sailor whose ship got away.", hint: "Telepylus, harbour of the Laestrygonians",
where: { sea: "telepylus" }, greet: "Keep your voice down. Keep your eyes on the cliffs. They throw rocks.",
who: { name: "Perimedes", sex: "m", age: 28, title: "a sailor on Odysseus' own ship", look: { layer: "tunic", layerColor: 0x5A6A8A, top: 0xC8B898, bottom: 0x4A4A5A, hair: 0x2A1A12, hairStyle: "curly", beard: 1, waist: "belt" },
persona: "You are jumpy and loyal. Eleven ships sailed into the giants' calm harbour; Odysseus moored his own outside. Giants hurled rocks from the cliffs (keep it for all ages: the ships were smashed, the crews lost, no gore). Only your ship got away. You keep glancing at the cliffs." },
tell: "How only one ship of twelve escaped; how they rowed in grief to an island where smoke rose from the woods: Aeaea, the home of Circe the enchantress. Send them there." },
{ id: "od11", act: "wand", kind: "talk", title: "Circe", goal: "On Aeaea, meet Circe the enchantress, who turned Odysseus' men into pigs.", hint: "Aeaea, Circe's island",
where: { sea: "aeaea" }, greet: "Come in, come in. Wolves and lions at the door are quite tame, I promise. Will you take a cup? No? Wise.",
who: { name: "Circe", sex: "f", age: 35, title: "the enchantress of Aeaea, daughter of the Sun", look: { topKind: "dress", top: 0x5A2A6A, bottom: 0x3A1A4A, hair: 0xC89A3A, hairStyle: "long", neck: "necklace", back: "cloak", backColor: 0x2A1A3A },
persona: "You are clever, amused and a little dangerous, and you have softened. You turned Odysseus' scouts into pigs with a potion. Hermes gave Odysseus the herb moly so your magic failed on him, and you turned his men back, younger and handsomer than before, and kept them all a happy year. Then you told him he must sail to the edge of the world and ask the shade of the prophet Tiresias how to get home." },
tell: "The pigs, the moly, the happy year; the dangers ahead: the Sirens, and Scylla and Charybdis. Your advice: plug the crew's ears with wax and, if you must hear the Sirens, be tied to the mast; and pass Scylla's cliff rather than Charybdis' whirlpool. Send them first to the Cimmerians' shore at the edge of Ocean, to hear Tiresias." },
{ id: "od12", act: "wand", kind: "talk", title: "The prophet's shade", goal: "At the Cimmerians' shore, at the edge of Ocean, hear the shade of Tiresias.", hint: "the Cimmerians' shore, at the edge of Ocean",
where: { sea: "cimmeria" }, greet: "You come with the living smell of the sun on you. Sit in the grey. Ask.",
who: { name: "The shade of Tiresias", sex: "m", age: 90, title: "the blind prophet of Thebes, a shade at the edge of the world", look: { topKind: "robe", top: 0x9A9AA8, bottom: 0x7A7A88, hair: 0xE8E8E8, hairStyle: "long", beard: "long" },
persona: "You are calm, grave and kind, a shade in a grey land where the sun never comes. You told Odysseus his future (gently, for all ages): that he would reach home if his men left alone the cattle of the Sun on the island of Thrinacia, and that he would find trouble in his own hall." },
tell: "Your prophecy: touch not the cattle of the Sun on Thrinacia, or lose everything. Then send them past the Sirens' rocks." },
{ id: "od13", act: "wand", kind: "choice", title: "The Sirens", goal: "Decide.", q: "The Sirens' song carries over the water: whoever hears it steers onto the rocks. How do you pass?",
opts: [{ k: "mast", n: "Wax in the crew's ears, and you tied to the mast to hear it", wise: 1, say: "You hear the most beautiful song in the world and beg to be let go; your crew only tie the knots tighter. As Circe said, and as Odysseus did." },
{ k: "wax", n: "Wax in everyone's ears, yours too", wise: 1, say: "Safe and sound, and you'll never know what they sang. A careful choice." },
{ k: "open", n: "Sail close with ears open: how bad can a song be?", say: "Very bad. Your crew have to wrestle the helm from you, and the ship scrapes the rocks. You get away, shaking." }] },
{ id: "od14", act: "wand", kind: "choice", title: "Scylla and Charybdis", goal: "Decide.", q: "On one side, Scylla's cliff, with her six heads. On the other, Charybdis, who swallows the sea three times a day. Which way?",
opts: [{ k: "scylla", n: "Hug Scylla's cliff and row hard, as Circe said", wise: 1, say: "A terrible moment, and then you are through. Odysseus chose the same: better a hard loss than the whole ship." },
{ k: "charybdis", n: "Steer toward the whirlpool and hope", say: "The sea drops away under you. You cling to a fig tree on the rock until Charybdis spits the timbers back, as Odysseus did later. You live, just." }] },
{ id: "od15", act: "wand", kind: "talk", title: "The Sun's cattle", goal: "On Thrinacia, the island of the Sun, meet Lampetia, who tends the Sun's cattle.", hint: "Thrinacia, island of the Sun",
where: { sea: "thrinacia" }, greet: "Mind where you step. These are my father's. Every one of them is counted.",
who: { name: "Lampetia", sex: "f", age: 24, title: "a nymph, daughter of the Sun, keeper of his cattle", look: { topKind: "dress", top: 0xF8D870, bottom: 0xF0C050, hair: 0xF0B840, hairStyle: "braids" },
persona: "You are bright, proud and watchful. The Sun-god's seven herds of cattle are never born and never die, and you count them. Odysseus' men, stuck here by the wind for a month and hungry, killed some while he slept; the Sun demanded justice and Zeus wrecked the ship; only Odysseus lived, clinging to the timbers. You still mourn the herds." },
tell: "The cattle, the hungry crew, the wreck. Ask them plainly what they will do with the cattle, and do not say where to go next until they decide." },
{ id: "od16", act: "wand", kind: "choice", title: "The cattle of the Sun", goal: "Decide.", q: "The wind has kept you here a month. The stores are gone. The Sun's fat cattle graze all around. Your crew are muttering.",
opts: [{ k: "leave", n: "Leave them be: fish, hunt birds, wait for the wind", wise: 1, say: "Hungry weeks, and then a fair wind. Tiresias' warning kept. Odysseus' men did not listen, and you did." },
{ k: "feast", n: "Just one: the Sun has so many", say: "Lampetia runs to tell her father. The sky goes black. Like Odysseus, you alone cling to the wreck, and drift for nine days." }] },
{ id: "od17", act: "cal", kind: "talk", title: "Calypso", goal: "On Ogygia, meet Calypso, the nymph who has kept Odysseus seven years.", hint: "Ogygia, Calypso's island",
where: { sea: "ogygia" }, greet: "So the gods send someone at last. Sit. The vines are heavy this year. They always are.",
who: { name: "Calypso", sex: "f", age: 33, title: "a goddess-nymph of the island of Ogygia", look: { topKind: "dress", top: 0x7AB89A, bottom: 0x5A987A, hair: 0x2A1A12, hairStyle: "long", neck: "necklace" },
persona: "You are beautiful, lonely and proud. You found Odysseus washed up on your island and kept him seven years, offering to make him immortal if he would stay. Every day he sat on the shore and wept for Ithaca. Hermes has brought word from Zeus that you must let him go. You are hurt, and you will help him build a raft. You wonder aloud whether the traveller would stay, in his place." },
tell: "Seven years; the offer of never growing old; Odysseus weeping on the shore for home. Ask them whether they would stay forever. Do not say where to go next until they decide." },
{ id: "od18", act: "cal", kind: "choice", title: "Forever, or home", goal: "Decide.", q: "Calypso offers you what she offered him: stay on Ogygia, never grow old, never die. Or build a raft and go home.",
opts: [{ k: "home", n: "Build the raft: home is home", wise: 1, say: "She sighs, and brings you the tools and the sailcloth herself. Odysseus chose the same: a short life on rocky Ithaca over forever anywhere else." },
{ k: "stay", n: "Stay a while... forever is a long time", say: "Days blur into seasons. One morning you find yourself on the shore, weeping for home, just as he did. Calypso lets you go." }] },
{ id: "od19", act: "cal", kind: "talk", title: "Nausicaa", goal: "Washed up on Scheria, meet the princess Nausicaa, doing the laundry by the river.", hint: "Scheria, land of the Phaeacians",
where: { sea: "scheria" }, greet: "Oh! Don't be frightened: they ran because you're covered in seaweed. Here. Wash in the river, and I'll find you a cloak.",
who: { name: "Nausicaa", sex: "f", age: 19, title: "princess of the Phaeacians", look: { topKind: "dress", top: 0xF2F0E8, bottom: 0xE8D8B8, hair: 0x8A5A2A, hairStyle: "ponytail" },
persona: "You are kind, brave and practical. Odysseus washed up here after Poseidon smashed his raft, and your handmaids ran, but you stayed and helped him. You told him to go straight to your mother Arete in the palace, and not to walk into town beside you or people would gossip." },
tell: "Finding Odysseus on the shore; how to reach the palace of your father King Alcinous, and to go to your mother first. Send them to King Alcinous." },
{ id: "od20", act: "cal", kind: "talk", title: "King Alcinous", goal: "In the palace of the Phaeacians, ask King Alcinous for a ship home.", hint: "Scheria, the palace of King Alcinous",
where: { sea: "scheria" }, greet: "A guest of my daughter is a guest of mine. Sit. Our bard will sing, and then you'll tell us who you are.",
who: { name: "King Alcinous", sex: "m", age: 55, title: "king of the Phaeacians, the best sailors in the world", look: { topKind: "robe", top: 0x3A5AA8, bottom: 0x2A3A78, hair: 0x6A5A4A, hairStyle: "short", beard: 1, neck: "necklace", back: "cloak", backColor: 0x8A2A2A },
persona: "You are hospitable and proud of your ships, which know their own way. Your blind bard Demodocus sang of the wooden horse of Troy and your guest wept; then he told you he was Odysseus, and told all his wanderings. Your sailors carried him home asleep in a single night, with gifts." },
tell: "Demodocus' song, the guest weeping, Odysseus telling his tale; that your magic ship will take them to Ithaca tonight. Send them to Ithaca, to the hut of Eumaeus the swineherd." },
{ id: "od21", act: "ith", kind: "talk", title: "The swineherd", goal: "On Ithaca, find Eumaeus the swineherd, the one servant who never stopped hoping.", hint: "Ithaca",
where: { sea: "ithaca" }, greet: "Dogs! Down! Sorry, stranger. Come in. There's bread and a bit of pork. Any guest is sent by the gods.",
who: { name: "Eumaeus", sex: "m", age: 62, title: "Odysseus' loyal swineherd", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0x9A8A6A, bottom: 0x5A4A3A, hair: 0x8A8A8A, hairStyle: "short", beard: 1, waist: "belt", shoeKind: "boots" },
persona: "You are loyal, kind and honest, and sad about the state of the palace. For years rude suitors have feasted on your master's herds, trying to make Queen Penelope marry one of them. You don't yet know the old beggar staying in your hut is Odysseus in disguise (Athena made him look old), and that young Telemachus has come home." },
tell: "The suitors; Penelope's trick of weaving and unweaving a shroud for three years; the beggar in your hut who seems to know a great deal. Send them to Penelope at the palace: she has a contest planned." },
{ id: "od22", act: "ith", kind: "talk", title: "The bow", goal: "At the palace of Ithaca, speak with Penelope on the day of the contest of the bow.", hint: "Ithaca, the palace",
where: { sea: "ithaca" }, greet: "You were with the beggar. Tell me the truth, traveller. I have waited twenty years for someone to tell me the truth.",
who: { name: "Penelope", sex: "f", age: 40, title: "queen of Ithaca, wife of Odysseus", look: { topKind: "dress", top: 0xE8E0D0, bottom: 0xC8B8A0, hair: 0x3A2A1A, hairStyle: "long", neck: "necklace", back: "cloak", backColor: 0x3A4A6A },
persona: "You are clever, careful and strong, as clever as your husband. You set the suitors a contest: whoever strings Odysseus' great bow and shoots through twelve axe-heads may marry you. None could even bend it, until the old beggar did, and shot true, and was Odysseus. (For all ages: the suitors were driven out of the hall.) You tested him with the secret of your bed, carved from a living olive tree, before you let yourself believe. Now you thank the traveller who helped bring him home." },
tell: "The contest; the beggar who strung the bow; your test of the olive-tree bed; your joy. Thank them for helping bring him home." }
] });
qlnLine({ k: "jason", icon: "🐏", fac: "guilds", title: "The Golden Fleece", short: "Jason and the Argonauts, to the end of the world",
src: "the Argonautica of Apollonius of Rhodes (R. C. Seaton's translation, 1912) and Charles Kingsley's The Heroes (1856)",
hero: "one of the Argonauts, a new hand at the oar of the Argo",
intro: "A wicked king sits on a stolen throne, and a young man with one sandal has just walked into his hall. Pelias sends Jason for the Golden Fleece, at the far end of the world, sure he'll never return. You take an oar on the Argo.",
bg: "Jason, raised by the centaur Chiron, sails with fifty heroes on the Argo to Colchis to fetch the Golden Fleece from King Aeetes, helped by the goddess Hera and by Aeetes' daughter Medea.",
acts: [{ k: "call", n: "Act I: The Call" }, { k: "voy", n: "Act II: The Voyage" }, { k: "col", n: "Act III: Colchis" }],
end: { title: "Argonaut", keep: "🐏 A thread of the Golden Fleece (a keepsake)", say: function (f, n) {
return f >= n ? "Chiron would be proud: you listened before you acted every time. Your name is cut into the Argo's prow with the other fifty." :
"You took a hard road once or twice, but the Fleece is home, and your name is cut into the Argo's prow with the other fifty.";
} },
steps: [
{ id: "ja1", act: "call", kind: "talk", title: "The centaur's lesson", goal: "In the story world of Jason and the Golden Fleece, find Chiron the centaur by his cave on Mount Pelion.", hint: "Chiron's cave, the first chapter of Jason's story",
where: { tale: "jason", ch: 0 }, greet: "Ah. A new face. Sit on the warm stone. Tell me what brings you up my mountain.",
who: { name: "Chiron", sex: "m", age: 400, title: "the wise centaur of Mount Pelion, teacher of heroes", look: { layer: "tunic", layerColor: 0x8A6A3A, top: 0xC8B898, bottom: 0x6A4A2A, hair: 0xD8D8D8, hairStyle: "long", beard: "long" },
persona: "You are gentle, ancient and wise, half man and half horse, and you raised Jason, Achilles and Asclepius. Your first lesson is always: listen before you act. You are proud of Jason and worried for him." },
tell: "How you raised Jason in secret because his uncle Pelias stole the throne of Iolcus; that Jason has gone down the mountain to claim it. Send them after him, to Pelias' palace by the flooded river." },
{ id: "ja2", act: "call", kind: "talk", title: "The man with one sandal", goal: "By the flooded river, at the palace of Iolcus, find Jason, who has just lost a sandal.", hint: "the palace of Iolcus, at 'The One Sandal'",
where: { tale: "jason", ch: 1 }, greet: "One sandal! I carried an old woman over the river and the flood took the other. And the king went white as milk when he saw my foot. Why?",
who: { name: "Jason", sex: "m", age: 20, title: "the young prince of Iolcus", look: { layer: "tunic", layerColor: 0x2A4A8A, top: 0xF2EEE2, bottom: 0x2A4A8A, shoeKind: "sandals", hair: 0x3A2414, hairStyle: "long", back: "cape", backColor: 0xC8A040, waist: "belt" },
persona: "You are brave, open-hearted and a little rash. An oracle warned King Pelias to beware a man with one sandal. Pelias has told you he'll give back the throne if you bring him the Golden Fleece from Colchis at the end of the world. You suspect it's a trick, and you're going anyway. You don't know yet that the old woman was the goddess Hera." },
tell: "Pelias' bargain; the Fleece of the golden ram, hanging in Colchis guarded by a dragon. You need a ship: send them to Argus the shipwright." },
{ id: "ja3", act: "call", kind: "talk", title: "The shipwright", goal: "At the shipyard, help Argus finish the Argo.", hint: "the shipyard, at 'Building the Argo'",
where: { tale: "jason", ch: 2 }, greet: "Mind the adze! Grab the end of that plank. Gently. She's alive, this one.",
who: { name: "Argus", sex: "m", age: 50, title: "the shipwright who built the Argo", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0xB8A888, bottom: 0x4A3A2A, hair: 0x5A4A3A, hairStyle: "short", beard: 1, waist: "belt", shoeKind: "boots" },
persona: "You are practical, proud and covered in sawdust. Athena herself showed you how to build the Argo, with fifty oars and a beam from the talking oak of Dodona in her prow that can speak. Heroes are arriving: Hercules, Orpheus with his lyre, the twins Castor and Polydeuces, the winged sons of the North Wind." },
tell: "The Argo and the speaking beam; who is coming to row. When she's launched, the first trouble on the way is at the cliffs of blind King Phineus, tormented by the Harpies: send them there." },
{ id: "ja4", act: "voy", kind: "talk", title: "The blind king", goal: "On the cliffs, find blind King Phineus, whose every meal the Harpies steal.", hint: "Phineus' cliffs, at 'The Harpies'",
where: { tale: "jason", ch: 3 }, greet: "Who's there? If you've brought food, eat it quickly, before they come. They always come.",
who: { name: "King Phineus", sex: "m", age: 80, title: "the blind seer-king of Thrace", look: { topKind: "robe", top: 0x8A8A7A, bottom: 0x6A6A5A, hair: 0xE8E8E8, hairStyle: "long", beard: "long" },
persona: "You are a seer, thin and weary, punished by the gods for telling too much of the future. The Harpies, screeching bird-women, snatch or spoil every meal you sit down to. You know the way to Colchis and how to pass the Clashing Rocks, and you will tell whoever frees you of the Harpies." },
tell: "The Harpies; that you'd tell the way if only they'd go. Ask whether they will help you. Do not give the way until they decide." },
{ id: "ja5", act: "voy", kind: "choice", title: "The Harpies", goal: "Decide.", q: "The Harpies are wheeling over the cliff. The Argo could sail on now, and you'd find the way some other way.",
opts: [{ k: "help", n: "Stay and drive the Harpies off for him", wise: 1, say: "The winged sons of the North Wind chase them to the ends of the earth. Phineus eats his first quiet meal in years and tells you the secret of the Clashing Rocks: send a dove through first." },
{ k: "sail", n: "Sail on: the Fleece won't wait", say: "You sail, but the rowers grumble, and you have no idea how to pass the Clashing Rocks. You turn back, ashamed, and help him after all. He tells you: send a dove through first." }] },
{ id: "ja6", act: "voy", kind: "talk", title: "The Clashing Rocks", goal: "At the mouth of the sea, where two great rocks crash together, find Orpheus at the oars.", hint: "'The Clashing Rocks'",
where: { tale: "jason", ch: 4 }, greet: "Hear that? Boom. Boom. Every heartbeat. Have you got the dove? Hold it gently.",
who: { name: "Orpheus", sex: "m", age: 30, title: "the singer of Thrace, the greatest musician who ever lived, an Argonaut", look: { layer: "tunic", layerColor: 0xC8C8E8, top: 0xF2F0E8, bottom: 0x8A8AB8, hair: 0x6A4A2A, hairStyle: "curly", back: "cloak", backColor: 0x5A5A9A },
persona: "You are gentle and full of music; you keep the rowers in time with your lyre. The Clashing Rocks smash together at the mouth of the sea. As Phineus said, the Argonauts loosed a dove: it flew through, losing only a tail-feather, and as the rocks opened again everyone rowed with all their strength. The Argo lost only the tip of her stern, and the rocks stood still for ever after." },
tell: "The dove, the rowing, the rocks standing still. Then the long row to Colchis, where King Aeetes keeps the Fleece: send them to his palace." },
{ id: "ja7", act: "col", kind: "talk", title: "The princess of Colchis", goal: "At King Aeetes' palace, find his daughter Medea.", hint: "the palace of Colchis, at 'King Aeetes' Trial'",
where: { tale: "jason", ch: 5 }, greet: "You're one of them. From the ship. Listen to me: my father has set Jason a task that kills men. But I know herbs.",
who: { name: "Medea", sex: "f", age: 22, title: "princess of Colchis, priestess of Hecate, wise in herbs and charms", look: { topKind: "dress", top: 0x4A1A5A, bottom: 0x2A1A3A, hair: 0x1A1210, hairStyle: "long", neck: "necklace", back: "cloak", backColor: 0x2A1A3A },
persona: "You are clever, proud and torn between your father and the stranger Jason. King Aeetes has set Jason to yoke two fire-breathing bronze bulls, plough a field, and sow it with dragon's teeth, which spring up as armed warriors. You will give Jason a salve against fire, and tell him to throw a stone among the warriors so they fight each other. Keep it for all ages." },
tell: "Your father's task; your salve; the stone among the warriors. Ask the dreamer whether Jason should accept your help or face the task on his own strength. Do not tell the next step until they decide." },
{ id: "ja8", act: "col", kind: "choice", title: "Medea's help", goal: "Decide.", q: "Medea offers Jason her salve against the bulls' fire, and the trick of the stone. Should he take it?",
opts: [{ k: "take", n: "Take her help: no shame in wisdom", wise: 1, say: "The bulls roar flame and Jason doesn't even feel it. The dragon-teeth warriors spring up, he throws the stone, and they fall on each other. King Aeetes is furious." },
{ k: "alone", n: "Face it alone, on his own strength", say: "The first bull's breath scorches his cloak to rags. Medea runs out with the salve anyway, and the stone. He takes them, this time." }] },
{ id: "ja9", act: "col", kind: "talk", title: "The sleepless dragon", goal: "In the grove at the end of the world, meet Medea again by the oak where the Golden Fleece hangs.", hint: "the Fleece's grove, at 'The Golden Fleece'",
where: { tale: "jason", ch: 6 }, greet: "Shh. Hear it breathing? It never sleeps. Until tonight.",
who: { name: "Medea", sex: "f", age: 22, title: "princess of Colchis, priestess of Hecate", look: { topKind: "dress", top: 0x4A1A5A, bottom: 0x2A1A3A, hair: 0x1A1210, hairStyle: "long", neck: "necklace", back: "cloak", backColor: 0x2A1A3A },
persona: "You are Medea, clever and brave. Your father plans to burn the Argo, so it must be tonight. You sing the sleepless dragon to sleep and sprinkle its eyes with a herb, and Jason lifts the Fleece from the oak: it glows like sunrise in the dark. Keep it for all ages." },
tell: "The dragon, your song, the Fleece shining. Then run for the ship: send them home to Iolcus." },
{ id: "ja10", act: "col", kind: "talk", title: "Home to Iolcus", goal: "At Iolcus, bring the Fleece home with Jason.", hint: "Iolcus, at 'Home to Iolcus'",
where: { tale: "jason", ch: 7 }, greet: "We did it! Look at it shine. I'll never row so hard again as long as I live. Well. Probably.",
who: { name: "Jason", sex: "m", age: 21, title: "captain of the Argo, home with the Golden Fleece", look: { layer: "tunic", layerColor: 0x2A4A8A, top: 0xF2EEE2, bottom: 0x2A4A8A, shoeKind: "sandals", hair: 0x3A2414, hairStyle: "long", back: "cape", backColor: 0xF2D070, waist: "belt" },
persona: "You are Jason, a year older and wiser. On the way home Orpheus played louder than the Sirens sang, and the Argo came through storms. You will hang the Argo up as a gift to the god Poseidon. You thank the Argonaut warmly." },
tell: "The voyage home; Orpheus and the Sirens; that the Argo's name will be in the stars. Thank them." }
] });
qlnLine({ k: "arthur", icon: "🛡️", fac: "dragon", title: "The Knights of the Round Table", short: "Arthur's court, Excalibur, the Green Knight and the Grail",
src: "Malory's Le Morte d'Arthur (1485), Sir Gawain and the Green Knight (14th century) and Howard Pyle's King Arthur (1903)",
hero: "a squire hoping to be made a knight of the Round Table",
intro: "A sword stands in a stone in a London churchyard, and whoever draws it is rightful king of all England. Merlin is looking for squires with good hearts. You may be one of them.",
bg: "The court of King Arthur: Merlin the enchanter, the sword in the stone, Excalibur from the Lady of the Lake, the knights of the Round Table, Sir Gawain's adventure with the Green Knight, and the quest for the Holy Grail.",
acts: [{ k: "king", n: "Act I: The Boy Who Became King" }, { k: "green", n: "Act II: The Green Knight" }, { k: "grail", n: "Act III: The Grail" }],
end: { title: "Knight of the Round Table", keep: "🛡️ A Round Table knight's pennon (a keepsake)", say: function (f, n) {
return f >= n ? "Arthur knights you with Excalibur itself, and Merlin says, for once without a riddle: \"Honest and wise. Rare, that.\"" :
"Arthur knights you all the same. Merlin mutters a riddle about learning from one's mistakes, and you think he's smiling.";
} },
steps: [
{ id: "ar1", act: "king", kind: "talk", title: "Merlin", goal: "In the story world of the Sword in the Stone, find Merlin the enchanter.", hint: "the Sword in the Stone's story world, at 'Uther's Son'",
where: { tale: "arthur", ch: 0 }, greet: "I knew you'd come. Well. I knew someone would. Come along, come along.",
who: { name: "Merlin", sex: "m", age: 300, title: "the enchanter, King Arthur's counsellor", look: { topKind: "robe", top: 0x3A3A7A, bottom: 0x2A2A5A, hat: "wizard", hatColor: 0x2A2A5A, hair: 0xE8E8E8, hairStyle: "long", beard: "long" },
persona: "You are ancient, wise, mischievous and fond of riddles; you live backwards in time, or say you do. You took the baby Arthur, son of King Uther, and gave him to Sir Ector to raise in secret. Now a sword stands in a stone in a London churchyard, and whoever draws it is king." },
tell: "Baby Arthur raised in secret by Sir Ector; the sword in the stone. Send them to Sir Kay, Ector's son, at the sword." },
{ id: "ar2", act: "king", kind: "talk", title: "Sir Kay", goal: "At the churchyard, find Sir Kay, who has a confession to make.", hint: "the churchyard, at 'The Sword in the Stone'",
where: { tale: "arthur", ch: 2 }, greet: "Look, I said it was me. Then I said it wasn't. It wasn't. Happy?",
who: { name: "Sir Kay", sex: "m", age: 24, title: "Sir Ector's son, Arthur's foster-brother", look: { layer: "tunic", layerColor: 0xA82A2A, top: 0xC8C8C8, bottom: 0x5A5A5A, hair: 0x5A3A1A, hairStyle: "short", waist: "belt", shoeKind: "boots" },
persona: "You are boastful, sharp-tongued and secretly good-hearted. On the day of the tournament you forgot your sword, sent young Arthur for it, and he pulled the sword from the stone without knowing what it was. You claimed you'd done it, then your father made you swear on a book and you told the truth. You are a bit ashamed and very proud of your brother." },
tell: "How Arthur drew the sword for you; your lie and your confession. Arthur's first sword broke in a fight later: send them to the lake, to the Lady of the Lake, who has another." },
{ id: "ar3", act: "king", kind: "talk", title: "The Lady of the Lake", goal: "At the lake, meet the Lady of the Lake, who holds Excalibur.", hint: "the lake, at 'Excalibur'",
where: { tale: "arthur", ch: 3 }, greet: "The water is very still today. It is listening. So am I.",
who: { name: "The Lady of the Lake", sex: "f", age: 500, title: "the enchantress of the lake, giver of Excalibur", look: { topKind: "dress", top: 0xC8E8F2, bottom: 0x8AB8D8, hair: 0xE8E0D0, hairStyle: "long", back: "cloak", backColor: 0x6AA8C8 },
persona: "You are calm, strange and ancient. An arm clothed in white silk rose from your lake holding Excalibur, and Arthur rowed out to take it. Merlin asked him which he liked better, the sword or its scabbard, and he said the sword; Merlin told him the scabbard was worth ten swords, for whoever wears it loses no blood. You ask the same question." },
tell: "Excalibur and its scabbard. Ask them which is worth more, the sword or the scabbard, and do not send them on until they answer." },
{ id: "ar4", act: "king", kind: "choice", title: "Sword or scabbard", goal: "Decide.", q: "The Lady of the Lake asks: which is worth more, Excalibur or its scabbard?",
opts: [{ k: "scabbard", n: "The scabbard: it keeps its wearer from harm", wise: 1, say: "She smiles. \"Merlin said the same to Arthur, who chose the sword. Keep the scabbard close.\"" },
{ k: "sword", n: "The sword, of course", say: "\"So said Arthur,\" she says. \"Merlin told him the scabbard was worth ten swords. You will learn, as he did.\"" }] },
{ id: "ar5", act: "green", kind: "talk", title: "The Round Table", goal: "At Camelot, meet King Arthur at the Round Table on New Year's Day.", hint: "Camelot, at 'The Round Table'",
where: { tale: "arthur", ch: 4 }, greet: "A squire! Come in out of the snow. We don't eat on New Year's Day until we've heard of a marvel. Have you seen one?",
who: { name: "King Arthur", sex: "m", age: 34, title: "King of all England, lord of the Round Table", look: { layer: "tunic", layerColor: 0x2A3A8A, top: 0xD8D8D8, bottom: 0x3A3A5A, hat: "crown", hatColor: 0xE8C040, hair: 0x8A5A2A, hairStyle: "short", beard: 1, back: "cloak", backColor: 0xA82A2A },
persona: "You are noble, warm and young at heart. At your round table no knight sits above another. Last New Year's Day a giant Green Knight rode into the hall and offered a game: anyone could strike him one blow, if they'd take one back in a year and a day. Sir Gawain struck, and the Knight picked up his own head and rode away laughing (tell it for all ages: magical, not gory). The year is nearly up, and Gawain has ridden out to find the Green Chapel." },
tell: "The Green Knight's game; Gawain's promise. Send them to Greenwold, to find Sir Gawain on his way to the Green Chapel." },
{ id: "ar6", act: "green", kind: "talk", title: "Sir Gawain", goal: "In Greenwold, find Sir Gawain on his way to the Green Chapel.", hint: "Greenwold",
where: { world: "greenwold", n: "Greenwold" }, greet: "Hail, squire. You've come a long way in the cold. So have I. I'm to keep a promise tomorrow that may well be my last.",
who: { name: "Sir Gawain", sex: "m", age: 28, title: "knight of the Round Table, Arthur's nephew", look: { layer: "tunic", layerColor: 0xA82A2A, top: 0xD8D8D8, bottom: 0x4A4A5A, hair: 0xC89A3A, hairStyle: "short", beard: 1, back: "cloak", backColor: 0x2A6A2A, shoeKind: "boots" },
persona: "You are courteous, brave and honest, and you wear a pentangle on your shield. You stayed three days at the castle of Sir Bertilak, who made a game of exchanging what each won each day. His lady gave you a green silk girdle that she said would keep you from harm, and you kept it back from your host, out of fear for tomorrow. Your conscience is troubling you, and you ask the squire's advice." },
tell: "The castle, the exchange of winnings, the green girdle you kept back. Ask the squire what you should do about the girdle, and do not move on until they answer." },
{ id: "ar7", act: "green", kind: "choice", title: "The green girdle", goal: "Decide.", q: "Sir Gawain asks you: should he keep the green girdle secret, to save his life tomorrow, or confess it to his host?",
opts: [{ k: "confess", n: "Confess it: a knight keeps his word", wise: 1, say: "Gawain lets out a long breath and nods. \"You're right. Better to face it honest.\" He looks lighter already." },
{ k: "keep", n: "Keep it: no shame in wanting to live", say: "He keeps it, and is ashamed. In the poem he wore the green girdle ever after to remind himself of it, and the whole court wore green in his honour." }] },
{ id: "ar8", act: "green", kind: "talk", title: "The Green Knight", goal: "At the Green Chapel, in Greenwold, face the Green Knight.", hint: "Greenwold, the Green Chapel",
where: { world: "greenwold", n: "Greenwold" }, greet: "WELL MET, squire! You've come to watch your knight keep his bargain? Good! I like a witness.",
who: { name: "The Green Knight", sex: "m", age: 45, title: "the giant Green Knight, who is also Sir Bertilak, lord of the castle", look: { layer: "tunic", layerColor: 0x2A7A2A, top: 0x4A9A3A, bottom: 0x2A6A2A, hair: 0x3A7A2A, hairStyle: "long", beard: "long", skin: 0x8AB87A, build: 1.3 },
persona: "You are huge, green, booming and kind underneath. You are Sir Bertilak under a spell by Morgan le Fay, set to test the knights of the Round Table. Gawain bowed his neck for your blow: you feinted twice and only nicked him on the third, for the girdle he kept back. You laugh, forgive him, and praise him as the most honest knight alive. Keep it for all ages: a test, not a fight." },
tell: "The three blows and what they meant; that Gawain is the most honest knight you have ever met. Send them back to Camelot, where Arthur is sending knights on a greater quest: the Holy Grail. Sir Galahad is setting out." },
{ id: "ar9", act: "grail", kind: "talk", title: "Sir Galahad", goal: "On the quest for the Grail, find Sir Galahad, the purest of knights.", hint: "the Grail quest, at 'The Quest'",
where: { tale: "arthur", ch: 5 }, greet: "Peace be with you, squire. Walk with me a while. I have a long way still to go.",
who: { name: "Sir Galahad", sex: "m", age: 22, title: "the purest knight of the Round Table, son of Sir Lancelot", look: { layer: "tunic", layerColor: 0xE8E8E8, top: 0xE8E8E8, bottom: 0x8A8AA8, hair: 0xE8C878, hairStyle: "short", back: "cloak", backColor: 0xA82A2A, shoeKind: "boots" },
persona: "You are calm, kind and very serious. You sat in the Siege Perilous, the seat at the Round Table that no one else could sit in, and drew a sword from a floating stone. You seek the Holy Grail, the cup of the Last Supper, which appeared in a beam of light at Camelot and vanished. You say the quest is for the honest-hearted, not the strongest." },
tell: "The Siege Perilous; the Grail; that only the pure in heart may find it. Send them back to the Round Table, where Arthur waits to hear their tale." },
{ id: "ar10", act: "grail", kind: "talk", title: "Knighted", goal: "Back at the Round Table, kneel before King Arthur.", hint: "Camelot, at 'The Round Table'",
where: { tale: "arthur", ch: 4 }, greet: "Kneel, squire. No: kneel. I've heard everything from Gawain and Galahad.",
who: { name: "King Arthur", sex: "m", age: 35, title: "King of all England, lord of the Round Table", look: { layer: "tunic", layerColor: 0x2A3A8A, top: 0xD8D8D8, bottom: 0x3A3A5A, hat: "crown", hatColor: 0xE8C040, hair: 0x8A5A2A, hairStyle: "short", beard: 1, back: "cloak", backColor: 0xA82A2A },
persona: "You are King Arthur, glad and solemn. You have heard how the squire helped Gawain and walked with Galahad. You knight them with Excalibur and give them a seat at the Round Table, where no knight sits above another." },
tell: "Why they've earned a seat; what the Round Table means. Knight them, warmly." }
] });
qlnLine({ k: "robin", icon: "🏹", fac: "commons", title: "The Greenwood Oath", short: "Robin Hood and his merry men",
src: "Howard Pyle's The Merry Adventures of Robin Hood (1883) and the old ballads",
hero: "a newcomer to the greenwood who wants to join Robin Hood's band",
intro: "In Greenwold a minstrel sits weeping under an oak: tomorrow the girl he loves will be married to a rich old knight. Robin Hood's band never could resist a wrong to put right. Find them.",
bg: "Robin Hood and his merry men in Lincoln green: Little John, Friar Tuck, Will Scarlet, Allan a Dale and Maid Marian, who take from cruel lords and the greedy Sheriff of Nottingham and give to the poor.",
acts: [{ k: "wed", n: "Act I: Allan a Dale's Wedding" }, { k: "knight", n: "Act II: The Sorrowful Knight" }, { k: "oath", n: "Act III: The King in the Greenwood" }],
end: { title: "Sworn of the Greenwood", keep: "📯 Robin's silver horn (a keepsake)", say: function (f, n) {
return f >= n ? "Robin gives you a silver horn: blow it, and the greenwood comes. \"You've a good heart and a quick head,\" he says. \"That's all the oath asks.\"" :
"Robin gives you a silver horn all the same. \"You'll learn our ways,\" he laughs, \"Little John took years.\"";
} },
steps: [
{ id: "rh1", act: "wed", kind: "talk", title: "The minstrel", goal: "In Greenwold, find Allan a Dale the minstrel, weeping under an oak.", hint: "Greenwold",
where: { world: "greenwold", n: "Greenwold" }, greet: "Forgive me. A minstrel shouldn't weep. But tomorrow my Ellen marries a man old enough to be her grandfather, for his money.",
who: { name: "Allan a Dale", sex: "m", age: 22, title: "a young minstrel with a harp", look: { layer: "tunic", layerColor: 0xA82A2A, top: 0xE8D8B8, bottom: 0x5A3A2A, hair: 0xC89A3A, hairStyle: "curly", back: "cloak", backColor: 0x5A2A2A, shoeKind: "boots" },
persona: "You are gentle, romantic and miserable. Your love Ellen is to be married to old Sir Stephen of Trent tomorrow at Plympton church, because her brother wants his gold. You've heard of Robin Hood but are too shy to ask him for help." },
tell: "Ellen and the wedding. Send them to find Robin's band: the first of them they'll meet is Little John, who guards the log bridge in the Robin Hood story world." },
{ id: "rh2", act: "wed", kind: "talk", title: "Little John", goal: "In the Robin Hood story world, cross Little John's log bridge.", hint: "the Robin Hood story world, at 'Little John on the Bridge'",
where: { tale: "robinhood", ch: 0 }, greet: "Halt! One at a time on my bridge, friend, and it's my turn. ...Oh, all right. What do you want?",
who: { name: "Little John", sex: "m", age: 30, title: "the giant of Robin Hood's band", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0x8A7A5A, bottom: 0x4A3A2A, hair: 0x5A3A22, hairStyle: "long", beard: 1, shoeKind: "boots", build: 1.2 },
persona: "You are huge, good-humoured and proud. You met Robin on this very bridge: you fought with quarterstaffs and you knocked him into the stream, and he laughed and asked you to join. He renamed you Little John as a joke. You love a wedding." },
tell: "How you met Robin; that if Allan's to be married to his Ellen, they'll need a priest who's on their side: Friar Tuck. Send them to the friar's cell by the river." },
{ id: "rh3", act: "wed", kind: "talk", title: "Friar Tuck", goal: "By the river, find jolly Friar Tuck.", hint: "the friar's cell, at 'Friar Tuck'",
where: { tale: "robinhood", ch: 1 }, greet: "Peace be with you, and a pasty! Mind the dogs. Robin sent you? Then I'll guess he wants me to marry somebody.",
who: { name: "Friar Tuck", sex: "m", age: 50, title: "the jolly fighting friar of Fountain Abbey", look: { topKind: "robe", top: 0x6A4A2A, bottom: 0x6A4A2A, hair: 0x8A6A4A, hairStyle: "bald", waist: "belt", build: 1.3 },
persona: "You are round, merry, kind and handy with a sword. When Robin first met you, he made you carry him across the river, and you dropped him in halfway. You'll gladly marry two young people who love each other, if the bishop can be got out of the way." },
tell: "The river and Robin's dunking; that you'll marry Allan and Ellen. Send them to Robin under the great oak in the greenwood to make the plan." },
{ id: "rh4", act: "wed", kind: "talk", title: "Robin Hood", goal: "Under the great trees of the greenwood, meet Robin Hood himself.", hint: "the greenwood, at 'The Greenwood'",
where: { tale: "robinhood", ch: 2 }, greet: "So you're the one making friends with all my men. Sit. Will Scarlet, a cup for our guest! Now: what's this about a wedding?",
who: { name: "Robin Hood", sex: "m", age: 32, title: "the outlaw of Sherwood Forest, best archer in England", look: { layer: "tunic", layerColor: 0x3A6A2A, top: 0x5A8A3A, bottom: 0x4A5A2A, hat: "hood", hatColor: 0x3A6A2A, hair: 0x8A5A2A, hairStyle: "short", beard: 1, shoeKind: "boots", waist: "belt", back: "cloak", backColor: 0x2A4A1A },
persona: "You are cheerful, generous, quick-witted and fair. You take from the cruel rich and give to the poor, and no honest traveller need fear you. You want to stop the wedding and marry Allan to his Ellen instead. You can think of two ways and ask the newcomer to choose." },
tell: "The two plans: go to the church disguised as a harper and blow your horn at the right moment, or march in with the whole band. Ask them to choose. Do not move on until they do." },
{ id: "rh5", act: "wed", kind: "choice", title: "The wedding", goal: "Decide.", q: "How should Robin stop the wedding at Plympton church?",
opts: [{ k: "harper", n: "Robin goes in disguise as a harper, horn in his sleeve", wise: 1, say: "Robin plays so sweetly even the bishop smiles, then blows his horn: the band pours in, Friar Tuck marries Allan to his Ellen, and old Sir Stephen stamps off. Nobody so much as bruised." },
{ k: "force", n: "March the whole band in through the front door", say: "Plenty of shouting, a few knocked hats, and the bishop flees out of the window. Allan and Ellen are married all the same, but Robin says the harp would have been more fun." }] },
{ id: "rh6", act: "knight", kind: "talk", title: "The sorrowful knight", goal: "In Somnucor, outside the Bank, find Sir Richard of the Lea, a knight down on his luck.", hint: "Somnucor, outside the Bank of Somnucor",
where: { city: "The Bank of Somnucor" }, greet: "Forgive an old knight his long face. I owe four hundred pounds to the Abbot of Saint Mary's, and if I can't pay by tomorrow he takes my lands.",
who: { name: "Sir Richard of the Lea", sex: "m", age: 55, title: "a poor, honest knight", look: { layer: "tunic", layerColor: 0x5A5A5A, top: 0x8A8A8A, bottom: 0x3A3A3A, hair: 0xB8B8B8, hairStyle: "short", beard: 1, back: "cloak", backColor: 0x3A3A4A, shoeKind: "boots" },
persona: "You are honest, proud and ashamed. Your son got into trouble and you borrowed from the greedy Abbot of Saint Mary's to save him; now the Abbot means to take your lands. Robin Hood once lent you the money, and you will repay it. You ask the newcomer whether they would trust a stranger with a loan." },
tell: "The debt and the greedy Abbot. Ask whether they'd lend gold to an honest stranger. Do not move on until they decide." },
{ id: "rh7", act: "knight", kind: "choice", title: "The loan", goal: "Decide.", q: "Sir Richard needs four hundred pounds by tomorrow, and promises to repay in a year and a day. Robin asks what you think.",
opts: [{ k: "lend", n: "Lend it: an honest man in trouble", wise: 1, say: "Robin lends it from the band's chest, and Little John throws in a new cloak. In a year and a day Sir Richard rides back and repays it all, with a hundred bows besides." },
{ k: "refuse", n: "Refuse: you can't trust everyone's story", say: "Robin lends it anyway, grinning: \"In the greenwood we trust a man until he gives us a reason not to.\" Sir Richard repays it all, in time." }] },
{ id: "rh8", act: "knight", kind: "talk", title: "Maid Marian at the fair", goal: "At Nottingham Fair, find Maid Marian, scouting the Sheriff's archery match.", hint: "Nottingham Fair",
where: { tale: "robinhood", ch: 3 }, greet: "Keep your hood up. The Sheriff's men are everywhere. He's put up a silver arrow as the prize, and he thinks Robin can't resist it. He's right.",
who: { name: "Maid Marian", sex: "f", age: 28, title: "brave and quick-witted, Robin's love", look: { topKind: "dress", top: 0x8A2A3A, bottom: 0x3A5A2A, back: "cloak", backColor: 0x3A5A2A, hair: 0x8A3A1A, hairStyle: "braids", waist: "belt" },
persona: "You are clever, fearless and a fine archer. The Sheriff of Nottingham has set a trap: an archery match with a silver arrow as the prize. Robin will go in disguise, in a ragged red cloak with a patch over one eye, and win. You are amused and worried." },
tell: "The Sheriff's trap and Robin's disguise; that the Sheriff caught Will Stutely last week and means to hang him (keep it for all ages: a rescue, never shown). Send them to the town gate for the rescue." },
{ id: "rh9", act: "knight", kind: "talk", title: "Will Stutely", goal: "At the town gate, help free Will Stutely from the Sheriff's men.", hint: "the town gate, at 'The Rescue'",
where: { tale: "robinhood", ch: 5 }, greet: "Ha! I knew they'd come. I knew it! Untie these ropes, quick, quick.",
who: { name: "Will Stutely", sex: "m", age: 26, title: "one of Robin Hood's merry men", look: { layer: "tunic", layerColor: 0x3A6A2A, top: 0x5A8A3A, bottom: 0x4A5A2A, hat: "hood", hatColor: 0x3A6A2A, hair: 0x2A1A12, hairStyle: "short", shoeKind: "boots" },
persona: "You are brave, cheeky and very relieved. You were caught spying in Nottingham and the Sheriff meant to make an example of you; the band burst out of the crowd and freed you. You are full of thanks and jokes. Keep it for all ages." },
tell: "The rescue. And news: a big friar has been asking for Robin in Greenwold, a friar with a soldier's way of standing. Send them back to Greenwold to meet him." },
{ id: "rh10", act: "oath", kind: "talk", title: "The tall friar", goal: "Back in Greenwold, meet the tall friar who has been asking for Robin.", hint: "Greenwold",
where: { world: "greenwold", n: "Greenwold" }, greet: "Well met. I'm told you run with Robin Hood. I should very much like to meet the man who robs bishops and pays poor knights' debts.",
who: { name: "The tall friar", sex: "m", age: 40, title: "a tall friar who is really King Richard the Lionheart in disguise", look: { topKind: "robe", top: 0x5A4A3A, bottom: 0x5A4A3A, hat: "hood", hatColor: 0x5A4A3A, hair: 0xC8902A, hairStyle: "short", beard: 1, waist: "belt" },
persona: "You are King Richard the Lionheart, home from the Crusade, travelling in a friar's robe to see your kingdom for yourself. You are big, bluff and amused. You've heard of Robin's kindness to Sir Richard of the Lea and to Allan a Dale. When the time is right you throw back your hood, reveal who you are, pardon Robin's band, and swear the newcomer into the greenwood with Robin's blessing. Keep the reveal for near the end of the talk." },
tell: "Ask about Robin's deeds; reveal you are the King; pardon the band; welcome the newcomer to the Greenwood Oath." }
] });
var QLN_TASKS = {
od1: [6, "offerings for Poseidon's feast, along the shore", "🏺"], od2: [6, "golden spindle-whorls Helen has dropped", "🧶"], od3: [6, "sealskins to hide under", "🦭"],
od4: [8, "bronze helmets left on the plain of Troy", "⛑️"], od5: [6, "cloaks of the sailors who wandered off to eat lotus", "🧥"], od7: [8, "of Polyphemus' sheep to hide under", "🐑"],
od9: [6, "silver wires to tie the bag of winds", "🪢"], od10: [6, "oars from the wrecked ships", "🛶"], od11: [6, "sprigs of moly, the white-flowered herb", "🌼"],
od12: [6, "lamps to light the grey shore", "🪔"], od15: [8, "fish and birds to eat instead of the Sun's cattle", "🐟"], od17: [8, "logs for the raft", "🪵"],
od19: [6, "pieces of Nausicaa's washing blown along the shore", "👕"], od20: [5, "gifts the Phaeacians are loading for you", "🎁"], od21: [6, "of Eumaeus' strayed pigs", "🐖"],
od22: [12, "axe-heads to line up for the contest of the bow", "🪓"],
ja1: [8, "healing herbs for Chiron's lesson", "🌿"], ja2: [6, "stones to carry the old woman across the flood", "🪨"], ja3: [10, "planks for the Argo", "🪵"],
ja4: [8, "loaves for King Phineus, before the Harpies come", "🍞"], ja6: [6, "dove feathers, for luck through the rocks", "🪶"], ja7: [8, "of Medea's herbs for the salve", "🌿"],
ja9: [6, "sprigs of the sleeping herb", "🌱"], ja10: [8, "gifts for the homecoming feast", "🎁"],
ar1: [8, "pages of Merlin's spell book, blown away", "📜"], ar2: [6, "pieces of Sir Kay's tournament gear", "🛡️"], ar3: [6, "white lilies for the Lady of the Lake", "🪷"],
ar5: [8, "candles for the New Year feast", "🕯️"], ar6: [8, "sprigs of holly for Gawain's Christmas", "🌿"], ar8: [6, "green ribbons on the trees along the way to the Green Chapel", "🎀"],
ar9: [8, "lost pilgrims' tokens on the Grail road", "🐚"], ar10: [6, "banners for your knighting", "🚩"],
rh1: [8, "of Allan's harp strings, snapped and scattered", "🎵"], rh2: [6, "quarterstaffs knocked into the grass", "🪵"], rh3: [8, "pasties for the friar's table", "🥧"],
rh4: [8, "arrows to fletch for the band", "🏹"], rh8: [6, "of the Sheriff's posters, to pull down", "📜"], rh9: [6, "lengths of rope for the rescue", "🪢"], rh10: [8, "arrows for the friar's archery game", "🏹"]
};
var QLN_TALK_MIN = 6, QLN_LINE_MIN = 185;
function qlnTask(s) { var t = QLN_TASKS[s.id]; return t ? { n: t[0], what: t[1], icon: t[2] } : null; }
function qlnTaskHave(s) { var P = qlnP(s.line); return ((P.task || {})[s.id] || []).length; }
function qlnStepMin(s) { var L = QLN.by[s.line], n = L.steps.filter(function (x) { return x.kind === "talk"; }).length; return Math.ceil(QLN_LINE_MIN / Math.max(1, n)); }
function qlnActMin(s) { var P = qlnP(s.line); return Math.floor(((P.act || {})[s.id] || 0) / 60); }
function qlnChapOk(s) { var w = s.where || {}; if (!w.tale)
return true; try {
return typeof ctsProg === "function" && ctsProg(w.tale) > (w.ch || 0);
}
catch (e) {
return true;
} }
function qlnFoundOk(s) { var t = qlnTask(s); return !t || qlnTaskHave(s) >= t.n; }
function qlnTimeOk(s) { return qlnActMin(s) >= qlnStepMin(s); }
function qlnTaskDone(s) { return qlnChapOk(s) && qlnFoundOk(s) && qlnTimeOk(s); }
function qlnTaskText(s) { return __ZC(433, 91, this, arguments, new.target); }
var QLN_ACT = { last: 0, t: 0, q: null };
(function () {
function hit() { QLN_ACT.last = performance.now(); }
["keydown", "mousedown", "pointerdown", "touchstart", "wheel", "mousemove"].forEach(function (e) { try {
addEventListener(e, hit, { capture: true, passive: true });
}
catch (x) { } });
})();
function qlnPresent() { return __ZC(433, 92, this, arguments, new.target); }
function qlnAtPlace(s) {
if (!qlnHere(s))
return false;
var w = s.where || {};
if (w.sea) {
var p = SEA_BY[w.sea], lx = camera.position.x - SEA.base, lz = camera.position.z;
return Math.hypot(lx - p.x, lz - p.z) < p.r + 120;
}
return true;
}
function qlnCurrent() {
var cur = null;
QLN.lines.forEach(function (L) { if (cur || !qlnP(L.k).started || qlnOff(L.k))
return; var s = qlnNext(L); if (s && s.kind === "talk" && qlnAtPlace(s))
cur = s; });
return cur;
}
function qlnActTick(s) {
var now = performance.now(), dt = QLN_ACT.t ? Math.min(2, (now - QLN_ACT.t) / 1000) : 0;
QLN_ACT.t = now;
if (!s || !dt || !qlnPresent())
return;
var P = qlnP(s.line);
P.act = P.act || {};
var was = qlnActMin(s);
P.act[s.id] = (P.act[s.id] || 0) + dt;
if (qlnActMin(s) !== was) {
sgaSaveSoon();
if (qlnTimeOk(s) && was < qlnStepMin(s))
sgaToast(QLN.by[s.line].icon + " You've spent your time here well." + (qlnTaskDone(s) ? " " + s.who.name + " is waiting for you now, under a soft gold light." : ""));
else if (qlnActMin(s) % 5 === 0)
sgaToast(QLN.by[s.line].icon + " " + qlnActMin(s) + " of " + qlnStepMin(s) + " minutes here");
}
}
function qlnMarkSpots(s) { return __ZC(433, 93, this, arguments, new.target); }
var QLN_MARK = { sid: null, list: [], geo: null, mat: null, beacon: null };
function qlnMarkDrop() { QLN_MARK.list.forEach(function (m) { if (m.g.parent)
m.g.parent.remove(m.g); }); QLN_MARK.list = []; QLN_MARK.sid = null; }
function qlnMarkTick(cur) {
var want = cur && walkMode && !store.inside && qlnTask(cur) && !qlnFoundOk(cur) ? cur : null;
if (!want) {
if (QLN_MARK.sid)
qlnMarkDrop();
return;
}
if (QLN_MARK.sid !== want.id || QLN_MARK.list.some(function (m) { return !m.g.parent && !m.got; })) {
qlnMarkDrop();
QLN_MARK.sid = want.id;
var got = (qlnP(want.line).task || {})[want.id] || [];
if (!QLN_MARK.geo) {
QLN_MARK.geo = new THREE.OctahedronGeometry(0.32, 0);
QLN_MARK.mat = new THREE.MeshBasicMaterial({ color: 0xF2D27A });
}
qlnMarkSpots(want).forEach(function (p, i) {
if (got.indexOf(i) > -1)
return;
var g = new THREE.Group(), m = new THREE.Mesh(QLN_MARK.geo, QLN_MARK.mat);
m.position.y = 0.9;
g.add(m);
try {
var gl = wGlow(0xF2D27A, 1.1, 0.35);
gl.position.y = 0.9;
g.add(gl);
}
catch (e) { }
g.position.set(p.x, p.y, p.z);
(p.parent || WLD.w.g).add(g);
QLN_MARK.list.push({ g: g, i: i, m: m });
});
}
var C = camera.position, t = performance.now() / 1000, wp = new THREE.Vector3();
QLN_MARK.list.forEach(function (M) {
if (M.got)
return;
M.m.rotation.y = t * 0.8;
M.g.getWorldPosition(wp);
if (Math.hypot(C.x - wp.x, C.z - wp.z) < 2.4 && Math.abs(C.y - 1.72 - wp.y) < 4) {
M.got = 1;
if (M.g.parent)
M.g.parent.remove(M.g);
var T = qlnP(want.line);
T.task = T.task || {};
var a = T.task[want.id] = T.task[want.id] || [];
if (a.indexOf(M.i) < 0)
a.push(M.i);
sgaSaveSoon();
var k = qlnTask(want);
sgaToast(k.icon + " " + (a.length >= k.n ? "All " + k.n + " found." + (qlnTaskDone(want) ? " " + want.who.name + " is waiting for you now, under a soft gold light." : " " + qlnTaskText(want)) : a.length + " of " + k.n + " " + k.what));
}
});
}
function qlnSeaTick() {
var aim = null;
if (WLD.on === "sea")
QLN.lines.forEach(function (L) { if (aim || !qlnP(L.k).started || qlnOff(L.k))
return; var s = qlnNext(L); if (s && s.kind === "talk" && s.where && s.where.sea)
aim = s; });
var B = QLN_MARK.beacon;
if (!aim) {
if (B && B.g.parent)
B.g.parent.remove(B.g);
if (B)
B.k = null;
return;
}
var p = SEA_BY[aim.where.sea];
if (!B || !B.g) {
B = QLN_MARK.beacon = { g: new THREE.Group() };
var col = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 160, 8, 1, true), new THREE.MeshBasicMaterial({ color: 0xF2D27A, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide }));
col.position.y = 80;
B.g.add(col);
try {
var gl = wGlow(0xF2D27A, 30, 0.6);
gl.position.y = 165;
B.g.add(gl);
}
catch (e) { }
}
if (B.k !== aim.where.sea || !B.g.parent) {
B.k = aim.where.sea;
var v = new THREE.Vector3(SEA.base + p.land.x, Math.max(0, seaHeight(p.land.x, p.land.z)), p.land.z);
WLD.w.g.worldToLocal(v);
B.g.position.copy(v);
WLD.w.g.add(B.g);
}
var now = performance.now();
if (B.said && now - B.said < 20000)
return;
B.said = now;
var lx = camera.position.x - SEA.base, lz = camera.position.z, d = Math.hypot(p.x - lx, p.z - lz);
if (d < p.r + 60)
return;
var f = new THREE.Vector3();
camera.getWorldDirection(f);
var rel = Math.atan2(p.x - lx, p.z - lz) - Math.atan2(f.x, f.z);
while (rel > Math.PI)
rel -= Math.PI * 2;
while (rel < -Math.PI)
rel += Math.PI * 2;
var a = Math.abs(rel), side = rel > 0 ? "left" : "right", way = a < 0.25 ? "dead ahead" : a < 0.9 ? "ahead, a little to your " + side : a < 2.2 ? "off to your " + side : "behind you";
setStatus(QLN.by[aim.line].icon + " <b>" + esc(p.name) + "</b> is " + way + ", about " + (d >= 1000 ? (d / 1000).toFixed(1) + " km" : Math.round(d) + " m") + ". Steer for the gold light; go ashore with E.");
}
(function () {
var qw0 = qlnWanted;
qlnWanted = function () { return qw0().filter(function (w) { return qlnTaskDone(w.s); }); };
var nt0 = sgaNearTick;
sgaNearTick = function () {
var r = nt0.apply(this, arguments);
try {
var cur = qlnCurrent();
qlnActTick(cur);
qlnMarkTick(cur);
qlnSeaTick();
}
catch (e) {
if (window.console && !QLN.warned) {
QLN.warned = 1;
console.warn("[saga] journeys", e);
}
}
return r;
};
var te0 = sgaTalkEnded;
sgaTalkEnded = function (c, lines) {
var s = c && c.sgaStep && QLN.step[c.sgaStep];
if (s) {
var n = (lines || []).filter(function (t) { return t.who === "me"; }).length;
if (n < QLN_TALK_MIN && sgaOpenStep(s)) {
sgaToast(QLN.by[s.line].icon + " " + s.who.name + " has more to tell you. Talk a while longer: ask about their story.");
return;
}
}
return te0.apply(this, arguments);
};
var br0 = qlnBrief;
qlnBrief = function (id) { var t = br0(id); return t ? t + "Make it a real conversation: tell your story a piece at a time, ask the dreamer questions (about themselves, or what they would do), and answer what they ask. Only near the end, after at least six exchanges, tell them where to go next. " : t; };
var go0 = qlnGo;
qlnGo = function (s) {
var w = s.where || {}, L = QLN.by[s.line];
if (w.sea) {
SGA.open = false;
sgaPaint();
if (WLD.on !== "sea") {
var ok = worldGo("sea", {});
if (ok === false || WLD.on !== "sea")
return;
}
var B = QLN_MARK.beacon;
if (B)
B.said = 0;
setStatus(L.icon + " Board the Wayfarer and sail for <b>" + esc(SEA_BY[w.sea].name) + "</b> yourself: steer for the gold light. The way will be told as you go.");
return;
}
if (w.tale) {
SGA.open = false;
sgaPaint();
if (!(WLD.on === "ctale" && CTS.T && CTS.T.id === w.tale)) {
if (typeof ctsEnter !== "function")
return;
ctsEnter(w.tale);
}
var Wd = typeof CT_W !== "undefined" && CT_W[w.tale], nm = Wd && Wd.ch[w.ch || 0] ? Wd.ch[w.ch || 0][0] : "";
setStatus(L.icon + " Walk to <b>" + esc(nm) + "</b>. " + esc(qlnTaskText(s) || (s.who.name + " waits there under a soft gold light.")));
return;
}
var r = go0(s);
if (w.world && qlnTaskText(s))
setStatus(L.icon + " " + esc(qlnTaskText(s)));
return r;
};
var wt0 = qlnWhereText;
qlnWhereText = function (s) { var t = wt0(s), k = qlnTaskText(s); return t + (k ? " · " + k : ""); };
})();
var QLN_DRESS = { geo: null, mat: {}, tex: {} };
var QLN_LOOK = {
odyssey: { col: 0x1F4E8C, trim: 0xE8D8A8, props: "amph" },
jason: { col: 0x8A6A1A, trim: 0xF2D070, props: "argo" },
arthur: { col: 0x8A1F2A, trim: 0xE8C040, props: "camelot" },
robin: { col: 0x2F5A22, trim: 0xD8C890, props: "green" }
};
function qlnDM(col, emi) { var k = col + (emi ? "e" : ""); return QLN_DRESS.mat[k] || (QLN_DRESS.mat[k] = emi ? new THREE.MeshBasicMaterial({ color: col }) : new THREE.MeshLambertMaterial({ color: col })); }
function qlnDG() { return __ZC(433, 94, this, arguments, new.target); }
function qlnIconTex(ch) {
return QLN_DRESS.tex[ch] || (QLN_DRESS.tex[ch] = wTex(128, 128, function (x, w, h) { x.font = "96px serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, w / 2, h / 2 + 6); }));
}
function qlnFlagTex(k) { return __ZC(433, 95, this, arguments, new.target); }
function qlnSprite(tex, size) { var k = "sp:" + tex.uuid, m = QLN_DRESS.mat[k] || (QLN_DRESS.mat[k] = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })); var s = new THREE.Sprite(m); s.scale.set(size, size, 1); return s; }
function qlnDress(g, s) { return __ZC(433, 96, this, arguments, new.target); }
(function () {
var f0 = sgaFigure;
sgaFigure = function (seed, who) { var g = f0.apply(this, arguments); try {
var s = QLN.step[seed];
if (s)
qlnDress(g, s);
}
catch (e) {
if (window.console && !QLN.dw) {
QLN.dw = 1;
console.warn("[saga] dress", e);
}
} return g; };
var mk0 = qlnMarkTick;
qlnMarkTick = function (cur) {
var r = mk0.apply(this, arguments);
QLN_MARK.list.forEach(function (M) {
if (M.dressed || M.got)
return;
M.dressed = 1;
var t = cur && qlnTask(cur);
if (!t)
return;
M.m.visible = false;
var sp = qlnSprite(qlnIconTex(t.icon), 0.75);
sp.position.y = 0.95;
M.g.add(sp);
M.m = sp;
});
return r;
};
var i = SGA_TABS.findIndex(function (t) { return t[0] === "lines"; });
if (i > -1) {
var tb = SGA_TABS.splice(i, 1)[0];
SGA_TABS.push(tb);
}
})();
