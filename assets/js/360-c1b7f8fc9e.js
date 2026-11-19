/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DLK = { looks: {}, open: true, at: 0, draft: null, tab: "shape", stock: null, busy: false, tex: {}, mats: {}, geos: {} };
var DL_PAL = [0xFFFFFF, 0xF2EAD8, 0xC8C8C8, 0x7A7A80, 0x3A3A40, 0x101012, 0xD4AF37, 0xB08D57, 0xB87333, 0xC0C6CE,
0xE0201E, 0x8A1020, 0xFF7A1A, 0xFFC21A, 0xFFF04A, 0x9BE22A, 0x1FA84A, 0x0E6B4A, 0x16B8A8, 0x18D4F0,
0x3A8AF0, 0x1A3A9A, 0x0E1A4A, 0x7A3AE0, 0xB45AF0, 0x5A1A7A, 0xF03AA8, 0xFF9AC8, 0x7A4A2A, 0xC89A68];
var DL_GLOWS = [0x9FD8FF, 0xBFFFE8, 0xFFE7A0, 0xFFB27A, 0xFF9AC8, 0xC8A8FF, 0x9BE2A0, 0xFFFFFF];
var DL_SHAPES = [["plain", "Plain, square-topped"], ["arch", "Round-topped arch"], ["pointed", "Pointed arch, like a cathedral"], ["round", "Round, like a cottage in a hill"], ["double", "Double doors"],
["wide", "Wide and square, like a barn"], ["hex", "Six-sided, like a ship of the stars"], ["keyhole", "Keyhole"], ["porthole", "A full circle, like a porthole"]];
var DL_SIZES = [["small", "Small and snug", 0.8, 0.8], ["standard", "Standard", 1, 1], ["tall", "Tall and narrow", 1, 1.35], ["grand", "Grand", 1.3, 1.3], ["towering", "Towering", 1.6, 1.6]];
var DL_TYPES = [["classic", "A proper door (wood or paint, as the Door tab says)"], ["portal", "A swirling portal of light"], ["sliding", "Sliding panels, lit at the seam"], ["vault", "A vault door with a great wheel"],
["gate", "Wrought-iron gates, lit behind"], ["mirror", "A silver mirror"], ["bookcase", "A secret bookcase"], ["curtain", "Velvet curtains"],
["ringgate", "A star ring gate: a great standing ring of glyphs, its heart a swirling liquid light"]];
var DL_FRAMES = [["stone", "Grey stone", null, "stone", 0x8A8E98], ["marble", "White marble", null, "marble", 0xEDE8E0], ["oak", "Carved oak", null, "wood", 0x8A5A32],
["iron", "Black iron", null, "metal", 0x4A4E56], ["gilded", "Gilded", null, "metal", 0xD8B24A], ["obsidian", "Obsidian", null, "stone", 0x2A2430], ["coral", "Sea coral", null, "stone", 0xF08A78],
["crystal", "Star crystal", "cr_crystal", "glass", 0xBFEFFF], ["burl", "Dreamheart burl", "sk_r_burl", "wood", 0xA0522D], ["pearl", "Moonpearl inlay", "sk_r_pearl", "marble", 0xF4EEF8]];
var DL_FINISHES = [["painted", "Painted smooth"], ["planks", "Wooden planks"], ["studded", "Planks with iron studs"], ["stained", "Stained glass"]];
var DL_PLATES = [["brass", "Brass", 0xC9A24A, "#2A1E0A"], ["silver", "Silver", 0xC8CDD4, "#1A1E26"], ["wood", "Wood, carved", 0x7A5232, "#F2E2C0"], ["slate", "Slate, gold letters", 0x2A2E36, "#E8C870"], ["none", "No nameplate"]];
var DL_KNOCKS = [["ring", "A ring knocker"], ["knob", "A round handle"], ["lion", "A lion's head"], ["none", "Nothing"]];
var DL_LIGHTS = [["steady", "A steady light"], ["breath", "A slow breath of light"], ["none", "No light"]];
var DL_ORNS = [["none", "None", null], ["lanterns", "Two lanterns", null], ["ivy", "Climbing ivy", null], ["flowers", "Ivy in flower", null], ["stars", "Gold stars", null],
["runes", "Glowing runes", null], ["crystals", "Crystal crown", "cr_crystal"], ["antlers", "Antler crown", "sk_r_antler"], ["clover", "Clover garland", "sk_r_clover"], ["embers", "Ember braziers", "cr_ember"], ["dragon", "A dragon holding the door", null]];
var DL_FOUND = { cr_crystal: "Star crystal", sk_r_burl: "a Dreamheart burl", sk_r_pearl: "a Moonpearl", sk_r_antler: "a stag's antler", sk_r_clover: "a four-leaf clover", cr_ember: "an ember" };
var DL_BASE = { shape: "plain", frame: "stone", finish: "painted", leaf: "#141620", glow: "#9FD8FF", light: "breath", trim: "#C9A868", plate: "brass", knock: "none", orn: "none", size: "standard", type: "classic", book: "", bkrow: 0, bkpos: 3, decoys: null };
var DL_BOOK_DFLT = "The Hidden Door";
var DL_BKPOS = [[1, "Far left"], [2, "Left"], [3, "Middle"], [4, "Right"], [5, "Far right"]];
function dlBookName(L) { var s = String((L && L.book) || "").replace(/[<>\u0000-\u001f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 40); return s || DL_BOOK_DFLT; }
function dlShelves(inner, top) { var S = [], y, w; for (y = 0.35; y < top - 0.5; y += 0.62) {
w = Math.min(dlWideAt(inner, y), dlWideAt(inner, y + 0.5));
if (w < 0.35)
continue;
S.push([y, w]);
} return S; }
function dlBookSpot(L, inner, top) {
var S = dlShelves(inner, top);
if (!S.length)
return null;
var r = Math.round(+L.bkrow || 0);
if (!(r >= 1))
r = 3;
r = Math.min(r, S.length);
var p = Math.round(+L.bkpos || 0);
if (!(p >= 1 && p <= 5))
p = 3;
var sh = S[r - 1];
return { x: (p - 3) / 2 * Math.max(0, sh[1] - 0.24), y: sh[0], row: r, rows: S.length, pos: p };
}
var DL_DECOY_MAX = 7;
var DL_SPINES = [0x5A1420, 0x14244A, 0x143A2A, 0x4A3018, 0x3A1A4A, 0x1E1A16, 0x6A4A12];
function dlBooks(L, inner, top) { return __ZC(360, 0, this, arguments, new.target); }
function dlSpineTex(title, trim) { return __ZC(360, 1, this, arguments, new.target); }
var DL_HALL_LEAVES = ["#1A3A9A", "#8A1020", "#0E6B4A", "#5A1A7A", "#7A4A2A", "#16B8A8", "#0E1A4A", "#B87333"];
function dlHallLook(u) {
var h = 0, k = String(u || "");
for (var i = 0; i < k.length; i++)
h = (h * 31 + k.charCodeAt(i)) | 0;
return { shape: "arch", frame: "stone", finish: "planks", leaf: DL_HALL_LEAVES[Math.abs(h) % DL_HALL_LEAVES.length], glow: "#FFE7A0", light: "breath", trim: "#C9A868", plate: "brass", knock: "ring", orn: "lanterns" };
}
function dlRow(list, k) { for (var i = 0; i < list.length; i++)
if (list[i][0] === k)
return list[i]; return list[0]; }
function dlHex(s, dflt) { return (typeof s === "string" && /^#[0-9A-Fa-f]{6}$/.test(s)) ? parseInt(s.slice(1), 16) : dflt; }
function dlCss(n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6).toUpperCase(); }
function dlFull(L) { return __ZC(360, 2, this, arguments, new.target); }
function dlPts(shape, d) { return __ZC(360, 3, this, arguments, new.target); }
function dlTop(P) { var t = 0; P.forEach(function (p) { if (p[1] > t)
t = p[1]; }); return t; }
function dlHalfW(P) { var t = 0; P.forEach(function (p) { if (Math.abs(p[0]) > t)
t = Math.abs(p[0]); }); return t; }
function dlTopAt(P, x) {
var t = 0;
for (var i = 0; i < P.length; i++) {
var A = P[i], B = P[(i + 1) % P.length];
if ((A[0] <= x && B[0] >= x) || (B[0] <= x && A[0] >= x)) {
var f = Math.abs(B[0] - A[0]) < 1e-6 ? 0 : (x - A[0]) / (B[0] - A[0]);
var y = A[1] + (B[1] - A[1]) * f;
if (y > t)
t = y;
}
}
return t;
}
function dlLowAt(P, x) {
var t = 1e9;
for (var i = 0; i < P.length; i++) {
var A = P[i], B = P[(i + 1) % P.length];
if ((A[0] <= x && B[0] >= x) || (B[0] <= x && A[0] >= x)) {
var f = Math.abs(B[0] - A[0]) < 1e-6 ? 0 : (x - A[0]) / (B[0] - A[0]);
var y = A[1] + (B[1] - A[1]) * f;
if (y < t)
t = y;
}
}
return t === 1e9 ? 0 : t;
}
function dlNormUV(geo) {
geo.computeBoundingBox();
var b = geo.boundingBox, p = geo.attributes.position, uv = geo.attributes.uv, w = (b.max.x - b.min.x) || 1, h = (b.max.y - b.min.y) || 1;
for (var i = 0; i < p.count; i++)
uv.setXY(i, (p.getX(i) - b.min.x) / w, (p.getY(i) - b.min.y) / h);
uv.needsUpdate = true;
return geo;
}
function dlShape(P) { return new THREE.Shape(P.map(function (p) { return new THREE.Vector2(p[0], p[1]); })); }
function dlStainedTex(leaf) { return __ZC(360, 4, this, arguments, new.target); }
function dlPlateTex(name, plate) { return __ZC(360, 5, this, arguments, new.target); }
function dlMat(col, tex, o) {
var key = col + "|" + (tex || "") + "|" + (o ? JSON.stringify(o) : "");
if (DLK.mats[key])
return DLK.mats[key];
var m = new THREE.MeshLambertMaterial({ color: col });
var t = tex && typeof texOf === "function" ? texOf(tex) : null;
if (t)
m.map = t;
if (o)
for (var k in o)
m[k] = o[k];
return (DLK.mats[key] = m);
}
function dlGeo(key, make) { return DLK.geos[key] || (DLK.geos[key] = make()); }
function dlGlowMat(col, op) { return new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false }); }
function dlBox(g, w, h, d, x, y, z, m) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); return b; }
function dlBall(g, r, x, y, z, m) { var b = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), m); b.position.set(x, y, z); g.add(b); return b; }
function dlDress(G0, spec, L0) { return __ZC(360, 6, this, arguments, new.target); }
function dlGlyphTex() { return __ZC(360, 7, this, arguments, new.target); }
function dlLiquidTex(leaf, glow, web) { return __ZC(360, 8, this, arguments, new.target); }
function dlRingGate(g, spec, L, F, trim, leaf, glow) { return __ZC(360, 9, this, arguments, new.target); }
function dlWideAt(P, y) {
var t = 0;
for (var i = 0; i < P.length; i++) {
var A = P[i], B = P[(i + 1) % P.length];
if ((A[1] <= y && B[1] >= y) || (B[1] <= y && A[1] >= y)) {
var f = Math.abs(B[1] - A[1]) < 1e-6 ? 0 : (y - A[1]) / (B[1] - A[1]);
var x = Math.abs(A[0] + (B[0] - A[0]) * f);
if (x > t)
t = x;
}
}
return t;
}
function dlFlat(inner, key, z, back, m, g) {
var geo = dlGeo("fl|" + key, function () { return dlNormUV(new THREE.ShapeGeometry(dlShape(inner), 6)); });
var me = new THREE.Mesh(geo, m);
me.position.z = z;
if (back)
me.rotation.y = Math.PI;
g.add(me);
return me;
}
function dlSwirlTex(leaf, glow) { return __ZC(360, 10, this, arguments, new.target); }
function dlLeafType(g, TY, L, inner, top, iHW, leaf, trim, glow) { return __ZC(360, 11, this, arguments, new.target); }
function dlOrnament(g, orn, hw, top, trim) { return __ZC(360, 12, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var L = null;
try {
if (spec && spec.dreamerDoor && spec.archetype === "hubdoor") {
L = (DLK.draft && typeof signedIn === "function" && signedIn() && spec.dreamerDoor === session.user.id) ? DLK.draft : DLK.looks[spec.dreamerDoor];
if (!L || !Object.keys(L).length)
L = dlHallLook(spec.dreamerDoor);
dlSized(spec, L);
}
}
catch (e) {
L = null;
}
var g = b0.apply(this, arguments);
try {
if (L)
dlDress(g, spec, L);
}
catch (e) {
if (!DLK.warned && window.console) {
DLK.warned = 1;
console.warn("[door-looks]", e);
}
}
return g;
};
})();
function dlSized(spec, L) {
var SZ = dlRow(DL_SIZES, dlFull(L).size), a = Object.assign({}, spec.attrs || {});
if (SZ[0] === "standard") {
delete a.s;
delete a.h;
}
else {
a.s = SZ[2];
if (SZ[3] !== SZ[2])
a.h = SZ[3] / SZ[2];
else
delete a.h;
}
spec.attrs = a;
}
function dlRedraw(userId) { return __ZC(360, 13, this, arguments, new.target); }
function dlLoad() { return __ZC(360, 14, this, arguments, new.target); }
(function () {
if (typeof fetchHall !== "function")
return;
var f0 = fetchHall;
fetchHall = function () { var a = arguments, self = this; return dlLoad().then(function () { return f0.apply(self, a); }); };
})();
function dlkMe() { return (typeof signedIn === "function" && signedIn()) ? session.user.id : null; }
function dlKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function dlHolds(kind) { return !kind || dlKeeper() || !!(DLK.stock && DLK.stock[kind] > 0); }
function dlLoadStock() { return __ZC(360, 15, this, arguments, new.target); }
function dlPreview(L0) { return __ZC(360, 16, this, arguments, new.target); }
function dlChip(name, label, on, locked) { return __ZC(360, 17, this, arguments, new.target); }
function dlSwatches(fns, field, list) { return __ZC(360, 18, this, arguments, new.target); }
function dlChoices(fns, field, list, needIdx) { return __ZC(360, 19, this, arguments, new.target); }
function dlBookChoices(fns) { return __ZC(360, 20, this, arguments, new.target); }
var DL_TABS = [["shape", "Shape"], ["size", "Size"], ["type", "Type"], ["frame", "Frame"], ["door", "Door"], ["light", "Light"], ["trim", "Trim and nameplate"], ["orn", "Ornament"]];
function dlCard(msg) { return __ZC(360, 21, this, arguments, new.target); }
function dqHeadSafe(t) { return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + t + "</div>"; }
function dlSave(reset) { return __ZC(360, 22, this, arguments, new.target); }
(function () {
if (typeof worldCard !== "function")
return;
var w0 = worldCard;
worldCard = function (html) {
var r = w0.apply(this, arguments);
try {
if (DLK.draft && (!html || String(html).indexOf("Your door in the Hall of Doors") < 0)) {
DLK.draft = null;
var me = dlkMe();
if (me)
dlRedraw(me);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof document === "undefined")
return;
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-door")) {
var b = document.createElement("button");
b.className = "btn";
b.id = "me-door";
b.title = "Change how your own door in the Hall of Doors looks";
b.textContent = "🚪 My door";
b.onclick = function () { DLK.draft = null; DLK.tab = "shape"; dlCard(); };
bar.appendChild(b);
}
var give = document.getElementById("door-give");
if (give && !document.getElementById("door-look")) {
var c = document.createElement("button");
c.className = "btn";
c.id = "door-look";
c.type = "button";
c.textContent = "Change how it looks";
c.onclick = function () { var sc = document.getElementById("set-close"); if (sc)
sc.click(); DLK.draft = null; DLK.tab = "shape"; dlCard(); };
give.parentNode.insertBefore(c, give);
}
}
setTimeout(hook, 1800);
})();
(function () {
if (typeof doorsTick !== "function")
return;
var t0 = doorsTick, said = null;
doorsTick = function () {
var r = t0.apply(this, arguments);
try {
var me = dlkMe();
if (doorNear && me && doorNear.dreamerDoor === me && said !== doorNear) {
said = doorNear;
setStatus("<b>" + esc(String(doorNear.name || "Your door")) + "</b>. " + (typeof dlBookDoor === "function" && dlBookDoor(doorNear) ? "Pull <i>" + esc(dlBookName(dlBookDoor(doorNear))) + "</i> to go home" : "Press E to go home") + ", or change how it looks from <b>🚪 My door</b> in the Menu.");
}
else if (!doorNear)
said = null;
}
catch (e) { }
return r;
};
})();
function dlScaleTex() { return __ZC(360, 23, this, arguments, new.target); }
function dlTaper(pts, prof, segs, rad, mat) { return __ZC(360, 24, this, arguments, new.target); }
function dlDragonCols(L) { return __ZC(360, 25, this, arguments, new.target); }
function dlDragon(g, hw, top, L, glow, topAt) { return __ZC(360, 26, this, arguments, new.target); }
var DLB = { spec: null, fn: null, busy: false, go: null };
function dlBookDoor(spec) {
if (!spec || !spec.dreamerDoor || spec.archetype !== "hubdoor")
return null;
var me = dlkMe(), L = (DLK.draft && me && spec.dreamerDoor === me) ? DLK.draft : DLK.looks[spec.dreamerDoor];
return (L && L.type === "bookcase") ? L : null;
}
function dlBookList(spec) {
var L0 = dlBookDoor(spec);
if (!L0)
return [];
var L = dlFull(L0), inner = dlPts(L.shape, 0);
return dlBooks(L, inner, dlTop(inner));
}
function dlBookWhere(b) {
return (b.row === b.rows && b.rows > 1 ? "top shelf" : b.row === 1 ? "bottom shelf" : "shelf " + b.row + " up") + ", " + dlRow(DL_BKPOS, b.pos)[1].toLowerCase();
}
function dlBookPull(spec, i) { return __ZC(360, 27, this, arguments, new.target); }
function dlBookCard(spec) { return __ZC(360, 28, this, arguments, new.target); }
(function () {
if (typeof hubOffer !== "function")
return;
var h0 = hubOffer;
hubOffer = function (o) {
try {
if (o && dlBookDoor(o)) {
if (typeof HUBUSE !== "undefined")
HUBUSE.arm = null;
return h0.call(this, null);
}
}
catch (e) { }
return h0.apply(this, arguments);
};
})();
(function () {
if (typeof walkIntoDoor !== "function")
return;
var w0 = walkIntoDoor;
walkIntoDoor = function (spec) {
try {
if (DLB.go !== spec && dlBookDoor(spec))
return;
}
catch (e) { }
return w0.apply(this, arguments);
};
})();
(function () {
if (typeof doorsTick !== "function" || typeof worldPromptCity !== "function")
return;
var t0 = doorsTick, told = null;
doorsTick = function () {
var r = t0.apply(this, arguments);
try {
var here = (typeof walkMode === "undefined" || walkMode) && !store.inside && !(typeof amVisiting === "function" && amVisiting());
var d = (here && doorNear && (doorNear.realm || 0) === (store.here || 0)) ? doorNear : null, L = d ? dlBookDoor(d) : null;
if (L && !DLB.busy) {
var mine = !!dlkMe() && d.dreamerDoor === dlkMe();
if (DLB.spec !== d) {
if (DLB.fn && WCITY.fn === DLB.fn)
worldPromptCity(null);
DLB.spec = d;
DLB.fn = function () { if (mine || dlBookList(d).length < 2)
dlBookPull(d, 0);
else
dlBookCard(d); };
}
if (!WCITY.fn) {
var many = dlBookList(d).length > 1;
worldPromptCity(mine ? "📖 <b>press E</b> to pull <i>" + esc(dlBookName(L)) + "</i> and go home"
: many ? "📚 <b>press E</b> to choose a book to pull"
: "📖 <b>press E</b> to pull <i>" + esc(dlBookName(L)) + "</i> and knock", DLB.fn);
}
if (told !== d) {
told = d;
if (!mine)
setStatus("<b>" + esc(String(d.name || "A door")) + "</b>" + (d.doorLine ? " — <i>" + esc(d.doorLine) + "</i>" : "") +
". A bookcase with no handle: one book opens it" + (dlBookList(d).length > 1 ? "" : ", <i>" + esc(dlBookName(L)) + "</i>") + ". " + (d.lights || 0) + " lights left here. Press <b>L</b> to leave one.");
}
}
else if (!L) {
if (DLB.fn && WCITY.fn === DLB.fn)
worldPromptCity(null);
if (DLB.card) {
DLB.card = false;
try {
if (WLD.card && /One of these books opens it/.test(WLD.card.innerHTML))
worldCard(null);
}
catch (e) { }
}
DLB.spec = null;
DLB.fn = null;
told = null;
}
}
catch (e) { }
return r;
};
})();
