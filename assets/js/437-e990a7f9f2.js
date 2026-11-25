/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var APT_PLACES = [
["forecourt", "The forecourt (the front doors, the shuttle)"], ["checkin", "Check-in (the departures hall)"],
["security", "Security (the scanner lanes)"], ["lounge", "The departures lounge and the gates"],
["baggage", "Baggage claim and arrivals"], ["crew", "The crew room (pilots and flight planning)"],
["deck", "The observation deck on the roof"], ["tower", "The control tower cab"],
["hangar", "The hangar and the flight school"], ["apron", "Out on the apron, by the airliners"],
["runway", "The end of runway 09"], ["fire", "The airport fire station"], ["seaplane", "The seaplane dock on the lake"]
];
function aptDefaults() { return { open: true, flights: true, price: 5, charter: 3, traffic: true, fly: true, school: true, talk: true, grounded: false, notes: "" }; }
function aptMerge(c) { return __ZC(437, 0, this, arguments, new.target); }
var APT = { key: "airport", base: -5300000, cfg: null, cfgAt: 0, G: null, K: null, built: false, lite: false, t: 0, pt: 0, mats: {}, geos: {}, myFn: null,
people: [], walkers: [], boards: [], wantAt: null, said: {}, fly: null, ride: null, lic: null, licAt: 0, prog: null };
var APTK = null;
function aptCfg() {
if (!APT.cfg || Date.now() - APT.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("airport") : null;
APT.cfg = aptMerge(c);
APT.cfgAt = Date.now();
}
return APT.cfg;
}
function aptLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function aptKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function aptAdult() { try {
return aptKeeper() || (typeof ageAdult === "function" && ageAdult());
}
catch (e) {
return false;
} }
function aptPaid() { try {
return aptKeeper() || (typeof hasAccess === "function" && hasAccess());
}
catch (e) {
return false;
} }
function aptSigned() { try {
return typeof signedIn === "function" && signedIn();
}
catch (e) {
return false;
} }
function aptEsc(s) { return (typeof esc === "function") ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function aptSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function aptTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function aptRnd(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function aptIn() { return typeof WLD !== "undefined" && WLD.on === APT.key; }
var APT_LS = "apt_progress_v1";
function aptProg() {
if (!APT.prog) {
try {
APT.prog = JSON.parse(localStorage.getItem(APT_LS) || "{}") || {};
}
catch (e) {
APT.prog = {};
}
}
var p = APT.prog;
p.read = p.read || {};
p.did = p.did || {};
p.log = p.log || [];
p.landings = p.landings || 0;
return p;
}
function aptProgSave() { try {
localStorage.setItem(APT_LS, JSON.stringify(APT.prog || {}));
}
catch (e) { } }
function aptDid(k) { var p = aptProg(); if (!p.did[k]) {
p.did[k] = Date.now();
aptProgSave();
} }
function aptMat(col, tex, o) { return __ZC(437, 1, this, arguments, new.target); }
function aptGlowM(col, op) { var k = "glow|" + col + "|" + (op || 1); if (!APT.mats[k])
APT.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); return APT.mats[k]; }
function aptCanvasMat(key, w, h, draw, o) { return __ZC(437, 2, this, arguments, new.target); }
function aptP() { return (APTK && APTK.F) || APT.G; }
function aptBox(w, h, d, mat, x, y, z, parent) {
var k = "b" + w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = APT.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
APT.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || aptP()).add(m);
return m;
}
function aptCyl(r, h, mat, x, y, z, parent, seg, r2) { return __ZC(437, 3, this, arguments, new.target); }
function aptSph(r, mat, x, y, z, parent, seg) {
var k = "s" + r.toFixed(2) + "," + (seg || 14), g = APT.geos[k];
if (!g) {
g = new THREE.SphereGeometry(r, seg || 14, Math.max(6, (seg || 14) * 0.7 | 0));
APT.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || aptP()).add(m);
return m;
}
function aptPlane(w, h, mat, x, y, z, ry, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; (parent || aptP()).add(m); return m; }
function aptFlat(w, d, mat, x, y, z, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); (parent || aptP()).add(m); return m; }
function aptGroup(x, y, z, ry, parent) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; (parent || aptP()).add(g); return g; }
function aptCtx() { return { F: null, solids: [], floors: [], rooms: [], spots: [], gates: [], grid: {} }; }
function aptSolid(x, z, hw, hd, b, h, rot) { var S = { x: x, z: z, hw: hw, hd: hd, b: b || 0, h: h || 3, rot: rot || 0 }; APTK.solids.push(S); return S; }
function aptRound(x, z, r, b, h) { var S = { x: x, z: z, r: r, b: b || 0, h: h || 3 }; APTK.solids.push(S); return S; }
function aptFloor(x0, z0, x1, z1, y) { var F = { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y }; APTK.floors.push(F); return F; }
function aptIndex(K) { return __ZC(437, 4, this, arguments, new.target); }
function aptGroundAt(K, x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, best = null;
for (var i = 0; i < K.floors.length; i++) {
var F = K.floors[i];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y <= f + 0.75 && (best === null || F.y > best))
best = F.y;
}
if (best !== null)
return best;
return aptLand(x, z);
}
function aptLand(x, z) {
var r = Math.hypot(x, z);
if (r < 2600)
return 0;
var t = Math.min(1, (r - 2600) / 2400), n = typeof wFbm === "function" ? wFbm(x / 900, z / 900, 77, 3) : 0.5;
return t * t * (60 + n * 220);
}
function aptSolidAt(K, x, z, feet) { return __ZC(437, 5, this, arguments, new.target); }
var APT_LAKE = { x: 0, z: 560, rx: 460, rz: 250 };
function aptOnLake(x, z, pad) { var a = (x - APT_LAKE.x) / (APT_LAKE.rx - (pad || 0)), b = (z - APT_LAKE.z) / (APT_LAKE.rz - (pad || 0)); return a * a + b * b < 1; }
function aptOnDock(x, z) { return Math.abs(x) < 2.2 && z > 290 && z < 352; }
function aptSpot(x, z, r, name, verb, fn, o) { o = o || {}; var S = { x: x, z: z, r: r, y: o.y || 0, name: name, verb: verb, fn: fn, when: o.when || null }; APTK.spots.push(S); return S; }
function aptWall(dir, a, b, c, y, h, t, mat, opens) { return __ZC(437, 6, this, arguments, new.target); }
function aptGlass() { var k = "glass"; if (!APT.mats[k])
APT.mats[k] = new THREE.MeshPhongMaterial({ color: 0xA8C8D8, transparent: true, opacity: 0.24, depthWrite: false, shininess: 90, specular: 0x99AABB, side: THREE.DoubleSide }); return APT.mats[k]; }
function aptSign(lines, w, h, bg, fg, x, y, z, ry, parent) {
if (typeof wSign !== "function")
return null;
var s = wSign(lines, w, h, bg, fg);
s.position.set(x, y, z);
s.rotation.y = ry || 0;
(parent || aptP()).add(s);
s.userData.keep = 1;
return s;
}
function aptPlaque(key, title, text, w, h, x, y, z, ry, o) { return __ZC(437, 7, this, arguments, new.target); }
function aptLamp(x, y, z, col, size, op, parent) { if (typeof wGlow !== "function")
return null; var g = wGlow(col || 0xFFE8C0, size || 2.4, op === undefined ? 0.35 : op); g.position.set(x, y, z); (parent || aptP()).add(g); g.userData.keep = 1; return g; }
function aptPersonFig(seed, x, y, z, ry, look, title) { return __ZC(437, 8, this, arguments, new.target); }
function aptKit(arch, x, z, ry, s, o) { return __ZC(437, 9, this, arguments, new.target); }
function aptAng(a) { while (a > Math.PI)
a -= Math.PI * 2; while (a < -Math.PI)
a += Math.PI * 2; return a; }
function aptClock(ms) { var d = new Date(ms); var h = d.getHours(), m = d.getMinutes(); return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m; }
var APT_DEST = [
{ k: "city", name: "Somnucor", sub: "the Tower Plaza, in the heart of the city", mins: 12, go: function () { return typeof hpGoWorld === "function" && hpGoWorld("city"); } },
{ k: "storms", name: "Tornado Alley", sub: "Stormhaven, on the Great Plains (risky out on the plains)", mins: 95, go: function () { return typeof stcGo === "function" && stcGo("town"); } },
{ k: "greenwold", name: "Greenwold", sub: "the green country (always safe)", mins: 40, go: function () { if (typeof gwGo === "function") {
gwGo();
return true;
} return typeof worldGo === "function" && worldGo("greenwold"); } },
{ k: "wonders", name: "The Wonders of the World", sub: "the seven wonders, as they stood", mins: 180, go: function () { if (typeof wndGo === "function") {
wndGo();
return true;
} return false; } },
{ k: "sports", name: "The Universal Sports Arena", sub: "the stadium and its fields", mins: 30, go: function () { if (typeof sptGo === "function") {
sptGo();
return true;
} return false; } },
{ k: "northpole", name: "The North Pole", sub: "the workshop and the snow", mins: 300, hidden: true, go: function () { return typeof hpGoWorld === "function" && hpGoWorld("northpole"); } },
{ k: "neverland", name: "Neverland", sub: "second to the right", mins: 240, hidden: true, go: function () { return typeof hpGoWorld === "function" && hpGoWorld("neverland"); } },
{ k: "sea", name: "The Endless Sea", sub: "the shore by the harbour", mins: 210, hidden: true, go: function () { return typeof hpGoWorld === "function" && hpGoWorld("sea"); } }
];
var APT_DBY = {};
APT_DEST.forEach(function (d) { APT_DBY[d.k] = d; });
function aptDestKnown(D) {
if (!D.hidden)
return true;
if (aptKeeper())
return true;
try {
if (typeof acvData === "function") {
var d = acvData();
if (d && d.worlds && d.worlds[D.k])
return true;
}
}
catch (e) { }
return !!aptProg().been && !!aptProg().been[D.k];
}
function aptDestWorks(D) { return __ZC(437, 10, this, arguments, new.target); }
function aptDestList() { return APT_DEST.filter(function (D) { return aptDestWorks(D) && aptDestKnown(D); }); }
var APT_LINES = [
{ k: "SA", name: "Somnucor Air", body: 0xF2F2F0, belly: 0x2A3A5A, tail: 0x1F4E8C, stripe: 0xC9A868 },
{ k: "DL", name: "Dreamline", body: 0xF0F0F4, belly: 0xD8DCE2, tail: 0x5A3A8A, stripe: 0x8A6AC8 },
{ k: "LA", name: "Lantern Airways", body: 0xF4F0E8, belly: 0x6A2A22, tail: 0xB8402A, stripe: 0xE8A040 },
{ k: "NW", name: "Northwind", body: 0xE8EEF2, belly: 0x1E5A5A, tail: 0x2A8A8A, stripe: 0x9AD0D0 }
];
var APT_PLANES = {
trainer: { k: "trainer", name: "The trainer", sub: "a high-wing, single-engine four-seater: the school's plane", stall: 23, rot: 29, top: 62, thr: 4.2, drag: 0.0011, pitchR: 0.55, rollR: 1.1, climbMax: 0.24, eye: [0.28, 1.62, 0.62], need: "student" },
seaplane: { k: "seaplane", name: "The seaplane", sub: "the trainer on floats: off the lake and back onto it", stall: 24, rot: 30, top: 56, thr: 4.0, drag: 0.0013, pitchR: 0.5, rollR: 1.0, climbMax: 0.22, eye: [0.28, 2.62, 0.62], water: true, need: "private" },
airliner: { k: "airliner", name: "The airliner", sub: "a narrow-body twin jet: 150 seats, two engines", stall: 62, rot: 72, top: 235, thr: 3.0, drag: 0.000055, pitchR: 0.22, rollR: 0.5, climbMax: 0.14, eye: [0.55, 3.95, 16.4], need: "airline" }
};
var APT_GUIDES = {
checkin: { n: "Priya Natarajan", sex: "f", age: 34, title: "check-in agent, Somnucor Air", look: { top: 0x1F4E8C, bottom: 0x1E2A40 },
g: "You work the Somnucor Air check-in desks. You know the timetable, baggage rules (one cabin bag, one under the seat, checked bags weighed at the desk), and how boarding works. You are quick, kind and good with nervous flyers.",
hi: "Good day, and welcome to Somnucor Airport. Where are you flying today? The board's just behind you." },
security: { n: "Officer Marcus Bell", sex: "m", age: 46, title: "airport security officer", look: { top: 0x2A2E36, bottom: 0x1E2026 },
g: "You run the scanner lanes. You explain screening plainly: bags through the X-ray, liquids in small bottles in a clear bag, coats and belts in the tray, walk through the arch. You never describe how to get anything dangerous past security, and you don't discuss weapons or explosives of any kind.",
hi: "Morning. Boarding pass ready? Coats, belts and anything metal in the tray, please, and bags on the belt." },
gate: { n: "Hannah Okoye", sex: "f", age: 29, title: "gate agent", look: { top: 0x1F4E8C, bottom: 0x2A3A5A },
g: "You work the gates. You board flights by rows, check boarding passes, help families and anyone who needs more time, and know which flight goes from which gate and when.",
hi: "Hello! Flying with us? Show me your boarding pass and I'll tell you when we're boarding." },
instructor: { n: "Captain Elena Vasquez", sex: "f", age: 52, title: "chief flight instructor", look: { top: 0xE8E8EC, bottom: 0x2A2E36 },
g: "You run the flight school in the hangar. You have flown for thirty years: crop dusters, freight, airliners, now teaching. You teach the four forces, the controls, the instruments, the circuit, radio calls, and above all good judgement and safety. You're patient and encouraging, and honest about mistakes.",
hi: "Welcome to the flight school. Ever flown the front of a plane? Pull up a chair and we'll start with what keeps her in the air." },
tower: { n: "Tomasz Wierzbicki", sex: "m", age: 41, title: "air traffic controller", look: { top: 0xE6E2D8, bottom: 0x3A3A40 },
g: "You work Somnucor Tower: the runway, the circuit and the taxiways. You speak clearly and briefly, explain how controllers keep planes apart (separation, clearances, the read-back), and love the job's calm focus.",
hi: "Somnucor Tower, good day. Quiet moment, so go ahead: what would you like to know?" },
mechanic: { n: "Joe Tanaka", sex: "m", age: 58, title: "aircraft mechanic", look: { top: 0x3A4A5A, bottom: 0x2A3240 },
g: "You keep the planes airworthy in the hangar: walk-around checks, oil, tyres, control cables, logbooks. You explain why every check matters and are proud that nothing leaves your hangar unsigned.",
hi: "Mind the tow bar. You here to learn how she works, or to fly her?" },
barista: { n: "Lucia Ferreira", sex: "f", age: 24, title: "barista at the Runway Café", look: { top: 0x6A3A2A, bottom: 0x2A2420 },
g: "You run the coffee machine at the Runway Café in the departures lounge. You chat with travellers, know the best window seat for watching take-offs, and remember regulars.",
hi: "Hi! Coffee, tea, hot chocolate? The window table's free if you want to watch them take off." },
fire: { n: "Chief Dwayne Harper", sex: "m", age: 49, title: "airport fire chief", look: { top: 0xB8402A, bottom: 0x2A2420 },
g: "You lead the airport's rescue and firefighting crew. You explain response times (the crew must reach the far end of the runway within minutes), foam trucks, drills and how crews keep everyone safe. You never describe accidents in gory detail.",
hi: "Afternoon. Every alarm, we roll in under two minutes to anywhere on the field. Want to see the truck?" }
};
var APT_WP = "Somnucor Airport";
var APT_JOBS = [
[7400, "Airline pilot", 16, 4, false, [7, 8], [["Fly the day's sectors", "station", ["Brief with the crew in the crew room", "Walk round the airliner and sign the log", "Fly the departure and the climb", "Bring her in and park at the gate"]]]],
[7401, "Flight instructor", 14, 2, false, [8, 8], [["Teach a lesson", "station", ["Brief the student at the school desk", "Pre-flight the trainer together", "Fly the circuit with them", "Debrief and write up their logbook"]]]],
[7402, "Air traffic controller", 14, 3, false, [6, 8], [["Work the tower", "station", ["Take the handover from the last shift", "Clear departures for take-off", "Sequence the arrivals onto the runway", "Log every movement"]]]],
[7403, "Ramp agent (ground crew)", 10, 6, true, [6, 8], [["Turn an airliner round", "station", ["Chock the wheels and cone the engines", "Plug in ground power", "Guide the fuel truck in", "Marshal her out at pushback"]]]],
[7404, "Airport security officer", 11, 4, true, [6, 8], [["Run a scanner lane", "station", ["Check boarding passes at the front", "Watch the X-ray screen", "Walk travellers through the arch", "Help anyone who needs a hand"]]]],
[7405, "Gate agent", 10, 4, true, [7, 8], [["Board a flight", "station", ["Open the gate desk and check the list", "Call families and anyone who needs time first", "Board by rows", "Close the door and wave her off"]]]],
[7406, "Baggage handler", 10, 4, true, [6, 8], [["Load and unload", "station", ["Sort the bags by flight in the bag hall", "Drive the carts out to the airliner", "Load the hold, heavy at the bottom", "Unload the arrivals onto the carousel"]]]],
[7407, "Aircraft mechanic", 12, 3, true, [7, 8], [["Inspect and service", "station", ["Read the pilots' write-ups", "Check oil, tyres and brakes", "Inspect the control cables and hinges", "Sign the logbook"]]]],
[7408, "Airport firefighter", 11, 3, true, [7, 8], [["Stand the watch", "station", ["Check the trucks and the foam", "Run the morning drill", "Patrol the runway for anything loose", "Stand by for every landing"]]]],
[7409, "Runway Café barista", 9, 2, true, [6, 8], [["Run the café", "station", ["Start the coffee machine and grind the beans", "Serve the early travellers", "Bake off the pastries", "Wipe down the window tables"]]]]
];
var APT_LESSONS = [
["forces", "The four forces", "Lift, weight, thrust and drag",
"Four forces act on a plane in flight. Lift, made by air flowing over the wing, holds it up against weight. Thrust from the propeller or the jet pulls it forward against drag, the air's resistance. In steady level flight they balance. The wing makes lift because it is shaped and tilted to push air downward: tilt it more (a higher angle of attack) and it makes more lift, until at about 15 to 18 degrees the air breaks away from the top of the wing and it stalls: lift drops away, whatever the speed."],
["controls", "The controls", "Yoke, pedals, throttle and flaps",
"Pull the yoke back and the elevator on the tail tips the nose up; push and the nose goes down. Turn the yoke and the ailerons on the wingtips roll the plane into a bank. The rudder pedals swing the nose left and right and keep a turn tidy. The throttle sets the power. Flaps on the back of the wings let the plane fly slower for take-off and landing. You turn a plane by banking it: the tilted lift pulls you round the curve."],
["instruments", "The six instruments", "Read them in a scan",
"The six basic instruments: the airspeed indicator, the attitude indicator (the artificial horizon), the altimeter, the turn coordinator, the heading indicator and the vertical speed indicator. Pilots keep their eyes moving in a scan, coming back to the attitude indicator between each of the others. Airspeed is life near the ground: keep well above the stall."],
["circuit", "The circuit", "Take-off, crosswind, downwind, base, final",
"A circuit (the traffic pattern) is a rectangle round the runway: take off into the wind, climb straight ahead (upwind), turn 90 degrees (crosswind), turn again to fly back parallel to the runway (downwind), turn onto base, then turn onto final and line up with the centre line. A small plane's circuit is flown at about 1,000 feet above the ground. On final, aim for a steady descent of about 3 degrees."],
["landing", "Landing", "Slow, steady, wings level",
"A good landing starts with a good approach: lined up with the centre line, at the right speed, coming down at a steady rate. Just above the runway, close the throttle and gently raise the nose (the flare) so the main wheels touch first and softly. Keep the wings level. If anything isn't right, go around: full power, climb away and try again. A go-around is good flying, never a failure."],
["radio", "Radio and the tower", "Ask, listen, read back",
"Controllers keep planes apart. Before you take the runway you ask the tower: 'Somnucor Tower, trainer one-two, holding short runway two-seven, ready for departure.' They clear you: 'Trainer one-two, runway two-seven, cleared for take-off.' You read the clearance back so both of you know it was heard right. Runway numbers are the heading divided by ten: runway 27 points 270 degrees, due west."]
];
var APT_QUIZ = [
["Which force holds a plane up?", "Lift", "Thrust", "Drag", 0],
["What happens when the wing's angle gets too steep?", "It stalls and loses lift", "It goes faster", "Nothing at all", 0],
["Pulling the yoke back does what?", "Raises the nose", "Lowers the nose", "Rolls left", 0],
["How do you turn a plane?", "Bank it with the ailerons", "Only with the throttle", "Lower the flaps", 0],
["What are flaps for?", "Flying slower for take-off and landing", "Going faster in a dive", "Steering on the ground", 0],
["Which instrument shows the plane's attitude?", "The artificial horizon", "The altimeter", "The compass only", 0],
["Runway 27 points which way?", "West (270 degrees)", "East", "North", 0],
["The leg flown parallel to the runway, away from your landing direction, is...", "Downwind", "Final", "Base", 0],
["Something isn't right on final. What do you do?", "Go around: full power and climb away", "Land anyway", "Turn off the engine", 0],
["Why read a clearance back to the tower?", "So both sides know it was heard right", "It's only polite", "To use up radio time", 0]
];
function aptQuizOrder(i) { var a = [0, 1, 2]; var r = aptRnd(1000 + i * 37); for (var k = 2; k > 0; k--) {
var j = Math.floor(r() * (k + 1));
var t = a[k];
a[k] = a[j];
a[j] = t;
} return a; }
var APT_RWY = { x0: -1100, x1: 1100, w: 45, twz: -110 };
function aptRunwayTex() { return __ZC(437, 11, this, arguments, new.target); }
function aptField() { return __ZC(437, 12, this, arguments, new.target); }
function aptFrontDressed(L) { return __ZC(437, 13, this, arguments, new.target); }
function aptLightRow(col, fill, size) { return __ZC(437, 14, this, arguments, new.target); }
function aptBuildingBox(x0, z0, x1, z1, h, wall, name, doors, o) { return __ZC(437, 15, this, arguments, new.target); }
function aptTrees() { return __ZC(437, 16, this, arguments, new.target); }
var APT_T = { x0: -100, x1: 100, z0: -360, z1: -290, h: 10, sec: -325, gates: [-75, -25, 25, 75], lanes: [-62, -48], arr: 60 };
function aptMayAirside() {
if (aptKeeper())
return true;
if (APT.pass && APT.pass.until > Date.now())
return true;
if (APT.arrived && Date.now() - APT.arrived < 15 * 60000)
return true;
return aptWorksHere();
}
function aptTerminal() { return __ZC(437, 17, this, arguments, new.target); }
function aptSecNudge() {
if (APT.said.sec && Date.now() - APT.said.sec < 6000)
return;
APT.said.sec = Date.now();
aptSay("🛂 <b>Security.</b> The lanes are for travellers with a boarding pass (from the check-in desks) and the people who work here. Officer Bell's at the lane if you have questions.");
}
function aptArrNudge() {
if (APT.said.arr && Date.now() - APT.said.arr < 6000)
return;
APT.said.arr = Date.now();
aptSay("🚪 <b>Arrivals: one way out.</b> To get to the gates, check in and go through security.");
}
function aptCheckin() { return __ZC(437, 18, this, arguments, new.target); }
function aptBench(x, z, ry) { return __ZC(437, 19, this, arguments, new.target); }
function aptPlanter(x, z) { aptBox(1.4, 0.8, 1.4, aptMat(0x6A6E74, "concrete"), x, 0.4, z); aptCyl(0.06, 1.0, aptMat(0x4A3A2A, "bark"), x, 1.3, z, null, 6); aptSph(0.75, aptMat(0x3E6A2E, "foliage"), x, 2.1, z, null, 10); aptSph(0.5, aptMat(0x4A7A34, "foliage"), x + 0.3, 2.6, z + 0.2, null, 8); aptSolid(x, z, 0.7, 0.7, 0, 1); }
function aptSecurity() { return __ZC(437, 20, this, arguments, new.target); }
function aptScreen() { return __ZC(437, 21, this, arguments, new.target); }
function aptLounge() { return __ZC(437, 22, this, arguments, new.target); }
function aptJetBridge(gx) { return __ZC(437, 23, this, arguments, new.target); }
function aptBaggage() { return __ZC(437, 24, this, arguments, new.target); }
function aptBeltTick(dt) { return __ZC(437, 25, this, arguments, new.target); }
function aptCrewRoom() { return __ZC(437, 26, this, arguments, new.target); }
function aptCrewCard() { return __ZC(437, 27, this, arguments, new.target); }
function aptCeilingLights() { return __ZC(437, 28, this, arguments, new.target); }
function aptDeck() { return __ZC(437, 29, this, arguments, new.target); }
function aptToDeck(up) { return __ZC(437, 30, this, arguments, new.target); }
function aptBinoculars() { return __ZC(437, 31, this, arguments, new.target); }
var APT_TWR = { x: 170, z: -330, cab: 38, r: 7 };
function aptTower() { return __ZC(437, 32, this, arguments, new.target); }
function aptToCab(up) { return __ZC(437, 33, this, arguments, new.target); }
function aptMayTower() { return aptKeeper() || aptWorksHere() || !!(aptLicNow() && aptLicNow().kind); }
function aptRadarCard() { return __ZC(437, 34, this, arguments, new.target); }
function aptHangar() { return __ZC(437, 35, this, arguments, new.target); }
function aptParkedOnly(list, i) { list.forEach(function (S) { S.when = function () { return !(APT.fly && APT.fly.R === APT.ramp[i]); }; }); }
function aptPlaneSolids(x, z, ry) { return __ZC(437, 36, this, arguments, new.target); }
function aptService() { return __ZC(437, 37, this, arguments, new.target); }
function aptFireCard() { return __ZC(437, 38, this, arguments, new.target); }
function aptFireTruck() { return __ZC(437, 39, this, arguments, new.target); }
function aptTug(x, z, ry) { return __ZC(437, 40, this, arguments, new.target); }
function aptFuelTruck(x, z, ry) { return __ZC(437, 41, this, arguments, new.target); }
function aptLathe(key, prof, seg, colFn) { return __ZC(437, 42, this, arguments, new.target); }
function aptWingGeo(key, span, root, tip, sweep, thick) { return __ZC(437, 43, this, arguments, new.target); }
function aptMesh(geo, mat, x, y, z, parent) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); parent.add(m); return m; }
function aptHex(n) { return "#" + ("00000" + (n >>> 0).toString(16)).slice(-6); }
function aptPlaneModel(kind, line) {
line = line || APT_LINES[0];
var g = kind === "airliner" ? aptAirliner(line) : aptLightPlane(kind === "seaplane", line);
g.userData.keep = 1;
return g;
}
function aptLightPlane(floats, line) { return __ZC(437, 44, this, arguments, new.target); }
function aptAirliner(line) { return __ZC(437, 45, this, arguments, new.target); }
function aptPropSpin(g, on, dt) {
var U = g && g.userData.apt;
if (!U || !U.blades)
return;
if (on) {
U.blades.visible = false;
U.disc.visible = true;
}
else {
U.blades.visible = true;
U.disc.visible = false;
}
}
function aptBezelMat() { return __ZC(437, 46, this, arguments, new.target); }
function aptCabin(B) { return __ZC(437, 47, this, arguments, new.target); }
var APT_FLY_KEYS = {};
(function () {
if (typeof document === "undefined")
return;
document.addEventListener("keydown", function (e) {
if (!APT.fly)
return;
var t = e.target;
if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA"))
return;
if (e.code === "KeyF") {
aptFlaps();
e.preventDefault();
e.stopPropagation();
}
if (e.code === "KeyV") {
aptFlyView();
e.preventDefault();
e.stopPropagation();
}
if (e.code === "KeyB")
APT_FLY_KEYS.b = true;
}, true);
document.addEventListener("keyup", function (e) { if (e.code === "KeyB")
APT_FLY_KEYS.b = false; }, true);
})();
function aptLicNow() { return APT.lic || null; }
function aptLicRank(k) { return { student: 1, private: 2, airline: 3 }[k] || 0; }
function aptMayFly(kind) { return __ZC(437, 48, this, arguments, new.target); }
function aptFlyStart(kind, R) { return __ZC(437, 49, this, arguments, new.target); }
function aptBearing(h) { return (Math.atan2(Math.sin(h), -Math.cos(h)) * 180 / Math.PI + 360) % 360; }
function aptRadio(who, line) { aptSay("📻 <b>" + aptEsc(who) + ":</b> " + aptEsc(line)); }
function aptFlaps() { var F = APT.fly; if (!F)
return; F.flaps = F.flaps ? 0 : 1; aptSay("✈️ Flaps " + (F.flaps ? "<b>down</b>: she flies slower and steeper, for take-off and landing." : "<b>up</b>: cleaner and faster for the climb and cruise.")); aptTone(F.flaps ? 330 : 440, 0.08); }
function aptFlyView() { var F = APT.fly; if (!F)
return; if (typeof VRM !== "undefined" && VRM.xr) {
F.view = "cab";
return;
} F.view = F.view === "cab" ? "chase" : "cab"; aptSay(F.view === "cab" ? "From the left seat." : "From behind, chase view."); }
function aptFlyInput() { return __ZC(437, 50, this, arguments, new.target); }
function aptPaved(x, z) { return __ZC(437, 51, this, arguments, new.target); }
function aptFlyTick(dt) { return __ZC(437, 52, this, arguments, new.target); }
function aptFlyRadioTick(F) { return __ZC(437, 53, this, arguments, new.target); }
function aptLanded(F, good, grade, surf) { return __ZC(437, 54, this, arguments, new.target); }
function aptCrash(why) { return __ZC(437, 55, this, arguments, new.target); }
function aptFlyEnd(quiet) { return __ZC(437, 56, this, arguments, new.target); }
function aptFlyPlace(F) { return __ZC(437, 57, this, arguments, new.target); }
function aptFlyCam() {
var F = APT.fly;
if (!F)
return;
aptFlyPlace(F);
camera.rotation.order = "YXZ";
var vr = typeof VRM !== "undefined" && VRM.xr;
if (!vr)
camera.rotation.set((typeof pitch !== "undefined" ? pitch : 0) + (F.view === "cab" ? F.p * 0.85 : 0), yaw, F.view === "cab" ? F.r * 0.85 : 0);
aptCockpitPlace(F);
}
function aptPapiTick(F) { return __ZC(437, 58, this, arguments, new.target); }
var APT_CP = { g: null, kind: null, U: null, paintAt: 0 };
function aptCockpit(kind) { return __ZC(437, 59, this, arguments, new.target); }
function vcpOK() { return typeof vcpCanvas === "function" && typeof vcpDial === "function"; }
function aptCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; var t = new THREE.CanvasTexture(c); return { c: c, x: c.getContext("2d"), t: t }; }
function aptCockpitHide() { return __ZC(437, 60, this, arguments, new.target); }
function aptCockpitPlace(F) { return __ZC(437, 61, this, arguments, new.target); }
function aptPaintSix(cv, F) { return __ZC(437, 62, this, arguments, new.target); }
function aptPaintGlass(cv, F) { return __ZC(437, 63, this, arguments, new.target); }
function aptFlyHud(on) { return __ZC(437, 64, this, arguments, new.target); }
function aptFlyHudPaint(F) { return __ZC(437, 65, this, arguments, new.target); }
(function () {
if (typeof vehicleFrame !== "function")
return;
var vf = vehicleFrame;
vehicleFrame = function (dt) {
if (APT.fly && aptIn()) {
try {
aptFlyTick(dt);
}
catch (e) {
if (!APT.e2) {
APT.e2 = 1;
if (window.console)
console.warn("[airport] fly", e);
}
}
return true;
}
if (APT.ride && aptIn())
return true;
return vf.apply(this, arguments);
};
})();
var APT_SL = 90000;
var APT_DEP_PRE = 10000, APT_ARR_OFF = 20000;
function aptNow() { return (typeof incdNow === "function") ? incdNow() : Date.now(); }
function aptGateX(g) { return APT_T.gates[g - 1] + 4; }
var APT_GATE_Z = -247.8;
function aptDep(n) {
var line = APT_LINES[((n % 4) + 4) % 4], D = APT_DEST[((n % APT_DEST.length) + APT_DEST.length) % APT_DEST.length], g = 1 + (((n % 4) + 4) % 4);
return { n: n, kind: "dep", T: n * APT_SL, gate: g, line: line, D: D, no: line.k + " " + (100 + (((n * 37) % 800) + 800) % 800) };
}
function aptArr(m) {
var line = APT_LINES[(((m - 1) % 4) + 4) % 4], D = APT_DEST[(((m * 3) % APT_DEST.length) + APT_DEST.length) % APT_DEST.length], g = 1 + ((((m - 1) % 4) + 4) % 4);
return { n: m, kind: "arr", T: m * APT_SL + APT_ARR_OFF, gate: g, line: line, D: D, no: line.k + " " + (900 + (((m * 53) % 99) + 99) % 99) };
}
function aptDestName(D) { return aptDestKnown(D) ? D.name : "a private charter"; }
function aptPathDep(gx) {
return [[gx, APT_GATE_Z, 0, 0, 1], [gx, -188, 0, 3, 1], [gx + 18, -150, 0, 8], [gx + 70, -110, 0, 13], [1000, -110, 0, 13], [1040, -72, 0, 7], [1040, -14, 0, 4], [1062, 0, 0, 2], [1010, 0, 0, 10], [-380, 0, 0, 76], [-1250, 0, 140, 86], [-4200, 0, 800, 118], [-8800, 0, 1700, 150]];
}
function aptPathArr(gx) {
return [[5200, 0, 230, 76], [820, 0, 0, 70], [140, 0, 0, 17], [0, -26, 0, 9], [0, -110, 0, 11], [gx - 40, -110, 0, 10], [gx, -150, 0, 6], [gx, -210, 0, 3], [gx, APT_GATE_Z, 0, 0]];
}
function aptPathPrep(P) {
var segs = [], t = 0;
for (var i = 0; i < P.length - 1; i++) {
var a = P[i], b = P[i + 1], d = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), v = Math.max(0.6, (a[3] + b[3]) / 2), dt = d / v;
segs.push({ a: a, b: b, t0: t, dt: dt, d: d, rev: !!a[4] });
t += dt;
}
return { segs: segs, dur: t };
}
APT.paths = {};
function aptPathFor(kind, g) { var k = kind + g; if (!APT.paths[k])
APT.paths[k] = aptPathPrep(kind === "dep" ? aptPathDep(aptGateX(g)) : aptPathArr(aptGateX(g))); return APT.paths[k]; }
function aptPathAt(PP, t) { return __ZC(437, 66, this, arguments, new.target); }
function aptTrafficNow(at) { return __ZC(437, 67, this, arguments, new.target); }
function aptGateParked(g, now) {
var C = aptCfg();
if (!C.traffic || C.grounded)
return true;
var N = Math.floor(now / APT_SL), n = N + 1;
while (((n % 4) + 4) % 4 !== g - 1 || aptDep(n).T - APT_DEP_PRE > now)
n--;
var a = aptArr(n + 1);
return now >= a.T + aptPathFor("arr", g).dur * 1000;
}
APT.fleet = { gate: [], moving: [] };
function aptFleetBuild() { return __ZC(437, 68, this, arguments, new.target); }
function aptPlaneSolidsGate(g) { return __ZC(437, 69, this, arguments, new.target); }
function aptFleetTick() { return __ZC(437, 70, this, arguments, new.target); }
function aptBoardLines(n) { return __ZC(437, 71, this, arguments, new.target); }
function aptArrLines(n) { return __ZC(437, 72, this, arguments, new.target); }
function aptBoardsBuild() { return __ZC(437, 73, this, arguments, new.target); }
function aptBoardsPaint() { return __ZC(437, 74, this, arguments, new.target); }
function aptFare(charter) { var C = aptCfg(); if (aptKeeper())
return 0; if (!aptAdult())
return 0; return C.price * (charter ? C.charter : 1); }
function aptTickets() { return __ZC(437, 75, this, arguments, new.target); }
function aptBuy(r, charter) { return __ZC(437, 76, this, arguments, new.target); }
function aptBoardAt(g) { return __ZC(437, 77, this, arguments, new.target); }
function aptRide(P) { return __ZC(437, 78, this, arguments, new.target); }
function aptRideTick() { return __ZC(437, 79, this, arguments, new.target); }
function aptRideArrive() { return __ZC(437, 80, this, arguments, new.target); }
function aptGuide(key, x, z, ry, y) { return __ZC(437, 81, this, arguments, new.target); }
function aptTalk(key) { return __ZC(437, 82, this, arguments, new.target); }
function aptSystem(c) { return __ZC(437, 83, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) { if (c && c.apt) {
try {
var s = aptSystem(c);
if (s)
return s;
}
catch (e) {
if (window.console)
console.warn("[airport] voice", e);
}
} return cs.apply(this, arguments); };
})();
(function () {
if (typeof localVoice !== "function")
return;
var lv = localVoice;
localVoice = function (c, q) {
if (!(c && c.apt))
return lv.apply(this, arguments);
try {
var Gd = APT_GUIDES[c.apt], pool = [];
if (String(q || "") === "hello")
return Gd.hi;
var nx = aptBoardLines(1)[0];
if (nx)
pool.push("Next out is " + nx.no + " to " + nx.dest + " at " + nx.time + ", gate " + nx.gate + ".");
APT_LESSONS.forEach(function (L) { String(L[3]).split(". ").forEach(function (s) { if (s.length > 40)
pool.push(s.replace(/\.?$/, ".")); }); });
c.aptI = ((c.aptI || 0) + 5) % pool.length;
return pool[c.aptI] || Gd.hi;
}
catch (e) {
return lv.apply(this, arguments);
}
};
})();
function aptCafe() { return __ZC(437, 84, this, arguments, new.target); }
function aptCrowd() { return __ZC(437, 85, this, arguments, new.target); }
function aptCrowdTick(dt) { return __ZC(437, 86, this, arguments, new.target); }
function aptMyJobs() { try {
return ((typeof standing !== "undefined" && standing && standing.jobs) || []).filter(function (j) { return (j.workplace || j.employer) === APT_WP || ((+(j.job_id || j.id)) >= 7400 && (+(j.job_id || j.id)) <= 7409); });
}
catch (e) {
return [];
} }
function aptWorksHere() { return aptMyJobs().length > 0; }
function aptHasJob(id) { return aptMyJobs().some(function (j) { return +(j.job_id || j.id) === id; }); }
function aptWorkHere() { if (typeof ahOpen === "function")
ahOpen(APT_WP);
else
aptSay("The airport's job board opens soon."); }
(function () {
if (typeof HX_WORK !== "undefined" && typeof HX_WP !== "undefined" && !HX_WP[APT_WP]) {
var row = [APT_WP, APT.key, 0, -300, 900, "Somnucor Airport: the terminal, the tower, the hangar and the field."];
HX_WORK.push(row);
HX_WP[APT_WP] = { key: APT_WP, world: APT.key, x: 0, z: -300, r: 900, note: row[5] };
}
if (typeof HX_JOBS !== "undefined")
APT_JOBS.forEach(function (j) { if (!HX_JOBS.some(function (q) { return q[0] === j[0]; }))
HX_JOBS.push([j[0], APT.key, j[1], APT_WP, j[2], j[3], j[4], j[5], j[6]]); });
var mine = function (job) { var id = +(job && (job.job_id || job.id)) || 0; return !!job && ((job.workplace || job.employer) === APT_WP || (id >= 7400 && id <= 7409)); };
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (mine(job))
return aptIn(); return os.apply(this, arguments); };
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (aptIn() && !APT.fly && !APT.ride)
return { key: APT_WP, inside: true }; return aw.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) { if (key !== APT_WP)
return sw.apply(this, arguments); if (aptIn())
return aptSay("✈️ You're at the airport. The crew room is at the east end of the departure lounge, through security."); aptSay("✈️ <b>Somnucor Airport</b>: ☰ Menu › ✈️ Airport, or the airport shuttle on the Tower Plaza."); };
}
})();
function aptBoards2() { return __ZC(437, 87, this, arguments, new.target); }
(function () {
if (typeof cinWorkEvents !== "function")
return;
var cw = cinWorkEvents;
cinWorkEvents = function (jobs) {
var out = cw.apply(this, arguments);
try {
(jobs || []).forEach(function (j) { if (j.place !== APT_WP)
return; aptWorkEvents(j).forEach(function (e) { out.push(e); }); });
}
catch (e) {
if (window.console)
console.warn("[airport] calls", e);
}
return out;
};
})();
function aptWorkEvents(j) { return __ZC(437, 88, this, arguments, new.target); }
function aptLicLoad(force) { return __ZC(437, 89, this, arguments, new.target); }
function aptAward(kind) { return __ZC(437, 90, this, arguments, new.target); }
function rpcMissingSafe(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|schema cache/i.test(String(e && e.message || e)); }
function aptSchool() { return __ZC(437, 91, this, arguments, new.target); }
function aptLesson(i) { return __ZC(437, 92, this, arguments, new.target); }
function aptQuiz(i, score) { return __ZC(437, 93, this, arguments, new.target); }
var APT_AT = {
forecourt: [-10, -394, Math.PI], checkin: [-40, -342, 0], security: [-55, -334, Math.PI], lounge: [0, -312, Math.PI],
baggage: [58, -334, 0], crew: [90, -314, -Math.PI / 2], hangar: [-270, -262, 0], apron: [-46, -276, Math.PI],
runway: [-1080, -40, -Math.PI / 2], fire: [330, -168, 0], seaplane: [0, 300, Math.PI]
};
function aptArrive(at) { return __ZC(437, 94, this, arguments, new.target); }
function aptBuild(G) { return __ZC(437, 95, this, arguments, new.target); }
function aptForget() { return __ZC(437, 96, this, arguments, new.target); }
function aptEnv() { return __ZC(437, 97, this, arguments, new.target); }
function aptRoomAt(K, x, z, feet) {
var best = null;
(K.rooms || []).forEach(function (r) { if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1 && feet >= r.y - 1.2 && feet <= r.y + r.h && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r; });
return best;
}
function aptRadarPaint() { return __ZC(437, 98, this, arguments, new.target); }
function aptTick(dt) { return __ZC(437, 99, this, arguments, new.target); }
function aptMayGo() { if (aptKeeper())
return ""; return aptCfg().open ? "" : "Somnucor Airport is closed for now by the Keeper."; }
function aptGo(at, opt) {
at = at || "forecourt";
var why = aptMayGo();
if (why) {
aptSay("✈️ <b>" + aptEsc(why) + "</b>");
return false;
}
APT.wantAt = at;
if (WLD.on === APT.key) {
worldCard(null);
aptArrive(at);
APT.wantAt = null;
return true;
}
return worldGo(APT.key, opt || { fromName: "the city" });
}
function aptLeave() { if (APT.fly)
aptFlyEnd(true); APT.ride = null; worldCard(null); worldHome("✈️ <b>Back from Somnucor Airport.</b>"); }
function aptShuttleHome() { return __ZC(437, 100, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(APT.key, {
base: APT.base, far: 9000, ownSky: true, tone: 523,
env: function () { return aptEnv(); },
build: function (G) { aptBuild(G); },
enter: function (opt) { return __ZC(437, 101, this, arguments, new.target); },
leave: function () {
worldCard(null);
if (APT.fly)
try {
aptFlyEnd(true);
}
catch (e) { }
APT.ride = null;
aptFlyHud(false);
aptCockpitHide();
clearTimeout(APT.lgT);
APT.lgT = setTimeout(function () { if (WLD.on !== APT.key && typeof worldLetGo === "function")
worldLetGo(APT.key); }, 20000);
},
ground: function (x, z, feet) { var K = APT.K; if (!K)
return 0; if (aptOnDock(x, z))
return 0.7; return aptGroundAt(K, x, z, feet); },
block: function (x, z, feet) {
var K = APT.K;
if (!K)
return false;
if (Math.abs(x) > 6400 || Math.abs(z) > 6400)
return true;
var W = APT_TWR;
if (feet > W.cab - 1 && Math.hypot(x - W.x, z - W.z) > W.r - 0.6)
return true;
return aptSolidAt(K, x, z, feet);
},
tick: function (dt) { aptTick(dt); },
back: function () { if (APT.fly) {
aptFlyEnd();
return;
} if (APT.ride) {
aptRideArrive();
return;
} aptLeave(); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(APT.key) < 0)
WLG.keys.push(APT.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === APT.key)
aptForget(); return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[APT.key]) {
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.push([APT.key, "Somnucor Airport", 0, "city"]);
DGR_W[APT.key] = { id: APT.key, name: "Somnucor Airport", def: 0, group: "city" };
}
if (typeof WSN_WORLD !== "undefined" && !WSN_WORLD[APT.key])
WSN_WORLD[APT.key] = { s: "pastoral", b: ["wind"], f: "city" };
if (typeof HP_LIST !== "undefined" && !HP_LIST.some(function (h) { return h.k === APT.key; }))
HP_LIST.push({ k: APT.key, name: "Somnucor Airport" });
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
try {
if (aptIn()) {
if (APT.ride)
aptRideTick();
else if (APT.fly)
aptFlyCam();
}
else
aptStopTick();
}
catch (e) {
if (!APT.e3) {
APT.e3 = 1;
if (window.console)
console.warn("[airport] frame", e);
}
}
};
})();
var APTS = { g: null, on: false };
function aptStop() {
if (typeof HP === "undefined" || !HP.pads || !HP.pads.city || typeof hpWorldPos !== "function")
return null;
var P = HP.pads.city, w = hpWorldPos(P), a = (P.rot || 0) + Math.PI / 2, d = (typeof HP_PAD_R !== "undefined" ? HP_PAD_R : 8) + 7;
return { x: w.x + Math.cos(a) * d, z: w.z + Math.sin(a) * d, y: w.y - 0.05, a: a };
}
function aptStopModel() {
var g = new THREE.Group(), steel = new THREE.MeshPhongMaterial({ color: 0x8A9098, shininess: 60, specular: 0x444444 }), blue = new THREE.MeshLambertMaterial({ color: 0x1F4E8C }), glass = new THREE.MeshPhongMaterial({ color: 0xA8C4D8, transparent: true, opacity: 0.35, shininess: 90, depthWrite: false }), seat = new THREE.MeshLambertMaterial({ color: 0x3A3E46 });
[-1.6, 1.6].forEach(function (x) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.6, 0.1), steel); p.position.set(x, 1.3, -0.7); g.add(p); var p2 = p.clone(); p2.position.z = 0.7; g.add(p2); });
var roof = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 1.8), blue);
roof.position.y = 2.65;
g.add(roof);
var back = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.0, 0.04), glass);
back.position.set(0, 1.4, -0.7);
g.add(back);
var bench = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 0.45), seat);
bench.position.set(0, 0.48, -0.4);
g.add(bench);
if (typeof wSign === "function") {
var s = wSign(["✈ AIRPORT SHUTTLE", "Somnucor Airport · any time · press E"], 3.2, 0.7, "#1F4E8C", "#FFFFFF");
s.position.set(0, 3.15, 0);
g.add(s);
}
if (typeof wGlow === "function") {
var gl = wGlow(0xE8F0FF, 2.6, 0.2);
gl.position.set(0, 2.3, 0);
g.add(gl);
}
g.traverse(function (o) { o.raycast = function () { }; });
return g;
}
function aptStopTick() {
var off = function () { if (APTS.g)
APTS.g.visible = false; if (APTS.on) {
APTS.on = false;
worldPromptCity(null);
} };
if ((typeof WLD !== "undefined" && WLD.on) || store.inside || !walkMode) {
off();
return;
}
var S = aptStop();
if (!S || !(typeof inCityNow === "function" && inCityNow())) {
off();
return;
}
if (!APTS.g) {
APTS.g = aptStopModel();
scene.add(APTS.g);
}
APTS.g.visible = true;
APTS.g.position.set(S.x, S.y, S.z);
APTS.g.rotation.y = -S.a + Math.PI / 2;
var P = camera.position, d = Math.hypot(P.x - S.x, P.z - S.z);
if (d < 3.4) {
if (!APTS.on) {
APTS.on = true;
worldPromptCity("<b>✈️ The airport shuttle</b> · <b>press E</b> to ride out to Somnucor Airport", aptFromStop);
}
}
else if (APTS.on) {
APTS.on = false;
worldPromptCity(null);
}
}
function aptFromStop() { return __ZC(437, 102, this, arguments, new.target); }
function aptDirectory() { return __ZC(437, 103, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-airport"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-airport";
b.title = "Somnucor Airport";
b.textContent = "✈️ Airport";
b.onclick = function () { aptDirectory(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "apt-ps"; }))
PS_EXTRAS.push({ id: "apt-ps", label: "✈️ Somnucor Airport (flights, learn to fly)", show: function () { return true; }, run: function () { setTimeout(aptDirectory, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var pl = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (pl && pl.ids.indexOf("apt-ps") < 0)
pl.ids.push("apt-ps");
}
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-apt]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-apt", "1");
b.textContent = "✈️ Somnucor Airport";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } aptGo("forecourt"); };
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
var m = /[?&]kairport=([a-z]+)/.exec(location.search);
if (!m)
return;
var where = m[1];
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!aptKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
aptGo(where);
try {
var q = new URLSearchParams(location.search);
q.delete("kairport");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
(function () {
var close = function () { return aptIn() && (!!APT.ride || !!(APT.fly && (APT.fly.view === "cab" || (typeof VRM !== "undefined" && VRM.xr)))); };
["renderView", "vrmXrRender"].forEach(function (n) {
if (typeof window[n] !== "function")
return;
var f = window[n];
window[n] = function () {
if (!close())
return f.apply(this, arguments);
var n0 = camera.near;
if (n0 > 0.08) {
camera.near = 0.08;
camera.updateProjectionMatrix();
}
try {
return f.apply(this, arguments);
}
finally {
if (camera.near !== n0) {
camera.near = n0;
camera.updateProjectionMatrix();
}
}
};
});
})();
function aptDress(G) { return __ZC(437, 104, this, arguments, new.target); }
(function () {
var b = aptBuild;
aptBuild = function (G) {
var c = aptCrowd;
aptCrowd = function () { var r = c.apply(this, arguments); try {
aptDress(APT.G);
}
catch (e) {
if (window.console)
console.warn("[airport] dress", e);
} return r; };
try {
return b.apply(this, arguments);
}
finally {
aptCrowd = c;
try {
G.traverse(function (o) { var m = o.material; if (o.isMesh && m && m.vertexColors && m.emissive && !m.userData.aptGlowed) {
m.userData.aptGlowed = 1;
m.emissive.setHex(0x1A2A10);
} });
}
catch (e) { }
}
};
})();
function aptVest(g) { return __ZC(437, 105, this, arguments, new.target); }
function aptBeltLoader(D, x, z, ry) { return __ZC(437, 106, this, arguments, new.target); }
function aptSteps(D, x, z, ry) { return __ZC(437, 107, this, arguments, new.target); }
function aptGPU(D, x, z, ry) { return __ZC(437, 108, this, arguments, new.target); }
function aptCone(D, x, z) { var C = swkAt(D, x, 0, z, 0); swkBox(C, 0.4, 0.04, 0.4, swkM(0x1A1A1C), 0, 0.02, 0); swkCyl(C, 0.04, 0.17, 0.7, swkM(0xF06018), 0, 0.37, 0, 10); swkCyl(C, 0.095, 0.12, 0.1, swkM(0xF0F0F0, null, { basic: true }), 0, 0.42, 0, 10); }
function aptDolly(D, x, z, ry, k) { return __ZC(437, 109, this, arguments, new.target); }
function aptFlood(D, x, z) { return __ZC(437, 110, this, arguments, new.target); }
function aptApron(G) { return __ZC(437, 111, this, arguments, new.target); }
(function () { if (typeof aptDress !== "function")
return; var d0 = aptDress; aptDress = function (G) { var r = d0.apply(this, arguments); try {
aptApron(G);
}
catch (e) {
if (window.console)
console.warn("[airport] apron", e);
} return r; }; })();
function aptHangarWork(G) { return __ZC(437, 112, this, arguments, new.target); }
(function () { if (typeof aptDress !== "function")
return; var d0 = aptDress; aptDress = function (G) { var r = d0.apply(this, arguments); try {
aptHangarWork(G);
}
catch (e) {
if (window.console)
console.warn("[airport] hangar", e);
} return r; }; })();
