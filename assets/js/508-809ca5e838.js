/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function dldCard(title, body) { if (typeof evbCard === "function")
evbCard(title, body);
else if (typeof worldCard === "function")
worldCard("<b>" + title + "</b><p>" + body + "</p>"); }
function dldTomb() {
if (typeof drwFromTomb === "function") {
try {
drwFromTomb();
return;
}
catch (e) {
if (window.console)
console.warn("[dead-land] tomb", e);
}
}
dldCard("The great tomb", "The stone is too heavy to move tonight. Come back later.");
}
var DLD_VAULT = {
stair: "\"I went down a dark, tortuous stairway... through a dark passage, from which came a deathly, sickly odour, the odour of old earth newly turned.\" (Jonathan Harker's journal, Chapter IV.) The stair is the same here.",
boxes: "Fifty boxes of earth went from the chapel of Castle Dracula to Carfax, near London; the Count could rest only in the earth of his own land. These are a few of them, their lids loose, the earth inside damp and cold.",
niches: "The niches hold the old dead of the Count's house: a crest worn away, a date that might be 14-something. Nobody comes to keep them now, in the Land of the Dead or anywhere else.",
rose: "A branch of wild rose, laid on a coffin, keeps the Un-Dead inside it: so Van Helsing says in Chapter XVIII. Somebody has laid one here.",
book: "Dracula was written by Bram Stoker, an Irishman who managed the Lyceum Theatre in London, and published in 1897. It is told in letters, diaries, a ship's log and newspaper cuttings, all put in order by Mina Harker. The whole book is played from the great tomb: 27 chapters, from Bistritz to the castle in the snow."
};
var DLD_RELICS = [
{ k: "gold", e: "🪙", n: "A gold coin from the Count's heap", t: "\"A great heap of gold in one corner: gold of all kinds, Roman, and British, and Austrian, and Hungarian, and Greek and Turkish money, covered with a film of dust\" (Chapter IV). One coin, very old, very heavy." },
{ k: "earth", e: "🟫", n: "A handful of the Count's earth", t: "Earth from one of the fifty boxes, carried from the chapel of Castle Dracula to Carfax (Chapter VII and XIX). Damp, cold, smelling of the grave." },
{ k: "key", e: "🗝️", n: "An old iron key", t: "\"Doors, doors, doors everywhere, and all locked and bolted\" (Chapter II). One of the keys to them, long and black with rust." },
{ k: "garlic", e: "🧄", n: "A wreath of garlic flowers", t: "Van Helsing's garlic flowers, from Haarlem, rubbed round the window and the door to keep the Count out (Chapter X). Dried now, but they still smell." },
{ k: "cross", e: "✝️", n: "A little gold crucifix", t: "\"For your mother's sake\": the landlady's wife at Bistritz put her crucifix round Jonathan's neck (Chapter I). Somebody has hung one like it in the dark here." },
{ k: "log", e: "📜", n: "A page from the Demeter's log", t: "A page of the log of the Russian schooner Demeter, that came into Whitby harbour in the storm with a dead man lashed to her wheel (Chapter VII)." },
{ k: "knife", e: "🔪", n: "A broken Kukri blade", t: "Jonathan's great Kukri knife, that swept at the Count's throat at the end (Chapter XXVII). Only a piece of the blade, notched." }
];
function dldRS() { var R = store.dldRelics; if (!R || typeof R !== "object")
R = store.dldRelics = {}; return R; }
function dldRelic(k) { return __ZC(508, 0, this, arguments, new.target); }
function dldShelf() { return __ZC(508, 1, this, arguments, new.target); }
if (typeof evbTheme === "function") {
evbTheme("dracvault", { corner: "evb_blackcandles", seed: 1897, panel: 0x2A2428,
pal: { fab: "charcoal", fab2: "crimson", wood: "ebony", metal: "iron", stone: "stone", art: 9, rug: 0, rugv: 0 },
remap: { "D6D0C6|plaster": [0x4A4440, "stone"], "D8D0C0|coffer": [0x2A2624, "stone"], "B8AE9E|marble": [0x3A3430, "marble"], "D4CEC4|marble": [0x34302C, "marble"] },
hello: "⚰️ <b>The tomb of Count Dracula.</b> Cold air, and the smell of old earth. The stair down, the vault with its boxes, the niches; and at the far end, the great tomb with the one word on it. Press E there to walk the whole book. The way out is the iron door." });
evbHouse("dracvault", { g: EVB_GRID.temple, h: 4.6, levels: 1, stairX: 3.5, stairZ: 11, floors: ["The vault"], wall: 0x3A3430, trim: 0x1A1416,
plan: [{ hall: { k: "dvstair", n: "The Stair Down" }, spine: { k: "dvpass", n: "The Dark Passage" }, gallery: { k: "dvarch", n: "The Arches" },
back: { merge: EVB_BACK, k: "dvtomb", n: "The Great Tomb" },
r1i: { k: "dvboxes", n: "The Boxes of Earth" }, r1o: { k: "dvniche", n: "The Niches" },
r2i: { k: "dvbones", n: "The Bone Room" }, r2o: { k: "dvchains", n: "The Iron Room" },
r3i: { k: "dvrose", n: "The Wild Rose" }, r3o: { k: "dvcandle", n: "The Candle Niche" },
l1i: { k: "dvboxes2", n: "More Boxes" }, l1o: { k: "dvniche2", n: "The Old Dead" },
l2i: { k: "dvbook", n: "The Lectern" }, l2o: { k: "dvbones2", n: "The Ossuary" },
l3i: { k: "dvcoffins", n: "The Coffins" }, l3o: { k: "dvdark", n: "The Dark" } }] });
evbRooms({
dvstair: { sides: ["evb_blackcandles", "evb_chains"], acts: [[0.4, 0, 2.0, "The stair down", "read", function () { dldCard("The stair down", DLD_VAULT.stair); }]] },
dvpass: { sides: ["evb_chains", "evb_blackcandles"], acts: [[0.5, 0, 1.6, "Something glints in the dust", "pick up", function () { dldRelic("gold"); }]] },
dvarch: { far: ["evb_ossuary", "evb_blackcandles"] },
dvtomb: { mid: [["coffin", 0.55, 0], ["evb_darkaltar", 0.3, 0]], sides: ["evb_blackcandles", "coffin", "evb_blackcandles", "coffin"], far: ["evb_ossuary"],
acts: [[0.55, 0, 2.8, "The great tomb with the one word DRACULA", "go down into the book", dldTomb]] },
dvboxes: { grid: ["coffin", 2, 3], acts: [[0.5, 0, 1.8, "The boxes of earth", "look in", function () { dldCard("The boxes of earth", DLD_VAULT.boxes); }]] },
dvboxes2: { grid: ["coffin", 2, 2], sides: ["barrel", "barrel"], acts: [[0.5, 0, 1.6, "A box of earth with its lid off", "take a handful", function () { dldRelic("earth"); }]] },
dvniche: { far: ["evb_ossuary", "evb_ossuary"], sides: ["coffin", "evb_blackcandles"], acts: [[0.5, 0, 1.8, "The niches", "read", function () { dldCard("The niches", DLD_VAULT.niches); }]] },
dvniche2: { far: ["evb_ossuary"], sides: ["coffin", "coffin"], acts: [[0.5, 0, 1.6, "A little gold cross, hung on a niche", "take", function () { dldRelic("cross"); }]] },
dvbones: { far: ["evb_ossuary", "evb_ossuary"], sides: ["evb_ossuary"] },
dvbones2: { far: ["evb_ossuary"], sides: ["evb_ossuary", "evb_blackcandles"] },
dvchains: { sides: ["evb_chains", "evb_chains", "evb_chains"], acts: [[0.5, 0, 1.6, "A rusty key on a nail", "take", function () { dldRelic("key"); }]] },
dvrose: { mid: [["coffin", 0.5, 0]], sides: ["evb_blackcandles"], acts: [[0.5, 0, 1.8, "A branch of wild rose on the coffin", "look", function () { dldCard("Wild rose", DLD_VAULT.rose); }]] },
dvcandle: { grid: ["evb_blackcandles", 2, 2], acts: [[0.5, 0, 1.6, "A dry wreath of white flowers", "take", function () { dldRelic("garlic"); }]] },
dvbook: { mid: [["evb_darkaltar", 0.5, 0]], acts: [[0.5, 0, 1.8, "An old book on a lectern", "read", function () { dldCard("Dracula (Bram Stoker, 1897)", DLD_VAULT.book); }], [0.5, 0.35, 1.6, "The Relic Shelf", "look", dldShelf]] },
dvcoffins: { grid: ["coffin", 2, 3], acts: [[0.5, 0, 1.6, "A torn page, water-stained", "pick up", function () { dldRelic("log"); }]] },
dvdark: { sides: ["evb_chains", "evb_blackcandles"], acts: [[0.5, 0, 1.6, "Something sharp in the dark", "pick up", function () { dldRelic("knife"); }]] }
});
}
(function () {
if (typeof REALMS !== "undefined" && REALMS.dead) {
var E = REALMS.dead;
E.ground = 0x4A3C30;
E.tex = "earth";
E.path = 0x8A6E52;
E.skyTop = 0x221A44;
E.skyLow = 0xC87A50;
E.light = 0xFFD8B0;
E.amb = 0.62;
E.sun = 0.55;
E.stars = 0.35;
E.dens = 0.75;
}
if (typeof SKYWORK !== "undefined" && SKYWORK.dead) {
var S = SKYWORK.dead;
S.a = 0x2A1E4E;
S.b = 0xF09A58;
S.c = 0x140E28;
S.amt = 1.0;
S.speed = 0.25;
}
})();
function dldLite() { return typeof LITE !== "undefined" && !!LITE; }
function dldM(col, tex, o) { return typeof dpxMat === "function" ? dpxMat(col, tex, o || {}) : new THREE.MeshLambertMaterial({ color: col }); }
function dldG(col, op) { return typeof dpxGlow === "function" ? dpxGlow(col, op) : new THREE.MeshBasicMaterial({ color: col, transparent: op != null, opacity: op == null ? 1 : op }); }
function dldBox(g, w, h, d, m, x, y, z, ry) { if (typeof dpxBox === "function")
return dpxBox(g, w, h, d, m, x, y, z, ry); var o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.y = ry || 0; g.add(o); return o; }
function dldCyl(g, rt, rb, h, m, x, y, z, seg) { var o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 12), m); o.position.set(x, y, z); g.add(o); return o; }
function dldSph(g, r, m, x, y, z, seg) { var o = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 10, Math.max(5, ((seg || 10) * 0.6) | 0)), m); o.position.set(x, y, z); g.add(o); return o; }
function dldWord(g, txt, w, h, x, y, z, ink, bg) { return __ZC(508, 2, this, arguments, new.target); }
function dldHouse(g, o) { return __ZC(508, 3, this, arguments, new.target); }
function dldChurch(g) { return __ZC(508, 4, this, arguments, new.target); }
function dldKiosk(g) { return __ZC(508, 5, this, arguments, new.target); }
function dldOfrenda(g, s) { return __ZC(508, 6, this, arguments, new.target); }
function dldPicado(g, len, h) { return __ZC(508, 7, this, arguments, new.target); }
function dldLamp(g) { var ir = dldM(0x1A1A1A, "metal"); dldCyl(g, 0.08, 0.12, 3.6, ir, 0, 1.8, 0, 6); dldBox(g, 0.5, 0.6, 0.5, dldG(0xFFD08A), 0, 3.9, 0); dldBox(g, 0.62, 0.08, 0.62, ir, 0, 4.24, 0); dldBox(g, 0.6, 0.1, 0.6, ir, 0, 3.56, 0); }
function dldGrave(g, k, R, name) { return __ZC(508, 8, this, arguments, new.target); }
function dldCypress(g, s) { var lf = dldM(0x1E3A26), bk = dldM(0x3A2A1E, "bark"); dldCyl(g, 0.15 * s, 0.25 * s, 1.5 * s, bk, 0, 0.75 * s, 0, 6); var c = new THREE.Mesh(new THREE.ConeGeometry(1.1 * s, 8 * s, 8), lf); c.position.y = 5 * s; c.scale.x = 0.9; g.add(c); var c2 = dldSph(g, 1.0 * s, lf, 0, 2.2 * s, 0, 8); c2.scale.y = 1.6; }
function dldLaurel(g, s) { var lf = dldM(0x2E5A2A), bk = dldM(0x4A3A2A, "bark"); dldCyl(g, 0.18 * s, 0.24 * s, 2.4 * s, bk, 0, 1.2 * s, 0, 6); dldSph(g, 1.8 * s, lf, 0, 3.6 * s, 0, 10); dldCyl(g, 0.9 * s, 1.0 * s, 0.5 * s, dldM(0xE8DCC0, "plaster"), 0, 0.25 * s, 0, 10); }
function dldDraculaTomb(g) { return __ZC(508, 9, this, arguments, new.target); }
function dldBridge(g) { return __ZC(508, 10, this, arguments, new.target); }
function dldWall(g, len) { var pl = dldM(0xD8CCB0, "plaster"), cp = dldM(0x8A7A68, "stone"); dldBox(g, 0.6, 2.4, len, pl, 0, 1.2, 0); dldBox(g, 0.8, 0.2, len + 0.2, cp, 0, 2.5, 0); }
function dldGate(g) { return __ZC(508, 11, this, arguments, new.target); }
function dldGhostly(g) { return __ZC(508, 12, this, arguments, new.target); }
(function () {
if (typeof ldPut !== "function")
return;
var lp = ldPut;
ldPut = function (it, still, live) {
var n = live && live.children ? live.children.length : 0, r = lp.apply(this, arguments);
try {
if (it && it.t === "p" && it.o && it.o.dldGhost && live && live.children.length > n)
dldGhostly(live.children[live.children.length - 1]);
}
catch (e) {
if (window.console)
console.warn("[dead-land] spirit", e);
}
return r;
};
})();
(function () {
if (typeof ldTick !== "function")
return;
var lt = ldTick;
ldTick = function (dt) {
lt.apply(this, arguments);
try {
if (LD && LD.kind === "dead" && LD.g && LD.dldFl) {
var t = LD.t;
LD.dldFl.forEach(function (f, i) { var k = 1 + 0.08 * Math.sin(t * 3 + i); f.scale.set(k, 1 + 0.12 * Math.sin(t * 2.3 + i * 1.7), k); });
(LD.dldMist || []).forEach(function (m) { var u = m.userData.dldMist; if (u.x === undefined) {
u.x = m.position.x;
u.z = m.position.z;
} m.position.x = u.x + Math.sin(t * 0.05 + u.ph) * u.a; m.position.z = u.z + Math.cos(t * 0.04 + u.ph) * u.a; });
if (typeof scene !== "undefined" && scene && scene.fog && scene.fog.density !== undefined && typeof camera !== "undefined" && !(store && store.inside)) {
var lx = camera.position.x - LD.g.position.x, lz = camera.position.z - LD.g.position.z, inY = lx > 62 && lx < 162 && lz < -48 && lz > -152, want = inY ? 2.6 : 1, cur = LD.dldFogK || 1, nk = cur + (want - cur) * Math.min(1, dt * 0.8);
if (Math.abs(nk - cur) > 0.0005) {
scene.fog.density = scene.fog.density / cur * nk;
LD.dldFogK = nk;
}
}
}
}
catch (e) { }
};
})();
(function () {
try {
if (typeof CT_TALES !== "undefined") {
for (var i = CT_TALES.length - 1; i >= 0; i--)
if (CT_TALES[i].id === "dracula")
CT_TALES.splice(i, 1);
}
if (typeof CT_BY_ID !== "undefined")
delete CT_BY_ID.dracula;
if (typeof CT_BY_HOST !== "undefined" && CT_BY_HOST["land:dead"])
CT_BY_HOST["land:dead"] = CT_BY_HOST["land:dead"].filter(function (T) { return T.id !== "dracula"; });
}
catch (e) { }
})();
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.dead !== "function")
return;
var orig = LD_SETS.dead;
LD_SETS.dead = function (P) { orig(P); try {
dldLayout(P);
}
catch (e) {
if (window.console)
console.warn("[dead-land] layout", e);
} };
})();
var DLD_L = "the Land of the Dead";
var DLD_SPIRITS = [
["dld_sp_abuela", "Doña Refugio, a grandmother", "a grandmother who died in 1961 in Oaxaca and comes back each year to her family's ofrenda; warm, a little bossy, proud of her mole", "Mija, mijo, did they put out the mole? I can smell it from the river. Every year they forget the salt, and every year I forgive them.", "f", 0x3A2A4A, "dress", 0xD8D8D8, "bun"],
["dld_sp_soldadera", "Valentina, a soldadera", "a soldadera, a woman who fought in the Mexican Revolution in 1913, with a rifle and a bandolier, brave and laughing", "They sang songs about us, you know. 'La Adelita'. I never heard them; I was too busy marching. Now I hear them every year on this road.", "f", 0x6A5A3A, "dress", 0x1A1010, "long"],
["dld_sp_warrior", "Itzcóatl, an eagle warrior", "an Aztec eagle warrior who died in battle five hundred years ago; those who die in battle walk with the sun, so he only visits", "We who die in battle go east with the sun for four years, and come back as hummingbirds. I came back as a hummingbird. I am visiting as a man, for tonight.", "m", 0xC8A040, "tunic", 0x1A1010, "long"],
["dld_sp_child", "Paquito, a little boy", "a little boy who died of a fever in 1918; the little ones come first, on the first of November, the day of the angelitos", "My mamá puts out toys for me, and sweet bread, and a little cup of chocolate. I come first, before the grown-ups. That's the rule!", "m", 0xE8D8B8, "shirt", 0x3A2A1A, "short"],
["dld_sp_sailor", "Mr. Jonas Pell, a drowned sailor", "an English sailor drowned off Veracruz in 1883, who found his way here and never left, polite and puzzled", "Took a wrong turn at the river, I did. Very hospitable people. They put out a cup of rum for me every year, though I'm nobody's.", "m", 0x1A2A4A, "coat", 0x6A4A2A, "short"],
["dld_sp_musician", "Don Chuy, a mariachi", "a mariachi violinist who died in 1974 and still plays for the dead on their night", "Every year somebody asks for 'La Llorona'. Every year I play it. Sad songs are the happiest ones here.", "m", 0x1A1A1A, "coat", 0x1A1010, "short"],
["dld_sp_bride", "Rosalía, in her wedding dress", "a young woman who died on her wedding day in 1890; gentle, not sad any more", "He married again, and was happy, and now he is here too, with both of us. It is very complicated and we laugh about it.", "f", 0xF4F0E8, "dress", 0x2A1A10, "long"],
["dld_sp_teacher", "Maestra Inés, a schoolteacher", "a village schoolteacher who died in 1952 and taught three generations to read", "Read to your children. That is all. Read to them, and one day they will put a book on your ofrenda.", "f", 0x4A3A5A, "dress", 0x8A8A8A, "bun"],
["dld_sp_farmer", "Don Anselmo, a farmer", "an old farmer of maize and beans who died in 1930; slow, kind, smelling of earth", "The marigolds lead us home. The smell is strong, you see, and we have no eyes to speak of. A path of petals, and we follow.", "m", 0xE8E0D0, "shirt", 0xD8D8D8, "short"],
["dld_sp_scholar", "Fray Bernardino, an old friar", "a Spanish friar of the 1500s who wrote down the old Aztec teachings of the road to Mictlán in a great book, the Florentine Codex", "I wrote it all down, what the old men told me: the river, the dog, the mountains, the wind of knives. Nine places, four years. Ask the xolo by the river if you would walk it.", "m", 0x5A4A3A, "robe", 0x8A8A8A, "short"],
["dld_sp_pilot", "Captain Emilio Carranza", "a Mexican aviator who died in 1928 flying home from New York, still in his flying jacket", "They built me a monument in the woods where I fell. Very kind. I prefer this: the lanterns, and the music, and nobody making speeches.", "m", 0x5A4A2A, "coat", 0x1A1010, "short"],
["dld_sp_girl", "Lupita, a little girl", "a little girl who died in 1999, who comes back with the angelitos and plays tag on the marigold path", "You can't catch me! I'm a ghost! ... That's not fair, you're not even trying." + "", "f", 0xE86A9A, "dress", 0x1A1010, "long"]
];
function dldLayout(P) { return __ZC(508, 13, this, arguments, new.target); }
var DLD_MICT = [
{ n: "The xolo by the river", x: -136, z: -48, scene: "xolo",
t: "The xolo dog", b: "A small hairless dog, grey-black, with a wise face, sits by the bridge as if he has been waiting for you. The old people said every soul needs a dog to guide it over the river of the dead: a xoloitzcuintli, the dog of the god Xólotl. Families kept them, and when someone died the dog went with them.",
q: "What did the old people say a soul needs to cross the river of the dead?", a: ["A boat and an oar", "A dog to carry it over", "Nothing at all"], r: 1, y: "The xolo wags his tail and trots off over the bridge. Follow him to the far bank." },
{ n: "Apanohuaya, the river", x: -182, z: -42, scene: "ford",
t: "Apanohuaya, the first place", b: "The river is wide and dark here. The Florentine Codex says the soul came first to a great river, and crossed it on the back of its dog: a yellow dog, they said, for a white dog would say \"I have just washed myself\" and a black one \"I have just been dirtied\". The xolo wades in; you hold on.",
q: "In the old telling, which dog would carry you across?", a: ["A white dog, because it is clean", "A black dog, because it is strong", "A yellow dog: the white and the black make excuses"], r: 2, y: "Over, and wet to the knees. Up ahead, two mountains, very close together." },
{ n: "Tepeme Monamictlan, where the mountains meet", x: -222, z: -112, scene: "mountains",
t: "Where the mountains meet", b: "Two mountains stand so close that the path runs between them, and the old telling says they crash together and part again. The dead must go through at the right moment.",
q: "How do you pass between the meeting mountains?", a: ["Climb over the top", "Wait until they part, and go through quickly", "Dig under them"], r: 1, y: "A rumble behind you as they close. You are through." },
{ n: "Iztepetl, the hill of obsidian", x: -252, z: -182, scene: "obsidian",
t: "The hill of obsidian", b: "A hill of black glass, all edges. Obsidian is real: volcanic glass, sharper than steel, which the Mexica made into knives and mirrors. The dead must climb it.",
q: "What is obsidian?", a: ["Black volcanic glass", "A black wood", "Coal"], r: 0, y: "Carefully, step by step, over the top." },
{ n: "Itzehecayan, the wind of knives", x: -200, z: -252, scene: "snow",
t: "The wind of knives", b: "Up here it snows, and the wind cuts like obsidian blades. The old telling says the dead were burned with their clothes and goods so they would have something against this wind.",
q: "What did the families give the dead for the cold of the wind of knives?", a: ["Their clothes and goods, burned with them", "A fire", "Nothing: the dead feel no cold"], r: 0, y: "You pull your coat round you. The xolo presses close, warm, and you go on." },
{ n: "Pancuecuetlacayan, where the dead float like flags", x: -120, z: -272, scene: "flags",
t: "Where the dead float like flags", b: "Tall banners stream in a wind that comes from nowhere. Here, the telling says, the souls are lifted and blown about like flags, and must hold on.",
q: "What do you hold on to, here?", a: ["The flags", "The xolo, who is low and heavy", "Nothing"], r: 1, y: "The wind drops. Ahead, something whistles past." },
{ n: "Temiminaloyan, the place of arrows", x: -40, z: -262, scene: "arrows",
t: "The place of arrows", b: "Arrows stand in the ground everywhere, still quivering, shot by no one you can see. The dead walk on through them.",
q: "What should you do in the place of arrows?", a: ["Run back", "Keep walking, and not be afraid", "Pick up the arrows"], r: 1, y: "Not one touches you. Ahead, eyes in the dark, green and gold." },
{ n: "Teocoyocualloyan, the jaguars", x: 40, z: -252, scene: "jaguars",
t: "The jaguars", b: "Stone jaguars, or real ones, it is hard to tell in the dusk. The old telling is fierce here; the land's telling is gentle: the jaguars look into your heart, and let the brave go by.",
q: "The jaguars sniff at you. What do you do?", a: ["Stand still and let them look", "Throw a stone", "Shout"], r: 0, y: "A rough tongue on your hand. They let you go by." },
{ n: "Izmictlan Apochcalolca, the narrow waters", x: 112, z: -222, scene: "mist",
t: "The narrow waters", b: "A dark water in a narrow place, and a mist so thick you cannot see your own hands. The xolo knows the way by smell.",
q: "How do you find your way through the mist?", a: ["Follow the xolo", "Wait for the mist to lift", "Swim"], r: 0, y: "His tail in your hand, step by step. The mist thins. Steps of stone, going up." },
{ n: "Mictlán, the house of the Lord and Lady of the Dead", x: 186, z: -236, scene: "temple",
t: "Mictlán", b: "The ninth place: a great stepped house of stone, and on its top Mictlantecuhtli, the Lord of the Dead, and Mictecacihuatl, the Lady, who keeps the bones of the dead and, they say, keeps the Day of the Dead itself. The journey has taken four years in the old telling. The Lady smiles at you: \"You have come all the way. Now, go home for the night: they are waiting for you, with marigolds.\"",
q: "The souls brought gifts to the Lord and Lady of the Dead at the end. What were they?", a: ["Gold", "The paper, cloth and gifts their families gave them at the burial", "Flowers they picked on the road"], r: 1, y: "You lay down your gift. The Lady gives you a marigold, bright as a lamp. Go home: back over the marigold bridge to the ofrendas in the plaza." },
{ n: "Home: the ofrendas in the plaza", x: -10, z: -92, scene: null,
t: "Home for the night", b: "The candles are lit, the bread is out, the marigolds smell of home. This is why the families build the ofrendas: so the dead can find their way back for one night a year, and be remembered. You put your marigold from Mictlán on the altar.",
q: "Why do the families put out marigolds (cempasúchil)?", a: ["They are cheap", "Their colour and strong smell guide the dead home", "For luck at cards"], r: 1, y: "🌼 <b>The Road to Mictlán: walked.</b> You keep the marigold from Mictlán. The spirits nod to you as you pass. Walk it again whenever you like." }
];
function dldMS() { if (!store.dldMict)
store.dldMict = { s: 0, done: 0, n: 0 }; return store.dldMict; }
function dldMictUse(i) { return __ZC(508, 14, this, arguments, new.target); }
function dldMictScene(g, k) { return __ZC(508, 15, this, arguments, new.target); }
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.dead !== "function")
return;
var orig = LD_SETS.dead;
LD_SETS.dead = function (P) { orig(P); try {
dldMictLayout(P);
}
catch (e) {
if (window.console)
console.warn("[dead-land] mictlan", e);
} };
})();
function dldMictLayout(P) { return __ZC(508, 16, this, arguments, new.target); }
