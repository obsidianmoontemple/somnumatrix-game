/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HUB_STONE = 0x2A2E3A, HUB_TRIM = 0xC9A868, HUB_GLOW = 0x9FD8FF;
S("hubdoor", "structure", [3.4, 5.2, 1.2], [
{ g: "box", s: [3.2, 5, .8], p: [0, 2.5, 0], c: HUB_STONE },
{ g: "box", s: [2.2, 4, .3], p: [0, 2, .3], c: 0x141620 },
{ g: "pln", s: [2, 3.8], p: [0, 2, .48], c: HUB_GLOW, glow: 1, opa: .42 },
{ g: "box", s: [3.4, .3, 1], p: [0, 5.1, 0], c: HUB_TRIM },
{ g: "box", s: [2.4, .5, .12], p: [0, 4.5, .45], c: 0x0E1018 },
{ g: "sph", s: [.12], p: [-1.3, 2.4, .45], c: HUB_TRIM, glow: 1, pulse: 1 },
{ g: "sph", s: [.12], p: [1.3, 2.4, .45], c: HUB_TRIM, glow: 1, pulse: 1 }
], ["door of your own", "a door with a name on it", "hall door", "doorway in the hall"]);
S("hubmirror", "structure", [2.2, 4.6, .6], [
{ g: "box", s: [2, 4.4, .35], p: [0, 2.2, 0], c: HUB_STONE },
{ g: "box", s: [1.5, 3.6, .12], p: [0, 2.2, .2], c: 0xDDE3EC, glow: 1, opa: .75 },
{ g: "tor", s: [.9, .09], p: [0, 4.2, .1], r: [0, 0, 0], c: HUB_TRIM }
], ["standing mirror", "tall mirror in a frame", "mirror between the doors"]);
S("maptable", "structure", [7, 1.6, 7], [
{ g: "cyl", s: [3, 3.2, 1.1, 24], p: [0, .55, 0], c: HUB_STONE },
{ g: "cyl", s: [3.1, 3.1, .12, 24], p: [0, 1.12, 0], c: 0x141620 },
{ g: "cyl", s: [2.7, 2.7, .06, 24], p: [0, 1.2, 0], c: HUB_GLOW, glow: 1, opa: .5, pulse: 1 },
{ g: "sph", s: [.16], p: [1.6, 1.34, 0], c: HUB_TRIM, glow: 1, pulse: 1, rep: [6, -.5, 0, .5] },
{ g: "tor", s: [3.25, .1], p: [0, 1.14, 0], r: [Math.PI / 2, 0, 0], c: HUB_TRIM }
], ["map table", "table with a map of the worlds", "the great map", "map of everywhere"]);
S("signboard", "infra", [3.4, 2.8, .4], [
{ g: "cyl", s: [.12, .14, 2.6, 8], p: [-1.2, 1.3, 0], c: 0x4A4238 },
{ g: "cyl", s: [.12, .14, 2.6, 8], p: [1.2, 1.3, 0], c: 0x4A4238 },
{ g: "box", s: [3.2, 1.5, .14], p: [0, 2.1, 0], c: 0x2A2E3A },
{ g: "box", s: [2.9, 1.2, .05], p: [0, 2.1, .1], c: 0xE8E4DA },
{ g: "box", s: [3.3, .12, .2], p: [0, 2.92, 0], c: HUB_TRIM }
], ["signboard", "a board with writing on it", "notice board in the hall"]);
S("hubpillar", "structure", [2.6, 9, 2.6], [
{ g: "cyl", s: [1, 1.2, 8, 12], p: [0, 4, 0], c: HUB_STONE },
{ g: "cyl", s: [1.4, 1.4, .5, 12], p: [0, 8.2, 0], c: HUB_TRIM },
{ g: "cyl", s: [1.4, 1.4, .5, 12], p: [0, .25, 0], c: HUB_TRIM },
{ g: "sph", s: [.3], p: [0, 8.8, 0], c: HUB_GLOW, glow: 1, pulse: 1 }
], ["great pillar", "pillar of the hall"]);
S("plinth", "infra", [2.2, 1.2, 2.2], [
{ g: "cyl", s: [.9, 1, 1, 16], p: [0, .5, 0], c: HUB_STONE },
{ g: "cyl", s: [1.05, 1.05, .1, 16], p: [0, 1.05, 0], c: HUB_TRIM }
], ["plinth", "pedestal", "stand for something"]);
EFFECTS.hubdoor = function (g, spec) {
var pane = null;
g.traverse(function (m) { if (m.isMesh && m.geometry && m.geometry.type === "PlaneGeometry")
pane = m; });
return function (t) { if (pane)
pane.material.opacity = .32 + .14 * Math.sin(t * 1.1 + (spec.x || 0)); };
};
EFFECTS.maptable = function (g) { return function (t) { g.children.forEach(function (m, i) { if (i > 3)
m.rotation.y = t * .15; }); }; };
var HUB_SIGNS = [
["Speak it while it is still there", "Press the circle and talk, or type. A sentence is enough. The Atlas builds only what you dreamt \u2014 what you left out stays faint."],
["Walk it", "Press Walk. W A S D, or the pad on a phone. What is solid holds you: decks, stairs, floors, roofs. Doors let you in."],
["Change what is wrong", "Tap anything to open it. Its colours, its materials, its windows and doors, who lives there \u2014 all of it yours to correct."],
["Cross over", "Say how you went: \u201cI went down into the underworld\u201d, \u201cI found myself somewhere else\u201d. Or take one of the doors in this hall."],
["Nobody reads your dreams", "They stay on your device. Keep them to your account and they are locked here first, with a phrase only you know."]
];
function hubDoorList() {
var list = [{ to: "town", name: "Your own town" }];
Object.keys(REALMS).forEach(function (k) { if (k !== "somnucor")
list.push({ to: k, name: REALMS[k].name }); });
return list;
}
var HUB_GALLERY = [
{ name: "Dwellings", of: ["cottage", "house", "hanok", "yurt", "pueblo", "toadstoolhouse", "habitat", "igloo"] },
{ name: "Great places", of: ["church", "pagoda", "mosque", "castle", "merpalace", "icepalace", "ziggurat", "skyscraper"] },
{ name: "Those you may meet", of: ["human", "child", "fairy", "elf", "goblin", "mermaid", "angel", "robot"] },
{ name: "Creatures", of: ["unicorn", "griffin", "kitsune", "cerberus", "spider", "octopus", "phoenix", "dragon"] },
{ name: "The gods, in their own terms", of: ["deity", "deity", "deity", "deity"], deities: ["hecate", "anubis", "ganesha", "thor", "guanyin", "odin"] },
{ name: "Workings and arms", of: ["fireball", "lightningbolt", "iceblast", "shieldspell", "swordlying", "bowlying", "staffmagic", "wand"] },
{ name: "The turning year", of: ["yuletree", "ostaraeggs", "beltanefire", "lithawheel", "lughcorn", "mabontable", "samhainlanterns", "imbolccandles"] },
{ name: "Ways of travelling", of: ["stargate", "flyingcarpet", "teleportpad", "broomstick", "shuttle", "saucer", "soulferry", "firechariot"] }
];
function somnucorRealm() {
var R = realms();
for (var i = 0; i < R.length; i++)
if (R[i].kind === "somnucor")
return R[i];
return null;
}
function buildSomnucor() { return __ZC(67, 0, this, arguments, new.target); }
var hubCool = 0;
function hubAtDoor(o, P) {
var s = (o.attrs && o.attrs.s) || 1;
if (s <= 1.05)
return Math.hypot(o.x - P.x, o.z - P.z) <= 2.5;
var dx = P.x - o.x, dz = P.z - o.z, c = Math.cos(-(o.rot || 0)), sn = Math.sin(-(o.rot || 0)), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
return Math.abs(lx) < 1.3 * s && Math.abs(lz) < 0.6 * s + 2.2;
}
var HUBUSE = { arm: null, offer: null, fn: null, wait: null, waitT: 0 };
function hubDoorLabel(o) { return __ZC(67, 1, this, arguments, new.target); }
function hubOffer(o) {
var on = typeof WCITY !== "undefined" && !!HUBUSE.fn && WCITY.fn === HUBUSE.fn;
if (!o) {
if (on)
worldPromptCity(null);
HUBUSE.offer = null;
HUBUSE.fn = null;
return;
}
if (HUBUSE.offer === o.id && on)
return;
if (!on && typeof WCITY !== "undefined" && WCITY.fn) {
if (HUBUSE.wait !== o.id) {
HUBUSE.wait = o.id;
HUBUSE.waitT = performance.now();
}
if (performance.now() - HUBUSE.waitT < 700)
return;
}
HUBUSE.wait = null;
var id = o.id;
HUBUSE.offer = id;
HUBUSE.fn = function () { HUBUSE.arm = id; };
if (typeof worldPromptCity === "function")
worldPromptCity(hubDoorLabel(o), HUBUSE.fn);
}
function hubTick(dt) {
if (hubCool > 0)
hubCool -= dt;
if (!walkMode || store.inside || hubCool > 0 || (typeof WLD !== "undefined" && WLD.on)) {
hubOffer(null);
HUBUSE.arm = null;
return;
}
var P = camera.position, o = null;
for (var i = 0; i < store.objects.length; i++) {
var q = store.objects[i];
if (q.archetype !== "hubdoor")
continue;
if ((q.realm || 0) !== (store.here || 0))
continue;
if (!q.leadsTo) {
if (Math.hypot(q.x - P.x, q.z - P.z) > 2.5)
continue;
}
else if (!hubAtDoor(q, P))
continue;
o = q;
break;
}
if (!o) {
hubOffer(null);
HUBUSE.arm = null;
return;
}
if (HUBUSE.arm !== o.id) {
hubOffer(o);
return;
}
HUBUSE.arm = null;
hubOffer(null);
if (!o.leadsTo) {
hubCool = 2.5;
if (typeof walkIntoDoor === "function")
walkIntoDoor(o);
return;
}
hubCool = 2.5;
if (o.leadsTo === "hall") {
toHall();
if (typeof openHall === "function")
openHall();
return;
}
if (o.leadsTo === "somnucor") {
var c = somnucorRealm() || (typeof buildSomnucorCity === "function" ? buildSomnucorCity() : null);
if (c) {
beHere(c.id);
var cb = blockOrigin(c.grid.bx, c.grid.bz), gt = typeof atlHallGate === "function" ? atlHallGate() : null;
if (gt && typeof ATLC !== "undefined" && ATLC) {
var ux = Math.sin(gt.rot || 0), uz = Math.cos(gt.rot || 0);
camera.position.set(gt.x + ux * 4.5, camera.position.y, gt.z + uz * 4.5);
yaw = Math.atan2(-ux, -uz);
pitch = 0;
}
else
camera.position.set(cb.x, camera.position.y, cb.z + 30);
setStatus("<b>Somnucor.</b> The gate to the hall stands behind you.");
}
return;
}
if (o.leadsTo === "town") {
if (typeof beHere === "function")
beHere(0);
var t = heartOf(0);
camera.position.set(t.x, camera.position.y, t.z + 24);
setStatus("<b>Your own town.</b> Everything you have dreamt stands here.");
}
else {
enterRealm(o.leadsTo, false, null, null);
var rr = realms()[realms().length - 1];
if (typeof beHere === "function")
beHere(rr ? rr.id : 0);
var hh = heartOf(store.here || 0);
camera.position.set(hh.x, camera.position.y, hh.z + 18);
setStatus("<b>" + esc((REALMS[o.leadsTo] || {}).name || o.leadsTo) + ".</b> The way back stands where you came in.");
}
if (typeof save === "function")
save();
}
function toSomnucor() { return __ZC(67, 2, this, arguments, new.target); }
function hallRealm() {
var R = realms();
for (var i = 0; i < R.length; i++)
if (R[i].kind === "hall")
return R[i];
return null;
}
var HALL_BUILD = 3;
function buildHall() { return __ZC(67, 3, this, arguments, new.target); }
function toHall() { return __ZC(67, 4, this, arguments, new.target); }
