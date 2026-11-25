/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DK = { st: null, at: 0, open: false, busy: false, msg: "", riddle: false, pos: {}, mesh: null, meshKey: null, near: null, cityNear: null,
race: null, duel: null, gate: null, guard: null, lock: null, secrets: -1, warned: 0, t: 0 };
var DK_PLACES = [
["city", "Somnucor"], ["mall", "The World Mall"], ["underground", "The Underground"],
["neverland", "Neverland"], ["sea", "The Endless Sea"], ["underdark", "The Underdark"], ["northpole", "The North Pole"], ["palace", "The King of the North's Palace"],
["station", "Station Aurora"], ["casino", "The Moon casino"], ["space", "Open space"],
["moon", "The Moon"], ["mars", "Mars"], ["mercury", "Mercury"], ["venus", "Venus"], ["jupiter", "Jupiter"], ["saturn", "Saturn"], ["uranus", "Uranus"], ["neptune", "Neptune"], ["pluto", "Pluto"], ["veyar", "Veyar"],
["land_hall", "The Hall of Doors"], ["land_templerow", "Temple Row"], ["land_underworld", "The Underworld"], ["land_heavens", "The Heavens"], ["land_depths", "The Depths"],
["land_faerie", "Faerie"], ["land_void", "The Void"], ["land_mirror", "The Mirror World"], ["land_dead", "The Land of the Dead"], ["land_frozen", "The Frozen Realm"],
["land_elsewhere", "Another World"], ["land_fire", "The Burning Lands"], ["land_stars", "Among the Stars"], ["land_wasteland", "The Wasteland"], ["land_desert", "The Endless Desert"],
["land_station", "The Orbital"], ["land_future", "The City to Come"]
];
function dkPlaceName(k) { for (var i = 0; i < DK_PLACES.length; i++)
if (DK_PLACES[i][0] === k)
return DK_PLACES[i][1]; return k; }
var DK_KEYS = [
{ name: "The Copper Key", trial: "riddle", col: 0xC87A3A, css: "#D89058" },
{ name: "The Jade Key", trial: "race", col: 0x3FA878, css: "#5FC894" },
{ name: "The Crystal Key", trial: "guardian", col: 0x9AD8FF, css: "#B8E4FF" }
];
var DK_SETS = [
[{ w: "neverland", spot: "The Flamingo Lagoon", hint: "Neverland", clue: "Fly past the second star to the right and on till morning. Where one brother's birds fly over his water, a copper lock hangs by a sign.",
riddle: "I am taken from a mine and shut up in a wooden case, from which I am never released, and yet I am used by almost everybody. What am I?" },
{ w: "northpole", spot: "The North Pole", hint: "the top of the world", clue: "Go where every compass gives up: the very top of the world, through a fireplace that was never lit. The jade lock hangs at the sign that says you have arrived." },
{ w: "underdark", spot: "The speaking stone", hint: "the Underdark", clue: "Under the mine and across the black water, a stone answers when you call to it. The Crystal Key's guardian stands beside it, and does not sleep." }],
[{ w: "underdark", spot: "The speaking stone", hint: "the Underdark", clue: "Below the deepest mine there is a city of spires, and past it a stone that answers when you call. A copper lock hangs from it.",
riddle: "The one who makes me does not want me. The one who buys me does not use me. The one who uses me never knows it. What am I?" },
{ w: "neverland", spot: "Wendy's House of Leaves", hint: "Neverland", clue: "On the island where nobody grows up, a house is sewn together out of leaves. The jade lock hangs at its door." },
{ w: "northpole", spot: "Santa's sleigh", hint: "the North Pole", clue: "At the top of the world a red and gold sleigh waits for one night of the year. Its guardian waits all year round." }],
[{ w: "sea", spot: "The wooden horse", hint: "the Endless Sea", clue: "Sail on from the Last Pier over the wine-dark sea, to the shore of a fallen city. A hollow horse stands there, and a copper lock hangs from its bridle.",
riddle: "I have cities, but no houses. I have forests, but no trees. I have water, but no fish. What am I?" },
{ w: "station", spot: "The mission board", hint: "the wheel in the sky", clue: "Ride up to the great wheel in the sky. The jade lock hangs by the board where the Corp posts its missions." },
{ w: "neverland", spot: "The River Caves", hint: "Neverland", clue: "Back to the island of lost children: where a river comes out of the dark under the peak, a guardian stands at the mouth of the caves." }]
];
function dkSet() { var s = DK.st && DK.st.season; return DK_SETS[((s && +s.set) || 0) % DK_SETS.length]; }
var DK_KSTEP = [0, 3, 8, 13], DK_TOTAL = 16;
var DK_MARKS = [
{ 0: { w: "sea", spot: "Argos, the old dog" }, 4: { w: "northpole", spot: "The post box", kind: "play" }, 5: { w: "station", spot: "Lumen, the teaching robot" }, 7: { w: "sea", spot: "The lotus fruit", kind: "tale" },
9: { w: "casino", spot: "The airlock", kind: "arcade" }, 10: { w: "neverland", spot: "Wendy's House of Leaves" }, 12: { w: "northpole", spot: "The Northern Lights", kind: "song" } },
{ 0: { w: "casino", spot: "The prize counter" }, 4: { w: "station", spot: "The canteen", kind: "play" }, 5: { w: "sea", spot: "The bag of winds" }, 7: { w: "neverland", spot: "A pirate's chest", kind: "tale" },
9: { w: "casino", spot: "The airlock", kind: "arcade" }, 10: { w: "northpole", spot: "The bell rack" }, 12: { w: "sea", spot: "The lotus fruit", kind: "song" } },
{ 0: { w: "neverland", spot: "Nana" }, 4: { w: "northpole", spot: "The post box", kind: "play" }, 5: { w: "station", spot: "The duelling master" }, 7: { w: "sea", spot: "Argos, the old dog", kind: "tale" },
9: { w: "casino", spot: "The airlock", kind: "arcade" }, 10: { w: "underdark", spot: "The speaking stone" }, 12: { w: "northpole", spot: "The Northern Lights", kind: "song" } }
];
function dkSteps() { var m = dkMe(); return Math.max(0, Math.min(DK_TOTAL, +m.steps || 0)); }
function dkClue() { var m = dkMe(); return m.clue || null; }
function dkMarks() { var s = DK.st && DK.st.season; return DK_MARKS[((s && +s.set) || 0) % DK_MARKS.length]; }
function dkReady(n) { return n > 0 && dkSteps() >= DK_KSTEP[n] && !dkHas(n); }
function dkNew() { return !!(DK.st && DK.st.ok && +DK.st.trail === 2); }
function dkSeason() { var s = DK.st && DK.st.season; return (s && +s.id) || 1; }
function dkMe() { return (DK.st && DK.st.me) || {}; }
function dkHas(n) { var m = dkMe(); return !!m["k" + n]; }
function dkNext() { for (var i = 1; i <= 3; i++)
if (!dkHas(i))
return i; return 0; }
function dkShards() { var m = dkMe(); return Array.isArray(m.shards) ? m.shards : []; }
function dkHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function dkLoad() {
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function") {
DK.st = DK.st || { ok: false };
dkPaint();
return Promise.resolve();
}
DK.busy = true;
return cityRpc("hunt_state", {}).then(function (o) { if (o && o.ok) {
DK.st = o;
DK.at = Date.now();
}
else {
DK.st = DK.st || { ok: false };
DK.at = Date.now();
} })
.catch(function () { DK.st = DK.st || { ok: false }; DK.at = Date.now(); }).then(function () { DK.busy = false; dkSyncSecrets(); dkLit(); dkBoardDraw(); dkPaint(); dkNews(); });
}
function dkNews() {
var N = (DK.st && DK.st.news) || [];
if (!N.length)
return;
var k = "sm-hunt-news-seen", seen = 0;
try {
seen = +(localStorage.getItem(k) || 0);
}
catch (e) { }
var top = +N[0].id || 0;
if (top <= seen)
return;
try {
localStorage.setItem(k, String(top));
}
catch (e) { }
var fresh = N.filter(function (x) { return +x.id > seen && Date.now() - new Date(x.at).getTime() < 30 * 60000; });
if (!fresh.length)
return;
dkSay("📜 <b>The great hunt:</b> " + esc(fresh[0].body) + (fresh.length > 1 ? " (and " + (fresh.length - 1) + " more in the Hunt panel)" : ""));
}
var DK_PAL = ["rose", "stair", "blades", "armour"];
function dkPalKey() { var u = (typeof session !== "undefined" && session && session.user) ? session.user.id : "guest"; return "sm-palace-secrets-" + u; }
function dkPalFound() { try {
return JSON.parse(localStorage.getItem(dkPalKey()) || "{}") || {};
}
catch (e) {
return {};
} }
function dkPalMark(k) {
var f = dkPalFound();
if (f[k])
return;
f[k] = Date.now();
try {
localStorage.setItem(dkPalKey(), JSON.stringify(f));
}
catch (e) { }
var n = Object.keys(f).length;
dkSay("<b>A secret of the palace</b> found: " + n + " of 4. It counts towards your rank in the hunt.");
dkSyncSecrets();
}
(function () {
if (typeof ipHeart === "function") {
var ih = ipHeart;
ipHeart = function () { var r = ih.apply(this, arguments); try {
dkPalMark("rose");
}
catch (e) { } return r; };
}
if (typeof ipOpenDoor === "function") {
var io = ipOpenDoor;
ipOpenDoor = function (key) { var r = io.apply(this, arguments); try {
var d = IP.doors[key];
if (d && d.open)
dkPalMark(key === "stair" ? "stair" : key === "blades" ? "blades" : "armour");
}
catch (e) { } return r; };
}
})();
function dkSmall() { var c = (typeof csecFound === "function") ? Object.keys(csecFound()).length : 0; return { castle: Math.min(8, c), palace: Math.min(4, Object.keys(dkPalFound()).length) }; }
function dkSyncSecrets() {
if (!(DK.st && DK.st.ok))
return;
var sm = dkSmall(), n = sm.castle + sm.palace, had = +(dkMe().secrets || 0);
if (n > had && n !== DK.secrets) {
DK.secrets = n;
cityRpc("hunt_secrets", { p_n: n }).then(function (o) { if (o && o.ok && DK.st.me) {
DK.st.me.secrets = o.secrets;
DK.st.me.score = o.score;
dkPaint();
} }).catch(function () { });
}
}
function dkSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function dkChime(up) { if (typeof playTone === "function") {
playTone(up ? 660 : 520, 0.18);
setTimeout(function () { playTone(up ? 990 : 780, 0.3); }, 160);
} }
function dkWhere() {
if (typeof WLD !== "undefined" && WLD.on) {
var k = WLD.on;
if (k === "surface")
return (typeof SF !== "undefined" && SF.k) || null;
if (k === "shuttle")
return null;
return k;
}
if (typeof walkMode === "undefined" || !walkMode)
return null;
if (typeof MALL !== "undefined" && MALL.on)
return "mall";
if (typeof UG2 !== "undefined" && UG2.on)
return "underground";
if (typeof store === "undefined" || store.inside)
return null;
var r = (typeof realmById === "function" && store.here) ? realmById(store.here) : null;
if (!r)
return null;
if (r.kind === "somnucor")
return "city";
return "land_" + r.kind;
}
function dkPick(list, salt) {
var fixed = (list || []).filter(function (T) { return T && typeof T.x === "number" && !T.p && isFinite(T.x); });
if (!fixed.length)
return null;
return fixed[dkHash(salt + ":" + dkSeason()) % fixed.length];
}
function dkNamed(list, name) { var r = null; (list || []).forEach(function (T) { if (!r && T && typeof T.x === "number" && !T.p && T.name === name)
r = T; }); return r; }
function dkGround(W, x, z) { try {
var y = (W && W.key === "sea" && typeof seaHeight === "function") ? Math.max(seaHeight(x, z), -1.2) : W && W.ground ? W.ground(x, z) : 0;
return (isFinite(y) && y > -500) ? y : 0;
}
catch (e) {
return 0;
} }
function dkWorldList(k) { return __ZC(209, 0, this, arguments, new.target); }
function dkDry(W, x, z) { return __ZC(209, 1, this, arguments, new.target); }
function dkNearArrival(W, x, z) { var A = (typeof WLD !== "undefined" && WLD.w === W) ? WLD.arrive : null; return !!(A && Math.hypot(x - A.x, z - A.z) < 4); }
function dkFreeNear(W, x, z, r, wide) {
return dkFreeNear1(W, x, z, r, wide, Math.max(6, r + 2), true) || dkFreeNear1(W, x, z, r, wide, Math.max(10, r + 8), true) || dkFreeNear1(W, x, z, r, wide, Math.max(6, r + 2), false);
}
function dkFreeNear1(W, x, z, r, wide, dMax, clearArrival) { return __ZC(209, 2, this, arguments, new.target); }
function dkFree(x, z, realmId) {
var feet = (typeof terrainY === "function") ? terrainY(x, z) : 0;
if (typeof blockedAt === "function") {
for (var k = 0; k < 5; k++) {
var ox = k === 1 ? 1 : k === 2 ? -1 : 0, oz = k === 3 ? 1 : k === 4 ? -1 : 0;
try {
if (blockedAt(x + ox * 1.2, z + oz * 1.2, feet))
return false;
}
catch (e) { }
}
}
try {
var hp = (typeof rmapPad === "function") ? rmapPad() : null;
if (hp && Math.hypot(hp.x - x, hp.z - z) < (typeof HP_PAD_R !== "undefined" ? HP_PAD_R : 12) + 10)
return false;
}
catch (e) { }
var O = store.objects;
for (var i = 0; i < O.length; i++) {
var o = O[i];
if ((o.realm || 0) !== realmId)
continue;
if (Math.abs(o.x - x) < 3 && Math.abs(o.z - z) < 3)
return false;
}
if (typeof terrainY === "function") {
if (Math.abs(terrainY(x + 2, z) - feet) > 0.4 || Math.abs(terrainY(x, z + 2) - feet) > 0.4 || Math.abs(terrainY(x - 2, z) - feet) > 0.4 || Math.abs(terrainY(x, z - 2) - feet) > 0.4)
return false;
}
if (typeof atlIsWater === "function") {
try {
if (atlIsWater(x, z))
return false;
}
catch (e) { }
}
return true;
}
function dkSearch(c, realmId, r0, r1, salt) {
var a0 = (dkHash(salt + ":" + dkSeason()) % 360) * Math.PI / 180;
for (var rad = r0; rad <= r1; rad += 4) {
for (var q = 0; q < 24; q++) {
var a = a0 + q * Math.PI * 2 / 24 * (q % 2 ? 1 : -1) * 0.5;
var x = c.x + Math.cos(a) * rad, z = c.z + Math.sin(a) * rad;
if (dkFree(x, z, realmId))
return { x: x, z: z };
}
}
return null;
}
function dkShardPos(k) {
var key = k + "@" + dkSeason(), c = DK.pos[key];
if (c && c.int === (typeof WLD !== "undefined" && WLD.w ? WLD.w.g : null))
return c;
var W = (typeof WLD !== "undefined" && WLD.on) ? WLD.w : null, p = null;
if (W && dkWorldList(k)) {
var S = dkPick(dkWorldList(k).filter(function (T) { return typeof T.y === "number" || dkDry(W, T.x, T.z); }), "shard-" + k);
var F = S ? ((typeof S.y === "number" && !dkNearArrival(W, S.x, S.z)) ? { x: S.x, z: S.z, y: S.y } : dkFreeNear(W, S.x, S.z, S.r || 3)) : null;
if (F)
p = { x: W.base + F.x, y: F.y, z: F.z, r: 2.4 };
}
else if (W && k === "space" && typeof SP !== "undefined" && SP.stations && SP.stations.aurora) {
var st = SP.stations.aurora.position;
p = { x: W.base + st.x + 70, y: st.y + 30, z: st.z + 190, r: 28, space: true, follow: true };
}
else if (W && WLD.on === "surface" && typeof SF !== "undefined" && SF.k === k) {
var site = (SF.sites || [])[dkHash("site-" + k + dkSeason()) % Math.max(1, (SF.sites || []).length)];
var sx = site ? site.x * 0.55 : 18, sz = site ? site.z * 0.55 : -26;
if (Math.hypot(sx, sz) < 14) {
sx = 18;
sz = -26;
}
p = { x: W.base + sx, y: dkGround(W, sx, sz), z: sz, r: 2.6 };
}
else if (k === "mall" && typeof MALL !== "undefined" && MALL.station) {
var mx = MALL.cx + ((dkHash("mall" + dkSeason()) % 2) ? 30 : -30), mz = MALL.cz;
p = { x: mx, y: 0, z: mz, r: 2.4 };
}
else if (k === "underground" && typeof UG2 !== "undefined" && UG2.on) {
p = { x: UG2.cx - 44 + ((dkHash("ug" + dkSeason()) % 2) ? -10 : 10), y: 0, z: UG2.cz + ((dkHash("ugz" + dkSeason()) % 2) ? 2 : -2), r: 2.4 };
}
else if (k === "city") {
if (typeof RMAP === "undefined" || !RMAP.list || !RMAP.list.length)
return null;
var cand = RMAP.list.filter(function (q) { return q.ring >= 1; });
if (!cand.length)
return null;
var kq = cand[dkHash("city" + dkSeason()) % cand.length], cr = somnucorRealm();
var f = dkSearch({ x: kq.x, z: kq.z }, cr ? cr.id : 0, 6, 30, "city");
if (!f)
return null;
p = { x: f.x, y: terrainY(f.x, f.z), z: f.z, r: 2.4, city: true };
}
else if (/^land_/.test(k)) {
var r = realmById(store.here);
if (!r)
return null;
var door = null;
store.objects.some(function (o) { if ((o.realm || 0) === r.id && o.archetype === "portal") {
door = o;
return true;
} return false; });
var ctr = door ? { x: door.x, z: door.z } : heartOf(r.id);
var g = dkSearch(ctr, r.id, 22, 70, k);
if (!g)
return null;
p = { x: g.x, y: terrainY(g.x, g.z), z: g.z, r: 2.4, city: true };
}
if (p) {
p.int = W ? W.g : null;
p.k = k;
DK.pos[key] = p;
}
return p;
}
function dkShardMesh() {
var g = new THREE.Group();
var m = new THREE.MeshLambertMaterial({ color: 0xB8A0FF, emissive: new THREE.Color(0x6A48D8), emissiveIntensity: 0.9, transparent: true, opacity: 0.92 });
var c = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), m);
c.scale.set(1, 1.7, 1);
g.add(c);
if (typeof wGlow === "function") {
var s = wGlow(0x9A80FF, 2.2, 0.45);
g.add(s);
}
g.userData.noCull = 1;
g.userData.spin = c;
return g;
}
function dkLockMesh(n) { return __ZC(209, 3, this, arguments, new.target); }
function dkGuardMesh() { return __ZC(209, 4, this, arguments, new.target); }
function dkMarkMesh() { return __ZC(209, 5, this, arguments, new.target); }
function dkMarkSpot(i) { return __ZC(209, 6, this, arguments, new.target); }
function dkMarkTake(i) { return __ZC(209, 7, this, arguments, new.target); }
function dkPage(p) { if (!p || !p.title)
return; DK.newPage = p; DK.open = true; dkPaint(); }
function dkGateMesh() {
var g = new THREE.Group(), stone = new THREE.MeshLambertMaterial({ color: 0xD8D0C0 }), dark = new THREE.MeshLambertMaterial({ color: 0x2A2238 });
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.9, 6, 0.9), stone); p.position.set(s * 2.4, 3, 0); g.add(p); });
var top = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.9, 1.0), stone);
top.position.y = 6.4;
g.add(top);
var veil = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 5.9), new THREE.MeshBasicMaterial({ color: 0x6A58C8, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false }));
veil.position.y = 2.95;
g.add(veil);
g.userData.veil = veil;
g.userData.locks = DK_KEYS.map(function (K, i) {
var m = new THREE.Mesh(new THREE.CircleGeometry(0.32, 20), new THREE.MeshLambertMaterial({ color: 0x403848, emissive: new THREE.Color(K.col), emissiveIntensity: 0.05, side: THREE.DoubleSide }));
m.position.set(-1 + i, 6.4, 0.52);
g.add(m);
var b = m.clone();
b.position.z = -0.52;
g.add(b);
return [m, b];
});
var plate = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.25, 2.2), dark);
plate.position.y = 0.12;
g.add(plate);
if (typeof wSign === "function") {
var sg = wSign(["The Gate of Dreams", "Three keys open it"], 2.6, 0.8, "#2A2238", "#F0E0B8");
sg.position.set(0, 1.1, 1.0);
g.add(sg);
var sg2 = sg.clone();
sg2.position.z = -1.0;
sg2.rotation.y = Math.PI;
g.add(sg2);
}
g.userData.noCull = 1;
return g;
}
function dkLit() {
var G = DK.gate;
if (!G || !G.mesh)
return;
G.mesh.userData.locks.forEach(function (pr, i) { var on = dkHas(i + 1); pr.forEach(function (m) { m.material.emissiveIntensity = on ? 0.9 : 0.05; m.material.color.setHex(on ? DK_KEYS[i].col : 0x403848); }); });
}
function dkGatePlace() {
if (DK.gate && DK.gate.mesh)
return DK.gate;
if (typeof RMAP === "undefined" || !RMAP.list || !RMAP.list.length || typeof ATLC === "undefined" || !ATLC)
return null;
var k0 = RMAP.list.filter(function (q) { return q.ring === 0; })[0];
if (!k0)
return null;
var cr = somnucorRealm();
if (!cr)
return null;
var spot = null;
for (var dl = 6; dl < 40 && !spot; dl += 3) {
[1, -1].some(function (sd) {
var a = k0.a + sd * dl / k0.rad, x = ATLC.x + Math.cos(a) * k0.rad, z = ATLC.z + Math.sin(a) * k0.rad;
if (dkFree(x, z, cr.id) && dkFree(x + Math.cos(a + 1.5708) * 2.6, z + Math.sin(a + 1.5708) * 2.6, cr.id) && dkFree(x - Math.cos(a + 1.5708) * 2.6, z - Math.sin(a + 1.5708) * 2.6, cr.id)) {
spot = { x: x, z: z, a: a };
return true;
}
return false;
});
}
if (!spot)
return null;
var m = dkGateMesh();
m.position.set(spot.x, terrainY(spot.x, spot.z), spot.z);
m.rotation.y = -spot.a + Math.PI / 2;
scene.add(m);
DK.gate = { x: spot.x, z: spot.z, mesh: m };
dkBoard();
dkLit();
return DK.gate;
}
function dkBoardDraw() {
var B = DK.board;
if (!B)
return;
var S = DK.st || {}, s = S.season || {}, x = B.ctx, W = 512, H = 640;
x.fillStyle = "#1E1A2C";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
x.fillStyle = "#F0E0B8";
x.textAlign = "center";
x.font = "bold 38px Georgia";
x.fillText("The Dreamer's Keys", W / 2, 62);
x.font = "24px Georgia";
x.fillStyle = "#C9BEA8";
x.fillText("Season " + (s.id || 1) + (s.prize_gold ? " · prize " + Number(s.prize_gold).toLocaleString() + " gold" : ""), W / 2, 100);
if (s.winner) {
x.fillStyle = "#F0D890";
x.fillText("Won by " + String(s.winner).slice(0, 26), W / 2, 134);
}
x.textAlign = "left";
x.font = "bold 30px sans-serif";
var rows = (S.board || []).slice(0, (S.champions && S.champions.length) ? 7 : 8);
if (!rows.length) {
x.fillStyle = "#C9BEA8";
x.textAlign = "center";
x.fillText("Nobody has found anything yet.", W / 2, 230);
x.fillText("Open the hunt from the Menu.", W / 2, 266);
}
rows.forEach(function (r, i) {
var y = 190 + i * 54;
x.fillStyle = i < 3 ? "#F0E0B8" : "#C9BEA8";
x.textAlign = "left";
x.fillText((i + 1) + ". " + String(r.name).slice(0, 14) + (r.gate ? " ★" : ""), 26, y);
x.textAlign = "right";
x.fillText("step " + Math.min(DK_TOTAL, (+r.steps || 0)) + "/" + DK_TOTAL + "  🗝" + r.keys + "  " + r.score, W - 26, y);
});
var C = S.champions || [];
if (C.length) {
x.textAlign = "center";
x.font = "22px Georgia";
x.fillStyle = "#F0D890";
x.fillText("Carved on the Gate: " + C.slice(-3).map(function (c) { return String(c.name).slice(0, 14); }).join(", "), W / 2, H - 28);
}
B.tex.needsUpdate = true;
}
function dkBoard() {
var G = DK.gate;
if (!G || DK.board)
return;
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 640;
var tex = new THREE.CanvasTexture(cv), g = new THREE.Group();
var face = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.0), new THREE.MeshBasicMaterial({ map: tex }));
face.position.y = 2.3;
g.add(face);
var back = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.2, 0.12), new THREE.MeshLambertMaterial({ color: 0x3A2E22 }));
back.position.set(0, 2.3, -0.08);
g.add(back);
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.8, 0.14), new THREE.MeshLambertMaterial({ color: 0x3A2E22 })); post.position.set(sd * 1.0, 0.4, -0.08); g.add(post); });
var a = G.mesh.rotation.y, side = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
var cr = somnucorRealm(), bx = G.x + side.x * 5, bz = G.z + side.z * 5;
if (cr && !dkFree(bx, bz, cr.id)) {
var ox = G.x - side.x * 5, oz = G.z - side.z * 5;
if (dkFree(ox, oz, cr.id)) {
bx = ox;
bz = oz;
}
}
g.position.set(bx, terrainY(bx, bz), bz);
g.rotation.y = a;
g.userData.noCull = 1;
scene.add(g);
DK.board = { g: g, ctx: cv.getContext("2d"), tex: tex };
dkBoardDraw();
}
function dkKeySpot(n) { return __ZC(209, 8, this, arguments, new.target); }
function dkRaceStart() { return __ZC(209, 9, this, arguments, new.target); }
function dkRaceEnd(won) { return __ZC(209, 10, this, arguments, new.target); }
function dkRaceTick() { return __ZC(209, 11, this, arguments, new.target); }
function dkDuelStart() { return __ZC(209, 12, this, arguments, new.target); }
function dkDuelPos() { var D = DK.duel; return 0.5 + 0.5 * Math.sin(D.ph); }
function dkDuelLoop() {
var D = DK.duel;
if (!D || D.over)
return;
var now = performance.now(), dt = Math.min(0.1, (now - D.last) / 1000);
D.last = now;
D.ph += dt * D.speed * Math.PI * 2 / 1.6;
var mk = document.getElementById("dk-mark");
if (mk)
mk.style.left = (dkDuelPos() * 100).toFixed(2) + "%";
requestAnimationFrame(dkDuelLoop);
}
function dkStrike() { return __ZC(209, 13, this, arguments, new.target); }
function dkDuelHtml() { return __ZC(209, 14, this, arguments, new.target); }
function dkClaim(n, answer) { return __ZC(209, 15, this, arguments, new.target); }
function dkGateOpen() { return __ZC(209, 16, this, arguments, new.target); }
function dkTakeShard(k) { return __ZC(209, 17, this, arguments, new.target); }
function dkClear() { return __ZC(209, 18, this, arguments, new.target); }
function dkHere(dt) {
if (typeof camera === "undefined" || !camera)
return null;
var k = dkWhere(), P = camera.position, feet = P.y - 1.72, best = null;
if (!k) {
if (DK.mesh || DK.lock || DK.mark)
dkClear();
return null;
}
var keys = [k];
if (k === "northpole")
keys.push("palace");
var have = dkShards(), want = null, wp = null;
keys.forEach(function (q) { if (want || have.indexOf(q) >= 0)
return; var p = dkShardPos(q); if (p) {
want = q;
wp = p;
} });
if (want && wp) {
if (DK.meshKey !== want + "@" + dkSeason()) {
if (DK.mesh && DK.mesh.parent)
DK.mesh.parent.remove(DK.mesh);
DK.mesh = dkShardMesh();
DK.meshKey = want + "@" + dkSeason();
scene.add(DK.mesh);
if (wp.space)
DK.mesh.scale.setScalar(14);
}
if (wp.follow && typeof SP !== "undefined" && SP.stations && SP.stations.aurora) {
var st = SP.stations.aurora.position;
wp.x = WLD.w.base + st.x + 70;
wp.y = st.y + 30;
wp.z = st.z + 190;
}
DK.t += dt;
DK.mesh.position.set(wp.x, (wp.space ? wp.y : wp.y + 1.25) + Math.sin(DK.t * 1.2) * 0.12 * (wp.space ? 10 : 1), wp.z);
DK.mesh.userData.spin.rotation.y += dt * 0.8;
var d = wp.space ? P.distanceTo(DK.mesh.position) : Math.hypot(P.x - wp.x, P.z - wp.z);
if (d < wp.r && (wp.space || Math.abs(feet - wp.y) < 3))
best = { html: "✨ <b>A dream shard</b> · <b>press E</b> to take it", fn: function () { dkTakeShard(want); } };
}
else if (DK.mesh) {
DK.mesh.parent && DK.mesh.parent.remove(DK.mesh);
DK.mesh = null;
DK.meshKey = null;
}
var stp = dkSteps(), CL = dkClue(), M = dkMarks()[stp], placeK = (CL && M && dkNew() && (M.kind || "find") === CL.kind) ? CL.kind : null, mk = placeK ? dkMarkSpot(stp) : null;
if (mk) {
var mkey = stp + "@" + dkSeason() + "@" + mk.x.toFixed(1);
if (!DK.mark || DK.mark.k !== mkey) {
if (DK.mark && DK.mark.mesh.parent)
DK.mark.mesh.parent.remove(DK.mark.mesh);
var mm = dkPlaceMesh(placeK);
mm.position.set(mk.x, mk.y, mk.z);
mm.lookAt(WLD.w.base + mk.S.x, mk.y, mk.S.z);
scene.add(mm);
DK.mark = { k: mkey, mesh: mm };
}
var dm = Math.hypot(P.x - mk.x, P.z - mk.z);
if (dm < 3.4 && Math.abs(feet - mk.y) < 3 && !best)
best = dkPlacePrompt(placeK, stp);
}
else if (DK.mark) {
if (DK.mark.mesh.parent)
DK.mark.mesh.parent.remove(DK.mark.mesh);
DK.mark = null;
}
var n = dkNext(), warden = dkNew() && n === 1 && CL && CL.kind === "game", K = (n && (dkReady(n) || warden)) ? dkSet()[n - 1] : null;
if (K && WLD.on === K.w) {
var ks = dkKeySpot(n);
if (ks) {
var lk = n + "@" + dkSeason() + "@" + ks.x.toFixed(1) + (warden ? "w" : "");
if (!DK.lock || DK.lock.k !== lk) {
if (DK.lock && DK.lock.mesh && DK.lock.mesh.parent)
DK.lock.mesh.parent.remove(DK.lock.mesh);
if (DK.guard && DK.guard.parent)
DK.guard.parent.remove(DK.guard);
DK.guard = null;
var m = warden ? dkWardenMesh() : n === 3 ? dkGuardMesh() : dkLockMesh(n);
m.position.set(ks.x, ks.y, ks.z);
m.lookAt(WLD.w.base + ks.S.x, ks.y, ks.S.z);
scene.add(m);
DK.lock = { k: lk, mesh: m };
if (n === 3)
DK.guard = m;
}
var dk = Math.hypot(P.x - ks.x, P.z - ks.z);
if (dk < 3.4 && Math.abs(feet - ks.y) < 3 && !best) {
if (warden)
best = { html: "🪨 <b>The Warden of the Copper Key</b>, brass, at a table of stones · <b>press E</b> to play him", fn: function () { dkStonesBegin(); } };
else if (n === 1)
best = { html: "🔒 <b>A copper lock</b>, with words cut round it · <b>press E</b> to read them", fn: function () { DK.riddle = true; DK.open = true; DK.msg = ""; dkPaint(); } };
else if (n === 2)
best = { html: DK.race ? "🟢 The race is on" : "🔒 <b>A jade lock</b> · <b>press E</b> to begin its race", fn: function () { if (!DK.race)
dkRaceStart(); } };
else
best = { html: "🗿 <b>The Guardian of the Crystal Key</b> bars the way · <b>press E</b> to face it", fn: function () { if (!DK.duel || DK.duel.over)
dkDuelStart(); } };
}
}
}
else if (DK.lock) {
if (DK.lock.mesh && DK.lock.mesh.parent)
DK.lock.mesh.parent.remove(DK.lock.mesh);
DK.lock = null;
DK.guard = null;
}
if (k === "city") {
var G = dkGatePlace();
if (G) {
G.mesh.visible = true;
var dg = Math.hypot(P.x - G.x, P.z - G.z);
if (dg < 5.5 && !best)
best = { html: "🚪 <b>The Gate of Dreams</b> · <b>press E</b> " + (dkNext() ? "(it has three locks)" : dkMe().gate ? "to walk through it" : dkMe().final ? "to go into the first room" : "to set your three keys in it: it has a question for you"), fn: dkGateOpen };
}
}
else if (DK.gate && DK.gate.mesh) {
DK.gate.mesh.visible = false;
if (DK.board)
DK.board.g.visible = false;
}
if (k === "city" && DK.board)
DK.board.g.visible = true;
return best;
}
(function () {
if (typeof worldTick !== "function")
return;
var wt = worldTick;
worldTick = function (dt) {
wt.apply(this, arguments);
try {
if (!WLD.on || !walkMode)
return;
dkRaceTick();
var b = dkHere(dt || 0);
if (b)
worldPrompt(b.html, b.fn);
}
catch (e) {
if (window.console && !DK.warned) {
DK.warned = 1;
console.warn("[hunt]", e);
}
}
};
})();
(function () {
if (typeof ug2Tick !== "function")
return;
var ut = ug2Tick;
ug2Tick = function (dt) {
var r = ut.apply(this, arguments);
try {
if (UG2.on && UG2.mode === "platform" && !UG2.ride) {
var b = dkHere(dt || 0);
if (b)
ugPrompt(b.html, b.fn);
else if (DK.ugNear)
ugPrompt(null);
DK.ugNear = !!b;
}
}
catch (e) { }
return r;
};
})();
setInterval(function () {
try {
if (typeof WLD !== "undefined" && WLD.on)
return;
if (typeof UG2 !== "undefined" && UG2.on)
return;
var b = dkHere(0.25);
var key = b ? b.html : null;
if (key !== DK.cityNear) {
DK.cityNear = key;
if (typeof worldPromptCity === "function")
worldPromptCity(b ? b.html : null, b ? b.fn : null);
}
}
catch (e) {
if (window.console && !DK.warned) {
DK.warned = 1;
console.warn("[hunt]", e);
}
}
}, 250);
setInterval(function () { try {
if (DK.mesh && !(typeof WLD !== "undefined" && WLD.on)) {
DK.t += 0.05;
DK.mesh.userData.spin.rotation.y += 0.04;
}
}
catch (e) { } }, 50);
setInterval(function () { if (typeof signedIn === "function" && signedIn() && !document.hidden && (!DK.at || Date.now() - DK.at > 90000) && !DK.busy)
dkLoad(); }, 5000);
addEventListener("keydown", function (e) {
if (!(DK.stars && !DK.stars.over && DK.open && DK.mode === "stars"))
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "ArrowLeft" || e.code === "KeyA") {
e.preventDefault();
e.stopImmediatePropagation();
dkStarsMove(-1);
}
if (e.code === "ArrowRight" || e.code === "KeyD") {
e.preventDefault();
e.stopImmediatePropagation();
dkStarsMove(1);
}
}, true);
addEventListener("keydown", function (e) {
if (!(DK.duel && !DK.duel.over && DK.open))
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "Space" || e.code === "KeyE") {
e.preventDefault();
e.stopImmediatePropagation();
dkStrike();
}
}, true);
var DK_ALMANAC = [
{ t: "How to read this book", b: "These are the things I loved, written down in no order at all, so that whoever comes after me can find the way I thought. Nothing in here is a lie, but not everything in here is said straight. I had a bad habit, all my life, of marking the pages I cared about with my thumbnail, very lightly, the way you would mark a playing card. Read slowly. Read twice. The book is not finished with you just because you have finished the book." },
{ t: "My grandmother's stones", b: "My grandmother carried a smooth grey stone in her left pocket every day of her life, and she would not tell anyone why. On wet afternoons she taught me a game with a pile of pebbles on the kitchen table: each of us in turn takes one, two or three, and whoever takes the very last pebble wins. She never lost to me. Not once in eleven years. When I was grown I finally worked out how: whenever it was my turn, she had left me a pile that could be counted out exactly in fours. Leave the other player a pile of fours and the last pebble is always yours." },
{ t: "The boat in the barn", b: "My grandfather spent nine winters building a sailing boat in the barn behind the house, and he never finished her. She had a keel, ribs and half her planking, and her name was already painted on the bow in white letters: Patience. He whistled while he worked, always the same few tunes. He wrote them down in a little book, but he wrote every tune one letter too high, so that he would know the book was his. His favourite he wrote as F A D F E D. Read it one letter lower and you can whistle it the way he did." },
{ t: "The lighthouse on the point", b: "There was a lighthouse on the point beyond the harbour, painted in red and white bands, and on Sundays my mother and I climbed it. There were one hundred and twelve steps from the door to the lamp room. We counted them out loud every single time, as though they might have changed during the week. At the top she would let me hold the rail and look out at nothing but water, and say: everything out there is somewhere." },
{ t: "My mother's lullaby", b: "My mother sang me to sleep with a tune she made up herself. It had no words, only the old singing names for the notes, and I have it written here exactly as she sang it: do, mi, so, mi, re, do, re, mi, do. For anyone who never learned them: do is C, re is D, mi is E, fa is F, so is G, la is A, ti is B, and then do again, one higher." },
{ t: "The bell-ringer's count", b: "The chapel in our village had eight bells. The ringers numbered them from the lightest and highest, which they called the treble, down to the heaviest and lowest, the tenor. But the old ringer who taught me numbered them backwards from everyone else, from the lowest, one, which rang C, up to the highest, eight, which rang the C above it, all on the white notes, like a harp. His call to bring the bells home at the end of practice was: eight, six, five, three, five, six, eight. I can still hear it." },
{ t: "The play I wrote at twelve", b: "I wrote one play in my life, when I was twelve, for my cousins to act at Christmas. It is called The Lamplighter and the Moon. It has three parts and twelve lines, and here it is, every word, because a play that is not written down is only a rumour.\n\nTHE LAMPLIGHTER: Every night I climb, and every night the dark comes back.\nTHE CHILD: Then why do you climb?\nTHE LAMPLIGHTER: Because somebody has to walk home.\nTHE MOON: I have watched you for a hundred years, little flame.\nTHE CHILD: Can the moon talk?\nTHE MOON: Only to the ones who are still awake.\nTHE LAMPLIGHTER: Then keep her awake, child. I am tired.\nTHE CHILD: I will light the last lamp myself.\nTHE MOON: Then I will hold the sky still until you reach it.\nTHE LAMPLIGHTER: Mind the ninth rung. It was never mended.\nTHE CHILD: I am not afraid of the dark.\nTHE MOON: Nobody is, who carries a light.\n\nMy cousins forgot half their lines, and the moon fell off the stepladder. It was the best night of the year." },
{ t: "On games", b: "I loved the games where a single mistake ends everything, because they teach you to look before you move. My favourite of all was one where stars fell out of a black sky and you had only to keep out of their way for one minute. It sounds easy. Nobody I knew ever did it on the first try. The trick, if there is one, is not to watch your own feet. Watch the sky above them." },
{ t: "On the sea", b: "The first long story anyone ever read to me was about a sailor who took twenty years to get home, past one-eyed giants, a witch who turned men into pigs, and a bag that held every wind in the world. I made a sea that never ends because of him. I wanted somewhere you could always be on the way home." },
{ t: "On the island of children", b: "My mother read me the book about the boy who would not grow up, one chapter a night, and when it ended I made her start it again. I built his island exactly as the book draws it, coral reefs and all. If you ever feel too old for the island, go there anyway. It does not check." },
{ t: "On winter", b: "I was born in the coldest week of a cold year, and I have always loved the top of the world. I built a palace of ice for a king who keeps his own counsel, with a rose in it that never melts and a stair that is on no plan. A king is allowed his secrets. So is a dreamer." },
{ t: "On the volcano", b: "Someone I love dreamed of a castle built inside a volcano, with a dragon in its heart and a smith at its forge. I could not give him the world, so I built him that. Everything I could not say to him out loud, I carved into its walls." },
{ t: "A dream about a library", b: "I once dreamed of a library at the bottom of the sea. The books did not rot; they only slept. The librarian was a woman made of water with ink on her fingers, and she was shy of light: she would only speak to you if you covered your lamp. I woke up before she told me what she was guarding. I have been trying to get back there ever since." },
{ t: "On doors", b: "Every door is a question. Most of them are only asking whether you want to go in. A few are asking who you are. I have hidden a handful of the second kind, and they will not open for anybody who has not walked the road to them." },
{ t: "On the moon", b: "When I was small I believed the moon followed our car home. I was not wrong: it does. Up there now there is a house of chance where fortunes turn on a wheel, and a door that keeps the air in. If you ever stand at that door, remember that the most precious thing on the moon is the air you are breathing." },
{ t: "On keys", b: "A key is a promise that something is worth keeping. I made three. Each one is written on: read every key you are given, front and back, because a key that does not tell you where it goes is only a piece of metal." },
{ t: "Things I would save from a fire", b: "The grey stone. The little book of whistled tunes. The photograph of the lighthouse with my mother at the top, too small to see. The stepladder moon. My first notebook, the one with the blank page in the middle that I could never bring myself to write on." },
{ t: "The first room", b: "The first room I ever dreamed was very small: a bed, a window and one wall I never finished. I meant to put a picture on it, and then I meant to write something on it, and in the end I left it bare. I am a little ashamed of that wall, and a little proud of it. Up in the attic of that dream I left the smallest thing I owned, and I always meant to go back for it." },
{ t: "On names", b: "I never signed anything I made. It always seemed to me that a world should not have a name in the corner like a painting. But I did leave my name in one place, where nobody would ever look unless they had walked every road I walked. That seemed fair." },
{ t: "On being wrong", b: "You will be wrong. I was wrong about almost everything the first time. The trick is to be wrong slowly and carefully, and to notice exactly how you were wrong, because the shape of a wrong answer is the best map there is to the right one." },
{ t: "On the others", b: "You are not alone in this. Every name on the board by the Gate belongs to somebody walking the same roads, reading the same pages, getting the same things wrong. Talk to them. Share what you like. Only one of you walks through first, but none of you has to walk alone." },
{ t: "The last entry", b: "If you have read this far, you know more about me than most people who met me. Go and find my keys. Then, when you are standing at the Gate with all three in your hand, remember the first room. It is the last door, and the smallest one." }
];
function dkArchMesh(col, lines) { return __ZC(209, 19, this, arguments, new.target); }
function dkLecternMesh() { return __ZC(209, 20, this, arguments, new.target); }
function dkHarpMesh(ice) { return __ZC(209, 21, this, arguments, new.target); }
function dkWardenMesh() { return __ZC(209, 22, this, arguments, new.target); }
function dkPlaceMesh(kind) { return __ZC(209, 23, this, arguments, new.target); }
function dkPlacePrompt(kind, stp) { return __ZC(209, 24, this, arguments, new.target); }
function dkMode(m) { DK.mode = m; DK.open = true; DK.msg = ""; dkPaint(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function dkWaitSay(o) { if (o && o.wait && DK.st && DK.st.me) {
DK.st.me.wait = o.wait;
DK.at = Date.now();
} }
function dkStepWon(o) { DK.mode = null; dkChime(true); if (o && o.page && o.page.title)
DK.newPage = o.page; DK.msg = ""; dkSay(esc((o && o.say) || "")); return dkLoad(); }
function dkAlmanacHtml() { return __ZC(209, 25, this, arguments, new.target); }
function dkStonesBegin() { return __ZC(209, 26, this, arguments, new.target); }
function dkStonesDeal() { var S = DK.stones, n; do {
n = 13 + Math.floor(Math.random() * 18);
} while (n % 4 === 0); S.pile = n; S.turn = "you"; }
function dkStonesTake(k) { return __ZC(209, 27, this, arguments, new.target); }
function dkStonesHtml() { return __ZC(209, 28, this, arguments, new.target); }
function dkStarsBegin() { return __ZC(209, 29, this, arguments, new.target); }
function dkStarsMove(d) { var G = DK.stars; if (!G || G.over)
return; G.lane = Math.max(0, Math.min(4, G.lane + d)); }
function dkStarsLoop() { return __ZC(209, 30, this, arguments, new.target); }
function dkStarsHtml() { return __ZC(209, 31, this, arguments, new.target); }
var DK_PLAY = [["LAMPLIGHTER", "Every night I climb, and every night the dark comes back."], ["CHILD", "Then why do you climb?"], ["LAMPLIGHTER", "Because somebody has to walk home."],
["MOON", "I have watched you for a hundred years, little flame."], ["CHILD", "Can the moon talk?"], ["MOON", "Only to the ones who are still awake."], ["LAMPLIGHTER", "Then keep her awake, child. I am tired."],
["CHILD", "I will light the last lamp myself."], ["MOON", "Then I will hold the sky still until you reach it."], ["LAMPLIGHTER", "Mind the ninth rung. It was never mended."], ["CHILD", "I am not afraid of the dark."], ["MOON", "Nobody is, who carries a light."]];
var DK_ROLES = { LAMPLIGHTER: "the Lamplighter", CHILD: "the Child", MOON: "the Moon" };
function dkPlayRole() { var CL = dkClue(); return (CL && CL.data && CL.data.role) || "CHILD"; }
function dkPlayBegin() {
if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>The First Gate.</b> Sign in to walk the trail.");
return;
}
DK.play = { i: 0, mine: [], shown: [], role: dkPlayRole(), cue: -1 };
dkMode("play");
dkPlayNext();
}
function dkPlayNext() { return __ZC(209, 32, this, arguments, new.target); }
function dkPlayLine() { return __ZC(209, 33, this, arguments, new.target); }
function dkPlaySend() { return __ZC(209, 34, this, arguments, new.target); }
function dkPlayHtml() { return __ZC(209, 35, this, arguments, new.target); }
var DK_TALEQ = ["What name is painted on the bow of the boat the Dreamwright's grandfather never finished?",
"How many steps climb from the door of the lighthouse on the point to its lamp?",
"What did the Dreamwright's grandmother carry in her left pocket, every day of her life?"];
var DK_TALE = {
steps: { n: "The Steps", d: "You stand at the top of stone steps that go down into green water, though the steps themselves stay strangely dry. A brass lamp hangs on a hook. A tinderbox lies on the bottom dry step. The steps go down." },
reading: { n: "The Reading Room", d: "Long tables stand under a foot of still water, and chairs float about like sleepy boats. On the far wall is a card catalogue with one drawer pulled out. Doorways lead north and east; the steps go up." },
stacks: { n: "The Stacks", d: "Shelves run away into the dark in nine rows, each with a brass number plate, one to nine. The water is up to your knees and very cold. The Reading Room is south." },
maps: { n: "The Map Room", d: "A great chart of the sea is painted on the floor, half under water. Three iron wheels are set in the wall, each marked TIDE, each turned to HIGH. In the east wall is a heavy round door. The Reading Room is west." },
vault: { n: "The Vault", d: "It is dry here, and very quiet. At a desk sits a woman made of water, with ink on her fingers. Shelves of sleeping books rise behind her. The Map Room is west." }
};
function dkTaleBegin() { return __ZC(209, 36, this, arguments, new.target); }
function dkTaleSay(t, me) { var T = DK.tale; T.log.push({ t: t, me: !!me }); if (T.log.length > 14)
T.log = T.log.slice(-14); dkPaint(); var lg = document.getElementById("dk-tlog"); if (lg)
lg.scrollTop = lg.scrollHeight; }
function dkTaleLook() { return __ZC(209, 37, this, arguments, new.target); }
function dkTaleLady() { return __ZC(209, 38, this, arguments, new.target); }
function dkTaleGo(dir) { return __ZC(209, 39, this, arguments, new.target); }
function dkTaleCmd(raw) { return __ZC(209, 40, this, arguments, new.target); }
function dkTaleRead(what) { return __ZC(209, 41, this, arguments, new.target); }
function dkTaleRow(c) { return __ZC(209, 42, this, arguments, new.target); }
function dkTaleHtml() { return __ZC(209, 43, this, arguments, new.target); }
var DK_HARP = [["C", "c4", 261.63], ["D", "d4", 293.66], ["E", "e4", 329.63], ["F", "f4", 349.23], ["G", "g4", 392.0], ["A", "a4", 440.0], ["B", "b4", 493.88], ["C", "c5", 523.25]];
function dkHarpBegin() { if (!(typeof signedIn === "function" && signedIn())) {
dkSay("<b>A harp.</b> Sign in to walk the trail.");
return;
} DK.harp = { notes: [] }; dkMode("harp"); }
function dkHarpPluck(i) { var H = DK.harp, s = DK_HARP[i]; if (!H || !s)
return; if (H.notes.length >= 16)
return; H.notes.push(i); if (typeof playTone === "function")
playTone(s[2], 0.45); H.say = ""; dkPaint(); }
function dkHarpSend() { return __ZC(209, 44, this, arguments, new.target); }
function dkHarpHtml() { return __ZC(209, 45, this, arguments, new.target); }
function dkRoomBegin() { DK.room = DK.room || { at: "little", speck: false, seen: false, say: "The veil parts. You step through into a very small room." }; dkMode("room"); }
var DK_ROOMS = {
little: { n: "The first room", d: "It is very small: a narrow bed with a patched quilt, a window full of stars, and one wall that is completely bare, as if someone meant to put something there and never did. A door leads out.",
acts: [["window", "Look out of the window"], ["wall", "Touch the bare wall"], ["closer", "Look closer"], ["corridor", "Go through the door"]] },
corridor: { n: "A long corridor", d: "Seven doors, all painted shut, line the walls. At the far end a ladder climbs into a square of darkness.",
acts: [["doors", "Try a door"], ["closer", "Look closer"], ["attic", "Climb the ladder"], ["little", "Go back to the first room"]] },
attic: { n: "The attic", d: "Low beams, old trunks, the smell of dust and summer. A round window lets in a grey light.",
acts: [["trunk", "Open a trunk"], ["closer", "Look closer"], ["corridor", "Climb down"]] }
};
function dkRoomAct(a) { return __ZC(209, 46, this, arguments, new.target); }
function dkRoomSign() { return __ZC(209, 47, this, arguments, new.target); }
function dkRoomHtml() { return __ZC(209, 48, this, arguments, new.target); }
var DK_TESTAMENT = "To every dreamer who walks into Somnucor: I made this world one dream at a time, and I have hidden my keys inside it. Three keys, in three worlds, at the end of three long trails, and each key opens a gate of its own before it lets you go on. The first clue is a verse; after that, every clue is earned. I have left you my Almanac, the book of everything I loved: read it closely, because most of what you need is in it, and some of it is hidden in the letters themselves. My journal is scattered along the way. Whoever walks every trail, passes every gate, answers the Gate of Dreams and finds what I left in the first room I ever dreamed wins this season's prize, and their name is carved on the Gate for as long as the city stands. Look closely. Remember everything. Nothing worth finding gives itself up to the first guess.";
var DK_STEPNAMES = { find: "a mark to find", lore: "a question", game: "the Warden's game", trial: "the key's trial", play: "the First Gate", almanac: "the notched letters", tale: "the drowned library", arcade: "the Second Gate", song: "the harp", final: "the Gate's question", hidden: "the first room" };
var DK_STEPKIND = ["find", "lore", "game", "trial", "play", "find", "almanac", "tale", "trial", "arcade", "find", "lore", "song", "trial", "final", "hidden"];
var DK_GROUPS = [[0, 4], [5, 9], [10, 13], [14, 15]];
function dkWait() { var m = dkMe(), w = +(m.wait || 0); if (!w || !DK.at)
return 0; return Math.max(0, Math.ceil(w - (Date.now() - DK.at) / 1000)); }
function dkWaitText(w) { return w >= 120 ? Math.ceil(w / 60) + " minutes" : w + " seconds"; }
function dkHtml() { return __ZC(209, 49, this, arguments, new.target); }
var DK_GLYPHS = ["☾", "✦", "♁", "☼", "⚶", "♆", "⚷", "☄", "♃", "✧", "⚘", "♄"];
function dkMemStart() { return __ZC(209, 50, this, arguments, new.target); }
function dkGateHtml() { return __ZC(209, 51, this, arguments, new.target); }
function dkGlyph(i) { return __ZC(209, 52, this, arguments, new.target); }
function dkFinal() { return __ZC(209, 53, this, arguments, new.target); }
function dkLore() { return __ZC(209, 54, this, arguments, new.target); }
function dkAgo(t) { var d = (Date.now() - new Date(t).getTime()) / 1000; if (!(d >= 0))
return ""; return d < 90 ? "just now" : d < 5400 ? Math.round(d / 60) + " min ago" : d < 129600 ? Math.round(d / 3600) + " h ago" : Math.round(d / 86400) + " days ago"; }
function dkHtmlRest() { return __ZC(209, 55, this, arguments, new.target); }
function dkPaint() {
var el = document.getElementById("dk-box");
if (!DK.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "dk-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(470px,calc(100vw - 32px));max-height:min(80vh,660px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(20,16,30,.97),rgba(9,8,14,.98));border:1px solid #8A7A4A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { var id = e.target && e.target.id; if (e.code === "Enter" && id === "dk-line") {
e.preventDefault();
dkPlayLine();
} if (e.code === "Enter" && id === "dk-cmd") {
e.preventDefault();
var cv3 = e.target.value;
e.target.value = "";
dkTaleCmd(cv3);
} if (e.code === "Enter" && id === "dk-ans") {
e.preventDefault();
dkAnswer();
} if (e.code === "Enter" && id === "dk-lore") {
e.preventDefault();
dkLore();
} if (e.code === "Enter" && id === "dk-final") {
e.preventDefault();
dkFinal();
} e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-dk]") : null;
if (!t)
return;
var a = t.getAttribute("data-dk");
if (a === "close") {
DK.open = false;
DK.riddle = false;
if (DK.newPage && DK.afterPage !== "room")
DK.newPage = null;
if (DK.duel && DK.duel.over)
DK.duel = null;
if (DK.mode === "play")
DK.play = null;
if (DK.mode === "stars")
DK.stars = null;
if (DK.mode === "stones")
DK.stones = null;
DK.mode = null;
dkPaint();
return;
}
if (a === "answer")
return dkAnswer();
if (a === "lore")
return dkLore();
if (a === "final")
return dkFinal();
if (a === "glyph")
return dkGlyph(+t.getAttribute("data-i"));
if (a === "gqx") {
DK.gq = null;
DK.msg = "";
dkPaint();
return;
}
if (a === "pagex") {
DK.newPage = null;
if (DK.afterPage === "room") {
DK.afterPage = null;
dkRoomBegin();
return;
}
dkPaint();
return;
}
if (a === "almanac") {
if (DK.mode === "play")
return;
dkMode("almanac");
return;
}
if (a === "modex") {
if (DK.mode === "play")
DK.play = null;
if (DK.mode === "stars")
DK.stars = null;
if (DK.mode === "stones")
DK.stones = null;
if (DK.mode === "harp")
DK.harp = null;
DK.mode = null;
dkPaint();
return;
}
if (a === "take")
return dkStonesTake(+t.getAttribute("data-k"));
if (a === "stars")
return dkStarsBegin();
if (a === "sl")
return dkStarsMove(-1);
if (a === "sr")
return dkStarsMove(1);
if (a === "play")
return dkPlayBegin();
if (a === "line")
return dkPlayLine();
if (a === "cmd") {
var ci = document.getElementById("dk-cmd");
if (ci) {
var cv2 = ci.value;
ci.value = "";
dkTaleCmd(cv2);
}
return;
}
if (a === "tgo")
return dkTaleCmd(t.getAttribute("data-d"));
if (a === "pluck")
return dkHarpPluck(+t.getAttribute("data-i"));
if (a === "hclear") {
if (DK.harp) {
DK.harp.notes = [];
DK.harp.say = "";
}
dkPaint();
return;
}
if (a === "hsend")
return dkHarpSend();
if (a === "ract")
return dkRoomAct(t.getAttribute("data-a"));
if (a === "room")
return dkRoomBegin();
if (a === "through") {
DK.room = null;
DK.mode = null;
DK.open = false;
dkPaint();
dkGateOpen();
return;
}
if (a === "spare") {
cityRpc("hunt_spare", {}).then(function (o) { DK.msg = (o && o.say) || ""; return dkLoad(); }).catch(function (e4) { DK.msg = (e4 && e4.message) || String(e4); dkPaint(); });
return;
}
if (a === "signature") {
var sv = ((document.getElementById("dk-signature") || {}).value || "");
cityRpc("hunt_set_signature", { p_text: sv }).then(function (o) { DK.msg = (o && o.say) || "It would not save."; return dkLoad(); }).catch(function (e5) { DK.msg = (e5 && e5.message) || String(e5); dkPaint(); });
return;
}
if (a === "testament") {
var tv = ((document.getElementById("dk-testament") || {}).value || "");
cityRpc("hunt_set_testament", { p_text: tv }).then(function (o) { DK.msg = (o && o.say) || "It would not save."; return dkLoad(); }).catch(function (e3) { DK.msg = (e3 && e3.message) || String(e3); dkPaint(); });
return;
}
if (a === "strike")
return dkStrike();
if (a === "duel")
return dkDuelStart();
if (a === "duelx") {
DK.duel = null;
dkPaint();
return;
}
if (a === "season") {
var v = +((document.getElementById("dk-prize") || {}).value || 25000);
if (!window.confirm("Start a new season of the hunt? Every score starts again and the keys move."))
return;
var pt = ((document.getElementById("dk-ptext") || {}).value || "").trim();
cityRpc("hunt_new_season", { p_prize: v, p_text: pt || null }).then(function (o) { DK.msg = (o && o.ok) ? "A new season has begun. The keys have moved." : ((o && o.say) || "It would not start."); DK.pos = {}; dkClear(); return dkLoad(); }).catch(function (e2) { DK.msg = (e2 && e2.message) || String(e2); dkPaint(); });
}
});
document.body.appendChild(el);
}
el.style.display = "block";
var fid = document.activeElement && /^dk-(ans|lore|final|testament|line|cmd|signature)$/.test(document.activeElement.id) ? document.activeElement.id : null, focus = !!fid, typed = focus ? document.activeElement.value : null, top = el.scrollTop;
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 16px var(--serif,Georgia);color:#F0E0B8">🗝️ The Dreamer\'s Keys</b>' +
'<button class="btn" data-dk="close">Close</button></div>' + (DK.busy && !DK.at ? '<div style="color:var(--dim)">Asking the city…</div>' : '') + dkHtml();
el.scrollTop = top;
var sc = document.getElementById("dk-stars");
if (sc)
sc.addEventListener("pointerdown", function (ev) { var r = sc.getBoundingClientRect(); dkStarsMove(ev.clientX < r.left + r.width / 2 ? -1 : 1); ev.preventDefault(); });
var tl = document.getElementById("dk-tlog");
if (tl)
tl.scrollTop = tl.scrollHeight;
if (focus) {
var inp = document.getElementById(fid);
if (inp) {
inp.value = typed;
inp.focus();
}
}
else if (DK.riddle) {
var i2 = document.getElementById("dk-ans");
if (i2)
try {
i2.focus();
}
catch (e) { }
}
}
function dkAnswer() {
var v = ((document.getElementById("dk-ans") || {}).value || "").trim();
if (!v)
return;
if (!(typeof signedIn === "function" && signedIn())) {
DK.msg = "Sign in to keep the keys you win.";
dkPaint();
return;
}
DK.msg = "…";
dkPaint();
dkClaim(1, v);
}
function dkOpen() { DK.open = !DK.open; if (DK.open) {
DK.msg = "";
dkLoad();
} dkPaint(); if (DK.open && document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!DK.open; }, close: function () { DK.open = false; DK.riddle = false; if (DK.mode === "play")
DK.play = null; if (DK.mode === "stars")
DK.stars = null; if (DK.mode === "stones")
DK.stones = null; DK.mode = null; dkPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-hunt"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-hunt";
b.title = "The Dreamer's Keys: the city's great hunt";
b.textContent = "🗝️ The hunt";
b.onclick = dkOpen;
var pk = document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
(function () {
if (typeof openInterp !== "function")
return;
var oi = openInterp;
openInterp = function () {
var r = oi.apply(this, arguments);
try {
var CL = dkClue(), body = document.getElementById("x-body");
if (CL && CL.kind !== "final" && CL.kind !== "hidden" && dkNew() && dkSteps() < 14 && body && !document.getElementById("x-hunt")) {
var d = document.createElement("div");
d.id = "x-hunt";
d.className = "x-own";
d.innerHTML = '<h3>Pencilled in the margin</h3><p style="font-style:italic">In a hand that is not the author\'s: "' + esc(String(CL.clue).replace(/^(The Opening Verse|Read your key)[.:]\s*/, "").replace(/\s+/g, " ").split(/[.;:] /)[0]) + '…"</p>' +
'<p style="font-family:var(--sans);font-size:12px;color:var(--dim)">A clue for the Dreamer\'s Keys, the city\'s great hunt (Menu, 🗝️ The hunt).</p>';
var foot = body.querySelector(".x-foot");
if (foot)
body.insertBefore(d, foot);
else
body.appendChild(d);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof llmBody !== "function")
return;
var lb = llmBody;
llmBody = function (c, extra) {
try {
if (extra && extra.talk === "deity" && Array.isArray(extra.messages) && extra.messages[0] && extra.messages[0].role === "system") {
var n = dkNext(), CL = dkClue(), st = dkSteps(), M = dkMarks()[st], K = n ? dkSet()[n - 1] : null;
var where = (CL && M && (M.kind || "find") === CL.kind) ? dkPlaceName(M.w) : (CL && (CL.kind === "trial" || CL.kind === "game") && K) ? K.hint : null;
var hint = (n || (CL && CL.kind !== "final" && CL.kind !== "hidden")) ? "The city's great hunt, the Dreamer's Keys, is on, and it is meant to be very hard. " + (where ? "The dreamer's next step lies somewhere in " + where + "." : CL && CL.kind === "lore" ? "The dreamer's next step is a question whose answer is hidden in the worlds' secrets and stories." : CL && CL.kind === "almanac" ? "The dreamer's next step is hidden in the letters of the Dreamwright's Almanac itself." : "") +
" If, and only if, the dreamer asks about the hunt, the keys or a clue, answer in a single riddling sentence that hints, never plainly. Never name a place outright, never give any answer, never repeat a clue word for word." :
"The dreamer holds all three of the Dreamer's Keys; if they ask about the hunt, tell them the Gate of Dreams waits on the Tower Plaza.";
extra = Object.assign({}, extra, { messages: [{ role: "system", content: extra.messages[0].content + " " + hint }].concat(extra.messages.slice(1)) });
}
}
catch (e) { }
return lb.call(this, c, extra);
};
})();
