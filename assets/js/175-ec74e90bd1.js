/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GAR = { list: null, built: {}, at: 0, wait: 0, armed: true, busy: false, tried: {}, fade: null, anim: 0 };
var GAR_STAIRS = [0, 2, 4, 6];
function garMe() { return (typeof session !== "undefined" && session && session.user) ? session.user.id : "me"; }
function garList() {
if (GAR.list)
return GAR.list;
var L = [], R = ATL_RINGS, main = ATL_STAIRS.filter(function (s) { return s.main; });
for (var i = 0; i < R.length - 1; i++) {
var U = R[i], D = R[i + 1];
GAR_STAIRS.forEach(function (si) {
var s = main[si];
if (!s)
return;
var ru = U.E - 8, rl = D.S + 8, rm = (U.E + D.S) / 2, a = s.a + (s.half + 17) / ru;
L.push({ id: "g" + i + "_" + si, i: i, up: U, down: D, a: a, ru: ru, rl: rl, rm: rm,
name: "Ring Garage, " + U.name + " to " + D.name });
});
}
return (GAR.list = L);
}
function garXZ(a, r) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function garMat(c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); }
function garBox(g, w, h, d, mat, x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); g.add(m); return m; }
function garSignTex(lines, bg, fg) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 160;
var x = c.getContext("2d");
x.fillStyle = bg || "#1E3A5A";
x.fillRect(0, 0, 512, 160);
x.strokeStyle = "#F2D27A";
x.lineWidth = 8;
x.strokeRect(6, 6, 500, 148);
x.fillStyle = fg || "#FFF6DC";
x.textAlign = "center";
x.textBaseline = "middle";
lines.forEach(function (t, k) {
var sz = k === 0 ? 50 : 30;
x.font = (k === 0 ? "bold " : "") + sz + "px Georgia,serif";
while (x.measureText(t).width > 480 && sz > 14) {
sz -= 2;
x.font = (k === 0 ? "bold " : "") + sz + "px Georgia,serif";
}
x.fillText(t, 256, lines.length === 1 ? 80 : (k === 0 ? 56 : 112));
});
return new THREE.CanvasTexture(c);
}
function garSign(g, lines, w, h, x, y, z, ry) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: garSignTex(lines), side: THREE.DoubleSide }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
g.add(m);
return m;
}
function garPlate(g) {
var steel = garMat(0x7A8088), yel = garMat(0xE8C020), blk = garMat(0x1A1A1A);
garBox(g, 5, 0.08, 8.4, steel, 0, 0.04, 0);
for (var k = 0; k < 7; k++) {
garBox(g, 0.6, 0.1, 0.25, k % 2 ? blk : yel, -2.2 + k * 0.73, 0.06, 4.1);
garBox(g, 0.6, 0.1, 0.25, k % 2 ? blk : yel, -2.2 + k * 0.73, 0.06, -4.1);
}
[-2.6, 2.6].forEach(function (x) { garBox(g, 0.2, 1.2, 0.2, yel, x, 0.6, 4.3); garBox(g, 0.2, 1.2, 0.2, yel, x, 0.6, -4.3); });
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFA020 }));
lamp.position.set(2.6, 1.35, 4.3);
g.add(lamp);
return lamp;
}
function garGuard(id, title) {
var L = (typeof randomLook === "function") ? randomLook(id, "human") : blankLook("human");
if (typeof jobDress === "function")
jobDress(L, title || "Garage guard", "Ring Garage");
var fg = buildFigure({ id: id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
fg.traverse(function (m) { m.raycast = function () { }; });
return fg;
}
function garBooth(g, x, z, ry) {
var b = new THREE.Group();
b.position.set(x, 0, z);
b.rotation.y = ry || 0;
g.add(b);
garBox(b, 1.8, 2.4, 1.8, garMat(0x2E4A6A), 0, 1.2, 0);
garBox(b, 1.82, 0.7, 1.82, garMat(0xBFD8F0, { transparent: true, opacity: 0.55 }), 0, 1.65, 0);
garBox(b, 2.2, 0.15, 2.2, garMat(0x1E2A3A), 0, 2.48, 0);
var arm = new THREE.Group();
arm.position.set(1.1, 1.0, 0.9);
b.add(arm);
var bar = garBox(arm, 0.12, 0.12, 4.6, garMat(0xE83A2A), 0, 0, 2.3);
for (var k = 0; k < 4; k++)
garBox(arm, 0.13, 0.13, 0.5, garMat(0xF4F0E6), 0, 0, 0.6 + k * 1.1);
return arm;
}
function garBuild(G) {
var U = G.up, D = G.down, root = new THREE.Group();
root.userData.gar = G.id;
var pu = garXZ(G.a, G.ru), pl = garXZ(G.a, G.rl), pm = garXZ(G.a, G.rm);
var face = (typeof rotOut === "function") ? rotOut(G.a) : 0;
var up = new THREE.Group();
up.position.set(pu.x, U.H, pu.z);
up.rotation.y = face;
root.add(up);
var lampU = garPlate(up);
var hall = new THREE.Group();
hall.position.set(0, 0, -11);
up.add(hall);
var stone = garMat(0xB8B0A0), roof = garMat(0x3A4A5A);
garBox(hall, 14, 4.8, 0.4, stone, 0, 2.4, -3.6);
garBox(hall, 0.4, 4.8, 7.6, stone, -7, 2.4, 0);
garBox(hall, 0.4, 4.8, 7.6, stone, 7, 2.4, 0);
garBox(hall, 14.6, 0.4, 8.2, roof, 0, 4.9, 0);
for (var b = 0; b < 4; b++)
garBox(hall, 0.12, 0.02, 5, garMat(0xF4F0E6), -5.25 + b * 3.5, 0.03, 0.6);
garSign(hall, ["RING GARAGE", "Car lift to " + D.name + " · guarded parking"], 7, 2.2, 0, 5.9, 4.15, 0);
var armU = garBooth(up, -4.2, 2.6, 0);
var dn = new THREE.Group();
dn.position.set(pl.x, D.H, pl.z);
dn.rotation.y = face + Math.PI;
root.add(dn);
var lampD = garPlate(dn);
var armD = garBooth(dn, -4.2, 2.6, 0);
garSign(dn, ["CAR LIFT", "Up to " + U.name], 4.4, 1.4, 0, 3.8, -4.8, Math.PI);
var tw = new THREE.Group();
tw.position.set(pm.x, 0, pm.z);
tw.rotation.y = face;
root.add(tw);
var iron = garMat(0x2F3E38), h0 = D.H - 3, h1 = U.H + 9, hh = h1 - h0, foot = D.H - 0.4;
var glassM = garMat(0x9FC4CC, { transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide });
garBox(tw, 8, foot - h0, 8, stone, 0, (h0 + foot) / 2, 0);
garBox(tw, 8.4, 0.4, 8.4, garMat(0x9A9282), 0, foot + 0.2, 0);
[[-3, -3], [3, -3], [-3, 3], [3, 3]].forEach(function (q) { garBox(tw, 0.75, h1 - foot, 0.75, iron, q[0], (foot + h1) / 2, q[1]); garBox(tw, 1.1, 1.2, 1.1, iron, q[0], foot + 0.6, q[1]); });
var bay = 5, braceL = Math.hypot(6, bay), braceA = Math.atan2(bay, 6), braceG = new THREE.BoxGeometry(braceL, 0.18, 0.14);
for (var y = foot + bay; y <= h1 + 0.01; y += bay) {
garBox(tw, 6.6, 0.4, 0.4, iron, 0, y, -3);
garBox(tw, 6.6, 0.4, 0.4, iron, 0, y, 3);
garBox(tw, 0.4, 0.4, 6.6, iron, -3, y, 0);
garBox(tw, 0.4, 0.4, 6.6, iron, 3, y, 0);
}
for (var yb = foot; yb + bay <= h1 + 0.01; yb += bay) {
[0, 1, 2, 3].forEach(function (side) {
[1, -1].forEach(function (dir) {
var m = new THREE.Mesh(braceG, iron), along = side < 2, off = side % 2 ? 3 : -3;
m.position.set(along ? 0 : off, yb + bay / 2, along ? off : 0);
if (along) {
m.rotation.z = dir * braceA;
}
else {
m.rotation.y = Math.PI / 2;
m.rotation.x = dir * braceA;
}
tw.add(m);
});
});
}
garBox(tw, 6.1, h1 - foot, 6.1, glassM, 0, (foot + h1) / 2, 0);
garBox(tw, 7.6, 3.4, 7.6, stone, 0, h1 + 1.7, 0);
garBox(tw, 8.2, 0.4, 8.2, garMat(0x9A9282), 0, h1 + 3.6, 0);
var mr = new THREE.Mesh(new THREE.ConeGeometry(6.2, 3.2, 4), roof);
mr.position.set(0, h1 + 5.4, 0);
mr.rotation.y = Math.PI / 4;
tw.add(mr);
var winM = garMat(0xFFD890, { emissive: 0x8A6A30 });
[[3.82, 0], [-3.82, 0]].forEach(function (w) { var wm = garBox(tw, w[0] ? 0.1 : 1.4, 1.6, w[0] ? 1.4 : 0.1, winM, w[0], h1 + 1.9, w[1]); wm.userData.noRay = 1; });
garSign(tw, ["CAR LIFT", "Ring Garage"], 4.4, 1.3, 0, h1 + 1.9, 3.95, 0);
garSign(tw, ["CAR LIFT", "Ring Garage"], 4.4, 1.3, 0, h1 + 1.9, -3.95, Math.PI);
var cage = garBox(tw, 5.4, 2.6, 5.4, garMat(0xC8A040, { transparent: true, opacity: 0.85 }), 0, D.H + 1.3, 0);
var gu = garGuard("garg_" + G.id + "_u", "Garage guard");
gu.position.set(-4.2, 0, 4.2);
gu.rotation.y = 0;
up.add(gu);
var gd = garGuard("garg_" + G.id + "_d", "Garage guard");
gd.position.set(-4.2, 0, 4.2);
gd.rotation.y = 0;
dn.add(gd);
var ga = garGuard("garg_" + G.id + "_a", "Garage attendant");
ga.position.set(5, 0, -9);
ga.rotation.y = 0;
up.add(ga);
var cars = [];
if (typeof build === "function")
[0, 1].forEach(function (k) {
try {
var spec = { id: "garcar_" + G.id + "_" + k, archetype: k ? "coupe" : "car", attrs: { c: [0x2A4A7A, 0x7A2A2A, 0x2A6A4A, 0xD8D0C0][(G.i + k) % 4] }, solid: false, detail: 3, nights: [], city: true };
var cg = build(spec);
cg.position.set(-3.5 + k * 7, 0, -10.4);
cg.rotation.y = Math.PI;
hall.parent.add(cg);
cars.push(cg);
}
catch (e) { }
});
root.traverse(function (m) { if (m.isMesh && !m.userData.noRay)
m.castShadow = false; });
scene.add(root);
var sol = [];
function solid(grp, lx, lz, hw, hd, h, base) {
var c = Math.cos(grp.rotation.y), s = Math.sin(grp.rotation.y);
sol.push({ x: grp.position.x + lx * c + lz * s, z: grp.position.z - lx * s + lz * c, hw: hw, hd: hd, rot: grp.rotation.y, h: h, b: base });
}
solid(up, 0, -14.6, 7, 0.3, 5, U.H);
solid(up, -7, -11, 0.3, 3.8, 5, U.H);
solid(up, 7, -11, 0.3, 3.8, 5, U.H);
solid(up, -4.2, 2.6, 0.9, 0.9, 2.5, U.H);
solid(dn, -4.2, 2.6, 0.9, 0.9, 2.5, D.H);
return { root: root, lamps: [lampU, lampD], arms: [armU, armD], cage: cage, h0: D.H, h1: U.H, sol: sol, G: G };
}
function garUnbuild(id) {
var B = GAR.built[id];
if (!B)
return;
scene.remove(B.root);
B.root.traverse(function (m) { if (m.geometry && m.geometry.dispose)
m.geometry.dispose(); if (m.material && m.material.map && m.material.map.dispose)
m.material.map.dispose(); });
delete GAR.built[id];
}
function garSweep() {
if (!ATLC)
return;
var P = camera.position;
if (store.workplaceAt && !store.workplaceAt["Somnucor Ring Garages"]) {
var G1 = garList().filter(function (G) { return G.i === 1; })[0];
if (G1) {
var w = garXZ(G1.a, G1.ru - 6);
store.workplaceAt["Somnucor Ring Garages"] = { x: w.x, z: w.z, id: null };
}
}
garList().forEach(function (G) {
var c = garXZ(G.a, G.rm), d = Math.hypot(P.x - c.x, P.z - c.z);
if (d < 420 && !GAR.built[G.id]) {
try {
GAR.built[G.id] = garBuild(G);
}
catch (e) {
if (window.console)
console.warn("garage:", e);
GAR.built[G.id] = { root: new THREE.Group(), lamps: [], arms: [], sol: [], G: G };
}
}
else if (d > 620 && GAR.built[G.id])
garUnbuild(G.id);
var B = GAR.built[G.id];
if (B && B.root)
B.root.children.forEach(function (c) { var q = c.position; if (!q.x && !q.z)
return; var dd = Math.hypot(P.x - q.x, P.z - q.z); c.visible = dd < (c.visible ? 320 : 280); });
});
}
function garOnStairs(x, z) {
if (!ATLC)
return false;
var dx = x - ATLC.x, dz = z - ATLC.z, r = Math.hypot(dx, dz), R = ATL_RINGS;
for (var i = 0; i < R.length - 1; i++) {
if (r > R[i].E - 1 && r < R[i + 1].S + ATL_STAIR_RUN)
return !!atlNearStair(r, Math.atan2(dz, dx));
}
return false;
}
function garNearest(x, z) {
var best = null;
garList().forEach(function (G) { var c = garXZ(G.a, G.rm), d = Math.hypot(x - c.x, z - c.z); if (!best || d < best.d)
best = { G: G, d: d }; });
return best && best.G;
}
function garPlateAt(x, z) { return __ZC(175, 0, this, arguments, new.target); }
function garFade(on) { return __ZC(175, 1, this, arguments, new.target); }
function garRide(p) { return __ZC(175, 2, this, arguments, new.target); }
function garTick(dt) {
if (!ATLC || !careInCity()) {
return;
}
GAR.at -= dt;
if (GAR.at <= 0) {
GAR.at = 2;
garSweep();
}
GAR.anim += dt;
var t = GAR.anim;
Object.keys(GAR.built).forEach(function (id) {
var B = GAR.built[id];
if (!B.cage)
return;
var k = 0.5 - 0.5 * Math.cos(t * 0.35 + B.G.i);
B.cage.position.y = B.h0 + 1.3 + (B.h1 - B.h0) * k;
B.lamps.forEach(function (l) { l.visible = true; });
});
var D = typeof DRIVE !== "undefined" ? DRIVE : null;
if (!D || !D.on || D.mode !== "road" || GAR.busy) {
GAR.wait = 0;
return;
}
var P = camera.position, p = garPlateAt(P.x, P.z);
if (!p) {
GAR.wait = 0;
GAR.armed = true;
return;
}
if (!GAR.armed)
return;
var B = GAR.built[p.G.id];
if (B && B.arms)
B.arms.forEach(function (a) { a.rotation.x = -1.3; });
if (Math.abs(D.v) < 1.2) {
GAR.wait += dt;
driveNote("Car lift: hold still and it takes you " + (p.from === "up" ? "down" : "up") + " to " + p.ring + ".", 1);
if (GAR.wait > 1.4) {
GAR.wait = 0;
garRide(p);
}
}
else {
GAR.wait = 0;
driveNote("Car lift ahead: stop on the plate.", 1);
}
}
(function () {
if (typeof driveBlocked === "function") {
var db = driveBlocked;
driveBlocked = function (x, z, h, S, v) {
try {
if (ATLC && !store.inside && typeof DRIVE !== "undefined" && DRIVE.mode === "road") {
var fx = -Math.sin(h), fz = -Math.cos(h), sg = v >= 0 ? 1 : -1, nx = x + fx * sg * (S.len + 0.6), nz = z + fz * sg * (S.len + 0.6), P = camera.position;
if (garOnStairs(nx, nz) && !garOnStairs(P.x, P.z)) {
var G = garNearest(P.x, P.z);
driveNote("No cars on the stairs. Take the car lift at the Ring Garage" + (G ? " beside the Grand Stair, to your " + (((G.a - Math.atan2(P.z - ATLC.z, P.x - ATLC.x)) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI > 0 ? "right" : "left") + " along the rim" : "") + ".", 3);
return true;
}
}
}
catch (e) { }
return db.apply(this, arguments);
};
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (ATLC && !(typeof INT !== "undefined" && INT))
for (var id in GAR.built) {
var S = GAR.built[id].sol || [];
for (var i = 0; i < S.length; i++) {
var w = S[i], dx = x - w.x, dz = z - w.z;
if (Math.abs(dx) > w.hw + w.hd + 1 || Math.abs(dz) > w.hw + w.hd + 1)
continue;
if (feet > w.b + w.h || feet < w.b - 2)
continue;
var c = Math.cos(-w.rot), sn = Math.sin(-w.rot), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
if (Math.abs(lx) < w.hw + 0.35 && Math.abs(lz) < w.hd + 0.35)
return true;
}
}
return ba.apply(this, arguments);
};
}
if (typeof vehicleTakeWheel === "function") {
var tw = vehicleTakeWheel;
vehicleTakeWheel = function (o) {
if (o && o.garaged && o.garaged !== garMe()) {
var k = o.id, n = GAR.tried[k] = (GAR.tried[k] && Date.now() - GAR.tried[k].at < 20000 ? GAR.tried[k].n : 0) + 1;
GAR.tried[k] = { n: n, at: Date.now() };
setStatus("<b>Garage guard:</b> “That car belongs to another dreamer. It stays in its bay.”");
if (n >= 2 && typeof reportCrime === "function")
reportCrime("car_theft", "Tried to take another dreamer's car from a Ring Garage");
return false;
}
return tw.apply(this, arguments);
};
}
if (typeof vehicleLeave === "function") {
var vl = vehicleLeave;
vehicleLeave = function () {
var D = DRIVE, o = D && D.spec, P = camera.position, inBay = null;
if (o && D.mode === "road" && ATLC)
for (var id in GAR.built) {
var G = GAR.built[id].G, u = garXZ(G.a, G.ru - 11);
if (Math.hypot(P.x - u.x, P.z - u.z) < 8) {
inBay = G;
break;
}
}
var r = vl.apply(this, arguments);
if (inBay && o) {
o.home = { x: o.x, z: o.z, rot: o.rot };
o.garaged = garMe();
setStatus("<b>Parked at the " + esc(inBay.name) + ".</b> The guards watch it day and night; only you can drive it away.");
}
return r;
};
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
garTick(dt);
}
catch (e) { } };
}
})();
