/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TG = { cx: NaN, cz: NaN, L: 96, W: 60, H: 3.8, g: null, on: false, solids: [], ph: null, fn: null, prompted: false, busy: false, entry: null, staff: [], cars: [] };
var TG_STOCK = ["car", "coupe", "car", "sportscar", "car", "coupe", "car", "van"];
function tgMat(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
function tgBox(g, w, h, d, m, x, y, z) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); return b; }
function tgTex(lines, bg, fg, w, h) {
var c = document.createElement("canvas");
c.width = w || 768;
c.height = h || 160;
var x = c.getContext("2d");
x.fillStyle = bg || "#14324E";
x.fillRect(0, 0, c.width, c.height);
x.strokeStyle = "#F2D27A";
x.lineWidth = 6;
x.strokeRect(5, 5, c.width - 10, c.height - 10);
x.fillStyle = fg || "#FFF6DC";
x.textAlign = "center";
x.textBaseline = "middle";
lines.forEach(function (t, k) {
var sz = k === 0 ? Math.round(c.height * 0.32) : Math.round(c.height * 0.19);
x.font = (k === 0 ? "bold " : "") + sz + "px Georgia,serif";
while (x.measureText(t).width > c.width - 30 && sz > 12) {
sz -= 2;
x.font = (k === 0 ? "bold " : "") + sz + "px Georgia,serif";
}
x.fillText(t, c.width / 2, lines.length === 1 ? c.height / 2 : (k === 0 ? c.height * 0.36 : c.height * 0.72));
});
var T = new THREE.CanvasTexture(c);
return T;
}
function tgSign(g, lines, w, h, x, y, z, ry, bg, fg) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tgTex(lines, bg, fg), side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry || 0; g.add(m); return m; }
function tgFloorTex() { return __ZC(204, 0, this, arguments, new.target); }
function tgGate() {
if (TG.gate)
return TG.gate;
if (typeof ATLC === "undefined" || !ATLC || typeof ATL_STAIRS === "undefined")
return null;
var a = (ATL_STAIRS[0] ? ATL_STAIRS[0].a : 0.19) + 0.36, r = 80;
var x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
var ox = Math.cos(a), oz = Math.sin(a);
return (TG.gate = { a: a, r: r, x: x, z: z, ox: ox, oz: oz, ry: Math.atan2(ox, oz) });
}
function tgGateBuild() {
var G = tgGate();
if (!G || TG.gateG)
return;
var g = new THREE.Group(), y = terrainY(G.x, G.z);
g.position.set(G.x, y, G.z);
g.rotation.y = G.ry;
var stone = tgMat(0xC9C2B2), dark = new THREE.MeshBasicMaterial({ color: 0x07080B }), trim = tgMat(0xB8935A);
tgBox(g, 1.2, 5, 12, stone, -5.2, 2.5, 0);
tgBox(g, 1.2, 5, 12, stone, 5.2, 2.5, 0);
tgBox(g, 11.6, 1, 12.4, stone, 0, 5.5, 0);
tgBox(g, 12.2, 0.3, 12.8, trim, 0, 6.1, 0);
tgBox(g, 9.2, 4.6, 0.4, dark, 0, 2.3, -5.9);
var ramp = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 12), new THREE.MeshLambertMaterial({ color: 0x26272B }));
ramp.rotation.x = -Math.PI / 2;
ramp.position.set(0, 0.06, -0.4);
g.add(ramp);
var shade = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 10), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55, depthWrite: false }));
shade.rotation.x = -Math.PI / 2;
shade.position.set(0, 0.09, -1.6);
g.add(shade);
[-1, 1].forEach(function (s) { tgBox(g, 0.35, 0.35, 0.35, new THREE.MeshBasicMaterial({ color: 0xFFC870 }), s * 4.3, 4.4, 5.95); });
tgSign(g, ["Tower Garage", "Parking · the Tower lifts · the Ring Garage tunnel"], 9, 1.6, 0, 5.5, 6.25, 0);
tgSign(g, ["Tower Garage"], 9, 1.4, 0, 5.5, -6.25, Math.PI);
tgBox(g, 9.4, 0.18, 0.18, tgMat(0xE8C24A), 0, 4.2, 6.4);
scene.add(g);
TG.gateG = g;
var c = Math.cos(G.ry), s = Math.sin(G.ry);
function w(lx, lz, hw, hd) { return { x: G.x + lx * c + lz * s, z: G.z - lx * s + lz * c, hw: hw, hd: hd, rot: G.ry }; }
TG.gateSol = [w(-5.2, 0, 0.6, 6), w(5.2, 0, 0.6, 6), w(0, -5.9, 4.6, 0.3)];
}
function tgOrigin() { if (isNaN(TG.cx) && typeof ATLC !== "undefined" && ATLC) {
TG.cx = ATLC.x;
TG.cz = ATLC.z + 40000;
} return !isNaN(TG.cx); }
function tgBuild() { return __ZC(204, 1, this, arguments, new.target); }
function tgIn(x, z) { return Math.abs(x - TG.cx) < TG.L / 2 + 40 && Math.abs(z - TG.cz) < TG.W / 2 + 40; }
function tgFade(text, then) { return __ZC(204, 2, this, arguments, new.target); }
function tgPut(x, z, y, h) {
var P = camera.position;
P.x = x;
P.z = z;
P.y = y + 1.72;
if (typeof DRIVE !== "undefined" && DRIVE.on) {
DRIVE.h = h;
DRIVE.v = 0;
DRIVE.cam = null;
DRIVE.yawSet = h;
}
if (typeof yaw !== "undefined")
yaw = h;
if (typeof flyY !== "undefined")
flyY = y;
}
function tgDown() { return __ZC(204, 3, this, arguments, new.target); }
function tgUp() {
var G = tgGate();
TG.on = false;
if (TG.g)
TG.g.visible = false;
var x = G.x + G.ox * 10, z = G.z + G.oz * 10;
tgPut(x, z, terrainY(x, z), Math.atan2(-G.ox, -G.oz) + Math.PI);
setStatus("<b>The Plaza.</b> Out of the Tower Garage, beside the Tower.");
}
function tgRingGarage() {
if (typeof garList !== "function")
return null;
var L = garList().filter(function (g) { return g.i === 0; }), G = tgGate(), best = null, bd = 1e9;
L.forEach(function (g) { var d = Math.abs(Math.atan2(Math.sin(g.a - G.a), Math.cos(g.a - G.a))); if (d < bd) {
bd = d;
best = g;
} });
return best;
}
function tgTunnelEnd() { var R = tgRingGarage(); if (!R)
return null; var a = R.a - 18 / R.rl, r = R.rl + 3; return { R: R, a: a, x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function tgTunnelOut() { return __ZC(204, 4, this, arguments, new.target); }
function tgTunnelBuild() {
var T = tgTunnelEnd();
if (!T || TG.tunG)
return;
var g = new THREE.Group(), y = terrainY(T.x, T.z);
g.position.set(T.x, y, T.z);
var ox = Math.cos(T.a), oz = Math.sin(T.a);
g.rotation.y = Math.atan2(ox, oz);
var stone = tgMat(0xC9C2B2), dark = new THREE.MeshBasicMaterial({ color: 0x07080B });
tgBox(g, 1, 4.6, 6, stone, -4.6, 2.3, 0);
tgBox(g, 1, 4.6, 6, stone, 4.6, 2.3, 0);
tgBox(g, 10.2, 0.9, 6.2, stone, 0, 5, 0);
tgBox(g, 8.2, 4.4, 0.3, dark, 0, 2.2, -2.9);
[-1, 1].forEach(function (s) { tgBox(g, 0.3, 0.3, 0.3, new THREE.MeshBasicMaterial({ color: 0xFFC870 }), s * 3.8, 4.1, 3.05); });
tgSign(g, ["Tower Garage ⇦ tunnel", "Parking under the Somnucor Tower"], 8, 1.4, 0, 5, 3.15, 0);
scene.add(g);
TG.tunG = g;
var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y);
function w(lx, lz, hw, hd) { return { x: T.x + lx * c + lz * s, z: T.z - lx * s + lz * c, hw: hw, hd: hd, rot: g.rotation.y }; }
TG.tunSol = [w(-4.6, 0, 0.5, 3), w(4.6, 0, 0.5, 3), w(0, -2.9, 4.1, 0.3)];
}
(function () {
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (TG.on && !store.inside && tgIn(x, z)) {
var lx = x - TG.cx, lz = z - TG.cz;
if (Math.abs(lx) > TG.L / 2 - 0.8 || Math.abs(lz) > TG.W / 2 - 0.8)
return true;
for (var i = 0; i < TG.solids.length; i++) {
var s = TG.solids[i];
if (Math.abs(lx - s.x) < s.hw + 0.3 && Math.abs(lz - s.z) < s.hd + 0.3)
return true;
}
if (TGL.parked && TGL.where === "garage" && Math.abs(x - TGL.g.position.x) < 1.3 && Math.abs(z - TGL.g.position.z) < 4.2)
return true;
return false;
}
if (!store.inside && typeof worldSolidAt === "function") {
if (TG.gateSol && worldSolidAt(TG.gateSol, x, z, feet))
return true;
if (TG.tunSol && worldSolidAt(TG.tunSol, x, z, feet))
return true;
}
return ba.apply(this, arguments);
};
}
if (typeof supportAt === "function") {
var sa = supportAt;
supportAt = function (x, z, feet) { if (TG.on && !store.inside && tgIn(x, z))
return 0; return sa.apply(this, arguments); };
}
if (typeof terrainY === "function") {
var ty = terrainY;
terrainY = function (x, z) { if (TG.on && tgIn(x, z))
return 0; return ty.apply(this, arguments); };
}
if (typeof roadAt === "function") {
var ra = roadAt;
roadAt = function (x, z) { if (TG.on && tgIn(x, z))
return { kind: "plaza", mph: 10, limit: 10 * MPH_MS, r: 0, a: 0, rs: 0 }; return ra.apply(this, arguments); };
}
})();
function tgTowerSpec() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return store.objects.filter(function (o) { return o.archetype === "somnucortower" && (!r || o.realm === r.id); })[0] || null; }
function tgPrompt(html, fn) { if (html) {
if (TG.ph !== html || TG.fn !== fn) {
worldPromptCity(html, fn);
TG.ph = html;
}
TG.fn = fn;
TG.prompted = true;
}
else if (TG.prompted) {
worldPromptCity(null);
TG.prompted = false;
TG.ph = null;
TG.fn = null;
} }
function tgTick(dt) {
if (typeof ATLC === "undefined" || !ATLC || (typeof WLD !== "undefined" && WLD.on))
return;
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!r || (store.here || 0) !== r.id) {
if (TG.on) {
TG.on = false;
if (TG.g)
TG.g.visible = false;
}
return;
}
if (store.inside) {
tgPrompt(null);
return;
}
var P = camera.position, G = tgGate();
if (!G)
return;
if (Math.hypot(P.x - G.x, P.z - G.z) < 500)
tgGateBuild();
var T = tgTunnelEnd();
if (T && Math.hypot(P.x - T.x, P.z - T.z) < 500)
tgTunnelBuild();
if (TG.busy)
return;
if (TG.on && !tgIn(P.x, P.z)) {
TG.on = false;
if (TG.g)
TG.g.visible = false;
}
if (TG.on) {
var lx = P.x - TG.cx, lz = P.z - TG.cz;
if (TG.arm) {
var near = Math.abs(lx - (-TG.L / 2 + 16)) < 6 && Math.abs(lz + 4) < 6;
TG.arm.rotation.z += ((near ? 1.35 : 0) - TG.arm.rotation.z) * Math.min(1, dt * 3);
}
if (lx < -TG.L / 2 + 5 && Math.abs(lz) < 5) {
tgPrompt(null);
return tgFade("Up the ramp to the Plaza…", tgUp);
}
if (lx > TG.L / 2 - 5 && Math.abs(lz) < 5) {
tgPrompt(null);
return tgFade("Through the tunnel to the Ring Garage…", tgTunnelOut);
}
if (Math.hypot(P.x - TG.lift.x, P.z - TG.lift.z) < 3.2 && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
var tw = tgTowerSpec();
if (tw)
return tgPrompt("<b>The lifts</b> · up to the Somnucor Tower lobby · <b>press E</b>", function () { TG.on = false; TG.g.visible = false; var D = typeof doorWorld === "function" ? doorWorld(tw) : null; if (D && D.out)
tgPut(D.x + D.out.x * 3, D.z + D.out.z * 3, terrainY(D.x, D.z), Math.atan2(D.out.x, D.out.z)); enterBuilding(tw); });
}
if (tglNearParked())
return;
return tgPrompt(null);
}
var c = Math.cos(G.ry), s = Math.sin(G.ry), dx = P.x - G.x, dz = P.z - G.z, glx = dx * c - dz * s, glz = dx * s + dz * c;
if (Math.abs(glx) < 4.4 && glz < 2 && glz > -5.4)
return tgFade("Down into the Tower Garage…", tgDown);
if (T) {
var tc = Math.cos(TG.tunG ? TG.tunG.rotation.y : 0), ts = Math.sin(TG.tunG ? TG.tunG.rotation.y : 0), tdx = P.x - T.x, tdz = P.z - T.z, tlx = tdx * tc - tdz * ts, tlz = tdx * ts + tdz * tc;
if (TG.tunG && Math.abs(tlx) < 3.8 && tlz < 1.5 && tlz > -2.6)
return tgFade("Through the tunnel to the Tower Garage…", function () {
tgBuild();
TG.on = true;
TG.g.visible = true;
tglShowParked();
tgPut(TG.cx + TG.L / 2 - 14, TG.cz + 4.5, 0, Math.PI / 2);
setStatus("<b>The Tower Garage, level B1.</b> Through the tunnel from the Ring Garage. The lifts up to the Tower are on the north wall.");
});
}
if (tglNearParked())
return;
tgPrompt(null);
}
var TGL_BAY = { x: -14, z: -TG.W / 2 + 5 };
var TGL = { g: null, where: "garage", x: 0, z: 0, rot: 0, parked: false, auto: null, route: null, wi: 0, stuckT: 0, last: null, dest: null, btn: null, box: null, driver: null, coming: null };
function tglKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function tglMake() { return __ZC(204, 5, this, arguments, new.target); }
function tglStretch(g) { return __ZC(204, 6, this, arguments, new.target); }
function tglFinish(g) { if (!g)
return; tglStretch(g); tglPaint(g); }
function tglPaint(g) { return __ZC(204, 7, this, arguments, new.target); }
function tglChauffeur() { return __ZC(204, 8, this, arguments, new.target); }
function tglEnsure() {
if (TGL.g)
return TGL.g;
TGL.g = tglMake();
TGL.driver = tglChauffeur();
scene.add(TGL.g);
scene.add(TGL.driver);
TGL.g.visible = false;
TGL.driver.visible = false;
return TGL.g;
}
function tglPlace(x, z, rot, where) { return __ZC(204, 9, this, arguments, new.target); }
function tglShowParked() {
tgBuild();
if (!tglKeeper()) {
if (TGL.g) {
TGL.g.visible = false;
TGL.driver.visible = false;
}
return;
}
if (TGL.where === "garage")
tglPlace(TG.cx + TGL_BAY.x, TG.cz + TGL_BAY.z, Math.PI, "garage");
}
function tglNearParked() {
if (!tglKeeper() || !TGL.parked || !TGL.g || !TGL.g.visible || TGL.auto || (typeof DRIVE !== "undefined" && DRIVE.on))
return false;
var P = camera.position;
if (Math.hypot(P.x - TGL.x, P.z - TGL.z) > 5.5)
return false;
tgPrompt("<b>Your limousine</b> · the chauffeur holds the door · <b>press E</b> to get in and choose where to go", function () { tglOpen(true); });
return true;
}
function tglPlaces() { return __ZC(204, 10, this, arguments, new.target); }
function tglTarget(k) { return __ZC(204, 11, this, arguments, new.target); }
function tglRingIdx(x, z) { var r = Math.hypot(x - ATLC.x, z - ATLC.z); for (var i = 0; i < ATL_RINGS.length; i++)
if (r <= ATL_RINGS[i].E + 10)
return i; return ATL_RINGS.length - 1; }
function tglPolar(x, z) { return { r: Math.hypot(x - ATLC.x, z - ATLC.z), a: Math.atan2(z - ATLC.z, x - ATLC.x) }; }
function tglXZ(a, r) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function tglLeg(i, A, B, out) { return __ZC(204, 12, this, arguments, new.target); }
function tglRoute(from, to) { return __ZC(204, 13, this, arguments, new.target); }
(function () {
if (typeof driveInput !== "function")
return;
var di = driveInput;
driveInput = function () {
var A = TGL.auto;
if (!A || typeof DRIVE === "undefined" || !DRIVE.on)
return di.apply(this, arguments);
var D = DRIVE, P = camera.position, W = TGL.route[TGL.wi];
if (!W)
return { f: 0, s: 0, hand: true, up: false, down: false };
if (W.lift || W.inGarage)
return { f: -1, s: 0, hand: true, up: false, down: false };
var dx = W.x - P.x, dz = W.z - P.z, dist = Math.hypot(dx, dz), want = Math.atan2(-dx, -dz), diff = Math.atan2(Math.sin(want - D.h), Math.cos(want - D.h));
var lim = D.road && D.road.limit ? D.road.limit : 8, last = TGL.wi === TGL.route.length - 1, next = TGL.route[TGL.wi + 1];
if (!(TG.on && tgIn(P.x, P.z)))
lim = Math.max(lim, 11.2);
var target = Math.min(lim * 0.88, 14);
if (Math.abs(diff) > 0.5)
target = Math.min(target, 4);
if (last)
target = Math.min(target, Math.max(1.2, dist * 0.45));
else if (next && next.lift)
target = Math.min(target, Math.max(1.5, dist * 0.4));
var f = D.v < target - 0.4 ? 1 : (D.v > target + 0.8 ? -0.7 : 0);
if (Math.abs(diff) > 1.4 && D.v < 1)
f = 0.5;
return { f: f, s: Math.max(-1, Math.min(1, -diff * 2.4)), hand: false, up: false, down: false };
};
["licenceOffence", "trfOffence"].forEach(function (n) { if (typeof window[n] !== "function")
return; var f = window[n]; window[n] = function () { if (TGL.auto)
return typeof Promise !== "undefined" ? Promise.resolve(null) : null; return f.apply(this, arguments); }; });
if (typeof vehicleEnd === "function") {
var ve = vehicleEnd;
vehicleEnd = function () { var was = TGL.auto; var r = ve.apply(this, arguments); if (was)
tglArrive(true); return r; };
}
})();
function tglTick(dt) {
var A = TGL.auto;
if (!A)
return;
if (typeof DRIVE === "undefined" || !DRIVE.on) {
return;
}
if (TG.busy || (typeof GAR !== "undefined" && GAR.busy))
return;
var P = camera.position, W = TGL.route[TGL.wi];
if (typeof rideG !== "undefined" && rideG && !A.taxi)
tglFinish(rideG);
var DRV = A.taxi && typeof TXI !== "undefined" ? TXI.driver : TGL.driver;
if (typeof rideG !== "undefined" && rideG && DRV && DRV.parent !== rideG) {
rideG.add(DRV);
DRV.position.set(0.45, 0.15, -0.9);
DRV.rotation.set(0, Math.PI, 0);
DRV.visible = true;
DRV.userData.pose = "sit";
DRV.userData.seated = true;
}
if (!W) {
tglArrive(false);
return;
}
if (W.exitUp && !TG.on) {
TGL.wi++;
TGL.chk = null;
return;
}
if (W.gate && TG.on) {
TGL.wi = TGL.route.length;
tglArrive(false);
return;
}
if (W.lift) {
if (Math.abs(DRIVE.v) > 0.6)
return;
TGL.wi++;
TGL.chk = null;
if (typeof GAR !== "undefined")
GAR.busy = true;
tgFade((W.outward ? "The lift carries you down to " : "The lift carries you up to ") + W.ring + "…", function () {
var o = W.outward ? 1 : -1;
tgPut(W.to.x, W.to.z, terrainY(W.to.x, W.to.z), Math.atan2(-Math.cos(W.a) * o, -Math.sin(W.a) * o));
setTimeout(function () { if (typeof GAR !== "undefined")
GAR.busy = false; }, 900);
});
return;
}
var d = Math.hypot(W.x - P.x, W.z - P.z), last = TGL.wi === TGL.route.length - 1;
if (d < (last ? 3 : 7)) {
TGL.wi++;
TGL.chk = null;
return;
}
if (!TG.on && d > 20 && DRIVE.road && DRIVE.road.kind === "off" && !TGL.offFade) {
TGL.offFade = 1;
tgFade("The chauffeur brings the car round to the street…", function () { var nx = TGL.route[TGL.wi + 1], h = nx && nx.x !== undefined ? Math.atan2(-(nx.x - W.x), -(nx.z - W.z)) : Math.atan2(-(W.x - P.x), -(W.z - P.z)); tgPut(W.x, W.z, terrainY(W.x, W.z), h); TGL.wi++; TGL.chk = null; setTimeout(function () { TGL.offFade = 0; }, 1500); });
return;
}
TGL.clock = (TGL.clock || 0) + Math.min(dt || 0, 0.1);
var now = TGL.clock;
if (!TGL.chk)
TGL.chk = { t: now, x: P.x, z: P.z };
else if (now - TGL.chk.t > 4.5) {
var moved = Math.hypot(P.x - TGL.chk.x, P.z - TGL.chk.z);
TGL.chk = { t: now, x: P.x, z: P.z };
if (moved < 2.5) {
var nx = TGL.route[TGL.wi + 1] && !TGL.route[TGL.wi + 1].lift ? TGL.route[TGL.wi + 1] : null;
tgFade("The chauffeur finds a way round…", function () { var h = nx ? Math.atan2(-(nx.x - W.x), -(nx.z - W.z)) : DRIVE.h; tgPut(W.x, W.z, terrainY(W.x, W.z), h); TGL.wi++; TGL.chk = null; });
}
}
}
function tglArrive(early) { return __ZC(204, 14, this, arguments, new.target); }
function tglGo(k) { return __ZC(204, 15, this, arguments, new.target); }
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); [tgTick, tglTick, tglCome, tglButton].forEach(function (f) { try {
f(dt);
}
catch (e) {
if (window.console && (TG.warned = (TG.warned || 0) + 1) < 6)
console.warn("[tower garage]", f.name, e);
} }); };
}
})();
function tglCall() { return __ZC(204, 16, this, arguments, new.target); }
function tglCome(dt) {
var C = TGL.coming;
if (!C)
return;
C.t = (performance.now() - C.t0) / 1000;
var k = Math.min(1, C.t / C.dur), e = 1 - Math.pow(1 - k, 3);
var x = C.from.x + (C.to.x - C.from.x) * e, z = C.from.z + (C.to.z - C.from.z) * e;
TGL.g.position.set(x, TG.on ? 0 : terrainY(x, z), z);
if (k >= 1) {
TGL.coming = null;
tglPlace(C.to.x, C.to.z, C.rot, TG.on ? "garage" : "out");
setStatus("<b>Your limousine is here.</b> The chauffeur holds the door: press E beside it, or choose from the car button.");
}
}
function tglHome() {
if (!TGL.g)
return;
tgBuild();
tglPlace(TG.cx + TGL_BAY.x, TG.cz + TGL_BAY.z, Math.PI, "garage");
if (!TG.on) {
TGL.g.visible = false;
TGL.driver.visible = false;
TGL.parked = true;
}
setStatus("<b>The chauffeur takes the car back to the Tower Garage.</b> It waits in your bay.");
tglOpen(false);
}
var TGL_CSS = "#tgl-btn{position:fixed;left:10px;bottom:calc(180px + env(safe-area-inset-bottom,0px));z-index:40;width:40px;height:40px;border-radius:12px;border:1px solid rgba(232,198,106,.55);background:rgba(20,16,40,.82);color:#E8C66A;font:18px/38px system-ui,sans-serif;text-align:center;cursor:pointer;padding:0}" +
"#tgl-box{position:fixed;left:58px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:57;width:min(330px,calc(100vw - 70px));max-height:min(74vh,600px);overflow:auto;display:none;background:#0E0B18;border:1px solid #5A4A7A;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6);color:#EDE8F8;font:14px/1.45 system-ui,sans-serif;padding:12px 14px}" +
"#tgl-box h3{margin:0 0 4px;font:600 16px Georgia,serif}#tgl-box .s{color:#A9A2C0;font-size:12.5px}" +
"#tgl-box button{background:#E8C66A;color:#17120A;border:0;border-radius:14px;padding:7px 12px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:3px 4px 3px 0}" +
"#tgl-box button.b2{background:#2A2448;color:#EDE8F8}#tgl-box select{width:100%;box-sizing:border-box;background:#15122A;color:#fff;border:1px solid #3A3160;border-radius:10px;padding:8px;font:14px system-ui,sans-serif;margin:6px 0}";
function tglButton() {
if (TGL.g && (TGL.fin = (TGL.fin || 0) + 1) % 30 === 0)
tglFinish(TGL.g);
var show = tglKeeper() && typeof careInCity === "function" && (careInCity() || TG.on);
if (!TGL.btn) {
if (!show)
return;
var st = document.createElement("style");
st.textContent = TGL_CSS;
document.head.appendChild(st);
var b = document.createElement("button");
b.id = "tgl-btn";
b.title = "Your limousine";
b.textContent = "🚘";
b.onclick = function (ev) { ev.stopPropagation(); tglOpen(TGL.box.style.display !== "block"); };
document.body.appendChild(b);
TGL.btn = b;
var box = document.createElement("div");
box.id = "tgl-box";
document.body.appendChild(box);
TGL.box = box;
["keydown", "keyup", "keypress"].forEach(function (t) { box.addEventListener(t, function (ev) { if (/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))
ev.stopPropagation(); }); });
}
var want = show ? "block" : "none";
if (TGL.btn.style.display !== want) {
TGL.btn.style.display = want;
if (!show)
TGL.box.style.display = "none";
}
}
function tglOpen(on) { return __ZC(204, 17, this, arguments, new.target); }
