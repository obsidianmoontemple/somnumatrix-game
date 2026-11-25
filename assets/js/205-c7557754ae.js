/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HP = { pads: {}, heli: null, pilot: null, at: "city", fly: null, box: null, css: false, near: null, cleared: false, keeper: false, crew: [], st: 0, ph: null, city: null, warned: 0, found: [] };
var HP_PAD_R = 9.5;
var HP_LIST = [
{ k: "city", name: "Somnucor, the Tower Plaza" },
{ k: "northpole", name: "the North Pole" },
{ k: "neverland", name: "Neverland" },
{ k: "sea", name: "the Endless Sea" },
{ k: "underdark", name: "the Underdark" },
{ k: "surface:moon", name: "the Moon" },
{ k: "surface:mars", name: "Mars" },
{ k: "surface:mercury", name: "Mercury" },
{ k: "surface:venus", name: "Venus" },
{ k: "surface:jupiter", name: "Jupiter's cloud station" },
{ k: "surface:saturn", name: "Saturn's cloud station" },
{ k: "surface:uranus", name: "Uranus's cloud station" },
{ k: "surface:neptune", name: "Neptune's cloud station" },
{ k: "surface:pluto", name: "Pluto" },
{ k: "surface:veyar", name: "Veyar" }
];
var HP_NEAR = {
northpole: [[-150, 140], [-90, 120], [0, 60]],
neverland: [[135, -300], [60, -330], [0, -200]],
sea: [[4060, -2540], [4120, -2700], [4000, -2600]],
underdark: [[185, -560], [120, -680], [200, -700]],
surface: [[45, 60], [60, -40], [-60, -60]],
cloud: [[20, 24], [-10, 30], [30, 10]]
};
function hpName(k) { for (var i = 0; i < HP_LIST.length; i++)
if (HP_LIST[i].k === k)
return HP_LIST[i].name; return k; }
function hpKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function hpCleared() { return hpKeeper() || HP.cleared; }
function hpHereKey() {
if (typeof WLD !== "undefined" && WLD.on) {
if (WLD.on === "surface")
return typeof SF !== "undefined" && SF.k ? "surface:" + SF.k : null;
return WLD.on;
}
if (store.inside)
return null;
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
return r && (store.here || 0) === r.id ? "city" : null;
}
function hpHeli() {
var g = new THREE.Group();
g.name = "admin-helicopter";
var body = new THREE.MeshPhongMaterial({ color: 0x2A1E4A, shininess: 90, specular: 0x6A6A80 }), gold = new THREE.MeshPhongMaterial({ color: 0xD8B050, shininess: 80, specular: 0xFFF0C0 }), dark = new THREE.MeshPhongMaterial({ color: 0x1A1A20, shininess: 40 }), metal = new THREE.MeshPhongMaterial({ color: 0x9AA0AA, shininess: 70 }), glass = new THREE.MeshPhongMaterial({ color: 0x6A90C0, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55 });
var cab = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), body);
cab.scale.set(1.25, 1.15, 2.3);
cab.position.set(0, 1.75, 0);
g.add(cab);
var belly = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 3.6), body);
belly.position.set(0, 1.05, 0.1);
g.add(belly);
var nose = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), glass);
nose.scale.set(1.12, 1.05, 1.5);
nose.rotation.x = -Math.PI / 2;
nose.position.set(0, 1.85, -1.05);
g.add(nose);
[-1, 1].forEach(function (sd) {
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.62), glass);
w.position.set(sd * 1.21, 2.0, 0.25);
w.rotation.y = sd * Math.PI / 2;
g.add(w);
var band = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 3.4), gold);
band.position.set(sd * 1.24, 1.45, 0.2);
g.add(band);
var lbl = wSign(["SOMNUCOR", "ADMINISTRATION"], 1.6, 0.5, "#2A1E4A", "#E8C66A");
lbl.position.set(sd * 1.26, 1.2, 1.15);
lbl.rotation.y = sd * Math.PI / 2;
g.add(lbl);
wBox(0.05, 0.05, 0.3, metal, sd * 1.25, 1.7, -0.4, g);
wBox(0.5, 0.06, 0.9, metal, sd * 1.35, 0.62, -0.2, g);
var sk = wCyl(0.07, 0.07, 4.6, metal, sd * 1.15, 0.1, 0.1, g, 8);
sk.rotation.x = Math.PI / 2;
var tip = wCyl(0.07, 0.07, 0.5, metal, sd * 1.15, 0.25, -2.35, g, 8);
tip.rotation.x = Math.PI / 2.6;
[-1.1, 1.2].forEach(function (z) { var st = wCyl(0.06, 0.06, 1.0, metal, sd * 0.95, 0.55, z, g, 6); st.rotation.z = sd * 0.45; });
var nl = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: sd < 0 ? 0xFF3A3A : 0x3AFF6A }));
nl.position.set(sd * 1.24, 1.9, -0.9);
g.add(nl);
});
var boom = wCyl(0.16, 0.42, 5.4, body, 0, 1.95, 4.4, g, 12);
boom.rotation.x = Math.PI / 2;
var fin = wBox(0.12, 1.5, 0.9, body, 0, 2.6, 7.0, g);
fin.rotation.x = -0.25;
wBox(1.8, 0.08, 0.5, body, 0, 2.0, 6.6, g);
wBox(0.1, 0.18, 0.7, gold, 0, 3.05, 7.15, g);
var tr = new THREE.Group();
tr.position.set(0.2, 2.55, 7.05);
g.add(tr);
[0, Math.PI / 2].forEach(function (a) { var b = wBox(0.04, 1.15, 0.1, dark, 0, 0, 0, tr); b.rotation.x = a; });
var tdisc = new THREE.Mesh(new THREE.CircleGeometry(0.62, 24), new THREE.MeshBasicMaterial({ color: 0xCCCCD4, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }));
tdisc.rotation.y = Math.PI / 2;
tdisc.visible = false;
tr.add(tdisc);
wCyl(0.18, 0.28, 0.55, metal, 0, 3.0, 0.1, g, 10);
var rot = new THREE.Group();
rot.position.set(0, 3.32, 0.1);
g.add(rot);
wCyl(0.32, 0.32, 0.18, dark, 0, 0, 0, rot, 12);
for (var i = 0; i < 4; i++) {
var bl = wBox(0.34, 0.05, 5.4, dark, 0, 0.04, 2.75, new THREE.Group());
var arm = bl.parent;
arm.rotation.y = i * Math.PI / 2 + 0.4;
rot.add(arm);
}
var disc = new THREE.Mesh(new THREE.CircleGeometry(5.6, 48), new THREE.MeshBasicMaterial({ color: 0xD8D8E0, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }));
disc.rotation.x = -Math.PI / 2;
disc.position.set(0, 3.38, 0.1);
disc.visible = false;
g.add(disc);
g.userData = { rotor: rot, disc: disc, tail: tr, tdisc: tdisc };
g.traverse(function (m) { m.raycast = function () { }; if (m.isMesh)
m.castShadow = true; });
return g;
}
function hpRotor(on) {
var U = HP.heli && HP.heli.userData;
if (!U)
return;
U.rotor.visible = !on;
U.disc.visible = on;
U.tail.children.forEach(function (c) { if (c !== U.tdisc)
c.visible = !on; });
U.tdisc.visible = on;
}
function hpPilot() {
var L = typeof randomLook === "function" ? randomLook("hp_pilot", "human") : blankLook("human");
if (typeof jobDress === "function")
jobDress(L, "Helicopter pilot", "The Somnucor Tower");
L.top = 0x2A3A52;
L.bottom = 0x2A3A52;
L.hat = "cap";
L.hatColor = 0x1A1E2A;
var f = buildFigure({ id: "hp_pilot", archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
f.traverse(function (m) { m.raycast = function () { }; });
return f;
}
function hpMarshal(k) {
var f = typeof garGuard === "function" ? garGuard("hp_marshal_" + k, "Helipad marshal") : new THREE.Group();
var vest = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.25, 0.5, 10, 1, true), new THREE.MeshLambertMaterial({ color: 0xE8D040, side: THREE.DoubleSide }));
vest.position.set(0, 1.22, 0);
vest.userData.hiVis = 0xE8D040;
f.add(vest);
f.traverse(function (m) { m.raycast = function () { }; });
return f;
}
function hpPadMesh(name) {
var g = new THREE.Group();
g.name = "helipad";
var conc = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#7A7E86";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 1400; i++) {
var v = 110 + Math.floor(Math.random() * 40);
x.fillStyle = "rgba(" + v + "," + v + "," + (v + 6) + ",0.35)";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
}
}, [3, 3]);
var base = wCyl(HP_PAD_R, HP_PAD_R + 0.3, 0.5, wM(0x7A7E86, { map: conc }), 0, -0.2, 0, g, 40);
var paint = wTex(512, 512, function (x, W, H) {
x.clearRect(0, 0, W, H);
var c = W / 2;
x.strokeStyle = "#F0D040";
x.lineWidth = 14;
x.beginPath();
x.arc(c, c, c - 10, 0, 7);
x.stroke();
x.strokeStyle = "#F4F4F0";
x.lineWidth = 16;
x.beginPath();
x.arc(c, c, c * 0.62, 0, 7);
x.stroke();
x.fillStyle = "#F4F4F0";
x.fillRect(c - 92, c - 120, 40, 240);
x.fillRect(c + 52, c - 120, 40, 240);
x.fillRect(c - 52, c - 20, 104, 40);
});
var pm = new THREE.Mesh(new THREE.CircleGeometry(HP_PAD_R - 0.1, 48), new THREE.MeshLambertMaterial({ map: paint, transparent: true, depthWrite: false }));
pm.rotation.x = -Math.PI / 2;
pm.position.y = 0.06;
g.add(pm);
var lm = new THREE.MeshBasicMaterial({ color: 0x8FE0A0 });
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2;
wMesh(new THREE.CylinderGeometry(0.1, 0.12, 0.18, 8), lm, Math.cos(a) * (HP_PAD_R + 0.05), 0.12, Math.sin(a) * (HP_PAD_R + 0.05), g);
}
var pole = wCyl(0.06, 0.08, 4.2, wM(0xD8D8DC), HP_PAD_R + 2.4, 2.1, -2.5, g, 8);
var sock = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.14, 1.6, 12, 4, true), new THREE.MeshLambertMaterial({ color: 0xF07A2A, side: THREE.DoubleSide }));
sock.rotation.z = Math.PI / 2 + 0.25;
sock.position.set(HP_PAD_R + 3.2, 3.9, -2.5);
g.add(sock);
g.userData.sock = sock;
var sp = new THREE.Group();
sp.position.set(-HP_PAD_R - 2.2, 0, 0);
sp.rotation.y = Math.PI / 2;
g.add(sp);
wBox(0.12, 2.2, 0.12, wM(0x5A5E66), -1.4, 1.1, 0, sp);
wBox(0.12, 2.2, 0.12, wM(0x5A5E66), 1.4, 1.1, 0, sp);
var sg = wSign(["Administrative Helipad", name, "The Keeper and appointed officials only"], 3.2, 1.5, "#2A1E4A", "#F0E0B0");
sg.position.set(0, 2.0, 0.08);
sp.add(sg);
var sg2 = sg.clone();
sg2.rotation.y = Math.PI;
sg2.position.z = -0.08;
sp.add(sg2);
g.traverse(function (m) { m.raycast = function () { }; m.receiveShadow = true; });
return g;
}
function hpMakePad(k, parent, lx, y, lz, rot, base, solids) {
var g = hpPadMesh(hpName(k));
g.position.set(lx, y, lz);
g.rotation.y = rot;
parent.add(g);
var mar = hpMarshal(k.replace(/\W/g, "_"));
mar.position.set(HP_PAD_R + 1.4, 0, 2.6);
mar.rotation.y = Math.PI / 2 + 0.5;
g.add(mar);
var c = Math.cos(rot), s = Math.sin(rot), P = { k: k, g: g, x: base + lx, z: lz, lx: lx, lz: lz, y: y, rot: rot, base: base, solids: solids };
function at(px, pz) { return { x: lx + px * c + pz * s, z: lz - px * s + pz * c }; }
if (solids) {
var a = at(-HP_PAD_R - 2.2, 0), b = at(HP_PAD_R + 2.4, -2.5);
P.heliSol = { x: lx, z: lz, hw: -9, hd: 3.6, rot: rot };
P.sols = [{ x: a.x, z: a.z, hw: 0.25, hd: 1.6, rot: rot }, { x: b.x, z: b.z, r: 0.15 }, P.heliSol];
P.sols.forEach(function (q) { solids.push(q); });
}
HP.pads[k] = P;
if (HP.at === k)
hpPark(k);
return P;
}
function hpSpot(W, list, P) { return __ZC(205, 0, this, arguments, new.target); }
function hpPark(k) {
var P = HP.pads[k];
if (!P)
return;
if (!HP.heli) {
HP.heli = hpHeli();
HP.pilot = hpPilot();
}
Object.keys(HP.pads).forEach(function (q) { var o = HP.pads[q]; if (o.heliSol)
o.heliSol.hw = -9; });
P.g.add(HP.heli);
HP.heli.position.set(0, 0.06, 0);
HP.heli.rotation.set(0, 0, 0);
hpRotor(false);
P.g.add(HP.pilot);
HP.pilot.position.set(2.3, 0.06, -1.4);
HP.pilot.rotation.set(0, Math.PI / 2 + 0.4, 0);
HP.pilot.visible = true;
if (P.heliSol)
P.heliSol.hw = 1.5;
HP.at = k;
}
(function () {
["northpole", "neverland", "sea", "underdark"].forEach(function (key) {
var W = WORLDS[key];
if (!W)
return;
var b = W.build, g0 = W.ground;
W.build = function (G, opt) {
var old = HP.pads[key];
if (old) {
if (old.solids && old.sols)
old.sols.forEach(function (q) { var i = old.solids.indexOf(q); if (i >= 0)
old.solids.splice(i, 1); });
delete HP.pads[key];
}
var r = b.apply(this, arguments);
try {
var sol = key === "northpole" ? NP.solids : key === "neverland" ? NV.solids : key === "sea" ? (SEA.solids = SEA.solids || []) : UD.solids;
var P = typeof WH_PLAN !== "undefined" ? WH_PLAN[key] : null, s = hpSpot(W, HP_NEAR[key], P);
if (s)
hpMakePad(key, G, s.x, s.hi + 0.05, s.z, 0, W.base, sol);
else if (window.console)
console.warn("[helipads] no level ground in", key);
}
catch (e) {
if (window.console)
console.warn("[helipads]", key, e);
}
return r;
};
W.ground = function (x, z, feet) { var h = g0.apply(this, arguments); var P = HP.pads[key]; if (P && Math.hypot(x - P.lx, z - P.lz) < HP_PAD_R + 0.3)
return Math.max(h, P.y + 0.06); return h; };
});
var SFW = WORLDS.surface;
if (SFW && typeof sfBuild === "function") {
var sb = sfBuild, sg0 = SFW.ground;
sfBuild = function (k) {
var r = sb.apply(this, arguments);
var pk = "surface:" + k;
delete HP.pads[pk];
try {
var tmp = Object.create(SFW);
tmp.key = k;
var cloud = SP_SURF[k] && SP_SURF[k].cloud;
var s = hpSpot(tmp, HP_NEAR[cloud ? "cloud" : "surface"], null);
if (s)
hpMakePad(pk, SFW.g, s.x, s.hi + 0.05, s.z, 0, SFW.base, SF.solids);
else if (window.console)
console.warn("[helipads] no level ground on", k);
}
catch (e) {
if (window.console)
console.warn("[helipads]", k, e);
}
return r;
};
SFW.ground = function (x, z, feet) {
var h = sg0.apply(this, arguments);
var k = typeof SF !== "undefined" && SF.k ? "surface:" + SF.k : null, P = k && HP.pads[k];
if (P && Math.hypot(x - P.lx, z - P.lz) < HP_PAD_R + 0.3)
return Math.max(h, P.y + 0.06);
return h;
};
}
})();
function hpCityBuild() {
if (HP.city || typeof ATLC === "undefined" || !ATLC || typeof blockedAt !== "function")
return;
var best = null, G = null;
try {
if (typeof tgGate === "function")
G = tgGate();
}
catch (e) { }
var tries = [[104, 124, 4], [60, 136, 4]];
for (var t = 0; t < tries.length && !best; t++)
for (var r = tries[t][1]; r >= tries[t][0] && !best; r -= tries[t][2])
for (var i = 0; i < 96 && !best; i++) {
var a = i / 96 * Math.PI * 2 + 0.13, x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r, ok = true, lo = 1e9, hi = -1e9;
if (G && Math.hypot(G.x - x, G.z - z) < 30)
continue;
for (var u = -1; u <= 1 && ok; u += 0.2)
for (var v = -1; v <= 1 && ok; v += 0.2) {
if (u * u + v * v > 1.01)
continue;
var sx = x + u * (HP_PAD_R + 1), sz = z + v * (HP_PAD_R + 1), h = terrainY(sx, sz);
if (blockedAt(sx, sz, h)) {
ok = false;
break;
}
lo = Math.min(lo, h);
hi = Math.max(hi, h);
}
if (ok && hi - lo > 0.3)
ok = false;
if (ok)
for (var j = 0; j < store.objects.length; j++) {
var o = store.objects[j];
if (o.x === undefined)
continue;
var dd = Math.hypot(o.x - x, o.z - z);
if (dd < (o.archetype === "flowerbed" ? HP_PAD_R + 1.5 : HP_PAD_R + 3)) {
ok = false;
break;
}
}
if (ok)
best = { x: x, z: z, y: hi, a: a };
}
if (!best)
return;
var root = new THREE.Group();
root.name = "helipad-city";
scene.add(root);
HP.citySol = [];
var rot = Math.atan2(-(ATLC.x - best.x), -(ATLC.z - best.z)) + Math.PI;
hpMakePad("city", root, best.x, best.y + 0.05, best.z, rot, 0, HP.citySol);
HP.city = root;
}
(function () {
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (HP.citySol && !store.inside && !(typeof WLD !== "undefined" && WLD.on) && typeof worldSolidAt === "function" && worldSolidAt(HP.citySol, x, z, feet))
return true;
return ba.apply(this, arguments);
};
}
})();
function hpCam(hx, hy, hz, h, back, up) {
var P = camera.position;
P.set(hx + Math.sin(h) * back, hy + up, hz + Math.cos(h) * back);
yaw = h;
if (typeof pitch !== "undefined")
pitch = -Math.atan2(up - 1.5, back);
if (typeof flyY !== "undefined")
flyY = 0;
}
function hpWorldPos(P) { var o = new THREE.Vector3(); P.g.getWorldPosition(o); return o; }
function hpGoWorld(k) { return __ZC(205, 1, this, arguments, new.target); }
function hpFly(dest) { return __ZC(205, 2, this, arguments, new.target); }
function hpCall() { return __ZC(205, 3, this, arguments, new.target); }
function hpTickFly() {
var F = HP.fly;
if (!F)
return;
var t = (performance.now() - F.t0) / 1000, H = HP.heli;
var ease = function (k) { return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; };
if (F.ph === "call") {
var k = Math.min(1, t / 6);
H.position.y = 0.06 + 45 * (1 - ease(k));
if (k >= 1) {
hpPark(F.dest);
HP.fly = null;
setStatus("<b>The helicopter is on the pad.</b> The pilot is waiting: press E at the pad to fly.");
}
return;
}
var P = HP.pads[F.ph === "down" ? F.dest : F.from];
if (!P) {
HP.fly = null;
return;
}
var w = hpWorldPos(P), h = P.rot;
if (F.ph === "up") {
var k1 = Math.min(1, t / 5);
H.position.y = 0.06 + 50 * ease(k1);
H.rotation.y = k1 * 0.6;
H.rotation.x = -0.08 * Math.sin(k1 * Math.PI);
hpCam(w.x, w.y + H.position.y, w.z, h + H.rotation.y, 15, 5.5);
if (k1 >= 1 && !F.fading) {
F.fading = true;
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = "The helicopter flies to " + hpName(F.dest) + "…";
}
setTimeout(function () {
var ok = false;
try {
ok = hpGoWorld(F.dest);
}
catch (e) {
if (window.console)
console.warn("[helipads] fly", e);
}
if (!ok) {
F.dest = F.from;
try {
hpGoWorld(F.from);
}
catch (e) { }
setStatus("The pilot could not find a landing there, and brings you back.");
}
var D = HP.pads[F.dest];
if (D) {
D.g.add(H);
H.position.set(0, 50, 0);
H.rotation.set(0, 0.6, 0);
HP.at = F.dest;
}
F.ph = "down";
F.t0 = performance.now();
F.fading = false;
setTimeout(function () { if (typeof garFade === "function")
garFade(false); }, 400);
}, 1400);
}
return;
}
if (F.ph === "down") {
var k2 = Math.min(1, t / 5.5);
H.position.y = 0.06 + 50 * (1 - ease(k2));
H.rotation.y = 0.6 * (1 - k2);
hpCam(w.x, w.y + H.position.y, w.z, h + H.rotation.y, 15, 5.5);
if (k2 >= 1) {
hpPark(F.dest);
HP.fly = null;
var c = Math.cos(h), s = Math.sin(h), ox = w.x + 4.6 * c, oz = w.z - 4.6 * s;
camera.position.set(ox, w.y + 0.06 + 1.72, oz);
yaw = h - Math.PI / 2;
if (typeof pitch !== "undefined")
pitch = 0;
setStatus("<b>" + esc(hpName(F.dest)) + ".</b> The helicopter has landed. The pilot waits with it: press E at the pad to fly on.");
}
}
}
var HP_CSS = "#hp-box{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:57;width:min(380px,calc(100vw - 24px));max-height:min(70vh,620px);overflow:auto;display:none;background:#0E0B18;border:1px solid #5A4A7A;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6);color:#EDE8F8;font:14px/1.45 system-ui,sans-serif;padding:12px 14px}" +
"#hp-box h3{margin:0 0 4px;font:600 16px Georgia,serif}#hp-box .s{color:#A9A2C0;font-size:12.5px}#hp-box h4{margin:12px 0 4px;font:600 13px system-ui,sans-serif;color:#E8C66A}" +
"#hp-box button{background:#E8C66A;color:#17120A;border:0;border-radius:14px;padding:6px 12px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:3px 4px 3px 0}" +
"#hp-box button.b2{background:#2A2448;color:#EDE8F8}#hp-box .r{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 0;border-bottom:1px solid #241E38}" +
"#hp-box input{width:100%;box-sizing:border-box;background:#15122A;color:#fff;border:1px solid #3A3160;border-radius:10px;padding:8px;font:14px system-ui,sans-serif;margin:4px 0}";
function hpEl() { return __ZC(205, 4, this, arguments, new.target); }
function hpStatus() { return __ZC(205, 5, this, arguments, new.target); }
function hpOpen(on) {
var b = hpEl();
if (!on) {
b.style.display = "none";
return;
}
b.style.display = "block";
hpPaint();
hpStatus().then(function () { if (b.style.display === "block")
hpPaint(); });
}
function hpPaint() { return __ZC(205, 6, this, arguments, new.target); }
function hpFind(qs) {
qs = (qs || "").trim();
if (!qs) {
HP.found = [];
hpFoundPaint();
return;
}
cityRpc("phone_book", { p_q: qs }).then(function (d) { HP.found = (d && d.people) || []; hpFoundPaint(); }).catch(function () { HP.found = []; hpFoundPaint(); });
}
function hpFoundPaint() { return __ZC(205, 7, this, arguments, new.target); }
function hpAppoint(id, on) {
cityRpc("heli_appoint", { p_user: id, p_on: on }).then(function (d) {
if (d && d.say)
setStatus(esc(d.say));
return hpStatus();
}).then(function () { hpPaint(); }).catch(function (e) { setStatus("The list could not be changed just now."); });
}
function hpTick(dt) {
for (var q in HP.pads)
if (!HP.pads[q] || !HP.pads[q].g)
delete HP.pads[q];
var here = hpHereKey();
if (here === "city" && !HP.city)
hpCityBuild();
hpTickFly();
var P = here && HP.pads[here];
if (P && P.g.userData.sock)
P.g.userData.sock.rotation.y = Math.sin(performance.now() / 2600) * 0.25;
if (HP.fly) {
hpPrompt(null);
return;
}
var near = false;
if (P) {
var w = hpWorldPos(P), C = camera.position;
near = Math.hypot(C.x - w.x, C.z - w.z) < HP_PAD_R + 3.5;
}
if (near) {
if (Date.now() - HP.st > 60000)
hpStatus();
var ok = hpCleared();
hpPrompt(ok ? (HP.at === here ? "<b>The administrative helicopter</b> · the pilot is waiting · <b>press E</b> to choose where to fly" : "<b>Helipad</b> · the helicopter is at " + esc(hpName(HP.at)) + " · <b>press E</b> to call it")
: "<b>Administrative helipad</b> · the Keeper and appointed officials only", ok ? function () { hpOpen(true); } : function () { hpOpen(true); });
}
else {
hpPrompt(null);
if (HP.box && HP.box.style.display === "block" && !HP.fly)
hpOpen(false);
}
}
function hpPrompt(html, fn) {
if (html === HP.ph)
return;
HP.ph = html;
if (typeof WLD !== "undefined" && WLD.on) {
if (typeof worldPrompt === "function")
worldPrompt(html, fn);
return;
}
if (typeof worldPromptCity === "function")
worldPromptCity(html, fn);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
hpTick(dt);
}
catch (e) {
if (window.console && (HP.warned++) < 5)
console.warn("[helipads]", e);
} };
})();
