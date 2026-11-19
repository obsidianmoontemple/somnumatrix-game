/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PS = { spec: null, setting: null, H: 7, fillN: 0, mats: {}, tex: {} };
function psSetting(spec) { return __ZC(187, 0, this, arguments, new.target); }
function psCanvasTex(N, draw, rep) { return __ZC(187, 1, this, arguments, new.target); }
function psRand(seed) { var s = seed >>> 0 || 7; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
function psCracks(seed, n) { return __ZC(187, 2, this, arguments, new.target); }
function psStroke(x, lines, N, w) {
[-N, 0, N].forEach(function (ox) {
[-N, 0, N].forEach(function (oy) {
lines.forEach(function (pts) {
x.beginPath();
x.moveTo(pts[0][0] * N / 512 + ox, pts[0][1] * N / 512 + oy);
for (var i = 1; i < pts.length; i++)
x.lineTo(pts[i][0] * N / 512 + ox, pts[i][1] * N / 512 + oy);
x.lineWidth = w;
x.stroke();
});
});
});
}
function psRockTex(kind) { return __ZC(187, 3, this, arguments, new.target); }
function psGlowTex() { return __ZC(187, 4, this, arguments, new.target); }
function psLavaTex() { return __ZC(187, 5, this, arguments, new.target); }
function psFireGlowTex() { return __ZC(187, 6, this, arguments, new.target); }
function psCoinTex() { return __ZC(187, 7, this, arguments, new.target); }
function psFlow() { var t = psLavaTex(); t.offset.y = -((performance.now() / 1000) * 0.035) % 1; }
function psM(k) { return __ZC(187, 8, this, arguments, new.target); }
var PS_GEMS = ["ruby", "emerald", "sapphire", "amethyst", "diamond"];
function psMerge(g) { return __ZC(187, 9, this, arguments, new.target); }
function psG() { return new THREE.Group(); }
function psAdd(g, geo, mk, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, typeof mk === "string" ? psM(mk) : mk); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
function psFlame(g, x, y, z, s) { s = s || 1; psAdd(g, new THREE.ConeGeometry(.22 * s, .7 * s, 7), "fire", x, y + .35 * s, z); psAdd(g, new THREE.ConeGeometry(.11 * s, .42 * s, 6), "fireC", x, y + .25 * s, z); }
function psCoins(g, n, R, y0, seed) { return __ZC(187, 10, this, arguments, new.target); }
function psGem(g, kind, x, y, z, s) { var m = psAdd(g, new THREE.OctahedronGeometry(.12 * (s || 1), 0), kind, x, y, z); m.scale.y = 1.3; m.rotation.set(0.3, x * 7, 0.2); return m; }
function psMound(R, H, seg) {
var pts = [];
for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2(R * (1 - t * t * 0.15) * Math.cos(t * Math.PI / 2) + 0.001, H * Math.sin(t * Math.PI / 2)));
}
return new THREE.LatheGeometry(pts, seg || 20);
}
function psCrown(g, x, y, z, s) { return __ZC(187, 11, this, arguments, new.target); }
if (typeof FURN !== "undefined") {
FURN.goldhoard = function () { return __ZC(187, 12, this, arguments, new.target); };
FURN.treasurechest = function () { return __ZC(187, 13, this, arguments, new.target); };
FURN.gemheap = function () {
var g = psG(), r = psRand(31);
psAdd(g, new THREE.CylinderGeometry(.8, .9, .12, 16), "gold", 0, .06, 0);
for (var i = 0; i < 46; i++) {
var a = r() * 6.283, rr = r() * .75, h = .12 + (1 - rr / .8) * .55 * r();
psGem(g, PS_GEMS[i % 5], Math.cos(a) * rr, h + .08, Math.sin(a) * rr, 1 + r() * .6);
}
return psMerge(g);
};
FURN.goldstatue = function () { return __ZC(187, 14, this, arguments, new.target); };
FURN.crownstand = function () { return __ZC(187, 15, this, arguments, new.target); };
FURN.armourstand = function () { return __ZC(187, 16, this, arguments, new.target); };
FURN.weaponrack = function () { return __ZC(187, 17, this, arguments, new.target); };
FURN.goldcolumn = function () { return __ZC(187, 18, this, arguments, new.target); };
FURN.brazier = function () { return __ZC(187, 19, this, arguments, new.target); };
FURN.wallsconce = function () {
var g = psG();
psAdd(g, new THREE.BoxGeometry(.18, .4, .08), "iron", 0, 2.4, -.04);
psAdd(g, new THREE.BoxGeometry(.06, .06, .35), "iron", 0, 2.45, .15);
psAdd(g, new THREE.CylinderGeometry(.12, .06, .16, 8), "iron", 0, 2.5, .32);
psFlame(g, 0, 2.56, .32, .8);
return psMerge(g);
};
FURN.ironchandelier = function () { return __ZC(187, 20, this, arguments, new.target); };
FURN.feasttable = function () { return __ZC(187, 21, this, arguments, new.target); };
FURN.fourposter = function () { return __ZC(187, 22, this, arguments, new.target); };
FURN.footchest = function () { return __ZC(187, 23, this, arguments, new.target); };
FURN.grandthrone = function () { return __ZC(187, 24, this, arguments, new.target); };
FURN.redrunner = function () {
var g = psG(), L = PS.runL || 20;
psAdd(g, new THREE.BoxGeometry(2.6, .03, L), "velvet", 0, .02, 0);
psAdd(g, new THREE.BoxGeometry(.14, .035, L), "gold", -1.3, .022, 0);
psAdd(g, new THREE.BoxGeometry(.14, .035, L), "gold", 1.3, .022, 0);
return psMerge(g);
};
FURN.lavaforge = function () { return __ZC(187, 25, this, arguments, new.target); };
FURN.lavapool = function () { return __ZC(187, 26, this, arguments, new.target); };
FURN.minerails = function () {
var g = psG(), L = PS.runL || 20;
psAdd(g, new THREE.BoxGeometry(.08, .1, L), "steel", -.55, .08, 0);
psAdd(g, new THREE.BoxGeometry(.08, .1, L), "steel", .55, .08, 0);
for (var z = -L / 2 + .4; z < L / 2; z += .9)
psAdd(g, new THREE.BoxGeometry(1.6, .08, .24), "woodD", 0, .03, z);
return psMerge(g);
};
FURN.minecart = function () { return __ZC(187, 27, this, arguments, new.target); };
FURN.mineprop = function () { return __ZC(187, 28, this, arguments, new.target); };
FURN.oreheap = function () { return __ZC(187, 29, this, arguments, new.target); };
FURN.crystalcluster = function () { return __ZC(187, 30, this, arguments, new.target); };
FURN.boiler = function () { return __ZC(187, 31, this, arguments, new.target); };
FURN.flywheel = function () { return __ZC(187, 32, this, arguments, new.target); };
FURN.piston = function () { return __ZC(187, 33, this, arguments, new.target); };
FURN.pipes = function () { return __ZC(187, 34, this, arguments, new.target); };
FURN.lantern = function () { return __ZC(187, 35, this, arguments, new.target); };
FURN.highchair = function () { return __ZC(187, 36, this, arguments, new.target); };
FURN.pelt = function () { var g = psG(); var m = psAdd(g, new THREE.CircleGeometry(1.4, 10), "fur", 0, .02, 0, -Math.PI / 2, 0, 0); m.scale.set(1.3, 1, 1); return psMerge(g); };
}
if (typeof SOLIDFURN !== "undefined") {
["goldhoard", "treasurechest", "gemheap", "goldstatue", "crownstand", "armourstand", "weaponrack", "goldcolumn", "brazier", "feasttable", "fourposter", "footchest",
"grandthrone", "lavaforge", "lavapool", "minecart", "oreheap", "crystalcluster", "boiler", "flywheel", "piston", "highchair"].forEach(function (k) { SOLIDFURN[k] = 1; });
}
(function () {
if (typeof furnBox !== "function")
return;
var B = { goldhoard: [6.4, 5.6], treasurechest: [1.4, 1.2], gemheap: [1.8, 1.8], goldstatue: [1.8, 1.8], crownstand: [.9, .9], armourstand: [1, .8], weaponrack: [2, .5], goldcolumn: [1.5, 1.5],
brazier: [1, 1], feasttable: [6.4, 3.4], fourposter: [2.4, 2.8], footchest: [1.2, .6], grandthrone: [6, 4.2], lavaforge: [4.2, 3.2], lavapool: [5, 5], minecart: [1.4, 1.8], oreheap: [2.2, 2.2],
crystalcluster: [1.6, 1.6], boiler: [5, 2.6], flywheel: [1.2, 1.6], piston: [1.4, 1.4], highchair: [.7, .7] };
var fb = furnBox;
furnBox = function (k) { return B[k] || fb.apply(this, arguments); };
})();
function psEdge(W, D, list, step, inset, put) {
var n = 0;
for (var z = -D / 2 + 4; z < D / 2 - 5; z += step) {
put(list[n % list.length], -W / 2 + inset, z, Math.PI / 2);
put(list[(n + 1) % list.length], W / 2 - inset, z, -Math.PI / 2);
n++;
}
}
function psBack(W, D, list, step, inset, put, skipMid) {
var n = 0;
for (var x = -W / 2 + 5; x < W / 2 - 4; x += step) {
if (skipMid && Math.abs(x) < skipMid)
continue;
put(list[n++ % list.length], x, -D / 2 + inset, 0);
}
}
function psSconces(W, D, put) { psEdge(W, D, ["wallsconce"], 6, .25, put); }
function psRunner(D, put, z0, z1) { var a = z0 !== undefined ? z0 : -D / 2 + 5, b = z1 !== undefined ? z1 : D / 2 - 1; PS.runL = b - a; put("redrunner", 0, (a + b) / 2, 0); PS.runL = null; }
function psGrandHall(W, D, put, spots) { return __ZC(187, 37, this, arguments, new.target); }
function psRoom(k, W, D, put, spots) { return __ZC(187, 38, this, arguments, new.target); }
(function () {
if (typeof dlFillRoom !== "function")
return;
var df = dlFillRoom;
dlFillRoom = function (k, W, D, put, spots) { if (psRoom(k, W, D, put, spots))
return; return df.apply(this, arguments); };
})();
(function () {
if (typeof fillHall !== "function")
return;
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (PS.setting && kind === "castle" && PS.fillN++ === 0) {
if (typeof DL !== "undefined" && DL.fillSeq && DL.fillSeq.i === 0)
DL.fillSeq.i++;
return psGrandHall(W, D, put, spots);
}
return fh.apply(this, arguments);
};
})();
var PS_SWAP = { armchair: "highchair", sofa: "highchair", plant: "brazier", lamp: "brazier", painting: "hallbanner", wallmirror: "hallbanner", wallscreen: "hallbanner", tv: "hallbanner",
monitor: "hallbanner", filecabinet: "crates", desk: "crates", chair: "highchair", fridge: "crates", displaycase: "crownstand", runner: "redrunner", benchin: "highchair" };
function psSkin(I, setting) { return __ZC(187, 39, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var was = { spec: PS.spec, setting: PS.setting, H: PS.H, fillN: PS.fillN };
var set = psSetting(spec);
PS.spec = spec;
PS.setting = set;
PS.fillN = 0;
try {
var pl = (typeof planOf === "function") ? planOf(spec) : null;
PS.H = (pl && pl.h) || (typeof INT_H !== "undefined" ? INT_H : 3.2);
}
catch (e) {
PS.H = 7;
}
var I;
try {
I = mi.apply(this, arguments);
}
finally {
var keepH = PS.H;
PS.spec = was.spec;
PS.setting = was.setting;
PS.fillN = was.fillN;
PS.H = keepH;
}
try {
if (I && set && !I.cave && !I.igloo && !I.temple && !I.cinema && !I.library && !I.academy) {
psSkin(I, set);
I.psSetting = set;
}
}
catch (e) {
if (window.console)
console.warn("[volcano] inside", e);
}
PS.H = was.H;
return I;
};
})();
(function () {
if (typeof planOf !== "function")
return;
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments);
if (!p || !spec || p.mode !== "hall")
return p;
if (spec.psInside || (spec.dlRooms && spec.dlRooms.length && psSetting(spec)))
return Object.assign({}, p, { w: Math.max(p.w || 0, 40), d: Math.max(p.d || 0, 46), lift: true, liftLeft: true });
return p;
};
})();
setInterval(function () {
try {
if (typeof INT === "undefined" || !INT || !INT.psSetting || !INT.root)
return;
var L = INT.level || 0, F = INT.floor || 7.5;
INT.root.children.forEach(function (c) {
if (c.userData && c.userData.psDeco) {
c.children.forEach(function (d) { d.visible = Math.abs(d.userData.psLvl - L) <= 1; });
return;
}
if (!c.userData || !c.userData.furn || c.userData.furn === "stairs")
return;
var lv = Math.round(c.position.y / F);
c.visible = Math.abs(lv - L) <= 1;
});
}
catch (e) { }
}, 300);
var PS_V = { R: 60, top: 57, rim: 11, crater: 50 };
function psVolProfile(t) { return PS_V.top * Math.pow(1 - t, 1.55); }
function psVolRadius(t) { return PS_V.rim + (PS_V.R - PS_V.rim) * t; }
function psVolcano(spec) { return __ZC(187, 40, this, arguments, new.target); }
function psGate() { return __ZC(187, 41, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b = build;
build = function (spec) {
var g = b.apply(this, arguments);
try {
if (spec && spec.archetype === "volcano" && g && g.isGroup && !g.userData.psDone) {
g.children.forEach(function (c) { if (c.isMesh)
c.visible = false; });
g.add(psVolcano(spec));
g.userData.psDone = 1;
}
if (spec && spec.psInside && g && g.isGroup)
psDressGate(spec, g);
}
catch (e) {
if (window.console)
console.warn("[volcano] build", e);
}
return g;
};
})();
function psDressGate(spec, g) { return __ZC(187, 42, this, arguments, new.target); }
(function () {
if (typeof liveOwnDoor !== "function")
return;
var lo = liveOwnDoor;
liveOwnDoor = function (s) { if (s && s.psInside)
return true; return lo.apply(this, arguments); };
})();
setInterval(function () {
try {
(store.objects || []).forEach(function (o) {
if (!o.psInside || (o.realm || 0) !== (store.here || 0))
return;
var g = meshes[o.id];
if (!g)
return;
var has = false;
g.children.forEach(function (c) { if (c.userData.psGate)
has = true;
else if (c.visible)
c.visible = false; });
if (!has)
psDressGate(o, g);
});
}
catch (e) { }
}, 1200);
var PS_IN_RE = /\b(?:in|inside|into|within|under|beneath|below|underneath|deep in|deep inside|in the heart of|in the depths of|carved into|hollowed out of|in tunnels under(?: the ground)?(?: in)?)\s+(?:the|a|an)?\s*(?:[a-z'-]+\s+){0,2}?volcano\b/;
function psIntoVolcano(T, L) { return __ZC(187, 43, this, arguments, new.target); }
(function () {
if (typeof dlNestle !== "function")
return;
var dn = dlNestle;
dlNestle = function (sent) {
var done = dn.apply(this, arguments);
try {
if (PS_IN_RE.test(sent) && !/\b(?:at the foot of|at the base of|on the side of|on the slope of|beside|next to|near)\s+(?:the|a|an)?\s*(?:[a-z'-]+\s+){0,2}?volcano\b/.test(sent)) {
var m = DL_NEST_RE.exec(sent), T = m ? dlSubjectFor(m[1]) : null;
if (T && !T.psInside && KIT[T.archetype] && KIT[T.archetype].cat === "structure") {
var L = dlFind(["volcano"]);
if (!L && dlKit("volcano")) {
var me = dlMe();
L = dlNew("volcano", me.x, me.z - 90, { s: 1.3 }, { label: "volcano" });
}
if (L && psIntoVolcano(T, L))
return true;
}
}
}
catch (e) {
if (window.console)
console.warn("[volcano] nestle", e);
}
return done;
};
})();
var PS_CITY_ROOMS = ["throneroom", "banquet", "treasury", "forge", "mine", "engine", "bedroom"];
(function () {
if (typeof atlHarvest !== "function")
return;
var ah = atlHarvest;
atlHarvest = function (C) {
var r = ah.apply(this, arguments);
try {
var G = atlGaps(1920, 60, 8), gp = G[1];
if (!gp)
return r;
var a = gp.mid + 170 / 2000, rad = 1990;
var V = C.at("volcano", rad, a, 0, "The Volcano", { s: 1.7 }, { psCity: 1 });
if (!V)
return r;
var castle = C.at("castle", rad, a, 0, "The Volcano Castle", { s: 1.6, noModel: 1 }, { psInside: V.id, dlRooms: PS_CITY_ROOMS.slice(), sign: "The Volcano Castle",
note: "A castle inside a living volcano: its great hall and throne, the banquet hall, the treasure vault, Hephaestus's forge and mine, the steam engine works and the quarters." });
if (castle) {
var fx = -Math.cos(a), fz = -Math.sin(a), Rb = PS_V.R * 1.7;
castle.rot = Math.atan2(fx, fz);
castle.x = V.x;
castle.z = V.z;
var D = doorWorld(castle), gx = V.x + fx * (Rb * 1.12 + 14), gz = V.z + fz * (Rb * 1.12 + 14);
castle.x += gx - (D.x - D.out.x * 0.6);
castle.z += gz - (D.z - D.out.z * 0.6);
castle.solid = false;
var kb = C.kerb(1790, 1);
C.sign(kb, a + 18 / kb, rotIn(a), "The Volcano Castle", "A castle inside a living volcano. Its gate is cut into the volcano's foot.");
}
}
catch (e) {
if (window.console)
console.warn("[volcano] city", e);
}
return r;
};
})();
