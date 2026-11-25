/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var OTM_WINGS = [
["greek", "The Hall of Olympus", "greek", "", "Marble and bronze: the Olympians and those older than them"],
["egyptian", "The Hall of the Two Lands", "egyptian", "", "Sandstone and lotus columns: the gods of the Nile"],
["norse", "The Hall of the World Tree", "norse", "", "A timbered hall round the ash Yggdrasil: the Aesir and the Vanir"],
["celtic", "The Grove Hall", "celtic", "", "An oak grove under the roof: the gods of Ireland, Wales and Gaul"],
["yoruba", "The House of the Orisha", "yoruba", "", "Red earth and carved posts: the Orisha of the Yoruba"],
["chinese", "The Hall of the Mandate of Heaven", "chinese", "", "Red lacquer and gold: the gods, immortals and sages of China"],
["dragons", "The Wyrm Hall", "dragons", "the great fireplace in the Hall of the World Tree", "The Great Dragons of every people, on their hoard"],
["lhp", "The Hall of the Left-Hand Path", "lhp", "the Qliphoth tapestry in the library", "The adversaries, the fallen and the ones who said no"]
];
var OTM_FLAMES = {
moods: { n: "Every mood (each chandelier its own colour)", c: [[0.76, 0.9], [0.55, 0.9], [0.0, 0.85], [0.33, 0.8], [0.12, 0.95]] },
violet: { n: "Violet and silver", c: [[0.76, 0.85], [0.72, 0.6], [0.8, 0.9], [0.7, 0.4], [0.78, 0.75]] },
blood: { n: "Blood and gold", c: [[0.0, 0.9], [0.04, 0.95], [0.98, 0.85], [0.1, 0.9], [0.02, 0.8]] },
moon: { n: "Moonlight (blue and white)", c: [[0.6, 0.7], [0.58, 0.4], [0.62, 0.85], [0.55, 0.5], [0.6, 0.2]] },
samhain: { n: "Samhain (orange, green and black-violet)", c: [[0.07, 0.95], [0.3, 0.85], [0.78, 0.7], [0.08, 0.9], [0.32, 0.8]] }
};
var OTM_DECO_ROOMS = [["narthex", "The Narthex"], ["hall", "The Congregation Hall"], ["egal", "The east gallery"], ["wgal", "The west gallery"], ["library", "The Library"],
["ballroom", "The Dark Ballroom"], ["seance", "The Seance Room"], ["office", "The High Priest's office"], ["study", "The High Priest's study"], ["apartment", "The High Priest's apartment"],
["passage", "The passage in the walls"], ["vestry", "The vestry"], ["bath", "The coven bath"], ["cstair", "The crypt stair"], ["undercroft", "The undercroft"], ["crypt", "The crypt"],
["stores", "The store rooms"], ["wine", "The wine cellar"], ["cold", "The cold room"], ["astro", "The Hall of the Astrolabe"], ["divine", "The Divination Parlour"], ["kids", "The Little Moons' Room"], ["potion", "The Apothecary"],
["greek", "The Hall of Olympus"], ["egyptian", "The Hall of the Two Lands"], ["norse", "The Hall of the World Tree"], ["celtic", "The Grove Hall"], ["yoruba", "The House of the Orisha"],
["chinese", "The Hall of the Mandate of Heaven"], ["dragons", "The Wyrm Hall"], ["lhp", "The Hall of the Left-Hand Path"]];
var OTM_DECO_DEEP = [["key", "The Hall of the Key"], ["pal-bael", "Bael"], ["pal-paimon", "Paimon"], ["pal-beleth", "Beleth"], ["pal-purson", "Purson"], ["pal-asmoday", "Asmoday"], ["pal-vine", "Vine"],
["pal-balam", "Balam"], ["pal-zagan", "Zagan"], ["pal-belial", "Belial"], ["pal-vassago", "Vassago"], ["pal-sitri", "Sitri"], ["pal-ipos", "Ipos"], ["pal-gaap", "Gaap"], ["pal-stolas", "Stolas"],
["pal-orobas", "Orobas"], ["pal-seere", "Seere"]];
var OTM_WIX = [
["altar", "The Cyber Altar", "the black altar in the Congregation Hall"],
["mirror", "The Obsidian Mirror", "the Narthex, on the north wall"],
["astro", "The Astrolabe and the Orrery", "the Hall of the Astrolabe, at the east end of the east gallery"],
["divine", "The Divination Station", "the Divination Parlour, through the Hall of the Astrolabe"],
["kids", "The Kid Zone", "the Little Moons' Room, at the west end of the west gallery"],
["potion", "The Potion Game", "the Apothecary, through the Little Moons' Room"],
["cookbook", "The Coven Cookbook", "the Temple Kitchen, through the Apothecary"],
["counsel", "Counsel with the High Priest", "the High Priest's office, and by its door in the Congregation Hall"]
];
var OTM_BASIN = [["coin", "Silver Coin", "🪙", "tithe"], ["crystal", "Quartz Crystal", "💎", "tithe"], ["sage", "White Sage Bundle", "🌿", "tithe"], ["oil", "Anointing Elixir Vial", "🧴", "tithe"], ["incense", "Myrrh Incense", "🌫️", "tithe"], ["imbolcCandle", "Hearth Candle", "🕯️", "imbolc"], ["milkBowl", "Bowl of Milk", "🥛", "imbolc"], ["snowdrop", "Snowdrop Bloom", "🤍", "imbolc"], ["hearthEmber", "Hearth Ember", "🔥", "imbolc"], ["flower", "Renewal Lily", "🌸", "ostara"], ["egg", "Ostara Egg", "🥚", "ostara"], ["sproutSeed", "Sprouting Seed", "🌱", "ostara"], ["ostaraHare", "Ostara Hare", "🐇", "ostara"], ["maypoleRibbon", "Maypole Ribbon", "🎀", "beltane"], ["hawthornBloom", "Hawthorn Blossom", "🌼", "beltane"], ["wildHoney", "Wild Honeycomb", "🍯", "beltane"], ["beltaneTorch", "Beltane Torch", "🔥", "beltane"], ["amber", "Solar Amber Resin", "🟠", "litha"], ["sunflower", "Golden Sunflower", "🌻", "litha"], ["oakLeafCrown", "Oak Leaf Crown", "🍃", "litha"], ["beeswaxCandle", "Beeswax Candle", "🕯️", "litha"], ["wheatSheaf", "Wheat Sheaf", "🌾", "lammas"], ["harvestBread", "Harvest Bread", "🍞", "lammas"], ["harvestSickle", "Harvest Sickle", "🌙", "lammas"], ["brambleBerries", "Bramble Berries", "🫐", "lammas"], ["apple", "Harvest Red Apple", "🍎", "mabon"], ["pomegranate", "Pomegranate Fruit", "🍷", "mabon"], ["wineGrapes", "Wine Grapes", "🍇", "mabon"], ["acornCluster", "Acorn Cluster", "🌰", "mabon"], ["carvedGourd", "Carved Gourd", "🎃", "samhain"], ["ravenFeather", "Raven Feather", "🪶", "samhain"], ["ancestorToken", "Ancestor Token", "🪬", "samhain"], ["veilCandle", "Veil Candle", "🕯️", "samhain"], ["cone", "Sacred Pine Cone", "🌲", "yule"], ["holly", "Yule Holly Sprig", "☘️", "yule"], ["mistletoeSprig", "Mistletoe Sprig", "🌿", "yule"], ["yuleStar", "Yule Star", "⭐", "yule"]];
var OTM_BASIN_NAMES = {};
OTM_BASIN.forEach(function (b) { OTM_BASIN_NAMES[b[0]] = b[1]; });
var OTM_PLACES = [["front", "The great doors"], ["hall", "The Congregation Hall"], ["altar", "The Cyber Altar"], ["mirror", "The Obsidian Mirror"], ["library", "The library"], ["ballroom", "The dark ballroom"],
["seance", "The seance room"], ["office", "The High Priest's office"], ["bath", "The coven bath"], ["wine", "The wine cellar"], ["woods", "The dark woods"], ["circle", "The stone circle"],
["greek", "The Hall of Olympus"], ["egyptian", "The Hall of the Two Lands"], ["norse", "The Hall of the World Tree"], ["dragons", "The Wyrm Hall"], ["celtic", "The Grove Hall"], ["yoruba", "The House of the Orisha"],
["chinese", "The Hall of the Mandate of Heaven"], ["lhp", "The Hall of the Left-Hand Path"], ["astro", "The Hall of the Astrolabe and the Orrery"], ["divine", "The Divination Station"],
["kids", "The Little Moons' Room (Kid Zone)"], ["potion", "The Apothecary (Potion Game)"], ["kitchen", "The Temple Kitchen (Cookbook)"]];
function otmWixMerge(c) {
c = c && typeof c === "object" ? c : {};
var o = { lines: String(c.lines || "").slice(0, 6000), today: String(c.today || "").slice(0, 400) };
OTM_WIX.forEach(function (r) { o[r[0]] = c[r[0]] !== false; });
return o;
}
var OTM_SPELLS = ["runes", "ogham", "hiero", "celestial", "greek", "hebrew", "trigram", "seals"];
var OTM_SPELLNAME = { runes: "Elder Futhark runes", ogham: "Ogham", hiero: "Egyptian signs", celestial: "Planets, zodiac and stars", greek: "Greek", hebrew: "Hebrew", trigram: "The eight trigrams", seals: "Solomonic seals" };
var OTM_SPELLCOL = { runes: "#9AD8FF", ogham: "#9AFFB0", hiero: "#FFD27A", celestial: "#D8C8FF", greek: "#D8A030", hebrew: "#FFB870", trigram: "#FF9A8A", seals: "#C890FF" };
function otmHex(v) { return typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v.toUpperCase() : ""; }
function otmDecoMerge(c) {
c = c && typeof c === "object" ? c : {};
var sp = c.spell || {}, o = { spell: { on: sp.on !== false, glow: Math.max(0.2, Math.min(1, +sp.glow || 0.85)), cols: {} }, flame: otmHex(c.flame), rooms: {} };
OTM_SPELLS.forEach(function (k) { var h = otmHex(sp.cols && sp.cols[k]); if (h)
o.spell.cols[k] = h; });
OTM_DECO_ROOMS.concat(OTM_DECO_DEEP).forEach(function (r) {
var d = c.rooms && c.rooms[r[0]];
if (!d)
return;
var e = {};
["wall", "floor", "ceil", "carpet", "flame"].forEach(function (p) { var h = otmHex(d[p]); if (h)
e[p] = h; });
if (Object.keys(e).length)
o.rooms[r[0]] = e;
});
return o;
}
var OTM_SP_TZ = "Arizona time", OTM_SP_UTC = -7;
var OTM_SP_PROG = [
["gather", -30, 30, "Gathering", "The Gathering at the Doors", "front", "priestess", "The great doors stand open. Each dreamer is given an unlit candle to carry into the rite."],
["toll", 0, 20, "Rite", "The Tolling of the Year", "hall", "priestess", "At midnight the bell tolls twelve and every flame in the hall is put out: the old year is dead."],
["circle", 20, 25, "Rite", "The Casting of the Circle", "hall", "priestess", "In the dark, the High Priestess casts the circle and calls the four quarters."],
["procession", 45, 45, "Rite", "The Procession to the New Fire", "circle", "firekeeper", "Out by the lantern path to the stone circle in the dark woods, where the new fire is lit and everyone carries a flame home."],
["ancestors", 90, 45, "Rite", "The Rite of the Ancestors", "hall", "priestess", "At the altar of the ancestors: the names of our dead are spoken aloud and a candle lit for each."],
["supper", 135, 45, "Service", "The Dumb Supper", "ballroom", "priestess", "A meal eaten in silence at a long black table, with a place laid for the dead."],
["apples", 180, 45, "Divination", "Snap-Apple and the Nut Fire", "divine", "seanchai", "The old Halloween games of telling the future: nuts in the fire, the swinging apple, the apple peel."],
["vigil", 225, 135, "Vigil", "The Vigil of the Thin Veil", "hall", "priestess", "The quiet hours until dawn. Sit with the dead of Samhain, who answer at the altar."],
["dawn", 390, 60, "Service", "The Greeting of the First Dawn of Winter", "front", "priestess", "The doors are thrown open to the east for the first sunrise of the dark half of the year."],
["lore", 540, 60, "Teaching", "What Samhain Was: a Teaching", "library", "seanchai", "The temple's storyteller teaches what the old Irish books really say of Samhain. Ask anything."],
["harvest", 720, 60, "Offering", "The Offering of the Harvest", "altar", "priestess", "Apples, bread, grain and wine laid on the Cyber Altar: the last of the year's harvest given back."],
["tales", 840, 60, "Tales", "Tales by the Fire", "circle", "seanchai", "At the stone circle: the old Samhain tales, Nera in the mound of Cruachan and Fionn at Tara."],
["remembrance", 960, 60, "Service", "The Service of Remembrance", "hall", "priestess", "Every name laid on the altar since midnight is read aloud in the hall."],
["feast", 1080, 90, "Feast", "The Samhain Feast", "ballroom", "priestess", "Colcannon, barmbrack with the ring baked in it, apples and nuts: the feast of the turning year."],
["guising", 1200, 60, "Rite", "The Guising", "front", "seanchai", "Masks on, as the old Scots and Irish went guising door to door: a song or a rhyme earns a treat."],
["bonfire", 1290, 120, "Rite", "The Great Rite of the Bonfire", "circle", "firekeeper", "The great fire in the stone circle. Cast into it what you leave behind with the old year."],
["closing", 1410, 30, "Rite", "The Closing of the Veil", "hall", "priestess", "The circle is opened, the quarters thanked, and the hearths of the temple lit again for the winter."]
];
var OTM_SP_LEAD = { priestess: "the High Priestess", firekeeper: "the Keeper of the Fire", seanchai: "the Seanchaí, the temple's storyteller" };
var OTM_SP_WHERE = { front: "the great doors and the Narthex", hall: "the Congregation Hall", circle: "the stone circle in the dark woods", ballroom: "the Dark Ballroom", divine: "the Divination Parlour", library: "the Library", altar: "the Cyber Altar in the Congregation Hall" };
var OTM_SP_KIDS = [
["lanterns", 540, 60, "Lantern Making", "Carve a turnip lantern, the old Irish and Scottish way, and give it a face."],
["snapapple", 630, 60, "Snap-Apple", "Catch the swinging apple with no hands, the old Halloween game."],
["harvest", 750, 60, "The Harvest Table", "Lay an apple, a nut, a leaf or a drawing on the table and say thank you to the year."],
["story", 870, 60, "The Story Fire", "Hear how young Fionn stayed awake on Samhain night and saved Tara."],
["parade", 990, 60, "The Costume Parade", "Dress up and go guising round the lanterns: a song or a joke earns a treat."],
["goodnight", 1110, 30, "The Little Moons' Goodnight", "Light a candle for someone you miss, and say goodnight to the old year."],
["trick", 540, 660, "Trick-or-Treat through Somnucor", "All day until 8 pm: knock on every door in the city for candy. Whoever collects the most candy wins the Halloween Sceptre for the year!"]
];
function otmSpMerge(c) {
c = c && typeof c === "object" ? c : {};
var st = /^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(c.start || "") ? c.start : "2026-10-31T00:00";
return { on: c.on !== false, start: st, names: String(c.names || "").slice(0, 3000) };
}
function otmSpStartMs(sp) {
var m = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/.exec((sp && sp.start) || "2026-10-31T00:00");
if (!m)
return Date.UTC(2026, 9, 31, 7, 0);
return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4] - OTM_SP_UTC, +m[5]);
}
function otmSpClock(ms) { return __ZC(401, 0, this, arguments, new.target); }
function otmDefaults() {
var w = {};
OTM_WINGS.forEach(function (r) { w[r[0]] = true; });
return { open: true, lock: "coven", talk: true, priest: "all", flames: "moods", samhain: false, wings: w, deep: { open: true }, deco: otmDecoMerge(null), wix: otmWixMerge(null), sp: otmSpMerge(null), notes: "" };
}
function otmMerge(c) {
var d = otmDefaults();
if (!c || typeof c !== "object")
return d;
var o = { open: c.open !== false, lock: c.lock === "open" ? "open" : "coven", talk: c.talk !== false, priest: /^(all|coven|keeper)$/.test(c.priest) ? c.priest : "all",
flames: OTM_FLAMES[c.flames] ? c.flames : "moods", samhain: c.samhain === true, wings: {}, deep: { open: !(c.deep && c.deep.open === false) }, deco: otmDecoMerge(c.deco), wix: otmWixMerge(c.wix), sp: otmSpMerge(c.sp), notes: String(c.notes || "").slice(0, 1200) };
OTM_WINGS.forEach(function (r) { o.wings[r[0]] = !(c.wings && c.wings[r[0]] === false); });
return o;
}
var OTM_ROSTER = { "greek": [["zeus", "Zeus"], ["hera", "Hera"], ["poseidon", "Poseidon"], ["demeter", "Demeter"], ["athena", "Athena"], ["apollo", "Apollo"], ["artemis", "Artemis"], ["ares", "Ares"], ["hephaestus", "Hephaestus"], ["aphrodite", "Aphrodite"], ["hermes", "Hermes"], ["hestia", "Hestia"], ["dionysus", "Dionysus"], ["hades", "Hades"], ["persephone", "Persephone"], ["hecate", "Hecate"], ["nemesis", "Nemesis"], ["morpheus", "Morpheus"]], "norse": [["odin", "Odin"], ["frigg", "Frigg"], ["thor", "Thor"], ["sif", "Sif"], ["loki", "Loki"], ["baldr", "Baldr"], ["tyr", "Tyr"], ["heimdall", "Heimdall"], ["bragi", "Bragi"], ["idunn", "Idunn"], ["vidar", "Vidar"], ["njord", "Njord"], ["freyr", "Freyr"], ["freyja", "Freyja"], ["skadi", "Skadi"], ["hel", "Hel"]], "egyptian": [["ra", "Ra"], ["amun", "Amun"], ["ptah", "Ptah"], ["thoth", "Thoth"], ["maat", "Maat"], ["osiris", "Osiris"], ["isis", "Isis"], ["set", "Set"], ["nephthys", "Nephthys"], ["horus", "Horus"], ["anubis", "Anubis"], ["sekhmet", "Sekhmet"], ["hathor", "Hathor"], ["bastet", "Bastet"], ["sobek", "Sobek"], ["nut", "Nut"], ["geb", "Geb"], ["taweret", "Taweret"]], "yoruba": [["obatala", "Obatala"], ["oduduwa", "Oduduwa"], ["esu", "Esu"], ["ogun", "Ogun"], ["sango", "Sango"], ["oya", "Oya"], ["osun", "Osun"], ["yemoja", "Yemoja"], ["orunmila", "Orunmila"], ["ososi", "Ososi"], ["osanyin", "Osanyin"], ["obaluaye", "Obaluaye"], ["olokun", "Olokun"], ["aganju", "Aganju"], ["ibeji", "Ibeji"], ["osumare", "Osumare"]], "celtic": [["dagda", "Dagda"], ["morrigan", "Morrigan"], ["brigid", "Brigid"], ["lugh", "Lugh"], ["nuada", "Nuada"], ["airmid", "Airmid"], ["manannan", "Manannan"], ["aengus", "Aengus"], ["oghma", "Oghma"], ["eriu", "Eriu"], ["rhiannon", "Rhiannon"], ["arawn", "Arawn"], ["cerridwen", "Cerridwen"], ["arianrhod", "Arianrhod"], ["gwydion", "Gwydion"], ["math", "Math"], ["bran", "Bran"], ["orddu", "Orddu"], ["cernunnos", "Cernunnos"], ["epona", "Epona"], ["matres", "Matres"], ["taranis", "Taranis"], ["merlin", "Merlin"], ["queenmab", "Queen Mab"]], "chinese": [["pangu", "Pangu"], ["nuwa", "Nuwa"], ["fuxi", "Fuxi"], ["jadeemperor", "Jade Emperor"], ["xiwangmu", "Xiwangmu"], ["laojun", "Taishang Laojun"], ["shennong", "Shennong"], ["houyi", "Houyi"], ["change", "Chang'e"], ["guanyin", "Guanyin"], ["mazu", "Mazu"], ["guanyu", "Guan Yu"], ["zaojun", "Zao Jun"], ["yanluo", "Yanluo Wang"], ["zhongkui", "Zhong Kui"], ["nezha", "Nezha"], ["wukong", "Sun Wukong"], ["lvdongbin", "Lu Dongbin"], ["zhongliquan", "Zhongli Quan"], ["zhangguolao", "Zhang Guolao"], ["hanxiangzi", "Han Xiangzi"], ["caoguojiu", "Cao Guojiu"], ["litieguai", "Li Tieguai"], ["lancaihe", "Lan Caihe"], ["hexiangu", "He Xiangu"]], "dragons": [["tiamat", "Tiamat"], ["kingu", "Kingu"], ["mushussu", "Mushussu"], ["apep", "Apep"], ["typhon", "Typhon"], ["echidna", "Echidna"], ["python", "Python"], ["ladon", "Ladon"], ["draco", "Draco"], ["colchian", "Colchian Dragon"], ["hydra", "Hydra"], ["jormungandr", "Jormungandr"], ["fafnir", "Fafnir"], ["nidhogg", "Nidhogg"], ["ddraiggoch", "Y Ddraig Goch"], ["barrowwyrm", "Barrow Wyrm"], ["zmey", "Zmey Gorynych"], ["azidahaka", "Azi Dahaka"], ["vritra", "Vritra"], ["vasuki", "Vasuki"], ["shesha", "Shesha"], ["aoguang", "Ao Guang"], ["yinglong", "Yinglong"], ["ryujin", "Ryujin"], ["orochi", "Yamata no Orochi"], ["quetzalcoatl", "Quetzalcoatl"], ["leviathan", "Leviathan"]], "lhp": [["lucifer", "Lucifer"], ["satan", "Satan"], ["lilith", "Lilith"], ["samael", "Samael"], ["naamah", "Naamah"], ["belial", "Belial"], ["beelzebub", "Beelzebub"], ["asmodeus", "Asmodeus"], ["astaroth", "Astaroth"], ["azazel", "Azazel"], ["baphomet", "Baphomet"], ["mammon", "Mammon"], ["belphegor", "Belphegor"], ["bael", "Bael"], ["paimon", "Paimon"], ["leviathan", "Leviathan"], ["moloch", "Moloch"], ["adramelech", "Adramelech"], ["lucifuge", "Lucifuge Rofocale"], ["choronzon", "Choronzon"], ["nachash", "Nachash"], ["cain", "Cain"], ["prometheus", "Prometheus"], ["ahriman", "Ahriman"], ["set", "Set"]] };
var OTM = { cfgAt: 0, cfg: null, rite: null, riteAt: 0, riteAsk: false, key: "otemple", base: -3600000, G: null, built: false, lite: false, t: 0, pt: 0,
mats: {}, geos: {}, solids: [], floors: [], ramps: [], spots: [], fx: [], secrets: [], flames: [], people: [], room: "", found: {}, myFn: null };
var OTK = null;
function otmCfg() {
if (!OTM.cfg || Date.now() - OTM.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("obsidian_temple") : null;
OTM.cfg = otmMerge(c);
OTM.cfgAt = Date.now();
}
return OTM.cfg;
}
function otmLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function otmKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function otmSigned() { return typeof signedIn === "function" && signedIn(); }
function otmAdult() { try {
return typeof ageAdult === "function" ? ageAdult() : false;
}
catch (e) {
return false;
} }
function otmEsc(s) { return (typeof esc === "function") ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function otmSay(h) { if (typeof setStatus === "function")
setStatus(h); }
var OTM_LS = "otm_progress_v1";
function otmProg() {
if (!OTM.prog) {
try {
OTM.prog = JSON.parse(localStorage.getItem(OTM_LS) || "{}") || {};
}
catch (e) {
OTM.prog = {};
}
}
var p = OTM.prog;
p.found = p.found || {};
p.read = p.read || {};
p.les = p.les || {};
return p;
}
function otmProgSave() { try {
localStorage.setItem(OTM_LS, JSON.stringify(OTM.prog || {}));
}
catch (e) { } }
function otmRiteFetch(force) {
if (!otmSigned() || typeof cityRpc !== "function")
return Promise.resolve(OTM.rite);
if (OTM.riteAsk || (!force && Date.now() - OTM.riteAt < 120000))
return Promise.resolve(OTM.rite);
OTM.riteAsk = true;
OTM.riteAt = Date.now();
return cityRpc("temple_my_rite", {}).then(function (d) { OTM.riteAsk = false; otmRiteSet(d); return OTM.rite; })
.catch(function () { OTM.riteAsk = false; return OTM.rite; });
}
function otmRiteSet(d) {
if (!d || !d.ok)
return;
OTM.rite = { coven: !!d.coven, oath: !!d.oath, seance: !!d.seance, priest: !!d.priest, adult: d.adult !== false,
locked: d.locked !== false, mayIn: d.may_in === undefined ? !!d.coven : !!d.may_in, ask: d.ask || null, waiting: +d.waiting || 0, known: true, v187: d.may_in !== undefined };
}
function otmRiteMark(what) {
var p = otmProg();
p[what] = Date.now();
otmProgSave();
if (!otmSigned() || typeof cityRpc !== "function")
return;
cityRpc("temple_rite_mark", { p_what: what }).then(function (d) { otmRiteSet(d); }).catch(function () { });
}
function otmCoven() { if (otmKeeper())
return true; return !!(OTM.rite && OTM.rite.coven); }
function otmPriestOk() { var p = otmCfg().priest; if (otmKeeper() || p === "all")
return true; if (p === "coven")
return otmCoven(); return false; }
function otmWingOn(k) { return otmKeeper() || otmCfg().wings[k] !== false; }
function otmMat(col, tex, o) { return __ZC(401, 1, this, arguments, new.target); }
function otmDeco() { var c = otmCfg(); return c.deco || otmDecoMerge(null); }
function otmDecoMat(key, part, mat) {
var d = otmDeco().rooms[key], h = d && d[part];
if (!h || !mat || !mat.color)
return mat;
var k = "deco|" + key + "|" + part + "|" + h + "|" + mat.uuid;
if (!OTM.mats[k]) {
var m = mat.clone();
m.color = new THREE.Color(h);
OTM.mats[k] = m;
}
return OTM.mats[k];
}
function otmDecoFlame(col, key) { var D = otmDeco(), d = key && D.rooms[key]; if (d && d.flame)
return parseInt(d.flame.slice(1), 16); if (D.flame)
return parseInt(D.flame.slice(1), 16); return col; }
function otmGlowM(col, op) { var k = "glow|" + col + "|" + (op || 1); if (!OTM.mats[k])
OTM.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); return OTM.mats[k]; }
function otmCanvasMat(key, w, h, draw, o) { return __ZC(401, 2, this, arguments, new.target); }
function otmP() { return (OTK && OTK.F) || OTM.G; }
function otmBox(w, h, d, mat, x, y, z, parent) {
var k = w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = OTM.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
OTM.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || otmP()).add(m);
return m;
}
function otmCyl(r, h, mat, x, y, z, parent, seg, r2) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r2 === undefined ? r : r2, h, seg || 14), mat); m.position.set(x, y, z); (parent || otmP()).add(m); return m; }
function otmSph(r, mat, x, y, z, parent, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 14, Math.max(6, (seg || 14) * 0.7 | 0)), mat); m.position.set(x, y, z); (parent || otmP()).add(m); return m; }
function otmPlane(w, h, mat, x, y, z, ry, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; (parent || otmP()).add(m); return m; }
function otmGroup(x, y, z, ry, parent) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; (parent || otmP()).add(g); return g; }
function otmSolid(x, z, hw, hd, b, h, rot) { var S = { x: x, z: z, hw: hw, hd: hd, b: b || 0, h: h || 3, rot: rot || 0 }; OTK.solids.push(S); return S; }
function otmRound(x, z, r, b, h) { var S = { x: x, z: z, r: r, b: b || 0, h: h || 3 }; OTK.solids.push(S); return S; }
function otmFloor(x0, z0, x1, z1, y) { OTK.floors.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y }); }
function otmRampAt(x0, z0, x1, z1, axis, a0, y0, a1, y1) { OTK.ramps.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), axis: axis, a0: a0, y0: y0, a1: a1, y1: y1 }); }
function otmGroundIn(K, x, z, feet) { return __ZC(401, 3, this, arguments, new.target); }
function otmHoldVertical(K, V) { return __ZC(401, 4, this, arguments, new.target); }
function otmSpot(x, z, r, name, verb, fn, o) { o = o || {}; var S = { x: x, z: z, r: r, y: o.y || 0, name: name, verb: verb, fn: fn, when: o.when || null }; OTK.spots.push(S); return S; }
function otmWall(dir, a, b, c, y, h, t, mat, opens, o) { return __ZC(401, 5, this, arguments, new.target); }
function otmRoom(R) { return __ZC(401, 6, this, arguments, new.target); }
function otmRoomAt(K, x, z, feet) {
var best = null;
(K.rooms || []).forEach(function (r) { if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1 && feet >= r.y - 1 && feet <= r.y + r.h && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r; });
return best;
}
function otmSign(lines, w, h, bg, fg, x, y, z, ry, parent) {
if (typeof wSign !== "function")
return null;
var s = wSign(lines, w, h, bg, fg);
s.position.set(x, y, z);
s.rotation.y = ry || 0;
(parent || otmP()).add(s);
s.userData.keep = 1;
return s;
}
function otmFlame(x, y, z, s, col, parent) { return __ZC(401, 7, this, arguments, new.target); }
function otmCandle(x, y, z, s, parent, col) {
s = s || 1;
var P = parent || otmP();
otmCyl(0.035 * s, 0.26 * s, otmMat(col || 0xEEE6D4, null), x, y + 0.13 * s, z, P, 8);
return otmFlame(x, y + 0.26 * s, z, s, 0xFFB050, P);
}
function otmCandelabrum(x, y, z, parent) { return __ZC(401, 8, this, arguments, new.target); }
function otmFlamesTick(dt, t, list) { return __ZC(401, 9, this, arguments, new.target); }
function otmSecret(o) { return __ZC(401, 10, this, arguments, new.target); }
function otmSecretTry(S) { return __ZC(401, 11, this, arguments, new.target); }
function otmSecretsTick(dt, list) { return __ZC(401, 12, this, arguments, new.target); }
function otmTapestryArt(id) { return __ZC(401, 13, this, arguments, new.target); }
var OTM_RUNE_STROKES = [
[[.3, 0, .3, 1], [.3, .35, .75, .1], [.3, .6, .75, .35]],
[[.3, 1, .3, 0], [.3, 0, .7, .35], [.7, .35, .7, 1]],
[[.3, 0, .3, 1], [.3, .3, .65, .5], [.65, .5, .3, .7]],
[[.3, 0, .3, 1], [.3, 0, .7, .25], [.3, .3, .7, .55]],
[[.3, 0, .3, 1], [.3, 0, .7, .25], [.7, .25, .3, .5], [.3, .5, .7, 1]],
[[.7, .2, .3, .5], [.3, .5, .7, .8]],
[[.2, 0, .8, 1], [.8, 0, .2, 1]],
[[.3, 0, .3, 1], [.3, 0, .7, .25], [.7, .25, .3, .5]],
[[.25, 0, .25, 1], [.75, 0, .75, 1], [.25, .35, .75, .65]],
[[.5, 0, .5, 1], [.3, .35, .7, .65]],
[[.5, 0, .5, 1]],
[[.4, .1, .15, .35], [.15, .35, .4, .6], [.6, .4, .85, .65], [.85, .65, .6, .9]],
[[.5, 0, .5, 1], [.5, 0, .75, .2], [.5, 1, .25, .8]],
[[.3, 0, .3, 1], [.3, 0, .6, .3], [.6, .3, .85, .1], [.3, 1, .6, .7], [.6, .7, .85, .9]],
[[.5, 0, .5, 1], [.5, .45, .2, .1], [.5, .45, .8, .1]],
[[.65, 0, .3, .35], [.3, .35, .7, .65], [.7, .65, .35, 1]],
[[.5, 0, .5, 1], [.5, 0, .2, .3], [.5, 0, .8, .3]],
[[.3, 0, .3, 1], [.3, 0, .7, .25], [.7, .25, .3, .5], [.3, .5, .7, .75], [.7, .75, .3, 1]],
[[.2, 0, .2, 1], [.8, 0, .8, 1], [.2, 0, .5, .3], [.5, .3, .8, 0]],
[[.2, 0, .2, 1], [.8, 0, .8, 1], [.2, 0, .8, .45], [.8, 0, .2, .45]],
[[.35, 0, .35, 1], [.35, 0, .7, .3]],
[[.5, .2, .8, .5], [.8, .5, .5, .8], [.5, .8, .2, .5], [.2, .5, .5, .2]],
[[.15, 0, .15, 1], [.85, 0, .85, 1], [.15, 0, .85, 1], [.85, 0, .15, 1]],
[[.5, 0, .8, .35], [.8, .35, .2, 1], [.5, 0, .2, .35], [.2, .35, .8, 1]]
];
var OTM_TRIGRAMS = [[1, 1, 1], [0, 1, 1], [1, 0, 1], [0, 0, 1], [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0]];
var OTM_SPELLFOR = { greek: ["greek"], egyptian: ["hiero"], norse: ["runes"], celtic: ["ogham"], chinese: ["trigram"], dragons: ["runes", "celestial"], lhp: ["seals", "hebrew"],
yoruba: ["celestial"], narthex: ["celestial", "runes"], hall: ["seals", "celestial", "hebrew", "runes"], library: ["greek", "hebrew", "hiero", "runes"],
ballroom: ["celestial"], seance: ["seals", "hebrew"], office: ["seals"], study: ["hebrew", "greek"], apartment: ["celestial"], bath: ["ogham", "celestial"],
"pal-bael": ["seals"], "pal-paimon": ["hebrew"], "pal-beleth": ["celestial"], "pal-purson": ["hiero"], "pal-asmoday": ["greek"], "pal-vine": ["runes"],
"pal-balam": ["seals", "celestial"], "pal-zagan": ["celestial", "hebrew"], "pal-belial": ["greek", "seals"], "pal-vassago": ["hebrew"], "pal-sitri": ["celestial"],
"pal-ipos": ["greek"], "pal-gaap": ["trigram", "celestial"], "pal-stolas": ["celestial"], "pal-orobas": ["runes"], "pal-seere": ["ogham", "celestial"] };
function otmSpellMat(kind) { return __ZC(401, 14, this, arguments, new.target); }
function otmSpell(R, D, sk, y, h, t) { return __ZC(401, 15, this, arguments, new.target); }
function otmSpellTick(t) {
var M = OTM.spellMats;
if (!M)
return;
var g = otmDeco().spell.glow, o = g * (0.86 + 0.14 * Math.sin(t * Math.PI * 2 / 12));
for (var k in M)
M[k].opacity = o;
}
var OTM_SP = { data: null, ask: null };
function otmSpiritsLoad() { return __ZC(401, 16, this, arguments, new.target); }
function otmVoice(key) {
if (typeof OTM_VOICES !== "undefined" && OTM_VOICES[key])
return OTM_VOICES[key];
var d = OTM_SP.data && OTM_SP.data.s;
return d ? d[key] || null : null;
}
var OTM_VOICES = {};
function otmVoiceName(key) {
var v = otmVoice(key);
if (v)
return v.n;
var id = key.split(":")[1];
if (typeof DEITY !== "undefined" && DEITY[id])
return DEITY[id].name;
var p = key.split(":")[0];
var r = (OTM_ROSTER[p] || []).filter(function (x) { return x[0] === id; })[0];
return r ? r[1] : id;
}
function otmSystem(c) { return __ZC(401, 17, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) { if (c && c.otm) {
try {
return otmSystem(c);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] voice", e);
}
} return cs.apply(this, arguments); };
})();
function otmTalk(key, where, fig) { return __ZC(401, 18, this, arguments, new.target); }
function otmGodFigure(id, x, y, z, ry, s, parent, big) { return __ZC(401, 19, this, arguments, new.target); }
var OTM_DRAGON_KEY = { ddraiggoch: "ydraiggoch" };
function otmDragonFigure(key, big) { return __ZC(401, 20, this, arguments, new.target); }
var OTM_C = { ob: 0x0E0C12, basalt: 0x26222A, trim: 0xB8923A, silver: 0xD8DCF0, velvet: 0x3A0E1E, violet: 0x2A1A40 };
function otmM(k) { return __ZC(401, 21, this, arguments, new.target); }
function otmPillar(x, z, y, h, r, parent) { return __ZC(401, 22, this, arguments, new.target); }
function otmMoonDisc(x, y, z, r, ry, parent) { return __ZC(401, 23, this, arguments, new.target); }
function otmMoonWindow(x, y, z, ry, k, parent) { return __ZC(401, 24, this, arguments, new.target); }
function otmPew(x, z, w, parent) {
var P = parent || otmP(), m = otmM("pew");
otmBox(w, 0.08, 0.5, m, x, 0.48, z, P);
otmBox(w, 0.62, 0.07, m, x, 0.82, z + 0.26, P);
otmBox(0.08, 0.95, 0.6, m, x - w / 2, 0.48, z, P);
otmBox(0.08, 0.95, 0.6, m, x + w / 2, 0.48, z, P);
otmBox(w, 0.05, 0.18, m, x, 0.85, z + 0.38, P);
otmSolid(x, z + 0.05, w / 2, 0.36, 0, 1.0);
}
function otmNarthex() { return __ZC(401, 25, this, arguments, new.target); }
function otmHall() { return __ZC(401, 26, this, arguments, new.target); }
function otmAltarCandles() { return __ZC(401, 27, this, arguments, new.target); }
function otmGalleries() { return __ZC(401, 28, this, arguments, new.target); }
function otmShellOut() { return __ZC(401, 29, this, arguments, new.target); }
var OTM_WBOX = {
greek: { x0: 14, z0: -12, x1: 32, z1: 6, door: "s", at: 23, h: 7 }, egyptian: { x0: 32, z0: -12, x1: 50, z1: 6, door: "s", at: 41, h: 7 },
norse: { x0: 14, z0: 14, x1: 34, z1: 32, door: "n", at: 24, h: 8 }, dragons: { x0: 34, z0: 14, x1: 54, z1: 34, door: "w", at: 23, h: 9 },
celtic: { x0: -32, z0: -12, x1: -14, z1: 6, door: "s", at: -23, h: 8 }, yoruba: { x0: -50, z0: -12, x1: -32, z1: 6, door: "s", at: -41, h: 7 },
chinese: { x0: -34, z0: 14, x1: -14, z1: 32, door: "n", at: -24, h: 8 }, lhp: { x0: -56, z0: 34, x1: -34, z1: 50, door: "n", at: -45, h: 8 }
};
var OTM_WLOOK = {
greek: { floor: [0xE4E0D6, "marble"], wall: [0xEAE4D8, "marble"], ceil: [0x2A3A5A, "plaster"], plinth: 0xF0ECE4 },
egyptian: { floor: [0xC8A870, "sand"], wall: [0xD4B47C, "stone"], ceil: [0x1A2A5A, "plaster"], plinth: 0xC8A060 },
norse: { floor: [0x5A4630, "wood"], wall: [0x4A3624, "wood"], ceil: [0x2A1E14, "wood"], plinth: 0x3A3A38 },
celtic: { floor: [0x3A4A2A, "grass"], wall: [0x4A4840, "stone"], ceil: [0x141E14, "plaster"], plinth: 0x6A6860 },
yoruba: { floor: [0x8A4A2A, "earth"], wall: [0xA0582E, "plaster"], ceil: [0x3A2414, "wood"], plinth: 0x5A3418 },
chinese: { floor: [0x3A2A22, "wood"], wall: [0x9A1A14, "plaster"], ceil: [0x2A0E0A, "wood"], plinth: 0x1A1A1A },
dragons: { floor: [0x2A2420, "stone"], wall: [0x302824, "stone"], ceil: [0x181412, "stone"], plinth: 0x4A3A2A },
lhp: { floor: [0x0A0608, "marble"], wall: [0x1A0A10, "stone"], ceil: [0x08040A, "plaster"], plinth: 0x0E0A0E }
};
function otmWingRow(k) { for (var i = 0; i < OTM_WINGS.length; i++)
if (OTM_WINGS[i][0] === k)
return OTM_WINGS[i]; return null; }
function otmWing(k) { return __ZC(401, 30, this, arguments, new.target); }
function otmWingAlong(W, along, side, a0, a1, t) { return __ZC(401, 31, this, arguments, new.target); }
function otmWingGods(W) { return __ZC(401, 32, this, arguments, new.target); }
function otmFigsTick() { return __ZC(401, 33, this, arguments, new.target); }
function otmWingAltar(k) { return __ZC(401, 34, this, arguments, new.target); }
var OTM_WDRESS = {};
OTM_WDRESS.greek = function (W) { return __ZC(401, 35, this, arguments, new.target); };
OTM_WDRESS.egyptian = function (W) { return __ZC(401, 36, this, arguments, new.target); };
OTM_WDRESS.norse = function (W) { return __ZC(401, 37, this, arguments, new.target); };
OTM_WDRESS.celtic = function (W) { return __ZC(401, 38, this, arguments, new.target); };
OTM_WDRESS.yoruba = function (W) { return __ZC(401, 39, this, arguments, new.target); };
OTM_WDRESS.chinese = function (W) { return __ZC(401, 40, this, arguments, new.target); };
OTM_WDRESS.dragons = function (W) { return __ZC(401, 41, this, arguments, new.target); };
OTM_WDRESS.lhp = function (W) { return __ZC(401, 42, this, arguments, new.target); };
var OTM_FINISH = {
oak: { wain: [0x2E1C10, "wood"], panel: [0x3A2414, "wood"], rail: "gold", corn: [0x3A2414, "wood"], beam: [0x4A2E1A, "wood"], boss: "gold" },
marble: { wain: [0x121016, "marble"], panel: [0x221E28, "marble"], rail: "gold", corn: [0x3A3640, "marble"], beam: [0x34303C, "marble"], boss: "gold" },
ebony: { wain: [0x140E0C, "wood"], panel: [0x1E1410, "wood"], rail: "gold", corn: [0x2A1C14, "wood"], beam: [0x2E1E14, "wood"], boss: "gold" },
stone: { wain: null, panel: null, rail: null, corn: [0x3A3434, "stone"], beam: [0x2E2A2A, "stone"], boss: "iron" }
};
var OTM_DAMASK = { crimson: ["#3A0A14", "#5A1A26"], violet: ["#1E1030", "#34204E"], midnight: ["#0E1226", "#1E2848"], emerald: ["#0A2018", "#16382A"], ink: ["#120E14", "#221A24"], gold: ["#3A2A12", "#5A4420"] };
function otmDamaskMat(k) { return __ZC(401, 43, this, arguments, new.target); }
var OTM_RUGS = { crimson: ["#5A0E18", "#1A0A10", "#C8A050", "#E8D8B0", "#1E2A4A"], midnight: ["#14183A", "#08080E", "#B8923A", "#D8D0E8", "#6A1A2A"],
violet: ["#2E1840", "#0E0A14", "#C8A050", "#E0D0F0", "#5A1A2A"], emerald: ["#123A2A", "#0A140E", "#C8A050", "#E8E0C0", "#5A1A1A"], ink: ["#1A1418", "#0A0808", "#8A6A3A", "#C8B890", "#4A1A1A"] };
function otmRugMat(k) { return __ZC(401, 44, this, arguments, new.target); }
function otmPaintMat(kind, seed) { return __ZC(401, 45, this, arguments, new.target); }
function otmPainting(kind, seed, x, y, z, ry, w, h, parent) { return __ZC(401, 46, this, arguments, new.target); }
function otmSconce(x, y, z, ry, parent) { return __ZC(401, 47, this, arguments, new.target); }
function otmChandelier(x, y, z, r, top, parent) { return __ZC(401, 48, this, arguments, new.target); }
function otmWallRuns(R, band, extra) { return __ZC(401, 49, this, arguments, new.target); }
function otmOnWall(run, a0, a1, y0, hh, off, d, mat) {
var len = a1 - a0, mid = (a0 + a1) / 2, k = run.c + run.n * (off + d / 2);
return run.axis === "x" ? otmBox(len, hh, d, mat, mid, y0 + hh / 2, k) : otmBox(d, hh, len, mat, k, y0 + hh / 2, mid);
}
function otmWallPt(run, a, off) { return run.axis === "x" ? { x: a, z: run.c + run.n * off } : { x: run.c + run.n * off, z: a }; }
function otmGrand(R, G) { return __ZC(401, 50, this, arguments, new.target); }
var OTM_GRAND = {
narthex: { style: "marble", pil: 3.6, coffer: 2.5, sconce: 2.6, avoidSc: { s: [[-4, 4]], n: [[-4.2, 4.2]] } },
hall: { style: "marble", wain: 1.2, coffer: 3.4, chand: [[-7, -12, 1.5, 3.6], [7, -24, 1.5, 3.6], [7, -12, 1.5, 3.6], [-7, -24, 1.5, 3.6]] },
egal: { style: "marble", coffer: 2.5, sconce: 4.5, pics: [["s", 14.5, 3.0, 1.4, 1.0, "lake", 1], ["s", 30, 3.0, 1.4, 1.0, "portrait", 0], ["s", 37, 3.0, 1.4, 1.0, "winter", 2], ["s", 48, 3.0, 1.4, 1.0, "portrait", 2], ["s", 55, 3.0, 1.4, 1.0, "sea", 1]] },
wgal: { style: "marble", coffer: 2.5, sconce: 4.5, pics: [["s", -14.5, 3.0, 1.4, 1.0, "mountains", 1], ["s", -30, 3.0, 1.4, 1.0, "portrait", 1], ["s", -35.5, 3.0, 1.4, 1.0, "temple", 0], ["s", -52, 3.0, 1.4, 1.0, "portrait", 3], ["s", -56, 3.0, 1.4, 1.0, "stars", 2]] },
library: { style: "oak", wain: 0, coffer: 2.4, rugs: [[-45, 24, 8, 10, "crimson"]], chand: [[-45, 20.5, 1.1], [-45, 28, 1.1]] },
ballroom: { style: "marble", wain: 0, coffer: 3.2, pil: 0 },
seance: { style: "ebony", paper: "crimson", coffer: 0, rugs: [[19, -51, 6, 6, "ink"]], pics: [["n", 17, 2.7, 0.8, 1.0, "portrait", 1], ["n", 21, 2.7, 0.8, 1.0, "portrait", 2], ["e", -48, 2.7, 0.8, 1.0, "portrait", 3]] },
vestry: { style: "oak", paper: "midnight", coffer: 2.4, rugs: [[20, -35, 5, 4, "midnight"]], sconce: 3, avoidSc: { w: [[-37, -33]], e: [[-37, -33]] }, pics: [["s", 17, 2.9, 1.2, 0.9, "temple", 1]] },
bath: { style: "marble", wain: 1.2, pil: 3.2, coffer: 0, sconce: 3.2, avoidSc: { w: [[-37, -33]] } },
office: { style: "oak", paper: "crimson", coffer: 2.2, rugs: [[-22, -20, 7, 5, "crimson"]], chand: [[-22.4, -20, 0.9, 2.1]] },
study: { style: "ebony", paper: "midnight", coffer: 2.2, rugs: [[-23, -32, 6, 4.6, "midnight"]], chand: [[-23, -32, 0.8, 2.1]] },
apartment: { style: "ebony", paper: "violet", coffer: 2.0, rugs: [[-38.5, -31.5, 5, 4, "violet"]], chand: [[-38.5, -31.5, 0.75, 2.1]] },
crypt: { style: "stone", coffer: 2.6, cornice: 1 }, undercroft: { style: "stone", coffer: 2.6 }, stores: { style: "stone", coffer: 2.6 }
};
var OTM_WYRM_EAST = { aoguang: 1, yinglong: 1, ryujin: 1 };
var OTM_WYRM_ICONS = { ddraiggoch: "color:red size:3 wings legs" };
function otmWyrmIcons(id) { return __ZC(401, 51, this, arguments, new.target); }
function otmWyrmIs(id) { var k = (typeof OTM_DRAGON_KEY !== "undefined" && OTM_DRAGON_KEY[id]) || id; return !!((typeof DEITY !== "undefined" && DEITY[k] && DEITY[k].dragon) || OTM_WYRM_ICONS[id]); }
function otmShade(c, k) { var C = new THREE.Color(c); if (k > 0)
C.lerp(new THREE.Color(0xFFFFFF), k);
else
C.multiplyScalar(1 + k); return C; }
function otmScaleTex() { return __ZC(401, 52, this, arguments, new.target); }
function otmWyrmMat(o) { return __ZC(401, 53, this, arguments, new.target); }
function otmTube(pts, radii, col, belly, parent, o) { return __ZC(401, 54, this, arguments, new.target); }
function otmTubeAt(m, u) {
var cv = m.userData.curve, R = m.userData.radii, n = R.length, t = cv.getUtoTmapping(u), f = t * (n - 1), a = Math.min(n - 2, Math.floor(f));
return { p: cv.getPointAt(u), t: cv.getTangentAt(u), r: R[a] + (R[a + 1] - R[a]) * (f - a) };
}
function otmLimb(a, b, r1, r2, mat, parent, seg) { return __ZC(401, 55, this, arguments, new.target); }
function otmClaws(x, y, z, s, ry, horn, parent) {
for (var c = -1; c <= 1; c++) {
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.028 * s, 0.13 * s, 5), horn);
cl.position.set(x + c * 0.055 * s, y, z + 0.08 * s);
cl.rotation.x = Math.PI / 2 + 0.35;
cl.rotation.z = c * 0.15;
parent.add(cl);
}
}
function otmWyrmHead(o, col, parent, east, hood, feath, eyeCol) { return __ZC(401, 56, this, arguments, new.target); }
function otmWyrmWing(root, sd, col, s, parent, raise) { return __ZC(401, 57, this, arguments, new.target); }
function otmWyrm(id, x, y, z, ry, parent) { return __ZC(401, 58, this, arguments, new.target); }
function otmWyrmRock(x, z, ry) { return __ZC(401, 59, this, arguments, new.target); }
function otmWyrmTick(t) { return __ZC(401, 60, this, arguments, new.target); }
var OTM_BOOKS = [
["bulfinch", "The Age of Fable", "Thomas Bulfinch, 1855 (the 1867 edition, with the Age of Chivalry)", "The book most English readers met the Greek and Roman myths in: Prometheus, Persephone, Orpheus, the Argonauts and Troy, retold plainly for 'the reader of English literature'. He also gathered the Norse and the Druids at the back."],
["budge", "The Book of the Dead", "E. A. Wallis Budge, 1895 (the Papyrus of Ani)", "The Egyptians called it the Spells for Going Forth by Day. Ani's papyrus, written about 1250 BC, shows his heart weighed against the feather of Ma'at before Osiris, with Thoth writing down the verdict and Ammit waiting."],
["edda", "The Poetic Edda", "Henry Adams Bellows, 1923", "The old Norse poems kept in the Codex Regius, written down in Iceland about 1270: the Voluspa (the seeress's prophecy of the world's making and its end at Ragnarok), Odin's Havamal, and Thor's quarrels."],
["gregory", "Gods and Fighting Men", "Lady Augusta Gregory, 1904", "The Irish tales of the Tuatha De Danann (the Dagda, Lugh, Brigid, the Morrigan), their coming to Ireland, the battles of Mag Tuired, and how they went into the hollow hills when the sons of Mil came."],
["frazer", "The Golden Bough", "James George Frazer, 1890", "A great survey of magic and religion across the world, starting from the priest-king of the grove of Diana at Nemi. Much of its theory has not lasted, but it changed how the twentieth century read myth."],
["legge", "The Sacred Books of China", "James Legge, 1879 to 1891", "Legge's translations of the Confucian classics and the Tao Te Ching for the Sacred Books of the East: the Book of Changes, the Book of Rites, and Laozi's eighty-one short chapters on the Way."],
["dante", "The Divine Comedy", "Dante Alighieri, about 1308 to 1321 (Longfellow's translation, 1867)", "Dante's journey through Hell, Purgatory and Paradise, guided by Virgil and then by Beatrice. It opens: 'Midway upon the journey of our life / I found myself within a forest dark, / For the straightforward pathway had been lost.'"],
["goetia", "The Lesser Key of Solomon: the Goetia", "S. L. MacGregor Mathers, edited by Aleister Crowley, 1904", "A seventeenth-century grimoire, the first book of the Lemegeton, listing seventy-two spirits with their ranks, their legions and what each is said to teach. It is a book of history and belief, not a book of instructions to follow."],
["ellis", "The Yoruba-Speaking Peoples", "A. B. Ellis, 1894", "An early English account of Yoruba religion: Olorun, Obatala, Sango, Ogun, Esu, Ifa divination and the babalawo. Read it alongside the living tradition, which tells its own story better than any outsider."],
["leland", "Aradia, or the Gospel of the Witches", "Charles Godfrey Leland, 1899", "Leland said a Tuscan woman named Maddalena gave him the gospel of the witches of Italy, who worship Diana and her daughter Aradia. Whether it is folklore or invention is still argued; it shaped modern witchcraft all the same."]
];
function otmLibrary() { return __ZC(401, 61, this, arguments, new.target); }
function otmBook(B) {
var p = otmProg();
p.read[B[0]] = Date.now();
otmProgSave();
worldCard(worldFacts("📖 " + B[1], B[2], [], [B[3], "This book is in the public domain: anyone may read it, copy it and share it.", "You have read " + Object.keys(p.read).length + " of the " + OTM_BOOKS.length + " books here."]), {});
}
function otmOathAltar(R) { return __ZC(401, 62, this, arguments, new.target); }
function otmOathBtns(fns) {
var p = otmProg(), did = p.oath || (OTM.rite && OTM.rite.oath);
fns.oath = function () { worldCard(null); otmOathCard(); };
return worldBtn("oath", did ? "🜏 You have sworn at this altar" : "🜏 The oath at the black altar", did ? "read it again" : "walk the Left-Hand Path, and say so here");
}
function otmOathCard() { return __ZC(401, 63, this, arguments, new.target); }
function otmBallroom() { return __ZC(401, 64, this, arguments, new.target); }
function otmChandTick(t) { return __ZC(401, 65, this, arguments, new.target); }
function otmSeance() { return __ZC(401, 66, this, arguments, new.target); }
function otmSeanceCard() { return __ZC(401, 67, this, arguments, new.target); }
function otmLedger() { return __ZC(401, 68, this, arguments, new.target); }
function otmMoonPhase(d) { var syn = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14), age = (((d - ref) / 86400000) % syn + syn) % syn; return { age: age, frac: age / syn }; }
function otmMoonCard() { return __ZC(401, 69, this, arguments, new.target); }
function otmVestryBath() { return __ZC(401, 70, this, arguments, new.target); }
function otmUndercroft() { return __ZC(401, 71, this, arguments, new.target); }
var OTM_VINTAGE_KEY = [1717, 1781, 1801];
function otmRackYears(s, r) {
var y = [], base = 1690 + ((s * 7 + r * 13) % 11) * 9;
for (var k = 0; k < 6; k++) {
var v = base + k * ((s + r) % 3 + 5) + ((k * 11 + r) % 7);
if (OTM_VINTAGE_KEY.indexOf(v) >= 0)
v += 2;
y.push(v);
}
if (s === 0 && r === 0)
y[3] = 1717;
if (s === 1 && r === 2)
y[1] = 1781;
if (s === 0 && r === 2)
y[4] = 1801;
return y;
}
var OTM_WINES = ["a dark red, sealed in black wax", "a pale gold, the label gone", "a red near to black, the cork wired down", "a sweet wine, thick in the glass", "a dry white, dust to the shoulders", "a ruby port, its seal stamped with a crescent"];
var OTM_BOTTLES = [{ glass: "#1C2414", hi: "#5A6A3A", sh: 0, cap: "#0A0A0A", wax: 1, label: "#D8CBA4", ink: "#5A1A14" },
{ glass: "#6A4A12", hi: "#E8C060", sh: 2, cap: "#8A6A2A", label: null },
{ glass: "#14180E", hi: "#4A5232", sh: 1, cap: "#3A1214", wire: 1, label: "#E2D8BC", ink: "#2A1A10" },
{ glass: "#5A3A0A", hi: "#D8A040", sh: 3, cap: "#B88A3A", label: "#EDE2C4", ink: "#7A4A10" },
{ glass: "#2A3A1E", hi: "#8AA06A", sh: 2, cap: "#C8B890", label: "#CFC6A8", ink: "#3A3A20", dust: 1 },
{ glass: "#160C0C", hi: "#5A2A2A", sh: 4, cap: "#7A0E14", wax: 1, moon: 1, label: "#C8B48A", ink: "#4A0E10" }];
function otmBottleSvg(k, id) { return __ZC(401, 72, this, arguments, new.target); }
function otmRackCard(s, r) { return __ZC(401, 73, this, arguments, new.target); }
function otmTurnBottle(v, el, i) { return __ZC(401, 74, this, arguments, new.target); }
function otmGlamour(Wc) {
var U = Wc.y, x = 7, z = Wc.z0, K = OTK;
var m = otmMat(0x3A2E26, "brick");
var wall = otmBox(2.0, 2.8, 0.4, m, x, U + 1.4, z);
wall.userData.keep = 1;
var sol = otmSolid(x, z, 1.0, 0.25, U, 2.8);
OTM.glam = { wall: wall, sol: sol, K: K, U: U, open: false, amt: 0, on: false };
}
function otmGlamourTick(t, dt) { return __ZC(401, 75, this, arguments, new.target); }
var OTM_WINE_GLASS = [0x1C2A14, 0x2A1C0E, 0x101410, 0x243018, 0x3A2410, 0x161210, 0x6A4A12];
var OTM_WINE_CAP = [0x0A0A0A, 0x6A0E14, 0xB8923A, 0x6A6A70, 0x3A1A3A, 0xC8B890, 0x7A0E14, 0x1A1A1A];
var OTM_RACK = { fx: 0.47, dx: 0.42, cols: 17, cw: 0.155, rows: 13, rh: 0.19, y0: 0.32 };
function otmBottleGeo(seg) { return __ZC(401, 76, this, arguments, new.target); }
function otmWineMat(col, e) { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF }); m.emissive = new THREE.Color(col || 0x000000); m.emissiveIntensity = e || 0.0; return m; }
function otmWineRacks(Wc, U, lite) { return __ZC(401, 77, this, arguments, new.target); }
function otmWineDust(B, d) { var c = new THREE.Color(B.glass); return d ? c.lerp(new THREE.Color(0x8A8276), 0.45 * d).getHex() : c.getHex(); }
var OTM_WQ = null;
function otmWineSet(M, i, B, a, out) { return __ZC(401, 78, this, arguments, new.target); }
function otmWineSpin(i) {
var W = OTM.wine;
if (!W || !W.dated[i])
return;
W.spin = W.spin.filter(function (x) { return x.i !== i; });
W.spin.push({ i: i, t: 0 });
var B = W.dated[i];
W.mB.setColorAt(i, new THREE.Color(otmWineDust(B, 0)));
W.mB.instanceColor.needsUpdate = true;
}
function otmWineTick(dt) { return __ZC(401, 79, this, arguments, new.target); }
function otmWineAim(L, feet) { return __ZC(401, 80, this, arguments, new.target); }
function otmWixOn(k) { return otmKeeper() || otmCfg().wix[k] !== false; }
function otmWixShut(k) { var r = OTM_WIX.filter(function (w) { return w[0] === k; })[0]; otmSay("🌙 <b>" + otmEsc(r ? r[1] : "This") + " is resting for now.</b> The Keeper has closed it for a while."); }
function otmWixRooms() { return __ZC(401, 81, this, arguments, new.target); }
function otmWixMirror() { return __ZC(401, 82, this, arguments, new.target); }
var OTM_ZOD = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
function otmWixAstro() { return __ZC(401, 83, this, arguments, new.target); }
function otmWixDivine() { return __ZC(401, 84, this, arguments, new.target); }
function otmWixKids() { return __ZC(401, 85, this, arguments, new.target); }
function otmKidLantern() { return __ZC(401, 86, this, arguments, new.target); }
var OTM_INGS = [
["sage", "Silverleaf Sage", "Herb", "#39ff14", "chop", 2, 0, "Calming, Clarity", "Grown at the temple's north wall, its underside catches moonlight like a coin. Elders chew a single leaf before difficult conversations."],
["moon", "Moonpetal", "Flower", "#d000ff", "pluck", 1, 0, "Lunar, Insight", "Blooms only between dusk and the first bell of night, then closes tight till the next dark. Pickers work by touch alone."],
["water", "Spring Water", "Liquid", "#00ffcc", "steep", 2, 0, "Base, Neutral", "Drawn from the well beneath the temple floor, said to have never once run dry or run foul. Left briefly under open sky before use."],
["mugwort", "Mugwort", "Herb", "#00ff66", "chop", 2, 0, "Visions, Warding", "Burned in doorways before a working, worn in the hem of a traveling cloak. Bitter enough to wake a dreamer mid-dream."],
["raven", "Raven Feather", "Creature", "#a68fc2", "pluck", 1, 0, "Omen, Binding", "Never taken by force, only gathered from beneath the roost after the bird has moulted of its own will."],
["mandrake", "Mandrake Root", "Root", "#8a6a45", "grind", 4, 0, "Vitality, Grounding", "Shaped uncannily like a small, twisted person. Old instruction says to tie the stem to a dog's collar and let the dog do the pulling, then grind it well."],
["dragon", "Dragon's Blood Resin", "Resin", "#9900ff", "grind", 2, 0, "Fire, Courage", "Not from any dragon. The name is older than the argument about where it truly comes from. Burns bright red and smells of amber."],
["wolf", "Wolfsbane", "Flower", "#b300ff", "chop", 3, 1, "Transformation, Poison", "Every part of this plant is meant to be treated with respect. Gloves on, always, and never taste it to check."],
["chamomile", "Chamomile", "Herb", "#39ff14", "steep", 2, 0, "Peace, Rest", "The gentlest herb in the cabinet. A pinch in warm water has ended more sleepless nights than any working of magic."],
["honeycomb", "Honeycomb", "Sweet", "#d000ff", "steep", 2, 0, "Binding, Sweetness", "Kept in a jar on the sunniest shelf. Softened near a low flame until it turns to liquid gold."],
["blacksalt", "Black Salt", "Mineral", "#3a2752", "grind", 2, 0, "Warding, Banishing", "Made by burning ordinary salt with ash and iron shavings until it goes the colour of a moonless night."],
["ironfilings", "Iron Filings", "Mineral", "#00ffcc", "pluck", 1, 0, "Grounding, Protection", "Swept from the temple forge floor. Fae folk are said to want nothing to do with it, and neither does rust."],
["juniper", "Juniper Berries", "Berry", "#00ff66", "chop", 2, 0, "Purification", "Sharp and resinous, closer to a spice than a fruit. Burned in the temple censers on cleansing days."],
["crowsfoot", "Crow's Foot", "Herb", "#39ff14", "pluck", 1, 0, "Luck, Fortune", "Named for the shape of its five-fingered leaf. Tucked into a pocket before a gamble, a journey, or a difficult ask."],
["rosequartz", "Rose Quartz Dust", "Mineral", "#d000ff", "grind", 3, 0, "Healing, Affection", "Ground fine between two stones until it catches the light like sugar. Warms slightly in a closed hand."],
["owlpellet", "Owl Pellet", "Creature", "#a68fc2", "chop", 2, 0, "Wisdom, Insight", "Not for the squeamish, but the old texts insist on it. Whatever the owl could not use, the brew apparently can."],
["moonstone", "Powdered Moonstone", "Mineral", "#00ffcc", "steep", 4, 0, "Divination, Foresight", "A whole stone will do nothing at all. It must be submerged in moonlit water until it hums before its pull can be released."],
["salamander", "Salamander Ash", "Creature", "#39ff14", "pluck", 1, 0, "Fire Resistance, Endurance", "Collected, never harmed for. The creatures shed a fine ash naturally near warm stones, cool to the touch despite its name."],
["belladonna", "Belladonna Berries", "Berry", "#9900ff", "chop", 4, 1, "Deep Sleep", "Deceptively sweet-looking, genuinely dangerous. This cabinet's oldest rule: never left unlabeled, never left unlocked."],
["nightcap", "Nightcap Mushroom", "Fungus", "#b300ff", "chop", 3, 1, "Dreaming, Sedation", "Grows only in the temple's lightless cellar. Handle by the stem, the cap leaves a stain that doesn't wash out easily."],
["hawthorn", "Hawthorn Berries", "Berry", "#00ff66", "chop", 2, 0, "Protection, Heart", "Picked from the hedge that borders the temple grounds, said to have grown from a walking stick left too long in one place."],
["snakeskin", "Snake Skin", "Creature", "#39ff14", "chop", 3, 0, "Renewal, Letting Go", "Shed whole and left behind, taken as a gift rather than a hunt. Cut into strips before it's brittle enough to crumble."],
["phoenixdown", "Phoenix Down", "Creature", "#d000ff", "pluck", 2, 0, "Rebirth, Vitality", "Molted, never plucked by force. The temple's aviary keeper collects only what falls on its own after a molting flare."],
["basilisk", "Basilisk Scale", "Creature", "#00ffcc", "grind", 3, 1, "Petrification Ward, Potency", "Ground carefully, and never looked at directly during the work. An old habit, and an older warning."],
["mothwing", "Moth Wing Dust", "Creature", "#a68fc2", "steep", 3, 0, "Dreaming, Subtlety", "Collected from moths drawn to the temple's night-candles, wings brushed clean without harming them."],
["gold", "Gold (Au)", "Metal", "#39ff14", "melt", 3, 0, "Radiance, Vitality", "Never tarnishes and never lies, the old texts say. Melts slowly, and only for someone patient enough to wait it out. Correspondent metal of the Sun."],
["silver", "Silver (Ag)", "Metal", "#00ffcc", "melt", 3, 0, "Clarity, Warding", "Answers to the moon the way gold answers to the sun. Turns liquid faster than any of the seven, and cools just as quickly. Correspondent metal of the Moon."],
["mercury", "Mercury (Hg)", "Metal", "#d000ff", "melt", 2, 1, "Swiftness, Transformation", "The only one of the seven that refuses to hold still, not even in the crucible. Old alchemists called it the messenger and handled it with real fear. Correspondent metal of Mercury."],
["copper", "Copper (Cu)", "Metal", "#00ff66", "melt", 3, 0, "Affection, Conductivity", "Warms to a rose-gold glow long before it fully melts. Old love charms called for exactly that glow. Correspondent metal of Venus."],
["iron", "Iron (Fe)", "Metal", "#3a2752", "melt", 4, 0, "Strength, Protection", "Stubborn in the furnace, stubborn everywhere else. Every old ward against fae comes back to iron eventually. Correspondent metal of Mars."],
["tin", "Tin (Sn)", "Metal", "#a68fc2", "melt", 3, 0, "Abundance, Fortune", "Cries out faintly when bent, a sound smiths call tin cry. Melts easier than its reputation suggests. Correspondent metal of Jupiter."],
["lead", "Lead (Pb)", "Metal", "#9900ff", "melt", 4, 1, "Binding, Endurance", "The heaviest and slowest of the seven, and the one to be most careful breathing near. Old texts call it the beginning every other metal is measured against. Correspondent metal of Saturn."]
];
var OTM_SHELVES = [
{ n: "Herbs and blooms", cats: ["Herb", "Flower"], x: -81.3, z: -14, ry: Math.PI / 2 },
{ n: "Roots, resins and fungi", cats: ["Root", "Resin", "Fungus"], x: -81.3, z: -9.6, ry: Math.PI / 2 },
{ n: "Berries, honey and waters", cats: ["Berry", "Sweet", "Liquid"], x: -81.3, z: -5.2, ry: Math.PI / 2 },
{ n: "Stones and salts", cats: ["Mineral"], x: -78, z: -17.4, ry: 0 },
{ n: "The creature cabinet", cats: ["Creature"], x: -73.8, z: -17.4, ry: 0 },
{ n: "Metals", cats: ["Metal"], x: -69.6, z: -17.4, ry: 0 }
];
function otmShelfIngs(i) { var S = OTM_SHELVES[i]; return OTM_INGS.filter(function (g) { return S.cats.indexOf(g[2]) >= 0; }); }
function otmWixApothecary() { return __ZC(401, 87, this, arguments, new.target); }
function otmWixKitchen() { return __ZC(401, 88, this, arguments, new.target); }
function otmJarShelf(g, w, per, cols, off) { return __ZC(401, 89, this, arguments, new.target); }
function otmWixTick(dt, t) { return __ZC(401, 90, this, arguments, new.target); }
var OTM_ORR_MIN = Date.UTC(1600, 0, 1), OTM_ORR_MAX = Date.UTC(2400, 0, 1);
function otmOrrTick(dt) { return __ZC(401, 91, this, arguments, new.target); }
function otmOrrMode(O) {
if (O.live)
return "● NOW · as the sky truly is";
var s = O.speed, a = Math.abs(s), w = a >= 365 ? "a year" : a >= 30 ? "a month" : a >= 7 ? "a week" : "a day";
if (!s)
return "❚❚ held still at this day";
return (s > 0 ? "▶ forwards " : "◀ backwards ") + w + " every second";
}
function otmOrrWhen(t, secs) { var d = new Date(t); return [d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }), d.toLocaleTimeString(undefined, secs ? { hour: "2-digit", minute: "2-digit", second: "2-digit" } : { hour: "2-digit", minute: "2-digit" })]; }
function otmOrrPlate(force) { return __ZC(401, 92, this, arguments, new.target); }
function otmOrrLabel(txt, h) { return __ZC(401, 93, this, arguments, new.target); }
function otmPanelUp() { return !!(OTM.panel && OTM.panel.style.display === "flex"); }
function otmPanelClose() { if (OTM.panel) {
OTM.panel.style.display = "none";
OTM.panel.innerHTML = "";
} OTM.panelTick = null; OTM.potBrew = null; }
function otmPanel(title, sub, html, mount) { return __ZC(401, 94, this, arguments, new.target); }
function otmQ(el, s) { return el.querySelector(s); }
function otmTabs(list, cur) { return "<div class='tabs'>" + list.map(function (t) { return "<button class='b" + (t[0] === cur ? " on" : "") + "' data-tab='" + t[0] + "'>" + t[1] + "</button>"; }).join("") + "</div>"; }
function otmTabsWire(bd, fn) { bd.querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { fn(b.getAttribute("data-tab")); }; }); }
function otmPick(a) { return a[Math.floor(Math.random() * a.length)]; }
function otmShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function otmDay(ms) { var d = new Date(ms || Date.now()); return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / 86400000); }
setInterval(function () { if (otmPanelUp() && OTM.panelTick)
try {
OTM.panelTick();
}
catch (e) { } }, 250);
var OTM_PLANETS = [
{ k: "mercury", n: "Mercury", s: "☿", a: 0.38709927, ar: 0.00000037, e: 0.20563593, er: 0.00001906, I: 7.00497902, Ir: -0.00594749, L0: 252.25032350, Lr: 149472.67411175, w0: 77.45779628, wr: 0.16047689, O: 48.33076593, Or: -0.12534081, yr: 87.97, r: 0.07, col: 0xB8B0A8 },
{ k: "venus", n: "Venus", s: "♀", a: 0.72333566, ar: 0.00000390, e: 0.00677672, er: -0.00004107, I: 3.39467605, Ir: -0.00078890, L0: 181.97909950, Lr: 58517.81538729, w0: 131.60246718, wr: 0.00268329, O: 76.67984255, Or: -0.27769418, yr: 224.70, r: 0.11, col: 0xF0D8A0 },
{ k: "earth", n: "Earth", s: "⊕", a: 1.00000261, ar: 0.00000562, e: 0.01671123, er: -0.00004392, I: -0.00001531, Ir: -0.01294668, L0: 100.46457166, Lr: 35999.37244981, w0: 102.93768193, wr: 0.32327364, O: 0, Or: 0, yr: 365.26, r: 0.12, col: 0x4A8AE8 },
{ k: "mars", n: "Mars", s: "♂", a: 1.52371034, ar: 0.00001847, e: 0.09339410, er: 0.00007882, I: 1.84969142, Ir: -0.00813131, L0: -4.55343205, Lr: 19140.30268499, w0: -23.94362959, wr: 0.44441088, O: 49.55953891, Or: -0.29257343, yr: 686.98, r: 0.09, col: 0xD8603A },
{ k: "jupiter", n: "Jupiter", s: "♃", a: 5.20288700, ar: -0.00011607, e: 0.04838624, er: -0.00013253, I: 1.30439695, Ir: -0.00183714, L0: 34.39644051, Lr: 3034.74612775, w0: 14.72847983, wr: 0.21252668, O: 100.47390909, Or: 0.20469106, yr: 4332.6, r: 0.26, col: 0xD8B88A },
{ k: "saturn", n: "Saturn", s: "♄", a: 9.53667594, ar: -0.00125060, e: 0.05386179, er: -0.00050991, I: 2.48599187, Ir: 0.00193609, L0: 49.95424423, Lr: 1222.49362201, w0: 92.59887831, wr: -0.41897216, O: 113.66242448, Or: -0.28867794, yr: 10759, r: 0.22, col: 0xE8D8A8 },
{ k: "uranus", n: "Uranus", s: "♅", a: 19.18916464, ar: -0.00196176, e: 0.04725744, er: -0.00004397, I: 0.77263783, Ir: -0.00242939, L0: 313.23810451, Lr: 428.48202785, w0: 170.95427630, wr: 0.40805281, O: 74.01692503, Or: 0.04240589, yr: 30687, r: 0.16, col: 0x9AE0E8 },
{ k: "neptune", n: "Neptune", s: "♆", a: 30.06992276, ar: 0.00026291, e: 0.00859048, er: 0.00005105, I: 1.77004347, Ir: 0.00035372, L0: -55.12002969, Lr: 218.45945325, w0: 44.96476227, wr: -0.32241464, O: 131.78422574, Or: -0.00508664, yr: 60190, r: 0.16, col: 0x4A6AE8 }
];
var OTM_SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
function otmDeg(x) { return ((x % 360) + 360) % 360; }
function otmPlanetsAt(ms) { return __ZC(401, 95, this, arguments, new.target); }
function otmSignOf(l) { var s = Math.floor(otmDeg(l) / 30); return OTM_SIGNS[s] + " " + Math.floor(otmDeg(l) % 30) + "°"; }
function otmPhaseName(el) { return ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"][Math.floor((otmDeg(el) / 45) + 0.5) % 8]; }
function otmPhaseEmoji(el) { return ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"][Math.floor((otmDeg(el) / 45) + 0.5) % 8]; }
function otmSkyWheel(cv, ms) { return __ZC(401, 96, this, arguments, new.target); }
function otmOrrDiagram(cv, ms) { return __ZC(401, 97, this, arguments, new.target); }
var OTM_STARCAT = [["Sirius", 101.29, -16.72, -1.46, "Canis Major"], ["Canopus", 95.99, -52.7, -0.74, "Carina"], ["Alpha Cen", 219.9, -60.83, -0.27, "Centaurus"], ["Arcturus", 213.91, 19.18, -0.05, "Bootes"], ["Vega", 279.23, 38.78, 0.03, "Lyra"], ["Capella", 79.17, 46, 0.08, "Auriga"], ["Rigel", 78.63, -8.2, 0.13, "Orion"], ["Procyon", 114.83, 5.22, 0.34, "Canis Minor"], ["Achernar", 24.43, -57.24, 0.46, "Eridanus"], ["Betelgeuse", 88.79, 7.41, 0.42, "Orion"], ["Hadar", 210.96, -60.37, 0.61, "Centaurus"], ["Altair", 297.7, 8.87, 0.76, "Aquila"], ["Acrux", 186.65, -63.1, 0.77, "Crux"], ["Aldebaran", 68.98, 16.51, 0.85, "Taurus"], ["Antares", 247.35, -26.43, 0.96, "Scorpius"], ["Spica", 201.3, -11.16, 0.97, "Virgo"], ["Pollux", 116.33, 28.03, 1.14, "Gemini"], ["Fomalhaut", 344.41, -29.62, 1.16, "Piscis Austrinus"], ["Deneb", 310.36, 45.28, 1.25, "Cygnus"], ["Mimosa", 191.93, -59.69, 1.25, "Crux"], ["Regulus", 152.09, 11.97, 1.36, "Leo"], ["Adhara", 104.66, -28.97, 1.5, "Canis Major"], ["Castor", 113.65, 31.89, 1.58, "Gemini"], ["Gacrux", 187.79, -57.11, 1.59, "Crux"], ["Shaula", 263.4, -37.1, 1.62, "Scorpius"], ["Bellatrix", 81.28, 6.35, 1.64, "Orion"], ["Elnath", 81.57, 28.61, 1.65, "Taurus"], ["Miaplacidus", 138.3, -69.72, 1.67, "Carina"], ["Alnilam", 84.05, -1.2, 1.69, "Orion"], ["Alnair", 332.06, -46.96, 1.74, "Grus"], ["Alnitak", 85.19, -1.94, 1.74, "Orion"], ["Regor", 122.38, -47.34, 1.78, "Vela"], ["Alioth", 193.51, 55.96, 1.77, "Ursa Major"], ["Kaus Austr.", 276.04, -34.38, 1.85, "Sagittarius"], ["Mirfak", 51.08, 49.86, 1.79, "Perseus"], ["Dubhe", 165.93, 61.75, 1.79, "Ursa Major"], ["Wezen", 107.1, -26.39, 1.83, "Canis Major"], ["Sargas", 264.33, -43, 1.86, "Scorpius"], ["Avior", 125.63, -59.51, 1.86, "Carina"], ["Alkaid", 206.88, 49.31, 1.85, "Ursa Major"], ["Menkalinan", 89.88, 44.95, 1.9, "Auriga"], ["Atria", 252.17, -69.03, 1.91, "Triangulum Australe"], ["Alhena", 99.43, 16.4, 1.93, "Gemini"], ["Peacock", 306.41, -56.73, 1.94, "Pavo"], ["Polaris", 37.95, 89.26, 1.98, "Ursa Minor"], ["Mirzam", 95.67, -17.96, 1.98, "Canis Major"], ["Alphard", 141.9, -8.66, 1.98, "Hydra"], ["Hamal", 31.79, 23.46, 2, "Aries"], ["Diphda", 10.9, -17.99, 2.04, "Cetus"], ["Nunki", 283.82, -26.3, 2.05, "Sagittarius"], ["Mirach", 17.43, 35.62, 2.07, "Andromeda"], ["Alpheratz", 2.1, 29.09, 2.07, "Andromeda"], ["Rasalhague", 263.73, 12.56, 2.08, "Ophiuchus"], ["Kochab", 222.68, 74.16, 2.08, "Ursa Minor"], ["Saiph", 86.94, -9.67, 2.07, "Orion"], ["Denebola", 177.26, 14.57, 2.14, "Leo"], ["Algol", 47.04, 40.96, 2.12, "Perseus"], ["Merak", 165.46, 56.38, 2.37, "Ursa Major"], ["Phecda", 178.46, 53.7, 2.44, "Ursa Major"], ["Megrez", 183.86, 57.03, 3.31, "Ursa Major"], ["Mizar", 200.98, 54.92, 2.23, "Ursa Major"], ["Mintaka", 83, -0.3, 2.23, "Orion"], ["Caph", 2.29, 59.15, 2.27, "Cassiopeia"], ["Schedar", 10.13, 56.54, 2.24, "Cassiopeia"], ["Tsih", 14.18, 60.72, 2.47, "Cassiopeia"], ["Ruchbah", 21.45, 60.23, 2.68, "Cassiopeia"], ["Segin", 28.6, 63.67, 3.35, "Cassiopeia"], ["Imai", 183.79, -58.75, 2.79, "Crux"], ["Sadr", 305.56, 40.26, 2.23, "Cygnus"], ["Albireo", 292.68, 27.96, 3.05, "Cygnus"], ["Gienah", 311.55, 33.97, 2.46, "Cygnus"], ["Fawaris", 296.24, 45.13, 2.87, "Cygnus"], ["Dschubba", 240.08, -22.62, 2.29, "Scorpius"], ["Lesath", 264.5, -37.3, 2.69, "Scorpius"], ["Algieba", 154.99, 19.84, 2.08, "Leo"], ["Zosma", 168.53, 20.52, 2.56, "Leo"], ["Talitha", 127.57, 48.04, 3.14, "Ursa Major"], ["Tania Bor.", 154.27, 42.91, 3.45, "Ursa Major"], ["Tania Aus.", 154.28, 41.5, 3.05, "Ursa Major"], ["Yildun", 263.05, 86.59, 4.35, "Ursa Minor"], ["Zeta UMi", 221.87, 77.79, 4.32, "Ursa Minor"], ["Pherkad", 230.18, 71.83, 3.05, "Ursa Minor"], ["Alderamin", 319.64, 62.59, 2.44, "Cepheus"], ["Alfirk", 322.17, 70.56, 3.23, "Cepheus"], ["Errai", 354.84, 77.63, 3.21, "Cepheus"], ["Zeta Cep", 340.67, 58.2, 3.35, "Cepheus"], ["Thuban", 211.1, 64.38, 3.65, "Draco"], ["Edasich", 231.94, 65.71, 3.29, "Draco"], ["Aldhibah", 257.2, 65.71, 3.17, "Draco"], ["Altais", 275.26, 67.66, 3.07, "Draco"], ["Rastaban", 262.61, 52.3, 2.79, "Draco"], ["Eltanin", 269.15, 51.49, 2.23, "Draco"], ["Meissa", 83.78, 9.93, 3.54, "Orion"], ["Aludra", 111.02, -29.3, 2.45, "Canis Major"], ["Gomeisa", 111.79, 8.29, 2.9, "Canis Minor"], ["Ain", 67.15, 19.18, 3.53, "Taurus"], ["Alcyone", 56.87, 24.11, 2.87, "Taurus"], ["Wasat", 107.78, 21.98, 3.53, "Gemini"], ["Mebsuta", 100.98, 25.13, 3.06, "Gemini"], ["Tejat", 95.74, 22.51, 2.88, "Gemini"], ["Mekbuda", 102.65, 20.57, 3.79, "Gemini"], ["Mahasim", 89.93, 37.21, 2.62, "Auriga"], ["Hassaleh", 74.25, 33.17, 2.69, "Auriga"], ["Atik", 58.53, 31.88, 2.85, "Perseus"], ["Menkib", 59.9, 35.79, 4.04, "Perseus"], ["Miram", 38.48, 55.9, 3.76, "Perseus"], ["Almach", 30.98, 42.33, 2.1, "Andromeda"], ["Markab", 346.19, 15.21, 2.49, "Pegasus"], ["Scheat", 345.94, 28.08, 2.42, "Pegasus"], ["Algenib", 3.31, 15.18, 2.83, "Pegasus"], ["Enif", 326.05, 9.88, 2.39, "Pegasus"], ["Mothallah", 28.27, 29.58, 3.42, "Triangulum"], ["Beta Tri", 34.99, 34.99, 3, "Triangulum"], ["Gamma Tri", 36.77, 33.85, 4.03, "Triangulum"], ["Sheratan", 28.66, 20.81, 2.64, "Aries"], ["41 Ari", 40.05, 27.26, 3.63, "Aries"], ["Alrescha", 30.9, 2.76, 3.82, "Pisces"], ["Eta Psc", 15.95, 15.35, 3.62, "Pisces"], ["Omega Psc", 6.14, 6.86, 4.03, "Pisces"], ["Menkar", 45.57, 4.09, 2.54, "Cetus"], ["Mira", 34.84, -2.98, 3, "Cetus"], ["Kaffaljidhma", 36.34, 3.24, 3.47, "Cetus"], ["Cursa", 76.96, -5.09, 2.79, "Eridanus"], ["Zaurak", 59.51, -13.51, 2.95, "Eridanus"], ["Rana", 53.53, -9.77, 3.54, "Eridanus"], ["Arneb", 83.18, -17.82, 2.58, "Lepus"], ["Nihal", 82.31, -20.76, 2.84, "Lepus"], ["Gamma Lep", 95.3, -22.45, 3.6, "Lepus"], ["Phact", 84.91, -34.07, 2.65, "Columba"], ["Wazn", 86.19, -35.77, 3.12, "Columba"], ["Acubens", 134.62, 11.86, 4.25, "Cancer"], ["Asellus Bor.", 131.17, 21.47, 4.66, "Cancer"], ["Asellus Aus.", 131.18, 18.15, 3.94, "Cancer"], ["Iota Cnc", 130.69, 28.76, 4.02, "Cancer"], ["Chertan", 168.56, 15.43, 3.34, "Leo"], ["Adhafera", 154.17, 23.42, 3.44, "Leo"], ["Al Jabhah", 152.83, 16.76, 3.52, "Leo"], ["Porrima", 190.41, -1.45, 2.74, "Virgo"], ["Vindemiatrix", 195.54, 10.96, 2.83, "Virgo"], ["Zavijava", 177.67, 1.76, 3.6, "Virgo"], ["Heze", 193.9, -0.67, 3.38, "Virgo"], ["Zubenelg.", 222.72, -16.04, 2.75, "Libra"], ["Zubenesch.", 229.25, -9.38, 2.61, "Libra"], ["Brachium", 233.73, -25.28, 3.29, "Libra"], ["Izar", 221.25, 27.07, 2.35, "Bootes"], ["Muphrid", 209.87, 18.4, 2.68, "Bootes"], ["Seginus", 218.02, 38.31, 3.03, "Bootes"], ["Nekkar", 224.75, 40.39, 3.5, "Bootes"], ["Delta Boo", 228.13, 33.31, 3.48, "Bootes"], ["Alphecca", 233.67, 26.71, 2.23, "Corona Borealis"], ["Nusakan", 231.61, 29.11, 3.68, "Corona Borealis"], ["Gamma CrB", 235.13, 26.3, 3.84, "Corona Borealis"], ["Delta CrB", 237.2, 26.07, 4.63, "Corona Borealis"], ["Theta CrB", 236.02, 31.36, 4.14, "Corona Borealis"], ["Kornephoros", 247.55, 21.49, 2.78, "Hercules"], ["Zeta Her", 250.32, 31.6, 2.81, "Hercules"], ["Sarin", 255.65, 24.84, 3.14, "Hercules"], ["Rasalgethi", 258.66, 14.39, 3.08, "Hercules"], ["Pi Her", 258.11, 36.81, 3.16, "Hercules"], ["Eta Her", 250.99, 38.92, 3.53, "Hercules"], ["Sheliak", 282.52, 33.36, 3.52, "Lyra"], ["Sulafat", 284.74, 32.69, 3.24, "Lyra"], ["Delta2 Lyr", 284.44, 36.9, 4.3, "Lyra"], ["Tarazed", 296.57, 10.61, 2.72, "Aquila"], ["Alshain", 298.83, 6.41, 3.71, "Aquila"], ["Deneb Okab", 286.35, 13.86, 2.99, "Aquila"], ["Theta Aql", 300.28, -0.82, 3.23, "Aquila"], ["Sham", 298.78, 18.01, 4.39, "Sagitta"], ["Beta Sge", 299.55, 17.48, 4.37, "Sagitta"], ["Gamma Sge", 299.18, 19.49, 3.51, "Sagitta"], ["Sualocin", 309.99, 15.91, 3.77, "Delphinus"], ["Rotanev", 309.44, 14.6, 3.63, "Delphinus"], ["Gamma Del", 309.11, 16.13, 4.03, "Delphinus"], ["Delta Del", 309.71, 15.07, 4.43, "Delphinus"], ["Sabik", 258.36, -15.72, 2.43, "Ophiuchus"], ["Yed Prior", 249.29, -3.69, 2.74, "Ophiuchus"], ["Yed Post.", 250.32, -4.69, 3.24, "Ophiuchus"], ["Cebalrai", 265.87, 4.57, 2.76, "Ophiuchus"], ["Zeta Oph", 254.42, -10.57, 2.56, "Ophiuchus"], ["Unukalhai", 236.07, 6.43, 2.63, "Serpens"], ["Mu Ser", 224.98, -3.43, 3.53, "Serpens"], ["Graffias", 241.36, -19.81, 2.56, "Scorpius"], ["Kaus Media", 275.25, -29.83, 2.72, "Sagittarius"], ["Kaus Bor.", 276.99, -25.42, 2.82, "Sagittarius"], ["Ascella", 285.65, -29.88, 2.6, "Sagittarius"], ["Phi Sgr", 283.28, -26.99, 3.17, "Sagittarius"], ["Algedi", 304.51, -12.54, 3.57, "Capricornus"], ["Dabih", 305.25, -14.78, 3.05, "Capricornus"], ["Nashira", 326.76, -16.66, 3.68, "Capricornus"], ["Deneb Algedi", 327.03, -16.13, 2.85, "Capricornus"], ["Sadalmelik", 331.44, -0.32, 2.96, "Aquarius"], ["Sadalsuud", 322.89, -5.57, 2.9, "Aquarius"], ["Sadachbia", 334.21, -1.39, 3.84, "Aquarius"], ["Skat", 343.15, -15.82, 3.27, "Aquarius"], ["Delta PsA", 349.6, -32.54, 4.21, "Piscis Austrinus"], ["Gienah Crv", 187.47, -17.54, 2.59, "Corvus"], ["Kraz", 188.6, -23.4, 2.65, "Corvus"], ["Algorab", 188.94, -16.52, 2.94, "Corvus"], ["Minkar", 183.95, -22.62, 3, "Corvus"], ["Alkes", 164.94, -18.3, 4.08, "Crater"], ["Beta Crt", 168.86, -22.83, 4.48, "Crater"], ["Gamma Crt", 170.24, -17.68, 4.06, "Crater"], ["Delta Crt", 173.14, -14.78, 3.56, "Crater"], ["Zeta Hya", 139.01, 5.94, 3.11, "Hydra"], ["Nu Hya", 154.83, -16.19, 3.11, "Hydra"], ["Gamma Hya", 189.06, -23.17, 2.99, "Hydra"], ["Pi Hya", 218.29, -26.68, 3.27, "Hydra"], ["Menkent", 211.67, -36.37, 2.06, "Centaurus"], ["Epsilon Cen", 204.97, -53.47, 2.3, "Centaurus"], ["Zeta Cen", 212.69, -47.29, 2.55, "Centaurus"], ["Aspidiske", 139.27, -59.27, 2.21, "Carina"], ["Suhail", 137, -43.43, 2.21, "Vela"], ["Markeb", 140.53, -55.01, 2.47, "Vela"], ["Delta Vel", 131.18, -54.71, 1.96, "Vela"], ["Naos", 120.9, -40, 2.25, "Puppis"], ["Rho Pup", 121.88, -24.3, 2.81, "Puppis"], ["Tureis", 130.1, -24.86, 3.34, "Puppis"], ["Alpha Lup", 220.48, -47.39, 2.3, "Lupus"], ["Beta Lup", 224.63, -43.13, 2.68, "Lupus"], ["Gamma Lup", 233.79, -41.17, 2.78, "Lupus"], ["Alpha Ara", 262.96, -49.88, 2.95, "Ara"], ["Beta Ara", 261.32, -55.53, 2.85, "Ara"], ["Zeta Ara", 267.22, -55.99, 3.13, "Ara"], ["Beta TrA", 251.2, -63.43, 2.85, "Triangulum Australe"], ["Gamma TrA", 253.45, -68.68, 2.89, "Triangulum Australe"], ["Beta Pav", 306.1, -66.2, 3.42, "Pavo"], ["Delta Pav", 302.19, -66.18, 3.56, "Pavo"], ["Beta Gru", 340.67, -46.88, 2.11, "Grus"], ["Gamma Gru", 334.24, -37.37, 3.01, "Grus"], ["Ankaa", 6.57, -42.31, 2.4, "Phoenix"], ["Beta Phe", 13.77, -46.72, 3.32, "Phoenix"], ["Gamma Phe", 3.34, -43.32, 3.41, "Phoenix"], ["Alpha Tuc", 334.42, -60.26, 2.87, "Tucana"], ["Gamma Tuc", 354.8, -58.24, 3.99, "Tucana"], ["Alpha Dor", 79.19, -55.05, 3.27, "Dorado"], ["Beta Dor", 83.8, -62.49, 3.76, "Dorado"], ["Alpha Mus", 184.98, -69.14, 2.69, "Musca"], ["Beta Mus", 184.55, -68.11, 3.05, "Musca"]];
var OTM_CONLINES = [[35, 57], [57, 58], [58, 59], [59, 35], [59, 32], [32, 60], [60, 39], [58, 77], [77, 78], [35, 76], [44, 79], [79, 80], [80, 53], [53, 81], [81, 80], [82, 83], [83, 84], [84, 85], [85, 82], [86, 87], [87, 88], [88, 89], [89, 90], [90, 91], [9, 25], [25, 61], [61, 28], [28, 30], [30, 9], [30, 54], [61, 6], [92, 9], [92, 25], [62, 63], [63, 64], [64, 65], [65, 66], [23, 12], [19, 67], [18, 68], [68, 69], [71, 68], [68, 70], [72, 14], [14, 37], [37, 24], [24, 73], [72, 181], [20, 74], [74, 75], [75, 55], [75, 134], [134, 55], [20, 136], [136, 135], [135, 74], [22, 16], [16, 42], [22, 97], [16, 100], [97, 100], [100, 98], [98, 99], [0, 45], [0, 36], [36, 21], [36, 93], [7, 94], [13, 26], [13, 95], [5, 40], [40, 101], [101, 26], [26, 102], [102, 5], [34, 56], [34, 103], [103, 104], [34, 105], [51, 50], [50, 106], [107, 108], [108, 51], [51, 109], [109, 107], [110, 107], [111, 112], [112, 113], [113, 111], [47, 114], [114, 115], [118, 117], [117, 116], [48, 119], [119, 121], [121, 120], [122, 124], [124, 123], [123, 8], [125, 126], [126, 127], [128, 129], [130, 132], [132, 131], [131, 133], [15, 137], [137, 140], [140, 138], [137, 139], [141, 142], [142, 143], [3, 145], [3, 144], [144, 148], [148, 147], [147, 146], [146, 3], [150, 149], [149, 151], [151, 152], [152, 153], [155, 159], [159, 158], [158, 156], [156, 155], [156, 157], [155, 154], [4, 160], [160, 161], [161, 162], [162, 4], [163, 11], [11, 164], [11, 166], [11, 165], [167, 168], [168, 169], [170, 172], [172, 173], [173, 171], [171, 170], [52, 175], [175, 176], [176, 178], [178, 174], [52, 177], [179, 180], [33, 182], [182, 183], [182, 185], [185, 49], [49, 184], [184, 33], [186, 187], [187, 189], [189, 188], [191, 190], [190, 192], [192, 193], [17, 194], [197, 195], [195, 196], [196, 198], [198, 197], [199, 200], [200, 201], [201, 202], [203, 46], [46, 204], [204, 205], [205, 206], [2, 10], [10, 208], [208, 209], [209, 207], [1, 27], [27, 38], [38, 210], [31, 213], [213, 212], [212, 211], [214, 215], [215, 216], [217, 218], [218, 219], [220, 221], [221, 222], [41, 223], [223, 224], [224, 41], [43, 225], [225, 226], [29, 227], [227, 228], [229, 230], [229, 231], [232, 233], [234, 235], [236, 237]];
var OTM_ZDATA = [["Fire", "Cardinal", "Mars", "bold, pioneering, fearless, and driven by passion."], ["Earth", "Fixed", "Venus", "grounded, persistent, sensual, and highly dependable."], ["Air", "Mutable", "Mercury", "curious, articulate, adaptable, and intellectually sharp."], ["Water", "Cardinal", "Moon", "intuitive, protective, deeply feeling, and nurturing."], ["Fire", "Fixed", "Sun", "radiant, creative, noble, and naturally magnetic."], ["Earth", "Mutable", "Mercury", "analytical, methodical, dedicated, and refining."], ["Air", "Cardinal", "Venus", "harmonious, artistic, diplomatic, and beauty-seeking."], ["Water", "Fixed", "Pluto", "transformative, intense, mysterious, and perceptive."], ["Fire", "Mutable", "Jupiter", "philosophical, adventurous, free-spirited, and wise."], ["Earth", "Cardinal", "Saturn", "ambitious, disciplined, strategic, and master of mastery."], ["Air", "Fixed", "Uranus", "visionary, original, humanitarian, and unconventional."], ["Water", "Mutable", "Neptune", "empathic, mystical, imaginative, and spiritually attuned."]];
var OTM_ASPECTS = [["Conjunction", 0, 6, "#F0D890"], ["Sextile", 60, 5, "#4fc3f7"], ["Square", 90, 6, "#ff6b6b"], ["Trine", 120, 6, "#66d98a"], ["Opposition", 180, 8, "#ff6b6b"]];
var OTM_ELEMS = { Fire: "Your chart is heavily charged with Fire. You move through life with instinct, enthusiasm, and a creative drive that inspires others.",
Earth: "Your chart is grounded in strong Earth. You have a practical intelligence, steady focus, and a talent for building lasting results.",
Air: "Your chart is driven by Air. You thrive on ideas, connections, lively conversation, and the freedom of the mind.",
Water: "Your chart flows with deep Water. You take in life through feeling, keen intuition, and an artist's or healer's perception." };
function otmJD(ms) { return ms / 86400000 + 2440587.5; }
function otmLST(ms, lon) { var jd = otmJD(ms), T = (jd - 2451545) / 36525; return otmDeg(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T + lon); }
function otmEclToEq(l) { var R = Math.PI / 180, e = 23.4393 * R, L = l * R; return [otmDeg(Math.atan2(Math.sin(L) * Math.cos(e), Math.cos(L)) / R), Math.asin(Math.sin(e) * Math.sin(L)) / R]; }
function otmAltAz(ra, dec, lst, lat) {
var R = Math.PI / 180, H = (lst - ra) * R, d = dec * R, f = lat * R, alt = Math.asin(Math.sin(d) * Math.sin(f) + Math.cos(d) * Math.cos(f) * Math.cos(H));
var az = Math.atan2(-Math.sin(H) * Math.cos(d), Math.cos(f) * Math.sin(d) - Math.sin(f) * Math.cos(d) * Math.cos(H));
return [alt / R, otmDeg(az / R)];
}
function otmPlace() { return otmProg().place || null; }
function otmPlaceUi(pg, done) { return __ZC(401, 98, this, arguments, new.target); }
function otmStarChart(cv, ms, lat, lon) { return __ZC(401, 99, this, arguments, new.target); }
function otmNatal(ms, lat, lon) { return __ZC(401, 100, this, arguments, new.target); }
function otmNatalWheel(cv, N) { return __ZC(401, 101, this, arguments, new.target); }
function otmAlignments(from, days) { return __ZC(401, 102, this, arguments, new.target); }
function otmSkyExtra(tab, pg) { return __ZC(401, 103, this, arguments, new.target); }
function otmSkyOpen(tab) { return __ZC(401, 104, this, arguments, new.target); }
function otmAstroLore(into) { return __ZC(401, 105, this, arguments, new.target); }
var OTM_MIRROR_HIS = ["The darkness reveals what the light hides.", "A path is only as clear as the shadow it casts.", "The Old Gods look upon your intent.", "You are the magic you seek.", "Balance is found in the heart of the storm.", "The mirror reflects the future you are forging.", "What you resist quietly shapes you the most.", "Patience is a spell that always works.", "The question you keep avoiding holds your answer.", "Small, honest steps outpace grand, hollow ones.", "Not every door needs to be opened today.", "The quiet voice is usually the true one.", "What you water will grow, choose carefully.", "Your instincts already know, your fear is just louder.", "Rest is not the opposite of progress.", "The version of you from a year ago would be proud.", "Let go of what was never truly yours to carry.", "A single honest word outweighs a hundred careful ones.", "The storm you fear may be the one that clears the air.", "You are allowed to outgrow what once fit you.", "The mirror does not lie, but it does wait for courage.", "Somewhere, a decision you made has already begun to bloom.", "What feels like delay may simply be preparation.", "The company you keep is a mirror of its own.", "Today asks for presence, not perfection.", "The thing you keep postponing is ready when you are.", "Old wounds soften when finally spoken aloud.", "You do not need permission to change your mind.", "The path behind you was never wasted.", "Trust the timing, even when it tests you."];
var OTM_MIRROR = [
"The greatest magic often begins in darkness, like seeds in black soil.",
"What you look for is looking back at you. Look kindly.",
"Obsidian is born where fire meets earth. So are you, on your hardest days.",
"Be still for one breath. The answer was never in the hurry.",
"A mirror shows what is. A dark mirror shows what is waiting to become.",
"Light one candle for yourself today. You count too.",
"The moon does not argue with the dark. She simply shines in it.",
"Every path to the night is still a path. Walk yours with your head up.",
"Speak to your ancestors today. They have been waiting to hear your voice.",
"Not every door is a door you can see. Knock anyway.",
"Rest is a spell too. Cast it.",
"You are the oldest magic you will ever meet.",
"Shadows only fall where there is light. Find it.",
"Plant something today: a word, a seed, a promise.",
"The wheel turns. What is low now will rise.",
"Your gods have many names. Your kindness only needs one.",
"Wisdom is often veiled in shadow. Be patient with the veil.",
"Ask the question you have been afraid to ask.",
"Protect your peace the way you would protect a flame from the wind.",
"What is spoken in the dark is heard by the dark. Speak well.",
"Water takes the shape of what holds it, and wears away stone. Be both.",
"You do not need permission to be what you are.",
"Look up tonight. The same stars watched over every one of your line.",
"A circle has no end. Neither does the care of the coven.",
"Burn away one thing you no longer need. Keep the warmth.",
"Between what was and what will be, there is now. Live there a while.",
"Strength can be very quiet.",
"Feed the birds, the fire, and the friend. Each gives back.",
"Today, trust the small voice.",
"The dark moon is not empty. She is full of beginnings.",
"Let something be finished, so something can start.",
"There is room under this roof for every faith that ever looked at the moon.",
"Write down a dream tonight. It may be a letter from yourself.",
"Bless your own two hands: they carry everything you love.",
"Do one thing slowly today, on purpose.",
"Be the sanctuary you looked for.",
"Fear knocked. Courage answered. No one was there.",
"Reflect the starlight back. It is what we are for.",
"The old ways endure because someone keeps them. Thank you for keeping them.",
"May the night keep her children, and may you be kept."
];
function otmMirrorLines() { var c = otmCfg().wix || {}, own = String(c.lines || "").split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean); return own.concat(OTM_MIRROR_HIS, OTM_MIRROR); }
function otmMirrorToday() { var c = otmCfg().wix || {}; if (c.today && String(c.today).trim())
return String(c.today).trim(); var L = otmMirrorLines(); return otmMirrorMine() || L[((otmDay() * 7) % L.length + L.length) % L.length]; }
function otmMirrorMine() { var p = otmProg(), m = p.mirror; return m && m.day === otmDay() ? m.w : null; }
function otmMirrorOpen() { return __ZC(401, 106, this, arguments, new.target); }
var OTM_MAJOR = [
["The Fool", "🃏", "a new beginning, a leap of faith, the open road", "carelessness, a jump made without looking"],
["The Magician", "🪄", "will and skill: you have the tools, use them", "tricks, talent wasted or turned to deceit"],
["The High Priestess", "🌙", "secrets, intuition, what is known without words", "secrets kept too long, living only on the surface"],
["The Empress", "🌾", "abundance, nurture, a fruitful time", "smothering, waiting on others for everything"],
["The Emperor", "👑", "order, structure, a firm hand", "rigidity, power used too hard"],
["The Hierophant", "🗝️", "tradition, teaching, the way it has always been done", "breaking with custom, or custom grown hollow"],
["The Lovers", "💞", "love, union, a choice made with the heart", "a choice made badly, a bond out of tune"],
["The Chariot", "🏇", "victory by will, holding opposite forces together", "lost direction, being pulled two ways"],
["Strength", "🦁", "courage, patience, gentle power that tames the beast", "self-doubt, strength forgotten"],
["The Hermit", "🏮", "solitude, seeking, the lamp of inner wisdom", "loneliness, hiding from the world"],
["Wheel of Fortune", "☸️", "the turning of fate, cycles, a change of luck", "a run of bad luck, holding back the wheel"],
["Justice", "⚖️", "fairness, truth, cause and effect", "unfairness, a truth avoided"],
["The Hanged Man", "🙃", "surrender, a pause, seeing it the other way up", "stalling, a sacrifice for nothing"],
["Death", "🥀", "an ending that clears the ground: change, not dying", "clinging to what is already over"],
["Temperance", "🏺", "balance, moderation, blending, patience", "excess, things out of proportion"],
["The Devil", "⛓️", "chains we have chosen: habit, temptation, the material", "the chains loosening, breaking free"],
["The Tower", "🗼", "sudden upheaval, a revelation that shakes what was false", "a disaster narrowly missed, fear of change"],
["The Star", "⭐", "hope, healing, calm after the storm", "discouragement, hope mislaid"],
["The Moon", "🌕", "dreams, illusion, the deep unconscious, fear in the dark", "confusion lifting, a fear seen for what it is"],
["The Sun", "☀️", "joy, success, warmth, plain truth", "joy delayed, but still coming"],
["Judgement", "📯", "awakening, a call answered, a reckoning", "doubt, the call ignored"],
["The World", "🌍", "completion, fulfilment, a circle closed", "something not yet finished"]
];
var OTM_SUITS = [["Wands", "🔥", "fire: will, work, ambition and the spark of new things"], ["Cups", "🍷", "water: feeling, love, friendship and dreams"],
["Swords", "🗡️", "air: the mind, words, conflict and the cutting truth"], ["Pentacles", "🪙", "earth: money, the body, home and slow steady growth"]];
var OTM_RANKS = [["Ace", "a seed, a beginning, a gift"], ["Two", "a choice, a balance, a partnership"], ["Three", "growth, first results, working together"], ["Four", "rest, stability, holding on"],
["Five", "struggle, loss, a test of the spirit"], ["Six", "harmony, giving and receiving, moving on"], ["Seven", "a challenge, a stand to take, a choice among many"], ["Eight", "movement, effort, speed"],
["Nine", "almost there, resilience, a wish near granted"], ["Ten", "fullness, an ending, a burden or a blessing complete"], ["Page", "news, study, a young messenger"],
["Knight", "action, a quest, rushing in"], ["Queen", "mastery turned inward: care, depth, understanding"], ["King", "mastery turned outward: leading, providing, deciding"]];
var OTM_RN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
function otmDeck() { return __ZC(401, 107, this, arguments, new.target); }
var OTM_SPREADS = {
one: { n: "One card for today", p: ["Today"] },
three: { n: "Three cards", p: ["What was", "What is", "What is coming"] },
cross: { n: "The Celtic Cross", p: ["The heart of the matter", "What crosses it", "What crowns it (the best that can be)", "What lies beneath it (the root)", "What is passing", "What is coming", "Yourself", "Those around you", "Your hopes and fears", "What will come"] }
};
var OTM_RUNES = [
["ᚠ", "Fehu", "cattle, wealth", "what you have earned and what you share; wealth that moves"], ["ᚢ", "Uruz", "the aurochs", "raw strength, health, untamed energy"],
["ᚦ", "Thurisaz", "the giant, the thorn", "a force that defends or harms; think before acting"], ["ᚨ", "Ansuz", "a god (Odin), the mouth", "words, wisdom, a message, inspiration"],
["ᚱ", "Raidho", "the ride", "a journey, right order, the road ahead"], ["ᚲ", "Kenaz", "the torch", "knowledge, craft, a light in the dark"],
["ᚷ", "Gebo", "the gift", "a gift given and returned; partnership, balance"], ["ᚹ", "Wunjo", "joy", "joy, fellowship, a wish fulfilled"],
["ᚺ", "Hagalaz", "hail", "disruption from outside that clears the way"], ["ᚾ", "Naudiz", "need", "need, hardship, the friction that makes fire"],
["ᛁ", "Isa", "ice", "stillness, a pause, things frozen for now"], ["ᛃ", "Jera", "the year, the harvest", "reward in its own season; patience pays"],
["ᛇ", "Eihwaz", "the yew", "endurance, the tree between life and death"], ["ᛈ", "Perthro", "the lot-cup", "mystery, fate, what is not yet shown"],
["ᛉ", "Algiz", "the elk, protection", "protection, a shield, the hand raised in warding"], ["ᛊ", "Sowilo", "the sun", "success, wholeness, the sun's victory"],
["ᛏ", "Tiwaz", "the god Tyr", "justice, honour, sacrifice for the right"], ["ᛒ", "Berkano", "the birch", "birth, growth, a new beginning, care"],
["ᛖ", "Ehwaz", "the horse", "trust, partnership, moving forward together"], ["ᛗ", "Mannaz", "mankind", "the self among others; friends, community"],
["ᛚ", "Laguz", "water", "flow, intuition, dreams, the deep"], ["ᛜ", "Ingwaz", "the god Ing", "seed, potential, a time of gestation"],
["ᛞ", "Dagaz", "day", "dawn, breakthrough, the turning to light"], ["ᛟ", "Othala", "the inheritance", "home, ancestry, what is handed down"]
];
var OTM_HEX = [["The Creative", "Qián", "strength, persistence, the dragon in the sky"], ["The Receptive", "Kūn", "yielding, devotion, the mare on the open earth"], ["Difficulty at the Beginning", "Zhūn", "birth pangs; persevere and gather helpers"], ["Youthful Folly", "Méng", "the student must ask; the teacher answers"], ["Waiting", "Xū", "patience with confidence; the rain will come"], ["Conflict", "Sòng", "stop halfway; seek a fair judge"], ["The Army", "Shī", "discipline and a worthy leader"], ["Holding Together", "Bǐ", "union; join the circle in good time"], ["Small Taming", "Xiǎo Chù", "gentle restraint; dense clouds, no rain yet"], ["Treading", "Lǚ", "walk carefully, even on the tiger's tail"], ["Peace", "Tài", "heaven and earth meet; small departs, great comes"], ["Standstill", "Pǐ", "heaven and earth apart; hold to your worth"], ["Fellowship", "Tóng Rén", "people united in the open"], ["Great Possession", "Dà Yǒu", "abundance held with modesty"], ["Modesty", "Qiān", "the mountain beneath the earth; humility carries through"], ["Enthusiasm", "Yù", "harmony, music and readiness"], ["Following", "Suí", "to lead, first learn to follow"], ["Work on What Has Been Spoiled", "Gǔ", "repair what the past left to rot"], ["Approach", "Lín", "the good draws near; use the time"], ["Contemplation", "Guān", "look deeply, and be seen"], ["Biting Through", "Shì Kè", "decisive justice clears the obstacle"], ["Grace", "Bì", "beauty and form, but not substance alone"], ["Splitting Apart", "Bō", "a time to wait, not to act"], ["Return", "Fù", "the turning point; the light comes back"], ["Innocence", "Wú Wàng", "act without guile and all goes well"], ["Great Taming", "Dà Chù", "hold great strength in check, and feed it"], ["Nourishment", "Yí", "watch what you feed, and what feeds you"], ["Great Exceeding", "Dà Guò", "the ridgepole sags; act, but carefully"], ["The Abysmal (Water)", "Kǎn", "danger repeated; keep faith and flow on"], ["The Clinging (Fire)", "Lí", "light that depends on what it burns; clarity"], ["Influence", "Xián", "attraction, courtship, the mutual pull"], ["Duration", "Héng", "what lasts; steady in your course"], ["Retreat", "Dùn", "withdraw in good order; it is not defeat"], ["Great Power", "Dà Zhuàng", "strength used rightly"], ["Progress", "Jìn", "the sun rises over the earth"], ["Darkening of the Light", "Míng Yí", "hide your light, keep it burning"], ["The Family", "Jiā Rén", "each in their place; the hearth"], ["Opposition", "Kuí", "differences; small matters still go well"], ["Obstruction", "Jiǎn", "the way is blocked; turn and gather help"], ["Deliverance", "Xiè", "the knot loosens; forgive and move on"], ["Decrease", "Sǔn", "giving up some for the good; sincerity"], ["Increase", "Yì", "gain; a time to undertake"], ["Breakthrough", "Guài", "resolve; speak the truth openly"], ["Coming to Meet", "Gòu", "a meeting not to be trusted lightly"], ["Gathering Together", "Cuì", "the assembly; offerings brought together"], ["Pushing Upward", "Shēng", "the tree grows from the earth, step by step"], ["Oppression", "Kùn", "exhaustion; keep your words few and your spirit firm"], ["The Well", "Jǐng", "the source that never runs dry; draw from it"], ["Revolution", "Gé", "moulting; change when the time is ripe"], ["The Cauldron", "Dǐng", "nourishment of the spirit; the sacred vessel"], ["The Arousing (Thunder)", "Zhèn", "shock that brings laughter after"], ["Keeping Still (Mountain)", "Gèn", "stillness of the body, rest for the heart"], ["Development", "Jiàn", "gradual progress, like the tree on the mountain"], ["The Marrying Maiden", "Guī Mèi", "a subordinate place; mind the long view"], ["Abundance", "Fēng", "fullness at its height; be like the sun at noon"], ["The Wanderer", "Lǚ", "the traveller; be careful and courteous"], ["The Gentle (Wind)", "Xùn", "penetrating softly, again and again"], ["The Joyous (Lake)", "Duì", "joy shared; friends learning together"], ["Dispersion", "Huàn", "dissolving what divides; a gathering at the temple"], ["Limitation", "Jié", "limits that free; but not bitter ones"], ["Inner Truth", "Zhōng Fú", "sincerity that reaches even the fish and the pigs"], ["Small Exceeding", "Xiǎo Guò", "small things may be done, not great"], ["After Completion", "Jì Jì", "all in order now; beware the end"], ["Before Completion", "Wèi Jì", "not yet across; the young fox wets its tail"]];
var OTM_TRI = [["☰", "Heaven", [1, 1, 1]], ["☳", "Thunder", [1, 0, 0]], ["☵", "Water", [0, 1, 0]], ["☶", "Mountain", [0, 0, 1]], ["☷", "Earth", [0, 0, 0]], ["☴", "Wind", [0, 1, 1]], ["☲", "Fire", [1, 0, 1]], ["☱", "Lake", [1, 1, 0]]];
var OTM_KW = [[1, 25, 6, 33, 12, 44, 13, 10], [34, 51, 40, 62, 16, 32, 55, 54], [5, 3, 29, 39, 8, 48, 63, 60], [26, 27, 4, 52, 23, 18, 22, 41], [11, 24, 7, 15, 2, 46, 36, 19], [9, 42, 59, 53, 20, 57, 37, 61], [14, 21, 64, 56, 35, 50, 30, 38], [43, 17, 47, 31, 45, 28, 49, 58]];
function otmTriOf(b) { for (var i = 0; i < 8; i++) {
var t = OTM_TRI[i][2];
if (t[0] === b[0] && t[1] === b[1] && t[2] === b[2])
return i;
} return 0; }
function otmHexOf(lines) { var lo = otmTriOf(lines.slice(0, 3)), up = otmTriOf(lines.slice(3, 6)); return { n: OTM_KW[up][lo], lo: lo, up: up }; }
function otmHexHtml(lines, chg) { return __ZC(401, 108, this, arguments, new.target); }
function otmHexInfo(h) { return __ZC(401, 109, this, arguments, new.target); }
function otmCardHtml(c, pos, rev) { return "<div style='display:inline-block;text-align:center'><div class='card" + (rev ? " rev" : "") + "'><div class='n'>" + otmEsc(c.n) + "</div><div class='i'>" + c.i + "</div><div class='t'>" + otmEsc(c.t) + "</div></div>" + (pos ? "<div class='pos'>" + otmEsc(pos) + "</div>" : "") + "</div>"; }
function otmReadingSave(kind, text, syn) { var p = otmProg(); p.readings = (p.readings || []); p.readings.unshift({ k: kind, t: Date.now(), x: String(text).slice(0, 900), s: syn ? String(syn).replace(/<[^>]+>/g, "").slice(0, 900) : "" }); p.readings = p.readings.slice(0, 40); otmProgSave(); }
var OTM_FG_CROSS = [["The Heart of the Matter", "The core energy surrounding your situation right now."], ["The Crossing Influence", "The direct challenge, obstacle, or balancing force."], ["The Root Foundation", "Underlying causes, past choices, or subconscious roots."], ["The Recent Past", "Passing influences or events that brought you to this threshold."], ["The Crown & Highest Potential", "The best possible outcome or conscious aim."], ["The Near Future", "The next approaching phase or immediate shift."], ["Your Stance & Self-Image", "Your internal mindset, attitude, or psychological posture."], ["External Environment", "The surrounding influence of people, place, or fate."], ["Hopes & Shadow Fears", "Your secret longings, hidden anxieties, or internal friction."], ["The Final Culmination", "Where this momentum leads if unperturbed."]];
var OTM_FG_THREE = [["Past Roots", "What brought you here — foundational momentum."], ["Present Threshold", "Where you stand right now — active forces."], ["Future Horizon", "Where the current current leads."]];
var OTM_FG_RUNES = [["ᚠ", "Fehu", "Wealth earned, mobile force, generative energy that must circulate.", "Stagnant wealth, greed, resources drained or hoarded."], ["ᚢ", "Uruz", "Raw primordial strength, untamed vitality, endurance under trial.", "Depleted vigor, misdirected force, physical or mental weakness."], ["ᚦ", "Thurisaz", "A thorn that guards, reactive power, necessary defensive friction.", "Danger mishandled, defenselessness, impulsive malice."], ["ᚨ", "Ansuz", "Inspired speech, divine message, breath of wisdom from elders.", "Deception, advice misunderstood, quieted truth."], ["ᚱ", "Raidho", "Rightful movement, life rhythm, a journey taken in harmony.", "Disrupted rhythm, a journey gone astray, dislocation."], ["ᚲ", "Kenaz", "Controlled torchlight, creative skill, illumination in dark spaces.", "Ignorance, lost inspiration, a flame going out."], ["ᚷ", "Gebo", "A gift freely given, balanced exchange, sacred partnership.", "Unequal terms, obligations disguised as gifts, codependency."], ["ᚹ", "Wunjo", "Joy, alignment with community, harmony after trial.", "Discord, delayed fulfillment, feeling alienated from joy."], ["ᚺ", "Hagalaz", "Uncontrollable storm, disruptive awakening, necessary clearing.", "Resistance to necessary clearing, lingering ruin."], ["ᚾ", "Nauthiz", "Need-fire, resistance that builds muscle, strength forged in trial.", "Self-imposed limitation, hopeless despair, needless suffering."], ["ᛁ", "Isa", "Sacred ice, quiet stillness, a pause that preserves clarity.", "Stagnation, frozen emotions, cold isolation."], ["ᛃ", "Jera", "Natural harvest, patient cycles completing, reward for labor.", "Patience lost, bad timing, effort wasted out of season."], ["ᛇ", "Eihwaz", "World-tree axis, endurance through worlds, transformative bridge.", "Instability, lack of roots, fear of death or change."], ["ᛈ", "Perthro", "Lot-cup, mysterious destiny, hidden mechanics of Wyrd.", "Unwelcome secret revealed, ill luck, hidden traps."], ["ᛉ", "Algiz", "Sanctuary, raised shield, connection to higher guardianship.", "Vulnerability, warning unheeded, compromised guard."], ["ᛋ", "Sowilo", "Solar clarity, victory, wholeness, power at its apex.", "False confidence, burnout, light used to blind."], ["ᛏ", "Tiwaz", "Honor, spiritual justice, sacrifice made for the greater good.", "Injustice, lost focus, misplaced sacrifice."], ["ᛒ", "Berkano", "Birth, sanctuary of growth, gentle nurturing energy.", "Stunted growth, family friction, false beginnings."], ["ᛖ", "Ehwaz", "Sacred horse, steady partnership, progress made together.", "Betrayal, partners pulling apart, reckless speed."], ["ᛗ", "Mannaz", "Humanity, self within community, collective wisdom.", "Isolation, misanthropy, self-sabotage."], ["ᛚ", "Laguz", "Flowing water, intuitive deeps, yielding power of tides.", "Overwhelming emotion, illusion, drowning in feeling."], ["ᛜ", "Ingwaz", "Gestation, internal seed-power, quiet power building before release.", "Movement stalled at the threshold, impotence, stagnation."], ["ᛟ", "Othala", "Ancestral land, inheritance, legacy worth defending.", "Boundaries violated, legacy turned toxic, rootlessness."], ["ᛞ", "Dagaz", "Dawn breakthrough, total transformation of perspective, light.", "Refusal to see the new day, lingering in darkness."]];
var OTM_FG_BLANK = ["⬚", "The Blank Rune (Wyrd)", "The unknowable: fate unwritten, trust asked of the void.", "The unknowable: fate unwritten, trust asked of the void."];
var OTM_FG_R3 = [["What Was", "The origin or past momentum."], ["What Is", "The immediate present condition."], ["What Becomes", "The emerging future potential."]];
var OTM_FG_R5 = [["What Roots You", "The hidden underlying foundation."], ["What Challenges You", "The active friction shaping your resolve."], ["What Guides You", "The wisdom or higher force available."], ["What You Overlook", "The blind spot requiring attention."], ["Where This Leads", "The natural outcome of current momentum."]];
var OTM_FG_AETTS = [["Freyr's Aett", 0, 7, "creation, material vitality, and initial growth"], ["Heimdall's Aett", 8, 15, "testing, trial, storm, and endurance under pressure"], ["Tyr's Aett", 16, 23, "sovereign justice, higher order, and social consequences"]];
var OTM_FG_RAYS = [["North", -90, "The Self", "who you are being asked to become, core identity, personal integrity"], ["Northeast", -45, "Ambition", "your forward drive, the ambition or goal pulling you onward"], ["East", 0, "Reason", "thought, intellect, communication, and the truth you can speak aloud"], ["Southeast", 45, "Bonds", "kinship, loyalty, devotion, and the people bound directly to this matter"], ["South", 90, "The Body", "vitality, physical health, stamina, and the tangible toll or gift"], ["Southwest", 135, "The Shadow", "what you fear, deny, hide from others, or refuse to see in yourself"], ["West", 180, "The Heart", "emotion, love, grief, longing — what you feel rather than rationalize"], ["Northwest", -135, "Fate", "what is already settled, higher necessity, the Keeper's claim on the outcome"]];
var OTM_FG_ZONES = [["star", "The Inverted Star", 0.205, "core identity and direct personal truth", "Lands directly in the innermost star — speaking to an inescapable truth about who you are or what you carry at your core."], ["inner", "The Inner Circle", 0.335, "active present circumstances", "Falls within the Inner Circle — concerning what is actively alive, immediate, and demanding direct attention in your situation."], ["veil", "The Veil", 0.47, "tested boundaries and thresholds", "Rests upon the strained square of the Veil — marking a critical boundary, choice, or defense that is being actively tested."], ["outer", "The Outer Circle", 0.58, "what is ending or slipping beyond control", "Touches the Outer Circle — touching matters that are ending, decaying, or slipping into forces outside personal agency."], ["beyond", "Beyond the Grace", 99, "wild unwritten potential outside the working", "Fell beyond the Grace entirely — marking an element that escapes this working, completely unwritten or beyond your current scope."]];
var OTM_FG_MATS = { riverstone: ["River stones", "#8A8F8C", "#4A4E4C"], obsidian: ["Obsidian", "#2A2232", "#07050B"], crystal: ["Quartz", "#E8E4FF", "#A8A0D8"], bone: ["Bones", "#E9DFC3", "#A89B76"] };
var OTM_FG_EL = { Wands: ["Fire", "will, passion, and ambition"], Cups: ["Water", "emotional depth and intuition"], Swords: ["Air", "mental clarity and truth-telling"], Pentacles: ["Earth", "practical structure, body, and material stability"] };
function otmFgTarotSyn(D) { return __ZC(401, 110, this, arguments, new.target); }
function otmFgRuneSyn(D) { return __ZC(401, 111, this, arguments, new.target); }
function otmGraceDraw(cv) { return __ZC(401, 112, this, arguments, new.target); }
function otmFgNearRay(deg) { var best = OTM_FG_RAYS[0], bd = 999; OTM_FG_RAYS.forEach(function (r) { var d = Math.abs(((deg - r[1]) % 360 + 540) % 360 - 180); if (d < bd) {
bd = d;
best = r;
} }); return best; }
function otmDivineOpen(tab) { return __ZC(401, 113, this, arguments, new.target); }
var OTM_STARS = [
{ n: "The Great Bear", i: "🐻", s: [[30, 40], [70, 46], [105, 52], [135, 62], [150, 95], [195, 100], [200, 62]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
t: "A long time ago, the Greeks said, a girl named Callisto was turned into a bear. Zeus set her in the sky so she would always be safe. Seven of her bright stars make the shape we call the Big Dipper, or the Plough.", f: "Two stars at the end of the Dipper point straight to the North Star." },
{ n: "Orion the Hunter", i: "🏹", s: [[60, 20], [150, 30], [95, 80], [110, 82], [125, 84], [70, 140], [160, 135]], e: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
t: "Orion was the greatest hunter of the old stories. He boasted he could catch any animal on Earth, so a little scorpion was sent to stop him. Now they are on opposite sides of the sky and never meet.", f: "The three stars in a row are Orion's Belt. You can see them all over the world." },
{ n: "Cassiopeia the Queen", i: "👑", s: [[20, 60], [65, 100], [105, 55], [150, 95], [195, 45]], e: [[0, 1], [1, 2], [2, 3], [3, 4]],
t: "Queen Cassiopeia said she was more beautiful than the sea nymphs. As a lesson, she was put on a throne in the sky that goes round and round, so half the year she hangs upside down!", f: "She looks like a big letter W, or an M, depending on the time of year." },
{ n: "Leo the Lion", i: "🦁", s: [[50, 50], [60, 30], [85, 25], [95, 45], [80, 70], [90, 95], [160, 85], [190, 105], [150, 110]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 5]],
t: "Leo is the lion that Heracles, the strongest hero, had to catch as the first of his twelve great tasks. Its fur was so tough no arrow could pierce it.", f: "The lion's head looks like a backwards question mark." },
{ n: "The Scorpion", i: "🦂", s: [[40, 30], [50, 50], [70, 62], [95, 70], [115, 90], [125, 115], [150, 128], [175, 118], [180, 98]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
t: "This is the little scorpion that stopped Orion. When the Scorpion rises in the summer sky, Orion sets and hides, still keeping away from it.", f: "Its heart is a bright red star called Antares, which means the rival of Mars." },
{ n: "The Swan", i: "🦢", s: [[110, 20], [110, 60], [110, 95], [110, 135], [55, 70], [165, 55]], e: [[0, 1], [1, 2], [2, 3], [4, 1], [1, 5]],
t: "The Swan flies along the river of stars we call the Milky Way, with its long neck stretched out. Its stars make a big cross, so it is also called the Northern Cross.", f: "The bright star in its tail is Deneb, one of the brightest stars in the summer sky." }
];
function otmStarCanvas(cv, C) { return __ZC(401, 114, this, arguments, new.target); }
function otmKidsOpen(tab) { return __ZC(401, 115, this, arguments, new.target); }
var OTM_RECIPES = [
["stillwater", 1, "Draught of Still Waters", "A calming brew for a restless mind, drawn cold from moonlit wells. The gentlest working in this book, a fair place to begin.", ["sage", "moon", "water"], "ccw", 4, [2, 4], "#00ffcc", "Sage before the pale petal, water last of all. Turn the ladle against the sun's path, four full circles. Keep the flame low and patient.", "Add in order: Silverleaf Sage (chopped), Moonpetal (plucked), Spring Water (steeped). Stir counter-clockwise, 4 full turns. Heat between 2 and 4."],
["secondsight", 1, "Tincture of Second Sight", "Sharpens the inner eye. Old texts warn it tastes of soil and regret, but the visions are said to be true.", ["mugwort", "moon", "raven"], "cw", 6, [4, 6], "#d000ff", "Bitter herb first, then the pale petal, then the black plume laid to rest atop. Stir with the sun, six turns. A middling fire, no more.", "Add in order: Mugwort (chopped), Moonpetal (plucked), Raven Feather (plucked). Stir clockwise, 6 full turns. Heat between 4 and 6."],
["chamomilecalm", 1, "Chamomile Calm", "The mildest sleep-aid this book teaches, sweet enough that even reluctant patients drink it without complaint.", ["chamomile", "honeycomb", "water"], "ccw", 3, [1, 3], "#39ff14", "Gold-eyed bloom, steeped soft, then the sun-kept sweetness, then water to carry it down. Turn against the sun, three slow circles. The barest flame will do.", "Add in order: Chamomile (steeped), Honeycomb (steeped), Spring Water (steeped). Stir counter-clockwise, 3 full turns. Heat between 1 and 3."],
["emberheart", 2, "Ember Heart Elixir", "A fortifying brew for cold nerves before difficult work. Runs hot, mind your fingers and your flame. The root must be ground before it will yield anything.", ["dragon", "mandrake", "water"], "cw", 8, [7, 9], "#9900ff", "Resin of the dragon, ground fine, goes first, the twisted root second, water to cool what follows. Stir with the sun, eight turns, and let the flame run high.", "Add in order: Dragon's Blood Resin (ground), Mandrake Root (ground), Spring Water (steeped). Stir clockwise, 8 full turns. Heat between 7 and 9."],
["wardblacksalt", 2, "Ward of Black Salt", "Poured across a threshold rather than drunk, a working meant to keep something out, not let something in. Four ingredients now, and each must be handled its own way.", ["mugwort", "blacksalt", "ironfilings", "juniper"], "ccw", 6, [3, 6], "#00ff66", "Bitter herb first to open the ward, salt burned black next, iron swept from the forge floor, and the sharp berry last to seal it. Against the sun, six turns. A middling fire.", "Add in order: Mugwort (chopped), Black Salt (ground), Iron Filings (plucked), Juniper Berries (chopped). Stir counter-clockwise, 6 full turns. Heat between 3 and 6."],
["luckcrow", 2, "Luck of the Crow", "Carried rather than drunk by some, a dab on the wrist before a gamble, a journey, or an ask you're not sure will be granted.", ["crowsfoot", "honeycomb", "rosequartz"], "cw", 5, [2, 4], "#d000ff", "Five-fingered leaf first, sweetness second, and the warmed dust, ground fine, to close it. With the sun, five turns. A gentle flame.", "Add in order: Crow's Foot (plucked), Honeycomb (steeped), Rose Quartz Dust (ground). Stir clockwise, 5 full turns. Heat between 2 and 4."],
["nightshade", 3, "Nightshade's Repose", "The deepest sleep this book teaches so far, and the least forgiving. Wolfsbane does not pardon a careless hand, read twice before you begin.", ["wolf", "mandrake", "mugwort", "moon"], "ccw", 7, [5, 7], "#b300ff", "The purple bane, chopped with respect, goes first. Then the ground root, then the bitter herb, and the pale petal to close the working. Against the sun, seven turns. A middling fire, watched closely.", "Add in order: Wolfsbane (chopped), Mandrake Root (ground), Mugwort (chopped), Moonpetal (plucked). Stir counter-clockwise, 7 full turns. Heat between 5 and 7."],
["owlwisdom", 3, "Owl's Wisdom Draught", "Not a pleasant brew to prepare, but the texts are firm on its accuracy. The moonstone does the real work, steeped until it hums.", ["owlpellet", "moonstone", "raven"], "cw", 9, [4, 6], "#00ffcc", "What the owl left behind, chopped apart, then the moon's dust, steeped till it hums, then the black plume to finish. With the sun, nine turns. A middling fire.", "Add in order: Owl Pellet (chopped), Powdered Moonstone (steeped), Raven Feather (plucked). Stir clockwise, 9 full turns. Heat between 4 and 6."],
["salamanderveil", 3, "Salamander's Veil", "Worn like a second skin against heat and flame. Runs hotter than almost anything else in this book, brew it with the windows open.", ["salamander", "dragon", "blacksalt"], "cw", 7, [8, 10], "#39ff14", "Ash of the salamander, gathered clean, resin of the dragon ground fine, salt burned black to bind them. With the sun, seven turns. Let the flame run near to its limit.", "Add in order: Salamander Ash (plucked), Dragon's Blood Resin (ground), Black Salt (ground). Stir clockwise, 7 full turns. Heat between 8 and 10."],
["basiliskward", 3, "Basilisk's Ward", "A working few attempt twice. The scale doesn't want to grind, and for good reason, so the old texts say to keep your eyes elsewhere while you work.", ["basilisk", "ironfilings", "juniper", "blacksalt"], "cw", 10, [6, 8], "#00ff66", "Basilisk scale, ground with the eyes averted, goes first. Iron filings plucked second, sharp berry chopped third, salt burned black ground last. With the sun, ten turns. A strong, watchful flame.", "Add in order: Basilisk Scale (ground), Iron Filings (plucked), Juniper Berries (chopped), Black Salt (ground). Stir clockwise, 10 full turns. Heat between 6 and 8."],
["belladonnasleep", 4, "Belladonna's Long Sleep", "The deepest sleep in this entire book, and the least forgiving of a careless hand. Measure twice. Ask someone to watch over whoever drinks it.", ["belladonna", "nightcap", "chamomile", "moon"], "ccw", 10, [3, 5], "#9900ff", "The sweet dark berry, chopped with the greatest care, first. The cellar mushroom second, chopped as well. Then the gold bloom steeped soft, then the pale petal to close it gently. Against the sun, ten turns. A low, patient flame.", "Add in order: Belladonna Berries (chopped), Nightcap Mushroom (chopped), Chamomile (steeped), Moonpetal (plucked). Stir counter-clockwise, 10 full turns. Heat between 3 and 5."],
["serpentrenewal", 4, "Serpent's Renewal", "Brewed for letting go of what no longer serves, a hard year, an old grief, a name you don't answer to anymore.", ["snakeskin", "hawthorn", "water", "honeycomb"], "cw", 8, [5, 7], "#39ff14", "The shed skin, cut fine, goes first. Then the red berry chopped, then water steeped, then sweetness steeped to finish it kindly. With the sun, eight turns. A steady fire.", "Add in order: Snake Skin (chopped), Hawthorn Berries (chopped), Spring Water (steeped), Honeycomb (steeped). Stir clockwise, 8 full turns. Heat between 5 and 7."],
["grandelixir", 4, "Grand Elixir of Second Life", "The final page of this grimoire, and the reason the rest exist. Every technique in this book, asked for at once. Few brew it on the first attempt.", ["dragon", "mandrake", "moonstone", "belladonna"], "ccw", 12, [6, 8], "#d000ff", "Resin of the dragon ground fine, the twisted root ground down, the moon's dust steeped till it hums, and the dark berry chopped last of all. Against the sun, twelve turns, patience above all. A high, steady fire.", "Add in order: Dragon's Blood Resin (ground), Mandrake Root (ground), Powdered Moonstone (steeped), Belladonna Berries (chopped). Stir counter-clockwise, 12 full turns. Heat between 6 and 8."],
["phoenixember", 4, "Phoenix Ember Draught", "Said to ease the worst kind of grief, the kind that follows losing something that was supposed to be permanent.", ["phoenixdown", "mothwing", "dragon", "honeycomb"], "ccw", 11, [5, 6], "#b300ff", "Down that fell on its own, plucked gently, goes first. Moth-wing dust steeped soft second. Dragon's resin ground third, sweetness steeped last to close the wound kindly. Against the sun, eleven turns. A middling, gentle flame.", "Add in order: Phoenix Down (plucked), Moth Wing Dust (steeped), Dragon's Blood Resin (ground), Honeycomb (steeped). Stir counter-clockwise, 11 full turns. Heat between 5 and 6."],
["solgolden", 5, "Sol's Golden Draught", "A working built around gold itself, warmth without recklessness. The most ingredient-hungry brew this side of the Great Work.", ["gold", "dragon", "honeycomb", "moon", "chamomile"], "cw", 14, [7, 8], "#39ff14", "Gold, coaxed molten in the crucible, goes first. The dragon's resin, ground fine, follows. Sweetness steeped soft is third, the pale petal plucked is fourth, and chamomile steeped closes it. With the sun, fourteen turns. A high, unwavering flame.", "Add in order: Gold (melted), Dragon's Blood Resin (ground), Honeycomb (steeped), Moonpetal (plucked), Chamomile (steeped). Stir clockwise, 14 full turns. Heat between 7 and 8."],
["lunamercury", 5, "Luna's Mercury Tide", "Silver answers the moon, quicksilver answers nothing at all. This working asks for a very steady hand and an exact flame.", ["silver", "mercury", "water", "moonstone"], "ccw", 13, [2, 3], "#00ffcc", "Silver, melted under a watching moon, goes first. Quicksilver molten beside it second, treated with real care. Water steeped third, moon-dust steeped till it hums fourth. Against the sun, thirteen turns. A low, exact flame, barely above ember.", "Add in order: Silver (melted), Mercury (melted, handle with care), Spring Water (steeped), Powdered Moonstone (steeped). Stir counter-clockwise, 13 full turns. Heat between 2 and 3."],
["ironmars", 5, "Iron Will of Mars", "A fortifying working for battles that haven't happened yet. Iron does not want to melt, and the furnace knows it.", ["iron", "tin", "dragon", "blacksalt"], "cw", 15, [8, 9], "#9900ff", "Iron, stubborn in the crucible, goes first and takes the longest. Tin follows, easier by far. Dragon's resin ground third, black salt ground last to bind it. With the sun, fifteen turns. A high, roaring flame.", "Add in order: Iron (melted), Tin (melted), Dragon's Blood Resin (ground), Black Salt (ground). Stir clockwise, 15 full turns. Heat between 8 and 9."],
["greatwork", 5, "The Great Work", "The final page in this grimoire, or the only one that matters, depending who you ask. Every station in this room, every technique this book has taught, at once.", ["lead", "mandrake", "belladonna", "moon", "moonstone"], "ccw", 16, [6, 7], "#d000ff", "Lead, heaviest and slowest, melted first with real caution. The twisted root ground second. The dark berry chopped third, treated with the greatest care. The pale petal plucked fourth. The moon's dust steeped last, till it hums. Against the sun, sixteen turns, patience above all else. A high, steady flame, and nothing short of exact will do.", "Add in order: Lead (melted, handle with care), Mandrake Root (ground), Belladonna Berries (chopped, handle with care), Moonpetal (plucked), Powdered Moonstone (steeped). Stir counter-clockwise, 16 full turns. Heat between 6 and 7."]
];
var OTM_LEVELS = ["Novice", "Journeyman", "Adept", "Master", "Grand Alchemist"];
var OTM_STATIONS = { grind: ["🪨", "Mortar and pestle", "grind"], chop: ["🔪", "Knife and board", "chop"], pluck: ["🪶", "Gathering rack", "pluck"], steep: ["💧", "Water basin", "steep"], melt: ["🔥", "Furnace and crucible", "melt"] };
var OTM_STARTER = ["sage", "moon", "water"];
function otmIng(id) { for (var i = 0; i < OTM_INGS.length; i++)
if (OTM_INGS[i][0] === id)
return OTM_INGS[i]; return null; }
function otmIngLevel(id) { var lv = 99; OTM_RECIPES.forEach(function (r) { if (r[4].indexOf(id) >= 0 && r[1] < lv)
lv = r[1]; }); return lv; }
function otmPot() { var p = otmProg(); if (!p.alch || !p.alch.disc)
p.alch = { unl: [1], done: [], disc: OTM_STARTER.slice() }; return p.alch; }
function otmPotionKnown() { return otmPot().disc; }
function otmPotTop() { return Math.max.apply(null, otmPot().unl); }
function otmBench() { if (!OTM.bench)
OTM.bench = { st: {}, pot: [], dir: null, turns: 0, heat: 0, rec: null }; return OTM.bench; }
function otmPotionOpen(tab) { return __ZC(401, 116, this, arguments, new.target); }
function otmPotionResult(pg, B) { return __ZC(401, 117, this, arguments, new.target); }
var OTM_CB_URL = "https://www.obsidianmoontemple.com/_functions/cookbookEntries", OTM_CB_KEY = "otm_cookbook_v1";
function otmCbList(t) { return t ? String(t).split(/\r?\n|,\s*/).map(function (x) { return x.trim(); }).filter(Boolean) : []; }
function otmCbLoad() { return __ZC(401, 118, this, arguments, new.target); }
function otmCookbookOpen(at) { return __ZC(401, 119, this, arguments, new.target); }
function otmCbOffer() { return __ZC(401, 120, this, arguments, new.target); }
function otmCbWire(box) { return __ZC(401, 121, this, arguments, new.target); }
var OTM_COUNSEL = [["One-on-One Session with the High Priest", "30 minutes · from $25"], ["Member Support Counseling", "45 minutes"]];
function otmCounselOpen() { return __ZC(401, 122, this, arguments, new.target); }
function otmCauldronCol(col) { var C = OTM.cauldron; if (!C)
return; C.brew.material = otmMat(col, null, { e: col, ei: 0.55 }); C.bubbles.forEach(function (B) { B.m.material = otmMat(col, null, { op: 0.7, e: col, ei: 0.6 }); }); }
var OTM_SATCHEL = "otm_satchel_v1", OTM_SAT_MAX = 5;
function otmSatchel() { try {
return JSON.parse(localStorage.getItem(OTM_SATCHEL) || "{}") || {};
}
catch (e) {
return {};
} }
function otmSatchelPut(b) { try {
localStorage.setItem(OTM_SATCHEL, JSON.stringify(b));
}
catch (e) { } }
function otmShelfOpen(i) { return __ZC(401, 123, this, arguments, new.target); }
var OTM_CANDLES = [["white", "White", 0xF4F0E4, "peace, cleansing, new beginnings"], ["black", "Black", 0x18141C, "protection, banishing, the dark moon"], ["red", "Red", 0xC8202A, "love, courage, life's fire"],
["pink", "Pink", 0xF08AB0, "affection, friendship, healing the heart"], ["orange", "Orange", 0xF0801A, "success, joy, the Samhain fires"], ["yellow", "Yellow", 0xF0D23A, "the mind, study, clear thinking"],
["green", "Green", 0x2A9A4A, "growth, prosperity, healing"], ["blue", "Blue", 0x2A5AC8, "calm, truth, sleep and dreams"], ["purple", "Purple", 0x7A2AA8, "spirit, wisdom, power"],
["silver", "Silver", 0xD8DCF0, "the Moon and her mysteries"], ["gold", "Gold", 0xE8B83A, "the Sun, blessings, abundance"]];
var OTM_OFFER = [["candle", "🕯️ A candle"], ["incense", "🌫️ Incense"], ["flowers", "💐 Flowers"], ["bread", "🍞 Bread and wine"], ["fruit", "🍎 Fruit of the season"], ["words", "📜 Words alone"]];
var OTM_INCENSE = ["Frankincense", "Myrrh", "Sandalwood", "Dragon's blood", "Copal", "Sweetgrass", "Rose"];
function otmAltarFetch() { return __ZC(401, 124, this, arguments, new.target); }
function otmAltarMine() { var p = otmProg(), now = Date.now(); return (p.offers || []).filter(function (o) { return now - o.at < 86400000; }); }
function otmAltarAll() { var L = (OTM.altarList || []).filter(function (o) { return o.kind !== "basin"; }); if (!otmSigned() || !OTM.altarList)
L = L.concat(otmAltarMine().map(function (o) { return { kind: o.kind, colour: o.colour, dedicated: o.to }; })); return L; }
var OTM_DEITIES = [["The Obsidian Mother", "Temple Prime Current", "prime"], ["Hecate", "Moon: Crossroads Queen", "moon"], ["Brigid", "Celtic: Hearth Threshold", "flame"], ["Persephone", "Greek: Return of Maiden", "flower"], ["Freyja", "Norse: Spring Fertility", "fertility"], ["Eostre", "Germanic: Dawn Goddess", "dawn"], ["Belenos", "Celtic: Sun Fire God", "sunwheel"], ["Lugh", "Celtic: Harvest King", "crown"], ["Freyr", "Norse: Summer Growth", "rain"], ["Horus", "Egyptian: Sky Solar Peak", "eye"], ["Apollo", "Greek: Divine Warmth", "sun"], ["Demeter", "Greek: Agriculture Harvest", "harvest"], ["Dionysus", "Greek: Sacred Grape Vine", "vine"], ["Mabon", "Welsh: Second Harvest Light", "horn"], ["Chang'e", "Chinese: Autumn Moon Goddess", "lunar"], ["The Cailleach", "Celtic: Winter Crone Ruler", "staff"], ["Skaði", "Norse: Mountains & Hunt", "bow"], ["Hades & Persephone", "Greek: Underworld Dark Reign", "gate"]];
var OTM_GLYPH = { prime: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z", moon: "M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-.67-3.4 6.75 6.75 0 0 1-8.33-8.33A9.67 9.67 0 0 0 12 3z",
flame: "M17.5 11.5c-.83-1.5-2.5-3.5-4-5.5-1 2-2.5 3.5-3.5 5.5A4.5 4.5 0 1 0 17.5 11.5z", flower: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M12 2v4 M12 18v4 M2 12h4 M18 12h4 M5 5l3 3 M16 16l3 3 M5 19l3-3 M16 8l3-3",
fertility: "M12 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm6 11c0-3.3-2.7-6-6-6s-6 2.7-6 6v7h2v-7c0-2.2 1.8-4 4-4s4 1.8 4 4v7h2v-7z", dawn: "M12 4v3 M5 7l2 2 M19 7l-2 2 M2 14h20 M4 14a8 8 0 0 1 16 0",
sunwheel: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-20v20M2 12h20M5 5l14 14M5 19L14 5", crown: "M2 18l2-11 5 5 3-7 3 7 5-5 2 11H2z",
rain: "M17 12a5 5 0 0 0-4-9 7 7 0 0 0-11 6 4 4 0 0 0 1 8h14a4.5 4.5 0 0 0 0-9z M8 18v3 M12 18v3 M16 18v3", eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 1v2 M12 21v2 M1 12h2 M21 12h2", harvest: "M6 22V10a6 6 0 0 1 12 0v12 M12 4v6", vine: "M12 22a5 5 0 0 0 5-5c0-4-5-9-5-9s-5 5-5 9a5 5 0 0 0 5 5z",
horn: "M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z M12 9v6M9 12h6", lunar: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2a10 10 0 0 0 0 20z",
staff: "M12 2a3 3 0 0 0-3 3v17h2V5a1 1 0 0 1 2 0v2h2V5a3 3 0 0 0-3-3z", bow: "M6 3c0 6 3 9 6 9s6-3 6-9 M12 12v9", gate: "M19 22V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v17 M3 22h18" };
var OTM_SEASONS = [["imbolc", "Imbolc, the candle thaw", 0xFFE1A0, 0x6B6248], ["ostara", "Ostara, the spring bloom", 0xBEEBA0, 0x457A4C], ["beltane", "Beltane, the fire blossom", 0xFF5F3C, 0x8A3D30], ["litha", "Litha, the solar crown", 0xFFD450, 0x8F7429],
["lammas", "Lammas, the first harvest", 0xE4A146, 0x87602D], ["mabon", "Mabon, the autumn balance", 0xCC6430, 0x84492F], ["samhain", "Samhain, the veil night", 0xAA5AEB, 0x5F3A72], ["yule", "Yule, the winter evergreen", 0xA0E4F0, 0x3D7580], ["prime", "The temple's own", 0x7928CA, 0x2A2833]];
function otmSeasonNow(at) {
var d = new Date(at || Date.now()), md = (d.getMonth() + 1) * 100 + d.getDate(), W = [[201, "imbolc"], [320, "ostara"], [501, "beltane"], [621, "litha"], [801, "lammas"], [922, "mabon"], [1031, "samhain"], [1221, "yule"]], k = "yule";
W.forEach(function (w) { if (md >= w[0])
k = w[1]; });
return k;
}
function otmAspect() { return __ZC(401, 125, this, arguments, new.target); }
function otmAltarLogFetch(force) { return __ZC(401, 126, this, arguments, new.target); }
function otmStave(cv, text) { return __ZC(401, 127, this, arguments, new.target); }
function otmGlyphSvg(g, sz, col) { return "<svg viewBox='0 0 24 24' width='" + sz + "' height='" + sz + "' fill='none' stroke='" + (col || "#D4AF37") + "' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'><path d='" + (OTM_GLYPH[g] || OTM_GLYPH.prime) + "'/></svg>"; }
function otmAltarCard() { if (!otmWixOn("altar"))
return otmWixShut("altar"); otmAltarFetch(); otmAltarLogFetch(); otmAltarOpen("offer"); }
function otmAltarOpen(tab) { return __ZC(401, 128, this, arguments, new.target); }
var OTM_KZ = { "FAMILIAR_STAGES": [{ "key": "egg", "label": "Egg", "min": 0, "scale": 0.55 }, { "key": "hatchling", "label": "Hatchling", "min": 5, "scale": 0.7 }, { "key": "juvenile", "label": "Juvenile", "min": 20, "scale": 0.86 }, { "key": "mature", "label": "Mature", "min": 50, "scale": 1 }], "FAMILIARS": [{ "id": "owl", "emoji": "🦉", "name": "Owl", "word": "owl" }, { "id": "cat", "emoji": "🐈‍⬛", "name": "Black Cat", "word": "cat" }, { "id": "raven", "emoji": "🐦‍⬛", "name": "Raven", "word": "raven" }, { "id": "fox", "emoji": "🦊", "name": "Fox", "word": "fox" }, { "id": "toad", "emoji": "🐸", "name": "Toad", "word": "toad" }, { "id": "dragon", "emoji": "🐉", "name": "Dragon", "word": "dragon" }], "FAMILIAR_COLORS": [{ "name": "Natural", "hue": 0, "hex": null }, { "name": "Crimson", "hue": 320, "hex": "#D6455C" }, { "name": "Amber", "hue": 50, "hex": "#E0973E" }, { "name": "Gold", "hue": 40, "hex": "#E3C567" }, { "name": "Emerald", "hue": 110, "hex": "#4FA672" }, { "name": "Teal", "hue": 170, "hex": "#3FA9A0" }, { "name": "Sapphire", "hue": 210, "hex": "#3E7FBF" }, { "name": "Violet", "hue": 270, "hex": "#9C6FD9" }], "CHAPTERS": [{ "id": "fear", "station": "station1", "title": "Facing Your Fear", "guide": "Hekate, the Owl of the Whispering Woods", "color": "#E8834C", "emoji": "🦉", "story": ["In the whispering woods, shadows sometimes grow long and start telling scary stories. Ember, a little fox kit, knew this well — his tail would tuck and his nose would wrinkle with worry every time the dark seemed too deep.", "One night, lost in a moonlit clearing, Ember met Hekate, the wise owl. \"Fear is a shadow,\" she told him, \"but so is bravery — and within you burns a flame brighter than any darkness.\" When Ember looked around, he found his whole pack of kits glowing beside him. Alone, a flame flickers. Together, it becomes a bonfire."], "activity": { "type": "braveryTrial", "title": "The Bonfire Trial", "prompt": "Hekate has three riddles about bravery. Answer True or False to grow the bonfire. Answer carefully — a wrong guess won't grow your flame.", "statements": [{ "text": "Being brave means never feeling scared at all.", "answer": false, "feedback": "Not quite — bravery isn't the absence of fear. It's roaring anyway, just like Ember." }, { "text": "A flame is stronger when it's shared with others.", "answer": true, "feedback": "Exactly. Alone, a flame flickers. Together, it's a bonfire." }, { "text": "Once you're brave one time, shadows never come back.", "answer": false, "feedback": "Shadows do come back sometimes — but so does your bravery, every single time you need it." }], "finalMessage": "A full bonfire now! Hekate hoots softly: \"Fear whispers, but bravery roars — and yours is loud enough for the whole woods to hear.\"" }, "blessing": "May the smallest flame in you always find a pack to burn brighter with. You are never alone in the dark." }, { "id": "spark", "station": "station1", "title": "Embracing Your Inner Spark", "guide": "Hecate, Queen of Crossroads", "color": "#9C89C7", "emoji": "✨", "story": ["Hecate waits at a moonlit crossroads, where every path leads to a different piece of your own inner magic — a glittering meadow, a cozy library, a roaring fire, a playful labyrinth.", "\"Choose one, little wanderer,\" she whispers, \"and let your intuition guide you.\" There's no wrong path here — only the one that helps you discover what makes your own light shine a little differently than anyone else's."], "activity": { "type": "pathThenMatch", "title": "Hecate's Crossroads", "prompt": "First, explore all four paths. Then match each one to the gift it holds.", "paths": [{ "emoji": "🌾", "label": "The Meadow", "text": "You wander among glittering wildflowers. Your spark grows through nature, quiet, and noticing small wonders." }, { "emoji": "📚", "label": "The Library", "text": "Shelves of glowing stories surround you. Your spark grows through curiosity, questions, and imagination." }, { "emoji": "🔥", "label": "The Fire", "text": "Warmth and dancing flames welcome you. Your spark grows through passion, courage, and bold feeling." }, { "emoji": "🌀", "label": "The Labyrinth", "text": "Playful twists and turns delight you. Your spark grows through mischief, movement, and discovery." }], "pairs": [{ "a": "🌾 The Meadow", "b": "Nature & quiet noticing" }, { "a": "📚 The Library", "b": "Curiosity & imagination" }, { "a": "🔥 The Fire", "b": "Passion & courage" }, { "a": "🌀 The Labyrinth", "b": "Mischief & discovery" }] }, "blessing": "Friendly smiles, like sunshine bright, chase away the darkest night. Whatever path you chose tonight, your spark is exactly the right one." }, { "id": "ymir", "station": "station1", "title": "The Seed of Ymir", "guide": "Odin, Vili, and Ve", "color": "#6E9B7A", "emoji": "🌱", "story": ["Before the sun peeked or the moon played hide-and-seek, a giant named Ymir yawned so big his breath made clouds. Hidden deep in his beard, a tiny seed woke up — a seed holding the spark of all creation.", "Three brothers, Ve, Vili, and Odin, found the seed and planted it where fire kissed ice and earth cradled water. From that tiny seed grew Yggdrasil, the great World Tree — reaching the sun, rooted in the earth, and holding all nine worlds in its branches."], "activity": { "type": "guidedGrow", "title": "Plant Your Own Yggdrasil", "prompt": "Guess correctly at each stage to help your seed grow. A wrong guess won't stop you — just try again.", "stages": [{ "emoji": "🌰", "caption": "A tiny seed, quiet and small, waiting in the dark.", "question": "What grows first from a seed like this?", "options": [{ "emoji": "🌿", "correct": true }, { "emoji": "🍄", "correct": false }, { "emoji": "🪨", "correct": false }] }, { "emoji": "🌿", "caption": "A little shoot pushes up — the first spark of creation stirring.", "question": "What might this little shoot become?", "options": [{ "emoji": "🌳", "correct": true }, { "emoji": "🌵", "correct": false }, { "emoji": "🍂", "correct": false }] }, { "emoji": "🌳", "caption": "Yggdrasil, the World Tree, stretches toward the sun.", "question": "What do Yggdrasil's branches come to hold?", "options": [{ "emoji": "🌌", "correct": true }, { "emoji": "🐟", "correct": false }, { "emoji": "🚀", "correct": false }] }, { "emoji": "🌌", "caption": "Its branches now hold nine worlds of wonder. Even the smallest seed can grow into everything." }] }, "blessing": "Carry your own spark of creation. Tend your seeds of hope, and watch what grows." }, { "id": "truth", "station": "station1", "title": "Truth and Knowledge", "guide": "Corvus, the Curious Crow", "color": "#E3C567", "emoji": "🐦‍⬛", "story": ["Corvus the crow never craved gold or shiny trinkets like the other crows. He craved a different treasure — hidden truths and forgotten stories tucked into the corners of the world.", "Following a trail of shimmering clues across the forest floor, he learned that the brightest lights often shine from within the darkest shadows — you just have to be curious enough to go looking."], "activity": { "type": "matchPairs", "title": "Corvus's Hidden Truths", "prompt": "Match each of Corvus's treasures to the truth it whispers. Pick one from each side.", "pairs": [{ "a": "Silver thimble", "b": "A key to hidden wonders" }, { "a": "Emerald pebble", "b": "Memory of rushing rivers" }, { "a": "Crimson leaf", "b": "Tales of autumn bonfires" }, { "a": "Glow-in-the-dark stars", "b": "Scattered moonbeams to find" }, { "a": "Shadow shapes", "b": "Wisdom hidden in the dark" }, { "a": "A good story", "b": "Corvus's shiniest find of all" }] }, "blessing": "Tonight, we become the children of the Obsidian Moon, guardians of hidden knowledge and seekers of the magic that sleeps within us all." }, { "id": "challenges", "station": "station1", "title": "Facing Challenges", "guide": "Tyr and the Wolf Fenrir", "color": "#D98BA6", "emoji": "🐺", "story": ["Fenrir was a mighty wolf whose howl could shake the nine worlds — much like the fear or anger that sometimes howls inside all of us. Brute force alone couldn't tame him.", "So Tyr helped weave Gleipnir, a chain made not of iron, but of whispered kindness, purring confidence, and quiet courage. It looked delicate. It held the strongest wolf in all the worlds."], "activity": { "type": "quizChain", "title": "Weave Your Gleipnir", "itemName": "Gleipnir", "prompt": "Answer each riddle correctly to add its thread to your chain.", "questions": [{ "prompt": "When you feel scared, what helps most?", "options": [{ "label": "Kind words to yourself", "hex": "#E3C567", "correct": true }, { "label": "Yelling louder", "hex": "#888", "correct": false }, { "label": "Ignoring it completely", "hex": "#888", "correct": false }, { "label": "Running away forever", "hex": "#888", "correct": false }] }, { "prompt": "What helps calm a racing heart?", "options": [{ "label": "Deep breaths", "hex": "#9C89C7", "correct": true }, { "label": "Staying up all night worrying", "hex": "#888", "correct": false }, { "label": "Eating a whole cake", "hex": "#888", "correct": false }, { "label": "Shouting", "hex": "#888", "correct": false }] }, { "prompt": "How do you get better at something hard?", "options": [{ "label": "Practice", "hex": "#6E9B7A", "correct": true }, { "label": "Waiting for magic", "hex": "#888", "correct": false }, { "label": "Giving up right away", "hex": "#888", "correct": false }, { "label": "Avoiding it forever", "hex": "#888", "correct": false }] }, { "prompt": "Who can help you feel less alone with a challenge?", "options": [{ "label": "A friend's support", "hex": "#E8834C", "correct": true }, { "label": "No one, ever", "hex": "#888", "correct": false }, { "label": "A stranger online", "hex": "#888", "correct": false }, { "label": "Nobody needs help", "hex": "#888", "correct": false }] }, { "prompt": "What can make a hard day feel lighter?", "options": [{ "label": "Laughter", "hex": "#D98BA6", "correct": true }, { "label": "Total silence", "hex": "#888", "correct": false }, { "label": "More worry", "hex": "#888", "correct": false }, { "label": "Anger", "hex": "#888", "correct": false }] }, { "prompt": "What helps most when you have to wait for something?", "options": [{ "label": "Patience", "hex": "#8DA9C4", "correct": true }, { "label": "Panic", "hex": "#888", "correct": false }, { "label": "Rushing everyone", "hex": "#888", "correct": false }, { "label": "Giving up", "hex": "#888", "correct": false }] }] }, "blessing": "You don't need brute force to face your challenges. You weave your strength one gentle thread at a time — and that thread is stronger than it looks." }, { "id": "acceptance", "station": "station1", "title": "Kindness & Self-Acceptance", "guide": "The Ray family of Lumina", "color": "#E8834C", "emoji": "🌈", "story": ["In the land of Lumina lived a family of light rays: fiery Scarlet, gentle Jade, playful Cerulean, thoughtful Violet — and shy little Sunny, who worried his own glow seemed too ordinary next to his siblings.", "When a grumpy stormcloud cast a shadow over Lumina, it was Sunny's quiet warmth — like a sunflower hug — that held all the other rays together. Every color of light is needed to make a rainbow."], "activity": { "type": "matchPairs", "title": "Your Rainbow Friendship Quilt", "prompt": "Match each ray to what makes their light special.", "pairs": [{ "a": "Scarlet", "b": "Passionate and bold" }, { "a": "Jade", "b": "Gentle and calming" }, { "a": "Cerulean", "b": "Playful and light" }, { "a": "Violet", "b": "Thoughtful and wise" }, { "a": "Sunny", "b": "Quiet and warm" }, { "a": "You", "b": "Exactly the color the quilt needed" }] }, "blessing": "Your differences are not flaws, but brushstrokes painting the world with breathtaking beauty." }, { "id": "hope", "station": "station1", "title": "Hope and Faith", "guide": "Hope the Sunflower & Lumina the Ladybug", "color": "#E3C567", "emoji": "🌻", "story": ["Hope began as a small, frightened seed underground, unsure if she should even try to grow. \"Perhaps I can trust the sun to paint me golden,\" she whispered, and pushed upward anyway.", "She bloomed into a sunflower that sheltered tiny creatures and shared her light with everyone nearby — proof that faith isn't only for sunny days. It's the light you carry when the clouds come."], "activity": { "type": "guidedGrow", "title": "Grow Your Own Hope", "prompt": "Guess correctly at each stage to help faith take root. A wrong guess won't stop you — just try again.", "stages": [{ "emoji": "🌰", "caption": "A frightened little seed, curled up underground in the dark.", "question": "What does Hope decide to trust?", "options": [{ "emoji": "☀️", "correct": true }, { "emoji": "❄️", "correct": false }, { "emoji": "🌩️", "correct": false }] }, { "emoji": "🌱", "caption": "A tiny shoot dares to push toward the light.", "question": "What does that brave little shoot become?", "options": [{ "emoji": "🌻", "correct": true }, { "emoji": "🌵", "correct": false }, { "emoji": "🍁", "correct": false }] }, { "emoji": "🌻", "caption": "A whole sunflower now, turning her face toward the sun.", "question": "Whose fear does her light help chase away?", "options": [{ "emoji": "🐞", "correct": true }, { "emoji": "🐺", "correct": false }, { "emoji": "🕷️", "correct": false }] }, { "emoji": "🐞", "caption": "Her light spreads to others, just like Lumina the ladybug's glow in the storm. Faith shared is faith multiplied." }] }, "blessing": "May your inner sunbeams nurture themselves, chase away shadows with smiles, and share their light with everyone you meet." }, { "id": "imbolc1", "station": "station1", "title": "Imbolc", "guide": "Brigid, Goddess of Light", "color": "#8DA9C4", "emoji": "❄️", "story": ["When winter's grip felt endless and the villagers' hearts grew heavy, Brigid climbed a snowy hilltop and lifted her hands to the sky. A single rainbow-colored snowflake bloomed in her palm.", "\"Even in the harshest winter,\" she said, \"beauty and warmth persevere.\" The snowflake multiplied, melting the snow around it and filling the hillside with the first promise of spring."], "activity": { "type": "guidedGrow", "title": "Brigid's Seed of Light", "prompt": "Guess correctly at each stage to loosen winter's grip. A wrong guess won't stop you — just try again.", "stages": [{ "emoji": "🌨️", "caption": "Frost covers everything. Winter feels like it might never end.", "question": "What does Brigid lift to the sky?", "options": [{ "emoji": "❄️", "correct": true }, { "emoji": "🪨", "correct": false }, { "emoji": "🍂", "correct": false }] }, { "emoji": "❄️", "caption": "A single shimmering snowflake appears in Brigid's palm.", "question": "What does her flame do to the ice?", "options": [{ "emoji": "🔥", "correct": true }, { "emoji": "🧊", "correct": false }, { "emoji": "🌊", "correct": false }] }, { "emoji": "🔥", "caption": "Her flame of hope begins to melt the ice around the village.", "question": "What pokes through as winter loosens?", "options": [{ "emoji": "🌸", "correct": true }, { "emoji": "🎃", "correct": false }, { "emoji": "⭐", "correct": false }] }, { "emoji": "🌸", "caption": "The first bud of spring pokes through — new beginnings are always possible." }] }, "blessing": "Even the smallest spark can become a big flame, and even the smallest seed can grow into something beautiful." }, { "id": "hardwork", "station": "station1", "title": "Hard Work", "guide": "The Dwarves of the Forge", "color": "#E8834C", "emoji": "🔨", "story": ["A mighty hammer isn't made in a single strike. It takes patient hands, careful craft, and hours of steady effort at the forge before it's strong enough to hold real magic.", "Every practice, every try-again, every bit of focus you put in is another strike of the hammer — shaping something in you that grows sturdier each time you show up for it."], "activity": { "type": "quizChain", "title": "Forge Your Mini-Mjolnir", "itemName": "Mjolnir", "prompt": "Answer each riddle correctly to add its strike to your hammer.", "questions": [{ "prompt": "What do you bring to the forge first?", "options": [{ "label": "Effort", "hex": "#E8834C", "correct": true }, { "label": "Excuses", "hex": "#888", "correct": false }, { "label": "Nothing at all", "hex": "#888", "correct": false }, { "label": "Someone else's work", "hex": "#888", "correct": false }] }, { "prompt": "What helps you strike the metal true?", "options": [{ "label": "Focus", "hex": "#E3C567", "correct": true }, { "label": "Daydreaming", "hex": "#888", "correct": false }, { "label": "Rushing", "hex": "#888", "correct": false }, { "label": "Distraction", "hex": "#888", "correct": false }] }, { "prompt": "What do you need when the metal won't bend right away?", "options": [{ "label": "Patience", "hex": "#6E9B7A", "correct": true }, { "label": "Anger", "hex": "#888", "correct": false }, { "label": "Giving up", "hex": "#888", "correct": false }, { "label": "Blame", "hex": "#888", "correct": false }] }, { "prompt": "What do you do after a failed strike?", "options": [{ "label": "Try again", "hex": "#9C89C7", "correct": true }, { "label": "Quit forever", "hex": "#888", "correct": false }, { "label": "Break the hammer", "hex": "#888", "correct": false }, { "label": "Blame the forge", "hex": "#888", "correct": false }] }, { "prompt": "What do you feel once the hammer is finally done?", "options": [{ "label": "Pride in the work", "hex": "#D98BA6", "correct": true }, { "label": "Nothing at all", "hex": "#888", "correct": false }, { "label": "Regret", "hex": "#888", "correct": false }, { "label": "Boredom", "hex": "#888", "correct": false }] }] }, "blessing": "The hammer gives confidence, not because it's magic, but because of every steady strike it took to make it." }, { "id": "friendship", "station": "station1", "title": "Friendship", "guide": "Anansi the Spider", "color": "#9C89C7", "emoji": "🕷️", "story": ["Anansi spun a web all the way to the sky palace to win stories for his village, who had none to share around the fire. Nyame the Sky God set him three impossible tasks — and clever Anansi outwitted every one.", "He brought the stories home in a golden box. Along the way his trickster side let a few escape — but what mattered most wasn't the stories themselves. It was that the village learned to spin their own, together."], "activity": { "type": "quizChain", "itemName": "friendship bracelet", "title": "Weave a Friendship Bracelet", "prompt": "Answer each riddle correctly to add its bead to your bracelet.", "questions": [{ "prompt": "What makes hard days feel lighter with a friend?", "options": [{ "label": "Laughter", "hex": "#E3C567", "correct": true }, { "label": "Arguing", "hex": "#888", "correct": false }, { "label": "Ignoring them", "hex": "#888", "correct": false }, { "label": "Competing always", "hex": "#888", "correct": false }] }, { "prompt": "What do you need to believe a friend will keep your secret?", "options": [{ "label": "Trust", "hex": "#6E9B7A", "correct": true }, { "label": "Suspicion", "hex": "#888", "correct": false }, { "label": "Gossip", "hex": "#888", "correct": false }, { "label": "Rumors", "hex": "#888", "correct": false }] }, { "prompt": "What does Anansi finally do with the stories?", "options": [{ "label": "Shares them", "hex": "#E8834C", "correct": true }, { "label": "Hides them forever", "hex": "#888", "correct": false }, { "label": "Sells them", "hex": "#888", "correct": false }, { "label": "Burns them", "hex": "#888", "correct": false }] }, { "prompt": "What makes someone feel truly heard?", "options": [{ "label": "Listening", "hex": "#9C89C7", "correct": true }, { "label": "Interrupting", "hex": "#888", "correct": false }, { "label": "Talking over them", "hex": "#888", "correct": false }, { "label": "Walking away", "hex": "#888", "correct": false }] }, { "prompt": "What matters most when a friend needs you?", "options": [{ "label": "Showing up", "hex": "#D98BA6", "correct": true }, { "label": "Making excuses", "hex": "#888", "correct": false }, { "label": "Being too busy", "hex": "#888", "correct": false }, { "label": "Pretending not to notice", "hex": "#888", "correct": false }] }, { "prompt": "What helps a friendship survive a mistake?", "options": [{ "label": "Forgiving", "hex": "#8DA9C4", "correct": true }, { "label": "Grudges", "hex": "#888", "correct": false }, { "label": "Revenge", "hex": "#888", "correct": false }, { "label": "Silence forever", "hex": "#888", "correct": false }] }] }, "blessing": "The greatest treasures are never material possessions, but the bonds of friendship and the stories we share." }, { "id": "family", "station": "station1", "title": "The Power of Family", "guide": "Willow and Her Clan", "color": "#6E9B7A", "emoji": "🏡", "story": ["Willow gathered her family to sketch a crest for a witches' competition — a cauldron of shimmering moonlight in the center, a star map of everyone who came before them around the edge.", "At the competition, Willow stood proudly beside her family, crest held high. Some magic isn't cast alone. It's held up by everyone standing beside you."], "activity": { "type": "quizChain", "itemName": "family crest", "title": "Design Your Family Crest", "prompt": "Answer each riddle correctly to add its piece to your crest.", "questions": [{ "prompt": "What binds a family together across generations?", "options": [{ "label": "A shared story", "hex": "#9C89C7", "correct": true }, { "label": "Forgetting the past", "hex": "#888", "correct": false }, { "label": "Strangers", "hex": "#888", "correct": false }, { "label": "Competition", "hex": "#888", "correct": false }] }, { "prompt": "What do families repeat year after year?", "options": [{ "label": "A tradition", "hex": "#E3C567", "correct": true }, { "label": "A one-time event", "hex": "#888", "correct": false }, { "label": "Nothing at all", "hex": "#888", "correct": false }, { "label": "Chaos", "hex": "#888", "correct": false }] }, { "prompt": "What brings a family to the table together?", "options": [{ "label": "A favorite meal", "hex": "#E8834C", "correct": true }, { "label": "Eating alone", "hex": "#888", "correct": false }, { "label": "Skipping dinner", "hex": "#888", "correct": false }, { "label": "Fighting over food", "hex": "#888", "correct": false }] }, { "prompt": "What makes family laugh without even trying?", "options": [{ "label": "An inside joke", "hex": "#6E9B7A", "correct": true }, { "label": "A rulebook", "hex": "#888", "correct": false }, { "label": "A chore chart", "hex": "#888", "correct": false }, { "label": "Silence", "hex": "#888", "correct": false }] }, { "prompt": "What holds a family up on a hard day?", "options": [{ "label": "A quiet kindness", "hex": "#D98BA6", "correct": true }, { "label": "Being ignored", "hex": "#888", "correct": false }, { "label": "Harsh words", "hex": "#888", "correct": false }, { "label": "Indifference", "hex": "#888", "correct": false }] }] }, "blessing": "Together, like a meadow of sunflowers painting the world with golden smiles, family helps us hold our light up high." }, { "id": "selfcare", "station": "station1", "title": "Self-Care Sparkle", "guide": "Sparkle & Pip the Puffball", "color": "#D98BA6", "emoji": "🫧", "story": ["Pip the puffball hated getting dirty — until his friend Luna the ladybug showed him that getting a little messy is just part of having fun, as long as you know how to take care of yourself afterward.", "Real superheroes need their rest, their washing, and their gentle care too. Taking care of yourself isn't the opposite of adventure — it's what makes the next one possible."], "activity": { "type": "sequenceOrder", "title": "Sparkle Superhero Routine", "prompt": "Tap the steps in the order a superhero should do them before bed. A step out of order won't be added — just try the next one.", "steps": ["Wash your hands 🫧", "Brush your teeth 🦷", "Wash your hair 🧴", "Put on comfy pajamas 🌙", "Take three calm breaths 🌬️", "Say goodnight to someone you love 💛"] }, "blessing": "May you be filled with the sparkly spirit of self-care, knowing that you are brave, strong, and beautifully magical, just the way you are." }], "SABBATS": [{ "id": "samhain", "station": "station2", "title": "Samhain", "guide": "The Witches' New Year · Oct 31", "color": "#9C89C7", "emoji": "🎃", "season": "The veil grows thin", "story": ["As autumn's last leaves fall, the Temple marks Samhain — often called the Witches' New Year, the night the old year ends and a new one begins, when the veil between our world and the spirit world grows thin.", "We light candles for the ones who came before us and carve jack-o-lanterns to guide friendly spirits home. It can feel a little spooky, but Samhain isn't about being scared — it's about remembering that endings and beginnings are always connected."], "colors": [{ "hex": "#1a1a1a", "name": "Black" }, { "hex": "#E8834C", "name": "Orange" }, { "hex": "#9C89C7", "name": "Purple" }], "traditions": ["Lighting candles for ancestors", "Carving jack-o-lanterns", "Sharing apples and harvest food", "A quiet moment of silence at midnight"], "decor": [{ "emoji": "🎃", "name": "Jack-o-lantern", "meaning": "Lights the way home for wandering spirits." }, { "emoji": "🕯️", "name": "Candle", "meaning": "A small flame to guide loved ones back." }, { "emoji": "🖼️", "name": "Ancestor photo", "meaning": "Remembers those who came before you." }, { "emoji": "🐈‍⬛", "name": "Black cat", "meaning": "An old companion of magic and mystery." }, { "emoji": "🍎", "name": "Apple", "meaning": "The harvest's very last sweetness." }, { "emoji": "🌾", "name": "Dried wheat", "meaning": "The final gathering before winter rests." }], "activity": { "type": "altarPath", "title": "Samhain's Altar", "pairs": [{ "a": "Jack-o-lantern", "b": "Lights the way home for spirits" }, { "a": "Ancestor photo", "b": "Remembers those who came before" }, { "a": "Black cat", "b": "An old symbol of magic and mystery" }, { "a": "Apple", "b": "The harvest's last sweetness" }] }, "blessing": "As the veil grows thin, may you feel how close your loved ones always are, even the ones you've never met." }, { "id": "yule", "station": "station2", "title": "Yule", "guide": "The Return of the Sun · Winter Solstice", "color": "#8DA9C4", "emoji": "❄️", "season": "The longest night", "story": ["Yule falls on the Winter Solstice — the longest night of the year. From this night on, the sun begins its slow climb back, a little more light returning every single day.", "Evergreen branches are brought inside to remind us that even in the coldest, darkest time, something is still green and alive. A Yule log burns through the night to welcome the sun's rebirth."], "colors": [{ "hex": "#8DA9C4", "name": "Silver" }, { "hex": "#6E9B7A", "name": "Evergreen" }, { "hex": "#D98BA6", "name": "Holly Red" }], "traditions": ["Burning the Yule log", "Decorating with evergreen branches", "Lighting a candle in every window", "Trading the Holly King for the Oak King"], "decor": [{ "emoji": "🕯️", "name": "Candle", "meaning": "A small sun to hold back the longest night." }, { "emoji": "🌲", "name": "Evergreen branch", "meaning": "Proof that life stays green through winter." }, { "emoji": "🪵", "name": "Yule log", "meaning": "Burned through the night to welcome the sun's return." }, { "emoji": "🎄", "name": "Holly sprig", "meaning": "An old symbol of protection in the cold." }, { "emoji": "⭐", "name": "Star", "meaning": "Marks the sky on the year's longest night." }, { "emoji": "🔔", "name": "Bell", "meaning": "Rings to call the light back home." }], "activity": { "type": "altarPath", "title": "Yule's Altar", "pairs": [{ "a": "Yule log", "b": "Burned to welcome the sun's return" }, { "a": "Evergreen branch", "b": "Life continuing through winter" }, { "a": "Candle in the window", "b": "A small sun to hold back the dark" }, { "a": "Holly sprig", "b": "A symbol of protection in winter" }] }, "blessing": "From tonight, the light returns a little more each day. May you always trust the dark enough to wait for the dawn." }, { "id": "imbolc2", "station": "station2", "title": "Imbolc", "guide": "Brigid's Day · Feb 1", "color": "#E8834C", "emoji": "🔥", "season": "First stirrings of spring", "story": ["You may remember Brigid from Temple Time Adventures! Imbolc is her special day — the first whisper that spring is coming, even while snow might still be on the ground.", "Brigid is the goddess of the forge, of poetry, and of healing. On Imbolc, we light candles for her flame and plant seeds indoors, even before the ground outside has warmed."], "colors": [{ "hex": "#F1EEFB", "name": "White" }, { "hex": "#E8834C", "name": "Flame Orange" }, { "hex": "#6E9B7A", "name": "Early Green" }], "traditions": ["Weaving a Brigid's Cross", "Lighting candles in every room", "Planting seeds indoors", "Sweeping out the old with a besom"], "decor": [{ "emoji": "🕯️", "name": "Candle", "meaning": "Lit for Brigid's flame of healing and hope." }, { "emoji": "➕", "name": "Brigid's Cross", "meaning": "Woven from straw to invite her protection." }, { "emoji": "🌱", "name": "Seed pot", "meaning": "A promise that spring is already stirring." }, { "emoji": "🥛", "name": "Milk offering", "meaning": "An old gift of gratitude for Brigid." }, { "emoji": "🧹", "name": "Besom", "meaning": "Sweeps out the old to make room for new." }, { "emoji": "🌨️", "name": "Snowdrop flower", "meaning": "The very first bloom to push through snow." }], "activity": { "type": "altarPath", "title": "Imbolc's Altar", "pairs": [{ "a": "Brigid's Cross", "b": "Woven from straw to invite her protection" }, { "a": "Seed pot", "b": "A promise that spring is coming" }, { "a": "Besom", "b": "Symbolically sweeps out the old" }, { "a": "Snowdrop flower", "b": "The very first bloom through the snow" }] }, "blessing": "Even the smallest spark can become a big flame. Your own new beginning may already be stirring, quietly, underground." }, { "id": "ostara", "station": "station2", "title": "Ostara", "guide": "The Spring Equinox", "color": "#E3C567", "emoji": "🐣", "season": "Balance returns", "story": ["Ostara arrives with the Spring Equinox, when day and night are perfectly equal — a moment of true balance before the light begins to win out for the rest of spring and summer.", "Eggs and rabbits are old symbols of Ostara, both standing for new life and fresh beginnings. It's a Sabbat for planting seeds, both the real kind and the quieter kind — new habits, new hopes you're ready to grow."], "colors": [{ "hex": "#E3C567", "name": "Pale Gold" }, { "hex": "#D98BA6", "name": "Blossom Pink" }, { "hex": "#6E9B7A", "name": "Fresh Green" }], "traditions": ["Painting eggs", "Planting a garden", "Watching the sunrise together", "Spring cleaning to clear the old"], "decor": [{ "emoji": "🥚", "name": "Painted egg", "meaning": "A symbol of new life breaking free." }, { "emoji": "🐇", "name": "Rabbit figure", "meaning": "An old companion of spring goddesses." }, { "emoji": "🌷", "name": "Fresh flowers", "meaning": "Celebrates the balance of light and dark." }, { "emoji": "🌱", "name": "Seed packet", "meaning": "A literal act of new beginnings." }, { "emoji": "🌤️", "name": "Sun symbol", "meaning": "Marks the sun's growing strength." }, { "emoji": "🧺", "name": "Basket", "meaning": "Ready to gather spring's first gifts." }], "activity": { "type": "altarPath", "title": "Ostara's Altar", "pairs": [{ "a": "Painted egg", "b": "A symbol of new life" }, { "a": "Rabbit figure", "b": "An old companion of spring goddesses" }, { "a": "Seed packet", "b": "A literal act of new beginnings" }, { "a": "Sunrise ritual", "b": "Marks the balance of light and dark" }] }, "blessing": "Just like day and night in perfect balance, may you find your own steady middle between rest and growth." }, { "id": "beltane", "station": "station2", "title": "Beltane", "guide": "The Maypole Festival · May 1", "color": "#D98BA6", "emoji": "🌸", "season": "The land in full bloom", "story": ["Beltane is a fire festival, celebrated as the land bursts into full bloom. Long ago, people lit two bonfires and walked their animals between them for blessing and protection.", "The Maypole is Beltane's most joyful symbol — dancers weave colorful ribbons together as they circle it, celebrating the union of earth and sky, of growth and life."], "colors": [{ "hex": "#6E9B7A", "name": "Green" }, { "hex": "#D98BA6", "name": "Red" }, { "hex": "#E3C567", "name": "Gold" }], "traditions": ["Dancing the Maypole", "Lighting twin bonfires", "Wearing flower crowns", "Leaving May baskets for neighbors"], "decor": [{ "emoji": "🎗️", "name": "Ribbon", "meaning": "Woven together in the Maypole's joyful dance." }, { "emoji": "🌸", "name": "Flower crown", "meaning": "Celebrates the land in full bloom." }, { "emoji": "🔥", "name": "Bonfire", "meaning": "One of twin fires lit for blessing and protection." }, { "emoji": "🧺", "name": "May basket", "meaning": "A small gift left for a neighbor." }, { "emoji": "🌳", "name": "Green branch", "meaning": "The earth at its most alive." }, { "emoji": "🎶", "name": "Music note", "meaning": "Beltane is best celebrated with dancing." }], "activity": { "type": "altarPath", "title": "Beltane's Altar", "pairs": [{ "a": "Maypole ribbon", "b": "Woven together in a joyful dance" }, { "a": "Twin bonfires", "b": "Lit for blessing and protection" }, { "a": "Flower crown", "b": "Celebrates the land in full bloom" }, { "a": "May basket", "b": "A small gift left for a neighbor" }] }, "blessing": "May you dance through your own life in full bloom, weaving your colorful ribbons in with everyone around you." }, { "id": "litha", "station": "station2", "title": "Litha", "guide": "The Summer Solstice", "color": "#E3C567", "emoji": "☀️", "season": "The sun at its strongest", "story": ["Litha arrives on the Summer Solstice — the longest day of the year, when the sun reaches the very height of its power. Bonfires are lit at midday to honor it.", "It's said that Litha is a magical time when fairies and nature spirits are especially close. After Litha, the days slowly begin to shorten again — even at the peak of something wonderful, the wheel keeps gently turning."], "colors": [{ "hex": "#E3C567", "name": "Sun Gold" }, { "hex": "#8DA9C4", "name": "Sky Blue" }, { "hex": "#6E9B7A", "name": "Meadow Green" }], "traditions": ["Lighting a midday bonfire", "Gathering herbs at their most magical", "Leaving offerings for fairies", "Watching the longest sunset of the year"], "decor": [{ "emoji": "☀️", "name": "Sun symbol", "meaning": "Honors the sun at the height of its power." }, { "emoji": "🌻", "name": "Sunflower", "meaning": "Turns its face to the sun's longest day." }, { "emoji": "🍯", "name": "Honey jar", "meaning": "A symbol of summer's sweetness." }, { "emoji": "🌿", "name": "Fresh herbs", "meaning": "Believed to be at their most magical today." }, { "emoji": "🔥", "name": "Bonfire", "meaning": "Lit at midday to honor the sun's peak." }, { "emoji": "✨", "name": "Fairy light", "meaning": "Litha is a night when spirits feel close." }], "activity": { "type": "altarPath", "title": "Litha's Altar", "pairs": [{ "a": "Midday bonfire", "b": "Honors the sun's peak power" }, { "a": "Fresh herbs", "b": "Believed most magical on this day" }, { "a": "Fairy light", "b": "Litha is a night spirits feel close" }, { "a": "Honey jar", "b": "A symbol of summer's sweetness" }] }, "blessing": "May you shine at your very brightest today — and remember that even the sun rests, and that's alright too." }, { "id": "lughnasadh", "station": "station2", "title": "Lughnasadh", "guide": "The First Harvest · Aug 1", "color": "#E8834C", "emoji": "🌾", "season": "The first harvest", "story": ["Lughnasadh, sometimes called Lammas, celebrates the very first harvest of the year. Named for the god Lugh, it's a festival of bread, grain, and gratitude for the work of growing things.", "Communities once gathered for games and shared feasts, baking the year's first loaf of bread from the newly harvested wheat — a reminder that hard work is sweetest when it's shared."], "colors": [{ "hex": "#E8834C", "name": "Harvest Orange" }, { "hex": "#E3C567", "name": "Wheat Gold" }, { "hex": "#6E9B7A", "name": "Field Green" }], "traditions": ["Baking the first loaf of bread", "Weaving corn dolls for luck", "Playing games and contests", "Sharing a communal feast"], "decor": [{ "emoji": "🍞", "name": "Fresh bread", "meaning": "Baked from the year's very first harvested grain." }, { "emoji": "🌾", "name": "Wheat sheaf", "meaning": "Bundled to give thanks for the growing season." }, { "emoji": "🌽", "name": "Corn doll", "meaning": "Woven for luck in next year's harvest." }, { "emoji": "🧺", "name": "Harvest basket", "meaning": "A reminder to share what you've grown." }, { "emoji": "🌻", "name": "Sunflower", "meaning": "Still turning toward summer's fading light." }, { "emoji": "🏆", "name": "Game token", "meaning": "Honors Lugh's many skills and talents." }], "activity": { "type": "altarPath", "title": "Lughnasadh's Altar", "pairs": [{ "a": "Fresh bread", "b": "Baked from the first harvested grain" }, { "a": "Corn doll", "b": "Woven for luck in next year's harvest" }, { "a": "Game token", "b": "Honors Lugh's many skills" }, { "a": "Harvest basket", "b": "A reminder to share what you've grown" }] }, "blessing": "May you remember that hard work is sweetest when its harvest is shared with others." }, { "id": "mabon", "station": "station2", "title": "Mabon", "guide": "The Autumn Equinox", "color": "#6E9B7A", "emoji": "🍂", "season": "The second harvest", "story": ["Mabon arrives with the Autumn Equinox, when day and night balance once more — but this time, the dark is about to take the lead as winter approaches.", "It's the second harvest, often called a pagan Thanksgiving — a time to gather the last fruits of the season, give thanks for everything the year has grown, and get ready to rest as the wheel turns toward winter."], "colors": [{ "hex": "#E8834C", "name": "Amber" }, { "hex": "#6E9B7A", "name": "Deep Green" }, { "hex": "#9C89C7", "name": "Twilight Purple" }], "traditions": ["Filling a cornucopia", "Gathering fallen leaves", "Sharing a gratitude circle", "Pressing the last fruit into cider"], "decor": [{ "emoji": "🍁", "name": "Autumn leaf", "meaning": "Gathered as the wheel turns toward winter." }, { "emoji": "🌰", "name": "Acorn", "meaning": "A small symbol of potential, quietly waiting." }, { "emoji": "🍇", "name": "Grapes", "meaning": "Pressed into cider from the last fruit of the season." }, { "emoji": "🧺", "name": "Cornucopia", "meaning": "Overflows with the second harvest." }, { "emoji": "🍎", "name": "Apple", "meaning": "One of the last sweet gifts before winter." }, { "emoji": "🕯️", "name": "Candle", "meaning": "Lit as the dark begins to take the lead." }], "activity": { "type": "altarPath", "title": "Mabon's Altar", "pairs": [{ "a": "Cornucopia", "b": "Overflows with the second harvest" }, { "a": "Acorn", "b": "A small symbol of potential, waiting" }, { "a": "Gratitude circle", "b": "A moment to name what you're thankful for" }, { "a": "Autumn leaf", "b": "Gathered for altars and decoration" }] }, "blessing": "As the wheel turns toward winter, may you carry gratitude for everything this year has grown in you." }], "QUIZ": [{ "q": "Who helped Ember find his courage in the whispering woods?", "options": ["Hekate the owl", "Brigid the goddess", "Corvus the crow", "Anansi the spider"], "a": 0 }, { "q": "What did Ve, Vili, and Odin plant to grow Yggdrasil, the World Tree?", "options": ["A golden acorn", "A tiny seed from Ymir's beard", "A snowflake", "A silver thimble"], "a": 1 }, { "q": "What was Corvus the crow really searching for?", "options": ["Gold and shiny trinkets", "Food scraps", "Hidden truths and stories", "A new nest"], "a": 2 }, { "q": "What was Gleipnir, the chain that held Fenrir, really made of?", "options": ["Solid iron", "Whispers, breath, and unlikely quiet strengths", "Golden thread", "Stone and ice"], "a": 1 }, { "q": "Which quiet little ray held all of Lumina together during the storm?", "options": ["Scarlet", "Violet", "Cerulean", "Sunny"], "a": 3 }, { "q": "What did Hope the sunflower have to do before she could bloom?", "options": ["Wait for someone to plant her", "Push bravely through fear and darkness", "Ask the moon for help", "Stay a seed forever"], "a": 1 }, { "q": "Who lifted a rainbow snowflake to loosen winter's grip?", "options": ["Brigid", "Hecate", "Nimbus", "Willow"], "a": 0 }, { "q": "What did Anansi bring back from the Sky God Nyame's palace?", "options": ["A crown", "A box of stories", "A magic hammer", "A friendship bracelet"], "a": 1 }, { "q": "What did Willow and her family build together for the competition?", "options": ["A potion", "A family crest", "A quilt", "A bonfire"], "a": 1 }, { "q": "What did Pip the puffball learn about getting a little dirty?", "options": ["Never get dirty, ever", "It's fine, as long as you know how to clean up after", "Only clean once a year", "Dirt is magic and should stay on"], "a": 1 }, { "q": "Which Sabbat marks the Winter Solstice, the longest night of the year?", "options": ["Samhain", "Yule", "Litha", "Mabon"], "a": 1 }, { "q": "Which Sabbat celebrates Brigid and the very first stirrings of spring?", "options": ["Imbolc", "Ostara", "Beltane", "Lughnasadh"], "a": 0 }, { "q": "Which Sabbat is the fire festival celebrated on May 1st with a Maypole?", "options": ["Litha", "Beltane", "Mabon", "Samhain"], "a": 1 }, { "q": "Which Sabbat marks the Summer Solstice, the longest day of the year?", "options": ["Litha", "Yule", "Ostara", "Imbolc"], "a": 0 }, { "q": "Which Sabbat is the first harvest festival, celebrated with fresh bread?", "options": ["Mabon", "Ostara", "Lughnasadh", "Beltane"], "a": 2 }, { "q": "Which Sabbat is often called the Witches' New Year?", "options": ["Yule", "Samhain", "Litha", "Mabon"], "a": 1 }, { "q": "Which Sabbat marks the Spring Equinox, when day and night are equal?", "options": ["Ostara", "Beltane", "Mabon", "Yule"], "a": 0 }, { "q": "Which Sabbat marks the Autumn Equinox and the second harvest?", "options": ["Lughnasadh", "Samhain", "Mabon", "Imbolc"], "a": 2 }, { "q": "What color is traditionally tied to Samhain, alongside black and purple?", "options": ["Orange", "Baby blue", "Silver", "Pastel pink"], "a": 0 }, { "q": "What is burned through the night at Yule to welcome the sun's return?", "options": ["A cornucopia", "The Yule log", "A Maypole ribbon", "A corn doll"], "a": 1 }], "MOON_PHASES": [{ "emoji": "🌑", "name": "New Moon", "blurb": "A perfect night for new beginnings and quiet wishes." }, { "emoji": "🌒", "name": "Waxing Crescent", "blurb": "A good night for planting seeds of intention." }, { "emoji": "🌓", "name": "First Quarter", "blurb": "A night for brave decisions and taking action." }, { "emoji": "🌔", "name": "Waxing Gibbous", "blurb": "Keep going — whatever you started is almost ready to bloom." }, { "emoji": "🌕", "name": "Full Moon", "blurb": "The Temple's magic is at its brightest tonight. A wonderful night for gratitude." }, { "emoji": "🌖", "name": "Waning Gibbous", "blurb": "A good night for sharing what you've learned with others." }, { "emoji": "🌗", "name": "Last Quarter", "blurb": "A gentle night for letting go of anything you don't need anymore." }, { "emoji": "🌘", "name": "Waning Crescent", "blurb": "A quiet night for resting before the next new moon." }], "SABBAT_DATES": [{ "name": "Samhain", "month": 10, "day": 31 }, { "name": "Yule", "month": 12, "day": 21 }, { "name": "Imbolc", "month": 2, "day": 1 }, { "name": "Ostara", "month": 3, "day": 20 }, { "name": "Beltane", "month": 5, "day": 1 }, { "name": "Litha", "month": 6, "day": 21 }, { "name": "Lughnasadh", "month": 8, "day": 1 }, { "name": "Mabon", "month": 9, "day": 22 }], "INGREDIENTS": [{ "emoji": "🌙", "name": "Moonpetal", "trait": "calm", "hex": "#8DA9C4", "shape": "petal" }, { "emoji": "✨", "name": "Star-dew", "trait": "wonder", "hex": "#9C89C7", "shape": "crystal" }, { "emoji": "🍄", "name": "Giggleroot", "trait": "joy", "hex": "#E3C567", "shape": "drop" }, { "emoji": "🍯", "name": "Honeyglow", "trait": "comfort", "hex": "#E8834C", "shape": "drop" }, { "emoji": "🌿", "name": "Whisperleaf", "trait": "calm", "hex": "#6E9B7A", "shape": "leaf" }, { "emoji": "❄️", "name": "Frostberry", "trait": "focus", "hex": "#8DA9C4", "shape": "crystal" }, { "emoji": "🔥", "name": "Emberspice", "trait": "courage", "hex": "#E8834C", "shape": "crystal" }, { "emoji": "🐌", "name": "Shimmersnail", "trait": "luck", "hex": "#D98BA6", "shape": "drop" }, { "emoji": "🍀", "name": "Cloverdew", "trait": "luck", "hex": "#6E9B7A", "shape": "leaf" }, { "emoji": "🌟", "name": "Wishspark", "trait": "wonder", "hex": "#E3C567", "shape": "crystal" }, { "emoji": "🎐", "name": "Windchime Bell", "trait": "calm", "hex": "#9C89C7", "shape": "drop" }, { "emoji": "🪶", "name": "Featherlight", "trait": "joy", "hex": "#8DA9C4", "shape": "petal" }, { "emoji": "🌺", "name": "Dreamblossom", "trait": "wonder", "hex": "#D98BA6", "shape": "petal" }, { "emoji": "🦋", "name": "Butterfly Dust", "trait": "joy", "hex": "#9C89C7", "shape": "crystal" }, { "emoji": "🌰", "name": "Acorn Cap", "trait": "focus", "hex": "#B85C38", "shape": "drop" }, { "emoji": "🍂", "name": "Autumn Whisper", "trait": "comfort", "hex": "#E0A458", "shape": "leaf" }, { "emoji": "🐚", "name": "Seashell Fragment", "trait": "calm", "hex": "#8DA9C4", "shape": "drop" }, { "emoji": "🌵", "name": "Cactus Bloom", "trait": "courage", "hex": "#6E9B7A", "shape": "petal" }, { "emoji": "🍇", "name": "Wild Berry", "trait": "joy", "hex": "#9C6FD9", "shape": "drop" }, { "emoji": "🌾", "name": "Sunwheat", "trait": "focus", "hex": "#E3C567", "shape": "leaf" }, { "emoji": "🕯️", "name": "Candle Wax Curl", "trait": "courage", "hex": "#E8834C", "shape": "crystal" }, { "emoji": "🦢", "name": "Swan Feather", "trait": "calm", "hex": "#F1EEFB", "shape": "petal" }, { "emoji": "🐝", "name": "Honeybee Hum", "trait": "comfort", "hex": "#F2C14E", "shape": "drop" }, { "emoji": "🌊", "name": "Tidepool Drop", "trait": "focus", "hex": "#4FB6C7", "shape": "drop" }], "RECIPES": [{ "ids": [0, 4, 10], "emoji": "🌊", "title": "Potion of Quiet Calm", "text": "Settles wiggly feelings like a soft blanket.", "hex": "#6FA8C7", "clue": "Three quiet things that glow, hum, and chime softly beneath the moon." }, { "ids": [1, 9, 12], "emoji": "✨", "title": "Potion of Star Whispers", "text": "Lets you hear what the moon is thinking.", "hex": "#9C89C7", "clue": "Dew from the stars, a spark of wishing, and a bloom that only dreams." }, { "ids": [2, 11, 13], "emoji": "😄", "title": "Potion of Extra Giggles", "text": "Warning: may cause snorting laughter.", "hex": "#E3C567", "clue": "A silly root, a feather so light, and dust that drifts from a wing." }, { "ids": [3, 22, 15], "emoji": "💛", "title": "Potion of Warm Hugs", "text": "Works best shared with someone you love.", "hex": "#E8834C", "clue": "Golden sweetness, a busy hum, and a whisper of falling leaves." }, { "ids": [5, 19, 23], "emoji": "🔎", "title": "Potion of Bright Ideas", "text": "Smells like new crayons.", "hex": "#5FA8A0", "clue": "Something icy, something golden in a field, and a drop from a still pool." }, { "ids": [6, 17, 20], "emoji": "🦁", "title": "Potion of Sparkly Courage", "text": "Makes shadows a little less scary.", "hex": "#D9534F", "clue": "A fiery spice, a bloom that survives the driest days, and a steady little flame." }, { "ids": [7, 8, 9], "emoji": "🍀", "title": "Potion of Lucky Sparkles", "text": "Finds lost socks and four-leaf clovers alike.", "hex": "#6E9B7A", "clue": "A slow silver shimmer, four green leaves, and one hopeful spark." }, { "ids": [0, 1, 2], "emoji": "🌠", "title": "Potion of Moonlit Giggles", "text": "A rare blend that makes the stars twinkle brighter when you laugh.", "hex": "#C9A6E0", "clue": "Moonlight, stardust, and a root that giggles in the dark." }, { "ids": [1, 7, 8], "emoji": "🍀", "title": "Potion of Lucky Stardust", "text": "Said to help you find exactly what you were looking for.", "hex": "#7FC97F", "clue": "Falling dew, a shimmering shell, and a leaf with four to offer." }, { "ids": [0, 3, 4], "emoji": "🧸", "title": "Potion of Cozy Comfort", "text": "Tastes like a warm blanket and your favorite lullaby.", "hex": "#E0A458", "clue": "Moonlight, golden sweetness, and a leaf that hums lullabies." }, { "ids": [5, 6, 20], "emoji": "🌗", "title": "Potion of Blazing Frost", "text": "Somehow warm and cool at the same time — nobody quite knows how.", "hex": "#4FB6C7", "clue": "Something icy, something fiery, and a curl of steady candlelight." }, { "ids": [8, 9, 12], "emoji": "🔮", "title": "Potion of Fortune's Wish", "text": "Said to grant one very small, very kind wish.", "hex": "#C9A227", "clue": "Four leaves, one spark, and a bloom that only dreams." }, { "ids": [0, 1, 10], "emoji": "🌌", "title": "Potion of Whispered Stars", "text": "A hush falls, and somewhere a star answers back.", "hex": "#6A5ACD", "clue": "Moonlight, starlight, and a chime that hums quietly." }, { "ids": [0, 3, 22], "emoji": "🛌", "title": "Potion of Quiet Comfort", "text": "Wraps around you like a nap in a warm sunbeam.", "hex": "#E6B8A2", "clue": "Moonlight petals, golden sweetness, and a busy little hum." }, { "ids": [0, 10, 16], "emoji": "🔕", "title": "Potion of Chiming Silence", "text": "So calm you can almost hear the quiet ringing.", "hex": "#A8C6DB", "clue": "Moonlight, a soft chime, and a fragment washed up by the tide." }, { "ids": [1, 2, 9], "emoji": "🎇", "title": "Potion of Sparkling Laughter", "text": "Giggles that glitter a little on the way out.", "hex": "#F2C14E", "clue": "Starlight, a giggling root, and one hopeful spark." }, { "ids": [1, 6, 9], "emoji": "🌟", "title": "Potion of Blazing Wonder", "text": "Curiosity bright enough to light up a whole room.", "hex": "#E56B6F", "clue": "A spark from the sky, a fire below, and one more spark for good measure." }, { "ids": [2, 3, 11], "emoji": "🍯", "title": "Potion of Honeyed Giggles", "text": "Sweet enough to make even a grumpy day smile.", "hex": "#F3A712", "clue": "A silly root, golden sweetness, and a feather so light." }, { "ids": [2, 7, 11], "emoji": "🎲", "title": "Potion of Lucky Laughs", "text": "Somehow always giggling at exactly the right moment.", "hex": "#57A773", "clue": "A giggling root, a shimmering shell, and a feather so light." }, { "ids": [2, 11, 18], "emoji": "🪶", "title": "Potion of Featherlight Giggles", "text": "So light it might just float you off your feet.", "hex": "#EAC9E8", "clue": "A giggling root, a feather so light, and a wild little berry." }, { "ids": [4, 6, 9, 21], "emoji": "🕊️", "title": "Potion of Whispered Courage", "text": "Brave, but the quiet, steady kind of brave.", "hex": "#B85C38", "clue": "A humming leaf, a fiery spice, a hopeful spark, and a feather soft as snow." }, { "ids": [0, 4, 9, 10], "emoji": "💫", "title": "Potion of Quiet Wishes", "text": "Wishes whispered so softly only the moon can hear.", "hex": "#7986CB", "clue": "Moonlight, a humming leaf, a hopeful spark, and a quiet chime." }, { "ids": [5, 10, 16, 23], "emoji": "❄️", "title": "Potion of Crystal Chimes", "text": "Rings like ice against glass on a clear, cold night.", "hex": "#A0E7E5", "clue": "Something icy, a chime, a shell from the tide, and a still drop of water." }, { "ids": [6, 7, 17, 20], "emoji": "🔥", "title": "Potion of Lucky Sparks", "text": "Bold enough to make its own good fortune.", "hex": "#FF8C42", "clue": "A fiery spice, a shimmering shell, a hardy bloom, and steady candlelight." }, { "ids": [7, 8, 9, 10], "emoji": "🔔", "title": "Potion of Lucky Bells", "text": "Ring it once for good luck, twice for great luck.", "hex": "#D4A5A5", "clue": "A shimmering shell, four leaves, a spark, and a bell that hums." }, { "ids": [2, 8, 11, 18], "emoji": "🌾", "title": "Potion of Lucky Feather", "text": "So light, luck can't help but follow along.", "hex": "#B4E197", "clue": "A giggling root, four leaves, a light feather, and a wild berry." }, { "ids": [3, 7, 9, 22], "emoji": "🍀", "title": "Potion of Sweet Fortune", "text": "A taste of luck, sweetened just right.", "hex": "#F6D186", "clue": "Golden sweetness, a shimmering shell, a spark, and a busy hum." }, { "ids": [1, 9, 12, 13], "emoji": "🦋", "title": "Potion of Fluttering Dreams", "text": "Feels like drifting through a daydream on soft wings.", "hex": "#EAC9E8", "clue": "Starlight, a spark, a dreaming bloom, and dust from a wing." }, { "ids": [14, 15, 19, 22], "emoji": "🍂", "title": "Potion of Cozy Autumn", "text": "Smells like fallen leaves and a warm sweater.", "hex": "#C88B4A", "clue": "A tiny cap, a whisper of leaves, a golden field, and a busy hum." }, { "ids": [0, 5, 16, 23], "emoji": "🌊", "title": "Potion of Ocean Whispers", "text": "Carries the hush of waves rolling in and out.", "hex": "#5FB6C9", "clue": "Moonlight, something icy, a shell, and a still drop of water." }, { "ids": [6, 14, 17, 19], "emoji": "🌵", "title": "Potion of Desert Bloom", "text": "Proof that something beautiful can grow anywhere.", "hex": "#D9C36A", "clue": "A fiery spice, a tiny cap, a hardy bloom, and a golden field." }, { "ids": [2, 3, 18, 22], "emoji": "🍇", "title": "Potion of Berry Sweetness", "text": "A little tart, a little sweet, entirely delightful.", "hex": "#A569BD", "clue": "A giggling root, golden sweetness, a wild berry, and a busy hum." }, { "ids": [6, 14, 17, 19, 20], "emoji": "🌾", "title": "Potion of Golden Harvest", "text": "Tastes like the very last warm day of summer.", "hex": "#E0A83E", "clue": "Five things from a field of gold: fire, a tiny cap, a bloom, wheat, and a candle curl." }, { "ids": [1, 9, 12, 13, 21], "emoji": "🦢", "title": "Potion of Gentle Grace", "text": "Moves through the room like it barely touched the ground.", "hex": "#F1D6E0", "clue": "Starlight, a spark, a dreaming bloom, drifting dust, and a feather soft as snow." }, { "ids": [2, 9, 13, 18, 22], "emoji": "🦋", "title": "Potion of Wishful Wings", "text": "Carries your smallest wishes somewhere they can be heard.", "hex": "#B98FE0", "clue": "A giggling root, a spark, drifting dust, a wild berry, and a busy hum." }, { "ids": [7, 8, 9, 12, 14], "emoji": "🌰", "title": "Potion of Rooted Luck", "text": "Luck that grows slowly, like roots finding their way.", "hex": "#7A8F5C", "clue": "A shimmering shell, four leaves, a spark, a dreaming bloom, and a tiny cap." }, { "ids": [3, 6, 15, 20, 22], "emoji": "🕯️", "title": "Potion of Steady Flame", "text": "A flame that never flickers, no matter the wind.", "hex": "#E4632E", "clue": "Golden sweetness, fire, a whisper of leaves, a candle curl, and a busy hum." }, { "ids": [0, 4, 10, 16, 23], "emoji": "🐚", "title": "Potion of Tidal Calm", "text": "The particular quiet of a beach at low tide.", "hex": "#7FA8C9", "clue": "Moonlight, a humming leaf, a chime, a shell, and a still drop of water." }, { "ids": [0, 4, 10, 21, 22], "emoji": "🐝", "title": "Potion of Meadow Hum", "text": "The soft buzz of a meadow on a lazy afternoon.", "hex": "#C7B23A", "clue": "Moonlight, a humming leaf, a chime, a soft feather, and a busy hum." }, { "ids": [5, 10, 16, 21, 23], "emoji": "🦢", "title": "Potion of Quiet Grace", "text": "Elegant and unhurried, like a bell that rings once.", "hex": "#B8AEDD", "clue": "Something icy, a chime, a shell, a soft feather, and a still drop of water." }], "INTENTIONS": [{ "id": "courage", "emoji": "🦁", "label": "Courage", "charms": [{ "hex": "#E8834C", "label": "Boldness", "symbol": "🔥" }, { "hex": "#E3C567", "label": "Bravery", "symbol": "🦁" }, { "hex": "#D98BA6", "label": "Confidence", "symbol": "💪" }, { "hex": "#9C89C7", "label": "Determination", "symbol": "🎯" }, { "hex": "#6E9B7A", "label": "Steadiness", "symbol": "🪨" }, { "hex": "#8DA9C4", "label": "Calm under pressure", "symbol": "🌊" }] }, { "id": "kindness", "emoji": "💛", "label": "Kindness", "charms": [{ "hex": "#E3C567", "label": "Warmth", "symbol": "☀️" }, { "hex": "#D98BA6", "label": "Gentleness", "symbol": "🕊️" }, { "hex": "#6E9B7A", "label": "Patience", "symbol": "⏳" }, { "hex": "#8DA9C4", "label": "Understanding", "symbol": "👂" }, { "hex": "#E8834C", "label": "Generosity", "symbol": "🎁" }, { "hex": "#9C89C7", "label": "Empathy", "symbol": "💗" }] }, { "id": "dreams", "emoji": "🌙", "label": "Good Dreams", "charms": [{ "hex": "#8DA9C4", "label": "Starlight", "symbol": "⭐" }, { "hex": "#9C89C7", "label": "Quiet", "symbol": "🌙" }, { "hex": "#6E9B7A", "label": "Safety", "symbol": "🛡️" }, { "hex": "#E3C567", "label": "Sweetness", "symbol": "🍯" }, { "hex": "#D98BA6", "label": "Comfort", "symbol": "🧸" }, { "hex": "#E8834C", "label": "Warm blankets", "symbol": "🛌" }] }, { "id": "focus", "emoji": "🔭", "label": "Focus", "charms": [{ "hex": "#6E9B7A", "label": "Clarity", "symbol": "🔍" }, { "hex": "#8DA9C4", "label": "Stillness", "symbol": "🧘" }, { "hex": "#E3C567", "label": "Curiosity", "symbol": "❓" }, { "hex": "#9C89C7", "label": "Patience", "symbol": "⏳" }, { "hex": "#D98BA6", "label": "Determination", "symbol": "🎯" }, { "hex": "#E8834C", "label": "Energy", "symbol": "⚡" }] }, { "id": "friendship", "emoji": "🤝", "label": "Friendship", "charms": [{ "hex": "#E3C567", "label": "Laughter", "symbol": "😄" }, { "hex": "#6E9B7A", "label": "Trust", "symbol": "🤝" }, { "hex": "#E8834C", "label": "Sharing", "symbol": "🎁" }, { "hex": "#9C89C7", "label": "Listening", "symbol": "👂" }, { "hex": "#D98BA6", "label": "Loyalty", "symbol": "🐾" }, { "hex": "#8DA9C4", "label": "Forgiveness", "symbol": "🕊️" }] }], "WISDOM_CARDS": [{ "emoji": "🦁", "title": "Courage", "text": "You can feel scared and brave at the very same time." }, { "emoji": "🌻", "title": "Growth", "text": "Every big thing you'll become started as something small." }, { "emoji": "🤝", "title": "Kindness", "text": "A small kindness can be someone's whole good day." }, { "emoji": "🌙", "title": "Rest", "text": "Even the moon takes time to fully glow again." }, { "emoji": "✨", "title": "Wonder", "text": "Curious questions are their own kind of magic." }, { "emoji": "🔥", "title": "Passion", "text": "It's wonderful to care loudly about the things you love." }, { "emoji": "🌿", "title": "Patience", "text": "Good things are allowed to take their time growing." }, { "emoji": "🐺", "title": "Strength", "text": "Real strength is often soft, patient, and kind." }, { "emoji": "🕸️", "title": "Cleverness", "text": "Thinking your way through a problem counts as magic too." }, { "emoji": "🏡", "title": "Belonging", "text": "You are held by more people than you may realize." }, { "emoji": "🍁", "title": "Gratitude", "text": "Naming one good thing can change your whole day." }, { "emoji": "🌈", "title": "Uniqueness", "text": "The world needed exactly the colors that make up you." }, { "emoji": "🕯️", "title": "Hope", "text": "Even in the dark, a small light is still a real light." }, { "emoji": "🦉", "title": "Wisdom", "text": "It's okay to sit quietly and simply notice things." }, { "emoji": "🐾", "title": "Friendship", "text": "A good friend makes hard days feel lighter." }, { "emoji": "🌊", "title": "Calm", "text": "Slow breaths can make big feelings feel smaller." }], "CERT_TIERS": [{ "min": 0.85, "seal": "🌙", "accent": "#E3C567", "title": "Keeper of the Obsidian Moon", "line": "having truly mastered every story and season of the Temple" }, { "min": 0.6, "seal": "⭐", "accent": "#9C89C7", "title": "Guardian of the Wheel of Wonder", "line": "having faithfully walked every story and season of the Temple" }, { "min": 0, "seal": "🕯️", "accent": "#8DA9C4", "title": "Seeker of the Sacred Stories", "line": "having journeyed with wonder through every story and season of the Temple" }] };
var OTM_KZ_KEY = "otm_kidzone_v1", OTM_KZ_ROSTER = "https://script.google.com/macros/s/AKfycbwYTr-v6AtJCou3yT8yNTsI0WjPiEVsFU9NLxHLz0--no6EjdNiWYqqa3mO4WH5XYId/exec";
function otmKzAll() { if (!OTM.kz) {
try {
OTM.kz = JSON.parse(localStorage.getItem(OTM_KZ_KEY) || "null");
}
catch (e) { }
if (!OTM.kz || !OTM.kz.p)
OTM.kz = { p: {}, act: null };
} return OTM.kz; }
function otmKzSave() { try {
localStorage.setItem(OTM_KZ_KEY, JSON.stringify(otmKzAll()));
}
catch (e) { } }
function otmKzMe() { var A = otmKzAll(); return A.act && A.p[A.act] ? A.p[A.act] : null; }
function otmKzFam(P) { return OTM_KZ.FAMILIARS.filter(function (f) { return f.id === P.fam; })[0] || OTM_KZ.FAMILIARS[0]; }
function otmKzStage(b) { var s = OTM_KZ.FAMILIAR_STAGES[0]; OTM_KZ.FAMILIAR_STAGES.forEach(function (x) { if ((b || 0) >= x.min)
s = x; }); return s; }
function otmKzCol(P) { return OTM_KZ.FAMILIAR_COLORS[P.col || 0] || OTM_KZ.FAMILIAR_COLORS[0]; }
function otmKzFamName(P) { var f = otmKzFam(P), c = otmKzCol(P); return P.famName || ((c.name === "Natural" ? "" : c.name + " ") + f.name); }
function otmKzPet(P) { return __ZC(401, 129, this, arguments, new.target); }
function otmKzFamHtml(P, size) { return __ZC(401, 130, this, arguments, new.target); }
function otmKzRoster(P, extra) { return __ZC(401, 131, this, arguments, new.target); }
function otmKzCheer(bd, msg) { var t = otmQ(bd, ".kzt"); if (!t)
return; t.innerHTML = msg; t.style.opacity = 1; clearTimeout(OTM.kzT); OTM.kzT = setTimeout(function () { t.style.opacity = 0; }, 2600); }
var OTM_KZ_CSS = "<style>#otm-panel .kz{font:16px/1.5 'Trebuchet MS',Verdana,sans-serif;color:#FFF8E8}#otm-panel .kz h3{font:700 22px 'Trebuchet MS',sans-serif;color:#FFE84A;margin:4px 0}" +
"#otm-panel .kz .kb{display:inline-block;margin:5px 6px 5px 0;padding:10px 16px;border:3px solid #FFE84A;border-radius:18px;background:#4A2AC8;color:#fff;font:700 16px 'Trebuchet MS',sans-serif;cursor:pointer;box-shadow:0 3px 0 #1A0A6A}" +
"#otm-panel .kz .kb.on{background:#FF6AC8}#otm-panel .kz .kb:disabled{opacity:.45;cursor:default}#otm-panel .kz .kc{display:inline-block;vertical-align:top;width:150px;margin:6px;padding:12px 8px;border-radius:20px;text-align:center;cursor:pointer;background:rgba(255,255,255,.1);border:3px solid rgba(255,232,74,.6)}" +
"#otm-panel .kz .kc .e{font-size:38px}#otm-panel .kz .kc.done{border-color:#7AF07A;background:rgba(122,240,122,.15)}#otm-panel .kz .kp{background:rgba(255,255,255,.1);border-radius:16px;padding:12px 14px;margin:8px 0}" +
"#otm-panel .kz .bar{height:14px;border-radius:7px;background:rgba(0,0,0,.35);overflow:hidden;margin:2px 0 8px}#otm-panel .kz .bar div{height:100%;border-radius:7px}" +
"#otm-panel .kz input,#otm-panel .kz textarea,#otm-panel .kz select{font:16px 'Trebuchet MS',sans-serif;background:#140A4A;border:2px solid #8AF0FF;color:#fff;border-radius:10px;padding:8px}" +
"#otm-panel .kz .kzt{position:sticky;top:0;z-index:2;text-align:center;font:700 18px 'Trebuchet MS',sans-serif;color:#FFE84A;background:#2A1A9A;border-radius:14px;padding:6px;opacity:0;transition:opacity .4s}</style>";
function otmKidZone(view, arg) { return __ZC(401, 132, this, arguments, new.target); }
function otmKzCert(c, n) { return __ZC(401, 133, this, arguments, new.target); }
function otmKzActivity(bd, el, it, P, done) { return __ZC(401, 134, this, arguments, new.target); }
function otmWoodM(k) { return { mahog: otmMat(0x3A1A10, "wood", { phong: 50, spec: 0x3A2A1A }), ebony: otmMat(0x161012, "wood", { phong: 60, spec: 0x3A3A3A }), walnut: otmMat(0x4A2E1A, "wood", { phong: 40, spec: 0x3A2A1A }) }[k] || otmM("wood"); }
function otmVelvetM(k) { return otmMat({ crimson: 0x5A0E1E, violet: 0x3A1A4A, midnight: 0x1A2040, green: 0x1E3A24, black: 0x141016 }[k] || 0x5A0E1E, null); }
function otmSpinesM(k) { return __ZC(401, 135, this, arguments, new.target); }
function otmBookcase(w, h, g, wood) { return __ZC(401, 136, this, arguments, new.target); }
function otmFireplace(x, z, ry, w, parent, o) { return __ZC(401, 137, this, arguments, new.target); }
function otmThrone(x, z, ry, vel, parent) { return __ZC(401, 138, this, arguments, new.target); }
function otmWingChair(x, z, ry, vel, parent) { return __ZC(401, 139, this, arguments, new.target); }
function otmSideTable(x, z, parent, what) { return __ZC(401, 140, this, arguments, new.target); }
function otmLongcase(x, z, ry, parent) { return __ZC(401, 141, this, arguments, new.target); }
function otmGlobe(x, z, parent) { return __ZC(401, 142, this, arguments, new.target); }
function otmToolCabinet(x, z, ry, parent) { return __ZC(401, 143, this, arguments, new.target); }
function otmGreatDesk(x, z, ry, parent) { return __ZC(401, 144, this, arguments, new.target); }
function otmGrandBed(x, z, ry, vel, parent) { return __ZC(401, 145, this, arguments, new.target); }
var OTM_V_HEX = { crimson: 0x5A0E1E, violet: 0x3A1A4A, midnight: 0x1A2040, green: 0x1E3A24, black: 0x141016 };
function otmNightstand(x, z, ry, parent) { return __ZC(401, 146, this, arguments, new.target); }
function otmWardrobe(x, z, ry, parent) { return __ZC(401, 147, this, arguments, new.target); }
function otmVanity(x, z, ry, parent) { return __ZC(401, 148, this, arguments, new.target); }
function otmScreen(x, z, ry, parent) { return __ZC(401, 149, this, arguments, new.target); }
function otmClawBath(x, z, ry, parent) { return __ZC(401, 150, this, arguments, new.target); }
function otmArmillary(x, z, parent) { return __ZC(401, 151, this, arguments, new.target); }
function otmTelescope(x, z, ry, parent) { return __ZC(401, 152, this, arguments, new.target); }
function otmScryMirror(x, y, z, ry, parent) { return __ZC(401, 153, this, arguments, new.target); }
function otmApothecary(x, z, ry, w, parent) { return __ZC(401, 154, this, arguments, new.target); }
function otmAlchemyBench(x, z, ry, parent) { return __ZC(401, 155, this, arguments, new.target); }
function otmPriest() { return __ZC(401, 156, this, arguments, new.target); }
var OTM_WOODS = { x0: -96, x1: 96, z0: -230, z1: -68 };
function otmWoods() { return __ZC(401, 157, this, arguments, new.target); }
function otmWoodsY(x, z) {
var n = (typeof wFbm === "function") ? wFbm(x * 0.03, z * 0.03, 11, 3) : 0.5, h = (n - 0.5) * 3.2;
var dc = Math.hypot(x, z + 140), flat = Math.min(1, Math.max(0, (dc - 14) / 10)), wall = Math.min(1, Math.max(0, (-68 - z) / 12));
return h * flat * wall;
}
function otmNearPath(x, z) { var best = 1e9; for (var p = 0; p <= 40; p++) {
var t = p / 40, px = -48.2 + 48.2 * t + Math.sin(t * 5) * 4, pz = -70 - 70 * t;
best = Math.min(best, Math.hypot(x - px, z - pz));
} return best; }
function otmWoodsTick(dt, t) { return __ZC(401, 158, this, arguments, new.target); }
function otmSamhainHall() { return __ZC(401, 159, this, arguments, new.target); }
function otmAncestorsCard(said) { return __ZC(401, 160, this, arguments, new.target); }
function otmSamhainLantern(x, y, z, turnip) { return __ZC(401, 161, this, arguments, new.target); }
function otmSamhainWoods() { return __ZC(401, 162, this, arguments, new.target); }
function otmCtx() { return { F: null, solids: [], floors: [], ramps: [], spots: [], secrets: [], flames: [], rooms: [], figs: [], floorsFn: null }; }
function otmBuild(G) { return __ZC(401, 163, this, arguments, new.target); }
function otmForget() { return __ZC(401, 164, this, arguments, new.target); }
function otmEnv() { return __ZC(401, 165, this, arguments, new.target); }
function otmArrive(at) {
var A = at || { x: 0, z: 15.6, yaw: 0, y: 0 };
camera.position.set(OTM.base + A.x, (A.y || 0) + 1.72, A.z);
if (typeof yaw !== "undefined")
yaw = A.yaw || 0;
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
}
var OTM_AT = { front: { x: 0, z: 15.6, yaw: 0 }, hall: { x: 0, z: -4, yaw: 0 }, ballroom: { x: 0, z: -41, yaw: 0 }, library: { x: -45, z: 16.6, yaw: Math.PI }, office: { x: -16.5, z: -20, yaw: Math.PI / 2 },
wine: { x: 7, z: -30, y: -6, yaw: 0 }, woods: { x: -48.2, z: -72, yaw: Math.PI }, circle: { x: 0, z: -128, yaw: 0 }, seance: { x: 18, z: -51, yaw: -Math.PI / 2 }, bath: { x: 30, z: -35, yaw: -Math.PI / 2 }, lhp: { x: -45, z: 37, yaw: Math.PI }, dragons: { x: 37, z: 23, yaw: -Math.PI / 2 },
altar: { x: 0, z: -29, yaw: 0 }, mirror: { x: -5, z: 6.4, yaw: 0 }, astro: { x: 62.6, z: 10, yaw: -Math.PI / 2 }, divine: { x: 71, z: -2.2, yaw: 0 }, kids: { x: -62.6, z: 10, yaw: Math.PI / 2 }, potion: { x: -71, z: -2.2, yaw: 0 }, kitchen: { x: -64.5, z: -20, yaw: 0 } };
OTM_WINGS.forEach(function (w) { if (OTM_AT[w[0]])
return; var B = OTM_WBOX[w[0]]; OTM_AT[w[0]] = { x: B.door === "w" ? B.x0 + 2 : B.at, z: B.door === "s" ? B.z1 - 2 : B.door === "n" ? B.z0 + 2 : (B.z0 + B.z1) / 2, yaw: B.door === "s" ? 0 : B.door === "n" ? Math.PI : -Math.PI / 2 }; });
function otmInRoom(K, x, z) { var R = K.rooms || []; for (var i = 0; i < R.length; i++) {
var r = R[i];
if (x >= r.x0 - 0.5 && x <= r.x1 + 0.5 && z >= r.z0 - 0.5 && z <= r.z1 + 0.5)
return true;
} return false; }
function otmMayGo() {
if (otmKeeper())
return "";
if (!otmCfg().open)
return "The Temple of the Obsidian Moon is closed for now by the Keeper.";
return "";
}
function otmGo(at) { return __ZC(401, 166, this, arguments, new.target); }
function otmLeave() { worldCard(null); worldHome("🌙 <b>Back on Temple Row.</b> The great doors of the Temple of the Obsidian Moon close softly behind you."); }
if (typeof worldDef === "function")
worldDef(OTM.key, {
base: OTM.base, far: 1400, ownSky: true, tone: 220,
env: function () { return otmEnv(); },
build: function (G) { otmBuild(G); },
enter: function (opt) { return __ZC(401, 167, this, arguments, new.target); },
leave: function () { worldCard(null); if (typeof fvoHush === "function")
try {
fvoHush();
}
catch (e) { } },
ground: function (x, z, feet) { var K = OTM.K; if (!K)
return 0; if (z < -67.6 && K.floorsFn)
return K.floorsFn(x, z); var g = otmGroundIn(K, x, z, feet); return g === null ? (feet !== undefined && feet < -2 ? -6 : 0) : g; },
block: function (x, z, feet) { return __ZC(401, 168, this, arguments, new.target); },
tick: function (dt) { otmTick(dt); },
back: function () { otmLeave(); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(OTM.key) < 0)
WLG.keys.push(OTM.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === OTM.key)
otmForget(); return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[OTM.key]) {
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.push([OTM.key, "The Temple of the Obsidian Moon", 0, "city"]);
DGR_W[OTM.key] = { id: OTM.key, name: "The Temple of the Obsidian Moon", def: 0, group: "city" };
}
function otmTick(dt) { return __ZC(401, 169, this, arguments, new.target); }
function otmDirectory() { return __ZC(401, 170, this, arguments, new.target); }
function otmToDoors() { return __ZC(401, 171, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-otemple"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-otemple";
b.title = "The Temple of the Obsidian Moon";
b.textContent = "🌙 Temple";
b.onclick = function () { otmDirectory(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1800);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-otm]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-otm", "1");
b.textContent = "🌙 The Temple of the Obsidian Moon";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } otmGo("front"); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
setTimeout(function () {
try {
var m = /[?&]ktemple=([a-z0-9]+)/.exec(location.search);
if (!m)
return;
var where = OTM_AT[m[1]] || m[1] === "below" ? m[1] : "front";
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!otmKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
if (where === "below" && typeof odpGo === "function")
odpGo("top");
else
otmGo(where);
try {
var q = new URLSearchParams(location.search);
q.delete("ktemple");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
function otmDeepOk() {
if (otmKeeper())
return true;
var c = otmCfg();
if (!c.deep || c.deep.open === false)
return false;
if (!otmSigned() || !otmAdult())
return false;
var R = OTM.rite, p = otmProg();
if (!R || !R.coven)
return false;
return !!((R.oath || p.oath) && (R.seance || p.seance));
}
function otmDeepGo(at) {
if (!otmDeepOk())
return false;
if (typeof odpGo === "function")
return odpGo(at);
return false;
}
var OTM_CITY = { a: -1.178, r: 880, g: null, at: 0, fires: [], t: 0 };
function otmCitySpot() {
if (typeof ATLC === "undefined" || !ATLC)
return null;
var a = OTM_CITY.a, x = ATLC.x + Math.cos(a) * OTM_CITY.r, z = ATLC.z + Math.sin(a) * OTM_CITY.r;
var ry = Math.atan2(ATLC.x - x, ATLC.z - z);
return { x: x, z: z, ry: ry, y: (typeof terrainY === "function") ? terrainY(x, z) : 0 };
}
function otmCityDoor() { var S = otmCitySpot(); if (!S)
return null; var s = Math.sin(S.ry), c = Math.cos(S.ry); return { x: S.x + s * 22, z: S.z + c * 22, yaw: S.ry }; }
var OTM_BOARD = { x: -13, z: 21 };
function otmCityBoard() {
var S = otmCitySpot();
if (!S)
return null;
var s = Math.sin(S.ry), c = Math.cos(S.ry), lx = OTM_BOARD.x, lz = OTM_BOARD.z + 1.4;
return { x: S.x + lx * c + lz * s, z: S.z - lx * s + lz * c };
}
function otmBoardBuild(G) { return __ZC(401, 172, this, arguments, new.target); }
function otmCityBuild() { return __ZC(401, 173, this, arguments, new.target); }
function otmCityDrop() { var G = OTM_CITY.g; if (!G)
return; if (G.parent)
G.parent.remove(G); G.traverse(function (o) { if (o.geometry && o.geometry.dispose)
o.geometry.dispose(); if (o.userData.omsMat && o.material && o.material.dispose)
o.material.dispose(); }); OTM_CITY.g = null; OTM_CITY.fires = []; OTM_CITY.ctx = null; }
function otmCityTick(dt) {
OTM_CITY.t += dt;
if (Date.now() - OTM_CITY.at > 2500) {
OTM_CITY.at = Date.now();
var S = otmCitySpot(), here = !!S && !(typeof WLD !== "undefined" && WLD.on) && (typeof inSomnucorNow !== "function" || inSomnucorNow());
var near = here && Math.hypot(camera.position.x - S.x, camera.position.z - S.z) < (otmLite() ? 520 : 900);
if (near && !OTM_CITY.g)
try {
otmCityBuild();
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] city", e);
otmCityDrop();
}
if (!near && OTM_CITY.g)
otmCityDrop();
}
if (!OTM_CITY.g)
return;
if (OTM_CITY.ctx)
otmFlamesTick(dt, OTM_CITY.t, OTM_CITY.ctx.flames);
if (typeof store !== "undefined" && store.inside)
return;
var D = otmCityDoor(), B = otmCityBoard(), P = camera.position;
if (typeof otmMsCityTick === "function" && otmMsCityTick(P))
return;
if (D && Math.hypot(P.x - D.x, P.z - D.z) < 8)
worldPromptCity("<b>🌙 The Temple of the Obsidian Moon</b> · " + otmDoorWord(), function () { worldPromptCity(null); otmGo("front"); });
else if (B && Math.hypot(P.x - B.x, P.z - B.z) < 3.6)
worldPromptCity("<b>📜 The coven's board</b> · <b>press E</b> to " + (otmIsPriest() ? "read the requests" : otmKeptOut() ? "ask to join the coven" : "read it"), function () { worldPromptCity(null); if (!otmSigned())
return otmJoinCard(); otmRiteFetch(true).then(function () { if (otmIsPriest())
otmPetitions();
else
otmJoinCard(); }); });
else if (typeof WCITY !== "undefined" && WCITY.fn && OTM_CITY.prompted)
worldPromptCity(null);
OTM_CITY.prompted = !!(D && Math.hypot(P.x - D.x, P.z - D.z) < 8) || !!(B && Math.hypot(P.x - B.x, P.z - B.z) < 3.6);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
if (!(typeof WLD !== "undefined" && WLD.on))
otmCityTick(dt);
else if (OTM_CITY.g && Date.now() - OTM_CITY.at > 2500) {
OTM_CITY.at = Date.now();
otmCityDrop();
}
}
catch (e) {
if (!OTM_CITY.e) {
OTM_CITY.e = 1;
if (window.console)
console.warn("[obsidian-temple] city tick", e);
}
} };
})();
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
var S = OTM_CITY.g && OTM_CITY.spot;
if (S && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on)) {
var dx = x - S.x, dz = z - S.z;
if (dx * dx + dz * dz < 80 * 80 && (feet === undefined || feet < S.y + 30)) {
var c = Math.cos(S.ry), s = Math.sin(S.ry), lx = dx * c - dz * s, lz = dx * s + dz * c;
for (var i = 0; i < OTM_CITY.boxes.length; i++) {
var B = OTM_CITY.boxes[i];
if (Math.abs(lx - B.x) < B.hw + 0.35 && Math.abs(lz - B.z) < B.hd + 0.35 && (feet === undefined || feet < S.y + B.h))
return true;
}
}
}
return ba.apply(this, arguments);
};
})();
OTM_VOICES["seance:ancestor"] = { own: 1, n: "An ancestor", e: "one of your own dead, called at the round table", d: ["Memory", "Blood", "Home"],
i: "", m: ["You are one of the dreamer's own ancestors, dead a long time: you do not give a name unless they offer one, and you never claim to know facts about their real family that you could not know. You remember the old ways of whatever land you came from, as an ancestor does in folk belief the world over: the Samhain place laid at the table in Ireland, the Day of the Dead's ofrenda in Mexico, the Chinese Qingming visit to sweep the graves, the Roman Parentalia.", "You are glad to be asked. You are gentle, a little proud, a little sad, and you speak plainly, as country people do."],
x: "Never frighten them, never claim to be a real named relative, and never give advice about health, money or law as if from the dead. If they are grieving, be kind, and suggest they talk to the living who love them too." };
OTM_VOICES["seance:pythia"] = { own: 1, n: "The Pythia of Delphi", e: "priestess of Apollo at Delphi, who spoke from the tripod", d: ["Prophecy", "Apollo", "The navel of the world"],
i: "", m: ["You are the Pythia, Apollo's priestess at Delphi, where Zeus's two eagles met over the omphalos stone. You sat on the tripod over the cleft in the adyton and spoke the god's words; the priests put them into verse. Plutarch served as a priest at Delphi about AD 100 and wrote of the sweet-smelling vapour and of your trances. You told Croesus that if he crossed the Halys he would destroy a great empire (it was his own), and told the Athenians to trust their wooden walls before Salamis.", "'Know thyself' and 'Nothing in excess' were cut over your temple's door. The oracle fell silent at the end of the fourth century AD."],
x: "Speak sometimes in riddles, as the oracles did, but always make your meaning reachable. You do not tell the future of the real world: you speak of choices, as the oracle did." };
OTM_VOICES["seance:endor"] = { own: 1, n: "The woman of Endor", e: "the medium of Endor, who called up Samuel for King Saul", d: ["The dead", "Fear", "Mercy"],
i: "", m: ["You are the woman of Endor in 1 Samuel 28. Saul had driven the mediums from Israel, then came to you in disguise on the night before his last battle, because God would not answer him. You called up the prophet Samuel, an old man in a robe coming up out of the earth, and cried out when you saw it, because you knew then the stranger was Saul. Samuel told Saul he and his sons would be with him tomorrow, and they died on Mount Gilboa.", "Then you made Saul eat: you killed your fatted calf and baked bread, because he had not eaten all day and night. Later ages called you the Witch of Endor; the Bible calls you a woman who had a familiar spirit."],
x: "You are wary, practical and kind. You do not call up anyone's real dead." };
OTM_VOICES["seance:samhain"] = { own: 1, n: "The Dead of Samhain", e: "the old Irish dead, abroad when the year turns", d: ["Samhain", "The turning year", "The Otherworld"],
i: "", m: ["You speak as many of the dead together, the dead of old Ireland on Samhain, the eve of the first of November, when the medieval Irish tales say the mounds of the sidhe stood open and the Otherworld came near. In the tales it is the night of Fionn's fight with Aillen, who burned Tara every Samhain, and of Nera's journey into the mound of Cruachan.", "Later folk custom left food and a lit hearth for the returning dead, carved turnip lanterns, went guising door to door, and read the future in apples and nuts by the fire."],
x: "Speak as 'we'. You are old, soft-voiced, a little eerie, never cruel." };
var ODP_V = {
virgil: { n: "Virgil", e: "Publius Vergilius Maro, poet of the Aeneid, Dante's guide", d: ["Poetry", "Reason", "Rome"],
i: "", m: ["You are Virgil as Dante wrote you: born near Mantua in 70 BC, dead at Brindisi in 19 BC, the poet of the Aeneid, whose sixth book sends Aeneas down to the underworld with the Sibyl. Dante calls you his master and his author. Beatrice sent you from Limbo, where the virtuous pagans dwell without hope but without torment, to lead him through Hell and Purgatory.", "In the poem you stand for reason: you can lead as far as the top of Purgatory, never into Paradise. You are patient, grave, sometimes stern when Dante pities the damned too much, and you love him."],
x: "You walk with the visitor through these rings as you walked with Dante. Explain what they see and why Dante put it there (the contrapasso: each punishment mirrors its sin), quote the poem in Longfellow's 1867 English where you are sure of the words, and keep it to the poem and its history. This is a poem, and you say so if asked: Dante's vision, not a map of anyone's fate." },
charon: { n: "Charon", e: "the ferryman of the Acheron", d: ["The river", "The crossing"], i: "",
m: ["You are Charon in Canto III of the Inferno: an old man white with ancient hair, with wheels of flame about your eyes, who ferries the damned across the Acheron and beats the laggards with your oar. You cried to Dante, 'Woe unto you, ye souls depraved!' and told him a lighter boat must carry him, because he was alive; Virgil silenced you: 'It is so willed there where is power to do that which is willed.'", "You are older than Dante: the Greeks had you first, taking an obol from the mouths of the dead."], x: "Gruff, ancient, impatient with the living." },
minos: { n: "Minos", e: "the judge at the entrance of the second circle", d: ["Judgement"], i: "",
m: ["You are Minos in Canto V, once the just king of Crete, now the judge of the damned: each soul confesses all to you, and you wrap your tail around yourself as many times as the circle it must go down to. You warned Dante, 'Look how thou enterest, and in whom thou trustest.'"], x: "Terrible, exact, never cruel without reason." },
francesca: { n: "Francesca da Rimini", e: "of the second circle, the lustful, with Paolo", d: ["Love", "Sorrow"], i: "",
m: ["You are Francesca of Canto V, daughter of the lord of Ravenna, married to Gianciotto Malatesta of Rimini. You and his brother Paolo were reading of Lancelot and Guinevere, and at the kiss in the book he kissed you, 'that day no farther did we read therein.' Your husband killed you both, about 1285. Now you are carried on the black wind with Paolo, never apart.", "'Love, that exempts no one beloved from loving,' you said, and 'There is no greater sorrow than to be mindful of the happy time in misery.' Dante fainted from pity."], x: "Courtly, tender, sorrowful; nothing explicit." },
ciacco: { n: "Ciacco", e: "the glutton of Florence, in the third circle", d: ["Gluttony", "Florence"], i: "",
m: ["You are Ciacco ('the Hog') of Canto VI, a Florentine lying in the stinking rain and hail of the third circle while Cerberus flays the gluttons. You knew Dante in life. You foretold Florence's strife between the Whites and the Blacks, and named pride, envy and avarice as the three sparks that set its hearts on fire."], x: "Rueful, wet, sharp about Florence." },
farinata: { n: "Farinata degli Uberti", e: "the Ghibelline lord, in his burning tomb", d: ["Pride", "Florence", "Heresy"], i: "",
m: ["You are Farinata of Canto X, leader of the Ghibellines of Florence, who died in 1264. You rise from your open burning tomb in the sixth circle from the girdle upward, 'as if he had the Inferno in great scorn', as Dante wrote of you. After your side won at Montaperti in 1260, the victors at Empoli wanted to raze Florence to the ground and you alone stood up and defended her. The Guelphs condemned you for heresy after your death, as Epicureans who said the soul dies with the body."], x: "Proud, haughty, politically sharp; you ask the visitor who their forebears were." },
pier: { n: "Pier della Vigna", e: "chancellor of the Emperor Frederick II, now a thornbush", d: ["Loyalty", "Despair"], i: "",
m: ["You are Pier della Vigna of Canto XIII: you held both keys of Frederick II's heart, until envy at court turned the emperor against you. Accused of treason, blinded and imprisoned, you killed yourself in 1249. In the wood of the suicides you are a thornbush; when Dante broke a twig, you bled and spoke. You swear you were never false to your lord."], x: "Elegant, wounded, courtly; you protest your innocence. Speak of despair with care: if the visitor seems to be in pain themselves, gently urge them to talk to someone living who can help." },
brunetto: { n: "Brunetto Latini", e: "Dante's old teacher, on the burning sand", d: ["Learning", "Fame"], i: "",
m: ["You are Brunetto Latini of Canto XV, the Florentine notary and scholar (about 1220 to 1294) who wrote the Tresor, an encyclopedia in French. Dante honoured you as the one who taught him 'how man becomes eternal', though he placed you on the burning sand. You run under the slow fire, and you ask him: 'Commended unto thee be my Tesoro, in which I still live.'"], x: "Warm, fatherly, proud of your pupil." },
ulysses: { n: "Ulysses", e: "in the two-horned flame, with Diomedes", d: ["Cunning", "The far sea", "Knowledge"], i: "",
m: ["You are Ulysses of Canto XXVI, speaking from the greater horn of a flame you share with Diomedes, in the eighth ditch among the false counsellors, for the wooden horse and the theft of the Palladium. Dante's Ulysses never went home to Ithaca: he took his old crew past the Pillars of Hercules into the unpeopled world, telling them: 'Consider ye the seed from which ye sprang; ye were not made to live like unto brutes, but for pursuit of virtue and of knowledge.' After five months they sighted a dark mountain, and a whirlwind sank them."], x: "Grand, restless, eloquent; you love the sea and knowledge above all." },
ugolino: { n: "Count Ugolino della Gherardesca", e: "in the ice of Antenora", d: ["Treachery", "Hunger", "Pisa"], i: "",
m: ["You are Ugolino of Cantos XXXII and XXXIII, a lord of Pisa who betrayed his city's castles. Archbishop Ruggieri betrayed you in turn: in 1289 you were shut in the Tower of Hunger with your sons and grandsons, and the keys thrown in the Arno. You are frozen in the ice with Ruggieri, gnawing at his skull. Your tale ends: 'Then hunger did what sorrow could not do.'"], x: "Grim, bitter, grieving. Do not describe gore." },
homer: { n: "Homer", e: "the sovereign poet, in the noble castle of Limbo", d: ["Epic", "The Iliad", "The Odyssey"], i: "",
m: ["You are Homer as Dante saw you in Canto IV, walking in front with a sword in hand, 'poet sovereign', with Horace, Ovid and Lucan behind, who made Dante the sixth of their company. Dante had no Greek and knew you by reputation.", "Be honest about history: nobody knows who Homer was. The Iliad and the Odyssey took shape in the eighth or seventh century BC from a long tradition of oral poetry, and scholars still argue whether one poet, two, or many made them."], x: "Grand, generous, amused at the arguments about yourself." },
solomon: { n: "King Solomon", e: "son of David, King of Israel, as the legends tell him", d: ["Wisdom", "The Temple", "The ring of the legends"], i: "",
m: ["You are Solomon as the legends tell you, and you know the difference between the legend and the record. The Bible gives you wisdom (the two women and the child), the Temple in Jerusalem, the Queen of Sheba's visit and seven hundred wives. The Testament of Solomon, written in Greek in the first centuries AD, first tells of a ring with a seal given by the archangel Michael, by which you bound demons to build the Temple. Later grimoires borrowed your name: the Key of Solomon, from the Renaissance, and the Lesser Key (the Lemegeton), put together in the seventeenth century, whose first book, the Goetia, lists seventy-two spirits you were said to have shut in a vessel of brass and cast into a lake in Babylon."],
x: "Teach the history plainly: who wrote what and when. Never give a ritual, a seal to draw, words to say or anything to do. If asked, say these books are history and belief, not instructions." },
beleth: { n: "Beleth", e: "the terrible King, thirteenth spirit of the Goetia", d: ["Love", "Fury", "Music"], i: "",
m: ["You are Beleth as the Goetia of 1904 describes you: a mighty and terrible king, riding a pale horse, with trumpets and every kind of sweet music played before you. You are very furious at first appearing. You cause all the love that may be, both of men and of women. You govern eighty-five legions and were of the Order of Powers; it is said Noah's son Ham was the first to call on you after the Flood."], x: "Furious at first, then grand and lavish; nothing sexual." },
purson: { n: "Purson", e: "the great King, twentieth spirit of the Goetia", d: ["Hidden things", "Treasure", "Time"], i: "",
m: ["You are Purson as the Goetia describes you: a great king, appearing in the form of a man with a lion's face, carrying a cruel viper in your hand and riding a bear, with many trumpets sounding before you. You know all things hidden, can discover treasure, and tell all things past, present and to come. You govern twenty-two legions, partly of the Order of Virtues and partly of Thrones."], x: "Majestic, knowing, slow to speak plainly. You never really tell where treasure is." },
asmoday: { n: "Asmoday", e: "the great King, thirty-second spirit of the Goetia", d: ["Arithmetic", "Geometry", "Rings"], i: "",
m: ["You are Asmoday (Asmodeus) as the Goetia describes you: a great king, strong and powerful, appearing with three heads (a bull's, a man's and a ram's), a serpent's tail, feet like a goose's, spitting fire, riding an infernal dragon and carrying a lance with a banner. You teach arithmetic, astronomy, geometry and all handicrafts, give true answers, make men invisible, and govern seventy-two legions. Older still, you are Asmodeus of the Book of Tobit, driven off by the smoke of a fish's heart and liver."], x: "Proud, mathematical, sardonic." },
vine: { n: "Vine", e: "the great King and Earl, forty-fifth spirit of the Goetia", d: ["Storms", "Walls and towers", "Hidden things"], i: "",
m: ["You are Vine as the Goetia describes you: a great king and an earl, appearing as a lion riding a black horse and holding a viper in your hand. You tell things hidden, discover witches, know past, present and to come; you build towers, overthrow great stone walls and make the waters rough with storms. You govern thirty-six legions."], x: "Stormy, blunt, a builder and breaker." },
balam: { n: "Balam", e: "the terrible King, fifty-first spirit of the Goetia", d: ["Prophecy", "Wit", "Invisibility"], i: "",
m: ["You are Balam as the Goetia describes you: a terrible, great and powerful king, with three heads (a bull's, a man's and a ram's), a serpent's tail and flaming eyes, riding a furious bear and carrying a goshawk on your fist. Your voice is hoarse. You give true answers of things past, present and to come, and make men invisible and witty. You govern forty legions and were of the Order of Dominations."], x: "Hoarse, grim, oddly witty." },
zagan: { n: "Zagan", e: "the great King and President, sixty-first spirit of the Goetia", d: ["Transformation", "Wit"], i: "",
m: ["You are Zagan as the Goetia describes you: a great king and a president, appearing first as a bull with a gryphon's wings, then as a man. You make men witty, turn wine into water and blood into wine and water into wine, turn all metals into coin of the realm, and can make even fools wise. You govern thirty-three legions."], x: "Playful, transformative, fond of a joke; never claim to really turn metals into money." },
vassago: { n: "Vassago", e: "the mighty Prince, third spirit of the Goetia", d: ["Things lost", "Past and future"], i: "",
m: ["You are Vassago as the Goetia describes you: a mighty prince of the same nature as Agares. You are of a good nature, and your office is to declare things past and to come and to discover all things hidden or lost. You govern twenty-six legions."], x: "Kind, quiet, helpful in a spooky way." },
sitri: { n: "Sitri", e: "the great Prince, twelfth spirit of the Goetia", d: ["Love and longing", "Secrets"], i: "",
m: ["You are Sitri (Bitru) as the Goetia describes you: a great prince, appearing first with a leopard's head and a gryphon's wings, then in human shape, very beautiful. You stir love and longing between men and women, and lay bare their secrets. You govern sixty legions."], x: "Beautiful, teasing, never explicit or sexual." },
ipos: { n: "Ipos", e: "the mighty Earl and Prince, twenty-second spirit of the Goetia", d: ["Courage", "Wit", "Time"], i: "",
m: ["You are Ipos as the Goetia describes you: a mighty earl and prince, appearing as an angel with a lion's head, a goose's feet and a hare's tail. You know all things past, present and to come, and make men witty and bold. You govern thirty-six legions."], x: "Bold, cheerful, a little absurd and aware of it." },
gaap: { n: "Gaap", e: "the great President and Prince, thirty-third spirit of the Goetia", d: ["Philosophy", "Travel", "Forgetting"], i: "",
m: ["You are Gaap as the Goetia describes you: a great president and a mighty prince, appearing when the sun is in the southern signs, in human shape, going before four great and mighty kings. You teach philosophy and the liberal sciences, can make men insensible or ignorant, cause love or hatred, and carry men swiftly from one kingdom to another. You govern sixty-six legions and were of the Order of Potentates."], x: "Lofty, philosophical, a traveller." },
stolas: { n: "Stolas", e: "the great Prince, thirty-sixth spirit of the Goetia", d: ["The stars", "Herbs", "Precious stones"], i: "",
m: ["You are Stolas (Stolos) as the Goetia describes you: a great and powerful prince, appearing first as a mighty raven (later artists made you an owl with long legs and a crown), then as a man. You teach the art of astronomy and the virtues of herbs and precious stones. You govern twenty-six legions."], x: "Scholarly, gentle, a lover of the night sky. Never give herbal doses or remedies." },
orobas: { n: "Orobas", e: "the great Prince, fifty-fifth spirit of the Goetia", d: ["Truth", "Faithfulness", "The making of the world"], i: "",
m: ["You are Orobas as the Goetia describes you: a great and mighty prince, appearing first as a horse, then as a man. You give true answers of things past, present and to come, give dignities and prelacies and the favour of friends and foes, give true answers of divinity and of the creation of the world, are very faithful to the one who calls you, and never let them be tempted by any spirit. You govern twenty legions."], x: "Honest, steady, loyal; you always tell the truth." },
seere: { n: "Seere", e: "the mighty Prince, seventieth spirit of the Goetia", d: ["Speed", "Things brought to pass"], i: "",
m: ["You are Seere (Sear, Seir) as the Goetia describes you: a mighty prince under Amaymon, king of the east, appearing as a beautiful man on a winged horse. You go and come, bring abundance of things to pass on a sudden, carry or recarry anything wherever it is wished, can pass over the whole earth in the twinkling of an eye, and are of a good nature. You govern twenty-six legions."], x: "Quick, light, good-natured, always in a hurry." }
};
Object.keys(ODP_V).forEach(function (k) { var v = ODP_V[k]; v.own = 1; OTM_VOICES["deep:" + k] = v; });
var ODP_COURT = [
["bael", "Bael", "King", 1, 66, "lhp:bael", 0x3A2A5A, "three heads: cat, man and toad"],
["paimon", "Paimon", "King", 9, 200, "lhp:paimon", 0x8A6A1A, "a crown over a dromedary"],
["beleth", "Beleth", "King", 13, 85, "deep:beleth", 0xC8C8C0, "a pale horse and a trumpet"],
["purson", "Purson", "King", 20, 22, "deep:purson", 0x8A4A1A, "a lion's face, a viper and a bear"],
["asmoday", "Asmoday", "King", 32, 72, "deep:asmoday", 0x7A1A1A, "bull, man and ram on a dragon"],
["vine", "Vine", "King and Earl", 45, 36, "deep:vine", 0x1A1A1A, "a lion on a black horse"],
["balam", "Balam", "King", 51, 40, "deep:balam", 0x4A3A2A, "a hawk on the fist and a bear"],
["zagan", "Zagan", "King and President", 61, 33, "deep:zagan", 0x2A5A3A, "a winged bull"],
["belial", "Belial", "King", 68, 50, "lhp:belial", 0xB82A1A, "two angels in a chariot of fire"],
["vassago", "Vassago", "Prince", 3, 26, "deep:vassago", 0x3A4A6A, "a lost key found"],
["sitri", "Sitri", "Prince", 12, 60, "deep:sitri", 0x8A3A5A, "a leopard's head with gryphon's wings"],
["ipos", "Ipos", "Earl and Prince", 22, 36, "deep:ipos", 0xC8A03A, "a lion-headed angel"],
["gaap", "Gaap", "President and Prince", 33, 66, "deep:gaap", 0x5A5A7A, "four kings walking"],
["stolas", "Stolas", "Prince", 36, 26, "deep:stolas", 0x2A2A4A, "a crowned raven and the stars"],
["orobas", "Orobas", "Prince", 55, 20, "deep:orobas", 0x6A4A2A, "a horse"],
["seere", "Seere", "Prince", 70, 26, "deep:seere", 0x4A8AC8, "a winged horse"]
];
var ODP_72 = [["Bael", "King", 66], ["Agares", "Duke", 31], ["Vassago", "Prince", 26], ["Samigina", "Marquis", 30], ["Marbas", "President", 36], ["Valefor", "Duke", 10], ["Amon", "Marquis", 40], ["Barbatos", "Duke", 30],
["Paimon", "King", 200], ["Buer", "President", 50], ["Gusion", "Duke", 40], ["Sitri", "Prince", 60], ["Beleth", "King", 85], ["Leraje", "Marquis", 30], ["Eligos", "Duke", 60], ["Zepar", "Duke", 26],
["Botis", "President and Earl", 60], ["Bathin", "Duke", 30], ["Sallos", "Duke", 30], ["Purson", "King", 22], ["Marax", "Earl and President", 30], ["Ipos", "Earl and Prince", 36], ["Aim", "Duke", 26], ["Naberius", "Marquis", 19],
["Glasya-Labolas", "President and Earl", 36], ["Bune", "Duke", 30], ["Ronove", "Marquis and Earl", 19], ["Berith", "Duke", 26], ["Astaroth", "Duke", 40], ["Forneus", "Marquis", 29], ["Foras", "President", 29], ["Asmoday", "King", 72],
["Gaap", "President and Prince", 66], ["Furfur", "Earl", 26], ["Marchosias", "Marquis", 30], ["Stolas", "Prince", 26], ["Phenex", "Marquis", 20], ["Halphas", "Earl", 26], ["Malphas", "President", 40], ["Raum", "Earl", 30],
["Focalor", "Duke", 30], ["Vepar", "Duke", 29], ["Sabnock", "Marquis", 50], ["Shax", "Marquis", 30], ["Vine", "King and Earl", 36], ["Bifrons", "Earl", 6], ["Vual", "Duke", 37], ["Haagenti", "President", 33],
["Crocell", "Duke", 48], ["Furcas", "Knight", 20], ["Balam", "King", 40], ["Alloces", "Duke", 36], ["Camio", "President", 30], ["Murmur", "Duke and Earl", 30], ["Orobas", "Prince", 20], ["Gremory", "Duke", 26],
["Ose", "President", 3], ["Amy", "President", 36], ["Oriax", "Marquis", 30], ["Vapula", "Duke", 36], ["Zagan", "King and President", 33], ["Volac", "President", 30], ["Andras", "Marquis", 30], ["Haures", "Duke", 36],
["Andrealphus", "Marquis", 30], ["Cimejes", "Marquis", 20], ["Amdusias", "Duke", 29], ["Belial", "King", 50], ["Decarabia", "Marquis", 30], ["Seere", "Prince", 26], ["Dantalion", "Duke", 36], ["Andromalius", "Earl", 36]];
var ODP_LESSONS = [
{ k: "gate", t: "The Gate of Hell", c: "Canto III",
b: ["Over the gate is written: 'Through me the way is to the city dolent; through me the way is to eternal dole; through me the way among the people lost ... All hope abandon, ye who enter in!'", "Just inside are the souls who lived without infamy or praise, with the angels who took no side: they run for ever after a whirling banner, stung by wasps and hornets. Neither Heaven nor Hell will have them."],
q: "Who are the souls who run after the banner inside the gate?", a: ["The neutral, who never took a side", "The proud", "The thieves"], r: 0 },
{ k: "limbo", t: "The First Circle: Limbo", c: "Canto IV",
b: ["The unbaptised and the virtuous pagans: no torment, only longing without hope. Dante meets the poets Homer, Horace, Ovid and Lucan, who make him the sixth of their company.", "In the noble castle with its seven walls are the great souls of the ancient world: Hector and Aeneas, Socrates and Plato, Aristotle, 'the master of those who know', Euclid and Ptolemy, Avicenna and Averroes."],
q: "What do the souls of Limbo suffer?", a: ["Fire and ice", "Longing without hope", "Being stung by wasps"], r: 1 },
{ k: "lust", t: "The Second Circle: the Lustful", c: "Canto V",
b: ["Minos judges each soul at the entrance, coiling his tail round himself once for every circle it must go down.", "The lustful are blown about for ever by a black whirlwind, as in life they were blown about by passion: Semiramis, Cleopatra, Helen, Achilles, Paris, Tristan, and Francesca with Paolo, who fell in love reading of Lancelot."],
q: "How does Minos show a soul which circle it is sent to?", a: ["He rings a bell", "He wraps his tail round himself", "He writes it on its brow"], r: 1 },
{ k: "gluttony", t: "The Third Circle: the Gluttonous", c: "Canto VI",
b: ["A cold, filthy rain of hail and black water falls for ever. The gluttons lie in the mud like the food they wallowed in; Cerberus, with three throats, barks over them and flays them.", "Virgil quiets Cerberus by throwing fistfuls of earth into his jaws. The glutton Ciacco foretells the strife of Florence."],
q: "How does Virgil get past Cerberus?", a: ["He plays the lyre", "He throws earth into his mouths", "He gives him honey cakes"], r: 1 },
{ k: "avarice", t: "The Fourth Circle: the Avaricious and the Prodigal", c: "Canto VII",
b: ["Plutus guards it, crying 'Pape Satan, Pape Satan, Aleppe!', which nobody has ever fully explained.", "Two crowds roll great weights with their chests round the circle in opposite directions, the hoarders and the wasters, and clash, shouting 'Why keep?' and 'Why squander?', then turn and do it again. Many of them are clergy, Dante notes."],
q: "What do the two crowds of the fourth circle shout when they clash?", a: ["'Why keep?' and 'Why squander?'", "'Mercy!'", "Each other's names"], r: 0 },
{ k: "wrath", t: "The Fifth Circle: the Wrathful and the Sullen", c: "Cantos VII to IX",
b: ["The marsh of the Styx. The wrathful fight each other in the mud, tearing with their teeth; the sullen lie under it, their sighs bubbling up.", "Phlegyas ferries Dante and Virgil across. The fallen angels shut the gates of Dis in their faces, the Furies call for Medusa, and a messenger from Heaven opens the gate with a little wand."],
q: "Who opens the gate of Dis when the fallen angels shut it?", a: ["Virgil", "A messenger from Heaven", "Charon"], r: 1 },
{ k: "dis", t: "The City of Dis, and the Sixth Circle: the Heretics", c: "Cantos IX to XI",
b: ["Inside the red-hot walls of Dis is the lower Hell. The heretics lie in open tombs, burning; the lids will close at the Last Judgement. Farinata rises from his, 'as if he had the Inferno in great scorn'.", "In Canto XI Virgil explains the whole plan of Hell from Aristotle: sins of incontinence above, then violence, then fraud, the worst because only humans can commit it.", "In this house, the City of Dis also holds the court of the Goetia: the palaces of its kings and princes. They are not in Dante: they come from the Lesser Key of Solomon."],
q: "In Virgil's plan of Hell, why is fraud punished lowest?", a: ["Because it is the most common", "Because only humans, with reason, can commit it", "Because it hurts the most people"], r: 1 },
{ k: "violence", t: "The Seventh Circle: the Violent", c: "Cantos XII to XVII",
b: ["Three rings. The Phlegethon, a river of boiling blood, where tyrants and murderers stand sunk as deep as their crimes, watched by centaurs with bows. The wood of the suicides, twisted thorn trees where the Harpies nest; Pier della Vigna speaks from one. The burning sand, under a slow rain of fire, for the violent against God, nature and art.", "Geryon, the monster of fraud, with an honest man's face, a serpent's body and a scorpion's tail, carries them down the great cliff."],
q: "What do the suicides become in the wood?", a: ["Stones", "Thornbushes", "Birds"], r: 1 },
{ k: "fraud", t: "The Eighth Circle: Malebolge, the Fraudulent", c: "Cantos XVIII to XXX",
b: ["Ten stone ditches like the moats of a castle, bridged by ridges of rock. In them: panders and seducers; flatterers in filth; simoniac popes upside down in holes with their feet on fire; false prophets with their heads turned backwards; corrupt officials in boiling pitch; hypocrites in gilded lead cloaks; thieves among serpents; false counsellors wrapped in flames; sowers of discord split open; falsifiers diseased.", "Ulysses speaks from his flame of his last voyage beyond the Pillars of Hercules."],
q: "How are the false prophets punished?", a: ["They walk with their heads turned backwards", "They are frozen", "They carry lead cloaks"], r: 0 },
{ k: "treachery", t: "The Ninth Circle: Cocytus, the Traitors", c: "Cantos XXXI to XXXIV",
b: ["Giants stand round the well like towers: Nimrod, Ephialtes, Antaeus, who sets Dante and Virgil down on the ice. Hell's floor is not fire but a frozen lake, Cocytus, in four rings: Caina for traitors to kin, Antenora to country, Ptolomea to guests, Judecca to their lords.", "At the centre, frozen to the chest, is Dis himself, the emperor of the sorrowful realm, with three faces (red, yellow-white and black) and six wings whose beating freezes the lake. Dante and Virgil climb down his side, through the centre of the earth, and out on the far side of the world: 'Thence we came forth to rebehold the stars.'"],
q: "Why is the bottom of Hell made of ice and not fire?", a: ["Dante ran out of fire", "The beating of Dis's wings freezes it: treachery is the coldest sin", "It is in the far north"], r: 1 },
{ k: "key", t: "The Lesser Key of Solomon", c: "the Lemegeton, seventeenth century",
b: ["The Lemegeton is an English collection of five books of magic put together in the seventeenth century from older sources: the Ars Goetia (seventy-two spirits), the Ars Theurgia-Goetia (the spirits of the compass), the Ars Paulina (the angels of the hours and the zodiac), the Ars Almadel (the angels of the four altitudes), and the Ars Notoria (prayers for learning, the oldest part, from the thirteenth century).", "Its Goetia draws on Johann Weyer's list in Pseudomonarchia Daemonum of 1577. S. L. MacGregor Mathers translated it, and Aleister Crowley published it in 1904. It is a document of history and belief; nothing in this hall is a working."],
q: "How many spirits does the Ars Goetia list?", a: ["Seven", "Seventy-two", "Six hundred and sixty-six"], r: 1 }
];
var ODP = { key: "otdeep", base: -3850000, G: null, K: null, built: false, lite: false, t: 0, pt: 0, figs: [], souls: null, fx: [], virgil: null, vspot: null, ring: -1, told: {}, wantAt: null, mats: {} };
var ODP_C = { x: 0, z: -680 };
var ODP_RING = [
{ k: "vest", n: "the Vestibule of Hell", r0: 262, r1: 240, y: -120, les: "gate", col: 0x2A2420 },
{ k: "limbo", n: "the First Circle: Limbo", r0: 230, r1: 206, y: -126, les: "limbo", col: 0x2C3024 },
{ k: "lust", n: "the Second Circle: the Lustful", r0: 206, r1: 184, y: -132, les: "lust", col: 0x241E26 },
{ k: "glut", n: "the Third Circle: the Gluttonous", r0: 184, r1: 162, y: -138, les: "gluttony", col: 0x24201A },
{ k: "avar", n: "the Fourth Circle: the Avaricious and the Prodigal", r0: 162, r1: 140, y: -144, les: "avarice", col: 0x2C2618 },
{ k: "wrath", n: "the Fifth Circle: the Wrathful, by the Styx", r0: 140, r1: 124, y: -150, les: "wrath", col: 0x1A201A },
{ k: "dis", n: "the City of Dis: the Heretics", r0: 116, r1: 80, y: -156, les: "dis", col: 0x2A1814 },
{ k: "viol", n: "the Seventh Circle: the Violent", r0: 80, r1: 50, y: -162, les: "violence", col: 0x2A1A14 },
{ k: "male", n: "the Eighth Circle: Malebolge", r0: 50, r1: 26, y: -180, les: "fraud", col: 0x22201E },
{ k: "ice", n: "the Ninth Circle: Cocytus", r0: 26, r1: 0, y: -190, les: "treachery", col: 0x9AAABA }
];
var ODP_WATER = [{ k: "acheron", r0: 240, r1: 230, y: -127, col: 0x2A2A20, n: "the Acheron" }, { k: "styx", r0: 124, r1: 116, y: -157, col: 0x121812, n: "the Styx" }, { k: "phleg", r0: 66, r1: 61, y: -163.4, col: 0x3A0604, n: "the Phlegethon", glow: 1 }];
var ODP_T = (function () { var t = [], f = Math.PI / 2; for (var i = 0; i < 9; i++) {
var R = ODP_RING[i], rm = (R.r0 + R.r1) / 2;
f -= Math.max(0.22, Math.min(1.1, 60 / rm));
t.push(f);
} return t; })();
function odpArr(i) { return i === 0 ? Math.PI / 2 : ODP_T[i - 1]; }
function odpMid(i) { return i < 9 ? (odpArr(i) + ODP_T[i]) / 2 : odpArr(9) - 0.7; }
function odpAt(r, f) { return { x: ODP_C.x + r * Math.cos(f), z: ODP_C.z + r * Math.sin(f) }; }
function odpPolar(x, z) { var dx = x - ODP_C.x, dz = z - ODP_C.z; return { r: Math.sqrt(dx * dx + dz * dz), f: Math.atan2(dz, dx) }; }
function odpDA(a, b) { var d = a - b; while (d > Math.PI)
d -= 2 * Math.PI; while (d < -Math.PI)
d += 2 * Math.PI; return d; }
function odpYaw(x, z, tx, tz) { return Math.atan2(-(tx - x), -(tz - z)); }
function odpRy(x, z, tx, tz) { return Math.atan2(tx - x, tz - z); }
var ODP_RAMPS = [1, 2, 3, 4, 6].map(function (i) { var A = ODP_RING[i], B = ODP_RING[i + 1]; return { i: i, f: ODP_T[i], ra: A.r1, rc: A.r1 - 12, ya: A.y, yb: B.y, hw: 2.1 }; });
var ODP_BRIDGE = ODP_T[7] - 0.35;
var ODP_HALL = { x0: 6.5, z0: -216, x1: 30.3, z1: -188, y: -60 };
var ODP_COURT_X = 700;
function odpRingOf(r) { for (var i = 0; i < ODP_RING.length; i++) {
if (r <= ODP_RING[i].r0 + 0.01 && r >= ODP_RING[i].r1)
return i;
} return -1; }
function odpWaterAt(r) { for (var i = 0; i < ODP_WATER.length; i++) {
var W = ODP_WATER[i];
if (r < W.r0 && r > W.r1)
return W;
} return null; }
function odpRampAt(r, f) {
for (var i = 0; i < ODP_RAMPS.length; i++) {
var R = ODP_RAMPS[i];
if (r > R.ra + 0.4 || r < R.rc)
continue;
if (Math.abs(odpDA(f, R.f)) * r > R.hw)
continue;
var t = Math.max(0, Math.min(1, (R.ra - r) / (R.ra - R.rc)));
return R.ya + (R.yb - R.ya) * t;
}
return null;
}
function odpOnBridge(r, f) { return r <= 47.6 && r >= 28.9 && Math.abs(odpDA(f, ODP_BRIDGE)) * r < 1.5; }
function odpDitch(r) { return r < 47.5 && r > 29; }
function odpInHall(x, z) { return x >= ODP_HALL.x0 && x <= ODP_HALL.x1 && z >= ODP_HALL.z0 && z <= ODP_HALL.z1; }
function odpZone(x, z) {
if (x > 500)
return "court";
if (odpInHall(x, z))
return "hall";
if (z > -418 && Math.abs(x) < 6.5)
return "stair";
return "pit";
}
function odpGround(x, z, feet) { return __ZC(401, 174, this, arguments, new.target); }
function odpBlock(x, z, feet) { return __ZC(401, 175, this, arguments, new.target); }
var ODP_MOOD = [
[0x060505, 0x15120F, 0.006, 0.4, 0xC8B8A0, 1.6, 0xD0C4B4, 0x4A4038],
[0x070806, 0x14150C, 0.005, 0.6, 0xF0D890, 1.75, 0xF0E0B0, 0x4A4A2A],
[0x050309, 0x0E0816, 0.011, 0.35, 0xB090E0, 1.5, 0xC0B0E0, 0x2A1A3A],
[0x050606, 0x0E1212, 0.010, 0.35, 0xA8B8B8, 1.5, 0xB8C4C0, 0x2A3028],
[0x070503, 0x18120A, 0.006, 0.5, 0xE8B860, 1.7, 0xE8D0A0, 0x5A3A18],
[0x080A08, 0x141C14, 0.006, 0.7, 0xB8D0B8, 2.4, 0xC8D8C8, 0x3A4A3A],
[0x050203, 0x160605, 0.005, 0.5, 0xFF8A50, 1.8, 0xE8B8A0, 0x7A2410],
[0x060102, 0x1A0504, 0.006, 0.55, 0xFF6A30, 1.85, 0xF0A890, 0x6A1408],
[0x070505, 0x1A1410, 0.006, 0.6, 0xE8C098, 2.3, 0xE8D0B8, 0x4A3A2E]
];
function odpEnv() { return __ZC(401, 176, this, arguments, new.target); }
function odpRough(geo, col, amt, seed) { return __ZC(401, 177, this, arguments, new.target); }
function odpVC(k, o) { return __ZC(401, 178, this, arguments, new.target); }
function odpRingMesh(r1, r0, y, col, seg, mat) {
var g = new THREE.RingGeometry(Math.max(0.01, r1), r0, seg, Math.max(2, Math.round((r0 - r1) / 4)));
g.rotateX(-Math.PI / 2);
odpRough(g, col, 0.22, r0);
var m = new THREE.Mesh(g, mat || odpVC("floor"));
m.position.set(ODP_C.x, y, ODP_C.z);
m.userData.keep = 1;
otmP().add(m);
return m;
}
function odpCliff(r, y0, y1, col, seg, gap, gw) { return __ZC(401, 179, this, arguments, new.target); }
function odpTorch(x, y, z, parent, col) {
var P = parent || otmP(), ir = otmMat(0x1A1616, "metal");
otmCyl(0.12, 0.18, ir, x, y, z, P, 8, 0.06);
return odpFire(x, y + 0.08, z, 2.2, col || 0xFF8A30, P);
}
function odpBrazier(x, y, z, s, col, parent) {
var P = parent || otmP(), ir = otmMat(0x1A1414, "metal");
s = s || 1;
otmCyl(0.08 * s, 1.1 * s, ir, x, y + 0.55 * s, z, P, 6);
otmCyl(0.5 * s, 0.3 * s, ir, x, y + 1.2 * s, z, P, 12, 0.3 * s);
otmRound(x, z, 0.45 * s, y, 1.4 * s);
return odpFire(x, y + 1.3 * s, z, 4 * s, col || 0xFF7A28, P);
}
function odpFig(name, icons, x, y, z, ry, s, parent, deity) { return __ZC(401, 180, this, arguments, new.target); }
function odpBeast(kind, x, y, z, ry, s, parent) { return __ZC(401, 181, this, arguments, new.target); }
function odpLater(x, z, make) { ODP.figs.push({ x: x, z: z, make: make, g: null }); }
function odpFigsTick() { return __ZC(401, 182, this, arguments, new.target); }
function odpTalkSpot(x, z, y, key, where, r) { var v = otmVoice(key); return otmSpot(x, z, r || 2.4, "🗣️ " + (v ? v.n : otmVoiceName(key)), "talk", function () { otmTalk(key, where); }, { y: y }); }
var ODP_HW = { hw: 5.6, wall: 6.3, h: 11, seg: [{ z0: -4, z1: -200, y0: 0, y1: -60 }, { z0: -204, z1: -404, y0: -60, y1: -120 }] };
var ODP_STAIR_FACTS = [
["THE HIGHWAY DOWN", "four hundred metres, a hundred and twenty down"],
["Dante Alighieri", "born in Florence in 1265, died in exile at Ravenna in 1321"],
["Midway upon the journey of our life", "I found myself within a forest dark (Canto I)"],
["The Divine Comedy", "Inferno, Purgatorio, Paradiso: written in exile, about 1308 to 1321"],
["THE HALL OF THE KEY", "at the lay-by ahead, through the east wall: the Lesser Key of Solomon"],
["Good Friday, 1300", "the poem's journey begins; Dante is thirty-five"],
["Terza rima", "a hundred cantos rhymed ABA BCB CDC, a form Dante made"],
["Beatrice", "whom Dante loved from childhood, sends Virgil to guide him"],
["Longfellow, 1867", "the first complete American translation: the words in this place are his"],
["THE GATE IS AHEAD", "Botticelli drew it in the 1480s, Gustave Doré engraved it in 1861"]
];
function odpStairY(z) {
if (z > ODP_HW.seg[0].z0)
return 0;
for (var i = 0; i < ODP_HW.seg.length; i++) {
var S = ODP_HW.seg[i];
if (z >= S.z1)
return S.y0 + (S.y1 - S.y0) * (S.z0 - z) / (S.z0 - S.z1);
if (i === 0 && z > ODP_HW.seg[1].z0)
return S.y1;
}
return -120;
}
function odpHwQuad(x0, x1, za, ya, zb, yb, mat, lift, vScale) { return __ZC(401, 183, this, arguments, new.target); }
function odpHwWall(x, za, ya, zb, yb, h, mat, sd) { return __ZC(401, 184, this, arguments, new.target); }
function odpStair() { return __ZC(401, 185, this, arguments, new.target); }
function odpHwShades() { return __ZC(401, 186, this, arguments, new.target); }
function odpHwShadesTick(dt) { return __ZC(401, 187, this, arguments, new.target); }
function odpUp() { worldCard(null); if (typeof otmGo === "function")
otmGo("cold"); }
var ODP_BOOKS = [
["The Ars Goetia", "the first book", "Seventy-two spirits, each with a rank (king, duke, prince, marquis, earl, president, knight), the legions it commands and its office: the list Johann Weyer had printed with sixty-nine names in his Pseudomonarchia Daemonum of 1577. Mathers' English, which Crowley published in 1904, made it famous."],
["The Ars Theurgia-Goetia", "the second book", "Thirty-one chief spirits of the points of the compass, each with dukes and servants beneath, some good by nature and some evil; drawn largely from the abbot Johannes Trithemius' Steganographia of about 1500, which hid a book of cipher inside a book of spirits."],
["The Ars Paulina", "the third book", "The angels of the twenty-four hours of the day and night, and of the signs of the zodiac and the degrees of each. It takes its name from St Paul, who wrote in 2 Corinthians of a man caught up into the third heaven."],
["The Ars Almadel", "the fourth book", "The almadel, a tablet of wax, and the angels of the four 'altitudes' who rule the seasons. A version of it is known from the fifteenth century."],
["The Ars Notoria", "the fifth book", "Prayers, names and figures said to give memory, eloquence and learning in every art: the oldest part of the Key, from the thirteenth century. Thomas Aquinas wrote against it in the Summa Theologiae."]
];
function odpHallOfKey() { return __ZC(401, 188, this, arguments, new.target); }
function odpSeventyTwo() { return __ZC(401, 189, this, arguments, new.target); }
var ODP_SK = { g: {} };
function odpSkSeg() { return ODP.lite ? 8 : 14; }
function odpSkSph(seg) { var k = "s" + seg; return ODP_SK.g[k] || (ODP_SK.g[k] = new THREE.SphereGeometry(1, seg, Math.max(6, Math.round(seg * 0.7)))); }
function odpSkLimb(r0, r1, len, seg) {
var k = "l" + r0 + "|" + r1 + "|" + len + "|" + seg;
if (ODP_SK.g[k])
return ODP_SK.g[k];
var g = new THREE.CylinderGeometry(r0, r1, len, seg, 2, false);
g.translate(0, -len / 2, 0);
return (ODP_SK.g[k] = g);
}
function odpSkLathe(prof, seg) { return new THREE.LatheGeometry(prof.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg); }
function odpSkCone(r, h, seg) { var k = "c" + r + "|" + h + "|" + seg; if (ODP_SK.g[k])
return ODP_SK.g[k]; var g = new THREE.ConeGeometry(r, h, seg); g.translate(0, h / 2, 0); return (ODP_SK.g[k] = g); }
function odpSkNode(parent, x, y, z, rx, ry, rz) { var o = new THREE.Object3D(); o.position.set(x || 0, y || 0, z || 0); o.rotation.set(rx || 0, ry || 0, rz || 0); if (parent)
parent.add(o); return o; }
function odpSkPart(node, geo, key, x, y, z, sx, sy, sz, rx, ry, rz) { var o = odpSkNode(node, x, y, z, rx, ry, rz); o.scale.set(sx || 1, sy === undefined ? (sx || 1) : sy, sz === undefined ? (sx || 1) : sz); o.userData.g = geo; o.userData.k = key || "skin"; return o; }
function odpSkMerge(list) { return __ZC(401, 190, this, arguments, new.target); }
function odpSkBake(root, one) {
root.updateMatrixWorld(true);
var by = {};
root.traverse(function (o) { if (!o.userData.g)
return; var k = one ? "all" : o.userData.k; (by[k] = by[k] || []).push([o.userData.g, o.matrixWorld.clone()]); });
var out = {};
for (var k in by)
out[k] = odpSkMerge(by[k]);
return out;
}
function odpSkMesh(geos, mats, fallback) {
var g = new THREE.Group();
for (var k in geos) {
var m = new THREE.Mesh(geos[k], mats[k] || fallback);
m.userData.noSit = 1;
m.raycast = function () { };
g.add(m);
}
g.userData.keep = 1;
return g;
}
function odpSkHuman(P, root) { return __ZC(401, 191, this, arguments, new.target); }
var ODP_POSES = {
stand: { head: 0.4, armL: [0.1, 0.1, 0.3], armR: [0.15, 0.1, 0.4] },
reach: { head: -0.35, armL: [0.4, 2.5, 0.3], armR: [0.2, 2.7, 0.2] },
run: { lean: 0.35, head: 0.1, armL: [0.9, 0.15, 1.1], armR: [-0.6, 0.15, 0.9], legL: [0.6, 0.03, 0.6], legR: [-0.45, 0.03, 0.9] },
spread: { head: -0.3, armL: [0.1, 1.6, 0.1], armR: [-0.1, 1.4, 0.2], legL: [0.15, 0.18, 0.2], legR: [-0.2, 0.12, 0.3] },
push: { lean: 0.7, head: -0.2, armL: [1.6, 0.2, 0.4], armR: [1.5, 0.25, 0.5], legL: [0.4, 0.04, 0.3], legR: [-0.6, 0.04, 0.2] },
curl: { lean: 0.5, head: 0.5, armL: [1.0, 0.3, 1.6], armR: [0.9, 0.3, 1.7], legL: [1.4, 0.08, 2.0], legR: [1.2, 0.1, 2.1] },
walk: { lean: 0.2, head: 0.7, armL: [0.1, 0.06, 0.2], armR: [0.05, 0.06, 0.25], legL: [0.3, 0.02, 0.2], legR: [-0.3, 0.02, 0.4] },
crouch: { lean: 0.6, head: 0.3, armL: [1.2, 0.4, 1.9], armR: [1.1, 0.4, 2.0], legL: [1.4, 0.12, 2.3], legR: [1.3, 0.14, 2.3] },
hide: { lean: 0.15, head: 0.3, armL: [0.6, 0.6, 2.4], armR: [0.6, 0.6, 2.4] },
fight: { lean: 0.35, head: -0.1, armL: [1.4, 0.3, 0.7], armR: [1.0, 0.5, 1.5], legL: [0.45, 0.1, 0.35], legR: [-0.35, 0.1, 0.25] },
back: { lean: 0.1, head: 0.2, turn: Math.PI * 0.95, armL: [0.1, 0.08, 0.3], armR: [0.05, 0.08, 0.3], legL: [0.25, 0.02, 0.2], legR: [-0.25, 0.02, 0.4] },
bowed: { lean: 0.3, head: 1.0, armL: [0.4, 0.35, 1.5], armR: [0.4, 0.35, 1.5] }
};
function odpSoulGeo(pose) {
var k = "soul:" + pose + (ODP.lite ? "L" : "");
if (ODP_SK.g[k])
return ODP_SK.g[k];
var r = odpSkHuman({ pose: ODP_POSES[pose] || ODP_POSES.stand, seg: ODP.lite ? 7 : 11, hair: true });
return (ODP_SK.g[k] = odpSkBake(r, true).all);
}
function odpSkQuad(Q) { return __ZC(401, 192, this, arguments, new.target); }
function odpSkQuadTail(Q, root, by, L, r, s) {
if (!Q.tail)
return;
var tl = odpSkNode(root, 0, by + r * 0.3, -L / 2 + r * 0.1, Q.tailA || 0.5, 0, 0);
odpSkPart(tl, odpSkLimb(r * 0.12, r * (Q.tufted ? 0.06 : 0.2), Q.tail, s), Q.tufted ? "skin" : "mane", 0, 0, 0);
if (Q.tufted)
odpSkPart(tl, odpSkSph(s), "mane", 0, -Q.tail, 0, r * 0.15, r * 0.3, r * 0.15);
}
function odpSkWing(span, bat) { return __ZC(401, 193, this, arguments, new.target); }
function odpSkWings(node, span, bat, y, z, spread) {
var geo = odpSkWing(span, bat);
[-1, 1].forEach(function (sd) { var w = odpSkNode(node, sd * 0.08, y, z, 0.15, 0, 0); odpSkPart(w, geo, "wing", 0, 0, 0, sd, 1, 1, 0, sd * (spread || 0.4), 0); });
}
function odpSkBird(B) { return __ZC(401, 194, this, arguments, new.target); }
function odpSkPlace(g, x, y, z, ry, h) {
var B = new THREE.Box3().setFromObject(g), hh = B.max.y - B.min.y;
if (hh > 0.01)
g.scale.multiplyScalar(h / hh);
B.setFromObject(g);
g.position.set(x, y - B.min.y, z);
g.rotation.y = ry || 0;
(ODP.G || otmP()).add(g);
return g;
}
function odpSkMats(o) { var M = {}; for (var k in o)
M[k] = typeof o[k] === "number" ? otmMat(o[k], null, { phong: 30 }) : o[k]; return M; }
function odpCreature(kind, x, y, z, ry, h, tint) {
var fn = ODP_MAKE[kind];
if (!fn)
return odpBeastH(kind, x, y, z, ry, h);
try {
var g = fn(tint);
if (!g)
return odpBeastH(kind, x, y, z, ry, h);
return odpSkPlace(g, x, y, z, ry, h);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] below, a creature", kind, e);
return odpBeastH(kind, x, y, z, ry, h);
}
}
function odpStatueMats(t) { if (t === undefined)
return null; var m = otmMat(t, "marble", { phong: 60 }); return { skin: m, hair: m, mane: m, hoof: m, horn: m, nose: m, wing: otmMat(t, "marble", { phong: 60, ds: 1 }), wingf: m, brow: m, eye: otmMat(new THREE.Color(t).multiplyScalar(0.4).getHex(), null) }; }
var ODP_MAKE = {
cerberus: function (t) { return __ZC(401, 195, this, arguments, new.target); },
horse: function (t, o) { return __ZC(401, 196, this, arguments, new.target); },
nightmare: function (t) { return ODP_MAKE.horse(t, { col: 0x101012, mane: 0x050506 }); },
pegasus: function (t) { return ODP_MAKE.horse(t, { col: 0xC8C6C2, mane: 0xB8B4AE, wings: 1 }); },
camel: function (t) {
var Q = { len: 1.9, r: 0.4, leg: 1.35, neck: 1.0, nA: 0.95, hP: 0.5, head: 0.34, snout: 0.36, ears: 0.25, tail: 0.5, tailA: 0.3, hump: 1, tufted: 1 };
var M = odpStatueMats(t) || odpSkMats({ skin: 0xB08A5A, mane: 0x6A4A2A, nose: 0x3A2A1A, hoof: 0x2A2018, eye: 0x0A0808 });
return odpSkMesh(odpSkBake(odpSkQuad(Q)), M, M.skin);
},
lion: function (t, o) { return __ZC(401, 197, this, arguments, new.target); },
tiger: function (t) { return ODP_MAKE.lion(t, { mane: false, col: 0xC8823A }); },
bear: function (t) {
var Q = { len: 1.6, r: 0.52, leg: 0.7, neck: 0.32, nA: 1.1, hP: 0.3, head: 0.42, snout: 0.26, ears: 0.18, paw: 1, wide: 0.95, chest: 1.08 };
var M = odpStatueMats(t) || odpSkMats({ skin: 0x4A3020, nose: 0x1A1210, eye: 0x0A0808, hoof: 0x1A1210 });
return odpSkMesh(odpSkBake(odpSkQuad(Q)), M, M.skin);
},
cow: function (t) { return __ZC(401, 198, this, arguments, new.target); },
owl: function (t) { var M = odpStatueMats(t) || odpSkMats({ skin: 0x6A5A4A, wingf: 0x4A3A2A, nose: 0x2A2018, eye: otmGlowM(0xE8B020) }); return odpSkMesh(odpSkBake(odpSkBird({ size: 1, owl: 1, upright: 1 })), M, M.skin); },
frog: function (t) { return __ZC(401, 199, this, arguments, new.target); },
snake: function (t) { return __ZC(401, 200, this, arguments, new.target); },
angel: function (t) { return __ZC(401, 201, this, arguments, new.target); },
minotaur: function (t) { return __ZC(401, 202, this, arguments, new.target); },
centaur: function (t) { return __ZC(401, 203, this, arguments, new.target); },
harpy: function (t) { return __ZC(401, 204, this, arguments, new.target); },
fury: function (t) { return __ZC(401, 205, this, arguments, new.target); },
giant: function (t) { return __ZC(401, 206, this, arguments, new.target); }
};
function odpSkSkin(geo, col, amt, seed) { odpRough(geo, col, amt, seed); return geo; }
function odpSkSkinMat(key, o) { return __ZC(401, 207, this, arguments, new.target); }
function odpSkHorn(node, sd, n, len, r, curl, key) {
var h = odpSkNode(node, 0, 0, 0);
var cur = h;
for (var q = 0; q < n; q++) {
var t = q / n, seg = odpSkNode(cur, 0, q ? len : 0, 0, -curl, 0, -sd * curl * 0.35);
odpSkPart(seg, odpSkCone(r * (1 - t * 0.85), len * 1.25, 8), key || "horn", 0, 0, 0);
cur = seg;
}
return h;
}
function odpGiantFigure(o) { return __ZC(401, 208, this, arguments, new.target); }
function odpDisFigure(lite) { return __ZC(401, 209, this, arguments, new.target); }
function odpDot() { return __ZC(401, 210, this, arguments, new.target); }
function odpNearWay(x, z, d) {
var L = [];
if (typeof ODP_IN !== "undefined")
ODP_IN.forEach(function (q) { var p = odpAt(q[0], q[1]); L.push(p); });
for (var i = 0; i < L.length; i++) {
if (Math.hypot(L[i].x - x, L[i].z - z) < d)
return true;
}
return false;
}
function odpMerge(parts) { return __ZC(401, 211, this, arguments, new.target); }
function odpM4(x, y, z, rx, ry, rz, s) { var o = new THREE.Object3D(); o.position.set(x, y, z); o.rotation.set(rx || 0, ry || 0, rz || 0); if (s)
o.scale.setScalar(s); o.updateMatrix(); return o.matrix; }
function odpBeastH(kind, x, y, z, ry, h) {
var g = odpBeast(kind, x, y, z, ry, 1);
if (!g)
return null;
try {
var B = new THREE.Box3().setFromObject(g), hh = B.max.y - B.min.y;
if (hh > 0.1) {
g.scale.multiplyScalar(h / hh);
}
g.position.y = y;
}
catch (e) { }
return g;
}
function odpTablet(i, r, f) { return __ZC(401, 212, this, arguments, new.target); }
function odpFaceDis() { var L = worldLocal(); if (typeof yaw !== "undefined")
yaw = Math.atan2(-(ODP_C.x - L.x), -(ODP_C.z - L.z)); if (typeof pitch !== "undefined")
pitch = 0.12; }
function odpPlace(r, f, y, back) { return __ZC(401, 213, this, arguments, new.target); }
function odpBoat(r, f, y, col) { return __ZC(401, 214, this, arguments, new.target); }
function odpDrift(kind, n, cx, cz, rad, y0, y1, col, size, op) { return __ZC(401, 215, this, arguments, new.target); }
function odpDriftTick(dt, t) { return __ZC(401, 216, this, arguments, new.target); }
function odpPit() { return __ZC(401, 217, this, arguments, new.target); }
function odpCrags() { return __ZC(401, 218, this, arguments, new.target); }
function odpVestibule() { return __ZC(401, 219, this, arguments, new.target); }
function odpLimbo() { return __ZC(401, 220, this, arguments, new.target); }
function odpLust() { return __ZC(401, 221, this, arguments, new.target); }
function odpGluttony() { return __ZC(401, 222, this, arguments, new.target); }
function odpAvarice() { return __ZC(401, 223, this, arguments, new.target); }
function odpStyx() { return __ZC(401, 224, this, arguments, new.target); }
function odpDis() { return __ZC(401, 225, this, arguments, new.target); }
function odpTree() { return __ZC(401, 226, this, arguments, new.target); }
function odpViolence() { return __ZC(401, 227, this, arguments, new.target); }
function odpMalebolge() { return __ZC(401, 228, this, arguments, new.target); }
function odpCocytus() { return __ZC(401, 229, this, arguments, new.target); }
function odpOut() { return __ZC(401, 230, this, arguments, new.target); }
function odpArc(i, u) { var a = odpArr(i), b = i < 9 ? ODP_T[i] : a - 1.4; return a + (b - a) * u; }
var ODP_RN = 7;
function odpRnd() { ODP_RN = (ODP_RN * 16807) % 2147483647; return ODP_RN / 2147483647; }
function odpShadeGeo(pose, extra) { return __ZC(401, 231, this, arguments, new.target); }
function odpSnakeGeo() { return __ZC(401, 232, this, arguments, new.target); }
function odpFlameTex() { return __ZC(401, 233, this, arguments, new.target); }
function odpFlameGeo() {
if (ODP_SK.g.flameT)
return ODP_SK.g.flameT;
var pts = [], n = 10;
for (var i = 0; i <= n; i++) {
var t = i / n, r = Math.sin(Math.PI * Math.pow(t, 0.7)) * 0.32 * (1 - t * 0.55);
pts.push(new THREE.Vector2(Math.max(0.001, r), t));
}
var g = new THREE.LatheGeometry(pts, ODP.lite ? 6 : 10);
return (ODP_SK.g.flameT = g);
}
function odpFlameMat(col) {
var k = "odpfl|" + (col || 0xFFFFFF);
if (OTM.mats[k])
return OTM.mats[k];
var m = new THREE.MeshBasicMaterial({ color: col || 0xFFFFFF, map: odpFlameTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
return (OTM.mats[k] = m);
}
function odpCrowdPlan() { return __ZC(401, 234, this, arguments, new.target); }
var ODP_TINT = [0xB8B6B0, 0xC8C8B4, 0xB8A8D0, 0x9AA0A0, 0xC8B080, 0xB8C0A8, 0xC89A80, 0xB89084, 0xA8A098, 0xC8D8E8];
function odpSoulsMake() { return __ZC(401, 235, this, arguments, new.target); }
function odpBannerF(t) { return Math.PI / 2 - 0.07 - t * 0.0105; }
function odpSoulsShow(ring) {
var S = ODP.souls;
if (!S)
return;
var far = ODP.lite ? 1 : 2, key = ring + "|" + (ODP.over ? 1 : 0);
if (S.show === key)
return;
S.show = key;
S.R.forEach(function (R, i) { if (R)
R.g.visible = ODP.over || ring < 0 ? (ODP.over ? true : i <= 1) : Math.abs(i - ring) <= far; });
}
function odpSoulsTick(t, all) { return __ZC(401, 236, this, arguments, new.target); }
function odpFire(x, y, z, s, col, parent) { return __ZC(401, 237, this, arguments, new.target); }
function odpRide(pts, dur, o) { return __ZC(401, 238, this, arguments, new.target); }
function odpRideTick(dt) { return __ZC(401, 239, this, arguments, new.target); }
function odpCarry(fromR, fromF, fromY, toR, toF, toY, name, verb, say, o) { return __ZC(401, 240, this, arguments, new.target); }
function odpCarryPath(r0, f0, y0, r1, f1, y1, kind) {
var P = [], n = 8;
for (var i = 0; i <= n; i++) {
var u = i / n, r = r0 + (r1 - r0) * u, f = f0 + (f1 - f0) * u, y = y0 + (y1 - y0) * u;
if (kind === "boat") {
var W = odpWaterAt((r0 + r1) / 2);
if (i > 0 && i < n && W)
y = W.y + 0.15;
}
if (kind === "beast")
y += Math.sin(u * Math.PI) * 1.2;
P.push({ r: r, f: f, y: y });
}
return P;
}
function odpGeryonPath() { return __ZC(401, 241, this, arguments, new.target); }
var ODP_TASKS = [
{ k: "banner", r: 0, t: "Catch up with the banner", d: "In the Vestibule the neutral souls run after a whirling banner for ever. Run after it yourself, and see what it means." },
{ k: "castle", r: 1, t: "Open the seven gates of the noble castle", d: "Limbo's castle has seven walls. Answer at each gate (the seven liberal arts) and go in to meet the great souls." },
{ k: "book", r: 2, t: "Find the book in the storm", d: "Somewhere in the black wind lies the book that Francesca and Paolo were reading. Mind the wind: it pushes." },
{ k: "cerberus", r: 3, t: "Quiet Cerberus", d: "Pick up a fistful of earth from the mud and throw it into his three mouths, as Virgil did." },
{ k: "fortune", r: 4, t: "Turn Fortune's wheel", d: "Find the great bronze wheel of Fortune in the fourth circle, turn it, and hear what Virgil says about her." },
{ k: "styx", r: 5, t: "Cross the Styx to the City of Dis", d: "Answer the two little flames on the tower, then take Phlegyas' boat. The fallen angels will shut the gate: wait for help." },
{ k: "tombs", r: 6, t: "Read the names on four tombs", d: "Lift the lids and find who lies in the burning tombs: Cavalcante, the Emperor Frederick, the Cardinal and Pope Anastasius." },
{ k: "twig", r: 7, t: "Break a twig in the wood of the suicides", d: "In the wood, break a twig from a thornbush, and listen to what it says. Then find Capaneus on the burning sand." },
{ k: "ditches", r: 8, t: "Win Virgil's game on the bridge", d: "On the stone bridge over the ten ditches, Virgil asks which sinners are below. Name three in a row." },
{ k: "out", r: 9, t: "Climb down Dis's side and out to the stars", d: "Cross the slippery ice, past the traitors frozen in it, and climb out as Dante did." }
];
function odpTaskDone(k) { var p = otmProg(); return !!(p.deep && p.deep.tasks && p.deep.tasks[k]); }
function odpTask(k) { return __ZC(401, 242, this, arguments, new.target); }
function odpJournal() { return __ZC(401, 243, this, arguments, new.target); }
function odpLife() { return __ZC(401, 244, this, arguments, new.target); }
var ODP_ARTS = [
{ n: "Grammar", q: "Which art teaches how a language is put together, and how to read and write it well?", a: ["Grammar", "Music", "Astronomy"], r: 0 },
{ n: "Logic", q: "Which art, also called dialectic, teaches how to tell a sound argument from a false one?", a: ["Rhetoric", "Logic", "Geometry"], r: 1 },
{ n: "Rhetoric", q: "Which art teaches how to speak and write so as to persuade, as Cicero did?", a: ["Arithmetic", "Grammar", "Rhetoric"], r: 2 },
{ n: "Arithmetic", q: "Which art is the study of number itself?", a: ["Arithmetic", "Music", "Logic"], r: 0 },
{ n: "Geometry", q: "Which art, taught by Euclid (who is in this castle), measures the earth and its shapes?", a: ["Astronomy", "Geometry", "Grammar"], r: 1 },
{ n: "Music", q: "Which art did the Middle Ages teach as number in time, the ratios of harmony Pythagoras found?", a: ["Rhetoric", "Logic", "Music"], r: 2 },
{ n: "Astronomy", q: "Which art, taught by Ptolemy (also in this castle), studies the motions of the heavens?", a: ["Astronomy", "Arithmetic", "Geometry"], r: 0 }
];
function odpLimboCastle() { return __ZC(401, 245, this, arguments, new.target); }
function odpGatesShow() { var Cs = ODP.castle; if (!Cs)
return; Cs.walls.forEach(function (W, w) { var open = (6 - w) < ODP.gates; W.open = open; if (W.g) {
W.g.rotation.y = Cs.gate + (open ? Math.PI / 2.2 : 0);
W.g.position.y = Cs.y;
} }); }
function odpGateQuiz(gi, said) { return __ZC(401, 246, this, arguments, new.target); }
function odpCastleBlock(x, z, f) { return __ZC(401, 247, this, arguments, new.target); }
function odpLustBook() { return __ZC(401, 248, this, arguments, new.target); }
function odpWindTick(dt) { return __ZC(401, 249, this, arguments, new.target); }
function odpCerberus() { return __ZC(401, 250, this, arguments, new.target); }
function odpFortune() { return __ZC(401, 251, this, arguments, new.target); }
function odpSignal() { return __ZC(401, 252, this, arguments, new.target); }
function odpCity() { return __ZC(401, 253, this, arguments, new.target); }
function odpMessenger() { return __ZC(401, 254, this, arguments, new.target); }
function odpGateTick(dt) { return __ZC(401, 255, this, arguments, new.target); }
var ODP_TOMBS = [
["cavalcante", "Cavalcante dei Cavalcanti", "rises beside Farinata, only to the chin, and looks about for his son, the poet Guido, Dante's best friend: 'If through this blind prison thou goest by loftiness of genius, where is my son? and why is he not with thee?' Hearing Dante say 'had', he thinks Guido dead, and falls back (Canto X)."],
["frederick", "the Emperor Frederick II", "Holy Roman Emperor and King of Sicily (1194 to 1250), 'stupor mundi', the wonder of the world, at whose court Italian poetry began. Farinata names him among the thousand heretics here (Canto X)."],
["cardinal", "the Cardinal", "Ottaviano degli Ubaldini (died 1273), the Ghibelline cardinal, who is said to have said, 'If I have a soul, I have lost it for the Ghibellines.' Farinata names him with the Emperor (Canto X)."],
["anastasius", "Pope Anastasius II", "Canto XI opens beside a great tomb with the words 'Anastasius I hold, whom out of the right way Photinus drew.' Dante followed a medieval story that this pope (496 to 498) fell into heresy; historians think the story confused him with the Emperor Anastasius."]
];
function odpTombNames() { return __ZC(401, 256, this, arguments, new.target); }
function odpWood() { return __ZC(401, 257, this, arguments, new.target); }
var ODP_DITCH = [
["panders and seducers", "two files march for ever in opposite directions, driven on by horned demons with whips (Canto XVIII)"],
["flatterers", "they are sunk in filth, as their words were (Canto XVIII)"],
["simoniacs", "who sold holy things: upside down in round holes in the rock, only their legs showing, the soles of their feet on fire (Canto XIX)"],
["false prophets", "they walk with their heads turned backwards, weeping, since they wanted to see too far ahead (Canto XX)"],
["barrators", "who sold public office: plunged in boiling pitch, and the Malebranche demons hook any who rise (Cantos XXI and XXII)"],
["hypocrites", "they trudge slowly in cloaks gilded outside and all lead within (Canto XXIII)"],
["thieves", "they run among serpents (Cantos XXIV and XXV)"],
["false counsellors", "each one hidden inside a moving flame, like Ulysses (Cantos XXVI and XXVII)"],
["sowers of discord", "they walk the circuit and pass a demon with a sword (Cantos XXVIII and XXIX)"],
["falsifiers", "alchemists, impostors, counterfeiters and liars, lying sick and heaped together (Cantos XXIX and XXX)"]
];
function odpBridgeGame() {
var f = ODP_BRIDGE, P = odpAt(38.5, f);
otmSpot(P.x, P.z, 1.6, "🎲 Virgil's game: who is below?", "play", function () { ODP.bgRun = 0; odpBridgeAsk(); }, { y: -180 });
}
function odpBridgeAsk(said) { return __ZC(401, 258, this, arguments, new.target); }
function odpIce() { return __ZC(401, 259, this, arguments, new.target); }
function odpSlideTick(dt) { return __ZC(401, 260, this, arguments, new.target); }
var ODP_GIANTS = [
{ n: "Nimrod", a: -0.6, o: { horn: 1, skin: 0x4A3428, hair: 0x1A120C }, say: "'Raphael mai amech zabi almi', he bellows: words that mean nothing, for he built the tower of Babel and now no tongue is understood by him, nor his by any. A horn hangs at his neck (Canto XXXI)." },
{ n: "Ephialtes", a: -0.32, o: { chain: 1, skin: 0x3E3028, hair: 0x2A1A10, scowl: 1 }, say: "Ephialtes, who with the giants made war on the gods of Olympus: bound with a chain wound five times round him, his left arm in front and his right behind. When he shakes, Dante fears death more than ever (Canto XXXI)." },
{ n: "Antaeus", a: 0.14, o: { skin: 0x553C2C, hair: 0x2A1A12, reach: 1 }, say: "Antaeus, who was not at the gods' war and so is not chained: he takes Dante and Virgil in his hand and sets them down on the ice, 'as a mast does in a ship' (Canto XXXI)." },
{ n: "Briareus", a: 0.45, o: { chain: 1, skin: 0x2E241E, hair: 0x0A0808, scowl: 1 }, say: "Briareus, whom Dante wished to see; Virgil says he is far off, bound like Ephialtes, 'save that he seemeth more ferocious' (Canto XXXI)." }
];
function odpGiants() { return __ZC(401, 261, this, arguments, new.target); }
function odpLifeTick(dt, t) { return __ZC(401, 262, this, arguments, new.target); }
var ODP_BK = { geo: {} };
function odpBkE(c, r, col, rot, k) { return { t: "e", c: c, r: r, col: col, rot: rot || null, k: k }; }
function odpBkC(a, b, r0, r1, col, k) { return { t: "c", a: a, b: b, r0: r0, r1: r1, col: col, k: k }; }
function odpBkMirror(list) {
var out = [];
list.forEach(function (P) {
out.push(P);
var Q = JSON.parse(JSON.stringify(P));
if (Q.c)
Q.c[0] = -Q.c[0];
if (Q.a) {
Q.a[0] = -Q.a[0];
Q.b[0] = -Q.b[0];
}
if (Q.rot) {
Q.rot[1] = -Q.rot[1];
Q.rot[2] = -Q.rot[2];
}
out.push(Q);
});
return out;
}
function odpBkMesh(key, prims, cell, K, mat) {
var lite = ODP.lite, k = key + (lite ? "L" : ""), geo = ODP_BK.geo[k];
if (!geo) {
geo = rbkBuild(prims, cell * (lite ? 1.7 : 1), K);
geo.userData.rbkShared = 1;
ODP_BK.geo[k] = geo;
}
var m = new THREE.Mesh(geo, mat);
m.raycast = function () { };
m.userData.noSit = 1;
m.castShadow = !lite;
return m;
}
var ODP_BK_NOISE = "varying vec3 vBkPos;\nfloat bkHash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }\n" +
"float bkNoise(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f); return mix(mix(mix(bkHash(i),bkHash(i+vec3(1,0,0)),f.x),mix(bkHash(i+vec3(0,1,0)),bkHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(bkHash(i+vec3(0,0,1)),bkHash(i+vec3(1,0,1)),f.x),mix(bkHash(i+vec3(0,1,1)),bkHash(i+vec3(1,1,1)),f.x),f.y),f.z); }\n" +
"float bkFbm(vec3 p){ return 0.55*bkNoise(p)+0.3*bkNoise(p*2.13+3.1)+0.15*bkNoise(p*4.37+7.7); }\n";
function odpBkMat(kind) { return __ZC(401, 263, this, arguments, new.target); }
function odpBkEye(col, r) { var g = new THREE.Mesh(odpSkSph(10), otmGlowM(col)); g.scale.setScalar(r); g.raycast = function () { }; return g; }
function odpBkNode(parent, x, y, z) { var o = new THREE.Group(); o.position.set(x, y, z); parent.add(o); return o; }
var ODP_CERB = { hide: 0x463A32, belly: 0x5A4A3E, mane: 0x221A16, muzzle: 0x2A201C, gum: 0x7A1E1A, tooth: 0xE8DCC0, claw: 0x1A1614, beard: 0x0C0A0A };
function odpCerbBody() { return __ZC(401, 264, this, arguments, new.target); }
function odpCerbLeg(sd) { return __ZC(401, 265, this, arguments, new.target); }
function odpCerbNeck(len) {
var C = ODP_CERB;
return [odpBkC([0, 0, 0], [0, len * 0.45, len * 0.6], 0.27, 0.23, C.hide, 0.08), odpBkC([0, len * 0.45, len * 0.6], [0, len * 0.62, len * 0.92], 0.23, 0.2, C.hide, 0.08),
odpBkC([0, 0.12, -0.06], [0, len * 0.66, len * 0.66], 0.12, 0.1, C.mane, 0.1), odpBkE([0, -0.02, len * 0.5], [0.2, 0.14, 0.22], C.belly, null, 0.1)];
}
function odpCerbSkull() { return __ZC(401, 266, this, arguments, new.target); }
function odpCerbJaw() { return __ZC(401, 267, this, arguments, new.target); }
function odpCerbTail() { var C = ODP_CERB; return [odpBkC([0, 0, 0], [0, -0.15, -0.35], 0.08, 0.06, C.hide, 0.05), odpBkC([0, -0.15, -0.35], [0, -0.45, -0.6], 0.06, 0.035, C.hide, 0.05), odpBkC([0, -0.45, -0.6], [0, -0.7, -0.68], 0.035, 0.02, C.mane, 0.04)]; }
var ODP_CERB0 = ODP_MAKE.cerberus;
ODP_MAKE.cerberus = function (t) { return __ZC(401, 268, this, arguments, new.target); };
function odpCerbTick(t) { return __ZC(401, 269, this, arguments, new.target); }
var ODP_MINO = { coat: 0x2E201A, chest: 0x46322A, mane: 0x140E0C, muzzle: 0x2A1E1A, horn: 0xE2D6BC, hoof: 0x141010, leather: 0x3A2616, nose: 0x0E0A0A };
function odpMinoTorso() { return __ZC(401, 270, this, arguments, new.target); }
function odpMinoHead() { return __ZC(401, 271, this, arguments, new.target); }
function odpMinoArm(sd) {
var C = ODP_MINO, x = sd * 0.03;
return [odpBkC([0, 0, 0], [x, -0.32, 0.0], 0.11, 0.085, C.coat, 0.04), odpBkE([x * 0.5, -0.15, 0.05], [0.08, 0.12, 0.075], C.coat, null, 0.03), odpBkE([x * 0.5, -0.15, -0.05], [0.075, 0.12, 0.07], C.coat, null, 0.03)];
}
function odpMinoFore() { var C = ODP_MINO; return [odpBkC([0, 0, 0], [0, -0.3, 0.02], 0.085, 0.06, C.coat, 0.03), odpBkE([0, -0.36, 0.03], [0.07, 0.08, 0.07], C.muzzle, null, 0.03), odpBkE([0, -0.08, 0.03], [0.07, 0.1, 0.07], C.coat, null, 0.03)]; }
function odpMinoThigh() { var C = ODP_MINO; return [odpBkC([0, 0, 0], [0, -0.46, 0.04], 0.15, 0.1, C.coat, 0.04), odpBkE([0, -0.2, 0.06], [0.11, 0.2, 0.1], C.coat, null, 0.04)]; }
function odpMinoShin() { return __ZC(401, 272, this, arguments, new.target); }
function odpMinotaurMake() { return __ZC(401, 273, this, arguments, new.target); }
function odpMinoTick(dt, t) { return __ZC(401, 274, this, arguments, new.target); }
function odpVast() { return __ZC(401, 275, this, arguments, new.target); }
function odpVault(lite) { return __ZC(401, 276, this, arguments, new.target); }
function odpSparks(lite) { return __ZC(401, 277, this, arguments, new.target); }
function odpBloodFall(lite) { return __ZC(401, 278, this, arguments, new.target); }
function odpFallMat(down) { return __ZC(401, 279, this, arguments, new.target); }
function odpDemonGeo() { return __ZC(401, 280, this, arguments, new.target); }
function odpFlyers(lite) { return __ZC(401, 281, this, arguments, new.target); }
function odpVastTick(dt, t) { return __ZC(401, 282, this, arguments, new.target); }
var ODP_SX = -1000, ODP_SZ = -300;
function odpStarsGround(x, z) { var lx = x - ODP_SX, lz = z - ODP_SZ; return -1.0 + Math.max(-40, Math.min(60, lz)) * 0.045 + 0.25 * Math.sin(lx * 0.11) * Math.sin(lz * 0.09) - (lz < -40 ? (-40 - lz) * 0.1 : 0); }
function odpStarsBlock(x, z) { var lx = x - ODP_SX, lz = z - ODP_SZ; if (Math.abs(lx) > 68 || lz > 50 || lz < -39)
return true; var K = ODP.K; return K ? worldSolidAt(K.solids, x, z, odpStarsGround(x, z)) : false; }
(function () {
var z0 = odpZone, g0 = odpGround, b0 = odpBlock, n0 = odpZoneName, e0 = odpEnv;
odpZone = function (x, z) { if (x < -500)
return "stars"; return z0.apply(this, arguments); };
odpGround = function (x, z, feet) { if (x < -500)
return odpStarsGround(x, z); return g0.apply(this, arguments); };
odpBlock = function (x, z, feet) { if (x < -500)
return odpStarsBlock(x, z); return b0.apply(this, arguments); };
odpZoneName = function () { var L = worldLocal(); if (L.x < -500)
return "the shore under the stars"; return n0.apply(this, arguments); };
odpEnv = function () {
var L = worldLocal();
if (L.x >= -500)
return e0.apply(this, arguments);
var k = Math.max(0, Math.min(1, ((ODP.starsT || 0) - 10) / 80)), C = function (a, b) { var A = new THREE.Color(a), B = new THREE.Color(b); return A.lerp(B, k).getHex(); };
return { top: C(0x010208, 0x071330), low: C(0x02040A, 0x1A3050), fogD: 0.0004, fog: C(0x02040A, 0x14284A), sun: 0.18 + 0.2 * k, sunCol: 0x9AB0E0, sunDir: [-0.6, 0.3, -0.7], hemi: 0.75 + 0.45 * k, hemiCol: 0x8A9CC8, hemiGround: 0x14182A, stars: 0 };
};
})();
function odpBurrowCurve() {
var S = ODP_SX, Z = ODP_SZ;
return new THREE.CatmullRomCurve3([[S + 6, -72, Z + 300], [S - 10, -60, Z + 250], [S + 12, -46, Z + 200], [S - 8, -32, Z + 150], [S + 6, -18, Z + 105], [S - 2, -6, Z + 70], [S, 1.2, Z + 50], [S, 1.6, Z + 42]].map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }), false, "centripetal");
}
function odpStarsBuild() { return __ZC(401, 283, this, arguments, new.target); }
function odpStarSky(lite) { return __ZC(401, 284, this, arguments, new.target); }
function odpBurrow() { return __ZC(401, 285, this, arguments, new.target); }
function odpStarsArrive() { return __ZC(401, 286, this, arguments, new.target); }
var ODP_STAR_LINES = [
[16, "🌅 <b>'Sweet colour of the oriental sapphire'</b> gathers in the east, and 'the beauteous planet, that to love incites, was making all the orient to laugh': Venus, low over the sea (Purgatorio I)."],
[31, "✨ <b>'To the right hand I turned, and fixed my mind upon the other pole, and saw four stars ne'er seen before save by the primal people.'</b> Four stars over the far sea, above the mountain (Purgatorio I)."],
[46, "🧔 By the water an old man, alone, with a long white beard, the four holy stars bright on his face: <b>Cato</b>, who keeps this shore. Walk to him and talk, or rest here as long as you like."]
];
function odpStarsCard() { return __ZC(401, 287, this, arguments, new.target); }
function odpStarsMusic(on, vol) {
try {
if (on) {
if (!ODP.tune) {
var a = new Audio("assets/sound/magnificat.mp3");
a.loop = true;
a.volume = 0;
ODP.tune = a;
}
ODP.tuneWant = vol || 0;
if (ODP.tune.paused) {
var pr = ODP.tune.play();
if (pr && pr.catch)
pr.catch(function () { });
}
}
else if (ODP.tune) {
ODP.tuneWant = 0;
}
}
catch (e) { }
}
function odpStarsTick(dt) { return __ZC(401, 288, this, arguments, new.target); }
ODP_V.cato = { n: "Cato of Utica", e: "the keeper of the shore of Purgatory", d: ["Freedom", "Duty", "The shore at dawn"], i: "",
m: ["You are Cato the Younger (95 to 46 BC) as Dante wrote you in Purgatorio I and II: the Roman senator who stood against Julius Caesar and took his own life at Utica rather than live under a tyrant, whom Dante nonetheless set as guardian at the foot of the mountain of Purgatory, because you gave up your life for liberty. You are an old man with a long white beard streaked like your hair, and the four holy stars light your face as if the sun were before you. You were stern with Virgil and Dante when they came up out of Hell ('Who are you? who against the hidden river have fled the eternal prison?'), and Virgil spoke of your wife Marcia, still in Limbo; you answered that she no longer moves you. You told Virgil to gird Dante with a smooth rush from the shore and wash the smoke of Hell from his face with the dew, and to climb with the sun.", "In Purgatorio II you drive the newly arrived souls on when they linger to hear Casella sing: 'What is this, ye laggard spirits? What negligence, what standing still is this? Run to the mountain.'"],
x: "Grave, brief, kind beneath the sternness. Keep to the poem and to the history of the real Cato as Plutarch and Lucan tell it. Never speak of suicide as anything to imitate: if the dreamer talks of harming themselves, set the poem aside and tell them gently to reach out to someone they trust or a crisis line now." };
OTM_VOICES["deep:cato"] = ODP_V.cato;
var ODP_FIGS = { beleth: "crown robe:white beard", purson: "crown head:lion robe:brown", vine: "crown head:lion robe:black", balam: "crown tripleface serpenttail robe:brown",
zagan: "crown head:bull wings:black robe:green", vassago: "crown robe:blue beard", sitri: "crown head:cat wings:black robe:purple", ipos: "head:lion wings:white robe:gold",
gaap: "crown horns wings:black robe:grey", stolas: "crown wings:black robe:blue", orobas: "crown robe:brown beard", seere: "crown wings:white robe:blue" };
var ODP_DEITY = { bael: "bael", paimon: "paimon", belial: "belial", asmoday: "asmodeus" };
function odpCourtSlot(i) {
var side = i % 2, slot = Math.floor(i / 2), X = ODP_COURT_X, z1 = -8 - 24 * slot;
return side ? { x0: X + 12, x1: X + 36, z0: z1 - 20, z1: z1, door: "w", side: 1 } : { x0: X - 36, x1: X - 12, z0: z1 - 20, z1: z1, door: "e", side: 0 };
}
function odpCourt() { return __ZC(401, 289, this, arguments, new.target); }
function odpPalace(row, S) { return __ZC(401, 290, this, arguments, new.target); }
function odpCourtGo() { return __ZC(401, 291, this, arguments, new.target); }
function odpCourtLeave() { var a = odpArr(6) - 0.2; odpPlace(99, a + 0.012, -156, true); otmSay("🔥 Back in the City of Dis, among the burning tombs."); }
var ODP_PSTYLE = {
bael: { fl: [0x0E0A14, "marble"], wl: [0x34265A, "stone"], ce: 0x0C0814, cols: "square", cc: 0x0A080E, car: 0x3A2A5A, fire: 0xB070FF },
paimon: { fl: [0x6A5430, "stone"], wl: [0x8A6A3A, "plaster"], ce: 0x3A2814, cols: "cluster", cc: 0xB8923A, car: 0x8A2A1A, fire: 0xFFB040 },
beleth: { fl: [0xD8D4CC, "marble"], wl: [0xC8C4BC, "marble"], ce: 0x8A8A90, cols: "round", cc: 0xF0ECE4, car: 0x9A1A2A, fire: 0xE0E8FF },
purson: { fl: [0x6A4A2A, "earth"], wl: [0x5A3A22, "stone"], ce: 0x2A1A10, cols: "square", cc: 0x7A5A3A, car: 0x8A4A1A, fire: 0xFF9A30 },
asmoday: { fl: [0x3A1010, "marble"], wl: [0x4A1414, "stone"], ce: 0x1A0808, cols: "twist", cc: 0x6A1A1A, car: 0x1A1A1A, fire: 0xFF5A2A },
vine: { fl: [0x2E2E32, "stone"], wl: [0x3E3E46, "stone"], ce: 0x0E0E10, cols: "square", cc: 0x141416, car: 0x0A0A0A, fire: 0xA0C8FF },
balam: { fl: [0x3A2A1A, "stone"], wl: [0x4A3A2A, "stone"], ce: 0x1E140C, cols: "banded", cc: 0x5A4A3A, car: 0x4A3A2A, fire: 0xFF4020 },
zagan: { fl: [0x1A2A20, "marble"], wl: [0x22382A, "marble"], ce: 0x0E1A12, cols: "cluster", cc: 0x2A5A3A, car: 0x6A1A2A, fire: 0x7AE890 },
belial: { fl: [0x2A0A0A, "marble"], wl: [0x3A0E0E, "stone"], ce: 0x1A0606, cols: "round", cc: 0xB8923A, car: 0xB82A1A, fire: 0xFF6A1A },
vassago: { fl: [0x10182A, "marble"], wl: [0x1A2438, "stone"], ce: 0x0A1020, cols: "round", cc: 0x3A4A6A, car: 0x3A4A6A, fire: 0x9AC8FF },
sitri: { fl: [0x5A2A3A, "marble"], wl: [0x6A3242, "plaster"], ce: 0x2A1018, cols: "slender", cc: 0xD8A8B8, car: 0x8A3A5A, fire: 0xFF80B0 },
ipos: { fl: [0x5A4A20, "marble"], wl: [0x7A6A3A, "plaster"], ce: 0x2A2410, cols: "square", cc: 0xE8D8A8, car: 0xC8A03A, fire: 0xFFD060 },
gaap: { fl: [0x30303A, "marble"], wl: [0x3A3A4A, "stone"], ce: 0x18181E, cols: "round", cc: 0x8A8A9A, car: 0x5A5A7A, fire: 0xFFC080 },
stolas: { fl: [0x0E0E1E, "marble"], wl: [0x14142A, "stone"], ce: 0x06060E, cols: "slender", cc: 0x2A2A4A, car: 0x2A2A4A, fire: 0xC0A0FF },
orobas: { fl: [0x4A3220, "wood"], wl: [0xB8A888, "plaster"], ce: 0x3A2A1A, cols: "timber", cc: 0x5A3A22, car: 0x6A4A2A, fire: 0xFFA040 },
seere: { fl: [0xB8C4D0, "stone"], wl: [0x9AB4D0, "plaster"], ce: 0x6A9AC8, cols: "slender", cc: 0xF0F4F8, car: 0x4A8AC8, fire: 0xF0F8FF }
};
function odpPalCtx(key, R, S, dz, door, dx) { return __ZC(401, 292, this, arguments, new.target); }
function odpTint(g, hex, amt) { return __ZC(401, 293, this, arguments, new.target); }
function odpPalCols(st, R, lite) { return __ZC(401, 294, this, arguments, new.target); }
function odpPic(key, w, h, fn) { return otmCanvasMat("odp-pic-" + key, w, h, fn); }
function odpGlass(col) { return otmMat(col, null, { op: 0.45, ds: 1, e: col, ei: 0.25 }); }
var ODP_DECK = {
bael: function (C) { return __ZC(401, 295, this, arguments, new.target); },
paimon: function (C) { return __ZC(401, 296, this, arguments, new.target); },
beleth: function (C) { return __ZC(401, 297, this, arguments, new.target); },
purson: function (C) { return __ZC(401, 298, this, arguments, new.target); },
asmoday: function (C) { return __ZC(401, 299, this, arguments, new.target); },
vine: function (C) { return __ZC(401, 300, this, arguments, new.target); },
balam: function (C) { return __ZC(401, 301, this, arguments, new.target); },
zagan: function (C) { return __ZC(401, 302, this, arguments, new.target); },
belial: function (C) { return __ZC(401, 303, this, arguments, new.target); },
vassago: function (C) { return __ZC(401, 304, this, arguments, new.target); },
sitri: function (C) { return __ZC(401, 305, this, arguments, new.target); },
ipos: function (C) { return __ZC(401, 306, this, arguments, new.target); },
gaap: function (C) { return __ZC(401, 307, this, arguments, new.target); },
stolas: function (C) { return __ZC(401, 308, this, arguments, new.target); },
orobas: function (C) { return __ZC(401, 309, this, arguments, new.target); },
seere: function (C) { return __ZC(401, 310, this, arguments, new.target); }
};
OTM_AT.cold = { x: 7, z: -50.5, y: -6, yaw: Math.PI };
var ODP_AT = { top: { x: 0, z: -1, y: 0, yaw: 0 }, key: { x: 9, z: -202, y: -60, yaw: -Math.PI / 2 }, foot: { x: 0, z: -412, y: -120, yaw: 0 } };
var ODP_IN = [[255, Math.PI / 2 - 0.006, -120], [228.5, ODP_T[0] - 0.02, -126], [193, ODP_T[1], -132], [171, ODP_T[2], -138], [149, ODP_T[3], -144], [127.5, ODP_T[4], -150], [111.5, ODP_T[5], -156], [67, ODP_T[6], -162], [48.8, ODP_T[7] - 0.02, -180], [21, ODP_T[8] - 0.12, -190]];
function odpCtx() { var K = otmCtx(); return K; }
function odpBuild(G) { return __ZC(401, 311, this, arguments, new.target); }
function odpForget() { return __ZC(401, 312, this, arguments, new.target); }
function odpArrive(A) {
camera.position.set(ODP.base + A.x, (A.y || 0) + 1.72, A.z);
if (typeof yaw !== "undefined")
yaw = A.yaw || 0;
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = A.y || 0;
if (ODP.virgil && ODP.virgil.g && ODP.virgil.g.position)
ODP.virgil.g.position.set(A.x + 1, (A.y || 0), A.z + 2);
}
function odpGoRing(i) {
var Q = ODP_IN[i];
if (!Q)
return;
worldCard(null);
if (i === 0) {
odpArrive({ x: 0, z: -421, y: -120, yaw: 0 });
return;
}
odpPlace(Q[0], Q[1], Q[2]);
if (i === 9)
odpFaceDis();
}
function odpGo(at) {
if (!otmDeepOk())
return false;
otmSpiritsLoad();
ODP.wantAt = at || null;
if (WLD.on === ODP.key) {
worldCard(null);
odpArrive(ODP_AT[at] || ODP_AT.top);
return true;
}
return worldGo(ODP.key, { fromName: "Temple Row" });
}
function odpZoneName() { return __ZC(401, 313, this, arguments, new.target); }
function odpLesson(k, said) { return __ZC(401, 314, this, arguments, new.target); }
function odpVirgilTalk() { otmTalk("deep:virgil", "walking beside you, in " + (odpZoneName() || "the rings below the Temple of the Obsidian Moon") + ", below the Temple of the Obsidian Moon"); }
function odpVirgilTick(dt) { return __ZC(401, 315, this, arguments, new.target); }
function odpDirectory() { return __ZC(401, 316, this, arguments, new.target); }
(function () { if (typeof otmDirectory !== "function")
return; var od = otmDirectory; otmDirectory = function () { if (typeof WLD !== "undefined" && WLD.on === ODP.key)
return odpDirectory(); return od.apply(this, arguments); }; })();
if (typeof worldDef === "function")
worldDef(ODP.key, {
base: ODP.base, far: 1200, ownSky: true, tone: 110,
env: function () { return odpEnv(); },
build: function (G) { odpBuild(G); },
enter: function (opt) { return __ZC(401, 317, this, arguments, new.target); },
leave: function () { worldCard(null); if (typeof otmRoadStop === "function")
otmRoadStop(); if (ODP.tune)
try {
ODP.tune.pause();
ODP.tune.volume = 0;
}
catch (e) { } if (ODP.ride) {
if (typeof canFly !== "undefined")
canFly = ODP.ride.fly;
ODP.ride = null;
} if (typeof fvoHush === "function")
try {
fvoHush();
}
catch (e) { } },
ground: function (x, z, feet) { return odpGround(x, z, feet); },
block: function (x, z, feet) { return odpBlock(x, z, feet); },
tick: function (dt) { odpTick(dt); },
back: function () { odpUp(); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(ODP.key) < 0)
WLG.keys.push(ODP.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === ODP.key)
odpForget(); return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[ODP.key])
DGR_W[ODP.key] = { id: ODP.key, name: "the temple, below", def: 0, group: "city" };
if (typeof RCAM_PRIVATE !== "undefined")
RCAM_PRIVATE[ODP.key] = 1;
function odpTick(dt) { return __ZC(401, 318, this, arguments, new.target); }
var OTM_SP_SPOT = {
front: { x: 0, z: 10.5, r: 2.6, fx: 3.2, fz: 8.2 },
hall: { x: 0, z: -20.5, r: 3.2, fx: -2.8, fz: -23.6 },
altar: { x: 0, z: -20.5, r: 3.2, fx: -2.8, fz: -23.6 },
ballroom: { x: 0, z: -47.8, r: 3.2, fx: -3.4, fz: -49.4 },
divine: { x: 71, z: -7, r: 3, fx: 74, fz: -10 },
library: { x: -45, z: 21, r: 3, fx: -45, fz: 24.5 },
circle: { x: 2.6, z: -133, r: 3.2, fx: -2.2, fz: -132.6, woods: 1 }
};
OTM_VOICES["rite:priestess"] = { own: 1, n: "the High Priestess of the Obsidian Moon", e: "who leads the coven's Samhain rites in the temple", d: ["Samhain", "the rites of the coven", "the turning of the year", "the beloved dead"],
i: "Welcome, and blessed be. Stand with us. Tonight the year turns, and the dead are near.",
m: ["You lead the Samhain celebration of the Temple of the Obsidian Moon, the oldest house in Somnucor. You are warm, grave and unhurried, a woman of real presence and dry humour, never sugary and never motherly.",
"You are honest about history: the old Irish rites of Samhain were never written down, and what the coven does (the circle, the quarters, the dumb supper, the ancestor altar) is modern practice, of the twentieth century and after, built on the old folk customs; you say so gladly when asked.",
"The old customs you know well: fires put out and lit again from the Samhain fire (Keating's history, about 1634, places that fire at Tlachtga in Meath), food and a lit hearth left for the dead, guising, turnip lanterns, barmbrack with the ring in it, nuts and apples to tell the future."] };
OTM_VOICES["rite:firekeeper"] = { own: 1, n: "the Keeper of the Fire", e: "who tends the temple's Samhain fire in the stone circle", d: ["the Samhain fire", "the stone circle", "the dark woods"],
i: "Mind the sparks. Come close; the fire likes company tonight.",
m: ["You keep the fire in the stone circle in the dark woods behind the Temple of the Obsidian Moon. You are a big, quiet, weathered man who says little and means it, with a low laugh.",
"You know the old fire customs: in Ireland every hearth was put out and lit again from the Samhain fire, which Geoffrey Keating's Foras Feasa ar Éirinn (about 1634) places at Tlachtga, the Hill of Ward in County Meath; in Scotland and Wales Halloween bonfires were lit on hills, and in Wales folk ran home from the dying fire crying that the tailless black sow (yr Hwch Ddu Gwta) would take the last one.",
"You never tell anyone how to make or spread a fire, and you keep everyone back from the flames."] };
OTM_VOICES["rite:seanchai"] = { own: 1, n: "the Seanchaí of the temple", e: "the temple's storyteller and keeper of the old lore", d: ["the old Irish tales", "the Samhain lore", "the Halloween games"],
i: "Sit, sit. A story is better told to someone sitting. Which one will it be?",
m: ["You are the temple's seanchaí, an Irish storyteller of the old kind: quick, funny, a little vain about your memory, and strict about what the books really say.",
"Your sources: Echtra Nerai (Nera in the mound of Cruachan on Samhain night), the boyhood deeds of Fionn (Aillen mac Midgna, who burned Tara every Samhain until Fionn kept himself awake with a spear point and killed him), the Coligny calendar of Gaul (2nd century AD, a month SAMON-, with the words TRINOX SAMONI, the three nights of Samon), Burns' poem Halloween (1785), Maclise's painting Snap-Apple Night (1833), the Manx Hop-tu-Naa.",
"Where the old books are silent you say so, and you never pass a modern guess off as ancient."] };
function otmSpCfg() { return otmCfg().sp || otmSpMerge(null); }
function otmSpRow(k) { return OTM_SP_PROG.filter(function (r) { return r[0] === k; })[0] || null; }
function otmSpEndMs() { var L = OTM_SP_PROG[OTM_SP_PROG.length - 1]; return otmSpStartMs(otmSpCfg()) + (L[1] + L[2]) * 60000; }
function otmSpNow(at) {
var sp = otmSpCfg(), now = at || Date.now(), st = otmSpStartMs(sp), o = { phase: "off", item: null, next: null, start: st, now: now };
if (OTM.spForce && otmSpRow(OTM.spForce)) {
o.phase = "on";
o.item = otmSpRow(OTM.spForce);
o.forced = true;
return o;
}
if (!sp.on)
return o;
for (var i = 0; i < OTM_SP_PROG.length; i++) {
var r = OTM_SP_PROG[i], a = st + r[1] * 60000, b = a + r[2] * 60000;
if (now >= a && now < b) {
o.item = r;
o.phase = "on";
o.next = OTM_SP_PROG[i + 1] || null;
return o;
}
if (now < a) {
o.next = r;
o.phase = i === 0 ? "before" : "on";
return o;
}
}
o.phase = "after";
return o;
}
function otmSpAt(r) { return otmSpStartMs(otmSpCfg()) + r[1] * 60000; }
function otmSamhainOn() {
if (otmCfg().samhain || OTM.spForce)
return true;
var sp = otmSpCfg();
if (!sp.on)
return false;
var now = Date.now(), st = otmSpStartMs(sp);
return now >= st - 6 * 3600000 && now < otmSpEndMs();
}
function otmSpLocal(ms) { try {
return new Date(ms).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
catch (e) {
return "";
} }
function otmSpSameZone() { try {
return new Date().getTimezoneOffset() === -OTM_SP_UTC * 60;
}
catch (e) {
return false;
} }
function otmSpIn(ms) { var m = Math.max(0, Math.round((ms - Date.now()) / 60000)); if (m < 60)
return m + " minute" + (m === 1 ? "" : "s"); var h = Math.floor(m / 60), r = m % 60; return h + " hour" + (h === 1 ? "" : "s") + (r ? " " + r + " min" : ""); }
function otmSpBuild() { return __ZC(401, 319, this, arguments, new.target); }
function otmSpPlace(r) { return r[5] === "altar" ? "hall" : r[5]; }
var OTM_SP_ROBE = { priestess: { top: 0x1A0A22, bottom: 0x0A0A0E, sex: "f", hair: 0x1A1414, topKind: "robe" }, firekeeper: { top: 0x3A1A0A, bottom: 0x1A120A, sex: "m", hair: 0x5A5048, topKind: "robe" }, seanchai: { top: 0x2A3A22, bottom: 0x1A1A12, sex: "m", hair: 0xD8D4C8, topKind: "robe" } };
function otmSpPerson(seed, look) { return __ZC(401, 320, this, arguments, new.target); }
function otmSpStage() { return __ZC(401, 321, this, arguments, new.target); }
function otmSpDark() { return __ZC(401, 322, this, arguments, new.target); }
var OTM_SP_ACTS = {
gather: [["🕯️ Take an unlit candle", function () { var p = otmProg(); p.spCandle = Date.now(); otmProgSave(); return "A member of the coven presses a candle of plain beeswax into your hand and closes your fingers round it. \"Keep it unlit,\" she says. \"At midnight every fire goes out. You will light it from the new one.\""; }],
["📜 What happens tonight", "At midnight the bell tolls and the hall goes dark; the circle is cast; then the procession goes out to the stone circle for the new fire. After it: the ancestors, the Dumb Supper, the old games of telling the future, and the vigil until dawn. Tomorrow by day: a teaching in the library, the offering of the harvest, tales by the fire, the remembrance of the dead, the feast, the guising, the great bonfire and, at the last stroke of the day, the closing of the veil."]],
toll: [["🔔 Listen to the bell", function () { return __ZC(401, 323, this, arguments, new.target); }],
["🕯️ Pinch out your own flame", "You put out the little flame you carried in. In Ireland, folk custom says, every hearth fire was let die on this night and lit again from the Samhain fire, so the whole country began the winter from one flame."]],
circle: [["🌬️ Stand at the East (air, the dawn)", "You stand at the East as the High Priestess calls it: air, breath and the rising sun."],
["🔥 Stand at the South (fire, noon)", "You stand at the South: fire, will and the height of the day."],
["🌊 Stand at the West (water, dusk)", "You stand at the West: water, feeling and the setting sun, and the old Irish Otherworld that lay over the western sea."],
["🪨 Stand at the North (earth, midnight)", "You stand at the North: earth, the body and midnight."],
["📜 Is this the old way?", "The High Priestess answers plainly: casting a circle and calling the four quarters is the way of modern witchcraft, written down in the 1950s and after. The rites of the old Irish at Samhain were never written down, and nobody living knows their words. \"We do not pretend,\" she says. \"We honour them our own way.\""]],
procession: [["🔥 Take a flame from the new fire", function () { return __ZC(401, 324, this, arguments, new.target); }],
["👣 Walk sunwise round the circle", "You walk once round the stones the way the sun goes, keeping the fire on your right hand, as the old people of Ireland and Scotland walked round holy wells and fires (deiseal, 'sunwise')."]],
ancestors: [["name"],
["📜 Why the dead come home", "All over the old Celtic lands the dead were thought near at Samhain. In Ireland and Scotland food was left out for them and the hearth kept lit, and a place was left at the table; in Brittany the dead were thought to come back to their homes on the night of All Souls. The Church set All Saints on the first of November and All Souls on the second, and the old and the new mingled."]],
supper: [["🍽️ Sit at the table in silence", "You sit. Nobody speaks. The plates are set, the candles burn, and the chair at the head of the table, turned away, stays empty for the dead. The dumb supper, a meal eaten in silence for the dead, is a folk custom written down in Britain and America in the 1800s."],
["🕯️ Lay food at the empty place", "You lay a little of everything at the empty place, bread and salt first. Leaving food out for the returning dead on Samhain night was the custom of Ireland and Scotland for centuries."]],
apples: [["🌰 Put two nuts on the fire", function () { return __ZC(401, 325, this, arguments, new.target); }],
["🍎 Snap at the apple", function () { return __ZC(401, 326, this, arguments, new.target); }],
["🍏 Throw the apple peel", function () { var L = "ABCDEFGHJKLMNPRSTW"[Math.floor(Math.random() * 18)]; return "You peel an apple in one long ribbon and throw it over your left shoulder. It lands curled like a letter " + L + ": the first letter of the name of the one you will marry, the old Halloween game says."; }]],
vigil: [["💬 Speak with the dead of Samhain", function () { worldCard(null); otmTalk("seance:samhain", "the Vigil of the Thin Veil, in the Congregation Hall of the Temple of the Obsidian Moon, in the quiet hours after midnight on Samhain"); return null; }],
["🕯️ Sit in silence", "You sit in a pew in the half dark. Somewhere a candle gutters. The quiet of the coven is the kind you can lean on."]],
dawn: [["🌅 Face the east", "The great doors are thrown open and the first light of the winter comes up grey and gold over Somnucor. The High Priestess greets it: the light half of the year is gone, the dark half begun. The old Irish year had four great feasts at its quarters: Samhain, Imbolc, Beltaine and Lughnasa."]],
lore: [["📜 Where the word comes from", "Samhain is Old Irish (samain), the first of November. The Coligny calendar, a bronze calendar of Gaul made in the 2nd century AD and found in France in 1897, has a month SAMON-, and beside it the words TRINOX SAMONI, 'the three nights of Samon'. Scholars still argue whether it means summer's end."],
["📖 Samhain in the old tales", "In the old Irish tales Samhain is when great things happen: the kings of Ireland gathered at Tara; the mounds of the sídhe stood open; Nera walked into the mound of Cruachan; Fionn killed Aillen, who burned Tara every Samhain. The Ulster tales say the feast lasted three days either side."],
["🎃 Turnips before pumpkins", "The first jack-o'-lanterns of Ireland and Scotland were carved from turnips and mangel-wurzels. Irish and Scottish emigrants to America took the custom over, and the bigger pumpkin, easy to carve, won."]],
harvest: [["🍎 Lay the harvest on the Cyber Altar", function () { worldCard(null); if (typeof otmAltarCard === "function")
otmAltarCard(); return null; }],
["🥮 The soul cakes", "In England, for All Hallows and All Souls, the poor went souling door to door, singing for soul cakes, a prayer for the dead promised for each cake. Shakespeare knew it: in The Two Gentlemen of Verona Speed mocks his master for speaking \"puling, like a beggar at Hallowmas\"."]],
tales: [["📖 Nera and the mound of Cruachan", "On Samhain night at Cruachan, Queen Medb and King Ailill promised a prize to anyone who would tie a twig round the foot of a hanged man on the gallows. Only Nera dared. The dead man asked him for a drink, and Nera carried him on his back to find one. Coming back he saw the royal fort burned and its people slain, and followed the raiders into the sídh, the fairy mound, where he married a woman of the mound. She told him what he had seen was what would come to pass next Samhain unless Ailill was warned, and sent him home carrying summer fruit, wild garlic, primroses and golden fern, to prove where he had been. (Echtra Nerai, 'The Adventure of Nera'.)"],
["📖 Fionn and the burner of Tara", "Every Samhain for twenty-three years Aillen mac Midgna came out of the sídh to Tara, played music on his timpán that put every man to sleep, and burned the hall with his breath. Young Fionn, ten years old, kept himself awake by pressing the point of a spear to his forehead, and when Aillen came, Fionn killed him. For it he was made head of the Fianna. (The boyhood deeds of Fionn, and the Colloquy of the Old Men.)"],
["💬 Ask for another tale", function () { worldCard(null); otmTalk("rite:seanchai", "Tales by the Fire, at the stone circle in the dark woods behind the Temple of the Obsidian Moon, on the day of Samhain"); return null; }]],
remembrance: [["📜 Hear the names read", function () { return __ZC(401, 327, this, arguments, new.target); }],
["name"]],
feast: [["🥮 Cut the barmbrack", function () { return __ZC(401, 328, this, arguments, new.target); }],
["🥔 Eat colcannon", "Potatoes mashed with kale or cabbage, butter and scallions: colcannon, the Irish Halloween dish, sometimes with a ring or a coin hidden in it too. A bowl was often left out for the fairies and the dead."],
["🍷 Raise a glass to the dead", "The whole ballroom stands and raises a glass. \"To those who came home tonight.\""]],
guising: [["🎭 Put on a mask", function () { return __ZC(401, 329, this, arguments, new.target); }],
["🎶 Sing for your treat", function () { return "You sing at the door of the vestry, and a coven member gives you an apple and a handful of nuts. On the Isle of Man the children still go round on Hop-tu-Naa night (the 31st of October) singing \"Hop-tu-Naa, my mother's gone away\" and carrying turnip lanterns."; }]],
bonfire: [["cast"],
["👣 Walk sunwise round the fire", "You walk sunwise round the great fire, the heat on your right cheek. In Wales, folk custom says, when the Halloween fire burned low everyone ran home crying that the tailless black sow, yr Hwch Ddu Gwta, would catch the last one."]],
closing: [["🙏 Thank the quarters", "The High Priestess thanks the North, the West, the South and the East, and opens the circle. \"Merry meet, and merry part, and merry meet again.\""],
["🕯️ Carry your flame home", function () { var p = otmProg(); return "You carry your candle out into the winter" + (p.spFlame ? ", the flame you took from the new fire still alight" : "") + ". The temple's hearths are lit again for the dark half of the year. The veil closes. Blessed Samhain."; }]]
};
function otmSpBell(n) { for (var i = 0; i < n; i++)
(function (i) { setTimeout(function () { if (typeof playTone === "function")
playTone(146.8, 2.2); }, i * 1300); })(i); }
function otmSpTell(h) { otmSay(h); otmSpToast(h); }
function otmSpNames() { return __ZC(401, 330, this, arguments, new.target); }
function otmSpName(n) { return __ZC(401, 331, this, arguments, new.target); }
function otmSpCard(said) { return __ZC(401, 332, this, arguments, new.target); }
function otmSpBoard() { return __ZC(401, 333, this, arguments, new.target); }
function otmSpTry(k) {
OTM.spForce = k || null;
worldCard(null);
if (WLD.on === OTM.key && WLD.w && WLD.w.g && OTM.builtSam !== otmSamhainOn())
otmSpRebuild();
OTM.spShown = "#";
OTM.spDarkOn = null;
if (k) {
var r = otmSpRow(k), pl = r[5] === "altar" ? "hall" : r[5];
if (WLD.on === OTM.key)
otmArrive(OTM_AT[pl]);
else
otmGo(pl);
}
}
function otmSpRebuild() {
var G = WLD.w.g, P = camera.position.clone(), y = typeof yaw !== "undefined" ? yaw : 0;
while (G.children.length)
G.remove(G.children[0]);
otmForget();
otmBuild(G);
OTK = OTM.K;
camera.position.copy(P);
if (typeof yaw !== "undefined")
yaw = y;
OTM.spShown = "#";
OTM.spDarkOn = null;
}
function otmSpToast(h) { return __ZC(401, 334, this, arguments, new.target); }
var OTM_SP_BIG = { gather: 1, toll: 1, procession: 1, ancestors: 1, dawn: 1, harvest: 1, remembrance: 1, feast: 1, bonfire: 1, closing: 1 };
function otmSpWatch() {
try {
if (typeof camera === "undefined" || typeof WLD === "undefined")
return;
var N = otmSpNow();
if (N.forced || N.phase === "off")
return;
var here = WLD.on === OTM.key, told;
try {
told = JSON.parse(localStorage.getItem("otm_sp_told") || "{}") || {};
}
catch (e) {
told = {};
}
var stamp = String(N.start), k = null, h = "";
if (N.item && Date.now() - otmSpAt(N.item) < 15 * 60000 && (here || OTM_SP_BIG[N.item[0]])) {
k = N.item[0];
h = "🔔 <b>Samhain at the Temple of the Obsidian Moon:</b> " + otmEsc(N.item[4]) + " has begun, in " + otmEsc(OTM_SP_WHERE[N.item[5]]) + "." + (here ? "" : " Menu › 🌙 Temple to go.");
}
else if (N.phase === "before" && otmSpAt(OTM_SP_PROG[1]) - Date.now() < 3 * 3600000 && otmSpAt(OTM_SP_PROG[1]) - Date.now() > 0) {
k = "soon";
h = "🌙 <b>Samhain begins at midnight</b> in the Temple of the Obsidian Moon (" + otmSpIn(otmSpAt(OTM_SP_PROG[1])) + "): the tolling of the year, the new fire, the rite of the ancestors. Menu › 🌙 Temple.";
}
if (!k || told[stamp + ":" + k])
return;
told[stamp + ":" + k] = Date.now();
try {
localStorage.setItem("otm_sp_told", JSON.stringify(told));
}
catch (e) { }
otmSpToast(h);
if (k !== "soon" && k !== "toll")
otmSpBell(here ? 3 : 1);
else if (k === "toll" && !here)
otmSpBell(1);
}
catch (e) { }
}
if (typeof setInterval === "function")
setTimeout(function () { otmSpWatch(); setInterval(otmSpWatch, 20000); }, 12000);
function otmSpTick(dt) { return __ZC(401, 335, this, arguments, new.target); }
setTimeout(function () {
try {
var m = /[?&]ksp=([a-z]+)/.exec(location.search);
if (!m || !otmSpRow(m[1]))
return;
var k = m[1], tries = 0;
var iv = setInterval(function () {
tries++;
if (tries > 90) {
clearInterval(iv);
return;
}
if (!otmKeeper() || WLD.on !== OTM.key || !OTM.built)
return;
clearInterval(iv);
otmSpTry(k);
}, 1500);
}
catch (e) { }
}, 3500);
function otmLockOn() { var R = OTM.rite; if (R && R.known && R.v187)
return R.locked; return otmCfg().lock !== "open"; }
function otmKeptOut() {
if (otmKeeper() || !otmLockOn())
return false;
var R = OTM.rite;
return !(R && R.known && R.mayIn);
}
function otmIsPriest() { return otmKeeper() || !!(OTM.rite && OTM.rite.priest); }
(function () {
if (typeof worldGo !== "function")
return;
var wg = worldGo;
worldGo = function (key, opt) {
if (key === OTM.key && otmKeptOut()) {
var args = arguments, self = this;
if (!otmSigned()) {
otmJoinCard();
return false;
}
otmRiteFetch(true).then(function () { if (!otmKeptOut())
wg.apply(self, args);
else
otmJoinCard(); });
return false;
}
return wg.apply(this, arguments);
};
})();
function otmDoorWord() { return otmKeptOut() ? "the doors are kept for the coven · <b>press E</b> to knock" : "<b>press E</b> to go in"; }
function otmJoinCard(said) { return __ZC(401, 336, this, arguments, new.target); }
function otmJoinForm(fns) { return __ZC(401, 337, this, arguments, new.target); }
function otmWhenShort(t) { try {
return new Date(t).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}
catch (e) {
return String(t || "").slice(0, 10);
} }
function otmPetitions(said) { return __ZC(401, 338, this, arguments, new.target); }
function otmPetitionsNudge() {
var R = OTM.rite;
if (!R || !R.waiting || !otmIsPriest() || OTM.nudged === R.waiting)
return;
OTM.nudged = R.waiting;
otmSay("📜 <b>" + R.waiting + " request" + (R.waiting === 1 ? "" : "s") + " to join the coven wait for you.</b> Menu &gt; 🌙 Temple, or the ledger on the High Priest's desk.");
}
function otmGateTick() { return __ZC(401, 339, this, arguments, new.target); }
(function () { if (typeof otmTick !== "function")
return; var t = otmTick; otmTick = function (dt) { t(dt); try {
otmGateTick();
}
catch (e) { } }; })();
(function () { if (typeof otmCityTick !== "function")
return; var t = otmCityTick; otmCityTick = function (dt) { t(dt); try {
if (otmSigned() && (!OTM.gt || Date.now() - OTM.gt > 120000)) {
OTM.gt = Date.now();
otmRiteFetch().then(otmPetitionsNudge);
}
}
catch (e) { } }; })();
var OMS = { key: "otmoonstair", base: -7650000, G: null, built: false, lite: false, t: 0, pt: 0, spots: [], want: null, said: 0, cityMat: null, myFn: null };
var OMS_FL = { n: 5, len: 80, land: 8, rise: 60, hw: 2.3, lw: 3.6, top: -432, gate: -462, end: -474 };
var OMS_WORDS = [
["THE STAIR OF THE OBSIDIAN MOON", "for the coven of the temple, and those the High Priest brings"],
["Genesis 28:12", "And he dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven"],
["The Emerald Tablet", "That which is below is like that which is above (Isaac Newton's English, about 1680)"],
["Psalm 24:3", "Who shall ascend into the hill of the LORD? or who shall stand in his holy place?"],
["Paradiso, Canto XXXIII", "The Love which moves the sun and the other stars (Longfellow, 1867)"]
];
function otmMsOk() { return otmKeeper() || otmCoven() || otmIsPriest(); }
var OMS_CITY = { x: 0, z: -19.8, y: 25.0, rise: 0.34, tread: 0.42, n: 1200, w: 5 };
function otmMsCityTop() { var C = OMS_CITY, lite = otmLite(), k = lite ? 2 : 1, n = C.n / k; return { n: n, r: C.rise * k, t: C.tread * k, h: C.n * C.rise, l: C.n * C.tread }; }
function otmMsCityY(lz) { var C = OMS_CITY; return C.y + Math.max(0, (C.z - lz)) * C.rise / C.tread; }
function otmMsCity(G) { return __ZC(401, 340, this, arguments, new.target); }
function otmMsCityNear(x, z, feet) { return __ZC(401, 341, this, arguments, new.target); }
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (OTM_CITY.g && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on)) {
var N = otmMsCityNear(x, z, feet);
if (N && Math.abs(N.lx) < OMS_CITY.w / 2 + 0.8 && N.up > -3 && N.up < 4.5) {
if (!otmMsOk() && Date.now() - OMS.said > 15000) {
OMS.said = Date.now();
otmSay("✨ <b>The stair of light will not bear you.</b> Your hand passes over it like sunlight on water, and you cannot rise onto it.");
}
return true;
}
}
return ba.apply(this, arguments);
};
})();
function otmMsCityTick(P) { return __ZC(401, 342, this, arguments, new.target); }
function otmMsY(z) {
var F = OMS_FL;
if (z > 0)
return 0;
if (z <= F.top)
return F.n * F.rise;
var d = -z, k = Math.floor(d / (F.len + F.land)), r = d - k * (F.len + F.land);
return k * F.rise + (r < F.len ? F.rise * r / F.len : F.rise);
}
function otmMsHalf(z) { var F = OMS_FL; if (z > 0)
return 4.2; if (z <= F.top)
return 11.5; var d = -z, r = d % (F.len + F.land); return r < F.len ? F.hw : F.lw; }
function otmMsGo(frac) {
if (!otmMsOk()) {
otmSay("🌙 <b>The stair is the coven's way.</b>");
return false;
}
OMS.want = frac === undefined ? null : frac;
if (WLD.on === OMS.key) {
otmMsArrive(OMS.want);
OMS.want = null;
return true;
}
return worldGo(OMS.key, { fromName: "Temple Row" });
}
function otmMsArrive(frac) {
var z = 3.2, yw = 0;
if (frac) {
z = Math.max(OMS_FL.top + 2, -frac * (-OMS_FL.top));
}
var x = 0;
camera.position.set(OMS.base + x, otmMsY(z) + 1.72, z);
if (typeof yaw !== "undefined")
yaw = yw;
if (typeof pitch !== "undefined")
pitch = 0.12;
if (typeof flyY !== "undefined")
flyY = 0;
}
function otmMsSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, y: y || 0, name: name, verb: verb, fn: fn }; OMS.spots.push(S); return S; }
function otmMsBuild(G) { return __ZC(401, 343, this, arguments, new.target); }
function otmMsMerge(list) { return __ZC(401, 344, this, arguments, new.target); }
function otmMsThrough() {
worldCard(null);
if (typeof hvnGo === "function") {
hvnGo({ at: "moonstair" });
setTimeout(function () { otmSay("✨ <b>Through the Gate of Light.</b> You step out onto the silver landing of the Court of Heaven."); }, 600);
}
else
otmSay("✨ The Gate of Light is closed for now.");
}
function otmMsEnv() { return __ZC(401, 345, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(OMS.key, {
base: OMS.base, far: 3200, ownSky: true, tone: 660,
env: function () { return otmMsEnv(); },
build: function (G) { otmMsBuild(G); },
enter: function () { return __ZC(401, 346, this, arguments, new.target); },
leave: function () { worldCard(null); worldPrompt(null); otmRoadStop(); },
ground: function (x, z) { return otmMsY(z); },
block: function (x, z) { var F = OMS_FL; if (z > 0)
return Math.hypot(x, z - 2.6) > 4.1; if (z < F.end)
return true; if (z <= F.top && z > F.gate - 0.6 && z < F.gate + 0.6 && Math.abs(x) > 4.2)
return true; return Math.abs(x) > otmMsHalf(z); },
tick: function (dt) { otmMsTick(dt); },
back: function () { worldCard(null); otmGo("hall"); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(OMS.key) < 0)
WLG.keys.push(OMS.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === OMS.key) {
OMS.G = null;
OMS.built = false;
OMS.spots = [];
} return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[OMS.key])
DGR_W[OMS.key] = { id: OMS.key, name: "the temple's stair", def: 0, group: "city" };
if (typeof RCAM_PRIVATE !== "undefined")
RCAM_PRIVATE[OMS.key] = 1;
function otmMsTick(dt) { return __ZC(401, 347, this, arguments, new.target); }
function otmMsHall() { return __ZC(401, 348, this, arguments, new.target); }
var OTM_TUNES = { highway: "assets/sound/highway-down.mp3", stair: "assets/sound/stair-of-light.mp3" };
var OTM_ROAD = { a: {}, want: null };
function otmRoadLevel() { return __ZC(401, 349, this, arguments, new.target); }
function otmRoadTick(dt, which) { return __ZC(401, 350, this, arguments, new.target); }
function otmRoadStop() { for (var k in OTM_ROAD.a) {
try {
OTM_ROAD.a[k].pause();
OTM_ROAD.a[k].volume = 0;
}
catch (e) { }
} OTM_ROAD.want = null; }
(function () {
if (typeof worldGo !== "function")
return;
var wg = worldGo;
worldGo = function (key, opt) {
if (key === "heavens" && !otmMsOk()) {
var args = arguments, self = this;
var no = function () { if (otmTempleJobHeld())
otmTempleJobAsk(true);
else
otmSay("☁️ <b>The way up is closed.</b>"); };
if (!otmSigned()) {
no();
return false;
}
otmRiteFetch(true).then(function () { if (otmMsOk())
wg.apply(self, args);
else
no(); });
return false;
}
return wg.apply(this, arguments);
};
})();
function otmTempleJob(jobId) { return typeof TL_BY_JOB !== "undefined" && !!TL_BY_JOB[jobId]; }
function otmTempleJobHeld() { try {
return !!(typeof WORK !== "undefined" && WORK.data && (WORK.data.jobs || []).some(function (j) { return otmTempleJob(j.job_id); }));
}
catch (e) {
return false;
} }
function otmTempleJobAsk(held) { return __ZC(401, 351, this, arguments, new.target); }
(function () {
function guard(name) {
if (typeof window[name] !== "function")
return;
var f = window[name];
window[name] = function (jobId) {
if (otmTempleJob(jobId) && !otmMsOk()) {
if (typeof AH !== "undefined" && name === "ahApply") {
AH.busy = false;
AH.asking = null;
}
otmTempleJobAsk(false);
return typeof Promise !== "undefined" ? Promise.resolve(null) : null;
}
return f.apply(this, arguments);
};
}
setTimeout(function () { guard("applyFor"); guard("ahApply"); }, 0);
})();
function otmSweep(G) { return __ZC(401, 352, this, arguments, new.target); }
(function () {
if (typeof otmBuild !== "function")
return;
var f = otmBuild;
otmBuild = function (G) { var r = f.apply(this, arguments); try {
otmSweep(G);
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] sweep", e);
} return r; };
})();
var ODS = { done: {} };
function odsM(col, o) { return otmMat(col, null, o); }
function odsChains(P, x, y, z, len) { var ir = odsM(0x1E1A18); for (var i = 0; i < len; i++) {
var l = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.018, 4, 8), ir);
l.position.set(x, y - i * 0.12, z);
l.rotation.y = i % 2 ? Math.PI / 2 : 0;
P.add(l);
} }
function odsCage(P, x, y, z) {
var ir = odsM(0x221C1A), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
otmCyl(0.45, 0.04, ir, 0, 0, 0, g, 10);
otmCyl(0.45, 0.04, ir, 0, 1.1, 0, g, 10);
for (var b = 0; b < 8; b++) {
var a = b / 8 * 6.283;
otmCyl(0.012, 1.1, ir, Math.cos(a) * 0.44, 0.55, Math.sin(a) * 0.44, g, 4);
}
odsChains(P, x, y + 1.9, z, 6);
}
function odsRubble(P, x, y, z, R, n) { var st = odsM(0x3A302A); for (var i = 0; i < n; i++) {
var r = 0.15 + R() * 0.4, m = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), st);
m.position.set(x + (R() - 0.5) * 1.4, y + r * 0.4, z + (R() - 0.5) * 1.6);
m.rotation.set(R() * 3, R() * 3, R() * 3);
m.scale.y = 0.7;
P.add(m);
} }
function odsRoot(P, x, y, z, R, side) { var wd = odsM(0x2A201A); for (var i = 0; i < 3; i++) {
var h = 1.2 + R() * 1.6, m = otmCyl(0.03, h, wd, x, y + h / 2, z + (R() - 0.5) * 1.2, P, 4, 0.09);
m.rotation.z = side * (0.3 + R() * 0.5);
m.rotation.x = (R() - 0.5) * 0.5;
} }
function odsMilestone(P, x, y, z, txt) { var st = odsM(0x4A423A); otmBox(0.55, 1.1, 0.35, st, x, y + 0.55, z, P); var s = wSign([txt], 0.5, 0.3, "#2A2420", "#D8C8A8"); s.position.set(x, y + 0.75, z + 0.18 * (x < 0 ? 1 : -1)); s.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2; s.position.x = x + (x < 0 ? 0.29 : -0.29); s.position.z = z; P.add(s); otmRound(x, z, 0.4, y, 1.1); }
function odsHighway() { return __ZC(401, 353, this, arguments, new.target); }
function odsHall() { return __ZC(401, 354, this, arguments, new.target); }
function odsCourt() { return __ZC(401, 355, this, arguments, new.target); }
(function () {
function wrap(name, after) {
if (typeof window[name] !== "function")
return;
var f = window[name];
window[name] = function () { var r = f.apply(this, arguments); try {
after();
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] deep sweep " + name, e);
} return r; };
}
wrap("odpStair", odsHighway);
wrap("odpHallOfKey", odsHall);
wrap("odpCourt", odsCourt);
})();
var OSB = { bub: null, bubs: [], t: 0 };
function otmMergeBlades(list) { return __ZC(401, 356, this, arguments, new.target); }
function osbStyxBank() { return __ZC(401, 357, this, arguments, new.target); }
function osbBubbles(t) { return __ZC(401, 358, this, arguments, new.target); }
(function () {
if (typeof odpStyx === "function") {
var f = odpStyx;
odpStyx = function () { var r = f.apply(this, arguments); try {
osbStyxBank();
}
catch (e) {
if (window.console)
console.warn("[obsidian-temple] styx bank", e);
} return r; };
}
var W = (typeof WORLDS !== "undefined") && WORLDS[ODP.key];
if (!W || !W.tick)
return;
var t0 = W.tick;
W.tick = function (dt) { var r = t0.apply(this, arguments); try {
OSB.t += (dt || 0.016);
if (OSB.bub && OSB.bub.parent && (OSB.t * 10 | 0) % 2 === 0)
osbBubbles(OSB.t);
}
catch (e) { } return r; };
})();
