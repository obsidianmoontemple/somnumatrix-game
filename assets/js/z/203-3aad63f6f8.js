/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(203, function () {
"use strict";
return [
function () {
var c = document.createElement("canvas");
c.width = 1024;
c.height = 640;
var x = c.getContext("2d");
x.fillStyle = "#5E5F62";
x.fillRect(0, 0, 1024, 640);
for (var i = 0; i < 2600; i++) {
var v = 80 + Math.floor(Math.random() * 30);
x.fillStyle = "rgba(" + v + "," + v + "," + (v + 2) + ",0.35)";
x.fillRect(Math.random() * 1024, Math.random() * 640, 2 + Math.random() * 3, 2 + Math.random() * 3);
}
x.strokeStyle = "rgba(40,40,44,.55)";
x.lineWidth = 2;
for (var gx = 0; gx < 1024; gx += 64) {
x.beginPath();
x.moveTo(gx, 0);
x.lineTo(gx, 640);
x.stroke();
}
var s = 1024 / 96;
x.strokeStyle = "#ECE8DA";
x.lineWidth = 4;
for (var bx = -42; bx <= 42; bx += 3) {
[[-30, -9], [9, 30]].forEach(function (r) { x.beginPath(); x.moveTo((bx + 48) * s, (r[0] + 30) * s / 1.0 * (640 / (60 * s))); x.lineTo((bx + 48) * s, (r[1] + 30) * s * (640 / (60 * s))); x.stroke(); });
}
x.beginPath();
x.moveTo(0, 21 * 640 / 60);
x.lineTo(1024, 21 * 640 / 60);
x.stroke();
x.beginPath();
x.moveTo(0, 39 * 640 / 60);
x.lineTo(1024, 39 * 640 / 60);
x.stroke();
x.strokeStyle = "#E8C24A";
x.setLineDash([24, 18]);
x.beginPath();
x.moveTo(0, 320);
x.lineTo(1024, 320);
x.stroke();
x.setLineDash([]);
x.fillStyle = "#ECE8DA";
[[200, 270, 1], [620, 270, 1], [400, 370, -1], [820, 370, -1]].forEach(function (a) { x.beginPath(); x.moveTo(a[0] + a[2] * 30, a[1]); x.lineTo(a[0] - a[2] * 10, a[1] - 14); x.lineTo(a[0] - a[2] * 10, a[1] + 14); x.closePath(); x.fill(); x.fillRect(a[0] - a[2] * 40 - (a[2] < 0 ? 0 : 0), a[1] - 5, a[2] * 30, 10); });
var T = new THREE.CanvasTexture(c);
return T;
},
function () {
if (TG.g)
return TG.g;
tgOrigin();
var g = new THREE.Group(), L = TG.L, W = TG.W, H = TG.H;
g.position.set(TG.cx, 0, TG.cz);
scene.add(g);
TG.g = g;
var conc = tgMat(0x8A8B8E), wallM = tgMat(0xB9B6AE), stripe = tgMat(0xE8C24A), dark = tgMat(0x3A3B3F);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(L, W), new THREE.MeshLambertMaterial({ map: tgFloorTex() }));
fl.rotation.x = -Math.PI / 2;
fl.receiveShadow = true;
g.add(fl);
var ce = new THREE.Mesh(new THREE.PlaneGeometry(L, W), tgMat(0x6E6F72));
ce.rotation.x = Math.PI / 2;
ce.position.y = H;
g.add(ce);
[[0, -W / 2, L, 0.4], [0, W / 2, L, 0.4], [-L / 2, 0, 0.4, W], [L / 2, 0, 0.4, W]].forEach(function (q) { tgBox(g, q[2], H, q[3], wallM, q[0], H / 2, q[1]); tgBox(g, q[2] + 0.02, 0.5, q[3] + 0.02, stripe, q[0], 0.25, q[1]); });
TG.solids = [{ x: 0, z: -W / 2, hw: L / 2, hd: 0.6 }, { x: 0, z: W / 2, hw: L / 2, hd: 0.6 }, { x: -L / 2, z: 0, hw: 0.6, hd: W / 2 }, { x: L / 2, z: 0, hw: 0.6, hd: W / 2 }];
for (var px = -36; px <= 36; px += 12)
[-10.5, 10.5].forEach(function (pz) { tgBox(g, 0.9, H, 0.9, conc, px, H / 2, pz); tgBox(g, 0.92, 0.6, 0.92, stripe, px, 0.3, pz); TG.solids.push({ x: px, z: pz, hw: 0.45, hd: 0.45 }); });
var lampM = new THREE.MeshBasicMaterial({ color: 0xF4F2E8 });
for (var lx = -42; lx <= 42; lx += 7)
[-19, 0, 19].forEach(function (lz) { tgBox(g, 2.6, 0.08, 0.3, lampM, lx, H - 0.06, lz); });
[-6, 6].forEach(function (pz) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, L - 1, 8), tgMat(0x9AA0A6)); p.rotation.z = Math.PI / 2; p.position.set(0, H - 0.35, pz); g.add(p); });
tgSign(g, ["B1 · Tower Garage", "Somnucor Tower"], 8, 1.7, 0, 2.6, -W / 2 + 0.25, 0);
tgSign(g, ["B1 · Tower Garage", "Somnucor Tower"], 8, 1.7, 0, 2.6, W / 2 - 0.25, Math.PI);
var up = new THREE.Group();
up.position.set(-L / 2 + 0.3, 0, 0);
up.rotation.y = Math.PI / 2;
g.add(up);
tgBox(up, 9, H, 0.3, new THREE.MeshBasicMaterial({ color: 0x0A0B0E }), 0, H / 2, 0.2);
var ur = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 9), tgMat(0x48494D));
ur.rotation.x = -Math.PI / 2 - 0.14;
ur.position.set(0, 0.4, 4.5);
up.add(ur);
tgSign(up, ["⇧  Out to the Plaza", "Exit · the Tower gatehouse"], 7, 1.4, 0, H - 0.9, 0.5, 0);
var tu = new THREE.Group();
tu.position.set(L / 2 - 0.3, 0, 0);
tu.rotation.y = -Math.PI / 2;
g.add(tu);
tgBox(tu, 9, H, 0.3, new THREE.MeshBasicMaterial({ color: 0x0A0B0E }), 0, H / 2, 0.2);
for (var k = 0; k < 4; k++)
tgBox(tu, 8.4, 0.12, 0.4, new THREE.MeshBasicMaterial({ color: 0xFFE6B0 }), 0, H - 0.3, -0.6 - k * 0.01);
tgSign(tu, ["Tunnel ⇨ Ring Garage", "The Civic Ring, and the lifts round the city"], 7.4, 1.4, 0, H - 0.9, 0.5, 0);
var lf = new THREE.Group();
lf.position.set(-6, 0, -W / 2 + 0.25);
g.add(lf);
[-2.2, 2.2].forEach(function (dx) {
tgBox(lf, 2.6, 3, 0.25, tgMat(0x2A2C32), dx, 1.5, 0);
tgBox(lf, 1.2, 2.6, 0.08, tgMat(0xB8BCC4, {}), dx - 0.62, 1.32, 0.15);
tgBox(lf, 1.2, 2.6, 0.08, tgMat(0xB8BCC4), dx + 0.62, 1.32, 0.15);
tgBox(lf, 0.5, 0.25, 0.06, new THREE.MeshBasicMaterial({ color: 0xFFD27A }), dx, 3.2, 0.16);
});
tgSign(lf, ["Lifts to the Tower lobby"], 5.4, 0.9, 0, 3.65 - 0.4, 0.3, 0);
TG.lift = { x: TG.cx - 6, z: TG.cz - W / 2 + 2.2 };
var bo = new THREE.Group();
bo.position.set(-L / 2 + 13, 0, -7.2);
g.add(bo);
tgBox(bo, 2.6, 2.4, 2.2, tgMat(0xE6E1D2), 0, 1.2, 0);
tgBox(bo, 2.7, 0.15, 2.3, tgMat(0x2E5E8A), 0, 2.45, 0);
tgBox(bo, 2.62, 0.9, 1.6, new THREE.MeshLambertMaterial({ color: 0x9FC6E0, transparent: true, opacity: 0.55 }), 0, 1.65, 0.32);
tgBox(bo, 0.2, 1, 0.2, stripe, 1.5, 0.5, 1.6);
var arm = tgBox(bo, 4.6, 0.12, 0.12, tgMat(0xD8302A), 3.8, 1, 1.6);
TG.arm = arm;
TG.solids.push({ x: -L / 2 + 13, z: -7.2, hw: 1.4, hd: 1.2 });
tgSign(bo, ["Attendant"], 2, 0.45, 0, 2.75, 1.12, 0, "#2E5E8A");
try {
var at = garGuard("tg_attendant", "Parking attendant");
at.position.set(-L / 2 + 13, 0, -7.6);
at.rotation.y = Math.PI / 2;
g.add(at);
var gd = garGuard("tg_guard", "Garage guard");
gd.position.set(-L / 2 + 20, 0, 8.4);
gd.rotation.y = -Math.PI / 2;
g.add(gd);
var gd2 = garGuard("tg_guard2", "Garage guard");
gd2.position.set(L / 2 - 10, 0, -8.4);
gd2.rotation.y = Math.PI / 2;
g.add(gd2);
TG.staff = [at, gd, gd2];
}
catch (e) { }
try {
for (var i = 0; i < TG_STOCK.length; i++) {
var bxp = -30 + i * 7.5 + (i % 2) * 1.5, row = i % 3 === 1 ? 1 : -1, bz = row * 20.5;
if (row < 0 && Math.abs(bxp - TGL_BAY.x) < 5)
continue;
var c = build({ id: "tg_car_" + i, archetype: TG_STOCK[i], attrs: {}, solid: false, detail: 3, nights: [], city: true });
if (typeof modelDress === "function")
modelDress(c, { id: "tg_car_" + i, archetype: TG_STOCK[i], attrs: {}, solid: true, placed: true, city: true });
c.position.set(bxp, 0, bz);
c.rotation.y = row > 0 ? Math.PI : 0;
c.traverse(function (m) { m.raycast = function () { }; });
g.add(c);
TG.solids.push({ x: bxp, z: bz, hw: 1.1, hd: 2.4 });
}
}
catch (e) {
if (window.console)
console.warn("[tower garage] cars", e);
}
tgSign(g, ["Reserved", "The Keeper"], 3.4, 1.2, TGL_BAY.x, 1.9, -W / 2 + 0.3, 0, "#3A1E4A");
var bay = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 8), new THREE.MeshBasicMaterial({ color: 0x5A3A6E, transparent: true, opacity: 0.35, depthWrite: false }));
bay.rotation.x = -Math.PI / 2;
bay.position.set(TGL_BAY.x, 0.02, TGL_BAY.z);
g.add(bay);
g.visible = false;
return g;
},
function (text, then) {
if (typeof garFade === "function") {
garFade(true);
if (GAR.fade)
GAR.fade.textContent = text || "";
}
TG.busy = true;
setTimeout(function () { try {
then();
}
catch (e) {
if (window.console)
console.warn("[tower garage]", e);
} if (typeof garFade === "function")
garFade(false); setTimeout(function () { TG.busy = false; }, 700); }, 1300);
},
function () {
tgBuild();
TG.on = true;
TG.g.visible = true;
tglShowParked();
tgPut(TG.cx - TG.L / 2 + 14, TG.cz - 4.5, 0, -Math.PI / 2);
setStatus("<b>The Tower Garage, level B1.</b> Park in any bay. The lifts up to the Tower are on the north wall; the tunnel to the Ring Garage is at the far end; the way out is the ramp behind you.");
},
function () {
var T = tgTunnelEnd();
if (!T)
return;
TG.on = false;
if (TG.g)
TG.g.visible = false;
var x = ATLC.x + Math.cos(T.a) * (T.R.rl + 9), z = ATLC.z + Math.sin(T.a) * (T.R.rl + 9);
tgPut(x, z, terrainY(x, z), Math.atan2(-Math.cos(T.a), -Math.sin(T.a)) + Math.PI);
setStatus("<b>" + esc(T.R.name.replace(/,.*/, "")) + ", the Civic Ring.</b> Out of the tunnel from the Tower Garage. The lift up to the Plaza is just here; the Tower Garage is back through the tunnel.");
},
function () {
var g = build({ id: "__keeper_limo", archetype: "limousine", attrs: {}, solid: false, detail: 4, nights: [], city: true });
if (typeof modelDress === "function")
try {
modelDress(g, { id: "__keeper_limo", archetype: "limousine", attrs: {}, solid: true, placed: true, city: true });
}
catch (e) { }
tglFinish(g);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (g) {
g.traverse(function (n) {
if (n.userData.tglS)
return;
var b = n.name === "body", w = /^wheel/.test(n.name);
if (!b && !w)
return;
var m = n.parent;
while (m && m !== g && m.name !== "model")
m = m.parent;
if (!m || m === g || !m.scale.z)
return;
n.traverse(function (c) { c.userData.tglS = 1; });
if (b)
n.scale.z *= 1.45;
else {
n.position.z *= 1.45;
n.scale.z = m.scale.x / m.scale.z;
}
});
},
function (g) {
g.traverse(function (m) {
if (!m.isMesh || !m.material || m.userData.tglP)
return;
m.userData.tglP = 1;
var conv = function (x) {
if (!x || !x.color)
return x;
var y = x.clone(), h = {};
y.color.getHSL(h);
if (x.map) {
if (typeof nlGreyTex === "function")
y.map = nlGreyTex(x.map);
y.color.setHex(0x2C2C34);
if (y.shininess !== undefined)
y.shininess = 80;
if (y.roughness !== undefined) {
y.roughness = 0.3;
y.metalness = 0.45;
}
return y;
}
if (x.transparent || h.l > 0.75 && h.s < 0.2)
return y;
if (h.s < 0.25 && h.l > 0.45)
y.color.setHex(0xC8CCD2);
else if (h.l < 0.12)
y.color.setHex(0x0E0E12);
else
y.color.setHex(0x101014);
if (y.shininess !== undefined)
y.shininess = 80;
if (y.roughness !== undefined) {
y.roughness = 0.25;
y.metalness = 0.5;
}
return y;
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
});
},
function () {
var L = typeof randomLook === "function" ? randomLook("tgl_chauffeur", "human") : blankLook("human");
if (typeof jobDress === "function")
jobDress(L, "Chauffeur", "The Somnucor Tower");
L.top = 0x15161C;
L.bottom = 0x15161C;
L.hat = "cap";
L.hatColor = 0x15161C;
var fg = buildFigure({ id: "tgl_chauffeur", archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
fg.traverse(function (m) { m.raycast = function () { }; });
return fg;
},
function (x, z, rot, where) {
tglEnsure();
TGL.x = x;
TGL.z = z;
TGL.rot = rot;
TGL.where = where;
var y = where === "garage" ? 0 : terrainY(x, z);
TGL.g.position.set(x, y, z);
TGL.g.rotation.y = rot;
TGL.g.visible = true;
TGL.parked = true;
var sx = Math.cos(rot), sz = -Math.sin(rot);
TGL.driver.position.set(x + sx * 1.7 + Math.sin(rot) * 0.9, y, z - sz * -1.7 + Math.cos(rot) * 0.9);
TGL.driver.rotation.y = rot + Math.PI / 2;
TGL.driver.visible = true;
},
function () {
var L = [{ k: "tower", name: "The Somnucor Tower" }, { k: "garage", name: "The Tower Garage" }];
(ATL_RINGS || []).forEach(function (R) { if (R.k !== "plaza")
L.push({ k: "ring:" + R.k, name: R.name }); });
Object.keys(store.workplaceAt || {}).sort(function (a, b) { return a.replace(/^the /i, "").localeCompare(b.replace(/^the /i, "")); }).forEach(function (k) { L.push({ k: "wp:" + k, name: k }); });
return L;
},
function (k) {
if (k === "garage")
return { garage: true, name: "The Tower Garage" };
if (k === "tower") {
var tw = tgTowerSpec();
var D = tw && typeof doorWorld === "function" ? doorWorld(tw) : null;
if (D && D.out)
return { x: D.x + D.out.x * 14, z: D.z + D.out.z * 14, name: "The Somnucor Tower" };
return null;
}
if (k.indexOf("ring:") === 0) {
var R = atlRing(k.slice(5));
if (!R)
return null;
var st = ATL_STREETS[R.k], rr = st ? st[0] + 2.6 : (R.S + R.E) / 2, a = (ATL_STAIRS[0] ? ATL_STAIRS[0].a : 0.19) + 0.12;
return { x: ATLC.x + Math.cos(a) * rr, z: ATLC.z + Math.sin(a) * rr, name: R.name };
}
if (k.indexOf("wp:") === 0) {
var key = k.slice(3), sp = typeof ktSpecFor === "function" ? ktSpecFor(key) : null;
if (!sp)
return null;
var D2 = null;
try {
D2 = typeof doorWorld === "function" ? doorWorld(sp) : null;
}
catch (e) { }
if (D2 && D2.out)
return { x: D2.x + D2.out.x * 8, z: D2.z + D2.out.z * 8, name: key };
return { x: sp.x + 8, z: sp.z + 8, name: key };
}
return null;
},
function (i, A, B, out) {
var R = ATL_RINGS[i], st = ATL_STREETS[R.k];
if (!st) {
out.push({ x: B.x, z: B.z });
return;
}
var pa = tglPolar(A.x, A.z), pb = tglPolar(B.x, B.z), rs = st[0];
if (st.length > 1) {
var mid = (pa.r + pb.r) / 2;
st.forEach(function (s) { if (Math.abs(s - mid) < Math.abs(rs - mid))
rs = s; });
}
var d = Math.atan2(Math.sin(pb.a - pa.a), Math.cos(pb.a - pa.a)), dir = d >= 0 ? 1 : -1, lane = rs + ROAD_SIDE * dir * 2.6;
if (Math.abs(d) * lane < 30) {
out.push({ x: B.x, z: B.z });
return;
}
out.push(tglXZ(pa.a, lane));
var steps = Math.max(1, Math.ceil(Math.abs(d) * lane / 22));
for (var k = 1; k <= steps; k++)
out.push(tglXZ(pa.a + d * k / steps, lane));
out.push({ x: B.x, z: B.z });
},
function (from, to) {
var W = [], i = tglRingIdx(from.x, from.z), j = tglRingIdx(to.x, to.z), cur = { x: from.x, z: from.z };
while (i !== j) {
var up = j < i, gi = up ? i - 1 : i;
var gs = garList().filter(function (g) { return g.i === gi; }), pc = tglPolar(cur.x, cur.z), best = null, bd = 1e9;
gs.forEach(function (g) { var dd = Math.abs(Math.atan2(Math.sin(g.a - pc.a), Math.cos(g.a - pc.a))); if (dd < bd) {
bd = dd;
best = g;
} });
if (!best)
break;
var fromP = up ? tglXZ(best.a, best.rl) : tglXZ(best.a, best.ru), toP = up ? tglXZ(best.a, best.ru) : tglXZ(best.a, best.rl);
tglLeg(i, cur, fromP, W);
W.push({ lift: true, to: toP, a: best.a, ring: ATL_RINGS[up ? i - 1 : i + 1].name, outward: !up });
cur = toP;
i = up ? i - 1 : i + 1;
}
tglLeg(i, cur, to, W);
return W;
},
function (early) {
var A = TGL.auto;
if (!A)
return;
TGL.auto = null;
var P = camera.position, h = typeof DRIVE !== "undefined" ? DRIVE.h : 0, cx = P.x, cz = P.z;
if (typeof DRIVE !== "undefined" && DRIVE.on) {
vehicleLeave();
}
if (A.taxi) {
if (typeof txiArrive === "function")
txiArrive(A, early, cx, cz, h);
return;
}
if (TGL.driver && TGL.driver.parent !== scene) {
scene.add(TGL.driver);
TGL.driver.userData.pose = null;
TGL.driver.userData.seated = false;
}
tgBuild();
if (A.toGarage && !early && TG.on)
tglPlace(TG.cx + TGL_BAY.x, TG.cz + TGL_BAY.z, Math.PI, "garage");
else
tglPlace(cx, cz, h - Math.PI, TG.on && tgIn(cx, cz) ? "garage" : "out");
setStatus(early ? "<b>You step out.</b> The chauffeur waits with the car. Press E beside it to go on." : "<b>" + esc(A.name || "You are there") + ".</b> The chauffeur opens the door. The car waits here; press E beside it, or call it from the car button.");
},
function (k) {
var T = tglTarget(k);
if (!T) {
setStatus("That place is not in the city yet.");
return;
}
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
tglEnsure();
var P = camera.position, inGarage = TG.on && tgIn(P.x, P.z);
var o = { id: "__keeper_limo", archetype: "limousine", attrs: {}, x: TGL.x, z: TGL.z, rot: TGL.rot };
var route = [], start = { x: TGL.x, z: TGL.z };
if (T.garage && inGarage) {
setStatus("You are in the Tower Garage already.");
return;
}
if (inGarage) {
route.push({ x: TG.cx - TG.L / 2 + 12, z: TG.cz - 4.5 });
route.push({ x: TG.cx - TG.L / 2 + 3, z: TG.cz - 4.5, exitUp: true });
var G = tgGate();
start = { x: G.x + G.ox * 10, z: G.z + G.oz * 10 };
}
var dest = T.garage ? (function () { var G = tgGate(); return { x: G.x + G.ox * 16, z: G.z + G.oz * 16 }; })() : T;
route = route.concat(tglRoute(start, dest));
if (T.garage) {
var G2 = tgGate();
route.push({ x: G2.x + G2.ox * 1, z: G2.z + G2.oz * 1, gate: true });
}
TGL.route = route;
TGL.wi = 0;
TGL.chk = null;
var W0 = route[0];
if (W0 && W0.x !== undefined) {
var want = Math.atan2(-(W0.x - o.x), -(W0.z - o.z)), h0 = (o.rot || 0) + Math.PI;
if (Math.abs(Math.atan2(Math.sin(want - h0), Math.cos(want - h0))) > 1.0)
o.rot = want - Math.PI;
}
TGL.g.visible = false;
TGL.parked = false;
if (TGL.driver)
TGL.driver.visible = false;
P.x = o.x;
P.z = o.z;
vehicleTakeWheel(o);
if (typeof DRIVE !== "undefined") {
DRIVE.view = "chase";
DRIVE.cam = null;
}
TGL.auto = { k: k, name: T.name, toGarage: !!T.garage };
setStatus("<b>The chauffeur drives you to " + esc(T.name) + ".</b> Sit back. Press Q to get out on the way.");
tglOpen(false);
},
function () {
if (!tglKeeper())
return;
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
if (typeof DRIVE !== "undefined" && DRIVE.on) {
setStatus("Get out of what you are driving first.");
return;
}
tglEnsure();
var P = camera.position, h = typeof yaw !== "undefined" ? yaw : 0;
var spot = null;
[[3.5, 0], [-3.5, 0], [3.5, 4], [-3.5, 4], [0, 6], [5, -3], [-5, -3]].some(function (q) {
var fx = -Math.sin(h), fz = -Math.cos(h), lx = -fz, lz = fx, x = P.x + lx * q[0] + fx * q[1], z = P.z + lz * q[0] + fz * q[1];
if (!blockedAt(x, z, (TG.on ? 0 : terrainY(x, z))) && !blockedAt(x + fx * 3, z + fz * 3, (TG.on ? 0 : terrainY(x, z))) && !blockedAt(x - fx * 3, z - fz * 3, (TG.on ? 0 : terrainY(x, z)))) {
spot = { x: x, z: z };
return true;
}
return false;
});
if (!spot) {
setStatus("<b>No room for the car here.</b> Step out into the street and call again.");
return;
}
var rot = h;
var fx2 = -Math.sin(h), fz2 = -Math.cos(h);
TGL.coming = { t: 0, t0: performance.now(), dur: 3.2, from: { x: spot.x - fx2 * 24, z: spot.z - fz2 * 24 }, to: spot, rot: rot };
tglPlace(TGL.coming.from.x, TGL.coming.from.z, rot, TG.on ? "garage" : "out");
if (TGL.driver)
TGL.driver.visible = false;
setStatus("<b>Your limousine is coming.</b>");
tglOpen(false);
},
function (on) {
if (!TGL.box)
tglButton();
if (!TGL.box)
return;
if (!on) {
TGL.box.style.display = "none";
return;
}
var P = camera.position, here = TGL.parked && TGL.g && TGL.g.visible && Math.hypot(P.x - TGL.x, P.z - TGL.z) < 8;
var opts = tglPlaces().map(function (p) { return "<option value='" + esc(p.k) + "'>" + esc(p.name) + "</option>"; }).join("");
TGL.box.innerHTML = "<div style='display:flex;justify-content:space-between'><h3>🚘 Your limousine</h3><span data-t='x' style='cursor:pointer'>✕</span></div>" +
"<div class='s'>" + (TGL.auto ? "On the way to " + esc(TGL.auto.name) + "." : here ? "The car is here, the chauffeur at the door." : TGL.where === "garage" ? "Waiting in your bay in the Tower Garage." : "Waiting where you left it.") + "</div>" +
(TGL.auto ? "<button data-t='stop'>Stop and let me out</button>" :
(here ? "<select data-t='to'>" + opts + "</select><button data-t='go'>Drive me there</button>" : "<button data-t='call'>Call the car to me</button>") +
"<button class='b2' data-t='home'>Send it back to the garage</button>");
TGL.box.style.display = "block";
TGL.box.querySelectorAll("[data-t]").forEach(function (el) {
if (el.tagName === "SELECT")
return;
el.onclick = function (ev) {
ev.stopPropagation();
var t = el.getAttribute("data-t");
if (t === "x")
tglOpen(false);
if (t === "call")
tglCall();
if (t === "home")
tglHome();
if (t === "stop" && typeof vehicleLeave === "function")
vehicleLeave();
if (t === "go") {
var s = TGL.box.querySelector("[data-t='to']");
if (s)
tglGo(s.value);
}
};
});
}
];
});
