/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NV = { base: -240000, water: null, trees: null, people: [], talkers: [], croc: null, tink: null, peter: null, ship: null, solids: [], home: false, keepFly: null, tick: 0, nest: null, mermaids: [], course: 0, off: 0, stars: null, cool: 0 };
var NV_R = 680;
function nvHeight(x, z) { return __ZC(165, 0, this, arguments, new.target); }
function nvColor(x, z, h) { return __ZC(165, 1, this, arguments, new.target); }
function nvBuild(G) { return __ZC(165, 2, this, arguments, new.target); }
function nvPalm(G, x, h, z, R) { return __ZC(165, 3, this, arguments, new.target); }
function nvHangmansTree(G) { return __ZC(165, 4, this, arguments, new.target); }
function nvWendyHouse(G) { return __ZC(165, 5, this, arguments, new.target); }
function nvVillage(G) { return __ZC(165, 6, this, arguments, new.target); }
function nvLagoon(G) { return __ZC(165, 7, this, arguments, new.target); }
function landBake(G, S) { if (typeof psMerge === "function") {
try {
G.add(psMerge(S));
return;
}
catch (e) {
if (window.console)
console.warn("bake:", e);
}
} G.add(S); }
function nvLW(x0, z0, ry, lx, lz) { var c = Math.cos(ry), s = Math.sin(ry); return { x: x0 + lx * c + lz * s, z: z0 - lx * s + lz * c }; }
function nvPut(G, seed, o, x, z, talk, wander, ry) {
var g = wPerson(seed, o);
g.position.set(x, Math.max(nvHeight(x, z), 0), z);
g.rotation.y = ry || 0;
G.add(g);
var P = { g: g, wander: wander, talk: talk };
NV.people.push(P);
if (talk)
NV.talkers.push({ p: P, r: 4, name: talk.name, t: talk });
return P;
}
var NV_CAY = { x: -200, z: 880, r: 9 };
function nvCayAt(x, z) { var d = Math.hypot(x - NV_CAY.x, z - NV_CAY.z); return d < NV_CAY.r - 0.4 ? -0.5 + 0.16 * Math.sqrt(NV_CAY.r * NV_CAY.r - d * d) : null; }
function nvReefs(G) { return __ZC(165, 8, this, arguments, new.target); }
function nvCraft() { return __ZC(165, 9, this, arguments, new.target); }
function nvDecayHut(G) { return __ZC(165, 10, this, arguments, new.target); }
function nvTailors(G) { return __ZC(165, 11, this, arguments, new.target); }
function nvRiverCaves(G) { return __ZC(165, 12, this, arguments, new.target); }
function nvJohnsBoat(G) { return __ZC(165, 13, this, arguments, new.target); }
var NV_FLAM = { x: -450, z: 0, r: 34, hx: -412 };
function nvLeafHouse(G) { return __ZC(165, 14, this, arguments, new.target); }
function nvWolf() { return __ZC(165, 15, this, arguments, new.target); }
function nvFlamingo(fly) { return __ZC(165, 16, this, arguments, new.target); }
function nvFlamingoes(G) { return __ZC(165, 17, this, arguments, new.target); }
function nvRoundPond(G) { return __ZC(165, 18, this, arguments, new.target); }
function nvPudding(G) { return __ZC(165, 19, this, arguments, new.target); }
function nvShip() { return __ZC(165, 20, this, arguments, new.target); }
function nvJollyRoger(G) { return __ZC(165, 21, this, arguments, new.target); }
function nvCroc(G) { return __ZC(165, 22, this, arguments, new.target); }
function nvPeople(G) { return __ZC(165, 23, this, arguments, new.target); }
worldDef("neverland", {
base: NV.base, far: 9000, ownSky: true, tone: 784, bound: 2600,
env: function () { return __ZC(165, 24, this, arguments, new.target); },
build: function (G) { nvBuild(G); },
enter: function (opt) { return __ZC(165, 25, this, arguments, new.target); },
leave: function () { if (typeof canFly !== "undefined")
canFly = NV.keepFly || false; },
ground: function (x, z) { if (NV.home)
return -40; var d = NV.ship ? nvDeckAt(x, z) : null; if (d !== null)
return d; var cy = nvCayAt(x, z); if (cy !== null)
return cy; return Math.max(nvHeight(x, z), -1.3); },
block: function (x, z, feet) {
if (NV.home)
return Math.hypot(x + 120, z - 250) > 13;
return worldSolidAt(NV.solids, x, z, feet);
},
tick: function (dt) { nvTick(dt); },
back: function () { if (NV.home) {
nvOutOfHome();
return;
} worldHome("<b>Home again,</b> before anyone noticed you had gone. The second star winks."); }
});
function nvDeckAt(x, z) { return __ZC(165, 26, this, arguments, new.target); }
function nvIntoHome() { NV.home = true; camera.position.set(NV.base - 120, -40 + 1.72, 250 + 8); yaw = Math.PI; pitch = 0; if (typeof flyY !== "undefined")
flyY = 0; setStatus("<b>The Home Under the Ground.</b> Down the hollow tree, as the Lost Boys go. Back (or E at the tree's roots) to climb out."); }
function nvOutOfHome() { NV.home = false; camera.position.set(NV.base - 120, nvHeight(-120, 256) + 1.72, 256); yaw = 0; pitch = 0; setStatus("Out into the Never Wood."); }
function nvTick(dt) { return __ZC(165, 27, this, arguments, new.target); }
function nvWhere(x, z) { return __ZC(165, 28, this, arguments, new.target); }
var NVS = { g: null, dir: null, hold: 0, lost: 0, last: null, told: 0 };
function nvStarsBuild() {
var g = new THREE.Group();
NVS.dir = new THREE.Vector3(0.62, 0.2, -0.76).normalize();
var right = new THREE.Vector3().crossVectors(NVS.dir, new THREE.Vector3(0, 1, 0)).normalize();
var s1 = wGlow(0xE8F0FF, 46, 0.95), s2 = wGlow(0xFFF4D8, 58, 1);
s1.position.copy(NVS.dir).multiplyScalar(2400).addScaledVector(right, -150).add(new THREE.Vector3(0, 25, 0));
s2.position.copy(NVS.dir).multiplyScalar(2400).addScaledVector(right, 40);
s1.material.depthTest = true;
s2.material.depthTest = true;
s1.renderOrder = -8;
s2.renderOrder = -8;
g.add(s1);
g.add(s2);
NVS.second = s2;
NVS.target = s2.position.clone().normalize();
scene.add(g);
NVS.g = g;
}
function nvStarsTick(dt) {
if (!NVS.g) {
if (typeof scene === "undefined" || !scene)
return;
nvStarsBuild();
}
var night = (typeof stars !== "undefined" && stars && stars.material) ? stars.material.opacity : 0;
var on = walkMode && !WLD.on && !store.inside && night > 0.3 && !(typeof UG2 !== "undefined" && UG2.on) && !(typeof MALL !== "undefined" && MALL.on);
NVS.g.visible = on;
if (!on) {
NVS.hold = 0;
return;
}
var P = camera.position;
NVS.g.position.set(P.x, 0, P.z);
var tw = 0.85 + 0.15 * Math.sin(Date.now() * 0.004);
NVS.second.material.opacity = Math.min(1, tw * (0.8 + NVS.hold / 9));
var sc = 58 * (1 + NVS.hold / 6);
NVS.second.scale.set(sc, sc, 1);
var gy = (typeof terrainY === "function") ? terrainY(P.x, P.z) : 0, up = P.y - 1.72 - gy;
var flat = new THREE.Vector3(NVS.second.position.x, 0, NVS.second.position.z).normalize();
var head = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)), aim = head.dot(flat);
var moved = NVS.last ? new THREE.Vector3(P.x - NVS.last.x, 0, P.z - NVS.last.z) : new THREE.Vector3();
NVS.last = { x: P.x, z: P.z };
var going = moved.length() > 0.05 && moved.normalize().dot(flat) > 0.8;
var aloft = up > 8;
if (aloft && aim > 0.978 && pitch > -0.45 && going) {
NVS.hold += dt;
NVS.lost = 0;
}
else {
NVS.lost += dt;
if (NVS.lost > 4)
NVS.hold = Math.max(0, NVS.hold - dt * 2);
}
if (!NVS.hint && aloft && aim > 0.85 && NVS.hold < 1) {
NVS.hint = 1;
setStatus("Two bright stars hang low over the north-east. <i>Second to the right, and straight on till morning:</i> fly toward the right-hand one.");
}
if (NVS.hold > 3 && NVS.told < 1) {
NVS.told = 1;
setStatus("The star on the right seems to be getting brighter. Keep flying toward it.");
if (typeof playTone === "function")
playTone(2093, 0.15);
}
if (NVS.hold > 7 && NVS.told < 2) {
NVS.told = 2;
setStatus("<i>Straight on…</i> The sky ahead is paling, as if it were nearly morning.");
}
if (NVS.hold > 7) {
var k = Math.min(1, (NVS.hold - 7) / 3);
if (typeof sky !== "undefined" && sky) {
sky.material.uniforms.low.value.lerp(new THREE.Color(0xFFC8A0), k * 0.8);
sky.material.uniforms.top.value.lerp(new THREE.Color(0xC8A0D8), k * 0.6);
}
}
if (NVS.hold > 10) {
NVS.hold = 0;
NVS.told = 0;
NVS.lost = 0;
if (typeof spFlash === "function")
spFlash(0xFFE8C8);
worldGo("neverland");
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
nvStarsTick(dt);
}
catch (e) {
if (window.console)
console.warn("star:", e);
} };
})();
