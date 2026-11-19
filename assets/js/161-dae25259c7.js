/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SC = { m: null, drones: [], saberCol: 0x5AB8FF, swing: 0, settle: {}, settleG: null, hold: null, trainG: null };
if (typeof S === "function") {
S("phaser", "infra", [.4, .2, .3], [
{ g: "box", s: [.2, .06, .05], p: [.03, .09, 0], c: 0xC8CCD4 },
{ g: "box", s: [.06, .12, .05], p: [-.05, .04, 0], r: [0, 0, .3], c: 0x2A2E36 },
{ g: "sph", s: [.025], p: [.14, .09, 0], c: 0xFF5A3A, glow: 1, pulse: 1 }
], ["phaser", "ray gun", "raygun", "blaster", "stun gun", "laser gun", "laser pistol", "a phaser"]);
S("lasersword", "infra", [1.1, .2, .2], [
{ g: "cyl", s: [.025, .025, .26, 10], p: [-.4, .05, 0], r: [0, 0, 1.5708], c: 0x8A8E96 },
{ g: "cyl", s: [.018, .018, .8, 8], p: [.13, .05, 0], r: [0, 0, 1.5708], c: 0x5AB8FF, glow: 1, pulse: 1 }
], ["laser sword", "energy sword", "light sword", "beam sword", "plasma sword", "lightsaber", "light saber", "a laser sword"]);
}
if (typeof ARMS !== "undefined") {
ARMS.phaser = { held: "phaserH", shot: "phaser", name: "phaser" };
ARMS.lasersword = { held: "laserswordH", shot: null, name: "laser sword" };
}
if (typeof SHOT !== "undefined")
SHOT.phaser = { col: 0xFF5A3A, speed: 170, len: 1.6, trail: 0xFF8A6A, lands: null };
if (typeof HELD !== "undefined") {
HELD.phaserH = function () { var g = new THREE.Group(); g.add(P(box(.05, .06, .2), mL(0xC8CCD4), 0, .1, .06)); g.add(P(box(.05, .12, .06), mL(0x2A2E36), 0, .03, -.02, .3)); g.add(P(sph(.022, 8, 6), mG(0xFF5A3A, .95), 0, .1, .17)); return g; };
HELD.laserswordH = function () { return __ZC(161, 0, this, arguments, new.target); };
}
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () {
if (carrying && carrying.archetype === "lasersword") {
if (SC.swing > 0)
return;
SC.swing = 0.45;
if (typeof playTone === "function") {
playTone(140, 0.25);
setTimeout(function () { playTone(95, 0.2); }, 120);
}
var P0 = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw), hit = false;
SC.drones.forEach(function (d) { if (d.down)
return; var w = d.g.getWorldPosition(new THREE.Vector3()); var dx = w.x - P0.x, dz = w.z - P0.z, dist = Math.hypot(dx, dz); if (dist < 3.2 && (dx * fx + dz * fz) / Math.max(dist, 0.01) > 0.4 && Math.abs(w.y - P0.y) < 2.5) {
scDroneHit(d, 2);
hit = true;
} });
if (!hit)
setStatus("The blade hums through the air.");
return;
}
return uc.apply(this, arguments);
};
})();
(function () {
if (typeof armsTick !== "function")
return;
var at = armsTick;
armsTick = function (dt) {
var was = (SC.drones.length && typeof shots !== "undefined") ? shots.map(function (s) { return { s: s, a: s.g.position.clone() }; }) : null;
var r = at.apply(this, arguments);
if (was)
was.forEach(function (q) {
var s = q.s;
if (s.done)
return;
var b = s.g.position;
SC.drones.forEach(function (d) {
if (d.down || s.done)
return;
var w = d.g.getWorldPosition(new THREE.Vector3());
if (scSegDist(q.a, b, w) < (d.big ? 4 : 1.1)) {
s.done = 1;
s.life = 0;
if (s.g.parent)
s.g.parent.remove(s.g);
var k = shots.indexOf(s);
if (k > -1)
shots.splice(k, 1);
scDroneHit(d, 1);
}
});
});
if (SC.swing > 0) {
SC.swing -= dt;
if (typeof carryMesh !== "undefined" && carryMesh && carryMesh.userData.saber) {
var k = Math.max(0, SC.swing) / 0.45;
carryMesh.rotation.x = -Math.sin(k * Math.PI) * 1.6;
carryMesh.rotation.z = Math.sin(k * Math.PI) * 0.6;
}
}
return r;
};
})();
function scSegDist(a, b, p) {
var vx = b.x - a.x, vy = b.y - a.y, vz = b.z - a.z, L = vx * vx + vy * vy + vz * vz, t = L > 0 ? ((p.x - a.x) * vx + (p.y - a.y) * vy + (p.z - a.z) * vz) / L : 0;
t = Math.max(0, Math.min(1, t));
var dx = a.x + vx * t - p.x, dy = a.y + vy * t - p.y, dz = a.z + vz * t - p.z;
return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function scGive(kind) { return __ZC(161, 1, this, arguments, new.target); }
function scQuartermaster() { return __ZC(161, 2, this, arguments, new.target); }
function scDrone(parent, x, y, z, big) { return __ZC(161, 3, this, arguments, new.target); }
function scDroneHit(d, n) { return __ZC(161, 4, this, arguments, new.target); }
function scDronesTick(dt) { return __ZC(161, 5, this, arguments, new.target); }
function scStationBuilt(G) { return __ZC(161, 6, this, arguments, new.target); }
var SC_SURVEY = ["moon", "mars", "mercury", "pluto", "venus"];
var SC_SETTLE = ["moon", "mars", "pluto", "mercury"];
function scBoard() { return __ZC(161, 7, this, arguments, new.target); }
function scPickSurvey() { var d = new Date(); return SC_SURVEY[(d.getUTCDate() + d.getUTCHours()) % SC_SURVEY.length]; }
function scMissionTitle(m) { return m.kind === "patrol" ? "Patrol of the outer beat" : m.kind === "survey" ? "Survey of " + SP_BY[m.body].name : m.kind === "settle" ? "A settlement on " + SP_BY[m.body].name : "First contact with the Veyari"; }
function scStart(kind) { return __ZC(161, 8, this, arguments, new.target); }
function scMissionBanner() { return __ZC(161, 9, this, arguments, new.target); }
function scDone() { return __ZC(161, 10, this, arguments, new.target); }
function scMissionEvent(ev) { return __ZC(161, 11, this, arguments, new.target); }
(function () {
if (typeof spHail !== "function")
return;
var h = spHail;
spHail = function (who) { var r = h.apply(this, arguments); if (who === "veyari")
scMissionEvent("hail"); return r; };
})();
var SCB = { g: null, list: [] };
function scBeaconPos(b) { var h = SP.bodies[b.host]; if (!h)
return new THREE.Vector3(); return h.position.clone().add(new THREE.Vector3(Math.cos(b.ang) * b.dist, SP_BY[b.host].r * 0.6, Math.sin(b.ang) * b.dist)); }
function scPlaceBeacons() { return __ZC(161, 12, this, arguments, new.target); }
function scClearBeacons() { if (SCB.g && SCB.g.parent)
SCB.g.parent.remove(SCB.g); SCB.g = null; SCB.list = []; if (SC.m && SC.m.probe) { } SC.drones = SC.drones.filter(function (d) { if (d.big) {
if (d.g.parent)
d.g.parent.remove(d.g);
return false;
} return true; }); }
function scMissionTick(dt) { return __ZC(161, 13, this, arguments, new.target); }
(function () {
if (typeof spChart !== "function")
return;
var ch = spChart;
spChart = function () {
ch.apply(this, arguments);
var m = SC.m;
if (!m || !WLD.card)
return;
var target = null;
if (m.kind === "patrol" && m.i < m.beacons.length)
target = { label: "Next beacon (" + (m.i + 1) + " of 5)", go: function () { spFlyTo({ pos: scBeaconPos(m.beacons[m.i]).add(new THREE.Vector3(0, 0, 0)), name: "beacon " + (m.i + 1) }); } };
if ((m.kind === "survey" || m.kind === "settle"))
target = { label: SP_BY[m.body].name + " (your mission)", go: function () { spFlyTo({ k: m.body, name: SP_BY[m.body].name, after: "Press E to land." }); } };
if (m.kind === "contact")
target = m.stage === "hail" ? { label: "The Veyari watch-station (your mission)", go: function () { spFlyTo({ station: "veyari", name: "the Veyari watch-station", after: "Press E to hail them." }); } } : { label: "The Far Gate (your mission)", go: function () { spFlyTo({ gate: 1, name: "the Far Gate", after: "Press E to fly through." }); } };
if (!target)
return;
var b = document.createElement("div");
b.innerHTML = worldBtn("mission", "★ " + target.label, "Your Space Corp mission");
var el = b.firstChild;
el.style.borderColor = "#E8C27A";
el.style.cursor = "pointer";
el.onclick = function (e) { e.stopPropagation(); target.go(); };
WLD.card.insertBefore(el, WLD.card.children[3] || null);
};
})();
(function () {
var W = WORLDS.space;
if (!W)
return;
var k = W.key_;
W.key_ = function (e) {
if (e.code === "KeyF") {
scShipFire();
return true;
}
return k ? k.call(this, e) : false;
};
})();
function scShipFire() { return __ZC(161, 14, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); if (SC.fireCool > 0)
SC.fireCool -= dt; if (WLD.on === "station")
scDronesTick(dt); };
})();
(function () {
if (typeof armsTick !== "function")
return;
var at = armsTick;
armsTick = function (dt) {
if (SC.shipShots && SC.shipShots.length) {
for (var i = SC.shipShots.length - 1; i >= 0; i--) {
var s = SC.shipShots[i];
s.g.position.x += s.dir.x * s.speed * dt;
s.g.position.y += s.dir.y * s.speed * dt;
s.g.position.z += s.dir.z * s.speed * dt;
s.g.lookAt(s.g.position.x + s.dir.x, s.g.position.y + s.dir.y, s.g.position.z + s.dir.z);
s.life -= dt;
SC.drones.forEach(function (d) { if (d.down || s.done)
return; var w = d.g.getWorldPosition(new THREE.Vector3()); if (w.distanceTo(s.g.position) < 8) {
s.done = 1;
s.life = 0;
scDroneHit(d, 1);
} });
if (s.life <= 0 || WLD.on !== "space") {
scene.remove(s.g);
SC.shipShots.splice(i, 1);
}
}
}
return at.apply(this, arguments);
};
})();
function scSurfaceBuilt(G, k) { return __ZC(161, 15, this, arguments, new.target); }
var SC_FACTS = {
moon: ["Regolith: fine grey dust and broken rock, made by billions of years of tiny meteorite impacts.", "Ice: water frozen in shadowed craters near the poles, a future source of drinking water, air and rocket fuel.", "Anorthosite: the pale rock of the Moon's highlands, some of the oldest rock we know, about 4.4 billion years old."],
mars: ["Iron oxide: the rust that colours Mars red, all the way into the sky.", "Clay and layered rock: laid down in water, long ago when Mars had lakes and rivers.", "Perchlorate salts in the soil: poisonous to people, so settlers must wash their soil before growing food in it."],
mercury: ["Hollows: strange shallow pits where something in the rock seems to have boiled away.", "Wrinkle-ridge cliffs, some 3 km high: Mercury shrank as its iron core cooled, and its crust wrinkled like a drying apple.", "Ice at the poles, hidden in craters where the Sun never shines, though the planet is closest to the Sun."],
venus: ["Basalt: dark volcanic rock covers most of Venus; it may still have active volcanoes.", "Sulphur: the yellow clouds are droplets of sulphuric acid, 50 to 70 km up.", "Surface pressure 92 times Earth's, the same as 900 metres under the sea."],
pluto: ["Nitrogen ice: soft and slowly flowing, a glacier in a world at −230 °C.", "Water ice: so cold it is as hard as rock, and Pluto's mountains are made of it.", "Tholins: reddish-brown stuff made when sunlight breaks up methane, which colours Pluto's darker ground."]
};
function scSurfacePrompt(L) { return __ZC(161, 16, this, arguments, new.target); }
function scScan(i) { return __ZC(161, 17, this, arguments, new.target); }
function scFound(x, z) { return __ZC(161, 18, this, arguments, new.target); }
function scSettlementCard(st) { return __ZC(161, 19, this, arguments, new.target); }
function scBuildSettlement(s, k) { return __ZC(161, 20, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
if (WLD.on !== "surface" || !SC.settleG)
return;
for (var id in SC.settle) {
var st = SC.settle[id];
st.g.children.forEach(function (o) { if (o.userData.settler)
wWander(o, dt, null, { r: 10, sp: 1 }); });
}
};
})();
(function () {
if (typeof wTalk !== "function")
return;
var wt = wTalk;
wTalk = function (t) { var r = wt.apply(this, arguments); if (t && /Veyari/.test(t.name) && WLD.on === "surface" && SF.k === "veyar")
scMissionEvent("meet"); return r; };
})();
