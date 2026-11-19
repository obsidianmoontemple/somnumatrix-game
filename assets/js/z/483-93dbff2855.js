/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(483, function () {
return [
function () {
return wTex(256, 128, function (c, w, h) {
c.fillStyle = "#C9CED6";
c.fillRect(0, 0, w, h);
var R = wRand(1717);
for (var i = 0; i < 26; i++) {
var x = (R() * w) | 0, y = (R() * h) | 0, pw = 16 + ((R() * 40) | 0), ph = 10 + ((R() * 26) | 0), v = 190 + ((R() * 40) | 0);
c.fillStyle = "rgb(" + v + "," + (v + 4) + "," + (v + 10) + ")";
c.fillRect(x, y, pw, ph);
}
c.strokeStyle = "rgba(60,66,76,.55)";
c.lineWidth = 1;
for (var gx = 0; gx < w; gx += 32) {
c.beginPath();
c.moveTo(gx, 0);
c.lineTo(gx, h);
c.stroke();
}
for (var gy = 0; gy < h; gy += 32) {
c.beginPath();
c.moveTo(0, gy);
c.lineTo(w, gy);
c.stroke();
}
c.fillStyle = "rgba(40,44,52,.6)";
for (var r = 0; r < 40; r++)
c.fillRect((R() * w) | 0, (R() * h) | 0, 2, 2);
}, [24, 2]);
},
function (G) {
var g = new THREE.Group(), lite = typeof LITE !== "undefined" && !!LITE, seg = lite ? 48 : 96;
var hull = new THREE.MeshLambertMaterial({ color: 0xE2E6EC, map: ofPanelTex() }), dark = wM(0x3A4048), steel = wM(0xA8B0BA), glass = wM(0x6A9AC8, { e: 0x1A3A5A, ei: 0.6, op: 0.82 });
var lamp = wB(0xFFE2A8, { fog: false }), park = wM(0x4A8A3A, { e: 0x16301A, ei: 0.6 }), water = wM(0x3A7AB8, { e: 0x0A2A4A, ei: 0.6 });
var wheel = new THREE.Group();
g.add(wheel);
wMesh(new THREE.TorusGeometry(OF_R, OF_TUBE, lite ? 10 : 16, seg), hull, 0, 0, 0, wheel);
var band = wMesh(new THREE.TorusGeometry(OF_R - OF_TUBE * 0.72, OF_TUBE * 0.42, 6, seg), glass, 0, 0, 0, wheel);
band.scale.z = 1.2;
var green = wMesh(new THREE.TorusGeometry(OF_R - OF_TUBE * 0.5, OF_TUBE * 0.32, 5, seg), park, 0, 0, 0, wheel);
green.scale.z = 1.4;
var n = lite ? 72 : 160, win = new THREE.InstancedMesh(new THREE.BoxGeometry(2.2, 1.1, 0.4), lamp, n * 2), M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), R = wRand(2026);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
for (var d = 0; d < 2; d++) {
E.set(0, 0, a);
Q.setFromEuler(E);
var on = R() < 0.82 ? 1 : 0.001, rr = OF_R + OF_TUBE * 0.96;
M4.compose(new THREE.Vector3(Math.cos(a) * rr, Math.sin(a) * rr, (d ? 2.2 : -2.2)), Q, new THREE.Vector3(on, on, on));
win.setMatrixAt(i * 2 + d, M4);
}
}
wheel.add(win);
for (var h = 0; h < (lite ? 12 : 24); h++) {
var a2 = h / (lite ? 12 : 24) * Math.PI * 2 + 0.13, rr2 = OF_R + OF_TUBE * 0.7, hb = new THREE.Group();
hb.position.set(Math.cos(a2) * rr2, Math.sin(a2) * rr2, 0);
hb.rotation.z = a2 - Math.PI / 2;
wheel.add(hb);
var hh = 3 + R() * 6;
wBox(7 + R() * 5, hh, 6 + R() * 4, hull, 0, hh / 2, 0, hb);
if (h % 3 === 0) {
var dm = wSph(4.2, glass, 0, hh, 0, hb, lite ? 8 : 14);
dm.scale.y = 0.6;
}
}
for (var s = 0; s < 4; s++) {
var sa = s / 4 * Math.PI * 2, sp = wCyl(2.6, 2.6, OF_R - 14, steel, 0, 0, 0, wheel, 10);
sp.rotation.z = sa;
sp.position.set(Math.cos(sa + Math.PI / 2) * (OF_R / 2 + 6), Math.sin(sa + Math.PI / 2) * (OF_R / 2 + 6), 0);
sp.rotation.z = sa;
var lf = wCyl(2.9, 2.9, 6, lamp, 0, 0, 0, sp, 10);
lf.position.y = -OF_R * 0.15;
lf.userData.lift = s;
}
var hub = wCyl(14, 14, 22, hull, 0, 0, 0, g, lite ? 16 : 28);
hub.rotation.x = Math.PI / 2;
for (var rb = 0; rb < 3; rb++) {
var rg = wMesh(new THREE.TorusGeometry(14.4, 0.8, 6, lite ? 20 : 36), dark, 0, 0, -8 + rb * 8, g);
}
var spire = wCyl(5, 8, 60, hull, 0, 0, 40, g, lite ? 12 : 20);
spire.rotation.x = Math.PI / 2;
var cab = wCyl(9, 9, 8, glass, 0, 0, 70, g, lite ? 12 : 20);
cab.rotation.x = Math.PI / 2;
wCone(4, 16, steel, 0, 0, 82, g, 10).rotation.x = Math.PI / 2;
var bayM = wB(0xFFD890, { fog: false });
[-1, 1].forEach(function (k) { var arm = wBox(4, 4, 30, steel, k * 16, 0, -24, g); var cuff = wCyl(5, 5, 4, dark, k * 16, 0, -40, g, 12); cuff.rotation.x = Math.PI / 2; wMesh(new THREE.CircleGeometry(3.4, 14), bayM, k * 16, 0, -42.1, g).rotation.y = Math.PI; });
var sh = new THREE.Group();
sh.position.set(16, 0, -54);
g.add(sh);
var body = wCyl(3.2, 3.6, 16, wM(0xF2F4F8), 0, 0, 0, sh, 14);
body.rotation.x = Math.PI / 2;
wCone(3.2, 6, wM(0xF2F4F8), 0, 0, -11, sh, 14).rotation.x = -Math.PI / 2;
wBox(16, 0.6, 6, wM(0x2A2E36), 0, -1.4, 2, sh);
wBox(0.6, 6, 4, wM(0x2A2E36), 0, 3.4, 6, sh);
wBox(4.2, 1, 0.3, wB(0x9AE8FF, { fog: false }), 0, 0.6, -4, sh);
[-1, 1].forEach(function (k) {
var w2 = wBox(110, 0.5, 22, wM(0x1E2E6A, { e: 0x0A1440, ei: 0.8 }), k * 80, 0, 24, g);
w2.userData.solar = 1;
wCyl(1, 1, 48, steel, k * 38, 0, 24, g, 6).rotation.z = Math.PI / 2;
for (var f = 0; f < 5; f++)
wBox(0.4, 0.6, 22.2, dark, k * (34 + f * 22), 0, 24, g);
});
for (var rd = 0; rd < 4; rd++) {
var ra = rd / 4 * Math.PI * 2 + Math.PI / 4, rad = wBox(16, 0.3, 10, wM(0xEDEFF2), Math.cos(ra) * 22, Math.sin(ra) * 22, 10, g);
rad.rotation.z = ra;
}
var lights = [];
[[0x6AFF8A, OF_R + OF_TUBE + 2, 0], [0xFF6A5A, -(OF_R + OF_TUBE + 2), 0], [0xFFFFFF, 0, 0, 90]].forEach(function (L) { var gl = wGlow(L[0], 16, 0.8); gl.position.set(L[1], L[2], L[3] || 0); g.add(gl); lights.push(gl); });
var halo = wGlow(0x9AE8FF, 260, 0.18);
g.add(halo);
g.userData = { k: "orbital", name: "The Orbital: Meridian Ring", host: "earth", off: OF_OFF, wheel: wheel, lights: lights, orbital: 1 };
G.add(g);
return g;
},
function () {
if (typeof spBuild !== "function" || spBuild.ofHooked)
return;
var b0 = spBuild;
spBuild = function (G) { var r = b0.apply(this, arguments); try {
SP.stations.orbital = ofModel(G);
}
catch (e) {
if (window.console)
console.warn("[orbital] build", e);
} return r; };
spBuild.ofHooked = 1;
var p0 = spPlace;
spPlace = function () { var r = p0.apply(this, arguments); try {
var s = SP.stations.orbital, h = SP.bodies && SP.bodies.earth;
if (s && h)
s.position.copy(h.position).add(OF_OFF);
}
catch (e) { } return r; };
var t0 = spTick;
spTick = function (dt) { var r = t0.apply(this, arguments); try {
ofSpaceTick(dt);
}
catch (e) {
if (window.console && !OF.warned) {
OF.warned = 1;
console.warn("[orbital] tick", e);
}
} return r; };
var q0 = spPromptTick;
spPromptTick = function () {
var s = SP.stations && SP.stations.orbital;
if (s && SP.pos && SP.pos.distanceTo(s.position) < OF_R + 170) {
return worldPrompt("<b>The Orbital: Meridian Ring</b> · <b>press E</b> to dock and go aboard", function () { ofDock("space"); });
}
return q0.apply(this, arguments);
};
if (typeof spTargetPos === "function") {
var g0 = spTargetPos;
spTargetPos = function (A) { if (A && A.station === "orbital" && SP.stations.orbital) {
var c = SP.stations.orbital.position.clone(), from = SP.pos.clone().sub(c);
from.y = 0;
if (from.lengthSq() < 1)
from.set(1, 0, 0);
from.normalize();
return c.addScaledVector(from, OF_R + 150).add(new THREE.Vector3(0, 40, 0));
} return g0.apply(this, arguments); };
}
},
function (dt) {
var s = SP.stations && SP.stations.orbital;
if (!s)
return;
var u = s.userData, G = WORLDS.space.g, E = SP.bodies.earth;
u.wheel.rotation.z += 0.05 * dt;
if (E)
s.lookAt(E.position.clone().add(G.position));
u.lights.forEach(function (l, i) { l.material.opacity = 0.55 + 0.3 * Math.sin(WLD.t * 1.2 + i * 2); });
var p = SP.pos;
if (!p)
return;
var L = s.worldToLocal(p.clone().add(G.position));
var rq = Math.hypot(L.x, L.y), dz = L.z, tubeD = Math.hypot(rq - OF_R, dz), keep = OF_TUBE + 10;
if (tubeD < keep && rq > 1) {
var k = keep / Math.max(0.01, tubeD), nx = OF_R + (rq - OF_R) * k, nz = dz * k;
if (tubeD < 0.01) {
nx = OF_R + keep;
nz = 0;
}
L.x *= nx / rq;
L.y *= nx / rq;
L.z = nz;
var W = s.localToWorld(L.clone()).sub(G.position);
p.copy(W);
if (SP.vel)
SP.vel.multiplyScalar(0.3);
}
else if (rq < 24 && Math.abs(dz) < 20) {
L.z = dz < 0 ? -20 : 20;
p.copy(s.localToWorld(L.clone()).sub(G.position));
if (SP.vel)
SP.vel.multiplyScalar(0.3);
}
},
function (how) {
try {
if (typeof WLD !== "undefined" && WLD.on)
worldOff(true);
if (typeof WLD !== "undefined")
WLD.from = null;
}
catch (e) { }
var r = ofRealm() || makeRealm("station");
if (!r)
return;
if (typeof beHere === "function")
beHere(r.id);
var o = blockOrigin(Math.round(r.x0 / PITCH), 0);
if (!walkMode && typeof setWalk === "function")
try {
setWalk(true);
}
catch (e) { }
camera.position.set(o.x, 1.72, o.z + 4);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof hubCool !== "undefined")
hubCool = 2.5;
if (typeof tickClock === "function")
tickClock(true);
OF.arrive = performance.now();
setStatus(how === "shuttle" ? "<b>The Orbital.</b> The Ring Line shuttle docks with a soft clunk and the airlock opens. Meridian Ring's gate is ahead, past the control tower; the airlock behind you undocks or takes the shuttle home."
: "<b>Docked at the Orbital.</b> Your ship is held in the docking cradle. Meridian Ring's gate is ahead, past the control tower; the airlock behind you takes you back out to your ship.");
if (typeof save === "function")
try {
save();
}
catch (e) { }
},
function () {
worldCard(null);
ofLockPrompt(false);
if (typeof orbEnsureSpace === "function")
orbEnsureSpace();
var at = null;
try {
spPlace();
var s = SP.stations.orbital;
at = s.position.clone().add(new THREE.Vector3(0, 30, 0)).addScaledVector(OF_OFF.clone().normalize(), OF_R + 140);
}
catch (e) { }
var look = null;
try {
look = SP.stations.orbital.position.clone();
}
catch (e) { }
worldGo("space", { at: at, look: look, keepFrom: false, msg: "<b>Undocked.</b> The Orbital turns behind you, Meridian Ring's windows lit all round it, the Earth below. <b>M</b> opens the star chart." });
},
function () {
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🛰️ The docking airlock</div><div style='opacity:.85;margin:4px 0 8px;line-height:1.45'>The Orbital is a station over Earth, in Open Space. Ships dock here, and the Space Corp's Ring Line shuttle calls on the timetable.</div>";
h += worldBtn("out", "🚀 Undock into Open Space", "back out to the ring, the Earth and the stars");
fns.out = ofUndock;
if (typeof orbDepartures === "function") {
h += worldBtn("ring", "🚌 The Ring Line shuttle", "down to the Space Corp Spaceport, Somnucor; no fare");
fns.ring = function () { orbDepartures("meridian"); };
}
worldCard(h, fns);
},
function () {
var g = new THREE.Group(), steel = wM(0xA4AAB4), dark = wM(0x3A4048), haz = wM(0xE8B020), blk = wM(0x1A1A1A), glass = wM(0x0A1428, { e: 0x060A18, ei: 1 }), lit = wB(0x9AE8FF);
wBox(9, 6.4, 1.2, steel, 0, 3.2, 0, g);
wBox(4.4, 4.2, 0.3, glass, 0, 2.4, 0.5, g);
var rim = wMesh(new THREE.TorusGeometry(2.3, 0.22, 8, 24), dark, 0, 2.4, 0.66, g);
rim.scale.y = 1.0;
var port = wMesh(new THREE.CircleGeometry(0.8, 18), wB(0x101830), 0, 3.1, 0.68, g);
for (var i = 0; i < 8; i++) {
var hz = wBox(0.5, 0.18, 0.04, i % 2 ? blk : haz, -1.75 + i * 0.5, 0.3, 0.68, g);
hz.rotation.z = 0.6;
}
[-1, 1].forEach(function (k) { wBox(0.6, 0.9, 0.1, dark, k * 3.4, 2.4, 0.66, g); wBox(0.4, 0.12, 0.04, lit, k * 3.4, 2.6, 0.72, g); wCyl(0.25, 0.25, 6.2, dark, k * 4.3, 3.1, 0.5, g, 8); });
var beacon = wSph(0.2, wB(0x3AE87A), 0, 5.2, 0.7, g, 8);
var bg = wGlow(0x5AFF8A, 2.4, 0.55);
bg.position.set(0, 5.2, 0.9);
g.add(bg);
g.userData.beacon = bg;
var sg = wSign(["DOCKING AIRLOCK", "Open Space · Ring Line"], 3.6, 0.8, "#1E2A3A", "#9AE8FF");
sg.position.set(0, 5.9, 0.7);
g.add(sg);
return g;
},
function (dt) {
var here = typeof LD !== "undefined" && LD.kind === "station" && LD.g && store.here === LD.rid && !(typeof WLD !== "undefined" && WLD.on);
if (!here) {
if (OF.lock) {
if (OF.lock.parent)
OF.lock.parent.remove(OF.lock);
OF.lock = null;
}
ofLockPrompt(false);
return;
}
if (!OF.lock) {
OF.lock = ofLockBuild();
OF.lock.position.set(LD.ox, (typeof ldY === "function" ? ldY(0, 12) : 0), LD.oz + 12);
OF.lock.rotation.y = Math.PI;
scene.add(OF.lock);
}
if (OF.lock.userData.beacon)
OF.lock.userData.beacon.material.opacity = 0.4 + 0.2 * Math.sin(performance.now() / 900);
var P = camera.position, d = Math.hypot(P.x - LD.ox, P.z - (LD.oz + 11.2));
if (d < 3.6 && walkMode && !LD.near && !store.inside)
ofLockPrompt(true);
else
ofLockPrompt(false);
if (Math.abs(P.x - LD.ox) < 4.6 && P.z > LD.oz + 11.2 && P.z < LD.oz + 13.4)
P.z = LD.oz + 11.2;
},
function () {
var hall = typeof hallRealm === "function" ? hallRealm() : null;
if (!hall)
return;
var gone = [];
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if ((o.realm || 0) !== hall.id || o.archetype !== "hubdoor" || o.leadsTo !== "station")
continue;
gone.push(o);
if (typeof meshes !== "undefined" && meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
store.objects.splice(i, 1);
}
if (!gone.length)
return;
var ids = {};
gone.forEach(function (o) { ids[o.id] = 1; });
if (store.passages)
store.passages = store.passages.filter(function (p) { return !ids[p.from] && !ids[p.to]; });
gone.forEach(function (o) {
var spec = { id: uid(), archetype: KIT.signboard ? "signboard" : "plinth", label: "The Orbital", attrs: {}, x: o.x, z: o.z, rot: o.rot || 0, solid: true, detail: 4, nights: [store.session], realm: hall.id, hub: true, peopled: true, addr: null, name: "The Orbital", named: "stated", ofPlate: 1 };
spec.sign = "The Orbital";
spec.note = "The Orbital is not behind a door any more: it is a station over Earth, in Open Space. Take the Ring Line shuttle from Launch Pad 1 at the Space Corp Spaceport, or fly your own ship up to the ring and dock. Meridian Ring, its homes, shops and the Academy of Flight are all there as before.";
store.objects.push(spec);
if (typeof addMesh === "function" && typeof scene !== "undefined" && scene)
try {
addMesh(spec);
}
catch (e) { }
});
if (typeof save === "function")
try {
save();
}
catch (e) { }
},
function () {
if (OF.hooked)
return;
OF.hooked = 1;
try {
ofHookSpace();
}
catch (e) {
if (window.console)
console.warn("[orbital] space", e);
}
if (typeof orbArrive === "function") {
var a0 = orbArrive;
orbArrive = function (stop) { if (stop && stop.k === "meridian")
return ofDock("shuttle"); return a0.apply(this, arguments); };
}
if (typeof dqGoLand === "function") {
var d0 = dqGoLand;
dqGoLand = function (k) { if (k === "station") {
worldCard(null);
return ofDock("shuttle");
} return d0.apply(this, arguments); };
}
if (typeof buildHall === "function") {
var b0 = buildHall;
buildHall = function () { var r = b0.apply(this, arguments); try {
ofPurgeHall();
}
catch (e) { } return r; };
}
if (typeof toHall === "function") {
var h0 = toHall;
toHall = function () { var r = h0.apply(this, arguments); try {
ofPurgeHall();
}
catch (e) { } return r; };
}
if (typeof hubDoorLabel === "function") {
var l0 = hubDoorLabel;
hubDoorLabel = function (o) { if (o && o.leadsTo === "station")
return "🛰️ <b>The Orbital</b> is in Open Space now · by the Ring Line shuttle from the Spaceport"; return l0.apply(this, arguments); };
}
if (typeof transitTick === "function") {
var t0 = transitTick;
transitTick = function (dt) { var r = t0.apply(this, arguments); try {
ofTick(dt);
}
catch (e) {
if (window.console && !OF.tw) {
OF.tw = 1;
console.warn("[orbital] lock", e);
}
} return r; };
}
try {
ofPurgeHall();
}
catch (e) { }
}
];
});
