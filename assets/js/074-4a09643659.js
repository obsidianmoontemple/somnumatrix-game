/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var INT_X0 = -40000, INT = null, intCool = 0, INT_H = 3.2;
var STAIR_RISE = 3.7, STAIR_RUN = 4.2;
var WOOD = 0x6B4A32, DARKWOOD = 0x3A2A1E, CLOTH = 0x7A2A2A, WHITEISH = 0xE8E4DA, METAL = 0x8A8C92;
function F(parts) { var g = new THREE.Group(); parts.forEach(function (p) { g.add(p); }); return g; }
var FURN = {
bed: function () { return F([P(box(1.6, .45, 2.1), mL(WOOD), 0, .25, 0), P(box(1.5, .2, 2), mL(WHITEISH), 0, .55, 0), P(box(1.5, .12, 1.2), mL(0x5E7A9E), 0, .66, .35), P(box(1.6, 1, .1), mL(WOOD), 0, .7, -1.05), P(box(.5, .12, .35), mL(0xF2EEE6), -.4, .7, -.75), P(box(.5, .12, .35), mL(0xF2EEE6), .4, .7, -.75)]); },
sofa: function () { return F([P(box(2.2, .45, .9), mL(0x5E3A3A), 0, .25, 0), P(box(2.2, .7, .25), mL(0x5E3A3A), 0, .7, -.35), P(box(.25, .6, .9), mL(0x5E3A3A), -1.1, .4, 0), P(box(.25, .6, .9), mL(0x5E3A3A), 1.1, .4, 0)]); },
armchair: function () { return F([P(box(.9, .45, .9), mL(0x3F5A4A), 0, .25, 0), P(box(.9, .8, .2), mL(0x3F5A4A), 0, .75, -.35), P(box(.18, .55, .9), mL(0x3F5A4A), -.4, .4, 0), P(box(.18, .55, .9), mL(0x3F5A4A), .4, .4, 0)]); },
table: function () { return F([P(box(1.4, .06, .9), mL(WOOD), 0, .76, 0), P(box(.07, .74, .07), mL(WOOD), -.62, .37, -.38), P(box(.07, .74, .07), mL(WOOD), .62, .37, -.38), P(box(.07, .74, .07), mL(WOOD), -.62, .37, .38), P(box(.07, .74, .07), mL(WOOD), .62, .37, .38)]); },
longtable: function () {
var g = F([P(box(4.4, .08, 1.1), mL(DARKWOOD), 0, .78, 0)]);
[-2, 2].forEach(function (x) { g.add(P(box(.12, .76, .9), mL(DARKWOOD), x, .38, 0)); });
for (var i = 0; i < 5; i++)
[-1, 1].forEach(function (s) { var c = FURN.chair(); c.position.set(-1.8 + i * .9, 0, s * .8); c.rotation.y = s > 0 ? Math.PI : 0; g.add(c); });
return g;
},
chair: function () { return F([P(box(.45, .05, .45), mL(WOOD), 0, .46, 0), P(box(.45, .5, .05), mL(WOOD), 0, .72, -.2), P(box(.04, .46, .04), mL(WOOD), -.19, .23, -.19), P(box(.04, .46, .04), mL(WOOD), .19, .23, -.19), P(box(.04, .46, .04), mL(WOOD), -.19, .23, .19), P(box(.04, .46, .04), mL(WOOD), .19, .23, .19)]); },
runner: function () {
return F([P(box(2.4, .03, 13), mL(0x4E1216), 0, .02, 0), P(box(2.05, .035, 12.6), mL(0x6E1A20), 0, .025, 0),
P(box(.1, .04, 12.4), mL(0x8A6A2A), -.85, .03, 0), P(box(.1, .04, 12.4), mL(0x8A6A2A), .85, .03, 0)]);
},
rug: function () { return F([P(box(2.6, .02, 1.8), mL(CLOTH), 0, .02, 0), P(box(2.2, .025, 1.4), mL(0xC7A043), 0, .02, 0)]); },
fireplace: function () {
var g = F([P(box(1.9, 1.3, .5), mL(0x8A7A6A), 0, .65, 0), P(box(1.1, .8, .3), mL(0x141210), 0, .45, .12), P(box(2.1, .1, .6), mL(0x6A5A4A), 0, 1.35, 0)]);
var fl = P(cone(.22, .5, 6), mG(0xFF9A3A, .9), 0, .35, .15);
fl.userData.flicker = 1;
g.add(fl);
return g;
},
bookshelf: function () {
var g = F([P(box(1.6, 2.2, .4), mL(DARKWOOD), 0, 1.1, 0)]);
for (var r = 0; r < 4; r++)
for (var b = 0; b < 9; b++)
g.add(P(box(.14, .36, .28), mL([0x6A2A22, 0x2F4A6E, 0x3F5A3A, 0xA8883A, 0x5E3A5E][(r * 9 + b) % 5]), -.64 + b * .16, .3 + r * .52, .05));
return g;
},
lamp: function () { var g = F([P(cyl(.04, .12, 1.4, 8), mL(METAL), 0, .7, 0), P(cone(.28, .32, 12), mL(0xE6D8B8), 0, 1.5, 0)]); g.add(P(sph(.08), mG(0xFFE8B0, 1), 0, 1.38, 0)); return g; },
stove: function () { return F([P(box(.8, .9, .7), mL(0xE6E2DA), 0, .45, 0), P(box(.7, .02, .6), mL(0x1A1A1E), 0, .91, 0), P(box(.6, .4, .02), mL(0x1A1A1E), 0, .45, .36)]); },
counter: function () { return F([P(box(2.4, .88, .65), mL(0xD8D0C0), 0, .44, 0), P(box(2.44, .05, .7), mL(0x3A3A3E), 0, .9, 0)]); },
fridge: function () { return F([P(box(.75, 1.8, .7), mL(0xF2F0EA), 0, .9, 0), P(box(.03, .4, .04), mL(METAL), .3, 1.2, .36)]); },
sink: function () { return F([P(box(.7, .85, .5), mL(0xF2F0EA), 0, .42, 0), P(box(.5, .05, .35), mL(0x9AA4AE), 0, .86, .02), P(cyl(.02, .02, .25, 6), mL(METAL), 0, 1, -.15)]); },
bathtub: function () { return F([P(box(1.7, .55, .8), mL(0xF2F0EA), 0, .3, 0), P(box(1.5, .05, .6), mL(0x9FC8D8), 0, .52, 0)]); },
wardrobe: function () { return F([P(box(1.3, 2, .6), mL(DARKWOOD), 0, 1, 0), P(box(.02, 1.8, .02), mL(0x1A1414), 0, 1, .31), P(sph(.03), mL(GOLD), -.08, 1.1, .32), P(sph(.03), mL(GOLD), .08, 1.1, .32)]); },
desk: function () { return F([P(box(1.4, .06, .7), mL(WOOD), 0, .76, 0), P(box(.4, .74, .66), mL(WOOD), -.5, .37, 0), P(box(.07, .74, .07), mL(WOOD), .62, .37, -.28), P(box(.07, .74, .07), mL(WOOD), .62, .37, .28), P(box(.3, .02, .22), mL(WHITEISH), .2, .8, 0)]); },
piano: function () { return F([P(box(1.5, 1.1, .6), mL(0x141216), 0, .8, 0), P(box(1.4, .08, .2), mL(WHITEISH), 0, .78, .38), P(box(.1, .3, .1), mL(0x141216), -.6, .12, .2), P(box(.1, .3, .1), mL(0x141216), .6, .12, .2)]); },
clock: function () {
var g = F([P(box(.5, 2, .35), mL(DARKWOOD), 0, 1, 0), P(cyl(.18, .18, .03, 16), mL(0xF2EEE6), 0, 1.6, .19, Math.PI / 2)]);
var hand = P(box(.015, .14, .01), mL(0x141414), 0, 1.62, .21);
hand.userData.spin = 1;
g.add(hand);
return g;
},
painting: function () { return F([P(box(1.1, .8, .05), mL(GOLD), 0, 1.7, 0), P(box(.95, .65, .02), mL([0x3F5A6E, 0x6A4A3A, 0x2F5A3A][Math.floor(Math.random() * 3)]), 0, 1.7, .03)]); },
wallmirror: function () { return F([P(box(.8, 1.4, .05), mL(GOLD), 0, 1.6, 0), P(box(.68, 1.28, .02), mL(0xDDE3EC), 0, 1.6, .03)]); },
chandelier: function () {
var g = F([P(cyl(.01, .01, .8, 4), mL(GOLD), 0, INT_H - .4, 0), P(tor(.45, .03), mL(GOLD), 0, INT_H - .85, 0, Math.PI / 2)]);
for (var i = 0; i < 6; i++) {
var a = i * 1.047;
g.add(P(sph(.06), mG(0xFFE8B0, 1), Math.cos(a) * .45, INT_H - .75, Math.sin(a) * .45));
}
return g;
},
candles: function () {
var g = new THREE.Group();
for (var i = 0; i < 5; i++) {
g.add(P(cyl(.03, .03, .25 + i % 3 * .08, 6), mL(0xF2EEE6), (i - 2) * .12, .13, ((i * 7) % 3) * .06));
var fl = P(cone(.02, .06, 5), mG(0xFFB23A, 1), (i - 2) * .12, .3 + i % 3 * .08, ((i * 7) % 3) * .06);
fl.userData.flicker = 1;
g.add(fl);
}
return g;
},
pew: function () { return F([P(box(3.4, .08, .5), mL(DARKWOOD), 0, .46, 0), P(box(3.4, .6, .06), mL(DARKWOOD), 0, .8, -.25), P(box(.08, .46, .5), mL(DARKWOOD), -1.66, .23, 0), P(box(.08, .46, .5), mL(DARKWOOD), 1.66, .23, 0)]); },
altarinside: function () { var g = F([P(box(2.2, 1, .9), mL(0xE6E0D2), 0, .5, 0), P(box(2.3, .05, 1), mL(0xA8322B), 0, 1.02, 0)]); var c = FURN.candles(); c.position.set(0, 1.04, 0); g.add(c); return g; },
pulpit: function () { return F([P(box(.9, 1.2, .7), mL(DARKWOOD), 0, .6, 0), P(box(.95, .05, .5), mL(DARKWOOD), 0, 1.25, .1, -.3)]); },
throneseat: function () { return F([P(box(1.1, .6, .9), mL(0x6A1A1A), 0, .5, 0), P(box(1.1, 2.2, .2), mL(GOLD), 0, 1.3, -.4), P(box(.15, .5, .9), mL(GOLD), -.55, .9, 0), P(box(.15, .5, .9), mL(GOLD), .55, .9, 0), P(box(1.4, .25, 1.4), mL(0x5A4A3A), 0, .12, 0)]); },
shelfgoods: function () { var g = F([P(box(2.4, 1.8, .45), mL(0xB8B4AC), 0, .9, 0)]); for (var r = 0; r < 3; r++)
for (var b = 0; b < 8; b++)
g.add(P(box(.2, .26, .25), mL([0xC0392B, 0xE8A04A, 0x2F5E9E, 0x3F7A3A][(r + b) % 4]), -1 + b * .28, .35 + r * .55, .08)); return g; },
till: function () { return F([P(box(2, 1, .7), mL(WOOD), 0, .5, 0), P(box(.4, .3, .35), mL(0x2A2C30), .5, 1.15, 0)]); },
blackboard: function () { return F([P(box(3, 1.3, .06), mL(0x6B4A32), 0, 1.6, 0), P(box(2.8, 1.12, .02), mL(0x1E3A2A), 0, 1.6, .04)]); },
schooldesk: function () { var g = FURN.desk(); g.scale.set(.7, .85, .8); var c = FURN.chair(); c.position.z = .55; c.rotation.y = Math.PI; g.add(c); return g; },
hospitalbed: function () { return __ZC(74, 0, this, arguments, new.target); },
crates: function () { return F([P(box(1, 1, 1), mL(0xA88A5A), 0, .5, 0), P(box(1, 1, 1), mL(0x9A7A4A), 1.05, .5, .1), P(box(.9, .9, .9), mL(0xA88A5A), .5, 1.45, 0, 0, .3)]); },
barrel: function () { return F([P(cyl(.4, .4, 1, 12), mL(0x6B4A32), 0, .5, 0), P(tor(.4, .03), mL(METAL), 0, .2, 0, Math.PI / 2), P(tor(.4, .03), mL(METAL), 0, .8, 0, Math.PI / 2)]); },
machine: function () { var g = F([P(box(2, 1.6, 1.4), mL(0x5A6A5E), 0, .8, 0), P(cyl(.4, .4, .3, 12), mL(METAL), .6, 1.2, .72, Math.PI / 2), P(box(.4, .3, .05), mG(0x6AF08A, 1), -.5, 1.2, .71)]); return g; },
benchin: function () { return F([P(box(2.2, .08, .5), mL(WOOD), 0, .45, 0), P(box(.1, .45, .45), mL(WOOD), -1, .22, 0), P(box(.1, .45, .45), mL(WOOD), 1, .22, 0)]); },
judgebench: function () { return F([P(box(3.4, 1.4, 1), mL(DARKWOOD), 0, .7, 0), P(box(3.6, .1, 1.1), mL(DARKWOOD), 0, 1.45, 0), P(box(1.2, .5, 1.2), mL(0x5A4A3A), 0, .25, -1)]); },
banner: function () { return F([P(box(.06, .06, 1.4), mL(GOLD), 0, INT_H - .3, 0, 0, Math.PI / 2), P(box(1.1, 1.8, .03), mL(0x6A1A2A), 0, INT_H - 1.3, 0)]); },
plant: function () { return F([P(cyl(.22, .18, .4, 10), mL(0x8A5A3A), 0, .2, 0), P(new THREE.IcosahedronGeometry(.45, 0), mL(0x3F7A3A), 0, .8, 0)]); },
tv: function () { return F([P(box(1.2, .5, .4), mL(DARKWOOD), 0, .25, 0), P(box(1.1, .65, .05), mL(0x141416), 0, .85, 0), P(box(1, .55, .02), mG(0x3A6A8A, 1), 0, .85, .03)]); },
crib: function () { var g = F([P(box(1.2, .08, .7), mL(WHITEISH), 0, .5, 0)]); for (var i = 0; i < 9; i++) {
g.add(P(box(.03, .6, .03), mL(WHITEISH), -.55 + i * .137, .8, -.34));
g.add(P(box(.03, .6, .03), mL(WHITEISH), -.55 + i * .137, .8, .34));
} return g; },
toys: function () { return F([P(box(.3, .3, .3), mL(0xC0392B), 0, .15, 0), P(box(.25, .25, .25), mL(0x2F5E9E), .35, .12, .1), P(sph(.14), mL(0xD4B83C), -.3, .14, .2)]); },
cage: function () {
var g = new THREE.Group();
for (var i = 0; i < 12; i++) {
var a = i * .523;
g.add(P(cyl(.015, .015, 1.4, 4), mL(METAL), Math.cos(a) * .5, .7, Math.sin(a) * .5));
}
g.add(P(cyl(.52, .52, .05, 16), mL(METAL), 0, 1.4, 0));
g.add(P(cyl(.52, .52, .05, 16), mL(METAL), 0, .02, 0));
return g;
},
sarcophagus: function () { return F([P(box(1, .9, 2.3), mL(0x8A8478), 0, .45, 0), P(box(1.1, .15, 2.4), mL(0x9A9488), 0, .95, 0)]); },
stairs: function () { return __ZC(74, 1, this, arguments, new.target); },
spiralstair: function () {
var g = F([P(cyl(.15, .15, INT_H * 2.5, 8), mL(METAL), 0, INT_H * 1.25, 0)]);
for (var i = 0; i < 22; i++) {
var a = i * .42, st = P(box(1.2, .08, .35), mL(WOOD), Math.cos(a) * .7, .2 + i * .33, Math.sin(a) * .7);
st.rotation.y = -a;
g.add(st);
}
return g;
},
counterbank: function () { var g = F([P(box(5, 1.1, .7), mL(DARKWOOD), 0, .55, 0)]); for (var i = 0; i < 6; i++)
g.add(P(box(.03, .9, .03), mL(GOLD), -2.3 + i * .9, 1.55, 0)); g.add(P(box(5, .05, .1), mL(GOLD), 0, 2, 0)); return g; },
vaultround: function () { return F([P(cyl(1.2, 1.2, .3, 24), mL(0x6A6C72), 0, 1.3, 0, Math.PI / 2), P(tor(.5, .06), mL(0xA7AAB0), 0, 1.3, .2), P(box(.8, .08, .08), mL(0xA7AAB0), 0, 1.3, .2)]); },
monitor: function () {
return F([P(box(.5, .9, .35), mL(0x2A2E36), 0, .45, 0), P(box(.62, .42, .04), mL(0x14171C), 0, 1.02, -.16),
P(box(.54, .34, .02), mG(0x6AC8FF, .95), 0, 1.02, -.14)]);
},
servertower: function () {
var g = F([P(box(.6, 1.9, .6), mL(0x1C1E22), 0, .95, 0)]);
var cols = [0x4AE8FF, 0x6AF0C4, 0xFFD08A];
for (var r = 0; r < 8; r++) {
g.add(P(box(.06, .06, .02), mG(cols[r % 3], 1), -.2 + (r % 2) * .4, .28 + Math.floor(r / 2) * .42, .31));
}
return g;
},
wallscreen: function () { return F([P(box(1.6, .9, .06), mL(0x14171C), 0, 1.7, 0), P(box(1.42, .74, .02), mG(0x6AC8FF, .9), 0, 1.7, .035)]); },
maptable: function () {
return F([P(cyl(.85, .7, .74, 14), mL(DARKWOOD), 0, .37, 0), P(cyl(.95, .95, .06, 24), mL(0x1C1E22), 0, .77, 0),
P(cyl(.82, .82, .02, 24), mG(0x6AC8FF, .85), 0, .8, 0)]);
}
};
var SOLIDFURN = { bed: 1, sofa: 1, table: 1, longtable: 1, counter: 1, piano: 1, wardrobe: 1, bookshelf: 1, fireplace: 1, stove: 1, fridge: 1, bathtub: 1, desk: 1, pew: 1, altarinside: 1,
throneseat: 1, shelfgoods: 1, till: 1, hospitalbed: 1, crates: 1, machine: 1, judgebench: 1, counterbank: 1, sarcophagus: 1, servertower: 1, maptable: 1 };
var ROOMFURN = {
hallway: ["rug", "painting", "plant"], living: ["sofa", "armchair", "rug", "fireplace", "lamp", "bookshelf", "painting", "table"],
kitchen: ["counter", "stove", "fridge", "sink", "table", "chair", "chair"], bedroom: ["bed", "wardrobe", "lamp", "rug", "wallmirror"],
bathroom: ["bathtub", "sink", "wallmirror"],
lobbybig: ["till", "plant", "armchair", "armchair", "painting", "chandelier"], study: ["desk", "chair", "bookshelf", "bookshelf", "lamp"], dining: ["longtable", "chandelier", "painting"],
nursery: ["crib", "toys", "rug", "lamp"], attic: ["crates", "barrel", "wardrobe"], basement: ["crates", "barrel", "machine"], ballroom: ["chandelier", "chandelier", "piano"],
office: ["desk", "chair", "desk", "chair", "plant", "bookshelf"], cell: ["bed", "sink"], lobby: ["till", "plant", "armchair", "painting"],
throneroom: ["throneseat", "banner", "banner", "chandelier", "rug"], classroom: ["blackboard", "schooldesk", "schooldesk", "schooldesk", "schooldesk"],
techoffice: ["desk", "monitor", "chair", "wallscreen", "desk", "monitor", "chair", "servertower", "plant", "bookshelf"]
};
var ROOMNAME = { chapel: "a side chapel", vestry: "the vestry", meeting: "the meeting room", ward: "a ward",
chamber: "a chamber", kitchenette: "the kitchen", suite: "a suite", archive: "the archive", hallway: "the hallway", living: "the living room", kitchen: "the kitchen", bedroom: "the bedroom", bathroom: "the bathroom", study: "the study",
dining: "the dining room", nursery: "the nursery", attic: "the attic", basement: "the basement", ballroom: "the ballroom", office: "the office", cell: "a cell",
lobby: "the lobby", throneroom: "the throne room", classroom: "the classroom", techoffice: "the office" };
var PLANS = {
house: { mode: "rooms", rooms: ["living", "kitchen", "bedroom", "bathroom", "dining", "bedroom"], wall: 0xE6DCC8, floor: "wood" },
cottage: { mode: "rooms", rooms: ["living", "kitchen", "bedroom"], wall: 0xE8E0CC, floor: "wood" },
apartment: { mode: "rooms", rooms: ["living", "kitchen", "bedroom", "bathroom"], wall: 0xDCD8D0, floor: "wood" },
motel: { mode: "rooms", rooms: ["lobby", "bedroom", "bedroom", "bedroom", "bathroom"], wall: 0xD8C8A8, floor: "carpet" },
hotel: { mode: "mixed", ground: "lobby", w: 20, d: 18, upper: ["bedroom", "bedroom", "suite", "bathroom", "bedroom", "bedroom"],
wall: 0xE0D4BC, floor: "carpet", lift: true },
institution: { mode: "mixed", ground: "lobby", w: 18, d: 18, upper: ["cell", "cell", "cell", "office", "bathroom"],
wall: 0xC8CCC8, floor: "tile", lift: true },
somnucortower: { mode: "mixed", ground: "lobby", w: 26, d: 22, upper: ["techoffice", "meeting", "techoffice", "kitchenette", "archive", "bathroom"],
wall: 0xD8E4EE, floor: "tile", lift: true, locked: { level: 11, what: "the penthouse" } },
skyscraper: { mode: "mixed", ground: "lobby", w: 22, d: 18, upper: ["office", "office", "meeting", "kitchenette", "bathroom", "archive"],
wall: 0xDCDCD8, floor: "carpet", lift: true },
toadstoolhouse: { mode: "rooms", rooms: ["living", "bedroom"], wall: 0xE8D8C0, floor: "wood" },
church: { mode: "hall", w: 14, d: 26, fill: "church", wall: 0xD8D0C0, floor: "stone", side: ["chapel", "vestry"] },
cathedral: { mode: "hall", w: 22, d: 40, fill: "church", wall: 0xCCC4B4, floor: "marble", h: 9,
side: ["chapel", "chapel", "vestry", "chapel", "archive"] },
library: { mode: "hall", w: 18, d: 22, fill: "library", wall: 0xD8CCB0, floor: "wood", side: ["archive", "office"] },
school: { mode: "mixed", ground: "school", w: 18, d: 16, upper: ["classroom", "classroom", "office", "bathroom"],
wall: 0xE0DCC8, floor: "tile" },
shop: { mode: "hall", w: 10, d: 12, fill: "shop", wall: 0xE8E4D8, floor: "tile" },
gasstation: { mode: "hall", w: 8, d: 8, fill: "shop", wall: 0xE8E4D8, floor: "tile" },
hospital: { mode: "mixed", ground: "hospital", w: 18, d: 22, upper: ["ward", "ward", "office", "bathroom"],
wall: 0xE8EEF0, floor: "tile", lift: true },
bank: { mode: "hall", w: 16, d: 16, fill: "bank", wall: 0xE6DCC8, floor: "marble" },
station: { mode: "hall", w: 18, d: 14, fill: "station", wall: 0xD8D4C8, floor: "tile" },
courthouse: { mode: "hall", w: 16, d: 20, fill: "court", wall: 0xDCD4C0, floor: "wood" },
factory: { mode: "hall", w: 24, d: 24, fill: "works", wall: 0x9A9890, floor: "stone", h: 6 },
warehouse: { mode: "hall", w: 22, d: 22, fill: "works", wall: 0xA8A49A, floor: "stone", h: 6 },
barn: { mode: "hall", w: 12, d: 16, fill: "barn", wall: 0x8A5A3A, floor: "wood", h: 5 },
garage: { mode: "hall", w: 8, d: 8, fill: "works", wall: 0xA8A49A, floor: "stone" },
shed: { mode: "hall", w: 5, d: 5, fill: "barn", wall: 0x8A6A4A, floor: "wood" },
castle: { mode: "hall", w: 18, d: 28, fill: "castle", wall: 0x8A847A, floor: "stone", h: 7,
side: ["chamber", "kitchen", "study", "chamber"] },
cloudpalace: { mode: "hall", w: 22, d: 30, fill: "castle", wall: 0xF2F2F6, floor: "marble", h: 8 },
merpalace: { mode: "hall", w: 22, d: 30, fill: "castle", wall: 0xE8C8B8, floor: "marble", h: 8 },
icepalace: { mode: "hall", w: 22, d: 30, fill: "castle", wall: 0xBFE4F4, floor: "marble", h: 8 },
faethrone: { mode: "hall", w: 14, d: 18, fill: "castle", wall: 0x3A5A3A, floor: "wood", h: 6 },
tower: { mode: "hall", w: 10, d: 10, fill: "tower", wall: 0x9A948A, floor: "stone", h: 8 },
lighthouse: { mode: "hall", w: 8, d: 8, fill: "tower", wall: 0xE8E4DA, floor: "stone", h: 8 },
windmill: { mode: "hall", w: 8, d: 8, fill: "tower", wall: 0xD8CCB0, floor: "wood", h: 6 },
crypt: { mode: "hall", w: 10, d: 16, fill: "crypt", wall: 0x6E6A64, floor: "stone" },
tomb: { mode: "hall", w: 8, d: 10, fill: "crypt", wall: 0x7A746A, floor: "stone" },
catacomb: { mode: "hall", w: 8, d: 30, fill: "crypt", wall: 0x6E6A64, floor: "stone" },
hollowtree: { mode: "hall", w: 6, d: 6, fill: "cozy", wall: 0x6B4A32, floor: "wood" },
igloo: { mode: "hall", w: 6, d: 6, fill: "cozy", wall: 0xF2F6FA, floor: "carpet" },
bedouintent: { mode: "hall", w: 10, d: 7, fill: "cozy", wall: 0x4A3A2A, floor: "carpet" },
shanty: { mode: "hall", w: 5, d: 5, fill: "cozy", wall: 0x6E6A62, floor: "wood" },
falloutshelter: { mode: "rooms", rooms: ["lobby", "bedroom", "kitchen", "basement"], wall: 0x9A9A92, floor: "tile" },
bunker: { mode: "rooms", rooms: ["lobby", "office", "basement"], wall: 0x9A9A92, floor: "tile" }
};
var DEFAULT_PLAN = { mode: "hall", w: 8, d: 8, fill: "cozy", wall: 0xDCD4C4, floor: "wood" };
var NOT_INSIDE = { statue: 1, monument: 1, obelisk: 1, glyphobelisk: 1, altar: 1, altarseasonal: 1, ofrenda: 1, torii: 1, paifang: 1,
moongate: 1, monolith: 1, trebuchet: 1, ferriswheel: 1, carousel: 1, pergola: 1, wardrobedoor: 1, celestialstair: 1, goldengate: 1,
bonegate: 1, sandpillars: 1, brokenhighway: 1, rainbowbridge: 1, hubdoor: 1, hubmirror: 1, signboard: 1, plinth: 1, hubpillar: 1,
maptable: 1, groundpad: 1, lawn: 1, snowfield: 1, blossomground: 1, leaffall: 1, pier: 1, shrine: 1, stargate: 1, spaceelevator: 1,
ruin: 1, shipwreck: 1, sunkenruins: 1, collapsedtower: 1, volcanolair: 1, forcefield: 1, landinglights: 1, solarfarm: 1, satdish: 1 };
function planOf(spec) { return __ZC(74, 2, this, arguments, new.target); }
var STOREYS = { somnucortower: 12, house: 2, cottage: 1, apartment: 3, hotel: 3, motel: 2, institution: 2, skyscraper: 6, castle: 2, tower: 3,
lighthouse: 3, windmill: 2, hanok: 1, machiya: 2, izba: 1, hacienda: 2, riad: 2, longhouse: 1, stilthouse: 1, cycladic: 2,
pueblo: 2, shop: 1, school: 2, hospital: 2, library: 2, bank: 2, courthouse: 2, factory: 1, warehouse: 1, barn: 1 };
function levelsOf(spec) {
var a = spec.attrs || {}, n = a.lv || STOREYS[spec.archetype] || 1;
if ((spec.inside || {}).endless)
n = Math.max(n, 3);
return Math.max(1, Math.min(16, n));
}
var GROUND_ROOMS = { living: 1, kitchen: 1, dining: 1, hallway: 1, lobby: 1, office: 1, classroom: 1, ballroom: 1, throneroom: 1 };
function roomsByLevel(rooms, levels) { return __ZC(74, 3, this, arguments, new.target); }
function enterable(spec) {
if (!spec)
return false;
var d = KIT[spec.archetype];
if (!d || d.cat !== "structure")
return false;
if (NOT_INSIDE[spec.archetype])
return false;
var a = spec.attrs || {}, sc = a.s || 1;
return d.size[0] * sc >= 4 && d.size[2] * sc >= 4 && d.size[1] * sc >= 3;
}
function doorWorld(spec) {
var def = KIT[spec.archetype] || KIT.house, a = spec.attrs || {}, s = (a.s || 1);
var parts = levelParts(def, spec), door = frontDoorOf(parts), B = bodyOf(parts);
var lx = door ? door.p[0] : (B ? B.x : 0), lz = door ? door.p[2] + door.s[2] / 2 : (B ? B.z + B.d / 2 : def.size[2] / 2);
lx *= s * (a.w || 1);
lz = lz * s * (a.d || 1) + 0.6;
var r = spec.rot || 0;
return { x: spec.x + lx * Math.cos(r) + lz * Math.sin(r), z: spec.z - lx * Math.sin(r) + lz * Math.cos(r), out: { x: Math.sin(r), z: Math.cos(r) } };
}
var INSIDE_CUE = /\b(inside|indoors|within the|in the (kitchen|bedroom|bathroom|living room|hallway|corridor|attic|basement|study|nursery|parlou?r|lounge|dining room|ballroom|lobby|classroom|throne room|great hall)|the room|a room|the rooms|rooms|hallway|corridor|upstairs|downstairs|wallpaper|the walls were|the floor was|ceiling)\b/;
var ROOMWORDS = [["living", /\b(living room|sitting room|parlou?r|lounge|drawing room)\b/], ["kitchen", /\bkitchens?\b/], ["bedroom", /\bbedrooms?\b/], ["bathroom", /\bbathrooms?\b/],
["hallway", /\b(hallway|corridor|passage)\b/], ["study", /\bstudy\b/], ["dining", /\bdining room\b/], ["nursery", /\bnursery\b/], ["attic", /\battic\b/], ["basement", /\bbasement\b/],
["ballroom", /\bballroom\b/], ["office", /\boffices?\b/], ["cell", /\b(prison )?cells?\b/], ["lobby", /\b(lobby|foyer|entrance hall)\b/], ["throneroom", /\bthrone room\b/], ["classroom", /\bclassrooms?\b/]];
var ITEMWORDS = [["piano", /\bpianos?\b/], ["bed", /\bbeds?\b/], ["sofa", /\b(sofa|couch|settee)\b/], ["armchair", /\barm ?chairs?\b/], ["longtable", /\b(long table|dining table|banquet table|feast)\b/],
["table", /\btables?\b/], ["chair", /\bchairs?\b/], ["fireplace", /\b(fireplace|hearth)\b/], ["bookshelf", /\b(bookshel(f|ves)|bookcases?|books)\b/], ["clock", /\bclocks?\b/],
["painting", /\b(paintings?|portraits?|pictures on the wall)\b/], ["wallmirror", /\bmirrors?\b/], ["chandelier", /\bchandeliers?\b/], ["rug", /\b(rug|carpet)\b/],
["spiralstair", /\bspiral stair(case|s)?\b/], ["stairs", /\b(staircase|stairs|stairway|steps up)\b/], ["bathtub", /\b(bathtub|bath tub|a bath)\b/], ["sink", /\bsinks?\b/],
["stove", /\b(stove|oven)\b/], ["fridge", /\b(fridge|refrigerator)\b/], ["desk", /\bdesks?\b/], ["wardrobe", /\b(wardrobe|closet)\b/], ["candles", /\bcandles?\b/],
["altarinside", /\baltar\b/], ["pew", /\bpews?\b/], ["throneseat", /\bthrone\b/], ["cage", /\bcages?\b/], ["lamp", /\blamps?\b/], ["tv", /\b(television|tv)\b/],
["plant", /\b(plants|potted plant|houseplants?)\b/], ["crib", /\b(crib|cradle)\b/], ["toys", /\b(toys|dolls?)\b/], ["machine", /\bmachines?\b/], ["crates", /\b(crates|boxes)\b/],
["barrel", /\bbarrels\b/], ["sarcophagus", /\b(sarcophag(us|i)|coffins?)\b/]];
var FLOORWORD = [["checker", /\b(black and white|checker(ed|board)) (tiled |tile )?floor/], ["marble", /\bmarble floors?\b/], ["wood", /\b(wooden|wood) floors?\b|\bfloorboards\b/],
["tile", /\b(tiled|tile) floors?\b/], ["stone", /\bstone floors?\b/], ["carpet", /\bcarpeted\b|\bthick carpet\b/]];
var INDOOR_ONLY = { stairs: 1, altar: 1, throne: 1, impossiblestair: 0 };
function insideScan(text) { return __ZC(74, 4, this, arguments, new.target); }
function insideOwner(s) { return __ZC(74, 5, this, arguments, new.target); }
var FLOORCOL = { wood: 0x7A5634, tile: 0xD8D4CC, stone: 0x6E6A64, carpet: 0x7A2A2A, marble: 0xE6E2DA, checker: 0xE8E4DC };
function intSlot(spec) { if (!store.insideSlots)
store.insideSlots = {}; if (store.insideSlots[spec.id] === undefined)
store.insideSlots[spec.id] = Object.keys(store.insideSlots).length; return store.insideSlots[spec.id]; }
function makeInterior(spec) { return __ZC(74, 6, this, arguments, new.target); }
var INT_TOONED = (typeof TOON !== "undefined" && !!TOON);
var INT_LAMP = INT_TOONED ? 0.12 : 0.42, INT_FILL = INT_TOONED ? 0.06 : 0.22, INT_HEMI = INT_TOONED ? 0.7 : 0.78;
function intLightTick(dt) { return __ZC(74, 7, this, arguments, new.target); }
function furnBox(k) { return __ZC(74, 8, this, arguments, new.target); }
function furnishRoom(kind, xc, zc, w, d, sd, put) { return __ZC(74, 9, this, arguments, new.target); }
function fillHall(kind, W, D, put, spots) { return __ZC(74, 10, this, arguments, new.target); }
function enterBuilding(spec) { return __ZC(74, 11, this, arguments, new.target); }
var FIXED_FURN = { cellbars: 1, cellwall: 1 };
function exitInterior(quiet) { return __ZC(74, 12, this, arguments, new.target); }
function rebuildInterior() {
if (!INT)
return;
var spec = INT.spec, p = { x: camera.position.x, z: camera.position.z };
scene.remove(INT.root);
INT = makeInterior(spec);
scene.add(INT.root);
wallsAt = -1;
camera.position.x = p.x;
camera.position.z = p.z;
bringOccupants();
}
function daySunAngle(day) {
var low = 4 * day * (1 - day);
return { col: 0xFFC98A, o: Math.min(0.62, low * 0.7) };
}
var liftCool = 0, liftNear = false;
function inLift() {
if (!INT || !INT.lifts || !INT.lifts.length)
return null;
var P = camera.position;
for (var i = 0; i < INT.lifts.length; i++) {
var L = INT.lifts[i];
if (Math.hypot(P.x - L.x, P.z - L.z) < 1.7)
return L;
}
return null;
}
var penthouseCleared = null;
var penthouseAsking = false, penthouseRefusedAt = 0;
function towerRule(k) { return (typeof DW_CLOUD !== "undefined" && DW_CLOUD.config && DW_CLOUD.config[k]) || null; }
function penthouseLetIn(I, to) { return __ZC(74, 13, this, arguments, new.target); }
function askPenthouse(to) { return __ZC(74, 14, this, arguments, new.target); }
function authGet(path, tok) {
return fetch(authUrl(path), { headers: authHeaders(tok) })
.then(function (r) { return r.json().then(function (j) { return r.ok ? j : Promise.reject(j); }); });
}
function mfaBox(qr, secret, first) { return __ZC(74, 15, this, arguments, new.target); }
function secondStepHere() { return __ZC(74, 16, this, arguments, new.target); }
function levelAllowed(to) { return __ZC(74, 17, this, arguments, new.target); }
function liftMove(dir) { return __ZC(74, 18, this, arguments, new.target); }
function liftGoTo(to) { return __ZC(74, 19, this, arguments, new.target); }
var liftPanel = null;
function liftButtons() {
if (liftPanel || typeof document === "undefined" || !document.body)
return;
liftPanel = document.createElement("div");
liftPanel.id = "lift-panel";
liftPanel.style.cssText = "position:fixed;bottom:96px;left:12px;z-index:30;display:none;flex-direction:column-reverse;gap:4px;max-width:calc(100vw - 24px);max-height:56vh;overflow-y:auto;padding:6px;background:rgba(11,13,19,.7);border-radius:4px";
document.body.appendChild(liftPanel);
}
function paintLiftPanel() {
liftButtons();
if (!liftPanel)
return;
var show = walkMode && !!INT && !!inLift();
liftPanel.style.display = show ? "flex" : "none";
if (!show)
return;
var key = INT.spec.id + ":" + INT.levels;
if (liftPanel.dataset.key !== key) {
var h = "";
for (var L = 0; L < INT.levels; L++) {
var nm = (INT.floorNames && INT.floorNames[L]) || ("Floor " + (L + 1));
h += '<button class="btn" data-floor="' + L + '" style="text-align:left;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;display:block">' + (L + 1) + " — " + esc(nm) + "</button>";
}
liftPanel.innerHTML = h;
Array.prototype.forEach.call(liftPanel.querySelectorAll("[data-floor]"), function (b) {
b.onclick = function () { liftGoTo(parseInt(b.getAttribute("data-floor"), 10)); };
});
liftPanel.dataset.key = key;
}
var here = INT.level || 0;
Array.prototype.forEach.call(liftPanel.querySelectorAll("[data-floor]"), function (b) {
var mine = parseInt(b.getAttribute("data-floor"), 10) === here;
b.style.fontWeight = mine ? "700" : "400";
b.style.opacity = mine ? "1" : ".82";
});
}
var ROLE_ROOM = { cartographer: "techoffice", archivist: "archive", engineer: "kitchenette", gatekeeper: "lobby",
runner: "lobby", nightdesk: "lobby", founder: "the office", nurse_day: "ward", nurse_night: "ward", patient: "ward", clerk: "office", guest: "bedroom",
resident: "living", teacher: "classroom", child: "classroom", priest: "nave", shopkeeper: "counter",
keeper: "lobby", worker: "floor", prisoner: "cell", farmer: "barn", innkeeper: "lobby", nightwatch: "lobby" };
function bringOccupants() { return __ZC(74, 20, this, arguments, new.target); }
var indoorLit = false;
function indoorLight(on) {
if (on) {
indoorLit = true;
if (typeof sun !== "undefined" && sun)
sun.intensity = 0;
if (typeof hemi !== "undefined" && hemi) {
hemi.color.setHex(0xFFF2E2);
hemi.groundColor.setHex(0x6A5E50);
hemi.intensity = INT_HEMI;
}
if (scene && scene.fog)
scene.fog.density = Math.min(scene.fog.density, 0.002);
}
else if (indoorLit) {
indoorLit = false;
if (typeof tickClock === "function")
tickClock(true);
}
}
var INT_NEAR = { at: -1e9, x: 0, z: 0, here: null, n: -1, list: [] };
function intNearEnterable(P) {
var N = INT_NEAR, now = performance.now(), here = store.here || 0;
if (now - N.at > 330 || Math.abs(P.x - N.x) > 10 || Math.abs(P.z - N.z) > 10 || N.here !== here || N.n !== store.objects.length) {
N.at = now;
N.x = P.x;
N.z = P.z;
N.here = here;
N.n = store.objects.length;
N.list = [];
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if ((o.realm || 0) !== here || o.filler)
continue;
if (Math.abs(o.x - P.x) > 90 || Math.abs(o.z - P.z) > 90)
continue;
if (!enterable(o))
continue;
N.list.push(o);
}
}
return N.list;
}
function interiorTick(dt) {
if (intCool > 0)
intCool -= dt;
if (liftCool > 0)
liftCool -= dt;
paintLiftPanel();
if (!walkMode) {
if (INT)
exitInterior(true);
indoorLight(false);
return;
}
var P = camera.position;
indoorLight(!!INT);
if (INT)
intLightTick(dt);
if (INT) {
var day = daylight(dreamHour()), wc = blend(0x1A2238, 0xCFE0F0, day);
var sun = daySunAngle(day);
INT.winMats.forEach(function (m) { m.color.setHex(wc); });
if (INT.winGlints)
INT.winGlints.forEach(function (m) { m.color.setHex(sun.col); m.opacity = sun.o; });
var near = inLift();
if (near && !liftNear) {
liftNear = true;
setStatus("<b>The lift.</b> Pick a floor from the panel, or press <b>Space</b> to rise and <b>C</b> to descend one at a time.");
}
else if (!near && liftNear)
liftNear = false;
if (intCool <= 0 && (INT.level || 0) === 0 && Math.abs(P.x - INT.exit.x) < 1.2 && P.z > INT.exit.z - 0.3)
exitInterior(false);
else if (Math.abs(P.x - INT.exit.x) < 3 && Math.abs(P.z - INT.exit.z) < 3 && (INT.level || 0) === 0) {
if (!INT.toldDoor) {
INT.toldDoor = 1;
setStatus("<b>The door.</b> Walk through it to go out" + (typeof fcrPc === "function" && fcrPc() ? " (or Menu, Leave this building)." : ", or press <b>Back</b>."));
}
}
return;
}
var gy = (typeof terrainY === "function") ? terrainY(P.x, P.z) : 0;
if (intCool > 0 || P.y - 1.72 - gy > 2)
return;
var near = intNearEnterable(P);
for (var i = 0; i < near.length; i++) {
var o = near[i];
if ((o.realm || 0) !== (store.here || 0) || o.filler || !enterable(o))
continue;
if (Math.abs(o.x - P.x) > 60 || Math.abs(o.z - P.z) > 60)
continue;
var D = doorWorld(o);
if (Math.hypot(P.x - D.x, P.z - D.z) < 0.9) {
enterBuilding(o);
return;
}
}
}
