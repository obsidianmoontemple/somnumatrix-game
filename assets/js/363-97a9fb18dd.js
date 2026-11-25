/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SHN_KEY = "samhain", SHN_NAME = "Samhain Night";
var SHN = { base: -1500000, G: null, built: false, t: 0, lite: false, zone: "green", mats: {}, tex: {}, solids: [], floors: [], spots: [], talk: [], people: [], fx: [],
lights: [], flames: [], districts: [], state: null, rules: null, room: null, rooms: {}, busy: false, pt: 0, vt: 0, moving: false, veil: null, lady: null, hide: null, storm: { t: 6, f: 0, n: 0 },
run: null, bob: null, kidsGhosts: {}, sweets: {}, kidsGot: 0, lantern: false, houseRun: null };
var SHN_IN_X = 20000;
var SHN_BOUND = { x0: -900, x1: 900, z0: -900, z1: 620 };
function shnDefaultDates() { var y = new Date().getFullYear(); return { starts: new Date(y, 9, 24).getTime(), ends: new Date(y, 10, 3).getTime() }; }
function shnOn() {
var S = SHN.state, now = Date.now();
if (S && S.ok !== false) {
if (S.open === false)
return false;
var a = S.starts ? Date.parse(S.starts) : shnDefaultDates().starts, b = S.ends ? Date.parse(S.ends) : shnDefaultDates().ends;
return now >= a && now < b;
}
var D = shnDefaultDates();
return now >= D.starts && now < D.ends;
}
function shnKeeper() { return typeof amKeeper === "function" && amKeeper(); }
var SHN_PAY = {
house: ["Escaping Ravensmoor House", 60], fire: ["A lantern lit from the Samhain fire", 15], guise: ["Guising round Hollowmere", 20],
bob: ["Bobbing for apples", 10], nuts: ["The nut fortune", 10], ride: ["Outrunning the Headless Horseman", 40],
ghosts: ["Finding the five friendly ghosts", 20], sweets: ["The candy trail", 15], carve: ["Carving a pumpkin", 10], maze: ["The hay maze", 15]
};
var SHN_KEEP = {
house: ["shn_bellrope", "A thread of the Ravensmoor bell rope", "🔔"], fire: ["shn_turnip", "A turnip lantern lit from the Samhain fire", "🏮"],
guise: ["shn_soulcake", "A soul cake", "🍪"], bob: ["shn_apple", "A bobbed apple", "🍎"], nuts: ["shn_hazel", "A burnt hazelnut (your fortune)", "🌰"],
ride: ["shn_pumpkinhead", "The Horseman's smashed pumpkin", "🎃"], ghosts: ["shn_ghostbadge", "A friendly ghost badge", "👻"],
sweets: ["shn_sweets", "A bag of Pumpkin Hollow sweets", "🍬"], carve: ["shn_carved", "Your own carved pumpkin", "🎃"], maze: ["shn_strawdoll", "A corn dolly from the hay maze", "🌾"]
};
var SHN_KIDS = { ghosts: 1, sweets: 1, carve: 1, maze: 1 };
var SHN_AT = {
arrive: { x: 0, z: 46, name: "Hollowmere green" },
green: { x: 0, z: 0, r: 62 },
hill: { x: -330, z: -250, r: 170, h: 44, name: "the Hill of Tlachtga" },
manor: { x: 20, z: -560, r: 230, h: 34, name: "Ravensmoor House" },
church: { x: 210, z: -250, name: "the old church" },
bridge: { x: 200, z: -205, name: "the church bridge" },
mill: { x: 560, z: -430, name: "the old mill" },
hollow: { x: 430, z: 120, r: 150, name: "Pumpkin Hollow" },
brook: [[-700, -150], [-300, -120], [0, -170], [200, -205], [420, -240], [760, -300]]
};
var SHN_ROAD = [[560, -430], [500, -400], [450, -350], [410, -330], [360, -300], [300, -280], [250, -240], [200, -205]];
var SHN_DOORS = [
{ n: "Old Bride Malone", give: "a soul cake, warm from the griddle", say: "'A soul! a soul! a soul cake! Please good missus, a soul cake!' That's the way. Here, one for you, and one for the dead." },
{ n: "The smith, Tadhg", give: "a handful of hazelnuts", say: "Guisers! Masked and blacked like the old ones, so the wandering dead won't know you. Here's nuts for the fire." },
{ n: "Widow Keane", give: "a red apple", say: "Mind, now: if a stranger knocks after midnight, don't answer it. Here's an apple for your song." },
{ n: "The Doyles", give: "a piece of barmbrack (with a ring in it!)", say: "You found the ring in the brack! They say you'll be married within the year. Ha!" },
{ n: "Father Lorcan", give: "a soul cake marked with a cross", say: "Soul cakes are for praying for the dead. Say a word for them tonight, child, they are close." },
{ n: "Mad Peg at the end cottage", give: "a twist of toffee and a warning", say: "You're going up to Ravensmoor, aren't you? Everyone does. Count the rooms. If you count fourteen, run." }
];
var SHN_RHYMES = ["Soul, soul, a soul cake! I pray you, good missus, a soul cake!", "The night is dark, the moon is high, give us a treat or we'll pass you by!", "Here we come a-guising, masked so the dead won't know: a nut, an apple, a soul cake, and away we go!"];
var SHN_FORTUNES = ["The two nuts burn together, quiet and steady: a true friend sits beside you all year.", "Your nut cracks and jumps from the fire! A restless year: you will travel far.", "The nut burns slow and bright: good luck finds you before the snow.", "It smoulders and smokes: someone is keeping a secret from you.", "It flares and is gone: a short sharp trouble, then joy."];
var SHN_ROOMS = [
{ k: "hall", n: "The Great Hall", w: 34, d: 28, h: 13, wall: "panel", floor: "marble", task: "candle", tale: "Silas Ravensmoor laid a supper for the dead on Samhain, 1789, and locked the doors so they could not leave. They never have." },
{ k: "corridor", n: "The Long Corridor", w: 7, d: 96, h: 5, wall: "paper", floor: "boards", task: "candle", tale: "The corridor is longer every time you walk it." },
{ k: "library", n: "The Library", w: 30, d: 24, h: 11, wall: "books", floor: "boards", task: "raven", tale: "Edgar Allan Poe, The Raven (1845): 'Once upon a midnight dreary'. A raven sits on the bust over the door." },
{ k: "yellow", n: "The Yellow Room", w: 16, d: 16, h: 6, wall: "yellow", floor: "boards", task: "paper", tale: "Charlotte Perkins Gilman, The Yellow Wallpaper (1892): a woman creeps behind the pattern." },
{ k: "nursery", n: "The Nursery", w: 18, d: 16, h: 6, wall: "nursery", floor: "boards", task: "musicbox", tale: "Something still plays in the nursery." },
{ k: "supper", n: "The Dumb Supper", w: 30, d: 16, h: 8, wall: "panel", floor: "boards", task: "chairs", tale: "The Dumb Supper, an old Samhain custom: a meal laid in silence for the dead, a chair for each." },
{ k: "mirror", n: "The Mirror Room", w: 20, d: 20, h: 7, wall: "mirror", floor: "marble", task: "mirror", tale: "In one of the mirrors your reflection does not do what you do." },
{ k: "heart", n: "The Heart Room", w: 16, d: 14, h: 6, wall: "paper", floor: "boards", task: "board", tale: "Poe, The Tell-Tale Heart (1843): 'It is the beating of his hideous heart!' under the boards." },
{ k: "bells", n: "The Bell Board and the Servants' Stair", w: 12, d: 26, h: 7, wall: "plaster", floor: "stone", task: "bells", tale: "The bells ring for rooms that are not in the house." },
{ k: "cellar", n: "The Cellars", w: 26, d: 40, h: 5, wall: "brick", floor: "wet", task: "niche", tale: "Poe, The Cask of Amontillado (1846): a niche bricked up, and a jingle of bells behind it." },
{ k: "crypt", n: "The Crypt", w: 22, d: 30, h: 6, wall: "bones", floor: "stone", task: "candle", tale: "Under the chapel, the Ravensmoors sleep. Mostly." },
{ k: "masque", n: "The Seven Chambers", w: 16, d: 98, h: 9, wall: "masque", floor: "marble", task: "clock", tale: "Poe, The Masque of the Red Death (1842): seven rooms, blue, purple, green, orange, white, violet and black, and the ebony clock." },
{ k: "attic", n: "The Attic", w: 36, d: 14, h: 6, wall: "rafters", floor: "boards", task: "bell", tale: "The Grey Lady keens in the attic, the bean sidhe of the Ravensmoors. Ring the tower bell and the house lets you go." }
];
var SHN_MASQUE = [[0x2A4AD8, "blue"], [0x7A2AB8, "purple"], [0x2AA84A, "green"], [0xE87A1A, "orange"], [0xF2F2F0, "white"], [0x9A4AE8, "violet"], [0x0A0808, "black"]];
var SHN_DRIVE_FILMS = [["Nosferatu1922", 92], ["DasKabinettdesDoktorCaligariTheCabinetofDrCaligari", 51], ["night_of_the_living_dead_dvd", 96], ["HouseOnHauntedHill1959", 75],
["ThePhantomoftheOpera", 106], ["CarnivalOfSouls1962", 82], ["WhiteZombie", 68], ["TheGolem_893", 85], ["DrJekyllandMrHyde", 82], ["The_Bat.mpeg", 80], ["Haxan_tinted_and_subtitled", 105], ["lastmanonearth-1964", 86]];
var SHN_KIDS_FILMS = [["the-skeleton-dance-1929", 6], ["hells-bells_1929", 6], ["swing-you-sinners-1930", 8], ["Frankenstein1910", 13]];
function shnTex(key, w, h, fn, rep) {
if (SHN.tex[key])
return SHN.tex[key];
var t = wTex(w, h, fn, rep || [1, 1]);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (SHN.tex[key] = t);
}
function shnNoiseFill(x, W, H, base, vary, n, seed) {
x.fillStyle = base;
x.fillRect(0, 0, W, H);
var r = wRand(seed || 7);
for (var i = 0; i < n; i++) {
var a = r(), v = Math.round((r() - 0.5) * vary);
x.fillStyle = "rgba(" + (v > 0 ? "255,255,255," : "0,0,0,") + (Math.abs(v) / 255) + ")";
x.fillRect(r() * W, r() * H, 1 + a * 3, 1 + r() * 3);
}
}
var SHN_TEXFN = {
stone: function (x, W, H) { return __ZC(363, 0, this, arguments, new.target); },
brick: function (x, W, H) { return __ZC(363, 1, this, arguments, new.target); },
boards: function (x, W, H) { return __ZC(363, 2, this, arguments, new.target); },
marble: function (x, W, H) { return __ZC(363, 3, this, arguments, new.target); },
wet: function (x, W, H) { shnNoiseFill(x, W, H, "#2A2A26", 50, 2000, 23); x.fillStyle = "rgba(40,60,70,.45)"; var r = wRand(29); for (var i = 0; i < 18; i++) {
x.beginPath();
x.ellipse(r() * W, r() * H, 20 + r() * 40, 8 + r() * 14, 0, 0, 7);
x.fill();
} },
panel: function (x, W, H) { return __ZC(363, 4, this, arguments, new.target); },
paper: function (x, W, H) { return __ZC(363, 5, this, arguments, new.target); },
yellow: function (x, W, H) { return __ZC(363, 6, this, arguments, new.target); },
nursery: function (x, W, H) { return __ZC(363, 7, this, arguments, new.target); },
plaster: function (x, W, H) { shnNoiseFill(x, W, H, "#8A8070", 40, 2400, 31); x.strokeStyle = "rgba(40,30,20,.5)"; x.lineWidth = 1.5; var r = wRand(37); for (var i = 0; i < 10; i++) {
var px = r() * W, py = r() * H;
x.beginPath();
x.moveTo(px, py);
for (var k = 0; k < 6; k++) {
px += (r() - 0.5) * 40;
py += r() * 30;
x.lineTo(px, py);
}
x.stroke();
} },
bones: function (x, W, H) { return __ZC(363, 8, this, arguments, new.target); },
books: function (x, W, H) { return __ZC(363, 9, this, arguments, new.target); },
rafters: function (x, W, H) { shnNoiseFill(x, W, H, "#2E2620", 40, 1500, 47); x.fillStyle = "#1A140E"; for (var i = 0; i < 6; i++)
x.fillRect(i * W / 6, 0, 14, H); x.fillStyle = "rgba(220,220,220,.08)"; for (i = 0; i < 30; i++)
x.fillRect((i * 37) % W, (i * 59) % H, 40, 1); },
mirror: function (x, W, H) { x.fillStyle = "#1A1612"; x.fillRect(0, 0, W, H); x.strokeStyle = "#8A6A2A"; x.lineWidth = 8; for (var i = 0; i < 3; i++)
x.strokeRect(i * W / 3 + 12, 30, W / 3 - 24, H - 60); },
thatch: function (x, W, H) { x.fillStyle = "#6A5430"; x.fillRect(0, 0, W, H); var r = wRand(53); for (var i = 0; i < 1400; i++) {
var px = r() * W, py = r() * H;
x.strokeStyle = "rgba(" + (140 + r() * 60 | 0) + "," + (110 + r() * 40 | 0) + ",60,.6)";
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (r() - 0.5) * 4, py + 12 + r() * 10);
x.stroke();
} },
whitewash: function (x, W, H) { shnNoiseFill(x, W, H, "#C8C2B2", 36, 2600, 59); x.fillStyle = "rgba(60,50,40,.25)"; x.fillRect(0, H * 0.88, W, H * 0.12); },
grass: function (x, W, H) { shnNoiseFill(x, W, H, "#26301E", 40, 5000, 61); x.fillStyle = "rgba(90,70,40,.25)"; for (var i = 0; i < 30; i++)
x.fillRect((i * 71) % W, (i * 131) % H, 18, 12); },
bark: function (x, W, H) { x.fillStyle = "#2A221C"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(0,0,0,.6)"; for (var i = 0; i < 20; i++) {
x.beginPath();
x.moveTo(i * W / 20, 0);
x.lineTo(i * W / 20 + (i % 3 - 1) * 6, H);
x.stroke();
} },
slate: function (x, W, H) { return __ZC(363, 10, this, arguments, new.target); }
};
function shnT(k, rx, ry) {
var key = k + "|" + (rx || 1) + "|" + (ry || 1);
if (SHN.tex[key])
return SHN.tex[key];
var base = shnTex(k, 256, 256, SHN_TEXFN[k]);
var t = base.clone();
t.needsUpdate = true;
t.repeat.set(rx || 1, ry || 1);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (SHN.tex[key] = t);
}
function shnM(key, make) { return SHN.mats[key] || (SHN.mats[key] = make()); }
function shnLam(col, o) { return __ZC(363, 11, this, arguments, new.target); }
function shnPh(col, shine, o) { o = o || {}; var key = "p" + col + "|" + shine + "|" + (o.e || ""); return shnM(key, function () { var m = new THREE.MeshPhongMaterial({ color: col, shininess: shine, specular: 0x555555 }); if (o.e !== undefined)
m.emissive = new THREE.Color(o.e); return m; }); }
function shnGlowM(col) { return shnM("g" + col, function () { return new THREE.MeshBasicMaterial({ color: col }); }); }
function shnSolid(x, z, w, d, y0, y1, rot) {
var c = Math.cos(rot || 0), s = Math.sin(rot || 0), hw = Math.abs(w / 2 * c) + Math.abs(d / 2 * s), hd = Math.abs(w / 2 * s) + Math.abs(d / 2 * c);
var S = { x: x, z: z, hw: hw, hd: hd, y0: y0 === undefined ? -5 : y0, y1: y1 === undefined ? 50 : y1 };
SHN.solids.push(S);
return S;
}
function shnSolidOff(S) { SHN.solids = SHN.solids.filter(function (o) { return o !== S; }); }
function shnFloor(x, z, w, d, y, inside) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, inside: !!inside }; SHN.floors.push(F); return F; }
function shnSolidAt(x, z, feet) { for (var i = 0; i < SHN.solids.length; i++) {
var S = SHN.solids[i];
if (!S.off && Math.abs(x - S.x) < S.hw && Math.abs(z - S.z) < S.hd && feet < S.y1 - 0.4 && feet + 1.7 > S.y0)
return true;
} return false; }
function shnFloorAt(x, z, feet) { var best = null; for (var i = 0; i < SHN.floors.length; i++) {
var F = SHN.floors[i];
if (F.off)
continue;
if (Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd && F.y <= feet + 0.9 && (best === null || F.y > best))
best = F.y;
} return best; }
function shnInsideWalk(x, z) { for (var i = 0; i < SHN.floors.length; i++) {
var F = SHN.floors[i];
if (F.inside && !F.off && Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd)
return true;
} return false; }
function shnSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; SHN.spots.push(S); return S; }
function shnFlameLight(col, k, dist, x, y, z, parent, always) {
if (SHN.lite && !always)
return null;
var L = new THREE.PointLight(col, k, dist, 2);
L.position.set(x, y, z);
(parent || SHN.G).add(L);
var F = { L: L, k: k, ph: Math.random() * 20 };
SHN.lights.push(F);
return F;
}
function shnFlickerTick(dt) { return __ZC(363, 12, this, arguments, new.target); }
function shnCandle(g, x, y, z, h, lit) {
var wax = wCyl(0.035, 0.04, h || 0.25, shnLam(0xE8E0C8), x, y + (h || 0.25) / 2, z, g);
var fl = wCone(0.022, 0.08, shnGlowM(0xFFB040), x, y + (h || 0.25) + 0.05, z, g, 6);
fl.userData.keep = 1;
var F = { m: fl, s: 1, ph: Math.random() * 9, out: lit === false };
SHN.flames.push(F);
return F;
}
function shnTurnip(g, x, y, z, s, col) {
s = s || 1;
var t = wSph(0.16 * s, shnLam(0xD8CCB0), x, y + 0.15 * s, z, g, 10);
t.scale.y = 0.85;
var face = wBox(0.18 * s, 0.08 * s, 0.02, shnGlowM(col || 0xFF8A20), x, y + 0.15 * s, z + 0.15 * s, g);
var top = wCyl(0.02 * s, 0.05 * s, 0.1 * s, shnLam(0x4A6A2A), x, y + 0.32 * s, z, g, 5);
return t;
}
function shnPumpkin(g, x, y, z, s, carved, col) { return __ZC(363, 13, this, arguments, new.target); }
function shnFire(g, x, y, z, s, big) { return __ZC(363, 14, this, arguments, new.target); }
function shnCottage(g, x, z, rot, y, seed) { return __ZC(363, 15, this, arguments, new.target); }
function shnDeadTree(g, x, z, y, s, seed) { return __ZC(363, 16, this, arguments, new.target); }
function shnGrave(g, x, z, y, rot, seed) { return __ZC(363, 17, this, arguments, new.target); }
function shnPerson(seed, x, z, y, o) {
var p;
try {
p = wPerson("shn" + seed, o || {});
}
catch (e) {
p = new THREE.Group();
wBox(0.5, 1.7, 0.3, shnLam(0x4A3A2A), 0, 0.85, 0, p);
}
p.position.set(x, y, z);
SHN.G.add(p);
var P = { g: p, y: y };
SHN.people.push(P);
return P;
}
function shnSmooth(d, r) { if (d >= r)
return 0; var t = 1 - d / r; return t * t * (3 - 2 * t); }
function shnSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, t = ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz); t = Math.max(0, Math.min(1, t)); return Math.hypot(x - (ax + dx * t), z - (az + dz * t)); }
function shnPathD(x, z, P) { var b = 1e9, SB = wSegBoxes(P); for (var i = 0; i < P.length - 1; i++) {
if (b < 1e9 && wSegFar(SB, i, x, z, b))
continue;
b = Math.min(b, shnSegD(x, z, P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]));
} return b; }
function shnLand(x, z) { return __ZC(363, 18, this, arguments, new.target); }
function shnWaterAt(x, z) { var bd = shnPathD(x, z, SHN_AT.brook); return bd < 6 ? -1.4 : null; }
function shnTerrain(G) { return __ZC(363, 19, this, arguments, new.target); }
var SHN_ENV = {
night: { top: 0x04050C, low: 0x1C2030, fog: 0x161A24, fogD: 0.0055, sun: 0.42, sunCol: 0x8A9AD0, sunDir: [-0.4, 0.7, -0.3], hemi: 0.34, hemiCol: 0x5A6A9A, hemiGround: 0x1A140E, stars: 0.9 },
manor: { top: 0x020306, low: 0x10141A, fog: 0x0E1216, fogD: 0.0085, sun: 0.22, sunCol: 0x7A8AB0, sunDir: [-0.4, 0.7, -0.3], hemi: 0.2, hemiCol: 0x4A5A7A, hemiGround: 0x100C0A, stars: 0.2 },
hollow: { top: 0x2A1050, low: 0xE8803A, fog: 0x5A3A6A, fogD: 0.0028, sun: 0.95, sunCol: 0xFFD0A0, sunDir: [0.4, 0.6, 0.3], hemi: 0.95, hemiCol: 0xFFE0F0, hemiGround: 0x3A6A2A, stars: 0.6 },
house: { top: 0x000000, low: 0x000000, fog: 0x000000, fogD: 0.045, sun: 0.0, sunCol: 0x6A7AA0, sunDir: [0.3, 0.8, 0.2], hemi: 0.07, hemiCol: 0x6A7A9A, hemiGround: 0x0A0806, stars: 0 },
kids: { top: 0x3A1A6A, low: 0x6A3A9A, fog: 0x3A1A5A, fogD: 0.004, sun: 0.8, sunCol: 0xFFF0E0, sunDir: [0.3, 0.8, 0.2], hemi: 1.15, hemiCol: 0xFFF0FF, hemiGround: 0x6A4A8A, stars: 0 }
};
function shnEnvNow(dt) { return __ZC(363, 20, this, arguments, new.target); }
function shnStormTick(dt) { return __ZC(363, 21, this, arguments, new.target); }
function shnSky(G) { return __ZC(363, 22, this, arguments, new.target); }
function shnVillage(G) { return __ZC(363, 23, this, arguments, new.target); }
function shnHill(G) { return __ZC(363, 24, this, arguments, new.target); }
function shnChurch(G) { return __ZC(363, 25, this, arguments, new.target); }
function shnRoadAndMill(G) { return __ZC(363, 26, this, arguments, new.target); }
function shnManorOut(G) { return __ZC(363, 27, this, arguments, new.target); }
var SHN_HOLLOW = { house: { x: 470, z: 60 }, tent: { x: 380, z: 200 }, maze: { x: 520, z: 180, n: 9, c: 4 }, carve: { x: 360, z: 80 } };
var SHN_SWEETS = [[330, 110], [345, 125], [362, 132], [380, 128], [398, 120], [414, 112], [430, 104], [446, 98], [462, 96], [480, 100], [496, 108], [510, 120], [520, 136]];
function shnHollow(G) { return __ZC(363, 28, this, arguments, new.target); }
function shnMazeBuild(g) { return __ZC(363, 29, this, arguments, new.target); }
var SHN_RX = {};
SHN_ROOMS.forEach(function (R, i) { R.i = i; R.x = SHN_IN_X + i * 400; R.lady = i >= 4 && R.k !== "masque"; R.windows = /hall|library|supper|attic|nursery|yellow/.test(R.k); SHN_RX[R.k] = R; });
function shnShell(R, g) { return __ZC(363, 30, this, arguments, new.target); }
function shnWardrobe(R, g, x, z, rot) { return __ZC(363, 31, this, arguments, new.target); }
function shnCandelabrum(R, g, x, z, task) { return __ZC(363, 32, this, arguments, new.target); }
function shnLightCandle(R, done) { return __ZC(363, 33, this, arguments, new.target); }
function shnRoomDone(R, say) { if (SHN.houseRun)
SHN.houseRun.done[R.k] = 1; R.open = true; shnSfx("unlock"); if (say)
setStatus(say); }
function shnPortrait(R, g, x, y, z, ry, seed, w, h) { return __ZC(363, 34, this, arguments, new.target); }
function shnTrig(R, x, z, r, fn) { (R.trig || (R.trig = [])).push({ x: R.x + x, z: z, r: r, fn: fn, done: false }); }
function shnRoomGet(k) { return __ZC(363, 35, this, arguments, new.target); }
function shnEnterRoom(k, fromBack) { return __ZC(363, 36, this, arguments, new.target); }
function shnLeaveInside() { return __ZC(363, 37, this, arguments, new.target); }
function shnVeil(sec, mid) { return __ZC(363, 38, this, arguments, new.target); }
function shnDoorSpots(R) { return __ZC(363, 39, this, arguments, new.target); }
function shnLadyMake() { return __ZC(363, 40, this, arguments, new.target); }
function shnLadyReset(R) { var L = shnLadyMake(); L.on = false; L.g.visible = false; L.wait = R && R.lady ? 8 + Math.random() * 10 - (R.i - 4) * 0.6 : 1e9; L.t = 0; }
function shnLadyGone() { if (SHN.lady) {
SHN.lady.on = false;
SHN.lady.g.visible = false;
} shnSfx("keen", { stop: 1 }); }
function shnLadyTick(dt) { return __ZC(363, 41, this, arguments, new.target); }
function shnCaught(R) { return __ZC(363, 42, this, arguments, new.target); }
function shnHideIn(H) { return __ZC(363, 43, this, arguments, new.target); }
function shnHideOut() { var H = SHN.hide; if (!H)
return; SHN.hide = null; camera.position.set(SHN.base + H.ox, 1.72, H.oz); if (SHN.veil)
SHN.veil.style.opacity = "0"; shnSfx("creak"); }
var SHN_RB = {};
function shnFig(col, op) { return __ZC(363, 44, this, arguments, new.target); }
function shnBook(g, x, y, z) { return wBox(0.16, 0.24, 0.05, shnLam([0x5A1A1A, 0x1A2A4A, 0x2A4A2A][(x * 7 | 0) % 3]), x, y, z, g); }
SHN_RB.hall = function (R, g) { return __ZC(363, 45, this, arguments, new.target); };
SHN_RB.corridor = function (R, g) { return __ZC(363, 46, this, arguments, new.target); };
SHN_RB.library = function (R, g) { return __ZC(363, 47, this, arguments, new.target); };
SHN_RB.yellow = function (R, g) { return __ZC(363, 48, this, arguments, new.target); };
SHN_RB.nursery = function (R, g) { return __ZC(363, 49, this, arguments, new.target); };
SHN_RB.supper = function (R, g) { return __ZC(363, 50, this, arguments, new.target); };
function shnSupperCheck(R) { return __ZC(363, 51, this, arguments, new.target); }
SHN_RB.mirror = function (R, g) { return __ZC(363, 52, this, arguments, new.target); };
SHN_RB.heart = function (R, g) { return __ZC(363, 53, this, arguments, new.target); };
var SHN_BELLS = ["The Great Hall", "The Library", "The Yellow Room", "The Nursery", "The Dining Room", "The Mirror Room", "The Master's Room", "The Cellars", "The Chapel", "The Attic", "The Tower", "The Fourteenth Room"];
SHN_RB.bells = function (R, g) { return __ZC(363, 54, this, arguments, new.target); };
SHN_RB.cellar = function (R, g) { return __ZC(363, 55, this, arguments, new.target); };
SHN_RB.crypt = function (R, g) { return __ZC(363, 56, this, arguments, new.target); };
SHN_RB.masque = function (R, g) { return __ZC(363, 57, this, arguments, new.target); };
function shnMasqueChime(R) { return __ZC(363, 58, this, arguments, new.target); }
SHN_RB.attic = function (R, g) { return __ZC(363, 59, this, arguments, new.target); };
function shnRoof() { return __ZC(363, 60, this, arguments, new.target); }
var SHN_KR = {
giggle: { k: "giggle", n: "The Giggling House", kids: true, x: SHN_IN_X + 6000, w: 30, d: 30, h: 8, wallCol: 0x9A3AF0, floorCol: 0x2AD84A, ceilCol: 0xFFD21A, tale: "Five friendly ghosts are playing hide and seek in here. Can you find them all?" },
playhouse: { k: "playhouse", n: "The Pumpkin Playhouse", kids: true, x: SHN_IN_X + 6600, w: 44, d: 40, h: 12, wallCol: 0xFF7A10, floorCol: 0x1AB8FF, ceilCol: 0x7A1AD8, tale: "Climb the soft play, jump in the ball pit, whizz down the slide, and watch a film in the theatre." }
};
var SHN_KB = {};
var SHN_BRIGHT = [0xFF3A3A, 0xFF8A00, 0xFFE01A, 0x2AE84A, 0x1AB8FF, 0x9A3AF0, 0xFF3AB8];
function shnFriendGhost(g, x, y, z, s) { return __ZC(363, 61, this, arguments, new.target); }
SHN_KB.giggle = function (R, g) { return __ZC(363, 62, this, arguments, new.target); };
SHN_KB.playhouse = function (R, g) { return __ZC(363, 63, this, arguments, new.target); };
function shnSlide(R) {
if (SHN.slide)
return;
var P = camera.position;
SHN.slide = { t: 0, x0: R.x - 10, z0: -7, x1: R.x - 1, y0: 3.0 };
shnSfx("whee");
}
function shnSlideTick(dt) {
var S = SHN.slide;
if (!S)
return;
S.t += dt;
var u = Math.min(1, S.t / 1.4), e = u * u;
camera.position.set(SHN.base + S.x0 + (S.x1 - S.x0) * e, 1.72 + S.y0 * (1 - e), S.z0);
yaw = -Math.PI / 2;
if (u >= 1) {
SHN.slide = null;
setStatus("🛝 <b>Wheeeee!</b> Again? The steps are at the back.");
}
}
function shnGhostFound(i) { return __ZC(363, 64, this, arguments, new.target); }
function shnSweet(i) { return __ZC(363, 65, this, arguments, new.target); }
function shnCarve() { return __ZC(363, 66, this, arguments, new.target); }
var SHN_SCR = { list: {}, on: null, vid: null, tex: null, key: null, sound: false, card: {} };
function shnProg(which) { return __ZC(363, 67, this, arguments, new.target); }
function shnNowOn(which) {
var P = shnProg(which);
if (!P.length)
return null;
var tot = 0;
P.forEach(function (f) { tot += f.mins; });
var m = (Date.now() / 60000) % tot;
for (var i = 0; i < P.length; i++) {
if (m < P[i].mins)
return { f: P[i], into: m * 60, i: i };
m -= P[i].mins;
}
return { f: P[0], into: 0, i: 0 };
}
function shnScreenMake(which, mesh, place) { var S = { which: which, mesh: mesh, place: place, idle: null }; SHN_SCR.list[which] = S; shnScreenCard(S, "Samhain Night at " + place, "the films start soon"); return S; }
function shnScreenCard(S, a, b) { return __ZC(363, 68, this, arguments, new.target); }
function shnVidStop() { return __ZC(363, 69, this, arguments, new.target); }
function shnKind(src) { return __ZC(363, 70, this, arguments, new.target); }
function shnPlayerUrl(K, into) { return __ZC(363, 71, this, arguments, new.target); }
function shnPageUrl(K) {
if (K.embed === "yt")
return "https://www.youtube.com/watch?v=" + K.id;
if (K.embed === "vimeo")
return "https://vimeo.com/" + K.id;
if (K.archive)
return "https://archive.org/details/" + encodeURIComponent(K.archive);
return K.file || null;
}
function shnSrcUrl(src, cb) {
var K = shnKind(src);
if (K.file) {
cb(K.file);
return;
}
if (!K.archive) {
cb(null);
return;
}
if (typeof cinSrc === "function")
cinSrc(K.archive, cb);
else
cb(null);
}
function shnScreenAsk(S, f, K) {
SHN_SCR.ask = S.which;
shnScreenCard(S, f.t || "Tonight's film", S.which === "drive" ? "press E at your post to watch it" + (K.embed ? " (in " + K.name + "'s own player)" : "") : "sit down in the theatre to watch it" + (K.embed ? " (in " + K.name + "'s own player)" : ""));
}
function shnScreensTick() {
var V = SHN_SCR, want = null;
if (WLD.on === SHN_KEY && SHN.room && SHN.room.k === "playhouse")
want = "kids";
else if (!WLD.on && SHND.near)
want = "drive";
if (want === "drive" && !(shnKeeper() || (typeof ageAdult === "function" && ageAdult()))) {
var Sd = V.list.drive;
if (Sd && !Sd.told) {
Sd.told = 1;
shnScreenCard(Sd, "Grown-ups only tonight", "the Samhain Drive-In shows horror films for dreamers of 18 and over");
}
want = null;
}
if (!want) {
if (V.on)
shnVidStop();
return;
}
var S = V.list[want], now = shnNowOn(want);
if (!S || !now)
return;
var key = want + "|" + now.f.src;
if (V.key === key) {
if (V.vid)
V.vid.muted = !V.sound;
return;
}
shnVidStop();
V.key = key;
V.on = want;
V.ask = null;
var K = shnKind(now.f.src);
if (K.embed) {
shnScreenAsk(S, now.f, K);
return;
}
shnScreenCard(S, now.f.t || "Tonight's film", "starting...");
clearTimeout(V.wait);
V.wait = setTimeout(function () { if (V.key === key && !V.tex)
shnScreenAsk(S, now.f, K); }, 30000);
shnSrcUrl(now.f.src, function (url) {
if (V.key !== key)
return;
if (!url) {
shnScreenAsk(S, now.f, K);
return;
}
var v = document.createElement("video");
v.crossOrigin = "anonymous";
v.playsInline = true;
v.setAttribute("playsinline", "");
v.muted = !V.sound;
v.preload = "auto";
v.src = url;
v.addEventListener("loadedmetadata", function () { if (V.key !== key)
return; var n2 = shnNowOn(want); try {
v.currentTime = Math.min(Math.max(0, v.duration - 2), n2 ? n2.into % Math.max(1, v.duration) : 0);
}
catch (e) { } var p = v.play(); if (p && p.catch)
p.catch(function () { }); });
v.addEventListener("playing", function () { if (V.key !== key || V.tex)
return; V.ask = null; var t = new THREE.VideoTexture(v); if (THREE.sRGBEncoding !== undefined)
t.encoding = THREE.sRGBEncoding; V.tex = t; S.mesh.material.map = t; S.mesh.material.needsUpdate = true; });
v.addEventListener("ended", function () { if (V.key === key)
shnVidStop(); });
v.addEventListener("error", function () { if (V.key === key && !V.tex) {
shnScreenAsk(S, now.f, K);
} });
V.vid = v;
});
}
function shnScreenSit(which) { return __ZC(363, 72, this, arguments, new.target); }
var SHND = { g: null, at: null, near: false, on: false, t: 0 };
function shnDriveSpot() { return __ZC(363, 73, this, arguments, new.target); }
function shnDriveBuild() { return __ZC(363, 74, this, arguments, new.target); }
function shnDriveTick(dt) {
SHND.t += dt;
var want = shnOn() || shnKeeper(), inCity = typeof inCityNow === "function" && inCityNow() && !WLD.on && !store.inside;
if (!want) {
if (SHND.g) {
scene.remove(SHND.g);
SHND.g = null;
SHN_SCR.list.drive = null;
}
SHND.near = false;
return;
}
if (!inCity) {
SHND.near = false;
if (SHND.on) {
SHND.on = false;
worldPromptCity(null);
}
return;
}
var A = shnDriveSpot();
if (!A)
return;
var P = camera.position, d = Math.hypot(P.x - A.x, P.z - A.z);
if (!SHND.g && d < 900)
shnDriveBuild();
if (SHND.g)
SHND.g.visible = d < 1400;
SHND.near = d < 75;
if (SHND.bulbs && SHND.g && SHND.g.visible) {
var step = Math.floor(SHND.t * 3);
SHND.bulbs.forEach(function (m, i) { m.color.setHex((i + step) % 4 === 0 ? 0xFFF0C0 : 0xC8701A); });
}
if (SHND.near) {
if (!SHND.on) {
SHND.on = true;
var n = shnNowOn("drive");
worldPromptCity("🎬 <b>The Samhain Drive-In</b>" + (n ? " · now: " + esc(n.f.t) : "") + " · <b>press E</b> to tune in the sound", function () { shnScreenSit("drive"); });
}
}
else if (SHND.on) {
SHND.on = false;
worldPromptCity(null);
if (SHN_SCR.sound && !WLD.on) {
SHN_SCR.sound = false;
shnMusicDuck(false);
}
}
}
var SHN_AU = { ctx: null, out: null, rev: null, music: null, loops: {}, seq: null, piece: null, next: 0, i: 0, duck: false, want: null, warned: false };
function shnAc() { return __ZC(363, 75, this, arguments, new.target); }
function shnNoise(c, sec) { var n = Math.round(c.sampleRate * sec), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < n; i++)
d[i] = Math.random() * 2 - 1; var s = c.createBufferSource(); s.buffer = b; return s; }
function shnEnv(c, g, t, a, peak, dec, hold) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); if (hold)
g.gain.setValueAtTime(peak, t + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t + a + (hold || 0) + dec); }
function shnTone(c, dest, type, f, t, a, peak, dec, f2, hold) { var o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); if (f2)
o.frequency.exponentialRampToValueAtTime(f2, t + a + (hold || 0) + dec); o.connect(g); g.connect(dest); shnEnv(c, g, t, a, peak, dec, hold); o.start(t); o.stop(t + a + (hold || 0) + dec + 0.05); return o; }
function shnNoiseHit(c, dest, t, sec, type, f, q, peak, a) { var s = shnNoise(c, sec + 0.1), fl = c.createBiquadFilter(), g = c.createGain(); fl.type = type; fl.frequency.value = f; fl.Q.value = q || 1; s.connect(fl); fl.connect(g); g.connect(dest); shnEnv(c, g, t, a || 0.01, peak, sec); s.start(t); s.stop(t + sec + 0.12); return { s: s, f: fl, g: g }; }
function shnSfx(kind, o) { return __ZC(363, 76, this, arguments, new.target); }
var SHN_PIECES = {
king: { bpm: 120, unit: 0.5, voice: "reed", rep: 4, accel: 1.22, bass: 47, notes: [[59, 1], [61, 1], [62, 1], [64, 1], [66, 1], [62, 1], [66, 2], [65, 1], [61, 1], [65, 2], [64, 1], [60, 1], [64, 2], [59, 1], [61, 1], [62, 1], [64, 1], [66, 1], [62, 1], [66, 1], [71, 1], [69, 1], [66, 1], [62, 1], [66, 1], [69, 4]] },
toccata: { bpm: 60, unit: 0.25, voice: "organ", rep: 1, notes: [[81, 1], [79, 1], [81, 10], [null, 2], [79, 1], [77, 1], [76, 1], [74, 1], [73, 4], [74, 10], [null, 4], [69, 1], [67, 1], [69, 10], [null, 2], [67, 1], [65, 1], [64, 1], [62, 1], [61, 4], [62, 10], [null, 4], [57, 1], [55, 1], [57, 10], [null, 2], [55, 1], [53, 1], [52, 1], [50, 1], [49, 4], [50, 12], [null, 4],
[[38, 49, 52, 55, 58, 61], 16], [[38, 50, 53, 57, 62], 24], [null, 8]] },
funeral: { bpm: 54, unit: 0.25, voice: "organ", rep: 2, notes: [[[46, 53, 58], 4], [[46, 53, 58], 3], [[46, 53, 58], 1], [[46, 53, 58], 8], [[42, 49, 61], 4], [[42, 49, 60], 3], [[42, 49, 60], 1], [[46, 53, 58], 3], [[46, 53, 58], 1], [[45, 52, 57], 3], [[46, 53, 58], 1], [[46, 53, 58], 8], [null, 4]] },
dies: { bpm: 66, unit: 1, voice: "choir", rep: 2, drone: 38, notes: [[65, 1], [64, 1], [65, 1], [62, 1], [64, 1], [60, 1], [62, 2], [65, 1], [65, 1], [67, 1], [65, 1], [64, 1], [62, 1], [64, 1], [62, 1], [62, 2], [null, 2]] },
jig: { bpm: 150, unit: 0.5, voice: "whistle", rep: 3, drone: 50, drum: true, notes: [[74, 1], [76, 1], [77, 1], [79, 2], [81, 1], [79, 1], [77, 1], [76, 1], [74, 2], [72, 1], [74, 1], [76, 1], [77, 1], [79, 1], [81, 1], [84, 2], [81, 1], [79, 1], [77, 1], [76, 1], [74, 3],
[81, 1], [79, 1], [81, 1], [84, 2], [81, 1], [79, 1], [77, 1], [79, 1], [81, 2], [79, 1], [77, 1], [76, 1], [74, 1], [72, 1], [74, 1], [76, 2], [77, 1], [76, 1], [74, 1], [72, 1], [74, 3]] },
box: { bpm: 100, unit: 1, voice: "box", rep: 99, notes: [[81, 1], [84, 1], [88, 1], [86, 1], [84, 1], [83, 1], [84, 1], [81, 1], [76, 1], [80, 2], [null, 1], [81, 1], [84, 1], [88, 1], [89, 1], [88, 1], [86, 1], [84, 1], [83, 1], [80, 1], [81, 2], [null, 1]] }
};
var SHN_PLAY = { city: ["king", "toccata", "jig", "funeral", "dies"], green: ["jig", "dies", "king"], manor: ["toccata", "funeral", "dies"], house: ["dies", "funeral"], hollow: ["jig", "king"] };
function shnMidi(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function shnVoice(c, dest, v, f, t, dur, vel) { return __ZC(363, 77, this, arguments, new.target); }
function shnPieceAt(c, dest, P, t, speed) { return __ZC(363, 78, this, arguments, new.target); }
function shnLoopPiece(key, vol) { return __ZC(363, 79, this, arguments, new.target); }
function shnMusicOff() { try {
return localStorage.getItem("shnMusicOff") === "1";
}
catch (e) {
return false;
} }
function shnMusicSet(off) { try {
localStorage.setItem("shnMusicOff", off ? "1" : "0");
}
catch (e) { } if (off && SHN_AU.music && SHN_AU.ctx)
SHN_AU.music.gain.setTargetAtTime(0, SHN_AU.ctx.currentTime, 0.3); }
function shnMusicDuck(on) { SHN_AU.duck = !!on; }
function shnMusicTick() {
var A = SHN_AU, S = SHN.state, list = null;
var on = (shnOn() || shnKeeper()) && !(S && S.music === false) && !shnMusicOff();
if (on) {
if (WLD.on === SHN_KEY) {
var z = SHN.zone;
list = z === "inside" ? (SHN.room && SHN.room.kids ? SHN_PLAY.hollow : SHN_PLAY.house) : z === "manor" ? SHN_PLAY.manor : z === "hollow" ? SHN_PLAY.hollow : SHN_PLAY.green;
}
else if (!WLD.on && typeof inCityNow === "function" && inCityNow())
list = SHN_PLAY.city;
}
if (!A.ctx) {
if (!list)
return;
if (!shnAc())
return;
}
var c = A.ctx, vol = !list || A.duck ? 0 : (SHN.room && !SHN.room.kids ? 0.55 : 0.8);
if (SHN.room && SHN.room.k === "nursery" && A.loops.musicbox)
vol = 0;
A.music.gain.setTargetAtTime(vol, c.currentTime, 0.8);
if (!list || c.state !== "running")
return;
if (A.list !== list) {
A.list = list;
A.i = Math.floor(Math.random() * list.length);
}
if (A.next - c.currentTime < 1.5) {
var key = list[A.i % list.length], P = SHN_PIECES[key], t = Math.max(c.currentTime + 0.2, A.next), sp = 1;
for (var r = 0; r < (P.rep || 1) && r < 6; r++) {
t = shnPieceAt(c, A.music, P, t, sp);
sp *= (P.accel || 1);
}
A.next = t + 4;
A.i++;
}
}
function shnData() { var d = store.shn; if (!d || typeof d !== "object")
d = store.shn = {}; if (!Array.isArray(d.keeps))
d.keeps = []; d.done = d.done || {}; return d; }
function shnSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function shnKeep(kind) { var K = SHN_KEEP[kind]; if (!K)
return; var d = shnData(); d.keeps.push({ i: K[2], n: K[1], at: Date.now() }); if (d.keeps.length > 200)
d.keeps.splice(0, d.keeps.length - 200); shnSave(); }
function shnReward(kind, say) { return __ZC(363, 80, this, arguments, new.target); }
function shnGuise(i) { return __ZC(363, 81, this, arguments, new.target); }
function shnNuts() {
var f = SHN_FORTUNES[Math.floor(Math.random() * SHN_FORTUNES.length)];
shnSfx("strike");
setTimeout(function () { shnReward("nuts", "🌰 You set two hazelnuts side by side on the hearth, one for you, one for someone you're thinking of, as they did on Snap-Apple Night. <b>" + esc(f) + "</b>"); }, 1200);
}
function shnBobStart() { return __ZC(363, 82, this, arguments, new.target); }
function shnFireKeeper() { return __ZC(363, 83, this, arguments, new.target); }
function shnLightLantern() { return __ZC(363, 84, this, arguments, new.target); }
function shnHorseMake() { return __ZC(363, 85, this, arguments, new.target); }
function shnRideStart() { return __ZC(363, 86, this, arguments, new.target); }
function shnRideTick(dt) { return __ZC(363, 87, this, arguments, new.target); }
function shnHouseAsk() { return __ZC(363, 88, this, arguments, new.target); }
function shnFxTick(dt) { return __ZC(363, 89, this, arguments, new.target); }
function shnRoomSoundTick(dt) { return __ZC(363, 90, this, arguments, new.target); }
function shnZoneAt(x, z) {
if (x >= SHN_IN_X - 1000)
return "inside";
if (Math.hypot(x - SHN_AT.manor.x, z - SHN_AT.manor.z) < 170)
return "manor";
if (Math.hypot(x - SHN_AT.hollow.x, z - SHN_AT.hollow.z) < SHN_AT.hollow.r + 30)
return "hollow";
return "green";
}
function shnGround(x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, fl = shnFloorAt(x, z, f);
if (x >= SHN_IN_X - 1000)
return fl === null ? 0 : fl;
var g = shnLand(x, z), w = shnWaterAt(x, z);
if (w !== null && g < w - 1.2)
g = w - 1.2;
return fl !== null && fl > g ? fl : g;
}
function shnBlock(x, z, feet) {
if (SHN.moving || SHN.hide || SHN.slide)
return true;
if (x >= SHN_IN_X - 1000) {
if (shnSolidAt(x, z, feet))
return true;
return !shnInsideWalk(x, z);
}
var B = SHN_BOUND;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
return shnSolidAt(x, z, feet);
}
function shnBuild(G) { return __ZC(363, 91, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(SHN_KEY, {
base: SHN.base, far: 2600, ownSky: true, tone: 196,
env: function (dt) { return shnEnvNow(dt); },
build: function (G) { shnBuild(G); },
enter: function (opt) { return __ZC(363, 92, this, arguments, new.target); },
leave: function () { shnLadyGone(); SHN.run = null; SHN.hide = null; SHN.slide = null; SHN.room = null; if (SHN.veil)
SHN.veil.style.opacity = "0"; SHN.moving = false; shnSfx("musicbox", { stop: 1 }); shnSfx("jingle", { stop: 1 }); if (SHN_SCR.on === "kids")
shnVidStop(); },
ground: function (x, z, feet) { if (SHN.slide)
return camera.position.y - 1.72; return shnGround(x, z, feet); },
block: function (x, z, feet) { return shnBlock(x, z, feet); },
tick: function (dt) { shnTick(dt); },
back: function () { shnHome(); }
});
function shnHome() { SHN.run = null; shnLadyGone(); worldHome("<b>Back from " + SHN_NAME + ".</b> The door between the worlds swings shut behind you."); }
function shnGo(opt) {
if (!shnOn() && !shnKeeper()) {
setStatus("🎃 <b>" + SHN_NAME + " is not open just now.</b> The Keeper opens it for the Samhain season.");
return false;
}
return worldGo(SHN_KEY, opt || {});
}
function shnStateFetch() {
if (!(typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()))
return;
cityRpc("samhain_state", {}).then(function (o) { if (o && o.ok !== false) {
SHN.state = o;
var R = {}, off = o.off || [];
Object.keys(SHN_PAY).forEach(function (k) { R[k] = { on: off.indexOf(k) < 0, gold: o.gold && o.gold[k] !== undefined ? +o.gold[k] : SHN_PAY[k][1] }; });
SHN.rules = R;
} }).catch(function () { });
}
setTimeout(function () { shnStateFetch(); setInterval(shnStateFetch, 5 * 60000); }, 6000);
function shnTick(dt) { return __ZC(363, 93, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(SHN_KEY) < 0)
WLG.keys.push(SHN_KEY);
function shnForget() { return __ZC(363, 94, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === SHN_KEY)
shnForget(); return r; }; })();
var SHNC = { gate: null, tent: null, door: null, on: null, mt: 0, st: 0 };
function shnPlazaSpots() {
if (typeof ATLC === "undefined" || !ATLC)
return null;
var a = Math.PI / 2, r = 74, a2 = a + 0.2;
return { gate: { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r, a: a }, tent: { x: ATLC.x + Math.cos(a2) * r, z: ATLC.z + Math.sin(a2) * r, a: a2 } };
}
function shnGateBuild(S) { return __ZC(363, 95, this, arguments, new.target); }
function shnTurnipCity(g, x, y, z) { var t = wSph(0.2, new THREE.MeshLambertMaterial({ color: 0xD8CCB0 }), x, y + 0.2, z, g, 8); wBox(0.22, 0.09, 0.03, new THREE.MeshBasicMaterial({ color: 0xFF8A20 }), x, y + 0.2, z + 0.19, g); var gl = wGlow(0xFF8A30, 1.2, 0.5); gl.position.set(x, y + 0.25, z + 0.1); g.add(gl); }
function shnHallSpot() { return __ZC(363, 96, this, arguments, new.target); }
function shnHallTick(show) {
var s = show ? shnHallSpot() : null;
if (!s) {
if (SHNC.door)
SHNC.door.visible = false;
if (SHNC.on === "door") {
SHNC.on = null;
worldPromptCity(null);
}
return;
}
if (!SHNC.door) {
var g = new THREE.Group(), oak = new THREE.MeshLambertMaterial({ color: 0x2A1A10 }), stone = new THREE.MeshLambertMaterial({ color: 0x6A665E }), iron = new THREE.MeshPhongMaterial({ color: 0x1A1A1A, shininess: 40 });
wBox(0.8, 5, 0.8, stone, -1.9, 2.5, 0, g);
wBox(0.8, 5, 0.8, stone, 1.9, 2.5, 0, g);
var arch = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.4, 6, 16, Math.PI), stone);
arch.position.y = 5;
g.add(arch);
wBox(3, 5, 0.2, oak, 0, 2.5, 0, g);
for (var i = 0; i < 16; i++)
wSph(0.06, iron, -1.2 + (i % 4) * 0.8, 0.6 + ((i / 4) | 0) * 1.2, 0.12, g, 5);
wBox(3, 0.12, 0.08, iron, 0, 1.4, 0.12, g);
wBox(3, 0.12, 0.08, iron, 0, 3.6, 0.12, g);
var tg = new THREE.Group();
tg.position.set(0, 6.8, 0.3);
g.add(tg);
shnTurnipCity(tg, 0, 0, 0);
var sg = wSign(["SAMHAIN NIGHT", "the haunted house · the fire · the Horseman · press E"], 3.8, 0.8, "#1A0E20", "#FFB050");
sg.position.set(0, 8, 0.5);
g.add(sg);
scene.add(g);
SHNC.door = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
SHNC.door.visible = true;
SHNC.door.position.set(s.x, 0, s.z);
SHNC.door.rotation.y = -s.a - Math.PI / 2;
if (d < 3.6) {
if (SHNC.on !== "door") {
SHNC.on = "door";
worldPromptCity("🎃 <b>" + SHN_NAME + "</b> · <b>press E</b> to open the old church door", function () { worldPromptCity(null); SHNC.on = null; shnGo({ from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } }); });
}
}
else if (SHNC.on === "door") {
SHNC.on = null;
worldPromptCity(null);
}
}
function shnCityTick(dt) {
if (typeof WLD === "undefined")
return;
var show = (shnOn() || shnKeeper()) && !WLD.on && !store.inside && walkMode;
SHNC.st += dt;
if (SHNC.st > 1) {
SHNC.st = 0;
if (!WLD.on)
shnMusicTick();
}
shnDriveTick(dt);
if (!WLD.on && SHNC.st === 0)
shnScreensTick();
shnHallTick(show);
var S = null;
if (!S) {
if (SHNC.gate) {
SHNC.gate.visible = false;
SHNC.tent.visible = false;
}
if (SHNC.on === "gate" || SHNC.on === "tent") {
SHNC.on = null;
worldPromptCity(null);
}
return;
}
if (!SHNC.gate)
shnGateBuild(S);
SHNC.gate.visible = true;
SHNC.tent.visible = true;
if (SHNC.veil)
SHNC.veil.material.opacity = 0.28 + Math.sin(SHN.t * 1.3 + performance.now() / 1900) * 0.08;
var P = camera.position, dg = Math.hypot(P.x - S.gate.x, P.z - S.gate.z), dt2 = Math.hypot(P.x - S.tent.x, P.z - S.tent.z);
var from = { here: store.here || 0, x: P.x, y: P.y, z: P.z, yaw: yaw + Math.PI, name: "the Tower Plaza" };
if (dg < 4.5) {
if (SHNC.on !== "gate") {
SHNC.on = "gate";
worldPromptCity("🎃 <b>The Thin Place</b> · <b>press E</b> to step through into " + SHN_NAME, function () { worldPromptCity(null); SHNC.on = null; shnGo({ from: from }); });
}
}
else if (dt2 < 6) {
if (SHNC.on !== "tent") {
SHNC.on = "tent";
worldPromptCity("🎪 <b>The Pumpkin Playhouse</b> (for children) · <b>press E</b> to go in", function () { worldPromptCity(null); SHNC.on = null; shnGo({ from: from, at: "playhouse" }); });
}
}
else if (SHNC.on === "gate" || SHNC.on === "tent") {
SHNC.on = null;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
SHN.t += WLD.on === SHN_KEY ? 0 : dt;
shnCityTick(dt);
}
catch (e) {
if (!SHN.e1) {
SHN.e1 = 1;
if (window.console)
console.warn("samhain city:", e);
}
} };
})();
function shnMenu() { return __ZC(363, 97, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
var btn = document.getElementById("me-samhain");
if (!btn) {
btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-samhain";
btn.title = SHN_NAME;
btn.textContent = "🎃 Samhain";
btn.onclick = function () { shnMenu(); };
bar.appendChild(btn);
}
btn.style.display = (shnOn() || shnKeeper()) ? "" : "none";
setTimeout(hook, 30000);
}
if (typeof document !== "undefined")
setTimeout(hook, 1900);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-shn]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-shn", "1");
b.textContent = "🎃 " + SHN_NAME + " (Hollowmere)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } shnGo({}); };
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
var m = /[?&]ksamhain=([a-z0-9]+)/.exec(location.search);
if (!m)
return;
var where = m[1];
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!shnKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
shnGo(where === "kids" ? { at: "playhouse" } : {});
if (where === "house")
setTimeout(function () { SHN.houseRun = { t0: Date.now(), done: {}, at: 0, caught: 0 }; shnEnterRoom("hall"); }, 1500);
try {
var q = new URLSearchParams(location.search);
q.delete("ksamhain");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === SHN_KEY; })) {
DGR_WORLDS.push([SHN_KEY, SHN_NAME + " (Safe: frightening, but nothing there can hurt you)", 0, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[SHN_KEY] = { id: SHN_KEY, name: SHN_NAME, def: 0, group: "hidden" };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === SHN_KEY; }))
try {
DK_PLACES.push([SHN_KEY, SHN_NAME]);
}
catch (e) { }
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.jacklantern)
return;
var d = { k: "jacklantern", name: "Stingy Jack's Lantern", icon: "🏮", at: SHN_KEY, seed: [0, 0], spot: "stone", mark: 0xFF7A20,
what: "a skull in the wall that is not quite like the others", look: "In the far corner of the crypt, among a thousand skulls set in the wall, one has been moved. Behind its eyes, something glows like a coal.", act: "Lift the skull out",
open: "In the hollow behind it: a carved turnip, black with age, and inside it one ember that has never gone out.",
tale: "Stingy Jack tricked the Devil twice, so the old story goes, and when he died heaven would not have him and hell would not let him in. The Devil threw him one ember of hellfire to light his way, and Jack put it in a hollowed turnip and has wandered ever since. Silas Ravensmoor won it from him at cards, they say, on Samhain, 1789, and had it walled up with his family.",
rumour: "The fire keeper of Tlachtga says Stingy Jack's lantern went into the ground with the Ravensmoors, under their chapel, 'behind the eyes of the dead'. Mad Peg says only: count the skulls." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.jacklantern = d;
RA.order.push("jacklantern");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "jacklantern") {
var key = "jacklantern@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.jacklantern;
if (c && c.key === key)
return c;
var R = SHN_RX.crypt;
return (RA.spots.jacklantern = { x: R.x - R.w / 2 + 0.7, z: -12.5, y: 0.9, key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.jacklantern = function () {
var g = new THREE.Group(), tm = new THREE.MeshLambertMaterial({ color: 0x3A3428 });
var t = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), tm);
t.scale.y = 0.85;
t.position.y = 0.1;
g.add(t);
var face = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0xFF5A10 }));
face.position.set(0, 0.1, 0.1);
g.add(face);
var glow = wGlow(0xFF6A20, 0.7, 0.5);
glow.position.y = 0.1;
g.add(glow);
return { g: g, h: 0.22, anim: function (dt) { t.rotation.y += dt * 0.15; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.jacklantern = { n: "The Ember of Stingy Jack", col: 0xFF6A20, cd: 40, pas: { speed: 1.08, regen: 1.2 },
act: [{ aoe: 18, dmg: 95, knock: 6 }, { aoe: 18, slow: 7 }],
pasT: "The wanderer's light: you move 8% faster and heal a little all the time, as Jack never tires on his road.",
actT: "Hellfire's Ember: a ring of orange fire rolls out from you and burns every foe within 18 m: 95 to each and thrown back; then they stagger, slowed, for 7 seconds (dreamers too, where dreamers may fight)." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.shn;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
var by = {};
d.keeps.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Keepsakes from " + SHN_NAME) + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("");
}
}
catch (e) { }
return h;
};
})();
function shnTest() { return { SHN: SHN, go: shnGo, room: shnEnterRoom, rooms: SHN_RX, kids: SHN_KR, land: shnLand, ground: shnGround, block: shnBlock, on: shnOn, drive: SHND, screens: SHN_SCR, music: SHN_AU }; }
(function () {
if (typeof SHN_ENV === "undefined")
return;
var N = SHN_ENV.night, M = SHN_ENV.manor;
if (N) {
N.hemi = 0.95;
N.hemiCol = 0x8090BC;
N.sun = 0.7;
N.fogD = 0.0036;
N.fog = 0x262A3A;
N.low = 0x2A2E42;
}
if (M) {
M.hemi = 0.62;
M.hemiCol = 0x6A7AA8;
M.sun = 0.48;
M.fogD = 0.0058;
M.fog = 0x1E2230;
}
})();
function shnSwFree(x, z, r) { return __ZC(363, 98, this, arguments, new.target); }
function shnSwLanternPost(P, x, z) {
var y = shnLand(x, z), wd = shnLam(0x3A2A1A);
wCyl(0.07, 0.09, 1.7, wd, x, y + 0.85, z, P, 6);
wBox(0.5, 0.06, 0.06, wd, x, y + 1.7, z, P);
shnTurnip(P, x, y + 1.73, z, 1.6);
var gl = wGlow(0xFF9A40, 1.8, 0.45);
gl.position.set(x, y + 2.0, z);
P.add(gl);
shnSolid(x, z, 0.3, 0.3, y - 1, y + 2);
}
var SHN_SW = {};
function shnSwStraw() { return __ZC(363, 99, this, arguments, new.target); }
function shnSwBale(P, x, z, ry, lit) { return __ZC(363, 100, this, arguments, new.target); }
function shnSwStook(P, x, z) { return __ZC(363, 101, this, arguments, new.target); }
function shnSwCart(P, x, z, ry) { return __ZC(363, 102, this, arguments, new.target); }
function shnSwBench(P, x, z, ry) {
var y = shnLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
var wd = shnLam(0x4A3828);
wBox(1.6, 0.07, 0.4, wd, 0, 0.45, 0, g);
[-0.65, 0.65].forEach(function (s) { wBox(0.08, 0.45, 0.35, wd, s, 0.22, 0, g); });
shnSolid(x, z, 1.7, 0.5, y - 1, y + 0.9, ry);
}
function shnSwGuisers(P, cx, cz, r0, r1, n, seed) { return __ZC(363, 103, this, arguments, new.target); }
function shnSwPlace(G, cx, cz, o, seed) { return __ZC(363, 104, this, arguments, new.target); }
function shnSweep(G) { return __ZC(363, 105, this, arguments, new.target); }
(function () {
if (typeof shnHollow !== "function")
return;
var h = shnHollow;
shnHollow = function (G) { var r = h.apply(this, arguments); try {
shnSweep(G);
}
catch (e) {
if (window.console)
console.warn("[samhain] sweep", e);
} return r; };
})();
