/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var NVB_WEAR = {
wendy: { f: 1, kid: 1, x: { dress: 0xF6F2EA, skirt: 0xF6F2EA, sl: "long", len: "ankle", flare: 0.14, trim: 0xD8C8E0, stuff: "cloth" } },
john: { kid: 1, x: { shirt: 0xEAF0F8, breeches: false, trou: 0xEAF0F8, collar: "low", tie: "soft", tieCol: 0x9AB0D0, shoes: 0xD8C8B0 } },
michael: { kid: 1, x: { shirt: 0xF4EEE0, breeches: false, trou: 0xF4EEE0, collar: "low", tie: "soft", tieCol: 0xE8B0B0, shoes: 0xD8C8B0 } },
mrdarling: { x: { shirt: 0xFAF8F2, coat: "tails", coatCol: 0x16161C, vest: 0xF6F4EE, trou: 0x16161C, breeches: false, collar: "high", tie: "big", tieCol: 0xF8F8F8, shoes: 0x101010 } },
mrsdarling: { f: 1, x: { dress: 0xF2ECF4, skirt: 0xF2ECF4, sl: "puff", len: "ankle", flare: 0.22, stuff: "satin", trim: 0xC8B0D8, sash: 0xB89AC8 } },
liza: { f: 1, x: { dress: 0x1E1C22, skirt: 0x1E1C22, sl: "long", len: "ankle", apron: 0xF8F6F0, trim: 0xF2F0EA } },
wendyold: { f: 1, x: { dress: 0x5A6A8A, skirt: 0x4A5A7A, sl: "long", len: "ankle", trim: 0xE8E4DC, pelerine: 0x6A7A9A } },
jane: { f: 1, kid: 1, x: { dress: 0xF4F0F6, skirt: 0xF4F0F6, sl: "long", len: "ankle", trim: 0xE0C8D8 } },
peter: { kid: 1, x: { shirt: 0x3E7A2A, breeches: true, trou: 0x2E6420, stock: 0x5A8A3A, collar: "low", tie: "soft", tieCol: 0x2E5A1E, shoes: 0x6A4A2A, add: ["oz:petals:14"], trim: 0x4E8A2E } },
boy: { kid: 1, x: { shirt: 0xC8B898, coat: "jacket", coatStuff: "cloth", breeches: true, stock: 0x6A5A48, collar: "low", tie: "soft", shoes: 0x4A3420 } },
hook: { x: { shirt: 0xF8F4EC, coat: "long", coatCol: 0x6A1420, coatStuff: "velvet", coatTrim: "gold", vest: 0xC8A040, vestStuff: "velvet", trou: 0x2A1018, breeches: true, stock: 0x1A1418, collar: "high", tie: "big", tieCol: 0xF8F6F0, shoes: 0x141010 } },
smee: { x: { shirt: 0xF0EAD8, coat: "jacket", coatCol: 0x2A3A6A, breeches: false, trou: 0x3A3A4A, collar: "low", tie: "soft", tieCol: 0xC83A2A, shoes: 0x141414 } },
pirate: { x: { shirt: 0xEEE6D2, breeches: false, trou: 0x3A3428, collar: "low", tie: "soft", shoes: 0x141414, add: ["oz:sash"] } },
tiger: { f: 1, x: { dress: 0xB88A58, skirt: 0xA87A48, sl: "long", len: "calf", flare: 0.1, trim: 0xC83A2A, stock: 0xB88A58, shoes: 0x8A6040 } },
bluffm: { x: { shirt: 0xA87A4A, coat: "jacket", coatCol: 0x9A6A3A, breeches: false, trou: 0x8A6038, collar: "low", tie: "soft", tieCol: 0xC83A2A, shoes: 0x7A5434 } },
blufff: { f: 1, x: { dress: 0xB08250, skirt: 0x9A7044, sl: "long", len: "calf", flare: 0.1, trim: 0x2A6A8A, stock: 0xB08250, shoes: 0x7A5434 } }
};
var NVB_FUR = [0x6A4A2E, 0x8A6A44, 0x4A3420, 0xA8885A, 0x5A4A3A, 0x7A5A3A];
var NVB_PIR = [[0xEEE6D2, 0xB82A2A], [0x2A3A5A, 0x1A1A1A], [0xD8C8A8, 0x2A6A3A], [0x6A2A2A, 0xE8C040], [0xF2EEE4, 0x2A4A8A], [0x3A3A3A, 0xB86A2A]];
function nvbWearFor(L, o) { return __ZC(456, 0, this, arguments, new.target); }
function nvbM(col, o) { return typeof wdrMat === "function" ? wdrMat(col, o) : new THREE.MeshStandardMaterial({ color: col }); }
function nvbProps(add, c, E) { return __ZC(456, 1, this, arguments, new.target); }
(function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined")
return;
WDR_COST.oz_nvb = { rb: 1, look: { hat: "none", role: "" }, ozKey: "nvb", props: function (add, c, E) { try {
nvbProps(add, c, E);
}
catch (e) {
if (window.console)
console.warn("[nvb] props", e);
} } };
OZ_WEAR.oz_nvb = function (L, o) { return nvbWearFor(L, o); };
})();
function nvbPerson(seed, role, o) { return __ZC(456, 2, this, arguments, new.target); }
var NVB = { on: false, room: null, rooms: {}, cast: {}, beam: null, beamGlow: null, items: [], tune: null, tuneKey: null, follow: [], cool: 0, duel: null, clap: null, hold: 0, said: {}, built: false };
var NVB_ROOM = {
nursery: { x: 1600, z: -1600, y: -60, w: 10, d: 8, h: 3.4, name: "the night nursery, 14 (the Darlings' house)", night: 1 },
yard: { x: 1640, z: -1600, y: -60, w: 14, d: 10, h: 9, name: "the back yard of 14", night: 1, sky: 1 },
hold: { x: 1680, z: -1600, y: -60, w: 7, d: 14, h: 2.6, name: "the hold of the Jolly Roger" },
cabin: { x: 1720, z: -1600, y: -60, w: 8, d: 6, h: 2.8, name: "Hook's cabin" }
};
var NVB_N = { fire: [0, -3.4], window: [-2.2, -3.7], kennel: [3.8, 2.2], drawers: [4.4, -1.2], jug: [-4.4, 0.6], beds: [[-3.2, 1.8], [-1.2, 2.8], [1.0, 2.8]], chair: [0.9, -2.5], wardrobe: [-4.3, -2.2], door: [4.8, 3.6], piano: [-4.2, 3.3], bowl: [3.0, 3.0], lights: [[-3.2, 0.8], [-1.2, 1.8], [1.0, 1.8]] };
function nvbTex(key, w, h, fn, rep) { NVB.tex = NVB.tex || {}; if (NVB.tex[key])
return NVB.tex[key]; var t = wTex(w, h, fn, rep); NVB.tex[key] = t; return t; }
function nvbWallpaper() { return __ZC(456, 3, this, arguments, new.target); }
function nvbBoards() { return __ZC(456, 4, this, arguments, new.target); }
function nvbNight() { return __ZC(456, 5, this, arguments, new.target); }
function nvbRoom(k) { return __ZC(456, 6, this, arguments, new.target); }
function nvbShell(Q, wallMat, floorMat, ceilCol) { return __ZC(456, 7, this, arguments, new.target); }
function nvbBed(g, x, z, col, small) { return __ZC(456, 8, this, arguments, new.target); }
function nvbNightLight(Q, x, z) {
var g = Q.g, h = 0.55;
wCyl(0.05, 0.07, 0.06, wM(0xC8B890), x, h, z, g, 10);
var fl = wGlow(0xFFD890, 0.5, 0.9);
fl.position.set(x, h + 0.12, z);
g.add(fl);
var c = wCyl(0.04, 0.04, 0.09, wB(0xFFF0C8), x, h + 0.07, z, g, 8);
Q.lights.push({ glow: fl, core: c });
}
function nvbNursery(Q) { return __ZC(456, 9, this, arguments, new.target); }
function nvbYard(Q) { return __ZC(456, 10, this, arguments, new.target); }
function nvbShipRoomShell(Q, lamp) { return __ZC(456, 11, this, arguments, new.target); }
function nvbHold(Q) { return __ZC(456, 12, this, arguments, new.target); }
function nvbCabin(Q) { return __ZC(456, 13, this, arguments, new.target); }
function nvbShipAt(lx, lz) {
var s = NV.ship;
if (!s)
return { x: -790, z: -170, y: 4 };
var c = Math.cos(s.rotation.y), sn = Math.sin(s.rotation.y);
var x = s.position.x + lx * c + lz * sn, z = s.position.z - lx * sn + lz * c, d = nvDeckAt(x, z);
return { x: x, z: z, y: d === null ? s.position.y + 4 : d };
}
var NVB_AT = {
tree: { x: -120, z: 254.4 }, home: { x: -120, z: 250 }, mush: { x: -96, z: 236 }, fall: { x: -40, z: 330 }, house: { x: -60, z: 300 },
bluff: { x: 150, z: -470 }, lagoon: { x: 690, z: 60 }, rock: { x: 700, z: 40 }, nest: { x: 560, z: 170 }, shore: { x: 520, z: 190 },
creek: { x: -660, z: -150 }, camp: { x: -600, z: -160 }, ship: { x: -790, z: -170 }, peak: { x: 40, z: -80 }, land: { x: 640, z: 420 }, guard: { x: -108, z: 272 }
};
function nvbIsland(G) { return __ZC(456, 14, this, arguments, new.target); }
var NVB_FLIGHT = [[1650, 120, 1650], [1400, 110, 1400], [1150, 100, 1150], [920, 90, 920], [720, 70, 720], [560, 55, 560]];
function nvbHomeDress() { return __ZC(456, 15, this, arguments, new.target); }
var NVB_BOOK = "You live in J. M. Barrie's book Peter and Wendy (1911), with F. D. Bedford's pictures. Keep to the BOOK, never any film, cartoon or stage show. The Darlings live in London: Mr and Mrs Darling, Wendy, John and Michael, and Nana, the Newfoundland dog who is their nurse. Peter Pan, the boy who would not grow up, came in at the nursery window to hear Mrs Darling's stories, lost his shadow, came back for it, and taught the children to fly to the Neverland: second to the right, and straight on till morning. There live the Lost Boys, Captain Hook and his pirates, the crocodile who swallowed a clock, the mermaids, the Never bird, the fairies, and Tiger Lily's people (here called the People of the Bluff, told with respect). Speak as the book's people speak, with Barrie's wit and tenderness; keep it suitable for everyone. ";
var NVB_CAST = {
peter: { name: "Peter Pan", role: "peter", look: { hair: 0x8A4A1E, hairStyle: "short", skin: 0xF0C8A8 }, greet: "I'm Peter Pan. Who are you?",
persona: "You are Peter Pan: a lovely boy clad in skeleton leaves, with all his first teeth. You ran away the day you were born because you heard your parents talking of what you were to be when you became a man; you will never grow up. You are brave, boastful ('Oh, the cleverness of me!'), forgetful, gay and innocent and heartless; you crow like a cock when pleased; you love stories, adventures and fighting pirates; you know nothing of kisses (you think a thimble is one). Never claim to be anything but Peter." },
wendy: { name: "Wendy Moira Angela Darling", role: "wendy", look: { hair: 0x6A3A1A, hairStyle: "long" }, greet: "How do you do? I'm Wendy.",
persona: "You are Wendy Darling, the eldest of the Darling children: sensible, motherly, a little prim, kind and brave, fond of telling stories and sewing. You love your brothers, your mother and father, and Nana; you are fond of Peter and a little hurt that he thinks of you only as a mother. You say 'Oh dear' and 'How perfectly lovely'." },
john: { name: "John Napoleon Darling", role: "john", look: { hair: 0x3A2414, hairStyle: "short" }, greet: "I say! I'm John.",
persona: "You are John Darling, Wendy's younger brother, who always wears his top hat, even in his nightshirt; you are a little pompous and very proper ('I'm a gentleman'), keen on pirates, and sometimes forget home." },
michael: { name: "Michael Nicholas Darling", role: "michael", look: { hair: 0xC8984A, hairStyle: "short" }, s: 0.88, greet: "I'm Michael. I'm nearly five.",
persona: "You are Michael Darling, the youngest: small, eager, sleepy, wanting to be the baby and also to be brave. You love Nana. You say exactly what you think." },
mrdarling: { name: "Mr. George Darling", role: "mrdarling", look: { hair: 0x2A1A12, hairStyle: "short", beard: "mustache" }, greet: "Ah. Good evening. This tie will not tie.",
persona: "You are Mr. George Darling, a clerk in the City who knows all about stocks and shares; proud, a little vain, fond of your family but anxious about money and what the neighbours think. When the children are taken you live in Nana's kennel by way of penance until they come back." },
mrsdarling: { name: "Mrs. Mary Darling", role: "mrsdarling", look: { hair: 0x5A3420, hairStyle: "bun" }, greet: "There you are. Hush, the children are asleep.",
persona: "You are Mrs. Mary Darling: lovely, with a romantic mind like tiny boxes one within the other, and a sweet mocking mouth with one kiss in its right-hand corner that no one can get. You tidy your children's minds each night. You saw a strange boy at the window and Nana caught his shadow; you keep the window open for your children." },
liza: { name: "Liza", role: "liza", look: { hair: 0x3A2A1A, hairStyle: "bun" }, s: 0.92, greet: "I'm the maid, I am. Liza.",
persona: "You are Liza, the Darlings' little maid, who looks like she might be ten but is grown. You are cheeky, quick and not fond of being bossed by a dog." },
tootles: { name: "Tootles", role: "boy0", look: { hair: 0x5A3A1A, hairStyle: "short" }, greet: "I'm Tootles. Nothing ever happens to me.", persona: "You are Tootles, the humblest of the Lost Boys: you always miss the adventures, and you are gentle and sweet-natured. You shot the Wendy bird because Tinker Bell told you Peter wanted it, and you are very sorry." },
nibs: { name: "Nibs", role: "boy1", look: { hair: 0x2A1A12, hairStyle: "short" }, greet: "Nibs, at your service.", persona: "You are Nibs, gay and debonair, the bravest of the Lost Boys after Peter." },
slightly: { name: "Slightly", role: "boy2", look: { hair: 0xA8784A, hairStyle: "short" }, greet: "Slightly Soiled. That was on my pinafore.", persona: "You are Slightly, the most conceited of the Lost Boys: you think you remember the days before you were lost, and you cut whistles out of trees. You once pretended to be a doctor in John's hat." },
curly: { name: "Curly", role: "boy3", look: { hair: 0x6A3A1A, hairStyle: "curly" }, greet: "I'm Curly. I'm always in a pickle.", persona: "You are Curly, a Lost Boy who is always in scrapes and owns up when you have done wrong." },
twin1: { name: "The First Twin", role: "boy4", look: { hair: 0x8A5A2A, hairStyle: "short" }, greet: "We're the twins. We stick together.", persona: "You are one of the Twins among the Lost Boys; Peter never quite knows what twins are, so you keep close together and apologise." },
twin2: { name: "The Second Twin", role: "boy5", look: { hair: 0x8A5A2A, hairStyle: "short" }, greet: "We're the twins.", persona: "You are the other of the Twins among the Lost Boys." },
hook: { name: "Captain James Hook", role: "hook", look: { hair: 0x0A0A0E, hairStyle: "long", beard: "mustache", skin: 0xD8C0A8 }, greet: "Ah. A visitor. How... unexpected.",
persona: "You are Captain James Hook of the Jolly Roger, the only man of whom Barbecue was afraid: cadaverous and blackavised, your hair dressed in long curls like black candles, your eyes blue as the forget-me-not until you plunge your hook into someone, when two red spots appear in them. You are elegant, melancholy, courteous even when cruel, obsessed with good form, and secretly unhappy that you have none of it. You hate Peter Pan above all, who cut off your right hand and flung it to a crocodile, which liked it so much it follows you, ticking (it swallowed a clock). Never describe violence in detail." },
smee: { name: "Smee", role: "smee", look: { hair: 0x8A8A8A, hairStyle: "bald", beard: "full" }, greet: "Johnny Corkscrew, that's what I call my cutlass. Ahoy!",
persona: "You are Smee, the Irish bo'sun of the Jolly Roger: genial, a lovable pirate in spectacles who sews at a sewing machine, devoted to the Captain and wondering why the children find you so endearing." },
starkey: { name: "Gentleman Starkey", role: "pirate0", look: { hair: 0x5A3A1A, hairStyle: "short" }, greet: "Gentleman Starkey, once an usher in a public school.", persona: "You are Gentleman Starkey, a pirate who was once an usher in a public school and is still dainty in your ways of killing." },
cecco: { name: "Cecco", role: "pirate1", look: { hair: 0x1A1A1A, hairStyle: "short", beard: "full", skin: 0xC89A78 }, greet: "Cecco. Remember the name.", persona: "You are Cecco, a handsome Italian pirate who once cut his name on the back of a prison governor at Gao." },
jukes: { name: "Bill Jukes", role: "pirate2", look: { hair: 0x6A3A1A, hairStyle: "short" }, greet: "Bill Jukes. Every inch of me tattooed.", persona: "You are Bill Jukes, every inch of you tattooed, the same Bill Jukes who got six dozen on the Walrus from Flint." },
noodler: { name: "Noodler", role: "pirate3", look: { hair: 0x3A2A1A, hairStyle: "short", beard: "full" }, greet: "Noodler. My hands are fixed on backwards, they say.", persona: "You are Noodler, a pirate whose hands are fixed on backwards, or so they say." },
mullins: { name: "Alf Mason", role: "pirate4", look: { hair: 0x2A1A12, hairStyle: "short" }, greet: "Alf Mason, long known and feared on the Spanish Main.", persona: "You are Alf Mason, a pirate long known and feared on the Spanish Main." },
skylights: { name: "Skylights", role: "pirate5", look: { hair: 0x5A3A1E, hairStyle: "short", beard: "mustache" }, greet: "Skylights. Morgan's Skylights.", persona: "You are Skylights, who was once with Morgan, a cheerful rough pirate." },
tiger: { name: "Tiger Lily", role: "tiger", look: { hair: 0x141414, hairStyle: "braids", skin: 0x9A6A48 }, greet: "Peter is my friend. You are welcome here.",
persona: "You are Tiger Lily, daughter of the chief of the People of the Bluff, the first people of the Neverland: proud, brave, clever and warm, a fine tracker, a fast runner and a leader. Peter saved you from the pirates at Marooners' Rock, and your people keep watch over the home under the ground. Speak with dignity; never in broken English." },
bluff1: { name: "Great Little Panther", role: "bluffm", look: { hair: 0x141414, hairStyle: "long", skin: 0x8A5A3A }, greet: "We keep the watch.", persona: "You are one of the People of the Bluff, a brave of Tiger Lily's people, proud, kind and watchful. Speak with dignity." },
bluff2: { name: "One of the People of the Bluff", role: "blufff", look: { hair: 0x141414, hairStyle: "braids", skin: 0x9A6A48 }, greet: "Sit by our fire.", persona: "You are a woman of the People of the Bluff, Tiger Lily's people, a weaver and storyteller, warm and good-humoured." },
bluff3: { name: "One of the People of the Bluff", role: "bluffm", look: { hair: 0x141414, hairStyle: "long", skin: 0xA8785A }, greet: "The pirates are near. Be quiet.", persona: "You are a scout of the People of the Bluff, quiet and quick." },
wendyold: { name: "Wendy, grown up", role: "wendyold", look: { hair: 0x6A4A3A, hairStyle: "bun", age: "adult" }, greet: "Hush, Jane is asleep. Sit down, my dear.",
persona: "You are Wendy Darling grown up, married, with a daughter called Jane. You remember Peter and the Neverland tenderly; you are a little sad you can no longer fly, and you know it is because you are no longer gay and innocent and heartless." },
jane: { name: "Jane", role: "jane", look: { hair: 0x8A5A2A, hairStyle: "long" }, greet: "Mother says a boy might come. Do you think he will?", persona: "You are Jane, Wendy's daughter, a little girl who loves her mother's stories of Peter Pan and asks for them again and again." }
};
var NVB_BOYS = ["tootles", "nibs", "slightly", "curly", "twin1", "twin2"];
var NVB_CREW = ["starkey", "cecco", "jukes", "noodler", "mullins", "skylights"];
function nvbCastMake(G) { return __ZC(456, 16, this, arguments, new.target); }
function nvbPut(k, at, o) { return __ZC(456, 17, this, arguments, new.target); }
function nvbC(k) { var C = NVB.cast[k]; if (C && !C.g && C.make) {
try {
C.g = C.make();
}
catch (e) {
if (window.console)
console.warn("[nvb] cast", k, e);
}
} return C; }
function nvbHide(k) { var C = NVB.cast[k]; if (C && C.g && !C.fixed) {
C.g.visible = false;
C.on = 0;
} }
function nvbHideAll() { Object.keys(NVB.cast).forEach(nvbHide); NVB.follow = []; }
function nvbFollow(keys) { return __ZC(456, 18, this, arguments, new.target); }
function nvbFollowTick(dt, L) { return __ZC(456, 19, this, arguments, new.target); }
function nvbFloor(x, z) { if (NVB.room) {
return NVB_ROOM[NVB.room].y;
} if (NV.home)
return -40; var d = NV.ship ? nvDeckAt(x, z) : null; if (d !== null)
return d; return Math.max(nvHeight(x, z), 0); }
var NVB_CH = [];
function nvbS() { if (!store.nvbook)
store.nvbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0 }; var S = store.nvbook; S.f = S.f || {}; S.keeps = S.keeps || []; return S; }
function nvbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function nvbStep() { var S = nvbS(), C = NVB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function nvbActive() { var S = nvbS(); return !!(S.started && !S.done && WLD.on === "neverland"); }
function nvbSay(h) { setStatus(h); }
function nvbEsc(t) { return typeof esc === "function" ? esc(t) : String(t); }
function nvbPos(at) { return __ZC(456, 20, this, arguments, new.target); }
function nvbArea() { return NVB.room ? "room:" + NVB.room : NV.home ? "home" : "out"; }
function nvbDist(P, L, flat) { return flat ? Math.hypot(P.x - L.x, P.z - L.z) : Math.hypot(P.x - L.x, P.y - (L.y - 1.6), P.z - L.z); }
function nvbWay(P, L) { return __ZC(456, 21, this, arguments, new.target); }
function nvbBeam() { return __ZC(456, 22, this, arguments, new.target); }
function nvbItemMesh(kind) { return __ZC(456, 23, this, arguments, new.target); }
function nvbItemsClear() { NVB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); }); NVB.items = []; }
function nvbItemAdd(kind, at, name) { var P = nvbPos(at); if (!P)
return null; var g = nvbItemMesh(kind); g.position.set(P.x, P.y + (at.lift || 0), P.z); WORLDS.neverland.g.add(g); var I = { g: g, at: at, P: P, name: name || kind, kind: kind }; NVB.items.push(I); return I; }
var NVB_TUNES = { lullaby: "nursery-lullaby", morning: "morning-mood", sailor: "drunken-sailor", mountain: "mountain-king", green: "greensleeves" };
function nvbTune(k) { return __ZC(456, 24, this, arguments, new.target); }
function nvbGoRoom(k, at) { return __ZC(456, 25, this, arguments, new.target); }
function nvbOutRoom(where) { return __ZC(456, 26, this, arguments, new.target); }
function nvbDoor(D) {
if (D.to === "deck") {
var S = nvbShipAt(D.at[0], D.at[1]);
nvbOutRoom({ x: S.x, z: S.z, y: S.y });
nvbSay("<b>On deck.</b>");
return;
}
nvbGoRoom(D.to, D.at);
}
function nvbBookText(fn) { return __ZC(456, 27, this, arguments, new.target); }
function nvbChapterCard() { return __ZC(456, 28, this, arguments, new.target); }
function nvbWhole(i) { return __ZC(456, 29, this, arguments, new.target); }
function nvbKeeperBtns(fns) { return __ZC(456, 30, this, arguments, new.target); }
function nvbJump(i) { var S = nvbS(); S.ch = Math.max(0, Math.min(NVB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; nvbSave(); nvbChapterBegin(true); }
function nvbChapterBegin(place) { return __ZC(456, 31, this, arguments, new.target); }
function nvbPlaceAt(st) { return __ZC(456, 32, this, arguments, new.target); }
function nvbStepBegin() { return __ZC(456, 33, this, arguments, new.target); }
function nvbStepDone() { return __ZC(456, 34, this, arguments, new.target); }
function nvbFinish() { return __ZC(456, 35, this, arguments, new.target); }
function nvbOpen() { return __ZC(456, 36, this, arguments, new.target); }
function nvbBegin() {
var S = nvbS();
S.started = 1;
nvbSave();
if (WLD.on !== "neverland") {
NVB.pending = 1;
worldGo("neverland", { at: { x: 700, y: 60, z: 640 }, nvb: 1 });
return;
}
nvbChapterBegin(true);
}
function nvbN(lx, lz, y) { return { room: "nursery", lx: lx, lz: lz, y: y || 0 }; }
function nvbH(x, z, y) { return { home: [x, z], y: y || 0 }; }
function nvbKids(lie) {
if (lie) {
nvbPut("wendy", nvbN(-3.2, 2.45, 0.72), { lie: 1 });
nvbPut("john", nvbN(-1.2, 3.45, 0.72), { lie: 1 });
nvbPut("michael", nvbN(1.0, 3.25, 0.72), { lie: 1 });
}
else {
nvbPut("wendy", nvbN(-2.4, 0.6, 0), {});
nvbPut("john", nvbN(-0.6, 1.6, 0));
nvbPut("michael", nvbN(0.4, 1.5, 0));
}
}
function nvbBoysAt(x, z, r) { NVB_BOYS.forEach(function (k, i) { var a = i / 6 * Math.PI * 2 + 0.3; nvbPut(k, { x: x + Math.cos(a) * (r || 5), z: z + Math.sin(a) * (r || 5), ry: a + Math.PI / 2 }); }); }
function nvbBoysHome() { NVB_BOYS.forEach(function (k, i) { var a = i / 6 * Math.PI * 2 + 0.6; nvbPut(k, nvbH(Math.cos(a) * 4.2, Math.sin(a) * 4.2), {}); }); }
NVB_CH.push({ t: "Peter Breaks Through", tune: "lullaby", keep: ["nv1_leaf", "A skeleton leaf from the window", "🍂"], start: { room: "nursery", at: [2.4, 1.2, 0.4] }, intro: "The night nursery at 14, in London",
setup: function () { nvbPut("mrsdarling", nvbN(0.9, -2.45), { sit: 1 }); nvbPut("nana", nvbN(3.1, 1.4, 0)); nvbKids(true); },
steps: [
{ k: "read" },
{ k: "talk", who: "mrsdarling", at: { who: "mrsdarling" }, h: "Mrs Darling is sewing by the night-nursery fire. Speak with her.", say: "<b>Mrs Darling:</b> \"All children, except one, grow up.\" She is tidying up her children's minds, as every good mother does after they are asleep." },
{ k: "talk", who: "nana", at: { who: "nana" }, h: "Nana, the nurse, is by her kennel. (She is a Newfoundland dog, and a treasure.)", say: "Nana wags, once, properly. She has the bath ready and the medicine counted. She had a genius for knowing when a cough is a thing to have no patience with." },
{ k: "gather", item: "leaf", n: 3, at: nvbN(-1.6, -2.2), spread: 1.6, name: "A strange leaf", each: "A skeleton leaf: not from any tree in England.", h: "There are strange leaves on the floor by the window. Pick them up.", say: "\"Skeleton leaves,\" Mrs Darling murmurs, \"very strange leaves.\" They were very strange leaves, and she was sure they did not come from any tree in England." },
{ k: "talk", who: "mrsdarling", at: { who: "mrsdarling" }, verb: "show her the leaves", h: "Show the leaves to Mrs Darling.", say: "In her children's minds, among the maps of the Neverland, she had found a name she did not know: Peter. \"He is rather cocky,\" Wendy had said. Mrs Darling dozes off by the fire." },
{ k: "hold", at: nvbN(-2.2, -2.6), r: 1.8, sec: 9, h: "Wait by the window and watch. Something is out there in the night.", say: "The window blew open, and a boy dropped on the floor: clad in skeleton leaves, with all his first teeth. Mrs Darling screamed." },
{ k: "talk", who: "nana", at: { who: "nana" }, verb: "see what Nana has", h: "Nana sprang at the boy! See what she has got.", on: function () { nvbPut("nana", nvbN(-1.8, -2.2, 0), { ry: Math.PI }); }, say: "He leapt lightly through the window. Nana slammed it down, too late to catch him, but his shadow had not had time to get out: slam went the window and snapped it off." },
{ k: "find", item: "shadow", at: nvbN(-2.2, -3.0), name: "The boy's shadow", verb: "roll it up", h: "His shadow lies on the floor under the window. Pick it up.", say: "It was quite the ordinary kind. Mrs Darling rolled it up carefully." },
{ k: "use", at: nvbN(3.9, -1.2, 0.9), name: "The top drawer of the chest", verb: "put the shadow away", h: "Put the shadow in the top drawer of the chest, until a good time comes to tell Mr Darling.", say: "Into the drawer it went. It was a Friday. Of course it was a Friday." }
] });
NVB_CH.push({ t: "The Shadow", tune: "lullaby", keep: ["nv2_tie", "Mr Darling's white tie", "🎀"], start: { room: "nursery", at: [2.4, 0.4, 0.4] }, intro: "The evening of the party at 27",
setup: function () { nvbPut("mrdarling", nvbN(1.6, -0.4), { ry: 0.4 }); nvbPut("mrsdarling", nvbN(0.2, -1.4), {}); nvbKids(false); nvbPut("nana", nvbN(2.6, 2.1), { ry: -1 }); nvbPut("liza", nvbN(4.0, 3.0), { ry: -2 }); },
steps: [
{ k: "read" },
{ k: "talk", who: "mrdarling", at: { who: "mrdarling" }, verb: "help with the tie", h: "Mr Darling is dressing for the party and cannot tie his tie. Help him.", say: "\"This tie, it will not tie. Not round my neck! Round the bed-post, oh yes; twenty times have I made it up round the bed-post.\" You tie it at last, and he is all good humour, and dances Michael round the room." },
{ k: "talk", who: "mrsdarling", at: { who: "mrsdarling" }, h: "Ask Mrs Darling about the boy and the shadow.", say: "She tells him all about it. \"It is nobody I know,\" says Mr Darling, examining the shadow, \"but he does look a scoundrel.\"" },
{ k: "talk", who: "michael", at: { who: "michael" }, h: "It is medicine time, and Michael will not take his.", say: "\"Won't! Won't!\" \"Be a man, Michael.\" \"Father, you take yours first.\" Mr Darling's medicine is much nastier." },
{ k: "find", item: "glass", at: nvbN(-4.0, -1.9, 2.3), name: "Mr Darling's medicine, hidden on top of the wardrobe", verb: "fetch it down", h: "Mr Darling's own medicine is missing. (He hid it on top of the wardrobe, in case.) Fetch it.", say: "\"I thought I had lost it,\" he says, not very glad. Michael takes his like a man. Father does not." },
{ k: "use", at: nvbN(3.0, 3.0), name: "Nana's bowl", verb: "watch what happens", h: "Mr Darling has a 'splendid joke'. Watch at Nana's bowl.", say: "He poured his medicine into Nana's bowl. Nana lapped it, then gave him such a look; not an angry look; and crept into her kennel. Nobody laughed." },
{ k: "go", at: { room: "yard", lx: 2.2, lz: 2.4 }, r: 3, h: "\"I won't have that dog lording it in my nursery!\" He drags Nana down to the yard to chain her. Follow them (the door to the landing, and down).", on: function () { nvbPut("nana", { room: "yard", lx: 3.0, lz: 2.0 }, { ry: 0.4 }); nvbPut("mrdarling", { room: "yard", lx: 0.8, lz: 2.6 }, { ry: 1.2 }); }, say: "There he tied her up. It was not true that he was a strong man; he simply had too strong a need for admiration." },
{ k: "talk", who: "nana", at: { who: "nana" }, verb: "comfort her", h: "Comfort Nana.", say: "She is not barking out of temper. She is barking because she smells danger. Wendy knew. \"That is not her unhappy bark. That is her bark when she smells danger.\"" },
{ k: "go", at: nvbN(-1.0, 1.2), r: 2.6, h: "Go back up to the nursery.", on: function () { nvbPut("mrdarling", nvbN(1.8, 0.2), {}); nvbHide("nana"); nvbKids(true); }, say: "Mrs Darling tucks the children up in their beds." },
{ k: "gather", item: "spark", n: 3, at: nvbN(-1.2, 1.2, 0.65), spread: 2.2, name: "A night-light", verb: "light it", each: "The little flame comes up, steady.", h: "Light the three night-lights by the beds.", on: function () { var Q = NVB.rooms.nursery; if (Q)
Q.lights.forEach(function (l) { l.glow.visible = false; }); }, done: function () { var Q = NVB.rooms.nursery; if (Q)
Q.lights.forEach(function (l) { l.glow.visible = true; }); }, say: "\"Dear night-lights that protect my sleeping babes, burn clear and steadfast tonight.\"" },
{ k: "talk", who: "mrsdarling", at: { who: "mrsdarling" }, verb: "say good night", h: "The Darlings are going out to dinner at 27. Say good night.", done: function () { nvbHide("mrsdarling"); nvbHide("mrdarling"); }, say: "They went out under the stars. The stars were watching. A little star in the Milky Way screamed out: \"Now, Peter!\"" }
] });
NVB_CH.push({ t: "Come Away, Come Away!", tune: "lullaby", keep: ["nv3_thimble", "Wendy's thimble (a 'kiss')", "🪡"], start: { room: "nursery", at: [2.6, 0.8, 0.5] }, intro: "That same night, with the Darlings out",
setup: function () { nvbKids(true); },
steps: [
{ k: "read" },
{ k: "hold", at: nvbN(-1.2, 1.0), r: 2.6, sec: 9, h: "Keep still in the dark, and watch the night-lights.", on: function () { var Q = NVB.rooms.nursery; if (Q)
Q.lights.forEach(function (l, i) { setTimeout(function () { try {
l.glow.visible = false;
l.core.visible = false;
}
catch (e) { } }, 2500 + i * 2200); }); }, say: "Mrs Darling's night-light blinked and yawned and went out; the other two did too. And there was another light in the room now, a thousand times brighter, looking for Peter's shadow." },
{ k: "find", item: "spark", at: nvbN(-4.3, 0.7, 1.05), name: "The jug on the washstand", verb: "look in the jug", h: "The darting light has hidden. Look in the jug.", done: function () { nvbPut("tink", nvbN(-3.6, 0.6, 0.4)); }, say: "Tinker Bell! No longer than your hand, exquisitely gowned in a skeleton leaf, cut low and square. She was a common fairy, who mended the pots and kettles." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "A boy has come in at the window. Who is he?", on: function () { nvbPut("peter", nvbN(-2.2, -2.7), { ry: Math.PI }); }, say: "\"Tinker Bell,\" he called softly, \"Tink, where are you? Do you know where they put my shadow?\" It is Peter Pan." },
{ k: "use", at: nvbN(3.9, -1.2, 0.9), name: "The top drawer", verb: "open it for him", h: "Show Peter where his shadow is: the top drawer of the chest.", on: function () { nvbPut("peter", nvbN(3.3, -1.0), { ry: -Math.PI / 2 }); }, say: "He scattered the contents of the drawers with both hands, found his shadow, and in his delight shut Tinker Bell up in the drawer." },
{ k: "use", at: nvbN(1.8, -0.6), name: "A cake of soap", verb: "watch Peter try it", h: "Peter is trying to stick his shadow on with soap.", on: function () { nvbPut("peter", nvbN(1.8, -0.2), { sit: 1 }); }, say: "It would not stick. A shudder went through him, and he sat on the floor and cried." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, h: "His crying wakes Wendy.", on: function () { nvbPut("wendy", nvbN(-2.0, 0.4), { ry: -1.2 }); }, say: "\"Boy, why are you crying?\" \"What's your name?\" \"Wendy Moira Angela Darling. What is yours?\" \"Peter Pan.\" \"It must be sewn on,\" she said, just a little patronisingly." },
{ k: "gather", item: "stitch", n: 4, at: nvbN(1.8, -0.2, 0.4), spread: 1.0, name: "A stitch", verb: "sew", each: "Wendy sews; it hurts, but he bears it.", h: "Help Wendy sew the shadow on (her housewife is on the chair).", say: "The shadow was on, a little creased. Peter jumped about in the wildest glee. \"Oh, the cleverness of me!\"" },
{ k: "talk", who: "peter", at: { who: "peter" }, verb: "hold out your hand", h: "Peter wants to give Wendy a kiss. (He does not know what one is.)", on: function () { nvbPut("peter", nvbN(-1.4, 0.4), { ry: 2 }); }, say: "He dropped an acorn button into her hand: his kiss. She gave him her thimble: hers. He thought it was a kiss, and she put the button on a chain round her neck." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, h: "Hear what Peter tells Wendy about the Neverland.", say: "The Lost Boys, the children who fall out of their perambulators; the mermaids; and stories. \"Wendy, come with me and tell the other boys. You could tuck us in at night.\"" },
{ k: "talk", who: "john", at: { who: "john" }, verb: "wake him", h: "Wake John and Michael.", on: function () { nvbPut("john", nvbN(-0.6, 2.0), {}); nvbPut("michael", nvbN(0.6, 1.9), {}); }, say: "\"Can you really fly?\" Peter flew round the room, taking the mantelpiece on the way. \"How topping!\"" },
{ k: "fly", at: nvbN(0, 0.4, 2.0), r: 1.5, h: "Peter blows fairy dust on you. Think lovely wonderful thoughts, and fly up near the ceiling (Space to rise).", say: "\"I flewed!\" screamed Michael. Up and down they went, and round and round. \"Heavenly\" was Wendy's word." },
{ k: "use", at: nvbN(-2.2, -3.3, 1.2), r: 2.2, name: "The open window", verb: "fly out", h: "\"Come away!\" Out of the window, into the night: second to the right, and straight on till morning.", on: function () { nvbFollow(["peter", "wendy", "john", "michael", "tink"]); }, say: "Nana had broken her chain and fetched the parents, but too late. The birds were flown." }
] });
NVB_CH.push({ t: "The Flight", tune: "morning", keep: ["nv4_star", "A speck of starlight from the second star", "⭐"], start: { ring: 0 }, jump: 1, intro: "Second to the right, and straight on till morning",
setup: function () { NVB.night = 0; nvbFollow(["peter", "wendy", "john", "michael", "tink"]); },
steps: [
{ k: "read" },
{ k: "fly", at: { ring: 1 }, r: 18, h: "Fly through the ring of cloud ahead (Space to rise, C to sink).", done: function () { NVB.night = 0.15; }, say: "How long they had been in the air they could not tell. Sometimes it was dark and sometimes light, and now they were very cold and again too warm." },
{ k: "fly", at: { ring: 2 }, r: 18, h: "On to the next ring of cloud.", done: function () { NVB.night = 0.3; }, say: "Michael fell asleep, and dropped!" },
{ k: "go", at: function () { var p = NVB_FLIGHT[2]; return { x: p[0] + 30, z: p[2] + 30, y: 12 }; }, r: 10, h: "Michael has fallen asleep and dropped toward the sea. Dive and catch him!", on: function () { NVB.follow = NVB.follow.filter(function (F) { return F.k !== "michael"; }); var p = NVB_FLIGHT[2]; nvbPut("michael", { x: p[0] + 30, z: p[2] + 30, y: 12 }, { fly: 1 }); }, done: function () { nvbFollow(["peter", "wendy", "john", "michael", "tink"]); }, say: "Peter would wait till the last moment before he caught him; you were quicker. Michael never woke." },
{ k: "fly", at: { ring: 3 }, r: 18, h: "Back up, and on through the clouds.", done: function () { NVB.night = 0.5; }, say: "They played follow-my-leader. Peter would fly off and come back laughing over something fearfully funny he had been saying to a star, which he had already forgotten." },
{ k: "talk", who: "peter", at: { who: "peter" }, verb: "ask the way", h: "Ask Peter how much further.", say: "\"Who are you?\" he said, and then, \"Wendy! I always forget.\" (You could not be sure he would remember you.) \"Second to the right, and straight on till morning.\"" },
{ k: "fly", at: { ring: 4 }, r: 18, h: "Straight on. Morning is coming.", done: function () { NVB.night = 0.75; }, say: "\"There it is,\" said Peter calmly. A million golden arrows were pointing out the island, all directed by their friend the sun." },
{ k: "fly", at: { ring: 5 }, r: 18, h: "The island! Through the last ring of cloud.", done: function () { NVB.night = 0.95; }, say: "They knew it at once: it was the Neverland they had dreamed of. \"John, there's the lagoon.\" \"Wendy, look at the turtles burying their eggs.\"" },
{ k: "go", at: { x: 430, z: 330 }, r: 34, h: "Come down on the island.", done: function () { NVB.night = null; }, say: "The island came true. Then, all at once, it was afraid." }
] });
NVB_CH.push({ t: "The Island Come True", tune: "green", keep: ["nv5_acorn", "The acorn button that stopped the arrow", "🌰"], intro: "Feeling that Peter was on his way back, the Neverland had again woke into life",
setup: function () { nvbBoysAt(-112, 268, 6); nvbPut("tink", { x: -60, z: 300 }); },
steps: [
{ k: "read" },
{ k: "go", at: { x: -112, z: 268 }, r: 9, h: "Make your way to the Never Wood and the Hangman's Tree, where the Lost Boys live.", say: "The Lost Boys were out looking for Peter, the pirates were out looking for the boys, the People of the Bluff were out looking for the pirates, and the beasts were out looking for the People of the Bluff. They were going round and round the island." },
{ k: "talk", who: "slightly", at: { who: "slightly" }, h: "Meet the Lost Boys. Slightly is the most conceited.", say: "\"I'm Slightly. I remember the days before I was lost; I remember the manners and customs.\" (He did not.)" },
{ k: "talk", who: "nibs", at: { who: "nibs" }, h: "Talk with Nibs.", say: "\"The only thing I remember about my mother is that she often said to my father, 'Oh, how I wish I had a cheque-book of my own!'\" None of them knew what a mother was, quite. They wished they had one." },
{ k: "hold", at: { x: -100, z: 242 }, r: 7, sec: 9, h: "Hide! Pirates are coming. Keep still among the toadstools.", on: function () { nvbPut("hook", { x: NVB_AT.mush.x, z: NVB_AT.mush.z, y: nvHeight(NVB_AT.mush.x, NVB_AT.mush.z) + 1.4 }, { sit: 1 }); nvbPut("smee", { x: -92, z: 233 }); nvbPut("starkey", { x: -99, z: 231 }); NVB_BOYS.forEach(nvbHide); nvbTune("sailor"); }, say: "\"Avast, bully boys!\" Hook sat down on a large mushroom... and jumped up again. It was hot. It was a chimney, and smoke came out. They had found the home under the ground." },
{ k: "talk", who: "hook", at: { who: "hook" }, verb: "listen (he does not see you)", h: "Creep near and listen to Hook.", say: "\"We will leave a cake on the shore of the Mermaids' Lagoon, a large rich cake of a jolly thickness with green sugar on it. The boys have no mother to tell them how dangerous it is to eat rich damp cake.\"" },
{ k: "hold", at: { x: -100, z: 242 }, r: 9, sec: 7, h: "Tick, tick, tick. Something is coming through the reeds. Keep still.", on: function () { if (NVB.tickT)
clearInterval(NVB.tickT); var n = 0; NVB.tickT = setInterval(function () { if (n++ > 14 || typeof playTone !== "function") {
clearInterval(NVB.tickT);
return;
} playTone(n % 2 ? 1500 : 1250, 0.03); }, 480); }, done: function () { nvbHide("hook"); nvbHide("smee"); nvbHide("starkey"); nvbTune("green"); }, say: "The crocodile! Hook ran for his life, Smee panting after. The crocodile had liked his hand so much that it followed him from sea to sea, licking its lips." },
{ k: "talk", who: "tootles", at: { who: "tootles" }, h: "Tootles has his bow. Tinker Bell is tinkling at him.", on: function () { nvbPut("tootles", { x: -48, z: 322 }, { ry: 2.4 }); nvbPut("tink", { x: -46, z: 320 }); }, say: "\"Peter wants you to shoot the Wendy.\" It was not in Tootles to question Peter's orders. \"Out of the way, Tink!\" He fired. Wendy fluttered to the ground with an arrow in her breast." },
{ k: "go", at: NVB_AT.fall, r: 4, h: "Something white is falling. Run to where it came down.", on: function () { nvbPut("wendy", { x: NVB_AT.fall.x, z: NVB_AT.fall.z, y: nvHeight(NVB_AT.fall.x, NVB_AT.fall.z) + 0.25 }, { lie: 1 }); nvbBoysAt(NVB_AT.fall.x, NVB_AT.fall.z, 4.5); }, say: "\"This is no bird,\" said Tootles in a scared voice. \"I think this must be a lady.\"" },
{ k: "find", item: "acorn", at: { x: NVB_AT.fall.x + 0.6, z: NVB_AT.fall.z + 0.4 }, name: "The arrow, caught on something", verb: "look closer", h: "Look closely at the arrow.", say: "The arrow had struck the acorn button, Peter's 'kiss', on its chain round her neck. \"It is the kiss I gave her. It has saved her life.\" \"She lives!\"" }
] });
NVB_CH.push({ t: "The Little House", tune: "green", keep: ["nv6_chimney", "A wisp of smoke from the top-hat chimney", "🎩"], intro: "Let us build a little house round her",
setup: function () { var F = NVB_AT.fall; nvbPut("wendy", { x: F.x, z: F.z, y: nvHeight(F.x, F.z) + 0.25 }, { lie: 1 }); nvbBoysAt(F.x, F.z, 5); nvbPut("peter", { x: F.x + 2, z: F.z - 3, ry: Math.PI }); nvbPut("john", { x: F.x - 3, z: F.z + 2 }); nvbPut("michael", { x: F.x - 4, z: F.z + 3 }); },
steps: [
{ k: "read" },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Peter has come home. Hear what he says.", say: "\"I know,\" said Peter, \"let us build a little house round her.\" They were all delighted. \"Quick, bring me each of you the best of what we have. Gut our house. Be sharp.\"" },
{ k: "gather", item: "branch", n: 6, at: NVB_AT.fall, spread: 16, name: "A good straight branch", verb: "carry it", each: "Another for the walls.", h: "Gather branches for the walls of the little house.", say: "In a moment they were as busy as tailors the night before a wedding. Clink, clink: the walls rose." },
{ k: "gather", item: "moss", n: 4, at: NVB_AT.fall, spread: 12, name: "A soft cushion of moss", verb: "gather it", each: "Moss for the roof.", h: "Now moss and leaves for the roof.", say: "\"Let us make her a roof,\" and a fine green mossy roof it was." },
{ k: "talk", who: "slightly", at: { who: "slightly" }, h: "Slightly says he will be the doctor. (He has borrowed John's hat.)", on: function () { nvbPut("slightly", { x: NVB_AT.fall.x + 1.4, z: NVB_AT.fall.z + 0.6 }, { ry: -1.5 }); }, say: "\"Are you a doctor?\" \"Yes, my little man.\" He pretended to put a glass thing in her mouth. \"She will do now. Give her beef tea out of a cup with a spout.\"" },
{ k: "find", item: "hat", at: { x: NVB_AT.fall.x - 2.5, z: NVB_AT.fall.z + 1.5 }, name: "John's top hat", verb: "take it for the chimney", h: "Every house needs a chimney. Find John's hat.", say: "John's hat made a chimney, and at once smoke began to come out. Wendy, they say, was pleased." },
{ k: "gather", item: "rose", n: 3, at: NVB_AT.house, spread: 10, name: "A rose", verb: "pick it", each: "Roses peeping in.", h: "Wendy wants roses peeping in at the window. Pick three.", say: "\"Oh, I wish I had a pretty house, the littlest ever seen, with funny little red walls, and roof of mossy green.\" Roses peeping in, and babies too (but they hadn't time for babies)." },
{ k: "use", at: { x: NVB_AT.house.x + 1.6, z: NVB_AT.house.z + 2.2 }, r: 3, name: "The little house", verb: "finish it round her", h: "Finish the little house round her: walls, roof, chimney, door.", done: function (f) { f.built = 1; nvbHide("wendy"); }, say: "There it stood: red walls, a mossy green roof, John's hat smoking, and a door with a knocker made from the sole of Tootles's shoe." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, verb: "knock", h: "Knock at the door. Wendy will open it.", on: function () { nvbPut("wendy", { x: NVB_AT.house.x + 1.4, z: NVB_AT.house.z + 2.8, ry: 0.3 }); }, say: "\"Where am I?\" \"Wendy lady, for you we built this house.\" \"Oh, Wendy lady, be our mother.\" \"Of course it's frightfully fascinating, but you see I am only a little girl.\" \"That doesn't matter.\"" }
] });
NVB_CH.push({ t: "The Home Under the Ground", tune: "green", keep: ["nv7_sock", "A darned stocking", "🧦"], intro: "Down the hollow trees",
setup: function () { nvbBoysHome(); nvbPut("wendy", nvbH(2.4, -9.3), { sit: 1 }); nvbPut("michael", nvbH(-9, 6.4), { sit: 1 }); nvbPut("john", nvbH(-3, 3)); nvbPut("peter", { x: -114, z: 262, ry: 1 }); },
steps: [
{ k: "read" },
{ k: "go", at: nvbH(0, 8), r: 6, h: "Each of you is measured for your own hollow tree. Go down Peter's (E at the foot of the Hangman's Tree).", say: "You go down as you would go down a chimney: draw in your breath, and down you go, at exactly the right speed." },
{ k: "use", at: nvbH(0, 0.4, 1.0), r: 2.8, name: "The Never tree", verb: "saw it off", h: "A Never tree grows in the middle of the floor. Saw it off for a table.", say: "Every morning they sawed it level with the floor. By tea-time it was always two feet high, and they put a door on top of it, the whole thus becoming a table." },
{ k: "gather", item: "sock", n: 5, at: nvbH(-2, -2), spread: 7, name: "A stocking with a hole in the heel", verb: "pick it up", each: "Into Wendy's basket.", h: "Wendy's mending: every one of their stockings has a hole in the heel. Gather them for her.", say: "\"Oh dear, I am sure I sometimes think spinsters are to be envied!\" Her face beamed when she said this." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, h: "Wendy is in her chair by the fire.", say: "\"I wish, Peter, you would not go fighting the pirates by yourself... There are no more stockings to darn, and I'm cross because you are none of you ever in bed in time.\" (She was never happier.)" },
{ k: "use", at: nvbH(10.3, -3.9, 1.4), r: 2.6, name: "Tink's private apartment", verb: "peep behind the curtain", h: "There is a tiny curtained recess in the wall: Tink's private apartment.", say: "No larger than a bird-cage, and the most exquisite: a couch, a Queen Mab, with club legs; a mirror, Puss-in-boots; a washstand, Pie-crust. She was rather contemptuous of the rest of the house." },
{ k: "talk", who: "michael", at: { who: "michael" }, h: "Michael is the baby. He sleeps in a basket hung from the ceiling.", say: "\"I'm the baby!\" He did not care to be the baby, but somebody had to be, and he was the littlest." },
{ k: "talk", who: "curly", at: { who: "curly" }, h: "Ask Curly where everyone sleeps.", say: "\"In the big bed, all of us, like sardines in a tin. There's a rule that nobody turns over till one gives the signal, and then we all turn at once.\"" },
{ k: "go", at: { x: -112, z: 262 }, r: 6, h: "Climb back up the hollow tree and out into the wood (E at the tree's roots).", say: "Out into the sun. The Neverland waits." }
] });
NVB_CH.push({ t: "The Mermaids' Lagoon", tune: "green", keep: ["nv8_scale", "A mermaid's scale, pearl-pink", "🧜"], intro: "If you shut your eyes and are a lucky one...",
setup: function () { nvbPut("wendy", { x: 648, z: 106 }); nvbPut("john", { x: 644, z: 112 }); nvbPut("michael", { x: 640, z: 110 }); ["tootles", "nibs", "curly"].forEach(function (k, i) { nvbPut(k, { x: 652 + i * 3, z: 116 }); }); },
steps: [
{ k: "read" },
{ k: "go", at: { x: 650, z: 110 }, r: 20, h: "Go to the Mermaids' Lagoon (fly, if you like, over the trees).", say: "If you shut your eyes and are a lucky one, you may see at times a shapeless pool of lovely pale colours suspended in the darkness. That is the lagoon." },
{ k: "hold", at: NVB_AT.rock, r: 28, sec: 9, h: "Bask by Marooners' Rock with the mermaids. (They will not speak to you; they are like that.)", say: "The mermaids combed their hair and flicked water at you with their tails, not by accident. Then a shiver ran over the lagoon. The sun went away. A chill came over the water." },
{ k: "hold", at: NVB_AT.rock, r: 28, sec: 7, h: "Hide! A boat is coming: pirates, with a prisoner.", on: function () { var D = NVB.dinghy; if (D) {
D.visible = true;
var p = D.position;
nvbPut("smee", { x: p.x, z: p.z - 0.8, y: 0.5 });
nvbPut("starkey", { x: p.x, z: p.z + 0.9, y: 0.5 });
nvbPut("tiger", { x: p.x + 0.2, z: p.z, y: 0.5 }, { sit: 1 });
} }, say: "Tiger Lily, her hands and ankles tied, left to perish on the rock when the tide rose. Yet her face was impassive: she was the daughter of a chief, she must die as a chief's daughter, it is enough." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Peter is beside you. He has a plan.", on: function () { nvbPut("peter", { x: NVB_AT.rock.x - 6, z: NVB_AT.rock.z + 10, y: 0.6 }, {}); }, say: "He imitated the voice of Hook: \"Ahoy there, you lubbers! Set her free! Cut her bonds and let her go!\" \"But, captain...\" \"At once, d'ye hear!\"" },
{ k: "talk", who: "tiger", at: { who: "tiger" }, verb: "cut her bonds", h: "Help cut Tiger Lily's bonds.", done: function () { nvbHide("tiger"); }, say: "Like an eel she slid between Starkey's legs into the water, and was gone, home to her people." },
{ k: "duel", n: 6, cue: "Hook strikes!", h: "Hook himself has come, swimming to the rock! Fight beside Peter.", on: function () { nvbPut("hook", { x: NVB_AT.rock.x, z: NVB_AT.rock.z, y: 6.4 }, { ry: 2 }); nvbPut("peter", { x: NVB_AT.rock.x + 2.4, z: NVB_AT.rock.z + 1.2, y: 6.4 }, { ry: -1.2 }); nvbTune("mountain"); }, hit: "Clash! Hook's hook rings on steel.",
done: function () { nvbHide("hook"); nvbHide("smee"); nvbHide("starkey"); if (NVB.dinghy)
NVB.dinghy.visible = false; nvbTune("green"); }, say: "Hook bit him, unfairly. Not the pain but the unfairness dazed Peter. Then: tick, tick. Hook swam for the ship, the crocodile after him." },
{ k: "hold", at: NVB_AT.rock, r: 28, sec: 10, h: "The tide is rising. Peter is hurt and cannot fly. Stay by him.", on: function () { nvbPut("peter", { x: NVB_AT.rock.x + 2.4, z: NVB_AT.rock.z + 1.2, y: 6.4 }, { sit: 1 }); nvbPut("wendy", { x: NVB_AT.rock.x + 1.6, z: NVB_AT.rock.z + 2.2, y: 6.4 }, { sit: 1 }); }, say: "Peter was not quite like other boys; but he was afraid at last. A tremor ran through him. Then he stood erect, with that smile on his face: \"To die will be an awfully big adventure.\"" },
{ k: "find", item: "spark", at: { x: NVB_AT.rock.x + 4, z: NVB_AT.rock.z - 4, y: 5.4 }, r: 3.2, name: "Michael's kite, its tail trailing", verb: "catch the kite", h: "Something is floating past: Michael's kite! Catch it (fly up to it).", on: function () { if (NVB.kite)
NVB.kite.visible = true; }, done: function () { if (NVB.kite)
NVB.kite.visible = false; nvbHide("wendy"); }, say: "The kite could carry one. Peter tied the tail round Wendy, and away she went, out of sight. Peter was alone on the rock; and then something was moving on the lagoon toward him." }
] });
NVB_CH.push({ t: "The Never Bird", tune: "green", keep: ["nv9_egg", "A speckled Never bird's eggshell", "🥚"], intro: "The last sound Peter heard before he was quite alone",
setup: function () { var B = NVB.cast.bird; if (B) {
B.on = 1;
} nvbPut("peter", { x: NVB_AT.rock.x + 2.4, z: NVB_AT.rock.z + 1.2, y: 6.4 }, { sit: 1 }); },
steps: [
{ k: "read" },
{ k: "go", at: NVB_AT.nest, r: 12, h: "The Never bird is paddling her nest across the lagoon toward Peter. Go to her.", say: "She was making desperate efforts to reach Peter on the rock. She had come to save him, by giving him her nest, though there were eggs in it." },
{ k: "talk", who: "bird", at: NVB_AT.nest, r: 7, verb: "try to understand her", h: "Try to understand what the Never bird is saying.", say: "\"I - want - you - to - get - into - the - nest.\" \"What - are - you - quacking - about?\" Neither knew the other's language. \"Shut up!\" \"Shut up!\" At last she flew off, leaving him the nest." },
{ k: "find", item: "hat", at: { x: NVB_AT.nest.x - 4, z: NVB_AT.nest.z + 3, y: 0.8 }, r: 3, name: "Starkey's hat, floating", verb: "set the eggs in it", h: "Starkey's tarpaulin hat is floating nearby. Peter means to put the eggs in it.", say: "He put the eggs into the hat and set it on the lagoon. It floated beautifully. The Never bird settled on the hat, and Peter rowed the nest home with his shirt for a sail." },
{ k: "go", at: NVB_AT.shore, r: 12, h: "Follow the nest back to the shore.", done: function () { nvbHide("peter"); }, say: "They reached home at about the same time, Wendy by kite and Peter by nest, and every one of the boys had adventures to tell." }
] });
NVB_CH.push({ t: "The Happy Home", tune: "green", keep: ["nv10_cup", "A cup from the make-believe tea", "☕"], intro: "One important result of the brush on the lagoon",
setup: function () { nvbPut("tiger", { x: 150, z: -452, ry: Math.PI }); nvbPut("bluff1", { x: 156, z: -448, ry: 2.6 }); nvbPut("bluff2", { x: 144, z: -446, ry: -2.6 }); nvbPut("bluff3", { x: 162, z: -458 }); },
steps: [
{ k: "read" },
{ k: "go", at: { x: 150, z: -440 }, r: 18, h: "Go to the Bluff. Since the lagoon, Tiger Lily's people are your friends.", say: "Peter had saved Tiger Lily from a dreadful fate, and now there was nothing she and her people would not do for him." },
{ k: "talk", who: "tiger", at: { who: "tiger" }, h: "Speak with Tiger Lily.", say: "\"Peter saved me. My people will keep watch over your home under the ground, all night, on the ground above it. If the pirates come, they will meet us first.\"" },
{ k: "talk", who: "bluff2", at: { who: "bluff2" }, h: "Sit a moment by their fire.", say: "She tells you of the island before the pirates came: the turtles on the sands, the river caves, the first people's songs. \"Stay and eat.\"" },
{ k: "go", at: { x: NVB_AT.guard.x + 3, z: NVB_AT.guard.z + 3 }, r: 7, h: "Go back to the Hangman's Tree, where the People of the Bluff are setting their watch.", on: function () { nvbPut("bluff1", { x: NVB_AT.guard.x + 2, z: NVB_AT.guard.z }); nvbPut("bluff3", { x: NVB_AT.guard.x - 2, z: NVB_AT.guard.z + 1.5 }); nvbHide("tiger"); nvbHide("bluff2"); }, say: "They lay on the ground above, wrapped in their blankets, guarding the home below." },
{ k: "go", at: nvbH(0, 8), r: 6, h: "Down the hollow tree for tea.", on: function () { nvbBoysHome(); nvbPut("wendy", nvbH(0, -2.6)); nvbPut("john", nvbH(2.6, 2)); nvbPut("michael", nvbH(-2.6, 2)); nvbPut("peter", nvbH(3.2, -1.4)); }, say: "It was the evening of a make-believe tea." },
{ k: "gather", item: "cup", n: 6, at: nvbH(0, 0, 1.02), spread: 2.0, name: "A cup", verb: "set it on the table", each: "Laid.", h: "Set the cups on the Never-tree table.", done: function () { (NVB.tea || []).forEach(function (c) { c.visible = true; }); }, say: "And what a noisy tea it was. \"Silence!\" cried Wendy. \"I've told you not to speak with your mouths full.\"" },
{ k: "talk", who: "slightly", at: { who: "slightly" }, h: "Slightly has something to report.", say: "\"Please, mother, Slightly's eating with his mouth full... and Nibs is speaking with his. And the twins began with mammee-apples.\" Complaints all round. Wendy was never happier." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Peter, 'father', is home. Wendy asks him something.", say: "\"Peter, what are your exact feelings to me?\" \"Those of a devoted son, Wendy.\" \"I thought so,\" she said, and went and sat by herself at the extreme end of the room." }
] });
NVB_CH.push({ t: "Wendy's Story", tune: "lullaby", keep: ["nv11_lamp", "A thread from Wendy's story", "🧵"], start: { home: 1 }, jump: 1, intro: "Listen, then",
setup: function () { nvbBoysHome(); nvbPut("wendy", nvbH(2.4, -9.3), { sit: 1 }); nvbPut("john", nvbH(1.2, -6.6), { sit: 1 }); nvbPut("michael", nvbH(3.4, -6.8), { sit: 1 }); nvbPut("peter", nvbH(-2.6, -8), {}); nvbPut("tootles", nvbH(0.4, -7.4), { sit: 1 }); },
steps: [
{ k: "read" },
{ k: "talk", who: "wendy", at: { who: "wendy" }, h: "Wendy will tell a story. Ask her for it.", say: "\"Once upon a time there was a gentleman...\" \"I had rather he had been a lady.\" \"...and a lady, and their name was Mr and Mrs Darling. And they had three descendants.\"" },
{ k: "hold", at: nvbH(2.4, -7.2), r: 4, sec: 15, h: "Sit by the fire and listen to Wendy's story.", say: "\"...and they flew away to the Neverland. But the mother always left the window open for her children to fly back by. So they stayed away for years, and had a lovely time.\"" },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Peter has groaned. Ask him what is wrong.", say: "\"Long ago I thought like you that my mother would always keep the window open for me; so I stayed away for moons and moons. But the window was barred, for there was another little boy sleeping in my bed.\"" },
{ k: "talk", who: "john", at: { who: "john" }, h: "John and Michael are frightened. Speak with John.", say: "\"Wendy, let us go home!\" Perhaps their mother was already in half mourning. \"Yes,\" said Wendy, clutching them, \"at once.\"" },
{ k: "talk", who: "tootles", at: { who: "tootles" }, h: "The Lost Boys want to come too.", say: "\"Can we come too? Will your mother have us?\" \"I think she will,\" said Wendy. \"She will only have to put a few beds in the drawing-room.\"" },
{ k: "talk", who: "peter", at: { who: "peter" }, verb: "ask him to come", h: "Ask Peter to come with you.", say: "\"No,\" said Peter. \"I just want always to be a little boy and to have fun.\" He would not show that he cared. \"Tink will take you across the sea.\"" }
] });
NVB_CH.push({ t: "The Children Are Carried Off", tune: "mountain", keep: ["nv12_drum", "A beat of the tom-tom", "🥁"], intro: "The pirate attack was a complete surprise",
setup: function () { NVB.night = 0.05; nvbPut("bluff1", { x: NVB_AT.guard.x + 2, z: NVB_AT.guard.z }); nvbPut("bluff3", { x: NVB_AT.guard.x - 2, z: NVB_AT.guard.z + 1.5 }); nvbPut("tiger", { x: NVB_AT.guard.x, z: NVB_AT.guard.z - 2 }); },
steps: [
{ k: "read" },
{ k: "go", at: { x: NVB_AT.guard.x + 4, z: NVB_AT.guard.z + 6 }, r: 8, h: "Night. Something is wrong above the home. Go up and out of the hollow tree.", on: function () { nvbPut("hook", { x: NVB_AT.guard.x - 6, z: NVB_AT.guard.z - 6, ry: 0.8 }); NVB_CREW.forEach(function (k, i) { nvbPut(k, { x: NVB_AT.guard.x - 10 + i * 3, z: NVB_AT.guard.z - 9 + (i % 2) * 2, ry: 0.6 }); }); }, say: "By all the unwritten laws of savage warfare it is always the People of the Bluff who attack, and at dawn. Hook came by night, and broke every rule." },
{ k: "hold", at: { x: NVB_AT.guard.x + 6, z: NVB_AT.guard.z + 8 }, r: 10, sec: 12, h: "Hide in the trees and watch. You cannot stop this.", done: function () { ["tiger", "bluff1", "bluff3"].forEach(nvbHide); }, say: "It was over swiftly. The People of the Bluff were driven back into the dark of the wood; the pirates held the ground above the home. (Tiger Lily's people would be back.)" },
{ k: "talk", who: "hook", at: { who: "hook" }, verb: "listen", h: "Hook is standing by the hollow tree. Listen.", on: function () { nvbPut("hook", { x: -116, z: 262, ry: Math.PI }); }, say: "\"If the People of the Bluff have won, they will beat the tom-tom; it is always their sign of victory.\" Smee had found the tom-tom. Hook signed to him to beat it." },
{ k: "go", at: nvbH(0, 8), r: 6, h: "Get down the hollow tree and warn the children!", on: function () { nvbBoysHome(); nvbPut("wendy", nvbH(0, -3)); nvbPut("john", nvbH(2.2, -2)); nvbPut("michael", nvbH(-2.2, -2)); nvbPut("peter", nvbH(-6, -6), {}); }, say: "Too late: \"The tom-tom!\" they cried. \"A victory for the People of the Bluff!\" The boys made ready to go up and say goodbye to Peter." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, h: "Wendy is saying goodbye to Peter.", say: "\"Peter, you will remember about changing your flannels? And you'll take your medicine?\" Then up the trees they went, one by one, into the waiting arms of the pirates.", done: function () { ["wendy", "john", "michael"].concat(NVB_BOYS).forEach(nvbHide); } },
{ k: "go", at: { x: -112, z: 264 }, r: 7, h: "Go up after them.", on: function () { nvbHide("hook"); NVB_CREW.forEach(nvbHide); }, say: "Gone. Smee had tied them, and they were carried off to the Jolly Roger. Wendy, the only one not gagged, walked beside Hook, as a lady. Below, Peter slept on." }
] });
NVB_CH.push({ t: "Do You Believe in Fairies?", tune: "green", keep: ["nv13_tink", "A glimmer of Tink's light", "✨"], intro: "The sooner this horror is over the better",
setup: function () { NVB.night = 0.05; nvbPut("peter", nvbH(9, 4.2, 0.7), { lie: 1 }); },
steps: [
{ k: "read" },
{ k: "go", at: nvbH(0, 8), r: 6, h: "Peter is asleep below. Go down to him.", say: "Hook had crept down Peter's tree. Peter lay asleep, one arm dropped over the edge of the bed. Hook stood there, silent." },
{ k: "find", item: "glass", at: nvbH(1.4, 0.4, 1.02), r: 2.8, name: "Peter's medicine glass", verb: "look at it", h: "Peter's medicine is on the table. Something is wrong with it.", say: "Five drops of poison in it, from a red bubble Hook kept about him: of all the poisons, the most virulent. Then Hook had gone, like a bat, back up the tree." },
{ k: "talk", who: "tink", at: { who: "tink" }, h: "Tinker Bell darts in, with news.", on: function () { nvbPut("tink", nvbH(2, 4, 0.4)); nvbPut("peter", nvbH(7, 3), {}); }, say: "\"The pirates have taken Wendy and the boys!\" Peter reached for his medicine. \"No! It is poisoned!\" And Tink, in one of her quick decisions, drank it herself." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Tink's light is growing faint. Peter is with her.", say: "\"Why, Tink, why did you drink it?\" \"It was poisoned, and now I am going to be dead.\" She could get well again, she thought, if children believed in fairies." },
{ k: "clap", n: 15, sec: 14, h: "\"Do you believe? If you believe, clap your hands; don't let Tink die!\"", done: function () { var t = NVB.cast.tink; if (t && t.g)
t.g.scale.setScalar(1); }, say: "Many clapped. Some didn't. A few little beasts hissed. Then the clapping stopped suddenly; and Tink was saved, louder and lovelier than ever. She never thought of thanking those who believed." },
{ k: "go", at: { x: -112, z: 264 }, r: 7, h: "Up and out: to the Jolly Roger!", on: function () { nvbFollow(["peter", "tink"]); }, say: "Peter swore a terrible oath: \"Hook or me this time.\"" },
{ k: "go", at: NVB_AT.creek, r: 28, h: "Follow Peter through the night to Kidd's Creek, where the brig lies.", say: "He went like a shadow, with his finger to his lips and his dagger at the ready; and as he went, he ticked, like the crocodile." }
] });
NVB_CH.push({ t: "The Pirate Ship", tune: "sailor", keep: ["nv14_flag", "A thread of the Jolly Roger's flag", "🏴‍☠️"], intro: "One green light squinting over Kidd's Creek",
setup: function () { return __ZC(456, 37, this, arguments, new.target); },
steps: [
{ k: "read" },
{ k: "go", at: { ship: [0, -2] }, r: 6, h: "Fly out over Kidd's Creek and land on the Jolly Roger's deck.", say: "A rakish-looking craft, foul to the hull, every beam in her detestable, like ground strewn with mangled feathers. The terror of the seas." },
{ k: "talk", who: "smee", at: { who: "smee" }, h: "Smee is at his sewing machine, humming.", say: "Smee was sewing, humming. He never knew why the children were so fond of him; it was that he was so lovable without knowing it." },
{ k: "talk", who: "hook", at: { who: "hook" }, verb: "listen", h: "Hook paces the stern, alone with his thoughts.", say: "\"No little children love me.\" Strange it was that he thought of this. Was it bad form to think about good form? His vitals were tortured by this problem." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, h: "Wendy is tied to the mast.", say: "\"Hush, dear ones,\" she said, \"if it's true that you must die... I have a message to you from your real mothers: 'We hope our sons will die like English gentlemen.'\"" },
{ k: "go", at: { room: "hold", lx: 0, lz: 2.4 }, r: 3, h: "Go down the hatch to the hold, where the boys are in irons.", say: "In the dark of the hold, the boys in irons; all bravely planning to be very brave." },
{ k: "talk", who: "john", at: { who: "john" }, h: "John has had an offer from the pirates.", say: "\"I once thought of calling myself Red-handed Jack. Shall we still be respectful subjects of the King?\" \"You would have to swear, 'Down with the King.'\" \"Then I refuse!\" \"And I refuse!\" cried Michael. \"Rule Britannia!\"" },
{ k: "go", at: { ship: [3.2, 2] }, r: 4, h: "Back on deck. Hook means them to walk the plank.", say: "The plank was run out. Then they heard it, all of them: tick, tick, tick, tick." }
] });
NVB_CH.push({ t: "\"Hook or Me This Time\"", tune: "mountain", keep: ["nv15_button", "A gold button from Hook's coat", "🪙"], intro: "Odd things happen to all of us on our way through life",
setup: function () { return __ZC(456, 38, this, arguments, new.target); },
steps: [
{ k: "read" },
{ k: "hold", at: { ship: [0, 3] }, r: 7, sec: 8, h: "Tick, tick. Everyone on deck freezes. Keep still.", say: "It was not the crocodile. It was Peter, ticking. Hook had crumpled into a little heap; but no one ever saw the crocodile that night." },
{ k: "go", at: { room: "cabin", lx: 0, lz: 1.6 }, r: 3, h: "Slip into Hook's cabin (its door is under the stern deck).", say: "Peter is in the cabin. One by one the pirates are sent in to see what is there; one by one, they do not come out." },
{ k: "find", item: "key", at: { room: "cabin", lx: 3.6, lz: 1.2, y: 1.3 }, r: 2.4, name: "The keys to the irons", verb: "take them", h: "Find the keys to the boys' irons.", say: "The keys, on their ring. Hook had kept them with his books." },
{ k: "go", at: { room: "hold", lx: 0, lz: 2.4 }, r: 3, h: "Down to the hold, quickly (the hatch on deck).", say: "\"Hush! It's us.\"" },
{ k: "use", at: { room: "hold", lx: 0, lz: -1.4, y: 0.4 }, r: 2.6, name: "The irons", verb: "unlock them", h: "Unlock the boys' irons.", done: function () { NVB_BOYS.forEach(nvbHide); nvbHide("john"); nvbHide("michael"); }, say: "Free! They armed themselves with such weapons as they could find, and crept up after you." },
{ k: "go", at: { ship: [0, -2] }, r: 6, h: "Up on deck! Into the fight.", on: function () { NVB_CREW.forEach(nvbHide); nvbPut("peter", { ship: [0, 1.6] }, { ry: 0 }); nvbPut("hook", { ship: [0, -1.2] }, { ry: Math.PI }); nvbFollow(["john", "michael", "tootles", "nibs"]); }, say: "\"Hook or me this time!\"" },
{ k: "duel", n: 8, win: 1.2, cue: "Hook lunges!", h: "Fight Hook beside Peter on the deck.", hit: "Clash! He cannot get past.", say: "\"Pan, who and what art thou?\" \"I'm youth, I'm joy, I'm a little bird that has broken out of the egg.\" Hook was fighting now without hope." },
{ k: "talk", who: "hook", at: { who: "hook" }, verb: "watch", h: "Hook has sprung onto the bulwarks. Watch.", on: function () { nvbPut("hook", { ship: [3.4, -3], y: 0.8 }, { ry: -Math.PI / 2 }); }, done: function () { nvbHide("hook"); }, say: "He wanted Peter to use his foot instead of his sword. \"Bad form,\" he cried jeeringly, and went content to the crocodile. Thus perished James Hook." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Captain Pan. Ask him where you are sailing.", on: function () { nvbPut("wendy", { ship: [1.2, 1] }, {}); nvbTune("sailor"); }, say: "Captain Pan, in Hook's own clothes; the crew sworn in. \"For the Azores!\" And then, home. Wendy put everyone to bed." }
] });
NVB_CH.push({ t: "The Return Home", tune: "lullaby", keep: ["nv16_window", "The latch of the open window", "🪟"], start: { room: "nursery", at: [2.0, 0.6, 0.6] }, jump: 1, intro: "And now we are back in the old nursery at 14",
setup: function () { NVB.night = null; nvbPut("mrdarling", nvbN(3.4, 2.2, 0), { sit: 1, ry: -Math.PI / 2 }); nvbPut("mrsdarling", nvbN(0.9, -2.45), { sit: 1 }); },
steps: [
{ k: "read" },
{ k: "talk", who: "mrdarling", at: { who: "mrdarling" }, h: "Mr Darling lives in Nana's kennel now. (It is in the nursery again.)", say: "The night the children flew, he crawled into the kennel, and would not come out till they came home. Every morning the kennel was carried to a cab with him in it, and so to the office." },
{ k: "talk", who: "mrsdarling", at: { who: "mrsdarling" }, h: "Mrs Darling sits by the fire, waiting, the window open.", say: "\"Oh, Nana, I dreamt my dear ones had come back.\" The window must always be left open for them, always, always." },
{ k: "talk", who: "peter", at: { who: "peter" }, verb: "see what he is up to", h: "Peter and Tink have flown in ahead of the others. What is Peter doing at the window?", on: function () { nvbPut("peter", nvbN(-2.2, -2.8), { ry: 0.2 }); nvbPut("tink", nvbN(-2.6, -3.0, 0.6)); nvbPut("mrsdarling", nvbN(-3.8, 2.6), { sit: 1, ry: Math.PI }); }, say: "\"Quick, Tink, close the window; bar it! That's right. Now when Wendy comes she will think her mother has barred her out, and she will have to go back with me.\"" },
{ k: "hold", at: nvbN(-3.3, 2.0), r: 2.2, sec: 10, h: "Mrs Darling has gone to the piano. Stand by her, and listen.", say: "Peter peeped in. Two tears were sitting on her eyes. \"She's awfully fond of Wendy.\" He was angry with her for not seeing she could not have Wendy. Then he unbarred the window. \"Come on, Tink. We don't want any silly mothers.\"" },
{ k: "use", at: nvbN(-2.2, -3.3, 1.2), r: 2.2, name: "The window", verb: "open it wide", h: "Open the window wide.", done: function () { nvbHide("peter"); nvbHide("tink"); nvbKids(true); nvbPut("mrsdarling", nvbN(0.9, -2.45), { sit: 1 }); }, say: "And so, when the children came, the window was open, after all. They popped into their beds, as if they had never been away." },
{ k: "talk", who: "wendy", at: { who: "wendy" }, verb: "wake her", h: "Wendy, John and Michael are in their beds. Go to Wendy.", say: "Mrs Darling saw them, and did not believe; she thought it was a dream. Then the three slid out of bed and ran to her. \"George, George!\" Nana came rushing in. There could not have been a lovelier sight." },
{ k: "talk", who: "mrdarling", at: { who: "mrdarling" }, h: "The six Lost Boys are waiting downstairs. Will Mr Darling take them?", on: function () { nvbPut("mrdarling", nvbN(1.6, 0.4), {}); NVB_BOYS.forEach(function (k, i) { nvbPut(k, nvbN(2.4 + (i % 3) * 0.8, 1.6 + Math.floor(i / 3) * 0.8), { ry: Math.PI }); }); }, say: "\"I'm not a cypher in my own house!\" But he would have them all; and he danced them round the drawing-room. They would have to fit in the drawing-room, but they could double up." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Peter is at the window, ready to go.", on: function () { nvbPut("peter", nvbN(-2.2, -2.9), { ry: 0 }); }, say: "\"Would you send me to school? And then to an office? I don't want to go to school and learn solemn things. No one is going to catch me and make me a man.\" He would come for Wendy once a year, to do his spring cleaning." }
] });
NVB_CH.push({ t: "When Wendy Grew Up", tune: "lullaby", keep: ["nv17_crow", "Peter's crow, remembered", "🐓"], start: { room: "nursery", at: [2.0, 0.6, 0.6] }, jump: 1, intro: "Years and years afterwards",
setup: function () { nvbPut("wendyold", nvbN(0.9, -2.45), { sit: 1 }); nvbPut("jane", nvbN(-3.2, 2.45, 0.72), { lie: 1 }); },
steps: [
{ k: "read" },
{ k: "talk", who: "wendyold", at: { who: "wendyold" }, h: "Years later. Wendy is grown up, sitting by the fire with her mending.", say: "\"Do you remember the days when you could fly?\" \"I can't fly now, dear; I'm grown up. When people grow up they forget the way.\" \"Why do they forget?\" \"Because they are no longer gay and innocent and heartless.\"" },
{ k: "talk", who: "jane", at: { who: "jane" }, h: "Jane, her little girl, wants the story again.", say: "\"Tell me about the time you flew. What was it like?\" She has heard it a hundred times, and it is always new." },
{ k: "hold", at: nvbN(-2.2, -2.6), r: 1.8, sec: 10, h: "Night, and spring-cleaning time. Wait by the window.", say: "And then, one night, the window blew open as of old, and Peter dropped in on the floor. He was exactly the same as ever, with all his first teeth." },
{ k: "talk", who: "peter", at: { who: "peter" }, h: "Peter has come for Wendy.", on: function () { nvbPut("peter", nvbN(-2.2, -2.8), { ry: 0 }); }, say: "\"Hullo, Wendy.\" \"Where is John?\" he asked. He has forgotten Hook. \"Who is Captain Hook?\" And Tink: \"There are such a lot of fairies, I expect she is no more.\" Wendy rose from the fire; she was a big woman now. \"I can't come, Peter. I have forgotten how to fly.\"" },
{ k: "talk", who: "jane", at: { who: "jane" }, verb: "wake her", h: "Jane has woken up.", on: function () { nvbPut("jane", nvbN(-2.6, 0.6), { ry: -1 }); }, say: "\"Hullo,\" said Jane, quite at home. And soon she was flying round the room, crowing. \"He does so need a mother,\" Jane said." },
{ k: "use", at: nvbN(-2.2, -3.3, 1.2), r: 2.2, name: "The open window", verb: "wave goodbye", h: "Watch them fly away together, out of the window.", done: function () { nvbHide("peter"); nvbHide("jane"); }, say: "Jane is a common grown-up now, with a daughter called Margaret; and every spring-cleaning time, except when he forgets, Peter comes for Margaret and takes her to the Neverland, where she tells him stories about himself, to which he listens eagerly. And thus it will go on, so long as children are gay and innocent and heartless." }
] });
var NVB_NIGHT = { top: 0x070A1C, low: 0x1A2240, fog: 0x10142A, sunCol: 0x8AA0D0, hemiCol: 0x5A6A98, hemiGround: 0x14141E };
function nvbMix(a, b, k) { return new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, k))).getHex(); }
(function () {
var W = typeof WORLDS !== "undefined" && WORLDS.neverland;
if (!W)
return;
var b0 = W.build, e0 = W.enter, l0 = W.leave, g0 = W.ground, k0 = W.block, t0 = W.tick, v0 = W.env, h0 = W.back;
W.build = function (G) { b0.apply(this, arguments); try {
nvbIsland(G);
nvbCastMake(G);
}
catch (e) {
if (window.console)
console.warn("[nvb] build", e);
} };
W.enter = function (opt) {
e0.apply(this, arguments);
NVB.room = null;
try {
nvbHomeDress();
}
catch (e) { }
var S = nvbS();
if ((opt && opt.nvb) || NVB.pending) {
NVB.pending = 0;
S.started = 1;
try {
nvbChapterBegin(true);
}
catch (e) {
if (window.console)
console.warn("[nvb] begin", e);
}
}
else if (S.started && !S.done) {
try {
nvbChapterBegin(false);
}
catch (e) { }
setTimeout(function () { nvbSay("<b>Peter and Wendy</b> is open at Chapter " + (S.ch + 1) + ". Press E when nothing else is near to open the book."); }, 4000);
}
};
W.leave = function () { try {
nvbTune(null);
Object.keys(NVB.rooms).forEach(function (r) { NVB.rooms[r].g.visible = false; });
NVB.room = null;
NVB.follow = [];
NVB.night = null;
nvbItemsClear();
nvbAmbient(true);
if (NVB.beam)
NVB.beam.visible = false;
}
catch (e) { } return l0.apply(this, arguments); };
W.ground = function (x, z) { if (NVB.room)
return NVB_ROOM[NVB.room].y; return g0.apply(this, arguments); };
W.block = function (x, z, feet) {
if (NVB.room) {
var R = NVB_ROOM[NVB.room], Q = NVB.rooms[NVB.room], lx = x - R.x, lz = z - R.z;
if (Math.abs(lx) > R.w / 2 - 0.3 || Math.abs(lz) > R.d / 2 - 0.3)
return true;
return Q ? worldSolidAt(Q.solids, lx, lz, feet - R.y) : false;
}
return k0.apply(this, arguments);
};
W.back = function () { if (NVB.room) {
var k = NVB.room;
if (NVB.rooms[k])
NVB.rooms[k].g.visible = false;
NVB.room = null;
} return h0.apply(this, arguments); };
W.env = function () {
var e = v0.apply(this, arguments), n = NVB.room ? (NVB_ROOM[NVB.room].night ? 0 : null) : NVB.night;
if (n === null || n === undefined || !e)
return e;
var d = n, o = {};
for (var q in e)
o[q] = e[q];
o.top = nvbMix(NVB_NIGHT.top, 0xF0A8B8, d);
o.low = nvbMix(NVB_NIGHT.low, 0xFFD8A8, d);
o.fog = nvbMix(NVB_NIGHT.fog, 0xFFD8B8, d);
o.fogD = 0.0006;
o.sun = 0.15 + 0.6 * d;
o.sunCol = nvbMix(NVB_NIGHT.sunCol, 0xFFC890, d);
o.sunDir = [0.3, 0.25 + 0.2 * d, 0.5];
o.hemi = 0.3 + 0.45 * d;
o.hemiCol = nvbMix(NVB_NIGHT.hemiCol, 0xEAE4F0, d);
o.hemiGround = nvbMix(NVB_NIGHT.hemiGround, 0x4A6A3A, d);
o.stars = 1 - d * 0.6;
return o;
};
W.tick = function (dt) {
if (NVB.room) {
try {
nvbRoomTick(dt);
}
catch (e) {
if (window.console)
console.warn("[nvb] room", e);
}
}
else {
try {
t0.apply(this, arguments);
}
catch (e) {
if (window.console)
console.warn("[nvb] nv", e);
}
}
try {
nvbTick(dt);
}
catch (e) {
if (window.console)
console.warn("[nvb] tick", e);
}
};
})();
var NVB_AMB = /^(Peter Pan|Captain James Hook|Smee|Tootles|Nibs|Slightly|Curly|The (First|Second) Twin|Starkey|Cecco|Bill Jukes|Noodler|Cookson|Skylights|Tiger Lily)$/;
function nvbAmbient(back) { return __ZC(456, 39, this, arguments, new.target); }
function nvbRoomTick(dt) { return __ZC(456, 40, this, arguments, new.target); }
function nvbTick(dt) { return __ZC(456, 41, this, arguments, new.target); }
(function () {
try {
if (typeof PS_SECTIONS !== "undefined") {
var st = PS_SECTIONS.filter(function (s) { return s.k === "stories"; })[0];
if (st && st.ids.indexOf("me-nvbook") < 0)
st.ids.push("me-nvbook");
}
}
catch (e) { }
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-nvbook")) {
var btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-nvbook";
btn.title = "Peter and Wendy";
btn.textContent = "🧚 Peter and Wendy";
btn.onclick = function () { nvbOpen(); };
bar.appendChild(btn);
}
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
})();
