/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var IP = { PC: { x: 420, z: 30 }, GL: 24, F: 24.3, FY: 0.5, built: false, pg: null, solids: [], mazes: [], people: [], spots: [], spin: [], drift: [], doors: {},
open: { stair: false, blades: false, armour: false }, dragon: null, mixer: null, breath: null, care: null, inside: "", t: 0 };
function ipW(px, pz) { return { x: IP.PC.x - pz, z: IP.PC.z + px }; }
function ipL(x, z) { return { px: z - IP.PC.z, pz: IP.PC.x - x }; }
function ipBox(px, pz, hw, hd, b, h) { var w = ipW(px, pz); IP.solids.push({ x: w.x, z: w.z, hw: hd, hd: hw, b: b, h: h }); }
function ipRound(px, pz, r, b, h) { var w = ipW(px, pz); IP.solids.push({ x: w.x, z: w.z, r: r, b: b, h: h }); }
(function () {
if (typeof npHeight !== "function")
return;
var h0 = npHeight;
npHeight = function (x, z) {
var h = h0(x, z), l = ipL(x, z);
var dx = Math.max(0, Math.abs(l.px) - 152), dz = Math.max(0, l.pz - 242, -170 - l.pz), d = Math.hypot(dx, dz);
if (d >= 95)
return h;
var t = 1 - d / 95;
t = t * t * (3 - 2 * t);
return h + (IP.GL - h) * t;
};
})();
var IPM = null;
function ipTexStone() { return __ZC(196, 0, this, arguments, new.target); }
function ipTexMarble() { return __ZC(196, 1, this, arguments, new.target); }
function ipTexCarpet() { return __ZC(196, 2, this, arguments, new.target); }
function ipTexBooks() { return __ZC(196, 3, this, arguments, new.target); }
function ipTexLeaf() { return __ZC(196, 4, this, arguments, new.target); }
function ipMats() { return __ZC(196, 5, this, arguments, new.target); }
function ipGeo(w, h, d, tile) {
var g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv, T = tile || 3;
var dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
for (var f = 0; f < 6; f++)
for (var k = 0; k < 4; k++) {
var i = f * 4 + k;
uv.setXY(i, uv.getX(i) * dims[f][0] / T, uv.getY(i) * dims[f][1] / T);
}
return g;
}
function ipB(S, w, h, d, mat, x, y, z, tile) { var m = new THREE.Mesh(ipGeo(w, h, d, tile), mat); m.position.set(x, y, z); S.add(m); return m; }
function ipC(S, rt, rb, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 14), mat); m.position.set(x, y, z); S.add(m); return m; }
function ipK(S, r, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg || 10), mat); m.position.set(x, y, z); S.add(m); return m; }
function ipS(S, r, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 14, Math.max(8, (seg || 14) * 0.6 | 0)), mat); m.position.set(x, y, z); S.add(m); return m; }
function ipWall(S, along, c, a0, a1, y0, h, t, mat, gaps, solid) { return __ZC(196, 6, this, arguments, new.target); }
function ipTower(S, px, pz, r, h, y0, spire) { return __ZC(196, 7, this, arguments, new.target); }
function ipGrounds(S, D) { return __ZC(196, 8, this, arguments, new.target); }
function ipBanner(D, px, pz, y, rot) { return __ZC(196, 9, this, arguments, new.target); }
function ipSigil(x, cx, cy, r, col, crown) { return __ZC(196, 10, this, arguments, new.target); }
function ipLantern(S, D, px, pz) { return __ZC(196, 11, this, arguments, new.target); }
function ipSculpture(S, kind, px, pz) { return __ZC(196, 12, this, arguments, new.target); }
function ipMaze(D, x0, z0, nx, nz, C, seed, doorSide) { return __ZC(196, 13, this, arguments, new.target); }
function ipMazeBlock(px, pz) { return __ZC(196, 14, this, arguments, new.target); }
function ipHeart() { return __ZC(196, 15, this, arguments, new.target); }
function ipKeep(S, D) { return __ZC(196, 16, this, arguments, new.target); }
function ipChandelier(S, D, px, y, pz, r) { return __ZC(196, 17, this, arguments, new.target); }
function ipChair(S, px, pz, rot, mat) { return __ZC(196, 18, this, arguments, new.target); }
function ipShelf(S, px, pz, w, h, rot) { return __ZC(196, 19, this, arguments, new.target); }
function ipGoldHeap(S, px, pz, r) { return __ZC(196, 20, this, arguments, new.target); }
function ipChest(S, px, pz, rot, open) { return __ZC(196, 21, this, arguments, new.target); }
function ipMannequin(S, px, pz, rot, o) { return __ZC(196, 22, this, arguments, new.target); }
function ipRack(S, px, pz, rot, n) { return __ZC(196, 23, this, arguments, new.target); }
function ipShield(S, px, y, pz, rot) { return __ZC(196, 24, this, arguments, new.target); }
function ipInside(S, D) { return __ZC(196, 25, this, arguments, new.target); }
function ipThrone(S, D, px, pz, k) { return __ZC(196, 26, this, arguments, new.target); }
function ipWestWing(S, D) { return __ZC(196, 27, this, arguments, new.target); }
function ipSigilPanel(D, key, px, pz, F) { return __ZC(196, 28, this, arguments, new.target); }
function ipOpenDoor(key) { return __ZC(196, 29, this, arguments, new.target); }
function ipPlinth(S, D, px, pz) { return __ZC(196, 30, this, arguments, new.target); }
function ipEastWing(S, D) { return __ZC(196, 31, this, arguments, new.target); }
function ipThroneChair(S, px, pz, rot) { var M = ipMats(), g = new THREE.Group(); g.position.set(px, IP.F, pz); g.rotation.y = rot || 0; S.add(g); ipB(g, 1.2, 0.6, 1.2, M.iceDeep, 0, 0.3, 0); ipB(g, 1, 0.1, 1, M.velvet, 0, 0.62, 0); ipB(g, 1.2, 2.6, 0.25, M.iceDeep, 0, 1.9, -0.5); ipK(g, 0.2, 0.8, M.crystal, 0, 3.5, -0.5, 6); ipBox(px, pz, 0.7, 0.7, IP.F, 2); }
function ipAnnex(S, D) { return __ZC(196, 32, this, arguments, new.target); }
var IP_ST = { z0: -29, z1: -88 };
function ipStairY(pz) { var k = (IP_ST.z0 - pz) / (IP_ST.z0 - IP_ST.z1); k = Math.max(0, Math.min(1, k)); return IP.F - k * (IP.F - IP.FY); }
function ipStair(S, D) { return __ZC(196, 33, this, arguments, new.target); }
var IP_FG = { cz: -120, r: 32 };
function ipForge(S, D) { return __ZC(196, 34, this, arguments, new.target); }
var RELICS = [
{ key: "frostbrand", kind: "weapon", vault: "blades", name: "Frostbrand, the King's Blade", does: "F swings it: a wave of frost runs out ahead of you and freezes what it reaches." },
{ key: "hoarfang", kind: "weapon", vault: "blades", name: "Hoarfang, the Winter Spear", does: "F throws a spear of ice that bursts into frost where it lands, and the spear comes back to your hand." },
{ key: "aurorabow", kind: "weapon", vault: "blades", name: "The Aurora Bow", does: "F looses an arrow of northern light that heals wherever it lands." },
{ key: "glacierfall", kind: "weapon", vault: "blades", name: "Glacierfall, the Frost Hammer", does: "F brings it down: frost bursts all round you." },
{ key: "longnight", kind: "weapon", vault: "blades", name: "The Staff of the Long Night", does: "F casts a ward of frost-light wherever the bolt lands: a dome that shields what is inside it." },
{ key: "dragontooth", kind: "weapon", vault: "blades", name: "Dragontooth, Isvarr's Gift", does: "A dagger from a tooth the Elder Dragon shed. F: a touch of frost that freezes what is right in front of you." },
{ key: "dragonshield", kind: "weapon", vault: "armour", name: "The Shield of the Elder Dragon", does: "F raises a dome of frost round you that shields you while it stands." },
{ key: "frostplate", kind: "armour", vault: "armour", name: "Frostplate of the North King", does: "Worn: breastplate and pauldrons of ice-steel. Every relic weapon strikes twice as hard while you wear it." },
{ key: "polecrown", kind: "armour", vault: "armour", name: "The Crown of the Pole Star", does: "Worn: a steady starlight shines round you wherever you go, even in the darkest place." },
{ key: "auroramantle", kind: "armour", vault: "armour", name: "The Mantle of the Aurora", does: "Worn: you can fly. Space to rise, C to come down." },
{ key: "longsnowboots", kind: "armour", vault: "armour", name: "Boots of the Long Snow", does: "Worn: you walk and run half as fast again." }
];
var RL_BY = {};
RELICS.forEach(function (r) { RL_BY[r.key] = r; });
var RL = { worn: {}, light: null, dressed: [], cool: 0, cat: null };
try {
var rlw = JSON.parse(localStorage.getItem("sm.relics.worn") || "{}");
if (rlw && typeof rlw === "object")
RL.worn = rlw;
}
catch (e) { }
function rlOwned(key) {
if (typeof amKeeper === "function" && amKeeper())
return true;
var mine = (typeof myThings !== "undefined" && myThings) || [], R = RL_BY[key];
return mine.some(function (t) { return t && (t.archetype === "relic_" + key || (R && String(t.name || "") === R.name)); });
}
function rlMine() { return RELICS.filter(function (r) { return rlOwned(r.key); }); }
function rlHeld(key) { return __ZC(196, 35, this, arguments, new.target); }
(function () {
if (typeof ARMS === "undefined" || typeof HELD === "undefined")
return;
var shot = { hoarfang: "ice", aurorabow: "light", longnight: "rlward" };
RELICS.forEach(function (r) { if (r.kind !== "weapon")
return; ARMS["relic_" + r.key] = { held: "relic_" + r.key, shot: shot[r.key] || null, name: r.name.split(",")[0] }; HELD["relic_" + r.key] = function () { return rlHeld(r.key); }; });
if (typeof SHOT !== "undefined")
SHOT.rlward = { col: 0xCFF4FF, speed: 30, len: .6, trail: 0xCFF4FF, lands: "shieldspell" };
})();
function rlTake(key) { return __ZC(196, 36, this, arguments, new.target); }
(function () {
if (typeof dropCarried !== "function")
return;
var dc = dropCarried;
dropCarried = function (quiet) {
if (carrying && carrying.relic) {
var spec = carrying;
carrying = null;
spec.carried = false;
if (carryMesh && carryMesh.parent)
carryMesh.parent.remove(carryMesh);
carryMesh = null;
if (!quiet)
setStatus("You set the relic down; it is back in the King's keeping until you take it up again.");
return;
}
return dc.apply(this, arguments);
};
})();
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () {
if (carrying && carrying.relic) {
var key = carrying.archetype.slice(6), P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw), twice = !!RL.worn.frostplate;
if (RL.cool > 0)
return;
RL.cool = 0.6;
function at(d, side) { var x = P.x + fx * d + (side || 0) * fz, z = P.z + fz * d - (side || 0) * fx, y = (typeof supportAt === "function") ? supportAt(x, z, P.y - 1.72) : 0; if (typeof landWorking === "function")
landWorking(key === "dragonshield" ? "shieldspell" : "iceblast", x, y, z); }
if (key === "frostbrand") {
at(3.5);
if (twice) {
at(6);
at(3.5, 2);
at(3.5, -2);
}
RL.swing = 0.4;
if (typeof playTone === "function") {
playTone(520, 0.15);
setTimeout(function () { playTone(780, 0.25); }, 90);
}
setStatus("Frost runs out from the blade.");
return;
}
if (key === "glacierfall") {
at(0.6);
at(2.5, 0);
at(-0.2, 2.4);
at(-0.2, -2.4);
if (twice) {
at(4.5);
at(-2.5);
}
RL.swing = 0.45;
if (typeof playTone === "function")
playTone(90, 0.35);
setStatus("The hammer comes down; frost bursts all round you.");
return;
}
if (key === "dragontooth") {
at(1.6);
if (twice)
at(2.8);
RL.swing = 0.3;
setStatus("A touch of the dragon's frost.");
return;
}
if (key === "dragonshield") {
if (typeof landWorking === "function")
landWorking("shieldspell", P.x, (typeof supportAt === "function") ? supportAt(P.x, P.z, P.y - 1.72) : 0, P.z);
setStatus("A dome of frost rises round you.");
return;
}
var r = uc.apply(this, arguments);
if (twice && typeof shotCool !== "undefined") {
shotCool = 0;
uc.apply(this, arguments);
}
return r;
}
return uc.apply(this, arguments);
};
})();
function rlWear(key, on) { return __ZC(196, 37, this, arguments, new.target); }
function rlEffects() {
if (typeof myThings !== "undefined" && myThings && myThings.length && !(typeof amKeeper === "function" && amKeeper()))
Object.keys(RL.worn).forEach(function (k) { if (!rlOwned(k))
delete RL.worn[k]; });
if (typeof canFly !== "undefined") {
if (RL.worn.auroramantle)
canFly = true;
else if (typeof hasAbility === "function")
canFly = hasAbility("flying") || hasAbility("floating") || (typeof magicGranted !== "undefined" && !!magicGranted) || (typeof rideArch !== "undefined" && rideArch && typeof RIDE_FLIES !== "undefined" && !!RIDE_FLIES[rideArch]);
}
if (RL.worn.polecrown && !RL.light && typeof scene !== "undefined" && scene) {
RL.light = new THREE.PointLight(0xE4F2FF, 1.1, 26, 1.4);
scene.add(RL.light);
}
if (!RL.worn.polecrown && RL.light) {
if (RL.light.parent)
RL.light.parent.remove(RL.light);
RL.light = null;
}
}
(function () {
if (typeof hasAbility === "function") {
var ha = hasAbility;
hasAbility = function (n) { if (n === "flying" && RL.worn.auroramantle)
return true; return ha.apply(this, arguments); };
}
if (typeof walkBy === "function") {
var wb = walkBy;
walkBy = function (mx, mz) { if (RL.worn.longsnowboots && !(typeof riding !== "undefined" && riding)) {
mx *= 1.5;
mz *= 1.5;
} return wb.call(this, mx, mz); };
}
if (typeof meLook === "function") {
var ml = meLook;
meLook = function () { var L = ml.apply(this, arguments); try {
var k = Object.keys(RL.worn);
if (k.length)
L.relics = k;
else
delete L.relics;
}
catch (e) { } return L; };
}
if (typeof buildFigure === "function") {
var bf = buildFigure;
buildFigure = function (spec) { var g = bf.apply(this, arguments); try {
var rs = spec && spec.look && spec.look.relics;
if (g && Array.isArray(rs) && rs.length)
rlDress(g, rs);
}
catch (e) { } return g; };
}
if (typeof loadThings === "function") {
var lt = loadThings;
loadThings = function () { return Promise.resolve(lt.apply(this, arguments)).then(function (r) { try {
rlEffects();
}
catch (e) { } return r; }); };
}
})();
function rlDress(g, keys) { return __ZC(196, 38, this, arguments, new.target); }
var RL_V = null;
function rlDressTick() {
if (!RL_V)
RL_V = new THREE.Vector3();
for (var i = RL.dressed.length - 1; i >= 0; i--) {
var s = RL.dressed[i], g = s.g;
if (!g.parent) {
if (++s.gone > 600)
RL.dressed.splice(i, 1);
continue;
}
s.gone = 0;
if (!g.visible)
continue;
g.updateMatrixWorld(true);
s.parts.forEach(function (P) {
if (!P.b && !P.tried) {
g.traverse(function (o) { if (!P.b && o.isBone && P.bone.test(o.name))
P.b = o; });
if (!P.b) {
P.n = (P.n || 0) + 1;
if (P.n > 240)
P.tried = 1;
}
}
if (P.b) {
P.b.getWorldPosition(RL_V);
g.worldToLocal(RL_V);
P.o.position.copy(RL_V);
var sc = g.getWorldScale(new THREE.Vector3()).y;
P.o.scale.setScalar(1);
}
else
P.o.position.set(P.fb[0], P.fb[1], P.fb[2]);
});
}
if (typeof rlFitTick === "function")
rlFitTick(1 / 60);
if (RL.light) {
var C = camera.position;
RL.light.position.set(C.x, C.y + 1.2, C.z);
}
if (RL.cool > 0)
RL.cool -= 1 / 60;
if (RL.swing > 0 && typeof carryMesh !== "undefined" && carryMesh) {
RL.swing -= 1 / 60;
var k2 = Math.max(0, RL.swing) / 0.4;
carryMesh.rotation.x = -Math.sin(k2 * Math.PI) * 1.5;
}
}
(function () {
if (typeof renderWardrobe !== "function")
return;
var rw = renderWardrobe;
renderWardrobe = function () {
rw.apply(this, arguments);
try {
if (typeof WARD_TAB !== "undefined" && WARD_TAB !== "body")
return;
var w = document.getElementById("me-ward");
if (!w)
return;
var mine = rlMine();
if (!mine.length)
return;
var d = document.createElement("div");
d.className = "lk-row";
d.innerHTML = '<div class="lk-h">Relics</div>' + mine.map(function (r) { var on = r.kind === "armour" && RL.worn[r.key]; return '<button class="btn" data-rlw="' + r.key + '" title="' + esc(r.does) + '" style="margin:0 4px 4px 0' + (on ? ';border-color:#8FC8F0;color:#E4F4FF' : '') + '">' + esc(r.name.split(",")[0]) + (r.kind === "armour" ? (on ? " (worn)" : "") : " (take up)") + '</button>'; }).join("");
var foot = w.querySelector("p:last-of-type");
if (foot)
w.insertBefore(d, foot);
else
w.appendChild(d);
Array.prototype.forEach.call(d.querySelectorAll("[data-rlw]"), function (b) { b.onclick = function () { rlTake(b.getAttribute("data-rlw")); renderWardrobe(); }; });
}
catch (e) { }
};
})();
function rlCard(key) { return __ZC(196, 39, this, arguments, new.target); }
function rlForge(key) { return __ZC(196, 40, this, arguments, new.target); }
function ipDragon(G) { return __ZC(196, 41, this, arguments, new.target); }
var IP_V1 = null, IP_V2 = null;
function ipDragonTick(dt) { return __ZC(196, 42, this, arguments, new.target); }
var IP_CTX = "You serve in the Palace of the North King, on the snow hill east of the North Pole village in SomnuMatrix. The King of the North owns it: the largest and grandest palace in all of SomnuMatrix, of ice-stone and crystal, with spires and a great dome you can see from the village. Inside: the Throne Hall (the King's throne and his consort's beside it), the Armoury, the Banquet Hall, the Library, the King's Bedchamber, the Hot Springs and the Winter Garden. Outside: the lantern avenue, the frozen fountain, the ice sculptures, the King's Lake for skating, and two hedge labyrinths, the Winter Labyrinth and the Starlight Labyrinth, with the Frost Rose at each heart. You are proud of the palace and devoted to the King. There are things in the palace that are secret (hidden vaults, a hidden way down); never speak of them unless the person plainly already knows, or speaks as the King. Stay in character, warm and courteous, and keep replies short.";
function ipPeople(G) { return __ZC(196, 43, this, arguments, new.target); }
function ipForgeCard() { return __ZC(196, 44, this, arguments, new.target); }
function ipDragonCard() { return __ZC(196, 45, this, arguments, new.target); }
function ipTend() { return __ZC(196, 46, this, arguments, new.target); }
function ipAppointCard() { return __ZC(196, 47, this, arguments, new.target); }
function ipAppoint(on) { return __ZC(196, 48, this, arguments, new.target); }
function ipZone(L) { return __ZC(196, 49, this, arguments, new.target); }
function ipGround(x, z, feet) { return __ZC(196, 50, this, arguments, new.target); }
function ipBlock(x, z, feet) { return __ZC(196, 51, this, arguments, new.target); }
function ipTick(dt) { return __ZC(196, 52, this, arguments, new.target); }
function ipRelicsShow(D) { return __ZC(196, 53, this, arguments, new.target); }
function ipBuild(G) { return __ZC(196, 54, this, arguments, new.target); }
function ipRoad(G) { return __ZC(196, 55, this, arguments, new.target); }
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.northpole)
return;
var np = WORLDS.northpole;
if (np.env && typeof np.env === "object") {
var E0 = np.env, Ein = Object.assign({}, E0, { hemi: 0.5, sun: 0.12, fogD: 0.0006 }), Efg = Object.assign({}, E0, { hemi: 0.42, hemiCol: 0x9AC4F0, hemiGround: 0x2A3A5A, sun: 0.05, fogD: 0.0008 });
np.env = function () { return IP.zoneKind === "forge" ? Efg : IP.zoneKind === "in" ? Ein : E0; };
}
var b0 = np.build;
np.build = function (G) { b0.apply(this, arguments); try {
ipBuild(G);
}
catch (e) {
if (window.console)
console.warn("[ice palace]", e);
} };
var g0 = np.ground;
np.ground = function (x, z, feet) { var h = null; try {
h = ipGround(x, z, feet);
}
catch (e) { } if (h !== null && h !== undefined)
return h; return g0.apply(this, arguments); };
var k0 = np.block;
np.block = function (x, z, feet) { if (k0.apply(this, arguments))
return true; try {
return ipBlock(x, z, feet);
}
catch (e) {
return false;
} };
var t0 = np.tick;
np.tick = function (dt) { t0.apply(this, arguments); try {
ipTick(dt);
}
catch (e) {
if (window.console && !IP.warned) {
IP.warned = 1;
console.warn("[ice palace]", e);
}
} };
var e0 = np.enter;
np.enter = function (opt) { var r = e0.apply(this, arguments); if (opt && opt.palace) {
var w = ipW(0, 246);
camera.position.set(NP.base + w.x, IP.GL + 1.72, w.z);
yaw = -Math.PI / 2;
setStatus("<b>The Palace of the North King.</b> The gate stands open; the lantern avenue runs up to the keep.");
} return r; };
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
rlDressTick();
}
catch (e) { } };
})();
