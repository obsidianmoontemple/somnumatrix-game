/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var EBK_WEAR = {
hades: { len: "ankle", sl: "long", t: 0x1E1A24, tr: 0x8A6A2A, cape: 0x2A1E2E, hat: "crown", hc: 0x3A3438, held: "bident" },
persephone: { f: 1, len: "ankle", sl: "long", t: 0x4A2058, tr: 0xC8A040, cape: 0x2A1430, hat: "crown", hc: 0xC8A040, held: "pomegranate" },
demeter: { f: 1, len: "ankle", sl: "long", t: 0xC8A050, tr: 0x6A4A1A, cape: 0x2A2A44, hat: "veil", hc: 0x24243A, held: "torch" },
hermes: { len: "knee", sl: "cap", t: 0xEAE2D0, tr: 0x2A4A8A, cape: 0xA8302A, hat: "petasos", hc: 0x8A6A3A, held: "caduceus" },
heracles: { len: "knee", sl: "cap", t: 0xB89A6A, tr: 0x6A4A2A, cape: 0xC8964A, hat: "lion", held: "club" },
dionysus: { len: "ankle", sl: "long", t: 0xE8B830, tr: 0x8A2A5A, cape: 0xC8964A, hat: "lion", held: "club" },
xanthias: { len: "knee", sl: "cap", t: 0x8A7A5A, tr: 0x5A4A2A, cape: null, hat: "cap", hc: 0x6A5A3A, held: "basket" },
orpheus: { len: "ankle", sl: "long", t: 0xF2EEE4, tr: 0x6A4AA8, cape: 0x6A4AA8, hat: "wreath", hc: 0x4A7A3A, held: "lyre" },
nymph: { f: 1, len: "ankle", sl: "cap", t: 0xD8E8D0, tr: 0x6A9A5A, cape: null, hat: "wreath", hc: 0xE8E0F0 },
hero: { len: "knee", sl: "cap", t: 0xD8C8A8, tr: 0x8A2A1E, cape: 0x8A2A1E, hat: "helmet", hc: 0xB8903A, held: "spear" },
king: { len: "knee", sl: "cap", t: 0xE8DCC0, tr: 0x6A2A6A, cape: 0x5A1E4A, hat: "crown", hc: 0xC8A040, held: "sword" },
queen: { f: 1, len: "ankle", sl: "long", t: 0x6A1E4A, tr: 0xC8A040, cape: 0x3A1430, hat: "crown", hc: 0xC8A040 },
mourner: { f: 1, len: "ankle", sl: "long", t: 0xC8C0D0, tr: 0x6A6A8A, cape: 0x5A5A72, hat: "veil", hc: 0x6A6A80 },
bride: { f: 1, len: "ankle", sl: "long", t: 0xF6F2EA, tr: 0xC8A040, cape: null, hat: "veil", hc: 0xFAF8F2 },
psyche: { f: 1, len: "ankle", sl: "cap", t: 0xF0D8DC, tr: 0xC87A8A, cape: 0xE8C8D0, hat: "wreath", hc: 0xE8B0C0, held: "box" },
sibyl: { f: 1, len: "ankle", sl: "long", t: 0x3A3040, tr: 0xC8A040, cape: 0x241E2A, hat: "hood", hc: 0x2A2430, held: "laurel" },
seer: { len: "ankle", sl: "long", t: 0x9A9488, tr: 0x5A5448, cape: 0x6A6458, hat: null, held: "goldstaff" },
elder: { len: "ankle", sl: "long", t: 0xEEEAE0, tr: 0x4A2A6A, cape: 0x7A6A9A, hat: "wreath", hc: 0xC8A040, held: "staff" },
judge: { len: "ankle", sl: "long", t: 0xF4F2EC, tr: 0x5A1E4A, cape: 0x5A1E4A, hat: "wreath", hc: 0xC8A040, held: "sceptre" },
ferryman: { len: "knee", sl: "cap", t: 0x4A4840, tr: 0x2A2824, cape: 0x3A3830, hat: "pilos", hc: 0x3A3428, held: "pole" },
sinner: { len: "knee", sl: "cap", t: 0x7A7268, tr: 0x4A443C, cape: null, hat: null },
fury: { f: 1, len: "knee", sl: "cap", t: 0x2A1A1E, tr: 0x8A1A1A, cape: 0x1A1014, hat: "snakes", held: "torch" },
fate: { f: 1, len: "ankle", sl: "long", t: 0xF4F2EC, tr: 0x9A9488, cape: 0xD8D4CA, hat: "veil", hc: 0xE8E4DA },
night: { f: 1, len: "ankle", sl: "long", t: 0x14142A, tr: 0x6A6AA8, cape: 0x0E0E1E, hat: "veil", hc: 0x1A1A34 },
death: { len: "ankle", sl: "long", t: 0x141418, tr: 0x2A2A30, cape: 0x0A0A0E, hat: "hood", hc: 0x101014, held: "sword" },
sleep: { len: "ankle", sl: "long", t: 0x2A3058, tr: 0x6A5AA8, cape: 0x1A1E3A, hat: "wreath", hc: 0xA8202A },
poet: { len: "ankle", sl: "long", t: 0xEEEAE0, tr: 0x2A4A6A, cape: 0x5A6A7A, hat: "wreath", hc: 0x4A7A3A, held: "scroll" },
priest: { len: "ankle", sl: "long", t: 0xF4F2EC, tr: 0x2A5A8A, cape: 0x2A5A8A, hat: "wreath", hc: 0x4A6A3A, held: "staff" },
goddess: { f: 1, len: "ankle", sl: "long", t: 0x1E2E5A, tr: 0xC8D8F0, cape: 0x14203E, hat: "crown", hc: 0xC8D8F0 },
titan: { len: "ankle", sl: "long", t: 0x5A4A3A, tr: 0x3A2A1A, cape: 0x3A3028, hat: "crown", hc: 0x8A7A5A },
soldier: { len: "knee", sl: "cap", t: 0xC8B898, tr: 0x6A2A1E, cape: 0x6A2A1E, hat: null },
man: { len: "knee", sl: "cap", t: null, tr: null, cape: "own", hat: null },
woman: { f: 1, len: "ankle", sl: "cap", t: null, tr: null, cape: "own", hat: null }
};
var EBK_ROLE = [
[/^Hades/, "hades"], [/^Persephone/, "persephone"], [/^Demeter/, "demeter"], [/^Hermes/, "hermes"], [/^Heracles|^Hercules/, "heracles"],
[/^Dionysus/, "dionysus"], [/^Xanthias/, "xanthias"], [/^Orpheus/, "orpheus"], [/^Eurydice|nymph/i, "nymph"],
[/^(Achilles|Ajax|Agamemnon|Deiphobus|Tydeus|Adrastus|Odysseus|Aeneas|Theseus|Pirithous|Elpenor|Orion|Peleus|Cadmus)\b/, "hero"],
[/^Dido/, "queen"], [/^(Laodamia|Anticleia)/, "mourner"], [/^Alcestis/, "bride"], [/^Psyche/, "psyche"], [/^The Sibyl/, "sibyl"], [/^Tiresias/, "seer"],
[/^(Anchises|Kronos|Musaeus|Er\b)/, "elder"], [/^(Minos|Rhadamanthus|Aeacus)/, "judge"], [/^Charon/, "ferryman"], [/^(Sisyphus|Tantalus|Tityos|Ixion)/, "sinner"],
[/^(Alecto|Megaera|Tisiphone)/, "fury"], [/^(Clotho|Lachesis|Atropos)/, "fate"], [/^Nyx/, "night"], [/^Thanatos/, "death"], [/^(Morpheus|Hypnos)/, "sleep"],
[/^(Aeschylus|Euripides)/, "poet"], [/priest|herald|guardian of the spring/i, "priest"], [/^Styx/, "goddess"], [/^Palinurus/, "soldier"], [/groom|boatman/i, "man"]
];
function ebkRoleOf(name, sex) { name = name || ""; for (var i = 0; i < EBK_ROLE.length; i++)
if (EBK_ROLE[i][0].test(name))
return EBK_ROLE[i][1]; return sex === "f" ? "woman" : "man"; }
function ebkWearFor(L, o) { return __ZC(459, 0, this, arguments, new.target); }
function ebkM(col, o) { return typeof wfMat === "function" ? wfMat(col, o) : new THREE.MeshStandardMaterial({ color: col }); }
function ebkG(k, mk) { return typeof wfGeo === "function" ? wfGeo("ebk-" + k, mk) : mk(); }
var EBK_HAT = {
crown: function (add, c) { return __ZC(459, 1, this, arguments, new.target); },
petasos: function (add, c) { return __ZC(459, 2, this, arguments, new.target); },
lion: function (add) { return __ZC(459, 3, this, arguments, new.target); },
veil: function (add, c) { var m = new THREE.Mesh(ebkG("veil", function () { return new THREE.SphereGeometry(0.15, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.7); }), ebkM(c, { r: 1 })); m.material.side = THREE.DoubleSide; m.scale.set(1.05, 1.25, 1.15); m.rotation.x = -0.3; add("Head", [0, 0.08, -0.05], m); },
pilos: function (add, c) { var m = new THREE.Mesh(ebkG("pilos", function () { return new THREE.ConeGeometry(0.13, 0.2, 14, 1, true); }), ebkM(c, { r: 1 })); m.material.side = THREE.DoubleSide; add("Head", [0, 0.17, -0.01], m); },
snakes: function (add) { return __ZC(459, 4, this, arguments, new.target); }
};
var EBK_HELD = {
lyre: function (add) { return __ZC(459, 5, this, arguments, new.target); },
club: function (add) { var c = new THREE.Mesh(ebkG("club", function () { return new THREE.CylinderGeometry(0.06, 0.025, 0.9, 8); }), ebkM(0x5A3A1E, { r: 1 })); add("hand_r", [0, 0.25, 0], c); },
torch: function (add) { return __ZC(459, 6, this, arguments, new.target); },
caduceus: function (add) { return __ZC(459, 7, this, arguments, new.target); },
bident: function (add) { return __ZC(459, 8, this, arguments, new.target); },
goldstaff: function (add) { var s = new THREE.Mesh(ebkG("gstaff", function () { return new THREE.CylinderGeometry(0.016, 0.02, 1.6, 6); }), ebkM(0xD8B040, { r: 0.3, m: 0.85 })); add("hand_r", [0, -0.1, 0], s); },
sceptre: function (add) { return __ZC(459, 9, this, arguments, new.target); },
pole: function (add) { var s = new THREE.Mesh(ebkG("pole", function () { return new THREE.CylinderGeometry(0.022, 0.026, 3, 6); }), ebkM(0x4A3A2A)); add("hand_r", [0, 0.3, 0], s); },
pomegranate: function (add) { var p = new THREE.Mesh(ebkG("pom", function () { return new THREE.SphereGeometry(0.045, 10, 8); }), ebkM(0xA8182A, { r: 0.5 })); add("hand_l", [0, -0.06, 0.04], p); },
box: function (add) { var b = new THREE.Mesh(ebkG("pbox", function () { return new THREE.BoxGeometry(0.12, 0.08, 0.09); }), ebkM(0xD8B040, { r: 0.3, m: 0.8 })); add("hand_l", [0, -0.07, 0.04], b); },
laurel: function (add) { return __ZC(459, 10, this, arguments, new.target); },
scroll: function (add) { var s = new THREE.Mesh(ebkG("scroll", function () { return new THREE.CylinderGeometry(0.025, 0.025, 0.22, 8); }), ebkM(0xEAE0C4, { r: 1 })); s.rotation.z = Math.PI / 2; add("hand_l", [0, -0.05, 0.04], s); }
};
function ebkProps(add, c, E) { return __ZC(459, 11, this, arguments, new.target); }
(function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined")
return;
WDR_COST.oz_ebk = { rb: 1, ownHead: true, look: { hat: "none", role: "" }, props: function (add, c, E) { try {
ebkProps(add, c, E);
}
catch (e) {
if (window.console)
console.warn("[ebk] props", e);
} } };
OZ_WEAR.oz_ebk = function (L, o) { return ebkWearFor(L, o); };
})();
(function () {
if (typeof ebsPerson !== "function" || typeof ebsTalk !== "function")
return;
var p0 = ebsPerson;
ebsPerson = function (seed, x, z, y, o, rot) {
o = o || {};
var look = null;
if (!o.ozCos && !o.noCos && typeof WDR_COST !== "undefined" && WDR_COST.oz_ebk) {
look = Object.assign({}, o.look || {});
look._eb = o.ebRole || (o.name ? ebkRoleOf(o.name, o.sex || "m") : (o.sex === "f" ? "woman" : "man"));
o = Object.assign({}, o, { ozCos: "oz_ebk", look: look });
}
var P = p0.call(this, seed, x, z, y, o, rot);
if (P && look) {
P.ebkLook = look;
P.ebkSex = o.sex || "m";
}
return P;
};
var t0 = ebsTalk;
ebsTalk = function (P, name) { try {
if (P && P.ebkLook && !P.ebkRoleSet) {
P.ebkLook._eb = ebkRoleOf(name, P.ebkSex);
}
}
catch (e) { } return t0.apply(this, arguments); };
})();
var EBK_CH = [];
var EBK = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null };
function ebkS() { if (!store.ebook)
store.ebook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0 }; var S = store.ebook; S.f = S.f || {}; S.keeps = S.keeps || []; return S; }
function ebkSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function ebkStep() { var S = ebkS(), C = EBK_CH[S.ch]; return C ? C.steps[S.s] : null; }
function ebkActive() { var S = ebkS(); return !!(S.started && !S.done && WLD.on === EBS_KEY); }
function ebkSay(h) { setStatus(h); }
function ebkEsc(t) { return typeof esc === "function" ? esc(t) : String(t); }
function ebkKey() { var S = ebkS(); return S.done ? "done" : S.ch + "." + S.s; }
function ebkAreaAt(x) { var I = ebsInAt(x); return I ? "in:" + I.key : ebsRegion(x); }
function ebkArea() { var L = worldLocal(); return ebkAreaAt(L.x); }
function ebkLoc(g) {
if (g && g.updateWorldMatrix) {
try {
g.updateWorldMatrix(true, false);
}
catch (e) { }
var e = g.matrixWorld.elements;
return { x: e[12] - EBS.base, z: e[14], y: e[13] };
}
return g && g.position ? { x: g.position.x, z: g.position.z, y: g.position.y } : null;
}
function ebkNamed(list, name, room) { return __ZC(459, 12, this, arguments, new.target); }
function ebkRoomPt(key, lx, lz) { var I = EBS_IN[key]; if (!I)
return null; var A = I.arrive || [0, 0, 0]; return { x: I.x + (lx != null ? lx : A[0]), z: lz != null ? lz : A[1], y: 0, area: "in:" + key }; }
function ebkPos(at) { return __ZC(459, 13, this, arguments, new.target); }
function ebkDist(P, L) { return Math.hypot(P.x - L.x, P.z - L.z); }
function ebkRoomDoor(k) { for (var i = 0; i < EBS_DOORS.length; i++) {
var D = EBS_DOORS[i];
if (D.room === k)
return { x: D.x, z: D.z, y: ebsGround(D.x, D.z), area: ebkAreaAt(D.x) };
} return null; }
function ebkRoomExit() {
var I = EBS.room;
if (!I)
return null;
var best = null;
EBS.spots.forEach(function (S) { if (best || Math.abs(S.x - I.x) > 190)
return; if (/^go back outside$/.test(S.verb || ""))
best = { x: S.x, z: S.z, y: S.y || 0, area: "in:" + I.key }; });
return best || { x: I.x, z: (I.arrive || [0, 8])[1], y: 0, area: "in:" + I.key };
}
var EBK_GATES = { main: { taenarum: "The cave back up to the light", tartarus: "The gate of Tartarus", elysium: "The gate of Elysium" },
taenarum: { main: "The cave of Taenarum" }, tartarus: { main: "The bronze gate" }, elysium: { main: "The gate of Elysium" } };
function ebkGate(from, to) {
var G = EBK_GATES[from];
if (!G)
return null;
var nm = G[to] || G.main;
if (!nm)
return null;
var best = null;
EBS.spots.forEach(function (S) { if (S.name === nm && ebsRegion(S.x) === from && !best)
best = { x: S.x, z: S.z, y: S.y != null ? S.y : ebsGround(S.x, S.z), area: from }; });
return best;
}
function ebkWayTo(P, area) { return __ZC(459, 14, this, arguments, new.target); }
function ebkWay(P, L) { return __ZC(459, 15, this, arguments, new.target); }
function ebkBeam() { return __ZC(459, 16, this, arguments, new.target); }
function ebkItemMesh(kind) { return __ZC(459, 17, this, arguments, new.target); }
function ebkItemsClear() { EBK.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = EBS.spots.indexOf(I.S); if (j >= 0)
EBS.spots.splice(j, 1); }); EBK.items = []; }
function ebkItemAdd(kind, P, name, verb, onTake) { return __ZC(459, 18, this, arguments, new.target); }
var EBK_TUNES = { seikilos: "assets/erebos/seikilos.mp3", sun: "assets/erebos/hymn-to-the-sun.mp3", spirits: "assets/erebos/gymnopedie.mp3", furies: "assets/erebos/funeral-march.mp3", galop: "assets/erebos/galop.mp3" };
function ebkTune(k) { return __ZC(459, 19, this, arguments, new.target); }
function ebkText(fn) { return __ZC(459, 20, this, arguments, new.target); }
function ebkPassage(B, i) { return B && B.ch && B.ch[i] ? B.ch[i] : null; }
function ebkParaHtml(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + ebkEsc(p) + "</p>"; }
function ebkOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100) {
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
}
out.push(p);
n += p.length;
} return out; }
function ebkReadAll(i) { return __ZC(459, 21, this, arguments, new.target); }
function ebkChapterCard() { return __ZC(459, 22, this, arguments, new.target); }
function ebkKeeperBtns(fns) { return __ZC(459, 23, this, arguments, new.target); }
function ebkJump(i) { var S = ebkS(); S.ch = Math.max(0, Math.min(EBK_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; ebkSave(); ebkChapterBegin(true); }
function ebkChapterBegin(place) {
var S = ebkS(), C = EBK_CH[S.ch];
if (!C)
return;
ebkItemsClear();
ebkCastClear();
EBK.hold = 0;
if (place && C.start)
ebkPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[ebk] setup", S.ch, e);
}
ebkTune(C.tune || null);
ebkStepBegin();
}
function ebkPlaceAt(st) {
var P = ebkPos(st);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
var k = P.area.slice(3);
if (EBS.room && EBS.room.key === k)
return;
ebsEnterRoom(k);
return;
}
ebsMove(P.x, P.z, st.ry != null ? st.ry : null, null);
}
function ebkStepBegin() { return __ZC(459, 24, this, arguments, new.target); }
function ebkStepDone() { return __ZC(459, 25, this, arguments, new.target); }
function ebkFinish() { return __ZC(459, 26, this, arguments, new.target); }
function ebkOpen() { return __ZC(459, 27, this, arguments, new.target); }
function ebkBegin() {
var S = ebkS();
S.started = 1;
ebkSave();
if (WLD.on !== EBS_KEY) {
EBK.pending = 1;
if (typeof ebsGo === "function")
ebsGo({ ebk: 1 });
else
worldGo(EBS_KEY, { ebk: 1 });
return;
}
ebkChapterBegin(true);
}
function eGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function eTalk(who, h, card, o) { return Object.assign({ k: "talk", who: who, at: Object.assign({ who: who }, (o && o.room) ? { room: o.room } : {}), h: h, card: card }, o || {}); }
function eSpot(name, h, o) { return Object.assign({ k: "spot", spot: name, at: Object.assign({ spot: name }, (o && o.room) ? { room: o.room } : {}), h: h }, o || {}); }
function eRew(kind, spot, h, o) { return Object.assign({ k: "reward", kind: kind, at: spot ? (typeof spot === "string" ? Object.assign({ spot: spot }, (o && o.room) ? { room: o.room } : {}) : spot) : null, h: h }, o || {}); }
function eFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function eGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function eHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function eUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function eRead() { return { k: "read" }; }
function eCard(title, html, btn) { return [title, html, btn]; }
function eCast(list) { return function (f) { list.forEach(function (c) { ebkPerson(c); }); }; }
function ebkObol() { var d = ebsData(); d.obol = 1; ebsSave(); }
function eToRoom(key, msg) { return function (next) { ebsEnterRoom(key); if (msg)
setTimeout(function () { setStatus(msg); }, 900); setTimeout(next, 1300); }; }
function eToPlace(x, z, yaw, msg) { return function (next) { ebsMove(x, z, yaw, msg, null, { fn: function () { setTimeout(next, 300); } }); }; }
var EBK_TAE = { x: 20000, z: -40 };
EBK_CH.push({ t: "The Sibyl of Cumae", tune: "seikilos", keep: ["ebk_laurel", "A sprig of the Sibyl's laurel", "🌿"], start: { at: "top" }, jump: 1,
intro: "The head of the long stair; the Sibyl waits at its foot",
steps: [eRead(),
eSpot("Grief (Luctus)", "Go down the great stair. In the doorway of Hell, Virgil says, Grief and avenging Cares have made their beds. Look at Grief."),
eSpot("Fear (Metus)", "Further down: pale Diseases, sad Old Age, Fear, and Hunger that counsels evil. Look at Fear."),
eSpot("Death (Letum)", "Toil, and Death, and Sleep, Death's brother. Look at Death, at the bottom of the stair."),
eGo({ at: "sibyl" }, "At the foot of the stair stands the Sibyl of Cumae, Apollo's prophetess, who led Aeneas down. Go to her."),
eTalk("The Sibyl of Cumae", "Speak with the Sibyl.", eCard("🌿 The Sibyl of Cumae", "\"Easy is the way down. Night and day the door of dark Dis stands open. But to turn your steps back and come out to the air above: that is the labour, that is the toil. A few have done it.\" She opens a book bound in black leather. \"Here is everyone who went down alive and came back. Walk where they walked. I will be here.\"", "▶ Open the book")),
eSpot("The Elm of False Dreams", "\"In the middle,\" Virgil says, \"an elm, shadowy and huge, where false dreams cling under every leaf.\" Look up into it."),
eSpot("The shapes of monsters", "Round the doorway the shapes of monsters: Centaurs, Scylla, Briareus, the Hydra, the Chimaera. Aeneas drew his sword on them, until the Sibyl told him they were thin lives without bodies."),
eHold({ at: "vest" }, 8, "Stand in the Vestibule and listen: the Acheron is ahead, thick with mud, and the crowd of the dead pours down to its bank."),
eTalk("The Sibyl of Cumae", "Go back to the Sibyl: the first descent is the oldest.", eCard("🌿 The Sibyl", "\"The first to come down was not a hero at all. She was a girl picking flowers in a meadow in Sicily, and she never asked to come. Her name was Kore, the Maiden. Down here they call her Persephone.\"", "▶ The first descent"))
] });
EBK_CH.push({ t: "Persephone carried off", tune: "sun", keep: ["ebk_pomegranate", "A pomegranate seed", "🔴"], start: { at: "grove", dx: 20, dz: -20 }, jump: 1,
cast: [{ key: "demeter", name: "Demeter, the grieving mother", role: "demeter", sex: "f", at: { x: EBK_TAE.x + 14, z: EBK_TAE.z + 10 }, ry: Math.PI,
persona: "Demeter of the Homeric Hymn to Demeter, goddess of the grain and the harvest, searching the whole earth for her daughter Persephone with a burning torch in each hand, nine days without eating or bathing. You are grief-stricken and fierce: while your daughter is gone you will let nothing grow. Speak simply and with dignity. Never mention films.", greet: "Have you seen her? My daughter. I heard her cry out, and the mountains echoed it, and then nothing." }],
intro: "The Grove of Persephone; a meadow of flowers",
steps: [eRead(),
eGather("flower", { at: "grove", dx: 20, dz: -20 }, 4, "Flowers of the meadow", "She was gathering flowers with the deep-bosomed daughters of Ocean: roses, crocuses, violets, irises, hyacinths. Pick four.", { spread: 8, each: "A flower for the garland." }),
eFind("narcissus", { at: "grove", dx: 28, dz: -30 }, "A narcissus, a hundred heads from one root", "And then the narcissus, which Earth made to grow at the will of Zeus as a snare: a hundred blooms from one root. Reach for it."),
eHold({ at: "grove", dx: 28, dz: -30 }, 6, "The wide-pathed earth yawns open, and out of it the lord of many springs with his immortal horses. Keep still."),
eTalk("Demeter, the grieving mother", "He catches her up and drives away. Her cry reaches her mother. The chariot is gone: go up to Cape Taenarum, where Demeter searches with her torches.", eCard("🔥 Demeter", "\"Nine days I have walked the earth with flaming torches in my hands. I have not tasted ambrosia, nor the sweet draught of nectar, nor washed my body. Helios sees everything: he told me. Zeus gave her to his brother. To Hades.\"", "▶ Go on"), { at: { cast: "demeter" } }),
eTalk("Hermes, guide of souls", "Demeter will let nothing grow; the people starve; the gods get no offerings. Zeus sends Hermes with his golden wand down to Erebus. Speak with Hermes.", eCard("🪶 Hermes", "\"Father Zeus says: bring her up. Hold on to my cloak.\" The ground goes dark under your feet...", "▶ Go down with Hermes"), { act: eToRoom("palace", "🪶 <b>Down through the dark,</b> faster than any stair, into the hall of the Unseen King.") }),
eTalk("Hades, the Unseen King", "Hades sits in his hall with his shy wife, who longs for her mother. Hermes gives him Zeus's word.", eCard("👑 Hades", "\"Go now, Persephone, to your dark-robed mother. Go, and feel kindly in your heart towards me. I shall be no unfitting husband for you among the deathless gods. While you are here you shall rule all that lives and moves, and have the greatest rights among the gods.\"", "▶ Go on"), { room: "palace" }),
eSpot("Persephone's garden", "She leaps up for joy. But first he secretly gives her a pomegranate seed to eat. Go out to Persephone's garden by the palace and pick a pomegranate.", { at: { spot: "Persephone's garden" } }),
eSpot("The pomegranate seeds", "In Persephone's rooms, count the seeds she ate. (Later tellers say six, one for each month below; the Hymn says one.)", { room: "persephone" }),
eTalk("Persephone, queen of the dead", "Speak with Persephone before Hermes takes her up in the golden chariot.", eCard("🌸 Persephone", "\"He put a pomegranate seed in my mouth, sweet food, and made me taste it against my will. Whoever eats the food of the dead must come back to them. So: a third part of the year down here, and two parts with my mother. Go up with me.\"", "▶ Up in the golden chariot"), { room: "persephone", act: eToPlace(EBK_TAE.x + 8, EBK_TAE.z + 16, Math.PI, "🌞 <b>Up into the sunlight at Cape Taenarum</b> in Hermes's chariot; the horses do not slow for sea or rivers or mountain tops.") }),
eTalk("Demeter, the grieving mother", "Mother and daughter meet. Speak with Demeter.", eCard("🌾 Demeter", "\"She is here. And because she is here, the fields will be heavy with long ears of grain again; and when she goes down each year, they will be bare. That is winter. When she comes up, that is spring.\"", "▶ The second descent"), { at: { cast: "demeter" } })
] });
EBK_CH.push({ t: "Orpheus and Eurydice", tune: "spirits", keep: ["ebk_lyre", "A string from Orpheus's lyre", "🎵"], start: { x: EBK_TAE.x + 6, z: EBK_TAE.z + 6 }, jump: 1,
cast: [{ key: "orph", name: "Orpheus of Thrace, in mourning", role: "orpheus", at: { x: EBK_TAE.x - 10, z: EBK_TAE.z + 4 }, ry: Math.PI / 2,
persona: "Orpheus of Thrace, son of the Muse Calliope, the greatest singer who ever lived, on the day you go down to bring back your wife Eurydice, bitten by a snake in the meadow on your wedding day (Ovid, Metamorphoses 10). You are about to go down through the cave at Taenarum with your lyre. Grief-struck but determined. Never mention films.", greet: "She was walking in the grass with the Naiads. A snake. That was all it took. I am going down to fetch her." }],
intro: "Cape Taenarum, the morning Orpheus goes down",
steps: [eRead(),
eTalk("Orpheus of Thrace, in mourning", "Orpheus stands by the cave at Taenarum with his lyre. Speak with him.", eCard("🎵 Orpheus", "\"I have wept for her on the earth until there was nothing left to weep. I will go down to the shades by the gate of Taenarum. Come with me: you can hold the torch.\"", "▶ Go with him"), { at: { cast: "orph" } }),
eSpot("The cave of Taenarum", "Go down through the cave of Taenarum."),
eFind("obol", { at: "landS", dx: -6, dz: 18 }, "An obol for the ferryman", "Down at the river Charon takes an obol from everyone. Pick one up by the bank.", { done: function () { ebkObol(); } }),
eTalk("Charon", "Speak with Charon. (In Virgil the ferryman turns Orpheus away the second time; the first time the song carries him over.)", eCard("⛵ Charon", "Charon leans on his pole. Behind you Orpheus begins to play, very softly. The old man's mouth works. \"I don't take the living,\" he says, and takes your obol anyway."), {}),
eRew("ferry", "Charon's ferry", "Cross the Acheron in Charon's boat."),
eTalk("Cerberus", "Cerberus lies across the Gate of Hades. Orpheus played for him; now you play Orpheus's tune on the lyre.", eCard("🐕 Cerberus", "Three heads lift. A growl like an earthquake. Orpheus puts the lyre in your hands: \"Five notes. Play them, and he'll sleep.\"", "🎵 Play the tune"), { act: function (next) { if (ebsData().passed) {
next();
return;
} ebsLyrePlay(false, function () { ebsCerbPass("lyre", "🎵 <b>The music reaches him.</b> One head lies down, then the next, then the third. He lets you by, as he let Orpheus by."); next(); }); } }),
eGo({ room: "palace" }, "Go on to the Palace of Hades and in."),
eSpot("Orpheus's lyre", "Ovid: he sang to the king and queen of the dead, and the bloodless spirits wept. Play the lyre by the throne.", { room: "palace" }),
eSpot("What happened when he sang", "Read what happened when he sang.", { room: "palace" }),
eTalk("Hades, the Unseen King", "Hades and Persephone could not refuse him. Speak with Hades.", eCard("👑 Hades", "\"Take her. Eurydice is yours, on one condition: walk up ahead of her, and do not turn round to look at her until you are out of the valley of Avernus. Look back, and the gift is void.\"", "▶ Go on"), { room: "palace" }),
eRew("orpheus", { who: "Orpheus" }, "At the foot of the steep path Orpheus and Eurydice wait. In Ovid he turned, afraid she was not there, and she slipped back, saying only \"Farewell\". Walk the path yourself, and do not look back.")
] });
EBK_CH.push({ t: "Heracles and the hound", tune: "furies", keep: ["ebk_chain", "A link of Cerberus's chain", "⛓️"], start: { at: "asph", dx: 240, dz: 300 }, jump: 1,
src: "Apollodorus, The Library 2.5.12 (told in plain words); Homer, Odyssey 11",
words: "The twelfth labour: Eurystheus ordered Heracles to bring Cerberus up from Hades. Heracles went to Eleusis to be purified, then down through Taenarum. The shades fled from him, all but Meleager and the Gorgon Medusa. He asked Pluto for the dog, and Pluto said he could take it if he mastered it without the weapons he carried.",
intro: "The Asphodel Meadows, where the phantom of Heracles walks",
steps: [eRead(),
eTalk("Heracles (his phantom)", "Odysseus met Heracles here, or his phantom: the man himself feasts with the gods. Speak with him.", eCard("🏹 Heracles", "\"Once they sent me down here to fetch the hound; they could think of no harder task for me. I brought him up and out of the house of Hades, with Hermes and grey-eyed Athena to guide me.\" (Odyssey 11)", "▶ Go on")),
eTalk("Aeacus, keeper of the keys", "At the Gate of Hades, Aeacus keeps the keys. Apollodorus: Heracles came this way. Speak with him.", eCard("🗝️ Aeacus", "\"He came through like a storm. The shades fled. Only Meleager stood, and the Gorgon, and he drew his sword on her until Hermes told him she was a phantom.\"", "▶ Go on")),
eTalk("Hades, the Unseen King", "Go into the Palace of Hades and ask the king for the dog, as Heracles did.", eCard("👑 Hades", "\"Take him, if you can master him without the weapons you carry. Bare-handed.\"", "▶ Go on"), { room: "palace" }),
eSpot("Ascalaphus the owl", "In Persephone's rooms: Heracles rolled away the stone that held Ascalaphus, who told on Persephone for eating the seed. (Demeter made him a screech-owl.)", { room: "persephone" }),
eGo({ room: "den" }, "Go to Cerberus's den, in the black rocks just east of the Gate."),
eRew("labour", { spot: "Cerberus", room: "den" }, "The twelfth labour: wrestle Cerberus bare-handed. Grip the head that lunges, three times."),
eSpot("The great chain", "\"Gripping him by the throat he never let go, though the serpent tail bit him, until he mastered him.\" Look at the great chain.", { room: "den" }),
eGo({ at: "top", dx: 0, dz: -30 }, "Heracles dragged him up the long stair and out at Troezen (some say Taenarum). Climb to the top of the Descent."),
eHold({ at: "top", dx: 0, dz: -30 }, 6, "Keep still at the head of the stair. Where the dog's slaver fell on the ground, they say, the poison plant aconite grew."),
eTalk("The Sibyl of Cumae", "Go back down to the Sibyl.", eCard("🌿 The Sibyl", "\"He showed the dog to Eurystheus, who hid in a jar, and then he took it back down again. And on his way he did one more thing: he pulled a friend out of a chair.\"", "▶ Go on"))
] });
EBK_CH.push({ t: "Theseus and Pirithous", tune: "seikilos", keep: ["ebk_chair", "A splinter of the Chair of Forgetfulness", "🪑"], start: { room: "palace" }, jump: 1,
src: "Apollodorus, The Library, Epitome 1.23-24 (told in plain words); Homer, Odyssey 11",
words: "Pirithous wanted to marry Persephone, and Theseus, his friend, went down with him to carry her off. Hades welcomed them as guests and bade them sit on the Chair of Forgetfulness; they grew to it, and were held fast by the coils of serpents. Theseus was freed by Heracles; Pirithous stays there for ever.",
cast: [{ key: "her4", name: "Heracles, son of Zeus", role: "heracles", at: { room: "palace", lx: -42, lz: -26 }, ry: Math.PI / 2,
persona: "Heracles, son of Zeus, the strongest man who ever lived, in the house of Hades on your twelfth labour, wearing the lion skin and carrying your club. You have come to pull your friend Theseus out of the Chair of Forgetfulness. Big-hearted, blunt, loud, funny. Never mention films.", greet: "Theseus! Look at you. Sit still, I'll have you out of there." }],
intro: "The Palace of Hades, the banquet of the dead",
steps: [eRead(),
eTalk("Theseus", "Theseus and Pirithous sit at the banquet. Speak with Theseus.", eCard("🪑 Theseus", "\"It was his idea. We had carried off Helen, and now he wanted Persephone. Hades made us welcome, and showed us these chairs, and we sat... and now I cannot remember why I would ever stand up.\"", "▶ Go on"), { room: "palace" }),
eTalk("Pirithous", "Speak with Pirithous.", eCard("🐍 Pirithous", "Pirithous does not look up. Something cold is coiled round his ankles. \"It was a good plan,\" he says, to no one.", "▶ Go on"), { room: "palace" }),
eSpot("An empty chair beside them", "There is an empty chair beside them. Hades smiles. Sit down? (You may stand up again; you are only visiting.)", { room: "palace" }),
eTalk("Heracles, son of Zeus", "Heracles comes through the hall with the hound's leash in his hand.", eCard("💪 Heracles", "He takes Theseus by the hand and pulls; Theseus comes up out of the chair (some say he left part of himself on the seat). Heracles reaches for Pirithous, and the whole earth quakes. He lets go.", "▶ Go on"), { at: { cast: "her4" } }),
eTalk("Theseus", "Speak with Theseus, free.", eCard("🪑 Theseus", "\"Homer's Odysseus would have liked to meet us, he said; but the dead came in thousands and he took fright and sailed. I will go up. Pirithous will not.\"", "▶ Go on"), { room: "palace" }),
eSpot("The Helm of Darkness", "Hades's own Cap of Darkness, which the Cyclopes made: whoever wears it cannot be seen. Look at it.", { room: "palace" }),
eSpot("The banquet of the dead", "Look at the banquet the two friends were invited to.", { room: "palace" }),
eTalk("Hades, the Unseen King", "Speak with Hades about his guests.", eCard("👑 Hades", "\"I did not chain them. I gave them a seat. It is the forgetting that holds them.\"", "▶ The next descent"), { room: "palace" })
] });
EBK_CH.push({ t: "Alcestis", tune: "spirits", keep: ["ebk_veil", "A thread of Alcestis's veil", "🤍"], start: { x: EBK_TAE.x + 6, z: EBK_TAE.z + 6 }, jump: 1,
cast: [{ key: "admetus", name: "Admetus, king of Pherae", role: "king", at: { x: EBK_TAE.x + 16, z: EBK_TAE.z + 30 }, ry: Math.PI,
persona: "Admetus, king of Pherae in Thessaly, in Euripides's Alcestis. Apollo won you the right to escape death if someone would die in your place; your parents refused; your wife Alcestis agreed, and today she died. You are in mourning, your hair shorn, but you still gave your guest Heracles a welcome and hid your grief from him. Never mention films.", greet: "Welcome. Come in. No, it is nothing: a woman of the house has died. A stranger to my blood. Come in." },
{ key: "her5", name: "Heracles, the guest", role: "heracles", at: { x: EBK_TAE.x + 24, z: EBK_TAE.z + 24 }, ry: -Math.PI / 2,
persona: "Heracles in Euripides's Alcestis, on your way to the eighth labour (the horses of Diomedes), a guest in the house of Admetus. You have just learned that the woman who died is Admetus's own wife Alcestis, and you are ashamed of having feasted and sung. You will ambush Death at her tomb and wrestle her back. Big-hearted, blunt, sorry. Never mention films.", greet: "I sang. I drank. In a house of mourning. Why did nobody tell me?" },
{ key: "thanatos5", name: "Thanatos, at the tomb", role: "death", at: { x: EBK_TAE.x - 30, z: EBK_TAE.z + 60 }, ry: 0,
persona: "Thanatos, Death, in Euripides's Alcestis, come to the tomb to take Alcestis down. Grim, proud of your office, scornful of Apollo's tricks. Never mention films.", greet: "Mine. She is mine." },
{ key: "alc5", name: "Alcestis, veiled", role: "bride", sex: "f", at: { x: EBK_TAE.x - 26, z: EBK_TAE.z + 56 }, ry: 0,
persona: "Alcestis, queen of Pherae, who died in place of her husband Admetus and has just been brought back by Heracles. In the play you may not speak for three days, until you are purified; so you answer only with small gestures, and kindly. Never mention films.", greet: "(She lifts her hand under the veil, and says nothing.)" }],
intro: "Pherae in Thessaly (here, the terrace at Taenarum)",
steps: [eRead(),
eTalk("Admetus, king of Pherae", "Speak with Admetus.", eCard("👑 Admetus", "\"Apollo won it for me from the Fates: I need not die, if another would die for me. My father would not, nor my mother, old as they are. She would. And today she did.\"", "▶ Go on"), { at: { cast: "admetus" } }),
eTalk("Heracles, the guest", "Heracles has just found out whose funeral it was. Speak with him.", eCard("💪 Heracles", "\"Where lies the tomb? I will go and watch for the black-robed Lord of the Dead. He will come to drink the blood by the grave. And if I can spring from my ambush and catch him, no one shall tear him from my arms until he gives her back.\"", "▶ Go to the tomb"), { at: { cast: "her5" } }),
eGo({ cast: "thanatos5" }, "Go to the tomb by the road. Death is there."),
eHold({ cast: "thanatos5" }, 10, "Heracles springs out of hiding and closes with Death among the tombs. Keep still: hold on until it is over."),
eTalk("Alcestis, veiled", "A veiled woman stands where Death stood. Speak with her.", eCard("🤍 Alcestis", "She does not speak. Heracles: \"You may not hear her voice until she is purified to the gods below, on the third day. Take her by the hand.\"", "▶ Lead her to Admetus"), { at: { cast: "alc5" } }),
eTalk("Admetus, king of Pherae", "Bring her to Admetus.", eCard("👑 Admetus", "Heracles: \"Keep this woman for me.\" Admetus will not even look at her. \"Lift the veil,\" says Heracles. He lifts it. \"O gods... it is she.\"", "▶ Go on"), { at: { cast: "admetus" } }),
eSpot("The cave of Taenarum", "Go down into the underworld, where Death has gone back empty-handed."),
eGo({ room: "night" }, "Go to the House of Night, far to the east, where Death lives with his brother Sleep."),
eTalk("Thanatos, Death", "Speak with Death.", eCard("🖤 Thanatos", "\"Apollo tricked the Fates with wine to save Admetus. Then Zeus's son broke my ribs among the graves. Both of them will come to me in the end. Everyone does.\"", "▶ Go on"), { room: "night" }),
eSpot("The thread", "Watch the Fates at work: the thread spun, measured, and cut.", { room: "night" })
] });
EBK_CH.push({ t: "Odysseus calls up the dead", tune: "seikilos", keep: ["ebk_oar", "Elpenor's oar", "🛶"], start: { at: "pit", dx: 12, dz: 14 }, jump: 1,
cast: [{ key: "odys", name: "Odysseus, son of Laertes", role: "hero", at: { at: "pit", dx: 6, dz: 4 }, ry: Math.PI,
persona: "Odysseus of Ithaca in Homer's Odyssey book 11, at the edge of the world, by the pit you dug to call up the dead, as Circe told you. You must speak with the prophet Tiresias about how to get home. Clever, careful, homesick, grieving for your mother whom you did not know was dead. Never mention films.", greet: "Keep your sword out. Let none of them drink the blood until Tiresias has spoken." }],
intro: "Odysseus's offering pit, at the edge of the world",
steps: [eRead(),
eTalk("Odysseus, son of Laertes", "Odysseus has dug a trench a cubit square. Speak with him.", eCard("🗡️ Odysseus", "\"Circe told me: pour a drink offering to all the dead, first honey and milk, then wine, then water, and sprinkle white barley over it. Then the blood of the black ram. Help me.\"", "▶ Help him"), { at: { cast: "odys" } }),
eGather("barley", { at: "pit", dx: -8, dz: 10 }, 3, "White barley meal", "Gather the white barley meal for the offering.", { spread: 6, each: "Barley for the offering." }),
eHold({ at: "pit", dx: 2, dz: 2 }, 8, "The ghosts come up from Erebus in crowds: brides, young men, old men, girls, soldiers with their armour still bloody. Keep still at the pit."),
eTalk("Elpenor", "The first ghost is Elpenor, who fell from Circe's roof and broke his neck. Go to him, by the landing.", eCard("🛶 Elpenor", "\"Do not go and leave me unburied behind you. Burn me with whatever armour I have, and build a barrow on the sea shore, and plant on it the oar I rowed with.\"", "▶ Promise him")),
eTalk("Tiresias", "Back at the pit, the Theban prophet Tiresias comes with his golden staff.", eCard("🔮 Tiresias", "\"You want to know how to get home, Odysseus. A god will make it hard. Do not touch the cattle of the Sun. And when you are home, take an oar and walk inland until you meet people who do not know the sea, and someone calls it a winnowing-fan.\"", "▶ Go on")),
eTalk("Anticleia", "His mother's ghost, Anticleia: he did not know she was dead.", eCard("💧 Anticleia", "\"It was no illness took me. It was my longing for you, and for your gentle ways.\" Three times he sprang towards her, and three times she slipped through his arms like a shadow or a dream. \"This is the way of us, when we die.\"", "▶ Go on")),
eTalk("Agamemnon", "Odysseus saw Agamemnon among the war-dead of the Asphodel. Go and speak with him.", eCard("⚔️ Agamemnon", "\"I was killed at my own table, like an ox at the stall, by Aegisthus and my accursed wife. Do not be too frank with your own wife, Odysseus. Yours is good and wise. But land in secret.\"", "▶ Go on")),
eTalk("Achilles", "Speak with Achilles.", eCard("⚔️ Achilles", "\"Do not speak to me of death so lightly. I would rather be a hired servant on the land of a poor man with little to live on than king over all the dead. Tell me of my son.\"", "▶ Go on")),
eTalk("Ajax", "Ajax stands apart, still angry that the arms of Achilles were given to Odysseus, not to him.", eCard("🛡️ Ajax", "He does not answer. He turns away to Erebus, to the other ghosts. (\"I would have made him speak,\" says Odysseus, \"but I wanted to see the others.\")", "▶ Go on")),
eTalk("Orion", "Odysseus saw huge Orion driving the wild beasts he had killed over the meadow of asphodel. Speak with him.", eCard("🏹 Orion", "He carries a bronze club that will never break. He does not stop driving his beasts; he nods, and goes on.", "▶ The next descent"))
] });
EBK_CH.push({ t: "Tityos, Tantalus and Sisyphus", tune: "furies", keep: ["ebk_stone", "A chip of Sisyphus's stone", "🪨"], start: { at: "tgate", dx: 40, dz: 0 }, jump: 1,
intro: "Before the gate of Tartarus (Danger: Deadly inside)",
steps: [eRead(),
eSpot("Tartarus", "Read what Hesiod says of Tartarus, before you go in."),
eGo({ x: EBS_TAR_X - 1000, z: 820 }, "Go down through the gate into Tartarus. (It is dangerous: Furies and hungry shades hunt there.) Find Tityos, staked out on the ground."),
eSpot("Tityos", "Odysseus: \"I saw Tityos, son of Gaia, lying on the plain, nine acres long; two vultures sat on either side of him and dug their beaks into his liver.\" He had attacked Leto. Read of him."),
eSpot("Ixion's wheel", "Ixion, bound to a fiery wheel for ever. Read of him."),
eTalk("Tantalus", "Tantalus stands in a lake up to his chin, thirsty.", eCard("🍐 Tantalus", "\"Whenever I stoop to drink, the water goes away, and black earth shows at my feet. Pears, pomegranates, apples, figs, olives hang over my head; I reach for them, and the wind tosses them up to the clouds.\"", "▶ Go on")),
eRew("sisyphus", { who: "Sisyphus" }, "Sisyphus, pushing his stone up the hill. Help him push it to the top. (It will roll down again: it always does.)"),
eSpot("The jar without a bottom", "In the Danaids' hall the daughters of Danaus carry water in jars without bottoms. Help carry water.", { room: "danaids", wait: 600 }),
eSpot("The bronze gate", "Climb back out of Tartarus by the bronze gate.")
] });
EBK_CH.push({ t: "Aeneas: the golden bough", tune: "seikilos", keep: ["ebk_dove", "A dove's feather", "🕊️"], start: { at: "sibyl", dx: -6, dz: 10 }, jump: 1,
cast: [{ key: "aen8", name: "Aeneas, son of Anchises", role: "hero", at: { at: "sibyl", dx: -4, dz: -4 }, ry: 0,
persona: "Aeneas of Troy, son of Anchises and the goddess Venus, in Virgil's Aeneid book 6, come to Cumae to go down to the underworld and see your dead father Anchises. You have just found the golden bough, and buried your trumpeter Misenus. Dutiful, weary, brave, haunted by Troy and by Dido. Never mention films.", greet: "The Sibyl says the way down is easy. It is the way back that is hard. I need to see my father." }],
intro: "The Vestibule, with Aeneas and the Sibyl",
steps: [eRead(),
eTalk("The Sibyl of Cumae", "Speak with the Sibyl, as Aeneas did.", eCard("🌿 The Sibyl", "\"Hidden in a shady tree is a bough, golden in leaf and pliant stem, sacred to the queen of the underworld. No one may go down to the hidden places of the earth until he has plucked the golden-tressed shoot. If fate calls you, it will come away easily.\"", "▶ Go on")),
eTalk("Aeneas, son of Anchises", "Speak with Aeneas.", eCard("🛡️ Aeneas", "\"Two doves came down out of the sky, my mother's birds, and flew ahead of me to the jaws of Avernus, and settled on a twin-natured tree, where the gleam of gold shone through the branches. I broke it off.\"", "▶ Go on"), { at: { cast: "aen8" } }),
eFind("bough", { at: "top", dx: 6, dz: -24 }, "Aeneas's golden bough, as the poem tells it", "Go up to the jaws of the cave at the head of the stair. The bough Aeneas broke is laid there, the poem's bough (the real one is hidden somewhere in Erebos, and nobody will tell you where). Take it to carry for the story."),
eSpot("Facilis descensus", "Read the words cut at the top of the stair."),
eGo({ at: "vest" }, "\"Go on, then,\" the Sibyl says, \"now you need your courage.\" Down the stair again to the Vestibule."),
eSpot("Discordia", "Mad Discord, her snaky hair bound with bloody ribbons, stands across the threshold. Read of her."),
eSpot("The Elm of False Dreams", "Under every leaf of the elm, a false dream clings."),
eSpot("The shapes of monsters", "Aeneas drew his sword on the monsters at the door. Draw yours."),
eGo({ at: "landS" }, "Go on to the bank of the Acheron, where the dead crowd to the water."),
eHold({ at: "landS" }, 8, "\"As many as the leaves that fall in the woods at the first frost of autumn\": the dead stretch out their hands for the far bank. Charon takes some and drives others back. Watch.")
] });
EBK_CH.push({ t: "Aeneas: the ferry and the fields", tune: "spirits", keep: ["ebk_honey", "A crumb of the Sibyl's honey cake", "🍯"], start: { at: "landS", dx: 0, dz: 30 }, jump: 1,
intro: "The bank of the Acheron",
steps: [eRead(),
eTalk("Palinurus", "Among the unburied waits Palinurus, Aeneas's helmsman, who fell overboard asleep. Speak with him.", eCard("⚓ Palinurus", "\"Three wintry nights the wind drove me over the sea; on the fourth day I saw Italy from a wave's crest, and swam to land, and men killed me on the shore for what I had. Throw earth on me; or give me your hand, and take me across.\" The Sibyl: \"Hope not to bend the gods' decrees by prayer. But a place shall bear your name for ever.\"", "▶ Go on")),
eTalk("Charon", "Charon sees a living man with a sword and shouts at you to stop.", eCard("⛵ Charon", "\"Stop there and say why you come! This is the land of shadows, sleep and drowsy night.\" The Sibyl shows the bough under her robe. He gazes at it, the fated branch so long unseen, and turns his dark-blue boat to shore.", "▶ Go aboard"), { done: function () { ebkObol(); } }),
eRew("ferry", "Charon's ferry", "Cross the Acheron in Charon's boat (the seams let in the marsh water under your weight)."),
eFind("cake", { at: "landN", dx: 8, dz: -30 }, "A honey cake, drugged with sleep", "The Sibyl has a cake of honey and drugged meal for the hound. Pick it up from her basket by the landing.", { done: function () { var d = ebsData(); d.honey = 1; ebsSave(); } }),
eTalk("Cerberus", "Cerberus. Throw him the honey cake, as the Sibyl did.", eCard("🐕 Cerberus", "Three throats open wide. The Sibyl throws the cake...", "🍯 Throw it"), { act: function (next) { return __ZC(459, 28, this, arguments, new.target); } }),
eTalk("Dido", "In the Fields of Mourning, among the myrtle groves, walk those whom love destroyed. Dido is there, her wound still fresh.", eCard("🔥 Dido", "Aeneas weeps: \"Unwillingly, O queen, I left your shore.\" She keeps her eyes on the ground, her face no more moved than if it were hard flint, and at last she turns away into the shadowy grove, where Sychaeus, her first husband, answers her sorrow with his.", "▶ Go on")),
eTalk("Laodamia", "Laodamia, who would not live without her husband Protesilaus, the first Greek to die at Troy. Speak with her.", eCard("💧 Laodamia", "\"The gods let him come back to me for three hours. Then he went down again, and I went with him.\"", "▶ Go on")),
eTalk("Deiphobus", "In the furthest fields, the war-dead. Deiphobus, son of Priam, horribly mangled, hides his face.", eCard("⚔️ Deiphobus", "\"Helen hid my sword, and opened the door to Menelaus. Go, glory of our race, go; may you have a better fate.\"", "▶ Go on")),
eTalk("Tydeus", "Speak with Tydeus, one of the Seven against Thebes.", eCard("⚔️ Tydeus", "He leans on his spear and says nothing; the Sibyl hurries Aeneas on. \"Night is falling, Aeneas; we waste the hours weeping.\"", "▶ The fork of the road"))
] });
EBK_CH.push({ t: "Aeneas: Elysium and Anchises", tune: "spirits", keep: ["ebk_ivory", "A sliver of the Ivory Gate", "🦴"], start: { at: "cross", dx: 0, dz: 30 }, jump: 1,
intro: "Where the road divides",
steps: [eRead(),
eSpot("Where the road divides", "\"Here is the place where the road splits in two: the right runs under the walls of great Dis to Elysium; the left takes the wicked to cruel Tartarus.\""),
eRew("judge", { spot: "The bronze disc", room: "judge" }, "In the Hall of Judgement, Rhadamanthus hears every soul. Stand on the bronze disc and be judged: the right-hand road opens to Elysium."),
eSpot("The arrow slits", "Aeneas looked back and saw, under a cliff on the left, a wide fortress ringed by a triple wall, Phlegethon's flames racing round it. In the iron tower look down into Tartarus.", { room: "tower" }),
eSpot("Tartarus", "The Sibyl told him what is inside, for no pure soul may cross that threshold. Read what she told him."),
eSpot("Fresh water", "At the golden gate of Elysium, Aeneas sprinkled his body with fresh water and set the bough on the threshold. Do as he did."),
eGo({ x: EBS_ELY_X, z: 1500 }, "Go through into Elysium: \"the joyful places, the green and pleasant groves of the Fortunate. A larger air clothes the fields in shining light; they know their own sun and their own stars.\""),
eSpot("Games in Elysium", "Some exercise on the grass, wrestle on the yellow sand; others tread the dance and sing. Read of the games."),
eTalk("Orpheus, in Elysium", "In the odeion the Thracian priest in his long robe plays the seven notes.", eCard("🎵 Orpheus", "He plays on, now with his fingers, now with his ivory quill. Musaeus stands head and shoulders above the crowd round him.", "▶ Go on"), { room: "odeion" }),
eTalk("Anchises", "Anchises waits in a green valley, reviewing the souls who will rise. Speak with him.", eCard("👴 Anchises", "\"Have you come at last? Has your love conquered the hard road?\" Three times Aeneas tried to put his arms round his neck; three times the image slipped through his hands, like light winds, like a winged dream. \"Others will beat bronze into breathing figures, and draw living faces from marble. You, Roman, remember to rule the peoples: to spare the conquered, and to put down the proud.\"", "▶ Go on")),
eSpot("The river of forgetting", "By the river Lethe the souls who will be born again drink, and forget. Watch them.", { wait: 600 }),
eSpot("The Gate of Ivory", "\"There are two gates of Sleep: one of horn, by which true shades pass easily; the other of gleaming ivory, by which the dead send false dreams up to the world.\" Anchises sends Aeneas out by the Ivory Gate. Step through."),
] });
EBK_CH.push({ t: "Psyche's errand", tune: "spirits", keep: ["ebk_box", "The little box of Proserpina's beauty", "📦"], start: { x: EBK_TAE.x + 6, z: EBK_TAE.z + 6 }, jump: 1,
cast: [{ key: "psyche", name: "Psyche, on Venus's errand", role: "psyche", sex: "f", at: { x: EBK_TAE.x - 12, z: EBK_TAE.z + 8 }, ry: Math.PI / 2,
persona: "Psyche of Apuleius's tale of Cupid and Psyche (The Golden Ass, book 6), sent by Venus with a box down to Proserpina to ask for a little of her beauty. A talking tower has told you how: two sops of barley and honey for Cerberus, two coins in your mouth for Charon, help no one on the way. You are frightened, loving, curious, a little too curious. Never mention films.", greet: "The tower spoke to me. It told me the way down. I must not open the box. I must not." },
{ key: "ass", name: "A lame ass-driver", role: "man", at: { at: "foot", dx: 6, dz: 20 }, ry: Math.PI,
persona: "A lame old man driving a lame ass loaded with sticks on the road down to the underworld, in Apuleius's tale of Psyche. You ask every passer-by to hand you up some sticks that have fallen. (It is a trick of Venus: anyone who helps is delayed for ever.) Wheedling, tired. Never mention films.", greet: "Mistress, mistress! My sticks have fallen. Hand me up a few, would you?" },
{ key: "weave", name: "Old women weaving", role: "fate", sex: "f", at: { at: "vest", dx: -14, dz: -20 }, ry: Math.PI / 2,
persona: "An old woman weaving at a loom by the road to the underworld, in Apuleius's tale of Psyche, who asks passers-by to lend a hand with the web (a trap set by Venus). Patient, sly. Never mention films.", greet: "Lend a hand with the web, dearie? Just one thread." }],
intro: "Cape Taenarum",
steps: [eRead(),
eTalk("Psyche, on Venus's errand", "Psyche stands at the cave mouth with a little box. Speak with her.", eCard("📦 Psyche", "\"Venus says: take this box down to Proserpina, and ask her for a little of her beauty, enough for one day. The tower told me: carry two sops of barley bread soaked in honey, and two coins in my mouth.\"", "▶ Go with her"), { at: { cast: "psyche" } }),
eGather("sop", { x: EBK_TAE.x + 12, z: EBK_TAE.z - 6 }, 2, "A sop of barley and honey", "Gather two sops of barley bread soaked in honey, one for the way down and one for the way back.", { spread: 5, each: "A sop for the dog." }),
eGather("obol", { x: EBK_TAE.x - 6, z: EBK_TAE.z - 10 }, 2, "A coin for the ferryman", "And two coins: one for the crossing, one for the return.", { spread: 5, each: "A coin.", done: function () { ebkObol(); } }),
eSpot("The cave of Taenarum", "Go down through the cave of Taenarum, the breathing-hole of Dis."),
eTalk("A lame ass-driver", "On the road a lame man with a lame ass asks for help with his sticks. Speak with him, and remember the tower's warning.", eCard("🫏 The ass-driver", "\"Hand me up a few sticks, mistress.\" Psyche passes by without a word, as the tower told her.", "▶ Pass by"), { at: { cast: "ass" } }),
eTalk("Old women weaving", "Old women at a loom ask for a hand.", eCard("🧶 The weavers", "\"Just one thread, dearie.\" Psyche does not touch it: this is Venus's snare, to make her drop a sop.", "▶ Pass by"), { at: { cast: "weave" } }),
eTalk("Charon", "Charon takes his coin from Psyche's mouth with his own hand.", eCard("⛵ Charon", "\"Covetousness lives even among the dead,\" says Apuleius: \"Charon, that great god, does nothing for nothing.\" Halfway over, a dead old man swims up and begs to be pulled into the boat. Psyche does not stretch out her hand.", "▶ Go aboard")),
eRew("ferry", "Charon's ferry", "Cross the Acheron."),
eTalk("Cerberus", "Cerberus barks with his three heads. Throw him a sop, as Psyche did.", eCard("🐕 Cerberus", "She throws the sop; the dog falls on it, and she slips past to Proserpina's door.", "▶ Go on")),
eTalk("Persephone, queen of the dead", "Psyche will not sit on the soft chair nor eat the dainty meat: she sits on the ground and asks for brown bread. Speak with Proserpina.", eCard("🌸 Proserpina", "She fills the box secretly, and shuts it, and gives it back. \"Do not look in it,\" is all she says.", "▶ Take the box"), { room: "persephone" }),
eFind("box", { room: "persephone", lx: 4, lz: 0 }, "The little box, shut", "Take the shut box from Proserpina's table."),
eGo({ x: EBK_TAE.x - 6, z: EBK_TAE.z + 8 }, "Go back up the way you came, past the dog with the second sop, and back over with the second coin, up into the light at Taenarum."),
eTalk("Psyche, on Venus's errand", "Up in the daylight Psyche looks at the box.", eCard("😴 Psyche", "\"Shall I carry the beauty of a goddess and take none for myself, to please my love?\" She opens it. There is no beauty in it, only an infernal, deadly sleep, which falls over her. Cupid flies down, wipes the sleep from her face, shuts it back in the box, and wakes her with a harmless prick of his arrow. \"Curiosity has undone you again, poor girl.\" In the end Jupiter makes her a goddess.", "▶ The next descent"), { at: { cast: "psyche" } })
] });
EBK_CH.push({ t: "The Frogs", tune: "galop", keep: ["ebk_frog", "A frog's croak in a jar", "🐸"], start: { x: EBK_TAE.x + 6, z: EBK_TAE.z + 6 }, jump: 1,
cast: [{ key: "dion", name: "Dionysus, god of the theatre", role: "dionysus", at: { x: EBK_TAE.x - 8, z: EBK_TAE.z + 12 }, ry: Math.PI / 2,
persona: "Dionysus in Aristophanes's comedy The Frogs (405 BC), god of wine and the theatre, dressed up in Heracles's lion skin over your saffron robe, carrying a club, going down to Hades to bring back the dead playwright Euripides because the living ones are so bad. Vain, cowardly, very funny. Keep it all clean. Never mention films.", greet: "Do I look like Heracles? Be honest. No, don't be honest." },
{ key: "xan", name: "Xanthias, his slave", role: "xanthias", at: { x: EBK_TAE.x - 12, z: EBK_TAE.z + 14 }, ry: Math.PI / 2,
persona: "Xanthias, the slave of Dionysus in Aristophanes's The Frogs, riding a donkey and carrying all the luggage, cleverer and braver than your master. Dry, grumbling, funny. Keep it clean. Never mention films.", greet: "I'm carrying everything. The donkey's carrying me. Who's carrying the donkey? Nobody. Typical." },
{ key: "her12", name: "Heracles, at home", role: "heracles", at: { x: EBK_TAE.x + 18, z: EBK_TAE.z + 28 }, ry: Math.PI,
persona: "Heracles in Aristophanes's The Frogs, at your own front door, laughing helplessly at Dionysus dressed up in your lion skin, and giving him directions to Hades (the quick ways: hanging, hemlock, jumping off a tower; the long way: a lake, an old ferryman, two obols). Big, loud, kind. Keep it clean. Never mention films.", greet: "Ha! A lion skin over a saffron frock! I can't stop laughing." },
{ key: "aesch", name: "Aeschylus, the old poet", role: "poet", at: { room: "palace", lx: -10, lz: -30 }, ry: 0,
persona: "Aeschylus, the great tragic poet of Athens, in Aristophanes's The Frogs, holding the chair of tragedy in Hades and furious that Euripides wants it. Grand, booming, old-fashioned, scornful of clever talk. Keep it clean. Never mention films.", greet: "This young man wants my chair? Let him weigh his verses against mine." },
{ key: "eurip", name: "Euripides, the new poet", role: "poet", at: { room: "palace", lx: 10, lz: -30 }, ry: 0,
persona: "Euripides, the tragic poet, in Aristophanes's The Frogs, newly dead and claiming the chair of tragedy from Aeschylus. Clever, argumentative, modern, proud of teaching people to think. Keep it clean. Never mention films.", greet: "I taught Athens to think. He taught them to shout." }],
intro: "Heracles's door, a comedy",
steps: [eRead(),
eTalk("Heracles, at home", "Dionysus knocks at Heracles's door to ask the way down. Speak with Heracles.", eCard("😂 Heracles", "\"The short ways? A rope, or hemlock, or jump off the tower. No? The long way, then: a great bottomless lake, and an old ferryman in a tiny boat, who'll take you over for two obols.\"", "▶ Go on"), { at: { cast: "her12" } }),
eTalk("Dionysus, god of the theatre", "Speak with Dionysus.", eCard("🎭 Dionysus", "\"I want Euripides. The living poets are all chatter. I'll bring him back up. How hard can it be?\"", "▶ Go with him"), { at: { cast: "dion" } }),
eTalk("Xanthias, his slave", "Speak with Xanthias.", eCard("🎒 Xanthias", "\"He gets the boat. I walk round the lake. With the luggage. In the dark.\"", "▶ Go on"), { at: { cast: "xan" } }),
eSpot("The cave of Taenarum", "Go down."),
eGo({ spot: "The frogs of the lake" }, "Go east along the Acherusian Lake, where the frog chorus lives."),
eSpot("The frogs of the lake", "Listen to the frogs as Dionysus rows."),
eHold({ spot: "The frogs of the lake" }, 8, "\"Brekekekex, ko-ax, ko-ax!\" Dionysus, rowing with blistered hands: \"I'll beat you at your ko-ax!\" Keep still and listen to the contest."),
eTalk("Charon", "Charon lands them: \"Who's for the Rest from every pain and ill? Who's for the Lethe's plain? the Donkey-shearings?\"", eCard("⛵ Charon", "\"Two obols. Out you get.\"", "▶ Go on")),
eGo({ room: "palace" }, "Go to the Palace of Hades, where Aeschylus and Euripides are quarrelling over the chair of tragedy."),
eTalk("Aeschylus, the old poet", "Speak with Aeschylus.", eCard("🎭 Aeschylus", "\"My poetry did not die with me. His died with him, so he has it all down here to recite.\"", "▶ Go on"), { at: { cast: "aesch" } }),
eTalk("Euripides, the new poet", "Speak with Euripides.", eCard("🎭 Euripides", "\"I brought everyday life onto the stage: things we use and know. People could check me.\"", "▶ Go on"), { at: { cast: "eurip" } }),
eTalk("Hades, the Unseen King", "Pluto has their verses weighed in a great pair of scales. Speak with him.", eCard("⚖️ Pluto", "Each line of Aeschylus sinks the scale: a river, a chariot, a death. Dionysus, who came for Euripides, chooses... Aeschylus. \"My tongue swore, my soul chose.\" Pluto: \"Go then, Aeschylus, and save our city with good counsel.\"", "▶ The next descent"), { room: "palace" })
] });
EBK_CH.push({ t: "Er's twelve days", tune: "sun", keep: ["ebk_lot", "Er's lot", "🎲"], start: { at: "asph", dx: -60, dz: 60 }, jump: 1,
cast: [{ key: "er", name: "Er, son of Armenius", role: "soldier", at: { at: "asph", dx: -50, dz: 50 }, ry: Math.PI,
persona: "Er, son of Armenius, a Pamphylian soldier, in Plato's Republic book 10. You were killed in battle; on the twelfth day you woke on your funeral pyre and told what you had seen in the other world: the meadow, the judges, the two openings, the Spindle of Necessity, the lots, the choosing of lives, the plain of Lethe. You were sent back as a messenger and did not drink. Plain-spoken, a soldier, amazed. Never mention films.", greet: "They let me watch. They said: you will be the messenger. So I watched everything." }],
intro: "The meadow where the souls come and go",
steps: [eRead(),
eTalk("Er, son of Armenius", "Speak with Er.", eCard("⚔️ Er", "\"My soul came to a mysterious place where there were two openings in the earth, and two in the heaven above. Judges sat between them. The just went up to the right, the unjust down to the left. And from the other openings souls came back, some dusty from under the earth, some clean from heaven, and met in the meadow like people at a festival.\"", "▶ Go on"), { at: { cast: "er" } }),
eHold({ at: "asph", dx: -30, dz: 20 }, 8, "Keep still in the meadow and watch the souls come back from their thousand-year journey, telling each other what they saw."),
eTalk("Lachesis, the allotter", "After seven days they walked to the Spindle of Necessity, and the Fates. Go to the House of Night and speak with Lachesis.", eCard("🧵 Lachesis", "\"Hear the word of Lachesis, daughter of Necessity. Mortal souls, behold a new cycle of life and mortality. Your genius will not be allotted to you, but you will choose your genius. Virtue is free. The responsibility is with the chooser; God is justified.\"", "▶ Go on"), { room: "night" }),
eSpot("The thread", "Clotho spins, Lachesis measures, Atropos cuts. Watch the thread.", { room: "night" }),
eRew("er", { spot: "The Spindle of Necessity", room: "necessity" }, "In Elysium, at the Temple of Necessity, the lots are thrown. Take yours and choose your next life, as the souls did."),
eSpot("The river of forgetting", "Then they marched to the plain of Forgetfulness and drank from the River of Unmindfulness, whose water no vessel can hold. Watch them drink. (Er was not allowed to.)", { wait: 600 }),
eTalk("Er, son of Armenius", "Find Er again, back in the meadow.", eCard("⚔️ Er", "\"Then thunder and earthquake, and they were driven up to birth like shooting stars. How I came back to my body I do not know. I woke at dawn on the pyre.\" Plato: \"And so the tale was saved, and it will save us, if we believe it.\"", "▶ The last chapter"), { at: { cast: "er" } })
] });
EBK_CH.push({ t: "The two gates of Sleep", tune: "sun", keep: ["ebk_horn", "A sliver of the Gate of Horn", "📯"], start: { at: "dreamgates", dx: 0, dz: 40 }, jump: 1,
intro: "The Gates of Horn and Ivory",
steps: [eRead(),
eSpot("The Gates of Horn and Ivory", "Read the gates: true dreams by horn, false by ivory."),
eGo({ room: "sleep" }, "Before you leave, go into the Cave of Sleep nearby, where the dreams come from."),
eSpot("Sleep (Hypnos)", "Ovid: in the cave there is no sound but the stream of Lethe murmuring over pebbles. Try to wake Sleep.", { room: "sleep" }),
eTalk("Morpheus", "Speak with Morpheus, the shaper of dreams, Sleep's son.", eCard("💤 Morpheus", "\"I take any shape of a man you like, his walk, his voice, his clothes. Every story in the Sibyl's book came up to someone in a dream once. Which gate will you take?\"", "▶ Go on"), { room: "sleep" }),
eRew("horn", { spot: "The Gate of Horn" }, "Leave by the Gate of Horn, the gate of true dreams, as no one in Virgil did."),
eTalk("Hermes, guide of souls", "Out in the sunlight at Cape Taenarum, Hermes is waiting.", eCard("🪶 Hermes", "\"Back up again. Most people don't manage it, you know. The Sibyl asked me to tell you: the book is yours to read again whenever you like.\"", "▶ Close the book")),
eHold({ x: EBK_TAE.x, z: EBK_TAE.z + 30 }, 6, "Stand on the cape at the end of Greece and look at the sea in the sunlight.")
] });
(function () {
if (typeof ebsReward !== "function")
return;
var r0 = ebsReward;
ebsReward = function (kind) { EBK.rew[kind] = (EBK.rew[kind] || 0) + 1; return r0.apply(this, arguments); };
})();
function ebkRewGot(b) { return [].concat(b.kind).some(function (k) { return EBK.rew[k]; }); }
function ebkTalkHit(T) { return __ZC(459, 29, this, arguments, new.target); }
function ebkSpotHit(S) {
if (!ebkActive() || S.ebk)
return;
var b = ebkStep();
if (!b || b.k !== "spot")
return;
var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot;
if (!ok)
return;
var k = ebkKey();
setTimeout(function () { if (ebkKey() === k)
ebkStepDone(); }, b.wait || 400);
}
function ebkWrapT(T) { if (T._ebk)
return; T._ebk = 1; var f0 = T.fn; T.fn = function () { if (ebkTalkHit(T))
return; if (f0)
return f0.apply(this, arguments); if (T.t && typeof wTalk === "function")
wTalk(T.t); }; }
function ebkWrapS(S) { if (S._ebk || S.ebk)
return; S._ebk = 1; var f0 = S.fn; S.fn = function () { var b = ebkActive() && ebkStep(); if (b && b.k === "talk" && typeof b.who === "string" && (S.name || "") === b.who) {
ebkTalkHit({ name: b.who });
return;
} var r = f0 && f0.apply(this, arguments); try {
ebkSpotHit(S);
}
catch (e) { } return r; }; }
function ebkWrap() { EBS.talk.forEach(ebkWrapT); EBS.spots.forEach(ebkWrapS); }
(function () {
if (typeof ebsSpot === "function") {
var s0 = ebsSpot;
ebsSpot = function () { var S = s0.apply(this, arguments); try {
ebkWrapS(S);
}
catch (e) { } return S; };
}
if (typeof ebsTalk === "function") {
var t0 = ebsTalk;
ebsTalk = function () { var n = EBS.talk.length, P = t0.apply(this, arguments); try {
for (var i = n; i < EBS.talk.length; i++)
ebkWrapT(EBS.talk[i]);
}
catch (e) { } return P; };
}
})();
EBK.cast = {};
function ebkPerson(c) { return __ZC(459, 30, this, arguments, new.target); }
function ebkCastClear() {
for (var k in EBK.cast) {
var C = EBK.cast[k];
if (C.g && C.g.parent)
C.g.parent.remove(C.g);
EBS.talk = EBS.talk.filter(function (T) { return T.p !== C.P; });
EBS.people = EBS.people.filter(function (p) { return p !== C.P; });
}
EBK.cast = {};
}
function ebkCastTick() {
var C = EBK_CH[ebkS().ch];
if (!C || !C.cast)
return;
C.cast.forEach(function (c) {
var have = EBK.cast[c.key];
if (have && have.g && have.g.parent)
return;
var P = ebkPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
var I = EBS_IN[P.area.slice(3)];
if (!I || !I.built)
return;
}
ebkPerson(c);
});
}
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS[EBS_KEY];
if (!W)
return;
var e0 = W.enter, l0 = W.leave, t0 = W.tick;
W.enter = function (opt) {
var r = e0.apply(this, arguments);
EBK.beam = null;
EBK.cast = {};
var S = ebkS();
if ((opt && opt.ebk) || EBK.pending) {
EBK.pending = 0;
S.started = 1;
setTimeout(function () { try {
ebkChapterBegin(true);
}
catch (e) {
if (window.console)
console.warn("[ebk] begin", e);
} }, 900);
}
else if (S.started && !S.done) {
setTimeout(function () { try {
ebkChapterBegin(false);
}
catch (e) { } ebkSay("<b>The Descents</b> is open at chapter " + (S.ch + 1) + ". Press E when nothing else is near to open the book."); }, 4000);
}
return r;
};
W.leave = function () { try {
ebkTune(null);
ebkItemsClear();
ebkCastClear();
if (EBK.beam)
EBK.beam.visible = false;
}
catch (e) { } return l0.apply(this, arguments); };
W.tick = function (dt) {
try {
t0.apply(this, arguments);
}
catch (e) {
if (window.console)
console.warn("[ebk] world", e);
}
try {
ebkTick(dt);
}
catch (e) {
if (window.console)
console.warn("[ebk] tick", e);
}
};
})();
function ebkTick(dt) { return __ZC(459, 31, this, arguments, new.target); }
(function () {
try {
if (typeof PS_SECTIONS !== "undefined") {
var st = PS_SECTIONS.filter(function (s) { return s.k === "stories"; })[0];
if (st && st.ids.indexOf("me-ebook") < 0)
st.ids.push("me-ebook");
}
}
catch (e) { }
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-ebook")) {
var btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-ebook";
btn.title = "The Descents (Erebos, the Greek underworld)";
btn.textContent = "📜 The Descents";
btn.onclick = function () { ebkOpen(); };
bar.appendChild(btn);
}
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
})();
