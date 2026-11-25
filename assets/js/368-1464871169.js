/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DPX = { mats: {}, geos: {}, t: 0, doors: 0 };
function dpxLite() { return typeof LITE !== "undefined" && !!LITE; }
function dpxSay(h) { try {
setStatus(h);
}
catch (e) { } }
function dpxEsc(s) { return typeof esc === "function" ? esc(s) : String(s || "").replace(/[<>&"]/g, ""); }
(function () {
if (typeof REALMS === "undefined" || !REALMS.depths)
return;
REALMS.depths.dens = 1.15;
REALMS.depths.amb = 0.78;
REALMS.depths.light = 0x8FD4E0;
})();
function dpxMat(col, tex, o) { return __ZC(368, 0, this, arguments, new.target); }
function dpxGlow(col, op) { return dpxMat(col, null, { basic: true, op: op }); }
function dpxUV(g, su, sv) { var uv = g.attributes && g.attributes.uv; if (!uv)
return g; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * su / 2.2, uv.getY(i) * sv / 2.2); uv.needsUpdate = true; return g; }
function dpxAdd(g, geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
function dpxBox(g, w, h, d, mat, x, y, z, ry) { var geo = new THREE.BoxGeometry(w, h, d); if (typeof metreUVs === "function")
metreUVs(geo, "box", [w / 2.2, h / 2.2, d / 2.2]); return dpxAdd(g, geo, mat, x, y, z, 0, ry || 0, 0); }
function dpxCyl(g, rt, rb, h, mat, x, y, z, seg, open) { var geo = new THREE.CylinderGeometry(rt, rb, h, seg || 16, 1, !!open); dpxUV(geo, Math.PI * 2 * Math.max(rt, rb), h); return dpxAdd(g, geo, mat, x, y, z); }
function dpxCone(g, r, h, mat, x, y, z, seg) { var geo = new THREE.ConeGeometry(r, h, seg || 16); dpxUV(geo, Math.PI * 2 * r, h); return dpxAdd(g, geo, mat, x, y, z); }
function dpxSph(g, r, mat, x, y, z, seg, sy) { var s = seg || 14, geo = new THREE.SphereGeometry(r, s, Math.max(6, (s * 0.6) | 0)); dpxUV(geo, Math.PI * 2 * r, Math.PI * r); var m = dpxAdd(g, geo, mat, x, y, z); if (sy)
m.scale.y = sy; return m; }
function dpxDome(g, r, mat, x, y, z, seg, sy) { var s = seg || 20, geo = new THREE.SphereGeometry(r, s, Math.max(5, (s * 0.4) | 0), 0, Math.PI * 2, 0, Math.PI / 2); dpxUV(geo, Math.PI * 2 * r, Math.PI * r / 2); var m = dpxAdd(g, geo, mat, x, y, z); if (sy)
m.scale.y = sy; return m; }
function dpxTorus(g, r, t, mat, x, y, z, rx, arc, seg) { var geo = new THREE.TorusGeometry(r, t, 6, seg || 24, arc || Math.PI * 2); dpxUV(geo, (arc || Math.PI * 2) * r, Math.PI * 2 * t); return dpxAdd(g, geo, mat, x, y, z, rx || 0, 0, 0); }
function dpxLathe(g, pts, mat, x, y, z, seg) { return __ZC(368, 1, this, arguments, new.target); }
function dpxGothic(w, h) { var s = new THREE.Shape(), r = w / 2, sh = h - w * 0.75; s.moveTo(-r, 0); s.lineTo(r, 0); s.lineTo(r, sh); s.quadraticCurveTo(r, sh + w * 0.55, 0, h); s.quadraticCurveTo(-r, sh + w * 0.55, -r, sh); s.lineTo(-r, 0); return s; }
function dpxRound(w, h) { var s = new THREE.Shape(), r = w / 2, sh = h - r; s.moveTo(-r, 0); s.lineTo(r, 0); s.lineTo(r, sh); s.absarc(0, sh, r, 0, Math.PI, false); s.lineTo(-r, 0); return s; }
function dpxFlat(g, shape, mat, x, y, z, ry) { var geo = new THREE.ShapeGeometry(shape, 6); return dpxAdd(g, geo, mat, x, y, z, 0, ry || 0, 0); }
function dpxSlab(g, shape, depth, mat, x, y, z, ry) { var geo = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: false, curveSegments: 8 }); geo.translate(0, 0, -depth / 2); dpxUV(geo, 1, 1); return dpxAdd(g, geo, mat, x, y, z, 0, ry || 0, 0); }
function dpxCoralTree(g, mat, x, y, z, size, seed, tipMat) { return __ZC(368, 2, this, arguments, new.target); }
function dpxScallopGeo(r, ribs) { return __ZC(368, 3, this, arguments, new.target); }
function dpxConchGeo(r, h) { return __ZC(368, 4, this, arguments, new.target); }
function dpxConchSeam(g, r, h, mat, y0) { return __ZC(368, 5, this, arguments, new.target); }
function dpxDoorAdd(it) { return __ZC(368, 6, this, arguments, new.target); }
function dpxDo(P, x, z, r, name, verb, fn) { P.items.push({ t: "dpxdo", x: x, z: z, r: r || 3, name: name, verb: verb, fn: fn }); }
(function () {
if (typeof ldPut === "function") {
var lp = ldPut;
ldPut = function (it) {
if (it && it.t === "dpxdo") {
LD.talkers.push({ x: it.x, z: it.z, r: it.r, name: it.name, verb: it.verb, dpxFn: it.fn });
return;
}
var r = lp.apply(this, arguments);
try {
if (it && it.t === "m" && it.dpxDoor)
dpxDoorAdd(it);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] door", e);
}
return r;
};
}
if (typeof ldUse === "function") {
var lu = ldUse;
ldUse = function (T) { if (T && T.dpxFn) {
try {
T.dpxFn(T);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] do", e);
}
return;
} return lu.apply(this, arguments); };
}
if (typeof ldDrop === "function") {
var dd = ldDrop;
ldDrop = function () { DPX.doors = 0; return dd.apply(this, arguments); };
}
})();
function dpxBuilding(P, x, z, rot, hw, hd, h, fn, door) {
var it = P.make(x, z, rot, Math.max(hw, hd), fn, { hw: hw, hd: hd, h: h });
if (door) {
door.lz = door.lz !== undefined ? door.lz : hd + 0.6;
it.dpxDoor = door;
}
return it;
}
var DPX_PARTS = [];
(function () {
if (typeof LD_SETS === "undefined" || !LD_SETS.depths)
return;
var base = LD_SETS.depths;
LD_SETS.depths = function (P) {
base(P);
P.items = P.items.filter(function (it) { return !(it.t === "k" && it.a === "merpalace"); });
DPX_PARTS.forEach(function (f) { try {
f(P);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] part", e);
} });
};
})();
function dpxCard(title, body, btns) { return __ZC(368, 7, this, arguments, new.target); }
function dpxClose() { if (typeof worldCard === "function")
worldCard(null); }
function dpxPick(list) { return list[(Math.random() * list.length) | 0]; }
function dpxQuiz(title, qs, done) { return __ZC(368, 8, this, arguments, new.target); }
function dpxGot() { try {
return JSON.parse(localStorage.getItem("dpx_found") || "{}") || {};
}
catch (e) {
return DPX.found || (DPX.found = {});
} }
function dpxMark(k) { var f = dpxGot(); f[k] = 1; DPX.found = f; try {
localStorage.setItem("dpx_found", JSON.stringify(f));
}
catch (e) { } return f; }
function dpxTest() { return { doors: typeof EVB !== "undefined" ? EVB.doors.filter(function (q) { return q.spec.evb && q.spec.evb.dpx; }).map(function (q) { return q.spec.label + "|" + q.spec.evb.theme; }) : [], themes: typeof EVB_THEMES !== "undefined" ? Object.keys(EVB_THEMES).filter(function (k) { return /^dpx/.test(k); }) : [] }; }
"use strict";
var DPX_PAL = { coral: 0xD8705E, coralDeep: 0xB8504A, coralPale: 0xE8B8A8, pearl: 0xEDE8F2, nacre: 0xD8E4EC, amber: 0xFFB347, amberGlow: 0xC8701A,
sea: 0x2E8A9A, kelp: 0x4E7A3A, bone: 0xE6DEC8, rock: 0x5A6260, gold: 0xE8C060, sand: 0xD8C8A0 };
var DPX_KING = { x: 0, z: -262 };
var DPX_TOWN = [{ x: -215, z: -250, name: "Shellhaven West" }, { x: 215, z: -270, name: "Shellhaven East" }];
var DPX_WITCH = { x: -440, z: -600 };
var DPX_KING_STEPS = (function () { var L = []; for (var s = 0; s < 6; s++)
L.push({ w: 34 - s * 0.6, top: 3 - s * 0.5, z0: 44 + s * 2.2, z1: 46.2 + s * 2.2 }); return L; })();
var DPX_DECKS = [];
function dpxPalaceSolid() { return __ZC(368, 9, this, arguments, new.target); }
(function () {
if (typeof supportAt !== "function")
return;
var sa = supportAt;
supportAt = function (x, z, feet) {
var h = sa.apply(this, arguments);
try {
if (DPX_DECKS.length && typeof LD !== "undefined" && LD.g && DPX_DECKS.dpxFor === LD.solids && store.here === LD.rid && !store.inside && !(typeof WLD !== "undefined" && WLD.on)) {
var lx = x - LD.ox, lz = z - LD.oz, reach = (feet === undefined ? 1e9 : feet + (typeof STEP_UP !== "undefined" ? STEP_UP : 0.62) + 0.02);
for (var i = 0; i < DPX_DECKS.length; i++) {
var d = DPX_DECKS[i];
if (lx < d.x0 || lx > d.x1 || lz < d.z0 || lz > d.z1)
continue;
var t = ldY(d.x0 / 2 + d.x1 / 2, d.z0 / 2 + d.z1 / 2) + d.top;
if (t > h && t <= reach)
h = t;
}
}
}
catch (e) { }
return h;
};
})();
function dxsFit(m, w, h) { try {
if (window.DXU_OFF)
return m;
var p = m.geometry.attributes.position, uv = m.geometry.attributes.uv;
for (var i = 0; i < p.count; i++)
uv.setXY(i, (p.getX(i) + w / 2) / w, p.getY(i) / h);
uv.needsUpdate = true;
}
catch (e) { } return m; }
function DPX_CT() { return window.DXU_OFF ? "stone" : "dxucoral"; }
function dpxPalace(G, H) { return __ZC(368, 10, this, arguments, new.target); }
function dpxMerStatue(G, x, y, z, ry, mb, gold) { return __ZC(368, 11, this, arguments, new.target); }
function dpxClamUrn(G, x, y, z, ry, shell, gold, glows, seed) { return __ZC(368, 12, this, arguments, new.target); }
function dpxSeaFan(G, x, y, z, ry, h, mat) { return __ZC(368, 13, this, arguments, new.target); }
function dpxPalaceDress(G) { return __ZC(368, 14, this, arguments, new.target); }
function dpxPalaceFountains(G) { return __ZC(368, 15, this, arguments, new.target); }
function dpxShellRoof(G) { return __ZC(368, 16, this, arguments, new.target); }
function dpxFlowers(G, shape, cols, n, seed, y) { return __ZC(368, 17, this, arguments, new.target); }
function dpxBed(G, shape, col, flowers, seed) { return __ZC(368, 18, this, arguments, new.target); }
var DPX_BEDS = [
{ who: "the eldest princess", shape: "whale", x: -30, z: -130, cols: [0x3A6AE8, 0x6AA8FF, 0xB8D8FF] },
{ who: "the second princess", shape: "mermaid", x: 30, z: -130, cols: [0xFF8AC0, 0xFFC0E0, 0xE8306E] },
{ who: "the third princess", shape: "star", x: -30, z: -160, cols: [0xFFD84A, 0xFFF0A0, 0xF2A040] },
{ who: "the fourth princess", shape: "shell", x: 30, z: -160, cols: [0xA860FF, 0xD8B0FF, 0x6A3AC8] },
{ who: "the fifth princess", shape: "seahorse", x: -30, z: -188, cols: [0x2AD8A0, 0x9AF0C8, 0x18A880] },
{ who: "the youngest princess", shape: "sun", x: 30, z: -188, cols: [0xE82A2A, 0xFF4A2A, 0xC81818] }
];
function dpxBedShape(kind) { return __ZC(368, 19, this, arguments, new.target); }
function dpxStatue(G) { return __ZC(368, 20, this, arguments, new.target); }
function dpxWillow(G, x, z) { return __ZC(368, 21, this, arguments, new.target); }
var DPX_HOUSES = [
["The Pearl-Diver's House", "a pearl diver and her family"], ["The Kelp-Farmer's House", "a kelp farmer and his children"], ["The Net-Weaver's House", "the old net-weaver"],
["The Shell-Carver's House", "a carver of shells and combs"], ["The Song-Keeper's House", "the keeper of the merfolk's songs"], ["The Seahorse-Breeder's House", "the seahorse breeder"],
["The Tide-Reader's House", "the tide-reader, who knows the currents"], ["The Lamp-Maker's House", "the lamp-maker, who keeps glowing creatures in jars"], ["The Sponge-Gatherer's House", "the sponge gatherers"],
["The Coral-Gardener's House", "the coral gardener and her sisters"], ["The Harp-Maker's House", "the harp-maker"], ["The Wreck-Diver's House", "a diver who mends what the wrecks give up"],
["The Healer's House", "the healer, who knows every sea plant"], ["The Storyteller's House", "the old storyteller"], ["The Pearl-Polisher's House", "the pearl polisher"],
["The Dolphin-Keeper's House", "the dolphin keeper"], ["The Scribe's House", "the scribe who writes in spirals"], ["The Glass-Blower's House", "a maker of sea-glass"],
["The Pilot's House", "a pilot who guides ships safely past the rocks"], ["The Grandmother's House", "a merfolk grandmother and her twelve oysters"]
];
var DPX_HOUSE_THEME = ["dpxhome_pearl", "dpxhome_coral", "dpxhome_kelp"];
function dpxHouseConch(G, col, seed) { return __ZC(368, 22, this, arguments, new.target); }
function dpxHouseDome(G, col, seed) { return __ZC(368, 23, this, arguments, new.target); }
function dpxHouseClam(G, col, seed) { return __ZC(368, 24, this, arguments, new.target); }
var DPX_HOUSE_KINDS = [dpxHouseConch, dpxHouseDome, dpxHouseClam];
var DPX_HOUSE_COLS = [0xF2E4DC, 0xF0C8B8, 0xE8D8F0, 0xD8ECE4, 0xF8DCC0, 0xE8B8C8];
function dpxWitchHouse(G) { return __ZC(368, 25, this, arguments, new.target); }
function dpxPolyp(G, x, z, s, seed) { return __ZC(368, 26, this, arguments, new.target); }
function dpxWhirl(G) { return __ZC(368, 27, this, arguments, new.target); }
function dpxShafts(G, list) {
var m = dpxMat(0xBFF4FF, null, { basic: true, op: 0.07, add: true });
m.side = THREE.DoubleSide;
list.forEach(function (q) { var c = new THREE.Mesh(new THREE.CylinderGeometry(q[2] * 0.35, q[2], 150, 12, 1, true), m); c.position.set(q[0], 75, q[1]); c.rotation.z = 0.08; G.add(c); });
}
function dpxShoal(G, n, r, col, seed) { return __ZC(368, 28, this, arguments, new.target); }
DPX_PARTS.push(function (P) {
var L = "the Deep", lite = P.lite, K = DPX_KING;
P.path([[0, -62], [0, -206]], 6, 0xC8B898, "crystalbrazier", 16);
P.path([[-12, -112], [-46, -112], [-46, -200], [-12, -200]], 2.6, 0xB8A888);
P.path([[12, -112], [46, -112], [46, -200], [12, -200]], 2.6, 0xB8A888);
dpxBuilding(P, K.x, K.z, 0, 62, 48, 60, dpxPalace, { theme: "dpxpalace", name: "The Sea King's Palace", doors: "the amber doors", lz: 23.2 }).solid = null;
P.make(K.x, K.z, 0, 1, dpxShellRoof);
P.make(K.x, K.z, 0, 1, dpxPalaceFountains);
P.sign(25, -204, 0, ["The Sea King's Palace", "Press E to read"], ["The Sea King's Palace", "As Hans Christian Andersen told it, 1837", [
"“Far out in the ocean, where the water is as blue as the prettiest cornflower, and as clear as crystal, it is very, very deep.”",
"“The walls are built of coral, and the long Gothic windows are of the clearest amber. The roof is formed of shells, that open and close as the water flows over them.”",
"The Sea King had been a widower for many years. His old mother kept house for him, and she wore twelve oysters on her tail to show her high rank.",
"Walk up to the amber doors to go in: three floors of rooms, every one of them of the sea."
]]);
DPX_BEDS.forEach(function (b, i) {
P.make(b.x, b.z, 0, 13, function (G) { dpxBed(G, dpxBedShape(b.shape), 0, b.cols, 7700 + i); if (b.shape === "sun") {
dpxStatue(G);
dpxWillow(G, 5.2, -3);
} }, null);
P.fact(b.x + (b.x < 0 ? 12 : -12), b.z + 3, 3, "The garden of " + b.who, "look at it", ["The garden of " + b.who, "The Little Mermaid, by Hans Christian Andersen", [
b.shape === "sun" ? "“The youngest made hers round like the sun, with flowers as red as his rays at sunset.” She wanted nothing else in it but a marble statue of a handsome boy, found in a wreck, and she planted a rose-coloured weeping willow by it." :
b.shape === "whale" ? "“Each of the young princesses had a little plot of ground in the garden, where she might dig and plant as she pleased. One arranged her flower-bed into the form of a whale.”" :
b.shape === "mermaid" ? "“Another thought it better to make hers like the figure of a little mermaid.”" :
"Andersen names three of the six gardens (a whale, a little mermaid, and the round red sun). This sister chose the " + b.shape + ".",
"Each sister was a year younger than the next. On her fifteenth birthday each was allowed to rise to the surface for the first time and see the world above."
]]);
});
var R = wRand(7731), tc = [0xD82A1A, 0x1A3AA8, 0xE8401A, 0x2A2A9A];
for (var t = 0; t < (lite ? 10 : 22); t++) {
var side = t % 2 ? 1 : -1, z = -104 - R() * 100, x = side * (56 + R() * 26);
P.make(x, z, R() * 6, 3, (function (seed, col) { return function (G) { dpxCoralTree(G, dpxMat(col, "bark"), 0, 0, 0, 6 + wRand(seed)() * 4, seed, dpxMat(col === 0x1A3AA8 || col === 0x2A2A9A ? 0x6A8AFF : 0xFFB02A, null, { e: 0x402000, ei: 0.4 })); }; })(7740 + t, tc[t % 4]), null);
}
P.being("mermaid", 34, -180, -0.8, 1.05, ldWho("The youngest princess", L, "the youngest daughter of the Sea King in Hans Christian Andersen's The Little Mermaid (1837), before her fifteenth birthday: quiet and thoughtful, who loves her round red garden, the marble statue in it, and above all hearing about the world above the sea. She has the loveliest voice in the sea. Never use any film or cartoon version; only Andersen's story", "Oh! Have you come from up there? Tell me, is it true that the flowers have a scent, and the fish in the trees sing? Grandmother calls the birds fish, so that we will understand."), { r: 5, sp: 0.3 });
P.being("merman", -10, -206, 0, 1.2, ldWho("The Sea King's herald", L, "the herald at the Sea King's door in Andersen's tale: grand, kindly, proud of the palace", "The King is at home. Mind the amber doors; they are older than the oldest wreck."));
var hi = 0;
DPX_TOWN.forEach(function (T, ti) {
P.path([[ti ? 60 : -60, -150], [T.x + (ti ? -40 : 40), T.z + 20]], 3, 0xB8A888, "crystalbrazier", 22);
P.k("bubbles", T.x, T.z, 0, 1.4);
P.k("giantclam", T.x + 6, T.z + 4, 1, 1.1);
P.sign(T.x + (ti ? -12 : 12), T.z + 14, ti ? 0.5 : -0.5, [T.name, "Press E to read"], [T.name, "The merfolk's town", ["The merfolk of the Deep live in houses grown from shells and coral round a square where the bubbles rise.", "Andersen wrote that merfolk live for three hundred years, and when they end they become foam on the sea.", "Every house here can be walked into. Each family keeps it its own way."]]);
var n = lite ? 8 : 10;
for (var k = 0; k < n; k++) {
var a = (ti ? Math.PI * 0.15 : -Math.PI * 0.15) + (k / (n - 1) - 0.5) * Math.PI * 1.35, rr = 48 + (k % 2) * 14, x = T.x + Math.sin(a) * rr, z = T.z - Math.cos(a) * rr * 0.85;
var face = Math.atan2(T.x - x, T.z - z), H = DPX_HOUSES[hi % DPX_HOUSES.length], kind = hi % 3, col = DPX_HOUSE_COLS[(hi * 5) % DPX_HOUSE_COLS.length], idx = hi;
dpxBuilding(P, x, z, face, 7.6, 7.6, 16, (function (kind, col, seed) { return function (G) { DPX_HOUSE_KINDS[kind](G, col, seed); }; })(kind, col, idx + 1), { theme: DPX_HOUSE_THEME[kind], name: H[0], doors: "the round door", who: H[1], lz: kind === 1 ? 7.7 : kind === 0 ? 6.7 : 6.6 }).solid = { r: 7.4, h: 16 };
hi++;
}
for (var m = 0; m < (lite ? 3 : 6); m++)
P.being(m % 2 ? "mermaid" : "merman", T.x + (m - 3) * 6, T.z + 8 + (m % 3) * 4, m, 0.95 + (m % 3) * 0.1, null, { r: 14, sp: 0.6 });
P.being("seahorse", T.x - 8, T.z - 6, 0, 1.4, null, { r: 8, sp: 0.4 });
P.being("crab", T.x + 10, T.z - 3, 1, 1.2, null, { r: 5, sp: 0.3 });
});
P.being("mermaid", DPX_TOWN[0].x + 4, DPX_TOWN[0].z + 14, 0.5, 1, ldWho("A merfolk mother", L, "a merfolk mother in the shell town of the Deep, busy and cheerful, raising four children and a pet seahorse", "Mind the little ones, they dart about like sprats. Have you seen inside our houses? Go in, go in; nobody locks a door in Shellhaven."));
P.being("merman", DPX_TOWN[1].x - 4, DPX_TOWN[1].z + 14, -0.5, 1, ldWho("An old net-weaver", L, "an old merman net-weaver in the shell town of the Deep who has mended nets for two hundred years and loves telling the old tales of the sea", "Two hundred years I've knotted nets, and I still learn a new knot from the young ones. Ask me about the Sea King's daughters; I knew their grandmother when she wore only six oysters."));
var W = DPX_WITCH;
[[-300, -430], [-336, -470], [-372, -430], [-318, -506], [-360, -520]].forEach(function (q, i) { if (lite && i > 2)
return; P.make(q[0], q[1], 0, 10, dpxWhirl, null); });
P.sign(-280, -400, -0.8, ["Past the whirlpools", "The Sea Witch's wood"], ["The way to the Sea Witch", "The Little Mermaid, by Hans Christian Andersen", ["“She had to pass through the middle of these crushing whirlpools to get to the Sea Witch's domain.”", "“Her house stood in the centre of a strange forest, where all the trees and flowers were polypi, half animals and half plants.”", "Nothing here can hurt you: it is a dream, and the whirlpools only spin."]]);
var RP = wRand(8810);
for (var p = 0; p < (lite ? 30 : 64); p++) {
var a = RP() * 6.283, d = 24 + RP() * 42;
P.make(W.x + Math.sin(a) * d, W.z + Math.cos(a) * d, RP() * 6, 1.5, (function (seed) { return function (G) { dpxPolyp(G, 0, 0, 0.9 + wRand(seed)() * 0.6, seed); }; })(8820 + p), null);
}
P.path([[-300, -460], [W.x + 10, W.z + 30]], 2.4, 0x8A8478);
dpxBuilding(P, W.x, W.z, 0.4, 15, 15, 16, dpxWitchHouse, { theme: "dpxwitch", name: "The Sea Witch's House", doors: "the jawbone door", lz: 16.5 }).solid = { r: 15.6, h: 13.6 };
P.make(0, 0, 0, 0.1, function (G) { dpxShafts(G, [[0, -150, 26], [-60, -260, 30], [70, -300, 26], [-215, -250, 30], [215, -270, 30], [120, 40, 22], [-120, -60, 24], [0, -420, 30]].slice(0, lite ? 4 : 8)); }, null);
[[0, -130, 40, 0xF8C84A], [-200, -230, 30, 0x6AD8FF], [210, -250, 30, 0xFF8A6A], [40, -60, 24, 0xC8F0FF], [-60, -320, 36, 0x9AF0C8], [60, -320, 30, 0xFFE07A]].slice(0, lite ? 3 : 6).forEach(function (s, i) {
P.make(s[0], s[1], 0, 0.1, function (G) { var S = new THREE.Group(); S.position.y = 8 + i * 2; G.add(S); dpxShoal(S, lite ? 20 : 44, s[2] * 0.4, s[3], 9100 + i); return true; }, null);
});
});
"use strict";
var DPX_ATL = { x: 640, z: -520, island: 85, w1: [85, 100], l1: [100, 128], w2: [128, 148], l2: [148, 190], w3: [190, 212], canal: [212, 360] };
var DPX_AXES = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
function dpxAnnulus(G, H, r0, r1, mat, lift, segA) { return __ZC(368, 29, this, arguments, new.target); }
function dpxStrip(G, H, x0, z0, x1, z1, w, mat, lift) { return __ZC(368, 30, this, arguments, new.target); }
function dpxGapAt(a, gaps, half) { for (var i = 0; i < gaps.length; i++) {
var d = Math.abs(((a - gaps[i]) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
if (d < half)
return true;
} return false; }
function dpxRingWall(G, H, ox, oz, r, h, thick, mat, cap, gaps, gapW, tower, towerMat) { return __ZC(368, 31, this, arguments, new.target); }
function dpxQuay(G, H, ox, oz, r, gaps, gapW) { return __ZC(368, 32, this, arguments, new.target); }
function dpxBridge(G, H, a, r0, r1, w, stone, trim) { return __ZC(368, 33, this, arguments, new.target); }
function dpxTempleOut(G) { return __ZC(368, 34, this, arguments, new.target); }
function dpxGoldFence(G, H, w, d, gapZ) { return __ZC(368, 35, this, arguments, new.target); }
function dpxAtlPalaceOut(G) { return __ZC(368, 36, this, arguments, new.target); }
function dpxBathsOut(G) { return __ZC(368, 37, this, arguments, new.target); }
function dpxGymOut(G) { return __ZC(368, 38, this, arguments, new.target); }
function dpxShrineOut(G) { return __ZC(368, 39, this, arguments, new.target); }
function dpxGuardOut(G) { return __ZC(368, 40, this, arguments, new.target); }
function dpxAtlHouseOut(G, seed) { return __ZC(368, 41, this, arguments, new.target); }
function dpxDockOut(G) { return __ZC(368, 42, this, arguments, new.target); }
function dpxTriremeOut(G) { return __ZC(368, 43, this, arguments, new.target); }
function dpxKingOut(G) { return __ZC(368, 44, this, arguments, new.target); }
DPX_PARTS.push(function (P) {
var A = DPX_ATL, lite = P.lite, L = "Atlantis";
var water = dpxMat(0x9A8A6A, window.DXU_OFF ? "sand" : "dxusilt"), pave = dpxMat(0xE0DACA, window.DXU_OFF ? "paving" : "dxuslab"), sand = dpxMat(0xC8B088, window.DXU_OFF ? "sand" : "dxusand"), white = dpxMat(0xECE6DA, "stone"), red = dpxMat(0xA8442E, "stone");
var brass = dpxMat(0xC8984A, "metal", { e: 0x4A3208, ei: 0.45 }), tin = dpxMat(0xD0D4D8, "metal", { e: 0x40444A, ei: 0.5 }), orich = dpxMat(window.DXU_OFF ? 0xF0A060 : 0xB8784A, window.DXU_OFF ? "metal" : "dxuorich", { e: 0x5A2008, ei: 0.35 });
P.path([[40, -40], [260, -120], [480, -150], [A.x - 26, A.z + A.canal[1] - 4]], 7, 0xB8B0A0, "crystalbrazier", 26);
P.make(A.x, A.z, 0, 1, function (G, H) {
dpxAnnulus(G, H, 0, A.island, pave, 0.08);
dpxAnnulus(G, H, A.w1[0], A.w1[1], water, 0.12);
dpxAnnulus(G, H, A.l1[0], A.l1[1], dpxMat(0xD8D0BC, window.DXU_OFF ? "paving" : "dxuslab"), 0.08);
dpxAnnulus(G, H, A.w2[0], A.w2[1], water, 0.12);
dpxAnnulus(G, H, A.l2[0], A.l2[1], dpxMat(0xD0C8B0, window.DXU_OFF ? "paving" : "dxuslab"), 0.08);
dpxAnnulus(G, H, A.w3[0], A.w3[1], water, 0.12);
dpxAnnulus(G, H, 160, 176, sand, 0.14);
dpxStrip(G, H, 0, A.w3[1] - 2, 0, A.canal[1], 18, water, 0.12);
dpxAnnulus(G, H, 0.01, 26, water, 0.13).position.z = A.canal[1] + 20;
DPX_AXES.forEach(function (a) {
dpxBridge(G, H, a, A.w1[0], A.w1[1], 8, white, red);
dpxBridge(G, H, a, A.w2[0], A.w2[1], 8, white, red);
dpxBridge(G, H, a, A.w3[0], A.w3[1], 8, white, red);
dpxStrip(G, H, Math.sin(a) * A.island * 0.5, Math.cos(a) * A.island * 0.5, Math.sin(a) * A.w3[1], Math.cos(a) * A.w3[1], 7, dpxMat(0xE8E0D0, "paving"), 0.16);
});
var gw = 10;
dpxQuay(G, H, A.x, A.z, A.w1[0], DPX_AXES, gw);
dpxQuay(G, H, A.x, A.z, A.w1[1], DPX_AXES, gw);
dpxQuay(G, H, A.x, A.z, A.w2[0], DPX_AXES, gw);
dpxQuay(G, H, A.x, A.z, A.w2[1], DPX_AXES, gw);
dpxQuay(G, H, A.x, A.z, A.w3[0], DPX_AXES, gw);
dpxQuay(G, H, A.x, A.z, A.w3[1], DPX_AXES.concat([0.06, -0.06]), gw + 16);
dpxRingWall(G, H, A.x, A.z, A.island - 1.5, 7, 1.6, orich, orich, DPX_AXES, 12, lite ? 0 : 6, orich);
dpxRingWall(G, H, A.x, A.z, A.l1[1] - 1.5, 8, 1.8, tin, white, DPX_AXES, 12, lite ? 0 : 7, white);
dpxRingWall(G, H, A.x, A.z, A.l2[1] - 1.5, 9, 2, brass, white, DPX_AXES, 12, lite ? 0 : 8, white);
[-1, 1].forEach(function (sd) { for (var z = A.w3[1] + 4; z < A.canal[1]; z += lite ? 12 : 8) {
dpxBox(G, 0.9, 2.4, lite ? 12 : 8, [white, dpxMat(0x3A3634, "stone"), red][Math.round(z / 8) % 3], sd * 9.5, H.y(sd * 9.5, z), z);
LD.solids.push({ x: A.x + sd * 9.5, z: A.z + z, rot: 0, hw: 0.6, hd: (lite ? 12 : 8) / 2, h: 1.2 });
} });
}, null);
dpxBuilding(P, A.x, A.z - 20, 0, 17, 31, 30, dpxTempleOut, { theme: "dpxatltemple", name: "The Temple of Poseidon", doors: "the silver doors", lz: 25.7 });
P.make(A.x, A.z - 20, 0, 1, function (G, H) { dpxGoldFence(G, H, 40, 70); }, null);
dpxBuilding(P, A.x + 40, A.z + 30, -0.75, 22, 17, 30, dpxAtlPalaceOut, { theme: "dpxatlpalace", name: "The Palace of the Ten Kings", doors: "the orichalcum doors", lz: 15.8 });
dpxBuilding(P, A.x - 40, A.z + 30, 0.75, 12, 10, 18, dpxBathsOut, { theme: "dpxatlbaths", name: "The Baths of the Springs", doors: "the bath house doors", lz: 9.8 });
P.make(A.x - 24, A.z + 54, 0, 2, function (G) {
var w = dpxMat(0xF0ECE4, "marble");
dpxCyl(G, 2.4, 2.6, 1.2, w, 0, 0.6, 0, 20);
dpxCyl(G, 2.2, 2.2, 0.05, dpxMat(0xF0A060, null, { e: 0x8A3A10, ei: 0.8 }), 0, 1.21, 0, 20);
if (!dpxLite() && typeof particles === "function") {
var p = particles(50, [3, 8, 3], 0xF8F8FF, 1.6, 0.35);
p.position.y = 5;
G.add(p);
}
}, { r: 2.6, h: 1.2 });
P.make(A.x - 14, A.z + 62, 0, 2, function (G) { var w = dpxMat(0xF0ECE4, "marble"); dpxCyl(G, 2.4, 2.6, 1.2, w, 0, 0.6, 0, 20); dpxCyl(G, 2.2, 2.2, 0.05, dpxMat(0x7AD8F0, null, { e: 0x10405A, ei: 0.8 }), 0, 1.21, 0, 20); dpxCyl(G, 0.3, 0.6, 2.4, dpxMat(0xBFEFFF, null, { op: 0.5 }), 0, 2.2, 0, 10); }, { r: 2.6, h: 1.2 });
dpxDo(P, A.x - 19, A.z + 58, 4, "The two springs", "feel the hot one and the cold one", function () { dpxActSprings(); });
for (var k = 0; k < 10; k++) {
var side = k % 2 ? 1 : -1, zz = A.z + 26 + ((k / 2) | 0) * 6.5;
P.make(A.x + side * 7, zz, side > 0 ? -Math.PI / 2 : Math.PI / 2, 1.4, function (G) { dpxKingOut(G); }, { r: 1.4, h: 6 });
}
dpxDo(P, A.x, A.z + 58, 4, "The golden kings", "learn their names", function () { dpxActKings(); });
var RG = wRand(5150);
for (var t = 0; t < (lite ? 8 : 18); t++) {
var a = Math.PI * 0.62 + RG() * Math.PI * 0.76, r = 62 + RG() * 16;
if (Math.abs(Math.sin(a) * r) < 7)
a += 0.2;
P.make(A.x + Math.sin(a) * r, A.z + Math.cos(a) * r, RG() * 6, 2, (function (seed) { return function (G) { dpxCoralTree(G, dpxMat(0x5A4A30, "bark"), 0, 0, 0, 7 + wRand(seed)() * 4, seed, dpxMat([0x4AA85A, 0xE8C060, 0x7ACA6A][seed % 3])); }; })(5160 + t), null);
}
dpxDo(P, A.x - 30, A.z - 66, 4, "The grove of Poseidon", "walk among the trees", function () { dpxActGrove(); });
var r1 = (A.l1[0] + A.l1[1]) / 2, r2 = (A.l2[0] + A.l2[1]) / 2;
function onRing(r, a) { return [A.x + Math.sin(a) * r, A.z + Math.cos(a) * r, Math.atan2(-Math.sin(a), -Math.cos(a))]; }
[["The Shrine of Cleito", 0.8], ["The Shrine of Atlas", 2.35], ["The Shrine of the Nereids", 3.95], ["The Shrine of the Springs", 5.5]].forEach(function (s) {
var q = onRing(r1, s[1]);
dpxBuilding(P, q[0], q[1], q[2], 6.5, 7.5, 12, dpxShrineOut, { theme: "dpxatlshrine", name: s[0], doors: "the shrine doors", lz: 7.5, shrine: s[0] });
});
[0.33, 1.9, 3.47, 5.04].forEach(function (a, i) { var q = onRing(r1, a); dpxBuilding(P, q[0], q[1], q[2], 5, 5, 14, dpxGuardOut, { theme: "dpxatlguard", name: "The Guard House of the " + ["South", "East", "North", "West"][i] + " Bridge", doors: "the bronze door", lz: 5.6 }); });
var gq = onRing(r1, 2.95);
dpxBuilding(P, gq[0], gq[1], gq[2], 14, 9, 10, dpxGymOut, { theme: "dpxatlgym", name: "The Gymnasium", doors: "the gymnasium doors", lz: 9.6 });
var hs = ["The House of Evaemon's Line", "The House of the Harbour Master", "The House of the Bronze-Smith", "The House of the Weavers", "The House of the Charioteer", "The House of the Priest",
"The House of the Scribe", "The House of the Potter", "The House of the Shipwright", "The House of the Physician", "The House of the Merchant", "The House of the Musician"];
var hi = 0;
[0.42, 1.15, 2.0, 2.7, 3.6, 4.3, 5.0, 5.85].forEach(function (a, i) {
if (lite && i % 4 === 3)
return;
[153, 181].forEach(function (r, j) {
if (hi >= hs.length || (j && i % 2))
return;
var q = onRing(r, a + (j ? 0.12 : 0)), rot = j ? q[2] + Math.PI : q[2];
dpxBuilding(P, q[0], q[1], rot, 6.5, 6.5, 9, (function (seed) { return function (G) { dpxAtlHouseOut(G, seed); }; })(hi + 3), { theme: "dpxatlhouse", name: hs[hi], doors: "the house door", lz: 7.1 });
hi++;
});
});
[-1, 1].forEach(function (sd) { dpxBuilding(P, A.x + sd * 30, A.z + A.canal[0] + 60, sd * Math.PI / 2, 8, 17, 12, dpxDockOut, { theme: "dpxatldock", name: sd < 0 ? "The West Ship Sheds" : "The East Ship Sheds", doors: "the shed doors", lz: 17.2 }); });
[[0, A.canal[0] + 40], [0, A.canal[1] + 20], [10, A.canal[1] + 12]].slice(0, lite ? 2 : 3).forEach(function (p, i) { P.make(A.x + p[0], A.z + p[1], i === 2 ? 0.8 : 0, 2, function (G) { var S = new THREE.Group(); S.position.y = 0.4; G.add(S); dpxTriremeOut(S); }, null); });
P.sign(A.x + 12, A.z + A.canal[1] - 6, 0, ["Atlantis", "Press E to read"], ["Atlantis", "As Plato told it, about 360 BC", [
"Plato's dialogues Timaeus and Critias tell of an island \"larger than Libya and Asia put together\", beyond the Pillars of Heracles (the Strait of Gibraltar), ruled by kings descended from the sea god Poseidon.",
"Its city was built in rings: three of water and two of land round a central hill. Bridges crossed the rings; a canal ran in from the sea.",
"Plato says it sank \"in a single day and night of misfortune\", 9,000 years before the time of Solon.",
"Most historians think Plato made the story up, as a lesson about pride and power. No trace of it has ever been found.",
"Walk in along the canal, cross the bridges, and every building can be entered."
]]);
P.person("solon", A.x - 14, A.z + A.canal[1] - 10, 0.6, { sex: "m", look: { top: 0xE8E0D0, topKind: "robe", bottom: 0xE8E0D0, shoes: 0x6A4A2A, skin: 0xC8A080, hair: 0xD8D8D8, beard: "long" } }, ldWho("Solon of Athens", L, "Solon of Athens (about 630 to 560 BC), the great lawgiver and poet, who (Plato says) heard the story of Atlantis from the priests of Sais in Egypt and passed it down through his family to Critias. Wise, modest, curious. Be clear that the story comes from Plato's dialogues and that historians think Plato invented it", "Greetings, traveller. In Sais, by the Nile, an old priest told me: 'You Greeks are always children.' Then he told me of this city. I wonder now if I dreamed it too."), { r: 4, sp: 0.3 });
P.person("priest", A.x + 6, A.z + 20, Math.PI, { sex: "f", look: { top: 0x2A4AC8, topKind: "robe", bottom: 0x2A4AC8, shoes: 0xE8C060, skin: 0xD8B898, hair: 0x1A1A1A, hairStyle: "bun", hat: "tiara", hatColor: 0xE8743A } }, ldWho("A priestess of Poseidon", L, "a priestess of Poseidon at his temple in Atlantis, as Plato describes it in the Critias: proud of the silver temple and the god's statue, who loves explaining the rings, the springs and the laws on the pillar of orichalcum", "Welcome to the citadel. Mind the golden fence: the old precinct of Cleito is within it. The god's temple is open to you; go in by the silver doors."));
P.person("charioteer", A.x + Math.sin(1.4) * 168, A.z + Math.cos(1.4) * 168, 0, { sex: "m", look: { top: 0xB83A2A, topKind: "shirt", bottom: 0xE8DCC0, shoes: 0x6A4A2A, skin: 0xB88060, hair: 0x2A1A10 } }, ldWho("A charioteer of the rings", L, "a charioteer who races on the great course that runs round the outer ring of Atlantis (Plato: a racecourse a stadium wide); cheerful, competitive, loves horses", "The course runs right round the ring! A stadium wide. Want to know the trick to the turns? Hold the inside horse tight."), { r: 30, sp: 2.2 });
P.person("diver", A.x + 20, A.z + A.canal[1] + 6, -0.4, { sex: "f", look: { top: 0xE8A030, topKind: "shirt", bottom: 0x2A2A30, shoes: 0x2A2A30, skin: 0x8A5A3A, hair: 0x1A1A1A, hat: "helmet", hatColor: 0xC8B070 } }, ldWho("An underwater archaeologist", L, "a modern underwater archaeologist dreaming of Atlantis, who explains honestly what historians think: that Plato probably invented Atlantis; that the eruption of Thera (Santorini) about 1600 BC and the fall of Minoan Crete may have inspired it; that the real Greek city of Helike sank in an earthquake in 373 BC and was found again in 2001; and that Ignatius Donnelly's 1882 book made Atlantis famous", "Real or not, it's a wonderful story. Want to know what the evidence actually says? Spoiler: Plato might have been teaching a lesson, not writing a history."), { r: 6, sp: 0.4 });
for (var c = 0; c < (lite ? 4 : 10); c++) {
var a2 = c * 0.63, rr = c % 2 ? r2 - 2 : r1;
P.person("atlantean" + c, A.x + Math.sin(a2) * rr, A.z + Math.cos(a2) * rr, a2, { sex: c % 2 ? "f" : "m", look: { top: [0xE8E0D0, 0x2A4AC8, 0xB83A2A, 0xE8C060][c % 4], topKind: c % 2 ? "dress" : "robe", bottom: [0xE8E0D0, 0x2A4AC8, 0xB83A2A, 0xE8C060][c % 4], shoes: 0x6A4A2A } }, null, { r: 16, sp: 0.8 });
}
for (var d = 0; d < (lite ? 3 : 6); d++)
P.being("dolphin", A.x + (d - 3) * 14, A.z + A.canal[1] + 10 + (d % 2) * 6, d, 1.1, null, { r: 18, sp: 2 });
P.being("fish", A.x, A.z + 90, 0, 1.4, null, { r: 20, sp: 1 });
P.being("turtle", A.x - 60, A.z - 100, 1, 1.4, null, { r: 20, sp: 0.4 });
P.make(A.x, A.z, 0, 0.1, function (G) { dpxShafts(G, [[0, -12, 40], [-90, 60, 30], [100, -80, 30], [0, 200, 28]].slice(0, lite ? 2 : 4)); }, null);
});
"use strict";
var DPX_C = { coral: 0xE0705E, coralRed: 0xC83A3A, pink: 0xF2A0B0, peach: 0xF8C8A8, pearl: 0xF4F0F8, nacre: 0xD8E8F0, shell: 0xF0D8C8, sea: 0x2A9AA8, teal: 0x18A8A0,
kelp: 0x4E8A3A, kelpDark: 0x2E5A2A, sand: 0xE0D0A8, gold: 0xE8C060, silver: 0xD8DCE4, orich: 0xE8743A, bronze: 0xB8783A, ivory: 0xF2EAD8,
red: 0xB83A2A, black: 0x2A2622, white: 0xF0ECE4, jelly: 0xC8A8FF, glow: 0xBFF4FF, amber: 0xFFB347, witch: 0x7AF0A0, bone: 0xE6DEC8 };
function dpxF(c, surf, o) { return esMat(c, surf, o); }
function dpxFGlow(c, op) { var k = "dpxg|" + c + "|" + (op || 1); if (DPX.mats[k])
return DPX.mats[k]; var m = new THREE.MeshBasicMaterial({ color: c }); if (op && op < 1) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.ldShared = 1; return (DPX.mats[k] = m); }
(function () {
if (typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var C = DPX_C, M = dpxF, GL = dpxFGlow;
function G() { return new THREE.Group(); }
function B(g, mat, w, h, d, x, y, z, ry) { var m = new THREE.Mesh(evbGeo("b", w, h, d), mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; g.add(m); return m; }
function Cy(g, mat, rt, rb, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("c", rt, rb, h, seg || 14), mat); m.position.set(x, y, z); g.add(m); return m; }
function S(g, mat, r, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("s", r, seg || 12), mat); m.position.set(x, y, z); g.add(m); return m; }
function Tor(g, mat, r, t, x, y, z, rx) { var m = new THREE.Mesh(evbGeo("t", r, t), mat); m.position.set(x, y, z); m.rotation.x = rx || 0; g.add(m); return m; }
function Cone(g, mat, r, h, x, y, z, seg) { var m = new THREE.Mesh(evbGeo("k", r, h, seg || 14), mat); m.position.set(x, y, z); g.add(m); return m; }
var SCAL = null;
function scallop() { if (!SCAL) {
SCAL = dpxScallopGeo(1, 9);
SCAL.userData.shared = true;
} return SCAL; }
function Sh(g, mat, r, x, y, z, rx, ry) { var m = new THREE.Mesh(scallop(), mat); m.scale.setScalar(r); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, 0); g.add(m); return m; }
var F = {};
F.dpx_clambed = function () {
var g = G(), sh = M(C.shell, "marble", { side: 1 }), in1 = M(C.pink, "marble", { side: 1 });
var lo = Sh(g, sh, 1.3, 0, 0.55, -1.1, Math.PI);
lo.scale.set(1.4, 0.9, 1.6);
var up = Sh(g, in1, 1.3, 0, 0.62, -1.1, -1.1);
up.scale.set(1.4, 1.2, 1.4);
B(g, M(C.nacre, "carpet"), 1.7, 0.22, 1.9, 0, 0.5, 0);
S(g, M(C.white, "carpet"), 0.32, -0.4, 0.66, -0.75, 10).scale.set(1, 0.45, 0.7);
S(g, M(C.white, "carpet"), 0.32, 0.4, 0.66, -0.75, 10).scale.set(1, 0.45, 0.7);
B(g, M(C.sea, "carpet"), 1.75, 0.08, 1.2, 0, 0.64, 0.35);
S(g, M(C.pearl, null, { e: 0x8890A0 }), 0.16, 0.95, 1.5, -0.9, 12);
return g;
};
F.dpx_clambed2 = function () { var g = F.dpx_clambed(); g.scale.set(0.72, 0.8, 0.72); return g; };
F.dpx_shellthrone = function () {
var g = G(), gold = M(C.gold, null, { e: 0x3A2A06 }), sh = M(C.pearl, "marble", { side: 1 }), co = M(C.coralRed, "stone");
B(g, M(C.nacre, "marble"), 2.2, 0.3, 1.9, 0, 0.15, 0);
B(g, co, 1.3, 0.5, 1.0, 0, 0.55, 0.05);
B(g, M(C.sea, "carpet"), 1.2, 0.14, 0.9, 0, 0.86, 0.08);
var bk = Sh(g, sh, 1.8, 0, 0.8, -0.35, -Math.PI / 2);
bk.rotation.set(-Math.PI / 2 + 0.1, 0, 0);
bk.scale.set(1.8, 1.8, 1.8);
[-0.68, 0.68].forEach(function (x) { Cy(g, co, 0.11, 0.15, 0.75, x, 0.95, 0.15, 8); S(g, M(C.pearl, null, { e: 0x606878 }), 0.13, x, 1.36, 0.15, 10); });
for (var i = 0; i < 7; i++) {
var a = -1.1 + i * 0.37;
S(g, M(C.pearl, null, { e: 0x606878 }), 0.09, Math.sin(a) * 1.75, 0.8 + Math.cos(a) * 1.75, -0.45, 8);
}
Cone(g, gold, 0.14, 0.5, 0, 2.75, -0.4, 8);
return g;
};
F.dpx_shellchair = function () {
var g = G(), sh = M(C.peach, "marble", { side: 1 });
Cy(g, M(C.coral, "stone"), 0.32, 0.4, 0.42, 0, 0.21, 0, 10);
Cy(g, M(C.sea, "carpet"), 0.42, 0.42, 0.12, 0, 0.48, 0.02, 14);
var b = Sh(g, sh, 0.75, 0, 0.45, -0.25);
b.rotation.set(-Math.PI / 2 + 0.25, 0, 0);
return g;
};
F.dpx_shellstool = function () { var g = G(); Cy(g, M(C.coral, "stone"), 0.2, 0.26, 0.45, 0, 0.225, 0, 10); var s = S(g, M(C.peach, "marble"), 0.26, 0, 0.48, 0, 12); s.scale.y = 0.35; return g; };
F.dpx_shellsofa = function () {
var g = G(), sh = M(C.pink, "marble", { side: 1 }), cu = M(C.teal, "carpet");
B(g, M(C.coral, "stone"), 2.2, 0.4, 0.9, 0, 0.2, 0);
B(g, cu, 2.1, 0.16, 0.85, 0, 0.48, 0.03);
[-0.6, 0, 0.6].forEach(function (x) { var b = Sh(g, sh, 0.7, x, 0.45, -0.35); b.rotation.set(-Math.PI / 2 + 0.2, 0, 0); });
[-1.05, 1.05].forEach(function (x) { S(g, M(C.pearl, "marble"), 0.22, x, 0.62, 0.05, 10); });
return g;
};
F.dpx_coraltable = function () {
var g = G(), co = M(C.coralRed, "stone");
Cy(g, co, 0.12, 0.3, 0.72, 0, 0.36, 0, 8);
for (var i = 0; i < 4; i++) {
var c = Cy(g, co, 0.05, 0.07, 0.5, Math.cos(i * 1.57) * 0.2, 0.45, Math.sin(i * 1.57) * 0.2, 6);
c.rotation.set(Math.sin(i * 1.57) * 0.6, 0, -Math.cos(i * 1.57) * 0.6);
}
Cy(g, M(C.nacre, "marble"), 0.62, 0.6, 0.06, 0, 0.76, 0, 20);
return g;
};
F.dpx_coraltablelong = function () {
var g = G(), co = M(C.coralRed, "stone");
[-1.1, 0, 1.1].forEach(function (x) { Cy(g, co, 0.1, 0.26, 0.72, x, 0.36, 0, 8); });
B(g, M(C.nacre, "marble"), 3.2, 0.07, 1.1, 0, 0.76, 0);
for (var i = 0; i < 5; i++)
S(g, M(C.pearl, "marble"), 0.05, -1.2 + i * 0.6, 0.82, 0.42, 8);
return g;
};
F.dpx_coraldesk = function () {
var g = G(), co = M(C.coral, "stone");
B(g, co, 0.5, 0.74, 0.7, -0.6, 0.37, 0);
B(g, co, 0.5, 0.74, 0.7, 0.6, 0.37, 0);
B(g, M(C.nacre, "marble"), 1.7, 0.06, 0.8, 0, 0.77, 0);
var sh = Cone(g, M(C.shell, "marble"), 0.12, 0.4, 0.5, 0.98, -0.15, 10);
sh.rotation.z = 1.2;
B(g, M(C.sand, "wood"), 0.4, 0.02, 0.3, -0.2, 0.81, 0.05);
return g;
};
F.dpx_pearllamp = function () {
var g = G();
Cy(g, M(C.coral, "stone"), 0.22, 0.28, 0.12, 0, 0.06, 0, 10);
var st = Cy(g, M(C.kelp), 0.04, 0.06, 1.6, 0, 0.86, 0, 6);
st.rotation.z = 0.06;
S(g, GL(0xF8F4FF), 0.2, 0.05, 1.75, 0, 14);
Sh(g, M(C.pink, "marble", { side: 1 }), 0.35, 0.05, 1.62, -0.05, -0.6);
return g;
};
F.dpx_jellylamp = function () {
var g = G(), bell = new THREE.Mesh(evbGeo("s", 0.55, 14), M(C.jelly, null, { op: 0.75, e: 0x6A4AA8 }));
bell.scale.y = 0.6;
bell.position.y = 3.2;
g.add(bell);
S(g, GL(0xE8D8FF), 0.25, 0, 3.15, 0, 10);
for (var i = 0; i < 8; i++) {
var a = i * 0.785;
Cy(g, M(C.jelly, null, { op: 0.6, e: 0x4A2A88 }), 0.012, 0.02, 1.1, Math.cos(a) * 0.32, 2.6, Math.sin(a) * 0.32, 4);
}
return g;
};
F.dpx_kelp = function () {
var g = G(), k = M(C.kelp, null, { side: 1 }), k2 = M(C.kelpDark, null, { side: 1 });
S(g, M(0x6A6A62, "stone"), 0.32, 0, 0.1, 0, 8).scale.y = 0.5;
for (var i = 0; i < 5; i++) {
var a = i * 1.26, b = new THREE.Mesh(evbGeo("b", 0.16, 2.4 + (i % 3) * 0.4, 0.02), i % 2 ? k : k2);
b.position.set(Math.cos(a) * 0.15, 1.25 + (i % 3) * 0.2, Math.sin(a) * 0.15);
b.rotation.set(Math.sin(a) * 0.12, a, Math.cos(a) * 0.12);
g.add(b);
S(g, M(0xC8B83A), 0.05, Math.cos(a) * 0.15, 0.9 + i * 0.3, Math.sin(a) * 0.15, 6);
}
return g;
};
F.dpx_coralpot = function () {
var g = G(), cols = [C.coralRed, 0xF2804A, 0xA85AC8, 0xF8C84A], col = cols[(Math.random() * 4) | 0];
Cy(g, M(C.sand, "stone"), 0.3, 0.22, 0.4, 0, 0.2, 0, 12);
var cm = M(col, "stone");
for (var i = 0; i < 6; i++) {
var a = i * 1.05, c = Cy(g, cm, 0.04, 0.07, 0.7, Math.cos(a) * 0.1, 0.7, Math.sin(a) * 0.1, 6);
c.rotation.set(Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35);
S(g, cm, 0.07, Math.cos(a) * 0.22, 1.02, Math.sin(a) * 0.22, 6);
}
return g;
};
F.dpx_anemone = function () {
var g = G(), cols = [0xFF7AB8, 0xFFB04A, 0x7AE8C8, 0xC88AFF];
S(g, M(0x6A6A62, "stone"), 0.55, 0, 0.1, 0, 10).scale.set(1.3, 0.35, 1);
for (var i = 0; i < 5; i++) {
var x = (i - 2) * 0.24, z = (i % 2) * 0.16 - 0.08, c = cols[i % 4];
Cy(g, M(c), 0.09, 0.12, 0.25, x, 0.3, z, 8);
for (var k = 0; k < 8; k++) {
var a = k * 0.785;
var t = Cy(g, M(c, null, { e: c }), 0.012, 0.025, 0.25, x + Math.cos(a) * 0.08, 0.5, z + Math.sin(a) * 0.08, 4);
t.rotation.set(Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6);
}
}
return g;
};
F.dpx_shellshelf = function () {
var g = G(), co = M(C.coral, "stone");
B(g, co, 1.6, 2.0, 0.08, 0, 1.0, -0.2);
[-0.78, 0.78].forEach(function (x) { B(g, co, 0.08, 2.0, 0.45, x, 1.0, 0); });
for (var r = 0; r < 4; r++) {
B(g, co, 1.56, 0.05, 0.42, 0, 0.25 + r * 0.5, 0);
for (var i = 0; i < 4; i++) {
var c = Cone(g, M([C.shell, C.peach, C.pink, C.pearl][(r + i) % 4], "marble"), 0.11, 0.36, -0.55 + i * 0.36, 0.46 + r * 0.5, 0.02, 10);
c.rotation.z = Math.PI / 2 * ((i + r) % 2 ? 1 : -1);
}
}
return g;
};
F.dpx_spongerug = function () {
var g = G(), m = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.04, 24), M(0xE8C060, "carpet"));
m.position.y = 0.02;
g.add(m);
var r = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.2, 24), M(0xD87A3A, "carpet"));
r.rotation.x = -Math.PI / 2;
r.position.y = 0.045;
g.add(r);
return g;
};
F.dpx_glowglobe = function () {
var g = G();
Cy(g, M(C.coral, "stone"), 0.25, 0.32, 0.8, 0, 0.4, 0, 10);
S(g, M(0xC8F0FF, null, { op: 0.35 }), 0.45, 0, 1.25, 0, 16);
var sw = G();
sw.position.y = 1.25;
g.add(sw);
for (var i = 0; i < 7; i++) {
var a = i * 0.9;
S(sw, GL([0xFFE07A, 0x7AF0FF, 0xFF9AD0][i % 3]), 0.05, Math.cos(a) * 0.25, (i % 3 - 1) * 0.12, Math.sin(a) * 0.25, 6);
}
evbSpinMark(sw, 0.6);
return g;
};
F.dpx_shellharp = function () {
var g = G(), sh = M(C.pearl, "marble");
B(g, M(C.coral, "stone"), 0.7, 0.12, 0.5, 0, 0.06, 0);
var arc = new THREE.Mesh(evbGeo("t", 0.75, 0.07), sh);
arc.position.set(0, 1.0, 0);
arc.rotation.y = Math.PI / 2;
arc.scale.set(1, 1.3, 1);
g.add(arc);
Cy(g, sh, 0.06, 0.08, 1.9, 0, 1.0, -0.62, 8);
for (var i = 0; i < 8; i++) {
Cy(g, M(C.silver, null, { e: 0x404040 }), 0.006, 0.006, 0.4 + i * 0.15, 0, 0.45 + i * 0.075, -0.5 + i * 0.13, 4);
}
return g;
};
F.dpx_shellmirror = function () {
var g = G(), fr = Tor(g, M(C.coral, "stone"), 0.45, 0.07, 0, 1.65, 0.05, 0);
fr.scale.set(1, 1.3, 1);
var gl = new THREE.Mesh(new THREE.CircleGeometry(0.44, 24), M(0xE8F4FF, null, { e: 0x30404A }));
gl.scale.set(1, 1.3, 1);
gl.position.set(0, 1.65, 0.04);
g.add(gl);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
Sh(g, M(C.pink, "marble", { side: 1 }), 0.12, Math.cos(a) * 0.48, 1.65 + Math.sin(a) * 0.62, 0.08, -Math.PI / 2 + 0.3);
}
return g;
};
F.dpx_mosaic = function () {
var g = G();
B(g, M(C.sea, "stone"), 1.6, 1.2, 0.05, 0, 1.7, 0);
var cols = [C.pink, C.pearl, C.sand, C.coral, 0x6AD8FF, 0xF8C84A];
for (var i = 0; i < 22; i++) {
var x = -0.7 + (i % 6) * 0.28, y = 1.2 + ((i / 6) | 0) * 0.3;
S(g, M(cols[(i * 7) % 6], "marble"), 0.06 + (i % 3) * 0.015, x + ((i * 13) % 5) * 0.02, y, 0.04, 6).scale.z = 0.4;
}
return g;
};
F.dpx_net = function () {
var g = G(), r = M(0xC8B890, null, { side: 1 });
for (var i = 0; i < 7; i++) {
B(g, r, 1.6, 0.02, 0.02, 0, 1.0 + i * 0.2, 0);
}
for (var j = 0; j < 9; j++) {
B(g, r, 0.02, 1.25, 0.02, -0.8 + j * 0.2, 1.6, 0);
}
S(g, M(0x7AC8E8, null, { op: 0.7 }), 0.12, -0.4, 1.3, 0.05, 10);
S(g, M(0x7AE8A8, null, { op: 0.7 }), 0.1, 0.5, 1.7, 0.05, 10);
return g;
};
F.dpx_ventstove = function () {
var g = G();
var rk = Cy(g, M(0x4A4440, "stone"), 0.45, 0.65, 0.8, 0, 0.4, 0, 9);
S(g, GL(0xFF8A3A, 0.85), 0.28, 0, 0.82, 0, 10);
var p = Sh(g, M(C.shell, "marble", { side: 1 }), 0.5, 0, 0.95, -0.4, Math.PI);
p.scale.y = 0.3;
Cy(g, M(0x7A6A60, "stone"), 0.06, 0.1, 0.6, 0.5, 1.05, -0.3, 6);
return g;
};
F.dpx_coldclam = function () { var g = G(), sh = M(C.nacre, "marble", { side: 1 }); B(g, M(0xB8D8E8, "stone"), 0.9, 0.9, 0.7, 0, 0.45, 0); var t = Sh(g, sh, 0.55, 0, 0.92, -0.3); t.rotation.x = -0.5; return g; };
F.dpx_bubblebasin = function () {
var g = G();
Cy(g, M(C.nacre, "marble"), 0.5, 0.4, 0.8, 0, 0.4, 0, 16);
Cy(g, GL(0x9AE8FF, 0.8), 0.42, 0.42, 0.02, 0, 0.79, 0, 16);
for (var i = 0; i < 6; i++)
S(g, M(0xE8FAFF, null, { op: 0.6 }), 0.05 + (i % 3) * 0.02, ((i * 37) % 7 - 3) * 0.06, 0.9 + i * 0.22, ((i * 53) % 5 - 2) * 0.06, 8);
return g;
};
F.dpx_clambath = function () {
var g = G(), lo = Sh(g, M(C.pearl, "marble", { side: 1 }), 1.2, 0, 0.6, -0.9, Math.PI);
lo.scale.set(1.2, 0.7, 1.5);
var up = Sh(g, M(C.pink, "marble", { side: 1 }), 1.2, 0, 0.62, -0.9, -1.0);
up.scale.set(1.2, 1, 1.3);
Cy(g, GL(0x9AE8FF, 0.75), 0.95, 0.95, 0.02, 0, 0.5, 0.1, 18);
for (var i = 0; i < 5; i++)
S(g, M(0xE8FAFF, null, { op: 0.6 }), 0.05, ((i * 37) % 7 - 3) * 0.15, 0.7 + i * 0.2, 0.1, 8);
return g;
};
F.dpx_cradle = function () {
var g = G();
var s = Sh(g, M(C.pink, "marble", { side: 1 }), 0.7, 0, 0.35, -0.55, Math.PI);
s.scale.set(1, 0.7, 1.4);
Tor(g, M(C.coral, "stone"), 0.45, 0.05, 0, 0.12, 0, 0).rotation.y = Math.PI / 2;
B(g, M(C.white, "carpet"), 0.6, 0.1, 0.9, 0, 0.34, 0.05);
S(g, GL(0xF8F0FF), 0.06, 0, 0.9, -0.6, 8);
return g;
};
F.dpx_shellwardrobe = function () {
var g = G();
B(g, M(C.coral, "stone"), 1.2, 2.1, 0.6, 0, 1.05, 0);
var s = Sh(g, M(C.shell, "marble", { side: 1 }), 0.9, 0, 1.6, 0.31);
s.rotation.set(-Math.PI / 2, 0, 0);
S(g, M(C.pearl, "marble"), 0.05, 0.25, 1.1, 0.32, 8);
S(g, M(C.pearl, "marble"), 0.05, -0.25, 1.1, 0.32, 8);
return g;
};
F.dpx_oysters = function () {
var g = G();
B(g, M(C.nacre, "marble"), 1.4, 0.9, 0.6, 0, 0.45, 0);
B(g, M(0x6A2A5A, "carpet"), 1.3, 0.06, 0.55, 0, 0.93, 0);
for (var i = 0; i < 12; i++) {
var x = -0.55 + (i % 6) * 0.22, z = i < 6 ? -0.12 : 0.12, o = S(g, M(0x9A9488, "stone"), 0.09, x, 1.0, z, 8);
o.scale.y = 0.45;
S(g, M(C.pearl, null, { e: 0x505060 }), 0.035, x, 1.05, z + 0.04, 6);
}
return g;
};
F.dpx_tideglass = function () {
var g = G(), sh = M(C.shell, "marble");
Cy(g, sh, 0.3, 0.3, 0.08, 0, 0.04, 0, 12);
Cy(g, sh, 0.3, 0.3, 0.08, 0, 1.2, 0, 12);
Cone(g, M(0xE8F8FF, null, { op: 0.4 }), 0.25, 0.55, 0, 0.36, 0, 12).rotation.x = Math.PI;
Cone(g, M(0xE8F8FF, null, { op: 0.4 }), 0.25, 0.55, 0, 0.88, 0, 12);
Cone(g, M(C.sand), 0.16, 0.25, 0, 0.2, 0, 10);
[-0.25, 0.25].forEach(function (x) { Cy(g, M(C.coral, "stone"), 0.03, 0.03, 1.2, x, 0.62, 0, 6); });
return g;
};
F.dpx_seahorse = function () {
var g = G(), sk = M(0xF8B040, null, { e: 0x402800 });
B(g, M(C.sand, "stone"), 1.2, 0.15, 1.2, 0, 0.07, 0);
var b = S(g, sk, 0.22, 0, 1.25, 0, 10);
b.scale.set(0.8, 1.4, 0.9);
S(g, sk, 0.14, 0, 1.68, 0.1, 10);
var sn = Cy(g, sk, 0.04, 0.07, 0.3, 0, 1.66, 0.3, 6);
sn.rotation.x = Math.PI / 2;
Tor(g, sk, 0.14, 0.05, 0, 0.82, 0.06, 0).rotation.y = Math.PI / 2;
[-0.5, 0.5].forEach(function (x) { var k = Cy(g, M(C.kelp), 0.03, 0.05, 1.8, x, 0.9, -0.4, 6); k.rotation.z = x * 0.2; });
return g;
};
F.dpx_wheel = function () {
var g = G(), w = M(0x6A4A30, "wood");
Tor(g, w, 0.55, 0.05, 0, 1.6, 0.08, 0);
Cy(g, w, 0.1, 0.1, 0.15, 0, 1.6, 0.08, 10).rotation.x = Math.PI / 2;
for (var i = 0; i < 8; i++) {
var a = i * 0.785, s = B(g, w, 0.04, 1.4, 0.04, 0, 1.6, 0.08);
s.rotation.z = a;
}
return g;
};
F.dpx_anchor = function () {
var g = G(), ir = M(0x5A5E60, "metal");
Cy(g, ir, 0.07, 0.07, 1.8, 0, 0.95, 0, 8);
Tor(g, ir, 0.14, 0.04, 0, 1.95, 0, 0).rotation.y = Math.PI / 2;
var a = new THREE.Mesh(evbGeo("t", 0.55, 0.07), ir);
a.rotation.set(0, 0, Math.PI);
a.position.y = 0.62;
a.scale.set(1, 0.8, 1);
g.add(a);
B(g, ir, 0.8, 0.08, 0.08, 0, 1.6, 0);
return g;
};
F.dpx_statueboy = function () { var g = G(); dpxStatue(g); g.scale.setScalar(0.6); return g; };
F.dpx_bubbles = function () {
var g = G();
Cy(g, M(0x4A4440, "stone"), 0.3, 0.4, 0.15, 0, 0.07, 0, 8);
var col = G();
g.add(col);
for (var i = 0; i < 9; i++)
S(col, M(0xE8FAFF, null, { op: 0.55 }), 0.06 + (i % 3) * 0.03, Math.sin(i * 2.1) * 0.12, 0.3 + i * 0.32, Math.cos(i * 2.1) * 0.12, 8);
evbSpinMark(col, 0.8);
return g;
};
F.dpx_coralcolumn = function () {
var g = G(), co = M(C.coral, "stone");
Cy(g, co, 0.42, 0.5, 0.4, 0, 0.2, 0, 14);
Cy(g, co, 0.32, 0.36, 3.6, 0, 2.2, 0, 14);
for (var i = 0; i < 6; i++)
Tor(g, M(C.coralRed, "stone"), 0.34, 0.06, 0, 0.8 + i * 0.6, 0, Math.PI / 2);
Cy(g, co, 0.5, 0.36, 0.4, 0, 4.2, 0, 14);
return g;
};
F.dpx_cauldron = function () {
var g = G();
Cy(g, M(0x2A2A2A, "metal"), 0.6, 0.45, 0.75, 0, 0.55, 0, 16);
Tor(g, M(0x3A3A3A, "metal"), 0.6, 0.06, 0, 0.92, 0, Math.PI / 2);
Cy(g, GL(0x7AF0A0, 0.9), 0.55, 0.55, 0.02, 0, 0.9, 0, 16);
for (var i = 0; i < 3; i++) {
var l = Cy(g, M(0x2A2A2A, "metal"), 0.04, 0.05, 0.4, Math.cos(i * 2.1) * 0.45, 0.15, Math.sin(i * 2.1) * 0.45, 6);
}
S(g, GL(0x3AC060, 0.5), 0.4, 0, 0.2, 0, 10).scale.y = 0.3;
for (var b = 0; b < 4; b++)
S(g, M(0xB8FFC8, null, { op: 0.6 }), 0.06, ((b * 3) % 5 - 2) * 0.1, 1.1 + b * 0.2, ((b * 7) % 5 - 2) * 0.1, 8);
return g;
};
F.dpx_jars = function () {
var g = G(), w = M(0x4A3A2A, "wood");
B(g, w, 1.5, 1.9, 0.08, 0, 0.95, -0.18);
for (var r = 0; r < 3; r++) {
B(g, w, 1.46, 0.05, 0.38, 0, 0.35 + r * 0.55, 0);
for (var i = 0; i < 5; i++) {
var c = [0x7AF0A0, 0xC88AFF, 0x8AE8FF, 0xF0E07A, 0xFF8A8A][(r + i) % 5];
Cy(g, M(c, null, { op: 0.7, e: c }), 0.08, 0.09, 0.24, -0.55 + i * 0.27, 0.5 + r * 0.55, 0, 10);
}
}
return g;
};
F.dpx_bonechair = function () {
var g = G(), b = M(C.bone, "stone");
B(g, M(0x3A3E3C, "stone"), 0.9, 0.45, 0.8, 0, 0.22, 0);
B(g, M(0x2A4A3A, "carpet"), 0.8, 0.1, 0.7, 0, 0.5, 0.02);
for (var i = 0; i < 5; i++) {
var r = new THREE.Mesh(evbGeo("t", 0.45 - i * 0.04, 0.04), b);
r.position.set(0, 0.55, -0.32);
r.rotation.set(0, 0, 0);
r.scale.set(1, 2.2 - i * 0.2, 1);
g.add(r);
}
[-0.42, 0.42].forEach(function (x) { Cy(g, b, 0.04, 0.05, 0.5, x, 0.7, 0.1, 6); S(g, b, 0.07, x, 0.96, 0.1, 8); });
return g;
};
F.dpx_seasnake = function () { var g = G(), sk = M(0x5A7A3A, null, { e: 0x101A08 }); for (var i = 0; i < 9; i++) {
S(g, sk, 0.12 - i * 0.006, Math.sin(i * 0.9) * 0.3, 0.12 + i * 0.02, -0.5 + i * 0.12, 8);
} S(g, sk, 0.13, Math.sin(9 * 0.9) * 0.3, 0.3, 0.6, 8); return g; };
F.dpx_poseidon = function () {
var g = G(), gold = M(C.gold, "metal", { e: 0x4A3408 }), or = M(C.orich, "metal", { e: 0x5A2008 });
B(g, M(C.ivory, "marble"), 5.2, 0.6, 7.4, 0, 0.3, 0);
B(g, or, 5.4, 0.12, 7.6, 0, 0.62, 0);
B(g, gold, 1.6, 1.0, 1.4, 0, 1.2, -2.4);
Tor(g, gold, 0.62, 0.09, -0.85, 1.0, -2.4, 0).rotation.y = Math.PI / 2;
Tor(g, gold, 0.62, 0.09, 0.85, 1.0, -2.4, 0).rotation.y = Math.PI / 2;
Cy(g, gold, 0.32, 0.38, 1.7, 0, 2.55, -2.5, 10);
S(g, gold, 0.36, 0, 3.6, -2.5, 12);
Cy(g, gold, 0.3, 0.34, 0.35, 0, 3.92, -2.5, 10);
var arm = Cy(g, gold, 0.09, 0.09, 1.2, 0.42, 3.2, -2.3, 6);
arm.rotation.z = -0.9;
Cy(g, gold, 0.04, 0.04, 3.6, 0.92, 3.5, -2.3, 6);
[-0.18, 0, 0.18].forEach(function (dx) { Cone(g, gold, 0.05, 0.35, 0.92 + dx, 5.4, -2.3, 6); });
for (var i = 0; i < 6; i++) {
var x = (i % 3 - 1) * 1.3, z = -0.6 + ((i / 3) | 0) * 1.8;
var b = S(g, gold, 0.42, x, 1.75, z, 10);
b.scale.set(0.8, 0.75, 1.5);
var nk = Cy(g, gold, 0.14, 0.2, 0.75, x, 2.25, z + 0.6, 8);
nk.rotation.x = 0.6;
var hd = S(g, gold, 0.2, x, 2.6, z + 0.9, 10);
hd.scale.set(0.7, 0.8, 1.3);
[-1, 1].forEach(function (sd) { var w = B(g, or, 0.05, 0.5, 1.2, x + sd * 0.35, 2.2, z - 0.05); w.rotation.set(0.3, 0, sd * 0.9); });
for (var l = 0; l < 4; l++) {
var lg = Cy(g, gold, 0.05, 0.06, 0.9, x + (l % 2 ? 0.2 : -0.2), 1.02, z + (l < 2 ? 0.45 : -0.45), 6);
lg.rotation.x = l === 0 ? -0.5 : 0;
}
}
return g;
};
F.dpx_nereid = function () {
var g = G(), gold = M(C.gold, "metal", { e: 0x3A2A06 });
B(g, M(C.ivory, "marble"), 1.2, 0.5, 1.6, 0, 0.25, 0);
var d = S(g, gold, 0.38, 0, 1.0, 0, 10);
d.scale.set(0.8, 0.7, 2.0);
Cone(g, gold, 0.14, 0.45, 0, 1.05, 0.95, 8).rotation.x = Math.PI / 2;
var tl = B(g, gold, 0.6, 0.05, 0.25, 0, 1.15, -0.8);
tl.rotation.x = 0.4;
Cone(g, gold, 0.12, 0.4, 0, 1.5, 0, 6);
Cy(g, gold, 0.12, 0.16, 0.7, 0, 1.65, -0.1, 8);
S(g, gold, 0.13, 0, 2.1, -0.1, 10);
var a = Cy(g, gold, 0.04, 0.04, 0.6, 0.2, 2.0, 0, 6);
a.rotation.z = -1.2;
return g;
};
F.dpx_pillar = function () {
var g = G(), or = M(C.orich, "metal", { e: 0x6A2A08 });
Cy(g, M(C.black, "stone"), 0.9, 1.0, 0.5, 0, 0.25, 0, 8);
Cy(g, or, 0.55, 0.6, 4.2, 0, 2.6, 0, 8);
Cy(g, or, 0.75, 0.6, 0.35, 0, 4.85, 0, 8);
for (var i = 0; i < 9; i++)
B(g, M(0x8A3A10, "metal"), 0.8, 0.03, 0.02, 0, 1.2 + i * 0.38, 0.56);
S(g, GL(0xFFB070, 0.35), 0.9, 0, 5.2, 0, 10);
return g;
};
F.dpx_kingstatue = function () {
var g = G(), gold = M(C.gold, "metal", { e: 0x3A2A06 });
B(g, M(C.white, "marble"), 1.0, 1.0, 1.0, 0, 0.5, 0);
B(g, M(C.orich, "metal"), 1.1, 0.1, 1.1, 0, 1.05, 0);
Cy(g, gold, 0.3, 0.42, 1.5, 0, 1.85, 0, 10);
S(g, gold, 0.2, 0, 2.8, 0, 10);
Cy(g, gold, 0.22, 0.18, 0.18, 0, 3.0, 0, 8);
var s = Cy(g, gold, 0.03, 0.03, 2.0, 0.4, 2.0, 0.1, 6);
return g;
};
F.dpx_queenstatue = function () {
var g = G(), gold = M(C.gold, "metal", { e: 0x3A2A06 });
B(g, M(C.white, "marble"), 1.0, 1.0, 1.0, 0, 0.5, 0);
B(g, M(C.orich, "metal"), 1.1, 0.1, 1.1, 0, 1.05, 0);
Cone(g, gold, 0.5, 1.6, 0, 1.9, 0, 12);
S(g, gold, 0.18, 0, 2.85, 0, 10);
Tor(g, gold, 0.16, 0.04, 0, 3.02, 0, Math.PI / 2);
return g;
};
F.dpx_altar = function () {
var g = G();
B(g, M(C.white, "marble"), 2.2, 1.0, 1.2, 0, 0.5, 0);
B(g, M(C.red, "stone"), 2.3, 0.12, 1.3, 0, 1.06, 0);
B(g, M(C.orich, "metal", { e: 0x4A1A06 }), 2.0, 0.08, 0.06, 0, 0.7, 0.62);
S(g, GL(0xFFB060, 0.6), 0.25, 0, 1.3, 0, 10);
return g;
};
F.dpx_tripod = function () {
var g = G(), br = M(C.bronze, "metal", { e: 0x2A1406 });
for (var i = 0; i < 3; i++) {
var l = Cy(g, br, 0.03, 0.04, 1.2, Math.cos(i * 2.09) * 0.25, 0.6, Math.sin(i * 2.09) * 0.25, 6);
l.rotation.set(Math.sin(i * 2.09) * 0.2, 0, -Math.cos(i * 2.09) * 0.2);
}
Cy(g, br, 0.38, 0.2, 0.3, 0, 1.3, 0, 14);
var f = Cone(g, GL(0xFFA040, 0.85), 0.22, 0.55, 0, 1.7, 0, 8);
S(g, GL(0xFFD080, 0.6), 0.12, 0, 1.55, 0, 8);
return g;
};
F.dpx_amphora = function () {
var g = G(), cl = M(0xB8643A, "stone");
var b = S(g, cl, 0.28, 0, 0.62, 0, 12);
b.scale.y = 1.5;
Cy(g, cl, 0.08, 0.12, 0.35, 0, 1.17, 0, 10);
Cone(g, cl, 0.1, 0.25, 0, 0.12, 0, 10).rotation.x = Math.PI;
[-1, 1].forEach(function (sd) { var h = Tor(g, cl, 0.12, 0.025, sd * 0.14, 1.1, 0, 0); h.rotation.y = Math.PI / 2; });
B(g, M(C.black), 0.4, 0.06, 0.02, 0, 0.75, 0.28);
return g;
};
F.dpx_amphorae = function () { var g = G(); [[-0.4, 0], [0.4, 0], [0, -0.35]].forEach(function (p, i) { var a = F.dpx_amphora(); a.position.set(p[0], 0, p[1]); a.rotation.y = i; g.add(a); }); return g; };
F.dpx_atlcolumn = function () {
var g = G();
B(g, M(C.black, "stone"), 0.9, 0.3, 0.9, 0, 0.15, 0);
Cy(g, M(C.white, "marble"), 0.32, 0.36, 3.7, 0, 2.15, 0, 16);
Cy(g, M(C.red, "stone"), 0.37, 0.37, 0.25, 0, 1.0, 0, 16);
Cy(g, M(C.orich, "metal", { e: 0x4A1806 }), 0.5, 0.34, 0.35, 0, 4.15, 0, 16);
B(g, M(C.white, "marble"), 1.0, 0.2, 1.0, 0, 4.42, 0);
return g;
};
F.dpx_silvercolumn = function () {
var g = G();
B(g, M(C.black, "stone"), 0.9, 0.3, 0.9, 0, 0.15, 0);
Cy(g, M(C.silver, "metal", { e: 0x30343A }), 0.32, 0.36, 3.7, 0, 2.15, 0, 16);
Cy(g, M(C.gold, "metal", { e: 0x3A2A06 }), 0.5, 0.34, 0.35, 0, 4.15, 0, 16);
return g;
};
F.dpx_couch = function () {
var g = G(), w = M(0x6A3A20, "wood");
B(g, w, 2.0, 0.45, 0.9, 0, 0.3, 0);
B(g, M(0x2A4AA8, "carpet"), 1.95, 0.15, 0.85, 0, 0.6, 0);
B(g, w, 0.15, 0.5, 0.9, -0.95, 0.75, 0);
S(g, M(C.white, "carpet"), 0.2, -0.75, 0.75, 0, 10).scale.set(1, 0.7, 1.6);
return g;
};
F.dpx_atltable = function () {
var g = G(), w = M(0x6A3A20, "wood");
B(g, M(C.white, "marble"), 1.2, 0.06, 0.7, 0, 0.55, 0);
[-0.5, 0.5].forEach(function (x) { B(g, w, 0.08, 0.52, 0.6, x, 0.26, 0); });
Cy(g, M(C.bronze, "metal"), 0.18, 0.12, 0.08, 0, 0.62, 0, 12);
S(g, M(0x6A2A5A), 0.05, 0.25, 0.62, 0.1, 8);
S(g, M(0xD8B040), 0.06, -0.25, 0.62, -0.05, 8);
return g;
};
F.dpx_loom = function () {
var g = G(), w = M(0x8A6A40, "wood");
[-0.8, 0.8].forEach(function (x) { B(g, w, 0.1, 2.2, 0.1, x, 1.1, 0); });
B(g, w, 1.8, 0.1, 0.1, 0, 2.15, 0);
B(g, M(0x2A6AA8, "carpet", { side: 1 }), 1.5, 1.2, 0.02, 0, 1.4, 0.02);
for (var i = 0; i < 10; i++)
S(g, M(0x8A7A6A, "stone"), 0.05, -0.7 + i * 0.155, 0.55, 0.05, 6);
return g;
};
F.dpx_scrolls = function () {
var g = G(), w = M(0x7A5A3A, "wood");
B(g, w, 1.6, 2.0, 0.5, 0, 1.0, -0.05);
var p = M(0xE8DCB8, "plaster");
for (var r = 0; r < 5; r++)
for (var c = 0; c < 6; c++) {
var s = Cy(g, p, 0.07, 0.07, 0.42, -0.62 + c * 0.25, 0.3 + r * 0.38, 0.2, 8);
s.rotation.x = Math.PI / 2;
}
return g;
};
F.dpx_armour = function () {
var g = G(), br = M(C.bronze, "metal", { e: 0x2A1406 });
Cy(g, M(0x5A4A3A, "wood"), 0.05, 0.05, 1.5, 0, 0.75, 0, 6);
B(g, M(0x5A4A3A, "wood"), 0.5, 0.06, 0.06, 0, 1.3, 0);
var c = Cy(g, br, 0.28, 0.24, 0.6, 0, 1.35, 0, 12);
S(g, br, 0.2, 0, 1.85, 0, 12).scale.y = 1.2;
Cone(g, M(C.red), 0.06, 0.4, 0, 2.1, -0.05, 6).rotation.x = -1.2;
var sh = Cy(g, br, 0.45, 0.45, 0.05, 0.5, 1.0, 0.2, 18);
sh.rotation.z = Math.PI / 2;
return g;
};
F.dpx_spears = function () {
var g = G(), w = M(0x6A4A2A, "wood"), br = M(C.bronze, "metal");
B(g, w, 1.6, 0.1, 0.3, 0, 0.5, 0);
B(g, w, 1.6, 0.1, 0.3, 0, 1.6, 0);
for (var i = 0; i < 7; i++) {
Cy(g, w, 0.02, 0.025, 2.4, -0.66 + i * 0.22, 1.2, 0, 5);
Cone(g, br, 0.04, 0.22, -0.66 + i * 0.22, 2.5, 0, 6);
}
return g;
};
F.dpx_shields = function () { var g = G(); for (var i = 0; i < 3; i++) {
var c = Cy(g, M([C.bronze, C.red, C.orich][i], "metal"), 0.42, 0.42, 0.06, -0.95 + i * 0.95, 1.6, 0.03, 18);
c.rotation.x = Math.PI / 2;
S(g, M(C.gold, "metal"), 0.08, -0.95 + i * 0.95, 1.6, 0.08, 8);
} return g; };
F.dpx_bunk = function () { var g = G(), w = M(0x6A4A2A, "wood"); B(g, w, 0.95, 0.35, 2.0, 0, 0.18, 0); B(g, M(0xD8C8A8, "carpet"), 0.9, 0.12, 1.9, 0, 0.42, 0); B(g, M(0x8A3A2A, "carpet"), 0.92, 0.06, 1.0, 0, 0.5, 0.4); return g; };
F.dpx_poolhot = function () {
var g = G(), st = M(C.white, "marble");
B(g, st, 3.2, 0.5, 2.4, 0, 0.25, 0);
B(g, M(C.red, "stone"), 3.3, 0.08, 2.5, 0, 0.52, 0);
var w = B(g, M(0xF0A060, null, { op: 0.8, e: 0x8A3A10 }), 2.8, 0.02, 2.0, 0, 0.5, 0);
for (var i = 0; i < 6; i++)
S(g, M(0xFFFFFF, null, { op: 0.25 }), 0.25, ((i * 37) % 5 - 2) * 0.5, 0.9 + (i % 3) * 0.4, ((i * 53) % 3 - 1) * 0.5, 8);
return g;
};
F.dpx_poolcold = function () {
var g = G(), st = M(C.white, "marble");
B(g, st, 3.2, 0.5, 2.4, 0, 0.25, 0);
B(g, M(C.black, "stone"), 3.3, 0.08, 2.5, 0, 0.52, 0);
B(g, M(0x7AD8F0, null, { op: 0.75, e: 0x10405A }), 2.8, 0.02, 2.0, 0, 0.5, 0);
return g;
};
F.dpx_springhot = function () {
var g = G();
Cy(g, M(C.white, "marble"), 0.9, 1.0, 0.7, 0, 0.35, 0, 18);
Cy(g, M(0xF0A060, null, { op: 0.85, e: 0x8A3A10 }), 0.8, 0.8, 0.02, 0, 0.7, 0, 18);
for (var i = 0; i < 5; i++)
S(g, M(0xFFFFFF, null, { op: 0.22 }), 0.3, 0, 1.0 + i * 0.45, 0, 8);
return g;
};
F.dpx_springcold = function () {
var g = G();
Cy(g, M(C.white, "marble"), 0.9, 1.0, 0.7, 0, 0.35, 0, 18);
Cy(g, M(0x7AD8F0, null, { op: 0.85, e: 0x10405A }), 0.8, 0.8, 0.02, 0, 0.7, 0, 18);
Cy(g, M(0xBFEFFF, null, { op: 0.5 }), 0.1, 0.25, 1.2, 0, 1.2, 0, 10);
return g;
};
F.dpx_trireme = function () {
var g = G(), hull = M(0x2A2420, "wood"), br = M(C.bronze, "metal", { e: 0x2A1406 });
var h = new THREE.Mesh(evbGeo("s", 1, 14), hull);
h.scale.set(1.3, 0.9, 7.5);
h.position.y = 1.0;
g.add(h);
B(g, M(0x6A4A2A, "wood"), 2.2, 0.1, 12, 0, 1.55, 0);
Cone(g, br, 0.25, 1.4, 0, 0.7, 7.7, 8).rotation.x = Math.PI / 2;
var st = Cy(g, hull, 0.12, 0.2, 2.2, 0, 2.2, -7, 8);
st.rotation.x = -0.5;
S(g, M(0xE8E0D0, "plaster"), 0.25, 0.9, 1.5, 6.2, 8);
S(g, M(0x2A6AE8), 0.1, 0.95, 1.55, 6.35, 8);
S(g, M(0xE8E0D0, "plaster"), 0.25, -0.9, 1.5, 6.2, 8);
S(g, M(0x2A6AE8), 0.1, -0.95, 1.55, 6.35, 8);
for (var i = 0; i < 12; i++) {
[-1, 1].forEach(function (sd) { var o = Cy(g, M(0x8A6A40, "wood"), 0.03, 0.03, 2.2, sd * 1.6, 1.2, -5 + i * 0.9, 5); o.rotation.z = sd * 1.1; });
}
[-1, 1].forEach(function (sd) { for (var z = -6; z <= 6; z += 3)
B(g, M(0x5A4A3A, "wood"), 0.3, 1.0, 0.3, sd * 1.0, 0.4, z); });
return g;
};
F.dpx_oars = function () { var g = G(), w = M(0x8A6A40, "wood"); B(g, M(0x5A4A3A, "wood"), 1.8, 0.1, 0.4, 0, 0.4, 0); for (var i = 0; i < 8; i++) {
var o = Cy(g, w, 0.03, 0.03, 3.2, -0.75 + i * 0.21, 1.7, 0, 5);
o.rotation.x = -0.12;
B(g, w, 0.14, 0.5, 0.02, -0.75 + i * 0.21, 0.35, 0.1);
} return g; };
F.dpx_rope = function () { var g = G(); for (var i = 0; i < 5; i++)
Tor(g, M(0xC8B080), 0.5 - i * 0.02, 0.06, 0, 0.06 + i * 0.1, 0, Math.PI / 2); return g; };
F.dpx_sail = function () { var g = G(); B(g, M(0x6A4A2A, "wood"), 2.4, 0.1, 0.6, 0, 0.4, 0); var s = B(g, M(0xE8DCC0, "plaster"), 2.2, 0.5, 0.55, 0, 0.7, 0); B(g, M(0x8A2A2A, "plaster"), 2.2, 0.12, 0.56, 0, 0.82, 0); return g; };
F.dpx_hearth = function () { var g = G(); Cy(g, M(C.black, "stone"), 0.9, 1.0, 0.35, 0, 0.18, 0, 12); S(g, GL(0xFF8A3A, 0.8), 0.35, 0, 0.4, 0, 10); Cone(g, GL(0xFFC060, 0.7), 0.25, 0.6, 0, 0.7, 0, 8); return g; };
F.dpx_oillamp = function () { var g = G(), br = M(C.bronze, "metal"); Cy(g, br, 0.18, 0.25, 0.06, 0, 0.03, 0, 10); Cy(g, br, 0.03, 0.04, 1.5, 0, 0.78, 0, 6); var l = S(g, br, 0.12, 0, 1.55, 0, 10); l.scale.set(1.4, 0.5, 0.8); S(g, GL(0xFFC060, 0.9), 0.06, 0.15, 1.62, 0, 8); return g; };
F.dpx_fountain = function () {
var g = G(), st = M(C.white, "marble");
Cy(g, st, 1.3, 1.4, 0.6, 0, 0.3, 0, 20);
Cy(g, M(0x6AC8E8, null, { op: 0.75, e: 0x10405A }), 1.18, 1.18, 0.02, 0, 0.58, 0, 20);
Cy(g, st, 0.18, 0.25, 1.4, 0, 1.0, 0, 10);
var b = Cy(g, M(C.orich, "metal", { e: 0x4A1806 }), 0.6, 0.2, 0.2, 0, 1.75, 0, 16);
S(g, M(0xBFEFFF, null, { op: 0.5 }), 0.25, 0, 2.0, 0, 10);
return g;
};
F.dpx_dolphinmosaic = function () {
var g = G();
B(g, M(0x2A6A9A, "stone"), 2.2, 1.3, 0.05, 0, 1.7, 0);
var cols = [0x9AC8E8, 0xF0ECE4, 0xE8C060];
for (var i = 0; i < 3; i++) {
var d = S(g, M(cols[i % 3], "marble"), 0.2, -0.7 + i * 0.7, 1.6 + (i % 2) * 0.3, 0.04, 10);
d.scale.set(1.8, 0.6, 0.3);
}
for (var w = 0; w < 8; w++)
B(g, M(0xF0ECE4, "marble"), 0.2, 0.04, 0.02, -0.9 + w * 0.26, 1.15, 0.04);
return g;
};
F.dpx_strigil = function () { var g = G(); B(g, M(0x6A4A2A, "wood"), 1.6, 0.08, 0.3, 0, 1.4, 0); for (var i = 0; i < 5; i++) {
var s = Tor(g, M(C.bronze, "metal"), 0.12, 0.02, -0.6 + i * 0.3, 1.2, 0.05, 0);
s.scale.set(0.6, 1.4, 1);
} S(g, M(0xD8B060, null, { op: 0.85 }), 0.12, 0.6, 1.55, 0.05, 8); return g; };
F.dpx_bench = function () { var g = G(); B(g, M(C.white, "marble"), 2.0, 0.12, 0.6, 0, 0.45, 0); [-0.8, 0.8].forEach(function (x) { B(g, M(C.white, "marble"), 0.2, 0.4, 0.5, x, 0.2, 0); }); return g; };
F.dpx_discus = function () { var g = G(); B(g, M(0x6A4A2A, "wood"), 1.4, 0.8, 0.5, 0, 0.4, 0); for (var i = 0; i < 3; i++) {
var d = Cy(g, M(C.bronze, "metal"), 0.12, 0.12, 0.04, -0.4 + i * 0.4, 0.86, 0, 14);
} var j = Cy(g, M(0x8A6A40, "wood"), 0.02, 0.02, 2.6, 0, 1.3, -0.2, 5); j.rotation.z = 1.4; return g; };
F.dpx_robes = function () { var g = G(); B(g, M(0x6A4A2A, "wood"), 1.8, 0.06, 0.06, 0, 2.0, 0); [-0.6, 0, 0.6].forEach(function (x, i) { var r = Cone(g, M(0x2A4AC8, "carpet"), 0.32, 1.5, x, 1.25, 0.05, 10); }); return g; };
F.dpx_mapatl = function () {
var g = G();
B(g, M(0x6A4A2A, "wood"), 1.6, 0.85, 1.2, 0, 0.42, 0);
var t = typeof esCanvas === "function" ? esCanvas("dpxatlmap", 128, 1, function (x, W, H) {
x.fillStyle = "#E8DCB8";
x.fillRect(0, 0, W, H);
var cx = W / 2, cy = H / 2;
[[60, "#2A6A9A"], [52, "#C8B890"], [42, "#2A6A9A"], [30, "#C8B890"], [22, "#2A6A9A"], [14, "#E8C060"]].forEach(function (r) { x.fillStyle = r[1]; x.beginPath(); x.arc(cx, cy, r[0] * W / 128, 0, 7); x.fill(); });
x.fillStyle = "#2A6A9A";
x.fillRect(cx - 3, cy, 6, H / 2);
}) : null;
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.0), t ? new THREE.MeshLambertMaterial({ map: t }) : M(C.sand));
p.rotation.x = -Math.PI / 2;
p.position.y = 0.86;
g.add(p);
return g;
};
Object.keys(F).forEach(function (k) { FURN[k] = F[k]; });
if (typeof SOLIDFURN !== "undefined")
["dpx_clambed", "dpx_clambed2", "dpx_shellthrone", "dpx_coraltablelong", "dpx_shellshelf", "dpx_shellwardrobe", "dpx_oysters", "dpx_cauldron", "dpx_jars", "dpx_poseidon", "dpx_pillar", "dpx_kingstatue", "dpx_queenstatue", "dpx_altar",
"dpx_poolhot", "dpx_poolcold", "dpx_springhot", "dpx_springcold", "dpx_trireme", "dpx_fountain", "dpx_loom", "dpx_scrolls", "dpx_atlcolumn", "dpx_silvercolumn", "dpx_coralcolumn", "dpx_clambath", "dpx_ventstove", "dpx_coldclam", "dpx_glowglobe", "dpx_nereid"].forEach(function (k) { SOLIDFURN[k] = 1; });
})();
"use strict";
(function () {
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) { DPX.cur = (spec && spec.evb && spec.evb.dpx) || null; if (DPX.cur)
DPX.here = DPX.cur; try {
return mi.apply(this, arguments);
}
finally {
DPX.cur = null;
} };
})();
function dpxRoom(o) {
return function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F, lite = P.lite;
if (o.rug)
P(o.rug, w * 0.5, 0, "+u");
var back = o.back || [];
back.forEach(function (k, i) { var span = Math.min(2.8, (P.d - 1.6) / Math.max(1, back.length)); P.wall("far", k, (i - (back.length - 1) / 2) * span); });
var side = o.side || [], n = 0;
if (side.length)
for (var u = 1.5; u < w - (back.length ? 1.4 : 0.9); u += 2.3) {
P.wall("B", side[n % side.length], u);
n++;
if (!(lite && n % 3 === 2))
P.wall("F", side[n % side.length], u);
n++;
}
var mid = o.mid || [];
mid.forEach(function (k, i) { P(k, w * (i + 1) / (mid.length + 1), 0, o.midFace || "+u"); });
if (o.corner && !(lite && o.cornerLite === false))
[[0.7, B + 0.7], [0.7, F - 0.7], [w - 0.7, B + 0.7], [w - 0.7, F - 0.7]].forEach(function (q, i) { if (lite && i % 2)
return; P(o.corner, q[0], q[1], 0); });
if (o.hang) {
if (w > 9) {
P.ceil(o.hang, w * 0.3, 0);
P.ceil(o.hang, w * 0.72, 0);
}
else
P.ceil(o.hang, w * 0.5, 0);
}
if (o.free)
o.free(P, A, ctx);
P.spot(Math.min(2.2, w * 0.4), 0.6);
(o.acts || []).forEach(function (a) { evbAct(P, ctx, a[0] * w, a[1] * P.d / 2, 1.7, a[2], a[3], a[4]); });
};
}
function dpxHall(o) {
return function (P, A, ctx) {
var r = P.r, put = evbPut(A), ways = ctx.ways, X = r.x1 - r.x0, Z = r.z1 - r.z0, along = Z >= X, lite = P.lite;
var len = along ? Z : X, n = Math.max(1, Math.floor(len / (lite ? 5 : 3.4))), list = o.side || [], k = 0;
for (var i = 0; i < n; i++) {
var t = (i + 0.5) / n;
if (along) {
var z = r.z0 + Z * t;
if (!evbNear(ways, r.x0, z, 2))
put(list[k++ % list.length], r.x0 + 0.55, z, Math.PI / 2);
if (!evbNear(ways, r.x1, z, 2))
put(list[k++ % list.length], r.x1 - 0.55, z, -Math.PI / 2);
}
else {
var x = r.x0 + X * t;
if (Math.abs(x) < 3)
continue;
if (!evbNear(ways, x, r.z0, 2))
put(list[k++ % list.length], x, r.z0 + 0.55, 0);
if (!lite && !evbNear(ways, x, r.z1, 2))
put(list[k++ % list.length], x, r.z1 - 0.55, Math.PI);
}
if (o.hang && i % 2 === 0)
put(evbLift(o.hang, Math.round((ctx.H - 0.04 - 3.6) * 100) / 100), along ? (r.x0 + r.x1) / 2 : r.x0 + X * t, along ? r.z0 + Z * t : (r.z0 + r.z1) / 2, 0);
}
if (o.rug)
put(o.rug, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2, 0);
if (o.centre)
put(o.centre, (r.x0 + r.x1) / 2, along ? r.z0 + Z * 0.35 : (r.z0 + r.z1) / 2, 0);
if (o.corner)
[[r.x0 + 0.8, r.z1 - 0.8], [r.x1 - 0.8, r.z1 - 0.8]].forEach(function (q) { put(o.corner, q[0], q[1], 0); });
A.spots.push({ x: (r.x0 + r.x1) / 2, z: along ? r.z0 + Z * 0.6 : (r.z0 + r.z1) / 2, room: String(r.n || "hall").replace(/^The /, "").toLowerCase(), level: ctx.L });
if (o.act)
evbActAt(ctx, (r.x0 + r.x1) / 2 + (along ? X * 0.25 : 0), along ? r.z0 + Z * 0.55 : (r.z0 + r.z1) / 2 + Z * 0.2, 1.8, o.act[0], o.act[1], o.act[2]);
};
}
var DPX_GRID = {
great: { X: 28, Z: 24, hx: 8, hd: 14, s: 3.5, g0: -14, g1: -10, m: 0, xi: 16, x1: 18, c: 6, x4: 17 },
palace: { X: 24, Z: 20, hx: 7, hd: 11, s: 3, g0: -12, g1: -8.5, m: 0, xi: 13.5, x1: 15.5, c: 5, x4: 14.5 },
temple: { X: 22, Z: 20, hx: 7, hd: 11, s: 3, g0: -11, g1: -7.5, m: 0, xi: 12.5, x1: 14.5, c: 5, x4: 13.5 },
mid: { X: 16, Z: 13, hx: 5.5, hd: 8, s: 2.5, g0: -8, g1: -5.5, m: 0, xi: 10, x1: 11.5, c: 4, x4: 10.5 },
small: { X: 11.5, Z: 9.5, hx: 4, hd: 5.5, s: 2, g0: -5.5, g1: -3.5, m: 0.2, xi: 6.8, x1: 7.8, c: 3, x4: 7.2 }
};
function dpxPlan8(h) {
return { hall: { k: h[0], n: h[1] }, spine: { k: h[2], n: h[3] }, gallery: { k: h[4], n: h[5] }, c4: { k: h[6], n: h[7] },
r1: { merge: ["r1i", "r1o"], k: h[8], n: h[9] }, r2: { merge: ["r2i", "r2o"], k: h[10], n: h[11] }, r3: { merge: ["r3i", "r3o"], k: h[12], n: h[13] }, r4: { merge: ["r4i", "r4o"], k: h[14], n: h[15] },
l1: { merge: ["l1i", "l1o"], k: h[16], n: h[17] }, l2: { merge: ["l2i", "l2o"], k: h[18], n: h[19] }, l3: { merge: ["l3i", "l3o"], k: h[20], n: h[21] }, l4: { merge: ["l4i", "l4o"], k: h[22], n: h[23] } };
}
function dpxTheme(key, o) {
EVB_THEMES[key] = { seed: o.seed || 7, panel: o.panel, pal: o.pal, remap: o.remap, hello: o.hello };
if (typeof ES_HOUSES !== "undefined")
ES_HOUSES["evb_" + key] = { g: DPX_GRID[o.grid], h: o.h || 4, levels: o.plan.length, stairX: o.stairX || 4, stairZ: o.stairZ || (o.grid === "great" ? 13 : o.grid === "small" ? 6.8 : 11.5),
floors: o.floors, wall: o.wall, trim: o.trim, stone: !!o.stone, plan: o.plan };
}
function dpxFinish(F) { if (typeof ES_FINISH !== "undefined")
Object.keys(F).forEach(function (k) { ES_FINISH[k] = F[k]; }); }
function dpxRooms(R) { if (typeof ES_ROOM !== "undefined")
Object.keys(R).forEach(function (k) { ES_ROOM[k] = R[k]; }); }
(function () {
if (typeof ES_ROOM === "undefined")
return;
var J = "dpx_jellylamp";
dpxRooms({
dpxamber: dpxHall({ side: ["dpx_coralcolumn", "dpx_kelp", "dpx_pearllamp", "dpx_anemone"], hang: J, rug: "dpx_spongerug", corner: "dpx_coralpot", act: ["The Sea King's herald", "ask what is in every room", function () { dpxActGuide("palace"); }] }),
dpxpearlgal: dpxHall({ side: ["dpx_mosaic", "dpx_pearllamp", "dpx_shellmirror", "dpx_coralpot"], hang: J, act: ["A shell that sings", "hold it to your ear", function () { dpxActShellBook(); }] }),
dpxshellcor: dpxHall({ side: ["dpx_kelp", "dpx_anemone", "dpx_coralpot"], hang: J }),
dpxlightfall: dpxHall({ side: ["dpx_coralcolumn", "dpx_glowglobe", "dpx_kelp"], hang: J, rug: "dpx_spongerug", act: ["The light from above", "look up", function () { dpxActWindow(); }] }),
dpxwrecks: dpxHall({ side: ["dpx_wheel", "dpx_anchor", "dpx_mosaic", "dpx_statueboy"], hang: J, act: ["Things from the wrecks", "guess what each one was for", function () { dpxActSurface(); }] }),
dpxkelpcor: dpxHall({ side: ["dpx_kelp", "dpx_net", "dpx_pearllamp"], hang: J }),
dpxaudience: dpxRoom({ back: ["dpx_shellthrone"], side: ["dpx_coralcolumn", "dpx_kelp", "dpx_pearllamp"], mid: ["dpx_spongerug"], hang: J, corner: "dpx_coralpot", acts: [[0.55, 0, "The Sea King's audience", "ask the Sea King a question", function () { dpxActKing(); }]] }),
dpxsing: dpxRoom({ back: ["dpx_shellharp"], side: ["dpx_shellchair", "dpx_shellstool", "dpx_anemone"], mid: ["dpx_spongerug"], hang: J, acts: [[0.6, 0, "The singing stone", "sing with the merfolk", function () { dpxActSing(); }]] }),
dpxlibrary: dpxRoom({ back: ["dpx_shellshelf", "dpx_shellshelf"], side: ["dpx_shellshelf", "dpx_pearllamp", "dpx_shellshelf", "dpx_shellchair"], mid: ["dpx_coraltable"], hang: J, acts: [[0.5, 0.3, "The shell books", "read one", function () { dpxActShellBook(); }]] }),
dpxcharts: dpxRoom({ back: ["dpx_wheel"], side: ["dpx_mosaic", "dpx_tideglass", "dpx_shellshelf"], mid: ["dpx_coraltablelong"], hang: J, acts: [[0.5, 0.4, "The charts of the seas", "read the currents", function () { dpxActCharts(); }]] }),
dpxtreasury: dpxRoom({ back: ["goldhoard"], side: ["treasurechest", "dpx_anchor", "treasurechest", "goldpile"], mid: ["dpx_glowglobe"], hang: J, acts: [[0.6, 0, "The treasure of the wrecks", "pick something up", function () { dpxActTreasure(); }]] }),
dpxanemone: dpxRoom({ side: ["dpx_anemone", "dpx_coralpot", "dpx_kelp", "dpx_anemone"], mid: ["dpx_bubbles", "dpx_seahorse"], corner: "dpx_kelp", hang: J, acts: [[0.5, 0.4, "The anemones", "touch one, gently", function () { dpxActAnemone(); }]] }),
dpxbubblecourt: dpxRoom({ mid: ["dpx_bubbles"], side: ["dpx_anemone", "dpx_coralcolumn", "dpx_kelp"], corner: "dpx_coralpot", hang: J, acts: [[0.5, 0, "The rising bubbles", "make a wish on one", function () { dpxActBubbles(); }]] }),
dpxthrone: dpxRoom({ back: ["dpx_shellthrone"], side: ["dpx_coralcolumn", "dpx_pearllamp", "dpx_coralcolumn", "dpx_kelp"], mid: ["dpx_spongerug", "dpx_spongerug"], hang: J, corner: "dpx_coralpot",
acts: [[0.78, 0, "The Sea King", "bow, and speak with the King", function () { dpxActKing(); }], [0.4, 0.6, "The Sea King's trident", "look at it", function () { dpxActTrident(); }]] }),
dpxsurface: dpxRoom({ back: ["dpx_statueboy"], side: ["dpx_wheel", "dpx_anchor", "dpx_mosaic"], mid: ["dpx_glowglobe"], hang: J, acts: [[0.5, 0, "Things from the world above", "guess what each one was for", function () { dpxActSurface(); }]] }),
dpxcomb: dpxRoom({ back: ["dpx_shellmirror"], side: ["dpx_shellmirror", "dpx_shellstool", "dpx_pearllamp"], hang: J, acts: [[0.6, 0, "The shell mirror", "comb your hair the merfolk way", function () { dpxActComb(); }]] }),
dpxgames: dpxRoom({ mid: ["dpx_coraltable"], side: ["dpx_shellchair", "dpx_shellstool", "dpx_glowglobe"], hang: J, acts: [[0.5, 0, "Find the pearl", "play the shell game", function () { dpxActShellGame(); }]] }),
dpxfeast: dpxRoom({ mid: ["dpx_coraltablelong", "dpx_coraltablelong"], side: ["dpx_shellstool", "dpx_shellstool", "dpx_pearllamp", "dpx_mosaic"], hang: J, acts: [[0.3, 0.5, "The feast", "see what the merfolk eat", function () { dpxActFeast(); }]] }),
dpxpantry: dpxRoom({ side: ["dpx_coldclam", "dpx_kelp", "dpx_net", "dpx_coldclam"], mid: ["dpx_coraltable"], hang: J }),
dpxkitchen: dpxRoom({ back: ["dpx_ventstove", "dpx_ventstove"], side: ["dpx_coldclam", "dpx_coraltable", "dpx_net", "dpx_bubblebasin"], mid: ["dpx_coraltable"], hang: J, acts: [[0.7, 0, "The warm vent", "cook something", function () { dpxActCook(); }]] }),
dpxlarder: dpxRoom({ side: ["dpx_coldclam", "dpx_coldclam", "dpx_kelp"], mid: ["dpx_net"], hang: J }),
dpxball: dpxRoom({ side: ["dpx_coralcolumn", "dpx_glowglobe", "dpx_coralcolumn", "dpx_anemone"], mid: ["dpx_spongerug", "dpx_spongerug", "dpx_spongerug"], back: ["dpx_shellharp"], hang: J, corner: "dpx_coralpot",
acts: [[0.5, 0, "The great ball", "dance", function () { dpxActBall(); }]] }),
dpxkingbed: dpxRoom({ back: ["dpx_clambed"], side: ["dpx_shellwardrobe", "dpx_pearllamp", "dpx_mosaic", "dpx_shellchair"], rug: "dpx_spongerug", hang: J }),
dpxcrown: dpxRoom({ mid: ["crownstand"], side: ["dpx_shellmirror", "treasurechest", "dpx_pearllamp"], hang: J, acts: [[0.5, 0.4, "The crown of the sea", "look at it", function () { dpxActCrown(); }]] }),
dpxgran: dpxRoom({ back: ["dpx_oysters"], side: ["dpx_shellchair", "dpx_glowglobe", "dpx_shellshelf"], mid: ["dpx_spongerug"], hang: J,
acts: [[0.6, 0, "The Sea King's old mother", "ask her about the world above", function () { dpxActGran(); }], [0.85, 0.5, "The twelve oysters", "count them", function () { dpxActOysters(); }]] }),
dpxstory: dpxRoom({ side: ["dpx_shellchair", "dpx_shellchair", "dpx_shellshelf"], mid: ["dpx_spongerug"], back: ["dpx_glowglobe"], hang: J, acts: [[0.5, 0, "The story of the Little Mermaid", "hear it told", function () { dpxActStory(); }]] }),
dpxprincess: dpxRoom({ back: ["dpx_clambed2"], side: ["dpx_shellmirror", "dpx_coralpot", "dpx_shellwardrobe", "dpx_pearllamp"], rug: "dpx_spongerug", hang: J, acts: [[0.4, 0.5, "A princess's keepsake", "look at it", function () { dpxActKeepsake(); }]] }),
dpxyoungest: dpxRoom({ back: ["dpx_clambed2"], side: ["dpx_statueboy", "dpx_coralpot", "dpx_shellmirror"], mid: ["dpx_spongerug"], hang: J,
acts: [[0.5, 0, "The youngest princess's dream", "read what she wished for", function () { dpxActYoungest(); }]] }),
dpxbath: dpxRoom({ back: ["dpx_clambath"], side: ["dpx_bubblebasin", "dpx_shellmirror", "dpx_coralpot"], hang: J, acts: [[0.6, 0, "The bubbling clam", "take a bath", function () { dpxActBath(); }]] }),
dpxschool: dpxRoom({ back: ["dpx_mosaic"], side: ["dpx_shellstool", "dpx_shellstool", "dpx_shellshelf"], mid: ["dpx_coraldesk", "dpx_coraldesk"], hang: J, acts: [[0.75, 0, "The princesses' lessons", "take the quiz", function () { dpxActMerQuiz(); }]] }),
dpxwardrobe: dpxRoom({ side: ["dpx_shellwardrobe", "dpx_shellmirror", "dpx_shellwardrobe"], mid: ["dpx_shellstool"], hang: J, acts: [[0.5, 0, "The pearl wardrobe", "choose what to wear", function () { dpxActDress(); }]] }),
dpxstable: dpxRoom({ side: ["dpx_seahorse", "dpx_kelp", "dpx_seahorse"], mid: ["dpx_bubbles"], hang: J, acts: [[0.5, 0.4, "A seahorse", "feed it", function () { dpxActSeahorse(); }]] }),
dpxguard: dpxRoom({ side: ["dpx_anchor", "dpx_net", "dpx_shellstool"], mid: ["dpx_coraltable"], hang: J, acts: [[0.5, 0, "The Trident Guard's watch", "stand a watch", function () { dpxActWatch(); }]] }),
dpxwindow: dpxRoom({ back: ["dpx_glowglobe"], side: ["dpx_shellchair", "dpx_kelp", "dpx_shellchair"], hang: J, acts: [[0.7, 0, "The amber window", "look up at the light", function () { dpxActWindow(); }]] }),
dpxsponge: dpxRoom({ side: ["dpx_coldclam", "dpx_kelp", "dpx_net"], hang: J }),
dpxnetroom: dpxRoom({ side: ["dpx_net", "dpx_shellstool", "dpx_net"], mid: ["dpx_coraltable"], hang: J, acts: [[0.5, 0, "A torn net", "mend it", function () { dpxActNet(); }]] }),
dpxhgrotto: dpxHall({ side: ["dpx_kelp", "dpx_pearllamp", "dpx_coralpot"], hang: J, act: ["Whose house this is", "say hello", function () { dpxActHome(); }] }),
dpxhpass: dpxHall({ side: ["dpx_mosaic", "dpx_pearllamp"], hang: J }),
dpxhgarden: dpxRoom({ mid: ["dpx_bubbles"], side: ["dpx_anemone", "dpx_coralpot", "dpx_kelp"], hang: J, acts: [[0.5, 0.4, "The family's sea garden", "plant something", function () { dpxActGarden(); }]] }),
dpxhfamily: dpxRoom({ mid: ["dpx_spongerug"], side: ["dpx_shellsofa", "dpx_shellchair", "dpx_glowglobe", "dpx_shellshelf"], hang: J, acts: [[0.5, 0, "The family's stories", "listen", function () { dpxActShellBook(); }]] }),
dpxhkitchen: dpxRoom({ back: ["dpx_ventstove"], side: ["dpx_coldclam", "dpx_bubblebasin", "dpx_net"], mid: ["dpx_coraltable"], hang: J, acts: [[0.7, 0, "The warm vent", "cook something", function () { dpxActCook(); }]] }),
dpxhparents: dpxRoom({ back: ["dpx_clambed"], side: ["dpx_shellwardrobe", "dpx_pearllamp", "dpx_shellmirror"], hang: J }),
dpxhchildren: dpxRoom({ back: ["dpx_clambed2"], side: ["dpx_clambed2", "dpx_cradle", "dpx_glowglobe"], mid: ["dpx_spongerug"], hang: J, acts: [[0.4, 0.4, "The shell cradle", "sing a lullaby", function () { dpxActLullaby(); }]] }),
dpxhdining: dpxRoom({ mid: ["dpx_coraltable"], side: ["dpx_shellstool", "dpx_shellstool", "dpx_mosaic"], hang: J, acts: [[0.3, 0.5, "Supper", "see what is on the table", function () { dpxActFeast(); }]] }),
dpxhbath: dpxRoom({ back: ["dpx_clambath"], side: ["dpx_bubblebasin", "dpx_shellmirror"], hang: J, acts: [[0.6, 0, "The bubbling clam", "take a bath", function () { dpxActBath(); }]] }),
dpxhcraft: dpxRoom({ side: ["dpx_net", "dpx_coraldesk", "dpx_shellshelf", "dpx_glowglobe"], mid: ["dpx_coraltable"], hang: J, acts: [[0.5, 0, "The workroom", "help with the work", function () { dpxActCraft(); }]] }),
dpxhstore: dpxRoom({ side: ["treasurechest", "dpx_coldclam", "dpx_anchor", "dpx_net"], hang: J, acts: [[0.6, 0, "The treasure nook", "look in the chest", function () { dpxActTreasure(); }]] }),
dpxwhall: dpxHall({ side: ["dpx_seasnake", "dpx_jars", "dpx_bonechair"], corner: "dpx_kelp", act: ["The Sea Witch", "speak with her", function () { dpxActWitch(); }] }),
dpxwpass: dpxHall({ side: ["dpx_seasnake", "dpx_kelp"] }),
dpxwcauldron: dpxRoom({ mid: ["dpx_cauldron"], side: ["dpx_jars", "dpx_seasnake", "dpx_jars"], acts: [[0.5, 0.45, "The cauldron", "stir it", function () { dpxActCauldron(); }], [0.5, -0.45, "The witch's bargain", "hear what she offers", function () { dpxActBargain(); }]] }),
dpxwparlour: dpxRoom({ back: ["dpx_bonechair"], side: ["dpx_seasnake", "dpx_jars", "dpx_seasnake"], mid: ["dpx_spongerug"], acts: [[0.6, 0, "Her little pets", "look at the sea-snakes", function () { dpxActSnakes(); }]] }),
dpxwjars: dpxRoom({ side: ["dpx_jars", "dpx_jars", "dpx_jars"], mid: ["dpx_coraltable"], acts: [[0.5, 0, "The jars", "read the labels", function () { dpxActJars(); }]] }),
dpxwbed: dpxRoom({ back: ["dpx_clambed"], side: ["dpx_jars", "dpx_seasnake"] }),
dpxwtreasure: dpxRoom({ side: ["treasurechest", "goldpile", "dpx_anchor", "treasurechest"], mid: ["dpx_wheel"], acts: [[0.5, 0, "Drowned treasure", "look through it", function () { dpxActTreasure(); }]] }),
dpxwmirror: dpxRoom({ back: ["dpx_shellmirror"], side: ["dpx_jars", "dpx_bonechair"], acts: [[0.7, 0, "The witch's dark mirror", "look into it", function () { dpxActWitchMirror(); }]] })
});
var c = 0xF0C8B8;
dpxFinish({
dpxamber: { f: "marble", fc: 0xE8D8C8, w: 0xD8705E, p: "stone", t: 0xE8C060, c: "coffer" }, dpxpearlgal: { f: "marble", fc: 0xF0ECF4, w: 0xE8B8A8, p: "marble", t: 0xE8C060 }, dpxshellcor: { f: "tile", fc: 0xE0D0A8, w: 0x2E8A9A, p: "stone", t: 0xE8C060 },
dpxlightfall: { f: "marble", fc: 0xE8F0F4, w: 0x5AB8C8, p: "marble", t: 0xE8C060, c: "coffer" }, dpxwrecks: { f: "wood", fc: 0x8A6A4A, w: 0x3A7A8A, p: "wood", t: 0xC8A060 }, dpxkelpcor: { f: "stone", fc: 0xC8C0A0, w: 0x4E8A5A, p: "stone", t: 0xC8A060 },
dpxaudience: { f: "marble", fc: 0xF0E4DC, w: 0xE07A6A, p: "damask", t: 0xE8C060, c: "coffer" }, dpxsing: { f: "marble", fc: 0xE8F0F8, w: 0x7AB8E8, p: "stripe", t: 0xE8C060 }, dpxlibrary: { f: "wood", fc: 0xB08860, w: 0x2E6A8A, p: "wood", t: 0xE8C060 },
dpxcharts: { f: "wood", fc: 0xA88060, w: 0x3A6A8A, p: "damask", t: 0xE8C060 }, dpxtreasury: { f: "checker", fc: 0xE8D8A0, w: 0xC8984A, p: "damask", t: 0xE8C060 }, dpxanemone: { f: "stone", fc: 0xD8D0B0, w: 0x2AA898, p: "stone", t: 0xF0E0C0 },
dpxbubblecourt: { f: "stone", fc: 0xE0D8C0, w: 0x3AB8C8, p: "stone", t: 0xF0E0C0 }, dpxthrone: { f: "carpet", fc: 0x1E5A8A, w: 0xD8604E, p: "damask", t: 0xE8C060, c: "coffer" }, dpxsurface: { f: "wood", fc: 0x9A7A5A, w: 0x6A9AA8, p: "wood", t: 0xC8A060 },
dpxcomb: { f: "marble", fc: 0xF4ECF0, w: 0xF2B8C8, p: "marble", t: 0xE8C060 }, dpxgames: { f: "checker", fc: 0xE8E0D0, w: 0x5AA8C8, p: "stripe", t: 0xE8C060 }, dpxfeast: { f: "marble", fc: 0xE8DCD0, w: 0xC85A4E, p: "damask", t: 0xE8C060, c: "coffer" },
dpxpantry: { f: "tile", fc: 0xE0E8E8, w: 0x6AA8A8, p: "tile", t: 0xD8D8D8 }, dpxkitchen: { f: "tile", fc: 0xE8E0D0, w: 0x5A9AA0, p: "tile", t: 0xD8D8D8 }, dpxlarder: { f: "tile", fc: 0xE0E8F0, w: 0x8AC8D8, p: "tile", t: 0xD8D8D8 },
dpxball: { f: "marble", fc: 0xF4F0FA, w: 0x48A8B8, p: "marble", t: 0xE8C060, c: "coffer" }, dpxkingbed: { f: "carpet", fc: 0x1E4A7A, w: 0xC85A4E, p: "damask", t: 0xE8C060, c: "coffer" }, dpxcrown: { f: "marble", fc: 0xF0E8D8, w: 0xB83A3A, p: "damask", t: 0xE8C060 },
dpxgran: { f: "carpet", fc: 0x5A3A6A, w: 0xC8A8D8, p: "damask", t: 0xE8C060 }, dpxstory: { f: "carpet", fc: 0x2A6A7A, w: 0xE8C8A8, p: "stripe", t: 0xE8C060 }, dpxprincess: { f: "carpet", fc: 0xF0D8E0, w: 0xF2B8C0, p: "damask", t: 0xE8C060 },
dpxyoungest: { f: "carpet", fc: 0xC82A2A, w: 0xF8D8C8, p: "damask", t: 0xE8C060 }, dpxbath: { f: "marble", fc: 0xF0F8FA, w: 0x8AD8E0, p: "tile", t: 0xE8C060 }, dpxschool: { f: "wood", fc: 0xC8A070, w: 0x8AC8B8, p: "plaster", t: 0xE8C060 },
dpxwardrobe: { f: "carpet", fc: 0xE8D8F0, w: 0xD8B8E8, p: "stripe", t: 0xE8C060 }, dpxstable: { f: "stone", fc: 0xD8C8A0, w: 0x7AA87A, p: "stone", t: 0xC8A060 }, dpxguard: { f: "stone", fc: 0xC8C0B0, w: 0x6A8A9A, p: "stone", t: 0xC8A060 },
dpxwindow: { f: "marble", fc: 0xF0ECE4, w: 0xF0B860, p: "marble", t: 0xE8C060 }, dpxsponge: { f: "stone", fc: 0xD8C8A0, w: 0xD8B060, p: "stone", t: 0xC8A060 }, dpxnetroom: { f: "wood", fc: 0xB89870, w: 0x8AB0A8, p: "wood", t: 0xC8A060 },
dpxhgrotto: { f: "stone", fc: 0xE0D4B8, w: c, p: "stone", t: 0xC8A070 }, dpxhpass: { f: "stone", fc: 0xD8CCB0, w: 0xE8C0B0, p: "stone", t: 0xC8A070 }, dpxhgarden: { f: "stone", fc: 0xD8D0B0, w: 0x6AC0B0, p: "stone", t: 0xC8A070 },
dpxhfamily: { f: "carpet", fc: 0x2A8A9A, w: 0xF0D0C0, p: "stripe", t: 0xC8A070 }, dpxhkitchen: { f: "tile", fc: 0xE8E0D0, w: 0x7AB0B0, p: "tile", t: 0xC8A070 }, dpxhparents: { f: "carpet", fc: 0x3A6A9A, w: 0xE8C8D0, p: "damask", t: 0xC8A070 },
dpxhchildren: { f: "carpet", fc: 0xF8D870, w: 0x9AD8F0, p: "stripe", t: 0xFFFFFF }, dpxhdining: { f: "stone", fc: 0xE0D0B8, w: 0xE8A898, p: "stone", t: 0xC8A070 }, dpxhbath: { f: "marble", fc: 0xF0F8FA, w: 0x8AD8E0, p: "tile", t: 0xC8A070 },
dpxhcraft: { f: "wood", fc: 0xB89870, w: 0xA8C8B0, p: "wood", t: 0xC8A070 }, dpxhstore: { f: "stone", fc: 0xC8B898, w: 0xB8A890, p: "stone", t: 0xC8A070 },
dpxwhall: { f: "stone", fc: 0x3A3E3C, w: 0x2A4A3A, p: "stone", t: 0xE6DEC8 }, dpxwpass: { f: "stone", fc: 0x3A3E3C, w: 0x324A3E, p: "stone", t: 0xE6DEC8 }, dpxwcauldron: { f: "stone", fc: 0x2E3230, w: 0x1E3A2A, p: "stone", t: 0xE6DEC8 },
dpxwparlour: { f: "stone", fc: 0x343836, w: 0x3A2A4A, p: "stone", t: 0xE6DEC8 }, dpxwjars: { f: "wood", fc: 0x4A3A2A, w: 0x2A3A3A, p: "wood", t: 0xE6DEC8 }, dpxwbed: { f: "stone", fc: 0x343836, w: 0x2A2A3A, p: "stone", t: 0xE6DEC8 },
dpxwtreasure: { f: "stone", fc: 0x3A3A34, w: 0x4A4A2A, p: "stone", t: 0xE6DEC8 }, dpxwmirror: { f: "stone", fc: 0x2A2E2C, w: 0x1A2A3A, p: "stone", t: 0xE6DEC8 }
});
})();
(function () {
if (typeof EVB_THEMES === "undefined")
return;
var coralRemap = { "D6D0C6|plaster": [0xE8B8A8, "stone"], "D8D0C0|coffer": [0xF0D8C8, "coffer"], "B8AE9E|marble": [0xE0705E, "stone"], "D4CEC4|marble": [0xD8E8F0, "marble"] };
dpxTheme("dpxpalace", { grid: "great", h: 4.8, seed: 21, panel: 0xE8B8A8, wall: 0xE8A898, trim: 0xE8C060,
pal: { fab: "teal", fab2: "blush", wood: "white", metal: "gold", stone: "rose", art: 6, rug: 2, rugv: 1 }, remap: coralRemap,
floors: ["The Coral Floor", "The Royal Chambers"],
hello: "🐚 <b>Inside the Sea King's Palace.</b> Two floors of rooms of coral, amber and pearl: the Throne Room, the Great Ballroom, the Grandmother's room with her twelve oysters, the princesses' rooms, the Seahorse Stables. Look for the ✨ cards. Walk out through the amber doors to leave.",
plan: [
{ hall: { k: "dpxamber", n: "The Hall of Amber" }, spine: { k: "dpxpearlgal", n: "The Pearl Gallery" }, gallery: { k: "dpxshellcor", n: "The Corridor of Shells" },
r1i: { k: "dpxaudience", n: "The Audience Chamber" }, r1o: { k: "dpxsing", n: "The Singing Room" },
r2i: { k: "dpxlibrary", n: "The Library of Shells" }, r2o: { k: "dpxcharts", n: "The Chart Room of the Seas" },
r3i: { k: "dpxtreasury", n: "The Treasury of Wrecks", more: [{ s: "n" }] }, r3o: { k: "dpxanemone", n: "The Anemone Garden" },
c4: { k: "dpxbubblecourt", n: "The Court of Rising Bubbles" }, r4: { merge: ["r4i", "r4o"], k: "dpxthrone", n: "The Sea King's Throne Room" },
l1i: { split: "across", at: 0.62, parts: [{ k: "dpxsurface", n: "The Room of Things from Above" }, { k: "dpxcomb", n: "The Comb Room" }] }, l1o: { k: "dpxgames", n: "The Shell Games Room" },
l2i: { k: "dpxfeast", n: "The Feast Hall" }, l2o: { k: "dpxpantry", n: "The Kelp Pantry" },
l3i: { k: "dpxkitchen", n: "The Vent Kitchen", more: [{ s: "w" }] }, l3o: { k: "dpxlarder", n: "The Cold Clam Larder", more: [{ s: "s" }] },
l4: { merge: ["l4i", "l4o"], k: "dpxball", n: "The Great Ballroom" } },
{ hall: { k: "dpxlightfall", n: "The Landing of the Lightfall" }, spine: { k: "dpxwrecks", n: "The Gallery of Wrecks" }, gallery: { k: "dpxkelpcor", n: "The Corridor of Kelp" },
r1i: { k: "dpxkingbed", n: "The Sea King's Bedchamber" }, r1o: { k: "dpxcrown", n: "The Crown Room" },
r2i: { k: "dpxgran", n: "The Grandmother's Room", doors: [{ s: "s", at: 12 }] }, r2o: { k: "dpxstory", n: "The Storytelling Room", doors: [{ s: "s", at: 23 }] },
r3i: { split: "along", at: 0.66, parts: [{ k: "dpxprincess", n: "The Eldest Princess's Room", tint: 0x6A9AE8 }, { k: "dpxbath", n: "The Eldest Princess's Bath Grotto" }] },
r3o: { split: "along", at: 0.62, parts: [{ k: "dpxprincess", n: "The Second Princess's Room", tint: 0xFF9AC8 }, { k: "dpxbath", n: "The Second Princess's Bath Grotto" }] },
c4: { k: "dpxschool", n: "The Princesses' Schoolroom" },
r4i: { split: "along", at: 0.66, parts: [{ k: "dpxprincess", n: "The Third Princess's Room", tint: 0xFFD84A }, { k: "dpxbath", n: "The Third Princess's Bath Grotto" }] },
r4o: { split: "along", at: 0.66, parts: [{ k: "dpxprincess", n: "The Fourth Princess's Room", tint: 0xB88AFF }, { k: "dpxbath", n: "The Fourth Princess's Bath Grotto" }] },
l1i: { k: "dpxprincess", n: "The Fifth Princess's Room", tint: 0x5AD8A8 }, l1o: { k: "dpxyoungest", n: "The Youngest Princess's Room" },
l2i: { k: "dpxwardrobe", n: "The Pearl Wardrobe" }, l2o: { k: "dpxbath", n: "The Royal Bath Grotto" },
l3i: { k: "dpxstable", n: "The Seahorse Stables" }, l3o: { k: "dpxguard", n: "The Trident Guard Room" },
l4i: { k: "dpxwindow", n: "The Amber Window Room" }, l4o: { split: "across", parts: [{ k: "dpxsponge", n: "The Sponge Store" }, { k: "dpxnetroom", n: "The Net-Mending Room" }] } }
] });
var homes = [["dpxhome_pearl", 0xF0E8F0, "pearl"], ["dpxhome_coral", 0xF0C0B0, "coral"], ["dpxhome_kelp", 0xC8E0D0, "kelp"]];
homes.forEach(function (h, i) {
dpxTheme(h[0], { grid: "small", h: 3.8, seed: 31 + i, panel: h[1], wall: h[1], trim: 0xC8A070, pal: { fab: i === 1 ? "blush" : "teal", fab2: "teal", wood: "white", metal: "gold", stone: "rose", art: 3, rug: 1, rugv: 1 }, remap: coralRemap,
floors: ["The house"],
hello: "🐚 <b>Inside a merfolk house.</b> Shell and coral, pearls for lamps, a clam for a bed, a warm vent to cook on. Look for the ✨ cards; the family's own workroom is at the back. Walk out of the round door to leave.",
plan: [dpxPlan8(["dpxhgrotto", "The Entry Grotto", "dpxhpass", "The Shell Passage", "dpxhpass", "The Kelp Passage", "dpxhgarden", "The Sea Garden",
"dpxhfamily", "The Family Room", "dpxhkitchen", "The Vent Kitchen", "dpxhparents", "The Clam Bedroom", "dpxhchildren", "The Children's Shell Room",
"dpxhdining", "The Pearl Dining Room", "dpxhbath", "The Bubble Bath", "dpxhcraft", "The Workroom", "dpxhstore", "The Treasure Nook"])] });
});
dpxTheme("dpxwitch", { grid: "small", h: 4.2, seed: 41, panel: 0x2A3A32, wall: 0x2A3A32, trim: 0xE6DEC8, pal: { fab: "charcoal", fab2: "navy", wood: "walnut", metal: "brass", stone: "marble", art: 0, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0x2A322E, "stone"], "D8D0C0|coffer": [0x323A36, "stone"], "B8AE9E|marble": [0x3A3E3C, "stone"], "D4CEC4|marble": [0x3A3E3C, "stone"] },
floors: ["The Sea Witch's house"],
hello: "🦑 <b>Inside the Sea Witch's house.</b> Bone and dark rock, jars of strange things, the cauldron bubbling green. Andersen's witch is wicked but she keeps her word. Nothing here can hurt you. Look for the ✨ cards; walk out of the jawbone door to leave.",
plan: [dpxPlan8(["dpxwhall", "The Jawbone Hall", "dpxwpass", "The Passage of Polyps", "dpxwpass", "The Snake Passage", "dpxwcauldron", "The Cauldron Room",
"dpxwparlour", "The Witch's Parlour", "dpxwjars", "The Potion Store", "dpxwbed", "The Witch's Bedchamber", "dpxwtreasure", "The Room of Drowned Treasure",
"dpxwparlour", "The Sea-Snake Den", "dpxwjars", "The Spell Library", "dpxwmirror", "The Room of the Dark Mirror", "dpxwtreasure", "The Bone Store"])] });
})();
"use strict";
(function () {
if (typeof ES_ROOM === "undefined")
return;
var L = "dpx_oillamp", T = "dpx_tripod";
dpxRooms({
dpxtporch: dpxHall({ side: ["dpx_silvercolumn", "dpx_tripod", "dpx_silvercolumn"], corner: "dpx_amphorae", act: ["A priest of Poseidon", "ask what is in the temple", function () { dpxActGuide("temple"); }] }),
dpxtway: dpxHall({ side: ["dpx_nereid", "dpx_oillamp", "dpx_kingstatue", "dpx_queenstatue"], act: ["The ten kings", "learn their names", function () { dpxActKings(); }] }),
dpxtkings: dpxHall({ side: ["dpx_kingstatue", "dpx_queenstatue", "dpx_oillamp"] }),
dpxtoffer: dpxRoom({ side: ["dpx_amphorae", "treasurechest", "goldpile", "dpx_amphora"], mid: ["goldhoard"], corner: L, acts: [[0.5, 0, "The offerings", "see what was given", function () { dpxActOfferings(); }]] }),
dpxtrobes: dpxRoom({ side: ["dpx_robes", "dpx_robes", "dpx_oillamp"], mid: ["dpx_bench"], acts: [[0.5, 0, "The azure robes", "put one on, as the kings did to judge", function () { dpxActRobes(); }]] }),
dpxtlib: dpxRoom({ back: ["dpx_scrolls", "dpx_scrolls"], side: ["dpx_scrolls", "dpx_oillamp", "dpx_scrolls"], mid: ["dpx_atltable"], acts: [[0.5, 0.3, "Solon's tale", "read how the story of Atlantis came to Athens", function () { dpxActSolon(); }]] }),
dpxtgolden: dpxRoom({ side: ["dpx_kingstatue", "dpx_queenstatue", "dpx_kingstatue", "dpx_queenstatue"], mid: ["dpx_tripod"], acts: [[0.5, 0, "The golden kings", "read who they were", function () { dpxActKings(); }]] }),
dpxtpillar: dpxRoom({ mid: ["dpx_pillar"], side: ["dpx_tripod", "dpx_oillamp"], acts: [[0.5, 0.45, "The pillar of orichalcum", "read the laws cut on it", function () { dpxActPillar(); }]] }),
dpxtlamps: dpxRoom({ side: ["dpx_oillamp", "dpx_amphora", "dpx_oillamp", "dpx_amphorae"], mid: ["dpx_atltable"], acts: [[0.5, 0, "The lamps", "light one", function () { dpxActLamp(); }]] }),
dpxtcleito: dpxRoom({ back: ["dpx_queenstatue"], side: ["dpx_oillamp", "dpx_amphora"], mid: ["dpx_altar"], acts: [[0.4, 0, "The shrine of Cleito", "hear her story", function () { dpxActCleito(); }]] }),
dpxtsanct: dpxRoom({ mid: ["dpx_poseidon"], side: ["dpx_nereid", "dpx_silvercolumn", "dpx_nereid", "dpx_tripod"], corner: "dpx_tripod",
acts: [[0.2, 0.6, "Poseidon in his chariot", "look up at the statue", function () { dpxActPoseidon(); }], [0.85, -0.6, "The roof of ivory", "look up", function () { dpxActRoof(); }]] }),
dpxtvotive: dpxRoom({ side: ["dpx_amphora", "dpx_amphorae", "goldpile"], acts: [[0.5, 0, "Votive gifts", "leave one", function () { dpxActAltar(); }]] }),
dpxtincense: dpxRoom({ side: ["dpx_amphorae", "dpx_amphora", "dpx_tripod"] }),
dpxtpriests: dpxRoom({ mid: ["dpx_atltable"], side: ["dpx_couch", "dpx_oillamp", "dpx_scrolls"], acts: [[0.5, 0, "The priests' calendar", "learn when the kings met", function () { dpxActCalendar(); }]] }),
dpxtnereids: dpxRoom({ side: ["dpx_nereid", "dpx_nereid", "dpx_dolphinmosaic"], mid: ["dpx_nereid"], acts: [[0.5, 0.45, "The Nereids", "count them", function () { dpxActNereids(); }]] }),
dpxtaltar: dpxRoom({ mid: ["dpx_altar"], side: ["dpx_tripod", "dpx_amphora"], acts: [[0.5, 0.45, "The altar", "bring fruits of the earth", function () { dpxActAltar(); }]] }),
dpxtjudge: dpxRoom({ mid: ["dpx_hearth"], side: ["dpx_bench", "dpx_robes", "dpx_bench"], acts: [[0.5, 0.45, "The hall of judgement", "sit in judgement by the embers", function () { dpxActJudge(); }]] }),
dpxthundred: dpxRoom({ side: ["dpx_nereid", "dpx_silvercolumn", "dpx_nereid", "dpx_dolphinmosaic"], mid: ["dpx_nereid", "dpx_tripod", "dpx_nereid"], acts: [[0.5, 0.6, "The hundred Nereids", "count them", function () { dpxActNereids(); }]] }),
dpxphall: dpxHall({ side: ["dpx_atlcolumn", "dpx_tripod", "dpx_kingstatue"], rug: null, corner: "dpx_amphorae", act: ["The palace steward", "ask what is in every room", function () { dpxActGuide("apalace"); }] }),
dpxpgal: dpxHall({ side: ["dpx_dolphinmosaic", "dpx_oillamp", "dpx_atlcolumn"], act: ["The ten kingdoms", "see how the land was shared", function () { dpxActTenKingdoms(); }] }),
dpxpcor: dpxHall({ side: ["dpx_oillamp", "dpx_amphora", "dpx_dolphinmosaic"] }),
dpxpcouncil: dpxRoom({ mid: ["dpx_atltable", "dpx_atltable"], side: ["dpx_bench", "dpx_kingstatue", "dpx_bench"], back: ["dpx_pillar"], acts: [[0.6, 0, "The council of the ten", "hear what the kings swore", function () { dpxActPillar(); }]] }),
dpxpenvoy: dpxRoom({ side: ["dpx_couch", "dpx_atltable", "dpx_amphorae"], mid: ["dpx_tripod"], acts: [[0.5, 0, "An envoy's gifts", "see what they brought", function () { dpxActOfferings(); }]] }),
dpxplib: dpxRoom({ back: ["dpx_scrolls"], side: ["dpx_scrolls", "dpx_oillamp", "dpx_scrolls", "dpx_couch"], mid: ["dpx_atltable"], acts: [[0.5, 0.3, "The history of Atlantis", "read it", function () { dpxActHistory(); }]] }),
dpxptreas: dpxRoom({ side: ["treasurechest", "goldpile", "dpx_amphorae", "treasurechest"], mid: ["goldhoard"], acts: [[0.5, 0, "The treasurer's tablets", "read about orichalcum", function () { dpxActOrichalcum(); }]] }),
dpxpmap: dpxRoom({ mid: ["dpx_mapatl"], side: ["dpx_scrolls", "dpx_oillamp", "dpx_dolphinmosaic"], acts: [[0.5, 0.45, "The map of the rings", "rebuild the city ring by ring", function () { dpxActRings(); }]] }),
dpxpgarden: dpxRoom({ mid: ["dpx_fountain"], side: ["dpx_amphora", "dpx_bench", "dpx_coralpot"], acts: [[0.5, 0.45, "The fountain", "drink from it", function () { dpxActSprings(); }]] }),
dpxpsprings: dpxRoom({ mid: ["dpx_springhot", "dpx_springcold"], side: ["dpx_bench", "dpx_amphora"], acts: [[0.3, 0.5, "The two springs", "feel the hot one and the cold one", function () { dpxActSprings(); }]] }),
dpxpthrone: dpxRoom({ back: ["dpx_kingstatue"], side: ["dpx_atlcolumn", "dpx_tripod", "dpx_atlcolumn", "dpx_amphorae"], mid: ["dpx_atltable"], corner: T,
acts: [[0.7, 0, "The throne of Atlas", "hear about the first king", function () { dpxActAtlas(); }]] }),
dpxpmorning: dpxRoom({ side: ["dpx_couch", "dpx_loom", "dpx_oillamp"], mid: ["dpx_atltable"] }),
dpxpcloak: dpxRoom({ side: ["dpx_robes", "dpx_bench"] }),
dpxpgames: dpxRoom({ mid: ["dpx_atltable"], side: ["dpx_bench", "dpx_oillamp"], acts: [[0.5, 0, "Knucklebones", "play a throw", function () { dpxActKnuckles(); }]] }),
dpxpbanquet: dpxRoom({ side: ["dpx_couch", "dpx_atltable", "dpx_couch", "dpx_tripod"], mid: ["dpx_atltable", "dpx_atltable"], acts: [[0.3, 0.5, "The feast of the kings", "see what is served", function () { dpxActAtlFeast(); }]] }),
dpxpwine: dpxRoom({ side: ["dpx_amphorae", "dpx_amphorae", "dpx_amphora"] }),
dpxpservants: dpxRoom({ mid: ["dpx_atltable"], side: ["dpx_bench", "dpx_bench", "dpx_oillamp"] }),
dpxpkitchen: dpxRoom({ back: ["dpx_hearth"], side: ["dpx_amphorae", "dpx_atltable", "dpx_amphora"], mid: ["dpx_atltable"], acts: [[0.7, 0, "The palace hearth", "bake barley bread", function () { dpxActAtlFeast(); }]] }),
dpxpstore: dpxRoom({ side: ["dpx_amphorae", "dpx_amphorae", "dpx_rope"] }),
dpxpweave: dpxRoom({ side: ["dpx_loom", "dpx_loom", "dpx_bench"], acts: [[0.5, 0, "The loom", "weave a stripe", function () { dpxActLoom(); }]] }),
dpxpbed: dpxRoom({ back: ["dpx_couch"], side: ["dpx_robes", "dpx_oillamp", "dpx_amphora"], mid: ["dpx_atltable"] }),
dpxpbath: dpxRoom({ mid: ["dpx_poolhot"], side: ["dpx_strigil", "dpx_amphora"], acts: [[0.5, 0.5, "The bath of the hot spring", "bathe", function () { dpxActBathAtl(); }]] }),
dpxpnursery: dpxRoom({ side: ["dpx_cradle", "dpx_loom", "dpx_bench"], mid: ["dpx_atltable"], acts: [[0.5, 0, "A lullaby of Atlantis", "sing it", function () { dpxActLullaby(); }]] }),
dpxpmusic: dpxRoom({ back: ["dpx_shellharp"], side: ["dpx_bench", "dpx_bench", "dpx_oillamp"], acts: [[0.6, 0, "The lyre", "play it", function () { dpxActLyre(); }]] }),
dpxpschool: dpxRoom({ side: ["dpx_bench", "dpx_scrolls", "dpx_bench"], mid: ["dpx_atltable"], acts: [[0.5, 0, "The lessons", "take the Atlantis quiz", function () { dpxActAtlQuiz(); }]] }),
dpxpguard: dpxRoom({ side: ["dpx_armour", "dpx_spears", "dpx_shields"], mid: ["dpx_atltable"], acts: [[0.5, 0, "The guard of the kings", "stand watch", function () { dpxActAtlWatch(); }]] }),
dpxparmoury: dpxRoom({ side: ["dpx_armour", "dpx_spears", "dpx_armour", "dpx_shields"], acts: [[0.5, 0, "The bronze armour", "try it on", function () { dpxActArmour(); }]] }),
dpxpwatch: dpxRoom({ side: ["dpx_bench", "dpx_oillamp"], mid: ["dpx_mapatl"], acts: [[0.5, 0.45, "The view over the rings", "look out", function () { dpxActRings(); }]] }),
dpxbhall: dpxHall({ side: ["dpx_atlcolumn", "dpx_amphora", "dpx_bench"], act: ["The bath keeper", "ask about the springs", function () { dpxActSprings(); }] }),
dpxbpass: dpxHall({ side: ["dpx_oillamp", "dpx_bench"] }),
dpxbhead: dpxRoom({ mid: ["dpx_springhot", "dpx_springcold"], side: ["dpx_atlcolumn", "dpx_oillamp"], acts: [[0.3, 0.5, "The spring heads", "feel the hot one and the cold one", function () { dpxActSprings(); }]] }),
dpxbhot: dpxRoom({ mid: ["dpx_poolhot"], side: ["dpx_bench", "dpx_strigil", "dpx_amphora"], acts: [[0.5, 0.5, "The hot bath", "bathe", function () { dpxActBathAtl(); }]] }),
dpxbcold: dpxRoom({ mid: ["dpx_poolcold"], side: ["dpx_bench", "dpx_amphora"], acts: [[0.5, 0.5, "The cold bath", "take the plunge", function () { dpxActColdAtl(); }]] }),
dpxboil: dpxRoom({ side: ["dpx_strigil", "dpx_amphorae", "dpx_bench"], mid: ["dpx_atltable"], acts: [[0.5, 0, "Oil and strigil", "learn how the ancients got clean", function () { dpxActStrigil(); }]] }),
dpxbchange: dpxRoom({ side: ["dpx_bench", "dpx_robes", "dpx_bench"] }),
dpxbsteam: dpxRoom({ mid: ["dpx_hearth"], side: ["dpx_bench", "dpx_bench"], acts: [[0.5, 0.45, "The steam room", "sit in the steam", function () { dpxActSteam(); }]] }),
dpxghall: dpxHall({ side: ["dpx_atlcolumn", "dpx_bench", "dpx_discus"], act: ["The trainer", "ask about the games", function () { dpxActGames(); }] }),
dpxgpass: dpxHall({ side: ["dpx_bench", "dpx_oillamp"] }),
dpxgwrestle: dpxRoom({ mid: ["dpx_spongerug"], side: ["dpx_bench", "dpx_strigil"], acts: [[0.5, 0, "The wrestling floor", "learn a hold", function () { dpxActWrestle(); }]] }),
dpxgoil: dpxRoom({ side: ["dpx_strigil", "dpx_amphorae", "dpx_bench"] }),
dpxgball: dpxRoom({ side: ["dpx_bench", "dpx_discus"], acts: [[0.5, 0, "A ball game", "throw and catch", function () { dpxActBallGame(); }]] }),
dpxgstore: dpxRoom({ side: ["dpx_discus", "dpx_spears", "dpx_discus"], acts: [[0.5, 0, "Discus and javelin", "throw one", function () { dpxActThrow(); }]] }),
dpxgtrack: dpxRoom({ side: ["dpx_bench", "dpx_oillamp"], acts: [[0.2, 0, "The starting line", "race the length of the track", function () { dpxActSprint(); }]] }),
dpxgexedra: dpxRoom({ side: ["dpx_bench", "dpx_bench", "dpx_scrolls"], mid: ["dpx_atltable"], acts: [[0.5, 0, "A lecture", "listen to the teacher", function () { dpxActHistory(); }]] }),
dpxgchariot: dpxRoom({ side: ["dpx_rope", "dpx_bench", "dpx_armour"], mid: ["dpx_atltable"], acts: [[0.5, 0, "The charioteers", "race on the great course", function () { dpxActRace(); }]] }),
dpxahall: dpxHall({ side: ["dpx_spears", "dpx_shields", "dpx_bench"], act: ["A guard of the rings", "ask about the watch", function () { dpxActAtlWatch(); }] }),
dpxaarm: dpxRoom({ side: ["dpx_armour", "dpx_spears", "dpx_armour"], acts: [[0.5, 0, "The bronze armour", "try it on", function () { dpxActArmour(); }]] }),
dpxabunk: dpxRoom({ side: ["dpx_bunk", "dpx_bunk", "dpx_bunk"], mid: ["dpx_atltable"] }),
dpxamess: dpxRoom({ mid: ["dpx_atltable", "dpx_atltable"], side: ["dpx_bench", "dpx_amphorae", "dpx_hearth"], acts: [[0.4, 0.5, "The guards' supper", "sit down to eat", function () { dpxActAtlFeast(); }]] }),
dpxacapt: dpxRoom({ back: ["dpx_mapatl"], side: ["dpx_scrolls", "dpx_oillamp", "dpx_bunk"], acts: [[0.6, 0, "The captain's orders", "read them", function () { dpxActAtlWatch(); }]] }),
dpxasignal: dpxRoom({ side: ["dpx_tripod", "dpx_bench"], mid: ["dpx_hearth"], acts: [[0.5, 0.45, "The signal fire", "send a signal across the rings", function () { dpxActSignal(); }]] }),
dpxdhall: dpxHall({ side: ["dpx_rope", "dpx_oars", "dpx_sail"], centre: "dpx_trireme", act: ["A trireme on the slipway", "learn how it was rowed", function () { dpxActTrireme(); }] }),
dpxdoffice: dpxRoom({ mid: ["dpx_atltable"], side: ["dpx_scrolls", "dpx_mapatl", "dpx_oillamp"], acts: [[0.5, 0, "The shipwright's plans", "read them", function () { dpxActTrireme(); }]] }),
dpxdrope: dpxRoom({ side: ["dpx_rope", "dpx_rope", "dpx_rope"], mid: ["dpx_rope"], acts: [[0.5, 0, "The rope walk", "twist a rope", function () { dpxActRope(); }]] }),
dpxdsail: dpxRoom({ side: ["dpx_sail", "dpx_sail", "dpx_loom"], mid: ["dpx_sail"] }),
dpxdoars: dpxRoom({ side: ["dpx_oars", "dpx_oars", "dpx_oars"] }),
dpxdtimber: dpxRoom({ side: ["dpx_rope", "dpx_oars", "dpx_amphorae"], mid: ["dpx_atltable"] }),
dpxdforge: dpxRoom({ back: ["dpx_hearth"], side: ["dpx_armour", "dpx_shields"], mid: ["anvil"], acts: [[0.6, 0, "The bronze rams", "see how a ram is cast", function () { dpxActRam(); }]] }),
dpxdmaster: dpxRoom({ mid: ["dpx_mapatl"], side: ["dpx_scrolls", "dpx_bench", "dpx_oillamp"], acts: [[0.5, 0.45, "The harbour master", "ask about the harbours", function () { dpxActHarbour(); }]] }),
dpxsporch: dpxHall({ side: ["dpx_atlcolumn", "dpx_oillamp"], act: ["The shrine keeper", "ask whose shrine this is", function () { dpxActShrine(); }] }),
dpxscella: dpxRoom({ back: ["dpx_kingstatue"], mid: ["dpx_altar"], side: ["dpx_tripod", "dpx_amphora"], acts: [[0.5, 0.45, "The altar", "leave fruits and flowers", function () { dpxActAltar(); }]] }),
dpxsroom: dpxRoom({ side: ["dpx_amphora", "dpx_scrolls", "dpx_oillamp"], mid: ["dpx_atltable"] }),
dpxsgarden: dpxRoom({ mid: ["dpx_fountain"], side: ["dpx_coralpot", "dpx_bench"] }),
dpxhoporch: dpxHall({ side: ["dpx_amphora", "dpx_oillamp"], act: ["The family", "say hello", function () { dpxActAtlHome(); }] }),
dpxhocourt: dpxRoom({ mid: ["dpx_fountain"], side: ["dpx_amphora", "dpx_bench", "dpx_coralpot"], acts: [[0.5, 0.45, "The courtyard fountain", "sit by it", function () { dpxActSprings(); }]] }),
dpxhoandron: dpxRoom({ side: ["dpx_couch", "dpx_atltable", "dpx_couch"], mid: ["dpx_dolphinmosaic"], acts: [[0.5, 0, "Supper on the couches", "join the meal", function () { dpxActAtlFeast(); }]] }),
dpxhokitchen: dpxRoom({ back: ["dpx_hearth"], side: ["dpx_amphorae", "dpx_atltable"], acts: [[0.6, 0, "The hearth", "bake barley bread", function () { dpxActAtlFeast(); }]] }),
dpxhobed: dpxRoom({ back: ["dpx_bunk"], side: ["dpx_robes", "dpx_oillamp", "dpx_amphora"] }),
dpxhokids: dpxRoom({ side: ["dpx_bunk", "dpx_bunk", "dpx_atltable"], acts: [[0.5, 0, "Knucklebones", "play a throw", function () { dpxActKnuckles(); }]] }),
dpxholoom: dpxRoom({ side: ["dpx_loom", "dpx_bench"], acts: [[0.5, 0, "The loom", "weave a stripe", function () { dpxActLoom(); }]] }),
dpxhobath: dpxRoom({ mid: ["dpx_poolhot"], side: ["dpx_strigil"], acts: [[0.5, 0.5, "The bath, from the hot spring", "bathe", function () { dpxActBathAtl(); }]] }),
dpxhoshrine: dpxRoom({ back: ["dpx_altar"], side: ["dpx_oillamp", "dpx_amphora"], acts: [[0.5, 0, "The household altar", "leave an offering", function () { dpxActAltar(); }]] }),
dpxhostore: dpxRoom({ side: ["dpx_amphorae", "dpx_amphorae", "dpx_rope"] })
});
var W = 0xF0ECE4, R = 0xB83A2A, K = 0x2A2622, G = 0xE8C060, O = 0xE8743A;
dpxFinish({
dpxtporch: { f: "marble", fc: 0xE8E8EC, w: 0xC8CCD4, p: "marble", t: G, c: "coffer" }, dpxtway: { f: "checker", fc: 0xE8E4DC, w: 0xD8DCE4, p: "marble", t: G }, dpxtkings: { f: "marble", fc: 0xE8E4DC, w: 0xC8C8D0, p: "marble", t: G },
dpxtoffer: { f: "checker", fc: 0xE8D8A8, w: 0xD8B060, p: "damask", t: G }, dpxtrobes: { f: "carpet", fc: 0x2A4AC8, w: 0x9AB0E8, p: "stripe", t: G }, dpxtlib: { f: "wood", fc: 0xA87A50, w: 0xD8C8A0, p: "wood", t: G },
dpxtgolden: { f: "marble", fc: 0xF0E8D0, w: 0xE8C878, p: "damask", t: G, c: "coffer" }, dpxtpillar: { f: "marble", fc: 0x3A3430, w: 0xD8704A, p: "marble", t: G, c: "coffer" }, dpxtlamps: { f: "stone", fc: 0xD8D0C0, w: 0xC8B8A0, p: "stone", t: G },
dpxtcleito: { f: "marble", fc: 0xF0ECE4, w: 0xE8C8C0, p: "marble", t: G }, dpxtsanct: { f: "marble", fc: 0xF2EAD8, w: 0xF2EAD8, p: "marble", t: G, c: "coffer" }, dpxtvotive: { f: "stone", fc: 0xD8D0C0, w: 0xD8C8A8, p: "stone", t: G },
dpxtincense: { f: "stone", fc: 0xC8C0B0, w: 0xB8A890, p: "stone", t: G }, dpxtpriests: { f: "wood", fc: 0xA87A50, w: 0xE8DCC8, p: "plaster", t: G }, dpxtnereids: { f: "marble", fc: 0xE8F0F4, w: 0x6AA8D8, p: "marble", t: G },
dpxtaltar: { f: "stone", fc: 0xD8D0C0, w: 0xC86A4A, p: "stone", t: G }, dpxtjudge: { f: "stone", fc: 0x3A3430, w: 0x2A3A7A, p: "stone", t: G }, dpxthundred: { f: "marble", fc: 0xF0F4F8, w: 0x4A8AC8, p: "marble", t: G, c: "coffer" },
dpxphall: { f: "checker", fc: 0xE8E0D0, w: 0xE8A070, p: "marble", t: O, c: "coffer" }, dpxpgal: { f: "marble", fc: 0xF0ECE4, w: 0xE8D8C0, p: "marble", t: O }, dpxpcor: { f: "stone", fc: 0xE0D8C8, w: 0xD8C8B0, p: "stone", t: O },
dpxpcouncil: { f: "marble", fc: 0x3A3430, w: 0xC8603A, p: "damask", t: G, c: "coffer" }, dpxpenvoy: { f: "carpet", fc: 0x8A2A2A, w: 0xE8C8A0, p: "damask", t: G }, dpxplib: { f: "wood", fc: 0xA87A50, w: 0xD8C8A0, p: "wood", t: G },
dpxptreas: { f: "checker", fc: 0xE8D8A8, w: 0xC8904A, p: "damask", t: G }, dpxpmap: { f: "wood", fc: 0xB08860, w: 0x3A6A8A, p: "damask", t: G }, dpxpgarden: { f: "stone", fc: 0xD8D0B8, w: 0x8AB89A, p: "stone", t: W },
dpxpsprings: { f: "marble", fc: 0xF0ECE4, w: 0x8AC8D8, p: "tile", t: W }, dpxpthrone: { f: "carpet", fc: 0x8A2A2A, w: 0xE8743A, p: "damask", t: G, c: "coffer" }, dpxpmorning: { f: "wood", fc: 0xC09A70, w: 0xF0D8B0, p: "plaster", t: G },
dpxpcloak: { f: "wood", fc: 0xB08A60, w: 0xE0D0B8, p: "plaster", t: G }, dpxpgames: { f: "checker", fc: 0xE8E0D0, w: 0xC8B888, p: "stripe", t: G }, dpxpbanquet: { f: "marble", fc: 0xE8DCD0, w: 0xB83A2A, p: "damask", t: G, c: "coffer" },
dpxpwine: { f: "stone", fc: 0xB8A890, w: 0x8A5A4A, p: "stone", t: G }, dpxpservants: { f: "wood", fc: 0xB08A60, w: 0xD8C8B0, p: "plaster", t: G }, dpxpkitchen: { f: "tile", fc: 0xD8C8B0, w: 0xC8A888, p: "tile", t: W },
dpxpstore: { f: "stone", fc: 0xC0B090, w: 0xB0A080, p: "stone", t: G }, dpxpweave: { f: "wood", fc: 0xC09A70, w: 0x9AB0D8, p: "plaster", t: G }, dpxpbed: { f: "carpet", fc: 0x2A4AA8, w: 0xE8D0B8, p: "damask", t: G },
dpxpbath: { f: "marble", fc: 0xF0ECE4, w: 0x8AC8D8, p: "tile", t: G }, dpxpnursery: { f: "carpet", fc: 0xF0D890, w: 0xB8D8F0, p: "stripe", t: W }, dpxpmusic: { f: "wood", fc: 0xC09A70, w: 0xC8A8E0, p: "stripe", t: G },
dpxpschool: { f: "wood", fc: 0xC09A70, w: 0xD8E0C0, p: "plaster", t: G }, dpxpguard: { f: "stone", fc: 0xC0B8A8, w: 0x8A7A6A, p: "stone", t: G }, dpxparmoury: { f: "stone", fc: 0xB8B0A0, w: 0x7A6A5A, p: "stone", t: G },
dpxpwatch: { f: "stone", fc: 0xD8D0C0, w: 0x6AA8C8, p: "stone", t: G },
dpxbhall: { f: "marble", fc: 0xF0ECE4, w: 0x6AB8D0, p: "marble", t: W }, dpxbpass: { f: "tile", fc: 0xE8E8E0, w: 0x9AC8D8, p: "tile", t: W }, dpxbhead: { f: "marble", fc: 0xF0ECE4, w: 0x4A9AB8, p: "tile", t: G },
dpxbhot: { f: "marble", fc: 0xF0E4DC, w: 0xD88A5A, p: "tile", t: W }, dpxbcold: { f: "marble", fc: 0xE8F0F4, w: 0x5AA8D8, p: "tile", t: W }, dpxboil: { f: "stone", fc: 0xD8D0B8, w: 0xC8B070, p: "stone", t: W },
dpxbchange: { f: "wood", fc: 0xC09A70, w: 0xE0D8C8, p: "plaster", t: W }, dpxbsteam: { f: "tile", fc: 0xD8D0C8, w: 0xB89888, p: "tile", t: W },
dpxghall: { f: "stone", fc: 0xE0D4B8, w: 0xD8C8A0, p: "stone", t: W }, dpxgpass: { f: "stone", fc: 0xD8CCB0, w: 0xD0C0A0, p: "stone", t: W }, dpxgwrestle: { f: "stone", fc: 0xD8C8A0, w: 0xC8A878, p: "stone", t: W },
dpxgoil: { f: "stone", fc: 0xD8D0B8, w: 0xC8B070, p: "stone", t: W }, dpxgball: { f: "stone", fc: 0xE0D4B8, w: 0x9AB88A, p: "stone", t: W }, dpxgstore: { f: "wood", fc: 0xB08A60, w: 0xC8B890, p: "wood", t: W },
dpxgtrack: { f: "stone", fc: 0xD8C8A0, w: 0xE0D0B0, p: "stone", t: W }, dpxgexedra: { f: "marble", fc: 0xF0ECE4, w: 0xE8D8B8, p: "marble", t: G }, dpxgchariot: { f: "stone", fc: 0xC8B898, w: 0xB8603A, p: "stone", t: W },
dpxahall: { f: "stone", fc: 0xC8C0B0, w: 0x9A8A7A, p: "stone", t: 0xB8783A }, dpxaarm: { f: "stone", fc: 0xB8B0A0, w: 0x7A6A5A, p: "stone", t: 0xB8783A }, dpxabunk: { f: "wood", fc: 0xA88060, w: 0xC8B8A0, p: "wood", t: 0xB8783A },
dpxamess: { f: "wood", fc: 0xA88060, w: 0xD8C0A0, p: "wood", t: 0xB8783A }, dpxacapt: { f: "wood", fc: 0xA88060, w: 0xB89A7A, p: "damask", t: 0xB8783A }, dpxasignal: { f: "stone", fc: 0xC0B8A8, w: 0xD88A4A, p: "stone", t: 0xB8783A },
dpxdhall: { f: "wood", fc: 0x8A6A4A, w: 0x7A8A8A, p: "wood", t: 0xB8783A }, dpxdoffice: { f: "wood", fc: 0xA88060, w: 0xC8B890, p: "wood", t: 0xB8783A }, dpxdrope: { f: "wood", fc: 0xA88060, w: 0xB8A888, p: "wood", t: 0xB8783A },
dpxdsail: { f: "wood", fc: 0xB89870, w: 0xE8DCC0, p: "wood", t: 0xB8783A }, dpxdoars: { f: "wood", fc: 0x9A7A50, w: 0xB09878, p: "wood", t: 0xB8783A }, dpxdtimber: { f: "wood", fc: 0x8A6A4A, w: 0xA88A6A, p: "wood", t: 0xB8783A },
dpxdforge: { f: "stone", fc: 0x5A5450, w: 0x6A5A50, p: "stone", t: 0xB8783A }, dpxdmaster: { f: "wood", fc: 0xA88060, w: 0x5A8AAA, p: "damask", t: 0xB8783A },
dpxsporch: { f: "marble", fc: 0xF0ECE4, w: 0xE8DCC8, p: "marble", t: G }, dpxscella: { f: "marble", fc: 0xF0ECE4, w: R, p: "marble", t: G, c: "coffer" }, dpxsroom: { f: "stone", fc: 0xD8D0C0, w: 0xD8C8A8, p: "stone", t: G },
dpxsgarden: { f: "stone", fc: 0xD8D0B8, w: 0x8AB89A, p: "stone", t: W },
dpxhoporch: { f: "stone", fc: 0xE0D8C8, w: 0xF0E8DC, p: "stone", t: R }, dpxhocourt: { f: "stone", fc: 0xD8D0B8, w: 0xE8DCC8, p: "stone", t: R }, dpxhoandron: { f: "checker", fc: 0xE8E0D0, w: 0xB83A2A, p: "damask", t: G },
dpxhokitchen: { f: "tile", fc: 0xD8C8B0, w: 0xD8C0A0, p: "tile", t: R }, dpxhobed: { f: "wood", fc: 0xB08A60, w: 0xE8D8C0, p: "plaster", t: R }, dpxhokids: { f: "wood", fc: 0xC09A70, w: 0xA8D0E8, p: "stripe", t: R },
dpxholoom: { f: "wood", fc: 0xC09A70, w: 0xE0C8A0, p: "plaster", t: R }, dpxhobath: { f: "marble", fc: 0xF0ECE4, w: 0x8AC8D8, p: "tile", t: R }, dpxhoshrine: { f: "marble", fc: 0xF0ECE4, w: 0xD8B8A0, p: "marble", t: G },
dpxhostore: { f: "stone", fc: 0xC0B090, w: 0xB0A080, p: "stone", t: R }
});
})();
(function () {
if (typeof EVB_THEMES === "undefined")
return;
var stoneRemap = { "D6D0C6|plaster": [0xE8E4DC, "plaster"], "D8D0C0|coffer": [0xF2EAD8, "coffer"], "B8AE9E|marble": [0xE8E4DC, "marble"], "D4CEC4|marble": [0xD8D8E0, "marble"] };
var pal = { fab: "navy", fab2: "ivory", wood: "walnut", metal: "brass", stone: "marble", art: 2, rug: 1, rugv: 1 };
dpxTheme("dpxatltemple", { grid: "temple", h: 6.5, seed: 51, panel: 0xD8DCE4, wall: 0xD8DCE4, trim: 0xE8C060, pal: pal,
remap: { "D6D0C6|plaster": [0xF2EAD8, "marble"], "D8D0C0|coffer": [0xF2EAD8, "coffer"], "B8AE9E|marble": [0xD8DCE4, "marble"], "D4CEC4|marble": [0xE8C060, "marble"] },
floors: ["The Temple of Poseidon"],
hello: "🔱 <b>Inside the Temple of Poseidon.</b> As Plato describes it: a roof of ivory worked with gold, silver and orichalcum; the god in his chariot behind six winged horses; a hundred Nereids on dolphins; the golden kings; the pillar of the laws. Look for the ✨ cards. Walk out through the silver doors to leave.",
plan: [{ hall: { k: "dpxtporch", n: "The Silver Porch" }, spine: { k: "dpxtway", n: "The Processional Way" }, gallery: { k: "dpxtkings", n: "The Corridor of the Kings" },
r1i: { k: "dpxtoffer", n: "The Treasury of Offerings" }, r1o: { k: "dpxtrobes", n: "The Room of the Azure Robes" },
r2i: { k: "dpxtlib", n: "The Priests' Library" }, r2o: { k: "dpxtgolden", n: "The Hall of the Golden Kings" },
r3i: { k: "dpxtpillar", n: "The Room of the Pillar", more: [{ s: "n" }] }, r3o: { k: "dpxtlamps", n: "The Lamp Room" },
c4: { k: "dpxtcleito", n: "The Shrine of Cleito" }, r4: { merge: ["r4i", "r4o"], k: "dpxtsanct", n: "The Sanctuary of Poseidon" },
l1i: { split: "across", at: 0.6, parts: [{ k: "dpxtvotive", n: "The Room of Votive Gifts" }, { k: "dpxtincense", n: "The Incense Store" }] }, l1o: { k: "dpxtpriests", n: "The Priests' Hall" },
l2i: { k: "dpxtnereids", n: "The Hall of the Nereids" }, l2o: { k: "dpxtaltar", n: "The Altar Court" },
l3i: { k: "dpxtjudge", n: "The Hall of Judgement", more: [{ s: "w" }] }, l3o: { k: "dpxtpriests", n: "The Calendar Room", more: [{ s: "s" }] },
l4: { merge: ["l4i", "l4o"], k: "dpxthundred", n: "The Hall of the Hundred Nereids" } }] });
dpxTheme("dpxatlpalace", { grid: "palace", h: 4.6, seed: 53, panel: 0xE8D8C0, wall: 0xE8D8C0, trim: 0xE8743A, pal: pal, remap: stoneRemap,
floors: ["The state floor", "The royal chambers"],
hello: "🏛️ <b>Inside the palace of the ten kings.</b> Built, Plato says, by each king trying to outdo the last, \"until they made the building a marvel to behold for size and beauty\". The Throne of Atlas, the Council of the Ten, the Court of the Springs, the royal chambers above. Look for the ✨ cards.",
plan: [
{ hall: { k: "dpxphall", n: "The Orichalcum Hall" }, spine: { k: "dpxpgal", n: "The Gallery of the Ten Kingdoms" }, gallery: { k: "dpxpcor", n: "The Bronze Corridor" },
r1i: { k: "dpxpcouncil", n: "The Council of the Ten Kings" }, r1o: { k: "dpxpenvoy", n: "The Envoys' Room" },
r2i: { k: "dpxplib", n: "The King's Library" }, r2o: { k: "dpxptreas", n: "The Treasurer's Room" },
r3i: { k: "dpxpmap", n: "The Map Room of Atlantis", more: [{ s: "n" }] }, r3o: { k: "dpxpgarden", n: "The Garden Court" },
c4: { k: "dpxpsprings", n: "The Court of the Springs" }, r4: { merge: ["r4i", "r4o"], k: "dpxpthrone", n: "The Throne Hall of Atlas" },
l1i: { split: "across", at: 0.62, parts: [{ k: "dpxpmorning", n: "The Morning Room" }, { k: "dpxpcloak", n: "The Cloak Room" }] }, l1o: { k: "dpxpgames", n: "The Games Room" },
l2i: { k: "dpxpbanquet", n: "The Banquet Hall" }, l2o: { k: "dpxpwine", n: "The Wine Store" },
l3i: { k: "dpxpservants", n: "The Servants' Hall", more: [{ s: "w" }] }, l3o: { k: "dpxpkitchen", n: "The Palace Kitchen", more: [{ s: "s" }] },
l4i: { split: "across", parts: [{ k: "dpxpkitchen", n: "The Bakery" }, { k: "dpxpstore", n: "The Oil Store" }] },
l4o: { split: "across", parts: [{ k: "dpxpweave", n: "The Weavers' Room" }, { k: "dpxpwine", n: "The Wine Cellar" }] } },
{ hall: { k: "dpxphall", n: "The Upper Hall" }, spine: { k: "dpxpgal", n: "The Gallery of Ships" }, gallery: { k: "dpxpcor", n: "The Upper Corridor" },
r1i: { k: "dpxpbed", n: "The King's Bedchamber" }, r1o: { split: "across", parts: [{ k: "dpxpcloak", n: "The King's Robing Room" }, { k: "dpxpcloak", n: "The Queen's Robing Room" }] },
r2i: { k: "dpxpbath", n: "The King's Bath", doors: [{ s: "s", at: 11 }] }, r2o: { k: "dpxpmorning", n: "The Queen's Sitting Room", doors: [{ s: "s", at: 19.5 }] },
r3i: { split: "along", at: 0.66, parts: [{ k: "dpxpbed", n: "The Prince's Room" }, { k: "dpxpbath", n: "The Prince's Bath" }] },
r3o: { split: "along", at: 0.62, parts: [{ k: "dpxpbed", n: "The Princess's Room" }, { k: "dpxpbath", n: "The Princess's Bath" }] },
c4: { k: "dpxpnursery", n: "The Royal Nursery" },
r4i: { split: "along", at: 0.66, parts: [{ k: "dpxpbed", n: "The Guest Room" }, { k: "dpxpbath", n: "The Guest Bath" }] }, r4o: { k: "dpxpmusic", n: "The Music Room" },
l1i: { k: "dpxpschool", n: "The Schoolroom" }, l1o: { k: "dpxpbed", n: "The Nurse's Room" },
l2i: { k: "dpxpweave", n: "The Weaving Room" }, l2o: { k: "dpxpstore", n: "The Linen Room" },
l3i: { k: "dpxpguard", n: "The Guard Room" }, l3o: { k: "dpxparmoury", n: "The Armoury" },
l4i: { k: "dpxpwatch", n: "The Watch Room" }, l4o: { k: "dpxpstore", n: "The Store Room" } }
] });
function one(key, grid, h, wall, trim, floor, hello, list) { dpxTheme(key, { grid: grid, h: h, seed: key.length * 7, panel: wall, wall: wall, trim: trim, pal: pal, remap: stoneRemap, floors: [floor], hello: hello, plan: [dpxPlan8(list)] }); }
one("dpxatlbaths", "mid", 4.6, 0xD8E8F0, 0xF0ECE4, "The baths of the springs", "♨️ <b>Inside the baths.</b> Plato: Poseidon brought up two springs, one warm and one cold, and the kings built baths round them, some open to the sky and some roofed for winter, \"for the kings, for private persons, and for women\". Look for the ✨ cards.", ["dpxbhall", "The Entrance of the Springs", "dpxbpass", "The Warm Passage", "dpxbpass", "The Cool Passage", "dpxbhead", "The Spring Heads",
"dpxbhot", "The Kings' Hot Bath", "dpxbcold", "The Kings' Cold Bath", "dpxboil", "The Oiling Room", "dpxbhot", "The Women's Baths",
"dpxbhot", "The Citizens' Hot Bath", "dpxbcold", "The Citizens' Cold Bath", "dpxbchange", "The Changing Room", "dpxbsteam", "The Steam Room"]);
one("dpxatlgym", "mid", 5.2, 0xE8D8B8, 0xF0ECE4, "The gymnasium", "🏃 <b>Inside the gymnasium.</b> Plato says the rings had gymnasia for men and for horses, and a racecourse a stadium wide that ran right round the larger ring. Look for the ✨ cards.", ["dpxghall", "The Palaestra", "dpxgpass", "The Covered Track", "dpxgpass", "The Colonnade", "dpxgwrestle", "The Wrestling Floor",
"dpxgoil", "The Oil and Dust Room", "dpxgball", "The Ball Court", "dpxgstore", "The Discus and Javelin Store", "dpxgtrack", "The Running Track",
"dpxgexedra", "The Teachers' Exedra", "dpxbhot", "The Bath", "dpxgchariot", "The Charioteers' Room", "dpxbchange", "The Changing Room"]);
one("dpxatlguard", "small", 4.2, 0xD8C8B0, 0xB8783A, "The guard house", "🛡️ <b>Inside a guard house of the rings.</b> Plato: the guards were spread over the rings; the most trusted lived close to the kings, on the island itself. Look for the ✨ cards.", ["dpxahall", "The Gate Hall", "dpxgpass", "The Passage", "dpxgpass", "The Back Passage", "dpxasignal", "The Signal Room",
"dpxaarm", "The Armoury of Bronze", "dpxabunk", "The Barrack Room", "dpxamess", "The Mess", "dpxacapt", "The Captain's Room",
"dpxaarm", "The Spear Store", "dpxabunk", "The Bunk Room", "dpxaarm", "The Shield Room", "dpxacapt", "The Watch Room"]);
one("dpxatldock", "mid", 6.2, 0xB8C0C0, 0xB8783A, "The ship sheds", "⚓ <b>Inside the ship sheds.</b> Plato: \"the docks were full of triremes and naval stores, and all things were quite ready for use.\" Look for the ✨ cards.", ["dpxdhall", "The Slipway Hall", "dpxgpass", "The Rope Passage", "dpxgpass", "The Store Passage", "dpxdoffice", "The Shipwright's Office",
"dpxdrope", "The Rope Walk", "dpxdsail", "The Sail Loft", "dpxdoars", "The Oar Store", "dpxdtimber", "The Timber Store",
"dpxdforge", "The Ram Forge", "dpxamess", "The Rowers' Mess", "dpxdmaster", "The Harbour Master's Room", "dpxdtimber", "The Pitch and Pine Store"]);
one("dpxatlshrine", "small", 5.0, 0xE8DCC8, 0xE8C060, "The shrine", "🏛️ <b>Inside the shrine.</b> Plato says the rings held \"many temples built and dedicated to many gods\". Look for the ✨ cards.", ["dpxsporch", "The Porch", "dpxgpass", "The Passage", "dpxgpass", "The Inner Passage", "dpxscella", "The Cella",
"dpxtvotive", "The Offering Room", "dpxsroom", "The Priest's Room", "dpxtlamps", "The Lamp Store", "dpxtoffer", "The Treasury",
"dpxsgarden", "The Garden of the Shrine", "dpxtrobes", "The Robing Room", "dpxtlib", "The Scroll Room", "dpxtincense", "The Store"]);
one("dpxatlhouse", "small", 4.0, 0xF0E8DC, 0xB83A2A, "The house", "🏠 <b>Inside an Atlantean house.</b> Plato says the walls were built of stone quarried from the island, white, black and red, \"some plain, some patterned\". Look for the ✨ cards.", ["dpxhoporch", "The Porch", "dpxgpass", "The Passage", "dpxgpass", "The Inner Passage", "dpxhocourt", "The Courtyard",
"dpxhoandron", "The Dining Room", "dpxhokitchen", "The Kitchen", "dpxhobed", "The Bedroom", "dpxhokids", "The Children's Room",
"dpxholoom", "The Loom Room", "dpxhobath", "The Bath", "dpxhoshrine", "The Household Shrine", "dpxhostore", "The Store Room"]);
})();
"use strict";
function dpxP(a) { return a.map(function (t) { return "<p style='margin:5px 0'>" + t + "</p>"; }).join(""); }
function dpxLearn(key, title, paras, btns) { if (key)
dpxMark(key); dpxCard(title, dpxP(paras), (btns || []).concat([["Close", dpxClose]])); }
function dpxCount(pre, n) { var f = dpxGot(), c = 0; for (var i = 1; i <= n; i++)
if (f[pre + i])
c++; return c; }
function dpxStamp(pre, n, what) { var c = dpxCount(pre, n); return "<div style='opacity:.75;font-size:12px;margin-top:6px'>" + (c >= n ? "🌟 You have found all " + n + " " + what + "!" : "You have found " + c + " of " + n + " " + what + ".") + "</div>"; }
function dpxGame(title, intro, rounds, win) {
dpxCard(title, dpxP([intro]), [["Start", function () { dpxQuiz(title, rounds, function (s, n) { if (s === n && win)
dpxMark(win); }); }], ["Not now", dpxClose]]);
}
var DPX_RIDES = [["The way in", 6, -24], ["The Sea King's Palace", -34, -196], ["The West Shell Town", -215, -226], ["The East Shell Town", 215, -246], ["The edge of the Sea Witch's wood", -270, -380],
["Atlantis: the harbour canal", DPX_ATL.x - 22, DPX_ATL.z + DPX_ATL.canal[1] - 10], ["Atlantis: the citadel", DPX_ATL.x + 12, DPX_ATL.z + 66]];
function dpxRide(i) { return __ZC(368, 45, this, arguments, new.target); }
function dpxActRide() {
dpxCard("Ride a dolphin", "<p>Hold on to the fin. Where to?</p>", DPX_RIDES.map(function (q, i) { return [q[0], function () { dpxRide(i); }]; }).concat([["Stay here", dpxClose]]));
}
var DPX_TALE = [
["The Sea King's palace", "Far out at sea the water is as blue as cornflowers and as clear as glass, and so deep that no anchor reaches the bottom. There the Sea King lived, in a palace with walls of coral, tall pointed windows of the clearest amber, and a roof of shells that open and close with the water. In every shell lies a pearl.", "The King's wife had died long ago, so his old mother kept house for him. She was proud of her noble birth, and wore twelve oysters on her tail, when others of rank might wear only six."],
["Six princesses and their gardens", "The King had six daughters, all lovely, and the youngest loveliest of all, with skin as clear as a rose leaf and eyes as blue as the deepest sea. Like the others she had no feet: her body ended in a fish's tail.", "Each princess had her own little garden plot to plant as she liked. One made hers in the shape of a whale, one like a little mermaid; but the youngest made hers round like the sun, with flowers that glowed as red as the sun itself."],
["The marble boy", "The youngest was a strange, quiet child. Her only treasure, apart from her red flowers, was a marble statue of a handsome boy, which had sunk to the sea floor from a wreck.", "She planted a rose-red weeping willow beside it, which grew over the statue and dropped its branches to the blue sand, where its violet shadow moved as the branches did."],
["The sisters see the world above", "\"When you are fifteen,\" said the old grandmother, \"you may rise up out of the sea and sit on the rocks in the moonlight and watch the great ships sail by.\" Each year another sister went up and came back with a tale.", "The eldest told of moonlight on a sandbank and a town's lights and bells; the second of a sunset and a flight of wild swans; the third swam up a river and saw children playing, and a little dog; the fourth stayed out at sea, among dolphins and spouting whales; the fifth saw icebergs in winter and a storm."],
["Her fifteenth birthday", "At last the youngest turned fifteen. Her grandmother set a wreath of white lilies in her hair, each petal half a pearl, and up she rose, light as a bubble.", "The sun had just set. A great ship lay on the calm sea with music playing and lanterns hung in the rigging. It was the birthday of a young prince, and the little mermaid could not take her eyes off him."],
["The storm", "Then the sea grew rough. Thunder rolled, lightning flashed, and the ship heeled over, broke, and sank. The prince sank with it, and she remembered that people cannot live under the water.", "She dived among the planks, found him, and held his head above the waves all night. In the morning she laid him on the sand near a white building where young girls lived and studied. One of them found him; he woke and smiled at her, never knowing who had really saved him."],
["Three hundred years", "\"Do people live for ever, if they do not drown?\" she asked her grandmother. \"No, they die too,\" said the old lady, \"and their life is shorter than ours. We live three hundred years, and then we become foam on the water.", "But people have a soul, which lives for ever, even after the body is dust, and rises up to the shining stars.\" From then on the little mermaid longed for two things: the prince, and a soul that would live for ever."],
["The Sea Witch's bargain", "She went past the roaring whirlpools and through the wood of grasping polyps to the house of the Sea Witch, which was built of the white bones of the shipwrecked.", "\"I know what you want,\" said the witch. \"A drink to turn your tail into legs. Every step will feel like treading on sharp knives. You can never be a mermaid again. If the prince marries another, your heart will break, and at sunrise you will be foam on the water. And for payment: your voice, the loveliest in the sea.\" The little mermaid said yes."],
["On land", "She drank the potion on the palace steps by moonlight, and woke with legs, and the prince standing before her. She could not speak, but she danced as no one had ever danced, though every step hurt.", "The prince kept her near him and called her his little foundling. He loved her as one loves a dear child, but it never came into his head to marry her. He said he could only ever love the girl from the white building, who he thought had saved him."],
["A daughter of the air", "The prince married that girl, a king's daughter after all. Before sunrise the little mermaid's sisters rose from the sea: they had given the witch their long hair for a way to save her, if she would harm the prince. She would not. She threw it far into the waves.", "At dawn she did not turn to foam. She rose among the daughters of the air, who, Andersen says, can earn a soul of their own by three hundred years of good deeds. Andersen wrote it in 1837 in Copenhagen, where a statue of her has sat by the harbour since 1913."]
];
var DPX_TALE_AT = [[-24, -198], [0, -148], [40, -196], [-200, -212], [70, -96], [124, 38], [200, -232], [-300, -420], [-62, -58], [0, -332]];
function dpxTaleCard(i) { return __ZC(368, 46, this, arguments, new.target); }
function dpxActStory() { var f = dpxGot(); for (var i = 0; i < 10; i++)
if (!f["tale" + (i + 1)])
return dpxTaleCard(i); dpxTaleCard(0); }
function dpxActGuide(kind) { return __ZC(368, 47, this, arguments, new.target); }
function dpxActShellBook() { dpxActStory(); }
function dpxActWindow() { return __ZC(368, 48, this, arguments, new.target); }
function dpxActSurface() { return __ZC(368, 49, this, arguments, new.target); }
function dpxActKing() { return __ZC(368, 50, this, arguments, new.target); }
var DPX_NOTES = ["🔵", "🟢", "🟣", "🟡"];
function dpxActSing() { return __ZC(368, 51, this, arguments, new.target); }
function dpxActCharts() { return __ZC(368, 52, this, arguments, new.target); }
function dpxActTreasure() { return __ZC(368, 53, this, arguments, new.target); }
function dpxActAnemone() { dpxLearn("anemone", "Sea anemones", ["Anemones look like flowers but are animals, cousins of the jellyfish. Their tentacles sting tiny prey.", "Clownfish live safely among them: a coat of slime keeps them from being stung."]); }
function dpxActBubbles() { dpxSay("🫧 You blow a ring of bubbles. It wobbles up and up toward the light."); }
function dpxActTrident() { dpxLearn("trident", "The trident", ["The three-pronged spear is the sign of the sea gods: Poseidon to the Greeks, Neptune to the Romans. Fishermen used tridents to spear fish.", "Andersen's Sea King is never described with one, but every sea king seems to want one."]); }
function dpxActComb() { dpxSay("🐚 You comb your hair with a golden comb, as the mermaids did on the rocks in the moonlight."); }
function dpxActShellGame() { return __ZC(368, 54, this, arguments, new.target); }
function dpxActFeast() { return __ZC(368, 55, this, arguments, new.target); }
function dpxActCook() { return __ZC(368, 56, this, arguments, new.target); }
function dpxActBall() { return __ZC(368, 57, this, arguments, new.target); }
function dpxActCrown() { dpxSay("👑 You try on a crown of pearls. It is far too heavy, and slips over your eyes."); }
function dpxActGran() { return __ZC(368, 58, this, arguments, new.target); }
function dpxActOysters() { return __ZC(368, 59, this, arguments, new.target); }
function dpxActKeepsake() { dpxTaleCard(2); }
function dpxActYoungest() { dpxTaleCard(4); }
function dpxActBath() { dpxSay("🛁 You lie back in the giant clam bath. It closes very slightly, then thinks better of it."); }
function dpxActMerQuiz() { return __ZC(368, 60, this, arguments, new.target); }
function dpxActDress() { dpxSay("🌸 You try on a wreath of white lilies, each petal half a pearl, like the youngest princess on her fifteenth birthday."); }
function dpxActSeahorse() { dpxLearn("seahorse", "Seahorses", ["Seahorses are fish that swim upright, steering with a tiny fin on their back. They hold on to seagrass with their curling tails.", "Among seahorses, the father carries the eggs in a pouch until the babies hatch: sometimes a thousand of them at once."]); }
function dpxActWatch() { return __ZC(368, 61, this, arguments, new.target); }
function dpxActNet() { return __ZC(368, 62, this, arguments, new.target); }
function dpxActHome() { return __ZC(368, 63, this, arguments, new.target); }
function dpxActGarden() { dpxTaleCard(1); }
function dpxActLullaby() { dpxSay("🎵 \"Sleep, little fry, the tide's going out…\" A merfolk lullaby fills the room."); }
function dpxActCraft() { return __ZC(368, 64, this, arguments, new.target); }
function dpxActWitch() { dpxTaleCard(7); }
function dpxActCauldron() { return __ZC(368, 65, this, arguments, new.target); }
function dpxActBargain() { return __ZC(368, 66, this, arguments, new.target); }
function dpxActSnakes() { dpxLearn("snakes", "Her \"chickens\"", ["The witch let a toad eat from her mouth, and called the fat sea snakes her little chickens.", "Real sea snakes live in warm seas of the Indian and Pacific Oceans. They breathe air, so they must come up for it, but they can stay down for hours."]); }
function dpxActJars() { dpxLearn("jars", "The jars of the witch", ["Rows of jars hold sea creatures that glow by their own light. Making light is called bioluminescence.", "Most animals of the deep sea can make light: to find a mate, to lure prey, or to hide their outline against the dim light from above."]); }
function dpxActWitchMirror() { dpxSay("🪞 The witch's mirror shows you as a merperson, with a tail of every colour of the sea."); }
var DPX_HIST = [
["How the story reached us", "Plato wrote of Atlantis in two dialogues, the Timaeus and the Critias, about 360 BC. In them, Critias says the tale came from Solon, the lawgiver of Athens.", "Solon, visiting Sais in Egypt around 590 BC, was told by an old priest: \"You Greeks are always children.\" The priest said Egypt's temples kept records of a war fought 9,000 years before, between ancient Athens and a great island empire, Atlantis."],
["Poseidon and Cleito", "When the gods divided the earth, the island of Atlantis fell to Poseidon. On a hill near the middle lived Evenor and Leucippe, and their daughter Cleito.", "Poseidon loved Cleito, and to guard her he made rings round her hill: \"two of land and three of water\", turned as if on a lathe, so that no ship or person could reach it. He made two springs rise from the earth, one warm and one cold."],
["The ten kings", "Poseidon and Cleito had five pairs of twin sons, and he divided the island into ten kingdoms among them. The eldest, Atlas, was made king over the others; the island and the sea, the Atlantic, were named after him.", "His twin was Gadeirus (Eumelus in Greek), whose land lay toward Gades, today's Cadiz in Spain. Then came Ampheres and Evaemon, Mneseus and Autochthon, Elasippus and Mestor, Azaes and Diaprepes."],
["The rings and the canal", "The kings bridged the rings and dug a canal 300 feet wide, 100 feet deep and 50 stadia long from the sea into the outermost ring, so that it became a harbour that the largest ships could enter.", "They cut tunnels through the rings of land, roofed over, so that a single trireme could pass from one ring of water to the next."],
["White, black and red stone; brass, tin and orichalcum", "The stone was quarried from under the island itself: white, black and red. Some buildings were of one colour; others mixed them, \"for the sake of ornament\".", "The wall round the outermost ring was coated with brass; the next with tin; and the wall round the citadel with orichalcum, \"which flashed with the red light of fire\"."],
["The Temple of Poseidon", "In the middle stood the temple: a stadium long and half a stadium wide. Outside it was covered with silver, its pinnacles with gold. Inside, the roof was ivory worked with gold, silver and orichalcum.", "The god stood in a chariot drawn by six winged horses, so tall his head touched the roof, with a hundred Nereids on dolphins round him. Outside stood golden statues of the kings and their wives."],
["The springs, the baths and the grove", "From the two springs the kings made baths: some open to the sky, some roofed for winter, for the kings, for ordinary people, for women, and for horses and cattle.", "The water ran on to the grove of Poseidon, full of tall and beautiful trees, and over the bridges by aqueducts to the outer rings, where there were temples, gardens, gymnasia, and a racecourse a stadium wide."],
["The harbour and the plain", "The docks were full of triremes, with all their tackle. The harbour and the canal \"were full of vessels and merchants coming from all parts\", day and night.", "Beyond the city lay a great plain, 3,000 by 2,000 stadia, ringed by a ditch, with mountains to the north. Plato even counts its army: ten thousand chariots and twelve hundred ships."],
["The fall", "For many generations the kings obeyed the laws and stayed wise. But, Plato says, as the god's part in them faded, they grew greedy and proud, and set out to conquer Europe and Asia.", "Athens alone stood against them and won. \"Afterwards there were violent earthquakes and floods; and in a single day and night of misfortune\" the island \"disappeared in the depths of the sea.\" The Critias stops in the middle of a sentence, and was never finished."],
["What is true?", "No trace of Atlantis has ever been found, and most historians think Plato invented it, as a parable about pride, power and good laws.", "Real events may have helped: the eruption of Thera (Santorini) about 1600 BC, which struck Minoan Crete; and the Greek city of Helike, which sank in an earthquake in 373 BC, in Plato's own life, and was found again in 2001. Ignatius Donnelly's book of 1882 made Atlantis famous all over again."]
];
var DPX_HIST_AT = [[DPX_ATL.x + 16, DPX_ATL.z + DPX_ATL.canal[1] - 14], [DPX_ATL.x - 12, DPX_ATL.z + 30], [DPX_ATL.x + 14, DPX_ATL.z + 52], [DPX_ATL.x + 14, DPX_ATL.z + 222], [DPX_ATL.x + 10, DPX_ATL.z + 112],
[DPX_ATL.x - 14, DPX_ATL.z + 20], [DPX_ATL.x - 34, DPX_ATL.z + 56], [DPX_ATL.x - 16, DPX_ATL.z + 300], [DPX_ATL.x - 104, DPX_ATL.z - 16], [DPX_ATL.x + 104, DPX_ATL.z - 16]];
function dpxHistCard(i) { return __ZC(368, 67, this, arguments, new.target); }
function dpxActHistory() { var f = dpxGot(); for (var i = 0; i < 10; i++)
if (!f["hist" + (i + 1)])
return dpxHistCard(i); dpxHistCard(0); }
var DPX_KINGS = [["Atlas", "the eldest, king over all; the Atlantic is named for him"], ["Gadeirus (Eumelus)", "his twin; his land lay toward Gades, today's Cadiz"], ["Ampheres", ""], ["Evaemon", ""], ["Mneseus", ""], ["Autochthon", "his name means \"sprung from the land itself\""], ["Elasippus", "\"horse-driver\""], ["Mestor", ""], ["Azaes", ""], ["Diaprepes", "\"the distinguished\""]];
function dpxActKings() { return __ZC(368, 68, this, arguments, new.target); }
function dpxActOfferings() { dpxLearn("offer", "Offerings", ["Plato says the temple was full of golden statues given by the kings and by private people of the city and of the lands they ruled.", "Greek temples were the god's house, not a place where crowds came to worship inside: people gathered at the altar outside."]); }
function dpxActRobes() { return __ZC(368, 69, this, arguments, new.target); }
function dpxActSolon() { dpxTaleOfSolon(); }
function dpxTaleOfSolon() { dpxHistCard(0); }
function dpxActPillar() { return __ZC(368, 70, this, arguments, new.target); }
function dpxActLamp() { dpxSay("🪔 You trim the wick of the oil lamp. Greek lamps burned olive oil, and lit every house and temple."); }
function dpxActCleito() { dpxHistCard(1); }
function dpxActPoseidon() { return __ZC(368, 71, this, arguments, new.target); }
function dpxActRoof() { return __ZC(368, 72, this, arguments, new.target); }
function dpxActAltar() { return __ZC(368, 73, this, arguments, new.target); }
function dpxActCalendar() { dpxLearn("calendar", "Every fifth and sixth year", ["The kings met alternately every fifth and every sixth year. Plato says this gave equal honour to the odd and the even.", "The Greeks counted years by Olympiads, the four years between one Olympic Games and the next, starting in 776 BC."]); }
function dpxActNereids() { dpxLearn("nereids", "The Nereids", ["The Nereids were the fifty sea nymphs, daughters of the old sea god Nereus. Plato puts a hundred of them on dolphins round Poseidon.", "The most famous were Thetis, mother of Achilles, and Amphitrite, Poseidon's wife."]); }
function dpxActJudge() { return __ZC(368, 74, this, arguments, new.target); }
function dpxActTenKingdoms() { dpxHistCard(2); }
function dpxActOrichalcum() { return __ZC(368, 75, this, arguments, new.target); }
function dpxActRings() { dpxHistCard(3); }
function dpxActSprings() { return __ZC(368, 76, this, arguments, new.target); }
function dpxActGrove() { dpxHistCard(6); }
function dpxActAtlas() { dpxLearn("atlas", "Atlas", ["The eldest son, king over the other nine. Plato says the island and the ocean took their names from him: Atlantis, \"of Atlas\", and the Atlantic.", "Plato's Atlas is not the same as the Titan Atlas, who held up the sky, though both gave their names to the west."]); }
function dpxActKnuckles() { return __ZC(368, 77, this, arguments, new.target); }
function dpxActAtlFeast() { dpxLearn("atlfeast", "A feast in the palace", ["Greeks lay on couches to eat at a feast, leaning on the left elbow. Bread, olives, cheese, figs, fish and wine mixed with water were the usual fare.", "Plato says the land of Atlantis grew every fruit, and fed elephants too."]); }
function dpxActLoom() { return __ZC(368, 78, this, arguments, new.target); }
function dpxActBathAtl() { dpxHistCard(6); }
function dpxActLyre() { dpxSay("🎵 You pluck the seven strings of the lyre, Apollo's instrument, and the room rings softly."); }
function dpxActAtlQuiz() { return __ZC(368, 79, this, arguments, new.target); }
function dpxActAtlWatch() { dpxLearn("atlwatch", "The guards of Atlantis", ["Plato says the guards were placed by trust: the most trusted lived in the citadel near the kings; the next in the smaller ring; the rest in the guard houses of the larger ring."]); }
function dpxActArmour() { dpxLearn("armour", "Bronze armour", ["A Greek hoplite wore a bronze helmet, a breastplate, greaves on his shins, and carried a great round shield and a long spear.", "Plato says each of Atlantis's 60,000 districts had to send soldiers and equipment for the army."]); }
function dpxActColdAtl() { dpxSay("❄️ You step into the cold pool. Brrr! The Greeks liked to go from hot to cold, just as people do in spas today."); }
function dpxActStrigil() { dpxLearn("strigil", "The strigil", ["The Greeks had no soap. After exercise they rubbed themselves with olive oil and scraped it off, with the dirt and sweat, using a curved metal tool called a strigil."]); }
function dpxActSteam() { dpxSay("♨️ You sit in the warm steam of the hot spring. Very relaxing."); }
function dpxActGames() { dpxLearn("games", "Greek games", ["Greek athletes trained in the gymnasium. The word comes from gymnos, \"naked\", because they trained without clothes.", "The great games were held for the gods: the Olympics for Zeus, the Isthmian Games for Poseidon himself, near Corinth."]); }
function dpxActWrestle() { return __ZC(368, 80, this, arguments, new.target); }
function dpxActBallGame() { dpxSay("⚽ You play episkyros, the Greek ball game, two teams trying to throw the ball over each other's line."); }
function dpxActThrow() { return __ZC(368, 81, this, arguments, new.target); }
function dpxActSprint() { return __ZC(368, 82, this, arguments, new.target); }
function dpxActRace() { return __ZC(368, 83, this, arguments, new.target); }
function dpxActSignal() { dpxSay("🔥 You light the signal on the guard tower. Across the rings, the next tower answers."); }
function dpxActTrireme() { dpxLearn("trireme", "The trireme", ["A trireme was a warship with three banks of oars, one above another, about 170 rowers in all, and a bronze ram on its bow.", "Plato says Atlantis had 1,200 of them. In 1987 a full-size working copy, the Olympias, was built and rowed by volunteers in Greece."]); }
function dpxActRope() { dpxSay("🪢 You coil the rope neatly, the way the sailors do."); }
function dpxActRam() { dpxLearn("ram", "The bronze ram", ["The ram was the trireme's weapon: the rowers drove the ship hard into an enemy's side to hole it.", "One real ram, the Athlit ram, found off Israel in 1980, weighs about 465 kilograms."]); }
function dpxActHarbour() { dpxHistCard(7); }
var DPX_SHRINE_TXT = { "The Shrine of Cleito": "Cleito, mother of the ten kings. Plato says her old precinct stayed holy, fenced in gold, in the heart of the citadel.", "The Shrine of Atlas": "Atlas, eldest of the kings, whose name lives on in the Atlantic.", "The Shrine of the Nereids": "The sea nymphs who rode dolphins round Poseidon.", "The Shrine of the Springs": "The warm and cold springs that Poseidon made for Cleito." };
function dpxActShrine() { var D = DPX.here || {}, t = DPX_SHRINE_TXT[D.shrine]; dpxLearn("shrine", D.shrine || "A shrine", [t || "Plato says there were many temples on the rings, to many gods.", "The rings also held gardens and gymnasia, and the island's water flowed out to them over the bridges."]); }
function dpxActAtlHome() { return __ZC(368, 84, this, arguments, new.target); }
DPX_PARTS.push(function (P) {
DPX_TALE_AT.forEach(function (q, i) {
P.make(q[0], q[1], i * 0.7, 1.4, function (G) {
var m = dpxMat(0xF6E6D4, null, { e: 0xF0C8A0, ei: 0.35 });
dpxSph(G, 0.9, dpxMat(0xE8607A, "stone"), 0, 0.25, 0, 10, 0.45);
var s = new THREE.Mesh(dpxScallopGeo(0.8, 11), m);
s.position.y = 0.55;
s.rotation.x = -1.1;
G.add(s);
var p = dpxSph(G, 0.16, dpxMat(0xFFFFFF, null, { e: 0xBFEFFF, ei: 1 }), 0, 0.85, 0.1, 10);
if (!dpxLite()) {
var gl = wGlow(0xFFE0C0, 4, 0.35);
gl.position.y = 0.9;
G.add(gl);
}
}, { r: 0.9, h: 1 });
dpxDo(P, q[0], q[1], 2.6, "A story shell (" + (i + 1) + " of 10)", "listen: " + DPX_TALE[i][0], function () { dpxTaleCard(i); });
});
DPX_HIST_AT.forEach(function (q, i) {
P.make(q[0], q[1], i * 0.9, 1.4, function (G) { dpxBox(G, 1.6, 1, 0.9, dpxMat(0xF0ECE4, "marble"), 0, 0.5, 0); var t = dpxBox(G, 1.3, 1.7, 0.18, dpxMat(0xE8743A, "metal", { e: 0x8A3008, ei: 0.8 }), 0, 1.85, 0); t.rotation.x = -0.12; }, { r: 0.9, h: 2.6 });
dpxDo(P, q[0], q[1], 2.6, "An orichalcum tablet (" + (i + 1) + " of 10)", "read: " + DPX_HIST[i][0], function () { dpxHistCard(i); });
});
DPX_RIDES.forEach(function (q, i) {
P.being("dolphin", q[1] + 3, q[2] - 2, i, 1.1);
dpxDo(P, q[1] + 3, q[2] - 2, 3.4, "A dolphin", "ride to another part of the Deep", dpxActRide);
});
P.sign(-4, -34, 0, ["The Deep: two old stories", "Press E to read"], ["The Deep", "Two old stories under the sea", [
"Straight ahead: the Sea King's Palace of Hans Christian Andersen's The Little Mermaid (1837), with the princesses' gardens, two shell towns, and the Sea Witch's wood far to the west.",
"Far to the east: Atlantis, as Plato described it about 360 BC.",
"Find the 10 glowing story shells, and the 10 orichalcum tablets in Atlantis. Every building can be entered.",
"Dolphins wait by the posts to carry you from one place to another."
]]);
});
"use strict";
var DPX_SEAFURN = { chair: "dpx_shellstool", armchair: "dpx_shellchair", sofa: "dpx_shellsofa", table: "dpx_coraltable", longtable: "dpx_coraltablelong", feasttable: "dpx_coraltablelong",
counseltable: "dpx_coraltablelong", maptable: "dpx_coraltable", desk: "dpx_coraldesk", schooldesk: "dpx_coraldesk", bookshelf: "dpx_shellshelf", shelfgoods: "dpx_shellshelf",
bed: "dpx_clambed", fourposter: "dpx_clambed2", hospitalbed: "dpx_clambed", wgbunk: "dpx_clambed", chandelier: "dpx_jellylamp", ironchandelier: "dpx_jellylamp", lamp: "dpx_pearllamp",
lantern: "dpx_pearllamp", wallsconce: "dpx_pearllamp", candles: "dpx_glowglobe", brazier: "dpx_anemone", firebowl: "dpx_anemone", painting: "dpx_mosaic", wallmirror: "dpx_shellmirror",
rug: "dpx_spongerug", redrunner: "dpx_spongerug", pelt: "dpx_spongerug", plant: "dpx_coralpot", fireplace: "dpx_ventstove", stove: "dpx_ventstove", oven: "dpx_ventstove",
fridge: "dpx_coldclam", sink: "dpx_bubblebasin", grandthrone: "dpx_shellthrone", wardrobe: "dpx_shellwardrobe", clock: "dpx_tideglass", crib: "dpx_cradle", pew: "dpx_shellstool",
benchin: "dpx_shellsofa", armourstand: "dpx_anchor", weaponrack: "dpx_net", bathtub: "dpx_clambath", banner: "dpx_kelp", hallbanner: "dpx_kelp", piano: "dpx_shellharp",
barrel: "dpx_oysters", crates: "dpx_jars", footchest: "dpx_oysters", goldstatue: "dpx_statueboy", toys: "dpx_seahorse" };
function dpxInCoralmere() { return typeof GR !== "undefined" && GR.R && GR.R.id === "depths"; }
(function () {
if (typeof grFurn !== "function")
return;
var gf = grFurn;
grFurn = function (P, name, x, y, z, ry, s) {
if (dpxInCoralmere()) {
var sea = DPX_SEAFURN[name];
if (sea && typeof FURN !== "undefined" && FURN[sea]) {
if (sea === "dpx_jellylamp")
y = Math.max(0, (y || 0) - 0.6);
return gf.call(this, P, sea, x, (sea === "dpx_spongerug" || sea === "dpx_coralpot") ? 0 : y, z, ry, s);
}
}
return gf.apply(this, arguments);
};
if (typeof grBox === "function") {
var gb = grBox;
grBox = function (P, w, h, d, col, tx, x, y, z, ry, o) {
if (dpxInCoralmere() && (col === 0xEEE8DC || col === 0xE8E0D0) && tx === "plaster")
return gb.call(this, P, w, h, d, 0xE6EEF2, "marble", x, y, z, ry, o);
return gb.apply(this, arguments);
};
}
if (typeof grInsideBuild === "function") {
var gi = grInsideBuild;
grInsideBuild = function () { var R = typeof GR !== "undefined" && GR.R; if (R && R.id === "depths" && !R.inWall) {
R.inWall = 0xE8B8A8;
R.inWallTex = "stone";
} return gi.apply(this, arguments); };
}
if (typeof grFurnish === "function") {
var gfu = grFurnish;
grFurnish = function (P, I, R, r, x0, x1, z0, z1, RH) {
var out = gfu.apply(this, arguments);
if (R && R.id === "depths" && typeof FURN !== "undefined" && FURN.dpx_kelp) {
var d = r.door, back = d === "e" ? [[x0 + 0.7, z0 + 0.7], [x0 + 0.7, z1 - 0.7]] : d === "w" ? [[x1 - 0.7, z0 + 0.7], [x1 - 0.7, z1 - 0.7]] : [[x0 + 0.7, z0 + 0.7], [x1 - 0.7, z0 + 0.7]];
back.forEach(function (p) { gf(P, "dpx_kelp", p[0], 0, p[1], 0); });
if (!grLite() && FURN.dpx_anemone) {
var f = d === "e" ? [x1 - 0.9, z0 + 0.9] : d === "w" ? [x0 + 0.9, z1 - 0.9] : [x0 + 0.9, z1 - 0.9];
gf(P, "dpx_anemone", f[0], 0, f[1], 0);
}
}
return out;
};
}
})();
"use strict";
var DXU = { u: { t: { value: 0 }, k: { value: 0 } }, on: !window.DXU_OFF, snow: null, patched: [], sea: false };
function dxuOn() { return DXU.on && !window.DXU_OFF; }
function dxuInDeep() {
try {
if (typeof store === "undefined" || store.inside || (typeof INT !== "undefined" && INT))
return false;
if (typeof WLD !== "undefined" && WLD.on)
return false;
var r = store.here && typeof realmById === "function" ? realmById(store.here) : null;
return !!(r && r.kind === "depths");
}
catch (e) {
return false;
}
}
(function () {
if (!dxuOn() || typeof REALMS === "undefined" || !REALMS.depths)
return;
REALMS.depths.skyTop = 0x0B5878;
REALMS.depths.skyLow = 0x0A3E52;
REALMS.depths.ground = 0xB8A57E;
REALMS.depths.light = 0x9ADCEC;
REALMS.depths.amb = 0.86;
REALMS.depths.sun = 0.52;
REALMS.depths.dens = 1.25;
})();
(function () {
if (!dxuOn() || typeof SKY_FRAG !== "string" || typeof SKYWORK === "undefined" || SKY_FRAG.indexOf("mode==10") >= 0)
return;
SKY_FRAG = SKY_FRAG.replace("  if(mode==1){", "  if(mode==10){\n" +
"    float hy=max(d.y,0.0);\n" +
"    vec2 q=d.xz/(hy+0.10)*1.15;\n" +
"    float w1=vnoi(q*2.6+vec2(t*0.11,t*0.07)), w2=vnoi(q*4.3-vec2(t*0.08,-t*0.10)), w3=vnoi(q*9.0+vec2(t*0.05,0.0));\n" +
"    float net=1.0-smoothstep(0.0,0.10,abs(w1-w2)); net=net*net;\n" +
"    float win=smoothstep(0.62,0.80,hy);\n" +
"    float halo=smoothstep(0.25,0.75,hy);\n" +
"    col=mix(cA,cB,clamp(win*(0.55+0.45*w3)+net*win*0.7,0.0,1.0));\n" +
"    col=mix(col,cC,(1.0-halo)*0.6);\n" +
"    a=win*(0.45+0.55*net)+halo*0.22+net*halo*0.12;\n" +
"  } else if(mode==1){");
SKYWORK.depths = { mode: 10, a: 0x2E8EB0, b: 0xE8FCFF, c: 0x0E5A78, speed: 1.0, lift: 0.0, amt: 1.0 };
})();
(function () {
if (!dxuOn())
return;
if (typeof realSkyTick === "function") {
var rs = realSkyTick;
realSkyTick = function (dt) {
var r = rs.apply(this, arguments);
try {
if (dxuInDeep() && typeof REAL_SKYU !== "undefined")
REAL_SKYU.cover.value = 0;
}
catch (e) { }
return r;
};
}
})();
var DXU_CAUS_GLSL = [
"uniform float dxuT; uniform float dxuK; varying vec3 vDxuW;",
"float dxuCaus(vec2 p){",
"  vec2 q=p*1.35;",
"  float a=sin(q.x+sin(q.y*0.83+dxuT*0.55)*1.6+dxuT*0.35);",
"  float b=sin(q.y*1.07+sin(q.x*0.71-dxuT*0.47)*1.7-dxuT*0.30);",
"  float c=sin((q.x+q.y)*0.61+sin(q.x*0.37+dxuT*0.4)*2.1+dxuT*0.25);",
"  float r=abs(a+b+c)/3.0;",
"  return pow(1.0-clamp(r,0.0,1.0),10.0);",
"}"
].join("\n");
function dxuCausPatch(m, k) { return __ZC(368, 85, this, arguments, new.target); }
(function () {
if (!dxuOn() || typeof dpxMat !== "function")
return;
var dm = dpxMat;
dpxMat = function (col, tex, o) { var m = dm.apply(this, arguments); try {
if (m && !(o && o.basic) && !(o && o.op !== undefined))
dxuCausPatch(m, 1);
}
catch (e) { } return m; };
})();
(function () {
if (!dxuOn() || typeof PAINT === "undefined")
return;
PAINT.dxusand = function (x, S, R) {
x.fillStyle = "#C9B48A";
x.fillRect(0, 0, S, S);
for (var i = 0; i < 2600; i++) {
var v = 150 + ((R() * 70) | 0);
x.fillStyle = "rgba(" + (v + 30) + "," + (v + 12) + "," + (v - 28) + ",0.35)";
x.fillRect(R() * S, R() * S, 1.4, 1.4);
}
for (var y = 0; y < S; y += 9) {
x.strokeStyle = "rgba(120,96,60,0.28)";
x.lineWidth = 2.2;
x.beginPath();
for (var xx = 0; xx <= S; xx += 8) {
var yy = y + Math.sin(xx / S * Math.PI * 4 + y * 0.21) * 3.2 + Math.sin(xx / S * Math.PI * 10 + y) * 1.1;
if (xx)
x.lineTo(xx, yy);
else
x.moveTo(xx, yy);
}
x.stroke();
x.strokeStyle = "rgba(250,236,200,0.22)";
x.lineWidth = 1.2;
x.beginPath();
for (var x2 = 0; x2 <= S; x2 += 8) {
var y2 = y + 3 + Math.sin(x2 / S * Math.PI * 4 + y * 0.21) * 3.2 + Math.sin(x2 / S * Math.PI * 10 + y) * 1.1;
if (x2)
x.lineTo(x2, y2);
else
x.moveTo(x2, y2);
}
x.stroke();
}
for (var s = 0; s < 26; s++) {
var px = R() * S, py = R() * S;
x.fillStyle = ["#F4EAD8", "#E8D0B8", "#D8C8C0", "#8A7A6A"][s % 4];
x.beginPath();
x.ellipse(px, py, 1.6 + R() * 2.4, 1 + R() * 1.6, R() * 3, 0, 6.283);
x.fill();
}
};
PAINT.dxuslab = function (x, S, R) {
x.fillStyle = "#D8D2C2";
x.fillRect(0, 0, S, S);
var n = 4, w = S / n;
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var v = 200 + ((R() * 34) | 0);
x.fillStyle = "rgb(" + v + "," + (v - 4) + "," + (v - 16) + ")";
x.fillRect(i * w + 1, j * w + 1, w - 2, w - 2);
for (var k = 0; k < 3; k++) {
x.strokeStyle = "rgba(150,140,130,0.35)";
x.lineWidth = 0.8;
x.beginPath();
var sx = i * w + R() * w, sy = j * w + R() * w;
x.moveTo(sx, sy);
x.bezierCurveTo(sx + R() * 30 - 15, sy + R() * 30 - 15, sx + R() * 40 - 20, sy + R() * 40 - 20, sx + R() * 50 - 25, sy + R() * 50 - 25);
x.stroke();
}
}
x.strokeStyle = "rgba(150,126,86,0.9)";
x.lineWidth = 3;
for (var g = 0; g <= n; g++) {
x.beginPath();
x.moveTo(g * w, 0);
x.lineTo(g * w, S);
x.stroke();
x.beginPath();
x.moveTo(0, g * w);
x.lineTo(S, g * w);
x.stroke();
}
for (var d = 0; d < 7; d++) {
var cx = R() * S, cy = R() * S, rr = 20 + R() * 50, gr = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
gr.addColorStop(0, "rgba(190,164,118,0.75)");
gr.addColorStop(1, "rgba(190,164,118,0)");
x.fillStyle = gr;
x.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
}
for (var s = 0; s < 40; s++) {
x.fillStyle = R() < 0.5 ? "rgba(70,120,70,0.5)" : "rgba(160,90,120,0.4)";
x.fillRect(R() * S, R() * S, 2, 2);
}
};
PAINT.dxusilt = function (x, S, R) {
x.fillStyle = "#7C7258";
x.fillRect(0, 0, S, S);
for (var i = 0; i < 3200; i++) {
var v = 90 + ((R() * 60) | 0);
x.fillStyle = "rgba(" + v + "," + (v - 6) + "," + (v - 30) + ",0.4)";
x.fillRect(R() * S, R() * S, 1.5, 1.5);
}
for (var y = 0; y < S; y += 12) {
x.strokeStyle = "rgba(50,44,30,0.3)";
x.lineWidth = 2.5;
x.beginPath();
for (var xx = 0; xx <= S; xx += 8) {
var yy = y + Math.sin(xx / S * Math.PI * 6 + y) * 2.5;
if (xx)
x.lineTo(xx, yy);
else
x.moveTo(xx, yy);
}
x.stroke();
}
for (var w = 0; w < 60; w++) {
x.strokeStyle = "rgba(60,110,60,0.55)";
x.lineWidth = 1.2;
var px = R() * S, py = R() * S;
x.beginPath();
x.moveTo(px, py);
x.quadraticCurveTo(px + R() * 6 - 3, py - 6, px + R() * 8 - 4, py - 12);
x.stroke();
}
};
PAINT.dxuorich = function (x, S, R) {
var g = x.createLinearGradient(0, 0, S, S);
g.addColorStop(0, "#E8853E");
g.addColorStop(0.5, "#F2A050");
g.addColorStop(1, "#C8642A");
x.fillStyle = g;
x.fillRect(0, 0, S, S);
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(255," + (180 + ((R() * 60) | 0)) + ",120,0.25)";
x.fillRect(R() * S, R() * S, R() * 12, 1);
}
var n = 4, w = S / n;
x.strokeStyle = "rgba(110,40,10,0.7)";
x.lineWidth = 2;
for (var j = 0; j <= n; j++) {
x.beginPath();
x.moveTo(0, j * w);
x.lineTo(S, j * w);
x.stroke();
}
for (var r = 0; r < n; r++)
for (var c = 0; c <= n; c++) {
var ox = (c + (r % 2) * 0.5) * w;
x.beginPath();
x.moveTo(ox, r * w);
x.lineTo(ox, (r + 1) * w);
x.stroke();
for (var b = 0; b < 4; b++) {
x.fillStyle = "#7A3A14";
x.beginPath();
x.arc(ox + (b % 2 ? -5 : 5), r * w + 8 + ((b / 2) | 0) * (w - 16), 2, 0, 6.283);
x.fill();
}
}
for (var p = 0; p < 14; p++) {
var cx = R() * S, cy = R() * S, rr = 8 + R() * 30, gr = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
gr.addColorStop(0, "rgba(70,170,140,0.7)");
gr.addColorStop(1, "rgba(70,170,140,0)");
x.fillStyle = gr;
x.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
}
};
PAINT.dxuashlar = function (x, S, R) {
var cols = [[226, 220, 206], [64, 60, 58], [170, 72, 50]];
var rows = 6, h = S / rows;
for (var r = 0; r < rows; r++) {
var c = cols[r % 3], off = (r % 2) * 0.5;
for (var b = -1; b < 4; b++) {
var bx = (b + off) * S / 3, v = ((R() * 24) | 0) - 12;
x.fillStyle = "rgb(" + (c[0] + v) + "," + (c[1] + v) + "," + (c[2] + v) + ")";
x.fillRect(bx + 1, r * h + 1, S / 3 - 2, h - 2);
for (var k = 0; k < 40; k++) {
var u = ((R() * 40) | 0) - 20;
x.fillStyle = "rgba(" + (c[0] + u) + "," + (c[1] + u) + "," + (c[2] + u) + ",0.5)";
x.fillRect(bx + R() * S / 3, r * h + R() * h, 2, 2);
}
}
}
x.strokeStyle = "rgba(30,26,20,0.6)";
x.lineWidth = 2;
for (var q = 0; q <= rows; q++) {
x.beginPath();
x.moveTo(0, q * h);
x.lineTo(S, q * h);
x.stroke();
}
for (var s = 0; s < 90; s++) {
var px = R() * S, py = R() * S;
x.fillStyle = ["rgba(230,120,140,0.7)", "rgba(240,200,90,0.6)", "rgba(90,160,110,0.7)", "rgba(200,190,170,0.8)"][s % 4];
x.beginPath();
x.arc(px, py, 1 + R() * 3.2, 0, 6.283);
x.fill();
}
};
if (typeof TILE !== "undefined") {
TILE.dxusand = 6;
TILE.dxuslab = 7;
TILE.dxusilt = 5;
TILE.dxuorich = 4;
TILE.dxuashlar = 5;
}
})();
function dxuGround() { return __ZC(368, 86, this, arguments, new.target); }
function dxuSnow() { return __ZC(368, 87, this, arguments, new.target); }
function dxuLookTick(dt) {
if (!dxuOn())
return;
var deep = dxuInDeep();
DXU.u.t.value += dt;
DXU.u.k.value += ((deep || DXU.room ? 1 : 0) - DXU.u.k.value) * Math.min(1, dt * 2);
if (deep !== DXU.sea) {
DXU.sea = deep;
var s = dxuSnow();
if (deep) {
if (!s.parent)
scene.add(s);
}
else if (s.parent)
s.parent.remove(s);
}
if (deep) {
if (typeof REAL_SKYU !== "undefined")
REAL_SKYU.cover.value = 0;
if (!(DXU.gChk > 0)) {
DXU.gChk = 3;
try {
dxuGround();
}
catch (e) { }
}
else
DXU.gChk -= dt;
if (DXU.snow && DXU.snow.material.uniforms)
DXU.snow.material.uniforms.c.value.copy(camera.position);
}
}
(function () {
if (!dxuOn())
return;
if (typeof ldTick === "function") {
var lt = ldTick;
ldTick = function (dt) { var r = lt.apply(this, arguments); try {
dxuLookTick(dt || 0.016);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] look", e);
} return r; };
}
})();
"use strict";
var DXL = { geo: {}, wait: {}, mats: {}, spots: [], t: { value: 0 }, movers: [], built: 0 };
var DXL_DIR = "quaternius/animated-fish/";
var DXL_KIND = {
dolphin: { f: "dolphin.glb", len: 2.6, bend: "y", amp: 0.07, freq: 5.5, speed: 6, cols: { Top: 0x56677A, Bottom: 0xD8DEE2 }, rough: 0.35 },
whale: { f: "whale.glb", len: 15, bend: "y", amp: 0.05, freq: 4, speed: 1.5, cols: { Top: 0x3C4858, Bottom: 0xC8C4B8 }, rough: 0.6 },
shark: { f: "shark.glb", len: 2.9, bend: "x", amp: 0.08, freq: 6, speed: 3.5, cols: { Top: 0x6A7888, Bottom: 0xE4E8EC }, rough: 0.5 },
fish1: { f: "fish1.glb", len: 0.32, bend: "x", amp: 0.14, freq: 9, speed: 10, rough: 0.45 },
fish2: { f: "fish2.glb", len: 0.30, bend: "x", amp: 0.14, freq: 9, speed: 10, rough: 0.45 },
fish3: { f: "fish3.glb", len: 0.28, bend: "x", amp: 0.14, freq: 9, speed: 11, rough: 0.45 }
};
function dxlLite() { return typeof LITE !== "undefined" && !!LITE; }
function dxlGet(kind, cb) { return __ZC(368, 88, this, arguments, new.target); }
function dxlMat(kind, i, col, K) { return __ZC(368, 89, this, arguments, new.target); }
function dxlPath(o, P, a) {
var x = P.cx + Math.sin(a) * P.r, z = P.cz + Math.cos(a) * P.r * (P.e || 1);
if (P.eight) {
z = P.cz + Math.sin(a * 2) * P.r * 0.5;
}
var y = P.y + Math.sin(a * (P.bf || 3) + P.ph) * (P.bob || 0);
o.set(x, y, z);
return o;
}
var DXL_V1 = new THREE.Vector3(), DXL_V2 = new THREE.Vector3();
function dxlPlace(obj, P, a) { return __ZC(368, 90, this, arguments, new.target); }
function dxlSwimmer(G, kind, P, scale) {
var M = { P: P, a: P.a0 || 0, o: null };
dxlGet(kind, function (D) { if (!G.parent && !G.userData.dxlRoot)
return; var m = new THREE.Mesh(D.geo, D.mats); m.scale.setScalar(scale || DXL_KIND[kind].len); m.castShadow = !dxlLite(); M.o = m; G.add(m); dxlPlace(m, P, M.a); });
DXL.movers.push(M);
return M;
}
function dxlSchool(G, kind, n, P, scale) { return __ZC(368, 91, this, arguments, new.target); }
var DXL_M = new THREE.Matrix4(), DXL_Q = new THREE.Quaternion(), DXL_E = new THREE.Euler(0, 0, 0, "YXZ"), DXL_S = new THREE.Vector3(), DXL_P = new THREE.Vector3();
function dxlSchoolPlace(S, t) { return __ZC(368, 92, this, arguments, new.target); }
var DXL_RAY = null;
function dxlRayGeo() { return __ZC(368, 93, this, arguments, new.target); }
function dxlRayMat() { return __ZC(368, 94, this, arguments, new.target); }
function dxlRay(G, P, size) { return __ZC(368, 95, this, arguments, new.target); }
function dxlMerSwimmer(G, i, P) { return __ZC(368, 96, this, arguments, new.target); }
function dxlTick(dt) { return __ZC(368, 97, this, arguments, new.target); }
DPX_PARTS.push(function (P) {
if (window.DXU_OFF)
return;
DXL.spots = [];
P.items = P.items.filter(function (it) {
if (it.t === "b" && (it.a === "dolphin" || it.a === "whale" || it.a === "fish" || it.a === "shark")) {
DXL.spots.push({ a: it.a, x: it.x, z: it.z, w: it.wander ? it.wander.r || 12 : 0 });
return false;
}
return true;
});
});
function dxlHelmet() { return __ZC(368, 98, this, arguments, new.target); }
function dxlDivers() {
(LD.movers || []).concat((LD.talkers || []).map(function (t) { return t.p; })).forEach(function (M) { var g = M && M.g; if (!g || g.userData.dxlHelm || !/^ld_diver/.test(g.userData.wSeed || ""))
return; g.userData.dxlHelm = 1; g.add(dxlHelmet().clone()); });
}
function dxlBuild(G) { return __ZC(368, 99, this, arguments, new.target); }
(function () {
if (window.DXU_OFF || typeof ldBuild !== "function")
return;
var lb = ldBuild;
ldBuild = function (r) { var out = lb.apply(this, arguments); try {
if (r && r.kind === "depths" && LD.g) {
dxlBuild(LD.g);
if (typeof dxrBuild === "function")
dxrBuild(LD.g);
}
}
catch (e) {
if (window.console)
console.warn("[deep-realm] life", e);
} return out; };
})();
(function () {
if (typeof WDR_COST === "undefined")
return;
WDR_COST.dxu_diver = { body: 0xB8A880, arms: 0xB8A880, legs: 0xB0A078, feet: 0x2A2622, look: { hat: "none", hairStyle: "short", beard: "none", layer: null },
props: function (add) {
var cu = wdrMat(0xC87A3A, { r: 0.3, m: 0.85 }), br = wdrMat(0xD8B060, { r: 0.3, m: 0.85 }), gl = wdrMat(0x8ACCE0, { r: 0.1, m: 0.1 }), dk = wdrMat(0x2A2A2A, { r: 0.5 }), lead = wdrMat(0x6A6A70, { r: 0.6, m: 0.5 }), hose = wdrMat(0x3A3A30, { r: 0.8 });
gl.transparent = true;
gl.opacity = 0.45;
var H = new THREE.Group();
var dome = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 14), cu);
dome.scale.set(1, 1.08, 1);
H.add(dome);
[[0, 0, 1], [1, 0, 0.2], [-1, 0, 0.2]].forEach(function (d, k) {
var R = new THREE.Group();
var ring = new THREE.Mesh(new THREE.TorusGeometry(k ? 0.05 : 0.075, 0.014, 6, 16), br);
R.add(ring);
var pane = new THREE.Mesh(new THREE.CircleGeometry(k ? 0.05 : 0.075, 16), gl);
R.add(pane);
if (!k)
for (var b = -1; b <= 1; b++) {
var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.15, 4), br);
bar.position.x = b * 0.035;
R.add(bar);
}
var L = Math.hypot(d[0], d[2]);
R.position.set(d[0] / L * 0.19, 0, d[2] / L * 0.19);
R.lookAt(d[0] * 2, 0, d[2] * 2);
H.add(R);
});
var valve = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.06, 10), br);
valve.position.set(0, 0.2, -0.06);
valve.rotation.x = -0.4;
H.add(valve);
var collar = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.22, 0.06, 18), br);
collar.position.y = -0.2;
H.add(collar);
add("Head", [0, 0.08, 0.01], H);
var C = new THREE.Group();
var plate = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.32), cu);
plate.scale.set(1, 0.7, 0.85);
C.add(plate);
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2, bolt = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 4), br);
bolt.position.set(Math.sin(a) * 0.25, 0.1, Math.cos(a) * 0.21);
C.add(bolt);
}
var lw = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.04), lead);
lw.position.set(0, -0.12, 0.2);
C.add(lw);
add("spine_03", [0, 0.14, 0], C);
var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 14), dk);
belt.scale.z = 0.8;
add("spine_01", [0, -0.02, 0], belt);
var pts = [];
for (var k = 0; k <= 8; k++) {
var t = k / 8;
pts.push(new THREE.Vector3(Math.sin(t * 2.2) * 0.4, 0.05 + t * 2.6, -0.15 - t * 0.6));
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.025, 5, false), hose);
add("Head", [0, 0, 0], tube);
} };
})();
DPX_PARTS.push(function (P) {
if (window.DXU_OFF)
return;
var L = "the Deep", lite = P.lite, A = typeof DPX_ATL !== "undefined" ? DPX_ATL : { x: 640, z: -520 };
var tails = [0x2F8A7A, 0x3A6AC8, 0xC84A6A, 0x8A4AC8, 0xD8A030, 0x2A9AB8, 0x4AAA5A, 0xE07A5A, 0x1A7A9A, 0xB83A8A];
function mer(seed, x, z, rot, f, k, talk, wander) { return P.being(f ? "mermaid" : "merman", x, z, rot, 0.95 + (k % 3) * 0.06, talk || null, wander === undefined ? { r: 8, sp: 0.5 } : wander, { top: tails[k % tails.length] }); }
function diver(seed, x, z, rot, talk, wander) { return P.person(seed, x, z, rot, { sex: seed.length % 2 ? "f" : "m", look: { top: 0xB8A880, topKind: "shirt", bottom: 0xB0A078, bottomKind: "trousers", shoes: 0x2A2622, hat: "none" } }, talk || null, wander === undefined ? { r: 10, sp: 0.4 } : wander); }
if (typeof DPX_TOWN !== "undefined")
DPX_TOWN.forEach(function (T, ti) {
for (var m = 0; m < (lite ? 2 : 5); m++) {
var a = m * 1.3 + ti;
mer("mertown_" + ti + "_" + m, T.x + Math.sin(a) * 16, T.z + Math.cos(a) * 16, a, m % 2 === 0, m + ti * 3, m === 0 ? ldWho(ti ? "Coralie the net-weaver" : "Brine the shell-carver", L, ti ? "a merfolk net-weaver of the East Shell Town in the Deep, chatty and warm, who mends the town's kelp nets and knows every family" : "a merfolk carver of the West Shell Town in the Deep, who carves doors and lamps out of giant shells; proud of his craft and full of old sea sayings", ti ? "Hello, dry-foot! Mind the nets. Do you know, a good net is tied with one knot, over and over, ten thousand times?" : "Ah, a visitor. See this door? Carved from one shell of a giant clam. It took me a whole season of tides.") : null);
}
});
var K = typeof DPX_KING !== "undefined" ? DPX_KING : { x: 0, z: -262 };
mer("merguard_w", K.x - 14, K.z + 58, 0, false, 1, ldWho("A guard of the Sea King", L, "a merman guard at the steps of the Sea King's palace in the Deep (from Andersen's Little Mermaid): stern on duty but kind, proud of the palace's amber windows and shell roof", "Halt and be welcome. The Sea King is at home today. Go up the steps and in through the amber doors."), { r: 3, sp: 0.3 });
mer("merguard_e", K.x + 14, K.z + 58, 0, false, 5, null, { r: 3, sp: 0.3 });
if (!lite)
mer("merherald", K.x, K.z + 70, Math.PI, true, 3, ldWho("The palace herald", L, "a mermaid herald of the Sea King's court in the Deep, who announces visitors and loves gossip about the six princesses", "Oh, a land-walker! The youngest princess will want to hear all about you. She longs for the world above, you know."));
var at = [[0, 120], [30, 150], [-36, 140], [110, 30], [-110, 40], [140, -80], [-140, -60], [0, -140], [170, 60], [-170, 90]];
at.slice(0, lite ? 3 : at.length).forEach(function (q, k) {
mer("atlmer_" + k, A.x + q[0], A.z + q[1], k, k % 2 === 1, k + 2, k === 0 ? ldWho("Nerissa of the drowned city", L, "a mermaid who lives in the ruins of Atlantis in the Deep; her people moved into the sunken city long after it sank. She tends the old temple lamps, knows Plato's story (Critias, about 360 BC) and the bull games of ancient Crete, and is honest that Atlantis is a story", "Welcome to the drowned city. My people found it empty and made it home. Have you seen the bull ring? The old Atlanteans danced with bulls there, the way they did in Crete.") :
k === 3 ? ldWho("Captain Thalos of the Ring Watch", L, "a merman captain who keeps watch over the bridges of sunken Atlantis in the Deep; serious, loyal, loves the old walls of orichalcum, brass and tin", "The walls still shine, see? Orichalcum, brass and tin, just as Plato wrote. We keep watch so no one carries them off.") : null, { r: 14, sp: 0.45 });
});
diver("diver_wreck", 112, 26, 0.4, ldWho("A wreck diver", L, "a diver in an old brass helmet and canvas suit exploring the shipwreck in the Deep; explains the real standard diving dress (Augustus Siebe's helmet, about 1837), air pumped down a hose from the surface, lead weights to stay down", "*taps the helmet* Can you hear me through all this brass? Air comes down the hose from a pump on the boat. Lead on my chest keeps me on the bottom."));
if (!lite)
diver("diver_reef", -56, 40, 2, ldWho("A marine biologist", L, "a diver-scientist counting fish and coral on the reef in the Deep; loves explaining coral polyps, cleaner fish and why reefs matter", "Sixty-two kinds of fish on this reef so far! Coral looks like rock, but every bump is a colony of tiny animals."));
diver("diver_atl1", A.x + 18, A.z + (A.canal ? A.canal[1] : 360) - 14, -0.3, ldWho("Dr. Mara Okafor, archaeologist", L, "an underwater archaeologist in a brass helmet surveying sunken Atlantis in the Deep; honest that Plato probably invented Atlantis, and explains the real sunken places: Helike (sank 373 BC, found 2001), Pavlopetri, Baiae, and the Thera eruption", "*writes on a slate* Look at the joints in this paving. Whoever dreamt this city dreamt it well. Real cities do sink: Helike went under in one night in 373 BC."), { r: 6, sp: 0.3 });
if (!lite)
diver("diver_atl2", A.x - 60, A.z + 150, 1.2, null, { r: 12, sp: 0.35 });
if (!lite)
diver("diver_atl3", A.x + 180, A.z - 40, 2.4, null, { r: 12, sp: 0.35 });
if (!lite)
diver("diver_palace", 30, -150, 0.2, null, { r: 10, sp: 0.35 });
});
"use strict";
var DXR = { u: { t: null }, mats: {} };
function dxrMerge(list) { return __ZC(368, 100, this, arguments, new.target); }
function dxrBranch(list, x0, y0, z0, x1, y1, z1, r0, r1, seg) { return __ZC(368, 101, this, arguments, new.target); }
var DXR_GEO = {};
function dxrGeo(k) { return __ZC(368, 102, this, arguments, new.target); }
function dxrMat(k) { return __ZC(368, 103, this, arguments, new.target); }
function dxrClear(x, z) { return __ZC(368, 104, this, arguments, new.target); }
function dxrScatter(G, k, patches, s0, s1, cols, seed, yk, tilt) { return __ZC(368, 105, this, arguments, new.target); }
function dxrBuild(G) { return __ZC(368, 106, this, arguments, new.target); }
"use strict";
function dxaWreck(G) { return __ZC(368, 107, this, arguments, new.target); }
function dxaAmphora(G, x, y, z, ry, lying) { return __ZC(368, 108, this, arguments, new.target); }
function lite12() { return dpxLite() ? 8 : 12; }
var DXA_GROW_COLS = [0xE8A0B0, 0xF0C080, 0xC8A0E8, 0x90D8C8, 0xF08A6A, 0xE8E0C8, 0xD8583A];
function dxaGrowth(G, spots, n, seed) { return __ZC(368, 109, this, arguments, new.target); }
function dxaColossus(G) { return __ZC(368, 110, this, arguments, new.target); }
var DXA_FRESCO = null;
function dxaFresco() { return __ZC(368, 111, this, arguments, new.target); }
function dxaHorns(G, x, y, z, s, mat, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s);
G.add(g);
dpxBox(g, 1.6, 0.35, 0.5, mat, 0, 0.17, 0);
[-1, 1].forEach(function (k) { var h = dpxCyl(g, 0.12, 0.22, 1.0, mat, k * 0.55, 0.75, 0, 8); h.rotation.z = -k * 0.28; });
return g;
}
function dxaLabrys(G, x, z, mat) { return __ZC(368, 112, this, arguments, new.target); }
function dxaBull(G, x, z, ry, s, mat) { return __ZC(368, 113, this, arguments, new.target); }
function dxaBullCourt(P, cx, cz, R0, name, big) { return __ZC(368, 114, this, arguments, new.target); }
function dxaBullDance(where) { return __ZC(368, 115, this, arguments, new.target); }
function dxaFrescoCard() { return __ZC(368, 116, this, arguments, new.target); }
var DXA_RUINS = null;
function dxaRuinKinds() { return __ZC(368, 117, this, arguments, new.target); }
function dxaOuterCity(P, A) { return __ZC(368, 118, this, arguments, new.target); }
var DXA_SOLIDS = [];
function dxaStatue(G, x, z, ry, fallen, mat, seed) { return __ZC(368, 119, this, arguments, new.target); }
function dxaColumn(G, x, z, broken, mat) {
var h = broken ? 1.5 + Math.random() * 3 : 9;
dpxCyl(G, 0.75, 0.85, h, mat, x, h / 2, z, 14);
if (!broken) {
dpxBox(G, 2.0, 0.6, 2.0, mat, x, h + 0.3, z);
}
else
for (var d = 0; d < 3; d++) {
var dr = dpxCyl(G, 0.75, 0.75, 1.4, mat, x + 2 + d * 1.5, 0.75, z + (d % 2) * 1.2, 14);
dr.rotation.z = Math.PI / 2;
dr.rotation.y = d * 0.4;
}
}
function dxaLamp(G, x, z, col) { return __ZC(368, 120, this, arguments, new.target); }
DPX_PARTS.push(function (P) {
if (window.DXU_OFF)
return;
var A = DPX_ATL, lite = P.lite, L = "Atlantis";
DXA_SOLIDS = [];
P.items.forEach(function (it, ix) {
if (it.t !== "m" || !it.dpxDoor || !/^dpxatl/.test(it.dpxDoor.theme))
return;
var f = it.fn, S = it.solid || { hw: 6, hd: 6, h: 8 };
it.fn = function (G, H) {
var r = f.apply(this, arguments);
try {
var hw = S.hw || 6, hd = S.hd || 6, h = S.h || 8, sp = [[hw * 0.9, 0, hd + 0.8], [-hw * 0.9, 0, hd + 0.8], [hw + 0.8, 0, -hd * 0.5], [-hw - 0.8, 0, hd * 0.3], [hw * 0.4, h * 0.98, hd * 0.2], [-hw * 0.5, h * 0.98, -hd * 0.4]];
dxaGrowth(G, sp.slice(0, lite ? 3 : 6), lite ? 2 : 3, ix * 31 + 7);
}
catch (e) { }
return r;
};
});
P.make(A.x, A.z + A.canal[1] + 20, Math.PI, 8, function (G) { dxaColossus(G); }, { r: 8, h: 9 });
dpxDo(P, A.x + 12, A.z + A.canal[1] + 14, 6, "The Colossus of Poseidon", "read the plaque", function () {
dpxLearn("colossus", "The Colossus of Poseidon", ["Plato puts a gold statue of Poseidon inside his temple, so tall his head touched the roof. This bronze giant in the harbour mouth is the dream's own: the merfolk say the Atlanteans raised it to greet the ships, and the sea turned it green.",
"The real Colossus of Rhodes, a bronze Helios about 33 metres high, stood by Rhodes harbour for only 54 years before an earthquake threw it down in 226 BC. It did not straddle the harbour; that picture came much later."]);
});
P.make(A.x, A.z, 0, 1, function (G, H) {
var mar = dpxMat(0xECE6DA, "marble"), pv = dpxMat(0xE0DACA, window.DXU_OFF ? "paving" : "dxuslab");
dpxStrip(G, H, 0, A.w3[1] + 4, 0, A.canal[1] + 2, 7, pv, 0.16);
var k = 0;
for (var z = A.w3[1] + 16; z < A.canal[1] - 6; z += lite ? 36 : 18) {
[-1, 1].forEach(function (sd) { k++; if (k % 3 === 0)
dxaColumn(G, sd * 12.5, z + 6, k % 2 === 0, mar);
else
dxaStatue(G, sd * 13, z, sd > 0 ? -Math.PI / 2 : Math.PI / 2, k % 4 === 1, mar, k); });
}
for (var l = A.w3[1] + 8; l < A.canal[1]; l += lite ? 48 : 24) {
dxaLamp(G, -5.2, l, 0x8AF0E8);
dxaLamp(G, 5.2, l + 12, 0xF0C8FF);
}
DPX_AXES.forEach(function (a) { [A.w1[1] + 4, A.w2[1] + 4, A.w3[1] + 5].forEach(function (r, i) { if (lite && i)
return; [-1, 1].forEach(function (sd) { var x = Math.sin(a) * r + Math.cos(a) * sd * 6.5, z = Math.cos(a) * r - Math.sin(a) * sd * 6.5; dxaLamp(G, x, z, i % 2 ? 0xF0C8FF : 0x8AF0E8); }); }); });
var RC = wRand(8181);
for (var c = 0; c < (lite ? 6 : 22); c++) {
var a2 = RC() * 6.283, r2 = [40, 70, 115, 165][c % 4] + RC() * 8, x2 = Math.sin(a2) * r2, z2 = Math.cos(a2) * r2;
if (Math.abs(x2) < 10 || Math.abs(z2) < 10)
continue;
var dr = dpxCyl(G, 0.75, 0.75, 4 + RC() * 5, mar, x2, 0.75, z2, 14);
dr.rotation.z = Math.PI / 2;
dr.rotation.y = RC() * 3;
}
for (var w = 0; w < (lite ? 8 : 30); w++) {
var a3 = wRand(w + 900)() * 6.283, rr = [92, 138, 201][w % 3], x3 = Math.sin(a3) * rr, z3 = Math.cos(a3) * rr;
if (Math.abs(x3) < 8 && z3 > 0)
continue;
dxaAmphora(G, x3, 0, z3, a3, w % 2 === 0);
}
dxaGrowth(G, [[0, 0, 96], [60, 0, -60], [-120, 0, 30], [150, 0, -120], [-170, 0, -90], [200, 0, 40]], lite ? 2 : 4, 99);
}, null);
dxaOuterCity(P, A);
dxaBullCourt(P, A.x + 300, A.z, 30, "The Great Bull Court", true);
dxaBullCourt(P, A.x - 300, A.z + 40, 22, "The Court of the Bull Dancers", false);
P.person("bullmaster", A.x + 300, A.z + 18, Math.PI, { ozCos: "mermaid", sex: "f", look: { top: 0xB83A24, hairStyle: "long" } }, ldWho("Ariadne the bull-dance mistress", L, "a mermaid who teaches the old bull dance in the sunken Great Bull Court of Atlantis in the Deep; she knows the real Knossos bull-leaping fresco (about 1450 BC), the Minoan bull games, Plato's account of the kings hunting the bulls of Poseidon with staves and nooses (Critias), and is honest about what historians know and don't", "Come into the ring! Wait for the head to come up, then take the horns. The bull does the throwing; you do the flying."), { r: 6, sp: 0.4 });
P.sign(A.x + 300, A.z + 44, Math.PI, ["The Great Bull Court", "Press E to read"], ["The bull courts of Atlantis", "Plato and the Minoans", ["Plato says bulls roamed free in Poseidon's temple, and the ten kings hunted them with staves and nooses, no iron, before judging one another.", "On Crete, the Minoans held bull games: the Knossos fresco (about 1450 BC) shows young men and women leaping over a charging bull.", "Press E in the ring to try the dance."]]);
P.make(A.x, A.z - 2, 0, 0.1, function () { DXA_SOLIDS.forEach(function (s) { LD.solids.push({ x: s.x, z: s.z, rot: s.rot, hw: s.hw, hd: s.hd, h: s.h }); }); }, null);
});
"use strict";
(function () {
if (window.DXU_OFF || typeof FURN === "undefined" || typeof THREE === "undefined")
return;
var C = DPX_C, M = dpxF, GL = dpxFGlow;
function G() { return new THREE.Group(); }
function add(g, geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); g.add(m); return m; }
var GEO = {};
FURN.dpx_kelp = function () {
var g = G(), lite = dpxLite();
if (!GEO.kelp) {
var L = [];
for (var b = 0; b < 4; b++) {
var pos = [], idx = [], segs = lite ? 8 : 14, ang = b * 1.6, h = 2.0 + b * 0.35, w0 = 0.11 + (b % 2) * 0.03;
for (var q = 0; q <= segs; q++) {
var v = q / segs, w = w0 * (0.35 + Math.sin(Math.min(1, v * 1.6) * Math.PI * 0.5) * 0.85) * (1 - v * 0.55), cx = Math.cos(ang) * 0.12 + Math.sin(v * 3.5 + b) * 0.14 * v, cz = Math.sin(ang) * 0.12 + Math.cos(v * 3 + b) * 0.1 * v, rf = Math.sin(v * 34 + b * 2) * 0.02;
pos.push(cx - Math.cos(ang + 1.4) * w, 0.12 + v * h, cz - Math.sin(ang + 1.4) * w + rf, cx + Math.cos(ang + 1.4) * w, 0.12 + v * h, cz + Math.sin(ang + 1.4) * w - rf);
if (q) {
var o = (q - 1) * 2;
idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
}
}
var kg = new THREE.BufferGeometry();
kg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
kg.setIndex(idx);
kg.computeVertexNormals();
L.push(kg);
}
GEO.kelp = dxrMerge(L);
}
var r = add(g, new THREE.DodecahedronGeometry(0.34, 0), M(0x6A665C, "stone"), 0, 0.12, 0);
r.scale.set(1.2, 0.45, 1);
add(g, GEO.kelp, M(C.kelp, null, { side: 1 }), 0, 0, 0);
var k2 = add(g, GEO.kelp, M(0x7A8A30, null, { side: 1 }), 0.1, 0, -0.06);
k2.rotation.y = 2.3;
k2.scale.set(0.85, 0.8, 0.85);
return g;
};
FURN.dpx_coralpot = function () {
var g = G(), cols = [C.coralRed, 0xF2804A, 0xA85AC8, 0xF8C84A, 0xE8A0B0], col = cols[(Math.random() * cols.length) | 0];
add(g, new THREE.CylinderGeometry(0.32, 0.22, 0.36, 12), M(C.sand, "stone"), 0, 0.18, 0);
if (!GEO.stag) {
var L = [], R = wRand(77);
(function grow(x, y, z, dx, dy, dz, len, r, d) {
var ex = x + dx * len, ey = y + dy * len, ez = z + dz * len;
dxrBranch(L, x, y, z, ex, ey, ez, r, d <= 0 ? 0.003 : r * 0.7, 5);
if (d <= 0)
return;
for (var i = 0; i < (d > 1 ? 3 : 2); i++) {
var a = R() * 6.283 + i * 2.1, sp = 0.55 + R() * 0.3, nx = dx + Math.cos(a) * sp, ny = dy + 0.4, nz = dz + Math.sin(a) * sp, l = Math.hypot(nx, ny, nz);
grow(ex, ey, ez, nx / l, ny / l, nz / l, len * 0.72, r * 0.66, d - 1);
}
})(0, 0, 0, 0, 1, 0, 0.28, 0.05, 3);
GEO.stag = dxrMerge(L);
}
var s = add(g, GEO.stag, M(col, "stone"), 0, 0.34, 0);
s.scale.setScalar(1.6);
if (!GEO.fan) {
var F = [], R2 = wRand(78);
(function grow(x, y, dx, dy, len, r, d) { var ex = x + dx * len, ey = y + dy * len; dxrBranch(F, x, y, 0, ex, ey, 0, r, r * 0.75, 3); if (d <= 0)
return; [-1, 1].forEach(function (k) { var a = Math.atan2(dy, dx) + k * (0.35 + R2() * 0.25); grow(ex, ey, Math.cos(a), Math.sin(a), len * 0.76, r * 0.75, d - 1); }); })(0, 0, 0, 1, 0.22, 0.02, 4);
GEO.fan = dxrMerge(F);
}
var f = add(g, GEO.fan, M(0xC83A6A, null, { side: 1 }), 0.06, 0.34, -0.14);
f.scale.setScalar(1.5);
return g;
};
FURN.dpx_anemone = function () {
var g = G(), cols = [0xFF7AB8, 0xFFB04A, 0x7AE8C8, 0xC88AFF];
var rk = add(g, new THREE.DodecahedronGeometry(0.5, 0), M(0x6A6A62, "stone"), 0, 0.1, 0);
rk.scale.set(1.4, 0.3, 1);
if (!GEO.anem)
GEO.anem = dxrGeo("anem");
for (var i = 0; i < 5; i++) {
var c = cols[i % 4], m = add(g, GEO.anem, M(c, null, { e: c, ei: 0.18 }), (i - 2) * 0.26, 0.12, (i % 2) * 0.18 - 0.09);
m.scale.setScalar(0.7 + (i % 3) * 0.15);
m.rotation.y = i;
}
return g;
};
FURN.dpx_pearllamp = function () {
var g = G(), co = M(C.coral, "stone");
add(g, new THREE.CylinderGeometry(0.24, 0.3, 0.1, 12), co, 0, 0.05, 0);
for (var k = 0; k < 3; k++) {
var a = k * 2.09, pts = [];
for (var i = 0; i <= 8; i++) {
var t = i / 8;
pts.push(new THREE.Vector3(Math.cos(a + t * 2.2) * (0.2 - t * 0.1), 0.08 + t * 1.42, Math.sin(a + t * 2.2) * (0.2 - t * 0.1)));
}
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 10, 0.03, 5, false), co));
}
var sh = new THREE.Mesh(dpxScallopGeo(1, 9), M(C.pink, "marble", { side: 1 }));
sh.scale.setScalar(0.42);
sh.position.set(0, 1.5, -0.16);
sh.rotation.x = -0.35;
g.add(sh);
var sh2 = new THREE.Mesh(dpxScallopGeo(1, 9), M(C.shell, "marble", { side: 1 }));
sh2.scale.set(0.42, 0.42, 0.42);
sh2.position.set(0, 1.52, -0.16);
sh2.rotation.x = -1.6;
g.add(sh2);
[[0, 1.58, 0.02], [0.08, 1.57, 0.06], [-0.07, 1.57, 0.07], [0.02, 1.6, 0.12]].forEach(function (p, i) { add(g, new THREE.SphereGeometry(i ? 0.045 : 0.07, 10, 8), GL(0xF8F4FF), p[0], p[1], p[2]); });
add(g, new THREE.SphereGeometry(0.32, 10, 8), GL(0xCFF4FF, 0.16), 0, 1.58, 0.05);
return g;
};
})();
var DXI = { shaft: null, bub: null, list: [] };
function dxiShaftMat() { return __ZC(368, 121, this, arguments, new.target); }
function dxiBubbles(n, h) { return __ZC(368, 122, this, arguments, new.target); }
function dxiDress(I) { return __ZC(368, 123, this, arguments, new.target); }
(function () {
if (window.DXU_OFF || typeof PAINT === "undefined")
return;
PAINT.dxunacre = function (x, S, R) {
var g = x.createLinearGradient(0, 0, S, S);
g.addColorStop(0, "#F2E8F0");
g.addColorStop(0.3, "#D8ECF2");
g.addColorStop(0.6, "#F4E2D8");
g.addColorStop(1, "#E2E0F6");
x.fillStyle = g;
x.fillRect(0, 0, S, S);
for (var i = 0; i < 46; i++) {
var y = i * S / 40 + R() * 4, cols = ["rgba(190,230,240,0.35)", "rgba(250,215,225,0.35)", "rgba(220,210,250,0.3)", "rgba(255,250,235,0.45)"];
x.strokeStyle = cols[i % 4];
x.lineWidth = 2 + R() * 4;
x.beginPath();
for (var xx = 0; xx <= S; xx += 8) {
var yy = y + Math.sin(xx / S * Math.PI * 2 * (1 + i % 3) + i) * 6;
if (xx)
x.lineTo(xx, yy);
else
x.moveTo(xx, yy);
}
x.stroke();
}
x.fillStyle = "#D88A78";
x.fillRect(0, S * 0.72, S, S * 0.28);
for (var k = 0; k < 500; k++) {
x.fillStyle = "rgba(" + (160 + ((R() * 80) | 0)) + ",90,80,0.4)";
x.beginPath();
x.arc(R() * S, S * 0.72 + R() * S * 0.28, 1 + R() * 2.5, 0, 6.283);
x.fill();
}
x.fillStyle = "#E8C060";
x.fillRect(0, S * 0.69, S, S * 0.035);
for (var s = 0; s < 8; s++) {
var cx = s * S / 8 + S / 16;
x.beginPath();
x.moveTo(cx, S * 0.69);
x.arc(cx, S * 0.69, 10, Math.PI, 0);
x.fill();
}
};
PAINT.dxumosaic = function (x, S, R) {
x.fillStyle = "#E8DCC4";
x.fillRect(0, 0, S, S);
var t = 8;
for (var y = 0; y < S; y += t)
for (var xx = 0; xx < S; xx += t) {
var w = Math.sin(xx / S * Math.PI * 4 + y / S * Math.PI * 2) * 0.5 + 0.5, band = ((y / S * 6 + w * 1.2) | 0) % 3;
var c = [[232, 220, 196], [90, 170, 190], [240, 200, 150]][band], v = ((R() * 30) | 0) - 15;
x.fillStyle = "rgb(" + (c[0] + v) + "," + (c[1] + v) + "," + (c[2] + v) + ")";
x.fillRect(xx + 0.6, y + 0.6, t - 1.2, t - 1.2);
}
};
if (typeof TILE !== "undefined") {
TILE.dxunacre = 3;
TILE.dxumosaic = 3;
}
})();
function dxiSurf(kind) { var k = "dxi|" + kind; if (DXI[k])
return DXI[k]; var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: texOf(kind), side: THREE.DoubleSide }); m.userData.ldShared = 1; dxuCausPatch(m, 0.8); return (DXI[k] = m); }
function dxiReskin(I) { return __ZC(368, 124, this, arguments, new.target); }
function dxpLiteSafe() { return typeof LITE !== "undefined" && !!LITE; }
(function () {
if (window.DXU_OFF || typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
try {
if (spec && spec.evb && /^dpx/.test(spec.evb.theme || "")) {
DXL.schools = DXL.schools.filter(function (S) { return S.im.parent && S.im.parent.userData.dxlRoot; });
if (!/^dpxatl/.test(spec.evb.theme) && spec.evb.theme !== "dpxpalace")
dxiReskin(I);
dxiDress(I);
}
}
catch (e) {
if (window.console)
console.warn("[deep-realm] rooms", e);
}
return I;
};
})();
(function () {
if (window.DXU_OFF)
return;
var lk = dxuLookTick;
dxuLookTick = function (dt) {
var inDeep = false;
try {
inDeep = !!(typeof INT !== "undefined" && INT && INT.spec && INT.spec.evb && /^dpx/.test(INT.spec.evb.theme || ""));
}
catch (e) { }
DXU.room = inDeep;
lk.apply(this, arguments);
if (inDeep) {
DXL.t.value += dt;
DXL.schools.forEach(function (S) { if (!S.im.parent || S.im.parent.userData.dxlRoot)
return; S.a += dt * S.P.sp; dxlSchoolPlace(S, DXL.t.value); });
}
};
})();
var DXS = { swim: false, keep: false, top: 170, cool: 0, wins: null };
function dxsWinMat() { return __ZC(368, 125, this, arguments, new.target); }
(function () {
if (window.DXU_OFF || typeof PF_TIPS === "undefined")
return;
var at = -1;
PF_TIPS.forEach(function (T, i) { if (T[0] === "rise")
at = i; });
if (at < 0)
at = PF_TIPS.length;
PF_TIPS.splice(at, 0, ["swim", function () { return !!window.DXU_SWIM && walkMode; },
"<b>In the Deep you swim.</b> Hold <b>▲</b> to rise and <b>▼</b> to sink. Swim in through the palace's open windows.",
"<b>In the Deep you swim.</b> Hold <b>Space</b> to rise and <b>C</b> to sink. Swim in through the palace's open windows."]);
})();
function dxsRough(w, h, seed, grow, bottom) { return __ZC(368, 126, this, arguments, new.target); }
function dxsWinPair(G, frame, hole, x, y, z, ry, w, h) { return __ZC(368, 127, this, arguments, new.target); }
function dxsWins() { return __ZC(368, 128, this, arguments, new.target); }
function dxsPalaceDoor() {
if (typeof EVB === "undefined")
return null;
for (var i = 0; i < EVB.doors.length; i++) {
var q = EVB.doors[i];
if (q.spec && q.spec.evb && q.spec.evb.theme === "dpxpalace" && (q.spec.realm || 0) === (store.here || 0))
return q;
}
return null;
}
function dxsWindowIn(feet) { return __ZC(368, 129, this, arguments, new.target); }
function dxsSeaMat() { return __ZC(368, 130, this, arguments, new.target); }
function dxsIsPane(m) { var mt = m.material; return m.isMesh && mt && mt.type === "MeshPhongMaterial" && mt.color && mt.color.getHex() === 0xCFE0F0 && m.geometry && m.geometry.type === "PlaneGeometry"; }
function dxsRoomWindows(I, palace) { return __ZC(368, 131, this, arguments, new.target); }
function dxsWindowOut(side) { return __ZC(368, 132, this, arguments, new.target); }
(function () {
if (window.DXU_OFF || typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
try {
if (spec && spec.evb && /^dpx/.test(spec.evb.theme || ""))
dxsRoomWindows(I, spec.evb.theme === "dpxpalace");
}
catch (e) {
if (window.console)
console.warn("[deep-realm] windows", e);
}
return I;
};
})();
function dxsTick(dt) {
if (DXS.cool > 0)
DXS.cool -= dt;
if (typeof canFly === "undefined")
return;
var deep = dxuInDeep() && (typeof walkMode === "undefined" || walkMode);
if (deep) {
if (!DXS.swim) {
DXS.swim = true;
DXS.keep = !!canFly;
window.DXU_SWIM = 1;
if (typeof setStatus === "function")
setStatus("<b>In the Deep you swim.</b> Space to rise, C to sink. The Sea King's Palace has open windows: swim in through any of them.");
}
canFly = true;
if (typeof flyY !== "undefined" && flyY > DXS.top) {
flyY = DXS.top;
if (flyVz > 0)
flyVz = 0;
}
var feet = camera.position.y - 1.72;
try {
dxsWindowIn(feet);
}
catch (e) { }
}
else if (DXS.swim) {
DXS.swim = false;
window.DXU_SWIM = 0;
canFly = DXS.keep;
if (!canFly && typeof flyY !== "undefined")
flyY = 0;
}
}
(function () {
if (window.DXU_OFF || typeof dxuLookTick !== "function")
return;
var lk = dxuLookTick;
dxuLookTick = function (dt) { var r = lk.apply(this, arguments); try {
dxsTick(dt || 0.016);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] swim", e);
} return r; };
})();
function dxoApple(G, seed, bark, moss, leaf) { return __ZC(368, 133, this, arguments, new.target); }
DPX_PARTS.push(function (P) {
if (window.DXU_OFF || typeof DPX_ATL === "undefined")
return;
var A = DPX_ATL, lite = P.lite, RG = wRand(7717);
var bark = dpxMat(0x7A7068, "bark"), moss = dpxMat(0x6AA060, null, { e: 0x0A2A10, ei: 0.3, side: 2 }), leaf = dpxMat(0xC8A0B0, null, { e: 0x2A1018, ei: 0.3, side: 2 }), st = dpxMat(0xD8CEB8, window.DXU_OFF ? "stone" : "dxuashlar");
function road(a) { return Math.min(Math.abs(Math.sin(a - Math.PI / 2)), Math.abs(Math.sin(a - Math.PI * 1.5))); }
var arcs = [[1.15, 1.98], [4.30, 5.13]];
P.make(A.x, A.z, 0, 1, function (G, H) {
[60, 68, 76].forEach(function (r, k) {
arcs.forEach(function (ar) {
var seg = Math.ceil((ar[1] - ar[0]) * r / 4);
for (var i = 0; i < seg; i++) {
var a = ar[0] + (i + 0.5) / seg * (ar[1] - ar[0]);
if (road(a) * r < 6 || i % 5 === 2)
continue;
var x = Math.sin(a) * r, z = Math.cos(a) * r, L = (ar[1] - ar[0]) * r / seg + 0.05, hh = 0.9 + k * 0.1;
var b = dpxBox(G, L, hh, 0.9, st, x, H.y(x, z) + hh / 2, z, a);
if (RG() < 0.12)
b.rotation.z = 0.25;
LD.solids.push({ x: A.x + x, z: A.z + z, rot: a, hw: L / 2, hd: 0.45, h: hh });
}
});
});
}, null);
var n = 0, max = lite ? 18 : 64;
[56, 64, 72, 80].forEach(function (r) {
arcs.forEach(function (ar) {
for (var a = ar[0] + 0.04; a < ar[1]; a += 7 / r) {
if (n >= max)
return;
if (road(a) * r < 7)
continue;
var x = A.x + Math.sin(a) * (r + (RG() - 0.5) * 2), z = A.z + Math.cos(a) * (r + (RG() - 0.5) * 2);
n++;
P.make(x, z, RG() * 6, 2, (function (seed) { return function (G) { dxoApple(G, seed, bark, moss, leaf); }; })(9100 + n), { r: 0.4, h: 2 });
}
});
});
dpxDo(P, A.x + Math.sin(1.4) * 66, A.z + Math.cos(1.4) * 66, 5, "The drowned apple orchards", "walk the terraces", function () {
dpxLearn("apples", "The orchards of the Isle of Apples", ["The slopes below the palace hill were planted in terraces of apple trees, row under row down to the first ring of water. The sea took them with the city. The trees still stand, grey and bare, and the green sea-growth has made new leaves on their twigs.",
"An island of apples is very old in British legend: Avalon, the \"Isle of Apples\" (Insula Pomorum in Geoffrey of Monmouth's Life of Merlin, about 1150), where the wounded King Arthur was carried over the sea.",
"Plato says of Atlantis that the island bore \"all sorts of fruit\" and that the kings' gardens were watered by the two springs, the hot and the cold, beside the palace."]);
});
});
(function () {
if (window.DXU_OFF || typeof PAINT === "undefined")
return;
function wrap(S, f) { for (var ox = -1; ox <= 1; ox++)
for (var oy = -1; oy <= 1; oy++)
f(ox * S, oy * S); }
PAINT.dxucoral = function (x, S, R) {
x.fillStyle = "#EEE0D8";
x.fillRect(0, 0, S, S);
for (var i = 0; i < 70; i++) {
var cx = R() * S, cy = R() * S, r = S * (0.04 + R() * 0.12), t = R(), col = t < 0.4 ? "rgba(225,190,175,0.35)" : t < 0.75 ? "rgba(200,160,150,0.28)" : "rgba(255,245,238,0.4)";
wrap(S, function (dx, dy) { var g = x.createRadialGradient(cx + dx, cy + dy, 0, cx + dx, cy + dy, r); g.addColorStop(0, col); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(cx + dx - r, cy + dy - r, r * 2, r * 2); });
}
x.lineCap = "round";
for (var v = 0; v < 12; v++) {
var px = R() * S, py = R() * S, a = R() * 6.283;
x.strokeStyle = "rgba(150,100,92,0.18)";
x.lineWidth = 1 + R() * 2;
wrap(S, function (dx, dy) { x.beginPath(); x.moveTo(px + dx, py + dy); var qx = px, qy = py, b = a; for (var k = 0; k < 14; k++) {
b += (R() - 0.5) * 0.9;
qx += Math.cos(b) * S * 0.03;
qy += Math.sin(b) * S * 0.03;
x.lineTo(qx + dx, qy + dy);
} x.stroke(); });
}
for (var p = 0; p < 220; p++) {
var ox = R() * S, oy = R() * S, pr = 0.6 + R() * R() * 3;
wrap(S, function (dx, dy) { x.fillStyle = "rgba(120,80,72,0.4)"; x.beginPath(); x.arc(ox + dx, oy + dy, pr, 0, 6.283); x.fill(); x.fillStyle = "rgba(255,250,245,0.4)"; x.beginPath(); x.arc(ox + dx - pr * 0.35, oy + dy - pr * 0.35, pr * 0.45, 0, 6.283); x.fill(); });
}
};
PAINT.dxucoralin = function (x, S, R) {
var g0 = x.createLinearGradient(0, 0, S, S);
g0.addColorStop(0, "#F4E6EC");
g0.addColorStop(0.35, "#E2EEF4");
g0.addColorStop(0.7, "#F6E8DC");
g0.addColorStop(1, "#F4E6EC");
x.fillStyle = g0;
x.fillRect(0, 0, S, S);
for (var i = 0; i < 40; i++) {
var cx = R() * S, cy = R() * S, r = S * (0.05 + R() * 0.12), c = ["rgba(170,220,240,0.55)", "rgba(250,190,210,0.55)", "rgba(205,195,250,0.5)", "rgba(232,150,120,0.5)"][i % 4];
wrap(S, function (dx, dy) { var g = x.createRadialGradient(cx + dx, cy + dy, 0, cx + dx, cy + dy, r); g.addColorStop(0, c); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(cx + dx - r, cy + dy - r, r * 2, r * 2); });
}
for (var s = 0; s < 18; s++) {
var px = R() * S, py = R() * S, a = R() * 6.283, L = S * (0.04 + R() * 0.1);
x.strokeStyle = ["rgba(255,255,255,0.45)", "rgba(200,230,245,0.4)", "rgba(245,205,220,0.35)"][s % 3];
x.lineWidth = 1 + R() * 2.5;
wrap(S, function (dx, dy) { x.beginPath(); x.moveTo(px + dx, py + dy); x.quadraticCurveTo(px + dx + Math.cos(a) * L, py + dy + Math.sin(a) * L, px + dx + Math.cos(a + 0.9) * L * 1.7, py + dy + Math.sin(a + 0.9) * L * 1.7); x.stroke(); });
}
for (var p = 0; p < 40; p++) {
var ox = R() * S, oy = R() * S, pr = 0.6 + R() * 1.4;
wrap(S, function (dx, dy) { x.fillStyle = "rgba(150,110,110,0.3)"; x.beginPath(); x.arc(ox + dx, oy + dy, pr, 0, 6.283); x.fill(); });
}
};
PAINT.dxusandfloor = function (x, S, R) {
x.fillStyle = "#E4D6BC";
x.fillRect(0, 0, S, S);
for (var y = 0; y < S; y += 6) {
x.strokeStyle = "rgba(150,130,100," + (0.12 + R() * 0.1) + ")";
x.lineWidth = 2 + R() * 2;
x.beginPath();
for (var xx = 0; xx <= S; xx += 8) {
var yy = y + Math.sin(xx / S * Math.PI * 4 + y * 0.07) * 4;
if (xx)
x.lineTo(xx, yy);
else
x.moveTo(xx, yy);
}
x.stroke();
}
for (var i = 0; i < 1500; i++) {
x.fillStyle = "rgba(" + (120 + ((R() * 100) | 0)) + "," + (100 + ((R() * 80) | 0)) + ",80,0.25)";
x.fillRect(R() * S, R() * S, 1.5, 1.5);
}
for (var k = 0; k < 22; k++) {
var cx = R() * S, cy = R() * S, r = 3 + R() * 6, a = R() * 6.283, c = ["#F4E8DC", "#F0C8B8", "#E8D0E8", "#F8F0E0"][k % 4];
x.save();
x.translate(cx, cy);
x.rotate(a);
x.fillStyle = c;
x.beginPath();
x.moveTo(0, r * 0.4);
for (var t = 0; t <= 8; t++) {
var b = Math.PI * (t / 8);
x.lineTo(Math.cos(b) * r, -Math.sin(b) * r);
}
x.closePath();
x.fill();
x.strokeStyle = "rgba(150,110,90,0.5)";
x.lineWidth = 0.8;
for (var t2 = 1; t2 < 8; t2++) {
var b2 = Math.PI * (t2 / 8);
x.beginPath();
x.moveTo(0, r * 0.3);
x.lineTo(Math.cos(b2) * r * 0.95, -Math.sin(b2) * r * 0.95);
x.stroke();
}
x.restore();
}
};
PAINT.dxushellceil = function (x, S, R) {
var g = x.createLinearGradient(0, 0, S, S);
g.addColorStop(0, "#EEE4EC");
g.addColorStop(0.5, "#DCE8F0");
g.addColorStop(1, "#F2E2D8");
x.fillStyle = g;
x.fillRect(0, 0, S, S);
for (var i = 0; i < 16; i++) {
var y = i * S / 16;
var gg = x.createLinearGradient(0, y, 0, y + S / 16);
gg.addColorStop(0, "rgba(255,255,255,0.35)");
gg.addColorStop(0.6, "rgba(150,140,160,0.18)");
gg.addColorStop(1, "rgba(255,255,255,0.3)");
x.fillStyle = gg;
x.beginPath();
x.moveTo(0, y);
for (var xx = 0; xx <= S; xx += 8)
x.lineTo(xx, y + Math.sin(xx / S * Math.PI * 2 + i) * 3);
x.lineTo(S, y + S / 16);
x.lineTo(0, y + S / 16);
x.fill();
}
};
})();
function dxsCornerCoral(h, seed) { return __ZC(368, 134, this, arguments, new.target); }
function dxsPalaceGrown(I) { return __ZC(368, 135, this, arguments, new.target); }
(function () {
if (window.DXU_OFF || typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
try {
if (spec && spec.evb && spec.evb.theme === "dpxpalace")
dxsPalaceGrown(I);
}
catch (e) {
if (window.console)
console.warn("[deep-realm] grown", e);
}
return I;
};
})();
