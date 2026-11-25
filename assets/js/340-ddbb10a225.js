/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EL_ELEMENTS = [
{ k: "fire", name: "Fire", icon: "🔥", col: 0xC8501E, deep: 0x6A1E0A, glow: 0xFFA050, trim: 0xE0A040, ess: "el_ember", forge: "the Ember Forge", shrine: "mars",
cloth: ["#3A0E06", "#8A2A0E", "#E0602A", "#FFB04A"], about: "Fire is the first of the forges: it burns, it lights the dark and it makes steel." },
{ k: "water", name: "Water", icon: "🌊", col: 0x2A78B8, deep: 0x0E2E5A, glow: 0x8AD8FF, trim: 0xD8E0E8, ess: "el_pearl", forge: "the Tide Forge", shrine: "neverland",
cloth: ["#071A36", "#0E3E6E", "#2A8AC8", "#9AE0F0"], about: "Water slows what it touches and mends what is hurt, and it always comes back." },
{ k: "earth", name: "Earth", icon: "⛰️", col: 0x8A6A3A, deep: 0x3A2A16, glow: 0x8ADC9A, trim: 0xB89048, ess: "el_root", forge: "the Stone Forge", shrine: "underdark",
cloth: ["#1E160C", "#4A3A1E", "#7A6A3A", "#9ACF8A"], about: "Earth stands: it knocks back whatever strikes it and wards whoever stands on it." },
{ k: "air", name: "Air", icon: "🌬️", col: 0xA8C8D8, deep: 0x5A7A8A, glow: 0xF0FAFF, trim: 0xE8E8F0, ess: "el_feather", forge: "the Gale Forge", shrine: "veyar",
cloth: ["#5A7A8A", "#9ABCCC", "#D8ECF4", "#FFFFFF"], about: "Air goes through: its arrows pass on, its spears come back, and its mantle flies." },
{ k: "storm", name: "Storm", icon: "⚡", col: 0x5A4AA8, deep: 0x1E183A, glow: 0xD0D0FF, trim: 0xC8C8E0, ess: "el_storm", forge: "the Thunder Forge", shrine: "venus",
cloth: ["#0E0C22", "#2A2460", "#6A5AC8", "#D8D8FF"], about: "Storm leaps: a blow struck with it runs on to the next foe and the next." },
{ k: "life", name: "Life", icon: "🌿", col: 0x3A8A3A, deep: 0x163A16, glow: 0xC0F0A0, trim: 0xC8A050, ess: "el_green", forge: "the Green Forge", shrine: "greenwold",
cloth: ["#0E260E", "#2A5A22", "#5AA84A", "#E8C8E8"], about: "Life mends: what is struck with it gives back strength, and its wearer heals." }
];
var EL_BY = {};
EL_ELEMENTS.forEach(function (e, i) { e.i = i; EL_BY[e.k] = e; });
var EL_MATS = [
["el_ember", "Emberheart", "🔥", 30, "Ember vents on Mars and Mercury"],
["el_pearl", "Tidepearl", "🫧", 30, "Pearl pools in Neverland and a frozen spring on Pluto"],
["el_root", "Rootstone", "🪨", 30, "Root-veins on the Moon and in the Underdark"],
["el_feather", "Galefeather", "🪶", 30, "Wind-worn spires on Veyar and in Neverland"],
["el_storm", "Stormglass", "💎", 30, "Stormglass shards on Venus"],
["el_green", "Greenheart seed", "🌱", 30, "Greenheart blooms in the Greenwold and at the North Pole"]
];
var EL_LIST = [
["cinderbrand", "fire", "weapon", "sword", "craft", "Cinderbrand, the Ember Blade", "F swings it: a wave of flame runs out ahead of you. In Ironfray it burns what it strikes and scorches all round."],
["pyrestaff", "fire", "weapon", "staff", "found", "The Pyreheart Staff", "F looses a ball of fire that bursts where it lands. In Ironfray the burst burns everything near."],
["forgefall", "fire", "weapon", "hammer", "craft", "Forgefall, the Magma Maul", "F brings it down: fire bursts all round you. In Ironfray it hurls foes back and scorches the ground."],
["kilnaegis", "fire", "weapon", "shield", "gift", "The Kiln Aegis", "F raises a ring of flame round you. In Ironfray it turns blows aside and burns whoever strikes close."],
["emberplate", "fire", "plate", "", "craft", "Emberplate of the Six Forges", "Worn: a breastplate and pauldrons of ember-steel. Fire relics strike twice as hard; in Ironfray it wards off blows."],
["evercoal", "fire", "crown", "", "found", "The Circlet of the Ever-Coal", "Worn: a warm, steady ember-light shines round you wherever you go."],
["ashmantle", "fire", "mantle", "", "craft", "The Mantle of Rising Ash", "Worn: you drift down as softly as ash. No fall hurts you."],
["cindertreads", "fire", "boots", "", "craft", "Cindertread Boots", "Worn: you walk and run a third as fast again."],
["tidefang", "water", "weapon", "spear", "found", "Tidefang, the Deepwater Trident", "F casts a wave that breaks where it lands. In Ironfray the wave slows everything it washes over."],
["rainsong", "water", "weapon", "bow", "craft", "The Rainsong Bow", "F looses an arrow of rain. In Ironfray it passes through two foes and slows them."],
["deepcurrent", "water", "weapon", "staff", "craft", "The Staff of the Deep Current", "F sends a current of water ahead. In Ironfray it reaches far and drags foes slow."],
["brineedge", "water", "weapon", "dagger", "gift", "Brine-edge, the Pearl Dagger", "A dagger of pearl and sea-steel. F: a quick cut of brine. In Ironfray every cut mends you a little."],
["tideplate", "water", "plate", "", "craft", "Tideplate of the Drowned Kings", "Worn: plate of sea-steel and mother-of-pearl. Water relics strike twice as hard; in Ironfray it wards off blows."],
["pearlcrown", "water", "crown", "", "craft", "The Pearl Diadem", "Worn: a soft sea-blue light shines round you wherever you go."],
["deepmantle", "water", "mantle", "", "found", "The Mantle of the Deep Tide", "Worn: in Ironfray you mend quickly between blows, as the tide comes back."],
["wavewalkers", "water", "boots", "", "craft", "Wavewalker Boots", "Worn: you walk and run three tenths as fast again."],
["mountainheart", "earth", "weapon", "hammer", "found", "Mountainheart, the Quake Hammer", "F brings it down and the ground heaves all round you. In Ironfray it throws foes far back."],
["deepstone", "earth", "weapon", "shield", "craft", "The Bulwark of Deepstone", "F sets a wall of stone round you. In Ironfray it turns most blows aside."],
["rootspear", "earth", "weapon", "spear", "craft", "Rootspear", "A long spear that reaches further than any. F: roots burst up where it points. In Ironfray it holds foes slow."],
["jadeblade", "earth", "weapon", "sword", "gift", "The Jade Blade of the Deep Roads", "F swings it: stones leap up ahead of you. In Ironfray it knocks foes back."],
["stoneplate", "earth", "plate", "", "craft", "Stoneplate of the Mountain Halls", "Worn: plate of stone-steel set with jade. Earth relics strike twice as hard; in Ironfray it wards off blows."],
["granitecrown", "earth", "crown", "", "found", "The Granite Crown", "Worn: a steady jade light shines round you wherever you go."],
["cliffmantle", "earth", "mantle", "", "craft", "The Mantle of the Cliffside", "Worn: in Ironfray blows land softer on you, as on stone."],
["bedrockboots", "earth", "boots", "", "craft", "Bedrock Boots", "Worn: you walk and run a quarter as fast again."],
["galewing", "air", "weapon", "bow", "found", "Galewing, the Sky Bow", "F looses an arrow of wind. In Ironfray it flies true and passes through three foes."],
["skyreach", "air", "weapon", "spear", "craft", "Skyreach, the Returning Spear", "F throws it on the wind, and the wind brings it back. In Ironfray it passes through two foes."],
["whisperwind", "air", "weapon", "dagger", "craft", "Whisperwind, the Breath Dagger", "The quickest blade there is. F: a cut like a gust. In Ironfray it strikes almost as fast as you can press."],
["wildgale", "air", "weapon", "staff", "gift", "The Staff of the Wild Gale", "F calls a gale ahead of you. In Ironfray it hurls foes away."],
["galeplate", "air", "plate", "", "craft", "Galeplate of the High Eyrie", "Worn: light plate as pale as the sky. Air relics strike twice as hard; in Ironfray it wards off blows."],
["cloudcrown", "air", "crown", "", "craft", "The Cloudcrest Circlet", "Worn: a soft white light shines round you wherever you go."],
["highwind", "air", "mantle", "", "found", "The Mantle of the High Wind", "Worn: you can fly. Space to rise, C to come down."],
["zephyrboots", "air", "boots", "", "craft", "Zephyr Boots", "Worn: you walk and run six tenths as fast again."],
["thunderclap", "storm", "weapon", "hammer", "craft", "Thunderclap, the Storm Maul", "F brings it down with a roll of thunder. In Ironfray the blow leaps on to four more foes."],
["stormcaller", "storm", "weapon", "spear", "found", "Stormcaller, the Lightning Spear", "F calls a line of lightning from its point. In Ironfray it leaps from foe to foe."],
["sparkedge", "storm", "weapon", "sword", "craft", "Sparkedge", "F swings it: sparks run out ahead. In Ironfray each blow leaps on to two more foes."],
["rollingthunder", "storm", "weapon", "bow", "gift", "The Bow of Rolling Thunder", "F looses a bolt of lightning. In Ironfray it leaps on to two more foes."],
["stormplate", "storm", "plate", "", "craft", "Stormplate of the Tempest Lords", "Worn: dark plate veined with violet light. Storm relics strike twice as hard; in Ironfray it wards off blows."],
["stormcrown", "storm", "crown", "", "found", "The Crown of the Gathering Storm", "Worn: a steady violet light shines round you wherever you go."],
["tempestmantle", "storm", "mantle", "", "craft", "The Mantle of the Tempest", "Worn: you ride the storm wind and can fly. Space to rise, C to come down."],
["boltboots", "storm", "boots", "", "craft", "Boltstride Boots", "Worn: you walk and run half as fast again."],
["evergreen", "life", "weapon", "staff", "found", "The Evergreen Staff", "F calls up a ring of green light that mends. In Ironfray it heals you whole in a breath."],
["thornsong", "life", "weapon", "bow", "craft", "The Thornsong Bow", "F looses a spray of thorns. In Ironfray they slow whatever they strike."],
["bloomblade", "life", "weapon", "sword", "craft", "Bloomblade", "F swings it: petals and green light run ahead. In Ironfray every blow mends you."],
["verdantaegis", "life", "weapon", "shield", "gift", "The Verdant Aegis", "F raises a dome of leaves round you. In Ironfray it turns blows aside and mends you as you strike."],
["barkplate", "life", "plate", "", "craft", "Barkplate of the Elder Grove", "Worn: plate of living heartwood bound in gold. Life relics strike twice as hard; in Ironfray it wards off blows."],
["blossomcrown", "life", "crown", "", "craft", "The Blossom Crown", "Worn: a soft green light shines round you wherever you go."],
["greenmantle", "life", "mantle", "", "found", "The Mantle of the Greenwood", "Worn: in Ironfray you heal steadily, even in the thick of it."],
["mossboots", "life", "boots", "", "craft", "Mosswalker Boots", "Worn: you walk and run three tenths as fast again."]
];
var EL_ARMS = {
cinderbrand: { kind: "melee", dmg: 30, reach: 2.6, arc: 1.1, cool: 0.6, aoe: 2.5, burn: 1 },
pyrestaff: { kind: "shot", p: "fire", dmg: 34, spd: 28, cool: 0.9, splash: 3, burn: 1 },
forgefall: { kind: "melee", dmg: 38, reach: 2.4, arc: 1.2, cool: 1.05, knock: 4, aoe: 3.5, burn: 1 },
kilnaegis: { kind: "melee", dmg: 20, reach: 2.0, arc: 1.2, cool: 0.6, ward: 0.4, knock: 3, burn: 1 },
tidefang: { kind: "shot", p: "wave", dmg: 38, spd: 26, cool: 1.3, splash: 4, slow: 2.5 },
rainsong: { kind: "shot", p: "frost", dmg: 30, spd: 60, cool: 0.8, pierce: 2, slow: 1.5 },
deepcurrent: { kind: "beam", col: 0x4AA8D8, dmg: 26, reach: 36, cool: 0.8, slow: 2 },
brineedge: { kind: "melee", dmg: 16, reach: 1.9, arc: 0.9, cool: 0.25, leech: 0.25 },
mountainheart: { kind: "melee", dmg: 42, reach: 2.4, arc: 1.3, cool: 1.2, knock: 6, aoe: 4 },
deepstone: { kind: "melee", dmg: 18, reach: 2.0, arc: 1.2, cool: 0.6, ward: 0.3, knock: 4 },
rootspear: { kind: "melee", dmg: 26, reach: 3.6, arc: 0.6, cool: 0.7, slow: 1.5 },
jadeblade: { kind: "melee", dmg: 28, reach: 2.5, arc: 1.0, cool: 0.55, knock: 2 },
galewing: { kind: "shot", p: "arrow", dmg: 34, spd: 90, cool: 0.6, pierce: 3 },
skyreach: { kind: "shot", p: "javelin", dmg: 36, spd: 50, cool: 1.1, pierce: 2, back: 1 },
whisperwind: { kind: "melee", dmg: 14, reach: 1.8, arc: 1.0, cool: 0.18 },
wildgale: { kind: "cone", dmg: 8, reach: 11, arc: 0.6, cool: 0.5, knock: 8, puff: 0xE8F0F0 },
thunderclap: { kind: "melee", dmg: 36, reach: 2.4, arc: 1.1, cool: 1.0, knock: 4, chain: 4 },
stormcaller: { kind: "beam", col: 0xD8E8FF, dmg: 22, reach: 28, cool: 0.65, chain: 4 },
sparkedge: { kind: "melee", dmg: 26, reach: 2.5, arc: 1.0, cool: 0.5, chain: 2 },
rollingthunder: { kind: "shot", p: "spark", dmg: 32, spd: 95, cool: 0.85, chain: 2 },
evergreen: { kind: "self", heal: 50, cool: 4 },
thornsong: { kind: "shot", p: "thorn", dmg: 22, spd: 50, cool: 0.6, pellets: 2, spread: 0.04, slow: 2 },
bloomblade: { kind: "melee", dmg: 24, reach: 2.4, arc: 1.0, cool: 0.5, leech: 0.35 },
verdantaegis: { kind: "melee", dmg: 16, reach: 2.0, arc: 1.2, cool: 0.6, ward: 0.4, leech: 0.3 },
frostbrand: { kind: "melee", dmg: 30, reach: 2.6, arc: 1.1, cool: 0.6, aoe: 2.5, slow: 2 },
hoarfang: { kind: "shot", p: "frost", dmg: 34, spd: 40, cool: 0.9, splash: 2.5, slow: 2.5, back: 1 },
aurorabow: { kind: "shot", p: "star2", dmg: 30, spd: 70, cool: 0.8, pierce: 2 },
glacierfall: { kind: "melee", dmg: 38, reach: 2.4, arc: 1.2, cool: 1.05, knock: 4, aoe: 3.5, slow: 2 },
longnight: { kind: "beam", col: 0xCFF4FF, dmg: 26, reach: 36, cool: 0.8, slow: 3 },
dragontooth: { kind: "melee", dmg: 18, reach: 1.9, arc: 0.9, cool: 0.28, slow: 1.5 },
dragonshield: { kind: "melee", dmg: 18, reach: 2.0, arc: 1.2, cool: 0.6, ward: 0.35, knock: 3 }
};
var EL_ICE = { frostbrand: 1, hoarfang: 1, aurorabow: 1, glacierfall: 1, longnight: 1, dragontooth: 1, dragonshield: 1, frostplate: 1, polecrown: 1, auroramantle: 1, longsnowboots: 1 };
var EL_ICESLOT = { frostplate: "plate", polecrown: "crown", auroramantle: "mantle", longsnowboots: "boots" };
var EL_PACE = { cindertreads: 1.33, wavewalkers: 1.3, bedrockboots: 1.25, zephyrboots: 1.6, boltboots: 1.5, mossboots: 1.3 };
var EL_MANTLE = { ashmantle: "soft", deepmantle: "tide", cliffmantle: "stone", highwind: "fly", tempestmantle: "fly", greenmantle: "grow" };
var EL_NEED = {
sword: { ess: 6, cr_steel: 4, cr_crystal: 2, cr_leather: 1 }, spear: { ess: 6, cr_steel: 3, cr_wood: 3, cr_crystal: 1 },
bow: { ess: 6, cr_wood: 4, cr_crystal: 2, cr_cloth: 1 }, staff: { ess: 7, cr_wood: 3, cr_crystal: 3 }, hammer: { ess: 7, cr_steel: 6, cr_wood: 2 },
dagger: { ess: 4, cr_steel: 2, cr_leather: 1, cr_crystal: 1 }, shield: { ess: 6, cr_steel: 5, cr_leather: 2 },
plate: { ess: 8, cr_steel: 8, cr_leather: 3, cr_crystal: 2 }, crown: { ess: 5, cr_crystal: 4, cr_steel: 1 },
mantle: { ess: 7, cr_cloth: 6, cr_crystal: 2 }, boots: { ess: 5, cr_leather: 4, cr_steel: 2 }
};
var EL_EXTRA = { fire: { cr_ember: 2 }, earth: { cr_ore: 4 }, storm: { cr_crystal: 1 }, life: { cr_wood: 2 } };
function elNeed(R) {
var base = EL_NEED[R.slot === "weapon" ? R.form : R.slot] || {}, E = EL_BY[R.el], out = {};
Object.keys(base).forEach(function (k) { if (k === "ess")
out[E.ess] = base[k];
else
out[k] = base[k]; });
var x = EL_EXTRA[R.el] || {};
Object.keys(x).forEach(function (k) { out[k] = (out[k] || 0) + x[k]; });
return out;
}
var EL_R = {}, EL_KEYS = [];
EL_LIST.forEach(function (q) { var R = { key: q[0], el: q[1], slot: q[2], form: q[3], how: q[4], name: q[5], does: q[6] }; R.need = R.how === "craft" ? elNeed(R) : null; EL_R[R.key] = R; EL_KEYS.push(R.key); });
var EL_HIDE = {
pyrestaff: { at: "mars", seed: [380, 300], what: "a scorched stone", look: "This stone is black with old burning, and warm to the touch, though the rocks round it are cold. There is a gap under it, just wide enough for a hand.", act: "Reach under the stone",
hint: "On the red world, where the great mountain throws no shadow at noon, a stone stays warm that the Sun has long forgotten." },
evercoal: { at: "mercury", seed: [-300, 420], what: "a coal that never cooled", look: "Pressed into the dust is a lump of coal with a faint red heart. It has burned here for longer than anyone has walked this world.", act: "Lift the coal",
hint: "Nearest the Sun, on the side away from my Hall, a coal has burned in the dust since before the first forge was lit." },
tidefang: { at: "neverland", seed: [260, -300], what: "a shell half buried in the sand", look: "A great spiral shell lies half buried, pointing inland. When you lean close you hear the sea in it, though the sea is behind you.", act: "Dig the shell out",
hint: "In the land of the second star, a shell that should lie on the shore points inland. Listen to it." },
deepmantle: { at: "pluto", seed: [-420, -260], what: "a frozen pool", look: "A small pool, frozen hard. Under the ice something dark-blue moves very slowly, like cloth in a current.", act: "Break the ice",
hint: "On the coldest world, a pool has frozen over something that still moves with the tide." },
mountainheart: { at: "underdark", seed: [40, -200], what: "a crack in the cavern floor", look: "A crack in the floor runs straight as a rule, and the stone either side of it hums very faintly.", act: "Prise the crack open",
hint: "Under the world, where the dwarves dug deepest, a crack in the floor hums like a struck anvil." },
granitecrown: { at: "moon", seed: [520, -380], what: "a ring of pale stones", look: "Seven pale stones sit in a perfect ring, too neat for chance. The dust inside the ring has never been walked on.", act: "Brush the dust from the middle",
hint: "On the Moon, a ring of seven pale stones keeps a crown no foot has touched." },
galewing: { at: "veyar", seed: [-450, 380], what: "a crystal that whistles", look: "The wind whistles through one crystal and not the others. There is a hollow in its root, worn smooth.", act: "Reach into the hollow",
hint: "On Veyar, one crystal whistles when the others are silent. What sings there is a bow." },
highwind: { at: "gr_heavens", seed: [30, -140], what: "a feather caught on a rock", look: "A long grey feather is caught on a rock, pinned flat by a wind that has dropped, high above the clouds.", act: "Free the feather",
hint: "In the city above the clouds, a wind dropped long enough to pin a feather to a rock, and never rose again." },
stormcaller: { at: "venus", seed: [-460, 380], what: "a rod of fused glass", look: "A rod of glass stands out of the ground where lightning once struck, still faintly warm. It is hollow.", act: "Draw out what is inside",
hint: "Where the lightning on Venus struck one place twice, the glass it made is hollow." },
stormcrown: { at: "gr_jupiter", seed: [480, 160], what: "a black rock that hums", look: "A black rock hums like a storm a long way off. The dust round it stands up a little, as hair does before lightning.", act: "Turn the rock over",
hint: "In the city among the greatest world's clouds, at its far edge, a black rock hums with a storm that never comes." },
evergreen: { at: "greenwold", seed: [-280, -260], what: "a sapling that never grows", look: "A sapling no taller than your knee, with leaves greener than anything round it. Its roots are wound round something straight and smooth.", act: "Ease the roots apart",
hint: "In the Greenwold, a sapling has stayed small for a hundred summers, holding something in its roots." },
greenmantle: { at: "northpole", seed: [380, 420], what: "a patch of green in the snow", look: "A patch of moss as green as summer, in the middle of the snow. Under it, folded, something soft.", act: "Lift the moss",
hint: "At the North Pole, past the pines, a patch of summer green lies in the snow." }
};
var EL_SHRINE = {
fire: { at: "mars", seed: [160, -140], name: "The Shrine of Fire", about: "A ring of black basalt round a steady flame that burns on nothing." },
water: { at: "neverland", seed: [140, 180], name: "The Shrine of Water", about: "A basin of white stone, always full, though no water runs to it." },
earth: { at: "underdark", seed: [10, -110], name: "The Shrine of Earth", about: "A standing stone set with jade, warm as a hearthstone." },
air: { at: "veyar", seed: [150, 140], name: "The Shrine of Air", about: "Three tall pale stones, and a wind that blows only between them." },
storm: { at: "venus", seed: [-150, 160], name: "The Shrine of Storm", about: "An iron spire with a steady violet light caught at its tip." },
life: { at: "greenwold", seed: [120, -150], name: "The Shrine of Life", about: "A ring of standing stones round a tree that is always in blossom." }
};
var EL_WELLS = [
["el_fire_1", "fire", "mars", [110, 90]], ["el_fire_2", "fire", "mars", [-140, 120]], ["el_fire_3", "fire", "mercury", [90, -120]],
["el_water_1", "water", "neverland", [100, 140]], ["el_water_2", "water", "neverland", [-120, 90]], ["el_water_3", "water", "pluto", [120, -90]],
["el_earth_1", "earth", "moon", [130, 110]], ["el_earth_2", "earth", "moon", [-110, -130]], ["el_earth_3", "earth", "underdark", [-20, -140]],
["el_air_1", "air", "veyar", [120, -110]], ["el_air_2", "air", "veyar", [-130, 100]], ["el_air_3", "air", "neverland", [60, -160]],
["el_storm_1", "storm", "venus", [120, 100]], ["el_storm_2", "storm", "venus", [-110, -120]], ["el_storm_3", "storm", "venus", [140, -140]],
["el_life_1", "life", "greenwold", [90, -110]], ["el_life_2", "life", "greenwold", [-120, -90]], ["el_life_3", "life", "northpole", [-110, 140]]
];
var EL_WELLNAME = { fire: "An ember vent", water: "A pool of tidepearls", earth: "A root-vein in the stone", air: "A wind-worn spire", storm: "A shard of stormglass", life: "A greenheart bloom" };
var EL_HALL = { at: "mercury", seed: [260, 240], r: 34 };
var EL_PLACE = { mars: "Mars", mercury: "Mercury", neverland: "Neverland", pluto: "Pluto", underdark: "the Underdark", moon: "the Moon", veyar: "Veyar", gr_jupiter: "Vellamar on Jupiter", gr_heavens: "Lumenreach in the Heavens", venus: "Venus", greenwold: "the Greenwold", northpole: "the North Pole", city: "Somnucor", battle: "Ironfray", sea: "the Endless Sea" };
var EL_MASTER_NAME = "Master Varenne of the Six Forges";
var EL_CTX = "You are in the Hall of the Six Forges on Mercury, in SomnuMatrix: a great domed hall of basalt and bronze on the planet nearest the Sun, where six forges never cool, one for each element: the Ember Forge (fire), the Tide Forge (water), the Stone Forge (earth), the Gale Forge (air), the Thunder Forge (storm) and the Green Forge (life). The North King's ice relics are made at his own ice forge under his palace at the North Pole; these six are the other elements. Relics of each element are forged here from that element's rare essence (Emberheart, Tidepearl, Rootstone, Galefeather, Stormglass and Greenheart seed, gathered at wells in the element's worlds) with steel, star crystal, leather, cloth and wood. Each element also has a shrine in its own world (fire on Mars, water in Neverland, earth in the Underdark, air on Veyar, storm on Venus, life in the Greenwold); a dreamer who lays a hand on a shrine may ask Master Varenne for that element's gift. Twelve relics were lost long ago and lie hidden, one of each in the universe. Relic weapons fight only in Ironfray; anywhere else they show their element and harm nobody.";
var EL_MASTER = { name: EL_MASTER_NAME, persona: EL_CTX + " You are Master Varenne, Master of the Six Forges: tall, grey-braided, scarred on the forearms, calm and dryly funny, proud of every apprentice who earns a relic and impatient with anyone who wants one handed to them. You speak of fire, water, earth, air, storm and life as old friends with tempers. You know a riddle about each of the twelve lost relics but never say plainly where one lies, only the riddle. You give each dreamer one gift per element, once they have laid a hand on that element's shrine.",
greet: "Welcome to the Six Forges. Mind the Ember Forge, it bites. What brings you to my anvil?" };
var EL_SMITHS = {
fire: { name: "Brannoc Coalhand, smith of the Ember Forge", look: { sex: "m", top: 0x5A2A1A, topKind: "shirt", bottom: 0x2A1A12, layer: "apron", layerColor: 0x4A2A16, hair: 0x8A2A10, hairStyle: "short", beard: "full", shoes: 0x1A1210 },
persona: "You are Brannoc Coalhand, who keeps the Ember Forge: loud, warm, quick to laugh, never without soot on your nose. You love fire the way some love dogs.", greet: "Stand back a pace, friend. She's hungry today." },
water: { name: "Ysolde Tidewright, smith of the Tide Forge", look: { sex: "f", top: 0x1E4A6A, topKind: "shirt", bottom: 0x1A2A3A, layer: "apron", layerColor: 0x2A3A4A, hair: 0x1A1A22, hairStyle: "braids", shoes: 0x1A1A22 },
persona: "You are Ysolde Tidewright, who keeps the Tide Forge, where steel is quenched in sea that never stops moving: patient, soft-spoken, exact.", greet: "Listen. You can hear the tide in the quench." },
earth: { name: "Durrik Stonebrow, smith of the Stone Forge", look: { sex: "m", top: 0x4A3A22, topKind: "shirt", bottom: 0x2A2214, layer: "apron", layerColor: 0x3A2A18, hair: 0x5A4A3A, hairStyle: "short", beard: "long", shoes: 0x2A1A10 },
persona: "You are Durrik Stonebrow, a dwarf of Stonehallow who keeps the Stone Forge: slow, stubborn, kind, fond of jade and very fond of a good hammer.", greet: "Hmph. Mind the anvil. It's older than your great-grandmother." },
air: { name: "Sefa Lightwind, smith of the Gale Forge", look: { sex: "f", top: 0xD8E4EC, topKind: "shirt", bottom: 0x8A9AA8, layer: "apron", layerColor: 0x6A7A88, hair: 0xE8E0C8, hairStyle: "ponytail", shoes: 0x5A6A78 },
persona: "You are Sefa Lightwind, who keeps the Gale Forge, where the bellows are the wind itself: quick, restless, cheerful, always half way to the next idea.", greet: "Hold onto your hat! The bellows are in a mood." },
storm: { name: "Corvane Ashgrey, smith of the Thunder Forge", look: { sex: "m", top: 0x2A2440, topKind: "shirt", bottom: 0x1A1828, layer: "longcoat", layerColor: 0x24203A, hair: 0xC8C8D8, hairStyle: "long", shoes: 0x1A1A22 },
persona: "You are Corvane Ashgrey, who keeps the Thunder Forge: dry, careful, fond of thunder the way an old sailor is fond of the sea. The storm in your forge is always held in steady glass, so nothing ever flashes.", greet: "Quite safe. The storm is in the glass, and the glass is mine." },
life: { name: "Mother Elowen, smith of the Green Forge", look: { sex: "f", top: 0x2A5A2A, topKind: "dress", bottom: 0x2A4A22, layer: "apron", layerColor: 0x6A5A3A, hair: 0xD8D8D0, hairStyle: "bun", shoes: 0x3A2A1A },
persona: "You are Mother Elowen, who keeps the Green Forge, where relics are grown as much as forged: motherly, wise, teasing, smelling of moss and honey.", greet: "Come in, come in. Mind the seedlings." }
};
var EL = { mats: {}, tex: {}, fx: [], light: null, lightKey: "", t: 0, rows: {}, rowsOk: false, rowsAt: -99, place: null, built: null, warned: 0,
state: null, stateAt: -99, stock: {}, stockAt: -99, klist: null, kmove: null, kgo: null, missing: false, open: {}, said: {} };
function elLite() { return typeof LITE !== "undefined" && !!LITE; }
function elSigned() { return typeof signedIn === "function" && signedIn(); }
function elKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function elSay(h) { if (typeof WLD !== "undefined" && WLD.on === "battle" && typeof bwSay === "function")
try {
bwSay(h, true);
return;
}
catch (e) { } if (typeof setStatus === "function")
try {
setStatus(h);
}
catch (e) { } }
function elTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function elRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function elMissing(e) { return /PGRST202|Could not find the function|does not exist|schema cache|404/i.test(String((e && e.message) || e)); }
function elEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function elShort(R) { return String(R.name).split(",")[0]; }
function elOf(key) { return EL_R[key] ? EL_R[key].el : EL_ICE[key] ? "ice" : null; }
function elSlot(key) { return EL_R[key] ? EL_R[key].slot : EL_ICESLOT[key] || (EL_ICE[key] ? "weapon" : null); }
var EL_FORM_ICE = { sword: "frostbrand", spear: "hoarfang", bow: "aurorabow", hammer: "glacierfall", staff: "longnight", dagger: "dragontooth", shield: "dragonshield" };
var EL_SLOT_ICE = { plate: "frostplate", crown: "polecrown", mantle: "auroramantle", boots: "longsnowboots" };
(function () {
if (typeof RELICS === "undefined" || typeof RL_BY === "undefined")
return;
EL_KEYS.forEach(function (k) {
var R = EL_R[k];
if (RL_BY[k])
return;
var r = { key: k, kind: R.slot === "weapon" ? "weapon" : "armour", vault: "elemental", name: R.name, does: R.does, el: R.el, slot: R.slot, form: R.form };
RELICS.push(r);
RL_BY[k] = r;
});
if (typeof ipForgeCard === "function") {
var fc = ipForgeCard;
ipForgeCard = function () { var all = RELICS; RELICS = all.filter(function (r) { return !r.el; }); try {
return fc.apply(this, arguments);
}
finally {
RELICS = all;
} };
}
})();
function elEngrave(el) { return __ZC(340, 0, this, arguments, new.target); }
function elCloth(el) { return __ZC(340, 1, this, arguments, new.target); }
function elMats(el) { return __ZC(340, 2, this, arguments, new.target); }
function elWithMats(el, fn) {
rlFitMats();
var keep = RLF.m;
RLF.m = elMats(el);
try {
return fn();
}
finally {
RLF.m = keep;
}
}
function elWeapon(key) { return __ZC(340, 3, this, arguments, new.target); }
(function () {
if (typeof HELD === "undefined" || typeof ARMS === "undefined")
return;
EL_KEYS.forEach(function (k) {
var R = EL_R[k];
if (R.slot !== "weapon")
return;
HELD["relic_" + k] = function () { var g; try {
g = elWeapon(k);
}
catch (e) {
if (window.console)
console.warn("[elemental] weapon", k, e);
g = new THREE.Group();
} g.userData.relicWeapon = k; return g; };
ARMS["relic_" + k] = { held: "relic_" + k, shot: null, name: elShort(R) };
});
})();
(function () {
if (typeof rlWear !== "function")
return;
var rw = rlWear;
rlWear = function (key, on) {
if (on) {
var sl = elSlot(key);
if (sl && sl !== "weapon")
Object.keys(RL.worn).forEach(function (k) { if (k !== key && elSlot(k) === sl)
delete RL.worn[k]; });
}
return rw.apply(this, arguments);
};
})();
(function () {
if (typeof rlDress !== "function")
return;
var rd = rlDress;
rlDress = function (g, keys) {
var ice = [], els = [];
(keys || []).forEach(function (k) { if (EL_R[k])
els.push(k);
else
ice.push(k); });
if (!els.length)
return rd.apply(this, arguments);
if (ice.length)
rd.call(this, g, ice);
els.forEach(function (k) {
var R = EL_R[k], E = EL_BY[R.el], shape = EL_SLOT_ICE[R.slot];
if (!shape)
return;
var before = (g.userData.rlParts || []).length;
rd.call(this, g, [shape]);
(g.userData.rlParts || []).slice(before).forEach(function (p) {
p.traverse(function (o) {
if (!o.isMesh || !o.material || !o.material.color)
return;
var mm = o.material.clone(), hsl = {};
mm.color.getHSL(hsl);
if (mm.map)
mm.map = null;
mm.color.setHex(o.material.type === "MeshBasicMaterial" ? E.glow : hsl.l > 0.75 ? E.glow : hsl.s > 0.4 && hsl.h < 0.17 ? E.trim : E.col);
if (mm.emissive)
mm.emissive.setHex(0);
o.material = mm;
});
});
});
g.userData.rlKeys = (keys || []).slice();
};
})();
(function () {
if (typeof rlFitDress !== "function")
return;
var fd = rlFitDress;
rlFitDress = function (E, keys) {
var ice = [], els = [];
(keys || []).forEach(function (k) { if (EL_R[k])
els.push(k);
else
ice.push(k); });
if (!els.length)
return fd.apply(this, arguments);
var out = ice.length ? fd.call(this, E, ice) : null;
if (!out)
out = { made: [], capes: [] };
var plate = (keys || []).some(function (k) { return elSlot(k) === "plate"; });
els.forEach(function (k) {
var R = EL_R[k], shape = EL_SLOT_ICE[R.slot];
if (!shape)
return;
var one = [shape];
one.indexOf = function (x) { return x === "frostplate" && plate && shape !== "frostplate" ? 1 : Array.prototype.indexOf.call(this, x); };
var r = null;
try {
r = elWithMats(R.el, function () { return fd.call(this, E, one); });
}
catch (e) {
if (window.console)
console.warn("[elemental] fit", k, e);
}
if (r) {
out.made = out.made.concat(r.made || []);
out.capes = out.capes.concat(r.capes || []);
}
});
if (els.some(function (k) { return EL_R[k].slot === "crown"; }) && !(keys.indexOf("polecrown") >= 0)) {
out.hatsHid = [];
(E.hats || []).forEach(function (m) { if (m.visible) {
m.visible = false;
out.hatsHid.push(m);
} });
}
return out;
};
})();
var EL_FXGEO = null;
function elFxGeo() { return __ZC(340, 4, this, arguments, new.target); }
function elFxMat(col, op) { return new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide }); }
function elBurst(el, x, y, z, size, kind) { return __ZC(340, 5, this, arguments, new.target); }
function elBolt(el, big) { return __ZC(340, 6, this, arguments, new.target); }
function elFxTick(dt) {
for (var i = EL.fx.length - 1; i >= 0; i--) {
var F = EL.fx[i];
F.t += dt;
if (F.bolt) {
var B = F.bolt, st = B.spd * dt;
F.g.position.addScaledVector(B.dir, st);
B.left -= dt;
var gy = (typeof supportAt === "function") ? supportAt(F.g.position.x, F.g.position.z, F.g.position.y) : -1e9;
if (B.left <= 0 || (gy > -1e5 && F.g.position.y <= gy + 0.2)) {
elBurst(B.el, F.g.position.x, Math.max(gy > -1e5 ? gy : F.g.position.y - 1, F.g.position.y - 1.2), F.g.position.z, B.big ? 1.4 : 1);
if (F.g.parent)
F.g.parent.remove(F.g);
EL.fx.splice(i, 1);
}
continue;
}
var k = Math.min(1, F.t / F.life), sc = 1 + F.grow * k;
F.g.scale.setScalar(sc);
if (F.rise)
F.g.position.y += F.rise * dt;
F.parts.forEach(function (p) { p.o.material.opacity = p.op * (1 - k) * (1 - k * 0.3); });
if (k >= 1) {
if (F.g.parent)
F.g.parent.remove(F.g);
F.parts.forEach(function (p) { p.o.material.dispose(); if (p.own)
p.o.geometry.dispose(); });
EL.fx.splice(i, 1);
}
}
}
function elPlateEl() { var w = Object.keys(RL.worn || {}); for (var i = 0; i < w.length; i++) {
if (elSlot(w[i]) === "plate")
return elOf(w[i]);
} return null; }
function elUse(key) { return __ZC(340, 7, this, arguments, new.target); }
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () {
try {
if (typeof carrying !== "undefined" && carrying) {
var a = String(carrying.archetype || ""), k = null;
if (carrying.relic && /^relic_/.test(a))
k = a.slice(6);
else if (/^bw_rl/.test(a) && !(typeof WLD !== "undefined" && WLD.on === "battle"))
k = a.slice(5);
if (k && EL_R[k])
return elUse(k);
}
}
catch (e) {
if (window.console)
console.warn("[elemental] use", e);
}
return uc.apply(this, arguments);
};
})();
function elWornAny(list) { for (var i = 0; i < list.length; i++)
if (RL.worn && RL.worn[list[i]])
return true; return false; }
function elMantle() { var w = Object.keys(RL.worn || {}); for (var i = 0; i < w.length; i++)
if (EL_MANTLE[w[i]])
return EL_MANTLE[w[i]]; return null; }
function elCrown() { var w = Object.keys(RL.worn || {}); for (var i = 0; i < w.length; i++) {
var R = EL_R[w[i]];
if (R && R.slot === "crown")
return R;
} return null; }
(function () {
if (typeof hasAbility === "function") {
var ha = hasAbility;
hasAbility = function (n) { if (n === "flying" && elMantle() === "fly")
return true; return ha.apply(this, arguments); };
}
if (typeof walkBy === "function") {
var wb = walkBy;
walkBy = function (mx, mz) {
var sp = 1;
Object.keys(RL.worn || {}).forEach(function (k) { if (EL_PACE[k])
sp = EL_PACE[k]; });
if (sp !== 1 && !(typeof riding !== "undefined" && riding)) {
mx *= sp;
mz *= sp;
}
return wb.call(this, mx, mz);
};
}
if (typeof fallEligible === "function") {
var fe = fallEligible;
fallEligible = function () { if (elMantle() === "soft")
return false; return fe.apply(this, arguments); };
}
if (typeof rlEffects === "function") {
var re = rlEffects;
rlEffects = function () { var r = re.apply(this, arguments); try {
elLightSet();
if (typeof canFly !== "undefined" && elMantle() === "fly")
canFly = true;
}
catch (e) { } return r; };
}
})();
function elLightSet() {
var C = elCrown(), want = C ? C.key : "";
if (want === EL.lightKey)
return;
if (EL.light && EL.light.parent)
EL.light.parent.remove(EL.light);
EL.light = null;
EL.lightKey = want;
if (C && typeof scene !== "undefined" && scene) {
EL.light = new THREE.PointLight(EL_BY[C.el].glow, 0.55, 18, 1.4);
scene.add(EL.light);
}
}
function elArmsReady() {
if (typeof BW_ARMS === "undefined" || typeof HELD === "undefined" || typeof ARMS === "undefined")
return false;
Object.keys(EL_ARMS).forEach(function (k) {
var key = "rl" + k, R = RL_BY[k];
if (!R || BW_ARMS[key])
return;
var A = { name: elShort(R), held: "relic_" + k, era: "Relics", relic: k }, S = EL_ARMS[k];
for (var p in S)
A[p] = S[p];
BW_ARMS[key] = A;
var shot = A.kind === "melee" || A.kind === "self" ? null : A.p === "fire" || A.kind === "cone" ? "fire" : A.p === "frost" ? "ice" : A.p === "spark" ? "lightning" : A.p === "arrow" ? "arrow" : "shot";
ARMS["bw_" + key] = { held: A.held, shot: shot, name: A.name.toLowerCase() };
});
return true;
}
function elKeptSync() {
if (!elArmsReady() || typeof bkpKept !== "function")
return;
var K = bkpKept(), changed = false, have = {};
if (!elKeeper())
Object.keys(EL_ARMS).forEach(function (k) { if (typeof rlOwned === "function" && rlOwned(k))
have["bw_rl" + k] = RL_BY[k]; });
for (var i = K.length - 1; i >= 0; i--) {
var q = K[i];
if (/^bw_rl/.test(q.a) && !have[q.a] && !(elKeeper() && q.keeper)) {
K.splice(i, 1);
changed = true;
}
}
Object.keys(have).forEach(function (a) { if (!K.some(function (q) { return q.a === a; })) {
K.push({ id: a + "_k", a: a, name: elShort(have[a]), from: "your relics" });
changed = true;
} });
if (changed)
try {
save();
}
catch (e) { }
}
function elBattleTake(k) { return __ZC(340, 8, this, arguments, new.target); }
(function () {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", function () { elArmsReady(); });
else
setTimeout(elArmsReady, 0);
if (typeof rlTake === "function") {
var rt = rlTake;
rlTake = function (key) { try {
var R = RL_BY[key];
if (R && R.kind === "weapon" && typeof WLD !== "undefined" && WLD.on === "battle" && rlOwned(key) && EL_ARMS[key])
return elBattleTake(key);
}
catch (e) { } return rt.apply(this, arguments); };
}
if (typeof loadThings === "function") {
var lt = loadThings;
loadThings = function () {
var r = lt.apply(this, arguments);
Promise.resolve(r).then(function (rows) { if (Array.isArray(rows) && elSigned())
try {
elKeptSync();
rlEffects();
}
catch (e) { } });
return r;
};
}
if (typeof bwCamp === "function") {
var bc = bwCamp;
bwCamp = function (G) {
var hide = {};
Object.keys(BW_ARMS).forEach(function (k) { if (/^rl/.test(k) && BW_ARMS[k].relic) {
hide[k] = BW_ARMS[k];
delete BW_ARMS[k];
} });
try {
return bc.apply(this, arguments);
}
finally {
Object.keys(hide).forEach(function (k) { BW_ARMS[k] = hide[k]; });
}
};
}
if (typeof bwClass === "function") {
var bk = bwClass;
bwClass = function () {
var c = bk.apply(this, arguments);
try {
var pe = elPlateEl(), mt = elMantle(), held = typeof bwHeldKey === "function" ? bwHeldKey() : null, hk = held && /^rl/.test(held) ? held.slice(2) : null;
var add = (pe ? 0.15 : 0) + (mt === "stone" ? 0.12 : 0), more = hk && pe && elOf(hk) === pe ? 1.25 : 1;
if (!add && more === 1)
return c;
var o = {};
for (var p in c)
o[p] = c[p];
o.armor = Math.min(0.6, (c.armor || 0) + add);
o.dmg = (c.dmg || 1) * more;
return o;
}
catch (e) {
return c;
}
};
}
if (typeof bwTick === "function") {
var bt = bwTick;
bwTick = function (dt) {
var r = bt.apply(this, arguments);
try {
if (WLD.on === "battle" && !BW.downT && BW.hp < BW.max) {
var mt = elMantle();
if (mt === "tide" && BW.quietT > 1.5)
BW.hp = Math.min(BW.max, BW.hp + dt * 8);
else if (mt === "grow")
BW.hp = Math.min(BW.max, BW.hp + dt * 2);
}
}
catch (e) { }
return r;
};
}
})();
function elWhere() { return typeof mmWhere === "function" ? mmWhere() : null; }
function elBase() { return typeof mmBase === "function" ? mmBase() : null; }
function elGround(lx, lz) { return typeof mmGround === "function" ? mmGround(lx, lz) : 0; }
function elBlockL(lx, lz, feet) { return typeof mmBlockL === "function" ? mmBlockL(lx, lz, feet) : false; }
function elL() { var b = elBase() || { x: 0, z: 0 }, P = camera.position; return { x: P.x - b.x, y: P.y, z: P.z - b.z }; }
function elWorldKey() { return (typeof WLD !== "undefined" && WLD.w && WLD.w.g && WLD.w.g.uuid) || ""; }
var EL_SPOTS = {};
var EL_MINY = {};
function elSpot(id, place, seed, need, tol) { return __ZC(340, 9, this, arguments, new.target); }
var EL_RF = 40, EL_RF2 = 48;
function elHallSpot() { return __ZC(340, 10, this, arguments, new.target); }
var EL_PMAT = {};
function elStone(col, kind, rep, o) { return __ZC(340, 11, this, arguments, new.target); }
function elGlowMat(col, op) { return mmMat(col, { glow: 1, op: op === undefined ? 0.85 : op }); }
function elSeg(n) { return elLite() ? Math.max(6, Math.round(n * 0.6)) : n; }
var EL_OPEN = [0, 45, 90, 135, 180, 225, 270, 315];
var EL_ALCOVE = { 45: "fire", 90: "water", 135: "earth", 225: "air", 270: "storm", 315: "life" };
function elHallBuild(G, sol, spots, people) { return __ZC(340, 12, this, arguments, new.target); }
function elFlame(P, E, x, y, z, s) { return __ZC(340, 13, this, arguments, new.target); }
function elAlcove(G, sol, spots, people, deg, E) { return __ZC(340, 14, this, arguments, new.target); }
function elGallery(G, sol, spots) { return __ZC(340, 15, this, arguments, new.target); }
function elShrineBuild(G, E, sol) { return __ZC(340, 16, this, arguments, new.target); }
function elWellMesh(el) { return __ZC(340, 17, this, arguments, new.target); }
function elMarkMesh(k) { return __ZC(340, 18, this, arguments, new.target); }
EL.flows = [];
EL.spin = [];
function elPlaceBuild(place) { return __ZC(340, 19, this, arguments, new.target); }
function elPlaceDrop() { return __ZC(340, 20, this, arguments, new.target); }
function elHideAt(k) {
var r = EL.rows[k], H = EL_HIDE[k];
if (r && r.x != null && r.z != null)
return { x: +r.x, z: +r.z, y: r.y != null ? +r.y : elGround(+r.x, +r.z) };
return elSpot("hide_" + k, H.at, H.seed, 1.6, 1.4);
}
function elMarksSync() { return __ZC(340, 21, this, arguments, new.target); }
function elTick(dt) {
EL.t += dt;
try {
elFxTick(dt);
}
catch (e) { }
if (EL.light) {
var C = camera.position;
EL.light.position.set(C.x, C.y + 1.2, C.z);
}
var place = elWhere();
if (place !== EL.place) {
if (place && elPlaceWanted(place))
elPlaceBuild(place);
else if (EL.place)
elPlaceDrop();
EL.place = place && elPlaceWanted(place) ? place : null;
}
if (!EL.place)
return;
if (EL.t - (EL.rowsAt || -99) > 20)
elLoadHere(EL.place);
if (EL.kgo)
elKeeperGoTick(dt);
EL.flows.forEach(function (t) { t.offset.y = (t.offset.y + dt * 0.4) % 1; });
EL.spin.forEach(function (s) { if (s.ax === "z")
s.o.rotation.z += dt * s.sp;
else
s.o.rotation.z += dt * s.sp; });
var hg = EL.hall ? function (x, z) { return EL.hall.y; } : null;
EL.people.forEach(function (P) { if (P.g && P.wander && typeof wWander === "function") {
wWander(P.g, dt, hg);
var b = elBase();
if (b) {
P.x = P.g.position.x - b.x;
P.z = P.g.position.z - b.z;
}
} });
}
var EL_PLACES = null;
function elPlaceWanted(place) {
if (!EL_PLACES) {
EL_PLACES = {};
EL_PLACES[EL_HALL.at] = 1;
Object.keys(EL_SHRINE).forEach(function (k) { EL_PLACES[EL_SHRINE[k].at] = 1; });
EL_WELLS.forEach(function (w) { EL_PLACES[w[2]] = 1; });
Object.keys(EL_HIDE).forEach(function (k) { EL_PLACES[EL_HIDE[k].at] = 1; });
}
return !!EL_PLACES[place] || (EL.extra || []).indexOf(place) >= 0;
}
function elHere() {
if (!EL.place || typeof walkMode === "undefined" || !walkMode)
return null;
var L = elL(), feet = L.y - 1.72, best = null, bd = 1e9;
function near(x, z, y, r) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d < bd && Math.abs(feet - y) < 3) {
bd = d;
return true;
} return false; }
Object.keys(EL.marks).forEach(function (k) { var M = EL.marks[k]; if (near(M.x, M.z, M.y, k === "galewing" ? 2.2 : 1.8))
best = { html: "🔍 <b>" + elEsc(EL_HIDE[k].what) + "</b> · <b>press E</b> to examine", fn: function () { elExamine(k); } }; });
EL.wells.forEach(function (w) { if (near(w.x, w.z, w.y, 2.4))
best = { html: EL_BY[w.el].icon + " <b>" + elEsc(EL_WELLNAME[w.el]) + "</b> · <b>press E</b> to gather " + elEsc(elMatName(EL_BY[w.el].ess).toLowerCase()), fn: function () { elGather(w); } }; });
EL.shrines.forEach(function (s) { if (near(s.x, s.z, s.y, 4.6))
best = { html: EL_BY[s.el].icon + " <b>" + elEsc(EL_SHRINE[s.el].name) + "</b> · <b>press E</b> to look", fn: function () { elShrineCard(s.el); } }; });
EL.spots.forEach(function (s) { if (near(s.x, s.z, s.y, s.r))
best = { html: "<b>" + elEsc(s.name) + "</b> · <b>press E</b> to " + s.verb, fn: s.fn }; });
EL.people.forEach(function (P) { if (!P.t)
return; if (near(P.x, P.z, P.y, P.master ? 3.4 : 2.8))
best = { html: "<b>" + elEsc(P.t.name) + "</b> · <b>press E</b> to talk", fn: P.master ? elMasterCard : P.smith ? (function (k) { return function () { elSmithCard(k); }; })(P.smith) : function () { wTalk(P.t); } }; });
return best;
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
elTick(dt);
}
catch (e) {
if (window.console && !EL.warned) {
EL.warned = 1;
console.warn("[elemental]", e);
}
} };
}
if (typeof dkHere === "function") {
var dh = dkHere;
dkHere = function (dt) { var b = dh.apply(this, arguments); if (b)
return b; try {
return elHere();
}
catch (e) {
return null;
} };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
try {
if (EL.place && EL.sol && EL.sol.length && !store.inside) {
var b = elBase();
if (b && worldSolidAt(EL.sol, x - b.x, z - b.z, feet))
return true;
}
}
catch (e) { }
return ba.apply(this, arguments);
};
}
if (typeof WORLDS !== "undefined" && WORLDS.surface && WORLDS.surface.ground) {
var sg = WORLDS.surface.ground;
WORLDS.surface.ground = function (x, z) {
var o = sg.apply(this, arguments);
var H = EL.hall;
if (!H || typeof SF === "undefined" || SF.k !== EL_HALL.at)
return o;
var d = Math.hypot(x - H.x, z - H.z);
if (d <= EL_RF)
return H.y;
if (d < EL_RF2) {
var t = (d - EL_RF) / (EL_RF2 - EL_RF);
return H.y + (o - H.y) * t;
}
return o;
};
}
})();
function elMatName(k) { var M = (typeof FG_MB !== "undefined" && FG_MB[k]) || null; if (M)
return M.name; var m = EL_MATS.filter(function (q) { return q[0] === k; })[0]; return m ? m[1] : k; }
function elMatIcon(k) { var M = (typeof FG_MB !== "undefined" && FG_MB[k]) || null; if (M)
return M.icon || ""; var m = EL_MATS.filter(function (q) { return q[0] === k; })[0]; return m ? m[2] : ""; }
function elLoadHere(place) { return __ZC(340, 22, this, arguments, new.target); }
function elState() {
EL.stateAt = EL.t;
if (!elSigned())
return Promise.resolve(null);
return elRpc("elemental_state", {}).then(function (o) { if (o && o.ok !== false) {
EL.state = o;
EL.missing = false;
if (o.places) {
EL_PLACES = null;
EL.extra = o.places;
}
} return EL.state; })
.catch(function (e) { if (elMissing(e))
EL.missing = true; return EL.state; });
}
function elStock() { return __ZC(340, 23, this, arguments, new.target); }
function elHas(k) { return +(EL.stock || {})[k] || 0; }
function elAttuned(el) { return elKeeper() || !!(EL.state && (EL.state.attuned || []).indexOf(el) >= 0); }
function elGifted(el) { return !!(EL.state && (EL.state.gifts || []).indexOf(el) >= 0); }
function elLost(k) { return (EL.state && EL.state.lost && EL.state.lost[k]) || null; }
function elNotOpen() { return "The Six Forges' ledgers aren't open yet (the city has an update to run). Come back soon."; }
function elFail(e) { elSay(elMissing(e) ? elNotOpen() : "Couldn't reach the city."); }
function elAfterGot() { if (typeof loadThings === "function")
try {
loadThings();
}
catch (e) { } setTimeout(function () { try {
elKeptSync();
rlEffects();
}
catch (e) { } }, 1500); }
function elExamine(k) { return __ZC(340, 24, this, arguments, new.target); }
function elFind(k) { return __ZC(340, 25, this, arguments, new.target); }
function elLostCard(k) { return __ZC(340, 26, this, arguments, new.target); }
function elShrineCard(el) { return __ZC(340, 27, this, arguments, new.target); }
function elAttune(el) { return __ZC(340, 28, this, arguments, new.target); }
function elGather(w) { return __ZC(340, 29, this, arguments, new.target); }
function elMasterCard() { return __ZC(340, 30, this, arguments, new.target); }
function elGift(el) { return __ZC(340, 31, this, arguments, new.target); }
function elRiddlesCard() { return __ZC(340, 32, this, arguments, new.target); }
function elSmithCard(el) { return __ZC(340, 33, this, arguments, new.target); }
function elAnvilCard() { return __ZC(340, 34, this, arguments, new.target); }
function elForgeCard(el) { return __ZC(340, 35, this, arguments, new.target); }
function elCraft(k) { return __ZC(340, 36, this, arguments, new.target); }
function elElementCard(el) { return __ZC(340, 37, this, arguments, new.target); }
function elKeeperForgeCard() { return __ZC(340, 38, this, arguments, new.target); }
(function () {
if (typeof rlCard !== "function")
return;
var rc = rlCard;
rlCard = function (key) {
var R = EL_R[key];
if (!R)
return rc.apply(this, arguments);
var own = rlOwned(key), K = elKeeper(), E = EL_BY[R.el], fns = {};
var html = worldFacts(R.name, E.icon + " a relic of " + E.name + (R.slot === "weapon" ? "" : " (" + R.slot + ")"), [], [R.does, own ? "It is yours." : R.how === "craft" ? "Forged at " + E.forge + ", in the Hall of the Six Forges on Mercury." : R.how === "gift" ? "Master Varenne's gift, once you have laid a hand on the " + EL_SHRINE[R.el].name.replace(/^The /, "") + "." : "Lost long ago. Master Varenne knows a riddle."]);
if (own) {
if (R.slot === "weapon") {
html += worldBtn("take", "Take it up", "It goes to your hand");
fns.take = function () { worldCard(null); rlTake(key); };
}
else {
html += worldBtn("wear", RL.worn[key] ? "Take it off" : "Put it on", RL.worn[key] ? "" : "You wear it from now on, wherever you go");
fns.wear = function () { worldCard(null); rlWear(key, !RL.worn[key]); };
}
}
if (K) {
html += worldBtn("forge", "Forge a copy to give", "It goes into your things");
fns.forge = function () { rlForge(key); };
}
worldCard(html, fns);
};
})();
function elInfoCard() { return __ZC(340, 39, this, arguments, new.target); }
function elShowWay() { return __ZC(340, 40, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-elrelics"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-elrelics";
b.title = "Elemental relics: the Hall of the Six Forges, the shrines, and the twelve lost ones";
b.textContent = "🔥 Elemental relics";
b.onclick = function () { elInfoCard(); };
var pk = document.getElementById("me-rare");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (typeof document !== "undefined") {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
}
})();
(function () {
if (typeof FG_STATIONS !== "undefined")
FG_STATIONS.sixforges = { name: "The Hall of the Six Forges", who: "Master Varenne", st: ["forge", "joinery"], sells: ["cr_ore", "cr_coal", "cr_wood", "cr_cloth", "cr_leather", "cr_crystal", "cr_ember"], verb: "Strike" };
if (typeof FG_MATS !== "undefined" && typeof FG_MB !== "undefined")
EL_MATS.forEach(function (m) { if (FG_MB[m[0]])
return; FG_MATS.push([m[0], m[1], m[2], m[3], null, m[4]]); FG_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: null, where: m[4] }; });
})();
if (typeof bkpHtml === "function") {
var elBkpHtml0 = bkpHtml;
bkpHtml = function () { var h = elBkpHtml0.apply(this, arguments); try {
return h + elBkpSection();
}
catch (e) {
return h;
} };
}
if (typeof bkpLoad === "function") {
var elBkpLoad0 = bkpLoad;
bkpLoad = function () { var p = elBkpLoad0.apply(this, arguments); elState().then(function () { if (elKeeper())
return elKeeperList(); }).then(function () { if (typeof bkpPaint === "function")
bkpPaint(); }); return p; };
}
function elBkpSection() { return __ZC(340, 41, this, arguments, new.target); }
function elKeeperList() {
return elRpc("keeper_elemental_list", {}).then(function (o) { EL.klist = (o && o.rows) || null; return EL.klist; }).catch(function () { EL.klist = null; });
}
function elKeeperReset(k) {
if (!elKeeper())
return;
elRpc("keeper_elemental_reset", { p_key: k }).then(function (o) { elSay(elEsc((o && o.say) || "Done.")); EL.rowsAt = -99; EL.stateAt = -99; elKeeperList().then(function () { if (typeof bkpPaint === "function")
bkpPaint(); }); }).catch(elFail);
}
function elKeeperHere(k) { return __ZC(340, 42, this, arguments, new.target); }
function elKeeperGo(k) { return __ZC(340, 43, this, arguments, new.target); }
function elKeeperGoTick(dt) { return __ZC(340, 44, this, arguments, new.target); }
(function () {
var q = null;
try {
q = new URLSearchParams(location.search);
}
catch (e) {
return;
}
var v = q.get("kel");
if (!v)
return;
var kind = v.split(":")[0], k = v.slice(kind.length + 1), tries = 0;
function clean() { try {
q.delete("kel");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { } }
var t = setInterval(function () {
tries++;
if (tries > 240) {
clearInterval(t);
clean();
return;
}
if (typeof walkMode === "undefined" || !walkMode || !elSigned() || !(EL_HIDE[k] || k === "hall"))
return;
if (typeof store === "undefined" || !store || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
if (!elKeeper()) {
if (tries > 60) {
clearInterval(t);
clean();
elSay("That link is for the Keeper.");
}
return;
}
clearInterval(t);
clean();
if (kind === "go")
elKeeperList().then(function () { elKeeperGo(k); });
else if (kind === "move" && EL_HIDE[k]) {
EL.kmove = k;
elSay("<b>Moving " + elEsc(EL_R[k].name) + ".</b> Go where you want it (outdoors), then open the Backpack and press <b>Here</b> beside it.");
elKeeperList();
}
}, 500);
})();
setTimeout(function () { try {
elState();
}
catch (e) { } }, 8000);
