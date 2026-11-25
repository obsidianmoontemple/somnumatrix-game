/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PY = { base: -700000, g: null, on: false, lite: false, t: 0, cars: [], shots: [], fx: [], drops: [], hz: [], slabs: [], ghosts: {}, riv: [],
me: { hp: 100, max: 100, cool: 0, dcool: 0, shield: 0, plate: 0, cloak: 0, phase: 0, mirror: 0, ice: 0, stun: 0, spin: 0, slow: 0, grip: 1, frozen: 0, boost: 0, decoy: null, saw: 0, flame: 0, ram: 0,
vy: 0, y: 0, air: false, airT: 0, lastCp: 0, cpAt: null, wreckT: 0, fallT: 0 },
race: null, owned: null, ownAt: 0, pass: null, passAt: 0, stats: null, net: { since: 0, at: 0, busy: false, sentAt: 0, missing: false }, hud: null, pad: null, mats: {}, tex: {}, geo: {},
zone: "paddock", zoneT: 0, said: {}, finds: {}, missing: false };
var PY_NAME = "Pyreline, the race planet";
var PY_KEY = "Pyreline Motorworks";
var PY_OFF = {
missile: { name: "Seeker missile", icon: "🚀", kind: "missile", dmg: 30, spd: 70, home: 2.4, cool: 5, col: 0xFFB070, say: "A homing missile that hunts the car ahead" },
rockets: { name: "Rocket salvo", icon: "🎆", kind: "missile", dmg: 11, spd: 80, n: 4, spread: 0.06, cool: 4, col: 0xFFC880, say: "Four rockets straight ahead" },
drones: { name: "Buzz drones", icon: "🛸", kind: "missile", dmg: 9, spd: 42, home: 4, n: 3, spread: 0.25, cool: 6, col: 0x9AE0FF, say: "Three little drones that chase and sting" },
cannon: { name: "Shock cannon", icon: "💥", kind: "missile", dmg: 38, spd: 95, cool: 4.5, col: 0xFFE0A0, big: 1, say: "One heavy shell, hard to dodge" },
oil: { name: "Oil slick", icon: "🛢️", kind: "drop", drop: "oil", life: 14, cool: 4, say: "A slick behind you: whoever hits it spins" },
spikes: { name: "Caltrop spread", icon: "📌", kind: "drop", drop: "spikes", dmg: 14, life: 14, cool: 4, say: "Tyre-shredding spikes scattered behind" },
mine: { name: "Proximity mine", icon: "💣", kind: "drop", drop: "mine", dmg: 34, life: 22, cool: 5, say: "A mine that waits behind you" },
gravity: { name: "Gravity well", icon: "🌀", kind: "drop", drop: "well", life: 7, cool: 8, say: "A swirling well that drags cars in and slows them" },
tar: { name: "Tar bomb", icon: "⚫", kind: "lob", drop: "tar", life: 12, cool: 5, say: "Lobbed ahead: a sticky tar pool" },
flame: { name: "Flame jet", icon: "🔥", kind: "cone", dmg: 26, reach: 12, arc: 0.35, dur: 1.6, cool: 5, say: "A stream of fire ahead" },
frost: { name: "Frost beam", icon: "❄️", kind: "beam", dmg: 12, reach: 45, slow: 3, cool: 5, col: 0xBFE8FF, say: "Freezes the car ahead: slow and slippery" },
arc: { name: "Arc lightning", icon: "⚡", kind: "beam", dmg: 16, reach: 32, chain: 3, cool: 6, col: 0xD8E8FF, say: "Jumps from car to car, three at a time" },
harpoon: { name: "Harpoon tether", icon: "🪝", kind: "beam", dmg: 10, reach: 50, yank: 1, cool: 6, col: 0xC8C8C8, say: "Hooks the car ahead and hauls you past" },
magnet: { name: "Magnet pull", icon: "🧲", kind: "beam", dmg: 4, reach: 40, steal: 1, cool: 6, col: 0xFF8AC8, say: "Steals the speed of the car ahead" },
emp: { name: "EMP pulse", icon: "🔌", kind: "aura", reach: 26, stun: 2.5, cool: 9, col: 0x9ACFFF, say: "Shuts down every car near you for a moment" },
shock: { name: "Shockwave slam", icon: "🌊", kind: "aura", dmg: 14, reach: 16, knock: 16, cool: 6, col: 0xFFE8C8, say: "Hurls nearby cars aside" },
saw: { name: "Side saws", icon: "🪚", kind: "aura", dmg: 30, reach: 5, dur: 3, cool: 6, col: 0xE0E0E0, say: "Blades out the sides: sideswipe to shred" },
ram: { name: "Battering ram", icon: "🐏", kind: "ram", dmg: 40, dur: 1.4, cool: 6, say: "A charge forward: what you hit goes flying" }
};
var PY_DEF = {
shield: { name: "Bubble shield", icon: "🫧", dur: 4, cool: 10, say: "Takes every blow for four seconds" },
plate: { name: "Armour plating", icon: "🛡️", dur: 6, cool: 10, say: "Plates slide down: blows do 60% less" },
smoke: { name: "Smoke screen", icon: "🌫️", dur: 5, cool: 9, say: "A cloud behind: missiles lose you, rivals swerve" },
decoy: { name: "Hologram decoy", icon: "👻", dur: 5, cool: 9, say: "A ghost of your car that missiles chase" },
flare: { name: "Chaff flares", icon: "✨", dur: 0.5, cool: 7, say: "Burns every missile near you out of the air" },
nitro: { name: "Nitro dodge", icon: "🏎️", dur: 1.6, cool: 8, say: "A burst of speed and a moment untouchable" },
repair: { name: "Nano repair", icon: "🔧", dur: 0, cool: 12, say: "Mends 40 armour" },
cloak: { name: "Ghost cloak", icon: "🫥", dur: 4, cool: 12, say: "Faded from sight: nothing can lock on" },
mirror: { name: "Mirror field", icon: "🪞", dur: 5, cool: 11, say: "The next shot that hits you flies back" },
jumpjet: { name: "Jump jets", icon: "🦘", dur: 0, cool: 6, say: "Leap over mines, slicks, gaps and wrecks" },
phase: { name: "Phase shift", icon: "🌫", dur: 2.2, cool: 10, say: "Cars, fire and falling rocks pass through you" },
ice: { name: "Frost armour", icon: "🧊", dur: 6, cool: 10, say: "Grip on any road, slicks and spikes do nothing" }
};
var PY_CARS_RAW = [
["emberwasp", "Ember Wasp", "Halden Kessler Works", "wedge", 0xE0A020, 0x1A1A1A, 52, 13, 0.86, 90, "rockets", "nitro", "buy", 13500, "A yellow-and-black stinger: quick off the line, quicker to sting."],
["gravelhound", "Gravelhound", "Dunmore Offroad", "buggy", 0x8A6A3A, 0x2A2A2A, 45, 14, 0.9, 105, "spikes", "plate", "buy", 8500, "Long travel springs and a cage of steel. Loves loose ground."],
["blacktongue", "Blacktongue", "Vesper Cole", "needle", 0x141418, 0xC02020, 60, 15, 0.92, 70, "flame", "smoke", "buy", 29500, "A black dart with a red tongue of fire."],
["bisonrex", "Bison Rex", "Ironcrag Haulage", "monster", 0x6A3A1A, 0xC8A040, 40, 10, 0.74, 165, "ram", "plate", "buy", 21500, "Wheels as tall as a door. It does not go round things."],
["cinderjack", "Cinderjack", "Brannock Motors", "muscle", 0xB02A10, 0x101010, 50, 12, 0.8, 115, "cannon", "shield", "buy", 19000, "A long-nosed brute with a cannon where the bonnet scoop should be."],
["frostline", "Frostline", "Aurelle Coachworks", "wedge", 0xBFE6FF, 0x2A4A6A, 54, 12, 0.88, 85, "frost", "ice", "buy", 24500, "Pale as frost. Freezes rivals and never slips."],
["tarpit", "Tar Pit", "Ironcrag Haulage", "sixer", 0x2A2A24, 0xE0C040, 42, 10, 0.8, 140, "tar", "decoy", "buy", 15500, "Six wheels, a road-roller's heart, a tank of hot tar."],
["voltstinger", "Volt Stinger", "Sparrowhawk Cycles", "trike", 0xF0E040, 0x202020, 51, 14, 0.82, 80, "arc", "nitro", "buy", 23000, "One wheel at the front, lightning at the back."],
["slickjaw", "Slickjaw", "Marlow & Finch", "roadster", 0x205040, 0xE0E0D0, 49, 13, 0.86, 85, "oil", "smoke", "buy", 11000, "A gentleman's open tourer with an ungentlemanly oil tank."],
["rustwraith", "Rust Wraith", "Morrow Brothers", "hearse", 0x5A3A2A, 0x9A2A1A, 46, 11, 0.8, 120, "mine", "decoy", "buy", 14500, "A long rusty hearse that leaves mines like flowers."],
["hornetnine", "Hornet Nine", "Skyreach Dynamics", "hover", 0xE8B020, 0x202024, 55, 13, 0.78, 75, "drones", "shield", "buy", 37500, "Floats on four glowing pads; its drones do the fighting."],
["grimdozer", "Grimdozer", "Dunmore Offroad", "van", 0x5A6A4A, 0x2A2A2A, 41, 9, 0.76, 170, "shock", "repair", "buy", 20500, "An armoured box with a plough. Slow to anger, slower to stop."],
["pinwheel", "Pinwheel", "Tilly Motor Co.", "bubble", 0xFF6AA8, 0xF4F0EC, 47, 15, 0.9, 80, "saw", "jumpjet", "buy", 11500, "A little pink ball of trouble with saws in its skirts."],
["harpytalon", "Harpy Talon", "Aurelle Coachworks", "wedge", 0x6A2A8A, 0xD0C0E0, 56, 13, 0.86, 80, "harpoon", "phase", "buy", 35500, "A violet blade that hooks the leader and hauls past."],
["quickbrass", "Quickbrass", "Marlow & Finch", "roadster", 0xC8A040, 0x3A2A1A, 50, 14, 0.88, 85, "magnet", "flare", "buy", 17500, "Polished brass and walnut, and a magnet in the boot."],
["nightglass", "Nightglass", "Vesper Cole", "muscle", 0x0A0A14, 0x4A8AFF, 53, 13, 0.84, 100, "missile", "cloak", "buy", 46500, "Black glass and blue light. You see it when it has already passed."],
["laurelfang", "Laurel Fang", "Pyreline Race Office", "wedge", 0x2A7A3A, 0xE8C060, 57, 14, 0.9, 95, "missile", "shield", "prize", "win1", "Given to every dreamer who wins their first Death Run."],
["podiumhawk", "Podium Hawk", "Pyreline Race Office", "needle", 0xF0F0F0, 0xC02020, 59, 15, 0.93, 75, "rockets", "flare", "prize", "podium3", "For three finishes on the podium."],
["chequerghost", "Chequer Ghost", "Pyreline Race Office", "bubble", 0x1A1A1A, 0xF0F0F0, 52, 14, 0.9, 90, "emp", "cloak", "prize", "win3", "Black and white squares, for three wins."],
["crownbreaker", "Crownbreaker", "Pyreline Race Office", "monster", 0x4A2A7A, 0xE8C060, 45, 11, 0.78, 165, "ram", "shield", "prize", "win5", "For five wins: a purple giant that breaks crowns."],
["dunescourge", "Dune Scourge", "Pyreline Race Office", "buggy", 0xD89A4A, 0xE05A1A, 50, 15, 0.88, 105, "spikes", "jumpjet", "prize", "win7", "For seven wins: a sand-coloured jumper."],
["rimeking", "Rime King", "Pyreline Race Office", "sixer", 0xA8D8F0, 0x2A4A8A, 47, 12, 0.84, 140, "frost", "plate", "prize", "win10", "For ten wins: six wheels of winter."],
["cindercrown", "Cinder Crown", "Pyreline Race Office", "hover", 0xC02A1A, 0x141414, 58, 14, 0.8, 85, "flame", "mirror", "prize", "win15", "For fifteen wins: fire that throws your shots back."],
["stormcaller", "Stormcaller", "Pyreline Race Office", "trike", 0x5A6470, 0x3AC8C0, 54, 15, 0.85, 85, "arc", "phase", "prize", "win20", "For twenty wins: a three-wheeled thunderhead."],
["mirewyrm", "Mire Wyrm", "Pyreline Race Office", "van", 0x3A5A2A, 0x6A4A2A, 44, 10, 0.8, 160, "tar", "shield", "prize", "win30", "For thirty wins: the swamp on wheels."],
["grandmarshal", "Grand Marshal", "Pyreline Race Office", "muscle", 0xD8B050, 0x141414, 60, 15, 0.9, 120, "cannon", "mirror", "prize", "win50", "For fifty wins. The planet's own champion's car."],
["scrapjack", "Scrapjack", "built by hand", "buggy", 0x8A4A2A, 0x3A3A3A, 46, 13, 0.86, 115, "saw", "plate", "craft", { cr_parts: 8, cr_scrap: 12, cr_rubber: 4 }, "Welded from war scrap: ugly, tough, hungry."],
["boilerboy", "Boiler Boy", "built by hand", "van", 0xB08A3A, 0x3A2A1A, 42, 10, 0.78, 150, "shock", "smoke", "craft", { cr_parts: 10, cr_steel: 8, cr_coal: 12 }, "A steam boiler on wheels that belches smoke."],
["anvilcart", "Anvil Cart", "built by hand", "sixer", 0x5A5C62, 0x2A2A2E, 43, 10, 0.8, 175, "ram", "repair", "craft", { cr_steel: 16, cr_parts: 8, cr_rubber: 6 }, "Six wheels and an anvil for a nose."],
["glassdart", "Glass Dart", "built by hand", "needle", 0x8AC8E8, 0xF0F4F8, 61, 15, 0.92, 65, "missile", "nitro", "craft", { cr_glass: 14, cr_parts: 10, cr_crystal: 2 }, "Clear as ice and nearly as fragile. Very, very fast."],
["emberforge", "Emberforge", "built by hand", "muscle", 0xC84A1A, 0x2A1A14, 51, 12, 0.82, 115, "flame", "plate", "craft", { cr_steel: 12, cr_parts: 8, cr_ember: 3 }, "Emberstone in the engine and fire in the grille."],
["starspanner", "Star Spanner", "built by hand", "hover", 0xC8CCD8, 0x7A4AC8, 57, 14, 0.8, 80, "emp", "mirror", "craft", { cr_parts: 12, cr_crystal: 4, cr_glass: 6 }, "Star crystal pads hold it a hand's breadth off the road."],
["dragonbelly", "Dragonbelly", "built by hand", "monster", 0x3A6A3A, 0xC8A040, 46, 11, 0.78, 180, "rockets", "plate", "craft", { cr_steel: 14, cr_parts: 10, cr_scale: 1 }, "Plated with a dragon's scale. Rockets in the roof rack."],
["tinkertrike", "Tinker Trike", "built by hand", "trike", 0xB87333, 0x2A2A2A, 50, 15, 0.86, 75, "drones", "repair", "craft", { cr_parts: 8, cr_rubber: 4, cr_glass: 4 }, "Copper tubes, clockwork drones, a mender's kit."],
["spokesaw", "Spokesaw", "built by hand", "roadster", 0x7A1A1A, 0xC8C8C8, 52, 13, 0.87, 90, "saw", "smoke", "craft", { cr_steel: 10, cr_parts: 6, cr_rubber: 6 }, "Wire-spoke wheels that sprout blades."],
["forgehammer", "Forge Hammer", "built by hand", "wedge", 0x3A3E44, 0xE07A2A, 54, 12, 0.86, 110, "shock", "shield", "craft", { cr_steel: 14, cr_parts: 10, cr_ember: 2 }, "Dark steel hammered into a wedge."],
["dustcave", "Dustcave Relic", "unknown maker", "bubble", 0xA88A5A, 0x5A3A2A, 49, 14, 0.86, 95, "oil", "jumpjet", "find", "slotcave", "Found deep in the slot cave of Sunscour Canyon, under a century of dust."],
["glaciermoth", "Glacier Moth", "unknown maker", "roadster", 0xD8F0FF, 0x8AB8D8, 53, 13, 0.9, 80, "frost", "cloak", "find", "icearch", "Frozen into the wall behind the icicle arch of Rimeglass Pass."],
["skyfallkestrel", "Skyfall Kestrel", "unknown maker", "wedge", 0x2AE0C8, 0x1A1A2A, 58, 14, 0.86, 80, "rockets", "phase", "find", "fallenspan", "Left on the ledge below the Fallen Span, where only a jump can reach."],
["lavalurker", "Lava Tube Lurker", "unknown maker", "sixer", 0x1A1A1A, 0xFF6A1A, 48, 11, 0.8, 150, "mine", "plate", "find", "lavatube", "Sleeping in the glowing lava tube under Cinderdeep Caldera."],
["fallsphantom", "Falls Phantom", "unknown maker", "hover", 0x2A8A8A, 0xBFF0F0, 55, 13, 0.8, 85, "magnet", "cloak", "find", "waterfall", "Behind the great waterfall of the Mirewild, in the cave."],
["thunderhulk", "Thunderhulk", "unknown maker", "monster", 0x4A4E56, 0xE8D040, 44, 10, 0.76, 170, "arc", "plate", "find", "windfarm", "Among the wind turbines of Stormbreak Bluffs, under a tarpaulin."],
["cratermarauder", "Crater Marauder", "unknown maker", "muscle", 0xA89A6A, 0x4A4A30, 52, 12, 0.84, 120, "cannon", "decoy", "find", "ironfray", "A war car abandoned in the Glass Crater of Ironfray."],
["nightmarerunner", "Nightmare Runner", "unknown maker", "hearse", 0x1A0A24, 0x8A4AE0, 50, 12, 0.84, 115, "gravity", "smoke", "find", "wilds", "Half sunk in the Nightmare Wilds of Somnucor, past the War Gate."],
["bronzecomet", "Bronze Comet", "Pyreline Season Office", "wedge", 0xB0703A, 0x2A1A10, 55, 14, 0.88, 90, "drones", "flare", "season", 300, "300 race points in one season."],
["silverback", "Silverback Brute", "Pyreline Season Office", "monster", 0xB8BCC4, 0x2A2A2E, 47, 11, 0.8, 170, "gravity", "plate", "season", 700, "700 race points in one season."],
["gildedfury", "Gilded Fury", "Pyreline Season Office", "needle", 0xE8C060, 0x141414, 62, 15, 0.93, 75, "harpoon", "nitro", "season", 1200, "1,200 race points in one season."],
["platinumphantom", "Platinum Phantom", "Pyreline Season Office", "hover", 0xD8DCE4, 0x6A7AA8, 60, 15, 0.82, 85, "gravity", "cloak", "season", 2000, "2,000 race points in one season."],
["obsidianoverlord", "Obsidian Overlord", "Pyreline Season Office", "van", 0x141418, 0x8A2AE0, 48, 11, 0.8, 185, "missile", "mirror", "season", 3000, "3,000 race points in one season."],
["infinitydrift", "Infinity Drift", "Pyreline Season Office", "bubble", 0x7AE0F0, 0xE07AE0, 61, 16, 0.94, 90, "magnet", "phase", "season", 4500, "4,500 race points in one season: the rarest car on the planet."],
["detentionhall", "Detention Hall", "Blackboard Coach Lines", "bus", 0xF2B01C, 0x141414, 40, 8, 0.72, 220, "rockets", "plate", "buy", 28500, "A school bus nobody gets off early: steel over the windows, rockets on the roof, a plough of spikes."],
["fieldtrip", "Field Trip", "Blackboard Coach Lines", "bus", 0xE8A41A, 0x3A2A1A, 41, 8, 0.72, 230, "ram", "shield", "buy", 37500, "The last school trip went badly. This one went worse. A battering plough and a bubble of light."],
["lastbell", "Last Bell", "built by hand", "bus", 0x2A2A24, 0xF2B01C, 39, 8, 0.7, 240, "mine", "smoke", "craft", { cr_steel: 20, cr_parts: 14, cr_rubber: 10 }, "A burnt-out school bus rebuilt in black, ringing its bell and sowing mines behind it."],
["brainfreeze", "Brain Freeze", "Sweetbriar Van Co.", "icecream", 0xF4C8DC, 0x7AD8C8, 46, 10, 0.8, 150, "frost", "ice", "buy", 26500, "Strawberry and mint, a giant cone on the roof and a freezer that fires."],
["sundaescorcher", "Sundae Scorcher", "Sweetbriar Van Co.", "icecream", 0xF2F2F2, 0x8A3A1A, 45, 10, 0.8, 145, "flame", "decoy", "buy", 23500, "Vanilla on the outside, hot fudge on the inside: it sprays fire from the serving hatch."],
["sprinklestorm", "Sprinkle Storm", "Pyreline Season Office", "icecream", 0xBFE4FF, 0xFF6AB0, 47, 11, 0.82, 155, "rockets", "flare", "season", 1800, "1,800 race points in one season: a rainbow of rockets from a pastel van."],
["ironcolossus", "Ironclad Colossus", "Gearmaw Foundry", "mech", 0x5A5E66, 0xE8B020, 36, 7, 0.74, 270, "cannon", "plate", "buy", 72000, "A war machine on tracks with two great arms and a cannon. The road is just a suggestion."],
["wrathgear", "Wrathgear", "built by hand", "mech", 0x6A2A1A, 0xFF8A2A, 37, 7, 0.74, 255, "shock", "mirror", "craft", { cr_steel: 30, cr_parts: 24, cr_ember: 4, cr_crystal: 3 }, "Built in the Snarl's foundries: a furnace for a heart and fists that throw out shockwaves."],
["titanravager", "Titan Ravager", "Gearmaw Foundry", "mech", 0x1C1C1C, 0xD83A2A, 38, 8, 0.76, 285, "missile", "shield", "buy", 96000, "The biggest thing on Pyreline: red eyes, seeker missiles in both shoulders, armour like a fortress."],
["scrapocalypse", "Scrapocalypse", "unknown maker", "mech", 0x7A5A3A, 0xC8C0A0, 39, 8, 0.77, 290, "saw", "repair", "find", "snarlpit", "Found asleep in the deepest scrapyard of the Snarl: saws for hands, and it mends itself."]
];
var PY_PACE = 1.5, PY_PUNCH = 1.9;
var PY_CARS = PY_CARS_RAW.map(function (r, i) {
return { i: i, k: r[0], arch: "rc_" + r[0], name: r[1], maker: r[2], style: r[3], col: r[4], trim: r[5], top: Math.round(r[6] * PY_PACE), acc: r[7], grip: r[8], hp: r[9], off: r[10], def: r[11], how: r[12], what: r[13], blurb: r[14] };
});
var PY_BY = {};
PY_CARS.forEach(function (c) { PY_BY[c.k] = c; PY_BY[c.arch] = c; });
function pyCar(k) { return PY_BY[k] || PY_BY[String(k || "").replace(/^rc_/, "")] || null; }
function pyIsCar(arch) { return typeof arch === "string" && arch.indexOf("rc_") === 0 && !!PY_BY[arch]; }
var PY_PRIZE = { win1: { wins: 1, say: "Win a Death Run" }, podium3: { podiums: 3, say: "Finish on the podium three times" }, win3: { wins: 3, say: "Win three Death Runs" },
win5: { wins: 5, say: "Win five Death Runs" }, win7: { wins: 7, say: "Win seven Death Runs" }, win10: { wins: 10, say: "Win ten Death Runs" }, win15: { wins: 15, say: "Win fifteen Death Runs" },
win20: { wins: 20, say: "Win twenty Death Runs" }, win30: { wins: 30, say: "Win thirty Death Runs" }, win50: { wins: 50, say: "Win fifty Death Runs" } };
var PY_HOW = { buy: "Bought at Pyreline Motorworks", prize: "Won on the Grand Loop", craft: "Built from materials", find: "A lost car, hidden somewhere", season: "A season reward" };
var PY_MATS = { cr_parts: "Machine parts", cr_scrap: "War scrap", cr_rubber: "Rubber", cr_steel: "Steel ingot", cr_coal: "Coal", cr_glass: "Glass", cr_crystal: "Star crystal", cr_ember: "Emberstone", cr_scale: "Dragon scale" };
var PY_ZONES = {
paddock: { name: "Redline Paddock", road: "asphalt", grip: 1, tint: 0x8A8A8E, ground: 0x6A6258, tex: "concrete",
sky: [0x3A5A8A, 0xE8B888], fog: 0xD8A888, fogD: 0.0011, sun: 1.0, sunCol: 0xFFE0B0 },
canyon: { name: "Sunscour Canyon", road: "dusty asphalt", grip: 0.82, tint: 0xB89068, ground: 0xC88A52, tex: "sand",
sky: [0x4A7AB8, 0xF0C890], fog: 0xE8B880, fogD: 0.0013, sun: 1.1, sunCol: 0xFFE8C0 },
tundra: { name: "Rimeglass Pass", road: "packed snow", grip: 0.6, tint: 0xA8B4C0, ground: 0xB0BAC6, tex: "snow",
sky: [0x5A7898, 0xA8B8C8], fog: 0x98A8B8, fogD: 0.0018, sun: 0.62, sunCol: 0xD8E0F0 },
ice: { name: "the frozen lake", road: "clear ice", grip: 0.36, tint: 0x88B8D0, ground: 0x5A7A8A, tex: "snow",
sky: [0x5A7898, 0xA8B8C8], fog: 0x98A8B8, fogD: 0.002, sun: 0.8, sunCol: 0xE8F0FF },
sky: { name: "the Neon Skyway", road: "night asphalt", grip: 0.95, tint: 0x3A3A48, ground: 0x1A1A28, tex: "asphalt",
sky: [0x0A0A24, 0x3A1A5A], fog: 0x2A1A4A, fogD: 0.0016, sun: 0.35, sunCol: 0xB8A8FF },
lava: { name: "Cinderdeep Caldera", road: "black basalt", grip: 0.88, tint: 0x2A2420, ground: 0x2A2220, tex: "stone",
sky: [0x2A1A1A, 0x8A3A1A], fog: 0x6A2A18, fogD: 0.0022, sun: 0.6, sunCol: 0xFFA070 },
jungle: { name: "the Mirewild", road: "wet mud", grip: 0.66, tint: 0x5A4A30, ground: 0x3A5A2A, tex: "earth",
sky: [0x4A6A5A, 0xA8C8A0], fog: 0x8AA888, fogD: 0.0028, sun: 0.7, sunCol: 0xE8FFD8 },
storm: { name: "Stormbreak Bluffs", road: "rain-soaked asphalt", grip: 0.78, tint: 0x4A4E56, ground: 0x4A6A44, tex: "grass",
sky: [0x2A3038, 0x6A7480], fog: 0x5A646E, fogD: 0.0024, sun: 0.5, sunCol: 0xC8D0DC },
dunes: { name: "the Glasswind Dunes", road: "wind-blown sand", grip: 0.7, tint: 0xC8965A, ground: 0xD8A062, tex: "sand",
sky: [0x4A86C8, 0xF8D8A0], fog: 0xF0C890, fogD: 0.0019, sun: 1.15, sunCol: 0xFFE8B8 },
cave: { name: "the Gloamdeep", road: "wet slate", grip: 0.8, tint: 0x3A3448, ground: 0x2E2840, tex: "stone",
sky: [0x06040E, 0x2A1A4A], fog: 0x1E1636, fogD: 0.0034, sun: 0.3, sunCol: 0xA89AFF },
coast: { name: "Tidebreak Causeway", road: "salt-wet cobbles", grip: 0.72, tint: 0x7A7A70, ground: 0x6E7A5E, tex: "grass",
sky: [0x3A6A9A, 0xC8DCE8], fog: 0xA8C0D0, fogD: 0.0021, sun: 0.85, sunCol: 0xF0F4FF }
};
var PY_LINE = [
[0, 150, 0, 20, "paddock", ""], [0, 20, 0, 20, "paddock", ""], [0, -120, 0, 20, "paddock", ""], [0, -250, 0.5, 18, "paddock", ""],
[-40, -380, 2, 16, "canyon", "w"], [-150, -500, 4, 15, "canyon", "w"], [-300, -570, 6, 14, "canyon", "w"], [-460, -610, 9, 14, "canyon", "w"],
[-610, -690, 13, 14, "canyon", "w"], [-720, -800, 18, 14, "canyon", "r"], [-760, -845, 22, 14, "canyon", "r"],
[-790, -880, 25, 14, "canyon", "g"], [-842, -940, 15, 14, "canyon", ""],
[-875, -990, 15, 15, "tundra", ""], [-930, -1060, 13, 15, "tundra", ""], [-1000, -1180, 10, 16, "tundra", ""],
[-1030, -1300, 6.5, 22, "ice", "c"], [-990, -1420, 6.5, 22, "ice", "c"], [-880, -1510, 6.5, 22, "ice", "c"],
[-720, -1560, 8, 15, "tundra", ""], [-560, -1540, 12, 14, "tundra", ""], [-430, -1480, 17, 14, "tundra", ""],
[-300, -1420, 26, 13, "sky", "e"], [-160, -1400, 36, 13, "sky", "e"], [-30, -1405, 42, 13, "sky", "er"],
[40, -1410, 44, 13, "sky", "eg"], [100, -1415, 40, 13, "sky", "e"], [160, -1420, 39, 13, "sky", "e"],
[280, -1415, 38, 13, "sky", "ec"], [400, -1390, 37, 13, "sky", "ec"], [520, -1320, 34, 13, "sky", "e"],
[640, -1200, 27, 13, "sky", "e"], [730, -1060, 19, 13, "sky", "e"],
[800, -900, 10, 14, "lava", ""], [870, -760, 7, 14, "lava", "c"], [900, -620, 7, 14, "lava", "c"], [880, -470, 7, 14, "lava", ""], [790, -320, 8, 14, "lava", ""],
[800, -160, 5, 13, "jungle", ""], [880, 0, 3, 13, "jungle", ""], [960, 140, 2, 13, "jungle", ""], [940, 320, 2, 13, "jungle", ""], [820, 470, 3, 13, "jungle", ""],
[640, 580, 7, 15, "storm", ""], [440, 660, 12, 15, "storm", ""], [250, 690, 15, 15, "storm", "r"], [150, 680, 11, 15, "storm", ""],
[40, 600, 7, 15, "storm", ""], [-30, 460, 3, 17, "storm", ""], [-150, 500, 4, 17, "storm", ""],
[-300, 560, 5, 16, "dunes", ""], [-450, 600, 9, 16, "dunes", "r"], [-510, 615, 13, 16, "dunes", "g"], [-590, 640, 6, 16, "dunes", ""],
[-700, 700, 5, 16, "dunes", ""], [-800, 790, 7, 15, "dunes", ""], [-880, 880, 9, 15, "dunes", ""],
[-960, 950, 8, 14, "cave", ""], [-1050, 1000, 6, 14, "cave", "t"], [-1140, 1000, 5, 14, "cave", "e"], [-1210, 960, 6, 14, "cave", "e"],
[-1250, 910, 7, 14, "cave", "er"], [-1275, 870, 9, 14, "cave", "eg"], [-1300, 800, 4, 14, "cave", "e"], [-1310, 730, 3, 14, "cave", "t"],
[-1300, 640, 3, 14, "cave", ""],
[-1280, 520, 3, 15, "coast", ""], [-1300, 400, 4, 15, "coast", ""], [-1270, 280, 3, 15, "coast", "c"], [-1200, 170, 3, 15, "coast", "c"],
[-1080, 100, 4, 15, "coast", ""], [-920, 90, 5, 15, "coast", ""], [-760, 140, 4, 15, "coast", ""], [-600, 210, 3, 16, "coast", ""],
[-430, 260, 2, 17, "coast", ""], [-250, 290, 1, 18, "coast", ""], [-100, 300, 0.5, 19, "paddock", ""], [-20, 240, 0, 20, "paddock", ""]
];
var PY_CUTS = [
{ k: "slotcave", name: "the slot cave", zone: "canyon", tunnel: 1, from: 5, to: 9, pts: [[-150, -500, 4, 8], [-210, -560, 4.5, 7], [-330, -640, 6, 7], [-470, -690, 9, 7], [-600, -730, 13, 8], [-720, -800, 18, 10]],
hint: "A rockfall leans against the canyon's west wall just past the first bend. Behind it, a crack in the rock." },
{ k: "lavatube", name: "the lava tube", zone: "lava", tunnel: 1, from: 33, to: 36, pts: [[800, -900, 10, 9], [830, -780, 8, 8], [835, -640, 7, 8], [860, -520, 7, 8], [880, -470, 7, 10]],
hint: "Where the road first meets the lava, a black mouth opens in the rock on the left." },
{ k: "waterfall", name: "the cave behind the falls", zone: "jungle", tunnel: 1, from: 40, to: 42, pts: [[960, 140, 2, 9], [900, 240, 2.5, 8], [860, 350, 3, 8], [820, 470, 3, 10]],
hint: "The great waterfall hides more than rock. Drive straight at it." },
{ k: "cliffjump", name: "the bluff jump", zone: "storm", tunnel: 0, from: 45, to: 48, pts: [[250, 690, 15, 12], [200, 640, 17, 10], [160, 600, 19.5, 10], [120, 560, 22, 9], [90, 530, 24, 0], [30, 480, 3, 14], [-30, 460, 3, 17]],
hint: "At the top of the bluffs the fence is broken. Take it fast: the river is a long way down." },
{ k: "rimecol", name: "the Rime Col", zone: "tundra", tunnel: 0, from: 14, to: 19, pts: [[-930, -1060, 13, 9], [-860, -1180, 20, 8], [-815, -1300, 27, 8], [-775, -1420, 24, 8], [-720, -1560, 8, 10]],
hint: "Before the frozen lake, a goat track leaves the road on the left and climbs the ridge. Narrow, no rails, and it misses the cracking ice." },
{ k: "sandbore", name: "the buried aqueduct", zone: "dunes", tunnel: 1, from: 50, to: 54, pts: [[-300, 560, 5, 9], [-390, 515, 5, 8], [-520, 540, 5, 8], [-640, 630, 5, 8], [-700, 700, 5, 10]],
hint: "Half a stone arch sticks out of the first big dune, on the left. The old aqueduct still runs under the sand, below the dune jump." },
{ k: "crystalvein", name: "the crystal vein", zone: "cave", tunnel: 1, from: 57, to: 65, pts: [[-960, 950, 8, 9], [-1000, 1070, 8, 8], [-1120, 1125, 7, 8], [-1260, 1095, 6, 8], [-1375, 985, 5, 8], [-1405, 845, 4, 8], [-1375, 715, 3.5, 8], [-1300, 640, 3, 10]],
hint: "In the gorge before the Gloamdeep's tunnel, a seam of blue crystal glows in the right-hand wall. It runs all the way round the Hollow: no broken bridge to jump." },
{ k: "seacave", name: "the smugglers' cave", zone: "coast", tunnel: 1, from: 67, to: 71, pts: [[-1300, 400, 4, 9], [-1205, 330, 3.5, 8], [-1105, 240, 3, 8], [-1005, 150, 3.5, 8], [-920, 90, 5, 10]],
hint: "Where the causeway bends south, a lantern hangs at a crack in the headland. The smugglers' cave cuts under it and misses the stones that give way." }
];
var PY_SAFE_WAYS = { sandbore: 1, crystalvein: 1 };
var PY_FINDS = {
slotcave: { car: "dustcave", x: -400, z: -670, where: "in the slot cave" },
icearch: { car: "glaciermoth", x: -650, z: -1585, where: "behind the icicle arch" },
fallenspan: { car: "skyfallkestrel", x: 330, z: -1360, y: 22, where: "on the ledge below the Fallen Span" },
lavatube: { car: "lavalurker", x: 838, z: -700, where: "in the lava tube" },
waterfall: { car: "fallsphantom", x: 880, z: 300, where: "behind the waterfall" },
windfarm: { car: "thunderhulk", x: 420, z: 760, where: "among the wind turbines" },
ironfray: { car: "cratermarauder", world: "battle", where: "in the Glass Crater of Ironfray" },
wilds: { car: "nightmarerunner", world: "city", where: "in the Nightmare Wilds, past the War Gate" },
snarlpit: { car: "scrapocalypse", x: 320, z: -1010, where: "asleep in the deepest scrapyard of the Snarl" }
};
function pySeason() { var d = new Date(); return d.getUTCFullYear() * 100 + d.getUTCMonth() + 1; }
function pySeasonName() { var d = new Date(); return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getUTCMonth()] + " " + d.getUTCFullYear(); }
var PY_EVENTS = {
death: { name: "Death Run", laps: 2, rivals: 7, arms: true, say: "Two laps of the whole planet against seven armed rivals. A wrecked car is out: first across the line, or the last car still running, wins.", gold: true, last: true },
speed: { name: "Pure Speed", laps: 1, rivals: 7, arms: false, say: "One lap, no weapons: the road itself is trying to kill you. Wreck and you are out.", last: true },
trial: { name: "Time Trial", laps: 1, rivals: 0, arms: false, say: "You against the clock, every short cut open." },
elim: { name: "Eliminator", laps: 2, rivals: 7, arms: true, elim: 40, say: "Two laps against seven armed rivals. Every 40 seconds the car in last place is knocked out. Be the last car left, or first across the line.", last: true },
sp_frost: { name: "Frostbite Sprint", sprint: { from: 3, to: 21 }, rivals: 5, arms: true, say: "Sunscour Canyon, Rimeglass Pass and the frozen lake, against five armed rivals. Finish at the Skyway's on-ramp.", last: true },
sp_neon: { name: "Neon Dash", sprint: { from: 21, to: 33 }, rivals: 5, arms: false, say: "The whole Neon Skyway: jumps, a cracked stretch, nothing below. No weapons, just nerve.", last: true },
sp_inferno: { name: "Inferno Run", sprint: { from: 33, to: 43 }, rivals: 5, arms: true, say: "Cinderdeep Caldera and the Mirewild, with geysers of lava and five armed rivals.", last: true },
sp_deep: { name: "Gloamdeep Plunge", sprint: { from: 49, to: 66 }, rivals: 5, arms: true, say: "Across the Glasswind Dunes, then down into the Gloamdeep and over the broken bridge of the Hollow.", last: true },
sp_tide: { name: "Tidebreak Dash", sprint: { from: 65, to: null }, rivals: 5, arms: false, say: "Out of the Gloamdeep and along the sea to the paddock's line, with the waves breaking over the road. No weapons.", last: true }
};
var PY_POW = {
overdrive: { name: "Overdrive", icon: "⚡", col: 0xFFD23A, say: "Three seconds of full boost" },
hop: { name: "Grav-hop", icon: "🦘", col: 0x7AFF9A, say: "A great leap: over gaps, wrecks, slicks and waves" },
tremor: { name: "Tremor", icon: "🌋", col: 0xFF8A3A, say: "A quake round your car throws every car near you aside" },
swarm: { name: "Hornet swarm", icon: "🐝", col: 0xFFB83A, say: "Six homing micro-missiles" },
aegis: { name: "Aegis", icon: "🛡", col: 0x8AD8FF, say: "Five seconds untouchable" },
patch: { name: "Patch kit", icon: "🔧", col: 0x9AE8A0, say: "Mends 50 armour at once" },
ghost: { name: "Ghost run", icon: "👻", col: 0xC8B0FF, say: "Three seconds: cars, fire and falling rock pass through you" },
blackice: { name: "Black ice", icon: "🧊", col: 0x9ACFFF, say: "A sheet of black ice behind you: whoever follows spins" },
timewarp: { name: "Time warp", icon: "⏳", col: 0xE07AFF, say: "Every other car within 60 m slows for three seconds" }
};
var PY_POW_KEYS = Object.keys(PY_POW);
var PY_SKILLS = [
["Drift boost", "Hold the slide (Space, the Slide button, or the right stick up) through a bend at speed: sparks build, blue then gold. Let go for a burst."],
["Slipstream", "Tuck in close behind another car for a moment: the air pulls you and you get a burst of speed."],
["Clean landing", "Land a big jump without a hard bump and the crew's tuning gives you a burst."],
["Power cells", "Drive through a glowing cell to carry its power; use it when you choose. One at a time."]
];
"use strict";
var PY_STYLE = {
wedge: { L: 4.6, W: 2.0, clr: 0.16, top: [[0, 0.62], [0.08, 0.78], [0.2, 0.86], [0.55, 0.74], [0.8, 0.58], [1, 0.4]], plan: [[0, 0.86], [0.15, 0.98], [0.6, 1], [0.9, 0.86], [1, 0.62]],
cab: { a: 0.32, b: 0.66, h: 0.36, w: 0.66, lean: 0.6 }, wheels: [[0.18, 0.36, 0.24], [0.78, 0.34, 0.22]], spoiler: 1 },
muscle: { L: 5.0, W: 2.05, clr: 0.2, top: [[0, 0.86], [0.1, 0.92], [0.3, 0.94], [0.62, 0.9], [0.85, 0.84], [1, 0.72]], plan: [[0, 0.9], [0.1, 0.98], [0.6, 1], [0.92, 0.94], [1, 0.82]],
cab: { a: 0.28, b: 0.58, h: 0.42, w: 0.7, lean: 0.45 }, wheels: [[0.18, 0.4, 0.28], [0.78, 0.38, 0.26]], scoop: 1 },
buggy: { L: 3.8, W: 2.1, clr: 0.42, top: [[0, 0.9], [0.15, 1.0], [0.5, 0.92], [0.8, 0.82], [1, 0.66]], plan: [[0, 0.6], [0.2, 0.7], [0.6, 0.66], [0.9, 0.56], [1, 0.4]],
open: 1, cage: 1, wheels: [[0.16, 0.5, 0.3], [0.82, 0.48, 0.28]], wide: 1.12 },
monster: { L: 4.8, W: 2.4, clr: 1.1, top: [[0, 1.9], [0.12, 2.1], [0.4, 2.15], [0.7, 2.0], [1, 1.75]], plan: [[0, 0.86], [0.2, 0.96], [0.7, 0.98], [1, 0.82]],
cab: { a: 0.3, b: 0.62, h: 0.62, w: 0.72, lean: 0.3 }, wheels: [[0.18, 0.85, 0.5], [0.82, 0.85, 0.5]], wide: 1.16 },
hover: { L: 4.4, W: 2.1, clr: 0.55, top: [[0, 1.02], [0.15, 1.14], [0.45, 1.2], [0.78, 1.04], [1, 0.78]], plan: [[0, 0.72], [0.15, 0.95], [0.55, 1], [0.88, 0.8], [1, 0.46]],
cab: { a: 0.38, b: 0.72, h: 0.42, w: 0.64, lean: 0.7 }, pads: 1 },
needle: { L: 4.8, W: 1.2, clr: 0.12, top: [[0, 0.62], [0.15, 0.66], [0.42, 0.7], [0.7, 0.5], [1, 0.3]], plan: [[0, 0.5], [0.2, 0.7], [0.5, 0.76], [0.8, 0.42], [1, 0.22]],
open: 1, halo: 1, wheels: [[0.12, 0.34, 0.36], [0.8, 0.32, 0.3]], wide: 1.75, spoiler: 2 },
hearse: { L: 5.8, W: 2.0, clr: 0.22, top: [[0, 0.9], [0.1, 0.96], [0.5, 0.96], [0.8, 0.92], [1, 0.72]], plan: [[0, 0.92], [0.1, 1], [0.85, 0.98], [1, 0.84]],
cab: { a: 0.08, b: 0.66, h: 0.58, w: 0.82, lean: 0.25 }, wheels: [[0.15, 0.4, 0.28], [0.8, 0.38, 0.26]] },
sixer: { L: 5.6, W: 2.25, clr: 0.36, top: [[0, 1.12], [0.12, 1.22], [0.5, 1.22], [0.82, 1.12], [1, 0.92]], plan: [[0, 0.94], [0.1, 1], [0.85, 1], [1, 0.86]],
cab: { a: 0.52, b: 0.78, h: 0.5, w: 0.8, lean: 0.35 }, wheels: [[0.13, 0.46, 0.36], [0.36, 0.46, 0.36], [0.82, 0.46, 0.34]], wide: 1.06 },
roadster: { L: 4.3, W: 1.9, clr: 0.16, top: [[0, 0.72], [0.15, 0.8], [0.42, 0.74], [0.62, 0.7], [0.85, 0.66], [1, 0.52]], plan: [[0, 0.86], [0.12, 0.98], [0.55, 0.92], [0.88, 0.9], [1, 0.7]],
open: 1, screen: 1, wheels: [[0.16, 0.36, 0.24], [0.8, 0.34, 0.22]] },
bubble: { L: 3.4, W: 2.0, clr: 0.3, top: [[0, 0.92], [0.15, 1.3], [0.5, 1.46], [0.82, 1.24], [1, 0.82]], plan: [[0, 0.76], [0.2, 0.97], [0.55, 1], [0.85, 0.94], [1, 0.68]],
cab: { a: 0.25, b: 0.72, h: 0.3, w: 0.8, lean: 0.8 }, wheels: [[0.2, 0.38, 0.28], [0.8, 0.38, 0.28]], round: 1 },
van: { L: 5.2, W: 2.3, clr: 0.36, top: [[0, 1.9], [0.08, 2.0], [0.7, 2.0], [0.86, 1.7], [1, 1.25]], plan: [[0, 0.96], [0.08, 1], [0.9, 1], [1, 0.92]],
cab: { a: 0.7, b: 0.86, h: 0.0, w: 0.92, lean: 0.1, inset: 1 }, wheels: [[0.17, 0.46, 0.32], [0.8, 0.46, 0.32]], plough: 1 },
bus: { L: 9.4, W: 2.55, clr: 0.5, top: [[0, 2.85], [0.03, 2.95], [0.84, 2.95], [0.9, 2.45], [0.95, 1.85], [1, 1.55]], plan: [[0, 0.96], [0.03, 1], [0.96, 1], [1, 0.93]],
cab: { a: 0.8, b: 0.9, h: 0.0, w: 0.94, lean: 0.1, inset: 1 }, wheels: [[0.17, 0.56, 0.4], [0.29, 0.56, 0.4], [0.83, 0.56, 0.4]], wide: 1.02 },
icecream: { L: 6.4, W: 2.35, clr: 0.38, top: [[0, 2.55], [0.04, 2.65], [0.66, 2.65], [0.71, 2.2], [0.86, 2.0], [0.94, 1.5], [1, 1.15]], plan: [[0, 0.96], [0.04, 1], [0.9, 1], [1, 0.9]],
cab: { a: 0.71, b: 0.86, h: 0.0, w: 0.92, lean: 0.1, inset: 1 }, wheels: [[0.18, 0.48, 0.36], [0.8, 0.48, 0.34]] },
mech: { L: 8.6, W: 3.9, clr: 1.9, top: [[0, 3.4], [0.1, 3.9], [0.45, 4.2], [0.75, 3.9], [0.92, 3.4], [1, 2.9]], plan: [[0, 0.82], [0.15, 0.96], [0.6, 1], [0.9, 0.86], [1, 0.62]],
cab: { a: 0.56, b: 0.8, h: 0.7, w: 0.5, lean: 0.5 }, wheels: [[0.13, 1.2, 0.66], [0.38, 1.2, 0.66], [0.62, 1.2, 0.66], [0.87, 1.2, 0.66]], wide: 1.1 },
trike: { L: 4.2, W: 2.0, clr: 0.2, top: [[0, 0.86], [0.2, 0.92], [0.45, 0.74], [0.75, 0.6], [1, 0.4]], plan: [[0, 0.92], [0.25, 0.96], [0.55, 0.56], [0.85, 0.34], [1, 0.2]],
open: 1, screen: 1, wheels: [[0.16, 0.4, 0.3], [0.86, 0.36, 0.24, 1]], wide: 1.1 }
};
function pyEnv() { return __ZC(339, 0, this, arguments, new.target); }
function pyFree(o) { return __ZC(339, 1, this, arguments, new.target); }
function pyGone(o) { if (!o)
return; scene.remove(o); pyFree(o); }
function pyMat(kind, col, o) { return __ZC(339, 2, this, arguments, new.target); }
function pyVivid(n, trim) {
var c = new THREE.Color(n), h = {};
c.getHSL(h);
if (h.s > 0.12) {
h.s = Math.max(h.s, trim ? 0.7 : 0.82);
h.l = Math.min(Math.max(h.l, 0.3), trim ? 0.6 : 0.52);
c.setHSL(h.h, h.s, h.l);
}
return "#" + c.getHexString();
}
function pyLivery(car) { return __ZC(339, 3, this, arguments, new.target); }
function pyLerpProf(prof, u) {
for (var i = 1; i < prof.length; i++) {
if (u <= prof[i][0]) {
var a = prof[i - 1], b = prof[i], t = (u - a[0]) / Math.max(1e-6, b[0] - a[0]);
t = t * t * (3 - 2 * t);
return a[1] + (b[1] - a[1]) * t;
}
}
return prof[prof.length - 1][1];
}
function pyLoft(N, M, fn, capEnds) { return __ZC(339, 4, this, arguments, new.target); }
function pyWheel(r, w, col, lite, mono) { return __ZC(339, 5, this, arguments, new.target); }
function pyDriver(col, lite) { return __ZC(339, 6, this, arguments, new.target); }
var PY_FINISH = ["metallic", "pearl", "candy", "flake", "metallic", "satin", "pearl", "candy", "chrome"];
var PY_NEON = [0x2AE8FF, 0xFF3AD8, 0x7AFF3A, 0xFF8A2A, 0xA85AFF, 0x5AB8FF, 0xFF3A4A, 0xFFD23A, 0x3AFFC0, 0xFF6AA8];
function pyFinishOf(car) { return car.finish || PY_FINISH[car.i % PY_FINISH.length]; }
function pyNeonOf(car) { return car.neon !== undefined ? car.neon : PY_NEON[(car.i * 7 + 3) % PY_NEON.length]; }
function pyPaint(car, map) { return __ZC(339, 7, this, arguments, new.target); }
function pyGlowTex() { return __ZC(339, 8, this, arguments, new.target); }
function pyNeonKit(g, car, D) { return __ZC(339, 9, this, arguments, new.target); }
function pyBuildCar(car, opt) { return __ZC(339, 10, this, arguments, new.target); }
function pyFitArms(g, car, D) { return __ZC(339, 11, this, arguments, new.target); }
"use strict";
var PYT = { S: [], L: 0, grid: {}, cell: 32, coarse: null, cuts: [], cps: [], slabs: [], bounds: { x0: -1500, x1: 1500, z0: -2000, z1: 1200 } };
function pyTrackMake() { return __ZC(339, 12, this, arguments, new.target); }
function pyMainDistAt(k) {
var S = PYT.S;
for (var i = 0; i < S.length; i++)
if (S[i].k === k)
return S[i].d;
return 0;
}
function pyNear(x, z, feet) { return __ZC(339, 13, this, arguments, new.target); }
function pyDeck(x, z, feet) { return __ZC(339, 14, this, arguments, new.target); }
function pyNearGround(x, z) { return __ZC(339, 15, this, arguments, new.target); }
function pyZoneAt(x, z) { return __ZC(339, 16, this, arguments, new.target); }
function pyCoarse(x, z) {
var C = PYT.coarse, B = PYT.bounds;
var ix = Math.max(0, Math.min(C.nx - 1, Math.floor((x - B.x0) / C.cs))), iz = Math.max(0, Math.min(C.nz - 1, Math.floor((z - B.z0) / C.cs)));
return { s: PYT.S[C.i[ix * C.nz + iz]], d: C.d[ix * C.nz + iz] };
}
var PY_WATER = 4.4, PY_LAVA = 1.2, PY_ABYSS = -60, PY_SEA = 1.0;
var PY_SEAR = { x0: -1500, x1: -380, z0: -250, z1: 640 };
function pySeaK(x, z) { var R = PY_SEAR; if (x < R.x0 || x > R.x1 || z < R.z0 || z > R.z1)
return 0; return Math.min(1, Math.min(R.x1 - x, z - R.z0, R.z1 - z) / 80); }
function pySeaFloor(x, z, m) { var k = pySeaK(x, z); return 1.7 + m * 1.2 + (-6.5 - 1.7) * k; }
function pyNoise(x, z, s) { return typeof wFbm === "function" ? wFbm(x, z, s, 4) : (Math.sin(x * 1.3 + s) * Math.cos(z * 1.1 - s) * 0.5 + 0.5); }
function pyNatural(x, z, zone) { return __ZC(339, 17, this, arguments, new.target); }
var PY_FLAT = { x0: -70, x1: 150, z0: -60, z1: 250, blend: 24 };
function pyFlatK(x, z) { var F = PY_FLAT, dx = Math.max(F.x0 - x, 0, x - F.x1), dz = Math.max(F.z0 - z, 0, z - F.z1), d = Math.hypot(dx, dz); if (d >= F.blend)
return 0; var t = 1 - d / F.blend; return t * t * (3 - 2 * t); }
function pyTerrain(x, z) {
var fk = pyFlatK(x, z);
if (fk >= 1)
return -0.05;
var h0 = pyUnderDeck(x, z, pyTerrain0(x, z));
return fk > 0 ? h0 + (-0.05 - h0) * fk : h0;
}
function pyUnderDeck(x, z, h) { return __ZC(339, 18, this, arguments, new.target); }
function pyTerrain0(x, z) { return __ZC(339, 19, this, arguments, new.target); }
function pyPitAt(x, z, y) { return __ZC(339, 20, this, arguments, new.target); }
var PY_PADS = [];
function pyPadAt(x, z, feet) {
for (var i = 0; i < PY_PADS.length; i++) {
var p = PY_PADS[i];
if (feet !== undefined && feet !== null && feet < p.y - 2.5)
continue;
if (p.r !== undefined) {
if ((x - p.x) * (x - p.x) + (z - p.z) * (z - p.z) < p.r * p.r)
return p;
}
else if (Math.abs(x - p.x) < p.hw && Math.abs(z - p.z) < p.hd)
return p;
}
return null;
}
function pyGround(x, z, feet) { return __ZC(339, 21, this, arguments, new.target); }
function pyIsTun(s) {
if (!s)
return false;
if (s.fl.indexOf("t") >= 0)
return true;
var L = s.main ? PYT.S : PYT.cuts, i = s.main ? s.i : s.i - PYT.S.length, nb = [L[i - 1], L[i + 1]];
return nb.some(function (q) { return q && q.cut === s.cut && q.fl.indexOf("t") >= 0; });
}
function pyTunnelBlock(x, z, feet) { return __ZC(339, 22, this, arguments, new.target); }
function pyRailBlock(x, z, feet) { return __ZC(339, 23, this, arguments, new.target); }
"use strict";
function pyTex(kind, rx, ry) { return __ZC(339, 24, this, arguments, new.target); }
function pyRibbon(list, a, b, left, right, yOff, mat, vTile, wrapTo) { return __ZC(339, 25, this, arguments, new.target); }
function pyCurtain(list, a, b, across, y0, y1, mat, keep) { return __ZC(339, 26, this, arguments, new.target); }
function pyBuildLand(G) { return __ZC(339, 27, this, arguments, new.target); }
function pyRoadMat(zone) { return __ZC(339, 28, this, arguments, new.target); }
function pyBuildRoad(G) { return __ZC(339, 29, this, arguments, new.target); }
function pyCrackTex() { return __ZC(339, 30, this, arguments, new.target); }
function pyBuildCuts(G) { return __ZC(339, 31, this, arguments, new.target); }
function pyBuildLiquids(G) { return __ZC(339, 32, this, arguments, new.target); }
function pyInstances(G, geo, mat, n, place) { return __ZC(339, 33, this, arguments, new.target); }
function pyClear(x, z, r) { var n = pyNear(x, z); return !n || n.ad > n.w / 2 + (r || 6); }
function pySpotIn(zone, r) { var B = PYT.bounds; for (var t = 0; t < 30; t++) {
var x = B.x0 + Math.random() * (B.x1 - B.x0), z = B.z0 + Math.random() * (B.z1 - B.z0);
if (pyZoneAt(x, z) === zone && pyClear(x, z, r))
return [x, z];
} return null; }
function pyNearRoad(zone, r0, r1) { var S = PYT.S; for (var t = 0; t < 30; t++) {
var s = S[Math.random() * S.length | 0];
if (s.zone !== zone)
continue;
var sd = Math.random() < 0.5 ? -1 : 1, a = s.w / 2 + r0 + Math.random() * (r1 - r0);
var x = s.x + sd * a * s.tz, z = s.z - sd * a * s.tx;
if (pyClear(x, z, 4))
return [x, z];
} return null; }
function pyBuildDress(G) { return __ZC(339, 34, this, arguments, new.target); }
function pyEnvNow(dt) { return __ZC(339, 35, this, arguments, new.target); }
"use strict";
var PY_G = 9.81;
PY_CARS.forEach(function (c) {
var S = PY_STYLE[c.style] || PY_STYLE.wedge;
VEH[c.arch] = { c: "car", lic: null, hud: "car", vmax: c.top, acc: c.acc, open: S.open ? 1 : 0, name: c.name, race: 1 };
});
function pyEye(car) {
var S = PY_STYLE[car.style] || PY_STYLE.wedge, clr = S.clr, sy = clr + 0.12;
if (car.style === "monster")
sy = clr + 0.7;
else if (car.style === "van")
sy = clr + 0.5;
else if (car.style === "bus" || car.style === "icecream")
sy = clr + 0.75;
else if (car.style === "mech")
sy = clr + 0.5;
else if (car.style === "sixer")
sy = clr + 0.25;
else if (car.style === "hover")
sy = clr + 0.15;
else if (car.style === "bubble")
sy = clr + 0.2;
return sy + 0.8 + (S.pads ? 0.35 : 0);
}
PY_CARS.forEach(function (c) { RIDE_SEAT[c.arch] = pyEye(c) - 1.72; });
(function () {
var vs = vehSpec;
vehSpec = function (arch) {
var c = pyCar(arch);
if (c && pyIsCar(arch)) {
var S = PY_STYLE[c.style] || PY_STYLE.wedge;
return { vmax: c.top, acc: c.acc, brake: 22, wb: S.L * 0.62, len: S.L / 2, wid: S.W / 2, cls: "car", lic: null, hud: "car", open: !!S.open, name: c.name };
}
return vs.apply(this, arguments);
};
})();
function pyDriving() { return !!(PY.on && DRIVE.on && pyIsCar(DRIVE.arch)); }
function pyGetIn(k, at) { return __ZC(339, 36, this, arguments, new.target); }
(function () {
var vl = vehicleLeave;
vehicleLeave = function () {
if (pyDriving()) {
if (PY.race && PY.race.st === "on" && !PY.race.out) {
pySay("<b>Get out mid-race?</b> Your car is out of the race. (Press Q again to climb out.)", true);
if (!PY.quitAsk || Date.now() - PY.quitAsk > 4000) {
PY.quitAsk = Date.now();
return;
}
pyRaceOut("you climbed out");
}
if (PY.me.air) {
pySay("Not in mid-air!");
return;
}
var h = DRIVE.h, P = camera.position;
vehicleEnd();
rideArch = null;
if (typeof rideG !== "undefined" && rideG) {
if (rideG.userData.pyCar)
pyGone(rideG);
else
scene.remove(rideG);
rideG = null;
}
var lx = -Math.cos(h), lz = Math.sin(h), w = (PY_STYLE[PY.me.car.style] || {}).W || 2;
P.x += lx * (w / 2 + 1.2);
P.z += lz * (w / 2 + 1.2);
P.y = 1.72 + pyGround(P.x - PY.base, P.z, PY.me.y + 1);
try {
var L = meLook();
L.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
pySay("<b>Out, and on foot.</b> The Motorworks' crew take the car back to the paddock.");
return;
}
return vl.apply(this, arguments);
};
})();
function pyDrive(dt, inp) { return __ZC(339, 37, this, arguments, new.target); }
function pyPaceFov(dt, off) { return __ZC(339, 38, this, arguments, new.target); }
function pyCarBlocked(x, z, h, y, c) { return __ZC(339, 39, this, arguments, new.target); }
function pyCarBlockN(x, z, h, y, c) { return __ZC(339, 40, this, arguments, new.target); }
function pyStuckTick(dt, f, sp) { return __ZC(339, 41, this, arguments, new.target); }
function pyBlocks(x, z, y) { return __ZC(339, 42, this, arguments, new.target); }
function pyHurt(dmg, src) { return __ZC(339, 43, this, arguments, new.target); }
function pyWreck(why) { return __ZC(339, 44, this, arguments, new.target); }
function pyWreckTick(dt) { return __ZC(339, 45, this, arguments, new.target); }
function pyRespawn(d) { return __ZC(339, 46, this, arguments, new.target); }
function pyAssistTurn(x, z, feet, h, vf, sIn, yawMax) { return __ZC(339, 47, this, arguments, new.target); }
function pyNearestMain(x, z) { var S = PYT.S, b = 0, bd = 1e12; for (var i = 0; i < S.length; i += 2) {
var d = (S[i].x - x) * (S[i].x - x) + (S[i].z - z) * (S[i].z - z);
if (d < bd) {
bd = d;
b = i;
}
} return b; }
(function () {
var dr = driveRoad;
driveRoad = function (dt, inp) {
if (pyDriving()) {
var M = PY.me, d = Math.min(dt, 0.05), n = Math.min(4, Math.max(1, Math.ceil(Math.hypot(M.vx || 0, M.vz || 0) * d / 1.5)));
for (var i = 0; i < n; i++) {
pyDrive(d / n, inp);
if (!pyDriving())
break;
}
pyPaceFov(d);
return;
}
pyPaceFov(dt, 1);
return dr.apply(this, arguments);
};
})();
(function () {
var gt = groundTick;
groundTick = function (dt) {
if (pyDriving() && walkMode && !store.inside) {
var P = camera.position;
P.y = 1.72 + PY.me.y + (RIDE_SEAT[DRIVE.arch] || 0);
if (typeof flyY !== "undefined")
flyY = 0;
return;
}
return gt.apply(this, arguments);
};
})();
(function () {
var rt = rideTick;
rideTick = function (dt) {
var arch = typeof rideArch !== "undefined" ? rideArch : null;
if (!pyIsCar(arch)) {
if (rideG && rideG.userData.pyCar) {
pyGone(rideG);
rideG = null;
}
return rt.apply(this, arguments);
}
if (!walkMode || store.inside) {
if (rideG)
rideG.visible = false;
return;
}
if (!rideG || rideG.userData.pyArch !== arch) {
if (rideG) {
if (rideG.userData.pyCar)
pyGone(rideG);
else
scene.remove(rideG);
}
rideG = pyBuildCar(pyCar(arch), { me: 1 });
rideG.userData.pyCar = 1;
rideG.userData.pyArch = arch;
scene.add(rideG);
}
pyPose(rideG, camera.position.x, PY.me.y, camera.position.z, DRIVE.h, PY.me, dt, DRIVE.v, DRIVE.steer);
rideG.visible = !(PY.me.cloak > 0 && false);
};
})();
function pyPose(g, x, y, z, h, st, dt, v, steer) { return __ZC(339, 48, this, arguments, new.target); }
(function () {
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var k = row && !row.away && row.look && row.look.ride;
if (pyIsCar(k)) {
var g = pg({ user_id: row.user_id, name: row.name, away: row.away, look: Object.assign({}, row.look, { ride: null }) });
g.userData.pyHide = 1;
g.children.forEach(function (ch) { if (ch !== g.userData.tag)
ch.visible = false; });
return g;
}
return pg.apply(this, arguments);
};
})();
(function () {
var at = avatarTick;
avatarTick = function (dt) { var r = at.apply(this, arguments); if (pyDriving() && typeof meG !== "undefined" && meG)
meG.visible = false; return r; };
})();
"use strict";
function pyMeActor() {
var P = camera.position;
return { id: "me", me: true, x: P.x - PY.base, y: PY.me.y, z: P.z, h: DRIVE.h, v: DRIVE.v, st: PY.me, car: PY.me.car, g: typeof rideG !== "undefined" ? rideG : null, name: "you" };
}
function pyActors() {
var L = [];
if (pyDriving() && PY.me.wreckT <= 0)
L.push(pyMeActor());
PY.riv.forEach(function (R) { if (!R.dead)
L.push(R); });
for (var id in PY.ghosts) {
var G = PY.ghosts[id];
if (G && !G.dead && G.seen > PY.t - 4)
L.push(G);
}
return L;
}
function pyFwd(a) { return { x: -Math.sin(a.h), z: -Math.cos(a.h) }; }
function pyTargetAhead(a, reach, cone) { return __ZC(339, 49, this, arguments, new.target); }
function pyActorsNear(x, z, y, r, skip) {
return pyActors().filter(function (b) { return b !== skip && b.id !== (skip && skip.id) && Math.hypot(b.x - x, b.z - z) < r && Math.abs(b.y - y) < 6; });
}
function pyFire(a) { return __ZC(339, 50, this, arguments, new.target); }
function pyDefend(a) { return __ZC(339, 51, this, arguments, new.target); }
function pyHit(b, dmg, a, how) { return __ZC(339, 52, this, arguments, new.target); }
function pyAffect(b, what, secs) { return __ZC(339, 53, this, arguments, new.target); }
function pyPush(b, px, pz) {
if (!b || b.decoy || b.st.phase > 0)
return;
if (b.me) {
PY.me.push = { x: px, z: pz };
return;
}
if (b.ghost) {
pyNetSend({ t: "fx", to: b.id, w: "push", x: +px.toFixed(1), z: +pz.toFixed(1) });
return;
}
b.vx = (b.vx || 0) + px;
b.vz = (b.vz || 0) + pz;
}
function pyActorById(id) { if (id === "me")
return pyDriving() ? pyMeActor() : null; for (var i = 0; i < PY.riv.length; i++)
if (PY.riv[i].id === id)
return PY.riv[i]; return PY.ghosts[id] || null; }
function pyFeedIf(b, t) { if (b && b.me)
pyFeed(t, "#E8E0FF"); }
function pyShot(s) { return __ZC(339, 54, this, arguments, new.target); }
function pyGeo(k) { return __ZC(339, 55, this, arguments, new.target); }
function pyShotsTick(dt) { return __ZC(339, 56, this, arguments, new.target); }
function pyBoom(x, y, z, r, dmg, owner, kind) {
pySoft(x, y, z, 0xFFB070, r * 0.8, 0.9);
pySoft(x, y + 0.5, z, 0x6A6460, r * 1.2, 1.8);
if (dmg)
pyActorsNear(x, z, y, r, null).forEach(function (b) { if (b.id !== owner)
pyHit(b, dmg, pyActorById(owner) || { id: owner }, kind); });
}
function pyDrop(d) { return __ZC(339, 57, this, arguments, new.target); }
function pyDropsTick(dt) { return __ZC(339, 58, this, arguments, new.target); }
function pyLastingTick(a, dt) { return __ZC(339, 59, this, arguments, new.target); }
function pyTimersTick(st, dt) { return __ZC(339, 60, this, arguments, new.target); }
function pyArmsPose(g, st, dt) { return __ZC(339, 61, this, arguments, new.target); }
function pyDecoyMesh(a) { return __ZC(339, 62, this, arguments, new.target); }
function pySoftTex() { return __ZC(339, 63, this, arguments, new.target); }
function pySoft(x, y, z, col, size, life) { return __ZC(339, 64, this, arguments, new.target); }
function pySmokeBig(x, y, z) { for (var i = 0; i < (PY.lite ? 5 : 10); i++)
pySoft(x + (Math.random() - 0.5) * 3, y + Math.random() * 2, z + (Math.random() - 0.5) * 3, i < 3 ? 0xFF9A50 : 0x5A5450, 3 + Math.random() * 3, 1.5 + Math.random() * 1.5); }
function pyRing(x, y, z, r, col) {
var m = new THREE.Mesh(pyGeo("ring"), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false }));
m.rotation.x = Math.PI / 2;
m.position.set(PY.base + x, y, z);
m.scale.setScalar(1);
scene.add(m);
PY.fx.push({ m: m, t: 0, life: 0.9, size: r, op: 0.45, ring: 1 });
}
function pyBeam(a, end, col, kind) { return __ZC(339, 65, this, arguments, new.target); }
function pyFxTick(dt) { return __ZC(339, 66, this, arguments, new.target); }
function pySmokeTrail(a) { if (!a.st.smokeDrop)
return; a.st.smokeDrop = 0; var f = pyFwd(a); pySoft(a.x - f.x * 4, a.y + 1, a.z - f.z * 4, 0xB8B4B0, 5, 2.4); PY.clouds = (PY.clouds || []).filter(function (c) { return c.t > PY.t - 2.4; }); PY.clouds.push({ x: a.x - f.x * 4, z: a.z - f.z * 4, t: PY.t }); }
function pyInSmoke(x, z) { return (PY.clouds || []).some(function (c) { return c.t > PY.t - 2.4 && Math.hypot(c.x - x, c.z - z) < 5; }); }
function pyMeArmsTick(dt) {
if (!pyDriving())
return;
var a = pyMeActor();
pyTimersTick(PY.me, dt);
pyLastingTick(a, dt);
pySmokeTrail(a);
}
function pyBulk(c) { var S = c && PY_STYLE[c.style]; return S ? Math.max(1, S.W / 2.1 + (S.L > 7 ? 0.25 : 0)) : 1; }
function pyCarsBump(nx, nz, dt) { return __ZC(339, 67, this, arguments, new.target); }
"use strict";
var PY_HAZ = {
canyon: { k: "boulder", name: "a falling boulder", r: 2.6, dmg: 36, col: 0xA0704A, every: 2.4 },
tundra: { k: "icicle", name: "falling icicles", r: 2.2, dmg: 26, col: 0xC8E8F8, every: 2.6 },
ice: { k: "icicle", name: "falling icicles", r: 2.2, dmg: 26, col: 0xC8E8F8, every: 4 },
lava: { k: "bomb", name: "a lava bomb", r: 3.2, dmg: 30, col: 0x3A2420, every: 1.8 },
jungle: { k: "log", name: "a falling tree", r: 3, dmg: 32, col: 0x5A4430, every: 3 },
sky: { k: "wreck", name: "falling wreckage", r: 2.6, dmg: 28, col: 0x5A5A64, every: 3.4 },
storm: { k: "gust", name: "the wind", every: 4 },
cave: { k: "stal", name: "a falling stalactite", r: 2.2, dmg: 28, col: 0x4A4458, every: 2.6 }
};
function pyHazGeo(k) { return __ZC(339, 68, this, arguments, new.target); }
function pyHazSpawn(s, H) { return __ZC(339, 69, this, arguments, new.target); }
function pyHazTick(dt) { return __ZC(339, 70, this, arguments, new.target); }
function pyHazDist(h, x, z) {
if (h.k === "log") {
var ux = Math.sin(h.h + Math.PI / 2), uz = Math.cos(h.h + Math.PI / 2), dx = x - h.x, dz = z - h.z, al = dx * ux + dz * uz, half = h.m.scale.x / 2;
al = Math.max(-half, Math.min(half, al));
return Math.hypot(dx - ux * al, dz - uz * al) - 0.6;
}
return Math.hypot(x - h.x, z - h.z);
}
function pyHazBlock(x, z, y) {
for (var i = 0; i < PY.hz.length; i++) {
var h = PY.hz[i];
if (!h.down || h.k === "icicle" || h.k === "stal" || h.life < 0.6)
continue;
if (Math.abs(y - h.ground) > 2.5)
continue;
if (pyHazDist(h, x, z) < (h.k === "log" ? 0.9 : h.r * 0.7))
return h;
}
return null;
}
function pySlabTrip(sl) {
if (sl.st !== 0)
return;
sl.st = 1;
sl.t = 0;
}
function pySlabsTick(dt) { return __ZC(339, 71, this, arguments, new.target); }
function pySlabsReset() { PYT.slabs.forEach(function (sl) { sl.st = 0; sl.t = 0; if (sl.mesh) {
sl.mesh.visible = true;
sl.mesh.position.set(0, 0, 0);
sl.mesh.rotation.set(0, 0, 0);
} }); }
function pyHazClear() { PY.hz.forEach(function (h) { pyGone(h.m); pyGone(h.sh); }); PY.hz = []; PY.gust = null; if (typeof pyHaz2Clear === "function")
pyHaz2Clear(); }
"use strict";
var PY_RIVAL_NAMES = ["Dex Marrow", "Juno Blaze", "Sable Vex", "Kip Torrance", "Mara Quill", "Otto Grist", "Lark Fennimore", "Rook Valdane", "Tessa Crane", "Bram Holloway", "Nova Strand", "Ivo Kestrel", "Wren Calloway", "Zane Hollis"];
function pyRivalsMake(n, arms, myCar) { return __ZC(339, 72, this, arguments, new.target); }
function pyRivalsClear() { PY.riv.forEach(function (R) { if (R.g) {
pyGone(R.g);
} if (R.st.decoy && R.st.decoy.m)
pyGone(R.st.decoy.m); }); PY.riv = []; }
function pySampleAt(R) { return __ZC(339, 73, this, arguments, new.target); }
function pyRivalsTick(dt) { return __ZC(339, 74, this, arguments, new.target); }
function pyRivalMind(R) { return __ZC(339, 75, this, arguments, new.target); }
function pyRivalHurt(R, dmg, a, how) { return __ZC(339, 76, this, arguments, new.target); }
function pyRivalWreck(R, why, a) { return __ZC(339, 77, this, arguments, new.target); }
function pyGridSpot(slot, base) { return __ZC(339, 78, this, arguments, new.target); }
function pyRivalKnockOut(R) { return __ZC(339, 79, this, arguments, new.target); }
"use strict";
var PY_SAY_Q = null;
function pySay(h, keep) { var now = Date.now(); if (!keep && now - (PY.sayAt || 0) < 1200) {
PY_SAY_Q = h;
return;
} PY.sayAt = now; PY_SAY_Q = null; setStatus(h); }
function pyTouch() { return typeof sdTouch === "function" ? sdTouch() : !!(document.body && document.body.classList.contains("touch")); }
function pyVR() { return typeof VRM !== "undefined" && !!VRM.xr; }
function pyFeed(html, col) { return __ZC(339, 80, this, arguments, new.target); }
function pyFmt(s) { if (s === null || s === undefined || !isFinite(s))
return "–"; var m = Math.floor(s / 60), r = s - m * 60; return m + ":" + (r < 10 ? "0" : "") + r.toFixed(1); }
function pyOrd(n) { return n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : n % 10 === 1 ? "st" : n % 10 === 2 ? "nd" : n % 10 === 3 ? "rd" : "th"); }
function pyHudBuild() { return __ZC(339, 81, this, arguments, new.target); }
function pyBar(f, col) { return "<div style='height:7px;background:rgba(255,255,255,.12);border-radius:4px;margin:2px 0 4px'><div style='height:7px;width:" + Math.round(Math.max(0, Math.min(1, f)) * 100) + "%;background:" + col + ";border-radius:4px'></div></div>"; }
function pyHudPaint() { return __ZC(339, 82, this, arguments, new.target); }
function pyScreenTick(dt) { return __ZC(339, 83, this, arguments, new.target); }
function pyPad(on) { return __ZC(339, 84, this, arguments, new.target); }
function pyFireMe() { if (!pyDriving() || PY.me.wreckT > 0)
return; var a = pyMeActor(); if (!pyFire(a) && PY.me.cool > 0)
pySay(PY_OFF[a.car.off].name + ": ready in " + PY.me.cool.toFixed(1) + "s."); }
function pyDefendMe() { if (!pyDriving() || PY.me.wreckT > 0)
return; var a = pyMeActor(); if (!pyDefend(a) && PY.me.dcool > 0)
pySay(PY_DEF[a.car.def].name + ": ready in " + PY.me.dcool.toFixed(1) + "s."); }
function pyRaceStart(ev, carKey) { return __ZC(339, 85, this, arguments, new.target); }
function pyRaceClear() { pyRivalsClear(); PY.shots.forEach(function (s) { pyGone(s.m); }); PY.shots = []; PY.drops.forEach(function (d) { if (d.m)
pyGone(d.m); }); PY.drops = []; PY.race = null; if (PY.lampsEl)
PY.lampsEl.style.display = "none"; pyLamps(-1); }
function pyLamps(n) { return __ZC(339, 86, this, arguments, new.target); }
function pyRaceTick(dt) { return __ZC(339, 87, this, arguments, new.target); }
function pyRaceWrecked(why) { return __ZC(339, 88, this, arguments, new.target); }
function pyRaceOut(why) { return __ZC(339, 89, this, arguments, new.target); }
function pyRaceFinish(last) { return __ZC(339, 90, this, arguments, new.target); }
function pyRaceSign() { return __ZC(339, 91, this, arguments, new.target); }
function pyLocal() { var d = store.py; if (!d || typeof d !== "object")
d = store.py = {}; if (!Array.isArray(d.owned))
d.owned = []; if (!Array.isArray(d.finds))
d.finds = []; return d; }
var PY_SAVE_AT = 0;
function pySave(now) { if (now || Date.now() - PY_SAVE_AT > 6000) {
PY_SAVE_AT = Date.now();
try {
save();
}
catch (e) { }
} }
function pyStateLoad(force) { return __ZC(339, 92, this, arguments, new.target); }
var PY_SHOP_MS = 30 * 60 * 1000;
function pyShopLeft(k) {
if (typeof amKeeper === "function" && amKeeper())
return 0;
var S = PY.state;
if (S && S.shop && S.shop[k])
return Math.max(0, S.shop[k] - (Date.now() - (PY.stateAt || Date.now())) / 1000);
var L = pyLocal();
return L.shop && L.shop[k] ? Math.max(0, (L.shop[k] - Date.now()) / 1000) : 0;
}
function pyShopMin(k) { return Math.max(1, Math.ceil(pyShopLeft(k) / 60)); }
function pyOwned() { return __ZC(339, 93, this, arguments, new.target); }
function pyStats() { var S = PY.state, L = pyLocal(); return S ? { wins: S.wins || 0, podiums: S.podiums || 0, races: S.races || 0, spts: S.season_pts || 0 } : { wins: L.wins || 0, podiums: L.podiums || 0, races: L.races || 0, spts: L.sid === pySeason() ? (L.spts || 0) : 0 }; }
function pyLocalPrizes() { return __ZC(339, 94, this, arguments, new.target); }
function pyNetSend(body, to) {
if (PY.net.missing || !(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
if (body.to) {
to = body.to;
}
cityRpc("race_send", { p_to: to || null, p_body: body }).catch(function (e) { if (rpcMissing(e))
PY.net.missing = true; });
}
function pyNetTick(dt) { return __ZC(339, 95, this, arguments, new.target); }
function pyNetGot(r) { return __ZC(339, 96, this, arguments, new.target); }
function pyPvpHit(b, dmg, how) {
if (!(typeof signedIn === "function" && signedIn()))
return;
var P = PY.net.pend || (PY.net.pend = {});
var e = P[b.id] || (P[b.id] = { d: 0, how: how });
e.d += dmg;
e.how = how || e.how;
}
function pyRaceFinishView() { return __ZC(339, 97, this, arguments, new.target); }
"use strict";
function pyKmh(ms) { return Math.round(ms * 3.6); }
function pyHowLine(c, own) { return __ZC(339, 98, this, arguments, new.target); }
function pyGarageOpen(tab) { return __ZC(339, 99, this, arguments, new.target); }
function pyCarCard(k) { return __ZC(339, 100, this, arguments, new.target); }
function pyFindRumour(k) { return __ZC(339, 101, this, arguments, new.target); }
function pyActNeed(what) { return __ZC(339, 102, this, arguments, new.target); }
function pyAfter(o, k) {
if (o && o.ok) {
PY.state = null;
pyStateLoad(true).then(function () { pyCarCard(k); });
pyFeed("🏎️ " + esc(o.say || "Done."), "#9AE8A0");
if (typeof refreshStanding === "function")
refreshStanding();
}
else
pySay(esc((o && o.say) || "The Motorworks could not do that."));
}
function pyBuy(k) { if (!pyActNeed())
return; cityRpc("race_planet_buy", { p_car: k }).then(function (o) { pyAfter(o, k); }).catch(function (e) { if (rpcMissing(e))
PY.missing = true; pySay("The Motorworks could not be reached."); }); }
function pyClaim(k) {
if (!(typeof signedIn === "function" && signedIn()) || PY.missing) {
var L = pyLocal();
pyLocalPrizes();
if (L.owned.indexOf(k) >= 0)
pyCarCard(k);
return;
}
cityRpc("race_planet_claim", { p_car: k }).then(function (o) { pyAfter(o, k); }).catch(function (e) { if (rpcMissing(e))
PY.missing = true; });
}
function pyCraft(k) { if (!pyActNeed())
return; cityRpc("race_planet_craft", { p_car: k }).then(function (o) { pyAfter(o, k); }).catch(function (e) { if (rpcMissing(e))
PY.missing = true; pySay("The build bay could not be reached."); }); }
function pyFind(k) { return __ZC(339, 103, this, arguments, new.target); }
function pyRaceDesk(k) { return __ZC(339, 104, this, arguments, new.target); }
function pyTrackSpan(ev) {
var E = PY_EVENTS[ev];
if (!E)
return null;
if (!E.sprint)
return { a: 0, len: PYT.L, whole: true };
var a = pyMainDistAt(E.sprint.from), b = E.sprint.to === null ? PYT.L : pyMainDistAt(E.sprint.to);
return { a: a, len: b > a ? b - a : b + PYT.L - a, whole: false };
}
function pyTrackIdx(d) { var S = PYT.S; for (var i = 0; i < S.length; i++)
if (S[i].d >= d - 0.01)
return i; return 0; }
function pyTrackCount(i0, len) { var S = PYT.S, n = S.length, a = S[i0].d, k = 1; while (k < n) {
var s = S[(i0 + k) % n], u = (s.d - a + PYT.L) % PYT.L;
if (u >= len - 0.5)
break;
k++;
} return Math.max(2, k); }
function pyTrackWords(ev) { return __ZC(339, 105, this, arguments, new.target); }
function pyTrackMap(ev) { return __ZC(339, 106, this, arguments, new.target); }
function pyTrackCard(ev, car) { return __ZC(339, 107, this, arguments, new.target); }
function pyTakeOut(k) {
if (!pyOwned()[k])
return;
if (pyShopLeft(k) > 0) {
var c = pyCar(k);
pySay("<b>The " + esc(c.name) + " is in the shop</b>, being restored after its wreck: back in " + pyShopMin(k) + " min.", true);
return;
}
PY.lastCar = k;
var A = PY.apron || { x: 40, z: 120, h: 0 };
pyGetIn(k, { x: A.x, z: A.z, h: A.h });
}
function pyShowcase(k) {
var T = PY.turn;
if (!T)
return;
var c = pyCar(k);
if (!c || T.k === k)
return;
if (T.car)
T.g.remove(T.car);
T.car = pyBuildCar(c, { me: 1 });
T.g.add(T.car);
T.k = k;
}
"use strict";
var PY_RC = "Pyreline Race Control";
var PY_MW = { x0: 50, x1: 120, z0: 50, z1: 140 };
var PY_ARRIVE = { x: 70, z: 196, yaw: 0 };
function pySolid(s) { (PY.solids || (PY.solids = [])).push(s); return s; }
function pyBox(G, w, h, d, mat, x, y, z, solid, rot) {
var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
m.position.set(x, y, z);
if (rot)
m.rotation.y = rot;
m.raycast = function () { };
G.add(m);
if (solid)
pySolid({ x: x, z: z, hw: w / 2, hd: d / 2, rot: rot || 0, h: y + h / 2, b: y - h / 2 });
return m;
}
function pyWall(G, x0, z0, x1, z1, h, mat, doors, th) { return __ZC(339, 108, this, arguments, new.target); }
function pyStd(col, tex, rx, ry, o) {
o = o || {};
var map = tex ? pyTex(tex, rx || 1, ry || 1) : null;
var m = PY.lite ? new THREE.MeshLambertMaterial({ color: col, map: map }) : new THREE.MeshStandardMaterial({ color: col, map: map, roughness: o.r !== undefined ? o.r : 0.8, metalness: o.m || 0 });
if (o.ds)
m.side = THREE.DoubleSide;
return m;
}
function pyPersonAt(G, seed, title, x, z, face, talk) { return __ZC(339, 109, this, arguments, new.target); }
function pyMapTex() { return __ZC(339, 110, this, arguments, new.target); }
function pyBuildPaddock(G) { return __ZC(339, 111, this, arguments, new.target); }
function pyBuildMotorworks(G) { return __ZC(339, 112, this, arguments, new.target); }
function pyFindRand(seed) { var h = 2166136261; for (var i = 0; i < seed.length; i++) {
h ^= seed.charCodeAt(i);
h = Math.imul(h, 16777619);
} return function () { h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909); return ((h >>> 0) % 100000) / 100000; }; }
function pyBuildFinds(G) { return __ZC(339, 113, this, arguments, new.target); }
function pyBoard() { return __ZC(339, 114, this, arguments, new.target); }
function pyBuildAll(G) { return __ZC(339, 115, this, arguments, new.target); }
function pyWorksHere() { var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []; return jobs.some(function (j) { return j.workplace === PY_KEY || j.workplace === PY_RC || (+j.job_id >= 5600 && +j.job_id <= 5699); }); }
function pyAllowedNow() { return __ZC(339, 116, this, arguments, new.target); }
function pyPassCheck(force) { return __ZC(339, 117, this, arguments, new.target); }
function pyGo(opt) { return __ZC(339, 118, this, arguments, new.target); }
(function () {
var wg = worldGo;
worldGo = function (key) { if (key === "race") {
var A = pyAllowedNow();
if (A.ok === false) {
setStatus("<b>🏁 " + esc(A.say) + "</b>");
return false;
}
} return wg.apply(this, arguments); };
})();
worldDef("race", {
base: PY.base, far: 2600, ownSky: true, tone: 330,
env: function (dt) { return pyEnvNow(dt); },
build: function (G) { pyBuildAll(G); },
enter: function (opt) { return __ZC(339, 119, this, arguments, new.target); },
leave: function () { return __ZC(339, 120, this, arguments, new.target); },
ground: function (x, z, feet) { return pyGround(x, z, feet === undefined ? null : feet); },
block: function (x, z, feet) {
var B = PYT.bounds;
if (x < B.x0 + 8 || x > B.x1 - 8 || z < B.z0 + 8 || z > B.z1 - 8)
return true;
if (PY.solids && worldSolidAt(PY.solids, x, z, feet === undefined ? 0 : feet))
return true;
if (pyRailBlock(x, z, feet))
return true;
return false;
},
tick: function (dt) { pyTick(dt); },
key_: function (e) { return __ZC(339, 121, this, arguments, new.target); },
back: function () { return __ZC(339, 122, this, arguments, new.target); }
});
function pyTick(dt) { return __ZC(339, 123, this, arguments, new.target); }
function pyPrompts(lx, lz, drv) { return __ZC(339, 124, this, arguments, new.target); }
(function () {
if (typeof useCarried === "function") {
var uc = useCarried;
useCarried = function () { if (WLD.on === "race" && pyDriving()) {
pyFireMe();
return;
} return uc.apply(this, arguments); };
}
if (typeof addEventListener === "function")
addEventListener("mousedown", function (e) { if (WLD.on !== "race" || !pyDriving() || !walkMode || !document.pointerLockElement)
return; if (e.button === 0)
pyFireMe();
else if (e.button === 2)
pyDefendMe(); });
if (typeof vrmScreenText === "function") {
var vs = vrmScreenText;
vrmScreenText = function () {
var t = vs.apply(this, arguments);
if (WLD.on === "race" && pyDriving()) {
var M = PY.me;
t = "Armour " + Math.ceil(M.hp) + "/" + M.max + " · " + PY_OFF[M.car.off].name + (M.cool > 0 ? " " + M.cool.toFixed(0) + "s" : " ready") + " · " + PY_DEF[M.car.def].name + (M.dcool > 0 ? " " + M.dcool.toFixed(0) + "s" : " ready") + " · " + (M.pow ? PY_POW[M.pow].name + " held" : "no power") + "\ntrigger fires, left stick click defends, right stick down uses the power, right stick up slides (drift boost)" + (t ? "\n" + t : "");
}
return t;
};
}
if (typeof motesTick === "function") {
var mt = motesTick;
motesTick = function () { if (WLD.on === "race") {
if (GFX.motes)
GFX.motes.pts.visible = false;
return;
} return mt.apply(this, arguments); };
}
if (typeof assaultDreamer === "function") {
var ad = assaultDreamer;
assaultDreamer = function () { if (WLD.on === "race")
return; return ad.apply(this, arguments); };
}
if (typeof misdeed === "function") {
var md = misdeed;
misdeed = function () { if (WLD.on === "race")
return; return md.apply(this, arguments); };
}
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var own = pyOwned(), ks = Object.keys(own).filter(function (k) { return own[k] && k !== "gravelhound" || (own[k] && PY.state && (PY.state.cars || []).indexOf(k) >= 0); });
if (ks.length && !(typeof amKeeper === "function" && amKeeper())) {
h += bkpHead("Race cars (kept at Pyreline Motorworks)") + ks.map(function (k) { var c = pyCar(k); return bkpRow("🏎️ " + esc(c.name), bkpDim(PY_OFF[c.off].icon + " " + PY_DEF[c.def].icon)); }).join("");
}
}
catch (e) { }
return h;
};
})();
if (typeof ORB_LINES !== "undefined") {
ORB_LINES.push({ k: "race", name: "Race Line", col: "#FF9A3A", off: 55, stops: [
{ k: "earth", name: "Earth: the Space Corp Spaceport" },
{ k: "pyreline", name: "Pyreline: the race planet", kind: "surface", host: "pyreline",
facts: ["Pyreline is a world of SomnuMatrix's own: one road runs round the whole planet, through eleven climates.", "Only members recommended by the Warrens Street Racing Club may race there.", "A wrecked car is out: first across the line, or the last car still running, wins."] }
] });
}
(function () {
if (typeof orbArrive === "function") {
var oa = orbArrive;
orbArrive = function (stop) { if (stop && stop.k === "pyreline") {
if (!pyGo({ keepFrom: true }))
worldHome();
return;
} return oa.apply(this, arguments); };
}
if (typeof orbBoard === "function") {
var ob = orbBoard;
orbBoard = function (lineK, fromK, toK) {
var self = this, args = arguments;
if (toK === "pyreline") {
var A = pyAllowedNow();
if (A.ok === false) {
setStatus("<b>🏁 The Race Line's crew check the list.</b> " + esc(A.say));
return;
}
if (A.ok === null) {
pyPassCheck(true).then(function () { var B = pyAllowedNow(); if (B.ok)
ob.apply(self, args);
else
setStatus("<b>🏁 The Race Line's crew check the list.</b> " + esc(B.say || "")); });
return;
}
}
return ob.apply(this, arguments);
};
}
})();
if (typeof SP_BODIES !== "undefined") {
var PY_BODY = { k: "pyreline", name: "Pyreline, the race planet", kind: "A world of SomnuMatrix's own: one road round the whole planet", orbit: 3300, ang: 4.4, y: -40, r: 36, col: 0xD8783A, spin: 0.03,
rows: [["Where", "Beyond Mars, in SomnuMatrix's own sky"], ["The road", "The Grand Loop, " + Math.round(12) + " km, through eleven climates"], ["Who may race", "Members recommended by the Warrens Street Racing Club"], ["Rule", "A wrecked car is out"]],
notes: ["Land at the Redline Paddock.", "The Race Line flies there from Launch Pad 1."] };
SP_BODIES.push(PY_BODY);
if (typeof SP_BY !== "undefined")
SP_BY.pyreline = PY_BODY;
}
(function () {
if (typeof spPaint === "function") {
var sp = spPaint;
spPaint = function (k) {
if (k !== "pyreline")
return sp.apply(this, arguments);
if (SP.tex.pyreline)
return SP.tex.pyreline;
SP.tex.pyreline = wTex(512, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#6A3A2A");
g.addColorStop(0.5, "#C8783A");
g.addColorStop(1, "#5A3020");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(240,240,250,.6)";
x.fillRect(0, 0, W, 22);
x.fillRect(0, H - 22, W, 22);
x.strokeStyle = "rgba(30,24,20,.85)";
x.lineWidth = 5;
x.beginPath();
for (var i = 0; i <= W; i += 8) {
var y = H / 2 + Math.sin(i * 0.03) * 40 + Math.sin(i * 0.011) * 30;
if (i)
x.lineTo(i, y);
else
x.moveTo(i, y);
}
x.stroke();
});
return SP.tex.pyreline;
};
}
if (typeof spPromptTick === "function") {
var pt = spPromptTick;
spPromptTick = function () {
var r = pt.apply(this, arguments), N = SP.near;
if (N && N.k === "pyreline" && N.d < N.b.r * 3.4 + 30)
worldPrompt("<b>Pyreline, the race planet</b> · <b>press E</b> to land at the Redline Paddock", function () { pyGo({ keepFrom: true }); });
return r;
};
}
if (typeof spInfo === "function") {
var si = spInfo;
spInfo = function (k) {
if (k !== "pyreline")
return si.apply(this, arguments);
var b = PY_BODY;
worldCard(worldFacts(b.name, b.kind, b.rows, b.notes, worldBtn("land", "Land at the Redline Paddock", "Members recommended by the club") + (WLD.on === "space" ? worldBtn("fly", "Fly there", "The shuttle takes you") : "")), { land: function () { pyGo({ keepFrom: true }); }, fly: function () { spFlyTo({ k: "pyreline", name: b.name, after: "Press E to land." }); } });
};
}
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-race]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-race", "1");
b.textContent = "🏁 Pyreline, the race planet";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } worldGo("race"); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
function pyMenu() { return __ZC(339, 125, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-race"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-race";
b.title = "Pyreline, the race planet";
b.textContent = "🏁 Pyreline";
b.onclick = function () { pyMenu(); };
var pk = document.getElementById("me-battle");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (typeof PS_SECTIONS !== "undefined") {
PS_SECTIONS.forEach(function (S) { if (S.k === "fun" && S.ids.indexOf("me-race") < 0) {
var i = S.ids.indexOf("me-battle");
S.ids.splice(i >= 0 ? i + 1 : S.ids.length, 0, "me-race");
} });
}
if (typeof document === "undefined")
return;
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
function pyClubWon(how) { return __ZC(339, 126, this, arguments, new.target); }
(function () {
if (typeof raceEnd === "function") {
var re = raceEnd;
raceEnd = function (secs, why) {
try {
if (secs !== null && secs !== undefined && !RACE.live) {
var place = 1 + (RACE.riv || []).filter(function (R) { return R.done !== null && R.done < secs; }).length;
if (place === 1)
pyClubWon("club");
}
}
catch (e) { }
return re.apply(this, arguments);
};
}
if (typeof rliveEnd === "function") {
var rl = rliveEnd;
rliveEnd = function (Lv, secs, why) {
var r = rl.apply(this, arguments);
if (secs !== null && secs !== undefined)
setTimeout(function () { var had = PY.pass === true; pyPassCheck(true).then(function (ok) { if (ok && !had)
setStatus("<b>🏁 The Warrens Street Racing Club recommends you for Pyreline, the race planet!</b> Take the <b>Race Line</b> from the Space Corp Spaceport."); }); }, 7000);
return r;
};
}
if (typeof raceOpen === "function") {
var ro = raceOpen;
raceOpen = function () {
var r = ro.apply(this, arguments);
try {
var c = WLD.card;
if (c && c.style.display === "block" && !c.querySelector("[data-w='pyreline']")) {
pyPassCheck(false).then(function () {
var A = pyAllowedNow();
var d = document.createElement("div");
d.innerHTML = worldBtn("pyreline", "🏁 Pyreline, the race planet", A.ok ? "The club recommends you: take the Race Line from the Spaceport" : "Win a race here and the club recommends you for the race planet");
var btn = d.firstChild;
btn.onclick = function (ev) { ev.stopPropagation(); pyMenu(); };
btn.style.cursor = "pointer";
var board = c.querySelector("#race-board");
if (board && board.parentNode)
board.parentNode.insertBefore(btn, board);
else
c.appendChild(btn);
});
}
}
catch (e) { }
return r;
};
}
})();
function pyIsKey(k) { return k === PY_KEY || k === PY_RC; }
function pyHereKey() {
if (WLD.on !== "race")
return null;
var L = worldLocal(), x = L.x, z = L.z, B = PY_MW;
if (x > B.x0 && x < B.x1 && z > B.z0 && z < B.z1)
return z > 120 && x > 90 ? PY_RC : PY_KEY;
if (Math.hypot(x - 19, z - (PYT.S[0] ? PYT.S[0].z + 22 : 172)) < 14)
return PY_RC;
return null;
}
(function () {
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (job && (pyIsKey(job.workplace) || (+job.job_id >= 5600 && +job.job_id <= 5699)) && !(typeof amKeeper === "function" && amKeeper()))
return WLD.on === "race"; return os.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
if (!pyIsKey(key))
return sw.apply(this, arguments);
if (WLD.on === "race") {
var t = key === PY_RC ? { x: 103, z: 118 } : { x: PY_MW.x0 - 3, z: 95 };
guideTo = { key: key, x: PY.base + t.x, z: t.z };
setStatus("<b>" + esc(key) + "</b>: follow the pointer.");
return;
}
sw.call(this, typeof SPACEPORT_KEY !== "undefined" ? SPACEPORT_KEY : key);
setStatus("<b>" + esc(key) + "</b> is on Pyreline, the race planet. Follow the pointer to the Space Corp Spaceport and take the <b>Race Line</b> from Launch Pad 1.");
};
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (WLD.on === "race") {
if (typeof walkMode !== "undefined" && !walkMode)
return null;
var k = pyHereKey();
return k ? { key: k, inside: true } : null;
} return aw.apply(this, arguments); };
}
})();
"use strict";
function pyRibbonY(list, a, b, lf, rf, yf, mat) { return __ZC(339, 127, this, arguments, new.target); }
function pyArchOver(list, a, b, mat, extra) { return __ZC(339, 128, this, arguments, new.target); }
function pyPortal(G, s, mat, trim) { return __ZC(339, 129, this, arguments, new.target); }
function pyRunsOf(test) { var S = PYT.S, out = [], cur = null; for (var i = 0; i < S.length; i++) {
if (test(S[i])) {
if (!cur) {
cur = { a: i, b: i };
out.push(cur);
}
cur.b = i;
}
else
cur = null;
} return out; }
function pyBuildLands(G) { return __ZC(339, 130, this, arguments, new.target); }
function pyBuildDunes(G) { return __ZC(339, 131, this, arguments, new.target); }
function pyBuildDeep(G) { return __ZC(339, 132, this, arguments, new.target); }
function pyBuildCoast(G) { return __ZC(339, 133, this, arguments, new.target); }
function pyBuildCol(G) { return __ZC(339, 134, this, arguments, new.target); }
function pyLandsTick(dt) { if (PY.seaTex) {
PY.seaTex.offset.x += dt * 0.006;
PY.seaTex.offset.y += dt * 0.003;
} }
"use strict";
var PY_HAZ2 = {
canyon: [{ k: "sweep", kind: "devil", name: "a dust devil", every: 8, dmg: 10, spin: 1.2, push: 5, len: 4, spd: 8, col: 0xC8A070 }],
tundra: [{ k: "sweep", kind: "avalanche", name: "an avalanche", every: 9, dmg: 24, push: 14, len: 22, spd: 11, col: 0xF0F4FA }],
ice: [{ k: "erupt", kind: "icegeyser", name: "an ice geyser", every: 6, dmg: 16, lift: 6, frz: 1.6, r: 3.2, col: 0xC8F0FF }],
lava: [{ k: "erupt", kind: "geyser", name: "a lava geyser", every: 4.5, dmg: 30, lift: 7, r: 3.4, col: 0xFF7A2A }],
storm: [{ k: "sweep", kind: "debris", name: "flying debris", every: 6, dmg: 16, push: 6, len: 3, spd: 17, col: 0x8A9098 }],
dunes: [{ k: "sweep", kind: "twister", name: "a sand twister", every: 5.5, dmg: 10, spin: 1.8, push: 8, len: 5, spd: 7, col: 0xD8B078 }],
cave: [{ k: "erupt", kind: "crystal", name: "a crystal burst", every: 6, dmg: 20, slow: 1.5, r: 3, col: 0xB07AFF }],
coast: [{ k: "sweep", kind: "wave", name: "a breaking wave", every: 4.2, dmg: 14, push: 16, slow: 1, len: 26, spd: 13, col: 0xC8E8F0, sea: 1 }]
};
function pyHaz2Clear() { (PY.hz2 || []).forEach(function (h) { pyGone(h.m); pyGone(h.ring); }); PY.hz2 = []; }
function pyHaz2Spawn(s, H) { return __ZC(339, 135, this, arguments, new.target); }
function pyHaz2Place(hz) {
var s = hz.s;
if (hz.k === "sweep") {
hz.x = s.x + hz.ac * s.tz;
hz.z = s.z - hz.ac * s.tx;
hz.m.position.set(PY.base + hz.x, s.y, hz.z);
}
else
hz.m.position.set(PY.base + hz.x, s.y, hz.z);
}
function pyHaz2Tick(dt) { return __ZC(339, 136, this, arguments, new.target); }
function pyPatchAt(x, z, y) {
var n = pyNear(x, z, y);
if (!n || !n.s.patch)
return null;
var P = n.s.patch;
if (n.across < P.l - 0.3 || n.across > P.r + 0.3 || Math.abs(y - n.y) > 1.2)
return null;
return P;
}
"use strict";
var PY_POW_SAFE = ["overdrive", "hop", "aegis", "patch", "ghost"];
function pyArmsAllowed() { var R = PY.race; return !(R && R.st === "on" && !PY_EVENTS[R.ev].arms); }
function pyPowRoll() { var L = pyArmsAllowed() ? PY_POW_KEYS : PY_POW_SAFE; return L[Math.random() * L.length | 0]; }
function pyBuildCells(G) { return __ZC(339, 137, this, arguments, new.target); }
function pyCellsTick(dt) { return __ZC(339, 138, this, arguments, new.target); }
function pyPowUse(a, k) { return __ZC(339, 139, this, arguments, new.target); }
function pyPowMe() { return __ZC(339, 140, this, arguments, new.target); }
function pyRivalPow(R, dt) { return __ZC(339, 141, this, arguments, new.target); }
function pySkillsDrive(dt, inp, vf, onRoad) { return __ZC(339, 142, this, arguments, new.target); }
function pySkillLand(hit, airT) {
var M = PY.me;
if (M.wreckT > 0 || airT < 0.9 || hit >= 12)
return;
M.boost = Math.max(M.boost, 1);
pyFeed("🛬 <b>Clean landing!</b> A burst of speed", "#9AE8A0");
}
function pyPowNetGot(r, b) { return __ZC(339, 143, this, arguments, new.target); }
function pyPowersTick(dt) {
pyCellsTick(dt);
for (var i = 0; i < PY.riv.length; i++)
pyRivalPow(PY.riv[i], dt);
}
"use strict";
function pyBuildSprints(G) { return __ZC(339, 144, this, arguments, new.target); }
"use strict";
var PY_SNARL = { x: 250, z: -830, rx: 400, rz: 360, blend: 110, y: 2.5 };
function pySnarlK(x, z) {
var S = PY_SNARL, dx = (x - S.x) / S.rx, dz = (z - S.z) / S.rz, r = Math.sqrt(dx * dx + dz * dz);
if (r <= 1)
return 1;
var out = (r - 1) * Math.min(S.rx, S.rz);
if (out >= S.blend)
return 0;
var t = 1 - out / S.blend;
return t * t * (3 - 2 * t);
}
PY_ZONES.snarl = { name: "the Snarl", road: "broken concrete", grip: 0.9, tint: 0x5A544E, ground: 0x4E4842, tex: "concrete",
sky: [0x2A2430, 0xB8704A], fog: 0x8A6450, fogD: 0.0019, sun: 0.72, sunCol: 0xFFC890 };
var PY_TANGLE = [
{ k: "gutterway", name: "Gutterway", zone: "snarl", from: 3, to: 7,
pts: [[0, -250, 0.5, 18], [28, -330, 1.5, 12], [52, -430, 2.5, 11], [48, -540, 2.5, 11], [-20, -625, 3, 11], [-150, -668, 8, 11], [-260, -668, 13, 11], [-345, -645, 14, 11], [-460, -610, 9, 14]],
hint: "Just out of the paddock, before the canyon, a broken barrier on the right lets you into the Snarl's back streets. Tight corners, burning barrels, no walls to save you." },
{ k: "corkscrew", name: "the Corkscrew Drop", zone: "snarl", from: 23, to: 37,
pts: [[-160, -1400, 36, 13, "e"], [-110, -1310, 31, 11, "e"], [-60, -1220, 27, 11, "e"], [0, -1170, 24, 11, "e"],
[60, -1170, 21, 11, "e"], [100, -1130, 18, 11, "e"], [85, -1075, 15, 11, "e"], [35, -1065, 12, 11, "e"], [15, -1115, 10, 11, "e"],
[30, -1175, 7, 11, "e"], [90, -1210, 5, 11, "e"], [165, -1110, 3, 11], [230, -965, 2.5, 11], [330, -865, 2.5, 11],
[400, -740, 2.5, 11], [425, -600, 3, 11], [500, -470, 9, 11, "e"], [620, -385, 12, 11, "e"], [720, -335, 9, 11], [790, -320, 8, 14]],
hint: "On the Skyway, before the jump, a ramp drops off the right-hand side and corkscrews down round the Broken Spire, under its own road, through the heart of the Snarl, over the Furnace Ring, to the far end of the lava. Longer, but no jump and no cracks." },
{ k: "undercroft", name: "the Undercroft", zone: "sky", from: 21, to: 33,
pts: [[-430, -1480, 17, 14], [-340, -1470, 14, 11, "e"], [-230, -1450, 12, 11, "e"], [-110, -1375, 12, 11, "e"], [10, -1445, 12, 11, "e"],
[120, -1370, 12, 11, "e"], [240, -1455, 12, 11, "er"], [262, -1445, 12, 0], [300, -1425, 11, 11, "e"], [400, -1360, 12, 11, "e"],
[520, -1280, 13, 11, "e"], [600, -1150, 13, 11, "e"], [675, -1010, 11, 11], [800, -900, 10, 14]],
hint: "Where the snow road climbs to the Skyway, keep low: the old lower deck runs on under the top road, back and forth beneath it, with a broken span to jump." },
{ k: "scrapline", name: "Scrapline", zone: "snarl", from: 31, to: 36,
pts: [[640, -1200, 27, 13, "e"], [585, -1100, 21, 11, "e"], [530, -990, 15, 11, "e"], [480, -880, 12, 11, "e"], [500, -760, 11, 11, "e"],
[600, -650, 11, 11, "e"], [700, -570, 8, 11], [790, -500, 7, 11], [880, -470, 7, 14]],
hint: "At the bottom of the Skyway a broken flyover peels off to the right, over the Snarl's scrapyards, and comes down at the lava." },
{ k: "furnace", name: "the Furnace Ring", zone: "snarl", from: 33, to: 38,
pts: [[800, -900, 10, 14], [700, -855, 5, 11], [600, -770, 2.5, 11], [560, -650, 2.5, 11], [610, -505, 3, 11], [645, -345, 3, 11], [720, -215, 4, 11], [800, -160, 5, 13]],
hint: "Where the Skyway reaches the caldera, a road on the right runs back into the Snarl's foundries, under Scrapline's flyover, under the Corkscrew, and out where the Mirewild begins." },
{ k: "drywash", name: "the Dry Wash", zone: "canyon", from: 4, to: 14,
pts: [[-40, -380, 2, 16], [-110, -400, 1, 11], [-240, -455, 0, 11], [-400, -505, -0.5, 11], [-560, -560, -1, 11], [-690, -650, -1.5, 11],
[-760, -760, -2, 11], [-790, -830, -2.5, 11], [-830, -905, -2.5, 11], [-800, -990, 3, 11], [-860, -1050, 9, 11], [-930, -1060, 13, 15]],
hint: "Where the canyon road begins, the dry riverbed runs off to the left, down in the canyon floor. It passes right under the gorge jump: the cars fly over your roof." },
{ k: "ochre", name: "the Ochre Ledges", zone: "canyon", from: 5, to: 12,
pts: [[-150, -500, 4, 15, "e"], [-200, -455, 8, 10, "e"], [-240, -418, 12, 10, "e"], [-350, -385, 24, 10], [-520, -425, 38, 10], [-670, -520, 46, 10], [-790, -650, 44, 10],
[-870, -780, 34, 10, "e"], [-890, -870, 24, 10, "e"], [-842, -940, 15, 14]],
hint: "After the first bend, a track climbs the canyon's right-hand wall onto the mesa. It crosses the canyon on an old timber trestle, high over both the road and the riverbed, and misses the gorge jump." },
{ k: "underice", name: "the Underice", zone: "tundra", from: 15, to: 20,
pts: [[-1000, -1180, 10, 16], [-950, -1245, 5, 10, "t"], [-890, -1310, -2, 10, "t"], [-860, -1390, -6, 10, "t"], [-840, -1460, -4, 10, "t"], [-790, -1500, 0, 10, "t"], [-700, -1500, 4, 10, "t"], [-620, -1510, 9, 10], [-560, -1540, 12, 14]],
hint: "Before the frozen lake, a glass tube goes down under the ice on the left. No cracking slabs, but it is narrow and the walls do not forgive." },
{ k: "slagback", name: "Slagback Ridge", zone: "lava", from: 33, to: 37,
pts: [[800, -900, 10, 14], [905, -830, 17, 10], [985, -700, 24, 10], [1010, -560, 26, 10], [965, -420, 18, 10], [880, -345, 11, 10], [790, -320, 8, 14]],
hint: "Where the road reaches the caldera, a ridge of black rock climbs away on the left. Up high, the lava's heat and the wind off it: no rails." },
{ k: "canopy", name: "the Canopy Run", zone: "jungle", from: 38, to: 43,
pts: [[800, -160, 5, 13], [765, -70, 14, 9], [800, 30, 24, 9, "e"], [1000, 110, 27, 9, "e"], [1050, 230, 27, 9, "e"], [1010, 335, 26, 9, "e"],
[860, 405, 22, 9, "e"], [745, 480, 14, 9, "e"], [690, 520, 9, 9], [640, 580, 7, 15]],
hint: "As the Mirewild starts, a boardwalk climbs into the giant trees on the left. It crosses over the jungle road twice, up in the canopy." },
{ k: "turbines", name: "the Turbine Weave", zone: "storm", from: 43, to: 47,
pts: [[640, 580, 7, 15], [575, 690, 10, 11], [450, 790, 13, 11], [310, 825, 15, 11], [180, 785, 12, 11], [95, 700, 9, 11], [40, 600, 7, 15]],
hint: "At the top of the Mirewild a farm road runs off to the right, in and out of the great wind turbines, and comes back before the bluff jump's landing." },
{ k: "dunecrest", name: "Dunecrest", zone: "dunes", from: 49, to: 57,
pts: [[-150, 500, 4, 17], [-250, 620, 12, 10], [-400, 700, 20, 10], [-560, 745, 23, 10], [-700, 790, 22, 10], [-760, 870, 20, 10, "e"],
[-850, 800, 20, 10, "e"], [-930, 825, 15, 10], [-965, 885, 11, 10], [-960, 950, 8, 14]],
hint: "Before the dunes, a track climbs the big dune on the right and runs along the crests. At the end it leaps the road on the bones of a second leviathan." },
{ k: "gallery", name: "the High Gallery", zone: "cave", from: 57, to: 66,
pts: [[-960, 950, 8, 14], [-1055, 925, 16, 10], [-1145, 880, 24, 10, "e"], [-1215, 815, 27, 10, "e"], [-1280, 755, 26, 10, "e"],
[-1350, 690, 21, 10, "e"], [-1380, 600, 13, 10], [-1350, 525, 6, 10], [-1280, 520, 3, 15]],
hint: "Before the Gloamdeep's tunnel, a ledge road climbs the cliff on the left and hangs high over the Hollow on chains. Crystal light, a long way down." },
{ k: "lowtide", name: "the Low Tide Run", zone: "coast", from: 66, to: 74,
pts: [[-1280, 520, 3, 15], [-1345, 430, 2, 11], [-1360, 290, 1.7, 11], [-1290, 150, 1.6, 11], [-1150, 45, 1.6, 11], [-970, 15, 1.6, 11],
[-790, 50, 1.7, 11], [-610, 130, 2, 11], [-430, 260, 2, 17]],
hint: "Where the sea road begins, the sand bars out in the sea are dry at low tide: a road across them, on the sea side. Off the edge is the sea." }
];
PY_TANGLE.forEach(function (T) { T.tangle = 1; T.tunnel = T.k === "underice" ? 1 : 0; PY_CUTS.push(T); });
"use strict";
var PY_TG_COL = { gutterway: 0xFFB040, corkscrew: 0xFF6A4A, undercroft: 0x3AE8F0, scrapline: 0xC8FF3A, furnace: 0xFF8A2A, drywash: 0xF0E0B0,
ochre: 0xFFD27A, underice: 0x9ADFFF, slagback: 0xFF4A3A, canopy: 0x7AFF9A, turbines: 0xE8F0FF, dunecrest: 0xFFC870, gallery: 0xC09AFF, lowtide: 0x5AE8E0,
ashrow: 0xFF3A6A, cutter: 0x4AC8FF, breakneck: 0xFFE04A, crane: 0x8AFF6A, knife: 0xFF8A3A, gallows: 0xB08AFF };
function pyTgRoutes() { return __ZC(339, 145, this, arguments, new.target); }
(function () {
var make = pyTrackMake;
pyTrackMake = function () {
var first = !PYT.S.length;
make();
if (!first)
return;
pyTgRoutes().forEach(function (R) {
if (R.C.street || R.len < (R.dTo - R.dFrom) * 1.12)
return;
var L = R.list, last = -1e9;
L.forEach(function (s, i) {
if (s.ld < 60 || s.ld > R.len - 60 || s.ld - last < 260)
return;
for (var q = -2; q <= 2; q++) {
var t = L[Math.max(0, Math.min(L.length - 1, i + q))];
if (/[gr]/.test(t.fl) || t.w <= 0)
return;
}
last = s.ld;
[-1, 0, 1].forEach(function (k) { var a = k * s.w * 0.28; PYT.cells.push({ x: s.x + a * s.tz, z: s.z - a * s.tx, y: s.y + 1.3, i: s.i, taken: 0 }); });
});
});
};
})();
function pyTgForks() {
if (PY.tgForks)
return PY.tgForks;
PY.tgForks = pyTgRoutes().filter(function (R) { return !R.C.street; }).map(function (R) { return { R: R, d: R.dFrom, p: /underice|gallery|undercroft/.test(R.k) ? 0.3 : 0.4 }; });
return PY.tgForks;
}
function pyTgSample(R) { return __ZC(339, 146, this, arguments, new.target); }
function pyRivAhead(R, q) {
if (R.br) {
var L = R.br.R.list, j = (R.br.j || 0) + q;
if (j < L.length)
return L[j];
var S = PYT.S, k = 0;
for (var i = 0; i < S.length; i++) {
if (S[i].k === R.br.R.C.to) {
k = i;
break;
}
}
return S[(k + j - L.length + 1) % S.length];
}
var S2 = PYT.S;
return S2[(R.i + q) % S2.length];
}
function pyRivRoute(R, delta, d0) { return __ZC(339, 147, this, arguments, new.target); }
(function () {
var at = pySampleAt;
pySampleAt = function (R) { if (R && R.br)
return pyTgSample(R); return at(R); };
var clr = pyRivalsClear;
pyRivalsClear = function () { PY.riv.forEach(function (R) { R.br = null; }); return clr.apply(this, arguments); };
})();
function pyRoadUnder(x, z, below, pad) { return __ZC(339, 148, this, arguments, new.target); }
function pyTgRibbon(list, a, b, lf, rf, yf, mat, vt, one) { return __ZC(339, 149, this, arguments, new.target); }
function pyTgRuns(list, test) { var out = [], cur = null; for (var i = 0; i < list.length; i++) {
if (test(list[i], i)) {
if (!cur) {
cur = { a: i, b: i };
out.push(cur);
}
cur.b = i;
}
else
cur = null;
} return out; }
function pyTgRoadMat(zone, k, street) { return __ZC(339, 150, this, arguments, new.target); }
function pyTgRoadTex() { return __ZC(339, 151, this, arguments, new.target); }
function pyTgPillar(G, R, s, top, ground, parts) { return __ZC(339, 152, this, arguments, new.target); }
function pyTgInst(G, geo, mat, arr, fn) { if (!arr.length)
return null; var k = 0; return pyInstances(G, geo, mat, arr.length, function () { var a = arr[k++]; return a ? fn(a) : null; }); }
function pyBuildTangle(G) { return __ZC(339, 153, this, arguments, new.target); }
function pyTgTube(G, R) { return __ZC(339, 154, this, arguments, new.target); }
function pyTgSigns(G, R) { return __ZC(339, 155, this, arguments, new.target); }
pyBuildCuts = (function (f) { return function (G) { f(G); try {
pyBuildTangle(G);
}
catch (e) {
if (window.console)
console.warn("pyreline tangle:", e);
} }; })(pyBuildCuts);
"use strict";
function pyTgSpot(test, r, tries) {
var S = PY_SNARL;
for (var t = 0; t < (tries || 40); t++) {
var a = Math.random() * 6.283, q = Math.sqrt(Math.random()), x = S.x + Math.cos(a) * S.rx * q, z = S.z + Math.sin(a) * S.rz * q;
if (pySnarlK(x, z) < 0.95 || !pyClear(x, z, r))
continue;
if (test && !test(x, z))
continue;
return [x, z];
}
return null;
}
function pyTgNearRoute(R, r0, r1) {
var L = R.list;
for (var t = 0; t < 30; t++) {
var s = L[Math.random() * L.length | 0];
if (!s || s.w <= 0)
continue;
var sd = Math.random() < 0.5 ? -1 : 1, a = s.w / 2 + r0 + Math.random() * (r1 - r0);
var x = s.x + sd * a * s.tz, z = s.z - sd * a * s.tx;
if (pyClear(x, z, 3))
return [x, z, s];
}
return null;
}
function pyTgRoute(k) { var out = null; (PY.tg || []).forEach(function (R) { if (R.k === k)
out = R; }); return out; }
function pyTgWinTex() { return __ZC(339, 156, this, arguments, new.target); }
function pyTgBox(w, h, d, ux, uy) { var g = new THREE.BoxGeometry(w, h, d); g.translate(0, h / 2, 0); var uv = g.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * (ux || 1), uv.getY(i) * (uy || 1)); return g; }
function pyTgDress(G, routes) {
var L = PY.lite;
pyTgSnarl(G);
routes.forEach(function (R) { try {
pyTgDressRoute(G, R);
}
catch (e) {
if (window.console)
console.warn("pyreline tangle dress:", R.k, e);
} });
}
function pyTgSnarl(G) { return __ZC(339, 157, this, arguments, new.target); }
function pyTgStreets(G, winM, conc) { return __ZC(339, 158, this, arguments, new.target); }
function pyTgDressRoute(G, R) { return __ZC(339, 159, this, arguments, new.target); }
function pyTgTick(dt) { return __ZC(339, 160, this, arguments, new.target); }
pyLandsTick = (function (f) { return function (dt) { f(dt); pyTgTick(dt); }; })(pyLandsTick);
"use strict";
var PY_KNOT = [
{ k: "ashrow", name: "Ash Row", from: 33, to: 37,
pts: [[600, -770, 2.5, 11], [520, -795, 2.5, 11], [440, -815, 2.5, 11], [360, -822, 2.5, 11], [280, -828, 2.5, 11], [200, -850, 2.5, 11], [110, -880, 2.5, 11],
[20, -900, 2.5, 11], [-70, -880, 2.5, 11], [-115, -800, 2.5, 11], [-90, -715, 2.5, 11], [-20, -680, 2.5, 11], [80, -690, 2.5, 11], [180, -700, 2.5, 11],
[290, -690, 2.5, 11], [380, -680, 2.5, 11], [412, -670, 2.5, 11]],
hint: "The Snarl's ring road: off the Furnace Ring, under Scrapline, straight across the Corkscrew, all the way round the old city and back onto the Corkscrew." },
{ k: "cutter", name: "Cutter Street", from: 33, to: 37,
pts: [[165, -1110, 3, 10], [150, -1040, 2.5, 10], [130, -960, 2.5, 10], [112, -880, 2.5, 10], [105, -790, 2.5, 10], [95, -691, 2.5, 10]],
hint: "Straight down the middle of the Snarl from the Corkscrew, across Ash Row twice, under the Gallows Span." },
{ k: "breakneck", name: "Breakneck Row", from: 33, to: 37,
pts: [[140, -1000, 2.5, 10], [60, -1002, 2.5, 10], [-30, -985, 2.5, 10], [-90, -940, 2.5, 10], [-84, -860, 2.5, 10]],
hint: "Out of Cutter Street to the west, round the fallen blocks, onto Ash Row." },
{ k: "crane", name: "Crane Alley", from: 33, to: 37,
pts: [[250, -835, 2.5, 9], [246, -900, 2.5, 9], [231, -962, 2.5, 9]],
hint: "A short alley between Ash Row and the Corkscrew, under the cranes." },
{ k: "knife", name: "Knife Cross", from: 33, to: 37,
pts: [[-102, -760, 2.5, 10], [0, -762, 2.5, 10], [110, -786, 2.5, 10], [220, -782, 2.5, 10], [330, -762, 2.5, 10], [396, -750, 2.5, 10]],
hint: "From the west side of Ash Row across Cutter Street and under the Gallows Span to the Corkscrew." },
{ k: "gallows", name: "the Gallows Span", from: 33, to: 37,
pts: [[565, -620, 3, 10], [490, -612, 6, 10, "e"], [420, -625, 11, 10, "e"], [340, -660, 13, 10, "e"], [260, -720, 13, 10, "e"], [180, -768, 13, 10, "e"],
[100, -805, 13, 10, "e"], [40, -818, 11, 10, "e"], [-10, -845, 7, 10, "e"], [-40, -884, 2.5, 10]],
hint: "A flyover with half its rails gone: up off the Furnace Ring, over the Corkscrew, Ash Row, Knife Cross and Cutter Street, down onto Ash Row." }
];
PY_KNOT.forEach(function (T) { T.tangle = 1; T.street = 1; T.zone = "snarl"; T.tunnel = 0; PY_CUTS.push(T); });
"use strict";
var PY_PICK = {
siege: { name: "Siege rockets", icon: "🚀", n: 2, say: "six homing rockets at once" },
rail: { name: "Thunder rail", icon: "⚡", n: 3, say: "a bolt that hits the car ahead from far away" },
barrel: { name: "Blast barrels", icon: "🛢️", n: 3, say: "a barrel lobbed ahead that bursts wide" },
scatter: { name: "Mine scatter", icon: "💣", n: 2, say: "five mines thrown out behind you" },
inferno: { name: "Inferno cannon", icon: "🔥", n: 2, say: "a long roar of fire ahead" },
hammer: { name: "Sky hammer", icon: "🔨", n: 1, say: "marks the car ahead; a blast comes down on it a moment later" }
};
var PY_PICK_KEYS = Object.keys(PY_PICK);
PY_OFF.siege = { name: "Siege rockets", icon: "🚀", kind: "pick", cool: 1 };
PY_OFF.rail = { name: "Thunder rail", icon: "⚡", kind: "pick", cool: 1 };
PY_OFF.barrel = { name: "a blast barrel", icon: "🛢️", kind: "pick", cool: 1 };
PY_OFF.hammer = { name: "the Sky hammer", icon: "🔨", kind: "pick", cool: 1 };
PY_OFF.sentry = { name: "shell", icon: "🔫", kind: "pick", cool: 1 };
PY_OFF.wball = { name: "wrecking ball", icon: "⚫", kind: "pick", cool: 1 };
PY_OFF.grate = { name: "flame grate", icon: "🔥", kind: "pick", cool: 1 };
PY_OFF.strip = { name: "spike strip", icon: "🦔", kind: "pick", cool: 1 };
PY_OFF.pmine = { name: "buried mine", icon: "💥", kind: "pick", cool: 1 };
(function () {
var by = pyActorById;
pyActorById = function (id) {
if (typeof id === "string" && id.indexOf("trap:") === 0) {
var T = PY.traps && PY.traps.list[+id.slice(5)];
return T ? { id: id, name: T.who, x: T.x, y: T.y + 2, z: T.z, st: {}, trap: 1 } : { id: id, name: "a trap", x: 0, y: 0, z: 0, st: {}, trap: 1 };
}
return by.apply(this, arguments);
};
})();
function pyTrapSpots() { return __ZC(339, 161, this, arguments, new.target); }
function pyTrapPick(pool, used, gap, test) {
for (var t = 0; t < 40; t++) {
var s = pool[Math.random() * pool.length | 0];
if (!s)
return null;
if (test && !test(s))
continue;
var ok = true;
for (var i = 0; i < used.length; i++) {
if (Math.hypot(used[i].x - s.x, used[i].z - s.z) < gap) {
ok = false;
break;
}
}
if (ok)
return s;
}
return null;
}
function pyBuildTraps(G) { return __ZC(339, 162, this, arguments, new.target); }
function pyTrapMat(im, i, x, y, z, ry, sx, sy, sz) { var M = new THREE.Matrix4(), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)); M.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(sx, sy, sz)); im.setMatrixAt(i, M); im.instanceMatrix.needsUpdate = true; }
function pyTrapsTick(dt) { return __ZC(339, 163, this, arguments, new.target); }
function pyPickFire(a) { return __ZC(339, 164, this, arguments, new.target); }
function pyPickTick(dt) { return __ZC(339, 165, this, arguments, new.target); }
function pyPickClear() { (PY.kb || []).forEach(function (B) { if (B.m)
pyGone(B.m); if (B.ring)
pyGone(B.ring); }); PY.kb = []; }
(function () {
var bt = pyBuildTangle;
pyBuildTangle = function (G) { var r = bt.apply(this, arguments); pyBuildTraps(G); return r; };
var tk = pyHaz2Tick;
pyHaz2Tick = function (dt) { var r = tk.apply(this, arguments); pyTrapsTick(dt); return r; };
var cl = pyHazClear;
pyHazClear = function () { var r = cl.apply(this, arguments); pyPickClear(); if (PY.traps) {
PY.traps.list.forEach(function (T) { T.hit = {}; });
} return r; };
var fire = pyFire;
pyFire = function (a) { if (a && a.st && a.st.pick && pyPickFire(a))
return true; return fire.apply(this, arguments); };
})();
"use strict";
function pyKitTex(key, w, h, draw) { if (PY.tex[key])
return PY.tex[key]; PY.tex[key] = wTex(w, h, draw, [1, 1]); return PY.tex[key]; }
function pyKitHex(n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6); }
function pyKitBus(g, car, K) { return __ZC(339, 166, this, arguments, new.target); }
function pyKitIce(g, car, K) { return __ZC(339, 167, this, arguments, new.target); }
function pyKitMech(g, car, K) { return __ZC(339, 168, this, arguments, new.target); }
(function () {
var build = pyBuildCar;
pyBuildCar = function (car, opt) {
var g = build.apply(this, arguments);
if (!car || !/^(bus|icecream|mech)$/.test(car.style))
return g;
var lite = !!((opt && opt.lite) || PY.lite), S = PY_STYLE[car.style], kit = new THREE.Group();
kit.name = "kit";
var K = { L: S.L, W: S.W / 2, clr: S.clr, S: S, lite: lite,
add: function (m) { kit.add(m); return m; },
box: function (w, h, d, x, y, z, mat) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); kit.add(m); return m; },
cyl: function (r, len, x, y, z, mat, ax) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, lite ? 6 : 10), mat); if (ax === "z")
m.rotation.x = Math.PI / 2;
else if (ax === "x")
m.rotation.z = Math.PI / 2; m.position.set(x, y, z); kit.add(m); return m; } };
if (car.style === "bus")
pyKitBus(g, car, K);
else if (car.style === "icecream")
pyKitIce(g, car, K);
else
pyKitMech(g, car, K);
kit.traverse(function (m) { if (m.isMesh) {
m.raycast = function () { };
if (!lite && m.material && !m.material.transparent)
m.castShadow = true;
} });
g.add(kit);
g.userData.kit = kit;
return g;
};
})();
(function () {
var pose = pyArmsPose;
pyArmsPose = function (g, st, dt) { pose.apply(this, arguments); if (g && g.userData.mechGun)
g.userData.mechGun.rotation.z += dt * (st && st.cool > 0 && st.cool > ((PY_OFF[g.userData.car && g.userData.car.off] || {}).cool || 5) - 1 ? 14 : 1.2); };
})();
"use strict";
var PY_PAD = { every: 300, len: 9, kick: 14, dur: 1.6, col: 0x3AF0FF };
function pyPadSpots() { return __ZC(339, 169, this, arguments, new.target); }
function pyPadTex() { return __ZC(339, 170, this, arguments, new.target); }
function pyBuildPads(G) { return __ZC(339, 171, this, arguments, new.target); }
function pyPadsTick(dt) { return __ZC(339, 172, this, arguments, new.target); }
(function () {
var bc = pyBuildCells;
pyBuildCells = function (G) { var r = bc.apply(this, arguments); try {
pyBuildPads(G);
}
catch (e) {
console.warn("pyreline pads", e);
} return r; };
var ct = pyCellsTick;
pyCellsTick = function (dt) { var r = ct.apply(this, arguments); pyPadsTick(dt); return r; };
})();
"use strict";
var RI = { open: false, busy: false, say: "", code: "", res: null, coupons: null, couponsAt: 0 };
var RI_STARTERS = ["slickjaw", "pinwheel", "emberwasp", "rustwraith"];
function riNorm(c) { return typeof giNorm === "function" ? giNorm(c) : String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24); }
function riLooks(c) { c = riNorm(c); return c.length >= 6 && c.length !== 12 && !/^BARD/.test(c); }
function riShow(c) { c = riNorm(c); return c === "SNARLDEATHRACE" ? "SNARL-DEATH-RACE" : c; }
function riSigned() { return typeof signedIn === "function" && signedIn(); }
(function () {
if (document.getElementById("ri-style"))
return;
var s = document.createElement("style");
s.id = "ri-style";
s.textContent =
"#ri-box{position:fixed;z-index:62;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,calc(100vw - 32px));max-height:min(88vh,700px);overflow-y:auto;" +
"border-radius:12px;padding:2px;background:linear-gradient(135deg,#8A1E0A,#FF8A1E 35%,#B8320E 60%,#FFB43A 85%,#6A1406);box-shadow:0 18px 60px rgba(0,0,0,.7);-webkit-overflow-scrolling:touch}" +
"#ri-box .ri-in{border-radius:10px;padding:18px 20px 16px;color:#F6E4CC;font:14px/1.55 var(--sans,system-ui);background:radial-gradient(ellipse at 50% 0%,rgba(255,120,40,.22),transparent 60%),linear-gradient(180deg,#24100A,#140806 70%,#0C0504)}" +
"#ri-box .ri-sub{text-align:center;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#FFB45A}" +
"#ri-box h3{margin:4px 0 6px;text-align:center;font:800 28px/1.05 Impact,'Arial Narrow',var(--sans,system-ui);letter-spacing:.04em;text-transform:uppercase;color:#FFC24A;text-shadow:0 0 14px rgba(255,110,30,.55)}" +
"#ri-box p{margin:9px 0}" +
"#ri-box input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:6px;border:1px solid #B8501E;background:#0C0504;color:#FFF0DC;font:700 18px/1 ui-monospace,Menlo,monospace;letter-spacing:.1em;text-align:center;text-transform:uppercase}" +
"#ri-box .ri-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px}" +
"#ri-box .ri-go{background:linear-gradient(180deg,#FFB43A,#E2581A);color:#1E0A04;border:0;font-weight:700}" +
"#ri-box .ri-say{min-height:18px;text-align:center;color:#FF9A7A;font-size:13px}" +
"#ri-box .ri-got{margin:10px 0;padding:9px 12px;border:1px solid rgba(255,170,60,.5);border-radius:8px;background:rgba(255,140,40,.08)}";
(document.head || document.documentElement).appendChild(s);
})();
function riOpen(code) { if (code)
RI.code = riNorm(code); RI.open = true; RI.say = ""; riPaint(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function riClose() { RI.open = false; riPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return !!RI.open; }, close: riClose });
function riPaint() { return __ZC(339, 173, this, arguments, new.target); }
function riWay() { return __ZC(339, 174, this, arguments, new.target); }
function riRedeem(code, fallback) { return __ZC(339, 175, this, arguments, new.target); }
(function () {
if (typeof giRedeem !== "function")
return;
var gr = giRedeem;
giRedeem = function () {
var self = this, args = arguments;
try {
var f = document.getElementById("gi-code"), c = f ? riNorm(f.value) : (typeof GI !== "undefined" ? GI.code : "");
if (riLooks(c) && riSigned()) {
if (typeof giClose === "function")
giClose();
return riRedeem(c, function () { if (typeof GI !== "undefined")
GI.code = c; if (typeof giOpen === "function")
giOpen(); return gr.apply(self, args); });
}
}
catch (e) { }
return gr.apply(this, arguments);
};
if (typeof giOpen === "function") {
var go = giOpen;
giOpen = function () {
if (typeof GI !== "undefined" && riLooks(GI.code) && !riSigned()) {
return riOpen(GI.code);
}
return go.apply(this, arguments);
};
}
})();
function riCouponsLoad(force) { return __ZC(339, 176, this, arguments, new.target); }
function riCouponFor(k) { return (RI.coupons || 0) > 0 && RI_STARTERS.indexOf(k) >= 0; }
function riUseCoupon(k) {
if (typeof pyActNeed === "function" && !pyActNeed())
return;
cityRpc("race_planet_coupon_use", { p_car: k }).then(function (o) { if (o && o.ok) {
RI.coupons = Math.max(0, (RI.coupons || 1) - 1);
RI.couponsAt = Date.now();
} pyAfter(o, k); })
.catch(function () { pySay("The Motorworks could not be reached."); });
}
var PYLU = { seen: new Set(), proxies: null, warned: false };
function pyluCrownGeo() { return __ZC(339, 177, this, arguments, new.target); }
function pyluCrownMat() { return __ZC(339, 178, this, arguments, new.target); }
function pyluSets() { return [PY.jungle, PY.tangleTrees, PY.pines].filter(function (J) { return J && J.trunk && J.crown && J.trunk.parent; }); }
function pyluProxies() { return __ZC(339, 179, this, arguments, new.target); }
function pyluShow(o, show) { var J = o.J; if (!J || !J.keep)
return; J.all.forEach(function (m, j) { var a = m.instanceMatrix.array, b = J.keep[j], off = o.i * 16; for (var n = 0; n < 16; n++)
a[off + n] = show ? b[off + n] : 0; m.instanceMatrix.needsUpdate = true; }); }
function pyluHook() { return __ZC(339, 180, this, arguments, new.target); }
function pyluPineGeo(snow) { return __ZC(339, 181, this, arguments, new.target); }
function pyluShardGeo() { return __ZC(339, 182, this, arguments, new.target); }
function pyluFernTex() { return __ZC(339, 183, this, arguments, new.target); }
function pyluFernGeo() { var parts = []; for (var i = 0; i < 6; i++) {
var g = new THREE.PlaneGeometry(0.8, 1.6);
g.translate(0, 0.8, 0);
g.rotateX(-0.75 - (i % 2) * 0.2);
g.rotateY(i / 6 * Math.PI * 2);
parts.push(g.toNonIndexed());
} return gwMerge(parts); }
function pyluDress(G) { return __ZC(339, 184, this, arguments, new.target); }
(function () {
if (typeof pyBuildDress !== "function")
return;
var d0 = pyBuildDress;
pyBuildDress = function (G) { var r = d0.apply(this, arguments); try {
pyluDress(G);
}
catch (e) {
if (window.console)
console.warn("[pyreline land] dress", e);
} return r; };
})();
function pyluVolcano(G, x, z, r, h, seed) { return __ZC(339, 185, this, arguments, new.target); }
function pyluGlassGeo() { return __ZC(339, 186, this, arguments, new.target); }
"use strict";
var PYS = { done: false };
function pysR(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function pysMerge(list) { return __ZC(339, 187, this, arguments, new.target); }
function pysB(w, h, d, x, y, z, rx, ry, rz) { var g = new THREE.BoxGeometry(w, h, d); if (rx)
g.rotateX(rx); if (rz)
g.rotateZ(rz); if (ry)
g.rotateY(ry); g.translate(x, y, z); return g; }
function pysC(r0, r1, h, seg, x, y, z, rx, rz) { var g = new THREE.CylinderGeometry(r0, r1, h, seg || 8); if (rx)
g.rotateX(rx); if (rz)
g.rotateZ(rz); g.translate(x, y, z); return g; }
function pysS(r, x, y, z, sy) { var g = new THREE.SphereGeometry(r, 8, 6); if (sy)
g.scale(1, sy, 1); g.translate(x, y, z); return g; }
function pysLimb(r0, r1, h, x, y, z, rx, rz) { return pysC(r0, r1, h, 8, x, y, z, rx, rz); }
function pysTorso(y0, h, lean) {
var pts = [], w = [0.13, 0.17, 0.19, 0.2, 0.21, 0.19, 0.12, 0.06];
for (var i = 0; i < w.length; i++)
pts.push(new THREE.Vector2(w[i], h * i / (w.length - 1)));
var g = new THREE.LatheGeometry(pts, 10);
g.scale(1, 1, 0.62);
if (lean)
g.rotateX(lean);
g.translate(0, y0, 0);
return g;
}
function pysHead(y, z) { var g = new THREE.SphereGeometry(0.108, 12, 10); g.scale(0.92, 1.12, 1); g.translate(0, y, z || 0); return g; }
function pysHair(y, z, R) { var g = new THREE.SphereGeometry(0.118, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55); g.scale(0.95, 1.1, 1.04); g.translate(0, y + 0.012, (z || 0) - 0.012); return g; }
function pysFigGeo() { return __ZC(339, 188, this, arguments, new.target); }
var PYS_SKIN = [0x6A4028, 0x8A5A3A, 0xB07A52, 0xD0A07A, 0xE8C0A0, 0x4A2E1E, 0xC89068];
function pysIM(G, geo, mat, list, shadow) { return __ZC(339, 189, this, arguments, new.target); }
function pysWhite(kind) { return pyMat(kind || "matte", 0xFFFFFF); }
function pysBag() { var B = {}; return { put: function (k, o) { (B[k] || (B[k] = [])).push(o); }, all: B }; }
var PYS_KINDS = null;
function pysKinds() { return __ZC(339, 190, this, arguments, new.target); }
var PYS_SHIRT = [0xC83A2A, 0x2A5AA8, 0xE8E2D8, 0x2A2A2E, 0xE8B83A, 0x3A8A4A, 0x8A3A8A, 0xE87A2A, 0x5AA8C8, 0x6A5A4A, 0xD85A8A];
function pysAt(s, sd, a, f) { return { x: s.x + sd * a * s.tz + (f || 0) * s.tx, z: s.z - sd * a * s.tx + (f || 0) * s.tz }; }
function pysFace(s, sd) { return Math.atan2(-sd * s.tz, sd * s.tx); }
var PYS_LEGS = [0x2A3A5A, 0x1E2230, 0x3A3A3E, 0x4A4234, 0x2A2A2A, 0x5A4A3A, 0x6A6A70];
var PYS_HAIR = [0x1A1410, 0x2A1E14, 0x4A3220, 0x6A4A2A, 0x8A6A3A, 0x2A2A2A, 0xB8A890, 0x5A2A1A];
function pysPerson(B, R, x, y, z, ry, sit, shirts) { return __ZC(339, 191, this, arguments, new.target); }
function pysFree(x, z, r) {
if (!pyClear(x, z, r))
return false;
var S = PY.solids || [];
for (var i = 0; i < S.length; i++) {
var o = S[i], rr = Math.max(o.hw || 0, o.hd || 0) + r;
if (Math.abs(o.x - x) < rr && Math.abs(o.z - z) < rr)
return false;
}
return true;
}
function pysOk(s, x, z, r) {
if (!pysFree(x, z, r))
return null;
var y = pyGround(x, z);
if (Math.abs(y - s.y) > 4)
return null;
if (s.zone === "lava" && pyTerrain(x, z) < PY_LAVA + 0.3)
return null;
if ((s.zone === "ice" || s.zone === "coast") && pyTerrain(x, z) < PY_WATER)
return null;
return y;
}
var PYS_TEAMS = [0xC8201A, 0x1A4AA8, 0xE8B81A, 0x1A8A4A, 0x2A2A2E, 0xE85A1A, 0x8A1AA8];
function pysStation(B, R, s, sd, talk) { return __ZC(339, 192, this, arguments, new.target); }
function pysVerge(B, R, s, sd) { return __ZC(339, 193, this, arguments, new.target); }
function pysGrandstand(B, R) { return __ZC(339, 194, this, arguments, new.target); }
function pysSnarlCamp(B, R) { return __ZC(339, 195, this, arguments, new.target); }
var PYS_TALK = {
paddock: ["py-sw-mech", "Team mechanic", { name: "Rook Adair", persona: "Rook Adair, a team mechanic in the Redline Paddock: oil to the elbows, talks about cars as if they were moody animals, proud of the team's gazebo and its tyre stacks. Friendly, quick, a bit of a gossip about which drivers wreck the most.", greet: "Mind the tyres. They're warmer than they look." }],
canyon: ["py-sw-fan", "Canyon fan", { name: "Della Pike", persona: "Della Pike, a race fan who camps out every season on the rocks of Sunscour Canyon under a shade sail with her truck and her cool box. Sunburnt, cheerful, knows exactly which bend makes the best crashes and the best dust.", greet: "Pull up a chair, the next lot come through in a minute." }],
storm: ["py-sw-umb", "Bluffs fan", { name: "Ewan Strake", persona: "Ewan Strake, a fan standing out on Stormbreak Bluffs under his umbrella. Dry humour, wet boots; reckons rain makes the best racing and the wind turbines are the planet's own audience.", greet: "Lovely weather for it, eh?" }],
lava: ["py-sw-marshal", "Caldera marshal", { name: "Ines Varo", persona: "Ines Varo, a fire marshal in a concrete bunker by the road through Cinderdeep Caldera. Calm, serious, kind; has pulled drivers out of burning cars and tells people to keep off the crust, it is thinner than it looks.", greet: "Stay behind the bunker. The crust is thinner than it looks." }],
cave: ["py-sw-miner", "Old miner", { name: "Hollis Grube", persona: "Hollis Grube, an old miner who keeps the lanterns lit along the Gloamdeep for the races. Quiet, gentle, loves the glowing crystals and mushrooms, thinks the cars are too loud but likes the drivers.", greet: "Keep to the light. The Gloamdeep is kind if you're careful." }],
sky: ["py-sw-neon", "Skyway fan", { name: "Juno Vex", persona: "Juno Vex, a fan on a lit platform beside the Neon Skyway: glitter, sharp wit, follows every driver's numbers and loves the night section best.", greet: "The Skyway's the best bit. Don't tell the canyon lot." }],
snarl: ["py-sw-snarl", "Snarl cook", { name: "Mags Tolver", persona: "Mags Tolver, who runs a food cart in a race fans' camp in the Snarl, the given-up megacity. Tough, warm, feeds anyone; tells tales of the city before the races took it.", greet: "Hungry? There's stew, and there's more stew." }],
tundra: ["py-sw-parka", "Pass fan", { name: "Sten Hallow", persona: "Sten Hallow, a fan in a thick parka keeping warm by a fire drum on Rimeglass Pass. Slow-spoken, happy, says the ice teaches drivers manners.", greet: "Come warm your hands. The ice is mean today." }]
};
function pysTalkers(G) { return __ZC(339, 196, this, arguments, new.target); }
function pysSweep(G) { return __ZC(339, 197, this, arguments, new.target); }
(function () {
var f = pyBuildAll;
pyBuildAll = function (G) { var r = f.apply(this, arguments); try {
pysSweep(G);
}
catch (e) {
if (window.console)
console.warn("pyreline sweep:", e);
} return r; };
})();
