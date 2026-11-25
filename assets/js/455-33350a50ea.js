/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WM_W = 3200, WM_H = 2100;
var WM_CITY = { x: 1600, y: 1060 };
var WM_HALL = { x: 560, y: 1080 };
var WM_SUN = { x: 3080, y: 1990 };
var WM_REGIONS = [
["stories", "The Story Lands", 70, 150, 1060, 520, "land"],
["far", "The Far Lands", 70, 1530, 1040, 520, "land"],
["heavens", "The Heavens", 1140, 120, 920, 400, "cloud"],
["below", "Beneath the World", 1150, 1600, 900, 440, "deep"],
["space", "The Starry Reach", 2240, 60, 900, 1980, "space"],
["doors", "The Dream Lands", 120, 660, 880, 840, "mist"]
];
var WM_ROUTES = [
["doors", "hall", "The Hall of Doors gate, on the Tower Plaza", null, 1075, 1195],
["space", "earth", "The Spaceport, in the Harvest Ring"],
["heavens", "heavens", "The Stair of Light, from the temple roof", "otemple", 1850, 610],
["below", "otdeep", "The Highway Down, under the temple", "underground", 1850, 1590],
["stories", "bard", "☰ Menu › Story worlds"],
["far", "guildlands", "☰ Menu, and the gates of the Wilds"]
];
var WM_SECRET = "Its way in is one of the game's secrets. It is out there; look for it.";
var WM_NODES = [
{ k: "city", n: "Somnucor", s: "The city at the heart of every world: nine rings round the Tower, out to the Nightmare Wilds", e: "🏙️", c: "#D9B45A", at: [WM_CITY.x, WM_CITY.y], big: 1,
how: "Home. Every other world is reached from here, and Back always brings you here again." },
{ k: "otemple", n: "Temple of the Obsidian Moon", s: "The Keeper's temple on Temple Row, every room of it", e: "🌙", c: "#3A2A58", at: { ring: "city", i: 0 }, how: "On Temple Row; or ☰ Menu › 🌙 Temple." },
{ k: "tower", n: "The Helix Tower", s: "The glass double helix, WIDOW at its heart, floors up and down", e: "🧬", c: "#5AB8D8", at: { ring: "city", i: 1 }, how: "In the city; its lifts and access cards take you floor by floor." },
{ k: "outbreak", n: "Sector Zero", s: "The outbreak beneath the Tower", e: "☣️", c: "#7AA83A", at: { ring: "city", i: 2 }, how: "Down from the Helix Tower, for those whose card reaches that far." },
{ k: "thefall", n: "The Fall", s: "What is left of Somnucor, if Sector Zero is lost", e: "🏚️", c: "#8A5A4A", at: { ring: "city", i: 3 }, how: "Only if Sector Zero is lost." },
{ k: "sim", n: "Simulation Studio", s: "Training sites built from a few typed or spoken words", e: "🎛️", c: "#4A8AD8", at: { ring: "city", i: 4 }, how: "At the Simulation Studio in the city." },
{ k: "airport", n: "Somnucor Airport", s: "Terminal, gates, observation deck and the planes", e: "✈️", c: "#8AB4E8", at: { ring: "city", i: 5 }, how: "☰ Menu › ✈️ Airport, or the airport shuttle stop in the city." },
{ k: "sports", n: "Universal Sports Arena", s: "School sports, the league and the big matches", e: "🏟️", c: "#5AA85A", at: { ring: "city", i: 6 }, how: "☰ Menu › 🏟️ Sports, or the City School's gym." },
{ k: "storms", n: "Tornado Alley", s: "Storm chasing on the open plains", e: "🌪️", c: "#7A8A9A", at: { ring: "city", i: 7 }, how: "☰ Menu › 🌪️ Storms." },
{ k: "underground", n: "The Underground", s: "The city's trains below the streets", e: "🚇", c: "#C84A3A", at: { ring: "city", i: 8 }, how: "Down the steps at any Underground station in the city." },
{ k: "mall", n: "The World Mall", s: "Floor upon floor of shops", e: "🛍️", c: "#E8A8C8", at: { ring: "city", i: 9 }, how: "Its doors are in the city." },
{ k: "dream", n: "Your Own Dream", s: "The dreams you write, and any dream you visit", e: "💭", c: "#A88AE8", at: { ring: "city", i: 10 }, how: "Open your Journal and walk into a dream; ☰ Menu › 🌍 Dream worlds to visit other dreamers'." },
{ k: "lounge", n: "GiGi's Lounge", s: "Bingo, mahjong and cards in plum and gold", e: "💜", c: "#B85AA8", at: { ring: "city", i: 11 }, how: "GiGi's Lounge stands in Somnucor: walk in at its doors." },
{ k: "family", n: "The Family Houses", s: "Homes for families, fostering and adoption", e: "🏡", c: "#E8B86A", at: { ring: "city", i: 12 }, how: "☰ Menu › 💍 Family." },
{ k: "gld_thieves", n: "A House in Somnucor", s: "A door that is on no map", e: "🗝️", c: "#4A4A5A", at: { ring: "city", i: 13 }, how: WM_SECRET, secret: 1 },
{ k: "gld_smugglers", n: "A House in Somnucor", s: "A door that is on no map", e: "🗝️", c: "#4A4A5A", at: { ring: "city", i: 14 }, how: WM_SECRET, secret: 1 },
{ k: "gld_spider", n: "A House in Somnucor", s: "A door that is on no map", e: "🗝️", c: "#4A4A5A", at: { ring: "city", i: 15 }, how: WM_SECRET, secret: 1 },
{ k: "otmoonstair", n: "The Stair of Light", s: "The glowing stair from the temple roof into the clouds", e: "✨", c: "#E8E0FF", at: [1600, 560], how: "From the temple: for the temple's members only." },
{ k: "heavens", n: "The Heavens", s: "The Court of Heaven and the realms of the powers, each in its own country, on one great globe", e: "☁️", c: "#FFF0C0", at: [1600, 300], big: 1, how: "For the temple's members only: the Stair of Light, or ☰ Menu › ☁️ Heavens." },
{ k: "otdeep", n: "The Highway Down", s: "Below the temple: the road down, the Hall of the Key, the Inferno", e: "🔥", c: "#C8402A", at: [1600, 1730], how: "Under the temple, for the temple's members only." },
{ k: "erebos", n: "Erebos", s: "The Underworld of Hades: the rivers, the judges, the palace, Tartarus", e: "🏛️", c: "#6A3A2A", at: [1330, 1800], how: "☰ Menu › Story worlds › 🔱 Erebos; or past Charon's ferry in the Underworld." },
{ k: "underdark", n: "The Underdark", s: "Zhaelvorn and Stonehallow, the dark school and the Dwarven Deep", e: "🕸️", c: "#5A3A7A", at: [1880, 1800], how: "Deep in the mines. " + WM_SECRET },
{ k: "delve", n: "The Dungeons", s: "Four torch-lit dungeons of the main story", e: "🗡️", c: "#7A6A5A", at: [1450, 1930], how: "☰ Menu › 📜 Story and quests." },
{ k: "samhain", n: "Samhain Night", s: "The Spooktacular: the haunted house, the fair, the drive-in", e: "🎃", c: "#E8862A", at: [1760, 1930], how: "☰ Menu › 🎃 Samhain." },
{ k: "mmin", n: "Inside a Mythic Machine", s: "The halls inside a mythic machine", e: "⚙️", c: "#B89A5A", at: [1990, 1930], how: "Own a mythic machine, and step inside it." },
{ k: "hall", n: "The Hall of Doors", s: "A door for every land of dreams", e: "🚪", c: "#C9A868", at: [WM_HALL.x, WM_HALL.y], big: 1, how: "The Hall of Doors gate, on the Tower Plaza." },
{ k: "faerie", n: "Faerie", s: "Glimmerwold: the hollow hills and the fair folk", e: "🧚", c: "#7AD88A", at: { ring: "hall", i: 0 }, how: "Through its door in the Hall of Doors." },
{ k: "mirror", n: "The Mirror World", s: "Gemelline, through the looking glass", e: "🪞", c: "#C8D0DC", at: { ring: "hall", i: 1 }, how: "Through its door in the Hall of Doors." },
{ k: "stars", n: "Among the Stars", s: "Celestara, the sky beyond the sky", e: "🌟", c: "#F0D070", at: { ring: "hall", i: 2 }, how: "Through its door in the Hall of Doors." },
{ k: "future", n: "The City to Come", s: "Brightwater, the city that is coming", e: "🌆", c: "#E8A0F0", at: { ring: "hall", i: 3 }, how: "Through its door in the Hall of Doors." },
{ k: "desert", n: "The Endless Desert", s: "Sahmira, the dunes and the oasis", e: "🏜️", c: "#E8C890", at: { ring: "hall", i: 5 }, how: "Through its door in the Hall of Doors." },
{ k: "wasteland", n: "The Wasteland", s: "Wellspring, on the broken road", e: "🛞", c: "#A88A62", at: { ring: "hall", i: 6 }, how: "Through its door in the Hall of Doors." },
{ k: "fire", n: "The Burning Lands", s: "Kilnhaven, the volcano and the forges", e: "🌋", c: "#F07A3A", at: { ring: "hall", i: 7 }, how: "Through its door in the Hall of Doors." },
{ k: "underworld", n: "The Underworld", s: "Hearthdeep, in Hades' land; Erebos lies beyond Charon's ferry", e: "💀", c: "#B85A3A", at: { ring: "hall", i: 8 }, how: "Through its door in the Hall of Doors." },
{ k: "dead", n: "The Land of the Dead", s: "Lanternhome, beyond the veil", e: "🕯️", c: "#B0B4A6", at: { ring: "hall", i: 9 }, how: "Through its door in the Hall of Doors." },
{ k: "void", n: "The Void", s: "Stillspire, the dark between", e: "🌑", c: "#7A70C8", at: { ring: "hall", i: 10 }, how: "Through its door in the Hall of Doors." },
{ k: "depths", n: "The Deep", s: "Coralmere, the Sea King's palace and Atlantis", e: "🐚", c: "#3AA8B8", at: { ring: "hall", i: 11 }, how: "Through its door in the Hall of Doors." },
{ k: "frozen", n: "The Frozen Realm", s: "Isvarden, the ice palace and the long winter", e: "❄️", c: "#B8DCF0", at: { ring: "hall", i: 12 }, how: "Through its door in the Hall of Doors." },
{ k: "elsewhere", n: "Another World", s: "Ondrevar, a place entirely other", e: "🌀", c: "#5AD8B8", at: { ring: "hall", i: 13 }, how: "Through its door in the Hall of Doors." },
{ k: "kidszone", n: "The Kids Zone", s: "Wonderglen in Faerie: always safe, all play", e: "🍄", c: "#FF8AC8", at: { sat: "faerie", a: 90, d: 112 }, how: "In Faerie: the Rainbow Toadstool." },
{ k: "ctale", n: "The Classic Stories", s: "43 stories from the old books, myths and tales, in the worlds they fit", e: "📖", c: "#C8A06A", at: [230, 280], how: "In the worlds they belong to: Alice in Faerie, Robin Hood in the Greenwold, and the rest." },
{ k: "bard", n: "Shakespeare's London", s: "London and Stratford, the Globe, and the plays acted", e: "🎭", c: "#A84A4A", at: [420, 280], how: "☰ Menu › Story worlds › 🎭 Shakespeare." },
{ k: "davinci", n: "Leonardo's Italy", s: "Florence, Milan and the Romagna, the workshop and the machines", e: "🎨", c: "#C88A4A", at: [610, 280], how: "☰ Menu › Story worlds › 🎨 Leonardo." },
{ k: "verne", n: "Jules Verne's World", s: "The Extraordinary Voyages: under the sea, round the world, to the Moon", e: "🎈", c: "#4A7AA8", at: [800, 280], how: "☰ Menu › Story worlds › 🧭 Verne." },
{ k: "wonders", n: "Wonders of the World", s: "The Seven Wonders, as they stood", e: "🏛️", c: "#E8D8A8", at: [990, 280], how: "☰ Menu › 🏛️ Wonders, or the City School's class trip." },
{ k: "maze", n: "The Labyrinth", s: "One great living maze, its court and its Heart", e: "🌀", c: "#6A8A4A", at: [450, 470], how: "☰ Menu › Story worlds › 🌀 Labyrinth." },
{ k: "grimm", n: "The Grimm Wood", s: "The Brothers Grimm's own tales, from their own book", e: "🐺", c: "#4A6A3A", at: [640, 470], how: "☰ Menu › Story worlds › 📖 Grimm." },
{ k: "oz", n: "The Land of Oz", s: "All of Baum's Oz, book by book, in costume", e: "🌈", c: "#3AB86A", at: [830, 470], how: "Let a big enough tornado in Tornado Alley carry you there; after that, its storm cellar in the Hall of Doors." },
{ k: "neverland", n: "Neverland", s: "Aerieholm: second to the right, and straight on till morning", e: "🧚", c: "#4AB8E8", at: [1000, 470], how: "Fly: second star to the right, and straight on till morning." },
{ k: "northpole", n: "The North Pole", s: "Starhearth, Santa's workshop and the long snow", e: "🎅", c: "#E8F4FF", at: [260, 470], how: "Through a cold hearth. " + WM_SECRET },
{ k: "sea", n: "The Endless Sea", s: "Saltcrown and the Odyssey's islands", e: "⛵", c: "#2A7AB8", at: [220, 1700], how: "From the last pier of the Nightmare Wilds." },
{ k: "pirates", n: "The Sweet Trade", s: "The pirates' Caribbean of 1715, the far havens and Treasure Island, out on the Endless Sea (danger 4)", e: "🏴‍☠️", c: "#1A1A1A", at: [150, 1560], how: "☰ Menu › 🏴‍☠️ The Sweet Trade, or the chart at the Wayfarer's helm." },
{ k: "battle", n: "Ironfray", s: "The battle world and Bastion Varr (18+)", e: "⚔️", c: "#8A3A3A", at: [440, 1880], how: "The War Gate in the Nightmare Wilds; ☰ Menu › ⚔️ Ironfray points the way." },
{ k: "greenwold", n: "The Greenwold", s: "Harrowmead: gardens, orchards, fields and woods", e: "🌳", c: "#4A9A3A", at: [300, 1960], how: "Behind a green door. " + WM_SECRET },
{ k: "guildlands", n: "The Guildlands", s: "Anvilmere, the Guild town, and every craft", e: "⚒️", c: "#B8884A", at: [800, 1760], how: "☰ Menu › ⚒️ Crafts › Go to the Guildlands." },
{ k: "stillwater", n: "Stillwater", s: "A calm world: quiet hobbies, nothing can hurt anyone", e: "🍃", c: "#8AC8A8", at: [1000, 1960], how: "☰ Menu › 🍃 Stillwater." },
{ k: "gld_artisans", n: "Artisans' Guild", s: "A guild hall of the Guildlands", e: "🖌️", c: "#C8A06A", at: { sat: "guildlands", a: -90, d: 150 } },
{ k: "gld_smiths", n: "Company of Smiths", s: "A guild hall of the Guildlands", e: "🔨", c: "#8A8A9A", at: { sat: "guildlands", a: -38.6, d: 150 } },
{ k: "gld_merchants", n: "Merchant Venturers", s: "A guild hall of the Guildlands", e: "💰", c: "#D8B84A", at: { sat: "guildlands", a: 12.9, d: 150 } },
{ k: "gld_healers", n: "Healers and Herbalists", s: "A guild hall of the Guildlands", e: "🌿", c: "#6AB86A", at: { sat: "guildlands", a: 64.3, d: 150 } },
{ k: "gld_scribes", n: "Scriveners and Scholars", s: "A guild hall of the Guildlands", e: "📜", c: "#C8B890", at: { sat: "guildlands", a: 115.7, d: 150 } },
{ k: "gld_bards", n: "Bards and Players", s: "A guild hall of the Guildlands", e: "🎻", c: "#A86AB8", at: { sat: "guildlands", a: 167.1, d: 150 } },
{ k: "gld_mariners", n: "The Mariners' Guild", s: "A guild hall of the Guildlands", e: "⚓", c: "#3A7AA8", at: { sat: "guildlands", a: 218.6, d: 150 } },
{ k: "space", n: "Open Space", s: "Geodia, and the whole sky between the worlds", e: "🌌", c: "#2A3A7A", at: [2480, 230], how: "Take off from the Spaceport, or fly your own ship." },
{ k: "shuttle", n: "Aboard a Shuttle", s: "The cabin of a shuttle between the worlds", e: "🚀", c: "#C8D0DC", at: [2960, 1150], how: "Board a shuttle at the Spaceport, in the Harvest Ring." },
{ k: "mercury", n: "Mercury", s: "Caloris Deep, the smelters of the sunside", planet: { col: "#8A8E96", r: 20 }, at: { orbit: 200, a: 235 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "venus", n: "Venus", s: "Aphelia, the cloud city", planet: { col: "#E0B890", r: 26 }, at: { orbit: 330, a: 215 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "earth", n: "Earth", s: "Home: Somnucor, and the Spaceport", planet: { col: "#3A7AC8", land: "#4A9A4A", r: 30 }, at: { orbit: 470, a: 240 }, how: "You live here.", nolist: 1 },
{ k: "moon", n: "The Moon", s: "Mare Haven, under the grey plains", planet: { col: "#C8CCD4", r: 15 }, at: { sat: "earth", a: -35, d: 78 }, how: "By shuttle from the Spaceport." },
{ k: "casino", n: "The Hidden Crescent", s: "A casino resort under the Moon's dust (18+)", e: "🎰", c: "#D8B84A", at: { sat: "moon", a: -100, d: 70 }, how: "On the Moon. " + WM_SECRET },
{ k: "orbital", n: "The Orbital", s: "Meridian Ring, the ring-city over Earth", e: "🛰️", c: "#9AE8FF", at: { sat: "earth", a: 150, d: 104 }, how: "The Ring Line shuttle from the Spaceport, or fly up in Open Space and dock." },
{ k: "aurora", n: "Station Aurora", s: "The Aurora Spindle, a station in orbit", e: "🛰️", c: "#9AD8FF", at: { sat: "earth", a: 200, d: 92 }, how: "By shuttle from the Spaceport." },
{ k: "mars", n: "Mars", s: "New Jezero and the red plains", planet: { col: "#B8583A", r: 24 }, at: { orbit: 620, a: 220 }, how: "By shuttle from the Spaceport." },
{ k: "ares", n: "The Ares Gateway", s: "Vermilion Harbour, the station over Mars", e: "🛰️", c: "#E88A6A", at: { sat: "mars", a: -130, d: 80 }, how: "By shuttle from the Spaceport." },
{ k: "party", n: "Jubilee", s: "The Party Planet, always at night", planet: { col: "#B86AD8", r: 26, ring: "#F0A0F0" }, at: { orbit: 770, a: 245 }, how: "The Orbital Line from the Spaceport's pad." },
{ k: "jupiter", n: "Jupiter", s: "The cloud station", planet: { col: "#D8A878", band: "#A86A4A", r: 44 }, at: { orbit: 920, a: 220 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "gr_jupiter", n: "Vellamar", s: "Jupiter's great city", e: "🏙️", c: "#D8A878", at: { sat: "jupiter", a: -150, d: 96 }, how: "From Jupiter's cloud station." },
{ k: "race", n: "Pyreline", s: "The race planet: a tangle of tracks, turn-offs and under-passes", planet: { col: "#D86A2A", band: "#3A2A2A", r: 30 }, at: { orbit: 1060, a: 250 }, how: "☰ Menu › 🏁 Pyreline, from the Spaceport." },
{ k: "saturn", n: "Saturn", s: "The cloud station", planet: { col: "#E8D0A0", band: "#C8A870", r: 38, ring: "#E8D8B0" }, at: { orbit: 1200, a: 232 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "gr_saturn", n: "Halcyra", s: "Saturn's great city", e: "🏙️", c: "#E8D0A0", at: { sat: "saturn", a: -30, d: 100 }, how: "From Saturn's cloud station." },
{ k: "uranus", n: "Uranus", s: "The cloud station", planet: { col: "#9AE0E0", r: 32 }, at: { orbit: 1350, a: 247 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "gr_uranus", n: "Celadine", s: "Uranus's great city", e: "🏙️", c: "#9AE0E0", at: { sat: "uranus", a: -30, d: 92 }, how: "From Uranus's cloud station." },
{ k: "neptune", n: "Neptune", s: "The cloud station", planet: { col: "#4A6AE0", r: 32 }, at: { orbit: 1500, a: 243 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "gr_neptune", n: "Saphirel", s: "Neptune's great city", e: "🏙️", c: "#6A8AE8", at: { sat: "neptune", a: -30, d: 92 }, how: "From Neptune's cloud station." },
{ k: "pluto", n: "Pluto", s: "Tombaugh Halls, in the ice quarries", planet: { col: "#C8B8A8", r: 16 }, at: { orbit: 1650, a: 256 }, how: "By shuttle from the Spaceport (the Grand Tour)." },
{ k: "veyar", n: "Veyar", s: "Ilvessa, the Singing City, through the Far Gate", planet: { col: "#6AD8A8", band: "#3A8AA8", r: 30 }, at: [3010, 300], how: "Through the Far Gate, out in open space." }
];
var WM_HEAVEN_REALMS = ["Olympos", "The Heavenly Capitol", "Asgard", "The Field of Reeds", "The Mountain of Heaven and Earth", "The House of Song",
"Svarga", "The Jade Court", "Takamagahara", "Tír na nÓg", "Annwn", "The Sacred Grove", "Iriy", "Ọ̀run", "The Sky of Nyame", "Ginen", "Omeyocan",
"The Thirteen Heavens", "Hanan Pacha", "Hawaiki", "The Seventh Heaven", "The Shadowed Reach"];
var WM = { open: false, el: null, cv: null, g: null, dpr: 1, vw: 0, vh: 0, s: 1, ox: 0, oy: 0, pos: null, deco: null, fast: null, fastS: 1, sel: null, here: null,
ptr: {}, pinch: null, drag: null, moved: false, idleT: 0, raf: 0, list: false };
var WM_EMOJI = "'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif";
var WM_SERIF = "Georgia,'Times New Roman',serif";
function wmRandom(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
function wmNodes() { return __ZC(455, 0, this, arguments, new.target); }
function wmCount() {
var n = 0;
(WM.pos || wmNodes()).forEach(function (P) { if (!P.N.nolist)
n++; });
return n;
}
function wmNodeOf(k) { var L = WM.pos || []; for (var i = 0; i < L.length; i++)
if (L[i].k === k)
return L[i]; return null; }
function wmBlob(cx, cy, rx, ry, rnd, bump, n) {
n = n || 48;
var pts = [], ph = [rnd() * 6, rnd() * 6, rnd() * 6];
for (var i = 0; i < n; i++) {
var t = i / n * Math.PI * 2, k = 1 + bump * (0.5 * Math.sin(t * 3 + ph[0]) + 0.3 * Math.sin(t * 5 + ph[1]) + 0.2 * Math.sin(t * 9 + ph[2]));
pts.push([cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k]);
}
return pts;
}
function wmDeco() { return __ZC(455, 1, this, arguments, new.target); }
function wmInPoly(P, x, y) {
var c = false;
for (var i = 0, j = P.length - 1; i < P.length; j = i++) {
var a = P[i], b = P[j];
if (((a[1] > y) !== (b[1] > y)) && (x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]))
c = !c;
}
return c;
}
function wmPath(g, P) {
g.beginPath();
g.moveTo(P[0][0], P[0][1]);
for (var i = 1; i <= P.length; i++) {
var a = P[i % P.length], b = P[(i + 1) % P.length];
g.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
}
g.closePath();
}
function wmDraw(g, s) { return __ZC(455, 2, this, arguments, new.target); }
function wmLand(g, L, a, b) { return __ZC(455, 3, this, arguments, new.target); }
function wmRegion(g, R, s) { return __ZC(455, 4, this, arguments, new.target); }
function wmRealmsText(g) { return __ZC(455, 5, this, arguments, new.target); }
function wmRound(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function wmTree(g, x, y, r) {
g.fillStyle = "rgba(0,0,0,0.18)";
g.beginPath();
g.ellipse(x + r * 0.5, y + r * 0.9, r, r * 0.45, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#3A6A2A";
g.beginPath();
g.arc(x, y, r, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#5A8A3A";
g.beginPath();
g.arc(x - r * 0.3, y - r * 0.3, r * 0.55, 0, Math.PI * 2);
g.fill();
}
function wmHill(g, x, y, r) { return __ZC(455, 6, this, arguments, new.target); }
function wmCityEmblem(g, cx, cy, R) { return __ZC(455, 7, this, arguments, new.target); }
function wmRoutes(g, s) { return __ZC(455, 8, this, arguments, new.target); }
function wmNodeDraw(g, P, s) { return __ZC(455, 9, this, arguments, new.target); }
function wmShade(hex, k) {
var c = parseInt(String(hex).replace("#", ""), 16);
if (isNaN(c))
return "#333";
var r = Math.round(((c >> 16) & 255) * (1 - k)), gg = Math.round(((c >> 8) & 255) * (1 - k)), b = Math.round((c & 255) * (1 - k));
return "rgb(" + r + "," + gg + "," + b + ")";
}
function wmLevel(k) {
if (typeof DGR_W === "undefined" || !DGR_W[k] || typeof dgrLevelOf !== "function")
return null;
try {
var v = dgrLevelOf(k);
return v >= 0 && v <= 4 ? v : null;
}
catch (e) {
return null;
}
}
function wmLines(t) {
if (t.length <= 16)
return [t];
var w = t.split(" "), a = [], b = [], half = t.length / 2, n = 0;
w.forEach(function (x) { if (!b.length && (n + x.length / 2 < half || !a.length)) {
a.push(x);
n += x.length + 1;
}
else
b.push(x); });
return b.length ? [a.join(" "), b.join(" ")] : [t];
}
function wmLabel(g, P, s) { return __ZC(455, 10, this, arguments, new.target); }
function wmCompass(g, x, y, r) { return __ZC(455, 11, this, arguments, new.target); }
function wmTitle(g) { return __ZC(455, 12, this, arguments, new.target); }
function wmFit() {
var s = Math.min(WM.vw / WM_W, WM.vh / WM_H) * 0.98;
WM.s = s;
WM.ox = (WM.vw - WM_W * s) / 2;
WM.oy = (WM.vh - WM_H * s) / 2;
}
function wmClampView() { return __ZC(455, 13, this, arguments, new.target); }
function wmFastPicture() { return __ZC(455, 14, this, arguments, new.target); }
function wmPaint(sharp) { return __ZC(455, 15, this, arguments, new.target); }
function wmDirty() {
WM.gen = (WM.gen || 0) + 1;
if (!WM.raf)
WM.raf = requestAnimationFrame(function () { WM.raf = 0; if (WM.sharpGen !== WM.gen)
wmPaint(false); });
clearTimeout(WM.idleT);
WM.idleT = setTimeout(function () { wmPaint(true); }, 140);
}
function wmZoomAt(px, py, f) {
var mx = (px - WM.ox) / WM.s, my = (py - WM.oy) / WM.s;
WM.s *= f;
WM.ox = px - mx * WM.s;
WM.oy = py - my * WM.s;
wmClampView();
wmDirty();
}
function wmCenterOn(P, zoom) {
if (zoom)
WM.s = Math.max(WM.s, zoom);
WM.ox = WM.vw / 2 - P.x * WM.s;
WM.oy = WM.vh / 2 - P.y * WM.s;
wmClampView();
wmDirty();
}
function wmHit(px, py) { return __ZC(455, 16, this, arguments, new.target); }
function wmCss() { return __ZC(455, 17, this, arguments, new.target); }
function wmOpen(focus) { return __ZC(455, 18, this, arguments, new.target); }
function wmResize() {
var r = WM.el.getBoundingClientRect();
WM.vw = Math.max(1, r.width);
WM.vh = Math.max(1, r.height);
WM.dpr = Math.min(2, window.devicePixelRatio || 1);
WM.cv.width = Math.round(WM.vw * WM.dpr);
WM.cv.height = Math.round(WM.vh * WM.dpr);
}
function wmCard(P) { return __ZC(455, 19, this, arguments, new.target); }
var WM_LIST_GROUPS = [["Somnucor and the city's own worlds", function (P) { return P.k === "city" || P.N.at && P.N.at.ring === "city"; }],
["The Heavens, above", function (P) { return P.k === "heavens" || P.k === "otmoonstair"; }],
["Beneath the World", function (P) { return P.y > 1600 && P.x > 1140 && P.x < 2060 && !P.also; }],
["The Hall of Doors and the Dream Lands", function (P) { return P.k === "hall" || P.N.at && P.N.at.ring === "hall" || P.k === "kidszone"; }],
["The Story Lands", function (P) { return P.y < 700 && P.x < 1140; }],
["The Far Lands", function (P) { return P.y > 1500 && P.x < 1140; }],
["The Starry Reach", function (P) { return P.x >= 2240; }],
["Also", function (P) { return !!P.also; }]];
function wmList(on) { return __ZC(455, 20, this, arguments, new.target); }
function wmClose() { return __ZC(455, 21, this, arguments, new.target); }
var WCM = { open: false, el: null, cv: null, g: null, dpr: 1, vw: 0, vh: 0, s: 1, ox: 0, oy: 0, P: null, fast: null, fastK: 1, lab: null, pick: null, ptr: {}, pinch: null, drag: null, moved: false, idleT: 0, raf: 0, list: true, ring: null };
var WCM_R = 3120;
var WCM_TREE = { tree: 1, pine: 1, palm: 1, topiary: 1, giantmushroom: 1 };
var WCM_DEAD = { deadtree: 1 };
var WCM_WATER = { fountain: 1, tierfountain: 1, reflectpool: 1, moonpool: 1 };
var WCM_GREEN = { flowerbed: 1, hedge: 1 };
var WCM_SKIP = { ironfence: 1, gmwpalisade: 1, festoonlights: 1, stringlights: 1, washing: 1, ragline: 1, ringarch: 1, estategate: 1, bannerpole: 1, crowd: 1, human: 1, child: 1,
signboard: 1, ornatelamp: 1, dimlamp: 1, lamp: 1, streetlamp: 1, bench: 1, trashcan: 1, firebarrel: 1, barrel: 1, sacks: 1, crates: 1, pallets: 1, haybale: 1, puddle: 1, wisps: 1,
redlanterns: 1, brazier: 1, crystalbrazier: 1, pottedplant: 1, tramstop: 1, car: 1, broomstick: 1, deity: 1, altarseasonal: 1, imbolccandles: 1, incenseburner: 1 };
var WCM_ROOF = { palace: "#5A6A8A", castle: "#6A6A78", manor: "#6A5A7A", somnucortower: "#E8D8A0", shanty: "#8A7A62", boardedshack: "#7A6A56", leanto: "#8A7A5E", tent: "#C8B890",
marketstall: "#C8784A", marketawning: "#D88A4A", ruin: "#6A645A", collapsedtower: "#5A544A", rubble: "#6A645A", scrapheap: "#5A5048", gazebo: "#E8E0D0",
machiya: "#4A4A52", hanok: "#5A4A3A", teahouse: "#7A3A2A", stilthouse: "#7A6040", cottage: "#9A5A3A", house: "#A8583A", apartment: "#8A6A5A", tenementblock: "#7A5A4A", shop: "#B8684A" };
var WCM_LOT = { park: ["#6AAA4A", "🌳"], garden: ["#7AB85A", "🌷"], plaza: ["#D8CCB0", "⛲"], lido: ["#5AB8E0", "🏊"], playground: ["#E8B84A", "🛝"], cafe: ["#C8946A", "☕"], shop: ["#C88A6A", "🛍️"],
museum: ["#C8B898", "🏛️"], cinema: ["#8A6AA8", "🎬"], library: ["#A88A6A", "📚"], hotel: ["#A8786A", "🏨"], gate: ["#F0E0A0", "✨"] };
function wcmReady() { return typeof ATLC !== "undefined" && !!ATLC && typeof ATL_RINGS !== "undefined" && typeof somnucorRealm === "function" && !!somnucorRealm(); }
function wcmHex(c, k) { var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255; k = k || 0; r = Math.round(r + (255 - r) * k); g = Math.round(g + (255 - g) * k); b = Math.round(b + (255 - b) * k); return "rgb(" + r + "," + g + "," + b + ")"; }
function wcmGather() {
var city = somnucorRealm(), O = store.objects, P = { roof: {}, shadow: new Path2D(), trees: new Path2D(), dead: new Path2D(), water: new Path2D(), green: new Path2D(), n: 0, lots: [], tower: null };
function rect(path, x, z, w, d, rot, off) {
var c = Math.cos(rot), s = Math.sin(rot), hw = w / 2, hd = d / 2, pts = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]];
pts.forEach(function (p, i) { var X = x + p[0] * c + p[1] * s + (off || 0), Z = z - p[0] * s + p[1] * c + (off || 0); if (i)
path.lineTo(X, Z);
else
path.moveTo(X, Z); });
path.closePath();
}
for (var i = 0; i < O.length; i++) {
var o = O[i];
if (o.realm !== city.id)
continue;
var a = o.archetype;
if (WCM_SKIP[a])
continue;
var x = o.x - ATLC.x, z = o.z - ATLC.z;
if (x * x + z * z > WCM_R * WCM_R)
continue;
var K = typeof KIT !== "undefined" && KIT[a], sz = K && K.size, s = (o.attrs && o.attrs.s) || 1;
if (WCM_TREE[a]) {
var tr = Math.max(2, (sz ? Math.max(sz[0], sz[2]) : 4) * s * 0.5);
P.trees.moveTo(x + tr, z);
P.trees.arc(x, z, tr, 0, Math.PI * 2);
continue;
}
if (WCM_DEAD[a]) {
P.dead.moveTo(x + 2.5, z);
P.dead.arc(x, z, 2.5, 0, Math.PI * 2);
continue;
}
if (!sz)
continue;
var w = sz[0] * s, d = sz[2] * s, rot = o.rot || 0;
if (WCM_WATER[a]) {
rect(P.water, x, z, w, d, rot);
continue;
}
if (WCM_GREEN[a]) {
rect(P.green, x, z, w, d, rot);
continue;
}
if (Math.max(w, d) < 2.4)
continue;
var col = WCM_ROOF[a] || (o.workplace ? "#9A7A6A" : "#A86A4A");
if (a === "somnucortower")
P.tower = { x: x, z: z, w: w, d: d };
var path = P.roof[col] || (P.roof[col] = new Path2D());
rect(path, x, z, w, d, rot);
var sh = Math.min(8, Math.max(1.5, Math.max(w, d) * 0.12));
rect(P.shadow, x, z, w, d, rot, sh);
P.n++;
}
if (typeof ROWL !== "undefined" && ROWL.lots)
ROWL.lots.forEach(function (L) {
if (!L || L.cx === undefined)
return;
P.lots.push({ k: L.kind, x: L.cx - ATLC.x, z: L.cz - ATLC.z, w: L.W, d: L.D, a: L.a });
});
P.names = [];
try {
RMAP.of = null;
var D = rmapOf();
D.rings.forEach(function (B) {
[["work", 3], ["land", 2], ["area", 1]].forEach(function (T) {
var o = B[T[0]];
Object.keys(o).forEach(function (k) { var it = o[k]; P.names.push({ n: k, x: it.x - ATLC.x, z: it.z - ATLC.z, kind: T[0], pri: T[1], ring: B.i }); });
});
});
}
catch (e) {
if (window.console)
console.warn("[world-maps] names", e);
}
var rnd = wmRandom(4242);
P.wild = [];
for (var j = 0; j < 420; j++) {
var a2 = rnd() * Math.PI * 2, r2 = 2190 + rnd() * 780;
P.wild.push([Math.cos(a2) * r2, Math.sin(a2) * r2, 4 + rnd() * 9, rnd()]);
}
P.fields = [];
var H = atlRing("harvest");
if (H)
for (var f = 0; f < 260; f++) {
var a3 = rnd() * Math.PI * 2, r3 = H.S + 20 + rnd() * (H.E - H.S - 40);
P.fields.push([a3, r3, 30 + rnd() * 50, 18 + rnd() * 30, rnd()]);
}
return P;
}
function wcmDraw(g, s, opt) {
opt = opt || {};
var P = WCM.P || wcmGather(), R = ATL_RINGS, last = R[R.length - 1];
g.fillStyle = "#1A3A4A";
g.beginPath();
g.arc(0, 0, WCM_R, 0, Math.PI * 2);
g.fill();
var wg = g.createRadialGradient(0, 0, last.S, 0, 0, last.E + 60);
wg.addColorStop(0, "#3A2E40");
wg.addColorStop(1, "#1E1622");
g.fillStyle = wg;
g.beginPath();
g.arc(0, 0, last.E + 60, 0, Math.PI * 2);
g.fill();
P.wild.forEach(function (W) { g.fillStyle = W[3] < 0.5 ? "rgba(20,14,24,0.7)" : "rgba(80,60,90,0.45)"; g.beginPath(); g.arc(W[0], W[1], W[2] * (W[3] < 0.5 ? 1.4 : 0.8), 0, Math.PI * 2); g.fill(); });
g.fillStyle = "rgba(150,140,160,0.55)";
g.fill(P.dead);
g.fillStyle = "#3E7EA8";
g.beginPath();
g.arc(0, 0, last.S, 0, Math.PI * 2);
g.fill();
for (var i = R.length - 2; i >= 0; i--) {
var Ri = R[i];
g.fillStyle = wcmHex(Ri.col, 0.1);
g.beginPath();
g.arc(0, 0, Ri.E, 0, Math.PI * 2);
g.fill();
if (Ri.k === "harvest") {
g.save();
g.beginPath();
g.arc(0, 0, Ri.E, 0, Math.PI * 2);
g.arc(0, 0, Ri.S, 0, Math.PI * 2, true);
g.clip();
P.fields.forEach(function (F) {
g.save();
g.translate(Math.cos(F[0]) * F[1], Math.sin(F[0]) * F[1]);
g.rotate(F[0]);
g.fillStyle = F[4] < 0.35 ? "#C8B868" : F[4] < 0.7 ? "#8AAA4A" : "#A8984A";
g.fillRect(-F[2] / 2, -F[3] / 2, F[2], F[3]);
g.strokeStyle = "rgba(60,50,20,0.25)";
g.lineWidth = 1.2;
for (var q = -F[2] / 2 + 4; q < F[2] / 2; q += 6) {
g.beginPath();
g.moveTo(q, -F[3] / 2);
g.lineTo(q, F[3] / 2);
g.stroke();
}
g.restore();
});
g.restore();
}
if (i > 0) {
g.fillStyle = "#3E7EA8";
g.beginPath();
g.arc(0, 0, Ri.S, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "rgba(230,220,190,0.8)";
g.lineWidth = Math.max(1 / s, 1.2);
g.beginPath();
g.arc(0, 0, Ri.S, 0, Math.PI * 2);
g.stroke();
g.beginPath();
g.arc(0, 0, R[i - 1].E, 0, Math.PI * 2);
g.stroke();
}
}
if (opt.hi !== undefined && opt.hi !== null && R[opt.hi]) {
var Hr = R[opt.hi];
g.strokeStyle = "rgba(255,236,170,0.95)";
g.lineWidth = Math.max(3 / s, 6);
g.beginPath();
g.arc(0, 0, Hr.E, 0, Math.PI * 2);
g.stroke();
if (Hr.S > 0) {
g.beginPath();
g.arc(0, 0, Hr.S, 0, Math.PI * 2);
g.stroke();
}
}
P.lots.forEach(function (L) {
var c = WCM_LOT[L.k];
if (!c)
return;
g.save();
g.translate(L.x, L.z);
g.rotate(L.a + Math.PI / 2);
g.fillStyle = c[0];
g.globalAlpha = 0.85;
g.fillRect(-L.w / 2, -L.d / 2, L.w, L.d);
g.globalAlpha = 1;
if (L.k === "lido") {
g.fillStyle = "#2A9AD8";
g.fillRect(-12, -6, 24, 12);
g.strokeStyle = "#FFFFFF";
g.lineWidth = 1;
g.strokeRect(-12, -6, 24, 12);
}
g.restore();
});
if (typeof ATL_STREETS !== "undefined")
Object.keys(ATL_STREETS).forEach(function (k) {
ATL_STREETS[k].forEach(function (rs) {
g.strokeStyle = "#6A6258";
g.lineWidth = ATL_ROAD * 2 + 2;
g.beginPath();
g.arc(0, 0, rs, 0, Math.PI * 2);
g.stroke();
g.strokeStyle = "#8C8478";
g.lineWidth = ATL_ROAD * 2 - 1;
g.stroke();
if (s > 0.6) {
g.strokeStyle = "rgba(250,240,200,0.7)";
g.lineWidth = 0.4;
g.setLineDash([4, 6]);
g.stroke();
g.setLineDash([]);
}
});
});
ATL_STAIRS.forEach(function (st) {
var w = st.half * 2, a = st.a, r0 = R[0].E * 0.55, r1 = R[R.length - 2].E + 4;
g.save();
g.rotate(a);
g.fillStyle = st.main ? "#E8DCC0" : "#D0C4A8";
g.fillRect(r0, -w / 2, r1 - r0, w);
g.strokeStyle = "rgba(90,70,40,0.6)";
g.lineWidth = Math.max(0.6, 1 / s);
g.strokeRect(r0, -w / 2, r1 - r0, w);
if (s > 0.35) {
g.strokeStyle = "rgba(120,100,70,0.35)";
g.lineWidth = 0.5;
for (var q = r0; q < r1; q += 6) {
g.beginPath();
g.moveTo(q, -w / 2);
g.lineTo(q, w / 2);
g.stroke();
}
}
g.restore();
});
var pg = g.createRadialGradient(0, 0, 10, 0, 0, R[0].E);
pg.addColorStop(0, "#F2EAD6");
pg.addColorStop(1, "#D6CCB4");
g.fillStyle = pg;
g.beginPath();
g.arc(0, 0, R[0].E, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "rgba(150,130,90,0.5)";
g.lineWidth = 1.5;
for (var rr = 30; rr < R[0].E; rr += 30) {
g.beginPath();
g.arc(0, 0, rr, 0, Math.PI * 2);
g.stroke();
}
g.fillStyle = "#5A9A4A";
g.fill(P.green);
g.fillStyle = "rgba(20,14,8,0.32)";
g.fill(P.shadow);
Object.keys(P.roof).forEach(function (c) { g.fillStyle = c; g.fill(P.roof[c]); });
if (s > 0.25) {
g.strokeStyle = "rgba(30,20,10,0.55)";
g.lineWidth = Math.min(1.2, 0.9 / s);
Object.keys(P.roof).forEach(function (c) { g.stroke(P.roof[c]); });
}
g.fillStyle = "#4AA8D8";
g.fill(P.water);
g.strokeStyle = "rgba(255,255,255,0.7)";
g.lineWidth = Math.min(1, 0.8 / s);
g.stroke(P.water);
g.fillStyle = "#3A7A34";
g.fill(P.trees);
if (s > 0.5) {
g.fillStyle = "rgba(140,200,110,0.55)";
g.save();
g.translate(-0.8, -0.8);
g.fill(P.trees);
g.restore();
}
var tg = g.createRadialGradient(0, 0, 4, 0, 0, 60);
tg.addColorStop(0, "rgba(255,244,190,0.95)");
tg.addColorStop(1, "rgba(255,220,120,0)");
g.fillStyle = tg;
g.beginPath();
g.arc(0, 0, 60, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#E8C860";
g.beginPath();
g.arc(0, 0, 14, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "#5A4010";
g.lineWidth = 2;
g.stroke();
}
function wcmLabels(g) { return __ZC(455, 22, this, arguments, new.target); }
function wcmHereXY() { return __ZC(455, 23, this, arguments, new.target); }
function wcmFit() { var d = WCM.vw < 700 || !WCM.list ? WCM.vw : WCM.vw - 340; WCM.s = Math.min(d, WCM.vh) / (WCM_R * 2) * 0.98; WCM.ox = d / 2; WCM.oy = WCM.vh / 2; }
function wcmClamp() {
var minS = Math.min(WCM.vw, WCM.vh) / (WCM_R * 2) * 0.8;
WCM.s = Math.max(minS, Math.min(8, WCM.s));
var r = WCM_R * WCM.s;
WCM.ox = Math.max(WCM.vw - r - 40, Math.min(r + 40, WCM.ox));
WCM.oy = Math.max(WCM.vh - r - 40, Math.min(r + 40, WCM.oy));
}
function wcmFastPicture() { return __ZC(455, 24, this, arguments, new.target); }
function wcmPaint(sharp) { return __ZC(455, 25, this, arguments, new.target); }
function wcmDirty() {
WCM.gen = (WCM.gen || 0) + 1;
if (!WCM.raf)
WCM.raf = requestAnimationFrame(function () { WCM.raf = 0; if (WCM.sharpGen !== WCM.gen)
wcmPaint(false); });
clearTimeout(WCM.idleT);
WCM.idleT = setTimeout(function () { wcmPaint(true); }, 140);
}
function wcmZoomAt(px, py, f) { var mx = (px - WCM.ox) / WCM.s, my = (py - WCM.oy) / WCM.s; WCM.s *= f; WCM.ox = px - mx * WCM.s; WCM.oy = py - my * WCM.s; wcmClamp(); wcmDirty(); }
function wcmCenter(x, z, s) { if (s)
WCM.s = Math.max(WCM.s, s); var d = WCM.vw < 700 || !WCM.list ? WCM.vw : WCM.vw - 340; WCM.ox = d / 2 - x * WCM.s; WCM.oy = WCM.vh / 2 - z * WCM.s; wcmClamp(); wcmDirty(); }
function wcmCss() { return __ZC(455, 26, this, arguments, new.target); }
function wcmOpen(opt) { return __ZC(455, 27, this, arguments, new.target); }
function wcmResize() {
var r = WCM.el.getBoundingClientRect();
WCM.vw = Math.max(1, r.width);
WCM.vh = Math.max(1, r.height);
WCM.dpr = Math.min(2, window.devicePixelRatio || 1);
WCM.cv.width = Math.round(WCM.vw * WCM.dpr);
WCM.cv.height = Math.round(WCM.vh * WCM.dpr);
}
function wcmTap(px, py) {
var best = null, bd = 30;
WCM.P.names.forEach(function (N) { var x = WCM.ox + N.x * WCM.s, y = WCM.oy + N.z * WCM.s, d = Math.hypot(x - px, y - py); if (d < bd) {
bd = d;
best = N;
} });
if (best)
wcmPick(best.n, best.x, best.z);
else {
WCM.pick = null;
wcmWhere(null);
wcmPaint(true);
}
}
function wcmPick(n, x, z) { return __ZC(455, 28, this, arguments, new.target); }
function wcmWhere(h, html) { var w = WCM.el && WCM.el.querySelector(".wc-where"); if (!w)
return; if (!h) {
w.style.display = "none";
return;
} if (html)
w.innerHTML = h;
else
w.textContent = h; w.style.display = "block"; }
function wcmListFill(q) { return __ZC(455, 29, this, arguments, new.target); }
function wcmClose() { return __ZC(455, 30, this, arguments, new.target); }
function wmMapsCard() { return __ZC(455, 31, this, arguments, new.target); }
(function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-maps"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-maps";
b.title = "The Atlas of All Worlds, and the map of Somnucor";
b.textContent = "🗺️ Maps";
b.onclick = function () { if (typeof closeMenu === "function")
try {
closeMenu();
}
catch (e) { } wmMapsCard(); };
var pk = document.getElementById("me-worlds");
if (pk && pk.parentNode === bar)
bar.insertBefore(b, pk);
else
bar.appendChild(b);
})();
try {
if (typeof PS_SECTIONS !== "undefined") {
var wmSec = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (wmSec && wmSec.ids.indexOf("me-maps") < 0)
wmSec.ids.unshift("me-maps");
}
}
catch (e) { }
(function () {
if (typeof backRegister === "function")
backRegister({ order: 19, open: function () { return WM.open || WCM.open; }, close: function () { if (WCM.open)
wcmClose();
else
wmClose(); } });
if (typeof backOneStep === "function") {
var bo = backOneStep;
backOneStep = function () { if (WCM.open) {
wcmClose();
return true;
} if (WM.open) {
wmClose();
return true;
} return bo.apply(this, arguments); };
}
addEventListener("keydown", function (e) { if (e.key !== "Escape")
return; if (WCM.open) {
wcmClose();
e.stopImmediatePropagation();
}
else if (WM.open) {
wmClose();
e.stopImmediatePropagation();
} }, true);
if (typeof rmapOpen === "function") {
var ro = rmapOpen;
rmapOpen = function (K) { try {
if (wcmReady()) {
wcmOpen({ ring: K && K.ring });
return;
}
}
catch (e) {
if (window.console)
console.warn("[world-maps] kiosk", e);
} return ro.apply(this, arguments); };
}
if (typeof rmapDrawCity === "function") {
var rd = rmapDrawCity;
rmapDrawCity = function (g, ox, oy, S, opt) {
var M = rd.apply(this, arguments);
try {
if (!wcmReady())
return M;
var own = !WCM.P;
if (own)
WCM.P = wcmGather();
var R = ATL_RINGS, outer = R[R.length - 1].S + 120, sc = (S / 2 - 8) / outer;
g.save();
g.beginPath();
g.arc(ox + S / 2, oy + S / 2, R[R.length - 1].E * sc, 0, Math.PI * 2);
g.clip();
g.translate(ox + S / 2, oy + S / 2);
g.scale(sc, sc);
wcmDraw(g, sc, opt);
g.restore();
if (own)
WCM.P = null;
var fs = Math.max(9, Math.round(S / 36)), cx = ox + S / 2, cy = oy + S / 2;
g.save();
g.font = "bold " + fs + "px Georgia, serif";
g.textAlign = "center";
g.textBaseline = "middle";
for (var j = 1; j < R.length; j++) {
var mid = (R[j].S + R[j].E) / 2 * sc, ang = -Math.PI / 2 - 0.2, tx = cx + Math.cos(ang) * mid, ty = cy + Math.sin(ang) * mid;
g.lineWidth = 3;
g.strokeStyle = "rgba(20,16,10,0.85)";
g.strokeText(String(j), tx, ty);
g.fillStyle = j === R.length - 1 ? "#E8D8F8" : "#FFFDF4";
g.fillText(String(j), tx, ty);
}
g.restore();
}
catch (e) {
if (window.console)
console.warn("[world-maps] board", e);
}
return M;
};
}
})();
(function () {
if (typeof gfxRender !== "function")
return;
var gr = gfxRender, last = 0;
gfxRender = function () {
if ((WM.open || WCM.open) && !(typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting)) {
var now = performance.now();
if (now - last < 500)
return;
last = now;
}
return gr.apply(this, arguments);
};
})();
var WMS_OZ = [["The Wonderful Wizard of Oz", 1900], ["The Marvelous Land of Oz", 1904], ["Ozma of Oz", 1907], ["Dorothy and the Wizard in Oz", 1908],
["The Road to Oz", 1909], ["The Emerald City of Oz", 1910], ["The Patchwork Girl of Oz", 1913], ["Tik-Tok of Oz", 1914], ["The Scarecrow of Oz", 1915],
["Rinkitink in Oz", 1916], ["The Lost Princess of Oz", 1917], ["The Tin Woodman of Oz", 1918], ["The Magic of Oz", 1919], ["Glinda of Oz", 1920]];
var WMS_HOST = { "land:station": "orbital", "land:templerow": "city", "world:surface:moon": "moon", "world:surface:mars": "mars" };
function wmsHostKey(h) {
if (WMS_HOST[h])
return WMS_HOST[h];
var k = String(h || "").replace(/^(land|world):/, "").replace(/^surface:/, "");
return wmNodeOf(k) ? k : "ctale";
}
function wmsGather() { return __ZC(455, 32, this, arguments, new.target); }
function wmsByHost(cat) {
var by = {};
(WM.stories || []).forEach(function (S) { if (S.self && !cat)
return; if (cat && (S.cat || "story") !== cat)
return; (by[S.host] = by[S.host] || []).push(S); });
Object.keys(by).forEach(function (k) { by[k].sort(function (a, b) { return wmsRank(a) - wmsRank(b); }); });
return by;
}
function wmsRank(S) { if (!S.cat)
return 0; if (/^g:hands/.test(S.id))
return 1; if (/^g:hnd_/.test(S.id))
return 2; if (/^A hidden/.test(S.t))
return 5; if (/^g:gld_/.test(S.id))
return 3; return 4; }
function wmsCount(cat) { return (WM.stories || []).filter(function (S) { return (S.cat || "story") === cat; }).length; }
function wmapHead(L) {
var st = L.filter(function (S) { return !S.cat; }).length, gu = L.length - st, a = [];
if (st)
a.push("📖 " + st + (st === 1 ? " story" : " stories"));
if (gu)
a.push("⚒️ " + gu + (gu === 1 ? " guild" : " guilds"));
return a.join(" · ");
}
function wmsTags() { return __ZC(455, 33, this, arguments, new.target); }
function wmsDraw(g, s) { return __ZC(455, 34, this, arguments, new.target); }
function wmsCardHtml(k) { return __ZC(455, 35, this, arguments, new.target); }
function wmsList(on, cat) { return __ZC(455, 36, this, arguments, new.target); }
function wmsLight(id) {
var c = WM.el && WM.el.querySelector(".wm-card");
if (!c)
return;
c.querySelectorAll(".wms-s").forEach(function (d) { var on = d.getAttribute("data-s") === id; d.classList.toggle("wms-on", on); if (on && d.scrollIntoView)
try {
d.scrollIntoView({ block: "nearest" });
}
catch (e) { } });
}
