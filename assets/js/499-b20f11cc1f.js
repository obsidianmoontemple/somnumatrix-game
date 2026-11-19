/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var BHN_BOOKS = {}, BHN_ORDER = [];
function bhnBook(k, t, i, how, o) {
var B = { k: k, t: t, i: i, how: how, b: o.b, d: o.d || [], w: o.w || [], m: o.m || null, v: o.v || ["crypt", "faceless", "The keeper of the vault", "The vault"], shelf: o.shelf || "" };
BHN_BOOKS[k] = B;
BHN_ORDER.push(k);
return B;
}
bhnBook("oz1", "The Wonderful Wizard of Oz", "🌪️", "oz:1", { shelf: "Oz",
b: ["Friend of the Emerald City", "💚", "#2E9A4E"],
d: [["The Silver Shoes on a cushion", "case", { relic: "shoes", c: 0xD8D8E0 }], ["Dorothy's farmhouse in the cyclone", "painting", { sky: 0x5A6A5A, ground: 0x8A7A4A, fig: 0x6A4A2A, swirl: 1 }]],
w: [["The Tin Woodman's axe", "battleaxe", "c", { m: 0xC8CCD4, h: 0x6A4A2A }], ["The Winkie spear", "spear", "u", { m: 0xD8C040, h: 0xE8D060 }], ["The Golden Cap's staff", "lightstaff", "r", { m: 0xE8C040, h: 0x2A6A3A, g: 0xFFE890 }]],
m: ["The Cowardly Lion's cousin", "griffin", { coat: 0xC89A50, tack: 0x2E9A4E }],
v: ["ruin", "wildbear", "The Kalidah", "The Kalidahs' den"] });
bhnBook("oz2", "The Marvelous Land of Oz", "🎃", "oz:2", { shelf: "Oz",
b: ["Rider of the Gump", "🎃", "#E07A20"],
d: [["Jack Pumpkinhead's spare head", "case", { relic: "pumpkin", c: 0xE07A20 }], ["The Woggle-Bug's lecture board", "painting", { sky: 0x3A5A3A, ground: 0x6A8A4A, fig: 0x2A6A2A }]],
w: [["General Jinjur's knitting-needle spear", "spear", "c", { m: 0xC8C8D0, h: 0x8A3A8A }], ["The Sawhorse's oak club", "mace", "u", { m: 0x8A6A3A, h: 0x6A4A2A }], ["Mombi's powder of life wand", "sparkwand", "r", { m: 0x3A2A4A, h: 0x2A1A2A, g: 0xC890FF }]],
m: ["The Sawhorse", "horse", { coat: 0x9A7A4A, tack: 0xE8C040, wood: 1 }],
v: ["wizard", "watcher", "Old Mombi's shadow", "Mombi's cellars"] });
bhnBook("oz3", "Ozma of Oz", "🐔", "oz:3", { shelf: "Oz",
b: ["Billina's champion", "🥚", "#E8C040"],
d: [["Tik-Tok, wound and still", "statue", { stone: 0xB8702E, metal: 1, sex: "m" }], ["The Nome King's ornament", "case", { relic: "egg", c: 0xE8D8A0 }]],
w: [["Tik-Tok's copper fist", "arcanefist", "c", { m: 0xB8702E, h: 0x8A5020 }], ["The Wheelers' hook", "scythe", "u", { m: 0x9A9AA0, h: 0x3A2A1A }], ["Princess Langwidere's mirror blade", "rapier", "r", { m: 0xE8E8F0, h: 0xD8B040, g: 0xD8E8FF }]],
m: ["The Hungry Tiger", "stag", { coat: 0xD88A30, tack: 0x8A2A2A, stripe: 1 }],
v: ["dwarf", "tunnelgob", "The Nome King's guard", "Under the Nome King's mountain"] });
bhnBook("oz4", "Dorothy and the Wizard in Oz", "🐴", "oz:4", { shelf: "Oz",
b: ["Through the Earthquake", "⛰️", "#8A6AC0"],
d: [["The glass city of the Mangaboos", "case", { relic: "crystal", c: 0x9AD8C8 }], ["Jim and the buggy", "painting", { sky: 0x2A2040, ground: 0x4A3A5A, fig: 0x8A6A4A }]],
w: [["The Wizard's revolver", "revolver", "c", { m: 0x6A6A70, h: 0x3A2A1A }], ["Mangaboo thorn", "rapier", "u", { m: 0x7AC890, h: 0x2A6A3A }], ["The Gargoyles' wooden wing-blade", "claymore", "r", { m: 0x6A5A4A, h: 0x3A2A1A, g: 0xB89AFF }]],
m: ["Jim the cab-horse", "horse", { coat: 0x9A8A7A, tack: 0x2A2A2A }],
v: ["spider", "cavespider", "The Dragonettes' mother", "The Dragonettes' cave"] });
bhnBook("oz5", "The Road to Oz", "🦊", "oz:5", { shelf: "Oz",
b: ["Guest at Ozma's party", "🎂", "#D86AA0"],
d: [["The Love Magnet", "case", { relic: "magnet", c: 0xD84A4A }], ["The Shaggy Man's road", "painting", { sky: 0x8AB8E0, ground: 0xC8A860, fig: 0x6A4A2A }]],
w: [["Polychrome's rainbow staff", "lightstaff", "c", { m: 0xE8A0D0, h: 0xE8E0F0, g: 0xFFD8F0 }], ["The Scoodlers' throwing head", "sling", "u", { m: 0x8A8A8A, h: 0x3A2A1A }], ["The Shaggy Man's love-magnet sword", "longsword", "r", { m: 0xD84A4A, h: 0x6A4A2A, g: 0xFF8AA0 }]],
m: ["The Sawhorse in gold shoes", "horse", { coat: 0x9A7A4A, tack: 0xE8C040, wood: 1, gold: 1 }],
v: ["ruin", "wildboar", "The Scoodler chief", "The Scoodlers' hollow"] });
bhnBook("oz6", "The Emerald City of Oz", "💎", "oz:6", { shelf: "Oz",
b: ["Defender of the Emerald City", "💎", "#1E8A4E"],
d: [["An emerald lamp of the palace", "lamp", { c: 0x2EAA5E, gold: 1 }], ["The Magic Picture", "painting", { sky: 0x2E8A4E, ground: 0x1E6A3E, fig: 0xE8D890, frame: 0xE8C040 }]],
w: [["Ozma's palace guard halberd", "halberd", "c", { m: 0x2EAA5E, h: 0xE8C040 }], ["The Nome King's belt-blade", "khopesh", "u", { m: 0x6A6A70, h: 0x8A2A2A }], ["The Fountain of Oblivion staff", "froststaff", "r", { m: 0x9AD8E8, h: 0xE8E8F0, g: 0xA0E0FF }]],
m: ["The Hungry Tiger in green harness", "stag", { coat: 0xD88A30, tack: 0x1E8A4E, stripe: 1 }],
v: ["dwarf", "deeptroll", "General Guph's Growleywog", "The Nome tunnel under the desert"] });
bhnBook("oz7", "The Patchwork Girl of Oz", "🧵", "oz:7", { shelf: "Oz",
b: ["Scraps' friend", "🧶", "#D84AA0"],
d: [["The Patchwork Girl's quilt", "rug", { c: 0xD84A8A, c2: 0x3A8AD8, patch: 1 }], ["The Powder of Life, in its pepper-box", "case", { relic: "phials", c: 0xC8A0E8 }]],
w: [["Ojo's crooked staff", "quarterstaff", "c", { m: 0x6A4A2A, h: 0x3A6AC0 }], ["Dr Pipt's stirring rod", "mendstaff", "u", { m: 0xB89A6A, h: 0x3A2A1A, g: 0x9AFFC0 }], ["The Woozy's fire-eye", "firestaff", "r", { m: 0x2A6AD8, h: 0x1A2A6A, g: 0xFF8A3A }]],
m: ["The Woozy", "stag", { coat: 0x2A6AD8, tack: 0xE8C040, blocky: 1 }],
v: ["spider", "mirespider", "The giant porcupine Chiss", "Chiss's hedge"] });
bhnBook("oz8", "Tik-Tok of Oz", "⚙️", "oz:8", { shelf: "Oz",
b: ["Wound by Tik-Tok", "⚙️", "#B8702E"],
d: [["Tik-Tok's spare key", "case", { relic: "key", c: 0xB8702E }], ["The Rose Kingdom", "painting", { sky: 0xE8B8C8, ground: 0x6A8A4A, fig: 0xD84A6A }]],
w: [["Ruggedo's sceptre", "mace", "c", { m: 0xE8C040, h: 0x3A2A1A }], ["Queen Ann's army sword", "longsword", "u", { m: 0xC8C8D0, h: 0x8A2A6A }], ["The Metal Forest blade", "sunblade", "r", { m: 0xE8E8F0, h: 0xB8702E, g: 0xFFE8A0 }]],
m: ["Quox the dragon", "dragon", { coat: 0x6A8AC0, tack: 0xE8C040 }],
v: ["clock", "trackdrone", "Ruggedo's iron giant", "The Hollow Tube's end"] });
bhnBook("oz9", "The Scarecrow of Oz", "🌾", "oz:9", { shelf: "Oz",
b: ["Straw and true", "🌾", "#C8A040"],
d: [["The Scarecrow's straw-stuffed chair", "throne", { c: 0xC8A040, straw: 1 }], ["Jinxland under the mountains", "painting", { sky: 0x6A7A9A, ground: 0x5A6A3A, fig: 0x2A3A5A }]],
w: [["Cap'n Bill's wooden-leg cudgel", "mace", "c", { m: 0x8A6A3A, h: 0x6A4A2A }], ["King Krewl's guard pike", "halberd", "u", { m: 0xC8C8D0, h: 0x3A2A1A }], ["Blinkie's freezing wand", "freezeray", "r", { m: 0x9AD8E8, h: 0x2A2A3A, g: 0xA0E8FF }]],
m: ["The Ork", "griffin", { coat: 0x8A8A6A, tack: 0x3A2A1A }],
v: ["frost", "rimeyeti", "The Frozen Heart's warden", "Blinkie's ice-hall"] });
bhnBook("oz10", "Rinkitink in Oz", "👑", "oz:10", { shelf: "Oz",
b: ["Bearer of the three pearls", "⚪", "#E8E8F0"],
d: [["The three pearls of Pingaree", "case", { relic: "pearls", c: 0xF0F0F8 }], ["Bilbil the goat's stall", "chest", { c: 0x8A6A3A }]],
w: [["Inga's blue-pearl gauntlet", "arcanefist", "c", { m: 0x3A6AD8, h: 0xE8E8F0, g: 0x8AB8FF }], ["The Regos warrior's sword", "longsword", "u", { m: 0xC8C8D0, h: 0x6A2A2A }], ["The pink pearl's shield", "dawnaegis", "r", { m: 0xE8B8C8, h: 0xE8E8F0, g: 0xFFD8E8 }]],
m: ["Bilbil the goat", "stag", { coat: 0xE8E0D0, tack: 0xD84A4A, goat: 1 }],
v: ["smuggler", "roadraider", "The raider chief of Regos", "The Regos sea-caves"] });
bhnBook("oz11", "The Lost Princess of Oz", "🔍", "oz:11", { shelf: "Oz",
b: ["Finder of Ozma", "🔍", "#8A4AD8"],
d: [["Ugu the Shoemaker's wicker castle", "case", { relic: "castle", c: 0xC8A060 }], ["The Magic Dishpan", "case", { relic: "pan", c: 0xB89A6A }]],
w: [["Cayke's diamond dishpan", "shuriken", "c", { m: 0xE8E0D0, h: 0xB8A060 }], ["The Frogman's walking stick", "quarterstaff", "u", { m: 0x2A6A3A, h: 0xE8C040 }], ["Ugu's magic belt rod", "stormrod", "r", { m: 0x8A4AD8, h: 0x2A1A3A, g: 0xC89AFF }]],
m: ["The Sawhorse with the magic dishpan", "horse", { coat: 0x9A7A4A, tack: 0x8A4AD8, wood: 1 }],
v: ["wizard", "discord", "Ugu the Shoemaker", "Ugu's wicker castle"] });
bhnBook("oz12", "The Tin Woodman of Oz", "🪓", "oz:12", { shelf: "Oz",
b: ["Tin to the heart", "🪓", "#C8CCD4"],
d: [["The Tin Soldier's sword on its stand", "case", { relic: "sword", c: 0xC8CCD4 }], ["Nimmie Amee's cottage", "painting", { sky: 0x8AB8D8, ground: 0x6A9A4A, fig: 0x8A6A4A }]],
w: [["The Tin Woodman's polished axe", "battleaxe", "c", { m: 0xE8ECF4, h: 0xE8ECF4 }], ["Captain Fyter's tin sword", "longsword", "u", { m: 0xE8ECF4, h: 0x6A6A70 }], ["Mrs Yoop's transforming wand", "sparkwand", "r", { m: 0x2AC060, h: 0x1A3A2A, g: 0x8AFFB0 }]],
m: ["Woot's green monkey-steed", "griffin", { coat: 0x3A9A4A, tack: 0xC8CCD4 }],
v: ["dwarf", "hilltroll", "Mrs Yoop the giantess", "Mrs Yoop's castle"] });
bhnBook("oz13", "The Magic of Oz", "🪄", "oz:13", { shelf: "Oz",
b: ["Pyrzqxgl", "🪄", "#D8A040"],
d: [["The Magic Flower in its gold pot", "case", { relic: "flower", c: 0xE8C040 }], ["Mount Munch", "painting", { sky: 0x9AB8D8, ground: 0x6A8A5A, fig: 0x5A4A3A }]],
w: [["Kiki Aru's hawk-feather dart", "shuriken", "c", { m: 0x8A6A4A, h: 0x3A2A1A }], ["The Lonesome Duck's bill", "dagger", "u", { m: 0xE8C040, h: 0x2A6A3A }], ["The word of transformation", "sparkwand", "r", { m: 0xE8C040, h: 0x6A2A6A, g: 0xFFE8A0 }]],
m: ["The Li-Mon-Eag", "griffin", { coat: 0xC89A50, tack: 0x6A2A6A }],
v: ["ruin", "wildbear", "The beasts' council on the hill", "The forest of Gugu"] });
bhnBook("oz14", "Glinda of Oz", "🏝️", "oz:14", { shelf: "Oz",
b: ["The Sunken Island raised", "🏝️", "#4A8AD8"],
d: [["The Glass Dome of the Skeezers", "case", { relic: "dome", c: 0xB8D8E8 }], ["Glinda's Great Book of Records", "bookstand", { c: 0xE8D8B0 }]],
w: [["Coo-ee-oh's silver swan-wand", "sparkwand", "c", { m: 0xE8E8F0, h: 0x2A2A3A, g: 0xD8E8FF }], ["Flathead soldier's spear", "spear", "u", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Red Reera's yookoohoo staff", "thornstaff", "r", { m: 0xD84A4A, h: 0x3A2A1A, g: 0xFF9A8A }]],
m: ["Diamond swan of the Skeezers", "pegasus", { coat: 0xF0F0F8, tack: 0x4A8AD8 }],
v: ["temple", "mirelizard", "Su-dic's guardian of the lake", "Under the Lake of the Skeezers"] });
bhnBook("neverland", "Peter and Wendy", "🧚", "st:nvbook", { shelf: "London and Neverland",
b: ["The Second Star to the Right", "⭐", "#F0D060"],
d: [["Hook's hook on a velvet cushion", "case", { relic: "hook", c: 0xC8C8D0 }], ["The Jolly Roger at anchor", "ship", { hull: 0x2A1A12, sail: 0x1A1A1A, flag: 1 }]],
w: [["Peter's dagger", "dagger", "c", { m: 0xC8C8D0, h: 0x4A6A2A }], ["Smee's cutlass", "cutlass", "u", { m: 0x9A9AA0, h: 0x6A2A2A }], ["Captain Hook's iron claw", "cutlass", "r", { m: 0x3A3A40, h: 0x1A1A1A, g: 0xE8D890, hook: 1 }]],
m: ["The Never Bird's nest-boat", "flyingcarpet", { coat: 0x8A6A3A, tack: 0xE8E0C0, nest: 1 }],
v: ["smuggler", "bandit", "Captain Hook's boatswain", "The pirates' hold"] });
bhnBook("kassel", "The Tales of Kassel", "🐺", "st:gbook", { shelf: "Grimm",
b: ["Teller of Tales", "📜", "#8A5A2A"],
d: [["The gingerbread house", "case", { relic: "ginger", c: 0xB8703A }], ["Dorothea Viehmann at the inn", "painting", { sky: 0x4A3A2A, ground: 0x6A4A2A, fig: 0x2A2A3A, lamp: 1 }]],
w: [["The huntsman's knife", "dagger", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["The tailor's sword, seven at one blow", "longsword", "u", { m: 0xC8C8D0, h: 0x3A6A3A }], ["The Juniper Tree's millstone hammer", "warhammer", "r", { m: 0x8A8A88, h: 0x6A4A2A, g: 0xE8D8A0 }]],
m: ["Falada, the talking horse", "horse", { coat: 0xF0F0F0, tack: 0xC89A3A }],
v: ["cellar", "werewolf", "The wolf of the deep wood", "The witch's cellars"] });
bhnBook("erebos", "The Descents", "🔥", "st:ebook", { shelf: "Myths",
b: ["Came Back Up", "🏛️", "#6A4AA0"],
d: [["A golden bough", "case", { relic: "bough", c: 0xE8C040 }], ["Charon's ferry on the Styx", "painting", { sky: 0x1A1A2A, ground: 0x2A2A3A, fig: 0x5A5A6A, water: 1 }]],
w: [["Aeneas's sword", "gladius", "c", { m: 0xB8902E, h: 0x6A2A2A }], ["Theseus's bronze club", "mace", "u", { m: 0xB8702E, h: 0x6A4A2A }], ["The lyre-staff of Orpheus", "lightstaff", "r", { m: 0xE8C040, h: 0xE8E0C8, g: 0xFFE8B0 }]],
m: ["Arion, the immortal horse", "horse", { coat: 0x1A1A1A, tack: 0xB8902E, mane: 0x2A4A3A }],
v: ["ossuary", "faceless", "A shade that would not cross", "The banks of the Acheron"] });
bhnBook("playerslife", "The Player's Life", "🎭", "st:sbook", { shelf: "Shakespeare",
b: ["Of the King's Men", "🎭", "#B8902E"],
d: [["The First Folio, open", "bookstand", { c: 0xE8D8B0 }], ["The Globe on the Bankside", "painting", { sky: 0x9AB8D8, ground: 0x6A6A4A, fig: 0xE8E0C8 }]],
w: [["A player's foil", "rapier", "c", { m: 0xC8C8D0, h: 0x6A2A2A }], ["Burbage's stage sword", "longsword", "u", { m: 0xE8E8F0, h: 0xB8902E }], ["Prospero's staff", "lightstaff", "r", { m: 0x6A4A2A, h: 0x3A2A1A, g: 0xD8E8FF }]],
m: ["The carriers' horse to Stratford", "horse", { coat: 0x6A4A2A, tack: 0x8A2A2A }],
v: ["cellar", "bandit", "The Paris Garden bear-ward", "Under the Globe's stage"] });
bhnBook("voyages", "The Extraordinary Voyages", "📕", "st:vbook", { shelf: "Verne",
b: ["Voyager Extraordinary", "🧭", "#B8702E"],
d: [["Verne's writing desk", "case", { relic: "desk", c: 0x6A4A2A }], ["The Nautilus in a bottle", "ship", { hull: 0x3A4A5A, sail: 0, sub: 1 }]],
w: [["Ned Land's harpoon", "javelin", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Robur's electric rifle", "rifle", "u", { m: 0x3A3A40, h: 0xB8702E, g: 0x8AD8FF }], ["Captain Nemo's air-gun", "pulserifle", "r", { m: 0xB8902E, h: 0x3A4A5A, g: 0x9AE8FF }]],
m: ["The Steam House's elephant", "elephant", { coat: 0x6A6A70, tack: 0xB8702E, steam: 1 }],
v: ["clock", "automaton", "A runaway steam-man", "The engine-rooms"] });
bhnBook("leagues", "Twenty Thousand Leagues Under the Sea", "📘", "st:vleagues", { shelf: "Verne",
b: ["Mobilis in Mobili", "🌊", "#1E4A8A"],
d: [["The Nautilus's organ pipes", "case", { relic: "organ", c: 0xB8902E }], ["The Nautilus off Vanikoro", "painting", { sky: 0x1A3A5A, ground: 0x0A2A4A, fig: 0x3A4A5A, water: 1 }]],
w: [["Ned Land's harpoon", "javelin", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Captain Nemo's diving knife", "dagger", "u", { m: 0xE8E8F0, h: 0xB8902E }], ["The Nautilus air-gun", "pulserifle", "r", { m: 0xB8902E, h: 0x2A3A4A, g: 0x9AE8FF }]],
m: ["The giant sea-tortoise", "elephant", { coat: 0x5A6A4A, tack: 0x1E4A8A, shell: 1 }],
v: ["temple", "deepshade", "The poulp, the great squid", "The coral cemetery"] });
bhnBook("eighty", "Around the World in Eighty Days", "🌍", "st:veighty", { shelf: "Verne",
b: ["Round in Eighty", "🕰️", "#B8902E"],
d: [["The Reform Club's whist table", "case", { relic: "cards", c: 0x2A6A3A }], ["Kiouni the elephant at the pagoda", "painting", { sky: 0xE8C890, ground: 0x8A6A3A, fig: 0x6A6A70 }]],
w: [["Passepartout's walking stick", "quarterstaff", "c", { m: 0x6A4A2A, h: 0x3A2A1A }], ["Fogg's Colt revolver", "revolver", "u", { m: 0x6A6A70, h: 0x6A4A2A }], ["The Sioux war-lance", "lance", "r", { m: 0xC8C8D0, h: 0x8A4A2A, g: 0xE8D8A0 }]],
m: ["Kiouni, the elephant", "elephant", { coat: 0x7A7A7A, tack: 0xD84A2A }],
v: ["tomb", "canyonscorp", "The temple's suttee guard", "Under the pagoda of Pillaji"] });
bhnBook("centre", "A Journey to the Centre of the Earth", "🌋", "st:vcentre", { shelf: "Verne",
b: ["Down Snaefells", "🌋", "#C84A2A"],
d: [["Saknussemm's runic parchment", "case", { relic: "parchment", c: 0xD8C8A0 }], ["The Lidenbrock Sea", "painting", { sky: 0x5A6A5A, ground: 0x3A4A3A, fig: 0x8A8A6A, water: 1 }]],
w: [["Hans's ice-pick", "warhammer", "c", { m: 0x8A8A90, h: 0x6A4A2A }], ["The Professor's pickaxe", "battleaxe", "u", { m: 0x8A8A90, h: 0x8A6A3A }], ["The Ruhmkorff lamp-staff", "lightstaff", "r", { m: 0xB8702E, h: 0x3A2A1A, g: 0xFFE8A0 }]],
m: ["The ichthyosaurus", "dragon", { coat: 0x3A5A6A, tack: 0x6A4A2A, sea: 1 }],
v: ["forge", "magmagolem", "The heart of the volcano", "Saknussemm's chimney"] });
bhnBook("island", "The Mysterious Island", "🏝️", "ct:vn_island", { shelf: "Verne",
b: ["Colonist of Lincoln Island", "🏝️", "#3A8A4A"],
d: [["Granite House's lift", "case", { relic: "lift", c: 0x8A8A88 }], ["The balloon over the sea", "painting", { sky: 0x8AA8C8, ground: 0x2A4A6A, fig: 0xD8C8A0, water: 1 }]],
w: [["Pencroft's axe", "battleaxe", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Herbert's bow", "longbow", "u", { m: 0x6A4A2A, h: 0x3A2A1A }], ["Captain Nemo's gift rifle", "rifle", "r", { m: 0xB8902E, h: 0x3A4A5A, g: 0x9AE8FF }]],
m: ["Jup's onager", "horse", { coat: 0x9A8A7A, tack: 0x3A8A4A }],
v: ["smuggler", "bandit", "Ayrton's convict leader", "The convicts' cave"] });
bhnBook("balloon", "Five Weeks in a Balloon", "🎈", "ct:vn_balloon", { shelf: "Verne",
b: ["Over Africa", "🎈", "#D8A040"],
d: [["The Victoria, in miniature", "case", { relic: "balloon", c: 0xD8A040 }], ["The source of the Nile", "painting", { sky: 0xE8C890, ground: 0x5A7A3A, fig: 0x2A4A6A, water: 1 }]],
w: [["Joe's knife", "dagger", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Kennedy's rifle", "rifle", "u", { m: 0x6A6A70, h: 0x8A6A3A }], ["The Victoria's anchor", "warhammer", "r", { m: 0x6A6A70, h: 0xD8A040, g: 0xE8D8A0 }]],
m: ["The Victoria", "airship", { coat: 0xD8A040, tack: 0x6A4A2A }],
v: ["tomb", "dustscorp", "The desert's great scorpion", "The dry wells"] });
bhnBook("robur", "Robur the Conqueror", "✈️", "ct:vn_robur", { shelf: "Verne",
b: ["Aboard the Albatross", "✈️", "#5A6A7A"],
d: [["The Albatross, in miniature", "case", { relic: "albatross", c: 0x5A6A7A }], ["The Albatross over the pole", "painting", { sky: 0xB8C8D8, ground: 0xE8F0F8, fig: 0x3A3A40 }]],
w: [["The Weldon Institute's cane", "quarterstaff", "c", { m: 0x3A2A1A, h: 0xB8902E }], ["Robur's electric pistol", "flintlock", "u", { m: 0x3A3A40, h: 0xB8702E, g: 0x8AD8FF }], ["The Albatross's propeller blade", "sunblade", "r", { m: 0xC8C8D0, h: 0x3A3A40, g: 0xA8E8FF }]],
m: ["The Go-Ahead's gondola", "airship", { coat: 0x8A6A3A, tack: 0x5A6A7A }],
v: ["clock", "sentinel", "Robur's mechanic", "The Albatross's workshop"] });
bhnBook("whitechapel", "The Autumn of Terror", "🔦", "st:wcbook", { shelf: "London",
b: ["Of the Star's newsroom", "📰", "#8A2A2A"],
d: [["A reporter's desk at the Star", "case", { relic: "desk", c: 0x3A2A1A }], ["Whitechapel High Street, 1888", "painting", { sky: 0x3A3A40, ground: 0x2A2A2A, fig: 0x5A4A3A, lamp: 1 }]],
w: [["A constable's truncheon", "mace", "c", { m: 0x2A2A2A, h: 0x2A2A2A }], ["Watson's service revolver", "revolver", "u", { m: 0x5A5A60, h: 0x3A2A1A }], ["Holmes's weighted hunting-crop", "mace", "r", { m: 0x3A2A1A, h: 0x8A6A3A, g: 0xE8D8A0 }]],
m: ["A Metropolitan Police horse", "horse", { coat: 0x2A1A12, tack: 0x1A1A2A }],
v: ["cellar", "bandit", "The letter-writer", "The cellars of Dorset Street"] });
bhnBook("jekyll", "Strange Case of Dr Jekyll and Mr Hyde", "⚗️", "st:jkbook", { shelf: "London",
b: ["Both Sides of the Glass", "⚗️", "#4A8A6A"],
d: [["Dr Jekyll's cheval-glass", "mirror", { c: 0x3A2A1A }], ["The salts and the phial", "case", { relic: "phials", c: 0xC8E8D8 }]],
w: [["Utterson's walking-stick", "quarterstaff", "c", { m: 0x3A2A1A, h: 0xB8902E }], ["Poole's axe at the cabinet door", "battleaxe", "u", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Hyde's heavy cane", "mace", "r", { m: 0x2A1A12, h: 0x1A1A1A, g: 0x8AFFB0 }]],
m: ["Dr Lanyon's carriage horse", "horse", { coat: 0x3A2A1A, tack: 0x1A1A1A }],
v: ["cellar", "hollowshade", "Mr Hyde's shadow", "Under Jekyll's laboratory"] });
bhnBook("hound", "The Hound of the Baskervilles", "🐕", "st:hbbook", { shelf: "London",
b: ["Out on the Moor", "🌫️", "#5A6A4A"],
d: [["The Baskerville portrait", "painting", { sky: 0x2A2A2A, ground: 0x3A2A1A, fig: 0x8A2A2A, frame: 0xB8902E }], ["A phosphorus-painted muzzle", "case", { relic: "muzzle", c: 0x9AFFB0 }]],
w: [["Sir Henry's boot", "sling", "c", { m: 0x3A2A1A, h: 0x3A2A1A }], ["Holmes's revolver", "revolver", "u", { m: 0x5A5A60, h: 0x3A2A1A }], ["Stapleton's butterfly-net staff", "quarterstaff", "r", { m: 0x6A4A2A, h: 0xE8E0C8, g: 0x9AFFB0 }]],
m: ["A Dartmoor pony", "horse", { coat: 0x6A4A2A, tack: 0x3A2A1A, pony: 1 }],
v: ["ruin", "timberwolf", "The phosphorus hound", "Grimpen Mire"] });
bhnBook("scarlet", "A Study in Scarlet", "🔎", "st:szbook", { shelf: "London",
b: ["The Scarlet Thread", "🧵", "#B82A2A"],
d: [["The ring on Brixton Road", "case", { relic: "ring", c: 0xE8C040 }], ["The great alkali plain", "painting", { sky: 0xE8C890, ground: 0xE8E0D0, fig: 0x6A4A2A }]],
w: [["Jefferson Hope's knife", "dagger", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["A Danite rifle", "leveraction", "u", { m: 0x6A6A70, h: 0x8A6A3A }], ["The pills in the box", "shuriken", "r", { m: 0xE8E8F0, h: 0xE8E8F0, g: 0xFFE8A0 }]],
m: ["Jefferson Hope's mustang", "horse", { coat: 0x8A5A2A, tack: 0x3A2A1A, paint: 1 }],
v: ["tomb", "dustscorp", "A Danite Avenging Angel", "The canyon of the Avenging Angels"] });
bhnBook("signfour", "The Sign of the Four", "🏴", "st:sxbook", { shelf: "London",
b: ["The Agra Treasure", "💰", "#D8A040"],
d: [["The empty Agra chest", "chest", { c: 0x3A2A1A, iron: 1 }], ["The steam launch on the Thames", "painting", { sky: 0x2A2A3A, ground: 0x1A2A3A, fig: 0x3A3A40, water: 1 }]],
w: [["Jonathan Small's wooden-leg club", "mace", "c", { m: 0x6A4A2A, h: 0x6A4A2A }], ["Toby the dog's leash", "monowhip", "u", { m: 0x6A4A2A, h: 0x3A2A1A }], ["Tonga's blowpipe", "javelin", "r", { m: 0x3A2A1A, h: 0x8A6A3A, g: 0x9AFFB0 }]],
m: ["The Aurora steam launch", "firechariot", { coat: 0x2A2A2A, tack: 0xB8902E }],
v: ["smuggler", "renegade", "The Andaman watchman", "Pondicherry Lodge's attic"] });
bhnBook("kensington", "Peter Pan in Kensington Gardens", "🍃", "st:kgbook", { shelf: "London and Neverland",
b: ["Betwixt-and-Between", "🍃", "#4A8A4A"],
d: [["The fairies' ball-gown", "case", { relic: "flower", c: 0xE8A0D0 }], ["The Serpentine at lock-out time", "painting", { sky: 0x3A3A6A, ground: 0x2A4A2A, fig: 0xE8E0C0, water: 1 }]],
w: [["Peter's pipe-staff", "quarterstaff", "c", { m: 0x8A6A3A, h: 0x4A6A2A }], ["The thrush's-nest shield", "dawnaegis", "u", { m: 0x8A6A3A, h: 0x6A4A2A }], ["Queen Mab's wand", "sparkwand", "r", { m: 0xE8E8F0, h: 0xE8C040, g: 0xFFE8F8 }]],
m: ["The thrush's nest", "flyingcarpet", { coat: 0x8A6A3A, tack: 0xE8E0C0, nest: 1 }],
v: ["fungal", "mirespider", "The Gardens' night-hunter", "Under the Broad Walk"] });
bhnBook("westminster", "Westminster, 1912", "🕰️", "st:wsbook", { shelf: "London",
b: ["Earth has not anything to show more fair", "🌅", "#D8A040"],
d: [["Big Ben's bell, small", "case", { relic: "bell", c: 0xB8902E }], ["Westminster Bridge at dawn", "painting", { sky: 0xE8B890, ground: 0x5A6A7A, fig: 0x6A6A60, water: 1 }]],
w: [["A guardsman's sword", "longsword", "c", { m: 0xE8E8F0, h: 0xB8902E }], ["The Black Rod", "mace", "u", { m: 0x1A1A1A, h: 0xE8C040 }], ["The Coronation Chair's sceptre", "lightstaff", "r", { m: 0xE8C040, h: 0xE8C040, g: 0xFFF0C0 }]],
m: ["A Household Cavalry charger", "horse", { coat: 0x1A1A1A, tack: 0xB82A2A }],
v: ["crypt", "restless", "A Plantagenet ghost", "Under the Abbey"] });
bhnBook("carbuncle", "The Blue Carbuncle", "💙", "st:bsbook", { shelf: "London",
b: ["Season of Forgiveness", "🪿", "#2A4AB8"],
d: [["The blue carbuncle", "case", { relic: "gem", c: 0x2A4AD8 }], ["Baker Street at Christmas", "painting", { sky: 0x2A2A3A, ground: 0xE8E8F0, fig: 0x5A3A2A, lamp: 1 }]],
w: [["Peterson's stick", "quarterstaff", "c", { m: 0x3A2A1A, h: 0x3A2A1A }], ["Holmes's lens-and-cane", "rapier", "u", { m: 0xC8C8D0, h: 0x3A2A1A }], ["The goose-hunter's cleaver", "khopesh", "r", { m: 0xC8C8D0, h: 0x6A4A2A, g: 0x8AA8FF }]],
m: ["A Covent Garden cart-horse", "horse", { coat: 0x8A6A4A, tack: 0x2A2A2A }],
v: ["cellar", "giantrat", "The thief's shadow", "Under Covent Garden market"] });
bhnBook("savillerow", "Seven, Saville Row", "🎩", "st:pmbook", { shelf: "London",
b: ["Exact to the Second", "⏱️", "#3A3A40"],
d: [["Fogg's chronometer", "case", { relic: "clock", c: 0xB8902E }], ["The Reform Club", "painting", { sky: 0x5A6A7A, ground: 0x3A3A3A, fig: 0x2A2A2A }]],
w: [["Fogg's umbrella", "rapier", "c", { m: 0x1A1A1A, h: 0x3A2A1A }], ["A Pall Mall swordstick", "rapier", "u", { m: 0xE8E8F0, h: 0x1A1A1A }], ["The wager's bank-notes, rolled", "mace", "r", { m: 0xD8E8C8, h: 0xB8902E, g: 0xE8F8D8 }]],
m: ["Fogg's hansom", "hansomcab", { coat: 0x1A1A1A, tack: 0xB8902E }],
v: ["cellar", "bandit", "The Bank of England robber", "The vaults of Threadneedle Street"] });
bhnBook("poe", "Poe's Dream-Land", "🐦‍⬛", "st:poebook", { shelf: "Poe and Paris",
b: ["Nevermore", "🐦‍⬛", "#2A2A2A"],
d: [["The bust of Pallas, with the raven", "statue", { stone: 0xE8E8E0, raven: 1 }], ["The House of Usher", "painting", { sky: 0x3A3A40, ground: 0x2A2A2A, fig: 0x5A5A50, water: 1 }]],
w: [["Montresor's trowel", "dagger", "c", { m: 0x8A8A90, h: 0x6A4A2A }], ["The Pit's pendulum blade", "moonscythe", "u", { m: 0xC8C8D0, h: 0x2A2A2A }], ["The Red Death's dagger", "dagger", "r", { m: 0xB82A2A, h: 0x1A1A1A, g: 0xFF4A4A }]],
m: ["The Metzengerstein horse", "horse", { coat: 0xB83A1A, tack: 0x1A1A1A, eyes: 0xFF6A3A }],
v: ["ossuary", "faceless", "The Masque's spectre", "The catacombs' far gallery"] });
bhnBook("notredame", "Notre-Dame de Paris", "🔔", "st:ndbook", { shelf: "Poe and Paris",
b: ["ΑΝΑΓΚΗ", "🔔", "#6A5A8A"],
d: [["Emmanuel, the great bell", "case", { relic: "bell", c: 0x6A6A60 }], ["Esmeralda's goat Djali", "statue", { stone: 0xE8E0D0, goat: 1 }]],
w: [["Quasimodo's bell-rope whip", "monowhip", "c", { m: 0x8A6A3A, h: 0x6A4A2A }], ["Phoebus's sword", "rapier", "u", { m: 0xE8E8F0, h: 0xE8C040 }], ["Frollo's iron key of the tower", "mace", "r", { m: 0x2A2A2A, h: 0x2A2A2A, g: 0xD8A0FF }]],
m: ["Phoebus's charger", "horse", { coat: 0xE8E0D0, tack: 0x2A4AB8 }],
v: ["crypt", "hollowshade", "The ghost of Montfaucon", "The vault of Montfaucon"] });
bhnBook("tormance", "A Voyage to Arcturus", "🌟", "st:arbook", { shelf: "Other worlds",
b: ["Muspel-light", "🌟", "#4A8AD8"],
d: [["The crystal torpedo", "case", { relic: "torpedo", c: 0xC8E8F8 }], ["Two suns over Tormance", "painting", { sky: 0xE8A0A0, ground: 0xC84A3A, fig: 0x4A8AD8, twosun: 1 }]],
w: [["Maskull's club", "mace", "c", { m: 0x6A4A6A, h: 0x3A2A3A }], ["Krag's knife", "dagger", "u", { m: 0x3A3A40, h: 0x1A1A1A }], ["Ulfire-blade of Surtur", "sunblade", "r", { m: 0x4A8AD8, h: 0x1A1A2A, g: 0x8AC8FF }]],
m: ["A shrowk of Lichstorm", "griffin", { coat: 0x6A4A8A, tack: 0xC84A3A }],
v: ["fungal", "acidwraith", "Crystalman's mask", "The Wombflash caves"] });
bhnBook("gulliver", "Gulliver's Travels", "🏝️", "st:gvbook", { shelf: "Other worlds",
b: ["Lemuel Gulliver, Traveller", "🧭", "#3A6A8A"],
d: [["Laputa in a glass", "case", { relic: "island", c: 0x8A8A88 }], ["The loadstone", "case", { relic: "stone", c: 0x3A3A40 }]],
w: [["A Lagado projector's spade", "halberd", "c", { m: 0x8A8A90, h: 0x6A4A2A }], ["A flapper's bladder-staff", "mace", "u", { m: 0xE8D8B0, h: 0x6A4A2A }], ["Glubbdubdrib's sorcerer's staff", "shadowtome", "r", { m: 0x3A2A4A, h: 0x1A1A2A, g: 0xB89AFF }]],
m: ["The Laputan chair-lift", "flyingcarpet", { coat: 0x8A8A88, tack: 0x3A6A8A }],
v: ["clock", "automaton", "The Academy's great engine", "The Grand Academy's cellars"] });
bhnBook("timemachine", "The Time Machine", "⏳", "st:tmbook", { shelf: "Other worlds",
b: ["Year 802,701", "⏳", "#B8902E"],
d: [["The Time Machine, model", "case", { relic: "machine", c: 0xB8902E }], ["The Palace of Green Porcelain", "painting", { sky: 0xE8C890, ground: 0x4A6A3A, fig: 0x5AAA7A }]],
w: [["The iron lever", "mace", "c", { m: 0x5A5A60, h: 0x5A5A60 }], ["Weena's flowers, wound on a staff", "mendstaff", "u", { m: 0xE8E0F0, h: 0x4A6A2A, g: 0xFFE8F8 }], ["Camphor torch of the Morlocks' bane", "firestaff", "r", { m: 0x8A6A3A, h: 0x3A2A1A, g: 0xFFC870 }]],
m: ["The Time Traveller's bicycle", "bicycle", { coat: 0xB8902E, tack: 0x1A1A1A }],
v: ["cellar", "hollowshade", "A Morlock of the deep wells", "The wells of the Morlocks"] });
bhnBook("lostworld", "The Lost World", "🦕", "st:lsbook", { shelf: "Other worlds",
b: ["On Maple White Land", "🦕", "#4A7A3A"],
d: [["A pterodactyl in a cage", "case", { relic: "ptero", c: 0x8A6A4A }], ["The plateau from the pinnacle", "painting", { sky: 0x9AB8D8, ground: 0x3A6A3A, fig: 0x5A4A3A }]],
w: [["Lord Roxton's express rifle", "rifle", "c", { m: 0x5A5A60, h: 0x8A6A3A }], ["The Accala spear", "spear", "u", { m: 0x8A8A88, h: 0x6A4A2A }], ["Challenger's umbrella", "mace", "r", { m: 0x1A1A1A, h: 0x3A2A1A, g: 0xE8D8A0 }]],
m: ["An iguanodon", "dragon", { coat: 0x5A6A3A, tack: 0x6A4A2A, dino: 1 }],
v: ["ruin", "wildbear", "The ape-men's king", "The ape-men's caves"] });
bhnBook("treasureisland", "Treasure Island", "🦜", "ti", { shelf: "Seas",
b: ["Pieces of Eight", "🦜", "#D8A040"],
d: [["Flint's map", "case", { relic: "map", c: 0xD8C8A0 }], ["The Hispaniola", "ship", { hull: 0x3A2A1A, sail: 0xE8E0C8 }]],
w: [["Jim's dirk", "dagger", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Israel Hands's pistol", "flintlock", "u", { m: 0x5A5A60, h: 0x6A4A2A }], ["Long John Silver's crutch", "mace", "r", { m: 0x6A4A2A, h: 0x3A2A1A, g: 0xE8D8A0 }]],
m: ["Ben Gunn's goat", "stag", { coat: 0xE8E0D0, tack: 0x6A4A2A, goat: 1 }],
v: ["smuggler", "roadraider", "Flint's ghost", "Ben Gunn's cave"] });
bhnBook("odyssey", "The Odyssey", "⛵", "ovy", { shelf: "Seas",
b: ["Home to Ithaca", "🏺", "#3A6AB8"],
d: [["Odysseus's great bow, unstrung", "case", { relic: "bow", c: 0x6A4A2A }], ["The ship past the Sirens", "painting", { sky: 0x8AB8E0, ground: 0x2A5A8A, fig: 0x6A4A2A, water: 1 }]],
w: [["A Phaeacian spear", "spear", "c", { m: 0xB8902E, h: 0x6A4A2A }], ["The sword of Achilles' armour", "gladius", "u", { m: 0xE8C040, h: 0x6A2A2A }], ["The bow of Odysseus", "longbow", "r", { m: 0x6A4A2A, h: 0xB8902E, g: 0xFFE8A0 }]],
m: ["Pegasus of the Muses", "pegasus", { coat: 0xF0F0F8, tack: 0xB8902E }],
v: ["temple", "mirelizard", "Scylla's lesser head", "The Cyclops's cave"] });
bhnBook("dracula", "Dracula", "🦇", "ext", { shelf: "Horror",
b: ["Band of Friends", "✝️", "#C8C8D0"],
d: [["Count Dracula's coffin, with its earth", "coffin", { c: 0x2A1A12, earth: 1 }], ["Carfax chapel candelabrum", "candelabrum", { c: 0x6A6A60 }]],
w: [["Van Helsing's stake and mallet", "mace", "c", { m: 0x8A6A3A, h: 0x6A4A2A, stake: 1 }], ["Quincey Morris's Bowie knife", "dagger", "u", { m: 0xE8E8F0, h: 0x3A2A1A }]],
m: ["The Count's black horse", "horse", { coat: 0x0A0A0A, tack: 0x1A1A1A, eyes: 0xD82A2A }],
v: ["crypt", "hollowshade", "The Count's shadow", "The Count's vault"] });
bhnBook("drakkyn", "Heart of the Drakkyn", "🐉", "ext", { shelf: "Obsidian Moon",
b: ["Child of Scales", "🐉", "#E8B84A"],
d: [["The four Scythe fragments on midnight-blue cloth", "cloth", { c: 0x141A3A }], ["The glowing map of Awen", "map", { c: 0xE8DCC0 }]],
w: [["Drake's rusty pipe", "mace", "c", { m: 0x8A5A3A, h: 0x5A3A2A }], ["A Frozen Guard ice spear", "spear", "u", { m: 0xC8E8F8, h: 0x6A8AA8 }], ["A forge copy of the Scythe of Thanatos", "halberd", "r", { m: 0x0A0A0E, h: 0x2A1A2A }]],
m: ["A Drakkyn Sky Guard war drake", "dragon", { coat: 0x8A6A2A, tack: 0xE8C040 }],
v: ["forge", "magmagolem", "The Forge Guardian", "The Trial of the Forge"] });
bhnBook("alice", "Alice's Adventures in Wonderland", "🐇", "st:wdbook", { shelf: "Classic stories",
b: ["Curiouser and Curiouser", "🫖", "#4A6AC0"],
d: [["The Mad Tea-Party's table", "case", { relic: "teaset", c: 0xE8E0F0 }], ["The Queen's croquet-ground", "painting", { sky: 0x9AC8E8, ground: 0x4A8A3A, fig: 0xD82A2A }]],
w: [["A flamingo croquet-mallet", "mace", "c", { m: 0xF0A0B0, h: 0xF0A0B0 }], ["The Knave of Hearts' pike", "halberd", "u", { m: 0xE8E8F0, h: 0xD82A2A }], ["The vorpal blade", "sunblade", "r", { m: 0xE8E8F0, h: 0x4A6AC0, g: 0xD8E8FF }]],
m: ["The Gryphon", "griffin", { coat: 0xB89A60, tack: 0x4A6AC0 }],
v: ["wizard", "discord", "The Queen of Hearts' executioner", "Under the rabbit-hole"] });
bhnBook("lookingglass", "Through the Looking-Glass", "♟️", "st:lkbook", { shelf: "Classic stories",
b: ["Queen Alice", "👑", "#C83A3A"],
d: [["The Red Queen and the White, from the hearth", "case", { relic: "chess", c: 0xE8E0D0 }], ["Looking-Glass Land from the little hill", "painting", { sky: 0x9AC8E8, ground: 0x5A9A3A, fig: 0xF0F0F0 }]],
w: [["The White Knight's sugar-loaf helmet mace", "mace", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Tweedledum's umbrella", "quarterstaff", "u", { m: 0x1E1E22, h: 0x5A3A22 }], ["The vorpal sword, snicker-snack", "longsword", "r", { m: 0xE8E8F0, h: 0xC83A3A, g: 0xD8E8FF }]],
m: ["The White Knight's horse, with anklets against sharks", "horse", { coat: 0xF0EEE8, tack: 0xB8902E }],
v: ["wizard", "discord", "The Jabberwock, with eyes of flame", "The tulgey wood"] });
bhnBook("tirnanog", "Oisín in Tír na nÓg", "🌊", "ct:tirnanog", { shelf: "Myths",
b: ["Three Hundred Years Young", "☘️", "#2E8A5E"],
d: [["Niamh's golden apple", "case", { relic: "apple", c: 0xE8C040 }], ["The white horse over the waves", "painting", { sky: 0xB8D8E8, ground: 0x3A7AAA, fig: 0xF0F0F0, water: 1 }]],
w: [["A Fianna spear", "spear", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Oisín's sword of the Fenians", "claymore", "u", { m: 0xE8E8F0, h: 0x2E8A5E }], ["The Dagda's harp-staff", "lightstaff", "r", { m: 0xE8C040, h: 0x6A4A2A, g: 0xD8FFE8 }]],
m: ["Embarr, Niamh's white horse", "horse", { coat: 0xF4F4F8, tack: 0xE8C040, mane: 0xF0F0F0 }],
v: ["ruin", "hilltroll", "The giant Fomor", "The Fomorian's tower"] });
bhnBook("perseus", "Perseus and Medusa", "🐍", "ct:perseus", { shelf: "Myths",
b: ["Gorgon-Slayer", "🐍", "#B8902E"],
d: [["The Gorgon's head, veiled", "case", { relic: "gorgon", c: 0x5A7A4A }], ["Andromeda on the rock", "painting", { sky: 0x8AB8E0, ground: 0x3A6AAA, fig: 0xE8D8C0, water: 1 }]],
w: [["Polydectes's guard spear", "spear", "c", { m: 0xB8902E, h: 0x6A4A2A }], ["The adamant harpe", "bonescythe", "u", { m: 0xE8E8F0, h: 0xB8902E }], ["Athene's mirror-shield", "dawnaegis", "r", { m: 0xE8E8F0, h: 0xB8902E, g: 0xD8E8FF }]],
m: ["Pegasus, born of Medusa", "pegasus", { coat: 0xF4F4F8, tack: 0xB8902E }],
v: ["temple", "mirelizard", "Medusa's sister Stheno", "The Gorgons' isle"] });
bhnBook("jason", "Jason and the Golden Fleece", "🐏", "ct:jason", { shelf: "Myths",
b: ["Argonaut", "🐏", "#E8C040"],
d: [["The Golden Fleece", "case", { relic: "fleece", c: 0xE8C040 }], ["The Argo between the Clashing Rocks", "ship", { hull: 0x6A4A2A, sail: 0xE8E0C8, oars: 1 }]],
w: [["A dragon's-tooth warrior's sword", "gladius", "c", { m: 0xB8902E, h: 0x3A2A1A }], ["Heracles's club", "mace", "u", { m: 0x6A4A2A, h: 0x6A4A2A }], ["Medea's charm-staff", "shadowtome", "r", { m: 0x6A2A6A, h: 0x2A1A2A, g: 0xD8A0FF }]],
m: ["The bronze bull of Aeetes", "elephant", { coat: 0xB8702E, tack: 0x6A2A2A, bull: 1, metal: 1 }],
v: ["temple", "mirelizard", "The sleepless dragon", "The grove of Ares"] });
bhnBook("mermaid", "The Little Mermaid", "🧜", "ct:mermaid", { shelf: "Andersen",
b: ["An Immortal Soul", "🫧", "#3A8AB8"],
d: [["The sea-witch's phial", "case", { relic: "phials", c: 0x6A4AAA }], ["The Sea King's palace", "painting", { sky: 0x1A4A6A, ground: 0x0A3A5A, fig: 0xE8B8C8, water: 1 }]],
w: [["A coral spear", "spear", "c", { m: 0xF08A70, h: 0xE8E0D0 }], ["The Sea King's trident", "trident", "u", { m: 0xE8C040, h: 0x2A6A8A }], ["The sisters' knife", "dagger", "r", { m: 0xE8E8F0, h: 0xE8E0F0, g: 0x9AE8FF }]],
m: ["A dolphin of the Sea King", "elephant", { coat: 0x6A8AA8, tack: 0xE8C040, sea: 1 }],
v: ["temple", "deepshade", "The sea-witch's polyp", "The sea-witch's house"] });
bhnBook("cthulhu", "The Call of Cthulhu", "🐙", "ct:cthulhu", { shelf: "Horror",
b: ["Ph'nglui", "🐙", "#3A6A5A"],
d: [["The bas-relief of clay", "case", { relic: "idol", c: 0x5A6A5A }], ["R'lyeh risen", "painting", { sky: 0x2A3A3A, ground: 0x1A2A2A, fig: 0x3A6A5A, water: 1 }]],
w: [["Inspector Legrasse's revolver", "revolver", "c", { m: 0x5A5A60, h: 0x3A2A1A }], ["A cultist's sacrificial knife", "dagger", "u", { m: 0x5A6A5A, h: 0x1A1A1A }], ["The Alert's steam-bow", "voidorb", "r", { m: 0x2A3A3A, h: 0x1A1A1A, g: 0x6AFFB0 }]],
m: ["The steam yacht Alert", "firechariot", { coat: 0x2A2A2A, tack: 0x5A6A5A }],
v: ["temple", "deepshade", "A spawn of Cthulhu", "The sunken city"] });
bhnBook("invisible", "The Invisible Man", "🕶️", "st:imbook", { shelf: "Wells",
b: ["Seen Through", "🕶️", "#8A8A90"],
d: [["Griffin's bandages and goggles", "case", { relic: "goggles", c: 0xE8E0D0 }], ["The Coach and Horses at Iping", "painting", { sky: 0xB8C8D8, ground: 0xE8E8F0, fig: 0x5A3A2A }]],
w: [["The Iping poker", "mace", "c", { m: 0x2A2A2A, h: 0x2A2A2A }], ["Dr Kemp's revolver", "revolver", "u", { m: 0x5A5A60, h: 0x3A2A1A }], ["Griffin's spade, swung unseen", "halberd", "r", { m: 0x8A8A90, h: 0x6A4A2A, g: 0xE8F0F8 }]],
m: ["The Iping carrier's horse", "horse", { coat: 0x6A5A4A, tack: 0x2A2A2A }],
v: ["cellar", "hollowshade", "The unseen man", "Kemp's cellar"] });
bhnBook("sleepyhollow", "The Legend of Sleepy Hollow", "🎃", "ct:sleepyhollow", { shelf: "Horror",
b: ["Crossed the Bridge", "🌉", "#E07A20"],
d: [["The shattered pumpkin", "case", { relic: "pumpkin", c: 0xE07A20 }], ["The church bridge at midnight", "painting", { sky: 0x1A1A2A, ground: 0x2A2A1A, fig: 0x0A0A0A }]],
w: [["Ichabod's ferule", "quarterstaff", "c", { m: 0x6A4A2A, h: 0x6A4A2A }], ["Brom Bones's hickory", "mace", "u", { m: 0x8A6A3A, h: 0x6A4A2A }], ["The Hessian's sabre", "cutlass", "r", { m: 0xC8C8D0, h: 0x1A1A1A, g: 0xFF8A3A }]],
m: ["Gunpowder, Ichabod's old horse", "horse", { coat: 0x6A6A60, tack: 0x3A2A1A, old: 1 }],
v: ["crypt", "restless", "The Headless Horseman", "The old Dutch burying-ground"] });
bhnBook("thor", "Thor at Utgard", "🔨", "ct:thor", { shelf: "Myths",
b: ["Drank from the Sea", "🔨", "#8A2A2A"],
d: [["Thor's goats' harness", "case", { relic: "harness", c: 0x8A6A3A }], ["Utgard-Loki's hall", "painting", { sky: 0x5A6A7A, ground: 0xE8E8F0, fig: 0x8A2A2A }]],
w: [["Thialfi's spear", "spear", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["A giant's iron glove", "arcanefist", "u", { m: 0x5A5A60, h: 0x3A2A1A }], ["The hammer of the thunderer", "thundermaul", "r", { m: 0x8A8A90, h: 0x6A2A2A, g: 0x9AD8FF }]],
m: ["Tanngrisnir, Thor's goat", "stag", { coat: 0x8A7A6A, tack: 0x8A2A2A, goat: 1 }],
v: ["frost", "rimeyeti", "Skrymir the giant", "Under Utgard"] });
bhnBook("odin", "Odin at Mimir's Well", "👁️", "ct:odin", { shelf: "Myths",
b: ["The Price of Wisdom", "👁️", "#3A4A8A"],
d: [["The runes, cut in ash", "case", { relic: "runes", c: 0x8A6A3A }], ["Yggdrasil", "painting", { sky: 0x3A4A6A, ground: 0x2A3A2A, fig: 0x6A8A4A, tree: 1 }]],
w: [["A berserker's axe", "battleaxe", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Huginn's feather blade", "rapier", "u", { m: 0x1A1A1A, h: 0x3A2A1A }], ["Gungnir, the spear that never misses", "heartlance", "r", { m: 0xE8E8F0, h: 0x6A4A2A, g: 0xD8E8FF }]],
m: ["Sleipnir, the eight-legged", "horse", { coat: 0x8A8A90, tack: 0x3A4A8A, mane: 0xE8E8F0 }],
v: ["frost", "hollowshade", "The draugr of the well", "The roots of Yggdrasil"] });
bhnBook("frankenstein", "Frankenstein", "⚡", "st:fkbook", { shelf: "Horror",
b: ["The Modern Prometheus", "⚡", "#6A8AB8"],
d: [["Victor's galvanic apparatus", "case", { relic: "apparatus", c: 0x8A6A3A }], ["The Creature on the ice", "painting", { sky: 0xB8C8D8, ground: 0xE8F0F8, fig: 0x2A2A30 }]],
w: [["Walton's ice-axe", "battleaxe", "c", { m: 0x8A8A90, h: 0x5A3A20 }], ["The Ingolstadt scalpel", "dagger", "u", { m: 0xD8D8E0, h: 0x1A1A1A }], ["The lightning rod of Ingolstadt", "stormrod", "r", { m: 0x8A6A3A, h: 0x3A2A1A, g: 0x9AD8FF }]],
m: ["The Creature's dog-sledge", "sleigh", { coat: 0x6A4A2A, tack: 0xE8E8F0 }],
v: ["frost", "rimeyeti", "The beast of the ice floes", "The ice caves of the north"] });
bhnBook("wukong", "Journey to the West", "🐒", "ct:wukong", { shelf: "Myths",
b: ["Great Sage Equal of Heaven", "🐒", "#D8A040"],
d: [["The palm-leaf fan", "case", { relic: "fan", c: 0x6A8A3A }], ["The Flaming Mountains", "painting", { sky: 0xE89A60, ground: 0xC84A2A, fig: 0xE8C040 }]],
w: [["Sandy's crescent spade", "halberd", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Pigsy's nine-tooth rake", "trident", "u", { m: 0xC8C8D0, h: 0x6A2A2A }], ["The As-You-Will gold-banded staff", "quarterstaff", "r", { m: 0xE8C040, h: 0xB82A2A, g: 0xFFE8A0 }]],
m: ["The White Dragon Horse", "horse", { coat: 0xF4F4F8, tack: 0xD8A040, mane: 0xE8E8F0 }],
v: ["forge", "brimfiend", "The Bull Demon King", "Princess Iron Fan's cave"] });
bhnBook("martians", "The War of the Worlds", "🛸", "st:mrbook", { shelf: "Wells",
b: ["Survivor of Woking", "🔴", "#B82A2A"],
d: [["A Martian cylinder's lid", "case", { relic: "cylinder", c: 0x8A8A88 }], ["Dead London", "painting", { sky: 0x8A6A5A, ground: 0x6A2A1A, fig: 0x5A5A60, weed: 1 }]],
w: [["The artilleryman's spade", "halberd", "c", { m: 0x8A8A90, h: 0x6A4A2A }], ["A Royal Artillery rifle", "rifle", "u", { m: 0x5A5A60, h: 0x8A6A3A }], ["The Heat-Ray, salvaged", "lasersniper", "r", { m: 0x8A8A88, h: 0x3A3A40, g: 0xFF8A3A }]],
m: ["The Thunder Child's pinnace", "firechariot", { coat: 0x2A2A2A, tack: 0x8A8A88 }],
v: ["clock", "tripod", "A Martian fighting-machine", "The pit on Horsell Common"] });
bhnBook("arabian", "The Arabian Nights", "🪔", "ct:arabian", { shelf: "Myths",
b: ["The Thousand and Second Night", "🪔", "#D8A040"],
d: [["Aladdin's lamp", "case", { relic: "lamp", c: 0xE8C040 }], ["The Roc over the valley of diamonds", "painting", { sky: 0xE8C890, ground: 0xB89A60, fig: 0x3A2A1A }]],
w: [["One of the Forty's scimitars", "scimitar", "c", { m: 0xC8C8D0, h: 0x6A2A2A }], ["Morgiana's dagger", "dagger", "u", { m: 0xE8E8F0, h: 0xE8C040 }], ["The jinn's ring-staff", "phoenixfan", "r", { m: 0xE8C040, h: 0x6A2A6A, g: 0xFFC870 }]],
m: ["The flying carpet", "flyingcarpet", { coat: 0xB82A2A, tack: 0xE8C040 }],
v: ["tomb", "canyonscorp", "The jinn of the brass bottle", "The Forty Thieves' cave"] });
bhnBook("gilgamesh", "The Epic of Gilgamesh", "🦁", "ct:gilgamesh", { shelf: "Myths",
b: ["He Who Saw the Deep", "🌊", "#B8902E"],
d: [["The tablet of the flood", "case", { relic: "tablet", c: 0xC8A878 }], ["The walls of Uruk", "painting", { sky: 0xE8C890, ground: 0xC8A060, fig: 0x8A6A3A }]],
w: [["Enkidu's club", "mace", "c", { m: 0x6A4A2A, h: 0x6A4A2A }], ["Gilgamesh's axe of the cedar forest", "battleaxe", "u", { m: 0xB8902E, h: 0x6A4A2A }], ["The sword that felled Humbaba", "khopesh", "r", { m: 0xE8C040, h: 0x3A2A1A, g: 0xFFE8A0 }]],
m: ["The Bull of Heaven", "elephant", { coat: 0x8A5A2A, tack: 0xE8C040, bull: 1 }],
v: ["tomb", "canyonscorp", "The scorpion-man of Mashu", "The tunnel under Mount Mashu"] });
bhnBook("columbiad", "From the Earth to the Moon", "🚀", "st:vearthmoon", { shelf: "Verne",
b: ["Member of the Gun Club", "🎯", "#5A5A60"],
d: [["The projectile, in miniature", "case", { relic: "shell", c: 0xC8C8D0 }], ["The Columbiad at Stone's Hill", "painting", { sky: 0x2A2A3A, ground: 0x6A5A4A, fig: 0xE8E8F0 }]],
w: [["J. T. Maston's hook", "dagger", "c", { m: 0x8A8A90, h: 0x3A2A1A }], ["Captain Nicholl's plate-pistol", "flintlock", "u", { m: 0x5A5A60, h: 0x6A4A2A }], ["The Columbiad's guncotton charge", "grenadelauncher", "r", { m: 0x5A5A60, h: 0x3A3A40, g: 0xFFC870 }]],
m: ["The aluminium projectile", "saucer", { coat: 0xC8C8D0, tack: 0x5A5A60 }],
v: ["forge", "magmagolem", "The foundry's molten heart", "The Columbiad's casting-pit"] });
bhnBook("roundmoon", "Round the Moon", "🌖", "st:vroundmoon", { shelf: "Verne",
b: ["Round the Moon and Home", "🌖", "#8A9AB8"],
d: [["Barbicane's dominoes, from the floating projectile", "case", { relic: "cards", c: 0xF2F2EE }], ["Tycho in sunlight, from the scuttle", "painting", { sky: 0x02020A, ground: 0x8A8A86, fig: 0xE8E8E0 }]],
w: [["Michel Ardan's walking cane", "quarterstaff", "c", { m: 0x5A3A22, h: 0xB8902E }], ["Nicholl's sounding-lead flail", "mace", "u", { m: 0x6A6A70, h: 0x3A2A1A }], ["The rocket-tube of the dead point", "grenadelauncher", "r", { m: 0xC8C8D0, h: 0x3A3A40, g: 0xFFC870 }]],
m: ["The aluminium projectile, afloat", "saucer", { coat: 0xD8DCE0, tack: 0x1E2A4A }],
v: ["temple", "deepshade", "The bolide of the long night", "The far side of the Moon"] });
bhnBook("egypt", "The Weighing of the Heart", "⚖️", "ct:egypt", { shelf: "Myths",
b: ["True of Voice", "🪶", "#2A6AB8"],
d: [["The scales of Ma'at", "case", { relic: "scales", c: 0xE8C040 }], ["The boat of the sun", "painting", { sky: 0x1A2A5A, ground: 0xC8A060, fig: 0xE8C040 }]],
w: [["A temple guard's khopesh", "khopesh", "c", { m: 0xB8902E, h: 0x2A6AB8 }], ["Anubis's flail", "flail", "u", { m: 0x1A1A1A, h: 0xE8C040 }], ["The was-sceptre of the gods", "lightstaff", "r", { m: 0xE8C040, h: 0x2A6AB8, g: 0xFFE8A0 }]],
m: ["The solar barque", "firechariot", { coat: 0xE8C040, tack: 0x2A6AB8 }],
v: ["tomb", "restless", "Ammit, the devourer", "The twelve gates of the night"] });
bhnBook("yokai", "The Yokai of the Shrine Path", "🏮", "ct:yokai", { shelf: "Myths",
b: ["Walked with the Night Parade", "🏮", "#D84A2A"],
d: [["Bunbuku's kettle", "case", { relic: "kettle", c: 0x5A5A50 }], ["The fox's lanterns", "lamp", { c: 0xE87A3A, paper: 1 }]],
w: [["A shrine guard's naginata", "halberd", "c", { m: 0xE8E8F0, h: 0x8A2A2A }], ["A ronin's katana", "katana", "u", { m: 0xE8E8F0, h: 0x1A1A1A }], ["The kitsune's fox-fire fan", "phoenixfan", "r", { m: 0xE8C040, h: 0xD84A2A, g: 0x9AD8FF }]],
m: ["A great tanuki", "stag", { coat: 0x6A5A3A, tack: 0xD84A2A, tanuki: 1 }],
v: ["temple", "faceless", "The noppera-bo", "The shrine's under-path"] });
bhnBook("robinhood", "Robin Hood", "🏹", "ct:robinhood", { shelf: "Greenwold",
b: ["The Silver Arrow", "🏹", "#3A6A2A"],
d: [["The silver arrow", "case", { relic: "arrow", c: 0xE8E8F0 }], ["The greenwood tree", "painting", { sky: 0x8AB8D8, ground: 0x3A6A2A, fig: 0x2A5A2A, tree: 1 }]],
w: [["Little John's quarterstaff", "quarterstaff", "c", { m: 0x6A4A2A, h: 0x6A4A2A }], ["Friar Tuck's broadsword", "longsword", "u", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Robin's yew longbow", "longbow", "r", { m: 0x8A5A2A, h: 0x2A5A2A, g: 0xE8F0D8 }]],
m: ["The Sheriff's grey", "horse", { coat: 0x9A9A98, tack: 0x2A5A2A }],
v: ["ruin", "bandit", "Guy of Gisborne", "Nottingham Castle's dungeon"] });
bhnBook("arthur", "King Arthur and His Knights", "🗡️", "ct:arthur", { shelf: "Greenwold",
b: ["Of the Round Table", "🛡️", "#2A4A8A"],
d: [["The sword in the stone", "case", { relic: "stone", c: 0x8A8A88, sword: 1 }], ["The Round Table", "painting", { sky: 0x3A3A40, ground: 0x6A4A2A, fig: 0xE8C040 }]],
w: [["Sir Kay's sword", "longsword", "c", { m: 0xC8C8D0, h: 0x2A4A8A }], ["A knight's lance", "lance", "u", { m: 0xE8E8F0, h: 0x8A2A2A }], ["Excalibur", "sunblade", "r", { m: 0xE8E8F0, h: 0xE8C040, g: 0xD8E8FF }]],
m: ["Arthur's white charger", "horse", { coat: 0xF4F4F8, tack: 0x2A4A8A }],
v: ["crypt", "renegade", "The Black Knight", "The Perilous Chapel"] });
bhnBook("quixote", "Don Quixote", "🛡️", "ct:quixote", { shelf: "Greenwold",
b: ["Knight of the Sorrowful Countenance", "🌾", "#B8902E"],
d: [["Mambrino's helmet (a barber's basin)", "case", { relic: "basin", c: 0xE8C040 }], ["The windmills of La Mancha", "painting", { sky: 0x9AC8E8, ground: 0xC8A860, fig: 0xE8E0D0 }]],
w: [["Sancho's cudgel", "mace", "c", { m: 0x6A4A2A, h: 0x6A4A2A }], ["Don Quixote's lance", "lance", "u", { m: 0xC8C8D0, h: 0x6A4A2A }], ["The sword of Amadis", "longsword", "r", { m: 0xE8E8F0, h: 0xB8902E, g: 0xFFE8A0 }]],
m: ["Rocinante", "horse", { coat: 0x8A7A6A, tack: 0x6A4A2A, old: 1 }],
v: ["ruin", "hilltroll", "The giant Briareus (or a windmill)", "The Cave of Montesinos"] });
bhnBook("mothergoose", "Mother Goose", "🪿", "ct:mothergoose", { shelf: "Kids' tales",
b: ["Hey Diddle Diddle", "🌙", "#E8C040"],
d: [["Humpty Dumpty on his wall", "statue", { stone: 0xE8E0D0, egg: 1 }], ["The cow jumped over the moon", "painting", { sky: 0x1A2A5A, ground: 0x3A6A3A, fig: 0xE8E0D0, moon: 1 }]],
w: [["Little Boy Blue's horn", "windfan", "c", { m: 0xE8C040, h: 0x2A4AB8 }], ["The knave's tart-tray", "dawnaegis", "u", { m: 0xC8C8D0, h: 0xD82A2A }], ["Old King Cole's sceptre", "lightstaff", "r", { m: 0xE8C040, h: 0xB82A2A, g: 0xFFE8A0 }]],
m: ["Mother Goose's gander", "pegasus", { coat: 0xF4F4F8, tack: 0xE8C040, goose: 1 }],
v: ["cellar", "giantrat", "The rat that ate the malt", "The house that Jack built"] });
bhnBook("pinocchio", "Pinocchio", "🤥", "ct:pinocchio", { shelf: "Kids' tales",
b: ["A Real Boy", "🪵", "#8A5A2A"],
d: [["Geppetto's workbench", "case", { relic: "bench", c: 0x8A6A3A }], ["Inside the great shark", "painting", { sky: 0x1A1A2A, ground: 0x3A2A2A, fig: 0xE8C870, lamp: 1 }]],
w: [["Geppetto's mallet", "warhammer", "c", { m: 0x8A6A3A, h: 0x6A4A2A }], ["The Cat and the Fox's knife", "dagger", "u", { m: 0xC8C8D0, h: 0x3A2A1A }], ["The Blue Fairy's wand", "sparkwand", "r", { m: 0x6AA8E8, h: 0xE8E8F0, g: 0xA8D8FF }]],
m: ["The green pigeon", "pegasus", { coat: 0x5AAA6A, tack: 0x8A5A2A, bird: 1 }],
v: ["smuggler", "roadraider", "The Terrible Shark", "The Land of Toys"] });
bhnBook("threepigs", "The Three Little Pigs and Goldilocks", "🐷", "ct:threepigs", { shelf: "Kids' tales",
b: ["Not by the Hair of My Chinny-Chin-Chin", "🧱", "#B84A2A"],
d: [["The bears' three bowls", "case", { relic: "bowls", c: 0x8A6A3A }], ["The house of bricks", "painting", { sky: 0x9AC8E8, ground: 0x5A8A3A, fig: 0xB84A2A }]],
w: [["The straw-pig's pitchfork", "trident", "c", { m: 0x8A8A90, h: 0xC8A040 }], ["The brick-pig's trowel", "dagger", "u", { m: 0x8A8A90, h: 0x6A4A2A }], ["The great bear's paw", "arcanefist", "r", { m: 0x6A4A2A, h: 0x6A4A2A, g: 0xE8C890 }]],
m: ["The great big bear", "stag", { coat: 0x6A4A2A, tack: 0xB84A2A, bear: 1 }],
v: ["ruin", "timberwolf", "The big bad wolf", "Under the bears' cottage"] });
bhnBook("lilliput", "Gulliver in Lilliput", "🏰", "ct:lilliput", { shelf: "Other worlds",
b: ["Quinbus Flestrin, the Man-Mountain", "🏰", "#3A6A8A"],
d: [["The Emperor's palace, life size", "case", { relic: "castle", c: 0xE8D8B0 }], ["The fleet of Blefuscu, towed", "ship", { hull: 0x6A4A2A, sail: 0xE8E0C8, fleet: 1 }]],
w: [["A Lilliputian pike (very small)", "spear", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Gulliver's hanger", "cutlass", "u", { m: 0xC8C8D0, h: 0x3A2A1A }], ["Gulliver's pistol", "flintlock", "r", { m: 0x5A5A60, h: 0x6A4A2A, g: 0xFFE8A0 }]],
m: ["The Emperor's tiny horse (it is a charger to them)", "horse", { coat: 0xE8E0D0, tack: 0xB82A2A, pony: 1 }],
v: ["dwarf", "tunnelgob", "Blefuscu's admiral", "The Blefuscudian arsenal"] });
bhnBook("beowulf", "Beowulf", "🐉", "ct:beowulf", { shelf: "Myths",
b: ["Hrunting and Heorot", "🐉", "#8A6A2A"],
d: [["Grendel's arm, nailed up", "case", { relic: "arm", c: 0x5A6A4A }], ["Heorot, the mead-hall", "painting", { sky: 0x2A2A3A, ground: 0x3A2A1A, fig: 0xE8C040, lamp: 1 }]],
w: [["A Geat's spear", "spear", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["Hrunting", "longsword", "u", { m: 0xC8C8D0, h: 0x3A2A1A }], ["The giant-sword of the mere", "claymore", "r", { m: 0xE8E8F0, h: 0xE8C040, g: 0xFFE8A0 }]],
m: ["The fire-dragon", "dragon", { coat: 0x8A2A1A, tack: 0xE8C040 }],
v: ["temple", "deepshade", "Grendel's mother", "The hall under the mere"] });
bhnBook("phantom", "The Phantom of the Opera", "🎭", "st:phbook", { shelf: "Poe and Paris",
b: ["The Angel of Music", "🎼", "#8A2A3A"],
d: [["The Phantom's mask", "case", { relic: "mask", c: 0xF0F0F0 }], ["The great chandelier", "candelabrum", { c: 0xE8C040, big: 1 }]],
w: [["The Persian's lasso", "monowhip", "c", { m: 0x8A6A3A, h: 0x1A1A1A }], ["Raoul's sword", "rapier", "u", { m: 0xE8E8F0, h: 0xE8C040 }], ["The Punjab lasso of Erik", "monowhip", "r", { m: 0x6A2A2A, h: 0x1A1A1A, g: 0xFFD8A0 }]],
m: ["César, the Phantom's white horse", "horse", { coat: 0xF4F4F8, tack: 0x1A1A1A }],
v: ["cellar", "hollowshade", "Erik's torture-chamber", "The lake under the Opera"] });
bhnBook("cavor", "The First Men in the Moon", "🌑", "ct:cavor", { shelf: "Wells",
b: ["Cavorite", "🌑", "#5A6A8A"],
d: [["Cavor's sphere", "case", { relic: "sphere", c: 0x6A6A70 }], ["The Grand Lunar", "painting", { sky: 0x0A0A1A, ground: 0x6A6A70, fig: 0x8AC8E8 }]],
w: [["Bedford's crowbar", "mace", "c", { m: 0x5A5A60, h: 0x5A5A60 }], ["A Selenite goad", "spear", "u", { m: 0x8AC8E8, h: 0x6A6A70 }], ["The gold chain of the Moon", "monowhip", "r", { m: 0xE8C040, h: 0xE8C040, g: 0xFFE8A0 }]],
m: ["A mooncalf", "elephant", { coat: 0xC8C0B0, tack: 0x5A6A8A, moon: 1 }],
v: ["fungal", "selenite", "A Selenite guard", "The Moon's inner caverns"] });
bhnBook("lowell", "The Canals of Mars", "🔭", "ct:lowell", { shelf: "Wells",
b: ["Canali", "🔭", "#B84A2A"],
d: [["Lowell's telescope", "case", { relic: "telescope", c: 0x3A3A40 }], ["Lowell's map of Mars", "painting", { sky: 0x1A1A2A, ground: 0xC86A3A, fig: 0x2A4A6A }]],
w: [["A Flagstaff surveyor's rod", "quarterstaff", "c", { m: 0xC8C8D0, h: 0x6A4A2A }], ["A rover's arc-caster", "arccaster", "u", { m: 0x8A8A88, h: 0x3A3A40 }], ["The red planet's rail-gun", "railgun", "r", { m: 0xC86A3A, h: 0x3A3A40, g: 0xFF9A6A }]],
m: ["A Mars dust-runner", "saucer", { coat: 0xC86A3A, tack: 0x5A5A60 }],
v: ["clock", "martian", "A Martian of the canals", "Under the dry canal"] });
bhnBook("tarzan", "Tarzan of the Apes", "🌴", "st:tzbook", { shelf: "Other worlds",
b: ["Lord of the Jungle", "🌴", "#3A6A2A"],
d: [["His father's hunting knife", "case", { relic: "knife", c: 0xC8C8D0 }], ["The cabin by the beach", "painting", { sky: 0x8AC8E8, ground: 0x3A6A2A, fig: 0x6A4A2A, water: 1 }]],
w: [["A grass rope", "monowhip", "c", { m: 0x8A7A4A, h: 0x6A5A3A }], ["D'Arnot's revolver", "revolver", "u", { m: 0x5A5A60, h: 0x3A2A1A }], ["Kala's son's knife", "dagger", "r", { m: 0xE8E8F0, h: 0x6A4A2A, g: 0xE8F0D8 }]],
m: ["Tantor, the elephant", "elephant", { coat: 0x7A7A7A, tack: 0x3A6A2A }],
v: ["ruin", "wildbear", "Kerchak, king of the apes", "The ape tribe's amphitheatre"] });
(function () {
var P = [
["sh_romeo", "Romeo and Juliet", "🌹", "Star-Crossed", "#B82A3A", ["The balcony", "painting", { sky: 0x1A2A4A, ground: 0x6A6A5A, fig: 0xE8D8C0, moon: 1 }], ["The apothecary's phial", "case", { relic: "phials", c: 0x6A4AAA }], ["Tybalt's rapier", "rapier"], ["Mercutio's sword", "rapier"], ["The Prince's sword of Verona", "sunblade"], ["A Montague's horse", "horse", { coat: 0x3A2A1A, tack: 0xB82A3A }], ["cellar", "renegade", "Tybalt's ghost", "The Capulets' tomb"]],
["sh_hamlet", "Hamlet", "💀", "The Rest Is Silence", "#2A2A3A", ["Yorick's skull", "case", { relic: "skull", c: 0xE8E0D0 }], ["Elsinore's battlements", "painting", { sky: 0x1A1A2A, ground: 0x3A3A40, fig: 0x8A8A90 }], ["Laertes's foil", "rapier"], ["The poisoned rapier", "rapier"], ["The ghost's sword", "sunblade"], ["A Danish courser", "horse", { coat: 0x1A1A1A, tack: 0x2A2A3A }], ["crypt", "restless", "The ghost of the old King", "Under Elsinore"]],
["sh_macbeth", "Macbeth", "🗡️", "Birnam Wood Has Come", "#4A1A1A", ["The witches' cauldron", "case", { relic: "cauldron", c: 0x2A2A2A }], ["Glamis by night", "painting", { sky: 0x1A1A2A, ground: 0x2A3A2A, fig: 0x5A2A2A }], ["A thane's dirk", "dagger"], ["Macduff's claymore", "claymore"], ["The dagger I see before me", "dagger"], ["A Highland garron", "horse", { coat: 0x6A5A4A, tack: 0x4A1A1A, pony: 1 }], ["cellar", "hollowshade", "Banquo's ghost", "The witches' cave"]],
["sh_dream", "A Midsummer Night's Dream", "🌙", "Lord, What Fools", "#6A4AA0", ["Bottom's ass's head", "case", { relic: "asshead", c: 0x8A7A6A }], ["Titania's bower", "painting", { sky: 0x1A2A4A, ground: 0x2A4A2A, fig: 0xE8D8F0 }], ["Puck's switch", "quarterstaff"], ["Oberon's bow", "longbow"], ["The love-in-idleness wand", "sparkwand"], ["Titania's moth", "pegasus", { coat: 0xE8E0F0, tack: 0x6A4AA0, bird: 1 }], ["fungal", "mirespider", "The wood's night-spider", "The heart of the wood"]],
["sh_tempest", "The Tempest", "🌀", "Such Stuff as Dreams", "#3A6A8A", ["Prospero's book", "bookstand", { c: 0xD8C8A0 }], ["The wreck off the isle", "ship", { hull: 0x3A2A1A, sail: 0xE8E0C8, wreck: 1 }], ["Trinculo's bottle-club", "mace"], ["Ferdinand's sword", "longsword"], ["Prospero's staff", "lightstaff"], ["Ariel's cloud", "flyingcarpet", { coat: 0xE8F0F8, tack: 0x3A6A8A, cloud: 1 }], ["temple", "deepshade", "Caliban's fear", "Sycorax's cave"]],
["sh_caesar", "Julius Caesar", "🏛️", "Et Tu", "#8A2A2A", ["Caesar's laurel", "case", { relic: "laurel", c: 0xE8C040 }], ["The Senate on the Ides", "painting", { sky: 0xE8D8C0, ground: 0xC8B898, fig: 0xE8E8F0 }], ["A conspirator's pugio", "dagger"], ["Brutus's gladius", "gladius"], ["Caesar's eagle-standard", "heartlance"], ["A Roman cavalry horse", "horse", { coat: 0x8A5A2A, tack: 0x8A2A2A }], ["tomb", "restless", "Caesar's ghost at Philippi", "Under the Capitol"]],
["sh_lear", "King Lear", "👑", "Nothing Will Come of Nothing", "#5A5A6A", ["Lear's crown of weeds", "case", { relic: "crown", c: 0x6A8A4A }], ["The heath in the storm", "painting", { sky: 0x2A2A3A, ground: 0x3A4A2A, fig: 0x8A8A90 }], ["Edgar's staff", "quarterstaff"], ["Kent's sword", "longsword"], ["The storm's own rod", "stormrod"], ["Gloucester's horse", "horse", { coat: 0x6A6A60, tack: 0x5A5A6A }], ["ruin", "bandit", "Edmund", "Dover's cliff-caves"]],
["sh_othello", "Othello", "🧣", "The Green-Eyed Monster", "#2A4A3A", ["The handkerchief, spotted with strawberries", "case", { relic: "cloth", c: 0xE8E0D0 }], ["Cyprus harbour", "painting", { sky: 0x8AB8E0, ground: 0x3A6AAA, fig: 0xE8D8C0, water: 1 }], ["Iago's dagger", "dagger"], ["Cassio's sword", "rapier"], ["The sword of Spain, the ice-brook's temper", "sunblade"], ["A Venetian galley's horse", "horse", { coat: 0x1A1A1A, tack: 0x2A4A3A }], ["smuggler", "renegade", "Iago", "The citadel's cellars"]],
["sh_twelfth", "Twelfth Night", "⛵", "If Music Be the Food of Love", "#D8A040", ["Malvolio's yellow stockings", "case", { relic: "cloth", c: 0xE8D040 }], ["The shore of Illyria", "painting", { sky: 0x8AB8E0, ground: 0xE8D8B0, fig: 0x6A4A2A, water: 1 }], ["Sir Andrew's sword", "rapier"], ["Sebastian's sword", "longsword"], ["Feste's lute-staff", "lightstaff"], ["Orsino's palfrey", "horse", { coat: 0xE8E0D0, tack: 0xD8A040 }], ["cellar", "bandit", "Sir Toby's rival", "Olivia's cellar"]],
["sh_muchado", "Much Ado About Nothing", "💐", "Merry War", "#D86A6A", ["The masked ball's mask", "case", { relic: "mask", c: 0xE8C040 }], ["Messina's orchard", "painting", { sky: 0x9AC8E8, ground: 0x4A8A3A, fig: 0xE8D8C0 }], ["Dogberry's bill", "halberd"], ["Claudio's sword", "rapier"], ["Benedick's sword", "longsword"], ["Don Pedro's charger", "horse", { coat: 0x8A5A2A, tack: 0xD86A6A }], ["cellar", "bandit", "Don John", "The watch's prison"]],
["sh_asyou", "As You Like It", "🌳", "All the World's a Stage", "#3A6A2A", ["Orlando's verses on the trees", "painting", { sky: 0x8AB8D8, ground: 0x3A6A2A, fig: 0x6A4A2A, tree: 1 }], ["Touchstone's bauble", "case", { relic: "bauble", c: 0xE8C040 }], ["Charles the wrestler's belt", "arcanefist"], ["Orlando's sword", "longsword"], ["The Duke's hunting bow", "longbow"], ["A Forest of Arden stag", "stag", { coat: 0x8A6A3A, tack: 0x3A6A2A }], ["ruin", "wildboar", "The lioness of Arden", "The forest's den"]],
["sh_merchant", "The Merchant of Venice", "⚖️", "The Quality of Mercy", "#2A4A6A", ["Portia's three caskets", "case", { relic: "caskets", c: 0xE8C040 }], ["The Rialto", "painting", { sky: 0x9AB8D8, ground: 0x2A5A6A, fig: 0xE8D8C0, water: 1 }], ["A Venetian stiletto", "dagger"], ["Bassanio's sword", "rapier"], ["Portia's scales", "dawnaegis"], ["A Belmont gondola", "firechariot", { coat: 0x1A1A1A, tack: 0xE8C040 }], ["smuggler", "bandit", "A Rialto cutpurse", "The Rialto's cellars"]],
["sh_henry", "Henry V", "🏴", "Once More unto the Breach", "#2A3A8A", ["The crown at Agincourt", "case", { relic: "crown", c: 0xE8C040 }], ["Agincourt", "painting", { sky: 0x8A9AAA, ground: 0x4A5A3A, fig: 0x2A3A8A }], ["An English bill", "halberd"], ["Fluellen's sword", "longsword"], ["The longbow of Agincourt", "longbow"], ["The King's warhorse", "horse", { coat: 0xE8E0D0, tack: 0x2A3A8A }], ["ruin", "renegade", "The Dauphin's champion", "Harfleur's breach"]],
["sh_richard", "Richard III", "🐗", "My Kingdom for a Horse", "#4A2A4A", ["The white boar badge", "case", { relic: "boar", c: 0xE8E8F0 }], ["The Tower", "painting", { sky: 0x5A5A6A, ground: 0x3A3A40, fig: 0x4A2A4A }], ["A murderer's dagger", "dagger"], ["Richmond's sword", "longsword"], ["Richard's battle-axe", "battleaxe"], ["White Surrey", "horse", { coat: 0xF4F4F8, tack: 0x4A2A4A }], ["crypt", "restless", "The princes' ghosts", "The Tower's cellars"]],
["sh_winter", "The Winter's Tale", "🐻", "Exit, Pursued by a Bear", "#6A8AB8", ["Hermione's statue", "statue", { stone: 0xE8E8E0 }], ["The coast of Bohemia", "painting", { sky: 0x8A9AAA, ground: 0xE8F0F8, fig: 0x6A4A2A }], ["Autolycus's knife", "dagger"], ["Polixenes's sword", "longsword"], ["The oracle's staff", "lightstaff"], ["The bear", "stag", { coat: 0x3A2A1A, tack: 0x6A8AB8, bear: 1 }], ["frost", "snowbear", "The bear of Bohemia", "The bear's cave"]],
["sh_antony", "Antony and Cleopatra", "🐍", "Infinite Variety", "#B8902E", ["Cleopatra's asp basket", "case", { relic: "basket", c: 0x8A6A3A }], ["The barge on the Cydnus", "ship", { hull: 0xE8C040, sail: 0xB82A6A }], ["An Egyptian khopesh", "khopesh"], ["Antony's sword", "gladius"], ["Cleopatra's sceptre", "lightstaff"], ["Cleopatra's barge", "firechariot", { coat: 0xE8C040, tack: 0xB82A6A }], ["tomb", "canyonscorp", "The asp", "Cleopatra's monument"]]
];
var looks = { rapier: { m: 0xE8E8F0, h: 0x3A2A1A }, longsword: { m: 0xC8C8D0, h: 0x3A2A1A }, dagger: { m: 0xC8C8D0, h: 0x2A2A2A }, claymore: { m: 0xC8C8D0, h: 0x6A4A2A }, gladius: { m: 0xB8902E, h: 0x6A2A2A },
halberd: { m: 0xC8C8D0, h: 0x6A4A2A }, quarterstaff: { m: 0x6A4A2A, h: 0x6A4A2A }, mace: { m: 0x6A4A2A, h: 0x3A2A1A }, longbow: { m: 0x8A5A2A, h: 0x3A2A1A }, khopesh: { m: 0xB8902E, h: 0x2A6AB8 }, battleaxe: { m: 0xC8C8D0, h: 0x6A4A2A }, arcanefist: { m: 0x6A4A2A, h: 0x3A2A1A } };
P.forEach(function (p) {
var w = [[p[7][0], p[7][1], "c", Object.assign({}, looks[p[7][1]] || { m: 0xC8C8D0, h: 0x3A2A1A })], [p[8][0], p[8][1], "u", Object.assign({}, looks[p[8][1]] || { m: 0xC8C8D0, h: 0x3A2A1A })],
[p[9][0], p[9][1], "r", { m: 0xE8C040, h: parseInt(p[4].slice(1), 16), g: 0xFFE8B0 }]];
bhnBook(p[0], p[1], p[2], "ct:" + p[0], { shelf: "Shakespeare", b: [p[3], p[2], p[4]], d: [p[5], p[6]], w: w, m: p[10], v: p[11] });
});
})();
bhnBook("winters-heart", "Winter's Heart", "❄️", "ext", { shelf: "Obsidian Moon",
b: ["Winter, Whole", "❄️", "#9AD0FF"],
d: [["The carousel horse, finished in frost", "case", { relic: "carousel", c: 0xEEF2F8 }], ["The Mirror of Truth, in gold, thorns and roses", "mirror", { c: 0xE8B848 }]],
w: [["Glacia's lance of ice", "spear", "c", { m: 0xD8EEFC, h: 0x8AB8E8 }], ["Old Man Winter's storm staff", "stormrod", "u", { m: 0xE8F0F8, h: 0x3A4A6A, g: 0xBFE6FF }], ["Winter's Hand", "heartlance", "r", { m: 0xE8F6FF, h: 0xC8D8E8, g: 0x8AD0FF }]],
m: ["Glacia's ice sleigh", "sleigh", { coat: 0xD8EEFC, tack: 0x8AB8E8 }],
v: ["frost", "hollowshade", "Kael's shadow from the glass", "The Mirror Void"] });
var BHN = { t0: Date.now(), tick: 0, open: false, tab: "all", sel: null, msg: "", rules: null, busy: false, pend: {} };
var BHN_TIER = { c: { n: "Common", col: "#C8C8C8", p: 0.35 }, u: { n: "Uncommon", col: "#7AD87A", p: 0.12 }, r: { n: "Rare", col: "#7AB0FF", p: 0.05 }, m: { n: "Rare mount", col: "#E8A0FF", p: 0.03 } };
function bhnEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function bhnSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function bhnData() {
var d = store.bhn;
if (!d || typeof d !== "object")
d = store.bhn = {};
["fin", "wins", "got", "seen"].forEach(function (k) { if (!d[k] || typeof d[k] !== "object")
d[k] = {}; });
return d;
}
function bhnSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function bhnSigned() { return typeof signedIn === "function" && signedIn(); }
function bhnKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function bhnRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function bhnMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /function|does not exist|schema cache/i.test(String(e && e.message || e)); }
function bhnChance(t) { var R = BHN.rules; return R && R[t] != null ? +R[t] : BHN_TIER[t].p; }
function bhnRules() { return __ZC(499, 0, this, arguments, new.target); }
function bhnArmKey(B, i) { return "bh" + B.k.replace(/[^a-z0-9]/g, "") + "w" + i; }
function bhnDecorArch(B, i) { return "bh_" + B.k + "_d" + i; }
function bhnMountArch(B) { return "bhm_" + B.k; }
function bhnIsDone(B) { return __ZC(499, 1, this, arguments, new.target); }
function bhnWatch() { return __ZC(499, 2, this, arguments, new.target); }
function bhnFinish(k, quiet, silent) { return __ZC(499, 3, this, arguments, new.target); }
function bhnFinishCard(B) { return __ZC(499, 4, this, arguments, new.target); }
var BHN_LAST = {};
function bhnBattleWon(k, o) { return __ZC(499, 5, this, arguments, new.target); }
function bhnDropSay(B, got, mount) { return __ZC(499, 6, this, arguments, new.target); }
(function () {
setInterval(function () { try {
if (typeof store !== "undefined" && store)
bhnWatch();
}
catch (e) { } }, 5000);
setTimeout(bhnRules, 6000);
})();
var BHN_ARMS = {}, BHN_TIERUP = { c: 1.12, u: 1.25, r: 1.45 }, BHN_TIERLV = { c: 5, u: 12, r: 20 };
function bhnArmOwned(key) { return (typeof bkpKept === "function" ? bkpKept() : []).some(function (q) { return q.a === "bw_" + key; }); }
function bhnArmGive(key) { return __ZC(499, 7, this, arguments, new.target); }
function bhnTint(g, look) { return __ZC(499, 8, this, arguments, new.target); }
function bhnArmsReady() { return __ZC(499, 9, this, arguments, new.target); }
(function () { var n = 0; (function go() { if (bhnArmsReady() || ++n > 40)
return; setTimeout(go, 1500); })(); })();
var BHN_DECOR = {}, BHN_TEX = {};
function bhnM(c, o) { return __ZC(499, 10, this, arguments, new.target); }
function bhnPut(g, geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
function bhnBox(g, w, h, d, mat, x, y, z) { return bhnPut(g, new THREE.BoxGeometry(w, h, d), mat, x, y, z); }
function bhnCyl(g, rt, rb, h, mat, x, y, z, seg) { return bhnPut(g, new THREE.CylinderGeometry(rt, rb, h, seg || 12), mat, x, y, z); }
function bhnSph(g, r, mat, x, y, z, sx, sy, sz) { var m = bhnPut(g, new THREE.SphereGeometry(r, 14, 10), mat, x, y, z); if (sx)
m.scale.set(sx, sy || sx, sz || sx); return m; }
var BHN_GOLD = 0xC8A040, BHN_WOOD = 0x5A3A22, BHN_DARK = 0x2A1A12;
function bhnCanvasTex(key, o, title) { return __ZC(499, 11, this, arguments, new.target); }
function bhnPlateTex(text) { return __ZC(499, 12, this, arguments, new.target); }
function bhnPlate(g, text, y, z, w) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w || 0.5, (w || 0.5) * 0.19), new THREE.MeshLambertMaterial({ map: bhnPlateTex(text) })); m.position.set(0, y, z); g.add(m); return m; }
function bhnRelic(r, c) { return __ZC(499, 13, this, arguments, new.target); }
function bhnDecorBuild(B, i) { return __ZC(499, 14, this, arguments, new.target); }
function bhnDecorReady() { return __ZC(499, 15, this, arguments, new.target); }
(function () {
bhnDecorReady();
if (typeof furnList === "function") {
var fl = furnList;
furnList = function () { return fl.apply(this, arguments).filter(function (k) { return !/^bh_/.test(k); }); };
}
if (typeof bfName === "function") {
var bn = bfName;
bfName = function (k) { return BHN_DECOR[k] ? BHN_DECOR[k].n : bn.apply(this, arguments); };
}
if (typeof bfMay === "function") {
var bm = bfMay;
bfMay = function (k, draft) {
if (BHN_DECOR[k] && !(typeof sgOwned === "function" && sgOwned(k) > bfCount(draft, k))) {
bhnSay("<b>" + bhnEsc(BHN_DECOR[k].n) + "</b> is earned by finishing <i>" + bhnEsc(BHN_DECOR[k].B.t) + "</i>.");
return false;
}
return bm.apply(this, arguments);
};
}
if (typeof bfFix === "function") {
var bx = bfFix;
bfFix = function (sel) { var r = bx.apply(this, arguments); try {
bhnFillSelect(sel);
}
catch (e) { } return r; };
}
})();
function bhnFillSelect(sel) { return __ZC(499, 16, this, arguments, new.target); }
var BHN_MOUNTS = {}, BHN_MSPEED = { horse: 3.0, unicorn: 3.1, pegasus: 3.3, stag: 2.9, camel: 2.7, elephant: 2.6, griffin: 3.4, hippogriff: 3.3, dragon: 3.6,
sleigh: 3.0, flyingcarpet: 3.3, airship: 3.2, saucer: 3.5, firechariot: 3.4, hansomcab: 2.8, bicycle: 2.4 };
function bhnMountOf(a) { return BHN_MOUNTS[a] || null; }
function bhnMountReady() { return __ZC(499, 17, this, arguments, new.target); }
function bhnMountTint(g, look) { return __ZC(499, 18, this, arguments, new.target); }
function bhnMountTack(g, M) { return __ZC(499, 19, this, arguments, new.target); }
(function () {
bhnMountReady();
if (typeof archList === "function") {
var al = archList;
archList = function () { return al.apply(this, arguments).split(", ").filter(function (k) { return !/^bhm_/.test(k); }).join(", "); };
}
if (typeof build === "function") {
var bd = build;
build = function (spec) {
var M = spec && spec.archetype && BHN_MOUNTS[spec.archetype];
if (!M)
return bd.apply(this, arguments);
var s2 = {};
for (var p in spec)
s2[p] = spec[p];
s2.archetype = M.base;
var g;
try {
g = bd.call(this, s2);
}
catch (e) {
g = new THREE.Group();
}
try {
bhnMountTack(g, M);
}
catch (e) { }
[0, 600, 1800, 4500, 9000].forEach(function (t) { setTimeout(function () { try {
bhnMountTint(g, M.look);
}
catch (e) { } }, t); });
g.userData.id = spec.id;
g.userData.bhnMount = spec.archetype;
return g;
};
}
if (typeof modelDress === "function") {
var md = modelDress;
modelDress = function (g, spec) {
var M = spec && spec.archetype && BHN_MOUNTS[spec.archetype];
if (!M)
return md.apply(this, arguments);
var s2 = {};
for (var p in spec)
s2[p] = spec[p];
s2.archetype = M.base;
return md.call(this, g, s2);
};
}
})();
function bhnVaultSpec(B) { return __ZC(499, 20, this, arguments, new.target); }
function bhnVault(k) { return __ZC(499, 21, this, arguments, new.target); }
(function () {
if (typeof dmkEnter === "function") {
var de = dmkEnter;
dmkEnter = function () {
var r = de.apply(this, arguments);
try {
var R = DMK.run, k = R && /^bhn:/.test(R.from || "") ? R.from.slice(4) : null, B = k && BHN_BOOKS[k];
if (B)
bhnSay("⚔️ <b>" + bhnEsc(B.v[3]) + "</b>, the vault of <i>" + bhnEsc(B.t) + "</i>. At the bottom waits <b>" + bhnEsc(B.v[2]) + "</b>. Win, and it may drop " + B.w.map(function (w) { return "<span style='color:" + BHN_TIER[w[2]].col + "'>" + bhnEsc(w[0]) + "</span>"; }).join(", ") + (B.m ? ", or <span style='color:" + BHN_TIER.m.col + "'>" + bhnEsc(B.m[0]) + "</span>" : "") + ".");
}
catch (e) { }
return r;
};
}
if (typeof dmkWon === "function") {
var dw = dmkWon;
dmkWon = function () {
var R = typeof DMK !== "undefined" && DMK.run, was = R && R.won, r = dw.apply(this, arguments);
try {
if (R && !was && R.won && /^bhn:/.test(R.from || ""))
setTimeout(function () { bhnBattleWon(R.from.slice(4), { boss: true }); }, 900);
}
catch (e) { }
return r;
};
}
if (typeof dmkOut === "function") {
var dq = dmkOut;
dmkOut = function () {
var R = typeof DMK !== "undefined" && DMK.run, k = R && /^bhn:/.test(R.from || "") ? R.from.slice(4) : null;
var r = dq.apply(this, arguments);
if (k)
setTimeout(function () { try {
bhnSay("🏅 Back from <b>" + bhnEsc(BHN_BOOKS[k].v[3]) + "</b>. Go down again from ☰ Menu › 🏅 Book honours.");
}
catch (e) { } }, 700);
return r;
};
}
})();
var BHN_BADGE = {};
function bhnBadgeUrl(B, on) { return __ZC(499, 22, this, arguments, new.target); }
function bhnBadgeHtml(B, size, on) { return "<img alt='' src='" + bhnBadgeUrl(B, on) + "' style='width:" + (size || 48) + "px;height:" + (size || 48) + "px;vertical-align:middle'>"; }
function bhnOwnsThing(a) { return ((typeof myThings !== "undefined" && myThings) || []).some(function (t) { return t && t.archetype === a; }); }
function bhnPct(p) { return (Math.round(p * 1000) / 10) + "%"; }
function bhnShelves() { var s = []; BHN_ORDER.forEach(function (k) { var h = BHN_BOOKS[k].shelf || "Books"; if (s.indexOf(h) < 0)
s.push(h); }); return s; }
function bhnOpen(sel) { return __ZC(499, 23, this, arguments, new.target); }
function bhnClose() { BHN.open = false; var el = document.getElementById("bhn-panel"); if (el)
el.style.display = "none"; }
function bhnHold(key) { if (!bhnArmOwned(key) && !bhnKeeper())
return; if (bhnKeeper() && !bhnArmOwned(key))
bhnArmGive(key); if (typeof bwEquip === "function") {
bhnClose();
bwEquip(key);
bhnSay("⚔️ You take up the <b>" + bhnEsc(BW_ARMS[key].name) + "</b>.");
} }
function bhnPaint() { return __ZC(499, 24, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-bhn"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-bhn";
b.title = "Every book's badge, decor, weapons and mount";
b.textContent = "🏅 Book honours";
b.onclick = function () { bhnOpen(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1700);
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) { if (e.key === "Escape" && BHN.open) {
bhnClose();
} });
})();
var BHN_WHOLE = {
nemo: function () { if (typeof vbkOpen === "function" && typeof VBK_BOOKS !== "undefined" && VBK_BOOKS.leagues) {
vbkOpen("leagues");
return true;
} },
fogg: function () { if (typeof vbkOpen === "function" && typeof VBK_BOOKS !== "undefined" && VBK_BOOKS.eighty) {
vbkOpen("eighty");
return true;
} },
centreearth: function () { if (typeof vbkOpen === "function" && typeof VBK_BOOKS !== "undefined" && VBK_BOOKS.earth) {
vbkOpen("earth");
return true;
} },
columbiad: function () { if (typeof vbkOpen === "function" && typeof VBK_BOOKS !== "undefined" && VBK_BOOKS.earthmoon) {
vbkOpen("earthmoon");
return true;
} },
holmes: function () { if (typeof bsbOpen === "function") {
bsbOpen();
return true;
} }
};
function bhnWhole(id) {
var f = BHN_WHOLE[id];
if (!f)
return false;
try {
worldCard(null);
if (typeof CT !== "undefined" && CT.run)
ctStop(null);
}
catch (e) { }
try {
return !!f();
}
catch (e) {
return false;
}
}
(function () {
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (BHN_WHOLE[id] && bhnWhole(id))
return; return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (BHN_WHOLE[id] && bhnWhole(id))
return; return s0.apply(this, arguments); };
}
})();
var BHN_GONE = ["columbiad", "jekyll"];
(function () {
try {
if (typeof CT_TALES !== "undefined")
for (var i = CT_TALES.length - 1; i >= 0; i--)
if (BHN_GONE.indexOf(CT_TALES[i].id) >= 0)
CT_TALES.splice(i, 1);
if (typeof CT_BY_ID !== "undefined")
BHN_GONE.forEach(function (id) { delete CT_BY_ID[id]; });
if (typeof CT_BY_HOST !== "undefined")
Object.keys(CT_BY_HOST).forEach(function (h) { CT_BY_HOST[h] = CT_BY_HOST[h].filter(function (T) { return BHN_GONE.indexOf(T.id) < 0; }); });
}
catch (e) { }
})();
