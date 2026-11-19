/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var VCP = { kind: null, g: null, built: {}, reg: {}, seat: false, hidRide: false, paintAt: 0, t: 0, bodyCol: null, lastArch: null, warned: false };
var VCP_NEAR = 0.3;
function vcpLite() { return typeof LITE !== "undefined" && !!LITE; }
function vcpVR() { try {
return !!(typeof VRM !== "undefined" && VRM.xr);
}
catch (e) {
return false;
} }
function vcpMat(color, o) { return __ZC(343, 0, this, arguments, new.target); }
function vcpGlow(color, op) { var m = new THREE.MeshBasicMaterial({ color: color }); if (op != null) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} return m; }
var VCP_GRAIN = {};
function vcpGrain(kind) { return __ZC(343, 1, this, arguments, new.target); }
function vcpBox(g, w, h, d, mat, x, y, z, rx, ry, rz) {
var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
m.position.set(x || 0, y || 0, z || 0);
if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
g.add(m);
return m;
}
function vcpCyl(g, r1, r2, h, mat, x, y, z, rx, ry, rz, seg) {
var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg || (vcpLite() ? 10 : 18)), mat);
m.position.set(x || 0, y || 0, z || 0);
if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0);
g.add(m);
return m;
}
function vcpRR(w, h, r) { return __ZC(343, 2, this, arguments, new.target); }
function vcpSlab(g, w, h, d, r, mat, x, y, z, rx, ry, rz) { return __ZC(343, 3, this, arguments, new.target); }
function vcpBall(g, r, mat, x, y, z, sx, sy, sz) { var lite = vcpLite(), m = new THREE.Mesh(new THREE.SphereGeometry(r, lite ? 8 : 16, lite ? 6 : 12), mat); m.position.set(x || 0, y || 0, z || 0); m.scale.set(sx || 1, sy || 1, sz || 1); g.add(m); return m; }
var VCP_UP = new THREE.Vector3(0, 1, 0);
function vcpBeam(g, a, b, w, d, mat, round) { return __ZC(343, 4, this, arguments, new.target); }
function vcpQuad(g, p, mat) { return __ZC(343, 5, this, arguments, new.target); }
function vcpProfile(g, pts, x0, x1, mat) { return __ZC(343, 6, this, arguments, new.target); }
function vcpCanvas(w, h) {
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var t = new THREE.CanvasTexture(c);
t.encoding = THREE.sRGBEncoding;
t.anisotropy = 4;
return { c: c, x: c.getContext("2d"), t: t };
}
function vcpFace(g, cv, w, h, x, y, z, rx, ry) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: cv.t, toneMapped: false }));
m.position.set(x, y, z);
m.rotation.set(rx || 0, ry || 0, 0);
m.rotation.order = "YXZ";
g.add(m);
return m;
}
function vcpKindOf(arch) { return __ZC(343, 7, this, arguments, new.target); }
function vcpNow() {
try {
if (typeof UGD !== "undefined" && UGD.on && typeof UG2 !== "undefined" && UG2.ride && UG2.ride.cab)
return { kind: "train", h: UGD.d === 0 ? -Math.PI / 2 : Math.PI / 2, roll: 0, pitch: 0, read: vcpReadTrain };
if (typeof MM !== "undefined" && MM && MM.ride && MM.ride.d) {
var k = "mm:" + MM.ride.d.k;
if (VCP.reg[k] || VCP.reg["mm:*"] || VCP_BUILD["mm:*"])
return { kind: VCP.reg[k] ? k : "mm:*", h: (MM.ride.I && MM.ride.I.yaw != null) ? MM.ride.I.yaw : yaw, roll: 0, pitch: 0, read: vcpReadMM };
}
if (typeof BW !== "undefined" && BW && BW.ride && BW.ride.T) {
var b = "bw:" + (BW.ride.type || BW.ride.T.name);
if (VCP.reg[b] || VCP.reg["bw:*"] || VCP_BUILD["bw:*"])
return { kind: VCP.reg[b] ? b : "bw:*", h: BW.ride.yaw != null ? BW.ride.yaw : yaw, roll: 0, pitch: 0, read: vcpReadBW };
}
if (typeof STC !== "undefined" && STC && STC.ride && STC.truck && typeof WLD !== "undefined" && WLD.on === STC.key && VCP_BUILD.chase)
return { kind: "chase", h: STC.truck.rotation.y + Math.PI, roll: 0, pitch: 0, read: vcpReadChase, hide: STC.truck };
var D = typeof DRIVE !== "undefined" ? DRIVE : null;
if (D && D.on && walkMode && !store.inside) {
var kind = vcpKindOf(D.arch);
if (!kind)
return null;
return { kind: kind, h: D.h, roll: D.mode === "fly" ? D.roll : 0, pitch: D.mode === "fly" ? D.pitch : 0, read: vcpReadDrive };
}
}
catch (e) {
if (!VCP.warned) {
VCP.warned = true;
console.warn("cockpit", e);
}
}
return null;
}
function vcpReadDrive() { return __ZC(343, 8, this, arguments, new.target); }
function vcpReadTrain() { return __ZC(343, 9, this, arguments, new.target); }
var VCP_MV = {};
function vcpMoveMph(key, x, z) {
var now = performance.now(), L = VCP_MV[key];
if (!L) {
VCP_MV[key] = { x: x, z: z, t: now, v: 0 };
return 0;
}
var dt = (now - L.t) / 1000;
if (dt < 0.05)
return L.v * 2.23694;
var v = Math.hypot(x - L.x, z - L.z) / dt;
if (v > 400)
v = L.v;
L.v += (v - L.v) * Math.min(1, dt * 3);
L.x = x;
L.z = z;
L.t = now;
return L.v * 2.23694;
}
function vcpBwRadar(px, pz, h, range, out) { return __ZC(343, 10, this, arguments, new.target); }
function vcpReadMM() { return __ZC(343, 11, this, arguments, new.target); }
function vcpReadBW() { return __ZC(343, 12, this, arguments, new.target); }
function vcpRegister(kind, build, tick) { VCP.reg[kind] = { build: build, tick: tick || null }; if (VCP.built[kind]) {
vcpDropBuilt(kind);
} }
function vcpDropBuilt(kind) {
var g = VCP.built[kind];
if (!g)
return;
if (g.parent)
g.parent.remove(g);
g.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); });
delete VCP.built[kind];
if (VCP.g === g) {
VCP.g = null;
VCP.kind = null;
}
}
function vcpBodyColour() { return __ZC(343, 13, this, arguments, new.target); }
function vcpDial(x, cx, cy, r, val, max, step, label, o) { return __ZC(343, 14, this, arguments, new.target); }
function vcpRound(x, X, Y, W, H, R) { x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R); x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath(); }
function vcpArrow(x, cx, cy, dir, on, s) {
x.save();
x.translate(cx, cy);
x.scale(dir, 1);
x.fillStyle = on ? "#3EE07A" : "rgba(62,224,122,.14)";
x.beginPath();
x.moveTo(-s, 0);
x.lineTo(0, -s * 0.7);
x.lineTo(0, -s * 0.3);
x.lineTo(s * 0.8, -s * 0.3);
x.lineTo(s * 0.8, s * 0.3);
x.lineTo(0, s * 0.3);
x.lineTo(0, s * 0.7);
x.closePath();
x.fill();
x.restore();
}
var VCP_ODO = 1234.5;
function vcpPaintCluster(cv, R, style) { return __ZC(343, 15, this, arguments, new.target); }
function vcpPaintScreen(cv, R, style) { return __ZC(343, 16, this, arguments, new.target); }
function vcpPaintBrass(cv, R, labels) { return __ZC(343, 17, this, arguments, new.target); }
function vcpPaintFlight(cv, R, style) { return __ZC(343, 18, this, arguments, new.target); }
var VCP_CAR = {
car: {},
coupe: { ws: { bf: 0.88, by: -0.24, tf: 0.56, ty: 0.26 } },
sport: { ws: { bf: 0.92, by: -0.22, tf: 0.62, ty: 0.2 }, dash: 0x15161A, carbon: true, accent: 0xD3242C, wheelR: 0.17, face: "#0B0B0D", needle: "#FF2D2D", hood: { f0: 1.0, f1: 2.4, y0: -0.24, y1: -0.36 } },
race: { ws: { bf: 0.92, by: -0.22, tf: 0.62, ty: 0.2 }, dash: 0x111215, carbon: true, accent: 0xFF7A1A, wheelR: 0.16, face: "#0B0B0D", needle: "#FFB020", hood: { f0: 1.0, f1: 2.5, y0: -0.24, y1: -0.4 } },
limo: { dash: 0x2B1E16, wood: 0x6B3E22, seat: 0xD9CBB0, trim: 0x8C6A48, hood: { f0: 0.95, f1: 2.6, y0: -0.25, y1: -0.33 } },
cab: { meter: true, trim: 0x2C2F36 },
vintage: { open: true, wood: 0x7A4A26, dash: 0x5A3A20, brass: true, wheelR: 0.22, spokes: 4, ws: { bf: 0.8, by: -0.2, tf: 0.74, ty: 0.12 }, hood: { f0: 0.85, f1: 2.2, y0: -0.22, y1: -0.3, hw: 0.5 } },
roadster: { open: true, ws: { bf: 0.86, by: -0.22, tf: 0.62, ty: 0.1 }, accent: 0xB8892E },
hover: { dash: 0x10141C, glow: 0x3FD6FF, yoke: true, ws: { bf: 0.95, by: -0.22, tf: 0.5, ty: 0.3 } },
van: { ws: { bf: 0.8, by: -0.25, tf: 0.66, ty: 0.33 }, hood: { f0: 0.85, f1: 1.45, y0: -0.27, y1: -0.38 } },
truck: { off: 0.58, hw: 1.15, big: true, lift: 0.03, cTop: -0.29, ws: { bf: 0.92, by: -0.36, tf: 0.84, ty: 0.42 }, wheelR: 0.23, tilt: 1.0, wheel: [0, -0.41, -0.6], hood: null, dash: 0x2A2C30 },
bus: { off: 0.85, hw: 1.25, big: true, lift: 0.03, cTop: -0.3, ws: { bf: 0.98, by: -0.5, tf: 0.94, ty: 0.48 }, wheelR: 0.25, tilt: 1.05, wheel: [0, -0.42, -0.62], hood: null, dash: 0x30333A, fare: true },
omnibus: { off: 0.6, hw: 1.0, open: true, brass: true, wood: 0x6A4022, ws: { bf: 0.9, by: -0.3, tf: 0.88, ty: 0.0 }, wheelR: 0.24, tilt: 1.0, wheel: [0, -0.48, -0.42], hood: null, dash: 0x4A2E18 },
chase: { off: 0.42, hw: 0.94, ws: { bf: 0.98, by: -0.3, tf: 0.62, ty: 0.3 }, dash: 0x2A2C30, trim: 0x3B3E44, seat: 0x4A4540, door: 0x2E3034, door2: 0x4F4A44, head: 0x5C5A56,
wheelR: 0.2, tilt: 0.5, wheel: [0, -0.45, -0.44], hood: { f0: 1.05, f1: 2.55, y0: -0.31, y1: -0.35, crown: 0.02, hw: 0.9 }, lift: 0.04, inlay: 0x5A5E64, paint: 0xE8E6E0, chase: true },
tractor: { off: 0, hw: 0.6, open: true, rops: true, cluster: "pod", ws: null, wheelR: 0.2, tilt: 0.9, wheel: [0, -0.45, -0.42], dash: 0x2D6B2F, hood: { f0: 0.55, f1: 2.1, y0: -0.32, y1: -0.4, hw: 0.32, box: true, crown: 0.04 } }
};
function vcpBuildCar(style) { return __ZC(343, 19, this, arguments, new.target); }
function vcpBuildMoto(style) { return __ZC(343, 20, this, arguments, new.target); }
function vcpReins(g, to, mat) { return __ZC(343, 21, this, arguments, new.target); }
function vcpBuildReins(style) { return __ZC(343, 22, this, arguments, new.target); }
function vcpBuildSaddle(style) { return __ZC(343, 23, this, arguments, new.target); }
function vcpBuildAirship() { return __ZC(343, 24, this, arguments, new.target); }
function vcpBuildSaucer() { return __ZC(343, 25, this, arguments, new.target); }
function vcpBuildSleigh() { return __ZC(343, 26, this, arguments, new.target); }
function vcpBuildChariot() { return __ZC(343, 27, this, arguments, new.target); }
function vcpBuildTram() { return __ZC(343, 28, this, arguments, new.target); }
function vcpBuildTrain() { return __ZC(343, 29, this, arguments, new.target); }
var VCP_BUILD = {
car: vcpBuildCar, coupe: vcpBuildCar, sport: vcpBuildCar, race: vcpBuildCar, limo: vcpBuildCar, cab: vcpBuildCar, vintage: vcpBuildCar, roadster: vcpBuildCar,
hover: vcpBuildCar, van: vcpBuildCar, truck: vcpBuildCar, bus: vcpBuildCar, omnibus: vcpBuildCar, tractor: vcpBuildCar,
moto: vcpBuildMoto, scooter: vcpBuildMoto, reins: vcpBuildReins, saddle: vcpBuildSaddle, airship: vcpBuildAirship, saucer: vcpBuildSaucer,
sleigh: vcpBuildSleigh, chariot: vcpBuildChariot, tram: vcpBuildTram, train: vcpBuildTrain
};
function vcpCtx() {
return { lite: vcpLite(), vr: vcpVR(), mat: vcpMat, glow: vcpGlow, box: vcpBox, cyl: vcpCyl, beam: vcpBeam, quad: vcpQuad, profile: vcpProfile,
canvas: vcpCanvas, face: vcpFace, dial: vcpDial, paintCluster: vcpPaintCluster, paintFlight: vcpPaintFlight, paintBrass: vcpPaintBrass };
}
function vcpGroupFor(kind) { return __ZC(343, 30, this, arguments, new.target); }
function vcpMergeStatic(g) { return __ZC(343, 31, this, arguments, new.target); }
function vcpSeatView(N) {
if (!N)
return false;
if (vcpVR() || N.kind === "train" || N.kind === "chase" || /^(mm|bw):/.test(N.kind))
return true;
return typeof DRIVE !== "undefined" && DRIVE.view === "cab";
}
var VCP_E = null;
function vcpFrame() {
var N = vcpNow(), seat = vcpSeatView(N), now = performance.now(), dt = Math.min(0.1, Math.max(0, (now - (VCP.t || now)) / 1000));
VCP.t = now;
if (document.body && !!seat !== VCP.seat) {
VCP.seat = !!seat;
document.body.classList.toggle("vcp-seat", VCP.seat);
}
if (!seat) {
if (VCP.g)
VCP.g.visible = false;
VCP.lastArch = null;
return null;
}
var arch = typeof DRIVE !== "undefined" && DRIVE.on ? DRIVE.arch : N.kind;
if (arch !== VCP.lastArch) {
VCP.lastArch = arch;
VCP.colN = 0;
VCP.paintAt = 0;
}
var g = vcpGroupFor(N.kind);
if (VCP.g && VCP.g !== g)
VCP.g.visible = false;
VCP.g = g;
VCP.kind = N.kind;
if (!g)
return null;
if (g.parent !== scene)
scene.add(g);
g.visible = true;
var vr = vcpVR(), touch = typeof touchRig !== "undefined" && touchRig;
g.position.copy(camera.position);
g.rotation.set(vr ? 0 : -N.pitch * 0.3, N.h, vr ? 0 : -N.roll * (touch ? 0.2 : 0.5));
var turn = typeof wrapAng === "function" ? wrapAng(N.h - (VCP.lastH == null ? N.h : VCP.lastH)) : 0;
VCP.lastH = N.h;
VCP.turnRate = (VCP.turnRate || 0) + ((dt > 0 ? turn / dt : 0) - (VCP.turnRate || 0)) * Math.min(1, dt * 5);
var U = g.userData.vcp || {}, R = null;
try {
R = N.read();
}
catch (e) {
R = { mph: 0, vmaxMph: 40, steer: 0 };
}
try {
if (U.tick)
U.tick(dt, R);
if (U.reg && U.reg.tick)
U.reg.tick(g, dt, Object.assign(vcpCtx(), { read: R }));
if (now - VCP.paintAt > (vcpLite() ? 200 : 100)) {
VCP.paintAt = now;
if (U.paint)
U.paint(R);
if ((VCP.colN || 0) < 10 && U.bodyMat) {
VCP.colN = (VCP.colN || 0) + 1;
VCP.bodyCol = vcpBodyColour();
U.bodyMat.color.setHex(VCP.bodyCol);
}
}
}
catch (e) {
if (!VCP.warned) {
VCP.warned = true;
console.warn("cockpit tick", e);
}
}
var hid = false, near = null;
if (U.hideRide && typeof rideG !== "undefined" && rideG && rideG.visible) {
rideG.visible = false;
hid = true;
}
else if (!U.hideRide && typeof rideG !== "undefined" && rideG && rideG.visible) {
near = vcpNearParts(rideG);
near.forEach(function (m) { m.visible = false; });
}
var hideObj = null;
if (N.hide && N.hide.visible) {
N.hide.visible = false;
hideObj = N.hide;
}
return { hid: hid, near: near, hideObj: hideObj };
}
function vcpNearParts(G) { return __ZC(343, 32, this, arguments, new.target); }
function vcpAfter(st) {
if (!st)
return;
if (st.hid && typeof rideG !== "undefined" && rideG)
rideG.visible = true;
if (st.near)
st.near.forEach(function (m) { m.visible = true; });
if (st.hideObj)
st.hideObj.visible = true;
}
(function () {
if (typeof renderView !== "function")
return;
var rv = renderView;
renderView = function () {
if (vcpVR())
return rv.apply(this, arguments);
var st = null;
try {
st = vcpFrame();
}
catch (e) {
if (!VCP.warned) {
VCP.warned = true;
console.warn("cockpit", e);
}
}
var n0 = camera.near;
if (st && n0 > 0.15) {
camera.near = 0.15;
camera.updateProjectionMatrix();
}
try {
return rv.apply(this, arguments);
}
finally {
if (camera.near !== n0) {
camera.near = n0;
camera.updateProjectionMatrix();
}
vcpAfter(st);
}
};
})();
(function () {
if (typeof vrmXrRender !== "function")
return;
var xr = vrmXrRender;
vrmXrRender = function () {
var st = null;
try {
st = vcpFrame();
}
catch (e) {
if (!VCP.warned) {
VCP.warned = true;
console.warn("cockpit", e);
}
}
var n0 = camera.near;
if (st)
camera.near = Math.min(n0, 0.12);
try {
return xr.apply(this, arguments);
}
finally {
camera.near = n0;
vcpAfter(st);
}
};
})();
(function () {
if (typeof DRIVE === "undefined")
return;
var v = null;
try {
v = localStorage.getItem("somnu.driveview2");
}
catch (e) { }
DRIVE.view = v === "chase" ? "chase" : "cab";
if (typeof driveToggleView === "function") {
var tv = driveToggleView;
driveToggleView = function () { var r = tv.apply(this, arguments); try {
localStorage.setItem("somnu.driveview2", DRIVE.view);
}
catch (e) { } return r; };
}
if (typeof vehicleStart === "function") {
var vs = vehicleStart;
vehicleStart = function () { var r = vs.apply(this, arguments); try {
if (r && DRIVE.view === "cab" && !vcpVR() && typeof pitch !== "undefined" && pitch > -0.06)
pitch = -0.06;
VCP.paintAt = 0;
}
catch (e) { } return r; };
}
})();
(function () {
if (typeof vrmKeepGameTurn !== "function")
return;
var kt = vrmKeepGameTurn;
vrmKeepGameTurn = function () {
var N = null;
try {
N = vcpNow();
}
catch (e) { }
if (N && typeof VRM !== "undefined" && VRM.xr) {
VRM.turn = N.h;
VRM.setYaw = null;
return;
}
return kt.apply(this, arguments);
};
})();
(function () {
var s = document.createElement("style");
s.id = "vcp-style";
s.textContent = "body.vcp-seat #dhud .dh-body,body.vcp-seat #dhud .dh-hdg{display:none!important}" +
"body.vcp-seat #dhud.open{display:flex!important;flex-wrap:wrap;align-items:center;gap:5px 12px;width:auto!important;max-width:min(760px,calc(100vw - 16px))!important;" +
"padding:6px 8px 6px 14px!important;border-radius:12px!important;background:rgba(9,11,15,.52)!important;border-color:rgba(201,190,168,.16)!important;" +
"box-shadow:0 6px 24px rgba(0,0,0,.35)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}" +
"body.vcp-seat #dhud .dh-top{margin:0!important;flex:0 1 auto;min-width:0;gap:8px!important;align-items:center!important}" +
"body.vcp-seat #dhud .dh-title{font-size:14px!important}" +
"body.vcp-seat #dhud .dh-lic{font-size:10px!important;padding:1px 7px!important}" +
"body.vcp-seat #dhud .dh-next{flex:1 1 150px;min-width:0;margin:0!important;padding:0 0 0 12px!important;border-top:0!important;border-left:1px solid rgba(201,190,168,.16);font-size:12.5px!important;min-height:0!important}" +
"body.vcp-seat #dhud .dh-notch{margin:0!important}" +
"body.vcp-seat #dhud .dh-note{flex-basis:100%;margin:0!important}" +
"body.vcp-seat #dhud .dh-btns{margin:0!important;flex:0 0 auto;gap:5px!important}" +
"body.vcp-seat #dhud .dh-btns .btn{border-radius:8px;background:rgba(255,255,255,.04)}" +
"body.vcp-seat:not(.touch) #dhud{bottom:auto!important;top:calc(78px + env(safe-area-inset-top,0px))!important}" +
"body.vcp-seat:not(.touch) #dhud.open{flex-wrap:nowrap;width:min(760px,calc(100vw - 32px))!important}" +
"body.vcp-seat:not(.touch) #dhud .dh-top{flex:0 0 auto}" +
"body.vcp-seat:not(.touch) #dhud .dh-next{flex:1 1 auto;white-space:nowrap;overflow:hidden}" +
"body.vcp-seat.touch #dhud.open{left:8px!important;right:8px!important;transform:none!important;max-width:none!important;padding:6px 8px 7px 12px!important}" +
"body.vcp-seat.touch #dhud .dh-top{flex:1 1 auto}" +
"body.vcp-seat.touch #dhud .dh-next{flex:1 1 100%;order:3;border-left:0;padding:0!important}" +
"body.vcp-seat.touch #dhud .dh-btns{flex:0 0 auto;order:2}" +
"body.vcp-seat.touch #dhud .dh-btns .btn{min-height:36px}";
(document.head || document.documentElement).appendChild(s);
})();
function vcpBar(x, X, Y, W, H, v, col, bg) { x.fillStyle = bg || "#141C28"; vcpRound(x, X, Y, W, H, H * 0.35); x.fill(); if (v > 0.001) {
x.fillStyle = col;
vcpRound(x, X, Y, Math.max(H * 0.7, W * Math.min(1, v)), H, H * 0.35);
x.fill();
} }
function vcpLvlCol(v) { return v > 0.5 ? "#3EE07A" : v > 0.25 ? "#E8C27A" : "#E0503E"; }
function vcpFit(x, t, maxW) { t = String(t == null ? "" : t); if (x.measureText(t).width <= maxW)
return t; while (t.length > 1 && x.measureText(t + "…").width > maxW)
t = t.slice(0, -1); return t + "…"; }
function vcpPaintMech(cv, R, side, accent) { return __ZC(343, 33, this, arguments, new.target); }
function vcpBuildMech(kind) { return __ZC(343, 34, this, arguments, new.target); }
VCP_BUILD["mm:*"] = vcpBuildMech;
VCP_BUILD["bw:*"] = vcpBuildMech;
function vcpBuildChase() { return __ZC(343, 35, this, arguments, new.target); }
function vcpPaintRadar(cv) { return __ZC(343, 36, this, arguments, new.target); }
function vcpPaintMeso(cv, R) { return __ZC(343, 37, this, arguments, new.target); }
function vcpReadChase() { return __ZC(343, 38, this, arguments, new.target); }
VCP_BUILD.chase = vcpBuildChase;
