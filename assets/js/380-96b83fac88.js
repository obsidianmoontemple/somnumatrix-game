/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WSN_MODE = {
ionian: [0, 2, 4, 5, 7, 9, 11], dorian: [0, 2, 3, 5, 7, 9, 10], phrygian: [0, 1, 3, 5, 7, 8, 10], lydian: [0, 2, 4, 6, 7, 9, 11],
mixo: [0, 2, 4, 5, 7, 9, 10], aeolian: [0, 2, 3, 5, 7, 8, 10], hijaz: [0, 1, 4, 5, 7, 8, 10], harmonic: [0, 2, 3, 5, 7, 8, 11]
};
var WSN_STYLE = {
dream: { m: "lydian", r: 53, bpm: 58, n: 4, sub: 2, p: [0, 4, 5, 3], pad: "glass", arp: "bell", ap: "sparse", lead: null, bass: "soft", perc: null, rev: 0.7, lp: 5200, v: 0.75 },
city: { m: "ionian", r: 55, bpm: 88, n: 4, sub: 2, p: [0, 5, 3, 4], pad: "strings", arp: "harp", ap: "broken", lead: "flute", bass: "soft", perc: "soft", rev: 0.35, lp: 6000, v: 0.65 },
citynight: { m: "dorian", r: 50, bpm: 72, n: 4, sub: 2, p: [0, 3, 6, 4], pad: "strings", arp: "epiano", ap: "sparse", lead: null, bass: "soft", perc: "brush", rev: 0.45, lp: 4200, v: 0.6 },
hall: { m: "dorian", r: 50, bpm: 84, n: 3, sub: 2, p: [0, 6, 5, 4], pad: "glass", arp: "bell", ap: "updown", lead: "flute", bass: "soft", perc: null, rev: 0.8, lp: 5200, v: 0.7 },
faerie: { m: "lydian", r: 60, bpm: 96, n: 3, sub: 2, p: [0, 1, 4, 0], pad: "glass", arp: "harp", ap: "updown", lead: "flute", bass: "soft", perc: null, rev: 0.6, lp: 7000, v: 0.7 },
kids: { m: "ionian", r: 60, bpm: 112, n: 4, sub: 2, p: [0, 3, 4, 0, 5, 3, 1, 4], pad: null, arp: "box", ap: "alberti", lead: "recorder", bass: "pluck", perc: "bounce", rev: 0.3, lp: 8000, v: 0.7 },
heavens: { m: "ionian", r: 57, bpm: 60, n: 4, sub: 2, p: [0, 3, 5, 4], pad: "choir", arp: "harp", ap: "up", lead: "flute", bass: "soft", perc: null, rev: 0.9, lp: 6500, v: 0.7 },
deep: { m: "dorian", r: 50, bpm: 62, n: 4, sub: 2, p: [0, 6, 3, 4], pad: "glass", arp: "bell", ap: "sparse", lead: "flute", bass: "soft", perc: null, rev: 0.85, lp: 2400, v: 0.75 },
dead: { m: "phrygian", r: 48, bpm: 56, n: 4, sub: 2, p: [0, 1, 5, 0], pad: "choir", arp: "bell", ap: "sparse", lead: null, bass: "drone", perc: null, rev: 0.9, lp: 3200, v: 0.7 },
frozen: { m: "aeolian", r: 52, bpm: 66, n: 3, sub: 2, p: [0, 5, 6, 4], pad: "glass", arp: "bell", ap: "updown", lead: "flute", bass: "soft", perc: null, rev: 0.85, lp: 6500, v: 0.65 },
void: { m: "phrygian", r: 45, bpm: 44, n: 4, sub: 1, p: [0, 0, 1, 0], pad: "glass", arp: "bell", ap: "sparse", lead: null, bass: "drone", perc: null, rev: 1.0, lp: 2600, v: 0.6 },
mirror: { m: "lydian", r: 54, bpm: 70, n: 3, sub: 2, p: [0, 1, 0, 6], pad: "glass", arp: "epiano", ap: "updown", lead: "bell", bass: "soft", perc: null, rev: 0.8, lp: 5000, v: 0.65 },
fire: { m: "hijaz", r: 45, bpm: 76, n: 4, sub: 2, p: [0, 1, 0, 6], pad: "strings", arp: "lute", ap: "broken", lead: "reed", bass: "drone", perc: "taiko", rev: 0.45, lp: 3800, v: 0.75 },
stars: { m: "lydian", r: 57, bpm: 80, n: 4, sub: 4, p: [0, 1, 5, 4], pad: "glass", arp: "synth", ap: "up", lead: "bell", bass: "soft", perc: null, rev: 0.8, lp: 5500, v: 0.6 },
elsewhere: { m: "mixo", r: 55, bpm: 90, n: 4, sub: 2, p: [0, 6, 3, 0], pad: "strings", arp: "harp", ap: "broken", lead: "flute", bass: "pluck", perc: "frame", rev: 0.5, lp: 6000, v: 0.65 },
desert: { m: "hijaz", r: 50, bpm: 84, n: 4, sub: 2, p: [0, 1, 0, 6], pad: null, arp: "lute", ap: "broken", lead: "reed", bass: "drone", perc: "frame", rev: 0.5, lp: 5000, v: 0.7 },
wasteland: { m: "aeolian", r: 45, bpm: 64, n: 4, sub: 2, p: [0, 5, 6, 0], pad: "strings", arp: "lute", ap: "sparse", lead: null, bass: "drone", perc: null, rev: 0.65, lp: 3000, v: 0.6 },
future: { m: "lydian", r: 55, bpm: 104, n: 4, sub: 4, p: [0, 4, 5, 3], pad: "strings", arp: "synth", ap: "up", lead: "bell", bass: "pluck", perc: "kick", rev: 0.4, lp: 6500, v: 0.55 },
space: { m: "ionian", r: 53, bpm: 60, n: 4, sub: 2, p: [0, 4, 5, 3], pad: "strings", arp: "harp", ap: "sparse", lead: null, bass: "soft", perc: null, rev: 0.6, lp: 4800, v: 0.55 },
planet: { m: "lydian", r: 52, bpm: 56, n: 4, sub: 2, p: [0, 4, 3, 0], pad: "strings", arp: "bell", ap: "sparse", lead: null, bass: "soft", perc: null, rev: 0.6, lp: 4200, v: 0.55 },
casino: { m: "dorian", r: 53, bpm: 96, n: 4, sub: 2, p: [0, 3, 6, 4], pad: null, arp: "epiano", ap: "comp", lead: "reed", bass: "walk", perc: "brush", rev: 0.35, lp: 5200, v: 0.6, swing: 0.18, sev: 1 },
pastoral: { m: "ionian", r: 55, bpm: 100, n: 6, sub: 1, p: [0, 3, 4, 0], pad: "strings", arp: "harp", ap: "broken", lead: "flute", bass: "soft", perc: null, rev: 0.45, lp: 6500, v: 0.65 },
festive: { m: "mixo", r: 57, bpm: 118, n: 4, sub: 2, p: [0, 6, 3, 4], pad: null, arp: "harp", ap: "alberti", lead: "fiddle", bass: "pluck", perc: "jig", rev: 0.35, lp: 7000, v: 0.6 },
snow: { m: "ionian", r: 60, bpm: 92, n: 3, sub: 2, p: [0, 3, 4, 0, 5, 1, 4, 0], pad: "strings", arp: "box", ap: "updown", lead: "bell", bass: "soft", perc: null, rev: 0.6, lp: 7000, v: 0.65 },
lounge: { m: "ionian", r: 53, bpm: 80, n: 4, sub: 2, p: [1, 4, 0, 5], pad: null, arp: "epiano", ap: "comp", lead: null, bass: "walk", perc: "brush", rev: 0.4, lp: 4800, v: 0.55, swing: 0.18, sev: 1 },
home: { m: "ionian", r: 55, bpm: 76, n: 4, sub: 2, p: [0, 3, 5, 4], pad: "strings", arp: "harp", ap: "broken", lead: null, bass: "soft", perc: null, rev: 0.4, lp: 5000, v: 0.55 },
isles: { m: "mixo", r: 55, bpm: 100, n: 4, sub: 2, p: [0, 6, 3, 4], pad: "strings", arp: "harp", ap: "broken", lead: "flute", bass: "pluck", perc: "frame", rev: 0.45, lp: 6500, v: 0.65 },
shanty: { m: "dorian", r: 50, bpm: 108, n: 6, sub: 1, p: [0, 0, 6, 4], pad: null, arp: "lute", ap: "broken", lead: "reed", bass: "pluck", perc: "jig", rev: 0.4, lp: 5500, v: 0.65 },
under: { m: "aeolian", r: 45, bpm: 60, n: 4, sub: 2, p: [0, 5, 6, 4], pad: "strings", arp: "bell", ap: "sparse", lead: null, bass: "drone", perc: "taikosoft", rev: 0.9, lp: 3000, v: 0.7 },
martial: { m: "aeolian", r: 45, bpm: 96, n: 4, sub: 2, p: [0, 5, 6, 4], pad: "strings", arp: null, ap: null, lead: "brass", bass: "pluck", perc: "march", rev: 0.5, lp: 4200, v: 0.6 },
race: { m: "dorian", r: 50, bpm: 126, n: 4, sub: 4, p: [0, 6, 3, 4], pad: "strings", arp: "synth", ap: "up", lead: null, bass: "pluck", perc: "kick", rev: 0.3, lp: 6000, v: 0.5 },
machine: { m: "phrygian", r: 45, bpm: 90, n: 4, sub: 4, p: [0, 1, 0, 6], pad: "strings", arp: "synth", ap: "up", lead: null, bass: "pluck", perc: "kick", rev: 0.5, lp: 3200, v: 0.5 },
maze: { m: "dorian", r: 50, bpm: 80, n: 4, sub: 2, p: [0, 6, 5, 4], pad: "strings", arp: "harpsi", ap: "alberti", lead: "recorder", bass: "soft", perc: null, rev: 0.6, lp: 5200, v: 0.65 },
renaiss: { m: "dorian", r: 50, bpm: 90, n: 3, sub: 2, p: [0, 6, 2, 4], pad: null, arp: "lute", ap: "broken", lead: "recorder", bass: "pluck", perc: "tabor", rev: 0.5, lp: 5800, v: 0.65 },
tudor: { m: "mixo", r: 55, bpm: 100, n: 4, sub: 2, p: [0, 6, 3, 4], pad: null, arp: "lute", ap: "broken", lead: "recorder", bass: "pluck", perc: "tabor", rev: 0.45, lp: 5800, v: 0.65 },
verne: { m: "aeolian", r: 50, bpm: 86, n: 4, sub: 2, p: [0, 5, 2, 4], pad: "strings", arp: "harp", ap: "up", lead: "brass", bass: "soft", perc: "soft", rev: 0.55, lp: 5000, v: 0.6 },
grimm: { m: "aeolian", r: 50, bpm: 78, n: 6, sub: 1, p: [0, 5, 6, 4], pad: "strings", arp: "harp", ap: "broken", lead: "fiddle", bass: "soft", perc: null, rev: 0.65, lp: 4600, v: 0.65 },
erebos: { m: "phrygian", r: 45, bpm: 50, n: 4, sub: 2, p: [0, 1, 0, 5], pad: "choir", arp: "bell", ap: "sparse", lead: null, bass: "drone", perc: "taikosoft", rev: 1.0, lp: 3000, v: 0.7 },
guild: { m: "ionian", r: 55, bpm: 96, n: 4, sub: 2, p: [0, 4, 5, 3], pad: null, arp: "lute", ap: "broken", lead: "fiddle", bass: "pluck", perc: "frame", rev: 0.4, lp: 6000, v: 0.6 },
story: { m: "ionian", r: 57, bpm: 84, n: 3, sub: 2, p: [0, 5, 3, 4], pad: "strings", arp: "harp", ap: "updown", lead: "flute", bass: "soft", perc: null, rev: 0.55, lp: 6000, v: 0.65 },
mall: { m: "lydian", r: 55, bpm: 94, n: 4, sub: 2, p: [0, 4, 5, 3], pad: "strings", arp: "epiano", ap: "broken", lead: null, bass: "soft", perc: "soft", rev: 0.45, lp: 5600, v: 0.55, sev: 1 },
tunnel: { m: "aeolian", r: 45, bpm: 80, n: 4, sub: 2, p: [0, 5, 3, 6], pad: "strings", arp: "epiano", ap: "sparse", lead: null, bass: "pluck", perc: "brush", rev: 0.7, lp: 3600, v: 0.5 },
singing: { m: "lydian", r: 55, bpm: 64, n: 4, sub: 2, p: [0, 4, 1, 5], pad: "choir", arp: "bell", ap: "up", lead: "flute", bass: "soft", perc: null, rev: 0.9, lp: 6000, v: 0.7 },
dwarf: { m: "dorian", r: 43, bpm: 72, n: 4, sub: 2, p: [0, 6, 3, 4], pad: "choir", arp: "harp", ap: "broken", lead: "brass", bass: "drone", perc: "taikosoft", rev: 0.85, lp: 3600, v: 0.65 },
tavern: { m: "mixo", r: 55, bpm: 116, n: 6, sub: 1, p: [0, 0, 6, 6, 0, 0, 4, 0], pad: null, arp: "lute", ap: "broken", lead: "fiddle", bass: "pluck", perc: "jig", rev: 0.3, lp: 6000, v: 0.6 },
church: { m: "ionian", r: 50, bpm: 52, n: 4, sub: 1, p: [0, 3, 4, 0, 5, 3, 4, 0], pad: "organ", arp: null, ap: null, lead: "choirlead", bass: "organ", perc: null, rev: 1.0, lp: 4800, v: 0.6 },
temple: { m: "dorian", r: 50, bpm: 48, n: 4, sub: 1, p: [0, 6, 0, 3], pad: "choir", arp: "bell", ap: "sparse", lead: null, bass: "drone", perc: null, rev: 1.0, lp: 4200, v: 0.6 },
shop: { m: "ionian", r: 57, bpm: 92, n: 4, sub: 2, p: [0, 5, 3, 4], pad: null, arp: "epiano", ap: "broken", lead: null, bass: "soft", perc: "brush", rev: 0.3, lp: 5000, v: 0.45, sev: 1 },
library: { m: "dorian", r: 52, bpm: 60, n: 4, sub: 2, p: [0, 3, 6, 4], pad: "strings", arp: "harp", ap: "sparse", lead: null, bass: null, perc: null, rev: 0.5, lp: 3800, v: 0.4 },
quiet: { m: "ionian", r: 55, bpm: 66, n: 4, sub: 2, p: [0, 3, 5, 4], pad: "strings", arp: "epiano", ap: "sparse", lead: null, bass: null, perc: null, rev: 0.4, lp: 4000, v: 0.35 },
battle: { m: "harmonic", r: 45, bpm: 138, n: 4, sub: 4, p: [0, 0, 5, 4, 0, 0, 5, 6], pad: "strings", arp: "ostin", ap: "up", lead: "brass", bass: "pluck", perc: "war", rev: 0.35, lp: 5200, v: 0.65, fight: 1 },
battledark: { m: "phrygian", r: 43, bpm: 126, n: 4, sub: 4, p: [0, 1, 0, 5], pad: "choir", arp: "ostin", ap: "up", lead: "brass", bass: "pluck", perc: "war", rev: 0.6, lp: 4200, v: 0.65, fight: 1 },
battlespace: { m: "dorian", r: 45, bpm: 140, n: 4, sub: 4, p: [0, 6, 5, 6], pad: "strings", arp: "synth", ap: "up", lead: "brass", bass: "pluck", perc: "warkick", rev: 0.4, lp: 5600, v: 0.6, fight: 1 }
};
var WSN_WORLD = {
city: { s: "city", n: "citynight", b: ["birds", "bells", "crickets"], f: "battle" },
dream: { s: "dream", b: ["windsoft", "sparkle"] },
mall: { s: "mall", b: ["crowd", "fountain"] },
underground: { s: "tunnel", b: ["rumble", "drips"] },
aurora: { s: "space", b: ["hum", "clank"] }, ares: { s: "space", b: ["hum", "clank"] }, orbital: { s: "space", b: ["hum", "clank"] },
jupiter: { s: "space", b: ["hum", "windhigh"] }, saturn: { s: "space", b: ["hum", "windhigh"] }, uranus: { s: "space", b: ["hum", "windhigh"] }, neptune: { s: "space", b: ["hum", "windhigh"] },
casino: { s: "casino", b: ["crowd", "slots"] }, shuttle: { s: "space", b: ["hum"] }, space: { s: "space", b: ["spacedrone"], f: "battlespace" },
moon: { s: "planet", b: ["spacedrone"], f: "battlespace" }, mars: { s: "planet", b: ["wind", "spacedrone"], f: "battlespace" }, pluto: { s: "planet", b: ["windhigh", "spacedrone"], f: "battlespace" },
mercury: { s: "planet", b: ["rumble", "spacedrone"], f: "battlespace" }, venus: { s: "planet", b: ["wind", "thunder"], f: "battlespace" },
gr_jupiter: { s: "future", b: ["crowd", "windhigh"], f: "battlespace" }, gr_saturn: { s: "future", b: ["crowd", "windhigh"], f: "battlespace" },
gr_uranus: { s: "future", b: ["crowd", "windhigh"], f: "battlespace" }, gr_neptune: { s: "future", b: ["crowd", "windhigh"], f: "battlespace" },
veyar: { s: "singing", b: ["windsoft", "sparkle"], f: "battlespace" }, race: { s: "race", b: ["wind"] },
greenwold: { s: "pastoral", b: ["birds", "stream", "crickets"] }, party: { s: "festive", b: ["crowd"] },
northpole: { s: "snow", b: ["windhigh", "sleigh"] }, lounge: { s: "lounge", b: ["crowd"] }, family: { s: "home", b: ["birds", "crickets"] },
mmin: { s: "machine", b: ["hum", "clank"], f: "battlespace" }, neverland: { s: "isles", b: ["sea", "gulls", "birds"], f: "battle" },
sea: { s: "shanty", b: ["sea", "gulls", "windsoft"], f: "battle" }, underdark: { s: "under", b: ["drips", "cave"], f: "battledark" },
battle: { s: "martial", b: ["wind", "warfar"], f: "battle" },
hall: { s: "hall", b: ["sparkle", "cave"] }, heavens: { s: "heavens", b: ["windhigh", "sparkle"] }, kidszone: { s: "kids", b: ["birds", "sparkle"] },
faerie: { s: "faerie", b: ["birds", "stream", "sparkle", "crickets"], f: "battle" }, future: { s: "future", b: ["hum", "crowd"], f: "battlespace" },
depths: { s: "deep", b: ["underwater", "whale"], f: "battledark" }, mirror: { s: "mirror", b: ["sparkle", "windsoft"], f: "battle" },
dead: { s: "dead", b: ["whispers", "windsoft", "bells"], f: "battledark" }, frozen: { s: "frozen", b: ["windhigh", "wolves"], f: "battle" },
elsewhere: { s: "elsewhere", b: ["birds", "wind"], f: "battle" }, stars: { s: "stars", b: ["spacedrone", "sparkle"], f: "battlespace" },
desert: { s: "desert", b: ["wind", "crowd"], f: "battle" }, underworld: { s: "dead", b: ["cave", "drips", "whispers"], f: "battledark" },
"void": { s: "void", b: ["spacedrone", "whispers"], f: "battledark" }, fire: { s: "fire", b: ["fire", "lava", "rumble"], f: "battle" },
wasteland: { s: "wasteland", b: ["wind", "clank", "thunder"], f: "battle" },
maze: { s: "maze", b: ["windsoft", "birds", "drips"], f: "battle" }, davinci: { s: "renaiss", b: ["birds", "bells", "crowd"], f: "battle" },
bard: { s: "tudor", b: ["crowd", "bells", "gulls"], f: "battle" }, verne: { s: "verne", b: ["sea", "hum"], f: "battle" },
grimm: { s: "grimm", b: ["forest", "owls", "wolves"], f: "battledark" }, erebos: { s: "erebos", b: ["whispers", "cave", "thunder"], f: "battledark" },
guildlands: { s: "guild", b: ["crowd", "anvil", "birds"], f: "battle" }, ctale: { s: "story", b: ["birds", "windsoft"], f: "battle" },
"in:tavern": { s: "tavern", b: ["crowd", "hearth"], in: 1 }, "in:church": { s: "church", b: [], in: 1 }, "in:temple": { s: "temple", b: ["whispers"], in: 1 },
"in:shop": { s: "shop", b: ["crowdsoft"], in: 1 }, "in:casino": { s: "casino", b: ["crowd", "slots"], in: 1 }, "in:library": { s: "library", b: ["clock"], in: 1 },
"in:forge": { s: "guild", b: ["anvil", "hearth"], in: 1 }, "in:quiet": { s: "quiet", b: [], in: 1 }, "in:home": { s: null, b: ["clocksoft"], in: 1 },
"in:crypt": { s: "dead", b: ["drips", "whispers"], in: 1 }, "in:castle": { s: "maze", b: ["hearth"], in: 1 }, "in:lab": { s: "machine", b: ["hum"], in: 1 }
};
var WSN_NAMES = { city: "Somnucor, the city", dream: "Your own dream (and the dream journal)", hall: "The Hall of Doors", maze: "The Labyrinth", davinci: "Leonardo's Italy",
bard: "Shakespeare's London", verne: "Jules Verne's World", grimm: "The Grimm Wood", erebos: "Erebos", guildlands: "The Guildlands", ctale: "The classic story worlds",
depths: "The Deep (Atlantis and the mermaids)", samhain: "Samhain Night (keeps its own music)", "in:tavern": "Inside: taverns and inns", "in:church": "Inside: churches and chapels",
"in:temple": "Inside: temples and shrines", "in:shop": "Inside: shops and markets", "in:casino": "Inside: casinos", "in:library": "Inside: libraries", "in:forge": "Inside: forges and workshops",
"in:quiet": "Inside: banks, schools, hospitals, offices", "in:home": "Inside: homes (a clock, no music)", "in:crypt": "Inside: crypts and tombs", "in:castle": "Inside: castles and towers", "in:lab": "Inside: laboratories" };
if (typeof module !== "undefined" && module.exports)
module.exports = { WSN_STYLE: WSN_STYLE, WSN_WORLD: WSN_WORLD, WSN_MODE: WSN_MODE, WSN_NAMES: WSN_NAMES };
var WSN = { ctx: null, ready: false, lite: false,
wIn: null, bIn: null, mIn: null, tone: null, mLev: null, mWet: null,
aLev: null, aWet: null, fxLev: null, fxWet: null, conv: null,
noise: null, set: { all: 1, mus: 0.8, amb: 0.8, fx: 0.9 }, keeper: {},
layer: { w: null, b: null }, bed: {}, here: null, plan: null, fightAt: -1e9, fightOn: 0,
fx: { n: 0, last: {} }, steps: { d: 0, at: 0, lx: null, lz: null, ly: null }, warned: false, track: null, trackUrl: null };
function wsnMidi(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function wsnLite() { return typeof LITE !== "undefined" && !!LITE; }
function wsnClamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function wsnGraph() { return __ZC(380, 0, this, arguments, new.target); }
function wsnOsc(type, f, t) { var o = WSN.ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); return o; }
function wsnGain(v) { var g = WSN.ctx.createGain(); g.gain.value = v || 0; return g; }
function wsnFilt(type, f, q) { var x = WSN.ctx.createBiquadFilter(); x.type = type; x.frequency.value = f; x.Q.value = q == null ? 0.7 : q; return x; }
function wsnNoiseSrc(t, dur) { var s = WSN.ctx.createBufferSource(); s.buffer = WSN.noise; s.loop = true; s.start(t, Math.random() * 1.5); if (dur)
s.stop(t + dur + 0.05); return s; }
function wsnEnv(g, t, a, peak, hold, rel) { var p = g.gain; p.setValueAtTime(0.0001, t); p.linearRampToValueAtTime(peak, t + a); if (hold > 0)
p.setValueAtTime(peak, t + a + hold); p.setTargetAtTime(0.0001, t + a + Math.max(0, hold), rel / 4); return t + a + Math.max(0, hold) + rel + 0.05; }
function wsnPerc(g, t, peak, dec) { var p = g.gain; p.setValueAtTime(0.0001, t); p.linearRampToValueAtTime(peak, t + 0.004); p.exponentialRampToValueAtTime(0.0001, t + 0.004 + dec); return t + dec + 0.05; }
function wsnStart(t, nodes) { nodes.forEach(function (n) { n.start(t); }); }
function wsnStop(end, nodes) { nodes.forEach(function (n) { try {
n.stop(end);
}
catch (e) { } }); }
var WSN_INST = {
strings: function (out, t, m, len, v) { return __ZC(380, 1, this, arguments, new.target); },
choir: function (out, t, m, len, v) { return __ZC(380, 2, this, arguments, new.target); },
organ: function (out, t, m, len, v) { return __ZC(380, 3, this, arguments, new.target); },
glass: function (out, t, m, len, v) {
var f = wsnMidi(m), g = wsnGain(), o = wsnOsc("sine", f, t), o2 = wsnOsc("triangle", f * 2.003, t), g2 = wsnGain(0.25), os = [o, o2];
o.connect(g);
o2.connect(g2);
g2.connect(g);
g.connect(out);
var e = wsnEnv(g, t, Math.min(1.4, len * 0.45), 0.03 * v, len * 0.5, 1.6);
wsnStart(t, os);
wsnStop(e, os);
},
drone: function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sawtooth", f, t), s = wsnOsc("sine", f * 2, t), lp = wsnFilt("lowpass", 260, 0.8), g = wsnGain(), sg = wsnGain(0.5);
o.connect(lp);
lp.connect(g);
s.connect(sg);
sg.connect(g);
g.connect(out);
var e = wsnEnv(g, t, 0.8, 0.05 * v, len * 0.7, 1.2);
wsnStart(t, [o, s]);
wsnStop(e, [o, s]);
},
harp: function (out, t, m, len, v) { return __ZC(380, 4, this, arguments, new.target); },
lute: function (out, t, m, len, v) { return __ZC(380, 5, this, arguments, new.target); },
harpsi: function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("square", f, t), hp = wsnFilt("highpass", f * 1.2, 0.5), lp = wsnFilt("lowpass", 5200, 0.5), g = wsnGain();
o.connect(hp);
hp.connect(lp);
lp.connect(g);
g.connect(out);
var e = wsnPerc(g, t, 0.03 * v, 0.7);
wsnStart(t, [o]);
wsnStop(e, [o]);
},
bell: function (out, t, m, len, v) { return __ZC(380, 6, this, arguments, new.target); },
box: function (out, t, m, len, v) {
var f = wsnMidi(m + 12), o = wsnOsc("sine", f, t), o2 = wsnOsc("sine", f * 4.02, t), g = wsnGain(), g2 = wsnGain();
o.connect(g);
o2.connect(g2);
g2.connect(out);
g.connect(out);
wsnPerc(g2, t, 0.012 * v, 0.08);
var e = wsnPerc(g, t, 0.045 * v, 0.9);
wsnStart(t, [o, o2]);
wsnStop(e, [o, o2]);
},
epiano: function (out, t, m, len, v) { return __ZC(380, 7, this, arguments, new.target); },
synth: function (out, t, m, len, v) { return __ZC(380, 8, this, arguments, new.target); },
ostin: function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("sawtooth", f, t), lp = wsnFilt("lowpass", Math.min(2200, f * 4), 1), g = wsnGain();
o.connect(lp);
lp.connect(g);
g.connect(out);
var e = wsnPerc(g, t, 0.03 * v, Math.max(0.12, len * 0.9));
wsnStart(t, [o]);
wsnStop(e, [o]);
},
flute: function (out, t, m, len, v) { return __ZC(380, 9, this, arguments, new.target); },
recorder: function (out, t, m, len, v) {
var f = wsnMidi(m), o = wsnOsc("triangle", f, t), lp = wsnFilt("lowpass", f * 4, 0.5), g = wsnGain();
o.connect(lp);
lp.connect(g);
g.connect(out);
var e = wsnEnv(g, t, 0.03, 0.05 * v, len * 0.7, 0.12);
wsnStart(t, [o]);
wsnStop(e, [o]);
},
fiddle: function (out, t, m, len, v) { return __ZC(380, 10, this, arguments, new.target); },
reed: function (out, t, m, len, v) { return __ZC(380, 11, this, arguments, new.target); },
brass: function (out, t, m, len, v) { return __ZC(380, 12, this, arguments, new.target); },
choirlead: function (out, t, m, len, v) { WSN_INST.choir(out, t, m, len, v * 0.9); },
bass: function (out, t, m, len, v, kind) { return __ZC(380, 13, this, arguments, new.target); }
};
function wsnDrum(out, t, k, v) { return __ZC(380, 14, this, arguments, new.target); }
var WSN_PERC = {
soft: { 4: [["kick", 0.7], ["shaker", 0.6], ["snare", 0.35], ["shaker", 0.6]] },
brush: { 4: [["brush", 1], ["brush", 0.6], ["brush", 1], ["brush", 0.6]] },
bounce: { 4: [["kick", 0.8], ["shaker", 1], ["snare", 0.5], ["shaker", 1]] },
kick: { 4: [["kick", 0.9], ["hat", 1], ["kick", 0.7], ["hat", 1]] },
taiko: { 4: [["taiko", 0.8], null, ["frame", 0.5], ["taiko", 0.5]] },
taikosoft: { 4: [["taiko", 0.5], null, null, null] },
frame: { 4: [["frame", 0.9], ["frame", 0.4], ["frame", 0.6], ["frame", 0.4]], 3: [["frame", 0.9], ["frame", 0.4], ["frame", 0.4]] },
tabor: { 4: [["frame", 0.8], null, ["frame", 0.5], ["frame", 0.4]], 3: [["frame", 0.8], ["frame", 0.4], ["frame", 0.4]] },
jig: { 6: [["frame", 0.9], null, ["frame", 0.4], ["frame", 0.7], null, ["frame", 0.4]], 4: [["frame", 0.9], ["frame", 0.4], ["frame", 0.7], ["frame", 0.4]] },
march: { 4: [["taiko", 0.7], ["snare", 0.4], ["snare", 0.6], ["snare", 0.4]] },
war: { 4: [["taiko", 1], ["snare", 0.6], ["taiko", 0.7], ["snare", 0.8]] },
warkick: { 4: [["kick", 1], ["snare", 0.5], ["kick", 0.8], ["snare", 0.9]] }
};
function wsnRng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function wsnHash(str) { var h = 2166136261; str = String(str || ""); for (var i = 0; i < str.length; i++) {
h ^= str.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function wsnOff(st, d) { var sc = WSN_MODE[st.m] || WSN_MODE.ionian, o = Math.floor(d / 7); return sc[((d % 7) + 7) % 7] + 12 * o; }
function wsnChordDeg(st, deg) { var c = [deg, deg + 2, deg + 4]; if (st.sev)
c.push(deg + 6); return c; }
function wsnSnap(st, d, deg) { var best = d, bd = 99; for (var k = -1; k <= 2; k++)
wsnChordDeg(st, deg).forEach(function (c) { var x = c + 7 * k, dd = Math.abs(x - d); if (dd < bd) {
bd = dd;
best = x;
} }); return best; }
function wsnLayer(styleKey, seedKey, out) {
var st = WSN_STYLE[styleKey];
if (!st)
return null;
return { k: styleKey, st: st, seed: wsnHash(seedKey || styleKey), bar: 0, t: 0, out: out, motifs: {} };
}
function wsnMotif(L, which) { return __ZC(380, 15, this, arguments, new.target); }
function wsnBar(L, t) { return __ZC(380, 16, this, arguments, new.target); }
function wsnPumpLayer(L) { return __ZC(380, 17, this, arguments, new.target); }
function wsnDay() { try {
if (typeof daylight === "function" && typeof dreamHour === "function")
return daylight(dreamHour());
}
catch (e) { } return 1; }
function wsnBedNoise(B, type, f, q, peak) {
var s = wsnNoiseSrc(WSN.ctx.currentTime), fl = wsnFilt(type, f, q), g = wsnGain(0.0001);
s.connect(fl);
fl.connect(g);
g.connect(B.out);
g.gain.setTargetAtTime(peak, WSN.ctx.currentTime, 1.2);
B.nodes.push(s);
B.gains.push(g);
return { s: s, f: fl, g: g, peak: peak };
}
function wsnBedTone(B, type, f, peak, lpf) {
var o = wsnOsc(type, f, WSN.ctx.currentTime), g = wsnGain(0.0001), x = o;
if (lpf) {
var l = wsnFilt("lowpass", lpf, 0.7);
o.connect(l);
x = l;
}
x.connect(g);
g.connect(B.out);
o.start();
g.gain.setTargetAtTime(peak, WSN.ctx.currentTime, 1.5);
B.nodes.push(o);
B.gains.push(g);
return { o: o, g: g };
}
function wsnBlip(out, t, type, f0, f1, dur, peak) { var o = wsnOsc(type, f0, t), g = wsnGain(); if (f1)
o.frequency.exponentialRampToValueAtTime(f1, t + dur); o.connect(g); g.connect(out); var e = wsnPerc(g, t, peak, dur); o.start(t); o.stop(e); }
function wsnBurst(out, t, type, f, q, dur, peak) { var n = wsnNoiseSrc(t, dur + 0.05), fl = wsnFilt(type, f, q), g = wsnGain(); n.connect(fl); fl.connect(g); g.connect(out); wsnPerc(g, t, peak, dur); return fl; }
function wsnBellAt(out, t, m, peak, dec) { return __ZC(380, 18, this, arguments, new.target); }
var WSN_BED = {
wind: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 380, 0.6, 0.035); },
ev: function (B, t) { var p = B.w.peak * (0.4 + Math.random() * 1.1); B.w.g.gain.setTargetAtTime(p, t, 1.6); B.w.f.frequency.setTargetAtTime(280 + Math.random() * 320, t, 2); return 2.5 + Math.random() * 3; } },
windsoft: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 320, 0.6, 0.016); },
ev: function (B, t) { B.w.g.gain.setTargetAtTime(B.w.peak * (0.5 + Math.random()), t, 2); return 3 + Math.random() * 4; } },
windhigh: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 820, 5, 0.03); B.w2 = wsnBedNoise(B, "bandpass", 300, 0.7, 0.015); },
ev: function (B, t) { B.w.f.frequency.setTargetAtTime(600 + Math.random() * 700, t, 1.8); B.w.g.gain.setTargetAtTime(0.01 + Math.random() * 0.03, t, 1.5); return 2 + Math.random() * 3; } },
forest: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 420, 0.7, 0.018); },
ev: function (B, t) { B.w.g.gain.setTargetAtTime(0.008 + Math.random() * 0.02, t, 2); if (wsnDay() > 0.3 && Math.random() < 0.5)
WSN_BED.birds.ev(B, t + Math.random()); return 2 + Math.random() * 3; } },
sea: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 480, 0.7, 0.02); B.w2 = wsnBedNoise(B, "bandpass", 1200, 0.5, 0.004); },
ev: function (B, t) {
var up = 2.2 + Math.random() * 1.5, pk = 0.045 + Math.random() * 0.04;
B.w.g.gain.setTargetAtTime(pk, t, up / 3);
B.w.g.gain.setTargetAtTime(0.012, t + up, 1.6);
B.w2.g.gain.setTargetAtTime(pk * 0.22, t + up * 0.8, 0.3);
B.w2.g.gain.setTargetAtTime(0.002, t + up + 0.6, 1.2);
return up + 3 + Math.random() * 3;
} },
underwater: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 210, 0.7, 0.06); },
ev: function (B, t) { var k = 1 + Math.floor(Math.random() * 4); for (var i = 0; i < k; i++)
wsnBlip(B.wet, t + i * 0.07 + Math.random() * 0.04, "sine", 280 + Math.random() * 300, 900 + Math.random() * 600, 0.07, 0.012); return 0.8 + Math.random() * 2.6; } },
whale: { setup: function () { }, ev: function (B, t) { wsnBlip(B.wet, t, "sine", 180, 110, 3.2, 0.02); wsnBlip(B.wet, t + 2.8, "sine", 130, 210, 2.4, 0.014); return 30 + Math.random() * 40; } },
stream: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 760, 0.5, 0.009); },
ev: function (B, t) { B.w.f.frequency.setTargetAtTime(600 + Math.random() * 300, t, 0.6); wsnBlip(B.out, t + Math.random(), "sine", 700 + Math.random() * 500, 1400, 0.04, 0.004); return 0.6 + Math.random() * 0.8; } },
fountain: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 900, 0.5, 0.006); }, ev: function () { return 5; } },
rumble: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 75, 0.7, 0.05); },
ev: function (B, t) { B.w.g.gain.setTargetAtTime(0.025 + Math.random() * 0.05, t, 2.5); return 4 + Math.random() * 5; } },
cave: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 110, 0.7, 0.03); }, ev: function (B, t) { return WSN_BED.drips.ev(B, t) * 2; } },
drips: { setup: function () { }, ev: function (B, t) { var f = 1300 + Math.random() * 1400; wsnBlip(B.wet, t, "sine", f, f * 0.55, 0.12, 0.02); return 0.9 + Math.random() * 3.2; } },
lava: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 60, 0.7, 0.05); }, ev: function (B, t) { wsnBlip(B.out, t, "sine", 70 + Math.random() * 60, 140 + Math.random() * 80, 0.18, 0.03); return 1 + Math.random() * 2.5; } },
fire: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 240, 0.7, 0.025); },
ev: function (B, t) { var k = 2 + Math.floor(Math.random() * 5); for (var i = 0; i < k; i++)
wsnBurst(B.out, t + Math.random() * 0.5, "bandpass", 1800 + Math.random() * 2200, 2, 0.015 + Math.random() * 0.03, 0.03); return 0.4 + Math.random() * 0.6; } },
hearth: { setup: function (B) { B.w = wsnBedNoise(B, "lowpass", 200, 0.7, 0.012); },
ev: function (B, t) { var k = 1 + Math.floor(Math.random() * 3); for (var i = 0; i < k; i++)
wsnBurst(B.out, t + Math.random() * 0.6, "bandpass", 1600 + Math.random() * 1600, 2, 0.015 + Math.random() * 0.02, 0.016); return 0.6 + Math.random() * 1.2; } },
birds: { setup: function () { }, ev: function (B, t) { return __ZC(380, 19, this, arguments, new.target); } },
crickets: { setup: function () { }, ev: function (B, t) { if (wsnDay() > 0.25)
return 5; for (var i = 0; i < 4; i++)
wsnBlip(B.out, t + i * 0.045, "sine", 4300, 4200, 0.02, 0.004); return 0.5 + Math.random() * 1.2; } },
owls: { setup: function () { }, ev: function (B, t) { if (wsnDay() > 0.35)
return 8; wsnBlip(B.wet, t, "sine", 390, 345, 0.35, 0.025); wsnBlip(B.wet, t + 0.55, "sine", 380, 330, 0.6, 0.022); return 14 + Math.random() * 24; } },
wolves: { setup: function () { }, ev: function (B, t) { return __ZC(380, 20, this, arguments, new.target); } },
gulls: { setup: function () { }, ev: function (B, t) { return __ZC(380, 21, this, arguments, new.target); } },
crowd: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 430, 0.9, 0.025); },
ev: function (B, t) { return __ZC(380, 22, this, arguments, new.target); } },
crowdsoft: { setup: function (B) { B.w = wsnBedNoise(B, "bandpass", 420, 0.9, 0.01); }, ev: function () { return 5; } },
hum: { setup: function (B) { B.h = wsnBedTone(B, "sine", 55, 0.012); B.h2 = wsnBedTone(B, "sine", 110, 0.004); }, ev: function () { return 6; } },
clank: { setup: function () { }, ev: function (B, t) { wsnBellAt(B.wet, t, 62 + Math.floor(Math.random() * 12), 0.012, 0.5); wsnBurst(B.out, t, "bandpass", 1100, 6, 0.08, 0.02); return 4 + Math.random() * 8; } },
anvil: { setup: function () { }, ev: function (B, t) { var k = 1 + Math.floor(Math.random() * 3); for (var i = 0; i < k; i++) {
var at = t + i * 0.55;
[1250, 2900, 4100].forEach(function (f, j) { wsnBlip(B.wet, at, "sine", f, f * 0.995, 0.5 - j * 0.12, 0.012 / (j + 1)); });
} return 3.5 + Math.random() * 6; } },
spacedrone: { setup: function (B) { B.h = wsnBedTone(B, "sine", 55, 0.016); B.h2 = wsnBedTone(B, "sine", 82.5, 0.006); }, ev: function () { return 8; } },
whispers: { setup: function () { }, ev: function (B, t) { var k = 3 + Math.floor(Math.random() * 4); for (var i = 0; i < k; i++) {
var fl = wsnBurst(B.wet, t + i * 0.28 + Math.random() * 0.1, "bandpass", 1200 + Math.random() * 1200, 8, 0.26, 0.01);
fl.frequency.linearRampToValueAtTime(900 + Math.random() * 1800, t + i * 0.28 + 0.3);
} return 9 + Math.random() * 16; } },
bells: { setup: function () { }, ev: function (B, t) { if (!B.first) {
B.first = 1;
return 20 + Math.random() * 30;
} var k = 3 + Math.floor(Math.random() * 4); for (var i = 0; i < k; i++)
wsnBellAt(B.wet, t + i * 2.1, i % 2 ? 50 : 55, 0.022, 4.5); return 60 + Math.random() * 60; } },
sparkle: { setup: function () { }, ev: function (B, t) { var k = 2 + Math.floor(Math.random() * 3); for (var i = 0; i < k; i++)
wsnBellAt(B.wet, t + i * 0.13, 84 + Math.floor(Math.random() * 8), 0.005, 1.2); return 3 + Math.random() * 6; } },
thunder: { setup: function () { }, ev: function (B, t) { return __ZC(380, 23, this, arguments, new.target); } },
slots: { setup: function () { }, ev: function (B, t) { var m = 79 + Math.floor(Math.random() * 5); [0, 4, 7, 12].forEach(function (s, i) { wsnBellAt(B.out, t + i * 0.08, m + s, 0.004, 0.5); }); return 3 + Math.random() * 6; } },
sleigh: { setup: function () { }, ev: function (B, t) { if (Math.random() < 0.5)
return 10; for (var i = 0; i < 10; i++)
wsnBurst(B.out, t + i * 0.11, "bandpass", 5200 + Math.random() * 900, 6, 0.05, 0.004); return 18 + Math.random() * 30; } },
clock: { setup: function () { }, ev: function (B, t) { wsnBurst(B.out, t, "bandpass", 2500, 5, 0.012, 0.012); wsnBurst(B.out, t + 1, "bandpass", 2100, 5, 0.012, 0.01); return 2; } },
clocksoft: { setup: function () { }, ev: function (B, t) { wsnBurst(B.out, t, "bandpass", 2300, 5, 0.01, 0.005); wsnBurst(B.out, t + 1, "bandpass", 2000, 5, 0.01, 0.004); return 2; } },
warfar: { setup: function () { }, ev: function (B, t) {
if (Math.random() < 0.5)
wsnBlip(B.wet, t, "sine", 70, 45, 0.6, 0.02);
else
for (var i = 0; i < 3; i++)
wsnBurst(B.wet, t + i * 0.7, "bandpass", 1300, 7, 0.06, 0.006);
return 6 + Math.random() * 10;
} }
};
function wsnBedStart(kind) {
var D = WSN_BED[kind];
if (!D)
return null;
var B = { k: kind, nodes: [], gains: [], out: wsnGain(1), wet: null, next: 0 };
B.out.connect(WSN.aLev);
B.wet = wsnGain(1);
B.wet.connect(WSN.aLev);
B.wet.connect(WSN.aWet);
try {
D.setup(B);
}
catch (e) { }
B.next = WSN.ctx.currentTime + 0.5 + Math.random() * 2;
return B;
}
function wsnBedStop(B) {
if (!B)
return;
var t = WSN.ctx.currentTime;
B.dead = 1;
B.gains.forEach(function (g) { g.gain.setTargetAtTime(0.0001, t, 0.6); });
B.nodes.forEach(function (n) { try {
n.stop(t + 3);
}
catch (e) { } });
setTimeout(function () { try {
B.out.disconnect();
B.wet.disconnect();
}
catch (e) { } }, 3500);
}
function wsnBedTick(B) {
if (!B || B.dead)
return;
var c = WSN.ctx, now = c.currentTime;
if (B.next < now)
B.next = now + 0.1;
if (B.next < now + 1) {
var dt = 1;
try {
dt = WSN_BED[B.k].ev(B, B.next) || 2;
}
catch (e) { }
B.next += dt;
}
}
function wsnWhereGain(x, z) { return __ZC(380, 24, this, arguments, new.target); }
function wsnFx(kind, o) { return __ZC(380, 25, this, arguments, new.target); }
function wsnFight() { WSN.fightAt = performance.now(); }
var WSN_SHOT = { arrow: "arrow", bolt: "arrow", javelin: "throw", thorn: "arrow", wyrm: "arrow", stone: "throw", star: "throw", disc: "throw", boulder: "throw", firepot: "throw", grenade: "throw",
ball: "gun", bullet: "gun", shell: "cannon", rocket: "cannon", laser: "laser", rail: "laser", spark: "zap", ion: "plasma", plasma: "plasma", sdisc: "laser",
fire: "fire", frost: "frost", orb: "spell", arcane: "spell", wave: "spell", star2: "spell", flare: "fire" };
function wsnWrap(name, after, before) {
if (typeof window[name] !== "function" || window[name].wsn)
return;
var f = window[name], w = function () { var pre; try {
if (before)
pre = before.apply(this, arguments);
}
catch (e) { } var r = f.apply(this, arguments); try {
after.call(this, arguments, r, pre);
}
catch (e) { } return r; };
w.wsn = 1;
window[name] = w;
}
function wsnHooks() {
var bwX = function (x) { return (typeof BW !== "undefined" && BW.base ? BW.base : 0) + (x || 0); };
wsnWrap("bwAttack", function (a, r, pre) { if (typeof BW === "undefined")
return; if (BW.cool > pre && BW.swing >= 0.99) {
wsnFx("swing");
wsnFight();
} }, function () { return typeof BW !== "undefined" ? BW.cool : 0; });
wsnWrap("bwShoot", function (a) {
var o = a[0];
if (!o || !o.arm || !o.from)
return;
var k = WSN_SHOT[o.arm.p] || "gun", mine = o.owner === "me";
wsnFx(k, { x: o.from.x, z: o.from.z, v: mine ? 0.9 : 0.7, gap: mine ? 0.05 : 0.09 });
if (mine || wsnNear(o.from.x, o.from.z, 70))
wsnFight();
});
wsnWrap("bwHitF", function (a) {
var F = a[0], src = a[2];
if (!F || !F.k)
return;
var x = bwX(F.x), z = F.z, robot = F.k.body === "robot";
wsnFx(robot ? "clang" : (src && src.me && Math.random() < 0.4 ? "clang" : "hit"), { x: x, z: z, v: 0.8 });
if (F.hp <= 0 && !F.wsnDown) {
F.wsnDown = 1;
wsnFx(F.k.body === "dragon" || F.k.big ? "roar" : "fall", { x: x, z: z, v: 0.9, gap: 0.2 });
}
else if (!robot && Math.random() < 0.25)
wsnFx(F.k.body === "dragon" || F.k.big ? "roar" : "cry", { x: x, z: z, v: 0.7, gap: 0.5, pitch: F.k.big ? 0.7 : 1 });
if (wsnNear(x, z, 70))
wsnFight();
});
wsnWrap("bwHurtMe", function () { wsnFx("hurt", { v: 0.9, gap: 0.25 }); wsnFx("hit", { v: 0.8 }); wsnFight(); });
wsnWrap("bwBoom", function (a) { var x = bwX(a[0]), z = a[2]; wsnFx("boom", { x: x, z: z, v: a[4] ? 1 : 0.8, gap: 0.12 }); if (wsnNear(x, z, 90))
wsnFight(); });
wsnWrap("bwPvpHit", function () { wsnFx("hit", { v: 0.9 }); wsnFight(); });
wsnWrap("bwMachHit", function (a) { var M = a[0]; wsnFx("clang", { x: M && M.x != null ? bwX(M.x) : null, z: M && M.z, v: 0.7 }); });
wsnWrap("dgrStrike", function () { wsnFx("swing"); wsnFight(); });
wsnWrap("dgrHurt", function () { wsnFx("hurt", { gap: 0.25 }); wsnFx("hit"); wsnFight(); });
wsnWrap("mmFire", function () { wsnFx("cannon", { v: 0.8, gap: 0.15 }); wsnFight(); });
wsnWrap("mmHurt", function () { wsnFx("clang"); wsnFx("boom", { v: 0.6, gap: 0.3 }); wsnFight(); });
wsnWrap("ebsMonstersStrike", function () { wsnFx("roar", { gap: 0.6 }); wsnFight(); });
wsnWrap("spbCast", function (a, r, pre) { if (typeof spbCoolLeft !== "function")
return; if (spbCoolLeft(a[0]) > (pre || 0) + 0.1) {
wsnFx("spell");
if (typeof dgrHereLevel === "function" && dgrHereLevel() >= 2)
wsnFight();
} }, function (s) { return typeof spbCoolLeft === "function" ? spbCoolLeft(s) : 0; });
wsnWrap("enterBuilding", function () { wsnFx("door", { gap: 0.5 }); });
wsnWrap("exitInterior", function () { wsnFx("doorshut", { gap: 0.5 }); });
wsnWrap("worldGo", function () { wsnFx("whoosh", { v: 0.7, gap: 1 }); });
}
function wsnNear(x, z, r) { if (typeof camera === "undefined")
return false; var P = camera.position; return (x - P.x) * (x - P.x) + (z - P.z) * (z - P.z) < r * r; }
function wsnSteps() { return __ZC(380, 26, this, arguments, new.target); }
var WSN_INSIDE = [
[/tavern|\binn\b|\bpub\b|alehouse|saloon|\bbar\b|brewer|taproom/, "in:tavern"],
[/church|chapel|cathedral|abbey|monaster|basilica|priory/, "in:church"],
[/temple|shrine|pagoda|mosque|synagogue|oracle/, "in:temple"],
[/casino/, "in:casino"],
[/librar|bookshop|bookstore|book store|archive/, "in:library"],
[/forge|smith|workshop|foundry|kiln/, "in:forge"],
[/crypt|tomb|mausoleum|catacomb|sarcoph/, "in:crypt"],
[/castle|palace|keep|fortress|tower|citadel/, "in:castle"],
[/\blab\b|laborator|observator/, "in:lab"],
[/shop|store|market|baker|boutique|cafe|café|restaurant|diner|grocer|emporium|tailor|apothec|chemist|stall/, "in:shop"],
[/house|home|cottage|apartment|\bflat\b|villa|mansion|cabin|\bhut\b|bungalow|townhouse|manor/, "in:home"]
];
function wsnInsideKind() { return __ZC(380, 27, this, arguments, new.target); }
function wsnKey() {
var k = "city";
try {
if (typeof dgrWhere === "function")
k = dgrWhere();
}
catch (e) { }
if (k === "dream" && typeof LD !== "undefined" && LD && LD.g && LD.kind)
k = LD.kind;
var ins = wsnInsideKind();
if (ins)
return ins;
return k || "city";
}
function wsnPlanFor(k) {
var P = WSN_WORLD[k];
if (P)
return P;
var pick = ["story", "elsewhere", "pastoral", "hall", "isles"], h = wsnHash(k);
return { s: pick[h % pick.length], b: ["windsoft", "birds"], f: "battle", auto: 1 };
}
try {
var wsnKept = JSON.parse(localStorage.getItem("somnu.sound.levels") || "null");
if (wsnKept)
["all", "mus", "amb", "fx"].forEach(function (k) { if (typeof wsnKept[k] === "number")
WSN.set[k] = wsnClamp(wsnKept[k], 0, 1); });
}
catch (e) { }
function wsnSave() { try {
localStorage.setItem("somnu.sound.levels", JSON.stringify(WSN.set));
}
catch (e) { } }
function wsnKeeper() { try {
var c = typeof DW_CLOUD !== "undefined" && DW_CLOUD.config && DW_CLOUD.config.world_sound;
WSN.keeper = (c && typeof c === "object") ? c : {};
}
catch (e) {
WSN.keeper = {};
} return WSN.keeper; }
function wsnListed(list, k) { return Array.isArray(list) && list.indexOf(k) > -1; }
function wsnOtherMusic() { return __ZC(380, 28, this, arguments, new.target); }
function wsnHushHere() { try {
if (typeof SHK !== "undefined" && SHK.zone === "inside" && /^(globe|rose|swan)$/.test(SHK.inside || ""))
return 0.3;
}
catch (e) { } return 1; }
function wsnSpeaking() { try {
return !!(window.speechSynthesis && window.speechSynthesis.speaking);
}
catch (e) {
return false;
} }
function wsnTick() { return __ZC(380, 29, this, arguments, new.target); }
function wsnGo(key, P, here) { return __ZC(380, 30, this, arguments, new.target); }
function wsnSwap() { return __ZC(380, 31, this, arguments, new.target); }
setInterval(function () { try {
var P = WSN.plan;
if (!WSN.ready || !P || !P.n || !WSN.layer.w)
return;
var want = wsnDay() < 0.3 ? P.n : P.s;
if (WSN.layer.w.k !== want) {
WSN.here = null;
}
}
catch (e) { } }, 60000);
function wsnBegin() {
if (WSN.begun)
return;
WSN.begun = true;
wsnKeeper();
wsnHooks();
if (typeof sndPump === "function")
sndPump("worldsound", function () { try {
wsnTick();
}
catch (e) {
if (!WSN.warned) {
WSN.warned = true;
if (window.console)
console.warn("world-sound:", e);
}
} });
setInterval(function () { try {
if (WSN.ready && typeof audio !== "undefined" && audio.on)
wsnSteps();
}
catch (e) { } }, 90);
if (typeof applyCloud === "function") {
var ac = applyCloud;
applyCloud = function () { var r = ac.apply(this, arguments); try {
var before = JSON.stringify(WSN.keeper);
wsnKeeper();
if (JSON.stringify(WSN.keeper) !== before)
WSN.here = null;
}
catch (e) { } return r; };
}
}
(function () {
if (typeof document === "undefined")
return;
function pref() { try {
return localStorage.getItem("somnu.sound.on");
}
catch (e) {
return null;
} }
function first(e) {
var t = e && e.target, id = t && t.id;
if (id === "soundbtn" || id === "set-sound")
return;
if (typeof audio === "undefined" || audio.on || pref() === "off")
return off();
var b = document.getElementById("soundbtn");
try {
if (b)
b.click();
else if (typeof startAudio === "function")
startAudio();
}
catch (er) { }
if (audio.on)
off();
}
function off() { ["pointerdown", "touchend", "keydown", "click"].forEach(function (ev) { window.removeEventListener(ev, first, true); }); }
["pointerdown", "touchend", "keydown", "click"].forEach(function (ev) { window.addEventListener(ev, first, true); });
function remember() { setTimeout(function () { try {
localStorage.setItem("somnu.sound.on", audio.on ? "on" : "off");
}
catch (e) { } }, 0); }
function hook() { ["soundbtn", "set-sound"].forEach(function (id) { var b = document.getElementById(id); if (b)
b.addEventListener("click", function (ev) { if (ev.isTrusted)
remember(); }); }); }
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
wsnBegin();
})();
(function () {
if (typeof document === "undefined")
return;
function build() {
var sb = document.getElementById("set-sound");
if (!sb || document.getElementById("wsn-levels"))
return;
var row = sb.parentNode, box = document.createElement("div");
box.id = "wsn-levels";
box.style.cssText = "margin:8px 0 4px;display:grid;gap:6px";
var L = [["all", "Everything"], ["mus", "Music"], ["amb", "The world's sounds"], ["fx", "Effects (fights, doors, steps)"]];
box.innerHTML = L.map(function (l) {
return '<label style="display:flex;align-items:center;gap:10px;margin:0;font-size:14px"><span style="flex:0 0 46%">' + l[1] + '</span>' +
'<input type="range" min="0" max="100" step="5" data-wsn="' + l[0] + '" value="' + Math.round(WSN.set[l[0]] * 100) + '" aria-label="' + l[1] + ' volume" style="flex:1;min-width:0"></label>';
}).join("") +
'<div class="dim" style="font-size:12px;opacity:.75;line-height:1.4">Every world has music and sounds of its own, made by the game as you play. Fights bring in battle music. To silence it all, turn Sound off.</div>';
row.parentNode.insertBefore(box, row.nextSibling);
Array.prototype.forEach.call(box.querySelectorAll("[data-wsn]"), function (i) { i.addEventListener("input", function () { WSN.set[i.getAttribute("data-wsn")] = wsnClamp(Number(i.value) / 100, 0, 1); wsnSave(); }); });
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", build);
else
build();
})();
