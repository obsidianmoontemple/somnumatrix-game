/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var VBK_WEAR = {
verne: { cut: "frock", coat: 0x2A2A30, vest: 0x4A3A2A, trou: 0x3A3A40, tie: 0x1A1A1A, hat: null, held: "book" },
fogg: { cut: "frock", coat: 0x1A1A22, vest: 0xE8E0CC, trou: 0x4A4A52, tie: 0x1A1A1A, hat: "tophat", hc: 0x141414, held: "cane" },
passe: { cut: "jacket", coat: 0x6A3A2A, vest: 0xB8302A, trou: 0x4A3A2A, tie: 0x2A2A2A, hat: "bowler", hc: 0x3A2A1E, held: "bag" },
fix: { cut: "jacket", coat: 0x5A5A4A, vest: 0x3A3A30, trou: 0x5A5A4A, tie: 0x6A2A1E, hat: "bowler", hc: 0x2A2A2A, held: "cane" },
aouda: { cut: "sari", coat: 0xE8A030, trim: 0x2A4A8A, hat: "veil", hc: 0xF0D890 },
nemo: { cut: "long", coat: 0x1E2A3A, vest: 0x1E2A3A, trou: 0x1E2A3A, tie: 0x141820, hat: "naval", hc: 0x1A2230, held: "spyglass" },
aronnax: { cut: "frock", coat: 0x5A4A3A, vest: 0x8A7A5A, trou: 0x4A4038, tie: 0x2A2A2A, hat: null, held: "book" },
conseil: { cut: "jacket", coat: 0x3A3A4A, vest: 0x5A5A6A, trou: 0x3A3A4A, tie: 0x1A1A1A, hat: null, held: "book" },
ned: { cut: "sailor", coat: 0x8A3A2A, vest: 0x5A3A2A, trou: 0x3A3A3A, tie: 0x2A2A2A, hat: "cap", hc: 0x5A4A3A, held: "harpoon" },
lidenbrock: { cut: "long", coat: 0x4A3A2A, vest: 0x6A5A3A, trou: 0x3A3A3A, tie: 0x1A1A1A, hat: "brim", hc: 0x3A2A1E, held: "pick" },
axel: { cut: "jacket", coat: 0x4A5A6A, vest: 0x6A6A5A, trou: 0x3A3A3A, tie: 0x2A3A5A, hat: "cap", hc: 0x3A3A4A, held: "lantern" },
hans: { cut: "knit", coat: 0x6A5A4A, vest: 0x8A7A5A, trou: 0x4A4038, hat: "brim", hc: 0x3A3428, held: "staff" },
barbicane: { cut: "frock", coat: 0x1E1E26, vest: 0x2A2A30, trou: 0x1E1E26, tie: 0x141414, hat: "tophat", hc: 0x141414 },
maston: { cut: "frock", coat: 0x3A3A40, vest: 0x5A4A3A, trou: 0x3A3A40, tie: 0x8A1E1E, hat: "tophat", hc: 0x1A1A1A },
nicholl: { cut: "frock", coat: 0x2A3A2A, vest: 0x4A5A3A, trou: 0x2A3A2A, tie: 0x141414, hat: "tophat", hc: 0x1E1E1E },
ardan: { cut: "jacket", coat: 0x8A5A2A, vest: 0xD8C8A0, trou: 0x5A4A3A, tie: 0xC81E1E, hat: "brim", hc: 0x5A3A2A },
fergusson: { cut: "jacket", coat: 0xC8B890, vest: 0xA89870, trou: 0xC8B890, tie: 0x5A4A2A, hat: "pith", hc: 0xEAE2CC, held: "spyglass" },
joe: { cut: "work", coat: null, vest: 0x6A4A2A, trou: 0x4A3A2A, tie: 0x8A2A1E, hat: "brim", hc: 0x8A6A3A },
kennedy: { cut: "jacket", coat: 0x4A5A3A, vest: 0x6A6A4A, trou: 0x4A4A3A, tie: 0x3A2A1E, hat: "brim", hc: 0x4A3A2A, held: "staff" },
robur: { cut: "long", coat: 0x1A1A1A, vest: 0x2A2A2A, trou: 0x1A1A1A, tie: 0x141414, hat: "naval", hc: 0x141414 },
prudent: { cut: "frock", coat: 0x4A3A2A, vest: 0x6A5A3A, trou: 0x3A3028, tie: 0x1A1A1A, hat: "tophat", hc: 0x1E1A16 },
evans: { cut: "frock", coat: 0x2A2A3A, vest: 0x5A5A6A, trou: 0x2A2A3A, tie: 0x1A1A1A, hat: "tophat", hc: 0x1A1A1A },
cyrus: { cut: "jacket", coat: 0x4A4A3A, vest: 0x6A6A5A, trou: 0x3A3A30, tie: 0x2A2A2A, hat: "brim", hc: 0x3A3A30 },
pencroft: { cut: "sailor", coat: 0x2A3A5A, vest: 0xE8E8E8, trou: 0x2A3A5A, tie: 0x1E2A4A, hat: "cap", hc: 0x1E2A4A },
herbert: { cut: "work", coat: null, vest: 0x5A6A3A, trou: 0x4A4A3A, tie: 0x6A3A2A, hat: "cap", hc: 0x5A4A2A },
spilett: { cut: "jacket", coat: 0x6A5A3A, vest: 0x8A7A5A, trou: 0x4A4038, tie: 0x2A2A2A, hat: "brim", hc: 0x4A3A2A, held: "notebook" },
neb: { cut: "work", coat: null, vest: 0x8A6A3A, trou: 0x4A3A2A, tie: 0x8A2A1E, hat: null },
ayrton: { cut: "work", coat: null, vest: 0x5A5040, trou: 0x4A4438, tie: null, hat: null },
captain: { cut: "long", coat: 0x1E2A3A, vest: 0x1E2A3A, trou: 0x1E2A3A, tie: 0x141820, hat: "naval", hc: 0x1A2230 },
diver: { cut: "bare", coat: 0xE8E0D0 },
sailor: { cut: "sailor", coat: 0x1E2A4A, vest: 0xF2F2F2, trou: 0x1E2A4A, tie: 0x1E2A4A, hat: "cap", hc: 0x1E2A4A },
gent: { cut: "frock", coat: null, vest: null, trou: null, tie: null, hat: "tophat", hc: null },
clerk: { cut: "jacket", coat: null, vest: null, trou: null, tie: null, hat: "bowler", hc: null },
lady: { cut: "lady", coat: null, hat: "bonnet", hc: null },
man: { cut: "jacket", coat: null, vest: null, trou: null, tie: null, hat: null },
woman: { cut: "lady", coat: null, hat: null }
};
var VBK_KEYS = { verne: "verne", fogg: "fogg", passe: "passe", barbicane: "barbicane", maston: "maston", ardan: "ardan", fergusson: "fergusson", joe: "joe", robur: "robur",
prudent: "prudent", nemo: "nemo", aronnax: "aronnax", conseil: "conseil", ned: "ned", cyrus: "cyrus", pencroft: "pencroft", herbert: "herbert", spilett: "spilett", neb: "neb",
lidenbrock: "lidenbrock", axel: "axel", hans: "hans", diver: "diver" };
var VBK_ROLE = [
[/^Jules Verne/, "verne"], [/^Phileas Fogg|^Mr\.? Fogg/, "fogg"], [/^Passepartout/, "passe"], [/^(Mr\.? )?Fix\b|^Detective Fix/, "fix"], [/^Aouda|^Mrs\.? Aouda/, "aouda"],
[/^Captain Nemo/, "nemo"], [/^Professor Aronnax/, "aronnax"], [/^Conseil/, "conseil"], [/^Ned Land/, "ned"], [/^Professor (Otto )?Lidenbrock/, "lidenbrock"], [/^Axel/, "axel"], [/^Hans/, "hans"],
[/Barbicane/, "barbicane"], [/Maston/, "maston"], [/Nicholl/, "nicholl"], [/Ardan/, "ardan"], [/Fergusson/, "fergusson"], [/^Joe\b/, "joe"], [/Kennedy/, "kennedy"],
[/^Robur/, "robur"], [/Prudent/, "prudent"], [/Phil Evans/, "evans"], [/^Cyrus Smith/, "cyrus"], [/^Pencroft/, "pencroft"], [/^Herbert/, "herbert"], [/Spilett/, "spilett"], [/^Neb\b/, "neb"],
[/^Ayrton/, "ayrton"], [/old captain|captain of|^Captain\b/i, "captain"], [/pearl diver/i, "diver"], [/sailor|boatman|harbour master|mate\b|steward/i, "sailor"],
[/clerk|porter|guard|conductor|telegraph|Gruber|Fraser|banker|Stuart|Sullivan|Ralph|Fallentin|Flanagan/i, "clerk"]
];
function vbkRoleOf(name, sex) { name = name || ""; for (var i = 0; i < VBK_ROLE.length; i++)
if (VBK_ROLE[i][0].test(name))
return VBK_ROLE[i][1]; return sex === "f" ? "woman" : "man"; }
function vbkWearFor(L, o) { return __ZC(457, 0, this, arguments, new.target); }
function vbkM(col, o) { return typeof wfMat === "function" ? wfMat(col, o) : new THREE.MeshStandardMaterial({ color: col }); }
function vbkG(k, mk) { return typeof wfGeo === "function" ? wfGeo("vbk-" + k, mk) : mk(); }
var VBK_HAT = {
bowler: function (add, c) { return __ZC(457, 1, this, arguments, new.target); },
naval: function (add, c) { return __ZC(457, 2, this, arguments, new.target); },
pith: function (add, c) { return __ZC(457, 3, this, arguments, new.target); },
veil: function (add, c) { var m = new THREE.Mesh(vbkG("veil", function () { return new THREE.SphereGeometry(0.15, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.7); }), vbkM(c, { r: 1 })); m.material.side = THREE.DoubleSide; m.scale.set(1.05, 1.25, 1.15); m.rotation.x = -0.3; add("Head", [0, 0.08, -0.05], m); }
};
var VBK_HELD = {
cane: function (add) { return __ZC(457, 4, this, arguments, new.target); },
bag: function (add) { var b = new THREE.Mesh(vbkG("bag", function () { return new THREE.BoxGeometry(0.3, 0.2, 0.12); }), vbkM(0x6A2A1E, { r: 0.9 })); add("hand_l", [0, -0.14, 0], b); },
harpoon: function (add) { return __ZC(457, 5, this, arguments, new.target); },
spyglass: function (add) { return __ZC(457, 6, this, arguments, new.target); },
pick: function (add) { return __ZC(457, 7, this, arguments, new.target); },
notebook: function (add) { var b = new THREE.Mesh(vbkG("note", function () { return new THREE.BoxGeometry(0.1, 0.14, 0.02); }), vbkM(0x5A2A1E, { r: 0.8 })); add("hand_l", [0, -0.06, 0.04], b); }
};
function vbkProps(add, c, E) { return __ZC(457, 8, this, arguments, new.target); }
(function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined")
return;
WDR_COST.oz_vbk = { rb: 1, ownHead: true, look: { hat: "none", role: "" }, props: function (add, c, E) { try {
vbkProps(add, c, E);
}
catch (e) {
if (window.console)
console.warn("[vbk] props", e);
} } };
OZ_WEAR.oz_vbk = function (L, o) { return vbkWearFor(L, o); };
})();
function vbkRoleFor(seed, look) { return __ZC(457, 9, this, arguments, new.target); }
(function () {
if (typeof wPerson !== "function")
return;
var w0 = wPerson;
wPerson = function (seed, o) {
o = o || {};
if (/^vrn_/.test(String(seed)) && !o.ozCos && !o.noCos && !o.child && typeof WDR_COST !== "undefined" && WDR_COST.oz_vbk) {
var look = Object.assign({}, o.look || {});
look._vb = vbkRoleFor(seed, look);
o = Object.assign({}, o, { ozCos: "oz_vbk", look: look });
var g = w0.call(this, seed, o);
try {
g.userData.vbRole = look._vb;
}
catch (e) { }
return g;
}
return w0.call(this, seed, o);
};
})();
var VBK_CH = [];
var VBK = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, texts: {} };
var VBK_BOOKS = { voy: { k: "voy", title: "The Extraordinary Voyages", icon: "📕", store: "vbook", text: "data/verne/voyages.json", ch: VBK_CH,
by: "Jules Verne · Around the World in Eighty Days, Twenty Thousand Leagues Under the Sea, A Journey to the Centre of the Earth, From the Earth to the Moon, Five Weeks in a Balloon, Robur the Conqueror, The Mysterious Island",
blurb: "Jules Verne keeps the book of his voyages in his house on the quay: Phileas Fogg's wager, Captain Nemo and the Nautilus, Professor Lidenbrock's descent, the Gun Club's shot at the Moon, Dr Fergusson's balloon, Robur's Albatross and the castaways of Lincoln Island. A tour of them all, a chapter from each, as he wrote it.",
begin: "Verne's house on the quay" } };
var VBK_BK = "voy";
function vbkBook() { return VBK_BOOKS[VBK_BK] || VBK_BOOKS.voy; }
function vbkUse(k) { if (!VBK_BOOKS[k] || VBK_BK === k)
return; try {
vbkItemsClear();
vbkCastClear();
}
catch (e) { } VBK_BK = k; VBK_CH = VBK_BOOKS[k].ch; VBK.text = VBK.texts[k] || null; VBK.textWait = null; VBK.rew = {}; VBK.readOpen = 0; VBK.readAsk = 0; VBK.puzOpen = 0; try {
store.vbookOn = k;
}
catch (e) { } }
function vbkS() { var key = vbkBook().store; if (!store[key])
store[key] = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0 }; var S = store[key]; S.f = S.f || {}; S.keeps = S.keeps || []; return S; }
function vbkSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function vbkStep() { var S = vbkS(), C = VBK_CH[S.ch]; return C ? C.steps[S.s] : null; }
function vbkActive() { var S = vbkS(); return !!(S.started && !S.done && WLD.on === VRN_KEY); }
function vbkSay(h) { setStatus(h); }
function vbkEsc(t) { return typeof esc === "function" ? esc(t) : String(t); }
function vbkNum(i) { var C = VBK_CH[i]; return C && C.n ? C.n : (i + 1); }
function vbkKey() { var S = vbkS(); return S.done ? "done" : S.ch + "." + S.s; }
function vbkGround(x, z) { if (x >= VRN_IN_X - 1000)
return vrnGround(x, z, 2); var l = vrnLand(x, z); return vrnGround(x, z, l + 2.5); }
function vbkAreaAt(x, z) {
var I = vrnInAt(x, z);
if (I)
return "in:" + I.key;
var Z = vrnZoneAt(x, z == null ? 0 : z);
if (Z === "inside")
return "in:?";
if (Z === "under" || Z === "galleries")
return "under";
if (Z === "island" || Z === "farwest" || Z === "serpentine")
return "island";
if (Z === "africa" || Z === "race" || Z === "sky")
return Z;
return "home";
}
function vbkArea() { var L = worldLocal(); return vbkAreaAt(L.x, L.z); }
function vbkLoc(g) {
if (g && g.updateWorldMatrix) {
try {
g.updateWorldMatrix(true, false);
}
catch (e) { }
var e = g.matrixWorld.elements;
return { x: e[12] - VRN.base, z: e[14], y: e[13] };
}
return g && g.position ? { x: g.position.x, z: g.position.z, y: g.position.y } : null;
}
function vbkNamed(list, name, room) { return __ZC(457, 10, this, arguments, new.target); }
function vbkRoomPt(key, lx, lz, ly) { var I = VRN_IN[key]; if (!I)
return null; var A = I.arrive || [0, 0, 0]; return { x: I.x + (lx != null ? lx : A[0]), z: (I.z || 0) + (lz != null ? lz : A[1]), y: ly != null ? ly : (lx == null && A[4] != null ? A[4] : 0), area: "in:" + key }; }
function vbkPos(at) { return __ZC(457, 11, this, arguments, new.target); }
function vbkDist(P, L) { return Math.hypot(P.x - L.x, P.z - L.z); }
var VBK_DOORS = { palace: "The Palace of the Exposition", reform: "The Reform Club", verne: "Verne's house", gunclub: "The Gun Club", society: "The Geographical Society",
weldon: "The Weldon Institute", nautilus: "The Nautilus, at her mooring", granite: "Granite House, high in the cliff", dakkar: "A sea cave in the black rocks" };
function vbkSpotPt(nm, area) {
var best = null;
VRN.spots.forEach(function (S) {
if (best || S.name !== nm)
return;
var a = vbkAreaAt(S.x, S.z);
if (area && a !== area)
return;
best = { x: S.x, z: S.z, y: S.y != null ? S.y : vbkGround(S.x, S.z), area: a };
});
return best;
}
function vbkRoomDoor(k) { var nm = VBK_DOORS[k]; return nm ? vbkSpotPt(nm) : null; }
function vbkRoomExit() { return __ZC(457, 12, this, arguments, new.target); }
var VBK_LINKS = {};
function vbkLink(from, toArea) { return __ZC(457, 13, this, arguments, new.target); }
function vbkWayTo(P, area) { return __ZC(457, 14, this, arguments, new.target); }
function vbkWay(P, L) { return __ZC(457, 15, this, arguments, new.target); }
function vbkBeam() { return __ZC(457, 16, this, arguments, new.target); }
function vbkItemMesh(kind) { return __ZC(457, 17, this, arguments, new.target); }
function vbkItemsClear() { VBK.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = VRN.spots.indexOf(I.S); if (j >= 0)
VRN.spots.splice(j, 1); }); VBK.items = []; }
function vbkItemAdd(kind, P, name, verb, onTake) { return __ZC(457, 18, this, arguments, new.target); }
var VBK_TUNES = { danube: "assets/grimm/danube.mp3", toccata: "assets/verne/toccata.mp3", mountain: "assets/neverland/mountain-king.mp3",
post: "assets/verne/yankee-doodle.mp3", hebrides: "assets/verne/hebrides.mp3", moon: "assets/verne/moonlight.mp3" };
function vbkTune(k) { return __ZC(457, 19, this, arguments, new.target); }
function vbkText(fn) { return __ZC(457, 20, this, arguments, new.target); }
function vbkPassage(B, i) { return B && B.ch && B.ch[i] ? B.ch[i] : null; }
function vbkParaHtml(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + vbkEsc(p) + "</p>"; }
function vbkOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100) {
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
}
out.push(p);
n += p.length;
} return out; }
function vbkReadAll(i) { return __ZC(457, 21, this, arguments, new.target); }
function vbkChapterCard() { return __ZC(457, 22, this, arguments, new.target); }
function vbkKeeperBtns(fns) { return __ZC(457, 23, this, arguments, new.target); }
function vbkJump(i) { var S = vbkS(); S.ch = Math.max(0, Math.min(VBK_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; vbkSave(); vbkChapterBegin(true); }
function vbkChapterBegin(place) {
var S = vbkS(), C = VBK_CH[S.ch];
if (!C)
return;
vbkItemsClear();
vbkCastClear();
VBK.hold = 0;
if (place && C.start)
vbkPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[vbk] setup", S.ch, e);
}
vbkTune(C.tune || null);
vbkStepBegin();
}
function vbkPlaceAt(st) {
var P = vbkPos(st);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
var k = P.area.slice(3);
if (VRN.insideOf && VRN.insideOf.key === k)
return;
vrnEnter(k);
return;
}
vrnMove(P.x, P.z, st.ry != null ? st.ry : null, null);
}
function vbkStepBegin() { return __ZC(457, 24, this, arguments, new.target); }
function vbkPuzzleCard(b) { return __ZC(457, 25, this, arguments, new.target); }
function vbkStepDone() { return __ZC(457, 26, this, arguments, new.target); }
function vbkFinish() { return __ZC(457, 27, this, arguments, new.target); }
function vbkOpen(k) { return __ZC(457, 28, this, arguments, new.target); }
function vbkBegin() {
if (WLD.on !== VRN_KEY) {
setStatus(vbkBook().icon + " <b>" + vbkEsc(vbkBook().title) + "</b> is walked in Jules Verne's World. Its door is in the Hall of Doors.");
return;
}
var S = vbkS();
S.started = 1;
vbkSave();
vbkChapterBegin(true);
}
function vGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function vTalk(who, h, card, o) { return Object.assign({ k: "talk", who: who, at: Object.assign({ who: who }, (o && o.room) ? { room: o.room } : {}), h: h, card: card }, o || {}); }
function vSpot(name, h, o) { return Object.assign({ k: "spot", spot: name, at: Object.assign({ spot: name }, (o && o.room) ? { room: o.room } : {}), h: h }, o || {}); }
function vRew(kind, spot, h, o) { return Object.assign({ k: "reward", kind: kind, at: spot ? (typeof spot === "string" ? Object.assign({ spot: spot }, (o && o.room) ? { room: o.room } : {}) : spot) : null, h: h }, o || {}); }
function vFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function vGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function vHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function vUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function vRead() { return { k: "read" }; }
function vCard(title, html, btn) { return [title, html, btn]; }
function vCast(list) { return function (f) { list.forEach(function (c) { vbkPerson(c); }); }; }
function vToRoom(key, msg) { return function (next) { vrnEnter(key); if (msg)
setTimeout(function () { setStatus(msg); }, 900); setTimeout(next, 1300); }; }
function vToPlace(x, z, yaw, msg, y) { return function (next) { vrnMove(x, z, yaw, msg, y, { fn: function () { setTimeout(next, 300); } }); }; }
function vPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function vSpotAt(k, dx, dz) { return { at: k, dx: dx || 0, dz: dz || 0 }; }
function vOut(h, o) { return Object.assign({ k: "until", test: function () { return !VRN.insideOf; }, at: function () { return vbkRoomExit(); }, h: h, sim: function () { var I = VRN.insideOf; if (I)
vrnLeave(I.key); } }, o || {}); }
VBK_CH.push({ t: "Verne opens the book", src: "Around the World in Eighty Days", tune: "danube", keep: ["vbk_pen", "Verne's steel pen", "🖋️"],
start: { spot: "Verne's house" }, intro: "The quay of the Voyages, and the round-towered house at its corner",
steps: [
vRead(),
vSpot("Verne's house", "Go into Verne's house on the quay: the round-towered corner house."),
vTalk("Jules Verne", "Find Jules Verne at his desk in the Library of the Voyages.", vCard("🖋️ Jules Verne", "'Ah, a reader! Sit, sit. I keep a card for every fact I ever read: twenty thousand cards, and every one of them is in a book now. Here is the one I am proudest of: <i>The Extraordinary Voyages</i>. Every voyage I ever wrote, from the Reform Club to the bottom of the sea, from Iceland to the Moon. You shall make them all, the way my people made them. Start where I would start: with an Englishman and his clock.'", "▶ Take the book"), { room: "verne" }),
vSpot("The catalogue of the Voyages", "Look through the catalogue of the Voyages: every book Verne wrote, in order.", { room: "verne" }),
vFind("notebook", { room: "verne", lx: -31, lz: 22.5 }, "Verne's notebook of facts", "Verne's notebook is on his desk, by the fact cards. Pick it up: you will need it.", { room: "verne" }),
vPuzzle("🃏 One of Verne's cards", "'Here's one from my box. Mr Fogg says a man can now go round the world in eighty days. The Daily Telegraph worked it out: London to Suez, Bombay, Calcutta, Hong Kong, Yokohama, San Francisco, New York, London. Which way round does he go?'", ["East, with the Sun coming to meet him", "West, chasing the Sun", "Over the North Pole"], 0, ["", "West would be the other way round: Fogg goes out through Suez and India, east.", "No one went over the Pole in 1872, not even in my books... yet."], { yes: "✓ East: London, Suez, Bombay, round to New York and home. Remember that it is east: it matters at the very end." }),
vOut("Out onto the quay. Verne's house door."),
vSpot("The Globe of the Voyages", "Walk to the Globe of the Voyages on the quay and see where every voyage begins."),
vGo({ spot: "The Reform Club" }, "Walk along the quay to the Reform Club: Pall Mall, London, in Verne's harbour.", { r: 7 })
] });
VBK_CH.push({ t: "The wager", src: "Around the World in Eighty Days", tune: "danube", keep: ["vbk_card", "A card from Fogg's whist table", "🃏"],
start: { spot: "The Reform Club" }, intro: "The Reform Club, Pall Mall, 2 October 1872",
cast: [{ key: "stuart", name: "Andrew Stuart", role: "gent", at: { room: "reform", lx: -12, lz: -14 }, ry: 0.8, persona: "Andrew Stuart, engineer, member of the Reform Club, 1872: brusque, sceptical, sure Fogg's wager is madness. He bets four thousand pounds against him.", greet: "Eighty days! Including bad weather, shipwrecks, railway accidents? Absurd." },
{ key: "ralph", name: "Gauthier Ralph", role: "gent", at: { room: "reform", lx: -4, lz: -14 }, ry: -0.8, persona: "Gauthier Ralph, a director of the Bank of England, Reform Club, 1872: worried about the fifty-five thousand pounds stolen from the Bank that very week.", greet: "Have you heard? Fifty-five thousand pounds, taken from the Bank's own counter. The thief won't get far." },
{ key: "sullivan", name: "John Sullivan", role: "gent", at: { room: "reform", lx: -10, lz: -19 }, ry: 0.2, persona: "John Sullivan, banker, Reform Club, 1872: a calm man of figures who has the Daily Telegraph's estimate of the eighty days by heart.", greet: "The Daily Telegraph has it worked out to the day, you know." }],
steps: [
vRead(),
vSpot("The Reform Club", "Go into the Reform Club."),
vTalk("Gauthier Ralph", "Listen to Gauthier Ralph at the whist table: the news of the bank robbery.", vCard("🏦 The robbery", "'Fifty-five thousand pounds, gentlemen, taken from the cashier's table of the Bank of England. A well-dressed gentleman, they say. The detectives are watching every port: Liverpool, Glasgow, Havre, Suez, Brindisi, New York. Where could he go?'", "▶ 'The world is big enough'"), { room: "reform" }),
vTalk("Andrew Stuart", "Andrew Stuart thinks the thief will get away: the world is big enough.", vCard("🃏 Stuart", "'It was once,' says Mr Fogg quietly, not looking up from his cards. 'The world has grown smaller. A man can now go round it in eighty days.' Stuart lays down his cards. 'I would like to see you do it, in eighty days.' 'It depends on you. Shall we go?'", "▶ Go on"), { room: "reform" }),
vTalk("Phileas Fogg", "Hear Phileas Fogg make the wager at his table.", vCard("🎩 The wager", "'I will wager twenty thousand pounds against anyone who wishes, that I will make the tour of the world in eighty days or less: nineteen hundred and twenty hours, or a hundred and fifteen thousand two hundred minutes. Do you accept?' 'We accept.' 'Good. The train leaves for Dover at a quarter before nine. I will take it. This is Wednesday, the 2nd of October. I shall be due in London, in this very room of the Reform Club, on Saturday, the 21st of December, at a quarter before nine p.m.; or else the twenty thousand pounds, now deposited in my name at Baring's, will belong to you.'", "▶ 'Diamonds are trumps'"), { room: "reform" }),
vTalk("John Sullivan", "John Sullivan has the Daily Telegraph's figures. Ask him how the eighty days add up.", vCard("📰 The Daily Telegraph", "London to Suez, by rail and steamboat: 7 days. Suez to Bombay, steamer: 13. Bombay to Calcutta, rail: 3. Calcutta to Hong Kong, steamer: 13. Hong Kong to Yokohama: 6. Yokohama to San Francisco: 22. San Francisco to New York, rail: 7. New York to London, steamer and rail: 9. <b>Total: 80 days.</b> 'All included,' says Mr Fogg, and plays on.", "▶ Add them up"), { room: "reform" }),
vPuzzle("🧮 Eighty days", "7 + 13 + 3 + 13 + 6 + 22 + 7 + 9. The Telegraph says eighty. Is it?", ["78", "80", "82"], 1, ["Count again: 7 and 13 is 20, and 3 is 23, and 13 is 36...", "", "Count again: 7 and 13 is 20, and 3 is 23, and 13 is 36..."], { yes: "✓ Eighty exactly, with not an hour to spare for bad weather. Mr Fogg allows for none." }),
vFind("card", { room: "reform", lx: -8, lz: -13 }, "A card from the whist table", "The hand is finished. Pick up a card from Fogg's whist table, for luck.", { room: "reform" }),
vSpot("The race board", "Look at the race board: who has made the voyage, and how fast.", { room: "reform" }),
vOut("Out onto Pall Mall. Passepartout is waiting with the carpet bag.")
] });
VBK_CH.push({ t: "Passepartout and Mr Fix", src: "Around the World in Eighty Days", tune: "danube", keep: ["vbk_bag", "Passepartout's carpet bag tag", "🧳"],
start: { who: "Passepartout" }, intro: "Pall Mall, then the steamer quay at Suez",
cast: [{ key: "fix", name: "Mr Fix", role: "fix", at: { spot: "The harbour master's board", ox: 6, oz: -4 }, ry: 0, persona: "Mr Fix, a detective of Scotland Yard, 1872: thin, sharp-eyed, nervous, certain that Phileas Fogg is the Bank robber. He follows Fogg round the world waiting for a warrant, and tries to win Passepartout's trust over a drink.", greet: "Excuse me, sir... you wouldn't happen to be travelling with a Mr Fogg? An English gentleman, very exact? Just a friendly question." },
{ key: "consul", name: "The British consul at Suez", role: "gent", at: { spot: "The ship chandler's", ox: -6, oz: 4 }, ry: 0, persona: "The British consul at Suez, 1872: a fair, unhurried official who signs passports and will not refuse a visa to an honest traveller just because a detective wants him delayed.", greet: "Passports? Of course. Every traveller's paper gets my stamp, if it's in order." }],
steps: [
vRead(),
vTalk("Passepartout", "Talk with Passepartout outside the Reform Club. He has just been told they leave in ten minutes.", vCard("🧳 Passepartout", "'Round the world! In eighty days! And I who wanted a quiet life! Monsieur has put twenty thousand pounds in banknotes in this carpet bag. \"Take care of it,\" he says. Take care of it! I shall hold it like my own heart.' And in his hurry, he has left the gas burning in his room, at his own cost, all the way round.", "▶ Off to Charing Cross"), {}),
vSpot("The Gare des Voyages", "Walk to the station on the quay: the Dover train, a quarter before nine. (Then on by the steamer: Paris, Mont Cenis, Brindisi, Suez.)"),
vTalk("Mr Fix", "Seven days later, the quay at Suez. A thin, nervous man is watching every passenger off the steamer Mongolia.", vCard("🕵️ Mr Fix", "'I am Fix, of Scotland Yard. The robber, gentleman-like, is coming through Suez, I'd wager my place on it. If he's on the Mongolia, I'll know him. And here comes his servant, with a passport to be signed.' He studies Passepartout as a cat studies a mouse.", "▶ 'Where is your master?'"), {}),
vTalk("The British consul at Suez", "Fix asks the consul to refuse the visa. Go with them to the consul.", vCard("📜 The visa", "'I can't refuse a visa to an honest man's passport,' says the consul. Fix bites his lip: there is no warrant yet. Mr Fogg arrives, has his passport stamped with perfect calm, and goes back on board. Fix sends a telegram to London: <i>Have found the bank robber, Phileas Fogg. Send without delay warrant of arrest to Bombay.</i>", "▶ Go on"), {}),
vFind("telegram", { spot: "The harbour master's board", ox: 3, oz: 3 }, "Fix's telegram to London", "Fix has dropped the copy of his telegram on the quay. Pick it up and read it.", {}),
vPuzzle("🗺️ Suez", "Mr Fogg's notebook: <i>Left London Wednesday, October 2nd, 8.45 p.m. Reached Suez Wednesday, October 9th, 11 a.m. Total hours: 158½; or, in days, six days and a half.</i> Is he ahead of the Telegraph's plan, or behind?", ["Ahead: the plan allows 7 days to Suez", "Behind: the plan allows 6 days to Suez", "Exactly on time"], 0, ["", "Look again at the Telegraph: London to Suez, 7 days.", "Six and a half is not seven."], { yes: "✓ Half a day ahead. 'Neither gain nor loss,' writes Fogg. He writes it all down." }),
vTalk("Passepartout", "Passepartout is going ashore to buy shirts. Warn him about the friendly stranger.", vCard("🧳 Passepartout", "'Monsieur Fix? A charming fellow! He showed me the canal and the town. He asks a great deal about Monsieur, it's true... Bah, everyone is curious about an Englishman who goes round the world for a bet.' The Mongolia's whistle blows: on to Aden and Bombay.", "▶ All aboard"), {}),
vHold({ spot: "The harbour master's board" }, 8, "Watch the Mongolia steam out of the harbour towards the Red Sea, with Fix on board too.")
] });
VBK_CH.push({ t: "Eighty days", src: "Around the World in Eighty Days", tune: "danube", keep: ["vbk_watch", "A pocket watch set to London time", "⌚"],
start: { spot: "The Reform Club" }, intro: "Round the world, and the day that was found",
cast: [{ key: "aouda", name: "Aouda", role: "aouda", sex: "f", at: { room: "reform", lx: 6, lz: -4 }, ry: -0.5, persona: "Aouda, a Parsee lady of Bombay, educated in England, rescued by Fogg and Passepartout in India from a forced death on a funeral pyre. Brave, gentle and clever, she travels round the world with them and in the end marries Phileas Fogg.", greet: "Mr Fogg saved my life in Bundelcund. I have seen him calm through storms, a typhoon and an attack on a train. I think he is the best man in the world." },
{ key: "fix3", name: "Mr Fix", role: "fix", at: { room: "reform", lx: 14, lz: 6 }, ry: -1.6, persona: "Mr Fix, the detective, at the end of the voyage, ashamed: he arrested Fogg in Liverpool on the wrong man's description, and the real thief had been caught three days before.", greet: "I... I was wrong. Tell him I was wrong." }],
steps: [
vRead(),
vSpot("The Reform Club", "The voyage itself: go into the Reform Club and take Fogg's wager for yourself."),
vRew("race", "Phileas Fogg's table", "Make the race round the world from Fogg's table: London, Suez, India, Hong Kong, Yokohama, San Francisco, New York, home, in under eighty days.", { room: "reform" }),
vTalk("Aouda", "Aouda is waiting in the Club. Ask her what happened in India.", vCard("🐘 Bundelcund", "'The railway stopped: the line was not finished. Mr Fogg bought an elephant, Kiouni, for two thousand pounds, and we crossed the forest. That night they found me: drugged, to be burned beside my dead husband's body on the pyre. Passepartout took the dead man's place under the shroud, rose up in the smoke, and carried me out before them all. They thought he was the dead raja come back. Then we ran.'", "▶ Go on"), { room: "reform" }),
vTalk("Mr Fix", "Mr Fix has something to say.", vCard("🕵️ Liverpool", "'I arrested him at Liverpool, with my warrant, on the 21st of December, at twenty minutes before twelve. The robber, Fogg? The real thief was taken at Edinburgh three days before. I let him go at half past two. He knocked me down; I deserved it. But the train to London had gone. He came in at ten minutes to nine. Five minutes too late.'", "▶ Go on"), { room: "reform" }),
vHold({ room: "reform", lx: 0, lz: 10 }, 10, "Sit with the lost wager a moment. Twenty thousand pounds, gone; everything Fogg had left, gone."),
vTalk("Passepartout", "Next day: Passepartout runs out to the clergyman to arrange Fogg's wedding to Aouda. And comes running back.", vCard("📅 The day found", "'My master! Tomorrow... impossible! The wedding... Today is Saturday!' 'Saturday? Impossible!' 'Yes, yes! You have made a mistake of one day! We arrived twenty-four hours ahead of time; but there are only ten minutes left!' Fogg had gone east, toward the Sun, and so the days had been shorter by four minutes for each degree: three hundred and sixty degrees, twenty-four hours.", "▶ Run to the Club"), {}),
vPuzzle("🌍 Why?", "Going east round the world, each day is about four minutes shorter than at home. How much do the minutes add up to, all the way round?", ["Twenty-four minutes", "Twenty-four hours: a whole day", "Nothing at all"], 1, ["Four minutes, three hundred and sixty times...", "", "Every degree east, the Sun comes four minutes sooner."], { yes: "✓ 360 × 4 = 1,440 minutes = 24 hours. Fogg saw 80 sunrises; London saw only 79 days." }),
vGo({ room: "reform", lx: 0, lz: 20 }, "Into the Reform Club's great saloon, as the clock strikes. 8.44... 8.45...", { r: 8 }),
vTalk("Phileas Fogg", "He is there. Speak to Mr Fogg.", vCard("⌚ A quarter before nine", "'Here I am, gentlemen!' Fifty-seven seconds after twenty minutes past eight, he came through the door. Phileas Fogg had won his wager of twenty thousand pounds. He had spent nearly nineteen thousand on the way: he gained little but the journey. And Aouda, who became his wife.", "▶ Close the chapter"), { room: "reform" })
] });
VBK_CH.push({ t: "The monster of the seas", src: "Twenty Thousand Leagues under the Sea", tune: "toccata", keep: ["vbk_shell", "A shell from Nemo's museum", "🐚"],
start: { spot: "The Geographical Society" }, intro: "1866: something enormous in the sea",
cast: [{ key: "aron4", name: "Professor Aronnax", role: "aronnax", at: { room: "society", lx: -6, lz: -6 }, ry: 0.4, persona: "Pierre Aronnax, professor at the Museum of Natural History in Paris, 1867: a careful naturalist, author of 'The Mysteries of the Great Submarine Grounds', who thinks the sea monster is a giant narwhal. He is invited aboard the frigate Abraham Lincoln to hunt it.", greet: "A narwhal of enormous size, I should say: sixty yards long, with a horn of steel. But we shall see." },
{ key: "farr", name: "Commander Farragut", role: "captain", at: { room: "society", lx: 6, lz: -6 }, ry: -0.4, persona: "Commander Farragut of the American frigate Abraham Lincoln, 1867: a good seaman who believes in the monster as he believes in God, and has sworn to rid the seas of it.", greet: "The Abraham Lincoln sails from Brooklyn tonight. Are you with us?" }],
steps: [
vRead(),
vSpot("The Geographical Society", "Go into the Geographical Society, where the papers are full of the monster."),
vTalk("Professor Aronnax", "Professor Aronnax has written an article about the monster. Ask him what it is.", vCard("🐋 A giant narwhal?", "'In 1866 ships saw a long object, phosphorescent, far larger and faster than a whale. The Scotia was holed below the waterline: a triangular hole, clean as if cut by a tool. A hole in iron plates an inch and a half thick! Only a narwhal of extraordinary size, with a horn of steel, could do it. That is my view; I have published it.'", "▶ Go on"), { room: "society" }),
vTalk("Commander Farragut", "Commander Farragut invites the Professor aboard the Abraham Lincoln.", vCard("⚓ The invitation", "'Sir, if you will consent to join the Abraham Lincoln in this expedition, the Government of the United States will with pleasure see France represented in the enterprise.' Three seconds later the Professor said yes. 'Conseil!' he called, 'we leave in two hours.'", "▶ To the ship"), { room: "society" }),
vSpot("The examiners' desk", "Before you go, the Society's examiners want to know you can find your way at sea.", { room: "society" }),
vOut("Out of the Society."),
vTalk("Ned Land", "Down at the Nautilus dock, the harpooner Ned Land. In the book he is the 'king of harpooners', and does not believe in narwhals.", vCard("🔱 Ned Land", "'A narwhal? Bah. A whale, maybe. I've struck two hundred of them. But a fish that cuts through iron? I'll believe it when my harpoon finds it.' Three months later, off Japan, the thing was found. Ned's harpoon struck it and rang, as if against metal. Then a blow, and the Professor was in the sea.", "▶ Go on"), {}),
vTalk("Conseil", "Conseil, the Professor's faithful servant, jumped in after him. Hear how it ended.", vCard("🌊 On the back of the monster", "'If master would be so good as to lean on my shoulder, master would swim much better.' They swam all night. At dawn they found Ned Land, sitting on the back of the monster. It was not an animal. It was made of iron plates, bolted together. And then the plates opened, and eight men in masks drew them inside.", "▶ Inside"), {}),
vFind("shell", { spot: "The Nautilus, at her mooring", ox: 3, oz: -2 }, "A shell washed up on the jetty", "A shell on the jetty by the iron hull. Pick it up.", {}),
vSpot("The Nautilus, at her mooring", "Go aboard the Nautilus.")
] });
VBK_CH.push({ t: "Aboard the Nautilus", src: "Twenty Thousand Leagues under the Sea", tune: "toccata", keep: ["vbk_motto", "Nemo's motto: Mobilis in Mobili", "Ⓝ"],
start: { room: "nautilus" }, intro: "The Nautilus, all by electricity",
steps: [
vRead(),
vTalk("Captain Nemo", "Captain Nemo receives you in the great salon.", vCard("Ⓝ Captain Nemo", "'I am not what you call a civilised man! I have done with society entirely. I do not obey its laws. I am Captain Nemo, and you are on board the Nautilus. You are free here, but only as I allow; you may never leave.' He shows you his salon: twelve thousand books, the paintings of the masters, the sea's treasures in glass cases. 'The sea is everything. In it is supreme tranquillity. The sea does not belong to despots.'", "▶ 'Mobilis in Mobili'"), { room: "nautilus" }),
vSpot("The library of the Nautilus", "Look at the library: every book of science, none about politics.", { room: "nautilus" }),
vSpot("Nemo's organ", "Listen at Nemo's organ. In the book he plays alone at night, to no one.", { room: "nautilus" }),
vSpot("The engine room", "Ask how she is driven: 'all by electricity'.", { room: "nautilus" }),
vPuzzle("⚡ All by electricity", "Nemo: 'There is a powerful agent, obedient, rapid, easy, which conforms to every use and reigns supreme on board. Everything is done by means of it. It lights, warms, and is the soul of my mechanical apparatus.' What is it?", ["Steam from coal", "Electricity", "Wind in sails"], 1, ["The Nautilus burns no coal and needs no air for a fire.", "", "She sails under the sea: no sails."], { yes: "✓ Electricity, made from sodium and mercury batteries, the sodium taken from sea salt. 'The sea itself gives me the means.'" }),
vSpot("The Nautilus's wheel", "Stand at the Nautilus's wheel, in the pilot's cage.", { room: "nautilus", wait: 0 }),
vUntil(function () { return !VRN.ride || VRN.ride.k !== "sub"; }, { room: "nautilus", lx: -52, lz: 0 }, "If you took the wheel, sail her a while, and bring her back when you're ready.", { sim: function () { vrnEndAll(); } }),
vTalk("Professor Aronnax", "Professor Aronnax is keeping his journal. Ask what he makes of the captain.", vCard("📖 Aronnax", "'What is he, this Nemo? A genius, certainly; a man of science. And a man who hates. When he speaks of the land, his face goes hard. There is some great wrong in his past, I am sure of it. And yet he weeps over his drowned sailors, and buries them under the coral, where the sharks cannot reach them.'", "▶ Go on"), { room: "nautilus" }),
vGather("coral", { room: "nautilus", lx: -10, lz: 0 }, 3, "A piece of coral from Nemo's cabinets", "Nemo lets you hold three pieces of his coral, from three oceans. Find them by the salon windows.", { room: "nautilus", spread: 4 }),
vHold({ room: "nautilus", lx: -10, lz: 0 }, 10, "Stand at the salon's great windows as the iron shutters slide back, and watch the sea go by, lit by the Nautilus's lamp.")
] });
VBK_CH.push({ t: "A walk on the bottom of the sea", src: "Twenty Thousand Leagues under the Sea", tune: "toccata", keep: ["vbk_pearl", "A seed pearl from the bank of Ceylon", "⚪"],
start: { room: "nautilus" }, intro: "The forest of Crespo, the pearl bank, the Deep",
steps: [
vRead(),
vTalk("Captain Nemo", "Nemo has an invitation: a hunt in the forests of the island of Crespo. Under the sea.", vCard("✉️ A note of invitation", "<i>Captain Nemo invites Professor Aronnax to a hunting party, which will take place tomorrow morning in the forests of the island of Crespo.</i> 'A forest? Under the sea? And you go on foot?' 'On foot, and without getting wet. The diving dress: a reservoir of air on the back, a copper helmet, and a Ruhmkorff lamp at the belt.'", "▶ Put on the diving dress"), { room: "nautilus" }),
vSpot("The diving chamber", "Go to the diving chamber at the stern and put on a diving suit.", { room: "nautilus", wait: 0 }),
vUntil(function () { return !!VRN.dive; }, { room: "nautilus", lx: 50, lz: 0 }, "Into the copper helmet, and out onto the sea bed.", { sim: function () { vrnDive(true, true); } }),
vHold(function () { return VRN.dive ? (function () { var L = worldLocal(); return { x: L.x, z: L.z }; })() : null; }, 10, "Stand on the sea bed and look up: the sun through thirty feet of water, every colour of the rainbow on the sand.", { r: 30 }),
vUntil(function () { return !VRN.dive; }, null, "Walk the sea bed as long as you like; then come back aboard (or take the suit off at the locker).", { sim: function () { vrnDive(false, true); } }),
vRew("tour", "The great salon's windows", "Back aboard: ask Captain Nemo for his grand tour from the salon windows. Torres Strait, the coral cemetery, the forest, the pearl bank of Ceylon, the Arabian Tunnel, Atlantis, Vigo Bay, the South Pole, the giant squid.", { room: "nautilus" }),
vTalk("Captain Nemo", "Ask Nemo about the pearl diver at Ceylon, and the shark.", vCard("🦈 The pearl diver", "'A poor Indian, diving for pearls with a stone between his feet, a minute at a time, for a few coins. A shark came at him. I went between them with my dagger.' He gave the diver a bag of pearls and said nothing more. 'That Indian, Professor, is an inhabitant of an oppressed country; and I am still, and shall be, to my last breath, one of them!'", "▶ Go on"), { room: "nautilus" }),
vFind("shell", { room: "nautilus", lx: -14, lz: 3 }, "A seed pearl in a shell", "A seed pearl, small as a lentil, in a shell on the salon table. Nemo nods: keep it.", { room: "nautilus" }),
vHold({ room: "nautilus", lx: -3, lz: -2 }, 8, "Stand by the organ and listen. The captain is playing, late, alone.")
] });
VBK_CH.push({ t: "The Maelstrom", src: "Twenty Thousand Leagues under the Sea", tune: "toccata", keep: ["vbk_journal", "Aronnax's journal, saved from the sea", "📔"],
start: { room: "nautilus" }, intro: "Off the coast of Norway, May 1868",
cast: [{ key: "fisher", name: "A Lofoten fisherman", role: "sailor", at: { at: "lighthouse", dx: -14, dz: 10 }, ry: 0, persona: "A fisherman of the Lofoten Islands, Norway, 1868: he found three half-drowned men on the shore after the great whirlpool, and took them into his hut.", greet: "You came out of the Maelstrom? No one comes out of the Maelstrom." }],
steps: [
vRead(),
vTalk("Captain Nemo", "The last night. Nemo is at the organ, weeping. He does not see you.", vCard("Ⓝ 'Enough!'", "After the warship, after the sinking he could not forgive himself for, the captain shut himself away. Through the door the organ played, sad and wild. And then, as Aronnax passed, two words: 'Almighty God! Enough! Enough!' Was it remorse? He never knew.", "▶ Leave him"), { room: "nautilus" }),
vSpot("The forward ladder", "Ned Land has the dinghy ready on the hull. Go up the forward ladder.", { room: "nautilus" }),
vTalk("Ned Land", "On the jetty, Ned and Conseil. Ned has the dinghy unbolted.", vCard("🌀 The Maelstrom", "'We go tonight, sir. We're off Norway. The coast is twenty miles.' They climbed into the boat; and then the Nautilus shook. 'The Maelstrom! The Maelstrom!' The great whirlpool off Norway, that draws ships and whales in from fifteen miles round. The bolts gave; the dinghy was flung out like a stone from a sling. Aronnax struck his head on the iron, and knew no more.", "▶ Go on"), {}),
vHold({ at: "lighthouse", dx: -12, dz: 4 }, 8, "Wake on the shore. Walk out to the lighthouse and look for the Nautilus on the sea. There is nothing."),
vTalk("A Lofoten fisherman", "A fisherman found you on the rocks. Thank him.", vCard("🏠 The fisherman's hut", "'How we were saved, I do not know. When I came to my senses, I was lying in a fisherman's hut, on the Lofoten Isles. My two companions, safe and sound, were near me holding my hands. We embraced each other heartily.'", "▶ Go on"), {}),
vFind("notebook", { at: "lighthouse", dx: -16, dz: 2 }, "Aronnax's journal", "Aronnax's journal washed ashore, wrapped in oilcloth. Pick it up.", {}),
vTalk("Conseil", "Ask Conseil if they will ever know what became of Captain Nemo.", vCard("❓ Nemo", "'Shall I be believed? I do not know. And what has become of the Nautilus? Did it resist the pressure of the Maelstrom? Does Captain Nemo still live? I hope so. If his destiny be strange, it is also sublime. Have I not understood it myself? Have I not lived ten months of this unnatural life?' (Verne will tell us, in another book.)", "▶ Close the chapter"), {})
] });
VBK_CH.push({ t: "The runic parchment", src: "A Journey to the Centre of the Earth", tune: "mountain", keep: ["vbk_rune", "Saknussemm's parchment, copied out", "📜"],
start: { spot: "Verne's house" }, intro: "Hamburg, 24 May 1863: a little old book",
cast: [{ key: "lid8", name: "Professor Lidenbrock", role: "lidenbrock", at: { room: "verne", lx: -20, lz: 10 }, ry: 0.5, persona: "Otto Lidenbrock, professor of mineralogy at Hamburg, 1863: tall, thin, hot-tempered, brilliant and impatient, who stammers on long words and will stop at nothing once he has an idea in his head. He has just found a runic note in an old Icelandic book.", greet: "Axel! Axel! Where is that boy? Come here at once! A discovery!" },
{ key: "axel8", name: "Axel", role: "axel", at: { room: "verne", lx: -16, lz: 12 }, ry: -0.4, persona: "Axel, Lidenbrock's nephew and assistant, 1863: a sensible, nervous young man in love with Gräuben, who does not want to go anywhere near the centre of the earth, but goes anyway.", greet: "My uncle has found something. When my uncle finds something, nobody eats until it is solved." }],
steps: [
vRead(),
vSpot("Verne's house", "Verne keeps a copy of Snorri Sturluson's saga in his library. Go in."),
vTalk("Professor Lidenbrock", "Professor Lidenbrock has opened the old book. Something fell out.", vCard("📜 The parchment", "'Look! A slip of parchment, with runes on it. Ancient Icelandic runes! And a name, here, at the back of the book: Arne Saknussemm. A learned alchemist of the sixteenth century!' He copies out the runes, and turns them into Latin letters. Nonsense. 'mm.rnlls esreuel seecJde...' 'It is a cipher. And we will not eat, sleep or leave this room until it is solved!'", "▶ Go on"), { room: "verne" }),
vTalk("Axel", "Axel is fanning himself with the paper. Ask him if he's made any sense of it.", vCard("🌬️ Axel", "'Nothing. I've tried every order. And then, fanning myself with it, I saw through the back of the paper... the words, read through. Some of them were Latin.' But Axel says nothing to his uncle. If he tells, they will go.", "▶ Help him"), { room: "verne" }),
vPuzzle("🔤 The cipher", "Read straight, the letters make no sense. But Axel, fanning himself, saw words through the back of the paper. How must the message be read?", ["Every other letter", "Backwards, from the last letter to the first", "In a mirror, upside down"], 1, ["Tried that. Still nonsense.", "", "Not quite. Think of what Axel saw through the paper."], { yes: "✓ Backwards! 'In Sneffels Yoculis craterem kem delibat umbra Scartaris Julii intra calendas descende, audas viator, et terrestre centrum attinges. Kod feci. Arne Saknussemm.'" }),
vTalk("Professor Lidenbrock", "Tell the Professor.", vCard("🌋 Descend, bold traveller", "<i>Descend, bold traveller, into the crater of the jökull of Snaefells, which the shadow of Scartaris touches before the kalends of July, and you will attain the centre of the earth. I did it. Arne Saknussemm.</i> 'Axel! Pack the trunk. We leave for Iceland tomorrow!' 'But the heat at the centre of the earth, uncle! It must be two hundred thousand degrees!' 'Neither you nor anyone else knows anything about it.'", "▶ Go on"), { room: "verne" }),
vFind("parchment", { room: "verne", lx: -18, lz: 6 }, "Saknussemm's parchment", "Pick up the parchment: you are its keeper now.", { room: "verne" }),
vSpot("The catalogue of the Voyages", "Look up Iceland in the catalogue of the Voyages: how to get there.", { room: "verne" }),
vOut("Out onto the quay. Pack for Iceland.")
] });
function vbkUg(k, dx, dz) { var U = VRN_UG[k]; return { x: VRN_UG_X + U.x + (dx || 0), z: U.z + (dz || 0) }; }
VBK_CH.push({ t: "The shadow of Scartaris", src: "A Journey to the Centre of the Earth", tune: "mountain", keep: ["vbk_lava", "A piece of black lava from Snaefells", "🌋"],
start: { spot: "The Gare des Voyages" }, intro: "Iceland, June 1863",
steps: [
vRead(),
vSpot("The Gare des Voyages", "Take the train north to Stapi, at the foot of Snaefells (the station on the quay)."),
vGo(function () { var V = VRN_SNF.village; return { x: V.x, z: V.z + 60 }; }, "Stapi: turf houses, black lava, the cold sea wind. Walk into the village.", { r: 30 }),
vTalk("Hans Bjelke", "Meet Hans, the eider-down hunter, your guide: tall, calm, silent.", vCard("🦆 Hans", "He is a tall man, red-haired, very calm, who speaks little and moves without hurry. He will be the guide, for three rix-dollars a week, paid every Saturday evening; that is his one condition. In the whole journey, he will never once be in a hurry, and never once let them down.", "▶ Go on"), {}),
vSpot("Professor Otto Lidenbrock", "Professor Lidenbrock is at the pastor's house, impatient to climb. Hear about Saknussemm's note.", {}),
vGo({ at: "crater" }, "Climb Snaefells: up the long black slope to the crater, five thousand feet up.", { r: 80 }),
vSpot("The floor of the crater", "On the crater floor, three chimneys. Wait for the right hour, and watch where the shadow of Scartaris falls.", { wait: 0, sim: function () { VRN.snfHour = 12; } }),
vUntil(function () { return VRN.snfHour === 12; }, { at: "crater", dz: 60 }, "Watch the shadow at each hour until it touches one chimney. Saknussemm's note says: before the kalends of July.", { sim: function () { VRN.snfHour = 12; } }),
vPuzzle("☀️ Noon", "The shadow of the peak swings across the crater as the Sun moves. At noon, the Sun is at its highest, and the shadow at its shortest. On the 28th of June, at noon, it touched the edge of the middle chimney. Which chimney is Saknussemm's?", ["The west chimney", "The middle chimney", "The east chimney"], 1, ["The shadow at noon never reaches the west one.", "", "The east one is in sunlight at noon."], { yes: "✓ 'There it is! There it is!' cried the Professor. 'The centre of the globe!' Hans: 'Forüt!' Forward." }),
vUntil(function () { return !!vrnData().cDown; }, { spot: "The middle chimney" }, "Climb down the middle chimney, on the ropes, into the dark.", { sim: function () { var d = vrnData(); d.cDown = 1; var P = VRN_UG.gal[0]; vrnMove(VRN_UG_X + P[0], P[1], Math.PI * 0.75, null, P[2]); } }),
vFind("stone", function () { var P = VRN_UG.gal[1]; return { x: VRN_UG_X + P[0], z: P[1] + 4 }; }, "A piece of black lava", "Follow the lava gallery down. Pick up a piece of the glazed lava.", {})
] });
VBK_CH.push({ t: "The Lidenbrock Sea", src: "A Journey to the Centre of the Earth", tune: "mountain", keep: ["vbk_fern", "A frond of a giant tree-fern", "🌿"],
start: function () { var P = VRN_UG.gal[1]; return { x: VRN_UG_X + P[0], z: P[1] }; }, intro: "Under Iceland: the galleries, the sea, the way out",
cast: [{ key: "lid10", name: "Professor Lidenbrock", role: "lidenbrock", at: function () { var S = VRN_STROM; return { x: S.x + 6, z: S.z + S.r - 36 }; }, ry: 0, persona: "Professor Lidenbrock on the slope of Stromboli, 1863, scorched, bruised and furious that he did not reach the centre of the earth, and then delighted to have come out in Italy.", greet: "Stromboli! Italy! We went in at Iceland! Axel, write it down!" }],
steps: [
vRead(),
vUntil(function () { return !!VRN.hansbach; }, function () { return vbkUg("spring"); }, "Three days without water. Find Hans with his ear to the rock, and help him break into the wall.", { sim: function () { VRN.hansbach = true; vrnData().cWater = 1; } }),
vHold(function () { return vbkUg("whisper"); }, 8, "The whispering gallery: in the book Axel is lost here, alone in the dark, and hears his uncle through four miles of rock. Stand and listen.", { r: 14 }),
vGo(function () { return vbkUg("camp"); }, "Out of the galleries onto the shore of a sea: a sky of glowing cloud, waves, a forest of giant mushrooms. Port Graüben, the camp.", { r: 20 }),
vTalk("Professor Lidenbrock", "At the camp: the Professor names the sea after himself.", vCard("🌊 The Lidenbrock Sea", "'A sea! Under Iceland! Light, and wind, and waves... it is electricity in the vapour, Axel, an aurora under the earth. And we are going to cross it. I name it, with permission, the Lidenbrock Sea; and this harbour, Port Graüben, after your Gräuben.' Hans has already started on the raft.", "▶ Go on"), {}),
vGather("wood", function () { return vbkUg("camp", 30, -10); }, 4, "Fossil wood for the raft", "Help Hans gather fossil wood for the raft: four lengths, hard as stone but it floats.", { spread: 10 }),
vTalk("Axel", "Axel saw the sea monsters. Ask him.", vCard("🦕 The combat", "'A porpoise as big as a whale, and a lizard with the teeth of a crocodile, fighting in the sea right beside our raft: an ichthyosaurus and a plesiosaurus! The water boiled for two hours. Then the ichthyosaurus went down, and the long neck of the other rose once, and fell, and it floated, dead.' Axel wrote it all down in his journal as it happened.", "▶ Go on"), {}),
vSpot("The raft, made of fossil wood", "Push off onto the sea on the raft. Steer east, across the Lidenbrock Sea.", { wait: 0 }),
vSpot("Two runes cut in the rock", "On the far shore: two letters cut in the rock. Look closer.", {}),
vRew("centre", "A great fallen rock across Saknussemm's passage", "Saknussemm's passage is blocked. Ask Hans to break the rock, and ride out on what comes up the chimney.", {}),
vTalk("Professor Lidenbrock", "Out in the sunshine, on Stromboli. Ask the Professor where you are.", vCard("🍇 Stromboli", "'Where are we?' 'Stromboli,' says a boy with olives. Iceland to Italy, under the earth. The Professor was furious: they had not reached the centre. Then, back in Hamburg, he looked at the compass, and laughed: the needle had swung round in the storm, and they had gone south all along, not north. 'Glory to Saknussemm!'", "▶ Close the chapter"), {})
] });
VBK_CH.push({ t: "The Gun Club", src: "From the Earth to the Moon", tune: "post", keep: ["vbk_medal", "A Gun Club medal", "🎖️"],
start: { spot: "The Gun Club" }, intro: "Baltimore, 1865",
cast: [{ key: "nicholl", name: "Captain Nicholl", role: "nicholl", at: { spot: "The Gun Club", ox: -10, oz: 8 }, ry: 0.4, persona: "Captain Nicholl of Philadelphia, 1865, maker of armour plate and Barbicane's great rival: he bets against the Moon gun, sum after sum, and in the end climbs into the projectile himself.", greet: "A shell to the Moon? I'll wager you a thousand dollars it never leaves the gun." }],
steps: [
vRead(),
vSpot("The Gun Club", "Go into the Gun Club."),
vTalk("J. T. Maston", "J. T. Maston, the club's secretary, has a hook for a hand and a gutta-percha skull. He has a complaint.", vCard("🎩 Maston", "'The war is over, and we are all going to the dogs! Not a battle in prospect! What are we gunners to do? Is there no hope of a war somewhere, gentlemen?' The members, between them, had not one whole man in four: arms and legs gone, all in the cause of bigger guns.", "▶ Go on"), { room: "gunclub" }),
vTalk("Impey Barbicane", "President Barbicane has a proposal for the meeting of the 5th of October.", vCard("🌕 The proposal", "'Brave colleagues: I have looked around me, I have thought, and I have found a great work worthy of the nineteenth century. We shall send a projectile to the Moon! Is it not right to try to join the Moon to the Earth, our nearest neighbour?' The Club roared. Maston fell off the platform with joy.", "▶ Go on"), { room: "gunclub" }),
vSpot("Barbicane's table", "Work out the Moon shot with the Gun Club at Barbicane's table.", { room: "gunclub", wait: 0 }),
vUntil(function () { return !!vrnData().gunSums; }, { room: "gunclub", lx: 0, lz: -5 }, "Answer the Gun Club's three questions at Barbicane's table.", { sim: function () { vrnData().gunSums = 1; } }),
vOut("Out of the Gun Club. There is someone at the door."),
vTalk("Captain Nicholl", "Captain Nicholl, Barbicane's rival, makes his bets.", vCard("💵 The bets", "'One thousand dollars that the iron for the gun cannot be found. Two thousand that it can't be cast. Three thousand that it won't load. Four thousand that it won't go off. Five thousand that the shot won't go six miles.' Nine thousand dollars, all told. Barbicane accepted every one.", "▶ Go on"), {}),
vFind("telegram", { spot: "The Gun Club", ox: 6, oz: 6 }, "A telegram from Paris", "A telegram has come. Pick it up.", {}),
vTalk("Michel Ardan", "The telegram said: 'Substitute for your spherical shell a cylindro-conical projectile. I shall go inside. Arrive by steamer Atlanta. Michel Ardan.' Here he is.", vCard("🎩 Michel Ardan", "'Why not? I am going because it is worth going. And I propose that Captain Nicholl, who says it cannot be done, and President Barbicane, who says it can, should stop quarrelling and come with me.' He talked to the whole crowd in Tampa for two hours, and won them all.", "▶ Go on"), {})
] });
VBK_CH.push({ t: "The Columbiad", src: "From the Earth to the Moon", tune: "moon", keep: ["vbk_moon", "A sketch of the far side of the Moon", "🌕"],
start: { spot: "The Gare des Voyages" }, intro: "Stone's Hill, Florida, 1 December 1865, 10.46 p.m.",
cast: [{ key: "nic12", name: "Captain Nicholl", role: "nicholl", at: { spot: "The projectile, and President Barbicane", ox: -8, oz: 6 }, ry: 0.4, persona: "Captain Nicholl at Stone's Hill, 1865: he lost his bets, shook hands with Barbicane, and is going to the Moon with him.", greet: "I lost every bet but one. The last is the one that matters." }],
steps: [
vRead(),
vSpot("The Gare des Voyages", "Take the train east to Stone's Hill, Florida."),
vGo(function () { var S = VRN_STONE; return { x: S.x, z: S.z + S.r - 20 }; }, "Stone's Hill: a plain of sand and scrub, and the mouth of the Columbiad, nine hundred feet deep.", { r: 40 }),
vTalk("J. T. Maston", "J. T. Maston begs to go too. He can't.", vCard("😢 Maston", "'Take me! I weigh nothing at all with my hook and my skull...' 'My dear Maston, you would not even fill the space of one of us; you are not entire enough to be sent.' Maston will watch from the great telescope on Long's Peak, and never stop watching.", "▶ Go on"), {}),
vTalk("Captain Nicholl", "Nicholl and Barbicane have shaken hands. Talk with Nicholl.", null, {}),
vRew("moon", "The projectile, and President Barbicane", "Climb aboard the projectile with Barbicane, Nicholl and Ardan: round the Moon and home.", { sim: function () { vrnData().gunSums = 1; } }),
vTalk("Impey Barbicane", "Back on Earth: the projectile came down in the Pacific, and floated. Ask Barbicane what they saw.", vCard("🌑 Round the Moon", "'A meteor turned us aside, and we could not land. We went round the Moon instead, and saw its far side in the dark, and its craters and its mountains near enough to touch. Then the Moon's pull swung us home. The corvette Susquehanna found us floating in the sea, playing dominoes.' Maston, who had come down in a diving dress to look for them, wept.", "▶ Go on"), {}),
vPuzzle("🚀 The real thing", "A hundred and four years later, three men flew from Florida, went round the Moon, and came down in the Pacific, where a ship picked them up. What was it called?", ["Apollo 8, in December 1968", "The Susquehanna", "The Columbiad"], 0, ["", "That was Verne's ship, in the book.", "That was Verne's gun, in the book."], { yes: "✓ Apollo 8: three men, round the Moon, Christmas 1968, from Florida, home to the Pacific. Verne had imagined it a century before." }),
vHold(function () { var S = VRN_STONE; return { x: S.x, z: S.z + S.r - 20 }; }, 8, "Look up at the Moon over Stone's Hill a moment.", { r: 40 })
] });
VBK_CH.push({ t: "Five weeks in a balloon", src: "Five Weeks in a Balloon", tune: "hebrides", keep: ["vbk_leaf", "An acacia leaf from the Victoria's flight", "🍃"],
start: { at: "field" }, intro: "Zanzibar, April 1862",
cast: [{ key: "kennedy", name: "Dick Kennedy", role: "kennedy", at: { spot: "The Victoria, Dr Fergusson's balloon", ox: 8, oz: -4 }, ry: -0.6, persona: "Dick Kennedy, a Scots hunter and Dr Fergusson's oldest friend, 1862: he thinks the balloon is madness, says so every day, and goes anyway.", greet: "Fly across Africa in a bag of gas? Samuel's mad. And I'm going with him, so I'm mad too." }],
steps: [
vRead(),
vGo({ at: "field" }, "Walk out to the balloon field, west of the town.", { r: 40 }),
vTalk("Dr Samuel Fergusson", "Dr Fergusson explains his balloon, the Victoria.", vCard("🎈 The Victoria", "'Others throw out ballast to rise and let out gas to sink, and so they soon have nothing left. I carry neither. I heat my gas, and it swells and lifts us; I let it cool, and we sink. And so I can rise and fall as often as I like, and look for the wind that goes my way.' He is going to cross Africa from east to west, from Zanzibar to the Senegal.", "▶ Go on"), {}),
vTalk("Dick Kennedy", "Dick Kennedy, his friend, thinks it's madness.", null, {}),
vTalk("Joe", "Joe, the servant, would follow the Doctor to the Moon.", vCard("🙂 Joe", "'Where the Doctor goes, I go. Of course I do. And if he goes up, then I'm going up too, and I'll be the lightest of the three, being as I am.' Joe is cheerful in every danger, and in the end he saves them all.", "▶ Go on"), {}),
vRew("balloon", "The Victoria, Dr Fergusson's balloon", "Climb into the basket and fly the Victoria from Zanzibar, west across Africa, finding the wind that goes your way.", {}),
vTalk("Dr Samuel Fergusson", "Ask the Doctor about the end of the voyage, at the Senegal.", vCard("🌊 The Senegal", "'We had nothing left to throw out: we threw out everything, even the basket, and hung on to the net. The Victoria dropped us on the bank of the Senegal, just across from the French, and floated away down the river. Three Englishmen had crossed Africa by air in five weeks.' Joe rescued them all, more than once.", "▶ Go on"), {}),
vFind("feather", { spot: "The Victoria, Dr Fergusson's balloon", ox: -4, oz: 6 }, "A feather that blew into the basket", "Something caught in the Victoria's net: a feather. Pick it up.", {}),
vHold({ at: "field" }, 8, "Stand in the balloon field and watch which way the wind blows the grass.", { r: 40 })
] });
VBK_CH.push({ t: "Robur the Conqueror", src: "Robur the Conqueror", tune: "post", keep: ["vbk_flag", "Robur's black flag with the golden sun", "🏴"],
start: { spot: "The Weldon Institute" }, intro: "Philadelphia, 12 June 1880: the Weldon Institute",
cast: [{ key: "evans", name: "Phil Evans", role: "evans", at: { room: "weldon", lx: 4, lz: -10 }, ry: -0.4, persona: "Phil Evans, secretary of the Weldon Institute in Philadelphia, 1880: rival of Uncle Prudent, a firm believer in balloons, lighter than air. Kidnapped by Robur with Prudent, he hates him just as much.", greet: "The balloon, sir! The balloon is the future. Lighter than air! Anything heavier is a fairy tale." }],
steps: [
vRead(),
vSpot("The Weldon Institute", "Go into the Weldon Institute, where the balloon men are holding a stormy meeting."),
vTalk("Uncle Prudent", "Uncle Prudent, the president, is arguing about which way the propeller of their great balloon should go: in front or behind.", vCard("🎈 Front or back", "'The screw shall be behind!' 'It shall be in front!' The meeting has been fighting about it for weeks. And then a stranger stood up: 'Gentlemen! Lighter than air? Never. The future belongs to machines heavier than air: the flying machine. Birds are heavier than air, and they fly.' The room exploded. 'Throw him out!'", "▶ Go on"), { room: "weldon" }),
vTalk("Phil Evans", "Phil Evans, the secretary, has never agreed with Prudent about anything. Except about the stranger.", null, { room: "weldon" }),
vOut("Out of the Institute. That night, in Fairmount Park, Prudent and Evans were seized, gagged, and carried off."),
vTalk("Robur the Conqueror", "At the mast: the stranger. Robur.", vCard("🏴 Robur", "'I am Robur. Robur the Conqueror. And this is the Albatross: a hundred feet long, thirty-seven masts with seventy-four lifting screws, two propellers, all driven by electricity. She flies where I tell her, against the wind, round the world. You did not believe me. Now you are aboard. You shall see.'", "▶ Go on"), {}),
vSpot("Robur's mast: the Albatross is moored above", "Climb up and go aboard the Albatross.", {}),
vUntil(function () { return !VRN.ride; }, { spot: "Robur's mast: the Albatross is moored above" }, "Fly the Albatross as long as you like, and land her back at the mast.", { sim: function () { vrnEndAll(); } }),
vFind("flag", { spot: "Robur's mast: the Albatross is moored above", ox: 5, oz: 4 }, "Robur's flag", "The Albatross's black flag with the golden sun, fallen at the foot of the mast. Pick it up.", {}),
vTalk("Robur the Conqueror", "Ask Robur why he will not give the Albatross to the world.", vCard("☀️ 'The future is not yet'", "'Citizens of the United States: the world is not ready. The progress of science must not go faster than the improvement of men. I am going, and I take my secret with me. It will not be lost; it will belong to you, when you are educated enough to profit by it, and wise enough not to abuse it.' And he flew away.", "▶ Close the chapter"), {})
] });
VBK_CH.push({ t: "The castaways", src: "The Mysterious Island", tune: "hebrides", keep: ["vbk_lens", "A watch-glass burning lens", "🔍"],
start: { spot: "The harbour master's board" }, intro: "March 1865: a balloon falls out of a hurricane",
steps: [
vRead(),
vSpot("The harbour master's board", "The balloon from besieged Richmond fell out of a five-day hurricane, into the Pacific. Take a boat to Lincoln Island.", { wait: 0 }),
vGo(function () { var C = VRN_SPOTS.chimneys; return { x: C.x + 30, z: C.z }; }, "Walk along the beach to the Chimneys, under the granite cliff.", { r: 30, sim: function () { var C = VRN_SPOTS.chimneys; vrnMove(C.x + 30, C.z, -Math.PI / 2, null); } }),
vTalk("Pencroft", "Pencroft, the sailor, counts what the castaways have left.", vCard("🧭 What they had", "Nothing. No knife, no match, no tool, no weapon: they had thrown everything out of the basket to keep it in the air. Pencroft's pockets held nothing. Spilett's held a notebook. And the engineer, Cyrus Smith, was missing: he fell into the sea with his dog, Top, when the basket struck the waves.", "▶ Go on"), {}),
vTalk("Neb", "Neb, who searched the shore for his master Cyrus Smith for four days, found him.", vCard("🐕 Found", "Top, the dog, led them to him: in a hollow among the dunes, a mile inland, with no idea how he had got there out of the surf. Someone had carried him. 'Island or continent?' was the first thing he asked, half alive.", "▶ Go on"), {}),
vTalk("Herbert Brown", "Herbert, fifteen, has found something in his pocket.", vCard("🔥 One match", "Spilett, searching his waistcoat, found one match, single and alone, in the lining. One. They chose a sheltered corner, built a little pile of dry moss and twigs. Pencroft knelt, struck it on a stone, shielded it with his hands... and it caught. 'Now we are men,' said Pencroft.", "▶ Go on"), {}),
vFind("match", { at: "chimneys", dx: -14, dz: 22 }, "The one match", "Find the match: a tiny thing in a fold of Spilett's coat, left on a rock.", {}),
vGather("wood", { at: "chimneys", dx: -18, dz: 28 }, 4, "Dry moss and dead twigs", "Gather tinder from under the rocks: four handfuls.", { spread: 6 }),
vTalk("Gideon Spilett", "Spilett the reporter asks Cyrus what's next, notebook out.", vCard("🗒️ Spilett", "'Write it down, Spilett,' said Cyrus. 'We shall need to make everything: fire that doesn't need a match, pots, bricks, iron, glass, a boat, and a home. And, if we are wise, we shall make our island a little America.' They called it Lincoln Island, for the President.", "▶ Go on"), {}),
vUntil(function () { return (vrnData().isl || 0) >= 1; }, { spot: "Cyrus Smith, the engineer" }, "The next day it rained, and the fire went out. Ask Cyrus Smith what's next: make fire with a lens of two watch glasses.", { sim: function () { var d = vrnData(); d.isl = Math.max(d.isl || 0, 1); } })
] });
VBK_CH.push({ t: "The secret of the island", src: "The Mysterious Island", tune: "toccata", keep: ["vbk_nemo", "A pearl from Prince Dakkar's coffer", "🕯️"],
start: { spot: "Cyrus Smith, the engineer" }, intro: "Three years on Lincoln Island, and a hand that helped them",
cast: [{ key: "cyr16", name: "Cyrus Smith", role: "cyrus", at: { room: "dakkar", lx: -33, lz: 4 }, ry: 0.6, persona: "Cyrus Smith, engineer, in the Dakkar Grotto, 1868, at the deathbed of Captain Nemo: grave, grateful, deeply moved.", greet: "He watched over us, all this time. And we never knew." }],
steps: [
vRead(),
vRew("island", "Cyrus Smith, the engineer", "Climb the whole Engineer's Ladder with Cyrus Smith: fire, the place on the globe, bricks, bows, iron, glass, the lift to Granite House, the telegraph, the boat. Many hours: at your own pace."),
vTalk("Gideon Spilett", "Ask Spilett about the things that never made sense.", vCard("❓ Someone else", "Cyrus carried out of the sea. A box of tools washed up exactly when they needed one. A bullet in a peccary they never shot. A lead shot in Herbert, cured by a medicine that appeared in the night. The pirates' ship, blown up in the bay with no one near it. Someone else was on the island, helping them. 'Whoever you are,' Cyrus called out, 'show yourself!'", "▶ Go on"), {}),
vSpot("A sea cave in the black rocks", "A telegraph wire, laid by no one they knew, leads to a sea cave on the west coast. Follow it in.", { wait: 0 }),
vTalk("The old captain", "In a great grotto lit from below, the Nautilus. In the salon, an old man. Listen to who he is.", null, { room: "dakkar", act: function (next) { try {
vrnIslandNemo();
}
catch (e) { } next(); } }),
vTalk("Cyrus Smith", "Cyrus has heard it all.", vCard("🕯️ Prince Dakkar", "'I am Prince Dakkar, the son of a raja of Bundelcund. In the war of 1857 I fought for my people, and lost my wife and my children. I built the Nautilus and sailed thirty years. My companions are all dead, buried in the coral. I alone am left. I knew you from the first day. I watched over you.' He was Captain Nemo.", "▶ Go on"), { room: "dakkar" }),
vHold({ room: "dakkar", lx: -22, lz: 0 }, 12, "Stay with him. He asked them to open the salon's panels so he could see the sea, and said: 'God and my country!' And then nothing more."),
vTalk("Cyrus Smith", "Close the Nautilus, as he asked.", vCard("⚓ His grave", "They closed the hatch, opened the sea-cocks, and the Nautilus sank slowly into the grotto's deep water, his coffin, as he had wished. Before he died he warned them: the volcano was waking, and the island would go. They built a ship. They were taken off by the yacht Duncan, from the rock that was all that was left of Lincoln Island.", "▶ Go on"), { room: "dakkar" }),
vFind("shell", { room: "dakkar", lx: -32, lz: -2.5 }, "A pearl from Nemo's coffer", "He left them a coffer of pearls and diamonds. Take one, to remember him.", { room: "dakkar" }),
vOut("Out of the grotto, into the daylight.")
] });
VBK_CH.push({ t: "Verne closes the book", src: "Around the World in Eighty Days", tune: "danube", keep: ["vbk_book", "The Extraordinary Voyages, signed", "📕"],
start: { spot: "Verne's house" }, jump: true, intro: "Back at the quay of the Voyages",
steps: [
vRead(),
vSpot("Verne's house", "Home. Go into Verne's house."),
vTalk("Jules Verne", "Bring the book back to Jules Verne.", vCard("🖋️ Verne", "'So: you have been round the world, under the sea, into the earth, round the Moon, across Africa, through the air, and onto an island no map shows. I never went to any of them, you know: I went on my little boat, and to my library. Everything I wrote, I read first. And everything I imagined, someone has done since, or will.'", "▶ Go on"), { room: "verne" }),
vPuzzle("🖋️ One last card", "Verne's own favourite saying, from his notebook. Which did he write?", ["\"While the heart beats, while the body quivers, I do not see how a being gifted with will can let himself be conquered by despair.\"", "\"Everything is impossible.\"", "\"Stay at home.\""], 0, ["", "Not Verne! Every one of his books says the opposite.", "Not Verne. Though he did, mostly, and wrote."], { yes: "✓ From Journey to the Centre of the Earth: Axel's uncle, refusing to give up." }),
vSpot("The catalogue of the Voyages", "Put the book back in its place in the catalogue of the Voyages.", { room: "verne" }),
vHold({ room: "verne", lx: -30, lz: 16 }, 8, "Stand by his desk a moment, with twenty thousand cards of facts, and the sea outside the window.")
] });
(function () {
if (typeof vrnReward !== "function")
return;
var r0 = vrnReward;
vrnReward = function (kind) { VBK.rew[kind] = (VBK.rew[kind] || 0) + 1; return r0.apply(this, arguments); };
})();
function vbkRewGot(b) { return [].concat(b.kind).some(function (k) { return VBK.rew[k]; }); }
function vbkTalkHit(T) { return __ZC(457, 29, this, arguments, new.target); }
function vbkSpotHit(S) {
if (!vbkActive() || S.vbk)
return;
var b = vbkStep();
if (!b || b.k !== "spot")
return;
var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot;
if (!ok)
return;
var k = vbkKey();
setTimeout(function () { if (vbkKey() === k)
vbkStepDone(); }, b.wait || 400);
}
function vbkWrapT(T) { if (T._vbk)
return; T._vbk = 1; var f0 = T.fn; T.fn = function () { if (vbkTalkHit(T))
return; if (f0)
return f0.apply(this, arguments); if (T.t && typeof wTalk === "function")
wTalk(T.t); }; }
function vbkWrapS(S) { if (S._vbk || S.vbk)
return; S._vbk = 1; var f0 = S.fn; S.fn = function () { var b = vbkActive() && vbkStep(); if (b && b.k === "talk" && typeof b.who === "string" && (S.name || "") === b.who) {
vbkTalkHit({ name: b.who });
return;
} var r = f0 && f0.apply(this, arguments); try {
vbkSpotHit(S);
}
catch (e) { } return r; }; }
function vbkWrap() { VRN.talk.forEach(vbkWrapT); VRN.spots.forEach(vbkWrapS); }
(function () {
if (typeof vrnSpot === "function") {
var s0 = vrnSpot;
vrnSpot = function () { var S = s0.apply(this, arguments); try {
vbkWrapS(S);
}
catch (e) { } return S; };
}
["vrnPerson", "vrnFolk"].forEach(function (nm) {
var f0 = window[nm];
if (typeof f0 !== "function")
return;
window[nm] = function () { var n = VRN.talk.length, P = f0.apply(this, arguments); try {
for (var i = n; i < VRN.talk.length; i++)
vbkWrapT(VRN.talk[i]);
}
catch (e) { } return P; };
});
})();
VBK.cast = {};
function vbkCastLive(C) {
if (!C || !C.g || !C.g.parent)
return false;
if (C.home && (C.home.grp !== C.g.parent || !C.home.built))
return false;
if (!C.home && C.g.parent !== VRN.G)
return false;
return VRN.talk.some(function (T) { return T.p === C.P; });
}
function vbkPerson(c) { return __ZC(457, 30, this, arguments, new.target); }
function vbkCastClear() {
for (var k in VBK.cast) {
var C = VBK.cast[k];
if (C.g && C.g.parent)
C.g.parent.remove(C.g);
VRN.talk = VRN.talk.filter(function (T) { return T.p !== C.P; });
VRN.people = VRN.people.filter(function (p) { return p !== C.P; });
}
VBK.cast = {};
}
function vbkCastTick() { return __ZC(457, 31, this, arguments, new.target); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS[VRN_KEY];
if (!W)
return;
var e0 = W.enter, l0 = W.leave, t0 = W.tick;
W.enter = function (opt) {
var r = e0.apply(this, arguments);
VBK.beam = null;
VBK.cast = {};
try {
var on = (opt && opt.vbk && typeof opt.vbk === "string") ? opt.vbk : store.vbookOn;
if (on && VBK_BOOKS[on])
vbkUse(on);
}
catch (e) { }
var S = vbkS();
if ((opt && opt.vbk) || VBK.pending) {
VBK.pending = 0;
S.started = 1;
setTimeout(function () { try {
vbkChapterBegin(true);
}
catch (e) {
if (window.console)
console.warn("[vbk] begin", e);
} }, 900);
}
else if (S.started && !S.done) {
setTimeout(function () { try {
vbkChapterBegin(false);
}
catch (e) { } vbkSay(vbkBook().icon + " <b>" + vbkEsc(vbkBook().title) + "</b> is open at chapter " + vbkNum(S.ch) + ". Press E when nothing else is near to open the book."); }, 4000);
}
return r;
};
W.leave = function () { try {
vbkTune(null);
vbkItemsClear();
vbkCastClear();
if (VBK.beam)
VBK.beam.visible = false;
}
catch (e) { } return l0.apply(this, arguments); };
W.tick = function (dt) {
try {
t0.apply(this, arguments);
}
catch (e) {
if (window.console)
console.warn("[vbk] world", e);
}
try {
vbkTick(dt);
}
catch (e) {
if (window.console)
console.warn("[vbk] tick", e);
}
};
})();
function vbkTick(dt) { return __ZC(457, 32, this, arguments, new.target); }
(function () {
try {
if (typeof PS_SECTIONS !== "undefined") {
var st = PS_SECTIONS.filter(function (s) { return s.k === "stories"; })[0];
if (st && st.ids.indexOf("me-vbook") < 0)
st.ids.push("me-vbook");
}
}
catch (e) { }
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-vbook")) {
var btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-vbook";
btn.title = "Jules Verne's books (walked in Jules Verne's World)";
btn.textContent = "📚 Jules Verne's books";
btn.onclick = function () { vbkOpen(); };
bar.appendChild(btn);
}
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
})();
