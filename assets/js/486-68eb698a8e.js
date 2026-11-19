/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CTC = { mats: {}, tex: {}, glass: [], night: [], built: 0, ride: null, dl: 1, t: 0, lite: false, train: null, cars: [], boats: [], ship: null, trams: [] };
function ctcLite() { return typeof LITE !== "undefined" && !!LITE; }
function ctcSRGB(t) { try {
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
}
catch (e) { } return t; }
function ctcSurf(kind, col, o) { return __ZC(486, 0, this, arguments, new.target); }
function ctcFlat(col, o) { return __ZC(486, 1, this, arguments, new.target); }
function ctcGlow(col) { var k = "g:" + col; return CTC.mats[k] || (CTC.mats[k] = new THREE.MeshBasicMaterial({ color: col })); }
function ctcCurtainTex(kind) { return __ZC(486, 2, this, arguments, new.target); }
function ctcGlass(tint, kind) { return __ZC(486, 3, this, arguments, new.target); }
function ctcClear(tint, op) {
var key = "clear:" + tint + ":" + op;
if (CTC.mats[key])
return CTC.mats[key];
var m = new THREE.MeshLambertMaterial({ color: tint, transparent: true, opacity: op || 0.32, depthWrite: false, side: THREE.DoubleSide });
m.userData.ctcGlass = 1;
return (CTC.mats[key] = m);
}
function ctcLatticeMat(col) { return __ZC(486, 4, this, arguments, new.target); }
function ctcBoxGeo(w, h, d) { var g = new THREE.BoxGeometry(w, h, d); if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]); return g; }
function ctcCylGeo(rt, rb, h, seg, open) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 24, 1, !!open); if (typeof metreUVs === "function")
metreUVs(g, "cyl", [rt, rb, h]); return g; }
function ctcGlassUV(g, mw, mh) { var uv = g.attributes.uv, a = uv.array; for (var i = 0; i < a.length; i += 2) {
a[i] /= mw;
a[i + 1] /= mh;
} uv.needsUpdate = true; return g; }
function ctcMesh(G, geo, mat, x, y, z, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; m.castShadow = true; m.receiveShadow = true; G.add(m); return m; }
function ctcBox(G, w, h, d, mat, x, y, z, ry) {
var geo = ctcBoxGeo(w, h, d);
if (mat.userData && mat.userData.ctcMod)
ctcGlassUV(geo, mat.userData.ctcMod[0], mat.userData.ctcMod[1]);
return ctcMesh(G, geo, mat, x, y, z, ry);
}
function ctcCyl(G, rt, rb, h, mat, x, y, z, seg, open) {
var geo = ctcCylGeo(rt, rb, h, seg, open);
if (mat.userData && mat.userData.ctcMod)
ctcGlassUV(geo, mat.userData.ctcMod[0], mat.userData.ctcMod[1]);
return ctcMesh(G, geo, mat, x, y, z);
}
function ctcLeafMat(col) {
var key = "leaf:" + col;
if (CTC.mats[key])
return CTC.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col });
var t = typeof texOf === "function" ? texOf("foliage") : null;
if (t)
m.map = t;
return (CTC.mats[key] = m);
}
function ctcShrubs(G, x0, z0, w, d, y, n, seed, col) { return __ZC(486, 5, this, arguments, new.target); }
function ctcTree(G, x, z, s, kind) { return __ZC(486, 6, this, arguments, new.target); }
function ctcRail(G, len, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
ctcBox(g, len, 1.0, 0.04, ctcClear(0xCFE6F0, 0.28), 0, 0.5, 0);
ctcBox(g, len, 0.06, 0.1, ctcFlat(0xE8ECEE), 0, 1.02, 0);
return g;
}
function ctcTower(G, kind, h, w, tint, seed) { return __ZC(486, 7, this, arguments, new.target); }
function ctcHelix(G, h, r, seed) { return __ZC(486, 8, this, arguments, new.target); }
function ctcArcology(G, w, tiers, seed) { return __ZC(486, 9, this, arguments, new.target); }
function ctcDome(G, r, tint) { return __ZC(486, 10, this, arguments, new.target); }
function ctcPod(G, h, r, col) { return __ZC(486, 11, this, arguments, new.target); }
function ctcTrainCar(len, lead) { return __ZC(486, 12, this, arguments, new.target); }
function ctcAirship() { return __ZC(486, 13, this, arguments, new.target); }
function ctcTurbine(G, h) { return __ZC(486, 14, this, arguments, new.target); }
function ctcSolarTree(G, h) { return __ZC(486, 15, this, arguments, new.target); }
function ctcLamp(G) { var st = ctcSurf("metal", 0xC8CCD0); ctcCyl(G, 0.07, 0.1, 5.2, st, 0, 2.6, 0, 8); var a = ctcBox(G, 0.1, 0.1, 1.4, st, 0, 5.2, 0.6); ctcBox(G, 0.5, 0.08, 0.9, ctcGlow(0xF4F2E8), 0, 5.13, 1.1); }
function ctcBench(G) { var w = ctcSurf("wood", 0xC8A47A), st = ctcSurf("metal", 0x9AA0A6); ctcBox(G, 1.8, 0.08, 0.5, w, 0, 0.45, 0); ctcBox(G, 1.8, 0.45, 0.06, w, 0, 0.75, -0.24); [-0.75, 0.75].forEach(function (x) { ctcBox(G, 0.06, 0.45, 0.5, st, x, 0.22, 0); }); }
function ctcPlanter(G, r, shrubs) { ctcCyl(G, r, r * 0.92, 0.7, ctcSurf("concrete", 0xE2E0D8), 0, 0.35, 0, 20); ctcCyl(G, r - 0.12, r - 0.12, 0.08, ctcSurf("earth", 0x4A3A2A), 0, 0.7, 0, 20); if (shrubs)
ctcShrubs(G, 0, 0, r * 1.2, r * 1.2, 0.72, 4, Math.round(r * 99), 0x4E8A3A); }
var CTC_L = "the City to Come";
var CTC_DOORS = [];
function ctcDoor(x, z, rot, arch, name, doors) { CTC_DOORS.push({ x: x, z: z, rot: rot, arch: arch, name: name, doors: doors }); }
function ctcDoorsPut() { return __ZC(486, 16, this, arguments, new.target); }
var CTC_WEAR = {
jacket: function (c, t, b) { return { top: t || 0xF2F2EE, topKind: "shirt", bottom: b || 0x2E3440, shoes: 0xE8E8EC, layer: "jacket", layerColor: c }; },
suit: function (c, b) { return { top: c, topKind: "shirt", bottom: b || c, shoes: 0x2A2A30, layer: "jacket", layerColor: c }; },
coat: function (c, b) { return { top: 0xE8E8EC, topKind: "coat", bottom: b || 0x3A3E48, shoes: 0x2A2A30, layer: "longcoat", layerColor: c }; },
work: function (c) { return { top: c, topKind: "shirt", bottom: c, shoes: 0x3A3A40, layer: "apron", layerColor: 0x2A3A4A }; },
sport: function (c) { return { top: c, topKind: "shirt", bottom: 0x2A2E38, shoes: 0xF4F4F4 }; },
lab: function () { return { top: 0xF4F4F2, topKind: "coat", bottom: 0x3A3E4A, shoes: 0x2A2A2A, layer: "labcoat" }; }
};
var CTC_TOWERS = ["Lumen Tower", "Ardent Spire", "Halcyon House", "Meridian Point", "Solace Tower", "Corona Spire", "Verdance House", "Aurora Point", "Cascade Tower", "Zephyr Spire", "Tessera House", "Northlight Tower", "Harbour Point", "Juniper Tower"];
var CTC_HUE = [0x2A7ACA, 0xD86A3A, 0x3AA88A, 0x8A5AC8, 0xE8B030, 0xC83A5A, 0x4A8AB8, 0x6AA848, 0xE87AA8, 0x2A9AA8];
LD_SETS.future = function (P) { return __ZC(486, 17, this, arguments, new.target); };
function ctcMuseum(G) { return __ZC(486, 18, this, arguments, new.target); }
(function () {
if (typeof REALMS === "undefined" || !REALMS.future)
return;
Object.assign(REALMS.future, { ground: 0xC8C4BA, tex: "paving", path: 0xD6D2CA, skyTop: 0x4E86C8, skyLow: 0xCADCEA, dens: 0.55, light: 0xFFF6E8, amb: 0.85, sun: 1.0, stars: 0, daynight: true });
if (typeof SKYWORK !== "undefined")
delete SKYWORK.future;
})();
function ctcFound() { return __ZC(486, 19, this, arguments, new.target); }
(function () {
if (typeof ldBuild !== "function")
return;
var lb = ldBuild;
ldBuild = function (r) {
var o = lb.apply(this, arguments);
if (r && r.kind === "future" && LD.g) {
try {
ctcFound();
ctcDoorsPut();
ctcMuseumTalk();
}
catch (e) {
if (window.console)
console.warn("[city to come]", e);
}
}
else {
CTC.train = null;
CTC.trams = [];
CTC.cars = [];
CTC.boats = [];
CTC.ship = null;
CTC.spin = [];
CTC.night = [];
CTC.glass = [];
CTC.ride = null;
}
return o;
};
})();
function ctcMuseumTalk() {
var s = Math.sin(Math.PI / 2), c = Math.cos(Math.PI / 2);
LD.talkers.push({ x: -50 + 7.6, z: -24, r: 3.2, name: "The Time Traveller's house", verb: "go in (The Time Machine, H. G. Wells, 1895)", ctcMuseum: 1 });
}
(function () {
if (typeof ldUse !== "function")
return;
var lu = ldUse;
ldUse = function (T) {
if (T && T.ctcMuseum) {
if (typeof tmwFromMuseum === "function")
tmwFromMuseum();
else
setStatus("The door is locked for now: the house is being got ready.");
return;
}
if (T && T.ctcRide) {
ctcRideStart();
return;
}
return lu.apply(this, arguments);
};
})();
var CTC_TRAIN = { R: 200, y: 11.6, lap: 130, stop: 12, len: 12.6 };
function ctcTrainAt(t) {
var L = CTC_TRAIN.lap, S = CTC_TRAIN.stop, u = t % (L + S);
if (u < S)
return 0;
var k = (u - S) / L;
var e = k < 0.1 ? k * k * 5 : k > 0.9 ? 1 - (1 - k) * (1 - k) * 5 : 0.05 + (k - 0.1) * 1.125;
return e * Math.PI * 2;
}
function ctcTick(dt) { return __ZC(486, 20, this, arguments, new.target); }
(function () {
if (typeof ldTick !== "function")
return;
var lt = ldTick;
ldTick = function (dt) { var r = lt.apply(this, arguments); try {
ctcTick(dt);
}
catch (e) {
if (!CTC.e1) {
CTC.e1 = 1;
if (window.console)
console.warn("[city to come] tick", e);
}
} return r; };
})();
(function () {
if (typeof ldBuild !== "function")
return;
var lb = ldBuild;
ldBuild = function (r) { var o = lb.apply(this, arguments); if (r && r.kind === "future" && LD.g)
LD.talkers.push({ x: -8, z: 66, r: 3.4, name: "The maglev lift", verb: "ride the maglev round the city", ctcRide: 1 }); return o; };
})();
function ctcRideStart() {
if (CTC.ride)
return;
CTC.ride = { t: 0, back: { x: camera.position.x, z: camera.position.z } };
setStatus("🚄 <b>The maglev.</b> Up the lift and aboard: the doors close and the train lifts on its magnets. Round the city in about two minutes. <b>Press E</b> to get off at the station.");
}
function ctcRideTick(dt) { return __ZC(486, 21, this, arguments, new.target); }
function ctcRideEnd() { var Rd = CTC.ride; if (!Rd)
return; CTC.ride = null; camera.position.set(LD.ox - 6, ldY(-6, 64) + 1.72, LD.oz + 64); yaw = 0; pitch = 0; setStatus("Back down the lift, at the maglev station."); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) { if (!CTC.ride)
return; if (e.code === "KeyE" || e.code === "Escape") {
e.preventDefault();
e.stopImmediatePropagation();
ctcRideEnd();
} }, true);
(function () { try {
if (typeof CT_BY_HOST !== "undefined" && CT_BY_HOST["land:future"])
CT_BY_HOST["land:future"] = CT_BY_HOST["land:future"].filter(function (T) { return T.id !== "timemachine"; });
}
catch (e) { } })();
(function () { if (typeof ctsEnter !== "function")
return; var e0 = ctsEnter; ctsEnter = function (id) { if (id === "timemachine" && typeof tmwFromMuseum === "function") {
try {
worldCard(null);
}
catch (e) { }
tmwFromMuseum();
return;
} return e0.apply(this, arguments); }; })();
