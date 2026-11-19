/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PD = { who: {} };
function pdWho(name, where, who, greet) { return { name: name, greet: greet, persona: "You are " + who + ", at " + where + ", a Space Corp outpost in SomnuMatrix (the Space Corp is a branch of the city's Dragon Corp). Stay in character, speak warmly and briefly, share real science about this world when asked, and keep it suitable for all ages." }; }
var PD_SUIT = { top: 0xF2F2F0, topKind: "shirt", bottom: 0xF2F2F0, shoes: 0x8A8E96, hat: "helmet", hatColor: 0xF2F2F0 };
function pdSuit(o) { var L = Object.assign({}, PD_SUIT); Object.keys(o || {}).forEach(function (k) { L[k] = o[k]; }); return L; }
var PD_BASES = {
moon: { at: [70, -95], name: "Tranquillity Outpost", items: [
["habitat", 0, 0, 0, 1], ["habitat", -16, 6, 0.6, 1], ["habitat", 16, 6, -0.6, 1], ["biodome", 0, -22, 0, 0.45], ["researchlab", -26, -14, 1.2, 0.8],
["solarfarm", 30, -18, 0, 0.9], ["solarfarm", 30, -36, 0, 0.9], ["satdish", -30, 10, 0.5, 0.9], ["rover", 10, 16, 0.7, 1], ["landinglights", -6, 26, 0, 1], ["crates", 8, 8, 0.3, 1], ["barrel", -6, 9, 0, 1],
{ p: "moonchief", x: 0, z: 10, rot: 0, o: { sex: "f", look: pdSuit({ skin: 0x8A5A3A }) }, t: ["Commander Ade Okafor", "the commander of Tranquillity Outpost on the Moon", "Welcome to Tranquillity. Mind your step: the dust here is sharp as glass, because no wind or water has ever worn it smooth."] },
{ p: "moonsci", x: -22, z: -6, rot: 1.2, o: { sex: "m", look: pdSuit({ skin: 0xE8C8A8 }) }, t: ["Dr Lin Marsh, geologist", "a geologist studying moon rock at Tranquillity Outpost", "This grey rock is basalt: old lava that flooded this basin about three and a half billion years ago. The 'seas' of the Moon are lava plains, not water."] },
{ p: "moontech", x: 12, z: 12, rot: -0.6, o: { sex: "m", look: pdSuit({ skin: 0xC89870 }) }, w: { r: 12, sp: 0.5 } },
{ s: ["Tranquillity Outpost", "Space Corp · the Moon"], x: -6, z: 16, rot: 0, f: ["The Moon", "Living here", ["A day on the Moon, sunrise to sunrise, lasts about 29.5 Earth days.", "In sunlight the ground reaches about 120 °C; at night it falls to about −130 °C.", "The Moon is about 384,400 km away. Astronauts left mirrors here in 1969 and 1971 that scientists still bounce lasers off to measure it."]] }
] },
mars: { at: [-85, -95], name: "Jezero Settlement", items: [
["habitat", 0, 0, 0, 1], ["habitat", -16, 6, 0.6, 1], ["habitat", 16, 6, -0.6, 1], ["biodome", -2, -24, 0, 0.5], ["researchlab", 24, -14, -1.2, 0.8],
["solarfarm", -32, -14, 0, 0.9], ["solarfarm", -32, -32, 0, 0.9], ["satdish", 30, 12, -0.5, 0.9], ["rover", -8, 18, 0.4, 1], ["landinglights", 8, 28, 0, 1], ["crates", -9, 9, 0.3, 1], ["watertower", -24, 16, 0, 0.6],
{ p: "marschief", x: 0, z: 10, rot: 0, o: { sex: "m", look: pdSuit({ skin: 0xA87050, top: 0xF0E8D8, bottom: 0xF0E8D8 }) }, t: ["Settlement chief Rafael Ortiz", "the chief of Jezero Settlement on Mars", "Welcome to Jezero! Out there was a lake once, three and a half billion years ago. We grow lettuce in the dome now. Small steps."] },
{ p: "marsfarm", x: -6, z: -12, rot: 0.4, o: { sex: "f", look: pdSuit({ skin: 0xE8C8A8, top: 0xE8F0E0, bottom: 0xE8F0E0 }) }, t: ["Ingrid Holm, greenhouse keeper", "the greenhouse keeper at Jezero Settlement", "Martian soil has salts called perchlorates that would poison a crop, so we wash it first. Then potatoes do rather well, actually."] },
{ p: "marstech", x: -12, z: 14, rot: 0.8, o: { sex: "m", look: pdSuit({ skin: 0x6A4A3A }) }, w: { r: 12, sp: 0.5 } },
{ s: ["Jezero Settlement", "Space Corp · Mars"], x: 6, z: 18, rot: 0, f: ["Mars", "Living here", ["A day on Mars, a sol, is 24 hours 39 minutes 35 seconds.", "The air is about 95% carbon dioxide and less than 1% as thick as Earth's: no one can breathe it.", "Olympus Mons, the tallest volcano in the Solar System, stands about 22 km high."]] }
] },
mercury: { at: [20, -85], name: "Caloris Station", items: [
["habitat", 0, 0, 0, 1], ["habitat", -15, 4, 0.5, 1], ["researchlab", 16, 2, -0.5, 0.8], ["satdish", -26, -10, 0.5, 0.9], ["rover", 8, 16, 0.7, 1], ["landinglights", -6, 24, 0, 1], ["crates", -8, 10, 0.3, 1],
["solarfarm", -28, 12, 0, 0.8],
{ shade: 1, x: 0, z: 2 },
{ p: "merchief", x: 0, z: 10, rot: 0, o: { sex: "f", look: pdSuit({ skin: 0xD8A880 }) }, t: ["Station chief Priya Raman", "the chief of Caloris Station on Mercury", "Stay in the shade of the great sunshade. The Sun is three times wider here than at home, and the ground in sunlight is hot enough to melt lead."] },
{ p: "mertech", x: 10, z: 10, rot: -0.6, o: { sex: "m", look: pdSuit({ skin: 0xE8C8A8 }) }, w: { r: 10, sp: 0.5 } },
{ s: ["Caloris Station", "Space Corp · Mercury"], x: -6, z: 16, rot: 0, f: ["Mercury", "Living here", ["From one sunrise to the next on Mercury takes 176 Earth days.", "By day the ground reaches about 430 °C; at night it falls to about −180 °C.", "NASA's MESSENGER orbited Mercury from 2011 to 2015 and found water ice in craters at the poles that never see the Sun."]] }
] },
venus: { at: [10, -75], name: "the Lavinia probe field", items: [
["habitat", 0, -8, 0, 0.9], ["satdish", -20, -10, 0.5, 0.9], ["rover", 10, 14, 0.7, 1], ["rover", -12, 16, 2, 1], ["landinglights", 0, 26, 0, 1],
{ lander: 1, x: -24, z: 8 }, { lander: 1, x: 22, z: -6 }, { lander: 1, x: 28, z: 16 },
{ b: "robot", x: 0, z: 8, rot: 0, t: ["VERA, a heat-proof rover", "VERA, a Space Corp robot built to work on the surface of Venus, cheerful and precise", "Hello! I am VERA. Temperature 465 degrees, pressure 92 times Earth's. Lovely day. I am the only one who can stand out here; my builders watch from orbit."] },
{ b: "robot", x: 16, z: 4, rot: -1, w: { r: 12, sp: 0.4 } },
{ s: ["The Lavinia probe field", "Space Corp · Venus"], x: -6, z: 16, rot: 0, f: ["Venus", "Why only robots work here", ["The surface is about 465 °C, hotter than Mercury, because the thick carbon dioxide air traps the Sun's heat.", "The air pressure is about 92 times Earth's, like being 900 m under the sea.", "The Soviet lander Venera 13 survived 127 minutes on the surface in 1982 and sent back the first colour pictures from there."]] }
] },
pluto: { at: [20, -85], name: "Tombaugh Station", items: [
["habitat", 0, 0, 0, 1], ["habitat", -16, 6, 0.6, 1], ["researchlab", 16, 4, -0.6, 0.8], ["satdish", -28, -8, 0.5, 1], ["rover", 8, 16, 0.7, 1], ["landinglights", -6, 24, 0, 1], ["crates", -8, 10, 0.3, 1],
{ obelisk: 1, x: 24, z: 22 },
{ p: "plutochief", x: 0, z: 10, rot: 0, o: { sex: "m", look: pdSuit({ skin: 0xC89870 }) }, t: ["Station chief Tomas Velde", "the chief of Tombaugh Station on Pluto, the farthest outpost of the Space Corp", "Welcome to the edge. The Sun is just a bright star from here: sunlight takes about five and a half hours to arrive."] },
{ p: "plutosci", x: -12, z: 12, rot: 0.6, o: { sex: "f", look: pdSuit({ skin: 0x8A5A3A }) }, t: ["Dr Amara Diallo, glaciologist", "a scientist studying the nitrogen glaciers of Sputnik Planitia on Pluto", "This plain is a glacier of frozen nitrogen, slowly churning in great cells, each tens of kilometres across. At minus 230 degrees, nitrogen flows like a very slow ice."] },
{ s: ["Tombaugh Station", "Space Corp · Pluto"], x: -6, z: 16, rot: 0, f: ["Pluto", "Living here", ["Clyde Tombaugh found Pluto in 1930. Some of his ashes travel aboard the New Horizons spacecraft.", "New Horizons flew past on 14 July 2015 and found this heart-shaped plain of nitrogen ice.", "One day on Pluto lasts about 6.4 Earth days, and one year 248 Earth years."]] }
] }
};
var PD_CLOUD = {
jupiter: { name: "Cloud Station Galileo", chief: ["Station manager Elena Russo", "Galileo cloud station over Jupiter"], facts: ["Jupiter", "Above the clouds", ["Jupiter is so big that all the other planets would fit inside it.", "The Great Red Spot is a storm wider than the Earth; people have watched it since at least 1831.", "Jupiter has at least 95 known moons. Galileo found the four largest in 1610."]] },
saturn: { name: "Cloud Station Cassini", chief: ["Station manager Kwame Mensah", "Cassini cloud station over Saturn"], facts: ["Saturn", "Above the clouds", ["Saturn's rings are mostly water ice, in pieces from dust to the size of a house. They are about 280,000 km across, yet mostly only about 10 m thick.", "Saturn is lighter for its size than water.", "The Cassini spacecraft studied Saturn from 2004 to 2017."]] },
uranus: { name: "Cloud Station Herschel", chief: ["Station manager Ana Lopes", "Herschel cloud station over Uranus"], facts: ["Uranus", "Above the clouds", ["Uranus is tipped right over on its side: its axis leans about 98 degrees.", "William Herschel found it in 1781, the first planet discovered with a telescope.", "It is blue-green because methane in its air soaks up red light."]] },
neptune: { name: "Cloud Station Le Verrier", chief: ["Station manager Jonas Berg", "Le Verrier cloud station over Neptune"], facts: ["Neptune", "Above the clouds", ["Neptune was found in 1846 where the mathematician Urbain Le Verrier predicted it would be, from the way it tugged on Uranus.", "Its winds are the fastest in the Solar System, about 2,000 km/h.", "One year on Neptune lasts about 165 Earth years."]] }
};
function pdPiece(S, a, x, z, rot, s, y) { return __ZC(284, 0, this, arguments, new.target); }
function pdLander(S, x, z, y) { return __ZC(284, 1, this, arguments, new.target); }
function pdShade(S, x, z, y) { return __ZC(284, 2, this, arguments, new.target); }
function pdMarker(S, x, z, y) { return __ZC(284, 3, this, arguments, new.target); }
function pdBase(k) { return __ZC(284, 4, this, arguments, new.target); }
function pdCloud(k) { return __ZC(284, 5, this, arguments, new.target); }
(function () {
if (typeof sfBuild !== "function")
return;
var fb = sfBuild;
sfBuild = function (k) {
PD.movers = [];
PD.talk = [];
PD.bob = [];
fb.apply(this, arguments);
try {
if (PD_BASES[k])
pdBase(k);
else if (PD_CLOUD[k])
pdCloud(k);
}
catch (e) {
if (window.console)
console.warn("planet-dress:", e);
}
PD.talk.forEach(function (T) { var s = { x: T.g.position.x, z: T.g.position.z, r: 3.2, name: T.name, talk: T.talk, g: T.g }; SF.sites.push(s); T.site = s; });
};
if (typeof sfTick === "function") {
var ft = sfTick;
sfTick = function (dt) {
(PD.movers || []).forEach(function (M) { if (typeof wWander === "function")
wWander(M.g, dt, function (x, z) { return SF.cfg && SF.cfg.cloud ? 0 : sfHeight(x, z); }, M.w); });
(PD.talk || []).forEach(function (T) { if (T.site) {
T.site.x = T.g.position.x;
T.site.z = T.g.position.z;
} });
(PD.bob || []).forEach(function (b, i) { b.position.y = b.userData.pdBob + Math.sin(WLD.t * 0.4 + i) * 0.6; });
return ft.apply(this, arguments);
};
}
})();
PD.movers = [];
PD.talk = [];
PD.bob = [];
