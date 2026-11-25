/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(163, function () {
"use strict";
return [
function (title, salt) {
var t = (typeof TEMPS !== "undefined" ? TEMPS.list : []).filter(function (x) { return x.post && x.post.workplace === (typeof SPACEPORT_KEY !== "undefined" ? SPACEPORT_KEY : "") && x.post.title === title; })[0];
if (t)
return t.name;
var h = hash("orb-" + title + "-" + (salt || 0)), f = (h >>> 3) % 2 === 0, given = typeof TEMP_GIVEN_F !== "undefined" ? (f ? TEMP_GIVEN_F : TEMP_GIVEN_M) : ["Ada", "Sam"];
return given[(h >>> 5) % given.length] + " " + (typeof SURNAME !== "undefined" ? SURNAME[(h >>> 10) % SURNAME.length] : "Vance");
},
function () {
var R = ORB.ride, ph = R ? R.phase : "wait", k = R ? R.u : 0;
var E = { top: 0x6A9AD8, low: 0xBFD8F0, fog: 0xBFD8F0, fogD: 0.00002, sun: 0.9, sunCol: 0xFFF4E2, sunDir: [0.5, 0.7, -0.4], hemi: 0.85, hemiCol: 0xE8EEF8, hemiGround: 0x404858, stars: 0 };
function mix(a, b, t) { return new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, t))).getHex(); }
if (ph === "climb") {
E.top = mix(0x6A9AD8, 0x000000, k * 1.4);
E.low = mix(0xBFD8F0, 0x02040A, k * 1.2);
E.fog = E.low;
E.stars = Math.max(0, k * 2 - 1);
}
else if (ph === "coast" || ph === "arrive" || ph === "docked") {
var st = R.to && R.to.kind === "surface" && (ph === "arrive" || ph === "docked") ? R.to.k : null;
E.top = 0x000000;
E.low = 0x02040A;
E.fog = 0x02040A;
E.stars = 1;
E.sunDir = [0.7, 0.3, -0.5];
if (st === "mars") {
var t = ph === "docked" ? 1 : k;
E.top = mix(0x000000, 0xC8A078, t * 1.2 - 0.2);
E.low = mix(0x02040A, 0xE0B890, t * 1.2 - 0.2);
E.fog = E.low;
E.stars = 1 - t;
}
}
else if (ph === "home") {
E.top = mix(0x000000, 0x6A9AD8, k * 1.3);
E.low = mix(0x02040A, 0xBFD8F0, k * 1.3);
E.fog = E.low;
E.stars = Math.max(0, 1 - k * 2);
}
return E;
},
function (G) {
ORB.solids = [];
ORB.seats = [];
var hull = wM(0xE4E8EE), hull2 = wM(0xC8CED8), floor = wM(0x2E3440), trim = wM(0x24335E), seatM = wM(0x24335E), seatT = wM(0x3A4A7A), glass = wM(0xA8C8E8, { op: 0.12 });
var light = wB(0xF4F8FF, { fog: false }), gold = wM(0xE8C27A, { e: 0x3A2A08 });
wBox(4.2, 0.1, 21, floor, 0, -0.05, 1, G);
wBox(0.9, 0.02, 18.5, wM(0x3A4A7A), 0, 0.01, 2, G);
wBox(4.2, 0.1, 21, hull2, 0, 2.55, 1, G);
wBox(0.5, 0.04, 17, light, 0, 2.48, 2, G);
[-1, 1].forEach(function (s) { wBox(0.3, 0.04, 17, wB(0x8FD8FF, { fog: false }), s * 1.6, 2.44, 2, G); });
var wins = [];
for (var wr = 0; wr < 9; wr++)
wins.push(-7.6 + wr * 1.95 - 0.3);
[-1, 1].forEach(function (s) {
wBox(0.12, 0.8, 21, hull, s * 2.1, 0.4, 1, G);
wBox(0.12, 0.75, 21, hull, s * 2.1, 2.22, 1, G);
wBox(0.14, 0.06, 21, trim, s * 2.08, 0.82, 1, G);
var z0 = -9.6;
wins.forEach(function (wz) {
var a = wz - 0.6;
if (a > z0)
wBox(0.12, 1.05, a - z0, hull, s * 2.1, 1.32, (a + z0) / 2, G);
z0 = wz + 0.6;
var g = wBox(0.03, 1.05, 1.2, glass, s * 2.1, 1.32, wz, G);
g.renderOrder = 2;
});
if (z0 < 11.5)
wBox(0.12, 1.05, 11.5 - z0, hull, s * 2.1, 1.32, (11.5 + z0) / 2, G);
});
wBox(4.2, 2.6, 0.12, hull, 0, 1.3, 11.5, G);
var door = wBox(1.2, 2.1, 0.05, wM(0x8A93A2), 0, 1.05, 11.42, G);
var exitS = wSign(["EXIT · press E at the door"], 1.4, 0.3, "#0E1A2E", "#8FD8FF");
exitS.position.set(0, 2.3, 11.38);
exitS.rotation.y = Math.PI;
G.add(exitS);
wBox(1.6, 2.6, 0.12, hull, -1.3, 1.3, -9.6, G);
wBox(1.6, 2.6, 0.12, hull, 1.3, 1.3, -9.6, G);
wBox(1, 0.5, 0.12, hull, 0, 2.35, -9.6, G);
var bk = wSign(["SPACE CORP · ORBITAL LINE", "Fasten your belt while the sign is lit"], 1.5, 0.5, "#0E1A2E", "#BFD8FF");
bk.position.set(-1.3, 1.95, -9.53);
G.add(bk);
ORB.beltSign = wBox(0.5, 0.18, 0.03, wB(0xFFB040, { fog: false }), 1.3, 2.05, -9.53, G);
wBox(3.4, 0.1, 3.6, floor, 0, -0.05, -11.4, G);
wBox(3.4, 0.1, 3.6, hull2, 0, 2.55, -11.4, G);
[-1, 1].forEach(function (s) { var sw = wBox(0.12, 2.6, 3.6, hull, s * 1.7, 1.3, -11.4, G); sw.rotation.y = -s * 0.18; });
wBox(3.2, 0.9, 0.12, hull, 0, 0.45, -13.1, G);
wBox(3.2, 0.5, 0.12, hull, 0, 2.35, -13.1, G);
var ws = wBox(3.1, 1.3, 0.04, glass, 0, 1.55, -13.12, G);
ws.renderOrder = 2;
var con = wBox(3.1, 0.18, 0.9, wM(0x2A3040), 0, 1.0, -12.5, G);
con.rotation.x = 0.35;
for (var b = 0; b < 14; b++)
wBox(0.12, 0.03, 0.08, wB([0x6AE08A, 0xFFB040, 0x6AC8FF, 0xE86A6A][b % 4], { fog: false }), -1.3 + b * 0.2, 1.12, -12.42, G);
[-0.8, 0.8].forEach(function (x) { wBox(0.9, 0.05, 0.5, wB(0x2A8AC8, { fog: false }), x, 1.14, -12.62, G); });
ORB.solids.push({ x: 0, z: -12.5, hw: 1.6, hd: 0.6 });
for (var r = 0; r < 9; r++) {
var z3 = -7.6 + r * 1.95;
[-1.55, -0.95, 0.95, 1.55].forEach(function (x) {
var g = new THREE.Group();
g.position.set(x, 0, z3);
G.add(g);
wBox(0.54, 0.12, 0.5, seatM, 0, 0.46, 0, g);
wBox(0.54, 0.75, 0.1, seatM, 0, 0.88, 0.25, g);
wBox(0.5, 0.18, 0.08, seatT, 0, 1.3, 0.27, g);
wBox(0.06, 0.24, 0.46, trim, 0.29 * (x < 0 ? -1 : 1), 0.6, 0, g);
wBox(0.08, 0.4, 0.08, wM(0x5A6474), 0, 0.2, 0, g);
ORB.seats.push({ x: x, z: z3, taken: false });
});
ORB.solids.push({ x: -1.25, z: z3 + 0.05, hw: 0.6, hd: 0.32 }, { x: 1.25, z: z3 + 0.05, hw: 0.6, hd: 0.32 });
}
var O = ORB.out = {};
O.stars = wPoints(1800, function () { var v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(2400); return [v.x, v.y, v.z]; }, 0xFFFFFF, 2.2, false);
O.stars.material.transparent = true;
G.add(O.stars);
var gt = wTex(256, 256, function (x, W, H) { x.fillStyle = "#4A7A3A"; x.fillRect(0, 0, W, H); for (var i = 0; i < 500; i++) {
x.fillStyle = ["#3A6A2E", "#6A8A44", "#8A7A50", "#5A5A5A", "#2A5A8A"][i % 5];
x.fillRect(Math.random() * W, Math.random() * H, 4 + Math.random() * 24, 4 + Math.random() * 24);
} }, [24, 24]);
O.ground = wMesh(new THREE.PlaneGeometry(9000, 9000), new THREE.MeshLambertMaterial({ map: gt }), 0, -4, 0, G);
O.ground.rotation.x = -Math.PI / 2;
O.pad = wCyl(12, 12, 0.4, wM(0x5A5E66), 0, -3.8, 0, G, 32);
O.tower = wBox(1.6, 30, 1.6, wM(0xB84A3A), -10, 11, 0, G);
O.earth = wMesh(new THREE.SphereGeometry(900, 48, 32), new THREE.MeshBasicMaterial({ map: spPaint("earth"), fog: false }), 0, -1600, 400, G);
O.earth.add(wGlow(0x6AA8FF, 2200, 0.22));
O.body = wMesh(new THREE.SphereGeometry(300, 40, 28), new THREE.MeshBasicMaterial({ map: spPaint("moon"), fog: false }), 0, 0, -2000, G);
var ct = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#B8B4AC";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 70; i++) {
var cx = Math.random() * W, cy = Math.random() * H, r = 3 + Math.pow(Math.random(), 2) * 30;
x.fillStyle = "rgba(60,58,54,0.35)";
x.beginPath();
x.arc(cx, cy, r, 0, 7);
x.fill();
x.strokeStyle = "rgba(230,226,218,0.5)";
x.lineWidth = 1.5;
x.beginPath();
x.arc(cx - 1, cy - 1, r, 3.4, 5.6);
x.stroke();
}
}, [30, 30]);
O.surf = wMesh(new THREE.PlaneGeometry(9000, 9000, 1, 1), new THREE.MeshLambertMaterial({ color: 0x8A867E, map: ct }), 0, -400, 0, G);
O.surf.rotation.x = -Math.PI / 2;
O.station = spStation(G, "orb", "", "earth", new THREE.Vector3(), 0x3A6AB8);
O.station.scale.setScalar(1.4);
O.station.rotation.y = Math.PI / 2;
O.earth.rotation.z = 1.1;
ORB.crew = [];
},
function () {
var G = WORLDS.shuttle.g;
if (!G)
return;
ORB.crew.forEach(function (c) { if (c.g.parent)
c.g.parent.remove(c.g); if (c.tag)
dropTag(c.tag); });
ORB.crew = [];
ORB.seats.forEach(function (s) { s.taken = false; });
var R = ORB.ride, salt = R ? R.dep : 0;
var CREW_LOOK = { layer: "suit", layerColor: 0x1C2A48, top: 0xF2F2EE, topKind: "shirt", bottom: 0x1C2A48, bottomKind: "trousers", shoes: 0x141414 };
function person(seed, title, look) { var g = wPerson("orb_" + seed + "_" + salt, { title: title, place: typeof SPACEPORT_KEY !== "undefined" ? SPACEPORT_KEY : "The Space Corp Spaceport", look: look || (title ? CREW_LOOK : null) }); G.add(g); return g; }
[["cap", "Shuttle captain", -0.8], ["fo", "First officer", 0.8]].forEach(function (q) {
var g = person(q[0], q[1]);
g.position.set(q[2], 0.08, -11.8);
g.rotation.y = Math.PI;
g.userData.seated = true;
g.userData.pose = "sit";
var seat = new THREE.Group();
seat.position.set(q[2], 0, -11.75);
G.add(seat);
wBox(0.6, 0.12, 0.55, wM(0x1A2238), 0, 0.46, 0, seat);
wBox(0.6, 0.9, 0.12, wM(0x1A2238), 0, 0.95, 0.3, seat);
var nm = orbCrewName(q[1], salt), tag = makeTag(nm + " · " + q[1] + " (stand-in)", false);
tag.position.y = 1.75;
g.add(tag);
ORB.crew.push({ g: g, role: q[0], name: nm, title: q[1], extra: seat });
});
[["cc1", "Cabin crew", 0, 6], ["cc2", "Cabin crew", 0.9, 10.6]].forEach(function (q, i) {
var g = person(q[0], q[1]);
g.position.set(q[2], 0, q[3]);
g.rotation.y = i ? Math.PI : 0;
var nm = orbCrewName(q[1], salt + i), tag = makeTag(nm + " · " + q[1] + " (stand-in)", false);
tag.position.y = 2.05;
g.add(tag);
ORB.crew.push({ g: g, role: q[0], name: nm, title: q[1], aisle: !i, dir: -1 });
});
var rnd = wRand((salt | 0) + 11), n = 6 + Math.floor(rnd() * 6);
for (var p = 0; p < n; p++) {
var s = ORB.seats[Math.floor(rnd() * ORB.seats.length)];
if (s.taken)
continue;
s.taken = true;
var g = person("p" + p, null);
g.position.set(s.x, 0.08, s.z - 0.05);
g.rotation.y = Math.PI;
g.userData.seated = true;
g.userData.pose = "sit";
ORB.crew.push({ g: g, role: "pax" });
}
},
function (who, txt) {
var c = ORB.crew.filter(function (q) { return q.role === who; })[0];
setStatus("<b>" + esc(c ? c.name : "The captain") + (c ? " (" + esc(c.title) + ")" : "") + ":</b> " + esc(txt));
if (c && c.g) {
if (c.bub)
dropTag(c.bub);
c.bub = makeTag(txt.length > 110 ? txt.slice(0, 108) + "…" : txt, true);
c.bub.position.y = 2.0 + c.bub.scale.y / 2 + 0.3;
c.g.add(c.bub);
c.bubLeft = Math.max(6, txt.length / 13);
}
},
function (lineK, fromK, toK) {
var line = orbLine(lineK);
if (!line)
return;
var fi = orbStop(line, fromK);
if (fi < 0)
return;
var dir = fromK === "earth" ? 1 : (toK === "earth" ? -1 : 1), ti = toK ? orbStop(line, toK) : fi + dir;
if (ti < 0 || ti >= line.stops.length)
ti = fromK === "earth" ? 1 : 0;
var R = { line: line, from: line.stops[fi], to: line.stops[ti], fi: fi, ti: ti, dep: orbNext(line, orbNow() + 20), phase: "wait", u: 0, t: 0, said: {} };
worldCard(null);
if (WLD.on === "shuttle") {
ORB.ride = R;
orbStage();
return;
}
worldGo("shuttle", { ride: R, keepFrom: WLD.on ? true : false });
},
function (opt) {
ORB.ride = opt.ride;
var R = ORB.ride;
orbCrew();
var mine = null;
for (var i = 0; i < ORB.seats.length; i++) {
var s = ORB.seats[i];
if (!s.taken && s.x > 1.2) {
mine = s;
break;
}
}
ORB.seat = mine;
if (mine)
mine.taken = true;
camera.position.set(WORLDS.shuttle.base, 1.72, 10.2);
yaw = 0;
pitch = 0;
ORB.sitting = false;
orbStage();
setStatus("<b>Welcome aboard the " + esc(R.line.name) + ".</b> Next stop: " + esc(R.to.name) + ". Take any empty seat: walk up to it and press <b>E</b> to sit down; Back steps off before we leave.");
},
function () {
var R = ORB.ride, O = ORB.out;
if (!R || !O)
return;
var onEarth = R.from.k === "earth", toEarth = R.to.k === "earth";
O.ground.visible = O.pad.visible = O.tower.visible = false;
O.surf.visible = false;
O.body.visible = false;
O.station.visible = false;
O.earth.visible = false;
if (R.phase === "wait") {
if (onEarth) {
O.ground.visible = O.pad.visible = O.tower.visible = true;
O.ground.position.y = -4;
O.pad.position.y = -3.8;
O.tower.position.y = 11;
}
else if (R.from.kind === "surface") {
O.surf.visible = true;
O.surf.position.y = -1;
O.surf.material.color.setHex(typeof orbSurfCol === "function" ? orbSurfCol(R.from.k) : R.from.k === "mars" ? 0xD07A4A : 0xA8A49C);
}
else {
O.station.visible = true;
O.station.position.set(220, -12, -40);
O.earth.visible = true;
O.earth.material.map = spPaint(R.from.host);
O.earth.material.needsUpdate = true;
O.earth.position.set(1000, -1000, 300);
O.earth.scale.setScalar(1);
}
}
},
function (dt) {
var R = ORB.ride;
if (!R)
return;
var B = WORLDS.shuttle.base, L = worldLocal(), now = orbNow(), O = ORB.out;
if (ORB.sitting && ORB.seat) {
var s = ORB.seat;
camera.position.x = B + s.x;
camera.position.z = s.z + 0.05;
}
if (R.phase === "wait") {
var left = R.dep - now;
if (left <= 0) {
if (!ORB.sitting)
orbSit();
R.phase = "climb";
R.t = 0;
R.u = 0;
R.said = {};
orbSay("cap", R.from.k === "earth" ? "Launch Pad 1, Orbital Line " + R.line.name + ", we are go for launch. Three, two, one: lift-off." : "Releasing from " + R.from.name + ". Engines to full.");
if (typeof playTone === "function") {
playTone(80, 2.6);
setTimeout(function () { playTone(60, 2.2); }, 700);
}
}
else if (!R.said.board && left < 60) {
R.said.board = 1;
orbSay("cc2", "Welcome aboard. Please take your seats: departure in " + orbMins(left) + ".");
}
}
else {
R.t += dt;
var D = { climb: 9, coast: 30, arrive: 8 }[R.phase] || 0;
R.u = D ? Math.min(1, R.t / D) : 1;
if (R.phase === "climb") {
ORB.shake = 0.025 * (1 - R.u * 0.6);
if (R.from.k === "earth") {
var h = R.u * R.u * 1400;
O.ground.position.y = -4 - h;
O.pad.position.y = -3.8 - h;
O.tower.position.y = 11 - h;
}
else if (R.from.kind === "surface") {
O.surf.position.y = -1 - R.u * R.u * 900;
}
else {
O.station.position.x = 220 + R.u * R.u * 900;
O.station.position.z = -40 + R.u * R.u * 600;
}
if (R.u > 0.3 && !R.said.fact) {
R.said.fact = 1;
orbSay("fo", ORB_LAUNCH_FACTS[Math.floor(R.dep / ORB_PERIOD) % ORB_LAUNCH_FACTS.length]);
}
if (R.u >= 1) {
R.phase = "coast";
R.t = 0;
ORB.shake = 0;
orbStage();
O.earth.visible = true;
var hb = R.to.k === "earth" ? "earth" : R.to.host;
R.toEarth = R.to.k === "earth";
if (R.to.kind === "station") {
O.station.visible = true;
}
else if (!R.toEarth) {
O.body.visible = true;
O.body.material.map = spPaint(hb);
O.body.material.needsUpdate = true;
}
else if (R.from.host !== "earth") {
O.body.visible = true;
O.body.material.map = spPaint(R.from.host);
O.body.material.needsUpdate = true;
}
O.earth.material.map = spPaint(R.toEarth || R.from.k === "earth" ? "earth" : R.from.host);
O.earth.material.needsUpdate = true;
orbSay("cap", "We are in space. You may unfasten your belt and look out of the windows. Next stop: " + R.to.name + ".");
}
}
else if (R.phase === "coast") {
var e = R.toEarth ? 1 - R.u : R.u;
O.earth.position.set(1000 + e * 1500, -1000 - e * 1200, e * 2000);
O.earth.scale.setScalar(1 - e * 0.5);
if (R.toEarth && O.body.visible) {
O.body.position.set(-200, -150, 800 + R.u * 3000);
O.body.scale.setScalar(Math.max(0.1, 1 - R.u * 0.8));
}
if (O.body.visible && !R.toEarth) {
O.body.position.set(1600 - R.u * 900, -60, -3200 + R.u * 2700);
O.body.scale.setScalar(0.3 + R.u * 0.9);
}
if (O.station.visible) {
O.station.position.set(900 - R.u * 680, -20, -2400 + R.u * 2360);
O.station.userData.wheel.rotation.z += dt * 0.15;
}
var facts = R.to.facts || ["Home: the blue marble. From space you cannot see a single border between countries.", "Earth's atmosphere is so thin that, from orbit, it looks like a blue line along the edge of the planet."];
var fi = Math.floor(R.u * facts.length * 0.999);
if (R.t > 3 && !R.said["f" + fi]) {
R.said["f" + fi] = 1;
orbSay(fi % 2 ? "fo" : "cap", facts[fi]);
}
if (R.u >= 1) {
R.phase = "arrive";
R.t = 0;
orbSay("cap", R.to.kind === "surface" ? "Beginning our descent to " + R.to.name + ". Belts on, please." : R.to.kind === "station" ? "Docking with " + R.to.name + "." : "Re-entering Earth's atmosphere. It will be warm outside; we will be home shortly.");
if (R.to.k === "earth")
R.phase = "home";
}
}
else if (R.phase === "arrive" || R.phase === "home") {
R.u = Math.min(1, R.t / 8);
if (R.to.kind === "surface") {
O.body.visible = R.u < 0.4;
O.surf.visible = true;
O.surf.material.color.setHex(typeof orbSurfCol === "function" ? orbSurfCol(R.to.k) : R.to.k === "mars" ? 0xD07A4A : 0xA8A49C);
O.surf.position.y = -600 + R.u * 599;
}
else if (R.to.kind === "station") {
O.station.position.set(220, -12, -40);
O.station.userData.wheel.rotation.z += dt * 0.1;
}
else {
ORB.shake = 0.02 * Math.sin(R.u * Math.PI);
O.ground.visible = O.pad.visible = O.tower.visible = true;
var h2 = (1 - R.u) * (1 - R.u) * 1400;
O.ground.position.y = -4 - h2;
O.pad.position.y = -3.8 - h2;
O.tower.position.y = 11 - h2;
O.earth.visible = R.u < 0.5;
}
if (R.u >= 1) {
R.phase = "docked";
R.t = 0;
ORB.shake = 0;
var more = R.ti + 1 < R.line.stops.length && R.to.k !== "earth";
orbSay("cc1", "Welcome to " + R.to.name + ". Mind your step at the door." + (more ? " Staying on for " + R.line.stops[R.ti + 1].name + "? Keep your seat: we leave again shortly." : ""));
R.next = more ? now + 40 : null;
}
}
else if (R.phase === "docked") {
if (R.next && now >= R.next) {
var nt = R.ti + 1;
R.from = R.to;
R.fi = R.ti;
R.ti = nt;
R.to = R.line.stops[nt];
R.phase = "climb";
R.t = 0;
R.u = 0;
R.said = { fact: 1 };
orbSay("cap", "Doors closed. Next stop: " + R.to.name + ".");
}
}
}
ORB.crew.forEach(function (c) {
if (c.aisle) {
c.g.position.z += c.dir * dt * 0.7;
if (c.g.position.z < -8) {
c.dir = 1;
}
if (c.g.position.z > 9.5) {
c.dir = -1;
}
c.g.rotation.y = c.dir < 0 ? Math.PI : 0;
}
if (c.bub) {
c.bubLeft -= dt;
if (c.bubLeft <= 0) {
dropTag(c.bub);
c.bub = null;
}
}
});
if (ORB.shake) {
camera.position.x += (Math.random() - 0.5) * ORB.shake;
camera.position.y += (Math.random() - 0.5) * ORB.shake;
}
if (O.stars) {
O.stars.position.set(0, 0, 0);
O.stars.material.opacity = orbEnv().stars;
O.stars.visible = O.stars.material.opacity > 0.02;
}
if (ORB.beltSign)
ORB.beltSign.material.color.setHex((R.phase === "climb" || R.phase === "arrive" || R.phase === "home" || (R.phase === "wait" && R.dep - now < 30)) ? 0xFFB040 : 0x3A3020);
var dock = R.phase === "docked" || R.phase === "wait";
var oSeat = ORB.sitting ? null : orbSeatNear(L);
if (oSeat)
worldPrompt("<b>" + (oSeat === ORB.seat ? "Your seat" : "An empty seat") + "</b> · <b>press E</b> to sit down", function () { orbTake(oSeat); });
else if (ORB.sitting && dock)
worldPrompt(R.phase === "docked" ? "<b>" + esc(R.to.name) + "</b> · <b>press E</b> to get off here" : "<b>press E</b> to stand up", R.phase === "docked" ? orbOff : orbStand);
else if (ORB.sitting)
worldPrompt(null);
else if (dock && wNear(L.x, L.z, 0, 10.8, 1.4))
worldPrompt(R.phase === "docked" ? "<b>The door</b> · <b>press E</b> to get off at " + esc(R.to.name) : "<b>The door</b> · <b>press E</b> to step off before we leave", R.phase === "docked" ? orbOff : orbBack);
else
worldPrompt(null);
var h = "<b style='color:" + R.line.col + "'>" + esc(R.line.name) + "</b> · ";
if (R.phase === "wait")
h += "at " + esc(R.from.name) + " · departs in " + orbMins(R.dep - now) + " · next stop " + esc(R.to.name);
else if (R.phase === "docked")
h += "at " + esc(R.to.name) + (R.next ? " · leaves for " + esc(R.line.stops[R.ti + 1].name) + " in " + orbMins(R.next - now) : " · end of the line");
else
h += "on the way to " + esc(R.to.name) + (R.phase === "climb" ? " · climbing" : R.phase === "coast" ? " · in space" : " · arriving");
worldBanner(h);
},
function () {
var R = ORB.ride;
if (R && R.phase !== "wait" && R.phase !== "docked") {
setStatus("Not between stops: the doors are sealed until we arrive.");
return;
}
if (R && R.phase === "docked") {
orbOff();
return;
}
if (R && R.from.k !== "earth") {
ORB.ride = null;
orbArrive(R.from);
return;
}
ORB.ride = null;
worldHome("You step back off the shuttle onto Launch Pad 1.");
},
function (stop) {
if (stop.k === "earth") {
worldOff(true);
if (typeof spHomeToCity === "function") {
var pad = spPadSpot();
if (pad) {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (r && (store.here || 0) !== r.id && typeof beHere === "function")
beHere(r.id);
camera.position.set(pad.x + 14, pad.y + 1.72, pad.z + 14);
yaw = pad.yaw || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
WLD.from = null;
if (typeof tickClock === "function")
tickClock(true);
setStatus("<b>Touchdown.</b> Off the Orbital Line at Launch Pad 1, the Space Corp Spaceport, Somnucor.");
return;
}
}
worldHome("<b>Home.</b>");
return;
}
orbEnsureSpace();
if (stop.kind === "station")
worldGo("station", { station: stop.k, keepFrom: true });
else if (stop.kind === "surface") {
SF.ret = null;
worldGo("surface", { k: stop.k, keepFrom: true });
}
},
function (here) {
var now = orbNow(), html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Orbital Line · departures</div><div style='opacity:.8;margin-bottom:4px'>Space Corp shuttles, on the timetable. No fare: the Corp runs the line for the city.</div>", fns = {};
ORB_LINES.forEach(function (line) {
var i = orbStop(line, here);
if (i < 0)
return;
var t = orbNext(line, now + 20);
var dests = [];
if (here === "earth")
dests.push(line.stops[1].k);
else {
dests.push("earth");
if (i + 1 < line.stops.length)
dests.push(line.stops[i + 1].k);
}
dests.forEach(function (dk) {
var d = line.stops[orbStop(line, dk)], key = "b-" + line.k + "-" + dk;
var via = here === "earth" && line.stops[2] ? " (then " + line.stops[2].name + ")" : "";
html += worldBtn(key, "<span style='color:" + line.col + "'>" + esc(line.name) + "</span> to " + esc(d.name) + esc(via), "Departs in " + orbMins(t - now) + ", then every " + Math.round(ORB_PERIOD / 60 * 10) / 10 + " minutes · press to board");
fns[key] = function () { orbBoard(line.k, here, dk); };
});
});
worldCard(html, fns);
},
function () {
var cv = ORB.boardCv;
if (!cv)
return;
var x = cv.getContext("2d"), W = cv.width, H = cv.height, now = orbNow();
x.fillStyle = "#0A1222";
x.fillRect(0, 0, W, H);
x.fillStyle = "#8FD8FF";
x.font = "bold 30px sans-serif";
x.fillText("ORBITAL LINE · DEPARTURES", 20, 42);
x.font = "22px sans-serif";
x.fillStyle = "#BFD8FF";
x.fillText("Space Corp · Launch Pad 1 · no fare", 20, 74);
var rows = [];
ORB_LINES.forEach(function (l) { var t = orbNext(l, now + 20); rows.push([t, l]); rows.push([t + ORB_PERIOD, l]); });
rows.sort(function (a, b) { return a[0] - b[0]; });
rows.slice(0, 4).forEach(function (r, i) {
var y = 120 + i * 44, l = r[1];
x.fillStyle = l.col;
x.font = "bold 24px sans-serif";
x.fillText(l.name, 20, y);
x.fillStyle = "#E8ECF4";
x.font = "22px sans-serif";
x.fillText(l.stops[1].name.split(":")[0] + (l.stops[2] ? " · " + l.stops[2].name.split(":")[0] : ""), 200, y);
x.fillStyle = i === 0 ? "#FFE7B0" : "#BFD8FF";
x.font = "bold 24px monospace";
x.fillText(orbMins(r[0] - now), W - 150, y);
});
x.fillStyle = "#6AE08A";
x.font = "20px sans-serif";
x.fillText("Press E at the board to board", 20, H - 16);
ORB.boardTex.needsUpdate = true;
}
];
});
