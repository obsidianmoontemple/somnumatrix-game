/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SHC = { on: false, prev: false, deco: null, cell: null, marks: null, fair: null, proc: null, hunt: null, show: null, said: {}, t: 0, st: 0, pt: 0, ft: 0,
near: null, lite: false, warned: false, folk: {}, folkT: 0, mist: null };
var SHC_PAY = {
hunt: ["The Great Lantern Hunt (all thirteen)", 40], toss: ["The Pumpkin Toss", 10], cauldron: ["The Witches' Cauldron", 15],
fortune: ["A Halloween fortune", 5], story: ["A tale at the Storyteller's Fire", 10], show: ["The Phantasmagoria", 10], parade: ["Walking with the Guisers' Procession", 15]
};
var SHC_KEEP = {
hunt: ["shn_lostlantern", "A lost lantern of Somnucor", "🏮"], toss: ["shn_hoop", "A Pumpkin Toss hoop", "⭕"], cauldron: ["shn_newt", "A witch's eye of newt (in a jar)", "🧪"],
fortune: ["shn_peel", "An apple peel fortune", "🍏"], story: ["shn_ember", "An ember from the Storyteller's Fire", "🔥"], show: ["shn_lanternslide", "A Phantasmagoria lantern slide", "🎞️"],
parade: ["shn_guisemask", "A guiser's mask", "🎭"]
};
var SHC_SWITCH = { city: "Dress Somnucor (every street, building, lamp, park, the Tower and the plaza)", folk: "Costumes on the city's people", fair: "The Samhain Fair and the procession in the Tower Plaza" };
if (typeof SHN_PAY !== "undefined")
for (var shcK in SHC_PAY) {
SHN_PAY[shcK] = SHC_PAY[shcK];
SHN_KEEP[shcK] = SHC_KEEP[shcK];
}
var SHC_PAL = [0xFF7A1A, 0x6A2AA8, 0x1A1418, 0xF0E2C0, 0xE8A020];
var SHC_STALLS = [
{ k: "hunt", n: "The Lantern Keeper", sub: "the Great Lantern Hunt", col: "#FF8A20", verb: "ask about the lost lanterns" },
{ k: "toss", n: "The Pumpkin Toss", sub: "hoops onto pumpkins", col: "#FF6A00", verb: "throw some hoops" },
{ k: "cauldron", n: "The Witches' Cauldron", sub: "double, double toil and trouble", col: "#5AD06A", verb: "stir the cauldron" },
{ k: "fortune", n: "The Fortune Booth", sub: "Halloween fortunes, as Burns told them", col: "#B07AF0", verb: "have your fortune told" },
{ k: "story", n: "The Storyteller's Fire", sub: "ghost stories by the fire", col: "#FFB050", verb: "sit by the fire for a tale", fire: true },
{ k: "show", n: "The Phantasmagoria", sub: "the ghost show of 1798", col: "#A0C8FF", verb: "watch the ghost show", screen: true }
];
var SHC_BREW = [["🐍", "Fillet of a fenny snake"], ["👁️", "Eye of newt"], ["🐸", "Toe of frog"], ["🦇", "Wool of bat"], ["🐕", "Tongue of dog"], ["🦎", "Lizard's leg"], ["🦉", "Howlet's wing"], ["🪱", "Blind-worm's sting"]];
var SHC_FORTUNES = [
{ n: "Pulling the kail stocks", how: "Eyes shut, you go into the kail-yard and pull the first stalk you touch.",
out: ["A tall straight stalk with plenty of earth at the root: a tall true love, and a fortune with them.", "A little crooked stalk: your love will be small and a bit of a character, and all the better for it.", "Sweet at the heart when you taste it: a kind temper in the one you will marry."] },
{ n: "Burning the nuts", how: "You set two nuts on the hearth, one named for you and one for another.",
out: ["They burn quietly side by side: a long and peaceful match.", "One jumps away from the other with a crack: a quarrel, and a parting before the year is out.", "They blaze up together and are gone: a short bright love, and a song about it."] },
{ n: "The three dishes", how: "Blindfold, you dip your hand into one of three dishes: clean water, foul water, or none.",
out: ["Clean water: you will marry a maid or a bachelor.", "Foul water: you will marry someone who has been married before.", "The empty dish: no marriage at all this year, and a great deal of freedom."] },
{ n: "The apple at the mirror", how: "Alone, by one candle, you eat an apple before the glass and comb your hair.",
out: ["A face seems to look over your shoulder: someone is thinking of you tonight.", "Only your own face, and the candle: you are the master of your own year.", "The candle gutters, steadies: good news comes in the dark half of the year."] },
{ n: "The apple peel", how: "You peel an apple in one long ribbon and throw it over your left shoulder.",
out: ["It falls in the shape of an S.", "It falls in the shape of an M.", "It falls in the shape of a J.", "It falls in the shape of an A.", "It falls in the shape of an E.", "It breaks in two: try again next year."], peel: true },
{ n: "The egg in the glass", how: "You drop the white of an egg into a glass of water and read the shapes.",
out: ["A ship: a journey over water.", "A church: a wedding you will dance at.", "A tree: a home that grows bigger every year.", "A coffin-shape: someone is asking too much of you; say no."] },
{ n: "Winnowing the wind", how: "Three times you go through the motions of winnowing corn in the barn, with both doors open.",
out: ["The third time, the wind brings a word you needed to hear.", "A shadow passes the far door: an old friend comes back.", "Nothing but the wind: the year is yours to make."] }
];
var SHC_TALES = [
{ n: "Stingy Jack and the turnip lantern", by: "an old Irish folk tale", pages: [
"Stingy Jack was the meanest man in all Ireland, and the cleverest. One Samhain night the Devil himself came to collect him, and Jack, who was thirsty, asked for one last drink. The Devil, who had no money either, turned himself into a silver sixpence to pay for it.",
"Quick as you like, Jack put the sixpence in his pocket, right next to a little silver cross. The Devil could not change back. He had to promise to leave Jack alone for ten years before Jack would let him out.",
"Ten years later the Devil came again, and Jack asked him to climb an apple tree and fetch him an apple. Up went the Devil, and Jack carved a cross into the bark. Down the Devil could not come, until he promised never to take Jack's soul at all.",
"When Jack died at last, Heaven would not have such a man, and the Devil kept his promise and would not take him either. He threw Jack a single burning coal from Hell to light his way, and laughed.",
"Jack hollowed out a turnip, put the coal inside, and has walked the roads ever since, looking for somewhere to rest. That is why, on Samhain night, people carve lanterns and set them in their windows: so Jack goes by, and so does anything else that walks."
] },
{ n: "The Legend of Sleepy Hollow", by: "after Washington Irving (1820)", pages: [
"In a quiet valley by the Hudson River there was once a schoolmaster called Ichabod Crane: tall, thin as a rail, with hands that dangled a mile out of his sleeves. He believed every ghost story he was ever told, and he had heard a great many.",
"The one they told most in Sleepy Hollow was of a Hessian trooper whose head had been carried away by a cannonball. Every night, they said, he rode out from the churchyard to look for it, and raced back before dawn. Over the bridge by the church, they said, he could not follow you.",
"One autumn night Ichabod rode home late from a party, on a borrowed old plough-horse called Gunpowder. In the dark beside the road a great black horseman fell in beside him and would not pass and would not drop behind.",
"Ichabod kicked Gunpowder into a gallop. The horseman galloped too. Then, against the sky, Ichabod saw that the rider had no head on his shoulders. He carried it before him on the saddle.",
"The church bridge! Ichabod thundered over it and turned to look. The horseman rose in his stirrups and hurled his head straight at him. In the morning they found Gunpowder grazing at the gate, Ichabod's hat in the road, and beside it a smashed pumpkin. Ichabod was never seen in Sleepy Hollow again."
] },
{ n: "The Tell-Tale Heart", by: "after Edgar Allan Poe (1843)", pages: [
"\"True! Nervous, very nervous I had been and am; but why will you say that I am mad?\" So the man begins, and tries to prove it by telling you how calmly he did it.",
"He lived with an old man he says he loved. But the old man had one pale blue eye, with a film over it, like a vulture's, and whenever it looked at him his blood ran cold. So he made up his mind to be rid of that eye forever.",
"Every night for a week, at midnight, he opened the old man's door, slowly, slowly, and shone a thin thread of lantern-light in. On the eighth night the old man woke. And the man heard a low, dull, quick sound, like a watch wrapped in cotton: the old man's heart, beating louder and louder.",
"It was done, and the old man was hidden under the floorboards, and when the police came at four in the morning the man smiled and showed them every room, and set their chairs right over the place.",
"They chatted. They stayed. And under the floor he began to hear it again: the low, dull, quick sound, louder, louder. Surely they heard it too! \"Villains!\" he shrieked. \"Tear up the planks! Here, here! It is the beating of his hideous heart!\""
] },
{ n: "The Signal-Man", by: "after Charles Dickens (1866)", pages: [
"A traveller climbed down into a deep railway cutting to talk to the lonely man who kept the signal box beside a black tunnel. The signal-man was polite and clever, but he kept looking at the red danger-light by the tunnel's mouth, as if afraid of it.",
"At last he told the traveller why. Twice he had seen a figure standing by that red light, one arm across its face, the other waving wildly, and heard a voice calling, \"Halloa! Below there! Look out!\" Each time, within hours, there had been a terrible accident on the line.",
"Now the figure had come a third time, waving and calling, and nothing had happened yet. \"What is the danger? Where is it?\" he asked. \"If I telegraph a warning, they will think me mad.\"",
"The traveller promised to come back the next evening. When he did, there were men gathered on the line by the tunnel. The signal-man had been struck by an engine coming out of it, at first light.",
"\"I called to him,\" said the driver, \"and when he didn't look up I put my arm across my eyes, so as not to see, and waved the other, and shouted: Halloa! Below there! Look out!\""
] },
{ n: "The Monkey's Paw", by: "after W. W. Jacobs (1902)", pages: [
"On a wild night, an old soldier back from India showed the White family a dried-up little monkey's paw. A holy man had put a spell on it, he said, to show that fate rules our lives, and those who interfere with it do so to their sorrow. Three men could each have three wishes from it.",
"He threw it on the fire. Mr White pulled it out. And, half laughing, he wished for two hundred pounds to pay off the house. The paw twisted in his hand like a snake.",
"The next day a man came from the factory where their son Herbert worked. There had been an accident with the machinery. The firm took no blame, but wished to make a payment: two hundred pounds.",
"Mad with grief, Mrs White made her husband wish their son alive again. That night there came a knock at the door. Then another, louder. She ran to pull back the bolt.",
"But Mr White had remembered how Herbert had looked after the machinery. He found the paw on the floor and frantically breathed his third and last wish. The knocking stopped. The door swung open on an empty road, and a street lamp flickering on it."
] },
{ n: "Oh, Whistle, and I'll Come to You, My Lad", by: "after M. R. James (1904)", pages: [
"Professor Parkins, who did not believe in ghosts, went to a little seaside town for a golfing holiday and took a room with two beds. Walking on the windy shore he found an old bronze whistle in the ruins of a Templar church.",
"On it were scratched some Latin words: \"Who is this who is coming?\" He blew it. The note was far away and lonely, and at once a great gust of wind came off the sea and nearly blew the window in.",
"That night he dreamed of a figure running along the shore, and of something pale behind it that flapped and stumbled after it in the dusk. In the morning the sheets of the other bed were rumpled, as though someone had lain there.",
"The next night he woke and saw the spare bed's covers rise. Something sat up in it: a figure with a face of crumpled linen, which felt about the room with blind arms, and turned toward him.",
"A neighbour broke in at his shout and the thing collapsed into a heap of bedclothes on the floor. The Professor threw the whistle into the sea the next day. He believes in a good deal more than he used to."
] },
{ n: "The Dullahan", by: "Irish folklore", pages: [
"In the old Irish tales the Dullahan is a rider on a black horse, who carries his own head under his arm. The head glows like old cheese gone bad, and its eyes dart about in the dark, and it can see for miles.",
"He rides out at the time of the great feasts, Samhain above all, and wherever he stops, he calls out a name. The one whose name he calls will not see the year out.",
"Locked gates fly open before him. If you look out at him from your window, he may throw a basin of blood in your face, to mark you. If you meet him on the road, best to look away.",
"There is only one thing he fears, and that is gold. Even a pin of gold, held up before him, will send him galloping back the way he came.",
"So on Samhain night, when the wind gets up and you hear hooves on the road, keep a little gold about you. The people of Somnucor carry a coin in their pocket just in case."
] }
];
var SHC_PROC_R = 45;
var SHC_FAIR_R = [108, 100, 114];
function shcOff(k) { var S = typeof SHN !== "undefined" && SHN.state; return !!(S && S.off && S.off.indexOf(k) >= 0); }
function shcOn(part) {
if (typeof shnOn !== "function")
return false;
if (SHC.prev && typeof shnKeeper === "function" && shnKeeper())
return true;
return shnOn() && !shcOff(part || "city");
}
function shcCity() { return typeof inSomnucorNow === "function" && inSomnucorNow() && !(typeof WLD !== "undefined" && WLD.on) && typeof walkMode !== "undefined" && walkMode; }
function shcLite() { return typeof LITE !== "undefined" && !!LITE; }
function shcHash(a, b) { var h = ((a * 73856093) ^ (b * 19349663) ^ 0x5bd1e995) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h ^ (h >>> 16)) >>> 0; }
function shcY(x, z) { return typeof terrainY === "function" ? terrainY(x, z) : 0; }
function shcAt(r, a) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
var SHC_TEX = {};
function shcTex(key, w, h, fn) { if (SHC_TEX[key])
return SHC_TEX[key]; var t = wTex(w, h, fn); if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding; return (SHC_TEX[key] = t); }
function shcFaceTex(n) { return __ZC(364, 0, this, arguments, new.target); }
function shcWebTex() { return __ZC(364, 1, this, arguments, new.target); }
function shcBannerTex(n) { return __ZC(364, 2, this, arguments, new.target); }
function shcStripeTex(col) {
return shcTex("stripe" + col, 256, 128, function (x, W, H) {
for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#16100C" : col;
x.fillRect(i * W / 8, 0, W / 8, H);
}
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(0, H * 0.8, W, H * 0.2);
});
}
function shcMistTex() {
return shcTex("mist", 128, 128, function (x, W, H) { var g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(200,206,220,.55)"); g.addColorStop(0.5, "rgba(180,186,204,.22)"); g.addColorStop(1, "rgba(160,166,190,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
}
function shcSignTex(title, sub, col) { return __ZC(364, 3, this, arguments, new.target); }
var SHC_GEO = {};
function shcGeo(k) { return __ZC(364, 4, this, arguments, new.target); }
var SHC_MAT = {};
function shcMat(k) { return __ZC(364, 5, this, arguments, new.target); }
var SHC_O = new THREE.Object3D(), SHC_C = new THREE.Color();
function shcInst(G, geo, mat, list, cols) { return __ZC(364, 6, this, arguments, new.target); }
function shcPumpkins(G, list) {
if (!list.length)
return;
shcInst(G, shcGeo("pumpkin"), shcMat("pumpkin"), list);
shcInst(G, shcGeo("stem"), shcMat("stem"), list);
[0, 1, 2].forEach(function (f) { shcInst(G, shcGeo("face"), shcMat("face" + f), list.filter(function (p, i) { return i % 3 === f; })); });
}
function shcModels(G, file, want, list, gen, then) { return __ZC(364, 7, this, arguments, new.target); }
function shcDrop(G) {
if (!G)
return;
if (G.parent)
G.parent.remove(G);
G.traverse(function (m) { try {
if (m.isInstancedMesh && m.userData.shcOwn && m.dispose)
m.dispose();
if (m.userData.shcMine) {
if (m.geometry)
m.geometry.dispose();
if (m.material && m.material.dispose)
m.material.dispose();
}
}
catch (e) { } });
}
var SHC_GY = "kenney/graveyard-kit/", SHC_BULB = [0xFF8A2A, 0xB070FF, 0xFFC040, 0xFF6A10, 0x9A50E8];
var SHC_GRASS = [[350, 640], [660, 960], [1200, 1500], [1740, 2100]];
function shcStreets() { var out = []; if (typeof ATL_STREETS === "undefined")
return out; Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (r) { out.push(r); }); }); return out; }
function shcNearStreet(r, pad) { var S = shcStreets(); for (var i = 0; i < S.length; i++)
if (Math.abs(S[i] - r) < ATL_ROAD + (pad || 0))
return true; return false; }
function shcBlocked(x, z) { return typeof blockedAt === "function" && blockedAt(x, z, 0); }
function shcDecoDrop() {
var D = SHC.deco;
if (!D)
return;
shcDrop(D.g);
(D.glows || []).forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); });
SHC.deco = null;
}
function shcDecoBuild(P) { return __ZC(364, 8, this, arguments, new.target); }
function shcMistTick(dt, show) {
var night = typeof cityHourNow === "function" && typeof isNightHour === "function" && isNightHour(cityHourNow());
var want = show && night && !shcLite();
if (!want) {
if (SHC.mist) {
shcDrop(SHC.mist.g);
SHC.mist.mat.dispose();
SHC.mist = null;
}
return;
}
var P = camera.position;
if (!SHC.mist) {
var g = new THREE.Group();
g.name = "samhain mist";
scene.add(g);
var m = new THREE.MeshBasicMaterial({ map: shcMistTex(), transparent: true, depthWrite: false, opacity: 0.5, fog: true }), L = [];
for (var i = 0; i < 14; i++) {
var p = new THREE.Mesh(shcGeo("plane"), m);
p.rotation.x = -Math.PI / 2;
var s = 16 + (i % 4) * 6;
p.scale.set(s, s, 1);
p.raycast = function () { };
g.add(p);
L.push({ m: p, a: i / 14 * Math.PI * 2, r: 10 + (i % 5) * 9, v: 0.02 + (i % 3) * 0.01 });
}
SHC.mist = { g: g, L: L, mat: m };
}
SHC.mist.L.forEach(function (q) { q.a += q.v * dt; var x = P.x + Math.cos(q.a) * q.r, z = P.z + Math.sin(q.a) * q.r; q.m.position.set(x, shcY(x, z) + 0.35, z); });
}
function shcMarksDrop() { var M = SHC.marks; if (!M)
return; shcDrop(M.g); (M.glows || []).forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); }); SHC.marks = null; }
function shcMine(m) { m.userData.shcMine = true; m.raycast = function () { }; return m; }
function shcMarksBuild() { return __ZC(364, 9, this, arguments, new.target); }
function shcBatsTick() { return __ZC(364, 10, this, arguments, new.target); }
var SHC_DRESS = { geo: null, mat: null }, SHC_ALLCOS = [];
function shcDressKit() { return __ZC(364, 11, this, arguments, new.target); }
function shcCostume(kind) { return __ZC(364, 12, this, arguments, new.target); }
function shcHeadTop(g) { return __ZC(364, 13, this, arguments, new.target); }
function shcFolkTick(show) {
var F = SHC.folk, P = camera.position, want = {};
if (show) {
var n = 0, cap = shcLite() ? 14 : 40;
for (var i = 0; i < store.characters.length && n < cap; i++) {
var c = store.characters[i];
if (c.primary !== false || c.deity || !c.objId)
continue;
var g = meshes[c.objId];
if (!g || !g.parent)
continue;
var dx = g.position.x - P.x, dz = g.position.z - P.z;
if (dx * dx + dz * dz > 90 * 90)
continue;
var h = shcHash(String(c.objId).length * 977 + i, (c.name || "").length), kind = h % 10;
if (kind >= 7)
continue;
n++;
want[c.objId] = 1;
if (F[c.objId] && F[c.objId].g === g)
continue;
var top = shcHeadTop(g);
if (top < 0)
continue;
if (F[c.objId] && F[c.objId].c.parent)
F[c.objId].c.parent.remove(F[c.objId].c);
var cos = shcCostume(kind < 3 ? 0 : kind < 5 ? 1 : kind < 6 ? 2 : 3);
cos.position.y = top - (kind >= 3 && kind < 5 || kind === 6 ? 0 : 0.06);
g.add(cos);
F[c.objId] = { g: g, c: cos };
SHC_ALLCOS.push(cos);
SHC.folkSweep = true;
}
var cars = 0, ccap = shcLite() ? 6 : 20;
for (var id in meshes) {
if (cars >= ccap)
break;
var m = meshes[id];
if (!m || !m.userData.drives || !m.parent)
continue;
var ex = m.position.x - P.x, ez = m.position.z - P.z;
if (ex * ex + ez * ez > 120 * 120)
continue;
cars++;
var key = "car:" + id;
want[key] = 1;
if (F[key] && F[key].g === m)
continue;
var top2 = shcHeadTop(m);
if (top2 < 0)
continue;
var pk = new THREE.Group();
pk.name = "samhain costume";
var body = new THREE.Mesh(shcGeo("pumpkin"), shcMat("pumpkin")), face = new THREE.Mesh(shcGeo("face"), shcMat("face1")), st = new THREE.Mesh(shcGeo("stem"), shcMat("stem"));
pk.add(body);
pk.add(face);
pk.add(st);
pk.scale.setScalar(0.7);
pk.position.y = top2 - 0.02;
pk.traverse(function (o) { o.raycast = function () { }; });
if (F[key] && F[key].c.parent)
F[key].c.parent.remove(F[key].c);
m.add(pk);
F[key] = { g: m, c: pk };
SHC_ALLCOS.push(pk);
SHC.folkSweep = true;
}
}
for (var k in F) {
if (!want[k] || F[k].g.parent === null) {
var e = F[k];
if (e.c.parent)
e.c.parent.remove(e.c);
delete F[k];
}
}
var keep = [];
SHC_ALLCOS.forEach(function (c) { var mine = false; for (var k2 in F)
if (F[k2].c === c)
mine = true; if (mine)
keep.push(c);
else if (c.parent)
c.parent.remove(c); });
SHC_ALLCOS = keep;
if (!show && SHC.folkSweep && typeof scene !== "undefined") {
SHC.folkSweep = false;
var stray = [];
scene.traverse(function (o) { if (o.name === "samhain costume")
stray.push(o); });
stray.forEach(function (o) { if (o.parent)
o.parent.remove(o); });
}
}
function shcPlazaObs() { return __ZC(364, 14, this, arguments, new.target); }
function shcJackSpot() { return __ZC(364, 15, this, arguments, new.target); }
function shcFairSpots() { return __ZC(364, 16, this, arguments, new.target); }
function shcFairDrop() { var F = SHC.fair; if (!F)
return; shcDrop(F.g); (F.glows || []).forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); }); if (F.screenTex)
F.screenTex.dispose(); SHC.fair = null; }
function shcFairBuild() { return __ZC(364, 17, this, arguments, new.target); }
function shcScreenDraw(t) { return __ZC(364, 18, this, arguments, new.target); }
function shcFairTick(dt) { return __ZC(364, 19, this, arguments, new.target); }
function shcToday() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function shcPay(kind, say) {
var d = shnData();
d.shcDay = d.shcDay || {};
if (d.shcDay[kind] === shcToday()) {
setStatus(say + " <span style='opacity:.75'>(Today's keepsake for this is already in your 🎒 Backpack; come back tomorrow for another.)</span>");
return;
}
d.shcDay[kind] = shcToday();
shnSave();
shnReward(kind, say);
}
function shcCardOpen() { return typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block"; }
function shcGame() { var G = {}; SHC.game = G; return G; }
function shcMine2(G) { return SHC.game === G && shcCardOpen(); }
function shcToss() { return __ZC(364, 20, this, arguments, new.target); }
function shcCauldron() { return __ZC(364, 21, this, arguments, new.target); }
function shcFortune() { return __ZC(364, 22, this, arguments, new.target); }
function shcSpeak(text) {
try {
if (!window.speechSynthesis)
return false;
speechSynthesis.cancel();
var u = new SpeechSynthesisUtterance(text);
u.rate = 0.92;
u.pitch = 0.9;
speechSynthesis.speak(u);
return true;
}
catch (e) {
return false;
}
}
function shcStory() { return __ZC(364, 23, this, arguments, new.target); }
function shcTale(i, pg) { return __ZC(364, 24, this, arguments, new.target); }
var SHC_SHOW = [
{ t: 0, say: "Paris, 1798. In a ruined chapel of an old convent, the showman Robertson puts out the last candle..." },
{ t: 9, say: "\"Citizens! What you are about to see is no trick of the eye. Prepare yourselves.\"", draw: "smoke" },
{ t: 18, say: "Out of the smoke drifts a pale figure in a winding sheet...", draw: "ghost" },
{ t: 30, say: "A skull, grinning, rushes towards you, and then is gone.", draw: "skull" },
{ t: 42, say: "A raven settles on a bust above the door, and will not leave.", draw: "raven" },
{ t: 54, say: "A horseman with no head gallops across the dark...", draw: "rider" },
{ t: 66, say: "And at the end, Robertson lifts the lamp. \"Look, citizens: this is what you will all become.\" A skeleton bows.", draw: "skeleton" },
{ t: 80, say: "The lights come up. Applause. You stagger out into the night, laughing.", end: true }
];
function shcShow() { return __ZC(364, 25, this, arguments, new.target); }
function shcWay(dx, dz) { return typeof compassWord === "function" && typeof bearingOfHeading === "function" ? compassWord(bearingOfHeading(Math.atan2(-dx, -dz))) : ""; }
function shcRingName(r) { if (typeof ATL_RINGS === "undefined")
return "the city"; for (var i = 0; i < ATL_RINGS.length; i++)
if (r >= ATL_RINGS[i].S - 10 && r < ATL_RINGS[i].E + 10)
return ATL_RINGS[i].name; return "the city"; }
function shcHuntSpots() { return __ZC(364, 26, this, arguments, new.target); }
function shcHuntGot() { var d = shnData(); if (!d.shcHunt || d.shcHunt.day !== shcToday())
d.shcHunt = { day: shcToday(), got: [] }; return d.shcHunt; }
function shcHuntLose(g) { if (g.parent)
g.parent.remove(g); try {
g.userData.glow.material.dispose();
}
catch (e) { } }
function shcHuntDrop() { var H = SHC.hunt; if (!H)
return; for (var k in H.m)
shcHuntLose(H.m[k]); H.m = {}; }
function shcHuntTick(dt, show) {
if (!show || shcOff("hunt") || typeof ATLC === "undefined" || !ATLC) {
shcHuntDrop();
return null;
}
var H = shcHuntSpots(), mine = shcHuntGot(), P = camera.position, best = null;
var t = performance.now() / 1000;
H.L.forEach(function (s) {
var found = mine.got.indexOf(s.i) >= 0, d = Math.hypot(P.x - s.x, P.z - s.z), g = H.m[s.i];
if (found || d > 90) {
if (g) {
shcHuntLose(g);
delete H.m[s.i];
}
return;
}
if (!g) {
g = new THREE.Group();
g.name = "lost lantern";
var body = new THREE.Mesh(shcGeo("lantern"), shcMat("lantern")), fl = new THREE.Mesh(shcGeo("flame"), shcMat("flame"));
fl.position.y = 0.22;
g.add(body);
g.add(fl);
var gl = wGlow(0xFFA040, 2.4, 0.55);
gl.position.y = 0.22;
g.add(gl);
g.userData.glow = gl;
g.traverse(function (o) { o.raycast = function () { }; });
scene.add(g);
H.m[s.i] = g;
}
g.position.set(s.x, shcY(s.x, s.z) + 1.1 + Math.sin(t * 1.2 + s.i) * 0.15, s.z);
g.rotation.y = t * 0.4 + s.i;
if (d < 2.8)
best = s;
});
return best;
}
function shcHuntTake(s) { return __ZC(364, 27, this, arguments, new.target); }
function shcHuntCard() { return __ZC(364, 28, this, arguments, new.target); }
function shcStalls() { return SHC.fair ? SHC.fair.stalls : []; }
function shcPrompt(html, fn, key) {
if (!html) {
if (SHC.near) {
SHC.near = null;
worldPromptCity(null);
}
return;
}
if (SHC.near !== key) {
SHC.near = key;
worldPromptCity(html, function () { worldPromptCity(null); SHC.near = null; fn(); });
}
}
function shcStallGo(k) {
if (k === "hunt")
return shcHuntCard();
if (k === "toss")
return shcToss();
if (k === "cauldron")
return shcCauldron();
if (k === "fortune")
return shcFortune();
if (k === "story")
return shcStory();
if (k === "show")
return shcShow();
}
function shcTick(dt) {
var city = shcCity(), show = city && shcOn("city"), fair = city && shcOn("fair"), folk = city && shcOn("folk"), P = camera.position;
SHC.on = show;
SHC.lite = shcLite();
if (!show) {
if (SHC.deco)
shcDecoDrop();
if (SHC.marks)
shcMarksDrop();
SHC.cell = null;
}
else {
if (!SHC.marks)
shcMarksBuild();
var cs = 80, cell = Math.round(P.x / cs) + ":" + Math.round(P.z / cs);
if (cell !== SHC.cell || !SHC.deco) {
SHC.cell = cell;
shcDecoBuild(P);
}
shcGhostTick(dt);
shcBatsTick();
}
shcMistTick(dt, show);
if (!city && !SHC.fair && !SHC.proc && !SHC.mist && !SHC.near) {
SHC.ft += dt;
if (SHC.ft > 1) {
SHC.ft = 0;
shcFolkTick(false);
}
shcHuntDrop();
return;
}
var nearPlaza = city && Math.hypot(P.x - ATLC.x, P.z - ATLC.z) < 600;
if (fair && nearPlaza) {
if (!SHC.fair)
shcFairBuild();
shcFairTick(dt);
}
else if (SHC.fair)
shcFairDrop();
shcProcTick(dt, fair);
var lost = shcHuntTick(dt, fair);
SHC.ft += dt;
if (SHC.ft > 1) {
SHC.ft = 0;
shcFolkTick(folk);
}
SHC.pt += dt;
if (SHC.pt < 0.15)
return;
SHC.pt = 0;
if (!city || shcCardOpen() || document.getElementById("shc-show")) {
shcPrompt(null);
return;
}
if (lost) {
shcPrompt("🏮 <b>A lost lantern!</b> · <b>press E</b> to take it", function () { shcHuntTake(lost); }, "lost" + lost.i);
return;
}
var best = null, bd = 1e9;
shcStalls().forEach(function (S) { var d = Math.min(Math.hypot(P.x - S.fx, P.z - S.fz), Math.hypot(P.x - S.x, P.z - S.z) + 0.5); if (d < 4.6 && d < bd) {
bd = d;
best = S;
} });
if (best) {
shcPrompt("🎃 <b>" + esc(best.st.n) + "</b> · <b>press E</b> to " + esc(best.st.verb), function () { shcStallGo(best.k); }, "stall" + best.k);
return;
}
shcPrompt(null);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
shcTick(dt);
}
catch (e) {
if (!SHC.warned) {
SHC.warned = true;
if (window.console)
console.warn("samhain city:", e);
}
} };
})();
function shcMenu() { return __ZC(364, 29, this, arguments, new.target); }
(function () {
if (typeof shnMenu !== "function")
return;
var sm = shnMenu;
shnMenu = function () {
var r = sm.apply(this, arguments);
try {
var c = WLD.card;
if (c && c.style.display === "block" && !(typeof WLD !== "undefined" && WLD.on)) {
var el = document.createElement("div");
el.innerHTML = worldBtn("shc", "🏙️ Samhain in Somnucor", "What's on in the city: the fair, the lantern hunt, the procession, and where");
var bt = el.firstChild;
bt.style.cursor = "pointer";
bt.onclick = function (ev) { ev.stopPropagation(); shcMenu(); };
c.appendChild(bt);
}
}
catch (e) { }
return r;
};
})();
setTimeout(function () {
try {
if (!/[?&]ksamhaincity=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!(typeof shnKeeper === "function" && shnKeeper()))
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
SHC.prev = true;
SHC.cell = null;
try {
if (!inSomnucorNow() && typeof somnucorRealm === "function" && somnucorRealm() && typeof visitRealm === "function")
visitRealm(somnucorRealm().id);
}
catch (e) { }
setStatus("🎃 <b>Keeper preview:</b> Somnucor dressed for Samhain, as dreamers see it while it is on. The 🎃 Samhain menu > Samhain in Somnucor turns the preview off.");
try {
var q = new URLSearchParams(location.search);
q.delete("ksamhaincity");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
function shcStats() {
return { on: SHC.on, deco: SHC.deco && SHC.deco.counts, ghosts: SHC.deco && SHC.deco.ghosts.length, marks: !!SHC.marks, fair: SHC.fair && SHC.fair.counts, spots: (SHC.spots || []).length,
hunt: SHC.hunt && SHC.hunt.L.length, proc: !!SHC.proc, folk: Object.keys(SHC.folk).length, mist: !!SHC.mist };
}
var SHCT = { st: null, at: 0, ask: false, doors: {}, list: [], lt: 0, chip: null, mine: 0 };
var SHCT_DEF = { starts: Date.UTC(2026, 9, 31, 16, 0), ends: Date.UTC(2026, 10, 1, 3, 0) };
var SHCT_CANDY = ["a toffee apple", "a barley-sugar twist", "a bag of humbugs", "a gingerbread bat", "a sticky toffee", "a honeycomb crunch", "a sugar mouse", "a lollipop shaped like a pumpkin", "a chocolate coin", "a liquorice bootlace", "a candy-corn handful", "a marshmallow ghost"];
var SHCT_DOOR = ["A witch in a pointed hat opens the door, cackles kindly and", "A grandmother in cat ears opens the door and", "A small boy dressed as a skeleton opens the door, shouts \"BOO!\", and", "A man in a werewolf mask opens the door, howls, and", "A lady with a bowl balanced on her pumpkin costume", "A tall figure in a sheet says \"oooOOOooo\" and", "A family all dressed as bats flutter to the door and", "An old sailor opens the door, says \"Arr, a guiser!\", and"];
var SHCT_TRICK = ["A paper bat on a string drops in front of your nose. Got you!", "A bucket of autumn leaves tips over you from the porch roof. Got you!", "A rubber spider dangles from the knocker. Got you!", "The door creaks open by itself… and a cat walks out. Got you!"];
function shctTimes() { var S = SHCT.st; return S && S.ok ? { starts: Date.parse(S.starts), ends: Date.parse(S.ends), open: S.open !== false } : { starts: SHCT_DEF.starts, ends: SHCT_DEF.ends, open: true }; }
function shctOn() { var T = shctTimes(), n = Date.now(); return T.open && n >= T.starts && n < T.ends; }
function shctKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function shctFetch(force) { return __ZC(364, 30, this, arguments, new.target); }
function shctClock(ms) { if (typeof otmSpClock === "function")
return otmSpClock(ms); return new Date(ms).toLocaleString(); }
function shctNear(P) { return __ZC(364, 31, this, arguments, new.target); }
function shctTick(dt, city) {
var on = shctOn() || (shctKeeper() && SHCT.kTry);
if (SHCT.chip)
SHCT.chip.style.display = on && city ? "block" : "none";
if (!on || !city)
return null;
shctFetch(false);
shctChip();
var D = shctNear(camera.position);
if (!D)
return null;
return D;
}
function shctChip() { return __ZC(364, 32, this, arguments, new.target); }
function shctChipPlace() { return __ZC(364, 33, this, arguments, new.target); }
function shctKnock(D) { return __ZC(364, 34, this, arguments, new.target); }
function otmEscSafe(s) { return typeof esc === "function" ? esc(s) : String(s); }
function shctCard(said) { return __ZC(364, 35, this, arguments, new.target); }
function shctBoard() { return __ZC(364, 36, this, arguments, new.target); }
function shctSceptre() { return __ZC(364, 37, this, arguments, new.target); }
(function () {
if (typeof shcTick !== "function")
return;
var st = shcTick;
shcTick = function (dt) {
var r = st.apply(this, arguments);
try {
var city = shcCity(), D = shctTick(dt, city);
if (D && !shcCardOpen() && !SHC.near && !(typeof WCITY !== "undefined" && WCITY.fn)) {
shcPrompt("🍬 <b>Trick or treat!</b> · <b>press E</b> to knock" + (SHCT.doors[D.k] ? " (you've been here)" : ""), function () { shctKnock(D); }, "tt" + D.k);
}
else if (!D && SHC.near && String(SHC.near).indexOf("tt") === 0)
shcPrompt(null);
}
catch (e) {
if (!SHCT.warned) {
SHCT.warned = true;
if (window.console)
console.warn("samhain city trick:", e);
}
}
return r;
};
})();
(function () {
function hook() {
if (typeof bkpHtml !== "function" || SHCT.bkp)
return;
SHCT.bkp = true;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
if (!(typeof signedIn === "function" && signedIn()))
return h;
var S = SHCT.st, n = SHCT.mine || 0, doors = S && S.doors ? S.doors.length : 0, rank = "";
if (S && S.board)
S.board.forEach(function (r, i) { if (r.me)
rank = "#" + (i + 1); });
if (!S && !SHCT.bkpAsk) {
SHCT.bkpAsk = true;
shctFetch(true).then(function () { if (SHCT.st && typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint(); });
}
if (!n && !shctOn())
return h;
h += bkpHead("🍬 Trick-or-treat candy") + bkpRow("🍬 Candy in your bag", "<b>" + n + "</b>" + (doors ? " " + bkpDim("from " + doors + " door" + (doors === 1 ? "" : "s")) : "")) +
(rank ? bkpRow("🏆 Your place for the Halloween Sceptre", rank) : "") +
bkpRow(bkpDim(shctOn() ? "Knock at any door in Somnucor (stand on the step, press E) for more." : "Trick-or-treating is over for this year."), "<button class='btn' data-shct-board='1' style='min-height:32px;padding:4px 10px'>Who has the most</button>");
}
catch (e) { }
return h;
};
document.addEventListener("click", function (ev) {
var t = ev.target && ev.target.closest ? ev.target.closest("[data-shct-board]") : null;
if (!t)
return;
ev.stopPropagation();
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (x) { }
shctBoard();
}, true);
}
if (typeof document === "undefined")
return;
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
function shcProcOn() { var d = new Date(); return d.getMinutes() < 10; }
var SHC_PR = { kit: null, keep: null };
function shcStrawTex() { return __ZC(364, 38, this, arguments, new.target); }
function shcMaskTex(n) { return __ZC(364, 39, this, arguments, new.target); }
function shcTurnipFaceTex(n) { return __ZC(364, 40, this, arguments, new.target); }
function shcHaloTex() {
return shcTex("lhalo", 64, 64, function (x, W, H) { x.clearRect(0, 0, W, H); var g = x.createRadialGradient(W / 2, H / 2, 1, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,210,120,.9)"); g.addColorStop(0.35, "rgba(255,150,50,.35)"); g.addColorStop(1, "rgba(255,120,30,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
}
function shcSheetTex() {
return shcTex("sheet", 128, 128, function (x, W, H) { for (var i = 0; i < W; i++) {
var v = 226 + Math.round(Math.sin(i * 0.21) * 12 + Math.sin(i * 0.07 + 1) * 8);
x.fillStyle = "rgb(" + v + "," + v + "," + (v - 6) + ")";
x.fillRect(i, 0, 1, H);
} });
}
function shcProcKit() { return __ZC(364, 41, this, arguments, new.target); }
function shcProcMesh(g, mat, parent, x, y, z) { var m = new THREE.Mesh(g, mat); m.position.set(x || 0, y || 0, z || 0); m.raycast = function () { }; parent.add(m); return m; }
function shcTurnip(parent, x, y, z, n, big) { return __ZC(364, 42, this, arguments, new.target); }
function shcGuiseFig(i, o) { return __ZC(364, 43, this, arguments, new.target); }
function shcMaskOn(g, mat, hoodCol) { return __ZC(364, 44, this, arguments, new.target); }
var SHC_CLOAKS = [0x1A1418, 0x2A1A2A, 0x24201A, 0x1A2420, 0x3A1A14, 0x14161E];
function shcStrawboy(i) { return __ZC(364, 45, this, arguments, new.target); }
function shcMasker(i) { return __ZC(364, 46, this, arguments, new.target); }
function shcCaptain() { return __ZC(364, 47, this, arguments, new.target); }
function shcDrummer() { return __ZC(364, 48, this, arguments, new.target); }
function shcPiper() { return __ZC(364, 49, this, arguments, new.target); }
function shcMare() { return __ZC(364, 50, this, arguments, new.target); }
function shcProcMake() { return __ZC(364, 51, this, arguments, new.target); }
function shcProcDrop() { if (!SHC.proc)
return; if (SHC.proc.g.parent)
SHC.proc.g.parent.remove(SHC.proc.g); SHC.proc = null; }
function shcProcTick(dt, show) {
var on = show && !shcOff("fair") && shcProcOn() && typeof ATLC !== "undefined" && !!ATLC, P = camera.position;
if (!on) {
if (SHC.proc)
shcProcDrop();
return;
}
if (Math.hypot(P.x - ATLC.x, P.z - ATLC.z) > 420) {
if (SHC.proc)
shcProcDrop();
return;
}
if (!SHC.proc) {
SHC.proc = shcProcMake();
scene.add(SHC.proc.g);
}
var R = SHC.proc, d = SHC.procT ? new Date(SHC.procT) : new Date(), secs = d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() / 1000, V = 1.1, head = secs * V / SHC_PROC_R, near = false, t = performance.now() / 1000;
var far = shcLite() ? 90 : 150, stepPh = secs * V / 0.72 * Math.PI;
R.items.forEach(function (it) {
var o = it.o, k = it.i, sway = Math.sin(t * 0.31 + k * 1.7) * 0.18, a = head - it.s / SHC_PROC_R, rr = SHC_PROC_R + it.l + sway, x = ATLC.x + Math.cos(a) * rr, z = ATLC.z + Math.sin(a) * rr;
var dd = Math.hypot(x - P.x, z - P.z);
o.visible = dd < far;
if (it.pool)
it.pool.visible = o.visible;
if (dd < 6)
near = true;
if (!o.visible)
return;
var ph = stepPh + (k % 2 ? 0.25 : 0) + (k > 3 && k % 3 === 0 ? 0.4 : 0), sw = Math.sin(ph), y = shcY(x, z) + Math.abs(Math.cos(ph)) * 0.035;
o.position.set(x, y, z);
o.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a)) + Math.sin(t * 0.5 + k) * 0.05;
var lm = o.userData.limbs;
if (lm) {
if (lm.ll)
lm.ll.rotation.x = sw * 0.42;
if (lm.rl)
lm.rl.rotation.x = -sw * 0.42;
["la", "ra"].forEach(function (n, j) {
var A = lm[n];
if (!A)
return;
var u = A.userData;
if (u.beat)
A.rotation.x = -0.75 + Math.max(0, Math.sin(t * 6.2)) * 0.45;
else if (u.hold != null)
A.rotation.x = u.hold + Math.sin(ph) * 0.03;
else
A.rotation.x = (j ? sw : -sw) * 0.35 + (o.userData.role === "mask" && j === 1 ? -0.15 : 0);
});
}
if (o.userData.role === "mare") {
var hd = o.userData.head;
if (hd)
hd.rotation.x = Math.sin(t * 1.3) * 0.12;
var jw = o.userData.jaw;
if (jw)
jw.rotation.x = Math.max(0, Math.sin(t * 2.4)) * 0.3;
o.children[0].rotation.x = 0.05;
}
it.lamps.forEach(function (L, j) {
if (L.parent && L.parent.rotation)
L.rotation.x = -L.parent.rotation.x + Math.sin(ph + 0.6) * 0.12;
var hs = L.scale.x > 1.2 ? 1.6 : 0.9, f = 1 + 0.07 * Math.sin(t * 1.7 + k * 2.3 + j) + 0.04 * Math.sin(t * 0.9 + k);
var sp = L.children[L.children.length - 1];
if (sp && sp.isSprite)
sp.scale.set(hs * f / L.scale.x * 1.0, hs * f / L.scale.x * 1.0, 1);
});
if (it.pool) {
it.pool.position.set(x + Math.cos(a + Math.PI / 2) * 0.2, y + 0.03, z + Math.sin(a + Math.PI / 2) * 0.2);
}
o.traverse(function (m) { if (m.userData && m.userData.rib != null)
m.rotation.z = Math.sin(t * 2.2 + m.userData.rib) * 0.25; });
});
var hour = d.getHours() + ":" + d.toDateString(), W = SHC.walk || (SHC.walk = {});
if (W.hour !== hour) {
W.hour = hour;
W.s = 0;
W.paid = false;
if (shcCity())
setStatus("🎭 <b>The Guisers' Procession</b> is starting round the Tower Plaza: the Captain's turnip lantern, the drum, the White Mare, Strawboys and masked guisers, for ten minutes. Walk along with them!");
}
if (near) {
W.s += dt;
if (W.s >= 180 && !W.paid) {
W.paid = true;
shcPay("parade", "🎭 <b>You walked with the Guisers' Procession.</b> One of the guisers takes off a mask and hands it to you.");
}
}
}
var SHC_GH = { geo: null, mat: null, halo: null, haloMat: null, said: 0, ac: null };
function shcGhostGeo() { return __ZC(364, 52, this, arguments, new.target); }
function shcGhostMat() { return __ZC(364, 53, this, arguments, new.target); }
function shcGhostHalo() { return __ZC(364, 54, this, arguments, new.target); }
function shcGhostBuild(G, D) { return __ZC(364, 55, this, arguments, new.target); }
var SHC_GQ = new THREE.Quaternion(), SHC_GE = new THREE.Euler();
function shcGhostTick(dt) { return __ZC(364, 56, this, arguments, new.target); }
function shcGhostSigh() { return __ZC(364, 57, this, arguments, new.target); }
