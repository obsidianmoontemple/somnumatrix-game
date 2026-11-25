/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AMS = { mats: {}, t: 0, spin: [], float: [], meteors: null, isle: null, doors: [], views: {}, e1: 0 };
function amsLite() { return typeof LITE !== "undefined" && !!LITE; }
function amsSurf(kind, col, o) { return __ZC(494, 0, this, arguments, new.target); }
function amsFlat(col, o) { return __ZC(494, 1, this, arguments, new.target); }
function amsGlow(col, op) {
var key = "g:" + col + ":" + (op || 1);
if (AMS.mats[key])
return AMS.mats[key];
var m = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op, depthWrite: op === undefined });
m.userData.ldShared = 1;
return (AMS.mats[key] = m);
}
function amsBox(G, w, h, d, mat, x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x || 0, (y || 0) + h / 2, z || 0); m.castShadow = true; m.receiveShadow = true; G.add(m); return m; }
function amsCyl(G, rt, rb, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 16), mat); m.position.set(x || 0, (y || 0) + h / 2, z || 0); m.castShadow = true; m.receiveShadow = true; G.add(m); return m; }
function amsCanvasTex(w, h, draw) { var c = document.createElement("canvas"); c.width = w; c.height = h; var x = c.getContext("2d"); draw(x, w, h); var t = new THREE.CanvasTexture(c); try {
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
}
catch (e) { } return t; }
function amsRand(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
var AMS_PLANETS = [
{ k: "mercury", n: "Mercury", au: 0.39, r: 0.5, c: ["#8A8580", "#B5B0A8", "#6E6A66"], f: "The smallest planet and the closest to the Sun. A day there (sunrise to sunrise) lasts 176 Earth days, longer than its year of 88 days." },
{ k: "venus", n: "Venus", au: 0.72, r: 0.9, c: ["#E8D2A0", "#D8B878", "#F2E2B8"], f: "The hottest planet, about 465 °C at the ground, under thick clouds of sulphuric acid. It turns backwards, so the Sun rises in the west." },
{ k: "earth", n: "Earth", au: 1, r: 0.95, c: ["#2A5AA8", "#3A7A3A", "#F2F2F2"], f: "Home. The only world we know with life and with liquid water lying open on its surface. Light from the Sun takes about 8 minutes 20 seconds to get here." },
{ k: "mars", n: "Mars", au: 1.52, r: 0.6, c: ["#B8582E", "#D8784A", "#8A3A1E"], f: "The red planet: its dust is rusted iron. Olympus Mons, a volcano three times as high as Everest, stands on it. Robot rovers drive there today." },
{ k: "jupiter", n: "Jupiter", au: 5.2, r: 3.2, c: ["#D8B890", "#B88A60", "#F2E2C8", "#C8704A"], f: "The largest planet: more than 1,300 Earths would fit inside. The Great Red Spot is a storm bigger than the Earth, raging for at least 350 years." },
{ k: "saturn", n: "Saturn", au: 9.58, r: 2.7, c: ["#E8D8A8", "#D8C088", "#F2E8C8"], ring: 1, f: "Its rings are mostly ice, some pieces as small as dust and some as big as houses, and are only about ten metres thick in places. Saturn is light enough to float in a vast bath." },
{ k: "uranus", n: "Uranus", au: 19.2, r: 1.6, c: ["#9ED8E0", "#B8E8EC", "#8AC8D0"], f: "It lies on its side, perhaps knocked over long ago, so each pole has 42 years of sunlight and then 42 years of night. Found by William Herschel in 1781." },
{ k: "neptune", n: "Neptune", au: 30.1, r: 1.55, c: ["#3A5AC8", "#5A7AE0", "#2A4AA8"], f: "The windiest planet: winds of over 2,000 km/h. It was found in 1846 by mathematics before anyone saw it, from the way it pulled on Uranus." }
];
function amsPlanetTex(P) { return __ZC(494, 2, this, arguments, new.target); }
function amsPlanetMesh(P, scale) { return __ZC(494, 3, this, arguments, new.target); }
var AMS_VIEWS = {
saturn: { t: "Saturn", s: "through the great refractor", n: ["Saturn is about 1.4 billion km away; its light takes about 80 minutes to reach your eye.", "Galileo saw the rings in 1610 but could not make out what they were: he called them Saturn's 'ears'. Christiaan Huygens worked out in 1655 that they are a ring.", "The bright dot beside it is Titan, Saturn's largest moon, bigger than the planet Mercury and wrapped in an orange haze."] },
jupiter: { t: "Jupiter and four moons", s: "the moons Galileo found in January 1610", n: ["The four bright dots in a line are Io, Europa, Ganymede and Callisto, the 'Galilean moons'. Watch them over a few nights and they change places.", "Seeing moons go round another planet helped show that not everything circles the Earth.", "Ganymede is the largest moon in the Solar System, bigger than Mercury."] },
moon: { t: "The Moon", s: "along the line between day and night", n: ["The best place to look is the terminator, the line between day and night: the shadows there are long and the craters stand out.", "The Moon is about 384,000 km away, and its light, which is sunlight reflected, takes about 1.3 seconds to reach you.", "The dark plains are the 'maria' (seas): old lava, not water. Twelve people walked on the Moon between 1969 and 1972."] },
orion: { t: "The Orion Nebula", s: "in the Sword of Orion, M42", n: ["A cloud of gas and dust about 1,350 light years away, where new stars are being born right now.", "On a dark night you can see it with no telescope at all, as a faint fuzzy 'star' in Orion's sword.", "The four bright stars at its heart are called the Trapezium."] },
andromeda: { t: "The Andromeda Galaxy", s: "M31, our nearest large galaxy", n: ["A whole galaxy of about a trillion stars, some 2.5 million light years away: the light you see set out before there were humans.", "It is the farthest thing most people can see with the naked eye.", "Andromeda and our own Milky Way are moving towards each other and will merge in about four or five billion years."] },
pleiades: { t: "The Pleiades", s: "the Seven Sisters, M45", n: ["A cluster of young hot blue stars about 440 light years away. Most people can count six or seven with their eyes alone; a telescope shows hundreds.", "The blue haze round them is starlight lighting up a cloud of dust they are passing through.", "Many peoples have stories about them: in Japan they are called Subaru."] }
};
function amsViewImg(k) { return __ZC(494, 4, this, arguments, new.target); }
function amsShowView(k) { return __ZC(494, 5, this, arguments, new.target); }
var AMS_CONST = [
{ n: "Orion, the hunter", p: [[60, 40], [100, 44], [72, 80], [80, 82], [88, 84], [62, 120], [104, 118]], l: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]], f: "Betelgeuse (top left) is a red supergiant so big it would swallow the orbit of Mars." },
{ n: "The Plough (Big Dipper)", p: [[170, 30], [196, 26], [218, 32], [238, 40], [244, 64], [272, 64], [270, 40]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], f: "The two end stars of the bowl point to Polaris, the North Star." },
{ n: "Cassiopeia", p: [[160, 110], [178, 96], [196, 112], [214, 96], [232, 108]], l: [[0, 1], [1, 2], [2, 3], [3, 4]], f: "A queen on her throne, shaped like a W, opposite the Plough across the pole." },
{ n: "The Southern Cross", p: [[90, 170], [90, 214], [70, 190], [112, 192]], l: [[0, 1], [2, 3]], f: "The smallest constellation, on the flags of Australia, New Zealand, Brazil, Samoa and Papua New Guinea." },
{ n: "Scorpius", p: [[180, 160], [194, 170], [204, 186], [208, 206], [214, 224], [232, 232], [248, 222], [244, 206]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]], f: "Its red heart is Antares, 'the rival of Mars'." }
];
function amsSkyImg() { return __ZC(494, 6, this, arguments, new.target); }
function amsShowSky() { return __ZC(494, 7, this, arguments, new.target); }
function amsObservatory(G) { return __ZC(494, 8, this, arguments, new.target); }
function amsScope(G, len, col) { return __ZC(494, 9, this, arguments, new.target); }
function amsPlanetarium(G) { return __ZC(494, 10, this, arguments, new.target); }
function amsHabitat(G, r, hue) { return __ZC(494, 11, this, arguments, new.target); }
function amsGreenhouse(G, r) { return __ZC(494, 12, this, arguments, new.target); }
function amsCanteen(G) { return __ZC(494, 13, this, arguments, new.target); }
function amsComet(G) { return __ZC(494, 14, this, arguments, new.target); }
function amsMeteorWatch(G) { return __ZC(494, 15, this, arguments, new.target); }
function amsMeteors(G) { return __ZC(494, 16, this, arguments, new.target); }
function amsEarth(G) { return __ZC(494, 17, this, arguments, new.target); }
function amsSun(G) { return __ZC(494, 18, this, arguments, new.target); }
var AMS_L = "Among the Stars";
var AMS_AT = { obs: [0, -130], terrace: [0, -72], plan: [-82, -112], sun: [30, 30], town: [-150, 10], comet: [150, -200], watch: [-150, -175], isle: [-40, -270, 140], seat: [-40, -186] };
var AMS_SCOPES = [["saturn", -21, -70], ["jupiter", -13, -76], ["moon", -4, -79], ["orion", 5, -79], ["andromeda", 14, -76], ["pleiades", 22, -70]];
var AMS_HAB = [];
(function () { var c = AMS_AT.town; for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2 + 0.4;
AMS_HAB.push({ x: c[0] + Math.sin(a) * 26, z: c[1] + Math.cos(a) * 26, rot: a + Math.PI, n: ["Vega House", "Lyra House", "Altair House", "Deneb House", "Sirius House", "Rigel House", "Capella House"][i] });
} })();
function amsDoor(x, z, rot, arch, name, front) { var s = Math.sin(rot), c = Math.cos(rot); AMS.doors.push({ x: x + s * front, z: z + c * front, rot: rot, arch: arch, name: name }); }
LD_SETS.stars = function (P) { return __ZC(494, 19, this, arguments, new.target); };
function amsDoorsPut() { return __ZC(494, 20, this, arguments, new.target); }
function amsSky() { return __ZC(494, 21, this, arguments, new.target); }
function amsPlanSolids() { var c = AMS_AT.plan, R = 12.2; for (var i = 0; i < 40; i++) {
var a = i / 40 * Math.PI * 2;
if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.2)
continue;
LD.solids.push({ x: c[0] + Math.sin(a) * R, z: c[1] + Math.cos(a) * R, r: 1.1, h: 6 });
} }
function amsTalkers() { return __ZC(494, 22, this, arguments, new.target); }
(function () {
if (typeof ldBuild !== "function")
return;
var lb = ldBuild;
ldBuild = function (r) {
var o = lb.apply(this, arguments);
if (r && r.kind === "stars" && LD.g) {
try {
amsSky();
amsPlanSolids();
amsTalkers();
amsDoorsPut();
}
catch (e) {
if (window.console)
console.warn("[among the stars]", e);
}
}
else if (LD.kind !== "stars") {
AMS.spin = [];
AMS.float = [];
AMS.meteors = null;
AMS.isle = null;
AMS.earth = null;
}
return o;
};
})();
(function () {
if (typeof ldUse !== "function")
return;
var lu = ldUse;
ldUse = function (T) {
if (T && T.amsView) {
amsShowView(T.amsView);
return;
}
if (T && T.amsSky) {
amsShowSky();
return;
}
if (T && T.amsChain) {
if (typeof gvwFromChain === "function") {
try {
setStatus("⛓️ You sit on the seat; the chain tightens, and the island draws you up by pulleys...");
}
catch (e) { }
gvwFromChain();
}
else
setStatus("The chain hangs still: the island is not ready to take you up yet.");
return;
}
return lu.apply(this, arguments);
};
})();
function amsTick(dt) {
if (LD.kind !== "stars" || !LD.g)
return;
AMS.t += dt;
var t = AMS.t;
AMS.spin.forEach(function (g) { g.rotation.y += dt * 0.25; });
if (AMS.earth)
AMS.earth.rotation.y += dt * 0.01;
AMS.float.forEach(function (m) { m.rotation.y += dt * m.userData.sp; m.rotation.x += dt * m.userData.sp * 0.6; m.position.y = m.userData.y0 + Math.sin(t * 0.2 + m.userData.ph) * 0.8; });
if (AMS.meteors)
AMS.meteors.children.forEach(function (m, i) {
var T = (t + m.userData.t) % (7 + i * 1.7), life = 2.6;
if (T > life) {
m.material.opacity = 0;
m.visible = false;
return;
}
m.visible = true;
var k = T / life;
if (k < 0.05 || !m.userData.dir) {
var R = amsRand(Math.floor((t + m.userData.t) / (7 + i * 1.7)) * 31 + i);
var a = R() * 6.28;
m.userData.dir = new THREE.Vector3(Math.cos(a), -0.35, Math.sin(a)).normalize();
m.userData.p0 = new THREE.Vector3(-200 + R() * 400, 110 + R() * 60, -300 + R() * 300);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), m.userData.dir.clone().negate());
}
m.position.copy(m.userData.p0).addScaledVector(m.userData.dir, k * 90);
m.material.opacity = Math.sin(k * Math.PI) * 0.7;
});
if (AMS.isle)
AMS.isle.g.position.y = AMS_AT.isle[2] + Math.sin(t * 0.12) * 0.6;
}
(function () {
if (typeof ldTick !== "function")
return;
var lt = ldTick;
ldTick = function (dt) { var r = lt.apply(this, arguments); try {
amsTick(dt);
}
catch (e) {
if (!AMS.e1) {
AMS.e1 = 1;
if (window.console)
console.warn("[among the stars] tick", e);
}
} return r; };
})();
(function () { try {
if (typeof CT_BY_HOST !== "undefined" && CT_BY_HOST["land:stars"])
CT_BY_HOST["land:stars"] = CT_BY_HOST["land:stars"].filter(function (T) { return T.id !== "laputa"; });
}
catch (e) { } })();
(function () { if (typeof ctsEnter !== "function")
return; var e0 = ctsEnter; ctsEnter = function (id) { if (id === "laputa" && typeof gvwFromChain === "function") {
try {
worldCard(null);
}
catch (e) { }
gvwFromChain();
return;
} return e0.apply(this, arguments); }; })();
