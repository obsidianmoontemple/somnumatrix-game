/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WDR = { tails: [], skaters: [] };
function wdrCostumeFor(seed, o) {
seed = String(seed || "");
if (seed === "santa")
return WDR_COST.santa;
if (seed === "mrsclaus")
return WDR_COST.mrsclaus;
if (/^elf_/.test(seed))
return WDR_COST.elf;
if (/^mermaid_/.test(seed))
return WDR_COST.mermaid;
if (/^zhael_/.test(seed))
return WDR_COST.drow;
if (/^(penelope|telemachus|polyphemus|aeolus|lotus_|circe|nausicaa|alcinous|tiresias|calypso|eumaeus|siren|odysseus)/.test(seed))
return WDR_COST.greek;
return null;
}
function wdrMat(col, o) { o = o || {}; var m = new THREE.MeshStandardMaterial({ color: col, roughness: o.r != null ? o.r : 0.75, metalness: o.m || 0 }); if (o.e != null) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.3;
} return m; }
var WDR_COST = {
santa: { ownHead: true, body: 0xB8141C, arms: 0xB8141C, legs: 0xB8141C, feet: 0x141414, hair: 0xF6F6F6, girth: 1.16,
look: { beard: "full", hair: 0xF6F6F6, hat: "none", layer: null, role: "rider" },
props: function (add) { return __ZC(177, 0, this, arguments, new.target); } },
mrsclaus: { ownHead: true, body: 0xB01E2A, arms: 0xB01E2A, legs: 0xB01E2A, feet: 0x3A2418, hair: 0xF4F4F4, girth: 1.12,
look: { hairStyle: "bun", hair: 0xF4F4F4, hat: "none", layer: null, role: "rider" },
props: function (add) { return __ZC(177, 1, this, arguments, new.target); } },
elf: { ownHead: true, adult: true, scale: 0.76, look: { age: "adult", hat: "none", role: "rider" },
pick: function (seed) { var i = parseInt(String(seed).replace(/\D/g, ""), 10) || 0; return i % 2 ? { body: 0xC8202A, arms: 0xC8202A, legs: 0x1E7A34, feet: 0x5A3A22, hat: 0x1E7A34 } : { body: 0x1E7A34, arms: 0x1E7A34, legs: 0xC8202A, feet: 0x5A3A22, hat: 0xC8202A }; },
props: function (add, c, E) { return __ZC(177, 2, this, arguments, new.target); } },
mermaid: { hideLegs: true, look: { role: "rider" },
pick: function (seed, E) { var L = E.spec.look || {}; return { body: L.top != null ? L.top : 0x2F8A7A, arms: L.skin != null ? L.skin : 0xE8B898, tail: L.top != null ? L.top : 0x2F8A7A }; },
props: function (add, c, E) { return __ZC(177, 3, this, arguments, new.target); } },
drow: {
props: function (add, c, E) {
var skin = (E.spec.look && E.spec.look.skin != null) ? E.spec.look.skin : 0x4A4660;
[-1, 1].forEach(function (s) { var ear = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.15, 6), wdrMat(skin, { r: 0.9 })); ear.rotation.z = s * -1.2; add("Head", [s * 0.1, 0.08, -0.01], ear); });
}
},
greek: { pick: function (seed, E) { var L = E.spec.look || {}; var t = L.top != null ? L.top : 0xEDE6D6; return { body: t, arms: L.skin != null ? L.skin : 0xD8A878, legs: L.bottom != null ? L.bottom : t, feet: 0x8A6A3A }; },
props: function (add) {
var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.035, 16), wdrMat(0xD8A840, { r: 0.3, m: 0.7 }));
belt.scale.z = 0.82;
add("spine_02", [0, -0.02, 0], belt);
} }
};
function wdrSpecs(mat) {
var g = new THREE.Group();
[-1, 1].forEach(function (s) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.005, 6, 14), mat); r.position.x = s * 0.036; g.add(r); });
var br = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.005, 0.005), mat);
g.add(br);
return g;
}
function wdrTail(col) {
var g = merTail(col, 1.0);
g.rotation.x = 0;
return { g: g };
}
(function () {
if (typeof wPerson !== "function")
return;
wPerson = function (seed, o) {
o = o || {};
var cos = wdrCostumeFor(seed, o);
var child = !!o.child && !(cos && cos.adult), kind = child ? "child" : "human";
var look = (typeof randomLook === "function") ? randomLook("w_" + seed, kind) : {};
if (!o.title) {
look.layer = null;
look.face = null;
look.neck = null;
look.waist = null;
look.back = null;
look.gear = null;
look.hat = "none";
if (look.shoeKind === "sneakers" || look.shoeKind === "heels")
look.shoeKind = "shoes";
if (look.bottomKind === "jeans" || look.bottomKind === "shorts")
look.bottomKind = "trousers";
}
if (o.title && typeof jobDress === "function")
try {
jobDress(look, o.title, o.place || "");
}
catch (e) { }
if (o.sex)
look.sex = o.sex;
if (o.species)
look.species = o.species;
if (o.look)
Object.keys(o.look).forEach(function (k) { look[k] = o.look[k]; });
if (cos && cos.look)
Object.keys(cos.look).forEach(function (k) { look[k] = cos.look[k]; });
var spec = { id: "w_" + seed, archetype: kind, attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true };
if (cos)
spec.wCostume = { c: cos, seed: seed };
var g = buildFigure(spec, 1);
var sc = (o.scale || 1) * (cos && cos.scale ? cos.scale : 1);
if (sc !== 1)
g.scale.setScalar(sc);
g.userData.wSeed = seed;
return g;
};
})();
function wdrAdd(E, bones, body, name, off, obj, keepTurn) { return __ZC(177, 4, this, arguments, new.target); }
var WDR_PALE = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function wdrPaleMap(t) { return __ZC(177, 5, this, arguments, new.target); }
function wdrDress(E) { return __ZC(177, 6, this, arguments, new.target); }
(function () {
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) { var r = ha.apply(this, arguments); try {
if (E.model && E.spec && E.spec.wCostume && !E.wdr) {
E.wdr = 1;
wdrDress(E);
}
}
catch (e) {
if (window.console)
console.warn("[world dress]", e);
} return r; };
var hd = hdfDetach;
hdfDetach = function (E) { if (E)
E.wdr = 0; return hd.apply(this, arguments); };
})();
function wdrSnowRoof(g, w, d, h, col) {
[-1, 1].forEach(function (s) {
var r = wBox(w + 0.4, 0.25, d / 2 + 0.6, wM(col), 0, h, s * d / 4, g);
r.rotation.x = s * 0.62;
r.position.y = h + d / 4 * 0.72;
var sn = wBox(w + 0.5, 0.14, d / 2 + 0.6, wM(0xF6FAFF), 0, 0, 0.0, g);
sn.rotation.x = s * 0.62;
sn.position.set(0, h + d / 4 * 0.72 + 0.18, s * d / 4);
});
}
function wdrNpMore(G) { return __ZC(177, 7, this, arguments, new.target); }
function wdrNpTick(dt) {
WDR.skaters.forEach(function (s) { s.a += dt * s.sp; var x = s.cx + Math.cos(s.a) * s.r, z = s.cz + Math.sin(s.a) * s.r; s.g.position.set(x, s.y, z); s.g.rotation.y = Math.atan2(-Math.sin(s.a), Math.cos(s.a)) + Math.PI; s.g.rotation.z = Math.sin(s.a * 2) * 0.05; });
}
function wdrTailTick(dt) {
var t = (typeof WLD !== "undefined" ? WLD.t : 0);
for (var i = WDR.tails.length - 1; i >= 0; i--) {
var g = WDR.tails[i];
if (!g.parent) {
WDR.tails.splice(i, 1);
continue;
}
var sw = Math.sin(t * (g.userData.sit ? 1.3 : 2.2) + i) * (g.userData.sit ? 0.12 : 0.22);
g.rotation.x = (g.userData.sit ? -1.25 : 0.1) + sw;
if (g.userData.fl)
g.userData.fl.rotation.x = sw * 1.4;
}
}
(function () {
if (typeof WORLDS === "undefined")
return;
var np = WORLDS.northpole;
if (np) {
var b0 = np.build;
np.build = function (G) { b0.apply(this, arguments); try {
wdrNpMore(G);
}
catch (e) {
if (window.console)
console.warn("[north pole]", e);
} };
var t0 = np.tick;
np.tick = function (dt) { t0.apply(this, arguments); try {
wdrNpTick(dt);
}
catch (e) { } };
}
var nv = WORLDS.neverland;
if (nv) {
var e0 = nv.enter;
nv.enter = function (opt) { opt = opt || {}; if (!opt.at)
opt = Object.assign({}, opt, { at: { x: 560, y: 48, z: 470 } }); return e0.call(this, opt); };
}
var ud = WORLDS.underdark;
if (ud && ud.env && typeof ud.env === "object") {
ud.env.hemi = 0.85;
ud.env.hemiCol = 0x8A80C8;
ud.env.sun = 0.24;
var ub = ud.build;
ud.build = function (G) {
ub.apply(this, arguments);
try {
if (typeof UD_CITY !== "undefined") {
var cx = UD_CITY.x, cz = UD_CITY.z, y = udHeight(cx, cz);
[[0, 0, 0xB088FF], [50, 30, 0x7AA8FF], [-50, 40, 0xC870FF], [30, -50, 0x88C8FF], [-40, -40, 0xA070FF], [0, 80, 0x9A88FF]].forEach(function (q) { var l = new THREE.PointLight(q[2], 1.6, 140, 1.3); l.position.set(cx + q[0], y + 18, cz + q[1]); G.add(l); var gl = wGlow(q[2], 14, 0.5); gl.position.copy(l.position); G.add(gl); });
}
}
catch (e) { }
};
}
if (typeof worldTick === "function") {
var wt = worldTick;
worldTick = function (dt) { var r = wt.apply(this, arguments); try {
wdrTailTick(dt);
}
catch (e) { } return r; };
}
})();
var SLE = { read: null, on: false, g: null, parked: null, team: [], x: -44, y: 0, z: 14, h: 0, sp: 0, vy: 0, t: 0, bells: 0 };
function sleBuild(G) { return __ZC(177, 8, this, arguments, new.target); }
function sleStart() { return __ZC(177, 9, this, arguments, new.target); }
function sleLand() { return __ZC(177, 10, this, arguments, new.target); }
function sleTick(dt) { return __ZC(177, 11, this, arguments, new.target); }
var SLE_AC = null;
function sleBell() { return __ZC(177, 12, this, arguments, new.target); }
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.northpole)
return;
var np = WORLDS.northpole;
var b0 = np.build;
np.build = function (G) {
b0.apply(this, arguments);
try {
sleBuild(G);
NP.talkers.forEach(function (T) { if (T.name === "Santa's sleigh") {
T.read = T.fn;
T.verb = "climb in and fly";
T.fn = sleStart;
} });
}
catch (e) {
if (window.console)
console.warn("[sleigh]", e);
}
};
var t0 = np.tick;
np.tick = function (dt) { t0.apply(this, arguments); if (SLE.on) {
try {
sleTick(dt);
}
catch (e) {
if (window.console)
console.warn("[sleigh]", e);
}
return;
} };
var g0 = np.ground;
np.ground = function (x, z, f) { if (SLE.on)
return SLE.y + 1.03; return g0.apply(this, arguments); };
var k0 = np.block;
np.block = function (x, z, f) { if (SLE.on)
return true; return k0.apply(this, arguments); };
var bk = np.back;
np.back = function () { if (SLE.on)
return sleLand(); return bk.apply(this, arguments); };
var lv = np.leave;
np.leave = function () { if (SLE.on) {
SLE.on = false;
if (SLE.g)
SLE.g.visible = false;
if (SLE.parked)
SLE.parked.visible = true;
} return lv ? lv.apply(this, arguments) : undefined; };
})();
