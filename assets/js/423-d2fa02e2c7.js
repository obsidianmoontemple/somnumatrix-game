/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var STC_PLACES = [
["town", "Stormhaven: Main Street"], ["office", "The Storm Prediction Office (the radar wall)"], ["museum", "The Storm Science Museum"],
["garage", "The Chasers' Garage (the instruments)"], ["diner", "The Twister Diner"], ["motel", "The Prairie Motel"], ["store", "Harlan's General Store"],
["shelter", "The fire station and the town storm shelter"], ["elevator", "The grain elevator office"], ["farm", "Okafor farm and its storm cellar"],
["balloon", "The weather balloon launch pad"], ["station", "The weather station mast"], ["lake", "Lake Wichawa (waterspouts)"],
["survey", "The damage path (survey)"], ["intercept", "Out on the plains, in front of the tornado"]
];
function stcDefaults() { return { open: true, talk: true, ef: 4, count: 2, lightning: true, hail: true, haboob: true, spout: true, push: true, harm: true, notes: "" }; }
function stcMerge(c) { return __ZC(423, 0, this, arguments, new.target); }
var STC = { key: "storms", base: -4700000, cfg: null, cfgAt: 0, G: null, K: null, built: false, lite: false, t: 0, pt: 0, mats: {}, geos: {}, myFn: null,
people: [], beasts: [], cars: [], wantAt: null, room: "" };
var STCK = null;
function stcCfg() {
if (!STC.cfg || Date.now() - STC.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("storms") : null;
STC.cfg = stcMerge(c);
STC.cfgAt = Date.now();
}
return STC.cfg;
}
function stcLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function stcKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function stcEsc(s) { return (typeof esc === "function") ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function stcSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function stcRnd(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
var STC_LS = "stc_progress_v1";
function stcProg() {
if (!STC.prog) {
try {
STC.prog = JSON.parse(localStorage.getItem(STC_LS) || "{}") || {};
}
catch (e) {
STC.prog = {};
}
}
var p = STC.prog;
p.read = p.read || {};
p.did = p.did || {};
return p;
}
function stcProgSave() { try {
localStorage.setItem(STC_LS, JSON.stringify(STC.prog || {}));
}
catch (e) { } }
function stcDid(k) { var p = stcProg(); if (!p.did[k]) {
p.did[k] = Date.now();
stcProgSave();
} }
function stcMat(col, tex, o) { return __ZC(423, 1, this, arguments, new.target); }
function stcGlowM(col, op) { var k = "glow|" + col + "|" + (op || 1); if (!STC.mats[k])
STC.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); return STC.mats[k]; }
function stcCanvasMat(key, w, h, draw, o) { return __ZC(423, 2, this, arguments, new.target); }
function stcP() { return (STCK && STCK.F) || STC.G; }
function stcBox(w, h, d, mat, x, y, z, parent) {
var k = w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = STC.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
STC.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || stcP()).add(m);
return m;
}
function stcCyl(r, h, mat, x, y, z, parent, seg, r2) {
var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, h, seg || 14);
if (typeof metreUVs === "function")
metreUVs(g, "cyl", [r, r2 === undefined ? r : r2, h]);
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || stcP()).add(m);
return m;
}
function stcSph(r, mat, x, y, z, parent, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 14, Math.max(6, (seg || 14) * 0.7 | 0)), mat); m.position.set(x, y, z); (parent || stcP()).add(m); return m; }
function stcPlane(w, h, mat, x, y, z, ry, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; (parent || stcP()).add(m); return m; }
function stcFlat(w, d, mat, x, y, z, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); (parent || stcP()).add(m); return m; }
function stcGroup(x, y, z, ry, parent) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; (parent || stcP()).add(g); return g; }
function stcCtx() { return { F: null, solids: [], floors: [], ramps: [], water: [], rooms: [], spots: [], grid: {} }; }
function stcSolid(x, z, hw, hd, b, h, rot) { var S = { x: x, z: z, hw: hw, hd: hd, b: b || 0, h: h || 3, rot: rot || 0 }; STCK.solids.push(S); return S; }
function stcRound(x, z, r, b, h) { var S = { x: x, z: z, r: r, b: b || 0, h: h || 3 }; STCK.solids.push(S); return S; }
function stcFloor(x0, z0, x1, z1, y) { var F = { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y }; STCK.floors.push(F); return F; }
function stcRamp(x0, z0, x1, z1, axis, a0, y0, a1, y1) { var F = { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), axis: axis, a0: a0, y0: y0, a1: a1, y1: y1 }; STCK.ramps.push(F); return F; }
function stcWater(x, z, r) { var W = { x: x, z: z, r: r }; STCK.water.push(W); return W; }
function stcIndex(K) { return __ZC(423, 3, this, arguments, new.target); }
function stcGroundAt(K, x, z, feet) { return __ZC(423, 4, this, arguments, new.target); }
function stcSolidAt(K, x, z, feet) { return __ZC(423, 5, this, arguments, new.target); }
function stcSpot(x, z, r, name, verb, fn, o) { o = o || {}; var S = { x: x, z: z, r: r, y: o.y || 0, name: name, verb: verb, fn: fn, when: o.when || null }; STCK.spots.push(S); return S; }
function stcWall(dir, a, b, c, y, h, t, mat, opens) { return __ZC(423, 6, this, arguments, new.target); }
function stcBuilding(B) { return __ZC(423, 7, this, arguments, new.target); }
function stcAwning(x, z, w, dpt, side, h, mat) { return __ZC(423, 8, this, arguments, new.target); }
function stcSign(lines, w, h, bg, fg, x, y, z, ry, parent) {
if (typeof wSign !== "function")
return null;
var s = wSign(lines, w, h, bg, fg);
s.position.set(x, y, z);
s.rotation.y = ry || 0;
(parent || stcP()).add(s);
s.userData.keep = 1;
return s;
}
function stcPlaque(key, title, text, w, h, x, y, z, ry, o) { return __ZC(423, 9, this, arguments, new.target); }
function stcLamp(x, y, z, col, size, parent) { if (typeof wGlow !== "function")
return null; var g = wGlow(col || 0xFFE0A8, size || 2.4, 0.35); g.position.set(x, y, z); (parent || stcP()).add(g); g.userData.keep = 1; return g; }
function stcKit(arch, x, z, ry, s, o) { return __ZC(423, 10, this, arguments, new.target); }
function stcPersonFig(seed, x, y, z, ry, look, title) { return __ZC(423, 11, this, arguments, new.target); }
var STC_EF = [
[0, "65-85 mph (105-137 km/h)", "Light damage: shingles and gutters torn off, branches broken, shallow-rooted trees pushed over.", 0x6AB04A],
[1, "86-110 mph (138-177 km/h)", "Moderate damage: roofs badly stripped, mobile homes overturned, doors and windows broken.", 0xC8C040],
[2, "111-135 mph (178-217 km/h)", "Considerable damage: roofs torn off well-built houses, mobile homes destroyed, big trees snapped or uprooted, cars lifted off the ground.", 0xE8A040],
[3, "136-165 mph (218-266 km/h)", "Severe damage: whole storeys of well-built houses destroyed, big buildings badly damaged, trains overturned, trees debarked, heavy cars thrown.", 0xE86A3A],
[4, "166-200 mph (267-322 km/h)", "Devastating damage: well-built houses levelled, cars thrown long distances, small missiles made of debris.", 0xC83A5A],
[5, "over 200 mph (over 322 km/h)", "Incredible damage: strong frame houses swept clean off their foundations, steel-reinforced concrete badly damaged, high-rise buildings deformed.", 0x9A3AB0]
];
var STC_KIT = [
["anemo", "Cup anemometer", "Wind speed", "Three or four cups on arms catch the wind and spin; the faster they turn, the stronger the wind. A vane beside it points into the wind for its direction.", "Invented by Thomas Romney Robinson in Ireland in 1846. A sonic anemometer has no moving parts: it times sound pulses between its arms."],
["baro", "Barometer", "Air pressure", "Air presses down on everything. An aneroid barometer has a sealed metal box that squeezes in when pressure rises and swells when it falls; a needle shows it.", "Evangelista Torricelli made the first, with mercury, in 1643. Falling pressure often means a storm is coming; the centre of a strong tornado can be 100 millibars lower than the air round it."],
["hygro", "Hygrometer", "How damp the air is (humidity) and its dew point", "Two thermometers, one with a wet cloth on its bulb: water drying off the wet one cools it. The drier the air, the bigger the gap between them.", "Storms feed on warm, damp air: on a tornado day on the Plains the dew point is often over 60 °F (16 °C)."],
["rain", "Rain gauge", "How much rain fell", "A funnel leads rain into a narrow tube marked in inches or millimetres; a tipping-bucket gauge counts each little bucket of rain as it tips.", "The US record for one day is 42 inches (1,070 mm), at Alvin, Texas, in 1979 from Tropical Storm Claudette."],
["sonde", "Weather balloon and radiosonde", "Temperature, humidity, pressure and wind, from the ground to about 20 miles up", "A balloon filled with hydrogen or helium carries a small box of sensors and a radio. It rises about 1,000 feet a minute and radios its readings down; the wind is worked out from how GPS sees it drift.", "About 900 places in the world launch one twice a day at the same moment (00 and 12 UTC). The balloon swells as the air thins and bursts at about 100,000 feet; the box parachutes down."],
["probe", "Tornado probe (the 'turtle')", "Pressure, temperature, humidity and wind inside a tornado", "A heavy, low, cone-shaped case is set on the ground in front of a tornado so the wind flows over it instead of lifting it. Inside, sensors record many times a second.", "On 24 June 2003 at Manchester, South Dakota, a probe recorded a pressure drop of 100 millibars as an F4 tornado passed right over it: the biggest ever measured."],
["doppler", "Doppler radar", "Where rain and hail are, and how fast they move towards or away from the radar", "The radar sends out pulses of microwaves; rain, hail and even dust send a little back. The echo's strength shows how much there is (reflectivity); the change in its frequency (the Doppler shift) shows its speed towards or away.", "The US has about 160 big NEXRAD (WSR-88D) radars. Truck-mounted radars drive close to tornadoes: one measured winds of about 300 mph in the Bridge Creek-Moore tornado, Oklahoma, on 3 May 1999."],
["light", "Lightning detector", "Where lightning strikes, and how far away", "Each lightning flash sends out a burst of radio waves. Sensors far apart time when it arrives; the differences show where it struck.", "Light travels almost at once but sound about a mile in five seconds: count from the flash to the thunder and divide by five for the miles (by three for kilometres)."],
["hail", "Hail pad", "How big the hailstones were and how many fell", "A block of soft foam covered in foil is set out; every hailstone dents it, and the dents are measured afterwards.", "The biggest hailstone measured in the US fell at Vivian, South Dakota, on 23 July 2010: 8 inches across, nearly 2 pounds."],
["truck", "Chase truck", "Everything, while moving", "A pickup with a weather station on the roof (wind, temperature, humidity, pressure), radar on a laptop, radios, a dash camera and a GPS that marks every reading.", "Chasers look for the storm's updraft base and its 'inflow', and always keep an escape road open to the side, away from the storm's path."]
];
var STC_LESSONS = [
["thunder", "How a thunderstorm grows", "Warm, wet air rises like a hot-air balloon. As it rises it cools, and the water in it turns into cloud. If it keeps rising, the cloud grows tall and makes rain, hail, lightning and thunder.",
"A thunderstorm needs three things: moisture (warm, damp air near the ground), instability (that air is warmer than the air above it, so once pushed up it keeps rising) and lift (a front, a hill, or the sun heating the ground). Rising air cools; its water vapour condenses into cloud and gives off heat, which keeps it rising. The cloud can tower 40,000 to 60,000 feet, flattening into an anvil at the top of the troposphere. Cold rain and hail falling through it drag air down: the downdraft, which spreads out on the ground as a gust front."],
["supercell", "The supercell: a storm that spins", "A supercell is a giant thunderstorm whose rising air spins slowly, like a top. Most strong tornadoes come from supercells.",
"When the wind changes direction and speed with height (wind shear), it rolls the air near the ground into a horizontal tube. A storm's updraft tilts that tube upright, so the updraft itself rotates: a mesocyclone, often 2 to 6 miles across. A supercell can last for hours. Look for the rain-free base, the lowered wall cloud under the updraft, striations (grooves) round the updraft, the anvil overhead, and the overshooting top where the updraft punches above it. On radar its rain often wraps round the mesocyclone in a hook."],
["tornado", "What a tornado is", "A tornado is a spinning column of air that touches both the cloud and the ground. Most are less than a few hundred metres wide, but they can be the strongest winds on Earth.",
"A tornado is a violently rotating column of air in contact with both the ground and a cumuliform cloud. The funnel you see is cloud formed by the low pressure inside; the wind on the ground can be much wider than the funnel, and some tornadoes are wrapped in rain and hard to see. Shapes are named: rope, cone, stovepipe, wedge (wider than it is tall), and multiple-vortex, with small whirls going round inside the big one. The US has about 1,200 tornadoes a year, more than any other country; 'Tornado Alley' on the Great Plains has the most."],
["ef", "Rating a tornado: the EF scale", "Nobody can measure most tornadoes' winds directly, so experts look at what they broke and work out how strong the wind must have been.",
"After a tornado, National Weather Service teams survey the damage. They match each damaged thing (28 kinds of 'damage indicators', from barns to schools to trees) to a 'degree of damage', and that gives an estimated wind. The Enhanced Fujita scale runs EF0 (65-85 mph) to EF5 (over 200 mph). It replaced Dr Tetsuya Fujita's F scale of 1971 in 2007. Most tornadoes are EF0 or EF1; fewer than one in a hundred is EF4 or EF5, but those cause most of the deaths."],
["radar", "Seeing storms with radar", "Radar sends out invisible waves that bounce off rain and hail. The computer turns the echoes into a coloured map: green for light rain, red and purple for heavy rain and hail.",
"Reflectivity (in dBZ) shows how much rain and hail is out there: 20 dBZ is light rain, 50 is very heavy rain, 60-plus is usually hail. Doppler velocity shows motion towards the radar (green) and away (red); a tight green and red pair side by side is a 'couplet', rotation. A hook echo on reflectivity with a couplet at its tip is a classic tornado warning sign. Dual-polarisation radar can even spot a 'debris ball': things lifted by a tornado on the ground."],
["safety", "Staying safe", "A tornado WATCH means tornadoes could form: be ready. A tornado WARNING means one is happening or about to: take shelter now. Go to the lowest floor, in a small room with no windows, and cover your head.",
"Watch: the Storm Prediction Center says conditions favour tornadoes over a big area for a few hours; make a plan. Warning: the local Weather Service office says a tornado is on radar or seen; act now. Go to a basement or storm cellar, or an inner room on the lowest floor away from windows (a closet, a bathroom), get under something sturdy, and protect your head and neck. Mobile homes and cars are not safe: leave for a sturdy building. Never shelter under a highway overpass: the wind speeds up through it. When thunder roars, go indoors: lightning can strike 10 miles from a storm."],
["others", "Other storms and what they can do", "Not every storm makes tornadoes. Some make giant hail, some blow straight-line winds, some lift whole walls of dust, and hurricanes are storms as big as whole states.",
"Hail grows as updrafts throw ice up and down through the cloud, adding a layer each time; updrafts over 100 mph can hold up stones bigger than a softball. Downbursts and derechos (long lines of storms whose winds run for hundreds of miles) can blow at over 100 mph in straight lines. A haboob is a wall of dust pushed ahead of a storm's outflow, sometimes a mile high. Waterspouts are tornadoes over water: most are weaker 'fair-weather' spouts. Hurricanes (tropical cyclones) are rated by the Saffir-Simpson scale: Category 1 is 74-95 mph, Category 5 is 157 mph or more. Lightning heats the air to about 30,000 °C, five times hotter than the surface of the Sun."]
];
var STC_QUIZ = [
["A tornado WARNING means...", "A tornado is happening or about to: take shelter now", ["Tornadoes could form later today", "The storm is over", "Only people outside need to worry"]],
["What does the EF scale use to rate a tornado?", "The damage it did", ["The width of its funnel", "How long it lasted", "How loud it was"]],
["Which storm makes most strong tornadoes?", "A supercell (a rotating thunderstorm)", ["A hurricane's eye", "A snowstorm", "A fair-weather cloud"]],
["What does a cup anemometer measure?", "Wind speed", ["Air pressure", "Humidity", "Rainfall"]],
["On Doppler velocity, a tight pair of green and red side by side shows...", "Rotation (a couplet)", ["Hail", "Snow", "Clear air"]],
["Where is the safest place in a house when a tornado comes?", "A small inside room on the lowest floor, away from windows", ["Upstairs by a big window", "In the garage in the car", "Out in the garden"]],
["What is the strongest rating on the EF scale?", "EF5, winds over 200 mph", ["EF10", "Category 5", "F12"]],
["Weather balloons are launched round the world how often?", "Twice a day, at the same moment everywhere", ["Once a year", "Only during storms", "Every minute"]],
["You see the flash and count 10 seconds to the thunder. About how far away was it?", "About 2 miles (3 km)", ["About 10 miles", "Right overhead", "About 50 miles"]],
["Why should you never shelter under a highway overpass?", "The wind speeds up as it squeezes through", ["It is too dark", "Cars are too loud", "It is always flooded"]]
];
var STC_DAMAGE = [
["shingles", "A house with shingles and gutters torn off; a few branches down", 0],
["mobile", "A mobile home pushed off its blocks and rolled onto its side", 1],
["roof", "A well-built frame house with its whole roof gone, walls standing", 2],
["walls", "A well-built house with most of its outside walls blown down", 3],
["level", "A well-built house levelled: a pile of wreckage on the slab", 4],
["swept", "A strong house swept clean off its foundation; the slab bare, bolts bent", 5]
];
var STC_GUIDES = {
marisol: { n: "Marisol Vega", sex: "f", age: 42, title: "Lead forecaster", at: "office",
g: "Lead forecaster at the Stormhaven Storm Prediction Office, twenty years at the radar. Explains watches and warnings, radar reflectivity and velocity, hook echoes and couplets, CAPE and wind shear. Calm under pressure; keeps a coffee mug that says 'It's not the heat, it's the humidity'.",
hi: "Pull up a chair, the radar's busy today. See that hook on the south end of the cell? That's where I'm watching.", look: { top: 0x2A4A6A, bottom: 0x3A3A42, hair: 0x2A1A12, skin: 0xB8865A } },
eli: { n: "Professor Eli Brandt", sex: "m", age: 63, title: "Museum curator", at: "museum",
g: "Curator of the Storm Science Museum and a retired university meteorologist. Loves the history: Fujita's scale, the Tri-State Tornado of 1925, the El Reno tornado of 2013 (2.6 miles wide, the widest on record), the Vivian hailstone. Patient and funny with children.",
hi: "Welcome! Mind the hailstone case, the big one's a cast of the real Vivian stone: eight inches across. Where shall we start?", look: { top: 0x6A5A3A, bottom: 0x4A4A4A, hair: 0xC8C8C8, skin: 0xE0B898 } },
june: { n: "June Harlan", sex: "f", age: 34, title: "Chase team lead", at: "garage",
g: "Leads the Stormhaven chase team: drives the truck, deploys the probes, launches the balloons. Grew up on a wheat farm here. Strict about safety (never get in a tornado's path without an escape road, stay out of the hail core, never chase at night in the rain). Knows every instrument in the garage.",
hi: "You riding with us today? Grab a vest. First rule: we always keep an escape road open.", look: { top: 0xC86A2A, bottom: 0x3A4A6A, hair: 0x8A5A2A, skin: 0xE8C0A0 } },
dale: { n: "Dale Okafor", sex: "m", age: 51, title: "Warning meteorologist, damage survey team", at: "survey",
g: "Weather Service meteorologist who leads damage surveys: walks the path after a tornado, matches damage indicators to the EF scale, measures the path's length and width. Owns the farm east of town with a storm cellar. Steady, kind, careful never to make light of people's losses.",
hi: "This is where it crossed last spring. Look at each thing it broke and tell me what you think the wind was doing.", look: { top: 0xD8C048, bottom: 0x4A4A3A, hair: 0x141010, skin: 0x5A3A2A } },
rosie: { n: "Rosie Tate", sex: "f", age: 56, title: "Cook and owner of the Twister Diner", at: "diner",
g: "Runs the Twister Diner on Main Street; has fed chasers for thirty years and heard every story. Knows the town's storm shelter drill by heart and the history of the town. Warm, teasing, generous with pie.",
hi: "Sit down, hon, the pie's still warm. Chasers always come in hungry and leave with a story.", look: { top: 0xE84A4A, bottom: 0x2A2A3A, hair: 0xC8A060, skin: 0xE8C0A0 } },
hank: { n: "Hank Pruitt", sex: "m", age: 67, title: "Fire chief and storm shelter warden", at: "shelter",
g: "Fire chief of Stormhaven's volunteer fire department; sounds the outdoor warning sirens and runs the town storm shelter under the fire station. Teaches families their safety plan. Gruff, kind, a grandfather of six.",
hi: "Siren tests are Wednesdays at noon. If you ever hear it any other time, you come down here, no questions.", look: { top: 0x8A2A2A, bottom: 0x2A2A2A, hair: 0xB8B8B8, skin: 0xD8A880 } }
};
var STC_AT = {
town: [0, -80, Math.PI], office: [-15, -48, Math.PI / 2], museum: [16, -50, -Math.PI / 2], garage: [16, -18, -Math.PI / 2], diner: [-15, -21, Math.PI / 2],
motel: [-6, 47, Math.PI / 2], store: [-15, 18, Math.PI / 2], shelter: [22, 14, 0, -3], elevator: [54, 58, Math.PI / 2], farm: [300, 232, Math.PI],
balloon: [90, -140, 0], station: [130, -104, 0], lake: [-335, 385, Math.PI / 2], survey: [360, -330, -Math.PI / 2], intercept: [0, -300, Math.PI]
};
var STC_TOWN_R = 230;
function stcLand() { return __ZC(423, 12, this, arguments, new.target); }
function stcDesk(x, z, ry, o) { return __ZC(423, 13, this, arguments, new.target); }
function stcTable(x, z, w, d, o) { o = o || {}; var wd = o.mat || stcMat(0x7A5A3A, "wood"); stcBox(w, 0.07, d, wd, x, o.h || 0.78, z); stcBox(0.12, (o.h || 0.78), 0.12, wd, x, (o.h || 0.78) / 2, z); stcBox(w * 0.6, 0.06, d * 0.6, wd, x, 0.03, z); stcSolid(x, z, w / 2, d / 2, 0, (o.h || 0.78) + 0.1); }
function stcShelf(x, z, w, ry, cols) { return __ZC(423, 14, this, arguments, new.target); }
function stcBench(x, z, w, ry) { return __ZC(423, 15, this, arguments, new.target); }
function stcBed(x, z, ry) { return __ZC(423, 16, this, arguments, new.target); }
function stcScreenMat(key, draw) { return stcCanvasMat("scr-" + key, 256, 160, draw, { basic: true, full: true }); }
function stcTown() { return __ZC(423, 17, this, arguments, new.target); }
function stcColumns(x, z, h, n) {
var m = stcMat(0xE0D8C8, "stone");
for (var i = 0; i < n; i++) {
var zz = z - 4.5 + i * 3;
if (Math.abs(zz - z) < 1.6)
continue;
stcCyl(0.35, h, m, x - 1.2, h / 2, zz, null, STC.lite ? 8 : 14);
stcRound(x - 1.2, zz, 0.4, 0, h);
}
stcBox(2.8, 0.4, 11, m, x - 1, h + 0.2, z);
}
function stcMuseum() { return __ZC(423, 18, this, arguments, new.target); }
function stcGarage() { return __ZC(423, 19, this, arguments, new.target); }
function stcFireStation(red) { return __ZC(423, 20, this, arguments, new.target); }
function stcElevator(conc, tan) { return __ZC(423, 21, this, arguments, new.target); }
function stcFarm() { return __ZC(423, 22, this, arguments, new.target); }
function stcPlains() { return __ZC(423, 23, this, arguments, new.target); }
function stcSurvey() { return __ZC(423, 24, this, arguments, new.target); }
var STC_SKY = { storms: [], spout: null, haboob: null, bolt: null, boltT: 8, fall: null, deck: null, t: 0, warn: false, glow: 0 };
var STC_H = 520;
function stcStreakTex(key, col, dark, tilt) { return __ZC(423, 25, this, arguments, new.target); }
function stcCloudTex(key, base, spots) { return __ZC(423, 26, this, arguments, new.target); }
function stcFunnelTex(key, rgb, fadeTop, fadeBottom, contrast) { return __ZC(423, 27, this, arguments, new.target); }
function stcPuffTex(key, top, bot) { return __ZC(423, 28, this, arguments, new.target); }
function stcPuff(parent, tex, x, y, z, sx, sy, op) { var m = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: op || 0.9, depthWrite: false, fog: true }); var s = new THREE.Sprite(m); s.scale.set(sx, sy, 1); s.position.set(x, y, z); parent.add(s); return s; }
function stcDiscTex(key, rgb) { return __ZC(423, 29, this, arguments, new.target); }
function stcShaftTex(key, rgb) { return __ZC(423, 30, this, arguments, new.target); }
function stcDotTex() { return __ZC(423, 31, this, arguments, new.target); }
function stcSkyBuild(G) { return __ZC(423, 32, this, arguments, new.target); }
function stcFunnelMesh(radial, hseg, mat) {
var g = new THREE.CylinderGeometry(1, 1, 1, radial, hseg, true);
g.translate(0, 0.5, 0);
var m = new THREE.Mesh(g, mat);
m.userData.base = g.attributes.position.array.slice();
m.frustumCulled = false;
return m;
}
function stcStormMake(G, i) { return __ZC(423, 33, this, arguments, new.target); }
function stcStormStart(S) { return __ZC(423, 34, this, arguments, new.target); }
function stcStormsBuild(G) { STC_SKY.storms = []; for (var i = 0; i < 3; i++)
STC_SKY.storms.push(stcStormMake(G, i)); stcSpoutBuild(G); stcHaboobBuild(G); }
function stcFunnelShape(M, S, rB, rT, lean, sway, t, rmul) { return __ZC(423, 35, this, arguments, new.target); }
function stcStormTick(S, dt) { return __ZC(423, 36, this, arguments, new.target); }
function stcSpoutBuild(G) { return __ZC(423, 37, this, arguments, new.target); }
function stcSpoutTick(dt) { return __ZC(423, 38, this, arguments, new.target); }
function stcHaboobBuild(G) { return __ZC(423, 39, this, arguments, new.target); }
function stcHaboobTick(dt) { return __ZC(423, 40, this, arguments, new.target); }
function stcInDust(x) { var H = STC_SKY.haboob; if (!H || !H.on)
return 0; var d = H.x - x; if (d < 0)
return 0; return Math.max(0, Math.min(1, d / 80)) * Math.max(0, 1 - Math.max(0, d - 600) / 900); }
function stcBoltMake(x, z) { return __ZC(423, 41, this, arguments, new.target); }
function stcBoltTick(dt) { return __ZC(423, 42, this, arguments, new.target); }
function stcNearest(x, z) {
var best = null, bd = 1e9;
STC_SKY.storms.forEach(function (S) { if (S.stage === "gone")
return; var d = Math.hypot(x - S.x, z - S.z); if (d < bd) {
bd = d;
best = S;
} });
return best ? { S: best, d: bd } : null;
}
var STC_HP = { hp: 100, veil: null, down: 0, said: {} };
function stcSheltered(L, feet, inside) { return inside || feet < -1 || Math.hypot(L.x, L.z) < STC_TOWN_R; }
function stcHarm(d, why) { return __ZC(423, 43, this, arguments, new.target); }
function stcVeil() { return __ZC(423, 44, this, arguments, new.target); }
function stcHurtPaint() { try {
var v = stcVeil(), a = STC_HP.down ? 0.95 : Math.max(0, (70 - STC_HP.hp) / 70) * 0.8;
v.style.background = STC_HP.down ? "rgba(8,8,10,1)" : "radial-gradient(ellipse at center,rgba(40,10,10,0) 40%,rgba(60,10,10,0.75) 100%)";
if (Math.abs((+v.style.opacity || 0) - a) > 0.02)
v.style.opacity = String(a);
}
catch (e) { } }
function stcDown(why) { return __ZC(423, 45, this, arguments, new.target); }
function stcDownTick(dt) {
if (!STC_HP.down)
return false;
STC_HP.down -= dt;
if (STC_HP.down <= 0) {
STC_HP.down = 0;
STC_HP.hp = 100;
STC_HP.said = {};
stcArrive("shelter");
}
return true;
}
function stcWindTick(dt, L, feet, inside) { return __ZC(423, 46, this, arguments, new.target); }
function stcFallTick(dt, L, inside) { return __ZC(423, 47, this, arguments, new.target); }
function stcCard(title, sub, rows, notes, extra, fns) { worldCard(worldFacts(title, sub || "", rows || [], notes || [], extra || ""), fns || {}); }
function stcLessonCard(key) { return __ZC(423, 48, this, arguments, new.target); }
function stcCourse() { return __ZC(423, 49, this, arguments, new.target); }
function stcQuiz() { return __ZC(423, 50, this, arguments, new.target); }
function stcQuizMark() { return __ZC(423, 51, this, arguments, new.target); }
function stcKitList() { return __ZC(423, 52, this, arguments, new.target); }
function stcPie() { return __ZC(423, 53, this, arguments, new.target); }
function stcRadarDraw(c, W, H, full) { return __ZC(423, 54, this, arguments, new.target); }
function stcRadarTick(dt) { return __ZC(423, 55, this, arguments, new.target); }
function stcBearing(dx, dz) { var a = (Math.atan2(dx, -dz) * 180 / Math.PI + 360) % 360; return ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(a / 45) % 8]; }
function stcRadarCard() { return __ZC(423, 56, this, arguments, new.target); }
function stcReadings(x, z) { return __ZC(423, 57, this, arguments, new.target); }
function stcStationCard() { return __ZC(423, 58, this, arguments, new.target); }
function stcBalloonLaunch() { return __ZC(423, 59, this, arguments, new.target); }
function stcBalloonTick(dt) { return __ZC(423, 60, this, arguments, new.target); }
function stcChaseStart() { return __ZC(423, 61, this, arguments, new.target); }
function stcRideTick(dt) { return __ZC(423, 62, this, arguments, new.target); }
function stcRideStop() { return __ZC(423, 63, this, arguments, new.target); }
function stcTruckSpot() { return __ZC(423, 64, this, arguments, new.target); }
function stcRideArrive() { return __ZC(423, 65, this, arguments, new.target); }
function stcTruckMenu(arrived) { return __ZC(423, 66, this, arguments, new.target); }
function stcChaseFrom(x, z) { var tk = STC.truck; stcChaseStart(); if (STC.ride) {
STC.ride.pts[0] = [x, z];
STC.ride.pts[1] = [x, STC.ride.pts[1][1]];
} }
function stcProbeDrop(S) { return __ZC(423, 67, this, arguments, new.target); }
function stcProbeTick() { return __ZC(423, 68, this, arguments, new.target); }
function stcRate(i) { return __ZC(423, 69, this, arguments, new.target); }
function stcRated(i, ef) { return __ZC(423, 70, this, arguments, new.target); }
function stcGuide(key, x, z, ry) { return __ZC(423, 71, this, arguments, new.target); }
function stcTalk(key) { return __ZC(423, 72, this, arguments, new.target); }
function stcSystem(c) { return __ZC(423, 73, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) { if (c && c.stc) {
try {
var s = stcSystem(c);
if (s)
return s;
}
catch (e) {
if (window.console)
console.warn("[storms] voice", e);
}
} return cs.apply(this, arguments); };
})();
(function () {
if (typeof localVoice !== "function")
return;
var lv = localVoice;
localVoice = function (c, q) {
if (!(c && c.stc))
return lv.apply(this, arguments);
try {
var Gd = STC_GUIDES[c.stc], pool = [];
if (String(q || "") === "hello")
return Gd.hi;
STC_LESSONS.forEach(function (L) { String(L[3]).split(". ").forEach(function (s) { if (s.length > 40)
pool.push(s.replace(/\.?$/, ".")); }); });
STC_KIT.forEach(function (k) { pool.push(k[4]); });
c.stcI = ((c.stcI || 0) + 7) % pool.length;
return pool[c.stcI] || Gd.hi;
}
catch (e) {
return lv.apply(this, arguments);
}
};
})();
function stcArrive(at) { return __ZC(423, 74, this, arguments, new.target); }
function stcBuild(G) { return __ZC(423, 75, this, arguments, new.target); }
function stcForget() { return __ZC(423, 76, this, arguments, new.target); }
var STC_DRESS = [{ top: 0x3A5A8A, bottom: 0x2A3A5A }, { top: 0xC84A3A, bottom: 0x4A4A4A }, { top: 0xE8E0D0, bottom: 0x3A4A6A }, { top: 0x5A7A3A, bottom: 0x6A5A40 }, { top: 0xE8A040, bottom: 0x2A2A3A }, { top: 0x6A4A8A, bottom: 0x3A3A3A }, { top: 0x8A8A8A, bottom: 0x2A3A5A }];
function stcLife() { return __ZC(423, 77, this, arguments, new.target); }
function stcLifeTick(dt) { return __ZC(423, 78, this, arguments, new.target); }
var STC_ENV = {
out: { top: 0x2A323C, low: 0x7A8490, fog: 0x7E8890, fogD: 0.0009, sun: 0.75, sunCol: 0xFFD8A0, sunDir: [-0.8, 0.35, 0.3], hemi: 0.62, hemiCol: 0xA8B4C0, hemiGround: 0x5A5440 },
inside: { top: 0x2A323C, low: 0x6A7480, fog: 0x8A8C8A, fogD: 0.004, sun: 0.45, sunCol: 0xFFE4C0, sunDir: [-0.4, 0.8, 0.3], hemi: 0.95, hemiCol: 0xF0E4D0, hemiGround: 0x6A5A48 },
below: { top: 0x1A1A1A, low: 0x2A2826, fog: 0x2A2826, fogD: 0.02, sun: 0.15, sunCol: 0xFFE0B0, sunDir: [0.2, 0.9, 0.1], hemi: 1.1, hemiCol: 0xFFE8C8, hemiGround: 0x4A4036 }
};
function stcEnv() { return __ZC(423, 79, this, arguments, new.target); }
function stcRoomAt(K, x, z, feet) {
var best = null;
(K.rooms || []).forEach(function (r) { if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1 && feet >= r.y - 1.2 && feet <= r.y + r.h && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r; });
return best;
}
function stcMayGo() { if (stcKeeper())
return ""; return stcCfg().open ? "" : "Tornado Alley is closed for now by the Keeper."; }
function stcGo(at, opt) {
at = at || "town";
var why = stcMayGo();
if (why) {
stcSay("🌪️ <b>" + stcEsc(why) + "</b>");
return false;
}
STC.wantAt = at;
if (WLD.on === STC.key) {
worldCard(null);
stcArrive(at);
return true;
}
return worldGo(STC.key, opt || { fromName: "the city" });
}
function stcLeave() { worldCard(null); STC.ride = null; worldHome("🌪️ <b>Back from Tornado Alley.</b> 'When thunder roars, go indoors.'"); }
if (typeof worldDef === "function")
worldDef(STC.key, {
base: STC.base, far: 4200, ownSky: true, tone: 180,
env: function () { return stcEnv(); },
build: function (G) { stcBuild(G); },
enter: function () { return __ZC(423, 80, this, arguments, new.target); },
leave: function () { return __ZC(423, 81, this, arguments, new.target); },
ground: function (x, z, feet) { var K = STC.K; if (!K)
return 0; return stcGroundAt(K, x, z, feet); },
block: function (x, z, feet) { var K = STC.K; if (!K)
return false; if (x * x + z * z > 1500 * 1500)
return true; return stcSolidAt(K, x, z, feet); },
tick: function (dt) { stcTick(dt); },
back: function () { stcLeave(); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(STC.key) < 0)
WLG.keys.push(STC.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === STC.key)
stcForget(); return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[STC.key]) {
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.push([STC.key, "Tornado Alley", 2, "city"]);
DGR_W[STC.key] = { id: STC.key, name: "Tornado Alley", def: 2, group: "city" };
}
if (typeof WSN_WORLD !== "undefined" && !WSN_WORLD[STC.key])
WSN_WORLD[STC.key] = { s: "pastoral", b: ["wind", "thunder", "windhigh"], f: "battle" };
function stcTick(dt) { return __ZC(423, 82, this, arguments, new.target); }
function stcDirectory() { return __ZC(423, 83, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-storms"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-storms";
b.title = "Tornado Alley";
b.textContent = "🌪️ Storms";
b.onclick = function () { stcDirectory(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "stc-ps"; }))
PS_EXTRAS.push({ id: "stc-ps", label: "🌪️ Tornado Alley (storm chasing)", show: function () { return true; }, run: function () { setTimeout(stcDirectory, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var pl = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (pl && pl.ids.indexOf("stc-ps") < 0)
pl.ids.push("stc-ps");
}
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-stc]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-stc", "1");
b.textContent = "🌪️ Tornado Alley";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } stcGo("town"); };
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
var m = /[?&]kstorms=([a-z]+)/.exec(location.search);
if (!m)
return;
var where = STC_AT[m[1]] ? m[1] : "town";
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!stcKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
stcGo(where);
try {
var q = new URLSearchParams(location.search);
q.delete("kstorms");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
function stcTree(x, z, s, nosolid) { (STC.treeList || (STC.treeList = [])).push([x, z, s || 1, (x * 7.3 + z * 3.1) % 6.283, nosolid ? 1 : 0]); }
var STC_FARMS = [[-640, -260, 0], [700, 180, 1], [-280, -760, 2], [560, -820, 3], [-860, 640, 4], [860, 820, 5], [-200, 980, 6], [1040, -300, 7], [-1060, -780, 8], [180, 700, 9]];
function stcOnRoadPad(x, z, pad) { for (var k = -3; k <= 3; k++) {
if (Math.abs(x - k * 400) < (k === 0 ? 7 : 4.5) + pad || Math.abs(z - k * 400) < (k === 0 ? 6 : 4.5) + pad)
return true;
} return Math.abs(x - 40) < 3 + pad && Math.abs(z) < 300; }
function stcFill() { return __ZC(423, 84, this, arguments, new.target); }
function stcFillTick(dt) {
var t = STC.t;
(STC.jacks || []).forEach(function (J) { J.b.rotation.z = Math.sin(t * 0.9 + J.ph) * 0.28; });
if (STC.pivot)
STC.pivot.rotation.y += dt * 0.01;
}
var STC_CAR = {
pickup: { L: 5.5, W: 1.95, r: 0.42, ax: [1.72, -1.68], yb: 0.5,
body: [[-2.75, 0.5], [-2.75, 1.1], [-0.78, 1.1], [-0.74, 1.84], ["q", -0.72, 1.92, -0.5, 1.92], [0.32, 1.92], [1.02, 1.18], [2.5, 1.1], ["q", 2.8, 1.08, 2.8, 0.84], [2.8, 0.5]],
side: [[-0.62, 1.22], [-0.6, 1.8], [0.3, 1.82], [0.92, 1.22]], ws: [[0.32, 1.92], [1.02, 1.18]], rw: [[-0.78, 1.12], [-0.74, 1.84]], pil: [-0.12], bed: [-2.65, -0.86, 1.1], grille: [2.8, 0.62, 1.02], tail: -2.75, doors: [-0.75, -0.12, 0.95] },
suv: { L: 5.0, W: 1.95, r: 0.42, ax: [1.55, -1.5], yb: 0.52,
body: [[-2.5, 0.52], [-2.52, 1.22], ["q", -2.5, 1.9, -2.25, 1.9], [0.42, 1.92], [1.12, 1.2], [2.22, 1.12], ["q", 2.5, 1.1, 2.5, 0.86], [2.5, 0.52]],
side: [[-2.22, 1.26], [-2.18, 1.8], [0.4, 1.82], [1.02, 1.26]], ws: [[0.42, 1.92], [1.12, 1.2]], rw: [[-2.52, 1.26], [-2.46, 1.8]], pil: [-1.02, 0.02], grille: [2.5, 0.64, 1.04], tail: -2.52, doors: [-1.02, 0.02, 0.98] },
sedan: { L: 4.8, W: 1.85, r: 0.36, ax: [1.45, -1.38], yb: 0.42,
body: [[-2.4, 0.42], [-2.42, 0.98], [-1.75, 1.04], [-0.92, 1.44], ["q", -0.4, 1.5, 0.28, 1.48], [0.98, 1.06], [2.22, 0.92], ["q", 2.42, 0.88, 2.42, 0.68], [2.42, 0.42]],
side: [[-1.55, 1.08], [-0.86, 1.41], [0.27, 1.43], [0.9, 1.08]], ws: [[0.28, 1.48], [0.98, 1.06]], rw: [[-1.75, 1.04], [-0.92, 1.44]], pil: [-0.3], grille: [2.42, 0.5, 0.82], tail: -2.42, doors: [-1.05, -0.3, 0.72] },
flatbed: { L: 6.6, W: 2.05, r: 0.46, ax: [2.1, -1.55, -2.6], yb: 0.56,
body: [[-3.3, 0.56], [-3.3, 1.18], [-0.72, 1.18], [-0.7, 2.06], ["q", -0.68, 2.14, -0.45, 2.14], [0.42, 2.14], [1.1, 1.32], [2.95, 1.24], ["q", 3.3, 1.22, 3.3, 0.94], [3.3, 0.56]],
side: [[-0.58, 1.34], [-0.56, 2.0], [0.4, 2.02], [1.0, 1.34]], ws: [[0.42, 2.14], [1.1, 1.32]], rw: [[-0.72, 1.3], [-0.7, 2.06]], pil: [], grille: [3.3, 0.7, 1.16], tail: -3.3, doors: [-0.68, 0.98] },
box: { L: 7.2, W: 2.3, r: 0.5, ax: [2.4, -1.9, -2.95], yb: 0.6,
body: [[-3.6, 0.6], [-3.6, 3.3], [0.95, 3.3], [0.95, 2.42], [1.55, 2.38], [2.25, 1.5], [3.3, 1.42], ["q", 3.6, 1.4, 3.6, 1.1], [3.6, 0.6]],
side: [[1.02, 1.6], [1.02, 2.3], [1.55, 2.3], [2.15, 1.6]], ws: [[1.55, 2.38], [2.25, 1.5]], pil: [], grille: [3.6, 0.78, 1.32], tail: -3.6, doors: [1.0, 2.25] }
};
function stcCarMat(name, col) { return __ZC(423, 85, this, arguments, new.target); }
function stcCarGeo(key, make) { var k = "car|" + key; if (!STC.geos[k])
STC.geos[k] = make(); return STC.geos[k]; }
function stcCarShape(pts, arches, yb) { return __ZC(423, 86, this, arguments, new.target); }
function stcExtrude(shape, w, bev, lite) {
var b = bev || 0, g = new THREE.ExtrudeGeometry(shape, { depth: Math.max(0.01, w - 2 * b), bevelEnabled: b > 0, bevelThickness: b, bevelSize: b, bevelSegments: lite ? 1 : 3, curveSegments: lite ? 5 : 10 });
g.translate(0, 0, -(w - 2 * b) / 2);
g.computeVertexNormals();
return g;
}
function stcPane(a, b, w, out) { return __ZC(423, 87, this, arguments, new.target); }
function stcCarMesh(geo, mat, parent, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); m.castShadow = true; parent.add(m); return m; }
function stcWheel(parent, x, z, r, tw, lite, side) { return __ZC(423, 88, this, arguments, new.target); }
function stcCar(kind, x, z, ry, o) { return __ZC(423, 89, this, arguments, new.target); }
function stcCarSolid(x, z, ry, L, W) { var dx = Math.sin(ry || 0), dz = Math.cos(ry || 0), n = Math.max(2, Math.round(L / W)); for (var i = 0; i < n; i++) {
var u = (i + 0.5) / n - 0.5;
stcRound(x + dx * u * L, z + dz * u * L, W * 0.55, 0, 2.2);
} }
function stcTractor(inn, o, lite) { return __ZC(423, 90, this, arguments, new.target); }
function stcCrops() { return __ZC(423, 91, this, arguments, new.target); }
function stcHorizon() { return __ZC(423, 92, this, arguments, new.target); }
function stcHorizonTick() { var h = STC.horizon; if (!h || typeof camera === "undefined")
return; h.position.x = camera.position.x - STC.base; h.position.z = camera.position.z; }
var STC_HANDS = { rain: 0, baro: [], strikes: [], lastBolt: null, t: 0 };
function stcHandsTick(dt) { return __ZC(423, 93, this, arguments, new.target); }
function stcHandsReset() { STC_HANDS.baro = []; STC_HANDS.strikes = []; STC_HANDS.lastBolt = null; }
function stcAsk(title, sub, q, opts, right, why, after) { return __ZC(423, 94, this, arguments, new.target); }
function stcHtml(title, sub, body, btns) { return __ZC(423, 95, this, arguments, new.target); }
function stcRow(k, v) { return "<div style='display:flex;justify-content:space-between;gap:10px;border-bottom:1px solid rgba(255,255,255,.08);padding:3px 0'><span style='opacity:.75'>" + k + "</span><b style='text-align:right'>" + v + "</b></div>"; }
var STC_BEAUFORT = [[1, "Calm", "smoke rises straight up"], [4, "Light air", "smoke drifts"], [8, "Light breeze", "leaves rustle, you feel it on your face"], [13, "Gentle breeze", "leaves and twigs always moving, flags stretch"], [19, "Moderate breeze", "dust and paper lift, small branches move"],
[25, "Fresh breeze", "small trees sway"], [32, "Strong breeze", "big branches move, wires whistle, umbrellas hard to hold"], [39, "Near gale", "whole trees move, hard to walk into it"], [47, "Gale", "twigs break off, walking is hard"], [55, "Strong gale", "slight damage to buildings, shingles lifted"],
[64, "Storm", "trees uprooted, much damage to buildings"], [73, "Violent storm", "widespread damage"], [999, "Hurricane force", "devastation"]];
function stcBeaufort(mph) { for (var i = 0; i < STC_BEAUFORT.length; i++)
if (mph < STC_BEAUFORT[i][0])
return [i].concat(STC_BEAUFORT[i].slice(1)); return [12, "Hurricane force", ""]; }
var STC_HAILSIZE = [[0.25, "a pea"], [0.5, "a marble"], [0.75, "a penny"], [0.88, "a nickel"], [1.0, "a quarter"], [1.5, "a ping-pong ball"], [1.75, "a golf ball"], [2.5, "a tennis ball"], [2.75, "a baseball"], [4.0, "a softball"]];
function stcHailName(inch) { var n = STC_HAILSIZE[0][1]; STC_HAILSIZE.forEach(function (h) { if (inch >= h[0] - 0.06)
n = h[1]; }); return n; }
function stcKitCard(key) { return __ZC(423, 96, this, arguments, new.target); }
function stcTryAnemo() { return __ZC(423, 97, this, arguments, new.target); }
function stcBaroDial(p) { return __ZC(423, 98, this, arguments, new.target); }
function stcTryBaro() { return __ZC(423, 99, this, arguments, new.target); }
function stcWetBulb(T, RH) { return T * Math.atan(0.151977 * Math.sqrt(RH + 8.313659)) + Math.atan(T + RH) - Math.atan(RH - 1.676331) + 0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) - 4.686035; }
function stcTryHygro() { return __ZC(423, 100, this, arguments, new.target); }
function stcTryRain() { return __ZC(423, 101, this, arguments, new.target); }
function stcTryLight() { return __ZC(423, 102, this, arguments, new.target); }
function stcTryHail() { return __ZC(423, 103, this, arguments, new.target); }
function stcTryTruck() { return __ZC(423, 104, this, arguments, new.target); }
function stcEfTry() { return __ZC(423, 105, this, arguments, new.target); }
function stcHailGrow(st) { return __ZC(423, 106, this, arguments, new.target); }
var STC_PARTS = [["Updraft", "The tower of warm, damp air rising at up to 100 mph or more. Its rotation is the mesocyclone, two to six miles across."], ["Anvil", "Where the updraft hits the top of the lowest layer of the air (about 40,000 to 50,000 ft) and spreads out flat, often for a hundred miles downwind."],
["Overshooting top", "A dome punching above the anvil: the updraft is so strong it overshoots. A sign of a dangerous storm."], ["Wall cloud", "A lowered, often rotating cloud under the rain-free base. Tornadoes form from it."],
["Rear-flank downdraft", "Cool air sinking behind the updraft and wrapping round it; the clear slot it carves is often where the tornado touches down."], ["Forward-flank downdraft", "The heavy rain and hail, ahead of the updraft. A tornado can be hidden in it ('rain-wrapped')."],
["Mammatus", "Pouches hanging under the anvil, made by sinking cold air. Beautiful, and a sign of a strong storm."]];
function stcModelTry(i) { return __ZC(423, 107, this, arguments, new.target); }
var STC_RECORDS = [["Which was the deadliest tornado in US history?", ["Joplin, Missouri, 2011", "The Tri-State Tornado, 1925", "Moore, Oklahoma, 1999"], 1, "The Tri-State Tornado of 18 March 1925 killed 695 people along a path of at least 174 miles."],
["How wide was the widest tornado ever measured?", ["Half a mile", "2.6 miles", "10 miles"], 1, "El Reno, Oklahoma, 31 May 2013: 2.6 miles wide."],
["What is the fastest wind ever measured on Earth, in a tornado?", ["About 150 mph", "About 300 mph", "About 600 mph"], 1, "About 300 mph, measured by a truck-mounted Doppler radar at Bridge Creek-Moore, Oklahoma, on 3 May 1999."],
["How many tornadoes touched down in the 25 to 28 April 2011 outbreak?", ["About 36", "About 360", "About 3,600"], 1, "About 360, the most in one outbreak on record."],
["Which country has the most tornadoes?", ["The United States", "Australia", "Brazil"], 0, "The US has about 1,200 a year, more than any other country: cold dry air from Canada and the Rockies meets warm wet air from the Gulf over flat plains."]];
function stcRecordsTry() { stcDid("try_records"); var R = STC_RECORDS[Math.floor(Math.random() * STC_RECORDS.length)]; stcAsk("🏆 Tornado records", "The records wall", R[0], R[1], R[2], R[3], stcRecordsTry); }
function stcWatchTry() { return __ZC(423, 108, this, arguments, new.target); }
var STC_PACK = [["A gallon of water a person, a day, for 3 days", 1], ["A flashlight and spare batteries", 1], ["Candles", 0], ["A battery or wind-up weather radio", 1], ["A first-aid kit and medicines", 1], ["A whistle to signal for help", 1], ["Sandals", 0], ["Sturdy shoes and a helmet", 1], ["A big TV", 0], ["Copies of important papers", 1], ["A phone charger or power bank", 1]];
function stcPackTry(st) { return __ZC(423, 109, this, arguments, new.target); }
var STC_DRILL = ["Get to the lowest floor", "Go to a small room in the middle, away from windows", "Get under something sturdy", "Crouch down and cover your head and neck"];
function stcDrillTry(done) { return __ZC(423, 110, this, arguments, new.target); }
function stcTwo(title, readLabel, readFn, tryLabel, trySub, tryFn) { stcHtml(title, "", "", [["🖐️ " + tryLabel, trySub, tryFn], ["📖 " + readLabel, "", readFn]]); }
var STCD = { g: null, on: false, cups: null, vane: null };
function stcHallSpot() {
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
var a2 = (gaps[6] || gaps[gaps.length - 1] || gaps[0]).a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
}
function stcHallDoor() { return __ZC(423, 111, this, arguments, new.target); }
function stcHallTick() {
if (WLD.on || store.inside || !walkMode) {
if (STCD.g)
STCD.g.visible = false;
if (STCD.on) {
STCD.on = false;
worldPromptCity(null);
}
return;
}
var s = stcHallSpot();
if (!s) {
if (STCD.g)
STCD.g.visible = false;
if (STCD.on) {
STCD.on = false;
worldPromptCity(null);
}
return;
}
if (!STCD.g) {
STCD.g = stcHallDoor();
scene.add(STCD.g);
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
STCD.g.visible = true;
STCD.g.position.set(s.x, 0, s.z);
STCD.g.rotation.y = -s.a - Math.PI / 2;
if (STCD.cups)
STCD.cups.rotation.y -= 0.05;
if (STCD.vane)
STCD.vane.rotation.y = Math.sin(Date.now() / 4000) * 0.4;
if (d < 3.6) {
if (!STCD.on) {
STCD.on = true;
worldPromptCity("<b>🌪️ Tornado Alley</b> · <b>press E</b> to go through the storm-cellar door", stcFromHall);
}
}
else if (STCD.on) {
STCD.on = false;
worldPromptCity(null);
}
}
function stcFromHall() {
worldPromptCity(null);
STCD.on = false;
var s = stcHallSpot(), P = camera.position;
stcGo("town", s ? { from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } } : null);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
stcHallTick();
}
catch (e) {
if (!STCD.e1) {
STCD.e1 = 1;
if (window.console)
console.warn("storms door:", e);
}
} };
})();
function stcSeg(n) { return STC.lite ? Math.max(6, n >> 1) : n; }
function stcLathe(key, pts, seg, mat, x, y, z, parent) {
var k = "lathe|" + key + "|" + seg, g = STC.geos[k];
if (!g) {
g = new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg);
STC.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || stcP()).add(m);
return m;
}
var STC_UP = new THREE.Vector3(0, 1, 0);
function stcStrut(a, b, r, mat, parent, seg) {
var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.hypot(dx, dy, dz) || 0.001;
var m = stcCyl(r, L, mat, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, parent, seg || 6);
m.quaternion.setFromUnitVectors(STC_UP, new THREE.Vector3(dx / L, dy / L, dz / L));
return m;
}
function stcKeepG(x, y, z, ry, parent) { var g = stcGroup(x, y, z, ry, parent); g.userData.keep = 1; return g; }
function stcGearMats() { return __ZC(423, 112, this, arguments, new.target); }
function stcGearAdd(f) { (STC.gear || (STC.gear = [])).push(f); }
function stcAnemoVane(x, y, z, s, parent, M) { return __ZC(423, 113, this, arguments, new.target); }
function stcGearGarage() { return __ZC(423, 114, this, arguments, new.target); }
function stcRainCan(x, y, z, M, parent) { return __ZC(423, 115, this, arguments, new.target); }
function stcBaroFace(c, W, H) { return __ZC(423, 116, this, arguments, new.target); }
function stcBarographDraw(c, W, H) { return __ZC(423, 117, this, arguments, new.target); }
function stcLdDraw(c, W, H) { return __ZC(423, 118, this, arguments, new.target); }
function stcHailFoilDraw(c, W, H) { return __ZC(423, 119, this, arguments, new.target); }
function stcGearRoof(ct) { return __ZC(423, 120, this, arguments, new.target); }
function stcGearDoppler(rt) { return __ZC(423, 121, this, arguments, new.target); }
function stcGearMast(mx, mz) { return __ZC(423, 122, this, arguments, new.target); }
function stcGearTick(dt, R) { return __ZC(423, 123, this, arguments, new.target); }
var STCW = { im: null, x: 1e9, z: 1e9, on: false, pads: [[609, -196], [-891, -296]] };
function stcMergeGeo(list) { return __ZC(423, 124, this, arguments, new.target); }
function stcPaddocks(P) { return __ZC(423, 125, this, arguments, new.target); }
function stcWheatNear() { return __ZC(423, 126, this, arguments, new.target); }
(function () {
var W = (typeof WORLDS !== "undefined") && WORLDS[STC.key];
if (!W || !W.tick)
return;
var t0 = W.tick;
W.tick = function (dt) { var r = t0.apply(this, arguments); try {
stcWheatNear();
}
catch (e) {
if (!STCW.e) {
STCW.e = 1;
if (window.console)
console.warn("[storms] near wheat", e);
}
} return r; };
})();
var STC_RS = { roads: [-3, -2, -1, 0, 1, 2, 3] };
function stcRsCross(s, pad) { for (var k = -3; k <= 3; k++) {
if (Math.abs(s - k * 400) < (k === 0 ? 7 : 4.5) + (pad || 0))
return true;
} return false; }
function stcRsWire() { return __ZC(423, 127, this, arguments, new.target); }
function stcRsName(ax, k) { if (ax === "z")
return k === 0 ? "HWY 83" : "ROAD " + (13 + k); return "ROAD " + "MNOPQRS".charAt(k + 3); }
function stcRsSigns() { return __ZC(423, 128, this, arguments, new.target); }
function stcRsMill(x, z, ry) { return __ZC(423, 129, this, arguments, new.target); }
function stcRsWater() { return __ZC(423, 130, this, arguments, new.target); }
function stcRsStand() { return __ZC(423, 131, this, arguments, new.target); }
(function () {
if (typeof stcFill !== "function")
return;
var f0 = stcFill;
stcFill = function () {
var r = f0.apply(this, arguments);
[stcRsWire, stcRsSigns, stcRsWater, stcRsStand].forEach(function (f) { try {
f();
}
catch (e) {
if (window.console)
console.warn("[storms] roadside", f.name, e);
} });
return r;
};
var W = (typeof WORLDS !== "undefined") && WORLDS[STC.key];
if (!W || !W.tick)
return;
var t0 = W.tick;
W.tick = function (dt) { var r = t0.apply(this, arguments); try {
(STC_RS.wheels || []).forEach(function (w) { if (w.parent)
w.rotation.z += (dt || 0.016) * 0.6; });
}
catch (e) { } return r; };
})();
