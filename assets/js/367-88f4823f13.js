/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EVB = { doors: [], near: null, prompted: false, armed: true, building: null, act: null, actOn: false, spin: [], t: 0 };
var EVB_LD = {
fairycastle: { theme: "fairycastle", name: "The Fairy Castle", doors: "the castle doors" }
};
var EVB_THEMES = {};
var EVB_SCIPLAN = { researchlab: 1, habitat: 1, hangar: 1, spaceport: 1, biodome: 1, controltower: 1, reactor: 1 };
function evbThemeKey(spec) { return __ZC(367, 0, this, arguments, new.target); }
function evbLite() { return typeof LITE !== "undefined" && !!LITE; }
function evbSay(h) { try {
setStatus(h);
}
catch (e) { } }
function evbEsc(s) { return typeof esc === "function" ? esc(s) : String(s || "").replace(/[<>&"]/g, ""); }
function evbLdDoor(it) { return __ZC(367, 1, this, arguments, new.target); }
(function () {
if (typeof ldPut === "function") {
var lp = ldPut;
ldPut = function (it) { var r = lp.apply(this, arguments); try {
if (it && it.t === "k" && EVB_LD[it.a])
evbLdDoor(it);
}
catch (e) {
if (window.console)
console.warn("[enter-all] door", e);
} return r; };
}
if (typeof ldDrop === "function") {
var ld = ldDrop;
ldDrop = function () { EVB.doors = EVB.doors.filter(function (q) { return q.src !== "ld"; }); return ld.apply(this, arguments); };
}
if (typeof doorWorld === "function") {
var dw = doorWorld;
doorWorld = function (spec) { if (spec && spec.evbDoor)
return spec.evbDoor; return dw.apply(this, arguments); };
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function (quiet) {
var was = (typeof INT !== "undefined" && INT && INT.spec && evbThemeKey(INT.spec)) ? INT.spec : null, root = was ? INT.root : null;
var r = ex.apply(this, arguments);
if (was && !(typeof INT !== "undefined" && INT && INT.root === root)) {
evbActOff();
EVB.armed = false;
evbLetGo(root);
try {
var P = camera.position, gy = typeof terrainY === "function" ? (terrainY(P.x, P.z) || 0) : 0;
P.y = gy + 1.72;
}
catch (e) { }
if (!quiet)
evbSay("Back outside <b>" + evbEsc(was.label || (EVB_LD[was.archetype] && EVB_LD[was.archetype].name) || "") + "</b>.");
}
return r;
};
}
})();
function evbLetGo(root) { return __ZC(367, 2, this, arguments, new.target); }
function evbEnter(D) { return __ZC(367, 3, this, arguments, new.target); }
function evbPromptOff() { if (EVB.prompted) {
EVB.prompted = false;
EVB.near = null;
if (typeof worldPromptCity === "function")
worldPromptCity(null);
} }
function evbDoorTick() {
if (typeof WLD !== "undefined" && WLD.on && !store.inside && walkMode) {
evbPromptOff();
if (typeof evbWorldDoorTick === "function")
evbWorldDoorTick();
return;
}
if (EVB.wnear)
EVB.wnear = null;
if ((typeof WLD !== "undefined" && WLD.on) || store.inside || (typeof walkMode !== "undefined" && !walkMode) || !EVB.doors.length) {
evbPromptOff();
return;
}
var P = camera.position, best = null, bd = 1e9;
EVB.doors.forEach(function (q) { if ((q.spec.realm || 0) !== (store.here || 0))
return; var D = q.spec.evbDoor, d = Math.hypot(P.x - D.x, P.z - D.z); if (d < bd) {
bd = d;
best = q;
} });
if (!best || bd > 6) {
EVB.armed = true;
evbPromptOff();
return;
}
if (bd > 2.4)
EVB.armed = true;
if (bd < 1.4 && EVB.armed && (typeof intCool === "undefined" || intCool <= 0)) {
evbEnter(best);
return;
}
if (!EVB.prompted || EVB.near !== best) {
EVB.prompted = true;
EVB.near = best;
var nm = best.info.name;
worldPromptCity("🚪 <b>" + evbEsc(nm) + "</b> · walk up to " + evbEsc(best.info.doors) + " or <b>press E</b> to go in", function () { evbEnter(best); });
}
}
(function () {
if (typeof esKind === "function" && typeof ES_HOUSES !== "undefined") {
var ek = esKind;
esKind = function (spec) { var t = evbThemeKey(spec); if (t && ES_HOUSES["evb_" + t])
return "evb_" + t; return ek.apply(this, arguments); };
}
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) { if (typeof k === "string" && k.indexOf("evb_") === 0 && typeof esSize === "function") {
var s = esSize(k);
return [Math.max(0.3, s[0] * 0.9), Math.max(0.3, s[1] * 0.9)];
} return fb.apply(this, arguments); };
}
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var tk = evbThemeKey(spec), T = tk ? EVB_THEMES[tk] : null;
if (!T)
return mi.apply(this, arguments);
var hw = typeof HW !== "undefined" ? HW : null, wasP = hw && hw.p, wasSeed = hw && hw.seed, em = typeof esMat === "function" ? esMat : null;
if (hw && T.pal) {
hw.p = Object.assign({ art: 0, rug: 0, rugv: 0, seed: T.seed || 7 }, T.pal);
hw.seed = hw.p.seed;
}
if (em && T.remap)
esMat = function (col, surf, o) { var m = T.remap[(col >>> 0).toString(16).toUpperCase() + "|" + (surf || "")]; return m ? em(m[0], m[1], o) : em(col, surf, o); };
EVB.building = [];
EVB.spinNew = [];
EVB.T = T;
try {
var I = mi.apply(this, arguments);
if (I) {
I.evbActs = EVB.building;
I.evbSpin = EVB.spinNew;
I.evbTheme = T;
}
return I;
}
finally {
EVB.building = null;
EVB.spinNew = null;
EVB.T = null;
if (em)
esMat = em;
if (hw) {
if (wasP !== undefined)
hw.p = wasP;
hw.seed = wasSeed;
}
}
};
})();
(function () {
if (typeof liveFinish !== "function")
return;
var lf = liveFinish;
liveFinish = function (I) {
var tk = I && evbThemeKey(I.spec), T = tk ? EVB_THEMES[tk] : null;
if (!T)
return lf.apply(this, arguments);
var r = lf.call(this, Object.assign({}, I, { spec: Object.assign({}, I.spec, { archetype: "palace", name: "" }) }));
if (T.panel !== undefined) {
var done = {};
I.root.children.forEach(function (m) {
if (!m.userData.liveDone || !m.material || !m.material.color || done[m.material.uuid])
return;
done[m.material.uuid] = 1;
if (m.material.color.getHex() === 0xD8D2C6)
m.material.color.setHex(T.panel);
});
}
return r;
};
})();
function evbAct(P, ctx, u, v, r, name, verb, fn) {
if (!EVB.building)
return;
var p = P.map(u, v);
EVB.building.push({ x: p[0], z: p[1], L: ctx.L || 0, r: r || 1.8, name: name, verb: verb, fn: fn });
}
function evbSpinMark(g, sp) { g.userData.evbSpin = sp || 0.4; if (EVB.spinNew)
EVB.spinNew.push(g); return g; }
function evbActOff() { if (EVB.actOn) {
EVB.actOn = false;
EVB.act = null;
if (typeof worldPromptCity === "function")
worldPromptCity(null);
} }
function evbInsideTick(dt) { return __ZC(367, 4, this, arguments, new.target); }
var EVB_LAST = 0;
setInterval(function () {
var now = Date.now(), dt = Math.min(0.5, (now - (EVB_LAST || now)) / 1000);
EVB_LAST = now;
EVB.t += dt;
try {
if (typeof camera === "undefined" || !camera || typeof store === "undefined")
return;
if (typeof INT !== "undefined" && INT) {
if (INT.evbActs)
evbInsideTick(dt);
else
evbActOff();
return;
}
evbActOff();
evbDoorTick();
}
catch (e) {
if (window.console)
console.warn("[enter-all]", e);
}
}, 120);
function evbCard(title, body, btns) { return __ZC(367, 5, this, arguments, new.target); }
function evbPick(list) { return list[(Math.random() * list.length) | 0]; }
function evbTest() { return { EVB: EVB, doors: EVB.doors.length, themes: Object.keys(EVB_THEMES), inside: !!(typeof INT !== "undefined" && INT && INT.evbActs), acts: (typeof INT !== "undefined" && INT && INT.evbActs) ? INT.evbActs.length : 0 }; }
"use strict";
var EVB_C = { pink: 0xFF4FA0, rose: 0xE8306E, sky: 0x38A8FF, royal: 0x3A5CE8, lilac: 0xA860FF, mint: 0x2AD8A0, sun: 0xFFCC20, gold: 0xE8B830, white: 0xFFF4FA,
teal: 0x18C0C8, coral: 0xFF6A48, red: 0xE82A2A, orange: 0xFF8A1A, green: 0x3AC03A, ice: 0xBFEFFF, cream: 0xFFF0D8, plum: 0x8A2AB8, leaf: 0x2E9A3A };
var EVB_GM = {};
function evbGlow(col, op) {
var k = col + "|" + (op || 1);
if (EVB_GM[k])
return EVB_GM[k];
var m = new THREE.MeshBasicMaterial({ color: col });
if (op !== undefined && op < 1) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
}
m.userData.ldShared = 1;
return (EVB_GM[k] = m);
}
var EVB_GEOS = {};
function evbGeo(t, a, b, c, d) { return __ZC(367, 6, this, arguments, new.target); }
function evbM(c, surf, o) { return esMat(c, surf, o); }
function evbGilt() { return esMat(EVB_C.gold, null, { e: 0x3A2A06 }); }
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var C = EVB_C;
function G() { return new THREE.Group(); }
function B(g, mat, w, h, d, x, y, z, ry) { var m = new THREE.Mesh(evbGeo("b", w, h, d), mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; g.add(m); return m; }
function Cy(g, mat, rt, rb, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("c", rt, rb, h, seg || 14), mat); m.position.set(x, y, z); g.add(m); return m; }
function S(g, mat, r, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("s", r, seg || 12), mat); m.position.set(x, y, z); g.add(m); return m; }
function Tor(g, mat, r, t, x, y, z, rx) { var m = new THREE.Mesh(evbGeo("t", r, t), mat); m.position.set(x, y, z); m.rotation.x = rx || 0; g.add(m); return m; }
function Cone(g, mat, r, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("k", r, h, seg || 14), mat); m.position.set(x, y, z); g.add(m); return m; }
var M = evbM, GILT = evbGilt;
var P = {};
P.evb_fthrone = function () {
var g = G(), gl = GILT(), cu = M(C.pink, "carpet"), bk = M(C.rose, "damask");
B(g, M(C.lilac, "marble"), 1.9, 0.25, 1.7, 0, 0.125, 0);
B(g, gl, 1.2, 0.42, 0.9, 0, 0.46, 0.05);
B(g, cu, 1.05, 0.14, 0.82, 0, 0.74, 0.08);
B(g, gl, 1.25, 2.3, 0.18, 0, 1.6, -0.38);
B(g, bk, 1.0, 1.9, 0.06, 0, 1.6, -0.28);
[-0.62, 0.62].forEach(function (x) { B(g, gl, 0.14, 0.55, 0.9, x, 0.95, 0.05); S(g, gl, 0.11, x, 1.26, 0.45, 10); Cy(g, gl, 0.06, 0.06, 2.9, x, 1.45, -0.38, 8); S(g, M(C.sky), 0.13, x, 2.95, -0.38, 10); });
S(g, evbGlow(C.sun), 0.16, 0, 2.9, -0.3, 12);
var h = new THREE.Shape();
h.moveTo(0, -0.25);
h.bezierCurveTo(0.35, 0.05, 0.25, 0.35, 0, 0.18);
h.bezierCurveTo(-0.25, 0.35, -0.35, 0.05, 0, -0.25);
var hm = new THREE.Mesh(new THREE.ShapeGeometry(h), M(C.sun, null, { e: 0x4A3000 }));
hm.position.set(0, 2.15, -0.24);
g.add(hm);
return g;
};
P.evb_fthrone2 = function () { var g = P.evb_fthrone(); g.scale.set(0.82, 0.82, 0.82); g.children[2].material = M(C.sky, "carpet"); return g; };
P.evb_well = function () {
var g = G(), st = M(0xE8E0F0, "stone"), wd = M(C.rose, "wood");
var ring = Cy(g, st, 1.0, 1.05, 0.85, 0, 0.425, 0, 20);
Cy(g, evbGlow(0x60C8FF, 0.85), 0.86, 0.86, 0.02, 0, 0.72, 0, 20);
Tor(g, M(C.lilac, "stone"), 1.0, 0.08, 0, 0.86, 0, Math.PI / 2);
[-0.92, 0.92].forEach(function (x) { B(g, wd, 0.12, 2.0, 0.12, x, 1.4, 0); });
var roof = Cone(g, M(C.pink, "wood"), 1.45, 0.9, 0, 2.75, 0, 4);
roof.rotation.y = Math.PI / 4;
Cy(g, wd, 0.05, 0.05, 1.84, 0, 2.1, 0, 8).rotation.z = Math.PI / 2;
Cy(g, M(0x9A7A4A, "wood"), 0.18, 0.15, 0.25, 0.25, 1.6, 0, 10);
for (var i = 0; i < 6; i++) {
var a = i * 1.05;
S(g, M([C.sun, C.mint, C.pink][i % 3]), 0.07, Math.cos(a) * 1.0, 0.95, Math.sin(a) * 1.0, 8);
}
return g;
};
P.evb_mirror = function () {
var g = G(), gl = GILT();
var fr = Tor(g, gl, 0.7, 0.09, 0, 1.75, 0, 0);
fr.scale.set(1, 1.45, 1);
var glass = new THREE.Mesh(new THREE.CircleGeometry(0.66, 32), M(0xD8E8FF, null, { e: 0x3A2A6A }));
glass.scale.set(1, 1.45, 1);
glass.position.set(0, 1.75, 0.01);
g.add(glass);
B(g, gl, 0.9, 0.2, 0.4, 0, 0.1, 0);
Cy(g, gl, 0.06, 0.08, 0.7, 0, 0.45, 0, 8);
S(g, M(C.sun, null, { e: 0x4A3000 }), 0.12, 0, 2.85, 0.02, 10);
[-0.55, 0.55].forEach(function (x) { S(g, M(C.pink), 0.08, x, 2.55, 0.05, 8); S(g, M(C.sky), 0.08, x, 0.95, 0.05, 8); });
return g;
};
P.evb_slipper = function () {
var g = G(), gl = GILT();
Cy(g, M(C.white, "marble"), 0.35, 0.42, 1.0, 0, 0.5, 0, 16);
Cy(g, gl, 0.42, 0.42, 0.06, 0, 1.03, 0, 16);
B(g, M(C.royal, "carpet"), 0.5, 0.1, 0.5, 0, 1.11, 0);
var gm = M(0xCFEFFF, null, { op: 0.55, e: 0x1A3A5A });
var sole = B(g, gm, 0.1, 0.03, 0.26, 0, 1.2, 0);
var toe = S(g, gm, 0.06, 0, 1.24, 0.08, 10);
toe.scale.set(1, 0.7, 1.6);
Cy(g, gm, 0.012, 0.01, 0.11, 0, 1.24, -0.11, 6);
B(g, gm, 0.1, 0.07, 0.08, 0, 1.25, -0.08);
var dome = S(g, M(0xE8F4FF, null, { op: 0.18 }), 0.32, 0, 1.14, 0, 16);
dome.scale.set(1, 1.2, 1);
return g;
};
P.evb_spindle = function () {
var g = G(), wd = M(0xC08A50, "wood");
B(g, wd, 1.2, 0.1, 0.35, 0, 0.5, 0);
[[-0.5, -0.12], [0.5, -0.12], [-0.5, 0.12], [0.5, 0.12]].forEach(function (p) { Cy(g, wd, 0.03, 0.03, 0.5, p[0], 0.25, p[1], 6); });
Cy(g, wd, 0.03, 0.03, 0.6, 0.25, 0.8, 0, 6);
var w = Tor(g, M(C.rose, "wood"), 0.42, 0.03, 0.25, 1.15, 0.05, 0);
w.rotation.y = Math.PI / 2;
for (var i = 0; i < 8; i++) {
var sp = Cy(g, wd, 0.012, 0.012, 0.82, 0.25, 1.15, 0.05, 4);
sp.rotation.x = i * Math.PI / 8;
}
var spd = Cy(g, M(0xD8D8E0), 0.008, 0.02, 0.4, -0.45, 0.85, 0, 6);
spd.rotation.z = 0.4;
S(g, M(C.lilac), 0.05, -0.38, 0.75, 0, 8);
return g;
};
P.evb_lectern = function () {
var g = G(), gl = GILT();
Cy(g, M(C.royal, "wood"), 0.1, 0.18, 1.0, 0, 0.5, 0, 10);
Cy(g, gl, 0.32, 0.36, 0.08, 0, 0.04, 0, 12);
var top = B(g, M(C.royal, "wood"), 0.9, 0.06, 0.62, 0, 1.08, 0);
top.rotation.x = -0.35;
var tex = typeof esCanvas === "function" ? esCanvas("evbbook", 256, 1, function (x, W, H) {
x.fillStyle = "#FFF6E0";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8306E";
x.font = "bold 30px Georgia";
x.fillText("Once", 18, 48);
x.fillText("upon", W / 2 + 18, 48);
x.fillStyle = "#6A4A3A";
for (var i = 0; i < 9; i++) {
x.fillRect(18, 70 + i * 18, W / 2 - 36, 4);
x.fillRect(W / 2 + 18, 70 + i * 18, W / 2 - 36, 4);
}
x.fillStyle = "#A87A3A";
x.fillRect(W / 2 - 2, 0, 4, H);
}) : null;
if (tex)
tex.repeat.set(1, 1);
var pg = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.56), tex ? new THREE.MeshLambertMaterial({ map: tex }) : M(C.cream));
pg.rotation.x = -Math.PI / 2 - 0.35;
pg.position.set(0, 1.13, 0.01);
g.add(pg);
B(g, M(C.rose, "carpet"), 0.03, 0.02, 0.4, 0.1, 1.16, 0.05).rotation.x = -0.35;
return g;
};
P.evb_cake = function () {
var g = G(), cols = [C.pink, C.white, C.mint, C.white, C.pink], y = 0.95;
Cy(g, M(C.white, "marble"), 0.7, 0.8, 0.9, 0, 0.45, 0, 18);
for (var i = 0; i < 5; i++) {
var r = 0.6 - i * 0.11, h = 0.26;
Cy(g, M(cols[i]), r, r, h, 0, y + h / 2, 0, 20);
Tor(g, M([C.sun, C.rose, C.lilac][i % 3]), r, 0.025, 0, y + 0.02, 0, Math.PI / 2);
y += h;
}
for (var k = 0; k < 5; k++) {
var a = k * 1.256;
Cy(g, M(C.sky), 0.012, 0.012, 0.12, Math.cos(a) * 0.08, y + 0.06, Math.sin(a) * 0.08, 6);
S(g, evbGlow(0xFFD060), 0.02, Math.cos(a) * 0.08, y + 0.14, Math.sin(a) * 0.08, 6);
}
S(g, M(C.red), 0.06, 0, y + 0.04, 0, 8);
return g;
};
P.evb_gowns = function () {
var g = G(), gl = GILT(), cols = [C.pink, C.sky, C.sun, C.lilac, C.mint];
[-1.2, 1.2].forEach(function (x) { Cy(g, gl, 0.03, 0.03, 2.0, x, 1.0, 0, 8); Cy(g, gl, 0.2, 0.2, 0.04, x, 0.02, 0, 10); });
Cy(g, gl, 0.025, 0.025, 2.4, 0, 1.95, 0, 8).rotation.z = Math.PI / 2;
cols.forEach(function (c, i) { var x = -0.96 + i * 0.48, m = M(c, "damask"); Cone(g, m, 0.3, 1.2, x, 1.15, 0, 16); Cy(g, m, 0.09, 0.12, 0.4, x, 1.7, 0, 10); S(g, M(C.white), 0.05, x, 1.92, 0, 6); });
return g;
};
function canopy(c1, c2) {
return function () {
var g = G(), gl = GILT(), cu = M(c2, "damask");
B(g, M(C.white, "wood"), 1.8, 0.45, 2.2, 0, 0.225, 0);
B(g, M(C.white), 1.7, 0.2, 2.1, 0, 0.55, 0);
B(g, M(c1, "carpet"), 1.82, 0.12, 1.5, 0, 0.68, 0.3);
S(g, M(C.white), 0.3, -0.45, 0.72, -0.8, 10).scale.set(1, 0.4, 0.6);
S(g, M(C.white), 0.3, 0.45, 0.72, -0.8, 10).scale.set(1, 0.4, 0.6);
B(g, gl, 1.9, 1.4, 0.1, 0, 1.1, -1.08);
B(g, cu, 1.6, 1.1, 0.04, 0, 1.15, -1.02);
[[-0.88, -1.05], [0.88, -1.05], [-0.88, 1.05], [0.88, 1.05]].forEach(function (p) { Cy(g, gl, 0.05, 0.05, 2.6, p[0], 1.3, p[1], 8); S(g, M(C.sun), 0.08, p[0], 2.65, p[1], 8); });
B(g, cu, 1.9, 0.3, 2.2, 0, 2.5, 0);
var crown = Cone(g, M(c1, "damask"), 0.9, 0.7, 0, 3.0, 0, 4);
crown.rotation.y = Math.PI / 4;
[-0.95, 0.95].forEach(function (x) { var cu2 = B(g, M(c2, "damask", { side: 1, op: 0.85 }), 0.02, 2.1, 0.7, x, 1.45, 0.75); });
return g;
};
}
P.evb_bedpink = canopy(C.pink, C.lilac);
P.evb_bedsky = canopy(C.sky, C.royal);
P.evb_bedsun = canopy(C.sun, C.coral);
P.evb_bedmint = canopy(C.mint, C.teal);
P.evb_bedlilac = canopy(C.lilac, C.pink);
P.evb_littlebed = function () { var g = canopy(C.sky, C.sun)(); g.scale.set(0.7, 0.7, 0.7); return g; };
P.evb_jars = function () {
var g = G(), wd = M(C.lilac, "wood"), cols = [0xFF80C8, 0x80D8FF, 0xFFE070, 0xA0FF90, 0xC8A0FF];
B(g, wd, 1.6, 2.0, 0.04, 0, 1.0, -0.18);
[-0.78, 0.78].forEach(function (x) { B(g, wd, 0.04, 2.0, 0.4, x, 1.0, 0); });
for (var r = 0; r < 4; r++) {
B(g, wd, 1.56, 0.04, 0.38, 0, 0.3 + r * 0.5, 0);
for (var c = 0; c < 5; c++) {
var x = -0.6 + c * 0.3, y = 0.32 + r * 0.5;
Cy(g, M(0xE8F4FF, null, { op: 0.35 }), 0.08, 0.08, 0.22, x, y + 0.11, 0, 10);
S(g, evbGlow(cols[(r + c) % 5]), 0.055, x, y + 0.09, 0, 8);
Cy(g, M(C.gold), 0.06, 0.06, 0.03, x, y + 0.235, 0, 8);
}
}
return g;
};
P.evb_pumpkin = function () {
var g = G(), m = M(C.orange);
for (var i = 0; i < 8; i++) {
var s = S(g, m, 0.32, Math.cos(i * 0.785) * 0.14, 0.3, Math.sin(i * 0.785) * 0.14, 12);
s.scale.set(0.7, 0.9, 0.7);
}
Cy(g, M(C.leaf), 0.04, 0.05, 0.18, 0, 0.62, 0, 6);
return g;
};
P.evb_coach = function () {
var g = G(), gl = GILT(), pm = M(C.orange, "damask");
var body = S(g, pm, 1.1, 0, 1.6, 0, 20);
body.scale.set(1, 0.95, 1.25);
for (var i = 0; i < 6; i++) {
var rib = Tor(g, M(0xE87010), 1.1, 0.05, 0, 1.6, 0, 0);
rib.rotation.y = i * Math.PI / 6;
rib.scale.set(1, 0.95, 1);
}
B(g, M(0x3A2A6A, null, { e: 0x1A1040 }), 0.02, 0.6, 0.5, 1.06, 1.65, 0);
B(g, M(0x3A2A6A, null, { e: 0x1A1040 }), 0.02, 0.6, 0.5, -1.06, 1.65, 0);
[[-0.95, 1.1], [0.95, 1.1], [-0.95, -1.1], [0.95, -1.1]].forEach(function (p) { var w = Tor(g, gl, 0.42, 0.05, p[0], 0.45, p[1], 0); w.rotation.y = Math.PI / 2; for (var k = 0; k < 4; k++) {
var sp = Cy(g, gl, 0.015, 0.015, 0.82, p[0], 0.45, p[1], 4);
sp.rotation.x = k * Math.PI / 4;
} });
Cy(g, M(C.leaf), 0.06, 0.08, 0.5, 0, 2.75, 0, 8);
S(g, gl, 0.12, 0, 3.05, 0, 10);
return g;
};
P.evb_musicbox = function () {
var g = G(), gl = GILT();
B(g, M(C.white, "marble"), 1.0, 0.8, 1.0, 0, 0.4, 0);
B(g, M(C.pink, "damask"), 1.1, 0.4, 0.8, 0, 1.0, 0);
B(g, gl, 1.14, 0.05, 0.84, 0, 1.22, 0);
var lid = B(g, M(C.pink, "damask"), 1.1, 0.05, 0.8, 0, 1.6, -0.38);
lid.rotation.x = -1.25;
B(g, M(0xE8F0FF, null, { e: 0x202838 }), 0.9, 0.02, 0.5, 0, 1.58, -0.42).rotation.x = -1.25;
var dg = G();
dg.position.set(0, 1.25, 0.05);
g.add(dg);
Cy(dg, gl, 0.12, 0.12, 0.04, 0, 0.02, 0, 12);
Cone(dg, M(C.sky), 0.14, 0.22, 0, 0.16, 0, 12);
Cy(dg, M(C.cream), 0.03, 0.04, 0.16, 0, 0.34, 0, 8);
S(dg, M(C.cream), 0.05, 0, 0.46, 0, 8);
Cy(dg, M(C.cream), 0.01, 0.01, 0.22, 0.09, 0.36, 0, 4).rotation.z = 1.1;
Cy(dg, M(C.cream), 0.01, 0.01, 0.22, -0.09, 0.36, 0, 4).rotation.z = -1.1;
evbSpinMark(dg, 0.9);
var key = Cy(g, gl, 0.03, 0.03, 0.3, 0.6, 0.7, 0, 6);
key.rotation.z = Math.PI / 2;
Tor(g, gl, 0.08, 0.02, 0.78, 0.7, 0, 0).rotation.y = Math.PI / 2;
return g;
};
P.evb_bell = function () {
var g = G(), wd = M(C.royal, "wood"), br = esMat(C.gold, null, { e: 0x2A1A04 });
[-1.0, 1.0].forEach(function (x) { B(g, wd, 0.18, 3.2, 0.18, x, 1.6, 0); });
B(g, wd, 2.3, 0.2, 0.24, 0, 3.15, 0);
var b = Cy(g, br, 0.35, 0.75, 0.95, 0, 2.4, 0, 20);
Tor(g, br, 0.75, 0.05, 0, 1.95, 0, Math.PI / 2);
S(g, br, 0.12, 0, 1.85, 0, 8);
Cy(g, M(C.red), 0.02, 0.02, 1.4, 0.5, 1.2, 0, 6);
B(g, M(C.white, "marble"), 2.6, 0.12, 0.9, 0, 0.06, 0);
return g;
};
P.evb_egg = function () {
var g = G(), st = M(0x9A7A5A, "wood");
for (var i = 0; i < 14; i++) {
var a = i * 0.45, n = Cy(g, st, 0.04, 0.04, 1.3, Math.cos(a) * 0.55, 0.2, Math.sin(a) * 0.55, 5);
n.rotation.z = 1.3;
n.rotation.y = a;
}
var t = Tor(g, M(0x8A6A4A, "wood"), 0.6, 0.16, 0, 0.22, 0, Math.PI / 2);
var egg = S(g, M(C.mint, null, { e: 0x0A3A2A }), 0.42, 0, 0.62, 0, 18);
egg.scale.set(1, 1.35, 1);
for (var k = 0; k < 7; k++) {
var sc = S(g, M([C.sun, C.teal, C.lilac][k % 3], null, { e: 0x101010 }), 0.09, Math.cos(k * 0.9) * 0.4, 0.5 + (k % 3) * 0.18, Math.sin(k * 0.9) * 0.4, 6);
sc.scale.set(1, 0.5, 1);
}
S(g, evbGlow(0xFFB060, 0.25), 0.75, 0, 0.62, 0, 12);
return g;
};
P.evb_braid = function () {
var g = G(), hair = M(C.sun, "damask");
for (var i = 0; i < 26; i++) {
var a = i * 0.6, r = 0.25 + i * 0.025;
S(g, hair, 0.1, Math.cos(a) * r, 0.08 + (i % 4) * 0.02, Math.sin(a) * r, 8);
}
for (var k = 0; k < 22; k++) {
var s2 = S(g, hair, 0.09, 0, 0.2 + k * 0.12, -0.5, 8);
s2.position.x = Math.sin(k * 1.4) * 0.04;
}
B(g, GILT(), 0.3, 0.08, 0.12, 0, 2.85, -0.5);
S(g, M(C.pink), 0.1, 0, 2.95, -0.45, 8);
return g;
};
P.evb_snowglobe = function () {
var g = G(), gl = GILT();
Cy(g, M(C.royal, "wood"), 0.55, 0.65, 0.45, 0, 0.225, 0, 18);
Tor(g, gl, 0.55, 0.04, 0, 0.45, 0, Math.PI / 2);
B(g, M(C.white), 0.3, 0.3, 0.3, 0, 0.62, 0);
Cone(g, M(C.sky), 0.12, 0.3, 0.12, 0.92, 0.12, 8);
Cone(g, M(C.sky), 0.12, 0.3, -0.12, 0.92, 0.12, 8);
Cone(g, M(C.pink), 0.15, 0.4, 0, 0.95, -0.05, 8);
for (var i = 0; i < 16; i++) {
var a = i * 2.4;
S(g, M(C.white), 0.025, Math.cos(a) * 0.3 * (i % 3 + 1) / 3, 0.6 + (i % 5) * 0.12, Math.sin(a) * 0.3 * (i % 3 + 1) / 3, 5);
}
S(g, M(0xE8F8FF, null, { op: 0.25 }), 0.55, 0, 0.95, 0, 20);
return g;
};
P.evb_arch = function () {
var g = G(), lf = M(C.leaf), cols = [C.pink, C.sun, C.sky, C.lilac, C.coral, C.white];
[-1.1, 1.1].forEach(function (x) { Cy(g, lf, 0.08, 0.08, 2.4, x, 1.2, 0, 6); });
var a = Tor(g, lf, 1.1, 0.08, 0, 2.4, 0, 0);
a.scale.set(1, 0.6, 1);
for (var i = 0; i < 34; i++) {
var t = i / 33, ang = t * Math.PI, x, y;
if (i < 10) {
x = -1.1;
y = 0.3 + i * 0.22;
}
else if (i < 24) {
x = -Math.cos((i - 10) / 13 * Math.PI) * 1.1;
y = 2.4 + Math.sin((i - 10) / 13 * Math.PI) * 0.66;
}
else {
x = 1.1;
y = 0.3 + (33 - i) * 0.22;
}
S(g, M(cols[i % 6]), 0.11, x, y, 0.04 * (i % 2 ? 1 : -1), 8);
}
return g;
};
P.evb_toadstool = function () {
var g = G();
Cy(g, M(C.cream), 0.12, 0.16, 0.42, 0, 0.21, 0, 10);
var cap = S(g, M(C.red), 0.3, 0, 0.44, 0, 14);
cap.scale.set(1, 0.35, 1);
for (var i = 0; i < 6; i++)
S(g, M(C.white), 0.04, Math.cos(i) * 0.18, 0.52, Math.sin(i) * 0.18, 6);
return g;
};
P.evb_toadtable = function () {
var g = G();
Cy(g, M(C.cream), 0.16, 0.22, 0.7, 0, 0.35, 0, 10);
var cap = Cy(g, M(C.red), 0.75, 0.75, 0.08, 0, 0.74, 0, 20);
for (var i = 0; i < 9; i++)
Cy(g, M(C.white), 0.06, 0.06, 0.01, Math.cos(i * 0.7) * 0.5, 0.785, Math.sin(i * 0.7) * 0.5, 8);
var tp = S(g, M(C.sky), 0.12, 0, 0.88, 0, 12);
tp.scale.set(1, 0.85, 1);
Cy(g, M(C.sky), 0.02, 0.03, 0.12, 0.14, 0.9, 0, 6).rotation.z = -0.9;
for (var k = 0; k < 4; k++) {
var a = k * 1.57 + 0.4;
Cy(g, M(C.pink), 0.04, 0.03, 0.06, Math.cos(a) * 0.45, 0.81, Math.sin(a) * 0.45, 8);
Cy(g, M(C.white), 0.07, 0.07, 0.01, Math.cos(a) * 0.45, 0.785, Math.sin(a) * 0.45, 10);
}
return g;
};
P.evb_fountain = function () {
var g = G(), st = M(C.white, "marble"), wt = evbGlow(0x7AD0FF, 0.7);
Cy(g, st, 1.6, 1.7, 0.5, 0, 0.25, 0, 24);
Cy(g, wt, 1.45, 1.45, 0.02, 0, 0.47, 0, 24);
Cy(g, st, 0.18, 0.24, 1.2, 0, 1.0, 0, 10);
Cy(g, st, 0.8, 0.5, 0.2, 0, 1.6, 0, 18);
Cy(g, wt, 0.72, 0.72, 0.02, 0, 1.69, 0, 18);
Cy(g, st, 0.1, 0.14, 0.6, 0, 2.0, 0, 8);
Cy(g, st, 0.4, 0.25, 0.14, 0, 2.3, 0, 14);
S(g, M(C.pink), 0.14, 0, 2.48, 0, 10);
for (var i = 0; i < 8; i++) {
var a = i * 0.785, j = Cy(g, M(0xB8E8FF, null, { op: 0.45 }), 0.02, 0.02, 0.6, Math.cos(a) * 0.5, 1.95, Math.sin(a) * 0.5, 4);
j.rotation.z = Math.cos(a) * 0.5;
j.rotation.x = -Math.sin(a) * 0.5;
}
return g;
};
P.evb_rocking = function () {
var g = G(), wd = M(C.white, "wood");
var rk = Tor(g, M(C.rose, "wood"), 1.0, 0.05, 0, 1.05, 0, 0);
rk.rotation.y = Math.PI / 2;
rk.scale.set(1, 1, 1);
var body = S(g, wd, 0.35, 0, 0.75, 0, 12);
body.scale.set(0.7, 0.7, 1.5);
S(g, wd, 0.2, 0, 1.1, 0.5, 10).scale.set(0.7, 1.1, 1.2);
[[-0.15, -0.35], [0.15, -0.35], [-0.15, 0.35], [0.15, 0.35]].forEach(function (p) { Cy(g, wd, 0.04, 0.04, 0.42, p[0], 0.32, p[1], 6); });
B(g, M(C.sun), 0.06, 0.4, 0.5, 0, 1.15, 0.3);
B(g, M(C.pink, "carpet"), 0.45, 0.06, 0.4, 0, 1.0, 0);
return g;
};
P.evb_cauldron = function () {
var g = G();
var c = S(g, M(0x2A2A34), 0.6, 0, 0.6, 0, 16);
c.scale.set(1, 0.8, 1);
Tor(g, M(0x3A3A44), 0.55, 0.06, 0, 0.95, 0, Math.PI / 2);
Cy(g, evbGlow(0x60FF90, 0.9), 0.52, 0.52, 0.02, 0, 0.93, 0, 16);
for (var i = 0; i < 5; i++)
S(g, evbGlow(0xA0FFB0, 0.6), 0.05 + i * 0.01, Math.cos(i * 1.3) * 0.25, 0.98, Math.sin(i * 1.3) * 0.25, 6);
[[0, -1], [2.1, -1], [4.2, -1]].forEach(function (p, i) { var a = p[0]; Cy(g, M(0x2A2A34), 0.04, 0.04, 0.5, Math.cos(a) * 0.62, 0.25, Math.sin(a) * 0.62, 6); });
var cols = [C.pink, C.sky, C.sun, C.lilac, C.coral];
for (var k = 0; k < 5; k++) {
var a2 = k * 1.25 + 0.5;
Cy(g, M(cols[k], null, { op: 0.8, e: 0x101010 }), 0.07, 0.09, 0.25, Math.cos(a2) * 1.0, 0.125, Math.sin(a2) * 1.0, 8);
}
return g;
};
P.evb_map = function () {
var g = G(), wd = M(C.royal, "wood");
[[-0.5, 0.2], [0.5, 0.2]].forEach(function (p) { var l = Cy(g, wd, 0.03, 0.03, 2.2, p[0], 1.1, p[1], 6); l.rotation.x = -0.12; });
Cy(g, wd, 0.03, 0.03, 2.0, 0, 1.0, -0.3, 6).rotation.x = 0.35;
var tex = typeof esCanvas === "function" ? esCanvas("evbmap", 256, 1, function (x, W, H) {
x.fillStyle = "#FFF0C8";
x.fillRect(0, 0, W, H);
x.fillStyle = "#7AD08A";
x.beginPath();
x.ellipse(W * 0.45, H * 0.5, W * 0.38, H * 0.32, 0.3, 0, 7);
x.fill();
x.fillStyle = "#5AB0FF";
x.beginPath();
x.ellipse(W * 0.7, H * 0.35, 26, 16, 0, 0, 7);
x.fill();
x.fillStyle = "#FF4FA0";
x.beginPath();
x.moveTo(W * 0.45, H * 0.28);
x.lineTo(W * 0.41, H * 0.4);
x.lineTo(W * 0.49, H * 0.4);
x.fill();
x.fillRect(W * 0.42, H * 0.4, W * 0.06, 14);
x.fillStyle = "#E8306E";
for (var i = 0; i < 7; i++) {
x.beginPath();
x.arc(W * (0.25 + i * 0.07), H * (0.62 + Math.sin(i) * 0.06), 5, 0, 7);
x.fill();
}
x.strokeStyle = "#8A5A2A";
x.lineWidth = 3;
x.setLineDash([6, 5]);
x.beginPath();
x.moveTo(W * 0.1, H * 0.9);
x.bezierCurveTo(W * 0.3, H * 0.6, W * 0.35, H * 0.5, W * 0.45, H * 0.42);
x.stroke();
x.setLineDash([]);
x.fillStyle = "#3A2A1A";
x.font = "bold 20px Georgia";
x.fillText("FAERIE", W * 0.36, H * 0.92);
}) : null;
if (tex)
tex.repeat.set(1, 1);
var m = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.0), tex ? new THREE.MeshLambertMaterial({ map: tex }) : M(C.cream));
m.position.set(0, 1.45, 0.14);
m.rotation.x = -0.12;
g.add(m);
B(g, wd, 1.4, 0.05, 0.12, 0, 0.92, 0.18);
return g;
};
function banner(c) {
return function () {
var g = G(), gl = GILT();
Cy(g, gl, 0.03, 0.03, 1.3, 0, 3.2, 0.08, 6).rotation.z = Math.PI / 2;
B(g, M(c, "damask"), 1.1, 2.2, 0.03, 0, 2.05, 0.06);
var t = Cone(g, M(c, "damask"), 0.55, 0.5, 0, 0.7, 0.06, 3);
t.rotation.z = Math.PI;
t.scale.set(1, 1, 0.06);
var st = new THREE.Shape();
for (var i = 0; i < 10; i++) {
var r = i % 2 ? 0.13 : 0.3, a = Math.PI / 2 + i * Math.PI / 5;
if (i)
st.lineTo(Math.cos(a) * r, Math.sin(a) * r);
else
st.moveTo(Math.cos(a) * r, Math.sin(a) * r);
}
var s = new THREE.Mesh(new THREE.ShapeGeometry(st), M(C.sun, null, { e: 0x4A3000 }));
s.position.set(0, 2.3, 0.085);
g.add(s);
return g;
};
}
P.evb_bannerpink = banner(C.pink);
P.evb_bannersky = banner(C.sky);
P.evb_bannerlilac = banner(C.lilac);
P.evb_harp = function () {
var g = G(), gl = GILT();
B(g, gl, 0.5, 0.12, 0.5, 0, 0.06, 0);
Cy(g, gl, 0.06, 0.08, 1.7, -0.25, 0.95, 0, 8);
var ar = Tor(g, gl, 0.5, 0.05, 0.1, 1.45, 0, 0);
ar.scale.set(0.7, 1, 1);
ar.rotation.z = 0.3;
for (var i = 0; i < 9; i++)
Cy(g, M(C.white), 0.006, 0.006, 1.1 - i * 0.08, -0.18 + i * 0.06, 0.8 + i * 0.04, 0, 4);
return g;
};
P.evb_crown = function () {
var g = G(), gl = GILT();
B(g, M(C.white, "marble"), 0.8, 1.0, 0.8, 0, 0.5, 0);
B(g, M(C.royal, "carpet"), 0.55, 0.12, 0.55, 0, 1.06, 0);
var cr = Cy(g, gl, 0.2, 0.2, 0.16, 0, 1.22, 0, 16);
for (var i = 0; i < 8; i++) {
var a = i * 0.785;
Cone(g, gl, 0.04, 0.12, Math.cos(a) * 0.19, 1.36, Math.sin(a) * 0.19, 6);
S(g, M([C.red, C.sky, C.mint, C.pink][i % 4], null, { e: 0x101010 }), 0.03, Math.cos(a) * 0.2, 1.22, Math.sin(a) * 0.2, 6);
}
B(g, M(0xE8F4FF, null, { op: 0.18 }), 0.78, 0.7, 0.78, 0, 1.37, 0);
return g;
};
P.evb_dollcastle = function () {
var g = G();
B(g, M(C.white, "wood"), 1.6, 0.9, 0.6, 0, 0.45 + 0.5, 0);
B(g, M(C.cream, "wood"), 1.8, 0.5, 0.8, 0, 0.25, 0);
[-0.7, 0.7].forEach(function (x) { Cy(g, M(C.white), 0.18, 0.18, 1.4, x, 1.2, 0.1, 10); Cone(g, M(C.pink), 0.24, 0.5, x, 2.15, 0.1, 10); });
Cone(g, M(C.sky), 0.3, 0.6, 0, 1.7, 0, 4).rotation.y = Math.PI / 4;
for (var i = 0; i < 4; i++)
B(g, M(C.sun, null, { e: 0x3A2A00 }), 0.14, 0.18, 0.02, -0.45 + i * 0.3, 1.05, 0.31);
return g;
};
P.evb_wands = function () {
var g = G(), wd = M(C.lilac, "wood");
B(g, wd, 1.4, 1.4, 0.1, 0, 1.3, -0.1);
B(g, wd, 1.4, 0.08, 0.3, 0, 0.65, 0.05);
for (var i = 0; i < 7; i++) {
var x = -0.54 + i * 0.18;
Cy(g, M(C.white), 0.012, 0.012, 0.6, x, 1.25, 0, 6);
var st = S(g, evbGlow([0xFFE070, 0xFF90D0, 0x90E0FF][i % 3]), 0.045, x, 1.58, 0, 6);
}
return g;
};
P.evb_icethrone = function () {
var g = G(), ice = M(C.ice, null, { op: 0.85, e: 0x10304A });
B(g, ice, 1.3, 0.5, 1.0, 0, 0.25, 0);
B(g, ice, 1.3, 0.2, 0.9, 0, 0.6, 0.02);
for (var i = 0; i < 7; i++) {
Cone(g, ice, 0.12, 1.4 + ((i * 37) % 5) * 0.25, -0.6 + i * 0.2, 1.4, -0.42, 6);
}
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_fthrone", "evb_fthrone2", "evb_well", "evb_slipper", "evb_cake", "evb_gowns", "evb_bedpink", "evb_bedsky", "evb_bedsun", "evb_bedmint", "evb_bedlilac", "evb_littlebed",
"evb_jars", "evb_coach", "evb_musicbox", "evb_bell", "evb_egg", "evb_snowglobe", "evb_toadtable", "evb_fountain", "evb_cauldron", "evb_crown", "evb_dollcastle", "evb_icethrone", "evb_spindle", "evb_lectern", "evb_harp", "evb_rocking"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
EVB_THEMES.fairycastle = {
seed: 11, panel: 0xFFE2F2,
pal: { fab: "blush", fab2: "teal", wood: "white", metal: "gold", stone: "rose", art: 6, rug: 2, rugv: 1 },
remap: { "D6D0C6|plaster": [0xFFF0FA, "plaster"], "D8D0C0|coffer": [0xFFE4F4, "coffer"], "B8AE9E|marble": [0xF8C8E8, "marble"], "D4CEC4|marble": [0xF0E0FF, "marble"] },
hello: "🏰 <b>Inside the Fairy Castle.</b> Three floors of rooms out of the old fairy tales: the Throne Room, the Grand Ballroom, the Wishing Well, the Magic Mirror, the Spinning Room at the top. Look for the ✨ cards. Walk out through the front doors to leave."
};
if (typeof ES_HOUSES !== "undefined")
ES_HOUSES.evb_fairycastle = { g: { X: 28, Z: 24, hx: 8, hd: 14, s: 3.5, g0: -14, g1: -10, m: 0, xi: 16, x1: 18, c: 6, x4: 17 }, h: 4.6, levels: 3, stairX: 4.5, stairZ: 13,
floors: ["The royal floor", "The royal chambers", "The tower tops"],
wall: 0xFFE8F4, trim: 0xB8985A,
plan: [
{ hall: { k: "fyhall", n: "The Great Hall of Roses" }, spine: { k: "fyslippers", n: "The Glass Slipper Gallery" }, gallery: { k: "fyrainbow", n: "The Rainbow Corridor" },
r1i: { k: "fyparlour", n: "The Rose Parlour" }, r1o: { k: "fymusic", n: "The Harp Room" },
r2i: { k: "fylibrary", n: "The Storybook Library" }, r2o: { k: "fymirror", n: "The Room of the Magic Mirror" },
r3i: { k: "fytreasury", n: "The Royal Treasury", more: [{ s: "n" }] }, r3o: { k: "fybutterfly", n: "The Butterfly Conservatory" },
c4: { k: "fywell", n: "The Wishing Well Court" }, r4: { merge: ["r4i", "r4o"], k: "fythrone", n: "The Throne Room" },
l1i: { split: "across", at: 0.64, parts: [{ k: "fysun", n: "The Sunshine Room" }, { k: "fypowder", n: "The Powder Room" }] }, l1o: { k: "fytea", n: "The Toadstool Tea Room" },
l2i: { k: "fybanquet", n: "The Banquet Hall" }, l2o: { k: "fysweets", n: "The Sweet Pantry" },
l3i: { k: "fykitchen", n: "The Royal Kitchen", more: [{ s: "w" }] }, l3o: { k: "fypastry", n: "The Pastry Room", more: [{ s: "s" }] },
l4: { merge: ["l4i", "l4o"], k: "fyball", n: "The Grand Ballroom" } },
{ hall: { k: "fylanding", n: "The Star Landing" }, spine: { k: "fytales", n: "The Gallery of Fairy Tales" }, gallery: { k: "fymoon", n: "The Moonlit Corridor" },
r1i: { k: "fyprincess", n: "The Princess's Bedchamber" }, r1o: { split: "across", parts: [{ k: "fywardrobe", n: "The Royal Wardrobe" }, { k: "fyshoes", n: "The Slipper Closet" }] },
r2i: { k: "fybath", n: "The Royal Bath", doors: [{ s: "s", at: 12 }] }, r2o: { k: "fyqueen", n: "The Queen's Sitting Room", doors: [{ s: "s", at: 23 }] },
r3i: { split: "along", at: 0.66, parts: [{ k: "fyguest", n: "The Bluebell Room", tint: 0x6AB8FF }, { k: "fyensuite", n: "The Bluebell Bath" }] },
r3o: { split: "along", at: 0.62, parts: [{ k: "fyguest", n: "The Buttercup Room", tint: 0xFFD84A }, { k: "fyensuite", n: "The Buttercup Bath" }] },
c4: { k: "fygodmother", n: "The Fairy Godmother's Workroom" },
r4i: { split: "along", at: 0.66, parts: [{ k: "fyguest", n: "The Rosebud Room", tint: 0xFF8AC0 }, { k: "fyensuite", n: "The Rosebud Bath" }] },
r4o: { k: "fydolls", n: "The Dolls' Castle Room" },
l1i: { k: "fynursery", n: "The Royal Nursery" }, l1o: { k: "fypixie", n: "The Pixie Loft" },
l2i: { k: "fytoys", n: "The Toy Room" }, l2o: { k: "fybubble", n: "The Bubble Bath Room" },
l3i: { k: "fyprince", n: "The Prince's Chamber" }, l3o: { k: "fyguard", n: "The Knights' Guard Room" },
l4i: { k: "fypaint", n: "The Painting Room" },
l4o: { split: "across", parts: [{ k: "fylinen", n: "The Linen Room" }, { k: "fysewing", n: "The Sewing Room" }] } },
{ hall: { k: "fytower", n: "The Tower Landing" }, spine: { k: "fybanners", n: "The Banner Gallery" }, gallery: { k: "fybattle", n: "The Battlement Walk" },
r1i: { k: "fyspindle", n: "The Spinning Room" }, r1o: { k: "fystar", n: "The Star Tower" },
r2i: { k: "fyrapunzel", n: "Rapunzel's Tower Room" }, r2o: { k: "fycrown", n: "The Crown Jewel Room" },
r3: { merge: ["r3i", "r3o"], k: "fysky", n: "The Sky Garden" },
c4: { k: "fybell", n: "The Bell Tower" }, r4i: { k: "fymaps", n: "The Map Room of Faerie" }, r4o: { k: "fypotion", n: "The Potion Tower" },
l1i: { k: "fydragon", n: "The Dragon's Egg Room" }, l1o: { k: "fyguest", n: "The Lilac Turret", tint: 0xC890FF },
l2i: { split: "across", parts: [{ k: "fyturret", n: "The Mint Turret" }, { k: "fyturret", n: "The Coral Turret" }] },
l2o: { k: "fylookout", n: "The Lookout", doors: [{ s: "n" }] },
l3i: { split: "across", parts: [{ k: "fystudy", n: "The King's Study" }, { k: "fyowl", n: "The Owl Roost" }] },
l3o: { k: "fyattic", n: "The Treasure Attic" },
l4i: { k: "fysnow", n: "The Snow Queen's Room" }, l4o: { k: "fymusicbox", n: "The Music Box Room" } }
] };
if (typeof ES_FINISH !== "undefined")
(function () {
var G = 0xB8985A, F = {
fyhall: { f: "checker", fc: 0xFFD0E8, w: 0xFFC8E4, p: "damask", t: G, c: "coffer" },
fyslippers: { f: "marble", fc: 0xE8F0FF, w: 0x9AC8FF, p: "damask", t: G },
fyrainbow: { f: "herring", fc: 0xFFE0A8, w: 0xB8F0D8, p: "stripe", t: G },
fyparlour: { f: "carpet", fc: 0xE8306E, w: 0xFF9AC8, p: "damask", t: G, c: "coffer" },
fymusic: { f: "herring", fc: 0xF0C890, w: 0xB8A0FF, p: "stripe", t: G, c: "coffer" },
fylibrary: { f: "wood", fc: 0xB07A50, w: 0x3A68D8, p: "damask", t: G },
fymirror: { f: "marble", fc: 0xF0E8FF, w: 0xC8A8FF, p: "marble", t: G, c: "coffer" },
fytreasury: { f: "checker", fc: 0xFFE8A0, w: 0xFFC830, p: "damask", t: G },
fybutterfly: { f: "checker", fc: 0xE8FFE8, w: 0x9AF0B8, p: "plaster", t: 0xFFFFFF },
fywell: { f: "stone", fc: 0xE8E0F8, w: 0xA8E8FF, p: "stone", t: G },
fythrone: { f: "carpet", fc: 0x3A5CE8, w: 0xFF6AAE, p: "damask", t: G, c: "coffer" },
fysun: { f: "wood", fc: 0xF0C890, w: 0xFFE060, p: "stripe", t: 0xFFFFFF },
fypowder: { f: "marble", fc: 0xFFE8F4, w: 0xFFB8D8, p: "tile", t: G },
fytea: { f: "herring", fc: 0xE8C898, w: 0x8AE8C0, p: "damask", t: G },
fybanquet: { f: "herring", fc: 0xD8A878, w: 0xE8306E, p: "damask", t: G, c: "coffer" },
fysweets: { f: "tile", fc: 0xFFE8F0, w: 0xFFC0E0, p: "tile", t: 0xFFFFFF },
fykitchen: { f: "checker", fc: 0xFFF0F0, w: 0x9AE0FF, p: "tile", t: 0xFFFFFF },
fypastry: { f: "tile", fc: 0xFFF4E0, w: 0xFFD8A0, p: "tile", t: 0xFFFFFF },
fyball: { f: "marble", fc: 0xFFF0FA, w: 0x7AB8FF, p: "damask", t: G, c: "coffer" },
fylanding: { f: "carpet", fc: 0x3A5CE8, w: 0xFFD0EC, p: "damask", t: G, c: "coffer" },
fytales: { f: "herring", fc: 0xE8C090, w: 0xFFE070, p: "damask", t: G },
fymoon: { f: "carpet", fc: 0x2A3A9A, w: 0xB8C8FF, p: "stripe", t: G },
fyprincess: { f: "carpet", fc: 0xFF7AB8, w: 0xFFC0E0, p: "damask", t: G, c: "coffer" },
fywardrobe: { f: "carpet", fc: 0xC890FF, w: 0xFFD8F0, p: "stripe", t: G },
fyshoes: { f: "marble", fc: 0xE0F0FF, w: 0xA8D8FF, p: "stripe", t: G },
fybath: { f: "marble", fc: 0xF0FAFF, w: 0x9AE8FF, p: "marble", t: G },
fyqueen: { f: "carpet", fc: 0x8A2AB8, w: 0xE0B0FF, p: "damask", t: G, c: "coffer" },
fyguest: { f: "carpet", fc: 0xFFF0FA, w: 0xFFC8E4, p: "damask", t: G },
fyensuite: { f: "marble", fc: 0xF4FAFF, w: 0xD8F0FF, p: "tile", t: G },
fygodmother: { f: "wood", fc: 0xC890FF, w: 0x7A5AE8, p: "damask", t: G },
fydolls: { f: "wood", fc: 0xF0C890, w: 0xFFB0D0, p: "stripe", t: 0xFFFFFF },
fynursery: { f: "carpet", fc: 0xB8E8FF, w: 0xFFF0A0, p: "stripe", t: 0xFFFFFF },
fypixie: { f: "wood", fc: 0x9A6A4A, w: 0x2A9A8A, p: "plaster", t: G },
fytoys: { f: "wood", fc: 0xF0C080, w: 0x6AD8FF, p: "stripe", t: 0xFFFFFF },
fybubble: { f: "tile", fc: 0xE8F8FF, w: 0x8AE0E8, p: "tile", t: 0xFFFFFF },
fyprince: { f: "carpet", fc: 0x2A4AC8, w: 0x8AB8FF, p: "damask", t: G },
fyguard: { f: "stone", fc: 0xC8C0D8, w: 0xB8B0E0, p: "stone", t: G },
fypaint: { f: "wood", fc: 0xF0D0A0, w: 0xFFF4D8, p: "plaster", t: 0xFFFFFF },
fylinen: { f: "wood", fc: 0xE8D0B0, w: 0xF0F8FF, p: "plaster", t: 0xFFFFFF },
fysewing: { f: "wood", fc: 0xE8C8A0, w: 0xFFC8E0, p: "stripe", t: 0xFFFFFF },
fytower: { f: "stone", fc: 0xE8E0F8, w: 0xFFD8F0, p: "stone", t: G },
fybanners: { f: "herring", fc: 0xE8C090, w: 0xFFFFFF, p: "stone", t: G },
fybattle: { f: "stone", fc: 0xD8D0E8, w: 0xE8E0FF, p: "stone", t: G },
fyspindle: { f: "wood", fc: 0xC09060, w: 0xE8C8FF, p: "stone", t: G },
fystar: { f: "wood", fc: 0x3A2A6A, w: 0x1A2A6A, p: "plaster", t: G },
fyrapunzel: { f: "wood", fc: 0xD8A870, w: 0xFFE8A0, p: "stone", t: G },
fycrown: { f: "marble", fc: 0xFFF0D0, w: 0xE8306E, p: "damask", t: G, c: "coffer" },
fysky: { f: "stone", fc: 0xC8F0C8, w: 0x9AD8FF, p: "plaster", t: 0xFFFFFF },
fybell: { f: "stone", fc: 0xD8D0C8, w: 0xFFE0B0, p: "stone", t: G },
fymaps: { f: "wood", fc: 0xB08860, w: 0x6AC88A, p: "damask", t: G },
fypotion: { f: "stone", fc: 0x8A80A0, w: 0x5AC8A0, p: "stone", t: G },
fydragon: { f: "stone", fc: 0xC8B8A0, w: 0xFF9A60, p: "stone", t: G },
fyturret: { f: "carpet", fc: 0xFFF0F8, w: 0x8AE8C0, p: "damask", t: G },
fylookout: { f: "stone", fc: 0xD0C8E0, w: 0xA8D8FF, p: "stone", t: G },
fystudy: { f: "wood", fc: 0x9A6A40, w: 0x3AA870, p: "damask", t: G },
fyowl: { f: "wood", fc: 0xA87A50, w: 0xE8D8B0, p: "wood", t: G },
fyattic: { f: "wood", fc: 0xA88060, w: 0xE8C8A0, p: "wood", t: G },
fysnow: { f: "marble", fc: 0xE8F8FF, w: 0xBFEFFF, p: "marble", t: 0xFFFFFF },
fymusicbox: { f: "herring", fc: 0xE8C090, w: 0xFF9AD0, p: "stripe", t: G }
};
Object.keys(F).forEach(function (k) { ES_FINISH[k] = F[k]; });
})();
"use strict";
(function () {
if (typeof FURN === "undefined")
return;
var C = EVB_C, M = evbM;
function G() { return new THREE.Group(); }
function B(g, mat, w, h, d, x, y, z) { var m = new THREE.Mesh(evbGeo("b", w, h, d), mat); m.position.set(x, y, z); g.add(m); return m; }
function Cy(g, mat, rt, rb, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("c", rt, rb, h, seg || 12), mat); m.position.set(x, y, z); g.add(m); return m; }
function S(g, mat, r, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("s", r, seg || 10), mat); m.position.set(x, y, z); g.add(m); return m; }
FURN.evb_butterflies = function () {
var g = G(), ring = G();
ring.position.y = 2.6;
g.add(ring);
var cols = [C.sky, C.sun, C.pink, C.lilac, C.coral, C.mint, C.royal, C.orange];
cols.forEach(function (c, i) {
var a = i * 0.785, r = 1.2 + (i % 3) * 0.5, b = G();
b.position.set(Math.cos(a) * r, (i % 3) * 0.35 - 0.3, Math.sin(a) * r);
b.rotation.y = -a;
var wm = M(c, null, { side: 1, e: 0x101010 });
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.CircleGeometry(0.11, 10), wm); w.position.set(s * 0.09, 0, 0); w.rotation.set(-Math.PI / 2 + s * 0.5, 0, 0); w.scale.set(1, 1.4, 1); b.add(w); });
Cy(b, M(0x2A1A10), 0.012, 0.012, 0.16, 0, 0, 0, 5).rotation.x = Math.PI / 2;
ring.add(b);
});
evbSpinMark(ring, 0.35);
return g;
};
FURN.evb_candy = function () {
var g = G(), wd = M(C.white, "wood"), cols = [C.pink, C.sky, C.sun, C.mint, C.coral, C.lilac];
B(g, wd, 1.6, 1.9, 0.04, 0, 0.95, -0.2);
for (var r = 0; r < 3; r++) {
B(g, wd, 1.56, 0.04, 0.42, 0, 0.4 + r * 0.6, 0);
for (var c = 0; c < 4; c++) {
var x = -0.55 + c * 0.37, y = 0.42 + r * 0.6;
Cy(g, M(0xE8F4FF, null, { op: 0.3 }), 0.13, 0.13, 0.4, x, y + 0.2, 0, 12);
Cy(g, M(cols[(r * 4 + c) % 6]), 0.024, 0.024, 0.04, x, y + 0.43, 0, 8);
for (var k = 0; k < 5; k++)
S(g, M(cols[(r + c + k) % 6]), 0.045, x + ((k % 2) - 0.5) * 0.1, y + 0.06 + k * 0.06, ((k % 3) - 1) * 0.05, 6);
}
}
return g;
};
FURN.evb_easel = function () {
var g = G(), wd = M(0xC09060, "wood");
[[-0.45, 0.2], [0.45, 0.2]].forEach(function (p) { var l = Cy(g, wd, 0.025, 0.025, 1.9, p[0], 0.95, p[1], 6); l.rotation.x = -0.1; });
Cy(g, wd, 0.025, 0.025, 1.8, 0, 0.9, -0.3, 6).rotation.x = 0.3;
var t = typeof esCanvas === "function" ? esCanvas("evbpaint", 128, 1, function (x, W, H) {
x.fillStyle = "#FFFFFF";
x.fillRect(0, 0, W, H);
x.fillStyle = "#7AD0FF";
x.fillRect(0, 0, W, H * 0.55);
x.fillStyle = "#6AD06A";
x.fillRect(0, H * 0.55, W, H * 0.45);
x.fillStyle = "#FF4FA0";
x.fillRect(W * 0.38, H * 0.3, W * 0.24, H * 0.3);
x.beginPath();
x.moveTo(W * 0.34, H * 0.3);
x.lineTo(W * 0.5, H * 0.12);
x.lineTo(W * 0.66, H * 0.3);
x.fill();
x.fillStyle = "#FFE040";
x.beginPath();
x.arc(W * 0.82, H * 0.16, 10, 0, 7);
x.fill();
}) : null;
if (t)
t.repeat.set(1, 1);
var p = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.65), t ? new THREE.MeshLambertMaterial({ map: t }) : M(C.white));
p.position.set(0, 1.35, 0.18);
p.rotation.x = -0.1;
g.add(p);
B(g, wd, 0.9, 0.04, 0.12, 0, 0.98, 0.2);
var pal = Cy(g, M(0xD8B080), 0.18, 0.18, 0.02, 0.6, 0.8, 0.3, 14);
[C.red, C.sun, C.sky, C.pink, C.mint].forEach(function (c, i) { S(g, M(c), 0.025, 0.6 + Math.cos(i) * 0.11, 0.82, 0.3 + Math.sin(i) * 0.11, 6); });
Cy(g, M(0xC09060, "wood"), 0.04, 0.06, 0.78, 0.6, 0.39, 0.3, 6);
return g;
};
FURN.evb_owl = function () {
var g = G(), wd = M(0x8A6A4A, "wood"), f = M(0xC8A070, "damask");
Cy(g, wd, 0.04, 0.06, 1.6, 0, 0.8, 0, 6);
Cy(g, wd, 0.03, 0.03, 0.6, 0, 1.6, 0, 6).rotation.z = Math.PI / 2;
Cy(g, wd, 0.25, 0.3, 0.06, 0, 0.03, 0, 10);
var b = S(g, f, 0.16, 0, 1.82, 0, 12);
b.scale.set(1, 1.3, 0.9);
S(g, f, 0.12, 0, 2.05, 0.02, 10);
[-0.05, 0.05].forEach(function (x) { S(g, M(C.sun, null, { e: 0x4A3A00 }), 0.035, x, 2.07, 0.11, 8); S(g, M(0x101010), 0.015, x, 2.07, 0.14, 6); });
return g;
};
FURN.evb_column = function () {
var g = G(), st = M(C.white, "marble"), gl = evbGilt();
B(g, st, 0.9, 0.3, 0.9, 0, 0.15, 0);
Cy(g, gl, 0.36, 0.4, 0.12, 0, 0.36, 0, 16);
Cy(g, st, 0.3, 0.34, 3.5, 0, 2.15, 0, 16);
Cy(g, gl, 0.4, 0.32, 0.2, 0, 4.0, 0, 16);
B(g, st, 0.9, 0.3, 0.9, 0, 4.25, 0);
for (var i = 0; i < 3; i++)
Cy(g, M([C.pink, C.sky, C.lilac][i]), 0.32, 0.32, 0.06, 0, 1.2 + i * 1.0, 0, 16);
return g;
};
FURN.evb_wallmirror = function () {
var g = G(), gl = evbGilt();
var fr = new THREE.Mesh(evbGeo("t", 0.5, 0.06), gl);
fr.position.set(0, 1.7, 0.05);
fr.scale.set(1, 1.4, 1);
g.add(fr);
var gm = new THREE.Mesh(new THREE.CircleGeometry(0.48, 28), M(0xE0E8FF, null, { e: 0x30285A }));
gm.position.set(0, 1.7, 0.04);
gm.scale.set(1, 1.4, 1);
g.add(gm);
S(g, M(C.pink), 0.07, 0, 2.45, 0.07, 8);
return g;
};
FURN.evb_rug_dance = function () {
var g = G(), cols = [C.pink, C.sun, C.mint, C.sky, C.lilac, C.coral];
for (var i = 0; i < 6; i++) {
var r0 = 3.0 - i * 0.42;
var m = new THREE.Mesh(new THREE.RingGeometry(r0 - 0.4, r0, 48), M(cols[i], "marble"));
m.rotation.x = -Math.PI / 2;
m.position.y = 0.012 + i * 0.001;
g.add(m);
}
var st = new THREE.Shape();
for (var k = 0; k < 10; k++) {
var rr = k % 2 ? 0.35 : 0.75, a = Math.PI / 2 + k * Math.PI / 5;
if (k)
st.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
else
st.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
}
var s = new THREE.Mesh(new THREE.ShapeGeometry(st), evbGilt());
s.rotation.x = -Math.PI / 2;
s.position.y = 0.02;
g.add(s);
return g;
};
FURN.evb_flowerbed = function () {
var g = G(), cols = [C.pink, C.sun, C.sky, C.lilac, C.coral, C.white, C.red];
B(g, M(C.white, "stone"), 2.4, 0.5, 0.9, 0, 0.25, 0);
B(g, M(0x5A3A24), 2.3, 0.06, 0.8, 0, 0.5, 0);
for (var i = 0; i < 14; i++) {
var x = -1.0 + (i % 7) * 0.33, z = (i < 7 ? -0.2 : 0.2);
Cy(g, M(C.leaf), 0.015, 0.015, 0.35, x, 0.68, z, 4);
S(g, M(cols[(i * 3) % 7]), 0.09, x, 0.88, z, 8);
S(g, M(C.leaf), 0.07, x + 0.08, 0.6, z, 6);
}
return g;
};
FURN.evb_sleigh = function () {
var g = G(), wm = M(C.white, "damask"), gl = evbGilt();
B(g, wm, 1.2, 0.6, 2.0, 0, 0.7, 0);
B(g, wm, 1.2, 1.0, 0.2, 0, 1.2, -0.9);
var front = Cy(g, wm, 0.6, 0.6, 1.2, 0, 0.9, 1.0, 16, true);
front.rotation.z = Math.PI / 2;
front.scale.set(1, 1, 0.6);
[-0.55, 0.55].forEach(function (x) { B(g, gl, 0.06, 0.06, 2.4, x, 0.12, 0); var c = Cy(g, gl, 0.03, 0.03, 0.6, x, 0.35, 1.25, 6); c.rotation.x = 0.8; });
B(g, M(C.ice, "carpet"), 1.0, 0.12, 1.0, 0, 1.05, -0.3);
return g;
};
FURN.evb_icepillar = function () {
var g = G(), ice = M(C.ice, null, { op: 0.8, e: 0x10304A });
Cy(g, ice, 0.25, 0.4, 3.2, 0, 1.6, 0, 6);
for (var i = 0; i < 4; i++) {
var c = Cy(g, ice, 0.05, 0.14, 0.9, Math.cos(i * 1.6) * 0.3, 0.5 + i * 0.5, Math.sin(i * 1.6) * 0.3, 5);
c.rotation.z = Math.cos(i * 1.6) * 0.6;
c.rotation.x = Math.sin(i * 1.6) * 0.6;
}
return g;
};
if (typeof SOLIDFURN !== "undefined") {
SOLIDFURN.evb_candy = 1;
SOLIDFURN.evb_easel = 1;
SOLIDFURN.evb_column = 1;
SOLIDFURN.evb_flowerbed = 1;
SOLIDFURN.evb_sleigh = 1;
SOLIDFURN.evb_icepillar = 1;
}
})();
function evbActAt(ctx, x, z, r, name, verb, fn) { if (EVB.building)
EVB.building.push({ x: x, z: z, L: ctx.L || 0, r: r || 1.8, name: name, verb: verb, fn: fn }); }
function evbPut(A) { return function (k, x, z, rot) { if (k && FURN[k])
A.put(k, x, z, rot || 0); }; }
function evbLift(k, h) { var X = esX(); return X && k ? X.on(k, h) : k; }
function evbNear(ways, x, z, d) { return (ways || []).some(function (q) { var px = q.o === "h" ? q.at : q.c, pz = q.o === "h" ? q.c : q.at; return Math.hypot(px - x, pz - z) < (d || 1.8); }); }
(function () {
if (typeof ES_ROOM === "undefined")
return;
var R = ES_ROOM;
R.fyhall = function (P, A, ctx) {
var r = P.r, put = evbPut(A), front = r.z1, sx = ctx.up ? ctx.up.x : -4.5, ox = -sx > 0 ? r.x1 : r.x0, sgn = ox > 0 ? -1 : 1;
put("redrunner", 0, front - 6, 0);
put("redrunner", 0, r.z0 + 3, 0);
put("evb_arch", 0, front - 1.6, 0);
put("evb_fountain", -sx * 0.95, front - 8.5, 0);
put("evb_bannerpink", ox + sgn * 0.08, front - 3, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put("evb_bannersky", ox + sgn * 0.08, front - 11.5, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put("evb_bannerlilac", -ox - sgn * 0.08, r.z0 + 1.4, sgn > 0 ? -Math.PI / 2 : Math.PI / 2);
put("espalm", r.x0 + 0.9, front - 0.9, 0);
put("espalm", r.x1 - 0.9, front - 0.9, 0);
put("espalm", r.x0 + 0.9, r.z0 + 0.9, 0);
put("espalm", r.x1 - 0.9, r.z0 + 0.9, 0);
put("evb_toadstool", ox + sgn * 0.6, front - 5.2, 0);
put("evb_toadstool", ox + sgn * 0.6, front - 6.6, 0);
var ch = evbLift("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100);
put(ch, 0, front - 5, 0);
put(ch, 0, r.z0 + 3, 0);
A.spots.push({ x: 0, z: front - 4, room: "great hall", level: ctx.L }, { x: -sx, z: front - 12, room: "great hall", level: ctx.L });
evbActAt(ctx, ox + sgn * 1.6, front - 4.2, 1.8, "The castle guide", "see what is in every room", evbGuide);
};
R.fyslippers = function (P, A, ctx) {
var r = P.r, put = evbPut(A), len = r.z1 - r.z0, n = Math.max(1, Math.floor(len / 4)), ways = ctx.ways;
put("redrunner", 0, (r.z0 + r.z1) / 2, 0);
put("evb_slipper", 0, (r.z0 + r.z1) / 2, 0);
for (var i = 0; i < n; i++) {
var z = r.z0 + len * (i + 0.5) / n;
if (!evbNear(ways, r.x0, z))
put(esArt(ES_ART++), r.x0 + 0.16, z, Math.PI / 2);
if (!evbNear(ways, r.x1, z))
put(i % 2 ? "evb_bannerpink" : "evb_bannersky", r.x1 - 0.08, z, -Math.PI / 2);
put(evbLift("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100), 0, z, 0);
}
put("espalm", r.x0 + 0.7, r.z0 + 0.7, 0);
put("espalm", r.x1 - 0.7, r.z0 + 0.7, 0);
evbActAt(ctx, 0, (r.z0 + r.z1) / 2 + 1.2, 1.7, "The glass slipper", "try it on", evbSlipper);
A.spots.push({ x: 0, z: r.z0 + 2, room: "gallery", level: ctx.L });
};
R.fyrainbow = function (P, A, ctx) {
var r = P.r, put = evbPut(A), ways = ctx.ways, len = r.x1 - r.x0, zc = (r.z0 + r.z1) / 2, n = Math.max(2, Math.floor(len / 6));
for (var i = 0; i < n; i++) {
var x = r.x0 + len * (i + 0.5) / n;
if (Math.abs(x) < 4)
continue;
if (!evbNear(ways, x, r.z0, 2.2) && !evbNear(ways, x, r.z1, 2.2))
put("evb_arch", x, zc, Math.PI / 2);
else if (!evbNear(ways, x, r.z0))
put(esArt(ES_ART++), x, r.z0 + 0.16, 0);
put(evbLift(esMt("qf_lightceiling1"), Math.round((ctx.H - 0.04 - 3.15) * 100) / 100), x, zc, 0);
}
put("espalm", r.x0 + 0.7, zc, 0);
put("espalm", r.x1 - 0.7, zc, 0);
A.spots.push({ x: r.x0 + 3, z: zc, room: "corridor", level: ctx.L });
};
R.fyparlour = function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esSt("qf_fireplace"), 0);
P.small(esWd("clock_mantel"), w - 0.3, 0, "-u");
esSalon(P, w - 3.4, 0, { rug: 2, design: true, four: true });
P(esFab("kf_loungechair"), 2.4, B + 1.6, P.face(2.4, B + 1.6, w * 0.5, 0));
P(esFab("kf_loungechair"), 2.4, F - 1.6, P.face(2.4, F - 1.6, w * 0.5, 0));
P.wall("B", "evb_bannerpink", w * 0.5);
P.wall("F", "evb_harp", w * 0.55);
esArts(P, "B", 2, 1.2, w - 2);
P.wall("F", "displaycase", w * 0.25);
esPlants(P);
P.ceil(esMt("qf_lightchandelier"), w - 3.4, 0);
P.ceil("chandelier", 2.6, 0);
P.spot(w - 5, 1.5);
P.spot(3, 0);
evbAct(P, { L: 0 }, 1.4, 0, 1.6, "Fairy fortune cards", "draw a card", evbFortune);
};
R.fymusic = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_harp", w - 2.2, -1.6, "-u");
P(esWd("kf_chaircushion"), w - 1.5, -1.6, "-u");
P("piano", w - 2.4, 1.8, "-u");
P(esWd("kf_chaircushion"), w - 1.5, 1.8, "-u");
P("esstand", w - 3.6, -0.2, "-u");
P("esstand", w - 3.6, 0.8, "-u");
for (var v = B + 1.4; v < F - 1.2; v += 1.2)
P(esWd("kf_chaircushion"), 2.8, v, "+u");
P.wall("B", "evb_bannerlilac", w * 0.5);
P.wall("F", "evb_bannersky", w * 0.5);
esArts(P, "far", 2);
P("espalm", 0.7, B + 0.7, 0);
P("espalm", 0.7, F - 0.7, 0);
P.ceil("chandelier", w * 0.5, 0);
P.spot(3.6, 0);
evbAct(P, ctx, w - 3.2, -1.6, 1.6, "The golden harp", "play it", evbHarp);
};
R.fylibrary = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.0; u < w - 0.6; u += 1.7) {
P.wall("B", "esbookcase", u);
P.wall("F", "esbookcase", u);
}
for (var v = B + 1.0; v < F - 0.6; v += 1.7)
P.wall("far", "esbookcase", v);
P("evb_lectern", w * 0.5, 0, "-u");
P(esRug(1), w * 0.5, 0, "+u");
P(esFab("kf_loungechairrelax"), w * 0.5 - 1.8, -1.4, P.face(w * 0.5 - 1.8, -1.4, w * 0.5, 0));
P(esFab("kf_loungechairrelax"), w * 0.5 - 1.8, 1.4, P.face(w * 0.5 - 1.8, 1.4, w * 0.5, 0));
P("evb_toadstool", w * 0.5 + 1.4, -1.2, 0);
P("evb_toadstool", w * 0.5 + 1.4, 1.2, 0);
P("evb_toadstool", w * 0.5 + 1.8, 0, 0);
P("esglobe", w - 1.6, B + 1.8, 0);
P.ceil(esMt("qf_lightchandelier"), w * 0.5, 0);
P.spot(w * 0.5 - 1, 1.6);
evbAct(P, ctx, w * 0.5 - 0.9, 0, 1.5, "The storybook", "read a fairy tale", evbStory);
};
R.fymirror = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_mirror", 0);
for (var u = 1.6; u < w - 1.2; u += 2.2) {
P.wall("B", "evb_wallmirror", u);
P.wall("F", "evb_wallmirror", u);
}
P(esRug(4), w - 3, 0, "+u");
P("candles", w - 1.2, -1.8, 0);
P("candles", w - 1.2, 1.8, 0);
P(esFab("kf_loungechair"), w - 4.2, -1.0, "+u");
P(esFab("kf_loungechair"), w - 4.2, 1.0, "+u");
P("espalm", 0.7, B + 0.7, 0);
P("espalm", 0.7, F - 0.7, 0);
P.ceil("chandelier", w - 3, 0);
P.spot(w - 4.5, 0);
evbAct(P, ctx, w - 1.5, 0, 1.8, "The Magic Mirror", "say “Mirror, mirror, on the wall”", evbMirror);
};
R.fytreasury = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("goldhoard", w - 2.2, 0, 0);
P("treasurechest", w - 1.2, B + 1.4, "-u");
P("treasurechest", w - 1.2, F - 1.4, "-u");
P("treasurechest", w * 0.5, B + 0.9, "+v");
P("goldpile", w * 0.5, F - 1.1, 0);
P("gemheap", 2.4, B + 1.2, 0);
P("crownstand", 2.4, F - 1.2, 0);
P("goldcolumn", w * 0.5 - 1.6, 0, 0);
P("goldcolumn", w * 0.5 + 1.6, 0, 0);
P.wall("B", "evb_bannerpink", w * 0.75);
P.wall("F", "evb_bannersky", w * 0.75);
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.5, 1.2);
evbAct(P, ctx, w - 2.4, B + 1.6, 1.6, "A treasure chest", "lift the lid", evbChest);
};
R.fybutterfly = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_butterflies", w * 0.5, 0, 0);
P("evb_arch", w * 0.5, B + 0.9, "+v");
P("evb_arch", w * 0.5, F - 0.9, "-v");
for (var u = 1.6; u < w - 1.2; u += 2.8) {
P.wall("B", "evb_flowerbed", u);
P.wall("F", "evb_flowerbed", u);
}
P("espalm", w - 0.9, B + 0.9, 0);
P("espalm", w - 0.9, F - 0.9, 0);
P.wall("far", "evb_flowerbed", -1.6);
P.wall("far", "evb_flowerbed", 1.6);
P(esWd("kf_benchcushion") || esWd("kf_bench"), w * 0.5 - 2.2, 0, "+u");
P(esWd("kf_benchcushion") || esWd("kf_bench"), w * 0.5 + 2.2, 0, "-u");
P.spot(w * 0.5, 1.5);
evbAct(P, ctx, w * 0.5, 0, 2.2, "The butterflies", "watch them", evbButterfly);
};
R.fywell = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_well", w * 0.55, 0, "-u");
[[-2.6, 0], [-1.9, -1.9], [-1.9, 1.9], [0, -2.7], [0, 2.7]].forEach(function (o) { P("evb_toadstool", w * 0.55 + o[0], o[1], 0); });
P.wall("far", "evb_arch", 0);
P("espalm", w - 0.9, B + 0.9, 0);
P("espalm", w - 0.9, F - 0.9, 0);
for (var u = 1.4; u < w - 1; u += 2.4) {
P.wall("B", "plant", u);
P.wall("F", "plant", u);
}
P.ceil("chandelier", w * 0.55, 0);
P.spot(w * 0.3, 1.4);
evbAct(P, ctx, w * 0.55 - 1.3, 0, 1.6, "The wishing well", "toss in a coin and make a wish", evbWish);
};
R.fythrone = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("redrunner", w * 0.5, 0, "+u");
P.wall("far", "evb_fthrone", 0.0);
P.wall("far", "evb_fthrone2", -2.0);
P.wall("far", "evb_fthrone2", 2.0);
P.wall("far", "evb_bannerpink", -4.2);
P.wall("far", "evb_bannersky", 4.2);
P.wall("far", "evb_bannerlilac", -7.5);
P.wall("far", "evb_bannerlilac", 7.5);
for (var u = 2; u < w - 1.5; u += 2.6) {
P("evb_column", u, -3.4, 0);
P("evb_column", u, 3.4, 0);
}
P("espalm", w - 1, B + 0.9, 0);
P("espalm", w - 1, F - 0.9, 0);
P("espalm", 0.9, B + 0.9, 0);
P("espalm", 0.9, F - 0.9, 0);
P("crownstand", w - 2.6, -5.6, 0);
P("goldstatue", w - 1.4, B + 3.2, "+v");
P("goldstatue", w - 1.4, F - 3.2, "-v");
for (var v = B + 4; v < F - 3.5; v += 3.2) {
if (Math.abs(v) > 4)
P.ceil("chandelier", w * 0.5, v);
}
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.5, 1.6);
P.spot(w - 3, 0);
evbAct(P, ctx, w - 3.4, -5.6, 1.6, "The fairy crown", "kneel to be crowned", evbCrowned);
};
R.fysun = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P(esFab("kf_loungechairrelax"), w - 1.6, B + 1.4, P.face(w - 1.6, B + 1.4, w * 0.5, 0));
P(esFab("kf_loungechairrelax"), w - 1.6, F - 1.4, P.face(w - 1.6, F - 1.4, w * 0.5, 0));
P(esWd("kf_tableround"), w * 0.5, 0, 0);
P("evb_toadstool", w * 0.5 - 0.9, 0, 0);
P("evb_toadstool", w * 0.5 + 0.9, 0, 0);
P.wall("B", "plant", 1.2);
P.wall("F", "plant", 1.2);
P(esRug(2), w * 0.5, 0, "+u");
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.5, 1);
evbAct(P, ctx, w * 0.5, 0, 1.6, "The sunshine window", "feel the sun", function () { evbCard("The Sunshine Room", "The fairies say sunlight is made of every colour at once, and they are right: a prism (or a rainbow) splits white light into red, orange, yellow, green, blue, indigo and violet. Isaac Newton showed this in 1666 with a glass prism in a dark room."); });
};
R.fypowder = function (P) {
var w = P.w, B = P.B, F = P.F;
if (P.d >= P.w) {
P.wall("far", esSt("kf_bathroomsink"), 0);
P.wall("far", esMt("qf_bathroommirror1"), 0);
P.wall("B", esSt("kf_toilet"), w * 0.5);
P.wall("F", esPk("qf_bathroomtowel", ["blush", "white"]), w * 0.5);
}
else {
P.wall("far", esSt("kf_bathroomsink"), -0.8);
P.wall("far", esMt("qf_bathroommirror1"), -0.8);
P.wall("far", esSt("kf_toilet"), F - 0.8);
P.wall("B", esPk("qf_bathroomtowel", ["blush", "white"]), w * 0.5);
}
P.small("plant", 0.6, F - 0.6, 0);
P.spot(w * 0.4, 0);
};
R.fytea = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
[[w * 0.4, -2.4], [w * 0.4, 2.4], [w * 0.75, 0]].forEach(function (t) {
P("evb_toadtable", t[0], t[1], 0);
[[-1.1, 0], [1.1, 0], [0, -1.1], [0, 1.1]].forEach(function (o) { P("evb_toadstool", t[0] + o[0], t[1] + o[1], 0); });
});
P.wall("far", esWd("kf_kitchencabinet"), -1.6);
P.wall("far", esWd("kf_kitchencabinet"), 1.6);
P.wall("B", "evb_bannerpink", w * 0.5);
esArts(P, "F", 2);
P("espalm", 0.7, B + 0.7, 0);
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.4, 0);
evbAct(P, ctx, w * 0.75 - 1.6, 0, 1.5, "The tea party", "pour the tea", evbTea);
};
R.fybanquet = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("feasttable", w * 0.5, -P.d * 0.22, 0);
P("feasttable", w * 0.5, P.d * 0.22, 0);
for (var s = -1; s <= 1; s += 2)
for (var k = -2; k <= 2; k++) {
P(esWd("kf_chaircushion"), w * 0.5 - 1.75, s * P.d * 0.22 + k * 1.1, "+u");
P(esWd("kf_chaircushion"), w * 0.5 + 1.75, s * P.d * 0.22 + k * 1.1, "-u");
}
P("evb_cake", w - 1.6, 0, "-u");
P.wall("B", "evb_bannerpink", w * 0.3);
P.wall("B", "evb_bannersky", w * 0.7);
P.wall("F", "evb_bannerlilac", w * 0.5);
P.ceil("chandelier", w * 0.5, -P.d * 0.22);
P.ceil("chandelier", w * 0.5, P.d * 0.22);
P.spot(w * 0.5, 0);
evbAct(P, ctx, w - 2.8, 0, 1.6, "The great cake", "have a slice", evbCake);
};
R.fysweets = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.2; u < w - 0.6; u += 1.8) {
P.wall("B", "evb_candy", u);
}
P.wall("F", "shelfgoods", w * 0.4);
P.wall("far", esWd("kf_kitchencabinet"), 0);
P("evb_cake", w * 0.5, 0.8, 0);
P.spot(w * 0.4, 0);
evbAct(P, ctx, w * 0.5, B + 1.5, 1.6, "The sweet jars", "pick a sweet", evbSweet);
};
R.fykitchen = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "oven", -1.6);
P.wall("far", esWd("kf_kitchenstove"), 0.2);
P.wall("far", esWd("kf_kitchensink"), 1.6);
for (var u = 1.2; u < w - 1.4; u += 1.1) {
P.wall("B", esWd("kf_kitchencabinet"), u);
}
P.wall("F", esWd("kf_kitchenfridge") || "fridge", w - 1.2);
P.wall("F", "shelfgoods", w * 0.4);
P("esisland", w * 0.5, 0, "+u");
P(esWd("kf_stoolbar"), w * 0.5 - 1.4, -0.5, "+u");
P(esWd("kf_stoolbar"), w * 0.5 - 1.4, 0.5, "+u");
P("evb_pumpkin", w * 0.5 + 0.2, F - 1.4, 0);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.5, 1.6);
evbAct(P, ctx, w - 1.6, -1.6, 1.6, "The royal oven", "bake fairy cakes", evbBake);
};
R.fypastry = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("counter", w * 0.5, 0, "-u");
P("evb_cake", w - 1.6, B + 1.4, 0);
P("evb_cake", w - 1.6, F - 1.4, 0);
P.wall("B", "shelfgoods", w * 0.5);
P.wall("F", "evb_candy", w * 0.5);
P.wall("far", "oven", 0);
P.spot(1.8, 0);
evbAct(P, ctx, w * 0.5 - 1.2, 0, 1.5, "The pastry board", "read the pastry cook's notes", evbPastry);
};
R.fyball = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F, n = Math.max(2, Math.round(P.d / 5));
for (var i = 0; i < n; i++) {
P.ceil("chandelier", w * 0.5, B + P.d * (i + 0.5) / n);
}
P("evb_musicbox", w - 1.4, 0, "-u");
P("evb_harp", w - 1.4, -3, "-u");
P("piano", w - 1.8, 3, "-u");
for (var v2 = B + 1.4; v2 < F - 1.2; v2 += 1.2)
if (Math.abs(v2) > 4.4)
P.wall("far", esWd("kf_chaircushion"), v2);
P("evb_rug_dance", w * 0.5, 0, 0);
P("evb_column", w * 0.5, B + 0.7, 0);
P("evb_column", w * 0.5, F - 0.7, 0);
P("evb_column", w * 0.25, B + 0.7, 0);
P("evb_column", w * 0.75, F - 0.7, 0);
P.wall("B", "evb_bannerpink", w * 0.3);
P.wall("B", "evb_bannersky", w * 0.7);
P.wall("F", "evb_bannerlilac", w * 0.3);
P.wall("F", "evb_bannerpink", w * 0.7);
P("espalm", 0.9, B + 0.9, 0);
P("espalm", 0.9, F - 0.9, 0);
P.spot(w * 0.5, 0);
P.spot(w * 0.4, B + 4);
P.spot(w * 0.6, F - 4);
evbAct(P, ctx, w - 2.6, 0, 1.8, "The great music box", "wind it up and dance", evbDance);
};
})();
"use strict";
(function () {
if (typeof ES_ROOM === "undefined")
return;
var R = ES_ROOM;
R.fylanding = function (P, A, ctx) {
var r = P.r, put = evbPut(A), holes = [ctx.up, ctx.down].filter(Boolean), busy = function (x, z) { return holes.some(function (h) { return x > h.x0 - 1 && x < h.x1 + 1 && z > h.z0 - 1 && z < h.z1 + 1; }); };
put("redrunner", 0, (r.z0 + r.z1) / 2, 0);
[[r.x0 + 0.7, r.z1 - 0.7], [r.x1 - 0.7, r.z1 - 0.7], [r.x0 + 0.7, r.z0 + 0.7], [r.x1 - 0.7, r.z0 + 0.7]].forEach(function (p) { if (!busy(p[0], p[1]))
put("espalm", p[0], p[1], 0); });
put("evb_bannerpink", r.x0 + 0.08, r.z0 + 3, Math.PI / 2);
put("evb_bannersky", r.x1 - 0.08, r.z0 + 3, -Math.PI / 2);
if (!busy(0, r.z1 - 1))
put("evb_arch", 0, r.z1 - 0.9, Math.PI);
put(evbLift("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100), 0, (r.z0 + r.z1) / 2, 0);
A.spots.push({ x: 0, z: r.z0 + 1.4, room: "landing", level: ctx.L });
};
R.fytales = function (P, A, ctx) {
var r = P.r, put = evbPut(A), len = r.z1 - r.z0, n = Math.max(1, Math.floor(len / 4)), ways = ctx.ways, k = 0;
put("redrunner", 0, (r.z0 + r.z1) / 2, 0);
for (var i = 0; i < n; i++) {
var z = r.z0 + len * (i + 0.5) / n;
[[r.x0 + 0.16, Math.PI / 2, r.x0], [r.x1 - 0.16, -Math.PI / 2, r.x1]].forEach(function (s) {
if (evbNear(ways, s[2], z))
return;
put(esArt(ES_ART++), s[0], z, s[1]);
var tale = EVB_TALES[k++ % EVB_TALES.length];
evbActAt(ctx, s[0] + (s[1] > 0 ? 1.0 : -1.0), z, 1.1, "A painting: " + tale.t, "look closer", function () { evbCard(tale.t, evbEsc(tale.s) + "<div style='opacity:.75;margin-top:6px;font-size:12px'>" + evbEsc(tale.by) + "</div>"); });
});
put(evbLift("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100), 0, z, 0);
}
A.spots.push({ x: 0, z: (r.z0 + r.z1) / 2, room: "gallery", level: ctx.L });
};
R.fymoon = function (P, A, ctx) {
var r = P.r, put = evbPut(A), ways = ctx.ways, len = r.x1 - r.x0, zc = (r.z0 + r.z1) / 2, n = Math.max(2, Math.floor(len / 5));
for (var i = 0; i < n; i++) {
var x = r.x0 + len * (i + 0.5) / n;
if (Math.abs(x) < 4)
continue;
if (!evbNear(ways, x, r.z0))
put(i % 2 ? "evb_bannersky" : "evb_bannerlilac", x, r.z0 + 0.08, 0);
if (i % 2 && !evbNear(ways, x, r.z1))
put("esconsole", x, r.z1 - 0.35, Math.PI);
put(evbLift("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100), x, zc, 0);
}
put("espalm", r.x0 + 0.7, zc, 0);
put("espalm", r.x1 - 0.7, zc, 0);
A.spots.push({ x: r.x0 + 3, z: zc, room: "corridor", level: ctx.L });
};
R.fyprincess = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_bedpink", 0);
P.wall("far", esWd("qf_nightstand1"), -1.6);
P.wall("far", esWd("qf_nightstand1"), 1.6);
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, -1.6, "-u");
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, 1.6, "-u");
P("footchest", w - 3.0, 0, "-u");
P(esRug(2), w - 3, 0, "+u");
P.wall("B", "evb_mirror", w * 0.4);
P(esWd("kf_chaircushion"), w * 0.4, B + 1.2, "-v");
P.wall("F", "wardrobe", w * 0.35);
P.wall("F", esWd("kf_desk"), w * 0.65);
P(esPk("kf_chairdesk", ["blush", "ivory"]), w * 0.65, F - 1.1, "+v");
P("evb_toadstool", 1.8, B + 1.4, 0);
P(esPk("kf_bear", ["pink", "cream", "sky"]), 1.8, B + 1.4, 0);
P("plant", 0.6, F - 0.6, 0);
P.ceil(esMt("qf_lightchandelier"), w - 2.8, 0);
P.spot(w - 3.6, 1.3);
evbAct(P, ctx, w * 0.4, B + 1.8, 1.3, "The princess's looking-glass", "look into it", function () { evbSay("🪞 You look wonderful. The looking-glass has decided, and a looking-glass is never wrong."); });
};
R.fywardrobe = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_gowns", 0);
P.wall("B", "evb_gowns", w * 0.5);
P.wall("F", "evb_wallmirror", w * 0.5);
P(esFab("kf_loungechair"), w * 0.5, 0.4, "+u");
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.3, 0);
evbAct(P, ctx, w - 1.4, 0, 1.4, "The ball gowns", "choose one to wear to the ball", evbGown);
};
R.fyshoes = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.2; u < w - 0.6; u += 1.6) {
P.wall("B", esPk("qf_shelflarge", ["white"]), u);
P.wall("F", esPk("qf_shelflarge", ["white"]), u);
}
P("evb_slipper", w * 0.6, 0, 0);
P(esWd("kf_benchcushion") || esWd("kf_bench"), w * 0.3, 0, "+u");
P.spot(w * 0.3, 0.8);
};
R.fybath = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("esbathfree", w * 0.55, 0, "+u");
P.wall("far", "evb_fountain", 0);
P.wall("B", "esbasinrow", w * 0.5);
P.wall("B", esMt("qf_bathroommirror1"), w * 0.5);
P.wall("F", esSt("kf_toilet"), w - 1.0);
P.wall("F", "esshower", w * 0.35);
P.wall("F", esPk("qf_bathroomtowel", ["blush", "white"]), w * 0.6);
P("espalm", 0.8, B + 0.8, 0);
P.ceil("chandelier", w * 0.55, 0);
P.spot(w * 0.35, 0);
};
R.fyqueen = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esSt("qf_fireplace"), 0);
esSalon(P, w - 3.4, 0, { rug: 4, design: true });
P.wall("B", "evb_harp", w * 0.4);
P.wall("B", esWd("kf_desk"), w * 0.7);
P(esPk("kf_chairdesk", ["plum", "ivory"]), w * 0.7, B + 1.1, "-v");
P.wall("F", "esbookcase", w * 0.4);
P.wall("F", "esbookcase", w * 0.4 + 1.7);
esArts(P, "F", 1, w * 0.7, w - 1);
esPlants(P);
P.ceil(esMt("qf_lightchandelier"), w - 3.4, 0);
P.spot(w * 0.4, 0);
evbAct(P, ctx, w * 0.7, B + 1.8, 1.4, "The queen's letters", "read one", function () { evbCard("A letter on the queen's desk", "<i>My dear Godmother,</i><br>The ball was splendid. Everyone danced, nobody quarrelled, and the cake was taller than the King. Please come again at midnight; the pumpkins miss you.<br><i>Your loving Queen</i>"); });
};
R.fyguest = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F, beds = ["evb_bedsky", "evb_bedsun", "evb_bedmint", "evb_bedlilac", "evb_bedpink"], tint = P.r.tint || 0;
var bed = tint === 0x6AB8FF ? "evb_bedsky" : tint === 0xFFD84A ? "evb_bedsun" : tint === 0xFF8AC0 ? "evb_bedpink" : tint === 0xC890FF ? "evb_bedlilac" : beds[(Math.abs(P.r.x0 * 7 + P.r.z0 * 3) | 0) % beds.length];
P.wall("far", bed, 0);
P.wall("far", esWd("qf_nightstand1"), -1.55);
P.wall("far", esWd("qf_nightstand1"), 1.55);
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, -1.55, "-u");
P.wall("B", "wardrobe", w * 0.45);
P(esRug(3), w - 2.4, 0, "+u");
P("evb_toadstool", 1.6, F - 1.2, 0);
P(esFab("kf_loungechair"), 1.6, B + 1.2, P.face(1.6, B + 1.2, w * 0.5, 0));
P("plant", 0.6, F - 0.6, 0);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.4, 0);
};
R.fyensuite = function (P) { if (ES_ROOM.ensuite)
ES_ROOM.ensuite(P); P.small("evb_toadstool", 0.7, 0, 0); };
R.fygodmother = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_coach", w * 0.55, 0, "-u");
P.wall("far", "evb_wands", -2.6);
P.wall("far", "evb_jars", 2.6);
P("evb_pumpkin", 1.6, B + 1.2, 0);
P("evb_pumpkin", 2.4, B + 1.6, 0);
P("evb_pumpkin", 1.6, F - 1.3, 0);
P.wall("B", esWd("kf_desk"), w * 0.75);
P(esWd("kf_chair"), w * 0.75, B + 1.1, "-v");
P.ceil("chandelier", w * 0.4, 0);
P.spot(w * 0.3, 0);
evbAct(P, ctx, w - 1.5, -2.6, 1.5, "The Fairy Godmother's wands", "wave one", evbWand);
};
R.fydolls = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_dollcastle", w - 1.6, 0, "-u");
P.wall("B", "esdollhouse", w * 0.5);
P.wall("F", "toys", w * 0.5);
P(esRug(5), w * 0.5, 0, "+u");
P("evb_toadstool", w * 0.5, -1.2, 0);
P("evb_toadstool", w * 0.5, 1.2, 0);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.4, 0);
evbAct(P, ctx, w - 3, 0, 1.4, "The dolls' castle", "peep inside", function () { evbSay("🏰 Inside the dolls' castle there is a dolls' castle, and inside that... no, that's enough castles for one day."); });
};
R.fynursery = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "crib", -1.4);
P.wall("far", "crib", 1.4);
P("evb_littlebed", w * 0.4, B + 1.6, "+v");
P(esRug(5), w * 0.55, 0.4, "+u");
P("toys", w * 0.55, 0.8, 0);
P("evb_rocking", w * 0.55, F - 1.6, "-v");
P(esFab("kf_loungechairrelax"), 1.6, F - 1.4, P.face(1.6, F - 1.4, w * 0.5, 0));
P.ceil("evb_butterflies", w * 0.5, 0);
P.spot(w * 0.5, 1.6);
evbAct(P, ctx, w - 1.6, 0, 1.6, "The cradles", "sing a lullaby", evbLullaby);
};
R.fypixie = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_jars", -1.0);
P.wall("far", "evb_jars", 1.0);
P.wall("B", "evb_jars", w * 0.5);
[[w * 0.4, 0], [w * 0.6, 1.4], [w * 0.6, -1.4]].forEach(function (p) { P("evb_toadstool", p[0], p[1], 0); });
P.ceil("evb_butterflies", w * 0.5, 0);
P.spot(w * 0.4, 0.8);
evbAct(P, ctx, w - 1.4, 0, 1.4, "The pixie-dust jars", "open one", evbPixie);
};
R.fytoys = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_rocking", w - 1.6, B + 1.6, "-u");
P("evb_rocking", w - 1.6, F - 1.6, "-u");
P("toys", w * 0.5, 0, 0);
P(esRug(4), w * 0.5, 0, "+u");
P.wall("B", esWd("kf_bookcaseopenlow"), w * 0.5);
P.wall("F", "footchest", w * 0.5);
P(esPk("kf_bear", ["sky", "pink", "tan"]), w * 0.5, 1.2, 0);
P("xp_kidtable", 2.0, 0, 0);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.4, 0);
evbAct(P, ctx, w * 0.5 - 1.2, 0, 1.4, "The toy box", "play a game", evbToys);
};
R.fybubble = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "vcbath", 0);
P.wall("B", esSt("kf_toilet"), w * 0.55);
P.wall("F", esSt("kf_bathroomsink"), w * 0.45);
P.wall("F", esMt("qf_bathroommirror1"), w * 0.45);
P.wall("B", esPk("qf_bathroomtowel", ["sky", "blush"]), w * 0.3);
P(esRug(5), w * 0.5, 0, "+u");
P.spot(w * 0.4, 0);
evbAct(P, ctx, w - 1.6, 0, 1.4, "The bubble bath", "blow bubbles", function () { evbTune([784, 988, 1175, 1568], 120, 0.25); evbSay("🫧 Pop! Pop! Pop! Every bubble is round because a bubble's skin pulls itself as small as it can, and a sphere is the smallest skin that can hold the air inside."); });
};
R.fyprince = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_bedsky", 0);
P.wall("far", esWd("qf_nightstand1"), -1.6);
P.wall("far", esWd("qf_nightstand1"), 1.6);
P.wall("B", "armourstand", w * 0.4);
P.wall("B", "weaponrack", w * 0.65);
P.wall("F", esWd("kf_desk"), w * 0.5);
P(esPk("kf_chairdesk", ["navy"]), w * 0.5, F - 1.1, "+v");
P("esglobe", 1.6, B + 1.4, 0);
P(esRug(1), w - 3, 0, "+u");
P.ceil(esMt("qf_lightchandelier"), w - 2.8, 0);
P.spot(w * 0.45, 0);
};
R.fyguard = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.4; u < w - 1; u += 1.6) {
P.wall("B", "armourstand", u);
}
P.wall("F", "weaponrack", w * 0.35);
P.wall("F", "weaponrack", w * 0.65);
P("longtable", w * 0.55, 0, Math.PI / 2);
P(esWd("kf_chair"), w * 0.55 - 1.3, -0.6, "+u");
P(esWd("kf_chair"), w * 0.55 + 1.3, 0.6, "-u");
P.wall("far", "evb_bannersky", 0);
P.spot(w * 0.4, 0);
evbAct(P, ctx, w - 1.6, 0, 1.5, "The captain of the guard's sword", "kneel to be knighted", evbKnighted);
};
R.fypaint = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_easel", w * 0.45, -1.2, "-u");
P("evb_easel", w * 0.45, 1.2, "-u");
P("evb_easel", w - 1.6, 0, "-u");
P(esWd("kf_stoolbar"), w * 0.45 + 0.8, -1.2, "-u");
esArts(P, "B", 2);
esArts(P, "F", 2);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(2, 0);
evbAct(P, ctx, w * 0.45 + 1.0, 0, 1.5, "The easels", "mix the paints", evbPaint);
};
R.fylinen = function (P) { if (ES_ROOM.linen)
ES_ROOM.linen(P); };
R.fysewing = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("essewing", w * 0.5, 0, "-u");
P(esWd("kf_chaircushion"), w * 0.5 - 0.8, 0, "+u");
P.wall("far", "evb_gowns", 0);
P.wall("B", esPk("qf_shelflarge", ["white"]), w * 0.5);
P.spot(w * 0.3, 0);
evbAct(P, ctx, w * 0.5 - 1.2, 0, 1.3, "The sewing table", "stitch a ribbon", function () { evbSay("🧵 You stitch a ribbon in sky blue and pink. The elves who sew for the shoemaker in the old tale (Grimm, 1812) would be proud."); });
};
R.fytower = function (P, A, ctx) { R.fylanding(P, A, ctx); };
R.fybanners = function (P, A, ctx) {
var r = P.r, put = evbPut(A), len = r.z1 - r.z0, n = Math.max(1, Math.floor(len / 3)), ways = ctx.ways, bs = ["evb_bannerpink", "evb_bannersky", "evb_bannerlilac"];
put("redrunner", 0, (r.z0 + r.z1) / 2, 0);
for (var i = 0; i < n; i++) {
var z = r.z0 + len * (i + 0.5) / n;
if (!evbNear(ways, r.x0, z))
put(bs[i % 3], r.x0 + 0.08, z, Math.PI / 2);
if (!evbNear(ways, r.x1, z))
put(bs[(i + 1) % 3], r.x1 - 0.08, z, -Math.PI / 2);
}
put(evbLift("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100), 0, (r.z0 + r.z1) / 2, 0);
A.spots.push({ x: 0, z: (r.z0 + r.z1) / 2, room: "gallery", level: ctx.L });
};
R.fybattle = function (P, A, ctx) {
var r = P.r, put = evbPut(A), ways = ctx.ways, len = r.x1 - r.x0, zc = (r.z0 + r.z1) / 2, n = Math.max(2, Math.floor(len / 5));
for (var i = 0; i < n; i++) {
var x = r.x0 + len * (i + 0.5) / n;
if (Math.abs(x) < 4)
continue;
if (!evbNear(ways, x, r.z0))
put("armourstand", x, r.z0 + 0.6, 0);
put(evbLift("lantern", Math.round((ctx.H - 0.04 - 1.0) * 100) / 100), x, zc, 0);
}
A.spots.push({ x: r.x0 + 3, z: zc, room: "battlements", level: ctx.L });
};
R.fyspindle = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_spindle", w - 1.6, 0, "-u");
P(esWd("kf_chair"), w - 2.6, 0, "+u");
P("evb_bedlilac", w * 0.4, B + 1.3, "+v");
P("evb_arch", 1.2, 0, "+u");
P.wall("F", "plant", w * 0.5);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.3, 1);
evbAct(P, ctx, w - 2.4, 0, 1.4, "The spinning wheel", "touch the spindle", evbSpindle);
};
R.fystar = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("estelescope", w - 1.8, 0, "-u");
P("esglobe", w * 0.45, B + 1.6, 0);
P("evb_map", w * 0.45, F - 1.4, "-v");
P(esFab("kf_loungechairrelax"), w - 3.2, B + 1.4, P.face(w - 3.2, B + 1.4, w, 0));
P(esFab("kf_loungechairrelax"), w - 3.2, F - 1.4, P.face(w - 3.2, F - 1.4, w, 0));
P.ceil("evb_butterflies", w * 0.5, 0);
P.spot(w * 0.5, -1);
evbAct(P, ctx, w - 2.8, 0, 1.5, "The star telescope", "wish on a star", evbStar);
};
R.fyrapunzel = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_braid", 0);
P("evb_bedsun", w * 0.4, B + 1.3, "+v");
P(esWd("kf_chaircushion"), w - 1.6, F - 1.4, "-u");
P.wall("F", "evb_easel", w * 0.45);
P(esRug(2), w * 0.55, 0, "+u");
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.4, 0.8);
evbAct(P, ctx, w - 1.6, 0, 1.5, "The tower window", "call “Rapunzel, let down your hair”", evbRapunzel);
};
R.fycrown = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_crown", w * 0.5, 0, 0);
P("crownstand", w - 1.4, B + 1.4, 0);
P("crownstand", w - 1.4, F - 1.4, 0);
P("gemheap", 1.6, B + 1.2, 0);
P("treasurechest", 1.6, F - 1.2, "+u");
P.wall("far", "evb_bannerpink", 0);
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.3, 1.4);
evbAct(P, ctx, w * 0.5 - 1.1, 0, 1.3, "The Fairy Crown", "look at the jewels", evbJewels);
};
R.fysky = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_fountain", w * 0.5, 0, 0);
for (var v = B + 1.8; v < F - 1.4; v += 2.8) {
P.wall("far", "evb_flowerbed", v);
}
for (var u = 1.8; u < w - 1.4; u += 2.8) {
if (Math.abs(u - w * 0.5) > 2.2) {
P.wall("B", "evb_flowerbed", u);
P.wall("F", "evb_flowerbed", u);
}
}
[[w * 0.25, -2.6], [w * 0.25, 2.6], [w * 0.75, -2.6], [w * 0.75, 2.6]].forEach(function (p) { P("espalm", p[0], p[1], 0); });
P("evb_arch", w * 0.5, B + 1.0, "+v");
P("evb_arch", w * 0.5, F - 1.0, "-v");
P.ceil("evb_butterflies", w * 0.25, 0);
P.ceil("evb_butterflies", w * 0.75, 0);
P(esWd("kf_benchcushion") || esWd("kf_bench"), w * 0.5 - 2.6, B + 2.6, "+u");
P(esWd("kf_benchcushion") || esWd("kf_bench"), w * 0.5 + 2.6, F - 2.6, "-u");
P("espalm", 0.9, B + 0.9, 0);
P("espalm", w - 0.9, F - 0.9, 0);
P.spot(w * 0.5, 2.6);
evbAct(P, ctx, w * 0.5 - 2, 0, 1.6, "The sky garden's fountain", "toss a petal", function () { evbSay("🌸 Your petal spins down the fountain, round and round, three tiers to the bottom. In Faerie that means good weather for a week."); });
};
R.fybell = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_bell", w * 0.55, 0, "-u");
P.wall("B", "evb_bannersky", w * 0.5);
P.wall("F", "evb_bannerpink", w * 0.5);
P.spot(w * 0.25, 0);
evbAct(P, ctx, w * 0.55 - 1.4, 0, 1.6, "The great bell", "ring it", evbBell);
};
R.fymaps = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_map", w - 1.4, 0, "-u");
P("maptable", w * 0.5, 0, 0);
P("esglobe", 1.6, B + 1.4, 0);
P.wall("B", "esbookcase", w * 0.5);
P.wall("F", "esbookcase", w * 0.5);
P(esWd("kf_chaircushion"), w * 0.5 - 1.2, 0, "+u");
P.spot(w * 0.3, 0);
evbAct(P, ctx, w - 2.4, 0, 1.4, "The map of Faerie", "study it", evbMapCard);
};
R.fypotion = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_cauldron", w * 0.55, 0, 0);
P.wall("far", "evb_jars", -1);
P.wall("far", "evb_jars", 1);
P.wall("B", "labbench", w * 0.5);
P.spot(w * 0.25, 0);
evbAct(P, ctx, w * 0.55 - 1.4, 0, 1.5, "The colour cauldron", "mix a colour potion", evbPotion);
};
R.fydragon = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_egg", w * 0.55, 0, 0);
P("brazier", w * 0.55 - 1.8, B + 1.2, 0);
P("brazier", w * 0.55 + 1.8, F - 1.2, 0);
P("goldpile", w - 1.2, B + 1.2, 0);
P("goldpile", w - 1.2, F - 1.2, 0);
P.spot(w * 0.25, 0);
evbAct(P, ctx, w * 0.55 - 1.3, 0, 1.4, "The dragon's egg", "warm it with your hands", evbEgg);
};
R.fyturret = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F, bed = /Mint/.test(P.r.n) ? "evb_bedmint" : "evb_bedsun";
P.wall("far", bed, 0);
P.wall("B", esWd("qf_nightstand1"), w - 1.2);
P("evb_toadstool", 1.4, 0, 0);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.35, 0);
};
R.fylookout = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("estelescope", w - 1.4, 0, "-u");
P(esWd("kf_benchcushion") || esWd("kf_bench"), w * 0.4, B + 0.9, "+v");
P.wall("F", "evb_bannerlilac", w * 0.5);
P.spot(w * 0.35, 0.5);
evbAct(P, ctx, w - 2.4, 0, 1.4, "The lookout glass", "look out over Faerie", function () { evbCard("From the lookout", "Far below: the toadstool village with its well, the fae market's stalls, the moonpool silver in the trees, the standing stones on the hill, and Titania and Oberon's glade where the fairy ring is. On a clear day you can see a unicorn. Today is a clear day."); });
};
R.fystudy = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esWd("kf_desk"), 0);
P(esPk("kf_chairdesk", ["emerald", "navy"]), w - 1.1, 0, "-u");
P.wall("B", "esbookcase", w * 0.5);
P.wall("F", "esglobe", w * 0.5);
P(esFab("kf_loungechair"), 1.6, 0, "+u");
P.spot(w * 0.3, 0.5);
evbAct(P, ctx, w - 1.8, 0, 1.3, "The king's riddle book", "try a riddle", evbRiddle);
};
R.fyowl = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_owl", w - 1.2, 0, "-u");
P("evb_owl", w * 0.5, B + 0.8, "+v");
P(esWd("kf_chair"), 1.4, 0, "+u");
P.spot(w * 0.3, 0);
evbAct(P, ctx, w - 2, 0, 1.3, "The castle owl", "ask the owl", evbOwl);
};
R.fyattic = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("treasurechest", w - 1.2, 0, "-u");
P("crates", w * 0.5, B + 1.2, 0);
P("footchest", w * 0.5, F - 0.8, "-v");
P("evb_rocking", 2, 0, "+u");
P("evb_gowns", w * 0.5, 0, "+u");
P("barrel", 1.2, B + 1, 0);
P.spot(w * 0.3, 1);
evbAct(P, ctx, w - 2.2, 0, 1.3, "An old trunk", "rummage in it", evbAttic);
};
R.fysnow = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "evb_icethrone", 0);
P("evb_snowglobe", w * 0.45, 0, 0);
P("crystals", 1.6, B + 1.2, 0);
P("crystals", 1.6, F - 1.2, 0);
P("crystalcluster", w - 1.2, B + 1.3, 0);
P("evb_sleigh", w * 0.5, F - 1.6, "-u");
P(esPk("rug_border", ["0", "1"]) || esRug(1), w * 0.45, 0, "+u");
[[w - 1.0, -2.2], [w - 1.0, 2.2], [2.6, B + 0.8], [2.6, F - 0.8], [w * 0.7, B + 0.8]].forEach(function (p) { P("evb_icepillar", p[0], p[1], 0); });
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.3, 0);
evbAct(P, ctx, w * 0.45 - 1.1, 0, 1.4, "The snow globe", "shake it", evbSnow);
};
R.fymusicbox = function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F;
P("evb_musicbox", w * 0.55, 0, "-u");
P("evb_musicbox", w - 1.2, B + 1.2, "-u");
P("evb_musicbox", w - 1.2, F - 1.2, "-u");
P(esWd("kf_chaircushion"), 2, -0.8, "+u");
P(esWd("kf_chaircushion"), 2, 0.8, "+u");
P.ceil("chandelier", w * 0.5, 0);
P.spot(w * 0.3, 0);
evbAct(P, ctx, w * 0.55 - 1.2, 0, 1.4, "The music box", "wind it", function () { evbTune(EVB_WALTZ, 260, 0.4); evbSay("🎶 The tiny dancer turns, and the music box plays a little waltz."); });
};
})();
"use strict";
function evbTune(notes, ms, secs) { (notes || []).forEach(function (f, i) { setTimeout(function () { if (f && typeof playTone === "function")
playTone(f, secs || 0.4); }, i * (ms || 220)); }); }
var EVB_WALTZ = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 1047, 988, 784, 659, 523];
var EVB_LULLABY = [392, 392, 440, 392, 523, 494, 392, 392, 440, 392, 587, 523];
var EVB_TALES = [
{ t: "Cinderella", by: "Charles Perrault, 1697", s: "A kind girl kept in the cinders is helped by her fairy godmother: a pumpkin becomes a golden coach, mice become horses, and her rags become a gown. She dances with the prince, but must be home by midnight. She runs, and leaves a glass slipper on the stairs. The prince searches the kingdom until he finds the foot it fits." },
{ t: "Sleeping Beauty", by: "Charles Perrault, 1697 (and the Grimms' Little Briar Rose)", s: "At a princess's christening one fairy, left off the guest list, foretells she will prick her finger on a spindle. A kind fairy softens it: not death, but a sleep of a hundred years. It happens; the whole castle sleeps with her, and a wood of briars grows up round it, until a prince comes through." },
{ t: "Rapunzel", by: "The Brothers Grimm, 1812", s: "A girl with wonderfully long golden hair is shut in a tower with no door and no stair. To visit, the witch calls: Rapunzel, Rapunzel, let down your hair! A prince overhears, climbs the braid himself, and in the end, after many troubles, the two find each other again." },
{ t: "The Snow Queen", by: "Hans Christian Andersen, 1844", s: "A splinter of a goblin's mirror gets into Kai's eye and heart, and the Snow Queen carries him off to her palace of ice. His friend Gerda walks the whole world to find him, helped by a reindeer and a robber girl, and her warm tears melt the splinter away." },
{ t: "The Princess and the Pea", by: "Hans Christian Andersen, 1835", s: "A soaked girl at the gate says she is a real princess. The queen puts one pea under twenty mattresses and twenty feather beds. In the morning the girl says she slept terribly: something hard was in the bed. Only a real princess could be so sensitive, so the prince marries her." },
{ t: "The Frog Prince", by: "The Brothers Grimm, 1812", s: "A princess drops her golden ball into a well, and a frog fetches it in return for her friendship. She tries to forget her promise, but the frog comes to the castle. In the end the spell breaks and the frog is a prince again." },
{ t: "Puss in Boots", by: "Charles Perrault, 1697", s: "A miller's youngest son is left only a cat. The cat asks for boots and a bag, and by cleverness (and tricking a shape-changing ogre into turning into a mouse) wins his master a castle and the hand of a princess." },
{ t: "The Elves and the Shoemaker", by: "The Brothers Grimm, 1812", s: "A poor shoemaker cuts leather for one pair of shoes and goes to bed. In the morning the shoes are made, perfectly. Night after night it happens, until he and his wife stay up and see two little elves at work, and sew them tiny clothes to say thank you." },
{ t: "The Twelve Dancing Princesses", by: "The Brothers Grimm, 1815", s: "Every morning the twelve princesses' shoes are worn through, though their door was locked. A soldier with a cloak that makes him unseen follows them down a hidden stair, through woods of silver, gold and diamond trees, to a castle where they dance all night." },
{ t: "The Little Mermaid", by: "Hans Christian Andersen, 1837", s: "The youngest daughter of the sea king longs for the world above and saves a prince from a shipwreck. She trades her voice for legs. Andersen's ending is his own, gentle and strange: she becomes a daughter of the air." },
{ t: "Thumbelina", by: "Hans Christian Andersen, 1835", s: "A girl no bigger than a thumb is born from a flower. She is carried off by a toad, a beetle and a mole, saves a swallow through the winter, and the swallow carries her south to the land of flower fairies, where she gets wings." },
{ t: "Beauty and the Beast", by: "Jeanne-Marie Leprince de Beaumont, 1756", s: "To save her father, Beauty goes to live in the castle of a beast who is kind and sad. She grows to love him for his goodness, and her love breaks the spell that made him a beast." }
];
function evbGuide() { return __ZC(367, 7, this, arguments, new.target); }
function evbSlipper() { return __ZC(367, 8, this, arguments, new.target); }
function evbFortune() { return __ZC(367, 9, this, arguments, new.target); }
function evbHarp() { evbTune([523, 659, 784, 1047, 784, 659, 523, 392, 523], 170, 0.6); evbSay("🎵 The golden harp sings. A harp's strings are different lengths: the shorter the string, the faster it shakes, and the higher the note."); }
function evbStory() {
var i = 0;
function page() { var T = EVB_TALES[i]; evbCard("The Storybook: " + T.t, evbEsc(T.s) + "<div style='opacity:.75;margin-top:6px;font-size:12px'>" + evbEsc(T.by) + "</div>", [["Turn the page", function () { i = (i + 1) % EVB_TALES.length; page(); }]]); }
page();
}
var EVB_RIDDLES = [
{ q: "I have keys but open no locks. I have space but no room. You can enter, but not go outside. What am I?", a: ["A keyboard", "A castle", "A map"], r: 0 },
{ q: "The more of me you take, the more you leave behind. What am I?", a: ["Cake", "Footsteps", "Gold"], r: 1 },
{ q: "I am full of holes but I still hold water. What am I?", a: ["A sponge", "A bucket", "A crown"], r: 0 },
{ q: "What has a neck but no head, and wears a cap?", a: ["A bottle", "A knight", "A swan"], r: 0 },
{ q: "What gets wetter the more it dries?", a: ["The sea", "A towel", "A fish"], r: 1 },
{ q: "I go up and down the stairs without moving. What am I?", a: ["A ghost", "A carpet", "A cat"], r: 1 },
{ q: "What can you catch but never throw?", a: ["A cold", "A ball", "A frog"], r: 0 },
{ q: "I have a face and two hands, but no arms or legs. What am I?", a: ["A clock", "A mirror", "A doll"], r: 0 },
{ q: "What has one eye but cannot see?", a: ["A needle", "A pirate", "A storm"], r: 0 },
{ q: "What belongs to you, but other people use it more than you do?", a: ["Your shoes", "Your name", "Your bed"], r: 1 }
];
function evbMirror() { return __ZC(367, 10, this, arguments, new.target); }
function evbRiddleCard(R) {
evbCard("The Magic Mirror", "<b>" + evbEsc(R.q) + "</b>", R.a.map(function (t, i) { return [t, function () { if (i === R.r) {
evbTune([784, 988, 1319], 150, 0.5);
evbCard("The Magic Mirror", "<i>“Yes! You have it.”</i>", [["Another riddle", evbMirror]]);
}
else
evbRiddleCard(R); }]; }));
}
function evbRiddle() { var R = evbPick(EVB_RIDDLES); evbCard("The King's Riddle Book", "<b>" + evbEsc(R.q) + "</b>", R.a.map(function (t, i) { return [t, function () { evbSay(i === R.r ? "📖 <b>Right!</b> The King would be delighted." : "📖 Not that one. The answer was <b>" + evbEsc(R.a[R.r]) + "</b>."); worldCard(null); }]; })); }
function evbChest() { return __ZC(367, 11, this, arguments, new.target); }
function evbButterfly() { return __ZC(367, 12, this, arguments, new.target); }
function evbWish() { return __ZC(367, 13, this, arguments, new.target); }
function evbCrowned() { return __ZC(367, 14, this, arguments, new.target); }
function evbTea() { return __ZC(367, 15, this, arguments, new.target); }
function evbCake() { evbSay("🍰 You have a slice of the great cake: " + evbPick(["strawberry and cream", "lemon and elderflower", "chocolate with a pink rose on top", "vanilla with rainbow layers inside"]) + ". Delicious, and somehow the cake is still whole."); }
function evbSweet() { evbSay("🍬 You pick " + evbPick(["a sky-blue sugar mouse", "a pink lollipop as big as your hand", "a mint humbug", "a sherbet star", "a chocolate frog that doesn't jump"]) + "."); }
function evbBake() { evbCard("Bake fairy cakes", "The batter's in, the oven's warm. Which icing?", [["Pink", function () { evbIced("pink"); }], ["Sky blue", function () { evbIced("sky blue"); }], ["Sunshine yellow", function () { evbIced("sunshine yellow"); }], ["Mint green", function () { evbIced("mint green"); }]]); }
function evbIced(c) { worldCard(null); evbTune([659, 784, 988], 150, 0.4); evbSay("🧁 Twelve fairy cakes, iced " + evbEsc(c) + ", with a sugar flower on each. The cook says they're the best she's seen all week."); }
function evbPastry() { return __ZC(367, 16, this, arguments, new.target); }
function evbDance() { evbTune(EVB_WALTZ, 300, 0.5); evbSay("💃 The great music box plays a waltz: one-two-three, one-two-three. Waltzes go in threes, and the waltz was the dance of the grand balls of the 1800s. Take a partner and turn about the floor!"); }
function evbGown() { return __ZC(367, 17, this, arguments, new.target); }
function evbWand() { return __ZC(367, 18, this, arguments, new.target); }
function evbLullaby() { evbTune(EVB_LULLABY, 380, 0.8); evbSay("🌙 You sing a lullaby. The royal babies yawn, and so does the nursemaid."); }
function evbPixie() { evbTune([1319, 1568, 1760], 120, 0.4); evbSay("✨ A puff of " + evbPick(["pink", "golden", "sky-blue", "mint"]) + " pixie dust sparkles up and settles on your hair. You feel very slightly lighter."); }
function evbToys() { return __ZC(367, 19, this, arguments, new.target); }
function evbKnighted() { evbTune([392, 523, 659, 784], 220, 0.6); evbSay("⚔️ The captain of the guard touches the flat of the sword to each of your shoulders. <b>Arise, Knight of the Fairy Castle.</b>"); }
function evbPaint() { evbCard("Mix the paints", "Pick two colours to mix:", [["Red and yellow", function () { evbMixed("orange"); }], ["Blue and yellow", function () { evbMixed("green"); }], ["Red and blue", function () { evbMixed("purple"); }], ["Red and white", function () { evbMixed("pink"); }]]); }
function evbMixed(c) { worldCard(null); evbSay("🎨 You mix them and get <b>" + c + "</b>. Red, yellow and blue are the painter's primary colours: mix them to make the rest."); }
function evbSpindle() {
evbCard("The spinning wheel", "An old woman in the tale said: never touch the spindle. Will you?", [["Touch it", function () { worldCard(null); evbSleep(); }], ["Leave it alone", function () { worldCard(null); evbSay("🧶 Very wise. The spinning wheel hums to itself, a little disappointed."); }]]);
}
function evbSleep() { return __ZC(367, 20, this, arguments, new.target); }
function evbStar() { return __ZC(367, 21, this, arguments, new.target); }
function evbRapunzel() { evbTune([523, 587, 659, 784], 250, 0.6); evbSay("💛 <i>“Rapunzel, Rapunzel, let down your hair!”</i> The golden braid tumbles from its hook all the way to the floor. (In the Grimms' tale it was twenty ells long, about twenty metres.)"); }
function evbJewels() { return __ZC(367, 22, this, arguments, new.target); }
function evbBell() { evbTune([262, 262, 330, 262], 700, 1.6); evbSay("🔔 BONG... BONG... The great bell rings out over Faerie. Down in the village the gnomes look up and wave."); }
function evbMapCard() { return __ZC(367, 23, this, arguments, new.target); }
function evbPotion() { return __ZC(367, 24, this, arguments, new.target); }
function evbBrew(c, e) { worldCard(null); evbTune([330, 440, 550], 160, 0.5); evbSay(e + " The cauldron bubbles and turns <b>" + evbEsc(c) + "</b>."); }
var EVB_EGG = 0;
function evbEgg() { return __ZC(367, 25, this, arguments, new.target); }
function evbOwl() { return __ZC(367, 26, this, arguments, new.target); }
function evbAttic() { evbSay("📦 In the trunk: " + evbPick(["a crown that is far too big, from a giant king", "a cloak that makes you invisible (it doesn't work on Tuesdays)", "seven tiny pairs of boots", "a letter tied with a ribbon, addressed to the Snow Queen", "a map with an X on it, and the X is the attic"]) + "."); }
function evbSnow() { evbTune([1568, 1397, 1319, 1175, 1047], 160, 0.6); evbSay("❄️ You shake the snow globe. Snow swirls round the tiny castle inside. Every real snowflake has six arms, because of the way water molecules fit together as they freeze."); }
"use strict";
var EVBK = {
G: function () { return new THREE.Group(); },
B: function (g, mat, w, h, d, x, y, z, ry) { var m = new THREE.Mesh(evbGeo("b", w, h, d), mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; g.add(m); return m; },
Cy: function (g, mat, rt, rb, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("c", rt, rb, h, seg || 14), mat); m.position.set(x, y, z); g.add(m); return m; },
S: function (g, mat, r, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("s", r, seg || 12), mat); m.position.set(x, y, z); g.add(m); return m; },
K: function (g, mat, r, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("k", r, h, seg || 14), mat); m.position.set(x, y, z); g.add(m); return m; },
T: function (g, mat, r, t, x, y, z, rx) { var m = new THREE.Mesh(evbGeo("t", r, t), mat); m.position.set(x, y, z); m.rotation.x = rx || 0; g.add(m); return m; }
};
var EVB_S = { marble: 0xF2EEE4, bronze: 0xA87838, red: 0xC0392B, cedar: 0xB08A5A, black: 0x1A1614, straw: 0xD8C890, clay: 0xB8764A, brick: 0xC89A6A,
lapis: 0x2A4AA8, gold: 0xD8B040, saffron: 0xE89A20, maroon: 0x7A1E24, tile: 0x1E8A9A, ivory: 0xF4ECD8, obsid: 0x141018, blood: 0x8A0A1A, ember: 0xE0304A };
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, C = EVB_S, GILT = evbGilt;
var P = {};
P.evb_goddess = function () {
var g = G(), mb = M(C.marble, "marble"), gl = GILT();
B(g, M(0xD8D0C0, "marble"), 2.4, 1.0, 2.0, 0, 0.5, 0);
B(g, gl, 2.5, 0.12, 2.1, 0, 1.04, 0);
Cy(g, mb, 0.45, 0.85, 3.0, 0, 2.6, 0, 16);
Cy(g, mb, 0.42, 0.48, 1.1, 0, 4.6, 0, 14);
S(g, mb, 0.34, 0, 5.5, 0.02, 14);
var hm = S(g, gl, 0.36, 0, 5.62, -0.02, 12);
hm.scale.set(1, 0.8, 1.1);
B(g, gl, 0.08, 0.4, 0.7, 0, 5.98, -0.05);
[-1, 1].forEach(function (s) { var a = Cy(g, mb, 0.13, 0.11, 1.3, s * 0.55, 4.35, 0.1, 8); a.rotation.z = s * 0.25; });
Cy(g, M(C.bronze), 0.04, 0.04, 5.6, 0.85, 3.6, 0.15, 6);
Co(g, gl, 0.1, 0.4, 0.85, 6.6, 0.15, 6);
var sh = Cy(g, gl, 0.75, 0.75, 0.08, -0.9, 2.3, 0.3, 20);
sh.rotation.z = Math.PI / 2;
sh.rotation.y = 0.3;
Tor(g, M(C.bronze), 0.62, 0.05, -0.94, 2.3, 0.32, 0).rotation.y = Math.PI / 2 + 0.3;
g.scale.set(1.45, 1.45, 1.45);
var pool = G();
pool.scale.set(1 / 1.45, 1 / 1.45, 1 / 1.45);
pool.position.set(0, 0, 2.6);
B(pool, M(0x8A8478, "marble"), 3.6, 0.3, 2.2, 0, 0.15, 0);
B(pool, evbGlow(0x6AA8D0, 0.75), 3.3, 0.02, 1.9, 0, 0.31, 0);
g.add(pool);
return g;
};
P.evb_doric = function () { var g = G(), mb = M(C.marble, "marble"); Cy(g, mb, 0.42, 0.5, 5.2, 0, 2.6, 0, 20); Cy(g, mb, 0.58, 0.42, 0.28, 0, 5.34, 0, 20); B(g, mb, 1.2, 0.22, 1.2, 0, 5.59, 0); return g; };
P.evb_tripod = function () {
var g = G(), br = M(C.bronze, null, { e: 0x1A1004 });
for (var i = 0; i < 3; i++) {
var a = i * 2.094, l = Cy(g, br, 0.03, 0.04, 1.5, Math.cos(a) * 0.32, 0.74, Math.sin(a) * 0.32, 6);
l.rotation.z = Math.cos(a) * 0.22;
l.rotation.x = -Math.sin(a) * 0.22;
}
Cy(g, br, 0.46, 0.3, 0.24, 0, 1.5, 0, 16);
Co(g, evbGlow(0xFF9A30, 0.9), 0.3, 0.5, 0, 1.85, 0, 8);
Co(g, evbGlow(0xFFE070, 0.9), 0.16, 0.32, 0, 1.8, 0, 6);
return g;
};
P.evb_amphora = function () {
var g = G(), cl = M(C.clay), bk = M(0x1A120C);
Cy(g, M(0x8A6A4A, "wood"), 0.25, 0.3, 0.3, 0, 0.15, 0, 10);
var b = S(g, cl, 0.34, 0, 0.78, 0, 14);
b.scale.set(1, 1.35, 1);
Cy(g, bk, 0.35, 0.35, 0.16, 0, 0.82, 0, 16);
Cy(g, cl, 0.1, 0.14, 0.36, 0, 1.38, 0, 10);
Cy(g, bk, 0.16, 0.16, 0.04, 0, 1.56, 0, 12);
[-1, 1].forEach(function (s) { var h = Tor(g, bk, 0.13, 0.025, s * 0.18, 1.3, 0, 0); h.rotation.y = Math.PI / 2; });
return g;
};
P.evb_kline = function () {
var g = G(), wd = M(0x6A4A2A, "wood"), cu = M(0xB83A2A, "damask");
[[-0.95, 0.35], [0.95, 0.35], [-0.95, -0.35], [0.95, -0.35]].forEach(function (p) { Cy(g, wd, 0.05, 0.04, 0.55, p[0], 0.28, p[1], 8); });
B(g, wd, 2.1, 0.1, 0.85, 0, 0.6, 0);
B(g, cu, 2.0, 0.14, 0.8, 0, 0.72, 0);
var hd = B(g, cu, 0.5, 0.4, 0.8, -0.85, 0.92, 0);
hd.rotation.z = 0.4;
S(g, M(0xE8C060, "damask"), 0.16, -0.7, 0.92, 0.2, 10);
return g;
};
P.evb_oracle = function () {
var g = P.evb_tripod();
g.scale.set(1.3, 1.3, 1.3);
var mist = G();
for (var i = 0; i < 5; i++) {
var s = S(mist, evbGlow(0xC8D8F0, 0.18), 0.35 + i * 0.06, 0, 0.6 + i * 0.35, 0, 10);
s.scale.set(1, 0.6, 1);
}
g.add(mist);
evbSpinMark(mist, 0.15);
B(g, evbGlow(0x8AA0C8, 0.6), 1.2, 0.02, 0.12, 0, 0.02, 0);
return g;
};
P.evb_saisen = function () {
var g = G(), wd = M(C.cedar, "wood"), dk = M(0x3A2A1E, "wood");
B(g, wd, 1.6, 0.8, 0.8, 0, 0.4, 0);
for (var i = 0; i < 7; i++)
B(g, dk, 0.06, 0.05, 0.8, -0.6 + i * 0.2, 0.83, 0);
B(g, M(0xF4F0E8), 1.0, 0.2, 0.02, 0, 0.6, 0.41);
Cy(g, M(C.red), 0.05, 0.05, 2.6, 0, 2.3, -0.1, 8);
for (var j = 0; j < 3; j++)
Cy(g, M([C.red, 0xF4F0E8, 0x6A3AA8][j]), 0.03, 0.03, 1.4, (j - 1) * 0.08, 1.7, -0.05, 6);
S(g, M(C.gold, null, { e: 0x3A2A06 }), 0.24, 0, 3.55, -0.1, 12);
return g;
};
P.evb_ema = function () {
var g = G(), wd = M(C.cedar, "wood");
B(g, wd, 0.1, 1.8, 0.1, -1.1, 0.9, 0);
B(g, wd, 0.1, 1.8, 0.1, 1.1, 0.9, 0);
var rf = B(g, M(0x3A3430, "wood"), 2.5, 0.08, 0.5, 0, 1.9, 0);
rf.rotation.x = 0.1;
for (var r = 0; r < 3; r++) {
B(g, wd, 2.2, 0.04, 0.04, 0, 1.0 + r * 0.32, 0);
for (var c = 0; c < 9; c++) {
var e = B(g, M(0xE8D0A0, "wood"), 0.18, 0.13, 0.015, -0.9 + c * 0.225, 0.9 + r * 0.32, 0.03);
e.rotation.z = (c % 3 - 1) * 0.06;
}
}
return g;
};
P.evb_omikuji = function () {
var g = G(), wd = M(C.cedar, "wood"), pp = M(0xFAF8F2);
B(g, wd, 0.08, 1.5, 0.08, -0.9, 0.75, 0);
B(g, wd, 0.08, 1.5, 0.08, 0.9, 0.75, 0);
for (var r = 0; r < 3; r++) {
Cy(g, M(0x8A8A8A), 0.008, 0.008, 1.8, 0, 0.7 + r * 0.3, 0, 4).rotation.z = Math.PI / 2;
for (var c = 0; c < 12; c++)
B(g, pp, 0.03, 0.1, 0.03, -0.8 + c * 0.145, 0.68 + r * 0.3, 0);
}
B(g, M(C.red, "wood"), 0.5, 0.7, 0.35, 1.4, 0.35, 0);
Cy(g, M(0xD8C8A0, "wood"), 0.08, 0.08, 0.4, 1.4, 0.85, 0, 8);
return g;
};
P.evb_temizu = function () {
var g = G(), st = M(0x8A8A82, "stone"), wd = M(C.cedar, "wood");
B(g, st, 2.0, 0.8, 0.9, 0, 0.4, 0);
B(g, evbGlow(0x6AB8E0, 0.8), 1.8, 0.02, 0.7, 0, 0.79, 0);
for (var i = 0; i < 4; i++) {
var h = Cy(g, wd, 0.015, 0.015, 0.5, -0.6 + i * 0.4, 0.85, 0.2, 4);
h.rotation.x = Math.PI / 2;
Cy(g, wd, 0.05, 0.05, 0.07, -0.6 + i * 0.4, 0.85, -0.05, 8);
}
var sp = Cy(g, M(0x5A8A3A, "wood"), 0.05, 0.05, 0.8, 0.9, 1.1, 0, 8);
sp.rotation.z = 1.1;
[-0.9, 0.9].forEach(function (x) { B(g, wd, 0.12, 2.4, 0.12, x, 1.2, -0.4); });
var rf = B(g, M(0x3A3430, "wood"), 2.4, 0.1, 1.4, 0, 2.45, -0.1);
rf.rotation.x = 0.12;
return g;
};
P.evb_komainu = function () {
var g = G(), st = M(0xA8A49C, "stone");
B(g, st, 0.8, 0.6, 0.8, 0, 0.3, 0);
var b = S(g, st, 0.32, 0, 0.95, 0, 12);
b.scale.set(1, 1.2, 1.1);
S(g, st, 0.25, 0, 1.4, 0.15, 12);
S(g, st, 0.12, 0, 1.35, 0.4, 8);
for (var i = 0; i < 5; i++)
S(g, st, 0.09, (i - 2) * 0.08, 1.6, 0.05, 6);
return g;
};
P.evb_toro = function () {
var g = G(), st = M(0x9A968E, "stone");
Cy(g, st, 0.35, 0.42, 0.25, 0, 0.12, 0, 6);
Cy(g, st, 0.11, 0.13, 1.1, 0, 0.8, 0, 8);
B(g, st, 0.55, 0.1, 0.55, 0, 1.4, 0);
B(g, evbGlow(0xFFD890, 0.9), 0.36, 0.34, 0.36, 0, 1.62, 0);
var r = Co(g, st, 0.55, 0.4, 0, 2.0, 0, 6);
S(g, st, 0.08, 0, 2.25, 0, 6);
return g;
};
P.evb_shimenawa = function () {
var g = G(), rp = M(C.straw, "wood"), pp = M(0xFFFFFF);
var r = Cy(g, rp, 0.16, 0.16, 3.4, 0, 2.9, 0, 10);
r.rotation.z = Math.PI / 2;
for (var i = 0; i < 4; i++) {
var x = -1.2 + i * 0.8;
for (var k = 0; k < 4; k++)
B(g, pp, 0.1, 0.12, 0.01, x + (k % 2) * 0.05, 2.65 - k * 0.12, 0.12);
}
return g;
};
P.evb_kagura = function () {
var g = G(), wd = M(C.cedar, "wood"), rd = M(C.red, "wood");
B(g, wd, 3.6, 0.6, 3.6, 0, 0.3, 0);
[[-1.7, -1.7], [1.7, -1.7], [-1.7, 1.7], [1.7, 1.7]].forEach(function (p) { Cy(g, rd, 0.08, 0.08, 3.4, p[0], 2.3, p[1], 8); });
B(g, M(0x3A3430, "wood"), 4.0, 0.12, 4.0, 0, 4.05, 0);
[-1, 1].forEach(function (s) { B(g, rd, 3.5, 0.06, 0.06, 0, 0.95, s * 1.75); });
return g;
};
P.evb_tatami = function () {
var g = G(), tm = M(0xC8C080, "carpet"), ed = M(0x2A3A2A);
for (var i = 0; i < 6; i++) {
var x = (i % 3 - 1) * 0.95, z = (i < 3 ? -0.95 : 0.95) / 2;
B(g, tm, 0.9, 0.04, 1.85 / 2 * 1.0, x, 0.02, z);
B(g, ed, 0.9, 0.045, 0.04, x, 0.02, z + 0.46);
}
return g;
};
P.evb_buddha = function () {
var g = G(), gd = M(C.gold, null, { e: 0x3A2A06 }), lo = M(0xE89AB0, "marble");
Cy(g, M(0x6A3A2A, "wood"), 1.1, 1.2, 0.5, 0, 0.25, 0, 16);
for (var i = 0; i < 12; i++) {
var a = i * 0.524, p = S(g, lo, 0.28, Math.cos(a) * 0.95, 0.6, Math.sin(a) * 0.95, 8);
p.scale.set(1, 0.5, 0.6);
p.rotation.y = -a;
}
var lap = S(g, gd, 0.85, 0, 0.85, 0.1, 14);
lap.scale.set(1, 0.38, 0.8);
var bd = Cy(g, gd, 0.45, 0.62, 1.3, 0, 1.6, 0, 14);
S(g, gd, 0.36, 0, 2.55, 0.03, 14);
S(g, gd, 0.16, 0, 2.92, 0, 10);
Tor(g, evbGlow(0xFFE8A0, 0.5), 0.6, 0.03, 0, 2.55, -0.25, 0);
[-1, 1].forEach(function (s) { var a = Cy(g, gd, 0.13, 0.12, 0.9, s * 0.5, 1.75, 0.15, 8); a.rotation.z = s * 0.3; a.rotation.x = 0.3; });
return g;
};
P.evb_bonsho = function () {
var g = G(), br = M(0x6A5A3A, null, { e: 0x0A0804 }), wd = M(0x6A4A2A, "wood");
[-1.2, 1.2].forEach(function (x) { B(g, wd, 0.25, 3.6, 0.25, x, 1.8, 0); });
B(g, wd, 2.9, 0.3, 0.4, 0, 3.65, 0);
Cy(g, br, 0.7, 0.85, 1.7, 0, 2.4, 0, 18);
S(g, br, 0.7, 0, 3.2, 0, 14).scale.set(1, 0.45, 1);
for (var i = 0; i < 4; i++)
Cy(g, br, 0.87, 0.87, 0.05, 0, 1.75 + i * 0.42, 0, 18);
var lg = Cy(g, M(0xB08A5A, "wood"), 0.1, 0.1, 1.6, 0, 2.0, 1.1, 8);
lg.rotation.z = Math.PI / 2;
return g;
};
P.evb_heartpillar = function () {
var g = G(), wd = M(0x8A5A32, "wood");
Cy(g, wd, 0.42, 0.48, 5.6, 0, 2.8, 0, 12);
for (var i = 0; i < 4; i++)
Cy(g, M(C.gold, null, { e: 0x2A1E04 }), 0.5, 0.5, 0.06, 0, 0.6 + i * 1.4, 0, 14);
B(g, M(0x6A6A62, "stone"), 1.3, 0.3, 1.3, 0, 0.15, 0);
return g;
};
P.evb_zafu = function () { var g = G(); B(g, M(0x2A2A3A, "carpet"), 0.85, 0.06, 0.85, 0, 0.03, 0); var c = Cy(g, M(C.saffron, "damask"), 0.22, 0.24, 0.2, 0, 0.16, 0, 14); return g; };
P.evb_sutras = function () {
var g = G(), wd = M(0x7A2A1E, "wood"), gd = M(C.gold);
B(g, wd, 1.6, 2.0, 0.5, 0, 1.0, 0);
for (var r = 0; r < 4; r++) {
B(g, M(0x2A1A10, "wood"), 1.5, 0.04, 0.46, 0, 0.3 + r * 0.45, 0.02);
for (var c = 0; c < 6; c++)
B(g, M([0xE8D8A8, C.saffron, 0xD8C090][c % 3]), 0.2, 0.32, 0.36, -0.6 + c * 0.24, 0.48 + r * 0.45, 0.04);
}
B(g, gd, 1.7, 0.08, 0.55, 0, 2.04, 0);
return g;
};
P.evb_censer = function () {
var g = G(), br = M(0x5A4A2A, null, { e: 0x0A0804 });
for (var i = 0; i < 3; i++) {
var a = i * 2.094;
Cy(g, br, 0.05, 0.04, 0.35, Math.cos(a) * 0.32, 0.18, Math.sin(a) * 0.32, 6);
}
var b = S(g, br, 0.42, 0, 0.6, 0, 14);
b.scale.set(1, 0.6, 1);
Cy(g, br, 0.45, 0.45, 0.06, 0, 0.82, 0, 16);
for (var k = 0; k < 3; k++) {
Cy(g, M(0xB04A2A), 0.008, 0.008, 0.4, (k - 1) * 0.1, 1.02, 0, 4);
Cy(g, evbGlow(0xD8D8E0, 0.25), 0.03, 0.08, 0.9, (k - 1) * 0.1, 1.65, 0, 6);
}
return g;
};
P.evb_mokugyo = function () {
var g = G();
B(g, M(0x7A2A1E, "wood"), 0.6, 0.3, 0.6, 0, 0.15, 0);
var f = S(g, M(0xB8743A, "wood"), 0.26, 0, 0.48, 0, 12);
f.scale.set(1.2, 0.85, 1);
var st = Cy(g, M(0x5A3A2A, "wood"), 0.015, 0.015, 0.35, 0.3, 0.6, 0.1, 4);
st.rotation.z = 0.8;
return g;
};
P.evb_tablets = function () {
var g = G(), wd = M(0x8A6A3A, "wood"), cl = M(0xC8A070, "stone");
B(g, wd, 1.8, 1.8, 0.45, 0, 0.9, -0.02);
for (var r = 0; r < 4; r++) {
B(g, M(0x6A4A2A, "wood"), 1.7, 0.04, 0.42, 0, 0.25 + r * 0.45, 0.02);
for (var c = 0; c < 7; c++) {
var t = B(g, cl, 0.16, 0.22, 0.05, -0.7 + c * 0.23, 0.4 + r * 0.45, 0.05);
t.rotation.x = -0.25;
}
}
return g;
};
P.evb_lamassu = function () {
var g = G(), st = M(0xD8C8A8, "stone");
B(g, st, 1.0, 0.5, 2.6, 0, 0.25, 0);
var bd = B(g, st, 0.9, 1.3, 2.0, 0, 1.15, 0);
for (var i = 0; i < 4; i++)
B(g, st, 0.22, 0.9, 0.22, (i % 2 ? 0.3 : -0.3), 0.45 + 0.5, i < 2 ? 0.8 : -0.8);
var w = B(g, st, 0.12, 1.2, 1.8, 0.45, 1.8, -0.2);
w.rotation.x = -0.35;
var w2 = B(g, st, 0.12, 1.2, 1.8, -0.45, 1.8, -0.2);
w2.rotation.x = -0.35;
B(g, st, 0.6, 0.8, 0.6, 0, 2.1, 1.15);
Cy(g, st, 0.3, 0.3, 0.5, 0, 2.75, 1.15, 10);
B(g, M(0x6A5A40, "stone"), 0.5, 0.4, 0.2, 0, 1.8, 1.42);
return g;
};
P.evb_grainjars = function () {
var g = G(), cl = M(C.clay);
[[-0.5, 0], [0.5, 0], [0, 0.55]].forEach(function (p, i) {
var b = S(g, cl, 0.4, p[0], 0.62, p[1], 12);
b.scale.set(1, 1.5, 1);
Cy(g, M(0x8A5A3A), 0.18, 0.22, 0.15, p[0], 1.25, p[1], 10);
Tor(g, M(0x7A4A2A), 0.4, 0.03, p[0], 0.7, p[1], Math.PI / 2);
});
return g;
};
P.evb_moonchart = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
B(g, wd, 0.1, 2.4, 0.1, -0.8, 1.2, 0);
B(g, wd, 0.1, 2.4, 0.1, 0.8, 1.2, 0);
B(g, M(0x1A2240), 1.6, 1.4, 0.04, 0, 1.6, 0.02);
for (var i = 0; i < 8; i++) {
var a = i * 0.785, m = S(g, evbGlow(0xF0E8C8), 0.08, Math.cos(a) * 0.45, 1.6 + Math.sin(a) * 0.45, 0.06, 10);
m.scale.z = 0.2;
}
S(g, evbGlow(0xFFF0C0), 0.14, 0, 1.6, 0.06, 12).scale.z = 0.2;
for (var k = 0; k < 14; k++)
S(g, evbGlow(0xFFFFFF), 0.02, ((k * 37) % 140) / 100 - 0.7, 1.0 + ((k * 53) % 120) / 100, 0.06, 4);
return g;
};
P.evb_mihrab = function () {
var g = G(), tl = M(C.tile, "marble"), gd = M(C.gold, null, { e: 0x2A2006 }), wh = M(0xF4F0E8, "marble");
B(g, wh, 3.0, 4.6, 0.4, 0, 2.3, -0.1);
B(g, tl, 2.0, 3.2, 0.1, 0, 1.9, 0.12);
B(g, M(0x0E3A5A, "marble"), 1.4, 2.6, 0.12, 0, 1.6, 0.16);
var ar = Cy(g, M(0x0E3A5A, "marble"), 0.7, 0.7, 0.12, 0, 2.9, 0.16, 20);
ar.rotation.x = Math.PI / 2;
Tor(g, gd, 1.0, 0.06, 0, 3.0, 0.2, 0);
B(g, gd, 2.6, 0.1, 0.1, 0, 4.2, 0.12);
for (var i = 0; i < 5; i++)
B(g, gd, 0.06, 2.6, 0.03, -0.9 + i * 0.45, 1.5, 0.18);
return g;
};
P.evb_minbar = function () {
var g = G(), wd = M(0x6A3A1E, "wood"), gd = M(C.gold);
for (var i = 0; i < 6; i++)
B(g, wd, 0.9, 0.3 + i * 0.3, 0.45, 0, (0.3 + i * 0.3) / 2, 1.2 - i * 0.45);
[-0.47, 0.47].forEach(function (x) { var r = B(g, wd, 0.06, 2.4, 2.8, x, 1.3, 0.1); B(g, gd, 0.07, 0.06, 2.8, x, 1.6, 0.1); });
B(g, wd, 1.0, 2.6, 0.1, 0, 2.3, -1.3);
var cp = Co(g, M(0x2A6A5A, "wood"), 0.6, 1.0, 0, 3.9, -1.0, 4);
cp.rotation.y = Math.PI / 4;
return g;
};
P.evb_prayrow = function () {
var g = G(), cols = [0xA8202A, 0x1E5A8A, 0x2A7A3A, 0x8A2A6A, 0xB87A1A];
for (var i = 0; i < 5; i++) {
B(g, M(cols[i], "carpet"), 0.75, 0.03, 1.25, -1.6 + i * 0.8, 0.015, 0);
B(g, M(0xE8D8A8, "carpet"), 0.55, 0.035, 0.06, -1.6 + i * 0.8, 0.017, -0.5);
var a = new THREE.Mesh(evbGeo("h", 0.27, 16), M(0xE8D8A8, "carpet"));
a.rotation.x = -Math.PI / 2;
a.position.set(-1.6 + i * 0.8, 0.036, -0.47);
g.add(a);
}
return g;
};
P.evb_mlamp = function () {
var g = G(), gl = M(0x9AD0E0, null, { op: 0.7, e: 0x2A4A50 }), gd = M(C.gold);
for (var i = 0; i < 3; i++) {
var a = i * 2.094;
var c = Cy(g, gd, 0.006, 0.006, 1.6, Math.cos(a) * 0.12, 3.5, Math.sin(a) * 0.12, 4);
c.rotation.z = Math.cos(a) * 0.06;
}
var b = S(g, gl, 0.24, 0, 2.55, 0, 12);
b.scale.set(1, 0.8, 1);
Cy(g, gl, 0.24, 0.14, 0.32, 0, 2.85, 0, 12);
S(g, evbGlow(0xFFE0A0, 0.95), 0.1, 0, 2.55, 0, 8);
return g;
};
P.evb_wudu = function () {
var g = G(), st = M(0xE8E4DA, "marble"), br = M(0xC8A050);
B(g, M(0x8A8A82, "stone"), 3.0, 0.4, 0.4, 0, 0.2, 0.9);
B(g, st, 3.2, 0.9, 0.3, 0, 0.45, -0.2);
B(g, evbGlow(0x6AB8E0, 0.8), 3.0, 0.03, 0.3, 0, 0.06, 0.3);
for (var i = 0; i < 5; i++) {
var x = -1.2 + i * 0.6;
Cy(g, br, 0.025, 0.025, 0.25, x, 1.0, -0.05, 6).rotation.x = Math.PI / 2;
Cy(g, br, 0.05, 0.05, 0.08, x, 1.0, -0.2, 8);
}
return g;
};
P.evb_sahn = function () {
var g = G(), st = M(0xF4F0E8, "marble"), w = evbGlow(0x6AC8F0, 0.8);
Cy(g, st, 1.6, 1.7, 0.6, 0, 0.3, 0, 8);
Cy(g, w, 1.45, 1.45, 0.02, 0, 0.6, 0, 8);
Cy(g, st, 0.25, 0.3, 1.0, 0, 1.0, 0, 8);
Cy(g, st, 0.6, 0.4, 0.18, 0, 1.55, 0, 8);
Cy(g, w, 0.5, 0.5, 0.02, 0, 1.65, 0, 8);
var s1 = B(g, M(C.tile, "marble"), 0.8, 0.03, 0.8, 0, 0.62, 0);
var s2 = B(g, M(C.tile, "marble"), 0.8, 0.03, 0.8, 0, 0.621, 0);
s2.rotation.y = Math.PI / 4;
return g;
};
P.evb_rehal = function () {
var g = G(), wd = M(0x8A4A22, "wood");
var a = B(g, wd, 0.5, 0.6, 0.03, 0, 0.3, 0.1);
a.rotation.x = 0.6;
var b = B(g, wd, 0.5, 0.6, 0.03, 0, 0.3, -0.1);
b.rotation.x = -0.6;
var bk = B(g, M(0x1E5A3A, "damask"), 0.4, 0.06, 0.3, 0, 0.58, 0);
B(g, M(C.gold), 0.2, 0.07, 0.15, 0, 0.59, 0);
B(g, M(0xA8202A, "damask"), 0.7, 0.12, 0.7, 0, 0.06, 0.8);
return g;
};
P.evb_astrolabe = function () {
var g = G(), br = M(0xC8A050, null, { e: 0x1A1404 });
Cy(g, M(0x5A3A2A, "wood"), 0.3, 0.35, 0.9, 0, 0.45, 0, 10);
var d = Cy(g, br, 0.42, 0.42, 0.04, 0, 1.4, 0, 24);
d.rotation.x = Math.PI / 2;
Tor(g, br, 0.44, 0.03, 0, 1.4, 0.02, 0);
var r = B(g, br, 0.8, 0.03, 0.02, 0, 1.4, 0.04);
r.rotation.z = 0.5;
Tor(g, br, 0.08, 0.015, 0, 1.88, 0, 0);
return g;
};
P.evb_geotile = function () {
var g = G(), t = typeof esCanvas === "function" ? esCanvas("evbgeo", 256, 1, function (x, W, H) {
x.fillStyle = "#0E3A5A";
x.fillRect(0, 0, W, H);
var n = 4, s = W / n;
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var cx = s * (i + 0.5), cy = s * (j + 0.5);
x.save();
x.translate(cx, cy);
for (var k = 0; k < 2; k++) {
x.rotate(Math.PI / 4 * k);
x.fillStyle = k ? "#1E8A9A" : "#E8C060";
x.fillRect(-s * 0.3, -s * 0.3, s * 0.6, s * 0.6);
}
x.fillStyle = "#F4F0E8";
x.beginPath();
x.arc(0, 0, s * 0.12, 0, 7);
x.fill();
x.restore();
}
}) : null;
var p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), t ? new THREE.MeshLambertMaterial({ map: t }) : M(C.tile));
p.position.set(0, 1.9, 0.03);
g.add(p);
B(g, M(C.gold), 2.6, 0.08, 0.06, 0, 3.15, 0.02);
B(g, M(C.gold), 2.6, 0.08, 0.06, 0, 0.65, 0.02);
return g;
};
P.evb_prayerwheels = function () {
var g = G(), wd = M(C.maroon, "wood"), gd = M(C.gold, null, { e: 0x2A2006 });
B(g, wd, 3.6, 0.2, 0.5, 0, 0.1, 0);
B(g, wd, 3.6, 0.14, 0.5, 0, 1.9, 0);
for (var i = 0; i < 6; i++) {
var x = -1.5 + i * 0.6, w = G();
w.position.set(x, 1.0, 0);
Cy(w, gd, 0.2, 0.2, 0.75, 0, 0, 0, 12);
for (var k = 0; k < 3; k++)
Cy(w, M([C.red, 0x1E5AA8, 0x2A8A3A][k]), 0.205, 0.205, 0.06, 0, -0.2 + k * 0.2, 0, 12);
Cy(w, M(0x5A3A2A, "wood"), 0.02, 0.02, 1.7, 0, 0, 0, 4);
g.add(w);
evbSpinMark(w, 0.5 + (i % 3) * 0.15);
}
return g;
};
P.evb_butterlamps = function () {
var g = G(), wd = M(C.maroon, "wood"), gd = M(C.gold);
B(g, wd, 1.8, 0.9, 0.6, 0, 0.45, 0);
for (var r = 0; r < 3; r++) {
B(g, wd, 1.8 - r * 0.3, 0.15, 0.6 - r * 0.12, 0, 0.97 + r * 0.15, 0);
for (var c = 0; c < (7 - r * 2); c++) {
var x = -(6 - r * 2) * 0.12 + c * 0.24;
Cy(g, gd, 0.05, 0.035, 0.08, x, 1.1 + r * 0.15, 0, 8);
Co(g, evbGlow(0xFFC850, 0.9), 0.025, 0.08, x, 1.18 + r * 0.15, 0, 6);
}
}
return g;
};
P.evb_mandala = function () {
var g = G(), wd = M(C.maroon, "wood");
B(g, wd, 2.2, 0.5, 2.2, 0, 0.25, 0);
var cols = [0xE82A2A, 0xFFCC20, 0x2A6AE8, 0x2AA84A, 0xF4F0E8, 0x1A1A1A];
for (var i = 0; i < 6; i++) {
var m = new THREE.Mesh(new THREE.RingGeometry(0.15 + i * 0.14, 0.29 + i * 0.14, i % 2 ? 4 : 32), M(cols[i]));
m.rotation.x = -Math.PI / 2;
m.position.y = 0.505 + i * 0.001;
if (i % 2)
m.rotation.z = Math.PI / 4;
g.add(m);
}
return g;
};
P.evb_thangka = function () {
var g = G(), t = typeof esCanvas === "function" ? esCanvas("evbthangka", 128, 1, function (x, W, H) {
x.fillStyle = "#7A1E24";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8C060";
x.fillRect(8, 8, W - 16, H - 16);
x.fillStyle = "#2A4AA8";
x.fillRect(14, 14, W - 28, H - 28);
x.fillStyle = "#FFCC40";
x.beginPath();
x.arc(W / 2, H * 0.42, W * 0.22, 0, 7);
x.fill();
x.fillStyle = "#E89A20";
x.beginPath();
x.arc(W / 2, H * 0.42, W * 0.13, 0, 7);
x.fill();
x.fillStyle = "#E89AB0";
for (var i = 0; i < 8; i++) {
x.beginPath();
x.ellipse(W / 2 + Math.cos(i * 0.785) * W * 0.08, H * 0.74 + Math.sin(i * 0.785) * W * 0.04, W * 0.08, W * 0.03, i * 0.785, 0, 7);
x.fill();
}
}) : null;
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.7), t ? new THREE.MeshLambertMaterial({ map: t }) : M(C.maroon));
p.position.set(0, 1.8, 0.03);
g.add(p);
Cy(g, M(0x3A2A1A, "wood"), 0.03, 0.03, 1.3, 0, 2.7, 0.04, 6).rotation.z = Math.PI / 2;
Cy(g, M(0x3A2A1A, "wood"), 0.03, 0.03, 1.3, 0, 0.92, 0.04, 6).rotation.z = Math.PI / 2;
return g;
};
P.evb_flags = function () {
var g = G(), cols = [0x2A6AE8, 0xF4F0E8, 0xE82A2A, 0x2AA84A, 0xFFCC20];
for (var i = 0; i < 15; i++) {
var x = -2.8 + i * 0.4;
B(g, M(cols[i % 5], null, { side: 1 }), 0.3, 0.32, 0.01, x, 3.0 - Math.abs(x) * -0.05 - Math.cos(x * 0.5) * 0.15, 0);
}
Cy(g, M(0x8A7A5A), 0.006, 0.006, 6, 0, 3.2, 0, 3).rotation.z = Math.PI / 2;
return g;
};
P.evb_chorten = function () {
var g = G(), wh = M(0xF8F4EC, "stone"), gd = M(C.gold, null, { e: 0x2A2006 });
B(g, wh, 1.8, 0.5, 1.8, 0, 0.25, 0);
B(g, wh, 1.4, 0.4, 1.4, 0, 0.7, 0);
var d = S(g, wh, 0.75, 0, 1.4, 0, 16);
d.scale.set(1, 0.8, 1);
B(g, wh, 0.6, 0.3, 0.6, 0, 2.05, 0);
for (var i = 0; i < 6; i++)
Cy(g, gd, 0.24 - i * 0.03, 0.24 - i * 0.03, 0.1, 0, 2.3 + i * 0.14, 0, 12);
S(g, gd, 0.1, 0, 3.25, 0, 8);
return g;
};
P.evb_darkaltar = function () {
var g = G(), ob = M(C.obsid, "marble"), rn = evbGlow(C.ember, 0.85);
B(g, M(0x2A2230, "stone"), 3.0, 0.3, 1.8, 0, 0.15, 0);
B(g, ob, 2.4, 1.0, 1.2, 0, 0.8, 0);
B(g, M(0x3A0A14, "damask"), 2.6, 0.04, 1.3, 0, 1.32, 0);
var r = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.3, 5), rn);
r.position.set(0, 0.8, 0.61);
g.add(r);
[[-1.1, 0.5], [1.1, 0.5], [-1.1, -0.5], [1.1, -0.5]].forEach(function (p) { Cy(g, M(0x0A0A0A), 0.05, 0.05, 0.5, p[0], 1.6, p[1], 6); Co(g, evbGlow(0xFF6A3A, 0.9), 0.03, 0.09, p[0], 1.9, p[1], 5); });
return g;
};
P.evb_voidorb = function () {
var g = G(), ir = M(0x2A2A30), core = G();
B(g, M(0x14101A, "stone"), 1.0, 1.2, 1.0, 0, 0.6, 0);
for (var i = 0; i < 4; i++) {
var a = i * 1.571, b = Cy(g, ir, 0.025, 0.025, 1.4, Math.cos(a) * 0.5, 1.85, Math.sin(a) * 0.5, 4);
}
Tor(g, ir, 0.52, 0.03, 0, 2.55, 0, Math.PI / 2);
S(core, M(0x0A0610, null, { op: 0.85, e: 0x2A0410 }), 0.42, 0, 0, 0, 16);
S(core, evbGlow(0xE0304A, 0.6), 0.18, 0, 0, 0, 10);
core.position.y = 1.85;
g.add(core);
evbSpinMark(core, 0.2);
return g;
};
P.evb_ossuary = function () {
var g = G(), st = M(0x3A3430, "stone"), bn = M(0xD8CCB0);
B(g, st, 2.4, 2.4, 0.6, 0, 1.2, -0.05);
for (var r = 0; r < 4; r++)
for (var c = 0; c < 5; c++) {
var x = -0.88 + c * 0.44, y = 0.4 + r * 0.55;
B(g, M(0x0A0808), 0.36, 0.42, 0.1, x, y, 0.22);
var sk = S(g, bn, 0.13, x, y, 0.28, 8);
sk.scale.set(1, 1.1, 1);
B(g, M(0x0A0808), 0.04, 0.05, 0.02, x - 0.05, y + 0.02, 0.4);
B(g, M(0x0A0808), 0.04, 0.05, 0.02, x + 0.05, y + 0.02, 0.4);
}
return g;
};
P.evb_blackcandles = function () {
var g = G(), ir = M(0x1A1A1E);
Cy(g, ir, 0.4, 0.5, 0.12, 0, 0.06, 0, 10);
Cy(g, ir, 0.04, 0.04, 1.2, 0, 0.6, 0, 6);
for (var i = 0; i < 7; i++) {
var a = i * 0.898, r = i ? 0.32 : 0, x = Math.cos(a) * r, z = Math.sin(a) * r, h = 0.5 + ((i * 13) % 5) * 0.12;
Cy(g, M(0x0E0E10), 0.04, 0.04, h, x, 1.2 + h / 2, z, 6);
Co(g, evbGlow(0xFF7A3A, 0.9), 0.025, 0.08, x, 1.24 + h, z, 5);
}
return g;
};
P.evb_shadowthrone = function () {
var g = G(), ob = M(C.obsid, "marble"), rd = M(C.blood, "damask");
B(g, M(0x2A2230, "stone"), 2.2, 0.4, 2.0, 0, 0.2, 0);
B(g, ob, 1.4, 0.6, 1.1, 0, 0.7, 0.05);
B(g, rd, 1.2, 0.12, 0.95, 0, 1.06, 0.08);
B(g, ob, 1.5, 3.2, 0.3, 0, 2.4, -0.45);
[-0.7, 0.7].forEach(function (x) { var h = Co(g, ob, 0.14, 1.1, x, 4.3, -0.45, 6); h.rotation.z = x > 0 ? -0.35 : 0.35; B(g, ob, 0.2, 0.7, 1.0, x, 1.2, 0.05); });
S(g, evbGlow(C.ember, 0.8), 0.12, 0, 3.6, -0.28, 8);
return g;
};
P.evb_chains = function () { var g = G(), ir = M(0x3A3A40); for (var c = 0; c < 3; c++)
for (var i = 0; i < 9; i++) {
var l = Tor(g, ir, 0.07, 0.018, (c - 1) * 0.5, 3.4 - i * 0.12, 0, 0);
l.rotation.y = i % 2 ? Math.PI / 2 : 0;
} return g; };
P.evb_rift = function () { var g = G(); for (var i = 0; i < 5; i++) {
var b = B(g, evbGlow(0xC0203A, 0.75), 0.12, 0.02, 0.8 + (i % 3) * 0.4, (i - 2) * 0.35, 0.012, (i % 2) * 0.3);
b.rotation.y = (i - 2) * 0.5;
} return g; };
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_goddess", "evb_doric", "evb_tripod", "evb_oracle", "evb_kline", "evb_saisen", "evb_ema", "evb_omikuji", "evb_temizu", "evb_komainu", "evb_toro", "evb_kagura",
"evb_buddha", "evb_bonsho", "evb_heartpillar", "evb_sutras", "evb_censer", "evb_tablets", "evb_lamassu", "evb_grainjars", "evb_minbar", "evb_wudu", "evb_sahn", "evb_astrolabe",
"evb_prayerwheels", "evb_butterlamps", "evb_mandala", "evb_chorten", "evb_darkaltar", "evb_voidorb", "evb_ossuary", "evb_blackcandles", "evb_shadowthrone", "evb_amphora", "evb_moonchart"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
var EVB_GRID = {
mid: { X: 18, Z: 18, hx: 6, hd: 8, s: 2.5, g0: -6, g1: -3, m: 3.5, xi: 10, x1: 12, c: 4, x4: 11 },
temple: { X: 16, Z: 18, hx: 5, hd: 7, s: 2.5, g0: -4, g1: -1, m: 5, xi: 9, x1: 10.5, c: 4, x4: 10 },
wide: { X: 22, Z: 18, hx: 6, hd: 9, s: 2.5, g0: -6, g1: -3, m: 3, xi: 12, x1: 14, c: 5, x4: 13 }
};
var EVB_BACK = ["l4i", "l4o", "c4", "r4i", "r4o"];
function evbTheme(key, o) { EVB_THEMES[key] = o; }
function evbFins(map) { if (typeof ES_FINISH === "undefined")
return; Object.keys(map).forEach(function (k) { var a = map[k]; ES_FINISH[k] = { f: a[0], fc: a[1], w: a[2], p: a[3], t: a[4], c: a[5] || null }; }); }
function evbHouse(key, o) { if (typeof ES_HOUSES !== "undefined")
ES_HOUSES["evb_" + key] = o; }
evbTheme("grandtemple", { corner: "espalm", seed: 21, panel: 0xEDE6D6,
pal: { fab: "crimson", fab2: "ivory", wood: "walnut", metal: "brass", stone: "marble", art: 2, rug: 1, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF4F0E6, "plaster"], "D8D0C0|coffer": [0xE8DCC0, "coffer"] },
hello: "🏛️ <b>Inside the Grand Temple.</b> A temple of the old Greek kind, the house of a goddess: the cella at the back with her great statue, the treasury, the oracle's chamber, the scroll library, the symposium. Look for the ✨ cards. The way out is the bronze doors at the front." });
evbHouse("grandtemple", { g: EVB_GRID.temple, h: 6.2, levels: 1, stairX: 4, stairZ: 12, floors: ["The temple"], wall: 0xEDE6D6, trim: 0xC8A860,
plan: [{ hall: { k: "gtporch", n: "The Pronaos, the Porch" }, spine: { k: "gtway", n: "The Hall of Offerings" }, gallery: { k: "gtcolon", n: "The Inner Colonnade" },
back: { merge: EVB_BACK, k: "gtcella", n: "The Cella of the Goddess" },
r1i: { k: "gtrobe", n: "The Priestesses' Robing Room" }, r1o: { k: "gtlamp", n: "The Lamp Room" },
r2i: { k: "gttreasury", n: "The Treasury" }, r2o: { k: "gtoracle", n: "The Oracle's Chamber" },
r3i: { k: "gtscroll", n: "The Scroll Library" }, r3o: { k: "gtsculpt", n: "The Sculptors' Workshop" },
l1i: { k: "gtmusic", n: "The Musicians' Room" }, l1o: { k: "gtvotive", n: "The Votive Room" },
l2i: { k: "gttwelve", n: "The Hall of the Twelve" }, l2o: { k: "gtstars", n: "The Astronomers' Room" },
l3i: { k: "gtsymp", n: "The Symposium" }, l3o: { k: "gtkitchen", n: "The Feast Kitchen" } }] });
evbTheme("shrine", { corner: "evb_toro", seed: 23, panel: 0xE8DCC4,
pal: { fab: "crimson", fab2: "ivory", wood: "cherry", metal: "brass", stone: "stone", art: 4, rug: 4, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF2EADA, "plaster"], "D8D0C0|coffer": [0xC8A878, "coffer"] },
hello: "⛩️ <b>Inside the shrine.</b> A Shinto shrine, the home of a kami: wash at the basin, ring the bell in the Hall of Worship, write a wish on an ema, draw your fortune. Look for the ✨ cards. Walk out by the front to leave." });
evbHouse("shrine", { g: EVB_GRID.mid, h: 4.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The shrine"], wall: 0xF2EADA, trim: 0xB23A2A,
plan: [{ hall: { k: "shapproach", n: "The Approach, the Sandō" }, spine: { k: "shlanterns", n: "The Lantern Walk" }, gallery: { k: "shveranda", n: "The Veranda" },
c4: { k: "shhonden", n: "The Honden, the Sanctuary" }, r4: { merge: ["r4i", "r4o"], k: "shhaiden", n: "The Haiden, the Hall of Worship" }, l4: { merge: ["l4i", "l4o"], k: "shkagura", n: "The Kagura-den, the Dance Hall" },
r1i: { k: "shoffice", n: "The Shrine Office" }, r1o: { k: "shema", n: "The Ema Wall" },
r2i: { k: "shfortune", n: "The Omikuji Room" }, r2o: { k: "shofferings", n: "The Offering Store" },
r3i: { k: "shpriest", n: "The Kannushi's Room" }, r3o: { k: "shmiko", n: "The Miko's Room" },
l1i: { k: "shtea", n: "The Tea Room" }, l1o: { k: "shmoss", n: "The Moss Garden" },
l2i: { k: "shtreasure", n: "The Treasure Hall" }, l2o: { k: "shbrush", n: "The Calligraphy Room" },
l3i: { k: "shfestival", n: "The Festival Store" }, l3o: { k: "shtaiko", n: "The Drum Room" } }] });
evbTheme("pagoda", { corner: "plant", seed: 25, panel: 0xE8D0A8,
pal: { fab: "mustard", fab2: "crimson", wood: "mahogany", metal: "gold", stone: "stone", art: 3, rug: 5, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF0E4CC, "plaster"], "D8D0C0|coffer": [0xA8382A, "coffer"] },
hello: "🛕 <b>Inside the pagoda.</b> Three floors round the heart pillar: the Buddha hall and the meditation hall below, the scriptorium and the thousand lamps above, the relic chamber at the top. Look for the ✨ cards; the stair is in the hall." });
evbHouse("pagoda", { g: EVB_GRID.mid, h: 4.2, levels: 3, stairX: 3.5, stairZ: 11, floors: ["The Buddha hall", "The lamp floor", "The relic floor"], wall: 0xF0E4CC, trim: 0xA8382A,
plan: [
{ hall: { k: "pggate", n: "The Gate Hall" }, spine: { k: "pgpillars", n: "The Pillar Walk" }, gallery: { k: "pgambul", n: "The Inner Ambulatory" },
back: { merge: EVB_BACK, k: "pgbuddha", n: "The Hall of the Buddha" },
r1: { merge: ["r1i", "r1o"], k: "pgbell", n: "The Bell Hall" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "pgzen", n: "The Meditation Hall" },
l1: { merge: ["l1i", "l1o"], k: "pgincense", n: "The Incense Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "pgsutra", n: "The Sutra Library" } },
{ hall: { k: "pgheart", n: "The Heart Pillar" }, spine: { k: "pglanterns", n: "The Gallery of Lanterns" }, gallery: { k: "pgbalcony", n: "The Balcony Walk" },
back: { merge: EVB_BACK, k: "pglamps", n: "The Hall of a Thousand Lamps" },
r1: { merge: ["r1i", "r1o"], k: "pgcells", n: "The Monks' Cells" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "pgcopy", n: "The Scriptorium" },
l1: { merge: ["l1i", "l1o"], k: "pgtea", n: "The Tea Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "pgbonsai", n: "The Garden Hall" } },
{ hall: { k: "pgtop", n: "The Top of the Pillar" }, spine: { k: "pgchimes", n: "The Wind Chime Walk" }, gallery: { k: "pglookout", n: "The Lookout Balcony" },
back: { merge: EVB_BACK, k: "pgrelic", n: "The Relic Chamber" },
r1: { merge: ["r1i", "r1o"], k: "pgfive", n: "The Room of the Five Elements" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "pgstill", n: "The Room of Stillness" },
l1: { merge: ["l1i", "l1o"], k: "pgloft", n: "The Bell Loft" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "pgquake", n: "The Builders' Room" } }
] });
evbTheme("ziggurat", { corner: "espalm", seed: 27, panel: 0xD8B888,
pal: { fab: "terracotta", fab2: "mustard", wood: "oak", metal: "copper", stone: "sandstone", art: 5, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE0C8A0, "plaster"], "D8D0C0|coffer": [0x2A4AA8, "coffer"] },
hello: "🧱 <b>Inside the ziggurat.</b> A stepped temple of old Sumer, built of mud brick, as the great ziggurat of Ur was for the moon god Nanna: the scribes' school, the tablet house, the Royal Game of Ur, and at the summit the moon's shrine. Look for the ✨ cards; the stair climbs from the Great Stair Hall." });
evbHouse("ziggurat", { g: EVB_GRID.mid, h: 4.4, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The terraces", "The summit"], wall: 0xE0C8A0, trim: 0x2A4AA8,
plan: [
{ hall: { k: "zgstair", n: "The Great Stair Hall" }, spine: { k: "zgkings", n: "The Hall of Kings" }, gallery: { k: "zgterrace", n: "The Terrace Walk" },
back: { merge: EVB_BACK, k: "zgcourt", n: "The Court of the Moon" },
r1i: { k: "zgschool", n: "The Tablet School (the Eduba)" }, r1o: { k: "zglibrary", n: "The Tablet House" },
r2i: { k: "zggranary", n: "The Granary" }, r2o: { k: "zgbakery", n: "The Temple Bakery" },
r3i: { k: "zgweave", n: "The Weavers' Room" }, r3o: { k: "zgcount", n: "The Counting Room" },
l1i: { k: "zglyre", n: "The Lyre Room" }, l1o: { k: "zggame", n: "The Royal Game of Ur" },
l2i: { k: "zgtreasure", n: "The Treasury of Ur" }, l2o: { k: "zgpots", n: "The Potters' Room" },
l3i: { k: "zglamps", n: "The Lamp Store" }, l3o: { k: "zgseals", n: "The Seal Cutters' Room" } },
{ hall: { k: "zgupper", n: "The Upper Terrace" }, spine: { k: "zgmoonpath", n: "The Path of the Moon" }, gallery: { k: "zgwatch", n: "The Watch Walk" },
back: { merge: EVB_BACK, k: "zgshrine", n: "The Shrine of Nanna at the Summit" },
r1: { merge: ["r1i", "r1o"], k: "zgastro", n: "The Astronomers' Roof" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "zggilgamesh", n: "The Hall of Gilgamesh" },
l1: { merge: ["l1i", "l1o"], k: "zgpriestess", n: "The High Priestess's Rooms" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "zggarden", n: "The Garden Terrace" } }
] });
evbTheme("mosque", { corner: "espalm", seed: 29, panel: 0xF4F0E8,
pal: { fab: "emerald", fab2: "ivory", wood: "walnut", metal: "brass", stone: "marble", art: 0, rug: 3, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF8F4EC, "plaster"], "D8D0C0|coffer": [0x1E6A8A, "coffer"] },
hello: "🕌 <b>Inside the mosque.</b> The courtyard and its fountain, the washing rooms, and the prayer hall with the mihrab that points the way to Mecca, the minbar, the lamps and the rows. The library, the school, the astronomers' room. As in any mosque there are no pictures of people or animals here, only pattern, light and words. Look for the ✨ cards." });
evbHouse("mosque", { g: EVB_GRID.wide, h: 5.6, levels: 1, stairX: 4, stairZ: 11, floors: ["The mosque"], wall: 0xF8F4EC, trim: 0xC8A050,
plan: [{ hall: { k: "mqsahn", n: "The Courtyard (the Sahn)" }, spine: { k: "mqriwaq", n: "The Arcade (the Riwaq)" }, gallery: { k: "mqqibla", n: "The Qibla Corridor" },
back: { merge: EVB_BACK, k: "mqprayer", n: "The Prayer Hall" },
r1i: { k: "mqwudu", n: "The Washing Room" }, r1o: { k: "mqminaret", n: "The Minaret Stair" },
r2i: { k: "mqlibrary", n: "The Library" }, r2o: { k: "mqcalli", n: "The Calligraphy Room" },
r3i: { k: "mqschool", n: "The Madrasa, the School Room" }, r3o: { k: "mqstars", n: "The Astronomers' Room" },
l1i: { k: "mqwudu", n: "The Second Washing Room" }, l1o: { k: "mqquiet", n: "The Quiet Reading Room" },
l2i: { k: "mqimam", n: "The Imam's Office" }, l2o: { k: "mqguest", n: "The Travellers' Room" },
l3i: { k: "mqkitchen", n: "The Kitchen" }, l3o: { k: "mqiftar", n: "The Dining Hall" } }] });
evbTheme("stupa", { corner: "evb_butterlamps", seed: 31, panel: 0xF4ECD8,
pal: { fab: "crimson", fab2: "mustard", wood: "mahogany", metal: "gold", stone: "stone", art: 3, rug: 7, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF8F2E4, "plaster"], "D8D0C0|coffer": [0x7A1E24, "coffer"] },
hello: "☸️ <b>Inside the stupa.</b> A Buddhist stupa of the Himalayan kind: walk the circling path clockwise, turn the prayer wheels, light a butter lamp in the relic hall, watch the monks make a sand mandala. Look for the ✨ cards." });
evbHouse("stupa", { g: EVB_GRID.mid, h: 4.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The stupa"], wall: 0xF8F2E4, trim: 0x7A1E24,
plan: [{ hall: { k: "stgate", n: "The Gate (the Torana)" }, spine: { k: "stwheels", n: "The Wheel Walk" }, gallery: { k: "stkora", n: "The Circling Path" },
back: { merge: EVB_BACK, k: "strelic", n: "The Relic Hall" },
r1i: { k: "stlamps", n: "The Butter Lamp House" }, r1o: { k: "stflags", n: "The Flag Room" },
r2i: { k: "stmandala", n: "The Mandala Room" }, r2o: { k: "stthangka", n: "The Thangka Gallery" },
r3i: { k: "stassembly", n: "The Assembly Hall" }, r3o: { k: "stkitchen", n: "The Monks' Kitchen" },
l1i: { k: "stlibrary", n: "The Library of Sutras" }, l1o: { k: "stdebate", n: "The Debate Courtyard" },
l2i: { k: "stmedicine", n: "The Healing Room" }, l2o: { k: "ststars", n: "The Astrologers' Room" },
l3i: { k: "stcave", n: "The Meditation Cave" }, l3o: { k: "stnovice", n: "The Novices' Room" } }] });
evbTheme("darkfane", { corner: "evb_blackcandles", seed: 33, panel: 0x3A2E48,
pal: { fab: "charcoal", fab2: "crimson", wood: "ebony", metal: "iron", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0x3A3046, "plaster"], "D8D0C0|coffer": [0x2E2438, "coffer"], "B8AE9E|marble": [0x3A2E48, "marble"], "D4CEC4|marble": [0x342A40, "marble"] },
hello: "🕯️ <b>Inside the dark fane.</b> A temple of shadows: the sanctum of the black altar, the ossuary, the scrying room, the forbidden library. Its cards tell you what the old stories said of such places. Walk softly. The way out is the front doors." });
evbHouse("darkfane", { g: EVB_GRID.mid, h: 5.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The fane"], wall: 0x4A3A58, trim: 0xA8182A,
plan: [{ hall: { k: "dfnarthex", n: "The Shadow Narthex" }, spine: { k: "dfnave", n: "The Nave of Whispers" }, gallery: { k: "dfchains", n: "The Ambulatory of Chains" },
back: { merge: EVB_BACK, k: "dfsanctum", n: "The Sanctum of the Black Altar" },
r1i: { k: "dfcandles", n: "The Candle Crypt" }, r1o: { k: "dfossuary", n: "The Ossuary" },
r2i: { k: "dfmasks", n: "The Hall of Masks" }, r2o: { k: "dfscry", n: "The Scrying Room" },
r3i: { k: "dfbooks", n: "The Forbidden Library" }, r3o: { k: "dfalembic", n: "The Alchemist's Cell" },
l1i: { k: "dfpenitent", n: "The Penitents' Hall" }, l1o: { k: "dfbell", n: "The Bell of Silence" },
l2i: { k: "dfreliquary", n: "The Reliquary" }, l2o: { k: "dfmirrors", n: "The Room of Black Glass" },
l3i: { k: "dfcircle", n: "The Binding Circle" }, l3o: { k: "dfvestry", n: "The Vestry of Shadows" } }] });
evbFins({
gtporch: ["marble", 0xF0EAE0, 0xEDE6D6, "marble", 0xC8A860, "coffer"], gtway: ["marble", 0xE8E0D2, 0xE8E0D0, "marble", 0xC8A860], gtcolon: ["marble", 0xF2ECE0, 0xEDE6D6, "marble", 0xC8A860],
gtcella: ["marble", 0xE0D6C4, 0xB8382A, "plaster", 0xD8B040, "coffer"], gtrobe: ["wood", 0xA88060, 0xE8DCC8, "plaster", 0xC8A860], gtlamp: ["stone", 0xB0A898, 0xD8C8A8, "plaster", 0xA87838],
gttreasury: ["marble", 0xD8D0C0, 0x2A3A6A, "plaster", 0xD8B040], gtoracle: ["stone", 0x8A8478, 0x4A4A5A, "stone", 0xA87838], gtscroll: ["wood", 0x9A7A58, 0xE4D8C0, "plaster", 0xA87838],
gtsculpt: ["stone", 0xC8C0B0, 0xE0D8C8, "plaster", 0x8A7A6A], gtmusic: ["herring", 0xB89A78, 0xD87A4A, "plaster", 0xC8A860], gtvotive: ["stone", 0xB8B0A0, 0xE8DCC0, "plaster", 0xA87838],
gttwelve: ["marble", 0xE8E2D6, 0x3A5A8A, "plaster", 0xD8B040, "coffer"], gtstars: ["wood", 0x7A5A3A, 0x1E2A4A, "plaster", 0xD8B040], gtsymp: ["checker", 0xD8CCB8, 0xC8502A, "plaster", 0xD8B040],
gtkitchen: ["tile", 0xB8A890, 0xE0D0B0, "plaster", 0x8A6A4A],
shapproach: ["stone", 0xA8A498, 0xE8DCC4, "wood", 0xB23A2A], shlanterns: ["stone", 0x9A968C, 0xE8DCC4, "wood", 0xB23A2A], shveranda: ["wood", 0xB08A5A, 0xF2EADA, "wood", 0xB23A2A],
shhonden: ["wood", 0xC8A878, 0xF8F4EC, "wood", 0xD8B040], shhaiden: ["wood", 0xB89060, 0xF2EADA, "wood", 0xB23A2A, "coffer"], shkagura: ["wood", 0xC09868, 0xF2EADA, "wood", 0xB23A2A],
shoffice: ["carpet", 0xC8C080, 0xF2EADA, "wood", 0x6A4A2A], shema: ["wood", 0xB08A5A, 0xF2EADA, "wood", 0xB23A2A], shfortune: ["carpet", 0xC8C080, 0xF8F0E0, "wood", 0xB23A2A],
shofferings: ["wood", 0xA88058, 0xE8DCC4, "wood", 0x6A4A2A], shpriest: ["carpet", 0xC8C080, 0xF2EADA, "wood", 0x6A4A2A], shmiko: ["carpet", 0xC8C080, 0xFFF0F0, "wood", 0xB23A2A],
shtea: ["carpet", 0xC8C080, 0xE8DCC0, "wood", 0x5A4A3A], shmoss: ["stone", 0x6A8A4A, 0xE8E4D8, "wood", 0x5A4A3A], shtreasure: ["wood", 0x8A6A4A, 0x3A3430, "wood", 0xD8B040],
shbrush: ["carpet", 0xC8C080, 0xF8F4EC, "wood", 0x2A2420], shfestival: ["wood", 0xA88058, 0xE8DCC4, "wood", 0xB23A2A], shtaiko: ["wood", 0xB08A5A, 0xE8DCC4, "wood", 0xB23A2A],
pggate: ["stone", 0xA8A094, 0xF0E4CC, "plaster", 0xA8382A], pgpillars: ["wood", 0x8A5A32, 0xF0E4CC, "plaster", 0xA8382A], pgambul: ["wood", 0x9A6A3A, 0xF0E4CC, "plaster", 0xA8382A],
pgbuddha: ["wood", 0x7A4A2A, 0xA8382A, "plaster", 0xD8B040, "coffer"], pgbell: ["stone", 0x9A9488, 0xF0E4CC, "plaster", 0x6A4A2A], pgzen: ["carpet", 0xC8C080, 0xF4ECDC, "plaster", 0x6A4A2A],
pgincense: ["wood", 0x8A5A32, 0xE8D0A8, "plaster", 0xA8382A], pgsutra: ["wood", 0x7A4A2A, 0xE8D8B8, "plaster", 0xA8382A], pgheart: ["wood", 0x8A5A32, 0xF0E4CC, "plaster", 0xA8382A],
pglanterns: ["wood", 0x8A5A32, 0xA8382A, "plaster", 0xD8B040], pgbalcony: ["wood", 0x9A6A3A, 0xF0E4CC, "plaster", 0xA8382A], pglamps: ["wood", 0x6A3A22, 0x5A1A14, "plaster", 0xD8B040, "coffer"],
pgcells: ["carpet", 0xC8C080, 0xF0E4CC, "plaster", 0x6A4A2A], pgcopy: ["wood", 0x9A6A3A, 0xF4ECDC, "plaster", 0x6A4A2A], pgtea: ["carpet", 0xC8C080, 0xE8DCC0, "plaster", 0x5A4A3A],
pgbonsai: ["stone", 0x8A9A6A, 0xF0E8D8, "plaster", 0x5A4A3A], pgtop: ["wood", 0x8A5A32, 0xF0E4CC, "plaster", 0xA8382A], pgchimes: ["wood", 0x9A6A3A, 0xF0E4CC, "plaster", 0xA8382A],
pglookout: ["wood", 0x9A6A3A, 0xF0E4CC, "plaster", 0xA8382A], pgrelic: ["marble", 0xE8DCC0, 0xD8B040, "plaster", 0xA8382A, "coffer"], pgfive: ["stone", 0xA8A094, 0xE8D8B8, "plaster", 0x6A4A2A],
pgstill: ["carpet", 0xC8C080, 0xF8F4EC, "plaster", 0x6A4A2A], pgloft: ["wood", 0x8A5A32, 0xE8D0A8, "plaster", 0x6A4A2A], pgquake: ["wood", 0x9A6A3A, 0xF0E4CC, "plaster", 0x6A4A2A],
zgstair: ["stone", 0xC8A878, 0xE0C8A0, "stone", 0x2A4AA8], zgkings: ["stone", 0xC0A070, 0xD8B888, "stone", 0x2A4AA8], zgterrace: ["stone", 0xC8A878, 0xE0C8A0, "stone", 0x2A4AA8],
zgcourt: ["stone", 0xB89868, 0xD8B888, "stone", 0x2A4AA8], zgschool: ["stone", 0xC0A070, 0xE8D4AC, "plaster", 0x8A5A3A], zglibrary: ["stone", 0xB89868, 0xE0C8A0, "plaster", 0x8A5A3A],
zggranary: ["stone", 0xB89060, 0xD8B888, "plaster", 0x8A5A3A], zgbakery: ["stone", 0xB08858, 0xE0C8A0, "plaster", 0x8A5A3A], zgweave: ["carpet", 0xC8A070, 0xE8D4AC, "plaster", 0x2A4AA8],
zgcount: ["stone", 0xC0A070, 0xE8D4AC, "plaster", 0x2A4AA8], zglyre: ["carpet", 0xA8382A, 0xE0C8A0, "plaster", 0xD8B040], zggame: ["stone", 0xC0A070, 0x2A4AA8, "plaster", 0xD8B040],
zgtreasure: ["stone", 0xB89868, 0x1E2A6A, "plaster", 0xD8B040], zgpots: ["stone", 0xB08858, 0xE0C8A0, "plaster", 0x8A5A3A], zglamps: ["stone", 0xB89868, 0xD8B888, "plaster", 0x8A5A3A],
zgseals: ["stone", 0xC0A070, 0xE8D4AC, "plaster", 0x2A4AA8], zgupper: ["stone", 0xC8A878, 0xE0C8A0, "stone", 0x2A4AA8], zgmoonpath: ["stone", 0xC0A070, 0x2A3A6A, "stone", 0xD8D8E0],
zgwatch: ["stone", 0xC8A878, 0xE0C8A0, "stone", 0x2A4AA8], zgshrine: ["stone", 0xB89868, 0x1E2A6A, "plaster", 0xD8D8E0, "coffer"], zgastro: ["stone", 0xB89868, 0x141A3A, "plaster", 0xD8D8E0],
zggilgamesh: ["stone", 0xC0A070, 0xD8B888, "stone", 0xD8B040], zgpriestess: ["carpet", 0x8A2A3A, 0xE8D4AC, "plaster", 0xD8B040], zggarden: ["stone", 0x8A9A5A, 0xE0C8A0, "stone", 0x2A4AA8],
mqsahn: ["marble", 0xF0ECE2, 0xF8F4EC, "marble", 0xC8A050], mqriwaq: ["marble", 0xE8E2D6, 0xF8F4EC, "plaster", 0xC8A050], mqqibla: ["marble", 0xE8E2D6, 0xF4F0E8, "plaster", 0x1E6A8A],
mqprayer: ["carpet", 0xA8202A, 0xF8F4EC, "plaster", 0xC8A050, "coffer"], mqwudu: ["tile", 0xD8E4E8, 0xE8F0F0, "tile", 0x1E6A8A], mqminaret: ["stone", 0xC8C0B0, 0xF4F0E8, "plaster", 0xC8A050],
mqlibrary: ["wood", 0x8A5A32, 0xF0E8D8, "plaster", 0xC8A050], mqcalli: ["carpet", 0x1E5A3A, 0xF8F4EC, "plaster", 0xC8A050], mqschool: ["carpet", 0x1E5A8A, 0xF4F0E8, "plaster", 0xC8A050],
mqstars: ["wood", 0x6A4A2A, 0x0E2A4A, "plaster", 0xC8A050], mqquiet: ["carpet", 0x2A6A4A, 0xF4F0E8, "plaster", 0xC8A050], mqimam: ["carpet", 0x6A2A2A, 0xF0E8D8, "plaster", 0xC8A050],
mqguest: ["carpet", 0xA8602A, 0xF4ECDC, "plaster", 0xC8A050], mqkitchen: ["tile", 0xD8D0C0, 0xF0E8D8, "tile", 0x8A6A4A], mqiftar: ["carpet", 0x8A2A2A, 0xF4ECDC, "plaster", 0xC8A050],
stgate: ["stone", 0xA8A094, 0xF8F2E4, "plaster", 0x7A1E24], stwheels: ["stone", 0x9A968C, 0xF8F2E4, "plaster", 0x7A1E24], stkora: ["stone", 0xA8A094, 0xF8F2E4, "plaster", 0x7A1E24],
strelic: ["wood", 0x7A2A1E, 0xE8B040, "plaster", 0x7A1E24, "coffer"], stlamps: ["wood", 0x6A2A1E, 0x7A1E24, "plaster", 0xD8B040], stflags: ["wood", 0x8A5A32, 0xF8F2E4, "plaster", 0x7A1E24],
stmandala: ["wood", 0x8A5A32, 0xF4ECD8, "plaster", 0x7A1E24], stthangka: ["wood", 0x7A4A2A, 0xE8D8B8, "plaster", 0x7A1E24], stassembly: ["carpet", 0x7A1E24, 0xE8B040, "plaster", 0x7A1E24],
stkitchen: ["stone", 0x9A9488, 0xE8D8B8, "plaster", 0x6A4A2A], stlibrary: ["wood", 0x7A4A2A, 0xE8D8B8, "plaster", 0x7A1E24], stdebate: ["stone", 0xB0A898, 0xF8F2E4, "plaster", 0x7A1E24],
stmedicine: ["wood", 0x8A5A32, 0xF0E8D8, "plaster", 0x2A6A3A], ststars: ["wood", 0x6A3A22, 0x1A2A5A, "plaster", 0xD8B040], stcave: ["stone", 0x7A746A, 0x8A8478, "stone", 0x5A4A3A],
stnovice: ["carpet", 0xA8382A, 0xF8F2E4, "plaster", 0x7A1E24],
dfnarthex: ["stone", 0x4A3A58, 0x4A3A58, "stone", 0x8A0A1A], dfnave: ["marble", 0x30263E, 0x3E3250, "stone", 0x8A0A1A], dfchains: ["stone", 0x3E3250, 0x4A3A58, "stone", 0x5A0A14],
dfsanctum: ["marble", 0x2A2034, 0x30263E, "stone", 0x8A0A1A, "coffer"], dfcandles: ["stone", 0x4A3A58, 0x3A2E48, "stone", 0x6A3A1A], dfossuary: ["stone", 0x5A524A, 0x4A3A58, "stone", 0x8A7A6A],
dfmasks: ["stone", 0x4A3A58, 0x5A1A28, "plaster", 0x8A0A1A], dfscry: ["marble", 0x2A2034, 0x2E2850, "plaster", 0x6A2A8A], dfbooks: ["wood", 0x4A2E24, 0x4A3A40, "wood", 0x8A0A1A],
dfalembic: ["stone", 0x4A3A58, 0x44443A, "stone", 0x5A6A2A], dfpenitent: ["stone", 0x4A3A58, 0x3E3250, "stone", 0x5A0A14], dfbell: ["stone", 0x4A3A58, 0x3A2E48, "stone", 0x6A6A70],
dfreliquary: ["marble", 0x30263E, 0x4A2A34, "plaster", 0xA88838], dfmirrors: ["marble", 0x241C2E, 0x2E2438, "marble", 0x6A6A70], dfcircle: ["stone", 0x30263E, 0x3E3250, "stone", 0xE0304A],
dfvestry: ["wood", 0x4A2E24, 0x4A3A58, "wood", 0x8A0A1A]
});
EVB_LD.grandtemple = { theme: "grandtemple", name: "The Grand Temple", doors: "the bronze doors" };
EVB_LD.shintoshrine = { theme: "shrine", name: "The Shrine", doors: "the shrine steps" };
EVB_LD.pagoda = { theme: "pagoda", name: "The Pagoda", doors: "the pagoda door" };
EVB_LD.ziggurat = { theme: "ziggurat", name: "The Ziggurat", doors: "the great stair" };
EVB_LD.mosque = { theme: "mosque", name: "The Mosque", doors: "the courtyard gate" };
EVB_LD.stupa = { theme: "stupa", name: "The Stupa", doors: "the gate" };
EVB_LD.darkfane = { theme: "darkfane", name: "The Dark Fane", doors: "the black doors" };
"use strict";
function evbFact(title, lines) { return function () { evbCard(title, evbPick(lines)); }; }
function evbInfo(title, body) { return function () { evbCard(title, body); }; }
function evbHum(notes, ms, s, say) { return function () { evbTune(notes, ms, s); if (say)
evbSay(say); }; }
var evbGtTemple = evbInfo("The Grand Temple", "A Greek temple was a house for a god, not a hall for a crowd: people gathered at the altar <b>outside</b>, and the temple held the god's statue and treasures. This one is built like the Parthenon in Athens (finished in 432 BC): a porch (the <i>pronaos</i>), the great room of the statue (the <i>cella</i>), and a ring of columns all round.");
var evbGtOfferings = evbFact("The offerings", ["Jars of olive oil, honey and wine, bronze tripods, little clay figures: Greeks gave gifts to a god to say thank you, or to ask for help.", "A tripod (a bowl on three legs) was a prize at the games, and a winner often gave it back to the god.", "The richest gifts were kept in the treasury, and written up on stone lists that still survive."]);
function evbGtGoddess() { return __ZC(367, 27, this, arguments, new.target); }
function evbGtFire() { evbTune([330, 392], 300, 0.8); evbSay("🔥 You drop a pinch of incense on the tripod's fire. Sweet smoke curls up toward the coffered ceiling."); }
var evbGtRobes = evbInfo("The priestesses", "Many Greek gods were served by priestesses: Athena Polias in Athens had a high priestess for life, chosen from one old family. She wore a long <i>peplos</i>, and every four years at the great Panathenaia festival a new peplos woven by Athenian girls was carried to the goddess.");
function evbGtLamp() { evbTune([523], 300, 0.6); evbSay("🪔 You fill a clay lamp with olive oil and trim the wick. Ancient temples were lit by hundreds of little lamps like this."); }
var evbGtTreasury = evbFact("The treasury", ["Greek cities built little treasury houses at Delphi and Olympia to hold their gifts to the gods: the Athenians' treasury at Delphi still stands.", "The gold on Athena's statue in the Parthenon could be taken off and weighed: about a tonne of it, the city's reserve in an emergency.", "Coins of Athens showed Athena's owl, and people called them 'owls'."]);
var evbGtOracle = function () { return __ZC(367, 28, this, arguments, new.target); };
var evbGtScroll = evbFact("A scroll", ["Homer's <i>Iliad</i> begins: 'Sing, goddess, the anger of Peleus' son Achilles.' It was sung long before it was written down.", "Greek books were scrolls of papyrus, from Egypt. A long work like the Iliad filled 24 scrolls, which is why it has 24 'books'.", "Aesop's fable: the tortoise and the hare. Slow and steady wins the race."]);
var evbGtColumns = evbInfo("How a temple was built", "Columns were built of stacked stone drums, fitted with wooden pegs, then carved with their grooves (fluting) once they stood. The Parthenon's columns lean very slightly inward and swell a little in the middle, so they look perfectly straight from below. The marble came from Mount Pentelicus, about 16 km away, dragged on sledges.");
function evbGtLyre() { evbTune([392, 440, 494, 523, 587, 523, 494, 440], 260, 0.6); evbSay("🎵 You pluck the lyre. Apollo's instrument: a sound box (once a tortoise shell, in the story) and seven strings."); }
var evbGtVotive = evbInfo("The votive room", "Votives are gifts given after a promise: 'if I get well, I will give you this.' Healing temples were full of little clay arms, legs and eyes, gifts from people who had been cured, each showing what had healed.");
var evbGtTwelve = function () { return __ZC(367, 29, this, arguments, new.target); };
var evbGtStars = evbFact("The Greek sky", ["Eratosthenes measured the size of the Earth about 240 BC with a stick, a shadow and the distance between two cities, and came remarkably close.", "Many of our constellations have Greek names: Orion the hunter, Perseus, Andromeda, the Great Bear.", "'Planet' is Greek for 'wanderer': the stars that move against the others."]);
function evbGtSymposium() { return __ZC(367, 30, this, arguments, new.target); }
var evbGtFeast = evbFact("The feast kitchen", ["After a sacrifice the meat was cooked and shared: a festival was a feast for the whole city.", "Greek staples: barley bread, olives, figs, cheese, fish, lentils and honey.", "Cooks were hired for big feasts, and Greek comedies make fun of them for bragging."]);
function evbShWash() { return __ZC(367, 31, this, arguments, new.target); }
var evbShHonden = evbInfo("The honden", "The innermost hall, where the kami (the spirit of the shrine) is thought to dwell in a sacred object, the <i>shintai</i>: often a mirror, a sword, a stone or even a whole mountain. Visitors do not go in: only the priests, and only at certain times. You bow from the threshold.");
function evbShPray() { return __ZC(367, 32, this, arguments, new.target); }
function evbShKagura() { return __ZC(367, 33, this, arguments, new.target); }
function evbShCharm() { return __ZC(367, 34, this, arguments, new.target); }
function evbShEma() { return __ZC(367, 35, this, arguments, new.target); }
function evbShFortune() { return __ZC(367, 36, this, arguments, new.target); }
var evbShOfferings = evbInfo("Offerings to the kami", "Rice, salt, water, sake, fish, vegetables and fruit are set before the kami each day (shinsen). The great barrels of sake stacked at many shrines are gifts from brewers, given for blessing.");
var evbShPriest = evbInfo("The kannushi", "The kannushi is the priest who looks after the shrine and performs its rites: purifying with the <i>ōnusa</i> (a wand of paper streamers), reading norito (prayers in old Japanese), blessing new cars, babies and buildings.");
function evbShMiko() { evbTune([1175, 1319, 1175], 160, 0.5); evbSay("🔔 You shake the kagura suzu, a little tree of bells. Miko, the shrine maidens in red hakama and white robes, help at the shrine and dance the kagura."); }
function evbShTea() { return __ZC(367, 37, this, arguments, new.target); }
var evbShMoss = evbInfo("The moss garden", "Japanese gardens are made to be looked at slowly: moss, raked gravel, stones placed like islands, a lantern, a maple. The famous moss garden of Saihō-ji in Kyoto has more than a hundred kinds of moss.");
var evbShTreasure = evbInfo("The treasure hall", "Shrines keep treasures given over the centuries: swords, armour, mirrors, masks for the dances, painted scrolls. The three old signs of the kami are a bronze mirror, a sword and curved jewels (magatama), the treasures in the story of the sun goddess Amaterasu.");
function evbShStamp() { evbTune([523, 659], 200, 0.4); evbSay("🖌️ The priest writes the shrine's name in ink in your book, and stamps its red seal over it: a <b>goshuin</b>. Pilgrims collect them from shrine to shrine."); }
var evbShFestival = evbInfo("The mikoshi", "At a festival (matsuri) the kami is carried round the neighbourhood in a mikoshi, a portable shrine on poles, by dozens of people shouting 'wasshoi!', so it can visit and bless everyone. Then it goes home to the shrine.");
function evbShTaiko() { evbTune([110, 110, 147, 110, 0, 110, 147], 220, 0.9); evbSay("🥁 DON, DON, doko-DON! The big taiko drum. Shrines beat drums at festivals and to mark the hours."); }
var evbPgPagoda = evbInfo("The pagoda", "A pagoda is a Buddhist tower, first built to hold relics of the Buddha (the idea came from the Indian stupa). In China, Korea and Japan it became a tower of storeys, each with its own roof: three, five, seven, nine. The oldest wooden one still standing is at Hōryū-ji in Japan, about 1,300 years old.");
function evbPgBuddha() { return __ZC(367, 38, this, arguments, new.target); }
function evbPgFish() { evbTune([660, 660, 660, 660], 300, 0.15); evbSay("🐟 Tok, tok, tok, tok. The <b>mokugyo</b>, the wooden fish, keeps the beat of the chanting. A fish, because a fish's eyes never close: a reminder to stay awake."); }
function evbPgBell() { evbTune([98, 0, 98], 1800, 3.0); evbSay("🔔 You swing the log. BOOOOM... the great bell hums for a long, long time. On New Year's Eve Japanese temples ring their bells 108 times, one for each of the 108 worldly desires."); }
function evbPgBreathe() { return __ZC(367, 39, this, arguments, new.target); }
function evbPgIncense() { evbTune([523, 392], 400, 0.8); evbSay("🪔 You light a stick of incense and set it upright in the sand. The smoke rises like a thread. In many temples it is offered in threes."); }
var evbPgSutra = evbFact("A sutra", ["The <b>Heart Sutra</b> is one of the shortest, and the most chanted in East Asia: 'form is emptiness, emptiness is form'.", "The oldest printed book with a date is a Buddhist sutra: the Diamond Sutra, printed in China in 868 AD.", "'Sutra' means 'thread' in Sanskrit: the thread of a teaching."]);
var evbPgPillar = evbInfo("The heart pillar", "Up the middle of a Japanese pagoda runs the <b>shinbashira</b>, a great central post. In some pagodas it does not even hold the floors up: the storeys stack loosely round it, and in an earthquake they sway one way and another like a snake, while the pillar keeps them from going too far. Very few old wooden pagodas have ever fallen in an earthquake. Tokyo's Skytree tower, built in 2012, copies the idea.");
function evbPgLamp() { evbTune([784, 988], 300, 0.8); evbSay("🕯️ You light one more lamp among the thousand. Light is offered to the Buddha as a sign of wisdom driving out the dark."); }
var evbPgDay = evbInfo("A monk's day", "Up before dawn; chanting in the hall; a simple breakfast in silence; cleaning (sweeping is practice too); study; work; meditation; an early night. Zen monks eat from a set of nested bowls, and wash them themselves at the end of the meal.");
function evbPgCopy() { evbTune([440, 494], 200, 0.4); evbSay("🖌️ You copy one line of a sutra in ink, slowly, one stroke at a time. Copying sutras (<i>shakyō</i>) is a practice in itself: the care is the point."); }
function evbPgTea() { evbTune([392], 500, 0.5); evbSay("🍵 A monk pours you a cup. Tea came to Japan with Buddhist monks from China, who drank it to stay awake in meditation."); }
function evbPgBonsai() { evbTune([659], 300, 0.4); evbSay("🌳 You trim one tiny branch. Bonsai means 'planted in a tray': a real tree kept small for years, even centuries, with patient pruning."); }
var evbPgTop = evbInfo("The top of the pillar", "High above the top roof stands the <b>sōrin</b>, a bronze spire of nine rings with a flame-shaped jewel at the top. The nine rings stand for the nine heavens; the spire marks the building as a stupa, a house for a relic.");
function evbPgChimes() { evbTune([1568, 1760, 2093, 1760], 350, 1.2); evbSay("🎐 The wind sets the bronze bells on the roof corners tinkling. They were hung there, it is said, to keep evil away and remind everyone to wake up."); }
var evbPgView = evbFact("From the top", ["From up here the roofs below look like steps, each a little smaller than the one beneath.", "Temple Row stretches out below: every kind of house of worship the dreamers know.", "Each roof of a pagoda has its corners curved up: they shed rain far from the walls."]);
function evbPgRelic() { return __ZC(367, 40, this, arguments, new.target); }
var evbPgFive = evbInfo("The five roofs", "A five-storey pagoda's roofs stand, from the bottom up, for the five elements of Buddhist teaching in Japan: <b>earth, water, fire, wind and void</b> (empty space). The same five shapes, square, round, triangle, half-moon and jewel, are stacked in Japanese gravestones.");
function evbPgStill() { evbTune([262], 3000, 3.0); evbSay("🤍 You sit. Nothing at all happens, and that is the point. (A Zen saying: 'Sitting quietly, doing nothing, spring comes, and the grass grows by itself.')"); }
function evbPgSmallBell() { evbTune([784, 0, 784], 700, 1.6); evbSay("🔔 Ding... the little bell marks the start of a sitting."); }
var evbPgQuake = evbInfo("How a pagoda is built", "No nails: wooden pagodas are held together by joints cut so that beams lock into each other. The wide roofs are heavy and stick far out, which keeps the building low and steady; the floors sit loosely on each other, so they can slide a little in an earthquake instead of breaking.");
var evbZgZiggurat = evbInfo("The ziggurat", "A ziggurat is a stepped tower of mud brick from ancient Mesopotamia (today's Iraq), with a temple on the top. The Great Ziggurat of Ur was built about 2100 BC by King Ur-Nammu for the moon god Nanna. Its core is sun-dried brick, faced with baked brick set in bitumen (natural tar). Its lowest stage still stands.");
var evbZgKings = evbInfo("The list of kings", "The Sumerian King List, written on clay, names the kings of each city in turn, from the first kingship 'lowered from heaven' to about 1800 BC. The earliest kings are given impossible reigns of tens of thousands of years; later ones look like real people we know from other records.");
var evbZgCourt = evbInfo("The court of the moon", "The moon god Nanna (Sîn, to the Akkadians) was the god of Ur: he rode across the night sky in a boat, the crescent moon. His wife was Ningal; their children were the sun god Utu and Inanna, the morning and evening star.");
function evbZgCuneiform() { return __ZC(367, 41, this, arguments, new.target); }
var evbZgTablet = evbFact("A tablet", ["A school tablet, about 1800 BC: a pupil complains that he was beaten for talking, for standing up, and for bad handwriting.", "A letter of complaint, about 1750 BC: a man named Nanni tells the merchant Ea-nasir that the copper he sold was poor, and he wants his money back.", "A recipe for stew, from about 1750 BC: one of the oldest recipe collections in the world.", "Clay tablets survive fires: a fire bakes them hard, which is why so many have lasted 4,000 years."]);
function evbZgGrain() { evbCard("The granary", "Temples were also the banks and storehouses. Barley was money as well as food: workers were paid in barley and beer, and scribes counted every jar. Our oldest writing is mostly accounts like these: so many sheep, so many jars of grain."); }
function evbZgBread() { evbTune([392, 523], 300, 0.6); evbSay("🍞 You slap flat dough onto the hot inside wall of a clay oven, as bakers in Mesopotamia did, and peel it off when it puffs."); }
function evbZgWeave() { evbTune([330, 392], 200, 0.4); evbSay("🧶 You pass the shuttle through. Wool cloth was Sumer's great trade good, woven in temple workshops by hundreds of women."); }
function evbZgSixty() { evbCard("Counting in sixties", "The Sumerians and Babylonians counted in <b>sixties</b>. That is why an hour has 60 minutes, a minute 60 seconds, and a circle 360 degrees. Sixty is handy: it can be shared out evenly 2, 3, 4, 5, 6, 10, 12, 15, 20 or 30 ways."); }
function evbZgLyre() { evbTune([294, 330, 392, 440, 392, 330], 350, 0.6); evbSay("🎵 You pluck the lyre. The famous Lyres of Ur, found in the royal tombs, have a bull's head of gold and lapis lazuli on the sound box. They are about 4,500 years old."); }
var EVB_UR = { me: 0, them: 0 };
function evbZgGame() { return __ZC(367, 42, this, arguments, new.target); }
var evbZgTreasure = evbInfo("The treasures of Ur", "In the 1920s Leonard Woolley dug up the Royal Cemetery of Ur and found Queen Puabi's headdress of gold leaves and lapis beads, the Standard of Ur (a box inlaid with scenes of war and peace), gold cups, and the 'Ram in a Thicket', a goat reaching into a golden tree.");
function evbZgPot() { evbTune([262, 294, 330], 300, 0.6); evbSay("🏺 You throw a pot on the wheel. The potter's wheel was invented in Mesopotamia about 4000 BC, possibly before the wheel was ever used on a cart."); }
var evbZgLamps = evbInfo("The lamp store", "Lamps of clay, burning sesame oil. Mesopotamia also had bitumen, natural tar that seeps up from the ground there; builders used it as mortar and to waterproof boats and baskets.");
function evbZgSeal() { evbTune([440, 523], 200, 0.4); evbSay("🔏 You roll a cylinder seal across wet clay and a little carved scene appears, over and over: a lion, a hero, a line of writing. Everyone of standing had a seal, worn on a string, and used it as a signature."); }
function evbZgMoonPath() { evbSay("🌙 The path climbs toward the moon's shrine. Priests went up at night to watch the sky; to them the moon's changes were messages."); }
function evbZgShrine() { return __ZC(367, 43, this, arguments, new.target); }
function evbZgMoon() { return __ZC(367, 44, this, arguments, new.target); }
var evbZgGilgamesh = evbFact("The Epic of Gilgamesh", ["Gilgamesh, king of Uruk, is two-thirds god and one-third man, and too proud. The gods make him a match: Enkidu, a wild man of the plains. They fight, and become best friends.", "Gilgamesh and Enkidu travel to the Cedar Forest and slay its guardian, Humbaba.", "When Enkidu dies, Gilgamesh goes looking for everlasting life. He finds Utnapishtim, who survived the great flood in a boat.", "At the end Gilgamesh comes home to Uruk and looks at its great walls: what people build and do is what lasts. It is one of the oldest stories ever written down."]);
var evbZgEnheduanna = evbInfo("Enheduanna", "The first writer in history whose name we know was a woman: <b>Enheduanna</b>, high priestess of the moon god at Ur about 2300 BC, daughter of King Sargon of Akkad. She wrote hymns to Inanna and to the temples of Sumer, and signed them.");
function evbZgGarden() { evbTune([523, 659], 250, 0.5); evbSay("🌴 You pick a date from the palm. Date palms fed Mesopotamia: fruit, syrup, wood, rope, baskets and roofs."); }
var evbMqMosque = evbInfo("The mosque", "A mosque (<i>masjid</i>, 'place of bowing down') is where Muslims pray together. Many have a courtyard with a fountain, a prayer hall, and a minaret from which the call to prayer is given five times a day. The first was the Prophet Muhammad's own house in Medina, about 622 AD, with a courtyard shaded by palm trunks and fronds.");
var evbMqMihrab = evbInfo("The mihrab", "The niche in the wall that faces Mecca, the <b>qibla</b> wall, shows which way to pray. It is often the most beautiful part of the mosque, in tile, carved stone or mosaic. Muslims all over the world face the Kaaba in Mecca when they pray.");
var evbMqMinbar = evbInfo("The minbar", "The stepped pulpit beside the mihrab, where the imam stands to give the sermon at Friday noon prayers (<i>Jumu'ah</i>). By custom the speaker stands on a step below the top one.");
var evbMqPrayer = evbInfo("The prayer", "Muslims pray five times a day: at dawn, midday, afternoon, sunset and night. In rows, shoulder to shoulder, everyone does the same together: standing, bowing, kneeling and touching the forehead to the ground, sitting. Rich and poor stand in the same rows. Shoes come off at the door, which is why mosques are carpeted.");
function evbMqWudu() { return __ZC(367, 45, this, arguments, new.target); }
var evbMqMinaret = evbInfo("The minaret", "From the top of the minaret the <b>muezzin</b> gives the call to prayer, the <i>adhan</i>, which begins 'Allāhu akbar', 'God is greatest'. The first muezzin was Bilal, a freed slave chosen by the Prophet for his fine voice. Minarets are round, square or many-sided, depending on the country.");
var evbMqLibrary = evbFact("The library", ["In the 800s Baghdad's House of Wisdom gathered scholars to translate Greek, Persian and Indian books into Arabic, and write new ones.", "The University of al-Qarawiyyin in Fez, Morocco, was founded in 859 by a woman, Fatima al-Fihri, and is still teaching: perhaps the oldest university in the world.", "Paper making reached the Islamic world from China in the 700s, and spread from there to Europe."]);
function evbMqCalli() { return __ZC(367, 46, this, arguments, new.target); }
var evbMqSchool = evbInfo("The madrasa", "A madrasa is a school. Children learn to read the Qur'an in Arabic, and older students study law, grammar, mathematics and more. Learning by heart is honoured: someone who knows the whole Qur'an by heart is called a <i>hafiz</i>.");
var evbMqAstrolabe = evbInfo("The astrolabe", "An astrolabe is a brass model of the sky you can hold in your hand. Astronomers of the Islamic world perfected it to tell the time by the stars, find the direction of Mecca, and survey land. Many star names come from Arabic: Aldebaran, Betelgeuse, Rigel, Vega. So do 'algebra' (al-jabr) and 'algorithm' (from al-Khwarizmi, a scholar of the House of Wisdom).");
var evbMqQuiet = evbInfo("The quiet room", "A place to read the Qur'an. It is written in Arabic, in 114 chapters (<i>surahs</i>), and is recited aloud in a special chanting style. The book rests on a <i>rehal</i>, a folding stand, and is never put on the floor.");
var evbMqImam = evbInfo("The imam", "The imam leads the prayer, standing in front of the rows, and gives the Friday sermon. Any Muslim who knows the prayers well can lead them; in a mosque it is usually someone chosen for learning and good character.");
var evbMqGuest = evbInfo("A room for travellers", "Mosques have long been places of welcome: travellers could rest there, and along the trade routes great inns (caravanserais) were built with a little mosque inside. Giving to those in need, <i>zakat</i>, is one of the Five Pillars of Islam.");
function evbMqCook() { evbTune([392, 440], 300, 0.5); evbSay("🍲 You stir the big pot of lentil soup (shorba). Mosques often feed the neighbourhood, above all during Ramadan."); }
function evbMqIftar() { return __ZC(367, 47, this, arguments, new.target); }
var evbStStupa = evbInfo("The stupa", "A stupa is a dome-shaped Buddhist monument holding a relic. It is not a hall but a shape to walk round: pilgrims circle it clockwise, praying. The Great Stupa at Sanchi in India dates from the 200s BC; Boudhanath in Kathmandu is one of the largest in the world. In Tibet a stupa is called a <b>chorten</b>.");
function evbStWheels() { evbTune([330, 392, 440, 392], 250, 0.8); evbSay("☸️ You run your hand along the row and set every wheel turning, clockwise. Inside each is a roll of paper printed with the mantra <i>Om mani padme hum</i> thousands of times: each turn, it is said, is like saying it once for every copy inside."); }
function evbStRelic() { return __ZC(367, 48, this, arguments, new.target); }
function evbStLamp() { evbTune([784, 988], 300, 0.8); evbSay("🪔 You light a butter lamp. In Tibet lamps were filled with yak butter; the light is an offering, and a sign of wisdom."); }
function evbStFlags() { evbTune([659, 784], 300, 0.6); evbSay("🎏 You tie up a string of prayer flags: blue, white, red, green, yellow, for sky, wind, fire, water and earth. The wind carries their printed prayers and blessings out over the land."); }
function evbStMandala() { return __ZC(367, 49, this, arguments, new.target); }
var evbStThangka = evbInfo("The thangkas", "A thangka is a painting on cloth, rolled up to travel. Each shows a buddha, a teacher or a mandala, painted to strict rules of size and colour; the paints are ground from minerals such as lapis, malachite and gold.");
function evbStChant() { evbTune([110, 110, 123, 110], 1200, 2.4); evbSay("🎶 The monks chant in deep, rolling voices. Some Tibetan monks can sing two notes at once: a low drone and a whistle-like note above it."); }
function evbStTea() { evbTune([392, 330], 300, 0.5); evbSay("🫖 You churn tea with butter and salt in a tall wooden tube: <b>po cha</b>, Tibetan butter tea. In the cold high mountains it keeps you warm, and monks drink cup after cup."); }
var evbStBook = evbInfo("The books", "Tibetan books are long loose pages, printed from carved wooden blocks and wrapped in cloth between wooden boards. The Kangyur, the words of the Buddha, fills about a hundred volumes.");
function evbStDebate() { return __ZC(367, 50, this, arguments, new.target); }
var evbStHeal = evbInfo("The healers", "Tibetan medicine (Sowa Rigpa) uses herbs, minerals, diet and pulse-reading, and is taught in the monasteries. Its great book, the Four Tantras, is some 800 years old.");
var evbStCalendar = evbInfo("The calendar", "The Tibetan calendar runs on the moon, with years named for twelve animals and five elements, so a year might be the Wood Dragon or the Fire Horse. Losar, the new year, comes in February or March.");
function evbStCave() { evbTune([196], 3000, 2.8); evbSay("🕯️ You sit in the cave by one candle. The great poet-yogi Milarepa, about 900 years ago, spent years meditating in mountain caves, living, the story goes, on nettle soup until he turned green."); }
var evbStNovice = evbInfo("The novices", "Boys (and, in nunneries, girls) can enter a monastery young as novices, to learn to read, memorise texts, chant, make offerings and debate. They get their own red robes, and their heads are shaved.");
var evbDfFane = evbInfo("The dark fane", "'Fane' is an old word for a temple. This one belongs to no religion anyone has followed: it is a place out of the old dark stories, of shadow cults and secret rites, the sort of temple heroes stumble into in tales. Be careful what you touch.");
function evbDfAltar() { evbTune([110, 104, 98], 900, 2.2); evbSay("🩸 The stone is cold as the grave. For a heartbeat the red rune glows brighter and the candle flames bow toward you... then it is only stone again."); }
function evbDfThrone() { return __ZC(367, 51, this, arguments, new.target); }
function evbDfCandles() { var n = 13 + Math.floor(Math.random() * 4); evbSay("🕯️ You count the candles: " + n + ". You count again: " + (n + 1) + ". You decide not to count a third time."); }
var evbDfOssuary = evbInfo("The ossuary", "Real ossuaries ('bone houses') exist: when a churchyard filled up, old bones were moved into a charnel house to make room. The Sedlec Ossuary in the Czech Republic and the Capuchin Crypt in Rome are decorated with them. They were not meant to frighten, but to remind the living that life is short.");
function evbDfMask() { var m = evbPick(["a raven's", "a grinning skull's", "a weeping saint's", "a fox's", "a face with no features at all"]); evbTune([147, 139], 600, 1.2); evbSay("🎭 You try on " + m + " mask. In the black glass of the case your reflection does not quite move when you do."); }
function evbDfScry() { return __ZC(367, 52, this, arguments, new.target); }
var evbDfBook = evbFact("A forbidden book", ["The pages are blank until you stop looking at them. Out of the corner of your eye, the writing crawls.", "A book of names, every one crossed out but the last, which is still wet.", "A map of the Underworld, drawn from below.", "Old stories are full of forbidden books: the Necronomicon is a made-up one, invented by the writer H. P. Lovecraft in the 1920s; there never was a real one."]);
var evbDfAlchemy = evbInfo("The alchemist's cell", "Alchemists of the Middle Ages hunted for the philosopher's stone, said to turn lead into gold and give eternal life. They never found it, but along the way they learned how to distil, purify and test substances, and their work led to chemistry. (The flasks here are long dry, and best left alone.)");
function evbDfPenitent() { evbTune([147], 2200, 2.4); evbSay("🪑 You sit in the cold pew. Somewhere behind the walls, someone else is sitting very still, too."); }
function evbDfBell() { evbTune([73], 2600, 3.2); evbSay("🔔 You strike the bell. It makes no sound at all, and yet every candle in the fane trembles, and the silence afterwards is louder than any bell."); }
function evbDfRelic() { evbTune([110, 131], 700, 1.4); evbSay("📦 Inside the chest: " + evbEsc(evbPick(["a black feather that is warm to the touch", "a key to a door you have not found yet", "a candle that lights itself when you look away", "a letter in your own handwriting, which you never wrote"])) + ". You put it back."); }
function evbDfGlass() { evbTune([1047, 988], 800, 1.6); evbSay("🪞 The black glass shows you in a darker room than this one, with a door behind you that is not here."); }
function evbDfCircle() { evbTune([98, 92, 87], 1000, 2.4); evbSay("⭕ You step into the circle. The air goes thick and still, and you cannot step out for a long breath. Then the red cracks dim, and it lets you go. (The old stories say a circle like this was drawn to keep something in, not out.)"); }
var evbDfVestry = evbInfo("The black robes", "Robes of black wool hang in rows, hooded. In the old Gothic novels, the kind Ann Radcliffe and Matthew Lewis wrote in the 1790s, ruined abbeys and hooded figures were half the fun.");
"use strict";
function evbKey(k) {
if (!k)
return null;
if (typeof k === "function")
return k();
if (k.indexOf("wd:") === 0)
return esWd(k.slice(3));
if (k.indexOf("fab:") === 0)
return esFab(k.slice(4));
if (k.indexOf("mt:") === 0)
return esMt(k.slice(3));
return FURN[k] ? k : null;
}
function evbCall(fn) { return typeof fn === "function" ? fn : function () { var f = window[fn]; if (typeof f === "function")
f(); }; }
function evbFit(o) {
return function (P, A, ctx) {
var w = P.w, d = P.d, i, n;
var T = EVB.T || {};
if (!P.r.open && o.rug !== false && w * d > 16)
P(esRug(o.rug === undefined ? (T.rug || 0) : o.rug), w / 2, 0, "+v");
(o.mid || []).forEach(function (m) { P(evbKey(m[0]), w * m[1], d * m[2], m[3] || "-u"); });
if (o.far) {
n = Math.max(o.far.length, Math.floor((d - 2) / 2.3));
for (i = 0; i < n; i++) {
var v = -d / 2 + 1 + (d - 2) * (i + 0.5) / n;
if (o.gap && Math.abs(v) < o.gap)
continue;
P.wall("far", evbKey(o.far[i % o.far.length]), v);
}
}
if (o.sides) {
var per = Math.max(Math.ceil(o.sides.length / 2), Math.floor((w - 2.8) / 2.3)), sl = o.sides.length;
for (i = 0; i < per * 2; i++) {
var side = i % 2 ? "F" : "B", j = Math.floor(i / 2), u = 1.4 + (w - 2.8) * (j + 0.5) / per;
P.wall(side, evbKey(o.sides[(i % 2 ? (j * 2 + 1) : (j * 2)) % sl] || o.sides[i % sl]), u);
}
}
if (o.art && !P.r.open) {
esArts(P, "B", o.art);
esArts(P, "F", o.art);
}
if (o.grid) {
var g = o.grid, k = evbKey(g[0]), nu = g[1], nv = g[2], u0 = g[4] || 0.3, u1 = g[5] || 0.85;
for (var a = 0; a < nu; a++)
for (var b = 0; b < nv; b++) {
var uu = w * (u0 + (u1 - u0) * (nu > 1 ? a / (nu - 1) : 0.5)), vv = nv > 1 ? (-d / 2 + 1.5) + (d - 3) * b / (nv - 1) : 0;
P(k, uu, vv, g[3] || "-u");
}
}
if (o.ceil) {
var c = Math.max(1, Math.min(4, Math.round(w * d / 36)));
for (i = 0; i < c; i++)
P.ceil(evbKey(o.ceil), w * (i + 0.5) / c, 0);
}
var corner = o.corners === undefined ? T.corner : o.corners;
if (corner && !P.lite) {
var ck = evbKey(corner);
P(ck, 0.7, -d / 2 + 0.7, 0);
P(ck, 0.7, d / 2 - 0.7, 0);
P(ck, w - 0.7, -d / 2 + 0.7, 0);
P(ck, w - 0.7, d / 2 - 0.7, 0);
}
(o.acts || []).forEach(function (q) { evbAct(P, ctx, w * q[0], d * q[1], q[2], q[3], q[4], evbCall(q[5])); });
P.spot(w / 2, 0);
};
}
function evbRooms(map) { if (typeof ES_ROOM === "undefined")
return; Object.keys(map).forEach(function (k) { ES_ROOM[k] = evbFit(map[k]); }); }
evbRooms({
gtporch: { sides: ["evb_doric", "evb_doric", "evb_tripod", "evb_tripod", "evb_doric", "evb_doric"], far: ["evb_amphora", "evb_amphora", "evb_amphora", "evb_amphora"], gap: 3.6, ceil: "ironchandelier",
acts: [[0.35, 0, 2.2, "The porch of the temple", "read", evbGtTemple]] },
gtway: { sides: ["evb_amphora", "espalm", "evb_tripod", "espalm", "evb_amphora", "evb_tripod"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The offerings", "see", evbGtOfferings]] },
gtcolon: { far: ["evb_doric", "evb_doric", "evb_doric", "evb_doric", "evb_doric", "evb_doric", "evb_doric", "evb_doric"], ceil: "ironchandelier" },
gtcella: { grid: ["evb_tripod", 2, 4, "-u", 0.12, 0.3], far: ["evb_doric", "evb_doric", "evb_doric", "evb_doric", "evb_doric", "evb_doric"], sides: ["evb_doric", "evb_doric", "evb_tripod", "evb_tripod"],
mid: [["evb_goddess", 0.7, 0, "-u"], ["evb_tripod", 0.45, -0.18], ["evb_tripod", 0.45, 0.18], ["redrunner", 0.35, 0, "+u"], ["evb_amphora", 0.62, -0.3], ["evb_amphora", 0.62, 0.3]], ceil: "ironchandelier",
acts: [[0.55, 0, 2.4, "The goddess of the temple", "stand before her", evbGtGoddess], [0.42, -0.18, 1.4, "The tripod's fire", "make an offering", evbGtFire]] },
gtrobe: { far: ["wardrobe", "wardrobe"], sides: ["dressform", "wallmirror", "dressform", "wd:kf_sidetabledrawers"], rug: 2, ceil: "chandelier", acts: [[0.5, 0, 1.8, "The priestesses' robes", "read", evbGtRobes]] },
gtlamp: { far: ["shelfgoods", "shelfgoods"], sides: ["candles", "barrel", "candles", "cask"], mid: [["wd:kf_table", 0.5, 0]], ceil: "lantern", acts: [[0.5, 0, 1.8, "The oil lamps", "fill a lamp", evbGtLamp]] },
gttreasury: { far: ["goldpile", "treasurechest", "goldhoard"], sides: ["displaycase", "crownstand", "displaycase", "gemheap"], mid: [["goldstatue", 0.55, 0]], ceil: "chandelier",
acts: [[0.5, 0, 1.8, "The treasury", "count the treasure", evbGtTreasury]] },
gtoracle: { far: ["brazier", "brazier"], sides: ["evb_amphora", "candles", "evb_amphora", "candles"], mid: [["evb_oracle", 0.6, 0]], ceil: null,
acts: [[0.45, 0, 1.8, "The oracle", "ask the oracle", evbGtOracle]] },
gtscroll: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "lectern", "bookshelf", "esreading"], mid: [["wd:kf_table", 0.5, 0], ["sg_qp_scroll1", 0.5, 0.12]], rug: 1, ceil: "chandelier",
acts: [[0.5, 0, 1.8, "The scrolls", "unroll one", evbGtScroll]] },
gtsculpt: { far: ["esbust", "evb_doric", "esbust"], sides: ["workbench", "boulder", "workbench", "esbust"], mid: [["boulder", 0.55, 0]], ceil: "lantern", acts: [[0.5, 0.15, 1.8, "The sculptors' work", "learn how", evbGtColumns]] },
gtmusic: { far: ["esharp", "esharp"], sides: ["chair", "chair", "chair", "chair"], mid: [["evb_kline", 0.6, 0]], rug: 3, ceil: "chandelier", acts: [[0.5, 0, 1.8, "The lyre", "play", evbGtLyre]] },
gtvotive: { far: ["shelfgoods", "shelfgoods"], sides: ["evb_amphora", "candles", "evb_amphora", "candles"], mid: [["altarinside", 0.6, 0]], ceil: "lantern", acts: [[0.55, 0, 1.8, "The votive offerings", "read", evbGtVotive]] },
gttwelve: { far: ["esbust", "esbust", "esbust"], sides: ["esbust", "esbust", "esbust", "esbust", "esbust", "esbust", "esbust", "esbust", "esbust"], mid: [["redrunner", 0.5, 0, "+u"]], ceil: "chandelier",
acts: [[0.5, 0, 2.0, "The Twelve of Olympus", "meet them", evbGtTwelve]] },
gtstars: { far: ["esglobe", "estelescope"], sides: ["bookshelf", "mapchest", "esreading", "desk"], mid: [["maptable", 0.55, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The sky of the Greeks", "look up", evbGtStars]] },
gtsymp: { far: ["evb_amphora", "evb_amphora"], sides: ["evb_kline", "evb_kline", "evb_kline", "evb_kline"], mid: [["wd:kf_tableround", 0.5, 0]], rug: 4, ceil: "chandelier",
acts: [[0.5, 0, 1.8, "The symposium", "join the talk", evbGtSymposium]] },
gtkitchen: { far: ["oven", "stove", "counter"], sides: ["counter", "trbreadrack", "butcherblock", "herbrack"], mid: [["longtable", 0.55, 0]], ceil: "lantern", acts: [[0.5, 0, 1.8, "The feast kitchen", "cook", evbGtFeast]] }
});
evbRooms({
shapproach: { sides: ["evb_toro", "evb_komainu", "evb_toro", "evb_komainu"], far: ["evb_temizu", "evb_temizu"], gap: 4, mid: [["evb_shimenawa", 0.2, 0]],
acts: [[0.55, -0.32, 1.8, "The temizuya, the water basin", "wash your hands", evbShWash]] },
shlanterns: { sides: ["evb_toro", "evb_toro", "evb_toro", "evb_toro", "evb_toro", "evb_toro"] },
shveranda: { far: ["evb_toro", "evb_toro", "evb_toro", "evb_toro", "evb_toro", "evb_toro"] },
shhonden: { far: ["evb_shimenawa"], mid: [["altarinside", 0.75, 0, "-u"], ["evb_toro", 0.6, -0.3], ["evb_toro", 0.6, 0.3]], acts: [[0.35, 0, 1.8, "The honden", "bow", evbShHonden]] },
shhaiden: { grid: ["evb_tatami", 2, 3, "-u", 0.2, 0.55], far: ["evb_saisen"], sides: ["evb_toro", "evb_shimenawa", "evb_toro"], mid: [["evb_tatami", 0.4, -0.25], ["evb_tatami", 0.4, 0.25]], ceil: "lantern",
acts: [[0.75, 0, 2.0, "The offering box and the bell", "pray", evbShPray]] },
shkagura: { mid: [["evb_kagura", 0.55, 0]], sides: ["evb_toro", "evb_toro", "evb_toro", "evb_toro"], ceil: "lantern", acts: [[0.3, 0, 1.8, "The kagura stage", "watch the dance", evbShKagura]] },
shoffice: { far: ["counter", "displaycase"], sides: ["shelfgoods", "displaycase", "shelfgoods"], mid: [["evb_tatami", 0.5, 0]], acts: [[0.5, 0, 1.8, "Omamori, the charms", "choose a charm", evbShCharm]] },
shema: { far: ["evb_ema", "evb_ema"], sides: ["evb_ema", "evb_toro"], acts: [[0.55, 0, 1.8, "The ema boards", "write a wish", evbShEma]] },
shfortune: { far: ["evb_omikuji", "evb_omikuji"], sides: ["evb_toro", "evb_toro"], acts: [[0.55, 0, 1.8, "The omikuji", "draw a fortune", evbShFortune]] },
shofferings: { far: ["cask", "cask", "cask"], sides: ["trsacks", "shelfgoods", "trsacks", "shelfgoods"], acts: [[0.5, 0, 1.8, "The offerings", "read", evbShOfferings]] },
shpriest: { far: ["desk", "bookshelf"], sides: ["wardrobe", "evb_tatami", "chair"], mid: [["evb_tatami", 0.5, 0]], acts: [[0.5, 0, 1.8, "The kannushi's work", "read", evbShPriest]] },
shmiko: { far: ["wardrobe", "dressform"], sides: ["wallmirror", "evb_tatami", "dressform"], mid: [["evb_tatami", 0.5, 0]], acts: [[0.5, 0, 1.8, "The miko's bells", "ring them", evbShMiko]] },
shtea: { far: ["wd:kf_sidetable"], mid: [["evb_tatami", 0.5, 0], ["wd:kf_tablecoffeesquare", 0.5, 0]], sides: ["sg_qn_plant1", "sg_qn_plant1"], acts: [[0.5, 0, 1.8, "The tea ceremony", "take tea", evbShTea]] },
shmoss: { mid: [["boulder", 0.5, 0], ["evb_toro", 0.7, 0.25]], sides: ["sg_qn_bush1", "sg_qn_bush2", "sg_qn_bush1", "sg_qn_bush2"], corners: "sg_qn_plant2", acts: [[0.4, 0, 1.8, "The moss garden", "sit a while", evbShMoss]] },
shtreasure: { far: ["displaycase", "displaycase"], sides: ["displaycase", "weaponrack", "displaycase"], mid: [["crownstand", 0.55, 0]], acts: [[0.5, 0, 1.8, "The treasure hall", "look", evbShTreasure]] },
shbrush: { far: ["desk", "bookshelf"], sides: ["wd:kf_tablecoffeesquare", "evb_tatami"], mid: [["evb_tatami", 0.5, 0]], acts: [[0.5, 0, 1.8, "Goshuin, the shrine stamp", "get a stamp", evbShStamp]] },
shfestival: { far: ["crates", "crates"], sides: ["banner", "barrel", "banner", "crates"], mid: [["altarinside", 0.55, 0]], acts: [[0.5, 0, 1.8, "The mikoshi, the portable shrine", "read", evbShFestival]] },
shtaiko: { far: ["barrel", "barrel"], sides: ["cask", "cask"], mid: [["cask", 0.55, 0]], acts: [[0.55, 0, 1.8, "The taiko drums", "drum", evbShTaiko]] }
});
evbRooms({
pggate: { sides: ["evb_censer", "plant", "evb_censer", "plant"], far: ["evb_censer", "evb_censer"], gap: 4, ceil: "lantern", acts: [[0.35, 0, 1.8, "The pagoda", "read", evbPgPagoda]] },
pgpillars: { sides: ["greatpillar", "greatpillar", "greatpillar", "greatpillar"] },
pgambul: { far: ["lantern", "lantern", "lantern", "lantern", "lantern", "lantern"] },
pgbuddha: { grid: ["evb_zafu", 2, 5, "+u", 0.25, 0.45], far: ["evb_buddha"], sides: ["evb_censer", "candles", "evb_censer", "candles"], mid: [["evb_zafu", 0.35, -0.25], ["evb_zafu", 0.35, 0], ["evb_zafu", 0.35, 0.25], ["evb_mokugyo", 0.5, 0.3]], ceil: "lantern",
acts: [[0.55, 0, 2.2, "The Buddha", "bow and offer incense", evbPgBuddha], [0.5, 0.3, 1.4, "The wooden fish", "keep the beat", evbPgFish]] },
pgbell: { mid: [["evb_bonsho", 0.55, 0]], acts: [[0.4, 0, 2.0, "The great bell", "strike it", evbPgBell]] },
pgzen: { grid: ["evb_zafu", 3, 4, "+u"], sides: ["candles", "plant", "candles", "plant"], ceil: "lantern", acts: [[0.5, 0, 2.0, "The meditation hall", "sit and breathe", evbPgBreathe]] },
pgincense: { far: ["evb_censer", "evb_censer"], sides: ["shelfgoods", "candles", "shelfgoods"], acts: [[0.5, 0, 1.8, "The incense", "light a stick", evbPgIncense]] },
pgsutra: { far: ["evb_sutras", "evb_sutras", "evb_sutras"], sides: ["evb_sutras", "lectern", "evb_sutras", "esreading"], mid: [["wd:kf_table", 0.5, 0]], ceil: "lantern", acts: [[0.5, 0, 1.8, "The sutras", "read one", evbPgSutra]] },
pgheart: { sides: ["lantern", "lantern"], mid: [["evb_heartpillar", 0.5, 0.28]], acts: [[0.45, 0.2, 1.8, "The heart pillar", "learn why it stands", evbPgPillar]] },
pglanterns: { sides: ["lantern", "lantern", "lantern", "lantern", "lantern", "lantern"] },
pgbalcony: { far: ["plant", "plant", "plant", "plant"] },
pglamps: { far: ["evb_butterlamps", "evb_buddha", "evb_butterlamps"], sides: ["candles", "candles", "candles", "candles", "candles", "candles"], grid: ["candles", 2, 3], ceil: "lantern",
acts: [[0.5, 0, 2.0, "A thousand lamps", "light one", evbPgLamp]] },
pgcells: { far: ["cot", "cot"], sides: ["cot", "evb_zafu", "cot", "evb_zafu"], acts: [[0.5, 0, 1.8, "A monk's day", "read", evbPgDay]] },
pgcopy: { grid: ["schooldesk", 2, 3, "-u"], far: ["evb_sutras", "evb_sutras"], sides: ["lectern", "bookshelf"], ceil: "lantern", acts: [[0.5, 0, 1.8, "Copying the sutras", "copy a line", evbPgCopy]] },
pgtea: { mid: [["wd:kf_tablecoffeesquare", 0.5, 0], ["evb_zafu", 0.35, 0], ["evb_zafu", 0.65, 0]], sides: ["plant", "shelfgoods"], acts: [[0.5, 0, 1.8, "Tea with the monks", "take tea", evbPgTea]] },
pgbonsai: { sides: ["sg_qn_bush1", "sg_qn_plant3", "sg_qn_bush2", "sg_qn_plant3"], mid: [["boulder", 0.5, 0]], corners: "sg_qn_plant1", acts: [[0.5, 0, 1.8, "The little trees", "tend one", evbPgBonsai]] },
pgtop: { sides: ["lantern", "lantern"], mid: [["evb_heartpillar", 0.5, 0.28]], acts: [[0.45, 0.2, 1.8, "The top of the heart pillar", "look up", evbPgTop]] },
pgchimes: { sides: ["lantern", "lantern", "lantern", "lantern"], acts: [[0.5, 0, 1.8, "The wind chimes", "listen", evbPgChimes]] },
pglookout: { far: ["estelescope", "plant", "estelescope"], acts: [[0.5, 0, 2.0, "The view", "look out", evbPgView]] },
pgrelic: { far: ["evb_butterlamps"], mid: [["evb_chorten", 0.55, 0], ["evb_censer", 0.3, -0.25], ["evb_censer", 0.3, 0.25]], sides: ["candles", "candles", "candles", "candles"], ceil: "lantern",
acts: [[0.35, 0, 2.0, "The relic", "walk round it", evbPgRelic]] },
pgfive: { far: ["boulder", "evb_temizu", "brazier"], sides: ["plant", "lantern"], acts: [[0.5, 0, 1.8, "The five roofs", "read", evbPgFive]] },
pgstill: { grid: ["evb_zafu", 2, 3, "+u"], acts: [[0.5, 0, 2.0, "Stillness", "be still", evbPgStill]] },
pgloft: { mid: [["evb_bonsho", 0.55, 0]], acts: [[0.4, 0, 2.0, "The little bell", "ring it", evbPgSmallBell]] },
pgquake: { far: ["trwallmap", "workbench"], sides: ["workbench", "trlogs", "trsaw", "trtoolwall"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "How a pagoda is built", "learn", evbPgQuake]] }
});
evbRooms({
zgstair: { sides: ["brazier", "evb_lamassu", "brazier", "evb_lamassu"], far: ["evb_grainjars", "evb_grainjars"], gap: 4, ceil: "lantern", acts: [[0.35, 0, 2.0, "The ziggurat", "read", evbZgZiggurat]] },
zgkings: { sides: ["evb_tablets", "brazier", "evb_tablets", "brazier"], acts: [[0.5, 0, 1.8, "The list of kings", "read", evbZgKings]] },
zgterrace: { far: ["plant", "evb_grainjars", "plant", "evb_grainjars", "plant", "evb_grainjars"] },
zgcourt: { grid: ["brazier", 2, 3, "-u", 0.2, 0.45], far: ["evb_lamassu", "evb_lamassu"], sides: ["brazier", "espalm", "brazier", "espalm"], mid: [["altarinside", 0.6, 0], ["evb_moonchart", 0.75, 0.3]], ceil: "lantern",
acts: [[0.55, 0, 2.0, "The court of the moon", "read", evbZgCourt]] },
zgschool: { grid: ["schooldesk", 2, 3, "-u"], far: ["evb_tablets", "blackboard"], sides: ["evb_tablets", "evb_grainjars"], acts: [[0.55, 0, 1.8, "Cuneiform", "write your name", evbZgCuneiform]] },
zglibrary: { far: ["evb_tablets", "evb_tablets", "evb_tablets"], sides: ["evb_tablets", "evb_tablets", "evb_tablets", "evb_tablets"], acts: [[0.5, 0, 1.8, "The tablets", "read one", evbZgTablet]] },
zggranary: { far: ["evb_grainjars", "evb_grainjars", "evb_grainjars"], sides: ["trsacks", "evb_grainjars", "trsacks", "evb_grainjars"], acts: [[0.5, 0, 1.8, "The granary", "count the grain", evbZgGrain]] },
zgbakery: { far: ["oven", "oven"], sides: ["trbreadrack", "counter", "trmillstone", "counter"], acts: [[0.5, 0, 1.8, "Bread of Ur", "bake", evbZgBread]] },
zgweave: { far: ["loom", "loom"], sides: ["loom", "crates", "herbrack"], acts: [[0.5, 0, 1.8, "The looms", "weave", evbZgWeave]] },
zgcount: { far: ["evb_tablets", "blackboard"], sides: ["desk", "chair", "desk", "chair"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "Counting in sixties", "count", evbZgSixty]] },
zglyre: { far: ["esharp"], sides: ["chair", "chair", "chair", "chair"], rug: 6, acts: [[0.55, 0, 1.8, "The Lyre of Ur", "play", evbZgLyre]] },
zggame: { mid: [["eschess", 0.5, 0]], sides: ["chair", "chair", "chair", "chair"], far: ["evb_tablets"], acts: [[0.5, 0, 1.8, "The Royal Game of Ur", "play a round", evbZgGame]] },
zgtreasure: { far: ["goldpile", "treasurechest", "goldhoard"], sides: ["displaycase", "gemheap", "displaycase", "crownstand"], acts: [[0.5, 0, 1.8, "The treasures of Ur", "look", evbZgTreasure]] },
zgpots: { far: ["shelfgoods", "shelfgoods"], sides: ["potterswheel", "evb_grainjars", "potterswheel", "evb_amphora"], acts: [[0.5, 0, 1.8, "The potter's wheel", "throw a pot", evbZgPot]] },
zglamps: { far: ["shelfgoods", "shelfgoods"], sides: ["candles", "barrel", "candles", "barrel"], acts: [[0.5, 0, 1.8, "The lamp store", "read", evbZgLamps]] },
zgseals: { far: ["workbench", "displaycase"], sides: ["desk", "chair", "workbench"], acts: [[0.5, 0, 1.8, "Cylinder seals", "roll a seal", evbZgSeal]] },
zgupper: { sides: ["brazier", "espalm", "brazier", "espalm"], ceil: null },
zgmoonpath: { sides: ["brazier", "brazier", "brazier", "brazier"], acts: [[0.5, 0, 1.8, "The path of the moon", "walk it", evbZgMoonPath]] },
zgwatch: { far: ["estelescope", "plant", "plant", "estelescope"] },
zgshrine: { far: ["grandthrone"], sides: ["brazier", "evb_lamassu", "brazier", "evb_lamassu"], mid: [["altarinside", 0.55, 0], ["evb_moonchart", 0.8, 0.32]], ceil: "lantern",
acts: [[0.45, 0, 2.0, "The shrine of Nanna", "bring an offering", evbZgShrine]] },
zgastro: { far: ["evb_moonchart", "estelescope", "evb_moonchart"], sides: ["evb_tablets", "desk", "esglobe"], acts: [[0.5, 0, 2.0, "The moon's phases", "watch", evbZgMoon]] },
zggilgamesh: { far: ["evb_tablets", "evb_lamassu", "evb_tablets"], sides: ["evb_tablets", "brazier", "evb_tablets", "brazier"], acts: [[0.5, 0, 2.0, "The Epic of Gilgamesh", "read a tablet", evbZgGilgamesh]] },
zgpriestess: { far: ["fourposter"], sides: ["wardrobe", "desk", "evb_tablets", "wallmirror"], rug: 6, acts: [[0.5, 0, 1.8, "Enheduanna", "read", evbZgEnheduanna]] },
zggarden: { sides: ["espalm", "sg_qn_bush1", "espalm", "sg_qn_bush2", "espalm", "sg_qn_bush1"], mid: [["evb_temizu", 0.5, 0]], corners: "espalm", acts: [[0.5, 0, 2.0, "The garden", "pick a date", evbZgGarden]] }
});
evbRooms({
mqsahn: { mid: [["evb_sahn", 0.5, 0]], sides: ["espalm", "evb_mlamp", "espalm", "evb_mlamp"], far: ["espalm", "espalm"], gap: 4, acts: [[0.35, 0.18, 2.0, "The courtyard", "read", evbMqMosque]] },
mqriwaq: { sides: ["evb_geotile", "evb_mlamp", "evb_geotile", "evb_mlamp"] },
mqqibla: { far: ["evb_geotile", "evb_mlamp", "evb_geotile", "evb_mlamp", "evb_geotile", "evb_mlamp"] },
mqprayer: { far: ["evb_geotile", "evb_mihrab", "evb_minbar", "evb_geotile"], grid: ["evb_prayrow", 3, 4, "+u", 0.25, 0.75], ceil: "evb_mlamp",
acts: [[0.85, -0.12, 2.2, "The mihrab", "read", evbMqMihrab], [0.85, 0.12, 2.0, "The minbar", "read", evbMqMinbar], [0.4, 0, 2.4, "The prayer", "learn how", evbMqPrayer]] },
mqwudu: { far: ["evb_wudu"], sides: ["sg_qf_bathroomtowel", "evb_geotile", "sg_qf_bathroomtowel"], acts: [[0.55, 0, 1.8, "Wudu, washing before prayer", "learn how", evbMqWudu]] },
mqminaret: { mid: [["spiralstair", 0.55, 0]], sides: ["evb_mlamp", "evb_geotile"], acts: [[0.4, 0, 1.8, "The minaret", "climb", evbMqMinaret]] },
mqlibrary: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "evb_rehal", "bookshelf", "esreading"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The library", "read", evbMqLibrary]] },
mqcalli: { far: ["evb_geotile", "desk"], sides: ["desk", "chair", "evb_rehal"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "Calligraphy", "learn a letter", evbMqCalli]] },
mqschool: { grid: ["evb_rehal", 2, 3, "-u"], far: ["blackboard", "bookshelf"], sides: ["bookshelf", "evb_mlamp"], acts: [[0.5, 0, 1.8, "The madrasa", "sit in", evbMqSchool]] },
mqstars: { far: ["evb_astrolabe", "estelescope", "esglobe"], sides: ["bookshelf", "mapchest", "desk"], acts: [[0.5, 0, 1.8, "The astrolabe", "learn it", evbMqAstrolabe]] },
mqquiet: { grid: ["evb_rehal", 2, 2, "-u"], sides: ["bookshelf", "evb_mlamp", "bookshelf"], acts: [[0.5, 0, 1.8, "The quiet room", "read", evbMqQuiet]] },
mqimam: { far: ["desk", "bookshelf"], sides: ["chair", "filecabinet", "chair"], mid: [["chair", 0.4, 0]], acts: [[0.5, 0, 1.8, "The imam", "ask", evbMqImam]] },
mqguest: { far: ["bed", "bed"], sides: ["wardrobe", "evb_mlamp", "wd:kf_sidetable"], rug: 3, acts: [[0.5, 0, 1.8, "A room for travellers", "read", evbMqGuest]] },
mqkitchen: { far: ["stove", "oven", "counter"], sides: ["counter", "sink", "herbrack", "fridge"], mid: [["longtable", 0.55, 0]], acts: [[0.5, 0, 1.8, "The kitchen", "help cook", evbMqCook]] },
mqiftar: { grid: ["longtable", 1, 2, "+v"], sides: ["evb_mlamp", "shelfgoods", "evb_mlamp"], ceil: "evb_mlamp", acts: [[0.5, 0, 1.8, "Iftar, breaking the fast", "sit down", evbMqIftar]] }
});
evbRooms({
stgate: { sides: ["evb_prayerwheels", "evb_butterlamps", "evb_prayerwheels"], far: ["evb_chorten", "evb_chorten"], gap: 4, mid: [["evb_flags", 0.3, 0]], acts: [[0.35, 0, 2.0, "The stupa", "read", evbStStupa]] },
stwheels: { sides: ["evb_prayerwheels", "evb_prayerwheels", "evb_prayerwheels", "evb_prayerwheels"], acts: [[0.5, 0, 1.8, "The prayer wheels", "turn them", evbStWheels]] },
stkora: { far: ["evb_butterlamps", "evb_prayerwheels", "evb_butterlamps", "evb_prayerwheels", "evb_butterlamps"] },
strelic: { grid: ["evb_zafu", 2, 4, "+u", 0.12, 0.3], mid: [["evb_chorten", 0.55, 0], ["evb_flags", 0.55, 0]], far: ["evb_thangka", "evb_butterlamps", "evb_thangka"], sides: ["evb_butterlamps", "evb_prayerwheels", "evb_butterlamps", "evb_prayerwheels"],
acts: [[0.3, 0, 2.2, "The relic", "walk round it", evbStRelic]] },
stlamps: { far: ["evb_butterlamps", "evb_butterlamps"], sides: ["evb_butterlamps", "shelfgoods", "evb_butterlamps"], acts: [[0.5, 0, 1.8, "The butter lamps", "light one", evbStLamp]] },
stflags: { mid: [["evb_flags", 0.3, 0], ["evb_flags", 0.6, 0]], far: ["crates", "shelfgoods"], acts: [[0.5, 0, 1.8, "Prayer flags", "hang one", evbStFlags]] },
stmandala: { mid: [["evb_mandala", 0.55, 0]], sides: ["evb_zafu", "evb_zafu", "evb_zafu", "evb_zafu"], acts: [[0.4, 0, 1.8, "The sand mandala", "watch", evbStMandala]] },
stthangka: { far: ["evb_thangka", "evb_thangka", "evb_thangka"], sides: ["evb_thangka", "evb_thangka", "evb_thangka", "evb_thangka"], acts: [[0.5, 0, 1.8, "The thangkas", "look", evbStThangka]] },
stassembly: { grid: ["evb_zafu", 3, 4, "+u"], far: ["evb_thangka", "evb_buddha", "evb_thangka"], sides: ["evb_butterlamps", "evb_butterlamps"], acts: [[0.5, 0, 2.0, "The assembly", "join the chant", evbStChant]] },
stkitchen: { far: ["stove", "counter"], sides: ["barrel", "counter", "cask", "herbrack"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "Butter tea", "make some", evbStTea]] },
stlibrary: { far: ["evb_sutras", "evb_sutras", "evb_sutras"], sides: ["evb_sutras", "lectern", "evb_sutras"], acts: [[0.5, 0, 1.8, "The books", "read one", evbStBook]] },
stdebate: { sides: ["evb_zafu", "evb_zafu", "evb_zafu", "evb_zafu"], mid: [["boulder", 0.5, 0]], acts: [[0.5, 0, 2.0, "The debate", "clap and answer", evbStDebate]] },
stmedicine: { far: ["herbrack", "shelfgoods"], sides: ["herbrack", "cot", "wd:kf_table"], acts: [[0.5, 0, 1.8, "The healers", "read", evbStHeal]] },
ststars: { far: ["evb_moonchart", "esglobe"], sides: ["desk", "mapchest"], acts: [[0.5, 0, 1.8, "The calendar", "read", evbStCalendar]] },
stcave: { mid: [["evb_zafu", 0.6, 0], ["candles", 0.85, 0.3]], sides: ["boulder", "stalagmite", "boulder"], corners: "crystals", acts: [[0.5, 0, 1.8, "The cave", "sit in the dark", evbStCave]] },
stnovice: { far: ["cot", "cot", "cot"], sides: ["cot", "schooldesk", "cot"], acts: [[0.5, 0, 1.8, "The novices", "read", evbStNovice]] }
});
evbRooms({
dfnarthex: { sides: ["evb_blackcandles", "evb_chains", "evb_blackcandles", "evb_chains"], far: ["evb_blackcandles", "evb_blackcandles"], gap: 4, acts: [[0.35, 0, 2.0, "The fane", "read", evbDfFane]] },
dfnave: { sides: ["evb_blackcandles", "espew", "evb_blackcandles", "espew", "evb_blackcandles", "espew"], mid: [["evb_rift", 0.5, 0]] },
dfchains: { far: ["evb_chains", "evb_blackcandles", "evb_chains", "evb_blackcandles", "evb_chains", "evb_blackcandles"] },
dfsanctum: { grid: ["espew", 2, 4, "-u", 0.12, 0.28], far: ["evb_shadowthrone"], sides: ["evb_blackcandles", "evb_chains", "evb_blackcandles", "evb_chains"], mid: [["evb_darkaltar", 0.55, 0], ["evb_voidorb", 0.3, -0.3], ["evb_voidorb", 0.3, 0.3], ["evb_rift", 0.4, 0]],
acts: [[0.45, 0, 2.0, "The black altar", "lay a hand on it", evbDfAltar], [0.8, 0, 1.8, "The throne of shadows", "sit, if you dare", evbDfThrone]] },
dfcandles: { grid: ["evb_blackcandles", 2, 3], sides: ["evb_blackcandles", "evb_blackcandles"], acts: [[0.5, 0, 1.8, "The candles", "count them", evbDfCandles]] },
dfossuary: { far: ["evb_ossuary", "evb_ossuary"], sides: ["evb_ossuary", "coffin", "evb_ossuary"], acts: [[0.5, 0, 1.8, "The ossuary", "read", evbDfOssuary]] },
dfmasks: { far: ["displaycase", "displaycase"], sides: ["armourstand", "displaycase", "armourstand", "displaycase"], acts: [[0.5, 0, 1.8, "The masks", "put one on", evbDfMask]] },
dfscry: { mid: [["evb_voidorb", 0.55, 0]], sides: ["evb_blackcandles", "evb_blackcandles"], acts: [[0.4, 0, 1.8, "The scrying orb", "look into it", evbDfScry]] },
dfbooks: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "lectern", "bookshelf", "evb_blackcandles"], mid: [["lectern", 0.55, 0]], acts: [[0.5, 0, 1.8, "The forbidden books", "open one", evbDfBook]] },
dfalembic: { far: ["workbench", "herbrack"], sides: ["shelfgoods", "workbench", "brazier"], acts: [[0.5, 0, 1.8, "The alchemist's cell", "read", evbDfAlchemy]] },
dfpenitent: { grid: ["espew", 3, 2, "-u"], far: ["evb_blackcandles"], acts: [[0.5, 0, 1.8, "The penitents", "sit", evbDfPenitent]] },
dfbell: { mid: [["evb_bonsho", 0.55, 0]], acts: [[0.4, 0, 1.8, "The bell of silence", "strike it", evbDfBell]] },
dfreliquary: { far: ["sarcophagus"], sides: ["displaycase", "evb_blackcandles", "displaycase"], mid: [["treasurechest", 0.5, 0]], acts: [[0.5, 0, 1.8, "The reliquary", "open the chest", evbDfRelic]] },
dfmirrors: { far: ["wallmirror", "wallmirror", "wallmirror"], sides: ["wallmirror", "wallmirror", "wallmirror", "wallmirror"], acts: [[0.5, 0, 1.8, "The black glass", "look", evbDfGlass]] },
dfcircle: { mid: [["evb_rift", 0.5, 0]], sides: ["evb_blackcandles", "evb_blackcandles", "evb_blackcandles", "evb_blackcandles"], acts: [[0.5, 0, 1.8, "The binding circle", "step inside", evbDfCircle]] },
dfvestry: { far: ["wardrobe", "wardrobe"], sides: ["dressform", "wallmirror", "dressform"], acts: [[0.5, 0, 1.8, "The black robes", "read", evbDfVestry]] }
});
"use strict";
(function () {
var L = { toadstoolhouse: ["The Toadstool House", "the little round door"], cottage: ["The Cottage", "the cottage door"], house: ["The House", "the front door"],
manor: ["The Manor", "the great doors"], crypt: ["The Crypt", "the crypt door"], igloo: ["The Igloo", "the low ice tunnel"], shanty: ["The Shack", "the tin door"],
bedouintent: ["The Bedouin Tent", "the tent flap"], falloutshelter: ["The Fallout Shelter", "the blast door"], skyscraper: ["The Tower", "the revolving doors"],
church: ["The Church", "the church doors"], lighthouse: ["The Lighthouse", "the lighthouse door"], clocktower: ["The Clock Tower", "the tower door"], faethrone: ["The Fae Court", "the briar doors"] };
Object.keys(L).forEach(function (a) { if (!EVB_LD[a] && typeof PLANS !== "undefined" && PLANS[a])
EVB_LD[a] = { theme: null, name: L[a][0], doors: L[a][1] }; });
})();
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, GILT = evbGilt;
var P = {};
P.evb_cloud = function () {
var g = G(), w = M(0xFFFFFF, null, { e: 0x2A2A30 });
[[0, 0.45, 0, 0.6], [0.55, 0.4, 0.1, 0.48], [-0.55, 0.4, -0.05, 0.5], [0.2, 0.75, -0.1, 0.45], [-0.25, 0.7, 0.15, 0.4], [0.8, 0.3, -0.2, 0.35]].forEach(function (p) { S(g, w, p[3], p[0], p[1], p[2], 12); });
return g;
};
P.evb_rainbow = function () {
var g = G(), cols = [0xE82A2A, 0xFF8A1A, 0xFFD020, 0x2AC03A, 0x2A8AE8, 0x5A3AC8, 0x9A3AD8];
cols.forEach(function (c, i) { var t = new THREE.Mesh(new THREE.TorusGeometry(2.2 - i * 0.12, 0.06, 6, 28, Math.PI), M(c, null, { e: c & 0x3F3F3F })); t.position.y = 0; g.add(t); });
P.evb_cloud && [-2, 2].forEach(function (x) { var c = P.evb_cloud(); c.position.x = x; c.scale.set(0.8, 0.6, 0.8); g.add(c); });
return g;
};
P.evb_weather = function () {
var g = G(), br = M(0xC8A050, null, { e: 0x1A1404 }), ring = G();
Cy(g, M(0x5A6A8A, "marble"), 0.6, 0.7, 0.9, 0, 0.45, 0, 16);
S(g, M(0x4A8AD8, null, { e: 0x0A1A3A }), 0.55, 0, 1.55, 0, 18);
Tor(g, br, 0.8, 0.03, 0, 1.55, 0, Math.PI / 2);
S(ring, evbGlow(0xFFD040), 0.16, 1.1, 0, 0, 12);
var cl = S(ring, M(0xE8ECF4), 0.18, -1.1, 0, 0, 10);
S(ring, M(0xE8ECF4), 0.13, -1.0, 0.08, 0.12, 8);
for (var i = 0; i < 3; i++)
B(ring, evbGlow(0x6AB8FF, 0.8), 0.015, 0.14, 0.015, -1.12 + i * 0.06, -0.2, 0);
B(ring, evbGlow(0xFFFFFF), 0.22, 0.02, 0.02, 0, 0, 1.1);
B(ring, evbGlow(0xFFFFFF), 0.02, 0.02, 0.22, 0, 0, 1.1);
ring.position.y = 1.55;
g.add(ring);
evbSpinMark(ring, 0.3);
return g;
};
P.evb_aurora = function () {
var g = G(), sway = G(), cols = [0x3AF0A0, 0x6AE8C8, 0xA070FF, 0x3AD0F0];
for (var i = 0; i < 6; i++) {
var p = new THREE.Mesh(evbGeo("b", 1.4, 2.2, 0.01), evbGlow(cols[i % 4], 0.28));
p.position.set(-3.5 + i * 1.4, 3.0 + (i % 2) * 0.3, Math.sin(i) * 0.4);
p.rotation.y = Math.sin(i * 1.7) * 0.4;
sway.add(p);
}
g.add(sway);
evbSpinMark(sway, 0.04);
return g;
};
P.evb_windhorn = function () {
var g = G(), sh = M(0xF0E4D0, "marble");
Cy(g, M(0x8AA0C0, "marble"), 0.3, 0.35, 1.0, 0, 0.5, 0, 10);
for (var i = 0; i < 6; i++) {
var t = Tor(g, sh, 0.32 - i * 0.045, 0.08 - i * 0.009, 0.1 * i, 1.2 + i * 0.03, 0, 0);
t.rotation.y = Math.PI / 2 + i * 0.3;
}
Co(g, sh, 0.12, 0.5, 0.6, 1.25, 0, 10).rotation.z = -Math.PI / 2;
return g;
};
P.evb_cloudswing = function () { var g = G(), gd = GILT(); [-0.45, 0.45].forEach(function (x) { Cy(g, gd, 0.015, 0.015, 2.6, x, 2.05, 0, 4); }); B(g, M(0xFFFFFF, "damask", { e: 0x202024 }), 1.1, 0.12, 0.45, 0, 0.75, 0); var c = P.evb_cloud(); c.scale.set(0.5, 0.35, 0.5); c.position.y = 0.55; g.add(c); return g; };
P.evb_shields = function () {
var g = G(), cols = [0xA8202A, 0xE8C040, 0x1E5AA8, 0x2A7A3A, 0xF0E8D8, 0x6A2A6A];
for (var r = 0; r < 2; r++)
for (var c = 0; c < 4; c++) {
var x = -1.35 + c * 0.9 + (r % 2) * 0.45, y = 1.4 + r * 0.9;
var s = Cy(g, M(cols[(r * 4 + c) % 6], "wood"), 0.42, 0.42, 0.05, x, y, 0.05, 18);
s.rotation.x = Math.PI / 2;
var b = S(g, M(0xA8A8B0), 0.1, x, y, 0.1, 8);
b.scale.z = 0.6;
}
return g;
};
P.evb_runestone = function () {
var g = G(), st = M(0x8A8478, "stone"), rd = M(0xA8202A);
var s = B(g, st, 1.0, 2.2, 0.35, 0, 1.1, 0);
s.scale.x = 1;
Cy(g, st, 0.5, 0.5, 0.35, 0, 2.2, 0, 14).rotation.x = Math.PI / 2;
for (var i = 0; i < 7; i++) {
B(g, rd, 0.04, 0.2, 0.02, -0.3 + i * 0.1, 1.7 - (i % 3) * 0.05, 0.18);
B(g, rd, 0.14, 0.03, 0.02, -0.3 + i * 0.1, 1.55, 0.18);
}
var band = Tor(g, rd, 0.38, 0.025, 0, 1.3, 0.18, 0);
return g;
};
P.evb_yggdrasil = function () {
var g = G(), bk = M(0x5A4030, "wood"), lf = M(0x3A8A3A, null, { e: 0x0A1A0A });
Cy(g, bk, 0.5, 0.8, 2.6, 0, 1.3, 0, 12);
for (var i = 0; i < 6; i++) {
var a = i * 1.047, r = Cy(g, bk, 0.14, 0.26, 1.5, Math.cos(a) * 0.85, 0.25, Math.sin(a) * 0.85, 8);
r.rotation.z = Math.cos(a) * 1.2;
r.rotation.x = -Math.sin(a) * 1.2;
}
for (var k = 0; k < 7; k++) {
var a2 = k * 0.9;
S(g, lf, 0.6, Math.cos(a2) * 0.9, 2.3 + (k % 2) * 0.2, Math.sin(a2) * 0.9, 10);
}
S(g, evbGlow(0xFFD860, 0.6), 0.25, 0, 1.5, 0.6, 10);
return g;
};
P.evb_highseat = function () {
var g = G(), wd = M(0x6A4A2A, "wood"), gd = GILT();
B(g, M(0x5A5048, "stone"), 2.4, 0.6, 2.0, 0, 0.3, 0);
B(g, wd, 1.4, 0.6, 1.0, 0, 0.9, 0.1);
B(g, M(0x6A2A2A, "damask"), 1.3, 0.12, 0.9, 0, 1.26, 0.12);
B(g, wd, 1.5, 2.6, 0.25, 0, 2.3, -0.42);
[-0.75, 0.75].forEach(function (x) { B(g, wd, 0.18, 0.8, 1.0, x, 1.4, 0.1); var rv = S(g, M(0x14141A), 0.16, x * 0.8, 3.75, -0.42, 10); rv.scale.set(0.8, 0.9, 1.4); Co(g, M(0x3A3A40), 0.04, 0.15, x * 0.8, 3.78, -0.22, 6).rotation.x = Math.PI / 2; });
B(g, gd, 1.6, 0.12, 0.3, 0, 3.6, -0.42);
return g;
};
P.evb_urdwell = function () {
var g = G(), st = M(0x8A8478, "stone");
Cy(g, st, 1.1, 1.2, 0.7, 0, 0.35, 0, 18);
Cy(g, evbGlow(0xA8E0F8, 0.85), 0.98, 0.98, 0.02, 0, 0.69, 0, 18);
S(g, M(0xF0F4F8), 0.25, 0.4, 0.72, 0.2, 10).scale.y = 0.3;
S(g, M(0xF0F4F8), 0.2, -0.3, 0.72, -0.3, 10).scale.y = 0.3;
return g;
};
P.evb_horn = function () {
var g = G(), hn = M(0xD8C8A0, "marble"), gd = GILT();
Cy(g, M(0x6A4A2A, "wood"), 0.08, 0.12, 0.9, 0, 0.45, 0, 8);
var h = Co(g, hn, 0.12, 0.8, 0, 1.05, 0.1, 12);
h.rotation.x = 1.2;
Tor(g, gd, 0.12, 0.015, 0, 1.05, 0.4, 0.37);
return g;
};
P.evb_sleipnir = function () {
var g = G(), wd = M(0xC8C0B8, "wood");
B(g, M(0x5A5048, "stone"), 1.0, 0.3, 2.4, 0, 0.15, 0);
var bd = B(g, wd, 0.6, 0.7, 1.6, 0, 1.35, 0);
for (var i = 0; i < 8; i++)
Cy(g, wd, 0.06, 0.05, 1.0, (i % 2 ? 0.2 : -0.2), 0.8, -0.7 + Math.floor(i / 2) * 0.47, 6);
var nk = B(g, wd, 0.35, 0.9, 0.4, 0, 1.9, 0.8);
nk.rotation.x = 0.5;
B(g, wd, 0.3, 0.35, 0.7, 0, 2.3, 1.1);
Cy(g, M(0x3A3A40), 0.02, 0.08, 0.9, 0, 1.4, -0.9, 6).rotation.x = 0.8;
return g;
};
P.evb_icicles = function () { var g = G(), ic = M(0xD8F4FF, null, { op: 0.75, e: 0x10303A }); for (var i = 0; i < 9; i++) {
var h = 0.4 + ((i * 7) % 5) * 0.18;
Co(g, ic, 0.06, h, -1.6 + i * 0.4, 3.4 - h / 2, (i % 3 - 1) * 0.15, 6).rotation.x = Math.PI;
} return g; };
P.evb_snowflake = function () {
var g = G(), fl = G(), ic = M(0xE8F8FF, null, { e: 0x2A4A5A });
Cy(g, M(0xA8C8D8, "marble"), 0.15, 0.2, 1.2, 0, 0.6, 0, 8);
for (var i = 0; i < 6; i++) {
var arm = G();
arm.rotation.z = i * Math.PI / 3;
B(arm, ic, 0.05, 0.6, 0.02, 0, 0.3, 0);
for (var k = 1; k < 3; k++) {
var b1 = B(arm, ic, 0.03, 0.16, 0.02, 0.05, 0.18 * k + 0.1, 0);
b1.rotation.z = -0.8;
var b2 = B(arm, ic, 0.03, 0.16, 0.02, -0.05, 0.18 * k + 0.1, 0);
b2.rotation.z = 0.8;
}
fl.add(arm);
}
fl.position.y = 1.9;
g.add(fl);
evbSpinMark(fl, 0.2);
return g;
};
P.evb_iceswan = function () {
var g = G(), ic = M(0xC8EEFF, null, { op: 0.8, e: 0x10304A });
B(g, M(0xA8C8D8, "marble"), 1.2, 0.6, 1.2, 0, 0.3, 0);
var b = S(g, ic, 0.45, 0, 0.95, 0, 14);
b.scale.set(0.8, 0.7, 1.3);
var n = Cy(g, ic, 0.08, 0.12, 0.9, 0, 1.4, 0.35, 8);
n.rotation.x = -0.3;
S(g, ic, 0.13, 0, 1.85, 0.5, 10);
Co(g, ic, 0.04, 0.18, 0, 1.84, 0.65, 6).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { var w = S(g, ic, 0.35, s * 0.32, 1.05, -0.1, 10); w.scale.set(0.3, 0.8, 1.2); });
return g;
};
P.evb_icebear = function () {
var g = G(), ic = M(0xE0F6FF, null, { op: 0.85, e: 0x10303A });
B(g, M(0xA8C8D8, "marble"), 1.4, 0.4, 2.0, 0, 0.2, 0);
var b = S(g, ic, 0.6, 0, 1.0, 0, 14);
b.scale.set(0.9, 0.8, 1.5);
S(g, ic, 0.32, 0, 1.2, 0.9, 12);
S(g, ic, 0.14, 0, 1.12, 1.18, 8);
for (var i = 0; i < 4; i++)
Cy(g, ic, 0.16, 0.14, 0.6, (i % 2 ? 0.3 : -0.3), 0.6, i < 2 ? 0.5 : -0.5, 8);
S(g, ic, 0.08, 0.18, 1.45, 0.85, 6);
S(g, ic, 0.08, -0.18, 1.45, 0.85, 6);
return g;
};
P.evb_icerink = function () { var g = G(); Cy(g, M(0xC8E8F8, "marble", { e: 0x10202A }), 3.0, 3.0, 0.04, 0, 0.02, 0, 28); Tor(g, M(0xF8FCFF), 3.0, 0.14, 0, 0.05, 0, Math.PI / 2); return g; };
P.evb_sled = function () {
var g = G(), wd = M(0x8A5A32, "wood");
B(g, wd, 1.0, 0.1, 2.0, 0, 0.45, 0);
[-0.45, 0.45].forEach(function (x) { B(g, M(0xA8A8B0), 0.05, 0.05, 2.3, x, 0.1, 0.05); for (var i = 0; i < 3; i++)
B(g, wd, 0.05, 0.35, 0.05, x, 0.28, -0.7 + i * 0.7); });
S(g, M(0xF0E8D8, "carpet"), 0.45, 0, 0.65, 0, 10).scale.set(1, 0.4, 1.8);
return g;
};
P.evb_obsidian = function () {
var g = G(), ob = M(0x14101A, "marble");
Cy(g, ob, 0.4, 0.55, 4.4, 0, 2.2, 0, 6);
for (var i = 0; i < 3; i++) {
var s = B(g, evbGlow(0xFF5A1A, 0.85), 0.03, 1.2, 0.03, Math.cos(i * 2) * 0.45, 1.2 + i * 1.1, Math.sin(i * 2) * 0.45);
s.rotation.z = 0.3 * (i - 1);
}
return g;
};
P.evb_phoenix = function () {
var g = G(), gd = GILT();
B(g, M(0x2A1A14, "stone"), 1.6, 0.6, 1.6, 0, 0.3, 0);
for (var i = 0; i < 14; i++) {
var t = Cy(g, gd, 0.02, 0.02, 1.0, Math.cos(i) * 0.45, 0.75, Math.sin(i) * 0.45, 4);
t.rotation.z = Math.cos(i * 1.7) * 1.3;
t.rotation.x = Math.sin(i * 1.3) * 1.3;
}
var e = S(g, evbGlow(0xFF8A20, 0.95), 0.22, 0, 0.9, 0, 12);
e.scale.y = 1.3;
Co(g, evbGlow(0xFFD040, 0.5), 0.3, 0.8, 0, 1.3, 0, 8);
return g;
};
P.evb_lava = function () {
var g = G(), rk = M(0x2A2220, "stone");
var ring = Cy(g, rk, 1.0, 1.1, 0.3, 0, 0.15, 0, 14);
var lv = Cy(g, evbGlow(0xFF5A1A), 0.82, 0.82, 0.06, 0, 0.29, 0, 14);
S(g, evbGlow(0xFFB040, 0.8), 0.18, 0.3, 0.33, -0.2, 8);
S(g, evbGlow(0xFFB040, 0.8), 0.12, -0.35, 0.32, 0.25, 8);
return g;
};
P.evb_salamander = function () {
var g = G(), sk = M(0xFF6A1A, null, { e: 0x4A1A00 });
B(g, M(0x3A2A24, "stone"), 1.2, 0.4, 0.8, 0, 0.2, 0);
var b = S(g, sk, 0.14, 0, 0.5, 0, 10);
b.scale.set(1, 0.6, 3);
S(g, sk, 0.1, 0, 0.52, 0.42, 8);
var t = Co(g, sk, 0.08, 0.5, 0, 0.48, -0.6, 6);
t.rotation.x = -Math.PI / 2;
for (var i = 0; i < 4; i++)
S(g, M(0x1A1A1A), 0.035, (i % 2 ? 0.07 : -0.07), 0.56, -0.2 + Math.floor(i / 2) * 0.3, 6);
return g;
};
P.evb_crucible = function () {
var g = G(), ir = M(0x2A2A2E);
Cy(g, ir, 0.8, 0.6, 1.0, 0, 0.5, 0, 16);
Cy(g, evbGlow(0xFF7A1A, 0.95), 0.72, 0.72, 0.02, 0, 1.0, 0, 16);
for (var i = 0; i < 3; i++)
Cy(g, ir, 0.06, 0.06, 0.5, Math.cos(i * 2.1) * 0.6, 0.15, Math.sin(i * 2.1) * 0.6, 6);
S(g, evbGlow(0xFFB040, 0.8), 0.1, 0.2, 1.05, 0.1, 8);
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_lava", "evb_weather", "evb_windhorn", "evb_runestone", "evb_yggdrasil", "evb_highseat", "evb_urdwell", "evb_sleipnir", "evb_snowflake", "evb_iceswan", "evb_icebear", "evb_sled", "evb_obsidian", "evb_phoenix", "evb_salamander", "evb_crucible", "evb_horn"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("cloudpalace", { corner: "evb_cloud", seed: 41, panel: 0xF4F8FF, rug: 2,
pal: { fab: "ivory", fab2: "teal", wood: "white", metal: "gold", stone: "marble", art: 1, rug: 2, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF4F8FF, "plaster"], "D8D0C0|coffer": [0xC8E0FF, "coffer"], "B8AE9E|marble": [0xE8F0FF, "marble"], "D4CEC4|marble": [0xF0F4FF, "marble"] },
hello: "☁️ <b>Inside the Cloud Palace.</b> The palace of the sky: the four winds, the weather engine, rooms of rain, thunder and snow, the library of clouds, and the observatory upstairs. Sit on a cloud. Look for the ✨ cards." });
evbHouse("cloudpalace", { g: EVB_GRID.wide, h: 5.0, levels: 2, stairX: 4, stairZ: 11, floors: ["The sky floor", "The star floor"], wall: 0xF4F8FF, trim: 0xD8B040,
plan: [
{ hall: { k: "cpwinds", n: "The Hall of the Four Winds" }, spine: { k: "cprainbow", n: "The Rainbow Hall" }, gallery: { k: "cpwalk", n: "The Cloud Walk" },
back: { merge: EVB_BACK, k: "cpsun", n: "The Hall of Sunrise" },
r1i: { k: "cpengine", n: "The Weather Engine Room" }, r1o: { k: "cprain", n: "The Rain Room" },
r2i: { k: "cpclouds", n: "The Library of Clouds" }, r2o: { k: "cpkites", n: "The Kite Loft" },
r3i: { k: "cpthunder", n: "The Thunder Room" }, r3o: { k: "cpsnow", n: "The Snow Room" },
l1i: { k: "cpeagles", n: "The Aviary of Eagles" }, l1o: { k: "cpballoon", n: "The Balloon Room" },
l2i: { k: "cpsunroom", n: "The Sun Room" }, l2o: { k: "cpmoon", n: "The Moon Room" },
l3i: { k: "cpgarden", n: "The Cloud Garden" }, l3o: { k: "cpdew", n: "The Dew Kitchen" } },
{ hall: { k: "cpupper", n: "The Upper Sky" }, spine: { k: "cprainbows", n: "The Gallery of Rainbows" }, gallery: { k: "cpstarwalk", n: "The Starwalk" },
back: { merge: EVB_BACK, k: "cpobserve", n: "The Observatory of the Heavens" },
r1: { merge: ["r1i", "r1o"], k: "cpbeds", n: "The Cloud Bedchambers" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "cpconst", n: "The Hall of Constellations" },
l1: { merge: ["l1i", "l1o"], k: "cpswing", n: "The Swing Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "cpdream", n: "The Dream Library" } }
] });
evbTheme("asgard", { corner: "brazier", seed: 43, panel: 0x6A4A2A, rug: 5,
pal: { fab: "crimson", fab2: "mustard", wood: "walnut", metal: "gold", stone: "stone", art: 7, rug: 5, rugv: 0 },
remap: { "D6D0C6|plaster": [0x8A6A4A, "plaster"], "D8D0C0|coffer": [0xC8A048, "coffer"], "B8AE9E|marble": [0x8A7A5A, "marble"], "D4CEC4|marble": [0x9A8A6A, "marble"] },
hello: "🛡️ <b>Inside the Golden Hall.</b> Valhalla of the Norse tales, roofed with shields: the feasting hall and Odin's high seat, the Well of Urd under the world tree, the runes, the ravens, Thor's hammer and Idunn's golden apples. Look for the ✨ cards." });
evbHouse("asgard", { g: EVB_GRID.temple, h: 6.0, levels: 1, stairX: 4, stairZ: 12, floors: ["The Golden Hall"], wall: 0x8A6A4A, trim: 0xD8B040,
plan: [{ hall: { k: "agdoors", n: "The Doors of Valhalla" }, spine: { k: "agspears", n: "The Hall of Spears" }, gallery: { k: "agshieldwalk", n: "The Shield Walk" },
back: { merge: EVB_BACK, k: "agvalhalla", n: "Valhalla, the Hall of the Slain" },
r1i: { k: "agvalkyrie", n: "The Valkyries' Armoury" }, r1o: { k: "agsleipnir", n: "Sleipnir's Stall" },
r2i: { k: "agurd", n: "The Well of Urd" }, r2o: { k: "agtree", n: "The Root of Yggdrasil" },
r3i: { k: "agrunes", n: "The Rune Room" }, r3o: { k: "agravens", n: "The Hall of the Ravens" },
l1i: { k: "agskald", n: "The Skalds' Corner" }, l1o: { k: "agthor", n: "Thor's Room" },
l2i: { k: "agkitchen", n: "The Feast Kitchen" }, l2o: { k: "agnine", n: "The Hall of the Nine Worlds" },
l3i: { k: "agidunn", n: "Idunn's Orchard" }, l3o: { k: "agfreyja", n: "Freyja's Bower" } }] });
evbTheme("icepalace", { corner: "evb_icepillar", seed: 45, panel: 0xD8F0FF, rug: 1,
pal: { fab: "dove", fab2: "teal", wood: "white", metal: "chrome", stone: "marble", art: 8, rug: 1, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE4F6FF, "plaster"], "D8D0C0|coffer": [0xB8E4FF, "coffer"], "B8AE9E|marble": [0xC8EAFF, "marble"], "D4CEC4|marble": [0xDCF2FF, "marble"] },
hello: "❄️ <b>Inside the Ice Palace.</b> Every wall is ice: the frozen lake ballroom (skate on it), the snowflake room, the ice sculptors, the glacier library, and upstairs the throne of ice under the northern lights. Look for the ✨ cards." });
evbHouse("icepalace", { g: EVB_GRID.wide, h: 5.0, levels: 2, stairX: 4, stairZ: 11, floors: ["The ice floor", "The aurora floor"], wall: 0xE4F6FF, trim: 0x8AC8E8,
plan: [
{ hall: { k: "iphall", n: "The Hall of Icicles" }, spine: { k: "ipfrost", n: "The Frost Gallery" }, gallery: { k: "ipglacier", n: "The Glacier Walk" },
back: { merge: EVB_BACK, k: "iplake", n: "The Frozen Lake Ballroom" },
r1i: { k: "ipflake", n: "The Snowflake Room" }, r1o: { k: "ipbears", n: "The Polar Bears' Hall" },
r2i: { k: "ipsculpt", n: "The Ice Sculptors' Workshop" }, r2o: { k: "ipigloo", n: "The Igloo Room" },
r3i: { k: "iplibrary", n: "The Glacier Library" }, r3o: { k: "ippenguin", n: "The Penguin Room" },
l1i: { k: "ipcocoa", n: "The Hot Chocolate Kitchen" }, l1o: { k: "ipfurs", n: "The Fur Room" },
l2i: { k: "ipsled", n: "The Sled Hall" }, l2o: { k: "ipwhale", n: "The Whale Song Room" },
l3i: { k: "ipcave", n: "The Ice Cave" }, l3o: { k: "ipmitten", n: "The Mitten Room" } },
{ hall: { k: "ipaurorahall", n: "The Aurora Landing" }, spine: { k: "ipstar", n: "The Starlight Gallery" }, gallery: { k: "ipbalcony", n: "The Frost Balcony" },
back: { merge: EVB_BACK, k: "ipthrone", n: "The Throne of Ice" },
r1: { merge: ["r1i", "r1o"], k: "iplights", n: "The Northern Lights Observatory" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "ipbeds", n: "The Frozen Bedchambers" },
l1: { merge: ["l1i", "l1o"], k: "ipglobe", n: "The Snow Globe Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "ipwinter", n: "The Winter Garden" } }
] });
evbTheme("firepalace", { corner: "firebowl", seed: 47, panel: 0x5A2A1A, rug: 0,
pal: { fab: "terracotta", fab2: "crimson", wood: "ebony", metal: "copper", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0x5A2A1E, "plaster"], "D8D0C0|coffer": [0x3A1A14, "coffer"], "B8AE9E|marble": [0x3A2A24, "marble"], "D4CEC4|marble": [0x4A2A20, "marble"] },
hello: "🔥 <b>Inside the Fire Palace.</b> The lava throne, the fire giants' forge, the volcano room, the phoenix's nest, the obsidian gallery, and the dragon's bath upstairs. Hot to the touch. Look for the ✨ cards." });
evbHouse("firepalace", { g: EVB_GRID.mid, h: 5.0, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The flame floor", "The furnace floor"], wall: 0x5A2A1E, trim: 0xFF7A1A,
plan: [
{ hall: { k: "fphall", n: "The Hall of Flames" }, spine: { k: "fpobwalk", n: "The Obsidian Walk" }, gallery: { k: "fpember", n: "The Ember Corridor" },
back: { merge: EVB_BACK, k: "fpthrone", n: "The Lava Throne Hall" },
r1i: { k: "fpforge", n: "The Forge of the Fire Giants" }, r1o: { k: "fpcrucible", n: "The Crucible Room" },
r2i: { k: "fpvolcano", n: "The Volcano Room" }, r2o: { k: "fpsalamander", n: "The Salamander Pools" },
r3i: { k: "fpobsidian", n: "The Obsidian Gallery" }, r3o: { k: "fpgarden", n: "The Ember Garden" },
l1i: { k: "fpphoenix", n: "The Phoenix's Nest" }, l1o: { k: "fpwalkers", n: "The Firewalkers' Hall" },
l2i: { k: "fpash", n: "The Library of Ash" }, l2o: { k: "fplanterns", n: "The Lantern Room" },
l3i: { k: "fpkitchen", n: "The Smiths' Kitchen" }, l3o: { k: "fpglass", n: "The Glassblowers' Room" } },
{ hall: { k: "fpupper", n: "The Upper Furnace" }, spine: { k: "fpfestivals", n: "The Gallery of Fire Festivals" }, gallery: { k: "fpsmoke", n: "The Smoke Balcony" },
back: { merge: EVB_BACK, k: "fpbath", n: "The Dragon's Bath" },
r1: { merge: ["r1i", "r1o"], k: "fpsunforge", n: "The Sun Forge" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "fpbeds", n: "The Fire Giants' Bedchambers" },
l1: { merge: ["l1i", "l1o"], k: "fpcool", n: "The Cooling Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "fptales", n: "The Hall of Fire Tales" } }
] });
evbFins({
cpwinds: ["marble", 0xF0F4FF, 0xE8F2FF, "marble", 0xD8B040, "coffer"], cprainbow: ["marble", 0xF4F0FF, 0xFFF4E8, "plaster", 0xD8B040], cpwalk: ["marble", 0xF0F6FF, 0xE8F2FF, "plaster", 0xD8B040],
cpsun: ["marble", 0xFFF0D8, 0xFFD890, "plaster", 0xD8B040, "coffer"], cpengine: ["tile", 0xD8E4F0, 0xC8DCF0, "plaster", 0xC8A050], cprain: ["tile", 0xB8C8D8, 0x8AA8C8, "plaster", 0xA8B8C8],
cpclouds: ["herring", 0xD8C8B0, 0xE8F0FF, "plaster", 0xD8B040], cpkites: ["wood", 0xD8C8A8, 0xFFF0C8, "plaster", 0xE8302A], cpthunder: ["stone", 0x6A7088, 0x4A5070, "plaster", 0xFFE040],
cpsnow: ["carpet", 0xF8FCFF, 0xE8F4FF, "plaster", 0xA8C8E8], cpeagles: ["wood", 0xC8A878, 0xF0E8D8, "plaster", 0x8A6A4A], cpballoon: ["wood", 0xD8C8A8, 0xFFE8C8, "stripe", 0xE8302A],
cpsunroom: ["marble", 0xFFF0C8, 0xFFE070, "plaster", 0xD8B040], cpmoon: ["marble", 0xD8DCE8, 0x2A3A6A, "plaster", 0xE8E8F0], cpgarden: ["stone", 0xB8D8A8, 0xF0FFF0, "plaster", 0x8AC08A],
cpdew: ["tile", 0xE8F0F8, 0xF0F8FF, "tile", 0x8AB8D8], cpupper: ["marble", 0xF0F4FF, 0xE8F2FF, "marble", 0xD8B040], cprainbows: ["marble", 0xF8F4FF, 0xFFF8F0, "plaster", 0xD8B040],
cpstarwalk: ["marble", 0xE0E4F0, 0x2A3A6A, "plaster", 0xE8E8F0], cpobserve: ["wood", 0x5A4A3A, 0x141E3A, "plaster", 0xD8B040, "coffer"], cpbeds: ["carpet", 0xF0F4FF, 0xE0ECFF, "damask", 0xD8B040],
cpconst: ["marble", 0x2A3048, 0x141E3A, "plaster", 0xD8B040], cpswing: ["carpet", 0xFFF0F8, 0xE8F2FF, "plaster", 0xD8B040], cpdream: ["herring", 0xD8C8B0, 0xD8D0FF, "damask", 0xD8B040],
agdoors: ["stone", 0x8A7A6A, 0x8A6A4A, "wood", 0xD8B040], agspears: ["wood", 0x7A5A3A, 0x8A6A4A, "wood", 0xD8B040], agshieldwalk: ["wood", 0x7A5A3A, 0x8A6A4A, "wood", 0xD8B040],
agvalhalla: ["wood", 0x6A4A2A, 0xA07840, "wood", 0xD8B040, "coffer"], agvalkyrie: ["stone", 0x8A8478, 0xB8B0A0, "stone", 0xA8A8B0], agsleipnir: ["wood", 0x8A6A4A, 0x9A7A5A, "wood", 0x6A4A2A],
agurd: ["stone", 0x7A8A7A, 0x6A7A6A, "stone", 0xA8C8D8], agtree: ["stone", 0x5A6A4A, 0x4A5A3A, "wood", 0xD8B040], agrunes: ["stone", 0x8A8478, 0x9A9084, "stone", 0xA8202A],
agravens: ["wood", 0x3A3A40, 0x2A2A30, "wood", 0xA8A8B0], agskald: ["wood", 0x7A5A3A, 0x8A3A2A, "wood", 0xD8B040], agthor: ["stone", 0x6A6A70, 0x5A5A68, "stone", 0xE8C040],
agkitchen: ["stone", 0x8A7A6A, 0x9A8064, "wood", 0x6A4A2A], agnine: ["wood", 0x6A4A2A, 0x2A3A5A, "wood", 0xD8B040], agidunn: ["stone", 0x8A9A6A, 0xD8E0B0, "wood", 0xD8B040],
agfreyja: ["carpet", 0xA8607A, 0xE8C8B0, "damask", 0xD8B040],
iphall: ["marble", 0xD8F0FF, 0xC8EAFF, "marble", 0x8AC8E8, "coffer"], ipfrost: ["marble", 0xE0F4FF, 0xD0EEFF, "marble", 0x8AC8E8], ipglacier: ["marble", 0xD0EAF8, 0xB8E0F8, "marble", 0x8AC8E8],
iplake: ["marble", 0xC8E8F8, 0xB8E4FF, "marble", 0xA8D8F0, "coffer"], ipflake: ["marble", 0xE8F6FF, 0xD8F0FF, "plaster", 0x8AC8E8], ipbears: ["carpet", 0xF8FCFF, 0xD0ECFF, "plaster", 0x8AC8E8],
ipsculpt: ["stone", 0xC8D8E0, 0xD8EEFF, "plaster", 0x8AA8B8], ipigloo: ["carpet", 0xF8FCFF, 0xE8F6FF, "plaster", 0x8AC8E8], iplibrary: ["wood", 0xA8B8C8, 0xD8EEFF, "plaster", 0x8AA8C8],
ippenguin: ["marble", 0xF0F8FF, 0xC8E4F8, "plaster", 0x2A3A4A], ipcocoa: ["wood", 0x8A5A3A, 0xF0E0D0, "plaster", 0x6A3A22], ipfurs: ["carpet", 0xD8C8B0, 0xE8DCCC, "wood", 0x6A4A2A],
ipsled: ["wood", 0x9A7A5A, 0xE0F0FF, "wood", 0x6A4A2A], ipwhale: ["marble", 0x8AA8C8, 0x2A4A6A, "plaster", 0xA8D8F0], ipcave: ["stone", 0xA8C8D8, 0x8AB8D0, "stone", 0xC8E8F8],
ipmitten: ["carpet", 0xE84A4A, 0xF0F4FF, "stripe", 0xE84A4A], ipaurorahall: ["marble", 0xD8F0FF, 0xC8EAFF, "marble", 0x6AE8C8], ipstar: ["marble", 0xC8D8E8, 0x1E2A4A, "plaster", 0xE8F0FF],
ipbalcony: ["marble", 0xE0F4FF, 0xD0EEFF, "marble", 0x8AC8E8], ipthrone: ["marble", 0xC8E8FF, 0x9AD0F0, "marble", 0xE8F8FF, "coffer"], iplights: ["wood", 0x3A4A5A, 0x0E1A2E, "plaster", 0x6AE8C8],
ipbeds: ["carpet", 0xE8F4FF, 0xD8ECFF, "damask", 0x8AC8E8], ipglobe: ["carpet", 0xE8F0FF, 0xD0E8FF, "plaster", 0xE84A4A], ipwinter: ["stone", 0xD8E8E8, 0xE8F8F8, "plaster", 0x6AA88A],
fphall: ["stone", 0x3A2A24, 0x5A2A1E, "stone", 0xFF7A1A, "coffer"], fpobwalk: ["marble", 0x241C20, 0x4A2A20, "stone", 0xFF7A1A], fpember: ["stone", 0x3A2A24, 0x5A2A1E, "stone", 0xFF5A1A],
fpthrone: ["marble", 0x2A1C1C, 0x6A1E14, "stone", 0xFFA020, "coffer"], fpforge: ["stone", 0x3A3430, 0x4A3A30, "stone", 0xFF7A1A], fpcrucible: ["stone", 0x3A3430, 0x4A3028, "stone", 0xFF7A1A],
fpvolcano: ["stone", 0x4A3A30, 0x6A3A2A, "plaster", 0xFF7A1A], fpsalamander: ["stone", 0x3A2A24, 0x5A3A2A, "stone", 0xFF9A2A], fpobsidian: ["marble", 0x1E1820, 0x2A2028, "marble", 0xFF5A1A],
fpgarden: ["stone", 0x3A2A24, 0x5A2A1E, "stone", 0xFFB040], fpphoenix: ["marble", 0x5A2A1A, 0xA84A1A, "plaster", 0xFFD040], fpwalkers: ["stone", 0x3A2A24, 0x6A2A1A, "stone", 0xFF7A1A],
fpash: ["wood", 0x3A2A24, 0x6A5A50, "plaster", 0xA87838], fplanterns: ["wood", 0x4A2A1A, 0x7A3A1A, "plaster", 0xFFB040], fpkitchen: ["stone", 0x5A4A40, 0x7A5A40, "plaster", 0xA87838],
fpglass: ["stone", 0x4A3A30, 0x6A4A3A, "plaster", 0xFFB040], fpupper: ["stone", 0x3A2A24, 0x5A2A1E, "stone", 0xFF7A1A], fpfestivals: ["wood", 0x4A2A1A, 0x7A2A1A, "plaster", 0xFFB040],
fpsmoke: ["stone", 0x3A3430, 0x5A4A44, "stone", 0xFF7A1A], fpbath: ["marble", 0x3A1E18, 0x6A2A1A, "marble", 0xFFA020, "coffer"], fpsunforge: ["stone", 0x4A3A30, 0x8A4A1A, "stone", 0xFFD040],
fpbeds: ["carpet", 0x6A2A1A, 0x7A3A2A, "damask", 0xFFA020], fpcool: ["tile", 0x5A6A7A, 0x4A5A6A, "tile", 0x8AB8D8], fptales: ["wood", 0x4A2A1A, 0x6A2A1A, "damask", 0xFFB040]
});
EVB_LD.cloudpalace = { theme: "cloudpalace", name: "The Cloud Palace", doors: "the gates of cloud" };
EVB_LD.goldenhall = { theme: "asgard", name: "The Golden Hall", doors: "the golden doors" };
EVB_LD.icepalace = { theme: "icepalace", name: "The Ice Palace", doors: "the doors of ice" };
EVB_LD.firepalace = { theme: "firepalace", name: "The Fire Palace", doors: "the doors of flame" };
"use strict";
function evbCpWinds() { return __ZC(367, 53, this, arguments, new.target); }
var evbCpRainbow = evbInfo("Why there are rainbows", "A rainbow is sunlight split by raindrops. Each drop bends the light and reflects it back, and each colour bends a slightly different amount: red least, violet most. You only see one with the sun <b>behind</b> you and rain in front. The order never changes: red, orange, yellow, green, blue, indigo, violet.");
function evbCpEngine() { return __ZC(367, 54, this, arguments, new.target); }
var evbCpRain = evbFact("The Rain Room", ["A raindrop is not tear-shaped: small ones are round, and big ones are flattened on the bottom like a bun.", "The wettest place on Earth is Mawsynram in India, with about 11.9 m of rain a year.", "The smell of rain on dry ground has a name: petrichor."]);
var evbCpClouds = evbInfo("The Library of Clouds", "In 1802 Luke Howard, a London chemist, gave clouds the names we still use: <b>cumulus</b> (heaped, fluffy), <b>stratus</b> (flat layers), <b>cirrus</b> (wispy, high up) and <b>nimbus</b> (rain-bearing). Put them together and you get cumulonimbus, the great thundercloud, which can be 12 km tall.");
function evbCpKite() { evbTune([523, 659, 784], 250, 0.6); evbSay("🪁 You launch a kite out of the loft window. Kites were invented in China over 2,000 years ago; Benjamin Franklin famously flew one in a storm in 1752 (dangerous: never try it)."); }
var evbCpThunder = evbInfo("The Thunder Room", "Every thunder god in the old stories lives in the sky: Zeus of the Greeks, Thor of the Norse, Perun of the Slavs, Shango of the Yoruba, Indra of the Vedas, Raijin of Japan. In real life, lightning strikes the Earth about 40 to 50 times every second.");
var evbCpSnow = evbFact("The Snow Room", ["No two snowflakes are alike, but they all have six sides: water molecules freeze in a six-sided pattern.", "In 1885 Wilson Bentley of Vermont took the first photographs of single snowflakes; he photographed over 5,000.", "Fresh snow is mostly air: up to 95 percent."]);
var evbCpEagles = evbFact("The Aviary of Eagles", ["A golden eagle can dive at over 240 km an hour.", "Eagles can see a rabbit from more than 3 km away.", "In the Greek myths the eagle was Zeus's bird, and carried his thunderbolts."]);
function evbCpBalloon() { evbTune([392, 523, 659], 400, 0.8); evbSay("🎈 In 1783 the Montgolfier brothers sent up a hot-air balloon from Versailles with the first passengers: a sheep, a duck and a rooster. All three landed safely."); }
var evbCpSun = evbInfo("The Sun Room", "The Sun is a star, about 150 million km away. Its light takes about 8 minutes and 20 seconds to reach us, so you always see the Sun as it was eight minutes ago. It is so big that about 1.3 million Earths would fit inside it.");
var evbCpMoon = evbInfo("The Moon Room", "The Moon always shows us the same face, because it turns once on its axis in exactly the time it takes to go round the Earth. It is moving away from us by about 3.8 cm a year. Twelve people have walked on it, between 1969 and 1972.");
function evbCpGarden() { evbTune([659, 784], 300, 0.6); evbSay("🌱 Plants in the Cloud Garden drink from the mist. On Earth, the coast redwood gets up to a third of its water from fog, through its leaves."); }
function evbCpDew() { evbTune([784, 880], 250, 0.5); evbSay("💧 The cook bottles dew in tiny jars. Dew forms at night when the ground cools and water vapour in the air condenses on the cold grass."); }
function evbCpSit() { evbTune([523, 659, 784, 1047], 300, 1.0); evbSay("☁️ You sit on the cloud. It holds you, just. (A real cloud would not: it is made of tiny water droplets, but a big cumulus cloud still weighs about as much as a hundred elephants.)"); }
function evbCpObserve() { return __ZC(367, 55, this, arguments, new.target); }
var evbCpConst = evbFact("The Hall of Constellations", ["There are 88 official constellations, agreed in 1922.", "Orion's belt is three stars in a row; follow it down and it points to Sirius, the brightest star in the night sky.", "The Plough (the Big Dipper) is part of the Great Bear; its two end stars point to the North Star."]);
function evbCpSwing() { evbTune([392, 523, 392, 523], 300, 0.6); evbSay("🪢 You swing out over nothing at all, and back. The swing is tied to the clouds."); }
var evbCpDream = evbFact("The Dream Library", ["Everybody dreams, every night, mostly in REM sleep, when your eyes move quickly under the lids.", "You forget most dreams within minutes of waking. Keeping a dream journal helps you remember them.", "A lucid dream is one where you know you're dreaming. Some people learn to do it on purpose."]);
var evbAgDoors = evbInfo("Valhalla", "In the Norse tales Valhalla is Odin's hall in Asgard. It has 540 doors, each wide enough for 800 warriors to march through side by side; its roof is thatched with shields and its rafters are spears. The warriors who live there, the einherjar, fight all day and feast all night, until Ragnarök. (From the Grímnismál, a poem of the Poetic Edda.)");
function evbAgFeast() { return __ZC(367, 56, this, arguments, new.target); }
var evbAgSeat = evbInfo("The high seat", "From his high seat Hliðskjálf, Odin could look out over all nine worlds. On his shoulders sit his two ravens, <b>Huginn</b> (Thought) and <b>Muninn</b> (Memory), who fly over the world each day and come back to tell him everything. He gave an eye for a drink from Mímir's well of wisdom.");
var evbAgValkyrie = evbInfo("The Valkyries", "The Valkyries, 'choosers of the slain', ride over battlefields and choose who will come to Valhalla. In the hall they bring the warriors their drink. Their names in the old poems mean things like 'Battle', 'Shield-shaker' and 'Mist'.");
function evbAgSleipnir() { evbTune([262, 330, 262, 330], 180, 0.4); evbSay("🐴 Sleipnir, Odin's grey horse, has eight legs and is the fastest of all horses: he can gallop over sea and through the air, all the way down to the land of the dead and back."); }
function evbAgUrd() { return __ZC(367, 57, this, arguments, new.target); }
var evbAgTree = evbInfo("Yggdrasil", "The world tree, an ash, holds the nine worlds in its branches and roots. An eagle sits at the top, a dragon, Níðhöggr, gnaws at a root below, and a squirrel called Ratatoskr runs up and down the trunk carrying insults between them. Four stags nibble its leaves.");
function evbAgRunes() { return __ZC(367, 58, this, arguments, new.target); }
function evbAgRavens() { evbTune([330, 294], 300, 0.6); evbSay("🐦‍⬛ Huginn and Muninn land on the beam above you and put their heads on one side. 'I worry about Huginn,' Odin says in the old poem, 'but I worry more about Muninn': more about losing memory than losing thought."); }
var evbAgSkald = evbFact("The skalds", ["A skald was a Norse poet, paid by kings to praise them in verse with tricky rules of rhythm and alliteration.", "Skalds used kennings, little riddles for ordinary words: 'whale-road' for the sea, 'battle-sweat' for blood, 'sky-candle' for the sun.", "Most of what we know of the Norse gods comes from Iceland: the Poetic Edda, and the Prose Edda written by Snorri Sturluson about 1220."]);
function evbAgThor() { return __ZC(367, 59, this, arguments, new.target); }
function evbAgKitchen() { evbTune([262, 330], 300, 0.5); evbSay("🍖 The fire roars under a cauldron the size of a boat. The Norse ate mostly porridge, bread, fish, cheese and meat, and drank ale and mead from horns."); }
var evbAgNine = evbInfo("The nine worlds", "<b>Asgard</b> (the gods), <b>Vanaheim</b> (the Vanir gods), <b>Alfheim</b> (the light elves), <b>Midgard</b> (us), <b>Jotunheim</b> (the giants), <b>Svartalfheim</b> (the dwarves), <b>Muspelheim</b> (fire), <b>Niflheim</b> (ice and mist) and <b>Hel</b> (the dead). The rainbow bridge Bifröst joins Asgard to Midgard, guarded by Heimdall.");
function evbAgApple() { evbTune([659, 784, 988], 300, 0.8); evbSay("🍎 You pick a golden apple. Idunn keeps the apples that keep the gods young. Once the giant Thjazi stole her away, and the gods began to grow old and grey, until Loki was made to bring her back as a nut in a falcon's claws."); }
var evbAgFreyja = evbInfo("Freyja's bower", "Freyja, goddess of love and of war, rides in a chariot pulled by two cats, wears the shining necklace Brísingamen, and has a cloak of falcon feathers to fly in. She takes half of those who fall in battle to her own hall, Fólkvangr; Odin takes the other half.");
var evbIpHall = evbInfo("The Ice Palace", "Real ice palaces have been built for hundreds of years: in 1739 Empress Anna of Russia had one built on the frozen river in St Petersburg, with ice furniture, ice trees with ice birds, and an ice elephant that sprayed water. Today Harbin in China builds a whole city of ice every winter.");
function evbIpSkate() { return __ZC(367, 60, this, arguments, new.target); }
var evbIpFlake = evbInfo("The Snowflake Room", "In 1954 the Japanese scientist Ukichiro Nakaya grew snowflakes in his lab and found that their shape depends on the temperature and wetness of the air where they grow: needles near -5 °C, plates near -2 °C and -15 °C, and the famous six-armed stars in wet air near -15 °C. He called snowflakes 'letters sent from heaven'.");
var evbIpBears = evbFact("The Polar Bears' Hall", ["A polar bear's fur isn't white: each hair is clear and hollow, and its skin is black, to soak up the sun.", "Polar bears can smell a seal through a metre of snow.", "They are the biggest land carnivores: a big male can weigh 700 kg."]);
function evbIpSculpt() { evbTune([1047, 988, 880], 250, 0.5); evbSay("🧊 You chip at a block with a chisel. Ice sculptors use clear ice made slowly, stirred so no bubbles get trapped, and chainsaws for the big cuts."); }
function evbIpIgloo() { return __ZC(367, 61, this, arguments, new.target); }
var evbIpLibrary = evbFact("The Glacier Library", ["Glaciers are rivers of ice: they flow, very slowly, a few centimetres to a few metres a day.", "About two thirds of the world's fresh water is frozen in ice sheets and glaciers.", "Ice cores drilled from Antarctica hold tiny bubbles of air 800,000 years old."]);
var evbIpPenguin = evbFact("The Penguin Room", ["Penguins live in the south, polar bears in the north: they never meet in the wild.", "Emperor penguin fathers balance the egg on their feet under a fold of skin for about two months in the Antarctic winter, eating nothing.", "Penguins can't fly in the air, but they 'fly' underwater."]);
function evbIpCocoa() { evbTune([392, 523], 300, 0.6); evbSay("☕ A mug of hot chocolate with a marshmallow. The Aztecs and the Maya drank chocolate long before Europe, but cold, and spiced with chilli."); }
function evbIpFurs() { evbTune([330], 400, 0.5); evbSay("🧥 You try on a parka. The word comes from the Nenets people of Arctic Russia; the Inuit name for the coat is amauti or atigi."); }
function evbIpSled() { evbTune([523, 659, 784, 1047], 180, 0.5); evbSay("🛷 The sled hall: dog sleds carried mail across Alaska. In 1925 relay teams of sled dogs, with Balto and Togo among them, rushed medicine 1,085 km to Nome to stop an outbreak of diphtheria."); }
function evbIpWhale() { evbTune([110, 147, 131, 98], 1200, 2.4); evbSay("🐋 Whale song fills the room. Humpback whales sing long songs that change a little every year, and all the males in one ocean sing the same version."); }
var evbIpCave = evbInfo("The Ice Cave", "Glacier caves are blue because ice soaks up the red end of sunlight and lets the blue through: the deeper the ice, the bluer it looks. They change every year as the glacier moves and melts.");
function evbIpMitten() { evbTune([659, 784], 250, 0.4); evbSay("🧤 You pick a pair of mittens. Mittens are warmer than gloves: your fingers keep each other warm."); }
var evbIpThrone = evbInfo("The Throne of Ice", "In Hans Christian Andersen's <i>The Snow Queen</i> (1844) the Snow Queen's palace has a hall of ice over a hundred miles long, lit by the northern lights, and a frozen lake at its heart called the Mirror of Reason. Gerda crosses the world to save her friend Kai from it, and her warm tears melt the ice in his heart.");
function evbIpLights() { return __ZC(367, 62, this, arguments, new.target); }
function evbIpGlobe() { evbTune([1047, 1319, 1175, 988], 300, 0.8); evbSay("🔮 You shake a snow globe and the flakes swirl round a tiny ice palace: this one. Snow globes were first made in France in the 1800s; one was sold at the Paris World's Fair of 1878."); }
var evbIpWinter = evbFact("The Winter Garden", ["Snowdrops push up through snow because they make a natural antifreeze.", "Evergreens keep their needles in winter: the needles' waxy coat and small size stop them losing water.", "Some frogs freeze solid in winter and thaw out alive in spring."]);
function evbIpBed() { evbTune(EVB_LULLABY, 420, 0.9); evbSay("🛏️ The beds are piled with furs and quilts. Under it all, an ice bed is surprisingly cosy: Sweden's Icehotel, rebuilt every winter, sleeps guests on beds of ice with reindeer skins, at -5 °C."); }
var evbFpHall = evbInfo("The Fire Palace", "Fire is a chemical reaction: fuel and oxygen, given enough heat, combine and give off light and heat. Take away any one of the three, fuel, oxygen or heat, and the fire goes out: that's the 'fire triangle' firefighters learn.");
var evbFpThrone = evbInfo("The Lava Throne", "Lava comes out of a volcano at about 700 to 1,200 °C. Runny, dark lava (basalt) makes gentle flows like Hawaii's; sticky, pale lava traps gas and makes explosive eruptions like Mount St Helens in 1980. When lava cools fast it can make black glass: obsidian.");
function evbFpForge() { evbTune([1047, 0, 1047, 0, 1047], 250, 0.4); evbSay("🔨 CLANG, CLANG, CLANG. The fire giants' forge. In the Norse tales Surtr, the fire giant of Muspelheim, waits with a flaming sword for the end of the world."); }
function evbFpCrucible() { evbTune([220, 247], 500, 1.0); evbSay("🫕 The crucible glows white-orange. Iron melts at about 1,538 °C, gold at 1,064 °C, lead at only 327 °C."); }
var evbFpVolcano = evbFact("The Volcano Room", ["There are about 1,350 active volcanoes on land, and many more under the sea.", "The biggest volcano in the solar system is Olympus Mons on Mars, about three times the height of Everest.", "In AD 79 Vesuvius buried the Roman town of Pompeii in ash; it was found again in the 1700s, with its streets, shops and wall paintings."]);
var evbFpSalamander = evbInfo("The Salamander Pools", "In old European stories the salamander lived in fire and was not burned. Real salamanders are little amphibians that like the damp; the legend may come from their hiding in logs, and running out when the log was put on the fire.");
var evbFpObsidian = evbFact("The Obsidian Gallery", ["Obsidian is volcanic glass, cooled so fast no crystals could grow.", "An obsidian edge can be sharper than a steel scalpel; it was used for knives and arrowheads for thousands of years.", "The Aztecs made mirrors of polished obsidian."]);
function evbFpGarden() { evbTune([659, 784], 300, 0.5); evbSay("🌿 Plants that love fire grow here: some pine cones only open in the heat of a forest fire, and fireweed is the first flower to grow back on burned ground."); }
var EVB_PHX = 0;
function evbFpPhoenix() { return __ZC(367, 63, this, arguments, new.target); }
var evbFpWalkers = evbInfo("The Firewalkers' Hall", "People in many places, from Greece and Spain to Fiji, India and Japan, walk barefoot across glowing embers at festivals. It works because wood embers pass heat to the skin quite slowly and the walk is quick. (Never try it yourself.)");
var evbFpAsh = evbFact("The Library of Ash", ["The Great Library of Alexandria did not burn in one night: it faded away over centuries.", "Paper catches fire at about 233 °C. (The book 'Fahrenheit 451' uses the Fahrenheit number.)", "After a fire, ash makes soil rich: farmers have burned fields to plant them for thousands of years."]);
function evbFpLanterns() { evbTune([784, 988], 300, 0.6); evbSay("🏮 You light a paper lantern. At Diwali, the Hindu festival of lights, homes are lit with rows of little oil lamps called diyas."); }
function evbFpKitchen() { evbTune([330, 392], 300, 0.5); evbSay("🍞 Bread bakes in the forge's heat. Cooking with fire may be a million years old; it made food easier to eat and helped our ancestors' brains grow."); }
function evbFpGlass() { evbTune([1175, 1319], 250, 0.6); evbSay("🫙 The glassblower turns a glowing blob on a long pipe and blows it into a bubble. Glassblowing was invented about 2,000 years ago, in the Roman world near Syria."); }
var evbFpFestivals = evbFact("The Gallery of Fire Festivals", ["Up Helly Aa, in Shetland: torches, and a Viking longship burned at the end.", "Diwali: the Hindu, Sikh and Jain festival of lights.", "Bonfire Night, 5 November in Britain, remembers Guy Fawkes' failed plot of 1605.", "Las Fallas in Valencia: giant papier-mâché figures are burned on the last night."]);
function evbFpBath() { evbTune([196, 220], 700, 1.4); evbSay("🐉 The dragon's bath bubbles like hot soup. Real hot springs are heated by magma underground: in Japan, snow monkeys bathe in them in winter."); }
var evbFpSun = evbInfo("The Sun Forge", "The Sun is not on fire: it shines by nuclear fusion, squeezing hydrogen into helium in its core at about 15 million °C. Every second it turns about 4 million tonnes of itself into light.");
function evbFpBeds() { evbTune([262, 330], 500, 1.0); evbSay("🛏️ The fire giants' beds are carved stone, warm all night from the furnace below."); }
function evbFpCool() { evbTune([1047, 880], 400, 0.8); evbSay("🧊 The cooling room: a blast of cold air. Smiths cool hot steel in water or oil (quenching) to make it hard."); }
var evbFpTales = evbFact("The Hall of Fire Tales", ["Prometheus stole fire from the gods and gave it to people, the Greeks said, and was punished for it.", "Pele is the goddess of volcanoes in Hawaiian tradition; her home is the crater of Kīlauea.", "Agni is the Vedic god of fire, the messenger who carries offerings up to the gods.", "In a Cherokee story the tiny Water Spider carried the first fire home in a bowl woven on her back."]);
"use strict";
evbRooms({
cpwinds: { sides: ["evb_windhorn", "evb_cloud", "evb_windhorn", "evb_cloud"], far: ["evb_cloud", "evb_rainbow"], gap: 4, ceil: "chandelier", acts: [[0.35, 0.2, 2.0, "The wind horn", "blow it", evbCpWinds]] },
cprainbow: { sides: ["evb_rainbow", "evb_cloud", "evb_rainbow", "evb_cloud"], acts: [[0.5, 0, 1.8, "The rainbow", "learn why", evbCpRainbow]] },
cpwalk: { far: ["evb_cloud", "espalm", "evb_cloud", "espalm"] },
cpsun: { far: ["grandthrone"], grid: ["evb_cloud", 2, 4, "-u", 0.15, 0.4], sides: ["evb_cloud", "chandelier", "evb_cloud"], mid: [["evb_rainbow", 0.7, 0], ["redrunner", 0.4, 0, "+u"]], ceil: "chandelier",
acts: [[0.55, 0, 2.2, "A cloud seat", "sit on a cloud", evbCpSit], [0.8, 0, 1.8, "The sunrise", "watch it", evbCpSun]] },
cpengine: { mid: [["evb_weather", 0.55, 0]], sides: ["esglobe", "evb_cloud", "estelescope", "evb_cloud"], acts: [[0.4, 0, 1.8, "The weather engine", "turn the dial", evbCpEngine]] },
cprain: { sides: ["evb_cloud", "plant", "evb_cloud", "plant"], mid: [["evb_temizu", 0.55, 0]], acts: [[0.5, 0, 1.8, "The rain", "listen", evbCpRain]] },
cpclouds: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "esreading", "bookshelf", "evb_cloud"], mid: [["wd:kf_table", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The cloud atlas", "read", evbCpClouds]] },
cpkites: { far: ["crates", "workbench"], sides: ["banner", "banner", "banner", "banner"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The kites", "fly one", evbCpKite]] },
cpthunder: { sides: ["evb_cloud", "evb_cloud", "evb_cloud", "evb_cloud"], mid: [["evb_weather", 0.55, 0]], acts: [[0.5, 0, 1.8, "The thunder gods", "read", evbCpThunder]] },
cpsnow: { sides: ["evb_snowflake", "evb_cloud", "evb_snowflake", "evb_cloud"], acts: [[0.5, 0, 1.8, "The snow", "catch a flake", evbCpSnow]] },
cpeagles: { far: ["evb_owl", "evb_owl"], sides: ["evb_owl", "plant", "evb_owl", "plant"], acts: [[0.5, 0, 1.8, "The eagles", "watch them", evbCpEagles]] },
cpballoon: { mid: [["evb_cloud", 0.5, 0]], sides: ["crates", "banner", "crates", "banner"], acts: [[0.5, 0, 1.8, "The first balloon", "read", evbCpBalloon]] },
cpsunroom: { sides: ["sg_kf_loungechair_mustard", "plant", "sg_kf_loungechair_mustard", "plant"], mid: [["evb_cloud", 0.55, 0]], acts: [[0.5, 0, 1.8, "The Sun", "read", evbCpSun]] },
cpmoon: { sides: ["estelescope", "evb_cloud", "esglobe", "evb_cloud"], acts: [[0.5, 0, 1.8, "The Moon", "read", evbCpMoon]] },
cpgarden: { sides: ["evb_flowerbed", "evb_cloud", "evb_flowerbed", "evb_cloud"], mid: [["evb_fountain", 0.55, 0]], corners: "espalm", acts: [[0.4, 0, 1.8, "The cloud garden", "water it", evbCpGarden]] },
cpdew: { far: ["counter", "shelfgoods"], sides: ["counter", "sink", "shelfgoods"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The dew", "bottle some", evbCpDew]] },
cpupper: { sides: ["evb_cloud", "chandelier", "evb_cloud", "chandelier"], ceil: "chandelier" },
cprainbows: { sides: ["evb_rainbow", "evb_rainbow", "evb_rainbow", "evb_rainbow"] },
cpstarwalk: { far: ["estelescope", "evb_cloud", "estelescope", "evb_cloud"] },
cpobserve: { mid: [["estelescope", 0.5, 0], ["esglobe", 0.3, -0.3], ["esglobe", 0.3, 0.3]], far: ["estelescope", "bookshelf", "estelescope"], sides: ["mapchest", "desk", "mapchest", "chair"], grid: ["chair", 1, 4, "+u", 0.75, 0.75],
acts: [[0.45, 0, 2.0, "The great telescope", "look", evbCpObserve]] },
cpbeds: { far: ["evb_bedsky", "evb_bedsky"], sides: ["evb_cloud", "wardrobe", "evb_cloud", "wallmirror"], acts: [[0.5, 0, 1.8, "The cloud beds", "rest", evbCpSit]] },
cpconst: { far: ["evb_moonchart", "evb_moonchart", "evb_moonchart"], sides: ["evb_moonchart", "estelescope", "evb_moonchart", "esglobe"], grid: ["evb_cloud", 2, 2], acts: [[0.5, 0, 1.8, "The constellations", "find one", evbCpConst]] },
cpswing: { grid: ["evb_cloudswing", 1, 3], acts: [[0.5, 0, 1.8, "The cloud swings", "swing", evbCpSwing]] },
cpdream: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "esreading", "bookshelf", "esreading"], grid: ["evb_cloud", 2, 2], acts: [[0.5, 0, 1.8, "The Dream Library", "read", evbCpDream]] }
});
evbRooms({
agdoors: { sides: ["evb_shields", "brazier", "evb_shields", "brazier"], far: ["evb_runestone", "evb_runestone"], gap: 3.6, ceil: "ironchandelier", acts: [[0.35, 0, 2.0, "Valhalla", "read", evbAgDoors]] },
agspears: { sides: ["weaponrack", "brazier", "weaponrack", "brazier", "weaponrack", "armourstand"], ceil: "ironchandelier" },
agshieldwalk: { far: ["evb_shields", "brazier", "evb_shields", "brazier", "evb_shields", "brazier", "evb_shields"] },
agvalhalla: { far: ["evb_highseat"], grid: ["feasttable", 2, 3, "+u", 0.2, 0.6], sides: ["evb_shields", "brazier", "evb_shields", "brazier"], mid: [["firebowl", 0.45, 0]], ceil: "ironchandelier",
acts: [[0.4, 0, 2.4, "The feast", "take a seat", evbAgFeast], [0.85, 0, 1.8, "Odin's high seat", "read", evbAgSeat]] },
agvalkyrie: { far: ["armourstand", "armourstand", "armourstand"], sides: ["weaponrack", "evb_shields", "weaponrack", "armourstand"], acts: [[0.5, 0, 1.8, "The Valkyries", "read", evbAgValkyrie]] },
agsleipnir: { mid: [["evb_sleipnir", 0.55, 0, "+u"]], sides: ["trhay", "trsaddles", "trtrough"], acts: [[0.4, 0, 1.8, "Sleipnir", "stroke his nose", evbAgSleipnir]] },
agurd: { mid: [["evb_urdwell", 0.55, 0]], sides: ["evb_runestone", "plant", "evb_runestone"], acts: [[0.4, 0, 1.8, "The Well of Urd", "drink", evbAgUrd]] },
agtree: { mid: [["evb_yggdrasil", 0.55, 0]], sides: ["boulder", "evb_runestone", "boulder"], acts: [[0.35, 0, 2.0, "Yggdrasil", "look up", evbAgTree]] },
agrunes: { far: ["evb_runestone", "evb_runestone"], sides: ["evb_runestone", "workbench", "evb_runestone"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The runes", "draw a rune", evbAgRunes]] },
agravens: { far: ["evb_owl", "evb_owl"], sides: ["brazier", "evb_owl", "brazier"], acts: [[0.5, 0, 1.8, "The ravens", "call them", evbAgRavens]] },
agskald: { mid: [["evb_horn", 0.5, 0]], sides: ["benchin", "esharp", "benchin", "brazier"], acts: [[0.5, 0, 1.8, "The skalds", "hear a verse", evbAgSkald]] },
agthor: { mid: [["anvil", 0.55, 0]], sides: ["weaponrack", "brazier", "armourstand", "brazier"], acts: [[0.45, 0, 1.8, "Mjölnir", "try to lift it", evbAgThor]] },
agkitchen: { far: ["hearthforge", "oven"], sides: ["butcherblock", "barrel", "counter", "cask"], mid: [["longtable", 0.55, 0]], acts: [[0.5, 0, 1.8, "The feast kitchen", "help", evbAgKitchen]] },
agnine: { mid: [["maptable", 0.5, 0]], sides: ["evb_runestone", "brazier", "evb_runestone", "brazier"], acts: [[0.5, 0, 1.8, "The nine worlds", "read", evbAgNine]] },
agidunn: { sides: ["sg_qn_bushberries1", "espalm", "sg_qn_bushberries2", "espalm"], mid: [["evb_flowerbed", 0.5, 0]], corners: "sg_qn_bush1", acts: [[0.45, 0, 1.8, "Idunn's apples", "pick one", evbAgApple]] },
agfreyja: { far: ["fourposter"], sides: ["wardrobe", "wallmirror", "displaycase", "sofa"], acts: [[0.5, 0, 1.8, "Freyja", "read", evbAgFreyja]] }
});
evbRooms({
iphall: { sides: ["evb_icepillar", "evb_iceswan", "evb_icepillar", "evb_icebear"], far: ["evb_icepillar", "evb_icepillar"], gap: 4, ceil: "evb_icicles", acts: [[0.35, 0, 2.0, "Real ice palaces", "read", evbIpHall]] },
ipfrost: { sides: ["evb_icepillar", "evb_snowflake", "evb_icepillar", "evb_snowflake"], ceil: "evb_icicles" },
ipglacier: { far: ["evb_icepillar", "evb_icepillar", "evb_icepillar", "evb_icepillar"] },
iplake: { mid: [["evb_icerink", 0.5, 0], ["evb_icerink", 0.5, -0.3], ["evb_icerink", 0.5, 0.3]], sides: ["evb_icepillar", "evb_iceswan", "evb_icepillar", "benchin"], ceil: "evb_icicles", acts: [[0.5, 0, 2.4, "The frozen lake", "skate", evbIpSkate]] },
ipflake: { sides: ["evb_snowflake", "evb_snowflake", "evb_snowflake", "evb_snowflake"], mid: [["evb_snowflake", 0.55, 0]], acts: [[0.4, 0, 1.8, "The snowflakes", "look closer", evbIpFlake]] },
ipbears: { mid: [["evb_icebear", 0.55, 0]], sides: ["evb_icebear", "evb_icepillar", "evb_icebear"], acts: [[0.35, 0, 1.8, "The polar bears", "read", evbIpBears]] },
ipsculpt: { far: ["workbench", "evb_iceswan"], sides: ["evb_icepillar", "workbench", "evb_iceswan", "trtoolwall"], acts: [[0.5, 0, 1.8, "Ice carving", "carve", evbIpSculpt]] },
ipigloo: { mid: [["pelt", 0.5, 0]], sides: ["evb_sled", "pelt", "evb_sled"], acts: [[0.5, 0, 1.8, "The igloo", "learn to build one", evbIpIgloo]] },
iplibrary: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "esreading", "bookshelf", "esglobe"], acts: [[0.5, 0, 1.8, "The glacier books", "read", evbIpLibrary]] },
ippenguin: { grid: ["evb_icebear", 1, 1], sides: ["evb_icepillar", "evb_icepillar"], acts: [[0.5, 0, 1.8, "The penguins", "read", evbIpPenguin]] },
ipcocoa: { far: ["stove", "counter"], sides: ["counter", "fridge", "shelfgoods"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "Hot chocolate", "have a mug", evbIpCocoa]] },
ipfurs: { far: ["wardrobe", "wardrobe"], sides: ["dressform", "pelt", "dressform", "wallmirror"], acts: [[0.5, 0, 1.8, "The furs", "try one on", evbIpFurs]] },
ipsled: { grid: ["evb_sled", 2, 2], sides: ["trsaddles", "barrel"], acts: [[0.5, 0, 1.8, "The sleds", "read", evbIpSled]] },
ipwhale: { sides: ["evb_icepillar", "benchin", "evb_icepillar", "benchin"], acts: [[0.5, 0, 1.8, "Whale song", "listen", evbIpWhale]] },
ipcave: { sides: ["crystals", "stalagmite", "crystals", "stalagmite"], mid: [["evb_icepillar", 0.55, 0]], acts: [[0.5, 0, 1.8, "The ice cave", "read", evbIpCave]] },
ipmitten: { far: ["wardrobe", "shelfgoods"], sides: ["shelfgoods", "displaycase", "shelfgoods"], acts: [[0.5, 0, 1.8, "The mittens", "pick a pair", evbIpMitten]] },
ipaurorahall: { sides: ["evb_icepillar", "evb_snowflake", "evb_icepillar", "evb_snowflake"], mid: [["evb_aurora", 0.5, 0]] },
ipstar: { sides: ["estelescope", "evb_icepillar", "estelescope", "evb_icepillar"] },
ipbalcony: { far: ["evb_icepillar", "evb_iceswan", "evb_icepillar", "evb_icebear"] },
ipthrone: { far: ["evb_icethrone"], sides: ["evb_icepillar", "evb_iceswan", "evb_icepillar", "evb_icebear"], grid: ["evb_icepillar", 2, 3, "-u", 0.2, 0.45], mid: [["evb_aurora", 0.5, 0], ["evb_sleigh", 0.65, 0.3]], ceil: "evb_icicles",
acts: [[0.75, 0, 2.0, "The Snow Queen's throne", "read", evbIpThrone]] },
iplights: { mid: [["evb_aurora", 0.5, 0], ["estelescope", 0.6, 0]], sides: ["esglobe", "chair", "evb_icepillar", "chair"], acts: [[0.5, 0, 2.0, "The northern lights", "watch", evbIpLights]] },
ipbeds: { far: ["evb_bedsky", "evb_bedsky", "evb_bedsky"], sides: ["wardrobe", "pelt", "wardrobe", "wallmirror"], acts: [[0.5, 0, 1.8, "The ice beds", "rest", evbIpBed]] },
ipglobe: { mid: [["evb_snowglobe", 0.55, 0]], sides: ["displaycase", "evb_snowglobe", "displaycase"], acts: [[0.45, 0, 1.8, "The snow globe", "shake it", evbIpGlobe]] },
ipwinter: { sides: ["sg_qn_bush1", "evb_icepillar", "sg_qn_bush2", "evb_icepillar"], mid: [["evb_flowerbed", 0.5, 0]], corners: "sg_qn_plant3", acts: [[0.5, 0, 1.8, "The winter garden", "read", evbIpWinter]] }
});
evbRooms({
fphall: { sides: ["evb_obsidian", "firebowl", "evb_obsidian", "firebowl"], far: ["brazier", "brazier"], gap: 4, ceil: "ironchandelier", acts: [[0.35, 0, 2.0, "Fire", "read", evbFpHall]] },
fpobwalk: { sides: ["evb_obsidian", "evb_obsidian", "evb_obsidian", "evb_obsidian"] },
fpember: { far: ["firebowl", "evb_obsidian", "firebowl", "evb_obsidian", "firebowl"] },
fpthrone: { far: ["grandthrone"], mid: [["lavapool", 0.4, 0], ["redrunner", 0.6, 0, "+u"]], grid: ["evb_obsidian", 2, 4, "-u", 0.15, 0.3], sides: ["firebowl", "brazier", "firebowl", "brazier"], ceil: "ironchandelier",
acts: [[0.7, 0, 2.0, "The lava throne", "read", evbFpThrone]] },
fpforge: { far: ["lavaforge", "anvil"], sides: ["weaponrack", "anvil", "armourstand", "trquench"], acts: [[0.5, 0, 1.8, "The giants' forge", "strike the anvil", evbFpForge]] },
fpcrucible: { mid: [["evb_crucible", 0.55, 0]], sides: ["oreheap", "firebowl", "oreheap"], acts: [[0.4, 0, 1.8, "The crucible", "read", evbFpCrucible]] },
fpvolcano: { mid: [["evb_lava", 0.55, 0]], sides: ["boulder", "crystals", "boulder", "maptable"], acts: [[0.4, 0, 1.8, "Volcanoes", "read", evbFpVolcano]] },
fpsalamander: { mid: [["evb_salamander", 0.5, -0.2], ["evb_salamander", 0.6, 0.2]], sides: ["evb_lava", "boulder"], acts: [[0.45, 0, 1.8, "The salamanders", "read", evbFpSalamander]] },
fpobsidian: { far: ["evb_obsidian", "evb_obsidian", "evb_obsidian"], sides: ["displaycase", "evb_obsidian", "displaycase"], acts: [[0.5, 0, 1.8, "Obsidian", "read", evbFpObsidian]] },
fpgarden: { sides: ["sg_qn_cactus1", "firebowl", "sg_qn_cactus2", "firebowl"], mid: [["evb_flowerbed", 0.5, 0]], corners: "sg_qn_cactusflowers2", acts: [[0.5, 0, 1.8, "The ember garden", "read", evbFpGarden]] },
fpphoenix: { mid: [["evb_phoenix", 0.55, 0]], sides: ["firebowl", "goldpile", "firebowl"], acts: [[0.4, 0, 1.8, "The phoenix's egg", "warm it", evbFpPhoenix]] },
fpwalkers: { mid: [["evb_lava", 0.5, 0]], sides: ["firebowl", "benchin", "firebowl", "benchin"], acts: [[0.5, 0, 1.8, "The firewalkers", "read", evbFpWalkers]] },
fpash: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "lectern", "bookshelf", "brazier"], acts: [[0.5, 0, 1.8, "The Library of Ash", "read", evbFpAsh]] },
fplanterns: { sides: ["lantern", "lantern", "lantern", "lantern"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The lanterns", "light one", evbFpLanterns]] },
fpkitchen: { far: ["oven", "hearthforge"], sides: ["counter", "trbreadrack", "butcherblock", "barrel"], mid: [["longtable", 0.55, 0]], acts: [[0.5, 0, 1.8, "The smiths' kitchen", "bake", evbFpKitchen]] },
fpglass: { far: ["trglassfurnace", "trglassbench"], sides: ["displaycase", "workbench", "displaycase"], acts: [[0.5, 0, 1.8, "Glassblowing", "blow a bubble", evbFpGlass]] },
fpupper: { sides: ["evb_obsidian", "firebowl", "evb_obsidian", "firebowl"], ceil: "ironchandelier" },
fpfestivals: { sides: ["lantern", "banner", "lantern", "banner", "lantern", "banner"], acts: [[0.5, 0, 1.8, "Fire festivals", "read", evbFpFestivals]] },
fpsmoke: { far: ["brazier", "evb_obsidian", "brazier", "evb_obsidian"] },
fpbath: { mid: [["evb_lava", 0.5, -0.2], ["evb_lava", 0.5, 0.2], ["evb_obsidian", 0.8, 0]], sides: ["firebowl", "boulder", "firebowl", "boulder"], grid: ["evb_salamander", 1, 3, "-u", 0.2, 0.2],
acts: [[0.4, 0, 2.0, "The dragon's bath", "dip a toe", evbFpBath]] },
fpsunforge: { mid: [["lavaforge", 0.55, 0]], sides: ["anvil", "firebowl", "anvil"], acts: [[0.4, 0, 1.8, "The Sun", "read", evbFpSun]] },
fpbeds: { far: ["fourposter", "fourposter"], sides: ["footchest", "firebowl", "footchest", "wardrobe"], acts: [[0.5, 0, 1.8, "The giants' beds", "rest", evbFpBeds]] },
fpcool: { sides: ["evb_icepillar", "barrel", "evb_icepillar", "barrel"], acts: [[0.5, 0, 1.8, "The cooling room", "cool off", evbFpCool]] },
fptales: { far: ["evb_phoenix", "firebowl"], sides: ["bookshelf", "firebowl", "bookshelf", "lectern"], acts: [[0.5, 0, 1.8, "Fire tales", "read", evbFpTales]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, M = evbM, GILT = evbGilt;
var P = {}, MARI = [0xF08A10, 0xF5A623, 0xE8601A], PAPEL = [0xE8308A, 0x2AA8E0, 0xF5C518, 0x7A3AC8, 0x3AC860, 0xF0602A];
P.evb_ofrenda = function () {
var g = G(), cl = M(0xF4ECDC, "damask"), wd = M(0x7A4A2A, "wood");
for (var i = 0; i < 3; i++)
B(g, cl, 1.8 - i * 0.4, 0.35, 0.9 - i * 0.22, 0, 0.18 + i * 0.35, -i * 0.18);
for (var k = 0; k < 14; k++) {
var a = Math.PI * k / 13;
S(g, M(MARI[k % 3]), 0.09, Math.cos(a) * 0.95, 1.15 + Math.sin(a) * 0.95, -0.3, 8);
}
[-0.6, -0.2, 0.2, 0.6].forEach(function (x, j) {
Cy(g, M(0xF8F0E0), 0.035, 0.035, 0.2, x, 0.46, 0.3, 8);
S(g, evbGlow(0xFFC860, 0.9), 0.035, x, 0.6, 0.3, 6);
B(g, M(0x3A2A20), 0.18, 0.24, 0.03, x * 0.7, 1.0, -0.25);
B(g, M([0xB8A890, 0xA8B8C8, 0xC8B0A0, 0xB0C0A8][j]), 0.14, 0.18, 0.01, x * 0.7, 1.0, -0.23);
});
[-0.35, 0, 0.35].forEach(function (x, j) { S(g, M(0xFFFFFF), 0.07, x, 0.8, 0.08, 10); S(g, M(PAPEL[j]), 0.018, x - 0.025, 0.81, 0.15, 6); S(g, M(PAPEL[j + 2]), 0.018, x + 0.025, 0.81, 0.15, 6); });
S(g, M(0xD89A50), 0.1, -0.5, 0.46, 0.2, 8).scale.set(1, 0.6, 1);
S(g, M(0xD89A50), 0.1, 0.5, 0.46, 0.2, 8).scale.set(1, 0.6, 1);
for (var m = 0; m < 10; m++)
S(g, M(MARI[m % 3]), 0.06, -0.8 + m * 0.18, 0.06, 0.5, 6);
return g;
};
P.evb_marigolds = function () {
var g = G();
Cy(g, M(0xB8643A, "stone"), 0.22, 0.16, 0.4, 0, 0.2, 0, 12);
for (var i = 0; i < 9; i++) {
var a = i * 0.7, r = i < 1 ? 0 : 0.13;
S(g, M(MARI[i % 3]), 0.1, Math.cos(a) * r, 0.48 + (i % 2) * 0.05, Math.sin(a) * r, 8);
}
return g;
};
P.evb_papel = function () {
var g = G(), st = M(0xEEEEEE);
for (var row = 0; row < 2; row++) {
B(g, st, 3.2, 0.01, 0.01, 0, 0.6 - row * 0.2, row * 0.4 - 0.2);
for (var i = 0; i < 10; i++)
B(g, M(PAPEL[(i + row * 3) % 6], null, { op: 0.92 }), 0.24, 0.3, 0.005, -1.45 + i * 0.32, 0.44 - row * 0.2, row * 0.4 - 0.2);
}
return g;
};
P.evb_pinata = function () {
var g = G(), b = M(0xF5C518);
S(g, b, 0.28, 0, 0.5, 0, 10);
Cy(g, M(0xEEEEEE), 0.006, 0.006, 0.5, 0, 1.0, 0, 4);
for (var i = 0; i < 7; i++) {
var a = i * 0.9, x = Math.cos(a), y = Math.sin(a), c = Co(g, M(PAPEL[i % 6]), 0.1, 0.45, x * 0.38, 0.5 + y * 0.38, 0, 8);
c.rotation.z = Math.atan2(y, x) - Math.PI / 2;
}
return g;
};
P.evb_guitar = function () {
var g = G(), wd = M(0xC88A40, "wood"), dk = M(0x3A2418, "wood");
B(g, dk, 0.5, 0.05, 0.3, 0, 0.03, 0);
var bd = S(g, wd, 0.25, 0, 0.55, 0, 12);
bd.scale.set(1, 1.15, 0.35);
S(g, wd, 0.19, 0, 0.92, 0, 12).scale.set(1, 1.1, 0.35);
Cy(g, M(0x1A1210), 0.06, 0.06, 0.03, 0, 0.62, 0.09, 12).rotation.x = Math.PI / 2;
B(g, dk, 0.07, 0.6, 0.04, 0, 1.4, 0);
B(g, dk, 0.11, 0.16, 0.05, 0, 1.76, 0);
return g;
};
P.evb_metate = function () {
var g = G(), st = M(0x6A6460, "stone");
var s = B(g, st, 0.5, 0.12, 0.8, 0, 0.28, 0);
s.rotation.x = 0.12;
[[-0.18, -0.3], [0.18, -0.3], [0, 0.3]].forEach(function (p) { Cy(g, st, 0.05, 0.06, 0.24, p[0], 0.12, p[1], 6); });
Cy(g, st, 0.05, 0.05, 0.5, 0, 0.4, 0.05, 8).rotation.z = Math.PI / 2;
S(g, M(0xF2D060), 0.05, 0.1, 0.38, -0.25, 6);
S(g, M(0xF2D060), 0.05, -0.1, 0.38, -0.2, 6);
return g;
};
P.evb_horno = function () {
var g = G(), ad = M(0xC89A6A, "stone");
B(g, ad, 1.4, 0.4, 1.4, 0, 0.2, 0);
var d = S(g, ad, 0.65, 0, 0.4, 0, 14);
d.scale.set(1, 0.9, 1);
B(g, M(0x1A1210), 0.34, 0.32, 0.05, 0, 0.6, 0.62);
S(g, evbGlow(0xFF8A30, 0.7), 0.1, 0, 0.55, 0.55, 8);
B(g, M(0x8A6A4A, "wood"), 0.5, 0.04, 0.04, 0.3, 0.42, 0.8);
return g;
};
P.evb_pots = function () {
var g = G();
[[0, 0, 0.22, 0xF0E8D8], [0.4, 0.1, 0.16, 0xE8D8C0], [-0.38, 0.08, 0.18, 0xC8763A]].forEach(function (p, i) {
var b = S(g, M(p[3], "stone"), p[2], p[0], p[2], p[1], 12);
b.scale.set(1, 0.9, 1);
Cy(g, M(0x2A1A14), p[2] * 1.0, p[2] * 1.0, 0.035, p[0], p[2] * 1.05, p[1], 12);
Cy(g, M(0x2A1A14), p[2] * 0.92, p[2] * 0.92, 0.03, p[0], p[2] * 0.7, p[1], 12);
Cy(g, M(p[3], "stone"), p[2] * 0.45, p[2] * 0.55, 0.1, p[0], p[2] * 1.75, p[1], 10);
});
return g;
};
P.evb_ladder = function () {
var g = G(), wd = M(0x8A6A48, "wood");
[-0.3, 0.3].forEach(function (x) { var p = Cy(g, wd, 0.04, 0.05, 3.2, x, 1.55, 0, 6); p.rotation.x = -0.18; });
for (var i = 0; i < 7; i++)
Cy(g, wd, 0.025, 0.025, 0.6, 0, 0.3 + i * 0.4, 0.05 - i * 0.07, 6).rotation.z = Math.PI / 2;
return g;
};
P.evb_kivafire = function () {
var g = G(), st = M(0x7A6A5A, "stone");
for (var i = 0; i < 10; i++) {
var a = i * 0.628;
S(g, st, 0.12, Math.cos(a) * 0.5, 0.08, Math.sin(a) * 0.5, 6);
}
S(g, evbGlow(0xFF7A20, 0.85), 0.2, 0, 0.12, 0, 8).scale.set(1.3, 0.6, 1.3);
B(g, st, 0.6, 0.5, 0.1, 0, 0.25, -0.85);
Cy(g, M(0x0A0806), 0.08, 0.08, 0.02, 0, 0.01, 0.9, 10);
return g;
};
P.evb_blanket = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
[-0.7, 0.7].forEach(function (x) { Cy(g, wd, 0.03, 0.03, 1.7, x, 0.85, 0, 6); });
Cy(g, wd, 0.03, 0.03, 1.5, 0, 1.65, 0, 6).rotation.z = Math.PI / 2;
[0xC0392B, 0x1A1A1A, 0xF0E0C0, 0xC0392B, 0x2A6A8A, 0xF0E0C0].forEach(function (c, i) { B(g, M(c, "damask"), 1.3, 0.2, 0.02, 0, 1.45 - i * 0.2, 0); });
return g;
};
P.evb_comal = function () {
var g = G(), ad = M(0xB8845A, "stone");
B(g, ad, 1.2, 0.75, 0.7, 0, 0.38, 0);
Cy(g, M(0x2A2420), 0.32, 0.32, 0.03, -0.2, 0.77, 0, 16);
S(g, evbGlow(0xFF8A30, 0.7), 0.08, -0.2, 0.3, 0.36, 6);
[[-0.25, 0.05], [-0.12, -0.08]].forEach(function (p) { Cy(g, M(0xF0DCA0), 0.1, 0.1, 0.01, p[0], 0.8, p[1], 12); });
Cy(g, M(0x8A4A2A, "stone"), 0.13, 0.11, 0.2, 0.32, 0.85, 0, 10);
return g;
};
P.evb_font = function () {
var g = G(), st = M(0xD8D0C0, "stone");
Cy(g, st, 0.3, 0.36, 0.12, 0, 0.06, 0, 12);
Cy(g, st, 0.14, 0.16, 0.7, 0, 0.45, 0, 10);
Cy(g, st, 0.42, 0.28, 0.25, 0, 0.92, 0, 14);
Cy(g, M(0x8AB8D8, null, { op: 0.8 }), 0.36, 0.36, 0.02, 0, 1.03, 0, 14);
return g;
};
P.evb_glass = function () {
var g = G(), ld = M(0x2A2A30);
B(g, M(0xD8D0C0, "stone"), 1.0, 2.1, 0.12, 0, 1.75, 0);
var top = Cy(g, M(0xD8D0C0, "stone"), 0.5, 0.5, 0.12, 0, 2.8, 0, 16);
top.rotation.x = Math.PI / 2;
var C = [0xC0302A, 0x2A50B8, 0xE8B030, 0x3A9A4A, 0x7A3AA8, 0x2A50B8];
for (var r = 0; r < 3; r++)
for (var c = 0; c < 2; c++)
B(g, evbGlow(C[(r * 2 + c) % 6], 0.85), 0.36, 0.5, 0.02, -0.2 + c * 0.4, 1.2 + r * 0.55, 0.07);
S(g, evbGlow(0xE8B030, 0.85), 0.3, 0, 2.8, 0.06, 12).scale.set(1, 1, 0.05);
B(g, ld, 0.04, 1.7, 0.03, 0, 1.75, 0.08);
return g;
};
P.evb_bellrope = function () {
var g = G(), rp = M(0xD8C8A0);
Cy(g, rp, 0.02, 0.02, 3.2, 0, 1.8, 0, 6);
[0xC0302A, 0xF4ECD8, 0x2A50B8, 0xC0302A].forEach(function (c, i) { Cy(g, M(c, "damask"), 0.06, 0.06, 0.15, 0, 1.3 + i * 0.15, 0, 8); });
return g;
};
P.evb_cross = function () { var g = G(), wd = M(0x5A3A22, "wood"); B(g, wd, 0.14, 1.4, 0.08, 0, 1.9, 0); B(g, wd, 0.8, 0.14, 0.08, 0, 2.2, 0); return g; };
P.evb_canopic = function () {
var g = G(), al = M(0xE8DCC0, "marble");
B(g, M(0x3A2A1A, "wood"), 1.2, 0.12, 0.4, 0, 0.06, 0);
[-0.42, -0.14, 0.14, 0.42].forEach(function (x, i) {
Cy(g, al, 0.1, 0.08, 0.34, x, 0.29, 0, 10);
var h = S(g, M([0xC89A6A, 0x8A7A60, 0x2A2420, 0xA87838][i]), 0.09, x, 0.53, 0, 10);
if (i === 2) {
Co(g, M(0x2A2420), 0.03, 0.12, x - 0.04, 0.66, 0, 4);
Co(g, M(0x2A2420), 0.03, 0.12, x + 0.04, 0.66, 0, 4);
}
if (i === 3)
Co(g, M(0xD8B040), 0.03, 0.06, x, 0.53, 0.1, 4).rotation.x = Math.PI / 2;
});
return g;
};
P.evb_hieros = function () {
var g = G(), wl = M(0xE8D4A8, "stone"), C = [0x2A50B8, 0xC0302A, 0x2A2420, 0x3A8A5A, 0xD8B040];
B(g, wl, 2.0, 2.4, 0.1, 0, 1.3, 0);
for (var c = 0; c < 7; c++)
for (var r = 0; r < 7; r++) {
var k = (c * 3 + r * 5) % 5, x = -0.8 + c * 0.27, y = 0.5 + r * 0.3;
if (k === 0)
S(g, M(C[(c + r) % 5]), 0.06, x, y, 0.06, 6);
else if (k === 1)
B(g, M(C[(c + r) % 5]), 0.12, 0.05, 0.02, x, y, 0.06);
else if (k === 2)
B(g, M(C[(c + r) % 5]), 0.04, 0.15, 0.02, x, y, 0.06);
else
Co(g, M(C[(c + r) % 5]), 0.06, 0.12, x, y, 0.06, 3);
}
B(g, M(0xD8B040), 2.0, 0.06, 0.03, 0, 2.45, 0.06);
B(g, M(0xD8B040), 2.0, 0.06, 0.03, 0, 0.25, 0.06);
return g;
};
P.evb_anubis = function () {
var g = G(), bl = M(0x14100E), gd = GILT();
B(g, gd, 1.3, 0.5, 0.6, 0, 0.25, 0);
B(g, bl, 1.1, 0.3, 0.4, 0, 0.65, -0.05);
S(g, bl, 0.2, 0, 0.85, 0.25, 10);
B(g, bl, 0.12, 0.12, 0.3, 0, 0.82, 0.45);
Co(g, bl, 0.06, 0.25, -0.08, 1.08, 0.22, 4);
Co(g, bl, 0.06, 0.25, 0.08, 1.08, 0.22, 4);
[-0.12, 0.12].forEach(function (x) { B(g, bl, 0.08, 0.08, 0.35, x, 0.55, 0.35); });
B(g, gd, 0.3, 0.06, 0.02, 0, 0.75, 0.32);
return g;
};
P.evb_scales = function () {
var g = G(), gd = GILT();
Cy(g, M(0x3A2A1A, "wood"), 0.3, 0.35, 0.1, 0, 0.05, 0, 12);
Cy(g, gd, 0.04, 0.05, 1.5, 0, 0.8, 0, 8);
B(g, gd, 1.2, 0.04, 0.04, 0, 1.55, 0);
[-0.55, 0.55].forEach(function (x) { Cy(g, gd, 0.005, 0.005, 0.4, x, 1.35, 0, 4); Cy(g, gd, 0.16, 0.12, 0.04, x, 1.15, 0, 12); });
S(g, M(0xA0302A), 0.07, -0.55, 1.22, 0, 8);
var f = B(g, M(0xF4F0E8), 0.04, 0.3, 0.01, 0.55, 1.32, 0);
f.rotation.z = 0.3;
return g;
};
P.evb_sunboat = function () {
var g = G(), wd = M(0xA87838, "wood"), gd = GILT();
B(g, M(0x3A2A1A, "wood"), 2.0, 0.6, 0.5, 0, 0.3, 0);
var h = B(g, wd, 1.8, 0.18, 0.4, 0, 0.75, 0);
[-1, 1].forEach(function (s) { var p = B(g, wd, 0.5, 0.1, 0.25, s * 1.0, 0.92, 0); p.rotation.z = -s * 0.6; });
B(g, gd, 0.5, 0.3, 0.3, 0, 0.99, 0);
S(g, evbGlow(0xFFC040, 0.9), 0.12, 0, 1.3, 0, 10);
var o = Cy(g, wd, 0.02, 0.02, 0.8, -0.75, 1.0, 0.2, 6);
o.rotation.z = 0.6;
return g;
};
P.evb_obelisk = function () {
var g = G(), gr = M(0xC0A890, "stone");
B(g, gr, 0.6, 0.2, 0.6, 0, 0.1, 0);
var s = Cy(g, gr, 0.17, 0.24, 2.2, 0, 1.3, 0, 4);
s.rotation.y = Math.PI / 4;
var t = Co(g, GILT(), 0.17, 0.3, 0, 2.55, 0, 4);
t.rotation.y = Math.PI / 4;
return g;
};
P.evb_coffin = function () {
var g = G(), gd = GILT(), bl = M(0x1E3A8A);
B(g, M(0xC0A890, "stone"), 1.2, 0.5, 2.4, 0, 0.25, 0);
var b = B(g, gd, 0.8, 0.4, 2.0, 0, 0.7, 0);
S(g, gd, 0.32, 0, 0.85, 0.75, 12).scale.set(1, 0.7, 1);
for (var i = 0; i < 5; i++)
B(g, bl, 0.82, 0.02, 0.08, 0, 0.91, -0.6 + i * 0.25);
B(g, bl, 0.5, 0.03, 0.1, 0, 0.92, 0.35).rotation.y = 0.5;
B(g, bl, 0.5, 0.03, 0.1, 0, 0.93, 0.35).rotation.y = -0.5;
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_ofrenda", "evb_horno", "evb_comal", "evb_font", "evb_canopic", "evb_anubis", "evb_scales", "evb_sunboat", "evb_obelisk", "evb_coffin", "evb_kivafire", "evb_metate", "evb_guitar", "evb_blanket"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("pueblo", { corner: "evb_pots", seed: 41, panel: 0xD8B088,
pal: { fab: "terracotta", fab2: "ivory", wood: "oak", metal: "copper", stone: "sandstone", art: 5, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE0B890, "plaster"], "D8D0C0|coffer": [0xA88058, "coffer"] },
hello: "🏜️ <b>Inside the pueblo.</b> An adobe house of the kind the Ancestral Puebloans built a thousand years ago at Chaco Canyon and Mesa Verde, room on room. Climb down into the kiva, grind corn, shape a pot. Look for the ✨ cards. The way out is the front door." });
evbHouse("pueblo", { g: EVB_GRID.mid, h: 3.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The pueblo"], wall: 0xE0B890, trim: 0x8A5A3A,
plan: [{ hall: { k: "puplaza", n: "The Plaza Room" }, spine: { k: "puwalk", n: "The Long Room" }, gallery: { k: "puroof", n: "The Roof Terrace" },
back: { merge: EVB_BACK, k: "pukiva", n: "The Great Kiva" },
r1i: { k: "pugrind", n: "The Grinding Room" }, r1o: { k: "pupots", n: "The Potters' Room" },
r2i: { k: "puweave", n: "The Weavers' Room" }, r2o: { k: "pustore", n: "The Corn Store" },
r3i: { k: "puoven", n: "The Bread Oven" }, r3o: { k: "pufamily", n: "The Family Room" },
l1i: { k: "pustars", n: "The Sun Watcher's Room" }, l1o: { k: "puturkey", n: "The Turkey Pen" },
l2i: { k: "pujewel", n: "The Turquoise Room" }, l2o: { k: "pubaskets", n: "The Basket Room" },
l3i: { k: "pukids", n: "The Children's Room" }, l3o: { k: "pustory", n: "The Storyteller's Room" } }] });
evbTheme("hacienda", { corner: "evb_marigolds", seed: 43, panel: 0xF0D8B0,
pal: { fab: "terracotta", fab2: "mustard", wood: "walnut", metal: "iron", stone: "sandstone", art: 5, rug: 6, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF4E0C0, "plaster"], "D8D0C0|coffer": [0x8A5A3A, "coffer"] },
hello: "🌼 <b>Inside the hacienda,</b> dressed for the Day of the Dead, when the dead come home for a night. The great ofrenda is in the sala at the back; follow the marigolds. Look for the ✨ cards. The way out is the front gate." });
evbHouse("hacienda", { g: EVB_GRID.wide, h: 4.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The hacienda"], wall: 0xF4E0C0, trim: 0x2A7A8A,
plan: [{ hall: { k: "hazaguan", n: "The Zaguán, the Gate Hall" }, spine: { k: "hapatio", n: "The Patio and its Fountain" }, gallery: { k: "haarcade", n: "The Arcade" },
back: { merge: EVB_BACK, k: "hasala", n: "The Sala of the Great Ofrenda" },
r1i: { k: "hakitchen", n: "The Kitchen" }, r1o: { k: "habread", n: "The Bakery of Pan de Muerto" },
r2i: { k: "hapapel", n: "The Paper-Cutters' Workshop" }, r2o: { k: "haskulls", n: "The Sugar Skull Room" },
r3i: { k: "hamusic", n: "The Musicians' Room" }, r3o: { k: "hagarden", n: "The Marigold Garden" },
l1i: { k: "hachapel", n: "The Family Chapel" }, l1o: { k: "hastable", n: "The Stables" },
l2i: { k: "haportraits", n: "The Portrait Room" }, l2o: { k: "hacatrina", n: "La Catrina's Dressing Room" },
l3i: { k: "habed", n: "The Grandmother's Room" }, l3o: { k: "hapinata", n: "The Piñata Room" } }] });
evbTheme("chapel", { corner: "candles", seed: 45, panel: 0xEDE6D6,
pal: { fab: "crimson", fab2: "ivory", wood: "oak", metal: "brass", stone: "stone", art: 2, rug: 1, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF2EDE2, "plaster"], "D8D0C0|coffer": [0x6A4A2A, "coffer"] },
hello: "⛪ <b>Inside the little church.</b> A village church of the Land of the Dead, where the bell is rung on the Day of the Dead to call the souls home. Ring it, light a candle, read the stones. Look for the ✨ cards. The way out is the porch." });
evbHouse("chapel", { g: EVB_GRID.mid, h: 5.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The church"], wall: 0xF2EDE2, trim: 0x6A4A2A,
plan: [{ hall: { k: "chporch", n: "The Porch" }, spine: { k: "chnave", n: "The Nave" }, gallery: { k: "chaisle", n: "The Side Aisle" },
back: { merge: EVB_BACK, k: "chaltar", n: "The Chancel and the Altar" },
r1i: { k: "chbell", n: "The Bell Tower Room" }, r1o: { k: "chfont", n: "The Baptistry" },
r2i: { k: "chcandle", n: "The Candle Chapel" }, r2o: { k: "chglass", n: "The Window Room" },
r3i: { k: "chvestry", n: "The Vestry" }, r3o: { k: "chchoir", n: "The Choir Room" },
l1i: { k: "chschool", n: "The Schoolroom" }, l1o: { k: "chregister", n: "The Register Room" },
l2i: { k: "chgrave", n: "The Graveyard Gate" }, l2o: { k: "chflowers", n: "The Flower Room" },
l3i: { k: "chpriest", n: "The Priest's Study" }, l3o: { k: "chhall", n: "The Parish Hall" } }] });
evbTheme("pyramid", { corner: "evb_obelisk", seed: 47, panel: 0xD8C098,
pal: { fab: "mustard", fab2: "teal", wood: "walnut", metal: "gold", stone: "sandstone", art: 3, rug: 7, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE0C8A0, "plaster"], "D8D0C0|coffer": [0x2A3A6A, "coffer"] },
hello: "🔺 <b>Inside the pyramid.</b> A pharaoh's pyramid of the kind built at Giza about 4,500 years ago: up the Grand Gallery to the King's Chamber, and on through the rooms of the embalmers, the scribes and the treasury. Look for the ✨ cards. The way out is the entrance passage." });
evbHouse("pyramid", { g: EVB_GRID.temple, h: 5.6, levels: 1, stairX: 4, stairZ: 12, floors: ["The pyramid"], wall: 0xE0C8A0, trim: 0xD8B040,
plan: [{ hall: { k: "pyentry", n: "The Entrance Passage" }, spine: { k: "pygallery", n: "The Grand Gallery" }, gallery: { k: "pyfalse", n: "The False Passage" },
back: { merge: EVB_BACK, k: "pyking", n: "The King's Chamber" },
r1i: { k: "pyqueen", n: "The Queen's Chamber" }, r1o: { k: "pytreasury", n: "The Treasury" },
r2i: { k: "pyembalm", n: "The Embalmers' Room" }, r2o: { k: "pycanopic", n: "The Room of the Canopic Jars" },
r3i: { k: "pyscribe", n: "The Scribes' Room" }, r3o: { k: "pyboat", n: "The Sun Boat Room" },
l1i: { k: "pyjudge", n: "The Hall of Judgement" }, l1o: { k: "pygods", n: "The Hall of the Gods" },
l2i: { k: "pybuilders", n: "The Builders' Room" }, l2o: { k: "pystars", n: "The Star Shafts" },
l3i: { k: "pygames", n: "The Game Room (Senet)" }, l3o: { k: "pyfood", n: "The Room of Offerings" } }] });
evbFins({
puplaza: ["stone", 0xB89068, 0xE0B890, "plaster", 0x8A5A3A], puwalk: ["stone", 0xB08860, 0xDCB48C, "plaster", 0x8A5A3A], puroof: ["stone", 0xC09870, 0xE4C098, "plaster", 0x8A5A3A],
pukiva: ["stone", 0x9A7A5A, 0xC8A078, "stone", 0x6A4A2A, "coffer"], pugrind: ["stone", 0xA88460, 0xE0B890, "plaster", 0x8A5A3A], pupots: ["stone", 0xA88460, 0xF0E0C8, "plaster", 0x2A1A14],
puweave: ["stone", 0xA88460, 0xE0B890, "plaster", 0xC0392B], pustore: ["stone", 0x9A7A5A, 0xD0A880, "plaster", 0x8A5A3A], puoven: ["stone", 0x9A7A5A, 0xD8A878, "plaster", 0x6A4A2A],
pufamily: ["carpet", 0xA8483A, 0xE0B890, "plaster", 0x8A5A3A], pustars: ["stone", 0xA88460, 0x2A3A6A, "plaster", 0xE8C860], puturkey: ["stone", 0x9A7A5A, 0xD0A880, "plaster", 0x8A5A3A],
pujewel: ["stone", 0xA88460, 0x3AA8A8, "plaster", 0xE8D8B0], pubaskets: ["stone", 0xA88460, 0xE8C898, "plaster", 0x8A5A3A], pukids: ["carpet", 0x3AA8A8, 0xF0D8B0, "plaster", 0xC0392B],
pustory: ["carpet", 0xC0392B, 0xE0B890, "plaster", 0x8A5A3A],
hazaguan: ["tile", 0xB8643A, 0xF4E0C0, "plaster", 0x2A7A8A], hapatio: ["tile", 0xC8743A, 0xF8E8C8, "plaster", 0x2A7A8A], haarcade: ["tile", 0xB8643A, 0xF0D8B0, "plaster", 0x2A7A8A],
hasala: ["tile", 0xA8543A, 0xE8608A, "plaster", 0xF5C518, "coffer"], hakitchen: ["tile", 0xC8743A, 0xF0D040, "plaster", 0x2A7A8A], habread: ["tile", 0xB8643A, 0xF4E0C0, "plaster", 0x8A5A3A],
hapapel: ["wood", 0x9A7A58, 0x7A3AC8, "plaster", 0xF5C518], haskulls: ["tile", 0xC8743A, 0x2AA8E0, "plaster", 0xE8308A], hamusic: ["wood", 0x8A5A3A, 0xC0392B, "plaster", 0xD8B040],
hagarden: ["stone", 0x9A8A6A, 0xF8E8C8, "plaster", 0xF08A10], hachapel: ["tile", 0xA8543A, 0xF2EDE2, "plaster", 0xD8B040], hastable: ["stone", 0x8A7A5A, 0xE0C8A0, "plaster", 0x6A4A2A],
haportraits: ["wood", 0x7A5A3A, 0x2A6A5A, "plaster", 0xD8B040], hacatrina: ["carpet", 0x7A3AC8, 0xF0C8D8, "plaster", 0xD8B040], habed: ["carpet", 0xA8483A, 0xF4E0C0, "plaster", 0x2A7A8A],
hapinata: ["tile", 0xC8743A, 0x3AC860, "plaster", 0xF5C518],
chporch: ["stone", 0xB0A898, 0xE8E0D2, "stone", 0x6A4A2A], chnave: ["stone", 0xA8A090, 0xF2EDE2, "plaster", 0x6A4A2A], chaisle: ["stone", 0xA8A090, 0xEDE6D6, "plaster", 0x6A4A2A],
chaltar: ["marble", 0xD8D0C0, 0xF2EDE2, "plaster", 0xD8B040, "coffer"], chbell: ["wood", 0x8A6A4A, 0xD8D0C0, "stone", 0x6A4A2A], chfont: ["stone", 0xB0A898, 0xE8F0F4, "plaster", 0x6A4A2A],
chcandle: ["stone", 0xA8A090, 0xF0E0C0, "plaster", 0xD8B040], chglass: ["stone", 0xA8A090, 0xEDE6D6, "plaster", 0x2A50B8], chvestry: ["wood", 0x8A6A4A, 0xE8E0D2, "plaster", 0x7A1E24],
chchoir: ["wood", 0x8A6A4A, 0xEDE6D6, "plaster", 0x6A4A2A], chschool: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0x2A50B8], chregister: ["wood", 0x8A6A4A, 0xE8E0D2, "plaster", 0x6A4A2A],
chgrave: ["stone", 0x8A8478, 0xC8C8C0, "stone", 0x5A5A50], chflowers: ["stone", 0xA8A090, 0xF0F4E8, "plaster", 0x3A8A3A], chpriest: ["wood", 0x7A5A3A, 0xE8E0D2, "plaster", 0x6A4A2A],
chhall: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0x6A4A2A],
pyentry: ["stone", 0xC0A880, 0xD8C098, "stone", 0xA87838], pygallery: ["stone", 0xB8A078, 0xD0B890, "stone", 0xD8B040], pyfalse: ["stone", 0xA89070, 0xC8B088, "stone", 0x8A7A5A],
pyking: ["stone", 0x8A7A6A, 0x5A4A40, "stone", 0xD8B040, "coffer"], pyqueen: ["stone", 0xB8A078, 0xE0C8A0, "stone", 0xD8B040], pytreasury: ["stone", 0xB8A078, 0x1E3A8A, "plaster", 0xD8B040],
pyembalm: ["stone", 0xA89070, 0xE0D4B0, "plaster", 0x3A8A5A], pycanopic: ["stone", 0xB8A078, 0xE0C8A0, "plaster", 0x2A50B8], pyscribe: ["stone", 0xB8A078, 0xE8D4A8, "plaster", 0xC0302A],
pyboat: ["stone", 0xB8A078, 0x2A50B8, "plaster", 0xD8B040], pyjudge: ["stone", 0xA89070, 0xE8D4A8, "plaster", 0x14100E], pygods: ["stone", 0xB8A078, 0xE0C8A0, "plaster", 0xD8B040],
pybuilders: ["stone", 0xA89070, 0xD8C098, "stone", 0x8A7A5A], pystars: ["stone", 0x8A7A6A, 0x1A2048, "plaster", 0xE8D860], pygames: ["stone", 0xB8A078, 0xE8D4A8, "plaster", 0x2A50B8],
pyfood: ["stone", 0xB8A078, 0xE8D4A8, "plaster", 0x3A8A5A]
});
EVB_LD.pueblo = { theme: "pueblo", name: "The Pueblo", doors: "the low door" };
EVB_LD.hacienda = { theme: "hacienda", name: "The Hacienda", doors: "the great gate" };
EVB_LD.chapel = { theme: "chapel", name: "The Little Church", doors: "the church door" };
EVB_LD.pyramid = { theme: "pyramid", name: "The Pyramid", doors: "the entrance passage" };
"use strict";
function evbPuKiva() { return __ZC(367, 64, this, arguments, new.target); }
function evbPuGrind() { evbTune([262, 262, 294], 300, 0.5); evbSay("🌽 You kneel at the metate and push the mano up and down the stone. Grinding enough corn for a family's day took hours; the women of the pueblo often ground together in a row of metates, and sang to keep time."); }
var evbPuPots = evbFact("The Potters' Room", ["Pueblo pots are not made on a wheel: they are built up from coils of clay, smoothed and painted, then fired outdoors.", "The black paint on Mesa Verde pots was often made from boiled plants such as Rocky Mountain bee plant.", "María Martinez of San Ildefonso Pueblo (1887 to 1980) made famous shining black-on-black pots, and taught the way to her whole village."]);
var evbPuWeave = evbInfo("The Weavers' Room", "The Pueblo people grew cotton and wove it on upright looms, often in the kivas, and in many pueblos it was the men who wove. Blankets, belts and sashes were traded far: shells from the Pacific coast and macaw feathers from Mexico have been found at Chaco Canyon.");
var evbPuStore = evbInfo("The Corn Store", "The 'three sisters' grown in the fields were corn, beans and squash, planted together: the corn is a pole for the beans to climb, the beans feed the soil, and the squash's broad leaves keep the ground damp and the weeds down. Corn was dried and stored in sealed rooms for the lean years.");
function evbPuOven() { evbTune([330, 392], 300, 0.6); evbSay("🍞 You slide a loaf into the horno. These beehive ovens came to the pueblos with the Spanish in the 1600s; a fire is lit inside, raked out, and the bread bakes in the heat left in the clay."); }
var evbPuFamily = evbInfo("The Family Room", "A pueblo grew like a honeycomb: when a family needed another room, they built it onto the side or on top. Pueblo Bonito in Chaco Canyon had about 650 rooms and stood four or five storeys high. Taos Pueblo in New Mexico has been lived in for about 1,000 years and people still live there today.");
var evbPuStars = evbInfo("The Sun Watcher", "The sun watcher marked the days by where the sun rose on the skyline. When it reached a certain notch in the hills, it was time to plant, or to hold a ceremony. On Fajada Butte in Chaco Canyon, a spiral carved in the rock is crossed by a 'dagger' of sunlight at midsummer.");
function evbPuTurkey() { evbTune([392, 349, 392], 200, 0.4); evbSay("🦃 Gobble. The Pueblo people kept turkeys, mainly for their feathers, which they wove into warm blankets: one blanket could take a few thousand feathers."); }
var evbPuJewel = evbInfo("The Turquoise Room", "Turquoise was precious to the people of Chaco: tens of thousands of turquoise beads and pieces have been found there. In one room of Pueblo Bonito a man was buried with about 56,000 pieces of turquoise.");
var evbPuBaskets = evbFact("The Basket Room", ["Before pots, there were baskets: the early people of the Four Corners are called 'Basketmakers' by archaeologists.", "Some baskets were woven so tightly they could hold water.", "Hot stones dropped into a watertight basket could cook a stew."]);
function evbPuKids() { evbTune([523, 587, 659], 200, 0.5); evbSay("🪆 A carved figure sits on the shelf. In Hopi custom, kachina dolls are given to children to teach them about the kachina spirits."); }
var evbPuStory = evbInfo("The Storyteller", "Winter was the time for stories, told by the old to the young around the fire. Helen Cordero of Cochiti Pueblo made the first 'storyteller' clay figure in 1964: her grandfather, with children climbing all over him to listen.");
function evbHaOfrenda() { return __ZC(367, 65, this, arguments, new.target); }
function evbHaFountain() { evbTune([659, 784, 659], 300, 0.5); evbSay("⛲ Water splashes in the tiled fountain. Haciendas were built round a patio like this, to keep the house cool in the heat of the day."); }
var evbHaZaguan = evbInfo("The hacienda", "A hacienda was a great estate of New Spain (Mexico), with its big house, chapel, workshops, stables and fields, and the families who worked them. Some were as big as a small country. Many are now hotels, museums or ruins.");
function evbHaKitchen() { return __ZC(367, 66, this, arguments, new.target); }
function evbHaBread() { evbTune([523, 659], 300, 0.6); evbSay("🍞 Pan de muerto, 'bread of the dead': a round sweet loaf scented with orange blossom, with strips of dough on top shaped like bones, and a little ball for a skull."); }
function evbHaPapel() { evbTune([784, 880, 988], 180, 0.4); evbSay("✂️ You fold tissue paper and cut a pattern: papel picado. Craftsmen in San Salvador Huixcolotla, in Puebla, cut up to fifty sheets at once with a hammer and chisels."); }
function evbHaSkull() { evbTune([659, 784, 988], 220, 0.5); evbSay("💀 You decorate a sugar skull with coloured icing and write a name on its forehead. They are calaveras de azúcar: sweet, smiling, and not at all frightening."); }
function evbHaMusic() { return __ZC(367, 67, this, arguments, new.target); }
var evbHaGarden = evbInfo("The marigolds", "The cempasúchil, the Mexican marigold, was grown by the Aztecs, who used it in medicine and offerings. On the Day of the Dead its petals are scattered in a path from the door to the ofrenda, so the souls can find their way.");
var evbHaChapel = evbInfo("The family chapel", "On the night of the 1st of November many families go to the graveyard, clean and decorate the graves with marigolds and candles, and stay up through the night with music and food, keeping their dead company.");
function evbHaStable() { evbTune([262, 330, 262], 300, 0.5); evbSay("🐴 A horse puts its head over the stall door. The charros, the horsemen of the haciendas, gave the world the sport of charrería, Mexico's national sport."); }
var evbHaPortraits = evbInfo("The Portrait Room", "The 1st of November is the Day of the Little Angels, for children who have died; the 2nd is for grown-ups. Photographs on the ofrenda show the faces the family is remembering.");
var evbHaCatrina = evbInfo("La Catrina", "La Calavera Catrina, the elegant skeleton lady in a great feathered hat, was first drawn by the printmaker José Guadalupe Posada around 1910, to tease people who put on airs. The painter Diego Rivera gave her a whole dress and her name in a mural of 1947. Now people dress as her for the Day of the Dead.");
function evbHaBed() { evbTune([392, 330, 262], 500, 1.2); evbSay("🛏️ A patchwork quilt on Grandmother's bed, and her rosary on the post. Her photograph will be on the ofrenda tonight."); }
function evbHaPinata() { return __ZC(367, 68, this, arguments, new.target); }
function evbChBell() { evbTune([392, 330, 392, 330], 700, 2.0); evbSay("🔔 You pull the rope and the bell swings: dong... dong... In many towns the church bells are rung on the night of the 1st of November to call the souls home."); }
var evbChFont = evbInfo("The font", "The font holds the water for baptisms, and stands near the door because baptism is how a person enters the church. Old fonts are often the oldest thing in a village church; some in England are nearly a thousand years old.");
function evbChCandle() { evbTune([659, 784], 400, 1.0); evbSay("🕯️ You light a candle for someone and set it among the others. The flames are steady and warm."); }
var evbChGlass = evbInfo("Stained glass", "Stained glass is coloured by metals melted into the glass: copper for green or red, cobalt for blue, gold for ruby pink. The pieces are held together by strips of lead. It was a way of telling stories to people who couldn't read.");
var evbChVestry = evbInfo("The vestry", "The vestry is where the priest keeps the vestments (the robes for services) and the church plate. The colours change with the seasons of the year: purple, white, green, red, and black or purple for the Day of the Dead and funerals.");
function evbChChoir() { evbTune([262, 330, 392, 523, 392, 330, 262], 380, 1.2); evbSay("🎶 The choir practises. Plainchant, sung in unison, is over a thousand years old."); }
var evbChSchool = evbInfo("The schoolroom", "In many villages the first school was in or beside the church, and the priest or a parish clerk taught the children to read and write.");
var evbChRegister = evbInfo("The parish register", "Every baptism, marriage and burial is written down here. In England parish registers were ordered in 1538, which is why family historians can trace some families back nearly 500 years.");
var evbChGrave = evbFact("The graveyard gate", ["A roofed gate into a churchyard is a lychgate: the coffin rested under its roof before the burial. 'Lych' is an old word for a body.", "Yew trees grow in many old English churchyards; some are thought to be over 2,000 years old.", "On the Day of the Dead graveyards in Mexico are full of light, music and marigolds all night."]);
function evbChFlowers() { evbTune([523, 659, 784], 250, 0.6); evbSay("💐 You arrange flowers for the altar: white lilies, and marigolds for the Day of the Dead."); }
var evbChPriest = evbInfo("The priest's study", "Sermons, letters, the year's calendar of saints' days. The 1st of November is All Saints' Day and the 2nd is All Souls' Day; the Day of the Dead grew from these days and much older Aztec festivals for the dead.");
function evbChHall() { evbTune([392, 440, 494, 523], 250, 0.6); evbSay("🫖 Tea, cake and a raffle. The parish hall is where the village meets."); }
var evbChAltar = evbInfo("The altar", "The chancel at the east end holds the altar. Most old churches face east, towards the rising sun, and Jerusalem.");
var evbPyEntry = evbInfo("The pyramid", "The Great Pyramid at Giza was built for the pharaoh Khufu about 4,500 years ago. It was the tallest building in the world for nearly 4,000 years, at about 146 m, and is made of around 2.3 million blocks of stone. It is the only one of the Seven Wonders of the Ancient World still standing.");
var evbPyGallery = evbInfo("The Grand Gallery", "The Grand Gallery in the Great Pyramid is a sloping corridor about 47 m long and 8.6 m high, with a roof of overlapping stones. Nobody is quite sure why it was built so tall.");
function evbPyKing() { return __ZC(367, 69, this, arguments, new.target); }
var evbPyQueen = evbInfo("The Queen's Chamber", "It was named by Arab explorers, but no queen was ever buried here; nobody knows what it was for. Two narrow shafts run from it into the stone. In 1993 a little robot crawled up one and found it blocked by a tiny door with two copper handles.");
var evbPyTreasury = evbInfo("The treasure of a pharaoh", "Only one pharaoh's tomb has been found nearly whole: Tutankhamun's, in the Valley of the Kings, found by Howard Carter in 1922. It held over 5,000 objects, among them his gold mask, chariots, beds, games, and his underwear.");
var evbPyEmbalm = evbInfo("The embalmers", "Making a mummy took about 70 days. The body was dried with natron, a kind of salt, then wrapped in hundreds of metres of linen, with charms tucked in among the bandages. The heart was left inside: it would be needed in the next world.");
var evbPyCanopic = evbInfo("The canopic jars", "The organs were kept in four jars, each guarded by a son of the god Horus: Imsety (a man) for the liver, Hapy (a baboon) for the lungs, Duamutef (a jackal) for the stomach and Qebehsenuef (a falcon) for the intestines.");
function evbPyScribe() { return __ZC(367, 70, this, arguments, new.target); }
var evbPyBoat = evbInfo("The sun boat", "The Egyptians believed the sun god Ra sailed across the sky in a boat by day and through the underworld by night. A real boat, 43 m long, was found buried in pieces beside the Great Pyramid in 1954, and put back together.");
function evbPyJudge() { return __ZC(367, 71, this, arguments, new.target); }
var evbPyGods = evbFact("The Hall of the Gods", ["Ra, the sun, with a falcon's head and the sun's disc.", "Osiris, green-skinned king of the dead, who was killed and brought back to life.", "Isis, his wife, the great magician and mother.", "Thoth, with the head of an ibis, the god of writing and wisdom.", "Bastet, the cat goddess, who protected homes."]);
var evbPyBuilders = evbInfo("Who built the pyramids", "Not slaves: the pyramids were built by paid teams of workers, perhaps 20,000 of them, who lived in a town nearby. Their graves have been found, and their bread ovens. The blocks were dragged on sledges, and a painting shows a man pouring water on the sand in front of a sledge to make it slide.");
var evbPyStars = evbInfo("The star shafts", "The narrow shafts from the King's Chamber point at the sky. When the pyramid was built, one pointed at the stars of Orion's belt, which the Egyptians linked to Osiris; another at Thuban, which was then the pole star.");
function evbPyGame() { return __ZC(367, 72, this, arguments, new.target); }
var evbPyFood = evbInfo("The room of offerings", "Bread, beer, figs, dates, ducks and cakes: food was left for the dead person's ka, their life force. Lists of food were painted on the walls too, so that if the real food ran out, the pictures could take its place.");
var evbPyFalse = evbInfo("The false passage", "Pyramid builders blocked the passages with huge granite plugs to keep robbers out. Robbers dug round them. A tunnel dug by robbers (or by the caliph al-Ma'mun's men, around the year 820) is still the way tourists go in to the Great Pyramid.");
"use strict";
evbRooms({
puplaza: { sides: ["evb_pots", "evb_ladder", "evb_pots", "evb_blanket"], far: ["evb_horno"], gap: 3, acts: [[0.35, 0, 2.0, "Pueblo houses", "read", evbPuFamily]] },
puwalk: { sides: ["evb_pots", "pelt", "evb_blanket", "evb_pots"] },
puroof: { far: ["evb_ladder", "evb_pots", "evb_ladder", "evb_pots"] },
pukiva: { mid: [["evb_kivafire", 0.5, 0], ["evb_ladder", 0.5, 0.25]], sides: ["benchin", "benchin", "benchin", "benchin"], far: ["evb_blanket", "loom"], ceil: "lantern",
acts: [[0.45, 0, 2.4, "The Great Kiva", "climb down", evbPuKiva]] },
pugrind: { grid: ["evb_metate", 1, 3, "-u", 0.6, 0.6], sides: ["evb_pots", "evb_pots", "evb_pots"], acts: [[0.5, 0, 1.8, "The metate", "grind corn", evbPuGrind]] },
pupots: { far: ["potterswheel", "evb_pots"], sides: ["evb_pots", "shelfgoods", "evb_pots", "workbench"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The pots", "look closer", evbPuPots]] },
puweave: { mid: [["loom", 0.5, 0]], sides: ["evb_blanket", "loom", "evb_blanket"], acts: [[0.45, 0, 1.8, "The loom", "read", evbPuWeave]] },
pustore: { grid: ["evb_pots", 2, 2], sides: ["crates", "barrel", "crates", "barrel"], acts: [[0.5, 0, 1.8, "The corn store", "read", evbPuStore]] },
puoven: { mid: [["evb_horno", 0.55, 0]], sides: ["evb_pots", "counter", "evb_pots"], acts: [[0.4, 0, 1.8, "The horno", "bake bread", evbPuOven]] },
pufamily: { sides: ["pelt", "evb_pots", "pelt", "evb_blanket"], mid: [["evb_kivafire", 0.5, 0]], acts: [[0.5, 0, 1.8, "The family room", "read", evbPuFamily]] },
pustars: { far: ["estelescope"], sides: ["evb_pots", "maptable", "evb_pots"], acts: [[0.5, 0, 1.8, "The sun watcher", "read", evbPuStars]] },
puturkey: { sides: ["cage", "pelt", "cage", "crates"], acts: [[0.5, 0, 1.8, "The turkeys", "listen", evbPuTurkey]] },
pujewel: { far: ["displaycase", "displaycase"], sides: ["displaycase", "evb_pots", "displaycase"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The turquoise", "read", evbPuJewel]] },
pubaskets: { sides: ["evb_blanket", "shelfgoods", "evb_pots", "shelfgoods"], grid: ["evb_pots", 2, 2], acts: [[0.5, 0, 1.8, "The baskets", "read", evbPuBaskets]] },
pukids: { sides: ["cot", "toys", "cot", "pelt"], mid: [["toys", 0.5, 0]], acts: [[0.5, 0, 1.8, "The carved figure", "look", evbPuKids]] },
pustory: { mid: [["evb_kivafire", 0.55, 0]], sides: ["pelt", "evb_blanket", "pelt", "evb_pots"], grid: ["pelt", 1, 3, "-u", 0.3, 0.3], acts: [[0.45, 0, 1.8, "The storyteller", "listen", evbPuStory]] }
});
evbRooms({
hazaguan: { sides: ["evb_marigolds", "lantern", "evb_marigolds", "lantern"], far: ["evb_marigolds", "evb_marigolds"], gap: 3.6, ceil: "evb_papel", acts: [[0.35, 0, 2.0, "The hacienda", "read", evbHaZaguan]] },
hapatio: { mid: [["ghrfountain", 0.5, 0]], sides: ["evb_marigolds", "sg_qn_cactus1", "evb_marigolds", "sg_qn_cactus2"], ceil: "evb_papel", acts: [[0.4, 0, 2.0, "The fountain", "listen", evbHaFountain]] },
haarcade: { far: ["evb_marigolds", "lantern", "evb_marigolds", "lantern", "evb_marigolds"] },
hasala: { far: ["evb_ofrenda"], grid: ["evb_marigolds", 2, 6, "-u", 0.2, 0.55], sides: ["evb_marigolds", "candles", "evb_guitar", "candles", "evb_marigolds"], mid: [["redrunner", 0.45, 0, "+u"]], ceil: "evb_papel",
acts: [[0.8, 0, 2.4, "The great ofrenda", "look", evbHaOfrenda]] },
hakitchen: { far: ["evb_comal", "stove"], sides: ["counter", "shelfgoods", "counter", "evb_pots"], mid: [["longtable", 0.55, 0]], acts: [[0.5, 0, 1.8, "The comal", "cook", evbHaKitchen]] },
habread: { mid: [["evb_horno", 0.55, 0]], sides: ["trbreadrack", "counter", "trbreadrack"], acts: [[0.4, 0, 1.8, "Pan de muerto", "bake", evbHaBread]] },
hapapel: { mid: [["workbench", 0.5, 0]], sides: ["workbench", "evb_marigolds", "workbench"], ceil: "evb_papel", acts: [[0.5, 0, 1.8, "Papel picado", "cut a pattern", evbHaPapel]] },
haskulls: { mid: [["longtable", 0.5, 0]], sides: ["displaycase", "evb_marigolds", "displaycase"], ceil: "evb_papel", acts: [[0.5, 0, 1.8, "The sugar skulls", "decorate one", evbHaSkull]] },
hamusic: { grid: ["evb_guitar", 1, 3, "-u", 0.6, 0.6], sides: ["chair", "evb_marigolds", "chair", "piano"], ceil: "evb_papel", acts: [[0.45, 0, 1.8, "The mariachi", "hear them play", evbHaMusic]] },
hagarden: { grid: ["evb_marigolds", 3, 3], sides: ["sg_qn_cactus1", "evb_marigolds", "sg_qn_cactus2", "evb_marigolds"], corners: "sg_qn_cactusflowers2", acts: [[0.5, 0, 1.8, "The marigolds", "read", evbHaGarden]] },
hachapel: { far: ["altarinside"], grid: ["pew", 2, 3, "-u", 0.3, 0.55], sides: ["candles", "evb_marigolds", "candles"], acts: [[0.75, 0, 1.8, "The family chapel", "read", evbHaChapel]] },
hastable: { sides: ["trstall", "trhay", "trstall", "trsaddles"], acts: [[0.5, 0, 1.8, "The horses", "say hello", evbHaStable]] },
haportraits: { far: ["painting", "painting", "painting"], sides: ["painting", "candles", "painting", "evb_marigolds"], acts: [[0.5, 0, 1.8, "The portraits", "read", evbHaPortraits]] },
hacatrina: { far: ["wallmirror", "dressform"], sides: ["dressform", "wardrobe", "dressform", "wallmirror"], acts: [[0.5, 0, 1.8, "La Catrina", "read", evbHaCatrina]] },
habed: { far: ["fourposter"], sides: ["wardrobe", "candles", "footchest", "evb_marigolds"], acts: [[0.5, 0, 1.8, "Grandmother's bed", "look", evbHaBed]] },
hapinata: { mid: [["toys", 0.6, 0.3]], sides: ["chair", "evb_marigolds", "chair", "toys"], ceil: "evb_pinata", acts: [[0.5, 0, 2.0, "The piñata", "have a go", evbHaPinata]] }
});
evbRooms({
chporch: { sides: ["benchin", "noticeboard", "benchin"], far: ["evb_marigolds", "evb_marigolds"], gap: 3, acts: [[0.35, 0, 2.0, "The church", "read", evbChPriest]] },
chnave: { sides: ["pew", "pew", "pew", "pew"], ceil: "chandelier" },
chaisle: { far: ["evb_glass", "candles", "evb_glass", "candles"] },
chaltar: { far: ["altarinside"], mid: [["pulpit", 0.7, -0.3], ["lectern", 0.7, 0.3], ["redrunner", 0.4, 0, "+u"]], grid: ["pew", 2, 6, "-u", 0.15, 0.5], sides: ["evb_glass", "candles", "evb_glass", "candles"], ceil: "chandelier",
acts: [[0.8, 0, 2.0, "The altar", "read", evbChAltar]] },
chbell: { mid: [["evb_bellrope", 0.55, 0]], sides: ["benchin", "noticeboard"], acts: [[0.5, 0, 1.8, "The bell rope", "ring the bell", evbChBell]] },
chfont: { mid: [["evb_font", 0.55, 0]], sides: ["benchin", "candles", "benchin"], acts: [[0.45, 0, 1.8, "The font", "read", evbChFont]] },
chcandle: { far: ["candles", "candles", "candles"], sides: ["candles", "benchin", "candles", "benchin"], acts: [[0.5, 0, 1.8, "The candles", "light one", evbChCandle]] },
chglass: { far: ["evb_glass", "evb_glass"], sides: ["evb_glass", "benchin", "evb_glass"], acts: [[0.5, 0, 1.8, "Stained glass", "read", evbChGlass]] },
chvestry: { far: ["wardrobe", "wardrobe"], sides: ["dressform", "displaycase", "wardrobe"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The vestments", "read", evbChVestry]] },
chchoir: { grid: ["chair", 2, 3], far: ["esorgan"], sides: ["bookshelf", "lectern"], acts: [[0.5, 0, 1.8, "The choir", "listen", evbChChoir]] },
chschool: { grid: ["schooldesk", 2, 3], far: ["blackboard"], sides: ["bookshelf", "noticeboard"], acts: [[0.5, 0, 1.8, "The schoolroom", "read", evbChSchool]] },
chregister: { far: ["bookshelf", "bookshelf"], sides: ["filecabinet", "bookshelf", "filecabinet"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The register", "read", evbChRegister]] },
chgrave: { grid: ["coffin", 1, 1], sides: ["evb_marigolds", "candles", "evb_marigolds", "candles"], acts: [[0.5, 0, 1.8, "The graveyard gate", "read", evbChGrave]] },
chflowers: { sides: ["flowerbucket", "evb_marigolds", "flowerbucket", "evb_marigolds"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The flowers", "arrange them", evbChFlowers]] },
chpriest: { far: ["bookshelf", "bookshelf"], sides: ["bookshelf", "armchair", "bookshelf", "evb_cross"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The saints' days", "read", evbChPriest]] },
chhall: { grid: ["table", 2, 2], sides: ["chair", "noticeboard", "chair", "counter"], acts: [[0.5, 0, 1.8, "The parish hall", "have tea", evbChHall]] }
});
evbRooms({
pyentry: { sides: ["evb_hieros", "brazier", "evb_hieros", "brazier"], far: ["evb_obelisk", "evb_obelisk"], gap: 3.6, acts: [[0.35, 0, 2.0, "The pyramid", "read", evbPyEntry]] },
pygallery: { sides: ["evb_hieros", "brazier", "evb_hieros", "brazier"], acts: [[0.5, 0, 2.0, "The Grand Gallery", "read", evbPyGallery]] },
pyfalse: { far: ["boulder", "evb_hieros", "boulder"] },
pyking: { far: ["evb_hieros", "evb_hieros"], mid: [["evb_coffin", 0.6, 0], ["redrunner", 0.3, 0, "+u"]], grid: ["brazier", 2, 6, "-u", 0.2, 0.85], sides: ["evb_anubis", "goldstatue", "evb_hieros", "goldstatue", "evb_anubis"],
acts: [[0.6, 0, 2.4, "The King's Chamber", "look", evbPyKing]] },
pyqueen: { mid: [["evb_obelisk", 0.55, 0]], sides: ["evb_hieros", "brazier", "evb_hieros"], acts: [[0.45, 0, 1.8, "The Queen's Chamber", "read", evbPyQueen]] },
pytreasury: { grid: ["goldpile", 2, 2], sides: ["treasurechest", "goldstatue", "treasurechest", "crownstand"], acts: [[0.5, 0, 1.8, "The treasure", "read", evbPyTreasury]] },
pyembalm: { mid: [["butcherblock", 0.5, 0]], sides: ["herbrack", "evb_canopic", "shelfgoods", "barrel"], acts: [[0.5, 0, 1.8, "The embalmers", "read", evbPyEmbalm]] },
pycanopic: { mid: [["evb_canopic", 0.55, 0]], sides: ["evb_canopic", "evb_hieros", "evb_canopic"], acts: [[0.45, 0, 1.8, "The canopic jars", "read", evbPyCanopic]] },
pyscribe: { grid: ["schooldesk", 2, 2], far: ["evb_hieros", "bookshelf"], sides: ["mapchest", "evb_hieros", "lectern"], acts: [[0.5, 0, 1.8, "The scribe", "learn a sign", evbPyScribe]] },
pyboat: { mid: [["evb_sunboat", 0.55, 0]], sides: ["evb_hieros", "brazier", "evb_hieros"], acts: [[0.4, 0, 1.8, "The sun boat", "read", evbPyBoat]] },
pyjudge: { mid: [["evb_scales", 0.55, 0]], sides: ["evb_anubis", "evb_hieros", "evb_anubis"], acts: [[0.45, 0, 1.8, "The scales of Ma'at", "weigh your heart", evbPyJudge]] },
pygods: { far: ["goldstatue", "goldstatue", "goldstatue"], sides: ["goldstatue", "evb_hieros", "goldstatue", "evb_anubis"], acts: [[0.5, 0, 1.8, "The gods", "meet one", evbPyGods]] },
pybuilders: { sides: ["boulder", "workbench", "boulder", "crates"], mid: [["maptable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The builders", "read", evbPyBuilders]] },
pystars: { far: ["estelescope"], sides: ["evb_hieros", "maptable", "evb_hieros"], acts: [[0.5, 0, 1.8, "The star shafts", "read", evbPyStars]] },
pygames: { grid: ["escardtable", 1, 2], sides: ["chair", "evb_hieros", "chair"], acts: [[0.5, 0, 1.8, "Senet", "play", evbPyGame]] },
pyfood: { far: ["longtable"], sides: ["barrel", "shelfgoods", "barrel", "evb_hieros"], mid: [["feasttable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The offerings", "read", evbPyFood]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, GILT = evbGilt;
var P = {};
P.evb_gerstove = function () {
var g = G(), ir = M(0x2A2826), or = M(0xC0392B, "wood");
B(g, ir, 0.7, 0.5, 0.6, 0, 0.25, 0);
B(g, or, 0.74, 0.08, 0.64, 0, 0.54, 0);
S(g, evbGlow(0xFF8A30, 0.8), 0.1, 0, 0.25, 0.31, 8);
Cy(g, ir, 0.07, 0.07, 2.8, 0, 1.95, -0.1, 8);
Cy(g, M(0xD8B040), 0.25, 0.25, 0.15, 0.18, 0.66, 0.05, 10);
return g;
};
P.evb_khana = function () {
var g = G(), rd = M(0xC0392B, "wood");
B(g, M(0xF0E8D8, "damask"), 2.0, 1.6, 0.05, 0, 0.8, -0.04);
for (var i = 0; i < 9; i++) {
var a = B(g, rd, 0.03, 1.9, 0.02, -0.9 + i * 0.225, 0.8, 0.02);
a.rotation.z = 0.75;
var b = B(g, rd, 0.03, 1.9, 0.02, -0.9 + i * 0.225, 0.8, 0.03);
b.rotation.z = -0.75;
}
return g;
};
P.evb_morin = function () {
var g = G(), wd = M(0x8A5A2A, "wood");
B(g, M(0x3A2418, "wood"), 0.4, 0.05, 0.3, 0, 0.03, 0);
var bx = B(g, wd, 0.34, 0.4, 0.1, 0, 0.35, 0);
bx.rotation.x = -0.1;
B(g, wd, 0.05, 0.9, 0.05, 0, 1.0, -0.06);
var hd = B(g, M(0x2A1A10, "wood"), 0.08, 0.2, 0.16, 0, 1.55, -0.02);
hd.rotation.x = 0.5;
Co(g, M(0x2A1A10), 0.025, 0.08, 0, 1.66, -0.1, 4);
return g;
};
P.evb_shagai = function () {
var g = G(), or = M(0xE8902A, "wood");
B(g, or, 0.9, 0.35, 0.6, 0, 0.18, 0);
B(g, M(0x2A6AA8), 0.92, 0.03, 0.62, 0, 0.37, 0);
for (var i = 0; i < 8; i++)
B(g, M(0xF0E6D0), 0.05, 0.035, 0.035, -0.3 + (i % 4) * 0.18, 0.4, -0.1 + Math.floor(i / 4) * 0.2).rotation.y = i;
return g;
};
P.evb_eagle = function () {
var g = G(), br = M(0x5A3A1A), wd = M(0x6A4A2A, "wood");
Cy(g, wd, 0.04, 0.05, 1.3, 0, 0.65, 0, 8);
B(g, wd, 0.5, 0.06, 0.06, 0, 1.3, 0);
var b = S(g, br, 0.18, 0, 1.5, 0, 10);
b.scale.set(1, 1.4, 0.9);
S(g, M(0xC8A060), 0.1, 0, 1.78, 0.04, 10);
Co(g, M(0xE8B030), 0.035, 0.08, 0, 1.77, 0.15, 4).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { var w = B(g, br, 0.08, 0.4, 0.25, s * 0.17, 1.45, -0.02); w.rotation.z = s * 0.15; });
return g;
};
P.evb_bows = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
B(g, wd, 1.0, 1.4, 0.06, 0, 0.9, 0);
[-0.25, 0.25].forEach(function (x) { var t = Tor(g, M(0x3A2418), 0.45, 0.03, x, 1.0, 0.05, 0); t.rotation.z = Math.PI / 2; t.scale.set(1, 1, 0.35); });
Cy(g, M(0x8A5A2A, "damask"), 0.08, 0.08, 0.6, 0.42, 0.8, 0.08, 8);
return g;
};
P.evb_teaparty = function () {
var g = G(), cl = M(0xF4F0E8, "damask");
B(g, M(0x6A4A2A, "wood"), 3.0, 0.72, 1.0, 0, 0.36, 0);
B(g, cl, 3.1, 0.03, 1.1, 0, 0.74, 0);
[[-1.1, 0xC0392B], [-0.3, 0x2A6AA8], [0.5, 0x3A9A4A], [1.2, 0xE8B030]].forEach(function (p) { var t = S(g, M(p[1]), 0.14, p[0], 0.88, 0, 10); t.scale.set(1, 0.8, 1); Cy(g, M(p[1]), 0.02, 0.03, 0.18, p[0] + 0.16, 0.9, 0, 6).rotation.z = -0.9; S(g, M(p[1]), 0.04, p[0], 1.0, 0, 6); });
for (var i = 0; i < 10; i++) {
var x = -1.35 + i * 0.3, z = (i % 2 ? 0.35 : -0.35);
Cy(g, M(0xFFFFFF), 0.05, 0.04, 0.07, x, 0.79, z, 10);
Cy(g, M(0xFFFFFF), 0.08, 0.08, 0.01, x, 0.755, z, 12);
}
S(g, M(0xE8C890), 0.12, 0.1, 0.82, 0.3, 8).scale.set(1, 0.5, 1);
return g;
};
P.evb_bigteapot = function () {
var g = G(), c = M(0x7AB8E0);
var b = S(g, c, 0.6, 0, 0.6, 0, 14);
b.scale.set(1, 0.85, 1);
S(g, c, 0.15, 0, 1.15, 0, 10);
var sp = Cy(g, c, 0.06, 0.12, 0.6, 0.7, 0.75, 0, 8);
sp.rotation.z = -0.8;
Tor(g, c, 0.25, 0.05, -0.62, 0.65, 0, 0).rotation.y = Math.PI / 2;
S(g, M(0xF0F0F0), 0.1, 0.3, 0.6, 0.5, 8);
S(g, M(0x8A6A5A), 0.08, 0.25, 0.55, 0.52, 6);
return g;
};
P.evb_hatstand = function () {
var g = G(), wd = M(0x3A2418, "wood");
Cy(g, wd, 0.2, 0.25, 0.05, 0, 0.03, 0, 10);
Cy(g, wd, 0.03, 0.03, 1.8, 0, 0.9, 0, 8);
Cy(g, M(0x4A4A5A), 0.15, 0.12, 0.3, 0, 1.95, 0, 12);
Cy(g, M(0x4A4A5A), 0.24, 0.24, 0.02, 0, 1.8, 0, 14);
Cy(g, M(0xA0302A), 0.155, 0.155, 0.05, 0, 1.85, 0, 12);
B(g, M(0xF8F4E8), 0.08, 0.05, 0.01, 0.1, 1.88, 0.15);
return g;
};
P.evb_glassstand = function () {
var g = G(), fr = GILT();
B(g, fr, 1.1, 0.06, 0.4, 0, 0.03, 0);
B(g, fr, 1.0, 2.1, 0.08, 0, 1.15, 0);
B(g, M(0xD8E8F0, null, { e: 0x3A4A50 }), 0.88, 1.95, 0.02, 0, 1.15, 0.05);
S(g, fr, 0.1, 0, 2.27, 0, 8);
return g;
};
P.evb_prism = function () {
var g = G();
Cy(g, M(0x3A2A20, "wood"), 0.25, 0.3, 0.9, 0, 0.45, 0, 10);
var p = Cy(g, M(0xE8F4FF, null, { op: 0.6 }), 0.18, 0.18, 0.35, 0, 1.08, 0, 3);
p.rotation.x = Math.PI / 2;
[0xFF3030, 0xFF9020, 0xFFE030, 0x30C040, 0x3080FF, 0x7040C0].forEach(function (c, i) { B(g, evbGlow(c, 0.7), 0.06, 0.01, 0.5, 0.15 + i * 0.05, 0.91, 0.35); });
return g;
};
P.evb_kaleido = function () {
var g = G(), br = GILT();
Cy(g, br, 0.2, 0.25, 0.05, 0, 0.03, 0, 10);
Cy(g, br, 0.03, 0.03, 1.0, 0, 0.53, 0, 8);
var t = Cy(g, M(0x7A3AA8), 0.07, 0.09, 0.6, 0, 1.1, 0, 10);
t.rotation.x = 1.2;
Cy(g, M(0xF5C518), 0.1, 0.1, 0.06, 0, 1.0, 0.28, 10).rotation.x = 1.2;
return g;
};
P.evb_tank = function () {
var g = G(), st = M(0x6A7078);
Cy(g, st, 0.8, 0.8, 1.8, 0, 0.95, 0, 16);
for (var i = 0; i < 3; i++)
Tor(g, M(0x4A5058), 0.81, 0.03, 0, 0.3 + i * 0.65, 0, Math.PI / 2);
Cy(g, M(0xF0F0E8), 0.12, 0.12, 0.03, 0, 1.2, 0.81, 12).rotation.x = Math.PI / 2;
Cy(g, M(0x4A5058), 0.06, 0.06, 0.5, 0.5, 0.25, 0.6, 8).rotation.x = Math.PI / 2;
Cy(g, M(0xC0302A), 0.1, 0.1, 0.04, 0.5, 0.25, 0.86, 8).rotation.x = Math.PI / 2;
return g;
};
P.evb_sandbags = function () { var g = G(), sb = M(0xB8A478, "damask"); for (var r = 0; r < 3; r++)
for (var i = 0; i < 4; i++) {
var b = S(g, sb, 0.22, -0.75 + i * 0.5 + (r % 2) * 0.25, 0.15 + r * 0.26, 0, 8);
b.scale.set(1.15, 0.55, 0.8);
} return g; };
P.evb_searchlight = function () {
var g = G(), st = M(0x3A3E44);
[0, 2.1, 4.2].forEach(function (a) { var l = Cy(g, st, 0.025, 0.025, 1.3, Math.cos(a) * 0.3, 0.6, Math.sin(a) * 0.3, 6); l.rotation.z = Math.cos(a) * 0.25; l.rotation.x = -Math.sin(a) * 0.25; });
var h = Cy(g, st, 0.3, 0.25, 0.5, 0, 1.35, 0, 14);
h.rotation.x = Math.PI / 2 - 0.3;
var f = Cy(g, evbGlow(0xFFF4D0), 0.27, 0.27, 0.02, 0, 1.43, 0.25, 14);
f.rotation.x = Math.PI / 2 - 0.3;
return g;
};
P.evb_cauldron = function () {
var g = G(), ir = M(0x2A2826);
[0, 2.1, 4.2].forEach(function (a) { Cy(g, ir, 0.03, 0.03, 0.5, Math.cos(a) * 0.4, 0.25, Math.sin(a) * 0.4, 6); });
S(g, evbGlow(0x4080FF, 0.7), 0.12, 0, 0.12, 0, 8).scale.set(1.5, 0.4, 1.5);
var p = S(g, ir, 0.5, 0, 0.85, 0, 14);
p.scale.set(1, 0.8, 1);
Cy(g, M(0xC8843A), 0.45, 0.45, 0.02, 0, 1.1, 0, 14);
Cy(g, M(0x8A6A4A, "wood"), 0.02, 0.02, 0.9, 0.2, 1.3, 0, 6).rotation.z = -0.4;
return g;
};
P.evb_rations = function () {
var g = G(), sh = M(0x6A6058);
B(g, sh, 1.4, 1.8, 0.4, 0, 0.9, -0.05);
for (var r = 0; r < 4; r++) {
B(g, M(0x8A8078), 1.36, 0.03, 0.38, 0, 0.2 + r * 0.45, 0);
for (var i = 0; i < 6; i++)
Cy(g, M([0xC0392B, 0x2A6AA8, 0xE8B030, 0x3A9A4A][(i + r) % 4]), 0.06, 0.06, 0.16, -0.55 + i * 0.22, 0.3 + r * 0.45, 0.05, 8);
}
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_gerstove", "evb_shagai", "evb_teaparty", "evb_bigteapot", "evb_glassstand", "evb_prism", "evb_kaleido", "evb_tank", "evb_sandbags", "evb_searchlight", "evb_cauldron", "evb_eagle", "evb_morin"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("yurt", { corner: "pelt", seed: 51, panel: 0xF0E8D8,
pal: { fab: "crimson", fab2: "teal", wood: "oak", metal: "brass", stone: "stone", art: 4, rug: 5, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF0E8D8, "plaster"], "D8D0C0|coffer": [0xC0392B, "coffer"] },
hello: "⛺ <b>Inside the yurt,</b> a ger of the Mongolian steppe: felt over a red lattice, the stove in the middle, the place of honour at the back, facing the door. Much bigger within. Look for the ✨ cards. The way out is the painted door (it faces south, as every ger's does)." });
evbHouse("yurt", { g: EVB_GRID.mid, h: 4.0, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The ger"], wall: 0xF0E8D8, trim: 0xC0392B,
plan: [{ hall: { k: "yudoor", n: "The Door Side" }, spine: { k: "yustove", n: "The Hearth" }, gallery: { k: "yuring", n: "The Lattice Ring" },
back: { merge: EVB_BACK, k: "yuhonour", n: "The Place of Honour (the Khoimor)" },
r1i: { k: "yueagle", n: "The Eagle Hunter's Corner" }, r1o: { k: "yufelt", n: "The Felt Makers" },
r2i: { k: "yufiddle", n: "The Fiddle Corner" }, r2o: { k: "yuknuckle", n: "The Knucklebones Table" },
r3i: { k: "yuarchery", n: "The Archers' Corner" }, r3o: { k: "yukitchen", n: "The Women's Side, the Kitchen" },
l1i: { k: "yusaddle", n: "The Men's Side, the Saddles" }, l1o: { k: "yuwrestle", n: "The Wrestlers' Corner" },
l2i: { k: "yustars", n: "The Crown Window" }, l2o: { k: "yuherd", n: "The Herders' Room" },
l3i: { k: "yubeds", n: "The Sleeping Side" }, l3o: { k: "yustory", n: "The Storytellers' Fire" } }] });
evbTheme("teahouse", { corner: "evb_hatstand", seed: 53, panel: 0xE8F0E8,
pal: { fab: "teal", fab2: "crimson", wood: "walnut", metal: "brass", stone: "marble", art: 1, rug: 3, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE8F4EC, "plaster"], "D8D0C0|coffer": [0xF0D8E0, "coffer"] },
hello: "🫖 <b>Inside the Looking-Glass Tea House.</b> It is always six o'clock here, so it is always tea-time. The Mad Tea Party is at the back, and the clocks and the rooms are all a little wrong. Look for the ✨ cards. The way out is the front door (or is it the back?)." });
evbHouse("teahouse", { g: EVB_GRID.mid, h: 4.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The tea house"], wall: 0xE8F4EC, trim: 0xC0392B,
plan: [{ hall: { k: "tefront", n: "The Tea Room" }, spine: { k: "teclocks", n: "The Hall of Clocks" }, gallery: { k: "temirror", n: "The Looking-Glass Gallery" },
back: { merge: EVB_BACK, k: "teparty", n: "The Mad Tea Party" },
r1i: { k: "tehatter", n: "The Hatter's Workshop" }, r1o: { k: "tedormouse", n: "The Dormouse's Teapot" },
r2i: { k: "tecakes", n: "The Eat Me Room" }, r2o: { k: "tebottles", n: "The Drink Me Room" },
r3i: { k: "tebackwards", n: "The Backwards Room" }, r3o: { k: "tekitchen", n: "The Tea Kitchen" },
l1i: { k: "techess", n: "The Chessboard Garden" }, l1o: { k: "tequeen", n: "The Red Queen's Parlour" },
l2i: { k: "tetwins", n: "The Tweedles' Room" }, l2o: { k: "tepoems", n: "The Jabberwocky Library" },
l3i: { k: "tecaterpillar", n: "The Caterpillar's Room" }, l3o: { k: "tecat", n: "The Cheshire Cat's Corner" } }] });
evbTheme("mirrormaze", { corner: "evb_glassstand", seed: 55, panel: 0xD8E0EC,
pal: { fab: "plum", fab2: "teal", wood: "white", metal: "chrome", stone: "marble", art: 8, rug: 2, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE0E8F4, "plaster"], "D8D0C0|coffer": [0x3A3A6A, "coffer"] },
hello: "🪞 <b>Inside the Hall of Mirrors.</b> Mirrors on every side: the maze, the funny mirrors, the infinity room, the prisms that split light into rainbows. Look for the ✨ cards to learn how light bounces and bends. The way out is the front (the one that isn't a reflection)." });
evbHouse("mirrormaze", { g: EVB_GRID.mid, h: 4.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The hall of mirrors"], wall: 0xE0E8F4, trim: 0x7A3AA8,
plan: [{ hall: { k: "mmentry", n: "The Entrance" }, spine: { k: "mmmaze", n: "The Mirror Maze" }, gallery: { k: "mmcorr", n: "The Corridor of Reflections" },
back: { merge: EVB_BACK, k: "mminfinity", n: "The Infinity Room" },
r1i: { k: "mmfunny", n: "The Funny Mirrors" }, r1o: { k: "mmprism", n: "The Prism Room" },
r2i: { k: "mmkaleido", n: "The Kaleidoscope Room" }, r2o: { k: "mmperiscope", n: "The Periscope Room" },
r3i: { k: "mmlenses", n: "The Lens Room" }, r3o: { k: "mmcamera", n: "The Camera Obscura" },
l1i: { k: "mmghost", n: "Pepper's Ghost" }, l1o: { k: "mmleft", n: "The Left-Right Room" },
l2i: { k: "mmrainbow", n: "The Rainbow Room" }, l2o: { k: "mmalice", n: "Alice's Looking-Glass" },
l3i: { k: "mmtelescope", n: "The Telescope Room" }, l3o: { k: "mmshop", n: "The Looking-Glass Shop" } }] });
evbTheme("watertower", { corner: "barrel", seed: 57, panel: 0x9AA0A8,
pal: { fab: "charcoal", fab2: "teal", wood: "oak", metal: "iron", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0xB0B4B8, "plaster"], "D8D0C0|coffer": [0x6A7078, "coffer"] },
hello: "💧 <b>Inside the water tower.</b> In the Wasteland, clean water is everything: the tank, the pumps, the filter beds, the rain catchers. Look for the ✨ cards to see how water is made safe to drink. The way out is the iron door." });
evbHouse("watertower", { g: EVB_GRID.mid, h: 4.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The tower"], wall: 0xB0B4B8, trim: 0x2A7A8A,
plan: [{ hall: { k: "wtdoor", n: "The Valve Room" }, spine: { k: "wtpipes", n: "The Pipe Hall" }, gallery: { k: "wtcatwalk", n: "The Catwalk" },
back: { merge: EVB_BACK, k: "wttank", n: "The Great Tank" },
r1i: { k: "wtpump", n: "The Pump Room" }, r1o: { k: "wtfilter", n: "The Filter Beds" },
r2i: { k: "wtrain", n: "The Rain Catchers" }, r2o: { k: "wtgauge", n: "The Gauge Room" },
r3i: { k: "wtlab", n: "The Testing Bench" }, r3o: { k: "wtstore", n: "The Bottle Store" },
l1i: { k: "wtmap", n: "The Map of the Wells" }, l1o: { k: "wtworkshop", n: "The Pipe Fitter's Workshop" },
l2i: { k: "wtkeeper", n: "The Keeper's Room" }, l2o: { k: "wtgarden", n: "The Drip Garden" },
l3i: { k: "wtdew", n: "The Dew Nets" }, l3o: { k: "wtbunks", n: "The Bunk Room" } }] });
evbTheme("soupkitchen", { corner: "barrel", seed: 59, panel: 0xC8B8A0,
pal: { fab: "mustard", fab2: "terracotta", wood: "oak", metal: "iron", stone: "stone", art: 9, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8C8B0, "plaster"], "D8D0C0|coffer": [0x6A5A48, "coffer"] },
hello: "🍲 <b>Inside the soup kitchen.</b> Nobody in the Wasteland goes hungry here: there's a bowl for everyone, a seat at the long tables, and bread when there's bread. Look for the ✨ cards. The way out is the front door." });
evbHouse("soupkitchen", { g: EVB_GRID.mid, h: 4.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The kitchen"], wall: 0xD8C8B0, trim: 0x8A5A3A,
plan: [{ hall: { k: "skqueue", n: "The Queue Hall" }, spine: { k: "skserve", n: "The Serving Line" }, gallery: { k: "sknotice", n: "The Notice Wall" },
back: { merge: EVB_BACK, k: "skhall", n: "The Long Tables" },
r1i: { k: "skpots", n: "The Cauldron Room" }, r1o: { k: "skbread", n: "The Bread Oven" },
r2i: { k: "skstore", n: "The Ration Store" }, r2o: { k: "skveg", n: "The Vegetable Room" },
r3i: { k: "skwash", n: "The Washing-Up" }, r3o: { k: "skwater", n: "The Water Barrels" },
l1i: { k: "skkids", n: "The Children's Table" }, l1o: { k: "skclinic", n: "The First Aid Room" },
l2i: { k: "skswap", n: "The Swap Shop" }, l2o: { k: "skgarden", n: "The Rooftop Garden" },
l3i: { k: "skcook", n: "The Cook's Room" }, l3o: { k: "sksleep", n: "The Night Shelter" } }] });
evbTheme("watchtower", { corner: "evb_sandbags", seed: 61, panel: 0x8A8478,
pal: { fab: "charcoal", fab2: "mustard", wood: "oak", metal: "iron", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0xA8A090, "plaster"], "D8D0C0|coffer": [0x5A5448, "coffer"] },
hello: "🗼 <b>Inside the guard tower.</b> The lookout over the Wasteland: the searchlight, the radio room, the map room where the watch keeps its log. Look for the ✨ cards. The way out is the door at the foot of the tower." });
evbHouse("watchtower", { g: EVB_GRID.mid, h: 4.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The tower"], wall: 0xA8A090, trim: 0x5A5448,
plan: [{ hall: { k: "wagate", n: "The Gate Room" }, spine: { k: "wastair", n: "The Stair Hall" }, gallery: { k: "wawall", n: "The Wall Walk" },
back: { merge: EVB_BACK, k: "walookout", n: "The Lookout" },
r1i: { k: "waradio", n: "The Radio Room" }, r1o: { k: "wamaps", n: "The Map Room" },
r2i: { k: "wasignal", n: "The Signal Room" }, r2o: { k: "walog", n: "The Watch Log" },
r3i: { k: "wabunks", n: "The Bunk Room" }, r3o: { k: "wamess", n: "The Mess" },
l1i: { k: "waarmoury", n: "The Kit Store" }, l1o: { k: "wabins", n: "The Binocular Room" },
l2i: { k: "waweather", n: "The Weather Station" }, l2o: { k: "wamedic", n: "The Medic's Room" },
l3i: { k: "wakennel", n: "The Dog Kennel" }, l3o: { k: "wacaptain", n: "The Captain's Room" } }] });
evbFins({
yudoor: ["carpet", 0xC0392B, 0xF0E8D8, "plaster", 0xC0392B], yustove: ["carpet", 0xA8302A, 0xF0E8D8, "plaster", 0xE8902A], yuring: ["carpet", 0xB8382A, 0xEDE4D4, "plaster", 0xC0392B],
yuhonour: ["carpet", 0x8A2A2A, 0xF0E8D8, "plaster", 0xD8B040, "coffer"], yueagle: ["wood", 0x9A7A58, 0xE8E0D0, "plaster", 0x5A3A1A], yufelt: ["carpet", 0xD8C8A8, 0xF0E8D8, "plaster", 0xC0392B],
yufiddle: ["carpet", 0x2A6AA8, 0xF0E8D8, "plaster", 0xD8B040], yuknuckle: ["carpet", 0xE8902A, 0xF0E8D8, "plaster", 0x2A6AA8], yuarchery: ["wood", 0x9A7A58, 0xE8E0D0, "plaster", 0x5A3A1A],
yukitchen: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0xE8902A], yusaddle: ["wood", 0x8A6A48, 0xE8E0D0, "plaster", 0x5A3A1A], yuwrestle: ["carpet", 0x2A6AA8, 0xF0E8D8, "plaster", 0xC0392B],
yustars: ["carpet", 0x1E2A5A, 0x2A3A6A, "plaster", 0xE8D860], yuherd: ["wood", 0x9A7A58, 0xE8E0D0, "plaster", 0x5A3A1A], yubeds: ["carpet", 0xC0392B, 0xF0E8D8, "plaster", 0xD8B040],
yustory: ["carpet", 0xA8302A, 0xF0E8D8, "plaster", 0xE8902A],
tefront: ["checker", 0xF0F0F0, 0xE8F4EC, "stripe", 0xC0392B], teclocks: ["wood", 0x8A5A3A, 0xF0E0C8, "plaster", 0xD8B040], temirror: ["marble", 0xE8E8F0, 0xE0E8F4, "plaster", 0xD8B040],
teparty: ["herring", 0x9A7A58, 0xF8E8F0, "stripe", 0xC0392B, "coffer"], tehatter: ["wood", 0x7A5A3A, 0x2A6A5A, "plaster", 0xD8B040], tedormouse: ["carpet", 0x7AB8E0, 0xF4F0E8, "plaster", 0x2A6AA8],
tecakes: ["checker", 0xF0F0F0, 0xF8D8E0, "plaster", 0xE8308A], tebottles: ["checker", 0xF0F0F0, 0xD8E8F8, "plaster", 0x2A6AA8], tebackwards: ["wood", 0x8A6A4A, 0xE8D8F0, "stripe", 0x7A3AA8],
tekitchen: ["tile", 0xE8E0D0, 0xF4F0E8, "tile", 0x3A9A4A], techess: ["checker", 0xF0F0F0, 0xC8E8C0, "plaster", 0xC0392B], tequeen: ["carpet", 0xA8202A, 0xF8E0E0, "damask", 0xD8B040],
tetwins: ["carpet", 0xE8B030, 0xF0E8D8, "stripe", 0x2A6AA8], tepoems: ["wood", 0x7A5A3A, 0xE4D8C0, "plaster", 0x7A3AA8], tecaterpillar: ["carpet", 0x3A9A4A, 0xD8E8C8, "plaster", 0x7A3AA8],
tecat: ["carpet", 0x7A3AA8, 0xF0D8F0, "stripe", 0xE8308A],
mmentry: ["marble", 0xE8E8F0, 0xE0E8F4, "plaster", 0x7A3AA8], mmmaze: ["checker", 0xE8E8F0, 0xD8E0EC, "plaster", 0xC0C8D8], mmcorr: ["marble", 0xE0E0EA, 0xE0E8F4, "plaster", 0x7A3AA8],
mminfinity: ["marble", 0x2A2A3A, 0x1A1A2A, "plaster", 0xD8E8F8, "coffer"], mmfunny: ["checker", 0xF0E0F0, 0xF8E8D8, "stripe", 0xE8308A], mmprism: ["marble", 0xF0F0F4, 0xF8F8FC, "plaster", 0x7A3AA8],
mmkaleido: ["carpet", 0x7A3AA8, 0x2A2A4A, "plaster", 0xF5C518], mmperiscope: ["wood", 0x8A6A4A, 0xD8E0E8, "plaster", 0x3A4A5A], mmlenses: ["wood", 0x8A6A4A, 0xE8E4D8, "plaster", 0xA87838],
mmcamera: ["wood", 0x5A4A3A, 0x2A2A30, "plaster", 0xA87838], mmghost: ["carpet", 0x3A2A4A, 0x2A2438, "damask", 0xA8A8C8], mmleft: ["checker", 0xF0F0F0, 0xE8E8F0, "plaster", 0xC0392B],
mmrainbow: ["marble", 0xF0F0F4, 0xFFFFFF, "plaster", 0xE8308A], mmalice: ["carpet", 0x2A6AA8, 0xF0E8F4, "plaster", 0xD8B040], mmtelescope: ["wood", 0x8A6A4A, 0x2A3A6A, "plaster", 0xD8B040],
mmshop: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0xD8B040],
wtdoor: ["stone", 0x8A8478, 0xB0B4B8, "stone", 0x2A7A8A], wtpipes: ["stone", 0x7A7468, 0xA8ACB0, "stone", 0x2A7A8A], wtcatwalk: ["stone", 0x7A7468, 0xB0B4B8, "stone", 0x5A6068],
wttank: ["stone", 0x6A6458, 0x9AA0A8, "stone", 0x2A7A8A, "coffer"], wtpump: ["stone", 0x7A7468, 0xA8ACB0, "stone", 0xC0302A], wtfilter: ["stone", 0x8A7A5A, 0xB8B0A0, "stone", 0x2A7A8A],
wtrain: ["stone", 0x7A7468, 0xB8C0C8, "plaster", 0x2A7A8A], wtgauge: ["stone", 0x7A7468, 0xC8C8C0, "plaster", 0xC0302A], wtlab: ["tile", 0xD8D8D0, 0xE8ECEC, "tile", 0x2A7A8A],
wtstore: ["stone", 0x7A7468, 0xB0B4B8, "plaster", 0x2A6AA8], wtmap: ["wood", 0x8A6A4A, 0xD8D0C0, "plaster", 0x2A7A8A], wtworkshop: ["stone", 0x6A6458, 0xA8A090, "stone", 0x5A6068],
wtkeeper: ["wood", 0x8A6A4A, 0xC8C0B0, "plaster", 0x2A7A8A], wtgarden: ["stone", 0x8A7A5A, 0xC8D8C0, "plaster", 0x3A8A3A], wtdew: ["stone", 0x7A7468, 0xD0D8E0, "plaster", 0x2A7A8A],
wtbunks: ["wood", 0x8A6A4A, 0xB8B4A8, "plaster", 0x5A6068],
skqueue: ["stone", 0x8A7A68, 0xD8C8B0, "plaster", 0x8A5A3A], skserve: ["tile", 0xC8B8A0, 0xE0D0B8, "tile", 0x8A5A3A], sknotice: ["stone", 0x8A7A68, 0xD8C8B0, "plaster", 0x8A5A3A],
skhall: ["wood", 0x8A6A48, 0xE0D0B8, "plaster", 0x8A5A3A, "coffer"], skpots: ["tile", 0xB8A890, 0xD8C8B0, "tile", 0x5A4A3A], skbread: ["stone", 0x9A8A70, 0xE0C8A0, "plaster", 0x8A5A3A],
skstore: ["stone", 0x7A6A58, 0xC8B8A0, "plaster", 0x5A4A3A], skveg: ["stone", 0x8A7A68, 0xD8D0B0, "plaster", 0x3A8A3A], skwash: ["tile", 0xC8C8C0, 0xE0E4E4, "tile", 0x2A6AA8],
skwater: ["stone", 0x7A7468, 0xC0C4C8, "plaster", 0x2A7A8A], skkids: ["carpet", 0x3AA8A8, 0xF0E0C0, "plaster", 0xE8902A], skclinic: ["tile", 0xE0E0DC, 0xF0F0EC, "tile", 0xC0302A],
skswap: ["wood", 0x8A6A48, 0xD8C8B0, "plaster", 0xE8902A], skgarden: ["stone", 0x8A7A58, 0xC8D8B0, "plaster", 0x3A8A3A], skcook: ["wood", 0x8A6A48, 0xE0D0B8, "plaster", 0x8A5A3A],
sksleep: ["carpet", 0x6A5A48, 0xD0C0A8, "plaster", 0x5A4A3A],
wagate: ["stone", 0x7A7468, 0xA8A090, "stone", 0x5A5448], wastair: ["stone", 0x7A7468, 0xA8A090, "stone", 0x5A5448], wawall: ["stone", 0x6A6458, 0x9A9284, "stone", 0x5A5448],
walookout: ["wood", 0x7A6A58, 0xA8A090, "stone", 0xE8B030, "coffer"], waradio: ["wood", 0x6A5A48, 0x5A6A5A, "plaster", 0xE8B030], wamaps: ["wood", 0x7A6A58, 0xC8C0A8, "plaster", 0x5A5448],
wasignal: ["stone", 0x6A6458, 0xA8A090, "plaster", 0xC0302A], walog: ["wood", 0x7A6A58, 0xC8C0A8, "plaster", 0x5A5448], wabunks: ["wood", 0x7A6A58, 0xA8A090, "plaster", 0x5A5448],
wamess: ["wood", 0x8A6A48, 0xC8B8A0, "plaster", 0x5A5448], waarmoury: ["stone", 0x6A6458, 0x8A8478, "stone", 0x5A5448], wabins: ["wood", 0x7A6A58, 0xA8A090, "plaster", 0x5A5448],
waweather: ["wood", 0x7A6A58, 0xC8D0D8, "plaster", 0x2A6AA8], wamedic: ["tile", 0xE0E0DC, 0xF0F0EC, "tile", 0xC0302A], wakennel: ["stone", 0x8A7A58, 0xB8A890, "plaster", 0x5A5448],
wacaptain: ["wood", 0x6A5A48, 0xA8A090, "plaster", 0xE8B030]
});
EVB_LD.yurt = { theme: "yurt", name: "The Yurt", doors: "the painted door" };
EVB_LD.teahouse = { theme: "teahouse", name: "The Looking-Glass Tea House", doors: "the tea house door" };
EVB_LD.mirrormaze = { theme: "mirrormaze", name: "The Hall of Mirrors", doors: "the mirrored doors" };
EVB_LD.watertower = { theme: "watertower", name: "The Water Tower", doors: "the iron door" };
EVB_LD.soupkitchen = { theme: "soupkitchen", name: "The Soup Kitchen", doors: "the kitchen door" };
EVB_LD.watchtower = { theme: "watchtower", name: "The Guard Tower", doors: "the tower door" };
"use strict";
var evbYuDoor = evbInfo("The ger", "A ger (the Mongolian word; 'yurt' comes from Turkish) is a round tent of felt over a wooden lattice. A family can take one down in about an hour and put it up again in two or three, then load it on camels or a cart. About a third of Mongolians still live in gers, even in the capital, Ulaanbaatar.");
function evbYuStove() { evbTune([262, 330, 392], 400, 0.9); evbSay("🔥 The stove is the heart of the ger. Its fire is never stepped over, nor are rubbish or water thrown into it: the fire is honoured. Out on the treeless steppe the fuel is often dried dung, which burns hot and clean."); }
var evbYuHonour = evbInfo("The place of honour", "The back of the ger, facing the door, is the khoimor, the place of honour, where the eldest sit and guests are seated. The family altar stands there. Walk round the ger clockwise, the way the sun goes, and never lean on the two posts that hold up the crown.");
function evbYuEagle() { return __ZC(367, 73, this, arguments, new.target); }
var evbYuFelt = evbInfo("Felt", "Felt is made without weaving: sheep's wool is laid out, wetted, rolled up in a hide and dragged behind a horse until the fibres lock together. Several layers of felt keep a ger warm at forty degrees below freezing.");
function evbYuFiddle() { evbTune([196, 262, 294, 262, 196], 450, 1.4); evbSay("🎻 The morin khuur, the horse-head fiddle, has two strings, traditionally of horse hair: one of 130 hairs from a stallion, one of 105 from a mare. Its music is on UNESCO's list of the world's living heritage."); }
function evbYuKnuckle() { var F = ["horse", "camel", "sheep", "goat"], f = evbPick(F); evbTune([440, 523], 150, 0.4); evbSay("🦴 You roll the shagai, the sheep's ankle bones. Each lands on one of four sides, called the horse, the camel, the sheep and the goat. Yours shows the <b>" + f + "</b>." + (f === "horse" ? " Horse is lucky!" : "")); }
var evbYuArchery = evbInfo("The archers", "Archery is one of the 'three manly games' of the Naadam festival each July, with wrestling and horse racing, but women compete in archery too. Mongolian bows are made of horn, wood and sinew glued together, and shoot surprisingly far.");
function evbYuKitchen() { evbTune([392, 440], 300, 0.6); evbSay("🍵 Suutei tsai, milk tea with a pinch of salt, is poured for every guest. Take the bowl with your right hand (or both), and don't refuse it: at least have a sip."); }
var evbYuSaddle = evbInfo("Saddles and horses", "Mongolia has more horses than people (over three million of them). Children learn to ride at about four or five. Jockeys in the Naadam horse races are children, and the races can be 25 km long across the open steppe.");
function evbYuWrestle() { evbTune([262, 196, 262], 300, 0.6); evbSay("🤼 The wrestlers do the eagle dance before and after each bout, arms spread like wings. A bout is lost when any part of you but your feet or hands touches the ground."); }
var evbYuStars = evbInfo("The crown window", "The toono, the crown ring at the top of the ger, lets out the smoke and lets in the light. The sunlight moving round the inside of the ger through the day works like a clock. The toono is so important that it is handed down in families.");
var evbYuHerd = evbFact("The herders", ["Mongolian herders keep the 'five snouts': horses, camels, cattle (and yaks), sheep and goats.", "Families move with their animals between summer and winter pastures, two to four times a year.", "A hard winter with deep snow or ice over the grass is called a dzud; whole herds can be lost."]);
function evbYuBeds() { evbTune([392, 330, 262], 500, 1.2); evbSay("🛏️ The beds stand round the lattice walls, piled with felt and quilts. The whole family sleeps in the one round room."); }
var evbYuStory = evbInfo("The storytellers", "Mongolian epic singers could chant tales of heroes for hours, even days, like the story of King Geser. 'The Secret History of the Mongols', written in the 1200s, tells the life of Genghis Khan, who united the tribes of the steppe in 1206.");
function evbTeParty() { return __ZC(367, 74, this, arguments, new.target); }
var evbTeFront = evbInfo("Always tea-time", "In Alice's Adventures in Wonderland (1865) the Hatter has quarrelled with Time, so it is always six o'clock, always tea-time, and there's never time to wash the things. Lewis Carroll was the pen name of Charles Dodgson, a mathematician at Oxford, who first told the story to Alice Liddell and her sisters on a boat trip in 1862.");
function evbTeClocks() { evbTune([1047, 880, 1047, 880], 250, 0.5); evbSay("🕰️ The Hatter's watch tells the day of the month, not the time. It's two days wrong: he buttered the works, and the March Hare says it was the best butter."); }
var evbTeMirror = evbInfo("Through the Looking-Glass", "In the second book (1871) Alice climbs through the mirror over the mantelpiece into the room on the other side, where the books are written backwards and everything is reversed. To read the poem Jabberwocky she has to hold the book up to a looking-glass.");
var evbTeHatter = evbInfo("The Hatter's workshop", "The ticket on the Hatter's hat says 10/6: ten shillings and sixpence, the price. People say 'mad as a hatter' because hat-makers were poisoned by the mercury used to make felt, which could make them shake and act strangely.");
function evbTeDormouse() { evbTune([392, 330], 600, 1.4); evbSay("💤 The Dormouse is asleep in the teapot, and murmurs a story about three sisters who lived at the bottom of a treacle well. Real dormice can sleep through half the year."); }
function evbTeCakes() { evbTune([523, 784, 1047], 200, 0.6); evbSay("🍰 A little cake marked EAT ME in currants. Alice ate one and grew so tall her head hit the ceiling. You nibble a crumb, just to be safe, and stay just as you are."); }
function evbTeBottles() { evbTune([1047, 784, 523], 200, 0.6); evbSay("🧪 A bottle labelled DRINK ME. Alice checked it wasn't marked 'poison' first, which was wise. It tasted of cherry tart, custard, pine-apple, roast turkey, toffee and hot buttered toast, and she shrank to ten inches high. You leave the cork in."); }
var evbTeBackwards = evbInfo("The backwards room", "In the Looking-Glass world you have to walk away from a place to reach it, and run as fast as you can just to stay where you are (the Red Queen says so). The White Queen lives backwards: she screams before she pricks her finger.");
function evbTeKitchen() { return __ZC(367, 75, this, arguments, new.target); }
var evbTeChess = evbInfo("The chessboard garden", "The whole of Through the Looking-Glass is a game of chess: the countryside is laid out in squares divided by brooks and hedges, and Alice starts as a white pawn. When she reaches the eighth square, she becomes a queen.");
function evbTeQueen() { evbTune([392, 392, 523], 300, 0.6); evbSay("👑 The Red Queen: “Now, here, you see, it takes all the running you can do, to keep in the same place.” Scientists borrowed her name for an idea: living things must keep changing just to keep up with each other."); }
function evbTeTwins() { evbTune([523, 523, 659, 659], 200, 0.5); evbSay("🎭 Tweedledum and Tweedledee: “Contrariwise, if it was so, it might be; and if it were so, it would be; but as it isn't, it ain't. That's logic.”"); }
function evbTePoems() { return __ZC(367, 76, this, arguments, new.target); }
function evbTeCaterpillar() { evbTune([262, 294, 262], 500, 1.0); evbSay("🐛 “Who are YOU?” asks the Caterpillar, sitting on a mushroom. A real caterpillar changes into a butterfly inside a chrysalis, breaking its body down and building a new one."); }
function evbTeCat() { evbTune([659, 523], 400, 0.8); evbSay("😸 The Cheshire Cat fades away, starting with the end of its tail and ending with the grin, which stays some time after the rest of it has gone. “We're all mad here.”"); }
var evbMmEntry = evbInfo("The hall of mirrors", "The most famous Hall of Mirrors is at the Palace of Versailles, built for King Louis XIV in 1678 to 1684, with 357 mirrors. In those days a big mirror was a great luxury, and France had to steal the secret of making them from the glassmakers of Venice.");
function evbMmMaze() { return __ZC(367, 77, this, arguments, new.target); }
var evbMmCorr = evbInfo("How a mirror works", "A mirror is glass with a thin layer of metal behind it (silver or aluminium) that bounces almost all the light straight back. Light always leaves a mirror at the same angle it hits it, like a ball bouncing off a wall.");
function evbMmInfinity() { evbTune([523, 659, 784, 1047, 1319], 300, 1.4); evbSay("♾️ Two mirrors face each other and you see yourself again and again, smaller and smaller, curving away. It isn't truly endless: each mirror swallows a little light, so the far copies grow dim and greenish (the glass is very slightly green)."); }
function evbMmFunny() { return __ZC(367, 78, this, arguments, new.target); }
function evbMmPrism() { evbTune([523, 587, 659, 698, 784, 880, 988], 150, 0.6); evbSay("🌈 White light goes into the prism and comes out as a rainbow. In 1666 Isaac Newton showed that white light is all the colours mixed, by splitting it with one prism and joining it again with another."); }
function evbMmKaleido() { evbTune([784, 988, 1175], 200, 0.6); evbSay("🔮 You turn the kaleidoscope and the coloured beads tumble into a new star. Inside, mirrors set at an angle repeat one little wedge all the way round. David Brewster invented it in 1816; the name is Greek for 'look at beautiful shapes'."); }
var evbMmPeriscope = evbInfo("The periscope", "A periscope is two mirrors at the ends of a tube, both tilted at 45 degrees: light comes in at the top, bounces down, and bounces out to your eye at the bottom. Submarines use them to see above the waves; people in crowds use them to see over heads.");
var evbMmLenses = evbInfo("Lenses", "A lens bends light instead of bouncing it. A lens that bulges in the middle (convex) brings light together: magnifying glasses and the lens in your eye. One that's thinner in the middle (concave) spreads light out: glasses for people who are short-sighted.");
function evbMmCamera() { return __ZC(367, 79, this, arguments, new.target); }
var evbMmGhost = evbInfo("Pepper's Ghost", "A sheet of clear glass, tilted at 45 degrees, reflects a brightly lit actor hidden off to the side, so a see-through 'ghost' seems to float on the stage. John Henry Pepper made it famous in London in 1862. Theme parks and concerts still use the trick.");
function evbMmLeft() { evbTune([523, 659], 200, 0.4); evbSay("🫲 Raise your right hand: your reflection raises its left. Or does it? The mirror doesn't swap left and right at all: it swaps front and back. The hand on the east side is still on the east side."); }
var evbMmRainbow = evbInfo("The rainbow room", "The colours of a rainbow always come in the same order: red, orange, yellow, green, blue, indigo, violet. Newton chose seven colours to match the seven notes of a musical scale. Red light has the longest waves, violet the shortest.");
var evbMmAlice = evbInfo("Alice's looking-glass", "Lewis Carroll wondered what was on the other side of a mirror. When a young cousin, Alice Raikes, held an orange in her right hand in front of a mirror and said the girl in the glass held it in her left, he said it gave him the idea for Through the Looking-Glass.");
var evbMmTelescope = evbInfo("The mirror telescope", "The biggest telescopes use mirrors, not lenses, to gather light: Isaac Newton built the first one in 1668. The James Webb Space Telescope's mirror is 6.5 m across, made of 18 gold-coated pieces that unfolded in space like a flower.");
function evbMmShop() { evbTune([659, 784, 880], 250, 0.5); evbSay("🛍️ Hand mirrors, compact mirrors, a mirror shaped like a moon. The oldest mirrors we know were polished pieces of obsidian, a black volcanic glass, made in Anatolia about 8,000 years ago."); }
var evbWtDoor = evbInfo("The water tower", "A water tower holds water high up so that gravity pushes it through the pipes: every 10 m of height gives about one more 'atmosphere' of pressure. That's why towers stand on the highest ground, and why the top floors of tall buildings need their own pumps.");
function evbWtTank() { return __ZC(367, 80, this, arguments, new.target); }
function evbWtPump() { evbTune([262, 262, 262], 400, 0.5); evbSay("⚙️ You work the pump handle. A hand pump lifts water by drawing up a piston: it can only 'suck' water up about 10 m, because it's really the weight of the air pressing down on the water that pushes it up the pipe."); }
var evbWtFilter = evbInfo("The filter beds", "Slow sand filters clean water by letting it trickle through a metre of sand. The top layer becomes a living skin of tiny creatures that eat germs. London began using them in 1829, and many towns still do: they need no electricity at all.");
var evbWtRain = evbInfo("The rain catchers", "Every square metre of roof catches a litre of water for every millimetre of rain. A small roof in a shower can fill a barrel. The first rain off a roof is the dirtiest, so good collectors let it run to waste before filling the tank.");
var evbWtGauge = evbInfo("The gauges", "Engineers measure how much water is used, where the pipes leak, and how high the tank stands. In many cities a fifth or more of the clean water is lost through leaking pipes before it reaches a tap.");
function evbWtLab() { return __ZC(367, 81, this, arguments, new.target); }
var evbWtStore = evbInfo("The bottle store", "Water stored in clean, closed containers, out of the sun, keeps for months. Old sailors' water went green and foul on long voyages, and Royal Navy ships also carried lime juice against scurvy.");
var evbWtMap = evbInfo("The map of the wells", "In 1854 a doctor called John Snow marked on a map of Soho in London every house where someone had died of cholera. The deaths clustered round one water pump in Broad Street. He had its handle taken off, and the outbreak ended: the start of the science of epidemiology.");
function evbWtWorkshop() { evbTune([523, 523, 659], 200, 0.5); evbSay("🔧 Pipes, joints, a spanner as long as your arm. The Romans built aqueducts over 400 km long to bring water to their cities; some still carry water today."); }
function evbWtKeeper() { evbTune([392, 330], 400, 0.8); evbSay("📒 The keeper's logbook: every day's level, every day's rain, every repair. In the Wasteland, whoever keeps the water keeps the peace."); }
var evbWtGarden = evbInfo("The drip garden", "Drip irrigation feeds water a drop at a time to the root of each plant, through pipes with tiny holes, so almost none is wasted. It was developed in Israel in the 1960s and now feeds crops in deserts round the world.");
var evbWtDew = evbInfo("The dew nets", "Fog nets catch water from the air: fine mesh strung up on foggy hills, where droplets gather, drip down and run into a trough. Villages in the Atacama Desert in Chile and in Morocco get drinking water this way.");
function evbWtBunks() { evbTune([392, 330, 262], 500, 1.0); evbSay("🛏️ Three bunks for the night watch. Somebody always sleeps in the tower: the water is never left alone."); }
var evbSkQueue = evbInfo("The soup kitchen", "Soup kitchens have fed hungry people for hundreds of years. During the Great Depression of the 1930s, queues for free soup and bread stretched round city blocks. A kitchen's rule is old and simple: nobody is turned away.");
function evbSkServe() { return __ZC(367, 82, this, arguments, new.target); }
var evbSkNotice = evbFact("The notice wall", ["NEEDED: anyone who can mend boots. Ask for Ma Tully.", "FOUND: one grey cat, answers to Biscuit. Now lives in the kitchen.", "Saturday: haircuts free, at the back.", "The water tower says: no washing of carts this week, please."]);
var evbSkHall = evbInfo("The long tables", "Eating together is one of the oldest things people do. Sikh gurdwaras run a langar, a free kitchen where everyone sits on the floor side by side, whoever they are; the Golden Temple at Amritsar feeds around 100,000 people a day.");
var evbSkPots = evbInfo("The cauldrons", "Soup stretches food: a few vegetables, a handful of beans or barley and a bone can feed a crowd. The old story of 'stone soup' tells of travellers who start a soup with just a stone, and the villagers each add something until there's a feast.");
function evbSkBread() { evbTune([392, 523], 300, 0.6); evbSay("🍞 You knead the dough. Bread rises because yeast, a tiny living fungus, eats the sugar in the flour and breathes out bubbles of gas."); }
var evbSkStore = evbInfo("The ration store", "Rationing shares out food fairly when there isn't enough. In Britain during the Second World War each person got a weekly ration, for example one egg, 2 oz of butter and 4 oz of bacon. Many people ate more healthily than before the war.");
var evbSkVeg = evbFact("The vegetable room", ["Potatoes, carrots, onions and cabbages keep for months in a cool, dark place.", "Beans and lentils are cheap, keep for years when dry, and are full of protein.", "A potato can grow from a piece that has an 'eye' on it."]);
function evbSkWash() { evbTune([659, 659, 523], 200, 0.4); evbSay("🧽 You wash, someone dries, someone stacks. A kitchen runs on the washing-up."); }
var evbSkWater = evbInfo("The water barrels", "The water comes down from the tower each morning. Every drop is boiled before it goes in the soup, and the water from washing the vegetables waters the rooftop garden.");
function evbSkKids() { evbTune([523, 587, 659, 784], 200, 0.5); evbSay("🧒 Crayons, a stack of picture books and a bowl of soup each. The children's table is the noisiest table in the hall."); }
var evbSkClinic = evbInfo("The first aid room", "Wash a cut with clean water and cover it. Keep a burn under cool running water for twenty minutes. And if someone is badly hurt, send for help first. (Here, it's Doc Amsel, at the back.)");
function evbSkSwap() { evbTune([523, 659], 200, 0.4); evbSay("🔁 Boots for a blanket, a pan for a book. In the swap shop, nothing is bought and nothing is wasted."); }
var evbSkGarden = evbInfo("The rooftop garden", "Even a roof can grow food: tomatoes, beans, herbs and potatoes in buckets and old tyres. During the Second World War, Britons dug up parks and lawns to 'Dig for Victory'.");
function evbSkCook() { evbTune([392, 440, 494], 300, 0.6); evbSay("👩‍🍳 The cook's book of recipes, every one written for fifty people. Page one says: 'Taste it before you serve it.'"); }
function evbSkSleep() { evbTune([392, 330, 262], 500, 1.2); evbSay("🛏️ Cots in rows, a blanket each, and a lamp left on low. Anyone with nowhere to go tonight can sleep here."); }
var evbWaGate = evbInfo("The guard tower", "Watchtowers are as old as walls. The Romans built a tower every third of a mile along Hadrian's Wall in northern Britain. The Great Wall of China had about 25,000 of them, and passed messages along by smoke and fire signals.");
function evbWaLookout() { return __ZC(367, 83, this, arguments, new.target); }
function evbWaRadio() { return __ZC(367, 84, this, arguments, new.target); }
var evbWaMaps = evbInfo("The map room", "On a map the contour lines join places of the same height: lines close together mean a steep slope. A watch needs to know where the high ground is, and where anyone approaching could be hidden from view.");
function evbWaSignal() { evbTune([784, 0, 784, 784], 250, 0.4); evbSay("📡 In Morse code, SOS is three short, three long, three short: · · · — — — · · ·. It was chosen because it's easy to send and hard to mistake, not because it stands for anything."); }
var evbWaLog = evbInfo("The watch log", "Every hour the watch writes the time, the weather, and anything seen. Ships' logs were kept the same way, and are so detailed that scientists now use old ones to study the weather of the past.");
function evbWaBunks() { evbTune([392, 330, 262], 500, 1.0); evbSay("🛏️ Bunks for the off-watch. The watch changes every four hours, as on a ship."); }
function evbWaMess() { evbTune([523, 659], 250, 0.6); evbSay("🍲 Soup from the kitchen, carried up in a can, and hot tea. The watch eats together between shifts."); }
var evbWaArmoury = evbInfo("The kit store", "Rope, lanterns, water bottles, a first aid kit, spare boots, a compass. The first rule of the Wasteland: never go out without water and never go out alone.");
var evbWaBins = evbInfo("Binoculars", "Binoculars are two small telescopes side by side, with prisms inside to fold the light and turn the picture the right way up. '8x30' means things look eight times closer, through lenses 30 mm across.");
var evbWaWeather = evbFact("The weather station", ["A barometer measures air pressure: falling pressure usually means bad weather is coming.", "A wind vane points to where the wind comes FROM: a north wind blows from the north.", "In a dry desert the temperature can drop by over 20 degrees between afternoon and night, because there are no clouds to keep the heat in."]);
var evbWaMedic = evbInfo("The medic's room", "The medic's kit: clean bandages, a splint, water, and the rule 'first, do no harm'. The Red Cross and Red Crescent, founded in 1863, protect medics who help anyone who is hurt, on any side.");
function evbWaKennel() { evbTune([523, 659, 523], 150, 0.4); evbSay("🐕 Rusty, the tower's dog, thumps his tail. A dog can hear sounds four times further away than a person, and smell far better: the best night watch there is."); }
var evbWaCaptain = evbInfo("The captain's room", "The captain decides who stands watch, when the gates open and close, and who to send for help. The best captains, the settlers say, are the ones who listen first.");
"use strict";
evbRooms({
yudoor: { sides: ["evb_khana", "footchest", "evb_khana", "evb_bows"], far: ["evb_khana", "evb_khana"], gap: 3, acts: [[0.35, 0, 2.0, "The ger", "read", evbYuDoor]] },
yustove: { mid: [["evb_gerstove", 0.5, 0]], sides: ["evb_khana", "pelt", "evb_khana", "pelt"], acts: [[0.4, 0, 2.0, "The stove", "warm your hands", evbYuStove]] },
yuring: { far: ["evb_khana", "evb_khana", "evb_khana", "evb_khana"] },
yuhonour: { far: ["altarinside"], mid: [["evb_gerstove", 0.4, 0], ["evb_shagai", 0.65, 0], ["evb_morin", 0.85, 0.3]], grid: ["footchest", 2, 4, "-u", 0.15, 0.3], ceil: "lantern", sides: ["evb_khana", "footchest", "evb_morin", "footchest", "evb_khana"],
acts: [[0.75, 0, 2.2, "The place of honour", "read", evbYuHonour]] },
yueagle: { mid: [["evb_eagle", 0.55, 0]], sides: ["evb_khana", "pelt", "evb_bows"], acts: [[0.45, 0, 1.8, "The golden eagle", "fly her", evbYuEagle]] },
yufelt: { grid: ["pelt", 2, 2], sides: ["evb_khana", "loom", "evb_khana"], acts: [[0.5, 0, 1.8, "Felt", "read", evbYuFelt]] },
yufiddle: { mid: [["evb_morin", 0.55, 0]], sides: ["pelt", "evb_khana", "pelt"], acts: [[0.45, 0, 1.8, "The horse-head fiddle", "play", evbYuFiddle]] },
yuknuckle: { mid: [["evb_shagai", 0.5, 0]], sides: ["pelt", "evb_khana", "pelt", "evb_khana"], acts: [[0.45, 0, 1.8, "Knucklebones", "roll them", evbYuKnuckle]] },
yuarchery: { far: ["evb_bows", "evb_bows"], sides: ["evb_bows", "evb_khana", "weaponrack"], acts: [[0.5, 0, 1.8, "The archers", "read", evbYuArchery]] },
yukitchen: { far: ["stove", "evb_khana"], sides: ["footchest", "shelfgoods", "barrel", "footchest"], mid: [["evb_shagai", 0.5, 0]], acts: [[0.5, 0, 1.8, "Milk tea", "have a bowl", evbYuKitchen]] },
yusaddle: { sides: ["trsaddles", "evb_khana", "trsaddles", "footchest"], acts: [[0.5, 0, 1.8, "The saddles", "read", evbYuSaddle]] },
yuwrestle: { mid: [["pelt", 0.5, 0]], sides: ["evb_khana", "benchin", "evb_khana", "benchin"], acts: [[0.5, 0, 1.8, "The wrestlers", "watch", evbYuWrestle]] },
yustars: { sides: ["pelt", "evb_khana", "pelt"], mid: [["estelescope", 0.55, 0]], acts: [[0.5, 0, 1.8, "The crown window", "read", evbYuStars]] },
yuherd: { sides: ["trhay", "evb_khana", "trtrough", "evb_khana"], acts: [[0.5, 0, 1.8, "The herds", "read", evbYuHerd]] },
yubeds: { far: ["bed", "bed"], sides: ["footchest", "evb_khana", "footchest", "bed"], acts: [[0.5, 0, 1.8, "The beds", "rest", evbYuBeds]] },
yustory: { mid: [["evb_gerstove", 0.55, 0]], grid: ["pelt", 1, 3, "-u", 0.3, 0.3], sides: ["evb_khana", "evb_morin", "evb_khana"], acts: [[0.45, 0, 1.8, "The storytellers", "listen", evbYuStory]] }
});
evbRooms({
tefront: { grid: ["table", 2, 2], sides: ["evb_hatstand", "clock", "evb_bigteapot", "clock"], ceil: "chandelier", acts: [[0.35, 0, 2.0, "Always tea-time", "read", evbTeFront]] },
teclocks: { sides: ["clock", "clock", "clock", "clock"], acts: [[0.5, 0, 1.8, "The Hatter's watch", "look", evbTeClocks]] },
temirror: { far: ["wallmirror", "evb_glassstand", "wallmirror", "evb_glassstand"], acts: [[0.5, 0, 1.8, "The looking-glass", "read", evbTeMirror]] },
teparty: { mid: [["evb_teaparty", 0.5, 0], ["armchair", 0.5, 0.28, "-v"], ["armchair", 0.5, -0.28, "+v"]], far: ["evb_bigteapot"], sides: ["evb_hatstand", "clock", "evb_bigteapot", "clock", "evb_hatstand"], ceil: "chandelier",
acts: [[0.5, 0, 2.4, "The Mad Tea Party", "sit down", evbTeParty]] },
tehatter: { far: ["workbench", "dressform"], sides: ["evb_hatstand", "displaycase", "evb_hatstand", "dressform"], acts: [[0.5, 0, 1.8, "The Hatter's workshop", "read", evbTeHatter]] },
tedormouse: { mid: [["evb_bigteapot", 0.55, 0]], sides: ["armchair", "clock", "armchair"], acts: [[0.45, 0, 1.8, "The Dormouse", "listen", evbTeDormouse]] },
tecakes: { mid: [["table", 0.5, 0]], sides: ["displaycase", "counter", "displaycase"], acts: [[0.5, 0, 1.8, "EAT ME", "nibble", evbTeCakes]] },
tebottles: { mid: [["table", 0.5, 0]], sides: ["shelfgoods", "displaycase", "shelfgoods"], acts: [[0.5, 0, 1.8, "DRINK ME", "look", evbTeBottles]] },
tebackwards: { far: ["bookshelf", "clock"], sides: ["wallmirror", "armchair", "wallmirror", "fireplace"], acts: [[0.5, 0, 1.8, "The backwards room", "read", evbTeBackwards]] },
tekitchen: { far: ["stove", "counter"], sides: ["counter", "shelfgoods", "sink", "evb_bigteapot"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The tea caddy", "choose a tea", evbTeKitchen]] },
techess: { mid: [["eschess", 0.5, 0]], grid: ["sg_qn_bush1", 2, 2], sides: ["evb_hatstand", "sg_qn_bush2", "evb_hatstand"], acts: [[0.5, 0, 1.8, "The chessboard", "read", evbTeChess]] },
tequeen: { far: ["throneseat"], sides: ["armchair", "wallmirror", "armchair", "clock"], acts: [[0.6, 0, 1.8, "The Red Queen", "run", evbTeQueen]] },
tetwins: { sides: ["armchair", "armchair", "toys", "toys"], acts: [[0.5, 0, 1.8, "Tweedledum and Tweedledee", "listen", evbTeTwins]] },
tepoems: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "esreading", "bookshelf", "wallmirror"], acts: [[0.5, 0, 1.8, "Jabberwocky", "read", evbTePoems]] },
tecaterpillar: { mid: [["sg_qn_plant3", 0.5, 0]], sides: ["sg_qn_bush1", "armchair", "sg_qn_bush2"], acts: [[0.45, 0, 1.8, "The Caterpillar", "answer him", evbTeCaterpillar]] },
tecat: { sides: ["armchair", "plant", "armchair", "plant"], acts: [[0.5, 0, 1.8, "The Cheshire Cat", "look again", evbTeCat]] }
});
evbRooms({
mmentry: { sides: ["evb_glassstand", "wallmirror", "evb_glassstand", "wallmirror"], far: ["evb_glassstand", "evb_glassstand"], gap: 3, ceil: "chandelier", acts: [[0.35, 0, 2.0, "The hall of mirrors", "read", evbMmEntry]] },
mmmaze: { grid: ["evb_glassstand", 3, 3], sides: ["wallmirror", "wallmirror", "wallmirror", "wallmirror"], acts: [[0.15, 0, 2.0, "The mirror maze", "find the way", evbMmMaze]] },
mmcorr: { sides: ["wallmirror", "wallmirror", "wallmirror", "wallmirror"], acts: [[0.5, 0, 1.8, "How a mirror works", "read", evbMmCorr]] },
mminfinity: { far: ["evb_glassstand", "evb_glassstand", "evb_glassstand"], sides: ["evb_glassstand", "wallmirror", "evb_glassstand", "wallmirror"], mid: [["evb_prism", 0.45, 0]], grid: ["evb_glassstand", 3, 5, "-u", 0.2, 0.8], ceil: "chandelier",
acts: [[0.5, 0, 2.4, "The infinity mirrors", "look in", evbMmInfinity]] },
mmfunny: { far: ["evb_glassstand", "evb_glassstand", "evb_glassstand"], sides: ["evb_glassstand", "wallmirror", "evb_glassstand"], acts: [[0.5, 0, 1.8, "The funny mirrors", "look", evbMmFunny]] },
mmprism: { mid: [["evb_prism", 0.55, 0]], sides: ["evb_prism", "wallmirror", "evb_prism"], acts: [[0.45, 0, 1.8, "The prism", "shine a light", evbMmPrism]] },
mmkaleido: { mid: [["evb_kaleido", 0.55, 0]], sides: ["evb_kaleido", "wallmirror", "evb_kaleido"], acts: [[0.45, 0, 1.8, "The kaleidoscope", "turn it", evbMmKaleido]] },
mmperiscope: { mid: [["evb_kaleido", 0.5, 0]], sides: ["wallmirror", "desk", "wallmirror"], acts: [[0.5, 0, 1.8, "The periscope", "read", evbMmPeriscope]] },
mmlenses: { far: ["displaycase", "displaycase"], sides: ["displaycase", "estelescope", "displaycase"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The lenses", "read", evbMmLenses]] },
mmcamera: { mid: [["table", 0.5, 0]], sides: ["chair", "chair", "chair", "chair"], acts: [[0.5, 0, 1.8, "The camera obscura", "look", evbMmCamera]] },
mmghost: { far: ["evb_glassstand"], sides: ["chair", "candles", "chair", "candles"], acts: [[0.5, 0, 1.8, "Pepper's Ghost", "read", evbMmGhost]] },
mmleft: { far: ["evb_glassstand", "evb_glassstand"], sides: ["wallmirror", "chair", "wallmirror"], acts: [[0.5, 0, 1.8, "The left-right mirror", "raise a hand", evbMmLeft]] },
mmrainbow: { grid: ["evb_prism", 2, 2], sides: ["wallmirror", "plant", "wallmirror"], acts: [[0.5, 0, 1.8, "The rainbow", "read", evbMmRainbow]] },
mmalice: { far: ["fireplace", "wallmirror"], sides: ["armchair", "clock", "armchair", "bookshelf"], acts: [[0.5, 0, 1.8, "Alice's looking-glass", "read", evbMmAlice]] },
mmtelescope: { mid: [["estelescope", 0.55, 0]], sides: ["esglobe", "maptable", "estelescope"], acts: [[0.45, 0, 1.8, "The mirror telescope", "read", evbMmTelescope]] },
mmshop: { far: ["counter", "till"], sides: ["displaycase", "wallmirror", "displaycase", "wallmirror"], acts: [[0.5, 0, 1.8, "The looking-glass shop", "browse", evbMmShop]] }
});
evbRooms({
wtdoor: { sides: ["pipes", "evb_tank", "pipes", "barrel"], far: ["pipes", "pipes"], gap: 3, ceil: "lantern", acts: [[0.35, 0, 2.0, "The water tower", "read", evbWtDoor]] },
wtpipes: { sides: ["pipes", "pipes", "pipes", "pipes"] },
wtcatwalk: { far: ["pipes", "barrel", "pipes", "barrel"] },
wttank: { mid: [["evb_tank", 0.4, -0.25], ["evb_tank", 0.4, 0.25], ["evb_tank", 0.75, 0]], grid: ["barrel", 2, 4, "-u", 0.12, 0.25], sides: ["pipes", "boiler", "pipes", "barrel"], ceil: "lantern", acts: [[0.55, 0, 2.4, "The great tank", "look", evbWtTank]] },
wtpump: { mid: [["machine", 0.55, 0]], sides: ["pipes", "flywheel", "pipes"], acts: [[0.45, 0, 1.8, "The hand pump", "pump", evbWtPump]] },
wtfilter: { grid: ["barrel", 2, 3], sides: ["pipes", "evb_tank", "pipes"], acts: [[0.5, 0, 1.8, "The filter beds", "read", evbWtFilter]] },
wtrain: { grid: ["barrel", 2, 2], sides: ["pipes", "evb_tank", "pipes"], acts: [[0.5, 0, 1.8, "The rain catchers", "read", evbWtRain]] },
wtgauge: { far: ["machine", "pipes"], sides: ["pipes", "noticeboard", "pipes"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The gauges", "read", evbWtGauge]] },
wtlab: { far: ["counter", "sink"], sides: ["shelfgoods", "counter", "shelfgoods"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The testing bench", "test the water", evbWtLab]] },
wtstore: { grid: ["evb_rations", 1, 2], sides: ["barrel", "crates", "barrel", "crates"], acts: [[0.5, 0, 1.8, "The bottle store", "read", evbWtStore]] },
wtmap: { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "noticeboard", "mapchest"], acts: [[0.5, 0, 1.8, "The map of the wells", "read", evbWtMap]] },
wtworkshop: { far: ["workbench", "pipes"], sides: ["workbench", "weaponrack", "workbench", "crates"], acts: [[0.5, 0, 1.8, "The workshop", "read", evbWtWorkshop]] },
wtkeeper: { far: ["bed"], sides: ["desk", "bookshelf", "chair", "lantern"], acts: [[0.5, 0, 1.8, "The keeper's log", "read", evbWtKeeper]] },
wtgarden: { grid: ["plant", 2, 3], sides: ["barrel", "pipes", "barrel"], acts: [[0.5, 0, 1.8, "The drip garden", "read", evbWtGarden]] },
wtdew: { far: ["pipes", "barrel"], sides: ["barrel", "pipes", "barrel"], grid: ["evb_tank", 1, 1], acts: [[0.5, 0, 1.8, "The dew nets", "read", evbWtDew]] },
wtbunks: { far: ["bunk", "bunk"], sides: ["bunk", "eslockers", "footchest"], acts: [[0.5, 0, 1.8, "The bunks", "rest", evbWtBunks]] }
});
evbRooms({
skqueue: { sides: ["benchin", "noticeboard", "benchin", "barrel"], far: ["counter", "counter"], gap: 2.5, acts: [[0.35, 0, 2.0, "The soup kitchen", "read", evbSkQueue]] },
skserve: { far: ["counter", "evb_cauldron", "counter", "evb_cauldron"], acts: [[0.5, 0, 1.8, "The serving line", "serve", evbSkServe]] },
sknotice: { far: ["noticeboard", "noticeboard", "noticeboard"], acts: [[0.5, 0, 1.8, "The notice wall", "read", evbSkNotice]] },
skhall: { grid: ["longtable", 2, 5, "-u", 0.3, 0.75], sides: ["benchin", "barrel", "benchin", "evb_rations"], far: ["counter"], ceil: "lantern", acts: [[0.5, 0, 2.4, "The long tables", "read", evbSkHall]] },
skpots: { grid: ["evb_cauldron", 1, 3, "-u", 0.55, 0.55], sides: ["counter", "shelfgoods", "counter"], acts: [[0.5, 0, 1.8, "The cauldrons", "stir", evbSkPots]] },
skbread: { far: ["oven", "oven"], sides: ["trbreadrack", "counter", "trbreadrack"], mid: [["longtable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The bread", "knead it", evbSkBread]] },
skstore: { sides: ["evb_rations", "evb_rations", "evb_rations", "crates"], grid: ["crates", 2, 2], acts: [[0.5, 0, 1.8, "The ration store", "read", evbSkStore]] },
skveg: { grid: ["crates", 2, 2], sides: ["barrel", "shelfgoods", "barrel"], mid: [["butcherblock", 0.5, 0]], acts: [[0.5, 0, 1.8, "The vegetables", "read", evbSkVeg]] },
skwash: { far: ["sink", "sink"], sides: ["counter", "shelfgoods", "counter"], acts: [[0.5, 0, 1.8, "The washing-up", "help", evbSkWash]] },
skwater: { grid: ["barrel", 2, 3], sides: ["evb_tank", "pipes"], acts: [[0.5, 0, 1.8, "The water barrels", "read", evbSkWater]] },
skkids: { grid: ["xp_kidtable", 1, 2], sides: ["toys", "bookshelf", "toys"], acts: [[0.5, 0, 1.8, "The children's table", "sit", evbSkKids]] },
skclinic: { far: ["hospitalbed"], sides: ["filecabinet", "counter", "shelfgoods", "chair"], acts: [[0.5, 0, 1.8, "First aid", "read", evbSkClinic]] },
skswap: { sides: ["shelfgoods", "crates", "shelfgoods", "wardrobe"], mid: [["longtable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The swap shop", "swap", evbSkSwap]] },
skgarden: { grid: ["plant", 2, 3], sides: ["barrel", "plant", "barrel"], acts: [[0.5, 0, 1.8, "The rooftop garden", "read", evbSkGarden]] },
skcook: { far: ["bed"], sides: ["desk", "bookshelf", "chair", "shelfgoods"], acts: [[0.5, 0, 1.8, "The recipe book", "read", evbSkCook]] },
sksleep: { grid: ["cot", 2, 3], sides: ["footchest", "lantern"], acts: [[0.5, 0, 1.8, "The night shelter", "rest", evbSkSleep]] }
});
evbRooms({
wagate: { sides: ["evb_sandbags", "weaponrack", "evb_sandbags", "lantern"], far: ["evb_sandbags", "evb_sandbags"], gap: 3, acts: [[0.35, 0, 2.0, "The guard tower", "read", evbWaGate]] },
wastair: { sides: ["evb_sandbags", "lantern", "evb_sandbags", "lantern"] },
wawall: { far: ["evb_sandbags", "evb_sandbags", "evb_sandbags", "evb_sandbags"] },
walookout: { mid: [["evb_searchlight", 0.6, 0]], far: ["evb_sandbags", "evb_sandbags", "evb_sandbags"], sides: ["evb_sandbags", "estelescope", "evb_sandbags", "maptable"], grid: ["evb_searchlight", 1, 3, "-u", 0.85, 0.85],
acts: [[0.5, 0, 2.4, "The lookout", "keep watch", evbWaLookout]] },
waradio: { far: ["homeradio", "desk"], sides: ["filecabinet", "noticeboard", "chair"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The radio", "call in", evbWaRadio]] },
wamaps: { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "noticeboard", "mapchest"], acts: [[0.5, 0, 1.8, "The maps", "read", evbWaMaps]] },
wasignal: { mid: [["evb_searchlight", 0.55, 0]], sides: ["homeradio", "desk"], acts: [[0.45, 0, 1.8, "The signal lamp", "send SOS", evbWaSignal]] },
walog: { far: ["bookshelf", "filecabinet"], sides: ["desk", "chair", "lantern"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The watch log", "read", evbWaLog]] },
wabunks: { far: ["bunk", "bunk"], sides: ["bunk", "eslockers", "bunk", "footchest"], acts: [[0.5, 0, 1.8, "The bunks", "rest", evbWaBunks]] },
wamess: { grid: ["table", 1, 2], sides: ["stove", "counter", "shelfgoods"], acts: [[0.5, 0, 1.8, "The mess", "eat", evbWaMess]] },
waarmoury: { sides: ["eslockers", "crates", "eslockers", "shelfgoods"], acts: [[0.5, 0, 1.8, "The kit store", "read", evbWaArmoury]] },
wabins: { mid: [["estelescope", 0.55, 0]], sides: ["evb_sandbags", "chair"], acts: [[0.45, 0, 1.8, "The binoculars", "read", evbWaBins]] },
waweather: { far: ["machine", "noticeboard"], sides: ["desk", "esglobe"], acts: [[0.5, 0, 1.8, "The weather station", "read", evbWaWeather]] },
wamedic: { far: ["hospitalbed"], sides: ["shelfgoods", "counter", "chair"], acts: [[0.5, 0, 1.8, "The medic", "read", evbWaMedic]] },
wakennel: { sides: ["pelt", "trtrough", "pelt"], acts: [[0.5, 0, 1.8, "Rusty", "say hello", evbWaKennel]] },
wacaptain: { far: ["desk"], sides: ["bookshelf", "maptable", "armchair", "bed"], acts: [[0.5, 0, 1.8, "The captain", "read", evbWaCaptain]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM;
var P = {}, WH = 0xE8ECF0, GR = 0x9AA4AE;
P.evb_hydro = function () {
var g = G(), fr = M(WH);
[-0.6, 0.6].forEach(function (x) { B(g, fr, 0.05, 1.9, 0.5, x, 0.95, 0); });
for (var r = 0; r < 3; r++) {
B(g, M(0x3A4A5A), 1.2, 0.08, 0.5, 0, 0.35 + r * 0.6, 0);
for (var i = 0; i < 5; i++)
S(g, M(0x3AA84A), 0.09, -0.48 + i * 0.24, 0.47 + r * 0.6, 0, 8).scale.set(1, 0.7, 1);
B(g, evbGlow(0xE070E0, 0.85), 1.1, 0.02, 0.08, 0, 0.78 + r * 0.6, 0);
}
return g;
};
P.evb_suit = function () {
var g = G(), wt = M(0xF4F4F0);
Cy(g, M(GR), 0.3, 0.35, 0.06, 0, 0.03, 0, 12);
[-0.13, 0.13].forEach(function (x) { Cy(g, wt, 0.1, 0.11, 0.8, x, 0.45, 0, 10); });
var b = B(g, wt, 0.55, 0.7, 0.35, 0, 1.2, 0);
B(g, M(0xC0C4C8), 0.5, 0.6, 0.25, 0, 1.2, -0.28);
[-0.36, 0.36].forEach(function (x) { Cy(g, wt, 0.08, 0.08, 0.65, x, 1.15, 0, 8); });
S(g, wt, 0.22, 0, 1.75, 0, 14);
S(g, M(0xD8A830, null, { e: 0x2A1A00 }), 0.17, 0, 1.76, 0.08, 12).scale.set(1, 0.8, 0.6);
B(g, M(0x2A6AA8), 0.12, 0.08, 0.02, -0.12, 1.4, 0.18);
B(g, M(0xC0302A), 0.08, 0.06, 0.02, 0.12, 1.4, 0.18);
return g;
};
P.evb_microscope = function () {
var g = G(), wt = M(WH), bk = M(0x2A2E34);
B(g, M(0x8A9098), 1.4, 0.9, 0.7, 0, 0.45, 0);
B(g, M(0x2A2E34), 1.42, 0.04, 0.72, 0, 0.92, 0);
B(g, bk, 0.22, 0.04, 0.28, 0, 0.96, 0);
var arm = B(g, wt, 0.06, 0.4, 0.06, 0, 1.16, -0.1);
arm.rotation.x = 0.2;
Cy(g, bk, 0.035, 0.04, 0.3, 0, 1.32, 0, 8).rotation.x = -0.4;
B(g, wt, 0.16, 0.03, 0.16, 0, 1.06, 0.02);
[0.45, 0.55].forEach(function (x, i) { Cy(g, M([0x3AA8E0, 0xE8B030][i], null, { op: 0.75 }), 0.04, 0.04, 0.16, x, 1.02, 0.15, 8); });
return g;
};
P.evb_specimen = function () {
var g = G();
Cy(g, M(GR), 0.3, 0.32, 0.4, 0, 0.2, 0, 14);
Cy(g, M(0xD8F0F8, null, { op: 0.35 }), 0.27, 0.27, 1.0, 0, 0.9, 0, 14);
Cy(g, M(GR), 0.3, 0.3, 0.08, 0, 1.44, 0, 14);
for (var i = 0; i < 5; i++) {
var a = i * 1.25, s = Cy(g, evbGlow(0x60F0B0, 0.9), 0.02, 0.03, 0.6, Math.cos(a) * 0.08, 0.7, Math.sin(a) * 0.08, 6);
s.rotation.z = Math.cos(a) * 0.3;
S(g, evbGlow(0xB070F0, 0.9), 0.05, Math.cos(a) * 0.16, 1.0, Math.sin(a) * 0.16, 8);
}
return g;
};
P.evb_radar = function () {
var g = G();
B(g, M(0x3A4048), 1.2, 0.9, 0.7, 0, 0.45, 0);
var top = B(g, M(0x2A2E34), 1.2, 0.05, 0.7, 0, 0.92, 0.02);
top.rotation.x = -0.25;
var sc = Cy(g, M(0x0A2A14, null, { e: 0x062010 }), 0.28, 0.28, 0.02, 0, 0.96, 0.05, 20);
sc.rotation.x = Math.PI / 2 - 0.25;
B(g, evbGlow(0x40F070, 0.9), 0.02, 0.01, 0.27, 0.07, 0.98, 0.05).rotation.y = 0.6;
[[0.1, 0.1], [-0.12, -0.05], [0.05, -0.15]].forEach(function (p) { S(g, evbGlow(0x80FF90), 0.015, p[0], 0.98, 0.05 + p[1], 6); });
for (var i = 0; i < 5; i++)
B(g, evbGlow([0xE8B030, 0x40C0F0, 0xF04040, 0x40F070, 0xE8B030][i], 0.85), 0.05, 0.02, 0.05, -0.45 + i * 0.05 + (i > 2 ? 0.7 : 0), 0.96, 0.25);
return g;
};
P.evb_rover = function () {
var g = G(), wt = M(WH), bk = M(0x2A2E34);
B(g, wt, 1.3, 0.3, 0.9, 0, 0.6, 0);
B(g, M(0xD8A830), 1.2, 0.03, 0.8, 0, 0.76, 0);
[-0.5, 0, 0.5].forEach(function (z) { [-0.6, 0.6].forEach(function (x) { Cy(g, bk, 0.2, 0.2, 0.14, x, 0.2, z, 12).rotation.z = Math.PI / 2; }); });
Cy(g, M(GR), 0.03, 0.03, 0.8, 0.3, 1.15, -0.2, 6);
B(g, wt, 0.25, 0.15, 0.15, 0.3, 1.6, -0.2);
S(g, M(0x2A2E34), 0.04, 0.3, 1.6, -0.11, 8);
var arm = Cy(g, M(GR), 0.025, 0.025, 0.6, -0.4, 0.85, 0.55, 6);
arm.rotation.x = 1.1;
return g;
};
P.evb_shuttle = function () {
var g = G(), wt = M(0xF4F4F0), bk = M(0x2A2E34);
var b = Cy(g, wt, 0.55, 0.6, 3.6, 0, 0.95, 0, 14);
b.rotation.x = Math.PI / 2;
var n = Co(g, wt, 0.55, 1.0, 0, 0.95, 2.3, 14);
n.rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { var w = B(g, wt, 1.3, 0.08, 1.4, s * 1.0, 0.6, -0.6); w.rotation.y = s * 0.3; B(g, bk, 1.2, 0.02, 0.3, s * 1.05, 0.65, -1.2); });
B(g, bk, 0.08, 1.0, 0.9, 0, 1.6, -1.4);
B(g, M(0x1A2A4A, null, { e: 0x0A1020 }), 0.6, 0.2, 0.4, 0, 1.35, 1.6);
[-0.25, 0.25].forEach(function (x) { Cy(g, M(GR), 0.22, 0.28, 0.4, x, 0.95, -2.0, 10).rotation.x = Math.PI / 2; });
[-0.6, 0.6].forEach(function (x) { Cy(g, bk, 0.04, 0.04, 0.4, x, 0.2, 0.4, 6); });
return g;
};
P.evb_core = function () {
var g = G(), sh = M(0x5A6068);
Cy(g, sh, 1.1, 1.2, 0.3, 0, 0.15, 0, 20);
Cy(g, sh, 0.95, 0.95, 0.15, 0, 3.2, 0, 20);
Cy(g, M(0xC8E8FF, null, { op: 0.4 }), 0.6, 0.6, 2.8, 0, 1.7, 0, 20);
Cy(g, evbGlow(0x40B0FF, 0.85), 0.35, 0.35, 2.7, 0, 1.7, 0, 16);
Cy(g, evbGlow(0xD0F0FF), 0.12, 0.12, 2.7, 0, 1.7, 0, 10);
for (var i = 0; i < 6; i++) {
var a = i * 1.047;
Cy(g, sh, 0.06, 0.06, 3.0, Math.cos(a) * 0.85, 1.65, Math.sin(a) * 0.85, 6);
}
for (var r = 0; r < 3; r++)
Tor(g, M(0xD8A830), 0.75, 0.04, 0, 0.7 + r * 0.9, 0, Math.PI / 2);
return g;
};
P.evb_planet = function () {
var g = G();
Cy(g, M(0x2A2E34), 0.25, 0.3, 0.06, 0, 0.03, 0, 12);
Cy(g, M(GR), 0.03, 0.03, 0.9, 0, 0.5, 0, 8);
var p = S(g, M(0xD8A060), 0.4, 0, 1.3, 0, 18);
[0xC07840, 0xE8C890, 0xA86030].forEach(function (c, i) { Tor(g, M(c), 0.395 - Math.abs(i - 1) * 0.06, 0.035, 0, 1.3 + (i - 1) * 0.15, 0, Math.PI / 2); });
var rg = Tor(g, M(0xE8D8B0, null, { op: 0.8 }), 0.62, 0.04, 0, 1.3, 0, Math.PI / 2 + 0.4);
return g;
};
P.evb_airlock = function () {
var g = G(), st = M(0x8A9098);
B(g, st, 1.6, 2.4, 0.15, 0, 1.2, 0);
B(g, M(0x5A6068), 1.2, 2.0, 0.05, 0, 1.1, 0.08);
for (var i = 0; i < 6; i++) {
var s = B(g, M(i % 2 ? 0x1A1A1A : 0xE8B030), 0.25, 0.1, 0.02, -0.65 + i * 0.26, 2.25, 0.09);
s.rotation.z = 0.5;
}
Tor(g, M(0xC0302A), 0.25, 0.035, 0, 1.2, 0.14, 0);
B(g, M(0x40F070, null, { e: 0x104020 }), 0.12, 0.08, 0.02, 0.65, 1.3, 0.09);
return g;
};
P.evb_pod = function () {
var g = G(), wt = M(WH);
B(g, wt, 2.1, 1.0, 1.0, 0, 0.5, 0);
B(g, M(0x2A2E34), 1.9, 0.8, 0.05, 0, 0.55, 0.48);
B(g, M(0x3A6AA8, "damask"), 1.8, 0.15, 0.8, 0, 0.25, 0.05);
B(g, evbGlow(0xFFE0B0, 0.8), 0.2, 0.05, 0.05, 0.7, 0.85, 0.4);
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_hydro", "evb_suit", "evb_microscope", "evb_specimen", "evb_radar", "evb_rover", "evb_shuttle", "evb_core", "evb_planet", "evb_pod"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("biodome", { corner: "espalm", seed: 71, panel: 0xE0ECE4,
pal: { fab: "emerald", fab2: "teal", wood: "white", metal: "chrome", stone: "marble", art: 8, rug: 3, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE8F4EC, "plaster"], "D8D0C0|coffer": [0xD8F0F8, "coffer"] },
hello: "🌿 <b>Inside the biodome.</b> A whole living world under glass: the rainforest, the desert, the seed bank, the pollinators. Everything here keeps everything else alive. Look for the ✨ cards. The way out is the airlock at the front." });
evbHouse("biodome", { g: EVB_GRID.wide, h: 5.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The dome"], wall: 0xE8F4EC, trim: 0x3A9A4A,
plan: [{ hall: { k: "bdlock", n: "The Airlock" }, spine: { k: "bdpath", n: "The Canopy Path" }, gallery: { k: "bdglass", n: "The Glass Wall" },
back: { merge: EVB_BACK, k: "bdforest", n: "The Rainforest" },
r1i: { k: "bddesert", n: "The Desert Biome" }, r1o: { k: "bdseeds", n: "The Seed Bank" },
r2i: { k: "bdbees", n: "The Pollinators' House" }, r2o: { k: "bdpond", n: "The Wetland" },
r3i: { k: "bdcontrol", n: "The Air and Water Room" }, r3o: { k: "bdcompost", n: "The Compost Room" },
l1i: { k: "bdhydro", n: "The Grow Rooms" }, l1o: { k: "bdkitchen", n: "The Harvest Kitchen" },
l2i: { k: "bdlab", n: "The Botany Lab" }, l2o: { k: "bdbutterfly", n: "The Butterfly House" },
l3i: { k: "bdcold", n: "The Cold Biome" }, l3o: { k: "bdsleep", n: "The Gardeners' Bunks" } }] });
evbTheme("habitat", { corner: "plant", seed: 73, panel: 0xE4E8EC,
pal: { fab: "navy", fab2: "teal", wood: "white", metal: "chrome", stone: "marble", art: 8, rug: 2, rugv: 1 },
remap: { "D6D0C6|plaster": [0xECF0F4, "plaster"], "D8D0C0|coffer": [0xD8DCE0, "coffer"] },
hello: "🛰️ <b>Inside the habitat,</b> a home for people far from Earth: the airlock, the galley, the sleeping pods, the gym, the garden, and the window on the stars. Look for the ✨ cards. The way out is the airlock." });
evbHouse("habitat", { g: EVB_GRID.mid, h: 4.0, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The habitat"], wall: 0xECF0F4, trim: 0x2A6AA8,
plan: [{ hall: { k: "hxlock", n: "The Airlock" }, spine: { k: "hxnode", n: "The Node" }, gallery: { k: "hxtunnel", n: "The Tunnel" },
back: { merge: EVB_BACK, k: "hxcupola", n: "The Cupola, the Window on the Stars" },
r1i: { k: "hxgalley", n: "The Galley" }, r1o: { k: "hxpods", n: "The Sleeping Pods" },
r2i: { k: "hxgym", n: "The Gym" }, r2o: { k: "hxgarden", n: "The Garden" },
r3i: { k: "hxmed", n: "The Medical Bay" }, r3o: { k: "hxwash", n: "The Hygiene Room" },
l1i: { k: "hxsuits", n: "The Suit Room" }, l1o: { k: "hxcomms", n: "The Comms Room" },
l2i: { k: "hxlife", n: "The Life Support Room" }, l2o: { k: "hxstore", n: "The Store" },
l3i: { k: "hxrec", n: "The Rec Room" }, l3o: { k: "hxwork", n: "The Workshop" } }] });
evbTheme("researchlab", { corner: "plant", seed: 75, panel: 0xE8ECF0,
pal: { fab: "teal", fab2: "navy", wood: "white", metal: "chrome", stone: "marble", art: 8, rug: 2, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF0F4F8, "plaster"], "D8D0C0|coffer": [0xE0E4E8, "coffer"] },
hello: "🔬 <b>Inside the research lab.</b> Scientists studying this strange world: its plants, its rocks, its sky. Look down the microscopes, read the cards, and mind the specimens. The way out is the front door." });
evbHouse("researchlab", { g: EVB_GRID.mid, h: 4.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The lab"], wall: 0xF0F4F8, trim: 0x2A8A9A,
plan: [{ hall: { k: "lbfront", n: "The Reception" }, spine: { k: "lbcorr", n: "The Lab Corridor" }, gallery: { k: "lbposters", n: "The Poster Wall" },
back: { merge: EVB_BACK, k: "lbmain", n: "The Main Lab" },
r1i: { k: "lbmicro", n: "The Microscope Room" }, r1o: { k: "lbspecimen", n: "The Specimen Room" },
r2i: { k: "lbrocks", n: "The Rock Lab" }, r2o: { k: "lbclean", n: "The Clean Room" },
r3i: { k: "lbscope", n: "The Telescope Room" }, r3o: { k: "lbmeteor", n: "The Meteorite Room" },
l1i: { k: "lbdata", n: "The Data Room" }, l1o: { k: "lbmaps", n: "The Map Room" },
l2i: { k: "lbcold", n: "The Cold Store" }, l2o: { k: "lbcommon", n: "The Common Room" },
l3i: { k: "lblib", n: "The Library" }, l3o: { k: "lbdirector", n: "The Director's Office" } }] });
evbTheme("controltower", { corner: "plant", seed: 77, panel: 0xD8DCE0,
pal: { fab: "navy", fab2: "charcoal", wood: "white", metal: "chrome", stone: "marble", art: 8, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE0E4E8, "plaster"], "D8D0C0|coffer": [0x3A4048, "coffer"] },
hello: "🗼 <b>Inside the control tower.</b> Every ship that comes and goes from the Orbital is guided from here: the tower cab, the radar, the weather desk, the radio. Look for the ✨ cards. The way out is the door at the foot of the tower." });
evbHouse("controltower", { g: EVB_GRID.mid, h: 4.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The tower"], wall: 0xE0E4E8, trim: 0x2A6AA8,
plan: [{ hall: { k: "cwlobby", n: "The Lobby" }, spine: { k: "cwstair", n: "The Stair Hall" }, gallery: { k: "cwscreens", n: "The Screen Wall" },
back: { merge: EVB_BACK, k: "cwcab", n: "The Tower Cab" },
r1i: { k: "cwradar", n: "The Radar Room" }, r1o: { k: "cwradio", n: "The Radio Room" },
r2i: { k: "cwweather", n: "The Weather Desk" }, r2o: { k: "cwplans", n: "The Flight Plans Office" },
r3i: { k: "cwrest", n: "The Rest Room" }, r3o: { k: "cwgalley", n: "The Galley" },
l1i: { k: "cwrescue", n: "The Rescue Desk" }, l1o: { k: "cwlights", n: "The Lights Room" },
l2i: { k: "cwtrain", n: "The Training Room" }, l2o: { k: "cwchief", n: "The Chief's Office" },
l3i: { k: "cwcharts", n: "The Star Charts" }, l3o: { k: "cwlost", n: "Lost and Found" } }] });
evbTheme("hangar", { corner: "crates", seed: 79, panel: 0xB8BCC0,
pal: { fab: "charcoal", fab2: "mustard", wood: "oak", metal: "iron", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0xC8CCD0, "plaster"], "D8D0C0|coffer": [0x5A6068, "coffer"] },
hello: "🚀 <b>Inside the hangar.</b> A shuttle in for repairs, rovers lined up, space suits on their racks. Look for the ✨ cards. The way out is the small door beside the great hangar doors." });
evbHouse("hangar", { g: EVB_GRID.wide, h: 6.0, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The hangar"], wall: 0xC8CCD0, trim: 0xE8B030,
plan: [{ hall: { k: "hgdoor", n: "The Hangar Doors" }, spine: { k: "hgfloor", n: "The Hangar Floor" }, gallery: { k: "hgcatwalk", n: "The Catwalk" },
back: { merge: EVB_BACK, k: "hgbay", n: "The Shuttle Bay" },
r1i: { k: "hgrovers", n: "The Rover Bay" }, r1o: { k: "hgsuits", n: "The Suit Room" },
r2i: { k: "hgparts", n: "The Parts Store" }, r2o: { k: "hgengine", n: "The Engine Shop" },
r3i: { k: "hgfuel", n: "The Fuel Office" }, r3o: { k: "hgbrief", n: "The Briefing Room" },
l1i: { k: "hgtools", n: "The Tool Crib" }, l1o: { k: "hgpaint", n: "The Paint Shop" },
l2i: { k: "hgsim", n: "The Simulator" }, l2o: { k: "hglockers", n: "The Crew Lockers" },
l3i: { k: "hgmodels", n: "The Model Room" }, l3o: { k: "hgcrew", n: "The Crew Room" } }] });
evbTheme("reactor", { corner: "pipes", seed: 81, panel: 0x9AA4AE,
pal: { fab: "charcoal", fab2: "teal", wood: "white", metal: "iron", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0xB8C0C8, "plaster"], "D8D0C0|coffer": [0x4A5058, "coffer"] },
hello: "⚛️ <b>Inside the reactor.</b> The Orbital's power: the core glowing a steady blue, the cooling loop, the solar wing, the batteries, and the control room that keeps it all safe. Look for the ✨ cards. The way out is the front door." });
evbHouse("reactor", { g: EVB_GRID.mid, h: 5.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The reactor"], wall: 0xB8C0C8, trim: 0xE8B030,
plan: [{ hall: { k: "rxgate", n: "The Safety Gate" }, spine: { k: "rxpipes", n: "The Pipe Gallery" }, gallery: { k: "rxview", n: "The Viewing Window" },
back: { merge: EVB_BACK, k: "rxcore", n: "The Core Hall" },
r1i: { k: "rxcontrol", n: "The Control Room" }, r1o: { k: "rxcool", n: "The Cooling Loop" },
r2i: { k: "rxsolar", n: "The Solar Wing" }, r2o: { k: "rxbattery", n: "The Battery Room" },
r3i: { k: "rxturbine", n: "The Turbine Hall" }, r3o: { k: "rxsafety", n: "The Safety Office" },
l1i: { k: "rxsuits", n: "The Suit-Up Room" }, l1o: { k: "rxlab", n: "The Test Lab" },
l2i: { k: "rxgrid", n: "The Grid Room" }, l2o: { k: "rxspare", n: "The Spares Store" },
l3i: { k: "rxhistory", n: "The History Wall" }, l3o: { k: "rxcrew", n: "The Crew Room" } }] });
evbFins({
bdlock: ["tile", 0xD8DCE0, 0xE8F4EC, "tile", 0x3A9A4A], bdpath: ["wood", 0x8A6A48, 0xD8F0E0, "plaster", 0x3A9A4A], bdglass: ["tile", 0xD8DCE0, 0xD8F0F8, "plaster", 0x3A9A4A],
bdforest: ["wood", 0x6A5038, 0xC8E8D0, "plaster", 0x2A7A3A, "coffer"], bddesert: ["stone", 0xD8B888, 0xF0E0C0, "plaster", 0xC88A3A], bdseeds: ["tile", 0xE0E4E8, 0xF0F4F8, "tile", 0x8A6A48],
bdbees: ["wood", 0x9A7A58, 0xF8E8B0, "plaster", 0xE8B030], bdpond: ["stone", 0x7A8A7A, 0xC8E0D8, "plaster", 0x2A7A8A], bdcontrol: ["tile", 0xC8CCD0, 0xE0E8EC, "tile", 0x2A6AA8],
bdcompost: ["stone", 0x6A5A48, 0xC8C0A8, "plaster", 0x5A4A3A], bdhydro: ["tile", 0xD8DCE0, 0xF0E8F4, "tile", 0xB050C0], bdkitchen: ["tile", 0xE0E0DC, 0xF0F4EC, "tile", 0x3A9A4A],
bdlab: ["tile", 0xE0E4E8, 0xF0F4F8, "tile", 0x3A9A4A], bdbutterfly: ["wood", 0x8A6A48, 0xF0E8F8, "plaster", 0xE8308A], bdcold: ["stone", 0xC8D0D8, 0xE8F0F8, "plaster", 0x5A8AC8],
bdsleep: ["carpet", 0x3A7A5A, 0xE8F4EC, "plaster", 0x3A9A4A],
hxlock: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0xE8B030], hxnode: ["tile", 0xD8DCE0, 0xECF0F4, "tile", 0x2A6AA8], hxtunnel: ["tile", 0xD0D4D8, 0xE4E8EC, "tile", 0x2A6AA8],
hxcupola: ["carpet", 0x1A2A4A, 0x1A2038, "plaster", 0xD8E8F8, "coffer"], hxgalley: ["tile", 0xE0E0DC, 0xF4F4F0, "tile", 0xE8902A], hxpods: ["carpet", 0x3A5A8A, 0xECF0F4, "plaster", 0x2A6AA8],
hxgym: ["tile", 0xC8CCD0, 0xE4E8EC, "tile", 0xC0302A], hxgarden: ["tile", 0xD8DCE0, 0xE8F4EC, "tile", 0x3A9A4A], hxmed: ["tile", 0xE8E8E8, 0xF8F8F8, "tile", 0xC0302A],
hxwash: ["tile", 0xE0E8EC, 0xF0F4F8, "tile", 0x2A8A9A], hxsuits: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0xE8B030], hxcomms: ["tile", 0xC8CCD0, 0x3A4A5A, "plaster", 0x40C0F0],
hxlife: ["tile", 0xC8CCD0, 0xD8DCE0, "tile", 0x2A8A9A], hxstore: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0x5A6068], hxrec: ["carpet", 0x7A3AA8, 0xECF0F4, "plaster", 0xE8B030],
hxwork: ["tile", 0xB8BCC0, 0xD0D4D8, "tile", 0xE8B030],
lbfront: ["tile", 0xE0E4E8, 0xF0F4F8, "tile", 0x2A8A9A], lbcorr: ["tile", 0xD8DCE0, 0xF0F4F8, "tile", 0x2A8A9A], lbposters: ["tile", 0xD8DCE0, 0xF4F4F0, "plaster", 0x2A8A9A],
lbmain: ["tile", 0xE0E4E8, 0xF4F8FC, "tile", 0x2A8A9A, "coffer"], lbmicro: ["tile", 0xE0E4E8, 0xF0F4F8, "tile", 0x2A6AA8], lbspecimen: ["tile", 0xD8DCE0, 0xE0F0E8, "tile", 0x3A9A4A],
lbrocks: ["stone", 0xA8A090, 0xE8E4D8, "plaster", 0xA87838], lbclean: ["tile", 0xF0F0F0, 0xFFFFFF, "tile", 0x40C0F0], lbscope: ["wood", 0x8A6A4A, 0x1A2048, "plaster", 0xE8D860],
lbmeteor: ["stone", 0x8A8478, 0x2A2A30, "plaster", 0xA87838], lbdata: ["tile", 0xC8CCD0, 0x2A3A4A, "plaster", 0x40C0F0], lbmaps: ["wood", 0x8A6A4A, 0xE8E4D8, "plaster", 0x2A6AA8],
lbcold: ["tile", 0xD8E0E8, 0xE8F0F8, "tile", 0x5A8AC8], lbcommon: ["carpet", 0x2A6A7A, 0xF0F0EC, "plaster", 0xE8902A], lblib: ["wood", 0x8A6A4A, 0xE8E4D8, "plaster", 0x2A8A9A],
lbdirector: ["carpet", 0x2A3A5A, 0xE8ECF0, "plaster", 0xD8B040],
cwlobby: ["tile", 0xD8DCE0, 0xE0E4E8, "tile", 0x2A6AA8], cwstair: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0x2A6AA8], cwscreens: ["tile", 0xC8CCD0, 0x2A3A4A, "plaster", 0x40C0F0],
cwcab: ["carpet", 0x2A3A5A, 0x3A4048, "plaster", 0x40C0F0, "coffer"], cwradar: ["carpet", 0x2A3A2A, 0x2A3430, "plaster", 0x40F070], cwradio: ["carpet", 0x2A3A5A, 0x4A5058, "plaster", 0xE8B030],
cwweather: ["tile", 0xD8DCE0, 0xD8E8F8, "plaster", 0x2A6AA8], cwplans: ["carpet", 0x3A4A5A, 0xE0E4E8, "plaster", 0x2A6AA8], cwrest: ["carpet", 0x5A6A7A, 0xE8ECF0, "plaster", 0x2A6AA8],
cwgalley: ["tile", 0xE0E0DC, 0xF0F0EC, "tile", 0xE8902A], cwrescue: ["tile", 0xD8DCE0, 0xF0E8E8, "plaster", 0xC0302A], cwlights: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0xE8B030],
cwtrain: ["carpet", 0x3A4A5A, 0xE8ECF0, "plaster", 0x2A6AA8], cwchief: ["carpet", 0x2A3A5A, 0xE0E4E8, "plaster", 0xD8B040], cwcharts: ["wood", 0x6A5A48, 0x1A2048, "plaster", 0xE8D860],
cwlost: ["tile", 0xD8DCE0, 0xE8E4D8, "plaster", 0x8A6A48],
hgdoor: ["stone", 0x7A7E84, 0xC8CCD0, "stone", 0xE8B030], hgfloor: ["stone", 0x7A7E84, 0xC0C4C8, "stone", 0xE8B030], hgcatwalk: ["stone", 0x6A6E74, 0xB8BCC0, "stone", 0xE8B030],
hgbay: ["stone", 0x6A6E74, 0xB8BCC0, "stone", 0xE8B030, "coffer"], hgrovers: ["stone", 0x7A7E84, 0xC8CCD0, "stone", 0xE8B030], hgsuits: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0xE8B030],
hgparts: ["stone", 0x7A7E84, 0xB8BCC0, "stone", 0x5A6068], hgengine: ["stone", 0x6A6E74, 0xA8ACB0, "stone", 0xC0302A], hgfuel: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0xC0302A],
hgbrief: ["carpet", 0x2A3A5A, 0xE0E4E8, "plaster", 0x2A6AA8], hgtools: ["stone", 0x7A7E84, 0xB8BCC0, "stone", 0xE8B030], hgpaint: ["stone", 0x7A7E84, 0xE8E4E0, "plaster", 0x3AA8E0],
hgsim: ["carpet", 0x1A2038, 0x2A3040, "plaster", 0x40C0F0], hglockers: ["tile", 0xC8CCD0, 0xD8DCE0, "tile", 0x2A6AA8], hgmodels: ["wood", 0x8A6A4A, 0xE8E4D8, "plaster", 0x2A6AA8],
hgcrew: ["carpet", 0x5A3A2A, 0xE8E4D8, "plaster", 0xE8902A],
rxgate: ["tile", 0xB8BCC0, 0xC8CCD0, "tile", 0xE8B030], rxpipes: ["stone", 0x7A7E84, 0xA8B0B8, "stone", 0xE8B030], rxview: ["tile", 0xC8CCD0, 0xB8C0C8, "tile", 0x40B0FF],
rxcore: ["stone", 0x5A6068, 0x8A94A0, "stone", 0x40B0FF, "coffer"], rxcontrol: ["carpet", 0x2A3A4A, 0x3A4450, "plaster", 0x40C0F0], rxcool: ["tile", 0xB8C0C8, 0xC8D8E8, "tile", 0x2A6AA8],
rxsolar: ["tile", 0xD8DCE0, 0xF0F0E8, "tile", 0xE8B030], rxbattery: ["tile", 0xB8BCC0, 0xC8CCD0, "tile", 0x3A9A4A], rxturbine: ["stone", 0x7A7E84, 0xA8B0B8, "stone", 0xC0302A],
rxsafety: ["tile", 0xD8DCE0, 0xF0F0E8, "plaster", 0xE8B030], rxsuits: ["tile", 0xC8CCD0, 0xE0E4E8, "tile", 0xE8B030], rxlab: ["tile", 0xE0E4E8, 0xF0F4F8, "tile", 0x2A8A9A],
rxgrid: ["tile", 0xC8CCD0, 0x2A3A4A, "plaster", 0x40C0F0], rxspare: ["stone", 0x7A7E84, 0xB8BCC0, "stone", 0x5A6068], rxhistory: ["wood", 0x8A6A4A, 0xE8E4D8, "plaster", 0x2A6AA8],
rxcrew: ["carpet", 0x3A4A5A, 0xE0E4E8, "plaster", 0xE8902A]
});
EVB_LD.biodome = { theme: "biodome", name: "The Biodome", doors: "the airlock" };
EVB_LD.habitat = { theme: "habitat", name: "The Habitat", doors: "the airlock" };
EVB_LD.researchlab = { theme: "researchlab", name: "The Research Lab", doors: "the lab door" };
EVB_LD.controltower = { theme: "controltower", name: "The Control Tower", doors: "the tower door" };
EVB_LD.hangar = { theme: "hangar", name: "The Hangar", doors: "the side door" };
EVB_LD.reactor = { theme: "reactor", name: "The Reactor", doors: "the safety door" };
"use strict";
var evbBdLock = evbInfo("The biodome", "The biggest biodomes on Earth are the Eden Project in Cornwall, England, whose greenhouses look like giant soap bubbles and hold the largest indoor rainforest in the world, and Biosphere 2 in Arizona, where eight people lived sealed inside for two years, from 1991 to 1993, growing their own food.");
function evbBdForest() { return __ZC(367, 85, this, arguments, new.target); }
var evbBdDesert = evbFact("The desert biome", ["A saguaro cactus can soak up about 750 litres of water after one big rain, and swell up to hold it.", "Desert plants often open their pores only at night, when it's cool, so they lose less water.", "The Welwitschia of the Namib Desert has just two leaves, and can live for over a thousand years."]);
function evbBdSeeds() { return __ZC(367, 86, this, arguments, new.target); }
var evbBdBees = evbInfo("The pollinators", "About three of every four kinds of food crop need animals to carry their pollen: mostly bees, but also butterflies, moths, beetles, birds and bats. A honeybee visits about 50 to 100 flowers on one trip out of the hive.");
var evbBdPond = evbInfo("The wetland", "Wetlands are the planet's kidneys: their plants and mud filter dirty water clean. Reed beds are used to clean water in some places instead of a treatment works.");
function evbBdControl() { return __ZC(367, 87, this, arguments, new.target); }
var evbBdCompost = evbInfo("The compost room", "Worms, fungi and bacteria turn peelings and dead leaves back into rich soil in a few months. A single earthworm can eat its own weight in food every day.");
var evbBdHydro = evbInfo("The grow rooms", "Hydroponics grows plants without soil: their roots sit in water with the food they need dissolved in it. The lamps are pink and violet because plants use mostly red and blue light, and reflect the green.");
function evbBdKitchen() { evbTune([523, 587, 659], 250, 0.6); evbSay("🥗 A salad picked ten minutes ago: lettuce, tomatoes, herbs. Astronauts on the space station grew and ate their first space lettuce in 2015 (red romaine)."); }
var evbBdLab = evbInfo("The botany lab", "Botanists study plants. Charles Darwin spent years on plants as well as animals: he showed how orchids are shaped to fit the insects that pollinate them, and even predicted a moth with a 30 cm tongue. It was found, 21 years after he died.");
function evbBdButterfly() { evbTune([784, 988, 1175], 200, 0.6); evbSay("🦋 A butterfly lands on your sleeve. Butterflies taste with their feet. Monarch butterflies fly up to 4,000 km to Mexico for the winter."); }
var evbBdCold = evbInfo("The cold biome", "Tundra plants grow low and slow, hugging the ground out of the wind. Some Arctic willows are only a few centimetres tall but decades old.");
function evbBdSleep() { evbTune([392, 330, 262], 500, 1.0); evbSay("🛏️ The gardeners sleep here, close to their plants. The first job in the morning is always the same: check the water."); }
var evbHxLock = evbInfo("The airlock", "An airlock is a little room with two doors that are never open at the same time, so the air stays inside. Before a spacewalk, astronauts breathe pure oxygen for a while so that they don't get 'the bends' when the pressure drops.");
var evbHxNode = evbInfo("Living in space", "The International Space Station has had people on board without a break since November 2000. It goes round the Earth about 16 times a day, so the crew see about 16 sunrises and 16 sunsets every 24 hours.");
function evbHxCupola() { return __ZC(367, 88, this, arguments, new.target); }
function evbHxGalley() { return __ZC(367, 89, this, arguments, new.target); }
function evbHxPods() { evbTune([392, 330, 262], 500, 1.2); evbSay("🛌 You zip yourself into a sleeping bag tied to the wall, so you don't drift about. In space there's no 'up', so you can sleep any way round."); }
var evbHxGym = evbInfo("The gym", "In weightlessness, bones and muscles weaken because they don't have to hold you up. Astronauts exercise about two hours a day, on a treadmill (strapped down with bungee cords), a bike and a weight machine that works with vacuum cylinders.");
var evbHxGarden = evbInfo("The garden", "Plants in space get confused about which way to grow: roots use gravity to know which way is down. In space, they follow light and water instead. The first flower grown on the space station was a zinnia, in 2016.");
var evbHxMed = evbInfo("The medical bay", "The crew are trained to look after each other: to take blood, fix teeth, even stitch a cut. Doctors on Earth can help over a video link. Astronauts grow up to 5 cm taller in space, because their spines stretch out without gravity.");
var evbHxWash = evbInfo("The hygiene room", "No showers on the space station: astronauts wash with a damp cloth and rinse-free shampoo. The toilet uses air flow instead of water, and most of the water on board, including sweat and urine, is cleaned and drunk again.");
function evbHxSuits() { evbTune([262, 330], 300, 0.6); evbSay("👨‍🚀 A spacewalk suit is a tiny spaceship: air, water cooling, power and radio. Putting it on takes about 45 minutes, with help."); }
function evbHxComms() { evbTune([880, 880, 1047], 150, 0.4); evbSay("📡 “Habitat to base, all well.” Radio signals travel at the speed of light: to the Moon and back takes about 2.5 seconds; to Mars, between about 6 and 44 minutes for the round trip."); }
var evbHxLife = evbInfo("Life support", "Machines split water into hydrogen and oxygen to make air to breathe, and scrub the carbon dioxide the crew breathe out. If the fans stopped, the carbon dioxide would gather in a bubble round your head, because warm air doesn't rise in space.");
var evbHxStore = evbInfo("The store", "Every bag is labelled and tied down. Lose something in space and it might turn up weeks later stuck to a fan grille.");
function evbHxRec() { evbTune([523, 659, 523, 784], 250, 0.6); evbSay("🎸 Films, books, games and a guitar. In 2013 Chris Hadfield recorded a song on the space station with the guitar there."); }
var evbHxWork = evbInfo("The workshop", "Tools in space are tied on with lanyards. A 3D printer on the space station prints spare parts so they don't have to wait for the next supply ship.");
var evbLbFront = evbInfo("The research lab", "Scientists work by asking a question, guessing an answer (a hypothesis), testing it with a fair experiment, and writing down exactly what they did so that others can test it too.");
function evbLbMain() { return __ZC(367, 90, this, arguments, new.target); }
function evbLbMicro() { return __ZC(367, 91, this, arguments, new.target); }
var evbLbSpecimen = evbInfo("The specimen room", "Every specimen is labelled with where and when it was found, and by whom. The Natural History Museum in London holds about 80 million specimens, some collected by Darwin himself.");
var evbLbRocks = evbFact("The rock lab", ["Igneous rocks form from melted rock that cooled: granite, basalt.", "Sedimentary rocks form in layers from sand, mud and shells: sandstone, limestone. Fossils are found in these.", "Metamorphic rocks are rocks changed by heat and squeezing: marble was once limestone."]);
var evbLbClean = evbInfo("The clean room", "In a clean room, filters take almost all the dust out of the air, and people wear suits, masks and overshoes. Spacecraft are built in clean rooms so that we don't send Earth germs to other worlds.");
function evbLbScope() { evbTune([523, 659, 784], 300, 0.8); evbSay("🔭 You look through the telescope. Galileo pointed one at Jupiter in 1610 and found four moons going round it, proof that not everything goes round the Earth."); }
var evbLbMeteor = evbInfo("Meteorites", "A meteor is the streak of light; a meteorite is the rock that lands. Most are older than the Earth itself, about 4.6 billion years old. The biggest ever found, the Hoba meteorite in Namibia, weighs about 60 tonnes and is still where it fell.");
var evbLbData = evbInfo("The data room", "Modern science makes huge amounts of data. Volunteers help sort it: on Galaxy Zoo, hundreds of thousands of people have helped classify galaxies from telescope pictures, and found new kinds of objects.");
var evbLbMaps = evbInfo("The map room", "Mapping a new world starts from orbit: photos, then heights measured with radar or lasers. The Moon's far side was first photographed in 1959, by the Soviet probe Luna 3.");
var evbLbCold = evbInfo("The cold store", "Samples are kept at minus 80 degrees in freezers, or in liquid nitrogen at minus 196 degrees, so that nothing in them changes until they can be studied.");
function evbLbCommon() { evbTune([392, 440], 300, 0.6); evbSay("☕ Coffee and arguments. Many of science's best ideas started as a chat in a common room."); }
var evbLbLib = evbInfo("The library", "Scientists read what others found before them. Isaac Newton wrote: 'If I have seen further, it is by standing on the shoulders of giants.'");
var evbLbDirector = evbInfo("The director's office", "The director decides which experiments get the time and money. On the wall, a sign: 'The most exciting phrase in science is not Eureka, but That's funny...'");
var evbCwLobby = evbInfo("The control tower", "Air traffic controllers guide every aircraft from the moment it starts its engines to the moment it parks. The busiest airports handle a takeoff or landing about every minute. The first air traffic controller, Archie League, worked from a wheelbarrow at St Louis in 1929, waving flags.");
function evbCwCab() { return __ZC(367, 92, this, arguments, new.target); }
var evbCwRadar = evbInfo("Radar", "Radar sends out radio waves and listens for the echo; the time the echo takes tells how far away something is. It was developed in Britain and elsewhere in the 1930s. 'Radar' stands for RAdio Detection And Ranging.");
function evbCwRadio() { evbTune([880, 880], 120, 0.3); evbSay("📻 “Tower, Shuttle Two, request taxi.” Pilots and controllers everywhere speak English on the radio, with set phrases so nobody is misunderstood: 'Roger' means 'message received'."); }
var evbCwWeather = evbFact("The weather desk", ["Fog is a cloud on the ground.", "Pilots take off and land into the wind, because it gives the wings more lift at a lower ground speed.", "A windsock fully stretched out means a wind of about 15 knots or more."]);
var evbCwPlans = evbInfo("Flight plans", "Every flight files a plan: where it's going, the route, the height, the time. If a plane goes missing, the plan tells rescuers where to start looking.");
function evbCwRest() { evbTune([392, 330], 400, 0.8); evbSay("🛋️ Controllers take regular breaks: guiding traffic needs full attention, and tired people make mistakes."); }
function evbCwGalley() { evbTune([523, 659], 250, 0.5); evbSay("🍜 Noodles and tea between shifts."); }
var evbCwRescue = evbInfo("The rescue desk", "If a ship calls 'Mayday' (from the French m'aidez, 'help me'), everything else waits. Rescue teams are sent at once, and every other ship keeps the radio channel clear.");
var evbCwLights = evbInfo("The lights room", "Runway lights show the way in the dark: white along the edges, green at the start, red at the end. The colours of the approach lights tell a pilot if they are too high or too low.");
function evbCwTrain() { evbTune([523, 587, 659], 250, 0.6); evbSay("🎓 Trainee controllers practise for months on a simulator before they guide a real ship."); }
var evbCwChief = evbInfo("The chief's office", "The chief controller's rule: 'Separation.' Keep every ship a safe distance from every other, above, below and to the side, all the time.");
var evbCwCharts = evbInfo("The star charts", "Before radio, sailors and the first navigators found their way by the stars. Spacecraft still do: star trackers, little cameras, find bright stars to tell the craft which way it's pointing.");
function evbCwLost() { var L = ["a single glove", "a teddy bear in a tiny space suit", "a pair of sunglasses", "a book of crossword puzzles", "a toothbrush"]; evbTune([523, 659], 200, 0.4); evbSay("📦 Lost and found: " + evbPick(L) + ". Someone will be missing that."); }
var evbHgDoor = evbInfo("The hangar", "The biggest hangars on Earth can hold several airliners at once. The Vehicle Assembly Building at Cape Canaveral, where the Moon rockets were put together, is so tall (160 m) that it can make its own clouds inside on humid days.");
function evbHgBay() { return __ZC(367, 93, this, arguments, new.target); }
function evbHgRovers() { evbTune([262, 330, 392], 300, 0.6); evbSay("🛞 You take a rover for a spin round the bay. The Mars rover Opportunity was meant to last 90 days; it kept going for nearly 15 years."); }
var evbHgSuits = evbInfo("The suit room", "Spacesuits are white to reflect the sunlight; in the Sun, the outside of a suit could reach over 120 degrees, and in shadow fall to minus 150.");
var evbHgParts = evbInfo("The parts store", "Thousands of parts, every one with a number. A spacecraft can have over two million parts; a missing bolt can ground a ship.");
function evbHgEngine() { evbTune([196, 220, 262], 400, 0.8); evbSay("🔧 A rocket engine on its stand. Rockets work by pushing gas out of the back very fast; the gas pushes the rocket the other way, as Newton's third law says."); }
var evbHgFuel = evbInfo("The fuel office", "Most of a rocket is fuel: about 90 percent of its weight at liftoff. That's why rockets are built in stages, which drop away when they're empty.");
var evbHgBrief = evbInfo("The briefing room", "Before every flight, the crew go through the plan, the weather and what to do if anything goes wrong. Checklists save lives: pilots use them for everything, however many times they've flown.");
var evbHgTools = evbInfo("The tool crib", "Every tool is signed out and signed back in. A spanner left inside an engine could wreck it, so nothing leaves the crib without a name against it.");
function evbHgPaint() { evbTune([523, 659], 250, 0.5); evbSay("🎨 The paint shop is giving the shuttle a new stripe. Paint weighs more than you'd think: an airliner's paint can weigh over 250 kg."); }
function evbHgSim() { evbTune([523, 659, 784, 1047], 250, 0.8); evbSay("🕹️ In the simulator you practise a landing. Simulators let crews practise emergencies that would be far too dangerous to try for real."); }
function evbHgLockers() { evbTune([392, 440], 250, 0.5); evbSay("🧳 The crew's lockers: flight suits, boots, and photos from home taped inside the doors."); }
var evbHgModels = evbInfo("The model room", "Engineers test models in wind tunnels before building the real thing. The Wright brothers built their own wind tunnel in 1901 and tested over 200 wing shapes before their first flight in 1903.");
function evbHgCrew() { evbTune([523, 587, 659], 250, 0.6); evbSay("☕ The crew room: a kettle, a dartboard, and a whiteboard of who flies tomorrow."); }
var evbRxGate = evbInfo("The reactor", "This reactor makes power for the whole Orbital. A power station turns some kind of energy (heat, sunlight, wind, falling water) into electricity, usually by spinning a magnet inside coils of wire, which Michael Faraday discovered in 1831.");
function evbRxCore() { return __ZC(367, 94, this, arguments, new.target); }
function evbRxControl() { evbTune([523, 659, 784], 200, 0.5); evbSay("🖥️ The control room. Every reading is shown twice, on two separate systems, and the operators check each other's work: safety comes from doing everything carefully, every time."); }
var evbRxCool = evbInfo("The cooling loop", "Every power station makes heat it can't use, and needs to get rid of it: that's what cooling towers and cooling water are for. In space there's no air to cool things, so spacecraft use big radiator panels that shed heat as invisible infrared light.");
var evbRxSolar = evbInfo("The solar wing", "Solar panels turn sunlight straight into electricity. The space station's solar wings cover about 2,500 square metres, roughly half a football pitch. Further from the Sun, panels make less power: at Jupiter, sunlight is about 25 times weaker.");
var evbRxBattery = evbInfo("The batteries", "Batteries store electricity as chemical energy. The Orbital goes into the planet's shadow every orbit, so batteries keep the lights on through the night side. Alessandro Volta made the first battery in 1800, from a stack of copper and zinc discs.");
function evbRxTurbine() { evbTune([196, 196, 220], 400, 0.8); evbSay("🌀 The turbine spins at 3,000 turns a minute. Steam or gas pushes its blades round, like wind on a windmill, and the spinning shaft turns the generator."); }
var evbRxSafety = evbInfo("The safety office", "The rules are posted on the wall: know the way out, wear your badge, never work alone, and stop the moment anything seems wrong. Anyone can call a stop, from the newest trainee to the chief.");
function evbRxSuits() { evbTune([262, 330], 300, 0.5); evbSay("🦺 Hard hat, overalls, badge, safety glasses. You're ready."); }
var evbRxLab = evbInfo("The test lab", "Engineers test parts by pushing them harder than they'll ever be pushed in use: heat, cold, shaking, pressure. If a part is meant to hold a ton, it's tested to hold two or more.");
var evbRxGrid = evbInfo("The grid room", "The grid is the web of cables that carries power to every home and machine. Supply and demand must match every second: when everyone turns on a kettle at the same moment, power stations have to answer within seconds.");
var evbRxSpare = evbInfo("The spares store", "Spare pumps, spare valves, spare fuses. On the Orbital, the next delivery is weeks away, so every important part has a spare.");
var evbRxHistory = evbFact("The history wall", ["1882: Thomas Edison's Pearl Street Station in New York, one of the first power stations, lit about 400 lamps.", "1954: the first solar cell that could power everyday things was made at Bell Labs.", "1958: Vanguard 1 was the first solar-powered satellite, and is still in orbit today."]);
function evbRxCrew() { evbTune([523, 659], 250, 0.6); evbSay("☕ The night shift is having breakfast. Power stations never close: someone is always on watch."); }
"use strict";
evbRooms({
bdlock: { sides: ["evb_airlock", "plant", "evb_suit", "plant"], far: ["evb_airlock"], gap: 3, acts: [[0.35, 0, 2.0, "The biodome", "read", evbBdLock]] },
bdpath: { sides: ["espalm", "plant", "espalm", "plant"] },
bdglass: { far: ["espalm", "plant", "espalm", "plant", "espalm"] },
bdforest: { grid: ["espalm", 3, 6, "-u", 0.2, 0.85], sides: ["sg_qn_bush1", "espalm", "sg_qn_bush2", "plant", "sg_qn_plant3"], mid: [["evb_fountain", 0.5, 0]], corners: "espalm",
acts: [[0.5, 0, 2.4, "The rainforest", "listen", evbBdForest]] },
bddesert: { grid: ["sg_qn_cactus1", 2, 2], sides: ["sg_qn_cactus2", "boulder", "sg_qn_cactusflowers2", "boulder"], acts: [[0.5, 0, 1.8, "The desert", "read", evbBdDesert]] },
bdseeds: { far: ["filecabinet", "filecabinet", "filecabinet"], sides: ["fridge", "filecabinet", "fridge"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The seed bank", "plant a seed", evbBdSeeds]] },
bdbees: { sides: ["evb_flowerbed", "plant", "evb_flowerbed", "plant"], mid: [["evb_flowerbed", 0.5, 0]], acts: [[0.5, 0, 1.8, "The pollinators", "read", evbBdBees]] },
bdpond: { mid: [["evb_fountain", 0.5, 0]], sides: ["plant", "sg_qn_bush1", "plant"], acts: [[0.45, 0, 1.8, "The wetland", "read", evbBdPond]] },
bdcontrol: { far: ["wallscreen", "monitor"], sides: ["servertower", "desk", "servertower", "chair"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The air and water", "check the balance", evbBdControl]] },
bdcompost: { grid: ["barrel", 2, 2], sides: ["crates", "plant", "crates"], acts: [[0.5, 0, 1.8, "The compost", "read", evbBdCompost]] },
bdhydro: { sides: ["evb_hydro", "evb_hydro", "evb_hydro", "evb_hydro"], grid: ["evb_hydro", 1, 2, "-u", 0.55, 0.55], acts: [[0.3, 0, 1.8, "The grow rooms", "read", evbBdHydro]] },
bdkitchen: { far: ["counter", "stove"], sides: ["fridge", "counter", "sink", "shelfgoods"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The harvest", "have a salad", evbBdKitchen]] },
bdlab: { mid: [["evb_microscope", 0.5, 0]], sides: ["evb_specimen", "bookshelf", "evb_specimen"], acts: [[0.45, 0, 1.8, "The botany lab", "read", evbBdLab]] },
bdbutterfly: { grid: ["evb_flowerbed", 2, 2], sides: ["plant", "espalm", "plant"], acts: [[0.5, 0, 1.8, "The butterflies", "hold still", evbBdButterfly]] },
bdcold: { sides: ["boulder", "evb_snowflake", "boulder"], grid: ["sg_qn_bush1", 1, 2], acts: [[0.5, 0, 1.8, "The cold biome", "read", evbBdCold]] },
bdsleep: { far: ["bunk", "bunk"], sides: ["bunk", "eslockers", "plant"], acts: [[0.5, 0, 1.8, "The bunks", "rest", evbBdSleep]] }
});
evbRooms({
hxlock: { sides: ["evb_airlock", "evb_suit", "evb_airlock", "evb_suit"], acts: [[0.35, 0, 2.0, "The airlock", "read", evbHxLock]] },
hxnode: { sides: ["wallscreen", "eslockers", "wallscreen", "eslockers"], acts: [[0.5, 0, 1.8, "Living in space", "read", evbHxNode]] },
hxtunnel: { far: ["eslockers", "wallscreen", "eslockers", "wallscreen"] },
hxcupola: { mid: [["evb_planet", 0.6, 0]], far: ["wallscreen", "wallscreen", "wallscreen"], sides: ["chair", "plant", "chair", "estelescope"], grid: ["esreading", 2, 5, "-u", 0.3, 0.8],
acts: [[0.5, 0, 2.4, "The cupola", "float and look", evbHxCupola]] },
hxgalley: { far: ["counter", "fridge"], sides: ["counter", "shelfgoods", "counter"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The galley", "eat", evbHxGalley]] },
hxpods: { sides: ["evb_pod", "evb_pod", "evb_pod", "evb_pod"], acts: [[0.5, 0, 1.8, "The sleeping pods", "sleep", evbHxPods]] },
hxgym: { grid: ["esbike", 1, 2], sides: ["xp_weightbench", "esweights", "xp_dumbbells"], acts: [[0.5, 0, 1.8, "The gym", "read", evbHxGym]] },
hxgarden: { sides: ["evb_hydro", "evb_hydro", "evb_hydro"], mid: [["plant", 0.5, 0]], acts: [[0.5, 0, 1.8, "The garden", "read", evbHxGarden]] },
hxmed: { far: ["hospitalbed"], sides: ["shelfgoods", "monitor", "counter", "chair"], acts: [[0.5, 0, 1.8, "The medical bay", "read", evbHxMed]] },
hxwash: { far: ["sink", "esshower"], sides: ["sink", "shelfgoods"], acts: [[0.5, 0, 1.8, "The hygiene room", "read", evbHxWash]] },
hxsuits: { sides: ["evb_suit", "evb_suit", "evb_suit", "eslockers"], acts: [[0.5, 0, 1.8, "The suits", "suit up", evbHxSuits]] },
hxcomms: { far: ["evb_radar", "monitor"], sides: ["servertower", "desk", "chair"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The radio", "call base", evbHxComms]] },
hxlife: { sides: ["machine", "pipes", "machine", "boiler"], acts: [[0.5, 0, 1.8, "Life support", "read", evbHxLife]] },
hxstore: { sides: ["eslockers", "crates", "eslockers", "shelfgoods"], grid: ["crates", 1, 2], acts: [[0.5, 0, 1.8, "The store", "read", evbHxStore]] },
hxrec: { sides: ["sofa", "esarcade", "sofa", "bookshelf"], mid: [["esscreen", 0.7, 0]], acts: [[0.5, 0, 1.8, "The rec room", "relax", evbHxRec]] },
hxwork: { far: ["workbench", "machine"], sides: ["workbench", "shelfgoods", "workbench"], acts: [[0.5, 0, 1.8, "The workshop", "read", evbHxWork]] }
});
evbRooms({
lbfront: { sides: ["plant", "chair", "plant", "noticeboard"], far: ["counter"], gap: 2.5, acts: [[0.35, 0, 2.0, "How science works", "read", evbLbFront]] },
lbcorr: { sides: ["evb_specimen", "noticeboard", "evb_specimen", "plant"] },
lbposters: { far: ["noticeboard", "noticeboard", "noticeboard"] },
lbmain: { grid: ["evb_microscope", 2, 3, "-u", 0.3, 0.7], far: ["wallscreen", "evb_specimen", "wallscreen"], sides: ["evb_specimen", "shelfgoods", "evb_specimen", "fridge"],
acts: [[0.5, 0, 2.4, "The strange plant", "test it", evbLbMain]] },
lbmicro: { grid: ["evb_microscope", 1, 3, "-u", 0.55, 0.55], sides: ["shelfgoods", "chair"], acts: [[0.5, 0, 1.8, "The microscope", "look", evbLbMicro]] },
lbspecimen: { sides: ["evb_specimen", "displaycase", "evb_specimen", "displaycase"], mid: [["evb_specimen", 0.55, 0]], acts: [[0.45, 0, 1.8, "The specimens", "read", evbLbSpecimen]] },
lbrocks: { far: ["displaycase", "displaycase"], sides: ["boulder", "workbench", "crystals"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The rocks", "read", evbLbRocks]] },
lbclean: { far: ["machine", "machine"], sides: ["evb_suit", "counter", "evb_suit"], acts: [[0.5, 0, 1.8, "The clean room", "read", evbLbClean]] },
lbscope: { mid: [["estelescope", 0.55, 0]], sides: ["esglobe", "maptable", "evb_planet"], acts: [[0.45, 0, 1.8, "The telescope", "look", evbLbScope]] },
lbmeteor: { mid: [["boulder", 0.55, 0]], sides: ["displaycase", "crystals", "displaycase"], acts: [[0.45, 0, 1.8, "The meteorite", "read", evbLbMeteor]] },
lbdata: { sides: ["servertower", "servertower", "servertower", "servertower"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The data", "read", evbLbData]] },
lbmaps: { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "evb_planet", "mapchest"], acts: [[0.5, 0, 1.8, "The maps", "read", evbLbMaps]] },
lbcold: { sides: ["fridge", "fridge", "fridge", "fridge"], acts: [[0.5, 0, 1.8, "The cold store", "read", evbLbCold]] },
lbcommon: { sides: ["sofa", "counter", "sofa", "bookshelf"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The common room", "have a coffee", evbLbCommon]] },
lblib: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "esreading", "bookshelf", "esreading"], acts: [[0.5, 0, 1.8, "The library", "read", evbLbLib]] },
lbdirector: { far: ["desk"], sides: ["bookshelf", "evb_planet", "armchair", "filecabinet"], acts: [[0.5, 0, 1.8, "The director", "read", evbLbDirector]] }
});
evbRooms({
cwlobby: { sides: ["plant", "sofa", "plant", "noticeboard"], far: ["counter"], gap: 2.5, acts: [[0.35, 0, 2.0, "The control tower", "read", evbCwLobby]] },
cwstair: { sides: ["wallscreen", "plant", "wallscreen"] },
cwscreens: { far: ["wallscreen", "wallscreen", "wallscreen", "wallscreen"] },
cwcab: { grid: ["evb_radar", 2, 6, "-u", 0.35, 0.75], far: ["wallscreen", "wallscreen", "wallscreen"], sides: ["monitor", "chair", "monitor", "chair"], acts: [[0.5, 0, 2.4, "The tower cab", "guide a ship in", evbCwCab]] },
cwradar: { grid: ["evb_radar", 1, 3, "-u", 0.55, 0.55], sides: ["chair", "servertower"], acts: [[0.5, 0, 1.8, "Radar", "read", evbCwRadar]] },
cwradio: { far: ["homeradio", "evb_radar"], sides: ["desk", "chair", "servertower"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The radio", "listen in", evbCwRadio]] },
cwweather: { far: ["wallscreen", "machine"], sides: ["esglobe", "desk", "chair"], acts: [[0.5, 0, 1.8, "The weather", "read", evbCwWeather]] },
cwplans: { far: ["filecabinet", "filecabinet"], sides: ["desk", "noticeboard", "desk"], acts: [[0.5, 0, 1.8, "Flight plans", "read", evbCwPlans]] },
cwrest: { sides: ["sofa", "plant", "sofa", "esreading"], acts: [[0.5, 0, 1.8, "The rest room", "rest", evbCwRest]] },
cwgalley: { far: ["counter", "fridge"], sides: ["counter", "sink"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The galley", "eat", evbCwGalley]] },
cwrescue: { far: ["wallscreen", "maptable"], sides: ["desk", "homeradio", "desk"], acts: [[0.5, 0, 1.8, "The rescue desk", "read", evbCwRescue]] },
cwlights: { sides: ["machine", "lantern", "machine", "lantern"], acts: [[0.5, 0, 1.8, "The lights", "read", evbCwLights]] },
cwtrain: { grid: ["schooldesk", 2, 2], far: ["wallscreen"], sides: ["evb_radar", "noticeboard"], acts: [[0.5, 0, 1.8, "The training room", "practise", evbCwTrain]] },
cwchief: { far: ["desk"], sides: ["bookshelf", "evb_planet", "armchair", "filecabinet"], acts: [[0.5, 0, 1.8, "The chief", "read", evbCwChief]] },
cwcharts: { mid: [["maptable", 0.5, 0]], sides: ["estelescope", "evb_planet", "mapchest"], acts: [[0.5, 0, 1.8, "The star charts", "read", evbCwCharts]] },
cwlost: { sides: ["shelfgoods", "crates", "shelfgoods", "counter"], acts: [[0.5, 0, 1.8, "Lost and found", "look", evbCwLost]] }
});
evbRooms({
hgdoor: { sides: ["crates", "evb_suit", "crates", "eslockers"], far: ["crates", "crates"], gap: 4, ceil: "lantern", acts: [[0.35, 0, 2.0, "The hangar", "read", evbHgDoor]] },
hgfloor: { sides: ["crates", "barrel", "crates", "workbench"] },
hgcatwalk: { far: ["crates", "pipes", "crates", "pipes"] },
hgbay: { mid: [["evb_shuttle", 0.5, -0.15], ["evb_shuttle", 0.5, 0.25]], grid: ["evb_rover", 1, 5, "-u", 0.88, 0.88], sides: ["crates", "workbench", "evb_rover", "workbench", "crates"], ceil: "lantern", acts: [[0.3, 0, 2.4, "The shuttle", "check it over", evbHgBay]] },
hgrovers: { grid: ["evb_rover", 1, 2, "-u", 0.55, 0.55], sides: ["crates", "workbench"], acts: [[0.5, 0, 2.0, "The rovers", "take one for a spin", evbHgRovers]] },
hgsuits: { sides: ["evb_suit", "evb_suit", "evb_suit", "evb_suit"], acts: [[0.5, 0, 1.8, "The suits", "read", evbHgSuits]] },
hgparts: { sides: ["shelfgoods", "shelfgoods", "shelfgoods", "crates"], grid: ["crates", 2, 2], acts: [[0.5, 0, 1.8, "The parts", "read", evbHgParts]] },
hgengine: { mid: [["machine", 0.55, 0]], sides: ["workbench", "pipes", "workbench"], acts: [[0.45, 0, 1.8, "The rocket engine", "read", evbHgEngine]] },
hgfuel: { grid: ["barrel", 2, 2], sides: ["desk", "noticeboard"], acts: [[0.5, 0, 1.8, "The fuel", "read", evbHgFuel]] },
hgbrief: { grid: ["schooldesk", 2, 2], far: ["wallscreen"], sides: ["noticeboard", "evb_planet"], acts: [[0.5, 0, 1.8, "The briefing", "read", evbHgBrief]] },
hgtools: { sides: ["trtoolwall", "workbench", "trtoolwall", "shelfgoods"], acts: [[0.5, 0, 1.8, "The tool crib", "read", evbHgTools]] },
hgpaint: { far: ["workbench", "shelfgoods"], sides: ["barrel", "crates", "barrel"], acts: [[0.5, 0, 1.8, "The paint shop", "read", evbHgPaint]] },
hgsim: { mid: [["evb_radar", 0.5, 0]], far: ["wallscreen", "wallscreen"], sides: ["chair", "monitor"], acts: [[0.5, 0, 1.8, "The simulator", "fly", evbHgSim]] },
hglockers: { sides: ["eslockers", "eslockers", "eslockers", "benchin"], acts: [[0.5, 0, 1.8, "The lockers", "look", evbHgLockers]] },
hgmodels: { grid: ["displaycase", 2, 2], sides: ["workbench", "evb_planet"], acts: [[0.5, 0, 1.8, "The models", "read", evbHgModels]] },
hgcrew: { sides: ["sofa", "counter", "sofa", "noticeboard"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The crew room", "have a tea", evbHgCrew]] }
});
evbRooms({
rxgate: { sides: ["eslockers", "noticeboard", "evb_suit", "pipes"], far: ["evb_airlock"], gap: 2.5, acts: [[0.35, 0, 2.0, "The reactor", "read", evbRxGate]] },
rxpipes: { sides: ["pipes", "pipes", "pipes", "pipes"] },
rxview: { far: ["wallscreen", "pipes", "wallscreen", "pipes"] },
rxcore: { mid: [["evb_core", 0.55, 0], ["evb_core", 0.55, -0.3], ["evb_core", 0.55, 0.3]], grid: ["machine", 2, 6, "-u", 0.15, 0.88], sides: ["pipes", "machine", "pipes", "boiler", "pipes"], far: ["wallscreen", "wallscreen"], acts: [[0.3, 0, 2.4, "The core", "read the gauges", evbRxCore]] },
rxcontrol: { grid: ["monitor", 2, 3, "-u", 0.35, 0.7], far: ["wallscreen", "wallscreen", "wallscreen"], sides: ["servertower", "chair", "servertower"], acts: [[0.5, 0, 1.8, "The control room", "look", evbRxControl]] },
rxcool: { sides: ["pipes", "evb_tank", "pipes", "evb_tank"], acts: [[0.5, 0, 1.8, "The cooling loop", "read", evbRxCool]] },
rxsolar: { far: ["machine", "wallscreen"], sides: ["machine", "evb_planet", "machine"], acts: [[0.5, 0, 1.8, "The solar wing", "read", evbRxSolar]] },
rxbattery: { grid: ["servertower", 2, 3], sides: ["machine", "noticeboard"], acts: [[0.5, 0, 1.8, "The batteries", "read", evbRxBattery]] },
rxturbine: { mid: [["flywheel", 0.55, 0]], sides: ["piston", "boiler", "piston"], acts: [[0.45, 0, 1.8, "The turbine", "read", evbRxTurbine]] },
rxsafety: { far: ["noticeboard", "noticeboard"], sides: ["desk", "filecabinet", "eslockers"], acts: [[0.5, 0, 1.8, "Safety", "read", evbRxSafety]] },
rxsuits: { sides: ["eslockers", "evb_suit", "eslockers", "benchin"], acts: [[0.5, 0, 1.8, "Suit up", "suit up", evbRxSuits]] },
rxlab: { far: ["counter", "machine"], sides: ["evb_microscope", "shelfgoods", "workbench"], acts: [[0.5, 0, 1.8, "The test lab", "read", evbRxLab]] },
rxgrid: { far: ["wallscreen", "wallscreen"], sides: ["servertower", "desk", "servertower"], mid: [["maptable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The grid", "read", evbRxGrid]] },
rxspare: { sides: ["shelfgoods", "crates", "shelfgoods", "crates"], grid: ["crates", 2, 2], acts: [[0.5, 0, 1.8, "The spares", "read", evbRxSpare]] },
rxhistory: { far: ["painting", "painting", "painting"], sides: ["displaycase", "painting", "displaycase"], acts: [[0.5, 0, 1.8, "The history wall", "read", evbRxHistory]] },
rxcrew: { sides: ["sofa", "counter", "sofa", "noticeboard"], mid: [["table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The crew room", "have breakfast", evbRxCrew]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, GILT = evbGilt;
var P = {}, MARI = [0xF08A10, 0xF5A623, 0xE8601A], SAND = 0xE8D2A8, STONE = 0xB8B0A0;
P.evb_murti = function () {
var g = G(), st = M(SAND, "stone"), gold = GILT(), sk = M(0xE07830);
B(g, st, 1.6, 0.5, 1.0, 0, 0.25, 0);
B(g, st, 1.4, 0.15, 0.9, 0, 0.58, 0);
[-0.65, 0.65].forEach(function (x) { Cy(g, st, 0.08, 0.09, 2.1, x, 1.7, -0.3, 8); });
B(g, st, 1.6, 0.3, 0.6, 0, 2.85, -0.3);
Co(g, gold, 0.55, 0.9, 0, 3.45, -0.3, 8);
var body = S(g, sk, 0.3, 0, 0.95, -0.1, 12);
body.scale.set(1, 1.1, 0.9);
S(g, sk, 0.22, 0, 1.38, -0.05, 12);
[-0.2, 0.2].forEach(function (x) { var e = S(g, sk, 0.14, x, 1.42, -0.12, 10); e.scale.set(0.5, 1, 1); });
var tr = Cy(g, sk, 0.05, 0.07, 0.4, 0, 1.18, 0.12, 8);
tr.rotation.x = 0.4;
Co(g, gold, 0.13, 0.22, 0, 1.66, -0.05, 10);
[-0.33, 0.33].forEach(function (x) { var a = Cy(g, sk, 0.05, 0.05, 0.35, x, 1.02, 0.05, 6); a.rotation.z = x > 0 ? -0.6 : 0.6; });
for (var i = 0; i < 12; i++) {
var t = Math.PI * (i / 11);
S(g, M(MARI[i % 3]), 0.045, Math.cos(t) * 0.3, 1.2 - Math.sin(t) * 0.3, 0.15, 6);
}
S(g, M(0xF2D8A0), 0.08, 0.22, 0.85, 0.2, 8);
return g;
};
P.evb_diya = function () {
var g = G(), br = M(0xC8962A, null, { e: 0x2A1A04 });
Cy(g, br, 0.22, 0.28, 0.06, 0, 0.03, 0, 12);
Cy(g, br, 0.03, 0.04, 1.3, 0, 0.68, 0, 8);
for (var r = 0; r < 4; r++) {
var y = 0.5 + r * 0.28, rr = 0.35 - r * 0.07;
Tor(g, br, rr, 0.015, 0, y, 0, Math.PI / 2);
for (var i = 0; i < 6; i++) {
var a = i * 1.047 + r * 0.5;
S(g, M(0xB8643A), 0.035, Math.cos(a) * rr, y + 0.02, Math.sin(a) * rr, 6).scale.set(1, 0.5, 1);
S(g, evbGlow(0xFFC040, 0.9), 0.02, Math.cos(a) * rr, y + 0.07, Math.sin(a) * rr, 6);
}
}
S(g, evbGlow(0xFFD060), 0.04, 0, 1.38, 0, 8);
return g;
};
P.evb_rangoli = function () {
var g = G(), C = [0xE8308A, 0xF5C518, 0x2AA8E0, 0x3AC860, 0xF06020, 0xFFFFFF];
for (var r = 0; r < 5; r++) {
var c = Cy(g, M(C[r]), 1.1 - r * 0.2, 1.1 - r * 0.2, 0.01, 0, 0.006 + r * 0.003, 0, 24);
}
for (var i = 0; i < 8; i++) {
var a = i * Math.PI / 4;
var p = S(g, M(C[(i % 2) ? 4 : 0]), 0.18, Math.cos(a) * 0.8, 0.02, Math.sin(a) * 0.8, 8);
p.scale.set(1, 0.08, 0.5);
p.rotation.y = -a;
}
return g;
};
P.evb_nandi = function () {
var g = G(), st = M(0x3A3632, "stone");
B(g, M(STONE, "stone"), 1.6, 0.3, 1.0, 0, 0.15, 0);
var b = S(g, st, 0.45, 0, 0.65, -0.1, 12);
b.scale.set(0.9, 0.8, 1.5);
S(g, st, 0.3, 0, 0.95, 0.45, 10).scale.set(0.8, 0.6, 0.5);
var h = S(g, st, 0.22, 0, 0.95, 0.68, 10);
h.scale.set(0.9, 1, 1.1);
[-0.16, 0.16].forEach(function (x) { Co(g, st, 0.04, 0.2, x, 1.18, 0.65, 6); });
for (var i = 0; i < 9; i++) {
var t = Math.PI * (i / 8);
S(g, M(MARI[i % 3]), 0.045, Math.cos(t) * 0.25, 0.8 - Math.sin(t) * 0.15, 0.62, 6);
}
return g;
};
P.evb_pillar = function () {
var g = G(), st = M(SAND, "stone");
B(g, st, 0.7, 0.4, 0.7, 0, 0.2, 0);
for (var i = 0; i < 5; i++) {
B(g, st, 0.5, 0.55, 0.5, 0, 0.68 + i * 0.62, 0);
B(g, M(0xD8C090, "stone"), 0.58, 0.07, 0.58, 0, 0.98 + i * 0.62, 0);
}
for (var j = 0; j < 4; j++) {
var a = j * Math.PI / 2;
S(g, M(0xC8B080, "stone"), 0.09, Math.sin(a) * 0.27, 1.3 + (j % 2) * 1.2, Math.cos(a) * 0.27, 8);
}
B(g, st, 1.0, 0.3, 1.0, 0, 3.85, 0);
return g;
};
P.evb_veena = function () {
var g = G(), wd = M(0x8A4A1A, "wood");
B(g, M(0xC0302A, "damask"), 1.6, 0.03, 1.0, 0, 0.015, 0);
var n = Cy(g, wd, 0.04, 0.05, 1.3, -0.1, 0.25, 0, 8);
n.rotation.z = Math.PI / 2;
S(g, wd, 0.22, -0.75, 0.25, 0, 12);
S(g, M(0xD8A050), 0.15, 0.45, 0.22, 0, 10);
[0.25, 0.45].forEach(function (z, i) { Cy(g, M(i ? 0x3A2A1A : 0xA87838), 0.11, 0.13, 0.25, 0.5, 0.14, z, 12); Cy(g, M(0x2A2420), 0.08, 0.08, 0.01, 0.5, 0.27, z, 12); });
return g;
};
P.evb_ghanta = function () {
var g = G(), wd = M(0x6A3A1A, "wood"), br = M(0xC8962A, null, { e: 0x2A1A04 });
[-1.0, 1.0].forEach(function (x) { B(g, wd, 0.15, 2.6, 0.15, x, 1.3, 0); });
B(g, wd, 2.3, 0.18, 0.2, 0, 2.6, 0);
[-0.6, 0, 0.6].forEach(function (x, i) { var y = 1.9 - (i % 2) * 0.2; Cy(g, br, 0.01, 0.01, 0.6 - (i % 2) * 0.2, x, 2.25 - (i % 2) * 0.1, 0, 4); Co(g, br, 0.16, 0.3, x, y, 0, 12); Cy(g, br, 0.17, 0.17, 0.04, x, y - 0.15, 0, 12); S(g, br, 0.04, x, y - 0.2, 0, 6); });
return g;
};
P.evb_kund = function () {
var g = G(), st = M(STONE, "stone");
for (var i = 0; i < 3; i++) {
var w = 2.6 - i * 0.5;
B(g, st, w, 0.12, 0.25, 0, 0.06 + i * 0.0, w / 2 - 0.12);
B(g, st, w, 0.12, 0.25, 0, 0.06, -(w / 2 - 0.12));
B(g, st, 0.25, 0.12, w, w / 2 - 0.12, 0.06, 0);
B(g, st, 0.25, 0.12, w, -(w / 2 - 0.12), 0.06, 0);
}
B(g, M(0x2A7A8A, null, { op: 0.85 }), 1.5, 0.02, 1.5, 0, 0.05, 0);
for (var k = 0; k < 5; k++) {
var l = Cy(g, M(0x3A8A3A), 0.12, 0.12, 0.01, -0.5 + k * 0.25, 0.07, (k % 2) * 0.3 - 0.15, 10);
S(g, M(0xF0A0C0), 0.05, -0.5 + k * 0.25, 0.1, (k % 2) * 0.3 - 0.15, 6);
}
return g;
};
P.evb_rose = function () {
var g = G(), st = M(STONE, "stone"), C = [0x2A50B8, 0xC0302A, 0xE8B030, 0x3A9A4A, 0x8A3AB8];
Tor(g, st, 1.2, 0.1, 0, 1.8, 0, 0);
S(g, evbGlow(0xE8B030, 0.9), 0.22, 0, 1.8, 0.02, 10).scale.set(1, 1, 0.1);
for (var i = 0; i < 12; i++) {
var a = i * Math.PI / 6;
var p = S(g, evbGlow(C[i % 5], 0.85), 0.24, Math.cos(a) * 0.65, 1.8 + Math.sin(a) * 0.65, 0.02, 8);
p.scale.set(1, 1, 0.1);
var p2 = S(g, evbGlow(C[(i + 2) % 5], 0.85), 0.14, Math.cos(a + 0.26) * 1.0, 1.8 + Math.sin(a + 0.26) * 1.0, 0.02, 8);
p2.scale.set(1, 1, 0.1);
var bar = B(g, st, 0.05, 1.1, 0.06, Math.cos(a) * 0.6, 1.8 + Math.sin(a) * 0.6, 0.03);
bar.rotation.z = a - Math.PI / 2;
}
B(g, st, 2.6, 0.3, 0.3, 0, 0.15, 0);
return g;
};
P.evb_gothic = function () {
var g = G(), st = M(0xC8C0B0, "stone");
B(g, st, 1.0, 0.5, 1.0, 0, 0.25, 0);
Cy(g, st, 0.3, 0.3, 4.6, 0, 2.8, 0, 12);
for (var i = 0; i < 8; i++) {
var a = i * Math.PI / 4;
Cy(g, st, 0.09, 0.09, 4.6, Math.cos(a) * 0.32, 2.8, Math.sin(a) * 0.32, 8);
}
Cy(g, M(0xB8B0A0, "stone"), 0.55, 0.4, 0.35, 0, 5.2, 0, 12);
return g;
};
P.evb_stalls = function () {
var g = G(), wd = M(0x5A3A22, "wood");
B(g, wd, 2.4, 0.5, 0.6, 0, 0.25, 0);
B(g, wd, 2.4, 1.4, 0.1, 0, 1.0, -0.3);
B(g, wd, 2.4, 0.08, 0.4, 0, 1.05, -0.1);
for (var i = 0; i < 4; i++) {
var x = -0.9 + i * 0.6;
B(g, wd, 0.06, 0.5, 0.5, x - 0.3, 0.75, 0);
Co(g, wd, 0.12, 0.45, x, 2.1, -0.2, 4);
B(g, M(0xC0302A, "damask"), 0.5, 0.05, 0.4, x, 0.52, 0.02);
}
B(g, wd, 2.4, 0.2, 0.5, 0, 1.75, -0.1);
return g;
};
P.evb_tomb = function () {
var g = G(), st = M(0xD8D0C0, "marble");
B(g, st, 2.2, 0.8, 1.1, 0, 0.4, 0);
for (var i = 0; i < 4; i++)
B(g, M(0xC8C0B0, "marble"), 0.35, 0.5, 0.02, -0.75 + i * 0.5, 0.4, 0.56);
[-0.25, 0.25].forEach(function (z) { var f = Cy(g, st, 0.14, 0.16, 1.6, 0, 0.95, z, 10); f.rotation.z = Math.PI / 2; S(g, st, 0.13, -0.88, 0.98, z, 10); B(g, st, 0.12, 0.15, 0.1, -0.2, 1.12, z); });
S(g, M(0xD8D0C0, "marble"), 0.12, 0.9, 0.95, -0.25, 8);
return g;
};
P.evb_bigbell = function () {
var g = G(), wd = M(0x5A3A22, "wood"), br = M(0xA87838, null, { e: 0x1A1004 });
[-1.0, 1.0].forEach(function (x) { B(g, wd, 0.2, 3.0, 0.2, x, 1.5, -0.4); B(g, wd, 0.2, 3.0, 0.2, x, 1.5, 0.4); B(g, wd, 0.2, 0.2, 1.0, x, 2.9, 0); });
B(g, wd, 2.2, 0.25, 0.25, 0, 2.9, 0);
var b = Co(g, br, 0.8, 1.3, 0, 1.95, 0, 18);
Cy(g, br, 0.85, 0.85, 0.1, 0, 1.3, 0, 18);
S(g, br, 0.12, 0, 1.4, 0, 8);
Cy(g, M(0xD8C890), 0.02, 0.02, 1.2, 0.5, 0.8, 0, 6);
return g;
};
P.evb_gargoyle = function () {
var g = G(), st = M(0x8A8478, "stone");
B(g, M(STONE, "stone"), 0.8, 0.9, 0.8, 0, 0.45, 0);
var b = S(g, st, 0.3, 0, 1.15, 0.05, 10);
b.scale.set(1, 0.9, 1.3);
var h = S(g, st, 0.2, 0, 1.4, 0.35, 10);
h.scale.set(1, 0.9, 1.2);
Cy(g, st, 0.06, 0.08, 0.3, 0, 1.36, 0.6, 8).rotation.x = Math.PI / 2;
[-0.1, 0.1].forEach(function (x) { Co(g, st, 0.04, 0.15, x, 1.6, 0.3, 6); S(g, M(0x14100E), 0.03, x, 1.45, 0.52, 6); });
[-1, 1].forEach(function (s) { var w = B(g, st, 0.04, 0.5, 0.4, s * 0.3, 1.35, -0.1); w.rotation.z = s * 0.5; });
return g;
};
P.evb_floormaze = function () {
var g = G();
Cy(g, M(0xE0D8C8, "stone"), 2.2, 2.2, 0.02, 0, 0.01, 0, 32);
for (var i = 0; i < 11; i++) {
var r = 0.35 + i * 0.17;
var t = Tor(g, M(0x4A4438, "stone"), r, 0.025, 0, 0.025, 0, Math.PI / 2);
}
for (var j = 0; j < 6; j++) {
var a = j * Math.PI / 3;
S(g, M(0x4A4438, "stone"), 0.12, Math.cos(a) * 0.22, 0.025, Math.sin(a) * 0.22, 8).scale.set(1, 0.1, 1);
}
return g;
};
P.evb_reliquary = function () {
var g = G(), gold = GILT();
B(g, M(0x7A1E24, "damask"), 1.0, 0.9, 0.7, 0, 0.45, 0);
B(g, gold, 0.8, 0.45, 0.45, 0, 1.12, 0);
var r1 = B(g, gold, 0.84, 0.04, 0.32, 0, 1.45, -0.11);
r1.rotation.x = 0.6;
var r2 = B(g, gold, 0.84, 0.04, 0.32, 0, 1.45, 0.11);
r2.rotation.x = -0.6;
[-0.25, 0, 0.25].forEach(function (x, i) { B(g, M([0x2A50B8, 0xC0302A, 0x2A50B8][i]), 0.18, 0.25, 0.01, x, 1.12, 0.23); S(g, M(0xE8F0FF), 0.03, x, 1.3, 0.23, 6); });
return g;
};
P.evb_icon = function () {
var g = G(), wd = M(0x7A4A2A, "wood");
B(g, wd, 0.7, 0.06, 0.35, 0, 1.2, 0);
B(g, GILT(), 0.45, 0.6, 0.04, 0, 1.55, -0.12);
B(g, M(0x8A3A2A), 0.3, 0.4, 0.01, 0, 1.55, -0.095);
S(g, M(0xD8B890), 0.06, 0, 1.66, -0.09, 8);
Cy(g, M(0xC8962A), 0.005, 0.005, 0.35, 0, 1.95, 0.08, 4);
Cy(g, M(0xC0302A, null, { op: 0.8 }), 0.06, 0.04, 0.1, 0, 1.75, 0.08, 10);
S(g, evbGlow(0xFFC060), 0.025, 0, 1.8, 0.08, 6);
B(g, M(0xF4F0E6, "damask"), 0.7, 0.02, 0.36, 0, 1.24, 0.0);
return g;
};
P.evb_bougain = function () {
var g = G();
Cy(g, M(0xF4F4F0, "plaster"), 0.3, 0.22, 0.5, 0, 0.25, 0, 12);
for (var i = 0; i < 14; i++) {
var a = i * 1.3, r = 0.12 + (i % 3) * 0.12, y = 0.6 + (i % 4) * 0.25;
S(g, M(i % 4 ? 0xD8207A : 0x3A8A3A), 0.14, Math.cos(a) * r, y, Math.sin(a) * r, 8);
}
return g;
};
P.evb_tavli = function () {
var g = G(), wd = M(0x2A6AA8, "wood");
Cy(g, wd, 0.45, 0.45, 0.04, 0, 0.74, 0, 16);
Cy(g, wd, 0.04, 0.05, 0.72, 0, 0.36, 0, 8);
B(g, M(0x8A5A2A, "wood"), 0.5, 0.05, 0.4, 0, 0.78, 0);
for (var i = 0; i < 6; i++) {
B(g, M(i % 2 ? 0xF0E8D8 : 0x5A2A1A), 0.035, 0.005, 0.15, -0.2 + i * 0.08, 0.81, 0.1);
S(g, M(i % 2 ? 0x14100E : 0xF4F0E6), 0.025, -0.2 + i * 0.08, 0.82, -0.1, 6).scale.set(1, 0.4, 1);
}
[-0.3, 0.3].forEach(function (x) { Cy(g, M(0xF4F4F0), 0.04, 0.03, 0.07, x, 0.8, 0.25, 8); });
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_murti", "evb_diya", "evb_ghanta", "evb_nandi", "evb_pillar", "evb_gothic", "evb_stalls", "evb_tomb", "evb_bigbell", "evb_gargoyle", "evb_reliquary", "evb_bougain", "evb_tavli"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("mandir", { corner: "evb_diya", seed: 51, panel: 0xE8D2A8,
pal: { fab: "mustard", fab2: "crimson", wood: "cherry", metal: "brass", stone: "sand", art: 3, rug: 5, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF0DCB8, "plaster"], "D8D0C0|coffer": [0xC0302A, "coffer"] },
hello: "🛕 <b>Inside the Hindu temple.</b> Through the gate tower and the pillared hall to the garbhagriha, the 'womb chamber', where the god lives in the murti. Walk round it clockwise, ring the bell, light a lamp, watch the dancers. Look for the ✨ cards. The way out is the gate." });
evbHouse("mandir", { g: EVB_GRID.temple, h: 5.4, levels: 1, stairX: 4, stairZ: 12, floors: ["The temple"], wall: 0xF0DCB8, trim: 0xC0302A,
plan: [{ hall: { k: "hdgate", n: "The Gate under the Gopuram" }, spine: { k: "hdmandapa", n: "The Mandapa, the Pillared Hall" }, gallery: { k: "hdpath", n: "The Pradakshina Path" },
back: { merge: EVB_BACK, k: "hdgarbha", n: "The Garbhagriha, the Womb Chamber" },
r1i: { k: "hdnandi", n: "Nandi's Pavilion" }, r1o: { k: "hdbells", n: "The Bell Hall" },
r2i: { k: "hdlamps", n: "The Hall of Lamps" }, r2o: { k: "hdkitchen", n: "The Temple Kitchen" },
r3i: { k: "hddance", n: "The Dance Hall" }, r3o: { k: "hdmusic", n: "The Musicians' Hall" },
l1i: { k: "hdtank", n: "The Temple Tank" }, l1o: { k: "hdflowers", n: "The Flower Sellers' Hall" },
l2i: { k: "hdthousand", n: "The Hall of a Thousand Pillars" }, l2o: { k: "hdrangoli", n: "The Rangoli Court" },
l3i: { k: "hdpriests", n: "The Priests' Room" }, l3o: { k: "hdstories", n: "The Hall of Stories" } }] });
evbTheme("cathedral", { corner: "candles", seed: 53, panel: 0xD8D0C0,
pal: { fab: "crimson", fab2: "navy", wood: "oak", metal: "gold", stone: "granite", art: 2, rug: 1, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8D0C0, "stone"], "D8D0C0|coffer": [0x2A3A6A, "coffer"] },
hello: "⛪ <b>Inside the grand cathedral.</b> A Gothic cathedral of the kind built across Europe from the 1100s: the long nave, the crossing under the tower, the choir, the crypt below and the cloister beside; upstairs the rose window, the organ, the library and the bells. Look for the ✨ cards; the stair is by the west door." });
evbHouse("cathedral", { g: EVB_GRID.wide, h: 7.2, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The cathedral floor", "The galleries and the tower"], wall: 0xD8D0C0, trim: 0x6A5A4A,
plan: [
{ hall: { k: "ctwest", n: "The West Door" }, spine: { k: "ctnave", n: "The Nave" }, gallery: { k: "ctaisle", n: "The North Aisle" },
back: { merge: EVB_BACK, k: "ctchoir", n: "The Choir and the High Altar" },
r1i: { k: "ctfont", n: "The Baptistry" }, r1o: { k: "ctlady", n: "The Lady Chapel" },
r2i: { k: "ctcrossing", n: "The Crossing under the Tower" }, r2o: { k: "cttombs", n: "The Tombs of the Bishops" },
r3i: { k: "ctmaze", n: "The Pavement Maze" }, r3o: { k: "ctrelic", n: "The Shrine of the Relics" },
l1i: { k: "ctchapter", n: "The Chapter House" }, l1o: { k: "ctcloister", n: "The Cloister" },
l2i: { k: "cttreasury", n: "The Treasury" }, l2o: { k: "ctsacristy", n: "The Sacristy" },
l3i: { k: "ctcrypt", n: "The Crypt" }, l3o: { k: "ctmasons", n: "The Masons' Lodge" } },
{ hall: { k: "cttriforium", n: "The Triforium Gallery" }, spine: { k: "ctclere", n: "The Clerestory Walk" }, gallery: { k: "ctrosewalk", n: "The Rose Window Gallery" },
back: { merge: EVB_BACK, k: "ctbells", n: "The Bell Chamber" },
r1: { merge: ["r1i", "r1o"], k: "ctorgan", n: "The Organ Loft" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "ctlibrary", n: "The Cathedral Library" },
l1: { merge: ["l1i", "l1o"], k: "ctscript", n: "The Scriptorium" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "ctroof", n: "The Roof Walk and the Gargoyles" } }
] });
evbTheme("cycladic", { corner: "evb_bougain", seed: 55, panel: 0xF4F4F0,
pal: { fab: "navy", fab2: "ivory", wood: "pine", metal: "iron", stone: "marble", art: 6, rug: 3, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF8F8F4, "plaster"], "D8D0C0|coffer": [0x6A4A2A, "coffer"] },
hello: "🏝️ <b>Inside the island house.</b> A whitewashed house of the Cyclades, the Greek islands of the Aegean: blue doors and shutters, a courtyard, a roof terrace over the sea. Bake bread, play tavli, press olives. Look for the ✨ cards. The way out is the blue door." });
evbHouse("cycladic", { g: EVB_GRID.mid, h: 3.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The island house"], wall: 0xF8F8F4, trim: 0x1E5AA8,
plan: [{ hall: { k: "cydoor", n: "The Blue Door" }, spine: { k: "cycourt", n: "The Whitewashed Courtyard" }, gallery: { k: "cyterrace", n: "The Roof Terrace" },
back: { merge: EVB_BACK, k: "cysala", n: "The Big Room" },
r1i: { k: "cykitchen", n: "The Kitchen" }, r1o: { k: "cyoven", n: "The Bread Oven" },
r2i: { k: "cybed", n: "The Bedroom" }, r2o: { k: "cykids", n: "The Children's Room" },
r3i: { k: "cyloom", n: "The Loom Room" }, r3o: { k: "cycistern", n: "The Cistern" },
l1i: { k: "cychapel", n: "The Little Chapel" }, l1o: { k: "cykafe", n: "The Kafeneio Corner" },
l2i: { k: "cyfish", n: "The Fisherman's Store" }, l2o: { k: "cycheese", n: "The Cheese Room" },
l3i: { k: "cyolive", n: "The Olive Press" }, l3o: { k: "cyfigures", n: "The Room of Marble Figures" } }] });
evbFins({
hdgate: ["stone", 0xC8B490, 0xF0DCB8, "stone", 0xC0302A], hdmandapa: ["stone", 0xC0AC88, 0xE8D2A8, "stone", 0xD8B040, "coffer"], hdpath: ["stone", 0xC8B490, 0xF0DCB8, "stone", 0xC0302A],
hdgarbha: ["stone", 0x8A7A6A, 0x5A4A3A, "stone", 0xD8B040, "coffer"], hdnandi: ["stone", 0xC0AC88, 0xF0DCB8, "stone", 0xC0302A], hdbells: ["stone", 0xC0AC88, 0xE8D2A8, "stone", 0xD8B040],
hdlamps: ["stone", 0xB8A480, 0xF5C860, "plaster", 0xC0302A], hdkitchen: ["tile", 0xC8743A, 0xF8E8C8, "plaster", 0x3A8A3A], hddance: ["wood", 0x8A5A2A, 0xE8608A, "plaster", 0xD8B040],
hdmusic: ["wood", 0x8A5A2A, 0xF0DCB8, "plaster", 0xC0302A], hdtank: ["stone", 0xB8B0A0, 0xE8E0D0, "stone", 0x2A7A8A], hdflowers: ["stone", 0xC0AC88, 0xF8E0B0, "plaster", 0xF08A10],
hdthousand: ["stone", 0xC0AC88, 0xE8D2A8, "stone", 0xD8B040, "coffer"], hdrangoli: ["stone", 0xD8C8A8, 0xF8E8C8, "plaster", 0xE8308A], hdpriests: ["wood", 0x8A5A2A, 0xF0DCB8, "plaster", 0xC0302A],
hdstories: ["stone", 0xC0AC88, 0x2A6A5A, "plaster", 0xD8B040],
ctwest: ["stone", 0xA8A090, 0xD8D0C0, "stone", 0x6A5A4A], ctnave: ["stone", 0xA8A090, 0xD8D0C0, "stone", 0x6A5A4A, "coffer"], ctaisle: ["stone", 0xA8A090, 0xD0C8B8, "stone", 0x6A5A4A],
ctchoir: ["marble", 0xD8D0C0, 0xD8D0C0, "stone", 0xD8B040, "coffer"], ctfont: ["stone", 0xA8A090, 0xE0E8EC, "stone", 0x6A5A4A], ctlady: ["marble", 0xD8D0C0, 0x2A3A8A, "plaster", 0xD8B040, "coffer"],
ctcrossing: ["checker", 0xD8D0C0, 0xD8D0C0, "stone", 0x6A5A4A, "coffer"], cttombs: ["stone", 0x9A9284, 0xC8C0B0, "stone", 0x5A5040], ctmaze: ["stone", 0xB8B0A0, 0xD8D0C0, "stone", 0x6A5A4A],
ctrelic: ["marble", 0xD8D0C0, 0x7A1E24, "plaster", 0xD8B040], ctchapter: ["stone", 0xA8A090, 0xD8D0C0, "stone", 0x6A5A4A, "coffer"], ctcloister: ["stone", 0xA8A090, 0xE0D8C8, "stone", 0x3A7A3A],
cttreasury: ["marble", 0xD8D0C0, 0x1E2A5A, "plaster", 0xD8B040], ctsacristy: ["wood", 0x6A4A2A, 0xD8D0C0, "stone", 0x7A1E24], ctcrypt: ["stone", 0x7A746A, 0x9A9284, "stone", 0x4A4438, "coffer"],
ctmasons: ["stone", 0x9A8A6A, 0xC8C0B0, "stone", 0x6A5A4A],
cttriforium: ["stone", 0xA8A090, 0xD8D0C0, "stone", 0x6A5A4A], ctclere: ["stone", 0xA8A090, 0xD8D0C0, "stone", 0x2A50B8], ctrosewalk: ["stone", 0xA8A090, 0xD8D0C0, "stone", 0xC0302A],
ctbells: ["wood", 0x6A4A2A, 0xB8B0A0, "stone", 0x5A3A22], ctorgan: ["wood", 0x6A4A2A, 0xD8D0C0, "stone", 0xD8B040], ctlibrary: ["wood", 0x5A3A22, 0x4A2A1A, "wood", 0xD8B040, "coffer"],
ctscript: ["wood", 0x7A5A3A, 0xE8E0D0, "plaster", 0x7A1E24], ctroof: ["stone", 0x8A8478, 0xB8B0A0, "stone", 0x5A5040],
cydoor: ["stone", 0xD8D4CC, 0xF8F8F4, "plaster", 0x1E5AA8], cycourt: ["stone", 0xC8C4BC, 0xF8F8F4, "plaster", 0x1E5AA8], cyterrace: ["stone", 0xD8D4CC, 0xF8F8F4, "plaster", 0x1E5AA8],
cysala: ["wood", 0x9A7A58, 0xF8F8F4, "plaster", 0x1E5AA8], cykitchen: ["tile", 0x2A6AA8, 0xF8F8F4, "plaster", 0x1E5AA8], cyoven: ["stone", 0xC8C4BC, 0xF4F0E6, "plaster", 0x6A4A2A],
cybed: ["wood", 0x9A7A58, 0xF8F8F4, "plaster", 0x1E5AA8], cykids: ["wood", 0x9A7A58, 0xF8F8F4, "plaster", 0xE8B030], cyloom: ["wood", 0x9A7A58, 0xF8F8F4, "plaster", 0xC0302A],
cycistern: ["stone", 0xA8A4A0, 0xD8E4EC, "stone", 0x1E5AA8], cychapel: ["stone", 0xD8D4CC, 0xF8F8F4, "plaster", 0xD8B040], cykafe: ["stone", 0xC8C4BC, 0xF8F8F4, "plaster", 0x1E5AA8],
cyfish: ["stone", 0xB8B4AC, 0xE8F0F4, "plaster", 0x1E5AA8], cycheese: ["stone", 0xC8C4BC, 0xF4F0E6, "plaster", 0x6A4A2A], cyolive: ["stone", 0xB8B4AC, 0xF4F0E6, "plaster", 0x5A6A2A],
cyfigures: ["marble", 0xE8E4DC, 0xF8F8F4, "plaster", 0x1E5AA8]
});
EVB_LD.mandir = { theme: "mandir", name: "The Hindu Temple", doors: "the temple gate" };
EVB_LD.gopuram = { theme: "mandir", name: "The Temple of the Gopuram", doors: "the gate under the tower" };
EVB_LD.grandcathedral = { theme: "cathedral", name: "The Grand Cathedral", doors: "the west door" };
EVB_LD.cycladic = { theme: "cycladic", name: "The Island House", doors: "the blue door" };
EVB_LD.temple = { theme: "grandtemple", name: "The Temple", doors: "the bronze doors" };
EVB_LD.minaret = { theme: "mosque", name: "The Minaret and its Mosque", doors: "the courtyard gate" };
EVB_LD.spaceport = { theme: "hangar", name: "The Spaceport", doors: "the crew door" };
"use strict";
var evbHdGate = evbInfo("The gopuram", "In the south of India, temples are entered through a gopuram, a gate tower that can rise more than 60 metres, covered with hundreds of painted figures of gods, animals and heroes. The Meenakshi Temple in Madurai has fourteen of them. The tallest, the Rajagopuram of Srirangam, is about 73 metres high.");
var evbHdMandapa = evbInfo("The mandapa", "The mandapa is the pillared hall where worshippers gather before the shrine. Its pillars are carved all over: dancers, musicians, gods, lions and twining plants. A North Indian temple has a tall curved tower, the <b>shikhara</b>, over the shrine; a South Indian one has a stepped <b>vimana</b>.");
function evbHdGarbha() { return __ZC(367, 95, this, arguments, new.target); }
var evbHdPath = evbInfo("The path round the shrine", "Pradakshina: worshippers walk round the shrine clockwise, keeping the god on their right, as you would walk round someone you honour. At some great temples pilgrims walk the whole outer wall, several kilometres.");
function evbHdNandi() { evbTune([196, 262], 500, 0.8); evbSay("🐂 Nandi the bull, the mount of the god Shiva, kneels facing the shrine, always watching his master. Some people whisper their wishes into Nandi's ear, so that he can pass them on."); }
function evbHdBell() { evbTune([880, 1047, 880], 350, 1.2); evbSay("🔔 Clang! You ring the temple bell as you go in. Its sound is said to wake the mind, and drive away distractions, so you can turn to the god."); }
function evbHdLamp() { evbTune([523, 659], 300, 0.6); evbSay("🪔 You light a diya, a little clay lamp of oil with a cotton wick. At Diwali, the festival of lights, millions of them are lit across India for the victory of light over darkness."); }
function evbHdKitchen() { return __ZC(367, 96, this, arguments, new.target); }
function evbHdDance() { return __ZC(367, 97, this, arguments, new.target); }
function evbHdMusic() { evbTune([294, 330, 370, 440, 494, 440, 370], 260, 1.2); evbSay("🎶 The veena hums and the tabla patter. Indian classical music is built on the <b>raga</b>, a set of notes with its own mood, often for a particular time of day, and the <b>tala</b>, the cycle of beats."); }
var evbHdTank = evbInfo("The temple tank", "Many temples have a tank, a stepped pool where pilgrims bathe before worship. The Golden Lotus Tank of the Meenakshi Temple is one; in some, at festival time, the god is taken out on the water on a floating raft lit with lamps.");
var evbHdFlowers = evbFact("The flower sellers", ["Marigolds and jasmine are strung into garlands for the gods, and for honoured guests.", "Women in the south often wear strings of jasmine in their hair.", "Lotus flowers stand for purity: they grow from the mud and open clean to the sun."]);
var evbHdThousand = evbInfo("The Hall of a Thousand Pillars", "The Meenakshi Temple's hall has 985 carved pillars, and at Rameswaram the temple corridors run for about a kilometre between pillars. Some temple pillars are 'musical': tap them and each one rings a different note.");
function evbHdRangoli() { return __ZC(367, 98, this, arguments, new.target); }
var evbHdPriests = evbInfo("The priests' room", "The temple priests learn the old prayers in Sanskrit by heart, often from childhood, father to son. The Vedas, the oldest Hindu scriptures, were passed on by mouth for many centuries before they were written down, and are among the oldest religious texts still in use.");
function evbHdStories() { return __ZC(367, 99, this, arguments, new.target); }
var evbCtWest = evbInfo("The west door", "Cathedrals face east, towards the sunrise, so you come in at the west and walk towards the altar. The great west front is carved with saints and kings and, over the middle door, the Last Judgement. The word 'cathedral' comes from <b>cathedra</b>, the bishop's chair.");
var evbCtNave = evbInfo("The nave", "The Gothic builders learned to raise walls of glass: pointed arches and ribbed vaults carry the weight down onto the pillars, and flying buttresses outside push back against the walls. The vault of Beauvais Cathedral, about 48 metres high, is the tallest Gothic choir ever built; it fell in 1284 and had to be rebuilt.");
function evbCtChoir() { return __ZC(367, 100, this, arguments, new.target); }
var evbCtFont = evbInfo("The baptistry", "The font stands near the door because baptism is the way in to the Church. Some old fonts are carved from a single block of stone; many have eight sides, for the 'eighth day' of new creation.");
var evbCtLady = evbInfo("The Lady Chapel", "Behind or beside the high altar many cathedrals have a chapel for the Virgin Mary, the Lady Chapel. Its windows are often the brightest blue: Chartres is famous for its 'Chartres blue' glass of the 1100s and 1200s.");
var evbCtCrossing = evbInfo("The crossing", "Where the nave meets the transepts, the arms of the cross, a great tower or spire rises. Salisbury's spire, finished about 1320, is 123 metres high, the tallest in Britain; it leans a little, and has done for centuries. Cologne Cathedral was begun in 1248 and only finished in 1880, 632 years later.");
var evbCtTombs = evbInfo("The tombs", "Bishops, knights and kings were buried in the cathedral, and carved lying on their tombs with their hands together in prayer, a dog or a lion at their feet. In some, the knight's crossed legs were long said to mean a crusader, though historians doubt it.");
function evbCtMaze() { return __ZC(367, 101, this, arguments, new.target); }
var evbCtRelic = evbInfo("The shrine of the relics", "Medieval pilgrims travelled across Europe to pray at the shrines of saints: Thomas Becket at Canterbury, murdered in his cathedral in 1170, or St James at Santiago de Compostela. They bought little badges of tin to show where they had been.");
var evbCtChapter = evbInfo("The chapter house", "The canons met here every day to read a chapter of their rule, which gave the room its name, and to run the cathedral's business. Many chapter houses are round or eight-sided, the vault held up by a single central pillar like a stone palm tree.");
var evbCtCloister = evbFact("The cloister", ["A covered walk round a square garden, where the monks or canons read, walked and washed.", "The garden in the middle, the garth, was often planted only with grass, or with a single tree.", "Monks sometimes scratched board games into the stone benches: you can still find them at Canterbury and Westminster."]);
var evbCtTreasury = evbInfo("The treasury", "Gold chalices, jewelled crosses, embroidered robes, carved ivory: a cathedral's treasury held its riches. When Notre-Dame de Paris burned in April 2019, firefighters and priests carried the treasures out in a human chain. The cathedral reopened in December 2024.");
var evbCtSacristy = evbInfo("The sacristy", "Here the vestments and the altar vessels are kept, and the clergy robe for the services. The colour of the robes changes with the season: purple for Advent and Lent, white and gold for Christmas and Easter, red for martyrs, green for the ordinary weeks.");
var evbCtCrypt = evbInfo("The crypt", "Under the choir lies the crypt, the oldest part of many cathedrals, with low round arches from an earlier church. Chartres has one of the largest in France, more than 200 metres long. Saints and bishops lie here, by candlelight.");
function evbCtMason() { return __ZC(367, 102, this, arguments, new.target); }
var evbCtTriforium = evbInfo("The triforium", "Halfway up the nave runs the triforium, a narrow passage behind a row of little arches. Above it is the clerestory, the 'clear storey' of tall windows that floods the church with light.");
var evbCtClere = evbFact("The windows", ["Medieval glass was coloured with metals melted into it: cobalt for blue, copper for red and green.", "The windows were 'the poor man's Bible': people who could not read learned the Bible stories from them.", "Faces and folds were painted on the glass in brown enamel and fired on."]);
function evbCtRose() { evbTune([523, 659, 784, 659], 500, 1.4); evbSay("🌹 The rose window glows: a wheel of saints, prophets and kings around the centre. The north rose of Notre-Dame is about 13 metres across and still holds most of its glass of the 1250s."); }
function evbCtBells() { return __ZC(367, 103, this, arguments, new.target); }
function evbCtOrgan() { evbTune([131, 196, 262, 330, 392, 523, 392, 262], 400, 3.2); evbSay("🎹 You pull the stops and play a chord. A great cathedral organ can have thousands of pipes, from a pencil's size to more than ten metres tall; the lowest notes are felt more than heard."); }
var evbCtLibrary = evbInfo("The cathedral library", "Before printing, every book was copied by hand, and books were so precious they were chained to the shelves. Hereford Cathedral still has its chained library, and also the Mappa Mundi of about 1300, a map of the whole world with Jerusalem at its centre.");
function evbCtScript() { return __ZC(367, 104, this, arguments, new.target); }
var evbCtRoof = evbInfo("The roof and the gargoyles", "Gargoyles are waterspouts: the rain runs off the roof and out of their mouths, well clear of the walls. The name comes from the French for 'throat', as in 'gargle'. The carved creatures that are not spouts are called grotesques.");
var evbCyDoor = evbInfo("The island house", "On the Cyclades, the islands of the Aegean such as Santorini, Mykonos and Naxos, houses are whitewashed with lime, again and again. The white throws back the fierce sun and keeps the house cool, and lime was once used against germs too. The doors and shutters are painted blue, or green, or red.");
var evbCyCourt = evbInfo("The courtyard", "Houses are built close together, up the hillsides, with narrow lanes and steps between. The twisting lanes broke the wind and, it is said, confused pirates. Flat roofs catch the rain and send it down into the cistern.");
function evbCyTerrace() { evbTune([523, 587, 659, 587], 400, 1.2); evbSay("🌅 From the roof terrace you look out over the sea. On Santorini the town of Oia hangs on the edge of a great flooded volcano crater, the caldera, and people gather every evening to watch the sunset."); }
var evbCySala = evbInfo("The big room", "The best room was kept for guests, name days and feasts, with the family's embroidery, plates on the walls and photographs. In Greece your name day, the feast of the saint you are named after, is often celebrated more than your birthday.");
function evbCyKitchen() { return __ZC(367, 105, this, arguments, new.target); }
function evbCyOven() { evbTune([330, 392], 300, 0.6); evbSay("🍞 You slide the loaves into the domed oven. Rusks, twice-baked bread, kept for months, and fishermen and shepherds took them on long trips."); }
var evbCyBed = evbInfo("The bedroom", "Beds were often built into the thick walls, up on a platform, with storage below. Over the bed hangs a little blue glass eye, the <b>mati</b>, to keep off the evil eye.");
function evbCyKids() { evbTune([523, 587, 659, 784], 200, 0.6); evbSay("🪁 A kite hangs on the wall. In Greece kites are flown on Clean Monday, the first day of Lent, and the sky fills with them."); }
var evbCyLoom = evbInfo("The loom room", "Island women wove and embroidered the household's linen, rugs and the bride's dowry. Each island had its own patterns and colours, and the best pieces were passed down for generations.");
var evbCyCistern = evbInfo("The cistern", "Many Cycladic islands have almost no rivers or springs, so every drop of rain was precious. Rain from the roofs and terraces runs down into a cistern under the house, cool and dark, to last through the long dry summer.");
function evbCyChapel() { evbTune([392, 440, 392], 500, 1.0); evbSay("🕯️ You light a beeswax candle before the icon. The islands are dotted with hundreds of little white chapels, many built by a family to thank a saint for a safe return from sea."); }
function evbCyKafe() { return __ZC(367, 106, this, arguments, new.target); }
var evbCyFish = evbFact("The fisherman's store", ["Fishermen mended their yellow nets on the quay every morning.", "The little painted fishing boat of the islands is called a kaiki.", "Sponge divers of the Dodecanese once dived with only a heavy stone to take them down."]);
function evbCyCheese() { evbTune([392, 349], 300, 0.6); evbSay("🧀 Fresh cheese from the goats and sheep is pressed in little rush baskets, which leave their pattern on the rind. Naxos is famous for its graviera."); }
function evbCyPress() { return __ZC(367, 107, this, arguments, new.target); }
var evbCyFigures = evbInfo("The marble figures", "About 5,000 years ago, people of the Cyclades carved figures from the islands' white marble: women with folded arms, their faces smooth but for a nose. They were once painted, with eyes and patterns. On Santorini, the town of Akrotiri was buried by the volcano around 1600 BC, its painted walls of swallows, boys with fish and blue monkeys kept safe under the ash.");
"use strict";
evbRooms({
hdgate: { sides: ["evb_pillar", "evb_marigolds", "evb_pillar", "evb_diya"], far: ["evb_pillar", "evb_pillar"], gap: 3.4, mid: [["evb_rangoli", 0.3, 0]], acts: [[0.35, 0, 2.0, "The gopuram", "read", evbHdGate]] },
hdmandapa: { grid: ["evb_pillar", 2, 3, "-u", 0.3, 0.7], sides: ["evb_pillar", "evb_diya", "evb_pillar", "evb_marigolds"], ceil: "lantern", acts: [[0.5, 0, 1.8, "The mandapa", "read", evbHdMandapa]] },
hdpath: { far: ["evb_pillar", "evb_diya", "evb_pillar", "evb_marigolds", "evb_pillar", "evb_diya"], acts: [[0.5, 0, 1.8, "The path round the shrine", "read", evbHdPath]] },
hdgarbha: { mid: [["evb_murti", 0.78, 0], ["evb_diya", 0.6, -0.22], ["evb_diya", 0.6, 0.22], ["evb_rangoli", 0.45, 0], ["redrunner", 0.3, 0, "+u"]], grid: ["evb_pillar", 2, 4, "-u", 0.15, 0.35],
sides: ["evb_pillar", "evb_marigolds", "evb_pillar", "evb_diya", "evb_pillar"], far: ["evb_pillar", "evb_marigolds", "evb_pillar"], ceil: "lantern",
acts: [[0.62, 0, 2.4, "The murti of Ganesha", "stand before him", evbHdGarbha]] },
hdnandi: { mid: [["evb_nandi", 0.55, 0, "+u"]], sides: ["evb_pillar", "evb_marigolds", "evb_pillar"], acts: [[0.5, 0, 1.8, "Nandi", "say hello", evbHdNandi]] },
hdbells: { mid: [["evb_ghanta", 0.55, 0]], sides: ["evb_pillar", "evb_diya", "evb_pillar"], far: ["evb_ghanta"], acts: [[0.45, 0, 1.8, "The temple bells", "ring a bell", evbHdBell]] },
hdlamps: { far: ["evb_diya", "evb_diya", "evb_diya"], sides: ["evb_diya", "candles", "evb_diya", "candles"], grid: ["evb_diya", 2, 2, "-u", 0.4, 0.6], acts: [[0.5, 0, 1.8, "The lamps", "light a diya", evbHdLamp]] },
hdkitchen: { far: ["stove", "stove"], sides: ["counter", "shelfgoods", "counter", "barrel"], mid: [["longtable", 0.55, 0]], acts: [[0.5, 0, 1.8, "The temple kitchen", "help out", evbHdKitchen]] },
hddance: { sides: ["evb_pillar", "wallmirror", "evb_pillar", "evb_diya"], far: ["evb_veena"], mid: [["evb_rangoli", 0.5, 0]], acts: [[0.5, 0, 1.8, "The dance", "watch", evbHdDance]] },
hdmusic: { mid: [["evb_veena", 0.55, 0]], sides: ["pelt", "evb_diya", "pelt", "evb_pillar"], acts: [[0.45, 0, 1.8, "The musicians", "listen", evbHdMusic]] },
hdtank: { mid: [["evb_kund", 0.5, 0]], sides: ["evb_pillar", "evb_marigolds", "evb_pillar", "evb_diya"], acts: [[0.5, 0.3, 1.8, "The temple tank", "read", evbHdTank]] },
hdflowers: { grid: ["evb_marigolds", 2, 3], sides: ["flowerbucket", "evb_marigolds", "flowerbucket", "counter"], acts: [[0.5, 0, 1.8, "The garlands", "read", evbHdFlowers]] },
hdthousand: { grid: ["evb_pillar", 3, 3, "-u", 0.2, 0.8], sides: ["evb_pillar", "evb_pillar", "evb_diya", "evb_pillar"], acts: [[0.5, 0, 1.8, "The thousand pillars", "tap a pillar", evbHdThousand]] },
hdrangoli: { mid: [["evb_rangoli", 0.5, 0]], sides: ["evb_marigolds", "evb_diya", "evb_marigolds", "evb_diya"], acts: [[0.5, 0.25, 1.8, "The rangoli", "draw a kolam", evbHdRangoli]] },
hdpriests: { far: ["bookshelf", "wardrobe"], sides: ["pelt", "evb_diya", "shelfgoods", "pelt"], mid: [["lectern", 0.5, 0]], acts: [[0.5, 0, 1.8, "The priests' room", "read", evbHdPriests]] },
hdstories: { far: ["painting", "painting", "painting"], sides: ["painting", "evb_pillar", "painting", "evb_diya"], acts: [[0.5, 0, 1.8, "The Ramayana", "hear the story", evbHdStories]] }
});
evbRooms({
ctwest: { sides: ["evb_gothic", "noticeboard", "evb_gothic", "candles"], far: ["evb_gothic", "evb_gothic"], gap: 3.6, ceil: "ironchandelier", acts: [[0.35, 0, 2.0, "The west door", "read", evbCtWest]] },
ctnave: { sides: ["pew", "evb_gothic", "pew", "pew", "evb_gothic", "pew"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The nave", "look up", evbCtNave]] },
ctaisle: { far: ["evb_glass", "evb_gothic", "evb_glass", "evb_gothic", "evb_glass"], sides: ["candles", "evb_tomb"] },
ctchoir: { far: ["altarinside", "evb_rose"], mid: [["redrunner", 0.4, 0, "+u"], ["lectern", 0.6, 0]], grid: ["evb_stalls", 2, 4, "-u", 0.25, 0.55], sides: ["evb_gothic", "candles", "evb_gothic", "candles", "evb_gothic"], ceil: "chandelier",
acts: [[0.75, 0, 2.2, "The choir", "sing", evbCtChoir]] },
ctfont: { mid: [["evb_font", 0.55, 0]], sides: ["evb_gothic", "candles", "evb_glass"], acts: [[0.45, 0, 1.8, "The font", "read", evbCtFont]] },
ctlady: { far: ["altarinside"], sides: ["evb_glass", "candles", "evb_glass", "candles"], grid: ["pew", 1, 3, "-u", 0.45, 0.45], acts: [[0.6, 0, 1.8, "The Lady Chapel", "read", evbCtLady]] },
ctcrossing: { grid: ["evb_gothic", 2, 2, "-u", 0.2, 0.8], mid: [["pulpit", 0.5, 0.3]], sides: ["evb_glass", "candles", "evb_glass"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The crossing", "look up at the tower", evbCtCrossing]] },
cttombs: { grid: ["evb_tomb", 1, 3, "-u", 0.5, 0.5], sides: ["evb_glass", "candles", "evb_glass"], acts: [[0.5, 0.35, 1.8, "The tombs", "read", evbCtTombs]] },
ctmaze: { mid: [["evb_floormaze", 0.5, 0]], sides: ["evb_gothic", "candles", "evb_gothic", "candles"], rug: false, acts: [[0.5, 0.38, 1.8, "The pavement maze", "walk it", evbCtMaze]] },
ctrelic: { mid: [["evb_reliquary", 0.6, 0]], sides: ["candles", "evb_glass", "candles", "evb_glass"], far: ["candles", "candles"], acts: [[0.45, 0, 1.8, "The shrine", "read", evbCtRelic]] },
ctchapter: { mid: [["evb_gothic", 0.5, 0]], sides: ["benchin", "benchin", "benchin", "benchin"], far: ["benchin", "benchin"], acts: [[0.5, 0.3, 1.8, "The chapter house", "read", evbCtChapter]] },
ctcloister: { sides: ["evb_gothic", "benchin", "evb_gothic", "plant"], mid: [["plant", 0.5, 0], ["evb_well", 0.5, 0.3]], acts: [[0.5, -0.3, 1.8, "The cloister", "read", evbCtCloister]] },
cttreasury: { far: ["displaycase", "evb_reliquary", "displaycase"], sides: ["displaycase", "crownstand", "displaycase", "treasurechest"], mid: [["displaycase", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The treasury", "look", evbCtTreasury]] },
ctsacristy: { far: ["wardrobe", "wardrobe"], sides: ["dressform", "displaycase", "dressform", "wallmirror"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The vestments", "read", evbCtSacristy]] },
ctcrypt: { grid: ["sarcophagus", 2, 2, "-u", 0.35, 0.65], sides: ["candles", "coffin", "candles", "evb_tomb"], ceil: "lantern", acts: [[0.5, 0, 1.8, "The crypt", "read", evbCtCrypt]] },
ctmasons: { mid: [["workbench", 0.5, 0], ["boulder", 0.65, 0.25]], sides: ["workbench", "boulder", "trtoolwall", "boulder"], far: ["evb_gargoyle"], acts: [[0.5, -0.2, 1.8, "The masons", "carve your mark", evbCtMason]] },
cttriforium: { far: ["evb_gothic", "evb_gothic", "evb_gothic", "evb_gothic", "evb_gothic"], sides: ["benchin", "candles"], acts: [[0.5, 0, 1.8, "The triforium", "read", evbCtTriforium]] },
ctclere: { far: ["evb_glass", "evb_glass", "evb_glass", "evb_glass"], acts: [[0.5, 0, 1.8, "The windows", "read", evbCtClere]] },
ctrosewalk: { far: ["evb_rose", "evb_rose"], sides: ["benchin", "candles", "benchin"], acts: [[0.55, 0, 1.8, "The rose window", "look", evbCtRose]] },
ctbells: { mid: [["evb_bigbell", 0.55, -0.2], ["evb_bigbell", 0.55, 0.2]], grid: ["evb_bellrope", 1, 3, "-u", 0.3, 0.3], sides: ["benchin", "evb_bellrope", "benchin"], ceil: "lantern",
acts: [[0.4, 0, 2.0, "The great bells", "ring", evbCtBells]] },
ctorgan: { far: ["esorgan", "esorgan"], sides: ["bookshelf", "chair", "lectern"], acts: [[0.5, 0, 1.8, "The organ", "play", evbCtOrgan]] },
ctlibrary: { far: ["bookshelf", "bookshelf", "bookshelf", "bookshelf"], grid: ["lectern", 2, 3, "-u", 0.35, 0.65], sides: ["bookshelf", "esreading", "bookshelf", "maptable"], ceil: "chandelier",
acts: [[0.5, 0, 1.8, "The chained books", "read", evbCtLibrary]] },
ctscript: { grid: ["desk", 2, 2, "-u", 0.35, 0.65], sides: ["bookshelf", "lectern", "bookshelf", "candles"], acts: [[0.5, 0, 1.8, "The scriptorium", "illuminate a letter", evbCtScript]] },
ctroof: { grid: ["evb_gargoyle", 2, 3, "-u", 0.25, 0.75], sides: ["evb_gargoyle", "evb_gothic", "evb_gargoyle"], rug: false, acts: [[0.5, 0, 1.8, "The gargoyles", "read", evbCtRoof]] }
});
evbRooms({
cydoor: { sides: ["evb_bougain", "chair", "evb_bougain", "evb_amphora"], far: ["evb_bougain", "evb_bougain"], gap: 3, acts: [[0.35, 0, 2.0, "The island house", "read", evbCyDoor]] },
cycourt: { mid: [["evb_tavli", 0.5, 0]], sides: ["evb_bougain", "evb_amphora", "evb_bougain", "chair"], acts: [[0.5, 0.3, 1.8, "The courtyard", "read", evbCyCourt]] },
cyterrace: { far: ["evb_bougain", "chair", "evb_bougain", "chair", "evb_bougain"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The view", "look out", evbCyTerrace]] },
cysala: { far: ["sofa", "painting", "sofa"], sides: ["armchair", "painting", "clock", "wallmirror", "armchair"], mid: [["longtable", 0.5, 0]], grid: ["chair", 2, 3, "-u", 0.4, 0.6], acts: [[0.5, 0, 1.8, "The big room", "read", evbCySala]] },
cykitchen: { far: ["stove", "sink"], sides: ["counter", "shelfgoods", "counter", "evb_amphora"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The kitchen", "cook", evbCyKitchen]] },
cyoven: { mid: [["evb_horno", 0.55, 0]], sides: ["trbreadrack", "counter", "barrel"], acts: [[0.4, 0, 1.8, "The oven", "bake", evbCyOven]] },
cybed: { far: ["bed", "evb_icon"], sides: ["wardrobe", "evb_bougain", "footchest", "chair"], mid: [["pelt", 0.45, 0]], acts: [[0.5, 0, 1.8, "The bedroom", "read", evbCyBed]] },
cykids: { sides: ["cot", "toys", "cot", "wardrobe"], mid: [["toys", 0.5, 0], ["xp_playmat", 0.5, 0.3]], far: ["toys", "shelfgoods"], acts: [[0.5, 0, 1.8, "The kite", "look", evbCyKids]] },
cyloom: { mid: [["loom", 0.5, 0]], sides: ["footchest", "loom", "shelfgoods", "evb_blanket"], far: ["evb_blanket", "dressform"], acts: [[0.45, 0, 1.8, "The loom", "read", evbCyLoom]] },
cycistern: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "evb_amphora", "barrel", "evb_amphora"], far: ["evb_amphora", "barrel"], acts: [[0.45, 0, 1.8, "The cistern", "read", evbCyCistern]] },
cychapel: { far: ["evb_icon", "evb_icon"], sides: ["candles", "evb_icon", "candles"], mid: [["candles", 0.6, 0]], acts: [[0.5, 0, 1.8, "The icon", "light a candle", evbCyChapel]] },
cykafe: { grid: ["evb_tavli", 2, 2, "-u", 0.35, 0.65], sides: ["chair", "counter", "chair", "shelfgoods"], acts: [[0.5, 0, 1.8, "Tavli", "play", evbCyKafe]] },
cyfish: { sides: ["trnets", "barrel", "trnets", "crates"], mid: [["trfishtable", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The nets", "read", evbCyFish]] },
cycheese: { far: ["shelfgoods", "shelfgoods"], sides: ["counter", "barrel", "shelfgoods"], mid: [["butcherblock", 0.5, 0]], acts: [[0.5, 0, 1.8, "The cheeses", "taste", evbCyCheese]] },
cyolive: { mid: [["trmillstone", 0.5, 0]], sides: ["evb_amphora", "barrel", "evb_amphora", "barrel"], acts: [[0.5, 0.3, 1.8, "The olive press", "turn it", evbCyPress]] },
cyfigures: { far: ["displaycase", "esbust", "displaycase"], sides: ["displaycase", "evb_amphora", "displaycase"], mid: [["esbust", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The marble figures", "read", evbCyFigures]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, GILT = evbGilt;
var P = {}, RED = 0xC0201A, CHROME = 0xD8DCE0, BONE = 0xE8DCC0;
P.evb_engine = function () {
var g = G(), rd = M(RED), ch = M(CHROME), bk = M(0x1A1A1A);
B(g, rd, 2.2, 1.4, 4.6, 0, 1.15, 0);
B(g, rd, 2.2, 1.0, 1.5, 0, 2.2, 1.5);
B(g, M(0x1A2A3A, null, { e: 0x050A10 }), 2.0, 0.6, 0.05, 0, 2.25, 2.26);
[-1.6, 1.6].forEach(function (z) { [-1.1, 1.1].forEach(function (x) { Cy(g, bk, 0.45, 0.45, 0.3, x, 0.45, z, 14).rotation.z = Math.PI / 2; Cy(g, ch, 0.2, 0.2, 0.32, x, 0.45, z, 10).rotation.z = Math.PI / 2; }); });
[-0.6, 0.6].forEach(function (x) { B(g, M(0xD8D8D0), 0.08, 0.08, 4.0, x, 2.75, -0.6); });
for (var i = 0; i < 12; i++)
B(g, M(0xD8D8D0), 1.2, 0.05, 0.05, 0, 2.75, -2.5 + i * 0.33);
[-0.6, 0.6].forEach(function (x) { var r = Cy(g, M(0xD8C040), 0.35, 0.35, 0.3, x * 1.9, 1.3, -1.4, 14); r.rotation.z = Math.PI / 2; });
B(g, ch, 2.24, 0.25, 0.1, 0, 0.75, 2.32);
[-0.8, 0.8].forEach(function (x) { S(g, evbGlow(0xFFF4D0), 0.13, x, 1.15, 2.32, 8); });
B(g, M(0x2A50B8, null, { e: 0x0A1440 }), 0.9, 0.12, 0.25, 0, 2.78, 1.5);
return g;
};
P.evb_pole = function () { var g = G(), br = M(0xC8962A, null, { e: 0x2A1A04 }); Cy(g, M(0x3A3A3A), 0.7, 0.7, 0.12, 0, 0.06, 0, 16); Cy(g, br, 0.05, 0.05, 4.0, 0, 2.1, 0, 10); Tor(g, br, 0.5, 0.05, 0, 3.9, 0, Math.PI / 2); return g; };
P.evb_hoses = function () {
var g = G(), rd = M(RED);
B(g, M(0x5A5A5A), 2.0, 2.0, 0.4, 0, 1.0, -0.1);
for (var i = 0; i < 3; i++) {
var r = Cy(g, M(0xD8C890), 0.3, 0.3, 0.15, -0.6 + i * 0.6, 0.5, 0.15, 14);
r.rotation.x = Math.PI / 2;
}
for (var j = 0; j < 3; j++) {
var x = -0.6 + j * 0.6;
B(g, M(0x2A2A20), 0.5, 0.9, 0.1, x, 1.35, 0.15);
var h = S(g, M(j === 1 ? 0xE8E8E0 : 0xD8B020), 0.17, x, 1.92, 0.15, 10);
h.scale.set(1, 0.7, 1.2);
}
return g;
};
P.evb_hydrant = function () { var g = G(), rd = M(RED); Cy(g, rd, 0.18, 0.2, 0.75, 0, 0.38, 0, 12); S(g, rd, 0.18, 0, 0.78, 0, 10); Cy(g, rd, 0.06, 0.06, 0.5, 0, 0.5, 0, 8).rotation.z = Math.PI / 2; Cy(g, M(CHROME), 0.07, 0.07, 0.08, 0, 0.5, 0.2, 8).rotation.x = Math.PI / 2; return g; };
P.evb_horse = function () {
var g = G(), bay = M(0x7A4422), bk = M(0x1A1410);
var b = S(g, bay, 0.45, 0, 1.3, 0, 14);
b.scale.set(0.8, 0.85, 2.0);
[[-0.22, 0.55], [0.22, 0.55], [-0.22, -0.6], [0.22, -0.6]].forEach(function (p) { Cy(g, bay, 0.07, 0.06, 1.0, p[0], 0.55, p[1], 8); Cy(g, bk, 0.08, 0.08, 0.1, p[0], 0.05, p[1], 8); });
var n = Cy(g, bay, 0.16, 0.24, 0.8, 0, 1.75, 0.85, 10);
n.rotation.x = -0.6;
var h = B(g, bay, 0.24, 0.26, 0.6, 0, 2.05, 1.2);
h.rotation.x = 0.5;
[-0.08, 0.08].forEach(function (x) { Co(g, bay, 0.05, 0.14, x, 2.35, 1.05, 6); S(g, bk, 0.03, x * 1.6, 2.1, 1.2, 6); });
for (var i = 0; i < 5; i++)
B(g, bk, 0.06, 0.18, 0.12, 0, 1.95 - i * 0.12, 0.75 + i * 0.1);
var t = Cy(g, bk, 0.04, 0.1, 0.8, 0, 1.05, -0.95, 8);
t.rotation.x = 0.4;
return g;
};
P.evb_cart = function () {
var g = G(), wd = M(0x8A5A2A, "wood");
B(g, wd, 1.6, 0.1, 2.2, 0, 0.9, 0);
B(g, wd, 1.6, 0.5, 0.06, 0, 1.2, -1.1);
[-0.78, 0.78].forEach(function (x) { B(g, wd, 0.06, 0.5, 2.2, x, 1.2, 0); Tor(g, M(0x4A3222, "wood"), 0.6, 0.06, x * 1.1, 0.62, 0, 0); var w = Cy(g, wd, 0.1, 0.1, 0.15, x * 1.1, 0.62, 0, 8); w.rotation.z = Math.PI / 2; });
[-0.4, 0.4].forEach(function (x) { B(g, wd, 0.08, 0.08, 1.8, x, 0.8, 1.9); });
for (var i = 0; i < 3; i++)
B(g, M(0xD8C060), 0.9, 0.35, 0.5, -0.1 + i * 0.05, 1.15, -0.5 + i * 0.5);
return g;
};
P.evb_dino = function () {
var g = G(), bn = M(BONE);
B(g, M(0x3A3A3A), 1.6, 0.3, 4.0, 0, 0.15, 0);
for (var i = 0; i < 14; i++) {
var z = -1.8 + i * 0.28, y = 1.9 + Math.sin(i / 13 * Math.PI) * 0.4;
S(g, bn, 0.1, 0, y, z, 6);
if (i > 3 && i < 10) {
var r = Tor(g, bn, 0.38, 0.03, 0, y - 0.3, z, 0);
r.scale.set(0.9, 1.1, 1);
}
}
var sk = B(g, bn, 0.4, 0.5, 0.9, 0, 2.3, 1.95);
B(g, bn, 0.34, 0.15, 0.8, 0, 2.0, 2.0);
for (var t = 0; t < 6; t++)
Co(g, M(0xF4F0E0), 0.025, 0.08, -0.15 + (t % 2) * 0.3, 2.04, 1.7 + t * 0.08, 4);
[[-0.3, 0.35], [0.3, 0.35]].forEach(function (p) { var l = Cy(g, bn, 0.08, 0.06, 1.6, p[0], 1.0, p[1], 8); l.rotation.x = 0.2; B(g, bn, 0.15, 0.06, 0.4, p[0], 0.33, p[1] + 0.2); });
[-0.2, 0.2].forEach(function (x) { var a = Cy(g, bn, 0.03, 0.03, 0.4, x, 1.8, 1.3, 6); a.rotation.x = 1; });
[0, 1, 2].forEach(function (j) { Cy(g, M(0x5A5A5A), 0.03, 0.03, 1.8, 0, 1.0, -1.2 + j * 1.1, 6); });
return g;
};
P.evb_whale = function () {
var g = G(), bn = M(BONE);
for (var i = 0; i < 18; i++) {
var z = -3 + i * 0.36, s = Math.sin((i + 1) / 19 * Math.PI);
S(g, bn, 0.08 + s * 0.06, 0, -0.6, z, 6);
if (i > 3 && i < 14) {
var r = Tor(g, bn, 0.25 + s * 0.35, 0.03, 0, -0.75 - s * 0.2, z, 0);
r.scale.set(1, 0.8, 1);
}
}
B(g, bn, 0.6, 0.25, 1.4, 0, -0.65, 3.6);
[-1, 1].forEach(function (s) { var f = B(g, bn, 1.0, 0.05, 0.3, s * 0.8, -0.9, 1.6); f.rotation.z = s * 0.4; });
[-2, 0, 2].forEach(function (z) { Cy(g, M(0x5A5A5A), 0.01, 0.01, 0.6, 0, -0.3, z, 4); });
return g;
};
P.evb_fossil = function () {
var g = G();
B(g, M(0x3A3A3A), 0.7, 1.0, 0.7, 0, 0.5, 0);
for (var i = 0; i < 5; i++) {
var t = Tor(g, M([0xA88A60, 0x9A7A50][i % 2], "stone"), 0.06 + i * 0.065, 0.03 + i * 0.012, 0, 1.4, 0, 0);
}
return g;
};
P.evb_meteor = function () {
var g = G();
B(g, M(0x2A2A2A), 0.9, 0.9, 0.9, 0, 0.45, 0);
var r = S(g, M(0x4A4440, "stone"), 0.32, 0, 1.15, 0, 8);
r.scale.set(1.2, 0.8, 1);
B(g, M(0xE8F4FF, null, { op: 0.25 }), 0.85, 0.8, 0.85, 0, 1.3, 0);
return g;
};
P.evb_kiln = function () {
var g = G(), br = M(0xA8543A, "stone");
Cy(g, br, 1.0, 1.3, 2.4, 0, 1.2, 0, 16);
Cy(g, br, 0.35, 1.0, 1.4, 0, 3.1, 0, 16);
Cy(g, br, 0.35, 0.35, 0.6, 0, 4.1, 0, 12);
B(g, M(0x2A1A14), 0.7, 0.8, 0.1, 0, 0.6, 1.24);
B(g, evbGlow(0xFF7020, 0.85), 0.55, 0.6, 0.02, 0, 0.6, 1.3);
B(g, M(0x3A2A20), 2.4, 0.2, 0.4, 0, 0.1, 1.4);
return g;
};
P.evb_potshelf = function () {
var g = G(), wd = M(0x8A6A4A, "wood"), C = [0xC8A880, 0x2A6AA8, 0x3A8A5A, 0xC8A880, 0xE8E0D0, 0xB8643A];
[-0.95, 0.95].forEach(function (x) { B(g, wd, 0.06, 2.0, 0.4, x, 1.0, 0); });
for (var r = 0; r < 4; r++) {
B(g, wd, 1.95, 0.04, 0.4, 0, 0.3 + r * 0.5, 0);
for (var i = 0; i < 5; i++) {
var c = C[(i + r) % 6];
var p = Cy(g, M(c), 0.09, 0.07, 0.24, -0.72 + i * 0.36, 0.44 + r * 0.5, 0, 10);
S(g, M(c), 0.1, -0.72 + i * 0.36, 0.48 + r * 0.5, 0, 8).scale.set(1, 0.8, 1);
}
}
return g;
};
P.evb_screen = function () {
var g = G(), vel = M(0x8A1420, "damask");
B(g, M(0x14100E), 5.2, 3.2, 0.1, 0, 1.9, -0.1);
B(g, evbGlow(0xD8D4C8, 0.95), 4.4, 2.4, 0.02, 0, 2.0, -0.03);
[[0xA8B8C8, -1.2, 2.4], [0x3A4A5A, 1.0, 1.6], [0xE8D0A0, 0.2, 2.9]].forEach(function (q) { B(g, evbGlow(q[0], 0.9), 1.4, 0.7, 0.01, q[1], q[2], -0.01); });
[-2.5, 2.5].forEach(function (x) { for (var i = 0; i < 3; i++)
Cy(g, vel, 0.14, 0.14, 3.6, x + (x > 0 ? -1 : 1) * i * 0.22, 1.8, 0, 8); });
B(g, vel, 5.6, 0.5, 0.2, 0, 3.65, 0.05);
B(g, GILT(), 5.6, 0.1, 0.22, 0, 3.4, 0.06);
B(g, M(0x3A1A14, "wood"), 5.4, 0.6, 0.8, 0, 0.3, 0.3);
return g;
};
P.evb_seats = function () {
var g = G(), vel = M(0xA81A24, "damask"), mt = M(0x2A2A2A);
for (var i = 0; i < 5; i++) {
var x = -1.0 + i * 0.5;
B(g, vel, 0.44, 0.12, 0.45, x, 0.45, 0);
B(g, vel, 0.44, 0.55, 0.1, x, 0.75, -0.22);
B(g, mt, 0.04, 0.45, 0.45, x - 0.24, 0.4, -0.02);
}
B(g, mt, 0.04, 0.45, 0.45, 1.26, 0.4, -0.02);
return g;
};
P.evb_projector = function () {
var g = G(), mt = M(0x3A4048);
B(g, mt, 0.6, 1.0, 0.6, 0, 0.5, 0);
B(g, mt, 0.8, 0.45, 0.4, 0, 1.25, 0);
[0.25, -0.25].forEach(function (z, i) { var r = Cy(g, M(0x8A8A8A), 0.35, 0.35, 0.05, 0, 1.95 - i * 0.3, z * 2.2, 18); r.rotation.x = Math.PI / 2; Cy(g, mt, 0.06, 0.06, 0.07, 0, 1.95 - i * 0.3, z * 2.2, 8).rotation.x = Math.PI / 2; });
var l = Cy(g, M(0x1A1A1A), 0.08, 0.1, 0.3, 0, 1.25, 0.35, 10);
l.rotation.x = Math.PI / 2;
S(g, evbGlow(0xFFF4D8), 0.07, 0, 1.25, 0.5, 8);
return g;
};
P.evb_popcorn = function () {
var g = G();
B(g, M(0xC0201A), 0.9, 0.9, 0.6, 0, 0.6, 0);
for (var i = 0; i < 4; i++)
B(g, M(0xF8F4E8), 0.1, 0.9, 0.61, -0.33 + i * 0.22, 0.6, 0);
B(g, M(0xE8F4FF, null, { op: 0.35 }), 0.85, 0.6, 0.55, 0, 1.35, 0);
for (var j = 0; j < 14; j++)
S(g, M(0xF8E8A0), 0.05, -0.3 + (j % 5) * 0.15, 1.1 + Math.floor(j / 5) * 0.06, -0.15 + (j % 3) * 0.15, 6);
B(g, M(0xC0201A), 0.95, 0.08, 0.6, 0, 1.69, 0);
[-0.35, 0.35].forEach(function (x) { Cy(g, M(0x2A2A2A), 0.12, 0.12, 0.06, x, 0.12, 0.32, 10).rotation.z = Math.PI / 2; });
return g;
};
P.evb_minecage = function () {
var g = G(), ir = M(0x4A4A48), wd = M(0x5A3A22, "wood");
[[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]].forEach(function (p) { B(g, wd, 0.25, 4.0, 0.25, p[0] * 1.15, 2.0, p[1] * 1.15); });
B(g, ir, 1.8, 0.08, 1.8, 0, 0.2, 0);
B(g, ir, 1.8, 0.08, 1.8, 0, 2.4, 0);
for (var i = 0; i < 7; i++) {
B(g, ir, 0.03, 2.2, 0.03, -0.85 + i * 0.28, 1.3, -0.88);
B(g, ir, 0.03, 2.2, 0.03, -0.85 + i * 0.28, 1.3, 0.88);
}
Cy(g, M(0x8A8A80), 0.02, 0.02, 1.6, 0, 3.2, 0, 4);
B(g, wd, 2.6, 0.25, 0.25, 0, 4.0, 0);
return g;
};
P.evb_grain = function () { var g = G(); var c = Co(g, M(0xD8B050), 1.1, 0.9, 0, 0.45, 0, 16); S(g, M(0xD8B050), 0.4, 0.7, 0.1, 0.4, 8).scale.set(1, 0.3, 1); B(g, M(0x8A6A3A, "wood"), 0.3, 0.05, 1.2, 0.9, 0.03, 0.6); return g; };
P.evb_tractor = function () {
var g = G(), rd = M(0xB8201A), bk = M(0x1A1A1A);
B(g, rd, 0.9, 0.7, 1.6, 0, 1.0, 0.3);
B(g, rd, 0.8, 0.08, 0.8, 0, 1.9, -0.55);
[-0.35, 0.35].forEach(function (x) { B(g, M(0x2A2A2A), 0.04, 0.9, 0.04, x, 1.45, -0.9); B(g, M(0x2A2A2A), 0.04, 0.9, 0.04, x, 1.45, -0.2); });
[-0.6, 0.6].forEach(function (x) { Cy(g, bk, 0.65, 0.65, 0.35, x, 0.65, -0.6, 14).rotation.z = Math.PI / 2; Cy(g, bk, 0.35, 0.35, 0.25, x * 0.8, 0.35, 1.0, 12).rotation.z = Math.PI / 2; });
Cy(g, M(0x3A3A3A), 0.06, 0.06, 0.6, 0.25, 1.6, 0.8, 6);
B(g, M(0x8A6A3A), 0.4, 0.06, 0.4, 0, 1.4, -0.55);
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_engine", "evb_pole", "evb_hoses", "evb_hydrant", "evb_horse", "evb_cart", "evb_dino", "evb_fossil", "evb_meteor", "evb_kiln", "evb_potshelf", "evb_screen", "evb_seats", "evb_projector", "evb_popcorn", "evb_minecage", "evb_grain", "evb_tractor"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("firehouse", { corner: "evb_hydrant", seed: 61, panel: 0xD8D0C0,
pal: { fab: "crimson", fab2: "navy", wood: "oak", metal: "brass", stone: "granite", art: 9, rug: 2, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE8E0D0, "plaster"], "D8D0C0|coffer": [0x8A1A14, "coffer"] },
hello: "🚒 <b>Inside the firehouse.</b> The engines are polished and ready, the gear is by the doors, and the brass pole comes down from the bunks upstairs. Look for the ✨ cards. The way out is the big doors." });
evbHouse("firehouse", { g: EVB_GRID.wide, h: 4.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The firehouse"], wall: 0xE8E0D0, trim: 0xB8201A,
plan: [{ hall: { k: "fhdoors", n: "The Engine Doors" }, spine: { k: "fhwalk", n: "The Apparatus Floor" }, gallery: { k: "fhgear", n: "The Turnout Gear" },
back: { merge: EVB_BACK, k: "fhbay", n: "The Engine Bay" },
r1i: { k: "fhpole", n: "The Pole Hole" }, r1o: { k: "fhwatch", n: "The Watch Room" },
r2i: { k: "fhbunks", n: "The Bunk Room" }, r2o: { k: "fhkitchen", n: "The Firehouse Kitchen" },
r3i: { k: "fhhose", n: "The Hose Tower" }, r3o: { k: "fhyard", n: "The Training Yard" },
l1i: { k: "fhold", n: "The Old Engines" }, l1o: { k: "fhdog", n: "The Dog's Corner" },
l2i: { k: "fhschool", n: "The Fire Safety Room" }, l2o: { k: "fhrescue", n: "The Rescue Kit" },
l3i: { k: "fhgym", n: "The Gym" }, l3o: { k: "fhchief", n: "The Chief's Office" } }] });
evbTheme("stable", { corner: "trhay", seed: 63, panel: 0xC8A878,
pal: { fab: "emerald", fab2: "mustard", wood: "oak", metal: "iron", stone: "granite", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8C8A8, "plaster"], "D8D0C0|coffer": [0x6A4A2A, "coffer"] },
hello: "🐴 <b>Inside the stable.</b> Horses in their stalls, saddles in the tack room, hay in the loft and the farrier at his forge. Say hello, groom a horse, pick up a hoof. Look for the ✨ cards. The way out is the yard door." });
evbHouse("stable", { g: EVB_GRID.mid, h: 4.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The stable"], wall: 0xD8C8A8, trim: 0x6A4A2A,
plan: [{ hall: { k: "sbdoor", n: "The Yard Door" }, spine: { k: "sbaisle", n: "The Stable Aisle" }, gallery: { k: "sbloft", n: "The Hay Loft" },
back: { merge: EVB_BACK, k: "sbschool", n: "The Riding School" },
r1i: { k: "sbstalls", n: "The Stalls" }, r1o: { k: "sbtack", n: "The Tack Room" },
r2i: { k: "sbforge", n: "The Farrier's Forge" }, r2o: { k: "sbgroom", n: "The Grooming Bay" },
r3i: { k: "sbfoal", n: "The Foaling Box" }, r3o: { k: "sbfeed", n: "The Feed Room" },
l1i: { k: "sbcarriage", n: "The Carriage House" }, l1o: { k: "sbwash", n: "The Wash Bay" },
l2i: { k: "sbpony", n: "The Pony Stalls" }, l2o: { k: "sbrosettes", n: "The Rosette Room" },
l3i: { k: "sbgroomroom", n: "The Groom's Room" }, l3o: { k: "sbvet", n: "The Vet's Room" } }] });
evbTheme("museum", { corner: "plant", seed: 65, panel: 0xE8E4DC,
pal: { fab: "navy", fab2: "crimson", wood: "walnut", metal: "brass", stone: "marble", art: 1, rug: 1, rugv: 0 },
remap: { "D6D0C6|plaster": [0xEEEAE2, "plaster"], "D8D0C0|coffer": [0xE8E0D0, "coffer"] },
hello: "🦖 <b>Inside the museum.</b> The dinosaur in the great hall, the whale overhead, mummies, knights, meteorites and paintings. Look for the ✨ cards; the stair to the upper galleries is in the entrance hall." });
evbHouse("museum", { g: EVB_GRID.wide, h: 5.6, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The ground floor galleries", "The upper galleries"], wall: 0xEEEAE2, trim: 0x2A3A5A,
plan: [
{ hall: { k: "muentry", n: "The Entrance Hall" }, spine: { k: "muhall", n: "The Great Hall" }, gallery: { k: "mubalcony", n: "The Long Gallery" },
back: { merge: EVB_BACK, k: "mudinos", n: "The Dinosaur Hall" },
r1i: { k: "muegypt", n: "Ancient Egypt" }, r1o: { k: "mugreece", n: "Greece and Rome" },
r2i: { k: "muknights", n: "The Knights" }, r2o: { k: "murocks", n: "Rocks and Gems" },
r3i: { k: "muspace", n: "Rocks from Space" }, r3o: { k: "muclocks", n: "The Clock Room" },
l1i: { k: "mufossils", n: "The Fossil Gallery" }, l1o: { k: "mumammals", n: "The Ice Age" },
l2i: { k: "mudig", n: "The Children's Dig" }, l2o: { k: "mushop", n: "The Museum Shop" },
l3i: { k: "mustore", n: "The Store Room" }, l3o: { k: "mucafe", n: "The Café" } },
{ hall: { k: "muupper", n: "The Upper Landing" }, spine: { k: "mupaint", n: "The Picture Gallery" }, gallery: { k: "mubirds", n: "The Bird Gallery" },
back: { merge: EVB_BACK, k: "muocean", n: "The Ocean Gallery" },
r1: { merge: ["r1i", "r1o"], k: "muinvent", n: "The Inventions" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "muworld", n: "The World Gallery" },
l1: { merge: ["l1i", "l1o"], k: "murestore", n: "The Restorers' Studio" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "mumaps", n: "The Map Room" } }
] });
evbTheme("pottery", { corner: "evb_pots", seed: 67, panel: 0xD8C0A0,
pal: { fab: "terracotta", fab2: "teal", wood: "pine", metal: "iron", stone: "sand", art: 5, rug: 3, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE8D8C0, "plaster"], "D8D0C0|coffer": [0x8A5A3A, "coffer"] },
hello: "🏺 <b>Inside the pottery,</b> round its great brick bottle kiln: clay in, pots out. Wedge the clay, throw a pot on the wheel, glaze it, fire it. Look for the ✨ cards. The way out is the yard gate." });
evbHouse("pottery", { g: EVB_GRID.mid, h: 4.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The pottery"], wall: 0xE8D8C0, trim: 0x8A5A3A,
plan: [{ hall: { k: "poyard", n: "The Yard Gate" }, spine: { k: "powalk", n: "The Pot Walk" }, gallery: { k: "podry", n: "The Drying Racks" },
back: { merge: EVB_BACK, k: "pokiln", n: "The Bottle Kiln" },
r1i: { k: "poclay", n: "The Clay Store" }, r1o: { k: "powedge", n: "The Wedging Bench" },
r2i: { k: "powheels", n: "The Throwing Room" }, r2o: { k: "pohand", n: "The Hand-Building Room" },
r3i: { k: "poglaze", n: "The Glaze Room" }, r3o: { k: "popaint", n: "The Painting Room" },
l1i: { k: "posaggar", n: "The Saggar Makers" }, l1o: { k: "pocoal", n: "The Coal Store" },
l2i: { k: "poshop", n: "The Pottery Shop" }, l2o: { k: "powonders", n: "The Room of Wonders" },
l3i: { k: "potiles", n: "The Tile Room" }, l3o: { k: "pomould", n: "The Mould Room" } }] });
evbTheme("cinema", { corner: "evb_popcorn", seed: 69, panel: 0x8A1420,
pal: { fab: "crimson", fab2: "mustard", wood: "mahogany", metal: "gold", stone: "marble", art: 8, rug: 2, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE8D8C0, "plaster"], "D8D0C0|coffer": [0x8A1420, "coffer"] },
hello: "🎬 <b>Inside the picture house.</b> Gilt, red velvet and the silver screen: buy a ticket, get some popcorn and find your seat; the film is about to start. Look for the ✨ cards. The way out is through the foyer." });
evbHouse("cinema", { g: EVB_GRID.wide, h: 6.0, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The picture house"], wall: 0xE8D8C0, trim: 0xD8B040,
plan: [{ hall: { k: "cifoyer", n: "The Foyer" }, spine: { k: "cicorridor", n: "The Grand Corridor" }, gallery: { k: "cicircle", n: "The Circle" },
back: { merge: EVB_BACK, k: "ciaud", n: "The Auditorium" },
r1i: { k: "cibox", n: "The Box Office" }, r1o: { k: "cisweets", n: "The Sweet Counter" },
r2i: { k: "ciproj", n: "The Projection Box" }, r2o: { k: "cisilent", n: "The Silent Film Room" },
r3i: { k: "cicafe", n: "The Café" }, r3o: { k: "ciposters", n: "The Poster Store" },
l1i: { k: "ciorgan", n: "The Organ Room" }, l1o: { k: "cimanager", n: "The Manager's Office" },
l2i: { k: "cismall", n: "Screen Two" }, l2o: { k: "cicartoon", n: "The Cartoon Room" },
l3i: { k: "ciusher", n: "The Ushers' Room" }, l3o: { k: "cisound", n: "The Sound Room" } }] });
evbTheme("mine", { corner: "mineprop", seed: 71, panel: 0x5A4A3A,
pal: { fab: "charcoal", fab2: "mustard", wood: "pine", metal: "iron", stone: "slate", art: 0, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0x6A5A4A, "stone"], "D8D0C0|coffer": [0x4A3A2A, "coffer"] },
hello: "⛏️ <b>Down the mineshaft.</b> The cage drops into the dark: galleries propped with timber, rails for the tubs, the coal face, the pit ponies' stables, the lamp room. Look for the ✨ cards. The way out is back up in the cage." });
evbHouse("mine", { g: EVB_GRID.mid, h: 3.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["Down the mine"], wall: 0x6A5A4A, trim: 0x5A3A22,
plan: [{ hall: { k: "micage", n: "The Cage at the Shaft Bottom" }, spine: { k: "mimain", n: "The Main Roadway" }, gallery: { k: "mirails", n: "The Tub Rails" },
back: { merge: EVB_BACK, k: "miface", n: "The Coal Face" },
r1i: { k: "milamps", n: "The Lamp Room" }, r1o: { k: "mibird", n: "The Canary's Room" },
r2i: { k: "miponies", n: "The Pony Stables" }, r2o: { k: "mitools", n: "The Tool Store" },
r3i: { k: "migems", n: "The Crystal Seam" }, r3o: { k: "miwater", n: "The Pump Room" },
l1i: { k: "mirescue", n: "The Rescue Room" }, l1o: { k: "mifirst", n: "The First Aid Post" },
l2i: { k: "mifans", n: "The Air Doors" }, l2o: { k: "mibait", n: "The Snap Room" },
l3i: { k: "migold", n: "The Gold Pocket" }, l3o: { k: "miold", n: "The Old Workings" } }] });
evbTheme("silo", { corner: "trsacks", seed: 73, panel: 0xC8B890,
pal: { fab: "mustard", fab2: "emerald", wood: "pine", metal: "iron", stone: "granite", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8D0B8, "plaster"], "D8D0C0|coffer": [0x8A7A5A, "coffer"] },
hello: "🌾 <b>Inside the grain silo.</b> The harvest comes in here: the bins, the elevator that lifts the grain, the scales, the drying floor, the mill. Look for the ✨ cards. The way out is the loading door." });
evbHouse("silo", { g: EVB_GRID.mid, h: 5.0, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The grain silo"], wall: 0xD8D0B8, trim: 0x8A3A2A,
plan: [{ hall: { k: "gsdoor", n: "The Loading Door" }, spine: { k: "gswalk", n: "The Bin Walk" }, gallery: { k: "gscatwalk", n: "The Catwalk" },
back: { merge: EVB_BACK, k: "gsbins", n: "The Great Bins" },
r1i: { k: "gselevator", n: "The Elevator Leg" }, r1o: { k: "gsscales", n: "The Weighbridge" },
r2i: { k: "gsdry", n: "The Drying Floor" }, r2o: { k: "gsseed", n: "The Seed Store" },
r3i: { k: "gsmill", n: "The Mill Room" }, r3o: { k: "gsbakery", n: "The Farm Kitchen" },
l1i: { k: "gstractor", n: "The Tractor Shed" }, l1o: { k: "gsbarn", n: "The Barn Cats' Corner" },
l2i: { k: "gsoffice", n: "The Farm Office" }, l2o: { k: "gstest", n: "The Grain Tester" },
l3i: { k: "gsmice", n: "The Owl Loft" }, l3o: { k: "gsfair", n: "The Harvest Fair Room" } }] });
evbFins({
fhdoors: ["tile", 0x8A8A88, 0xE8E0D0, "tile", 0xB8201A], fhwalk: ["tile", 0x8A8A88, 0xE8E0D0, "tile", 0xB8201A], fhgear: ["tile", 0x8A8A88, 0xD8D0C0, "tile", 0xB8201A],
fhbay: ["tile", 0x7A7A78, 0xE8E0D0, "tile", 0xB8201A], fhpole: ["tile", 0x8A8A88, 0xB8201A, "plaster", 0xD8B040], fhwatch: ["wood", 0x8A6A4A, 0xE8E0D0, "plaster", 0xB8201A],
fhbunks: ["wood", 0x8A6A4A, 0xD8E0E8, "plaster", 0x2A3A6A], fhkitchen: ["checker", 0xE8E8E8, 0xF0E8D8, "tile", 0xB8201A], fhhose: ["stone", 0x8A8478, 0xC8C0B0, "stone", 0x6A5A4A],
fhyard: ["stone", 0x9A9488, 0xD8D0C0, "stone", 0xB8201A], fhold: ["wood", 0x7A5A3A, 0xE8E0D0, "plaster", 0xD8B040], fhdog: ["wood", 0x8A6A4A, 0xF0E0C0, "plaster", 0xB8201A],
fhschool: ["carpet", 0x2A6AA8, 0xF0E8D8, "plaster", 0xB8201A], fhrescue: ["tile", 0x8A8A88, 0xE8E0D0, "tile", 0xE8B020], fhgym: ["carpet", 0x3A3A3A, 0xE0E0E0, "plaster", 0xB8201A],
fhchief: ["wood", 0x6A4A2A, 0xE8E0D0, "damask", 0xB8201A],
sbdoor: ["stone", 0x8A7A5A, 0xD8C8A8, "wood", 0x6A4A2A], sbaisle: ["stone", 0x8A7A5A, 0xC8B898, "wood", 0x6A4A2A], sbloft: ["wood", 0xA88A5A, 0xC8A878, "wood", 0x6A4A2A],
sbschool: ["wood", 0xB89A6A, 0xD8C8A8, "wood", 0x6A4A2A], sbstalls: ["stone", 0x8A7A5A, 0xC8B898, "wood", 0x5A3A22], sbtack: ["wood", 0x7A5A3A, 0xD8C8A8, "wood", 0x8A3A2A],
sbforge: ["stone", 0x6A6058, 0x8A7A6A, "stone", 0x3A2A20], sbgroom: ["stone", 0x8A7A5A, 0xD8C8A8, "wood", 0x6A4A2A], sbfoal: ["wood", 0xA88A5A, 0xE0D0B0, "wood", 0x6A4A2A],
sbfeed: ["wood", 0xA88A5A, 0xD8C8A8, "wood", 0x6A4A2A], sbcarriage: ["stone", 0x8A7A5A, 0xD8C8A8, "wood", 0x2A4A2A], sbwash: ["tile", 0x8A9A9A, 0xD8E0E0, "tile", 0x6A4A2A],
sbpony: ["stone", 0x8A7A5A, 0xE0D0B0, "wood", 0xC0302A], sbrosettes: ["wood", 0x7A5A3A, 0x2A5A3A, "plaster", 0xD8B040], sbgroomroom: ["wood", 0x8A6A4A, 0xE0D0B0, "plaster", 0x6A4A2A],
sbvet: ["tile", 0xC8D0D0, 0xE8F0F0, "plaster", 0x3A7A5A],
muentry: ["marble", 0xE0DCD4, 0xEEEAE2, "marble", 0x2A3A5A, "coffer"], muhall: ["marble", 0xE0DCD4, 0xEEEAE2, "plaster", 0x2A3A5A, "coffer"], mubalcony: ["wood", 0x8A6A4A, 0xEEEAE2, "plaster", 0x2A3A5A],
mudinos: ["stone", 0xB8B0A0, 0xD8E0E8, "plaster", 0x2A3A5A, "coffer"], muegypt: ["stone", 0xC8B088, 0xE0C8A0, "plaster", 0xD8B040], mugreece: ["marble", 0xE0DCD4, 0xC0302A, "plaster", 0xE8E0D0],
muknights: ["stone", 0x8A8478, 0x5A2A2A, "damask", 0xD8B040], murocks: ["wood", 0x6A4A2A, 0x1E2A4A, "plaster", 0xD8B040], muspace: ["carpet", 0x14183A, 0x0E1230, "plaster", 0xE8D860],
muclocks: ["herring", 0x8A6A4A, 0x2A4A3A, "damask", 0xD8B040], mufossils: ["stone", 0xB8B0A0, 0xE0D8C8, "plaster", 0x6A5A4A], mumammals: ["stone", 0xB8B0A0, 0xD8E8F0, "plaster", 0x4A5A6A],
mudig: ["carpet", 0xE8B030, 0xF0E8D8, "plaster", 0x3A8A3A], mushop: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0x2A3A5A], mustore: ["wood", 0x8A7A5A, 0xD8D0C0, "plaster", 0x6A5A4A],
mucafe: ["checker", 0xE8E8E8, 0xF0E8D8, "tile", 0x2A3A5A],
muupper: ["herring", 0x8A6A4A, 0xEEEAE2, "plaster", 0x2A3A5A], mupaint: ["herring", 0x8A6A4A, 0x7A1E24, "damask", 0xD8B040, "coffer"], mubirds: ["wood", 0x8A6A4A, 0xD8E8D0, "plaster", 0x3A7A3A],
muocean: ["carpet", 0x1E4A6A, 0x2A6A8A, "plaster", 0xE8F0F4, "coffer"], muinvent: ["wood", 0x8A6A4A, 0xE0D8C8, "plaster", 0xB87838], muworld: ["wood", 0x8A6A4A, 0xE8D8B8, "plaster", 0xC0302A],
murestore: ["wood", 0x9A7A58, 0xF0F0EC, "plaster", 0x2A3A5A], mumaps: ["herring", 0x8A6A4A, 0xE8DCC0, "plaster", 0x2A3A5A],
poyard: ["stone", 0x9A8A70, 0xE8D8C0, "stone", 0x8A5A3A], powalk: ["stone", 0xA89478, 0xE8D8C0, "plaster", 0x8A5A3A], podry: ["wood", 0xA88A6A, 0xE0D0B8, "plaster", 0x8A5A3A],
pokiln: ["stone", 0x8A6A50, 0xB8805A, "stone", 0x3A2A20], poclay: ["stone", 0x8A7A6A, 0xC8B8A0, "stone", 0x8A5A3A], powedge: ["wood", 0x9A7A58, 0xE0D0B8, "plaster", 0x8A5A3A],
powheels: ["wood", 0x9A7A58, 0xE8D8C0, "plaster", 0x2A7A8A], pohand: ["wood", 0x9A7A58, 0xE8D8C0, "plaster", 0xC0302A], poglaze: ["tile", 0x2A7A8A, 0xF0E8D8, "tile", 0x2A7A8A],
popaint: ["wood", 0x9A7A58, 0xF0F0E8, "plaster", 0x2A50B8], posaggar: ["stone", 0x8A7A6A, 0xD8C8B0, "stone", 0x8A5A3A], pocoal: ["stone", 0x3A3632, 0x5A524A, "stone", 0x2A2420],
poshop: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0x8A5A3A], powonders: ["wood", 0x7A5A3A, 0x2A4A6A, "plaster", 0xD8B040], potiles: ["tile", 0xE8E0D0, 0x2A6AA8, "tile", 0xF0E8D8],
pomould: ["stone", 0x9A8A70, 0xE8E4DC, "plaster", 0x8A5A3A],
cifoyer: ["carpet", 0x8A1420, 0xE8D8C0, "damask", 0xD8B040, "coffer"], cicorridor: ["carpet", 0x8A1420, 0xE8D8C0, "plaster", 0xD8B040], cicircle: ["carpet", 0x8A1420, 0x6A1018, "damask", 0xD8B040],
ciaud: ["carpet", 0x6A1018, 0x4A0A10, "damask", 0xD8B040, "coffer"], cibox: ["wood", 0x6A4A2A, 0xE8D8C0, "plaster", 0xD8B040], cisweets: ["checker", 0xE8E8E8, 0xF0D8E0, "tile", 0xC0201A],
ciproj: ["wood", 0x5A4A3A, 0x3A3A3A, "plaster", 0x1A1A1A], cisilent: ["carpet", 0x2A2A2A, 0xD8D0C0, "plaster", 0x1A1A1A], cicafe: ["checker", 0xE8E8E8, 0xF0E8D8, "tile", 0x8A1420],
ciposters: ["wood", 0x8A6A4A, 0xE8D8C0, "plaster", 0x8A1420], ciorgan: ["carpet", 0x8A1420, 0xE8D8C0, "damask", 0xD8B040], cimanager: ["wood", 0x5A3A22, 0x2A4A3A, "damask", 0xD8B040],
cismall: ["carpet", 0x1E2A5A, 0x14183A, "damask", 0xD8B040], cicartoon: ["carpet", 0xE8B030, 0xF0E8D8, "plaster", 0xE8308A], ciusher: ["wood", 0x8A6A4A, 0xE8D8C0, "plaster", 0x8A1420],
cisound: ["carpet", 0x2A2A2A, 0x3A3A40, "plaster", 0xD8B040],
micage: ["stone", 0x4A4238, 0x6A5A4A, "stone", 0x5A3A22], mimain: ["stone", 0x4A4238, 0x5A4A3A, "stone", 0x5A3A22], mirails: ["stone", 0x4A4238, 0x5A4A3A, "stone", 0x5A3A22],
miface: ["stone", 0x2A2620, 0x1A1814, "stone", 0x5A3A22], milamps: ["stone", 0x5A5248, 0xC8C0B0, "plaster", 0x5A3A22], mibird: ["stone", 0x5A5248, 0x7A6A5A, "stone", 0xE8C030],
miponies: ["stone", 0x5A4A3A, 0x7A6A5A, "wood", 0x5A3A22], mitools: ["stone", 0x4A4238, 0x6A5A4A, "stone", 0x5A3A22], migems: ["stone", 0x3A3440, 0x4A4060, "stone", 0x8A6AC8],
miwater: ["stone", 0x3A4448, 0x5A6A6A, "stone", 0x2A5A6A], mirescue: ["tile", 0x8A8A88, 0xD8D0C0, "plaster", 0xE8B020], mifirst: ["tile", 0xD8D8D0, 0xF0F0E8, "plaster", 0xC0302A],
mifans: ["stone", 0x4A4238, 0x6A5A4A, "stone", 0x5A3A22], mibait: ["wood", 0x6A5A4A, 0xA8988A, "plaster", 0x5A3A22], migold: ["stone", 0x3A3428, 0x5A4A30, "stone", 0xD8B040],
miold: ["stone", 0x3A342C, 0x4A4238, "stone", 0x3A2A1A],
gsdoor: ["stone", 0x9A9488, 0xD8D0B8, "plaster", 0x8A3A2A], gswalk: ["stone", 0x9A9488, 0xC8C0A8, "stone", 0x8A3A2A], gscatwalk: ["tile", 0x6A6A6A, 0xC8C0A8, "stone", 0x8A3A2A],
gsbins: ["stone", 0x8A8478, 0xB8B0A0, "stone", 0x8A3A2A], gselevator: ["wood", 0x8A7A5A, 0xD8D0B8, "wood", 0x8A3A2A], gsscales: ["tile", 0x8A8A88, 0xD8D0B8, "plaster", 0x8A3A2A],
gsdry: ["wood", 0xA89470, 0xE0D8C0, "plaster", 0x8A3A2A], gsseed: ["wood", 0x9A8A6A, 0xD8D0B8, "plaster", 0x3A7A3A], gsmill: ["stone", 0x9A9080, 0xE0D8C8, "stone", 0x6A5A4A],
gsbakery: ["checker", 0xE8E0D0, 0xF4ECD8, "plaster", 0x8A3A2A], gstractor: ["stone", 0x7A7468, 0xC8C0A8, "stone", 0xB8201A], gsbarn: ["wood", 0xA89470, 0xC8A878, "wood", 0x8A3A2A],
gsoffice: ["wood", 0x8A6A4A, 0xE8E0D0, "plaster", 0x2A4A2A], gstest: ["tile", 0xD8D8D0, 0xF0F0E8, "plaster", 0x2A6AA8], gsmice: ["wood", 0xA89470, 0xC8A878, "wood", 0x6A4A2A],
gsfair: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0xE8B030]
});
EVB_LD.firehouse = { theme: "firehouse", name: "The Firehouse", doors: "the engine doors" };
EVB_LD.stable = { theme: "stable", name: "The Stable", doors: "the yard door" };
EVB_LD.museum = { theme: "museum", name: "The Museum", doors: "the museum doors" };
EVB_LD.kiln = { theme: "pottery", name: "The Pottery", doors: "the yard gate" };
EVB_LD.picturehouse = { theme: "cinema", name: "The Picture House", doors: "the foyer doors" };
EVB_LD.mineshaft = { theme: "mine", name: "The Mineshaft", doors: "the cage" };
EVB_LD.silo = { theme: "silo", name: "The Grain Silo", doors: "the loading door" };
"use strict";
function evbFhBay() { return __ZC(367, 108, this, arguments, new.target); }
var evbFhDoors = evbInfo("The firehouse", "In 1736 Benjamin Franklin started one of America's first volunteer fire companies, in Philadelphia. In London, after the Great Fire of 1666 burned for four days, insurance companies ran their own fire brigades and put a metal 'fire mark' on the houses they insured.");
function evbFhPole() { evbTune([784, 659, 523, 392], 120, 0.6); evbSay("🧑‍🚒 Wheee! You slide down the brass pole. Poles are said to have been first used in Chicago in 1878. Firehouse stairs often spiral for an old reason: the horses that pulled the engines could climb straight stairs, but not spiral ones."); }
var evbFhWatch = evbInfo("The watch room", "Someone is always on watch, day and night, to take the calls. Today a computer shows the address on a map, and the lights come on and the doors open by themselves.");
var evbFhGear = evbFact("The turnout gear", ["The coat and trousers are made to resist heat and flame, with bright bands that shine in the dark.", "The boots wait inside the trousers, so a firefighter can step in and pull them up in one go.", "The breathing set holds air for about half an hour of hard work."]);
var evbFhBunks = evbInfo("The bunk room", "Firefighters work long shifts and sleep at the station, ready to go. When the alarm sounds at night, they are at the pole in seconds.");
function evbFhKitchen() { return __ZC(367, 109, this, arguments, new.target); }
var evbFhHose = evbInfo("The hose tower", "The tall tower is for hanging wet hoses to dry, so they do not rot. Firefighters also climb it to practise with ladders and ropes.");
var evbFhYard = evbInfo("The training yard", "Firefighters practise again and again: running out hoses, raising ladders, carrying people down, crawling through smoke where you cannot see your own hand.");
var evbFhOld = evbInfo("The old engines", "The first fire engines were pumped by hand, crews of men on each side. Steam pumpers, pulled by galloping horses, came in the 1850s. Motor engines took over in the early 1900s.");
function evbFhDog() { evbTune([523, 587, 523], 200, 0.5); evbSay("🐕 The Dalmatian thumps its tail. Dalmatians ran ahead of the horse-drawn engines to clear the road, and kept the horses calm; many firehouses keep one still, for luck."); }
function evbFhSchool() { return __ZC(367, 110, this, arguments, new.target); }
var evbFhRescue = evbFact("The rescue kit", ["Hydraulic cutters can open a crashed car like a tin, to free the people inside.", "Thermal cameras see the heat of a person through thick smoke.", "Firefighters rescue animals too: cats up trees, horses in ditches, ducklings in drains."]);
var evbFhGym = evbInfo("The gym", "Firefighting is hard work: the gear alone weighs about twenty kilos. Firefighters train to carry a person, drag a hose and climb stairs in full kit.");
var evbFhChief = evbInfo("The chief's office", "The chief's white helmet stands out at a fire, so everyone can find who is in charge. The trumpet badges on the old chiefs' uniforms come from the speaking trumpets they shouted orders through.");
var evbSbDoor = evbInfo("The stable", "Horses have lived alongside people for about 5,500 years, since they were tamed on the grasslands of Central Asia. They are measured in 'hands', of four inches each, from the ground to the top of the shoulder.");
function evbSbStalls() { return __ZC(367, 111, this, arguments, new.target); }
var evbSbTack = evbFact("The tack room", ["Each horse has its own saddle and bridle, fitted to it.", "The bit sits in a gap in the horse's teeth, where it has no teeth at all.", "Leather tack is cleaned with saddle soap and oiled to keep it supple."]);
var evbSbLoft = evbInfo("The hay loft", "A horse eats about two per cent of its own weight a day, mostly hay and grass: ten kilos or more for a big horse. Hay is stored up in the loft and dropped down through the hatches.");
function evbSbForge() { evbTune([1047, 1047, 880], 150, 0.6); evbSay("🔨 Clang, clang. The farrier shapes a hot iron shoe on the anvil and nails it on. It doesn't hurt: the nails go into the hard outer wall of the hoof, like the end of your fingernail."); }
function evbSbGroom() { evbTune([392, 440, 392], 250, 0.6); evbSay("🪮 You use the curry comb in circles to loosen the dust, then the stiff brush, then the soft one. The horse leans into it and half closes its eyes."); }
var evbSbFoal = evbInfo("The foaling box", "A foal stands up within an hour of being born, and can run within a day: on the open plains, it had to keep up with the herd.");
var evbSbFeed = evbInfo("The feed room", "Horses cannot be sick, so they must never eat anything bad for them. Oats, bran, sugar beet and a lick of salt; and fresh water, lots of it, about forty litres a day.");
var evbSbSchool = evbInfo("The riding school", "Walk, trot, canter, gallop: the horse's four gaits. In a gallop all four hooves leave the ground at once, which nobody could prove until Eadweard Muybridge photographed a galloping horse in 1878.");
var evbSbCarriage = evbInfo("The carriage house", "Before cars, carriages were how people travelled: the light gig, the closed coach, the mail coach that ran through the night, changing horses every ten miles or so at coaching inns.");
var evbSbWash = evbInfo("The wash bay", "Horses can sleep standing up: their legs lock so they do not fall over. But they must lie down for their deepest sleep, for a little while each day.");
function evbSbPony() { evbTune([523, 659, 523], 200, 0.5); evbSay("🐎 A Shetland pony nudges your pocket. Shetlands are tiny but very strong for their size, and once worked in the coal mines."); }
var evbSbRosettes = evbInfo("The rosette room", "Rosettes from shows and gymkhanas cover the wall: red for first in Britain, blue for first in America.");
var evbSbGroomRoom = evbInfo("The groom's room", "The groom lived over the stable, close to the horses, to feed them early and check them late. A good groom could tell a horse was poorly just from the look in its eye.");
var evbSbVet = evbInfo("The vet's room", "You can tell a horse's age from its teeth: they grow and wear down through its life. That is where the saying 'long in the tooth' comes from.");
var evbMuEntry = evbInfo("The museum", "The word 'museum' comes from the Greek for a place of the Muses, the goddesses of the arts. The British Museum opened in 1759, free to 'all studious and curious persons'.");
function evbMuDinos() { return __ZC(367, 112, this, arguments, new.target); }
var evbMuHall = evbInfo("The whale overhead", "Above you hangs the skeleton of a blue whale, the biggest animal that has ever lived, bigger than any dinosaur: up to about 30 metres long. Its heart is the size of a small car.");
function evbMuEgypt() { return __ZC(367, 113, this, arguments, new.target); }
var evbMuGreece = evbInfo("Greece and Rome", "In a corner sits a lump of corroded bronze gears: a copy of the Antikythera mechanism, found in a shipwreck in 1901. Made over 2,000 years ago, it worked out the positions of the sun and moon and the dates of eclipses, a kind of ancient computer.");
var evbMuKnights = evbFact("The knights", ["A full suit of plate armour weighed about 20 to 25 kilos, spread all over the body: a knight could run, mount a horse and even do a cartwheel in it.", "Before plate, knights wore mail, rings of iron linked together.", "A knight's coat of arms on his shield told people who he was when his face was hidden."]);
var evbMuRocks = evbInfo("Rocks and gems", "A diamond is carbon, the same stuff as pencil lead, squeezed hard and hot deep in the earth. A geode looks like a dull stone until it is cracked open, and inside is a cave of crystals.");
var evbMuSpace = evbInfo("Rocks from space", "The meteorite here is iron and nickel from the heart of a broken little planet. The biggest ever found, the Hoba meteorite in Namibia, weighs about 60 tonnes and is still lying where it fell.");
function evbMuClocks() { evbTune([988, 784, 880, 659], 400, 1.6); evbSay("🕰️ Tick, tock. John Harrison's sea clock, the H4, finished in 1759, kept time so well at sea that sailors could work out how far east or west they were: the longitude."); }
function evbMuFossils() { return __ZC(367, 114, this, arguments, new.target); }
var evbMuMammals = evbInfo("The Ice Age", "Woolly mammoths roamed the cold grasslands during the Ice Age, alongside sabre-toothed cats and giant deer. A small group lived on Wrangel Island in the Arctic until about 4,000 years ago, when the pyramids of Egypt were already standing.");
function evbMuDig() { evbTune([523, 587, 659, 784], 200, 0.6); var f = evbPick(["a dinosaur tooth", "an ammonite", "a trilobite", "a fern in the stone", "a shark's tooth"]); evbSay("⛏️ You brush away the sand, carefully, and find " + f + "!"); }
var evbMuShop = evbInfo("The museum shop", "Postcards, pencils, a little plastic T. rex. The money helps the museum care for its collection, most of which is never on show: big museums keep millions of objects in their stores.");
var evbMuStore = evbInfo("The store room", "Drawers and drawers: beetles, birds' eggs, rocks, coins. The Natural History Museum in London looks after about 80 million specimens.");
var evbMuCafe = evbInfo("The café", "A cup of tea and a slice of cake among the statues. The Victoria and Albert Museum in London opened the world's first museum café, in the 1860s.");
var evbMuUpper = evbInfo("The upper galleries", "Museums began as 'cabinets of curiosities', rooms crammed with anything rare or strange: a narwhal's tusk sold as a unicorn's horn, a stuffed crocodile on the ceiling, shells, coins and fossils.");
var evbMuPaint = evbInfo("The Picture Gallery", "Paintings are hung low and lit softly, because light fades paint over the years. Old masters were painted in oil, colours ground from earths, minerals and even crushed insects, mixed with linseed oil.");
var evbMuBirds = evbInfo("The Bird Gallery", "Behind the glass, a dodo: the flightless bird of Mauritius, gone by about 1681, less than a hundred years after sailors first found it. The museum's specimens remind us what can be lost.");
var evbMuOcean = evbInfo("The Ocean Gallery", "More people have stood on the Moon than have been to the deepest part of the ocean, the Challenger Deep, nearly 11 kilometres down. The first to reach it were Jacques Piccard and Don Walsh, in 1960.");
var evbMuInvent = evbFact("The inventions", ["The Wright brothers flew the first powered aeroplane in 1903: the first flight lasted 12 seconds.", "The first telephone call was made by Alexander Graham Bell in 1876.", "Steam engines drove the first railways: Stephenson's Rocket won a race in 1829."]);
var evbMuWorld = evbInfo("The World Gallery", "Masks, drums, boats, cloth and carvings from every part of the world, each made by people for a reason: to dance in, to pray with, to fish from, to wear on a wedding day.");
var evbMuRestore = evbInfo("The restorers' studio", "Restorers clean and mend old things so carefully that every change can be undone later. They use soft brushes, cotton swabs and magnifying glasses, and sometimes X-rays, which can show an older picture painted underneath.");
var evbMuMaps = evbInfo("The map room", "In 1569 Gerardus Mercator drew a map of the world that sailors could steer by in straight lines. It makes lands near the poles look far too big: Greenland looks as big as Africa, which is really about fourteen times larger.");
var evbPoYard = evbInfo("The pottery", "Stoke-on-Trent in England was once so full of potteries it was called 'the Potteries': about 2,000 bottle kilns smoked over its streets. A few still stand today. Josiah Wedgwood opened his first pottery there in 1759.");
function evbPoKiln() { return __ZC(367, 115, this, arguments, new.target); }
function evbPoWedge() { evbTune([196, 196], 300, 0.6); evbSay("💪 You knead the clay like dough: wedging. It squeezes out the air bubbles, which would make the pot burst in the kiln."); }
function evbPoWheel() { return __ZC(367, 116, this, arguments, new.target); }
var evbPoClay = evbInfo("The clay store", "Clay is rock that has been ground down by water and time into tiny flat grains. Wet, the grains slide over each other so it can be shaped; fired, they melt together into something hard as stone.");
var evbPoHand = evbFact("Hand-building", ["Coil pots are built up from long rolls of clay, round and round.", "Pinch pots are made just by pinching a ball of clay with your thumb and fingers.", "The oldest pots yet found, from a cave in China, are about 20,000 years old."]);
var evbPoGlaze = evbInfo("The glaze room", "A glaze is glass: powdered minerals painted onto the pot that melt in the kiln into a shiny coat. Copper can turn a glaze green, or red; cobalt makes the deep blue of blue-and-white china.");
var evbPoPaint = evbInfo("The painting room", "Paintresses sat in rows painting patterns by hand onto plates and cups, the same flowers again and again, thousands a week. Clarice Cliff began as one and became a famous designer in the 1920s and 1930s.");
var evbPoSaggar = evbInfo("The saggar makers", "Saggars were the fireclay boxes that held the pots in the kiln, safe from smoke and ash. The saggar maker's bottom knocker was a real job: the boy who beat out the clay for the bottoms.");
var evbPoCoal = evbInfo("The coal store", "One firing of a bottle kiln could burn about fifteen tonnes of coal, and the black smoke from thousands of them hung over the Potteries. Today kilns are mostly electric or gas.");
var evbPoShop = evbInfo("The pottery shop", "Plates, mugs, teapots and jugs. 'China' is called that because porcelain, fine white pottery, was first made in China, and for centuries Europe could not work out how.");
var evbPoWonders = evbInfo("The room of wonders", "Wedgwood's jasperware, pale blue with white figures standing out, took him thousands of experiments in the 1770s to perfect.");
var evbPoTiles = evbInfo("The tile room", "Blue-and-white tiles from Delft in Holland lined fireplaces and kitchens all over Europe, painted with windmills, ships, children's games and Bible stories.");
var evbPoMould = evbInfo("The mould room", "For making many cups the same, liquid clay called slip is poured into plaster moulds. The plaster drinks up the water and leaves a skin of clay inside, the shape of the cup.");
var evbCiFoyer = evbInfo("The picture house", "On the 28th of December 1895, in a café in Paris, the Lumière brothers showed films to a paying audience for the first time. By the 1930s, big towns had picture palaces with thousands of seats, gilt ceilings and organs that rose out of the floor.");
function evbCiAud() { return __ZC(367, 117, this, arguments, new.target); }
function evbCiBox() { evbTune([523, 659], 200, 0.5); evbSay("🎟️ One ticket, please. The old cinemas sold seats at different prices: cheap at the front by the screen, dearer in the circle above."); }
function evbCiSweets() { evbTune([659, 784, 880], 150, 0.5); evbSay("🍿 Popcorn! It became the cinema snack in the 1930s, when it was cheap and people had little money: it smelt so good that it brought people in."); }
var evbCiProj = evbInfo("The projection box", "Old film was made of nitrate, which burned very easily, so the projection box had thick walls and steel shutters. The projectionist changed reels every twenty minutes or so, watching for little dots in the corner of the screen as a signal.");
var evbCiSilent = evbInfo("The silent film room", "The first films had no sound. A pianist or an organist played along, watching the screen, and words came up on cards between the scenes. The first big 'talkie' was The Jazz Singer, in 1927.");
var evbCiCafe = evbInfo("The café", "The grand picture palaces had cafés and restaurants, so a night at the pictures could be a whole evening out: a meal, two films, a newsreel and a cartoon.");
var evbCiPosters = evbFact("The poster store", ["Before television, the newsreel at the cinema was how many people saw the news.", "Posters were printed in huge sizes and pasted up on hoardings across town.", "Film was once cut and joined by hand, with scissors and glue."]);
function evbCiOrgan() { evbTune([131, 165, 196, 262, 330, 392, 523], 250, 2.4); evbSay("🎹 The organ rises out of the floor in a glow of coloured lights, and the organist plays the audience in. Cinema organs could make sounds like birds, bells, car horns and thunder."); }
var evbCiManager = evbInfo("The manager's office", "The manager wore evening dress and greeted people in the foyer. On the wall: the week's programme, the takings, and a telephone to the projection box.");
var evbCiSmall = evbInfo("Screen two", "Later cinemas split their big halls into several smaller screens, so they could show more films at once.");
function evbCiCartoon() { evbTune([523, 659, 784, 1047], 120, 0.6); evbSay("🦕 Gertie the Dinosaur (1914): Winsor McCay drew every frame by hand, about 10,000 drawings, and performed on stage beside her, as if she could hear him."); }
var evbCiUsher = evbInfo("The ushers' room", "Ushers in smart uniforms showed people to their seats with little torches in the dark, and sold ice creams from trays in the interval.");
var evbCiSound = evbInfo("The sound room", "Sound on film is a wiggly stripe beside the pictures. A light shines through it onto a sensor, and the wiggles become the sound of voices and music.");
function evbMiCage() { evbTune([262, 247, 233, 220, 208, 196], 300, 1.6); evbSay("⬇️ The cage drops into the dark, faster than you'd like, and your ears pop. Some mine shafts went down more than a kilometre."); }
var evbMiMain = evbInfo("The main roadway", "Coal is the remains of great swampy forests that grew about 300 million years ago, buried and squeezed into black rock. Miners followed the seams underground for miles, propping the roof with timber as they went.");
function evbMiFace() { return __ZC(367, 118, this, arguments, new.target); }
var evbMiRails = evbInfo("The tub rails", "The coal was loaded into tubs on little rails and pushed or pulled to the shaft. Before the law changed in Britain in 1842, children as young as five worked in the mines, and women and girls hauled the tubs.");
var evbMiLamps = evbInfo("The lamp room", "Flames could set off the gas that seeps out of coal. In 1815 Humphry Davy invented a safety lamp with the flame behind a fine wire mesh, which kept the flame from reaching the gas outside. Each miner handed in a numbered brass tag for his lamp, so everyone could be counted out again.");
function evbMiBird() { evbTune([1047, 1175, 1319], 120, 0.6); evbSay("🐤 A canary sings in its cage. Canaries were carried into British mines until 1986: a bad gas that people cannot smell would make the little bird drowsy first, and warn the miners to get out."); }
function evbMiPonies() { evbTune([262, 330], 300, 0.6); evbSay("🐴 Pit ponies pulled the tubs underground, and lived in stables down the mine. The last pony to work in a British pit retired in 1999."); }
var evbMiTools = evbFact("The tool store", ["Picks, shovels, hammers and wedges.", "Pit props of timber creak before the roof falls: miners listened for them.", "Miners often paid for their own tools and candles out of their wages."]);
var evbMiGems = evbInfo("The crystal seam", "Here the rock opens into a pocket of quartz crystals, glittering in your lamp. Miners all over the world have broken into caves like this: in a mine at Naica in Mexico, crystals of gypsum more than ten metres long were found in 2000.");
var evbMiWater = evbInfo("The pump room", "Mines fill with water, and keeping them dry was a constant fight. The first working steam engine, built by Thomas Newcomen in 1712, was made to pump water out of mines.");
var evbMiRescue = evbInfo("The rescue room", "Mine rescue teams trained to go down into danger with breathing sets, to bring out men trapped by a fall or a flood. The whole village would wait at the pithead for news.");
var evbMiFirst = evbInfo("The first aid post", "Mining was dangerous work, and the first aid men underground were often the first help a hurt miner got. Many miners also got sick from breathing coal dust for years.");
var evbMiFans = evbInfo("The air doors", "Fresh air was driven through the mine by great fans at the surface, and steered by wooden doors. In the old days a child called a 'trapper' sat alone in the dark all day to open and shut a door when the tubs came through.");
function evbMiBait() { evbTune([392, 440], 300, 0.6); evbSay("🥪 Snap time! Miners carried their food in a tin box so the rats couldn't get it, and a bottle of cold tea. A Cornish pasty, with its thick crust to hold, was made for miners' dirty hands."); }
var evbMiGold = evbInfo("The gold pocket", "A gleam in the rock: gold! In the California Gold Rush of 1849, about 300,000 people came hoping to get rich. Most of the money was made by people selling them shovels, food and jeans.");
var evbMiOld = evbInfo("The old workings", "Abandoned tunnels, centuries old, run off into the dark. Here and there a miner has scratched his name and the year into the wall. Never go into old mines in the real world: they are full of bad air and rotten props.");
var evbGsDoor = evbInfo("The grain silo", "People first grew wheat and barley about 11,000 years ago, in the Fertile Crescent of the Middle East, and had to work out how to keep the harvest dry and safe from mice until next year. The tall grain elevator was invented in Buffalo, New York, in 1842.");
var evbGsBins = evbInfo("The great bins", "The bins can each hold thousands of tonnes of grain. Grain flows like a liquid: never go into a bin, because it can swallow you up like quicksand.");
function evbGsElevator() { evbTune([262, 294, 330, 349, 392], 200, 0.8); evbSay("⬆️ The elevator leg is a belt with little buckets that scoops the grain up to the top of the silo, where it pours down into the bins."); }
function evbGsScales() { var t = (18 + Math.floor(Math.random() * 10)); evbTune([392, 523], 300, 0.6); evbSay("⚖️ The trailer rolls onto the weighbridge: " + t + " tonnes, full, and you'll weigh it again empty. The difference is the grain."); }
var evbGsDry = evbInfo("The drying floor", "Grain has to be dry to keep: about fourteen parts water in a hundred, or it goes mouldy and spoils. Fans blow warm air through it after harvest.");
var evbGsSeed = evbInfo("The seed store", "The best grain is kept back to sow next year. In the Arctic, the Svalbard Global Seed Vault keeps more than a million kinds of seed frozen safe, in case the world ever needs them.");
function evbGsMill() { evbTune([196, 220, 196, 220], 300, 1.2); evbSay("🌾 The millstones grind the wheat into flour. A grain of wheat has three parts: the bran outside, the germ, and the white heart that makes white flour."); }
function evbGsBakery() { evbTune([523, 659], 300, 0.6); evbSay("🍞 The farm kitchen smells of new bread made from this year's flour, the first loaf of the harvest."); }
function evbGsTractor() { evbTune([131, 147, 131], 300, 0.8); evbSay("🚜 Brrrm. Tractors took over from horses on most farms in the middle of the 1900s. A modern combine harvester cuts, threshes and cleans the grain all in one."); }
function evbGsBarn() { evbTune([784, 659], 200, 0.5); evbSay("🐈 The barn cats are on duty: they keep the mice out of the grain, and have done since people first stored it."); }
var evbGsOffice = evbInfo("The farm office", "Grain is sold by the tonne, or in America by the bushel, an old measure of about 35 litres. Prices go up and down with the weather all over the world.");
var evbGsTest = evbInfo("The grain tester", "A handful of grain is tested for water, for weight and for protein: strong wheat with more protein makes bread; softer wheat makes cakes and biscuits.");
function evbGsOwl() { evbTune([330, 294], 600, 1.2); evbSay("🦉 Hoo. A barn owl lives up in the loft. One family of barn owls can eat a few thousand mice and voles in a year."); }
function evbGsFair() { return __ZC(367, 119, this, arguments, new.target); }
"use strict";
evbRooms({
fhdoors: { sides: ["evb_hoses", "evb_hydrant", "eslockers", "evb_hoses"], far: ["evb_hydrant", "evb_hydrant"], gap: 3.6, acts: [[0.35, 0, 2.0, "The firehouse", "read", evbFhDoors]] },
fhwalk: { sides: ["evb_hoses", "eslockers", "evb_hoses", "noticeboard"], far: ["evb_engine"], acts: [[0.4, 0, 1.8, "The engine", "read", evbFhOld]] },
fhgear: { far: ["evb_hoses", "evb_hoses", "evb_hoses", "evb_hoses"], sides: ["eslockers", "eslockers"], acts: [[0.5, 0, 1.8, "The turnout gear", "read", evbFhGear]] },
fhbay: { grid: ["evb_engine", 2, 1, "-u", 0.35, 0.65], sides: ["evb_hoses", "evb_pole", "evb_hoses", "eslockers", "evb_hoses"], far: ["evb_hoses", "trtoolwall", "evb_hoses"], ceil: "lantern",
acts: [[0.5, 0, 2.4, "The engines", "climb aboard", evbFhBay]] },
fhpole: { mid: [["evb_pole", 0.5, 0]], sides: ["eslockers", "evb_hoses", "eslockers"], acts: [[0.5, 0.3, 1.8, "The pole", "slide down", evbFhPole]] },
fhwatch: { far: ["desk", "monitor"], sides: ["filecabinet", "maptable", "noticeboard", "clock"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The watch desk", "read", evbFhWatch]] },
fhbunks: { grid: ["bunk", 2, 3, "-u", 0.3, 0.7], sides: ["eslockers", "eslockers"], acts: [[0.5, 0, 1.8, "The bunks", "read", evbFhBunks]] },
fhkitchen: { far: ["stove", "fridge", "sink"], sides: ["counter", "shelfgoods", "counter"], mid: [["longtable", 0.55, 0]], acts: [[0.5, 0, 1.8, "The kitchen", "cook", evbFhKitchen]] },
fhhose: { far: ["evb_hoses", "evb_hoses"], sides: ["evb_hoses", "spiralstair", "evb_hoses"], acts: [[0.5, 0, 1.8, "The hose tower", "read", evbFhHose]] },
fhyard: { sides: ["evb_hydrant", "evb_hoses", "evb_hydrant", "crates"], mid: [["evb_hydrant", 0.5, 0]], rug: false, acts: [[0.5, 0.3, 1.8, "The training yard", "read", evbFhYard]] },
fhold: { mid: [["evb_engine", 0.55, 0]], sides: ["painting", "displaycase", "painting", "evb_hydrant"], acts: [[0.35, 0, 1.8, "The old engines", "read", evbFhOld]] },
fhdog: { sides: ["pelt", "toys", "pelt", "evb_hydrant"], mid: [["pelt", 0.5, 0]], acts: [[0.5, 0, 1.8, "The firehouse dog", "say hello", evbFhDog]] },
fhschool: { grid: ["schooldesk", 2, 3], far: ["blackboard"], sides: ["noticeboard", "evb_hydrant"], acts: [[0.5, 0, 1.8, "Fire safety", "learn", evbFhSchool]] },
fhrescue: { far: ["trtoolwall", "trtoolwall"], sides: ["crates", "eslockers", "crates", "evb_hoses"], acts: [[0.5, 0, 1.8, "The rescue kit", "read", evbFhRescue]] },
fhgym: { grid: ["xp_weightbench", 1, 2, "-u", 0.5, 0.5], sides: ["xp_treadmill", "xp_bike", "xp_dumbbells", "xp_gymmat"], acts: [[0.5, 0.3, 1.8, "The gym", "read", evbFhGym]] },
fhchief: { far: ["desk", "bookshelf"], sides: ["filecabinet", "painting", "armchair", "displaycase"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The chief's helmet", "read", evbFhChief]] }
});
evbRooms({
sbdoor: { sides: ["trsaddles", "trhay", "trtrough", "trhay"], far: ["evb_horse"], gap: 3, acts: [[0.35, 0, 2.0, "The stable", "read", evbSbDoor]] },
sbaisle: { sides: ["trstall", "trstall", "trstall", "trstall"], far: ["evb_horse", "evb_horse"] },
sbloft: { grid: ["trhay", 2, 3], far: ["trhay", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The hay loft", "read", evbSbLoft]] },
sbschool: { grid: ["evb_horse", 2, 2, "+u", 0.35, 0.65], sides: ["trhay", "benchin", "trhay", "trsaddles", "benchin"], far: ["evb_horse", "trtrough", "evb_horse"], rug: false,
acts: [[0.5, 0, 2.0, "The riding school", "read", evbSbSchool]] },
sbstalls: { sides: ["trstall", "trstall", "trstall"], mid: [["evb_horse", 0.5, 0]], acts: [[0.4, 0.3, 1.8, "The horse", "say hello", evbSbStalls]] },
sbtack: { far: ["trsaddles", "trsaddles"], sides: ["trsaddles", "workbench", "trsaddles", "keyrack"], acts: [[0.5, 0, 1.8, "The tack", "read", evbSbTack]] },
sbforge: { mid: [["anvil", 0.5, 0]], far: ["forge"], sides: ["trtoolwall", "barrel", "trtoolwall"], acts: [[0.5, 0.25, 1.8, "The farrier", "watch", evbSbForge]] },
sbgroom: { mid: [["evb_horse", 0.5, 0]], sides: ["trsaddles", "shelfgoods", "trtrough"], acts: [[0.4, 0.3, 1.8, "The brushes", "groom the horse", evbSbGroom]] },
sbfoal: { mid: [["evb_horse", 0.45, 0]], sides: ["trhay", "trtrough", "trhay"], acts: [[0.6, 0.3, 1.8, "The foal", "read", evbSbFoal]] },
sbfeed: { sides: ["trsacks", "barrel", "trsacks", "trtrough"], grid: ["trsacks", 2, 2, "-u", 0.4, 0.6], acts: [[0.5, 0, 1.8, "The feed", "read", evbSbFeed]] },
sbcarriage: { mid: [["evb_cart", 0.5, 0]], sides: ["trsaddles", "lantern", "trtoolwall"], acts: [[0.5, 0.35, 1.8, "The carriage house", "read", evbSbCarriage]] },
sbwash: { mid: [["evb_horse", 0.5, 0]], sides: ["sink", "shelfgoods", "barrel"], acts: [[0.4, 0.3, 1.8, "The wash bay", "read", evbSbWash]] },
sbpony: { sides: ["trstall", "trhay", "trstall"], mid: [["evb_horse", 0.5, 0]], acts: [[0.4, 0.3, 1.8, "The pony", "say hello", evbSbPony]] },
sbrosettes: { far: ["displaycase", "painting", "displaycase"], sides: ["painting", "displaycase", "painting"], acts: [[0.5, 0, 1.8, "The rosettes", "read", evbSbRosettes]] },
sbgroomroom: { far: ["bed"], sides: ["wardrobe", "desk", "chair", "fireplace"], acts: [[0.5, 0, 1.8, "The groom's room", "read", evbSbGroomRoom]] },
sbvet: { far: ["wgmedshelf", "wgsteeltable"], sides: ["wgmedshelf", "sink", "shelfgoods"], acts: [[0.5, 0, 1.8, "The vet's room", "read", evbSbVet]] }
});
evbRooms({
muentry: { sides: ["esbust", "plant", "esbust", "noticeboard"], far: ["evb_fossil", "evb_fossil"], gap: 3.6, ceil: "chandelier", acts: [[0.35, 0, 2.0, "The museum", "read", evbMuEntry]] },
muhall: { mid: [["evb_meteor", 0.5, 0]], sides: ["displaycase", "esbust", "displaycase", "plant"], ceil: "evb_whale", acts: [[0.5, 0.3, 1.8, "The whale overhead", "look up", evbMuHall]] },
mubalcony: { far: ["displaycase", "esbust", "displaycase", "esbust"], sides: ["painting", "painting"] },
mudinos: { mid: [["evb_dino", 0.6, 0]], grid: ["evb_fossil", 2, 2, "-u", 0.2, 0.35], sides: ["displaycase", "evb_fossil", "displaycase", "noticeboard", "displaycase"], ceil: "evb_whale",
acts: [[0.4, 0, 2.4, "The T. rex", "look", evbMuDinos]] },
muegypt: { mid: [["sarcophagus", 0.5, 0]], far: ["evb_canopic", "evb_anubis"], sides: ["displaycase", "evb_hieros", "displaycase"], acts: [[0.5, 0.3, 1.8, "The mummy", "read", evbMuEgypt]] },
mugreece: { far: ["evb_amphora", "evb_doric", "evb_amphora"], sides: ["esbust", "evb_amphora", "esbust", "displaycase"], mid: [["displaycase", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The bronze gears", "read", evbMuGreece]] },
muknights: { grid: ["armourstand", 2, 2, "-u", 0.35, 0.65], sides: ["weaponrack", "hallbanner", "weaponrack"], acts: [[0.5, 0, 1.8, "The armour", "read", evbMuKnights]] },
murocks: { grid: ["displaycase", 2, 2, "-u", 0.35, 0.65], sides: ["crystalcluster", "displaycase", "crystals", "displaycase"], acts: [[0.5, 0, 1.8, "The gems", "read", evbMuRocks]] },
muspace: { mid: [["evb_meteor", 0.5, 0]], sides: ["evb_planet", "displaycase", "esglobe", "displaycase"], acts: [[0.5, 0.3, 1.8, "The meteorite", "read", evbMuSpace]] },
muclocks: { far: ["clock", "clock", "clock"], sides: ["clock", "displaycase", "clock", "displaycase"], acts: [[0.5, 0, 1.8, "The clocks", "listen", evbMuClocks]] },
mufossils: { grid: ["evb_fossil", 2, 2, "-u", 0.35, 0.65], sides: ["displaycase", "evb_fossil", "displaycase"], acts: [[0.5, 0, 1.8, "The fossils", "read", evbMuFossils]] },
mumammals: { mid: [["displaycase", 0.5, 0]], sides: ["pelt", "displaycase", "pelt", "boulder"], far: ["boulder", "evb_fossil"], acts: [[0.5, 0.3, 1.8, "The Ice Age", "read", evbMuMammals]] },
mudig: { mid: [["boulder", 0.5, 0]], sides: ["toys", "evb_fossil", "toys", "schooldesk"], acts: [[0.5, 0.3, 1.8, "The dig pit", "dig for a fossil", evbMuDig]] },
mushop: { far: ["shelfgoods", "shelfgoods"], sides: ["shelfgoods", "till", "shelfgoods", "toys"], mid: [["counter", 0.5, 0]], acts: [[0.5, 0, 1.8, "The shop", "read", evbMuShop]] },
mustore: { grid: ["filecabinet", 2, 3], sides: ["crates", "shelfgoods", "crates"], acts: [[0.5, 0, 1.8, "The store", "read", evbMuStore]] },
mucafe: { grid: ["wd:kf_table", 2, 2, "-u", 0.35, 0.65], sides: ["counter", "chair", "plant", "chair"], acts: [[0.5, 0, 1.8, "The café", "read", evbMuCafe]] },
muupper: { sides: ["esbust", "plant", "esbust", "displaycase"], far: ["displaycase", "displaycase"], gap: 3, acts: [[0.4, 0, 1.8, "The cabinets of curiosities", "read", evbMuUpper]] },
mupaint: { far: ["painting", "painting", "painting"], sides: ["painting", "painting", "painting", "painting"], mid: [["benchin", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The paintings", "read", evbMuPaint]] },
mubirds: { far: ["displaycase", "displaycase", "displaycase"], sides: ["displaycase", "plant", "displaycase"], acts: [[0.5, 0, 1.8, "The dodo", "read", evbMuBirds]] },
muocean: { ceil: "evb_whale", grid: ["displaycase", 2, 2, "-u", 0.35, 0.65], sides: ["dpx_coralpot", "displaycase", "dpx_anemone", "displaycase", "dpx_coralpot"], far: ["dpx_anchor", "dpx_wheel"],
acts: [[0.5, 0, 2.0, "The deep ocean", "read", evbMuOcean]] },
muinvent: { far: ["machine", "printpress"], sides: ["displaycase", "flywheel", "displaycase", "piston"], acts: [[0.5, 0, 1.8, "The inventions", "read", evbMuInvent]] },
muworld: { grid: ["displaycase", 2, 3, "-u", 0.3, 0.7], sides: ["painting", "evb_amphora", "painting", "evb_blanket"], acts: [[0.5, 0, 1.8, "The world gallery", "read", evbMuWorld]] },
murestore: { grid: ["workbench", 1, 2, "-u", 0.5, 0.5], sides: ["treasel", "shelfgoods", "treasel", "displaycase"], acts: [[0.5, 0, 1.8, "The restorers", "read", evbMuRestore]] },
mumaps: { grid: ["maptable", 2, 2, "-u", 0.35, 0.65], sides: ["mapchest", "esglobe", "mapchest", "painting"], acts: [[0.5, 0, 1.8, "The maps", "read", evbMuMaps]] }
});
evbRooms({
poyard: { sides: ["evb_pots", "crates", "evb_pots", "barrel"], far: ["evb_kiln"], gap: 3, acts: [[0.35, 0, 2.0, "The pottery", "read", evbPoYard]] },
powalk: { sides: ["evb_potshelf", "evb_pots", "evb_potshelf", "evb_pots"] },
podry: { far: ["evb_potshelf", "evb_potshelf", "evb_potshelf", "evb_potshelf"], sides: ["evb_potshelf", "evb_potshelf"] },
pokiln: { mid: [["evb_kiln", 0.6, 0]], grid: ["evb_pots", 1, 4, "-u", 0.25, 0.25], sides: ["evb_potshelf", "crates", "evb_potshelf", "barrel", "evb_potshelf"], far: ["evb_potshelf", "evb_potshelf"],
acts: [[0.4, 0, 2.4, "The bottle kiln", "look", evbPoKiln]] },
poclay: { sides: ["barrel", "crates", "barrel", "crates"], grid: ["barrel", 2, 2, "-u", 0.4, 0.6], acts: [[0.5, 0, 1.8, "The clay", "read", evbPoClay]] },
powedge: { mid: [["workbench", 0.5, 0]], sides: ["workbench", "barrel", "workbench"], acts: [[0.5, 0.25, 1.8, "The wedging bench", "wedge the clay", evbPoWedge]] },
powheels: { grid: ["potterswheel", 2, 2, "-u", 0.35, 0.65], sides: ["evb_potshelf", "sink", "evb_potshelf"], acts: [[0.5, 0, 1.8, "The wheel", "throw a pot", evbPoWheel]] },
pohand: { mid: [["longtable", 0.5, 0]], sides: ["evb_potshelf", "evb_pots", "evb_potshelf"], acts: [[0.5, 0, 1.8, "Hand-building", "read", evbPoHand]] },
poglaze: { far: ["barrel", "barrel", "barrel"], sides: ["evb_potshelf", "sink", "evb_potshelf"], mid: [["workbench", 0.5, 0]], acts: [[0.5, 0, 1.8, "The glazes", "read", evbPoGlaze]] },
popaint: { grid: ["schooldesk", 2, 3], sides: ["evb_potshelf", "evb_potshelf"], acts: [[0.5, 0, 1.8, "The paintresses", "read", evbPoPaint]] },
posaggar: { grid: ["crates", 2, 2, "-u", 0.35, 0.65], sides: ["workbench", "crates", "workbench"], acts: [[0.5, 0, 1.8, "The saggars", "read", evbPoSaggar]] },
pocoal: { grid: ["oreheap", 2, 2, "-u", 0.35, 0.65], sides: ["barrel", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The coal", "read", evbPoCoal]] },
poshop: { far: ["evb_potshelf", "evb_potshelf"], sides: ["evb_potshelf", "till", "evb_potshelf", "displaycase"], mid: [["counter", 0.5, 0]], acts: [[0.5, 0, 1.8, "The shop", "read", evbPoShop]] },
powonders: { grid: ["displaycase", 2, 2, "-u", 0.35, 0.65], sides: ["evb_amphora", "displaycase", "evb_pots", "displaycase"], acts: [[0.5, 0, 1.8, "Jasperware", "read", evbPoWonders]] },
potiles: { far: ["painting", "painting"], sides: ["evb_potshelf", "workbench", "evb_potshelf"], mid: [["workbench", 0.5, 0]], acts: [[0.5, 0, 1.8, "The tiles", "read", evbPoTiles]] },
pomould: { far: ["shelfgoods", "shelfgoods"], sides: ["workbench", "barrel", "workbench"], acts: [[0.5, 0, 1.8, "The moulds", "read", evbPoMould]] }
});
evbRooms({
cifoyer: { sides: ["painting", "plant", "evb_popcorn", "plant", "painting"], far: ["counter", "till"], gap: 3.6, ceil: "chandelier", acts: [[0.35, 0, 2.0, "The picture house", "read", evbCiFoyer]] },
cicorridor: { sides: ["painting", "plant", "painting", "painting"], ceil: "chandelier" },
cicircle: { grid: ["evb_seats", 1, 4, "-u", 0.5, 0.5], far: ["evb_seats"] },
ciaud: { far: ["evb_screen"], grid: ["evb_seats", 4, 3, "+u", 0.12, 0.62], sides: ["wallsconce", "plant", "wallsconce", "plant"], ceil: "chandelier",
acts: [[0.8, 0, 2.4, "The screen", "watch the film", evbCiAud]] },
cibox: { far: ["counter", "till"], sides: ["noticeboard", "filecabinet", "painting"], acts: [[0.5, 0, 1.8, "The box office", "buy a ticket", evbCiBox]] },
cisweets: { mid: [["evb_popcorn", 0.5, 0]], sides: ["counter", "shelfgoods", "counter", "evb_popcorn"], acts: [[0.5, 0.3, 1.8, "Popcorn", "get some", evbCiSweets]] },
ciproj: { grid: ["evb_projector", 1, 2, "-u", 0.5, 0.5], sides: ["shelfgoods", "workbench", "filecabinet"], acts: [[0.5, 0, 1.8, "The projectors", "read", evbCiProj]] },
cisilent: { far: ["evb_screen"], grid: ["evb_seats", 1, 2, "+u", 0.35, 0.35], sides: ["piano", "plant"], acts: [[0.5, 0, 1.8, "The silent films", "read", evbCiSilent]] },
cicafe: { grid: ["wd:kf_table", 2, 2, "-u", 0.35, 0.65], sides: ["counter", "chair", "plant", "chair"], acts: [[0.5, 0, 1.8, "The café", "read", evbCiCafe]] },
ciposters: { far: ["painting", "painting", "painting"], sides: ["painting", "crates", "painting", "shelfgoods"], acts: [[0.5, 0, 1.8, "The posters", "read", evbCiPosters]] },
ciorgan: { mid: [["esorgan", 0.5, 0]], sides: ["plant", "wallsconce", "plant"], acts: [[0.5, 0.3, 1.8, "The organ", "hear it play", evbCiOrgan]] },
cimanager: { far: ["desk", "filecabinet"], sides: ["painting", "bookshelf", "armchair", "clock"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The manager's office", "read", evbCiManager]] },
cismall: { far: ["evb_screen"], grid: ["evb_seats", 1, 3, "+u", 0.35, 0.35], sides: ["wallsconce", "plant"], acts: [[0.5, 0, 1.8, "Screen two", "read", evbCiSmall]] },
cicartoon: { far: ["evb_screen"], grid: ["evb_seats", 1, 2, "+u", 0.35, 0.35], sides: ["toys", "painting", "toys"], acts: [[0.5, 0, 1.8, "The cartoon", "watch", evbCiCartoon]] },
ciusher: { sides: ["eslockers", "wallmirror", "eslockers", "shelfgoods"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The ushers", "read", evbCiUsher]] },
cisound: { far: ["machine", "servertower"], sides: ["shelfgoods", "workbench", "machine"], acts: [[0.5, 0, 1.8, "The sound", "read", evbCiSound]] }
});
evbRooms({
micage: { mid: [["evb_minecage", 0.5, 0]], sides: ["mineprop", "lantern", "mineprop"], rug: false, acts: [[0.5, 0.3, 2.0, "The cage", "ride down", evbMiCage]] },
mimain: { sides: ["mineprop", "mineprop", "mineprop", "mineprop"], far: ["minecart", "minerails"], rug: false, acts: [[0.5, 0, 1.8, "The seams", "read", evbMiMain]] },
mirails: { far: ["minecart", "minerails", "minecart", "minerails"], sides: ["mineprop", "mineprop"], rug: false, acts: [[0.5, 0, 1.8, "The tubs", "read", evbMiRails]] },
miface: { far: ["oreheap", "oreheap", "oreheap"], grid: ["mineprop", 3, 2, "-u", 0.2, 0.8], sides: ["mineprop", "minecart", "mineprop", "oreheap"], mid: [["minecart", 0.5, 0], ["minerails", 0.35, 0]], rug: false,
acts: [[0.6, 0, 2.0, "The coal face", "swing a pick", evbMiFace]] },
milamps: { far: ["shelfgoods", "keyrack"], sides: ["lantern", "shelfgoods", "lantern", "keyrack"], mid: [["counter", 0.5, 0]], acts: [[0.5, 0, 1.8, "The lamps", "read", evbMiLamps]] },
mibird: { mid: [["cage", 0.5, 0]], sides: ["mineprop", "lantern", "mineprop"], rug: false, acts: [[0.5, 0.3, 1.8, "The canary", "listen", evbMiBird]] },
miponies: { sides: ["trstall", "trhay", "trstall", "trtrough"], mid: [["evb_horse", 0.5, 0]], rug: false, acts: [[0.4, 0.3, 1.8, "The pit pony", "say hello", evbMiPonies]] },
mitools: { far: ["trtoolwall", "trtoolwall"], sides: ["crates", "barrel", "crates", "mineprop"], rug: false, acts: [[0.5, 0, 1.8, "The tools", "read", evbMiTools]] },
migems: { grid: ["crystalcluster", 2, 2, "-u", 0.35, 0.65], sides: ["crystals", "mineprop", "crystals"], rug: false, acts: [[0.5, 0, 1.8, "The crystals", "read", evbMiGems]] },
miwater: { mid: [["cavepool", 0.5, 0]], sides: ["pipes", "boiler", "pipes"], far: ["piston"], rug: false, acts: [[0.5, 0.35, 1.8, "The pumps", "read", evbMiWater]] },
mirescue: { far: ["eslockers", "eslockers"], sides: ["crates", "noticeboard", "crates"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The rescue team", "read", evbMiRescue]] },
mifirst: { far: ["wgmedshelf", "cot"], sides: ["cot", "wgmedshelf", "sink"], acts: [[0.5, 0, 1.8, "First aid", "read", evbMiFirst]] },
mifans: { sides: ["mineprop", "pipes", "mineprop"], far: ["machine"], rug: false, acts: [[0.5, 0, 1.8, "The air doors", "read", evbMiFans]] },
mibait: { mid: [["wd:kf_table", 0.5, 0]], sides: ["benchin", "benchin", "lantern"], rug: false, acts: [[0.5, 0.3, 1.8, "Snap time", "eat", evbMiBait]] },
migold: { grid: ["goldpile", 1, 2, "-u", 0.5, 0.5], sides: ["crystals", "mineprop", "oreheap"], rug: false, acts: [[0.5, 0, 1.8, "The gold", "read", evbMiGold]] },
miold: { sides: ["mineprop", "boulder", "mineprop", "stalactites"], far: ["boulder", "oreheap"], rug: false, acts: [[0.5, 0, 1.8, "The old workings", "read", evbMiOld]] }
});
evbRooms({
gsdoor: { sides: ["trsacks", "crates", "trsacks", "weighscale"], far: ["evb_grain", "evb_grain"], gap: 3, rug: false, acts: [[0.35, 0, 2.0, "The grain silo", "read", evbGsDoor]] },
gswalk: { sides: ["trsacks", "evb_grain", "trsacks", "evb_grain"], rug: false },
gscatwalk: { far: ["pipes", "machine", "pipes"], sides: ["pipes", "pipes"], rug: false },
gsbins: { grid: ["evb_grain", 2, 3, "-u", 0.3, 0.7], sides: ["trsacks", "pipes", "trsacks", "machine"], far: ["machine", "pipes", "machine"], rug: false, acts: [[0.5, 0, 2.0, "The bins", "read", evbGsBins]] },
gselevator: { mid: [["machine", 0.5, 0]], sides: ["pipes", "wgconveyor", "pipes"], rug: false, acts: [[0.5, 0.3, 1.8, "The elevator", "watch", evbGsElevator]] },
gsscales: { mid: [["weighscale", 0.5, 0]], sides: ["desk", "noticeboard", "filecabinet"], rug: false, acts: [[0.5, 0.3, 1.8, "The weighbridge", "weigh a load", evbGsScales]] },
gsdry: { grid: ["evb_grain", 2, 2, "-u", 0.35, 0.65], sides: ["machine", "pipes", "machine"], rug: false, acts: [[0.5, 0, 1.8, "The drying floor", "read", evbGsDry]] },
gsseed: { far: ["shelfgoods", "shelfgoods"], sides: ["trsacks", "shelfgoods", "trsacks"], acts: [[0.5, 0, 1.8, "The seed store", "read", evbGsSeed]] },
gsmill: { mid: [["trmillstone", 0.5, 0]], sides: ["trsacks", "barrel", "trsacks"], rug: false, acts: [[0.5, 0.3, 1.8, "The millstones", "grind", evbGsMill]] },
gsbakery: { far: ["oven", "stove"], sides: ["counter", "trbreadrack", "counter"], mid: [["longtable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The bread", "smell it", evbGsBakery]] },
gstractor: { mid: [["evb_tractor", 0.5, 0]], sides: ["trtoolwall", "barrel", "trtoolwall"], rug: false, acts: [[0.5, 0.35, 1.8, "The tractor", "start it", evbGsTractor]] },
gsbarn: { sides: ["trhay", "trsacks", "trhay", "crates"], mid: [["pelt", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The barn cats", "say hello", evbGsBarn]] },
gsoffice: { far: ["desk", "filecabinet"], sides: ["noticeboard", "bookshelf", "chair"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The farm office", "read", evbGsOffice]] },
gstest: { far: ["wglabbench", "shelfgoods"], sides: ["weighscale", "wglabbench", "shelfgoods"], acts: [[0.5, 0, 1.8, "The tester", "read", evbGsTest]] },
gsmice: { sides: ["trhay", "crates", "trhay"], far: ["trhay"], rug: false, acts: [[0.5, 0, 1.8, "The barn owl", "listen", evbGsOwl]] },
gsfair: { far: ["longtable", "banner"], sides: ["trhay", "banner", "trsacks", "trhay"], mid: [["longtable", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The harvest fair", "make a corn dolly", evbGsFair]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, GILT = evbGilt;
var P = {};
P.evb_sleepbag = function () {
var g = G();
[[-0.5, 0x2A6AA8], [0.5, 0xC0501A]].forEach(function (q) { B(g, M(0x3A5A3A), 0.75, 0.03, 2.0, q[0], 0.015, 0); var b = Cy(g, M(q[1]), 0.3, 0.3, 1.7, q[0], 0.2, 0.1, 10); b.rotation.x = Math.PI / 2; b.scale.set(1, 1, 0.6); S(g, M(q[1]), 0.3, q[0], 0.2, -0.75, 10).scale.set(1, 0.6, 0.6); });
Cy(g, M(0x3A3A3A), 0.06, 0.07, 0.04, 0, 0.02, -0.8, 8);
S(g, evbGlow(0xFFD890, 0.85), 0.06, 0, 0.12, -0.8, 8);
return g;
};
P.evb_campfire = function () {
var g = G(), st = M(0x8A8478, "stone");
for (var i = 0; i < 9; i++) {
var a = i * 0.698;
S(g, st, 0.14, Math.cos(a) * 0.6, 0.08, Math.sin(a) * 0.6, 8).scale.set(1, 0.7, 1);
}
for (var j = 0; j < 4; j++) {
var l = Cy(g, M(0x5A3A22, "wood"), 0.05, 0.05, 0.8, 0, 0.15, 0, 6);
l.rotation.z = Math.PI / 2;
l.rotation.y = j * 0.8;
}
Co(g, evbGlow(0xFF8020, 0.85), 0.3, 0.5, 0, 0.4, 0, 8);
Co(g, evbGlow(0xFFD040, 0.9), 0.16, 0.35, 0, 0.38, 0, 8);
[0, 2.1, 4.2].forEach(function (a) { var t = Cy(g, M(0x3A3A3A), 0.02, 0.02, 1.4, Math.cos(a) * 0.35, 0.65, Math.sin(a) * 0.35, 4); t.rotation.z = Math.cos(a) * 0.25; t.rotation.x = -Math.sin(a) * 0.25; });
S(g, M(0x2A2A2A), 0.12, 0, 0.95, 0, 10).scale.set(1, 0.8, 1);
return g;
};
P.evb_canoe = function () {
var g = G(), wd = M(0x8A5A2A, "wood");
[-0.8, 0.8].forEach(function (z) { B(g, wd, 0.08, 0.6, 0.08, -0.4, 0.3, z); B(g, wd, 0.08, 0.6, 0.08, 0.4, 0.3, z); B(g, wd, 0.9, 0.06, 0.1, 0, 0.6, z); });
var c = S(g, M(0xB8401A), 0.4, 0, 0.82, 0, 14);
c.scale.set(1, 0.5, 5);
B(g, M(0xC8A070, "wood"), 0.06, 0.05, 1.8, 0, 0.98, 0);
var p = Cy(g, wd, 0.02, 0.02, 1.4, 0.3, 1.0, 0.3, 6);
p.rotation.x = Math.PI / 2;
B(g, wd, 0.15, 0.02, 0.4, 0.3, 1.0, 1.0);
return g;
};
P.evb_packs = function () {
var g = G();
B(g, M(0x8A6A3A, "wood"), 0.9, 0.6, 0.6, 0, 0.3, -0.1);
[[-0.3, 0x3A6A3A], [0.3, 0xC0802A]].forEach(function (q) { var b = B(g, M(q[1]), 0.4, 0.65, 0.3, q[0], 0.93, 0.05); S(g, M(q[1]), 0.2, q[0], 1.28, 0.05, 8).scale.set(1, 0.5, 0.8); B(g, M(0x2A2A2A), 0.06, 0.5, 0.04, q[0] - 0.1, 0.95, 0.21); B(g, M(0x2A2A2A), 0.06, 0.5, 0.04, q[0] + 0.1, 0.95, 0.21); });
Tor(g, M(0xD8C890), 0.2, 0.04, 0.55, 0.75, 0.2, 0);
return g;
};
P.evb_hammock = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
[-1.1, 1.1].forEach(function (x) { Cy(g, wd, 0.07, 0.08, 1.6, x, 0.8, 0, 8); });
var h = S(g, M(0xD8C8A0, "damask"), 0.4, 0, 0.75, 0, 12);
h.scale.set(2.5, 0.35, 1);
[-1, 1].forEach(function (s) { var r = Cy(g, M(0xC8B890), 0.01, 0.01, 0.6, s * 0.85, 1.05, 0, 4); r.rotation.z = s * 1.1; });
return g;
};
P.evb_rainbarrel = function () {
var g = G();
Cy(g, M(0x5A6A7A), 0.4, 0.4, 1.0, 0, 0.5, 0, 14);
Cy(g, M(0x2A5A7A, null, { op: 0.85 }), 0.37, 0.37, 0.02, 0, 0.95, 0, 14);
var gu = Cy(g, M(0x9A8A50), 0.06, 0.06, 1.2, 0, 1.6, -0.2, 8);
gu.rotation.z = Math.PI / 2 + 0.15;
B(g, M(0x9A8A50), 0.04, 0.6, 0.04, 0.55, 1.3, -0.2);
return g;
};
P.evb_scrapbench = function () {
var g = G(), wd = M(0x7A6A5A, "wood"), mt = M(0x6A6A68);
B(g, wd, 1.8, 0.08, 0.7, 0, 0.9, 0);
[-0.8, 0.8].forEach(function (x) { B(g, mt, 0.08, 0.9, 0.6, x, 0.45, 0); });
B(g, wd, 1.8, 1.0, 0.05, 0, 1.45, -0.33);
B(g, M(0x5A4A3A), 0.4, 0.25, 0.25, -0.4, 1.07, 0);
S(g, M(0x2A2A2A), 0.06, -0.32, 1.08, 0.13, 8);
Cy(g, M(0xB87838), 0.12, 0.12, 0.06, 0.2, 0.97, 0.05, 10);
for (var i = 0; i < 5; i++)
B(g, mt, 0.04, 0.3, 0.03, -0.6 + i * 0.3, 1.4, -0.29);
Tor(g, M(0xB87838), 0.12, 0.015, 0.5, 1.5, -0.29, 0);
return g;
};
P.evb_cans = function () {
var g = G();
B(g, M(0x7A6A5A, "wood"), 1.4, 0.5, 0.5, 0, 0.25, 0);
for (var i = 0; i < 5; i++) {
var x = -0.55 + i * 0.27;
Cy(g, M(0xA8A8A0), 0.1, 0.1, 0.22, x, 0.61, 0, 10);
S(g, M(0x3A8A3A), 0.13, x, 0.82, 0, 8);
if (i % 2)
S(g, M(0xD8301A), 0.04, x + 0.05, 0.85, 0.08, 6);
}
return g;
};
P.evb_cryo = function () {
var g = G(), wt = M(0xD8DCE0);
B(g, wt, 1.0, 0.5, 2.2, 0, 0.25, 0);
var lid = Cy(g, M(0xC8E8FF, null, { op: 0.35 }), 0.45, 0.45, 2.0, 0, 0.55, 0, 14);
lid.rotation.x = Math.PI / 2;
lid.scale.set(1, 1, 0.6);
B(g, evbGlow(0x60B8FF, 0.75), 0.8, 0.02, 1.8, 0, 0.51, 0);
B(g, wt, 1.05, 0.7, 0.2, 0, 0.6, -1.1);
B(g, evbGlow(0x40F070, 0.9), 0.12, 0.06, 0.02, 0.3, 0.75, -0.99);
return g;
};
P.evb_console = function () {
var g = G(), mt = M(0x3A4048);
B(g, mt, 2.0, 0.9, 0.7, 0, 0.45, 0);
var top = B(g, M(0x2A2E34), 2.0, 0.06, 0.7, 0, 0.92, 0.02);
top.rotation.x = -0.3;
[-0.6, 0, 0.6].forEach(function (x, i) { var s = B(g, evbGlow([0x40C0F0, 0xE8B030, 0x40F070][i], 0.8), 0.5, 0.32, 0.02, x, 1.25, -0.25); s.rotation.x = -0.25; B(g, mt, 0.56, 0.38, 0.05, x, 1.25, -0.28).rotation.x = -0.25; });
for (var j = 0; j < 8; j++)
B(g, M([0xC0302A, 0xE8E8E0][j % 2]), 0.05, 0.03, 0.05, -0.7 + j * 0.2, 0.97, 0.15);
return g;
};
P.evb_debris = function () {
var g = G(), mt = M(0x7A7A78);
var a = B(g, mt, 1.6, 0.08, 1.0, 0, 0.35, 0);
a.rotation.z = 0.4;
a.rotation.y = 0.3;
var b = B(g, M(0x5A5A58), 1.0, 0.06, 0.7, 0.4, 0.2, 0.3);
b.rotation.x = 0.5;
for (var i = 0; i < 4; i++) {
var w = Cy(g, M([0xC0302A, 0xE8B030, 0x2A6AA8, 0x3A3A3A][i]), 0.015, 0.015, 0.6, -0.4 + i * 0.1, 0.5, 0.2, 4);
w.rotation.z = 0.8 - i * 0.3;
}
return g;
};
P.evb_alien = function () {
var g = G();
Cy(g, M(0x3A2A4A), 0.35, 0.4, 0.3, 0, 0.15, 0, 10);
for (var i = 0; i < 6; i++) {
var a = i * 1.05, h = 1.0 + (i % 3) * 0.4;
var st = Cy(g, M(0x4A2A6A), 0.03, 0.06, h, Math.cos(a) * 0.15, 0.3 + h / 2, Math.sin(a) * 0.15, 6);
st.rotation.z = Math.cos(a) * 0.25;
st.rotation.x = -Math.sin(a) * 0.25;
S(g, evbGlow([0x60F0C0, 0xF060D0, 0x80A0FF][i % 3], 0.85), 0.1, Math.cos(a) * (0.15 + h * 0.25), 0.3 + h, Math.sin(a) * (0.15 + h * 0.25), 8);
}
return g;
};
P.evb_coastercar = function () {
var g = G(), rd = M(0xC03A2E), bk = M(0x1A1A1A);
B(g, M(0x8A8A8A), 1.4, 0.12, 2.6, 0, 0.1, 0);
[-0.6, 0.6].forEach(function (x) { B(g, M(0x5A5A5A), 0.1, 0.1, 2.8, x, 0.2, 0); });
B(g, rd, 1.3, 0.6, 2.4, 0, 0.55, 0);
[-0.5, 0.5].forEach(function (z) { B(g, M(0x1A1A3A, "damask"), 1.1, 0.15, 0.5, 0, 0.75, z); B(g, M(0x1A1A3A, "damask"), 1.1, 0.6, 0.12, 0, 1.05, z - 0.25); B(g, M(0xE0B84A), 1.0, 0.06, 0.06, 0, 1.05, z + 0.15); });
var n = S(g, rd, 0.6, 0, 0.6, 1.3, 10);
n.scale.set(1, 0.6, 0.6);
[-0.4, 0.4].forEach(function (x) { S(g, evbGlow(0xFFF0C0), 0.07, x, 0.65, 1.6, 8); });
return g;
};
P.evb_loop = function () {
var g = G(), rd = M(0xC03A2E), wt = M(0xE8E2D2);
B(g, M(0x3A3A3A), 2.6, 0.1, 1.0, 0, 0.05, 0);
var t = Tor(g, rd, 1.1, 0.06, 0, 1.4, 0, 0);
Tor(g, rd, 1.1, 0.06, 0, 1.4, 0.12, 0);
[-1.2, 1.2].forEach(function (x) { Cy(g, wt, 0.04, 0.04, 1.4, x, 0.75, 0, 6); });
B(g, rd, 2.6, 0.06, 0.15, 0, 0.3, 0.06);
return g;
};
P.evb_floss = function () {
var g = G();
B(g, M(0x3AA8E0), 1.0, 0.9, 0.6, 0, 0.6, 0);
for (var i = 0; i < 4; i++)
B(g, M(0xF8F4E8), 0.1, 0.9, 0.61, -0.33 + i * 0.22, 0.6, 0);
Cy(g, M(0xD8D8D8), 0.3, 0.25, 0.25, 0, 1.18, 0, 14);
for (var j = 0; j < 4; j++) {
var x = -0.35 + j * 0.23;
Cy(g, M(0xF4F0E0), 0.01, 0.01, 0.4, x, 1.45, 0.2, 4);
S(g, M([0xF8A0C8, 0xA8D8F8][j % 2]), 0.13, x, 1.72, 0.2, 8);
}
B(g, M(0xF8A0C8), 1.1, 0.06, 0.7, 0, 1.95, 0);
[-0.5, 0.5].forEach(function (x) { Cy(g, M(0xE8E8E8), 0.02, 0.02, 0.85, x, 1.55, -0.25, 4); });
return g;
};
P.evb_cipher = function () {
var g = G(), wd = M(0x5A3A22, "wood");
B(g, M(0x6A4A2A, "wood"), 1.2, 0.75, 0.7, 0, 0.38, 0);
B(g, wd, 0.7, 0.2, 0.55, 0, 0.85, 0);
B(g, M(0x2A2A2A), 0.66, 0.02, 0.5, 0, 0.96, 0);
for (var r = 0; r < 3; r++)
for (var i = 0; i < 8; i++)
Cy(g, M(0xE8E4D8), 0.022, 0.022, 0.02, -0.25 + i * 0.07 + (r % 2) * 0.03, 0.98, 0.15 - r * 0.07, 8);
for (var j = 0; j < 8; j++)
S(g, M(0xE8D890, null, { e: 0x3A3010 }), 0.02, -0.25 + j * 0.07, 0.98, -0.07, 6);
[-0.08, 0, 0.08].forEach(function (x) { var w = Cy(g, M(0x8A8A8A), 0.05, 0.05, 0.04, x, 1.0, -0.18, 12); w.rotation.z = Math.PI / 2; });
return g;
};
P.evb_telegraph = function () {
var g = G(), wd = M(0x6A4A2A, "wood"), br = M(0xC8962A, null, { e: 0x1A1004 });
B(g, wd, 1.0, 0.75, 0.6, 0, 0.38, 0);
B(g, M(0x3A2A1A, "wood"), 0.25, 0.03, 0.15, -0.2, 0.77, 0.1);
var k = B(g, br, 0.03, 0.02, 0.18, -0.2, 0.81, 0.1);
k.rotation.x = 0.1;
S(g, M(0x1A1A1A), 0.025, -0.2, 0.83, 0.18, 6);
B(g, M(0x3A2A1A, "wood"), 0.25, 0.03, 0.18, 0.2, 0.77, 0);
Cy(g, br, 0.04, 0.04, 0.12, 0.15, 0.85, 0, 8);
Cy(g, br, 0.04, 0.04, 0.12, 0.25, 0.85, 0, 8);
B(g, br, 0.15, 0.02, 0.03, 0.2, 0.92, 0);
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_campfire", "evb_canoe", "evb_packs", "evb_hammock", "evb_rainbarrel", "evb_scrapbench", "evb_cans", "evb_cryo", "evb_console", "evb_debris", "evb_alien", "evb_coastercar", "evb_loop", "evb_floss", "evb_cipher", "evb_telegraph"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("camp", { corner: "lantern", seed: 81, panel: 0xC8B080,
pal: { fab: "emerald", fab2: "terracotta", wood: "pine", metal: "iron", stone: "granite", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8C090, "plaster"], "D8D0C0|coffer": [0xB8A070, "coffer"] },
hello: "⛺ <b>Inside the tent,</b> and it is a whole base camp: sleeping bays, the cook tent, the map table, the radio, the camp fire under the open flap. Look for the ✨ cards. The way out is the tent flap." });
evbHouse("camp", { g: EVB_GRID.mid, h: 3.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["Base camp"], wall: 0xD8C090, trim: 0x5A6A3A,
plan: [{ hall: { k: "bcflap", n: "The Tent Flap" }, spine: { k: "bcwalk", n: "The Guy Ropes" }, gallery: { k: "bcdry", n: "The Drying Line" },
back: { merge: EVB_BACK, k: "bcfire", n: "The Camp Fire Circle" },
r1i: { k: "bcsleep", n: "The Sleeping Bays" }, r1o: { k: "bccook", n: "The Cook Tent" },
r2i: { k: "bcmaps", n: "The Map Table" }, r2o: { k: "bcgear", n: "The Gear Store" },
r3i: { k: "bcradio", n: "The Radio Tent" }, r3o: { k: "bcstars", n: "The Stargazing Flap" },
l1i: { k: "bccanoe", n: "The Canoe Shelter" }, l1o: { k: "bcknots", n: "The Knot Board" },
l2i: { k: "bcnature", n: "The Nature Table" }, l2o: { k: "bcfirst", n: "The First Aid Tent" },
l3i: { k: "bcfish", n: "The Fishing Corner" }, l3o: { k: "bcjournal", n: "The Explorers' Journals" } }] });
evbTheme("shack", { corner: "evb_rainbarrel", seed: 83, panel: 0x9A8A6A,
pal: { fab: "charcoal", fab2: "mustard", wood: "pine", metal: "iron", stone: "slate", art: 0, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xA89878, "wood"], "D8D0C0|coffer": [0x6A5A3A, "coffer"] },
hello: "🛖 <b>Inside the shack.</b> Somebody has made a whole life here out of what washed up and what they could find: rain barrels, a scrap bench, a tin-can garden, a hammock, a shelf of saved books. Look for the ✨ cards. The way out is the plank door." });
evbHouse("shack", { g: EVB_GRID.mid, h: 3.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The shack"], wall: 0xA89878, trim: 0x5A4A2A,
plan: [{ hall: { k: "svdoor", n: "The Plank Door" }, spine: { k: "svwalk", n: "The Patched Passage" }, gallery: { k: "svroof", n: "The Rain Roof" },
back: { merge: EVB_BACK, k: "svhome", n: "The Main Room" },
r1i: { k: "svwater", n: "The Rain Barrels" }, r1o: { k: "svbench", n: "The Scrap Bench" },
r2i: { k: "svgarden", n: "The Tin-Can Garden" }, r2o: { k: "svhammock", n: "The Hammock Room" },
r3i: { k: "svlook", n: "The Lookout" }, r3o: { k: "svsmoke", n: "The Smokehouse" },
l1i: { k: "svbooks", n: "The Shelf of Saved Books" }, l1o: { k: "svhens", n: "The Hen Coop" },
l2i: { k: "svtrade", n: "The Trading Table" }, l2o: { k: "svstash", n: "The Stash" },
l3i: { k: "svcalendar", n: "The Calendar Post" }, l3o: { k: "svfire", n: "The Signal Fire Store" } }] });
evbTheme("wreck", { corner: "evb_debris", seed: 85, panel: 0x6A6A70,
pal: { fab: "charcoal", fab2: "teal", wood: "white", metal: "chrome", stone: "slate", art: 0, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0x8A8E94, "tile"], "D8D0C0|coffer": [0x3A3E44, "coffer"] },
hello: "🛸 <b>Inside the crashed ship.</b> She came down hard, but she is still mostly in one piece: the cracked bridge, the cryo bay, the engine still glowing, and something green and glowing growing through the vents. Read the captain's log. Look for the ✨ cards. The way out is the torn hatch." });
evbHouse("wreck", { g: EVB_GRID.wide, h: 3.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The wreck"], wall: 0x8A8E94, trim: 0xE8B030,
plan: [{ hall: { k: "wrhatch", n: "The Torn Hatch" }, spine: { k: "wrcorridor", n: "The Tilted Corridor" }, gallery: { k: "wrvents", n: "The Vent Crawl" },
back: { merge: EVB_BACK, k: "wrbridge", n: "The Cracked Bridge" },
r1i: { k: "wrcryo", n: "The Cryo Bay" }, r1o: { k: "wrcargo", n: "The Cargo Hold" },
r2i: { k: "wrengine", n: "The Engine Room" }, r2o: { k: "wrcrew", n: "The Crew Quarters" },
r3i: { k: "wrgalley", n: "The Galley" }, r3o: { k: "wrmed", n: "The Med Bay" },
l1i: { k: "wrgarden", n: "The Wild Garden" }, l1o: { k: "wrnav", n: "The Navigation Room" },
l2i: { k: "wrpods", n: "The Escape Pods" }, l2o: { k: "wrlog", n: "The Captain's Cabin" },
l3i: { k: "wrdome", n: "The Observation Dome" }, l3o: { k: "wrbeacon", n: "The Beacon Room" } }] });
evbTheme("airport", { corner: "plant", seed: 87, panel: 0xD8DDE2,
pal: { fab: "navy", fab2: "dove", wood: "ash", metal: "chrome", stone: "granite", art: 9, rug: 2, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE8ECF0, "plaster"], "D8D0C0|coffer": [0xC8D0D8, "coffer"] },
hello: "✈️ <b>Inside the terminal.</b> Check in, go through security, find your gate. The planes are lined up beyond the glass. Look for the ✨ cards. The way out is back through arrivals." });
evbHouse("airport", { g: EVB_GRID.wide, h: 5.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The terminal"], wall: 0xE8ECF0, trim: 0x2A4A7A,
plan: [{ hall: { k: "apcheckin", n: "The Check-In Hall" }, spine: { k: "apconcourse", n: "The Concourse" }, gallery: { k: "apwindows", n: "The Window Wall" },
back: { merge: EVB_BACK, k: "apgates", n: "The Departure Gates" },
r1i: { k: "apsecurity", n: "Security" }, r1o: { k: "aplounge", n: "The Departures Lounge" },
r2i: { k: "apbaggage", n: "The Baggage Hall" }, r2o: { k: "aparrivals", n: "Arrivals" },
r3i: { k: "appilots", n: "The Pilots' Briefing Room" }, r3o: { k: "apcrew", n: "The Cabin Crew Room" },
l1i: { k: "apshops", n: "The Shops" }, l1o: { k: "apcafe", n: "The Café" },
l2i: { k: "aplost", n: "Lost Property" }, l2o: { k: "apkids", n: "The Play Area" },
l3i: { k: "apdeck", n: "The Observation Deck" }, l3o: { k: "apinfo", n: "The Information Desk" } }] });
evbTheme("coaster", { corner: "evb_floss", seed: 89, panel: 0xE8D8C0,
pal: { fab: "crimson", fab2: "teal", wood: "white", metal: "chrome", stone: "granite", art: 8, rug: 2, rugv: 1 },
remap: { "D6D0C6|plaster": [0xF0E4D0, "plaster"], "D8D0C0|coffer": [0xC03A2E, "coffer"] },
hello: "🎢 <b>Inside the roller coaster,</b> under the great red track: the queue, the station where the train comes in, the control booth, the workshop and the designers' room. Look for the ✨ cards. The way out is the exit gate." });
evbHouse("coaster", { g: EVB_GRID.wide, h: 5.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The ride"], wall: 0xF0E4D0, trim: 0xC03A2E,
plan: [{ hall: { k: "rcgate", n: "The Entrance Gate" }, spine: { k: "rcqueue", n: "The Queue" }, gallery: { k: "rcunder", n: "Under the Track" },
back: { merge: EVB_BACK, k: "rcstation", n: "The Station" },
r1i: { k: "rcbooth", n: "The Control Booth" }, r1o: { k: "rcshop", n: "The Workshop" },
r2i: { k: "rcdesign", n: "The Designers' Room" }, r2o: { k: "rcmodel", n: "The Model Room" },
r3i: { k: "rcphoto", n: "The Photo Booth" }, r3o: { k: "rcgifts", n: "The Gift Shop" },
l1i: { k: "rcfloss", n: "The Candy Floss Stand" }, l1o: { k: "rcarcade", n: "The Arcade" },
l2i: { k: "rchistory", n: "The History of the Ride" }, l2o: { k: "rcsafety", n: "The Safety Check" },
l3i: { k: "rcsplash", n: "The Splash Zone" }, l3o: { k: "rclost", n: "The Lost Hats Room" } }] });
evbTheme("hidden", { corner: "candles", seed: 91, panel: 0x5A4A3A,
pal: { fab: "plum", fab2: "emerald", wood: "mahogany", metal: "brass", stone: "slate", art: 2, rug: 1, rugv: 1 },
remap: { "D6D0C6|plaster": [0x6A5A4A, "wood"], "D8D0C0|coffer": [0x3A2A1A, "coffer"] },
hello: "🗝️ <b>You found the hidden room.</b> Behind the bookcase there is a whole hidden house: the secret passage, the cipher room, the priest hole, the smugglers' tunnel, the spies' kit and the treasure. Look for the ✨ cards. The way out is back through the bookcase." });
evbHouse("hidden", { g: EVB_GRID.mid, h: 3.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The hidden rooms"], wall: 0x6A5A4A, trim: 0xC8962A,
plan: [{ hall: { k: "hrcase", n: "Behind the Bookcase" }, spine: { k: "hrpassage", n: "The Secret Passage" }, gallery: { k: "hrspy", n: "The Spyhole Gallery" },
back: { merge: EVB_BACK, k: "hrtreasure", n: "The Treasure Room" },
r1i: { k: "hrcipher", n: "The Cipher Room" }, r1o: { k: "hrmorse", n: "The Telegraph Room" },
r2i: { k: "hrpriest", n: "The Priest Hole" }, r2o: { k: "hrsmuggle", n: "The Smugglers' Tunnel" },
r3i: { k: "hrkit", n: "The Spies' Kit" }, r3o: { k: "hrmaps", n: "The Map Room" },
l1i: { k: "hrletters", n: "The Room of Letters" }, l1o: { k: "hrclock", n: "The Clock Puzzle" },
l2i: { k: "hrlibrary", n: "The Hidden Library" }, l2o: { k: "hrstairs", n: "The Stair in the Wall" },
l3i: { k: "hrattic", n: "The Secret Attic" }, l3o: { k: "hrdiary", n: "The Diary Room" } }] });
evbFins({
bcflap: ["wood", 0x8A7A5A, 0xD8C090, "plaster", 0x5A6A3A], bcwalk: ["wood", 0x8A7A5A, 0xD0B888, "plaster", 0x5A6A3A], bcdry: ["wood", 0x8A7A5A, 0xD8C090, "plaster", 0x5A6A3A],
bcfire: ["stone", 0x7A6A50, 0x2A3050, "plaster", 0xE8C860], bcsleep: ["carpet", 0x3A5A3A, 0xD8C090, "plaster", 0x5A6A3A], bccook: ["wood", 0x8A7A5A, 0xE0C898, "plaster", 0xC0501A],
bcmaps: ["wood", 0x8A7A5A, 0xD8C090, "plaster", 0x2A4A7A], bcgear: ["wood", 0x8A7A5A, 0xC8B080, "plaster", 0x5A6A3A], bcradio: ["wood", 0x8A7A5A, 0xD8C090, "plaster", 0x3A3A3A],
bcstars: ["carpet", 0x2A3A5A, 0x14183A, "plaster", 0xE8D860], bccanoe: ["wood", 0x8A7A5A, 0xD8C090, "plaster", 0xB8401A], bcknots: ["wood", 0x8A7A5A, 0xE0C898, "plaster", 0x5A6A3A],
bcnature: ["wood", 0x8A7A5A, 0xD8E0B8, "plaster", 0x3A7A3A], bcfirst: ["wood", 0x8A7A5A, 0xF0F0E8, "plaster", 0xC0302A], bcfish: ["wood", 0x8A7A5A, 0xC8D8E0, "plaster", 0x2A6A8A],
bcjournal: ["carpet", 0x7A3A2A, 0xD8C090, "plaster", 0x5A6A3A],
svdoor: ["wood", 0x6A5A3A, 0xA89878, "wood", 0x5A4A2A], svwalk: ["wood", 0x6A5A3A, 0x9A8A6A, "wood", 0x5A4A2A], svroof: ["wood", 0x6A5A3A, 0xA89878, "wood", 0x5A4A2A],
svhome: ["wood", 0x6A5A3A, 0xA89878, "wood", 0x5A4A2A], svwater: ["stone", 0x7A7468, 0x9A9A90, "wood", 0x2A5A7A], svbench: ["wood", 0x6A5A3A, 0x8A7A60, "wood", 0x5A4A2A],
svgarden: ["stone", 0x6A5A3A, 0xB8A880, "wood", 0x3A7A3A], svhammock: ["wood", 0x7A6A4A, 0xB8A880, "wood", 0x5A4A2A], svlook: ["wood", 0x6A5A3A, 0x9AB0C0, "wood", 0x5A4A2A],
svsmoke: ["stone", 0x5A5248, 0x6A5A4A, "wood", 0x3A2A1A], svbooks: ["wood", 0x6A5A3A, 0xA89878, "wood", 0x8A3A2A], svhens: ["wood", 0x7A6A4A, 0xB8A880, "wood", 0x5A4A2A],
svtrade: ["wood", 0x6A5A3A, 0xA89878, "wood", 0xE8B030], svstash: ["wood", 0x5A4A2A, 0x8A7A60, "wood", 0x3A2A1A], svcalendar: ["wood", 0x6A5A3A, 0xA89878, "wood", 0x5A4A2A],
svfire: ["stone", 0x6A6058, 0x8A7A6A, "wood", 0xC0501A],
wrhatch: ["tile", 0x5A5E64, 0x8A8E94, "tile", 0xE8B030], wrcorridor: ["tile", 0x5A5E64, 0x7A7E84, "tile", 0xE8B030], wrvents: ["tile", 0x4A4E54, 0x6A6E74, "tile", 0x3A3E44],
wrbridge: ["tile", 0x3A3E44, 0x5A5E64, "tile", 0x40C0F0, "coffer"], wrcryo: ["tile", 0x5A6A7A, 0xC8E0F0, "tile", 0x60B8FF], wrcargo: ["tile", 0x5A5E64, 0x7A7E84, "tile", 0xE8B030],
wrengine: ["tile", 0x3A3E44, 0x4A5058, "tile", 0x40B0FF], wrcrew: ["carpet", 0x3A4A5A, 0xC8CCD0, "tile", 0x2A6AA8], wrgalley: ["checker", 0xC8CCD0, 0xD8DCE0, "tile", 0xE8B030],
wrmed: ["tile", 0xE8ECF0, 0xF0F4F8, "tile", 0x40C080], wrgarden: ["tile", 0x3A4A3A, 0x2A4A3A, "tile", 0x60F0C0], wrnav: ["tile", 0x3A3E44, 0x1A2040, "tile", 0xE8D860],
wrpods: ["tile", 0x5A5E64, 0x8A8E94, "tile", 0xF06020], wrlog: ["carpet", 0x4A3A3A, 0xC8CCD0, "tile", 0xD8B040], wrdome: ["tile", 0x3A3E44, 0x0E1230, "tile", 0xE8D860],
wrbeacon: ["tile", 0x3A3E44, 0x5A5E64, "tile", 0xC0302A],
apcheckin: ["marble", 0xD8DCE0, 0xE8ECF0, "plaster", 0x2A4A7A, "coffer"], apconcourse: ["marble", 0xD8DCE0, 0xE8ECF0, "plaster", 0x2A4A7A], apwindows: ["marble", 0xD8DCE0, 0xD8E8F4, "plaster", 0x2A4A7A],
apgates: ["carpet", 0x2A3A6A, 0xE8ECF0, "plaster", 0x2A4A7A, "coffer"], apsecurity: ["tile", 0xC8CCD0, 0xE8ECF0, "plaster", 0xE8B030], aplounge: ["carpet", 0x2A3A6A, 0xE8ECF0, "plaster", 0x2A4A7A],
apbaggage: ["tile", 0xA8ACB0, 0xD8DCE0, "plaster", 0x2A4A7A], aparrivals: ["marble", 0xD8DCE0, 0xF0F0E8, "plaster", 0x3A8A5A], appilots: ["carpet", 0x3A3A4A, 0xE0E4E8, "plaster", 0x2A4A7A],
apcrew: ["carpet", 0x5A2A3A, 0xE8E4E0, "plaster", 0xD8B040], apshops: ["marble", 0xE8E4DC, 0xF0F0E8, "plaster", 0xD8B040], apcafe: ["wood", 0x9A7A58, 0xF0E8D8, "plaster", 0x2A4A7A],
aplost: ["tile", 0xC8CCD0, 0xE0E4E8, "plaster", 0x2A4A7A], apkids: ["carpet", 0xE8B030, 0xF0F4E8, "plaster", 0x3AA8E0], apdeck: ["tile", 0xA8ACB0, 0xC8DCEC, "plaster", 0x2A4A7A],
apinfo: ["marble", 0xD8DCE0, 0xE8ECF0, "plaster", 0xE8B030],
rcgate: ["tile", 0xC8743A, 0xF0E4D0, "plaster", 0xC03A2E], rcqueue: ["tile", 0xC8743A, 0xE8D8C0, "plaster", 0xC03A2E], rcunder: ["stone", 0x8A8478, 0xD8D0C0, "plaster", 0xC03A2E],
rcstation: ["wood", 0x8A6A4A, 0xF0E4D0, "plaster", 0xC03A2E, "coffer"], rcbooth: ["tile", 0x5A5E64, 0xE8ECF0, "plaster", 0x2A6AA8], rcshop: ["stone", 0x7A7468, 0xC8C0B0, "plaster", 0xE8B030],
rcdesign: ["wood", 0x8A6A4A, 0xF0F0E8, "plaster", 0x2A4A7A], rcmodel: ["wood", 0x8A6A4A, 0xE8E0D0, "plaster", 0xC03A2E], rcphoto: ["carpet", 0x2A2A2A, 0xE8308A, "plaster", 0xF5C518],
rcgifts: ["tile", 0xE8E0D0, 0xF0E8D8, "plaster", 0xC03A2E], rcfloss: ["checker", 0xF8E8F0, 0xF8D8E8, "plaster", 0x3AA8E0], rcarcade: ["carpet", 0x1A1A3A, 0x2A1A4A, "plaster", 0xE8308A],
rchistory: ["wood", 0x8A6A4A, 0xE8DCC0, "damask", 0xC03A2E], rcsafety: ["tile", 0xC8CCD0, 0xF0F0E8, "plaster", 0xE8B020], rcsplash: ["tile", 0x2A8AA8, 0xD8F0F8, "tile", 0x3AA8E0],
rclost: ["wood", 0x8A6A4A, 0xF0E4D0, "plaster", 0xC03A2E],
hrcase: ["wood", 0x4A3A2A, 0x5A4A3A, "wood", 0xC8962A], hrpassage: ["stone", 0x5A5248, 0x6A5E50, "stone", 0x3A2A1A], hrspy: ["wood", 0x4A3A2A, 0x6A5A4A, "wood", 0xC8962A],
hrtreasure: ["stone", 0x5A5248, 0x3A2A4A, "stone", 0xD8B040, "coffer"], hrcipher: ["wood", 0x4A3A2A, 0x2A3A2A, "wood", 0xC8962A], hrmorse: ["wood", 0x4A3A2A, 0x5A4A3A, "wood", 0xC8962A],
hrpriest: ["wood", 0x3A2A1A, 0x4A3A2A, "wood", 0x7A1E24], hrsmuggle: ["stone", 0x4A4238, 0x5A5248, "stone", 0x3A2A1A], hrkit: ["wood", 0x4A3A2A, 0x3A3A4A, "wood", 0xC8962A],
hrmaps: ["wood", 0x4A3A2A, 0xD8C8A0, "plaster", 0xC8962A], hrletters: ["wood", 0x4A3A2A, 0x6A4A5A, "damask", 0xC8962A], hrclock: ["herring", 0x5A4A3A, 0x2A4A3A, "damask", 0xD8B040],
hrlibrary: ["wood", 0x4A3A2A, 0x3A2A1A, "wood", 0xD8B040], hrstairs: ["stone", 0x5A5248, 0x6A5E50, "stone", 0x3A2A1A], hrattic: ["wood", 0x7A6A4A, 0x8A7A5A, "wood", 0x5A4A2A],
hrdiary: ["carpet", 0x6A3A4A, 0x7A5A6A, "damask", 0xC8962A]
});
EVB_LD.tent = { theme: "camp", name: "The Tent", doors: "the tent flap" };
EVB_LD.leanto = { theme: "shack", name: "The Lean-to", doors: "the tarp" };
EVB_LD.boardedshack = { theme: "shack", name: "The Boarded Shack", doors: "the plank door" };
EVB_LD.wreckedship = { theme: "wreck", name: "The Crashed Ship", doors: "the torn hatch" };
EVB_LD.terminal = { theme: "airport", name: "The Terminal", doors: "the terminal doors" };
EVB_LD.rollercoaster = { theme: "coaster", name: "The Roller Coaster", doors: "the entrance gate" };
EVB_LD.hiddenroom = { theme: "hidden", name: "The Hidden Room", doors: "the bookcase" };
"use strict";
var evbCpFlap = evbInfo("Base camp", "Every great expedition had a base camp, where the supplies were kept and the climbers or sledgers rested before the next push. Tenzing Norgay and Edmund Hillary first reached the top of Everest on the 29th of May 1953, after weeks of camps climbing higher and higher up the mountain.");
function evbCpFire() { return __ZC(367, 120, this, arguments, new.target); }
var evbCpSleep = evbInfo("The sleeping bays", "Polar explorers slept in bags of reindeer fur. Today's bags are filled with down, the soft feathers under a goose's outer feathers, or with man-made fibres, and keep you warm far below freezing.");
function evbCpCook() { return __ZC(367, 121, this, arguments, new.target); }
var evbCpMaps = evbInfo("The map table", "Contour lines join places of the same height: where they crowd together, the ground is steep. Lewis and Clark crossed America to the Pacific and back between 1804 and 1806, drawing maps of lands no outsider had mapped.");
var evbCpGear = evbFact("The gear store", ["Layers keep you warmer than one thick coat: they trap air between them.", "Wet clothes take heat from the body fast, so keep a dry set for the tent.", "A whistle carries further than a shout: three blasts means 'help'."]);
var evbCpRadio = evbInfo("The radio tent", "Base camp talks to the climbers by radio. In 1912 Roald Amundsen's news that he had reached the South Pole took weeks to reach the world; today a camp on Everest can send a message in seconds.");
function evbCpStars() { evbTune([523, 659, 784, 1047], 400, 1.4); evbSay("⭐ Find the Plough (the Big Dipper), follow the two stars at the end of its pan, and you reach the North Star. It hardly moves all night, and it is always north."); }
var evbCpCanoe = evbInfo("The canoe shelter", "Indigenous peoples of North America built canoes of birch bark over cedar frames, light enough for one person to carry between rivers. Fur traders paddled them thousands of miles.");
function evbCpKnots() { return __ZC(367, 122, this, arguments, new.target); }
var evbCpNature = evbFact("The nature table", ["Count a tree's rings to tell its age: one ring for each year.", "Moss does not always grow on the north side of trees, whatever people say.", "Owl pellets hold the tiny bones of the mice and voles the owl ate."]);
var evbCpFirst = evbInfo("The first aid tent", "Blisters are the walker's enemy: stop and cover a sore spot before it becomes a blister. Keep warm, drink water, and tell someone where you are going before you set out.");
function evbCpFish() { var c = Math.random() < 0.5; evbTune(c ? [392, 523, 659] : [392, 330], 250, 0.8); evbSay(c ? "🎣 A tug on the line... a trout! You let it go back to the river." : "🎣 Nothing yet. Fishing is mostly waiting, and listening to the water."); }
var evbCpJournal = evbInfo("The explorers' journals", "When Ernest Shackleton's ship Endurance was crushed by the Antarctic ice in 1915, all 28 men survived, living on the ice and then in open boats. The wreck itself was found in 2022, three kilometres down, the name still clear on the stern.");
var evbSvDoor = evbInfo("The shack", "Robinson Crusoe, by Daniel Defoe (1719), is the story of a sailor shipwrecked alone on an island for 28 years. Defoe may have been inspired by a real Scottish sailor, Alexander Selkirk, who lived alone on an island off Chile from 1704 to 1709.");
var evbSvHome = evbInfo("The main room", "Everything here was something else first: the table was a door, the chair a crate, the curtains a sail. Crusoe made his own table and chair, his own pots, even a sunshade of goat skins.");
var evbSvWater = evbInfo("The rain barrels", "Fresh water comes first, before food: people can live for weeks without food but only a few days without water. Rain caught from a clean roof is some of the safest water there is.");
function evbSvBench() { evbTune([1047, 880, 1047], 150, 0.5); evbSay("🔧 You tighten a wire and the old radio crackles... static, then, faintly, music from somewhere far away."); }
var evbSvGarden = evbInfo("The tin-can garden", "Crusoe found a few grains of barley and rice in a sack, scattered them by chance, and when they sprouted he saved every seed. It took him four years to grow enough to bake bread.");
function evbSvHammock() { evbTune([392, 349, 330], 600, 1.4); evbSay("😴 The hammock swings. Sailors slept in hammocks for centuries: the word comes from the Taíno people of the Caribbean, who slept in them long before Europeans arrived."); }
function evbSvLook() { var s = Math.random() < 0.3; evbTune(s ? [523, 659, 784, 1047] : [330, 294], 300, 0.8); evbSay(s ? "⛵ A sail! Far off on the horizon... no, it's turning away. Next time." : "🌊 Nothing but sea and sky. You keep watching."); }
var evbSvSmoke = evbInfo("The smokehouse", "Fish and meat hung in smoke dry out and keep for months. People all over the world have smoked food this way since long before there were fridges.");
var evbSvBooks = evbInfo("The shelf of saved books", "The Swiss Family Robinson (1812) is another shipwreck story, of a whole family who build a treehouse home on their island. Books were among the most precious things a castaway could save from a wreck.");
function evbSvHens() { evbTune([659, 784, 659], 150, 0.5); evbSay("🐔 The hens cluck. One of them has laid an egg in the bucket again."); }
function evbSvTrade() { return __ZC(367, 123, this, arguments, new.target); }
var evbSvStash = evbFact("The stash", ["Matches in a jar with a tight lid, to keep them dry.", "A tin of fish hooks and a ball of line.", "A needle and thread: a torn sail is a small thing to mend and a big thing to lose."]);
function evbSvCalendar() { evbTune([262], 200, 0.3); evbSay("📅 You cut another notch in the post. Crusoe cut one every day on a great wooden post, with a longer one each Sunday, so he would not lose track of time."); }
var evbSvFire = evbInfo("The signal fire store", "Three of anything, three fires, three whistles, three flashes, is the old signal for help. A green branch on a fire makes thick white smoke that can be seen from far out at sea.");
var evbWrHatch = evbInfo("The crashed ship", "Real spacecraft do come down. When the American space station Skylab fell in 1979, pieces landed in Western Australia, and the town of Esperance jokingly fined NASA 400 dollars for littering.");
function evbWrBridge() { return __ZC(367, 124, this, arguments, new.target); }
var evbWrCryo = evbInfo("The cryo bay", "Sleeping through the years between the stars in a frozen pod is still science fiction. Real astronauts on the International Space Station sleep in little cabins, in sleeping bags strapped to the wall so they do not float about.");
var evbWrCargo = evbFact("The cargo hold", ["Everything in a spaceship must be strapped down: in free fall, a loose spanner is a flying spanner.", "Cargo ships to the space station bring food, water, air and post from home.", "Rubbish is packed into an old cargo ship and burned up in the atmosphere."]);
var evbWrEngine = evbInfo("The engine room", "The engine still glows a steady blue. Rockets push by throwing gas out of the back very fast: as the gas goes one way, the ship goes the other. It works in empty space with nothing to push against.");
var evbWrCrew = evbInfo("The crew quarters", "Bunks, photographs of home, a guitar. People have lived on the International Space Station without a break since November 2000.");
function evbWrGalley() { evbTune([523, 587], 300, 0.6); evbSay("🌯 Space food: tortillas instead of bread, because bread makes crumbs, and crumbs float into the machinery and into astronauts' eyes."); }
var evbWrMed = evbInfo("The med bay", "In space, without gravity, bones and muscles grow weaker, so astronauts exercise about two hours every day. They come home a little taller, as their spines stretch out, though it soon wears off.");
function evbWrGarden() { evbTune([523, 659, 784, 659], 300, 1.2); evbSay("🌱 The ship's garden has gone wild, and something has grown through the vents, glowing softly. Real astronauts have grown lettuce, radishes, chillies and even zinnia flowers on the space station."); }
var evbWrNav = evbInfo("The navigation room", "Spacecraft find their way by the stars, with cameras that recognise star patterns, just as sailors once did with a sextant. The Voyager probes, launched in 1977, are now beyond the planets, still sending faint messages home.");
function evbWrPods() { evbTune([392, 523, 659, 784], 200, 0.8); evbSay("🚀 One pod is gone: the crew got away. The space station always has a capsule docked as a lifeboat, ready to bring the crew home."); }
function evbWrLog() { return __ZC(367, 125, this, arguments, new.target); }
function evbWrDome() { evbTune([523, 659, 784, 1047, 784], 400, 1.6); evbSay("🌌 Through the dome, a sky of strange stars. The space station has a dome of seven windows, the Cupola, where astronauts take photographs of Earth and watch sixteen sunrises a day."); }
var evbWrBeacon = evbInfo("The beacon room", "The beacon still calls for help, on and on. The Voyager probes carry a golden record of sounds and pictures from Earth, a message for anyone who might one day find them.");
var evbApCheckin = evbInfo("The check-in hall", "The world's first scheduled airline service flew in 1914, across the bay from St. Petersburg to Tampa in Florida: one passenger at a time, in a flying boat, for five dollars. Today the busiest airports handle around a hundred million passengers a year.");
function evbApCheck() { evbTune([523, 659], 200, 0.5); var c = evbPick(["LHR (London Heathrow)", "JFK (New York)", "HND (Tokyo Haneda)", "CDG (Paris)", "SYD (Sydney)", "LAX (Los Angeles)"]); evbSay("🧳 Your bag gets a tag with a three-letter code: " + c + ". Every airport in the world has its own."); }
function evbApSecurity() { evbTune([880], 300, 0.4); evbSay("🛂 Bags on the belt, coat in the tray, through the arch. Beep! Only your belt buckle. On you go."); }
var evbApLounge = evbInfo("The departures lounge", "The board flips through the flights: on time, boarding, delayed. The old boards were made of little flaps that clattered round as they changed, and some airports kept them for the sound.");
function evbApGates() { return __ZC(367, 126, this, arguments, new.target); }
var evbApBaggage = evbInfo("The baggage hall", "Under the floor, miles of belts and chutes carry the bags, read their tags and send them to the right plane. Big airports move tens of thousands of bags an hour.");
var evbApArrivals = evbInfo("Arrivals", "Hugs, signs with names on, balloons. Flying east or west across many time zones leaves the body clock behind: jet lag. It takes about a day to catch up for every time zone crossed.");
var evbApPilots = evbFact("The pilots' briefing room", ["The captain and the co-pilot often eat different meals, so they can't both be ill from the same food.", "The 'black box' flight recorders are really bright orange, so they can be found.", "Planes fly faster eastbound over the Atlantic: the jet stream, a fast river of wind high up, pushes them along."]);
var evbApCrew = evbInfo("The cabin crew room", "The cabin crew are there first for safety: they train to get everyone out of a plane in 90 seconds, and to fight fires and give first aid, as well as serving the tea.");
var evbApShops = evbInfo("The shops", "Airport shops sell everything a traveller might have forgotten: toothbrushes, books, chargers, neck pillows, and sweets from the country you're leaving.");
function evbApCafe() { evbTune([523, 587], 300, 0.6); evbSay("☕ A coffee and a croissant while you watch the planes. Airport cafés are some of the busiest in the world, open from before dawn."); }
var evbApLost = evbFact("Lost property", ["Teddy bears, phones, glasses, false teeth and once, the story goes, a suit of armour.", "Unclaimed bags in America can end up at a shop in Alabama that sells them.", "Write your name inside everything."]);
function evbApKids() { evbTune([523, 659, 784], 200, 0.6); evbSay("🧸 The play area has a little aeroplane to climb into. You do the safety demonstration for the teddy bears."); }
var evbApDeck = evbInfo("The observation deck", "Plane-spotters watch and note down the planes. Each plane has its own registration painted on it, like a car's number plate: G- for Britain, N for the USA, F- for France.");
var evbApInfo = evbInfo("The information desk", "The phonetic alphabet keeps letters clear over a crackly radio: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot... Pilots and controllers all over the world use it.");
var evbRcGate = evbInfo("The roller coaster", "Roller coasters began with the ice slides of Russia in the 1600s: tall wooden ramps covered in ice, ridden on sleds. LaMarcus Thompson built the first American coaster at Coney Island, New York, in 1884: the Switchback Railway, which went about 10 km/h.");
function evbRcQueue() { evbTune([392, 392, 440], 300, 0.6); evbSay("⏳ The queue zigzags back and forth. Ride designers plan queues to show you a little of the ride along the way, so the waiting builds the excitement."); }
function evbRcStation() { return __ZC(367, 127, this, arguments, new.target); }
var evbRcBooth = evbInfo("The control booth", "The operator watches every train on screens and checks every lap bar is locked before pressing the button. Sensors along the track make sure two trains can never be in the same section at once.");
var evbRcShop = evbInfo("The workshop", "Every morning before the park opens, the engineers walk the whole track and run empty trains round, checking every wheel and bolt. The trains have three sets of wheels: on top of the rail, under it and beside it, so they can't come off.");
var evbRcDesign = evbInfo("The designers' room", "Loops are not round but shaped like a teardrop, tighter at the top: a round loop would squash riders too hard at the bottom. The first modern coaster with a full loop opened in California in 1976.");
function evbRcModel() { evbTune([523, 659, 784], 200, 0.5); evbSay("🧩 The model of the ride, with a little ball bearing for a train. You let it go at the top and it rolls all the way round."); }
function evbRcPhoto() { evbTune([1047], 100, 0.3); var f = evbPick(["eyes shut tight", "both arms in the air", "mouth wide open", "perfectly calm, somehow"]); evbSay("📸 The camera on the big drop caught you: " + f + "."); }
var evbRcGifts = evbInfo("The gift shop", "T-shirts that say 'I survived', keyrings, and the photo from the big drop. Every ride ends in the shop.");
function evbRcFloss() { evbTune([659, 784, 880], 150, 0.5); evbSay("🍭 Candy floss is sugar melted and spun out through tiny holes into threads as fine as hair. A dentist, William Morrison, helped invent the machine in 1897."); }
function evbRcArcade() { var w = Math.random() < 0.4; evbTune(w ? [523, 659, 784, 1047] : [330, 262], 200, 0.8); evbSay(w ? "🕹️ High score! You type in three letters." : "🕹️ Game over. One more go?"); }
var evbRcHistory = evbInfo("The history of the ride", "The Cyclone at Coney Island, a wooden coaster built in 1927, still runs today. The fastest coasters now go about 240 km/h, launched like aircraft from a standing start.");
var evbRcSafety = evbFact("The safety check", ["Riders must be tall enough: the bars are made to hold a body of a certain size.", "Loose things go in the lockers: hats, phones, glasses.", "Riding a coaster is far safer than riding in a car to the park."]);
function evbRcSplash() { evbTune([784, 659, 523, 392], 150, 0.8); evbSay("💦 SPLASH! The boat hits the pool at the bottom and a wave soaks everyone in the front row. You knew that would happen."); }
var evbRcLost = evbInfo("The lost hats room", "Hats, sunglasses, a single shoe, a toy dinosaur. Things fly off on coasters, which is why the staff ask you to put them in a locker.");
var evbHrCase = evbInfo("Behind the bookcase", "Pull the right book and the whole case swings open. Secret doors like this really were built, in castles, in grand houses and in hiding places. In Amsterdam, from 1942 to 1944, Anne Frank and seven others hid from the Nazis in rooms behind a bookcase; her diary is read all over the world.");
function evbHrCipher() { return __ZC(367, 128, this, arguments, new.target); }
function evbHrMorse() { evbTune([880, 880, 880, 0, 880, 880, 880, 0, 880, 880, 880].filter(function (n) { return n; }), 160, 1.4); evbSay("📡 Dot dot dot, dash dash dash, dot dot dot: SOS. Samuel Morse's code sent the first long-distance telegraph message in 1844, between Washington and Baltimore."); }
var evbHrPriest = evbInfo("The priest hole", "In England in the 1500s and 1600s, Catholic priests were hunted, and families hid them in tiny secret rooms built into walls, chimneys and stairs. A carpenter called Nicholas Owen built many of the cleverest; some were not found for hundreds of years.");
var evbHrSmuggle = evbInfo("The smugglers' tunnel", "In the 1700s smugglers ran tea, brandy, lace and tobacco ashore on dark nights along the coasts of Cornwall and Kent, to dodge the taxes. Stories tell of tunnels from coves to inns, though many were never real.");
var evbHrKit = evbFact("The spies' kit", ["Messages were hidden in hollow coins, shoe heels and even fake rocks.", "A 'dead drop' is a hiding place where one spy leaves a message for another, so they never meet.", "Tiny cameras photographed whole documents onto a dot of film."]);
var evbHrMaps = evbInfo("The map room", "Treasure maps with an X marking the spot are mostly from stories: Robert Louis Stevenson drew one for his stepson and then wrote Treasure Island (1883) around it.");
var evbHrLetters = evbInfo("The room of letters", "Letters sealed with wax could not be opened without breaking the seal. Some people wrote in mirror writing, back to front: Leonardo da Vinci filled his notebooks with it.");
function evbHrClock() { return __ZC(367, 129, this, arguments, new.target); }
var evbHrLibrary = evbInfo("The hidden library", "Some books were banned, and hidden. In the Middle Ages, the monasteries copied and kept old books that might otherwise have been lost for good.");
var evbHrStairs = evbInfo("The stair in the wall", "Grand houses had hidden servants' stairs inside the walls, so the servants could move about without being seen in the main rooms.");
var evbHrAttic = evbInfo("The secret attic", "Old trunks, a rocking horse, a dressmaker's dummy and letters tied with ribbon. Attics are where houses keep their memories.");
var evbHrDiary = evbInfo("The diary room", "Diaries keep secrets for years. Samuel Pepys wrote his in shorthand in the 1660s, describing the Great Fire of London; it was not decoded and published until 1825.");
function evbHrTreasure() { return __ZC(367, 130, this, arguments, new.target); }
"use strict";
evbRooms({
bcflap: { sides: ["evb_packs", "lantern", "evb_packs", "crates"], far: ["evb_packs", "evb_packs"], gap: 3, acts: [[0.35, 0, 2.0, "Base camp", "read", evbCpFlap]] },
bcwalk: { sides: ["evb_packs", "crates", "evb_packs", "barrel"] },
bcdry: { far: ["evb_packs", "crates", "evb_packs", "crates"], sides: ["pelt", "pelt"] },
bcfire: { mid: [["evb_campfire", 0.5, 0]], grid: ["benchin", 2, 2, "-u", 0.3, 0.7], sides: ["evb_packs", "lantern", "evb_canoe", "lantern", "evb_packs"], far: ["crates", "evb_packs", "crates"], rug: false,
acts: [[0.5, 0.22, 2.0, "The camp fire", "sit by it", evbCpFire]] },
bcsleep: { grid: ["evb_sleepbag", 2, 2, "-u", 0.35, 0.65], sides: ["evb_packs", "lantern", "evb_packs"], rug: false, acts: [[0.5, 0, 1.8, "The sleeping bags", "read", evbCpSleep]] },
bccook: { far: ["stove", "crates"], sides: ["barrel", "shelfgoods", "crates", "barrel"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The cook tent", "cook", evbCpCook]] },
bcmaps: { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "lantern", "esglobe", "crates"], acts: [[0.5, 0.3, 1.8, "The maps", "read", evbCpMaps]] },
bcgear: { far: ["evb_packs", "evb_packs"], sides: ["crates", "evb_packs", "crates", "eslockers"], acts: [[0.5, 0, 1.8, "The gear", "read", evbCpGear]] },
bcradio: { far: ["homeradio", "desk"], sides: ["crates", "lantern", "evb_packs"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The radio", "read", evbCpRadio]] },
bcstars: { mid: [["estelescope", 0.5, 0]], sides: ["pelt", "evb_sleepbag", "pelt"], rug: false, acts: [[0.5, 0.3, 1.8, "The night sky", "find the North Star", evbCpStars]] },
bccanoe: { mid: [["evb_canoe", 0.5, 0]], sides: ["evb_packs", "crates", "evb_packs"], acts: [[0.5, 0.35, 1.8, "The canoes", "read", evbCpCanoe]] },
bcknots: { far: ["noticeboard", "noticeboard"], sides: ["crates", "evb_packs", "benchin"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The knot board", "tie a knot", evbCpKnots]] },
bcnature: { mid: [["wd:kf_table", 0.5, 0]], sides: ["displaycase", "plant", "displaycase", "boulder"], acts: [[0.5, 0.3, 1.8, "The nature table", "read", evbCpNature]] },
bcfirst: { far: ["cot", "wgmedshelf"], sides: ["cot", "crates", "wgmedshelf"], acts: [[0.5, 0, 1.8, "First aid", "read", evbCpFirst]] },
bcfish: { sides: ["trnets", "barrel", "trnets", "crates"], mid: [["evb_canoe", 0.5, 0]], acts: [[0.5, 0.35, 1.8, "The fishing rods", "cast a line", evbCpFish]] },
bcjournal: { far: ["bookshelf", "desk"], sides: ["lantern", "mapchest", "lantern", "evb_packs"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The journals", "read", evbCpJournal]] }
});
evbRooms({
svdoor: { sides: ["evb_rainbarrel", "crates", "evb_cans", "barrel"], far: ["evb_cans", "crates"], gap: 3, rug: false, acts: [[0.35, 0, 2.0, "The shack", "read", evbSvDoor]] },
svwalk: { sides: ["crates", "barrel", "evb_cans", "crates"], rug: false },
svroof: { far: ["evb_rainbarrel", "evb_cans", "evb_rainbarrel", "evb_cans"], rug: false },
svhome: { mid: [["wd:kf_table", 0.5, 0], ["evb_campfire", 0.72, 0]], sides: ["evb_hammock", "crates", "shelfgoods", "barrel", "evb_cans"], far: ["shelfgoods", "lantern", "crates"], rug: false,
acts: [[0.5, 0.3, 2.0, "The main room", "read", evbSvHome]] },
svwater: { grid: ["evb_rainbarrel", 2, 2, "-u", 0.35, 0.65], sides: ["barrel", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The rain barrels", "read", evbSvWater]] },
svbench: { far: ["evb_scrapbench"], sides: ["crates", "trtoolwall", "crates", "barrel"], mid: [["evb_scrapbench", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The old radio", "fix it", evbSvBench]] },
svgarden: { grid: ["evb_cans", 2, 3, "-u", 0.3, 0.7], sides: ["evb_rainbarrel", "plant"], rug: false, acts: [[0.5, 0, 1.8, "The garden", "read", evbSvGarden]] },
svhammock: { mid: [["evb_hammock", 0.5, 0]], sides: ["crates", "lantern", "shelfgoods"], rug: false, acts: [[0.5, 0.3, 1.8, "The hammock", "lie in it", evbSvHammock]] },
svlook: { mid: [["estelescope", 0.5, 0]], sides: ["crates", "barrel", "crates"], rug: false, acts: [[0.5, 0.3, 1.8, "The lookout", "watch for sails", evbSvLook]] },
svsmoke: { far: ["trmeathooks", "trmeathooks"], sides: ["barrel", "firebowl", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The smokehouse", "read", evbSvSmoke]] },
svbooks: { far: ["bookshelf", "bookshelf"], sides: ["crates", "lantern", "armchair"], mid: [["crates", 0.5, 0]], acts: [[0.5, 0, 1.8, "The books", "read", evbSvBooks]] },
svhens: { sides: ["cage", "trhay", "cage", "trsacks"], mid: [["trhay", 0.5, 0]], rug: false, acts: [[0.5, 0.3, 1.8, "The hens", "look for eggs", evbSvHens]] },
svtrade: { mid: [["wd:kf_table", 0.5, 0]], sides: ["crates", "shelfgoods", "barrel", "crates"], acts: [[0.5, 0.3, 1.8, "The trading table", "trade", evbSvTrade]] },
svstash: { grid: ["crates", 2, 2, "-u", 0.35, 0.65], sides: ["barrel", "shelfgoods", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The stash", "read", evbSvStash]] },
svcalendar: { mid: [["mineprop", 0.5, 0]], sides: ["crates", "lantern", "barrel"], rug: false, acts: [[0.5, 0.3, 1.8, "The calendar post", "cut a notch", evbSvCalendar]] },
svfire: { grid: ["trlogs", 2, 2, "-u", 0.35, 0.65], sides: ["barrel", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The signal fire", "read", evbSvFire]] }
});
evbRooms({
wrhatch: { sides: ["evb_debris", "evb_airlock", "evb_debris", "crates"], far: ["evb_debris", "evb_alien"], gap: 3.6, rug: false, acts: [[0.35, 0, 2.0, "The crashed ship", "read", evbWrHatch]] },
wrcorridor: { sides: ["evb_debris", "pipes", "evb_alien", "evb_debris"], rug: false },
wrvents: { far: ["pipes", "evb_alien", "pipes", "evb_debris"], rug: false },
wrbridge: { far: ["evb_console", "evb_console"], mid: [["evb_console", 0.6, 0], ["throneseat", 0.45, 0, "+u"]], grid: ["monitor", 2, 2, "-u", 0.25, 0.75], sides: ["evb_console", "evb_debris", "evb_radar", "evb_alien", "evb_console"], rug: false,
acts: [[0.55, 0.25, 2.2, "The bridge", "look", evbWrBridge]] },
wrcryo: { grid: ["evb_cryo", 2, 2, "-u", 0.35, 0.65], sides: ["evb_debris", "pipes", "evb_cryo"], rug: false, acts: [[0.5, 0, 1.8, "The cryo pods", "read", evbWrCryo]] },
wrcargo: { grid: ["crates", 2, 3, "-u", 0.3, 0.7], sides: ["crates", "evb_rover", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The cargo", "read", evbWrCargo]] },
wrengine: { mid: [["evb_core", 0.5, 0]], sides: ["pipes", "boiler", "pipes", "machine"], far: ["machine", "pipes"], rug: false, acts: [[0.5, 0.3, 1.8, "The engine", "read", evbWrEngine]] },
wrcrew: { grid: ["evb_pod", 1, 3, "-u", 0.3, 0.3], sides: ["eslockers", "painting", "eslockers", "evb_guitar"], acts: [[0.6, 0, 1.8, "The crew quarters", "read", evbWrCrew]] },
wrgalley: { far: ["stove", "fridge"], sides: ["counter", "shelfgoods", "counter"], mid: [["longtable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The galley", "eat", evbWrGalley]] },
wrmed: { far: ["wgmedshelf", "hospitalbed"], sides: ["wgvitals", "wgmedshelf", "hospitalbed"], acts: [[0.5, 0, 1.8, "The med bay", "read", evbWrMed]] },
wrgarden: { grid: ["evb_alien", 2, 2, "-u", 0.35, 0.65], sides: ["evb_hydro", "evb_alien", "evb_hydro"], rug: false, acts: [[0.5, 0, 1.8, "The wild garden", "look", evbWrGarden]] },
wrnav: { mid: [["maptable", 0.5, 0]], sides: ["evb_planet", "evb_console", "esglobe"], far: ["evb_console"], acts: [[0.5, 0.3, 1.8, "Navigation", "read", evbWrNav]] },
wrpods: { grid: ["evb_pod", 1, 2, "-u", 0.5, 0.5], sides: ["evb_airlock", "evb_debris", "evb_airlock"], rug: false, acts: [[0.5, 0, 1.8, "The escape pods", "look", evbWrPods]] },
wrlog: { far: ["desk", "bookshelf"], sides: ["evb_pod", "painting", "evb_suit"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The captain's log", "read", evbWrLog]] },
wrdome: { mid: [["estelescope", 0.5, 0]], sides: ["benchin", "evb_planet", "benchin"], rug: false, acts: [[0.5, 0.3, 1.8, "The dome", "look out", evbWrDome]] },
wrbeacon: { mid: [["evb_radar", 0.5, 0]], sides: ["evb_console", "pipes", "machine"], rug: false, acts: [[0.5, 0.3, 1.8, "The beacon", "read", evbWrBeacon]] }
});
evbRooms({
apcheckin: { grid: ["gmwcheckin", 2, 1, "-u", 0.35, 0.65], sides: ["gmwdepboard", "plant", "gmwtrolley", "gmwqueue"], far: ["gmwcheckin", "gmwcheckin"], gap: 3.6,
acts: [[0.35, 0, 2.0, "Check-in", "check your bag", evbApCheck], [0.6, 0.3, 1.6, "The check-in hall", "read", evbApCheckin]] },
apconcourse: { sides: ["gmwdepboard", "plant", "benchin", "plant", "gmwtrolley"], ceil: "lamp" },
apwindows: { far: ["benchin", "plant", "benchin", "plant", "benchin"] },
apgates: { far: ["gmwshuttlenose"], grid: ["wgchairrow", 2, 3, "+u", 0.2, 0.5], mid: [["gmwgatedesk", 0.68, 0]], sides: ["gmwdepboard", "plant", "wgchairrow", "plant", "gmwdepboard"],
acts: [[0.6, 0.2, 2.2, "Your gate", "board", evbApGates]] },
apsecurity: { grid: ["gmwscanarch", 1, 2, "-u", 0.55, 0.55], sides: ["gmwxray", "gmwqueue", "gmwxray"], acts: [[0.4, 0, 1.8, "Security", "go through", evbApSecurity]] },
aplounge: { grid: ["wgchairrow", 2, 2, "-u", 0.35, 0.65], sides: ["gmwdepboard", "plant", "wgvending", "plant"], acts: [[0.5, 0, 1.8, "The board", "read", evbApLounge]] },
apbaggage: { grid: ["gmwcarousel", 1, 2, "-u", 0.5, 0.5], sides: ["gmwtrolley", "gmwtrolley", "noticeboard"], acts: [[0.5, 0, 1.8, "The bags", "read", evbApBaggage]] },
aparrivals: { sides: ["plant", "benchin", "plant", "gmwtrolley"], far: ["gmwdepboard"], mid: [["benchin", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "Arrivals", "read", evbApArrivals]] },
appilots: { mid: [["maptable", 0.5, 0]], sides: ["wgwhiteboard", "eslockers", "monitor", "chair"], acts: [[0.5, 0.3, 1.8, "The briefing", "read", evbApPilots]] },
apcrew: { far: ["eslockers", "eslockers"], sides: ["wallmirror", "sofa", "wgcoffeebar"], acts: [[0.5, 0, 1.8, "The cabin crew", "read", evbApCrew]] },
apshops: { far: ["shelfgoods", "shelfgoods"], sides: ["shelfgoods", "till", "shelfgoods", "bstcase_all"], mid: [["counter", 0.5, 0]], acts: [[0.5, 0, 1.8, "The shops", "read", evbApShops]] },
apcafe: { grid: ["wd:kf_table", 2, 2, "-u", 0.35, 0.65], sides: ["wgcoffeebar", "chair", "plant", "chair"], acts: [[0.5, 0, 1.8, "The café", "have a coffee", evbApCafe]] },
aplost: { far: ["shelfgoods", "shelfgoods"], sides: ["shelfgoods", "counter", "toys", "shelfgoods"], acts: [[0.5, 0, 1.8, "Lost property", "read", evbApLost]] },
apkids: { mid: [["xp_playmat", 0.5, 0], ["toys", 0.5, 0.25]], sides: ["toys", "xp_kidtable", "toys"], acts: [[0.5, -0.25, 1.8, "The play area", "play", evbApKids]] },
apdeck: { far: ["estelescope", "benchin", "estelescope"], sides: ["benchin", "plant", "benchin"], acts: [[0.5, 0, 1.8, "The planes", "read", evbApDeck]] },
apinfo: { mid: [["counter", 0.5, 0]], sides: ["gmwdepboard", "plant", "noticeboard"], acts: [[0.5, 0.3, 1.8, "Information", "read", evbApInfo]] }
});
evbRooms({
rcgate: { sides: ["evb_floss", "banner", "evb_popcorn", "banner"], far: ["evb_loop", "evb_loop"], gap: 3.6, acts: [[0.35, 0, 2.0, "The roller coaster", "read", evbRcGate]] },
rcqueue: { sides: ["gmwqueue", "gmwqueue", "banner", "gmwqueue"], acts: [[0.5, 0, 1.8, "The queue", "wait", evbRcQueue]] },
rcunder: { far: ["evb_loop", "pipes", "evb_loop"], sides: ["crates", "crates"] },
rcstation: { grid: ["evb_coastercar", 1, 3, "-u", 0.55, 0.55], sides: ["gmwqueue", "banner", "eslockers", "banner", "gmwqueue"], far: ["evb_loop", "banner", "evb_loop"], ceil: "lantern",
acts: [[0.32, 0, 2.4, "The train", "ride", evbRcStation]] },
rcbooth: { far: ["monitor", "monitor"], sides: ["wgcontrol", "monitor", "chair"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The controls", "read", evbRcBooth]] },
rcshop: { mid: [["evb_coastercar", 0.5, 0]], sides: ["trtoolwall", "workbench", "trtoolwall", "crates"], acts: [[0.5, 0.35, 1.8, "The workshop", "read", evbRcShop]] },
rcdesign: { grid: ["desk", 2, 2, "-u", 0.35, 0.65], sides: ["wgwhiteboard", "bookshelf", "evb_loop"], acts: [[0.5, 0, 1.8, "The designs", "read", evbRcDesign]] },
rcmodel: { mid: [["evb_loop", 0.5, 0]], sides: ["displaycase", "evb_loop", "displaycase"], acts: [[0.5, 0.3, 1.8, "The model", "roll the ball", evbRcModel]] },
rcphoto: { far: ["painting", "painting", "painting"], sides: ["monitor", "counter", "monitor"], acts: [[0.5, 0, 1.8, "The photo", "see yours", evbRcPhoto]] },
rcgifts: { far: ["shelfgoods", "shelfgoods"], sides: ["shelfgoods", "till", "toys", "shelfgoods"], mid: [["counter", 0.5, 0]], acts: [[0.5, 0, 1.8, "The gift shop", "read", evbRcGifts]] },
rcfloss: { mid: [["evb_floss", 0.5, 0]], sides: ["evb_popcorn", "benchin", "evb_floss"], acts: [[0.5, 0.3, 1.8, "Candy floss", "get some", evbRcFloss]] },
rcarcade: { grid: ["esarcade", 2, 2, "-u", 0.35, 0.65], sides: ["esarcade", "esfoos", "esarcade"], acts: [[0.5, 0, 1.8, "The arcade", "play", evbRcArcade]] },
rchistory: { far: ["painting", "painting", "painting"], sides: ["painting", "displaycase", "painting"], mid: [["evb_loop", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The history", "read", evbRcHistory]] },
rcsafety: { far: ["eslockers", "eslockers"], sides: ["noticeboard", "eslockers", "noticeboard"], acts: [[0.5, 0, 1.8, "Safety", "read", evbRcSafety]] },
rcsplash: { mid: [["cavepool", 0.5, 0]], sides: ["benchin", "banner", "benchin"], rug: false, acts: [[0.5, 0.35, 1.8, "The splash", "stand too close", evbRcSplash]] },
rclost: { far: ["shelfgoods", "shelfgoods"], sides: ["evb_hatstand", "shelfgoods", "evb_hatstand"], acts: [[0.5, 0, 1.8, "Lost hats", "read", evbRcLost]] }
});
evbRooms({
hrcase: { far: ["esbookcase", "esbookcase"], sides: ["esbookcase", "candles", "esbookcase", "candles"], gap: 3, acts: [[0.35, 0, 2.0, "The bookcase", "read", evbHrCase]] },
hrpassage: { sides: ["candles", "wallsconce", "candles", "wallsconce"], rug: false },
hrspy: { far: ["painting", "painting", "painting"], sides: ["wallsconce", "wallsconce"] },
hrtreasure: { mid: [["treasurechest", 0.6, 0], ["goldhoard", 0.45, 0]], grid: ["goldpile", 2, 2, "-u", 0.2, 0.35], sides: ["gemheap", "crownstand", "goldstatue", "treasurechest", "gemheap"], far: ["goldpile", "displaycase", "goldpile"],
acts: [[0.5, 0.25, 2.2, "The treasure", "open the chest", evbHrTreasure]] },
hrcipher: { mid: [["evb_cipher", 0.5, 0]], sides: ["bookshelf", "filecabinet", "wgwhiteboard"], far: ["desk", "evb_cipher"], acts: [[0.5, 0.3, 1.8, "The cipher", "crack it", evbHrCipher]] },
hrmorse: { mid: [["evb_telegraph", 0.5, 0]], sides: ["homeradio", "filecabinet", "desk"], acts: [[0.5, 0.3, 1.8, "The telegraph", "tap a message", evbHrMorse]] },
hrpriest: { mid: [["cot", 0.5, 0]], sides: ["candles", "altarinside", "candles"], acts: [[0.5, 0.3, 1.8, "The priest hole", "read", evbHrPriest]] },
hrsmuggle: { grid: ["barrel", 2, 2, "-u", 0.35, 0.65], sides: ["crates", "lantern", "crates", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The tunnel", "read", evbHrSmuggle]] },
hrkit: { far: ["displaycase", "displaycase"], sides: ["eslockers", "desk", "displaycase", "wgcctv"], acts: [[0.5, 0, 1.8, "The spies' kit", "read", evbHrKit]] },
hrmaps: { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "esglobe", "mapchest", "painting"], acts: [[0.5, 0.3, 1.8, "The treasure map", "read", evbHrMaps]] },
hrletters: { far: ["desk", "bookshelf"], sides: ["filecabinet", "candles", "footchest"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The letters", "read", evbHrLetters]] },
hrclock: { far: ["clock", "clock", "clock"], sides: ["clock", "clock", "clock", "clock"], acts: [[0.5, 0, 1.8, "The clocks", "solve it", evbHrClock]] },
hrlibrary: { far: ["esbookcase", "esbookcase", "esbookcase"], sides: ["esbookcase", "esreading", "esbookcase", "lectern"], acts: [[0.5, 0, 1.8, "The hidden books", "read", evbHrLibrary]] },
hrstairs: { mid: [["spiralstair", 0.5, 0]], sides: ["candles", "wallsconce", "candles"], rug: false, acts: [[0.5, 0.3, 1.8, "The stair", "read", evbHrStairs]] },
hrattic: { sides: ["footchest", "evb_rocking", "dressform", "footchest"], far: ["crates", "wardrobe"], mid: [["footchest", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The attic", "read", evbHrAttic]] },
hrdiary: { mid: [["desk", 0.5, 0]], sides: ["bookshelf", "candles", "armchair", "footchest"], acts: [[0.5, 0.3, 1.8, "The diaries", "read", evbHrDiary]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM, GILT = evbGilt;
var P = {}, CANDY = [0xE8308A, 0x3AC860, 0xF5C518, 0x2AA8E0, 0xF06020, 0x9A3AE0];
P.evb_lollipop = function () {
var g = G();
Cy(g, M(0xF8F4E8), 0.04, 0.04, 1.4, 0, 0.7, 0, 8);
for (var i = 0; i < 4; i++) {
var t = Tor(g, M(CANDY[i]), 0.12 + i * 0.11, 0.06, 0, 1.75, 0, 0);
}
S(g, M(0xF8F4E8), 0.08, 0, 1.75, 0, 8);
return g;
};
P.evb_cane = function () {
var g = G();
for (var i = 0; i < 10; i++)
Cy(g, M(i % 2 ? 0xF8F4F0 : 0xD8203A), 0.09, 0.09, 0.2, 0, 0.1 + i * 0.2, 0, 10);
var h = Tor(g, M(0xD8203A), 0.3, 0.09, 0.3, 2.0, 0, 0);
h.rotation.y = Math.PI / 2;
h.scale.set(1, 1, 1);
B(g, M(0x8A5A2A, "wood"), 0.5, 0.1, 0.5, 0, 0.05, 0);
return g;
};
P.evb_gumdrops = function () {
var g = G();
Cy(g, M(0xA0623A), 0.7, 0.7, 0.12, 0, 0.06, 0, 16);
for (var i = 0; i < 16; i++) {
var a = i * 2.4, r = (i % 4) * 0.15;
var d = Co(g, M(CANDY[i % 6], null, { op: 0.9 }), 0.13, 0.2, Math.cos(a) * r, 0.2 + Math.floor(i / 6) * 0.12, Math.sin(a) * r, 8);
}
return g;
};
P.evb_sweetjars = function () {
var g = G(), wd = M(0xC88A5A, "wood");
B(g, wd, 1.8, 2.0, 0.4, 0, 1.0, -0.05);
for (var r = 0; r < 3; r++) {
B(g, M(0xF6F2EC), 1.8, 0.05, 0.42, 0, 0.35 + r * 0.6, 0.0);
for (var i = 0; i < 4; i++) {
var x = -0.6 + i * 0.4;
Cy(g, M(0xE8F4FF, null, { op: 0.35 }), 0.12, 0.12, 0.4, x, 0.6 + r * 0.6, 0.05, 10);
Cy(g, M(CANDY[(i + r) % 6]), 0.11, 0.11, 0.25, x, 0.53 + r * 0.6, 0.05, 10);
Cy(g, M(0xD8B040), 0.12, 0.12, 0.04, x, 0.82 + r * 0.6, 0.05, 10);
}
}
return g;
};
P.evb_witchoven = function () {
var g = G(), ir = M(0x2A2624);
B(g, M(0x8A6A5A, "stone"), 2.4, 0.5, 1.6, 0, 0.25, 0);
B(g, ir, 2.0, 1.6, 1.4, 0, 1.3, 0);
Cy(g, ir, 0.7, 0.7, 1.4, 0, 2.1, 0, 14).rotation.x = Math.PI / 2;
B(g, M(0x3A2A20), 1.0, 0.9, 0.06, 0, 1.2, 0.71);
B(g, evbGlow(0xFF6A1A, 0.85), 0.8, 0.7, 0.02, 0, 1.2, 0.74);
Cy(g, ir, 0.15, 0.15, 1.2, 0.6, 3.0, -0.3, 8);
Cy(g, M(0xC8962A), 0.04, 0.04, 0.3, 0.4, 1.2, 0.8, 6).rotation.z = Math.PI / 2;
return g;
};
P.evb_gingerhouse = function () {
var g = G();
Cy(g, M(0xF4F0E8), 0.6, 0.4, 0.9, 0, 0.45, 0, 14);
B(g, M(0xA0623A), 0.8, 0.5, 0.7, 0, 1.15, 0);
var r1 = B(g, M(0xF6F2EC), 0.5, 0.04, 0.8, -0.2, 1.5, 0);
r1.rotation.z = 0.7;
var r2 = B(g, M(0xF6F2EC), 0.5, 0.04, 0.8, 0.2, 1.5, 0);
r2.rotation.z = -0.7;
B(g, M(0x5A3A22), 0.15, 0.25, 0.02, 0, 1.02, 0.36);
[-0.25, 0.25].forEach(function (x) { B(g, M(0xFF9FC0), 0.12, 0.12, 0.02, x, 1.2, 0.36); });
for (var i = 0; i < 5; i++)
S(g, M(CANDY[i]), 0.035, -0.3 + i * 0.15, 1.42, 0.36, 6);
return g;
};
P.evb_silvertree = function () {
var g = G(), bk = M(0xE8ECF0);
Cy(g, bk, 0.12, 0.22, 2.0, 0, 1.0, 0, 10);
[[-0.5, 0.4], [0.5, 0.3], [0, -0.5]].forEach(function (p, i) { var b = Cy(g, bk, 0.04, 0.07, 1.0, p[0] * 0.6, 2.1, p[1] * 0.6, 6); b.rotation.z = -p[0] * 0.8; b.rotation.x = p[1] * 0.8; });
for (var i = 0; i < 16; i++) {
var a = i * 2.4, r = 0.4 + (i % 3) * 0.3;
S(g, evbGlow(i % 3 ? 0xD8F0FF : 0xF0F4C8, 0.8), 0.14, Math.cos(a) * r, 2.4 + (i % 4) * 0.25, Math.sin(a) * r, 6);
}
return g;
};
P.evb_moonpool = function () {
var g = G();
Cy(g, M(0xE8E4D8, "marble"), 1.3, 1.4, 0.3, 0, 0.15, 0, 24);
Cy(g, M(0x1A2A4A, null, { op: 0.9 }), 1.15, 1.15, 0.02, 0, 0.31, 0, 24);
S(g, evbGlow(0xE8F0FF, 0.85), 0.25, 0.3, 0.33, -0.2, 12).scale.set(1, 0.05, 1);
for (var i = 0; i < 6; i++) {
var a = i * 1.05;
S(g, M(0xF0F4F8), 0.06, Math.cos(a) * 0.8, 0.34, Math.sin(a) * 0.8, 8).scale.set(1, 0.3, 1);
}
return g;
};
P.evb_elfthrone = function () {
var g = G(), wd = M(0xD8CCB0, "wood"), lf = M(0x6A9A5A);
B(g, M(0xE8E4D8, "marble"), 1.8, 0.3, 1.4, 0, 0.15, 0);
B(g, wd, 1.1, 0.5, 0.8, 0, 0.55, 0);
B(g, M(0x3A5A7A, "damask"), 1.0, 0.08, 0.7, 0, 0.84, 0.02);
for (var i = 0; i < 7; i++) {
var x = -0.5 + i * 0.167, h = 1.6 + Math.sin(i / 6 * Math.PI) * 0.7;
var c = Cy(g, wd, 0.04, 0.06, h, x, 0.6 + h / 2, -0.35, 6);
c.rotation.z = (x) * 0.15;
S(g, lf, 0.12, x * 1.2, 0.6 + h, -0.35, 8);
}
[-0.55, 0.55].forEach(function (x) { B(g, wd, 0.1, 0.4, 0.8, x, 0.95, 0); });
S(g, evbGlow(0xF0F4C8, 0.9), 0.08, 0, 2.75, -0.33, 8);
return g;
};
P.evb_kite = function () {
var g = G();
Cy(g, M(0xD8D8D8), 0.02, 0.02, 1.8, 0, 0.9, 0, 4);
B(g, M(0x6A6A6A), 0.4, 0.05, 0.4, 0, 0.03, 0);
var k = B(g, M(0xE8308A), 0.8, 0.8, 0.02, 0, 2.1, 0);
k.rotation.z = Math.PI / 4;
var k2 = B(g, M(0xF5C518), 0.4, 0.4, 0.025, 0, 2.1, 0.01);
k2.rotation.z = Math.PI / 4;
for (var i = 0; i < 5; i++)
B(g, M(CANDY[i]), 0.15, 0.06, 0.02, 0.05 * Math.sin(i), 1.4 - i * 0.18, 0.02);
return g;
};
P.evb_balloon = function () {
var g = G();
B(g, M(0x8A5A2A, "wood"), 0.8, 0.6, 0.8, 0, 0.3, 0);
[[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].forEach(function (p) { Cy(g, M(0xC8B890), 0.01, 0.01, 1.4, p[0], 1.3, p[1], 4); });
var e = S(g, M(0x2A50B8), 1.0, 0, 2.9, 0, 16);
e.scale.set(1, 1.15, 1);
for (var i = 0; i < 4; i++) {
var s = S(g, M([0xF5C518, 0xE8302A][i % 2]), 1.01, 0, 2.9, 0, 16);
s.scale.set(0.25, 1.16, 1.01);
s.rotation.y = i * Math.PI / 4;
}
Co(g, M(0x2A50B8), 0.5, 0.6, 0, 1.75, 0, 16).rotation.x = Math.PI;
return g;
};
P.evb_chimes = function () {
var g = G(), mt = M(0xC8CCD0, null, { e: 0x101418 });
[-0.5, 0.5].forEach(function (x) { Cy(g, M(0xE8ECF0), 0.04, 0.05, 2.2, x, 1.1, 0, 6); });
B(g, M(0xE8ECF0), 1.2, 0.06, 0.1, 0, 2.2, 0);
for (var i = 0; i < 7; i++) {
var x = -0.4 + i * 0.13, l = 0.4 + (i % 4) * 0.15;
Cy(g, mt, 0.025, 0.025, l, x, 2.0 - l / 2 - 0.1, 0, 8);
}
S(g, M(0x9EC8EE), 0.06, 0, 1.4, 0, 8);
return g;
};
P.evb_sylph = function () {
var g = G(), sk = M(0xE8F4FF, null, { op: 0.6 });
B(g, M(0xE8ECF0, "marble"), 0.7, 0.3, 0.7, 0, 0.15, 0);
var b = Co(g, sk, 0.35, 1.2, 0, 1.0, 0, 12);
S(g, sk, 0.16, 0, 1.75, 0, 10);
[-1, 1].forEach(function (s) { var w = S(g, M(0xF4F8FF, null, { op: 0.45 }), 0.45, s * 0.35, 1.5, -0.1, 10); w.scale.set(0.9, 1.2, 0.08); w.rotation.y = s * 0.4; });
for (var i = 0; i < 5; i++) {
var t = Tor(g, M(0xD8ECFF, null, { op: 0.4 }), 0.25 + i * 0.05, 0.015, 0, 0.45 + i * 0.12, 0, Math.PI / 2);
}
return g;
};
P.evb_geode = function () {
var g = G();
var sh = S(g, M(0x6A5A4A, "stone"), 0.9, 0, 0.8, 0, 12);
sh.scale.set(1, 1, 0.6);
S(g, M(0x4A3A6A), 0.75, 0, 0.8, 0.1, 12).scale.set(1, 1, 0.45);
for (var i = 0; i < 12; i++) {
var a = i * 0.52, r = 0.2 + (i % 3) * 0.15;
var c = Co(g, evbGlow([0xB080F0, 0xD0B0FF, 0x9060E0][i % 3], 0.85), 0.06, 0.25, Math.cos(a) * r, 0.8 + Math.sin(a) * r, 0.32, 5);
c.rotation.x = Math.PI / 2;
}
return g;
};
P.evb_roots = function () {
var g = G(), rt = M(0x5A4430, "wood");
for (var i = 0; i < 5; i++) {
var x = -0.8 + i * 0.4, h = 2.2 + (i % 2) * 0.6;
var c = Cy(g, rt, 0.08 + (i % 3) * 0.04, 0.18, h, x, h / 2, (i % 2) * 0.3 - 0.15, 7);
c.rotation.z = (i - 2) * 0.12;
}
Cy(g, rt, 0.25, 0.4, 1.2, 0, 3.0, 0, 8);
return g;
};
P.evb_gnome = function () {
var g = G();
Cy(g, M(0x5A4A3A), 0.28, 0.3, 0.6, 0, 0.3, 0, 10);
S(g, M(0xE8C8A0), 0.17, 0, 0.8, 0.02, 10);
Co(g, M(0x8A3A2A), 0.18, 0.4, 0, 1.1, 0, 10);
var bd = Co(g, M(0xE8E8E0), 0.14, 0.35, 0, 0.6, 0.14, 8);
bd.rotation.x = Math.PI;
Cy(g, M(0x6A4A2A, "wood"), 0.02, 0.02, 0.6, 0.3, 0.4, 0.1, 6).rotation.z = 0.3;
B(g, M(0x8A8A8A), 0.25, 0.04, 0.04, 0.38, 0.68, 0.1);
Cy(g, M(0x3A3A3A), 0.06, 0.06, 0.12, -0.32, 0.45, 0.1, 8);
S(g, evbGlow(0xFFD070), 0.05, -0.32, 0.45, 0.1, 8);
return g;
};
P.evb_menhir = function () {
var g = G();
var s = B(g, M(0x8A8478, "stone"), 0.9, 2.6, 0.6, 0, 1.3, 0);
s.rotation.z = 0.04;
for (var i = 0; i < 3; i++)
Tor(g, M(0x5A5448, "stone"), 0.12 + i * 0.08, 0.02, 0, 1.7, 0.31, 0);
B(g, M(0x4A6A3A), 1.4, 0.05, 1.1, 0, 0.025, 0);
return g;
};
P.evb_falls = function () {
var g = G(), rk = M(0x6A6A70, "stone");
B(g, rk, 1.8, 2.6, 0.6, 0, 1.3, -0.3);
S(g, rk, 0.5, -0.6, 2.5, -0.1, 8);
S(g, rk, 0.4, 0.6, 2.2, -0.1, 8);
B(g, M(0xD8F0FF, null, { op: 0.6 }), 0.9, 2.3, 0.05, 0, 1.3, 0.03);
B(g, M(0x2A7AA8, null, { op: 0.85 }), 1.8, 0.05, 1.0, 0, 0.15, 0.5);
Cy(g, rk, 0.95, 1.0, 0.25, 0, 0.12, 0.5, 16).scale.set(1, 1, 0.6);
for (var i = 0; i < 6; i++)
S(g, M(0xF0F8FF, null, { op: 0.7 }), 0.07, -0.3 + i * 0.12, 0.22, 0.15, 6);
return g;
};
P.evb_tideclock = function () {
var g = G(), wd = M(0x2A3A5A, "wood");
B(g, wd, 0.9, 2.2, 0.4, 0, 1.1, 0);
Cy(g, M(0xE8ECF0), 0.38, 0.38, 0.04, 0, 1.6, 0.21, 24).rotation.x = Math.PI / 2;
S(g, M(0xF0E8C0), 0.1, 0.18, 1.75, 0.23, 10);
B(g, M(0x1A1A1A), 0.03, 0.3, 0.02, 0, 1.7, 0.24);
var w = Cy(g, M(0x2A7AA8), 0.3, 0.3, 0.02, 0, 0.8, 0.21, 16);
w.rotation.x = Math.PI / 2;
w.scale.set(1, 1, 0.5);
Cy(g, GILT(), 0.06, 0.06, 0.5, 0, 0.4, 0.15, 8);
return g;
};
P.evb_undine = function () {
var g = G(), sk = M(0x9AD8F0, null, { op: 0.65 });
Cy(g, M(0xE8ECF0, "marble"), 0.7, 0.8, 0.5, 0, 0.25, 0, 18);
Cy(g, M(0x2A7AA8, null, { op: 0.85 }), 0.62, 0.62, 0.02, 0, 0.51, 0, 18);
var b = Co(g, sk, 0.3, 1.1, 0, 1.05, 0, 12);
S(g, sk, 0.15, 0, 1.75, 0, 10);
var hr = Co(g, M(0x3AA8C8, null, { op: 0.6 }), 0.2, 0.6, 0, 1.5, -0.1, 8);
hr.rotation.x = Math.PI;
[-1, 1].forEach(function (s) { var a = Cy(g, sk, 0.04, 0.04, 0.6, s * 0.25, 1.5, 0.05, 6); a.rotation.z = s * -0.9; });
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_lollipop", "evb_cane", "evb_gumdrops", "evb_sweetjars", "evb_witchoven", "evb_gingerhouse", "evb_silvertree", "evb_moonpool", "evb_elfthrone", "evb_kite", "evb_balloon", "evb_chimes", "evb_sylph", "evb_geode", "evb_roots", "evb_gnome", "evb_menhir", "evb_falls", "evb_tideclock", "evb_undine"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
evbTheme("candyhouse", { corner: "evb_lollipop", seed: 93, panel: 0xA0623A,
pal: { fab: "blush", fab2: "teal", wood: "cherry", metal: "gold", stone: "rose", art: 7, rug: 4, rugv: 1 },
remap: { "D6D0C6|plaster": [0xC8885A, "plaster"], "D8D0C0|coffer": [0xF6F2EC, "coffer"] },
hello: "🍭 <b>Inside the candy house.</b> Walls of gingerbread, windows of sugar, and sweets on every shelf: the house from the tale of Hansel and Gretel. It is all for you... or is it? Read the whole tale on the ✨ cards. The way out is the gingerbread door." });
evbHouse("candyhouse", { g: EVB_GRID.mid, h: 3.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The candy house"], wall: 0xC8885A, trim: 0xF6F2EC,
plan: [{ hall: { k: "cndoor", n: "The Gingerbread Door" }, spine: { k: "cnwalk", n: "The Peppermint Path" }, gallery: { k: "cnwindows", n: "The Sugar-Glass Windows" },
back: { merge: EVB_BACK, k: "cnparlour", n: "The Sweet Parlour" },
r1i: { k: "cnkitchen", n: "The Candy Kitchen" }, r1o: { k: "cnjars", n: "The Wall of Jars" },
r2i: { k: "cncage", n: "The Cage" }, r2o: { k: "cnoven", n: "The Witch's Oven" },
r3i: { k: "cnforest", n: "The Breadcrumb Trail" }, r3o: { k: "cntreasure", n: "The Witch's Treasure" },
l1i: { k: "cnlolly", n: "The Lollipop Garden" }, l1o: { k: "cnmarzipan", n: "The Marzipan Workshop" },
l2i: { k: "cncakes", n: "The Cake Room" }, l2o: { k: "cnduck", n: "The White Duck's Pond" },
l3i: { k: "cnhistory", n: "The Gingerbread Room" }, l3o: { k: "cnhome", n: "The Woodcutter's Cottage" } }] });
evbTheme("elvenhall", { corner: "evb_silvertree", seed: 95, panel: 0xE8E4D8,
pal: { fab: "teal", fab2: "ivory", wood: "white", metal: "gold", stone: "marble", art: 6, rug: 1, rugv: 0 },
remap: { "D6D0C6|plaster": [0xEAE8E0, "plaster"], "D8D0C0|coffer": [0x2A3A5A, "coffer"] },
hello: "🌙 <b>Inside the elven hall.</b> Moonlight, silver trees and music that never quite stops: the hall of the elf-king from the old ballads. Dance in the ring if you dare; in the stories, a night with the elves can last a hundred years. Look for the ✨ cards. The way out is the moon door." });
evbHouse("elvenhall", { g: EVB_GRID.wide, h: 6.0, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The elven hall"], wall: 0xEAE8E0, trim: 0xC8A860,
plan: [{ hall: { k: "ehdoor", n: "The Moon Door" }, spine: { k: "ehtrees", n: "The Silver Grove" }, gallery: { k: "ehstars", n: "The Starlit Gallery" },
back: { merge: EVB_BACK, k: "ehthrone", n: "The Hall of the Elf-King" },
r1i: { k: "ehring", n: "The Dancing Ring" }, r1o: { k: "ehharp", n: "The Harp Room" },
r2i: { k: "ehforge", n: "The Silver Forge" }, r2o: { k: "ehpool", n: "The Moon Pool" },
r3i: { k: "ehbower", n: "The Bower" }, r3o: { k: "ehlibrary", n: "The Library of Old Songs" },
l1i: { k: "ehbows", n: "The Archers' Hall" }, l1o: { k: "ehweave", n: "The Weavers of Moonlight" },
l2i: { k: "ehfeast", n: "The Feast of the Elf Hill" }, l2o: { k: "ehtime", n: "The Hall of a Hundred Years" },
l3i: { k: "ehhealers", n: "The Healers' Garden" }, l3o: { k: "ehtreasure", n: "The Treasury of the Fair Folk" } }] });
evbTheme("airpalace", { corner: "evb_chimes", seed: 97, panel: 0xE6EEF6,
pal: { fab: "dove", fab2: "teal", wood: "white", metal: "chrome", stone: "marble", art: 6, rug: 3, rugv: 0 },
remap: { "D6D0C6|plaster": [0xEEF4FA, "plaster"], "D8D0C0|coffer": [0x9EC8EE, "coffer"] },
hello: "🌬️ <b>Inside the Palace of Air,</b> home of the sylphs, the spirits of the air: the hall of wings, the aviary, the kites and balloons, the wind chimes, the Aeolian harp. Breathe in. Look for the ✨ cards. The way out is the gate of breezes." });
evbHouse("airpalace", { g: EVB_GRID.mid, h: 5.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The Palace of Air"], wall: 0xEEF4FA, trim: 0x9EC8EE,
plan: [{ hall: { k: "aegate", n: "The Gate of Breezes" }, spine: { k: "aewings", n: "The Hall of Wings" }, gallery: { k: "aechimes", n: "The Chime Gallery" },
back: { merge: EVB_BACK, k: "aesylph", n: "The Throne of the Sylphs" },
r1i: { k: "aebirds", n: "The Aviary" }, r1o: { k: "aekites", n: "The Kite Hall" },
r2i: { k: "aeballoon", n: "The Balloon Room" }, r2o: { k: "aeharp", n: "The Aeolian Harp" },
r3i: { k: "aemills", n: "The Windmill Room" }, r3o: { k: "aeflight", n: "The Flying Machines" },
l1i: { k: "aefeathers", n: "The Feather Library" }, l1o: { k: "aeseeds", n: "The Seeds on the Wind" },
l2i: { k: "aebreath", n: "The Breathing Room" }, l2o: { k: "aesails", n: "The Sail Loft" },
l3i: { k: "aebubbles", n: "The Bubble Room" }, l3o: { k: "aeclouds", n: "The Cloud Spotters' Room" } }] });
evbTheme("earthpalace", { corner: "crystalcluster", seed: 99, panel: 0x6A5A44,
pal: { fab: "emerald", fab2: "terracotta", wood: "walnut", metal: "copper", stone: "granite", art: 4, rug: 6, rugv: 1 },
remap: { "D6D0C6|plaster": [0x7A6A50, "stone"], "D8D0C0|coffer": [0x4E6A34, "coffer"] },
hello: "⛰️ <b>Inside the Palace of Earth,</b> home of the gnomes, the spirits of the earth: crystal caves, the roots of the great trees, the gem vault, the standing stones and the mountain's heart. Look for the ✨ cards. The way out is the root door." });
evbHouse("earthpalace", { g: EVB_GRID.wide, h: 5.2, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The Palace of Earth"], wall: 0x7A6A50, trim: 0x4E6A34,
plan: [{ hall: { k: "gndoor", n: "The Root Door" }, spine: { k: "gnroots", n: "The Hall of Roots" }, gallery: { k: "gnseams", n: "The Seam Walk" },
back: { merge: EVB_BACK, k: "gnthrone", n: "The Throne of the Gnomes" },
r1i: { k: "gncrystal", n: "The Crystal Cave" }, r1o: { k: "gngems", n: "The Gem Vault" },
r2i: { k: "gnstones", n: "The Standing Stones" }, r2o: { k: "gnfossil", n: "The Fossil Wall" },
r3i: { k: "gnmush", n: "The Mushroom Garden" }, r3o: { k: "gnforge", n: "The Deep Forge" },
l1i: { k: "gnseeds", n: "The Seed Vault" }, l1o: { k: "gnworms", n: "The Burrows" },
l2i: { k: "gnquake", n: "The Room of the Moving Plates" }, l2o: { k: "gnclay", n: "The Clay Room" },
l3i: { k: "gnheart", n: "The Mountain's Heart" }, l3o: { k: "gnmaps", n: "The Map of Under-Earth" } }] });
evbTheme("waterpalace", { corner: "dpx_coralpot", seed: 101, panel: 0x5AA8C8,
pal: { fab: "teal", fab2: "navy", wood: "white", metal: "chrome", stone: "marble", art: 6, rug: 3, rugv: 1 },
remap: { "D6D0C6|plaster": [0x9AD0E4, "plaster"], "D8D0C0|coffer": [0x2A6A8A, "coffer"] },
hello: "💧 <b>Inside the Palace of Water,</b> home of the undines, the spirits of water: fountains, a waterfall, the tide clock, the wishing well, the rain room and the river hall. Look for the ✨ cards. The way out is the fountain gate." });
evbHouse("waterpalace", { g: EVB_GRID.mid, h: 5.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The Palace of Water"], wall: 0x9AD0E4, trim: 0xE8F4F8,
plan: [{ hall: { k: "ungate", n: "The Fountain Gate" }, spine: { k: "unfountains", n: "The Hall of Fountains" }, gallery: { k: "unrain", n: "The Rain Gallery" },
back: { merge: EVB_BACK, k: "unthrone", n: "The Throne of the Undines" },
r1i: { k: "unfalls", n: "The Waterfall Room" }, r1o: { k: "untides", n: "The Tide Clock" },
r2i: { k: "unwish", n: "The Wishing Well" }, r2o: { k: "unpearls", n: "The Pearl Treasury" },
r3i: { k: "unbath", n: "The Bathhouse" }, r3o: { k: "unrivers", n: "The River Hall" },
l1i: { k: "unaqueduct", n: "The Aqueduct" }, l1o: { k: "unmusic", n: "The Water Music Room" },
l2i: { k: "unfrogs", n: "The Frog Pond" }, l2o: { k: "unboats", n: "The Boat Hall" },
l3i: { k: "unundine", n: "Undine's Room" }, l3o: { k: "uncycle", n: "The Water Cycle" } }] });
evbFins({
cndoor: ["checker", 0xF8E8F0, 0xC8885A, "plaster", 0xF6F2EC], cnwalk: ["checker", 0xF8F4F0, 0xC8885A, "stripe", 0xD8203A], cnwindows: ["wood", 0xA0623A, 0xFF9FC0, "plaster", 0xF6F2EC],
cnparlour: ["checker", 0xF8D8E8, 0xC8885A, "stripe", 0xF6F2EC, "coffer"], cnkitchen: ["checker", 0xF8F4F0, 0xF0D8C0, "tile", 0xD8203A], cnjars: ["wood", 0xA0623A, 0xF8E8F0, "stripe", 0x3AC860],
cncage: ["wood", 0x6A4A2A, 0x8A6A4A, "wood", 0x3A3A3A], cnoven: ["stone", 0x5A4A3A, 0x6A4A3A, "stone", 0x2A2624], cnforest: ["wood", 0x5A6A3A, 0x3A5A3A, "plaster", 0x8A6A3A],
cntreasure: ["wood", 0x5A3A22, 0x3A2A4A, "damask", 0xD8B040], cnlolly: ["carpet", 0x3AC860, 0xF8F4D8, "stripe", 0xE8308A], cnmarzipan: ["checker", 0xF8F4F0, 0xF0E8D0, "tile", 0x3AC860],
cncakes: ["checker", 0xF8D8E8, 0xF8F0E0, "stripe", 0xE8308A], cnduck: ["stone", 0x8A9A8A, 0xC8E0E8, "plaster", 0xF6F2EC], cnhistory: ["wood", 0xA0623A, 0xF0E0C8, "damask", 0xD8203A],
cnhome: ["wood", 0x7A5A3A, 0xD8C8A8, "wood", 0x5A3A22],
ehdoor: ["marble", 0xE8E4D8, 0xEAE8E0, "marble", 0xC8A860], ehtrees: ["marble", 0xE0DCD0, 0xD8E4E0, "plaster", 0xC8A860], ehstars: ["marble", 0xE0DCD0, 0x1A2A4A, "plaster", 0xE8E0B0],
ehthrone: ["marble", 0xE8E4D8, 0xEAE8E0, "marble", 0xC8A860, "coffer"], ehring: ["carpet", 0x3A6A4A, 0x2A3A5A, "plaster", 0xE8E0B0], ehharp: ["wood", 0xD8CCB0, 0xE8E8F0, "plaster", 0xC8A860],
ehforge: ["stone", 0x8A8A90, 0xC8CCD0, "stone", 0xD8DCE0], ehpool: ["marble", 0xE0DCD0, 0x1A2A4A, "plaster", 0xD8DCE0], ehbower: ["carpet", 0x5A8A5A, 0xE0ECD8, "plaster", 0xC8A860],
ehlibrary: ["wood", 0xD8CCB0, 0x3A5A4A, "wood", 0xC8A860], ehbows: ["wood", 0xD8CCB0, 0xE0E4D8, "plaster", 0x4A6A3A], ehweave: ["wood", 0xD8CCB0, 0xE8ECF4, "damask", 0xC8A860],
ehfeast: ["wood", 0xD8CCB0, 0xEAE8E0, "damask", 0xC8A860], ehtime: ["marble", 0xE0DCD0, 0x2A2A4A, "plaster", 0xE8E0B0], ehhealers: ["stone", 0xB8C0A8, 0xE0ECD8, "plaster", 0x4A8A4A],
ehtreasure: ["marble", 0xE8E4D8, 0x2A3A5A, "damask", 0xD8B040],
aegate: ["marble", 0xF0F4FA, 0xEEF4FA, "marble", 0x9EC8EE], aewings: ["marble", 0xF0F4FA, 0xE6EEF6, "plaster", 0x9EC8EE, "coffer"], aechimes: ["marble", 0xF0F4FA, 0xEEF4FA, "plaster", 0xC8CCD0],
aesylph: ["marble", 0xF4F8FF, 0xD8ECFF, "marble", 0xD8B040, "coffer"], aebirds: ["wood", 0xE8E4D8, 0xD8ECD8, "plaster", 0x3A8A5A], aekites: ["marble", 0xF0F4FA, 0xBFE0FA, "plaster", 0xE8308A],
aeballoon: ["wood", 0xD8CCB0, 0xBFE0FA, "plaster", 0xF5C518], aeharp: ["marble", 0xF0F4FA, 0xEEF4FA, "plaster", 0xD8B040], aemills: ["wood", 0xC8B890, 0xE8ECF0, "plaster", 0x8A6A4A],
aeflight: ["wood", 0xC8B890, 0xE8E4D8, "plaster", 0x2A4A7A], aefeathers: ["wood", 0xD8CCB0, 0xF4F0E8, "plaster", 0x9EC8EE], aeseeds: ["carpet", 0x8AB86A, 0xF0F4E8, "plaster", 0x9EC8EE],
aebreath: ["carpet", 0xD8ECFF, 0xF4F8FF, "plaster", 0x9EC8EE], aesails: ["wood", 0xC8B890, 0xF4F4F0, "plaster", 0x2A4A7A], aebubbles: ["marble", 0xF0F4FA, 0xE8E0FF, "plaster", 0x9EC8EE],
aeclouds: ["marble", 0xF0F4FA, 0x9EC8EE, "plaster", 0xF4F8FF],
gndoor: ["stone", 0x5A4A38, 0x7A6A50, "stone", 0x4E6A34], gnroots: ["stone", 0x5A4A38, 0x6A5A44, "stone", 0x4E6A34], gnseams: ["stone", 0x4A3E30, 0x5A4A38, "stone", 0xD8B040],
gnthrone: ["stone", 0x5A4A38, 0x6A5A44, "stone", 0xD8B040, "coffer"], gncrystal: ["stone", 0x3A3440, 0x4A4060, "stone", 0xB080F0], gngems: ["stone", 0x3A3428, 0x2A3A2A, "stone", 0xD8B040],
gnstones: ["stone", 0x6A7A50, 0x8A9A70, "stone", 0x5A5448], gnfossil: ["stone", 0x8A7A60, 0xB8A880, "stone", 0x6A5A44], gnmush: ["stone", 0x4A3E30, 0x3A4A30, "stone", 0xE8C8A0],
gnforge: ["stone", 0x3A3028, 0x4A3A30, "stone", 0xFF7A1A], gnseeds: ["wood", 0x7A5A3A, 0xB8A880, "wood", 0x4E6A34], gnworms: ["stone", 0x6A5040, 0x7A6050, "stone", 0x4E6A34],
gnquake: ["stone", 0x6A5A44, 0x8A7A60, "stone", 0xC0302A], gnclay: ["stone", 0x9A6A4A, 0xB8805A, "stone", 0x6A4A2A], gnheart: ["stone", 0x3A3028, 0x2A1A14, "stone", 0xFFB84A, "coffer"],
gnmaps: ["wood", 0x7A5A3A, 0xD8C8A0, "plaster", 0x4E6A34],
ungate: ["marble", 0xD8ECF4, 0x9AD0E4, "marble", 0xE8F4F8], unfountains: ["marble", 0xD8ECF4, 0x9AD0E4, "tile", 0xE8F4F8, "coffer"], unrain: ["tile", 0x8AB8D0, 0x7AA8C8, "tile", 0xE8F4F8],
unthrone: ["marble", 0xE0F0F8, 0x5AA8C8, "marble", 0xD8B040, "coffer"], unfalls: ["stone", 0x6A7A80, 0x8AB8D0, "stone", 0xE8F4F8], untides: ["wood", 0xD8CCB0, 0x2A4A6A, "plaster", 0xE8F4F8],
unwish: ["stone", 0x8A8A88, 0xB8D0D8, "stone", 0x2A6A8A], unpearls: ["marble", 0xE8F0F4, 0x2A3A5A, "damask", 0xE8E4F0], unbath: ["tile", 0x5AA8C8, 0xE8F4F8, "tile", 0x2A6A8A],
unrivers: ["stone", 0x7A8A70, 0xA8C8D0, "plaster", 0x3A8A5A], unaqueduct: ["stone", 0xB8B0A0, 0xD8D0C0, "stone", 0x2A6A8A], unmusic: ["wood", 0xD8CCB0, 0xD8ECF4, "damask", 0xD8B040],
unfrogs: ["stone", 0x6A8A5A, 0xB8D8C0, "plaster", 0x3A8A3A], unboats: ["wood", 0x8A6A4A, 0xC8DCE8, "wood", 0x2A4A7A], unundine: ["marble", 0xE0F0F8, 0xB8E0F0, "plaster", 0xE8E4F0],
uncycle: ["tile", 0xD8ECF4, 0xE8F4F8, "plaster", 0x2A6A8A]
});
EVB_LD.candyhouse = { theme: "candyhouse", name: "The Candy House", doors: "the gingerbread door" };
EVB_LD.elvenhall = { theme: "elvenhall", name: "The Elven Hall", doors: "the moon door" };
EVB_LD.airpalace = { theme: "airpalace", name: "The Palace of Air", doors: "the gate of breezes" };
EVB_LD.earthpalace = { theme: "earthpalace", name: "The Palace of Earth", doors: "the root door" };
EVB_LD.waterpalace = { theme: "waterpalace", name: "The Palace of Water", doors: "the fountain gate" };
"use strict";
var evbCnDoor = evbInfo("The candy house", "Hansel and Gretel was written down by the Brothers Grimm and printed in 1812. Deep in the forest, two lost children come upon a little house built of bread, roofed with cake, with windows of clear sugar. It is not what it seems. The rooms here tell the whole tale.");
function evbCnHome() { return __ZC(367, 131, this, arguments, new.target); }
function evbCnForest() { return __ZC(367, 132, this, arguments, new.target); }
function evbCnWindows() { return __ZC(367, 133, this, arguments, new.target); }
function evbCnParlour() { return __ZC(367, 134, this, arguments, new.target); }
function evbCnCage() { return __ZC(367, 135, this, arguments, new.target); }
function evbCnOven() { return __ZC(367, 136, this, arguments, new.target); }
function evbCnTreasure() { return __ZC(367, 137, this, arguments, new.target); }
function evbCnDuck() { return __ZC(367, 138, this, arguments, new.target); }
function evbCnKitchen() { return __ZC(367, 139, this, arguments, new.target); }
var evbCnJars = evbFact("The wall of jars", ["Before sweets came wrapped, they were weighed out from tall glass jars into paper bags.", "Rock is sugar pulled and folded; the letters run all the way through, set in by hand while it is hot.", "A story says candy canes were bent into a shepherd's crook by a choirmaster in Cologne, to keep children quiet in church, though nobody really knows."]);
var evbCnLolly = evbInfo("The lollipop garden", "People have put sweets on sticks for a long time, but the lollipop as we know it took off in America in the early 1900s, when machines learned to make them and push the sticks in.");
var evbCnMarzipan = evbInfo("The marzipan workshop", "Marzipan is almonds ground with sugar into a paste, shaped and coloured into fruits, animals and little pigs for luck. The towns of Lübeck in Germany and Toledo in Spain both say they make the best.");
function evbCnCakes() { evbTune([523, 659, 784], 200, 0.6); evbSay("🎂 Cakes with roofs of icing and windows of boiled sugar: gingerbread houses became a Christmas custom in Germany after the Grimms printed this tale."); }
var evbCnHistory = evbInfo("The gingerbread room", "Nuremberg in Germany has baked Lebkuchen, its spiced honey gingerbread, since the Middle Ages, and its gingerbread bakers had their own guild by 1643. The spices came from far away, so gingerbread was a treat for feast days.");
var evbEhDoor = evbInfo("The elven hall", "In the old stories of Scandinavia, Scotland and Ireland, elves and the 'Fair Folk' were not small and sweet but tall, beautiful and dangerous, living inside hills. People spoke of them politely, and never called them by name.");
function evbEhThrone() { return __ZC(367, 140, this, arguments, new.target); }
function evbEhRing() { return __ZC(367, 141, this, arguments, new.target); }
function evbEhHarp() { evbTune([523, 659, 784, 1047, 784, 659], 300, 1.8); evbSay("🎶 The harp plays by itself. In the Scottish ballad, Thomas the Rhymer was carried off by the Queen of Elfland and served her seven years, and came back with a tongue that could not tell a lie."); }
var evbEhForge = evbInfo("The silver forge", "In the old Norse poem of Völund, the smith Völund (in English, Wayland) is called a 'prince of the elves'. Captured by a cruel king and lamed, he forged wonders in his prison, took a terrible revenge, and flew away on wings he had made.");
function evbEhPool() { evbTune([659, 784, 988], 500, 1.4); evbSay("🌕 You look into the moon pool and see your own face, and behind it, the moon, though there is no moon in the sky above."); }
var evbEhBower = evbInfo("The bower", "Never eat or drink in the hall of the elves, the old tales say: whoever tastes their food can never go home again. Iron keeps them away, and so does turning your coat inside out.");
var evbEhLibrary = evbInfo("The Library of Old Songs", "In Goethe's poem 'The Erl-King' (1782), a father rides through the night with his son in his arms. The child cries that the Erl-King is calling him with sweet promises; the father says it is only mist and the wind in the leaves. When they reach home, the child in his arms is dead. Schubert set it to music in 1815, with the piano galloping like the horse.");
function evbEhBows() { evbTune([784, 523], 200, 0.5); evbSay("🏹 Thwip. In old Britain and Scandinavia, the flint arrowheads people turned up in their fields were called 'elf-shot', and were blamed for sudden illness in cattle and people."); }
var evbEhWeave = evbInfo("The weavers of moonlight", "The elf-maidens of Danish and Swedish folklore danced in the mist on the meadows at night, beautiful from the front; but from behind, the stories said, they were hollow, like a tree trunk.");
function evbEhFeast() { evbTune([392, 440, 494, 523, 587], 250, 1.2); evbSay("🍷 The table is laid for the feast of the Elf Hill, lit by will-o'-the-wisps. If you are a guest in an elf hill, the old stories say, smile, bow, and eat nothing."); }
function evbEhTime() { return __ZC(367, 142, this, arguments, new.target); }
var evbEhHealers = evbFact("The healers' garden", ["Elder trees were believed to be protected by spirits: in some places you asked permission before you cut one.", "Foxglove leaves gave the heart medicine digitalis, first described by William Withering in 1785: deadly in the wrong dose.", "Yarrow was carried by soldiers to staunch wounds."]);
var evbEhTreasure = evbInfo("The treasury of the Fair Folk", "Fairy gold, the stories warn, turns to dry leaves in the morning. In Iceland, many people still say there may be elves, and roads have been rerouted around rocks said to be their homes.");
var evbAeGate = evbInfo("The Palace of Air", "The Swiss doctor Paracelsus (1493 to 1541) wrote that each of the four elements has its own spirits: sylphs in the air, gnomes in the earth, undines in the water and salamanders in fire. The idea gave the world sylphs and undines, who turn up in poems, ballets and stories ever since.");
function evbAeSylph() { return __ZC(367, 143, this, arguments, new.target); }
var evbAeWings = evbInfo("The Hall of Wings", "The Arctic tern flies from the Arctic to the Antarctic and back every year, the longest journey of any animal, tens of thousands of kilometres. Common swifts can stay in the air for ten months without landing, eating and even sleeping on the wing.");
function evbAeBirds() { evbTune([1319, 1175, 1568, 1319], 120, 0.8); evbSay("🐦 The aviary chirps and flutters. Birds' bones are hollow, with struts inside like a bridge, light and strong for flying."); }
function evbAeKites() { return __ZC(367, 144, this, arguments, new.target); }
function evbAeBalloon() { return __ZC(367, 145, this, arguments, new.target); }
function evbAeHarp() { evbTune([392, 523, 659, 784, 659, 523], 600, 2.6); evbSay("🎐 The Aeolian harp sits in an open window and plays by itself when the wind blows across its strings. It is named after Aeolus, the keeper of the winds in Greek myth."); }
var evbAeMills = evbInfo("The windmill room", "Windmills were built in Persia more than a thousand years ago to grind grain and pump water. The Dutch used thousands of them to pump the sea off their low land. Today's great white wind turbines make electricity.");
var evbAeFlight = evbInfo("The flying machines", "Gliders, the Wright brothers' Flyer, propellers and jet engines: wings fly because the air flows faster over the curved top than underneath, and the wing is tilted to push the air down, so the air pushes it up.");
var evbAeFeathers = evbFact("The Feather Library", ["A swan has about 25,000 feathers.", "Owls' soft-edged feathers let them fly almost silently.", "Quill pens were cut from goose feathers for more than a thousand years."]);
var evbAeSeeds = evbInfo("Seeds on the wind", "The dandelion's seeds sail on little parachutes; the sycamore's spin down like helicopters. Some seeds have travelled hundreds of kilometres on the wind.");
function evbAeBreath() { evbTune([262, 330, 392, 330, 262], 1000, 4); evbSay("🫁 Breathe in for four... hold for four... out for four. Slow breathing really does calm the heart."); }
var evbAeSails = evbInfo("The sail loft", "Polynesian navigators sailed across thousands of kilometres of open Pacific in double canoes, reading the winds, the swell, the stars and the birds, and found nearly every island in it.");
function evbAeBubbles() { evbTune([1047, 1319, 1568], 150, 0.6); evbSay("🫧 You blow a bubble. Its colours swirl because its skin is only a few millionths of a metre thick, and light reflects from both sides of it."); }
var evbAeClouds = evbInfo("The cloud spotters' room", "In 1802 an English chemist, Luke Howard, gave the clouds their names: cumulus (heaps), stratus (layers), cirrus (curls of hair) and nimbus (rain). A big fluffy cumulus cloud can weigh as much as a hundred elephants.");
var evbGnDoor = evbInfo("The Palace of Earth", "Gnomes, in Paracelsus's old scheme, were the spirits of the earth, who could move through rock as fish swim through water. In later stories they became small bearded miners, guardians of buried treasure.");
function evbGnThrone() { return __ZC(367, 146, this, arguments, new.target); }
var evbGnRoots = evbInfo("The Hall of Roots", "Tree roots usually spread wider than the tree is tall, and most are near the surface. Many trees are joined underground by threads of fungus, sharing water and food with each other.");
function evbGnCrystal() { return __ZC(367, 147, this, arguments, new.target); }
var evbGnGems = evbFact("The gem vault", ["Rubies and sapphires are the same mineral, corundum: red ones are rubies, every other colour is sapphire.", "Emeralds and aquamarines are both beryl.", "Diamond is the hardest natural thing: only a diamond can scratch a diamond."]);
var evbGnStones = evbInfo("The standing stones", "At Stonehenge in England, the great sarsen stones were raised about 4,500 years ago, lined up with the sunrise at midsummer and the sunset at midwinter. At Carnac in France, more than three thousand standing stones march in rows across the fields.");
var evbGnFossil = evbInfo("The fossil wall", "Rock lies in layers like the pages of a book: the deeper you go, the older the page. In the Grand Canyon, the river has cut down through nearly two billion years of them.");
var evbGnMush = evbInfo("The mushroom garden", "A mushroom is only the fruit of a fungus; most of it is threads hidden in the soil. One honey fungus in Oregon spreads under about nine square kilometres of forest and may be thousands of years old, one of the largest living things on Earth.");
var evbGnForge = evbInfo("The deep forge", "Deep under your feet, Earth's centre is a ball of iron and nickel as hot as the surface of the Sun, around 5,000 °C or more. Its heat keeps the rock above it slowly churning.");
var evbGnSeeds = evbInfo("The seed vault", "Seeds can sleep a very long time. In 2005 a date palm was grown from a seed about two thousand years old, found in the ruins of the fortress of Masada; it was named Methuselah.");
function evbGnWorms() { evbTune([262, 294], 300, 0.6); evbSay("🪱 The burrows wriggle with earthworms. Charles Darwin's last book, in 1881, was about worms: he worked out that they slowly bury old stones and ruins, and keep the soil alive."); }
var evbGnQuake = evbInfo("The room of the moving plates", "The ground under you is moving. Earth's crust is broken into great plates that drift a few centimetres a year, about as fast as your fingernails grow. About 300 million years ago all the continents were joined in one, Pangaea.");
var evbGnClay = evbInfo("The clay room", "Clay is rock ground fine by water and time. People have made bricks of it for nearly ten thousand years: the oldest were dried in the sun, later ones fired hard in kilns.");
function evbGnHeart() { evbTune([98, 110, 131, 110, 98], 800, 2.6); evbSay("⛰️ You put your hand on the mountain's heart and feel it hum. Mount Everest is still rising, a few millimetres a year, as India pushes into Asia."); }
var evbGnMaps = evbInfo("The map of Under-Earth", "The deepest hole ever dug, the Kola Superdeep Borehole in Russia, went down about 12 kilometres. That is less than a five-hundredth of the way to Earth's centre.");
var evbUnGate = evbInfo("The Palace of Water", "Undines are water spirits, named by Paracelsus. Water covers about seven tenths of Earth's surface, and almost all of it, about 97 parts in a hundred, is salt sea.");
function evbUnThrone() { return __ZC(367, 148, this, arguments, new.target); }
var evbUnFountains = evbInfo("The Hall of Fountains", "Before pumps, fountains ran only by gravity: the water came from somewhere higher, by pipe or aqueduct. In Rome, about three thousand euros in coins are tossed into the Trevi Fountain every day, and the money goes to feed people in need.");
function evbUnFalls() { evbTune([523, 494, 440, 392, 349, 330], 200, 1.4); evbSay("🌊 The waterfall roars into its pool. The highest in the world, Angel Falls in Venezuela, drops 979 metres, so far that much of it turns to mist before it lands."); }
function evbUnTides() { evbTune([262, 330, 392, 330], 600, 1.6); evbSay("🌕 The tide clock turns with the moon. The moon's pull lifts the oceans in a bulge, so most coasts get two high tides a day. In the Bay of Fundy in Canada, the tide rises and falls about sixteen metres."); }
function evbUnWell() { return __ZC(367, 149, this, arguments, new.target); }
var evbUnPearls = evbInfo("The Pearl Treasury", "A pearl begins when something gets inside an oyster's shell. The oyster coats it, layer on layer, with the same shining stuff that lines its shell, mother-of-pearl, over several years.");
var evbUnBath = evbInfo("The bathhouse", "The Romans built great public baths with hot rooms, warm rooms and cold plunge pools. At Bath in England, the hot spring the Romans used still flows, more than a million litres a day.");
var evbUnRivers = evbInfo("The River Hall", "The Nile and the Amazon argue over which is longer, but the Amazon carries far more water than any other river: about a fifth of all the river water that flows into the world's seas.");
var evbUnAqueduct = evbInfo("The aqueduct", "The Romans carried water for miles to their cities along aqueducts, sloping very gently all the way. The Pont du Gard in France, three tiers of stone arches, was built in the first century and still stands.");
function evbUnMusic() { evbTune([392, 523, 659, 784, 659, 523, 392], 300, 2.2); evbSay("🎻 Handel's Water Music was first played in 1717 on a barge on the River Thames, for King George I, who liked it so much he had it played three times."); }
function evbUnFrogs() { evbTune([196, 220, 196], 250, 0.6); evbSay("🐸 Ribbit. Frogs drink through their skin, not their mouths, and a tadpole turns into a frog, losing its tail, in a few weeks."); }
var evbUnBoats = evbInfo("The Boat Hall", "The oldest boat ever found is a dugout canoe from Pesse in the Netherlands, cut from a single pine log about 10,000 years ago.");
function evbUnUndine() { return __ZC(367, 150, this, arguments, new.target); }
var evbUnCycle = evbFact("The water cycle", ["The sun lifts water from the sea as vapour; it cools into clouds and falls as rain.", "Raindrops are not tear-shaped: small ones are round, and bigger ones flatten like burger buns as they fall.", "A drop of water may spend thousands of years in the deep ocean, or a few days in the air."]);
"use strict";
evbRooms({
cndoor: { sides: ["evb_cane", "evb_lollipop", "evb_cane", "evb_gumdrops"], far: ["evb_lollipop", "evb_lollipop"], gap: 3, acts: [[0.35, 0, 2.0, "The candy house", "read", evbCnDoor]] },
cnwalk: { sides: ["evb_cane", "evb_gumdrops", "evb_cane", "evb_lollipop"] },
cnwindows: { far: ["evb_cane", "evb_sweetjars", "evb_cane", "evb_sweetjars"], sides: ["evb_gumdrops", "evb_lollipop"], acts: [[0.5, 0, 1.8, "The sugar windows", "nibble", evbCnWindows]] },
cnparlour: { mid: [["longtable", 0.55, 0], ["evb_gingerhouse", 0.55, 0.3]], grid: ["evb_gumdrops", 2, 2, "-u", 0.25, 0.8], sides: ["evb_sweetjars", "evb_cane", "evb_cake", "evb_lollipop", "evb_sweetjars"], far: ["evb_cake", "fireplace", "evb_cake"], ceil: "chandelier",
acts: [[0.4, -0.25, 2.2, "The sweet parlour", "sit down", evbCnParlour]] },
cnkitchen: { far: ["stove", "oven"], sides: ["counter", "evb_sweetjars", "counter", "shelfgoods"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The candy kitchen", "make sweets", evbCnKitchen]] },
cnjars: { far: ["evb_sweetjars", "evb_sweetjars", "evb_sweetjars"], sides: ["evb_sweetjars", "counter", "evb_sweetjars"], acts: [[0.5, 0, 1.8, "The jars", "read", evbCnJars]] },
cncage: { mid: [["cage", 0.55, 0], ["cellbars", 0.7, 0]], sides: ["trhay", "barrel", "trhay"], rug: false, acts: [[0.4, 0, 1.8, "The cage", "read on", evbCnCage]] },
cnoven: { mid: [["evb_witchoven", 0.6, 0]], sides: ["trlogs", "barrel", "trlogs"], rug: false, acts: [[0.4, 0, 1.8, "The oven", "read on", evbCnOven]] },
cnforest: { grid: ["evb_roots", 2, 2, "-u", 0.3, 0.7], sides: ["plant", "boulder", "plant"], rug: false, acts: [[0.5, 0, 1.8, "The trail", "read on", evbCnForest]] },
cntreasure: { grid: ["treasurechest", 1, 2, "-u", 0.5, 0.5], sides: ["gemheap", "goldpile", "gemheap"], far: ["treasurechest"], acts: [[0.5, 0, 1.8, "The treasure", "read on", evbCnTreasure]] },
cnlolly: { grid: ["evb_lollipop", 3, 3], sides: ["evb_cane", "evb_gumdrops", "evb_cane"], acts: [[0.5, 0, 1.8, "The lollipops", "read", evbCnLolly]] },
cnmarzipan: { mid: [["longtable", 0.5, 0]], sides: ["evb_sweetjars", "workbench", "evb_sweetjars"], far: ["evb_cake", "evb_gumdrops"], acts: [[0.5, 0.3, 1.8, "The marzipan", "read", evbCnMarzipan]] },
cncakes: { grid: ["evb_cake", 2, 2, "-u", 0.35, 0.65], sides: ["evb_gingerhouse", "evb_lollipop", "evb_gingerhouse"], acts: [[0.5, 0, 1.8, "The cakes", "look", evbCnCakes]] },
cnduck: { mid: [["cavepool", 0.5, 0]], sides: ["plant", "boulder", "plant"], rug: false, acts: [[0.5, 0.35, 1.8, "The white duck", "read on", evbCnDuck]] },
cnhistory: { far: ["painting", "evb_gingerhouse", "painting"], sides: ["displaycase", "evb_sweetjars", "displaycase"], acts: [[0.5, 0, 1.8, "Gingerbread", "read", evbCnHistory]] },
cnhome: { far: ["fireplace", "bed"], sides: ["trlogs", "wd:kf_table", "trsaw", "chair"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The woodcutter's cottage", "begin the tale", evbCnHome]] }
});
evbRooms({
ehdoor: { sides: ["evb_silvertree", "candles", "evb_silvertree", "evb_harp"], far: ["evb_silvertree", "evb_silvertree"], gap: 3.6, acts: [[0.35, 0, 2.0, "The elven hall", "read", evbEhDoor]] },
ehtrees: { grid: ["evb_silvertree", 2, 2, "-u", 0.3, 0.7], sides: ["evb_silvertree", "candles", "evb_silvertree"] },
ehstars: { far: ["evb_silvertree", "esbust", "evb_silvertree", "esbust"], sides: ["benchin", "benchin"] },
ehthrone: { mid: [["evb_elfthrone", 0.8, 0], ["redrunner", 0.45, 0, "+u"], ["evb_moonpool", 0.5, 0]], grid: ["evb_silvertree", 2, 4, "-u", 0.15, 0.35], sides: ["evb_silvertree", "evb_harp", "evb_silvertree", "candles", "evb_silvertree"], far: ["evb_silvertree", "hallbanner", "evb_silvertree"], ceil: "chandelier",
acts: [[0.65, 0, 2.4, "The Elf-King", "bow", evbEhThrone]] },
ehring: { mid: [["evb_rangoli", 0.5, 0]], grid: ["evb_toadstool", 3, 3, "-u", 0.25, 0.75], sides: ["evb_silvertree", "evb_harp"], rug: false, acts: [[0.5, 0, 1.8, "The ring", "dance", evbEhRing]] },
ehharp: { mid: [["evb_harp", 0.5, 0]], sides: ["evb_silvertree", "chair", "evb_harp", "chair"], acts: [[0.5, 0.3, 1.8, "The harp", "listen", evbEhHarp]] },
ehforge: { mid: [["anvil", 0.5, 0]], far: ["forge"], sides: ["weaponrack", "armourstand", "weaponrack"], acts: [[0.5, 0.25, 1.8, "The silver forge", "read", evbEhForge]] },
ehpool: { mid: [["evb_moonpool", 0.5, 0]], sides: ["evb_silvertree", "candles", "evb_silvertree"], rug: false, acts: [[0.5, 0.38, 1.8, "The moon pool", "look in", evbEhPool]] },
ehbower: { far: ["fourposter"], sides: ["evb_silvertree", "plant", "wardrobe", "evb_silvertree"], acts: [[0.5, 0, 1.8, "The bower", "read", evbEhBower]] },
ehlibrary: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "lectern", "bookshelf", "evb_harp"], acts: [[0.5, 0, 1.8, "The old songs", "read", evbEhLibrary]] },
ehbows: { far: ["weaponrack", "evb_bows"], sides: ["evb_bows", "armourstand", "evb_bows"], acts: [[0.5, 0, 1.8, "The bows", "loose an arrow", evbEhBows]] },
ehweave: { grid: ["loom", 1, 2, "-u", 0.5, 0.5], sides: ["dressform", "evb_silvertree", "dressform"], acts: [[0.5, 0, 1.8, "The weavers", "read", evbEhWeave]] },
ehfeast: { mid: [["feasttable", 0.5, 0]], sides: ["chair", "candles", "chair", "evb_silvertree"], far: ["evb_harp", "candles"], acts: [[0.5, 0.32, 1.8, "The feast", "read", evbEhFeast]] },
ehtime: { far: ["clock", "clock", "clock"], sides: ["clock", "evb_silvertree", "clock"], acts: [[0.5, 0, 1.8, "The hundred years", "read", evbEhTime]] },
ehhealers: { grid: ["plant", 2, 2, "-u", 0.35, 0.65], sides: ["herbrack", "evb_silvertree", "herbrack"], acts: [[0.5, 0, 1.8, "The healers' garden", "read", evbEhHealers]] },
ehtreasure: { grid: ["goldpile", 1, 2, "-u", 0.5, 0.5], sides: ["treasurechest", "gemheap", "crownstand"], acts: [[0.5, 0, 1.8, "Fairy gold", "read", evbEhTreasure]] }
});
evbRooms({
aegate: { sides: ["evb_chimes", "evb_kite", "evb_chimes", "plant"], far: ["evb_chimes", "evb_chimes"], gap: 3, acts: [[0.35, 0, 2.0, "The Palace of Air", "read", evbAeGate]] },
aewings: { grid: ["cage", 2, 2, "-u", 0.3, 0.7], sides: ["evb_kite", "evb_chimes", "evb_kite"], ceil: "evb_cloud", acts: [[0.5, 0, 1.8, "The Hall of Wings", "read", evbAeWings]] },
aechimes: { far: ["evb_chimes", "evb_chimes", "evb_chimes", "evb_chimes"] },
aesylph: { mid: [["evb_sylph", 0.78, 0], ["redrunner", 0.45, 0, "+u"]], grid: ["evb_chimes", 2, 3, "-u", 0.2, 0.4], sides: ["evb_kite", "evb_chimes", "evb_balloon", "evb_chimes", "evb_kite"], ceil: "evb_cloud",
acts: [[0.6, 0, 2.4, "The sylph", "feel the breeze", evbAeSylph]] },
aebirds: { grid: ["cage", 2, 2, "-u", 0.35, 0.65], sides: ["plant", "cage", "plant"], acts: [[0.5, 0, 1.8, "The aviary", "listen", evbAeBirds]] },
aekites: { grid: ["evb_kite", 2, 3], sides: ["evb_kite", "workbench"], acts: [[0.5, 0, 1.8, "The kites", "read", evbAeKites]] },
aeballoon: { mid: [["evb_balloon", 0.5, 0]], sides: ["evb_kite", "crates", "evb_kite"], acts: [[0.5, 0.35, 1.8, "The balloon", "go up", evbAeBalloon]] },
aeharp: { mid: [["evb_harp", 0.5, 0]], sides: ["evb_chimes", "plant", "evb_chimes"], acts: [[0.5, 0.3, 1.8, "The Aeolian harp", "listen", evbAeHarp]] },
aemills: { far: ["trmillstone", "trsacks"], sides: ["evb_chimes", "trsacks", "evb_chimes"], mid: [["trmillstone", 0.5, 0]], acts: [[0.5, 0.3, 1.8, "The windmills", "read", evbAeMills]] },
aeflight: { mid: [["evb_kite", 0.5, 0]], far: ["displaycase", "displaycase"], sides: ["evb_balloon", "displaycase", "evb_kite"], acts: [[0.5, 0.3, 1.8, "The flying machines", "read", evbAeFlight]] },
aefeathers: { far: ["bookshelf", "bookshelf"], sides: ["bookshelf", "displaycase", "bookshelf"], mid: [["lectern", 0.5, 0]], acts: [[0.5, 0, 1.8, "The feathers", "read", evbAeFeathers]] },
aeseeds: { grid: ["plant", 2, 3], sides: ["evb_chimes", "plant"], acts: [[0.5, 0, 1.8, "The seeds", "read", evbAeSeeds]] },
aebreath: { grid: ["pelt", 2, 2, "-u", 0.35, 0.65], sides: ["plant", "evb_chimes", "plant"], acts: [[0.5, 0, 1.8, "Breathe", "breathe slowly", evbAeBreath]] },
aesails: { far: ["trnets", "crates"], sides: ["evb_kite", "workbench", "trnets"], mid: [["workbench", 0.5, 0]], acts: [[0.5, 0, 1.8, "The sails", "read", evbAeSails]] },
aebubbles: { grid: ["evb_prism", 2, 2, "-u", 0.35, 0.65], sides: ["evb_chimes", "plant", "evb_chimes"], acts: [[0.5, 0, 1.8, "Bubbles", "blow one", evbAeBubbles]] },
aeclouds: { mid: [["estelescope", 0.5, 0]], sides: ["benchin", "evb_chimes", "benchin"], ceil: "evb_cloud", acts: [[0.5, 0.3, 1.8, "The clouds", "read", evbAeClouds]] }
});
evbRooms({
gndoor: { sides: ["evb_roots", "crystalcluster", "evb_roots", "evb_gnome"], far: ["evb_roots", "evb_roots"], gap: 3.6, rug: false, acts: [[0.35, 0, 2.0, "The Palace of Earth", "read", evbGnDoor]] },
gnroots: { grid: ["evb_roots", 2, 2, "-u", 0.3, 0.7], sides: ["evb_roots", "evb_gnome", "evb_roots"], rug: false, acts: [[0.5, 0, 1.8, "The roots", "read", evbGnRoots]] },
gnseams: { far: ["oreheap", "crystalcluster", "oreheap", "crystalcluster"], sides: ["mineprop", "mineprop"], rug: false },
gnthrone: { mid: [["grandthrone", 0.82, 0], ["evb_gnome", 0.7, -0.2], ["evb_gnome", 0.7, 0.2], ["evb_geode", 0.5, 0]], grid: ["crystalcluster", 2, 4, "-u", 0.15, 0.35], sides: ["evb_roots", "evb_geode", "evb_roots", "evb_menhir", "evb_roots"], far: ["evb_roots", "crystals", "evb_roots"], rug: false,
acts: [[0.6, 0, 2.4, "The gnome king", "ask about the rocks", evbGnThrone]] },
gncrystal: { grid: ["evb_geode", 2, 2, "-u", 0.35, 0.65], sides: ["crystalcluster", "crystals", "crystalcluster"], rug: false, acts: [[0.5, 0, 1.8, "The geodes", "crack one", evbGnCrystal]] },
gngems: { grid: ["gemheap", 2, 2, "-u", 0.35, 0.65], sides: ["displaycase", "goldpile", "displaycase"], acts: [[0.5, 0, 1.8, "The gems", "read", evbGnGems]] },
gnstones: { grid: ["evb_menhir", 2, 3, "-u", 0.25, 0.75], rug: false, acts: [[0.5, 0, 1.8, "The standing stones", "read", evbGnStones]] },
gnfossil: { far: ["evb_fossil", "evb_fossil"], sides: ["evb_fossil", "boulder", "evb_fossil"], acts: [[0.5, 0, 1.8, "The fossil wall", "read", evbGnFossil]] },
gnmush: { grid: ["evb_toadstool", 3, 3], sides: ["evb_roots", "evb_toadstool", "evb_roots"], rug: false, acts: [[0.5, 0, 1.8, "The mushrooms", "read", evbGnMush]] },
gnforge: { mid: [["lavaforge", 0.5, 0]], sides: ["anvil", "evb_gnome", "weaponrack"], rug: false, acts: [[0.5, 0.3, 1.8, "The deep forge", "read", evbGnForge]] },
gnseeds: { far: ["shelfgoods", "shelfgoods"], sides: ["trsacks", "shelfgoods", "trsacks"], acts: [[0.5, 0, 1.8, "The seeds", "read", evbGnSeeds]] },
gnworms: { grid: ["boulder", 2, 2, "-u", 0.35, 0.65], sides: ["evb_roots", "evb_gnome", "evb_roots"], rug: false, acts: [[0.5, 0, 1.8, "The burrows", "look", evbGnWorms]] },
gnquake: { mid: [["esglobe", 0.5, 0]], sides: ["boulder", "maptable", "boulder"], rug: false, acts: [[0.5, 0.3, 1.8, "The moving plates", "read", evbGnQuake]] },
gnclay: { far: ["evb_pots", "potterswheel"], sides: ["evb_pots", "workbench", "evb_pots"], acts: [[0.5, 0, 1.8, "The clay", "read", evbGnClay]] },
gnheart: { mid: [["evb_geode", 0.5, 0]], sides: ["crystalcluster", "evb_lava", "crystalcluster"], rug: false, acts: [[0.5, 0.3, 1.8, "The mountain's heart", "touch it", evbGnHeart]] },
gnmaps: { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "evb_gnome", "mapchest"], acts: [[0.5, 0.3, 1.8, "The map", "read", evbGnMaps]] }
});
evbRooms({
ungate: { sides: ["dpx_coralpot", "dpx_fountain", "dpx_coralpot", "dpx_kelp"], far: ["dpx_fountain", "dpx_fountain"], gap: 3, acts: [[0.35, 0, 2.0, "The Palace of Water", "read", evbUnGate]] },
unfountains: { grid: ["dpx_fountain", 2, 2, "-u", 0.3, 0.7], sides: ["dpx_coralpot", "dpx_kelp", "dpx_coralpot"], acts: [[0.5, 0, 1.8, "The fountains", "read", evbUnFountains]] },
unrain: { far: ["dpx_kelp", "dpx_coralpot", "dpx_kelp", "dpx_coralpot"] },
unthrone: { mid: [["evb_undine", 0.78, 0], ["dpx_shellthrone", 0.62, 0], ["redrunner", 0.4, 0, "+u"]], grid: ["dpx_fountain", 2, 2, "-u", 0.2, 0.4], sides: ["dpx_coralpot", "dpx_kelp", "dpx_pearllamp", "dpx_kelp", "dpx_coralpot"], far: ["evb_falls", "dpx_coralpot"],
acts: [[0.55, 0, 2.4, "The undine", "ask her a question", evbUnThrone]] },
unfalls: { mid: [["evb_falls", 0.55, 0]], sides: ["dpx_kelp", "boulder", "dpx_kelp"], rug: false, acts: [[0.4, 0, 1.8, "The waterfall", "listen", evbUnFalls]] },
untides: { mid: [["evb_tideclock", 0.5, 0]], sides: ["clock", "maptable", "clock"], acts: [[0.5, 0.3, 1.8, "The tide clock", "read", evbUnTides]] },
unwish: { mid: [["evb_well", 0.5, 0]], sides: ["dpx_coralpot", "benchin", "dpx_coralpot"], rug: false, acts: [[0.5, 0.3, 1.8, "The wishing well", "make a wish", evbUnWell]] },
unpearls: { grid: ["dpx_oysters", 2, 2, "-u", 0.35, 0.65], sides: ["displaycase", "dpx_pearllamp", "displaycase"], acts: [[0.5, 0, 1.8, "The pearls", "read", evbUnPearls]] },
unbath: { mid: [["dpx_clambath", 0.5, 0]], sides: ["dpx_bench", "dpx_strigil", "dpx_bench"], far: ["dpx_poolhot", "dpx_poolcold"], rug: false, acts: [[0.5, 0.3, 1.8, "The baths", "read", evbUnBath]] },
unrivers: { mid: [["cavepool", 0.5, 0]], sides: ["plant", "boulder", "plant", "boulder"], rug: false, acts: [[0.5, 0.35, 1.8, "The rivers", "read", evbUnRivers]] },
unaqueduct: { far: ["evb_doric", "evb_doric", "evb_doric"], sides: ["boulder", "evb_doric", "boulder"], mid: [["dpx_fountain", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The aqueduct", "read", evbUnAqueduct]] },
unmusic: { grid: ["chair", 2, 3], far: ["piano", "evb_harp"], sides: ["dpx_shellharp", "lectern"], acts: [[0.5, 0, 1.8, "The Water Music", "listen", evbUnMusic]] },
unfrogs: { mid: [["cavepool", 0.5, 0]], sides: ["plant", "evb_toadstool", "plant"], rug: false, acts: [[0.5, 0.35, 1.8, "The frogs", "listen", evbUnFrogs]] },
unboats: { mid: [["evb_canoe", 0.5, 0]], sides: ["dpx_oars", "trnets", "dpx_rope"], acts: [[0.5, 0.35, 1.8, "The boats", "read", evbUnBoats]] },
unundine: { mid: [["evb_undine", 0.55, 0]], sides: ["dpx_coralpot", "dpx_shellmirror", "dpx_coralpot"], acts: [[0.4, 0, 1.8, "Undine", "read her tale", evbUnUndine]] },
uncycle: { far: ["wgwhiteboard", "esglobe"], sides: ["dpx_fountain", "plant", "dpx_fountain"], acts: [[0.5, 0, 1.8, "The water cycle", "read", evbUnCycle]] }
});
var EVB_WD = {};
function evbWorldDoor(wk, x, z, ry, hd, theme, name, o) { return __ZC(367, 151, this, arguments, new.target); }
function evbWorldSpec(D) {
var W = typeof WORLDS !== "undefined" ? WORLDS[D.world] : null, bx = W ? W.base || 0 : 0;
return { id: D.id, archetype: D.arch || "house", attrs: {}, x: bx + D.x, z: D.z, rot: 0, realm: store.here || 0, label: D.name, inside: {},
evb: { theme: D.arch ? null : D.theme, src: "w", world: D.world }, evbDoor: { x: bx + D.x, z: D.z, out: D.out, y: D.y } };
}
(function () {
if (typeof worldGo === "function") {
var wg = worldGo;
worldGo = function (key) { try {
if (typeof WORLDS !== "undefined" && WORLDS[key] && !WORLDS[key].g)
EVB_WD[key] = [];
}
catch (e) { } return wg.apply(this, arguments); };
}
if (typeof worldTick === "function") {
var wt = worldTick;
worldTick = function (dt) { if (typeof WLD !== "undefined" && WLD.on && typeof INT !== "undefined" && INT && INT.spec && INT.spec.evb && INT.spec.evb.src === "w")
return; return wt.apply(this, arguments); };
}
if (typeof worldPrompt === "function") {
var wp = worldPrompt;
worldPrompt = function (html, fn) {
if (!html && EVB.wnear && typeof WLD !== "undefined" && WLD.on && !(typeof INT !== "undefined" && INT)) {
var D = EVB.wnear;
return wp.call(this, "🚪 <b>" + evbEsc(D.name) + "</b> · <b>press E</b> at " + evbEsc(D.doors) + " to go in", function () { evbWorldEnter(D); });
}
return wp.apply(this, arguments);
};
}
})();
function evbWorldEnter(D) { return __ZC(367, 152, this, arguments, new.target); }
function evbWorldDoorTick() { return __ZC(367, 153, this, arguments, new.target); }
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, Co = K.K, Tor = K.T, M = evbM;
var P = {};
P.evb_lute = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
B(g, wd, 0.5, 0.04, 0.3, 0, 0.02, 0);
B(g, wd, 0.04, 0.5, 0.04, 0, 0.27, -0.1);
var body = S(g, M(0xC08A4A, "wood"), 0.22, 0, 0.42, 0.02, 14);
body.scale.set(1, 1.25, 0.55);
B(g, M(0x3A2618, "wood"), 0.07, 0.55, 0.03, 0, 0.85, 0.04);
var hd = B(g, M(0x3A2618, "wood"), 0.08, 0.16, 0.03, 0, 1.17, -0.01);
hd.rotation.x = -0.9;
Cy(g, M(0x1A120A), 0.05, 0.05, 0.01, 0, 0.46, 0.13, 12).rotation.x = Math.PI / 2;
return g;
};
P.evb_virginals = function () {
var g = G(), wd = M(0x5A3A22, "wood");
[[-0.7, -0.2], [0.7, -0.2], [-0.7, 0.2], [0.7, 0.2]].forEach(function (q) { Cy(g, wd, 0.04, 0.05, 0.72, q[0], 0.36, q[1], 8); });
B(g, wd, 1.6, 0.05, 0.55, 0, 0.74, 0);
B(g, M(0x2A5A3A, "wood"), 1.5, 0.22, 0.48, 0, 0.88, 0);
B(g, M(0xF0E8D0), 0.6, 0.03, 0.12, 0.25, 0.99, 0.18);
for (var i = 0; i < 12; i++)
B(g, M(0x14100E), 0.025, 0.035, 0.07, 0.0 + i * 0.045, 1.01, 0.15);
var lid = B(g, M(0xE8D8A8, "wood"), 1.5, 0.03, 0.48, 0, 1.18, -0.42);
lid.rotation.x = 1.1;
B(g, M(0xB8402A), 1.3, 0.01, 0.36, 0, 1.19, -0.4).rotation.x = 1.1;
return g;
};
P.evb_spit = function () {
var g = G(), ir = M(0x2A2A2A);
[-0.8, 0.8].forEach(function (x) { B(g, ir, 0.06, 0.7, 0.06, x, 0.35, 0); });
var bar = Cy(g, ir, 0.02, 0.02, 1.8, 0, 0.62, 0, 6);
bar.rotation.z = Math.PI / 2;
var j = S(g, M(0x8A4A22), 0.2, 0, 0.62, 0, 10);
j.scale.set(1.6, 0.9, 0.9);
B(g, M(0x8A8A88), 1.0, 0.06, 0.35, 0, 0.05, 0.1);
Tor(g, M(0x6A4A2A, "wood"), 0.42, 0.05, 0.9, 1.0, -0.35, 0);
for (var i = 0; i < 6; i++) {
var sp = B(g, M(0x6A4A2A, "wood"), 0.03, 0.8, 0.03, 0.9, 1.0, -0.35);
sp.rotation.z = i * 0.52;
}
Co(g, evbGlow(0xFF8020, 0.8), 0.25, 0.35, 0, 0.2, -0.5, 8);
return g;
};
P.evb_bookstall = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
B(g, wd, 1.6, 0.06, 0.6, 0, 0.85, 0);
B(g, wd, 0.06, 0.85, 0.06, -0.75, 0.42, 0.25);
B(g, wd, 0.06, 0.85, 0.06, 0.75, 0.42, 0.25);
B(g, wd, 1.6, 0.85, 0.06, 0, 0.42, -0.27);
for (var i = 0; i < 6; i++) {
var x = -0.6 + i * 0.24;
B(g, M(0xF0E6CC), 0.18, 0.05 + (i % 3) * 0.03, 0.25, x, 0.9 + (i % 3) * 0.015, 0.05);
}
[[0x6A2A1A, -0.4], [0x2A3A5A, -0.2], [0x3A2A1A, 0.4]].forEach(function (q) { B(g, M(q[0]), 0.05, 0.22, 0.16, q[1], 1.0, -0.18); });
B(g, wd, 0.04, 0.9, 0.04, 0.8, 1.3, -0.27);
B(g, M(0x2A4A2A, "wood"), 0.5, 0.36, 0.04, 0.8, 1.55, -0.25);
B(g, M(0xE8C860), 0.3, 0.18, 0.01, 0.8, 1.55, -0.225);
return g;
};
P.evb_cloth = function () {
var g = G(), wd = M(0x5A3A22, "wood");
B(g, wd, 1.4, 1.8, 0.08, 0, 0.9, -0.26);
[0.05, 0.6, 1.15, 1.7].forEach(function (y) { B(g, wd, 1.4, 0.04, 0.5, 0, y, 0); });
var cols = [0x2A3A6A, 0x8A2A2A, 0xE8E0D0, 0x3A5A2A, 0x6A4A7A, 0xC8A040, 0x5A4A3A, 0xD8C8B0, 0x7A1A3A];
for (var r = 0; r < 3; r++)
for (var i = 0; i < 3; i++) {
var b = Cy(g, M(cols[(r * 3 + i) % cols.length], "damask"), 0.16, 0.16, 0.42, -0.45 + i * 0.45, 0.25 + r * 0.55, 0.02, 10);
b.rotation.x = Math.PI / 2;
}
return g;
};
P.evb_pewter = function () {
var g = G(), wd = M(0x3A2618, "wood"), pw = M(0xA8AAAC);
B(g, wd, 1.2, 0.8, 0.5, 0, 0.4, 0);
B(g, wd, 1.2, 0.05, 0.5, 0, 0.82, 0);
B(g, wd, 1.0, 0.5, 0.4, 0, 1.1, -0.05);
B(g, wd, 1.2, 0.05, 0.5, 0, 1.38, 0);
[-0.4, 0, 0.4].forEach(function (x) { var p = Cy(g, pw, 0.16, 0.16, 0.02, x, 1.0, 0.17, 16); p.rotation.x = 1.3; });
Cy(g, pw, 0.07, 0.09, 0.24, 0.35, 1.52, 0, 10);
Cy(g, pw, 0.12, 0.12, 0.02, -0.3, 1.42, 0, 14);
S(g, M(0xC8A040), 0.04, -0.05, 1.45, 0, 8);
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_virginals", "evb_spit", "evb_bookstall", "evb_cloth", "evb_pewter"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
var EVB_TUDOR_PAL = { fab: "crimson", fab2: "emerald", wood: "oak", metal: "iron", stone: "sand", art: 4, rug: 5, rugv: 0 };
var EVB_TUDOR_REMAP = { "D6D0C6|plaster": [0xF2EADA, "plaster"], "D8D0C0|coffer": [0x5A3A22, "wood"] };
function evbTudorPlan(front) {
return [
{ hall: front.hall, spine: front.spine, gallery: { k: "tdgallery", n: "The Painted Cloth Passage" },
back: { merge: EVB_BACK, k: "tdkitchen", n: "The Kitchen" },
r1i: { k: "tdbuttery", n: "The Buttery" }, r1o: { k: "tdpantry", n: "The Pantry" },
r2i: { k: "tdbrew", n: "The Brewhouse" }, r2o: { k: "tdwash", n: "The Washhouse" },
r3i: { k: "tdyard", n: "The Back Yard and the Well" }, r3o: { k: "tdwood", n: "The Woodstore" },
l1i: { k: "tdcount", n: "The Counting House" }, l1o: { k: "tdparlour", n: "The Parlour" },
l2i: { k: "tdlarder", n: "The Larder" }, l2o: { k: "tdstill", n: "The Still Room" },
l3i: { k: "tdservant", n: "The Maids' Room" }, l3o: { k: "tdschool", n: "The Schoolroom" } },
{ hall: { k: "tdlanding", n: "The Stair Head" }, spine: { k: "tdgreat", n: "The Great Chamber" }, gallery: { k: "tdover", n: "The Room over the Street" },
back: { merge: EVB_BACK, k: "tdbest", n: "The Best Bedchamber" },
r1: { merge: ["r1i", "r1o"], k: "tdnursery", n: "The Nursery" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "tdmusic", n: "The Music Chamber" },
l1: { merge: ["l1i", "l1o"], k: "tdgarret", n: "The Apprentices' Garret" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "tdsew", n: "The Sewing Chamber" } }
];
}
function evbTudor(key, o) {
evbTheme(key, { corner: o.corner || "barrel", seed: o.seed, panel: 0xE8DCC4, pal: Object.assign({}, EVB_TUDOR_PAL, o.pal || {}), remap: EVB_TUDOR_REMAP, hello: o.hello });
evbHouse(key, { g: EVB_GRID.mid, h: 3.4, levels: 2, stairX: 3.5, stairZ: 11, floors: [o.f0 || "The ground floor", "The chambers above"], wall: 0xF2EADA, trim: 0x3A2618,
plan: evbTudorPlan(o) });
}
evbTudor("tudorhouse", { seed: 91, f0: "The hall floor",
hall: { k: "tdentry", n: "The Screens Passage" }, spine: { k: "tdhall", n: "The Hall" },
hello: "🏠 <b>Inside a London house, 1600.</b> Rushes and herbs on the floor, the hall fire, the smell of the kitchen and its spit; up the stair, the great chamber and the best bed. Look for the ✨ cards. The way out is the street door." });
evbTudor("tudordraper", { seed: 93, pal: { fab: "navy", fab2: "crimson" }, f0: "The shop floor",
hall: { k: "tdshopdraper", n: "The Draper's Shop" }, spine: { k: "tdworkdraper", n: "The Cutting Room" },
hello: "🧵 <b>Inside a draper's shop, 1600.</b> Bolts of wool and linen on the shelves, the ell-wand on the counter, and the family living behind and above. Look for the ✨ cards. The way out is the shop door." });
evbTudor("tudorbaker", { seed: 95, pal: { fab: "mustard", fab2: "terracotta" }, f0: "The shop floor",
hall: { k: "tdshopbaker", n: "The Baker's Shop" }, spine: { k: "tdworkbaker", n: "The Bakehouse" },
hello: "🍞 <b>Inside a baker's shop, 1600.</b> Loaves on the stall board, the great oven behind, flour in the air. Look for the ✨ cards. The way out is the shop door." });
evbTudor("tudorbooks", { seed: 97, pal: { fab: "emerald", fab2: "navy" }, f0: "The shop floor",
hall: { k: "tdshopbooks", n: "The Bookseller's Shop" }, spine: { k: "tdworkbooks", n: "The Bindery" },
hello: "📚 <b>Inside a bookseller's shop, 1600.</b> New books in their sheets on the stall, a few bound in calf, the play quartos at sixpence. Look for the ✨ cards. The way out is the shop door." });
evbTudor("tudorapoth", { seed: 99, pal: { fab: "teal", fab2: "plum" }, f0: "The shop floor",
hall: { k: "tdshopapoth", n: "The Apothecary's Shop" }, spine: { k: "tdworkapoth", n: "The Herb Room" },
hello: "🌿 <b>Inside an apothecary's shop, 1600.</b> Jars and boxes to the ceiling, dried herbs hanging, a stuffed alligator, as every good apothecary's shop had. Look for the ✨ cards. The way out is the shop door." });
var EVB_TUDOR_SHOPS = ["tudordraper", "tudorbaker", "tudorbooks", "tudorapoth"];
function evbTudorShop(x, z) { var h = Math.abs(Math.round(x * 7.13 + z * 3.71)) % EVB_TUDOR_SHOPS.length; return EVB_TUDOR_SHOPS[h]; }
var EVB_TUDOR_NAMES = { tudorhouse: "A house", tudordraper: "A draper's shop", tudorbaker: "A baker's shop", tudorbooks: "A bookseller's shop", tudorapoth: "An apothecary's shop" };
evbFins({
tdentry: ["wood", 0x6A4A2A, 0xF2EADA, "plaster", 0x3A2618], tdhall: ["stone", 0x9A8E78, 0xE8DCC4, "wood", 0x3A2618, 0x5A3A22], tdgallery: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tdkitchen: ["stone", 0x8A7E68, 0xE8DCC4, "plaster", 0x3A2618, 0x4A3A2A], tdbuttery: ["stone", 0x8A7E68, 0xE0D4BC, "plaster", 0x3A2618], tdpantry: ["stone", 0x8A7E68, 0xE0D4BC, "plaster", 0x3A2618],
tdbrew: ["stone", 0x7A6E58, 0xD8CCB4, "stone", 0x3A2618], tdwash: ["stone", 0x7A6E58, 0xD8CCB4, "stone", 0x3A2618], tdyard: ["stone", 0x8A8478, 0xD8D0C0, "stone", 0x5A4A3A],
tdwood: ["wood", 0x6A4A2A, 0xC8B898, "wood", 0x3A2618], tdcount: ["wood", 0x6A4A2A, 0xE8DCC4, "wood", 0x3A2618], tdparlour: ["wood", 0x7A5A3A, 0xE8DCC4, "wood", 0x3A2618, 0x5A3A22],
tdlarder: ["stone", 0x8A7E68, 0xE0D4BC, "plaster", 0x3A2618], tdstill: ["stone", 0x9A8E78, 0xF2EADA, "plaster", 0x3A2618], tdservant: ["wood", 0x6A4A2A, 0xE8DCC4, "plaster", 0x3A2618],
tdschool: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tdlanding: ["wood", 0x6A4A2A, 0xF2EADA, "plaster", 0x3A2618], tdgreat: ["wood", 0x7A5A3A, 0xE8DCC4, "wood", 0x3A2618, 0xF2EADA], tdover: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tdbest: ["wood", 0x6A4A2A, 0xE8DCC4, "damask", 0x3A2618, 0xF2EADA], tdnursery: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618], tdmusic: ["wood", 0x7A5A3A, 0xE8DCC4, "wood", 0x3A2618, 0xF2EADA],
tdgarret: ["wood", 0x6A4A2A, 0xD8CCB4, "wood", 0x3A2618], tdsew: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tdshopdraper: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618], tdworkdraper: ["wood", 0x7A5A3A, 0xE8DCC4, "plaster", 0x3A2618],
tdshopbaker: ["stone", 0x9A8E78, 0xF2EADA, "plaster", 0x3A2618], tdworkbaker: ["stone", 0x8A7E68, 0xE8DCC4, "stone", 0x3A2618],
tdshopbooks: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x2A4A2A], tdworkbooks: ["wood", 0x6A4A2A, 0xE8DCC4, "plaster", 0x3A2618],
tdshopapoth: ["stone", 0x9A8E78, 0xF2EADA, "plaster", 0x2A4A4A], tdworkapoth: ["stone", 0x8A7E68, 0xE8DCC4, "plaster", 0x3A2618]
});
"use strict";
var evbTdEntry = evbInfo("The screens passage", "The street door opens into a passage behind a wooden screen, which keeps the draught off the hall. London houses of 1600 are timber-framed, the gaps filled with wattle and daub and limewashed; each floor juts out over the one below, so the top storeys nearly meet across a narrow lane.");
function evbTdHall() { return __ZC(367, 154, this, arguments, new.target); }
var evbTdGallery = evbInfo("The painted cloths", "Those who cannot afford tapestries hang painted cloths: linen painted with stories from the Bible or old tales, and wise sayings. Falstaff speaks of them in Henry IV.");
function evbTdKitchen() { return __ZC(367, 155, this, arguments, new.target); }
function evbTdButtery() { return __ZC(367, 156, this, arguments, new.target); }
var evbTdPantry = evbInfo("The pantry", "From the French pain, bread: the bread, the salt, the trenchers. A trencher is a flat wooden plate (once a slice of stale bread); the better sort eat off pewter. Forks are hardly known in England yet: you eat with your knife, a spoon and your fingers.");
var evbTdBrew = evbInfo("The brewhouse", "Many houses brew their own ale: malted barley steeped in hot water, then left to work. Beer, made with hops, came over from the Low Countries and has taken over; old people grumble that ale was better.");
var evbTdWash = evbInfo("The washhouse", "Linen is washed in lye made from wood ash, beaten on a board, and spread on hedges or the grass to bleach in the sun. A clean white shirt and ruff show you are respectable.");
function evbTdYard() { return __ZC(367, 157, this, arguments, new.target); }
var evbTdWood = evbInfo("The woodstore", "Billets and faggots for the fires, kindling, and a heap of sea-coal. Firewood is dearer every year as the woods near London are cut down.");
var evbTdCount = evbFact("The counting house", ["Accounts are kept in pounds, shillings and pence: twelve pence to a shilling, twenty shillings to a pound.", "Sums are worked on a counting board with counters, like an abacus laid flat on a table.", "A strongbox with three locks keeps the money; the master, and perhaps his wife, hold the keys."]);
function evbTdParlour() { return __ZC(367, 158, this, arguments, new.target); }
var evbTdLarder = evbInfo("The larder", "Meat is salted or smoked to keep through winter; fish is eaten on Fridays and in Lent, and by law on Wednesdays too for a while, to keep the fishing fleet (and so the navy's sailors) in work.");
function evbTdStill() { return __ZC(367, 159, this, arguments, new.target); }
var evbTdServant = evbInfo("The maids' room", "Servants are hired for a year at a time, often at a hiring fair. A maid is up before dawn to rake out and light the fires, and is the last to bed.");
function evbTdSchool() { return __ZC(367, 160, this, arguments, new.target); }
var evbTdLanding = evbInfo("The stair head", "A newel stair of solid oak, turning round a great post, climbs from the hall to the chambers above. Every floor juts out a little further over the street than the one below.");
function evbTdGreat() { return __ZC(367, 161, this, arguments, new.target); }
var evbTdOver = evbInfo("The room over the street", "From the window you can almost shake hands with the house across the lane. Below, the cries of London: 'What do ye lack?' from the shop boys, 'Hot pippin pies!', 'New mackerel!', 'Buy a broom!'.");
function evbTdBest() { return __ZC(367, 162, this, arguments, new.target); }
function evbTdNursery() { evbTune([392, 330, 392, 330], 400, 0.8); evbSay("👶 A wooden cradle that rocks, swaddling bands, a rattle with bells and a coral to chew. Many children did not live to grow up, so every one was precious."); }
function evbTdMusic() { return __ZC(367, 163, this, arguments, new.target); }
var evbTdGarret = evbInfo("The apprentices' garret", "Apprentices are bound for seven years or more, living in the master's house and eating at his table, unpaid, learning the trade. London's apprentices are famous for their sports, their football and their riots; when trouble starts the cry goes up, 'Clubs!'.");
function evbTdSew() { return __ZC(367, 164, this, arguments, new.target); }
function evbTdDraper() { return __ZC(367, 165, this, arguments, new.target); }
var evbTdCutting = evbInfo("The cutting room", "The great shears and the cutting board. Cloth is sold by the length; the buyer takes it to a tailor to be made up into clothes.");
function evbTdBaker() { return __ZC(367, 166, this, arguments, new.target); }
function evbTdBakehouse() { evbTune([220, 196, 175], 400, 0.8); evbSay("🔥 The oven is a brick dome, heated with faggots until it is white hot, then raked out; the loaves go in on a long wooden peel, and the door is sealed. Neighbours bring their pies to bake in the heat afterwards."); }
function evbTdBooks() { return __ZC(367, 167, this, arguments, new.target); }
var evbTdBindery = evbInfo("The bindery", "The sheets are folded, sewn onto cords, pressed, and covered in calf or sheepskin over boards. A cheap book is stitched into a limp cover of plain vellum.");
function evbTdApoth() { return __ZC(367, 168, this, arguments, new.target); }
var evbTdHerbs = evbInfo("The herb room", "Apothecaries in London belong to the Grocers' Company until 1617, when they get their own. John Gerard's great Herball, published in 1597, describes over a thousand plants and what they were believed to cure.");
"use strict";
evbRooms({
tdentry: { sides: ["benchin", "wd:kf_coatrack", "benchin"], far: ["evb_pewter"], acts: [[0.35, 0, 2.0, "The house", "read", evbTdEntry]] },
tdhall: { far: ["fireplace", "benchin", "benchin"], sides: ["evb_pewter", "footchest", "painting", "benchin"], mid: [["longtable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 2.0, "The hall", "sit by the fire", evbTdHall]] },
tdgallery: { sides: ["painting", "painting", "painting", "painting"], far: ["footchest"], acts: [[0.5, 0, 1.8, "The painted cloths", "look", evbTdGallery]] },
tdkitchen: { far: ["evb_spit", "oven", "herbrack"], sides: ["butcherblock", "shelfgoods", "trbreadrack", "barrel", "cask"], mid: [["longtable", 0.55, 0]], ceil: "lantern", rug: false,
acts: [[0.5, 0, 2.2, "The kitchen fire", "turn the spit", evbTdKitchen]] },
tdbuttery: { far: ["cask", "cask", "cask"], sides: ["barrel", "shelfgoods", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The casks", "draw beer", evbTdButtery]] },
tdpantry: { far: ["shelfgoods", "evb_pewter"], sides: ["trbreadrack", "shelfgoods", "footchest"], rug: false, acts: [[0.5, 0, 1.8, "The pantry", "read", evbTdPantry]] },
tdbrew: { far: ["trcopper", "cask"], sides: ["barrel", "trsacks", "barrel", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The brewing copper", "read", evbTdBrew]] },
tdwash: { far: ["trcopper", "gwrmangle"], sides: ["barrel", "gwrairer", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The wash", "read", evbTdWash]] },
tdyard: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "trlogs", "evb_rainbarrel"], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "The well", "draw water", evbTdYard]] },
tdwood: { far: ["trlogs", "trlogs"], sides: ["trlogs", "trsaw", "trlogs"], rug: false, acts: [[0.5, 0, 1.8, "The woodstore", "read", evbTdWood]] },
tdcount: { far: ["desk", "footchest"], sides: ["bookshelf", "filecabinet", "treasurechest"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The counting board", "read", evbTdCount]] },
tdparlour: { far: ["fireplace"], sides: ["armchair", "painting", "armchair", "evb_pewter"], mid: [["evb_tavli", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The game", "play", evbTdParlour]] },
tdlarder: { far: ["trmeathooks", "shelfgoods"], sides: ["barrel", "trsacks", "shelfgoods", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The larder", "read", evbTdLarder]] },
tdstill: { far: ["herbrack", "shelfgoods"], sides: ["evb_jars", "herbrack", "workbench"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The still room", "make something", evbTdStill]] },
tdservant: { far: ["bed", "bed"], sides: ["footchest", "wd:kf_coatrack", "footchest"], acts: [[0.5, 0, 1.8, "The maids' room", "read", evbTdServant]] },
tdschool: { grid: ["schooldesk", 2, 2], far: ["lectern", "bookshelf"], sides: ["footchest", "painting"], acts: [[0.5, 0, 1.8, "The hornbook", "learn your letters", evbTdSchool]] },
tdlanding: { sides: ["footchest", "painting", "evb_pewter"], acts: [[0.4, 0, 1.8, "The stair", "read", evbTdLanding]] },
tdgreat: { far: ["fireplace", "evb_pewter"], sides: ["painting", "chair", "chair", "painting", "chair", "chair"], mid: [["feasttable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 2.0, "The great chamber", "look round", evbTdGreat]] },
tdover: { far: ["armchair", "wd:kf_table"], sides: ["footchest", "evb_lute", "footchest"], acts: [[0.5, 0, 1.8, "The window over the street", "look out", evbTdOver]] },
tdbest: { far: ["fourposter"], sides: ["footchest", "wardrobe", "painting", "chair", "footchest"], ceil: "ironchandelier", acts: [[0.5, 0, 2.0, "The best bed", "read", evbTdBest]] },
tdnursery: { far: ["crib"], sides: ["toys", "evb_rocking", "footchest"], acts: [[0.5, 0, 1.8, "The cradle", "rock it", evbTdNursery]] },
tdmusic: { far: ["evb_virginals", "evb_lute"], sides: ["chair", "chair", "painting", "chair"], mid: [["wd:kf_table", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The instruments", "play", evbTdMusic]] },
tdgarret: { grid: ["bed", 2, 2, "-u", 0.3, 0.7], sides: ["footchest", "footchest"], acts: [[0.5, 0, 1.8, "The garret", "read", evbTdGarret]] },
tdsew: { far: ["evb_spindle", "loom"], sides: ["dressform", "footchest", "chair"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The ruffs", "starch one", evbTdSew]] },
tdshopdraper: { far: ["evb_cloth", "evb_cloth"], sides: ["evb_cloth", "trcounter", "evb_cloth"], mid: [["trcuttable", 0.5, 0]], acts: [[0.4, 0, 2.0, "The draper's counter", "buy cloth", evbTdDraper]] },
tdworkdraper: { far: ["trcuttable", "evb_cloth"], sides: ["dressform", "trdrapes", "evb_cloth"], acts: [[0.5, 0, 1.8, "The cutting board", "read", evbTdCutting]] },
tdshopbaker: { far: ["trbreadrack", "trbreadrack"], sides: ["trcounter", "trbreadrack", "trsacks"], mid: [["trcounter", 0.5, 0]], rug: false, acts: [[0.4, 0, 2.0, "The loaves", "buy one", evbTdBaker]] },
tdworkbaker: { far: ["oven", "oven"], sides: ["trsacks", "longtable", "trsacks", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The oven", "bake", evbTdBakehouse]] },
tdshopbooks: { far: ["bookshelf", "bookshelf"], sides: ["evb_bookstall", "bookshelf", "evb_bookstall"], mid: [["evb_bookstall", 0.5, 0]], acts: [[0.4, 0, 2.0, "The bookstall", "browse", evbTdBooks]] },
tdworkbooks: { far: ["printpress", "trtypecase"], sides: ["workbench", "trpaper", "workbench"], acts: [[0.5, 0, 1.8, "The bindery", "read", evbTdBindery]] },
tdshopapoth: { far: ["evb_jars", "evb_jars"], sides: ["herbrack", "trcounter", "herbrack", "evb_jars"], mid: [["trcounter", 0.5, 0]], acts: [[0.4, 0, 2.0, "The apothecary's jars", "read", evbTdApoth]] },
tdworkapoth: { far: ["herbrack", "herbrack"], sides: ["workbench", "evb_jars", "workbench"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The herbs", "read", evbTdHerbs]] }
});
"use strict";
evbTheme("tudorinn", { corner: "cask", seed: 101, panel: 0xE0D0B0, pal: Object.assign({}, EVB_TUDOR_PAL, { fab: "terracotta", fab2: "emerald" }), remap: EVB_TUDOR_REMAP,
hello: "🍺 <b>Inside the inn.</b> The taproom fire, the ostlers in the yard, the carrier's wagon for Stratford, and galleried chambers for the travellers upstairs. Look for the ✨ cards. The way out is the yard door." });
evbHouse("tudorinn", { g: EVB_GRID.wide, h: 3.6, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The taproom floor", "The chambers"], wall: 0xF2EADA, trim: 0x3A2618,
plan: [{ hall: { k: "tiyard", n: "The Inn Yard" }, spine: { k: "titap", n: "The Taproom" }, gallery: { k: "tigallery", n: "The Gallery" },
back: { merge: EVB_BACK, k: "tikitchen", n: "The Inn Kitchen" },
r1i: { k: "ticellar", n: "The Cellar Stair" }, r1o: { k: "tdbuttery", n: "The Buttery" },
r2i: { k: "tistable", n: "The Stables" }, r2o: { k: "tiostler", n: "The Ostlers' Room" },
r3i: { k: "tiwagon", n: "The Carriers' Shed" }, r3o: { k: "tdwood", n: "The Woodstore" },
l1i: { k: "tihost", n: "The Host's Room" }, l1o: { k: "tiparlour", n: "The Parlour" },
l2i: { k: "tdlarder", n: "The Larder" }, l2o: { k: "tdbrew", n: "The Brewhouse" },
l3i: { k: "tiplay", n: "The Players' Corner" }, l3o: { k: "tdpantry", n: "The Pantry" } },
{ hall: { k: "tdlanding", n: "The Stair Head" }, spine: { k: "tichamber", n: "The Pilgrims' Chamber" }, gallery: { k: "tiover", n: "The Gallery over the Yard" },
back: { merge: EVB_BACK, k: "tibest", n: "The Best Chamber" },
r1: { merge: ["r1i", "r1o"], k: "tiroom", n: "The Merchant's Room" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "tidorm", n: "The Common Chamber" },
l1: { merge: ["l1i", "l1o"], k: "tdgarret", n: "The Servants' Garret" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "tilinen", n: "The Linen Room" } }] });
evbTheme("tudorpalace", { corner: "evb_pewter", seed: 103, panel: 0xE8DCC4, pal: { fab: "crimson", fab2: "mustard", wood: "walnut", metal: "gold", stone: "marble", art: 2, rug: 1, rugv: 0 }, remap: EVB_TUDOR_REMAP,
hello: "👑 <b>Inside the palace.</b> A great house of Elizabeth's London: the guard chamber, the presence chamber with its canopy of state, the long gallery, the chapel, the great kitchen; upstairs the privy chamber and the bedchamber. Look for the ✨ cards. The way out is the great door." });
evbHouse("tudorpalace", { g: EVB_GRID.wide, h: 5.2, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The state rooms", "The privy lodgings"], wall: 0xF2EADA, trim: 0x3A2618,
plan: [{ hall: { k: "tpguard", n: "The Guard Chamber" }, spine: { k: "tppresence", n: "The Presence Chamber" }, gallery: { k: "tplong", n: "The Long Gallery" },
back: { merge: EVB_BACK, k: "tpkitchen", n: "The Great Kitchen" },
r1i: { k: "tpchapel", n: "The Chapel" }, r1o: { k: "tpclose", n: "The Closet" },
r2i: { k: "tdbuttery", n: "The Buttery" }, r2o: { k: "tpsilver", n: "The Jewel House" },
r3i: { k: "tpconfect", n: "The Confectionery" }, r3o: { k: "tdlarder", n: "The Larder" },
l1i: { k: "tpcouncil", n: "The Council Chamber" }, l1o: { k: "tpmusic", n: "The Musicians' Room" },
l2i: { k: "tpwardrobe", n: "The Wardrobe of the Robes" }, l2o: { k: "tplibrary", n: "The Library" },
l3i: { k: "tpmaids", n: "The Maids of Honour" }, l3o: { k: "tpclock", n: "The Clock Room" } },
{ hall: { k: "tdlanding", n: "The Stair Head" }, spine: { k: "tpprivy", n: "The Privy Chamber" }, gallery: { k: "tpwindow", n: "The Gallery over the Garden" },
back: { merge: EVB_BACK, k: "tpbed", n: "The Bedchamber" },
r1: { merge: ["r1i", "r1o"], k: "tpstudy", n: "The Study" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "tpmasque", n: "The Masquing Room" },
l1: { merge: ["l1i", "l1o"], k: "tpportrait", n: "The Portrait Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "tpbath", n: "The Bathing Room" } }] });
evbTheme("towerlondon", { corner: "armourstand", seed: 105, panel: 0xD8D0C0, pal: { fab: "crimson", fab2: "navy", wood: "oak", metal: "iron", stone: "granite", art: 3, rug: 4, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE8E4D8, "stone"], "D8D0C0|coffer": [0x5A4A3A, "wood"] },
hello: "🏰 <b>Inside the Tower of London.</b> William the Conqueror's White Tower, limewashed white: the armouries, the Chapel of St John, the Jewel House, the Mint, the lions of the royal menagerie, and the cells where prisoners carved their names. Look for the ✨ cards. The way out is the gate." });
evbHouse("towerlondon", { g: EVB_GRID.wide, h: 6, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The ground and the walls", "The upper floor of the White Tower"], wall: 0xE8E4D8, trim: 0x4A4A4A,
plan: [{ hall: { k: "tlgate", n: "The Gate and the Warders" }, spine: { k: "tlhall", n: "The Great Hall" }, gallery: { k: "tlwall", n: "The Wall Walk" },
back: { merge: EVB_BACK, k: "tlarmoury", n: "The Armoury" },
r1i: { k: "tlmint", n: "The Mint" }, r1o: { k: "tljewel", n: "The Jewel House" },
r2i: { k: "tllions", n: "The Lion Tower" }, r2o: { k: "tlstore", n: "The Ordnance Store" },
r3i: { k: "tltraitor", n: "The Water Gate" }, r3o: { k: "tlrecords", n: "The Records Office" },
l1i: { k: "tlbeauchamp", n: "The Prisoners' Chamber" }, l1o: { k: "tlwarder", n: "The Warders' Room" },
l2i: { k: "tlwell", n: "The Well Room" }, l2o: { k: "tlkitchen", n: "The Garrison Kitchen" },
l3i: { k: "tlbell", n: "The Bell Tower" }, l3o: { k: "tlsmith", n: "The Armourer's Forge" } },
{ hall: { k: "tlstair", n: "The Spiral Stair" }, spine: { k: "tlbanquet", n: "The Banqueting Hall" }, gallery: { k: "tlwindow", n: "The Window over the River" },
back: { merge: EVB_BACK, k: "tlchapel", n: "The Chapel of St John" },
r1: { merge: ["r1i", "r1o"], k: "tlcouncil", n: "The Council Chamber" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "tlking", n: "The King's Chamber" },
l1: { merge: ["l1i", "l1o"], k: "tlcell", n: "The Cell" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "tlmaps", n: "The Map Room" } }] });
evbFins({
tiyard: ["stone", 0x8A8478, 0xE8DCC4, "plaster", 0x3A2618], titap: ["wood", 0x6A4A2A, 0xE8DCC4, "wood", 0x3A2618, 0x4A3A2A], tigallery: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tikitchen: ["stone", 0x8A7E68, 0xE8DCC4, "plaster", 0x3A2618, 0x4A3A2A], ticellar: ["stone", 0x6A6458, 0xC8BCA4, "stone", 0x3A2618], tistable: ["stone", 0x8A7A5A, 0xC8B898, "wood", 0x6A4A2A],
tiostler: ["wood", 0x6A4A2A, 0xD8CCB4, "wood", 0x3A2618], tiwagon: ["stone", 0x8A7A5A, 0xC8B898, "wood", 0x6A4A2A], tihost: ["wood", 0x6A4A2A, 0xE8DCC4, "wood", 0x3A2618],
tiparlour: ["wood", 0x7A5A3A, 0xE8DCC4, "wood", 0x3A2618], tiplay: ["wood", 0x7A5A3A, 0xE8DCC4, "plaster", 0x3A2618], tichamber: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tiover: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618], tibest: ["wood", 0x6A4A2A, 0xE8DCC4, "damask", 0x3A2618], tiroom: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tidorm: ["wood", 0x6A4A2A, 0xE8DCC4, "plaster", 0x3A2618], tilinen: ["wood", 0x7A5A3A, 0xF2EADA, "plaster", 0x3A2618],
tpguard: ["stone", 0x9A9488, 0xE8DCC4, "wood", 0x3A2618, 0x5A3A22], tppresence: ["wood", 0x5A3A22, 0xE8DCC4, "damask", 0xC8A040, 0xF2EADA], tplong: ["wood", 0x6A4A2A, 0xE8DCC4, "wood", 0xC8A040, 0xF2EADA],
tpkitchen: ["stone", 0x8A7E68, 0xE8DCC4, "stone", 0x3A2618, 0x4A3A2A], tpchapel: ["checker", 0xE8E4D8, 0xF2EADA, "plaster", 0xC8A040, 0x2A3A6A], tpclose: ["wood", 0x6A4A2A, 0xE8DCC4, "damask", 0xC8A040],
tpsilver: ["stone", 0x9A9488, 0xE8DCC4, "wood", 0xC8A040], tpconfect: ["stone", 0x9A8E78, 0xF2EADA, "plaster", 0x3A2618], tpcouncil: ["wood", 0x5A3A22, 0xE8DCC4, "wood", 0xC8A040],
tpmusic: ["wood", 0x6A4A2A, 0xF2EADA, "wood", 0xC8A040], tpwardrobe: ["wood", 0x6A4A2A, 0xE8DCC4, "damask", 0xC8A040], tplibrary: ["wood", 0x5A3A22, 0xE8DCC4, "wood", 0xC8A040],
tpmaids: ["wood", 0x7A5A3A, 0xF2EADA, "damask", 0xC8A040], tpclock: ["wood", 0x6A4A2A, 0xE8DCC4, "wood", 0xC8A040], tpprivy: ["wood", 0x5A3A22, 0xE8DCC4, "damask", 0xC8A040, 0xF2EADA],
tpwindow: ["wood", 0x6A4A2A, 0xF2EADA, "plaster", 0xC8A040], tpbed: ["wood", 0x5A3A22, 0xE8DCC4, "damask", 0xC8A040, 0xF2EADA], tpstudy: ["wood", 0x5A3A22, 0xE8DCC4, "wood", 0xC8A040],
tpmasque: ["wood", 0x6A4A2A, 0xF2EADA, "damask", 0xC8A040, 0x2A3A6A], tpportrait: ["wood", 0x6A4A2A, 0xE8DCC4, "damask", 0xC8A040], tpbath: ["tile", 0xE8E4D8, 0xF2EADA, "tile", 0xC8A040],
tlgate: ["stone", 0x8A8478, 0xD8D0C0, "stone", 0x4A4A4A, 0x5A4A3A], tlhall: ["stone", 0x8A8478, 0xE8E4D8, "stone", 0x4A4A4A, 0x5A4A3A], tlwall: ["stone", 0x8A8478, 0xD8D0C0, "stone", 0x4A4A4A],
tlarmoury: ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x4A4A4A, 0x5A4A3A], tlmint: ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x4A4A4A], tljewel: ["stone", 0x8A8478, 0xE8E4D8, "damask", 0xC8A040],
tllions: ["stone", 0x9A8E70, 0xD8C8A0, "stone", 0x4A4A4A], tlstore: ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x4A4A4A], tltraitor: ["stone", 0x6A6458, 0xB8B0A0, "stone", 0x4A4A4A],
tlrecords: ["wood", 0x6A4A2A, 0xE8E4D8, "wood", 0x4A4A4A], tlbeauchamp: ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x4A4A4A], tlwarder: ["wood", 0x6A4A2A, 0xE8E4D8, "stone", 0xB8201A],
tlwell: ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x4A4A4A], tlkitchen: ["stone", 0x8A7E68, 0xD8D0C0, "stone", 0x4A4A4A], tlbell: ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x4A4A4A],
tlsmith: ["stone", 0x6A6458, 0xC8C0B0, "stone", 0x4A4A4A], tlstair: ["stone", 0x8A8478, 0xE8E4D8, "stone", 0x4A4A4A], tlbanquet: ["wood", 0x6A4A2A, 0xE8E4D8, "stone", 0x4A4A4A, 0x5A4A3A],
tlwindow: ["stone", 0x8A8478, 0xE8E4D8, "stone", 0x4A4A4A], tlchapel: ["stone", 0xC8C0B0, 0xF0ECE4, "stone", 0x8A8478, 0xE8E4D8], tlcouncil: ["wood", 0x5A3A22, 0xE8E4D8, "wood", 0x4A4A4A],
tlking: ["wood", 0x5A3A22, 0xE8E4D8, "damask", 0xC8A040], tlcell: ["stone", 0x6A6458, 0xB8B0A0, "stone", 0x3A3A3A], tlmaps: ["wood", 0x6A4A2A, 0xE8E4D8, "wood", 0x4A4A4A]
});
"use strict";
function evbTiYard() { return __ZC(367, 169, this, arguments, new.target); }
function evbTiTap() { return __ZC(367, 170, this, arguments, new.target); }
var evbTiGallery = evbInfo("The gallery", "The open gallery runs round the yard at the first floor. Travellers lean on the rail to watch the comings and goings below: wagons, horses, and sometimes a company of players.");
var evbTiKitchen = evbInfo("The inn kitchen", "Two fires, two spits, a great copper of water always hot. An inn may feed fifty people at dinner, and the ostlers and carriers again at night.");
var evbTiCellar = evbInfo("The cellar stair", "Barrels of ale and beer are rolled down a ramp into the cool cellar. Sack, a sweet wine from Spain, is Falstaff's favourite drink.");
var evbTiStable = evbInfo("The stables", "A traveller hires horses from stage to stage, or brings their own. The ostler feeds and rubs them down; a good inn is judged by its stables as much as its beds.");
var evbTiOstler = evbInfo("The ostlers' room", "The ostlers sleep over the stables, up at four to see the early riders off. In Henry IV Part 1 two carriers grumble in an inn yard at Rochester before dawn that the fleas bite and the ostler is dead.");
var evbTiWagon = evbInfo("The carriers' shed", "The great covered wagons stand here, loaded for the road: cloth for Stratford, books, salt fish, letters. They travel at a walk, about twenty miles a day.");
var evbTiHost = evbInfo("The host's room", "The innkeeper keeps the reckoning: the bill for each guest, chalked up or written in his book. Innkeepers must by law tell the constable of any suspicious strangers.");
var evbTiParlour = evbInfo("The parlour", "A quieter room for the better guests, with a table, cushions and a fire of its own. Merchants do their business here over a cup of wine.");
function evbTiPlay() { return __ZC(367, 171, this, arguments, new.target); }
var evbTiChamber = evbInfo("The pilgrims' chamber", "Several beds in one room, and you may share yours with a stranger. Chaucer says the rooms and stables of the Tabard were 'wyde': roomy.");
var evbTiOver = evbInfo("The gallery over the yard", "From up here you see the whole yard: the wagons in, the horses out, the tapster running with pots.");
var evbTiBest = evbInfo("The best chamber", "A bed to yourself, curtains, a fire, and clean sheets: for a price. Rooms in good inns were often given names, like the Star or the Rose, painted over the door.");
var evbTiRoom = evbInfo("The merchant's room", "A merchant up from the country to sell his wool keeps his money in a locked chest by the bed, and the key round his neck.");
var evbTiDorm = evbInfo("The common chamber", "The cheapest beds: a row of them, two or three to a bed in winter for warmth.");
var evbTiLinen = evbInfo("The linen room", "Sheets, towels, pillowberes (pillowcases) and tablecloths, washed, pressed and stacked with lavender between them.");
function evbTpGuard() { return __ZC(367, 172, this, arguments, new.target); }
function evbTpPresence() { return __ZC(367, 173, this, arguments, new.target); }
var evbTpLong = evbInfo("The long gallery", "A long room for walking in when it rains, hung with portraits and maps. Walking up and down the gallery is the courtiers' exercise, and their place for private talk.");
function evbTpKitchen() { return __ZC(367, 174, this, arguments, new.target); }
var evbTpChapel = evbInfo("The chapel", "The Chapel Royal has its own choir of men and boys. Thomas Tallis and William Byrd, the greatest composers in England, were both Gentlemen of the Chapel Royal.");
var evbTpClose = evbInfo("The closet", "A small private room for prayer, reading or private talk; only a few are let in.");
var evbTpSilver = evbFact("The jewel house", ["The plate of the household: gilt cups, great salts, basins and ewers, kept under lock and key.", "Plate was money in the cupboard: when the Crown needed cash, silver could be melted and coined.", "Gifts of plate were given to the Queen every New Year's Day, and she gave plate back."]);
function evbTpConfect() { evbSay("🍬 The confectioners make sugar sculptures, marchpane (marzipan) shaped like castles and animals, candied fruits and sugar plate. Sugar is the luxury of the age."); }
var evbTpCouncil = evbInfo("The council chamber", "The Privy Council meets here: the Queen's chief advisers. In 1600 the greatest of them is Sir Robert Cecil, the Secretary of State, son of the great Lord Burghley.");
function evbTpMusic() { return __ZC(367, 175, this, arguments, new.target); }
var evbTpWardrobe = evbInfo("The wardrobe of the robes", "When she died in 1603, Elizabeth was said to have owned some two thousand gowns. Many were stitched with pearls, and gowns were taken apart and remade, again and again.");
var evbTpLibrary = evbInfo("The library", "The Queen reads Greek and Latin and translates for pleasure. Books here are bound in velvet, with gilt clasps.");
var evbTpMaids = evbInfo("The maids of honour", "Young ladies of good family serve the Queen and wait on her. They need her permission to marry, and some who married without it found themselves in the Tower.");
var evbTpClock = evbInfo("The clock room", "Clocks are rare and costly: a clock that strikes the hours, made in Germany, is a gift fit for a queen.");
var evbTpPrivy = evbInfo("The privy chamber", "Only the Queen's closest servants and friends come in here. Her ladies of the privy chamber dress her, keep her jewels and sleep near her.");
var evbTpWindow = evbInfo("The gallery over the garden", "Below, the Privy Garden, laid out in squares with low hedges and painted posts, and the sundial. Beyond, the Thames, busy with boats.");
var evbTpBed = evbInfo("The bedchamber", "The bed is hung with cloth of gold and silver, the covers embroidered. A lady of the bedchamber sleeps on a pallet in the room.");
var evbTpStudy = evbInfo("The study", "Letters to answer from every court in Europe, in Latin, French and Italian; the Queen signs 'Elizabeth R'.");
function evbTpMasque() { evbTune([523, 659, 784, 659], 300, 0.7); evbSay("🎭 A masque: courtiers in fantastic costumes dance an allegory before the Queen, with painted scenery and music. The plays of the Lord Chamberlain's Men are acted at court each Christmas."); }
var evbTpPortrait = evbInfo("The portrait room", "The Queen's portraits are carefully controlled: in them she never ages. Painters copy approved 'face patterns' so that she always looks young.");
var evbTpBath = evbInfo("The bathing room", "A wooden tub lined with linen, filled by servants with jugs of hot water and herbs. It is said Elizabeth bathed once a month 'whether she needed it or no', which was thought very clean.");
function evbTlGate() { return __ZC(367, 176, this, arguments, new.target); }
var evbTlHall = evbInfo("The great hall", "The White Tower's walls are up to about 4.5 metres thick at the bottom. It was limewashed white under Henry III, which is how it got its name.");
var evbTlWall = evbInfo("The wall walk", "From the walls: the moat below, filled from the Thames; the river; London Bridge upstream; and the ships in the Pool of London.");
function evbTlArmoury() { return __ZC(367, 177, this, arguments, new.target); }
function evbTlMint() { evbTune([1047, 988, 1047], 150, 0.4); evbSay("🪙 The Royal Mint works inside the Tower walls, striking the coins of the realm by hand with hammer and die. It stayed in the Tower until 1810."); }
function evbTlJewel() { return __ZC(367, 178, this, arguments, new.target); }
function evbTlLions() { evbTune([110, 98, 87], 600, 1.4); evbSay("🦁 A roar from the Lion Tower: the royal menagerie, kept in the Tower for some six hundred years. In later years visitors paid three halfpence to see them, or brought a cat or dog to feed to the lions. The animals went to the new London Zoo in the 1830s."); }
var evbTlStore = evbInfo("The ordnance store", "Gunpowder, shot and cannon for the army and navy are stored and tested here, under the Office of Ordnance.");
var evbTlTraitor = evbInfo("The water gate", "Prisoners brought by boat from Westminster come in by this gate from the river, and so it got its name: Traitors' Gate. Anne Boleyn came this way in 1536. Princess Elizabeth was held in the Tower for two months in 1554, afraid she would never leave.");
var evbTlRecords = evbInfo("The records office", "The kingdom's old records are kept here: rolls of parchment going back centuries, laws, charters and accounts.");
function evbTlBeauchamp() { return __ZC(367, 179, this, arguments, new.target); }
var evbTlWarder = evbInfo("The warders' room", "Warders live in the Tower with their families. Some have kept prisoners here for years, and become something like their friends.");
var evbTlWell = evbInfo("The well room", "A fortress must hold out against a siege, so the White Tower has its own well inside, deep in the wall.");
var evbTlKitchen = evbInfo("The garrison kitchen", "The garrison eats beef, bread and beer. A prisoner of rank pays for their own food, and may live well enough.");
function evbTlBell() { evbTune([392, 392, 392], 900, 1.6); evbSay("🔔 The bell in the Bell Tower rings the curfew each evening, telling everyone within the walls to come in. Sir Thomas More was held in the Bell Tower in 1534-35."); }
function evbTlSmith() { evbTune([1047, 1047, 880], 150, 0.6); evbSay("🔨 The armourer hammers out a dent in a breastplate, then polishes it bright. A good armourer can fit a suit so well that a man in it can run, mount a horse and lie down."); }
var evbTlStair = evbInfo("The spiral stair", "Spiral stairs in castles usually turn clockwise as you go up, so attackers coming up have their sword arm against the wall. (Historians now argue about whether that was really the reason.)");
var evbTlBanquet = evbInfo("The banqueting hall", "When a monarch was crowned, they traditionally spent the night before in the Tower, then rode in procession through the City to Westminster.");
var evbTlWindow = evbInfo("The window over the river", "Ships sail up past the Tower to the bridge; ships passing the Tower were once expected to salute it.");
function evbTlChapel() { evbTune([262, 330, 392, 330, 262], 500, 1.2); evbSay("⛪ The Chapel of St John the Evangelist: plain round Norman arches of pale Caen stone, built in the 1080s. It is one of the oldest church interiors in London still standing."); }
var evbTlCouncil = evbInfo("The council chamber", "Kings and queens held council here in times of danger; the Tower was the safest place in London.");
var evbTlKing = evbInfo("The king's chamber", "Medieval kings lived in the Tower as a palace, with painted chambers and glass windows. By 1600 the royal lodgings are used only before coronations.");
var evbTlCell = evbInfo("The cell", "Sir Walter Raleigh will be held in the Tower for thirteen years from 1603, in rooms in the Bloody Tower, where he writes his History of the World and walks on the wall that is still called Raleigh's Walk.");
var evbTlMaps = evbInfo("The map room", "Maps of the kingdom's coasts and harbours, its forts and beacons: in 1588, when the Spanish Armada came, a chain of beacon fires carried the news across England in hours.");
"use strict";
evbRooms({
tiyard: { sides: ["barrel", "trtrough", "evb_cart", "barrel"], far: ["evb_horse"], rug: false, ceil: null, acts: [[0.35, 0, 2.2, "The inn yard", "read", evbTiYard]] },
titap: { far: ["fireplace", "cask", "cask"], sides: ["benchin", "longtable", "benchin", "barrel", "evb_pewter"], mid: [["longtable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 2.0, "The taproom", "sit down", evbTiTap]] },
tigallery: { sides: ["benchin", "barrel", "benchin", "footchest"], acts: [[0.5, 0, 1.8, "The gallery", "read", evbTiGallery]] },
tikitchen: { far: ["evb_spit", "evb_spit", "oven"], sides: ["butcherblock", "trcopper", "trbreadrack", "shelfgoods", "herbrack"], mid: [["longtable", 0.55, 0]], ceil: "lantern", rug: false, acts: [[0.5, 0, 2.2, "The inn kitchen", "read", evbTiKitchen]] },
ticellar: { far: ["cask", "cask", "cask"], sides: ["barrel", "cask", "barrel", "cask"], rug: false, ceil: "lantern", acts: [[0.5, 0, 1.8, "The barrels", "read", evbTiCellar]] },
tistable: { sides: ["trstall", "trstall", "trstall"], far: ["evb_horse", "trhay"], mid: [["evb_horse", 0.5, 0]], rug: false, acts: [[0.4, 0.3, 1.8, "The horses", "read", evbTiStable]] },
tiostler: { far: ["bed", "bed"], sides: ["trsaddles", "footchest", "trsaddles"], acts: [[0.5, 0, 1.8, "The ostlers", "read", evbTiOstler]] },
tiwagon: { mid: [["evb_cart", 0.5, 0]], sides: ["trsacks", "crates", "barrel", "trsacks"], rug: false, acts: [[0.5, 0.3, 1.8, "The wagons", "read", evbTiWagon]] },
tihost: { far: ["desk", "footchest"], sides: ["keyrack", "bookshelf", "treasurechest"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The reckoning", "read", evbTiHost]] },
tiparlour: { far: ["fireplace"], sides: ["armchair", "painting", "armchair", "evb_pewter"], mid: [["wd:kf_table", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The parlour", "read", evbTiParlour]] },
tiplay: { far: ["footchest", "footchest", "painting"], sides: ["dressform", "footchest", "dressform", "banner"], mid: [["benchin", 0.5, 0]], acts: [[0.5, 0, 1.8, "The players", "watch", evbTiPlay]] },
tichamber: { grid: ["bed", 2, 3, "-u", 0.3, 0.7], sides: ["footchest", "footchest"], acts: [[0.5, 0, 1.8, "The chamber", "read", evbTiChamber]] },
tiover: { sides: ["benchin", "footchest", "benchin"], far: ["chair", "wd:kf_table"], acts: [[0.5, 0, 1.8, "The yard below", "look down", evbTiOver]] },
tibest: { far: ["fourposter"], sides: ["footchest", "fireplace", "chair", "wardrobe"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The best chamber", "read", evbTiBest]] },
tiroom: { far: ["bed", "treasurechest"], sides: ["footchest", "desk", "chair"], acts: [[0.5, 0, 1.8, "The merchant's chest", "read", evbTiRoom]] },
tidorm: { grid: ["bed", 2, 3, "-u", 0.3, 0.7], sides: ["footchest", "footchest", "footchest"], acts: [[0.5, 0, 1.8, "The beds", "read", evbTiDorm]] },
tilinen: { far: ["shelfgoods", "shelfgoods"], sides: ["footchest", "wardrobe", "footchest", "shelfgoods"], acts: [[0.5, 0, 1.8, "The linen", "read", evbTiLinen]] },
tpguard: { sides: ["weaponrack", "armourstand", "weaponrack", "armourstand", "hallbanner"], far: ["fireplace"], ceil: "ironchandelier", acts: [[0.35, 0, 2.0, "The yeomen", "read", evbTpGuard]] },
tppresence: { far: ["grandthrone"], sides: ["hallbanner", "painting", "hallbanner", "painting"], mid: [["redrunner", 0.4, 0, "+u"]], ceil: "chandelier", acts: [[0.55, 0, 2.2, "The throne", "bow", evbTpPresence]] },
tplong: { sides: ["painting", "painting", "painting", "painting", "painting", "painting"], far: ["esbust", "esglobe"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The portraits", "walk the gallery", evbTpLong]] },
tpkitchen: { far: ["evb_spit", "evb_spit", "oven", "oven"], sides: ["butcherblock", "trcopper", "trbreadrack", "herbrack", "shelfgoods", "barrel"], mid: [["longtable", 0.55, 0], ["feasttable", 0.75, 0]], ceil: "lantern", rug: false,
acts: [[0.5, 0, 2.2, "The great kitchen", "read", evbTpKitchen]] },
tpchapel: { grid: ["pew", 2, 3, "-u", 0.35, 0.72], far: ["altarinside"], sides: ["candles", "esorgan", "candles"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The chapel", "read", evbTpChapel]] },
tpclose: { far: ["lectern"], sides: ["chair", "candles", "painting"], acts: [[0.5, 0, 1.8, "The closet", "read", evbTpClose]] },
tpsilver: { far: ["evb_pewter", "displaycase", "evb_pewter"], sides: ["displaycase", "goldpile", "displaycase", "treasurechest"], acts: [[0.5, 0, 1.8, "The plate", "read", evbTpSilver]] },
tpconfect: { far: ["oven", "shelfgoods"], sides: ["evb_jars", "counter", "evb_jars"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The sugar work", "read", evbTpConfect]] },
tpcouncil: { mid: [["longtable", 0.5, 0]], far: ["fireplace", "painting"], sides: ["chair", "chair", "chair", "chair", "chair", "chair"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The council table", "read", evbTpCouncil]] },
tpmusic: { far: ["evb_virginals", "evb_lute"], sides: ["chair", "esharp", "chair", "evb_lute"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The musicians", "dance", evbTpMusic]] },
tpwardrobe: { far: ["wardrobe", "wardrobe"], sides: ["dressform", "dressform", "evb_gowns", "dressform"], mid: [["wallmirror", 0.5, 0]], acts: [[0.5, 0, 1.8, "The gowns", "read", evbTpWardrobe]] },
tplibrary: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "lectern", "bookshelf", "esglobe"], mid: [["desk", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The books", "read", evbTpLibrary]] },
tpmaids: { far: ["bed", "bed"], sides: ["wallmirror", "wardrobe", "chair", "footchest"], acts: [[0.5, 0, 1.8, "The maids of honour", "read", evbTpMaids]] },
tpclock: { far: ["clock", "clock"], sides: ["displaycase", "clock", "displaycase"], acts: [[0.5, 0, 1.8, "The clocks", "read", evbTpClock]] },
tpprivy: { far: ["fireplace", "armchair"], sides: ["painting", "chair", "evb_virginals", "chair", "painting"], mid: [["wd:kf_table", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The privy chamber", "read", evbTpPrivy]] },
tpwindow: { sides: ["painting", "esbust", "painting"], far: ["chair", "chair"], acts: [[0.5, 0, 1.8, "The garden below", "look out", evbTpWindow]] },
tpbed: { far: ["fourposter"], sides: ["wardrobe", "wallmirror", "footchest", "chair", "painting"], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The bed", "read", evbTpBed]] },
tpstudy: { far: ["desk", "bookshelf"], sides: ["lectern", "esglobe", "bookshelf"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The letters", "read", evbTpStudy]] },
tpmasque: { far: ["banner", "painting", "banner"], sides: ["chair", "chair", "chair", "chair"], mid: [["evb_rug_dance", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The masque", "watch", evbTpMasque]] },
tpportrait: { sides: ["painting", "painting", "painting", "painting"], far: ["painting", "painting"], mid: [["evb_easel", 0.5, 0]], acts: [[0.5, 0, 1.8, "The portraits", "read", evbTpPortrait]] },
tpbath: { mid: [["vcbath", 0.5, 0]], sides: ["vcbasin", "footchest", "herbrack"], acts: [[0.5, 0, 1.8, "The bath", "read", evbTpBath]] },
tlgate: { sides: ["weaponrack", "armourstand", "weaponrack", "keyrack"], far: ["hallbanner", "hallbanner"], rug: false, ceil: "ironchandelier", acts: [[0.35, 0, 2.2, "The warder", "ask a question", evbTlGate]] },
tlhall: { far: ["fireplace", "hallbanner"], sides: ["armourstand", "hallbanner", "armourstand", "weaponrack"], mid: [["longtable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The walls", "read", evbTlHall]] },
tlwall: { sides: ["weaponrack", "barrel", "weaponrack"], far: ["armourstand"], rug: false, acts: [[0.5, 0, 1.8, "The view", "look out", evbTlWall]] },
tlarmoury: { grid: ["armourstand", 2, 3, "-u", 0.3, 0.7], far: ["weaponrack", "weaponrack", "weaponrack"], sides: ["weaponrack", "armourstand", "weaponrack", "armourstand"], ceil: "ironchandelier",
acts: [[0.5, 0, 2.0, "The armour", "read", evbTlArmoury]] },
tlmint: { far: ["anvil", "workbench"], sides: ["treasurechest", "goldpile", "workbench"], mid: [["anvil", 0.5, 0]], rug: false, acts: [[0.5, 0.2, 1.8, "The coining bench", "strike a coin", evbTlMint]] },
tljewel: { mid: [["crownstand", 0.5, 0]], sides: ["displaycase", "goldhoard", "displaycase", "treasurechest"], far: ["gemheap"], ceil: "chandelier", acts: [[0.5, 0.2, 1.8, "The regalia", "look", evbTlJewel]] },
tllions: { sides: ["cellbars", "pelt", "cellbars"], far: ["cellbars"], mid: [["pelt", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The lions", "listen", evbTlLions]] },
tlstore: { grid: ["barrel", 2, 2], far: ["crates", "crates"], sides: ["barrel", "crates", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The store", "read", evbTlStore]] },
tltraitor: { far: ["evb_canoe"], sides: ["lantern", "barrel", "weaponrack"], rug: false, acts: [[0.5, 0, 1.8, "The water gate", "read", evbTlTraitor]] },
tlrecords: { far: ["bookshelf", "bookshelf", "mapchest"], sides: ["bookshelf", "filecabinet", "bookshelf", "lectern"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The rolls", "read", evbTlRecords]] },
tlbeauchamp: { far: ["bed", "footchest"], sides: ["chair", "candles", "lectern"], rug: false, acts: [[0.5, 0, 1.8, "The carvings", "read one", evbTlBeauchamp]] },
tlwarder: { far: ["fireplace", "weaponrack"], sides: ["chair", "longtable", "chair", "keyrack"], acts: [[0.5, 0, 1.8, "The warders", "read", evbTlWarder]] },
tlwell: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "lantern", "barrel"], rug: false, acts: [[0.5, 0.25, 1.8, "The well", "read", evbTlWell]] },
tlkitchen: { far: ["evb_spit", "oven"], sides: ["butcherblock", "barrel", "trbreadrack", "cask"], mid: [["longtable", 0.55, 0]], rug: false, ceil: "lantern", acts: [[0.5, 0, 1.8, "The kitchen", "read", evbTlKitchen]] },
tlbell: { mid: [["evb_bigbell", 0.5, 0]], sides: ["evb_bellrope", "lantern"], rug: false, acts: [[0.5, 0.25, 1.8, "The bell", "ring the curfew", evbTlBell]] },
tlsmith: { far: ["forge", "anvil"], sides: ["armourstand", "trtoolwall", "armourstand"], mid: [["anvil", 0.5, 0]], rug: false, acts: [[0.5, 0.2, 1.8, "The armourer", "watch", evbTlSmith]] },
tlstair: { sides: ["armourstand", "hallbanner", "lantern"], acts: [[0.4, 0, 1.8, "The stair", "read", evbTlStair]] },
tlbanquet: { mid: [["feasttable", 0.5, 0]], far: ["fireplace", "hallbanner"], sides: ["hallbanner", "armourstand", "hallbanner", "armourstand"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The banqueting hall", "read", evbTlBanquet]] },
tlwindow: { far: ["chair", "esglobe"], sides: ["armourstand", "lantern", "armourstand"], acts: [[0.5, 0, 1.8, "The river", "look out", evbTlWindow]] },
tlchapel: { grid: ["pew", 2, 3, "-u", 0.35, 0.72], far: ["altarinside"], sides: ["candles", "evb_doric", "candles", "evb_doric"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The chapel", "listen", evbTlChapel]] },
tlcouncil: { mid: [["longtable", 0.5, 0]], far: ["fireplace", "hallbanner"], sides: ["chair", "chair", "chair", "chair", "chair"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The council", "read", evbTlCouncil]] },
tlking: { far: ["fourposter", "fireplace"], sides: ["painting", "hallbanner", "chair", "footchest"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The king's chamber", "read", evbTlKing]] },
tlcell: { far: ["bed", "desk"], sides: ["chair", "bookshelf", "candles"], rug: false, acts: [[0.5, 0, 1.8, "The cell", "read", evbTlCell]] },
tlmaps: { mid: [["maptable", 0.5, 0]], far: ["mapchest", "bookshelf"], sides: ["esglobe", "mapchest", "painting"], acts: [[0.5, 0, 1.8, "The maps", "read", evbTlMaps]] }
});
"use strict";
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var K = EVBK, G = K.G, B = K.B, Cy = K.Cy, S = K.S, M = evbM, GILT = evbGilt;
var P = {};
P.evb_cassone = function () {
var g = G(), wd = M(0x6A3A1A, "wood");
B(g, wd, 1.7, 0.6, 0.6, 0, 0.42, 0);
B(g, GILT(), 1.76, 0.06, 0.66, 0, 0.75, 0);
B(g, GILT(), 1.76, 0.06, 0.66, 0, 0.12, 0);
B(g, M(0x2A4A7A), 1.3, 0.36, 0.01, 0, 0.43, 0.305);
[-0.35, 0, 0.35].forEach(function (x, i) { B(g, M([0xC83A2A, 0xE8C860, 0x3A7A3A][i]), 0.18, 0.22, 0.01, x, 0.42, 0.31); });
[[-0.78, -0.24], [0.78, -0.24], [-0.78, 0.24], [0.78, 0.24]].forEach(function (q) { S(g, GILT(), 0.07, q[0], 0.06, q[1], 8); });
return g;
};
P.evb_goldbench = function () {
var g = G(), wd = M(0x7A5A3A, "wood");
B(g, wd, 1.4, 0.08, 0.6, 0, 0.9, 0);
[[-0.6, -0.22], [0.6, -0.22], [-0.6, 0.22], [0.6, 0.22]].forEach(function (q) { B(g, wd, 0.06, 0.9, 0.06, q[0], 0.45, q[1]); });
B(g, M(0x2A2A2A), 0.12, 0.1, 0.08, -0.35, 1.0, 0);
Cy(g, M(0x8A8A88), 0.06, 0.08, 0.12, 0.35, 1.0, -0.1, 8);
S(g, evbGlow(0xFFC860, 0.85), 0.04, 0.35, 1.1, -0.1, 8);
[-0.1, 0, 0.1].forEach(function (x) { S(g, GILT(), 0.025, x, 0.96, 0.12, 8); });
B(g, M(0xF0E8D8), 0.4, 0.02, 0.3, 0.05, 0.4, 0.0);
return g;
};
P.evb_colours = function () {
var g = G(), wd = M(0x6A4A2A, "wood");
B(g, wd, 1.2, 0.8, 0.6, 0, 0.4, 0);
B(g, M(0x6A2A3A, "stone"), 0.6, 0.06, 0.45, -0.2, 0.83, 0);
Cy(g, M(0x5A2A3A, "stone"), 0.06, 0.07, 0.12, -0.2, 0.92, 0, 8);
[[0x2A3AC8, 0.25], [0xD8301A, 0.38], [0xC8901A, 0.51], [0x5A7A4A, 0.25], [0xF0ECE4, 0.38]].forEach(function (q, i) { Cy(g, M(0xE8E0D0), 0.05, 0.045, 0.08, q[1], 0.84, i < 3 ? -0.1 : 0.12, 8); Cy(g, M(q[0]), 0.045, 0.045, 0.01, q[1], 0.885, i < 3 ? -0.1 : 0.12, 8); });
return g;
};
Object.keys(P).forEach(function (k) { FURN[k] = P[k]; });
if (typeof SOLIDFURN !== "undefined")
["evb_cassone", "evb_goldbench", "evb_colours"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
var EVB_IT_REMAP = { "D6D0C6|plaster": [0xF0E4CC, "plaster"], "D8D0C0|coffer": [0x6A4A2A, "wood"] };
function evbCasaPlan(front) {
return [
{ hall: front.hall, spine: front.spine, gallery: { k: "cfloggia", n: "The Loggia" },
back: { merge: EVB_BACK, k: "cfcourt", n: "The Courtyard and the Well" },
r1i: { k: "cfcellar", n: "The Wine Cellar" }, r1o: { k: "cfoil", n: "The Oil Store" },
r2i: { k: "cfcount", n: "The Counting Room" }, r2o: { k: "cfgrain", n: "The Grain Store" },
r3i: { k: "cfstable", n: "The Mule Stable" }, r3o: { k: "cfgarden", n: "The Little Garden" },
l1i: { k: "cfsala", n: "The Sala" }, l1o: { k: "cfchild", n: "The Children's Room" },
l2i: { k: "cfchapel", n: "The Family Altar" }, l2o: { k: "cfservant", n: "The Servants' Room" },
l3i: { k: "cfletters", n: "The Letter Room" }, l3o: { k: "cfbath", n: "The Washing Room" } },
{ hall: { k: "cflanding", n: "The Stair Head" }, spine: { k: "cfcamera", n: "The Camera, the Great Bedchamber" }, gallery: { k: "cfwindow", n: "The Window on the Street" },
back: { merge: EVB_BACK, k: "cfkitchen", n: "The Kitchen under the Roof" },
r1: { merge: ["r1i", "r1o"], k: "cfstudy", n: "The Scrittoio" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "cfdine", n: "The Dining Room" },
l1: { merge: ["l1i", "l1o"], k: "cfloom", n: "The Spinning Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "cfaltana", n: "The Altana, the Roof Terrace" } }
];
}
function evbCasa(key, o) {
evbTheme(key, { corner: o.corner || "evb_amphora", seed: o.seed, panel: 0xE8D8B8, pal: Object.assign({ fab: "terracotta", fab2: "emerald", wood: "walnut", metal: "iron", stone: "sand", art: 2, rug: 5, rugv: 0 }, o.pal || {}), remap: EVB_IT_REMAP, hello: o.hello });
evbHouse(key, { g: EVB_GRID.mid, h: 4.2, levels: 2, stairX: 3.5, stairZ: 11, floors: [o.f0 || "The ground floor", "The family's floors"], wall: 0xF0E4CC, trim: 0x6A4A2A, plan: evbCasaPlan(o) });
}
evbCasa("casafi", { seed: 111, f0: "The ground floor", hall: { k: "cfentry", n: "The Androne, the Entrance Passage" }, spine: { k: "cfstore", n: "The Storerooms" },
hello: "🏠 <b>Inside a Florentine house.</b> Stores and a little courtyard with a well below, the family's rooms above, and the kitchen right under the roof. Look for the ✨ cards. The way out is the street door." });
evbCasa("bottegapittore", { seed: 113, pal: { fab: "navy", fab2: "mustard" }, f0: "The workshop floor", hall: { k: "cfshoppaint", n: "The Painter's Bottega" }, spine: { k: "cfworkpaint", n: "The Colour Room" },
hello: "🎨 <b>Inside a painter's bottega.</b> Panels drying against the walls, apprentices grinding colours, the master at his easel. Look for the ✨ cards. The way out is the workshop door." });
evbCasa("bottegaorafo", { seed: 115, pal: { fab: "crimson", fab2: "mustard", metal: "gold" }, f0: "The workshop floor", hall: { k: "cfshopgold", n: "The Goldsmith's Shop" }, spine: { k: "cfworkgold", n: "The Goldsmith's Workshop" },
hello: "💍 <b>Inside a goldsmith's shop.</b> Rings, cups and buckles in the window, the little forge and the benches behind. Look for the ✨ cards. The way out is the shop door." });
evbCasa("bottegalana", { seed: 117, pal: { fab: "plum", fab2: "teal" }, f0: "The warehouse floor", hall: { k: "cfshopwool", n: "The Wool Merchant's Shop" }, spine: { k: "cfworkwool", n: "The Warehouse" },
hello: "🧶 <b>Inside a wool merchant's house.</b> Bales of English wool, bolts of fine dyed cloth, and the ledgers that made Florence rich. Look for the ✨ cards. The way out is the street door." });
var EVB_IT_SHOPS = ["bottegapittore", "bottegaorafo", "bottegalana"];
function evbItShop(x, z) { return EVB_IT_SHOPS[Math.abs(Math.round(x * 5.31 + z * 2.17)) % EVB_IT_SHOPS.length]; }
var EVB_IT_NAMES = { casafi: "A house", bottegapittore: "A painter's bottega", bottegaorafo: "A goldsmith's shop", bottegalana: "A wool merchant's house", palazzofi: "A palazzo", castello: "A castle", maisonfr: "A house", stable: "A barn" };
evbTheme("palazzofi", { corner: "esbust", seed: 119, panel: 0xE8DCC4, pal: { fab: "crimson", fab2: "navy", wood: "walnut", metal: "gold", stone: "marble", art: 2, rug: 1, rugv: 0 }, remap: EVB_IT_REMAP,
hello: "🏛️ <b>Inside a Florentine palazzo.</b> Rough stone below, smooth above; the great courtyard with its arcade; up the stair, the piano nobile with its painted rooms, the chapel and the studiolo. Look for the ✨ cards. The way out is the great door." });
evbHouse("palazzofi", { g: EVB_GRID.wide, h: 5.6, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The courtyard floor", "The piano nobile"], wall: 0xF0E4CC, trim: 0x6A4A2A,
plan: [{ hall: { k: "pzentry", n: "The Great Doorway" }, spine: { k: "pzcourt", n: "The Courtyard" }, gallery: { k: "pzarcade", n: "The Arcade" },
back: { merge: EVB_BACK, k: "pzgarden", n: "The Garden with its Statues" },
r1i: { k: "cfcellar", n: "The Wine Cellar" }, r1o: { k: "pzbank", n: "The Bank" },
r2i: { k: "pzstable", n: "The Stables" }, r2o: { k: "pzguard", n: "The Guard Room" },
r3i: { k: "cfoil", n: "The Oil Store" }, r3o: { k: "cfgrain", n: "The Grain Store" },
l1i: { k: "pzsculpt", n: "The Sculpture Room" }, l1o: { k: "pzsteward", n: "The Steward's Room" },
l2i: { k: "cfservant", n: "The Servants' Hall" }, l2o: { k: "pzlibrary", n: "The Library" },
l3i: { k: "pzmusic", n: "The Music Room" }, l3o: { k: "pzarms", n: "The Armoury" } },
{ hall: { k: "pzstair", n: "The Stair Landing" }, spine: { k: "pzsala", n: "The Great Sala" }, gallery: { k: "pzgallery", n: "The Painted Gallery" },
back: { merge: EVB_BACK, k: "pzchapel", n: "The Chapel of the Magi" },
r1: { merge: ["r1i", "r1o"], k: "pzstudiolo", n: "The Studiolo" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "pzcamera", n: "The Camera" },
l1: { merge: ["l1i", "l1o"], k: "pzbanquet", n: "The Banqueting Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "cfkitchen", n: "The Kitchens" } }] });
evbFins({
cfentry: ["stone", 0x9A9078, 0xF0E4CC, "plaster", 0x6A4A2A], cfstore: ["stone", 0x8A8068, 0xE8D8B8, "plaster", 0x6A4A2A], cfloggia: ["stone", 0xA89A80, 0xF0E4CC, "plaster", 0x6A4A2A],
cfcourt: ["stone", 0xA89A80, 0xF0E4CC, "stone", 0x8A7A5A], cfcellar: ["stone", 0x7A7058, 0xC8B898, "stone", 0x5A4A3A], cfoil: ["stone", 0x7A7058, 0xD8C8A8, "stone", 0x5A4A3A],
cfcount: ["wood", 0x6A4A2A, 0xF0E4CC, "wood", 0x6A4A2A], cfgrain: ["stone", 0x8A8068, 0xD8C8A8, "plaster", 0x5A4A3A], cfstable: ["stone", 0x8A7A5A, 0xC8B898, "wood", 0x6A4A2A],
cfgarden: ["stone", 0x9A9078, 0xE8DCC0, "plaster", 0x3A6A3A], cfsala: ["tile", 0xB86A4A, 0xF0E4CC, "plaster", 0x6A4A2A, 0x6A4A2A], cfchild: ["tile", 0xB86A4A, 0xF4ECD8, "plaster", 0x6A4A2A],
cfchapel: ["tile", 0xB86A4A, 0xF0E4CC, "damask", 0xC8A040], cfservant: ["tile", 0xA85A3A, 0xE8D8B8, "plaster", 0x6A4A2A], cfletters: ["wood", 0x6A4A2A, 0xF0E4CC, "wood", 0x6A4A2A],
cfbath: ["tile", 0xC8C0B0, 0xF0E4CC, "tile", 0x6A4A2A], cflanding: ["stone", 0x9A9078, 0xF0E4CC, "plaster", 0x6A4A2A], cfcamera: ["tile", 0xB86A4A, 0xF0E4CC, "damask", 0xC8A040, 0x6A4A2A],
cfwindow: ["tile", 0xB86A4A, 0xF0E4CC, "plaster", 0x6A4A2A], cfkitchen: ["tile", 0xA85A3A, 0xE8D8B8, "plaster", 0x4A3A2A, 0x5A4A3A], cfstudy: ["wood", 0x6A4A2A, 0xF0E4CC, "wood", 0x6A4A2A],
cfdine: ["tile", 0xB86A4A, 0xF0E4CC, "plaster", 0x6A4A2A, 0x6A4A2A], cfloom: ["tile", 0xB86A4A, 0xF4ECD8, "plaster", 0x6A4A2A], cfaltana: ["tile", 0xC87A5A, 0xF0E4CC, "plaster", 0x6A4A2A],
cfshoppaint: ["stone", 0x9A9078, 0xF0E4CC, "plaster", 0x2A3A6A], cfworkpaint: ["stone", 0x8A8068, 0xE8D8B8, "plaster", 0x2A3A6A],
cfshopgold: ["stone", 0x9A9078, 0xF0E4CC, "plaster", 0xC8A040], cfworkgold: ["stone", 0x8A8068, 0xE8D8B8, "plaster", 0xC8A040],
cfshopwool: ["wood", 0x7A5A3A, 0xF0E4CC, "plaster", 0x5A2A4A], cfworkwool: ["stone", 0x8A8068, 0xE8D8B8, "plaster", 0x5A2A4A],
pzentry: ["stone", 0x8A8068, 0xE0D4BC, "stone", 0x6A4A2A, 0x6A4A2A], pzcourt: ["stone", 0xA89A80, 0xF0E4CC, "stone", 0x8A7A5A], pzarcade: ["stone", 0xA89A80, 0xF0E4CC, "stone", 0x8A7A5A],
pzgarden: ["stone", 0x9A9078, 0xE8DCC0, "stone", 0x3A6A3A], pzbank: ["wood", 0x5A3A22, 0xF0E4CC, "wood", 0xC8A040], pzstable: ["stone", 0x8A7A5A, 0xC8B898, "wood", 0x6A4A2A],
pzguard: ["stone", 0x8A8068, 0xD8C8A8, "stone", 0x6A4A2A], pzsculpt: ["stone", 0xC8C0B0, 0xF0ECE4, "stone", 0x8A8478], pzsteward: ["wood", 0x6A4A2A, 0xF0E4CC, "wood", 0x6A4A2A],
pzlibrary: ["wood", 0x5A3A22, 0xF0E4CC, "wood", 0xC8A040], pzmusic: ["wood", 0x6A4A2A, 0xF0E4CC, "damask", 0xC8A040], pzarms: ["stone", 0x8A8068, 0xD8C8A8, "stone", 0x6A4A2A],
pzstair: ["stone", 0xC8C0B0, 0xF0E4CC, "stone", 0xC8A040], pzsala: ["checker", 0xE8E0D0, 0xF0E4CC, "damask", 0xC8A040, 0x2A3A6A], pzgallery: ["tile", 0xB86A4A, 0xF0E4CC, "plaster", 0xC8A040, 0x2A3A6A],
pzchapel: ["checker", 0xE8E0D0, 0xF0E4CC, "damask", 0xC8A040, 0x2A3A6A], pzstudiolo: ["wood", 0x5A3A22, 0xE8D8B8, "wood", 0xC8A040, 0x2A3A6A], pzcamera: ["tile", 0xB86A4A, 0xF0E4CC, "damask", 0xC8A040, 0x6A4A2A],
pzbanquet: ["checker", 0xE8E0D0, 0xF0E4CC, "damask", 0xC8A040, 0x6A4A2A]
});
"use strict";
var evbCfEntry = evbInfo("The androne", "The wide entrance passage runs from the street to the courtyard, big enough for a mule with its load. Florentine houses keep a plain face to the street; the life of the house looks inward, to the courtyard.");
var evbCfStore = evbFact("The storerooms", ["Wine and oil come in from the family's farm in the country, the podere, each autumn: most Florentine families of any standing own land outside the walls.", "Grain is stored against hard times; in famine years the city itself buys grain to keep bread on the table.", "Kindling, charcoal for the braziers, and casks of vinegar."]);
var evbCfLoggia = evbInfo("The loggia", "An open arcade where the family meets friends, holds weddings and watches the street. The Rucellai family's loggia stands across the little square from their palace, built in the 1460s.");
function evbCfCourt() { return __ZC(367, 180, this, arguments, new.target); }
var evbCfCellar = evbInfo("The wine cellar", "Chianti and the red wines of the hills round Florence, in casks and in straw-wrapped flasks. Wine is drunk mixed with water, at every meal.");
var evbCfOil = evbInfo("The oil store", "Great terracotta jars of olive oil, for cooking, for the lamps and for the table. A good year's oil is a family's pride.");
function evbCfCount() { return __ZC(367, 181, this, arguments, new.target); }
var evbCfGrain = evbInfo("The grain store", "Sacks of wheat from the farm. Bread is baked at home and taken to the public oven, or bought from the baker; Tuscan bread is made without salt, as it still is.");
var evbCfStable = evbInfo("The mule stable", "A mule carries the family's goods and a rider over the hills; horses are for the rich. The stable door opens straight onto the courtyard.");
var evbCfGarden = evbInfo("The little garden", "Herbs for the kitchen and for medicine, a fig tree, roses, a vine on a trellis: even a small town house may have a patch of green behind.");
var evbCfSala = evbInfo("The sala", "The main room of the house: a table, benches, a cupboard showing the family's best dishes of painted maiolica, and the family's coat of arms over the fireplace.");
function evbCfChild() { evbSay("👶 A wooden cradle, a walking frame on wheels, a hobby horse and a doll. Children of merchants learn their letters at home, then go to an abacus school to learn the reckoning they will need in business."); }
var evbCfChapel = evbInfo("The family altar", "A painting of the Madonna and Child, a lamp kept burning before it, and a little kneeling desk. Florentines commission such paintings from the bottegas by the thousand.");
var evbCfServant = evbInfo("The servants' room", "A merchant household keeps a cook, a maid, a nurse for the children and a man to carry and run errands. Many servants came from the country round.");
var evbCfLetters = evbInfo("The letter room", "Merchants write letters every day to their partners in Bruges, London, Venice and Constantinople; letters take weeks to arrive, and are copied into a letter book first.");
var evbCfBath = evbInfo("The washing room", "Water heated on the fire, a wooden tub, linen towels, and soap from Venice or Spain made with olive oil.");
var evbCfLanding = evbInfo("The stair head", "A steep stone stair climbs to the family's floors. The higher you go, the further from the noise and smell of the street.");
function evbCfCamera() { return __ZC(367, 182, this, arguments, new.target); }
var evbCfWindow = evbInfo("The window on the street", "From up here: the bells of the city's churches, the cries of the water-sellers, and Brunelleschi's great dome over the rooftops.");
function evbCfKitchen() { return __ZC(367, 183, this, arguments, new.target); }
var evbCfStudy = evbInfo("The scrittoio", "A small study with a desk and a locked chest for the family's papers: deeds of land, marriage contracts, the ricordanze, the family's own book of births, deaths and dealings.");
function evbCfDine() { return __ZC(367, 184, this, arguments, new.target); }
var evbCfLoom = evbInfo("The spinning room", "The women of the house spin, sew and embroider. Silk weaving is the city's other great trade after wool.");
function evbCfAltana() { evbTune([523, 659, 784], 400, 0.8); evbSay("🌇 The altana, a covered terrace on the roof: the breeze, the evening light on the dome, and washing drying in the sun."); }
function evbCfShopPaint() { return __ZC(367, 185, this, arguments, new.target); }
function evbCfWorkPaint() { return __ZC(367, 186, this, arguments, new.target); }
function evbCfShopGold() { return __ZC(367, 187, this, arguments, new.target); }
function evbCfWorkGold() { evbTune([1319, 1175, 1319], 120, 0.3); evbSay("🔨 Tap, tap: the goldsmith sets a stone, chases a pattern into a cup, and engraves silver. Engravers filled their lines with a black paste to see the design, and printing from engraved plates grew out of this craft."); }
function evbCfShopWool() { return __ZC(367, 188, this, arguments, new.target); }
var evbCfWorkWool = evbInfo("The warehouse", "Bales of wool stacked to the roof, ledgers on the desk, and the merchant's mark on every bale so it can be traced across Europe.");
var evbPzEntry = evbInfo("The great doorway", "Great rough-cut stones on the ground floor, smoother stone higher up: a palazzo looks like a fortress, and in a city of feuding families, it partly is. Iron rings in the wall are for tying horses; torch-holders for the nights.");
function evbPzCourt() { return __ZC(367, 189, this, arguments, new.target); }
var evbPzArcade = evbInfo("The arcade", "Round arches on columns, as Brunelleschi built them, light and even: the new style, taken from ancient Rome.");
var evbPzGarden = evbInfo("The garden", "Box hedges, lemon trees in pots, and ancient statues dug up in Rome. Lorenzo de' Medici kept a sculpture garden where young artists, the young Michelangelo among them, came to learn.");
var evbPzBank = evbInfo("The bank", "The family bank works at a bench, a banco, covered in green cloth. The Medici bank had branches in Rome, Venice, Geneva, Bruges and London, and kept the Pope's money.");
var evbPzStable = evbInfo("The stables", "Fine horses for the family, a mule for the steward, and grooms sleeping above. A good horse was a gift between princes.");
var evbPzGuard = evbInfo("The guard room", "Armed men at the door. In 1478 the Pazzi family tried to murder Lorenzo and his brother Giuliano at Mass in the cathedral: Giuliano was killed; Lorenzo escaped.");
var evbPzSculpt = evbInfo("The sculpture room", "Ancient marble heads and busts, bought from dealers in Rome and Naples. Collecting antiquities is the mark of a cultured family.");
var evbPzSteward = evbInfo("The steward's room", "The steward runs the household: the servants, the stores, the accounts, the farms. A great palazzo may have fifty people living in it.");
function evbPzLibrary() { evbSay("📚 Manuscripts copied by hand on vellum, and the new printed books: printing came to Florence about 1471. Lorenzo's library had Greek manuscripts brought from Constantinople."); }
function evbPzMusic() { evbTune([392, 440, 494, 523, 494, 440], 280, 0.6); evbSay("🎶 Lutes and viols, and songs for carnival, some of them written by Lorenzo himself: 'Quant'è bella giovinezza' — how lovely is youth, but it flies away."); }
var evbPzArms = evbInfo("The armoury", "Swords, helmets and armour for the family's men, for jousts in the Piazza Santa Croce and for war. Florence hired soldiers, the condottieri, to fight for it.");
var evbPzStair = evbInfo("The stair landing", "A broad stone stair leads up to the piano nobile, the noble floor, where the family lives in state.");
var evbPzSala = evbInfo("The great sala", "The great hall of the palazzo: banquets, dances and receptions for ambassadors, under a painted wooden ceiling.");
var evbPzGallery = evbInfo("The painted gallery", "Paintings for the family's walls: battles, myths and portraits. Paolo Uccello's three panels of the Battle of San Romano hung in the Medici palace.");
function evbPzChapel() { evbTune([262, 330, 392, 523], 500, 1.2); evbSay("✨ In the chapel of the Medici palace, Benozzo Gozzoli painted the Magi riding to Bethlehem in 1459, with the Medici family themselves riding in the procession, in their finest clothes."); }
function evbPzStudiolo() { return __ZC(367, 190, this, arguments, new.target); }
var evbPzCamera = evbInfo("The camera", "The lord's bedchamber, where he also receives his closest friends and does business: a great bed, painted chests, and pictures on every wall.");
function evbPzBanquet() { evbSay("🍽️ A banquet: dishes of roasted peacock, pies, sugar sculptures and wine, with music between the courses. In 1497 the friar Savonarola had Florentines burn their mirrors, cards, fine clothes and paintings in a great 'bonfire of the vanities' in the Piazza della Signoria."); }
"use strict";
evbRooms({
cfentry: { sides: ["evb_amphora", "benchin", "evb_amphora"], far: ["plant"], rug: false, acts: [[0.35, 0, 2.0, "The androne", "read", evbCfEntry]] },
cfstore: { far: ["barrel", "cask", "barrel"], sides: ["trsacks", "evb_amphora", "trsacks", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The stores", "read", evbCfStore]] },
cfloggia: { sides: ["evb_doric", "benchin", "evb_doric", "benchin"], far: ["evb_doric", "evb_doric"], rug: false, acts: [[0.5, 0, 1.8, "The loggia", "read", evbCfLoggia]] },
cfcourt: { mid: [["evb_well", 0.5, 0]], sides: ["plant", "evb_amphora", "benchin", "plant", "evb_amphora"], far: ["evb_doric", "evb_doric", "evb_doric"], rug: false, ceil: null, acts: [[0.5, 0.25, 2.0, "The well", "draw water", evbCfCourt]] },
cfcellar: { far: ["cask", "cask", "cask"], sides: ["barrel", "cask", "barrel", "cask"], rug: false, ceil: "lantern", acts: [[0.5, 0, 1.8, "The wine", "read", evbCfCellar]] },
cfoil: { grid: ["evb_amphora", 2, 3], sides: ["evb_amphora", "evb_amphora"], rug: false, acts: [[0.5, 0, 1.8, "The oil jars", "read", evbCfOil]] },
cfcount: { far: ["desk", "treasurechest"], sides: ["bookshelf", "filecabinet", "bookshelf"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The ledgers", "count", evbCfCount]] },
cfgrain: { grid: ["trsacks", 2, 2], sides: ["trsacks", "barrel", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The grain", "read", evbCfGrain]] },
cfstable: { sides: ["trstall", "trhay", "trstall"], mid: [["evb_horse", 0.5, 0]], rug: false, acts: [[0.4, 0.3, 1.8, "The mule", "read", evbCfStable]] },
cfgarden: { sides: ["plant", "flowerbucket", "plant", "herbrack"], far: ["plant", "evb_amphora", "plant"], mid: [["evb_fountain", 0.5, 0]], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "The garden", "read", evbCfGarden]] },
cfsala: { far: ["fireplace", "evb_pewter"], sides: ["benchin", "painting", "benchin", "evb_cassone"], mid: [["longtable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The sala", "read", evbCfSala]] },
cfchild: { far: ["crib", "toys"], sides: ["evb_rocking", "footchest", "bed"], acts: [[0.5, 0, 1.8, "The children's things", "look", evbCfChild]] },
cfchapel: { far: ["altarinside"], sides: ["candles", "painting", "candles"], mid: [["lectern", 0.5, 0]], acts: [[0.5, 0, 1.8, "The Madonna", "read", evbCfChapel]] },
cfservant: { far: ["bed", "bed"], sides: ["footchest", "chair", "footchest"], acts: [[0.5, 0, 1.8, "The servants", "read", evbCfServant]] },
cfletters: { far: ["desk", "bookshelf"], sides: ["lectern", "filecabinet", "maptable"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The letters", "read", evbCfLetters]] },
cfbath: { mid: [["vcbath", 0.5, 0]], sides: ["vcbasin", "footchest", "wallmirror"], acts: [[0.5, 0, 1.8, "The bath", "read", evbCfBath]] },
cflanding: { sides: ["evb_amphora", "painting", "esbust"], acts: [[0.4, 0, 1.8, "The stair", "read", evbCfLanding]] },
cfcamera: { far: ["fourposter"], sides: ["evb_cassone", "painting", "evb_cassone", "chair"], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The camera", "look", evbCfCamera]] },
cfwindow: { far: ["chair", "wd:kf_table"], sides: ["evb_cassone", "plant"], acts: [[0.5, 0, 1.8, "The window", "look out", evbCfWindow]] },
cfkitchen: { far: ["fireplace", "oven", "herbrack"], sides: ["butcherblock", "shelfgoods", "evb_amphora", "barrel", "trbreadrack"], mid: [["longtable", 0.55, 0]], ceil: "lantern", rug: false,
acts: [[0.5, 0, 2.0, "The kitchen", "cook", evbCfKitchen]] },
cfstudy: { far: ["desk", "bookshelf"], sides: ["treasurechest", "lectern", "bookshelf"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The family book", "read", evbCfStudy]] },
cfdine: { far: ["evb_pewter", "fireplace"], sides: ["chair", "chair", "painting", "chair", "chair"], mid: [["longtable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The table", "sit down", evbCfDine]] },
cfloom: { far: ["loom", "evb_spindle"], sides: ["chair", "dressform", "footchest"], acts: [[0.5, 0, 1.8, "The loom", "read", evbCfLoom]] },
cfaltana: { sides: ["plant", "benchin", "plant", "evb_amphora"], far: ["chair", "chair"], rug: false, ceil: null, acts: [[0.5, 0, 1.8, "The terrace", "look out", evbCfAltana]] },
cfshoppaint: { far: ["evb_easel", "painting", "evb_easel"], sides: ["painting", "evb_easel", "painting", "evb_colours"], mid: [["evb_easel", 0.5, 0]], acts: [[0.4, 0, 2.0, "The bottega", "read", evbCfShopPaint]] },
cfworkpaint: { far: ["evb_colours", "evb_colours"], sides: ["workbench", "shelfgoods", "evb_easel"], mid: [["evb_colours", 0.5, 0]], acts: [[0.5, 0, 1.8, "The colours", "grind", evbCfWorkPaint]] },
cfshopgold: { far: ["displaycase", "displaycase"], sides: ["displaycase", "trcounter", "displaycase"], mid: [["trcounter", 0.5, 0]], ceil: "chandelier", acts: [[0.4, 0, 2.0, "The goldsmith's window", "choose", evbCfShopGold]] },
cfworkgold: { far: ["evb_goldbench", "evb_goldbench"], sides: ["anvil", "evb_goldbench", "forge"], acts: [[0.5, 0, 1.8, "The goldsmith", "watch", evbCfWorkGold]] },
cfshopwool: { far: ["evb_cloth", "evb_cloth"], sides: ["evb_cloth", "trcounter", "trsacks"], mid: [["trcuttable", 0.5, 0]], acts: [[0.4, 0, 2.0, "The cloth", "feel it", evbCfShopWool]] },
cfworkwool: { grid: ["trsacks", 2, 3], far: ["desk", "trsacks"], sides: ["trsacks", "bookshelf"], rug: false, acts: [[0.5, 0, 1.8, "The bales", "read", evbCfWorkWool]] },
pzentry: { sides: ["evb_amphora", "armourstand", "evb_amphora", "armourstand"], far: ["hallbanner"], rug: false, ceil: "ironchandelier", acts: [[0.35, 0, 2.0, "The doorway", "read", evbPzEntry]] },
pzcourt: { mid: [["goldstatue", 0.5, 0]], sides: ["evb_doric", "evb_doric", "plant", "evb_doric", "evb_doric"], far: ["evb_doric", "evb_doric", "evb_doric"], rug: false, ceil: null, acts: [[0.5, 0.2, 2.0, "The courtyard", "look round", evbPzCourt]] },
pzarcade: { far: ["evb_doric", "evb_doric", "evb_doric", "evb_doric"], sides: ["esbust", "plant", "esbust"], rug: false, acts: [[0.5, 0, 1.8, "The arches", "read", evbPzArcade]] },
pzgarden: { sides: ["plant", "esbust", "plant", "esbust", "plant"], far: ["evb_amphora", "plant", "evb_amphora"], mid: [["evb_fountain", 0.5, 0]], rug: false, ceil: null, acts: [[0.5, 0.25, 2.0, "The garden", "read", evbPzGarden]] },
pzbank: { far: ["counterbank", "treasurechest"], sides: ["desk", "goldpile", "desk"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The bank", "read", evbPzBank]] },
pzstable: { sides: ["trstall", "trstall", "trstall"], far: ["evb_horse", "trsaddles"], mid: [["evb_horse", 0.5, 0]], rug: false, acts: [[0.4, 0.3, 1.8, "The horses", "read", evbPzStable]] },
pzguard: { sides: ["weaponrack", "armourstand", "weaponrack"], far: ["longtable"], mid: [["benchin", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The guards", "read", evbPzGuard]] },
pzsculpt: { grid: ["esbust", 2, 3], sides: ["esbust", "goldstatue", "esbust"], acts: [[0.5, 0, 1.8, "The marbles", "read", evbPzSculpt]] },
pzsteward: { far: ["desk", "filecabinet"], sides: ["keyrack", "bookshelf", "chair"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The steward", "read", evbPzSteward]] },
pzlibrary: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "lectern", "bookshelf", "esglobe"], mid: [["desk", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The manuscripts", "read", evbPzLibrary]] },
pzmusic: { far: ["esharp", "evb_lute"], sides: ["chair", "evb_virginals", "chair"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The music", "listen", evbPzMusic]] },
pzarms: { sides: ["weaponrack", "armourstand", "weaponrack", "armourstand"], far: ["armourstand", "armourstand"], rug: false, acts: [[0.5, 0, 1.8, "The armour", "read", evbPzArms]] },
pzstair: { sides: ["esbust", "painting", "esbust"], acts: [[0.4, 0, 1.8, "The stair", "read", evbPzStair]] },
pzsala: { far: ["fireplace", "painting"], sides: ["painting", "chair", "chair", "painting", "evb_cassone"], mid: [["feasttable", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The sala", "read", evbPzSala]] },
pzgallery: { sides: ["painting", "painting", "painting", "painting", "painting"], far: ["esbust", "painting"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The paintings", "read", evbPzGallery]] },
pzchapel: { grid: ["pew", 2, 2, "-u", 0.35, 0.7], far: ["altarinside"], sides: ["painting", "candles", "painting", "candles"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The Magi", "look", evbPzChapel]] },
pzstudiolo: { far: ["desk", "bookshelf"], sides: ["bookshelf", "esglobe", "lectern", "bookshelf"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The studiolo", "look", evbPzStudiolo]] },
pzcamera: { far: ["fourposter"], sides: ["evb_cassone", "painting", "evb_cassone", "painting"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The camera", "read", evbPzCamera]] },
pzbanquet: { mid: [["feasttable", 0.5, 0]], far: ["fireplace", "painting"], sides: ["chair", "chair", "evb_pewter", "chair", "chair"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The banquet", "read", evbPzBanquet]] }
});
"use strict";
evbTheme("castello", { corner: "armourstand", seed: 121, panel: 0xD8CCB0, pal: { fab: "crimson", fab2: "mustard", wood: "oak", metal: "iron", stone: "sand", art: 3, rug: 4, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE0D4B8, "stone"], "D8D0C0|coffer": [0x5A4A3A, "wood"] },
hello: "🏰 <b>Inside the castle of Vinci.</b> The gate, the courtyard, the great hall of the Counts Guidi, the tower, the dungeon and the walls looking over the olive groves. Look for the ✨ cards. The way out is the gate." });
evbHouse("castello", { g: EVB_GRID.wide, h: 5.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The castle"], wall: 0xE0D4B8, trim: 0x5A4A3A,
plan: [{ hall: { k: "csgate", n: "The Gate" }, spine: { k: "cscourt", n: "The Courtyard" }, gallery: { k: "cswall", n: "The Walls" },
back: { merge: EVB_BACK, k: "cshall", n: "The Hall of the Counts" },
r1i: { k: "cstower", n: "The Tower at the Prow" }, r1o: { k: "csdungeon", n: "The Dungeon" },
r2i: { k: "pzarms", n: "The Armoury" }, r2o: { k: "cfcellar", n: "The Wine Cellar" },
r3i: { k: "pzstable", n: "The Stables" }, r3o: { k: "cfgrain", n: "The Granary" },
l1i: { k: "cschapel", n: "The Chapel" }, l1o: { k: "cslord", n: "The Count's Chamber" },
l2i: { k: "cfkitchen", n: "The Castle Kitchen" }, l2o: { k: "cfoil", n: "The Oil Store" },
l3i: { k: "csbaptism", n: "The Baptism Room" }, l3o: { k: "csview", n: "The Window on the Valley" } }] });
var evbCsGate = evbInfo("The gate", "The castle of Vinci belonged to the Counts Guidi, then to Florence, which took the town in the 1250s. From the walls you see the whole valley of the Arno.");
var evbCsCourt = evbInfo("The courtyard", "A narrow courtyard inside the walls: the castle is long and thin, built along the ridge, so people say it looks like a ship, with its tower as the prow.");
var evbCsWall = evbInfo("The walls", "Below, the little town of Vinci, the olive groves and vineyards, and the path up to Anchiano, where Leonardo was born on 15 April 1452.");
function evbCsHall() { return __ZC(367, 191, this, arguments, new.target); }
function evbCsTower() { evbTune([392, 523, 659], 400, 0.8); evbSay("🗼 Up the tower: the whole valley below, the Arno shining in the distance, and on a clear day the hills above Florence."); }
var evbCsDungeon = evbInfo("The dungeon", "A low stone room under the tower, with an iron-bound door and a grating for air.");
var evbCsChapel = evbInfo("The chapel", "A small chapel of the castle. Leonardo was baptised the day after he was born, in the church of Santa Croce just below the castle; his grandfather wrote it down in the family book.");
var evbCsLord = evbInfo("The count's chamber", "A bed, a chest and a fireplace: castles were cold, smoky and dark, and the lords lived in them only as much as they had to.");
var evbCsBaptism = evbInfo("The baptism room", "Leonardo's grandfather Antonio noted his birth: 'There was born to me a grandson, the son of Ser Piero my son, on the 15th day of April, a Saturday, at the third hour of the night. He bears the name Leonardo.'");
var evbCsView = evbInfo("The window on the valley", "Leonardo drew this landscape: his earliest dated drawing, of 5 August 1473, shows the valley of the Arno seen from the hills.");
evbTheme("maisonfr", { corner: "plant", seed: 123, panel: 0xE8E0CC, pal: { fab: "navy", fab2: "mustard", wood: "oak", metal: "iron", stone: "sand", art: 2, rug: 5, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF0EAD8, "plaster"], "D8D0C0|coffer": [0x5A4A3A, "wood"] },
hello: "🏠 <b>Inside a house of Amboise.</b> White tufa stone and slate, the Loire outside, the King's castle above. Look for the ✨ cards. The way out is the street door." });
evbHouse("maisonfr", { g: EVB_GRID.mid, h: 3.8, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The house"], wall: 0xF0EAD8, trim: 0x5A4A3A,
plan: [{ hall: { k: "frentry", n: "The Passage" }, spine: { k: "frsalle", n: "The Salle" }, gallery: { k: "frgallery", n: "The Little Gallery" },
back: { merge: EVB_BACK, k: "frkitchen", n: "The Kitchen" },
r1i: { k: "frcave", n: "The Cave in the Rock" }, r1o: { k: "frwine", n: "The Wine of the Loire" },
r2i: { k: "frbed", n: "The Bedchamber" }, r2o: { k: "frchild", n: "The Children's Room" },
r3i: { k: "frgarden", n: "The Garden" }, r3o: { k: "frwell", n: "The Well" },
l1i: { k: "frstudy", n: "The Study" }, l1o: { k: "frsew", n: "The Sewing Room" },
l2i: { k: "frbakery", n: "The Bread Oven" }, l2o: { k: "frlarder", n: "The Larder" },
l3i: { k: "frservant", n: "The Servant's Room" }, l3o: { k: "frview", n: "The Window on the Loire" } }] });
var evbFrEntry = evbInfo("The passage", "The houses of Amboise are built of tufa, a soft white stone cut from the cliffs along the Loire, and roofed with blue-grey slate.");
function evbFrSalle() { return __ZC(367, 192, this, arguments, new.target); }
var evbFrGallery = evbInfo("The little gallery", "A painted cloth, a mirror from Venice and a portrait. The new Italian taste is in fashion in France since the King's wars in Italy.");
function evbFrKitchen() {
evbCard("The kitchen", "A big hearth with a pot on a chain, a bread oven beside it.", [
["Taste the rillettes", function () { worldCard(null); evbSay("🥖 Pork slow-cooked in its own fat and spread on bread: a dish of Touraine, the country round Amboise."); }]
]);
}
var evbFrCave = evbInfo("The cave in the rock", "Many houses along the Loire have a cave behind them, cut into the soft tufa cliff: cool all year, for wine, apples and mushrooms. Some people live in them.");
var evbFrWine = evbInfo("The wine of the Loire", "Vineyards climb the slopes on both sides of the river, and the white wines of Touraine are sent by boat down the river.");
var evbFrBed = evbInfo("The bedchamber", "A curtained bed, a chest, a prie-dieu for prayers. In 1519 Leonardo made his will in Amboise, leaving his notebooks and drawings to his pupil Francesco Melzi.");
function evbFrChild() { evbSay("🧸 A wooden horse, a top, knucklebones. Children of the town play in the square below the castle."); }
var evbFrGarden = evbInfo("The garden", "Vegetables, herbs and a pear tree: the gardens of Touraine are called the garden of France.");
function evbFrWell() { evbTune([220, 247, 262], 250, 0.6); evbSay("🪣 The well in the yard. Water is drawn up in a wooden bucket, and the cold of the tufa keeps it sweet."); }
var evbFrStudy = evbInfo("The study", "Leonardo wrote his notes from right to left, in mirror writing; he was left-handed. At Amboise he planned a great new royal palace and canals for Romorantin, which were never built.");
var evbFrSew = evbInfo("The sewing room", "Linen from the river towns, wool from the sheep of the Sologne, and the new fashions from Italy.");
var evbFrBakery = evbInfo("The bread oven", "A round oven in the wall, heated with vine prunings. The baker's long wooden peel slides the loaves in and out.");
var evbFrLarder = evbInfo("The larder", "Hams and sausages hanging, a crock of butter, cheese from the goats of Touraine, and apples from the cave.");
var evbFrServant = evbInfo("The servant's room", "A small bed under the stairs. Leonardo came to France with his servant Battista de Vilanis and his pupil Melzi.");
var evbFrView = evbInfo("The window on the Loire", "Boats go up and down the wide, shallow Loire, the great road of the valley. The castle of Amboise rises on its rock above the town.");
evbFins({
csgate: ["stone", 0x8A8068, 0xD8CCB0, "stone", 0x5A4A3A, 0x5A4A3A], cscourt: ["stone", 0x9A9078, 0xE0D4B8, "stone", 0x5A4A3A], cswall: ["stone", 0x8A8068, 0xD8CCB0, "stone", 0x5A4A3A],
cshall: ["stone", 0x8A8068, 0xE0D4B8, "stone", 0x8A2A1A, 0x5A4A3A], cstower: ["stone", 0x7A7058, 0xD8CCB0, "stone", 0x5A4A3A], csdungeon: ["stone", 0x6A6050, 0xA89A80, "stone", 0x3A3A3A],
cschapel: ["stone", 0x9A9078, 0xF0E4CC, "plaster", 0xC8A040], cslord: ["wood", 0x6A4A2A, 0xE0D4B8, "damask", 0x8A2A1A], csbaptism: ["stone", 0x9A9078, 0xF0E4CC, "plaster", 0x5A4A3A],
csview: ["stone", 0x8A8068, 0xE0D4B8, "stone", 0x5A4A3A],
frentry: ["stone", 0xB8B0A0, 0xF0EAD8, "plaster", 0x5A4A3A], frsalle: ["wood", 0x7A5A3A, 0xF0EAD8, "plaster", 0x5A4A3A, 0x5A4A3A], frgallery: ["wood", 0x7A5A3A, 0xF0EAD8, "plaster", 0x2A3A6A],
frkitchen: ["stone", 0xA8A090, 0xE8E0CC, "plaster", 0x4A3A2A, 0x4A3A2A], frcave: ["stone", 0xC8C0A8, 0xE8E0C8, "stone", 0x8A8068], frwine: ["stone", 0xC8C0A8, 0xE8E0C8, "stone", 0x6A2A3A],
frbed: ["wood", 0x7A5A3A, 0xF0EAD8, "damask", 0x2A3A6A], frchild: ["wood", 0x7A5A3A, 0xF4EEDC, "plaster", 0x5A4A3A], frgarden: ["stone", 0xA8A090, 0xE8E0CC, "plaster", 0x3A6A3A],
frwell: ["stone", 0xA8A090, 0xE8E0CC, "stone", 0x5A4A3A], frstudy: ["wood", 0x6A4A2A, 0xF0EAD8, "wood", 0x5A4A3A], frsew: ["wood", 0x7A5A3A, 0xF0EAD8, "plaster", 0x5A4A3A],
frbakery: ["stone", 0xA8A090, 0xE8E0CC, "stone", 0x4A3A2A], frlarder: ["stone", 0xA8A090, 0xE8E0CC, "plaster", 0x5A4A3A], frservant: ["wood", 0x7A5A3A, 0xE8E0CC, "plaster", 0x5A4A3A],
frview: ["wood", 0x7A5A3A, 0xF0EAD8, "plaster", 0x5A4A3A]
});
evbRooms({
csgate: { sides: ["weaponrack", "armourstand", "weaponrack"], far: ["hallbanner", "hallbanner"], rug: false, ceil: "ironchandelier", acts: [[0.35, 0, 2.0, "The gate", "read", evbCsGate]] },
cscourt: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "evb_cart", "barrel", "crates"], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "The courtyard", "read", evbCsCourt]] },
cswall: { sides: ["weaponrack", "barrel", "weaponrack"], far: ["armourstand"], rug: false, acts: [[0.5, 0, 1.8, "The view", "look out", evbCsWall]] },
cshall: { far: ["fireplace", "hallbanner", "hallbanner"], sides: ["armourstand", "hallbanner", "longtable", "hallbanner", "armourstand"], mid: [["grandthrone", 0.75, 0], ["longtable", 0.45, 0]], ceil: "ironchandelier",
acts: [[0.5, 0, 2.0, "The hall", "read", evbCsHall]] },
cstower: { sides: ["spiralstair", "lantern", "weaponrack"], acts: [[0.5, 0, 1.8, "The tower", "climb", evbCsTower]] },
csdungeon: { far: ["cellbars"], sides: ["cellbars", "lantern"], rug: false, acts: [[0.5, 0, 1.8, "The dungeon", "read", evbCsDungeon]] },
cschapel: { grid: ["pew", 2, 2, "-u", 0.35, 0.7], far: ["altarinside"], sides: ["candles", "painting", "candles"], acts: [[0.5, 0, 1.8, "The chapel", "read", evbCsChapel]] },
cslord: { far: ["fourposter", "fireplace"], sides: ["footchest", "evb_cassone", "chair"], acts: [[0.5, 0, 1.8, "The chamber", "read", evbCsLord]] },
csbaptism: { far: ["evb_font"], sides: ["candles", "lectern", "candles"], mid: [["evb_font", 0.5, 0]], acts: [[0.5, 0.2, 1.8, "The family book", "read", evbCsBaptism]] },
csview: { far: ["chair", "esglobe"], sides: ["painting", "evb_easel"], acts: [[0.5, 0, 1.8, "The valley", "look out", evbCsView]] },
frentry: { sides: ["benchin", "plant", "wd:kf_coatrack"], far: ["painting"], acts: [[0.35, 0, 1.8, "The house", "read", evbFrEntry]] },
frsalle: { far: ["fireplace", "evb_pewter"], sides: ["chair", "painting", "chair", "footchest"], mid: [["longtable", 0.5, 0]], ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The salle", "read", evbFrSalle]] },
frgallery: { sides: ["painting", "wallmirror", "painting"], far: ["evb_cassone"], acts: [[0.5, 0, 1.8, "The gallery", "read", evbFrGallery]] },
frkitchen: { far: ["fireplace", "oven", "herbrack"], sides: ["butcherblock", "shelfgoods", "barrel", "trbreadrack"], mid: [["longtable", 0.55, 0]], rug: false, ceil: "lantern", acts: [[0.5, 0, 1.8, "The kitchen", "taste", evbFrKitchen]] },
frcave: { far: ["cask", "barrel", "cask"], sides: ["crates", "trsacks", "barrel"], rug: false, ceil: "lantern", acts: [[0.5, 0, 1.8, "The cave", "read", evbFrCave]] },
frwine: { grid: ["cask", 2, 2], sides: ["barrel", "cask", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The wine", "read", evbFrWine]] },
frbed: { far: ["fourposter"], sides: ["footchest", "lectern", "chair"], acts: [[0.5, 0, 1.8, "The bedchamber", "read", evbFrBed]] },
frchild: { far: ["bed", "toys"], sides: ["evb_rocking", "footchest"], acts: [[0.5, 0, 1.8, "The toys", "look", evbFrChild]] },
frgarden: { sides: ["plant", "flowerbucket", "plant", "herbrack"], far: ["plant", "plant"], rug: false, ceil: null, acts: [[0.5, 0, 1.8, "The garden", "read", evbFrGarden]] },
frwell: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "plant"], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "The well", "draw water", evbFrWell]] },
frstudy: { far: ["desk", "bookshelf"], sides: ["lectern", "esglobe", "bookshelf"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The notebooks", "read", evbFrStudy]] },
frsew: { far: ["loom", "evb_spindle"], sides: ["dressform", "chair"], acts: [[0.5, 0, 1.8, "The sewing", "read", evbFrSew]] },
frbakery: { far: ["oven"], sides: ["trbreadrack", "trsacks", "longtable"], rug: false, acts: [[0.5, 0, 1.8, "The oven", "read", evbFrBakery]] },
frlarder: { far: ["trmeathooks", "shelfgoods"], sides: ["barrel", "shelfgoods", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The larder", "read", evbFrLarder]] },
frservant: { far: ["bed"], sides: ["footchest", "chair"], acts: [[0.5, 0, 1.8, "The servant's room", "read", evbFrServant]] },
frview: { far: ["chair", "wd:kf_table"], sides: ["plant", "painting"], acts: [[0.5, 0, 1.8, "The Loire", "look out", evbFrView]] }
});
"use strict";
var EVB_VRN_REMAP = { "D6D0C6|plaster": [0xF0EAE0, "plaster"], "D8D0C0|coffer": [0xF4F0E6, "coffer"] };
function evbImPlan(front) {
return [
{ hall: front.hall, spine: front.spine, gallery: { k: "imstair", n: "The Grand Staircase" },
back: { merge: EVB_BACK, k: "imsalon", n: "The Salon" },
r1i: { k: "imdine", n: "The Dining Room" }, r1o: { k: "imkitchen", n: "The Kitchen" },
r2i: { k: "impantry", n: "The Pantry" }, r2o: { k: "imcoal", n: "The Coal Cellar" },
r3i: { k: "imcourt", n: "The Courtyard" }, r3o: { k: "imcoach", n: "The Coach House" },
l1i: { k: "imlibrary", n: "The Library" }, l1o: { k: "imsmoke", n: "The Smoking Room" },
l2i: { k: "imstudy", n: "The Study" }, l2o: { k: "imnursery", n: "The Nursery" },
l3i: { k: "imbath", n: "The Bathroom" }, l3o: { k: "imlinen", n: "The Linen Room" } },
{ hall: { k: "imlanding", n: "The Landing" }, spine: { k: "immusic", n: "The Music Room" }, gallery: { k: "imbalcony", n: "The Balcony" },
back: { merge: EVB_BACK, k: "imbed", n: "The Bedroom" },
r1: { merge: ["r1i", "r1o"], k: "imdress", n: "The Dressing Room" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "imphoto", n: "The Photographer's Studio" },
l1: { merge: ["l1i", "l1o"], k: "immaids", n: "The Maids' Rooms under the Roof" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "imgarret", n: "The Painter's Garret" } }
];
}
function evbIm(key, o) {
evbTheme(key, { corner: "plant", seed: o.seed, panel: 0xE8E0D0, pal: Object.assign({ fab: "crimson", fab2: "emerald", wood: "mahogany", metal: "brass", stone: "marble", art: 9, rug: 1, rugv: 0 }, o.pal || {}), remap: EVB_VRN_REMAP, hello: o.hello });
evbHouse(key, { g: EVB_GRID.mid, h: 4.2, levels: 2, stairX: 3.5, stairZ: 11, floors: [o.f0 || "The ground and first floors", "The upper floors"], wall: 0xF0EAE0, trim: 0x5A4A3A, plan: evbImPlan(o) });
}
evbIm("immeuble", { seed: 131, hall: { k: "imentry", n: "The Carriage Door" }, spine: { k: "imloge", n: "The Concierge's Lodge" },
hello: "🏛️ <b>Inside a town house of 1870.</b> The concierge in her lodge, the grand stair, the salon and its piano, the library of red-and-gold books; and up under the roof, the maids' little rooms. Look for the ✨ cards. The way out is the carriage door." });
evbIm("imcafehouse", { seed: 133, pal: { fab: "emerald", fab2: "mustard" }, f0: "The café and the house", hall: { k: "imcafe", n: "The Café" }, spine: { k: "imbilliard", n: "The Billiard Room" },
hello: "☕ <b>Inside the café.</b> Marble tables, newspapers on their wooden poles, the zinc counter and the billiard room at the back; the family's flat upstairs. Look for the ✨ cards. The way out is the café door." });
evbIm("imbookhouse", { seed: 135, pal: { fab: "navy", fab2: "crimson" }, f0: "The bookshop and the house", hall: { k: "imbooks", n: "The Bookshop" }, spine: { k: "imbookback", n: "The Back Shop" },
hello: "📚 <b>Inside the bookshop.</b> The new Voyages Extraordinaires in their red-and-gold covers, maps, atlases and the latest magazine. Look for the ✨ cards. The way out is the shop door." });
function evbVrnHouse(x, z) { var h = Math.abs(Math.round(x * 3.17 + z * 5.29)) % 10; return h < 6 ? "immeuble" : h < 8 ? "imcafehouse" : "imbookhouse"; }
var EVB_VRN_NAMES = { immeuble: "A town house", imcafehouse: "A café", imbookhouse: "A bookshop" };
evbFins({
imentry: ["stone", 0xC8C0B0, 0xF0EAE0, "plaster", 0x5A4A3A], imloge: ["wood", 0x7A5A3A, 0xE8E0D0, "damask", 0x5A4A3A], imstair: ["stone", 0xE8E4D8, 0xF0EAE0, "plaster", 0xC8A040],
imsalon: ["wood", 0x8A6A4A, 0xF0E4D0, "damask", 0xC8A040, 0xF4F0E6], imdine: ["wood", 0x7A5A3A, 0xE8DCC4, "wood", 0xC8A040, 0xF4F0E6], imkitchen: ["checker", 0xE8E8E8, 0xF0E8D8, "tile", 0x5A4A3A],
impantry: ["tile", 0xC8C0B0, 0xF0E8D8, "tile", 0x5A4A3A], imcoal: ["stone", 0x6A6458, 0xB8B0A0, "stone", 0x3A3A3A], imcourt: ["stone", 0x9A9488, 0xE8E0D0, "stone", 0x5A4A3A],
imcoach: ["stone", 0x8A8478, 0xD8D0C0, "wood", 0x5A4A3A], imlibrary: ["wood", 0x5A3A22, 0xE8DCC4, "wood", 0xC8A040], imsmoke: ["wood", 0x5A3A22, 0xD8C8A8, "damask", 0x8A2A1A],
imstudy: ["wood", 0x6A4A2A, 0xE8DCC4, "wood", 0xC8A040], imnursery: ["wood", 0x8A6A4A, 0xF4EEE0, "plaster", 0x5A7AA8], imbath: ["tile", 0xF0F0EC, 0xF4F4F0, "tile", 0x2A5A8A],
imlinen: ["wood", 0x8A6A4A, 0xF4EEE0, "plaster", 0x5A4A3A], imlanding: ["wood", 0x7A5A3A, 0xF0EAE0, "plaster", 0xC8A040], immusic: ["wood", 0x8A6A4A, 0xF0E4D0, "damask", 0xC8A040, 0xF4F0E6],
imbalcony: ["stone", 0xC8C0B0, 0xF0EAE0, "plaster", 0x2A2A2A], imbed: ["wood", 0x8A6A4A, 0xF0E4D0, "damask", 0xC8A040], imdress: ["wood", 0x8A6A4A, 0xF4EEE0, "damask", 0xC8A040],
imphoto: ["wood", 0x7A5A3A, 0xF4F4F0, "plaster", 0x2A2A2A], immaids: ["wood", 0x7A5A3A, 0xE8E0D0, "plaster", 0x5A4A3A], imgarret: ["wood", 0x7A5A3A, 0xE8E0D0, "plaster", 0x5A4A3A],
imcafe: ["checker", 0xE8E8E8, 0xF0E4CC, "wood", 0xC8A040, 0xF4F0E6], imbilliard: ["wood", 0x6A4A2A, 0xD8C8A8, "wood", 0x2A5A3A],
imbooks: ["wood", 0x6A4A2A, 0xF0E4CC, "wood", 0x8A2A1A], imbookback: ["wood", 0x6A4A2A, 0xE8DCC4, "plaster", 0x5A4A3A]
});
"use strict";
function evbImEntry() { return __ZC(367, 193, this, arguments, new.target); }
var evbImLoge = evbInfo("The concierge's lodge", "A little room by the door with a window on the passage: the concierge sees everyone who comes and goes, takes in the post, sweeps the stair and knows all the gossip of the house.");
var evbImStair = evbInfo("The grand staircase", "The stair is grand at the bottom and plainer the higher you go, and so are the flats: in a Paris house of 1870 the richest family lives on the second floor, with the balcony, and the poorest at the top, under the roof, up six flights.");
function evbImSalon() { return __ZC(367, 194, this, arguments, new.target); }
var evbImDine = evbInfo("The dining room", "Dinner is served à la russe, the new way: course after course brought round by the servants, rather than everything laid on the table at once.");
function evbImKitchen() {
evbCard("The kitchen", "An iron range burning coal, a row of copper pans, a stone sink. The cook rules here.", [
["Help with the soup", function () { worldCard(null); evbSay("🥣 A pot-au-feu: beef, leeks, carrots and turnips simmered for hours; the broth first, then the meat."); }]
]);
}
var evbImPantry = evbInfo("The pantry", "Plates, glasses and silver for the dining room, and the bell board: each room has a bell-pull, and its bell rings here to call a servant.");
var evbImCoal = evbInfo("The coal cellar", "Coal comes in sacks carried on the coal man's back, down to the cellar. Every fire in the house, and the kitchen range, is fed from here by bucket.");
var evbImCourt = evbInfo("The courtyard", "The courtyard brings light to the back rooms. Here the pump, the dustbins, the carriage, and, on Mondays, the washing.");
var evbImCoach = evbInfo("The coach house", "A family that keeps its own carriage is rich indeed; most people take a hired fiacre or the horse-drawn omnibus.");
function evbImLibrary() { return __ZC(367, 195, this, arguments, new.target); }
var evbImSmoke = evbInfo("The smoking room", "After dinner the gentlemen go to the smoking room, so the curtains of the salon do not smell of cigars. Here they talk of railways, telegraphs and the race to cross Africa.");
var evbImStudy = evbInfo("The study", "A desk, a globe, maps and a barometer. Verne liked to write in the early morning, from about five, before the house was up.");
function evbImNursery() { evbSay("🧸 A rocking horse, tin soldiers, a doll with a china head and a magic lantern that throws coloured pictures on the wall. Children read the Magasin d'éducation et de récréation, where the Verne stories first come out."); }
var evbImBath = evbInfo("The bathroom", "A new luxury: a bath of zinc or copper, with hot water carried up in cans, or, in the newest houses, a gas heater. Many people still wash at a basin and go to the public baths.");
var evbImLinen = evbInfo("The linen room", "Sheets, napkins and tablecloths, marked with the family's initials in red thread. The washerwoman takes them away and brings them back starched.");
var evbImLanding = evbInfo("The landing", "Two doors on each landing, one for each flat. The newest buildings have a lift: at the Paris Exposition of 1867 Léon Edoux showed a lift worked by water, and gave it its French name, ascenseur.");
function evbImMusic() { evbTune([392, 494, 587, 784, 587, 494], 260, 0.6); evbSay("🎻 A violin and a piano: an evening of music, songs from Offenbach's operettas, which all Paris is humming."); }
var evbImBalcony = evbInfo("The balcony", "An iron balcony runs the whole width of the house at this floor: the best place to watch a procession. Below, gas lamps are being lit one by one along the street.");
var evbImBed = evbInfo("The bedroom", "A great bed with curtains, a wardrobe with a mirror, a washstand with jug and bowl. The bedrooms are at the back, away from the noise of the street.");
var evbImDress = evbInfo("The dressing room", "A crinoline cage of steel hoops for the skirts, a corset, a top hat in its box. Fashions come from the great dressmaker Worth, who dresses the Empress.");
function evbImPhoto() { return __ZC(367, 196, this, arguments, new.target); }
var evbImMaids = evbInfo("The maids' rooms", "Up six flights, under the slates: tiny rooms with a skylight, a bed, a chair, a hook for clothes. Hot in summer, freezing in winter. The maids are up before the family, carrying water and coal up all those stairs.");
var evbImGarret = evbInfo("The painter's garret", "A young painter lives up here, where the light is good and the rent is cheap. Artists who will one day be famous, Monet and Renoir among them, are struggling to sell anything in 1870.");
function evbImCafe() { return __ZC(367, 197, this, arguments, new.target); }
function evbImBilliard() { evbTune([1047, 880], 120, 0.3); evbSay("🎱 Click! A game of French billiards, played with three balls and no pockets."); }
function evbImBooks() { return __ZC(367, 198, this, arguments, new.target); }
var evbImBookBack = evbInfo("The back shop", "Parcels of books from Paris, the bookseller's desk and his ledgers, and a stack of the Magasin d'éducation et de récréation, the magazine where Verne's stories first appear.");
"use strict";
evbRooms({
imentry: { sides: ["plant", "benchin", "plant"], far: ["lantern"], rug: false, acts: [[0.35, 0, 2.0, "The carriage door", "ring", evbImEntry]] },
imloge: { far: ["bed", "clock"], sides: ["chair", "keyrack", "wd:kf_table", "noticeboard"], mid: [["armchair", 0.5, 0]], acts: [[0.5, 0, 1.8, "The concierge", "read", evbImLoge]] },
imstair: { sides: ["plant", "painting", "plant"], far: ["spiralstair"], acts: [[0.5, 0, 1.8, "The stair", "read", evbImStair]] },
imsalon: { far: ["fireplace", "piano"], sides: ["sofa", "armchair", "plant", "painting", "armchair", "wallmirror"], mid: [["wd:kf_tableround", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The salon", "sit down", evbImSalon]] },
imdine: { mid: [["longtable", 0.5, 0]], far: ["evb_pewter", "painting"], sides: ["chair", "chair", "chair", "chair", "chair"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The dining room", "read", evbImDine]] },
imkitchen: { far: ["stove", "oven", "sink"], sides: ["counter", "shelfgoods", "butcherblock", "trcopper"], mid: [["longtable", 0.55, 0]], rug: false, acts: [[0.5, 0, 1.8, "The range", "cook", evbImKitchen]] },
impantry: { far: ["shelfgoods", "shelfgoods"], sides: ["esbellboard", "shelfgoods", "displaycase"], rug: false, acts: [[0.5, 0, 1.8, "The bell board", "read", evbImPantry]] },
imcoal: { grid: ["trsacks", 2, 2], sides: ["crates", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The coal", "read", evbImCoal]] },
imcourt: { sides: ["barrel", "plant", "barrel"], far: ["evb_rainbarrel", "plant"], rug: false, ceil: null, acts: [[0.5, 0, 1.8, "The courtyard", "read", evbImCourt]] },
imcoach: { mid: [["evb_coach", 0.5, 0]], sides: ["trsaddles", "lantern", "crates"], rug: false, acts: [[0.5, 0.3, 1.8, "The carriage", "read", evbImCoach]] },
imlibrary: { far: ["bookshelf", "bookshelf", "bookshelf"], sides: ["bookshelf", "esglobe", "bookshelf", "armchair"], mid: [["desk", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The books", "take one down", evbImLibrary]] },
imsmoke: { far: ["fireplace"], sides: ["armchair", "armchair", "esbilliard", "painting"], mid: [["wd:kf_tablecoffeesquare", 0.5, 0]], acts: [[0.5, 0, 1.8, "The smoking room", "read", evbImSmoke]] },
imstudy: { far: ["desk", "bookshelf"], sides: ["esglobe", "maptable", "bookshelf"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The desk", "read", evbImStudy]] },
imnursery: { far: ["crib", "toys"], sides: ["evb_rocking", "bed", "esdollhouse"], acts: [[0.5, 0, 1.8, "The nursery", "look", evbImNursery]] },
imbath: { mid: [["vcbath", 0.5, 0]], sides: ["vcbasin", "wallmirror", "vcchaise"], acts: [[0.5, 0, 1.8, "The bath", "read", evbImBath]] },
imlinen: { far: ["wardrobe", "shelfgoods"], sides: ["esironing", "wardrobe", "essewing"], acts: [[0.5, 0, 1.8, "The linen", "read", evbImLinen]] },
imlanding: { sides: ["plant", "painting", "plant"], acts: [[0.4, 0, 1.8, "The landing", "read", evbImLanding]] },
immusic: { far: ["piano", "esharp"], sides: ["chair", "chair", "painting", "chair"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The music", "listen", evbImMusic]] },
imbalcony: { sides: ["plant", "chair", "plant"], far: ["chair", "wd:kf_table"], rug: false, acts: [[0.5, 0, 1.8, "The street below", "look out", evbImBalcony]] },
imbed: { far: ["bed"], sides: ["wardrobe", "wallmirror", "vcbasin", "chair"], acts: [[0.5, 0, 1.8, "The bedroom", "read", evbImBed]] },
imdress: { far: ["wardrobe", "wallmirror"], sides: ["dressform", "evb_hatstand", "dressform"], acts: [[0.5, 0, 1.8, "The clothes", "read", evbImDress]] },
imphoto: { mid: [["evb_tripod", 0.55, 0], ["chair", 0.3, 0]], far: ["painting", "painting"], sides: ["lamp", "displaycase", "lamp"], acts: [[0.5, 0, 1.8, "The camera", "have your picture taken", evbImPhoto]] },
immaids: { grid: ["bed", 2, 2, "-u", 0.3, 0.7], sides: ["chair", "footchest"], acts: [[0.5, 0, 1.8, "The maids' rooms", "read", evbImMaids]] },
imgarret: { far: ["evb_easel", "bed"], sides: ["evb_easel", "painting", "chair"], acts: [[0.5, 0, 1.8, "The garret", "read", evbImGarret]] },
imcafe: { grid: ["wd:kf_tableround", 2, 3], far: ["esbar", "counter"], sides: ["chair", "wallmirror", "chair", "noticeboard"], ceil: "chandelier", acts: [[0.4, 0, 2.0, "The café", "order", evbImCafe]] },
imbilliard: { mid: [["esbilliard", 0.5, 0]], sides: ["escuerack", "chair", "painting"], ceil: "chandelier", acts: [[0.5, 0.25, 1.8, "The billiard table", "play", evbImBilliard]] },
imbooks: { far: ["bookshelf", "bookshelf"], sides: ["bookshelf", "trcounter", "bookshelf", "esglobe"], mid: [["displaycase", 0.5, 0]], acts: [[0.4, 0, 2.0, "The bookshop", "browse", evbImBooks]] },
imbookback: { far: ["desk", "bookshelf"], sides: ["crates", "bookshelf", "crates"], acts: [[0.5, 0, 1.8, "The back shop", "read", evbImBookBack]] }
});
"use strict";
evbTheme("cottageie", { corner: "barrel", seed: 141, panel: 0xE8E0D0, pal: { fab: "terracotta", fab2: "sage", wood: "pine", metal: "iron", stone: "slate", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xF4F0E8, "plaster"], "D8D0C0|coffer": [0x4A3A2A, "wood"] },
hello: "🏡 <b>Inside a cottage on Samhain night.</b> The turf fire on the hearth, the settle bed, the dresser of blue-and-white plates, a place laid at the table for the dead, and the cows at the far end. Look for the ✨ cards. The way out is the half door." });
evbHouse("cottageie", { g: EVB_GRID.mid, h: 3.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The cottage"], wall: 0xF4F0E8, trim: 0x2A3A2A,
plan: [{ hall: { k: "iehalf", n: "The Half Door" }, spine: { k: "iekitchen", n: "The Kitchen and the Hearth" }, gallery: { k: "iedresser", n: "The Dresser" },
back: { merge: EVB_BACK, k: "iesupper", n: "The Table Laid for the Dead" },
r1i: { k: "iesettle", n: "The Settle Bed" }, r1o: { k: "iebyre", n: "The Byre" },
r2i: { k: "iedairy", n: "The Dairy" }, r2o: { k: "ieturf", n: "The Turf Stack" },
r3i: { k: "iewheel", n: "The Spinning Corner" }, r3o: { k: "iebrack", n: "The Baking of the Brack" },
l1i: { k: "ieroom", n: "The Room" }, l1o: { k: "ieoutshot", n: "The Bed in the Wall" },
l2i: { k: "ieloft", n: "The Loft" }, l2o: { k: "iestory", n: "The Storyteller's Stool" },
l3i: { k: "iecharms", n: "The Charms over the Door" }, l3o: { k: "iewell", n: "The Well at the Gable" } }] });
var evbIeHalf = evbInfo("The half door", "The top half stands open to let out the smoke and let in the light; the bottom half keeps the hens out and the children in. Tonight a turnip lantern grins from the window: on Samhain the dead walk, and the lantern is a face to frighten off what should not come in.");
function evbIeKitchen() { return __ZC(367, 199, this, arguments, new.target); }
var evbIeDresser = evbInfo("The dresser", "Rows of blue-and-white plates, jugs on hooks, a lustre jug for show. The dresser is the pride of the house.");
function evbIeSupper() { return __ZC(367, 200, this, arguments, new.target); }
var evbIeSettle = evbInfo("The settle bed", "A long wooden bench by the fire by day; at night its seat folds down into a box bed, and two or three children sleep in it, warm by the embers.");
function evbIeByre() { evbTune([110, 98], 500, 1); evbSay("🐄 The cows live at the far end of the house, behind a low wall: their warmth helps heat the cottage, and nobody can steal them in the night."); }
var evbIeDairy = evbInfo("The dairy", "The churn, the crocks of milk setting for cream, the butter prints. People say the fairies can steal the goodness out of butter, so a pinch of salt goes into the churn first.");
var evbIeTurf = evbInfo("The turf stack", "Turf (peat) is cut from the bog in spring with a slane, a narrow spade, dried in little stacks on the bog all summer, and brought home by donkey and creel. It smells sweet as it burns.");
function evbIeWheel() { evbTune([262, 294, 330, 294], 250, 0.6); evbSay("🧶 The spinning wheel hums: flax for linen, wool for the family's clothes. The women spin and sing in the long evenings."); }
function evbIeBrack() { return __ZC(367, 201, this, arguments, new.target); }
var evbIeRoom = evbInfo("The room", "The 'room' is the good room at the other end from the kitchen: the best bed, the holy pictures, the clock, used for the priest's visit, a wake, or a courting.");
var evbIeOutshot = evbInfo("The bed in the wall", "An outshot: a little bed built into an alcove in the kitchen wall by the fire, with a curtain across. The grandmother sleeps here, warmest spot in the house.");
var evbIeLoft = evbInfo("The loft", "A ladder up to the half-loft under the thatch: sacks of oats, potatoes, the children's beds, and the smell of the thatch.");
function evbIeStory() { return __ZC(367, 202, this, arguments, new.target); }
var evbIeCharms = evbInfo("The charms over the door", "A St Brigid's cross of rushes over the door, a horseshoe for iron, a sprig of rowan: all to keep the house safe. Iron, people say, is what the fairies cannot abide.");
function evbIeWell() { evbTune([220, 247, 262], 250, 0.6); evbSay("🪣 Cold water from the well at the gable end. Some say if you look into a well at midnight on Samhain, you'll see the face of the one you'll marry."); }
evbTheme("oldchurchie", { corner: "candles", seed: 143, panel: 0xD8D4CC, pal: { fab: "plum", fab2: "charcoal", wood: "ebony", metal: "iron", stone: "slate", art: 3, rug: 4, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8D4CC, "stone"], "D8D0C0|coffer": [0x3A3028, "wood"] },
hello: "⛪ <b>Inside the old church.</b> Cold stone, the lamp before the altar, the bell rope in the tower, and the names of the parish's dead on the walls. Tonight of all nights. Look for the ✨ cards. The way out is the tower door." });
evbHouse("oldchurchie", { g: EVB_GRID.temple, h: 6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The church"], wall: 0xD8D4CC, trim: 0x3A3028,
plan: [{ hall: { k: "ocporch", n: "The Tower Porch" }, spine: { k: "ocnave", n: "The Nave" }, gallery: { k: "ocaisle", n: "The Side Aisle" },
back: { merge: EVB_BACK, k: "ocaltar", n: "The Chancel" },
r1i: { k: "ocbell", n: "The Bell Tower" }, r1o: { k: "ocvestry", n: "The Vestry" },
r2i: { k: "ocregister", n: "The Parish Chest" }, r2o: { k: "ocfont", n: "The Font" },
r3i: { k: "ocmemorial", n: "The Memorial Wall" }, r3o: { k: "ocwake", n: "The Watching Room" },
l1i: { k: "occandle", n: "The Candles for the Dead" }, l1o: { k: "ocsexton", n: "The Sexton's Store" },
l2i: { k: "ocbier", n: "The Bier" }, l2o: { k: "ocstones", n: "The Old Carved Stones" },
l3i: { k: "ocwindow", n: "The East Window" }, l3o: { k: "ocyard", n: "The Way to the Graves" } }] });
var evbOcPorch = evbInfo("The tower porch", "The church is old: parts of it were standing before the Normans came. The door creaks; the lantern makes the shadows move.");
var evbOcNave = evbInfo("The nave", "Long benches, a stone floor worn smooth by feet, and memorials to the parish's great families on the walls. Tonight, All Hallows' Eve, the eve of All Saints' Day, the church remembers all its dead.");
var evbOcAisle = evbInfo("The side aisle", "Hatchments with the coats of arms of the dead hang on the walls, and a draught runs along the floor.");
function evbOcAltar() { evbTune([262, 330, 392, 330, 262], 600, 1.4); evbSay("🕯️ The lamp before the altar never goes out. All Saints' Day is tomorrow, the 1st of November, and All Souls' Day the day after, when the dead are prayed for by name."); }
function evbOcBell() { evbTune([392, 392, 392], 1200, 2.2); evbSay("🔔 The bell is tolled for the dead tonight, one stroke at a time. People used to ring church bells on All Hallows' Eve for the souls, until it was forbidden as superstition."); }
var evbOcVestry = evbInfo("The vestry", "The priest's robes, the silver chalice, the book of services. Black vestments are laid out for All Souls.");
var evbOcRegister = evbInfo("The parish chest", "An iron-bound chest with three locks, holding the parish registers: every baptism, marriage and burial, written in by hand.");
var evbOcFont = evbInfo("The font", "An old stone font, older than anyone knows. Babies baptised here have names now carved on the stones outside.");
var evbOcMemorial = evbInfo("The memorial wall", "Carved tablets: 'Sacred to the memory of...' Some are for drowned sailors, some for children, one for a man killed by a fall from his horse on this very night, the stone says, a hundred years ago.");
var evbOcWake = evbInfo("The watching room", "A small room where people once sat up all night with a body before the burial, so it was never alone. In the parish, a wake is still held at home, with keening women, tobacco and stories.");
function evbOcCandle() { evbSay("🕯️ You light a candle for the dead and say a name. Rows of little flames, each one steady."); }
var evbOcSexton = evbInfo("The sexton's store", "The sexton digs the graves and rings the bell: spades, ropes, a lantern, and the bier's black cloth.");
var evbOcBier = evbInfo("The bier", "A wooden frame for carrying the coffin from the church to the grave on the bearers' shoulders.");
var evbOcStones = evbInfo("The old carved stones", "Stones carved long ago, set into the wall: a weathered cross, a face, a spiral. Nobody remembers who carved them.");
var evbOcWindow = evbInfo("The east window", "Moonlight comes through the old glass. Outside, the graves, the dead trees, and the bridge over the stream: the Dullahan cannot cross running water, so the bridge is safety.");
var evbOcYard = evbInfo("The way to the graves", "The little door to the graveyard. On Samhain night people say the dead come up to visit the living, and it is best not to walk among the graves alone.");
evbTheme("oldmillie", { corner: "trsacks", seed: 145, panel: 0xD8CCB0, pal: { fab: "sage", fab2: "terracotta", wood: "oak", metal: "iron", stone: "granite", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE8E0CC, "plaster"], "D8D0C0|coffer": [0x4A3A2A, "wood"] },
hello: "🌾 <b>Inside the old mill.</b> The great wheel turning outside, the millstones grumbling, flour on every beam. Look for the ✨ cards. The way out is the mill door." });
evbHouse("oldmillie", { g: EVB_GRID.mid, h: 4.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The mill"], wall: 0xE8E0CC, trim: 0x4A3A2A,
plan: [{ hall: { k: "mldoor", n: "The Mill Door" }, spine: { k: "mlstones", n: "The Stone Floor" }, gallery: { k: "mlhopper", n: "The Hopper" },
back: { merge: EVB_BACK, k: "mlwheel", n: "The Wheel Pit" },
r1i: { k: "mlkiln", n: "The Drying Kiln" }, r1o: { k: "mlsacks", n: "The Sack Hoist" },
r2i: { k: "mlmiller", n: "The Miller's Room" }, r2o: { k: "mltoll", n: "The Toll Dish" },
r3i: { k: "mlbins", n: "The Grain Bins" }, r3o: { k: "mlflour", n: "The Flour Room" },
l1i: { k: "mlgears", n: "The Great Gears" }, l1o: { k: "mlrace", n: "The Mill Race" },
l2i: { k: "mlstable", n: "The Donkey Stable" }, l2o: { k: "mldress", n: "The Stone Dresser's Bench" },
l3i: { k: "mlcats", n: "The Mill Cats" }, l3o: { k: "mlroad", n: "The Window on the Road" } }] });
var evbMlDoor = evbInfo("The mill door", "Farmers bring their oats and wheat here to be ground. The mill sits where the stream runs fast, its water led along the race to the wheel.");
function evbMlStones() { evbTune([98, 110, 98, 110], 400, 1); evbSay("⚙️ The runner stone turns on the still bed stone, grumbling; the grain trickles in at the eye and comes out at the edge as meal. 'Keep your nose to the grindstone': the miller sniffed for burning to know the stones were too close."); }
var evbMlHopper = evbInfo("The hopper", "The grain is tipped into the wooden hopper and shaken down by the 'damsel', a little rattling arm, into the stones.");
function evbMlWheel() { evbTune([131, 147, 131], 600, 1.2); evbSay("💧 The great wheel turns in its pit, dripping. Tonight the wheel turns on in the dark, and the Dullahan's Road begins at the mill gate."); }
var evbMlKiln = evbInfo("The drying kiln", "Oats are dried on a floor of perforated tiles over a slow fire before they are ground, so the meal keeps.");
var evbMlSacks = evbInfo("The sack hoist", "A rope and pulley, worked by the wheel, lifts the full sacks up through trap doors to the top of the mill.");
var evbMlMiller = evbInfo("The miller's room", "The miller's desk and his book of accounts. Millers were never trusted: people said every honest miller has a golden thumb, because none had ever been seen.");
var evbMlToll = evbInfo("The toll dish", "The miller's payment is a share of the grain, measured with the toll dish, and everyone watches him fill it.");
var evbMlBins = evbInfo("The grain bins", "Oats, barley and wheat in great wooden bins, and the rats that try to get at them.");
var evbMlFlour = evbInfo("The flour room", "Flour dust floats in the lantern light and settles on everything. A naked flame in a mill is a great danger; the lanterns are closed.");
var evbMlGears = evbInfo("The great gears", "Wooden cogs of apple and hornbeam, greased with tallow, carry the turn of the wheel to the stones.");
var evbMlRace = evbInfo("The mill race", "The channel that brings the stream to the wheel; a wooden sluice gate lets the water in or stops it.");
function evbMlStable() { evbTune([262, 220, 262], 300, 0.6); evbSay("🫏 The miller's donkey brays: it carries the sacks home to the farms."); }
var evbMlDress = evbInfo("The stone dresser's bench", "Every few weeks the stones are lifted and their grooves cut sharp again with a mill bill, a little steel pick. A dresser's hands are full of tiny bits of steel.");
function evbMlCats() { evbTune([659, 587], 300, 0.5); evbSay("🐈‍⬛ Two black cats watch you from the grain bins: the best rat-catchers there are, and tonight of all nights, very knowing."); }
var evbMlRoad = evbInfo("The window on the road", "The road runs from the mill through the dark to the church bridge. Irving's Ichabod Crane raced for such a bridge with the Headless Horseman behind him.");
evbFins({
iehalf: ["stone", 0x7A7468, 0xF4F0E8, "plaster", 0x2A3A2A], iekitchen: ["stone", 0x6A6458, 0xF0ECE0, "plaster", 0x2A3A2A, 0x3A3028], iedresser: ["stone", 0x7A7468, 0xF4F0E8, "plaster", 0x2A3A2A],
iesupper: ["stone", 0x6A6458, 0xF0ECE0, "plaster", 0x2A3A2A, 0x3A3028], iesettle: ["stone", 0x7A7468, 0xF4F0E8, "plaster", 0x2A3A2A], iebyre: ["stone", 0x6A5A48, 0xD8D0C0, "stone", 0x3A3028],
iedairy: ["stone", 0x8A8478, 0xF4F4F0, "plaster", 0x2A3A2A], ieturf: ["stone", 0x6A5A48, 0xD8D0C0, "stone", 0x3A3028], iewheel: ["stone", 0x7A7468, 0xF4F0E8, "plaster", 0x2A3A2A],
iebrack: ["stone", 0x7A7468, 0xF4F0E8, "plaster", 0x2A3A2A], ieroom: ["wood", 0x6A4A2A, 0xF4F0E8, "plaster", 0x2A3A2A], ieoutshot: ["stone", 0x7A7468, 0xF0ECE0, "plaster", 0x2A3A2A],
ieloft: ["wood", 0x7A5A3A, 0xE8DCC0, "wood", 0x3A3028], iestory: ["stone", 0x6A6458, 0xF0ECE0, "plaster", 0x2A3A2A], iecharms: ["stone", 0x7A7468, 0xF4F0E8, "plaster", 0x2A3A2A],
iewell: ["stone", 0x8A8478, 0xE8E4DC, "stone", 0x3A3028],
ocporch: ["stone", 0x6A6660, 0xD8D4CC, "stone", 0x3A3028], ocnave: ["stone", 0x7A766E, 0xD8D4CC, "stone", 0x3A3028, 0x3A3028], ocaisle: ["stone", 0x6A6660, 0xD0CCC4, "stone", 0x3A3028],
ocaltar: ["stone", 0x8A867E, 0xE0DCD4, "stone", 0x6A4A7A, 0x3A3028], ocbell: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028], ocvestry: ["wood", 0x4A3A2A, 0xD8D4CC, "stone", 0x3A3028],
ocregister: ["wood", 0x4A3A2A, 0xD8D4CC, "stone", 0x3A3028], ocfont: ["stone", 0x7A766E, 0xD8D4CC, "stone", 0x3A3028], ocmemorial: ["stone", 0x7A766E, 0xD8D4CC, "stone", 0x3A3028],
ocwake: ["wood", 0x4A3A2A, 0xD0CCC4, "stone", 0x3A3028], occandle: ["stone", 0x7A766E, 0xD8D4CC, "stone", 0x3A3028], ocsexton: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028],
ocbier: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028], ocstones: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028], ocwindow: ["stone", 0x7A766E, 0xD8D4CC, "stone", 0x3A3028],
ocyard: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028],
mldoor: ["wood", 0x7A5A3A, 0xE8E0CC, "plaster", 0x4A3A2A], mlstones: ["wood", 0x7A5A3A, 0xE8E0CC, "wood", 0x4A3A2A, 0x4A3A2A], mlhopper: ["wood", 0x7A5A3A, 0xE8E0CC, "wood", 0x4A3A2A],
mlwheel: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028], mlkiln: ["stone", 0x8A6A4A, 0xD8C8B0, "stone", 0x4A3A2A], mlsacks: ["wood", 0x7A5A3A, 0xE8E0CC, "wood", 0x4A3A2A],
mlmiller: ["wood", 0x6A4A2A, 0xE8E0CC, "plaster", 0x4A3A2A], mltoll: ["wood", 0x7A5A3A, 0xE8E0CC, "plaster", 0x4A3A2A], mlbins: ["wood", 0x7A5A3A, 0xE0D8C4, "wood", 0x4A3A2A],
mlflour: ["wood", 0xC8C0B0, 0xF4F0E8, "plaster", 0x4A3A2A], mlgears: ["wood", 0x6A4A2A, 0xD8D0C0, "wood", 0x4A3A2A], mlrace: ["stone", 0x6A6660, 0xC8C4BC, "stone", 0x3A3028],
mlstable: ["stone", 0x7A6A50, 0xC8B898, "wood", 0x4A3A2A], mldress: ["wood", 0x7A5A3A, 0xE8E0CC, "plaster", 0x4A3A2A], mlcats: ["wood", 0x7A5A3A, 0xE0D8C4, "wood", 0x4A3A2A],
mlroad: ["wood", 0x7A5A3A, 0xE8E0CC, "plaster", 0x4A3A2A]
});
evbRooms({
iehalf: { sides: ["evb_pumpkin", "benchin", "barrel"], far: ["evb_pumpkin"], rug: false, acts: [[0.35, 0, 1.8, "The half door", "read", evbIeHalf]] },
iekitchen: { far: ["fireplace", "evb_cauldron"], sides: ["benchin", "shelfgoods", "barrel", "chair"], mid: [["longtable", 0.55, 0]], rug: false, acts: [[0.5, 0, 2.0, "The hearth", "blow up the fire", evbIeKitchen]] },
iedresser: { far: ["evb_pewter", "evb_pewter"], sides: ["chair", "shelfgoods", "chair"], rug: false, acts: [[0.5, 0, 1.8, "The dresser", "read", evbIeDresser]] },
iesupper: { mid: [["longtable", 0.5, 0]], far: ["fireplace", "evb_pewter"], sides: ["chair", "candles", "chair", "chair", "candles"], rug: false, acts: [[0.5, 0, 2.0, "The empty place", "leave food", evbIeSupper]] },
iesettle: { far: ["benchin", "bed"], sides: ["footchest", "benchin"], rug: false, acts: [[0.5, 0, 1.8, "The settle bed", "read", evbIeSettle]] },
iebyre: { sides: ["trstall", "trhay", "trstall"], far: ["trtrough", "trhay"], rug: false, acts: [[0.5, 0, 1.8, "The cows", "listen", evbIeByre]] },
iedairy: { far: ["trchurns", "shelfgoods"], sides: ["trchurns", "barrel", "shelfgoods"], rug: false, acts: [[0.5, 0, 1.8, "The churn", "read", evbIeDairy]] },
ieturf: { grid: ["trlogs", 2, 2], sides: ["trlogs", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The turf", "read", evbIeTurf]] },
iewheel: { far: ["evb_spindle", "loom"], sides: ["chair", "footchest"], rug: false, acts: [[0.5, 0, 1.8, "The wheel", "spin", evbIeWheel]] },
iebrack: { far: ["oven", "shelfgoods"], sides: ["trbreadrack", "counter", "barrel"], mid: [["wd:kf_table", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The brack", "cut a slice", evbIeBrack]] },
ieroom: { far: ["bed", "clock"], sides: ["painting", "footchest", "painting", "chair"], acts: [[0.5, 0, 1.8, "The room", "read", evbIeRoom]] },
ieoutshot: { far: ["bed"], sides: ["chair", "footchest"], rug: false, acts: [[0.5, 0, 1.8, "The bed in the wall", "read", evbIeOutshot]] },
ieloft: { grid: ["trsacks", 2, 2], far: ["bed", "bed"], sides: ["trsacks", "evb_ladder"], rug: false, acts: [[0.5, 0, 1.8, "The loft", "read", evbIeLoft]] },
iestory: { far: ["fireplace"], sides: ["benchin", "chair", "benchin", "chair"], mid: [["chair", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The storyteller", "listen", evbIeStory]] },
iecharms: { sides: ["shelfgoods", "evb_pumpkin", "herbrack"], far: ["evb_cross"], rug: false, acts: [[0.5, 0, 1.8, "The charms", "read", evbIeCharms]] },
iewell: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "evb_pumpkin"], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "The well", "look in", evbIeWell]] },
ocporch: { sides: ["lantern", "benchin", "lantern"], far: ["noticeboard"], rug: false, acts: [[0.35, 0, 1.8, "The porch", "read", evbOcPorch]] },
ocnave: { grid: ["pew", 2, 4, "-u", 0.3, 0.75], sides: ["candles", "painting", "candles", "painting"], rug: false, ceil: "ironchandelier", acts: [[0.5, 0, 1.8, "The nave", "read", evbOcNave]] },
ocaisle: { sides: ["painting", "painting", "candles", "painting"], far: ["pew"], rug: false, acts: [[0.5, 0, 1.8, "The hatchments", "read", evbOcAisle]] },
ocaltar: { far: ["altarinside"], sides: ["candles", "pulpit", "candles", "lectern"], mid: [["redrunner", 0.4, 0, "+u"]], rug: false, acts: [[0.55, 0, 2.0, "The altar lamp", "pray", evbOcAltar]] },
ocbell: { mid: [["evb_bellrope", 0.5, 0]], sides: ["spiralstair", "lantern"], rug: false, acts: [[0.5, 0.2, 1.8, "The bell rope", "toll the bell", evbOcBell]] },
ocvestry: { far: ["wardrobe", "wardrobe"], sides: ["displaycase", "chair", "shelfgoods"], acts: [[0.5, 0, 1.8, "The vestry", "read", evbOcVestry]] },
ocregister: { mid: [["treasurechest", 0.5, 0]], sides: ["lectern", "bookshelf"], acts: [[0.5, 0.2, 1.8, "The parish chest", "read", evbOcRegister]] },
ocfont: { mid: [["evb_font", 0.5, 0]], sides: ["candles", "pew", "candles"], rug: false, acts: [[0.5, 0.2, 1.8, "The font", "read", evbOcFont]] },
ocmemorial: { sides: ["painting", "painting", "painting", "painting"], far: ["painting", "candles"], rug: false, acts: [[0.5, 0, 1.8, "The tablets", "read", evbOcMemorial]] },
ocwake: { far: ["bed", "candles"], sides: ["chair", "chair", "candles"], rug: false, acts: [[0.5, 0, 1.8, "The watching room", "read", evbOcWake]] },
occandle: { far: ["candles", "candles", "candles"], sides: ["candles", "pew", "candles"], rug: false, acts: [[0.5, 0, 1.8, "The candles", "light one", evbOcCandle]] },
ocsexton: { far: ["trtoolwall", "lantern"], sides: ["barrel", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The sexton's tools", "read", evbOcSexton]] },
ocbier: { mid: [["trbier", 0.5, 0]], sides: ["candles", "candles"], rug: false, acts: [[0.5, 0.2, 1.8, "The bier", "read", evbOcBier]] },
ocstones: { sides: ["evb_runestone", "evb_cross", "evb_runestone"], far: ["evb_cross"], rug: false, acts: [[0.5, 0, 1.8, "The carved stones", "read", evbOcStones]] },
ocwindow: { far: ["candles", "altarinside"], sides: ["pew", "pew"], rug: false, acts: [[0.5, 0, 1.8, "The window", "look out", evbOcWindow]] },
ocyard: { sides: ["lantern", "evb_cross", "lantern"], far: ["evb_cross"], rug: false, ceil: null, acts: [[0.5, 0, 1.8, "The graveyard door", "read", evbOcYard]] },
mldoor: { sides: ["trsacks", "barrel", "trsacks"], far: ["lantern"], rug: false, acts: [[0.35, 0, 1.8, "The mill", "read", evbMlDoor]] },
mlstones: { mid: [["trmillstone", 0.5, 0]], sides: ["trsacks", "trsacks", "barrel"], far: ["trmillstone"], rug: false, acts: [[0.5, 0.25, 2.0, "The millstones", "listen", evbMlStones]] },
mlhopper: { far: ["trmillstone", "trsacks"], sides: ["trsacks", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The hopper", "read", evbMlHopper]] },
mlwheel: { far: ["trpump", "trmillstone"], sides: ["barrel", "lantern", "barrel"], rug: false, acts: [[0.5, 0, 2.0, "The wheel", "watch", evbMlWheel]] },
mlkiln: { far: ["oven", "trsacks"], sides: ["trsacks", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The kiln", "read", evbMlKiln]] },
mlsacks: { grid: ["trsacks", 2, 2], sides: ["evb_ladder", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The hoist", "read", evbMlSacks]] },
mlmiller: { far: ["desk", "bed"], sides: ["chair", "bookshelf", "weighscale"], acts: [[0.5, 0, 1.8, "The miller", "read", evbMlMiller]] },
mltoll: { mid: [["weighscale", 0.5, 0]], sides: ["trsacks", "barrel"], rug: false, acts: [[0.5, 0.2, 1.8, "The toll dish", "read", evbMlToll]] },
mlbins: { grid: ["barrel", 2, 2], sides: ["trsacks", "barrel", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The bins", "read", evbMlBins]] },
mlflour: { far: ["trsacks", "trsacks"], sides: ["shelfgoods", "trsacks", "lantern"], rug: false, acts: [[0.5, 0, 1.8, "The flour", "read", evbMlFlour]] },
mlgears: { mid: [["flywheel", 0.5, 0]], sides: ["trtoolwall", "barrel"], rug: false, acts: [[0.5, 0.2, 1.8, "The gears", "read", evbMlGears]] },
mlrace: { far: ["trpump", "barrel"], sides: ["lantern", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The sluice", "read", evbMlRace]] },
mlstable: { sides: ["trstall", "trhay", "trstall"], far: ["trtrough"], rug: false, acts: [[0.5, 0, 1.8, "The donkey", "say hello", evbMlStable]] },
mldress: { far: ["workbench", "trmillstone"], sides: ["trtoolwall", "chair"], rug: false, acts: [[0.5, 0, 1.8, "The dresser's bench", "read", evbMlDress]] },
mlcats: { grid: ["barrel", 1, 2], sides: ["trsacks", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The cats", "look", evbMlCats]] },
mlroad: { far: ["chair", "lantern"], sides: ["trsacks", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The road", "look out", evbMlRoad]] }
});
"use strict";
evbTheme("victorian", { corner: "plant", seed: 151, panel: 0xC8B89A, pal: { fab: "crimson", fab2: "emerald", wood: "mahogany", metal: "brass", stone: "marble", art: 4, rug: 5, rugv: 1 },
remap: { "D6D0C6|plaster": [0xB8A888, "damask"], "D8D0C0|coffer": [0xE8E0D0, "plaster"] },
hello: "🎩 <b>Inside a house of the 1890s.</b> Gaslight, a ticking clock, the coal fire in the parlour, the bells to call the maid and, below stairs, the kitchen range. Look for the ✨ cards. The way out is the front door." });
evbHouse("victorian", { g: EVB_GRID.mid, h: 3.6, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The ground floor", "The bedrooms"], wall: 0xB8A888, trim: 0x3A2418,
plan: [{ hall: { k: "vhall", n: "The Front Hall" }, spine: { k: "vparlour", n: "The Parlour" }, gallery: { k: "vpassage", n: "The Back Passage" },
back: { merge: EVB_BACK, k: "vkitchen", n: "The Kitchen" },
r1i: { k: "vscullery", n: "The Scullery" }, r1o: { k: "vpantry", n: "The Pantry" },
r2i: { k: "vcoal", n: "The Coal Cellar" }, r2o: { k: "vlaundry", n: "The Laundry" },
r3i: { k: "vservants", n: "The Servants' Hall" }, r3o: { k: "vyard", n: "The Back Yard" },
l1i: { k: "vdining", n: "The Dining Room" }, l1o: { k: "vstudy", n: "The Study" },
l2i: { k: "vmorning", n: "The Morning Room" }, l2o: { k: "vconserv", n: "The Conservatory" },
l3i: { k: "vlibrary", n: "The Library" }, l3o: { k: "vsmoking", n: "The Smoking Room" } },
{ hall: { k: "vlanding", n: "The Landing" }, spine: { k: "vdrawing", n: "The Drawing Room" }, gallery: { k: "vdressing", n: "The Dressing Room" },
back: { merge: EVB_BACK, k: "vmaster", n: "The Best Bedroom" },
r1: { merge: ["r1i", "r1o"], k: "vnursery", n: "The Nursery" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "vbath", n: "The Bathroom" },
l1: { merge: ["l1i", "l1o"], k: "vguest", n: "The Guest Room" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "vattic", n: "The Maids' Attic" } }] });
var evbVHall = evbInfo("The front hall", "A hall stand for hats, coats and umbrellas, a tray for calling cards, and the gas turned low. A visitor leaves a card; if the lady of the house is 'at home', they are shown up to the drawing room.");
function evbVParlour() { return __ZC(367, 203, this, arguments, new.target); }
var evbVPassage = evbInfo("The back passage", "The green baize door: on one side the family, on the other the servants. A board of bells on springs shows which room has rung.");
function evbVKitchen() { return __ZC(367, 204, this, arguments, new.target); }
var evbVScullery = evbInfo("The scullery", "A stone sink, a pump or a cold tap, the copper pans scoured with sand: the scullery maid's room, the lowest job in the house.");
var evbVPantry = evbInfo("The pantry", "Bread, cheese, the cold joint under a wire cover. There is no refrigerator: a big house had ice delivered for the ice box.");
var evbVCoal = evbInfo("The coal cellar", "The coalman tips his sacks down a hole in the pavement into the cellar under the street. Every fire in the house is fed from here, by the bucket.");
var evbVLaundry = evbInfo("The laundry", "Monday was washing day: the copper boiled, the clothes were pounded with a dolly, wrung through the mangle and hung to dry on the airer.");
var evbVServants = evbInfo("The servants' hall", "Where the servants eat, at a long table, in order of rank: the butler or the housekeeper at the head, the kitchen maid at the bottom.");
var evbVYard = evbInfo("The back yard", "The privy, the dustbin, the water butt and a line of washing. The muffin man and the milkman come to the area steps.");
var evbVDining = evbInfo("The dining room", "Dark wood, a heavy sideboard, the silver laid out. Dinner can be many courses: soup, fish, a joint, a pudding, and dessert.");
function evbVStudy() {
evbCard("The study", "The master's desk, his books, his papers, a globe, and a decanter. Nobody disturbs him here.", [
["Spin the globe", function () { worldCard(null); evbSay("🌍 Much of the map is coloured pink: the British Empire, at its height in the 1890s."); }]
]);
}
var evbVMorning = evbInfo("The morning room", "A light room facing the morning sun, where the lady of the house writes her letters and sees the cook about the day's meals.");
var evbVConserv = evbInfo("The conservatory", "Glass and iron, ferns and palms. The Victorians went mad for ferns: 'pteridomania', they called it.");
var evbVLibrary = evbInfo("The library", "Shelves of bound books, the newspapers on a rack, a reading lamp. Novels came out in parts in magazines, and people waited for the next one.");
var evbVSmoking = evbInfo("The smoking room", "After dinner the gentlemen go here for cigars and port, and talk of politics; smoking in front of ladies was thought rude.");
var evbVLanding = evbInfo("The landing", "The stair carpet held down with brass rods, family photographs on the walls, and the gas lamp turned down for the night.");
function evbVDrawing() { evbTune([523, 659, 784], 300, 0.8); evbSay("🫖 The drawing room, the best room in the house: the ladies 'withdraw' here after dinner. Afternoon tea is at four o'clock."); }
var evbVDressing = evbInfo("The dressing room", "Collars and cuffs are separate from the shirt, starched stiff; a lady needs help to lace her corset.");
var evbVMaster = evbInfo("The best bedroom", "A brass bed, a washstand with a jug and bowl, a chamber pot underneath, and a hot-water bottle of stone.");
function evbVNursery() { evbTune([392, 330, 262, 330, 392], 300, 0.9); evbSay("🧸 The nursery, with its rocking horse and fireguard. The children live up here with their nanny and come down to see their parents for an hour after tea."); }
var evbVBath = evbInfo("The bathroom", "A new thing: a bath with taps and a gas geyser to heat the water (it could bang alarmingly). Older houses still filled a tin bath before the fire.");
var evbVGuest = evbInfo("The guest room", "Made up and waiting. Visitors from the country arrive by train and stay a week.");
var evbVAttic = evbInfo("The maids' attic", "Under the roof, cold in winter and hot in summer: iron beds and a little window. The maids are up at six to light the fires.");
evbTheme("talecottage", { corner: "barrel", seed: 153, panel: 0xD8CCB0, pal: { fab: "terracotta", fab2: "sage", wood: "oak", metal: "iron", stone: "granite", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE8DCC0, "plaster"], "D8D0C0|coffer": [0x4A3A2A, "wood"] },
hello: "🏡 <b>Inside a cottage out of the old tales.</b> A fire on the hearth, a pot on the hook, a spinning wheel, a loaf on the table and the goat in the shed. Look for the ✨ cards. The way out is the cottage door." });
evbHouse("talecottage", { g: EVB_GRID.mid, h: 3.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The cottage"], wall: 0xE8DCC0, trim: 0x4A3A2A,
plan: [{ hall: { k: "tcdoor", n: "The Cottage Door" }, spine: { k: "tchearth", n: "The Hearth" }, gallery: { k: "tcbeam", n: "The Beams" },
back: { merge: EVB_BACK, k: "tctable", n: "The Table" },
r1i: { k: "tcbed", n: "The Box Bed" }, r1o: { k: "tcgoat", n: "The Goat Shed" },
r2i: { k: "tcoven", n: "The Bread Oven" }, r2o: { k: "tcwood", n: "The Woodpile" },
r3i: { k: "tcwheel", n: "The Spinning Wheel" }, r3o: { k: "tchens", n: "The Hen House" },
l1i: { k: "tcchest", n: "The Dower Chest" }, l1o: { k: "tcherbs", n: "The Herb Corner" },
l2i: { k: "tcloft", n: "The Loft" }, l2o: { k: "tccellar", n: "The Root Cellar" },
l3i: { k: "tccradle", n: "The Cradle" }, l3o: { k: "tcwell", n: "The Well" } }] });
var evbTcDoor = evbInfo("The cottage door", "A plank door with a wooden latch. In the old tales, whoever knocks may be a poor old woman, a wolf, or a king in disguise: be kind, to be safe.");
function evbTcHearth() { return __ZC(367, 205, this, arguments, new.target); }
var evbTcBeam = evbInfo("The beams", "Hams and strings of onions hang from the smoke-blackened beams, and bunches of herbs drying.");
var evbTcTable = evbInfo("The table", "A scrubbed table, wooden bowls and spoons, a loaf and a jug of milk. Supper is at dusk: candles cost money.");
var evbTcBed = evbInfo("The box bed", "A bed built like a cupboard, with doors you shut at night to keep out the cold: the whole family may sleep in one.");
function evbTcGoat() { evbTune([330, 294], 350, 0.6); evbSay("🐐 The nanny goat gives milk for the family and makes a little cheese. In many tales an animal is a friend who helps the poor and the kind."); }
function evbTcOven() { evbSay("🍞 The bread oven: a fire is lit inside, raked out when it is hot, and the loaves go in on a long wooden peel."); }
var evbTcWood = evbInfo("The woodpile", "Gathering fallen wood in the forest was the poor's right in many places; cutting the lord's trees could cost a hand. Woodcutters are the heroes of many tales.");
function evbTcWheel() { evbTune([262, 294, 330, 294], 250, 0.6); evbSay("🧶 The spinning wheel hums. In 'Rumpelstiltskin' a miller's daughter is set to spin straw into gold."); }
function evbTcHens() { evbTune([784, 698, 784], 200, 0.5); evbSay("🐔 The hens cluck. An egg a day from a good hen, and a fox that wants them all."); }
var evbTcChest = evbInfo("The dower chest", "A painted chest with the linen a girl gathers for her wedding, sheet by sheet, over years.");
var evbTcHerbs = evbInfo("The herb corner", "Feverfew, comfrey, camomile, rue: every cottage has its cures, and every village its wise woman.");
var evbTcLoft = evbInfo("The loft", "A ladder up under the thatch: sacks of grain, apples laid out in rows, the children's straw beds.");
var evbTcCellar = evbInfo("The root cellar", "Turnips, cabbages, apples and a barrel of salt meat to last the winter. A bad harvest means a hungry spring.");
function evbTcCradle() { evbTune([392, 330, 392, 330], 400, 1); evbSay("👶 You rock the wooden cradle. 'Rock-a-bye baby, on the tree top...'"); }
function evbTcWell() { evbSay("🪣 You wind up the bucket. In the Grimms' 'Frau Holle', a girl falls down a well into a world below."); }
evbTheme("mudbrick", { corner: "plant", seed: 155, panel: 0xE0C8A0, pal: { fab: "terracotta", fab2: "teal", wood: "cherry", metal: "copper", stone: "sandstone", art: 5, rug: 6, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE8D4B0, "plaster"], "D8D0C0|coffer": [0x6A4A2A, "wood"] },
hello: "🏺 <b>Inside a courtyard house of the old East.</b> Thick mud-brick walls that keep out the heat, every room opening onto the courtyard, carpets and cushions, water jars, and the flat roof to sleep on in summer. Look for the ✨ cards. The way out is the street door." });
evbHouse("mudbrick", { g: EVB_GRID.mid, h: 3.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The house"], wall: 0xE8D4B0, trim: 0x6A4A2A,
plan: [{ hall: { k: "mbdoor", n: "The Street Door" }, spine: { k: "mbcourt", n: "The Courtyard" }, gallery: { k: "mbarcade", n: "The Shaded Walk" },
back: { merge: EVB_BACK, k: "mbguest", n: "The Guest Hall" },
r1i: { k: "mbkitchen", n: "The Kitchen" }, r1o: { k: "mboven", n: "The Bread Oven" },
r2i: { k: "mbjars", n: "The Store of Jars" }, r2o: { k: "mbwater", n: "The Water Jars" },
r3i: { k: "mbloom", n: "The Loom" }, r3o: { k: "mbstable", n: "The Donkey's Stall" },
l1i: { k: "mbsleep", n: "The Sleeping Room" }, l1o: { k: "mbroof", n: "The Stair to the Roof" },
l2i: { k: "mbtablets", n: "The Accounts" }, l2o: { k: "mbshrine", n: "The House Shrine" },
l3i: { k: "mbstory", n: "The Storyteller's Cushion" }, l3o: { k: "mbwork", n: "The Workroom" } }] });
var evbMbDoor = evbInfo("The street door", "A narrow, plain door on a narrow, shaded lane: the house shows the street nothing, and keeps its life within.");
function evbMbCourt() { evbTune([523, 587, 659], 300, 0.8); evbSay("🌴 The courtyard: open to the sky, cool in the evening, with a palm or a little fountain. The rooms all look inward, onto it."); }
var evbMbArcade = evbInfo("The shaded walk", "A roofed walk round the courtyard, out of the sun. The cooler rooms face north.");
function evbMbGuest() { return __ZC(367, 206, this, arguments, new.target); }
var evbMbKitchen = evbInfo("The kitchen", "A clay stove, pots of lentils and onions, a mortar for grinding grain. The smoke goes out through a hole in the roof.");
function evbMbOven() { evbSay("🫓 Flat bread is slapped onto the hot inside wall of a round clay oven and peeled off when it puffs and browns: a way of baking older than writing."); }
var evbMbJars = evbInfo("The store of jars", "Tall jars of barley, oil, dates and wine, sealed with clay. In the Nights, Ali Baba's slave girl Morgiana found forty thieves hidden in oil jars like these.");
var evbMbWater = evbInfo("The water jars", "Porous clay jars, standing in the draught: the water seeps through and evaporates, and keeps cool. Carried up from the river or the well every day.");
function evbMbLoom() { evbTune([294, 330], 250, 0.6); evbSay("🧵 The loom clacks: wool and linen for clothes and carpets."); }
function evbMbStable() { evbTune([262, 220, 262], 300, 0.6); evbSay("🫏 The donkey in its stall brays: it carries the water, the grain and the master to market."); }
var evbMbSleep = evbInfo("The sleeping room", "Mats and rugs on the floor, rolled up in the day. In the hottest months, the family sleeps on the roof.");
var evbMbRoof = evbInfo("The stair to the roof", "The flat roof, of beams and packed mud, is another room: for drying dates and washing, for sleeping in summer, and for looking at the stars.");
var evbMbTablets = evbInfo("The accounts", "The master's records: what he lent, what he owes. In old Uruk such accounts were pressed into clay tablets; this is how writing began.");
var evbMbShrine = evbInfo("The house shrine", "A niche with a lamp and a little figure, where the household keeps its own small gods or prayers.");
function evbMbStory() { return __ZC(367, 207, this, arguments, new.target); }
var evbMbWork = evbInfo("The workroom", "The master's trade: a potter's wheel, a weaver's frame, a coppersmith's hammers. Many houses were shops and workshops too.");
evbTheme("roundhut", { corner: "barrel", seed: 157, panel: 0xC8A878, pal: { fab: "terracotta", fab2: "mustard", wood: "ash", metal: "iron", stone: "sand", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xC8A878, "plaster"], "D8D0C0|coffer": [0x6A5030, "wood"] },
hello: "🛖 <b>Inside a round thatched hut.</b> Walls of wattle and clay, the thatch rising to a point over the fire, mats to sit and sleep on, pots, baskets and the tools of the day. Look for the ✨ cards. The way out is the low door." });
evbHouse("roundhut", { g: EVB_GRID.mid, h: 3.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The hut"], wall: 0xC8A878, trim: 0x5A4028,
plan: [{ hall: { k: "rhdoor", n: "The Low Door" }, spine: { k: "rhfire", n: "The Fire" }, gallery: { k: "rhthatch", n: "Under the Thatch" },
back: { merge: EVB_BACK, k: "rhmeal", n: "The Meal" },
r1i: { k: "rhmats", n: "The Sleeping Mats" }, r1o: { k: "rhpots", n: "The Pots" },
r2i: { k: "rhgrain", n: "The Grain Store" }, r2o: { k: "rhgrind", n: "The Grinding Stone" },
r3i: { k: "rhbaskets", n: "The Baskets" }, r3o: { k: "rhtools", n: "The Tools" },
l1i: { k: "rhdrum", n: "The Drum" }, l1o: { k: "rhhides", n: "The Hides" },
l2i: { k: "rhwater", n: "The Water Gourds" }, l2o: { k: "rhstory", n: "The Story by the Fire" },
l3i: { k: "rhgoats", n: "The Goats' Pen" }, l3o: { k: "rhyard", n: "The Yard" } }] });
var evbRhDoor = evbInfo("The low door", "You stoop to come in. A low door keeps in the warmth and keeps out the wind, the rain and wild animals.");
function evbRhFire() { evbTune([196, 220, 196], 400, 0.8); evbSay("🔥 The fire in the middle never goes out. Its smoke rises through the thatch and keeps out the insects."); }
var evbRhThatch = evbInfo("Under the thatch", "Grass or reeds laid thick on a frame of poles: shedding the rain, cool in the heat, warm at night.");
var evbRhMeal = evbInfo("The meal", "A pot of porridge or stew shared from one bowl, eaten with the right hand. Food is shared with anyone who comes.");
var evbRhMats = evbInfo("The sleeping mats", "Woven mats and skins, rolled up in the day.");
var evbRhPots = evbInfo("The pots", "Clay pots, shaped by hand without a wheel and fired in a bonfire.");
var evbRhGrain = evbInfo("The grain store", "Grain is kept in a raised clay bin with a lid, safe from damp and rats.");
function evbRhGrind() { evbTune([110, 98, 110], 300, 0.8); evbSay("🌾 Grain is ground on a flat stone with a smaller stone rubbed back and forth: hard work, every day."); }
var evbRhBaskets = evbInfo("The baskets", "Baskets of grass and reed, woven so tight some can hold water.");
var evbRhTools = evbInfo("The tools", "A hoe, a knife, a spear for hunting, a bow and arrows.");
function evbRhDrum() { evbTune([98, 98, 131, 98], 250, 1); evbSay("🥁 The drum: for dancing, for news, for calling people together."); }
var evbRhHides = evbInfo("The hides", "Skins scraped, stretched and dried in the sun, for cloaks, bags and bedding.");
var evbRhWater = evbInfo("The water gourds", "Dried gourds and clay pots of water, carried from the river or the spring.");
function evbRhStory() { evbSay("🌙 By the fire at night the old people tell the stories: how the world began, why the leopard has spots, the trickster who fooled the strong."); }
function evbRhGoats() { evbTune([330, 294], 350, 0.6); evbSay("🐐 The goats are brought in at night, safe from the leopards."); }
var evbRhYard = evbInfo("The yard", "Swept bare earth round the hut, where the cooking, the work and the talk go on in the day.");
evbFins({
vhall: ["wood", 0x5A3A22, 0xB8A888, "damask", 0x3A2418], vparlour: ["wood", 0x5A3A22, 0x8A2A2A, "damask", 0x3A2418, 0xE8E0D0], vpassage: ["wood", 0x6A4A2A, 0xC8C0A8, "plaster", 0x3A2418],
vkitchen: ["tile", 0x8A3A2A, 0xE8E4D8, "tile", 0x3A2418, 0xE8E0D0], vscullery: ["stone", 0x8A8478, 0xE0DCD0, "tile", 0x3A2418], vpantry: ["stone", 0x8A8478, 0xE8E4D8, "plaster", 0x3A2418],
vcoal: ["stone", 0x4A4640, 0x8A8478, "stone", 0x2A2420], vlaundry: ["stone", 0x8A8478, 0xE0DCD0, "tile", 0x3A2418], vservants: ["wood", 0x6A4A2A, 0xD8D0B8, "plaster", 0x3A2418],
vyard: ["stone", 0x7A7468, 0xC8C0B0, "stone", 0x3A2418], vdining: ["wood", 0x4A2A1A, 0x5A2A2A, "damask", 0x2A1810, 0xE8E0D0], vstudy: ["wood", 0x4A2A1A, 0x2A4A3A, "wood", 0x2A1810],
vmorning: ["wood", 0x6A4A2A, 0xD8C8A0, "damask", 0x3A2418], vconserv: ["tile", 0x8A8478, 0xE8F0E0, "plaster", 0x4A5A3A], vlibrary: ["wood", 0x4A2A1A, 0x3A2A1A, "wood", 0x2A1810],
vsmoking: ["wood", 0x4A2A1A, 0x4A3A2A, "wood", 0x2A1810],
vlanding: ["wood", 0x5A3A22, 0xB8A888, "damask", 0x3A2418], vdrawing: ["wood", 0x6A4A2A, 0xC8A8A8, "damask", 0x3A2418, 0xF0E8D8], vdressing: ["wood", 0x6A4A2A, 0xC8B8A0, "damask", 0x3A2418],
vmaster: ["wood", 0x5A3A22, 0x9AAA8A, "damask", 0x3A2418, 0xE8E0D0], vnursery: ["wood", 0x7A5A3A, 0xD8E0C8, "plaster", 0x3A2418], vbath: ["tile", 0xE8E4DC, 0xF0F0E8, "tile", 0x3A2418],
vguest: ["wood", 0x6A4A2A, 0xC8B8C8, "damask", 0x3A2418], vattic: ["wood", 0x7A5A3A, 0xD8D0C0, "plaster", 0x3A2418],
tcdoor: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A], tchearth: ["stone", 0x6A6458, 0xE0D4B8, "plaster", 0x4A3A2A, 0x3A2A1A], tcbeam: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x3A2A1A],
tctable: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A, 0x3A2A1A], tcbed: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A], tcgoat: ["stone", 0x6A5A48, 0xC8B898, "wood", 0x3A2A1A],
tcoven: ["stone", 0x7A6A58, 0xD8CCB0, "stone", 0x4A3A2A], tcwood: ["wood", 0x6A5A40, 0xC8B898, "wood", 0x3A2A1A], tcwheel: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A],
tchens: ["stone", 0x6A5A48, 0xC8B898, "wood", 0x3A2A1A], tcchest: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A], tcherbs: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A],
tcloft: ["wood", 0x7A5A3A, 0xD8CCB0, "wood", 0x3A2A1A], tccellar: ["stone", 0x5A5248, 0xA89A80, "stone", 0x3A2A1A], tccradle: ["wood", 0x6A5A40, 0xE8DCC0, "plaster", 0x4A3A2A],
tcwell: ["stone", 0x8A8478, 0xD8D0C0, "stone", 0x3A2A1A],
mbdoor: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x6A4A2A], mbcourt: ["tile", 0xC88A5A, 0xE8D4B0, "plaster", 0x6A4A2A], mbarcade: ["tile", 0xC88A5A, 0xE8D4B0, "plaster", 0x6A4A2A],
mbguest: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x2A6A6A, 0x6A4A2A], mbkitchen: ["stone", 0xA88A60, 0xD8C4A0, "plaster", 0x6A4A2A], mboven: ["stone", 0xA88A60, 0xD8C4A0, "plaster", 0x6A4A2A],
mbjars: ["stone", 0xA88A60, 0xD8C4A0, "plaster", 0x6A4A2A], mbwater: ["stone", 0xA88A60, 0xD8C4A0, "plaster", 0x6A4A2A], mbloom: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x6A4A2A],
mbstable: ["stone", 0x9A7A50, 0xC8B090, "plaster", 0x6A4A2A], mbsleep: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x6A4A2A], mbroof: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x6A4A2A],
mbtablets: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x6A4A2A], mbshrine: ["stone", 0xB89A70, 0xE0C8A0, "plaster", 0x6A4A2A], mbstory: ["stone", 0xB89A70, 0xE8D4B0, "plaster", 0x2A6A6A],
mbwork: ["stone", 0xA88A60, 0xD8C4A0, "plaster", 0x6A4A2A],
rhdoor: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhfire: ["stone", 0x7A5A3A, 0xC0A070, "plaster", 0x5A4028, 0x4A3020], rhthatch: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028],
rhmeal: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028, 0x4A3020], rhmats: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhpots: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028],
rhgrain: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhgrind: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhbaskets: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028],
rhtools: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhdrum: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhhides: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028],
rhwater: ["stone", 0x8A6A48, 0xC8A878, "plaster", 0x5A4028], rhstory: ["stone", 0x7A5A3A, 0xC0A070, "plaster", 0x5A4028], rhgoats: ["stone", 0x7A6040, 0xB89868, "wood", 0x5A4028],
rhyard: ["stone", 0x9A7A58, 0xC8A878, "plaster", 0x5A4028]
});
evbRooms({
vhall: { sides: ["wd:kf_coatrack", "wallmirror", "plant"], far: ["clock"], acts: [[0.35, 0, 1.8, "The hall stand", "read", evbVHall]] },
vparlour: { far: ["fireplace", "piano"], sides: ["armchair", "sofa", "plant", "armchair", "painting"], mid: [["wd:kf_table", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The parlour", "sit by the fire", evbVParlour]] },
vpassage: { sides: ["esbellboard", "wd:kf_coatrack", "shelfgoods"], far: ["clock"], rug: false, acts: [[0.5, 0, 1.8, "The bell board", "read", evbVPassage]] },
vkitchen: { far: ["stove", "oven", "shelfgoods"], sides: ["butcherblock", "shelfgoods", "sink", "barrel", "trbreadrack"], mid: [["longtable", 0.55, 0]], rug: false, ceil: "lantern", acts: [[0.5, 0, 2.2, "The range", "ring for tea", evbVKitchen]] },
vscullery: { far: ["sink", "shelfgoods"], sides: ["barrel", "shelfgoods", "trpump"], rug: false, acts: [[0.5, 0, 1.8, "The sink", "read", evbVScullery]] },
vpantry: { far: ["shelfgoods", "shelfgoods"], sides: ["trbreadrack", "barrel", "shelfgoods"], rug: false, acts: [[0.5, 0, 1.8, "The pantry", "read", evbVPantry]] },
vcoal: { grid: ["trsacks", 2, 2], sides: ["barrel", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The coal", "read", evbVCoal]] },
vlaundry: { far: ["trcopper", "gwrmangle"], sides: ["barrel", "gwrairer", "sink"], rug: false, acts: [[0.5, 0, 1.8, "The copper", "read", evbVLaundry]] },
vservants: { mid: [["longtable", 0.5, 0]], sides: ["chair", "chair", "shelfgoods", "chair", "clock"], far: ["stove"], rug: false, acts: [[0.5, 0, 1.8, "The servants' table", "read", evbVServants]] },
vyard: { mid: [["evb_rainbarrel", 0.5, 0]], sides: ["barrel", "crates", "trlogs"], rug: false, ceil: null, acts: [[0.5, 0.2, 1.8, "The yard", "read", evbVYard]] },
vdining: { mid: [["feasttable", 0.5, 0]], far: ["ghrsideboard", "fireplace"], sides: ["chair", "painting", "chair", "chair", "painting", "chair"], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The dining table", "read", evbVDining]] },
vstudy: { far: ["desk", "bookshelf"], sides: ["esglobe", "armchair", "bookshelf", "filecabinet"], acts: [[0.5, 0, 1.8, "The globe", "spin it", evbVStudy]] },
vmorning: { far: ["desk", "plant"], sides: ["armchair", "painting", "sofa"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The writing desk", "read", evbVMorning]] },
vconserv: { grid: ["plant", 2, 2], sides: ["plant", "armchair", "plant"], far: ["plant", "plant"], rug: false, acts: [[0.5, 0, 1.8, "The ferns", "read", evbVConserv]] },
vlibrary: { far: ["bookshelf", "bookshelf"], sides: ["bookshelf", "armchair", "bookshelf", "lamp"], mid: [["desk", 0.5, 0]], acts: [[0.5, 0, 1.8, "The books", "read", evbVLibrary]] },
vsmoking: { far: ["fireplace"], sides: ["armchair", "ghrcardtable", "armchair", "painting"], mid: [["esbilliard", 0.5, 0]], acts: [[0.5, 0, 1.8, "The smoking room", "read", evbVSmoking]] },
vlanding: { sides: ["painting", "plant", "painting"], far: ["clock"], acts: [[0.4, 0, 1.8, "The landing", "read", evbVLanding]] },
vdrawing: { far: ["fireplace", "piano"], sides: ["sofa", "armchair", "plant", "armchair", "painting", "ghrteatable"], mid: [["wd:kf_table", 0.5, 0]], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The tea table", "take tea", evbVDrawing]] },
vdressing: { far: ["wardrobe", "wallmirror"], sides: ["dressform", "footchest", "wardrobe"], acts: [[0.5, 0, 1.8, "The dressing room", "read", evbVDressing]] },
vmaster: { far: ["fourposter"], sides: ["wardrobe", "vcbasin", "painting", "footchest", "chair"], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The bed", "read", evbVMaster]] },
vnursery: { far: ["crib"], sides: ["toys", "evb_rocking", "toys", "footchest"], acts: [[0.5, 0, 1.8, "The rocking horse", "rock it", evbVNursery]] },
vbath: { far: ["vcbath"], sides: ["vcbasin", "wallmirror", "vcchaise"], rug: false, acts: [[0.5, 0, 1.8, "The geyser", "read", evbVBath]] },
vguest: { far: ["bed"], sides: ["wardrobe", "chair", "vcbasin"], acts: [[0.5, 0, 1.8, "The guest room", "read", evbVGuest]] },
vattic: { grid: ["bed", 2, 2, "-u", 0.3, 0.7], sides: ["footchest", "footchest"], rug: false, acts: [[0.5, 0, 1.8, "The attic", "read", evbVAttic]] },
tcdoor: { sides: ["benchin", "barrel", "trlogs"], far: ["herbrack"], rug: false, acts: [[0.35, 0, 1.8, "The door", "read", evbTcDoor]] },
tchearth: { far: ["fireplace", "evb_cauldron"], sides: ["benchin", "shelfgoods", "barrel", "chair"], rug: false, acts: [[0.5, 0, 2.0, "The pot", "stir it", evbTcHearth]] },
tcbeam: { far: ["trmeathooks", "herbrack"], sides: ["shelfgoods", "chair"], rug: false, acts: [[0.5, 0, 1.8, "The beams", "read", evbTcBeam]] },
tctable: { mid: [["longtable", 0.5, 0]], far: ["shelfgoods", "evb_pewter"], sides: ["benchin", "chair", "benchin", "candles"], rug: false, acts: [[0.5, 0, 2.0, "The table", "read", evbTcTable]] },
tcbed: { far: ["bed", "bed"], sides: ["footchest", "chair"], rug: false, acts: [[0.5, 0, 1.8, "The box bed", "read", evbTcBed]] },
tcgoat: { sides: ["trstall", "trhay", "trstall"], far: ["trtrough"], rug: false, acts: [[0.5, 0, 1.8, "The goat", "say hello", evbTcGoat]] },
tcoven: { far: ["oven", "trbreadrack"], sides: ["trsacks", "counter", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The oven", "read", evbTcOven]] },
tcwood: { grid: ["trlogs", 2, 2], sides: ["trlogs", "trsaw"], rug: false, acts: [[0.5, 0, 1.8, "The woodpile", "read", evbTcWood]] },
tcwheel: { far: ["evb_spindle", "loom"], sides: ["chair", "footchest"], rug: false, acts: [[0.5, 0, 1.8, "The wheel", "spin", evbTcWheel]] },
tchens: { sides: ["trhay", "trcages", "trhay"], far: ["trtrough"], rug: false, acts: [[0.5, 0, 1.8, "The hens", "listen", evbTcHens]] },
tcchest: { far: ["footchest", "treasurechest"], sides: ["chair", "footchest"], acts: [[0.5, 0, 1.8, "The chest", "read", evbTcChest]] },
tcherbs: { far: ["herbrack", "herbrack"], sides: ["evb_jars", "workbench", "herbrack"], rug: false, acts: [[0.5, 0, 1.8, "The herbs", "read", evbTcHerbs]] },
tcloft: { grid: ["trsacks", 2, 2], far: ["bed", "bed"], sides: ["evb_ladder"], rug: false, acts: [[0.5, 0, 1.8, "The loft", "read", evbTcLoft]] },
tccellar: { grid: ["barrel", 2, 2], sides: ["trveg", "trsacks", "trveg"], rug: false, acts: [[0.5, 0, 1.8, "The cellar", "read", evbTcCellar]] },
tccradle: { far: ["crib"], sides: ["evb_rocking", "footchest"], acts: [[0.5, 0, 1.8, "The cradle", "rock it", evbTcCradle]] },
tcwell: { mid: [["evb_well", 0.5, 0]], sides: ["barrel", "evb_rainbarrel"], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "The well", "draw water", evbTcWell]] },
mbdoor: { sides: ["dpx_amphora", "benchin", "plant"], far: ["plant"], rug: false, acts: [[0.35, 0, 1.8, "The street door", "read", evbMbDoor]] },
mbcourt: { mid: [["ghrfountain", 0.5, 0]], sides: ["plant", "dpx_amphora", "plant", "benchin"], rug: false, ceil: null, acts: [[0.5, 0.25, 2.0, "The courtyard", "sit a while", evbMbCourt]] },
mbarcade: { sides: ["benchin", "plant", "dpx_amphora"], far: ["plant"], rug: false, acts: [[0.5, 0, 1.8, "The shaded walk", "read", evbMbArcade]] },
mbguest: { far: ["sofa", "dpx_couch"], sides: ["dpx_couch", "dpx_oillamp", "sofa", "dpx_oillamp"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 2.0, "The guest hall", "read", evbMbGuest]] },
mbkitchen: { far: ["stove", "shelfgoods"], sides: ["dpx_amphora", "counter", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The stove", "read", evbMbKitchen]] },
mboven: { far: ["oven", "trbreadrack"], sides: ["trsacks", "counter"], rug: false, acts: [[0.5, 0, 1.8, "The oven", "bake", evbMbOven]] },
mbjars: { grid: ["dpx_amphorae", 2, 2], sides: ["dpx_amphora", "dpx_amphora"], rug: false, acts: [[0.5, 0, 1.8, "The jars", "read", evbMbJars]] },
mbwater: { far: ["dpx_amphorae", "dpx_amphora"], sides: ["dpx_amphora", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The water jars", "read", evbMbWater]] },
mbloom: { far: ["loom", "dpx_loom"], sides: ["chair", "footchest"], acts: [[0.5, 0, 1.8, "The loom", "weave", evbMbLoom]] },
mbstable: { sides: ["trstall", "trhay"], far: ["trtrough"], rug: false, acts: [[0.5, 0, 1.8, "The donkey", "say hello", evbMbStable]] },
mbsleep: { far: ["bed", "bed"], sides: ["footchest", "rug", "footchest"], acts: [[0.5, 0, 1.8, "The mats", "read", evbMbSleep]] },
mbroof: { sides: ["spiralstair", "plant"], far: ["dpx_amphora"], rug: false, acts: [[0.5, 0, 1.8, "The roof stair", "read", evbMbRoof]] },
mbtablets: { far: ["desk", "dpx_scrolls"], sides: ["shelfgoods", "chair"], acts: [[0.5, 0, 1.8, "The accounts", "read", evbMbTablets]] },
mbshrine: { far: ["altarinside"], sides: ["candles", "dpx_oillamp", "candles"], rug: false, acts: [[0.5, 0, 1.8, "The shrine", "read", evbMbShrine]] },
mbstory: { far: ["sofa"], sides: ["dpx_couch", "dpx_oillamp", "dpx_couch"], mid: [["rug", 0.5, 0]], acts: [[0.5, 0, 1.8, "The storyteller", "listen", evbMbStory]] },
mbwork: { far: ["potterswheel", "workbench"], sides: ["shelfgoods", "dpx_amphora", "trtoolwall"], rug: false, acts: [[0.5, 0, 1.8, "The workroom", "read", evbMbWork]] },
rhdoor: { sides: ["benchin", "pelt"], far: ["firebowl"], rug: false, acts: [[0.35, 0, 1.8, "The door", "read", evbRhDoor]] },
rhfire: { mid: [["firebowl", 0.5, 0]], sides: ["pelt", "benchin", "pelt"], far: ["dpx_amphora"], rug: false, acts: [[0.5, 0.25, 2.0, "The fire", "read", evbRhFire]] },
rhthatch: { sides: ["pelt", "shelfgoods"], far: ["trherbs"], rug: false, acts: [[0.5, 0, 1.8, "The thatch", "read", evbRhThatch]] },
rhmeal: { mid: [["evb_cauldron", 0.5, 0]], sides: ["pelt", "benchin", "pelt"], rug: false, acts: [[0.5, 0.25, 2.0, "The meal", "read", evbRhMeal]] },
rhmats: { far: ["pelt", "pelt"], sides: ["pelt", "footchest"], rug: false, acts: [[0.5, 0, 1.8, "The mats", "read", evbRhMats]] },
rhpots: { far: ["dpx_amphorae", "dpx_amphora"], sides: ["dpx_amphora", "shelfgoods"], rug: false, acts: [[0.5, 0, 1.8, "The pots", "read", evbRhPots]] },
rhgrain: { grid: ["barrel", 2, 2], sides: ["trsacks", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The grain store", "read", evbRhGrain]] },
rhgrind: { mid: [["trstones", 0.5, 0]], sides: ["trsacks", "pelt"], rug: false, acts: [[0.5, 0.2, 1.8, "The grinding stone", "grind", evbRhGrind]] },
rhbaskets: { far: ["trveg", "shelfgoods"], sides: ["trveg", "trherbs"], rug: false, acts: [[0.5, 0, 1.8, "The baskets", "read", evbRhBaskets]] },
rhtools: { far: ["weaponrack", "trtoolwall"], sides: ["workbench", "pelt"], rug: false, acts: [[0.5, 0, 1.8, "The tools", "read", evbRhTools]] },
rhdrum: { far: ["pelt"], sides: ["benchin", "pelt", "benchin"], mid: [["barrel", 0.5, 0]], rug: false, acts: [[0.5, 0, 1.8, "The drum", "play", evbRhDrum]] },
rhhides: { far: ["pelt", "pelt"], sides: ["pelt", "workbench"], rug: false, acts: [[0.5, 0, 1.8, "The hides", "read", evbRhHides]] },
rhwater: { far: ["dpx_amphorae"], sides: ["dpx_amphora", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The water", "read", evbRhWater]] },
rhstory: { mid: [["firebowl", 0.5, 0]], sides: ["pelt", "pelt", "pelt"], rug: false, acts: [[0.5, 0.25, 1.8, "The story", "listen", evbRhStory]] },
rhgoats: { sides: ["trstall", "trhay", "trstall"], far: ["trtrough"], rug: false, acts: [[0.5, 0, 1.8, "The goats", "look", evbRhGoats]] },
rhyard: { sides: ["benchin", "firebowl", "trlogs"], far: ["dpx_amphora"], rug: false, ceil: null, acts: [[0.5, 0, 1.8, "The yard", "read", evbRhYard]] }
});
"use strict";
evbTheme("operahouse", { corner: "plant", seed: 161, panel: 0xC8A868, pal: { fab: "crimson", fab2: "mustard", wood: "mahogany", metal: "gold", stone: "marble", art: 9, rug: 5, rugv: 1 },
remap: { "D6D0C6|plaster": [0xE8D8B0, "damask"], "D8D0C0|coffer": [0xC8A048, "plaster"] },
hello: "🎭 <b>Inside the Paris Opera.</b> Up the marble Grand Staircase to the gilded foyer and the red and gold auditorium under its great chandelier; behind the curtain, the stage, the dressing rooms, and below them, cellar under cellar down to the dark water. Look for the ✨ cards. The way out is the great doors." });
evbHouse("operahouse", { g: EVB_GRID.mid, h: 5.2, levels: 2, stairX: 3.5, stairZ: 11, floors: ["The stage and the cellars", "The foyers and the auditorium"], wall: 0xE8D8B0, trim: 0x8A6A2A,
plan: [{ hall: { k: "opvest", n: "The Entrance Vestibule" }, spine: { k: "opstair", n: "The Grand Staircase" }, gallery: { k: "oprotunda", n: "The Subscribers' Rotunda" },
back: { merge: EVB_BACK, k: "opstage", n: "The Stage" },
r1i: { k: "oppit", n: "The Orchestra Pit" }, r1o: { k: "opprompt", n: "The Prompter's Box" },
r2i: { k: "opflies", n: "The Wings and the Flies" }, r2o: { k: "opscene", n: "The Scene Dock" },
r3i: { k: "opcellar", n: "The Cellars" }, r3o: { k: "oplake", n: "The Water under the Opera" },
l1i: { k: "opcostume", n: "The Costume Workshop" }, l1o: { k: "opwig", n: "The Wig Room" },
l2i: { k: "opmanager", n: "The Managers' Office" }, l2o: { k: "opdiva", n: "The Prima Donna's Dressing Room" },
l3i: { k: "opchristine", n: "Christine Daaé's Dressing Room" }, l3o: { k: "opstable", n: "The Stables" } },
{ hall: { k: "oplanding", n: "The Landing" }, spine: { k: "opfoyer", n: "The Grand Foyer" }, gallery: { k: "opavant", n: "The Avant-Foyer" },
back: { merge: EVB_BACK, k: "opauditorium", n: "The Auditorium" },
r1: { merge: ["r1i", "r1o"], k: "opbox", n: "Box Five" }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: "opdance", n: "The Foyer de la Danse" },
l1: { merge: ["l1i", "l1o"], k: "oplibrary", n: "The Opera Library" }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: "oproof", n: "The Roof and Apollo's Lyre" } }] });
var evbOpVest = evbInfo("The entrance vestibule", "The Palais Garnier, built by the architect Charles Garnier and opened in 1875: marble, bronze and gold. Gaston Leroux set The Phantom of the Opera here in 1910, and wrote as if it really happened.");
function evbOpStair() { evbTune([392, 494, 587, 784], 420, 1.4); evbSay("🏛️ The Grand Staircase: marble of many colours, branching left and right, made for Paris to see and be seen on the way to its seats."); }
var evbOpRotunda = evbInfo("The subscribers' rotunda", "The way in for the season's subscribers, who came in their carriages under the building. Their boxes were theirs for the year.");
function evbOpStage() { return __ZC(367, 208, this, arguments, new.target); }
function evbOpPit() { evbTune([220, 277, 330, 440], 380, 1.2); evbSay("🎻 The orchestra tunes to the oboe's A. Some eighty musicians play here on a grand night."); }
var evbOpPrompt = evbInfo("The prompter's box", "A little hooded box at the front of the stage: the prompter whispers the words to any singer who forgets them.");
var evbOpFlies = evbInfo("The wings and the flies", "Ropes, counterweights and painted cloths hang far overhead. In the novel the stagehand Joseph Buquet is found hanged among them, and the ballet girls blame the Ghost.");
var evbOpScene = evbInfo("The scene dock", "Painted scenery taller than houses, stacked and waiting: a garden, a church, a prison, a hell for Faust.");
var evbOpCellar = evbInfo("The cellars", "Five levels of cellars below the stage, Leroux says, full of old scenery, trap machinery, and corridors where a man could lose himself, or be lost.");
function evbOpLake() { return __ZC(367, 209, this, arguments, new.target); }
var evbOpCostume = evbInfo("The costume workshop", "Dozens of seamstresses cut and stitch the gowns, armour and peasant smocks for every opera and ballet.");
var evbOpWig = evbInfo("The wig room", "Wigs on wooden heads, curled, powdered and labelled by role.");
var evbOpManager = evbInfo("The managers' office", "In the novel, the new managers Moncharmin and Richard find the Ghost's rules: Box Five is to be kept for him, and he is to be paid twenty thousand francs a month. They laugh. They stop laughing.");
var evbOpDiva = evbInfo("The prima donna's dressing room", "Flowers, mirrors, a costume rail and a chaise. In the novel the diva Carlotta loses her voice, croaking like a toad, on the night the chandelier falls.");
function evbOpChristine() { return __ZC(367, 210, this, arguments, new.target); }
var evbOpStable = evbInfo("The stables", "Horses that appear on stage in the great operas lived in stables under the building, Leroux says, and had their own groom.");
var evbOpLanding = evbInfo("The landing", "Gilded lamps held up by bronze statues, and mirrors that make the crowd on the stair twice as large.");
function evbOpFoyer() { evbTune([523, 659, 784, 659], 400, 1.2); evbSay("✨ The Grand Foyer: a long gallery of gold, mirrors and painted ceilings, where the audience walks between the acts."); }
var evbOpAvant = evbInfo("The avant-foyer", "A smaller hall before the Grand Foyer, its vault set with glittering mosaic.");
function evbOpAuditorium() { return __ZC(367, 211, this, arguments, new.target); }
function evbOpBox() {
evbCard("Box Five", "The box the Opera Ghost keeps for himself. The box-keeper, Madame Giry, leaves a programme for him, and finds it gone.", [
["Sit in it", function () { worldCard(null); evbSay("🎟️ The seat is empty. A voice at your ear says, quite politely: 'This box is taken.'"); }]
]);
}
function evbOpDance() { evbTune([659, 587, 523, 587, 659], 300, 1); evbSay("🩰 The Foyer de la Danse: the ballet's rehearsal hall, with a sloping floor like the stage's, mirrors and a barre. The youngest pupils were nicknamed the 'petits rats'."); }
var evbOpLibrary = evbInfo("The Opera library", "Scores, libretti, set designs and costume drawings for every work ever put on.");
var evbOpRoof = evbInfo("The roof and Apollo's lyre", "On the very top, Apollo holds up his golden lyre over Paris. In the novel, Christine and Raoul talk up here in secret, and do not know who is crouched behind the statue, listening.");
evbTheme("chandlery", { corner: "barrel", seed: 163, panel: 0xC8B898, pal: { fab: "navy", fab2: "mustard", wood: "oak", metal: "brass", stone: "slate", art: 4, rug: 5, rugv: 0 },
remap: { "D6D0C6|plaster": [0xD8CCB0, "wood"], "D8D0C0|coffer": [0x4A3A2A, "wood"] },
hello: "⚓ <b>Inside the ship chandler's.</b> Everything a ship needs before she sails: rope, canvas, lamps, tar, tinned food, charts and compasses. Look for the ✨ cards. The way out is the shop door." });
evbHouse("chandlery", { g: EVB_GRID.mid, h: 4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The shop"], wall: 0xD8CCB0, trim: 0x2A3A5A,
plan: [{ hall: { k: "chdoor", n: "The Shop Door" }, spine: { k: "chshop", n: "The Shop Floor" }, gallery: { k: "chrope", n: "The Rope Store" },
back: { merge: EVB_BACK, k: "chsail", n: "The Sail Loft" },
r1i: { k: "chlamps", n: "Lamps and Oil" }, r1o: { k: "chtins", n: "The Provisions" },
r2i: { k: "chcharts", n: "Charts and Instruments" }, r2o: { k: "choilskin", n: "Oilskins and Sea Boots" },
r3i: { k: "chanchor", n: "Anchors and Chain" }, r3o: { k: "chtar", n: "Tar and Pitch" },
l1i: { k: "chflags", n: "The Flag Locker" }, l1o: { k: "chbiscuit", n: "Ship's Biscuit" },
l2i: { k: "chdesk", n: "The Counting Desk" }, l2o: { k: "chstock", n: "The Stock Room" },
l3i: { k: "chcooper", n: "The Cooper" }, l3o: { k: "chcaptain", n: "The Captains' Corner" } }] });
var evbChDoor = evbInfo("The shop door", "A ship chandler supplies ships: a captain comes in with a list as long as his arm, and leaves with his ship fitted out for months at sea.");
function evbChShop() { evbTune([523, 659], 250, 0.6); evbSay("⚓ The shop bell rings. Everything smells of tar, hemp and coffee."); }
var evbChRope = evbInfo("The rope store", "Coils of hemp and manila rope of every thickness, sold by the fathom (six feet).");
var evbChSail = evbInfo("The sail loft", "Canvas cut and stitched on the floor by sailmakers with a palm, a leather guard for the hand, and a big needle.");
var evbChLamps = evbInfo("Lamps and oil", "Ship's lamps: red for port, green for starboard, white at the masthead, so ships can see each other's way at night.");
var evbChTins = evbInfo("The provisions", "Tinned meat, salt beef in barrels, dried peas, lime juice against scurvy, coffee and tea.");
function evbChCharts() { return __ZC(367, 212, this, arguments, new.target); }
var evbChOilskin = evbInfo("Oilskins and sea boots", "Coats of cotton soaked in linseed oil, which shed the spray; sou'wester hats; heavy boots.");
var evbChAnchor = evbInfo("Anchors and chain", "Iron anchors and chain by the fathom, too heavy to lift: the yard crane loads them onto carts.");
var evbChTar = evbInfo("Tar and pitch", "Pine tar for the rigging, pitch for the seams of wooden decks. Sailors were called 'Jack Tars'.");
var evbChFlags = evbInfo("The flag locker", "Signal flags: each letter of the alphabet a flag, and a whole book of what they mean when flown together.");
var evbChBiscuit = evbInfo("Ship's biscuit", "Hard tack: flour, water and salt, baked hard so it keeps for years. Sailors soaked it before they could bite it.");
var evbChDesk = evbInfo("The counting desk", "The ledger of every ship fitted out here, and what each still owes.");
var evbChStock = evbInfo("The stock room", "Crates to the ceiling, each stencilled with what is inside.");
function evbChCooper() { evbTune([196, 196, 220], 250, 0.7); evbSay("🛢️ The cooper hammers iron hoops onto a cask. Water, beer, salt meat and flour all went to sea in casks."); }
var evbChCaptain = evbInfo("The captains' corner", "A stove, a pot of coffee and a few chairs where the captains sit and swap news of the sea.");
evbTheme("foundry", { corner: "crates", seed: 165, panel: 0x8A7A6A, pal: { fab: "charcoal", fab2: "terracotta", wood: "oak", metal: "iron", stone: "stone", art: 3, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0x9A7A6A, "stone"], "D8D0C0|coffer": [0x3A3A3E, "stone"] },
hello: "🔥 <b>Inside the foundry.</b> The cupola furnace glowing, moulds in the sand, the steam hammer, the pattern makers' benches. Iron and brass for engines, boilers and guns. Look for the ✨ cards. The way out is the yard gate." });
evbHouse("foundry", { g: EVB_GRID.mid, h: 6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The foundry"], wall: 0x9A7A6A, trim: 0x2A2A2E,
plan: [{ hall: { k: "fdgate", n: "The Yard Gate" }, spine: { k: "fdcast", n: "The Casting Floor" }, gallery: { k: "fdcrane", n: "The Travelling Crane" },
back: { merge: EVB_BACK, k: "fdcupola", n: "The Cupola Furnace" },
r1i: { k: "fdpattern", n: "The Pattern Shop" }, r1o: { k: "fdsand", n: "The Moulding Sand" },
r2i: { k: "fdcore", n: "The Core Room" }, r2o: { k: "fdfettle", n: "The Fettling Shop" },
r3i: { k: "fdhammer", n: "The Steam Hammer" }, r3o: { k: "fdboiler", n: "The Boiler House" },
l1i: { k: "fdcoke", n: "The Coke and Pig Iron" }, l1o: { k: "fdbrass", n: "The Brass Shop" },
l2i: { k: "fddrawing", n: "The Drawing Office" }, l2o: { k: "fdsmithy", n: "The Smithy" },
l3i: { k: "fdoffice", n: "The Office" }, l3o: { k: "fdcanteen", n: "The Men's Mess" } }] });
var evbFdGate = evbInfo("The yard gate", "Carts of coke and pig iron in, castings out: wheels, pipes, engine frames, columns for the new iron buildings of the age.");
function evbFdCast() { return __ZC(367, 213, this, arguments, new.target); }
var evbFdCrane = evbInfo("The travelling crane", "A crane running on rails along the walls, to lift ladles and castings too heavy for any team of men.");
function evbFdCupola() { evbTune([98, 110, 98], 800, 1.6); evbSay("🔥 The cupola: a tall furnace fed from the top with coke, pig iron and limestone, with air blown in at the bottom. The iron melts and runs out at the tap hole, white-hot."); }
var evbFdPattern = evbInfo("The pattern shop", "Every casting starts as a wooden copy, made a little larger, because iron shrinks as it cools. Pattern makers are the finest carpenters in the works.");
var evbFdSand = evbInfo("The moulding sand", "Damp sand mixed with clay, rammed hard round the pattern. Lift the pattern out and its shape is left behind.");
var evbFdCore = evbInfo("The core room", "For hollow castings, like pipes or cylinders, a 'core' of baked sand is set in the mould where the hollow will be.");
var evbFdFettle = evbInfo("The fettling shop", "The castings are cleaned: the sand knocked off, rough edges chipped and filed away.");
function evbFdHammer() { evbTune([82, 82], 500, 1.4); evbSay("⚒️ The steam hammer: a great iron block lifted by steam and dropped on red-hot metal. Its driver could set it down hard enough to forge a shaft, or gently enough to crack a nut."); }
var evbFdBoiler = evbInfo("The boiler house", "Coal fires boil water to steam, and the steam drives the hammer, the blowing engine and the crane.");
var evbFdCoke = evbInfo("The coke and pig iron", "Coke is coal baked to drive off its gases: it burns hotter and cleaner. Pig iron is iron from the blast furnace, cast in bars.");
var evbFdBrass = evbInfo("The brass shop", "Copper and zinc melted together in crucibles make brass: for valves, gauges, ship's fittings and instrument cases.");
var evbFdDrawing = evbInfo("The drawing office", "Draughtsmen at slanting boards draw every part to scale, and the drawings go to the pattern makers.");
var evbFdSmithy = evbInfo("The smithy", "Hearths and anvils for the small iron work: bolts, hooks, tools and the foundry's own repairs.");
var evbFdOffice = evbInfo("The office", "Orders and invoices. In Verne's From the Earth to the Moon (1865) the Gun Club cast its great cannon, the Columbiad, in a pit in Florida.");
var evbFdCanteen = evbInfo("The men's mess", "Long tables, mugs of coffee, bread and soup. Foundry work was hot, hard and thirsty.");
evbTheme("gare", { corner: "plant", seed: 167, panel: 0xD8D0C0, pal: { fab: "navy", fab2: "crimson", wood: "oak", metal: "iron", stone: "stone", art: 4, rug: 5, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE0D4BC, "stone"], "D8D0C0|coffer": [0x5A5E66, "plaster"] },
hello: "🚂 <b>Inside the Gare des Voyages.</b> The booking hall, the waiting rooms by class, the station clock, the telegraph, and the trains under the great iron and glass roof. Look for the ✨ cards. The way out is the station door." });
evbHouse("gare", { g: EVB_GRID.mid, h: 5.4, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The station"], wall: 0xE0D4BC, trim: 0x2A3A5A,
plan: [{ hall: { k: "gadoor", n: "The Station Door" }, spine: { k: "gabooking", n: "The Booking Hall" }, gallery: { k: "gaclock", n: "The Station Clock" },
back: { merge: EVB_BACK, k: "gaplatform", n: "The Platforms" },
r1i: { k: "gaticket", n: "The Ticket Office" }, r1o: { k: "galuggage", n: "The Left Luggage" },
r2i: { k: "gafirst", n: "The First-Class Waiting Room" }, r2o: { k: "gathird", n: "The Third-Class Waiting Room" },
r3i: { k: "gabuffet", n: "The Buffet" }, r3o: { k: "gaporters", n: "The Porters' Room" },
l1i: { k: "gamaster", n: "The Station Master's Office" }, l1o: { k: "gatelegraph", n: "The Telegraph Office" },
l2i: { k: "gasignal", n: "The Signal Box" }, l2o: { k: "galamp", n: "The Lamp Room" },
l3i: { k: "gaparcels", n: "The Parcels Office" }, l3o: { k: "gatimes", n: "The Timetables" } }] });
var evbGaDoor = evbInfo("The station door", "Railways changed everything: a journey of days by coach became hours by train. Phileas Fogg bet he could go round the world in eighty days by train and steamer.");
function evbGaBooking() { evbTune([523, 659, 784], 250, 0.6); evbSay("🎫 The booking hall echoes: porters' trolleys, a whistle, a newsboy calling the evening paper."); }
var evbGaClock = evbInfo("The station clock", "Every station kept the same railway time, set by telegraph, so trains could run to a timetable. Towns once kept their own time by the sun.");
function evbGaPlatform() { return __ZC(367, 214, this, arguments, new.target); }
var evbGaTicket = evbInfo("The ticket office", "Tickets were little printed cards, dated by a press in the office. First, second or third class.");
var evbGaLuggage = evbInfo("The left luggage", "Trunks and bags held for a few centimes, with a numbered ticket to claim them.");
var evbGaFirst = evbInfo("The first-class waiting room", "Velvet chairs, a fire and a mirror. First class meant cushioned seats; third class, in the early years, could mean a wooden bench.");
var evbGaThird = evbInfo("The third-class waiting room", "Wooden benches, a stove, and families with all they own in a bundle.");
var evbGaBuffet = evbInfo("The buffet", "Coffee, rolls, a bowl of soup: trains stopped for a few minutes at a time, and the rush for the buffet was a scramble.");
var evbGaPorters = evbInfo("The porters' room", "Porters carry the luggage for a tip, and know every train by heart.");
var evbGaMaster = evbInfo("The station master's office", "The station master, in his peaked cap, is responsible for every train in and out on time.");
function evbGaTelegraph() { evbTune([1046, 1046, 1046], 120, 0.5); evbSay("📡 The telegraph clicks: messages travel along the wire ahead of the trains, so every station knows what is coming."); }
var evbGaSignal = evbInfo("The signal box", "Rows of levers, each working a signal or a set of points down the line by wire and rod.");
var evbGaLamp = evbInfo("The lamp room", "Oil lamps for the signals and the carriages, filled, trimmed and lit here every evening.");
var evbGaParcels = evbInfo("The parcels office", "Parcels, newspapers, crates of fish and baskets of eggs go by train too.");
var evbGaTimes = evbInfo("The timetables", "Printed timetables of every line. Fogg carried Bradshaw's, the famous guide to the railways and steamers.");
evbTheme("machineshed", { corner: "crates", seed: 169, panel: 0xC8B088, pal: { fab: "terracotta", fab2: "sage", wood: "oak", metal: "iron", stone: "sand", art: 4, rug: 6, rugv: 0 },
remap: { "D6D0C6|plaster": [0xE0CCA0, "plaster"], "D8D0C0|coffer": [0x6A4A2A, "wood"] },
hello: "⚙️ <b>Inside a machine shed of the Proving Ground.</b> Where the master's drawings become wood, canvas and iron: carpenters, smiths, sailcloth, gears and models. Look for the ✨ cards. The way out is the shed door." });
evbHouse("machineshed", { g: EVB_GRID.mid, h: 4.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The shed"], wall: 0xE0CCA0, trim: 0x5A3A1A,
plan: [{ hall: { k: "msdoor", n: "The Shed Door" }, spine: { k: "msfloor", n: "The Building Floor" }, gallery: { k: "msdrawings", n: "The Drawings" },
back: { merge: EVB_BACK, k: "mswing", n: "The Wing Frame" },
r1i: { k: "mstimber", n: "The Timber Store" }, r1o: { k: "mssail", n: "The Sailcloth" },
r2i: { k: "msgears", n: "The Gears and Pulleys" }, r2o: { k: "msforge", n: "The Forge" },
r3i: { k: "msspring", n: "The Spring Motors" }, r3o: { k: "msbearing", n: "The Bearings" },
l1i: { k: "msmodels", n: "The Models" }, l1o: { k: "msrope", n: "The Rope Store" },
l2i: { k: "mspaint", n: "The Paint Bench" }, l2o: { k: "msmirror", n: "The Mirror Writing" },
l3i: { k: "msapprentice", n: "The Apprentices' Bench" }, l3o: { k: "mswater", n: "The Water Trough" } }] });
var evbMsDoor = evbInfo("The shed door", "The Proving Ground is the game's dream of a place Leonardo never had: a field where every machine in his notebooks is built full size and tried.");
function evbMsFloor() { evbTune([196, 220, 262], 250, 0.8); evbSay("🔨 Saws, mallets and chisels: the carpenters build in wood, the way all machines were built in 1500."); }
var evbMsDrawings = evbInfo("The drawings", "Copies of his notebook pages pinned to the boards: wings, screws, cranks, gears. Over 7,000 pages of his notes survive.");
function evbMsWing() { return __ZC(367, 215, this, arguments, new.target); }
var evbMsTimber = evbInfo("The timber store", "Pine for lightness, oak for strength, cane and willow for the bendy parts.");
var evbMsSail = evbInfo("The sailcloth", "Linen canvas, starched and stretched to make it tight, for wings and the screw's spiral.");
var evbMsGears = evbInfo("The gears and pulleys", "Wooden gears with pegs for teeth, lantern pinions and pulleys: he drew how each one changes speed and force.");
function evbMsForge() { evbTune([523, 523], 200, 0.5); evbSay("⚒️ The smith shapes iron pins and straps that hold the wooden frames together."); }
var evbMsSpring = evbInfo("The spring motors", "Coiled springs that drive the self-propelled cart and the mechanical lion. Wind them up, and let them go.");
var evbMsBearing = evbInfo("The bearings", "He drew ball bearings to stop parts grinding against each other: an idea that came into wide use centuries later.");
var evbMsModels = evbInfo("The models", "Small models of each machine, tried first before the big one is built.");
var evbMsRope = evbInfo("The rope store", "Ropes for winches, the crossbow's great cord, and the glider's harness.");
var evbMsPaint = evbInfo("The paint bench", "Pigments for the machines and the banners. The master was a painter first.");
var evbMsMirror = evbInfo("The mirror writing", "Leonardo wrote right to left, his letters reversed: hold the page to a mirror to read it. He was left-handed.");
var evbMsApprentice = evbInfo("The apprentices' bench", "Boys of twelve or fourteen learn the trade here, sweeping, fetching, and in time carving.");
var evbMsWater = evbInfo("The water trough", "For quenching hot iron and testing paddles. He studied water as closely as he studied flight.");
evbFins({
opvest: ["stone", 0xE8DCC8, 0xE8D8B0, "stone", 0x8A6A2A], opstair: ["stone", 0xE8E0D0, 0xE8D8B0, "stone", 0x8A6A2A, 0xC8A048], oprotunda: ["stone", 0xD8CCB8, 0xE0D0A8, "stone", 0x8A6A2A],
opstage: ["wood", 0x5A3A22, 0x2A1A1A, "wood", 0x1A1010, 0x2A1A1A], oppit: ["wood", 0x4A2A1A, 0x3A2A2A, "wood", 0x1A1010], opprompt: ["wood", 0x4A2A1A, 0x3A2A2A, "wood", 0x1A1010],
opflies: ["wood", 0x4A3A2A, 0x5A4A3A, "wood", 0x2A2018], opscene: ["wood", 0x5A4A3A, 0x8A7A6A, "wood", 0x2A2018], opcellar: ["stone", 0x4A4640, 0x6A6458, "stone", 0x2A2420],
oplake: ["stone", 0x2A2A30, 0x4A4A50, "stone", 0x1A1A20], opcostume: ["wood", 0x6A4A2A, 0xE8DCC8, "plaster", 0x5A3A22], opwig: ["wood", 0x6A4A2A, 0xE8DCC8, "plaster", 0x5A3A22],
opmanager: ["wood", 0x4A2A1A, 0x6A2A2A, "damask", 0x8A6A2A], opdiva: ["wood", 0x5A3A22, 0xD8A8B0, "damask", 0xC8A048], opchristine: ["wood", 0x5A3A22, 0xD8D0C0, "damask", 0xC8A048],
opstable: ["stone", 0x6A5A48, 0xA89A80, "wood", 0x3A2A1A],
oplanding: ["stone", 0xE8E0D0, 0xE8D8B0, "damask", 0xC8A048], opfoyer: ["wood", 0x8A5A2A, 0xE8C878, "damask", 0xC8A048, 0xE8D8A0], opavant: ["stone", 0xD8CCB8, 0xE0C878, "tile", 0xC8A048, 0xD8B060],
opauditorium: ["wood", 0x6A1A1A, 0x8A1A1A, "damask", 0xC8A048, 0xE8D8A0], opbox: ["wood", 0x6A1A1A, 0x8A1A1A, "damask", 0xC8A048], opdance: ["wood", 0x8A6A4A, 0xE8DCC8, "plaster", 0xC8A048],
oplibrary: ["wood", 0x4A2A1A, 0x3A2A1A, "wood", 0x8A6A2A], oproof: ["stone", 0x7A8A7A, 0x9AAA9A, "stone", 0xC8A048],
chdoor: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A], chshop: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A], chrope: ["wood", 0x6A5A40, 0xC8B898, "wood", 0x2A3A5A],
chsail: ["wood", 0x8A7A5A, 0xE8E0D0, "wood", 0x2A3A5A], chlamps: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A], chtins: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A],
chcharts: ["wood", 0x5A3A22, 0xD8CCB0, "wood", 0x2A3A5A], choilskin: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A], chanchor: ["stone", 0x6A6660, 0xA8A498, "stone", 0x2A2A2E],
chtar: ["stone", 0x4A4640, 0x8A7A6A, "wood", 0x2A2420], chflags: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A], chbiscuit: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A],
chdesk: ["wood", 0x5A3A22, 0xD8CCB0, "wood", 0x2A3A5A], chstock: ["wood", 0x6A5A40, 0xC8B898, "wood", 0x2A3A5A], chcooper: ["wood", 0x6A5A40, 0xC8B898, "wood", 0x2A3A5A],
chcaptain: ["wood", 0x5A3A22, 0xD8CCB0, "wood", 0x2A3A5A],
fdgate: ["stone", 0x5A5650, 0x9A7A6A, "stone", 0x2A2A2E], fdcast: ["stone", 0x3A3630, 0x8A6A5A, "stone", 0x2A2A2E, 0x3A3A3E], fdcrane: ["stone", 0x4A4640, 0x8A6A5A, "stone", 0x2A2A2E],
fdcupola: ["stone", 0x3A3630, 0x7A5A4A, "stone", 0x2A2A2E, 0x3A3A3E], fdpattern: ["wood", 0x8A6A4A, 0xD8C8A8, "wood", 0x3A2A1A], fdsand: ["stone", 0x8A7A5A, 0x9A8A70, "stone", 0x2A2A2E],
fdcore: ["stone", 0x6A6058, 0x9A8A78, "stone", 0x2A2A2E], fdfettle: ["stone", 0x4A4640, 0x8A7A6A, "stone", 0x2A2A2E], fdhammer: ["stone", 0x3A3630, 0x7A6A5A, "stone", 0x2A2A2E],
fdboiler: ["stone", 0x3A3630, 0x7A6A5A, "stone", 0x2A2A2E], fdcoke: ["stone", 0x2A2620, 0x5A5048, "stone", 0x1A1A1A], fdbrass: ["stone", 0x5A5048, 0x9A8A70, "stone", 0x6A5020],
fddrawing: ["wood", 0x6A4A2A, 0xE0D8C8, "plaster", 0x3A2A1A], fdsmithy: ["stone", 0x3A3630, 0x7A6A5A, "stone", 0x2A2A2E], fdoffice: ["wood", 0x5A3A22, 0xD8CCB0, "wood", 0x3A2A1A],
fdcanteen: ["wood", 0x6A5A40, 0xD8CCB0, "plaster", 0x3A2A1A],
gadoor: ["stone", 0xB8B0A0, 0xE0D4BC, "stone", 0x2A3A5A], gabooking: ["stone", 0xC8C0B0, 0xE0D4BC, "stone", 0x2A3A5A, 0x5A5E66], gaclock: ["stone", 0xC8C0B0, 0xE0D4BC, "stone", 0x2A3A5A],
gaplatform: ["stone", 0x8A8680, 0xC8C4BC, "stone", 0x2A2A2E, 0x5A5E66], gaticket: ["wood", 0x6A4A2A, 0xE0D4BC, "wood", 0x2A3A5A], galuggage: ["wood", 0x6A5A40, 0xD8CCB0, "wood", 0x2A3A5A],
gafirst: ["wood", 0x5A3A22, 0x6A2A2A, "damask", 0x8A6A2A], gathird: ["wood", 0x7A6A50, 0xC8C0A8, "wood", 0x3A2A1A], gabuffet: ["tile", 0x8A3A2A, 0xE8E0D0, "tile", 0x2A3A5A],
gaporters: ["wood", 0x6A5A40, 0xC8C0A8, "wood", 0x2A3A5A], gamaster: ["wood", 0x5A3A22, 0xD8CCB0, "wood", 0x2A3A5A], gatelegraph: ["wood", 0x5A3A22, 0xD8CCB0, "wood", 0x2A3A5A],
gasignal: ["wood", 0x6A5A40, 0xC8C0A8, "wood", 0x8A2A2A], galamp: ["stone", 0x6A6660, 0xA8A498, "stone", 0x2A2A2E], gaparcels: ["wood", 0x6A5A40, 0xC8B898, "wood", 0x2A3A5A],
gatimes: ["stone", 0xC8C0B0, 0xE0D4BC, "stone", 0x2A3A5A],
msdoor: ["wood", 0x8A6A4A, 0xE0CCA0, "plaster", 0x5A3A1A], msfloor: ["wood", 0x8A6A4A, 0xE0CCA0, "wood", 0x5A3A1A, 0x6A4A2A], msdrawings: ["wood", 0x8A6A4A, 0xE8DCC0, "plaster", 0x5A3A1A],
mswing: ["wood", 0x8A6A4A, 0xE0CCA0, "wood", 0x5A3A1A, 0x6A4A2A], mstimber: ["wood", 0x7A5A3A, 0xC8B088, "wood", 0x5A3A1A], mssail: ["wood", 0x8A6A4A, 0xE8E0D0, "plaster", 0x5A3A1A],
msgears: ["wood", 0x7A5A3A, 0xE0CCA0, "wood", 0x5A3A1A], msforge: ["stone", 0x5A5048, 0x9A8A70, "stone", 0x3A2A1A], msspring: ["wood", 0x7A5A3A, 0xE0CCA0, "wood", 0x5A3A1A],
msbearing: ["wood", 0x7A5A3A, 0xE0CCA0, "wood", 0x5A3A1A], msmodels: ["wood", 0x8A6A4A, 0xE8DCC0, "plaster", 0x5A3A1A], msrope: ["wood", 0x7A5A3A, 0xC8B088, "wood", 0x5A3A1A],
mspaint: ["wood", 0x8A6A4A, 0xE8DCC0, "plaster", 0x5A3A1A], msmirror: ["wood", 0x8A6A4A, 0xE8DCC0, "plaster", 0x5A3A1A], msapprentice: ["wood", 0x8A6A4A, 0xE0CCA0, "wood", 0x5A3A1A],
mswater: ["stone", 0x8A8478, 0xC8C0B0, "stone", 0x5A3A1A]
});
evbRooms({
opvest: { sides: ["esbust", "plant", "esbust"], far: ["plant"], ceil: "chandelier", acts: [[0.35, 0, 2.0, "The vestibule", "read", evbOpVest]] },
opstair: { mid: [["redrunner", 0.5, 0, "+u"]], sides: ["goldstatue", "wallsconce", "goldstatue", "wallsconce"], far: ["spiralstair"], ceil: "chandelier", rug: false, acts: [[0.5, 0, 2.2, "The Grand Staircase", "climb it", evbOpStair]] },
oprotunda: { sides: ["esbust", "benchin", "esbust"], far: ["plant", "plant"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The rotunda", "read", evbOpRotunda]] },
opstage: { mid: [["bststage", 0.5, 0]], far: ["trdrapes", "trdrapes"], sides: ["lamp", "wgcurtain", "lamp"], rug: false, acts: [[0.5, 0.2, 2.2, "The stage", "sing", evbOpStage]] },
oppit: { grid: ["chair", 2, 3], far: ["piano", "esharp"], sides: ["lectern"], rug: false, acts: [[0.5, 0, 1.8, "The orchestra", "listen", evbOpPit]] },
opprompt: { mid: [["lectern", 0.5, 0]], sides: ["chair", "lamp"], rug: false, acts: [[0.5, 0.2, 1.8, "The prompter's box", "read", evbOpPrompt]] },
opflies: { far: ["trdrapes", "pipes"], sides: ["trdrapes", "crates", "trdrapes"], rug: false, acts: [[0.5, 0, 1.8, "The flies", "read", evbOpFlies]] },
opscene: { far: ["treasel", "treasel"], sides: ["crates", "treasel", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The scenery", "read", evbOpScene]] },
opcellar: { grid: ["crates", 2, 2], sides: ["lantern", "barrel", "lantern"], rug: false, acts: [[0.5, 0, 1.8, "The cellars", "read", evbOpCellar]] },
oplake: { mid: [["cavepool", 0.5, 0]], sides: ["lantern", "boulder", "lantern"], rug: false, ceil: null, acts: [[0.5, 0.3, 2.0, "The water", "listen", evbOpLake]] },
opcostume: { far: ["dressform", "dressform"], sides: ["essewing", "wardrobe", "dressform", "essewing"], mid: [["trcuttable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The costumes", "read", evbOpCostume]] },
opwig: { far: ["shelfgoods", "wallmirror"], sides: ["esbust", "esbust", "chair"], acts: [[0.5, 0, 1.8, "The wigs", "read", evbOpWig]] },
opmanager: { far: ["desk", "filecabinet"], sides: ["armchair", "painting", "armchair"], acts: [[0.5, 0, 1.8, "The Ghost's letter", "read", evbOpManager]] },
opdiva: { far: ["wallmirror", "vcchaise"], sides: ["wardrobe", "plant", "dressform", "plant"], acts: [[0.5, 0, 1.8, "The dressing room", "read", evbOpDiva]] },
opchristine: { far: ["wallmirror"], sides: ["dressform", "chair", "wardrobe"], acts: [[0.5, 0, 1.8, "The mirror", "look", evbOpChristine]] },
opstable: { sides: ["trstall", "trhay", "trstall"], far: ["trtrough", "trsaddles"], rug: false, acts: [[0.5, 0, 1.8, "The stables", "read", evbOpStable]] },
oplanding: { sides: ["goldstatue", "wallmirror", "goldstatue"], far: ["wallsconce"], ceil: "chandelier", acts: [[0.4, 0, 1.8, "The landing", "read", evbOpLanding]] },
opfoyer: { sides: ["wallmirror", "ghrgiltchairs", "wallmirror", "ghrgiltchairs", "wallmirror"], far: ["goldstatue", "wallmirror"], ceil: "chandelier", acts: [[0.5, 0, 2.0, "The Grand Foyer", "stroll", evbOpFoyer]] },
opavant: { sides: ["ghrgiltchairs", "plant", "ghrgiltchairs"], far: ["esbust"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "The mosaic vault", "read", evbOpAvant]] },
opauditorium: { grid: ["espew", 2, 4, "-u", 0.3, 0.75], far: ["bststage"], sides: ["ghrgiltchairs", "ghrgiltchairs", "ghrgiltchairs", "ghrgiltchairs"], ceil: "chandelier", rug: false, acts: [[0.5, 0, 2.2, "The chandelier", "look up", evbOpAuditorium]] },
opbox: { grid: ["ghrgiltchairs", 1, 3], sides: ["wallmirror", "trdrapes"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "Box Five", "sit", evbOpBox]] },
opdance: { far: ["wallmirror", "wallmirror", "piano"], sides: ["chair", "wallmirror", "chair"], rug: false, ceil: "chandelier", acts: [[0.5, 0, 1.8, "The barre", "dance", evbOpDance]] },
oplibrary: { far: ["bookshelf", "bookshelf"], sides: ["bookshelf", "desk", "bookshelf"], mid: [["maptable", 0.5, 0]], acts: [[0.5, 0, 1.8, "The scores", "read", evbOpLibrary]] },
oproof: { mid: [["goldstatue", 0.5, 0]], sides: ["plant", "benchin"], rug: false, ceil: null, acts: [[0.5, 0.25, 1.8, "Apollo", "read", evbOpRoof]] },
chdoor: { sides: ["barrel", "trnets", "barrel"], far: ["trsigns"], rug: false, acts: [[0.35, 0, 1.8, "The shop", "read", evbChDoor]] },
chshop: { far: ["shelfgoods", "shelfgoods"], sides: ["trcounter", "barrel", "shelfgoods", "crates"], mid: [["trcounter", 0.5, 0]], rug: false, acts: [[0.4, 0, 2.0, "The counter", "ring the bell", evbChShop]] },
chrope: { grid: ["barrel", 2, 2], sides: ["trnets", "trnets"], rug: false, acts: [[0.5, 0, 1.8, "The rope", "read", evbChRope]] },
chsail: { mid: [["trcuttable", 0.5, 0]], far: ["trdrapes", "trdrapes"], sides: ["benchin", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The sail loft", "read", evbChSail]] },
chlamps: { far: ["shelfgoods", "gmwsignallamp"], sides: ["lantern", "lantern", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The ship's lamps", "read", evbChLamps]] },
chtins: { far: ["shelfgoods", "shelfgoods"], sides: ["barrel", "trsacks", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The provisions", "read", evbChTins]] },
chcharts: { far: ["mapchest", "gmwtelescope"], sides: ["maptable", "esglobe", "desk"], acts: [[0.5, 0, 1.8, "The sextant", "take a sight", evbChCharts]] },
choilskin: { far: ["wardrobe", "wd:kf_coatrack"], sides: ["trlockers", "wd:kf_coatrack"], rug: false, acts: [[0.5, 0, 1.8, "The oilskins", "read", evbChOilskin]] },
chanchor: { grid: ["crates", 1, 2], sides: ["gmwlifebuoy", "barrel"], far: ["trtoolwall"], rug: false, acts: [[0.5, 0, 1.8, "The anchors", "read", evbChAnchor]] },
chtar: { grid: ["barrel", 2, 2], sides: ["cask", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The tar", "read", evbChTar]] },
chflags: { far: ["trdrapes", "shelfgoods"], sides: ["mapchest", "trdrapes"], acts: [[0.5, 0, 1.8, "The flags", "read", evbChFlags]] },
chbiscuit: { far: ["trbreadrack", "shelfgoods"], sides: ["barrel", "trsacks", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The biscuit", "read", evbChBiscuit]] },
chdesk: { far: ["desk", "filecabinet"], sides: ["chair", "bookshelf"], acts: [[0.5, 0, 1.8, "The ledger", "read", evbChDesk]] },
chstock: { grid: ["crates", 2, 2], sides: ["crates", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The stock", "read", evbChStock]] },
chcooper: { far: ["workbench", "cask"], sides: ["barrel", "trtoolwall", "barrel"], rug: false, acts: [[0.5, 0, 1.8, "The cooper", "watch", evbChCooper]] },
chcaptain: { far: ["stove"], sides: ["armchair", "chair", "armchair"], mid: [["wd:kf_table", 0.5, 0]], acts: [[0.5, 0, 1.8, "The captains", "listen", evbChCaptain]] },
fdgate: { sides: ["crates", "oreheap", "crates"], far: ["minecart"], rug: false, acts: [[0.35, 0, 1.8, "The yard", "read", evbFdGate]] },
fdcast: { grid: ["crates", 2, 2], far: ["lavaforge"], sides: ["trquench", "oreheap"], rug: false, acts: [[0.5, 0, 2.0, "The moulds", "pour", evbFdCast]] },
fdcrane: { far: ["pipes", "minecart"], sides: ["crates", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The crane", "read", evbFdCrane]] },
fdcupola: { mid: [["hearthforge", 0.5, 0]], far: ["lavaforge", "oreheap"], sides: ["oreheap", "trquench"], rug: false, acts: [[0.5, 0.25, 2.0, "The furnace", "watch", evbFdCupola]] },
fdpattern: { far: ["workbench", "trlathe"], sides: ["workbench", "trlogs", "trtoolwall"], rug: false, acts: [[0.5, 0, 1.8, "The patterns", "read", evbFdPattern]] },
fdsand: { grid: ["trsacks", 2, 2], sides: ["trsacks", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The sand", "read", evbFdSand]] },
fdcore: { far: ["oven", "workbench"], sides: ["crates", "shelfgoods"], rug: false, acts: [[0.5, 0, 1.8, "The cores", "read", evbFdCore]] },
fdfettle: { far: ["workbench", "trtoolwall"], sides: ["anvil", "crates", "workbench"], rug: false, acts: [[0.5, 0, 1.8, "The castings", "read", evbFdFettle]] },
fdhammer: { mid: [["piston", 0.5, 0]], sides: ["anvil", "pipes"], far: ["boiler"], rug: false, acts: [[0.5, 0.25, 2.0, "The steam hammer", "drop it", evbFdHammer]] },
fdboiler: { far: ["boiler", "boiler"], sides: ["pipes", "flywheel", "pipes"], rug: false, acts: [[0.5, 0, 1.8, "The boilers", "read", evbFdBoiler]] },
fdcoke: { grid: ["oreheap", 2, 2], sides: ["minecart", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The coke", "read", evbFdCoke]] },
fdbrass: { far: ["hearthforge", "shelfgoods"], sides: ["workbench", "weighscale", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The crucibles", "read", evbFdBrass]] },
fddrawing: { grid: ["trdraft", 2, 2], sides: ["trplanchest", "lamp"], acts: [[0.5, 0, 1.8, "The drawings", "read", evbFdDrawing]] },
fdsmithy: { far: ["hearthforge", "trtoolwall"], sides: ["anvil", "trquench", "anvil"], rug: false, acts: [[0.5, 0, 1.8, "The smithy", "read", evbFdSmithy]] },
fdoffice: { far: ["desk", "filecabinet"], sides: ["chair", "bookshelf", "painting"], acts: [[0.5, 0, 1.8, "The orders", "read", evbFdOffice]] },
fdcanteen: { mid: [["longtable", 0.5, 0]], sides: ["benchin", "stove", "benchin"], far: ["shelfgoods"], rug: false, acts: [[0.5, 0, 1.8, "The mess", "read", evbFdCanteen]] },
gadoor: { sides: ["benchin", "plant", "benchin"], far: ["trsigns"], rug: false, acts: [[0.35, 0, 1.8, "The station", "read", evbGaDoor]] },
gabooking: { sides: ["benchin", "trtimetable", "benchin", "plant"], far: ["trclockwall", "trdutydesk"], rug: false, ceil: "chandelier", acts: [[0.5, 0, 2.0, "The booking hall", "listen", evbGaBooking]] },
gaclock: { far: ["trclockwall"], sides: ["benchin", "benchin"], rug: false, acts: [[0.5, 0, 1.8, "The clock", "read", evbGaClock]] },
gaplatform: { far: ["gmwdepboard", "benchin"], sides: ["benchin", "crates", "trsigns", "benchin"], rug: false, ceil: null, acts: [[0.5, 0, 2.2, "The train", "wave it away", evbGaPlatform]] },
gaticket: { mid: [["trcounter", 0.5, 0]], far: ["shelfgoods", "keyrack"], sides: ["chair", "trtill"], acts: [[0.5, 0.2, 1.8, "The ticket office", "read", evbGaTicket]] },
galuggage: { grid: ["crates", 2, 2], sides: ["trlockers", "trlockers"], rug: false, acts: [[0.5, 0, 1.8, "The luggage", "read", evbGaLuggage]] },
gafirst: { far: ["fireplace", "wallmirror"], sides: ["armchair", "sofa", "armchair", "plant"], ceil: "chandelier", acts: [[0.5, 0, 1.8, "First class", "read", evbGaFirst]] },
gathird: { grid: ["benchin", 2, 2], far: ["stove"], sides: ["benchin", "benchin"], rug: false, acts: [[0.5, 0, 1.8, "Third class", "read", evbGaThird]] },
gabuffet: { far: ["gwrteabar", "shelfgoods"], sides: ["wd:kf_table", "chair", "wd:kf_table", "chair"], rug: false, acts: [[0.5, 0, 1.8, "The buffet", "read", evbGaBuffet]] },
gaporters: { far: ["trlockers", "stove"], sides: ["benchin", "wd:kf_coatrack"], rug: false, acts: [[0.5, 0, 1.8, "The porters", "read", evbGaPorters]] },
gamaster: { far: ["desk", "trclockwall"], sides: ["chair", "filecabinet", "keyrack"], acts: [[0.5, 0, 1.8, "The station master", "read", evbGaMaster]] },
gatelegraph: { far: ["desk", "desk"], sides: ["chair", "shelfgoods", "chair"], acts: [[0.5, 0, 1.8, "The telegraph", "listen", evbGaTelegraph]] },
gasignal: { far: ["machine", "trtimetable"], sides: ["chair", "lamp"], rug: false, acts: [[0.5, 0, 1.8, "The levers", "read", evbGaSignal]] },
galamp: { far: ["shelfgoods", "shelfgoods"], sides: ["lantern", "lantern", "cask"], rug: false, acts: [[0.5, 0, 1.8, "The lamps", "read", evbGaLamp]] },
gaparcels: { grid: ["crates", 2, 2], sides: ["trcounter", "weighscale"], rug: false, acts: [[0.5, 0, 1.8, "The parcels", "read", evbGaParcels]] },
gatimes: { sides: ["trtimetable", "noticeboard", "trtimetable"], far: ["gmwdepboard"], rug: false, acts: [[0.5, 0, 1.8, "The timetables", "read", evbGaTimes]] },
msdoor: { sides: ["crates", "trlogs", "crates"], far: ["trtoolwall"], rug: false, acts: [[0.35, 0, 1.8, "The shed", "read", evbMsDoor]] },
msfloor: { mid: [["workbench", 0.5, 0]], sides: ["trsaw", "workbench", "trlogs", "trtoolwall"], far: ["trlathe"], rug: false, acts: [[0.5, 0, 2.0, "The building floor", "listen", evbMsFloor]] },
msdrawings: { far: ["treasel", "treasel"], sides: ["trdraft", "trplanchest", "treasel"], acts: [[0.5, 0, 1.8, "The drawings", "read", evbMsDrawings]] },
mswing: { mid: [["trcuttable", 0.5, 0]], far: ["trdrapes", "treasel"], sides: ["trlogs", "workbench"], rug: false, acts: [[0.5, 0.2, 2.0, "The wing", "flap it", evbMsWing]] },
mstimber: { grid: ["trlogs", 2, 2], sides: ["trlogs", "trsaw"], rug: false, acts: [[0.5, 0, 1.8, "The timber", "read", evbMsTimber]] },
mssail: { far: ["trdrapes", "trdrapes"], sides: ["trcuttable", "trsacks"], rug: false, acts: [[0.5, 0, 1.8, "The sailcloth", "read", evbMsSail]] },
msgears: { mid: [["flywheel", 0.5, 0]], sides: ["workbench", "trtoolwall"], rug: false, acts: [[0.5, 0.2, 1.8, "The gears", "read", evbMsGears]] },
msforge: { far: ["hearthforge", "trtoolwall"], sides: ["anvil", "trquench"], rug: false, acts: [[0.5, 0, 1.8, "The forge", "watch", evbMsForge]] },
msspring: { far: ["workbench", "machine"], sides: ["crates", "workbench"], rug: false, acts: [[0.5, 0, 1.8, "The springs", "read", evbMsSpring]] },
msbearing: { far: ["workbench", "shelfgoods"], sides: ["trlathe", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The bearings", "read", evbMsBearing]] },
msmodels: { far: ["displaycase", "displaycase"], sides: ["workbench", "displaycase"], acts: [[0.5, 0, 1.8, "The models", "read", evbMsModels]] },
msrope: { grid: ["barrel", 2, 2], sides: ["trnets", "crates"], rug: false, acts: [[0.5, 0, 1.8, "The rope", "read", evbMsRope]] },
mspaint: { far: ["treasel", "shelfgoods"], sides: ["workbench", "evb_colours"], rug: false, acts: [[0.5, 0, 1.8, "The paints", "read", evbMsPaint]] },
msmirror: { far: ["wallmirror", "desk"], sides: ["treasel", "chair"], acts: [[0.5, 0, 1.8, "The mirror writing", "read", evbMsMirror]] },
msapprentice: { far: ["workbench", "workbench"], sides: ["benchin", "trtoolwall"], rug: false, acts: [[0.5, 0, 1.8, "The apprentices", "read", evbMsApprentice]] },
mswater: { mid: [["trtrough", 0.5, 0]], sides: ["barrel", "trpump"], rug: false, acts: [[0.5, 0.2, 1.8, "The trough", "read", evbMsWater]] }
});
var EVB_FILL_MODERN = { researchlab: 1, habitat: 1, hangar: 1, spaceport: 1, biodome: 1, controltower: 1, reactor: 1, skyscraper: 1, falloutshelter: 1, terminal: 1, picturehouse: 1, museum: 1, firehouse: 1, silo: 1, watertower: 1 };
function evbFillKey(T) {
if (!T)
return null;
if (T.__evbk !== undefined)
return T.__evbk;
var k = null;
try {
Object.keys(ES_HOUSES).some(function (q) { if (ES_HOUSES[q] === T) {
k = q;
return true;
} return false; });
}
catch (e) { }
try {
T.__evbk = k;
}
catch (e) { }
return k;
}
function evbFill(P, key) { return __ZC(367, 216, this, arguments, new.target); }
(function () {
if (typeof esFurnish !== "function" || typeof esFrame !== "function")
return;
var fr = esFrame;
esFrame = function () { var P = fr.apply(this, arguments); EVB.fillP = P; return P; };
var f = esFurnish;
esFurnish = function (A, r, L, T, ctx) {
var k = null, rec = [];
try {
k = evbFillKey(T);
}
catch (e) { }
var themed = k && k.indexOf("evb_") === 0 && A && A.put;
if (themed) {
var p0 = A.put;
A.put = function (kk, x, z) { rec.push({ k: kk, x: x, z: z }); return p0.apply(this, arguments); };
}
var res;
try {
res = f.apply(this, arguments);
}
finally {
if (themed)
A.put = p0;
}
try {
if (themed && ES_ROOM[r.k]) {
var P = EVB.fillP;
if (P && P.r === r) {
P.rec = rec;
evbFill(P, k);
}
}
}
catch (e) {
if (window.console)
console.warn("[enter-all] fill", r && r.n, e);
}
return res;
};
})();
