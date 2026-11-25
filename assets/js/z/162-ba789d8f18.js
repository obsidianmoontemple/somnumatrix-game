/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(162, function () {
"use strict";
return [
function () {
var g = new THREE.Group(), col = SC.saberCol;
g.add(P(cyl(.022, .022, .24, 10), mL(0x8A8E96), 0, .02, 0));
g.add(P(cyl(.026, .026, .04, 10), mL(0x2A2E36), 0, .12, 0));
var blade = P(cyl(.016, .016, .95, 8), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), 0, .62, 0);
g.add(blade);
var aura = P(cyl(.035, .035, .98, 10), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending }), 0, .62, 0);
g.add(aura);
g.userData.saber = 1;
return g;
},
function (kind) {
var spec = { id: (typeof uid === "function" ? uid() : "sc" + Date.now()), archetype: kind, label: null, attrs: {}, x: camera.position.x, z: camera.position.z, solid: false, detail: 3, nights: [store.session], issued: true };
if (typeof pickUp === "function")
pickUp(spec);
if (kind === "phaser")
setStatus("<b>The quartermaster hands you a phaser,</b> set to stun. <b>F</b> fires it; <b>G</b> puts it down. In your shuttle, F fires the ship's own phasers.");
else
setStatus("<b>The quartermaster hands you a laser sword.</b> It ignites with a hum. <b>F</b> swings it; <b>G</b> puts it down.");
},
function () {
var cols = [["blue", 0x5AB8FF], ["green", 0x5AFF7A], ["red", 0xFF4A3A], ["violet", 0xB86AFF], ["gold", 0xFFD24A], ["white", 0xF4F8FF]];
var html = worldFacts("The quartermaster", "Station Aurora's stores", [], ["Every Space Corp crew member signs out a phaser. It is set to stun: the Corp does not kill.", "Laser swords are for training, ceremony and cutting through hull plate in an emergency."]) +
worldBtn("phaser", "A phaser", "Set to stun. F fires.") + "<div style='margin-top:8px;opacity:.8'>A laser sword, in the colour you choose:</div>";
var fns = { phaser: function () { scGive("phaser"); worldCard(null); } };
cols.forEach(function (c) { html += "<span data-w='sw-" + c[0] + "' style='display:inline-block;margin:4px;padding:5px 10px;border-radius:12px;border:1px solid #" + ("000000" + c[1].toString(16)).slice(-6) + ";color:#" + ("000000" + c[1].toString(16)).slice(-6) + "'>" + c[0] + "</span>"; fns["sw-" + c[0]] = function () { SC.saberCol = c[1]; scGive("lasersword"); worldCard(null); }; });
worldCard(html, fns);
},
function (parent, x, y, z, big) {
var g = new THREE.Group(), m = wM(big ? 0x6A6A70 : 0xD8DCE4), eye = wB(big ? 0xFF3A2A : 0x5AD8FF, { fog: false });
wSph(big ? 3 : 0.45, m, 0, 0, 0, g, 16);
wSph(big ? 1 : 0.16, eye, 0, 0, big ? 2.6 : 0.4, g, 10);
for (var i = 0; i < (big ? 6 : 3); i++) {
var a = i / (big ? 6 : 3) * Math.PI * 2, f = wBox(big ? 0.4 : 0.06, big ? 0.4 : 0.06, big ? 5 : 0.7, m, Math.cos(a) * (big ? 3 : 0.45), Math.sin(a) * (big ? 3 : 0.45), 0, g);
f.rotation.set(0, 0, a);
}
g.position.set(x, y, z);
parent.add(g);
var d = { g: g, hp: big ? 4 : 2, big: !!big, home: new THREE.Vector3(x, y, z), t: Math.random() * 6, down: false };
SC.drones.push(d);
return d;
},
function (d, n) {
d.hp -= n;
if (typeof playTone === "function")
playTone(d.hp > 0 ? 520 : 220, 0.2);
if (d.hp <= 0) {
d.down = true;
d.downAt = 0;
if (d.big) {
setStatus("<b>The rogue probe is stunned.</b> Its lights go out; the Corp will tow it in.");
if (typeof scMissionEvent === "function")
scMissionEvent("probe");
}
else
setStatus("<b>Hit.</b> The training drone drops, and resets itself.");
}
else
setStatus(d.big ? "<b>A hit.</b> The probe's shields flicker." : "<b>A hit.</b>");
},
function (dt) {
SC.drones.forEach(function (d) {
d.t += dt;
if (d.down) {
d.downAt += dt;
d.g.position.y = Math.max(d.home.y - (d.big ? 0 : 1.2), d.g.position.y - dt * 2);
d.g.rotation.z += dt * 2;
if (!d.big && d.downAt > 5) {
d.down = false;
d.hp = 2;
d.g.position.copy(d.home);
d.g.rotation.set(0, 0, 0);
}
return;
}
d.g.position.set(d.home.x + Math.sin(d.t * 0.7) * (d.big ? 30 : 1.6), d.home.y + Math.sin(d.t * 1.3) * (d.big ? 6 : 0.4), d.home.z + Math.cos(d.t * 0.5) * (d.big ? 30 : 1.2));
d.g.rotation.y += dt * (d.big ? 0.3 : 1.2);
});
},
function (G) {
var rg = new THREE.Group();
G.add(rg);
SC.trainG = rg;
var sg = wSign(["TRAINING RANGE", "Practise with a phaser or a laser sword"], 5, 1.4, "#0E1A2E", "#BFD8FF");
sg.position.set(14, 3.8, 8);
sg.rotation.y = -Math.PI / 2;
rg.add(sg);
wBox(0.1, 0.02, 16, wB(0xFFD24A), 12, 0.02, 14, rg);
for (var i = 0; i < 4; i++)
scDrone(rg, 18 + (i % 2) * 4, 1.8, 6 + i * 4, false);
},
function () {
var m = SC.m;
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Space Corp missions</div><div style='opacity:.8;margin-bottom:4px'>A branch of the Dragon Corp. Anybody may fly a mission; crew on shift at the Spaceport are paid for each one.</div>";
var fns = {};
if (m) {
html += "<div style='margin:8px 0;padding:8px;border:1px solid #E8C27A;border-radius:4px'><b>Under way:</b> " + esc(scMissionTitle(m)) + "<div style='opacity:.85'>" + scMissionBanner() + "</div></div>" + worldBtn("abandon", "Abandon this mission", "");
fns.abandon = function () { SC.m = null; scClearBeacons(); worldCard(null); setStatus("Mission abandoned."); };
}
else {
html += worldBtn("patrol", "Patrol", "Fly the five beacons of a beat across the Solar System, and stop the rogue probe loose on it.");
html += worldBtn("survey", "Survey", "Land on " + esc(SP_BY[scPickSurvey()].name) + " and scan three sites for the Corp's maps.");
html += worldBtn("settle", "Settlement", "Found a settlement, or build on to one (settlement engineers on shift).");
html += worldBtn("contact", "First contact", "Hail the Veyari, go through the Far Gate, and meet them on their own world.");
fns.patrol = function () { scStart("patrol"); };
fns.survey = function () { scStart("survey"); };
fns.settle = function () { scStart("settle"); };
fns.contact = function () { scStart("contact"); };
}
if (WLD.on !== "space" && WLD.on !== "station" && WLD.on !== "surface") {
html += "<div style='margin-top:8px;opacity:.8'>Missions are flown from orbit: the shuttle launches from the pad behind the Spaceport.</div>";
}
worldCard(html, fns);
},
function (kind) {
var m = { kind: kind, i: 0, t: 0 };
if (kind === "patrol") {
var beat = [["mars", 1.0], ["jupiter", 0.3], ["saturn", 0.9], ["uranus", 0.2], ["earth", 2.2]];
m.beacons = beat.map(function (q, i) { return { host: q[0], ang: q[1] + i, dist: SP_BY[q[0]].r * 4 + 60 }; });
m.probeAt = 2;
}
if (kind === "survey") {
m.body = scPickSurvey();
var R = wRand(m.body.length * 31 + new Date().getUTCDate());
m.sites = [0, 1, 2].map(function (i) { var a = R() * Math.PI * 2, d = 120 + R() * 380; return { x: Math.cos(a) * d, z: Math.sin(a) * d, done: false }; });
}
if (kind === "settle") {
m.body = SC_SETTLE[new Date().getUTCDate() % SC_SETTLE.length];
}
if (kind === "contact") {
m.stage = "hail";
}
SC.m = m;
worldCard(null);
if (kind === "patrol")
scPlaceBeacons();
setStatus("<b>Mission:</b> " + esc(scMissionTitle(m)) + ". " + scMissionBanner());
},
function () {
var m = SC.m;
if (!m)
return "";
if (m.kind === "patrol")
return m.i < m.beacons.length ? "Beacon " + (m.i + 1) + " of 5, near " + SP_BY[m.beacons[m.i].host].name + (m.probe && !m.probe.down ? " · <b>the rogue probe is here: F fires the ship's phasers</b>" : "") + " · the star chart flies you to it" : "Patrol done.";
if (m.kind === "survey") {
var n = m.sites.filter(function (s) { return s.done; }).length;
return n < 3 ? "Survey of " + SP_BY[m.body].name + ": " + n + " of 3 sites scanned" + (WLD.on === "surface" && SF.k === m.body ? " · follow the green beacons" : " · land there") : "Survey done.";
}
if (m.kind === "settle")
return "Land on " + SP_BY[m.body].name + " and found a settlement away from the lander, or build on to one there";
if (m.kind === "contact")
return m.stage === "hail" ? "Hail the Veyari watch-station, out by Neptune" : m.stage === "gate" ? "Fly through the Far Gate, past Pluto" : "Speak with the Veyari on Veyar";
return "";
},
function () {
var m = SC.m;
if (!m)
return;
SC.m = null;
scClearBeacons();
if (typeof playTone === "function") {
playTone(660, 0.2);
setTimeout(function () { playTone(990, 0.3); }, 200);
}
var msg = "<b>Mission complete:</b> " + esc(scMissionTitle(m)) + ".";
if (typeof cityRpc === "function")
cityRpc("space_mission_done", { p_kind: m.kind, p_body: m.body || null }).then(function (o) {
setStatus(msg + " " + esc((o && o.say) || ""));
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function () { setStatus(msg + " (The Spaceport's books could not be reached, so it was not logged.)"); });
else
setStatus(msg);
},
function (ev) {
var m = SC.m;
if (!m)
return;
if (m.kind === "patrol" && ev === "probe") {
setTimeout(function () { if (SC.m === m)
setStatus("<b>Probe stunned.</b> On to beacon " + (m.i + 1) + "."); }, 1500);
}
if (m.kind === "contact") {
if (ev === "hail" && m.stage === "hail") {
m.stage = "gate";
spLearnGate();
setStatus("<b>The Veyari answer.</b> They tell you of a gate past Pluto. It is on your star chart now.");
}
else if (ev === "gate" && m.stage === "gate")
m.stage = "meet";
else if (ev === "meet" && m.stage === "meet")
scDone();
}
},
function () {
scClearBeacons();
var W = WORLDS.space;
if (!W.g)
return;
var g = new THREE.Group();
W.g.add(g);
SCB.g = g;
SC.m.beacons.forEach(function (b, i) {
var ring = new THREE.Group(), col = 0xFFD24A;
wMesh(new THREE.TorusGeometry(22, 1.4, 8, 40), wB(col, { fog: false }), 0, 0, 0, ring);
ring.add(wGlow(col, 70, 0.5));
g.add(ring);
SCB.list.push(ring);
});
},
function (dt) {
var m = SC.m;
scDronesTick(dt);
if (!m || WLD.on !== "space")
return;
if (m.kind === "patrol") {
if (!SCB.g && WORLDS.space.g)
scPlaceBeacons();
SCB.list.forEach(function (r, i) { var p = scBeaconPos(m.beacons[i]); r.position.copy(p); r.visible = i >= m.i; r.lookAt(SP.pos.clone().add(WORLDS.space.g.position)); r.children[0].material.color.setHex(i === m.i ? 0xFFD24A : 0x6A5A2A); });
if (m.i < m.beacons.length) {
var bp = scBeaconPos(m.beacons[m.i]);
if (m.i === m.probeAt && !m.probe) {
m.probe = scDrone(WORLDS.space.g, bp.x + 60, bp.y + 10, bp.z, true);
setStatus("<b>A rogue probe</b> is drifting by the beacon. Stun it with the ship's phasers: <b>F</b>.");
}
var probeLive = m.probe && !m.probe.down && m.i === m.probeAt;
if (SP.pos.distanceTo(bp) < 30) {
if (probeLive) {
if (!m.warned) {
m.warned = 1;
setStatus("The beacon will not log you while the rogue probe is loose. Stun it first: <b>F</b>.");
}
}
else {
m.i++;
m.warned = 0;
if (typeof playTone === "function")
playTone(880, 0.2);
if (m.i >= m.beacons.length)
scDone();
else
setStatus("<b>Beacon logged.</b> On to beacon " + (m.i + 1) + " of 5, near " + esc(SP_BY[m.beacons[m.i].host].name) + ".");
}
}
}
}
},
function () {
if (SC.fireCool > 0)
return;
SC.fireCool = 0.3;
SC.shipShots = SC.shipShots || [];
var dir = { x: -Math.sin(yaw) * Math.cos(pitch), y: Math.sin(pitch), z: -Math.cos(yaw) * Math.cos(pitch) };
[-1, 1].forEach(function (s) {
var g = new THREE.Group(), b = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 9, 6), new THREE.MeshBasicMaterial({ color: 0xFF5A3A, fog: false }));
b.rotation.x = Math.PI / 2;
g.add(b);
g.add(wGlow(0xFF5A3A, 6, 0.8));
var side = { x: Math.cos(yaw) * s * 1.5, z: -Math.sin(yaw) * s * 1.5 };
g.position.set(camera.position.x + dir.x * 4 + side.x, camera.position.y + dir.y * 4 - 0.6, camera.position.z + dir.z * 4 + side.z);
scene.add(g);
SC.shipShots.push({ g: g, dir: dir, speed: 700, life: 2.5 });
});
if (typeof playTone === "function")
playTone(980, 0.08);
},
function (G, k) {
SC.settle = {};
SC.settleG = new THREE.Group();
G.add(SC.settleG);
var m = SC.m;
SC.siteG = null;
if (m && m.kind === "survey" && m.body === k) {
var sg = new THREE.Group();
G.add(sg);
SC.siteG = sg;
m.sites.forEach(function (s, i) {
var b = new THREE.Group();
var y = sfHeight(s.x, s.z);
wCyl(0.12, 0.12, 3, wM(0x8A8E96), 0, 1.5, 0, b, 6);
var lt = wSph(0.35, wB(0x5AFF7A, { fog: false }), 0, 3.2, 0, b, 10);
b.add(wGlow(0x5AFF7A, 8, 0.7));
var beam = wCyl(0.4, 0.4, 120, wB(0x5AFF7A, { op: 0.18, fog: false }), 0, 60, 0, b, 8);
b.position.set(s.x, y, s.z);
sg.add(b);
s.g = b;
});
}
if (typeof cityRpc === "function")
cityRpc("space_settlements_on", { p_body: k }).then(function (list) {
if (SF.k !== k || !Array.isArray(list))
return;
list.forEach(function (s) { scBuildSettlement(s, k); });
}).catch(function () { });
},
function (L) {
var m = SC.m, k = SF.k;
if (m && m.kind === "survey" && m.body === k && m.sites) {
for (var i = 0; i < m.sites.length; i++) {
var s = m.sites[i];
if (s.done || !wNear(L.x, L.z, s.x, s.z, 5))
continue;
worldPrompt("<b>Survey site " + (i + 1) + "</b> · <b>press E</b> to scan", function () { scScan(i); });
return true;
}
}
for (var id in SC.settle) {
var st = SC.settle[id];
if (!wNear(L.x, L.z, st.s.x, st.s.z, 22))
continue;
worldPrompt("<b>" + esc(st.s.name) + "</b> · " + st.s.modules + " module" + (st.s.modules === 1 ? "" : "s") + " · founded by " + esc(st.s.founder || "the Corp") + " · <b>press E</b>", function () { scSettlementCard(st); });
return true;
}
if (m && m.kind === "settle" && m.body === k) {
var r = Math.hypot(L.x, L.z);
if (r > 40 && r < 880) {
worldPrompt("<b>Found a settlement here</b> · <b>press E</b>", function () { scFound(L.x, L.z); });
return true;
}
}
return false;
},
function (i) {
var m = SC.m;
if (!m || !m.sites[i])
return;
worldPrompt(null);
setStatus("Scanning…");
if (typeof playTone === "function")
playTone(1200, 0.6);
setTimeout(function () {
if (SC.m !== m)
return;
m.sites[i].done = true;
if (m.sites[i].g)
m.sites[i].g.visible = false;
var f = (SC_FACTS[m.body] || [])[i] || "";
worldCard(worldFacts("Survey site " + (i + 1), SP_BY[m.body].name + " · what the instruments found", [], [f]));
if (m.sites.every(function (s) { return s.done; }))
scDone();
else
setStatus("<b>Site " + (i + 1) + " scanned.</b> " + (3 - m.sites.filter(function (s) { return s.done; }).length) + " to go.");
}, 1600);
},
function (x, z) {
var name = window.prompt ? window.prompt("Name the new settlement:", SP_BY[SC.m.body].name + " Base") : null;
if (!name)
return;
cityRpc("found_settlement", { p_body: SF.k, p_name: name, p_x: x, p_z: z }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "The Corp could not found it."));
return;
}
scBuildSettlement({ id: o.id, name: name, x: x, z: z, modules: 1, founder: "you" }, SF.k);
setStatus("<b>" + esc(name) + " is founded.</b> Every dreamer who lands here will see it.");
scDone();
}).catch(function (e) { setStatus("Only Space Corp crew who have paid their dues found settlements. " + esc(e && e.message ? e.message : "")); });
},
function (st) {
var s = st.s;
var html = worldFacts(s.name, "A Space Corp settlement on " + (SP_BY[SF.k] ? SP_BY[SF.k].name : "this world"), [["Founded by", s.founder || "the Corp"], ["Modules", String(s.modules)]], ["Every module is a sealed, pressurised home with its own air, water and heat.", "Settlers grow food under lamps in soil washed clean, and recycle almost all their water."]) + worldBtn("grow", "Build on another module", "Settlement engineers on shift");
worldCard(html, { grow: function () { cityRpc("grow_settlement", { p_id: s.id }).then(function (o) { setStatus(esc((o && o.say) || "")); if (o && o.ok) {
s.modules = o.modules;
scBuildSettlement(s, SF.k);
if (SC.m && SC.m.kind === "settle" && SC.m.body === SF.k)
scDone();
} worldCard(null); }).catch(function (e) { setStatus("Only Space Corp crew who have paid their dues build here."); }); } });
},
function (s, k) {
var old = SC.settle[s.id];
if (old && old.g.parent)
old.g.parent.remove(old.g);
var g = new THREE.Group(), cloud = SP_SURF[k] && SP_SURF[k].cloud;
var y = cloud ? 0 : sfHeight(s.x, s.z);
g.position.set(s.x, y, s.z);
var shell = wM(0xE8ECF0), glass = wM(0x9AC8F0, { op: 0.45, ds: true }), lit = wB(0xFFE0A0, { fog: false });
for (var i = 0; i < Math.min(12, s.modules); i++) {
var a = i * 2.4, d = i ? 6 + i * 1.3 : 0, x = Math.cos(a) * d, z = Math.sin(a) * d;
var dome = wMesh(new THREE.SphereGeometry(i === 0 ? 5 : 3.6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), i % 3 === 2 ? glass : shell, x, cloud ? 0 : sfHeight(s.x + x, s.z + z) - y, z, g);
wMesh(new THREE.CircleGeometry(0.5, 8), lit, x, 1.4 + (cloud ? 0 : sfHeight(s.x + x, s.z + z) - y), z + (i === 0 ? 4.9 : 3.5), g);
if (i > 0) {
var tube = wCyl(0.8, 0.8, d, shell, x / 2, 0.8 + (cloud ? 0 : sfHeight(s.x + x / 2, s.z + z / 2) - y), z / 2, g, 8);
tube.rotation.z = Math.PI / 2;
tube.rotation.y = -a;
}
if (!cloud)
SF.solids.push({ x: s.x + x, z: s.z + z, r: i === 0 ? 5 : 3.6, h: 5 });
}
var mast = wCyl(0.1, 0.1, 8, wM(0x8A8E96), 0, 4, -7, g, 6);
var lamp = wSph(0.3, wB(0xFF5A3A, { fog: false }), 0, 8.2, -7, g, 8);
var sg = wSign([s.name, "Space Corp settlement · " + s.modules + " module" + (s.modules === 1 ? "" : "s")], 5, 1.4, "#0E1A2E", "#BFD8FF");
sg.position.set(0, 2.2, 8);
g.add(sg);
for (var p = 0; p < Math.min(3, 1 + Math.floor(s.modules / 3)); p++) {
try {
var who = wPerson("settler_" + s.id + "_" + p, { title: "Scientist", place: "Space Corp settlement", look: { layer: "labcoat", layerColor: 0xE8ECF0, hat: "helmet", hatColor: 0xF0F0F0, back: "backpack", backColor: 0xD8DCE4 } });
who.position.set(Math.cos(p * 2) * 9, cloud ? 0 : sfHeight(s.x + Math.cos(p * 2) * 9, s.z + Math.sin(p * 2) * 9) - y, Math.sin(p * 2) * 9);
g.add(who);
who.userData.settler = 1;
}
catch (e) { }
}
SC.settleG.add(g);
SC.settle[s.id] = { s: s, g: g };
}
];
});
