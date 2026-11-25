/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BW = { base: -400000, f: [], shots: [], fx: [], beams: [], solids: [], mach: [], plat: [], bridges: [], talk: [], dummies: [], seq: 0,
hp: 100, max: 100, downT: 0, quietT: 0, cool: 0, block: false, heat: 0, hurt: 0, hurtShow: 0, fade: 0, swing: 0, kick: 0,
wave: null, ride: null, vm: null, vmKey: null, hud: null, vig: null, pad: null, dark: null, glowTex: null, mats: {},
net: { since: 0, at: 0, busy: false, sides: {}, missing: false, meAt: 0 }, sayAt: 0, zoneAt: null, trebT: 0, dragon: null, ships: [], planes: [], t: 0 };
var BW_TRUCE = 50;
var BW_ARMS = {
longsword: { name: "Longsword", held: "sword", kind: "melee", dmg: 18, reach: 2.4, arc: 0.9, cool: 0.55, era: "Blades" },
katana: { name: "Katana", held: "bwKatana", kind: "melee", dmg: 16, reach: 2.5, arc: 0.8, cool: 0.4, era: "Blades" },
greatsword: { name: "Greatsword", held: "bwGreatsword", kind: "melee", dmg: 30, reach: 2.9, arc: 1.3, cool: 1.0, cleave: true, era: "Blades" },
cutlass: { name: "Cutlass", held: "machete", kind: "melee", dmg: 15, reach: 2.1, arc: 0.9, cool: 0.42, era: "Blades" },
dagger: { name: "Twin daggers", held: "dagger", kind: "melee", dmg: 10, reach: 1.7, arc: 0.8, cool: 0.22, era: "Blades" },
beamblade: { name: "Beam blade", held: "bwBeam", kind: "melee", dmg: 22, reach: 2.5, arc: 1.0, cool: 0.45, era: "Blades" },
battleaxe: { name: "Battle-axe", held: "axe", kind: "melee", dmg: 24, reach: 2.2, arc: 1.0, cool: 0.75, era: "Axes and hammers" },
warhammer: { name: "War hammer", held: "bwHammer", kind: "melee", dmg: 28, reach: 2.2, arc: 0.9, cool: 0.9, knock: 2.5, era: "Axes and hammers" },
mace: { name: "Flanged mace", held: "club", kind: "melee", dmg: 20, reach: 2.0, arc: 0.9, cool: 0.65, era: "Axes and hammers" },
spear: { name: "Spear", held: "spear", kind: "melee", dmg: 17, reach: 3.3, arc: 0.5, cool: 0.6, era: "Pole arms" },
halberd: { name: "Halberd", held: "glaive", kind: "melee", dmg: 23, reach: 3.4, arc: 0.9, cool: 0.85, cleave: true, era: "Pole arms" },
trident: { name: "Gladiator's trident", held: "trident", kind: "melee", dmg: 19, reach: 3.1, arc: 0.6, cool: 0.6, era: "Pole arms" },
quarterstaff: { name: "Quarterstaff", held: "staff", kind: "melee", dmg: 14, reach: 2.6, arc: 1.1, cool: 0.45, era: "Pole arms" },
longbow: { name: "Longbow", held: "bow", kind: "shot", p: "arrow", dmg: 20, spd: 48, cool: 0.9, era: "Bows and throwing" },
crossbow: { name: "Crossbow", held: "bwCrossbow", kind: "shot", p: "bolt", dmg: 26, spd: 58, cool: 1.2, era: "Bows and throwing" },
flintlock: { name: "Flintlock pistol", held: "bwPistol", kind: "shot", p: "ball", dmg: 28, spd: 75, cool: 1.4, era: "Firearms" },
musket: { name: "Musket", held: "bwRifle", kind: "shot", p: "ball", dmg: 34, spd: 85, cool: 1.8, era: "Firearms" },
revolver: { name: "Six-shooter", held: "bwPistol", kind: "shot", p: "bullet", dmg: 14, spd: 90, cool: 0.32, era: "Firearms" },
rifle: { name: "Bolt-action rifle", held: "bwRifle", kind: "shot", p: "bullet", dmg: 30, spd: 100, cool: 1.0, era: "Firearms" },
trenchgun: { name: "Trench machine gun", held: "bwRifle", kind: "shot", p: "bullet", dmg: 7, spd: 95, cool: 0.12, spread: 0.03, era: "Firearms" },
grenade: { name: "Grenades", held: "bwGrenade", kind: "throw", p: "grenade", dmg: 40, spd: 17, cool: 2.4, splash: 4, era: "Firearms" },
blaster: { name: "Blaster", held: "bwBlaster", kind: "shot", p: "laser", dmg: 16, spd: 60, cool: 0.3, era: "Star weapons" },
plasma: { name: "Plasma rifle", held: "bwBlaster", kind: "shot", p: "plasma", dmg: 32, spd: 45, cool: 0.9, splash: 2.2, era: "Star weapons" },
firestaff: { name: "Staff of embers", held: "bwStaff", kind: "shot", p: "fire", dmg: 24, spd: 26, cool: 0.8, splash: 2.2, era: "Magic" },
froststaff: { name: "Staff of frost", held: "bwStaff", kind: "shot", p: "frost", dmg: 16, spd: 32, cool: 0.6, slow: 2.5, era: "Magic" },
stormrod: { name: "Storm rod", held: "bwStaff", kind: "shot", p: "spark", dmg: 21, spd: 85, cool: 0.7, era: "Magic" },
flamer: { name: "Flame projector", held: "bwFlamer", kind: "cone", dmg: 5, reach: 7, arc: 0.35, cool: 0.12, era: "Star weapons" },
sling: { name: "Shepherd's sling", held: "bwSling", kind: "shot", p: "stone", dmg: 14, spd: 40, cool: 0.7, era: "Ancient" },
javelin: { name: "Atlatl javelin", held: "spear", kind: "shot", p: "javelin", dmg: 30, spd: 38, cool: 1.3, era: "Ancient" },
pilum: { name: "Legion pilum", held: "spear", kind: "shot", p: "javelin", dmg: 36, spd: 34, cool: 1.6, pierce: 1, era: "Ancient" },
gladius: { name: "Gladius", held: "machete", kind: "melee", dmg: 15, reach: 1.9, arc: 0.8, cool: 0.35, era: "Ancient" },
khopesh: { name: "Bronze khopesh", held: "bwKhopesh", kind: "melee", dmg: 17, reach: 2.1, arc: 1.0, cool: 0.5, era: "Ancient" },
macuahuitl: { name: "Obsidian-edged club", held: "bwMacuahuitl", kind: "melee", dmg: 22, reach: 2.2, arc: 1.0, cool: 0.7, era: "Ancient" },
roundshield: { name: "Hoplite shield and spear", held: "bwShield", kind: "melee", dmg: 15, reach: 2.9, arc: 0.5, cool: 0.55, ward: 0.6, era: "Ancient" },
rapier: { name: "Rapier", held: "bwRapier", kind: "melee", dmg: 13, reach: 2.6, arc: 0.4, cool: 0.3, era: "Blades" },
claymore: { name: "Highland claymore", held: "bwGreatsword", kind: "melee", dmg: 32, reach: 3.0, arc: 1.3, cool: 1.05, cleave: true, era: "Blades" },
scimitar: { name: "Scimitar", held: "bwKhopesh", kind: "melee", dmg: 16, reach: 2.2, arc: 1.0, cool: 0.42, era: "Blades" },
morningstar: { name: "Morning star", held: "bwMorningstar", kind: "melee", dmg: 24, reach: 2.1, arc: 0.9, cool: 0.75, era: "Axes and hammers" },
flail: { name: "War flail", held: "bwFlail", kind: "melee", dmg: 26, reach: 2.6, arc: 1.2, cool: 0.85, cleave: true, era: "Axes and hammers" },
scythe: { name: "War scythe", held: "bwScythe", kind: "melee", dmg: 25, reach: 3.2, arc: 1.4, cool: 0.9, cleave: true, era: "Pole arms" },
lance: { name: "Jousting lance", held: "bwLance", kind: "melee", dmg: 34, reach: 4.0, arc: 0.3, cool: 1.2, knock: 3, era: "Pole arms" },
horsebow: { name: "Horse bow", held: "bow", kind: "shot", p: "arrow", dmg: 15, spd: 52, cool: 0.5, era: "Bows and throwing" },
arbalest: { name: "Arbalest", held: "bwCrossbow", kind: "shot", p: "bolt", dmg: 40, spd: 70, cool: 2.0, pierce: 1, era: "Bows and throwing" },
shuriken: { name: "Throwing stars", held: "bwStar", kind: "shot", p: "star", dmg: 9, spd: 46, cool: 0.5, pellets: 3, spread: 0.08, era: "Bows and throwing" },
chakram: { name: "Chakram", held: "bwDisc", kind: "shot", p: "disc", dmg: 20, spd: 30, cool: 1.0, back: 1, pierce: 2, era: "Bows and throwing" },
firepot: { name: "Greek-fire pot", held: "bwGrenade", kind: "throw", p: "firepot", dmg: 30, spd: 16, cool: 2.2, splash: 3.5, era: "Bows and throwing" },
blunderbuss: { name: "Blunderbuss", held: "bwShotgun", kind: "shot", p: "ball", dmg: 9, spd: 70, cool: 1.6, pellets: 7, spread: 0.14, era: "Firearms" },
handcannon: { name: "Hand cannon", held: "bwShotgun", kind: "shot", p: "ball", dmg: 45, spd: 55, cool: 2.4, splash: 1.5, era: "Firearms" },
leveraction: { name: "Lever-action rifle", held: "bwRifle", kind: "shot", p: "bullet", dmg: 24, spd: 95, cool: 0.6, era: "Firearms" },
shotgun: { name: "Double-barrel shotgun", held: "bwShotgun", kind: "shot", p: "bullet", dmg: 8, spd: 85, cool: 0.9, pellets: 8, spread: 0.11, era: "Firearms" },
smg: { name: "Drum-fed submachine gun", held: "bwSmg", kind: "shot", p: "bullet", dmg: 6, spd: 85, cool: 0.08, spread: 0.05, era: "Firearms" },
assault: { name: "Assault rifle", held: "bwAssault", kind: "shot", p: "bullet", dmg: 11, spd: 110, cool: 0.11, spread: 0.02, era: "Firearms" },
sniper: { name: "Long-range sniper rifle", held: "bwSniper", kind: "shot", p: "bullet", dmg: 75, spd: 170, cool: 2.2, pierce: 1, era: "Firearms" },
flaregun: { name: "Flare pistol", held: "bwPistol", kind: "shot", p: "flare", dmg: 16, spd: 40, cool: 1.0, splash: 1.4, era: "Firearms" },
gatling: { name: "Gatling gun", held: "bwGatling", kind: "shot", p: "bullet", dmg: 6, spd: 100, cool: 0.05, spread: 0.04, era: "Heavy weapons" },
bazooka: { name: "Rocket launcher", held: "bwLauncher", kind: "shot", p: "rocket", dmg: 70, spd: 34, cool: 2.6, splash: 4, era: "Heavy weapons" },
grenadelauncher: { name: "Grenade launcher", held: "bwLauncher", kind: "throw", p: "grenade", dmg: 42, spd: 24, cool: 1.3, splash: 4, era: "Heavy weapons" },
mortar: { name: "Field mortar", held: "bwLauncher", kind: "throw", p: "shell", dmg: 60, spd: 28, cool: 3.0, splash: 5, lob: 0.55, era: "Heavy weapons" },
railgun: { name: "Rail gun", held: "bwRail", kind: "shot", p: "rail", dmg: 65, spd: 220, cool: 1.8, pierce: 4, era: "Star weapons" },
pulserifle: { name: "Pulse rifle", held: "bwBlaster", kind: "shot", p: "laser", dmg: 12, spd: 75, cool: 0.16, spread: 0.015, era: "Star weapons" },
arccaster: { name: "Arc caster", held: "bwArc", kind: "beam", col: 0xBFE0FF, dmg: 18, reach: 22, cool: 0.55, chain: 3, era: "Star weapons" },
ioncannon: { name: "Ion cannon", held: "bwLauncher", kind: "shot", p: "ion", dmg: 55, spd: 40, cool: 2.0, splash: 3.5, slow: 2, era: "Star weapons" },
gravhammer: { name: "Gravity hammer", held: "bwHammer", kind: "melee", dmg: 34, reach: 2.4, arc: 1.1, cool: 1.1, knock: 6, aoe: 3.5, era: "Star weapons" },
monowhip: { name: "Mono-wire whip", held: "bwWhip", kind: "melee", dmg: 16, reach: 4.6, arc: 1.4, cool: 0.5, cleave: true, era: "Star weapons" },
smartdisc: { name: "Returning smart-disc", held: "bwDisc", kind: "shot", p: "sdisc", dmg: 24, spd: 34, cool: 0.9, back: 1, pierce: 3, era: "Star weapons" },
freezeray: { name: "Freeze ray", held: "bwArc", kind: "beam", col: 0xBFE8F8, dmg: 10, reach: 20, cool: 0.35, slow: 3, era: "Star weapons" },
lasersniper: { name: "Laser marksman rifle", held: "bwSniper", kind: "beam", col: 0xFF6A5A, dmg: 55, reach: 120, cool: 1.6, era: "Star weapons" },
micromissiles: { name: "Micro-missile pod", held: "bwLauncher", kind: "shot", p: "rocket", dmg: 20, spd: 30, cool: 1.8, pellets: 4, spread: 0.1, splash: 2, era: "Star weapons" },
sonic: { name: "Sonic cannon", held: "bwLauncher", kind: "cone", dmg: 9, reach: 9, arc: 0.45, cool: 0.6, knock: 4, puff: 0xC8D8E8, era: "Star weapons" },
sparkwand: { name: "Wand of chain lightning", held: "bwWand", kind: "beam", col: 0xD8E8FF, dmg: 16, reach: 24, cool: 0.6, chain: 4, era: "Magic" },
stonestaff: { name: "Staff of stone", held: "bwStaff", kind: "throw", p: "boulder", dmg: 45, spd: 26, cool: 1.6, splash: 3, era: "Magic" },
shadowtome: { name: "Tome of shadows", held: "bwTome", kind: "shot", p: "orb", dmg: 28, spd: 28, cool: 0.9, pierce: 3, era: "Magic" },
thornstaff: { name: "Druid's thorn staff", held: "bwStaff", kind: "shot", p: "thorn", dmg: 12, spd: 40, cool: 0.45, pellets: 3, spread: 0.06, slow: 1.5, era: "Magic" },
windfan: { name: "Fan of the four winds", held: "bwFan", kind: "cone", dmg: 6, reach: 10, arc: 0.6, cool: 0.7, knock: 7, puff: 0xE8F0F0, era: "Magic" },
lightstaff: { name: "Staff of dawnlight", held: "bwStaff", kind: "beam", col: 0xFFE8A0, dmg: 24, reach: 40, cool: 0.8, era: "Magic" },
arcanefist: { name: "Gauntlet of arcane missiles", held: "bwGauntlet", kind: "shot", p: "arcane", dmg: 11, spd: 36, cool: 0.7, pellets: 3, spread: 0.09, era: "Magic" },
mendstaff: { name: "Staff of mending", held: "bwStaff", kind: "self", heal: 35, cool: 4, era: "Magic" },
bonescythe: { name: "Necromancer's scythe", held: "bwScythe", kind: "melee", dmg: 22, reach: 3.0, arc: 1.3, cool: 0.8, cleave: true, leech: 0.3, era: "Magic" },
sunblade: { name: "Sunforged Blade", held: "bwSunblade", kind: "melee", dmg: 30, reach: 2.6, arc: 1.1, cool: 0.6, aoe: 3, burn: 1, era: "Artifacts" },
tidetrident: { name: "Tidecaller's Trident", held: "trident", kind: "shot", p: "wave", dmg: 40, spd: 24, cool: 1.4, splash: 4.5, slow: 2.5, era: "Artifacts" },
thundermaul: { name: "Thunderhead Maul", held: "bwHammer", kind: "melee", dmg: 36, reach: 2.4, arc: 1.1, cool: 1.0, knock: 4, chain: 4, era: "Artifacts" },
wyrmbow: { name: "Wyrmbone Longbow", held: "bow", kind: "shot", p: "wyrm", dmg: 42, spd: 80, cool: 0.9, pierce: 5, era: "Artifacts" },
starfall: { name: "Starfall Gauntlet", held: "bwGauntlet", kind: "shot", p: "star2", dmg: 18, spd: 44, cool: 1.0, pellets: 7, spread: 0.12, splash: 1.2, era: "Artifacts" },
barrowcrown: { name: "Crown of the Barrow King", held: "bwCrown", kind: "summon", summon: "skeleton", n: 3, life: 40, cool: 20, era: "Artifacts" },
voidorb: { name: "Voidglass Orb", held: "bwOrb", kind: "beam", col: 0xB07AFF, dmg: 48, reach: 50, cool: 1.1, pierce: 1, era: "Artifacts" },
dawnaegis: { name: "Aegis of Dawn", held: "bwShield", kind: "melee", dmg: 18, reach: 2.0, arc: 1.2, cool: 0.6, ward: 0.35, knock: 3, era: "Artifacts" },
moonscythe: { name: "Moonsilver Scythe", held: "bwScythe", kind: "melee", dmg: 30, reach: 3.2, arc: 1.5, cool: 0.8, cleave: true, leech: 0.4, era: "Artifacts" },
stillhour: { name: "Hourglass of the Still Hour", held: "bwHourglass", kind: "nova", dmg: 10, reach: 14, slow: 5, cool: 12, col: 0xD8C8FF, era: "Artifacts" },
heartlance: { name: "Dragonheart Lance", held: "bwLance", kind: "beam", col: 0xFF9A4A, dmg: 38, reach: 45, cool: 1.0, burn: 1, splash: 2.5, era: "Artifacts" },
phoenixfan: { name: "Phoenix-feather Fan", held: "bwFan", kind: "cone", dmg: 8, reach: 9, arc: 0.55, cool: 0.25, era: "Artifacts" }
};
var BW_NPCARMS = {
claws: { kind: "melee", dmg: 12, reach: 2.0, arc: 1.2 }, bite: { kind: "melee", dmg: 16, reach: 2.4, arc: 1.0 }, fists: { kind: "melee", dmg: 9, reach: 1.8, arc: 1.0 },
club: { kind: "melee", dmg: 22, reach: 2.8, arc: 1.2 }, stomp: { kind: "melee", dmg: 30, reach: 3.6, arc: 1.6 },
breath: { kind: "shot", p: "fire", dmg: 22, spd: 22, splash: 3.2 }, shell: { kind: "throw", p: "shell", dmg: 40, spd: 40, splash: 4 },
boulder: { kind: "throw", p: "boulder", dmg: 60, spd: 34, splash: 5 }, mechgun: { kind: "shot", p: "laser", dmg: 12, spd: 60 }, rocket: { kind: "shot", p: "rocket", dmg: 30, spd: 30, splash: 3 },
titanrail: { kind: "shot", p: "rail", dmg: 70, spd: 180, splash: 2.5 }, spiderlaser: { kind: "shot", p: "laser", dmg: 14, spd: 70 }
};
function bwArm(k) { return BW_ARMS[k] || BW_NPCARMS[k] || BW_ARMS.longsword; }
var BW_ERAS = ["Ancient", "Blades", "Axes and hammers", "Pole arms", "Bows and throwing", "Firearms", "Heavy weapons", "Star weapons", "Magic", "Artifacts"];
(function () {
if (typeof HELD === "undefined")
return;
var steel = 0xB8BCC4, dark = 0x2A2622, wood = 0x6B4A32;
HELD.bwKatana = function () { var g = new THREE.Group(); g.add(P(box(.035, .95, .012), mL(0xD8DCE2), 0, .55, 0, 0, 0, -.04)); g.add(P(cyl(.06, .06, .015, 10), mL(0x8A6A2A), 0, .07, 0)); g.add(P(cyl(.02, .02, .28), mL(0x1A1A22), 0, -.08, 0)); return g; };
HELD.bwGreatsword = function () { var g = new THREE.Group(); g.add(P(box(.09, 1.35, .02), mL(steel), 0, .78, 0)); g.add(P(box(.36, .05, .06), mL(0x6A5A3A), 0, .08, 0)); g.add(P(cyl(.024, .024, .38), mL(0x3A2A1E), 0, -.12, 0)); g.add(P(sph(.04), mL(0x6A5A3A), 0, -.33, 0)); return g; };
HELD.bwHammer = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .025, 1.0), mL(wood), 0, .25, 0)); g.add(P(box(.34, .18, .18), mL(0x5A5C62), 0, .78, 0)); g.add(P(cone(.05, .14, 4), mL(0x5A5C62), .22, .78, 0, 0, 0, -Math.PI / 2)); return g; };
HELD.bwBeam = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .025, .26), mL(0x3A3A40), 0, 0, 0)); var b = P(cyl(.022, .022, 1.0, 8), mG(0xFF6A4A, 0.85), 0, .62, 0); g.add(b); return g; };
HELD.bwCrossbow = function () { var g = new THREE.Group(); g.add(P(box(.06, .06, .6), mL(wood), 0, .05, .15)); g.add(P(tor(.32, .014, Math.PI), mL(0x4A4A4A), 0, .05, .36, Math.PI / 2, 0, 0)); return g; };
HELD.bwPistol = function () { var g = new THREE.Group(); g.add(P(box(.05, .05, .32), mL(dark), 0, .06, .12)); g.add(P(box(.045, .14, .06), mL(wood), 0, -.02, -.02, -.3, 0, 0)); return g; };
HELD.bwRifle = function () { var g = new THREE.Group(); g.add(P(box(.05, .06, 1.0), mL(dark), 0, .06, .3)); g.add(P(box(.07, .1, .36), mL(wood), 0, .0, -.2)); return g; };
HELD.bwBlaster = function () { var g = new THREE.Group(); g.add(P(box(.08, .1, .5), mL(0xD8DCE4), 0, .06, .16)); g.add(P(cyl(.025, .025, .2, 8), mL(0x3A3A44), 0, .06, .48, Math.PI / 2, 0, 0)); g.add(P(box(.05, .14, .07), mL(0x3A3A44), 0, -.04, -.02)); g.add(P(box(.02, .02, .2), mG(0x6AE0FF, 0.8), 0, .12, .16)); return g; };
HELD.bwGrenade = function () { var g = new THREE.Group(); g.add(P(sph(.07), mL(0x4A5A3A), 0, .05, 0)); g.add(P(cyl(.02, .02, .05), mL(0x8A8A8A), 0, .13, 0)); return g; };
HELD.bwStaff = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .03, 1.8), mL(0x5A3A22), 0, .3, 0)); g.add(P(sph(.09), mG(0xFFB060, 0.85), 0, 1.25, 0)); return g; };
HELD.bwFlamer = function () { var g = new THREE.Group(); g.add(P(cyl(.05, .05, .7, 10), mL(0x5A5A50), 0, .06, .2, Math.PI / 2, 0, 0)); g.add(P(cyl(.1, .1, .4, 10), mL(0x8A3A2A), 0, -.05, -.18, Math.PI / 2, 0, 0)); return g; };
var bronze = 0xB8883A, gold = 0xE8C060;
HELD.bwSling = function () { var g = new THREE.Group(); g.add(P(cyl(.006, .006, .6, 4), mL(0x8A6A4A), 0, .3, 0)); g.add(P(sph(.05), mL(0x8A8478), 0, .6, 0)); return g; };
HELD.bwKhopesh = function () { var g = new THREE.Group(); g.add(P(cyl(.022, .022, .26), mL(wood), 0, -.02, 0)); g.add(P(box(.04, .4, .012), mL(bronze), 0, .32, 0)); g.add(P(tor(.14, .02, Math.PI * 0.9), mL(bronze), .12, .55, 0, 0, 0, Math.PI / 2)); return g; };
HELD.bwMacuahuitl = function () { var g = new THREE.Group(); g.add(P(box(.1, .9, .03), mL(wood), 0, .45, 0)); for (var i = 0; i < 6; i++) {
g.add(P(box(.04, .06, .02), mL(0x1A1A22), .065, .2 + i * .12, 0));
g.add(P(box(.04, .06, .02), mL(0x1A1A22), -.065, .2 + i * .12, 0));
} return g; };
HELD.bwShield = function () { var g = new THREE.Group(); g.add(P(cyl(.36, .36, .05, 20), mL(bronze), 0, .1, -.12, Math.PI / 2, 0, 0)); g.add(P(sph(.07), mL(gold), 0, .1, -.16)); g.add(P(cyl(.018, .018, 1.6), mL(wood), .25, .5, 0)); g.add(P(cone(.04, .16, 4), mL(steel), .25, 1.35, 0)); return g; };
HELD.bwRapier = function () { var g = new THREE.Group(); g.add(P(cyl(.007, .01, 1.0, 6), mL(0xE0E4EA), 0, .6, 0)); g.add(P(tor(.06, .008, Math.PI * 1.6), mL(gold), 0, .1, 0, 0, Math.PI / 2, 0)); g.add(P(cyl(.018, .018, .18), mL(0x3A2A1E), 0, -.02, 0)); return g; };
HELD.bwMorningstar = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .025, .7), mL(wood), 0, .25, 0)); g.add(P(sph(.12), mL(0x5A5C62), 0, .66, 0)); for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.28;
g.add(P(cone(.025, .1, 4), mL(steel), Math.cos(a) * .12, .66 + (i % 2 ? .06 : -.06), Math.sin(a) * .12, 0, 0, -Math.PI / 2 + a));
} return g; };
HELD.bwFlail = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .025, .55), mL(wood), 0, .18, 0)); for (var i = 0; i < 4; i++)
g.add(P(tor(.03, .008, Math.PI * 2), mL(0x6A6A70), 0, .5 + i * .06, 0)); g.add(P(sph(.11), mL(0x4A4A50), .06, .78, 0)); return g; };
HELD.bwScythe = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .025, 1.7), mL(0x3A2A22), 0, .5, 0)); g.add(P(box(.6, .09, .012), mL(0xC8CCD4), -.28, 1.3, 0, 0, 0, -.35)); return g; };
HELD.bwLance = function () { var g = new THREE.Group(); g.add(P(cone(.07, 2.2, 10), mL(0xD8C8A8), 0, 1.2, 0)); g.add(P(cone(.14, .3, 12), mL(steel), 0, .12, 0, Math.PI, 0, 0)); return g; };
HELD.bwStar = function () { var g = new THREE.Group(); for (var i = 0; i < 4; i++)
g.add(P(box(.03, .16, .005), mL(steel), 0, .08, 0, 0, 0, i * Math.PI / 4)); return g; };
HELD.bwDisc = function () { var g = new THREE.Group(); g.add(P(tor(.13, .025, Math.PI * 2), mL(steel), 0, .12, 0)); g.add(P(cyl(.05, .05, .02, 10), mG(0x6AC8FF, 0.6), 0, .12, 0, Math.PI / 2, 0, 0)); return g; };
HELD.bwShotgun = function () { var g = new THREE.Group(); g.add(P(box(.07, .06, .75), mL(dark), 0, .06, .25)); g.add(P(box(.07, .1, .32), mL(wood), 0, 0, -.18)); return g; };
HELD.bwSmg = function () { var g = new THREE.Group(); g.add(P(box(.06, .08, .5), mL(dark), 0, .06, .15)); g.add(P(cyl(.1, .1, .06, 14), mL(0x3A3A3A), 0, -.03, .12, 0, 0, Math.PI / 2)); g.add(P(box(.05, .12, .06), mL(wood), 0, -.04, -.08)); return g; };
HELD.bwAssault = function () { var g = new THREE.Group(); g.add(P(box(.06, .08, .8), mL(0x2A2A2E), 0, .06, .22)); g.add(P(box(.04, .16, .06), mL(0x2A2A2E), 0, -.06, .18, .3, 0, 0)); g.add(P(box(.06, .1, .28), mL(0x3A3A3E), 0, .02, -.2)); return g; };
HELD.bwSniper = function () { var g = new THREE.Group(); g.add(P(box(.05, .06, 1.25), mL(0x2A2E2A), 0, .06, .38)); g.add(P(cyl(.03, .03, .3, 10), mL(0x1A1A1A), 0, .13, .1, Math.PI / 2, 0, 0)); g.add(P(box(.07, .1, .34), mL(0x3A3E36), 0, 0, -.22)); return g; };
HELD.bwGatling = function () { var g = new THREE.Group(); for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28;
g.add(P(cyl(.018, .018, .9, 6), mL(0x3A3A3A), Math.cos(a) * .06, .06 + Math.sin(a) * .06, .3, Math.PI / 2, 0, 0));
} g.add(P(box(.16, .16, .3), mL(0x4A4A40), 0, .06, -.1)); return g; };
HELD.bwLauncher = function () { var g = new THREE.Group(); g.add(P(cyl(.08, .08, 1.1, 12), mL(0x4A5A3A), 0, .1, .2, Math.PI / 2, 0, 0)); g.add(P(box(.05, .14, .06), mL(0x2A2A2A), 0, -.04, .05)); return g; };
HELD.bwRail = function () { var g = new THREE.Group(); g.add(P(box(.03, .06, 1.0), mL(0xC8CCD4), .04, .06, .3)); g.add(P(box(.03, .06, 1.0), mL(0xC8CCD4), -.04, .06, .3)); g.add(P(box(.03, .03, .9), mG(0x6AC8FF, 0.7), 0, .06, .32)); g.add(P(box(.07, .12, .3), mL(0x3A3A44), 0, 0, -.15)); return g; };
HELD.bwArc = function () { var g = new THREE.Group(); g.add(P(box(.07, .09, .4), mL(0x8A8E96), 0, .06, .1)); for (var i = 0; i < 3; i++)
g.add(P(tor(.06, .01, Math.PI * 2), mL(0xB87333), 0, .06, .24 + i * .07)); g.add(P(sph(.04), mG(0xBFE0FF, 0.8), 0, .06, .46)); return g; };
HELD.bwWhip = function () { var g = new THREE.Group(); g.add(P(cyl(.025, .025, .24), mL(0x2A2A30), 0, 0, 0)); for (var i = 0; i < 8; i++)
g.add(P(cyl(.006, .006, .2, 4), mG(0x9AE8FF, 0.6), Math.sin(i * .6) * .05, .2 + i * .18, 0)); return g; };
HELD.bwWand = function () { var g = new THREE.Group(); g.add(P(cyl(.012, .02, .45, 8), mL(0x4A3022), 0, .18, 0)); g.add(P(sph(.035), mG(0xD8E8FF, 0.85), 0, .42, 0)); return g; };
HELD.bwTome = function () { var g = new THREE.Group(); g.add(P(box(.22, .28, .06), mL(0x2A1A3A), 0, .1, 0)); g.add(P(box(.2, .26, .05), mL(0xE8E0C8), .012, .1, 0)); g.add(P(sph(.03), mG(0xB07AFF, 0.8), 0, .1, .035)); return g; };
HELD.bwFan = function () { var g = new THREE.Group(); for (var i = 0; i < 7; i++)
g.add(P(box(.06, .36, .006), mL(i % 2 ? 0xE84A2A : 0xF0C060), 0, .2, 0, 0, 0, (i - 3) * 0.22)); return g; };
HELD.bwGauntlet = function () { var g = new THREE.Group(); g.add(P(box(.12, .16, .1), mL(0x6A5A8A), 0, .06, 0)); g.add(P(cyl(.06, .07, .18, 8), mL(0x5A4A7A), 0, -.08, 0)); g.add(P(sph(.035), mG(0xC8A8FF, 0.85), 0, .08, .06)); return g; };
HELD.bwSunblade = function () { var g = new THREE.Group(); g.add(P(box(.07, 1.05, .015), mL(0xF0D8A0), 0, .6, 0)); g.add(P(box(.05, .9, .02), mG(0xFFC870, 0.5), 0, .6, 0)); g.add(P(box(.3, .05, .06), mL(gold), 0, .08, 0)); g.add(P(cyl(.022, .022, .24), mL(0x6A2A1A), 0, -.08, 0)); return g; };
HELD.bwCrown = function () { var g = new THREE.Group(); g.add(P(cyl(.11, .11, .08, 12, 1, true), mL(0x8A8478), 0, .1, 0)); for (var i = 0; i < 5; i++) {
var a = i / 5 * 6.28;
g.add(P(cone(.025, .1, 4), mL(0x8A8478), Math.cos(a) * .11, .18, Math.sin(a) * .11));
} g.add(P(sph(.025), mG(0x6AFFB0, 0.8), 0, .12, .11)); return g; };
HELD.bwOrb = function () { var g = new THREE.Group(); g.add(P(sph(.12), mG(0xB07AFF, 0.55), 0, .14, 0)); g.add(P(sph(.05), mG(0xE8D8FF, 0.9), 0, .14, 0)); g.add(P(cyl(.05, .07, .06, 10), mL(0x2A2A30), 0, 0, 0)); return g; };
HELD.bwHourglass = function () { var g = new THREE.Group(); g.add(P(cone(.07, .12, 10), mG(0xE8E0FF, 0.5), 0, .1, 0, Math.PI, 0, 0)); g.add(P(cone(.07, .12, 10), mG(0xE8E0FF, 0.5), 0, .22, 0)); g.add(P(cyl(.09, .09, .02, 10), mL(gold), 0, .03, 0)); g.add(P(cyl(.09, .09, .02, 10), mL(gold), 0, .29, 0)); return g; };
})();
(function () {
if (typeof ARMS === "undefined")
return;
Object.keys(BW_ARMS).forEach(function (k) {
var A = BW_ARMS[k];
var shot = A.kind === "melee" ? null : A.p === "fire" || A.kind === "cone" ? "fire" : A.p === "frost" ? "ice" : A.p === "spark" ? "lightning" : A.p === "arrow" ? "arrow" : A.p === "bolt" ? "bolt" : "shot";
ARMS["bw_" + k] = { held: A.held || "dagger", shot: shot, name: A.name.toLowerCase() };
});
})();
var BW_TEAMS = { crimson: { name: "the Crimson Legion", col: 0xA02A2A, dark: 0x5A1418, css: "#FF8A7A" }, azure: { name: "the Azure Host", col: 0x2A4AA8, dark: 0x14224A, css: "#8AB8FF" },
wild: { name: "the wild things", col: 0x5A5A3A, dark: 0x2A2A1A, css: "#C8C090" }, arena: { name: "the Bowl", col: 0xC8A040, dark: 0x6A4A1A, css: "#FFD88A" }, dummy: { name: "", col: 0xC8A878, dark: 0x8A6A48, css: "#ddd" } };
var BW_KINDS = {
knight: { name: "Knight", body: "person", arm: "longsword", hp: 70, spd: 3.2, armor: 0.3, worth: 12, look: function (T) { return { layer: "armor", layerColor: 0x8A8E96, hat: "helmet", hatColor: 0x9A9EA6, top: T.col, bottom: 0x5A5C62, role: "guard" }; }, spoil: ["Knight's tabard", "🛡️"] },
halberdier: { name: "Halberdier", body: "person", arm: "halberd", hp: 65, spd: 3.0, armor: 0.25, worth: 12, look: function (T) { return { layer: "armor", layerColor: 0x7A7E86, hat: "helmet", hatColor: 0x7A7E86, top: T.col, role: "guard" }; }, spoil: ["Halberdier's crest", "🪖"] },
archer: { name: "Archer", body: "person", arm: "longbow", hp: 45, spd: 3.4, range: 32, worth: 10, look: function (T) { return { hat: "hood", hatColor: T.dark, top: T.col, bottom: 0x4A3A2A, back: "cloak", backColor: 0x3A4A2A }; }, spoil: ["Fletcher's quiver", "🏹"] },
viking: { name: "Raider of the north", body: "person", arm: "battleaxe", hp: 80, spd: 3.5, armor: 0.1, worth: 13, look: function (T) { return { sex: "m", top: 0x6A4A32, back: "cloak", backColor: T.dark, hairStyle: "long", beard: true, bottom: 0x4A3A2A }; }, spoil: ["Raider's arm-ring", "💍"] },
gladiator: { name: "Gladiator", body: "person", arm: "trident", hp: 70, spd: 3.6, armor: 0.15, worth: 13, look: function (T) { return { layer: "armor", layerColor: 0xB8883A, hat: "helmet", hatColor: 0xB8883A, top: T.col, role: "guard" }; }, spoil: ["Gladiator's bronze helm", "🏛️"] },
musketeer: { name: "Musketeer", body: "person", arm: "musket", hp: 50, spd: 3.2, range: 34, worth: 11, look: function (T) { return { layer: "longcoat", layerColor: T.col, hat: "brimmed", hatColor: 0x2A2420, bottom: 0xD8D0B8 }; }, spoil: ["Musketeer's plumed hat", "🎩"] },
gunslinger: { name: "Gunslinger", body: "person", arm: "revolver", hp: 55, spd: 3.8, range: 24, worth: 12, look: function (T) { return { layer: "longcoat", layerColor: 0x6A4A32, hat: "brimmed", hatColor: 0x5A3A22, top: T.col, bottom: 0x3A4A6A }; }, spoil: ["Gunslinger's tin star", "⭐"] },
soldier: { name: "Rifleman", body: "person", arm: "rifle", hp: 55, spd: 3.4, range: 40, worth: 11, look: function (T) { return { top: 0x5A6A3A, bottom: 0x4A5A32, hat: "helmet", hatColor: 0x4A5A32, layer: "armor", layerColor: T.dark, role: "guard" }; }, spoil: ["Rifleman's medal", "🎖️"] },
gunner: { name: "Machine gunner", body: "person", arm: "trenchgun", hp: 60, spd: 2.8, range: 36, worth: 13, look: function (T) { return { top: 0x5A6A3A, bottom: 0x4A5A32, hat: "helmet", hatColor: 0x3A4A2A, layer: "armor", layerColor: T.col, role: "guard" }; }, spoil: ["Gunner's goggles", "🥽"] },
trooper: { name: "Star trooper", body: "person", arm: "blaster", hp: 60, spd: 3.6, range: 34, armor: 0.15, worth: 12, look: function (T) { return { layer: "armor", layerColor: 0xE4E6EC, hat: "helmet", hatColor: 0xE4E6EC, top: T.col, bottom: 0xD8DAE0, role: "guard" }; }, spoil: ["Trooper's visor", "🪐"] },
mage: { name: "Battle-mage", body: "person", arm: "firestaff", hp: 50, spd: 3.2, range: 30, worth: 13, look: function (T) { return { topKind: "robe", top: T.col, hat: "hood", hatColor: T.dark, back: "cloak", backColor: T.dark }; }, spoil: ["Battle-mage's focus crystal", "🔮"] },
frostmage: { name: "Frost-mage", body: "person", arm: "froststaff", hp: 50, spd: 3.2, range: 30, worth: 13, look: function (T) { return { topKind: "robe", top: 0xBFE4F4, hat: "hood", hatColor: T.col, back: "cloak", backColor: T.dark }; }, spoil: ["Frost-mage's rime charm", "❄️"] },
stormcaller: { name: "Stormcaller", body: "person", arm: "stormrod", hp: 50, spd: 3.2, range: 36, worth: 13, look: function (T) { return { topKind: "robe", top: 0x3A3A5A, hat: "hood", hatColor: T.col, back: "cloak", backColor: T.dark }; }, spoil: ["Stormcaller's copper torc", "⚡"] },
samurai: { name: "Samurai", body: "person", arm: "katana", hp: 65, spd: 3.9, armor: 0.2, worth: 14, look: function (T) { return { layer: "armor", layerColor: T.dark, hat: "helmet", hatColor: 0x2A2420, top: T.col, bottom: 0x2A2420, role: "guard" }; }, spoil: ["Samurai's lacquered plate", "🎌"] },
shadowblade: { name: "Shadow-blade", body: "person", arm: "dagger", hp: 45, spd: 4.6, worth: 14, look: function (T) { return { top: 0x1A1A22, bottom: 0x1A1A22, hat: "hood", hatColor: 0x14141A, back: "cloak", backColor: T.dark, shoes: 0x14141A }; }, spoil: ["Shadow-blade's mask", "🥷"] },
monk: { name: "Staff monk", body: "person", arm: "quarterstaff", hp: 60, spd: 4.0, worth: 12, look: function (T) { return { topKind: "robe", top: 0xD88A2A, hairStyle: "bald", back: "cloak", backColor: T.col }; }, spoil: ["Monk's prayer beads", "📿"] },
pirate: { name: "Sky-pirate", body: "person", arm: "flintlock", hp: 55, spd: 3.6, range: 26, worth: 12, look: function (T) { return { layer: "longcoat", layerColor: 0x3A2A4A, hat: "brimmed", hatColor: 0x1A1A1A, top: T.col, bottom: 0x2A2A2A }; }, spoil: ["Sky-pirate's compass", "🧭"] },
cutthroat: { name: "Sky-pirate boarder", body: "person", arm: "cutlass", hp: 55, spd: 4.0, worth: 12, look: function (T) { return { layer: "longcoat", layerColor: 0x4A2A2A, hat: "cap", hatColor: T.col, top: 0xE8E0D0, bottom: 0x2A2A2A }; }, spoil: ["Boarder's grappling hook", "🪝"] },
orc: { name: "Orc warrior", body: "person", species: "orc", arm: "battleaxe", hp: 90, spd: 3.6, armor: 0.1, worth: 15, spoil: ["Orc war-tusk", "🦷"] },
goblin: { name: "Goblin skulker", body: "person", species: "goblin", arm: "dagger", hp: 35, spd: 4.4, scale: 0.8, worth: 7, spoil: ["Goblin's lucky button", "🔘"] },
skeleton: { name: "Skeleton warrior", body: "person", species: "skeleton", arm: "longsword", hp: 40, spd: 3.2, worth: 9, spoil: ["Old bone token", "🦴"] },
yeti: { name: "Yeti", body: "person", species: "yeti", arm: "fists", hp: 130, spd: 3.4, scale: 1.25, worth: 20, big: 1, spoil: ["Tuft of yeti fur", "🐾"] },
lizard: { name: "Lizard-kin spearman", body: "person", species: "lizardfolk", arm: "spear", hp: 60, spd: 3.8, worth: 12, spoil: ["Shed lizard-kin scale", "🦎"] },
alien: { name: "Grey raider", body: "person", species: "alien", arm: "blaster", hp: 50, spd: 3.8, range: 32, worth: 12, spoil: ["Grey raider's star-glass", "🛸"] },
troll: { name: "Cave troll", body: "folk", arch: "troll", arm: "club", hp: 220, spd: 2.8, armor: 0.15, worth: 35, big: 1, spoil: ["Troll's knuckle-stone", "🪨"] },
ogre: { name: "Ogre", body: "folk", arch: "ogre", arm: "club", hp: 240, spd: 2.6, armor: 0.1, worth: 35, big: 1, spoil: ["Ogre's tooth", "🦷"] },
minotaur: { name: "Minotaur", body: "folk", arch: "minotaur", arm: "battleaxe", hp: 200, spd: 3.6, armor: 0.15, worth: 35, big: 1, spoil: ["Minotaur's horn", "🐂"] },
werewolf: { name: "Werewolf", body: "folk", arch: "werewolf", arm: "claws", hp: 120, spd: 5.0, worth: 25, spoil: ["Werewolf's silver-scarred claw", "🐺"] },
giant: { name: "Hill giant", body: "folk", arch: "giant", arm: "stomp", hp: 600, spd: 2.4, armor: 0.2, worth: 90, big: 2, spoil: ["Hill giant's belt buckle", "🏆"] },
bear: { name: "War bear", body: "beast", arch: "bear", arm: "claws", hp: 140, spd: 4.2, worth: 22, big: 1, spoil: ["War bear's claw", "🐻"] },
tiger: { name: "Arena tiger", body: "beast", arch: "tiger", arm: "bite", hp: 100, spd: 5.2, worth: 20, spoil: ["Tiger's whisker", "🐯"] },
lion: { name: "Arena lion", body: "beast", arch: "lion", arm: "bite", hp: 110, spd: 5.0, worth: 20, spoil: ["Lion's mane braid", "🦁"] },
spider: { name: "Giant spider", body: "crawl", arch: "spider", arm: "bite", hp: 70, spd: 4.6, scale: 3.2, worth: 16, spoil: ["Spider silk spool", "🕸️"] },
drone: { name: "Hover drone", body: "drone", arm: "blaster", hp: 40, spd: 4.2, range: 30, fly: 3.2, worth: 10, spoil: ["Drone's power cell", "🔋"] },
dragon: { name: "Vharruk Cinderwing", body: "dragon", arm: "breath", hp: 1500, spd: 9, range: 45, fly: 16, armor: 0.2, worth: 500, big: 3, boss: 1, spoil: ["Cinderwing's scale", "🐉"] },
legionary: { name: "Legionary", body: "person", arm: "gladius", hp: 65, spd: 3.4, armor: 0.25, worth: 12, look: function (T) { return { layer: "armor", layerColor: 0xB8883A, hat: "helmet", hatColor: 0xB8883A, top: T.col, bottom: T.col, role: "guard" }; }, spoil: ["Legionary's bronze buckle", "🛡️"] },
sniper: { name: "Sniper", body: "person", arm: "sniper", hp: 45, spd: 3.0, range: 70, worth: 13, look: function (T) { return { top: 0x4A5A3A, bottom: 0x4A5A32, hat: "hood", hatColor: 0x3A4A2A, back: "cloak", backColor: 0x4A5A32 }; }, spoil: ["Sniper's scope cap", "🎯"] },
heavy: { name: "Heavy gunner", body: "person", arm: "gatling", hp: 110, spd: 2.4, range: 32, armor: 0.2, worth: 16, look: function (T) { return { layer: "armor", layerColor: 0x4A4A44, hat: "helmet", hatColor: 0x3A3A34, top: T.col, bottom: 0x3A3A34, role: "guard" }; }, spoil: ["Spent gatling drum", "🥁"] },
railtrooper: { name: "Rail trooper", body: "person", arm: "railgun", hp: 60, spd: 3.4, range: 60, armor: 0.2, worth: 15, look: function (T) { return { layer: "armor", layerColor: 0xD8DCE4, hat: "helmet", hatColor: T.col, top: T.dark, bottom: 0xC8CCD4, role: "guard" }; }, spoil: ["Rail slug", "🔩"] },
necromancer: { name: "Necromancer", body: "person", arm: "shadowtome", hp: 60, spd: 3.0, range: 30, worth: 16, look: function (T) { return { topKind: "robe", top: 0x1A1A22, hat: "hood", hatColor: 0x0E0E14, back: "cloak", backColor: 0x2A1A3A }; }, spoil: ["Necromancer's bone charm", "💀"] },
paladin: { name: "Paladin", body: "person", arm: "morningstar", hp: 90, spd: 3.2, armor: 0.3, worth: 15, look: function (T) { return { layer: "armor", layerColor: 0xE8E4D8, hat: "helmet", hatColor: 0xE8C060, top: T.col, role: "guard" }; }, spoil: ["Paladin's sun medallion", "🌞"] },
ninja: { name: "Night-runner", body: "person", arm: "shuriken", hp: 45, spd: 4.8, range: 22, worth: 13, look: function (T) { return { top: 0x14141A, bottom: 0x14141A, hat: "hood", hatColor: 0x0E0E12, shoes: 0x0E0E12, back: "cloak", backColor: T.dark }; }, spoil: ["Night-runner's mask", "🥷"] },
warbot: { name: "War robot", body: "robot", arm: "pulserifle", hp: 90, spd: 3.2, range: 34, armor: 0.25, worth: 16, spoil: ["War robot's servo", "⚙️"] },
android: { name: "Android duelist", body: "robot", arm: "beamblade", hp: 75, spd: 4.6, armor: 0.15, worth: 16, slim: 1, spoil: ["Android's optic", "👁️"] },
sentinel: { name: "Sentinel robot", body: "robot", arm: "gatling", hp: 300, spd: 2.2, range: 36, armor: 0.3, worth: 45, big: 1, scale: 1.9, spoil: ["Sentinel's core", "🔋"] },
dummy: { name: "Training dummy", body: "dummy", arm: "fists", hp: 200, spd: 0, worth: 0 }
};
var BW_ZONES = [
{ k: "siege", name: "The Siege of Gravelhold", x: 0, z: -255, r: 95, col: 0x5E6A3A, sides: { crimson: ["knight", "halberdier", "archer", "viking", "legionary", "knight"], azure: ["knight", "archer", "musketeer", "halberdier", "paladin", "archer"] },
sp: { crimson: { x: 0, z: -170 }, azure: { x: 0, z: -290 } }, hold: "azure", about: "The Crimson Legion lays siege to Gravelhold, the Azure Host's castle. Trebuchets, a siege tower, a ram at the broken gate." },
{ k: "trench", name: "The Ashen Trenches", x: 185, z: -185, r: 90, col: 0x5A4632, sides: { crimson: ["soldier", "soldier", "gunner", "sniper", "soldier", "musketeer"], azure: ["soldier", "gunner", "sniper", "soldier", "gunslinger"] },
sp: { crimson: { x: 130, z: -130 }, azure: { x: 240, z: -240 } }, tanks: 1, about: "Two lines of earthworks across a field of mud and craters. Riflemen, machine guns, tanks, and biplanes overhead." },
{ k: "ruins", name: "Cinderport Ruins", x: 260, z: 0, r: 90, col: 0x5A5A5E, sides: { crimson: ["soldier", "heavy", "trooper", "warbot", "gunner"], azure: ["android", "trooper", "warbot", "soldier", "heavy"] },
sp: { crimson: { x: 200, z: 40 }, azure: { x: 320, z: -40 } }, mechs: 1, about: "A burnt-out port town fought over street by street. War robots and android duelists in the streets; walker mechs and spider-tanks stride the main road." },
{ k: "arena", name: "The Crimson Bowl", x: 185, z: 185, r: 62, col: 0xC8A878, arena: 1, sides: { crimson: ["gladiator"], azure: ["gladiator"] },
sp: { crimson: { x: 175, z: 185 }, azure: { x: 195, z: 185 } }, about: "The great arena. The Trials of the Bowl: wave after wave, from goblins to a hill giant. Speak to the Arena Master." },
{ k: "fang", name: "The Fangmire", x: 0, z: 262, r: 100, col: 0x3A3236, sides: { wild: ["orc", "orc", "goblin", "goblin", "troll", "skeleton", "werewolf", "yeti", "spider", "minotaur", "ogre", "lizard", "bear", "necromancer"] },
sp: { wild: { x: 0, z: 270 } }, about: "Ash, bones and black pools: the monster wastes. Orcs, goblins, trolls, ogres, werewolves, giant spiders, and the dragon Vharruk Cinderwing." },
{ k: "sky", name: "Galeholm Skyfield", x: -185, z: 185, r: 90, col: 0x6A7A4A, sky: 1, sides: { crimson: ["pirate", "cutthroat", "pirate"], azure: ["mage", "stormcaller", "frostmage"] },
sp: { crimson: { x: -150, z: 160 }, azure: { x: -220, z: 210 } }, about: "Rocks that float on the wind, tied together by rope bridges, with airships moored. Sky-pirates against the battle-mages of the Azure Host." },
{ k: "pass", name: "The Lantern Pass", x: -262, z: 0, r: 90, col: 0x4A6A3A, sides: { crimson: ["samurai", "samurai", "archer", "samurai"], azure: ["shadowblade", "monk", "ninja", "monk"] },
sp: { crimson: { x: -205, z: 0 }, azure: { x: -320, z: 0 } }, about: "A mountain pass of stone lanterns, bamboo and a hill dojo. Samurai against shadow-blades and the staff monks." },
{ k: "crater", name: "The Glass Crater", x: -185, z: -185, r: 90, col: 0x3A6A72, sides: { crimson: ["trooper", "railtrooper", "warbot", "trooper"], azure: ["alien", "alien", "drone", "sentinel", "alien", "drone"] },
sp: { crimson: { x: -140, z: -140 }, azure: { x: -225, z: -225 } }, about: "A crater fused to glass round a crashed starship. Star troopers and war robots against the grey raiders, their drones and sentinels; the two sides' titan war-frames and hover-tanks fight over it." }
];
var BW_Z = {};
BW_ZONES.forEach(function (Z) { BW_Z[Z.k] = Z; });
var BW_RANKS = [[0, "Recruit"], [50, "Soldier"], [200, "Veteran"], [600, "Champion"], [1500, "Warlord"], [4000, "Legend of Ironfray"]];
function bwData() { var d = store.bw; if (!d || typeof d !== "object")
d = store.bw = {}; if (!Array.isArray(d.spoils))
d.spoils = []; d.renown = +d.renown || 0; d.kills = +d.kills || 0; d.best = +d.best || 0; if (!d.banner)
d.banner = "lone"; return d; }
function bwRank(r) { var n = BW_RANKS[0][1]; BW_RANKS.forEach(function (q) { if (r >= q[0])
n = q[1]; }); return n; }
function bwMyTeam() { var b = bwData().banner; return b === "crimson" || b === "azure" ? b : "me"; }
function bwHostile(a, b) {
if (a === b)
return false;
if (a === "dummy" || b === "dummy")
return a === "me" || b === "me";
return true;
}
var BW_SAVE_AT = 0;
function bwSave(now) { if (now || Date.now() - BW_SAVE_AT > 8000) {
BW_SAVE_AT = Date.now();
try {
save();
}
catch (e) { }
} }
function bwRenown(n, why) {
var d = bwData(), was = bwRank(d.renown);
d.renown += n;
var is = bwRank(d.renown);
if (is !== was)
bwSay("<b>Promoted: " + esc(is) + "!</b> Your renown in Ironfray is " + d.renown + ".", true);
bwSave();
}
function bwSpoil(name, icon, from) {
var d = bwData();
d.spoils.push({ n: name, i: icon || "🎖️", f: from || "", at: Date.now() });
if (d.spoils.length > 400)
d.spoils.splice(0, d.spoils.length - 400);
bwSave(true);
}
function bwOwns(k) { return (typeof bkpKept === "function" ? bkpKept() : []).some(function (q) { return q.a === "bw_" + k; }); }
function bwGive(k, quiet, how) {
if (!BW_ARMS[k] || typeof bkpKept !== "function")
return;
if (!bwOwns(k)) {
var q = { id: "bw_" + k + "_" + (typeof uid === "function" ? uid() : Date.now()), a: "bw_" + k, name: BW_ARMS[k].name, from: "Ironfray" };
if (how)
q.got = how;
bkpKept().push(q);
bwSave(true);
}
if (!quiet)
bwEquip(k);
}
function bwOwned() { return (typeof bkpKept === "function" ? bkpKept() : []).filter(function (q) { return /^bw_/.test(q.a) && BW_ARMS[q.a.slice(3)]; }); }
function bwHeldKey() { return (typeof carrying !== "undefined" && carrying && /^bw_/.test(String(carrying.archetype))) ? String(carrying.archetype).slice(3) : null; }
function bwEquip(k) {
var q = bkpKept().filter(function (x) { return x.a === "bw_" + k; })[0];
if (!q)
return;
if (bwHeldKey() === k)
return;
if (typeof bkpHold === "function")
bkpHold("bw_" + k, BW_ARMS[k].name, { keptId: q.id });
BW.cool = 0.3;
bwVmSet();
}
function bwNextWeapon() {
var O = bwOwned();
if (!O.length) {
bwGive("longsword");
return;
}
var cur = bwHeldKey(), i = O.findIndex(function (q) { return q.a === "bw_" + cur; });
var n = O[(i + 1) % O.length];
bwEquip(n.a.slice(3));
bwSay("<b>" + esc(BW_ARMS[n.a.slice(3)].name) + "</b> in hand.");
}
function bwMat(c, o) { var tx = BW.building && !o ? BW.tex || "plaster" : "", k = c + ":" + (o ? JSON.stringify(o) : "") + ":" + tx; if (BW.mats[k])
return BW.mats[k]; var m = BW.mats[k] = wM(c, o); if (tx)
m.userData.bwTex = tx; return m; }
function bwGlowTex() { return BW.glowTex || (BW.glowTex = (typeof softGlow === "function" ? softGlow() : null)); }
function bwGlow(col, size, op, add) {
var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: bwGlowTex(), color: col, transparent: true, opacity: op, depthWrite: false, blending: add === false ? THREE.NormalBlending : THREE.AdditiveBlending }));
s.scale.set(size, size, 1);
return s;
}
function bwSolid(o) {
BW.solids.push(o);
var rb = (o.r !== undefined ? o.r : Math.hypot(o.hw, o.hd)) + 0.5, G = BW.grid || (BW.grid = {});
for (var i = Math.floor((o.x - rb) / 8); i <= Math.floor((o.x + rb) / 8); i++)
for (var j = Math.floor((o.z - rb) / 8); j <= Math.floor((o.z + rb) / 8); j++) {
var k = i + "," + j;
(G[k] || (G[k] = [])).push(o);
}
return o;
}
var BW_NONE = [];
function bwSolidAt(x, z, feet) { var c = BW.grid && BW.grid[Math.floor(x / 8) + "," + Math.floor(z / 8)]; return c ? worldSolidAt(c, x, z, feet) : false; }
function bwBoxS(G, w, h, d, col, x, y, z, rot, solid) {
bwPut(BW.tex || "plaster", new THREE.BoxGeometry(w, h, d), x, y + h / 2, z, 0, rot || 0, 0, col);
if (solid !== false)
bwSolid({ x: x, z: z, hw: w / 2, hd: d / 2, rot: rot || 0, h: h, b: y });
}
function bwFlag(G, x, z, col, h) {
wCyl(0.06, 0.08, h || 7, bwMat(0x4A3A2A), x, (h || 7) / 2, z, G, 6);
var f = wMesh(new THREE.PlaneGeometry(2.2, 1.3, 6, 2), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }), x + 1.1, (h || 7) - 0.8, z, G);
f.userData.bwFlag = 1;
BW.flags = (BW.flags || []);
BW.flags.push(f);
return f;
}
function bwSignpost(G, x, z, lines, rot) { var s = wSign(lines, 3.4, 1.5, "#2A2018", "#E8D8A8"); s.position.set(x, 2.2, z); s.rotation.y = rot !== undefined ? rot : Math.atan2(-x, -z); G.add(s); wCyl(0.08, 0.08, 2.2, bwMat(0x4A3A2A), x, 1.1, z, G, 6); return s; }
function bwFire(G, x, y, z, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
wCone(0.5 * s, 1.2 * s, wB(0xFF8A2A, { op: 0.85 }), 0, 0.6 * s, 0, g, 7);
wCone(0.28 * s, 0.8 * s, wB(0xFFD27A, { op: 0.9 }), 0, 0.45 * s, 0, g, 6);
var gl = bwGlow(0xFF8A3A, 4 * s, 0.35);
gl.position.y = 0.8 * s;
g.add(gl);
(BW.fires = BW.fires || []).push(g);
return g;
}
function bwH(x, z) { return __ZC(299, 0, this, arguments, new.target); }
function bwGroundCol(x, z) { return __ZC(299, 1, this, arguments, new.target); }
function bwSupport(x, z, feet) { return __ZC(299, 2, this, arguments, new.target); }
function bwBuild(G) { return __ZC(299, 3, this, arguments, new.target); }
function bwCamp(G) { return __ZC(299, 4, this, arguments, new.target); }
function bwSiege(G) { return __ZC(299, 5, this, arguments, new.target); }
function bwTrench(G) { return __ZC(299, 6, this, arguments, new.target); }
function bwRuins(G) { return __ZC(299, 7, this, arguments, new.target); }
function bwArena(G) { return __ZC(299, 8, this, arguments, new.target); }
function bwFang(G) { return __ZC(299, 9, this, arguments, new.target); }
function bwSky(G) { return __ZC(299, 10, this, arguments, new.target); }
function bwPass(G) { return __ZC(299, 11, this, arguments, new.target); }
function bwCrater(G) { return __ZC(299, 12, this, arguments, new.target); }
function bwAirships(G) { return __ZC(299, 13, this, arguments, new.target); }
function bwBiplanes(G) { return __ZC(299, 14, this, arguments, new.target); }
function bwBake(grp) { return __ZC(299, 15, this, arguments, new.target); }
var BW_MACH = {
tank: { gun: "Cannon", name: "tank", label: "🛡️ Tank", hp: 420, bar: 3.4, hitY: 1.2, seat: 2.6, r: 2.6, spd: 2.2, aiCool: 4.5, rideCool: 2.2, spoil: ["Tank's broken track-link", "⚙️"], steer: 1 },
mech: { gun: "Twin lasers", name: "walker mech", label: "🤖 Walker", hp: 560, bar: 6.6, hitY: 4.6, seat: 4.9, r: 1.8, spd: 2.6, aiCool: 2.2, rideCool: 0.35, spoil: ["Walker's cockpit badge", "🤖"] },
titan: { gun: "Arm rail cannons and missile salvo", name: "Aegis-class war frame", label: "🦾 War frame", hp: 1400, bar: 14.2, hitY: 8, seat: 11.6, r: 3.4, spd: 2.4, aiCool: 1.6, rideCool: 0.5, spoil: ["War frame's reactor key", "🔑"], big: 1 },
spider: { gun: "Spider laser", name: "spider walker", label: "🕷️ Spider walker", hp: 480, bar: 5, hitY: 2.6, seat: 3.6, r: 2.4, spd: 4.2, aiCool: 1.1, rideCool: 0.22, spoil: ["Spider walker's leg joint", "🦿"] },
hover: { gun: "Rocket pods", name: "hover-tank", label: "🛸 Hover-tank", hp: 380, bar: 4, hitY: 1.8, seat: 3.2, r: 2.6, spd: 4.6, aiCool: 2.4, rideCool: 1.1, spoil: ["Hover-tank's lift vane", "🌀"], steer: 1 }
};
function bwMachine(type, team, x, z, rot, zone) { var t0 = BW.tex; BW.tex = "rust"; try {
return bwMachine0(type, team, x, z, rot, zone);
}
finally {
BW.tex = t0;
} }
function bwMachine0(type, team, x, z, rot, zone) { return __ZC(299, 16, this, arguments, new.target); }
function bwMachBuild(M, g, body, T) { return __ZC(299, 17, this, arguments, new.target); }
function bwMachHit(M, dmg, byMe) { return __ZC(299, 18, this, arguments, new.target); }
function bwMachTick(M, dt) { return __ZC(299, 19, this, arguments, new.target); }
function bwMachFire(M, t, mine) { return __ZC(299, 20, this, arguments, new.target); }
function bwTurn(a, b, max) { var d = bwAngDiff(a, b); return a + Math.max(-max, Math.min(max, d)); }
function bwAngDiff(a, b) { var d = b - a; while (d > Math.PI)
d -= Math.PI * 2; while (d < -Math.PI)
d += Math.PI * 2; return d; }
function bwMount(M) { return __ZC(299, 21, this, arguments, new.target); }
function bwDismount(quiet) { return __ZC(299, 22, this, arguments, new.target); }
function bwTrebFire(T, mine) {
if (!T || T.fire > 0)
return;
T.fire = 3.2;
T.mine = !!mine;
if (mine)
bwSay("<b>You pull the pin.</b> The arm swings up and over.");
}
function bwTrebTick(dt) { return __ZC(299, 23, this, arguments, new.target); }
function bwLook(K, team, seed) { return __ZC(299, 24, this, arguments, new.target); }
function bwBody(K, team, seed) { return __ZC(299, 25, this, arguments, new.target); }
function bwDroneMesh(team) { return __ZC(299, 26, this, arguments, new.target); }
function bwRobotMesh(K, team) { return __ZC(299, 27, this, arguments, new.target); }
function bwDummyMesh() {
var g = new THREE.Group(), b = new THREE.Group();
g.add(b);
wCyl(0.08, 0.08, 1.2, bwMat(0x5A4028), 0, 0.6, 0, b, 6);
wCyl(0.32, 0.28, 0.9, bwMat(0xC8A878), 0, 1.5, 0, b, 8);
wSph(0.24, bwMat(0xC8A878), 0, 2.15, 0, b, 8);
wBox(1.2, 0.12, 0.12, bwMat(0x5A4028), 0, 1.7, 0, b);
return g;
}
function bwDragonMesh() { return __ZC(299, 28, this, arguments, new.target); }
function bwBar(g, hp, max, y, w) { return __ZC(299, 29, this, arguments, new.target); }
function bwSpawn(kind, team, zone, x, z) { return __ZC(299, 30, this, arguments, new.target); }
function bwPlatAt(x, z) { for (var i = 0; i < BW.plat.length; i++) {
var p = BW.plat[i];
if (Math.hypot(x - p.x, z - p.z) < p.r)
return p;
} return null; }
function bwRemove(F) { if (F.g.parent)
F.g.parent.remove(F.g); var i = BW.f.indexOf(F); if (i > -1)
BW.f.splice(i, 1); }
function bwCap() { var lite = typeof LITE !== "undefined" && LITE, phone = typeof GFX_PHONE !== "undefined" && GFX_PHONE; return lite ? 3 : phone ? 4 : 7; }
function bwZoneFill(Z) { return __ZC(299, 31, this, arguments, new.target); }
function bwTgtPos(t) {
if (t === "me") {
var L = worldLocal();
return { x: L.x, z: L.z, y: L.y - 0.5 };
}
if (t.F) {
return t.F.st === "dead" ? null : { x: t.F.x, z: t.F.z, y: t.F.y + (t.F.k.fly || 0) + 1.1 * (t.F.k.big ? 1.6 : 1) };
}
if (t.M) {
return t.M.alive ? { x: t.M.x, z: t.M.z, y: t.M.g.position.y + 1.6 } : null;
}
return null;
}
function bwMeTargetable() { return !BW.downT && WLD.on === "battle" && !bwInTruce(); }
function bwInTruce(x, z) { if (x === undefined) {
var L = worldLocal();
x = L.x;
z = L.z;
} return Math.hypot(x, z) < BW_TRUCE; }
function bwPickTarget(team, x, z, range, zone) { return __ZC(299, 32, this, arguments, new.target); }
function bwAct(g, a, ms) { g.userData.act = a; g.userData.actUntil = performance.now() + (ms || 700); g.userData.actSeq = (g.userData.actSeq || 0) + 1; }
function bwHdE(g) { if (typeof HDF === "undefined")
return null; for (var i = 0; i < HDF.list.length; i++)
if (HDF.list[i].g === g)
return HDF.list[i]; return null; }
function bwFTick(F, dt) { return __ZC(299, 33, this, arguments, new.target); }
function bwStrike(F, A, tp) { return __ZC(299, 34, this, arguments, new.target); }
function bwDragonTick(F, dt, tp) { return __ZC(299, 35, this, arguments, new.target); }
function bwDamage(t, dmg, src, how) {
if (!t)
return;
if (t === "me") {
bwHurtMe(dmg, src);
return;
}
if (t.F)
bwHitF(t.F, dmg, src);
else if (t.M)
bwMachHit(t.M, dmg, src && src.me);
}
function bwHitF(F, dmg, src) { return __ZC(299, 36, this, arguments, new.target); }
function bwLoot(F) { return __ZC(299, 37, this, arguments, new.target); }
function bwHurtMe(dmg, src, raw) { return __ZC(299, 38, this, arguments, new.target); }
function bwBeaten(src) { return __ZC(299, 39, this, arguments, new.target); }
function bwRise() {
BW.downT = 0;
BW.hp = BW.max = bwClass().hp || 100;
BW.hurt = 0;
camera.position.set(BW.base + (Math.random() - 0.5) * 6, 1.72, 20 + (Math.random() - 0.5) * 4);
yaw = 0;
pitch = 0;
BW.fade = 1;
}
var BW_P = {
arrow: { col: 0x8A6A3A, len: 0.8, r: 0.03, g: 3.5 }, bolt: { col: 0x5A4A3A, len: 0.5, r: 0.035, g: 2.5 }, ball: { col: 0x2A2A2A, r: 0.07, ball: 1, g: 2 }, bullet: { col: 0xE8C890, len: 0.4, r: 0.02, g: 0 },
laser: { col: 0xFF6A5A, len: 1.1, r: 0.05, g: 0, glow: 1 }, plasma: { col: 0x8AFF6A, r: 0.22, ball: 1, g: 0, glow: 1 }, grenade: { col: 0x4A5A3A, r: 0.1, ball: 1, g: 9.8, fuse: 1 },
fire: { col: 0xFF8A3A, r: 0.28, ball: 1, g: 0, glow: 1, trail: 0xFF9A4A }, frost: { col: 0xBFE4F4, r: 0.22, ball: 1, g: 0, glow: 1, trail: 0xD8F0FF }, spark: { col: 0xE8F0FF, len: 1.4, r: 0.04, g: 0, glow: 1 },
shell: { col: 0x2A2A26, r: 0.18, ball: 1, g: 6, trail: 0x9A9A9A }, boulder: { col: 0x7A7266, r: 0.6, ball: 1, g: 9.8 }, rocket: { col: 0xC8C8C8, len: 0.7, r: 0.08, g: 0, trail: 0xA8A8A8 },
stone: { col: 0x7A7468, r: 0.06, ball: 1, g: 4 }, javelin: { col: 0x8A6A3A, len: 1.8, r: 0.03, g: 4 }, star: { col: 0xC8CCD4, r: 0.07, ball: 1, g: 1 }, disc: { col: 0xC8CCD4, r: 0.16, ball: 1, g: 0 },
sdisc: { col: 0x6AC8FF, r: 0.18, ball: 1, g: 0, glow: 1 }, firepot: { col: 0x8A4A2A, r: 0.14, ball: 1, g: 9.8, trail: 0xFF9A4A }, flare: { col: 0xFF6A4A, r: 0.1, ball: 1, g: 2, glow: 1, trail: 0xFF8A6A },
rail: { col: 0x9AE0FF, len: 3.2, r: 0.04, g: 0, glow: 1 }, ion: { col: 0x8AC8FF, r: 0.35, ball: 1, g: 0, glow: 1, trail: 0xA8D8FF }, orb: { col: 0x8A4ACF, r: 0.3, ball: 1, g: 0, glow: 1, trail: 0x6A3A9A },
thorn: { col: 0x5A7A2A, len: 0.5, r: 0.025, g: 2 }, arcane: { col: 0xC8A8FF, r: 0.14, ball: 1, g: 0, glow: 1, trail: 0xB898FF }, wave: { col: 0x4AA8D8, r: 0.6, ball: 1, g: 0, glow: 1, trail: 0x8AD0F0 },
wyrm: { col: 0xE8E0C8, len: 1.0, r: 0.035, g: 0, trail: 0xD8C8A0 }, star2: { col: 0xFFE8A0, r: 0.12, ball: 1, g: 0, glow: 1, trail: 0xFFF0C0 }
};
var BW_PGEO = {};
function bwShoot(o) { return __ZC(299, 40, this, arguments, new.target); }
function bwShotsTick(dt) { return __ZC(299, 41, this, arguments, new.target); }
function bwShotHits(s, ox, oy, oz, p) { return __ZC(299, 42, this, arguments, new.target); }
function bwSplash(s, x, y, z) { return __ZC(299, 43, this, arguments, new.target); }
function bwPuff(x, y, z, col, size, life, op) {
if (BW.fx.length > 140)
return;
var s = bwGlow(col, size, op, false);
s.position.set(BW.base + x, y, z);
scene.add(s);
BW.fx.push({ s: s, t: 0, life: life, grow: size * 1.6, op: op, rise: 0.4, size: size });
}
function bwSmoke(x, y, z, size) { if (BW.fx.length > 140)
return; var s = bwGlow(0x7A7470, size, 0.4, false); s.position.set(BW.base + x, y, z); scene.add(s); BW.fx.push({ s: s, t: 0, life: 3.2, grow: size * 1.8, op: 0.4, rise: 1.6, size: size }); }
function bwBoom(x, y, z, r, big) { return __ZC(299, 44, this, arguments, new.target); }
function bwFxTick(dt) { return __ZC(299, 45, this, arguments, new.target); }
var BW_FWD = /^bw(Pistol|Rifle|Blaster|Crossbow|Flamer|Shotgun|Smg|Assault|Sniper|Gatling|Launcher|Rail|Arc)$/;
function bwTouch() { return typeof sdTouch === "function" ? sdTouch() : !!(document.body && document.body.classList.contains("touch")); }
function bwVR() { return typeof VRM !== "undefined" && !!VRM.xr; }
function bwVmSet() { return __ZC(299, 46, this, arguments, new.target); }
function bwVrHand() { return __ZC(299, 47, this, arguments, new.target); }
function bwVmTick(dt) { return __ZC(299, 48, this, arguments, new.target); }
function bwAim() { return __ZC(299, 49, this, arguments, new.target); }
function bwAimAssist(dir, from, tol, maxD, skipM) { return __ZC(299, 50, this, arguments, new.target); }
function bwFoesForMe() { return __ZC(299, 51, this, arguments, new.target); }
function bwAttack() { return __ZC(299, 52, this, arguments, new.target); }
function bwBeamFire(A, from, dir) { return __ZC(299, 53, this, arguments, new.target); }
function bwBeamDraw(a, b, col, life, mine) { return __ZC(299, 54, this, arguments, new.target); }
function bwBeamsTick(dt) { return __ZC(299, 55, this, arguments, new.target); }
function bwChain(x, y, z, dmg, n, skip) { return __ZC(299, 56, this, arguments, new.target); }
function bwNova(A) { return __ZC(299, 57, this, arguments, new.target); }
function bwSummon(A) { return __ZC(299, 58, this, arguments, new.target); }
function bwDummies() { var B = BW.base; return BW.f.filter(function (F) { return F.team === "dummy"; }).map(function (F) { return { F: F, x: B + F.x, y: F.g.position.y + 1.4, z: F.z, r: 0.5 }; }); }
function bwNearDummy() { var L = worldLocal(); return BW.f.some(function (F) { return F.team === "dummy" && Math.hypot(F.x - L.x, F.z - L.z) < 8; }); }
function bwStrikeFoe(o, dmg, ex) {
var L = worldLocal();
if (o.F)
bwHitF(o.F, dmg, { x: L.x, z: L.z, me: true, knock: ex && ex.knock, slow: ex && ex.slow });
else if (o.M)
bwMachHit(o.M, dmg, true);
else if (o.pvp)
bwPvpHit(o.pvp, dmg);
}
var BW_CLASSES = {
knight: { name: "Knight", arms: ["longsword", "halberd", "crossbow"], hp: 130, armor: 0.25, dmg: 1, about: "Plate and a longsword. Takes a beating." },
samurai: { name: "Samurai", arms: ["katana", "longbow", "spear"], hp: 110, armor: 0.15, dmg: 1.15, about: "Fast, sharp, disciplined." },
viking: { name: "Raider of the north", arms: ["battleaxe", "spear", "warhammer"], hp: 140, armor: 0.1, dmg: 1.05, about: "Big axe, bigger heart." },
gladiator: { name: "Gladiator", arms: ["trident", "cutlass", "spear"], hp: 120, armor: 0.15, dmg: 1.05, about: "Born for the Bowl." },
ranger: { name: "Ranger", arms: ["longbow", "dagger", "crossbow"], hp: 95, armor: 0, dmg: 1.1, about: "Strike from afar." },
musketeer: { name: "Musketeer", arms: ["musket", "flintlock", "cutlass"], hp: 100, armor: 0.05, dmg: 1.05, about: "Powder and steel." },
gunslinger: { name: "Gunslinger", arms: ["revolver", "rifle", "dagger"], hp: 100, armor: 0, dmg: 1.05, about: "Quickest hands in Ironfray." },
soldier: { name: "Rifleman", arms: ["rifle", "trenchgun", "grenade"], hp: 110, armor: 0.1, dmg: 1, about: "Rifle, machine gun and grenades." },
trooper: { name: "Star trooper", arms: ["blaster", "plasma", "beamblade"], hp: 110, armor: 0.15, dmg: 1, about: "Weapons from beyond the stars." },
mage: { name: "Battle-mage", arms: ["firestaff", "froststaff", "stormrod"], hp: 90, armor: 0, dmg: 1.15, about: "Embers, frost and lightning." },
shadow: { name: "Shadow-blade", arms: ["katana", "dagger", "grenade"], hp: 95, armor: 0, dmg: 1.2, about: "Quick and quiet." },
pyro: { name: "Flame trooper", arms: ["flamer", "plasma", "grenade"], hp: 115, armor: 0.15, dmg: 1, about: "Close-in fire." },
legionary: { name: "Legionary", arms: ["gladius", "pilum", "roundshield"], hp: 125, armor: 0.2, dmg: 1, about: "Shield wall and thrown spears, from the oldest wars." },
marksman: { name: "Sniper", arms: ["sniper", "lasersniper", "smg"], hp: 90, armor: 0, dmg: 1.1, about: "Hide far off and pick them out." },
heavy: { name: "Heavy gunner", arms: ["gatling", "bazooka", "grenadelauncher"], hp: 150, armor: 0.2, dmg: 1, about: "Gatling, rockets and grenades." },
cyber: { name: "Cyber-knight", arms: ["railgun", "monowhip", "gravhammer"], hp: 125, armor: 0.2, dmg: 1.05, about: "Rail gun, mono-wire whip, gravity hammer." },
necromancer: { name: "Necromancer", arms: ["barrowcrown", "bonescythe", "shadowtome"], hp: 95, armor: 0, dmg: 1.1, about: "Raises the dead to fight for you." },
paladin: { name: "Paladin", arms: ["morningstar", "dawnaegis", "mendstaff"], hp: 135, armor: 0.25, dmg: 1, about: "Holy shield, mace and mending." },
ninja: { name: "Night-runner", arms: ["katana", "shuriken", "chakram"], hp: 95, armor: 0, dmg: 1.2, about: "Stars, a returning blade and a quick sword." },
druid: { name: "Druid", arms: ["thornstaff", "stonestaff", "windfan"], hp: 100, armor: 0.05, dmg: 1.1, about: "Thorns, stone and wind." },
relic: { name: "Relic hunter", arms: ["sunblade", "wyrmbow", "starfall"], hp: 115, armor: 0.1, dmg: 1.05, about: "Legendary artifacts of Ironfray." }
};
function bwClass() { var c = BW_CLASSES[bwData().cls]; return c || { hp: 100, armor: 0, dmg: 1 }; }
function bwArmoury() { return __ZC(299, 59, this, arguments, new.target); }
function bwHerald() { return __ZC(299, 60, this, arguments, new.target); }
var BW_WAVES = [["goblin", "goblin"], ["gladiator", "gladiator", "gladiator"], ["tiger", "lion"], ["orc", "orc", "archer"], ["minotaur"], ["knight", "knight", "knight"],
["werewolf", "skeleton", "skeleton"], ["troll", "ogre"], ["samurai", "shadowblade", "shadowblade", "monk"], ["yeti", "yeti", "gunslinger", "gunslinger"], ["bear", "bear", "trooper", "mage"], ["giant"]];
function bwTrialsCard() { return __ZC(299, 61, this, arguments, new.target); }
function bwWaveStart() {
BW.f.filter(function (F) { return F.zone === "arena"; }).forEach(bwRemove);
BW.wave = { n: 0, t: 3, live: [] };
bwSay("<b>The crowd roars.</b> The gates grind open: the Trials begin.", true);
}
function bwWaveNext() { return __ZC(299, 62, this, arguments, new.target); }
function bwWaveCheck() { return __ZC(299, 63, this, arguments, new.target); }
function bwWaveEnd(won) { return __ZC(299, 64, this, arguments, new.target); }
function bwWaveTick(dt) {
var W = BW.wave;
if (!W)
return;
var L = worldLocal(), Z = BW_Z.arena;
if (Math.hypot(L.x - Z.x, L.z - Z.z) > 56) {
bwWaveEnd(false);
return;
}
if (!W.live.length) {
W.t -= dt;
if (W.t <= 0)
bwWaveNext();
}
}
function bwUpdraft() {
var p = BW.plat[0];
if (!p)
return;
var L = worldLocal();
BW.lift = { t: 0, from: { x: L.x, z: L.z, y: L.y - 1.72 }, to: { x: p.x, z: p.z, y: p.top } };
bwSay("<b>The wind takes you</b> up to the rocks.");
}
function bwLiftTick(dt) { return __ZC(299, 65, this, arguments, new.target); }
function bwPvpList() { return __ZC(299, 66, this, arguments, new.target); }
function bwPvpHit(q, dmg) {
dmg = Math.round(dmg);
if (!(typeof signedIn === "function" && signedIn()))
return;
var P = BW.net.pend || (BW.net.pend = {});
P[q.id] = (P[q.id] || 0) + dmg;
bwSay("<b>" + dmg + "</b> on " + esc(q.name) + ".");
}
function bwPvpFlush() {
var P = BW.net.pend;
if (!P)
return;
BW.net.pend = null;
Object.keys(P).forEach(function (id) { bwNetSend(id, { t: "hit", d: Math.min(60, P[id]), s: bwMyTeam() }); });
}
function bwNetSend(to, body) { return __ZC(299, 67, this, arguments, new.target); }
function bwNetPoll() { return __ZC(299, 68, this, arguments, new.target); }
var BW_SAY_Q = null;
function bwSay(h, keep) {
var now = Date.now();
if (!keep && now - BW.sayAt < 1100) {
BW_SAY_Q = h;
return;
}
BW.sayAt = now;
BW_SAY_Q = null;
setStatus(h);
}
function bwHudPaint() { return __ZC(299, 69, this, arguments, new.target); }
function bwLayout(on) { return __ZC(299, 70, this, arguments, new.target); }
function bwPad(on) { return __ZC(299, 71, this, arguments, new.target); }
function bwScreenTick(dt) { return __ZC(299, 72, this, arguments, new.target); }
function bwTick(dt) { return __ZC(299, 73, this, arguments, new.target); }
worldDef("battle", {
base: BW.base, far: 2400, ownSky: true, tone: 220, bound: 470,
env: { top: 0x2A3550, low: 0xC8906A, fog: 0x8A7468, fogD: 0.0014, sun: 0.95, sunCol: 0xFFC890, sunDir: [0.6, 0.32, -0.5], hemi: 0.75, hemiCol: 0xE8C8B0, hemiGround: 0x4A3A30, stars: 0.05 },
build: function (G) { bwBuild(G); },
enter: function (opt) { return __ZC(299, 74, this, arguments, new.target); },
leave: function () { return __ZC(299, 75, this, arguments, new.target); },
ground: function (x, z, feet) { return bwSupport(x, z, feet === undefined ? 0 : feet); },
block: function (x, z, feet) {
if (bwSolidAt(x, z, feet))
return true;
for (var i = 0; i < BW.mach.length; i++) {
var M = BW.mach[i];
if (M === BW.ride || !M.g.visible)
continue;
if (Math.hypot(x - M.x, z - M.z) < M.r)
return true;
}
return false;
},
tick: function (dt) { bwTick(dt); },
key_: function (e) {
if (e.code === "KeyE" || e.code === "Enter") {
bwAttack();
return true;
}
if (e.code === "KeyX") {
bwNextWeapon();
return true;
}
if (e.code === "KeyV") {
BW.block = true;
return true;
}
if (e.code === "KeyG" && BW.ride) {
bwDismount();
return true;
}
return false;
},
back: function () { if (BW.ride) {
bwDismount();
return;
} if (BW.wave) {
bwWaveEnd(false);
return;
} bwHome(); }
});
function bwHome() { worldHome("<b>You step back through the War Gate</b> into the Nightmare Wilds, with everything you won in your backpack. Nothing that happened in Ironfray follows you."); }
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () { if (WLD.on === "battle" && (BW.ride || bwHeldKey())) {
bwAttack();
return;
} return uc.apply(this, arguments); };
})();
if (typeof addEventListener === "function") {
addEventListener("keydown", function (e) {
if (WLD.on !== "battle" || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyX") {
e.preventDefault();
e.stopImmediatePropagation();
if (!e.repeat)
bwNextWeapon();
}
else if (e.code === "KeyV") {
e.stopImmediatePropagation();
BW.block = true;
}
else if (e.code === "KeyG" && BW.ride) {
e.preventDefault();
e.stopImmediatePropagation();
bwDismount();
}
else if (e.code === "KeyF" && BW.ride) {
e.preventDefault();
e.stopImmediatePropagation();
bwAttack();
}
}, true);
addEventListener("keyup", function (e) { if (e.code === "KeyV")
BW.block = false; });
addEventListener("mousedown", function (e) { if (WLD.on === "battle" && e.button === 0 && document.pointerLockElement && walkMode)
bwAttack(); });
}
(function () {
if (typeof assaultDreamer === "function") {
var ad = assaultDreamer;
assaultDreamer = function () { if (WLD.on === "battle")
return; return ad.apply(this, arguments); };
}
if (typeof misdeed === "function") {
var md = misdeed;
misdeed = function () { if (WLD.on === "battle")
return; return md.apply(this, arguments); };
}
})();
(function () {
if (typeof togEmote === "function") {
var te = togEmote;
togEmote = function (k) { if (WLD.on === "battle" && bwVR() && k === "wave") {
bwNextWeapon();
return;
} return te.apply(this, arguments); };
}
if (typeof vrmScreenText === "function") {
var vs = vrmScreenText;
vrmScreenText = function () {
var t = vs.apply(this, arguments);
if (WLD.on === "battle") {
var k = bwHeldKey();
t = "Vigour " + Math.ceil(BW.hp) + "/" + BW.max + " · " + (BW.ride ? "in the " + BW.ride.T.name : k ? BW_ARMS[k].name : "") + " · trigger strikes, A changes weapon" + (t ? "\n" + t : "");
}
return t;
};
}
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.bw;
if (d && Array.isArray(d.spoils) && d.spoils.length) {
var by = {};
d.spoils.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Spoils of war (Ironfray)") + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("") + bkpRow(bkpDim("Renown " + (d.renown || 0) + " · " + esc(bwRank(d.renown || 0))), "");
}
}
catch (e) { }
return h;
};
})();
var BWGATE = { g: null, on: 0 };
function bwGateSpot() {
if (typeof ATLC === "undefined" || !ATLC || typeof atlRing !== "function")
return null;
var W = atlRing("wilds");
if (!W)
return null;
var a = 0.19 + (3 - 0.5) * Math.PI / 4 + 0.09, r = W.S + (typeof ATL_STAIR_RUN !== "undefined" ? ATL_STAIR_RUN : 44) + 30;
return { a: a, x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r, ux: Math.cos(a), uz: Math.sin(a) };
}
function bwGateTick(dt) {
if (WLD.on || store.inside || !walkMode || !(typeof inCityNow === "function" && inCityNow())) {
if (BWGATE.g)
BWGATE.g.visible = false;
if (BWGATE.on) {
BWGATE.on = 0;
worldPromptCity(null);
}
return;
}
var S = bwGateSpot();
if (!S)
return;
var P = camera.position, d = Math.hypot(P.x - S.x, P.z - S.z);
if (d > 700) {
if (BWGATE.g)
BWGATE.g.visible = false;
if (BWGATE.on) {
BWGATE.on = 0;
worldPromptCity(null);
}
return;
}
if (!BWGATE.g) {
var g = new THREE.Group(), st = wM(0x4A4642), ir = wM(0x2A2826);
[-4, 4].forEach(function (s) { wBox(1.8, 9, 1.8, st, s, 4.5, 0, g); wCone(1.4, 1.6, ir, s, 9.8, 0, g, 4); });
wBox(10.5, 1.4, 2, ir, 0, 9.4, 0, g);
[-1, 1].forEach(function (s) { var b = wBox(0.25, 5, 0.08, wM(0xB8BCC4), 0, 11.6, 0.4, g); b.rotation.z = s * 0.6; });
var veil = wMesh(new THREE.PlaneGeometry(6.2, 8.6), new THREE.MeshBasicMaterial({ color: 0xFF9A5A, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false }), 0, 4.3, 0, g);
BWGATE.veil = veil;
var sg = wSign(["The War Gate", "Ironfray, the battle world", "18+ · anything goes beyond"], 4.4, 1.8, "#1A1410", "#F0D8A0");
sg.position.set(6.6, 2.4, -0.6);
sg.rotation.y = Math.PI;
g.add(sg);
wCyl(0.08, 0.08, 2.4, wM(0x3A2A1A), 6.6, 1.2, -0.4, g, 6);
[-6, 6].forEach(function (s) { wCyl(0.06, 0.08, 6, wM(0x3A2A1A), s * 1.4, 3, 1.4, g, 6); var f = wMesh(new THREE.PlaneGeometry(1.6, 1), new THREE.MeshLambertMaterial({ color: s < 0 ? 0xA02A2A : 0x2A4AA8, side: THREE.DoubleSide }), s * 1.4 + 0.8, 5.4, 1.4, g); });
scene.add(g);
BWGATE.g = g;
}
var y = (typeof terrainY === "function") ? terrainY(S.x, S.z) : 0;
BWGATE.g.visible = true;
BWGATE.g.position.set(S.x, y, S.z);
BWGATE.g.rotation.y = Math.atan2(S.ux, S.uz);
if (BWGATE.veil)
BWGATE.veil.material.opacity = 0.26 + 0.06 * Math.sin(performance.now() / 1100);
if (d < 7) {
if (!BWGATE.on || !WCITY.fn) {
BWGATE.on = 1;
worldPromptCity("<b>The War Gate</b> · <b>press E</b> to pass into Ironfray, the battle world (18+)", function () {
BWGATE.on = 0;
worldPromptCity(null);
var back = { here: store.here || 0, x: S.x - S.ux * 8, y: P.y, z: S.z - S.uz * 8, yaw: Math.atan2(S.ux, S.uz) };
if (typeof guideTo !== "undefined" && guideTo && guideTo.key === "The War Gate")
guideTo = null;
worldGo("battle", { from: back });
});
}
}
else if (BWGATE.on) {
BWGATE.on = 0;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
bwGateTick(dt);
}
catch (e) {
if (window.console && !BWGATE.warned) {
BWGATE.warned = 1;
console.warn("war gate:", e);
}
} };
})();
function bwMenu() { return __ZC(299, 76, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-battle"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-battle";
b.title = "Ironfray, the battle world";
b.textContent = "⚔️ Ironfray";
b.onclick = function () { bwMenu(); };
var pk = document.getElementById("me-rep") || document.getElementById("me-arena");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (typeof document === "undefined")
return;
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
var BW_GATE_NAME = "The War Gate", BW_GATE_K = "gate:war";
function bwGateKerb() { var S = bwGateSpot(); if (!S)
return null; return { x: S.x - S.ux * 12, z: S.z - S.uz * 12, name: BW_GATE_NAME + " (Ironfray, 18+)" }; }
function bwGateMatch(q) {
q = String(q || "").trim().toLowerCase();
if (!q)
return false;
return ["the war gate", "ironfray", "battle world", "18+", "nightmare wilds", "gates to other worlds"].some(function (s) { return s.indexOf(q) >= 0; });
}
(function () {
if (typeof pfindPlaces === "function") {
var pf = pfindPlaces;
pfindPlaces = function () {
var L = pf.apply(this, arguments);
try {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (r && (store.here || 0) === r.id && !(typeof WLD !== "undefined" && WLD.on) && !L.some(function (p) { return p.name === BW_GATE_NAME; })) {
var S = bwGateSpot(), P = camera.position;
if (S) {
var dx = S.x - P.x, dz = S.z - P.z;
L.push({ name: BW_GATE_NAME, x: S.x, z: S.z, d: Math.hypot(dx, dz), b: bearingOf(dx, dz), kind: "gate to Ironfray, the battle world (18+), in the Nightmare Wilds" });
L.sort(function (a, b) { return a.d - b.d; });
}
}
}
catch (e) { }
return L;
};
}
if (typeof tglTarget === "function") {
var tt = tglTarget;
tglTarget = function (k) { if (k === BW_GATE_K)
return bwGateKerb(); return tt.apply(this, arguments); };
}
if (typeof wtLabel === "function") {
var wl = wtLabel;
wtLabel = function (k) { if (k === BW_GATE_K)
return BW_GATE_NAME + " (Ironfray, 18+)"; return wl.apply(this, arguments); };
}
if (typeof wtListHtml === "function") {
var wh = wtListHtml;
wtListHtml = function (sel) {
var h = wh.apply(this, arguments);
try {
var q = String(WT.q || "").trim();
if (q && !bwGateMatch(q))
return h;
if (/No place by that name\./.test(h) && h.indexOf("data-wk") < 0)
h = "";
var on = !!q || WT.open["gates"];
var H = "<div class='wt-h l0' data-wg='gates'><span>" + (on ? "▾ " : "▸ ") + "Gates to other worlds</span><span class='s'>1</span></div>";
if (on)
H += "<div class='wt-p l1" + (sel === BW_GATE_K ? " on" : "") + "' data-wk='" + BW_GATE_K + "'>⚔️ " + esc(BW_GATE_NAME) + " <span class='s' style='opacity:.7'>· Ironfray, 18+ · Nightmare Wilds</span></div>";
var cut = h.indexOf("<div class='wt-h");
return cut < 0 ? h + H : h.slice(0, cut) + H + h.slice(cut);
}
catch (e) {
return h;
}
};
}
if (typeof tglPlaces === "function") {
var tp = tglPlaces;
tglPlaces = function () { var L = tp.apply(this, arguments); try {
L.push({ k: BW_GATE_K, name: wtLabel(BW_GATE_K) });
}
catch (e) { } return L; };
}
function point() { var S = bwGateSpot(); if (S)
guideTo = { key: BW_GATE_NAME, x: S.x, z: S.z }; }
if (typeof txiCall === "function") {
var tc = txiCall;
txiCall = function (k) { var r = tc.apply(this, arguments); try {
if (k === BW_GATE_K && typeof TXI !== "undefined" && TXI.state)
point();
}
catch (e) { } return r; };
}
if (typeof tglGo === "function") {
var tg = tglGo;
tglGo = function (k) { var r = tg.apply(this, arguments); try {
if (k === BW_GATE_K)
point();
}
catch (e) { } return r; };
}
})();
var BW_BLOOD = true;
var BW_TEX = {}, BW_NRM = {};
var BW_TILE = { stone: 2.6, brick: 1.8, wood: 1.8, sand: 1.6, concrete: 3, rust: 2.4, rock: 3.2, leaf: 1.8, plaster: 3, bark: 1.4, canvas: 2.2, ground: 6 };
var BW_SURF = {
stone: [0.88, 0, 2.6], brick: [0.9, 0, 3], wood: [0.82, 0, 1.8], sand: [0.96, 0, 2.4], concrete: [0.9, 0, 1.4], rust: [0.62, 0.35, 2.2],
rock: [0.9, 0, 3.2], leaf: [0.75, 0, 2], plaster: [0.92, 0, 1.2], bark: [0.92, 0, 3.4], canvas: [0.95, 0, 1.2], ground: [0.98, 0, 1.1]
};
function bwLite() { return typeof LITE !== "undefined" && !!LITE; }
function bwNoise(seed) { return __ZC(299, 77, this, arguments, new.target); }
function bwFbm(n, u, v, P, oct) { var s = 0, a = 0.5, f = 1, t = 0; for (var o = 0; o < oct; o++) {
s += a * n(u * P * f, v * P * f, P * f);
t += a;
a *= 0.5;
f *= 2;
} return s / t; }
function bwSmooth(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function bwSurfMake(k) { return __ZC(299, 78, this, arguments, new.target); }
function bwTex(k) { if (!BW_TEX[k])
bwSurfMake(k); return BW_TEX[k]; }
function bwNrm(k) { if (!BW_TEX[k])
bwSurfMake(k); return BW_NRM[k] || null; }
function bwSurfMat(k, o) { return __ZC(299, 79, this, arguments, new.target); }
var BW_SURFS = {
brick: function (u, v, o, n, n2) { return __ZC(299, 80, this, arguments, new.target); },
stone: { prep: function (R) { var rows = []; for (var r = 0; r < 4; r++) {
var s = [0], x = 0;
while (x < 1) {
x += 0.24 + R() * 0.26;
s.push(Math.min(1, x));
}
if (1 - s[s.length - 2] < 0.12)
s.splice(s.length - 2, 1);
rows.push(s);
} return rows; } },
wood: function (u, v, o, n, n2) { return __ZC(299, 81, this, arguments, new.target); },
sand: function (u, v, o, n, n2, ctx, S) { return __ZC(299, 82, this, arguments, new.target); },
concrete: function (u, v, o, n, n2, ctx, S) {
var f = bwFbm(n, u, v, 24, 5), st = bwFbm(n2, u, v, 4, 3), pit = n2(u * S * 0.5, v * S * 0.5, S * 0.5) > 0.94 ? 1 : 0;
var seam = Math.abs(v * 2 - Math.round(v * 2)) < 0.004 ? 1 : 0;
var t = (0.74 + f * 0.16) * (0.82 + st * 0.18) * (1 - pit * 0.35) * (1 - seam * 0.3);
o[0] = t * 0.98;
o[1] = t * 0.97;
o[2] = t * 0.94;
o[3] = 0.5 + f * 0.25 - pit * 0.4 - seam * 0.3;
},
rust: function (u, v, o, n, n2) { return __ZC(299, 83, this, arguments, new.target); },
rock: function (u, v, o, n, n2) { return __ZC(299, 84, this, arguments, new.target); },
leaf: function (u, v, o, n, n2, ctx, S) {
var Pa = Math.round(S / 10), Pb = Math.round(S / 6), a = n(u * Pa, v * Pa, Pa), b = n2(u * Pb, v * Pb, Pb), l = bwSmooth(0.35, 0.6, a * 0.6 + b * 0.5);
var t = 0.45 + 0.55 * l * (0.7 + 0.3 * bwFbm(n, u, v, 32, 2));
o[0] = 0.66 * t;
o[1] = 0.80 * t;
o[2] = 0.50 * t;
o[3] = l * 0.8 + b * 0.2;
},
bark: function (u, v, o, n, n2) {
var fur = 1 - Math.abs(bwFbm(n, u, v * 0.15, 12, 4) * 2 - 1), f = bwFbm(n2, u, v, 24, 3);
var t = 0.45 + fur * 0.4 + f * 0.15;
o[0] = 0.62 * t;
o[1] = 0.52 * t;
o[2] = 0.42 * t;
o[3] = fur * 0.8 + f * 0.2;
},
plaster: function (u, v, o, n, n2) {
var f = bwFbm(n, u, v, 32, 4), st = bwFbm(n2, u, v, 3, 3), crack = bwSmooth(0.93, 0.98, 1 - Math.abs(bwFbm(n2, u, v, 5, 4) * 2 - 1));
var t = (0.82 + f * 0.1) * (0.82 + st * 0.18) * (1 - crack * 0.35);
o[0] = t;
o[1] = t * 0.97;
o[2] = t * 0.92;
o[3] = f * 0.6 + st * 0.2 - crack * 0.4;
},
canvas: function (u, v, o, n, n2, ctx, S) {
var weave = 0.5 + 0.25 * Math.sin(u * S * 2) + 0.25 * Math.sin(v * S * 2), fold = bwFbm(n, u, v * 0.3, 6, 3), st = bwFbm(n2, u, v, 5, 3);
var t = (0.86 + weave * 0.05) * (0.8 + st * 0.2);
o[0] = t;
o[1] = t * 0.97;
o[2] = t * 0.9;
o[3] = fold * 0.8 + weave * 0.08;
},
ground: function (u, v, o, n, n2, ctx, S) { return __ZC(299, 85, this, arguments, new.target); }
};
BW_SURFS.stone = (function (prep) {
var f = function (u, v, o, n, n2, rows) {
var r = Math.floor(v * 4), lv = v * 4 - r, s = rows[r], c = 0;
while (c < s.length - 1 && s[c + 1] <= u)
c++;
var a = s[c], b = s[c + 1] || 1, lu = (u - a) / (b - a), w = (b - a) * 4, id = ((r * 13 + c * 7) * 7919 % 991) / 991;
var e = Math.min(Math.min(lu, 1 - lu) * w, Math.min(lv, 1 - lv)), ch = bwFbm(n, u, v, 12, 3);
var body = bwSmooth(0.03, 0.1 + ch * 0.08, e), dome = Math.sqrt(Math.max(0, Math.min(lu, 1 - lu) * Math.min(lv, 1 - lv) * 4));
var f2 = bwFbm(n2, u, v, 24, 4), tone = 0.72 + id * 0.22, t = tone * (0.82 + f2 * 0.2);
var moss = bwSmooth(0.68, 0.74, bwFbm(n, u + 0.5, v, 6, 3)) * (1 - lv) * body;
o[0] = (0.64 * (1 - body) + t * body) * (1 - moss * 0.4);
o[1] = (0.62 * (1 - body) + t * 0.98 * body) * (1 - moss * 0.15);
o[2] = (0.58 * (1 - body) + t * 0.92 * body) * (1 - moss * 0.5);
o[3] = body * (0.55 + dome * 0.25 + f2 * 0.2);
};
f.prep = prep;
return f;
})(BW_SURFS.stone.prep);
function bwMountain(G, x, z, r, h, R, lite) { return __ZC(299, 86, this, arguments, new.target); }
function bwPlanarUV(g, T, M) { return __ZC(299, 87, this, arguments, new.target); }
function bwEnvMake(E) { return __ZC(299, 88, this, arguments, new.target); }
function bwDress(G) { return __ZC(299, 89, this, arguments, new.target); }
function bwPut(tex, geo, x, y, z, rx, ry, rz, col, sx, sy, sz) { return __ZC(299, 90, this, arguments, new.target); }
function bwFlush(G) { return __ZC(299, 91, this, arguments, new.target); }
var BW_CV = {
crates: function (x, z, R) { return __ZC(299, 92, this, arguments, new.target); },
sandbags: function (x, z, R) { return __ZC(299, 93, this, arguments, new.target); },
rock: function (x, z, R) { return __ZC(299, 94, this, arguments, new.target); },
ruinwall: function (x, z, R, tex) { return __ZC(299, 95, this, arguments, new.target); },
barrels: function (x, z, R) { return __ZC(299, 96, this, arguments, new.target); },
container: function (x, z, R) {
var a = R() * 3, y = bwH(x, z), col = [0xB85A3A, 0x3A6A8A, 0x6A7A3A, 0xC89A3A][Math.floor(R() * 4)];
bwPut("rust", new THREE.BoxGeometry(6, 2.6, 2.4), x, y + 1.3, z, 0, -a, (R() - 0.5) * 0.05, col);
bwSolid({ x: x, z: z, hw: 3, hd: 1.2, rot: -a, h: 2.6, b: y });
},
barrier: function (x, z, R) { return __ZC(299, 97, this, arguments, new.target); },
hedgehog: function (x, z, R) {
var y = bwH(x, z);
for (var i = 0; i < 3; i++) {
var e = [[0.7, 0, 0], [0, 0, 0.7], [0.5, 0.7, 0.5]][i];
bwPut("rust", new THREE.BoxGeometry(0.18, 2.2, 0.18), x, y + 0.8, z, e[0], e[1] + i, e[2], 0x6A5A50);
}
bwSolid({ x: x, z: z, r: 0.8, h: 1.4, b: y });
},
cart: function (x, z, R) { return __ZC(299, 98, this, arguments, new.target); },
pillar: function (x, z, R, tex) { return __ZC(299, 99, this, arguments, new.target); },
stump: function (x, z, R) {
var y = bwH(x, z);
bwPut("bark", new THREE.CylinderGeometry(0.5, 0.7, 1 + R(), 8), x, y + 0.5, z, 0, 0, 0, 0x7A5A3A);
bwPut("bark", new THREE.CylinderGeometry(0.35, 0.4, 5, 7), x + 2.4, y + 0.35, z, 0, R() * 3, Math.PI / 2, 0x6A4A32);
bwSolid({ x: x, z: z, r: 0.7, h: 1.3, b: y });
},
pine: function (x, z, R) {
var y = bwH(x, z), h = 7 + R() * 6;
bwPut("bark", new THREE.CylinderGeometry(0.25, 0.45, h * 0.45, 7), x, y + h * 0.22, z, 0, 0, 0, 0x7A5A40);
for (var i = 0; i < 3; i++)
bwPut("leaf", new THREE.ConeGeometry(2.6 - i * 0.6, h * 0.36, 8), x, y + h * (0.38 + i * 0.18), z, 0, R() * 3, 0, [0x4A6A3A, 0x3E5E32, 0x52723E][i]);
bwSolid({ x: x, z: z, r: 0.45 });
},
deadtree: function (x, z, R) {
var y = bwH(x, z), h = 5 + R() * 4;
bwPut("bark", new THREE.CylinderGeometry(0.15, 0.4, h, 6), x, y + h / 2, z, (R() - 0.5) * 0.2, 0, (R() - 0.5) * 0.2, 0x4A3A30);
for (var i = 0; i < 3; i++)
bwPut("bark", new THREE.CylinderGeometry(0.05, 0.12, 2 + R() * 2, 5), x, y + h * (0.5 + i * 0.15), z, 0.9, R() * 6, 0, 0x4A3A30);
bwSolid({ x: x, z: z, r: 0.4 });
},
thicket: function (x, z, R, col) { return __ZC(299, 100, this, arguments, new.target); },
bamboo: function (x, z, R) {
var y = bwH(x, z), r = 2.6;
for (var i = 0; i < 14; i++) {
var a = R() * 6.28, d = R() * r, h = 6 + R() * 4;
bwPut("bark", new THREE.CylinderGeometry(0.07, 0.09, h, 5), x + Math.cos(a) * d, y + h / 2, z + Math.sin(a) * d, 0, 0, 0, 0x7A9A4A);
}
BW.bushes.push({ x: x, z: z, r: r });
},
shard: function (x, z, R) { var y = bwH(x, z), h = 2.5 + R() * 4; bwPut("concrete", new THREE.ConeGeometry(0.9 + R(), h, 4), x, y + h / 2 - 0.2, z, (R() - 0.5) * 0.4, R() * 3, (R() - 0.5) * 0.4, 0x8ACACE); bwSolid({ x: x, z: z, r: 1, h: h, b: y }); },
bones: function (x, z, R) { return __ZC(299, 101, this, arguments, new.target); },
dugout: function (x, z, R) { return __ZC(299, 102, this, arguments, new.target); },
haybale: function (x, z, R) { var y = bwH(x, z); bwPut("wood", new THREE.CylinderGeometry(0.8, 0.8, 1.3, 12), x, y + 0.8, z, Math.PI / 2, R() * 3, 0, 0xE0C070); bwSolid({ x: x, z: z, r: 0.9, h: 1.6, b: y }); },
lantern: function (x, z, R) { var y = bwH(x, z); bwPut("stone", new THREE.BoxGeometry(0.8, 1.2, 0.8), x, y + 0.6, z, 0, 0, 0, 0xB8B4AC); bwPut("stone", new THREE.BoxGeometry(1.1, 0.8, 1.1), x, y + 1.6, z, 0, 0, 0, 0xC0BCB4); bwPut("stone", new THREE.ConeGeometry(0.95, 0.7, 4), x, y + 2.35, z, 0, Math.PI / 4, 0, 0xA8A49C); bwSolid({ x: x, z: z, r: 0.6, h: 2.6, b: y }); },
wreck: function (x, z, R) { var a = R() * 3, y = bwH(x, z); bwPut("rust", new THREE.BoxGeometry(4.2, 1.1, 1.9), x, y + 0.65, z, 0, -a, 0.06, 0x5A4A44); bwPut("rust", new THREE.BoxGeometry(2.2, 0.8, 1.8), x, y + 1.5, z, 0, -a, 0.1, 0x4A3E3A); bwSolid({ x: x, z: z, hw: 2.1, hd: 1, rot: -a, h: 1.9, b: y }); }
};
var BW_COVER = {
siege: [["haybale", 10], ["cart", 6], ["crates", 10], ["rock", 8], ["ruinwall", 6, "stone"], ["thicket", 8], ["sandbags", 4], ["stump", 5]],
trench: [["dugout", 6], ["hedgehog", 16], ["sandbags", 14], ["crates", 8], ["barrels", 6], ["deadtree", 8], ["wreck", 3], ["rock", 5]],
ruins: [["ruinwall", 22, "brick"], ["barrier", 12], ["container", 6], ["barrels", 8], ["crates", 10], ["wreck", 6], ["rock", 4]],
arena: [["pillar", 10, "stone"], ["crates", 6], ["barrels", 4], ["cart", 3]],
fang: [["rock", 22], ["bones", 8], ["deadtree", 14], ["pillar", 6, "rock"], ["thicket", 6, 0x4A4A3A]],
sky: [["crates", 10], ["barrels", 6], ["rock", 10], ["thicket", 8], ["pine", 8]],
pass: [["lantern", 12], ["rock", 12], ["bamboo", 10], ["thicket", 8], ["ruinwall", 6, "stone"], ["pine", 10], ["crates", 4]],
crater: [["shard", 16], ["container", 8], ["barrier", 10], ["rock", 10], ["barrels", 5], ["wreck", 4]],
open: [["rock", 40], ["thicket", 30], ["pine", 34], ["ruinwall", 12, "stone"], ["haybale", 10], ["cart", 8], ["stump", 14], ["crates", 10], ["deadtree", 10]]
};
function bwCoverOK(x, z, pad, Z) { return __ZC(299, 103, this, arguments, new.target); }
function bwCover(G) { return __ZC(299, 104, this, arguments, new.target); }
function bwCoverOn(p, x, z, kind, R) {
var y = p.top, s = 0.9 + R() * 0.4;
if (kind === "crates") {
bwPut("wood", new THREE.BoxGeometry(s, s, s), x, y + s / 2, z, 0, R() * 3, 0, 0xB89060);
bwSolid({ x: x, z: z, r: s * 0.6, h: s, b: y });
}
else {
bwPut("wood", new THREE.CylinderGeometry(0.42, 0.42, 1.1, 10), x, y + 0.55, z, 0, 0, 0, 0xA87A50);
bwSolid({ x: x, z: z, r: 0.5, h: 1.1, b: y });
}
}
function bwGrass(G) { return __ZC(299, 105, this, arguments, new.target); }
function bwEmbers(G) { return __ZC(299, 106, this, arguments, new.target); }
function bwEmbersTick(dt) { return __ZC(299, 107, this, arguments, new.target); }
function bwBleeds(F) { return BW_BLOOD && F && F.k && !/drone|dummy|dragon|robot/.test(F.k.body) && F.k.species !== "skeleton"; }
function bwBlood(x, y, z, n, big) { return __ZC(299, 108, this, arguments, new.target); }
function bwStainsTick(dt) { (BW.stains || []).forEach(function (m) { m.t += dt; if (m.t > 20)
m.mesh.material.opacity = Math.max(0, 0.75 * (1 - (m.t - 20) / 15)); if (m.t > 35)
m.mesh.visible = false; }); }
function bwLOS(ax, ay, az, bx, by, bz) {
var dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz);
if (d < 2)
return true;
var n = Math.ceil(d / 1.2);
for (var i = 1; i < n; i++) {
var t = i / n, x = ax + dx * t, z = az + dz * t, y = ay + (by - ay) * t;
if (bwH(x, z) > y)
return false;
if (bwSolidAt(x, z, y - 0.05))
return false;
}
return true;
}
function bwInThicket(x, z) { for (var i = 0; i < BW.bushes.length; i++) {
var b = BW.bushes[i];
if (Math.hypot(x - b.x, z - b.z) < b.r)
return true;
} return false; }
function bwSeesMe(x, y, z) {
var L = worldLocal(), d = Math.hypot(L.x - x, L.z - z);
if (d < 3)
return true;
if (BW.crouch && bwInThicket(L.x, L.z) && d > 5)
return false;
return bwLOS(x, y, z, L.x, L.y - 0.15, L.z);
}
function bwSpots(x, z, d) {
if (d < 3)
return true;
if (bwHiddenNow() && d > 5)
return false;
if (d < 8)
return true;
return bwSeesMe(x, bwH(x, z) + 1.5, z);
}
function bwHiddenNow() { var L = worldLocal(); return !!(BW.crouch && bwInThicket(L.x, L.z)); }
function bwAllowed() { return __ZC(299, 109, this, arguments, new.target); }
(function () {
if (typeof worldGo !== "function")
return;
var wg = worldGo;
worldGo = function (key) { if (key === "battle") {
var A = bwAllowed();
if (!A.ok) {
setStatus("<b>⚔️ " + esc(A.say) + "</b>");
return false;
}
} return wg.apply(this, arguments); };
})();
function bwPaidOut(src) { return __ZC(299, 110, this, arguments, new.target); }
function bwWonPvp(r) { return __ZC(299, 111, this, arguments, new.target); }
var BW_ERA_ICON = { "Ancient": "🏺", "Blades": "🗡️", "Axes and hammers": "🪓", "Pole arms": "🔱", "Bows and throwing": "🏹", "Bows": "🏹", "Firearms": "🔫", "Heavy weapons": "🚀", "Star weapons": "✴️", "Magic": "🔮", "Artifacts": "💎" };
function bwHud2Build() { return __ZC(299, 112, this, arguments, new.target); }
function bwHud2Show(on) {
if (!BW.h2 && !on)
return;
bwHud2Build();
var H = BW.h2;
var ds = on ? "" : "none";
H.x.style.display = on && !BW.ride && !bwVR() ? "" : "none";
H.dir.style.display = ds;
H.bar.style.display = on && !BW.ride ? "flex" : "none";
H.radar.style.display = ds;
H.feed.style.display = ds;
}
function bwHitMark(kill) { if (!BW.h2)
return; BW.h2.hm = 1; if (kill)
BW.h2.hk = 1.4; }
function bwHurtDir(src) {
if (!BW.h2 || !src || src.x === undefined)
return;
var L = worldLocal();
var a = Math.atan2(-(src.x - L.x), -(src.z - L.z)), rel = bwAngDiff(yaw, a), i = ((Math.round(-rel / (Math.PI / 4)) % 8) + 8) % 8;
BW.h2.dirv[i] = Math.min(1, BW.h2.dirv[i] + 0.8);
}
function bwFeed(html, col) { return __ZC(299, 113, this, arguments, new.target); }
function bwHud2Tick(dt) { return __ZC(299, 114, this, arguments, new.target); }
function bwRadarPaint() { return __ZC(299, 115, this, arguments, new.target); }
var BW_IN = { fire: false, last: null };
function bwSlot(n) { var O = bwOwned(); if (O[n]) {
var k = O[n].a.slice(3);
if (k !== bwHeldKey()) {
BW_IN.last = bwHeldKey();
bwEquip(k);
}
} }
function bwCrouch(on) { if (BW.ride)
on = false; BW.crouch = !!on; var b = document.getElementById("bw-crouch"); if (b) {
b.style.background = on ? "rgba(201,160,64,.95)" : "rgba(20,16,8,.86)";
b.style.color = on ? "#17120A" : "#F4E2B0";
} }
if (typeof addEventListener === "function") {
addEventListener("keydown", function (e) {
if (WLD.on !== "battle" || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
var m = /^Digit([1-9])$/.exec(e.code);
var cbtOn = typeof CBT !== "undefined" && CBT.on;
if (m && cbtOn && +m[1] <= 4)
return;
if (m) {
e.preventDefault();
e.stopImmediatePropagation();
bwSlot(cbtOn ? +m[1] - 5 : +m[1] - 1);
return;
}
if (e.code === "KeyQ") {
e.preventDefault();
e.stopImmediatePropagation();
if (BW_IN.last && bwOwns(BW_IN.last)) {
var l = BW_IN.last;
BW_IN.last = bwHeldKey();
bwEquip(l);
}
return;
}
if (e.code === "KeyC" || e.code === "ControlLeft") {
e.preventDefault();
e.stopImmediatePropagation();
bwCrouch(true);
return;
}
}, true);
addEventListener("keyup", function (e) { if (e.code === "KeyC" || e.code === "ControlLeft") {
if (WLD.on === "battle" && !bwTouch())
bwCrouch(false);
} });
addEventListener("mousedown", function (e) { if (WLD.on !== "battle" || !document.pointerLockElement || !walkMode)
return; if (e.button === 0)
BW_IN.fire = true;
else if (e.button === 2) {
BW.block = true;
BW.rmb = true;
} });
addEventListener("mouseup", function (e) { if (e.button === 0)
BW_IN.fire = false;
else if (e.button === 2 && BW.rmb) {
BW.block = false;
BW.rmb = false;
} });
addEventListener("contextmenu", function (e) { if (WLD.on === "battle" && document.pointerLockElement)
e.preventDefault(); });
addEventListener("wheel", function (e) {
if (WLD.on !== "battle" || !document.pointerLockElement || !walkMode)
return;
e.preventDefault();
e.stopImmediatePropagation();
var O = bwOwned();
if (O.length < 2 || BW_IN.wAt && Date.now() - BW_IN.wAt < 120)
return;
BW_IN.wAt = Date.now();
var i = O.findIndex(function (q) { return q.a === "bw_" + bwHeldKey(); });
bwSlot(((i + (e.deltaY > 0 ? 1 : -1)) % O.length + O.length) % O.length);
}, { capture: true, passive: false });
addEventListener("blur", function () { BW_IN.fire = false; });
}
function bwTick2(dt) { return __ZC(299, 116, this, arguments, new.target); }
