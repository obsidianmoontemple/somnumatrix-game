/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MM = { list: {}, order: [], rows: {}, place: null, at: 0, busy: false, meshes: {}, lairs: {}, clues: {}, secrets: {}, rising: {}, spots: {}, near: null, cityNear: null,
ride: null, inside: null, t: 0, mine: [], mineAt: 0, warned: 0, told: {}, form: null, morph: null, shield: 0, hud: null, card: null, pub: "", pubAt: 0,
far: {}, missing: false, kmove: null, cool: {}, rowsOk: false, rowsAt: -99, firing: false, hudKey: "" };
function mmLite() { return typeof LITE !== "undefined" && !!LITE; }
function mmSigned() { return typeof signedIn === "function" && signedIn(); }
function mmKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function mmMe() { return typeof myUserId === "function" ? myUserId() : null; }
function mmSay(h) { if (typeof setStatus === "function")
try {
setStatus(h);
}
catch (e) { } }
function mmTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function mmRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function mmMissing(e) { return /PGRST202|Could not find the function|does not exist|schema cache|404/i.test(String((e && e.message) || e)); }
function mmHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function mmEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function mmVR() { try {
return !!(renderer && renderer.xr && renderer.xr.isPresenting);
}
catch (e) {
return false;
} }
function mmTouch() { try {
return typeof bwTouch === "function" ? bwTouch() : !!(document.body && document.body.classList.contains("touch"));
}
catch (e) {
return false;
} }
var MM_DEF = [
{ k: "widow", name: "The Brass Widow", short: "Brass Widow", icon: "🕷️", kind: "walker", at: "mars", seed: [-470, -520], clueAt: [70, -40], lair: "canyon",
eye: 8.6, r: 9, spd: 2.4, fly: false, col: 0xB8873A, gun: "steam cannons", shot: "shell", dmg: 46,
about: "An eight-legged walking fortress of brass, iron and steam, built long ago by a frontier engineer who meant to rule the plains with it. A boiler roars in its belly; a cannon deck rides on its back.",
clue: ["A page torn from an engineer's daybook, red with dust:", "“I walked her into the shadow of the great mountain, where two red walls lean together and the wind cannot find her. Eight feet, all folded. When the sun sets behind the mountain, walk toward it and look where the cliffs close.”"],
rooms: ["The Brass Bridge", "The Boiler Room", "The Gun Deck", "The Engineer's Cabin", "The Crew Bunks", "The Leg Gearworks"] },
{ k: "kestrel", name: "The Corsair Kestrel", short: "Corsair Kestrel", icon: "🛸", kind: "ship", at: "pluto", seed: [520, 380], clueAt: [-60, 90], lair: "icecave",
eye: 4.6, r: 12, spd: 9, fly: true, col: 0xC8C4BA, gun: "twin turret lasers", shot: "laser", dmg: 28,
about: "A battered light freighter, quicker than she looks: a round hull, a split cargo prow, a cockpit on a long side tube, a dorsal gun turret and secret holds under the deck plates. More than one smuggler swore by her.",
clue: ["Scratched into a frost-rimed cargo tag:", "“Parked her where the ice cliffs sweat and the heart of Pluto turns to blue glass, far out past the landing lights. Charon watches the cave mouth. Bring a light and don't tell the Port Authority.”"],
rooms: ["The Cockpit", "The Main Hold", "The Lounge", "The Crew Bunks", "The Engine Room", "The Gun Turret", "The Secret Holds"] },
{ k: "shrike", name: "The Twinvane Shrike", short: "Twinvane Shrike", icon: "✈️", kind: "ship", at: "moon", seed: [-430, 560], clueAt: [40, 70], lair: "crater",
eye: 3.2, r: 7, spd: 13, fly: true, col: 0x5A6270, gun: "twin cannons", shot: "plasma", dmg: 24,
about: "A one-seat fighter: a teardrop cockpit pod between two tall ribbed vanes that drink the sunlight, twin cannons under the chin, and an ion engine that hums rather than roars.",
clue: ["A flight log on a scratched data slate:", "“Took a hit over the Sea of Tranquillity and put her down in the dark side of a crater rim, south-west of the old landing site, where the Earth can't see her. The vanes are still warm.”"],
rooms: ["The Cockpit", "The Avionics Crawlway", "The Reactor Bay"] },
{ k: "domeship", name: "Ashvaal, the Pearl Domeship", short: "Ashvaal", icon: "🫧", kind: "ship", at: "veyar", seed: [420, -560], clueAt: [-80, -60], lair: "grove",
eye: 6.2, r: 14, spd: 8, fly: true, col: 0xE8E0F0, gun: "tail lances", shot: "ion", dmg: 30,
about: "A Veyari domeship: a broad pearl hull with a great glass dome set into its back and a living garden under it, swept wings, five turrets and two wing lances, eight crewed battle pods slung beneath, and four giant engines. Inside it is vast: a long pillared hall, the Crystal Dome garden, the Holobridge at the bow.",
clue: ["Words in Veyari glass-script, translated on the back by a careful hand:", "“Ashvaal sleeps where the rose sun sets behind the singing spires, in the grove of tall crystal. Speak softly. The dome remembers its pilots.”"],
rooms: ["The Holobridge", "The Long Hall", "The Crystal Dome", "The Crew Quarters", "The Galley and Mess", "The Pod Bay", "The Armoury and Turret Gallery", "The Star Library", "The Healing Hall", "The Engine Hall"] },
{ k: "bulwark", name: "The Ironhide Bulwark", short: "Ironhide Bulwark", icon: "🛡️", kind: "tank", at: "underdark", seed: [-400, -880], clueAt: [3, -60], lair: "vault",
eye: 3.6, r: 5, spd: 2.8, fly: false, col: 0x4E5A3E, gun: "twin cannons", shot: "shell", dmg: 52,
about: "A heavy tank with twin cannons in a turret the size of a cottage, tracks taller than a man, and armour a hand thick. The dwarves who sealed it away said it was too strong to be used.",
clue: ["Chalked on a mine-cart, in dwarvish runes and common letters:", "“THE IRON BEAST IS WALLED UP WHERE THE OLD RAILS END, PAST THE DEEP WATER, IN THE CAVE THAT ECHOES TWICE. DO NOT WAKE IT.”"],
rooms: ["The Driver's Seat", "The Turret Basket", "The Commander's Cupola", "The Shell Racks", "The Engine Bay"] },
{ k: "rosehorn", name: "Rosehorn, the Pink Unicorn", short: "Rosehorn", icon: "🦄", kind: "beast", beast: "unicorn", at: "neverland", seed: [-330, -380], clueAt: [90, 60], lair: "falls",
eye: 9.2, r: 6, spd: 3.6, fly: false, col: 0xF29AC8, trim: 0xF6F0F4, gun: "horn beam", shot: "arcane", dmg: 26, part: "right arm and sword",
about: "A unicorn of rose-pink armour with a silver mane and a long spiral horn. In the Mythic Sovereign it is the right arm, and its horn becomes the great sword.",
clue: ["A ribbon tied to a branch, with a note in a child's careful writing:", "“The pink horse sleeps behind the tallest waterfall. You have to go through the water. I saw its horn glowing. Second star, then left, then a long way.”"],
rooms: ["The Head Cockpit", "The Mane Gallery", "The Heart Engine", "The Link Chamber"] },
{ k: "nightwyrm", name: "Nightwyrm, the Black Dragon", short: "Nightwyrm", icon: "🐉", kind: "beast", beast: "dragon", at: "venus", seed: [560, -430], clueAt: [-70, 50], lair: "basalt",
eye: 9.6, r: 8, spd: 5.5, fly: true, col: 0x24222A, trim: 0x8A5AD8, gun: "shadow flame", shot: "orb", dmg: 30, part: "left arm and shield",
about: "A black dragon of plated night-steel with violet light in its throat. In the Mythic Sovereign it is the left arm, and its folded wings become the great shield.",
clue: ["A scorched brass plate, still warm:", "“Where the fog is thickest and the ground breaks into black glass, the wyrm coils inside the hollow hill. Go toward the brightest lightning. Its eyes glow violet in the murk.”"],
rooms: ["The Skull Cockpit", "The Spine Walk", "The Furnace Heart", "The Wing Spars", "The Link Chamber"] },
{ k: "emberwing", name: "Emberwing, the Red Phoenix", short: "Emberwing", icon: "🔥", kind: "beast", beast: "phoenix", at: "mercury", seed: [-560, -420], clueAt: [60, -80], lair: "spire",
eye: 7.4, r: 7, spd: 7, fly: true, col: 0xD8342A, trim: 0xF2B23A, gun: "fire bolts", shot: "fire", dmg: 26, part: "wings, helmet and artillery",
about: "A phoenix of red and gold armour whose feathers glow like embers. In the Mythic Sovereign its wings become the Sovereign's wings, its crest the helmet, and its tail the shoulder cannons.",
clue: ["Letters burnt into a black stone:", "“The firebird sleeps on the cold side of the great rim, where the Sun never looks, under a spire of rock shaped like a flame. Walk away from the Sun until your shadow is longest.”"],
rooms: ["The Crest Cockpit", "The Feather Halls", "The Ember Core", "The Link Chamber"] },
{ k: "frostfang", name: "Frostfang, the Blue Dire Wolf", short: "Frostfang", icon: "🐺", kind: "beast", beast: "wolf", at: "northpole", seed: [-560, -480], clueAt: [-50, 80], lair: "den",
eye: 6.4, r: 6, spd: 5, fly: false, col: 0x2E6AC8, trim: 0xD8E8F4, gun: "frost bite", shot: "frost", dmg: 28, part: "right leg",
about: "A great dire wolf of ice-blue armour with white steel fangs. In the Mythic Sovereign it is the right leg.",
clue: ["A paw print pressed into a sheet of blue ice, and beside it, carved:", "“Where the pines end and the snow goes on, the wolf keeps its den under the ridge that howls. Follow the north wind until it stops.”"],
rooms: ["The Head Cockpit", "The Den Run", "The Frost Engine", "The Link Chamber"] },
{ k: "riddlecrown", name: "Riddlecrown, the Purple Sphinx", short: "Riddlecrown", icon: "🦁", kind: "beast", beast: "sphinx", at: "sea", seed: [-7400, 6360], clueAt: [-1784, 2362], lair: "isle",
eye: 7.2, r: 7, spd: 3.4, fly: false, col: 0x7A3AB8, trim: 0xE8C060, gun: "riddle ray", shot: "arcane", dmg: 26, part: "left leg",
about: "A sphinx of violet and gold armour, a lion's body and wings folded on its back, a calm face that asks questions. In the Mythic Sovereign it is the left leg.",
clue: ["A message in a stoppered bottle, washed up on the sand:", "“On the island no chart names, past the last of the others, a violet sphinx lies with its paws in the sea. It answers only those who come by boat.”"],
rooms: ["The Crown Cockpit", "The Hall of Questions", "The Paw Engines", "The Link Chamber"] },
{ k: "blazehorn", name: "Blazehorn, the Orange Minotaur", short: "Blazehorn", icon: "🐂", kind: "beast", beast: "minotaur", at: "greenwold", seed: [260, 300], clueAt: [-30, -40], lair: "maze",
eye: 12.6, r: 6, spd: 2.6, fly: false, col: 0xE07A22, trim: 0x3A3A40, gun: "horn charge", shot: "fire", dmg: 34, part: "body and head",
about: "A towering minotaur of orange and iron armour, horns like two scimitars. In the Mythic Sovereign it is the body and the head, and its pilot leads.",
clue: ["A ball of red thread, with a tag:", "“In the hedge maze nobody tends, at the far edge of the farms, the bull stands in the middle. Keep your right hand on the hedge and you will reach it.”"],
rooms: ["The Head Cockpit", "The Command Deck", "The Chest Reactor", "The Link Chamber"] }
];
MM_DEF.forEach(function (d, i) { d.i = i; MM.list[d.k] = d; MM.order.push(d.k); });
var MM_BEASTS = ["blazehorn", "frostfang", "riddlecrown", "rosehorn", "nightwyrm", "emberwing"];
var MM_SOV = { k: "sovereign", name: "The Mythic Sovereign", short: "Mythic Sovereign", icon: "⚜️", kind: "sovereign", eye: 31.5, r: 9, spd: 2.8, fly: false, col: 0xE8C060, gun: "artillery and the great sword", shot: "star2", dmg: 60,
rooms: ["The Sovereign's Bridge", "The Six Stations", "The Heart of the Six"] };
function mmPlaceName(k) { try {
if (typeof dkPlaceName === "function")
return dkPlaceName(k);
}
catch (e) { } return k; }
var MM_TEX = {};
function mmPanelTex(kind) {
if (MM_TEX[kind])
return MM_TEX[kind];
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d"), R = wRand(mmHash(kind));
x.fillStyle = "#E8E8E8";
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 1400; i++) {
var v = 200 + Math.floor(R() * 55);
x.fillStyle = "rgba(" + v + "," + v + "," + v + ",0.35)";
x.fillRect(R() * 256, R() * 256, 1 + R() * 2, 1 + R() * 2);
}
if (kind === "scale") {
for (var r = 0; r < 9; r++)
for (var q = 0; q < 9; q++) {
var cx = q * 32 + (r % 2 ? 16 : 0), cy = r * 30;
x.strokeStyle = "rgba(40,40,46,.55)";
x.lineWidth = 2;
x.beginPath();
x.arc(cx, cy, 17, 0, Math.PI);
x.stroke();
x.fillStyle = "rgba(255,255,255,.18)";
x.beginPath();
x.arc(cx, cy + 4, 10, 0.2, Math.PI - 0.2);
x.fill();
}
}
else if (kind === "brass") {
x.strokeStyle = "rgba(70,46,18,.55)";
x.lineWidth = 2;
for (var b = 0; b < 4; b++) {
x.beginPath();
x.moveTo(0, b * 64 + 2);
x.lineTo(256, b * 64 + 2);
x.stroke();
}
x.fillStyle = "rgba(60,40,14,.6)";
for (var b2 = 0; b2 < 4; b2++)
for (var rv = 0; rv < 16; rv++) {
x.beginPath();
x.arc(rv * 16 + 8, b2 * 64 + 9, 2.4, 0, 7);
x.fill();
}
}
else if (kind === "tread") {
x.fillStyle = "#8A8A88";
x.fillRect(0, 0, 256, 256);
for (var tl = 0; tl < 16; tl++) {
var ty = tl * 16;
x.fillStyle = "#3A3A38";
x.fillRect(0, ty, 256, 3);
x.fillStyle = "#C8C8C4";
x.fillRect(8, ty + 5, 240, 6);
x.fillStyle = "#5A5A58";
x.fillRect(120, ty + 3, 16, 10);
}
}
else if (kind === "grille") {
x.fillStyle = "#9A9A98";
x.fillRect(0, 0, 256, 256);
for (var gl = 0; gl < 32; gl++) {
x.fillStyle = "#2A2A2A";
x.fillRect(0, gl * 8 + 2, 256, 4);
}
x.strokeStyle = "#4A4A48";
x.lineWidth = 6;
x.strokeRect(3, 3, 250, 250);
}
else if (kind === "fur") {
x.fillStyle = "#C8C8C8";
x.fillRect(0, 0, 256, 256);
for (var f = 0; f < 3200; f++) {
var fx = R() * 256, fy = R() * 256, fl = 5 + R() * 10, fa = Math.PI / 2 + (R() - 0.5) * 0.5, v2 = R() < 0.5 ? 120 + Math.floor(R() * 50) : 210 + Math.floor(R() * 45);
x.strokeStyle = "rgba(" + v2 + "," + v2 + "," + v2 + ",0.7)";
x.lineWidth = 1 + R() * 1.2;
x.beginPath();
x.moveTo(fx, fy);
x.quadraticCurveTo(fx + Math.cos(fa) * fl * 0.5 + (R() - 0.5) * 3, fy + Math.sin(fa) * fl * 0.5, fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl);
x.stroke();
}
}
else if (kind === "feather") {
x.fillStyle = "#B8B8B8";
x.fillRect(0, 0, 256, 256);
for (var fr = -1; fr < 9; fr++)
for (var fc = 0; fc < 6; fc++) {
var cx2 = fc * 46 + (fr % 2 ? 23 : 0), cy2 = fr * 30;
x.fillStyle = "rgba(235,235,235,0.9)";
x.beginPath();
x.ellipse(cx2, cy2 + 18, 21, 30, 0, 0, Math.PI);
x.fill();
x.strokeStyle = "rgba(90,90,90,.55)";
x.lineWidth = 1.4;
x.beginPath();
x.ellipse(cx2, cy2 + 18, 21, 30, 0, 0, Math.PI);
x.stroke();
x.strokeStyle = "rgba(120,120,120,.6)";
x.lineWidth = 1.2;
x.beginPath();
x.moveTo(cx2, cy2 + 14);
x.lineTo(cx2, cy2 + 46);
x.stroke();
x.strokeStyle = "rgba(150,150,150,.35)";
x.lineWidth = 0.8;
for (var bb = 0; bb < 7; bb++) {
var by = cy2 + 20 + bb * 4;
x.beginPath();
x.moveTo(cx2, by);
x.lineTo(cx2 - 14 + bb, by + 6);
x.moveTo(cx2, by);
x.lineTo(cx2 + 14 - bb, by + 6);
x.stroke();
}
}
}
else if (kind === "pearl") {
for (var s = 0; s < 7; s++) {
x.strokeStyle = "rgba(150,120,190,.25)";
x.lineWidth = 3;
x.beginPath();
x.moveTo(0, s * 40 + R() * 10);
x.bezierCurveTo(80, s * 40 + R() * 30, 170, s * 40 - R() * 30, 256, s * 40 + R() * 10);
x.stroke();
}
}
else {
x.strokeStyle = "rgba(30,32,36,.55)";
x.lineWidth = 2;
var rows = [0, 58, 120, 180, 236];
rows.forEach(function (y) { x.beginPath(); x.moveTo(0, y + 1); x.lineTo(256, y + 1); x.stroke(); });
for (var k = 0; k < rows.length - 1; k++) {
var off = R() * 80;
for (var xx = off; xx < 256; xx += 70 + R() * 60) {
x.beginPath();
x.moveTo(xx, rows[k]);
x.lineTo(xx, rows[k + 1]);
x.stroke();
}
}
x.fillStyle = "rgba(40,40,44,.5)";
rows.forEach(function (y) { for (var rv2 = 6; rv2 < 256; rv2 += 14) {
x.beginPath();
x.arc(rv2, y + 6, 1.6, 0, 7);
x.fill();
} });
x.strokeStyle = "rgba(30,32,36,.4)";
x.strokeRect(150, 72, 46, 36);
x.strokeRect(30, 192, 30, 30);
if (kind === "worn") {
for (var w = 0; w < 60; w++) {
x.fillStyle = "rgba(90,70,50," + (0.05 + R() * 0.18) + ")";
x.beginPath();
x.ellipse(R() * 256, R() * 256, 3 + R() * 16, 2 + R() * 7, R() * 3, 0, 7);
x.fill();
}
}
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1, 1);
try {
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
MM_TEX[kind] = t;
return t;
}
var MM_MATS = {};
var MM_ENV = null;
function mmEnv() {
if (MM_ENV !== null)
return MM_ENV || null;
MM_ENV = false;
try {
if (typeof renderer === "undefined" || !renderer || !THREE.PMREMGenerator)
return null;
var sc = new THREE.Scene(), g = new THREE.SphereGeometry(50, 32, 16), P = g.attributes.position, C = new Float32Array(P.count * 3), c = new THREE.Color(), p = new THREE.Vector3();
var top = new THREE.Color(0x5A6E92), low = new THREE.Color(0xD8C8B0), gr = new THREE.Color(0x2E2A26), sun = new THREE.Color(0xFFE6C0), d = new THREE.Vector3(0.5, 0.45, -0.5).normalize();
for (var i = 0; i < P.count; i++) {
p.set(P.getX(i), P.getY(i), P.getZ(i)).normalize();
if (p.y >= 0)
c.copy(low).lerp(top, Math.pow(p.y, 0.6));
else
c.copy(low).lerp(gr, Math.min(1, -p.y * 4));
var s = Math.max(0, p.dot(d));
c.lerp(sun, Math.pow(s, 8) * 0.8);
C[i * 3] = c.r;
C[i * 3 + 1] = c.g;
C[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(C, 3));
sc.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
var pm = new THREE.PMREMGenerator(renderer);
MM_ENV = pm.fromScene(sc, 0.03).texture;
pm.dispose();
g.dispose();
}
catch (e) {
MM_ENV = false;
}
return MM_ENV || null;
}
function mmMat(col, o) {
o = o || {};
var key = col + "|" + (o.shine || 0) + "|" + (o.tex || "") + "|" + (o.e || 0) + "|" + (o.op === undefined ? "" : o.op) + "|" + (o.ds ? 1 : 0) + "|" + (o.glow ? 1 : 0) + "|" + (o.rep || 1) + "|" + (o.metal === undefined ? "" : o.metal) + "|" + (o.rough === undefined ? "" : o.rough);
if (MM_MATS[key])
return MM_MATS[key];
var m;
if (o.glow)
m = new THREE.MeshBasicMaterial({ color: col, transparent: o.op !== undefined, opacity: o.op === undefined ? 1 : o.op, depthWrite: o.op === undefined });
else {
if (mmLite())
m = new THREE.MeshLambertMaterial({ color: col });
else {
var metal = o.metal !== undefined ? o.metal : o.tex === "brass" || o.tex === "plate" ? 0.78 : o.tex === "worn" ? 0.5 : o.tex === "scale" || o.tex === "pearl" ? 0.4 : o.shine ? 0.55 : 0.15;
var rough = o.rough !== undefined ? o.rough : Math.max(0.22, Math.min(0.85, 0.9 - (o.shine || 0) / 110));
m = new THREE.MeshStandardMaterial({ color: col, metalness: metal, roughness: rough });
var env = mmEnv();
if (env) {
m.envMap = env;
m.envMapIntensity = 1.0;
}
}
if (o.tex) {
var t = mmPanelTex(o.tex);
if (o.rep && o.rep !== 1) {
t = t.clone();
t.needsUpdate = true;
t.repeat.set(o.rep, o.rep);
}
m.map = t;
if (m.isMeshStandardMaterial) {
m.bumpMap = t;
m.bumpScale = 0.035;
}
}
if (o.e) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.mmShared = 1;
MM_MATS[key] = m;
return m;
}
function mmUv(geo, k) { var uv = geo.attributes.uv; if (!uv)
return geo; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * k, uv.getY(i) * k); uv.needsUpdate = true; return geo; }
function mmMesh(geo, mat, x, y, z, P) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (P)
P.add(m); return m; }
function mmSeg(n) { return mmLite() ? Math.max(6, Math.round(n * 0.6)) : n; }
function mmCapsGeo(r1, r2, len, seg) { return __ZC(334, 0, this, arguments, new.target); }
function mmCaps(P, mat, r1, r2, len, x, y, z, rx, ry, rz, seg) { var m = mmMesh(mmCapsGeo(r1, r2, len, seg), mat, x, y, z, P); m.rotation.set(rx || 0, ry || 0, rz || 0); return m; }
function mmEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = mmMesh(new THREE.SphereGeometry(1, mmSeg(seg || 18), mmSeg(Math.round((seg || 18) * 0.7))), mat, x, y, z, P); m.scale.set(rx, ry, rz); return m; }
function mmLathe(P, mat, prof, x, y, z, seg) { return mmMesh(new THREE.LatheGeometry(prof.map(function (q) { return new THREE.Vector2(q[0], q[1]); }), mmSeg(seg || 18)), mat, x, y, z, P); }
function mmFlat(P, mat, pts, depth, x, y, z, rx, ry, rz) { return __ZC(334, 1, this, arguments, new.target); }
function mmSlab(P, mat, w, h, d, x, y, z, rx, ry, rz) {
var r = Math.min(w, h) * 0.18, s = new THREE.Shape();
s.moveTo(-w / 2 + r, -h / 2);
s.lineTo(w / 2 - r, -h / 2);
s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
s.lineTo(w / 2, h / 2 - r);
s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
s.lineTo(-w / 2 + r, h / 2);
s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
s.lineTo(-w / 2, -h / 2 + r);
s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
var bev = Math.min(d * 0.3, r * 0.6, 0.3);
var g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.01, d - bev * 2), bevelEnabled: !mmLite(), bevelThickness: bev, bevelSize: bev * 0.8, bevelSegments: 2, curveSegments: 4 });
g.translate(0, 0, -(d - bev * 2) / 2);
mmUv(g, 0.22);
var m = mmMesh(g, mat, x, y, z, P);
m.rotation.set(rx || 0, ry || 0, rz || 0);
return m;
}
function mmCyl(P, mat, rt, rb, h, x, y, z, rx, ry, rz, seg) { var m = mmMesh(new THREE.CylinderGeometry(rt, rb, h, mmSeg(seg || 16)), mat, x, y, z, P); m.rotation.set(rx || 0, ry || 0, rz || 0); return m; }
function mmCone(P, mat, r, h, x, y, z, rx, ry, rz, seg) { var m = mmMesh(new THREE.ConeGeometry(r, h, mmSeg(seg || 16)), mat, x, y, z, P); m.rotation.set(rx || 0, ry || 0, rz || 0); return m; }
function mmTorus(P, mat, R, r, x, y, z, rx, ry, rz, arc) { var m = mmMesh(new THREE.TorusGeometry(R, r, mmSeg(8), mmSeg(24), arc || Math.PI * 2), mat, x, y, z, P); m.rotation.set(rx || 0, ry || 0, rz || 0); return m; }
function mmTube(P, mat, pts, r, x, y, z, seg) {
var c = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
return mmMesh(new THREE.TubeGeometry(c, mmSeg(seg || 20), r, mmSeg(8), false), mat, x, y, z, P);
}
function mmHorn(P, mat, pts, r0, x, y, z) { return __ZC(334, 2, this, arguments, new.target); }
function mmGlow(P, col, size, op, x, y, z) { if (typeof wGlow !== "function")
return null; var g = wGlow(col, size, op === undefined ? 0.4 : op); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function mmRod(P, mat, a, b, r1, r2, seg) { return __ZC(334, 3, this, arguments, new.target); }
function mmPiston(P, hous, rod, a, b, r) { return __ZC(334, 4, this, arguments, new.target); }
function mmSeam(P, col, pts, r) { var c = new THREE.Color(col).multiplyScalar(0.8); return mmTube(P, mmMat(c.getHex(), { glow: 1 }), pts, r || 0.05, 0, 0, 0, Math.max(6, pts.length * 6)); }
function mmLamp(P, body, col, r, x, y, z, rx, ry) {
var G = mmG(P, x, y, z, rx || 0, ry || 0, 0);
mmCyl(G, body, r * 1.25, r * 1.35, r * 0.9, 0, 0, 0, Math.PI / 2, 0, 0, 14);
var l = mmMesh(new THREE.CircleGeometry(r, mmSeg(14)), mmMat(col, { e: col, ei: 0.85 }), 0, 0, -r * 0.46, G);
l.rotation.y = Math.PI;
return G;
}
function mmVents(P, frame, slat, w, h, n, x, y, z, rx, ry, rz) {
var G = mmG(P, x, y, z, rx || 0, ry || 0, rz || 0);
mmSlab(G, frame, w, h, 0.12, 0, 0, 0);
for (var i = 0; i < n; i++)
mmSlab(G, slat, w * 0.86, h / (n * 1.6), 0.1, 0, -h * 0.42 + i * (h * 0.84 / (n - 1 || 1)), -0.08, 0.5, 0, 0);
return G;
}
function mmG(P, x, y, z, rx, ry, rz) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); g.rotation.set(rx || 0, ry || 0, rz || 0); if (P)
P.add(g); return g; }
var MM_BUILD = {};
MM_BUILD.widow = function () { return __ZC(334, 5, this, arguments, new.target); };
MM_BUILD.kestrel = function () { return __ZC(334, 6, this, arguments, new.target); };
MM_BUILD.shrike = function () { return __ZC(334, 7, this, arguments, new.target); };
MM_BUILD.domeship = function () { return __ZC(334, 8, this, arguments, new.target); };
MM_BUILD.bulwark = function () { return __ZC(334, 9, this, arguments, new.target); };
var MM_SOV_GROUPS = { torso: [0, 15, 0], head: [0, 31, 0], legR: [3.4, 15.5, 0], legL: [-3.4, 15.5, 0], armR: [8.6, 28, 0], armL: [-8.6, 28, 0], wings: [0, 27, 2.6] };
var MM_PI = Math.PI, MM_H = Math.PI / 2;
function mmBeastKit() { return __ZC(334, 10, this, arguments, new.target); }
function mmBeastAnim(K, st, dt, mv) { return __ZC(334, 11, this, arguments, new.target); }
function mmTorso(P, mat, prof, x, y, z, sx, sy, seg) { var m = mmLathe(P, mat, prof, x, y, z, seg || 22); m.rotation.x = -MM_H; m.scale.set(sx || 1, 1, sy || 1); return m; }
function mmRadAt(prof, f) { for (var i = 1; i < prof.length; i++) {
var a = prof[i - 1], b = prof[i];
if (f <= b[1])
return a[0] + (b[0] - a[0]) * ((f - a[1]) / ((b[1] - a[1]) || 1));
} return prof[prof.length - 1][0]; }
function mmArc(P, mat, r, t, a0, a1, len, x, y, z, rx, ry, rz) { return __ZC(334, 12, this, arguments, new.target); }
function mmFeather(P, mat, len, w, x, y, z, dir, spin) { return __ZC(334, 13, this, arguments, new.target); }
function mmWingFeather(P, mat, len, w, x, y, z, dx, dz) {
var G = mmFeather(P, mat, len, w, x, y, z, [0, 1, 0], 0), d = new THREE.Vector3(dx, 0, dz).normalize(), up = new THREE.Vector3(0, 1, 0);
G.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3().crossVectors(d, up), d, up));
return G;
}
function mmLock(P, mat, len, w, curl, x, y, z, dir) { return __ZC(334, 14, this, arguments, new.target); }
function mmN(n) { return mmLite() ? Math.max(2, Math.ceil(n * 0.5)) : n; }
function mmBushy(P, mats, pts, len, w, rings, per) { return __ZC(334, 15, this, arguments, new.target); }
function mmRuff(P, mats, cx, cy, z, rx, ry, a0, a1, n, len, w, lean, droop) {
n = mmN(n);
for (var k = 0; k < n; k++) {
var t = n > 1 ? k / (n - 1) : 0.5, a = a0 + (a1 - a0) * t, c = Math.cos(a), s = Math.sin(a);
mmLock(P, mats[k % mats.length], len * (0.85 + 0.3 * ((k * 7) % 5) / 4), w, (k % 2 ? 0.18 : -0.18), cx + c * rx, cy + s * ry, z, [c * 0.75, s * 0.75 - (droop || 0), lean]);
}
}
function mmSabaton(F, steel, col, trim, glow, side) { return __ZC(334, 16, this, arguments, new.target); }
function mmQuadLegs(K, o) { return __ZC(334, 17, this, arguments, new.target); }
function mmBakeParts(K) {
if (typeof ifBake !== "function")
return;
K.parts.forEach(function (P) { var D = new THREE.Group(); P.m.children.slice().forEach(function (c) { D.add(c); }); var b = ifBake(D); b.children.slice().forEach(function (c) { P.m.add(c); }); });
}
MM_BUILD.frostfang = function () { return mmBuildWolfish("frostfang", "legR", { col: 0x2E6AC8, trim: 0xD8E8F4, eye: 0x9AE8FF }); };
function mmBuildWolfish(k, grp, c) { return __ZC(334, 18, this, arguments, new.target); }
MM_BUILD.riddlecrown = function () { return __ZC(334, 19, this, arguments, new.target); };
MM_BUILD.rosehorn = function () { return __ZC(334, 20, this, arguments, new.target); };
MM_BUILD.nightwyrm = function () { return __ZC(334, 21, this, arguments, new.target); };
MM_BUILD.emberwing = function () { return __ZC(334, 22, this, arguments, new.target); };
MM_BUILD.blazehorn = function () { return __ZC(334, 23, this, arguments, new.target); };
function mmWhere() {
try {
if (typeof store !== "undefined" && store.inside)
return null;
if (typeof WLD !== "undefined" && WLD.on === "mmin")
return null;
if (typeof MALL !== "undefined" && MALL.on)
return null;
if (typeof UG2 !== "undefined" && UG2.on)
return null;
if (typeof dkWhere === "function") {
var k = dkWhere();
if (k === "station" || k === "casino" || k === "space")
return null;
return k;
}
}
catch (e) { }
return null;
}
function mmBase() {
try {
if (typeof WLD !== "undefined" && WLD.on && WLD.w)
return { x: WLD.w.base || 0, z: 0 };
var k = mmWhere();
if (k === "city" && typeof ATLC !== "undefined" && ATLC)
return { x: ATLC.x, z: ATLC.z };
if (k && /^land_/.test(k) && typeof LD !== "undefined" && LD.rid === store.here)
return { x: LD.ox, z: LD.oz };
}
catch (e) { }
return null;
}
function mmGround(lx, lz) {
try {
if (typeof WLD !== "undefined" && WLD.on && WLD.w) {
if (WLD.on === "sea" && typeof seaHeight === "function")
return Math.max(seaHeight(lx, lz), -1.2);
var h = WLD.w.ground ? WLD.w.ground(lx, lz, 0) : 0;
return (h == null || !isFinite(h)) ? 0 : h;
}
var b = mmBase();
if (b && typeof terrainY === "function")
return terrainY(b.x + lx, b.z + lz) || 0;
}
catch (e) { }
return 0;
}
function mmBlockL(lx, lz, feet) {
try {
if (typeof WLD !== "undefined" && WLD.on && WLD.w) {
var W = WLD.w;
if (W.block && W.block(lx, lz, feet))
return true;
if (W.solids && worldSolidAt(W.solids, lx, lz, feet))
return true;
return false;
}
var b = mmBase();
if (b && typeof blockedAt === "function")
return !!blockedAt(b.x + lx, b.z + lz, feet);
}
catch (e) {
return true;
}
return false;
}
function mmSeed(d) {
if (d.at === "sea")
return [MM_ISLE.x + MM_ISLE.sphinx[0], MM_ISLE.z + MM_ISLE.sphinx[1]];
return d.seed;
}
function mmHideSpot(d) { return __ZC(334, 24, this, arguments, new.target); }
function mmClueSpot(d) { return __ZC(334, 25, this, arguments, new.target); }
var MM_UD_CLUE = [3, -60];
var MM_MOUTH = [Math.PI / 2 + 0.62, Math.PI * 2 - 1.24];
var MM_ISLE = { k: "mm_riddle", name: "An island no chart names", x: -7400, z: 6400, r: 170, h: 16, col: 0x8A9A5A, rock: 0xC8B898, gen: true, card: "Past the last island on any chart",
dock: { x: -7400, z: 6720 }, land: { x: -7400, z: 6540 }, sphinx: [0, -40], flat: [[0, -40, 44, 6]], clear: [[0, -40, 48]],
about: ["No chart names it. The sand is fine and violet-grey, and the wind seems to ask you something.", "At its heart, among broken columns, a great shape lies with its paws stretched toward the sea."] };
function mmRockGeo(seed, detail) { return __ZC(334, 26, this, arguments, new.target); }
function mmRock(P, mat, sx, sy, sz, x, y, z, seed, ry) { var m = mmMesh(mmRockGeo(seed || 1), mat, x, y, z, P); m.scale.set(sx, sy, sz); if (ry)
m.rotation.y = ry; return m; }
var MM_LAIR = {
canyon: function (G, d, sol) { return __ZC(334, 27, this, arguments, new.target); },
icecave: function (G, d, sol) { return __ZC(334, 28, this, arguments, new.target); },
crater: function (G, d, sol) { return __ZC(334, 29, this, arguments, new.target); },
grove: function (G, d, sol) { return __ZC(334, 30, this, arguments, new.target); },
vault: function (G, d, sol) { return __ZC(334, 31, this, arguments, new.target); },
falls: function (G, d, sol) { return __ZC(334, 32, this, arguments, new.target); },
basalt: function (G, d, sol) { return __ZC(334, 33, this, arguments, new.target); },
spire: function (G, d, sol) { return __ZC(334, 34, this, arguments, new.target); },
den: function (G, d, sol) { return __ZC(334, 35, this, arguments, new.target); },
isle: function (G, d, sol) { return __ZC(334, 36, this, arguments, new.target); },
maze: function (G, d, sol) { return __ZC(334, 37, this, arguments, new.target); }
};
var MM_SECRET = {
canyon: { at: [0, -20.5], mark: 0x6A2E1A, what: "a seam in the red rock", look: "A seam runs through the rock here, far too straight to be natural. Sand has been brushed away from its foot, not long ago.", act: "Push on the seam", open: "Stone grinds on stone. The ground at the heart of the canyon splits, and something vast unfolds up out of the dark." },
icecave: { at: [6, -19], mark: 0x5A7A98, what: "something dark under the ice", look: "Under the ice of the floor there is something dark and straight-edged, like the top of a hatch.", act: "Chip at the ice", open: "The ice cracks in a long ring. A hatch the size of a field swings down, and a ship rises slowly out of the deep cold." },
crater: { at: [-6, -5], mark: 0x2A2826, what: "a stone that sounds hollow", look: "Tap this stone and it rings hollow. The dust around it is pressed flat in a ring, as if something heavy once sat here.", act: "Lift the stone", open: "Under the stone is a handle. You pull, the crater floor slides apart, and a ship is lifted up into the starlight." },
grove: { at: [0, -20], mark: 0x6A4A9A, what: "a crystal that hums", look: "One crystal here hums when you come close. There is a hand-shaped hollow worn into it.", act: "Lay your hand on it", open: "The hum rises into one clear note. The grove floor opens like a flower, and a pearl-white dome rises out of it." },
vault: { at: [0, -11.5], mark: 0x3A3634, what: "one stone colder than the rest", look: "One stone in the back wall is colder than the others, and there is a thumb-sized hollow worn into its edge.", act: "Press the hollow", open: "Chains rattle somewhere below. The vault floor drops away into a lift, and the iron beast comes grinding up out of the deep." },
falls: { at: [0, -9], mark: 0x3A5A3A, what: "moss over a carved ring", look: "Behind the water, moss has grown over a ring carved into the rock. Under the moss the stone is smooth, as if many hands have touched it.", act: "Clear the moss and touch the ring", open: "The ring glows faintly. The pool behind the falls drains away, and something pink and shining rises slowly out of the water." },
basalt: { at: [0, -15], mark: 0x4A2A5A, what: "a column with a crack in it", look: "One black column has a crack running through it, and warm air breathes out of the crack.", act: "Put your shoulder to it", open: "The column swings aside. The hollow floor breaks open, and a great black shape uncoils up out of the dark." },
spire: { at: [-11, -1], mark: 0x3A3430, what: "ground that sounds hollow", look: "Your footsteps sound hollow here. Under the dust is a slab with a flame cut into it.", act: "Brush off the slab and press the flame", open: "The slab sinks. The ground under the spire opens, and a bird of fire rises out of the dark, shaking off the dust." },
den: { at: [0, -14], mark: 0x7A8A9A, what: "claw marks in the ice", look: "Deep claw marks score the ice here, all leading to one patch that is thinner than the rest.", act: "Break through the thin ice", open: "The thin ice gives way with a crack. The den floor shifts, and a great blue wolf climbs up out of the frozen dark." },
isle: { at: [0, -9], mark: 0x8A7A60, what: "a riddle carved in the floor", look: "A riddle is carved into the floor stone, half worn away: “What has no door, yet opens for the patient?” A paw print is cut beside it.", act: "Press the paw print", open: "The floor stone slides away. Sand pours into the dark below, and a violet sphinx rises out of it with its eyes already open." },
maze: { at: [7, -7], mark: 0x5A4A3A, what: "an old iron ring in the grass", look: "Half hidden in the long grass is an old iron ring, rusted, set into a stone.", act: "Pull the ring", open: "The ground shudders. The middle of the maze sinks and turns, and a great bull of orange armour rises up out of the earth." }
};
function mmOpened() { try {
return JSON.parse(localStorage.getItem("mm.open") || "{}") || {};
}
catch (e) {
return {};
} }
function mmSealed(k) {
var r = MM.rows[k], d = MM.list[k];
if (mmKeeper())
return false;
if (MM.rowsOk && r && (r.owner || (r.x != null && !r.hidden)))
return false;
return !mmOpened()[d.k];
}
function mmSecretMesh(S) {
var g = new THREE.Group(), m = mmMat(S.mark, { shine: 6 });
mmCyl(g, m, 0.42, 0.48, 0.08, 0, 0.04, 0, 0, 0, 0, 10);
g.userData.noCull = 1;
return g;
}
function mmExamine(d) {
var S = MM_SECRET[d.lair];
if (!S)
return;
worldCard(worldFacts("You look closer", "", [], [S.look]) + worldBtn("open", mmEsc(S.act), ""), { open: function () { worldCard(null); mmOpen(d.k); } });
}
function mmOpen(k) {
var d = MM.list[k], S = MM_SECRET[d.lair], o = mmOpened();
o[k] = Date.now();
try {
localStorage.setItem("mm.open", JSON.stringify(o));
}
catch (e) { }
MM.rising = MM.rising || {};
MM.rising[k] = 0;
mmTone(196, 0.6);
mmSay(mmEsc(S.open));
}
function mmClueMesh(d) { return __ZC(334, 38, this, arguments, new.target); }
function mmRowsHere(place) {
var out = [];
MM.order.forEach(function (k) {
var r = MM.rows[k], d = MM.list[k];
if (MM.rowsOk) {
if (r && r.here && !r.riding && !(MM.ride && MM.ride.k === k) && !mmSealed(k))
out.push(r);
}
else if (d.at === place && !mmSealed(k))
out.push({ k: k, place: place, hidden: true });
});
return out;
}
function mmInst(k) { return MM.meshes[k]; }
function mmMake(k) {
var d = MM.list[k], B = MM_BUILD[k](), g = new THREE.Group();
g.add(B.g);
g.userData.noCull = 1;
g.traverse(function (o) { if (o.isMesh)
o.userData.mmMine = 1; });
var I = { k: k, d: d, B: B, g: g, x: 0, y: 0, z: 0, yaw: 0, st: { alt: 0 }, mv: 0 };
scene.add(g);
mmMuzzles(I);
return I;
}
function mmDrop(I) { if (!I)
return; if (I.g.parent)
I.g.parent.remove(I.g); I.g.traverse(function (o) { if (o.geometry && o.geometry.dispose)
o.geometry.dispose(); }); }
function mmPlaceBuild(place) {
mmPlaceDrop();
MM.place = place;
MM.sol = [];
MM.lairList = [];
MM.secrets = {};
var b = mmBase();
if (!b)
return;
MM_DEF.forEach(function (d) {
if (d.at !== place)
return;
var S = mmHideSpot(d), G = new THREE.Group(), sol = [];
try {
(MM_LAIR[d.lair] || function () { })(G, d, sol);
}
catch (e) {
if (window.console)
console.warn("[mm] lair", d.k, e);
}
G.position.set(b.x + S.x, S.y, b.z + S.z);
G.rotation.y = S.yaw;
G.userData.noCull = 1;
scene.add(G);
var c = Math.cos(S.yaw), s = Math.sin(S.yaw);
sol.forEach(function (o) { var q = { x: S.x + o.x * c + o.z * s, z: S.z - o.x * s + o.z * c }; if (o.r !== undefined)
q.r = o.r;
else {
q.hw = o.hw;
q.hd = o.hd;
q.rot = S.yaw;
} MM.sol.push(q); });
MM.lairs[d.k] = G;
var Q = MM_SECRET[d.lair];
if (Q) {
var sx = S.x + Q.at[0] * c + Q.at[1] * s, sz = S.z - Q.at[0] * s + Q.at[1] * c, sy = mmGround(sx, sz), sm = mmSecretMesh(Q);
sm.position.set(b.x + sx, sy, b.z + sz);
scene.add(sm);
MM.secrets[d.k] = { g: sm, x: sx, z: sz, y: sy, d: d };
}
var C = mmClueSpot(d), cm = mmClueMesh(d);
cm.position.set(b.x + C.x, C.y, b.z + C.z);
scene.add(cm);
MM.clues[d.k] = { g: cm, x: C.x, z: C.z, y: C.y, d: d };
});
}
function mmPlaceDrop() {
Object.keys(MM.lairs).forEach(function (k) { var G = MM.lairs[k]; if (G.parent)
G.parent.remove(G); G.traverse(function (o) { if (o.geometry && o.geometry.dispose)
o.geometry.dispose(); }); });
Object.keys(MM.clues).forEach(function (k) { var C = MM.clues[k]; if (C.g.parent)
C.g.parent.remove(C.g); });
Object.keys(MM.secrets || {}).forEach(function (k) { var C = MM.secrets[k]; if (C.g.parent)
C.g.parent.remove(C.g); });
MM.lairs = {};
MM.clues = {};
MM.secrets = {};
MM.sol = [];
Object.keys(MM.meshes).forEach(function (k) { if (!MM.ride || MM.ride.k !== k) {
mmDrop(MM.meshes[k]);
delete MM.meshes[k];
} });
MM.place = null;
}
function mmRowSpot(r) {
var d = MM.list[r.k];
if (r.x != null && r.z != null && !r.hidden)
return { x: +r.x, z: +r.z, y: r.y != null ? +r.y : mmGround(+r.x, +r.z), yaw: +r.yaw || 0 };
var S = mmHideSpot(d);
return { x: S.x, z: S.z, y: S.y, yaw: S.yaw + Math.PI };
}
function mmHp(d) { return d.kind === "sovereign" ? 2400 : d.kind === "tank" ? 760 : d.kind === "walker" ? 680 : d.k === "shrike" ? 300 : d.kind === "ship" ? 440 : d.part === "body and head" ? 560 : 440; }
function mmAng(a) { while (a > Math.PI)
a -= Math.PI * 2; while (a < -Math.PI)
a += Math.PI * 2; return a; }
function mmL() { var b = mmBase() || { x: 0, z: 0 }, P = camera.position; return { x: P.x - b.x, y: P.y, z: P.z - b.z }; }
function mmTick(dt) {
MM.t += dt;
var place = mmWhere();
if (MM.ride && !place && !(typeof WLD !== "undefined" && WLD.on === "mmin"))
mmOff(true, "gone");
if (place !== MM.place) {
if (place)
mmPlaceBuild(place);
else
mmPlaceDrop();
MM.rowsAt = -99;
}
if (!place)
return;
if (MM.t - (MM.rowsAt || -99) > (MM.ride ? 30 : 15))
mmLoad(place);
if (MM.kgo)
mmKeeperGoTick(dt);
var b = mmBase();
if (!b)
return;
var want = {};
mmRowsHere(place).forEach(function (r) {
want[r.k] = r;
var I = MM.meshes[r.k];
if (!I)
I = MM.meshes[r.k] = mmMake(r.k);
var S = mmRowSpot(r);
I.x = S.x;
I.z = S.z;
I.y = S.y;
I.yaw = S.yaw;
var up = 0, R = MM.rising && MM.rising[r.k];
if (R !== undefined) {
R = MM.rising[r.k] = R + dt / 6;
if (R >= 1)
delete MM.rising[r.k];
else {
var e = 1 - Math.pow(1 - R, 3);
up = -((I.B.h || 10) + 1) * (1 - e);
}
}
I.g.position.set(b.x + S.x, S.y + up, b.z + S.z);
I.g.rotation.y = S.yaw;
I.g.visible = true;
if (I.B.anim) {
I.st.alt = 0;
I.st.turn = 0;
try {
I.B.anim(dt, 0, I.st);
}
catch (e) { }
}
});
Object.keys(MM.meshes).forEach(function (k) { if (!want[k] && !(MM.ride && MM.ride.k === k)) {
mmDrop(MM.meshes[k]);
delete MM.meshes[k];
} });
Object.keys(MM.lairs).forEach(function (k) { MM.lairs[k].traverse(function (o) { if (o.userData.mmFlow)
o.userData.mmFlow.offset.y = (o.userData.mmFlow.offset.y + dt * 0.35) % 1; }); });
if (MM.ride)
mmRideTick(dt);
if (MM.form || MM.morph)
mmFormTick(dt);
if (MM.vote && !MM.form && MM.t - (MM.voteChk || 0) > 3) {
MM.voteChk = MM.t;
mmUniteCheck();
}
mmHud();
}
function mmHere(dt) {
if (MM.ride || !MM.place || !walkMode)
return null;
var P = camera.position, L = mmL(), feet = P.y - 1.72;
var ck = Object.keys(MM.clues);
for (var i = 0; i < ck.length; i++) {
var C = MM.clues[ck[i]];
if (Math.hypot(L.x - C.x, L.z - C.z) < 3 && Math.abs(feet - C.y) < 3)
return { html: "📜 <b>Something lies here</b> · <b>press E</b> to look", fn: (function (d) { return function () { mmClueCard(d); }; })(C.d) };
}
var sk = Object.keys(MM.secrets || {});
for (var j = 0; j < sk.length; j++) {
var Q = MM.secrets[sk[j]];
if (mmSealed(sk[j]) && Math.hypot(L.x - Q.x, L.z - Q.z) < 1.8 && Math.abs(feet - Q.y) < 2.5)
return { html: "🔍 <b>" + mmEsc(MM_SECRET[Q.d.lair].what) + "</b> · <b>press E</b> to examine", fn: (function (d) { return function () { mmExamine(d); }; })(Q.d) };
}
var best = null, bd = 1e9;
Object.keys(MM.meshes).forEach(function (k) {
var I = MM.meshes[k];
if (MM.ride && MM.ride.k === k)
return;
var d = Math.hypot(L.x - I.x, L.z - I.z) - I.d.r;
if (d < 5 && d < bd) {
bd = d;
best = I;
}
});
if (!best || (MM.rising && MM.rising[best.k] !== undefined))
return null;
var d = best.d, r = MM.rows[d.k] || {}, mine = r.owner && r.owner === mmMe();
if (!r.owner)
return { html: "✨ <b>" + mmEsc(d.name) + "</b> · <b>press E</b>: only one exists, and the first to find it keeps it", fn: function () { mmMachineCard(d.k); } };
if (mine)
return { html: mmEsc(d.icon) + " <b>Your " + mmEsc(d.short) + "</b> · <b>press E</b> to climb in", fn: function () { mmMachineCard(d.k); } };
return { html: mmEsc(d.icon) + " <b>" + mmEsc(d.name) + "</b>, " + mmEsc(r.owner_name || "another dreamer") + "'s · <b>press E</b> to look", fn: function () { mmMachineCard(d.k); } };
}
function mmClueCard(d) { return __ZC(334, 39, this, arguments, new.target); }
function mmCluesSeen() { try {
return JSON.parse(localStorage.getItem("mm.clues") || "{}") || {};
}
catch (e) {
return {};
} }
function mmMachineCard(k) { return __ZC(334, 40, this, arguments, new.target); }
function mmClaim(k) { return __ZC(334, 41, this, arguments, new.target); }
function mmMount(k, quiet) { return __ZC(334, 42, this, arguments, new.target); }
function mmHideAround(I) { return __ZC(334, 43, this, arguments, new.target); }
function mmShowAround(I) { (I.hid || []).forEach(function (o) { o.visible = true; }); I.hid = []; }
function mmOff(force, why) { return __ZC(334, 44, this, arguments, new.target); }
function mmRideTick(dt) { return __ZC(334, 45, this, arguments, new.target); }
function mmArmed() { return typeof WLD !== "undefined" && WLD.on === "battle" && typeof bwShoot === "function" && !(typeof bwInTruce === "function" && bwInTruce()); }
function mmFire() { return __ZC(334, 46, this, arguments, new.target); }
var MM_POWER = 2;
function mmPower(d) { return Math.round(d.dmg * MM_POWER); }
function mmHurt(dmg) {
if (MM.form && MM.form.crewOf)
return true;
if (!MM.ride)
return false;
MM.shield -= dmg * 0.6;
if (MM.shield <= 0) {
MM.shield = 0;
if (MM.form)
mmSplit(true);
mmOff(true, "beaten");
}
return true;
}
function mmMuzzles(I) {
I.mz = [];
I.g.updateMatrixWorld(true);
(I.B.muzzles || []).forEach(function (p) {
var o = new THREE.Object3D(), host = I.B.turret || I.B.g;
var w = new THREE.Vector3(p[0], p[1], p[2]);
I.B.g.localToWorld(w);
host.worldToLocal(w);
o.position.copy(w);
host.add(o);
I.mz.push(o);
});
}
function mmHudCss() { return __ZC(334, 47, this, arguments, new.target); }
function mmPress(box) { return __ZC(334, 48, this, arguments, new.target); }
function mmHud() {
var R = MM.ride, crew = MM.form && MM.form.crewOf, on = !!R || !!crew;
if (!MM.hud) {
if (!on)
return;
mmHudCss();
var h = document.createElement("div");
h.id = "mm-hud";
document.body.appendChild(h);
MM.hud = h;
mmPress(h);
var p = document.createElement("div");
p.id = "mm-pad";
p.style.display = "none";
document.body.appendChild(p);
MM.pad = p;
mmPress(p);
}
if (!on) {
MM.hud.style.display = "none";
MM.pad.style.display = "none";
MM.hudKey = "";
return;
}
var touch = mmTouch(), vr = mmVR(), armed = mmArmed();
var btn = function (n, t, cls) { return "<span data-mm='" + n + "' role='button' class='mm-b" + (cls ? " " + cls : "") + "'>" + t + "</span>"; };
var chip = "<span class='mm-chip " + (armed ? "on" : "off") + "'>" + (armed ? "Guns ready" : "Guns locked") + "</span>";
MM.hud.classList.toggle("touch", touch);
if (crew) {
var SP = MM_SPECIAL[MM.form.k] || {}, st = mmSpecialState(MM.form.k), ck = "crew|" + armed + "|" + touch + "|" + st.say;
if (MM.hudKey !== ck) {
MM.hudKey = ck;
MM.hud.innerHTML = "<div class='mm-name'>⚜️ Mythic Sovereign" + chip + "</div><div style='opacity:.8;margin-top:6px'>Your station: " + mmEsc(SP.icon + " " + SP.name) + ". Blazehorn's pilot steers.</div>" +
"<div class='mm-sec'><div style='opacity:.8'>" + mmEsc(SP.does) + "</div><div class='mm-row'>" + btn("special", mmEsc(SP.icon + " " + SP.act), "wide gold") + "</div><div style='color:" + st.col + ";font-weight:700;margin-top:4px'>" + mmEsc(st.say) + "</div></div>" +
"<div class='mm-sec'><div class='mm-row'>" + btn("crewout", "Split off", "wide") + "</div></div>" +
(!touch && !vr ? "<div class='mm-sec mm-keys'><kbd>R</kbd><span>" + mmEsc(SP.act) + "</span>" + (armed ? "<kbd>F</kbd><span>Fire</span>" : "") + "<kbd>G</kbd><span>Split off</span></div>" : "");
MM.pad.innerHTML = touch ? btn("special", "<span>" + mmEsc(SP.icon) + "</span>" + mmEsc(SP.name.split(" ").pop()), "fire") + (armed ? btn("fire", "<span>🎯</span>Fire", "fire") : "") : "";
}
MM.hud.style.display = "block";
MM.pad.style.display = touch ? "flex" : "none";
return;
}
var d = R.d, sh = Math.max(0, Math.min(100, Math.round(MM.shield / mmHp(d) * 100))), alt = Math.round(R.I.st.alt);
var key = d.k + "|" + sh + "|" + alt + "|" + touch + "|" + vr + "|" + !!MM.form + "|" + armed + "|" + (MM.uniteN || 0) + "|" + (d.k === "sovereign" ? mmCrewAct("shield") + "" + mmCrewAct("dash") : "");
if (MM.hudKey === key) {
MM.hud.style.display = "block";
MM.pad.style.display = touch ? "flex" : "none";
return;
}
MM.hudKey = key;
var h = "<div class='mm-name'><span>" + mmEsc(d.icon) + "</span><span>" + mmEsc(d.short) + "</span>" + chip + "</div>";
h += "<div class='mm-gauges'><div><div class='mm-lab'>Shields</div><div class='mm-bar'><i style='width:" + sh + "%'></i></div></div><div class='mm-num'>" + sh + "%</div>";
if (d.fly)
h += "<div class='mm-lab'>Height</div><div class='mm-num'>" + alt + " m</div>";
h += "</div>";
if (MM.form && d.k === "sovereign") {
var sa = mmCrewAct("shield"), da = mmCrewAct("dash");
h += "<div class='mm-sec'><div class='mm-lab'>Your crew</div><div>" + (sa ? "<span class='mm-chip on'>🛡️ Shield up</span>" : "") + (da ? "<span class='mm-chip on'>💨 Charging</span>" : "") + (!sa && !da ? "<span style='opacity:.7'>You steer. Each station has its own control.</span>" : "") + "</div></div>";
}
h += "<div class='mm-sec'><div class='mm-row'>";
if (MM.form)
h += btn("split", "Split apart", "wide");
else {
h += btn("out", "🚪 Get out") + btn("card", "☰ More");
if (d.kind === "beast")
h += btn("unite", "⚜️ Unite", "wide gold");
}
h += "</div></div>";
if (!touch && !vr) {
h += "<div class='mm-sec mm-keys'><kbd>W A S D</kbd><span>Move</span><kbd>Mouse</kbd><span>Look and aim</span>";
if (d.fly)
h += "<kbd>Space / C</kbd><span>Up / down</span>";
if (armed)
h += "<kbd>F or click</kbd><span>Fire</span>";
h += "<kbd>G</kbd><span>" + (MM.form ? "Split apart" : "Get out") + "</span><kbd>E</kbd><span>More</span></div>";
}
MM.hud.innerHTML = h;
MM.hud.style.display = "block";
var pad = "";
if (touch) {
if (d.fly)
pad += "<div class='mm-col'>" + btn("up", "<span>⬆</span>Up") + btn("down", "<span>⬇</span>Down") + "</div>";
if (armed)
pad += btn("fire", "<span>🎯</span>Fire", "fire");
}
MM.pad.innerHTML = pad;
MM.pad.style.display = pad ? "flex" : "none";
}
function mmPilotCard() { return __ZC(334, 49, this, arguments, new.target); }
if (typeof addEventListener === "function") {
addEventListener("keydown", function (e) {
if (MM.form && MM.form.crewOf && !/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "")) {
if (e.code === "KeyF" || ((e.code === "KeyE" || e.code === "Enter") && mmArmed() && !(typeof WLD !== "undefined" && WLD.promptFn))) {
e.preventDefault();
e.stopImmediatePropagation();
mmCrewFire();
return;
}
if (e.code === "KeyG" && !e.repeat) {
e.preventDefault();
e.stopImmediatePropagation();
mmCrewLeave();
return;
}
if (e.code === "KeyR" && !e.repeat) {
e.preventDefault();
e.stopImmediatePropagation();
mmSpecial();
return;
}
return;
}
if (!MM.ride || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyF") {
e.preventDefault();
e.stopImmediatePropagation();
if (!e.repeat)
MM.firing = true;
mmFire();
return;
}
if (e.code === "KeyG" && !e.repeat) {
e.preventDefault();
e.stopImmediatePropagation();
if (MM.form)
mmSplit(false);
else
mmOff(false);
return;
}
if ((e.code === "KeyE" || e.code === "Enter") && !e.repeat) {
if (typeof WLD !== "undefined" && WLD.promptFn)
return;
e.preventDefault();
e.stopImmediatePropagation();
if (mmArmed()) {
mmFire();
return;
}
mmPilotCard();
}
}, true);
addEventListener("keyup", function (e) { if (e.code === "KeyF")
MM.firing = false; }, true);
addEventListener("mousedown", function (e) { if (MM.ride && mmArmed() && document.pointerLockElement && e.button === 0) {
e.stopImmediatePropagation();
MM.firing = true;
mmFire();
} }, true);
addEventListener("mouseup", function () { MM.firing = false; }, true);
}
function mmReleaseCard(k) { return __ZC(334, 50, this, arguments, new.target); }
function mmRelease(k) { return __ZC(334, 51, this, arguments, new.target); }
var MM_MORPH_T = 6.5;
var MM_RING = { blazehorn: [0, 0], frostfang: [18, 10], riddlecrown: [-18, 10], rosehorn: [24, -8], nightwyrm: [-24, -8], emberwing: [0, 22] };
var MM_STATION = { blazehorn: [0, 31.5, -1.4], frostfang: [3.4, 10, -1.2], riddlecrown: [-3.4, 10, -1.2], rosehorn: [8.6, 23, -1.4], nightwyrm: [-8.6, 23, -1.4], emberwing: [0, 27, 3.4] };
function mmSovFrame() { return __ZC(334, 52, this, arguments, new.target); }
function mmLimbM(L) {
var m = new THREE.Matrix4(), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(L.r[0] || 0, L.r[1] || 0, L.r[2] || 0)), s = Array.isArray(L.s) ? new THREE.Vector3(L.s[0], L.s[1], L.s[2]) : new THREE.Vector3(L.s || 1, L.s || 1, L.s || 1);
m.compose(new THREE.Vector3(L.p[0], L.p[1], L.p[2]), q, s);
return m;
}
function mmSovAssembled() { return __ZC(334, 53, this, arguments, new.target); }
function mmSovDriver(F, kits) { return __ZC(334, 54, this, arguments, new.target); }
function mmMorphStart(at, from, back, done) { return __ZC(334, 55, this, arguments, new.target); }
function mmSmooth(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
function mmMorphTick(dt) { return __ZC(334, 56, this, arguments, new.target); }
function mmMineAll() { var m = MM.mine || []; return MM_BEASTS.every(function (k) { return m.some(function (r) { return r.k === k; }); }); }
function mmUniteCard() { return __ZC(334, 57, this, arguments, new.target); }
function mmUniteSolo() { return __ZC(334, 58, this, arguments, new.target); }
function mmFormBegin(at, from, o) { return __ZC(334, 59, this, arguments, new.target); }
function mmFormTick(dt) { return __ZC(334, 60, this, arguments, new.target); }
function mmSplit(force) { return __ZC(334, 61, this, arguments, new.target); }
function mmUniteVote(on) { return __ZC(334, 62, this, arguments, new.target); }
function mmUniteCheck() {
if (!MM.rowsOk)
return;
var F = MM.form, R = MM.ride, k = F ? F.k : R ? R.k : "";
mmRpc("mythic_unite_state", { p_place: MM.place || "", p_key: k }).then(function (o) { mmUniteSeen(o); }).catch(function () { });
}
function mmUniteSeen(o) { return __ZC(334, 63, this, arguments, new.target); }
function mmCrewJoin(leader, name, k) { return __ZC(334, 64, this, arguments, new.target); }
function mmCrewTick(dt) { return __ZC(334, 65, this, arguments, new.target); }
function mmCrewLeave() { return __ZC(334, 66, this, arguments, new.target); }
function mmCrewFire() { return __ZC(334, 67, this, arguments, new.target); }
var MM_IN_BASE = -650000;
var MM_STYLE = {
widow: { wall: 0x8A6A44, wt: "wood", floor: 0x4A3828, ft: "wood", trim: 0xB8873A, glow: 0xFFC070, view: ["#C86A3A", "#5A2A1A"] },
kestrel: { wall: 0xB8B4AA, wt: "metal", floor: 0x55575A, ft: "metal", trim: 0x8A3A2A, glow: 0xE8F0FF, view: ["#020208", "#1A2440"] },
shrike: { wall: 0x4A5058, wt: "metal", floor: 0x2E3238, ft: "metal", trim: 0x6AC8FF, glow: 0xA8D8FF, view: ["#020208", "#0A1020"] },
domeship: { wall: 0xE8E0F0, wt: "plaster", floor: 0xC8C0D8, ft: "marble", trim: 0x8A5AD8, glow: 0xD8C0FF, view: ["#3A1A4A", "#C87AA8"] },
bulwark: { wall: 0x5A6448, wt: "metal", floor: 0x3A3E34, ft: "metal", trim: 0xB8A060, glow: 0xFFE0A0, view: ["#1A1612", "#3A2E22"] },
beast: { wall: 0x3A3A42, wt: "metal", floor: 0x2A2A30, ft: "metal", trim: 0xE8C060, glow: 0xFFE0B0, view: ["#2A3A5A", "#8AA8C8"] }
};
var MMI = { g: null, k: null, solids: [], spots: [], W: 0, L: 0, ret: null, near: null };
function mmGoInside(k, fromSeat) { return __ZC(334, 68, this, arguments, new.target); }
function mmInDrop() {
var W = WORLDS.mmin;
if (!W || !W.g)
return;
var G = W.g;
W.g = null;
scene.remove(G);
G.traverse(function (m) { if (m.geometry && m.geometry.dispose)
m.geometry.dispose(); });
}
function mmInLeave(toSeat) { return __ZC(334, 69, this, arguments, new.target); }
function mmInPlan(d) { return __ZC(334, 70, this, arguments, new.target); }
function mmInStyle(d) { return MM_STYLE[d.k] || (d.kind === "beast" ? MM_STYLE.beast : MM_STYLE.kestrel); }
function mmInMat(col, tx, o) { return __ZC(334, 71, this, arguments, new.target); }
function mmBox(P, w, h, d, mat, x, y, z, ry) { var m = mmMesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, P); if (ry)
m.rotation.y = ry; return m; }
function mmFurn(P, name, x, y, z, ry, s) {
if (typeof FURN === "undefined" || typeof FURN[name] !== "function")
return null;
var g;
try {
g = FURN[name]();
}
catch (e) {
return null;
}
if (!g)
return null;
g.position.set(x, y || 0, z);
g.rotation.y = ry || 0;
if (s)
g.scale.setScalar(s);
P.add(g);
return g;
}
function mmInBuild(G) { return __ZC(334, 72, this, arguments, new.target); }
function mmInFurnish(G, d, r, S, cx, cz, w, dd, H) { return __ZC(334, 73, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef("mmin", {
base: MM_IN_BASE, far: 600, ownSky: true, tone: 300,
env: function () { return { top: 0x2A2622, low: 0x3A342E, fog: 0x1A1814, fogD: 0.012, sun: 0.32, sunCol: 0xFFF0DC, sunDir: [0.3, 0.8, 0.2], hemi: 1.0, hemiCol: 0xFFF0DC, hemiGround: 0x5A4A3A, stars: 0 }; },
build: function (G) { mmInBuild(G); },
enter: function () { return __ZC(334, 74, this, arguments, new.target); },
leave: function () { worldPrompt(null); MMI.near = null; },
ground: function () { return 0; },
block: function (x, z, feet) { var pl = MMI.plan; if (!pl)
return false; if (x < -pl.W / 2 + 0.3 || x > pl.W / 2 - 0.3 || z < pl.z0 + 0.3 || z > pl.z1 - 0.3)
return true; return worldSolidAt(MMI.solids, x, z, feet); },
tick: function (dt) { return __ZC(334, 75, this, arguments, new.target); },
back: function () { mmInLeave(false); }
});
var ASH_IN = { anim: [], holo: null, walkers: [] };
var mmInBuildBase = mmInBuild;
mmInBuild = function (G) { if (MMI.k === "domeship")
return ashInBuild(G); return mmInBuildBase(G); };
function ashStars(w, h, planet) { return __ZC(334, 76, this, arguments, new.target); }
function ashInBuild(G) { return __ZC(334, 77, this, arguments, new.target); }
function ashTechAndGarden(G, o) { return __ZC(334, 78, this, arguments, new.target); }
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.mmin)
return;
var W = WORLDS.mmin, tick0 = W.tick, enter0 = W.enter, env0 = W.env;
W.env = function () { if (MMI.k === "domeship")
return { top: 0x2A2440, low: 0x3A3050, fog: 0x1A1428, fogD: 0.006, sun: 0.3, sunCol: 0xFFF4FF, sunDir: [0.3, 0.8, 0.2], hemi: 0.8, hemiCol: 0xF4ECFF, hemiGround: 0x6A5A7A, stars: 0 }; return env0.apply(this, arguments); };
W.enter = function () { var r = enter0.apply(this, arguments); if (MMI.k === "domeship" && MMI.plan) {
camera.position.set(MM_IN_BASE, 1.72, MMI.plan.z1 - 3.6);
yaw = 0;
pitch = 0;
} return r; };
W.tick = function (dt) {
var r = tick0.apply(this, arguments);
if (MMI.k === "domeship") {
if (ASH_IN.tickMore)
try {
ASH_IN.tickMore(dt);
}
catch (e) { }
var H = ASH_IN.holo;
if (H) {
H.g.rotation.y += dt * 0.12;
H.ship.rotation.y -= dt * 0.3;
H.pls.forEach(function (p) { p.a += dt * p.s; p.m.position.set(Math.cos(p.a) * p.r, 0, Math.sin(p.a) * p.r); });
}
if (ASH_IN.motes) {
ASH_IN.motes.rotation.y += dt * 0.02;
ASH_IN.motes.position.y = Math.sin(Date.now() * 0.0003) * 0.2;
}
ASH_IN.walkers.forEach(function (w) { w.t += dt * w.sp; var u = (Math.sin(w.t) + 1) / 2, z = w.z0 + (w.z1 - w.z0) * u; w.g.position.z = z; w.g.rotation.y = Math.cos(w.t) > 0 ? Math.PI : 0; w.g.position.y = Math.sin(w.t * 9) * 0.02; });
}
return r;
};
})();
function ashChart(w, h) { return __ZC(334, 79, this, arguments, new.target); }
function ashBridgeMore(G, o) { return __ZC(334, 80, this, arguments, new.target); }
function ashPitBuild() { return __ZC(334, 81, this, arguments, new.target); }
function ashTrees(G, list, lite, seed) { return __ZC(334, 82, this, arguments, new.target); }
function mmLoad(place) {
MM.rowsAt = MM.t;
if (!mmSigned()) {
MM.rowsOk = false;
return;
}
mmRpc("mythic_list", { p_place: place }).then(function (o) {
if (!o || o.ok === false || MM.place !== place)
return;
var rows = {};
(o.rows || []).forEach(function (r) { rows[r.k] = r; });
if (MM.ride && MM.rows[MM.ride.k])
rows[MM.ride.k] = MM.rows[MM.ride.k];
MM.rows = rows;
MM.rowsOk = true;
MM.missing = false;
}).catch(function (e) { if (mmMissing(e)) {
MM.missing = true;
MM.rowsOk = false;
} });
if (MM.t - (MM.mineAt || -99) > 60)
mmMineLoad();
}
function mmMineLoad() {
MM.mineAt = MM.t;
if (!mmSigned())
return Promise.resolve([]);
return mmRpc("mythic_mine", {}).then(function (o) { MM.mine = (o && o.rows) || []; return MM.mine; }).catch(function () { return MM.mine || []; });
}
function mmPub() {
var k = MM.form && MM.form.crewOf ? "crew" : MM.ride ? MM.ride.k : "";
if (k === MM.pub)
return;
MM.pub = k;
if (typeof publishMyLook === "function")
try {
publishMyLook();
}
catch (e) { }
}
function mmKeeperReset(k) {
if (!mmKeeper())
return;
mmRpc("keeper_mythic_reset", { p_key: k }).then(function (o) { mmSay(mmEsc((o && o.say) || "Done.")); MM.rows = {}; MM.rowsAt = -99; }).catch(function (e) { mmSay(mmMissing(e) ? "The Keeper's machine controls aren't open yet (an update to run)." : "Couldn't reach the city."); });
}
function mmKeeperHere(k) { return __ZC(334, 83, this, arguments, new.target); }
function mmCallHere(k) { return __ZC(334, 84, this, arguments, new.target); }
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
mmTick(dt);
}
catch (e) {
if (window.console && !MM.warnT) {
MM.warnT = 1;
console.warn("[mythic]", e);
}
} };
}
if (typeof dkHere === "function") {
var dh = dkHere;
dkHere = function (dt) { var b = dh.apply(this, arguments); if (b)
return b; try {
return mmHere(dt);
}
catch (e) {
return null;
} };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
try {
if (MM.place && !store.inside) {
var b = mmBase();
if (b) {
var lx = x - b.x, lz = z - b.z;
if (MM.sol.length && worldSolidAt(MM.sol, lx, lz, feet))
return true;
for (var k in MM.meshes) {
var I = MM.meshes[k];
if (MM.ride && MM.ride.I === I)
continue;
if (k === "sovereign")
continue;
var rr = I.d.r * 0.62, dx = lx - I.x, dz = lz - I.z;
if (dx * dx + dz * dz < rr * rr && feet < I.y + I.B.h)
return true;
}
}
}
}
catch (e) { }
return ba.apply(this, arguments);
};
}
if (typeof rideSeatNow === "function") {
var rs = rideSeatNow;
rideSeatNow = function () { if (MM.ride && walkMode && !store.inside)
return MM.ride.d.eye - 1.72 + (MM.ride.alt || 0); return rs.apply(this, arguments); };
}
if (typeof fallEligible === "function") {
var fe = fallEligible;
fallEligible = function () { if (MM.ride || MM.form || MM.morph)
return false; return fe.apply(this, arguments); };
}
if (typeof bwHurtMe === "function") {
var bh = bwHurtMe;
bwHurtMe = function (dmg, src, raw) { try {
if (!raw && WLD.on === "battle" && !BW.downT && !(typeof bwInTruce === "function" && bwInTruce()) && mmHurt(dmg))
return;
}
catch (e) { } return bh.apply(this, arguments); };
}
if (typeof meLook === "function") {
var ml = meLook;
meLook = function () { var L = ml.apply(this, arguments); try {
if (L) {
var k = MM.form && MM.form.crewOf ? "crew" : MM.ride ? MM.ride.k : "";
if (k)
L.mm = k;
else
delete L.mm;
}
}
catch (e) { } return L; };
}
if (typeof presenceGroupFor === "function") {
var pg = presenceGroupFor;
presenceGroupFor = function (row) { var g = pg.apply(this, arguments); try {
mmPresenceDress(g, row);
}
catch (e) {
if (window.console)
console.warn("[mythic] presence", e);
} return g; };
}
if (typeof placeToWorld === "function") {
var pw = placeToWorld;
placeToWorld = function (row) {
var w = pw.apply(this, arguments);
try {
var k = w && row && row.look && row.look.mm, d = k && (k === "sovereign" ? MM_SOV : MM.list[k]);
if (d && /^world:/.test(row.place || "")) {
var lv = row.level || 0;
w.y = Math.max(w.y, lv - d.eye + 1.72);
}
}
catch (e) { }
return w;
};
}
if (typeof seaBuild === "function") {
var sb = seaBuild;
seaBuild = function (G) { var r = sb.apply(this, arguments); try {
if (SEA.isles.indexOf(MM_ISLE) < 0) {
SEA.isles.push(MM_ISLE);
seaIsland(G, MM_ISLE);
}
}
catch (e) {
if (window.console)
console.warn("[mythic] isle", e);
} return r; };
}
})();
function mmPresenceDress(g, row) { return __ZC(334, 85, this, arguments, new.target); }
if (typeof bkpHtml === "function") {
var mmBkpHtml0 = bkpHtml;
bkpHtml = function () {
var h = mmBkpHtml0.apply(this, arguments);
try {
return h + mmBkpSection();
}
catch (e) {
return h;
}
};
}
if (typeof bkpLoad === "function") {
var mmBkpLoad0 = bkpLoad;
bkpLoad = function () { var p = mmBkpLoad0.apply(this, arguments); mmMineLoad().then(function () { if (mmKeeper())
return mmKeeperList(); }).then(function () { if (typeof bkpPaint === "function")
bkpPaint(); }); return p; };
}
function mmBkpSection() { return __ZC(334, 86, this, arguments, new.target); }
function mmAbout(k) { return __ZC(334, 87, this, arguments, new.target); }
function mmKeeperList() {
return mmRpc("keeper_mythic_list", {}).then(function (o) { MM.klist = (o && o.rows) || null; return MM.klist; }).catch(function () { MM.klist = null; });
}
function mmKeeperGo(k) { return __ZC(334, 88, this, arguments, new.target); }
function mmKeeperGoTick(dt) { return __ZC(334, 89, this, arguments, new.target); }
(function () {
var q = null;
try {
q = new URLSearchParams(location.search);
}
catch (e) {
return;
}
var v = q.get("kmm");
if (!v)
return;
var kind = v.split(":")[0], k = v.slice(kind.length + 1), tries = 0;
function clean() { try {
q.delete("kmm");
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
if (typeof walkMode === "undefined" || !walkMode || !mmSigned() || !MM.list[k])
return;
if (typeof store === "undefined" || !store || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
if (!mmKeeper()) {
if (tries > 60) {
clearInterval(t);
clean();
mmSay("That link is for the Keeper.");
}
return;
}
clearInterval(t);
clean();
if (kind === "go") {
mmKeeperList().then(function () { mmKeeperGo(k); });
}
else if (kind === "move") {
MM.kmove = k;
mmSay("<b>Moving " + mmEsc(MM.list[k].name) + ".</b> Go where you want it (outdoors), then open the Backpack and press <b>Here</b> beside it.");
mmKeeperList();
}
}, 500);
})();
var MM_PIT = {
widow: { win: "ports", frame: 0x8A6A32, panel: 0x3A2618, trim: 0xC8A050, css: "#F0C870", wood: true },
kestrel: { win: "bubble", frame: 0xB8B4AC, panel: 0x24262C, trim: 0x8AD0FF, css: "#9EDCFF" },
shrike: { win: "canopy", frame: 0x4A505A, panel: 0x1A1C22, trim: 0x9AFF8A, css: "#B8FF9E" },
domeship: { win: "bubble", frame: 0xD8D0E4, panel: 0x2A2434, trim: 0xC8A8FF, css: "#D8C0FF", pearl: true },
bulwark: { win: "slit", frame: 0x3E4832, panel: 0x22261C, trim: 0xE8B048, css: "#F0C060" },
rosehorn: { win: "eyes", frame: 0xC87AA8, panel: 0x3A2232, trim: 0xFFB8E8, css: "#FFC8EC", tint: 0xF29AC8 },
nightwyrm: { win: "eyes", frame: 0x2A2830, panel: 0x141218, trim: 0xA070FF, css: "#C0A0FF", tint: 0x8A5AD8 },
emberwing: { win: "eyes", frame: 0x8A2A22, panel: 0x2A1210, trim: 0xF2B23A, css: "#FFC860", tint: 0xD8342A },
frostfang: { win: "eyes", frame: 0x2E5A9A, panel: 0x14202E, trim: 0x9AD0FF, css: "#B8E0FF", tint: 0x2E6AC8 },
riddlecrown: { win: "eyes", frame: 0x5A2E8A, panel: 0x1E1428, trim: 0xE8C060, css: "#F0D080", tint: 0x7A3AB8 },
blazehorn: { win: "eyes", frame: 0xA85A1A, panel: 0x2A1A10, trim: 0xFFB060, css: "#FFC080", tint: 0xE07A22 },
sovereign: { win: "bridge", frame: 0x6A5A3A, panel: 0x1A1612, trim: 0xE8C060, css: "#F0D080" }
};
function mmPitWall(g, w, y0, y1, z, holes, mat) { return __ZC(334, 90, this, arguments, new.target); }
function mmPitGlass(g, holes, z, tint) { return __ZC(334, 91, this, arguments, new.target); }
function mmPitBuild(k) {
return function (ctx) {
var P = MM_PIT[k], lite = vcpLite(), g = new THREE.Group(), U = { hideRide: false, style: "mm:" + k };
g.userData.vcp = U;
var mFrame = vcpMat(P.frame, { r: 0.4, m: P.pearl ? 0.2 : 0.7, lit: 0.08, side: THREE.DoubleSide }), mPanel = P.wood ? vcpMat(P.panel, { map: vcpGrain("wood"), r: 0.7, lit: 0.2 }) : vcpMat(P.panel, { r: 0.55, m: 0.35, lit: 0.14 }), mTrim = vcpGlow(new THREE.Color(P.trim).multiplyScalar(0.6)), mDark = vcpMat(0x101216, { r: 0.5, lit: 0.15 });
var holes = [], wz = -0.6;
if (P.win === "ports") {
holes = [{ x: -0.64, y: 0.12, r: 0.26 }, { x: 0, y: 0.12, r: 0.34 }, { x: 0.64, y: 0.12, r: 0.26 }];
mmPitWall(g, 2.0, -0.42, 0.62, wz, holes, mFrame);
mmPitGlass(g, holes, wz, 0xF0D8A0);
holes.forEach(function (h) {
var t = new THREE.Mesh(new THREE.TorusGeometry(h.r, 0.03, 8, lite ? 16 : 28), vcpMat(0xB8873A, { r: 0.3, m: 0.8, lit: 0.2 }));
t.position.set(h.x, h.y, wz + 0.02);
g.add(t);
if (!lite)
for (var b = 0; b < 8; b++) {
var a = b / 8 * Math.PI * 2;
vcpCyl(g, 0.012, 0.012, 0.02, mTrim, h.x + Math.cos(a) * (h.r + 0.05), h.y + Math.sin(a) * (h.r + 0.05), wz + 0.03, Math.PI / 2, 0, 0, 6);
}
});
}
else if (P.win === "slit") {
holes = [{ x: 0, y: 0.05, w: 1.5, h: 0.3, c: 0.08 }];
mmPitWall(g, 2.0, -0.42, 0.6, wz, holes, mFrame);
mmPitGlass(g, holes, wz, 0xC8D8A0);
vcpBox(g, 0.16, 0.3, 0.14, mDark, 0.42, 0.3, -0.55);
vcpBox(g, 0.2, 0.08, 0.06, mDark, 0.42, 0.16, -0.5);
vcpBox(g, 0.14, 0.012, 0.012, mTrim, 0.42, 0.12, -0.47);
}
else if (P.win === "eyes") {
holes = [{ x: 0, y: 0.1, w: 1.72, h: 0.64, c: 0.16 }];
mmPitWall(g, 2.0, -0.42, 0.64, wz, holes, mFrame);
mmPitGlass(g, holes, wz, P.tint);
vcpBox(g, 1.8, 0.05, 0.14, mFrame, 0, 0.45, wz + 0.06);
vcpBox(g, 1.72, 0.006, 0.006, mTrim, 0, 0.43, wz + 0.13);
}
else if (P.win === "bridge") {
holes = [{ x: -0.7, y: 0.08, w: 0.58, h: 0.5, c: 0.06 }, { x: 0, y: 0.12, w: 0.7, h: 0.58, c: 0.06 }, { x: 0.7, y: 0.08, w: 0.58, h: 0.5, c: 0.06 }];
mmPitWall(g, 2.4, -0.42, 0.66, wz - 0.1, holes, mFrame);
mmPitGlass(g, holes, wz - 0.1, 0xF0E0B0);
holes.forEach(function (h) { vcpBox(g, h.w + 0.04, 0.02, 0.02, mTrim, h.x, h.y + h.h / 2 + 0.02, wz - 0.08); vcpBox(g, h.w + 0.04, 0.02, 0.02, mTrim, h.x, h.y - h.h / 2 - 0.02, wz - 0.08); });
var seal = vcpCanvas(256, 128), sx = seal.x;
sx.fillStyle = "#1A1612";
sx.fillRect(0, 0, 256, 128);
sx.fillStyle = "#E8C060";
sx.textAlign = "center";
sx.textBaseline = "middle";
sx.font = "600 34px Georgia,serif";
sx.fillText("⚜ SOVEREIGN ⚜", 128, 64);
seal.t.needsUpdate = true;
vcpFace(g, seal, 0.5, 0.25, 0, 0.5, wz - 0.08, 0, 0);
}
else {
var N = P.win === "bubble" ? 7 : 3, R = P.win === "bubble" ? 1.05 : 0.9;
for (var i = 0; i <= N; i++) {
var a = -1.3 + 2.6 * i / N, bx = Math.sin(a) * R, bz = -Math.cos(a) * R;
vcpBeam(g, [bx, -0.36, bz], [bx * 0.45, P.win === "bubble" ? 0.62 : 0.46, bz * 0.45 - (P.win === "bubble" ? 0 : 0.2)], 0.026, 0.026, mFrame);
if (i < N) {
var a2 = -1.3 + 2.6 * (i + 1) / N;
vcpBeam(g, [bx, -0.36, bz], [Math.sin(a2) * R, -0.36, -Math.cos(a2) * R], 0.04, 0.04, mFrame);
}
}
if (P.win === "bubble")
vcpBeam(g, [-0.5, 0.6, -0.35], [0.5, 0.6, -0.35], 0.03, 0.03, mFrame);
else {
vcpBeam(g, [0, 0.46, -0.6], [0, 0.5, 0.5], 0.03, 0.03, mFrame);
}
if (!lite) {
var gm = new THREE.MeshBasicMaterial({ color: P.pearl ? 0xF0E8FF : 0xA8C8E0, transparent: true, opacity: 0.06, depthWrite: false, side: THREE.DoubleSide });
var dome = new THREE.Mesh(new THREE.SphereGeometry(R * 1.02, 24, 12, Math.PI * 0.5 - 1.3, 2.6, 0, Math.PI * 0.62), gm);
dome.rotation.y = Math.PI;
dome.position.y = -0.36;
dome.scale.y = 1.1;
g.add(dome);
}
}
if (P.win !== "bubble" && P.win !== "canopy") {
[-1, 1].forEach(function (s) { vcpBox(g, 0.04, 1.08, 1.6, mFrame, s * (P.win === "bridge" ? 1.2 : 1.0), 0.1, -0.2); });
vcpBox(g, P.win === "bridge" ? 2.44 : 2.04, 0.04, 1.6, vcpMat(P.panel, { r: 0.8, lit: 0.2 }), 0, 0.66, -0.2);
}
var dash = new THREE.Group();
dash.position.set(0, 0.16, 0.04);
g.add(dash);
var g0 = g;
g = dash;
vcpProfile(g, [[0.95, -0.37], [0.6, -0.39], [0.5, -0.46], [0.5, -1.1], [0.95, -1.1]], P.win === "bridge" ? -1.1 : -0.85, P.win === "bridge" ? 1.1 : 0.85, mPanel);
vcpBox(g, P.win === "bridge" ? 1.8 : 1.4, 0.004, 0.006, mTrim, 0, -0.386, -0.6);
U.left = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
U.right = vcpCanvas(lite ? 256 : 512, lite ? 128 : 256);
U.cluster = vcpCanvas(lite ? 384 : 768, lite ? 128 : 256);
vcpFace(g, U.left, 0.26, 0.13, -0.29, -0.36, -0.5, -0.6, 0.22);
vcpFace(g, U.right, 0.26, 0.13, 0.29, -0.36, -0.5, -0.6, -0.22);
vcpFace(g, U.cluster, 0.28, 0.093, 0, -0.355, -0.475, -0.6);
var plate = vcpCanvas(512, 64), px = plate.x, d = k === "sovereign" ? MM_SOV : MM.list[k];
px.fillStyle = "#0A0A0E";
px.fillRect(0, 0, 512, 64);
px.fillStyle = P.css;
px.textAlign = "center";
px.textBaseline = "middle";
px.font = "600 30px Georgia,serif";
px.fillText(String(d.name).toUpperCase(), 256, 33);
plate.t.needsUpdate = true;
vcpFace(g, plate, 0.36, 0.045, 0, -0.43, -0.462, -0.6);
if (!lite)
for (var q = 0; q < 6; q++) {
var sx2 = (q < 3 ? -1 : 1) * (0.24 + (q % 3) * 0.045);
vcpBox(g, 0.018, 0.01, 0.03, q % 2 ? mTrim : mDark, sx2, -0.47, -0.5);
}
g = g0;
var sticks = new THREE.Group();
g.add(sticks);
U.wheel = sticks;
[-0.34, 0.34].forEach(function (x) {
vcpBox(g, 0.14, 0.06, 0.4, mPanel, x, -0.68, -0.12);
vcpBeam(sticks, [x, -0.65, -0.25], [x, -0.52, -0.27], 0.03, 0.03, mFrame, true);
var top = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), mDark);
top.scale.set(1, 1.4, 1);
top.position.set(x, -0.5, -0.27);
sticks.add(top);
vcpBox(sticks, 0.012, 0.012, 0.012, mTrim, x, -0.47, -0.28);
});
U.paint = function (R) {
vcpPaintMech(U.left, R, "left", P.css);
vcpPaintMech(U.right, R, "right", P.css);
vcpPaintFlight(U.cluster, { mph: R.mph || 0, vmaxMph: 60, alt: R.alt || 0, climb: (MM.ride && MM.ride.vz) || 0 }, { bezel: P.css, needle: P.css });
};
U.tick = function (dt) { U.wheel.rotation.z = -(VCP.turnRate || 0) * 0.08; };
return g;
};
}
(function () {
var n = 0, t = setInterval(function () {
if (++n > 240) {
clearInterval(t);
return;
}
if (typeof vcpRegister !== "function" || typeof vcpPaintMech !== "function")
return;
clearInterval(t);
Object.keys(MM_PIT).forEach(function (k) { if (k !== "sovereign")
vcpRegister("mm:" + k, (k === "domeship" && typeof ashPitBuild === "function") ? ashPitBuild() : mmPitBuild(k), null); });
vcpRegister("mm:sovereign", function () { return mmBridgeBuild("blazehorn"); }, null);
}, 500);
})();
var MM_SEAT = { blazehorn: [0, 0, 0], rosehorn: [1.35, 0, 0.75], nightwyrm: [-1.35, 0, 0.75], frostfang: [0.85, 0.3, 1.75], riddlecrown: [-0.85, 0.3, 1.75], emberwing: [0, 0.7, 2.6] };
var MM_SPECIAL = {
blazehorn: { icon: "🐂", name: "Pilot", act: "Fire the artillery", does: "Steers the Sovereign. Every other station follows where you go." },
rosehorn: { icon: "⚔️", name: "Great Sword", act: "Swing the sword", kind: "sword", cd: 1.5, does: "A heavy blow from the right arm, close in." },
nightwyrm: { icon: "🛡️", name: "Dragon Shield", act: "Raise the shield", kind: "shield", cd: 12, dur: 8, does: "For eight seconds the Sovereign takes about a third of the harm." },
emberwing: { icon: "☄️", name: "Wings and Artillery", act: "Fire a volley", kind: "volley", cd: 3, does: "Three shells at once from the shoulders." },
frostfang: { icon: "💨", name: "Right Leg", act: "Charge", kind: "dash", cd: 10, dur: 6, does: "For six seconds the Sovereign strides far faster." },
riddlecrown: { icon: "💥", name: "Left Leg", act: "Stomp", kind: "stomp", cd: 3, does: "A great stamp that shakes the ground ahead." }
};
function mmBridgeBuild(viewK) { return __ZC(334, 92, this, arguments, new.target); }
function mmBridgePaint(cv, k) { return __ZC(334, 93, this, arguments, new.target); }
MM.cd = {};
MM.looks = {};
function mmSpecialState(k) { return __ZC(334, 94, this, arguments, new.target); }
function mmSpecial() { return __ZC(334, 95, this, arguments, new.target); }
function mmCrewAct(a) {
for (var id in MM.looks) {
var v = MM.looks[id];
if (MM.t - v.t < 10 && v.look && v.look.mm === "crew" && v.look.mmAct === a)
return true;
}
return false;
}
(function () {
if (typeof placeToWorld === "function") {
var pw2 = placeToWorld;
placeToWorld = function (row) { try {
if (row && row.user_id && row.look && row.look.mm)
MM.looks[row.user_id] = { look: row.look, t: MM.t };
}
catch (e) { } return pw2.apply(this, arguments); };
}
if (typeof meLook === "function") {
var ml2 = meLook;
meLook = function () { var L = ml2.apply(this, arguments); try {
if (L) {
if (MM.act && MM.act.until > MM.t && MM.form && MM.form.crewOf)
L.mmAct = MM.act.k;
else
delete L.mmAct;
}
}
catch (e) { } return L; };
}
var rt = mmRideTick;
mmRideTick = function (dt) { if (MM.ride && MM.ride.k === "sovereign")
rideSpeed = MM_SOV.spd * (mmCrewAct("dash") ? 1.7 : 1); return rt.apply(this, arguments); };
var mh = mmHurt;
mmHurt = function (dmg) { if (MM.form && MM.form.lead && mmCrewAct("shield"))
dmg *= 0.35; return mh.call(this, dmg); };
var mp = mmPub;
mmPub = function () { var a = MM.act && MM.act.until > MM.t ? MM.act.k : ""; if (a !== MM.pubAct) {
MM.pubAct = a;
MM.pub = null;
} return mp.apply(this, arguments); };
})();
function mmBridgeCrew(dt, leaderG) { return __ZC(334, 96, this, arguments, new.target); }
function mmBridgeCrewDrop() {
if (MM.crewHide) {
mmShowAround(MM.crewHide);
MM.crewHide = null;
}
var G = MM.crewPit;
if (!G)
return;
if (G.parent)
G.parent.remove(G);
G.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); });
MM.crewPit = null;
}
var MP_POW = {
widow: [{ i: "🕸️", n: "Steam Web", k: "beam", p: "sdisc", dur: 1.2, m: 0.5, slow: 3, t: "A spray of steam webbing that slows whatever it strikes." },
{ i: "🚀", n: "Brass Missile Swarm", k: "missiles", p: "rocket", num: 8, m: 0.9, cd: 14, t: "Eight brass missiles that seek the nearest foe." },
{ i: "♨️", n: "Scalding Vents", k: "shield", dur: 8, mul: 0.45, col: 0xE8E0D0, aura: { r: 9, m: 0.25 }, cd: 20, t: "Steam all round: half the harm, and anyone close is scalded." }],
kestrel: [{ i: "🔆", n: "Strafing Run", k: "beam", p: "laser", dur: 2.2, m: 0.45, cd: 9, t: "A long stream of laser fire." },
{ i: "🚀", n: "Seeker Pods", k: "missiles", p: "rocket", num: 6, m: 1.1, cd: 12, t: "Six missiles that hunt the nearest foe." },
{ i: "🔥", n: "Afterburners", k: "boost", mul: 2.2, dur: 6, cd: 16, t: "Twice the speed for six seconds." }],
shrike: [{ i: "⚡", n: "Plasma Lance", k: "lance", p: "rail", m: 4, pierce: 4, splash: 3, cd: 7, t: "One white-hot bolt that goes through everything in a line." },
{ i: "💣", n: "Cluster Bombs", k: "barrage", p: "shell", num: 10, r: 9, m: 0.9, splash: 4, cd: 14, t: "Ten bombs fall on where you aim." },
{ i: "🌫️", n: "Chaff Cloak", k: "cloak", dur: 8, mul: 0.5, cd: 20, t: "Foes lose sight of you until you fire." }],
domeship: [{ i: "🌩️", n: "Ion Storm", k: "chain", p: "ion", num: 3, m: 1.2, chain: 5, cd: 10, t: "Lightning that leaps from foe to foe." },
{ i: "🫧", n: "Pearl Barrier", k: "shield", dur: 10, mul: 0.3, col: 0xE8E0F0, cd: 22, t: "A pearl dome that takes most of the harm." },
{ i: "🌀", n: "Tractor Pulse", k: "nova", r: 22, m: 1.2, knock: 6, slow: 3, col: 0xC8A8FF, cd: 12, t: "A wave that hurls foes back and slows them." }],
bulwark: [{ i: "💥", n: "Siege Shell", k: "lance", p: "shell", m: 5, splash: 9, spd: 90, cd: 8, t: "One enormous shell with a huge blast." },
{ i: "🎯", n: "Mortar Barrage", k: "barrage", p: "shell", num: 12, r: 12, m: 1, splash: 5, cd: 16, t: "Twelve mortar shells rain on where you aim." },
{ i: "🧱", n: "Iron Wall", k: "shield", dur: 9, mul: 0.25, col: 0xB8B8A8, cd: 22, t: "Armour plates lock down: only a quarter of the harm gets through." }],
rosehorn: [{ i: "🌈", n: "Prism Beam", k: "beam", p: "arcane", dur: 2.5, m: 0.6, splash: 2, cd: 9, t: "A shining beam from the horn." },
{ i: "🦄", n: "Rainbow Charge", k: "boost", mul: 2.4, dur: 5, ram: { r: 12, m: 2, knock: 5 }, cd: 14, t: "A charging burst of speed that bowls over foes beside you." },
{ i: "💖", n: "Healing Light", k: "mend", pct: 0.4, cd: 30, t: "Mends four tenths of your shields." }],
nightwyrm: [{ i: "🐉", n: "Shadowfire Breath", k: "beam", p: "orb", dur: 2.4, m: 0.6, splash: 3, fan: 0.12, cd: 10, t: "A rolling cone of shadow flame." },
{ i: "🌪️", n: "Wing Gale", k: "nova", r: 20, m: 1.4, knock: 9, col: 0x8A5AD8, cd: 12, t: "Great wingbeats that knock foes flying." },
{ i: "🌑", n: "Night Veil", k: "cloak", dur: 9, mul: 0.4, cd: 22, t: "Darkness wraps you: foes lose sight of you until you strike." }],
emberwing: [{ i: "🔥", n: "Fire Shield", k: "shield", dur: 10, mul: 0.35, col: 0xF29A3A, aura: { r: 12, m: 0.45, burn: 1 }, cd: 20, t: "Wings of flame wrap you: most harm is turned aside and anyone close burns." },
{ i: "☄️", n: "Phoenix Missiles", k: "missiles", p: "fire", num: 8, m: 1.1, splash: 4, cd: 12, t: "Eight fire missiles that seek the nearest foe." },
{ i: "🌅", n: "Rebirth Flame", k: "mend", pct: 0.6, cd: 45, t: "Rises from its own fire: six tenths of your shields back." }],
frostfang: [{ i: "❄️", n: "Frost Howl", k: "nova", r: 20, m: 1.2, slow: 5, col: 0xBFE4F4, cd: 11, t: "A howl that freezes foes around you and slows them." },
{ i: "🧊", n: "Ice Spears", k: "missiles", p: "frost", num: 6, m: 1.1, slow: 3, cd: 10, t: "Six ice spears that seek foes and slow them." },
{ i: "🐺", n: "Pack Sprint", k: "boost", mul: 2.3, dur: 7, cd: 15, t: "A loping sprint, more than twice as fast." }],
riddlecrown: [{ i: "🔮", n: "Riddle of Ruin", k: "chain", p: "arcane", num: 3, m: 1.2, chain: 5, cd: 10, t: "A riddle no foe can answer: arcane bolts leap foe to foe." },
{ i: "🏜️", n: "Sandstorm", k: "cloak", dur: 8, mul: 0.5, aura: { r: 10, m: 0.2 }, cd: 20, t: "A storm of sand hides you and scours anyone close." },
{ i: "👁️", n: "Gaze of Stone", k: "lance", p: "rail", m: 4, pierce: 3, slow: 6, cd: 9, t: "A stare that pierces a line of foes and turns them sluggish as stone." }],
blazehorn: [{ i: "🌋", n: "Earthshaker", k: "nova", r: 24, m: 1.8, knock: 6, col: 0xE07A22, cd: 12, t: "Stamps the ground: everything around takes a heavy blow." },
{ i: "🐂", n: "Horn Charge", k: "boost", mul: 2.4, dur: 5, ram: { r: 12, m: 2.2, knock: 8 }, cd: 14, t: "Head down and charge: foes beside you are tossed aside." },
{ i: "🪓", n: "Molten Axe", k: "lance", p: "fire", m: 4.5, splash: 8, spd: 70, cd: 8, t: "Hurls a molten axe that bursts where it lands." }],
sovereign: [{ i: "⚔️", n: "Sovereign Blade", k: "nova", r: 30, m: 2.4, knock: 10, col: 0xE8C060, cd: 10, t: "The great sword sweeps all round the giant." },
{ i: "🌠", n: "Starfall", k: "barrage", p: "star2", num: 16, r: 14, m: 1.1, splash: 6, cd: 16, t: "Sixteen falling stars on where you aim." },
{ i: "🛡️", n: "Aegis of Six", k: "shield", dur: 12, mul: 0.25, col: 0xE8C060, cd: 24, t: "The six beasts' power as one shield: only a quarter of the harm gets through." }],
"bw:tank": [{ i: "💥", n: "Siege Shell", k: "lance", p: "shell", m: 4, splash: 8, spd: 80, cd: 8, t: "One enormous shell with a huge blast." },
{ i: "🎯", n: "Mortar Barrage", k: "barrage", p: "shell", num: 10, r: 10, m: 0.9, splash: 5, cd: 16, t: "Ten mortar shells rain on where you aim." },
{ i: "🌫️", n: "Smoke Screen", k: "cloak", dur: 8, mul: 0.5, cd: 20, t: "Smoke pours out: foes lose sight of you until you fire." }],
"bw:mech": [{ i: "🚀", n: "Missile Pods", k: "missiles", p: "rocket", num: 8, m: 1, cd: 12, t: "Eight missiles that seek the nearest foe." },
{ i: "🔆", n: "Overcharge Lasers", k: "beam", p: "laser", dur: 2.4, m: 0.7, cd: 9, t: "A long stream of laser fire." },
{ i: "🛡️", n: "Energy Shield", k: "shield", dur: 8, mul: 0.35, col: 0x6AC8FF, cd: 20, t: "A shield that takes most of the harm." }],
"bw:titan": [{ i: "⚡", n: "Rail Barrage", k: "beam", p: "rail", dur: 2, m: 0.9, pierce: 2, cd: 10, t: "The arm rails fire again and again." },
{ i: "🚀", n: "Missile Storm", k: "missiles", p: "rocket", num: 12, m: 1, cd: 14, t: "Twelve missiles that seek the nearest foes." },
{ i: "🧱", n: "Bulwark Field", k: "shield", dur: 10, mul: 0.25, col: 0x9AE0FF, cd: 24, t: "Only a quarter of the harm gets through." }],
"bw:spider": [{ i: "🕸️", n: "Web Volley", k: "beam", p: "sdisc", dur: 1.2, m: 0.5, slow: 4, cd: 9, t: "Webbing that slows whatever it strikes." },
{ i: "🧪", n: "Acid Burst", k: "nova", r: 16, m: 1.4, slow: 3, col: 0x9ACF4A, cd: 11, t: "A spray of acid all round." },
{ i: "🕷️", n: "Skitter", k: "boost", mul: 2.2, dur: 6, cd: 14, t: "Legs a blur: more than twice as fast." }],
"bw:hover": [{ i: "🚀", n: "Rocket Swarm", k: "missiles", p: "rocket", num: 10, m: 0.9, cd: 12, t: "Ten rockets that seek the nearest foe." },
{ i: "💨", n: "Afterburner", k: "boost", mul: 2.2, dur: 6, cd: 15, t: "More than twice as fast." },
{ i: "🌀", n: "Flak Burst", k: "nova", r: 16, m: 1.3, knock: 5, col: 0xC8C8C8, cd: 11, t: "A ring of flak all round." }]
};
var MP_HARMS = { missiles: 1, beam: 1, lance: 1, chain: 1, barrage: 1, nova: 1 };
var MP = { cd: {}, act: {}, q: [], homing: [], fx: [], key: "", bar: null, shield: null, cloak: 0, boost: null };
function mpWho() {
try {
if (typeof MM !== "undefined" && MM.ride && !(MM.form && MM.form.crewOf)) {
var R = MM.ride, d = R.d || {}, k = R.k === "sovereign" || d.k === "sovereign" ? "sovereign" : (d.k || R.k);
if (!MP_POW[k])
return null;
return { mm: 1, k: k, g: R.I && R.I.g, r: d.r || 6, h: d.eye || 6, P: mmPower(d), armed: mmArmed() };
}
if (typeof BW !== "undefined" && BW.ride && typeof WLD !== "undefined" && WLD.on === "battle") {
var M = BW.ride, k2 = "bw:" + M.type;
if (!MP_POW[k2])
return null;
var base = { tank: 48, mech: 30, titan: 70, spider: 28, hover: 36 }[M.type] || 30;
return { bw: 1, M: M, k: k2, g: M.g, r: M.r, h: M.T.seat, P: base, armed: !(typeof bwInTruce === "function" && bwInTruce()) };
}
}
catch (e) { }
return null;
}
function mpSay(h) { try {
if (typeof BW !== "undefined" && BW.ride && typeof bwSay === "function")
bwSay(h);
else
mmSay(h);
}
catch (e) { } }
function mpNow() { return typeof MM !== "undefined" ? MM.t : performance.now() / 1000; }
function mpCenter(W) { var p = new THREE.Vector3(); if (W.g)
W.g.getWorldPosition(p);
else
p.copy(camera.position); return p; }
function mpAim() { try {
return bwAim();
}
catch (e) {
var v = new THREE.Vector3();
camera.getWorldDirection(v);
return v;
} }
function mpTeam() { return typeof bwMyTeam === "function" ? bwMyTeam() : "me"; }
function mpShoot(W, from, dir, arm, dmg) { MP.inPow = 1; try {
bwShoot({ from: from, dir: dir, arm: arm, dmg: dmg, team: mpTeam(), owner: "me", mach: W.M || null });
return BW.shots[BW.shots.length - 1];
}
catch (e) {
return null;
}
finally {
MP.inPow = 0;
} }
function mpFrom(W, side) {
var a = mpAim(), cp = camera.position.clone(), s = new THREE.Vector3(-a.z, 0, a.x).normalize();
return cp.addScaledVector(a, Math.min(6, 2 + W.r * 0.25)).addScaledVector(s, side || 0).add(new THREE.Vector3(0, -0.6, 0));
}
function mpAimPoint(W) { return __ZC(334, 97, this, arguments, new.target); }
function mpHitAround(W, c, r, dmg, o) { return __ZC(334, 98, this, arguments, new.target); }
function mpUse(i) { return __ZC(334, 99, this, arguments, new.target); }
function mpRing(c, r, col, life) { return __ZC(334, 100, this, arguments, new.target); }
function mmLiteRing() { try {
return vcpLite() ? 24 : 48;
}
catch (e) {
return 32;
} }
function mpShieldOn(W, pw, t) { return __ZC(334, 101, this, arguments, new.target); }
function mpShieldOff() { var S = MP.shield; if (!S)
return; if (S.m.parent)
S.m.parent.remove(S.m); S.m.geometry.dispose(); S.m.material.dispose(); MP.shield = null; }
function mpTick(dt) {
var t = mpNow(), W = mpWho();
if (!W) {
if (MP.shield)
mpShieldOff();
if (MP.boost) {
MP.boost = null;
}
MP.act = {};
MP.q.length = 0;
MP.cloak = 0;
mpBar(null);
mpFxTick(dt);
return;
}
for (var i = MP.q.length - 1; i >= 0; i--) {
if (MP.q[i].at <= t) {
var q = MP.q.splice(i, 1)[0];
try {
q.run();
}
catch (e) { }
}
}
var Bm = MP.act.beam;
if (Bm) {
if (t > Bm.until || !W.armed)
MP.act.beam = null;
else if (t >= Bm.next) {
Bm.next = t + 0.075;
var a = mpAim(), from = mpFrom(W, 0);
try {
a = bwAimAssist(a, from, 0.14, 200, W.M || null);
}
catch (e) { }
if (Bm.pw.fan) {
a.x += (Math.random() - 0.5) * Bm.pw.fan * 2;
a.y += (Math.random() - 0.5) * Bm.pw.fan;
a.z += (Math.random() - 0.5) * Bm.pw.fan * 2;
a.normalize();
}
mpShoot(W, from, a, { p: Bm.pw.p, spd: 150, splash: Bm.pw.splash || 0, pierce: Bm.pw.pierce || 0, slow: Bm.pw.slow || 0, kind: "gun" }, Bm.P);
}
}
if (MP.homing.length) {
var foes = [];
try {
foes = bwFoesForMe();
}
catch (e) { }
for (var h = MP.homing.length - 1; h >= 0; h--) {
var Hm = MP.homing[h], s = Hm.s;
Hm.t += dt;
if (!s || s.life <= 0 || BW.shots.indexOf(s) < 0 || Hm.t > 6) {
MP.homing.splice(h, 1);
continue;
}
if (Hm.t < 0.25)
continue;
var p = s.m.position, v = s.v, sp = v.length() || 1, best = null, bs = 1e9;
foes.forEach(function (o) { var dx = o.x - p.x, dy = o.y - p.y, dz = o.z - p.z, d = Math.hypot(dx, dy, dz); if (d > 140)
return; if (d > 6 && (dx * v.x + dy * v.y + dz * v.z) / (d * sp) < 0.2)
return; if (d < bs) {
bs = d;
best = o;
} });
var want = best ? new THREE.Vector3(best.x - p.x, best.y - p.y, best.z - p.z).normalize() : null;
if (best && bs < 2.2 + (best.r || 0)) {
s.life = -1;
continue;
}
if (want) {
var cur = v.clone().divideScalar(sp);
cur.lerp(want, Math.min(1, dt * (bs < 25 ? 10 : 5))).normalize();
var ns = Math.min(90, sp + dt * 30);
v.copy(cur.multiplyScalar(ns));
s.spd = ns;
}
}
}
var S = MP.shield;
if (S) {
if (t > S.until || S.W.k !== W.k) {
mpShieldOff();
MM.hudKey = "";
}
else {
var c = mpCenter(W);
c.y += W.h * 0.5;
S.m.position.copy(c);
S.m.material.opacity = 0.1 + 0.03 * Math.sin(t * 2.2);
if (S.pw.aura && W.armed && t >= S.next) {
S.next = t + 0.5;
var hc = mpCenter(W);
mpHitAround(W, hc, S.pw.aura.r + W.r, W.P * S.pw.aura.m);
if (WLD.on === "battle" && !vcpLiteSafe())
try {
for (var e = 0; e < 3; e++) {
var an = Math.random() * Math.PI * 2;
bwPuff(hc.x - BW.base + Math.cos(an) * S.R * 0.9, hc.y + Math.random() * W.h, hc.z + Math.sin(an) * S.R * 0.9, S.pw.col || 0xF29A3A, 1.2, 0.8, 0.3);
}
}
catch (er) { }
}
}
}
if (MP.cloak && t > MP.cloak) {
MP.cloak = 0;
MP.cloakAura = null;
mpSay("You can be seen again.");
MM.hudKey = "";
}
if (MP.cloak && MP.cloakAura && W.armed && t >= MP.cloakAura.next) {
MP.cloakAura.next = t + 0.5;
mpHitAround(W, mpCenter(W), MP.cloakAura.pw.aura.r + W.r, W.P * MP.cloakAura.pw.aura.m);
}
if (MP.cloak && WLD.on === "battle" && t >= (MP.smokeT || 0)) {
MP.smokeT = t + 0.6;
try {
var sc = mpCenter(W);
bwSmoke(sc.x - BW.base + (Math.random() - 0.5) * W.r * 2, sc.y + 1, sc.z + (Math.random() - 0.5) * W.r * 2, W.r * 0.8);
}
catch (e) { }
}
if (MP.boost && t > MP.boost.until) {
rideSpeed = MP.boost.was;
MP.boost = null;
MM.hudKey = "";
}
mpFxTick(dt);
mpBar(W);
}
function vcpLiteSafe() { try {
return vcpLite();
}
catch (e) {
return false;
} }
function mpFxTick(dt) {
for (var i = MP.fx.length - 1; i >= 0; i--) {
var f = MP.fx[i];
f.t += dt;
var k = f.t / f.life;
if (k >= 1) {
if (f.m.parent)
f.m.parent.remove(f.m);
f.m.geometry.dispose();
f.m.material.dispose();
MP.fx.splice(i, 1);
continue;
}
f.m.scale.setScalar(1 + (f.r - 1) * Math.min(1, k * 1.6));
f.m.material.opacity = 0.32 * (1 - k);
}
}
function mpCss() { return __ZC(334, 102, this, arguments, new.target); }
function mpBar(W) {
if (!W) {
if (MP.bar)
MP.bar.style.display = "none";
MP.key = "";
return;
}
if (!MP.bar) {
mpCss();
var b = document.createElement("div");
b.id = "mp-bar";
document.body.appendChild(b);
MP.bar = b;
var go = function (e) { var x = e.target.closest && e.target.closest("[data-mp]"); if (!x)
return; e.preventDefault(); e.stopPropagation(); mpUse(+x.getAttribute("data-mp")); };
b.addEventListener("click", go, true);
b.addEventListener("pointerdown", function (e) { if (e.target.closest && e.target.closest("[data-mp]"))
e.stopPropagation(); }, true);
}
var touch = mmTouch(), vr = mmVR(), list = MP_POW[W.k], t = mpNow(), key = W.k + "|" + touch + "|" + W.armed;
if (MP.key !== key) {
MP.key = key;
MP.bar.classList.toggle("touch", touch);
var h = "<div class='mp-h'>Powers</div>";
list.forEach(function (pw, i) {
var lock = MP_HARMS[pw.k] && !W.armed;
h += "<span role='button' data-mp='" + i + "' title='" + mmEsc(pw.n) + "' aria-label='" + mmEsc(pw.i + " " + pw.n) + "' class='mp-b" + (lock ? " lock" : "") + "'><i></i><b>" + pw.i + "</b><span class='mp-t'><span>" + mmEsc(pw.n) + "</span><small>" + (lock ? "Ironfray only" : "Ready") + "</small></span>" + (!touch && !vr ? "<kbd>" + (i + 1) + "</kbd>" : "") + "</span>";
});
MP.bar.innerHTML = h;
}
MP.bar.style.display = "flex";
if (t - (MP.paintT || 0) < 0.1)
return;
MP.paintT = t;
Array.prototype.forEach.call(MP.bar.querySelectorAll("[data-mp]"), function (el) {
var i = +el.getAttribute("data-mp"), pw = list[i], r = (MP.cd[W.k + i] || 0) - t, lock = MP_HARMS[pw.k] && !W.armed;
var on = (pw.k === "shield" && MP.shield && MP.shield.pw === pw) || (pw.k === "boost" && MP.boost) || (pw.k === "cloak" && MP.cloak) || (pw.k === "beam" && MP.act.beam && MP.act.beam.pw === pw);
el.classList.toggle("on", !!on);
el.querySelector("i").style.width = (r > 0 ? Math.min(100, r / (pw.cd || 8) * 100) : 0) + "%";
var sm = el.querySelector("small");
if (sm)
sm.textContent = lock ? "Ironfray only" : on ? "Active" : r > 0 ? "Ready in " + Math.ceil(r) + " s" : "Ready";
});
}
(function () {
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.repeat || !/^Digit[123]$/.test(e.code) || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!mpWho())
return;
e.preventDefault();
e.stopImmediatePropagation();
mpUse(+e.code.slice(5) - 1);
}, true);
if (typeof bwHurtMe === "function") {
var bh = bwHurtMe;
bwHurtMe = function (dmg, src, raw) { try {
if (!raw && mpWho()) {
if (MP.shield)
dmg *= MP.shield.mul;
if (MP.cloak)
dmg *= MP.cloakMul || 1;
}
}
catch (e) { } return bh.call(this, dmg, src, raw); };
}
if (typeof bwMeTargetable === "function") {
var bt = bwMeTargetable;
bwMeTargetable = function () { if (MP.cloak && mpWho())
return false; return bt.apply(this, arguments); };
}
if (typeof bwShoot === "function") {
var bs = bwShoot;
bwShoot = function (o) { var r = bs.apply(this, arguments); try {
if (MP.cloak && o && o.owner === "me" && !MP.inPow) {
MP.cloak = 0;
MP.cloakAura = null;
mpSay("You fired: you can be seen again.");
}
}
catch (e) { } return r; };
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
mpTick(dt);
}
catch (e) {
if (window.console && !MP.warnT) {
MP.warnT = 1;
console.warn("[powers]", e);
}
} };
}
})();
function ifBake(D) { return __ZC(334, 103, this, arguments, new.target); }
function ifPart(P, fn) { var D = new THREE.Group(); fn(D); var b = ifBake(D); P.add(b); return b; }
function ifKit(M) { return __ZC(334, 104, this, arguments, new.target); }
function ifBelt(P, mat, x, len, h, w, lite) { return __ZC(334, 105, this, arguments, new.target); }
function ifTank(M, K) { return __ZC(334, 106, this, arguments, new.target); }
function ifMech(M, K) { return __ZC(334, 107, this, arguments, new.target); }
function ifTitan(M, K) { return __ZC(334, 108, this, arguments, new.target); }
function ifSpider(M, K) { return __ZC(334, 109, this, arguments, new.target); }
function ifHover(M, K) { return __ZC(334, 110, this, arguments, new.target); }
var IF_DRESS = { tank: ifTank, mech: ifMech, titan: ifTitan, spider: ifSpider, hover: ifHover };
function ifDress(M) { return __ZC(334, 111, this, arguments, new.target); }
(function () {
if (typeof bwMachine0 !== "function")
return;
var b0 = bwMachine0;
bwMachine0 = function () { var M = b0.apply(this, arguments); try {
ifDress(M);
}
catch (e) {
if (window.console)
console.warn("[ironfray dress]", e);
} return M; };
})();
