/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
A("deity", "being", [1.2, 2.4, 1.2], [{ g: "sph", s: [.3], p: [0, 1.2, 0], c: "light", glow: 1 }]);
A("dragon", "being", [40, 20, 60], [{ g: "sph", s: [2], p: [0, 2, 0], c: "nature" }]);
PEOPLE.deity = 1;
MORE_VOCAB.dragon = ["dragon", "dragons", "wyrm", "wyvern", "great serpent"];
MORE_VOCAB.deity = ["goddess", "deity", "divine being", "a god", "the god", "the gods"];
function mL(c) { return new THREE.MeshLambertMaterial({ color: c }); }
function mG(c, o) { return new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o === undefined ? 0.9 : o, depthWrite: false }); }
function P(geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); return m; }
function box(w, h, d) { return new THREE.BoxGeometry(w, h, d); }
function cyl(a, b, h, s) { return new THREE.CylinderGeometry(a, b, h, s || 8); }
function cone(r, h, s) { return new THREE.ConeGeometry(r, h, s || 8); }
function sph(r, a, b) { return new THREE.SphereGeometry(r, a || 12, b || 10); }
function tor(r, t, arc) { return new THREE.TorusGeometry(r, t, 6, 24, arc === undefined ? Math.PI * 2 : arc); }
var HEADS = {
jackal: function () { return __ZC(26, 0, this, arguments, new.target); },
falcon: function () {
var g = new THREE.Group();
g.add(P(sph(.125), mL(0x5A4A3A), 0, 0, 0));
g.add(P(sph(.08), mL(0xE6DCC2), 0, -.03, .07));
g.add(P(cone(.035, .13, 6), mL(0x2A2420), 0, -.02, .16, Math.PI / 2));
g.add(P(sph(.02), mG(0x111111, 1), -.06, .02, .09));
g.add(P(sph(.02), mG(0x111111, 1), .06, .02, .09));
return g;
},
ibis: function () {
var g = new THREE.Group();
g.add(P(sph(.105), mL(0x1C1C1E), 0, 0, 0));
g.add(P(cyl(.02, .012, .4, 6), mL(0x1C1C1E), 0, -.12, .2, 1.95));
return g;
},
cat: function () {
var g = new THREE.Group(), m = mL(0x1A1A1E);
g.add(P(sph(.12), m, 0, 0, 0));
g.add(P(cone(.045, .12, 4), m, -.07, .12, 0));
g.add(P(cone(.045, .12, 4), m, .07, .12, 0));
g.add(P(sph(.05), m, 0, -.04, .09));
g.add(P(sph(.02), mG(0x7FE08A, 1), -.05, .02, .1));
g.add(P(sph(.02), mG(0x7FE08A, 1), .05, .02, .1));
return g;
},
lion: function () {
var g = new THREE.Group();
g.add(P(new THREE.IcosahedronGeometry(.2, 1), mL(0x8A5A2A), 0, 0, -.04));
g.add(P(sph(.13), mL(0xB8883A), 0, 0, .04));
g.add(P(sph(.06), mL(0xC89A4A), 0, -.04, .14));
g.add(P(sph(.02), mG(0xE8C27A, 1), -.05, .03, .14));
g.add(P(sph(.02), mG(0xE8C27A, 1), .05, .03, .14));
return g;
},
croc: function () {
var g = new THREE.Group(), m = mL(0x3E5A34);
g.add(P(box(.2, .13, .22), m, 0, 0, 0));
g.add(P(box(.13, .08, .42), m, 0, -.03, .28));
g.add(P(sph(.022), mG(0xE8C27A, 1), -.06, .06, .06));
g.add(P(sph(.022), mG(0xE8C27A, 1), .06, .06, .06));
return g;
},
hippo: function () {
var g = new THREE.Group(), m = mL(0x7A6A6A);
g.add(P(box(.24, .22, .26), m, 0, 0, 0));
g.add(P(box(.26, .16, .18), m, 0, -.05, .18));
g.add(P(sph(.03), m, -.08, .13, -.02));
g.add(P(sph(.03), m, .08, .13, -.02));
return g;
},
elephant: function () { return __ZC(26, 1, this, arguments, new.target); },
monkey: function () { return __ZC(26, 2, this, arguments, new.target); },
goat: function () { return __ZC(26, 3, this, arguments, new.target); },
bull: function () { return __ZC(26, 4, this, arguments, new.target); },
setanimal: function () {
var g = new THREE.Group(), m = mL(0x8A4A3A);
g.add(P(box(.13, .15, .2), m, 0, 0, 0));
g.add(P(cyl(.035, .02, .3, 6), m, 0, -.08, .18, 1.9));
g.add(P(box(.05, .18, .02), m, -.05, .18, -.02));
g.add(P(box(.05, .18, .02), m, .05, .18, -.02));
return g;
},
fly: function () {
var g = new THREE.Group();
g.add(P(sph(.13), mL(0x1A1A1E), 0, 0, 0));
g.add(P(sph(.075), mG(0xA8322B, 1), -.075, .02, .08));
g.add(P(sph(.075), mG(0xA8322B, 1), .075, .02, .08));
return g;
}
};
function flameAt(g, y, s) { var f = P(cone(.07 * s, .22 * s, 6), mG(0xFFB23A, .9), 0, y, 0); f.userData.flicker = 1; g.add(f); return f; }
var HELD = {
torch: function () { var g = new THREE.Group(); g.add(P(cyl(.025, .03, .7), mL(0x5A3A22), 0, 0, 0)); flameAt(g, .44, 1); return g; },
key: function () { var g = new THREE.Group(), m = mL(GOLD); g.add(P(tor(.06, .015), m, 0, .24, 0)); g.add(P(box(.025, .4, .025), m, 0, 0, 0)); g.add(P(box(.08, .05, .02), m, .04, -.17, 0)); return g; },
trident: function () {
var g = new THREE.Group(), m = mL(0xA7AAB0);
g.add(P(cyl(.02, .02, 1.9), m, 0, .3, 0));
g.add(P(box(.3, .03, .03), m, 0, 1.2, 0));
[-0.14, 0, 0.14].forEach(function (x) { g.add(P(cone(.025, .22, 5), m, x, 1.34, 0)); });
return g;
},
thunderbolt: function () {
var g = new THREE.Group(), m = mG(0xFFE8A0, .95);
g.add(P(box(.05, .25, .05), m, 0, .12, 0, 0, 0, .4));
g.add(P(box(.05, .25, .05), m, .02, -.08, 0, 0, 0, -.4));
g.add(P(box(.05, .22, .05), m, -.01, -.26, 0, 0, 0, .4));
return g;
},
hammer: function () { var g = new THREE.Group(); g.add(P(cyl(.02, .02, .4), mL(0x5A3A22), 0, 0, 0)); g.add(P(box(.26, .14, .14), mL(0x5A5C62), 0, .22, 0)); return g; },
spear: function () { var g = new THREE.Group(); g.add(P(cyl(.018, .018, 2.1), mL(0x5A3A22), 0, .35, 0)); g.add(P(cone(.04, .22, 5), mL(0xA7AAB0), 0, 1.5, 0)); return g; },
glaive: function () { var g = new THREE.Group(); g.add(P(cyl(.02, .02, 2.1), mL(0x5A3A22), 0, .35, 0)); g.add(P(box(.12, .5, .02), mL(0xA7AAB0), .04, 1.55, 0, 0, 0, -.1)); return g; },
bow: function () { var g = new THREE.Group(); g.add(P(tor(.45, .015, Math.PI), mL(0x5A3A22), 0, 0, 0, 0, 0, Math.PI / 2)); g.add(P(box(.005, .9, .005), mL(0xE6DCC2), 0, 0, 0)); return g; },
lyre: function () {
var g = new THREE.Group(), m = mL(GOLD);
g.add(P(cyl(.015, .015, .4), m, -.1, .1, 0, 0, 0, .15));
g.add(P(cyl(.015, .015, .4), m, .1, .1, 0, 0, 0, -.15));
g.add(P(box(.26, .02, .02), m, 0, .3, 0));
g.add(P(box(.2, .08, .04), m, 0, -.1, 0));
return g;
},
harp: function () { var g = new THREE.Group(), m = mL(0x7A5A3A); g.add(P(box(.03, .5, .03), m, -.1, 0, 0)); g.add(P(box(.3, .03, .03), m, .05, .24, 0, 0, 0, -.3)); g.add(P(box(.03, .3, .03), m, .18, -.05, 0, 0, 0, .4)); return g; },
scales: function () {
var g = new THREE.Group(), m = mL(GOLD);
g.add(P(cyl(.012, .012, .5), m, 0, .1, 0));
g.add(P(box(.44, .015, .015), m, 0, .34, 0));
g.add(P(cyl(.07, .07, .01, 12), m, -.21, .2, 0));
g.add(P(cyl(.07, .07, .01, 12), m, .21, .2, 0));
return g;
},
ankh: function () { var g = new THREE.Group(), m = mL(GOLD); g.add(P(tor(.05, .014), m, 0, .12, 0)); g.add(P(box(.03, .2, .02), m, 0, -.04, 0)); g.add(P(box(.14, .03, .02), m, 0, .05, 0)); return g; },
caduceus: function () {
var g = new THREE.Group(), m = mL(GOLD);
g.add(P(cyl(.015, .015, 1), m, 0, .2, 0));
for (var i = 0; i < 3; i++)
g.add(P(tor(.05, .012), mL(0x3F7A3A), 0, .05 + i * .16, 0, Math.PI / 2, 0, i * .8));
g.add(P(box(.24, .04, .01), mL(0xE8E4DA), 0, .72, 0));
return g;
},
staff: function () { var g = new THREE.Group(); g.add(P(cyl(.025, .03, 1.9), mL(0x6B4A32), 0, .3, 0)); return g; },
scepter: function () { var g = new THREE.Group(); g.add(P(cyl(.018, .018, 1.1), mL(GOLD), 0, .15, 0)); g.add(P(sph(.05), mL(GOLD), 0, .72, 0)); return g; },
sword: function () { var g = new THREE.Group(); g.add(P(box(.06, .8, .015), mL(0xB8BCC4), 0, .45, 0)); g.add(P(box(.2, .03, .04), mL(GOLD), 0, .04, 0)); g.add(P(cyl(.018, .018, .14), mL(0x3A2A1E), 0, -.05, 0)); return g; },
dagger: function () { var g = new THREE.Group(); g.add(P(box(.04, .3, .012), mL(0xB8BCC4), 0, .18, 0)); g.add(P(box(.12, .02, .03), mL(GOLD), 0, .03, 0)); return g; },
machete: function () { var g = new THREE.Group(); g.add(P(box(.07, .55, .012), mL(0xA7AAB0), .02, .3, 0, 0, 0, -.08)); g.add(P(cyl(.018, .018, .14), mL(0x3A2A1E), 0, -.05, 0)); return g; },
axe: function () { var g = new THREE.Group(); g.add(P(cyl(.018, .018, .6), mL(0x5A3A22), 0, .1, 0)); g.add(P(box(.3, .16, .02), mL(0xA7AAB0), 0, .36, 0)); return g; },
shield: function () { var g = new THREE.Group(); g.add(P(cyl(.34, .34, .03, 20), mL(0x9A6A3A), 0, 0, 0, Math.PI / 2)); g.add(P(sph(.05), mL(GOLD), 0, 0, .03)); return g; },
mirror: function () { var g = new THREE.Group(); g.add(P(cyl(.1, .1, .012, 18), mL(0xDDE3EC), 0, .12, 0, Math.PI / 2)); g.add(P(cyl(.012, .012, .14), mL(GOLD), 0, -.02, 0)); return g; },
book: function () { var g = new THREE.Group(); g.add(P(box(.24, .32, .05), mL(0x6B2A22), 0, 0, 0)); return g; },
pen: function () { var g = new THREE.Group(); g.add(P(cyl(.008, .004, .24), mL(0x2A2420), 0, 0, 0)); return g; },
lotus: function () { var g = new THREE.Group(); for (var i = 0; i < 6; i++) {
var a = i * 1.047;
g.add(P(cone(.035, .1, 4), mL(0xE8A0B8), Math.cos(a) * .04, .03, Math.sin(a) * .04, Math.cos(a) * .5, 0, Math.sin(a) * .5));
} g.add(P(sph(.03), mL(0xE8C27A), 0, .02, 0)); return g; },
wheat: function () { var g = new THREE.Group(); for (var i = 0; i < 5; i++)
g.add(P(cyl(.006, .006, .5), mL(0xC7A043), (i - 2) * .015, .1, 0, 0, 0, (i - 2) * .08)); g.add(P(box(.07, .14, .03), mL(0xD4B83C), 0, .34, 0)); return g; },
cup: function () { var g = new THREE.Group(); g.add(P(cyl(.07, .03, .12, 12), mL(GOLD), 0, .06, 0)); g.add(P(cyl(.01, .01, .06), mL(GOLD), 0, -.03, 0)); return g; },
apple: function () { var g = new THREE.Group(); g.add(P(sph(.05), mL(0xC7A043), 0, 0, 0)); return g; },
pomegranate: function () { var g = new THREE.Group(); g.add(P(sph(.055), mL(0xA8322B), 0, 0, 0)); g.add(P(cone(.02, .03, 5), mL(0xA8322B), 0, .06, 0)); return g; },
peach: function () { var g = new THREE.Group(); g.add(P(sph(.055), mL(0xE8A088), 0, 0, 0)); return g; },
crookflail: function () {
var g = new THREE.Group();
g.add(P(cyl(.015, .015, .45), mL(GOLD), -.05, 0, 0, 0, 0, .35));
g.add(P(tor(.04, .012, Math.PI), mL(GOLD), -.13, .22, 0));
g.add(P(cyl(.015, .015, .4), mL(0x2F5E9E), .05, 0, 0, 0, 0, -.35));
return g;
},
fan: function () { var g = new THREE.Group(); g.add(P(cyl(.18, .18, .01, 16, 1), mL(0xE8E4DA), 0, .12, 0, Math.PI / 2)); g.add(P(cyl(.012, .012, .16), mL(0x5A3A22), 0, -.04, 0)); return g; },
gourd: function () { var g = new THREE.Group(), m = mL(0xB8945A); g.add(P(sph(.08), m, 0, 0, 0)); g.add(P(sph(.055), m, 0, .11, 0)); return g; },
vase: function () { var g = new THREE.Group(); g.add(P(sph(.06), mL(0xE8E4DA), 0, 0, 0)); g.add(P(cyl(.02, .03, .1), mL(0xE8E4DA), 0, .08, 0)); g.add(P(cyl(.004, .004, .2), mL(0x3F7A3A), 0, .2, 0, 0, 0, .3)); return g; },
flute: function () { var g = new THREE.Group(); g.add(P(cyl(.015, .015, .5), mL(0x8A6A3A), 0, 0, 0, 0, 0, Math.PI / 2)); return g; },
drum: function () { var g = new THREE.Group(); g.add(P(cyl(.08, .08, .14, 14), mL(0x8A5A3A), 0, 0, 0)); return g; },
conch: function () { var g = new THREE.Group(); g.add(P(cone(.06, .18, 8), mL(0xF2EEE6), 0, 0, 0, 0, 0, 1.2)); return g; },
discus: function () { var g = new THREE.Group(); var r = P(tor(.12, .02), mG(0xE8C27A, .95), 0, .1, 0); r.userData.spin = 1; g.add(r); return g; },
club: function () { var g = new THREE.Group(); g.add(P(cyl(.025, .03, .7), mL(0x6B4A32), 0, 0, 0)); g.add(P(sph(.09), mL(GOLD), 0, .4, 0)); return g; },
noose: function () { var g = new THREE.Group(); g.add(P(tor(.1, .012), mL(0xB8945A), 0, 0, 0)); return g; },
skull: function () { var g = new THREE.Group(); g.add(P(sph(.07), mL(0xE6DCC2), 0, 0, 0)); return g; },
wheel: function () { var g = new THREE.Group(), m = mL(GOLD); g.add(P(tor(.2, .02), m, 0, 0, 0)); for (var i = 0; i < 4; i++)
g.add(P(box(.4, .015, .015), m, 0, 0, 0, 0, 0, i * .785)); return g; },
horn: function () { var g = new THREE.Group(); g.add(P(cone(.05, .4, 8), mL(GOLD), 0, .1, 0, 0, 0, .4)); return g; },
castanets: function () { var g = new THREE.Group(); g.add(P(box(.06, .18, .02), mL(0x6B4A32), -.02, 0, 0)); g.add(P(box(.06, .18, .02), mL(0x6B4A32), .02, 0, 0)); return g; },
flowerbasket: function () { var g = new THREE.Group(); g.add(P(cyl(.1, .07, .1, 10), mL(0x8A6A3A), 0, 0, 0)); g.add(P(sph(.05), mL(0xE8A0B8), -.03, .07, 0)); g.add(P(sph(.04), mL(0xD4B83C), .04, .07, .02)); return g; },
coins: function () { var g = new THREE.Group(); for (var i = 0; i < 4; i++)
g.add(P(cyl(.04, .04, .01, 12), mL(GOLD), (i % 2) * .02, i * .012, 0)); return g; },
fish: function () { var g = new THREE.Group(); g.add(P(sph(.07), mL(0xC0392B), 0, 0, 0)); g.children[0].scale.set(2, 1, .5); g.add(P(cone(.05, .08, 4), mL(0xC0392B), -.17, 0, 0, 0, 0, Math.PI / 2)); return g; },
hook: function () { var g = new THREE.Group(); g.add(P(tor(.1, .02, Math.PI * 1.3), mL(0xE6DCC2), 0, 0, 0)); return g; },
sickle: function () { var g = new THREE.Group(); g.add(P(tor(.16, .015, Math.PI), mL(0xA7AAB0), 0, .15, 0)); g.add(P(cyl(.015, .015, .2), mL(0x5A3A22), -.16, .05, 0)); return g; }
};
var AT_FEET = { anvil: 1, cauldron: 1 };
var ON_SHOULDER = { owl: 1, raven: 1, ravens: 1, dove: 1, eagle: 1, bird: 1 };
var BESIDE = { dog: 1, dogs: 1, wolf: 1, wolves: 1, cat: 1, cats: 1, horse: 1, stag: 1, goat: 1, boar: 1, lion: 1, rat: 1, bull: 1, cow: 1, swan: 1, peacock: 1, rabbit: 1, serpent: 1, spider: 1 };
function bird(col, s) {
var g = new THREE.Group();
g.add(P(sph(.07 * s), mL(col), 0, 0, 0));
g.add(P(sph(.045 * s), mL(col), 0, .07 * s, .04 * s));
g.add(P(cone(.015 * s, .04 * s, 4), mL(0x3A3020), 0, .06 * s, .09 * s, Math.PI / 2));
return g;
}
function quad(col, s, extra) { return __ZC(26, 5, this, arguments, new.target); }
function companion(k) { return __ZC(26, 6, this, arguments, new.target); }
function buildDeity(spec, f) { return __ZC(26, 7, this, arguments, new.target); }
function addAura(g, kind) { return __ZC(26, 8, this, arguments, new.target); }
function buildDragon(spec, f, icons) { return __ZC(26, 9, this, arguments, new.target); }
