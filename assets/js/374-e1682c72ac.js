/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var VLT = { list: [], t: 0, scanT: 0, dark: 0, darkT: 0, mats: null, tex: null, pool: null, spot: null, lite: false, mode: "auto", lay: {}, warned: false,
v3: new THREE.Vector3(), v4: new THREE.Vector3(), m4: new THREE.Matrix4() };
try {
var vltM = localStorage.getItem("somnu.vehlights");
if (vltM === "on" || vltM === "auto")
VLT.mode = vltM;
}
catch (e) { }
var VLT_CLASS = {
car: "car", coupe: "car", roadster: "car", sportscar: "car", limousine: "car", taxicab: "car", vintagecar: "car", van: "car", hovercar: "car",
truck: "car", bus: "car", omnibus: "car", tractor: "car", firetruck: "car",
motorbike: "moto", scooter: "moto",
tram: "rail", train: "rail",
carriage: "coach", hansomcab: "coach", wagon: "coach", cart: "coach",
bicycle: "cycle", tandem: "cycle", tricycle: "cycle",
ship: "ship", boat: "ship", submarine: "ship",
airship: "air", saucer: "air", plane: "air"
};
function vltClassOf(arch) { return (arch && VLT_CLASS[arch]) || null; }
function vltLite() { return typeof LITE !== "undefined" && !!LITE; }
function vltMats() {
if (VLT.mats)
return VLT.mats;
var B = function (c) { return new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 1, fog: true }); };
VLT.mats = {
head: B(0xFFF6DE), lantern: B(0xFFD58A),
tail: B(0x8A1410), brake: B(0xFF2A18),
indOff: B(0x7A4A12), indOn: B(0xFFA51E),
revOff: B(0x9A9C98), revOn: B(0xFFFFFF),
port: B(0xFF2A22), stbd: B(0x2AFF66), white: B(0xFFF8EA),
beaconOff: B(0x5A1210), beaconOn: B(0xFF3A26)
};
return VLT.mats;
}
function vltGlowTex() { return __ZC(374, 0, this, arguments, new.target); }
var VLT_HALO_COL = { head: 0xFFF0D0, lantern: 0xFFC870, tail: 0xFF2A18, ind: 0xFFA020, rev: 0xFFFFFF, port: 0xFF3020, stbd: 0x30FF70, white: 0xFFF4E0, beacon: 0xFF3020 };
function vltHaloMat(k) {
var M = vltMats();
if (M["h_" + k])
return M["h_" + k];
M["h_" + k] = new THREE.SpriteMaterial({ map: vltGlowTex(), color: VLT_HALO_COL[k] || 0xFFFFFF, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: true });
return M["h_" + k];
}
function vltPoolMat() { return __ZC(374, 1, this, arguments, new.target); }
function vltBox(g) { return __ZC(374, 2, this, arguments, new.target); }
function vltLayout(b, cls) { return __ZC(374, 3, this, arguments, new.target); }
function vltJoin(parts) { return __ZC(374, 4, this, arguments, new.target); }
function vltGeos(lay) { return __ZC(374, 5, this, arguments, new.target); }
function vltFit(E) { return __ZC(374, 6, this, arguments, new.target); }
function vltUnfit(E) {
if (E.root && E.root.parent)
E.root.parent.remove(E.root);
E.root = null;
E.lens = null;
E.halos = null;
E.pool = null;
E.lay = null;
if (E.g && E.g.userData.vltE === E)
delete E.g.userData.vltE;
}
function vltInScene(g) { for (var p = g, i = 0; p && i < 12; p = p.parent, i++)
if (p === scene)
return true; return false; }
function vltCandidates() {
var out = [];
try {
if (typeof rideG !== "undefined" && rideG && typeof rideArch !== "undefined" && vltClassOf(rideArch)) {
out.push({ g: rideG, arch: rideArch, own: true, st: (typeof DRIVE !== "undefined") ? vltDriveState : null });
}
if (typeof TRAFFIC !== "undefined" && TRAFFIC.length)
for (var i = 0; i < TRAFFIC.length; i++) {
var t = TRAFFIC[i];
if (!t.g || !t.spec || !vltClassOf(t.spec.archetype))
continue;
out.push({ g: t.g, arch: t.spec.archetype, st: vltTrafficState(t) });
}
VLT_PRES.forEach(function (p) { out.push(p); });
if (typeof WLD !== "undefined" && WLD && WLD.on === "sea" && typeof SEA !== "undefined" && SEA.ship)
out.push({ g: SEA.ship, arch: "ship", st: vltSeaState });
if (typeof SSX !== "undefined" && SSX) {
if (SSX.boat)
out.push({ g: SSX.boat, arch: "boat", st: null, own: !!SSX.aboard });
if (SSX.barge && SSX.barge.g)
out.push({ g: SSX.barge.g, arch: "boat", st: null });
}
}
catch (e) {
if (!VLT.warned) {
VLT.warned = true;
if (window.console)
console.warn("vehicle lights:", e);
}
}
return out;
}
var VLT_PRES = [];
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments);
try {
var k = row && !row.away && row.look && row.look.ride;
if (g && k && vltClassOf(k) && g.children.length) {
var v = g.children[g.children.length - 1];
VLT_PRES = VLT_PRES.filter(function (p) { return vltInScene(p.g) || p.fresh > Date.now(); });
VLT_PRES.push({ g: v, arch: k, st: null, fresh: Date.now() + 5000 });
}
}
catch (e) { }
return g;
};
})();
function vltDriveState() {
var D = DRIVE;
if (!D.on)
return null;
var v = D.v || 0;
return { v: v, brake: (D.brk || 0) > 0.05 || Math.abs(v) < 0.25, ind: D.ind || null, rev: v < -0.15 };
}
function vltTrafficState(t) {
var kerb = (typeof ROAD_SIDE !== "undefined" && ROAD_SIDE < 0) ? "right" : "left";
return function () { var w = t.wait > 0; return { v: w ? 0 : t.v, brake: w, ind: (w && !t.tram) ? kerb : null, rev: false }; };
}
function vltSeaState() { return { v: (typeof SEA !== "undefined" && SEA.v) || 0, brake: false, ind: null, rev: false }; }
function vltDarkNow() {
var d = 0;
try {
if (typeof careInCity === "function" && careInCity() && typeof nightGlowIsNight === "function")
d = nightGlowIsNight();
if (typeof sun !== "undefined" && sun && typeof sun.intensity === "number") {
var s = sun.intensity;
d = Math.max(d, Math.min(1, Math.max(0, (0.5 - s) / 0.3)));
}
}
catch (e) { }
return d;
}
function vltSpot() {
if (VLT.spot !== null)
return VLT.spot;
if (vltLite() || typeof scene === "undefined" || !scene) {
VLT.spot = false;
return false;
}
var s = new THREE.SpotLight(0xFFF1D8, 0, 55, 0.42, 0.55, 1.4);
s.castShadow = false;
s.userData.vlt = 1;
scene.add(s);
scene.add(s.target);
VLT.spot = s;
return s;
}
function vltTick(dt) {
if (typeof scene === "undefined" || !scene || typeof camera === "undefined")
return;
VLT.t += dt;
VLT.lite = vltLite();
vltSpot();
VLT.darkT -= dt;
if (VLT.darkT <= 0) {
VLT.darkT = 0.5;
VLT.dark = vltDarkNow();
}
var dark = VLT.mode === "on" ? Math.max(VLT.dark, 0.75) : VLT.dark;
VLT.scanT -= dt;
if (VLT.scanT <= 0) {
VLT.scanT = 0.5;
vltScan();
}
var now = performance.now();
var blink = (Math.floor(now / 400) % 2) === 0, beat = (Math.floor(now / 500) % 2) === 0;
var M = vltMats(), P = camera.position, lite = VLT.lite, own = null;
for (var i = 0; i < VLT.list.length; i++) {
var E = VLT.list[i], g = E.g;
if (!g.visible && !E.own)
continue;
if (E.root && (g.userData.modelled || null) !== E.modelled)
vltFit(E);
if (!E.root) {
E.tryT = (E.tryT || 0) - dt;
if (E.tryT > 0)
continue;
E.tryT = 1;
if (!vltFit(E))
continue;
}
g.getWorldPosition(VLT.v3);
var dx = VLT.v3.x - P.x, dz = VLT.v3.z - P.z, d2 = dx * dx + dz * dz;
if (d2 > 260 * 260 && !E.own)
continue;
var st = E.st ? E.st() : null;
if (!st)
st = vltMotion(E, dt);
if (E.own)
own = E;
var cls = E.lay.cls, L = E.lens, near = E.own || d2 < (lite ? 45 * 45 : 110 * 110);
var brake = !!st.brake, iL = st.ind === "left" || st.ind === "hazard", iR = st.ind === "right" || st.ind === "hazard";
if (L.tail)
L.tail.material = brake ? M.brake : M.tail;
if (L.indL)
L.indL.material = iL && blink ? M.indOn : M.indOff;
if (L.indR)
L.indR.material = iR && blink ? M.indOn : M.indOff;
if (L.rev)
L.rev.material = st.rev ? M.revOn : M.revOff;
if (L.beacon)
L.beacon.material = beat ? M.beaconOn : M.beaconOff;
for (var h = 0; h < E.halos.length; h++) {
var s = E.halos[h], t = s.userData.t, k = 0;
if (near) {
if (t === "head" || t === "lantern")
k = dark > 0.05 ? (0.5 + dark * 0.7) : 0;
else if (t === "tail")
k = brake ? (0.9 + dark * 0.3) : (dark > 0.05 ? 0.6 + dark * 0.3 : 0);
else if (t === "indL")
k = iL && blink ? 0.9 + dark * 0.3 : 0;
else if (t === "indR")
k = iR && blink ? 0.9 + dark * 0.3 : 0;
else if (t === "rev")
k = st.rev ? 0.8 : 0;
else if (t === "beacon")
k = beat ? (0.9 + dark * 0.6) : 0;
else
k = 0.5 + dark * 0.8;
}
if (k > 0) {
var r = Math.max(0.3, s.userData.r * 3) * k;
s.scale.set(r, r, 1);
s.visible = true;
}
else
s.visible = false;
}
if (E.pool) {
E.pool.visible = dark > 0.15 && (E.own || (!lite && d2 < 70 * 70));
}
}
if (VLT.mats.pool)
VLT.mats.pool.opacity = Math.min(0.42, dark * 0.45);
vltBeam(own, dark);
vltHud(blink);
}
function vltMotion(E, dt) { return __ZC(374, 7, this, arguments, new.target); }
function vltScan() {
var C = vltCandidates(), seen = [];
C.forEach(function (c) {
if (!c.g || !vltInScene(c.g))
return;
var E = c.g.userData.vltE;
if (!E || VLT.list.indexOf(E) < 0) {
E = { g: c.g, arch: c.arch, cls: vltClassOf(c.arch), st: c.st, own: !!c.own, root: null };
VLT.list.push(E);
}
E.st = c.st;
E.own = !!c.own;
seen.push(E);
});
VLT_PRES = VLT_PRES.filter(function (p) { return vltInScene(p.g) || p.fresh > Date.now(); });
for (var i = VLT.list.length - 1; i >= 0; i--) {
var E = VLT.list[i];
if (seen.indexOf(E) < 0) {
vltUnfit(E);
VLT.list.splice(i, 1);
}
}
}
function vltBeam(E, dark) {
var s = VLT.spot;
if (!s)
return;
var on = E && E.lay && E.lay.pool && dark > 0.15 && !(typeof store !== "undefined" && store.inside);
if (!on) {
if (s.intensity !== 0)
s.intensity = 0;
return;
}
var g = E.g, P = E.lay.pool;
g.updateMatrixWorld(true);
s.position.set(0, P.y + 1.0, P.z - P.l * 0.5).applyMatrix4(g.matrixWorld);
s.target.position.set(0, P.y, P.z + P.l * 1.6).applyMatrix4(g.matrixWorld);
s.target.updateMatrixWorld();
s.intensity = 0.8 * Math.min(1, dark * 1.3);
}
function vltHud(blink) {
if (!(typeof DRIVE !== "undefined" && DRIVE.on))
return;
var el = document.getElementById("dhud");
if (!el)
return;
var a = el.querySelectorAll(".dh-ind span");
for (var i = 0; i < a.length; i++) {
var on = a[i].classList.contains("on"), o = on ? (blink ? "1" : "0.25") : "";
if (a[i].style.opacity !== o)
a[i].style.opacity = o;
}
var b = el.querySelector("[data-vlt]");
if (!b) {
vltButton(el);
b = el.querySelector("[data-vlt]");
}
}
function vltButton(el) { return __ZC(374, 8, this, arguments, new.target); }
function vltToggle() { return __ZC(374, 9, this, arguments, new.target); }
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyL" && typeof DRIVE !== "undefined" && DRIVE.on && typeof walkMode !== "undefined" && walkMode) {
e.preventDefault();
vltToggle();
}
});
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
vltTick(dt);
}
catch (e) {
if (!VLT.warned) {
VLT.warned = true;
if (window.console)
console.warn("vehicle lights:", e);
}
} };
})();
