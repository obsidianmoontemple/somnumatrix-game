/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var UDX = { root: null, built: false, areas: [], by: {}, here: null, lastHere: null, t: 0, lite: false, flags: {}, told: {}, people: [], anim: [], spots: [], locks: [],
hidden: null, slots: 0, checkAt: 0, busy: false, talkers: [], way: null };
try {
UDX.flags = JSON.parse(localStorage.getItem("sm.udx.flags") || "{}") || {};
}
catch (e) {
UDX.flags = {};
}
function udxFlag(k, v) { if (v === undefined)
return !!UDX.flags[k]; UDX.flags[k] = v ? 1 : 0; try {
localStorage.setItem("sm.udx.flags", JSON.stringify(UDX.flags));
}
catch (e) { } return v; }
function udxLite() { return typeof LITE !== "undefined" && !!LITE; }
function udxSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function udxTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function udxKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function udxBadge(key) { if (!key)
return true; if (udxKeeper())
return true; try {
return typeof wgBadge === "function" && wgBadge(key);
}
catch (e) {
return false;
} }
var UDX_MATC = {};
function udxMat(col, kind, o) {
o = o || {};
var k = col + "|" + (kind || "") + "|" + (o.e || 0) + "|" + (o.ei || 0) + "|" + (o.ds ? 1 : 0) + "|" + (o.basic ? 1 : 0) + "|" + (o.op || 1);
if (UDX_MATC[k])
return UDX_MATC[k];
var m;
if (o.basic) {
m = new THREE.MeshBasicMaterial({ color: col });
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
}
else {
m = new THREE.MeshLambertMaterial({ color: col });
var t = kind && typeof texOf === "function" ? texOf(kind) : null;
if (t) {
m.map = t;
m.userData.udxMap = 1;
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.noPhoto = 1;
UDX_MATC[k] = m;
return m;
}
var UDX_NONE = new THREE.MeshBasicMaterial({ visible: false });
function udxBack(m) { var k = "back|" + m.uuid; if (UDX_MATC[k])
return UDX_MATC[k]; var c = m.clone(); c.side = THREE.BackSide; c.userData.noPhoto = 1; return (UDX_MATC[k] = c); }
function udxBox(w, h, d, mat, x, y, z, parent, ry) {
var g = new THREE.BoxGeometry(w, h, d);
if (mat && mat.map && typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
if (ry)
m.rotation.y = ry;
if (parent)
parent.add(m);
return m;
}
function udxCyl(rt, rb, h, mat, x, y, z, parent, seg) {
var g = new THREE.CylinderGeometry(rt, rb, h, seg || 12);
if (mat && mat.map && typeof metreUVs === "function")
metreUVs(g, "cyl", [rt, rb, h]);
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
if (parent)
parent.add(m);
return m;
}
function udxPlane(w, d, mat, x, y, z, parent, down) {
var g = new THREE.PlaneGeometry(w, d);
if (mat && mat.map && typeof metreUVs === "function")
metreUVs(g, "pln", [w, d]);
var m = new THREE.Mesh(g, mat);
m.rotation.x = down ? Math.PI / 2 : -Math.PI / 2;
m.position.set(x, y, z);
if (parent)
parent.add(m);
return m;
}
function udxGlow(G, col, size, op, x, y, z) { var s = wGlow(col, size, op); s.position.set(x, y, z); G.add(s); UDX.anim.push({ glow: s, b: op, ph: (x * 0.37 + z * 0.11) % 6.28 }); return s; }
function udxSign(G, lines, w, h, x, y, z, ry, bg, fg) {
var s = wSign(lines, w, h, bg || "#1A1424", fg || "#D8C8FF");
s.position.set(x, y, z);
s.rotation.y = ry || 0;
G.add(s);
return s;
}
function udxArea(o) {
var A = Object.assign({ rects: [], solids: [], talk: [], spots: [], people: [], locks: [], y0: -20, y1: 20, built: false, kind: "inside", excl: true }, o);
UDX.areas.push(A);
UDX.by[A.key] = A;
return A;
}
function udxSlot() { var i = UDX.slots++, c = i % 5, r = Math.floor(i / 5); return { x: 3000 + c * 260, z: -350 - r * 260 }; }
function udxIn(A, x, z) { return x >= A.x0 && x <= A.x1 && z >= A.z0 && z <= A.z1; }
function udxRectAt(A, x, z, margin) {
for (var i = 0; i < A.rects.length; i++) {
var r = A.rects[i], m = margin ? (r.m !== undefined ? r.m : 0.42) : 0;
if (x > r.x0 + m && x < r.x1 - m && z > r.z0 + m && z < r.z1 - m)
return r;
}
var D = A.doorways || [];
for (var j = 0; j < D.length; j++) {
var q = D[j];
if (x > q.x0 && x < q.x1 && z > q.z0 && z < q.z1)
return q;
}
return null;
}
function udxH(A, x, z) {
if (A.height) {
var h = A.height(x, z);
if (h !== null && h !== undefined)
return h;
}
var r = udxRectAt(A, x, z, false);
if (!r)
return null;
return r.h ? r.h(x, z) : (r.y || 0);
}
function udxAreaAt(x, z, feet) {
for (var i = 0; i < UDX.areas.length; i++) {
var A = UDX.areas[i];
if (!udxIn(A, x, z))
continue;
if (feet !== undefined && (feet < A.y0 - 4 || feet > A.y1 + 4))
continue;
return A;
}
return null;
}
function udxWalk(A, x0, x1, z0, z1, y, o) { var r = Object.assign({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y || 0 }, o || {}); A.rects.push(r); return r; }
function udxSolid(A, x, z, hw, hd, rot, h, b) { var s = { x: x, z: z, hw: hw, hd: hd, rot: rot || 0 }; if (h !== undefined)
s.h = h; if (b !== undefined)
s.b = b; A.solids.push(s); return s; }
function udxSolidR(A, x, z, r) { var s = { x: x, z: z, r: r }; A.solids.push(s); return s; }
function udxTalk(A, o) { A.talk.push(o); return o; }
function udxBuildArea(A) { return __ZC(328, 0, this, arguments, new.target); }
function udxGo(key, x, z, yw, msg) { return __ZC(328, 1, this, arguments, new.target); }
(function () {
if (typeof udHeight !== "function" || typeof WORLDS === "undefined" || !WORLDS.underdark)
return;
var oldH = udHeight;
udHeight = function (x, z) {
var A = udxAreaAt(x, z);
if (A) {
var h = udxH(A, x, z);
if (h !== null)
return h;
if (A.excl)
return -999;
}
return oldH(x, z);
};
var W = WORLDS.underdark, g0 = W.ground, b0 = W.block, t0 = W.tick, e0 = W.enter;
W.ground = function (x, z, feet) {
var A = udxAreaAt(x, z, feet);
if (A) {
var h = udxH(A, x, z);
if (h !== null)
return h;
}
return g0.apply(this, arguments);
};
W.block = function (x, z, feet) {
var A = udxAreaAt(x, z, feet);
if (A) {
if (A.height) {
if (A.height(x, z) === null && !udxRectAt(A, x, z, true))
return true;
}
else {
var r = udxRectAt(A, x, z, true);
if (!r)
return true;
if (r.lock && !udxBadge(r.lock)) {
udxLockSay(r);
return true;
}
}
if (A.blockFn && A.blockFn(x, z, feet))
return true;
return worldSolidAt(A.solids, x, z, feet);
}
for (var i = 0; i < UDX.areas.length; i++) {
var B = UDX.areas[i];
if (B.excl && udxIn(B, x, z) && udxH(B, x, z) !== null)
return true;
}
return b0.apply(this, arguments);
};
W.tick = function (dt) { t0.apply(this, arguments); try {
udxTick(dt);
}
catch (e) {
if (!UDX.e1) {
UDX.e1 = 1;
if (window.console)
console.warn("[underdark-deep] tick", e);
}
} };
W.enter = function () { var r = e0.apply(this, arguments); UDX.here = null; UDX.checkAt = 0; return r; };
var base = W.env;
W.env = function (dt) {
var b = (typeof base === "function") ? base(dt) : base, A = UDX.here;
if (!A || !A.env)
return b;
if (!UDX.envCache || UDX.envCache.k !== A.key) {
UDX.envCache = { k: A.key, v: Object.assign({}, b, A.env) };
}
return UDX.envCache.v;
};
})();
var UDX_LOCKSAID = 0;
function udxLockSay(r) {
var n = Date.now();
if (n - UDX_LOCKSAID < 4000)
return;
UDX_LOCKSAID = n;
udxSay("<b>" + esc(r.lockName || "Staff only") + ".</b> The door is barred to all but those who work for " + esc(r.lock) + " (and the Keeper). " +
"Ask for work at the 📋 Hiring here board, and your badge will open it.");
}
function udxCull(force) { return __ZC(328, 2, this, arguments, new.target); }
function udxTick(dt) { return __ZC(328, 3, this, arguments, new.target); }
function udxLocksTick() {
var A = UDX.here;
if (!A || !A.locks.length)
return;
A.locks.forEach(function (k) { var ok = udxBadge(k.key); if (ok === k.open)
return; k.open = ok; if (k.leaf)
k.leaf.rotation.y = ok ? k.openRy : k.shutRy; if (k.lamp)
k.lamp.material.color.setHex(ok ? 0x5AE08A : 0xE06A5A); });
}
(function () {
if (typeof udNewWhere !== "function")
return;
var nw = udNewWhere;
udNewWhere = function (x, z) { var A = UDX.here || udxAreaAt(x, z); if (A && A.name) {
if (A.place) {
var p = A.place(x, z);
if (p)
return p;
}
return A.name;
} return nw.apply(this, arguments); };
})();
function udxGlowSkip() {
if (UDX.glowWrapped || typeof udglSkipRoots !== "function")
return;
UDX.glowWrapped = 1;
var sr = udglSkipRoots;
udglSkipRoots = function () { var s = sr.apply(this, arguments); if (UDX.root)
s.push(UDX.root); if (UDX.cityNoGlow)
s = s.concat(UDX.cityNoGlow); return s; };
}
function udxPlan(A, ox, oz, y) { return { A: A, ox: ox, oz: oz, y: y || 0, doors: [], rooms: [], g: A.g }; }
function udxDoor(P, x, z, ax, w, o) { var d = Object.assign({ x: x, z: z, ax: ax, w: w || 1.8 }, o || {}); P.doors.push(d); return d; }
function udxRoom(P, o) { var R = Object.assign({ h: 4 }, o); R.x0 = Math.min(o.x0, o.x1); R.x1 = Math.max(o.x0, o.x1); R.z0 = Math.min(o.z0, o.z1); R.z1 = Math.max(o.z0, o.z1); P.rooms.push(R); return R; }
function udxRaise(P) { return __ZC(328, 4, this, arguments, new.target); }
function udxStairs(A, x, z, name, floors) { return __ZC(328, 5, this, arguments, new.target); }
function udxPortal(A, x, z, label, to, tx, tz, tyaw, msg, r) {
return udxTalk(A, { x: x, z: z, r: r || 2.4, name: label, verb: "go through", fn: function () { udxGo(to, tx, tz, tyaw, msg); } });
}
var UDX_FSIZE = {};
function udxFurnSize(k) {
if (UDX_FSIZE[k])
return UDX_FSIZE[k];
var g = FURN[k](), b = new THREE.Box3().setFromObject(g), s = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
return (UDX_FSIZE[k] = { w: s.x, h: s.y, d: s.z, cx: c.x, cz: c.z });
}
function udxF(A, k, x, y, z, ry, o) { return __ZC(328, 6, this, arguments, new.target); }
function udxRow(A, k, x0, z0, x1, z1, n, y, ry, o) { for (var i = 0; i < n; i++) {
var t = n < 2 ? 0.5 : i / (n - 1);
udxF(A, k, x0 + (x1 - x0) * t, y, z0 + (z1 - z0) * t, ry, o);
} }
function udxLookElf(top, f, o) { var L = UD_ELF(top, f, o); L.species = "elf"; return L; }
function udxLookDwarf(top, o) { return __ZC(328, 7, this, arguments, new.target); }
function udxWho(A, seed, o, x, z, ry, talk, wander) { return __ZC(328, 8, this, arguments, new.target); }
var UDX_SETTING = " (SomnuMatrix's own deep world under the mine; every place, House, clan and person in it is original: Zhaelvorn, City of Spires, the dark elves' city of giant stalactites ruled by the Council of Matrons; the Duskwell Academy of the Deep Arts; the Thornyard; and south down the Thanes' Road the Dwarven Deep of Stonehallow with its Hall of Anvils, Hundred Terraces, Deepdelve Mines and the Thanehold.) Keep it suitable for all ages: mystery and grandeur, never cruelty or horror.";
function udxPersona(name, who, greet) { return { name: name, persona: "You are " + name + ", " + who + UDX_SETTING, greet: greet }; }
function udxWhere(L) { var A = UDX.here; if (!A || !A.name)
return null; if (A.place) {
var p = A.place(L.x, L.z);
if (p)
return p;
} return A.name; }
function udxGallery(A, o) { return __ZC(328, 9, this, arguments, new.target); }
function udxChamber(A, x0, x1, z0, z1, h, o) { return __ZC(328, 10, this, arguments, new.target); }
function udxTimbers(A, ax, a0, a1, c, w, h, step, y) { return __ZC(328, 11, this, arguments, new.target); }
function udxMineLamp(A, x, y, z) { var G = A.g; udxCyl(0.13, 0.17, 0.32, udxMat(0xFFC870, null, { basic: 1 }), x, y, z, G, 8); udxCyl(0.19, 0.19, 0.05, udxMat(0x3A3A3E, "metal"), x, y + 0.2, z, G, 8); udxGlow(G, 0xFFB860, 2.2, 0.55, x, y, z); }
function udxRails(A, ax, a0, a1, c, y) { return __ZC(328, 12, this, arguments, new.target); }
var UDX_MINE = { boards: null, fall: null, fallG: null, fallAside: null };
function udxMineBuild(A) { return __ZC(328, 13, this, arguments, new.target); }
var UDX_MSAID = {};
function udxMineSay(k) { return __ZC(328, 14, this, arguments, new.target); }
function udxBoardsCard() { return __ZC(328, 15, this, arguments, new.target); }
function udxDaybook() { return __ZC(328, 16, this, arguments, new.target); }
function udxFallCard() { return __ZC(328, 17, this, arguments, new.target); }
var UDX_RUNES = [["a ring of three dots", "the marks round the spire's top", 0], ["the spider's eye", "a small round mark, the spider's own eye", 1], ["a crescent, horns down", "the mark under the spire", 0],
["a broken line", "beside the spider's leg", 0], ["a spiral", "in the ring, the topmost mark", 0], ["a crossed spire", "the lowest in the ring", 0]];
function udxRuneCard() { return __ZC(328, 18, this, arguments, new.target); }
function udxKit(A, R, y, door, th) { return __ZC(328, 19, this, arguments, new.target); }
function udxFit(K, k, gap) { return Math.max(1, Math.floor((K.W - 1.2) / (K.wid(k) + (gap || 0.3)))); }
var UDX_KITS = {
bedroom: function (K) {
K.wall("bed", 0);
K.at("sg_qf_nightstand1_walnut", -1.3, 0.6);
K.at("sg_qf_nightstand1_walnut", 1.3, 0.6);
K.left("wardrobe", K.D * 0.55);
K.right("desk", K.D * 0.5);
K.at("chair", K.W / 2 - 1.3, K.D * 0.5, K.ryL);
K.rug("rug", 0, K.D * 0.55);
K.hang("painting", 0, 2.2);
K.glow(0, 1.2, 2.3);
},
grandbed: function (K) { return __ZC(328, 20, this, arguments, new.target); },
study: function (K) { return __ZC(328, 21, this, arguments, new.target); },
library: function (K) { return __ZC(328, 22, this, arguments, new.target); },
dining: function (K) { return __ZC(328, 23, this, arguments, new.target); },
kitchen: function (K) { return __ZC(328, 24, this, arguments, new.target); },
throne: function (K) { return __ZC(328, 25, this, arguments, new.target); },
seat: function (K) { return __ZC(328, 26, this, arguments, new.target); },
council: function (K) { return __ZC(328, 27, this, arguments, new.target); },
shrine: function (K) { return __ZC(328, 28, this, arguments, new.target); },
armoury: function (K) { return __ZC(328, 29, this, arguments, new.target); },
vault: function (K) {
K.wall("vaultround", 0, { y: 0.2 });
K.at("treasurechest", -2, 1.4);
K.at("treasurechest", 2, 1.4);
K.at("goldpile", -K.W / 2 + 2, K.D * 0.55);
K.at("gemheap", K.W / 2 - 1.6, K.D * 0.55);
K.left("displaycase", K.D * 0.85);
K.right("displaycase", K.D * 0.85);
K.glow(0, K.D * 0.5, 2.4, 0xFFD890);
},
barracks: function (K) { return __ZC(328, 30, this, arguments, new.target); },
classroom: function (K) { return __ZC(328, 31, this, arguments, new.target); },
lab: function (K) { return __ZC(328, 32, this, arguments, new.target); },
maps: function (K) {
K.at("maptable", 0, K.D * 0.5);
K.wall("mapchest", -1.4);
K.wall("esbookcase", 1.4);
K.left("lectern", K.D * 0.5);
K.right("mapchest", K.D * 0.5);
K.hangL("painting", K.D * 0.3, 2.2);
K.hangR("painting", K.D * 0.7, 2.2);
K.at("chair", 0, K.D * 0.5 + 1.4, K.ryIn);
K.glow(0, K.D * 0.5, K.h - 1);
},
loom: function (K) {
var n = Math.max(2, Math.floor((K.D - 2) / 1.7));
for (var i = 0; i < n; i++) {
K.at("loom", -K.W / 4, 1.4 + i * 1.7, K.ryIn);
K.at("loom", K.W / 4, 1.4 + i * 1.7, K.ryIn);
}
K.wall("shelfgoods", 0);
K.left("crates", K.D * 0.5);
K.right("trsacks", K.D * 0.5);
K.glow(0, K.D * 0.5, K.h - 1, 0xD8D0FF);
},
stable: function (K) {
var n = Math.max(2, Math.floor((K.D - 2) / 3));
for (var i = 0; i < n; i++) {
K.left("trhay", 1.4 + i * 3);
K.right("trtrough", 1.4 + i * 3);
}
K.wall("trsaddles", -1.2);
K.wall("trsaddles", 1.2);
K.at("barrel", 0, K.D * 0.4);
K.glow(0, K.D * 0.5, K.h - 1, 0xFFC870);
},
bath: function (K) { K.wall("esbathfree", 0); K.left("esbasinrow", K.D * 0.5); K.right("wardrobe", K.D * 0.4); K.at("plant", K.W / 2 - 0.9, K.D - 1); K.near("wallmirror", -1, { y: 0.8, solid: false }); K.rug("rug", 0, K.D * 0.6); K.glow(0, 1.4, 2.4, 0xBFE8FF); },
infirmary: function (K) {
var n = Math.max(1, Math.floor((K.D - 2) / 2.6));
for (var i = 0; i < n; i++) {
K.left("hospitalbed", 1.6 + i * 2.6);
K.right("hospitalbed", 1.6 + i * 2.6);
}
K.wall("wgmedshelf", 0);
K.at("desk", 0, K.D * 0.6);
K.glow(0, K.D * 0.5, K.h - 1, 0xD8F0FF);
},
guard: function (K) { return __ZC(328, 33, this, arguments, new.target); },
office: function (K) {
K.wall("desk", 0);
K.at("chair", 0, 1.3, K.ryOut);
K.at("chair", -0.6, 2.6);
K.at("chair", 0.6, 2.6);
K.left("filecabinet", K.D * 0.3);
K.left("filecabinet", K.D * 0.55);
K.right("esbookcase", K.D * 0.45);
K.hang("noticeboard", 1.9, 1.1);
K.at("clock", -K.W / 2 + 0.6, K.D - 0.7, K.ryR);
K.glow(0, 1, 2.6);
},
store: function (K) { K.runW("shelfgoods", udxFit(K, "shelfgoods", 0.2)); K.left("crates", K.D * 0.35); K.left("trcrates", K.D * 0.7); K.right("barrel", K.D * 0.3); K.right("cask", K.D * 0.6); K.at("trsacks", 0, K.D * 0.55); K.glow(0, K.D * 0.5, K.h - 1, 0xFFC870); },
gallery: function (K) { return __ZC(328, 34, this, arguments, new.target); },
music: function (K) {
K.wall("piano", -1.4);
K.wall("esharp", 1.6);
K.at("chair", -1.4, 1.8, K.ryIn);
var n = Math.max(2, Math.floor(K.W / 1.2) - 2);
for (var i = 0; i < n; i++) {
K.at("chair", (i - (n - 1) / 2) * 1.1, K.D * 0.65, K.ryOut);
}
K.left("sofa", K.D * 0.5);
K.ceil("chandelier", 0, K.D * 0.4);
K.glow(0, K.D * 0.4, K.h - 1.2);
},
ballroom: function (K) { return __ZC(328, 35, this, arguments, new.target); },
sitting: function (K) { return __ZC(328, 36, this, arguments, new.target); },
cells: function (K) { var n = Math.max(1, Math.floor(K.W / 3.4)); for (var i = 0; i < n; i++) {
var a = (i - (n - 1) / 2) * 3.3;
K.at("cellbars", a, 2.4, K.ryIn);
K.at("cot", a, 1.2, K.ryIn + Math.PI / 2);
} K.at("table", 0, K.D - 1.4); K.at("chair", 0.9, K.D - 1.4, K.ryL); K.glow(0, K.D - 1.2, K.h - 1, 0xFFC890); },
forge: function (K) { K.wall("hearthforge", 0); K.at("anvil", -1.6, 3.2); K.at("anvil", 1.6, 3.2); K.left("weaponrack", K.D * 0.5); K.right("workbench", K.D * 0.5); K.at("barrel", K.W / 2 - 1, K.D - 1.1); K.at("oreheap", -K.W / 2 + 1.8, K.D - 1.6, K.ryIn, { s: 0.7 }); K.glow(0, 1, 1.6, 0xFF8A3A, 3.4); },
tavern: function (K) { return __ZC(328, 37, this, arguments, new.target); },
nursery: function (K) { K.wall("crib", -1); K.wall("crib", 1); K.at("toys", 0, K.D * 0.5); K.left("wardrobe", K.D * 0.5); K.right("armchair", K.D * 0.5); K.rug("rug", 0, K.D * 0.5); K.glow(0, 1, 2.2, 0xFFD8C0); },
scrying: function (K) {
K.at("crystalcluster", 0, K.D * 0.5, K.ryIn, { s: 1.3 });
K.wall("lectern", 0);
K.left("esbookcase", K.D * 0.5);
K.right("esbookcase", K.D * 0.5);
K.at("candles", -1.6, K.D * 0.5);
K.at("candles", 1.6, K.D * 0.5);
K.glow(0, K.D * 0.5, 1.8, 0x9A80FF, 4);
},
lecture: function (K) { K.wall("pulpit", 0); K.hang("blackboard", 0, 1.3, { s: 1.2 }); var rows = Math.max(2, Math.floor((K.D - 4) / 1.5)); for (var i = 0; i < rows; i++) {
K.at("pew", -2, 3.6 + i * 1.5, K.ryOut);
K.at("pew", 2, 3.6 + i * 1.5, K.ryOut);
} K.glow(0, 1.4, K.h - 1.2, null, 3.6); },
brewery: function (K) { var n = Math.max(2, Math.floor((K.D - 2) / 2)); for (var i = 0; i < n; i++) {
K.left("cask", 1.4 + i * 2);
K.right("cask", 1.4 + i * 2);
} K.wall("barrel", -1); K.wall("barrel", 0); K.wall("barrel", 1); K.at("workbench", 0, K.D * 0.55); K.glow(0, K.D * 0.5, K.h - 1, 0xFFB060); },
ritual: function (K) { return __ZC(328, 38, this, arguments, new.target); },
sparring: function (K) { return __ZC(328, 39, this, arguments, new.target); },
court: function (K) { return __ZC(328, 40, this, arguments, new.target); },
counting: function (K) { K.wall("counter", -1.3); K.wall("counter", 1.3); K.at("desk", -1.6, 3.4, K.ryOut); K.at("desk", 1.6, 3.4, K.ryOut); K.left("filecabinet", K.D * 0.4); K.left("filecabinet", K.D * 0.6); K.right("treasurechest", K.D * 0.5); K.at("clock", K.W / 2 - 0.6, K.D - 0.7, K.ryL); K.glow(0, K.D * 0.5, K.h - 1, 0xFFD890); },
common: function (K) { K.wall("fireplace", 0); K.at("sofa", -1.6, K.D * 0.45, K.ryIn + 0.3); K.at("sofa", 1.6, K.D * 0.45, K.ryIn - 0.3); K.at("trbenchtable", 0, K.D * 0.75); K.left("esbookcase", K.D * 0.5); K.right("noticeboard", K.D * 0.5, { y: 1, solid: false }); K.rug("rug", 0, K.D * 0.45); K.glow(0, 1, 2.2, 0xFFB070); },
dorm: function (K) { var n = Math.max(2, Math.floor((K.D - 2) / 1.5)); for (var i = 0; i < n; i++) {
K.left("bed", 1.3 + i * 1.5, { s: 0.8 });
K.right("bed", 1.3 + i * 1.5, { s: 0.8 });
} K.wall("wardrobe", -1); K.wall("wardrobe", 1); K.at("desk", 0, K.D * 0.55); K.glow(0, K.D * 0.5, K.h - 1); },
hall: function (K) { K.at("table", 0, K.D * 0.5); K.left("benchin", K.D * 0.5); K.right("benchin", K.D * 0.5); K.wall("clock", 0); K.glow(0, K.D * 0.5, K.h - 1); },
smithy: function (K) { UDX_KITS.forge(K); },
ancestors: function (K) { var n = Math.max(2, Math.floor((K.D - 2) / 2.2)); for (var i = 0; i < n; i++) {
K.left("esbust", 1.4 + i * 2.2);
K.right("esbust", 1.4 + i * 2.2);
} K.wall("goldstatue", 0, { s: 0.8 }); K.rug("redrunner", 0, K.D * 0.5, { s: Math.min(1, (K.D - 1) / 20) }); K.glow(0, 1.6, 2.8, 0xFFC870, 3.2); },
steam: function (K) { return __ZC(328, 41, this, arguments, new.target); }
};
function udxFloor(spec) {
var S = spec.slot || udxSlot(), ox = S.x, oz = S.z, y = spec.y || 0, th = spec.th, hw = (spec.hallW || 5) / 2, hh = spec.hallH || 6;
var fo = Object.assign({ n: "Entrance hall", w: 14, d: 18, h: 8, kit: "hall" }, spec.foyer || {}), en = spec.end;
var at = { n: 0, s: 0 };
(spec.rooms || []).forEach(function (r) { r.side = r.side || (at.n <= at.s ? "n" : "s"); r.ax0 = at[r.side]; at[r.side] += r.w; r.ax1 = at[r.side]; });
var L = Math.max(at.n, at.s, 8);
(spec.rooms || []).forEach(function (r) { if (r.ax1 === at[r.side] && at[r.side] < L)
r.ax1 = L; });
var ex = en ? (en.w || 14) : 0, x0 = -fo.w - 1, x1 = L + ex + 1, depth = Math.max(fo.d / 2, hw + Math.max.apply(null, [6].concat((spec.rooms || []).map(function (r) { return r.d || 7; }))), en ? (en.d || 16) / 2 : 0) + 1;
var A = udxArea({ key: spec.key, name: spec.name, kind: "inside", x0: ox + x0, x1: ox + x1, z0: oz - depth, z1: oz + depth, y0: y - 1, y1: y + 12, env: spec.env || UDX_ENV_IN,
place: function (px, pz) {
var lx = px - ox, lz = pz - oz;
if (lx < 0)
return fo.n;
if (en && lx > L)
return en.n;
for (var i = 0; i < (spec.rooms || []).length; i++) {
var r = spec.rooms[i];
if (lx >= r.ax0 && lx <= r.ax1 && (r.side === "n" ? lz < -hw : lz > hw))
return r.n;
}
return spec.hallName || spec.name;
},
build: function (A) {
var P = udxPlan(A, ox, oz, y);
var fr = udxRoom(P, { x0: -fo.w, x1: 0, z0: -fo.d / 2, z1: fo.d / 2, h: fo.h, wall: th.wall, floor: th.hallFloor || th.floor, ceil: th.ceil, trim: th.trim, name: fo.n });
var hr = udxRoom(P, { x0: 0, x1: L, z0: -hw, z1: hw, h: hh, wall: th.wall, floor: th.hallFloor || th.floor, ceil: th.ceil, trim: th.trim, name: spec.hallName || "gallery" });
udxDoor(P, 0, 0, "z", hw * 2 - 0.6, { h: hh - 0.6, frame: th.trim });
(spec.rooms || []).forEach(function (r) {
var d = r.d || 7, z0 = r.side === "n" ? -hw - d : hw, z1 = r.side === "n" ? -hw : hw + d;
r.R = udxRoom(P, { x0: r.ax0, x1: r.ax1, z0: z0, z1: z1, h: r.h || Math.min(hh, 4.6), wall: r.wall || th.wall, floor: r.floor || th.floor, ceil: th.ceil, trim: th.trim, name: r.n });
r.D = udxDoor(P, (r.ax0 + r.ax1) / 2, r.side === "n" ? -hw : hw, "x", r.dw || 1.8, { lock: r.lock, lockName: r.lockName, frame: th.trim });
});
if (en) {
var ed = en.d || 16;
en.R = udxRoom(P, { x0: L, x1: L + ex, z0: -ed / 2, z1: ed / 2, h: en.h || hh + 2, wall: th.wall, floor: en.floor || th.hallFloor || th.floor, ceil: th.ceil, trim: th.trim, name: en.n });
udxDoor(P, L, 0, "z", Math.min(hw * 2 - 0.6, 3.4), { h: Math.min(hh - 0.6, 4), lock: en.lock, lockName: en.lockName, frame: th.trim });
}
udxRaise(P);
for (var gx = 3; gx < L - 1; gx += 6) {
udxGlow(A.g, th.glow || 0xFFC890, 1.8, 0.5, ox + gx, y + hh - 0.8, oz - hw + 0.4);
udxGlow(A.g, th.glow || 0xFFC890, 1.8, 0.5, ox + gx, y + hh - 0.8, oz + hw - 0.4);
}
for (var rx = 1.4; rx < L - 6; rx += 13)
udxF(A, "runner", ox + rx + 6.5, y, oz, Math.PI / 2, { solid: false, s: Math.min(1, (hw * 2 - 0.6) / 2.4) });
for (var px = 6; px < L - 2; px += 12) {
var free = true;
(spec.rooms || []).forEach(function (r) { if (Math.abs((r.ax0 + r.ax1) / 2 - px) < 1.6)
free = false; });
if (!free)
continue;
udxF(A, "plant", ox + px, y, oz - hw + 0.7, 0, { decor: 1 });
udxF(A, "esbust", ox + px, y, oz + hw - 0.6, Math.PI);
}
if (spec.hallSign !== false)
udxSign(A.g, [spec.name], 3.2, 0.7, ox - 0.6, y + hh - 1.1, oz, -Math.PI / 2, th.signBg, th.signFg);
var FK = udxKit(A, { x0: ox - fo.w, x1: ox, z0: oz - fo.d / 2, z1: oz + fo.d / 2, h: fo.h }, y, "e", th);
(UDX_KITS[fo.kit] || UDX_KITS.hall)(FK);
(spec.rooms || []).forEach(function (r) {
var rr = { x0: ox + r.R.x0, x1: ox + r.R.x1, z0: oz + r.R.z0, z1: oz + r.R.z1, h: r.R.h }, K = udxKit(A, rr, y, r.side === "n" ? "s" : "n", th);
try {
(UDX_KITS[r.t] || UDX_KITS.hall)(K);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] kit", r.t, e);
}
var sx = ox + (r.ax0 + r.ax1) / 2, sz = oz + (r.side === "n" ? -hw + 0.14 : hw - 0.14);
udxSign(A.g, [r.n], 1.9, 0.42, sx, y + 3.15, sz, r.side === "n" ? 0 : Math.PI, th.signBg, th.signFg);
if (r.fn)
udxTalk(A, { x: ox + (r.R.x0 + r.R.x1) / 2, z: oz + (r.R.z0 + r.R.z1) / 2, r: Math.min(4, (r.w) / 2), name: r.n, verb: r.verb || "look round", fn: r.fn });
});
if (en) {
var K2 = udxKit(A, { x0: ox + L, x1: ox + L + ex, z0: oz - (en.d || 16) / 2, z1: oz + (en.d || 16) / 2, h: en.R.h }, y, "w", th);
try {
(UDX_KITS[en.t] || UDX_KITS.hall)(K2);
}
catch (e) { }
udxSign(A.g, [en.n], 2.6, 0.55, ox + L - 0.14, y + Math.min(hh - 0.6, 4) + 0.5, oz, -Math.PI / 2, th.signBg, th.signFg);
if (en.fn)
udxTalk(A, { x: ox + L + ex / 2, z: oz, r: 4, name: en.n, verb: en.verb || "look round", fn: en.fn });
}
if (spec.extra)
spec.extra(A, ox, oz, y, { L: L, hw: hw, fo: fo, ex: ex });
} });
A.ox = ox;
A.oz = oz;
A.fy = y;
A.fo = fo;
A.L = L;
A.inAt = [ox - fo.w + 2.2, oz, -Math.PI / 2];
return A;
}
var UDX_ENV_IN = { top: 0x0A0810, low: 0x0A0810, fog: 0x0A0810, fogD: 0.004, sun: 0.85, sunCol: 0xFFE8D0, sunDir: [0.35, 1, 0.45], hemi: 1.75, hemiCol: 0xEEE4F4, hemiGround: 0x7A7080, stars: 0 };
var UDX_ENV_DWARF = { top: 0x120C08, low: 0x120C08, fog: 0x140E0A, fogD: 0.0032, sun: 0.65, sunCol: 0xFFDCB0, sunDir: [0.35, 1, 0.45], hemi: 1.25, hemiCol: 0xFFE8D0, hemiGround: 0x7A5A40, stars: 0 };
function udxBuilding(o) {
var floors = o.floors.map(function (f, i) { f.key = o.key + "_" + (i + 1); f.name = f.name || o.name; return udxFloor(f); });
var list = floors.map(function (A, i) { return [o.floors[i].label || ("Floor " + (i + 1)), o.floors[i].sub || "", A.key, A.inAt[0] + 2.6, A.inAt[1] + 2.6, -Math.PI / 2]; });
floors.forEach(function (A, i) {
var fo = A.fo, b0 = A.build;
A.build = function (A2) {
b0(A2);
if (floors.length > 1) {
var sx = A.ox - fo.w + 3, sz = A.oz - fo.d / 2 + 2.2;
for (var s = 0; s < 6; s++) {
var sh = (s + 1) * 0.3;
udxBox(0.56, sh, 2.6, (typeof o.stairMat === "function" ? o.stairMat() : o.stairMat) || udxMat(0x3A3440, "stone"), sx - 1.4 + s * 0.55, A.fy + sh / 2, sz, A2.g);
}
udxSolid(A2, sx + 0.1, sz, 1.7, 1.35, 0, 1.8, A.fy);
udxStairs(A2, sx + 1.5, sz + 1.2, o.stairName || "The stair", list.filter(function (q, j) { return j !== i; }));
}
if (i === 0 && o.out) {
var dx = A.ox - fo.w + 0.25, dz = A.oz;
udxBox(0.2, 3.6, 3.2, udxMat(0x1A1420, "wood"), dx, A.fy + 1.8, dz, A2.g);
udxGlow(A2.g, 0xFFC890, 2.2, 0.45, dx + 0.4, A.fy + 3.8, dz);
udxTalk(A2, { x: dx + 1.2, z: dz, r: 2.6, name: "The doors out", verb: "go out", fn: function () { var r = (o.out.dyn && UDX.ret) || o.out; udxGo(o.out.area || "cavern", r.x, r.z, r.yaw, o.out.msg); } });
}
if (o.after && o.after[i])
o.after[i](A2, A);
};
});
return floors;
}
var UDC = { cx: 200, cz: -800, y: -60, cols: [], wins: [], bridges: [], gate: null };
var UDC_HOUSES = [
{ key: "vaelith", name: "House Vaelith", a: 178, col: 0xA070FF, motto: "First among the Houses", trade: "judges and keepers of the law", matron: "Matron Ilvaryn", sig: "crown", special: { n: "The Court of Judgement", t: "court" },
lore: "House Vaelith has given Zhaelvorn its eldest Matron for nine hundred years. In Old Ylmarr they kept the Stone of Law; when the old city fell into the Riven Deep they carried it out on their backs." },
{ key: "ostrael", name: "House Ostrael", a: 245, col: 0x6A9AFF, motto: "We hold the city together", trade: "weavers of the web bridges and the silk", matron: "Matron Quellith", sig: "web", special: { n: "The Silk Loft", t: "loom" },
lore: "Every web bridge in Zhaelvorn was spun by House Ostrael. Their founder wove the first rope across the Riven Deep the night Old Ylmarr fell, and everyone crossed on it." },
{ key: "myrrhen", name: "House Myrrhen", a: 285, col: 0xE070E0, motto: "Light from stone", trade: "mages of the deep arts", matron: "Matron Saelra", sig: "star", special: { n: "The Faerglow Laboratory", t: "lab" },
lore: "House Myrrhen founded the Duskwell Academy. They study the faerglow, the faint light in the rock, and the old songs that make stone remember." },
{ key: "zelvane", name: "House Zelvane", a: 0, col: 0xE05A6A, motto: "The blade keeps the peace", trade: "blademasters of the Spire Guard", matron: "Matron Zhessa", sig: "blades", special: { n: "The Blade Hall", t: "sparring" },
lore: "House Zelvane trains the Spire Guard in the Thornyard. They say a Zelvane blade has not been drawn in anger in three hundred years, which is exactly how they like it." },
{ key: "ithrael", name: "House Ithrael", a: 40, col: 0x4AD8B8, motto: "Every tunnel, known", trade: "mapmakers and scholars", matron: "Matron Ithwyn", sig: "compass", special: { n: "The Chart Room", t: "maps" },
lore: "House Ithrael keeps the Great Chart, a map of every tunnel within a month's walk, cut into silver plates. Ysra of the Halfway Market learned her craft here." },
{ key: "korvaen", name: "House Korvaen", a: 78, col: 0xE8B85A, motto: "Fair weight, long friendship", trade: "merchant princes", matron: "Matron Kaelvra", sig: "scales", special: { n: "The Counting House", t: "counting" },
lore: "House Korvaen trades with Glimmerdeep, the Sunless Sea and the dwarves of Stonehallow. Their scales are the only ones every race of the deep trusts." },
{ key: "sablethorn", name: "House Sablethorn", a: 112, col: 0x6AD86A, motto: "First into the dark", trade: "lizard riders and scouts", matron: "Matron Sylthe", sig: "thorn", special: { n: "The Lizard Stables", t: "stable" },
lore: "House Sablethorn rides the great cave lizards that walk up walls. Their scouts found the Thanes' Road to the dwarves, and keep it safe." }
];
function udcRoofY(x, z) { var d = Math.hypot(x - UD.C.x, z - UD.C.z), R = UD.R + 140; return -64 + R * 0.32 * Math.sqrt(Math.max(0, 1 - d * d / (R * R))); }
function udcColR(C, y, th) { return __ZC(328, 42, this, arguments, new.target); }
function udcColumn(G, C) { return __ZC(328, 43, this, arguments, new.target); }
function udcSigil(sig, col) { return __ZC(328, 44, this, arguments, new.target); }
function udcDoor(G, C, H, toKey, inAt) { return __ZC(328, 45, this, arguments, new.target); }
udCity = function (G, R) { return __ZC(328, 46, this, arguments, new.target); };
UD_FLAT.push([UDC.cx, UDC.cz, 150, 185]);
function udcHomeDoor(G, C, toKey, label, inAt) { return __ZC(328, 47, this, arguments, new.target); }
function udcWard(G, y0, Rr) { return __ZC(328, 48, this, arguments, new.target); }
var UDC_BAZAAR = [
["Velra's silks", "web-weaver", "bz_velra", 0x2A4A6A], ["The Nightbloom perfumer", "perfumer", "bz_perfume", 0x5A2A6A], ["Glass of the Deep", "crystal-glass maker", "bz_glass", 0x2A5A6A],
["Cloaks and Hoods", "cloak-maker", "bz_cloak", 0x3A2A4A], ["Mushroom cordials", "cordial-seller", "bz_cordial", 0x4A3A2A], ["The Lamplighter's", "glow-lamp maker", "bz_lamps", 0x2A3A5A],
["Silver of Zhaelvorn", "silversmith", "bz_silver", 0x4A4A5A], ["Sweetcap bakery", "baker", "bz_baker", 0x5A4A2A]
];
function udcBazaar(G, y0) { return __ZC(328, 49, this, arguments, new.target); }
function udcAcademy(G, y0) { return __ZC(328, 50, this, arguments, new.target); }
function udcThornyard(G, y0) { return __ZC(328, 51, this, arguments, new.target); }
function udcFolk(G, y0, gx, gz) { return __ZC(328, 52, this, arguments, new.target); }
UDX_KITS.foyer = function (K) { return __ZC(328, 53, this, arguments, new.target); };
UDX_KITS.robing = function (K) { K.runW("wardrobe", udxFit(K, "wardrobe", 0.2)); K.left("wallmirror", K.D * 0.5, { y: 0.6, solid: false }); K.right("sg_kf_bench_ebony", K.D * 0.5); K.rug("rug", 0, K.D * 0.55); K.glow(0, K.D * 0.5, K.h - 1); };
function udxLazyTh(spec) { return udxLazyPut({}, spec); }
function udxLazyPut(o, spec) {
Object.keys(spec).forEach(function (k) {
var v = spec[k];
if (typeof v !== "function") {
o[k] = v;
return;
}
var m;
Object.defineProperty(o, k, { enumerable: true, configurable: true, get: function () { if (m === undefined)
m = v(); return m; }, set: function (x) { m = x; } });
});
return o;
}
function udxThElf(col) {
var hex = "#" + ("000000" + col.toString(16)).slice(-6);
return udxLazyTh({ wall: function () { return udxMat(0x3E3850, "stone"); }, floor: function () { return udxMat(0x2E2A38, "marble"); }, hallFloor: function () { return udxMat(0x26222E, "marble"); }, ceil: function () { return udxMat(0x5A5468, "plaster"); }, trim: function () { return udxMat(0x4A3A5A, "metal"); }, glow: col, signBg: "#140E1C", signFg: hex });
}
function udxThHome() { return udxLazyTh({ wall: function () { return udxMat(0x4A4252, "plaster"); }, floor: function () { return udxMat(0x5A4A3E, "wood"); }, hallFloor: function () { return udxMat(0x4A3E34, "wood"); }, ceil: function () { return udxMat(0x3A3440, "stone"); }, trim: function () { return udxMat(0x3A2E26, "wood"); }, glow: 0xFFC890, signBg: "#1A1418", signFg: "#E8D8C8" }); }
function udxIn2(A, F, lx, lz) { return [F.ox + lx, F.oz + lz]; }
var UDX_LESSONS = {
shadow: { t: "Shadow and Illusion", who: "Master Caelos", rows: ["Light travels in straight lines, so anything solid in its way throws a shadow. The nearer the thing is to the lamp, the bigger its shadow.", "An 'illusion' is the eye being honest about light that is being clever: a mirror, a lens, a bent ray in water. The deep arts call it shadow-weaving; the surface calls it optics.", "Try it: hold a hand between a lamp and a wall, and move it towards the lamp. Watch the shadow grow."] },
wards: { t: "Curses and Hexes", who: "Mistress Orla", rows: ["A hex is the oldest weapon of the deep: a mark cut into the dark that makes a foe weaker every moment it clings. Duskwell teaches it as a fighting art, not a game.", "The real thing behind it is slow harm: a bite, a burn or a sickness hurts more over time than in one blow. That is why the Hex of Withering keeps working long after it lands.", "Every House of Zhaelvorn guards its door with its sigil: Vaelith's crown, Ostrael's web, Myrrhen's star, Zelvane's blades, Ithrael's compass, Korvaen's scales, Sablethorn's thorn. Cross one uninvited and you will learn why."] },
light: { t: "Fear and the Dark", who: "Mistress Iriel", rows: ["Fear is a body's alarm: the heart races, the breath goes short, and the legs want to run before the mind has decided anything. The Dread spell rings that alarm in a foe.", "Most hunting beasts are cautious by nature: something that seems bigger and stranger than itself makes it back away. That is why Dread drives beasts off, and why dreamers feel it as a blow.", "In the deep dark, the eyes see almost nothing and the ears make up the rest. Mages of Duskwell learn to be the thing in the dark that others are afraid of."] },
lore: { t: "Lore of the Dead", who: "Sorrith of the Spire library", rows: ["The deep has buried many: miners, soldiers of the old wars, travellers lost in the Riven Deep. Zhaelvorn remembers them, and Duskwell teaches how to call one back to fight for you.", "A wraith is a shade of someone long gone, held together by the caller's will. It obeys for as long as the caller can hold it, and no longer: twenty breaths at most.", "The real lesson under it: caves keep things. Bones and footprints in cave mud have lasted tens of thousands of years, because no rain or sun reaches them."] },
stone: { t: "The Stone-Songs", who: "Master Caelos", rows: ["Sound travels through rock about fifteen times faster than through air. Put your ear to a long stone wall and you hear footsteps before you hear them through the air.", "Miners once listened to the rock to know if a roof was about to fall: it creaks and 'talks' first.", "The Echoing Hollow in the west of the cavern is a ring of stones that answer when you call out: an echo is your own voice coming back off the rock."] },
silk: { t: "Silk and Venom", who: "Mistress Vhessa of House Ostrael", rows: ["Spider silk is a protein, spun as a liquid and pulled into a thread as it leaves the spider. For its weight it is stronger than steel and it can stretch a third longer before it snaps.", "A spider spins different silks for different jobs: a dry, strong one for the spokes of a web, a sticky, stretchy one for the spiral that catches prey.", "Venom is not poison you eat: it is made to be delivered by a bite or a sting. Some spider venoms are now studied to make medicines for pain and for the heart."] },
mirror: { t: "The Hall of Mirrors", who: "Master Caelos", rows: ["A flat mirror makes an image that seems to stand as far behind the glass as you stand in front of it. Left and right look swapped; up and down do not.", "Two mirrors facing each other make images of images, each a little dimmer: a hall that seems to go on forever.", "A curved mirror can make a thing look bigger, smaller or upside down. That is why a spoon shows your face both ways."] },
circle: { t: "The Practice Circles", who: "Mistress Iriel", rows: ["Stand still and breathe slowly: four counts in, four counts out. The first thing any mage of the deep learns is to be calm in the dark.", "Your eyes take about twenty minutes to get used to darkness fully; the cells that see in dim light (rods) need time to recharge.", "That is why the circles glow so softly: bright light would undo twenty minutes of patience in a moment."] }
};
function udxLesson(k) { return __ZC(328, 54, this, arguments, new.target); }
(function () {
var th = udxThElf(0xE070E0), W = "The Duskwell Academy";
function les(k) { return function () { udxLesson(k); }; }
udxBuilding({ key: "academy", name: "The Duskwell Academy", stairName: "The Academy stair", out: { dyn: true, x: 0, z: 0, yaw: 0 },
floors: [
{ name: "The Duskwell Academy", label: "The teaching floor", sub: "classrooms, the lecture theatre, the Practice Hall", th: th, hallW: 5, hallH: 6, hallName: "the Hall of Shadows",
foyer: { n: "the Hall of Shadows", w: 16, d: 20, h: 9, kit: "foyer" },
rooms: [{ n: "Shadow and Illusion", t: "dwshadow", w: 10, d: 9, fn: les("shadow"), verb: "take the lesson" }, { n: "Curses and Hexes", t: "dwwards", w: 10, d: 9, fn: les("wards"), verb: "take the lesson" },
{ n: "Fear and the Dark", t: "dwlight", w: 10, d: 9, fn: les("light"), verb: "take the lesson" }, { n: "Lore of the Dead", t: "dwlore", w: 10, d: 9, fn: les("lore"), verb: "take the lesson" },
{ n: "Silk and Venom", t: "dwsilkroom", w: 10, d: 9, fn: les("silk"), verb: "take the lesson" },
{ n: "The lecture theatre", t: "lecture", w: 12, d: 11, h: 6, fn: les("stone"), verb: "hear the lecture" }, { n: "The refectory", t: "dining", w: 12, d: 10 }, { n: "The Academy kitchen", t: "kitchen", w: 8, d: 9 },
{ n: "The Headmistress's office", t: "office", w: 8, d: 8, lock: W, lockName: "Headmistress" }, { n: "The infirmary", t: "infirmary", w: 8, d: 9 }],
end: { n: "The Practice Hall", t: "ritual", w: 18, d: 18, h: 9, fn: les("circle"), verb: "practise in the circle" } },
{ name: "The Duskwell Academy", label: "The students' floor", sub: "dormitories, the laboratory, the archive", th: th, hallW: 4.6, hallH: 5.5, hallName: "the students' floor",
foyer: { n: "the upper landing", w: 12, d: 14, h: 6, kit: "foyer" },
rooms: [{ n: "Dormitory of the First Year", t: "dorm", w: 10, d: 10 }, { n: "Dormitory of the Second Year", t: "dorm", w: 10, d: 10 }, { n: "Dormitory of the Third Year", t: "dorm", w: 10, d: 10 },
{ n: "A teacher's room", t: "bedroom", w: 8, d: 8 }, { n: "Another teacher's room", t: "bedroom", w: 8, d: 8 }, { n: "The alchemy laboratory", t: "lab", w: 11, d: 9, fn: function () { if (typeof spbBrewOpen === "function")
spbBrewOpen("dusk"); }, verb: "brew at the cauldrons" },
{ n: "The scrying room", t: "scrying", w: 8, d: 8 }, { n: "The Archive of Spells", t: "library", w: 10, d: 9, lock: W, lockName: "Archive" }, { n: "The students' common room", t: "common", w: 10, d: 9 }, { n: "The baths", t: "bath", w: 8, d: 8 }],
end: { n: "The Starless Observatory", t: "scrying", w: 14, d: 14, h: 8 } },
{ name: "The Duskwell Academy", label: "The Deep Floor", sub: "the Glowcap Garden, the Halls of Sigils and Mirrors, the Proving Cavern", th: th, hallW: 5.4, hallH: 7, hallName: "the Deep Floor", slot: { x: 4600, z: -350 },
foyer: { n: "the deep landing", w: 14, d: 16, h: 8, kit: "foyer" },
rooms: [{ n: "The Glowcap Garden", t: "dwgarden", w: 16, d: 12, h: 6, fn: function () { if (typeof dwGardenCard === "function")
dwGardenCard(); }, verb: "gather herbs" },
{ n: "The Hall of Sigils", t: "dwsigils", w: 14, d: 14, h: 6, fn: les("wards"), verb: "study the curses" },
{ n: "The Hall of Mirrors", t: "dwmirrors", w: 14, d: 12, h: 6, fn: les("mirror"), verb: "look into the mirrors" },
{ n: "The Silk Loft", t: "dwsilkloft", w: 12, d: 11, h: 6, fn: les("silk"), verb: "watch the spinners" },
{ n: "The Echo Vault", t: "dwecho", w: 12, d: 12, h: 6, fn: les("stone"), verb: "sing to the stones" },
{ n: "The Masters' Library", t: "library", w: 12, d: 11, h: 6, lock: W, lockName: "Masters' Library" },
{ n: "The Bestiary of the Deep", t: "dwbestiary", w: 12, d: 11, h: 5 },
{ n: "The Well of Shadows", t: "dwwell", w: 12, d: 12, h: 6, fn: les("circle"), verb: "sit by the well" }],
end: { n: "The Proving Cavern", t: "dwrange", w: 20, d: 18, h: 9, fn: function () { if (typeof dwRangeCard === "function")
dwRangeCard(); }, verb: "read the board" } }
],
after: [function (A, F) {
udxWho(A, "ac_head", { sex: "f", look: UD_ELF(0x3A1A4A, 1, 4), must: 1 }, F.ox - 5, F.oz + 4, Math.PI / 2, udxPersona("Headmistress Myrrhen Vaye", "the Headmistress of the Duskwell Academy of the Deep Arts, founded by House Myrrhen. Wise, dry-witted, fiercely protective of her students. You explain that the Academy teaches the deep arts: dark and dangerous fighting magic that works against any foe, beast or dreamer (Shadow Strike, Veil of Night, the Hex of Withering, Dread, Soul Drain, Earthrend, Venom Web, Summon Wraith). Each lesson also teaches the real science underneath. Lessons are open to visitors: walk into any classroom and take one.", "A visitor in the Hall of Shadows. Our classrooms are down the hall; any door with a lesson is open to you."));
for (var s = 0; s < (UDX.lite ? 3 : 6); s++)
udxWho(A, "ac_st" + s, { sex: s % 2 ? "f" : "m", look: UD_ELF([0x3A2A5A, 0x2A3A5A, 0x4A2A4A][s % 3], s % 2, s) }, F.ox + 6 + s * 6, F.oz + (s % 2 ? 1 : -1), 0, null, { r: 8, sp: 1 });
udxWho(A, "ac_t1", { sex: "m", look: UD_ELF(0x1A2A4A, 0, 2), must: 1 }, F.ox + 5, F.oz - 9, 0, udxPersona("Master Caelos", "a teacher at the Duskwell Academy who teaches Shadow and Illusion (optics) and the Stone-Songs (sound in rock), and with them the spells Shadow Strike, Veil of Night and Earthrend. Theatrical, a little frightening, fond of demonstrations with lamps and mirrors.", "Ah! A new face. Do you know why your shadow is bigger when you stand near the lamp? Come and find out."));
}, function (A, F) {
udxWho(A, "ac_alch", { sex: "f", look: UD_ELF(0x2A4A3A, 1, 5), must: 1 }, F.ox + 25, F.oz - 6, 0, udxPersona("Mistress Orla", "a teacher at the Duskwell Academy who keeps the alchemy laboratory and teaches Curses and Hexes (the Hex of Withering). Careful, patient, strict about safety; your alchemy is real chemistry (crystals, dyes, salts) and you never let students taste anything.", "Goggles on, hands where I can see them. Now: what would you like to grow, a crystal or a dye? Or brew a draught: bring me glowcap from the garden on the Deep Floor."));
}, function (A, F) {
udxWho(A, "ac_vhessa", { sex: "f", look: UD_ELF(0x2A2A3A, 1, 3), must: 1 }, F.ox + 20, F.oz + 8, Math.PI, udxPersona("Mistress Vhessa of House Ostrael", "a teacher at the Duskwell Academy from House Ostrael, the spider-weavers, who teaches Silk and Venom (the Venom Web spell) and keeps the Silk Loft. Quiet, exact, quietly funny, fond of spiders and impatient with anyone who squashes one. Your lessons are real biology: spider silk, webs, venoms and the medicines made from them.", "Mind the threads. Every one of them was spun by someone who worked hard at it."));
udxWho(A, "ac_gard", { sex: "m", look: UD_ELF(0x2A3A2A, 0, 1), must: 1 }, F.ox + 8, F.oz - 12, 0, udxPersona("Thessaly the glowcap-keeper", "the keeper of the Glowcap Garden on the Deep Floor of the Duskwell Academy. Gentle, earthy, proud of mushrooms that grow without sun. You explain that fungi do not need light because they feed on what rots, and that some glow by bioluminescence.", "Pick from the ripe beds only, mind. They grow back if you let them."));
for (var s = 0; s < (UDX.lite ? 2 : 4); s++)
udxWho(A, "ac_ds" + s, { sex: s % 2 ? "m" : "f", look: UD_ELF([0x3A2A5A, 0x2A3A5A][s % 2], s % 2, s + 2) }, F.ox + 14 + s * 12, F.oz + (s % 2 ? 1 : -1), Math.PI / 2, null, { r: 10, sp: 0.9 });
}] });
})();
(function () {
var th = udxThElf(0xE05A6A), W = "The Thornyard";
udxLazyPut(th, { wall: function () { return udxMat(0x4A4250, "stone"); }, floor: function () { return udxMat(0x4A3E34, "wood"); } });
udxBuilding({ key: "thorn", name: "The Thornyard Barracks", out: { dyn: true, x: 0, z: 0, yaw: 0 },
floors: [{ name: "The Thornyard Barracks", th: th, hallW: 4.6, hallH: 5.5, hallName: "the barracks hall", foyer: { n: "the muster hall", w: 14, d: 16, h: 7, kit: "foyer" },
rooms: [{ n: "Barracks of the First Blade", t: "barracks", w: 10, d: 10 }, { n: "Barracks of the Second Blade", t: "barracks", w: 10, d: 10 }, { n: "Barracks of the Scouts", t: "barracks", w: 10, d: 10 },
{ n: "The armoury", t: "armoury", w: 9, d: 9, lock: W, lockName: "Armoury" }, { n: "The mess hall", t: "dining", w: 12, d: 10 }, { n: "The barracks kitchen", t: "kitchen", w: 8, d: 9 },
{ n: "The quartermaster's store", t: "store", w: 8, d: 9, lock: W, lockName: "Quartermaster" }, { n: "The captain's office", t: "office", w: 8, d: 8 }, { n: "The infirmary", t: "infirmary", w: 8, d: 9 },
{ n: "The baths", t: "bath", w: 7, d: 8 }, { n: "The map room", t: "maps", w: 8, d: 8 }],
end: { n: "The Sparring Hall", t: "sparring", w: 18, d: 18, h: 8 } }],
after: [function (A, F) {
udxWho(A, "tb_qm", { sex: "m", look: { top: 0x3A2A22, topKind: "shirt", bottom: 0x2A2A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "short", hat: "none", layer: "apron", layerColor: 0x4A3A2A }, must: 1 }, F.ox - 4, F.oz + 5, Math.PI / 2, udxPersona("Dorrel, quartermaster of the Thornyard", "the quartermaster of the Thornyard barracks: you issue kit, count arrows, and grumble about how fast recruits lose boots. Practical, funny, secretly soft-hearted.", "Name, size, and how many boots you lost last month? Only joking. Mostly."));
for (var s = 0; s < (UDX.lite ? 2 : 5); s++)
udxWho(A, "tb_r" + s, { sex: s % 2 ? "f" : "m", look: { top: 0x2A2238, topKind: "shirt", bottom: 0x1A1A22, skin: [0x4A4660, 0x3E3A52, 0x55506A][s % 3], hair: 0xEDEAF4, hairStyle: s % 2 ? "long" : "short", hat: "none", layer: "armor", layerColor: 0x2A2438 } }, F.ox + F.L + 6 + (s % 3) * 3, F.oz - 3 + s * 1.5, -Math.PI / 2, null, { r: 5, sp: 0.9 });
}] });
})();
(function () {
var th = udxThHome();
udxBuilding({ key: "ward_a", name: "A home in the Lower Ward", out: { dyn: true, x: 0, z: 0, yaw: 0 }, floors: [{ name: "A home in the Lower Ward", th: th, hallW: 3, hallH: 3.6, hallName: "the passage", hallSign: false,
foyer: { n: "the front room", w: 8, d: 9, h: 3.8, kit: "sitting" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 6, d: 6, h: 3.4 }, { n: "The bedroom", t: "bedroom", w: 6, d: 6, h: 3.4 }, { n: "The bathroom", t: "bath", w: 5, d: 5, h: 3.4 }, { n: "The store room", t: "store", w: 5, d: 5, h: 3.4 }] }] });
udxBuilding({ key: "ward_b", name: "A family home in the Lower Ward", out: { dyn: true, x: 0, z: 0, yaw: 0 }, floors: [{ name: "A family home in the Lower Ward", th: th, hallW: 3, hallH: 3.6, hallName: "the passage", hallSign: false,
foyer: { n: "the front room", w: 9, d: 10, h: 3.8, kit: "sitting" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 7, d: 6, h: 3.4 }, { n: "The parents' room", t: "bedroom", w: 7, d: 6, h: 3.4 }, { n: "The children's room", t: "nursery", w: 6, d: 6, h: 3.4 },
{ n: "The bathroom", t: "bath", w: 5, d: 5, h: 3.4 }, { n: "The study", t: "study", w: 6, d: 6, h: 3.4 }], end: { n: "The dining room", t: "dining", w: 8, d: 8, h: 3.6 } }] });
udxBuilding({ key: "ward_c", name: "A weaver's home in the Lower Ward", out: { dyn: true, x: 0, z: 0, yaw: 0 }, floors: [{ name: "A weaver's home in the Lower Ward", th: th, hallW: 3, hallH: 3.6, hallName: "the passage", hallSign: false,
foyer: { n: "the front room", w: 9, d: 10, h: 3.8, kit: "sitting" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 7, d: 6, h: 3.4 }, { n: "The bedroom", t: "bedroom", w: 6, d: 6, h: 3.4 }, { n: "The second bedroom", t: "bedroom", w: 6, d: 6, h: 3.4 },
{ n: "The bathroom", t: "bath", w: 5, d: 5, h: 3.4 }, { n: "The workroom", t: "loom", w: 8, d: 7, h: 3.6 }] }],
after: [function (A, F) { udxWho(A, "wc_weaver", { sex: "f", look: UD_ELF(0x3A3A5A, 1, 2), must: 1 }, F.ox - 4, F.oz + 2, Math.PI / 2, udxPersona("Ennika, a weaver of the Lower Ward", "a weaver who works for House Ostrael from her home in the Lower Ward, weaving spider silk into cloth on two looms in her workroom. Warm, chatty, proud of her children and her cloth.", "Come in, come in, mind the threads. Tea? It's made from glowcap, it's better than it sounds.")); }] });
})();
var UDS = { tex: {}, lesser: [] };
function udsHex(c) { return "#" + ("000000" + c.toString(16)).slice(-6); }
function udsColHit(x, z, feet) { return __ZC(328, 55, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W)
return;
var b = W.block;
W.block = function (x, z, feet) { if (!(UDX.here && UDX.here.kind === "inside") && UDC.cols.length && udsColHit(x, z, feet))
return true; return b.apply(this, arguments); };
})();
function udsDoorAt(G, C, H, ang, toKey, inAt) {
var kx = UDC.cx, kz = UDC.cz;
UDC.cx = C.x + Math.cos(ang) * 400;
UDC.cz = C.z + Math.sin(ang) * 400;
try {
return udcDoor(G, C, H, toKey, inAt);
}
finally {
UDC.cx = kx;
UDC.cz = kz;
}
}
function udsInlay(sig, col) { return __ZC(328, 56, this, arguments, new.target); }
function udsBanner(sig, col) { var k = "b|" + sig + "|" + col; if (UDS.tex[k])
return UDS.tex[k]; var m = new THREE.MeshLambertMaterial({ map: udcSigil(sig, col), side: THREE.DoubleSide }); m.userData.noPhoto = 1; return (UDS.tex[k] = m); }
function udsWing(A, ox, oz, y, ang, parts, th) { return __ZC(328, 57, this, arguments, new.target); }
function udsWingRect(w, x, z, margin) {
var dx = x - w.cx, dz = z - w.cz, lx = dx * w.c - dz * w.s, lz = dx * w.s + dz * w.c;
for (var i = 0; i < w.rects.length; i++) {
var r = w.rects[i], m = margin ? (r.m !== undefined ? r.m : 0.42) : 0;
if (lx > r.x0 + m && lx < r.x1 - m && lz > r.z0 + m && lz < r.z1 - m)
return r;
}
return null;
}
function udsRound(o) {
var S = udxSlot(), ox = S.x, oz = S.z, y = o.y || 0, R = o.R || 18, H = o.H || 14, th = o.th, rooms = o.rooms || [], N = rooms.length + 2, step = Math.PI * 2 / N;
var gi = Math.floor(N / 2), wmax = 2 * (R + 0.3) * Math.tan(step / 2) - 0.7, k = 1;
rooms.forEach(function (r) { if (k === gi)
k++; r.ang = Math.PI + k * step; r.w = Math.min(r.w || 8, wmax); r.d = r.d || 8; r.h = r.h || Math.min(5.2, H - 1); k++; });
var gA = Math.PI + gi * step, G = Object.assign({ n: "The great hall", t: "seat", w: 16, d: 18, h: 8 }, o.grand || {});
var nb = rooms.filter(function (r) { var d = Math.abs(Math.atan2(Math.sin(r.ang - gA), Math.cos(r.ang - gA))); return d < step * 1.5; });
var reach = R + 0.3 + 6;
nb.forEach(function (r) { var dA = Math.abs(Math.atan2(Math.sin(r.ang - gA), Math.cos(r.ang - gA))); reach = Math.max(reach, (R + 0.3 + r.d) * Math.cos(dA) + (r.w / 2) * Math.sin(dA) + 1); });
var Lc = Math.max(6, reach - (R + 0.3)), cw = Math.min(wmax, o.wayW || 5), hc = Math.min(H - 1, o.wayH || 6.5);
var two = rooms.filter(function (r) { var d = Math.abs(Math.atan2(Math.sin(r.ang - gA), Math.cos(r.ang - gA))); return d > step * 1.5 && d < step * 2.5; }), GW = G.w;
two.forEach(function (r) { var dA = Math.abs(Math.atan2(Math.sin(r.ang - gA), Math.cos(r.ang - gA))); if (dA < Math.PI / 2)
GW = Math.min(GW, 2 * ((R + 0.3) * Math.sin(dA) - (r.w / 2) * Math.cos(dA) - 0.6)); });
G.w = Math.max(cw + 2, GW);
G.Lc = Lc;
var ext = R + 2;
rooms.forEach(function (r) { ext = Math.max(ext, Math.hypot(R + 0.3 + r.d, r.w / 2) + 1); });
ext = Math.max(ext, Math.hypot(R + 0.3 + Lc + G.d, G.w / 2) + 1);
var F = { ox: ox, oz: oz, y: y, R: R, H: H, rooms: rooms, grand: G, gA: gA, step: step,
rot: function (a, rad) { return [ox + Math.cos(a) * rad, oz + Math.sin(a) * rad]; },
face: function (px, pz) { return Math.atan2(ox - px, oz - pz); } };
var rotName = o.rotName || ("the rotunda of " + o.name);
var A = udxArea({ key: o.key, name: o.name, kind: "inside", x0: ox - ext, x1: ox + ext, z0: oz - ext, z1: oz + ext, y0: y - 1, y1: y + H + 2, env: o.env || UDX_ENV_IN, wings: [],
place: function (px, pz) {
var dx = px - ox, dz = pz - oz;
if (dx * dx + dz * dz < R * R)
return rotName;
for (var i = 0; i < A.wings.length; i++) {
var r = udsWingRect(A.wings[i], px, pz, false);
if (r && r.room)
return r.room.name;
}
return rotName;
},
height: function (px, pz) {
var dx = px - ox, dz = pz - oz;
if (dx * dx + dz * dz < (R - 0.55) * (R - 0.55))
return y;
for (var i = 0; i < A.wings.length; i++)
if (udsWingRect(A.wings[i], px, pz, true))
return y;
return null;
},
blockFn: function (px, pz) { for (var i = 0; i < A.wings.length; i++) {
var r = udsWingRect(A.wings[i], px, pz, false);
if (r && r.lock && !udxBadge(r.lock)) {
udxLockSay(r);
return true;
}
} return false; },
build: function (A) { udsRaiseRound(A, o, F); } });
A.ox = ox;
A.oz = oz;
A.fy = y;
A.F = F;
A.inAt = [ox - (R - 3.2), oz, -Math.PI / 2];
return A;
}
function udsRaiseRound(A, o, F) { return __ZC(328, 58, this, arguments, new.target); }
function udsSpiral(A, x, z, y, top, th, col) { return __ZC(328, 59, this, arguments, new.target); }
UDX_KITS.procession = function (K) {
var s = { s: Math.min(1, (K.h - 0.4) / 4.2) };
for (var b = 2.2; b < K.D - 1.4; b += 4.2) {
K.hangL("hallbanner", b, 0.2, s);
K.hangR("hallbanner", b, 0.2, s);
K.glow(-K.W / 2 + 0.5, b + 2.1, K.h - 1.2);
K.glow(K.W / 2 - 0.5, b + 2.1, K.h - 1.2);
}
K.rug("redrunner", 0, K.D * 0.5, { s: Math.min(1, (K.D - 1) / 20) });
};
UDX_KITS.crystal = function (K) { return __ZC(328, 60, this, arguments, new.target); };
UDX_KITS.exchange = function (K) { return __ZC(328, 61, this, arguments, new.target); };
UDX_KITS.saddlery = function (K) { return __ZC(328, 62, this, arguments, new.target); };
UDX_KITS.trophy = function (K) { return __ZC(328, 63, this, arguments, new.target); };
UDX_KITS.tailor = function (K) {
K.wall("dressform", -1.8);
K.wall("dressform", 0);
K.wall("dressform", 1.8);
K.at("trcuttable", 0, K.D * 0.55);
K.left("wardrobe", K.D * 0.4);
K.left("shelfgoods", K.D * 0.75);
K.right("wallmirror", K.D * 0.5, { y: 0.6, solid: false });
K.at("chair", 1.2, K.D * 0.55 + 1.3, K.ryIn);
K.glow(0, K.D * 0.5, K.h - 1, 0xFFE8D0);
};
UDX_KITS.dye = function (K) {
var n = Math.max(2, Math.floor((K.D - 2) / 2));
for (var i = 0; i < n; i++) {
K.left("cask", 1.4 + i * 2);
K.right("cask", 1.4 + i * 2);
}
K.wall("herbrack", -1.3);
K.wall("shelfgoods", 1.3);
K.at("workbench", 0, K.D * 0.55);
K.at("trsacks", 0, K.D - 1.2);
K.glow(0, K.D * 0.5, K.h - 1, 0x8AC8FF);
K.glow(0, K.D * 0.5, 1, 0xE070E0, 2.2);
};
UDX_KITS.instruments = function (K) {
K.wall("displaycase", -1.8);
K.wall("displaycase", 1.8);
K.hang("trwallmap", 0, 1.5, { s: 0.8 });
K.at("maptable", 0, K.D * 0.55);
K.left("lectern", K.D * 0.4);
K.left("clock", K.D * 0.75);
K.right("mapchest", K.D * 0.4);
K.right("esbookcase", K.D * 0.75);
K.glow(0, K.D * 0.5, K.h - 1, 0xC8F0E8);
};
UDX_KITS.engrave = function (K) { return __ZC(328, 64, this, arguments, new.target); };
UDX_KITS.glass = function (K) { K.wall("trglassfurnace", 0); K.at("trglassbench", -1.4, K.D * 0.5); K.at("trglassbench", 1.4, K.D * 0.5); K.left("displaycase", K.D * 0.45); K.right("shelfgoods", K.D * 0.45); K.glow(0, 1.2, 1.4, 0xFF9A40, 3); };
UDX_KITS.pottery = function (K) { K.at("potterswheel", -1.4, K.D * 0.4); K.at("potterswheel", 1.4, K.D * 0.4); K.wall("oven", 0); K.left("shelfgoods", K.D * 0.5); K.right("crates", K.D * 0.5); K.at("trbenchtable", 0, K.D * 0.75); K.glow(0, 1.2, 2, 0xFFB060); };
UDX_KITS.jeweller = function (K) {
K.wall("displaycase", -2);
K.wall("displaycase", 0);
K.wall("displaycase", 2);
K.at("workbench", 0, K.D * 0.55);
K.at("weighscale", 0.6, K.D * 0.55, K.ryIn, { y: 0.95, solid: false });
K.left("treasurechest", K.D * 0.5);
K.right("gemheap", K.D * 0.5, { s: 0.7 });
K.glow(0, K.D * 0.5, K.h - 1, 0xFFE8B0);
};
UDX_KITS.scribe = function (K) { K.wall("printpress", 0); K.left("esbookcase", K.D * 0.35); K.left("esbookcase", K.D * 0.7); K.right("desk", K.D * 0.35); K.right("desk", K.D * 0.7); K.at("lectern", 0, K.D * 0.6); K.at("chair", K.W / 2 - 1.4, K.D * 0.35, K.ryL); K.glow(0, K.D * 0.5, K.h - 1); };
UDX_KITS.bakery = function (K) { K.wall("oven", -1.6); K.wall("oven", 1.6); K.left("counter", K.D * 0.4); K.left("trbreadrack", K.D * 0.75); K.right("shelfgoods", K.D * 0.4); K.right("barrel", K.D * 0.75); K.at("trbenchtable", 0, K.D * 0.55); K.glow(0, 1.2, 2.2, 0xFFB060); };
UDX_KITS.toyshop = function (K) { K.wall("shelfgoods", -1.6); K.wall("shelfgoods", 1.6); K.at("toys", -1.2, K.D * 0.55); K.at("toys", 1.2, K.D * 0.55); K.at("workbench", 0, K.D * 0.3); K.left("crates", K.D * 0.6); K.right("displaycase", K.D * 0.6); K.rug("rug", 0, K.D * 0.6); K.glow(0, K.D * 0.5, K.h - 1, 0xFFD8F0); };
UDX_KITS.lamps = function (K) { return __ZC(328, 65, this, arguments, new.target); };
UDX_KITS.boots = function (K) { K.wall("shelfgoods", -1.4); K.wall("shelfgoods", 1.4); K.at("trcuttable", 0, K.D * 0.5); K.left("workbench", K.D * 0.45); K.right("pelt", K.D * 0.45, { solid: false }); K.at("chair", -K.W / 2 + 2.2, K.D * 0.45, K.ryR); K.glow(0, K.D * 0.5, K.h - 1, 0xFFC890); };
UDX_KITS.garden = function (K) { return __ZC(328, 66, this, arguments, new.target); };
UDX_KITS.chartroom = function (K) { return __ZC(328, 67, this, arguments, new.target); };
UDX_KITS.webhall = function (K) { return __ZC(328, 68, this, arguments, new.target); };
UDX_KITS.heart = function (K) {
var p = K.pt(0, K.D * 0.5);
udsHeartCrystal(K.A, p[0], K.y, p[1], 1.1, 0xE070E0);
K.runL("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.runR("benchin", Math.max(1, Math.floor((K.D - 2) / 2.6)));
K.wall("lectern", 0);
K.at("crystalcluster", -K.W / 2 + 1.6, 1.6);
K.at("crystalcluster", K.W / 2 - 1.6, 1.6);
};
UDX_KITS.trading = function (K) {
UDX_KITS.exchange(K);
var cols = Math.max(1, Math.floor((K.W - 4) / 3.4));
for (var c = 0; c < cols; c++) {
var a = (c - (cols - 1) / 2) * 3.4;
K.at("displaycase", a, K.D * 0.82);
}
K.at("goldcolumn", -K.W / 2 + 1.6, K.D - 1.6);
K.at("goldcolumn", K.W / 2 - 1.6, K.D - 1.6);
K.ceil("ironchandelier", 0, K.D * 0.5);
};
UDX_KITS.lizards = function (K) { UDX_KITS.stable(K); var p = K.pt(0, K.D * 0.5); udsLizard(K.A.g, p[0], K.y, p[1], K.ryIn, 1.3, udxMat(0x3A5A3A, "stone"), 0x6AD86A); udxSolidR(K.A, p[0], p[1], 1.8); };
UDX_KITS.greatcourt = function (K) { UDX_KITS.court(K); K.at("brazier", -K.W / 2 + 1.4, 1.6); K.at("brazier", K.W / 2 - 1.4, 1.6); K.ceil("ironchandelier", 0, K.D * 0.5); };
function udsChartTex() { return __ZC(328, 69, this, arguments, new.target); }
function udsWeb(G, x, y, z, r, col) { return __ZC(328, 70, this, arguments, new.target); }
function udsHeartCrystal(A, x, y, z, s, col) { return __ZC(328, 71, this, arguments, new.target); }
function udsLizard(G, x, y, z, ry, s, mat, eye) { return __ZC(328, 72, this, arguments, new.target); }
function udsBlade(G, x, y, z, ry, h, mat, gold) { return __ZC(328, 73, this, arguments, new.target); }
var UDS_LOOK = {
spire: { wall: 0x4A4262, wk: "marble", floor: 0x2E2A3E, ceil: 0x3A3452, trim: 0xE8C870 },
vaelith: { wall: 0x5A5072, wk: "marble", floor: 0x2E2840, ceil: 0x3E3456, trim: 0xC8C0E8 },
ostrael: { wall: 0x34466A, wk: "plaster", floor: 0x262C40, ceil: 0x2E3A58, trim: 0x9AB8F0 },
myrrhen: { wall: 0x523458, wk: "stone", floor: 0x2A1E30, ceil: 0x3A2442, trim: 0xE070E0 },
zelvane: { wall: 0x48343A, wk: "stone", floor: 0x2E2224, fk: "paving", ceil: 0x34262A, trim: 0xB83A4A },
ithrael: { wall: 0x2E5250, wk: "plaster", floor: 0x203032, ceil: 0x2A4442, trim: 0xD8E8E8 },
korvaen: { wall: 0x5A4830, wk: "plaster", floor: 0x3E2E20, ceil: 0x4A3A28, trim: 0xE8B85A },
sablethorn: { wall: 0x34462E, wk: "stone", floor: 0x2E2C20, fk: "wood", ceil: 0x2C3A28, trim: 0x7AB85A }
};
function udsTheme(key, col) {
var t = UDS_LOOK[key];
return udxLazyTh({ wall: function () { return udxMat(t.wall, t.wk || "stone"); }, floor: function () { return udxMat(t.floor, t.fk || "marble"); }, hallFloor: function () { return udxMat(t.floor, "marble"); }, ceil: function () { return udxMat(t.ceil, "plaster"); }, trim: function () { return udxMat(t.trim, "metal"); },
stair: function () { return udxMat(t.floor, "stone"); }, glow: col, signBg: "#140E1C", signFg: udsHex(col) });
}
function udsBuilding(o) {
var floors = o.floors.map(function (f, i) { f.key = o.key + "_" + (i + 1); f.name = f.name || o.name; f.th = f.th || o.th; f.sig = f.sig || o.sig; f.col = f.col || o.col; return udsRound(f); });
var list = floors.map(function (A, i) { var f = o.floors[i]; return [f.label || ("Floor " + (i + 1)), f.sub || "", A.key, A.inAt[0] + 1.2, A.inAt[1] - 2.4, -Math.PI / 2]; });
o.floors.forEach(function (f, i) { f.stairs = floors.length > 1 ? list.filter(function (q, j) { return j !== i; }) : null; if (i === 0)
f.out = o.out; f.stairName = o.stairName; });
return floors;
}
function udsIn(r, u, v) { var w = r.wing || r.wingRef; if (!w)
return [r.c.x, r.c.z]; var lz = (r.Lc || 0) + (v === undefined ? (r.d || 8) / 2 : v); return w.W(u || 0, lz); }
function udsFaceDoor(r) { return r.c ? r.c.ry : 0; }
var UDS_CENTRE = {
spire: function (A, F, th, col) { return __ZC(328, 74, this, arguments, new.target); },
vaelith: function (A, F, th, col) { return __ZC(328, 75, this, arguments, new.target); },
ostrael: function (A, F, th, col) { return __ZC(328, 76, this, arguments, new.target); },
myrrhen: function (A, F, th, col) {
udsHeartCrystal(A, F.ox, F.y, F.oz, 1.2, 0xE070E0);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2 + 0.5;
udxF(A, "crystalcluster", F.ox + Math.cos(a) * 5.6, F.y, F.oz + Math.sin(a) * 5.6, a, { s: 1.1 });
}
},
zelvane: function (A, F, th, col) { return __ZC(328, 77, this, arguments, new.target); },
ithrael: function (A, F, th, col) { return __ZC(328, 78, this, arguments, new.target); },
korvaen: function (A, F, th, col) { return __ZC(328, 79, this, arguments, new.target); },
sablethorn: function (A, F, th, col) { return __ZC(328, 80, this, arguments, new.target); }
};
(function () {
var col = 0xB890FF, th = udsTheme("spire", col), W = "The Council of Matrons";
udsBuilding({ key: "spire", name: "The Matron Spire", sig: "spire", col: col, th: th, stairName: "The great stair of the Spire", out: { dyn: true, x: 140, z: -860, yaw: 0 },
floors: [
{ label: "The Court of the Matrons", sub: "the Council Chamber, records, the shrine", R: 24, H: 20, rotName: "the Court of the Matrons", wayName: "the Way of the Seven", wayW: 6, wayH: 9, centre: UDS_CENTRE.spire,
rooms: [{ n: "The Petitioners' Hall", t: "seat", w: 12, d: 11, h: 6 }, { n: "Clerks of the Council", t: "office", w: 9, d: 9, lock: W }, { n: "The Spire Guard", t: "guard", w: 9, d: 9, lock: W, lockName: "Spire Guard" },
{ n: "The Hall of Records", t: "library", w: 13, d: 12, h: 6.5 }, { n: "The Shrine of the Still Flame", t: "shrine", w: 11, d: 13, h: 7 }, { n: "The Robing Room", t: "robing", w: 8, d: 8 },
{ n: "The Waiting Room", t: "sitting", w: 9, d: 9 }, { n: "The Hall of Petitions", t: "court", w: 12, d: 12, h: 6 }],
grand: { n: "The Council Chamber", t: "council", w: 20, d: 22, h: 12 },
after: function (A, F) {
var r = F.rooms, G = F.grand;
var p = F.rot(Math.PI * 0.86, F.R - 6);
udxWho(A, "spire_clerk", { sex: "m", look: UD_ELF(0x2A2A5A, 0, 4), must: 1 }, p[0], p[1], F.face(p[0], p[1]), udxPersona("Thessan, chief clerk of the Council", "the chief clerk of the Council of Matrons, who keeps the petitions and the Council's diary in the Matron Spire. Fussy, kind, overworked; you know every Matron's habits and every House's quarrels and will explain how the Council works: seven Matrons of the seven Great Houses, the eldest presiding, decisions by agreement, and the House of the law (Vaelith) keeping the record. The Spire is round inside like the stone it lives in: the Court of the Matrons, with its Council Ring of seven thrones, is the floor you stand on; the great stair climbs to the Gallery, the guest floor and the Crown.", "Petition, appointment, or simply lost? All three are common. The Council sits at the end of the Way of the Seven."));
var g1 = udsIn(G, -2.4, G.d - 4), g2 = udsIn(G, 2.4, G.d - 4);
udxWho(A, "spire_m2", { sex: "f", look: UD_ELF(0x6A2A3A, 1, 2), must: 1 }, g1[0], g1[1], udsFaceDoor(G), udxPersona("Matron Zhessa of House Zelvane", "the Matron of House Zelvane (the blades of the Spire Guard), sitting today in the Council Chamber of the Matron Spire. Direct, warm under a stern manner, fond of plain speaking. You explain that the Council of Matrons rules Zhaelvorn by agreement of the seven Houses, and that no House may draw a blade on another inside the city.", "The Council is between sessions. Sit, if you like; the chairs are older than your grandparents' grandparents."));
udxWho(A, "spire_m3", { sex: "f", look: UD_ELF(0x2A4A6A, 1, 3), must: 1 }, g2[0], g2[1], udsFaceDoor(G), udxPersona("Matron Ithwyn of House Ithrael", "the Matron of House Ithrael, the mapmakers and scholars, at the Council table in the Matron Spire. Curious, precise, a little absent; you love any question about where a tunnel goes, and you tell visitors about the Thanes' Road south past Cinderwell to the dwarves of Stonehallow.", "You have the look of someone who has walked far. Where did you come in? I am collecting routes."));
var q = F.rot(Math.PI * 0.3, F.R - 9);
udxWho(A, "spire_g1", { sex: "f", look: { top: 0x2A2238, topKind: "shirt", bottom: 0x1A1A22, skin: 0x3E3A52, hair: 0xEDEAF4, hairStyle: "long", hat: "none", layer: "armor", layerColor: 0x2A2438 } }, q[0], q[1], F.face(q[0], q[1]), null, { r: 6, sp: 0.7 });
var rr = udsIn(r[3], 0, r[3].d * 0.6);
udxWho(A, "spire_lib", { sex: "m", look: UD_ELF(0x3A2A4A, 0, 1), must: 1 }, rr[0], rr[1], udsFaceDoor(r[3]), udxPersona("Sorrith, keeper of the Hall of Records", "the keeper of the Hall of Records in the Matron Spire, who also teaches 'Lore of the Deep' at the Duskwell Academy. Gentle, bookish, delighted by questions; you know how caves form, how stalactites and stalagmites meet to make columns like the ones Zhaelvorn's Houses live in, and the story of Old Ylmarr.", "Every decision the Council has made in nine hundred years is on these shelves. Most of them are about bridges."));
} },
{ label: "The Matrons' Gallery", sub: "the banquet hall, the ballroom, the treasury", R: 22, H: 16, rotName: "the Matrons' Gallery", wayName: "the Gallery of Lanterns",
centre: function (A, F, th, col) { udsHeartCrystal(A, F.ox, F.y, F.oz, 0.9, 0xB890FF); },
rooms: [{ n: "The Long Gallery of Matrons", t: "gallery", w: 12, d: 12, h: 6 }, { n: "The Banquet Hall", t: "dining", w: 12, d: 14, h: 6.5 }, { n: "The Kitchens", t: "kitchen", w: 10, d: 10 },
{ n: "The Music Room", t: "music", w: 10, d: 10 }, { n: "The Library of the Houses", t: "library", w: 12, d: 11, h: 6 }, { n: "The Treasury of the Council", t: "vault", w: 9, d: 9, lock: W, lockName: "Council Treasury" },
{ n: "The Map Room of the Deep", t: "maps", w: 9, d: 9 }, { n: "The Lantern Room", t: "lamps", w: 9, d: 9 }],
grand: { n: "The Ballroom of Lanterns", t: "ballroom", w: 22, d: 22, h: 11 },
after: function (A, F) {
var r = F.rooms, k = udsIn(r[2], 0, r[2].d * 0.5);
udxWho(A, "spire_cook", { sex: "m", look: UD_ELF(0xE8E0D8, 0, 5), must: 1 }, k[0], k[1], udsFaceDoor(r[2]), udxPersona("Bryndel, master of the Spire kitchens", "the master cook of the Matron Spire's kitchens, cheerful and loud, cooking for the Council's banquets: roast cave-lizard is out of fashion, glowcap pies and blind-fish in silk-leaf are in. You love to talk food.", "Mind the pans! Hungry? Everyone in the Spire is always hungry. It's the stairs."));
var b = udsIn(F.grand, 0, F.grand.d * 0.5);
udxWho(A, "spire_dancer", { sex: "f", look: UD_ELF(0x5A2A6A, 1, 6) }, b[0], b[1], 0, null, { r: 6, sp: 0.8 });
var m = udsIn(r[3], 0, r[3].d * 0.6);
udxWho(A, "spire_harp", { sex: "f", look: UD_ELF(0x2A3A6A, 1, 4), must: 1 }, m[0], m[1], udsFaceDoor(r[3]), udxPersona("Liriel, harpist of the Spire", "the harpist who plays in the Music Room and the Ballroom of Lanterns in the Matron Spire. Dreamy, funny, always humming; you can explain how a harp makes notes (shorter, tighter strings sound higher) and why music sounds so rich in a stone hall (echoes).", "Listen to the room when I play: the stone sings back. That is the whole secret of the Spire."));
} },
{ label: "The Guest Floor", sub: "suites for embassies from Stonehallow, Glimmerdeep and the Sea", R: 20, H: 12, rotName: "the Hall of Embassies", wayName: "the Ambassadors' Walk",
centre: function (A, F, th, col) {
var p = [F.ox, F.oz];
udxCyl(3, 3.2, 0.9, udxMat(0x8A9AA8, "metal"), p[0], F.y + 0.45, p[1], A.g, 40);
var top = new THREE.Mesh(new THREE.CircleGeometry(2.9, 48), new THREE.MeshBasicMaterial({ map: udsChartTex() }));
top.rotation.x = -Math.PI / 2;
top.position.set(p[0], F.y + 0.92, p[1]);
A.g.add(top);
udxSolidR(A, p[0], p[1], 3.2);
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + 0.4; udxF(A, "sg_kf_loungesofa_plum", p[0] + Math.cos(a) * 6, F.y, p[1] + Math.sin(a) * 6, Math.atan2(-Math.cos(a), -Math.sin(a))); });
},
rooms: [{ n: "The Stonehallow suite", t: "grandbed", w: 11, d: 10 }, { n: "The Glimmerdeep suite", t: "bedroom", w: 9, d: 9 }, { n: "The Sunless Sea suite", t: "bedroom", w: 9, d: 9 },
{ n: "The surface-guests' suite", t: "bedroom", w: 9, d: 9 }, { n: "The guests' sitting room", t: "sitting", w: 10, d: 10 }, { n: "The guests' bath", t: "bath", w: 8, d: 8 }, { n: "The envoys' study", t: "study", w: 9, d: 9 }],
grand: { n: "The Hall of Embassies", t: "seat", w: 18, d: 18, h: 9 },
after: function (A, F) {
var g = udsIn(F.grand, 0, F.grand.d - 4);
udxWho(A, "spire_envoy", { sex: "m", look: udxLookDwarf(0x6A3A2A, 2), must: 1, y: 0 }, g[0], g[1], udsFaceDoor(F.grand), udxPersona("Envoy Dagna Coalbright of Stonehallow", "the dwarven envoy of Stonehallow to the Council of Matrons, lodging on the Spire's guest floor. Hearty, blunt, fond of elven pastries she claims to dislike; you explain the friendship between Zhaelvorn and the Dwarven Deep, the trade of silk for deepsilver, and the Thanes' Road between.", "The elves build up, we build down, and we meet in the middle to argue about the price of silk. Splendid arrangement."));
} },
{ label: "The Crown of the Spire", sub: "Matron Ilvaryn's apartments, the Hall of the First Matron", R: 18, H: 12, rotName: "the Crown of the Spire", wayName: "the Seers' Walk",
centre: function (A, F, th, col) { var x = F.ox, z = F.oz, y = F.y; udxCyl(2.6, 2.9, 0.6, udxMat(0x3A3450, "marble"), x, y + 0.3, z, A.g, 32); udxF(A, "goldstatue", x, y + 0.6, z, Math.PI / 2, { s: 1.2 }); udxF(A, "candles", x + 2, y, z + 1.2, 0, { solid: false }); udxF(A, "candles", x - 2, y, z - 1.2, 0, { solid: false }); udxGlow(A.g, 0xFFD8A0, 4, 0.45, x, y + 3, z); udxSolidR(A, x, z, 2.9); },
rooms: [{ n: "Matron Ilvaryn's apartments", t: "grandbed", w: 12, d: 11, h: 5.5, lock: W, lockName: "The Matron's apartments" }, { n: "The Dressing Room", t: "robing", w: 8, d: 8 }, { n: "The Matron's study", t: "study", w: 9, d: 9 },
{ n: "The Matron's bath", t: "bath", w: 8, d: 8 }, { n: "The Seers' Room", t: "scrying", w: 9, d: 9, lock: W, lockName: "Seers' Room" }, { n: "The Archive Vault", t: "vault", w: 8, d: 8, lock: W, lockName: "Archive Vault" },
{ n: "The Crown sitting room", t: "sitting", w: 10, d: 10 }],
grand: { n: "The Hall of the First Matron", t: "throne", w: 18, d: 22, h: 10 },
after: function (A, F) {
var g = udsIn(F.grand, 0, F.grand.d - 6);
udxWho(A, "spire_seer", { sex: "f", look: UD_ELF(0x1A1A3A, 1, 7), must: 1 }, g[0], g[1], udsFaceDoor(F.grand), udxPersona("Lady Nimrae, the Seer of the Spire", "the Seer who keeps the Hall of the First Matron at the crown of the Matron Spire. Calm, kind, speaks slowly. You tell the story of the First Matron, who led the Houses out of Old Ylmarr across the Riven Deep and chose this cavern for the new city because the faerglow was brightest here.", "Few climb this far. The First Matron's hall is open to anyone who comes up quietly. Shall I tell you why the city stands where it does?"));
var s = udsIn(F.rooms[2], 0, F.rooms[2].d * 0.55);
udxWho(A, "spire_ilv", { sex: "f", look: UD_ELF(0x4A2A6A, 1, 1), must: 1 }, s[0], s[1], udsFaceDoor(F.rooms[2]), udxPersona("Matron Ilvaryn of House Vaelith, eldest of the Council", "the eldest Matron of Zhaelvorn, of House Vaelith, who presides over the Council of Matrons; at work in her study at the crown of the Matron Spire. Dignified, warm, a little mischievous; you have seen nine hundred years of the city and love to hear what the surface is like now.", "Come in, come in. At my age every visitor is a window. Tell me something about the sky."));
} }
] });
})();
var UDS_TRADE = {
vaelith: ["The Halls of Law", "the Court of Judgement, the advocates' chambers, the Library of Laws",
[{ n: "The Court of Judgement", t: "court", w: 12, d: 12, h: 6 }, { n: "The Chambers of the Advocates", t: "office", w: 9, d: 9 }, { n: "The Library of Laws", t: "library", w: 11, d: 11, h: 6 }, { n: "The Hall of Witnesses", t: "seat", w: 10, d: 10 },
{ n: "The Archive of Verdicts", t: "vault", w: 9, d: 9, lock: "House Vaelith", lockName: "Archive of Verdicts" }, { n: "The Judges' Robing Room", t: "robing", w: 8, d: 8 }, { n: "The Scribes' Hall", t: "scribe", w: 9, d: 9 }],
{ n: "The Great Court of the Stone", t: "greatcourt", w: 18, d: 20, h: 9 }, ["Advocate Selvhra", "an advocate of House Vaelith who argues cases in the Court of Judgement. Brisk, fair, a lover of a good argument; you explain how a fair hearing works: both sides speak, evidence is shown, a judge decides by the law and writes the reasons down.", "Whatever the quarrel, the Stone hears both sides. That is the first law of House Vaelith."]],
ostrael: ["The Silk Floor", "the Silk Loft, the spinning hall, the dye works, the bridgewrights",
[{ n: "The Silk Loft", t: "loom", w: 11, d: 11 }, { n: "The Spinning Hall", t: "loom", w: 11, d: 10 }, { n: "The Dye Works", t: "dye", w: 10, d: 10 }, { n: "The Spool Store", t: "store", w: 9, d: 9, lock: "House Ostrael", lockName: "Spool Store" },
{ n: "The Bridgewrights' Drawing Office", t: "maps", w: 10, d: 9 }, { n: "The Tailors' Room", t: "tailor", w: 9, d: 9 }, { n: "The Spider Nursery", t: "garden", w: 10, d: 10 }],
{ n: "The Web Hall", t: "webhall", w: 18, d: 18, h: 9 }, ["Weavemistress Quorra", "the weavemistress of House Ostrael, who runs the Silk Loft and trains the bridgewrights. Patient, proud, quick-fingered; you explain that spider silk is stronger, weight for weight, than steel, and how a web bridge is spun: a first line floated across, then stronger lines pulled over it.", "Every bridge in the city began as one thread. Shall I show you how to spin a second?"]],
myrrhen: ["The Faerglow Floor", "the Faerglow Laboratory, the crystal garden, the scrying room",
[{ n: "The Faerglow Laboratory", t: "lab", w: 11, d: 10 }, { n: "The Crystal Garden", t: "crystal", w: 12, d: 11, h: 6 }, { n: "The Scrying Room", t: "scrying", w: 9, d: 9 }, { n: "The Library of the Deep Arts", t: "library", w: 11, d: 10, h: 6 },
{ n: "The Practice Circle", t: "ritual", w: 11, d: 11, h: 6 }, { n: "The Alchemy Store", t: "store", w: 8, d: 8, lock: "House Myrrhen", lockName: "Alchemy Store" }, { n: "The Lantern Workshop", t: "lamps", w: 9, d: 9 }],
{ n: "The Chamber of the Heart Crystal", t: "heart", w: 18, d: 18, h: 10 }, ["Mage Elvaria of House Myrrhen", "a mage of House Myrrhen who studies the faerglow in the Faerglow Laboratory. Bright, enthusiastic, a little scatterbrained; your 'deep arts' are real science: fluorescence, phosphorescence and bioluminescence, why crystals grow in shapes, and how light bends in a prism.", "Close the door, quick, before the light gets out! Only joking. Light never waits for doors."]],
zelvane: ["The Blade Floor", "the Blade Hall, the armoury, the Hall of Champions",
[{ n: "The Blade Hall", t: "sparring", w: 12, d: 12, h: 6 }, { n: "The Armoury", t: "armoury", w: 10, d: 10, lock: "House Zelvane", lockName: "Armoury" }, { n: "The Duelling Gallery", t: "sparring", w: 11, d: 11 },
{ n: "The Hall of Champions", t: "trophy", w: 11, d: 11, h: 6 }, { n: "The Barracks of the Spire Guard", t: "barracks", w: 10, d: 11 }, { n: "The Armourer's Forge", t: "forge", w: 10, d: 10 }, { n: "The Captains' Room", t: "maps", w: 9, d: 9 }],
{ n: "The Great Training Hall", t: "sparring", w: 20, d: 20, h: 9 }, ["Blademaster Kaedris", "the blademaster of House Zelvane, who trains the Spire Guard. Calm, courteous, never raises their voice; you teach that the first skill of a guard is balance and the second is knowing when not to fight, and you love to talk about footwork.", "Feet first. Always feet first. A blade is only as steady as the stone under you."]],
ithrael: ["The Chart Floor", "the Chart Room, the survey office, the engravers",
[{ n: "The Chart Room", t: "maps", w: 11, d: 10 }, { n: "The Survey Office", t: "office", w: 9, d: 9 }, { n: "The Instrument Room", t: "instruments", w: 10, d: 10 }, { n: "The Library of Routes", t: "library", w: 11, d: 11, h: 6 },
{ n: "The Engravers' Workshop", t: "engrave", w: 10, d: 9 }, { n: "The Archive of Plates", t: "vault", w: 9, d: 9, lock: "House Ithrael", lockName: "Archive of Plates" }, { n: "The Students' Room", t: "classroom", w: 10, d: 10 }],
{ n: "The Hall of the Great Chart", t: "chartroom", w: 18, d: 20, h: 9 }, ["Surveyor Thalen", "a surveyor of House Ithrael who maps the tunnels and cuts the maps into silver plates. Precise, cheerful, always measuring something; you explain how a map is made: measure a line, measure angles from it (triangulation), and draw to scale, and how a compass works (the Earth is a magnet).", "Hold still. No, not you: the plate. Ah, a visitor! Do you know how far you have walked today? I do."]],
korvaen: ["The Exchange Floor", "the Counting House, the exchange, the strongroom",
[{ n: "The Counting House", t: "counting", w: 11, d: 10 }, { n: "The Exchange", t: "exchange", w: 12, d: 11, h: 6 }, { n: "The Strongroom", t: "vault", w: 9, d: 9, lock: "House Korvaen", lockName: "Strongroom" }, { n: "The Warehouse", t: "store", w: 11, d: 11 },
{ n: "The Merchants' Lounge", t: "sitting", w: 10, d: 10 }, { n: "The Weighing Room", t: "jeweller", w: 9, d: 9 }, { n: "The Caravan Office", t: "maps", w: 9, d: 9 }],
{ n: "The Trading Hall", t: "trading", w: 20, d: 20, h: 9 }, ["Factor Vennix of House Korvaen", "the chief factor of House Korvaen's exchange, who trades with Glimmerdeep, the Sunless Sea and Stonehallow. Charming, sharp, honest to a fault ('fair weight, long friendship'); you explain how a fair price is found, why scales must be checked, and what interest is.", "Fair weight, long friendship. Everything else is details, and details are where I make my living."]],
sablethorn: ["The Riders' Floor", "the lizard stables, the saddlery, the scouts' hall",
[{ n: "The Lizard Stables", t: "stable", w: 12, d: 12, h: 6 }, { n: "The Saddlery", t: "saddlery", w: 10, d: 9 }, { n: "The Scouts' Hall", t: "barracks", w: 10, d: 11 }, { n: "The Trophy Room", t: "trophy", w: 10, d: 10 },
{ n: "The Map Room", t: "maps", w: 9, d: 9 }, { n: "The Feed Store", t: "store", w: 9, d: 9, lock: "House Sablethorn", lockName: "Feed Store" }, { n: "The Hatchery", t: "garden", w: 10, d: 10 }],
{ n: "The Great Lizard Pen", t: "lizards", w: 20, d: 20, h: 9 }, ["Ridemistress Zyreth", "the ridemistress of House Sablethorn, who trains the scouts to ride the great cave lizards up walls. Bold, sunny, fond of terrible jokes; you explain how real geckos climb walls (millions of tiny hairs on their toes that cling by a weak force between molecules).", "Lizards don't fall off walls. Riders do. That's what the first lesson is for."]]
};
UDC_HOUSES.forEach(function (H) {
var th = udsTheme(H.key, H.col), W = H.name, sp = H.special, T = UDS_TRADE[H.key];
udsBuilding({ key: "h_" + H.key, name: H.name, sig: H.sig, col: H.col, th: th, stairName: "The House stair", out: { dyn: true, x: 0, z: 0, yaw: 0 },
floors: [
{ label: "The House halls", sub: "the audience hall, " + sp.n.replace(/^The /, "the "), R: 18, H: 16, rotName: "the great rotunda of " + H.name, wayName: "the Matron's Way", centre: UDS_CENTRE[H.key],
rooms: [{ n: "The House guard", t: "guard", w: 9, d: 9, lock: W, lockName: H.name + " guard" }, { n: "The Steward's office", t: "office", w: 9, d: 9, lock: W, lockName: H.name + " steward" },
{ n: sp.n, t: sp.t, w: 12, d: 11, h: 6 }, { n: "The dining hall", t: "dining", w: 12, d: 11, h: 6 }, { n: "The kitchen", t: "kitchen", w: 9, d: 9 },
{ n: "The House shrine", t: "shrine", w: 10, d: 11, h: 6 }, { n: "The store rooms", t: "store", w: 9, d: 9, lock: W, lockName: H.name + " stores" }, { n: "The House parlour", t: "sitting", w: 9, d: 9 }],
grand: { n: "The audience hall of " + H.matron, t: "seat", w: 16, d: 18, h: 9 },
after: function (A, F) {
var G = F.grand, g = udsIn(G, 0, G.d - 3.4);
udxWho(A, "hm_" + H.key, { sex: "f", look: UD_ELF(H.col & 0x3F3F3F | 0x101010, 1, H.a % 5), must: 1 }, g[0], g[1], udsFaceDoor(G), udxPersona(H.matron + " of " + H.name, "the Matron of " + H.name + " (" + H.trade + "), one of the seven Great Houses of Zhaelvorn, receiving visitors in her audience hall in the House's great column. The House motto is \"" + H.motto + "\". " + H.lore + " You are gracious, proud of your House's long history back to Old Ylmarr, and you speak of the other Houses with careful courtesy (the Council of Matrons keeps the peace between them). Your House is round inside, like the stone it lives in: a great rotunda with galleries above, three floors in all (the House halls, " + T[0] + ", the family floor).", "Welcome to " + H.name + ". \"" + H.motto + ".\" What brings you to our halls?"));
var p = F.rot(Math.PI * 0.84, F.R - 5.4);
udxWho(A, "hs_" + H.key, { sex: "m", look: UD_ELF(0x2A2A3A, 0, H.a % 7), must: 1 }, p[0], p[1], F.face(p[0], p[1]), udxPersona("the steward of " + H.name, "the steward who runs the household of " + H.name + ": its stores, kitchen, guards and accounts. Practical, dry, friendly. You explain that the House hires (see the 📋 Hiring here board), that staff badges open the doors marked for the House's own, and that the great stair climbs to " + T[0] + " and the family floor.", "Looking for someone? I'm the one who knows where everyone is."));
var q = F.rot(0.4, F.R - 6);
udxWho(A, "hc_" + H.key, { sex: "f", look: UD_ELF(0xE8E0D8, 1, H.a % 3) }, q[0], q[1], 0, null, { r: 4, sp: 0.6 });
} },
{ label: T[0], sub: T[1], R: 18, H: 13, rotName: T[0].replace(/^The /, "the ") + " of " + H.name, wayName: "the Way of " + H.name.replace(/^House /, ""),
centre: function (A, F, th, col) { UDS_TRADE_CENTRE(A, F, th, col, H); },
rooms: T[2].map(function (r) { return Object.assign({}, r); }), grand: Object.assign({}, T[3]),
after: function (A, F) {
var G = F.grand, g = udsIn(G, 0, G.d * 0.5 + 1.5);
udxWho(A, "ht_" + H.key, { sex: H.a % 2 ? "m" : "f", look: UD_ELF(H.col & 0x3F3F3F | 0x101010, H.a % 2 ? 0 : 1, (H.a + 2) % 5), must: 1 }, g[0], g[1], udsFaceDoor(G), udxPersona(T[4][0], T[4][1], T[4][2]));
for (var s = 0; s < (UDX.lite ? 1 : 3); s++) {
var r = F.rooms[s * 2], q = udsIn(r, 0, r.d * 0.55);
udxWho(A, "hw_" + H.key + s, { sex: s % 2 ? "m" : "f", look: UD_ELF([0x3A2A5A, 0x2A3A5A, 0x4A2A4A][s % 3], s % 2 ? 0 : 1, s + H.a % 3) }, q[0], q[1], udsFaceDoor(r), null, { r: 2.5, sp: 0.5 });
}
} },
{ label: "The family floor", sub: "the Matron's chambers, the gallery of Old Ylmarr", R: 16, H: 11, rotName: "the family floor of " + H.name, wayName: "the Hall of Old Ylmarr",
centre: function (A, F, th, col) {
var x = F.ox, z = F.oz, y = F.y;
udxCyl(2.4, 2.6, 0.5, udxMat(0x3A3450, "marble"), x, y + 0.25, z, A.g, 32);
udxF(A, "esbust", x, y + 0.5, z, Math.PI / 2, { s: 1.3 });
udxF(A, "plant", x + 3.4, y, z + 2, 0);
udxF(A, "plant", x - 3.4, y, z - 2, 0);
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + Math.PI / 4; udxF(A, "sg_kf_loungesofa_" + (["plum", "navy", "crimson", "teal"][i]), x + Math.cos(a) * 6, y, z + Math.sin(a) * 6, Math.atan2(-Math.cos(a), -Math.sin(a))); });
udxSolidR(A, x, z, 2.6);
},
rooms: [{ n: H.matron + "'s chambers", t: "grandbed", w: 11, d: 10, h: 5, lock: W, lockName: "The Matron's chambers" }, { n: "The daughters' rooms", t: "bedroom", w: 9, d: 9 }, { n: "The sons' rooms", t: "bedroom", w: 9, d: 9 },
{ n: "The nursery", t: "nursery", w: 8, d: 8 }, { n: "The bath", t: "bath", w: 8, d: 8 }, { n: "The House library", t: "library", w: 10, d: 10, h: 5 }, { n: "The sitting room", t: "sitting", w: 9, d: 9 },
{ n: "The House treasury", t: "vault", w: 8, d: 8, lock: W, lockName: H.name + " treasury" }],
grand: { n: "The Gallery of Old Ylmarr", t: "gallery", w: 14, d: 18, h: 7 },
after: function (A, F) {
var G = F.grand, g = udsIn(G, 0, G.d * 0.5);
udxWho(A, "hk_" + H.key, { sex: H.a % 2 ? "m" : "f", look: UD_ELF(H.col & 0x3F3F3F | 0x101010, H.a % 2 ? 0 : 1, (H.a + 3) % 5) }, g[0], g[1], 0, null, { r: 5, sp: 0.9 });
var n = udsIn(F.rooms[3], 0, F.rooms[3].d * 0.5);
udxWho(A, "hn_" + H.key, { sex: "f", look: UD_ELF(0x5A4A6A, 1, H.a % 3), must: 1 }, n[0], n[1], udsFaceDoor(F.rooms[3]), udxPersona("the nursemaid of " + H.name, "the nursemaid who looks after the youngest children of " + H.name + " in the nursery on the family floor. Warm, funny, endlessly patient; you tell gentle stories of Old Ylmarr and the glowing cave-moths, and you are delighted by visitors who are kind to children.", "Shh, the little ones are napping. Mostly. Would you like to hear about the moths of Old Ylmarr?"));
} }
] });
});
function UDS_TRADE_CENTRE(A, F, th, col, H) { return __ZC(328, 81, this, arguments, new.target); }
var UDS_LESSER = [
["Duvarrin", "lampwrights, who make the city's glow-lamps", "lamps", "The Lamp Workshop", 0xC8A8FF],
["Selqueth", "perfumers of nightbloom and glowcap", "lab", "The Perfumery", 0xE070E0],
["Orvaine", "glassblowers of crystal-glass", "glass", "The Glass Workshop", 0x8FD8F0],
["Thaelis", "musicians and makers of harps", "music", "The Music Room", 0x9AB8FF],
["Mirrow", "healers and herb-wives", "infirmary", "The Healing Room", 0x8AF0C8],
["Quessa", "bakers of sweetcap bread", "bakery", "The Bakehouse", 0xF0C890],
["Velloran", "brewers of mushroom cordials", "brewery", "The Cordial Cellar", 0xD8B060],
["Ystrae", "potters of the black-glaze ware", "pottery", "The Pottery", 0xC89070],
["Nimbreth", "jewellers in deepsilver", "jeweller", "The Jewel Workshop", 0xE8E0FF],
["Caelvar", "scribes and printers", "scribe", "The Print Room", 0xD8D0C0],
["Ruskaen", "silk-dyers", "dye", "The Dye Room", 0x6A9AFF],
["Ilthorne", "bootmakers and leatherworkers", "boots", "The Boot Workshop", 0xC8946A],
["Varyndel", "growers of glowcaps", "garden", "The Glowcap Garden", 0x6AE8D8],
["Omraeth", "readers of the crystals", "scrying", "The Crystal Room", 0xB890FF],
["Pellisar", "toymakers", "toyshop", "The Toy Workshop", 0xFFB8D8],
["Zyrrah", "tutors of the city's children", "classroom", "The Schoolroom", 0xE8B85A]
];
UDS_LESSER.forEach(function (L, j) {
var col = L[4], th = udxLazyTh({ wall: function () { return udxMat(0x463E52, "plaster"); }, floor: function () { return udxMat(0x4A3E34, "wood"); }, hallFloor: function () { return udxMat(0x3E3446, "marble"); }, ceil: function () { return udxMat(0x3A3446, "plaster"); }, trim: function () { return udxMat(0x5A4A3A, "wood"); }, stair: function () { return udxMat(0x3A3440, "stone"); }, glow: col, signBg: "#1A1418", signFg: udsHex(col) });
var name = "House " + L[0];
udsBuilding({ key: "lh_" + j, name: name, th: th, col: col, stairName: "The silk lift", out: { dyn: true, x: 0, z: 0, yaw: 0, msg: "<b>Down the silk lift.</b> The basket settles on the floor of the cavern." },
floors: [{ label: name, R: 11, H: 9, rotName: "the hall of " + name, wayName: "the family passage", wayW: 3.4, wayH: 4.4, outName: "The silk lift down",
centre: function (A, F) { udxF(A, "rug", F.ox, F.y + 0.02, F.oz, 0, { solid: false, s: 1.6 }); udxF(A, "sg_qf_tableroundlarge_walnut", F.ox, F.y, F.oz, 0); [0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2; udxF(A, "chair", F.ox + Math.cos(a) * 1.5, F.y, F.oz + Math.sin(a) * 1.5, Math.atan2(-Math.cos(a), -Math.sin(a))); }); udxF(A, "chandelier", F.ox, F.y + F.H - 1.6, F.oz, 0, { solid: false }); udxGlow(A.g, col, 3, 0.45, F.ox, F.y + F.H - 2, F.oz); },
rooms: [{ n: L[3], t: L[2], w: 9, d: 9 }, { n: "The parlour", t: "sitting", w: 8, d: 8 }, { n: "The kitchen", t: "kitchen", w: 8, d: 8 }, { n: "The family bedroom", t: "bedroom", w: 8, d: 8 }, { n: "The children's room", t: "nursery", w: 7, d: 7 }, { n: "The bath", t: "bath", w: 7, d: 7 }],
grand: { n: "The family hall", t: "dining", w: 11, d: 11, h: 5.5 },
after: function (A, F) {
var r = F.rooms[0], p = udsIn(r, 0, r.d * 0.55);
udxWho(A, "lh_" + j, { sex: j % 2 ? "m" : "f", look: UD_ELF([0x3A2A5A, 0x2A3A5A, 0x4A2A4A, 0x2A4A3A][j % 4], j % 2 ? 0 : 1, j % 5), must: 1 }, p[0], p[1], udsFaceDoor(r), udxPersona((j % 2 ? "Master " : "Mistress ") + ["Ilvren", "Saphe", "Corrin", "Taeva", "Lunir", "Mesra", "Dovan", "Kaeli", "Orrin", "Vessaly", "Taurin", "Faelra", "Nimor", "Ysenne", "Pell", "Zhara"][j] + " of " + name, "the head of " + name + ", one of the lesser Houses of Zhaelvorn, whose home hangs high in a stalactite over the city, reached by a silk lift. Your family are " + L[1] + ", and you work at home in " + L[3].toLowerCase() + ". Friendly, proud of your craft, happy to explain how it is done (with real-world facts), and gently funny about how the Great Houses look down on the lesser ones (from a lot lower than you).", "Welcome up! Mind the basket as it swings. You're in " + name + " now: " + L[1] + ". Shall I show you the workshop?"));
var q = udsIn(F.grand, 0, F.grand.d * 0.5);
udxWho(A, "lhk_" + j, { sex: j % 2 ? "f" : "m", look: UD_ELF(0xE8E0D8, j % 2, j % 3) }, q[0], q[1], 0, null, { r: 3, sp: 0.6 });
} }] });
});
function udsClear(x, z, need) { return __ZC(328, 82, this, arguments, new.target); }
function udsCityMore(root) { return __ZC(328, 83, this, arguments, new.target); }
(function () {
var base = udCity;
udCity = function (G, R) {
var out = base.apply(this, arguments);
try {
if (UDC.g)
udsCityMore(UDC.g);
}
catch (e) {
if (window.console)
console.warn("[underdark-spires] city", e);
}
return out;
};
})();
var UDD = { gx: 380, zF: -1060, yG: -60, DX: -1400, DZ0: -1200, len: 300, W: 230, T: 460, clans: [
{ k: "ironbraid", n: "Clan Ironbraid", col: 0xC8A048, c: "smiths and the High Thane's own clan", chief: "High Thane Brannoc Ironbraid" },
{ k: "emberbeard", n: "Clan Emberbeard", col: 0xE0603A, c: "smelters who keep the Great Smeltery", chief: "Chief Hulda Emberbeard" },
{ k: "stoutvein", n: "Clan Stoutvein", col: 0x6A8AC8, c: "miners of the Deepdelve", chief: "Chief Marrek Stoutvein" },
{ k: "granitehand", n: "Clan Granitehand", col: 0x9A9A92, c: "masons who carved the Hundred Terraces", chief: "Chief Ysolde Granitehand" },
{ k: "deepmantle", n: "Clan Deepmantle", col: 0x5AA878, c: "keepers of lore, and brewers", chief: "Chief Dagny Deepmantle" }
] };
(function () { var z = -900; while (z > -1400) {
var dx = UDD.gx - UD.C.x, dz = z - UD.C.z;
if (Math.hypot(dx, dz) >= udCaveR(Math.atan2(dz, dx)))
break;
z -= 1;
} UDD.zF = z + 9; UD_FLAT.push([UDD.gx, UDD.zF + 6, 20, 40]); })();
UDD.Zn = UDD.DZ0 - UDD.len;
UDD.Yf = UDD.yG - 80;
UDD.seamZ = UDD.zF - 30;
UDD.ox = UDD.DX - UDD.gx;
UDD.oz = UDD.DZ0 - UDD.seamZ;
function uddTerraceK(lx) { return lx > -60 ? -1 : Math.min(9, Math.floor((-60 - lx) / 17)); }
var UDD_RAMPS = [60, 300, 120, 240, 180, 60, 300, 120, 240, 180];
function uddH(x, z) { return __ZC(328, 84, this, arguments, new.target); }
function uddRampAt(x, z) { var lx = x - UDD.DX, t = UDD.Zn - z; for (var kk = 0; kk < 10; kk++) {
var rx = -60 - 17 * kk, R0 = UDD_RAMPS[kk];
if (t > R0 && t < R0 + 7 && lx < rx + 8 && lx > rx - 8)
return true;
} return false; }
udxArea({ key: "thanesgate", name: "the Thanes' Road", kind: "gate", x0: UDD.gx - 7, x1: UDD.gx + 7, z0: UDD.seamZ - 14, z1: UDD.zF + 0.5, y0: UDD.yG - 6, y1: UDD.yG + 12,
height: function (x, z) { return Math.abs(x - UDD.gx) < 5.6 && z < UDD.zF + 0.5 && z > UDD.seamZ - 14 ? UDD.yG : null; },
build: uddGateBuild, near: function (x, z, A) { return !(A && A.kind === "inside") && Math.hypot(x - UDD.gx, z - UDD.zF) < 700; },
tick: function (dt, A) { var L = worldLocal(); if (L.z < UDD.seamZ)
uddSeam(UDD.ox, UDD.oz); } });
udxArea({ key: "deep", name: "Stonehallow", kind: "inside", x0: UDD.DX - UDD.W - 2, x1: UDD.DX + 362, z0: UDD.Zn - UDD.T, z1: UDD.DZ0 + 16, y0: UDD.Yf - 6, y1: UDD.yG + 14, env: UDX_ENV_DWARF,
height: uddH, build: uddDeepBuild,
blockFn: function (x, z, feet) { var h = uddH(x, z); if (h === null)
return true; if (feet !== undefined && Math.abs(h - feet) > 1.3 && !uddRampAt(x, z))
return true; return false; },
place: function (x, z) { return __ZC(328, 85, this, arguments, new.target); },
first: "<b>Stonehallow.</b> The Thanes' Road ends at a gate as tall as a cliff. Beyond it, the dwarves' own deep: a hall of pillars, terraces climbing the wall, the glow of the smeltery.",
tick: function (dt, A) { var L = worldLocal(); if (L.z > UDD.DZ0 + 4)
uddSeam(-UDD.ox, -UDD.oz); } });
function uddSeam(dx, dz) { var L = worldLocal(), B = udxAreaAt(L.x + dx, L.z + dz); if (B)
udxBuildArea(B); camera.position.x += dx; camera.position.z += dz; if (typeof walkResume !== "undefined")
walkResume = null; UDX.checkAt = 0; udxCull(true); }
function uddStatue(G, seed, x, y, z, ry, s, col) { return __ZC(328, 86, this, arguments, new.target); }
function uddTunnel(G, x, z0, z1, yA, yB, o) { return __ZC(328, 87, this, arguments, new.target); }
function uddGateBuild(A) { return __ZC(328, 88, this, arguments, new.target); }
function uddDeepBuild(A) { return __ZC(328, 89, this, arguments, new.target); }
function uddFolk(A, at) { return __ZC(328, 90, this, arguments, new.target); }
function udxThDwarf() { return udxLazyTh({ wall: function () { return udxMat(0x8A7A66, "stone"); }, floor: function () { return udxMat(0x7A6A58, "paving"); }, hallFloor: function () { return udxMat(0x8A7E6A, "marble"); }, ceil: function () { return udxMat(0x6A5E50, "stone"); }, trim: function () { return udxMat(0xB8902E, "metal"); }, glow: 0xFFB060, signBg: "#2A2018", signFg: "#E8C878" }); }
function udxThDwarfHome() { return udxLazyTh({ wall: function () { return udxMat(0x9A8A74, "stone"); }, floor: function () { return udxMat(0x6A5038, "wood"); }, hallFloor: function () { return udxMat(0x5A4430, "wood"); }, ceil: function () { return udxMat(0x7A6A58, "stone"); }, trim: function () { return udxMat(0x5A4030, "wood"); }, glow: 0xFFB060, signBg: "#2A2018", signFg: "#E8C878" }); }
var UDD_OUT = { dyn: true, area: "deep", x: 0, z: 0, yaw: 0 };
(function () {
var th = udxThDwarf(), W = "The Thanehold", out = Object.assign({}, UDD_OUT);
var clanRooms = UDD.clans.map(function (C) { return { n: "The hall of " + C.n, t: "seat", w: 10, d: 9, h: 6 }; });
udxBuilding({ key: "thane", name: "The Thanehold", stairName: "The Thane's stair", out: out, stairMat: function () { return udxMat(0x8A7E6A, "stone"); },
floors: [
{ name: "The Thanehold", label: "The halls of state", sub: "the Throne Hall, the Hall of the Five Clans, the feast hall", th: th, hallW: 6, hallH: 8, hallName: "the Long Hall of the Thanehold", env: UDX_ENV_DWARF,
foyer: { n: "the Gate Hall", w: 18, d: 22, h: 10, kit: "foyer" },
rooms: [{ n: "The Hall of the Five Clans", t: "council", w: 14, d: 12, h: 7 }].concat(clanRooms).concat([
{ n: "The Thane's Guard", t: "guard", w: 8, d: 8, lock: W, lockName: "Thane's Guard" }, { n: "The Treasury of Stonehallow", t: "vault", w: 9, d: 9, lock: W, lockName: "Treasury" },
{ n: "The feast hall", t: "dining", w: 16, d: 12, h: 7 }, { n: "The great kitchens", t: "kitchen", w: 10, d: 10 }, { n: "The brewery", t: "brewery", w: 10, d: 10 }
]),
end: { n: "The Throne Hall of the High Thane", t: "throne", w: 20, d: 26, h: 12 } },
{ name: "The Thanehold", label: "The Thane's floor", sub: "the Hall of Ancestors, the Forge-Shrine", th: th, hallW: 5, hallH: 6.5, hallName: "the Thane's floor", env: UDX_ENV_DWARF,
foyer: { n: "the upper Gate Hall", w: 14, d: 16, h: 8, kit: "foyer" },
rooms: [{ n: "The High Thane's chambers", t: "grandbed", w: 12, d: 10, h: 6, lock: W, lockName: "The Thane's chambers" }, { n: "The Thane's study", t: "study", w: 9, d: 9 },
{ n: "A guest chamber of the clans", t: "bedroom", w: 8, d: 8 }, { n: "A second guest chamber", t: "bedroom", w: 8, d: 8 }, { n: "The Hall of Ancestors", t: "ancestors", w: 14, d: 11, h: 6.5 },
{ n: "The map room of the deep roads", t: "maps", w: 9, d: 9 }, { n: "The Thane's armoury", t: "armoury", w: 9, d: 9, lock: W, lockName: "Armoury" }, { n: "The Thane's bath", t: "bath", w: 8, d: 8 },
{ n: "The Library of Runes", t: "library", w: 11, d: 10, h: 6 }],
end: { n: "The Forge-Shrine of the Clans", t: "forge", w: 14, d: 16, h: 9 } }
],
after: [function (A, F) {
var cx = F.ox + F.L + 16, cz = F.oz;
udxWho(A, "udd_thane", { sex: "m", look: udxLookDwarf(0x6A1A1A, 0), species: "dwarf", scale: 0.85, must: 1 }, cx - 3.2, cz, -Math.PI / 2, udxPersona("High Thane Brannoc Ironbraid", "the High Thane of Stonehallow, chief of Clan Ironbraid, who rules the dwarves of the Dwarven Deep with the council of the five clans (Ironbraid, Emberbeard, Stoutvein, Granitehand, Deepmantle) from the Throne Hall of the Thanehold. Big-hearted, booming laugh, fair, a little vain about his braids, and very proud of Stonehallow: the Hall of Anvils, the Hundred Terraces, the Deepdelve Mines, the Great Smeltery. You are friends with Matron Ilvaryn of Zhaelvorn, though you tease each other's cities.", "A visitor from the elves' cavern, or from further? Come, come into the light. Stonehallow welcomes those who come down the Thanes' Road as friends."));
udxWho(A, "udd_steward", { sex: "f", look: udxLookDwarf(0x3A3A5A, 3), species: "dwarf", scale: 0.82, must: 1 }, F.ox - 5, F.oz + 4, Math.PI / 2, udxPersona("Gorrina Deepmantle, steward of the Thanehold", "the steward who runs the Thanehold for the High Thane: its feasts, guards, treasury and visitors. Brisk, kind, keeps a list of everything. You explain the five clans and where each clan's hall is (along the Long Hall), and that the doors marked for the Thane's own are barred to all but those who serve the Thanehold.", "The Long Hall is ahead; the Throne Hall at its end. Each clan has its own hall off it. Mind the doors marked for staff."));
var hall5 = F.ox + 7;
[["Chief Hulda Emberbeard", 0x7A3A22, "f"], ["Chief Marrek Stoutvein", 0x3A4A6A, "m"], ["Chief Ysolde Granitehand", 0x5A5A52, "f"], ["Chief Dagny Deepmantle", 0x3A5A4A, "f"]].forEach(function (q, i) {
udxWho(A, "udd_chief" + i, { sex: q[2], look: udxLookDwarf(q[1], i + 1), species: "dwarf", scale: 0.82 }, hall5 - 2 + i * 1.4, F.oz - 10, 0, null);
});
}, function (A, F) {
udxWho(A, "udd_lore", { sex: "m", look: udxLookDwarf(0x3A5A4A, 4), species: "dwarf", scale: 0.82, must: 1 }, F.ox + 30, F.oz - 7, 0, udxPersona("Old Fennick Deepmantle, keeper of the Hall of Ancestors", "the old lore-keeper of Clan Deepmantle who keeps the Hall of Ancestors and the Library of Runes in the Thanehold. Gentle, slow, funny. You tell the story of how the five clans came to Stonehallow: the Granitehands carved, the Stoutveins dug, the Emberbeards smelted, the Ironbraids forged, and the Deepmantles remembered (and brewed).", "Sit, sit. Every face in this hall was a dwarf who did one good thing well. Shall I tell you about one of them?"));
}] });
var hth = udxThDwarfHome();
udxBuilding({ key: "dwarf_a", name: "A home on the Hundred Terraces", out: Object.assign({}, UDD_OUT), floors: [{ name: "A home on the Hundred Terraces", th: hth, hallW: 3, hallH: 3.6, hallName: "the passage", hallSign: false, env: UDX_ENV_DWARF,
foyer: { n: "the hearth room", w: 9, d: 9, h: 3.8, kit: "sitting" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 6, d: 6, h: 3.4 }, { n: "The bedroom", t: "bedroom", w: 6, d: 6, h: 3.4 }, { n: "The bathroom", t: "bath", w: 5, d: 5, h: 3.4 }, { n: "The pantry", t: "store", w: 5, d: 5, h: 3.4 }] }] });
udxBuilding({ key: "dwarf_b", name: "A family home on the Hundred Terraces", out: Object.assign({}, UDD_OUT), floors: [{ name: "A family home on the Hundred Terraces", th: hth, hallW: 3, hallH: 3.6, hallName: "the passage", hallSign: false, env: UDX_ENV_DWARF,
foyer: { n: "the hearth room", w: 10, d: 10, h: 3.8, kit: "sitting" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 7, d: 6, h: 3.4 }, { n: "The parents' room", t: "bedroom", w: 7, d: 6, h: 3.4 }, { n: "The children's room", t: "nursery", w: 6, d: 6, h: 3.4 },
{ n: "The bathroom", t: "bath", w: 5, d: 5, h: 3.4 }, { n: "The workshop", t: "forge", w: 8, d: 7, h: 3.8 }], end: { n: "The dining room", t: "dining", w: 8, d: 8, h: 3.6 } }] });
udxBuilding({ key: "dwarf_c", name: "A mason's home on the Hundred Terraces", out: Object.assign({}, UDD_OUT), floors: [{ name: "A mason's home on the Hundred Terraces", th: hth, hallW: 3, hallH: 3.6, hallName: "the passage", hallSign: false, env: UDX_ENV_DWARF,
foyer: { n: "the hearth room", w: 9, d: 10, h: 3.8, kit: "sitting" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 7, d: 6, h: 3.4 }, { n: "The bedroom", t: "bedroom", w: 6, d: 6, h: 3.4 }, { n: "The second bedroom", t: "bedroom", w: 6, d: 6, h: 3.4 },
{ n: "The bathroom", t: "bath", w: 5, d: 5, h: 3.4 }, { n: "The study", t: "study", w: 7, d: 6, h: 3.4 }] }],
after: [function (A, F) { udxWho(A, "dw_mason", { sex: "m", look: udxLookDwarf(0x5A5A52, 2), species: "dwarf", scale: 0.82, must: 1 }, F.ox - 4, F.oz + 2, Math.PI / 2, udxPersona("Bram Flintmane, a mason of Clan Granitehand", "a mason of Clan Granitehand at home on the Hundred Terraces; you carved half the doors on your terrace. Hospitable, fond of tea and long stories about stone.", "Come in out of the hall! Tea's on. Mind the step, I carved it a finger too high on purpose; keeps the cousins humble.")); }] });
udxBuilding({ key: "flagon", name: "The Copper Flagon", out: Object.assign({}, UDD_OUT), floors: [{ name: "The Copper Flagon", th: udxThDwarfHome(), hallW: 3.6, hallH: 4, hallName: "the stair passage", env: UDX_ENV_DWARF,
foyer: { n: "the taproom", w: 18, d: 16, h: 6, kit: "tavern" }, rooms: [{ n: "The kitchen", t: "kitchen", w: 8, d: 7, h: 4 }, { n: "The cellar", t: "brewery", w: 9, d: 8, h: 4 }, { n: "A guest room", t: "bedroom", w: 6, d: 6, h: 3.6 }, { n: "A second guest room", t: "bedroom", w: 6, d: 6, h: 3.6 },
{ n: "A third guest room", t: "bedroom", w: 6, d: 6, h: 3.6 }, { n: "The snug", t: "sitting", w: 7, d: 7, h: 3.8 }] }],
after: [function (A, F) {
udxWho(A, "fl_keeper", { sex: "f", look: udxLookDwarf(0x7A4A2A, 5), species: "dwarf", scale: 0.82, must: 1 }, F.ox - 9, F.oz - 5.4, Math.PI, udxPersona("Marta Copperkettle, keeper of the Copper Flagon", "the innkeeper of the Copper Flagon in Stonehallow. Jolly, sharp-eyed, knows every bit of gossip in the Dwarven Deep. You serve mushroom stew, hot spiced cider (no alcohol for anyone young) and the famous Deepmantle root beer, and rent rooms upstairs.", "Sit anywhere that isn't a dwarf! Stew's hot and so's the cider. What'll it be?"));
for (var s = 0; s < (UDX.lite ? 2 : 5); s++)
udxWho(A, "fl_g" + s, { sex: s % 2 ? "f" : "m", look: udxLookDwarf([0x5A3A2A, 0x3A4A5A, 0x6A5A3A][s % 3], s), species: "dwarf", scale: 0.82 }, F.ox - 14 + s * 2.2, F.oz + (s % 2 ? 2 : -1), s, null);
}] });
udxBuilding({ key: "baths", name: "The Emberwell Baths", out: Object.assign({}, UDD_OUT), floors: [{ name: "The Emberwell Baths", th: Object.assign(udxThDwarf(), { floor: udxMat(0x8A8A82, "tile"), hallFloor: udxMat(0x9A968C, "tile") }), hallW: 4, hallH: 5, hallName: "the bath passage", env: UDX_ENV_DWARF,
foyer: { n: "the entrance hall", w: 12, d: 12, h: 6, kit: "hall" }, rooms: [{ n: "The changing rooms", t: "robing", w: 8, d: 7 }, { n: "A second changing room", t: "robing", w: 8, d: 7 }, { n: "The hot pool", t: "steam", w: 12, d: 10, h: 5 }, { n: "The warm pool", t: "steam", w: 12, d: 10, h: 5 },
{ n: "The cold plunge", t: "steam", w: 8, d: 8 }, { n: "The resting room", t: "sitting", w: 8, d: 8 }], end: { n: "The Great Steam Hall", t: "steam", w: 16, d: 16, h: 8 } }],
after: [function (A, F) {
udxWho(A, "bt_keeper", { sex: "m", look: udxLookDwarf(0xE8E0D0, 3), species: "dwarf", scale: 0.82, must: 1 }, F.ox - 5, F.oz + 3, Math.PI / 2, udxPersona("Olaf Emberwell, keeper of the baths", "the keeper of the Emberwell Baths in Stonehallow, heated by the same hot rock as the Great Smeltery. Relaxed, talkative, explains how hot springs work (rainwater sinks deep, is heated by hot rock, rises again).", "Towels on the left, hot pool straight ahead, cold plunge for the brave. Mind the steam on your spectacles."));
}] });
})();
var UDX_EMP = [
[4500, "The Council of Matrons", "The Council of Matrons"],
[4510, "House Vaelith", "House Vaelith"], [4515, "House Ostrael", "House Ostrael"], [4520, "House Myrrhen", "House Myrrhen"], [4525, "House Zelvane", "House Zelvane"],
[4530, "House Ithrael", "House Ithrael"], [4535, "House Korvaen", "House Korvaen"], [4540, "House Sablethorn", "House Sablethorn"],
[4550, "The Duskwell Academy of the Deep Arts", "The Duskwell Academy"], [4560, "The Thornyard of the Spire Guard", "The Thornyard"], [4570, "The Guild of the Silk Bazaar", "The Silk Bazaar"],
[4600, "The Thanehold of Stonehallow", "The Thanehold"], [4610, "The Smiths of the Hall of Anvils", "The Hall of Anvils"], [4620, "The Deepdelve Mining Guild", "The Deepdelve Mines"],
[4630, "The Great Smeltery of Clan Emberbeard", "The Great Smeltery"], [4640, "The Granitehand Masons", "The Hundred Terraces"], [4650, "The Copper Flagon", "The Copper Flagon"], [4655, "The Emberwell Baths", "The Emberwell Baths"]
];
var UDX_WPN = {
"The Council of Matrons": "The Underdark: the Matron Spire in Zhaelvorn, seat of the Council of Matrons.",
"House Vaelith": "The Underdark: House Vaelith's stalactite in Zhaelvorn (the law).", "House Ostrael": "The Underdark: House Ostrael's stalactite in Zhaelvorn (silk and bridges).",
"House Myrrhen": "The Underdark: House Myrrhen's stalactite in Zhaelvorn (the deep arts).", "House Zelvane": "The Underdark: House Zelvane's stalactite in Zhaelvorn (the Spire Guard).",
"House Ithrael": "The Underdark: House Ithrael's stalactite in Zhaelvorn (maps and scholars).", "House Korvaen": "The Underdark: House Korvaen's stalactite in Zhaelvorn (merchants).",
"House Sablethorn": "The Underdark: House Sablethorn's stalactite in Zhaelvorn (lizard riders and scouts).",
"The Duskwell Academy": "The Underdark: the Duskwell Academy of the Deep Arts, Zhaelvorn.", "The Thornyard": "The Underdark: the Thornyard, training grounds of the Spire Guard.",
"The Silk Bazaar": "The Underdark: the Silk Bazaar on Zhaelvorn's gate avenue.", "The Thanehold": "The Underdark: the Thanehold, palace of the High Thane of Stonehallow.",
"The Hall of Anvils": "The Underdark: the Hall of Anvils in Stonehallow, the Dwarven Deep.", "The Deepdelve Mines": "The Underdark: the Deepdelve Mines of Stonehallow.",
"The Great Smeltery": "The Underdark: the Great Smeltery of Stonehallow.", "The Hundred Terraces": "The Underdark: the Hundred Terraces of Stonehallow.",
"The Copper Flagon": "The Underdark: the Copper Flagon, an inn in Stonehallow.", "The Emberwell Baths": "The Underdark: the Emberwell Baths, hot springs of Stonehallow."
};
function udxJobT(t, steps) { return [[t, "station", steps]]; }
var UDX_JOBS = [
[4500, "Council clerk", "The Council of Matrons", 11, 2, false, [9, 8], udxJobT("Keep the Council's record", ["Sort the morning's petitions", "Copy the Council's decisions onto tablets", "File them in the Hall of Records", "Answer the petitioners waiting"])],
[4501, "Spire Guard", "The Council of Matrons", 12, 4, true, [8, 8], udxJobT("Stand guard in the Spire", ["Take over the watch at the vestibule", "Walk the Court of the Matrons", "Check the staff doors are barred", "Hand over to the next watch"])],
[4502, "Spire kitchen cook", "The Council of Matrons", 10, 2, true, [7, 8], udxJobT("Cook for the Council", ["Light the ovens", "Bake the glowcap pies", "Dress the blind-fish in silk-leaf", "Serve the banquet hall"])],
[4503, "Steward of the Matron Spire", "The Council of Matrons", 13, 1, false, [9, 8], udxJobT("Run the Spire", ["Read the day's list", "Set the Council Chamber", "See the kitchens and the guard are ready", "Lock up the Treasury"])]
];
(function () {
var H = [["Vaelith", 4510, "Court scribe of House Vaelith", ["Lay out the Court of Judgement", "Write down each case as it is heard", "Read the record back to the judges", "Seal it in the House's archive"]],
["Ostrael", 4515, "Silk-loft weaver of House Ostrael", ["Wind the spider silk onto spools", "Thread the loom", "Weave a length of silk cloth", "Cut it and fold it for the bazaar"]],
["Myrrhen", 4520, "Faerglow laboratory assistant", ["Set out the crystals under the lamps", "Note which ones glow, and how long", "Grind minerals for the dyes", "Wash and stack the glassware"]],
["Zelvane", 4525, "Blade Hall instructor", ["Warm up the class", "Teach the guard and the parry", "Run the sparring bouts, gently", "Oil and rack the practice blades"]],
["Ithrael", 4530, "Chart copyist of House Ithrael", ["Unroll the master chart", "Trace a tunnel onto silk paper", "Ink the names of the places", "Hang the copy to dry"]],
["Korvaen", 4535, "Counting-house clerk of House Korvaen", ["Open the ledgers", "Weigh the day's trade on the fair scales", "Add up the accounts", "Lock the coin in the House treasury"]],
["Sablethorn", 4540, "Lizard groom of House Sablethorn", ["Feed the cave lizards", "Brush their scales and gather the shed ones", "Check their saddles and harness", "Walk them round the track"]]];
H.forEach(function (q) {
var wp = "House " + q[0];
UDX_JOBS.push([q[1], "House guard of House " + q[0], wp, 11, 2, true, [8, 8], udxJobT("Guard the House", ["Take the watch at the House doors", "Walk the halls", "Check the staff doors are barred", "Hand over to the next guard"])]);
UDX_JOBS.push([q[1] + 1, "Steward's aide of House " + q[0], wp, 10, 1, true, [8, 8], udxJobT("Help run the House", ["Take the day's list from the steward", "Check the store rooms", "See the kitchen has what it needs", "Report back to the steward"])]);
UDX_JOBS.push([q[1] + 2, q[2], wp, 11, 2, true, [9, 8], udxJobT("Work at the House's own trade", q[3])]);
});
})();
UDX_JOBS.push([4550, "Academy teacher's assistant", "The Duskwell Academy", 11, 2, true, [8, 8], udxJobT("Help in the classrooms", ["Set out the lamps and mirrors", "Hand out the slates", "Help students with the lesson", "Tidy the classroom"])], [4551, "Academy librarian", "The Duskwell Academy", 11, 1, false, [9, 8], udxJobT("Keep the Archive of Spells", ["Open the archive", "Fetch the books students ask for", "Mend a torn page", "Shelve everything in its place"])], [4552, "Academy cook", "The Duskwell Academy", 10, 1, true, [7, 8], udxJobT("Feed the students", ["Light the stoves", "Cook the stew", "Serve the refectory", "Wash up"])], [4553, "Academy healer", "The Duskwell Academy", 12, 1, false, [9, 8], udxJobT("Keep the infirmary", ["Check the infirmary beds", "See to the day's scrapes and bumps", "Restock the shelves", "Write up the day's notes"])], [4560, "Spire Guard recruit", "The Thornyard", 10, 6, true, [7, 8], udxJobT("Train in the Thornyard", ["Muster in the yard", "Drill with the practice blades", "Shoot at the butts", "Run the lizard track"])], [4561, "Thornyard armourer", "The Thornyard", 12, 1, false, [8, 8], udxJobT("Keep the armoury", ["Check the armour for wear", "Mend a strap and a buckle", "Sharpen the practice blades' edges smooth", "Log what went out and came back"])], [4562, "Quartermaster's hand", "The Thornyard", 10, 2, true, [8, 8], udxJobT("Help the quartermaster", ["Count the boots and cloaks", "Issue kit to the recruits", "Stack the new arrows", "Sweep the store"])], [4563, "Lizard rider of the Thornyard", "The Thornyard", 12, 2, false, [8, 8], udxJobT("Ride the patrol", ["Saddle your lizard", "Ride the track to warm up", "Patrol the city's edge", "Unsaddle and groom"])], [4570, "Silk Bazaar stallholder", "The Silk Bazaar", 10, 4, true, [9, 8], udxJobT("Keep a bazaar stall", ["Set out the goods", "Weigh them on fair scales", "Serve the customers", "Pack up and count the takings"])], [4600, "Thane's guard", "The Thanehold", 12, 4, true, [8, 8], udxJobT("Guard the Thanehold", ["Take the watch at the great doors", "Walk the Long Hall", "Check the staff doors are barred", "Hand over to the next guard"])], [4601, "Thanehold steward's aide", "The Thanehold", 11, 1, true, [8, 8], udxJobT("Help run the Thanehold", ["Take the day's list from the steward", "Set the feast hall", "Check the brewery and the kitchens", "Report back to the steward"])], [4602, "Thanehold brewer", "The Thanehold", 11, 2, true, [7, 8], udxJobT("Brew in the Thanehold", ["Mash the grain", "Boil it with the hops", "Cool it and add the yeast", "Rack the casks"])], [4603, "Thanehold cook", "The Thanehold", 10, 2, true, [7, 8], udxJobT("Cook for the Thane's table", ["Light the great ovens", "Roast and bake", "Set the feast hall", "Serve the five clans"])], [4610, "Smith of the Hall of Anvils", "The Hall of Anvils", 12, 4, false, [8, 8], udxJobT("Work iron at the hearth", ["Bank the hearth", "Heat the iron", "Hammer it on the anvil", "Quench and temper the work"])], [4611, "Smith's apprentice", "The Hall of Anvils", 10, 4, true, [8, 8], udxJobT("Help at the forge", ["Fetch coal for the hearth", "Work the bellows", "Hold the work for the smith", "Sweep up the scale"])], [4620, "Deepdelve miner", "The Deepdelve Mines", 11, 6, true, [7, 8], udxJobT("Work the deepsilver seam", ["Check the props and the air", "Drill and wedge the face", "Load the cart", "Push it to the cage"])], [4621, "Cage operator of the Deepdelve", "The Deepdelve Mines", 11, 1, true, [7, 8], udxJobT("Work the cage", ["Check the rope and the brake", "Signal the miners down", "Wind them up again", "Log every trip"])], [4630, "Smeltery hand", "The Great Smeltery", 11, 4, true, [7, 8], udxJobT("Feed the furnaces", ["Charge the furnace with ore and charcoal", "Watch the colour of the fire", "Open the tap when it runs", "Skim the slag"])], [4631, "Crucible master", "The Great Smeltery", 13, 1, false, [8, 8], udxJobT("Pour the metal", ["Check the crucibles", "Pour the molten metal into the moulds", "Let it cool", "Knock out the ingots"])], [4640, "Terrace mason", "The Hundred Terraces", 11, 3, true, [8, 8], udxJobT("Keep the terraces sound", ["Walk your terrace", "Find a loose stone", "Cut and set a new one", "Sweep the ramp"])], [4641, "Terrace mushroom gardener", "The Hundred Terraces", 10, 3, true, [7, 8], udxJobT("Tend the mushroom beds", ["Water the beds", "Pick the ripe caps", "Turn the compost", "Plant new spawn"])], [4650, "Innkeeper's hand at the Copper Flagon", "The Copper Flagon", 10, 3, true, [10, 8], udxJobT("Help in the inn", ["Wipe the tables", "Serve the stew and cider", "Make up the guest rooms", "Wash the tankards"])], [4655, "Bath attendant at the Emberwell Baths", "The Emberwell Baths", 10, 2, true, [8, 8], udxJobT("Keep the baths", ["Check the water's heat", "Lay out the towels", "Sweep the steam hall", "Help the bathers"])]);
var UDX_MATS = [
["hx_deepsilver", "Deepsilver ore", "⚪", 9, null, "Stonehallow's Deepdelve galleries"],
["hx_runestone", "Runestone", "🔷", 8, null, "the Deepdelve galleries"],
["hx_lizardscale", "Cave-lizard scale", "🦎", 5, 9, "the lizard track of the Thornyard"],
["hx_amberlith", "Amberlith", "🟠", 10, null, "the slag heaps of the Great Smeltery"]
];
var UDX_SPOTS = [
["ud_dsilver1", "hx_deepsilver", 1, 2, 30, "A deepsilver seam in the galleries", "chip out deepsilver", "gem", "g_north"],
["ud_dsilver2", "hx_deepsilver", 1, 2, 30, "A deepsilver seam in the far gallery", "chip out deepsilver", "gem", "g_south"],
["ud_rune1", "hx_runestone", 1, 2, 35, "Runestone in the gallery wall", "cut out runestone", "crystal", "g_ns1"],
["ud_rune2", "hx_runestone", 1, 2, 35, "Runestone at the gallery's end", "cut out runestone", "crystal", "g_ns2"],
["ud_ore3", "cr_ore", 2, 4, 20, "Iron ore by the Deepdelve headframe", "shovel up ore", "gem", "yard"],
["ud_scale", "hx_lizardscale", 1, 3, 25, "Shed scales by the lizard track", "gather scales", "crystal", "track"],
["ud_amber", "hx_amberlith", 1, 2, 40, "Amberlith in the smeltery's slag", "pick out amberlith", "crystal", "slag"]
];
var UDX_STALLS = {
bz_velra: { name: "Velra's silks", keeper: "Velra, a web-weaver", sells: ["hx_silk", "cr_cloth"], buys: ["hx_silk", "hx_lizardscale"], say: "Spider silk on spools and silk cloth from House Ostrael's looms, light as smoke." },
bz_glass: { name: "Glass of the Deep", keeper: "crystal-glass maker of the Silk Bazaar", sells: ["cr_crystal", "hx_deepgem"], buys: ["cr_crystal", "hx_deepgem", "hx_runestone"], say: "Crystal and cut gems, and glass blown from the sand of the Sunless Sea." },
bz_silver: { name: "Silver of Zhaelvorn", keeper: "silversmith of the Silk Bazaar", sells: ["hx_deepsilver", "cr_ore"], buys: ["hx_deepsilver", "hx_amberlith"], say: "Deepsilver from the dwarves of Stonehallow, worked into fine things." },
bz_cordial: { name: "Mushroom cordials", keeper: "cordial-seller of the Silk Bazaar", sells: ["hx_glowcap"], buys: ["hx_glowcap", "hx_cavefish"], say: "Glowcap cordial and velvetcap tea; she buys caps and fish for the kitchen." },
sh_anvils: { name: "The Anvils' counter", keeper: "Thrain Hammerfell, master smith of the Hall of Anvils", sells: ["cr_ore", "cr_coal", "hx_deepsilver"], buys: ["cr_ore", "cr_coal", "hx_deepsilver", "hx_runestone", "hx_amberlith"], say: "Ore, coal and deepsilver for the forges; the smiths buy what the mines and the smeltery give." },
sh_flagon: { name: "The Copper Flagon's kitchen door", keeper: "Marta Copperkettle, keeper of the Copper Flagon", sells: ["hx_glowcap"], buys: ["hx_glowcap", "hx_cavefish"], say: "Marta buys mushrooms and fish for the stew, and sells glowcaps by the basket." }
};
var UDSP = { hire: null, parked: null, auto: false, model: null, btn: null, warned: false, price: 15, mins: 30, speed: 2.6, roosts: [] };
RIDE_SEAT.udspider = 1.05;
function udspAstride(fig) {
var lm = fig && fig.userData && fig.userData.limbs;
if (!lm)
return;
[lm.ll, lm.rl].forEach(function (l) { if (!l)
return; l.rotation.z = (l.position.x > 0 ? 1 : -1) * 1.0; l.rotation.x = -0.5; });
[lm.la, lm.ra].forEach(function (a) { if (!a)
return; a.rotation.x = -0.85; a.rotation.z = (a.position.x > 0 ? -1 : 1) * 0.1; });
}
function udspSkin(band) { return __ZC(328, 91, this, arguments, new.target); }
function udspModel(o) { return __ZC(328, 92, this, arguments, new.target); }
function udspStep(g, dt, v) { return __ZC(328, 93, this, arguments, new.target); }
function udspHere() { return typeof WLD !== "undefined" && WLD && WLD.on === "underdark"; }
function udspInside() { var A = UDX.here; return !!(A && A.kind === "inside"); }
function udspOn() { return typeof riding !== "undefined" && riding === "Giant spider" && rideArch === "udspider"; }
function udspLook(k) { try {
var L = meLook();
L.ride = k;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { } }
function udspMount() { return __ZC(328, 94, this, arguments, new.target); }
function udspDismount(park) { return __ZC(328, 95, this, arguments, new.target); }
function udspPark(p) {
if (UDSP.parked && UDSP.parked.g)
scene.remove(UDSP.parked.g);
UDSP.parked = null;
if (!p)
return;
var g = udspModel({});
g.position.set(p.x, p.y, p.z);
g.rotation.y = p.ry;
scene.add(g);
p.g = g;
UDSP.parked = p;
}
function udspEnd(why) {
if (!UDSP.hire)
return;
UDSP.hire = null;
UDSP.auto = false;
UDSP.warned = false;
udspDismount(false);
udspPark(null);
if (why)
setStatus(why);
udspPaint();
}
function udspStart(free) { return __ZC(328, 96, this, arguments, new.target); }
function udspPhone() { return typeof touchRig !== "undefined" && !!touchRig; }
function udspLeft() { return UDSP.hire ? Math.max(0, Math.ceil((UDSP.hire.until - Date.now()) / 60000)) : 0; }
function udspCard(R) { return __ZC(328, 97, this, arguments, new.target); }
function udspHire(R) { return __ZC(328, 98, this, arguments, new.target); }
function udspPaint() { return __ZC(328, 99, this, arguments, new.target); }
function udspToggle() { if (!UDSP.hire)
return; if (udspOn()) {
udspDismount(true);
setStatus("<b>You climb down.</b> The spider waits beside you, cleaning a leg.");
}
else {
udspMount();
setStatus("<b>Back in the saddle.</b>");
} }
if (typeof PS_KEEP !== "undefined")
PS_KEEP["udsp-btn"] = 1;
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS[0].ids.push("udsp-ps", "udsp-ps-back");
if (typeof PS_EXTRAS !== "undefined") {
PS_EXTRAS.push({ id: "udsp-ps", show: function () { return !!UDSP.hire && udspHere() && !udspInside(); }, label: function () { return udspOn() ? "🕷️ Get off the spider" : "🕷️ Ride your spider"; }, run: function () { udspToggle(); } });
PS_EXTRAS.push({ id: "udsp-ps-back", show: function () { return !!UDSP.hire && udspHere(); }, label: function () { return "🕷️ Send the spider home (" + udspLeft() + " min left)"; }, run: function () { udspEnd("<b>The spider scuttles off home to its roost.</b>"); } });
}
(function () {
if (typeof rideTick !== "function")
return;
var rt = rideTick, last = null;
rideTick = function (dt) {
if (UDSP.hire || UDSP.parked) {
try {
if (!udspHere())
udspEnd("<b>Your spider stays below.</b> It knows its way home to the roost.");
else if (Date.now() > UDSP.hire.until)
udspEnd("<b>Half an hour is up.</b> The spider sets you down gently and scuttles home to the roost.");
else {
if (!UDSP.warned && UDSP.hire.until - Date.now() < 5 * 60000) {
UDSP.warned = true;
setStatus("<b>🕷️ Five minutes left</b> with your spider.");
}
if (udspInside()) {
if (udspOn()) {
udspDismount(true);
UDSP.auto = true;
}
}
else if (UDSP.auto && !udspOn()) {
UDSP.auto = false;
udspMount();
}
}
}
catch (e) { }
udspPaint();
}
if (rideArch !== "udspider")
return rt.apply(this, arguments);
var show = walkMode && !store.inside;
if (!show) {
if (UDSP.model)
UDSP.model.visible = false;
return;
}
if (!UDSP.model) {
UDSP.model = udspModel({});
scene.add(UDSP.model);
}
var P = camera.position, me = (typeof meG !== "undefined" && meG) ? meG : null, m = UDSP.model;
var px = me ? me.position.x : P.x, pz = me ? me.position.z : P.z, py = me ? me.position.y : P.y - 1.72;
var v = last ? Math.hypot(px - last.x, pz - last.z) / Math.max(0.001, dt) : 0;
last = { x: px, z: pz };
m.visible = true;
m.position.set(px, py - RIDE_SEAT.udspider, pz);
m.rotation.y = me ? me.rotation.y : yaw + Math.PI;
udspStep(m, dt, v);
if (UDSP.parked && UDSP.parked.g)
udspStep(UDSP.parked.g, dt, 0);
};
var rt2 = rideTick;
rideTick = function (dt) { rt2.apply(this, arguments); if (rideArch !== "udspider" && UDSP.model) {
scene.remove(UDSP.model);
UDSP.model = null;
} };
})();
(function () {
if (typeof avatarTick !== "function")
return;
var at = avatarTick;
avatarTick = function (dt) {
var r = at.apply(this, arguments);
try {
if (rideArch === "udspider" && walkMode && !store.inside && typeof meG !== "undefined" && meG) {
udspAstride(meG);
var m = UDSP.model;
if (m) {
m.position.set(meG.position.x, meG.position.y - RIDE_SEAT.udspider, meG.position.z);
m.rotation.y = meG.rotation.y;
}
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg(row), k = row && !row.away && row.look && row.look.ride;
if (k === "udspider") {
try {
var v = udspModel({}), seat = RIDE_SEAT.udspider;
g.children.forEach(function (c) { if (c !== g.userData.tag)
c.position.y += seat; });
if (g.userData.tag)
g.userData.tag.position.y += seat;
v.rotation.y = Math.PI;
g.add(v);
g.userData.mount = v;
g.children.forEach(function (c) { if (c.userData && c.userData.limbs)
udspAstride(c); });
}
catch (e) { }
}
return g;
};
})();
var UDSP_ROOSTS = [
{ key: "city", name: "The Silkrider Roost", keeper: "Roostmistress Ellune", a: 152, d: 101 },
{ key: "stair", name: "The Stair-foot Roost", keeper: "Tavvik the roost-hand", gate: 46 }
];
function udspRoostAt(R) {
if (R.gate) {
var g = UD.cityGate || { x: UDC.cx - 110, z: UDC.cz + 92 }, dx = 0 - g.x, dz = -300 - g.z, L = Math.hypot(dx, dz) || 1;
return [g.x + dx / L * R.gate + dz / L * 14, g.z + dz / L * R.gate - dx / L * 14];
}
var a = R.a * Math.PI / 180;
return [UDC.cx + Math.cos(a) * R.d, UDC.cz + Math.sin(a) * R.d];
}
function udspRoost(root, R) { return __ZC(328, 100, this, arguments, new.target); }
(function () {
var base = udCity;
udCity = function (G, R) {
var out = base.apply(this, arguments);
UDSP.roosts = [];
try {
if (UDC.g)
UDSP_ROOSTS.forEach(function (Ro) { udspRoost(UDC.g, Ro); });
}
catch (e) {
if (window.console)
console.warn("[underdark-roost]", e);
}
return out;
};
})();
var UDSP_EMP = [[6200, "The Silkrider Roost", "The Silkrider Roost"]];
var UDSP_JOBS = [
[6200, "Spider groom", "The Silkrider Roost", 10, 3, true, [8, 8], udxJobT("Groom the riding spiders", ["Brush the dust from each spider's legs", "Check the harness and the saddle", "Feed them their crickets", "Settle them into their silk to rest"])],
[6201, "Roost-hand", "The Silkrider Roost", 10, 3, true, [9, 8], udxJobT("Hire out the spiders", ["Greet the riders at the desk", "Saddle a spider for each one", "Write each hire in the roost's book", "Take the spiders back as they come home"])],
[6202, "Silk-spinner of the roost", "The Silkrider Roost", 11, 2, true, [8, 8], udxJobT("Gather and wind the silk", ["Collect the spiders' fresh silk lines", "Wind it onto spools", "Mend the roost's web roof", "Take the spools to House Ostrael's loft"])],
[6203, "Roostmaster's deputy", "The Silkrider Roost", 13, 1, false, [9, 8], udxJobT("Run the roost", ["Read the day's hires", "Check every spider is fit to ride", "Train a young spider to the saddle", "Count the takings and lock the book"])]
];
UDX_EMP.push.apply(UDX_EMP, UDSP_EMP);
UDX_JOBS.push.apply(UDX_JOBS, UDSP_JOBS);
UDX_WPN["The Silkrider Roost"] = "The Underdark: the Silkrider Roost by the Silk Bazaar in Zhaelvorn, where House Ostrael keeps its riding spiders.";
(function () {
if (typeof renderView !== "function")
return;
var rv = renderView;
renderView = function () {
var up = 0;
try {
if (rideArch === "udspider" && walkMode && !store.inside && meView === "behind" && !(typeof VRM !== "undefined" && VRM.xr) && camera) {
up = 1.5;
camera.position.y += up;
}
}
catch (e) {
up = 0;
}
try {
return rv.apply(this, arguments);
}
finally {
if (up)
camera.position.y -= up;
}
};
})();
var UDX_SPOT_AT = {};
(function () {
if (typeof HX_WORK === "undefined" || typeof HX_JOBS === "undefined")
return;
var DX = UDD.DX, Zn = UDD.Zn, cx = UDC.cx, cz = UDC.cz;
function polar(a, d) { return [cx + Math.cos(a * Math.PI / 180) * d, cz + Math.sin(a * Math.PI / 180) * d]; }
var at = { "The Council of Matrons": polar(140, 40).concat([34]), "The Duskwell Academy": polar(330, 160).concat([40]), "The Thornyard": polar(210, 176).concat([40]), "The Silk Bazaar": polar(140, 90).concat([28]),
"The Thanehold": [DX, Zn - 430, 45], "The Hall of Anvils": [DX, Zn - 190, 110], "The Deepdelve Mines": [DX + 200, Zn - 170, 120], "The Great Smeltery": [DX + 120, Zn - 350, 60], "The Hundred Terraces": [DX - 140, Zn - 230, 110],
"The Copper Flagon": [DX + 50, Zn - 40, 12], "The Emberwell Baths": [DX + 50, Zn - 250, 12] };
UDC_HOUSES.forEach(function (H) { at[H.name] = polar(H.a, 64).concat([16]); });
if (typeof UDSP_ROOSTS !== "undefined")
at["The Silkrider Roost"] = udspRoostAt(UDSP_ROOSTS[0]).concat([14]);
UDX_EMP.forEach(function (E) { var k = E[2], p = at[k]; if (!p || HX_WP[k])
return; var row = [k, "underdark", Math.round(p[0]), Math.round(p[1]), p[2], UDX_WPN[k]]; HX_WORK.push(row); HX_WP[k] = { key: k, world: "underdark", x: row[2], z: row[3], r: row[4], note: row[5] }; });
UDX_JOBS.forEach(function (j) { HX_JOBS.push([j[0], "underdark", j[1], j[2], j[3], j[4], j[5], j[6], j[7]]); });
UDX_MATS.forEach(function (m) { if (!HX_MATS.some(function (x) { return x[0] === m[0]; }))
HX_MATS.push(m); var o = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; HX_MB[m[0]] = o; if (typeof FG_MB !== "undefined" && !FG_MB[m[0]])
FG_MB[m[0]] = o; });
var T = UDC.thorn0 = (function () { var a = 210 * Math.PI / 180, x = cx + Math.cos(a) * 176, z = cz + Math.sin(a) * 176, ux = -Math.cos(a), uz = -Math.sin(a); return { x: x, z: z, ux: ux, uz: uz, px: -uz, pz: ux }; })();
UDX_SPOT_AT = { g_north: [DX + 352, Zn - 130], g_south: [DX + 352, Zn - 230], g_ns1: [DX + 314.5, Zn - 116], g_ns2: [DX + 314.5, Zn - 244], yard: [DX + 128, Zn - 160],
track: [T.x + T.ux * -4 + T.px * 30, T.z + T.uz * -4 + T.pz * 30], slag: [DX + 166, Zn - 306] };
UDX_SPOTS.forEach(function (s) { var p = UDX_SPOT_AT[s[8]]; if (!p)
return; HX_SPOTS.push([s[0], "underdark", s[1], Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10, s[2], s[3], s[4], s[5], s[6], s[7]]); });
Object.keys(UDX_STALLS).forEach(function (k) { var S = UDX_STALLS[k]; HX_STALLS[k] = { world: "underdark", name: S.name, keeper: S.keeper, x: 0, z: 0, sells: S.sells, buys: S.buys, say: S.say }; });
})();
(function () {
if (typeof hxWpNear !== "function")
return;
var near = hxWpNear;
hxWpNear = function () { var A = UDX.here; if (A && A.wp && typeof WLD !== "undefined" && WLD.on === "underdark" && HX_WP[A.wp])
return HX_WP[A.wp]; return near.apply(this, arguments); };
var map = { spire: "The Council of Matrons", academy: "The Duskwell Academy", thorn: "The Thornyard", thane: "The Thanehold", flagon: "The Copper Flagon", baths: "The Emberwell Baths" };
UDC_HOUSES.forEach(function (H) { map["h_" + H.key] = H.name; });
UDX.areas.forEach(function (A) { var k = A.key.replace(/_\d+$/, ""); if (map[k])
A.wp = map[k]; });
})();
(function () {
if (typeof hxGuideTo !== "function")
return;
var g = hxGuideTo;
hxGuideTo = function (w, x, z, name) {
if (w === "underdark" && x < UDD.DX + 400 && x > UDD.DX - 300 && z < UDD.DZ0 + 20) {
var L = worldLocal(), here = udxAreaAt(L.x, L.z);
if (!(here && (here.key === "deep")))
return g.call(this, w, UDD.gx, UDD.zF + 6, "The Thanes' Road to Stonehallow (" + name + ")");
}
return g.apply(this, arguments);
};
})();
function udxLifeDress(G) { return __ZC(328, 101, this, arguments, new.target); }
function udxDeepDress(A) { return __ZC(328, 102, this, arguments, new.target); }
var UDX_ARCH = { on: false, n: 0, score: 0, t: 0, raf: 0 };
function udxArchery() { return __ZC(328, 103, this, arguments, new.target); }
(function () {
if (typeof hxHub !== "function")
return;
var hub = hxHub;
hxHub = function () {
if (typeof WLD === "undefined" || WLD.on !== "underdark")
return hub.apply(this, arguments);
var wc = worldCard, add = "", more = {}, n = 0;
function head(t) { add += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function go(l, s, fn) { var k = "udx" + (n++); add += worldBtn(k, l, s); more[k] = fn; }
function way(name, x, z) { return function () { hxGuideTo("underdark", x, z, name); }; }
head("Zhaelvorn and Stonehallow");
var sp = UDC.spireOut;
if (sp)
go("🏛️ The Matron Spire", "Seat of the Council of Matrons: the Council Chamber, the Ballroom of Lanterns, the Hall of the First Matron", way("The Matron Spire", sp.x, sp.z));
UDC_HOUSES.forEach(function (H) { if (H.out)
go("🕯️ " + esc(H.name), esc(H.motto) + " · " + esc(H.trade), way(H.name, H.out.x, H.out.z)); });
if (UDC.academyOut)
go("📚 The Duskwell Academy", "Six lessons of the deep arts; walk into any classroom", way("The Duskwell Academy", UDC.academyOut.x, UDC.academyOut.z));
if (UDC.thorn)
go("🏹 The Thornyard", "Archery butts, sparring rings, the lizard track, the barracks", way("The Thornyard", UDC.thorn.x, UDC.thorn.z));
go("⛰️ The Thanes' Road to Stonehallow", "The Dwarven Deep: the Hall of Anvils, the Hundred Terraces, the mines, the smeltery, the Thanehold", function () { hxGuideTo("underdark", UDD.gx, UDD.zF + 6, "The Thanes' Road"); });
head("Games and lessons");
if (UDC.archLine)
go("🏹 The archery butts", "Five arrows at the Thornyard" + (function () { try {
var b = +localStorage.getItem("sm.udx.archery") || 0;
return b ? " · your best " + b + " of 50" : "";
}
catch (e) {
return "";
} })(), way("The archery butts", UDC.archLine.x, UDC.archLine.z));
var ln = Object.keys(UDX_LESSONS).filter(function (k) { return udxFlag("lesson_" + k); }).length;
go("📖 Lessons of the Duskwell Academy", ln + " of " + Object.keys(UDX_LESSONS).length + " learned · in the classrooms and the practice circles", UDC.court ? way("The Practice Court", UDC.court.x, UDC.court.z) : null);
worldCard = function (h, fns) { var i = h.indexOf("<div style='margin:10px 0 2px"); h = i > 0 ? h.slice(0, i) + add + h.slice(i) : h + add; return wc.call(this, h, Object.assign({}, fns, more)); };
try {
return hub.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
if (typeof hxMaps === "function") {
var mp = hxMaps;
hxMaps = function (T) {
var wc = worldCard, add = "", more = {}, P = [];
if (UDC.spireOut)
P.push(["The Matron Spire", UDC.spireOut.x, UDC.spireOut.z]);
if (UDC.academyOut)
P.push(["The Duskwell Academy", UDC.academyOut.x, UDC.academyOut.z]);
if (UDC.thorn)
P.push(["The Thornyard", UDC.thorn.x, UDC.thorn.z]);
P.push(["The Silk Bazaar", UDC.cx - 70, UDC.cz + 58], ["The Thanes' Road (to Stonehallow)", UDD.gx, UDD.zF + 6]);
P.forEach(function (p, i) { add += worldBtn("ux" + i, esc(p[0]), "Show me the way"); more["ux" + i] = function () { hxGuideTo("underdark", p[1], p[2], p[0]); }; });
worldCard = function (h, fns) { return wc.call(this, h + add, Object.assign({}, fns, more)); };
try {
return mp.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
}
})();
function udxWalkBlocked(x, z, feet) { return __ZC(328, 104, this, arguments, new.target); }
function udxWalkFree(x0, z0, x1, z1, feet) {
var n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 1.5));
for (var i = 1; i <= n; i++) {
var t = i / n;
if (udxWalkBlocked(x0 + (x1 - x0) * t, z0 + (z1 - z0) * t, feet))
return false;
}
return true;
}
function udxWalkersTick() { return __ZC(328, 105, this, arguments, new.target); }
(function () {
if (typeof udxTick !== "function")
return;
var t0 = udxTick;
udxTick = function (dt) { t0.apply(this, arguments); try {
udxWalkersTick();
}
catch (e) {
if (!UDX.eW) {
UDX.eW = 1;
if (window.console)
console.warn("[underdark-deep] walkers", e);
}
} };
})();
(function () {
if (typeof udxWalkBlocked !== "function" || typeof udsColHit !== "function")
return;
var wb = udxWalkBlocked;
udxWalkBlocked = function (x, z, feet) { if (wb.apply(this, arguments))
return true; return !udxAreaAt(x, z, feet) && UDC.cols.length > 0 && udsColHit(x, z, feet); };
})();
var UDX_LG = { after: 45000, every: 5000, keep: { mine: 1, thanesgate: 1 }, n: 0 };
function udxLgSig(A) { var s = [A.g ? A.g.children.length : 0]; for (var k in A)
if (Array.isArray(A[k]))
s.push(k + ":" + A[k].length); return s.join(","); }
(function () {
var b0 = udxBuildArea;
udxBuildArea = function (A) {
if (!A || A.built || !udxLite() || UDX_LG.keep[A.key] || /^mg_/.test(A.key) || typeof worldLetGoLists !== "function")
return b0.apply(this, arguments);
var len = {};
for (var k in A)
if (Array.isArray(A[k]))
len[k] = A[k].length;
var mark = new Map();
try {
worldLetGoLists(function (a) { mark.set(a, a.length); });
}
catch (e) {
mark = null;
}
var r = b0.apply(this, arguments);
if (mark && A.g)
A.lg = { len: len, added: worldLetGoAdded(mark), sig: udxLgSig(A), seen: Date.now() };
return r;
};
})();
function udxLetGoArea(A) { return __ZC(328, 106, this, arguments, new.target); }
setInterval(function () {
try {
if (!udxLite() || typeof UDX === "undefined")
return;
var now = Date.now(), on = typeof WLD !== "undefined" && WLD.on === "underdark";
for (var i = 0; i < UDX.areas.length; i++) {
var A = UDX.areas[i];
if (!A.lg)
continue;
if (A === UDX.here || (on && A.g && A.g.visible))
A.lg.seen = now;
else if (now - A.lg.seen > UDX_LG.after) {
udxLetGoArea(A);
break;
}
}
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] let go", e);
}
}, UDX_LG.every);
udxArea({ key: "mine", name: "the Deep Workings", kind: "mine", x0: -125, x1: 105, z0: -124.99, z1: 13, y0: -3, y1: 8,
place: function (x, z) { return __ZC(328, 107, this, arguments, new.target); },
build: udxMineBuild });
if (typeof udExamine === "function")
udExamine = function () { udxRuneCard(); };
if (typeof HX_WAYIN !== "undefined")
HX_WAYIN.underdark = "The cage in the mine shaft goes further down than the mine. The miners boarded up the Old Workings off the West Drift and say nobody goes past the boards. Follow the cold air.";
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W)
return;
var b0 = W.build;
W.build = function (G) {
var r = b0.apply(this, arguments);
UDX.lite = udxLite();
if (!UDX.root) {
UDX.root = new THREE.Group();
UDX.root.name = "udx";
G.add(UDX.root);
}
udxGlowSkip();
G.children.forEach(function (c) {
var p = c.geometry && c.geometry.parameters, P = c.position;
if (p && p.width === 12 && p.height === 7 && p.depth === 134)
c.visible = false;
else if (p && p.depth === 124 && p.width === 0.12)
c.visible = false;
else if (p && p.width === 2.2 && p.height === 0.1 && p.depth === 0.3 && Math.abs(P.x) < 0.1 && P.z <= 0 && P.z > -125)
c.visible = false;
else if (Math.abs(P.x) < 6.5 && P.z < -108.4 && P.z > -121.5 && P.y < 9 && c !== UD.door && c.type !== "PointLight")
c.visible = false;
});
try {
udxBuildArea(UDX.by.mine);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] mine", e);
}
try {
udxBuildArea(UDX.by.thanesgate);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] gate", e);
}
try {
udxLifeDress(G);
}
catch (e) {
if (window.console)
console.warn("[underdark-deep] life", e);
}
UDX.built = true;
return r;
};
})();
var UDW = { done: false, n: 0, meshes: 0 };
var UDW_PAL = { cap: [0xB070FF, 0x50D8D0, 0xE8B050, 0xE070C0], capStem: 0xD8D0E0, rock: 0x2E2838, rock2: 0x3A3242, wood: 0x4A3424, wood2: 0x5E4630, iron: 0x24222A, silk: 0xE8E0F4, stone: 0x4A4656 };
function udwMat(col, o) { return udxMat(col, null, o); }
function udwRand(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function udwFree(x, z, need) { return __ZC(328, 108, this, arguments, new.target); }
function udwSpike(r, h, R) { return __ZC(328, 109, this, arguments, new.target); }
function udwSolid(A, x, z, r) { if (A)
udxSolidR(A, x, z, r);
else
UD.solids.push({ x: x, z: z, r: r }); }
function udwCyl(G, rt, rb, h, col, x, y, z, seg, o) { return udxCyl(rt, rb, h, udwMat(col, o), x, y, z, G, seg || 8); }
function udwBox(G, w, h, d, col, x, y, z, ry, o) { var m = udxBox(w, h, d, udwMat(col, o), x, y, z, G); if (ry)
m.rotation.y = ry; return m; }
var UDW_PUT = {
caps: function (G, A, x, y, z, R) { return __ZC(328, 110, this, arguments, new.target); },
stalag: function (G, A, x, y, z, R) { return __ZC(328, 111, this, arguments, new.target); },
lantern: function (G, A, x, y, z, R, col) { return __ZC(328, 112, this, arguments, new.target); },
silk: function (G, A, x, y, z, R) { return __ZC(328, 113, this, arguments, new.target); },
cart: function (G, A, x, y, z, R) { return __ZC(328, 114, this, arguments, new.target); },
crates: function (G, A, x, y, z, R) { return __ZC(328, 115, this, arguments, new.target); },
brazier: function (G, A, x, y, z, R) { return __ZC(328, 116, this, arguments, new.target); },
bench: function (G, A, x, y, z, R) {
var ry = R() * 3.14;
udwBox(G, 2.2, 0.18, 0.6, UDW_PAL.stone, x, y + 0.5, z, ry);
var c = Math.cos(ry), s = Math.sin(ry);
[-0.8, 0.8].forEach(function (k) { udwBox(G, 0.3, 0.42, 0.5, UDW_PAL.rock2, x + c * k, y + 0.21, z - s * k, ry); });
udwSolid(A, x, z, 0.9);
},
crystal: function (G, A, x, y, z, R) { return __ZC(328, 117, this, arguments, new.target); },
tub: function (G, A, x, y, z, R) { return __ZC(328, 118, this, arguments, new.target); },
props: function (G, A, x, y, z, R) {
var ry = R() * 3.14, c = Math.cos(ry), s = Math.sin(ry);
[-1, 1].forEach(function (k) { udwBox(G, 0.25, 3.4, 0.25, UDW_PAL.wood2, x + c * k * 1.3, y + 1.7, z - s * k * 1.3, ry); udwSolid(A, x + c * k * 1.3, z - s * k * 1.3, 0.25); });
udwBox(G, 3.0, 0.28, 0.3, UDW_PAL.wood2, x, y + 3.5, z, ry);
},
orepile: function (G, A, x, y, z, R) { return __ZC(328, 119, this, arguments, new.target); },
rack: function (G, A, x, y, z, R) { return __ZC(328, 120, this, arguments, new.target); },
lamp: function (G, A, x, y, z, R) { UDW_PUT.lantern(G, A, x, y, z, R, 0xFFC878); },
boat: function (G, A, x, y, z, R, ry) { return __ZC(328, 121, this, arguments, new.target); },
nets: function (G, A, x, y, z, R) { return __ZC(328, 122, this, arguments, new.target); },
cap1: function (G, A, x, y, z, R) { return __ZC(328, 123, this, arguments, new.target); },
rocks: function (G, A, x, y, z, R) { var n = 2 + Math.floor(R() * 3); for (var i = 0; i < n; i++) {
var r = 0.2 + R() * 0.5, m = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), udwMat(i % 2 ? UDW_PAL.rock : UDW_PAL.rock2));
m.scale.y = 0.6;
m.position.set(x + (R() - 0.5) * 1.6, y + r * 0.3, z + (R() - 0.5) * 1.6);
m.rotation.y = R() * 3;
G.add(m);
} },
fish: function (G, A, x, y, z, R) {
for (var i = 0; i < 3; i++) {
var px = x + (i - 1) * 0.65, pz = z + (R() - 0.5) * 0.4;
udwBox(G, 0.6, 0.3, 0.45, UDW_PAL.wood2, px, y + 0.15, pz, R() * 0.3);
udwBox(G, 0.5, 0.06, 0.35, [0x8AA8B0, 0xB0C0C8, 0x6A8890][i], px, y + 0.33, pz, R() * 0.3);
}
udwSolid(A, x, z, 1.0);
}
};
var UDW_PLACES = [
{ name: "west of the Spire Court", at: [123, -749], r: 40, n: 34, kinds: [["caps", 4], ["stalag", 2], ["lantern", 2], ["silk", 1], ["cart", 1], ["crates", 1], ["bench", 2], ["brazier", 1]], folk: "elf", np: 8 },
{ name: "the north Houses", at: [195, -605], r: 40, n: 34, kinds: [["caps", 3], ["stalag", 2], ["lantern", 3], ["bench", 2], ["brazier", 1], ["silk", 1], ["crates", 1]], folk: "elf", np: 8 },
{ name: "by the Halfway Market", at: [96, -468], r: 36, n: 26, kinds: [["caps", 3], ["stalag", 3], ["lantern", 2], ["cart", 2], ["crates", 2]], folk: "gnome", np: 6 },
{ name: "east of the Spire Court", at: [271, -761], r: 40, n: 34, kinds: [["caps", 4], ["stalag", 2], ["lantern", 2], ["silk", 2], ["bench", 2], ["brazier", 1], ["cart", 1]], folk: "elf", np: 8 },
{ name: "south of the Spire Court", at: [190, -861], r: 40, n: 34, kinds: [["caps", 4], ["stalag", 3], ["lantern", 2], ["bench", 1], ["brazier", 1], ["crates", 1], ["silk", 1]], folk: "elf", np: 8 },
{ name: "the cavern road", at: [60, -330], r: 60, n: 18, kinds: [["caps", 3], ["stalag", 4], ["lantern", 2], ["crystal", 2]], folk: "elf", np: 3 },
{ name: "the west cavern", at: [-60, -640], r: 60, n: 18, kinds: [["caps", 4], ["stalag", 3], ["crystal", 2], ["lantern", 1]], folk: "elf", np: 3 },
{ name: "the east cavern", at: [330, -640], r: 60, n: 18, kinds: [["caps", 4], ["stalag", 3], ["crystal", 2], ["lantern", 1]], folk: "elf", np: 3 },
{ name: "the shore of the Sunless Sea", at: [1142, -700], r: 30, n: 24, kinds: [["nets", 2], ["fish", 2], ["crates", 2], ["lamp", 2], ["cart", 1], ["stalag", 1]], folk: "gnome", np: 7, shore: 1 }
];
function udwPick(list, R) { var t = 0, i; for (i = 0; i < list.length; i++)
t += list[i][1]; var r = R() * t; for (i = 0; i < list.length; i++) {
r -= list[i][1];
if (r <= 0)
return list[i][0];
} return list[0][0]; }
function udwMerge(G) { return __ZC(328, 124, this, arguments, new.target); }
function udwFolk(G, P, R, list) { return __ZC(328, 125, this, arguments, new.target); }
function udwPlace(root, P, i) { return __ZC(328, 126, this, arguments, new.target); }
function udwStair(root) { return __ZC(328, 127, this, arguments, new.target); }
function udwStope() { return __ZC(328, 128, this, arguments, new.target); }
function udwSweep() { return __ZC(328, 129, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.underdark;
if (!W)
return;
var b0 = W.build;
W.build = function (G) { var r = b0.apply(this, arguments); try {
udwSweep();
}
catch (e) {
if (window.console)
console.warn("[underdark sweep]", e);
} return r; };
})();
