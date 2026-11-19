/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var VRN = { base: -1100000, G: null, built: false, t: 0, lite: false, zone: "harbour", mats: {}, tex: {},
solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [], fx: [], districts: [], water: [],
ride: null, dive: false, busy: false, pt: 0, vt: 0, moving: false, insideOf: null, run: null, state: null, rules: null, sea: null };
var VRN_KEY = "verne";
var VRN_NAME = "Jules Verne's World";
var VRN_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
var VRN_BOUND = { x0: -5600, x1: 4800, z0: -4800, z1: 4600 };
var VRN_AFR = { x0: 5000, x1: 11800, z0: -3600, z1: 3600 };
var VRN_UG_X = 22000;
var VRN_RW = { x: 32000, z: 0, r: 2600 };
var VRN_IN_X = 40000;
var VRN_SEA_Y = 0;
var VRN_SPOTS = {
arrive: { x: 60, z: 60, name: "the Quay of the Voyages" },
palace: { x: -60, z: -150, name: "the Palace of the Exposition" },
verne: { x: 300, z: -40, name: "Verne's house" },
reform: { x: -330, z: -40, name: "the Reform Club" },
gunclub: { x: 450, z: -210, name: "the Gun Club" },
weldon: { x: -560, z: -230, name: "the Weldon Institute" },
field: { x: -560, z: -400, name: "the balloon field" },
mast: { x: -720, z: -300, name: "Robur's mast" },
society: { x: 150, z: -260, name: "the Geographical Society" },
chandler: { x: -210, z: 80, name: "the ship chandler's" },
foundry: { x: 620, z: -40, name: "the Exposition foundry" },
lighthouse: { x: 880, z: 120, name: "the lighthouse" },
dock: { x: 1150, z: 160, name: "the Nautilus dock" },
village: { x: 200, z: -2350, name: "Stapi, the turf village" },
crater: { x: 200, z: -3300, name: "the crater of Snaefells" },
stones: { x: 3200, z: -1100, name: "Stone's Hill" },
granite: { x: -2560, z: 520, name: "Granite House" },
chimneys: { x: -2520, z: 760, name: "the Chimneys" },
beach: { x: -3200, z: 1480, name: "the south beach of Lincoln Island" },
corral: { x: -3300, z: 120, name: "the corral" },
stromboli: { x: 1350, z: 1350, name: "Stromboli" },
zanzibar: { x: 11250, z: 300, name: "Zanzibar" }
};
var VRN_TOWN = { x0: -900, x1: 1100, z0: -560, z1: 150, y: 3 };
var VRN_ISL = { x: -3500, z: 600, r: 1050, mx: -3780, mz: 260, peak: 380, lake: { x: -2930, z: 470, r: 170, y: 52 }, heights: 55, cliffX: -2560 };
var VRN_SNF = { x: 200, z: -3300, h: 560, r: 1000, village: { x: 200, z: -2350, y: 62 } };
var VRN_STONE = { x: 3200, z: -1100, r: 520, y: 14 };
var VRN_STROM = { x: 1350, z: 1350, r: 280, h: 150 };
var VRN_PAY = { race: ["Round the world in under eighty days", 40], tour: ["Captain Nemo's grand tour", 25], island: ["The Mysterious Island, to the end", 40],
centre: ["The Journey to the Centre of the Earth", 40], moon: ["Round the Moon and home", 25], balloon: ["Across Africa by balloon", 25],
design: ["A design that works", 15], lesson: ["A lesson learned", 10], exam: ["The Fellowship examination", 30] };
var VRN_KEEP = { race: ["vrn_card", "A Reform Club playing card", "🃏"], tour: ["vrn_shell", "A shell from Nemo's museum", "🐚"], island: ["vrn_lens", "A watch-glass burning lens", "🔍"],
centre: ["vrn_rune", "Saknussemm's rune slip", "📜"], moon: ["vrn_medal", "A Gun Club medal", "🎖️"], balloon: ["vrn_leaf", "An acacia leaf from the Victoria's flight", "🍃"],
design: ["vrn_plan", "A blueprint of your own machine", "📐"], lesson: ["vrn_notes", "A page of lecture notes", "📝"], exam: ["vrn_seal", "The Geographical Society's seal", "🏅"] };
var VRN_FOLK = {
verne: { name: "Jules Verne", look: { sex: "m", layer: "suit", layerColor: 0x2A2A30, top: 0xF2EEE2, bottom: 0x2A2A30, hair: 0x8A8A84, beard: 1, shoes: 0x1A1A1A },
persona: "Jules Verne himself, in 1870, at his desk in the round-towered corner house: a warm, curious, hard-working writer from Nantes who reads every science journal he can find, takes notes on cards, and loves the sea and his boat the Saint-Michel. He is happy to talk about any of his books, where the ideas came from (the real scientists, explorers and engineers he read), and what he got right and wrong. He never claims to have invented the submarine or the moon rocket: he imagined them carefully from the science of his day.",
greet: "Come in, come in! Mind the papers. I keep a card for every fact I've ever read... twenty thousand of them, I'm afraid. Which voyage shall we talk about?" },
fogg: { name: "Phileas Fogg", look: { sex: "m", layer: "suit", layerColor: 0x1A1A22, top: 0xF4F2EA, bottom: 0x3A3A44, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x6A5030, shoes: 0x101010 },
persona: "Phileas Fogg of the Reform Club, London, 1872: precise, calm, unhurried, never surprised, a man who lives by the clock. He bet twenty thousand pounds he could go round the world in eighty days. He speaks briefly and exactly, and is kinder than he looks.",
greet: "Good evening. The thing is possible. I will wager it with anyone. Eighty days: not one more." },
passe: { name: "Passepartout", look: { sex: "m", layer: "jacket", layerColor: 0x6A3A2A, top: 0xF2EEE2, bottom: 0x3A3030, hair: 0x2A1A12, hairStyle: "curly", shoes: 0x2A1A12 },
persona: "Jean Passepartout, Fogg's French servant: cheerful, brave, a former acrobat and fireman, forever getting into trouble (a temple in Bombay, an opium den in Hong Kong, a circus in Yokohama) and forever getting out of it. Loyal to his master to the end.",
greet: "Bonjour! Ah, you look like someone who is about to travel. Have you a gas lamp left burning at home? I did, all the way round the world!" },
barbicane: { name: "Impey Barbicane", look: { sex: "m", layer: "longcoat", layerColor: 0x1E1E26, top: 0xF2EEE2, bottom: 0x1E1E26, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x5A4A3A, shoes: 0x101010 },
persona: "Impey Barbicane, president of the Gun Club of Baltimore, 1865: cool-headed, serious, a great artillery engineer with nothing to do since the war ended, who proposes to fire a shell to the Moon. He explains the sums plainly: the speed, the aim, the date.",
greet: "Sir, the Gun Club has done with war. We propose a nobler target: the Moon." },
maston: { name: "J. T. Maston", look: { sex: "m", layer: "jacket", layerColor: 0x3A3A40, top: 0xE8E4DC, bottom: 0x2A2A30, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x2A2A2A, shoes: 0x101010 },
persona: "J. T. Maston, secretary of the Gun Club: loud, excitable, brilliant with numbers, with an iron hook for a hand and a skull plate of gutta-percha from the war. He would fire anything at anything for the joy of the calculation.",
greet: "Calculations! I live on them. Give me a number and I'll give you a cannon." },
ardan: { name: "Michel Ardan", look: { sex: "m", layer: "jacket", layerColor: 0x8A5A2A, top: 0xF2EEE2, bottom: 0x4A3A2A, hair: 0xC86A2A, hairStyle: "curly", shoes: 0x2A1A12 },
persona: "Michel Ardan, a bold, laughing Frenchman with a lion's mane of red hair, who telegraphs the Gun Club: 'Replace spherical shell by cylindro-conical projectile. Shall go inside.' Afraid of nothing, wonderful company.",
greet: "Why fire an empty shell? Make it hollow and I shall ride in it! Who's coming?" },
fergusson: { name: "Dr Samuel Fergusson", look: { sex: "m", layer: "jacket", layerColor: 0x5A5A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, hat: "cap", hatColor: 0x5A5A3A, hair: 0x5A3A2A, beard: 1, shoes: 0x2A1A12 },
persona: "Dr Samuel Fergusson, explorer, 1862: calm, scientific, who means to cross Africa from east to west in the balloon Victoria. His secret is a heater that warms the hydrogen to rise and lets it cool to sink, so he never wastes gas or ballast: he steers by choosing the height where the wind blows his way.",
greet: "A balloon cannot be steered, they say. Quite true. But the winds can be chosen, if one knows how to climb and sink." },
joe: { name: "Joe", look: { sex: "m", layer: "vest", layerColor: 0x6A4A2A, top: 0xE8E0D0, bottom: 0x4A3A2A, hair: 0x2A1A12, shoes: 0x2A1A12 },
persona: "Joe, Dr Fergusson's devoted, cheerful, nimble servant, who would follow the Doctor anywhere and has the sharpest eyes in the sky.",
greet: "The Doctor's never been wrong yet. If he says we'll fly across Africa, we'll fly across Africa!" },
robur: { name: "Robur the Conqueror", look: { sex: "m", layer: "longcoat", layerColor: 0x1A1A1A, top: 0x2A2A2A, bottom: 0x1A1A1A, hair: 0x1A1A1A, beard: 1, shoes: 0x101010 },
persona: "Robur, the engineer of the great flying ship Albatross, 1886: proud, fierce, certain that heavier-than-air machines will rule the sky and that balloons are toys. He scorns the Weldon Institute's balloon men but is generous to anyone who truly wants to learn to fly.",
greet: "Balloons! Gas bags at the mercy of every breeze. The future belongs to the machine that is heavier than air. Come aboard the Albatross, and see." },
prudent: { name: "Uncle Prudent", look: { sex: "m", layer: "suit", layerColor: 0x4A3A2A, top: 0xF2EEE2, bottom: 0x4A3A2A, hat: "tophat", hatColor: 0x2A2A2A, hair: 0x9A9A94, beard: 1, shoes: 0x1A1A1A },
persona: "Uncle Prudent, president of the Weldon Institute of Philadelphia, a club of balloon enthusiasts: stubborn, argumentative, sure the future is the great steerable balloon, and still cross that Robur carried him off in the Albatross.",
greet: "Welcome to the Weldon Institute, where the lighter-than-air is honoured. Pay no attention to that fellow on the mast." },
nemo: { name: "Captain Nemo", look: { sex: "m", layer: "longcoat", layerColor: 0x1E2A3A, top: 0xE8E4DC, bottom: 0x1E2A3A, hat: "cap", hatColor: 0x1E2A3A, hair: 0x2A2A2A, beard: 1, shoeKind: "boots", shoes: 0x101010 },
persona: "Captain Nemo of the Nautilus, 1868: proud, grave, learned, a lover of the sea and of music and science, who has cut himself off from the land for reasons he will not tell. Courteous to guests. His motto is 'Mobilis in mobili', moving in the moving element. He knows every reef and creature of the oceans, and speaks of them with deep feeling.",
greet: "Welcome aboard the Nautilus. The sea is everything. It covers seven tenths of the globe. Here, one is free." },
aronnax: { name: "Professor Aronnax", look: { sex: "m", layer: "suit", layerColor: 0x5A4A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, face: "glasses", hair: 0x8A8A8A, beard: 1, shoes: 0x2A1A12 },
persona: "Pierre Aronnax, professor at the Paris Museum of Natural History, the narrator of Twenty Thousand Leagues: amazed by everything, eager to name every fish and coral, torn between wonder at Nemo's ship and the wish to go home.",
greet: "Every fish, every coral, I note them all! What a laboratory this ocean is." },
conseil: { name: "Conseil", look: { sex: "m", layer: "vest", layerColor: 0x3A3A4A, top: 0xF2EEE2, bottom: 0x3A3A4A, hair: 0x2A1A12, shoes: 0x1A1A1A },
persona: "Conseil, Professor Aronnax's calm, loyal Flemish servant, who can classify any creature by class, order and family but cannot tell one fish from another by sight. Always says 'if master pleases'.",
greet: "If master pleases, I can tell you the class, order and family of anything that swims past." },
ned: { name: "Ned Land", look: { sex: "m", layer: "jacket", layerColor: 0x8A3A2A, top: 0xE8DCC0, bottom: 0x3A3A3A, hat: "beanie", hatColor: 0x3A3A3A, hair: 0xA8642A, beard: 1, shoeKind: "boots", shoes: 0x2A1A12 },
persona: "Ned Land, the hot-tempered Canadian master harpooner, the best there is, who wants land under his feet, fresh meat, and to get off the Nautilus as soon as he can.",
greet: "A fine boat, sure. But a man needs land under his feet. Keep your eyes open, friend." },
cyrus: { name: "Cyrus Smith", look: { sex: "m", layer: "jacket", layerColor: 0x4A4A3A, top: 0xE8E0D0, bottom: 0x4A4A3A, hair: 0x5A4A3A, beard: 1, shoeKind: "boots", shoes: 0x2A1A12 },
persona: "Cyrus Smith, the engineer, 1865: calm, practical, a Union officer who escaped from Richmond by balloon. He believes knowledge is the greatest tool, and he can make almost anything from what nature gives: fire, bricks, iron, glass, a telegraph. He teaches as he works, and never gives up.",
greet: "We have nothing, you say? We have our hands, our heads, and an island. That is a great deal. Let us begin." },
pencroft: { name: "Pencroft", look: { sex: "m", layer: "jacket", layerColor: 0x2A3A5A, top: 0xE8E0D0, bottom: 0x2A2A3A, hat: "cap", hatColor: 0x2A2A3A, hair: 0x5A3A1A, beard: 1, shoeKind: "boots", shoes: 0x2A1A12 },
persona: "Pencroft, the sailor: brave, warm-hearted, quick to grumble and quick to laugh, devoted to young Herbert, mad for tobacco, and convinced Mr Smith can do anything at all.",
greet: "Mr Smith'll get us out of this, you'll see. He'll make fire out of nothing and a ship out of a tree!" },
herbert: { name: "Herbert Brown", look: { sex: "m", layer: "vest", layerColor: 0x5A6A3A, top: 0xE8E0D0, bottom: 0x4A4A3A, hair: 0x8A5A2A, shoes: 0x2A1A12 },
persona: "Herbert Brown, fifteen, the sailor Pencroft's ward: a keen young naturalist who knows plants and animals from his books, brave and kind.",
greet: "Look at the birds here! I've never seen half of them. This island is a whole natural-history book." },
spilett: { name: "Gideon Spilett", look: { sex: "m", layer: "jacket", layerColor: 0x6A5A3A, top: 0xE8E0D0, bottom: 0x4A3A2A, hair: 0x3A2A1A, beard: 1, shoeKind: "boots", shoes: 0x2A1A12 },
persona: "Gideon Spilett, war correspondent of the New York Herald: cool, fearless, a fine shot and an even finer note-taker, who writes down everything that happens on the island.",
greet: "I've reported on battles, but this beats them all. Every page of my notebook is a wonder." },
neb: { name: "Neb", look: { sex: "m", layer: "vest", layerColor: 0x8A6A3A, top: 0xE8E0D0, bottom: 0x4A3A2A, skin: 0x5A3A26, hair: 0x1A1410, shoes: 0x2A1A12 },
persona: "Neb (Nebuchadnezzar), Cyrus Smith's devoted friend: free-born, brave, a fine cook and tireless worker, who searched the shore for days when Mr Smith was lost in the sea.",
greet: "Mr Cyrus came through the sea and the storm. Nothing on this island will stop him, nor us." },
lidenbrock: { name: "Professor Lidenbrock", look: { sex: "m", layer: "longcoat", layerColor: 0x4A3A2A, top: 0xF2EEE2, bottom: 0x3A3A3A, face: "glasses", hair: 0x9A9A94, shoes: 0x1A1A1A },
persona: "Professor Otto Lidenbrock of Hamburg, 1863, professor of mineralogy: impatient, explosive, tremendously learned, determined to follow the old alchemist Arne Saknussemm's path to the centre of the Earth, and quite unable to believe anything could stop him.",
greet: "Saknussemm went down. So shall we! Axel, the ropes! Hans, the lamps!" },
axel: { name: "Axel", look: { sex: "m", layer: "jacket", layerColor: 0x4A5A6A, top: 0xF2EEE2, bottom: 0x3A3A3A, hair: 0x8A6A3A, shoes: 0x2A1A12 },
persona: "Axel, the Professor's young nephew, the narrator: nervous, honest, in love with Graüben back in Hamburg, frightened of the whole idea, and yet he sees every wonder of the journey and tells it.",
greet: "My uncle means it. He truly means to go down there. Tell me I'm dreaming." },
hans: { name: "Hans Bjelke", look: { sex: "m", layer: "jacket", layerColor: 0x6A5A4A, top: 0xD8D0C0, bottom: 0x4A4A3A, hair: 0xD8C8A0, beard: 1, shoeKind: "boots", shoes: 0x2A1A12 },
persona: "Hans Bjelke, the Icelandic eider-down hunter who guides the Professor and Axel: tall, silent, utterly calm, strong and kind, who says very little and saves their lives again and again. He is paid every Saturday, three rix-dollars, wherever he is.",
greet: "Hvad behöves? ...He means: what is needed? Hans says little. He does much." },
diver: { name: "The pearl diver of Ceylon", look: { sex: "m", top: 0xE8E0D0, bottom: 0xE8E0D0, skin: 0x6A4A30, hair: 0x1A1410, shoes: 0x6A4A30 },
persona: "A poor pearl diver of the Gulf of Mannar, off Ceylon, saved from a shark by Captain Nemo, who gave him a bag of pearls. He tells you the strange captain comes to these waters, then goes away south and east, where there is a far reef with a curtain of black coral that no diver dares.",
greet: "The man with the iron boat saved me from the shark. He gave me pearls. He goes to a far reef, they say, where the black coral grows like a curtain." }
};
var VRN_BEASTS = {
vrn_shark: { name: "Shark of the Deep", body: "kit", arch: "shark", scale: 1.1, hp: 70, spd: 5.2, dmg: 11, reach: 2.6, spoil: ["A shark's tooth", "🦈"], growl: 200 },
vrn_squid: { name: "Giant squid", body: "kit", arch: "kraken", scale: 0.5, hp: 140, spd: 3.2, dmg: 14, reach: 3.4, big: 1, spoil: ["A giant squid's beak", "🦑"], growl: 120 },
vrn_bear: { name: "Cave bear of the lost age", body: "kit", arch: "bear", scale: 1.35, hp: 150, spd: 3.8, dmg: 15, reach: 2.6, spoil: ["A cave bear's claw", "🐾"], growl: 110 },
vrn_boar: { name: "Giant boar of the deep shore", body: "kit", arch: "boar", scale: 1.6, hp: 110, spd: 4.4, dmg: 13, reach: 2.4, spoil: ["A great tusk of the lost age", "🦴"], growl: 130 },
vrn_cat: { name: "Wild cat of the Far West", body: "kit", arch: "tiger", scale: 0.85, hp: 75, spd: 5.6, dmg: 11, reach: 2.2, spoil: ["A wild cat's claw", "🐾"], growl: 180 },
vrn_convict: { name: "Bob Harvey's convict", body: "person", arm: "cutlass", hp: 60, spd: 4.4, dmg: 10, reach: 1.9,
look: { top: 0x6A5A4A, bottom: 0x3A3A3A, hat: "bandana", hatColor: 0x8A2A2A, layer: "vest", layerColor: 0x4A3A2A }, spoil: ["A torn sailor's neckerchief", "🧣"], growl: 240 },
vrn_gunman: { name: "Convict with a musket", body: "person", arm: "flintlock", hp: 50, spd: 3.8, dmg: 9, reach: 2, shot: { r: 18, c: 0xE8D8B0 },
look: { top: 0x5A4A3A, bottom: 0x2A2A2A, hat: "cap", hatColor: 0x2A2A2A, layer: "jacket", layerColor: 0x3A3A3A }, spoil: ["A powder-horn stopper", "🔩"], growl: 260 }
};
var VRN_BEASTS_AT = { deep: ["vrn_shark", "vrn_shark", "vrn_shark", "vrn_squid"], under: ["vrn_bear", "vrn_boar", "vrn_bear"], wild: ["vrn_cat", "vrn_cat", "vrn_convict", "vrn_gunman", "vrn_convict"] };
function vrnDangerZone(z) { return z === "deep" || z === "under" || z === "farwest" || z === "serpentine"; }
function vrnZoneLevel(base) { return vrnDangerZone(VRN.zone) ? base : 0; }
function vrnTex(name, mpt) { return __ZC(359, 0, this, arguments, new.target); }
function vrnSurf(name, tint, mpt, o) { return __ZC(359, 1, this, arguments, new.target); }
function vrnC(col, o) { return __ZC(359, 2, this, arguments, new.target); }
function vrnMetal(col) { return vrnC(col, { shine: 70, spec: 0x6A6A6A }); }
function vrnBrass() { return vrnC(0xC8A04A, { shine: 80, spec: 0x8A7040 }); }
function vrnGlowM(col) { var k = "g" + col; return VRN.mats[k] || (VRN.mats[k] = wB(col)); }
function vrnUVm(g) { return __ZC(359, 3, this, arguments, new.target); }
function vrnBoxM(w, h, d, mat, x, y, z, parent) { var m = new THREE.Mesh(vrnUVm(new THREE.BoxGeometry(w, h, d)), mat); m.position.set(x, y, z); (parent || VRN.G).add(m); return m; }
function vrnS(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function vrnSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz))); return Math.hypot(x - ax - dx * t, z - az - dz * t); }
var VRN_DEEP = [
{ k: "torres", x: 1600, z: 800, r: 230, y: -5, name: "the reefs of the Torres Strait" },
{ k: "forest", x: 300, z: 1150, r: 330, y: -22, name: "the forest of Crespo Island" },
{ k: "pearl", x: -600, z: 1100, r: 240, y: -12, name: "the pearl bank of Ceylon" },
{ k: "cemetery", x: 950, z: 1750, r: 150, y: -30, name: "the coral cemetery" },
{ k: "atlantis", x: 700, z: 2700, r: 480, y: -78, name: "Atlantis" },
{ k: "vigo", x: -900, z: 2700, r: 270, y: -55, name: "the treasure of Vigo Bay" },
{ k: "squid", x: 1900, z: 3300, r: 320, y: -95, name: "the squid deeps" },
{ k: "grotto", x: -1800, z: 3560, r: 70, y: -48, name: "the far reef" }
];
var VRN_RIDGE = { ax: -1350, az: 2060, bx: -50, bz: 2060, w: 80, y: -16, tx: -700 };
var VRN_REEF = { ax: -2350, az: 3450, bx: -1250, bz: 3450, w: 95, y: -10 };
var VRN_VOLC = { x: 960, z: 3000, r: 150, y: -36 };
function vrnSeaBed(x, z) { return __ZC(359, 4, this, arguments, new.target); }
var VRN_PADS = [
{ k: "village", x: 200, z: -2250, r: 130, e: 90, y: null },
{ k: "stones", x: 3200, z: -1100, r: 520, e: 220, y: 14 },
{ k: "corral", x: -3300, z: 120, r: 60, e: 60, y: null },
{ k: "lookout", x: -3000, z: 900, r: 40, e: 40, y: null }
];
function vrnMainland(x, z) { return __ZC(359, 5, this, arguments, new.target); }
function vrnSnaef(x, z) { var S = VRN_SNF, d = Math.hypot(x - S.x, z - S.z), h = S.h * Math.exp(-Math.pow(d / 700, 1.5)); if (d < 170)
h = Math.min(h, S.h - 95 + Math.pow(d / 170, 2) * 60); return h; }
function vrnIslandIn(x, z) {
var I = VRN_ISL, a = Math.atan2(z - I.z, x - I.x), R = I.r + 150 * Math.sin(3 * a + 0.4) + 80 * Math.sin(5 * a + 1.3), d = Math.hypot(x - I.x, z - I.z);
if (x > -2700 && z > 200 && z < 900)
R = Math.max(R, Math.hypot(-2440 - I.x, z - I.z));
var inl = R - d, sp = 120 - vrnSegD(x, z, -4150, 1050, -4760, 1760);
return Math.max(inl, sp);
}
function vrnIsland(x, z, inl) { return __ZC(359, 6, this, arguments, new.target); }
function vrnHRaw(x, z, noPads) { return __ZC(359, 7, this, arguments, new.target); }
function vrnPadY(P) { if (P.y !== null && P.y !== undefined)
return P.y; var s = 0; for (var a = 0; a < 8; a++)
s += vrnHRaw(P.x + Math.cos(a / 8 * 6.283) * P.r, P.z + Math.sin(a / 8 * 6.283) * P.r, true); return (P.y = Math.round(s / 8)); }
var VRN_AF = { coastW: 5350, coastE: 10950, zanz: { x: 11280, z: 300, r: 150 }, lake: { x: 8700, z: -150, r: 520, y: 110 }, chad: { x: 7150, z: -1900, r: 320, y: 70 },
moon: { x: 9350, z: 1500 }, falls: { x: 5720, z: 380 }, nile: [[8700, -150], [8550, -900], [8400, -1700], [8300, -2600], [8200, -3600]], niger: [[6600, -900], [6300, -200], [6100, 600], [5800, 1400], [5400, 2200]],
senegal: [[6400, 300], [5720, 380], [5350, 420]] };
function vrnAfrica(x, z) { return __ZC(359, 8, this, arguments, new.target); }
function vrnRiverY(list, x, z, w) { var best = 1e9; for (var i = 0; i < list.length - 1; i++) {
var d = vrnSegD(x, z, list[i][0], list[i][1], list[i + 1][0], list[i + 1][1]);
if (d < best)
best = d;
} return best < w ? best : null; }
function vrnWaterAt(x, z) { return __ZC(359, 9, this, arguments, new.target); }
function vrnLakeY() { return VRN.lakeDrained ? VRN_ISL.lake.y - 7 : VRN_ISL.lake.y; }
function vrnGridOf(B, S, fn) {
var nx = Math.round((B.x1 - B.x0) / S) + 1, nz = Math.round((B.z1 - B.z0) / S) + 1, H = new Float32Array(nx * nz);
for (var j = 0; j < nz; j++)
for (var i = 0; i < nx; i++)
H[j * nx + i] = (fn || vrnHRaw)(B.x0 + i * S, B.z0 + j * S);
return { B: B, S: S, nx: nx, nz: nz, H: H };
}
function vrnGridMake() {
VRN_PADS.forEach(function (P) { vrnPadY(P); });
VRN.grid = vrnGridOf(VRN_BOUND, VRN.lite ? 50 : 25);
VRN.agrid = vrnGridOf(VRN_AFR, VRN.lite ? 100 : 50);
}
function vrnGridH(g, x, z) {
var B = g.B, fx = (x - B.x0) / g.S, fz = (z - B.z0) / g.S, i = Math.floor(fx), j = Math.floor(fz);
if (i < 0 || j < 0 || i >= g.nx - 1 || j >= g.nz - 1)
return null;
var u = fx - i, v = fz - j, H = g.H, nx = g.nx, a = H[j * nx + i], b = H[j * nx + i + 1], c = H[(j + 1) * nx + i], d = H[(j + 1) * nx + i + 1];
return u + v < 1 ? a + (b - a) * u + (c - a) * v : d + (c - d) * (1 - u) + (b - d) * (1 - v);
}
function vrnLand(x, z) { return __ZC(359, 10, this, arguments, new.target); }
function vrnLandCol(x, z, h, slope, c) { return __ZC(359, 11, this, arguments, new.target); }
function vrnTerrainOf(G, g, tile, name, colFn) { return __ZC(359, 12, this, arguments, new.target); }
function vrnTerrain(G) { VRN.landTiles = vrnTerrainOf(G, VRN.grid, 1000, "vrn-land").concat(vrnTerrainOf(G, VRN.agrid, 1600, "vrn-africa")); }
var VRN_RIP = null;
function vrnWaterMat(col, op) { return __ZC(359, 13, this, arguments, new.target); }
function vrnSeaBuild(G) { return __ZC(359, 14, this, arguments, new.target); }
function vrnSeaTick(dt, L) { return __ZC(359, 15, this, arguments, new.target); }
var VRN_TREE = {};
function vrnLeafMat(col) { return __ZC(359, 16, this, arguments, new.target); }
function vrnCrownGeo(seed, sx, sy, sz, det) { return __ZC(359, 17, this, arguments, new.target); }
function vrnFrondGeo(n, len, wid, droop, top) { return __ZC(359, 18, this, arguments, new.target); }
function vrnTrunkGeo(r0, r1, h, bend, seg) {
var g = new THREE.CylinderGeometry(r1, r0, h, seg || (VRN.lite ? 5 : 7), VRN.lite ? 2 : 5);
g.translate(0, h / 2, 0);
if (bend) {
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i) / h;
p.setX(i, p.getX(i) + y * y * bend);
}
g.computeVertexNormals();
}
vrnUVm(g);
return g;
}
function vrnTreeKinds() { return __ZC(359, 19, this, arguments, new.target); }
function vrnTreeAt(x, z, R) { return __ZC(359, 20, this, arguments, new.target); }
function vrnTrees(G) { return __ZC(359, 21, this, arguments, new.target); }
function vrnTreesVis(L, away) { return __ZC(359, 22, this, arguments, new.target); }
var VRN_ENV = {
harbour: { top: 0x5A86C4, low: 0xF0D8B4, fog: 0xDCD4C8, fogD: 0.00030, sun: 1.08, sunCol: 0xFFE2B8, sunDir: [-0.5, 0.55, 0.35], hemi: 0.62, hemiCol: 0xD4E0F0, hemiGround: 0x5A5040 },
island: { top: 0x3A88D8, low: 0xD8EEF0, fog: 0xC8E0E4, fogD: 0.00028, sun: 1.15, sunCol: 0xFFF0D0, sunDir: [0.3, 0.8, 0.25], hemi: 0.68, hemiCol: 0xD8ECF8, hemiGround: 0x3A5A30 },
north: { top: 0x6A88A8, low: 0xD8DCE0, fog: 0xC8CED4, fogD: 0.00042, sun: 0.92, sunCol: 0xF0F0FF, sunDir: [0.2, 0.45, 0.6], hemi: 0.7, hemiCol: 0xD8E0EC, hemiGround: 0x404040 },
florida: { top: 0x4A8AD8, low: 0xF0E8D0, fog: 0xE8E0CC, fogD: 0.00026, sun: 1.15, sunCol: 0xFFF0D0, sunDir: [0.1, 0.85, 0.3], hemi: 0.66, hemiCol: 0xDCE8F8, hemiGround: 0x6A6040 },
africa: { top: 0x4A86D0, low: 0xF4DCB0, fog: 0xE8D4B0, fogD: 0.00020, sun: 1.2, sunCol: 0xFFE8C0, sunDir: [0.2, 0.85, 0.2], hemi: 0.62, hemiCol: 0xE0E8F4, hemiGround: 0x7A6040 },
deep: { top: 0x0E3A4A, low: 0x0E3A4A, fog: 0x0E4252, fogD: 0.022, sun: 0.5, sunCol: 0xA8E0F0, sunDir: [0.1, 0.95, 0.1], hemi: 0.62, hemiCol: 0x7AC0D0, hemiGround: 0x1A2A30 },
abyss: { top: 0x041420, low: 0x061A26, fog: 0x061C28, fogD: 0.03, sun: 0.25, sunCol: 0x7AA8C0, sunDir: [0.1, 0.95, 0.1], hemi: 0.5, hemiCol: 0x4A8098, hemiGround: 0x0A1018 },
under: { top: 0x3A3428, low: 0x5A5038, fog: 0x4A4434, fogD: 0.0022, sun: 0.62, sunCol: 0xFFE8B0, sunDir: [0.2, 0.9, 0.2], hemi: 0.72, hemiCol: 0xE8DCB0, hemiGround: 0x3A3020 },
gallery: { top: 0x1A1612, low: 0x2A2218, fog: 0x241E16, fogD: 0.012, sun: 0.35, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.2], hemi: 0.62, hemiCol: 0xE8D0A0, hemiGround: 0x2A2018 },
space: { top: 0x000006, low: 0x02020A, fog: 0x02020A, fogD: 0.00002, sun: 1.2, sunCol: 0xFFFFFF, sunDir: [0.7, 0.3, 0.4], hemi: 0.25, hemiCol: 0xA0A8C0, hemiGround: 0x101010, stars: 1 },
inside: { top: 0x2A2420, low: 0x3A3028, fog: 0x3A3028, fogD: 0.004, sun: 0.5, sunCol: 0xFFE4C0, sunDir: [0.3, 0.9, 0.2], hemi: 0.78, hemiCol: 0xF0E4D0, hemiGround: 0x4A3A2A },
world: { top: 0x6A9AD0, low: 0xE8E4DC, fog: 0xDADCDC, fogD: 0.00026, sun: 1.05, sunCol: 0xFFF0D8, sunDir: [-0.3, 0.7, 0.4], hemi: 0.66, hemiCol: 0xD8E4F4, hemiGround: 0x5A5A48 }
};
function vrnEnvNow() { return __ZC(359, 23, this, arguments, new.target); }
var VRN_FAC = {};
function vrnNoiseFill(x, W, H, base, amt, n) { return __ZC(359, 24, this, arguments, new.target); }
function vrnHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function vrnWin(x, H, px, py, w, h, o) { return __ZC(359, 25, this, arguments, new.target); }
function vrnFacTex(style, col, band) { return __ZC(359, 26, this, arguments, new.target); }
function vrnFacMat(style, col, band) {
var k = "f:" + style + ":" + col + ":" + band;
if (VRN.mats[k])
return VRN.mats[k];
var m = new THREE.MeshLambertMaterial({ map: vrnFacTex(style, col, band) });
if (style === "iron") {
m.transparent = false;
}
return (VRN.mats[k] = m);
}
function vrnWallGeo(w, h, bay, storey) { var g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * Math.max(1, Math.round(w / bay)), uv.getY(i) * (h / storey)); return g; }
function vrnWalls(grp, w, d, y0, y1, mat, band) {
var h = y1 - y0, st = band ? h : 4;
[[0, d / 2, 0, w], [0, -d / 2, Math.PI, w], [w / 2, 0, Math.PI / 2, d], [-w / 2, 0, -Math.PI / 2, d]].forEach(function (f) { var m = new THREE.Mesh(vrnWallGeo(f[3], h, 4, st), mat); m.position.set(f[0], y0 + h / 2, f[1]); m.rotation.y = f[2]; grp.add(m); });
}
function vrnMansard(grp, w, d, y, o) { return __ZC(359, 27, this, arguments, new.target); }
var VRN_COLS = [0xE8E0D0, 0xE0D4BC, 0xD8CCB4, 0xECE4D4, 0xD4C8B0, 0xE4D8C4];
function vrnBuilding(parent, x, z, w, d, o) { return __ZC(359, 28, this, arguments, new.target); }
function vrnPitchGeo(w, d, rise, o) { return __ZC(359, 29, this, arguments, new.target); }
var VRN_SG = 40;
function vrnSolid(s) { return __ZC(359, 30, this, arguments, new.target); }
function vrnSolidAt(x, z, feet) { var g = VRN.sgrid; if (!g)
return false; var L = g[Math.floor(x / VRN_SG) + "," + Math.floor(z / VRN_SG)]; return !!(L && worldSolidAt(L, x, z, feet)); }
function vrnFloor(x, z, hw, hd, y, o) { var f = { x: x, z: z, hw: hw, hd: hd, y: y }; if (o)
for (var k in o)
f[k] = o[k]; VRN.floors.push(f); return f; }
function vrnFloorsAt(x, z, feet) { return __ZC(359, 31, this, arguments, new.target); }
function vrnSpot(x, z, r, name, verb, fn, y) { var s = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; VRN.spots.push(s); return s; }
function vrnSign(lines, w, h, x, y, z, ry, parent) { var s = wSign(lines, w, h, "#1E2A3A", "#E8D8A8"); s.position.set(x, y, z); s.rotation.y = ry || 0; (parent || VRN.G).add(s); return s; }
function vrnPave(parent, x, z, w, d, y, tint, mpt) { var m = new THREE.Mesh(vrnUVm(new THREE.BoxGeometry(w, 0.1, d)), vrnSurf("paving", tint || 0xD8D0C4, mpt || 3)); m.position.set(x, (y || 0) + 0.04, z); parent.add(m); return m; }
function vrnLamp(parent, x, y, z) { return __ZC(359, 32, this, arguments, new.target); }
function vrnPerson(parent, key, x, z, ry, o) { return __ZC(359, 33, this, arguments, new.target); }
var VRN_TOWNCOL = [0x2A2A30, 0x3A3A4A, 0x5A3A2A, 0x2A3A5A, 0x6A5A4A, 0x4A2A2A, 0x3A4A3A, 0x8A6A4A, 0x1E2A3A];
function vrnFolk(parent, seed, x, z, o) { return __ZC(359, 34, this, arguments, new.target); }
var VRN_IN = {};
var VRN_IN_ROW = 34, VRN_IN_Z2 = 9000;
function vrnInDef(key, o) { o.key = key; o.i = Object.keys(VRN_IN).length; o.row = o.i >= VRN_IN_ROW ? 1 : 0; o.slot = o.i - o.row * VRN_IN_ROW; o.x = VRN_IN_X + o.slot * 600; o.z = o.row * VRN_IN_Z2; VRN_IN[key] = o; return o; }
function vrnInRowAt(z) { if (z == null) {
try {
z = worldLocal().z;
}
catch (e) {
z = 0;
}
} return z > VRN_IN_Z2 / 2 ? 1 : 0; }
function vrnInRoom(x, z) { if (x < VRN_IN_X - 1000 || (typeof camera !== "undefined" && camera.position.y > VRN_SPACE.y - 1200))
return false; var I = vrnInAt(x, z); return !!(I && Math.abs(x - I.x) < I.hw + 40); }
function vrnInAt(x, z) { if (x < VRN_IN_X - 1000)
return null; var k = Math.round((x - VRN_IN_X) / 600), row = vrnInRowAt(z); for (var key in VRN_IN) {
var I = VRN_IN[key];
if (I.slot === k && I.row === row)
return I;
} return null; }
function vrnVeil() { if (VRN.veil)
return VRN.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#080A0C;opacity:0;pointer-events:none;transition:opacity .6s ease;z-index:43"; document.body.appendChild(v); VRN.veil = v; return v; }
function vrnMove(x, z, yawTo, msg, y, after) { return __ZC(359, 35, this, arguments, new.target); }
function vrnInBuild(I) {
if (I.built)
return;
var grp = new THREE.Group();
grp.name = "vrn-in-" + I.key;
VRN.G.add(grp);
I.grp = grp;
try {
I.build(grp, I);
}
catch (e) {
if (window.console)
console.warn("[verne] inside " + I.key, e);
}
I.built = true;
if (typeof gwBake === "function")
try {
gwBake(grp);
}
catch (e) { }
}
function vrnEnter(key, alt) { var I = VRN_IN[key]; if (!I)
return; vrnInBuild(I); var A = alt && I[alt] ? I[alt] : I.arrive; vrnMove(I.x + A[0], I.z + A[1], A[2], A[3] || I.say || ("<b>" + I.name + ".</b>"), A[4]); }
function vrnLeave(key) { var I = VRN_IN[key]; if (!I)
return; var O = I.out; vrnMove(O[0], O[1], O[2], O[3]); }
function vrnInDrop() { return __ZC(359, 36, this, arguments, new.target); }
function vrnSolidsDrop(x0, x1, z0, z1) {
var keep = function (s) { return s.x < x0 || s.x > x1 || (z0 != null && (s.z < z0 || s.z > z1)); };
VRN.solids = VRN.solids.filter(keep);
var g = VRN.sgrid;
if (!g)
return;
for (var k in g) {
var i = +k.split(",")[0] * VRN_SG;
if (i >= x0 - VRN_SG && i <= x1 + VRN_SG)
g[k] = g[k].filter(keep);
}
}
function vrnInFloor(grp, cx, cz, w, d, y, mat) { var m = new THREE.Mesh(vrnUVm(new THREE.BoxGeometry(w, 0.2, d)), mat); m.position.set(cx, y - 0.1, cz); grp.add(m); vrnFloor(cx, cz, w / 2, d / 2, y, { inside: 1 }); return m; }
function vrnIWall(grp, x0, z0, x1, z1, h, mat, gaps, y) { return __ZC(359, 37, this, arguments, new.target); }
function vrnRoom(grp, cx, cz, w, d, h, o) { return __ZC(359, 38, this, arguments, new.target); }
function vrnShelf(grp, x, z, w, ry, h) { return __ZC(359, 39, this, arguments, new.target); }
function vrnTable(grp, x, z, w, d, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
grp.add(g);
var wood = vrnSurf("wood", col || 0x8A5A3A, 1);
vrnBoxM(w, 0.08, d, wood, 0, 0.82, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { wBox(0.08, 0.8, 0.08, wood, k[0] * (w / 2 - 0.1), 0.4, k[1] * (d / 2 - 0.1), g); });
return g;
}
function vrnChair(grp, x, z, ry, col) { return __ZC(359, 40, this, arguments, new.target); }
function vrnRug(grp, x, z, w, d, col, y) { var m = wBox(w, 0.03, d, vrnC(col || 0x7A2A2A), x, (y || 0) + 0.02, z, grp); return m; }
var VRN_RIVET = null;
function vrnRivetTex() { return __ZC(359, 41, this, arguments, new.target); }
function vrnNautilusModel() { return __ZC(359, 42, this, arguments, new.target); }
var VRN_SEAWIN = null;
function vrnSeaWindowMat() {
if (VRN.mats.seawin)
return VRN.mats.seawin;
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 160;
var t = new THREE.CanvasTexture(cv);
VRN_SEAWIN = { cv: cv, t: t, ph: 0 };
vrnSeaWindowDraw(0);
return (VRN.mats.seawin = new THREE.MeshBasicMaterial({ map: t }));
}
function vrnSeaWindowDraw(dt) { return __ZC(359, 43, this, arguments, new.target); }
var VRN_GORE = null;
function vrnGoreTex() { return __ZC(359, 44, this, arguments, new.target); }
function vrnBalloonModel() { return __ZC(359, 45, this, arguments, new.target); }
function vrnAlbatrossModel() { return __ZC(359, 46, this, arguments, new.target); }
function vrnShellModel(s) { return __ZC(359, 47, this, arguments, new.target); }
function vrnElephantModel(s) { return __ZC(359, 48, this, arguments, new.target); }
function vrnRaftModel() { return __ZC(359, 49, this, arguments, new.target); }
function vrnTrainModel() { return __ZC(359, 50, this, arguments, new.target); }
function vrnApe(parent, x, z, o) { return __ZC(359, 51, this, arguments, new.target); }
function vrnCreature(arch, s, seed) { return __ZC(359, 52, this, arguments, new.target); }
var VRN_HB = {
palace: { x: -140, z: -150, rx: 90, rz: 55, h: 17 },
reform: { x: -300, z: 40, w: 40, d: 28 }, chandler: { x: -180, z: 82, w: 16, d: 12 }, verne: { x: 300, z: 40, w: 24, d: 20 }, foundry: { x: 640, z: 40, w: 44, d: 30 },
gunclub: { x: 240, z: -150, w: 34, d: 26 }, society: { x: 600, z: -150, w: 36, d: 26 }, weldon: { x: -600, z: -150, w: 30, d: 24 }, station: { x: 240, z: -470, w: 44, d: 22 },
globe: { x: 60, z: -20 }, victoria: { x: -650, z: -430 }, mast: { x: -470, z: -400, h: 58 }, light: { x: 1000, z: 262 }, dock: { x: 1190, z: 228 }
};
var VRN_HB_KEEP = [[-240, -215, -40, -85], [-330, 15, -270, 70], [-195, 72, -165, 92], [280, 20, 324, 64], [612, 18, 668, 62], [216, -170, 264, -130], [576, -170, 624, -130], [-622, -170, -578, -130], [212, -488, 268, -452], [40, -60, 80, 30], [20, -60, 100, 20]];
function vrnHbKept(x0, z0, x1, z1) { for (var i = 0; i < VRN_HB_KEEP.length; i++) {
var K = VRN_HB_KEEP[i];
if (x1 > K[0] - 4 && x0 < K[2] + 4 && z1 > K[1] - 4 && z0 < K[3] + 4)
return true;
} return false; }
function vrnHbGround(G) { return __ZC(359, 53, this, arguments, new.target); }
function vrnPalace(G) { return __ZC(359, 54, this, arguments, new.target); }
function vrnHbLandmarks(G) { return __ZC(359, 55, this, arguments, new.target); }
var VRN_GLOBE = null;
function vrnGlobeTex() { return __ZC(359, 56, this, arguments, new.target); }
var VRN_HB_BLOCKS = [[-392, -12, 40, 100], [80, -12, 392, 100], [408, -12, 1100, 100], [-392, -272, 40, -28], [80, -272, 392, -28], [408, -272, 1100, -28], [-900, -272, -408, -28], [-392, -560, 40, -288], [80, -560, 392, -288], [408, -560, 1100, -288]];
function vrnHbBlocks(G) { return __ZC(359, 57, this, arguments, new.target); }
function vrnHbField(G) { return __ZC(359, 58, this, arguments, new.target); }
function vrnSteamerHB(t) { return t < 0.18 ? 0.72 + 0.28 * Math.sin(t / 0.18 * Math.PI / 2) : t < 0.58 ? 1 : Math.max(0, 1 - Math.pow((t - 0.58) / 0.42, 1.8)); }
function vrnSteamerModel(o) { return __ZC(359, 59, this, arguments, new.target); }
function vrnHbShips(G) { return __ZC(359, 60, this, arguments, new.target); }
function vrnHbDock(G) { return __ZC(359, 61, this, arguments, new.target); }
function vrnHbFolk(G) { return __ZC(359, 62, this, arguments, new.target); }
function vrnHarbour(G) {
var grp = new THREE.Group();
grp.name = "vrn-harbour";
G.add(grp);
vrnHbGround(grp);
vrnPalace(grp);
vrnHbLandmarks(grp);
vrnHbField(grp);
vrnHbShips(grp);
vrnHbDock(grp);
vrnHbFolk(grp);
VRN.districts.push({ g: grp, x: 100, z: -150, r: 1400 });
vrnHbBlocks(G);
}
function vrnBoatCard() { return __ZC(359, 63, this, arguments, new.target); }
function vrnTrainCard() { return __ZC(359, 64, this, arguments, new.target); }
function vrnVoyagesCard() { return __ZC(359, 65, this, arguments, new.target); }
function vrnDoorOut(grp, x, z, key, label, ry) {
var d = wBox(2.4, 3.6, 0.2, vrnC(0x3A2A1E), x, 1.8, z, grp);
d.rotation.y = ry || 0;
wBox(2.8, 0.3, 0.3, vrnC(0xC8A04A), x, 3.75, z, grp).rotation.y = ry || 0;
vrnSpot(x, z + (Math.abs(ry || 0) > 1 ? 0 : (z > 0 ? -1.6 : 1.6)), 2.6, label || "The door", "go back outside", function () { vrnLeave(key); }, 0);
}
function vrnExhibit(grp, x, z, build, label, text, scale) { return __ZC(359, 66, this, arguments, new.target); }
vrnInDef("palace", { name: "the Palace of the Exposition", hw: 120, hd: 70, arrive: [0, 60, 0], out: [-140, -90, 0, "Out under the iron and glass, onto the square."],
say: "🏛️ <b>The Palace of the Exposition.</b> Under a vault of glass a hundred and eighty metres long: models of every machine in the Voyages, electric lamps, and in the middle <b>the Inventors' Hall</b>, four great design benches where you build a machine of your own and test it for real.",
build: function (grp, I) { return __ZC(359, 67, this, arguments, new.target); } });
vrnInDef("verne", { name: "Verne's house", hw: 60, hd: 40, arrive: [0, 32, 0], out: [296, 58, 0, "Out of Verne's house, onto the quay."],
say: "📚 <b>Verne's house.</b> A hall of coats and charts; his study, where he writes from five in the morning; and up the stair, <b>the Library of the Voyages</b>, every one of his books and the true science behind them. The lecture room, with its twelve lessons, is beside it.",
build: function (grp, I) { return __ZC(359, 68, this, arguments, new.target); } });
vrnInDef("reform", { name: "the Reform Club", hw: 50, hd: 40, arrive: [0, 30, 0], out: [-300, 60, 0, "Out of the Reform Club, onto Pall Mall (the quay)."],
say: "🃏 <b>The Reform Club.</b> Marble, mahogany and silence. In the card room the members play whist; on the wall hangs <b>the race board</b>, with every traveller's time round the world. Phileas Fogg is at his table.",
build: function (grp, I) { return __ZC(359, 69, this, arguments, new.target); } });
vrnInDef("gunclub", { name: "the Gun Club", hw: 40, hd: 30, arrive: [0, 24, 0], out: [236, -120, 0, "Out of the Gun Club."],
say: "💥 <b>The Gun Club.</b> Its walls hung with every kind of gun, its chandeliers made of pistols, its chairs on mortar-carriages. Barbicane has a proposal: the Moon.",
build: function (grp, I) { return __ZC(359, 70, this, arguments, new.target); } });
vrnInDef("weldon", { name: "the Weldon Institute", hw: 30, hd: 25, arrive: [0, 18, 0], out: [-600, -120, 0, "Out of the Weldon Institute."],
say: "🎈 <b>The Weldon Institute</b>, for the lighter-than-air. Models of balloons hang from the ceiling; its members argue, loudly, about the great steerable balloon Go-Ahead.",
build: function (grp, I) { return __ZC(359, 71, this, arguments, new.target); } });
vrnInDef("society", { name: "the Geographical Society", hw: 40, hd: 30, arrive: [0, 24, 0], out: [600, -120, 0, "Out of the Geographical Society."],
say: "🗺️ <b>The Geographical Society.</b> Maps of every voyage cover the walls. At the far end, the examiners' desk: answer eight of ten and you become a <b>Fellow of the Society</b>.",
build: function (grp, I) { return __ZC(359, 72, this, arguments, new.target); } });
vrnInDef("nautilus", { name: "the Nautilus", hw: 60, hd: 12, arrive: [-40, 0, -Math.PI / 2], out: [1164, 240, Math.PI, "Back on the jetty in the sea cave.", 2.9],
say: "🌊 <b>The Nautilus.</b> Riveted steel, brass and mahogany, lit by electricity. Forward: the library and the great salon with its two windows on the sea, where Captain Nemo waits. Aft: the engine room. Down the ladder at the stern: the diving chamber.",
build: function (grp, I) { return __ZC(359, 73, this, arguments, new.target); } });
vrnInDef("granite", { name: "Granite House", hw: 50, hd: 25, arrive: [-40, 0, Math.PI / 2], out: [-2548, 520, -Math.PI / 2, "Down the lift to the beach under the cliff."],
say: "🪨 <b>Granite House.</b> The old outlet of the lake, a cavern in the cliff, turned into a home: the great hall with five windows on the sea, the storeroom, the workshop, the bedrooms. Jup the orangutan is setting the table.",
build: function (grp, I) { return __ZC(359, 74, this, arguments, new.target); } });
vrnInDef("dakkar", { name: "the Dakkar Grotto", hw: 70, hd: 45, arrive: [-60, 30, Math.PI * 0.25], out: [-4390, 320, Math.PI / 2, "Back out of the sea cave, onto the rocks of the west coast."],
say: "🕯️ <b>The Dakkar Grotto.</b> A cathedral of black basalt columns, a still lake in the middle, and on the lake, lit from inside, a long dark hull: the Nautilus. An old man is waiting for you in her salon.",
build: function (grp, I) { return __ZC(359, 75, this, arguments, new.target); } });
function vrnDeepKinds() { return __ZC(359, 76, this, arguments, new.target); }
var VRN_CORALC = [0xF2804A, 0xE85A7A, 0xA85AC8, 0xF8C84A, 0xF2A0B0, 0x5AC8B8, 0xE8E0D0];
function vrnDeepPlant(G) { return __ZC(359, 77, this, arguments, new.target); }
function vrnDeepPlaces(G) { return __ZC(359, 78, this, arguments, new.target); }
function vrnSchoolsTick(dt, L) { return __ZC(359, 79, this, arguments, new.target); }
function vrnDive(on, quiet) { return __ZC(359, 80, this, arguments, new.target); }
var VRN_TOUR = [
{ k: "torres", x: 1600, z: 820, y: -4, name: "The Torres Strait", story: "'The most dangerous strait in the world,' Nemo says, 'between New Guinea and Australia, all reefs.' Here the Nautilus ran aground in January 1868, and the islanders of Gueboroar came out in their canoes. Nemo did not worry: 'The tide of the full moon will float us off.' It did, to the hour. Look out at the coral: it is built by tiny animals, a little each year, for thousands of years." },
{ k: "cemetery", x: 950, z: 1720, y: -22, name: "The coral cemetery", story: "Here Nemo's crew bury one of their own, killed in an accident on board. 'There,' he says quietly, 'is our peaceful cemetery, hundreds of feet below the surface. The coral will seal our dead for ever, safe from sharks and from men.' The corals are animals that build stone round themselves; a reef is a city of them." },
{ k: "forest", x: 300, z: 1150, y: -12, name: "The forest of Crespo Island", walk: 1, story: "'Shall we go hunting in my forests?' Nemo asks. The forest of Crespo Island is under the sea: its plants grow straight up to the light, never drooping, and fish move among the branches like birds. Put on a diving suit and walk it with him." },
{ k: "pearl", x: -600, z: 1100, y: -6, name: "The pearl bank of Ceylon", shark: 1, story: "Off Ceylon (Sri Lanka) the pearl divers go down with a stone to sink them and hold their breath for a minute. One of them is attacked by a shark: Nemo goes for it with his dagger, and Ned Land's harpoon finishes it. Nemo gives the poor diver a bag of pearls. 'That Indian,' he says, 'is a dweller in an oppressed country; and I am still, and shall be to my last breath, one of them.' He knows of a greater pearl, he says, in a clam he has let grow for years, and he will not say where." },
{ k: "tunnel", x: -700, z: 1960, y: -40, name: "The Arabian Tunnel", through: 1, story: "In 1868 the Suez Canal was not yet open. Nemo has found a tunnel under the isthmus, from the Red Sea to the Mediterranean, by noticing that the same fish live on both sides. 'I said to myself: there must be a passage.' The current carries the Nautilus through in twenty minutes. (No such tunnel exists; the canal opened in November 1869.)" },
{ k: "atlantis", x: 700, z: 2640, y: -62, name: "Atlantis", story: "By night Nemo and Aronnax walk up an undersea mountain, lit by a volcano below. Below them lie the ruins of a city: walls, temples, an aqueduct. Nemo takes a stone and writes on a black rock one word: ATLANTIS. Plato told the story of a great island that sank in a single day; nobody has ever found it, and it may only be a story." },
{ k: "vigo", x: -900, z: 2640, y: -40, name: "The treasure of Vigo Bay", story: "In 1702 a Spanish treasure fleet was sunk in Vigo Bay, and its gold went to the bottom. Nemo's crew walk among the broken galleons, filling chests with gold. 'Do you think I don't know there are suffering people on the earth?' Nemo says. The gold goes to those who fight for their freedom." },
{ k: "pole", x: 0, z: 4150, y: -1, name: "The South Pole", surface: 1, story: "Under the ice the Nautilus finds open water, and surfaces. On the 21st of March, at noon, Nemo measures the Sun's height and says they are at the South Pole. He unfurls a black flag with a golden N. 'Farewell, Sun!' he cries, as it sets for six months. On the way back the ice closes over them, and the crew cut their way out with picks while the air runs short." },
{ k: "squid", x: 1900, z: 3260, y: -60, name: "The giant squid", squid: 1, story: "'A squid,' says Conseil, 'class of molluscs.' A huge one, eight metres long, with eyes like dinner plates, wraps its arms round the Nautilus's screw and stops her. Nemo, Ned and the crew go up on the platform with axes. Help them!" },
{ k: "mael", x: 2560, z: 3960, y: -6, name: "The Maelstrom", story: "Off Norway the great whirlpool, the Maelstrom, pulls at the sea for miles round. In the book Aronnax, Ned and Conseil escape in the little boat just as the Nautilus is drawn in, and nobody knows what became of her. Today Nemo steers her clear, at the very edge, and turns for home. 'This time,' he says, 'not.'" }
];
function vrnTourCard() { return __ZC(359, 81, this, arguments, new.target); }
function vrnSubOut() { if (!VRN.sub) {
VRN.sub = vrnNautilusModel();
VRN.sub.userData.keep = 1;
VRN.G.add(VRN.sub);
} VRN.sub.visible = true; if (VRN.dockNautilus)
VRN.dockNautilus.visible = false; return VRN.sub; }
function vrnSubHome() { if (VRN.sub)
VRN.sub.visible = false; if (VRN.dockNautilus)
VRN.dockNautilus.visible = true; }
function vrnTourStart() { return __ZC(359, 82, this, arguments, new.target); }
function vrnTourPath(T, dt) { return __ZC(359, 83, this, arguments, new.target); }
function vrnTourTick(dt) { return __ZC(359, 84, this, arguments, new.target); }
function vrnTourStop() { return __ZC(359, 85, this, arguments, new.target); }
function vrnTourNext() { return __ZC(359, 86, this, arguments, new.target); }
function vrnTourWalk() { return __ZC(359, 87, this, arguments, new.target); }
function vrnTourBack() { return __ZC(359, 88, this, arguments, new.target); }
function vrnSharkShow(S) { return __ZC(359, 89, this, arguments, new.target); }
function vrnSquidStart() { return __ZC(359, 90, this, arguments, new.target); }
function vrnSquidTick(dt) { var Q = VRN.tour.squid; if (!Q)
return; if (Q.cd > 0)
Q.cd -= dt; Q.arms.forEach(function (A, i) { A.up += dt; if (A.g.visible)
A.g.position.y = VRN.sub.position.y + 3 + Math.sin(A.up * 0.8 + i) * 1.2; }); }
function vrnSquidHit() { return __ZC(359, 91, this, arguments, new.target); }
function vrnTourEnd(early) { return __ZC(359, 92, this, arguments, new.target); }
function vrnPilotOn() { return __ZC(359, 93, this, arguments, new.target); }
function vrnPilotOff(quiet, stay) { return __ZC(359, 94, this, arguments, new.target); }
function vrnPilotTick(dt, L) { return __ZC(359, 95, this, arguments, new.target); }
var VRN_IS = {
chimneys: { x: -2520, z: 760 }, granite: { x: -2560, z: 520 }, lift: { x: -2548, z: 520 }, lake: { x: -2930, z: 470 }, rim: { x: -2770, z: 420 },
kiln: { x: -2700, z: 900 }, clay: { x: -2900, z: 935 }, wood: { x: -3600, z: 900 }, forge: { x: -2640, z: 960 }, ore: { x: -3560, z: 420 },
lookout: { x: -3000, z: 900 }, corral: { x: -3300, z: 120 }, mill: { x: -2850, z: 640 }, yard: { x: -3100, z: 1430 }, beach: { x: -3200, z: 1480 },
sand: { x: -3300, z: 1500 }, kelp: { x: -3420, z: 1520 }, wire: [{ x: -2620, z: 470 }, { x: -2800, z: 360 }, { x: -3000, z: 260 }, { x: -3200, z: 170 }],
dakkar: { x: -4378, z: 320 }, peak: { x: -3780, z: 260 }, crate: { x: -3020, z: 1500 }
};
function vrnIsY(p) { return vrnLand(p.x, p.z); }
var VRN_LADDER = [
{ k: "fire", name: "Fire", cyrus: "We have no matches, no flint, nothing. But we have the Sun, and Herbert's watch and mine. Two watch glasses, filled with water and sealed at the edges with clay, make a lens. First, dry moss and twigs from under the cliff, then we'll catch the noon sun.",
steps: [{ at: "chimneys", dx: -20, dz: 30, name: "Dry moss under the rocks", verb: "gather tinder", say: "A double handful of dry moss and dead twigs, kept out of the rain under the fallen granite." },
{ q: "How does a lens of two watch glasses filled with water make fire?", opts: ["The water gets hot and boils", "It bends the sunlight so all of it meets in one tiny bright point", "The glass rubs and makes sparks"], ok: 1, why: "A curved, clear shape bends light. Two watch glasses with water between them make a fat lens: all the sunlight falling on it is brought to one small spot, hot enough to light dry moss." },
{ at: "chimneys", dx: -10, dz: 16, name: "The noon sun on the beach", verb: "hold the lens to the sun", say: "You hold the lens steady... a bright dot, a curl of smoke, a glow in the moss. You blow gently, and a flame stands up. Fire!" }],
after: "Fire. 'Now we are men,' says Pencroft. Next: where in the world are we?" },
{ k: "where", name: "Where are we?", cyrus: "An island or a continent? And where on the globe? From the height of the Sun at noon, and the stars at night, we can find our latitude; from my watch, still keeping Washington time, our longitude. Come up to the lookout on the heights.",
steps: [{ at: "lookout", name: "The lookout on Prospect Heights", verb: "look all round", say: "Sea on every side. An island, then, with a smoking mountain, a lake, forests, and a long thin peninsula like a serpent's tail to the south-west." },
{ q: "At noon the Sun is due north, high in the sky. What does that tell us?", opts: ["We are south of the equator", "We are north of the equator", "Nothing: the Sun is always north at noon"], ok: 0, why: "Right: if the noon Sun is to the north, you are south of it, in the southern half of the world. Cyrus measured a stick and its shadow and found 34 degrees 57 minutes south." },
{ q: "Cyrus's watch says Washington's time is 5 hours ahead of the island's noon. The Earth turns 15 degrees each hour. How far west of Washington are we?", opts: ["5 degrees", "75 degrees", "150 degrees"], ok: 1, why: "5 hours × 15 degrees = 75 degrees west of Washington: about 150 degrees west of Greenwich in the book. They are in the middle of the Pacific, far from any ship's route." }],
after: "34 degrees south, 150 west: the Pacific, far from everywhere. 'Then we shall make our island a little America,' says Spilett." },
{ k: "brick", name: "Clay, a kiln, bricks and pots", cyrus: "Next we need pots to cook in and bricks to build with. There's good clay by the river. Dig it, shape it, and we'll fire it in a kiln of our own.",
steps: [{ at: "clay", name: "Clay on the Mercy's bank", verb: "dig clay", say: "Heavy grey clay. You knead it with sand and a little lime from shells so it won't crack." },
{ at: "wood", name: "Dry wood at the forest edge", verb: "gather firewood", say: "An armful of dead branches." },
{ at: "kiln", name: "The kiln by the river", verb: "stack the bricks and fire the kiln", say: "You stack the shaped bricks and pots, fill the kiln mouth with wood, and keep it burning two days. They come out hard and red: bricks, pots and plates." }],
after: "Pots for soup, bricks for a forge. Herbert can't stop tapping the pots to hear them ring." },
{ k: "bow", name: "Bows and arrows", cyrus: "We must hunt. A bow from tough wood, a string from the fibres of a creeper, arrows tipped with hardened points. Then practise on the targets Pencroft has set up.",
steps: [{ at: "wood", dx: 30, name: "A springy branch of the right wood", verb: "cut a bow stave", say: "A long, springy stave, which you shave thin at the ends." },
{ q: "What makes a bow throw an arrow?", opts: ["The wood stores the work of your pull and gives it back all at once", "The string is magnetic", "The arrow's feathers push it"], ok: 0, why: "Bending the bow stores energy in the wood, like a spring; let go and it gives all that work to the arrow in an instant. The feathers only keep it flying straight." },
{ k: "shoot", at: "kiln", dx: 30, dz: -30, name: "Pencroft's targets", verb: "shoot", n: 3 }],
after: "'Three in the board!' Pencroft cheers. Tonight: roast capybara." },
{ k: "iron", name: "An iron forge", cyrus: "With iron we can make everything: tools, nails, axes. There's iron ore under the mountain and coal near it. We'll make bellows from a seal's skin and smelt the ore in a hearth of our bricks.",
steps: [{ at: "ore", name: "The iron ore under Mount Franklin", verb: "break out ore", say: "Heavy reddish-black lumps: magnetite, iron ore. A seam of coal crops out just beside it." },
{ q: "To get iron out of its ore, Cyrus heats it in a fire of charcoal with air blown in. What does the charcoal do?", opts: ["Takes the oxygen away from the ore, leaving iron", "Paints it grey", "Makes it lighter so it floats"], ok: 0, why: "Iron ore is iron joined to oxygen. Hot carbon (charcoal or coal) pulls the oxygen away and leaves the iron. The bellows blow in air to make the fire hot enough." },
{ at: "forge", name: "The forge by the river", verb: "work the bellows and hammer", say: "Whoosh, whoosh: the bellows of sealskin blow the fire white-hot; a lump of soft iron forms in the hearth, and you hammer it on a stone anvil into a blade." }],
after: "Iron! Knives, an axe, nails, picks. 'Now nothing will stop us,' says Neb." },
{ k: "rim", name: "Breaking the lake's rim", cyrus: "I want a home safe from the sea and from beasts. Lake Grant has an old outlet under the cliff, a cave, blocked by its water. If we break the lake's rim on the far side and let it run off a few metres, the cave will open. I can make a blasting powder from what the island gives. When I say run clear, run!",
steps: [{ at: "rim", name: "The lake's rim, where Cyrus is working", verb: "help him clear the rocks", say: "You haul aside the loose stones so he can reach the rock face. 'Good. Now stand ready.'" },
{ k: "rim", at: "rim", name: "The rim is about to break", verb: "run clear" }],
after: "A deep rumble, the rim gives way, and the lake pours off in a white torrent. As it falls, an opening shows high in the cliff by the shore. Granite House is open!" },
{ k: "glass", name: "Glass for the windows", cyrus: "Granite House needs windows. Glass is sand, melted with the ash of burned seaweed and a little lime. We'll blow it with an iron pipe, as glassmakers did for two thousand years.",
steps: [{ at: "sand", name: "Fine white sand on the south beach", verb: "fill a sack", say: "White quartz sand, the finer the better." },
{ at: "kelp", name: "Seaweed on the rocks", verb: "gather and burn seaweed", say: "You burn the seaweed down to a grey ash, which helps the sand melt." },
{ at: "kiln", dx: -14, name: "The glass furnace by the kiln", verb: "blow a bubble of glass", say: "You dip the iron pipe in the glowing melt, blow, and turn it; the bubble swells, is opened out and flattened into a pane. Clumsy, slightly green, and perfectly clear enough." }],
after: "Five windows for the great hall. The sea sparkles through them." },
{ k: "corral", name: "The corral", cyrus: "We need wool and milk. In the hills live wild sheep and goats. Build a corral at the foot of the mountain, then drive three of them in.",
steps: [{ at: "corral", dx: -50, name: "Posts for the fence", verb: "set the posts", say: "A ring of strong posts and rails round a meadow, with a shed for the winter." },
{ k: "herd", at: "corral", name: "Wild sheep on the slopes", verb: "drive it toward the corral", n: 3 }],
after: "Three wild sheep in the corral, and goats soon after. Wool for winter coats." },
{ k: "mill", name: "The windmill", cyrus: "We grow wheat now, from a single grain Herbert found in his pocket. To grind it we need a mill. The heights get the wind; build the frame, set the sails.",
steps: [{ at: "mill", dx: 16, name: "Timber for the frame", verb: "raise the frame", say: "Four great posts and a turning cap, so the sails can face the wind." },
{ q: "Why does a windmill's cap turn?", opts: ["To face the wind, wherever it comes from", "To look nice", "To keep the rain off"], ok: 0, why: "The sails work best square to the wind; the cap turns so they can face it from any side. Later mills had a little fantail that turned them by itself." },
{ at: "mill", name: "The sails", verb: "set the sails", say: "Four sails of sailcloth catch the breeze and the stones begin to grind. Flour!" }],
after: "Bread, for the first time in two years. Neb cries a little." },
{ k: "boat", name: "The Bonadventure", cyrus: "Pencroft dreams of a boat. We have iron, wood, tar from the pines. Lay the keel on the beach at the yard; we'll build her together and sail round the island.",
steps: [{ at: "yard", name: "The keel on the stocks", verb: "lay the keel and frames", say: "A keel of oak, ribs steamed and bent, planks nailed with your own iron nails. Pencroft caulks her with tar." },
{ at: "yard", dx: 16, name: "The mast and sail", verb: "step the mast", say: "A pine mast and a sail of sewn cloth. Pencroft names her the Bonadventure." },
{ at: "beach", name: "The launch", verb: "push her into the sea", say: "She slides down into the surf and floats, a fine little sloop. Pencroft is the happiest man on the island." }],
after: "The Bonadventure rides at anchor at the river mouth. (She will matter at the end.)" },
{ k: "wire", name: "The telegraph", cyrus: "A telegraph between Granite House and the corral, so Neb can call us. I've made a battery, and the iron drawn into wire. Help me string it along the posts.",
steps: [{ k: "wire", at: "wire", name: "Telegraph posts", verb: "string the wire" }],
after: "The needle jumps: it works. And then, one night, a message comes in that none of them sent: 'Come to the corral at once.' There, a second wire runs off to the west, into the rocks..." },
{ k: "defend", name: "Defend the corral", cyrus: "Convicts! The pirates who came ashore from their ship are in the hills, and they are at the corral. Ayrton is in danger. Drive them off!",
steps: [{ k: "foes", at: "corral", name: "Convicts at the corral", verb: "fight", n: 4 }],
after: "The last of them run off into the jungle. But who sank their ship with one shot in the night? The helper again. Follow the second wire west." }
];
var VRN_GIFTS = [
{ after: "brick", say: "🎁 <b>On the beach, half buried: a chest.</b> Inside, tools, guns, clothes, books, an atlas. Washed up? Nobody on the island put it there." },
{ after: "iron", say: "📦 Herbert falls sick with fever, and in the morning a box of quinine is on the table at the Chimneys. Nobody saw who brought it." },
{ after: "mill", say: "🔦 One stormy night a light shines on the heights, guiding the Bonadventure home. Nobody lit it." }
];
function vrnIslandBuild(G) { return __ZC(359, 96, this, arguments, new.target); }
function vrnIsHas(k) { var d = vrnData(); return (d.isl || 0) > vrnLadderIdx(k); }
function vrnLadderIdx(k) { for (var i = 0; i < VRN_LADDER.length; i++)
if (VRN_LADDER[i].k === k)
return i; return -1; }
function vrnIslandShow() { return __ZC(359, 97, this, arguments, new.target); }
function vrnIsWireDraw(k) { return __ZC(359, 98, this, arguments, new.target); }
function vrnLadderCard() { return __ZC(359, 99, this, arguments, new.target); }
function vrnLadderPos(p) { if (!p || !p.at)
return null; if (p.k === "wire") {
var w = VRN_IS.wire[vrnData().islWire || 0];
return w ? { x: w.x, z: w.z } : null;
} var b = VRN_IS[p.at]; return { x: b.x + (p.dx || 0), z: b.z + (p.dz || 0) }; }
function vrnLadderMark() { return __ZC(359, 100, this, arguments, new.target); }
function vrnLadderQuiz() { return __ZC(359, 101, this, arguments, new.target); }
function vrnLadderAt(L) { return __ZC(359, 102, this, arguments, new.target); }
function vrnLadderStep() { return __ZC(359, 103, this, arguments, new.target); }
function vrnShoot() { return __ZC(359, 104, this, arguments, new.target); }
function vrnHerdAt(L) { return __ZC(359, 105, this, arguments, new.target); }
function vrnHerdTick(dt) { return __ZC(359, 106, this, arguments, new.target); }
function vrnRimStart() {
if (VRN.rim)
return;
var Ri = VRN_IS.rim;
VRN.rim = { t: 12, x: Ri.x, z: Ri.z };
setStatus("⚠️ <b>The rim is about to break, run clear!</b> Get well away from the lake's edge: 60 metres at least. 12...");
}
function vrnRimTick(dt, L) { return __ZC(359, 107, this, arguments, new.target); }
function vrnFoes(at, n, kind, win) { return __ZC(359, 108, this, arguments, new.target); }
function vrnFoesTick(dt, L) { return __ZC(359, 109, this, arguments, new.target); }
function vrnFoeHit() { return __ZC(359, 110, this, arguments, new.target); }
function vrnIslandNemo() { return __ZC(359, 111, this, arguments, new.target); }
function vrnEruptStart() { return __ZC(359, 112, this, arguments, new.target); }
function vrnEruptTick(dt, L) { return __ZC(359, 113, this, arguments, new.target); }
function vrnIslandEnd(made) { return __ZC(359, 114, this, arguments, new.target); }
function vrnIslandTick(dt, L) {
vrnHerdTick(dt);
vrnRimTick(dt, L);
vrnFoesTick(dt, L);
vrnEruptTick(dt, L);
if (VRN.lakeFall && VRN.lake) {
VRN.lakeFall.t += dt;
VRN.lake.position.y = VRN_ISL.lake.y - Math.min(7, VRN.lakeFall.t * 0.8);
if (VRN.lakeFall.t > 9)
VRN.lakeFall = null;
}
}
var VRN_UG = { sea: { x0: -1800, x1: 3500, z0: -1800, z1: 1800, cx: 850, rx: 2650, rz: 1800 },
gal: [[-3300, -900, 90], [-3050, -700, 74], [-2850, -820, 60], [-2600, -560, 44], [-2350, -650, 34], [-2150, -380, 22], [-1950, -260, 12], [-1750, -80, 4]],
camp: { x: -1620, z: -40 }, spring: { x: -2620, z: -575 }, whisper: { x: -2230, z: -520 }, isl: { x: 300, z: -200, r: 130, h: 22 }, geyser: { x: 320, z: -190 },
saur: { x: -200, z: 350 }, storm: { x: 1700, z: 100 }, shore: 3000, mush: { x: 3150, z: -500 }, bones: { x: 3000, z: 500 }, herd: { x: 3250, z: -1100 },
marks: { x: 3360, z: 260 }, rock: { x: 3420, z: 300 }, chimney: { x: 3480, z: 300 }, galW: 55 };
function vrnUgSegD(lx, lz) { var P = VRN_UG.gal, best = 1e9, y = 0; for (var i = 0; i < P.length - 1; i++) {
var a = P[i], b = P[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz, t = Math.max(0, Math.min(1, ((lx - a[0]) * dx + (lz - a[1]) * dz) / L2)), d = Math.hypot(lx - a[0] - dx * t, lz - a[1] - dz * t);
if (d < best) {
best = d;
y = a[2] + (b[2] - a[2]) * t;
}
} return { d: best, y: y }; }
function vrnUgH(x, z) { return __ZC(359, 115, this, arguments, new.target); }
function vrnUgWaterAt(x, z) { var lx = x - VRN_UG_X; if (lx > -1800 && lx < 3500 && vrnLand(x, z) < 0)
return 0; if (VRN.hansbach && vrnUgSegD(lx, z).d < 4 && lx > VRN_UG.spring.x)
return vrnLand(x, z) + 0.3; return null; }
function vrnUgCol(x, z, h, slope, c) { return __ZC(359, 116, this, arguments, new.target); }
function vrnUgBuild(G) { return __ZC(359, 117, this, arguments, new.target); }
function vrnSnfBuild(G) { return __ZC(359, 118, this, arguments, new.target); }
function vrnNoteCard() { return __ZC(359, 119, this, arguments, new.target); }
function vrnShadowCard() { return __ZC(359, 120, this, arguments, new.target); }
function vrnShadowAt(hr) { return __ZC(359, 121, this, arguments, new.target); }
function vrnChimneyDown(i) { return __ZC(359, 122, this, arguments, new.target); }
function vrnUgAt(L) { return __ZC(359, 123, this, arguments, new.target); }
function vrnHansbach() { return __ZC(359, 124, this, arguments, new.target); }
function vrnRaftX() { var C = VRN_UG.camp, x = VRN_UG_X + C.x + 50; for (var i = 0; i < 120 && vrnLand(x, C.z) > -0.5; i++)
x += 4; return x; }
function vrnRaftOn() { return __ZC(359, 125, this, arguments, new.target); }
function vrnRaftOff(quiet) { return __ZC(359, 126, this, arguments, new.target); }
function vrnRaftTick(dt, L) { return __ZC(359, 127, this, arguments, new.target); }
function vrnSaurians() { return __ZC(359, 128, this, arguments, new.target); }
function vrnRockBreak() { return __ZC(359, 129, this, arguments, new.target); }
function vrnChimneyRide() { return __ZC(359, 130, this, arguments, new.target); }
function vrnChimneyTick(dt) { return __ZC(359, 131, this, arguments, new.target); }
function vrnUgTick(dt, L) {
vrnRaftTick(dt, L);
vrnChimneyTick(dt);
if (VRN.ugHerd && Math.abs(L.x - VRN_UG_X) < 4000)
VRN.ugHerd.forEach(function (H, i) { H.a += dt * 0.05; var x = H.x + Math.cos(H.a + i) * 30, z = H.z + Math.sin(H.a + i) * 20; H.g.position.set(VRN_UG_X + x, vrnLand(VRN_UG_X + x, z), z); H.g.rotation.y = H.a + i + Math.PI / 2; });
}
var VRN_DAY = 4.5;
var VRN_LEGS = [
{ u: 0.00, to: 0.13, mode: "steamer", from: "London", name: "London to Suez, on the Mongolia", day: 0 },
{ u: 0.13, to: 0.22, mode: "steamer", from: "Suez", name: "Suez to Bombay, down the Red Sea", day: 7 },
{ u: 0.22, to: 0.27, mode: "train", from: "Bombay", name: "Bombay to Kholby, by the Great Indian Peninsula Railway", day: 18 },
{ u: 0.27, to: 0.31, mode: "elephant", from: "Kholby", name: "Kholby to Allahabad, on the elephant Kiouni", day: 19 },
{ u: 0.31, to: 0.35, mode: "train", from: "Allahabad", name: "Allahabad to Calcutta", day: 21 },
{ u: 0.35, to: 0.47, mode: "steamer", from: "Calcutta", name: "Calcutta to Hong Kong, on the Rangoon", day: 23 },
{ u: 0.47, to: 0.56, mode: "sail", from: "Hong Kong", name: "Hong Kong to Shanghai, on the pilot boat Tankadère", day: 35 },
{ u: 0.56, to: 0.72, mode: "steamer", from: "Yokohama", name: "Yokohama to San Francisco, on the General Grant", day: 43 },
{ u: 0.72, to: 0.82, mode: "train", from: "San Francisco", name: "San Francisco to Fort Kearney, by the Pacific Railroad", day: 62 },
{ u: 0.82, to: 0.86, mode: "sledge", from: "Fort Kearney", name: "Fort Kearney to Omaha, on the sail-sledge over the snow", day: 66 },
{ u: 0.86, to: 0.89, mode: "train", from: "Omaha", name: "Omaha to New York", day: 67 },
{ u: 0.89, to: 0.98, mode: "steamer", from: "New York", name: "New York to Liverpool, on the Henrietta", day: 70 },
{ u: 0.98, to: 1.00, mode: "train", from: "Liverpool", name: "Liverpool to London", day: 79 }
];
var VRN_MODE = { steamer: { sp: 44, lane: 70, sea: 1, eye: 19, back: 34, pitch: -0.22, obs: "rock" }, sail: { sp: 40, lane: 60, sea: 1, eye: 4, obs: "rock" }, train: { sp: 66, lane: 0, eye: 4.5 }, elephant: { sp: 22, lane: 30, eye: 4.6, obs: "tree" }, sledge: { sp: 72, lane: 45, eye: 2.2, obs: "drift" } };
var VRN_DATELINE = 0.66;
function vrnRwU(x, z) { var a = Math.atan2(z - VRN_RW.z, x - VRN_RW.x); return ((a / (Math.PI * 2)) % 1 + 1) % 1; }
function vrnRwPt(u, off) { var a = u * Math.PI * 2, r = VRN_RW.r + (off || 0); return { x: VRN_RW.x + Math.cos(a) * r, z: VRN_RW.z + Math.sin(a) * r, h: a }; }
function vrnRwLeg(u) { for (var i = 0; i < VRN_LEGS.length; i++)
if (u >= VRN_LEGS[i].u && u < VRN_LEGS[i].to)
return i; return VRN_LEGS.length - 1; }
function vrnRwH(x, z) { return __ZC(359, 132, this, arguments, new.target); }
function vrnRwWaterAt(x, z) { return vrnRwH(x, z) < 0 ? 0 : null; }
function vrnRwBuild(G) { return __ZC(359, 133, this, arguments, new.target); }
function vrnRwWeek() { var d = new Date(), j = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); return d.getUTCFullYear() * 100 + Math.ceil(((d - j) / 864e5 + j.getUTCDay() + 1) / 7); }
function vrnRwCourse() { return __ZC(359, 134, this, arguments, new.target); }
function vrnRaceCard() { return __ZC(359, 135, this, arguments, new.target); }
function vrnDays(ms) { var days = ms / 1000 / VRN_DAY, d = Math.floor(days), h = Math.floor((days - d) * 24), m = Math.floor(((days - d) * 24 - h) * 60); return d + " days, " + h + " hours, " + m + " minutes"; }
function vrnRaceStart() { return __ZC(359, 136, this, arguments, new.target); }
function vrnRaceVehicle(mode) { return __ZC(359, 137, this, arguments, new.target); }
function vrnRaceInput() { return __ZC(359, 138, this, arguments, new.target); }
function vrnRaceTick(dt) { return __ZC(359, 139, this, arguments, new.target); }
function vrnRaceEvent(li) { return __ZC(359, 140, this, arguments, new.target); }
function vrnRaceFinish() { return __ZC(359, 141, this, arguments, new.target); }
function vrnRaceQuit() {
var R = VRN.run;
if (!R)
return;
VRN.run = null;
VRN.ride = null;
vrnRidePanel(false);
vrnRaceHud(false);
if (R.veh && R.veh.parent)
R.veh.parent.remove(R.veh);
var A = VRN_SPOTS.reform;
vrnMove(A.x, A.z, 0, "🎩 You give up the wager and take the train home to the Reform Club.");
}
function vrnRaceHud(on) { return __ZC(359, 142, this, arguments, new.target); }
function vrnRacePost(ms) { if (typeof signedIn === "function" && !signedIn())
return; try {
sb.rpc("verne_race_post", { p_ms: ms, p_week: vrnRwWeek() }).then(function () { }, function () { });
}
catch (e) { } }
function vrnRaceBoard() { return __ZC(359, 143, this, arguments, new.target); }
var VRN_SPACE = { x: 52000, y: 3000, z: 0 };
function vrnPlanetMat(k) { var t = vrnPlanetTex(k); return new THREE.MeshLambertMaterial({ map: t, color: 0xA8A8A8, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.28 }); }
function vrnStoneBuild(G) { return __ZC(359, 144, this, arguments, new.target); }
function vrnPlanetTex(k) { return __ZC(359, 145, this, arguments, new.target); }
function vrnGunSums() { return __ZC(359, 146, this, arguments, new.target); }
function vrnMoonCard() { return __ZC(359, 147, this, arguments, new.target); }
function vrnMoonGo() { return __ZC(359, 148, this, arguments, new.target); }
var VRN_MOON_SAY = [[3, "🚀 <b>Out of the gun!</b> The sky goes from blue to deep violet to black in seconds. Below, Florida shrinks to a map."], [9, "🐕 Satellite, the dog who died in the shock (poor thing), was put out of the window; he floats alongside, a little moon of his own. Things thrown out go along with you."], [18, "⚖️ <b>The neutral point.</b> Where the Earth's pull and the Moon's pull are equal, everything floats: Ardan, the cups, you. (In truth you float all the way: anything falling freely feels weightless.)"], [30, "🌗 The Moon swells ahead: craters, mountains, grey plains the old astronomers called seas."], [42, "🌑 <b>The far side.</b> No one has ever seen it: black night, nothing but stars. The cold is terrible. (The first pictures of the far side came from a Soviet probe, Luna 3, in 1959.)"], [56, "🌍 Round the Moon and falling back toward the Earth: they never land. A meteor's pull bent their path, Barbicane says. The Earth grows, blue and white."], [72, "🌊 Down, down... into the Pacific, with a great splash. The USS Susquehanna, sounding the sea floor, fishes the shell out. The crew find them inside playing dominoes."]];
function vrnMoonTick(dt) { return __ZC(359, 149, this, arguments, new.target); }
function vrnMoonHome() { return __ZC(359, 150, this, arguments, new.target); }
var VRN_WINDS = [{ y0: 0, y1: 180, dx: -1.0, dz: 0.6 }, { y0: 180, y1: 420, dx: -3.2, dz: -0.5 }, { y0: 420, y1: 800, dx: -1.6, dz: 1.4 }, { y0: 800, y1: 2000, dx: 0.6, dz: -1.0 }];
function vrnWindAt(y) { for (var i = 0; i < VRN_WINDS.length; i++) {
var W = VRN_WINDS[i];
if (y >= W.y0 && y < W.y1)
return W;
} return VRN_WINDS[VRN_WINDS.length - 1]; }
function vrnBalloonCard() { return __ZC(359, 151, this, arguments, new.target); }
function vrnBalloonGo(free) { return __ZC(359, 152, this, arguments, new.target); }
var VRN_BAL_SEE = [["lake", "🌊 <b>A great lake</b>, so big it looks like a sea. Speke saw it in 1858 and named it Victoria; the Nile flows out of its north end. Fergusson is the first to see it from the sky."], ["moon", "⛰️ <b>The Mountains of the Moon</b>, snow on the equator. (The real Rwenzori mountains have glaciers, almost on the equator.)"], ["chad", "🦛 <b>Lake Chad</b>, shallow and full of islands. In the book a flock of condors attacks the balloon here and it loses half its gas."], ["sahara", "🏜️ <b>The Sahara.</b> No wind, no water, heat like an oven. Find a moving wind before the water runs out!"], ["falls", "💧 <b>The Senegal</b>, and its falls at Gouina. The balloon is failing: over the river, to safety!"]];
function vrnBalloonTick(dt, L) { return __ZC(359, 153, this, arguments, new.target); }
function vrnBalloonWin() { return __ZC(359, 154, this, arguments, new.target); }
function vrnBalloonOff(quiet) { return __ZC(359, 155, this, arguments, new.target); }
function vrnWindStreaks(on) { return __ZC(359, 156, this, arguments, new.target); }
function vrnStreakTick(dt) { return __ZC(359, 157, this, arguments, new.target); }
function vrnAlbatrossOn() { return __ZC(359, 158, this, arguments, new.target); }
function vrnAlbatrossOff(quiet) { return __ZC(359, 159, this, arguments, new.target); }
function vrnAlbatrossTick(dt, L) { return __ZC(359, 160, this, arguments, new.target); }
function vrnData() { var d = store.vrn; if (!d || typeof d !== "object")
d = store.vrn = {}; if (!Array.isArray(d.keeps))
d.keeps = []; if (!Array.isArray(d.designs))
d.designs = []; d.lessons = d.lessons || {}; return d; }
function vrnSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function vrnKeep(icon, name, why) { var d = vrnData(); d.keeps.push({ i: icon, n: name, w: why || "", at: Date.now() }); if (d.keeps.length > 200)
d.keeps.splice(0, d.keeps.length - 200); vrnSave(); }
function vrnPayLine(kind) { return __ZC(359, 161, this, arguments, new.target); }
function vrnReward(kind, say) { return __ZC(359, 162, this, arguments, new.target); }
var VRN_VOYAGES = [
[1863, "Five Weeks in a Balloon", "Dr Fergusson crosses Africa from east to west in the balloon Victoria, rising and sinking to find the winds.", "balloon"],
[1864, "Journey to the Centre of the Earth", "Professor Lidenbrock, Axel and Hans go down a crater in Iceland and find an underground sea.", "centre"],
[1864, "The Adventures of Captain Hatteras", "A captain who must reach the North Pole, whatever it costs, through the Arctic ice."],
[1865, "From the Earth to the Moon", "The Gun Club of Baltimore casts a giant cannon in Florida to fire a shell to the Moon.", "moon"],
[1867, "In Search of the Castaways", "Lord Glenarvan sails round the world along the 37th parallel looking for Captain Grant."],
[1869, "Twenty Thousand Leagues Under the Seas", "Professor Aronnax, Conseil and Ned Land are prisoners, and guests, aboard Captain Nemo's Nautilus.", "tour"],
[1870, "Around the Moon", "The shell flies round the Moon, and its passengers see what no one has seen.", "moon"],
[1871, "A Floating City", "A voyage across the Atlantic on the Great Eastern, the biggest ship of her day."],
[1872, "Adventures of Three Englishmen and Three Russians in Southern Africa", "Scientists measure the curve of the Earth across Africa, while their countries go to war."],
[1873, "The Fur Country", "A fort of fur traders in the far north, built on what turns out to be a floating island of ice."],
[1872, "Around the World in Eighty Days", "Phileas Fogg bets he can go round the world in eighty days, and the date line saves him.", "race"],
[1874, "The Mysterious Island", "Five castaways build a whole life from nothing on an island in the Pacific, watched over by someone unseen.", "island"],
[1875, "The Survivors of the Chancellor", "A ship on fire, then a raft, told as a diary."],
[1876, "Michael Strogoff", "The Tsar's courier rides across Siberia through an invading army."],
[1877, "Off on a Comet", "A comet scrapes the Earth and carries off a piece of it, people and all, round the Sun."],
[1877, "The Child of the Cavern", "A Scottish coal mine, a hidden underground city, and a girl who has never seen daylight."],
[1878, "Dick Sand, A Captain at Fifteen", "A fifteen-year-old has to take command of a ship, and is led astray to Africa."],
[1879, "The Begum's Fortune", "Two men inherit a fortune and build two cities: one for health, one for steel and guns."],
[1879, "Tribulations of a Chinaman in China", "A rich young man in China who is bored of life arranges for a friend to end it, then wants to live."],
[1880, "The Steam House", "A steam-powered iron elephant pulls two houses on wheels across India."],
[1881, "Eight Hundred Leagues on the Amazon", "A family floats down the Amazon on a giant raft of logs with a whole farm on it."],
[1882, "Godfrey Morgan", "A rich young man is shipwrecked on an island to learn about life; is it real?"],
[1882, "The Green Ray", "A Scottish girl will not marry until she has seen the green flash at sunset."],
[1883, "Kéraban the Inflexible", "A stubborn merchant goes all the way round the Black Sea rather than pay a toll to cross the Bosporus."],
[1884, "The Southern Star", "A young engineer makes a giant diamond in South Africa, and it is stolen."],
[1884, "The Archipelago on Fire", "Greece's war of independence and the pirates of the islands."],
[1885, "Mathias Sandorf", "A Hungarian patriot escapes, vanishes, and returns years later to set things right."],
[1886, "The Lottery Ticket", "A Norwegian girl's sweetheart is lost at sea, and a lottery ticket is all he left."],
[1886, "Robur the Conqueror", "Robur kidnaps the balloon club's leaders aboard his flying machine, the Albatross, to prove heavier-than-air flight.", "albatross"],
[1887, "North Against South", "The American Civil War in Florida."],
[1887, "The Flight to France", "Escaping across Germany in 1792."],
[1888, "Two Years' Vacation", "A schoolful of boys adrift on a ship land on an island and must run it themselves."],
[1889, "Family Without a Name", "Canada in 1837 and a family's secret."],
[1889, "Topsy-Turvy", "The Gun Club plan to fire a gun so big it will tilt the Earth's axis and melt the Arctic."],
[1890, "César Cascabel", "A travelling circus family goes home to France the long way: across Alaska and Siberia."],
[1891, "Mistress Branican", "A wife searches Australia for her lost husband."],
[1892, "Carpathian Castle", "A haunted castle in Transylvania, and an inventor's trick with sound and light."],
[1892, "Claudius Bombarnac", "A reporter on the first train across Asia, from the Caspian to Peking."],
[1893, "Foundling Mick", "An orphan boy in Ireland makes his way in the world."],
[1894, "Captain Antifer", "A treasure hunt that depends on longitude and latitude."],
[1895, "Propeller Island", "A whole floating city for millionaires, driven round the Pacific by electric screws."],
[1896, "Facing the Flag", "A terrible new weapon in the hands of a pirate, and a hollow volcano."],
[1896, "Clovis Dardentor", "A rich man in Algeria wants to adopt an heir, and the young men compete."],
[1897, "An Antarctic Mystery", "A sequel to Poe's Arthur Gordon Pym: to the South Pole to find out what happened."],
[1898, "The Mighty Orinoco", "Up the Orinoco river in Venezuela to find its source."],
[1899, "The Will of an Eccentric", "A board game played across the whole United States for a fortune."],
[1900, "Second Fatherland", "The Swiss Family Robinson's story, continued."],
[1901, "The Village in the Treetops", "Explorers in Africa find a village of ape-like people living in the trees."],
[1901, "The Sea Serpent", "Whalers hunt for a sea monster that may or may not exist."],
[1902, "The Kip Brothers", "Two brothers wrongly convicted of murder in the South Seas; a photograph clears them."],
[1903, "Travel Scholarships", "Prize students sail the West Indies, but the crew are not who they seem."],
[1904, "A Drama in Livonia", "A murder in the Baltic, and the wrong man accused."],
[1904, "Master of the World", "Robur returns, with a machine that is car, boat, submarine and aircraft all in one.", "albatross"],
[1905, "Invasion of the Sea", "A plan to flood the Sahara and make an inland sea."]
];
var VRN_LIFE = "Jules Verne was born in Nantes, a port in France, on 8 February 1828. As a boy he watched the ships on the Loire; a story says he once tried to run away to sea as a cabin boy and was fetched back. He studied law in Paris but wrote plays, and then met the publisher Pierre-Jules Hetzel, who in 1863 published Five Weeks in a Balloon and signed him up for two books a year. They called the series the Extraordinary Voyages: journeys through the known and unknown worlds. Verne read science journals by the hundred, kept files of notes, and sailed his own yachts, the Saint-Michel I, II and III. He lived most of his life in Amiens, where he was on the town council. He died on 24 March 1905. More of his books have been translated than those of almost any other writer.";
function vrnLibCard() { return __ZC(359, 163, this, arguments, new.target); }
var VRN_LESSONS = [
["float", "How a submarine dives", "A submarine has tanks it can fill with sea water or blow empty with air. Full, she weighs more than the water she pushes aside and sinks; empty, she weighs less and rises. Nemo's Nautilus works just so.", "Archimedes found it 2,200 years ago: anything in water is pushed up by the weight of the water it pushes aside.", ["Why does a submarine sink when its tanks fill?",
"It weighs more than the water it pushes aside", ["The water pulls it down by magnetism", "The engines point down", "Sea water is lighter than air"]]],
["deep", "The weight of the sea", "Every ten metres you go down, the sea presses on you with one more atmosphere: at 100 metres, eleven times what you feel on land. That's why the Nautilus's hull is double, of thick steel plates.", "The deepest place in the sea, the Challenger Deep, is almost 11,000 metres down: over a thousand atmospheres.", ["About how much more does the sea press for every 10 metres down?",
"One more atmosphere", ["Ten more atmospheres", "Nothing, water doesn't press", "Half an atmosphere"]]],
["hot", "Why a hot balloon rises", "Warm gas spreads out, so a balloon of it is lighter than the same amount of cooler air around it, and the air pushes it up. Fergusson heated his hydrogen to rise and let it cool to sink.", "The Montgolfier brothers flew the first hot-air balloon with people in 1783 in Paris.", ["Why does heating the gas make a balloon rise?",
"Warm gas spreads out and is lighter than the air around it", ["Heat pushes downward like a rocket", "Hot gas is magnetic", "The burner pulls it up"]]],
["orbit", "Falling round the Moon", "Throw a ball and it falls. Throw it faster and it lands farther. Throw it fast enough and the ground curves away beneath it as fast as it falls: it goes round for ever. That's an orbit.", "Isaac Newton drew a cannon on a mountain to explain this in 1687.", ["What is an orbit?",
"Falling all the time while moving sideways fast enough to keep missing the ground", ["Floating because there is no gravity in space", "Being pulled up by the Moon", "Standing still above the Earth"]]],
["line", "The date line", "The Earth turns once a day, so noon moves west round it. Going east round the world you meet each sunrise a little early, and gain a day in all; the calendar takes it back where you cross the 180th meridian. That's how Fogg won.", "The International Date Line mostly follows 180 degrees but bends round countries so none is split.", ["Going east all the way round the world, what happens?",
"You gain a day, which the date line takes back", ["You lose a week", "Nothing at all", "Your watch stops"]]],
["noon", "Finding where you are", "At noon the Sun is at its highest. How high it stands tells you how far north or south you are (your latitude). The time on a clock set to home tells you how far east or west (your longitude): one hour is fifteen degrees.", "Sailors used a sextant for the Sun's height and a chronometer for home time, as Cyrus Smith did with a stick and a watch.", ["How many degrees of longitude is one hour's difference in noon?",
"15 degrees", ["1 degree", "60 degrees", "360 degrees"]]],
["lens", "A lens to make fire", "A lens is thicker in the middle. It bends all the light that falls on it toward one point, the focus: enough sunlight in one spot gets hot enough to light dry moss. Herbert's two watch glasses filled with water made one.", "The same bending lets a magnifying glass, a telescope and your own eye work.", ["What does a lens do to sunlight to start a fire?",
"Bends it all to one small point", ["Makes it colder", "Turns it into electricity", "Stores it up overnight"]]],
["volt", "Electricity, the Nautilus's power", "The Nautilus runs on electricity: Nemo makes it with batteries using sodium from sea water. A battery pushes electric current round a wire; the current can turn motors, light lamps and send telegraph messages.", "Alessandro Volta made the first battery, a stack of zinc and copper discs with salty card between, in 1800.", ["What does a battery do?",
"Pushes electric current round a wire", ["Makes water boil", "Pulls iron filings", "Stores sunlight"]]],
["screw", "Lifting screws: Robur's helicopter", "A propeller is a twisted wing: turning, it pushes air one way and itself the other. Point it up and spin it fast enough, and it lifts. Robur's Albatross has thirty-seven of them.", "The first helicopters that really flew came in the 1930s and 1940s; Igor Sikorsky's VS-300 flew in 1939.", ["How does a spinning propeller lift?",
"It pushes air down, so the air pushes it up", ["Its noise lifts it", "It floats like a balloon", "It's pulled up by magnets"]]],
["morse", "The telegraph", "An electric current in a long wire can switch a magnet on and off far away. Short and long pulses (dots and dashes) spell out letters: Morse code. Cyrus Smith built one between Granite House and the corral.", "The first telegraph cable across the Atlantic worked in 1858; the Great Eastern laid a lasting one in 1866.", ["How does a telegraph send words?",
"Pulses of current in a wire spell letters in a code", ["By shouting down a pipe", "By sending paper through the wire", "By light along the wire"]]],
["layers", "What's really under our feet", "Lidenbrock thought the Earth might be cool inside. It isn't: it gets about 25 degrees hotter every kilometre down at first; the centre, over 6,000 km down, is as hot as the Sun's surface. Earthquake waves let us 'see' the layers: crust, mantle, outer core (liquid), inner core (solid).", "The deepest hole ever dug, the Kola Superdeep Borehole in Russia, reached 12 km: a scratch.", ["What do scientists use to see inside the Earth?",
"Earthquake waves passing through it", ["A deep enough ladder", "X-rays from satellites", "Volcano smoke"]]],
["fossil", "Fossils and deep time", "When an animal dies in mud, its bones can slowly turn to stone: a fossil. Layers of rock pile up over millions of years, the oldest at the bottom. The ichthyosaurs and plesiosaurs of the Lidenbrock Sea lived about 200 million years ago.", "Mary Anning, a fossil hunter in Lyme Regis, found the first complete plesiosaur in 1823.", ["In layers of rock, where are the oldest usually?",
"At the bottom", ["At the top", "In the middle", "They're all the same age"]]]
];
function vrnLessonList() { return __ZC(359, 164, this, arguments, new.target); }
function vrnLesson(key) { return __ZC(359, 165, this, arguments, new.target); }
function vrnLessonDraw(key, x, W, H, t) { return __ZC(359, 166, this, arguments, new.target); }
var VRN_EXAM = [
["Who wrote the Extraordinary Voyages?", ["Jules Verne", "H. G. Wells", "Robert Louis Stevenson"], 0],
["What was the name of Captain Nemo's submarine?", ["The Albatross", "The Nautilus", "The Henrietta"], 1],
["How many days did Phileas Fogg have to go round the world?", ["Eighty", "Forty", "A hundred"], 0],
["What saved Fogg's wager at the end?", ["Crossing the date line going east", "A faster train", "A shortcut through the North Pole"], 0],
["Where did Lidenbrock's journey begin, and end?", ["Iceland, and Stromboli in Italy", "Norway, and Greece", "Iceland, and Iceland again"], 0],
["How did the Mysterious Island's castaways first make fire?", ["A lens of two watch glasses filled with water", "Rubbing two sticks", "Lightning"], 0],
["What makes a submarine sink or rise?", ["Filling or emptying its tanks with water", "Its propeller pointing up or down only", "Magnets in the hull"], 0],
["How did Fergusson's balloon go up and down without losing gas?", ["By heating and cooling the gas", "By pumping in air", "By flapping wings"], 0],
["About how fast must something go to leave the Earth for good?", ["About 11 kilometres a second", "About 1 kilometre an hour", "As fast as light"], 0],
["What is an orbit?", ["Falling round something while moving sideways fast enough", "Floating with no gravity", "Hanging on a rope"], 0],
["Who was Captain Nemo, really?", ["Prince Dakkar, an Indian prince", "A French admiral", "Ned Land in disguise"], 0],
["What is the Albatross?", ["Robur's flying machine with many lifting screws", "A sea bird Nemo tames", "Fogg's steamer"], 0],
["About how much more does the sea press on you for each 10 metres down?", ["One more atmosphere", "Ten more atmospheres", "Nothing more"], 0],
["Which of these is a real Verne book?", ["Five Weeks in a Balloon", "Six Days on a Bicycle", "A Year Under the Ice Cap"], 0]
];
function vrnExam() { return __ZC(359, 167, this, arguments, new.target); }
function vrnExamQ(S) { return __ZC(359, 168, this, arguments, new.target); }
var VRN_BENCH = {
sub: { name: "A submarine", icon: "🐋", goal: "Reach the sea bed at the depth you choose, and come back up.",
p: [["depth", "Target depth (metres)", 50, 1000, 300, 10], ["hull", "Hull plate thickness (mm)", 5, 120, 40, 1], ["tank", "Ballast tank size (% of hull)", 0, 30, 8, 1]],
test: function (v) { return __ZC(359, 169, this, arguments, new.target); } },
balloon: { name: "A balloon", icon: "🎈", goal: "Lift the basket, three people and supplies: 900 kg in all.",
p: [["vol", "Envelope volume (cubic metres)", 200, 6000, 1000, 50], ["gas", "Gas: 0 = hot air, 1 = hydrogen", 0, 1, 0, 1], ["load", "Load (kg)", 300, 2000, 900, 10]],
test: function (v) { return __ZC(359, 170, this, arguments, new.target); } },
flyer: { name: "A flying machine", icon: "🚁", goal: "Build a ship of the air with lifting screws, like the Albatross.",
p: [["mass", "Ship's weight (kg)", 500, 20000, 6000, 100], ["screws", "Number of lifting screws", 1, 40, 12, 1], ["kw", "Engine power (kilowatts)", 20, 3000, 400, 10]],
test: function (v) { return __ZC(359, 171, this, arguments, new.target); } },
gun: { name: "A Moon gun", icon: "🌕", goal: "Fire a shell fast enough to reach the Moon (11 km/s) without crushing the people inside (most people can stand about 10 g for a moment).",
p: [["len", "Barrel length (metres)", 100, 1000000, 274, 100], ["speed", "Muzzle speed (km/s)", 1, 15, 11, 0.5]],
test: function (v) { return __ZC(359, 172, this, arguments, new.target); } }
};
function vrnBench(k) { return __ZC(359, 173, this, arguments, new.target); }
function vrnZoneAt(x, z) { return __ZC(359, 174, this, arguments, new.target); }
function vrnPlaceName(L) { return __ZC(359, 175, this, arguments, new.target); }
function vrnDeepNear(L) { return __ZC(359, 176, this, arguments, new.target); }
function vrnCine() { return !!((VRN.tour && VRN.tour.phase !== "walk") || VRN.run || VRN.moon || VRN.bal || VRN.chim); }
function vrnGround(x, z, feet) { return __ZC(359, 177, this, arguments, new.target); }
function vrnInsideWalk(x, z) { for (var i = 0; i < VRN.floors.length; i++) {
var F = VRN.floors[i];
if (!F.inside)
continue;
var lx = x - F.x, lz = z - F.z;
if (F.r !== undefined) {
if (lx * lx + lz * lz <= F.r * F.r)
return true;
}
else if (Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd)
return true;
} return false; }
function vrnBlock(x, z, feet) { return __ZC(359, 178, this, arguments, new.target); }
function vrnSolidOff(s) { if (!s)
return; VRN.solids = VRN.solids.filter(function (o) { return o !== s; }); var g = VRN.sgrid; if (g)
for (var k in g)
g[k] = g[k].filter(function (o) { return o !== s; }); }
function vrnRidePanel(on, btns) { return __ZC(359, 179, this, arguments, new.target); }
function vrnBelowBanner(min) { var h = WLD.hud, r = h && h.style.display !== "none" && h.getBoundingClientRect(); return Math.max(min, r && r.height ? Math.round(r.bottom + 6) : min); }
function vrnRideOff(quiet) { var R = VRN.ride; if (!R)
return; if (R.off)
try {
R.off(quiet);
}
catch (e) { } if (VRN.ride === R)
VRN.ride = null; vrnRidePanel(false); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyF" || typeof WLD === "undefined" || WLD.on !== VRN_KEY)
return;
var t = e.target;
if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA"))
return;
if (VRN.tour && VRN.tour.squid)
vrnSquidHit();
else if (VRN.foes)
vrnFoeHit();
else {
var d = vrnData(), S = VRN_LADDER[d.isl || 0], p = S && S.steps[d.islStep || 0];
if (p && p.k === "shoot")
vrnShoot();
}
});
function vrnFxTick(dt, L) { return __ZC(359, 180, this, arguments, new.target); }
function vrnSmokeOn(k) { var d = vrnData(); return (d.isl || 0) > vrnLadderIdx(k); }
function vrnVisTick(L) { return __ZC(359, 181, this, arguments, new.target); }
function vrnTick(dt) { return __ZC(359, 182, this, arguments, new.target); }
function vrnBakeTree(D) { return __ZC(359, 183, this, arguments, new.target); }
function vrnBuild(G) { return __ZC(359, 184, this, arguments, new.target); }
function vrnHome() { vrnRideOff(true); vrnEndAll(); worldHome("<b>Back from " + VRN_NAME + ".</b> 'Anything one man can imagine, other men can make real.'"); }
function vrnEndAll() { return __ZC(359, 185, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(VRN_KEY, {
base: VRN.base, far: 9000, ownSky: true, tone: 220,
env: function () { return vrnEnvNow(); },
build: function (G) { vrnBuild(G); },
enter: function (opt) { return __ZC(359, 186, this, arguments, new.target); },
leave: function () { vrnEndAll(); if (VRN.veil)
VRN.veil.style.opacity = "0"; VRN.moving = false; },
ground: function (x, z, feet) { if (vrnCine())
return feet; return vrnGround(x, z, feet); },
block: function (x, z, feet) { return vrnBlock(x, z, feet); },
tick: function (dt) { vrnTick(dt); },
back: function () { vrnHome(); }
});
function vrnGo(opt) {
if (VRN.state && VRN.state.open === false && !(typeof amKeeper === "function" && amKeeper())) {
setStatus("🧭 <b>" + VRN_NAME + " is closed for now</b> by the Keeper. Try again later.");
return false;
}
return worldGo(VRN_KEY, opt || {});
}
function vrnStateFetch() { return __ZC(359, 187, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(VRN_KEY) < 0)
WLG.keys.push(VRN_KEY);
function vrnForget() { return __ZC(359, 188, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () {
var f = worldLetGo;
worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === VRN_KEY)
vrnForget(); return r; };
})();
var VRND = { g: null, on: false };
function vrnHallSpot() {
if (typeof hallRealm !== "function" || typeof blockOrigin !== "function")
return null;
var r = hallRealm();
if (!r || !r.grid || (store.here || 0) !== r.id)
return null;
var h = blockOrigin(r.grid.bx, r.grid.bz), n = 1;
try {
n = hubDoorList().filter(function (d) { return d.to !== "hall"; }).length || 1;
}
catch (e) { }
var gaps = [];
for (var i = 0; i < n; i++) {
var a = ((i + 0.5) / n) * Math.PI * 2;
gaps.push({ a: a, d: Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2))) });
}
gaps.sort(function (p, q) { return p.d - q.d; });
var a2 = (gaps[3] || gaps[2] || gaps[1] || gaps[0]).a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
}
function vrnHallTick() {
if (WLD.on || store.inside || !walkMode) {
if (VRND.g)
VRND.g.visible = false;
if (VRND.on) {
VRND.on = false;
worldPromptCity(null);
}
return;
}
var s = vrnHallSpot();
if (!s) {
if (VRND.g)
VRND.g.visible = false;
if (VRND.on) {
VRND.on = false;
worldPromptCity(null);
}
return;
}
if (!VRND.g) {
var g = new THREE.Group(), iron = new THREE.MeshPhongMaterial({ color: 0x3A4A52, shininess: 60, specular: 0x666666 }), brass = new THREE.MeshPhongMaterial({ color: 0xC8A048, shininess: 80, specular: 0xFFE8A0 }), glass = new THREE.MeshLambertMaterial({ color: 0x6AA8C8, emissive: 0x1A4A6A });
[-1, 1].forEach(function (k) { wBox(0.7, 4.4, 0.7, iron, k * 1.9, 2.2, 0, g); });
wBox(4.5, 0.7, 0.7, iron, 0, 4.75, 0, g);
var hatch = wBox(3.1, 4.2, 0.2, iron, 0, 2.1, 0, g);
for (var r = 0; r < 10; r++) {
wSph(0.06, brass, -1.4 + (r % 2) * 2.8, 0.4 + Math.floor(r / 2) * 0.85, 0.14, g, 6);
}
var port = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), glass);
port.position.set(0, 2.7, 0.12);
g.add(port);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 8, 24), brass);
rim.position.set(0, 2.7, 0.13);
g.add(rim);
var wheel = new THREE.Group();
wheel.position.set(0, 6.1, 0.3);
g.add(wheel);
var wr = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.07, 8, 28), new THREE.MeshLambertMaterial({ color: 0x6A4426 }));
wheel.add(wr);
for (var sp = 0; sp < 8; sp++) {
var a = sp / 8 * Math.PI * 2, spk = wBox(0.06, 1.9, 0.06, new THREE.MeshLambertMaterial({ color: 0x6A4426 }), 0, 0, 0, wheel);
spk.rotation.z = a;
}
wSph(0.14, brass, 0, 0, 0.05, wheel, 10);
VRND.wheel = wheel;
var sg = wSign(["JULES VERNE'S WORLD", "the Nautilus · round the world · the Moon · press E"], 3.8, 0.8, "#1E2A3A", "#E8D8A8");
sg.position.set(0, 7.6, 0.5);
g.add(sg);
var gl = wGlow(0x8AC8E8, 3.2, 0.28);
gl.position.set(0, 2.6, 0.4);
g.add(gl);
scene.add(g);
VRND.g = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
VRND.g.visible = true;
VRND.g.position.set(s.x, 0, s.z);
VRND.g.rotation.y = -s.a - Math.PI / 2;
if (VRND.wheel)
VRND.wheel.rotation.z += 0.004;
if (d < 3.6) {
if (!VRND.on) {
VRND.on = true;
worldPromptCity("<b>" + VRN_NAME + "</b> · <b>press E</b> to step through the hatch", vrnFromHall);
}
}
else if (VRND.on) {
VRND.on = false;
worldPromptCity(null);
}
}
function vrnFromHall() {
worldPromptCity(null);
VRND.on = false;
var s = vrnHallSpot(), P = camera.position;
vrnGo(s ? { from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } } : {});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
vrnHallTick();
}
catch (e) {
if (!VRN.e1) {
VRN.e1 = 1;
if (window.console)
console.warn("verne door:", e);
}
} };
})();
function vrnMenu() { return __ZC(359, 189, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-verne"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-verne";
b.title = VRN_NAME;
b.textContent = "🧭 Verne";
b.onclick = function () { vrnMenu(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1700);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-vrn]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-vrn", "1");
b.textContent = "🧭 " + VRN_NAME + " (the Quay)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } vrnGo({}); };
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
if (!/[?&]kverne=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!(typeof amKeeper === "function" && amKeeper()))
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
vrnGo({});
try {
var q = new URLSearchParams(location.search);
q.delete("kverne");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === VRN_KEY; })) {
DGR_WORLDS.push([VRN_KEY, VRN_NAME + " (Safe everywhere but the Deep, the Underground past the camp and Lincoln Island's wild west, which are Dangerous)", 3, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[VRN_KEY] = { id: VRN_KEY, name: VRN_NAME, def: 3, group: "hidden" };
}
(function () {
if (typeof dgrLevelOf === "function") {
var lo = dgrLevelOf;
dgrLevelOf = function (id) { var n = lo.apply(this, arguments); if (id === VRN_KEY && typeof WLD !== "undefined" && WLD.on === VRN_KEY)
return vrnZoneLevel(n); return n; };
}
if (typeof DGB_KINDS !== "undefined")
Object.keys(VRN_BEASTS).forEach(function (k) { DGB_KINDS[k] = VRN_BEASTS[k]; });
if (typeof dgbList === "function") {
var dl = dgbList;
dgbList = function () { if (typeof WLD !== "undefined" && WLD.on === VRN_KEY) {
var z = VRN.zone;
return z === "deep" ? VRN_BEASTS_AT.deep : z === "under" ? VRN_BEASTS_AT.under : VRN_BEASTS_AT.wild;
} return dl.apply(this, arguments); };
}
if (typeof dgbBarred === "function") {
var db = dgbBarred;
dgbBarred = function (x, z, feet) {
if (typeof WLD !== "undefined" && WLD.on === VRN_KEY) {
var zn = vrnZoneAt(x, z);
if (VRN.zone === "deep") {
if (vrnWaterAt(x, z) === null || zn === "inside")
return true;
return false;
}
if (zn !== "under" && zn !== "farwest" && zn !== "serpentine")
return true;
if (vrnWaterAt(x, z) !== null)
return true;
if (vrnSolidAt(x, z, feet || vrnLand(x, z)))
return true;
}
return db.apply(this, arguments);
};
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === VRN_KEY; }))
try {
DK_PLACES.push([VRN_KEY, VRN_NAME]);
}
catch (e) { }
})();
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.pearl)
return;
var d = { k: "pearl", name: "Nemo's Great Pearl", icon: "🦪", at: VRN_KEY, seed: [0, 0], spot: "stone", mark: 0xE8E4DC,
what: "a giant clam, wide as a table, in a grotto behind black coral", look: "In the half-dark of the grotto, a clam two metres across, its shell edged like a pie crust, gapes very slightly. Something glows softly inside.", act: "Ease the shell open",
open: "Inside, on the clam's soft folds, lies a pearl as big as a coconut, perfectly round, glowing like a small moon.",
tale: "Captain Nemo found this clam years ago and let it grow round its pearl, telling no one but Aronnax: 'I have watched it grow, and I let nature do its work.' A pearl worth ten million francs, he said, which he would never sell. He left it here for whoever was brave enough to find it.",
rumour: "On the tour Nemo says he knows of a pearl greater than any in the world, in a clam he has let grow for years, and won't say where. The pearl diver of Ceylon says Nemo goes to a far reef where black coral hangs like a curtain." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.pearl = d;
RA.order.push("pearl");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "pearl") {
var key = "pearl@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.pearl;
if (c && c.key === key)
return c;
var Gr = VRN_DEEP.filter(function (F) { return F.k === "grotto"; })[0], x = Gr.x + 4, z = Gr.z + 3;
return (RA.spots.pearl = { x: x, z: z, y: vrnLand(x, z) + 0.4, key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.pearl = function () {
var g = new THREE.Group(), pm = new THREE.MeshPhongMaterial({ color: 0xF2EEE6, emissive: 0x3A3A40, shininess: 120, specular: 0xFFFFFF });
var p = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 16), pm);
p.position.y = 0.11;
g.add(p);
var glow = wGlow(0xE8F0FF, 0.6, 0.25);
glow.position.y = 0.11;
g.add(glow);
return { g: g, h: 0.22, anim: function (dt) { p.rotation.y += dt * 0.2; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.pearl = { n: "Mobilis in Mobili", col: 0xC8E0F0, cd: 40, pas: { speed: 1.12, regen: 1.5 },
act: [{ aoe: 16, dmg: 85, knock: 8 }, { aoe: 16, slow: 8 }],
pasT: "Moving in the moving element: you move 12% faster and heal a little all the time, as the sea heals.",
actT: "The Weight of the Deep: the pressure of a thousand metres of sea falls on every foe within 16 m: 85 to each and thrown back; then they are slowed for 8 seconds (dreamers too, where dreamers may fight). A deep blue shimmer, never a flash." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.vrn;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
var by = {};
d.keeps.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Keepsakes from " + VRN_NAME) + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("");
}
if (d && Array.isArray(d.designs) && d.designs.length)
h += bkpHead("Your designs (the Inventors' Hall)") + d.designs.map(function (D) { return bkpRow("📐 " + esc(D.n), "works"); }).join("");
}
catch (e) { }
return h;
};
})();
function vrnOutfitter() { if (typeof wgOutfit === "function" && typeof WGEAR !== "undefined" && WGEAR.worlds && WGEAR.worlds[VRN_KEY])
wgOutfit(VRN_KEY);
else
setStatus("⚓ The chandler is still unpacking his crates. Come back after the next update."); }
function vrnForge() { if (typeof craftOpen === "function")
craftOpen("wg_" + VRN_KEY);
else
setStatus("🔥 The foundry's furnace is banked for the night."); }
function vrnTest() { return { VRN: VRN, go: vrnGo, zoneAt: vrnZoneAt, ground: vrnGround, land: vrnLand, water: vrnWaterAt, enter: vrnEnter, move: vrnMove, tour: vrnTourStart, race: vrnRaceStart, ladder: VRN_LADDER, data: vrnData }; }
if (typeof ctTale === "function") {
ctTale({ id: "vn_island", host: "world:verne", t: "The Mysterious Island", by: "Jules Verne, 1875", where: "Jules Verne's World, at the Chimneys on Lincoln Island",
col: ["#2A3A1E", "#F2E8C8"], gold: 16, keep: ["A burning lens of two watch glasses", "🔍"], rad: 11, props: [],
who: [
{ n: "Cyrus Smith", who: "Cyrus Smith, an engineer from Massachusetts, calm, wise and able to make almost anything from almost nothing",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x4A4A3A, top: 0xE8E0D0, bottom: 0x4A4A3A, hair: 0x5A4A3A, hairStyle: "short", beard: 1, shoeKind: "boots", shoes: 0x2A1A12 } }, at: [-2, -1], greet: "We have nothing, and so we must make everything. Let us begin with fire.", c: 650 },
{ n: "Pencroft", who: "Pencroft, a cheerful, stubborn sailor who loves boats, tobacco and young Herbert",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x2A3A5A, top: 0xE8E0D0, bottom: 0x2A2A3A, hat: "cap", hatColor: 0x2A2A3A, hair: 0x5A3A1A, beard: 1, shoeKind: "boots", shoes: 0x2A1A12 } }, at: [1.5, -1.5], greet: "A boat, Mr Smith. Give me iron, and wood, and a boat I'll build you. And a pipe, if you can make tobacco grow.", c: 500 },
{ n: "Herbert Brown", who: "Herbert Brown, fifteen, Pencroft's young friend, who loves plants and animals and knows their names",
o: { sex: "m", look: { layer: "vest", layerColor: 0x5A6A3A, top: 0xE8E0D0, bottom: 0x4A4A3A, hair: 0x8A5A2A, hairStyle: "short", shoes: 0x2A1A12 } }, at: [3.5, -2], greet: "Look, a capybara! And that's a kind of wild sheep. This island has everything!", c: 450 },
{ n: "Gideon Spilett", who: "Gideon Spilett, a brave, quick war reporter for the New York Herald, a fine shot and a good doctor in a pinch",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x6A5A3A, top: 0xE8E0D0, bottom: 0x4A3A2A, hair: 0x3A2A1A, hairStyle: "short", beard: 1, shoeKind: "boots", shoes: 0x2A1A12 } }, at: [-4.5, -2], greet: "Every day here is a dispatch I'd give anything to send home. Not that the Herald will believe it.", c: 450 }
],
steps: [
{ k: "say", w: 0, t: "Cyrus Smith: \"Five of us, fallen from the sky in a balloon, escaping the siege of Richmond. No matches, no tools, no knife. Then let us make them.\"" },
{ k: "choose", w: 0, t: "With no matches, how does Cyrus first make fire in the book?", o: [["A lens made of two watch glasses filled with water", 1, "Yes. The water-filled glasses bend sunlight to a point hot enough to light moss."], ["He rubs two stones", 0, "Not in the book. Try again."], ["Lightning strikes a tree", 0, "No. Try again."]] },
{ k: "find", w: 2, t: "Herbert wants to show you what grows on the island. Find five of its plants before the tide comes in.", n: 5, look: "weed", col: 0x6AA84A, r: 26, secs: 180, name: "a plant", done: "Herbert names them all, and which are good to eat." }
],
qs: [["Where do the castaways come from?", "Richmond, Virginia, in the American Civil War", "London", "Paris"],
["Who has secretly been helping them?", "Captain Nemo", "Phileas Fogg", "Robur"],
["What do they call their home in the cliff?", "Granite House", "The Chimneys", "Prospect Heights"],
["What happens to the island at the end?", "Its volcano blows it apart and it sinks", "It becomes part of America", "It drifts away"]] });
ctTale({ id: "vn_balloon", host: "world:verne", t: "Five Weeks in a Balloon", by: "Jules Verne, 1863", where: "Jules Verne's World, on the balloon field",
col: ["#5A3A1A", "#FFE8B0"], gold: 16, keep: ["A ribbon from the Victoria's rigging", "🎀"], rad: 10, props: [["hotairballoon", -8, -9, 0, 0.35, {}]],
who: [
{ n: "Dr Samuel Fergusson", who: "Dr Samuel Fergusson, a calm English explorer and scientist who invents a balloon that rises and sinks by heating its gas",
o: { sex: "m", look: { layer: "jacket", layerColor: 0xC8B890, top: 0xF2EEE2, bottom: 0xA89A70, hat: "brimmed", hatColor: 0xE8E0C8, hair: 0x6A5A4A, hairStyle: "short", beard: 1, shoeKind: "boots" } }, at: [-2, -1], greet: "Across Africa, east to west, in a balloon. The winds will do the work; I need only choose which.", c: 600 },
{ n: "Dick Kennedy", who: "Dick Kennedy, Fergusson's Scottish friend, a superb hunter who thinks the whole trip is madness and comes anyway",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x3A5A3A, top: 0xE8E0D0, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x3A5A3A, hair: 0xA8642A, hairStyle: "short", beard: 1, shoeKind: "boots" } }, at: [1.5, -1.5], greet: "Madness, Samuel. Pure madness. ...Well, somebody has to keep you alive.", c: 450 },
{ n: "Joe", who: "Joe, Fergusson's devoted, brave, cheerful servant, nimble as an acrobat",
o: { sex: "m", look: { layer: "vest", layerColor: 0x6A3A2A, top: 0xF2EEE2, bottom: 0x3A3A3A, hair: 0x2A1A12, hairStyle: "curly" } }, at: [3.5, -2], greet: "Wherever the doctor goes, I go. Up's as good as anywhere!", c: 400 }
],
steps: [
{ k: "say", w: 0, t: "Fergusson: \"Most balloonists throw out sand to rise and let out gas to sink. Soon they have neither. I heat my gas: hotter, it swells and rises.\"" },
{ k: "choose", w: 0, t: "Why does a balloon rise when its gas is heated?", o: [["Warm gas spreads out and becomes lighter than the air around it", 1, "Yes. The air pushes up on anything lighter than the air it displaces."], ["Heat pulls it upward", 0, "Not quite. Try again."], ["The burner pushes like a rocket", 0, "No. Try again."]] },
{ k: "run", w: 2, t: "Joe has fallen from the basket into Lake Chad! Run round the shore through every ring to pick him up before the balloon drifts on.", n: 6, r: 30, secs: 100, done: "Joe swims to the shore, laughing. \"Nothing to it!\"" }
],
qs: [["Where did the Victoria start, and finish?", "Zanzibar, and the Senegal river", "Cairo, and Cape Town", "London, and Paris"],
["How did Fergusson make the balloon rise and sink?", "By heating and cooling its gas", "By throwing out sand only", "With propellers"],
["When was the book published?", "1863, Verne's first Extraordinary Voyage", "1900", "1820"]] });
ctTale({ id: "vn_robur", host: "world:verne", t: "Robur the Conqueror", by: "Jules Verne, 1886", where: "Jules Verne's World, at Robur's mast",
col: ["#1A2A3A", "#E8F0F8"], gold: 16, keep: ["A brass screw from the Albatross", "🔩"], rad: 10, props: [],
who: [
{ n: "Robur", who: "Robur the Conqueror, a proud, powerful engineer who has built a flying ship, the Albatross, heavier than air, and scorns balloons",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x1E1E26, top: 0xE8E4DC, bottom: 0x1E1E26, hair: 0x1A1410, hairStyle: "short", beard: 1, shoeKind: "boots", build: 1.15 } }, at: [-2, -1], greet: "The future belongs to the machine heavier than air. Balloons are toys. Come aboard, and see.", c: 650 },
{ n: "Uncle Prudent", who: "Uncle Prudent, president of the Weldon Institute of Philadelphia, a balloon enthusiast kidnapped by Robur",
o: { sex: "m", look: { layer: "suit", layerColor: 0x5A4A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x8A8A84, hairStyle: "short", beard: 1 } }, at: [1.5, -1.5], greet: "Kidnapped! In a flying... thing! The Weldon Institute will hear of this.", c: 450 },
{ n: "Phil Evans", who: "Phil Evans, the Weldon Institute's secretary, Uncle Prudent's rival and companion in captivity",
o: { sex: "m", look: { layer: "suit", layerColor: 0x2A3A4A, top: 0xF2EEE2, bottom: 0x2A3A4A, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x5A4A3A, hairStyle: "short" } }, at: [3.5, -2], greet: "For once Uncle Prudent and I agree: we must get off this ship.", c: 400 }
],
steps: [
{ k: "say", w: 0, t: "Robur: \"Thirty-seven lifting screws, turned by electric motors. No gas, no bag. She flies because she pushes the air down.\"" },
{ k: "choose", w: 0, t: "How does the Albatross stay up?", o: [["Spinning screws push air down, so the air pushes the ship up", 1, "Yes, like a helicopter's rotor."], ["It's filled with hydrogen", 0, "No, that's a balloon. Try again."], ["It flaps its wings", 0, "Not this one. Try again."]] },
{ k: "run", w: 1, t: "The prisoners are escaping while the Albatross is moored! Help them through every ring to their balloon before Robur notices.", n: 6, r: 30, secs: 100, done: "They're away... and they leave a little surprise behind that brings the Albatross down. (In the sequel, Master of the World, Robur returns.)" }
],
qs: [["What is the Albatross?", "A flying ship lifted by many spinning screws", "A balloon", "A sea bird"],
["Which club does Robur argue with?", "The Weldon Institute of Philadelphia", "The Reform Club", "The Gun Club"],
["In which later book does Robur come back?", "Master of the World", "Around the Moon", "Michael Strogoff"]] });
CT_W.vn_island = { th: "isle", intro: "March 1865. A balloon, torn by a storm, falls out of the sky onto an island no map shows.", ch: [
["The Fall", "Five men and a dog fall from the sky. Cyrus Smith is missing; the dog finds him.", "tents,bigtree", [ctS(1, "We have lost the balloon, the sea has nearly had us, and Mr Smith is gone... no! Top has found him!")], [0, 1, 2]],
["Fire", "No matches. Cyrus makes a lens from two watch glasses.", "camp,bigtree", [ctC(0, "What did Cyrus use to make a lens?", "Two watch glasses with water between them", "Yes. Sunlight, bent to a point.", "A bottle", "Ice")], [0, 2]],
["Granite House", "They break the lake's rim, the water falls, and a cave opens in the cliff: their home.", "village#A86A58,garden", [ctS(0, "A home in the granite, safe from the sea and from beasts. We shall call it Granite House.")], [0, 1, 3]],
["The Helper", "A chest of tools on the beach; quinine when Herbert is sick. Someone is helping them.", "dock,tents", [ctC(3, "Who has been helping them all along?", "Captain Nemo", "Yes, from the Nautilus, hidden in a grotto under the island.", "Robur", "Fogg")], [3, 0]],
["The End of the Island", "The volcano wakes. The island is blown apart and the castaways are rescued from its last rock.", "dock,ship", [ctR(1, "The mountain is waking! Run for the boat through every ring before the island goes!", 6, 100, "Aboard! Behind you, the island sinks into the sea.")], [0, 1, 2, 3]]
] };
CT_W.vn_balloon = { th: "desert", intro: "Zanzibar, April 1862. A great balloon, the Victoria, strains at its ropes.", ch: [
["Zanzibar", "The Victoria rises from the island and heads west over the mainland.", "dock,village", [ctS(0, "Up she goes. Africa is three thousand miles wide; we shall see every mile of it.")], [0, 1, 2]],
["The Great Lake", "They see the lake where the Nile is born, as Speke said.", "garden,tents", [ctC(0, "Which great river begins at the lake?", "The Nile", "Yes. Speke named the lake Victoria in 1858.", "The Thames", "The Amazon")], [0, 1]],
["The Desert", "No wind in the Sahara, the water nearly gone.", "tents", [ctS(1, "Not a breath of wind. Samuel, we are going to die of thirst up here.")], [1, 0]],
["The Senegal", "The balloon fails over the river; they cut the basket away and drift across to safety.", "village,garden", [ctR(2, "Over the river! Through every ring before the balloon comes down!", 6, 100, "Across! French soldiers welcome them.")], [0, 1, 2]]
] };
CT_W.vn_robur = { th: "sky", intro: "Philadelphia, 1880. The Weldon Institute is arguing about how to steer a balloon when a stranger walks in.", ch: [
["The Weldon Institute", "Robur tells the balloonists they are fools; the air belongs to machines heavier than air.", "manor,street", [ctS(0, "Gentlemen, the balloon is a toy. I have built something better.")], [0, 1, 2]],
["Kidnapped", "Prudent and Evans are seized and carried off aboard the Albatross.", "village", [ctC(1, "How many lifting screws does the Albatross have?", "Thirty-seven", "Yes, on masts along her deck.", "Two", "Four hundred")], [1, 2, 0]],
["Round the World", "The Albatross flies over America, Europe, Africa and the South Pole.", "tents,bigtree", [ctS(0, "Over the whole world, in a ship of my own making. And still you prefer your balloon?")], [0, 1]],
["Escape", "The prisoners escape when the ship lands on an island.", "dock,garden", [ctR(2, "Run for the boats, through every ring!", 6, 100, "Free! Robur will be back...")], [1, 2]]
] };
(function () {
if (typeof CT_BY_ID === "undefined")
return;
["vn_island", "vn_balloon", "vn_robur"].forEach(function (id) { var T = CT_TALES.filter(function (t) { return t.id === id; })[0]; if (!T)
return; CT_BY_ID[id] = T; if (typeof CT_BY_HOST !== "undefined") {
var L = CT_BY_HOST[T.host] || (CT_BY_HOST[T.host] = []);
if (L.indexOf(T) < 0)
L.push(T);
} });
if (typeof ctWorldName === "function") {
var wn = ctWorldName;
ctWorldName = function (h) { if (h === "world:verne")
return VRN_NAME + " (in Verne's Library, on the Quay of the Voyages)"; return wn.apply(this, arguments); };
}
})();
}
var VRN_AWN = {};
function vrnSwAwnMat(col) { return __ZC(359, 190, this, arguments, new.target); }
var VRN_SW = { done: {} };
function vrnSwWood() { return vrnSurf("wood", 0xA88660, 1.2); }
function vrnSwStone() { return vrnSurf("stone", 0xC8BEAE, 1.6); }
function vrnSwFree(x, z, y, r) { return __ZC(359, 191, this, arguments, new.target); }
function vrnSwCrate(D, x, y, z, ry, fill) { return __ZC(359, 192, this, arguments, new.target); }
function vrnSwStall(D, x, z, y, ry, seed) { return __ZC(359, 193, this, arguments, new.target); }
function vrnSwWell(D, x, z, y) { return __ZC(359, 194, this, arguments, new.target); }
function vrnSwCart(D, x, z, y, ry, load) { return __ZC(359, 195, this, arguments, new.target); }
function vrnSwBarrels(D, x, z, y, n) { return __ZC(359, 196, this, arguments, new.target); }
function vrnSwHay(D, x, z, y) {
var m = vrnSurf(null, 0xC8A858, 1);
var b = wCyl(1.5, 1.7, 2.2, m, x, y + 1.1, z, D, VRN.lite ? 8 : 14);
var t = wCone(1.6, 1.6, m, x, y + 3.0, z, D, VRN.lite ? 8 : 14);
vrnSolid({ x: x, z: z, r: 1.7, h: 3.6, b: y });
}
function vrnSwWoodpile(D, x, z, y, ry) { return __ZC(359, 197, this, arguments, new.target); }
function vrnSwBench(D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var S = vrnSwStone();
vrnBoxM(1.8, 0.12, 0.5, S, 0, 0.45, 0, g);
[-0.7, 0.7].forEach(function (s) { vrnBoxM(0.25, 0.4, 0.4, S, s, 0.2, 0, g); });
vrnSolid({ x: x, z: z, hw: 0.95, hd: 0.3, rot: ry, h: 0.55, b: y });
}
function vrnSwPotTree(D, x, z, y, kind) { return __ZC(359, 198, this, arguments, new.target); }
function vrnSwCypress(D, x, z, y, h) {
h = h || 9;
wCyl(0.14, 0.2, 1.2, vrnC(0x4A3A2A), x, y + 0.6, z, D, 6);
var c = wSph(1, vrnLeafMat(0x2A4A26), x, y + h * 0.5 + 0.6, z, D, VRN.lite ? 8 : 12);
c.scale.set(0.95, h * 0.5, 0.95);
vrnSolid({ x: x, z: z, r: 0.6, h: h, b: y });
}
function vrnSwOlive(D, x, z, y, R) {
var t = wCyl(0.18, 0.3, 1.8, vrnSurf("wood", 0x6A5A48, 0.8), x, y + 0.9, z, D, 7);
t.rotation.z = (R() - 0.5) * 0.3;
for (var i = 0; i < 3; i++) {
var c = wSph(1.1 + R() * 0.5, vrnLeafMat(0x7A8A5A), x + (R() - 0.5) * 1.4, y + 2.3 + R() * 0.6, z + (R() - 0.5) * 1.4, D, VRN.lite ? 7 : 10);
c.scale.y = 0.6;
}
vrnSolid({ x: x, z: z, r: 0.45, h: 3, b: y });
}
function vrnSwVines(D, x, z, y, ry) { return __ZC(359, 199, this, arguments, new.target); }
function vrnSwTrestle(D, x, z, y, ry) { return __ZC(359, 200, this, arguments, new.target); }
function vrnSwTimber(D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = vrnSurf("wood", 0x9A7A54, 1);
for (var r = 0; r < 3; r++)
for (var i = 0; i < 4; i++)
vrnBoxM(0.22, 0.22, 4.2, W, -0.36 + i * 0.24, 0.11 + r * 0.23, 0, g);
vrnSolid({ x: x, z: z, hw: 0.6, hd: 2.2, rot: ry, h: 0.8, b: y });
}
function vrnSwScatter(D, T, cx, cz, r0, r1, list, seed, folk) { return __ZC(359, 201, this, arguments, new.target); }
function vrnSwDress(name, D) { return __ZC(359, 202, this, arguments, new.target); }
(function () {
if (typeof vrnBakeTree !== "function")
return;
var bt = vrnBakeTree;
vrnBakeTree = function (D) { try {
if (D && D.name && !VRN_SW.done[D.name]) {
VRN_SW.done[D.name] = 1;
vrnSwDress(D.name, D);
}
}
catch (e) {
if (window.console)
console.warn("[verne] sweep", e);
} return bt.apply(this, arguments); };
if (typeof vrnBuild === "function") {
var vb = vrnBuild;
vrnBuild = function () { VRN_SW.done = {}; return vb.apply(this, arguments); };
}
})();
