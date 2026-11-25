/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DVO_KIND = {
king: { p: 0.86, r: 0.88, m: "stern" },
elder: { p: 0.90, r: 0.84, m: "calm" },
war: { p: 0.86, r: 0.97, m: "stern" },
smith: { p: 0.84, r: 0.92, m: "stern" },
sea: { p: 0.82, r: 0.86, m: "stern" },
wild: { p: 0.90, r: 0.94, m: "sly" },
youth: { p: 1.04, r: 1.02, m: "warm" },
sly: { p: 1.06, r: 1.08, m: "sly" },
dark: { p: 0.78, r: 0.82, m: "dread" },
baron: { p: 0.80, r: 1.04, m: "sly" },
dream: { p: 0.94, r: 0.80, m: "calm" },
queen: { p: 0.95, r: 0.88, m: "stern" },
mother: { p: 0.98, r: 0.88, m: "warm" },
love: { p: 1.04, r: 0.92, m: "warm" },
maiden: { p: 1.12, r: 1.00, m: "warm" },
fury: { p: 0.92, r: 1.00, m: "stern" },
moon: { p: 1.02, r: 0.86, m: "calm" },
night: { p: 0.84, r: 0.80, m: "dread" },
crone: { p: 0.86, r: 0.82, m: "dread" },
kind: { p: 1.00, r: 0.90, m: "warm" },
child: { p: 1.35, r: 1.06, m: "warm" },
dragon: { p: 0.62, r: 0.76, m: "dread" },
demon: { p: 0.76, r: 0.86, m: "dread" },
tempter: { p: 0.96, r: 0.90, m: "sly" },
priestess: { p: 0.96, r: 0.88, m: "calm" }
};
var DVO_OF = {};
function DVK(kind, keys) { keys.split(" ").forEach(function (k) { DVO_OF[k] = kind; }); }
DVK("king", "zeus jupiter odin ra amun horus helios jadeemperor vishnu indra surya anu enlil marduk shamash ahuramazda oduduwa sango dagda nuada bran perun nyame inti kinichahau izanagi solomon farinata");
DVK("elder", "ptah thoth geb orunmila obatala osanyin ogma math laojun shennong pangu fuxi zaojun zhangguolao litieguai zhongliquan brahma shiva tenjin enki itzamna viracocha quetzalcoatl legba damballa bragi janus saturn asclepius merlin virgil homer brunetto pier");
DVK("war", "ares mars thor tyr heimdall vidar ogun aganju tano ogou huitzilopochtli guanyu zhongkui houyi hachiman raijin susanoo kartikeya hanuman nergal mithra taranis set prometheus ulysses");
DVK("smith", "hephaestus vulcan svarog");
DVK("sea", "poseidon neptune njord manannan olokun tangaroa sobek");
DVK("wild", "pan cernunnos freyr ososi tane fujin stribog chaac tlaloc xipetotec osumare");
DVK("youth", "apollo baldr eros aengus lugh krishna rama agni dazhbog jarilo tsukuyomi nanna caoguojiu lancaihe ludongbin hanxiangzi belenos mabon");
DVK("sly", "hermes mercury loki esu anansi sunwukong maui veles gwydion dionysus bacchus fortuna bastet ebisu tezcatlipoca queenmab seanchai ciacco");
DVK("dark", "hades pluto osiris anubis yama yanluo arawn mictlantecuhtli thanatos charon obaluaye cain minos ugolino");
DVK("baron", "baronsamedi");
DVK("dream", "morpheus hypnos");
DVK("queen", "obsidianmother hera juno frigg athena minerva maat nemesis xiwangmu amaterasu eriu rhiannon inanna anahita");
DVK("mother", "demeter ceres gaia hestia vesta isis yemoja nut taweret ninhursag pachamama asaseyaa papatuanuku mokosh matres parvati nuwa coatlicue");
DVK("love", "aphrodite venus freyja hathor osun erzulie xochiquetzal lakshmi benzaiten francesca");
DVK("maiden", "persephone idunn sif brigid artemis diana hexiangu eostre");
DVK("fury", "sekhmet durga kali oya skadi pele");
DVK("moon", "selene change mamaquilla arianrhod hina ixchel");
DVK("night", "nyx hel ereshkigal izanami nephthys morana");
DVK("crone", "hecate morrigan cerridwen babayaga orddu cailleach mamanbrigitte endor");
DVK("kind", "guanyin mazu airmid ganga inari saraswati ganesha epona chalchiuhtlicue ancestor");
DVK("child", "ibeji nezha");
DVK("dragon", "tiamat kingu mushussu apep typhon echidna python ladon draco colchian hydra jormungandr fafnir nidhogg ydraiggoch barrowwyrm zmey azidahaka vritra vasuki shesha aoguang yinglong ryujin orochi leviathan");
DVK("demon", "belial beelzebub astaroth mammon belphegor bael paimon samael moloch adramelech lucifuge satan azazel baphomet choronzon ahriman beleth purson asmoday vine balam zagan vassago ipos gaap stolas orobas seere");
DVK("tempter", "lucifer lilith naamah asmodeus sitri nachash");
DVK("priestess", "priestess pythia");
DVK("dark", "samhaindead");
DVK("war", "firekeeper");
var DVO_ALIAS = { oghma: "ogma", wukong: "sunwukong", lvdongbin: "ludongbin", ddraiggoch: "ydraiggoch" };
var DVO_OWN = { "seance:ancestor": "ancestor", "seance:pythia": "pythia", "seance:endor": "endor", "seance:samhain": "samhaindead",
"rite:priestess": "priestess", "rite:firekeeper": "firekeeper", "rite:seanchai": "seanchai" };
var DVO_SEX = { queenmab: "f", eostre: "f", cailleach: "f", obsidianmother: "f", pythia: "f", endor: "f", priestess: "f", francesca: "f",
merlin: "m", belenos: "m", mabon: "m", firekeeper: "m", virgil: "m", homer: "m", solomon: "m", farinata: "m", ulysses: "m", ugolino: "m",
minos: "m", brunetto: "m", pier: "m", ciacco: "m",
baphomet: "", ibeji: "", ancestor: "", samhaindead: "", seanchai: "" };
var DVO_NAMES = { "the obsidian mother": "obsidianmother", "obsidian mother": "obsidianmother", "eostre": "eostre", "belenos": "belenos",
"mabon": "mabon", "the cailleach": "cailleach", "cailleach": "cailleach", "skaði": "skadi", "chang'e": "change", "queen mab": "queenmab", "merlin": "merlin",
"hades & persephone": "hades" };
var DVO_LOC = { Irish: ["en-IE", "en-GB"], Welsh: ["en-GB"], Gaulish: ["en-GB"], "Anglo-Saxon": ["en-GB"], Norse: ["en-GB"], Slavic: ["en-GB"],
Greek: ["en-GB"], Roman: ["en-GB"], Egyptian: ["en-GB"], Mesopotamian: ["en-GB"], Persian: ["en-GB"], Hebrew: ["en-GB"],
Demonology: ["en-GB"], Qliphothic: ["en-GB"], Adversarial: ["en-GB"],
Hindu: ["en-IN"], Yoruba: ["en-NG", "en-GH", "en-KE", "en-ZA"], Akan: ["en-GH", "en-NG", "en-KE"], Polynesian: ["en-NZ", "en-AU"], Hawaiian: ["en-US"],
Chinese: ["en-HK", "en-SG"] };
var DVO_PLAIN = ["en-GB", "en-US"];
var DVO_OWN_LOC = { seanchai: ["en-IE", "en-GB"], priestess: ["en-GB", "en-IE"], firekeeper: ["en-IE", "en-GB"], samhaindead: ["en-IE", "en-GB"],
cailleach: ["en-IE", "en-GB"], eostre: ["en-GB"], belenos: ["en-GB"], mabon: ["en-GB"], merlin: ["en-GB"], queenmab: ["en-GB", "en-IE"],
obsidianmother: ["en-GB"], pythia: ["en-GB"], endor: ["en-GB"], virgil: ["en-GB"], homer: ["en-GB"], solomon: ["en-GB"] };
var DVO = { names: null, last: null };
function dvoNames() { return __ZC(416, 0, this, arguments, new.target); }
function dvoKeyOf(c) { return __ZC(416, 1, this, arguments, new.target); }
function dvoSexOf(k) {
if (Object.prototype.hasOwnProperty.call(DVO_SEX, k))
return DVO_SEX[k];
return typeof DEITY_F !== "undefined" && DEITY_F[k] ? "f" : "m";
}
function dvoProfile(c) { return __ZC(416, 2, this, arguments, new.target); }
var DVO_VF = /\b(neerja|ezinne|molly|yan|emily|clara|natasha|leah|asilia|rosa|luna|maisie|ana|ava|moira|veena|tessa|karen|google us english)\b/i, DVO_VM = /\b(prabhat|abeo|mitchell|sam|connor|liam|william|luke|chilemba|james|wayne|andrew|brian|rishi|daniel|arthur)\b/i;
var DVO_AND_M = /-x-(iol|iom|tpd|rjs|gbd|aub|aud)-/i, DVO_AND_F = /-x-(sfg|iob|iog|tpc|tpf|gba|gbc|gbg|afh|aua|auc|ahp|cxx)-/i;
function dvoVoiceSex(v) { return __ZC(416, 3, this, arguments, new.target); }
function dvoLang(v) { return String(v && v.lang || "").replace("_", "-").toLowerCase(); }
function dvoKids() { try {
return typeof kidsZoneHere === "function" && !!kidsZoneHere();
}
catch (e) {
return false;
} }
function dvoPick(c, V) { return __ZC(416, 4, this, arguments, new.target); }
var DVO_LINES = {
stern: {
hi: ["I am {n}. You may speak.", "{n} hears you, dreamer.", "You stand before {n}. Speak plainly.", "So. A dreamer, come to {n}.", "{N}: these are mine. What do you want of them?"],
thanks: ["It is given. Go well.", "Remember who answered you.", "{n} accepts it.", "Thanks are easy. Keep your word instead."],
bye: ["Go, then. {n} will be here when you dream again.", "Go. And do not forget what was said.", "Until your next dream.", "Walk tall, dreamer."],
ask: ["That is a question for {d1}, and {d1} is mine. Ask it again in a dream.", "You ask much. {n} answers little, today.", "Not yet. Earn the answer.", "Some answers are not given. They are won."],
any: ["{n} listens.", "Speak plainly, dreamer.", "Go on. I am listening.", "{N}. That is what I keep. Remember it.", "Your dream brought you here. Do not waste it."]
},
warm: {
hi: ["Come in, come closer. I am {n}.", "Ah, there you are. {n} is glad of you.", "Welcome, dreamer. Sit a while with {n}.", "Hello, little dreamer. {N} are mine, and you are welcome to them."],
thanks: ["You are welcome. Truly.", "It was a joy to give.", "Keep it close. It is yours now.", "{n} smiles on you."],
bye: ["Go gently. {n} will be here when you dream again.", "Take my blessing with you.", "Until your next dream, dear one.", "Go well, and come back soon."],
ask: ["Ah, a good question. {d1} holds the answer. Dream on it.", "Look at what you dreamt last. The answer sits there, waiting.", "Not yet. But soon, I think.", "Ask your heart first. Then ask me again."],
any: ["{n} is listening.", "Tell me more.", "I hear you. Go on.", "{N}. That is what I keep, and I keep it for you too.", "Your dream brought you here. Trust it."]
},
sly: {
hi: ["Well, well. A dreamer, looking for {n}.", "Ha! You found me. Few do. I am {n}.", "{n}, at your service. Mostly.", "Hello, dreamer. Lost? Good. The best roads start there."],
thanks: ["Thanks? Careful. I might start to like you.", "Don't thank me yet.", "{n} never gives for nothing. We'll settle later.", "Ha. Keep it. You'll owe me something better."],
bye: ["Off you go. Mind the crossroads.", "Until your next dream. I'll be watching.", "Go on, then. I'll find you again.", "Leave by a different door than you came. Just for luck."],
ask: ["A question? I have a hundred. You first.", "Maybe. Maybe not. What will you give for it?", "The answer is in {d1}. Where else?", "Ask me again when you've dreamt something interesting."],
any: ["Is that so?", "Ha! Go on.", "Mm. Interesting. Very interesting.", "{N}. My favourite things.", "Even {n} keeps a secret or two."]
},
dread: {
hi: ["I am {n}. Few come to me willingly.", "You stand before {n}. Be still.", "So. The living come to {n}.", "{N} are mine. You know this. Speak."],
thanks: ["Keep your thanks. Keep your dreams instead.", "It is given. Do not ask twice.", "{n} accepts it.", "Remember who answered you."],
bye: ["Go, then. {n} will be here when you dream again.", "Walk carefully. The dark remembers.", "Go. And write down what you saw.", "Until your next dream. Not before."],
ask: ["That is a question for {d1}, and {d1} is mine. Ask it again in a dream.", "Some answers are not given. They are dreamt.", "You ask much. {n} answers little.", "Not yet. Ask me when you have dreamt more."],
any: ["{n} listens.", "Mm.", "Even a god is silent sometimes.", "{N}. That is what I keep. Remember it.", "Speak, dreamer. I am patient."]
},
calm: {
hi: ["Peace, dreamer. I am {n}.", "{n} has been waiting. Sit.", "Come. {N}: these are mine to keep, and to share.", "Be welcome. {n} hears you."],
thanks: ["It is given freely.", "Go well.", "Let it settle in you, like water.", "{n} accepts it."],
bye: ["Go in peace. {n} will be here when you dream again.", "Until your next dream.", "Go slowly. Write down what you saw.", "The night is long. Rest well."],
ask: ["That is a question for {d1}. Sleep on it, and ask again.", "Look at what you dreamt last. The answer sits there.", "Some answers are not given. They are dreamt.", "Not yet. Be patient."],
any: ["{n} listens.", "Mm. Go on.", "Slowly. There is time.", "{N}. That is what I keep.", "Your dream brought you here. Trust it."]
}
};
function dvoMood(c) {
var P = dvoProfile(c), m = P ? P.mood : "stern";
if (m === "dread" && dvoKids())
m = "calm";
return m;
}
(function () {
if (typeof okyGodLine !== "function")
return;
var gl = okyGodLine;
okyGodLine = function (c, q) {
try {
var L0 = DVO_LINES[dvoMood(c)];
if (!L0)
return gl.apply(this, arguments);
var d = (typeof DEITY !== "undefined" && DEITY && c.deity && DEITY[c.deity]) || { name: c.name || "the god", domains: "what is mine" };
var dom = String(d.domains || "what is mine"), d1 = dom.split(",")[0].trim();
var t = String(q || "").toLowerCase(), k = "any";
if (/^\s*(hi|hello|hey|good (morning|afternoon|evening)|greetings|hail)\b/.test(t) || /\bwho are you\b/.test(t))
k = "hi";
else if (/\b(thanks|thank you|cheers|bless)/.test(t))
k = "thanks";
else if (/\b(bye|goodbye|see you|farewell|good night)\b/.test(t))
k = "bye";
else if (/\?\s*$/.test(t))
k = "ask";
var L = L0[k].map(function (x) { return x.replace(/\{n\}/g, d.name).replace(/\{N\}/g, dom.charAt(0).toUpperCase() + dom.slice(1)).replace(/\{d1\}/g, d1); });
var said = c.okyGodSaid || (c.okyGodSaid = []), fresh = L.filter(function (x) { return said.indexOf(x) < 0; });
if (!fresh.length) {
said.length = 0;
fresh = L;
}
var s = fresh[Math.floor(Math.random() * fresh.length)];
said.push(s);
if (said.length > 12)
said.shift();
return s;
}
catch (e) {
return gl.apply(this, arguments);
}
};
})();
