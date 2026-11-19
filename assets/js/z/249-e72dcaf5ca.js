/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(249, function () {
"use strict";
return [
function (lines, bg, fg, w, h) {
var c = document.createElement("canvas");
c.width = w || 512;
c.height = h || 128;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, c.width, c.height);
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
lines.forEach(function (t, k) {
var sz = k ? 26 : 52;
x.font = (k ? "" : "bold ") + sz + "px Georgia,serif";
while (x.measureText(t).width > c.width - 30 && sz > 12) {
sz -= 2;
x.font = (k ? "" : "bold ") + sz + "px Georgia,serif";
}
x.fillText(t, c.width / 2, lines.length === 1 ? c.height / 2 : (k ? c.height * 0.75 : c.height * 0.36));
});
return new THREE.CanvasTexture(c);
},
function (a, word, lamps) {
var T = RACE.trk, g = new THREE.Group(), post = mL(0x2A2C30), rs = T.rs;
[-1, 1].forEach(function (s) { var p = raceXZ(a, rs + s * 8), m = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 6.4, 10), post); m.position.set(p.x, terrainY(p.x, p.z) + 3.2, p.z); g.add(m); });
var c = raceXZ(a, rs), y = terrainY(c.x, c.z) + 6.1;
var bar = new THREE.Mesh(new THREE.BoxGeometry(16.6, 1.3, 0.25), new THREE.MeshBasicMaterial({ map: raceTex([word, "Warrens Street Racing Club"], "#1A1A22", "#FFD25A", 1024, 96) }));
bar.position.set(c.x, y, c.z);
bar.rotation.y = -a;
g.add(bar);
var bar2 = bar.clone();
bar2.position.y = y;
bar2.rotation.y = -a + Math.PI;
bar2.position.x += -Math.sin(a) * 0.01;
g.add(bar2);
var ln = new THREE.Mesh(new THREE.BoxGeometry(12, 0.03, 1.2), new THREE.MeshLambertMaterial({ map: raceChecker() }));
ln.position.set(c.x, terrainY(c.x, c.z) + 0.04, c.z);
ln.rotation.y = -a;
g.add(ln);
if (lamps) {
var L = [];
for (var i = 0; i < 3; i++) {
var off = new THREE.MeshBasicMaterial({ color: 0x2A1A1A });
var q = raceXZ(a - 0.4 / rs, rs + (i - 1) * 1.1), m2 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 10), off);
m2.position.set(q.x, y - 1.1, q.z);
g.add(m2);
L.push(m2);
}
RACE.lamps = L;
}
g.traverse(function (m) { if (m.isMesh)
m.raycast = function () { }; });
return g;
},
function () {
var T = raceTrack();
if (!T || RACE.g)
return;
var g = new THREE.Group();
g.add(raceGantry(T.a0, "START", true));
g.add(raceGantry(T.a1, "FINISH", false));
for (var d = RACE_SIGN; d <= 46; d += 1.5) {
var q = raceXZ(T.a0 - d / T.rs, T.rs + 9.5), clear = !blockedAt(q.x, q.z, terrainY(q.x, q.z) + 0.3);
if (clear && typeof RMAP !== "undefined" && RMAP.list)
RMAP.list.forEach(function (K) { if (Math.abs(q.x - K.x) < 5 && Math.abs(q.z - K.z) < 5)
clear = false; });
for (var k = 0; clear && k < store.objects.length; k++) {
var o = store.objects[k];
if (o.city && Math.abs(o.x - q.x) < 4.5 && Math.abs(o.z - q.z) < 4.5)
clear = false;
}
if (clear) {
RACE_SIGN = d;
break;
}
}
var sp = raceXZ(T.a0 - RACE_SIGN / T.rs, T.rs + 9.5), sy = terrainY(sp.x, sp.z);
var sg = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.9, 0.12), new THREE.MeshBasicMaterial({ map: raceTex(["Street Racing Club", "Races on a closed street · press E"], "#14141C", "#FFD25A", 512, 288) }));
sg.position.set(sp.x, sy + 2.4, sp.z);
sg.rotation.y = Math.PI / 2 - T.a0 + Math.PI;
g.add(sg);
[-1.4, 1.4].forEach(function (o) { var pp = raceXZ(T.a0 - RACE_SIGN / T.rs + o / T.rs, T.rs + 9.5), pm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 8), mL(0x2A2C30)); pm.position.set(pp.x, sy + 0.8, pp.z); g.add(pm); });
RACE.sign = sp;
if (typeof guideTo !== "undefined" && guideTo && guideTo.key === RACE_NAME) {
guideTo.x = sp.x;
guideTo.z = sp.z;
}
T.cps.forEach(function (a) { [-1, 1].forEach(function (s) { var q = raceXZ(a, T.rs + s * 6.4), cm = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 12), mL(0xE8701A)); cm.position.set(q.x, terrainY(q.x, q.z) + 0.4, q.z); g.add(cm); }); });
g.traverse(function (m) { if (m.isMesh)
m.raycast = function () { }; });
scene.add(g);
RACE.g = g;
try {
raceLights();
}
catch (e) {
if (window.console)
console.warn("race lights:", e);
}
},
function () {
var T = RACE.trk;
if (!T || RACE.lit)
return;
var g = new THREE.Group(), masts = [], pools = [], rings = [], M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(1, 1, 1), Y = new THREE.Vector3(0, 1, 0);
function free(x, z) {
if (blockedAt(x, z, terrainY(x, z) + 0.3))
return false;
for (var k = 0; k < store.objects.length; k++) {
var o = store.objects[k];
if (o.city && Math.abs(o.x - x) < 2.2 && Math.abs(o.z - z) < 2.2)
return false;
}
return true;
}
var n = Math.floor(T.len / RACE_MAST_GAP);
for (var i = 0; i <= n; i++) {
[-1, 1].forEach(function (sd) {
var d = i * RACE_MAST_GAP + (sd > 0 ? 0 : RACE_MAST_GAP / 2);
if (d > T.len)
return;
var a = T.a0 + d / T.rs, r = null;
[9.2, 10.2, 11.2, 8.6].some(function (off) { var q = raceXZ(a, T.rs + sd * off); if (free(q.x, q.z)) {
r = T.rs + sd * off;
return true;
} return false; });
if (r === null)
return;
var q = raceXZ(a, r);
masts.push({ x: q.x, z: q.z, y: terrainY(q.x, q.z), a: a, sd: sd });
var c = raceXZ(a, T.rs + sd * 2.5);
pools.push({ x: c.x, z: c.z, y: terrainY(c.x, c.z) });
});
}
T.cps.forEach(function (a) { [-1, 1].forEach(function (sd) { var q = raceXZ(a, T.rs + sd * 6.4); rings.push({ x: q.x, z: q.z, y: terrainY(q.x, q.z) }); }); });
[T.a0, T.a1].forEach(function (a) { var c = raceXZ(a, T.rs); pools.push({ x: c.x, z: c.z, y: terrainY(c.x, c.z), big: 1 }); });
var gens = masts.filter(function (m, k) { return k % 3 === 0; }), pole = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.05, 0.06, 3.2, 6), mL(0x2A2C30), masts.length), legs = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 5), mL(0x2A2C30), masts.length * 3), arm = new THREE.InstancedMesh(new THREE.BoxGeometry(1.2, 0.08, 0.08), mL(0x2A2C30), masts.length), headOn = new THREE.MeshBasicMaterial({ color: 0xFFF1D0 }), headOff = new THREE.MeshLambertMaterial({ color: 0x8A8C90 }), head = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.55, 0.18), headOff, masts.length * 2), gen = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 0.6, 0.6), mL(0xE8B820), gens.length);
masts.forEach(function (m, k) {
var face = Math.atan2(-(ATLC.x - m.x) * m.sd, -(ATLC.z - m.z) * m.sd);
Q.setFromAxisAngle(Y, face);
M.compose(new THREE.Vector3(m.x, m.y + 1.6, m.z), new THREE.Quaternion(), S);
pole.setMatrixAt(k, M);
for (var j = 0; j < 3; j++) {
var la = face + j * Math.PI * 2 / 3, lq = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.45 * Math.cos(la), 0, -0.45 * Math.sin(la)));
M.compose(new THREE.Vector3(m.x + Math.sin(la) * 0.32, m.y + 0.7, m.z + Math.cos(la) * 0.32), lq, S);
legs.setMatrixAt(k * 3 + j, M);
}
var ux = Math.sin(face), uz = Math.cos(face), px = uz, pz = -ux, tilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.5, face, 0, "YXZ"));
M.compose(new THREE.Vector3(m.x, m.y + 3.2, m.z), Q, S);
arm.setMatrixAt(k, M);
[-0.45, 0.45].forEach(function (o, j) { M.compose(new THREE.Vector3(m.x + px * o + ux * 0.1, m.y + 3.32, m.z + pz * o + uz * 0.1), tilt, S); head.setMatrixAt(k * 2 + j, M); });
});
gens.forEach(function (m, k) {
var face = Math.atan2(-(ATLC.x - m.x) * m.sd, -(ATLC.z - m.z) * m.sd);
Q.setFromAxisAngle(Y, face);
M.compose(new THREE.Vector3(m.x - Math.sin(face) * 0.9, m.y + 0.3, m.z - Math.cos(face) * 0.9), Q, S);
gen.setMatrixAt(k, M);
});
var flareOn = new THREE.MeshBasicMaterial({ color: 0xFF5A3A }), flareOff = new THREE.MeshLambertMaterial({ color: 0x8A2A22 }), flare = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.05, 0.05, 0.34, 6), flareOff, rings.length);
rings.forEach(function (p, k) { M.compose(new THREE.Vector3(p.x + 0.6, p.y + 0.17, p.z + 0.6), new THREE.Quaternion(), S); flare.setMatrixAt(k, M); });
var poolMat = new THREE.MeshBasicMaterial({ color: 0xFFC870, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2 }), ringMat = new THREE.MeshBasicMaterial({ color: 0xFF4A30, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2 }), flat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2), pool = new THREE.InstancedMesh(new THREE.CircleGeometry(6, 28), poolMat, pools.length), ring = new THREE.InstancedMesh(new THREE.CircleGeometry(1.3, 20), ringMat, rings.length);
pools.forEach(function (p, k) { var sc = p.big ? 1.3 : 1; M.compose(new THREE.Vector3(p.x, p.y + 0.07, p.z), flat, new THREE.Vector3(sc, sc, sc)); pool.setMatrixAt(k, M); });
rings.forEach(function (p, k) { M.compose(new THREE.Vector3(p.x, p.y + 0.06, p.z), flat, S); ring.setMatrixAt(k, M); });
var barMat = new THREE.MeshBasicMaterial({ color: 0x3A3830 }), bars = [];
[T.a0, T.a1].forEach(function (a) { var c = raceXZ(a, T.rs), b = new THREE.Mesh(new THREE.BoxGeometry(15, 0.18, 0.3), barMat); b.position.set(c.x, terrainY(c.x, c.z) + 5.35, c.z); b.rotation.y = -a; g.add(b); bars.push(b); });
[pole, legs, arm, head, gen, flare, pool, ring].forEach(function (m) { m.instanceMatrix.needsUpdate = true; m.frustumCulled = false; g.add(m); });
g.traverse(function (m) { if (m.isMesh)
m.raycast = function () { }; });
scene.add(g);
RACE.lit = { g: g, head: head, headOn: headOn, headOff: headOff, flare: flare, flareOn: flareOn, flareOff: flareOff, pool: poolMat, ring: ringMat, bar: barMat, at: 0, n: -1, masts: masts.length };
raceLightsTick(1);
},
function (on) {
if (!on) {
if (RACE.bar) {
scene.remove(RACE.bar);
RACE.bar = null;
}
return;
}
if (RACE.bar)
return;
var T = RACE.trk, g = new THREE.Group(), tex = raceTex(["ROAD CLOSED", "Race in progress"], "#F2F2EE", "#B81E1E", 512, 128);
[T.a0 - 30 / T.rs, T.a1 + 30 / T.rs].forEach(function (a) {
var c = raceXZ(a, T.rs), b = new THREE.Mesh(new THREE.BoxGeometry(11, 1.1, 0.2), new THREE.MeshLambertMaterial({ map: tex }));
b.position.set(c.x, terrainY(c.x, c.z) + 0.9, c.z);
b.rotation.y = -a;
g.add(b);
});
g.traverse(function (m) { if (m.isMesh)
m.raycast = function () { }; });
scene.add(g);
RACE.bar = g;
},
function () {
var b = raceBest(), html = worldFacts("Warrens Street Racing Club", "A closed street, a timed run, three rivals", [["Course", "The Warrens' street, " + Math.round(RACE.trk.len) + " m, six checkpoints"], ["Your best", b ? raceFmt(b) : "no time yet"], ["Needs", "a driving licence"]], ["None of this is legal. The racers close the street themselves, and now and then the Dragon Corp raids it.", "The club keeps a scout on the corner: when the scout radios that the Corp is coming, scatter. Get off the course, or across the line, before they arrive. Caught on the course: a fine and points on your licence.", "Crashes are real: the car is damaged and you can be hurt."]);
var night = raceNight();
if (!night)
html += "<div style='margin:4px 0 8px;color:#FFD25A'><b>" + esc(raceDayWords()) + "</b> Come back after dark.</div>";
if (night) {
html += worldBtn("live", "Race other players", "A live heat on this street: join the grid with up to 7 others");
html += "<div id='race-lobby' style='margin:-2px 0 6px;font-size:12px;opacity:.8'></div>";
html += worldBtn("club", "Race the club's three rivals", "In the club's sports car, waiting on the start line");
}
html += worldBtn("garage", "The club's garage", "Turbo upgrades and car lights, earned by racing");
html += "<div id='race-board' style='margin-top:8px;font-size:13px;opacity:.9'>The club's board…</div>";
worldCard(html, { club: function () { worldCard(null); raceStart(null); },
live: function () { worldCard(null); rliveJoin(false); }, garage: function () { rgarOpen(); } });
if (night)
rliveLobby();
raceBoardLoad().then(function (rows) {
var el = document.getElementById("race-board");
if (!el)
return;
el.innerHTML = "<b>The club's board</b><br>" + (rows && rows.length ? rows.map(function (r, i) { return (i + 1) + ". " + esc(r.name || "a racer") + " · " + raceFmt(r.ms); }).join("<br>") : "No times yet: be the first.");
});
},
function () {
if (RACE.board && Date.now() - RACE.boardAt < 30000)
return Promise.resolve(RACE.board);
var local = function () { var b = raceBest(); return b ? [{ name: "You (this browser)", ms: b }] : []; };
if (RACE.missing || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve(local());
return cityRpc("race_board", { p_track: "warrens" }).then(function (o) { RACE.board = (o && o.rows) || []; RACE.boardAt = Date.now(); return RACE.board; })
.catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
RACE.missing = true; return local(); });
},
function (own, heat) {
var T = raceTrack();
if (!T || RACE.on)
return;
if (!heat && !raceNight()) {
setStatus("<b>The steward shakes their head.</b> " + raceDayWords());
return;
}
if (!raceLicensed()) {
setStatus("<b>The steward shakes their head.</b> No driving licence, no race. The Licensing Office in the Civic Ring tests learners.");
return;
}
var slot = heat ? heat.slot : 0, grid = raceXZ(T.a0 - (5 + 7 * Math.floor(slot / 2)) / T.rs, T.rs + ROAD_SIDE * 2.6 * (slot % 2 ? -1 : 1)), h = Math.atan2(Math.sin(T.a0), -Math.cos(T.a0));
if (!own) {
if (typeof DRIVE !== "undefined" && DRIVE.on) {
setStatus("Get out of what you are driving first, or bring it to the start line.");
return;
}
var o = { id: "__racecar", archetype: "sportscar", attrs: { c: 0xC81E28 }, x: grid.x, z: grid.z, rot: h + Math.PI, solid: false, raceCar: true, city: true };
RACE.car = o;
if (!vehicleTakeWheel(o)) {
RACE.car = null;
return;
}
}
else {
camera.position.x = grid.x;
camera.position.z = grid.z;
}
DRIVE.v = 0;
DRIVE.h = h;
if (typeof yaw !== "undefined")
yaw = h;
RACE.on = true;
RACE.phase = heat ? "grid" : "lights";
RACE.t = 0;
RACE.cp = 0;
RACE.bump = 0;
RACE.live = heat || null;
RACE.raid = Math.random() < RACE_RAID_CHANCE ? { at: 12 + Math.random() * 30, scout: Math.random() < RACE_SCOUT_CHANCE, warned: false, came: false, t: 0 } : null;
raceBarriers(true);
if (!heat)
raceRivals();
else
raceRivalsClear();
(RACE.lamps || []).forEach(function (m) { m.material.color.setHex(0x2A1A1A); });
setStatus(heat ? "<b>On the grid for the live heat.</b> Hold still: the lamps light when the heat starts." : "<b>On the grid.</b> Watch the lamps over the start: three reds, then green. Hold still until then.");
},
function () {
raceRivalsClear();
var T = RACE.trk, spec = [["roadster", 0x2A6ACF, "Rook Malley", 19.5], ["coupe", 0x1E9A5A, "Vesna Kade", 21], ["sportscar", 0xE8C030, "Dash Ortega", 22.5]];
spec.forEach(function (s, i) {
var r = T.rs + (i === 0 ? 2.6 : i === 1 ? -2.6 : 2.6), back = i === 0 ? 5 : i === 1 ? 13 : 13;
var g = null;
try {
g = build({ id: "__rival" + i, archetype: s[0], attrs: { c: s[1] }, solid: false, detail: 4, nights: [], city: true });
if (typeof modelDress === "function")
modelDress(g, { id: "__rival" + i, archetype: s[0], attrs: { c: s[1] }, solid: true, placed: true });
}
catch (e) {
g = new THREE.Group();
}
g.traverse(function (m) { m.raycast = function () { }; });
scene.add(g);
RACE.riv.push({ g: g, name: s[2], arch: s[0], r: r, a: T.a0 - back / T.rs, v: 0, top: s[3] * (0.95 + Math.random() * 0.1), done: null, wob: Math.random() * 6 });
});
raceRivalsPlace();
},
function (dt, q, al) {
var R = RACE.raid, T = RACE.trk;
if (!R || R.came)
return true;
if (R.scout && !R.warned && RACE.t >= R.at - RACE_SCOUT_LEAD) {
R.warned = true;
setStatus("<b>📣 The scout on the radio: \"Dragon Corp, coming up the street! Scatter!\"</b> Get off the course, or over the line, before they get here.");
RACE.said = 4;
}
if (RACE.t < R.at)
return true;
R.came = true;
racePatrols(al);
var onCourse = Math.abs(q.r - T.rs) < 14 && al > -30 / T.rs && al * T.rs < T.len;
if (!onCourse)
return true;
var mph = Math.round(Math.abs(DRIVE.v) * 2.237);
raceEnd(null, R.warned ? "The Dragon Corp got here before you scattered: you are caught street racing." : "No warning from the scout this time: the Dragon Corp has you, caught street racing.");
if (!(typeof amKeeper === "function" && amKeeper()))
setTimeout(function () {
try {
if (typeof trfOffence === "function")
trfOffence("speeding", "Street racing on the Warrens' street", Math.max(mph, 45), 25);
}
catch (e) { }
try {
if (typeof licenceOffence === "function")
licenceOffence("driving", "street racing on the Warrens' street");
}
catch (e) { }
}, 2500);
return false;
},
function (al) {
var T = RACE.trk;
racePatrolsClear();
var P = [];
[0, 1].forEach(function (i) {
var g = null;
try {
g = build({ id: "__patrol" + i, archetype: "coupe", attrs: { c: 0x16233F }, solid: false, detail: 4, nights: [], city: true });
}
catch (e) {
g = new THREE.Group();
}
var red = new THREE.MeshBasicMaterial({ color: 0xD02020 }), blue = new THREE.MeshBasicMaterial({ color: 0x2050E0 }), dim = new THREE.MeshBasicMaterial({ color: 0x222230 });
var bx = new THREE.Box3().setFromObject(g), top = isFinite(bx.max.y) ? bx.max.y - g.position.y : 1.4;
var lr = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.26), red), lb = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.26), dim);
lr.position.set(-0.3, top + 0.08, 0);
lb.position.set(0.3, top + 0.08, 0);
g.add(lr);
g.add(lb);
g.traverse(function (m) { m.raycast = function () { }; });
scene.add(g);
P.push({ g: g, lr: lr, lb: lb, red: red, blue: blue, dim: dim, a: T.a1 + (20 + i * 10) / T.rs, r: T.rs + (i ? -2.6 : 2.6), t: 0 });
});
RACE.patrols = P;
RACE.patrolT = 0;
},
function (secs, why) {
var T = RACE.trk, car = RACE.car, live = RACE.live;
RACE.on = false;
RACE.phase = null;
RACE.live = null;
raceBarriers(false);
if (live) {
rliveEnd(live, secs, why);
if (car) {
setTimeout(function () { if (DRIVE.on && DRIVE.spec === car) {
vehicleLeave();
setStatus("The steward takes the club's car back to the start.");
} RACE.car = null; }, secs !== null ? 9000 : 300);
}
return;
}
(RACE.lamps || []).forEach(function (m) { m.material.color.setHex(0x2A1A1A); });
var riv = RACE.riv.slice();
setTimeout(raceRivalsClear, secs !== null ? 6000 : 500);
if (secs === null) {
setStatus("<b>Race over.</b> " + esc(why || ""));
if (car) {
RACE.car = null;
try {
if (DRIVE.on && DRIVE.spec === car)
vehicleLeave();
}
catch (e) { }
}
return;
}
var ms = Math.round(secs * 1000), place = 1 + riv.filter(function (R) { return R.done !== null && R.done < secs; }).length, best = raceBest(), pb = !best || ms < best;
if (pb)
try {
localStorage.setItem("somnu.raceBest.warrens", String(ms));
}
catch (e) { }
var rows = [["Your time", raceFmt(ms) + (pb ? " (your best)" : "")], ["Place", place + " of 4"]];
riv.forEach(function (R) { rows.push([R.name, R.done !== null ? raceFmt(R.done * 1000) : "still racing"]); });
worldCard(worldFacts(place === 1 ? "You win!" : "Finished", place === 1 ? "First across the line" : "", rows, ["Park up, or race again from the start."]));
setStatus("<b>Across the line.</b> " + raceFmt(ms) + ", " + place + " of 4." + (pb ? " Your best yet." : ""));
if (typeof signedIn === "function" && signedIn() && !RACE.missing)
cityRpc("race_solo_done", { p_track: "warrens", p_ms: ms, p_place: place }).catch(function (e) {
if (typeof rpcMissing === "function" && rpcMissing(e))
return cityRpc("race_submit", { p_track: "warrens", p_ms: ms });
throw e;
})
.then(function (o) { RACE.boardAt = 0; RGAR.at = 0; if (o && o.say)
setTimeout(function () { setStatus(esc(o.say)); }, 4000); })
.catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
RACE.missing = true; });
if (car) {
setTimeout(function () { if (DRIVE.on && DRIVE.spec === car) {
vehicleLeave();
setStatus("The steward takes the club's car back to the start.");
} RACE.car = null; }, 9000);
}
}
];
});
