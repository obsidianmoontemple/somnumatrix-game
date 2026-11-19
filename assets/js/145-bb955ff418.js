/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof KIT === "undefined" || typeof A !== "function")
return;
var hasEll = typeof CUSTOM_SHAPE !== "undefined" && !!CUSTOM_SHAPE.ell;
var E = hasEll ? "ell" : "sph";
A("treehouse", "nature", [10, 15, 10], [
{ g: "cyl", s: [.8, 1.2, 9, 10], p: [0, 4.5, 0], c: "bark" },
{ g: E, s: [5, 3.2, 5], p: [0, 12.6, -.6], c: 0x3E6B2E },
{ g: E, s: [3, 2.2, 3], p: [3, 11.4, 1.4], c: 0x4A7A34 },
{ g: "box", s: [6, .3, 6], p: [0, 7, 0], c: "bark" },
{ g: "box", s: [4, 3, 4], p: [0, 8.65, 0], c: 0x8A6A44 },
{ g: "cone", s: [3.4, 2.2, 4], p: [0, 11.2, 0], r: [0, .785, 0], c: 0x6A3A2A },
{ g: "box", s: [1.1, 1.9, .12], p: [0, 8.1, 2.06], c: "dark" },
{ g: "box", s: [.9, .9, .12], p: [1.3, 8.9, 2.06], c: 0xE8C27A, glow: 1 },
{ g: "box", s: [.12, 7, .12], p: [-.45, 3.5, 3.2], c: "bark" }, { g: "box", s: [.12, 7, .12], p: [.45, 3.5, 3.2], c: "bark" },
{ g: "box", s: [1, .1, .12], p: [0, 1, 3.2], c: "bark", rep: [6, 0, 1, 0] }
]);
A("clocktower", "structure", [7, 27, 7], [
{ g: "box", s: [6, 18, 6], p: [0, 9, 0], c: "stone" },
{ g: "box", s: [6.8, 5, 6.8], p: [0, 20.5, 0], c: 0x8A7A62 },
{ g: "cone", s: [5.2, 5, 4], p: [0, 25.5, 0], r: [0, .785, 0], c: "trim" },
{ g: "cyl", s: [2.3, 2.3, .2, 28], p: [0, 20.5, 3.45], r: [1.5708, 0, 0], c: 0xF2EAD6 },
{ g: "cyl", s: [2.3, 2.3, .2, 28], p: [3.45, 20.5, 0], r: [0, 0, 1.5708], c: 0xF2EAD6 },
{ g: "box", s: [1.6, 2.6, .2], p: [0, 1.3, 3.05], c: "dark" },
{ g: "box", s: [1, 2, .15], p: [0, 8, 3.05], c: "glass", rep: [2, 0, 5, 0] }
]);
A("submarine", "vehicle", [3.4, 6, 15], [
{ g: E, s: [1.7, 1.7, 7], p: [0, 1.7, 0], c: 0xC9A43A },
{ g: "box", s: [1.4, 2, 2.6], p: [0, 3.9, .8], c: 0xB8932E },
{ g: "cyl", s: [.13, .13, 1.6, 8], p: [0, 5.6, 1.4], c: "metal" },
{ g: "box", s: [.5, .13, .13], p: [0, 6.35, 1.65], c: "metal" },
{ g: "cone", s: [.9, 1.4, 6], p: [0, 1.7, -7.4], r: [-1.5708, 0, 0], c: "metal" },
{ g: "box", s: [4, .15, 1.1], p: [0, 1.7, -5.8], c: 0x9A7A26 },
{ g: "box", s: [.15, 2.6, 1.1], p: [0, 1.7, -5.8], c: 0x9A7A26 },
{ g: "cyl", s: [.38, .38, .12, 14], p: [1.62, 1.9, 2], r: [0, 0, 1.5708], c: "glass", rep: [3, 0, 0, -1.6] },
{ g: "cyl", s: [.38, .38, .12, 14], p: [-1.62, 1.9, 2], r: [0, 0, 1.5708], c: "glass", rep: [3, 0, 0, -1.6] }
]);
A("teddybear", "infra", [3.4, 4.6, 2.6], [
{ g: E, s: [1.3, 1.6, 1.1], p: [0, 1.7, 0], c: 0x9A6A3A },
{ g: E, s: [.85, 1.05, .4], p: [0, 1.7, .85], c: 0xC9A27A },
{ g: E, s: [1, .95, .9], p: [0, 3.65, 0], c: 0x9A6A3A },
{ g: E, s: [.36, .36, .22], p: [.72, 4.45, 0], c: 0x9A6A3A }, { g: E, s: [.36, .36, .22], p: [-.72, 4.45, 0], c: 0x9A6A3A },
{ g: E, s: [.42, .32, .32], p: [0, 3.42, .78], c: 0xC9A27A },
{ g: E, s: [.12, .1, .08], p: [0, 3.52, 1.08], c: 0x1A1210 },
{ g: E, s: [.1, .1, .06], p: [.32, 3.85, .84], c: 0x111111 }, { g: E, s: [.1, .1, .06], p: [-.32, 3.85, .84], c: 0x111111 },
{ g: E, s: [.4, .9, .4], p: [1.35, 2.1, .2], r: [0, 0, .6], c: 0x9A6A3A }, { g: E, s: [.4, .9, .4], p: [-1.35, 2.1, .2], r: [0, 0, -.6], c: 0x9A6A3A },
{ g: E, s: [.5, .55, .75], p: [.72, .5, .5], c: 0x9A6A3A }, { g: E, s: [.5, .55, .75], p: [-.72, .5, .5], c: 0x9A6A3A },
{ g: "box", s: [1.1, .32, .18], p: [0, 2.85, .95], c: 0xB0283A }
]);
(function () {
var parts = [{ g: "cyl", s: [.09, .09, 7, 6], p: [-3.1, 3.5, 0], c: "bark" }, { g: "cyl", s: [.09, .09, 7, 6], p: [3.1, 3.5, 0], c: "bark" }];
var cx = 0, cy = 3.8, n = 10, R = [.5, 1.05, 1.6, 2.15, 2.7];
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2;
parts.push({ g: "box", s: [.05, 2.9, .05], p: [cx + Math.sin(a) * 1.45, cy + Math.cos(a) * 1.45, 0], r: [0, 0, -a], c: 0xE8ECF0, opa: .75 });
}
R.forEach(function (r) {
for (var k = 0; k < n; k++) {
var a = (k + .5) / n * Math.PI * 2, len = 2 * r * Math.sin(Math.PI / n);
parts.push({ g: "box", s: [len, .05, .05], p: [cx + Math.sin(a) * r * Math.cos(Math.PI / n), cy + Math.cos(a) * r * Math.cos(Math.PI / n), 0], r: [0, 0, -a + Math.PI / 2], c: 0xE8ECF0, opa: .7 });
}
});
A("spiderweb", "infra", [6.6, 7, .4], parts);
})();
A("candyhouse", "structure", [10, 9, 11], [
{ g: "box", s: [9, 5, 10], p: [0, 2.5, 0], c: 0xA0623A },
{ g: "box", s: [5.6, .5, 10.6], p: [-2.2, 6.4, 0], r: [0, 0, .62], c: 0xF6F2EC },
{ g: "box", s: [5.6, .5, 10.6], p: [2.2, 6.4, 0], r: [0, 0, -.62], c: 0xF6F2EC },
{ g: "box", s: [9.2, .35, 10.2], p: [0, 5.1, 0], c: 0xF6F2EC },
{ g: "box", s: [1.5, 2.6, .2], p: [0, 1.3, 5.05], c: "dark" },
{ g: "box", s: [1.5, 1.3, .2], p: [-2.8, 2.9, 5.05], c: 0xFF9FC0, glow: 1 }, { g: "box", s: [1.5, 1.3, .2], p: [2.8, 2.9, 5.05], c: 0xFF9FC0, glow: 1 },
{ g: "sph", s: [.45], p: [-3, 8.1, -3.5], c: 0xE0324A, rep: [4, 2, 0, 0] },
{ g: "sph", s: [.45], p: [-3, 8.1, 3.5], c: 0x3AA04A, rep: [4, 2, 0, 0] },
{ g: "cyl", s: [.22, .22, 4, 8], p: [-4.7, 2, 5.2], c: 0xF4F4F4 }, { g: "cyl", s: [.24, .24, .35, 8], p: [-4.7, 1, 5.2], c: 0xD8203A, rep: [4, 0, .9, 0] },
{ g: "cyl", s: [.22, .22, 4, 8], p: [4.7, 2, 5.2], c: 0xF4F4F4 }, { g: "cyl", s: [.24, .24, .35, 8], p: [4.7, 1, 5.2], c: 0xD8203A, rep: [4, 0, .9, 0] },
{ g: "box", s: [9.3, .3, .3], p: [0, 4.9, 5.1], c: 0xFFD24A }
]);
(function () {
var parts = [{ g: "box", s: [16.8, .3, 16.8], p: [0, .15, 0], c: 0x5A3A22 }];
for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++)
parts.push({ g: "box", s: [2, .12, 2], p: [-7 + i * 2, .36, -7 + j * 2], c: (i + j) % 2 ? 0x1E1C1A : 0xEDE6D6 });
[[-7, -7, 1], [7, 7, 0], [-1, -7, 1], [1, 7, 0], [-5, -5, 1], [3, 5, 0]].forEach(function (q, k) {
var col = q[2] ? 0xEDE6D6 : 0x1E1C1A, h = k < 2 ? 3.2 : k < 4 ? 3.6 : 2.2;
parts.push({ g: "cyl", s: [.55, .8, h, 12], p: [q[0], .4 + h / 2, q[1]], c: col });
parts.push({ g: "sph", s: [.55], p: [q[0], .4 + h + .35, q[1]], c: col });
});
A("chessboard", "infra", [17, 4, 17], parts);
})();
A("blackhole", "nature", [14, 14, 3], [
{ g: "sph", s: [2.6], p: [0, 9, 0], c: 0x020203 },
{ g: "cyl", s: [5.6, 5.6, .08, 40], p: [0, 9, 0], r: [1.25, 0, 0], c: 0xFF8A2A, opa: .75, glow: 1 },
{ g: "cyl", s: [4, 4, .1, 40], p: [0, 9, 0], r: [1.25, 0, 0], c: 0xFFD27A, opa: .8, glow: 1 }
]);
if (typeof NOT_INSIDE !== "undefined")
NOT_INSIDE.clocktower = 0;
if (typeof STOREYS !== "undefined")
STOREYS.clocktower = 3;
if (typeof PLANS !== "undefined" && !PLANS.clocktower && PLANS.tower)
PLANS.clocktower = PLANS.tower;
var WORDS = { treehouse: ["treehouse", "tree house", "tree-house", "tree fort", "treetop house"],
clocktower: ["clock tower", "clock towers", "clocktower", "clock-tower", "belfry clock"],
submarine: ["submarine", "yellow submarine", "u-boat", "submersible"],
teddybear: ["teddy bear", "teddy", "teddybear", "stuffed bear", "giant teddy"],
spiderweb: ["spider web", "spiderweb", "spider's web", "cobweb", "cobwebs", "web of silk"],
candyhouse: ["candy house", "gingerbread house", "house of candy", "candy cottage", "gingerbread cottage", "sweet house"],
chessboard: ["chessboard", "chess board", "giant chessboard", "chess set", "giant chess"],
blackhole: ["black hole", "blackhole", "singularity"],
holosign: ["hologram", "holograms", "holographic sign"],
merpalace: ["underwater city", "city under the sea", "sunken city", "atlantis"] };
if (typeof learnWord === "function")
Object.keys(WORDS).forEach(function (k) {
if (KIT[k])
WORDS[k].forEach(function (w) {
if (typeof PHRASES !== "undefined")
for (var i = PHRASES.length - 1; i >= 0; i--)
if (PHRASES[i][0] === w && PHRASES[i][1] !== k)
PHRASES.splice(i, 1);
if (typeof VOCAB !== "undefined")
Object.keys(VOCAB).forEach(function (o) { if (o !== k && VOCAB[o]) {
var j = VOCAB[o].indexOf(w);
if (j > -1)
VOCAB[o].splice(j, 1);
} });
learnWord(k, w);
});
});
if (typeof GROW_STOPSET !== "undefined")
("alone lonely upward upwards downward downwards sideways backward backwards forward forwards nowhere somewhere everywhere anywhere " +
"ground floor sky air distance horizon middle edge side top bottom inside outside together apart around above below beneath underneath " +
"toward towards away forever suddenly slowly quickly again ever never always size shape colour color kind sort way thing things stuff")
.split(" ").forEach(function (w) { if (w)
GROW_STOPSET[w] = 1; });
})();
(function () {
if (typeof EFFECTS === "undefined")
return;
function ph(spec) { var s = String((spec && spec.id) || ""), h = 0; for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) >>> 0; return (h % 628) / 100; }
function kids(g) { return g.children.filter(function (c) { return !c.userData.contact && !c.userData.model && c.name !== "model"; }); }
function set(keys, fn) { keys.forEach(function (k) { if (KIT[k] && !EFFECTS[k])
EFFECTS[k] = fn; }); }
function sway(amp, speed) {
return function (g, spec) {
var p = ph(spec);
return function (t) { g.rotation.z = Math.sin(t * speed + p) * amp; g.rotation.x = Math.cos(t * speed * 0.8 + p * 1.3) * amp * 0.6; };
};
}
set(["tree", "deadtree", "pine", "palm", "hollowtree", "bonetree", "worldtree", "yuletree", "treehouse", "bonsai"], sway(0.012, 0.7));
set(["bush", "briar", "cornstalk", "wheat", "reeds", "glowflowers", "flowers", "alienflora", "harvestsheaf", "topiary"], sway(0.04, 1.3));
set(["banner", "bannerpole", "maypoleribbons", "ragline", "stringlights", "marketawning"], sway(0.05, 1.6));
function hover(h, speed) {
return function (g, spec) {
var p = ph(spec), K = kids(g);
K.forEach(function (c) { c.userData.y0 = c.position.y; });
return function (t) { var dy = Math.sin(t * speed + p) * h; K.forEach(function (c) { c.position.y = c.userData.y0 + dy; }); };
};
}
set(["cloudbank", "cloudpalace", "airship", "saucer", "hovercar", "eyrie", "moonrock", "spacewalker", "drone"], hover(0.6, 0.5));
set(["orbmagic", "starcrystal", "sigil", "staffmagic", "wand", "icecrystals", "lunarlanterns", "eidlanterns"], hover(0.25, 1.1));
function turn(speed) { return function (g) { var K = kids(g); return function (t, dt) { K.forEach(function (c) { c.rotation.y += dt * speed; }); }; }; }
set(["planet", "hourglass", "lithawheel"], turn(0.12));
function glowing(lo, speed, flick) {
return function (g, spec) {
var p = ph(spec), mats = [];
g.traverse(function (c) { if (c.material && c.material.transparent && !c.userData.contact && c.material.opacity > 0.05)
mats.push({ m: c.material, o: c.material.opacity }); });
return function (t) {
var k = lo + (1 - lo) * (0.5 + 0.5 * Math.sin(t * speed + p));
mats.forEach(function (q) { q.m.opacity = q.o * k; });
};
};
}
set(["portal", "stargate", "moongate", "rift", "forcefield", "reactor", "lightpillar", "veil", "hubmirror"], glowing(0.55, 1.6, false));
set(["neonsign", "holosign", "jukebox", "arcademachine", "radsign", "billboard", "cinemascreen"], glowing(0.7, 2.4, true));
var portalBase = EFFECTS.portal;
if (portalBase && typeof particles === "function")
EFFECTS.portal = function (g, spec) {
var run = portalBase(g, spec), m = particles(60, [3, 6.5, .4], 0xBFD8FF, 1.4, 0.7);
m.position.y = .2;
g.add(m);
return function (t, dt) { if (run)
run(t, dt); if (typeof rise === "function")
rise(m, dt, 1.4, 0); };
};
function rock(amp) {
return function (g, spec) {
var p = ph(spec), K = kids(g);
K.forEach(function (c) { c.userData.y0 = c.position.y; });
return function (t) { g.rotation.z = Math.sin(t * 0.9 + p) * amp; g.rotation.x = Math.sin(t * 0.6 + p) * amp * 0.5; var dy = Math.sin(t * 1.1 + p) * 0.15; K.forEach(function (c) { c.position.y = c.userData.y0 + dy; }); };
};
}
set(["boat", "fishingboat", "ship", "submarine", "soulferry"], rock(0.04));
if (KIT.windmill && !EFFECTS.windmill)
EFFECTS.windmill = function (g) {
var blades = g.children.filter(function (c) { return c.isMesh && Math.abs(c.position.y - 16) < 0.5 && Math.abs(c.position.z - 3.4) < 0.5; });
if (!blades.length)
return null;
var hub = new THREE.Group();
hub.position.set(0, 16, 3.4);
g.add(hub);
blades.forEach(function (b) { g.remove(b); b.position.set(0, 0, 0); hub.add(b); });
return function (t, dt) { hub.rotation.z += dt * 0.6; };
};
function jet(y, w, h) {
return function (g) {
if (typeof particles !== "function")
return null;
var j = particles(140, [w, h, w], 0xDCE8F0, 1.1, 0.7);
j.position.y = y;
g.add(j);
return function (t, dt) { if (typeof rise === "function")
rise(j, dt, 2.6, 0); };
};
}
if (KIT.fountain && !EFFECTS.fountain)
EFFECTS.fountain = jet(3.1, 1.2, 2.2);
if (KIT.tiledfountain && !EFFECTS.tiledfountain)
EFFECTS.tiledfountain = jet(2, 1, 2);
if (KIT.well && !EFFECTS.well)
EFFECTS.well = null;
function smoke(g, spec) {
if (!spec || spec.city || spec.hub || typeof particles !== "function")
return null;
var d = KIT[spec.archetype];
if (!d)
return null;
var s = particles(26, [.8, 7, .8], 0x8A8680, 2.2, 0.35);
s.position.set(d.size[0] * 0.25, d.size[1] * 0.95, -d.size[2] * 0.15);
g.add(s);
return function (t, dt) { if (typeof rise === "function")
rise(s, dt, 1.1, 0.3); };
}
set(["cottage", "farmhouse", "izba", "longhouse", "candyhouse", "leanto", "roundhouse", "shanty", "stilthouse", "yurt", "igloo"], smoke);
if (KIT.clocktower)
EFFECTS.clocktower = function (g) {
var mat = new THREE.MeshLambertMaterial({ color: 0x1A1612 }), hands = [];
[[0, 3.58, 0], [3.58, 0, Math.PI / 2]].forEach(function (f) {
var pivot = new THREE.Group();
pivot.position.set(f[0], 20.5, f[1]);
pivot.rotation.y = f[2];
g.add(pivot);
var hr = new THREE.Mesh(new THREE.BoxGeometry(.18, 1.3, .06), mat);
hr.geometry.translate(0, .55, 0);
var mn = new THREE.Mesh(new THREE.BoxGeometry(.12, 1.9, .06), mat);
mn.geometry.translate(0, .85, 0);
mn.position.z = .04;
pivot.add(hr);
pivot.add(mn);
hands.push([hr, mn]);
});
return function () {
var h = (typeof dreamHour === "function") ? dreamHour() : (Date.now() / 3600000) % 24;
hands.forEach(function (p) { p[0].rotation.z = -(h % 12) / 12 * Math.PI * 2; p[1].rotation.z = -(h % 1) * Math.PI * 2; });
};
};
if (KIT.blackhole)
EFFECTS.blackhole = function (g) {
var rings = g.children.filter(function (c) { return c.geometry && c.geometry.type === "CylinderGeometry"; });
var dust = (typeof particles === "function") ? particles(160, [12, 1.2, 12], 0xFFB060, 1.3, 0.6) : null;
if (dust) {
dust.position.y = 9;
dust.rotation.x = 1.25 - 1.5708;
g.add(dust);
}
return function (t, dt) { rings.forEach(function (r, k) { r.rotation.y += dt * (0.8 + k * 0.5); }); if (dust)
dust.rotation.y += dt * 0.4; };
};
})();
