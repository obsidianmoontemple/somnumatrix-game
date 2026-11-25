/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LGL = { t: 0, step: null, items: [], marks: [], book: null, loading: false, hud: null, beacon: null, run: 0, last: null, bounced: 0, busy: false, movers: [] };
var LGL_C = { ivory: 0xF4EEDD, ivoryD: 0xD9D0B8, red: 0xC2242B, redD: 0x8E1820, gold: 0xE8C050, goldD: 0xB8922E, silver: 0xD8DEE6,
hedge: 0x2F6B3A, hedgeL: 0x3F8246, leaf: 0x4E9A48, leafL: 0x7CC060, leafD: 0x2E6E38, trunk: 0x6A4A30, trunkD: 0x4A3422,
grassA: 0x86C464, grassB: 0x62A650, gravel: 0xECE2C8, brook: 0xBDE6F4, stone: 0xC9C4B8, stoneD: 0x9A968C, brick: 0xB5553A,
cream: 0xF2E8D0, slate: 0x56606E, wood: 0x7A5234, woodD: 0x4E3420, black: 0x1E1C22, white: 0xFAFAF6, pink: 0xF4A8C0, sand: 0xE8D8A8 };
var LGL_M4 = null, LGL_Q = null, LGL_E = null, LGL_V = null, LGL_S = null, LGL_COL = null;
function lglB() { return __ZC(475, 0, this, arguments, new.target); }
function lglRand(seed) { var s = (seed >>> 0) || 7; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
function lglMix(a, b, t) { var A = new THREE.Color(a), Bc = new THREE.Color(b); return A.lerp(Bc, t).getHex(); }
function lglSolid(x, z, hw, hd, h, rot) { if (typeof LD !== "undefined")
LD.solids.push({ x: x, z: z, rot: rot || 0, hw: hw, hd: hd, h: h || 3 }); }
function lglRound(x, z, r, h) { if (typeof LD !== "undefined")
LD.solids.push({ x: x, z: z, r: r, h: h || 3 }); }
function lglTalker(name, x, z, who, greet, extra, r) { return __ZC(475, 1, this, arguments, new.target); }
function lglTree(B, x, z, kind, s, R) { return __ZC(475, 2, this, arguments, new.target); }
function lglHedge(B, ax, az, bx, bz, h, w) {
var L = Math.hypot(bx - ax, bz - az), a = Math.atan2(bx - ax, bz - az);
h = h || 1.3;
w = w || 0.9;
B.box(w, h, L, LGL_C.hedge, (ax + bx) / 2, h / 2, (az + bz) / 2, a);
var cap = new THREE.CylinderGeometry(w / 2, w / 2, L, 8);
cap.rotateX(Math.PI / 2);
B.add(cap, LGL_C.hedgeL, (ax + bx) / 2, h, (az + bz) / 2, 0, a, 0, 1, 0.7, 1);
}
function lglRoof(B, w, d, h, col, x, y, z) { var g = new THREE.ConeGeometry(0.7071, 1, 4); g.rotateY(Math.PI / 4); B.add(g, col, x, y + h / 2, z, 0, 0, 0, w, h, d); }
function lglCeil(G, w, d, col, x, y, z) { var L = G.userData.lgl, m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color: col })); m.rotation.x = Math.PI / 2; m.position.set(x - L.cx, y, z - L.cz); G.add(m); return m; }
function lglFlower(B, x, z, kind, s) { return __ZC(475, 3, this, arguments, new.target); }
function lglBed(B, x, z, w, d, n, cols, R) {
for (var i = 0; i < n; i++) {
var fx = x + (R() - 0.5) * w, fz = z + (R() - 0.5) * d, c = cols[Math.floor(R() * cols.length)], h = 0.25 + R() * 0.3;
B.cyl(0.015, 0.02, h, 0x4A8A40, fx, h / 2, fz, 4);
B.add(new THREE.ConeGeometry(0.11, 0.14, 6), c, fx, h + 0.05, fz, Math.PI);
}
}
var LGL_TURN = {
pawn: [[0, 0], [0.5, 0], [0.52, 0.12], [0.4, 0.2], [0.3, 0.28], [0.2, 0.6], [0.16, 0.95], [0.3, 1.02], [0.3, 1.1], [0.16, 1.16], [0.24, 1.3], [0.3, 1.5], [0.24, 1.7], [0.1, 1.8], [0, 1.82]],
rook: [[0, 0], [0.55, 0], [0.57, 0.14], [0.44, 0.24], [0.34, 0.34], [0.3, 1.2], [0.42, 1.3], [0.44, 1.75], [0.34, 1.75], [0.34, 1.6], [0, 1.6]],
bishop: [[0, 0], [0.52, 0], [0.54, 0.13], [0.42, 0.22], [0.3, 0.32], [0.18, 1.1], [0.3, 1.2], [0.3, 1.28], [0.16, 1.34], [0.26, 1.6], [0.28, 1.85], [0.16, 2.15], [0.05, 2.3], [0.09, 2.38], [0, 2.44]],
queen: [[0, 0], [0.6, 0], [0.62, 0.15], [0.48, 0.25], [0.36, 0.36], [0.2, 1.3], [0.36, 1.42], [0.36, 1.5], [0.2, 1.56], [0.24, 1.9], [0.4, 2.3], [0.3, 2.34], [0.14, 2.2], [0, 2.2]],
king: [[0, 0], [0.62, 0], [0.64, 0.15], [0.5, 0.25], [0.38, 0.36], [0.22, 1.4], [0.38, 1.52], [0.38, 1.6], [0.22, 1.66], [0.26, 2.05], [0.38, 2.4], [0.3, 2.46], [0, 2.46]],
knight: [[0, 0], [0.56, 0], [0.58, 0.14], [0.44, 0.24], [0.36, 0.34], [0.34, 0.5], [0, 0.5]]
};
function lglPiece(B, kind, red, x, z, s, ry) { return __ZC(475, 4, this, arguments, new.target); }
function lglBeast(B, o) { return __ZC(475, 5, this, arguments, new.target); }
function lglFigure(seed, o, add) {
var g = new THREE.Group(), p = null;
try {
if (typeof wPerson === "function")
p = wPerson("lgl_" + seed, o || {});
}
catch (e) {
p = null;
}
if (p)
g.add(p);
if (add) {
var B = lglB();
add(B, g);
if (B.g.length)
g.add(B.mesh(o && o.shine ? { shine: o.shine } : null));
}
return g;
}
function lglCrown(B, col, y, tall, n) { var i, a; B.cyl(0.14, 0.125, 0.07, col, 0, y, 0, 12); for (i = 0; i < (n || 6); i++) {
a = i / (n || 6) * 6.283;
B.cone(0.035, tall || 0.16, col, Math.cos(a) * 0.125, y + 0.03 + (tall || 0.16) / 2, Math.sin(a) * 0.125, 4);
B.sph(0.022, 0xFFFFFF, Math.cos(a) * 0.125, y + 0.05 + (tall || 0.16), Math.sin(a) * 0.125);
} }
function lglSkirt(B, col, dark, top, r) { var i, a; B.lathe([[0.17, top], [0.24, top - 0.1], [r * 0.7, 0.5], [r, 0.12], [r + 0.03, 0.03], [r, 0]], col, 0, 0, 0, 18); B.tor(r, 0.035, dark, 0, 0.08, 0, Math.PI / 2); B.tor(r * 0.72, 0.03, dark, 0, 0.5, 0, Math.PI / 2); }
(function () {
if (typeof REALMS === "undefined" || !REALMS.mirror)
return;
var T = REALMS.mirror;
T.ground = LGL_C.grassB;
T.tex = "grass";
T.flat = true;
T.path = LGL_C.gravel;
T.skyTop = 0x5E9EE6;
T.skyLow = 0xFBE4EC;
T.dens = 0.75;
T.light = 0xFFF6E4;
T.amb = 0.92;
T.sun = 0.85;
T.stars = 0;
if (typeof REALM_SCENERY !== "undefined")
REALM_SCENERY.mirror = [];
if (typeof DQ_LANDS !== "undefined" && DQ_LANDS.mirror) {
var L = DQ_LANDS.mirror;
L.gather = [["dr_mirrorshard", 12, "crystal", 0xD0DCE6, [70, -75, 30]], ["dr_chesspiece", 8, "piece", 0xD8D2C4, [-70, -145, 30]], ["dr_lgrose", 10, "bloom", 0xC03048, [14, -70, 16]]];
L.board = [7, -4, -0.4];
(L.errands || []).forEach(function (e) { if (e.who === "A mirror twin") {
e.who = "Tweedledee";
e.say = "Six roses: three for me and three for him. Contrariwise, three for him and three for me.";
} });
if (L.stall) {
L.stall.who = "The Sheep";
L.stall.n = "The Sheep's little dark shop";
}
(L.games || []).forEach(function (g) { if (g.who === "A mirror twin") {
g.who = "Tweedledum";
g.say = "Every card has its twin, same as me. Turn two at a time and find them all. Nohow!";
} });
}
})();
var LGL_ITEM = { hearthq: [-1.1, -36.6], hearthk: [1.1, -36.6], oy0: [-26, -236], oy1: [-29.5, -238.4], oy2: [-32, -240.2], oy3: [-38.5, -239], rattle: [7, -240.5],
arm0: [-12, -242], arm1: [13, -232], arm2: [-9, -230], arm3: [16, -244], arm4: [4, -229], rush0: [14.5, -281], rush1: [13.6, -285], rush2: [14.2, -289], rush3: [16.5, -292.5], rush4: [20.5, -294.6], crown: [0, -468] };
function lglZone(P, cx, cz, r, fn) { return __ZC(475, 6, this, arguments, new.target); }
function lglCast(G, x, z, ry, fig, name, who, greet, extra, r) {
var L = G.userData.lgl;
fig.position.set(x - L.cx, fig.position.y, z - L.cz);
fig.rotation.y = ry || 0;
G.add(fig);
if (name)
lglTalker(name, x, z, who, greet, extra, r);
return fig;
}
function lglMade(fn, o) { var B = lglB(); fn(B); var g = new THREE.Group(); g.add(B.mesh(o)); return g; }
function lglWalker(G, kind, red, x, z, name, who, greet, rr) { return __ZC(475, 7, this, arguments, new.target); }
function lglGlassMat(col, op) { var m = new THREE.MeshPhongMaterial({ color: col, shininess: 140, specular: 0xFFFFFF, emissive: 0x2A3440, emissiveIntensity: 0.5 }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} return m; }
function lglMirror(B, G, x, z, ry, w, h, L, y0) { return __ZC(475, 8, this, arguments, new.target); }
function lglPlan(P) { return __ZC(475, 9, this, arguments, new.target); }
function lglAvenue(B, x, R, lite) { return __ZC(475, 10, this, arguments, new.target); }
function lglHouse(P) { return __ZC(475, 11, this, arguments, new.target); }
function lglGarden(P, R) { return __ZC(475, 12, this, arguments, new.target); }
function lglRailway(P, R) { return __ZC(475, 13, this, arguments, new.target); }
function lglWood(B, x0, x1, z0, z1, n, kinds, R, keep, s0) {
for (var i = 0, tries = 0; i < n && tries < n * 6; tries++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (Math.abs(x) < 3.2 || (keep && keep(x, z)))
continue;
lglTree(B, x, z, kinds[Math.floor(R() * kinds.length)], (s0 || 0.9) + R() * 0.5, R);
lglRound(x, z, 0.42, 5);
i++;
}
}
function lglNear(pts, d) { return function (x, z) { for (var i = 0; i < pts.length; i++)
if (Math.hypot(x - pts[i][0], z - pts[i][1]) < (pts[i][2] || d))
return true; return false; }; }
function lglPost(G, B, x, z, lines, L) { return __ZC(475, 14, this, arguments, new.target); }
function lglFourth(P, R) { return __ZC(475, 15, this, arguments, new.target); }
function lglFifth(P, R) { return __ZC(475, 16, this, arguments, new.target); }
function lglSixth(P, R) { return __ZC(475, 17, this, arguments, new.target); }
function lglSeventh(P, R) { return __ZC(475, 18, this, arguments, new.target); }
function lglEighth(P, R) { return __ZC(475, 19, this, arguments, new.target); }
function lglSides(P, R) { return __ZC(475, 20, this, arguments, new.target); }
var LGL_AT = {
glass: [0, -12], hearth: [0, -37.2], table: [3.6, -30], wallglass: [-5.4, -30], chair: [-3.4, -33], door: [6.6, -30], gate: [0, -48],
bed: [-7, -63], tiger: [-8.6, -62.2], rose: [-6.4, -64.6], hill: [0, -96], redq: [0, -98], runtree: [7, -101], pegs: [0, -106],
brook1: [0, -115], station: [0, -134], guard: [-2.4, -136.4], carriage: [4, -139.2], gnat: [8, -191], woodedge: [0, -200], wood: [0, -211], fawn: [-4, -216], posts: [0, -227],
dum: [-1.3, -235.5], dee: [1.3, -235.5], shore: [-30, -232], walrus: [-36, -235], carpenter: [-33.4, -236.6], redking: [24, -240], rattle: [7, -240.5], crow: [0, -245],
wqueen: [0, -248.5], brook3: [0, -255], shop: [0, -270], sheep: [0, -272.6], boat: [38, -286], egg: [1.8, -272.4],
brook4: [0, -325], wall: [0, -346], humpty: [0, -348.4],
forest6: [0, -362], wking: [0, -370], haigha: [-3, -372], town: [30, -376], unicorn: [33.5, -379], lion: [27, -379.4], cake: [30, -381.6],
brook5: [0, -396], rknight: [-4.5, -405], wknight: [4.5, -405], walk1: [0, -420], walk2: [0, -436], woodend: [2, -448], turn: [0, -454],
crown: [0, -468], redq8: [-2.2, -481], whiteq8: [2.2, -481], arch: [0, -494], frog: [3.2, -493.4], hall: [0, -505], mutton: [-1.2, -512], pudding: [1.2, -514], cloth: [0, -517], shake: [0, -519.4],
kitten: [-3.4, -31.6], kittens: [-2, -35.6]
};
var LGL_STEPS = [
{ c: 1, p: 0, k: "talk", at: "glass", n: "The looking-glass", v: "step through", d: "Go up to the great looking-glass on the chimney-piece and step through it.", tp: [0, -25, Math.PI], say: "The glass melted away like a bright silvery mist. You are in the Looking-glass room." },
{ c: 1, p: 12, k: "go", at: "hearth", r: 3.2, d: "Look in the fireplace: the chessmen are walking about among the cinders, two and two." },
{ c: 1, p: 15, k: "pick", items: [["hearthq", "The White Queen", "lift her to the table"], ["hearthk", "The White King", "dust him and lift him up"]], d: "Lift the White Queen and the White King out of the cinders and set them on the table." },
{ c: 1, p: 33, k: "talk", at: "table", n: "The Looking-glass book", v: "turn the leaves", d: "There is a book lying on the table. Turn over the leaves.",
q: ["The page reads YKCOWREBBAJ, all the wrong way. How is a Looking-glass book read?", "Hold it up to a glass, and the words go the right way again", "Turn it upside down", "Read it from the last page to the first", "'Why, it's a Looking-glass book, of course! And if I hold it up to a glass, the words will all go the right way again.'"] },
{ c: 1, p: 41, k: "talk", at: "wallglass", n: "The glass on the wall", v: "hold the book up to it", d: "Hold the book up to the glass on the wall and read the poem.",
q: ["Who slew the Jabberwock, and with what?", "The beamish boy, with his vorpal sword", "The Bandersnatch, with its frumious jaws", "The Jubjub bird, with its claws", "'One, two! One, two! And through and through / The vorpal blade went snicker-snack!'"] },
{ c: 2, p: 0, k: "go", at: "gate", r: 4, d: "Float down the stairs and out at the door, to see the garden before you must go back through the glass." },
{ c: 2, p: 4, k: "talk", at: "tiger", n: "The Tiger-lily", v: "speak to", d: "A bed of flowers, with a willow-tree in the middle. Speak to the Tiger-lily waving in the wind." },
{ c: 2, p: 23, k: "talk", at: "rose", n: "The Rose", v: "speak to", d: "Ask the Rose how it is that the flowers here can talk.",
q: ["Why can the flowers of this garden talk, when most cannot?", "The ground here is hard, so the flowers are never asleep", "They were taught by the Red Queen", "They drink Looking-glass milk", "'In most gardens,' the Tiger-lily said, 'they make the beds too soft, so that the flowers are always asleep.'"] },
{ c: 2, p: 44, k: "away", at: "hill", from: "gate", d: "The Red Queen is on the hill. Walk towards her." },
{ c: 2, p: 52, k: "talk", at: "redq", n: "The Red Queen", v: "curtsey to", d: "Curtsey while you think what to say (it saves time), and look out over the country from the hill.",
q: ["The country is marked out like a great chessboard, and you may be the White Queen's Pawn. Where does a pawn become a Queen?", "In the Eighth Square", "In the Fourth Square", "At the top of the hill", "'When you get to the Eighth Square you'll be a Queen.'"] },
{ c: 2, p: 60, k: "run", at: "runtree", d: "\"Faster! Faster!\" Take the Red Queen's hand and RUN: as hard as ever you can, anywhere you like." },
{ c: 2, p: 64, k: "talk", at: "redq", n: "The Red Queen", v: "get your breath by", d: "You are under the very same tree. Ask the Red Queen about it.",
q: ["In this country, what does it take all the running you can do to manage?", "To keep in the same place", "To get to the next square", "To catch the Red King", "'If you want to get somewhere else, you must run at least twice as fast as that!'"] },
{ c: 2, p: 72, k: "go", at: "pegs", r: 3, d: "Follow the Queen as she measures the ground and sticks her little pegs in, and hear your directions." },
{ c: 3, p: 0, k: "go", at: "brook1", r: 5, d: "Run down the hill and jump over the first of the six little brooks.", say: "You are in the Third Square. A pawn goes through it by railway." },
{ c: 3, p: 2, k: "talk", at: "guard", n: "The Guard", v: "show your ticket to", d: "\"Tickets, please!\" Go along the platform to the Guard at the carriage window.",
q: ["Everyone has a ticket about the size of themselves, and you have none. What do you tell the Guard?", "There wasn't a ticket-office where I came from", "I ate it", "The Red Queen is holding it for me", "'I'm afraid I haven't got one,' Alice said in a frightened tone: 'there wasn't a ticket-office where I came from.'"] },
{ c: 3, p: 17, k: "talk", at: "carriage", n: "The railway carriage", v: "take your seat in", d: "Take your seat with the gentleman dressed in white paper, the Goat, the Beetle and the Horse.", tp: [2, -187, Math.PI], say: "The train jumped the brook, straight up into the air. You are in the Fourth Square, sitting quietly under a tree." },
{ c: 3, p: 28, k: "talk", at: "gnat", n: "The Gnat", v: "talk with", d: "A Gnat about the size of a chicken is fanning you with its wings from a twig. Talk with it about insects.",
q: ["What does the Bread-and-butter-fly live on?", "Weak tea with cream in it", "Sap and sawdust", "Frumenty and mince-pie", "'Crawling at your feet you may observe a Bread-and-butter-fly ... Weak tea with cream in it.'"] },
{ c: 3, p: 53, k: "go", at: "woodedge", r: 4, d: "The Gnat has sighed itself away. Go on to the edge of the dark wood." },
{ c: 3, p: 66, k: "go", at: "wood", r: 4, d: "Walk in under the trees: this is the wood where things have no names." },
{ c: 3, p: 71, k: "talk", at: "fawn", n: "The Fawn", v: "walk on with", d: "A Fawn comes wandering by, with large gentle eyes. Walk on with it through the wood." },
{ c: 3, p: 78, k: "go", at: "posts", r: 3.5, d: "Follow the road out of the wood to the two finger-posts." },
{ c: 4, p: 0, k: "talk", at: "dum", n: "Tweedledum", v: "look closely at", d: "Two fat little men stand under a tree, each with an arm round the other's neck. Look at the one marked DUM.",
q: ["\"If you think we're wax-works,\" says Tweedledum, \"you ought to...\"", "Pay, you know. Wax-works weren't made to be looked at for nothing", "Bow, and call us Sir", "Wind us up", "'If you think we're wax-works,' he said, 'you ought to pay, you know.'"] },
{ c: 4, p: 16, k: "talk", at: "dee", n: "Tweedledee", v: "shake hands and dance with", d: "Shake hands with both of them at once, and dance round in a ring." },
{ c: 4, p: 25, k: "go", at: "shore", r: 5, d: "Tweedledee is repeating \"The Walrus and the Carpenter\", the longest poem he knows. Go down to the shore it tells of." },
{ c: 4, p: 35, k: "pick", items: [["oy0", "A little Oyster", "hear its part"], ["oy1", "A little Oyster", "hear its part"], ["oy2", "A little Oyster", "hear its part"], ["oy3", "The eldest Oyster", "hear its part"]], d: "The young Oysters have hopped out of the water in their clean shoes. Meet four of them along the briny beach." },
{ c: 4, p: 42, k: "talk", at: "walrus", n: "The Walrus", v: "hear the end from", d: "\"The time has come,\" the Walrus said. Hear the end of the poem from the Walrus and the Carpenter.",
q: ["When the Carpenter asked the Oysters, \"Shall we be trotting home again?\", why did answer come there none?", "They'd eaten every one", "The Oysters had run away", "The tide had come in", "'But answer came there none / And that was scarcely odd, because / They'd eaten every one.'"] },
{ c: 4, p: 50, k: "talk", at: "redking", n: "The Red King", v: "listen to the snoring of", d: "Something is puffing like a steam-engine in the wood. Go and look at the Red King, fast asleep.",
q: ["\"You're only a sort of thing in his dream!\" If the Red King left off dreaming about you, where does Tweedledee say you'd be?", "Nowhere. You'd go out, bang! just like a candle", "Back at home by the fire", "In the Eighth Square", "'If that there King was to wake,' added Tweedledum, 'you'd go out, bang! just like a candle!'"] },
{ c: 4, p: 74, k: "pick", items: [["rattle", "A small white thing under the tree", "look at"]], d: "Tweedledum has seized your wrist and is pointing, his eyes large and yellow, at a small white thing under the tree." },
{ c: 4, p: 83, k: "pick", items: [["arm0", "A bolster", "fetch"], ["arm1", "A hearth-rug", "fetch"], ["arm2", "A dish-cover", "fetch"], ["arm3", "A coal-scuttle", "fetch"], ["arm4", "The saucepan helmet", "fetch"]], d: "They must have a bit of a fight. Fetch the things out of the wood and help them dress for battle." },
{ c: 4, p: 104, k: "go", at: "crow", r: 4, d: "It is growing dark so suddenly: the monstrous crow! Run in under the large tree." },
{ c: 5, p: 0, k: "talk", at: "wqueen", n: "The White Queen", v: "a-dress", d: "Somebody's shawl is being blown away. Catch it, and help the White Queen put it on again.",
q: ["\"The rule is, jam to-morrow and jam yesterday.\" When is there jam to-day?", "Never: it's jam every OTHER day, and to-day isn't any other day", "On Sundays", "When the King's Messenger comes out of prison", "'It's jam every OTHER day: to-day isn't any OTHER day, you know.'"] },
{ c: 5, p: 32, k: "talk", at: "wqueen", n: "The White Queen", v: "comfort", d: "The Queen is screaming like a steam-engine: she is GOING to prick her finger. Stay with her.",
q: ["How many impossible things has the White Queen sometimes believed before breakfast?", "As many as six", "Exactly two", "A hundred and one", "'Why, sometimes I've believed as many as six impossible things before breakfast.'"] },
{ c: 5, p: 57, k: "go", at: "brook3", r: 5, d: "The shawl has blown across the little brook. Jump over it after the Queen.", say: "You are in the Fifth Square. \"Oh, much better!\" cries the Queen, her voice rising to a squeak: \"Be-e-e-etter! Be-e-ehh!\"" },
{ c: 5, p: 59, k: "talk", at: "sheep", n: "The Sheep", v: "look round the shop of", d: "You are in a little dark shop, and an old Sheep sits knitting behind the counter. Look round the shelves.",
q: ["The shop seems full of curious things. But what happens to any shelf you look hard at?", "That shelf is always quite empty, though the others round it are crowded full", "It grows taller", "Its things turn into eggs", "'Whenever she looked hard at any shelf ... that particular shelf was always quite empty.'"] },
{ c: 5, p: 67, k: "talk", at: "boat", n: "The little boat", v: "take the oars of", d: "\"Can you row?\" The needles have turned into oars. Go out to the little boat on the water.", tpBefore: [36, -283, -Math.PI / 2] },
{ c: 5, p: 82, k: "pick", items: [["rush0", "Scented rushes", "pick"], ["rush1", "Scented rushes", "pick"], ["rush2", "Scented rushes", "pick"], ["rush3", "Scented rushes", "pick"], ["rush4", "The prettiest rushes", "reach for"]], d: "\"Feather! Feather!\" There are scented rushes along the bank. Pick five bunches (the prettiest are always further)." },
{ c: 5, p: 91, k: "talk", at: "egg", n: "The egg on the shelf", v: "buy", d: "The oars and the boat and the river have vanished: you are back in the little dark shop. Buy an egg.", tpBefore: [0, -267.5, Math.PI],
q: ["One egg costs fivepence farthing. What do two cost?", "Twopence (only you MUST eat them both, if you buy two)", "Tenpence halfpenny", "A shilling", "'Fivepence farthing for one. Twopence for two,' the Sheep replied."] },
{ c: 6, p: 0, k: "go", at: "wall", r: 5, d: "The egg gets further away as you walk towards it, and the shop has grown into trees. Jump the brook and follow the egg.", say: "You are in the Sixth Square. The egg has got larger and larger, and more and more human." },
{ c: 6, p: 6, k: "talk", at: "humpty", n: "Humpty Dumpty", v: "speak to", d: "He sits with his legs crossed like a Turk on top of a high narrow wall. Speak to him (carefully).",
q: ["\"Seven years and six months!\" If you had asked Humpty Dumpty's advice, what would he have said?", "Leave off at seven", "Leave off at once", "Never leave off at all", "'Now if you'd asked MY advice, I'd have said \"Leave off at seven\" -- but it's too late now.'"] },
{ c: 6, p: 35, k: "talk", at: "humpty", n: "Humpty Dumpty", v: "admire the cravat of", d: "Admire his beautiful belt. (Or is it a cravat?) It was an un-birthday present.",
q: ["How many days are there in the year when you might get un-birthday presents?", "Three hundred and sixty-four", "Three hundred and sixty-five", "Only one", "'And how many birthdays have you?' 'One.' ... 365 take away 1 leaves 364."] },
{ c: 6, p: 65, k: "talk", at: "humpty", n: "Humpty Dumpty", v: "ask about hard words of", d: "He can explain all the poems that ever were invented. Ask him the meaning of \"Jabberwocky\".",
q: ["\"Slithy\" is like a portmanteau: two meanings packed up into one word. Which two?", "Lithe and slimy", "Sly and filthy", "Slippery and lively", "'Well, \"SLITHY\" means \"lithe and slimy.\" ... You see it's like a portmanteau.'"] },
{ c: 6, p: 100, k: "talk", at: "humpty", n: "Humpty Dumpty", v: "hear the poem of", d: "He will repeat a piece of poetry written entirely for your amusement. Hear it out, and say good-bye." },
{ c: 7, p: 0, k: "go", at: "forest6", r: 5, d: "A heavy crash has shaken the forest from end to end. Soldiers come running through the wood: go and see.", say: "All the King's horses and all the King's men." },
{ c: 7, p: 6, k: "talk", at: "wking", n: "The White King", v: "look along the road for", d: "The White King sits on the ground, busily writing in his memorandum-book. Look along the road for his Messengers.",
q: ["\"I see nobody on the road,\" you say. What does the King wish?", "That he had such eyes: to be able to see Nobody, and at that distance too", "That Nobody would walk faster", "That the road were shorter", "'I only wish I had such eyes,' the King remarked in a fretful tone. 'To be able to see Nobody! And at that distance, too!'"] },
{ c: 7, p: 25, k: "talk", at: "haigha", n: "Haigha", v: "open the bag of", d: "The Anglo-Saxon Messenger has come, with his great hands spread out like fans. He has ham sandwiches and hay in his bag.",
q: ["The Lion and the Unicorn are fighting. What for?", "The crown: and it is the White King's own crown all the while", "A plum-cake", "The Eighth Square", "'Why the Lion and the Unicorn, of course ... fighting for the crown? ... and the best of the joke is, that it's MY crown all the while!'"] },
{ c: 7, p: 43, k: "go", at: "town", r: 6, d: "Run with the King to the old town, and see the fight: the Lion and the Unicorn in a cloud of dust." },
{ c: 7, p: 62, k: "talk", at: "unicorn", n: "The Unicorn", v: "be looked at by", d: "The Unicorn has sauntered by with his hands in his pockets, and is looking at you with an air of the deepest disgust.",
q: ["The Unicorn always thought children were fabulous monsters. What bargain does he offer?", "If you'll believe in me, I'll believe in you", "If you fetch the cake, I'll share the crown", "If you beat the Lion, you may ride me", "'Well, now that we HAVE seen each other,' said the Unicorn, 'if you'll believe in me, I'll believe in you. Is that a bargain?'"] },
{ c: 7, p: 74, k: "talk", at: "lion", n: "The Lion", v: "sit down by", d: "The Lion has joined them, very tired and sleepy. \"Are you animal, vegetable, or mineral?\" Sit down between the two.", },
{ c: 7, p: 85, k: "talk", at: "cake", n: "The plum-cake", v: "hand round", d: "You sit on the bank of the little brook with the great dish on your knees. Share out the plum-cake.",
q: ["You saw and saw, and the slices always join on again. How are Looking-glass cakes managed?", "Hand it round first, and cut it afterwards", "Cut it with the left hand", "Say its name backwards", "'You don't know how to manage Looking-glass cakes,' the Unicorn remarked. 'Hand it round first, and cut it afterwards.'"] },
{ c: 8, p: 0, k: "go", at: "brook5", r: 5, d: "The drums! The air is full of them. Spring across the little brook in your terror.", say: "You are in the Seventh Square. The noise dies away, and it is all forest." },
{ c: 8, p: 3, k: "talk", at: "rknight", n: "The Red Knight", v: "be taken prisoner by", d: "\"Ahoy! Ahoy! Check!\" A Knight in crimson armour gallops down on you, brandishing a great club.", },
{ c: 8, p: 17, k: "talk", at: "wknight", n: "The White Knight", v: "help off with the helmet of", d: "It was a glorious victory. Help the White Knight off with his helmet, and look at his little deal box.",
q: ["Why has the White Knight's horse those anklets round its feet?", "To guard against the bites of sharks", "To make it gallop faster", "To keep its shoes from being stolen", "'To guard against the bites of sharks,' the Knight replied. 'It's an invention of my own.'"] },
{ c: 8, p: 49, k: "go", at: "walk1", r: 4, d: "Walk beside the Knight through the forest. (Whenever the horse stops, he falls off in front; whenever it goes on again, he falls off behind.)" },
{ c: 8, p: 71, k: "go", at: "walk2", r: 4, d: "Walk on with him, and hear about the pudding he invented during the meat-course.",
q: ["The pudding never was cooked. What was it to be made of?", "Blotting-paper, with gunpowder and sealing-wax", "Bread and butter and weak tea", "Hay and ham sandwiches", "'It began with blotting-paper,' the Knight answered with a groan. ... 'things like gunpowder and sealing-wax.'"] },
{ c: 8, p: 81, k: "talk", at: "woodend", n: "The White Knight", v: "hear the song of", d: "You have come to the end of the wood. Let him sing you a song to comfort you.",
q: ["The NAME of the song is called \"Haddocks' Eyes\"; the name really is \"The Aged Aged Man\"; the song is called \"Ways and Means\". What IS the song, really?", "A-sitting On A Gate", "The Tune's My Own Invention", "I Give Thee All, I Can No More", "'The song really IS \"A-sitting On A Gate\": and the tune's my own invention.'"] },
{ c: 8, p: 103, k: "talk", at: "turn", n: "The turn of the road", v: "wave your handkerchief from", d: "He asks you to wait and wave your handkerchief when he gets to the turn in the road. It will encourage him." },
{ c: 8, p: 107, k: "pick", items: [["crown", "Something very heavy, fitted tight round your head", "lift off and look at"]], d: "A very few steps bring you to the edge of the last brook. Bound across to the Eighth Square, and throw yourself down on the soft lawn.", say: "The Eighth Square at last! It is a golden crown." },
{ c: 9, p: 0, k: "talk", at: "redq8", n: "The Red Queen", v: "sit down by", d: "The Red Queen and the White Queen are sitting close to you, one on each side. Ask if the game is over.", },
{ c: 9, p: 14, k: "talk", at: "whiteq8", n: "The White Queen", v: "be examined by", d: "You cannot be a Queen till you have passed the proper examination. Answer the White Queen.",
q: ["\"Take a bone from a dog: what remains?\"", "The dog's temper, for the dog would lose it and come away", "The bone", "Nothing at all", "'Then if the dog went away, its temper would remain!' the Queen exclaimed triumphantly."] },
{ c: 9, p: 42, k: "talk", at: "redq8", n: "The Red Queen", v: "answer useful questions for", d: "\"Can you answer useful questions?\" the Red Queen says. \"How is bread made?\"",
q: ["\"You take some flour.\" \"Where do you pick the flower? In a garden, or in the hedges?\"", "It isn't picked at all: it's GROUND", "In the garden of live flowers", "In the Sixth Square", "'Well, it isn't PICKED at all,' Alice explained: 'it's GROUND.' 'How many acres of ground?' said the White Queen."] },
{ c: 9, p: 67, k: "talk", at: "whiteq8", n: "The two Queens", v: "sing a lullaby to", d: "The White Queen is sleepy, poor thing. Smooth her hair, lend her your nightcap, and sing her a soothing lullaby." },
{ c: 9, p: 84, k: "go", at: "arch", r: 3.5, d: "Both Queens have vanished from your lap. Go up to the arched doorway with QUEEN ALICE over it in large letters." },
{ c: 9, p: 91, k: "talk", at: "frog", n: "The old Frog", v: "ask about the door of", d: "There is a Visitors' Bell and a Servants' Bell, and no bell for a Queen. Ask the very old Frog in bright yellow.", },
{ c: 9, p: 103, k: "go", at: "hall", r: 4, d: "The door has flown open, and a shrill voice is singing \"To the Looking-Glass world it was Alice that said...\" Walk up the large hall." },
{ c: 9, p: 110, k: "talk", at: "mutton", n: "The Leg of Mutton", v: "be introduced to", d: "Three chairs at the head of the table. You have missed the soup and fish. Be introduced to the joint.", },
{ c: 9, p: 117, k: "talk", at: "pudding", n: "The Plum-Pudding", v: "cut a slice of", d: "\"Pudding: Alice; Alice: Pudding.\" Conquer your shyness, cut a slice, and hear the White Queen's riddle, all in poetry, all about fishes.",
q: ["\"Which is easiest to do: un-dish-cover the fish, or dishcover the riddle?\" What is the fish of the riddle?", "An oyster", "A haddock", "A whiting", "The riddle is left unanswered in the book. Readers have long agreed on the answer: an oyster, which lies in its dish (its shell) with the cover held fast."] },
{ c: 9, p: 130, k: "talk", at: "cloth", n: "The table-cloth", v: "seize with both hands", d: "You must return thanks in a neat speech. The candles grow up to the ceiling, and the bottles take plates for wings. \"I can't stand this any longer!\"" },
{ c: 10, p: 0, k: "talk", at: "shake", n: "The Red Queen, no bigger than a doll", v: "shake into a kitten", d: "\"And as for YOU,\" catch hold of the little creature in the very act of jumping over a bottle, \"I'll shake you into a kitten, that I will!\"", tp: [-1.4, -31, Math.PI / 2 + 0.6], say: "...and it really WAS a kitten, after all." },
{ c: 11, p: 0, k: "talk", at: "kitten", n: "The black kitten", v: "hold up", d: "You are in the great arm-chair, with the black kitten in your hands." },
{ c: 12, p: 0, k: "talk", at: "kittens", n: "The chessmen on the hearth-rug", v: "kneel down among", d: "Hunt among the chessmen on the hearth-rug till you find the Red Queen, and put the kitten and the Queen to look at each other." },
{ c: 12, p: 9, k: "talk", at: "kitten", n: "The black kitten", v: "ask", d: "\"Now, Kitty, let's consider who it was that dreamed it all.\"",
q: ["It must have been either you or the Red King. Which do YOU think it was?", "I dreamed it, and he was part of my dream", "The Red King dreamed it, and I was part of his", "We were both in the same dream", "No answer is wrong. The book ends by asking: \"Which do YOU think it was?\"", 1] }
];
var LGL_CH = ["", "Looking-Glass House", "The Garden of Live Flowers", "Looking-Glass Insects", "Tweedledum and Tweedledee", "Wool and Water", "Humpty Dumpty", "The Lion and the Unicorn", "\"It's my own Invention\"", "Queen Alice", "Shaking", "Waking", "Which Dreamed it?"];
function lglState() { if (typeof store === "undefined")
return { i: 0, pk: {} }; if (!store.lgl || typeof store.lgl !== "object")
store.lgl = { i: 0, pk: {}, b: 0 }; if (!store.lgl.pk)
store.lgl.pk = {}; return store.lgl; }
function lglKeep() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function lglHere() { return typeof LD !== "undefined" && LD.g && LD.kind === "mirror" && typeof ldRealm === "function" && !!ldRealm(); }
function lglStepNow() { var S = lglState(); return LGL_STEPS[S.i] || null; }
function lglPos(st) { if (!st)
return null; if (st.k === "pick") {
var S = lglState(), left = st.items.filter(function (it) { return !S.pk[it[0]]; });
var k = (left[0] || st.items[0])[0];
return LGL_ITEM[k];
} return typeof st.at === "string" ? LGL_AT[st.at] : st.at; }
function lglLocal() { var P = camera.position; return [P.x - LD.ox, P.z - LD.oz]; }
function lglTp(x, z, ya) { camera.position.set(LD.ox + x, camera.position.y, LD.oz + z); if (ya !== undefined && typeof yaw !== "undefined") {
try {
yaw = ya;
pitch = 0;
}
catch (e) { }
} LGL.last = null; }
function lglTone(f, s) { if (typeof playTone === "function")
try {
playTone(f, s || 0.2);
}
catch (e) { } }
function lglRoman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || String(n); }
function lglHud(html) { return __ZC(475, 21, this, arguments, new.target); }
function lglHudNow() { return __ZC(475, 22, this, arguments, new.target); }
function lglClearMarks() { return __ZC(475, 23, this, arguments, new.target); }
function lglItemMesh(key) { return __ZC(475, 24, this, arguments, new.target); }
function lglSetMarks() { return __ZC(475, 25, this, arguments, new.target); }
function lglLoad(then) { return __ZC(475, 26, this, arguments, new.target); }
function lglParas(i, book) {
var st = LGL_STEPS[i], nx = LGL_STEPS[i + 1], ch = book.ch[st.c - 1];
if (!ch)
return [];
var end = (nx && nx.c === st.c) ? nx.p : ch.p.length;
return ch.p.slice(st.p, end);
}
function lglPages(paras) {
var pages = [], cur = [], n = 0;
paras.forEach(function (p) { var w = p.split(/\s+/).length; if (n && n + w > 190) {
pages.push(cur);
cur = [];
n = 0;
} cur.push(p); n += w; });
if (cur.length)
pages.push(cur);
return pages;
}
function lglParaHtml(p) {
if (p.charAt(0) === "~")
return "<div style='margin:8px 0 8px 18px;font-style:italic;line-height:1.45'>" + esc(p.slice(1)).replace(/\n/g, "<br>") + "</div>";
return "<p style='margin:7px 0;line-height:1.5'>" + esc(p) + "</p>";
}
function lglRead(i, after, title) { return __ZC(475, 27, this, arguments, new.target); }
function lglAsk(i, after) { return __ZC(475, 28, this, arguments, new.target); }
function lglTrigger() {
var S = lglState(), i = S.i, st = LGL_STEPS[i];
if (!st || LGL.busy)
return;
LGL.ready = true;
lglTone(520, 0.15);
lglRead(i, function () { if (st.q)
lglAsk(i, function () { lglAdvance(i); });
else
lglAdvance(i); });
}
function lglAdvance(i) { return __ZC(475, 29, this, arguments, new.target); }
function lglFinish() { return __ZC(475, 30, this, arguments, new.target); }
function lglBookCard() { return __ZC(475, 31, this, arguments, new.target); }
function lglReread(c) { return __ZC(475, 32, this, arguments, new.target); }
function lglAct(T) { return __ZC(475, 33, this, arguments, new.target); }
function lglTick(dt) {
if (!lglHere()) {
if (LGL.hud && LGL.hud.style.display !== "none") {
lglHud(null);
if (typeof guideTo !== "undefined" && guideTo && guideTo.key === "lgl") {
try {
guideTo = null;
}
catch (e) { }
}
}
LGL.gRef = null;
return;
}
LGL.t += dt;
var S = lglState(), st = lglStepNow(), L = lglLocal();
if (LGL.gRef !== LD.g) {
LGL.gRef = LD.g;
LGL.set = null;
LGL.beacon = null;
LGL.items = [];
}
var open = typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block";
if (LGL.busy && !open && !LGL.loading) {
LGL.busy = false;
LGL.set = null;
}
var sig = S.i + ":" + Object.keys(S.pk).length + ":" + (S.b || 0) + ":" + (LGL.ready ? 1 : 0);
if (LGL.set !== sig)
lglSetMarks();
lglHudNow();
LGL.movers.forEach(function (M) {
if (M.wait > 0) {
M.wait -= dt;
return;
}
var dx = M.tx - M.x, dz = M.tz - M.z, d = Math.hypot(dx, dz);
if (d < 0.3) {
M.wait = 2 + Math.random() * 7;
var a = Math.random() * 6.283, r = Math.random() * M.r;
M.tx = M.hx + Math.cos(a) * r;
M.tz = M.hz + Math.sin(a) * r;
if (typeof worldSolidAt === "function" && worldSolidAt(LD.solids, M.tx, M.tz, 0)) {
M.tx = M.hx;
M.tz = M.hz;
}
return;
}
var s = Math.min(d, 1.1 * dt);
M.x += dx / d * s;
M.z += dz / d * s;
M.g.position.x = M.x - M.cx;
M.g.position.z = M.z - M.cz;
M.g.rotation.y = Math.atan2(dx, dz);
M.T.x = M.x;
M.T.z = M.z;
});
if (!st || LGL.busy || LGL.ready || open) {
LGL.last = L;
return;
}
var at = lglPos(st), d = Math.hypot(L[0] - at[0], L[1] - at[1]);
if (st.k === "go" && d < (st.r || 5)) {
lglTrigger();
}
else if (st.k === "away") {
var door = LGL_AT.door, gate = LGL_AT.gate;
if (d < 24 && L[1] < -70) {
S.b = (S.b || 0) + 1;
lglKeep();
lglTone(300, 0.3);
lglTp(gate[0], gate[1] + 3, Math.PI);
if (typeof setStatus === "function")
setStatus("The path gave a sudden twist and shook itself, and the next moment you found yourself actually walking in at the door.");
}
else if (S.b >= 1 && Math.hypot(L[0] - door[0], L[1] - door[1]) < 3.5) {
lglTp(0, -90, 0);
if (typeof setStatus === "function")
setStatus("It succeeded beautifully. You had not been walking a minute before you found yourself face to face with the Red Queen, and full in sight of the hill.");
lglTrigger();
}
}
else if (st.k === "run") {
if (LGL.last)
LGL.run += Math.min(3, Math.hypot(L[0] - LGL.last[0], L[1] - LGL.last[1]));
if (LGL.run >= 160) {
LGL.run = 0;
lglTp(at[0] - 2, at[1] + 2.5, 0);
if (typeof setStatus === "function")
setStatus("\"Why, I do believe we've been under this tree the whole time! Everything's just as it was!\"");
lglTrigger();
}
}
LGL.last = L;
}
(function () {
if (typeof LD_SETS === "undefined")
return;
if (typeof ldUse === "function") {
var lu = ldUse;
ldUse = function (T) { if (T && T.lgl !== undefined && typeof LD !== "undefined" && LD.kind === "mirror") {
try {
lglAct(T);
}
catch (e) {
if (window.console)
console.warn("looking-glass:", e);
}
return;
} return lu.apply(this, arguments); };
}
if (typeof ldTick === "function") {
var lt = ldTick;
ldTick = function (dt) { lt(dt); try {
lglTick(dt);
}
catch (e) {
if (window.console && !LGL.warned) {
LGL.warned = 1;
console.warn("looking-glass tick:", e);
}
} };
}
if (typeof ldStrip === "function") {
var ls = ldStrip;
ldStrip = function () {
var g = ls.apply(this, arguments);
try {
var n = g.attributes.normal, ix = g.index;
if (n && ix && n.count && n.getY(0) < 0) {
var a = ix.array;
for (var i = 0; i + 2 < a.length; i += 3) {
var t = a[i + 1];
a[i + 1] = a[i + 2];
a[i + 2] = t;
}
ix.needsUpdate = true;
g.computeVertexNormals();
}
}
catch (e) { }
return g;
};
}
})();
