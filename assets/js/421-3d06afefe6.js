/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WDG_TIERS = [
{ k: "simple", n: "Sweet and Simple", price: 250, guests: 12, ai: 8, lite: 4, decor: 1, keep: [],
note: "Wildflower posies, a garland on the arch, two short rows of chairs, the officiant and a quiet song." },
{ k: "classic", n: "Classic Romance", price: 800, guests: 30, ai: 16, lite: 6, decor: 2, keep: [],
note: "Roses climbing the arch, a petal-strewn aisle runner, flowers at every row, a flower girl and a page boy." },
{ k: "elegant", n: "Elegant Evening", price: 2000, guests: 60, ai: 24, lite: 8, decor: 3, keep: [],
note: "Silk draped over the arch, candle lanterns all down the aisle, tall flower columns, sashed chairs and a harpist." },
{ k: "grand", n: "Grand Celebration", price: 4500, guests: 120, ai: 32, lite: 10, decor: 4, keep: ["wed_album"],
note: "A wall of flowers behind you, lanterns hung high overhead, a long carpet, a string quartet, the photographer and a wedding album." },
{ k: "royal", n: "Royal Splendour", price: 9000, guests: 200, ai: 40, lite: 12, decor: 5, keep: ["wed_album"],
note: "A gilded arch and golden chairs, towering flower pillars and banners, an honour guard down the aisle, trumpeters and a string quartet, and the album." }
];
var WDG_OLD = { vows: "simple", intimate: "classic", classic: "elegant", grand: "grand" };
var WDG_VENUES = [
{ k: "chapel", n: "The Everbloom Chapel", fee: 300, cap: 120, where: "The Everbloom Wedding House" },
{ k: "garden", n: "The Everbloom Garden", fee: 250, cap: 80, where: "The Everbloom Wedding House" },
{ k: "rose", n: "The Rose Room", fee: 100, cap: 20, where: "The Everbloom Wedding House" },
{ k: "registry", n: "The Registry Office", fee: 0, cap: 12, where: "Hearthside Family House" },
{ k: "spot", n: "A place of your own choosing", fee: 400, cap: 200, where: "wherever you mark",
note: "Anywhere in the dream: a world you love, a street in Somnucor, your own home. Stand where the arch should go, facing where your guests will sit, and mark the spot. The planners bring everything there." }
];
var WDG_CULTURES = [
{ k: "classic", n: "Classic church wedding", col: [0xF4F0E8, 0xD8B860, 0xF2E2E6], s: "arch", rite: "rings", o: "priest",
note: "White and gold, an arch of roses, the vows and the exchange of rings.",
act: "The rings are brought forward on a cushion and placed on each other's hand." },
{ k: "civil", n: "Civil ceremony", col: [0xEDE8DC, 0x6A8A9A, 0xF0F0F0], s: "table", rite: "sign", o: "registrar",
note: "A simple, warm ceremony at a signing table, the vows, and both names in the register.",
act: "The couple sign the register, and two guests sign as witnesses." },
{ k: "celtic", n: "Celtic handfasting", col: [0xE8E2CC, 0x3E6A3A, 0xF0E8C0], s: "willow", rite: "cord", o: "druid",
note: "A willow arch tied with ribbons; the couple's hands are bound with a cord: tying the knot.",
act: "The couple's joined hands are bound with a braided cord: the knot is tied." },
{ k: "moon", n: "Moon handfasting, the Old Ways", col: [0x1A1622, 0xC8CCD8, 0x8A6AB8], s: "circle", rite: "cord", o: "priestess",
note: "A ring of candles under a silver moon arch, the four quarters called, and hands bound with a cord.",
act: "The four quarters are called, and the couple's hands are bound with a silver cord." },
{ k: "jewish", n: "Jewish wedding under the chuppah", col: [0xF4F2EC, 0x2A4A8A, 0xFFFFFF], s: "chuppah", rite: "glass", o: "rabbi",
note: "A canopy on four poles, the seven blessings, and the glass broken underfoot. Mazel tov!",
act: "The seven blessings are said, a glass is wrapped in cloth and broken underfoot, and everyone calls Mazel tov!" },
{ k: "hindu", n: "Hindu wedding in the mandap", col: [0xC82A1E, 0xE8B830, 0xF0A020], s: "mandap", rite: "fire", o: "pandit",
note: "A pillared mandap of marigolds, the sacred fire, the exchange of garlands and the seven steps.",
act: "Garlands are exchanged, and the couple take the seven steps around the sacred fire, a vow at each." },
{ k: "muslim", n: "Muslim nikah", col: [0xF2F0EA, 0x2E6A4A, 0xF6F2E0], s: "arches", rite: "scroll", o: "imam",
note: "Arches in white and green, a reading, the mahr (the gift) and the offer and acceptance said before witnesses.",
act: "The mahr is named, the offer and acceptance are spoken before two witnesses, and the contract is signed." },
{ k: "chinese", n: "Chinese tea ceremony", col: [0xC01E1E, 0xE8C048, 0xF4C8C8], s: "redgate", rite: "tea", o: "teamaster",
note: "Red and gold, the double happiness sign and lanterns; the couple serve tea to their elders.",
act: "The couple kneel and serve tea to their elders, who bless them and give red envelopes." },
{ k: "shinto", n: "Shinto wedding", col: [0xF6F4F0, 0xC8341E, 0xF2D8E0], s: "torii", rite: "sake", o: "kannushi",
note: "A vermilion torii gate, purification, and the three times three sips of sake (san-san-kudo).",
act: "The couple share sake from three cups, three sips each: san-san-kudo." },
{ k: "yoruba", n: "Yoruba wedding", col: [0xE8C030, 0x2A6A3A, 0xC83A6A], s: "canopy", rite: "tasting", o: "elder",
note: "A rich canopy, matching family colours, and the tasting of the elements: kola, honey, pepper and water.",
act: "The couple taste the four elements: kola nut for long life, honey for sweetness, pepper for passion, water for purity." },
{ k: "greek", n: "Greek Orthodox crowning", col: [0xF4F0E6, 0xC8A040, 0xFFFFFF], s: "iconstand", rite: "crowns", o: "orthodox",
note: "The stefana: two crowns joined by a ribbon, the common cup, and the dance of Isaiah round the table.",
act: "The crowns joined by a ribbon are set on the couple's heads and exchanged three times, and they walk round the table three times." },
{ k: "norse", n: "Norse handfasting", col: [0x6A5A44, 0xB8A070, 0xE8E0C8], s: "runestones", rite: "sword", o: "gothi",
note: "Standing stones and a ring of torches, the ancestral sword and the rings exchanged upon its hilt.",
act: "The ancestral sword is passed, and the rings are given upon its hilt." }
];
var WDG_OFFICIANTS = [
{ k: "priest", n: "Father Ambrose Hale", t: "a parish priest", sex: "m", age: 62, dress: { top: 0xF4F2EC, topKind: "robe", bottom: 0x1A1A1E }, acc: ["stole:0xD8B860"] },
{ k: "minister", n: "Reverend Clara Whitlow", t: "a minister", sex: "f", age: 48, dress: { top: 0x16161A, topKind: "robe", bottom: 0x16161A }, acc: ["collar", "stole:0x6A2A3A"] },
{ k: "registrar", n: "Horace Pennywhistle", t: "the registrar of Somnucor", sex: "m", age: 58, dress: { top: 0xE8E4DA, layer: "suit", layerColor: 0x2A2E3A, bottom: 0x2A2E3A }, acc: [] },
{ k: "celebrant", n: "Juniper Vale", t: "an independent celebrant who leads any kind of wedding", sex: "f", age: 39, dress: { top: 0x5A6A8A, layer: "suit", layerColor: 0x3A4A6A, bottom: 0x2A3040 }, acc: [] },
{ k: "druid", n: "Bran Ashgrove", t: "a Celtic druid celebrant", sex: "m", age: 55, dress: { top: 0xEEEAE0, topKind: "robe", bottom: 0xEEEAE0, hat: "hood", hatColor: 0x3E6A3A }, acc: [] },
{ k: "priestess", n: "High Priestess Selene Morrow", t: "High Priestess of the Obsidian Moon", sex: "f", age: 46, dress: { top: 0x141018, topKind: "robe", bottom: 0x141018 }, acc: ["circlet"] },
{ k: "rabbi", n: "Rabbi Eliezer Stern", t: "a rabbi", sex: "m", age: 60, dress: { top: 0xF0F0F0, layer: "suit", layerColor: 0x1A1A22, bottom: 0x1A1A22 }, acc: ["kippah", "tallit"] },
{ k: "pandit", n: "Pandit Raghav Sharma", t: "a Hindu priest (pandit)", sex: "m", age: 57, dress: { top: 0xF2E8D0, topKind: "robe", bottom: 0xF2E8D0 }, acc: ["stole:0xE89020", "tilak"] },
{ k: "imam", n: "Imam Yusuf Haddad", t: "an imam", sex: "m", age: 52, dress: { top: 0xF6F4EE, topKind: "robe", bottom: 0xF6F4EE }, acc: ["kufi"] },
{ k: "teamaster", n: "Madam Lin Mei", t: "mistress of ceremonies for the tea ceremony", sex: "f", age: 61, dress: { top: 0xB81E1E, topKind: "robe", bottom: 0xB81E1E }, acc: ["stole:0xE8C048"] },
{ k: "kannushi", n: "Kannushi Haruki Sato", t: "a Shinto priest (kannushi)", sex: "m", age: 59, dress: { top: 0xF8F8F4, topKind: "robe", bottom: 0x6A3A8A }, acc: ["eboshi"] },
{ k: "elder", n: "Alaga Adunni Bello", t: "the alaga, the Yoruba mistress of ceremonies", sex: "f", age: 54, dress: { top: 0x2A6A3A, topKind: "robe", bottom: 0x2A6A3A }, acc: ["gele:0xE8C030", "stole:0xE8C030"] },
{ k: "orthodox", n: "Father Nikolaos Petrakis", t: "a Greek Orthodox priest", sex: "m", age: 64, dress: { top: 0x141414, topKind: "robe", bottom: 0x141414 }, acc: ["kamilavkion", "stole:0xD8B040"] },
{ k: "gothi", n: "Gothi Ingrid Halvarsdottir", t: "a gothi, a Norse priestess and celebrant", sex: "f", age: 50, dress: { top: 0x6A5A44, topKind: "robe", bottom: 0x4A3E30 }, acc: ["fur", "circlet"] }
];
var WDG_WORDS = {
classic: ["Dearly beloved, we are gathered here together to join {A} and {B} in marriage.", "Marriage is a promise made with an open heart: to love, to honour and to cherish, in good times and in hard.", "If anyone here knows a reason these two may not be joined, let them speak now, or forever hold their peace.", "{A} and {B}, you come freely and with full hearts. Please join hands.", "These rings are a circle without end. Give them now as a sign of your love.", "Then let each of you answer: will you take each other, from this day forward?"],
civil: ["Welcome, everyone. We are here to witness the marriage of {A} and {B}.", "This is a civil ceremony: no grand words are needed, only true ones.", "I am bound to ask: do you know of any lawful reason why you may not marry? Then we may go on.", "Before these witnesses, please each say the words that make it so.", "After your vows you will sign the register, and two of your guests will sign as witnesses.", "{A}, {B}: are you ready to make your declaration?"],
celtic: ["Welcome, friends, beneath the willow. We gather in the old way to see {A} and {B} handfasted.", "Join your hands, right to right and left to left, so your arms make the sign of forever.", "With this cord I bind you: not to hold you captive, but to show the bond you have chosen freely.", "The first turn for friendship, the second for faithfulness, the third for joy that lasts.", "So the knot is tied, and from it comes the old saying: you have tied the knot.", "Now speak your promises, and let them be heard by the earth and the sky."],
moon: ["Welcome, all, within the circle. The candles are lit and the moon looks down.", "I call to the East and the air, to the South and the fire, to the West and the water, to the North and the earth: witness us.", "{A} and {B} come of their own free will to be handfasted under the Old Ways.", "Join your hands. With this silver cord I bind your hands, as your hearts are already bound.", "As long as love shall last, may you walk together in light and in shadow.", "Speak now your vows, and let the circle hear them."],
jewish: ["Welcome, all. Beneath this chuppah, open on every side like the tent of Abraham, {A} and {B} begin their home.", "The chuppah has no walls, for a home is built on welcome, and its roof is love.", "We say over you the seven blessings: for joy and gladness, for love and companionship, for peace and friendship.", "Blessed are you who gladdens the couple, and who makes this love a blessing to all who know it.", "Now the glass is wrapped and broken underfoot: even in our greatest joy we remember, and we begin. Mazel tov!", "{A}, {B}: speak your promise to one another."],
hindu: ["Namaste, and welcome. Before the sacred fire, Agni, the witness of all vows, {A} and {B} are joined.", "First the garlands, the jaimala: each places a garland on the other, and so each is welcomed.", "Now the knot is tied between your scarves, the gathbandhan, and you take the seven steps around the fire.", "With the first step, nourishment; the second, strength; the third, prosperity; the fourth, happiness.", "The fifth, children and family; the sixth, long life together; and the seventh, lifelong friendship.", "Having walked the seven steps, speak your vows before the fire."],
muslim: ["Bismillah. Welcome, all, to the nikah of {A} and {B}.", "Marriage is a covenant of tranquillity, love and mercy between two people.", "The mahr, the gift, has been named and is given gladly.", "Before these two witnesses, the offer is made, and it must be accepted freely, and said three times.", "May your home be filled with peace, patience and kindness all your days.", "Now speak your acceptance, and let the witnesses hear it."],
chinese: ["Welcome, honoured family and friends, to the tea ceremony of {A} and {B}.", "The double happiness sign shines over you: happiness for one, and happiness for two.", "Now the couple kneel and serve tea to their elders: first to the parents, then to the grandparents, aunts and uncles.", "Each elder drinks and gives a blessing, and a red envelope for good fortune.", "Tea is a promise of respect: to honour family, and to be honoured by it.", "With the elders' blessing, speak your vows to one another."],
shinto: ["Welcome. Before the kami, {A} and {B} come to be joined.", "First, purification: may every worry be swept away like leaves before the wind.", "Now san-san-kudo: three cups of sake, three sips from each. Three times three, for a bond that cannot be broken.", "Each sip is a promise: to love, to share hardship, and to share joy.", "The sacred branch, the tamagushi, is offered, and the kami are thanked.", "Now read your vows before the kami and your families."],
yoruba: ["E kaabo! Welcome, families and friends, to the joining of {A} and {B}.", "Today two families become one, dressed alike in their chosen colours.", "Now the tasting of the elements: kola nut for long life, honey for sweetness, pepper for passion, and water for purity.", "Taste each, and remember: a marriage holds the sweet and the hot together, and is washed new each day.", "The elders bless you: may your home be full and your laughter loud.", "Now speak your promises, and let the drums answer!"],
greek: ["Welcome, all. In the Orthodox way, {A} and {B} are crowned as king and queen of their own home.", "The rings are blessed and exchanged three times: in the name of the Father, the Son and the Holy Spirit.", "Now the stefana, two crowns joined by a ribbon, are placed upon their heads and exchanged three times.", "They drink from the common cup: from this day, all is shared.", "Now they walk three times round the table, their first steps together as one.", "Let them now say their vows before all of you."],
norse: ["Hail and welcome, kin and friends! Within these stones and torches, {A} and {B} are joined.", "We honour those who came before, whose names we carry.", "Here is the ancestral sword, passed to show that the family's strength and protection go with this union.", "Upon its hilt the rings are given: a promise as strong as iron and as lasting as stone.", "Join your hands, and let the old words be spoken over you.", "Speak now your oath, and let the gods and your kin bear witness!"]
};
if (typeof module !== "undefined" && module.exports)
module.exports = { WDG_TIERS: WDG_TIERS, WDG_VENUES: WDG_VENUES, WDG_CULTURES: WDG_CULTURES, WDG_OFFICIANTS: WDG_OFFICIANTS, WDG_WORDS: WDG_WORDS, WDG_OLD: WDG_OLD };
"use strict";
var WDG = { list: [], at: 0, busy: false, missing: false, fast: 0, sets: {}, pool: [], kids: [], stand: [], offs: {}, q: [], warned: false, t: 0, gc: {}, mc: {}, cap: null, prompt: null, poolAt: 0,
my: null, lineSaid: {}, begun: {} };
function wdgLite() { return (typeof LITE !== "undefined" && !!LITE); }
function wdgHash(s) { s = String(s); var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function wdgTier(k) { k = WDG_OLD[k] || k; return WDG_TIERS.filter(function (t) { return t.k === k; })[0] || WDG_TIERS[1]; }
function wdgCulture(k) { return WDG_CULTURES.filter(function (c) { return c.k === k; })[0] || WDG_CULTURES[0]; }
function wdgOfficiant(k) { return WDG_OFFICIANTS.filter(function (o) { return o.k === k; })[0] || WDG_OFFICIANTS[0]; }
function wdgGeo(k) { return __ZC(421, 0, this, arguments, new.target); }
function wdgMat(col, o) { return __ZC(421, 1, this, arguments, new.target); }
function wdgPut(P, geo, col, sx, sy, sz, x, y, z, o) { return __ZC(421, 2, this, arguments, new.target); }
function wdgBatch(P, geo, col, list, o) { return __ZC(421, 3, this, arguments, new.target); }
function wdgBunch(P, x, y, z, r, n, cols, seed) { return __ZC(421, 4, this, arguments, new.target); }
var WDG_GOLD = 0xD8B048, WDG_WOOD = 0x6A4A30, WDG_DARKWOOD = 0x3A2A1C, WDG_STONE = 0x8A8680, WDG_GREEN = 0x3E6A34, WDG_WHITE = 0xF4F2EC, WDG_FLAME = 0xFFB860;
function wdgStructure(P) { return __ZC(421, 5, this, arguments, new.target); }
var WDG_XI = null;
function wdgXiMat() { return __ZC(421, 6, this, arguments, new.target); }
function wdgSeats(P, n) { return __ZC(421, 7, this, arguments, new.target); }
function wdgDress(P) { return __ZC(421, 8, this, arguments, new.target); }
function wdgFlowerCols(C, d) {
var a = C.col[2], cols = [a, 0xFFFFFF, C.k === "hindu" ? 0xE85A10 : C.k === "moon" ? 0x5A3A8A : 0xE8B8C0];
if (d >= 3)
cols.push(C.k === "chinese" ? 0xC01E1E : 0xF4E0A8);
if (d >= 5)
cols.push(WDG_GOLD);
return cols;
}
function wdgRiteProps(P) { return __ZC(421, 9, this, arguments, new.target); }
function wdgBuildSet(b, A) { return __ZC(421, 10, this, arguments, new.target); }
function wdgStructureFlowers(P) { return __ZC(421, 11, this, arguments, new.target); }
function wdgInstrument(P, p) { return __ZC(421, 12, this, arguments, new.target); }
function wdgDropSet(P) { return __ZC(421, 13, this, arguments, new.target); }
"use strict";
var WDG_GUEST_DRESS = [
{ sex: "m", layer: "suit", layerColor: 0x1E2230, top: 0xF4F2EC, bottom: 0x1E2230 }, { sex: "f", topKind: "dress", top: 0x7A2A4A, bottom: 0x7A2A4A },
{ sex: "m", layer: "suit", layerColor: 0x3A3E48, top: 0xE8E0D0, bottom: 0x3A3E48 }, { sex: "f", topKind: "dress", top: 0x2A5A7A, bottom: 0x2A5A7A },
{ sex: "f", topKind: "dress", top: 0xD8A8B0, bottom: 0xD8A8B0, hat: "brimmed", hatColor: 0xD8A8B0 }, { sex: "m", layer: "suit", layerColor: 0x2A3A2E, top: 0xF0EEE6, bottom: 0x2A3A2E },
{ sex: "f", topKind: "dress", top: 0x3E6A4A, bottom: 0x3E6A4A }, { sex: "m", layer: "jacket", layerColor: 0x5A4A3A, top: 0xE8E4DA, bottom: 0x3A3028 },
{ sex: "f", topKind: "dress", top: 0xC8A040, bottom: 0xC8A040 }, { sex: "m", layer: "suit", layerColor: 0x14141A, top: 0xFFFFFF, bottom: 0x14141A },
{ sex: "f", topKind: "dress", top: 0x6A4A8A, bottom: 0x6A4A8A, hat: "flowercrown", hatColor: 0xF0D8E0 }, { sex: "m", layer: "suit", layerColor: 0x4A2A2A, top: 0xF4F0E8, bottom: 0x4A2A2A }
];
function wdgPoolMax() { var t = WDG_TIERS[WDG_TIERS.length - 1]; return wdgLite() ? t.lite : t.ai; }
function wdgStandMax() { return wdgLite() ? 4 : 12; }
function wdgFig(seed, o) { return __ZC(421, 14, this, arguments, new.target); }
function wdgPoolWork() {
var want = 0, wantS = 0, wantK = 0;
for (var k in WDG.sets) {
var S = WDG.sets[k];
if (S && S.want) {
want = Math.max(want, S.want);
wantS = Math.max(wantS, S.wantS || 0);
wantK = Math.max(wantK, S.wantK || 0);
}
}
var n = wdgLite() ? 1 : 2;
while (n > 0 && WDG.pool.length < Math.min(want, wdgPoolMax())) {
var i = WDG.pool.length, D = WDG_GUEST_DRESS[i % WDG_GUEST_DRESS.length], dress = {};
for (var f in D)
if (f !== "sex")
dress[f] = D[f];
if (i >= WDG_GUEST_DRESS.length && D.sex === "f")
dress.top = dress.bottom = [0x8A3A2A, 0x2A6A6A, 0x6A6A2A, 0x4A2A6A, 0xB86A7A][i % 5];
var g = wdgFig("g" + i, { sex: D.sex, dress: dress, act: "sit", sit: true });
n--;
WDG.pool.push(g ? { g: g, i: i, sex: D.sex, busy: false, set: null } : null);
}
while (n > 0 && WDG.stand.length < Math.min(wantS, wdgStandMax())) {
var j = WDG.stand.length, sx = j % 3 === 2 ? "f" : "m", dr = j < 6 ? { layer: "suit", layerColor: 0x14141A, top: 0xFFFFFF, bottom: 0x14141A } : { layer: "uniform", layerColor: 0x8A1E22, top: 0xD8B048, bottom: 0x1A1A22, hat: "cap", hatColor: 0x1A1A22 };
if (sx === "f" && j < 6)
dr = { topKind: "dress", top: 0x14141A, bottom: 0x14141A };
var sg = wdgFig("s" + j, { sex: sx, dress: dr, act: "stand" });
n--;
WDG.stand.push(sg ? { g: sg, i: 100 + j, sex: sx, busy: false, set: null, uniform: j >= 6 } : null);
}
if (n > 0 && WDG.kids.length < Math.min(2, wantK)) {
var kd = WDG.kids.length ? { top: 0xF0EEE6, layer: "vest", layerColor: 0x2A2A3A, bottom: 0x2A2A3A } : { topKind: "dress", top: 0xF4F0F2, bottom: 0xF4F0F2, hat: "flowercrown", hatColor: 0xF2C8D0 };
var kg = wdgFig("k" + WDG.kids.length, { child: true, sex: WDG.kids.length ? "m" : "f", dress: kd, act: "walk", live: true });
WDG.kids.push(kg ? { g: kg, busy: false, set: null, girl: !WDG.kids.length } : null);
}
}
function wdgPoolDrop() { return __ZC(421, 15, this, arguments, new.target); }
function wdgOfficiantFig(k) { return __ZC(421, 16, this, arguments, new.target); }
function wdgPersona(P, who) { return __ZC(421, 17, this, arguments, new.target); }
var WDG_GUEST_NAMES = { m: ["Arthur", "Bertram", "Cyril", "Desmond", "Edwin", "Felix", "Gilbert", "Hugo", "Isaac", "Jasper", "Kofi", "Leon", "Mateo", "Nikhil", "Oscar", "Rafael", "Silas", "Tobias"],
f: ["Adaeze", "Beatrice", "Clementine", "Dorothea", "Eloise", "Florence", "Georgina", "Harriet", "Imogen", "Josephine", "Keiko", "Lavinia", "Maribel", "Noor", "Odette", "Priya", "Rosalind", "Winifred"] };
var WDG_SURN = ["Ashby", "Bellweather", "Cardew", "Delacroix", "Everett", "Fairbanks", "Greaves", "Hollis", "Ingram", "Jessop", "Kemble", "Lindqvist", "Marlowe", "Nakamura", "Okonkwo", "Pembroke", "Quinlan", "Rowntree"];
function wdgGuestName(p) { var L = WDG_GUEST_NAMES[p.sex === "f" ? "f" : "m"]; return L[p.i % L.length] + " " + WDG_SURN[(p.i * 7 + 3) % WDG_SURN.length]; }
var WDG_GUEST_WHO = ["an old school friend of the couple", "a cousin of the bride's side", "a colleague from work", "a neighbour from the same street", "an aunt who cries at every wedding", "an uncle who loves to dance",
"a childhood friend", "the couple's oldest friend", "a friend from the guild", "a family friend of many years"];
function wdgPeople(P) { return __ZC(421, 18, this, arguments, new.target); }
function wdgSitAt(P, g, s) { return __ZC(421, 19, this, arguments, new.target); }
function wdgStandAt(P, g, x, z, face) {
var L = g.userData.limbs;
if (L) {
["ll", "rl", "la", "ra"].forEach(function (k) { if (L[k]) {
L[k].rotation.x = 0;
L[k].rotation.z = 0;
} });
}
if (g.userData.sofPose)
g.userData.sofPose = null;
g.position.set(x, P.gy(x, z), z);
g.rotation.set(0, face, 0);
g.userData.wdgHome = { x: x, y: g.position.y, z: z, ry: face };
}
function wdgHold(P, p, k) { return __ZC(421, 20, this, arguments, new.target); }
function wdgPeopleTick(P, t, ph, clapping) { return __ZC(421, 21, this, arguments, new.target); }
function wdgFaceCam(P, g) {
var wp = g.getWorldPosition(new THREE.Vector3()), P0 = camera.position, a = Math.atan2(P0.x - wp.x, P0.z - wp.z) - (P.A.rot || 0);
g.rotation.y = a;
}
"use strict";
function wdgEvAnchor(k) { return __ZC(421, 22, this, arguments, new.target); }
function wdgSpotAnchor(sp) { return __ZC(421, 23, this, arguments, new.target); }
function wdgAnchor(b) { return b.venue === "spot" ? wdgSpotAnchor(b.spot) : wdgEvAnchor(b.venue); }
function wdgSigned() { return typeof signedIn === "function" && signedIn(); }
function wdgMe() { try {
return typeof myUserId === "function" ? myUserId() : (typeof session !== "undefined" && session && session.user ? session.user.id : null);
}
catch (e) {
return null;
} }
function wdgPoll(force) {
if (!wdgSigned() || WDG.busy)
return;
var now = Date.now(), gap = WDG.missing ? 600000 : (WDG.fast > now ? 12000 : 90000);
if (!force && now - WDG.at < gap)
return;
WDG.at = now;
WDG.busy = true;
cityRpc("wed_today", {}).then(function (rows) { WDG.busy = false; WDG.missing = false; WDG.list = (Array.isArray(rows) ? rows : []).concat(WDG.preview ? [WDG.preview] : []); })
.catch(function (e) { WDG.busy = false; if (/does not exist|not find the function|PGRST202|404|schema cache/i.test(String((e && e.message) || e)))
WDG.missing = true; });
}
function wdgInWindow(b, now) {
var st = new Date(b.starts_at).getTime();
if (b.status === "done")
return b.done_at && now - new Date(b.done_at).getTime() < 40 * 60000;
if (b.status === "cancelled")
return false;
return now > st - 45 * 60000 && now < st + 3 * 3600000;
}
function wdgLines(b) {
var L = (Array.isArray(b.rite) && b.rite.length) ? b.rite : (WDG_WORDS[b.culture] || WDG_WORDS.classic);
return L.map(function (s) { return String(s).replace(/\{A\}/g, b.a_name || "the bride").replace(/\{B\}/g, b.b_name || "the groom"); });
}
function wdgLineSecs(s) { return Math.max(6, Math.min(16, 3 + String(s).length * 0.06)); }
var WDG_WALK = 14, WDG_RITE = 16;
function wdgPhase(b, now) { return __ZC(421, 24, this, arguments, new.target); }
function wdgRiteWords(b) { return __ZC(421, 25, this, arguments, new.target); }
function wdgBegin(b) { return __ZC(421, 26, this, arguments, new.target); }
function wdgVow(b) { return __ZC(421, 27, this, arguments, new.target); }
var wdgCapKey = "";
function wdgCapEl() { return __ZC(421, 28, this, arguments, new.target); }
function wdgCap(b, html, force) { return __ZC(421, 29, this, arguments, new.target); }
function wdgBtn(a, label) { return " <button class='btn' data-wdg='" + a + "' style='margin:6px 4px 0;border-color:#C9A868'>" + label + "</button>"; }
function wdgTick(dt) {
WDG.t += dt;
var now = Date.now(), t = WDG.t, cam = camera.position, lite = wdgLite();
WDG.slow = (WDG.slow || 0) - dt;
if (WDG.slow <= 0) {
WDG.slow = 1.5;
wdgPoll(false);
wdgPlace(now);
}
wdgPoolWork();
var nearest = null, nd = 1e9, talkTo = null, td = 2.4;
for (var id in WDG.sets) {
var P = WDG.sets[id];
if (!P || !P.g)
continue;
P.pt = (P.pt || 0) - dt;
if (P.pt <= 0) {
P.pt = 0.3;
wdgPeople(P);
}
var b = P.b, ph = wdgPhase(b, now), dx = cam.x - P.A.x, dz = cam.z - P.A.z, d = Math.hypot(dx, dz);
if (d < 45)
wdgSounds(P, ph);
var clap = ph.k === "done" && ph.e < 25 || (b.culture === "jewish" && ph.k === "rite" && ph.u > 0.55 && ph.u < 0.8);
wdgPeopleTick(P, t, ph, clap);
wdgRiteTick(P, ph, t);
for (var f = 0; f < P.flames.length; f++) {
var fm = P.flames[f], k = 1 + 0.06 * Math.sin(t * 2.3 + f) + 0.03 * Math.sin(t * 3.7 + f * 2);
fm.scale.x = fm.scale.z = (fm.userData.s0 || (fm.userData.s0 = fm.scale.x)) * k;
fm.updateMatrix();
}
if (P.marks)
P.marks.forEach(function (m) { m.visible = ph.k !== "done"; });
if (ph.k === "done" && ph.e < 8 && !P.petalsDone && d < 45) {
P.petalsDone = true;
wdgPetals(P);
}
if (P.petals)
wdgPetalTick(P, dt);
if (d < nd) {
nd = d;
nearest = { P: P, ph: ph, d: d };
}
if (d < 40)
P.figs.forEach(function (fg) { if (!fg.name || fg.role === "kid" || !fg.g.parent)
return; var wp = fg.g.getWorldPosition(WDG_V3), dd = Math.hypot(wp.x - cam.x, wp.z - cam.z); fg.near = dd < 3; if (dd < td) {
td = dd;
talkTo = { P: P, f: fg };
} });
}
wdgTalkPrompt(talkTo);
if (nearest && nearest.d < (lite ? 40 : 55))
wdgCapFor(nearest.P, nearest.ph, nearest.d);
else if (WDG.capB)
wdgCap(WDG.capB, null);
}
var WDG_V3 = typeof THREE !== "undefined" ? new THREE.Vector3() : null;
function wdgCapFor(P, ph, d) { return __ZC(421, 30, this, arguments, new.target); }
var WDG_IN = [[392, 0.5], [523, 0.36], [523, 0.14], [523, 0.9], [392, 0.5], [587, 0.36], [494, 0.14], [523, 0.9], [392, 0.5], [523, 0.36], [698, 0.14], [698, 0.5], [659, 0.36], [587, 0.14], [523, 0.36], [494, 0.14], [523, 0.36], [587, 0.9]];
var WDG_OUT = [[523, 0.16], [523, 0.16], [523, 0.16], [523, 0.5], [523, 0.16], [523, 0.16], [523, 0.16], [523, 0.5], [523, 0.16], [523, 0.16], [523, 0.16], [659, 0.5], [784, 0.5], [1047, 0.9], [988, 0.4], [880, 0.4], [784, 0.9]];
function wdgTune(T) { if (typeof playTone !== "function")
return; var at = 0; T.forEach(function (n) { setTimeout(function () { try {
playTone(n[0], Math.max(0.2, n[1] * 1.1));
}
catch (e) { } }, at * 1000); at += n[1] + 0.04; }); }
function wdgSounds(P, ph) { return __ZC(421, 31, this, arguments, new.target); }
function wdgRiteTick(P, ph, t) { return __ZC(421, 32, this, arguments, new.target); }
function wdgPetals(P) { return __ZC(421, 33, this, arguments, new.target); }
function wdgPetalTick(P, dt) { return __ZC(421, 34, this, arguments, new.target); }
function wdgTalkPrompt(T) {
if (!T) {
if (WDG.prompt) {
if (typeof WLD !== "undefined" && WLD.promptFn === WDG.prompt)
worldPrompt(null);
WDG.prompt = null;
}
return;
}
if (typeof talkOpen !== "undefined" && talkOpen)
return;
var f = T.f, P = T.P, title = f.role === "off" ? wdgOfficiant(P.b.officiant).t : f.role === "play" ? "musician" : f.role === "guard" ? "honour guard" : "wedding guest";
if (WDG.prompt && WDG.promptWho === f && typeof WLD !== "undefined" && WLD.promptFn === WDG.prompt)
return;
WDG.promptWho = f;
WDG.prompt = function () {
var greet = f.role === "off" ? ({ wait: "Welcome. Everything is ready: we begin when the couple are.", done: "What a joy. Go and congratulate them!" }[wdgPhase(P.b, Date.now()).k] || "Welcome, welcome. Find a seat; it is a happy day.") :
["Isn't it beautiful?", "Hello! Bride's side or groom's?", "I wouldn't have missed this for anything.", "Have you ever seen such flowers?"][(f.i || 0) % 4];
if (typeof wTalk === "function")
wTalk({ name: f.name, persona: wdgPersona(P, f.role === "off" ? "off" : f.who || "a guest"), greet: greet, doing: "at a wedding" });
};
worldPrompt("💬 Talk to <b>" + esc(f.name) + "</b>, " + esc(title) + " · <b>press E</b>", WDG.prompt);
}
function wdgPlace(now) {
var cam = camera.position, keep = {}, lite = wdgLite(), far = lite ? 70 : 110, room = {};
var L = WDG.list.slice().sort(function (a, c) { return ((a.status === "done") - (c.status === "done")) || (new Date(a.starts_at) - new Date(c.starts_at)); });
L.forEach(function (b) {
if (!wdgInWindow(b, now))
return;
if (b.venue !== "spot") {
if (room[b.venue])
return;
room[b.venue] = 1;
}
var P = WDG.sets[b.id];
if (P && P.g) {
P.b = wdgMerge(P.b, b);
}
var A = P && P.g ? P.A : wdgAnchor(b);
if (!A)
return;
if (P && P.g && !wdgSameAnchor(P, b)) {
wdgDropSet(P);
delete WDG.sets[b.id];
return;
}
var d = Math.hypot(cam.x - A.x, cam.z - A.z);
if (d > far + (P ? 25 : 0))
return;
keep[b.id] = 1;
if (!P || !P.g) {
try {
var S = wdgBuildSet(b, A);
WDG.sets[b.id] = S;
var par = wdgParent(b);
par.add(S.g);
S.par = par;
wdgHideStaff(S);
}
catch (e) {
if (!WDG.warned) {
WDG.warned = true;
if (window.console)
console.warn("weddings: build", e);
}
}
}
});
for (var id in WDG.sets) {
if (!keep[id]) {
wdgDropSet(WDG.sets[id]);
delete WDG.sets[id];
}
}
if (!WDG.list.length && !Object.keys(WDG.sets).length && (WDG.pool.length || WDG.stand.length || WDG.kids.length)) {
if (!WDG.poolAt)
WDG.poolAt = now;
if (now - WDG.poolAt > 10 * 60000) {
wdgPoolDrop();
WDG.poolAt = 0;
}
}
else
WDG.poolAt = 0;
}
function wdgMerge(a, b) { var o = {}; for (var k in a)
o[k] = a[k]; for (var j in b)
if (b[j] !== undefined)
o[j] = b[j]; if (a.begun_at && !b.begun_at && !a.preview)
o.begun_at = a.begun_at; if (a.status === "done")
o.status = "done"; return o; }
function wdgSameAnchor(P, b) {
if (b.venue === "spot")
return typeof myPlace === "function" && myPlace().place === (b.spot && b.spot.place);
return typeof WLD !== "undefined" && WLD.on === "family";
}
function wdgParent(b) { return scene; }
function wdgHideStaff(P) { return __ZC(421, 35, this, arguments, new.target); }
(function () {
var dropSet = wdgDropSet;
wdgDropSet = function (P) {
if (P && P.hidTalk && typeof FL !== "undefined" && FL.talk) {
P.hidTalk.forEach(function (T) { if (FL.talk.indexOf(T) < 0)
FL.talk.push(T); });
P.hidTalk = null;
}
if (P && P.hid) {
P.hid.forEach(function (p) { p.away = false; if (p.g)
p.g.visible = true; });
P.hid = null;
}
var r = dropSet(P);
for (var k in WDG.sets) {
var S = WDG.sets[k];
if (S && S !== P && S.g && S.A && S.A.ev)
wdgHideStaff(S);
}
return r;
};
})();
function wdgMarkHere(name) { return __ZC(421, 36, this, arguments, new.target); }
function wdgSavedSpot() { try {
var s = JSON.parse(localStorage.getItem("wdgSpot") || "null");
return s && s.place ? s : null;
}
catch (e) {
return null;
} }
function wdgGoTo(b) { return __ZC(421, 37, this, arguments, new.target); }
function wdgPreview(tier, culture, officiant, venue) { return __ZC(421, 38, this, arguments, new.target); }
function wdgPreviewEnd() { if (!WDG.preview)
return; var id = WDG.preview.id; WDG.list = WDG.list.filter(function (x) { return x.id !== id; }); if (WDG.sets[id]) {
wdgDropSet(WDG.sets[id]);
delete WDG.sets[id];
} WDG.preview = null; }
function wdgStats() {
var s = { sets: 0, figs: 0, batches: 0, pool: WDG.pool.length, stand: WDG.stand.length, kids: WDG.kids.length, offs: Object.keys(WDG.offs).length, list: WDG.list.length };
for (var k in WDG.sets) {
var P = WDG.sets[k];
if (P && P.g) {
s.sets++;
s.figs += P.figs.length;
s.batches += P.batches.length;
}
}
return s;
}
(function () {
function safe(dt) { try {
if (typeof camera !== "undefined" && camera && typeof scene !== "undefined" && scene)
wdgTick(dt || 0.016);
}
catch (e) {
if (!WDG.warned) {
WDG.warned = true;
if (window.console)
console.warn("weddings:", e);
}
} }
if (typeof presenceTick === "function") {
var pt = presenceTick;
presenceTick = function (dt) { var r = pt.apply(this, arguments); safe(dt); return r; };
}
else if (typeof animateEffects === "function") {
var ae = animateEffects;
animateEffects = function (dt) { var r = ae.apply(this, arguments); safe(dt); return r; };
}
})();
"use strict";
var WDG_GO = [["greenwold", "Greenwold"], ["lounge", "GiGi's Resort"], ["party", "Jubilee"], ["northpole", "The North Pole"]];
function fwWdgPrice(W, tk, vk) {
var t = (W.tiers || []).filter(function (x) { return x.k === tk; })[0], v = (W.places || []).filter(function (x) { return x.k === vk; })[0];
return t && v ? (+t.price) + (+v.fee) + (+W.licence || 60) : 0;
}
function fwBook2Html(W) { return __ZC(421, 39, this, arguments, new.target); }
function fwBookedHtml(W, bk) { return __ZC(421, 40, this, arguments, new.target); }
function fwBook2Click(a, id, k) { return __ZC(421, 41, this, arguments, new.target); }
if (typeof document !== "undefined")
document.addEventListener("input", function (e) { if (e.target && e.target.id === "fw-spotname" && typeof FW !== "undefined")
FW.spotName = e.target.value; }, true);
