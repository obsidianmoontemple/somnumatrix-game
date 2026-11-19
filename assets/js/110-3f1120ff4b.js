/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GROW_STOP = ("a an the some my our your his her their its this that these those there here it them they we you he she i me us him " +
"one two three four five six seven eight nine ten eleven twelve twenty hundred thousand first second third last next other another few many several lots lot more most less least each every all both any no none " +
"of in on at to from into onto upon over under above below behind beside between across through around near by with without within along against toward towards off out up down about after before during since until till " +
"and or but so yet nor because though although if when while where which who whom whose what why how than then as like " +
"is are was were be been being am do does did done have has had having can could will would shall should may might must " +
"not very really just only even still also too again ever never always often sometimes suddenly slowly quickly almost quite rather " +
"thing things something someone somebody anything anyone anybody everything everyone everybody nothing nobody place places way ways kind sort type part bit piece side end edge middle centre center top bottom front back inside outside rest " +
"time times moment moments day days night nights morning evening afternoon noon midnight dawn dusk week weeks year years hour hours minute minutes while age " +
"dream dreams dreamt dreamed dreaming feeling feelings sense idea thought thoughts memory memories mind voice voices sound sounds noise light dark darkness shadow shadows smell taste touch silence " +
"head face eyes eye hand hands arm arms leg legs foot feet hair mouth teeth nose ear ears skin body back heart chest shoulder shoulders finger fingers neck knee knees blood breath tears " +
"man men woman women person people boy boys girl girls child children baby babies kid kids friend friends mother father mom mum dad sister brother grandmother grandfather grandma grandpa aunt uncle cousin wife husband son daughter family parents stranger strangers " +
"name names color colour colours colors shape size number word words story stories reason fear love joy anger sadness peace danger trouble problem chance luck " +
"big small little large huge tiny tall short long wide narrow old new young ancient strange weird odd different same familiar beautiful ugly bright dim dark pale deep high low far close empty full open closed broken whole " +
"good bad great nice best worst real fake whole entire own certain sure lost found hidden secret quiet loud warm cold hot cool wet dry soft hard heavy light").split(" ");
var GROW_STOPSET = {};
GROW_STOP.forEach(function (w) { if (w)
GROW_STOPSET[w] = 1; });
var GROW_DET = /^(a|an|the|some|my|our|his|her|their|this|that|these|those|two|three|four|five|six|several|many|another|every|each|no)$/;
var GROW_BREAK = /^(of|in|on|at|to|from|into|onto|upon|over|under|above|below|behind|beside|between|across|through|around|round|past|toward|towards|near|by|with|without|and|or|but|that|which|who|where|when|was|were|is|are|had|has|stood|sat|lay|then|so|as|like|made|full|me|him|her|us|them|it|you|i|we|they|he|she)$/;
var GROW_VERB = /^(grew|ran|flew|came|went|saw|stood|sat|lay|fell|rose|spoke|took|gave|made|found|left|held|kept|began|broke|built|caught|drew|drove|ate|fought|hid|hung|knew|led|lit|met|paid|rode|rang|sang|sank|shone|shook|shot|slept|slid|spun|stole|struck|swam|swung|threw|told|thought|tore|woke|wore|won|wrote|became|crept|dug|fed|felt|fled|flung|got|heard|hit|hurt|let|lost|meant|put|read|said|sent|set|shut|sold|sought|spent|split|spread|stuck|taught|wept|wound|seemed|looked|appeared|turned|began|loomed|towered|glowed|shimmered|floated|hovered|rolled)$/;
var GROW_BEING_NEXT = /^(chased|followed|flew|ran|said|spoke|growled|roared|barked|howled|crawled|swam|attacked|watched|stared|smiled|laughed|whispered|screamed|shrieked|bit|hunted|walked|came|told|asked|sang|danced|hissed|slithered|grabbed|called|cried|spoke|talked|looked|wanted|tried|turned|jumped|leapt|hopped|bounced|floated|appeared|vanished|waved|grinned|breathed|was|who)$/;
var GROW_PLACE = /(house|hall|shop|store|tower|temple|shrine|church|chapel|cathedral|abbey|inn|hotel|tavern|mill|barn|shed|hut|cabin|lodge|palace|castle|fort|fortress|keep|station|office|factory|school|library|museum|arena|stadium|theatre|theater|cinema|dome|spire|pagoda|monastery|mansion|manor|villa|cottage|bungalow|apartment|flats|block|warehouse|garage|depot|gallery|observatory|lighthouse|bridge|gate|arch|wall|ruin|ruins|maze|labyrinth|pyramid|tomb|crypt|vault|bunker|silo|hangar|terminal|market|bazaar|mall|parlour|parlor|salon|studio|workshop|forge|bakery|brewery|winery|distillery|pharmacy|clinic|hospital|prison|jail|court|bank|exchange|embassy|consulate|kingdom|citadel|bastion|keepe|ery|ory|arium|orium|plex|dome|stead|ville|burg|borough)$/;
var GROW_PLANT = /(tree|trees|bush|shrub|flower|flowers|vine|fern|moss|mushroom|toadstool|fungus|cactus|palm|reed|grass|weed|blossom|bloom|bud|lily|rose|orchid|tulip|daisy|ivy|hedge|root|roots|leaf|leaves|wood|grove|orchard|garden|thicket|bramble|thorn|thorns|willow|oak|pine|birch|maple|cedar|cypress|redwood|sequoia|baobab|bamboo|lotus|kelp|seaweed|coral)$/;
var GROW_RIDE = /(car|cart|wagon|carriage|coach|bus|tram|train|engine|locomotive|boat|ship|raft|canoe|kayak|yacht|ferry|submarine|sub|plane|jet|glider|helicopter|balloon|airship|zeppelin|rocket|spaceship|shuttle|bike|bicycle|cycle|scooter|motorbike|skateboard|sled|sledge|sleigh|chariot|tank|truck|lorry|van|taxi|cab|limo|limousine|mobile|craft)$/;
function growHash(s) { var h = 2166136261 >>> 0; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619) >>> 0;
} return h >>> 0; }
function growRnd(seed) { var x = seed || 1; return function () { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return (x >>> 0) / 4294967296; }; }
var GROW_PAL = ["#8A5A44", "#5A6E8A", "#6E8A5A", "#8A7A4A", "#7A4A6E", "#4A7A7A", "#B88A4A", "#A8463A", "#3E5E8E", "#C9B48A", "#5E4E7E", "#7E9E6E", "#D0A060", "#9E6E8E", "#4E6E5E", "#B0B8C0"];
function growColor(r) { return GROW_PAL[Math.floor(r() * GROW_PAL.length)]; }
function growRecipe(word, cat) { return __ZC(110, 0, this, arguments, new.target); }
function growKnownWord(w) { return __ZC(110, 1, this, arguments, new.target); }
var GROW_WORDS = null;
function growWordIndex() { return __ZC(110, 2, this, arguments, new.target); }
function growIsKnown(w) {
var set = growWordIndex();
if (set[w] || growKnownWord(w))
return true;
var sing = w.replace(/ies$/, "y").replace(/(ch|sh|x|ss)es$/, "$1").replace(/s$/, "");
return sing !== w && (set[sing] || growKnownWord(sing));
}
function growSingular(w) { return w.replace(/ies$/, "y").replace(/(ch|sh|x|ss)es$/, "$1").replace(/([^s])s$/, "$1"); }
function growCategory(w) {
if (GROW_PLACE.test(w))
return "structure";
if (GROW_PLANT.test(w))
return "nature";
if (GROW_RIDE.test(w))
return "vehicle";
return "infra";
}
var GROW_ABSTRACT = /^(riddle|joke|question|answer|secret|lesson|message|song|story|game|plan|idea|problem|mistake|promise|reason|choice|chance|truth|lie|lies|dream|nightmare|feeling|sense|fear|hope|wish|luck|magic|power|powers|energy|spirit|soul|life|death|world|universe|hat|hats|coat|coats|dress|dresses|shirt|shirts|shoes|shoe|boots|boot|jacket|scarf|gloves|glove|ring|rings|necklace|socks|pants|trousers|skirt|uniform|mask|cloak|cape|crown|glasses|clothes|outfit|everywhere|anywhere|nowhere|somewhere|home|school|work|town|city|room|house|outside|inside|downstairs|upstairs|today|tonight|yesterday|tomorrow)$/;
var GROW_PREV = /^(a|an|the|some|my|our|his|her|their|this|that|these|those|two|three|four|five|six|several|many|another|every|each|no|of|over|under|with|past|near|beside|by|into|onto|among|through|inside|behind|between|around|across|from|saw|found|met|had|rode|ate|built|bought|held|carried|watched|chased|fought|fed|kept|made|were|was|are|is|like|giant|tiny|huge|little|big|old|new|glowing|floating|flying|talking|burning|broken|golden|silver|glass|wooden|stone|crystal|dark|bright|strange|enormous|ancient|haunted|abandoned|empty|endless|whole|and)$/;
var GROW_CREATURE = /(saur|saurs|fish|bird|wolf|wolves|cat|dog|bug|worm|beast|monster|pede|taur|wyrm|wyvern|troll|ogre|sprite|pixie|golem|ghoul|zombie|vampire|werewolf|yeti|sphinx|kraken|hydra|chimera|basilisk|manticore|gremlin|kobold|nymph|siren|harpy|centaur|minotaur|cyclops|leviathan|behemoth|jellyfish|octopus|squid|whale|shark|crab|lobster|snail|slug|frog|toad|lizard|gecko|iguana|turtle|tortoise|bat|bats|rat|rats|mouse|mice|bear|deer|moose|elk|fox|owl|crow|raven|eagle|hawk|parrot|penguin|panda|tiger|lion|leopard|cheetah|monkey|ape|gorilla|giraffe|zebra|hippo|rhino|kangaroo|koala|sloth|otter|beaver|badger|weasel|ferret|hamster|bunny|rabbit|alien|aliens|robot|android|cyborg|clown|butler|knight|wizard|witch|pirate|ninja|samurai|soldier|king|queen|prince|princess)$/;
var GROW_PERSON = /(man|men|woman|women|person|people|folk|ist|ists|keeper|keepers|maker|makers|monk|monks|nun|nuns|priest|priests|guard|guards|officer|officers|worker|workers|fighter|fighters|smith|smiths|herd|herds|maid|maids|lady|ladies|lord|lords|chief|chiefs|cop|cops|nurse|nurses|doctor|doctors|teacher|teachers|student|students|baker|bakers|farmer|farmers|sailor|sailors|soldiers|guy|guys|kid|kids|boys|girls)$/;
function growAdjLike(w) { return /(ed|ing|y|ful|ous|ish|al|ic|ive|less|en)$/.test(w) || (typeof MODIFIERS !== "undefined" && MODIFIERS[w] !== undefined) || (typeof NAMED !== "undefined" && NAMED[w] !== undefined); }
function growNounLike(w) { return __ZC(110, 3, this, arguments, new.target); }
function unknownThings(text) { return __ZC(110, 4, this, arguments, new.target); }
var GROWN_HERE = {};
function growWord(u) { return __ZC(110, 5, this, arguments, new.target); }
var GROW_NOTED = {};
function growNote(word, kind, key) {
word = String(word).replace(/\s+/g, "-");
if (GROW_NOTED[word])
return;
GROW_NOTED[word] = 1;
if (typeof cityRpc !== "function" || typeof signedIn !== "function" || !signedIn())
return;
cityRpc("note_dream_word", { p_word: word, p_kind: kind, p_key: key }).catch(function () { GROW_NOTED[word] = 0; });
}
var GROW_PLACES = [
[/\b(neighbou?rhoods?|subdivisions?|suburbs?|residential (?:area|street)s?|housing estates?|cul-de-sacs?|the burbs)\b/, "a road. a house. a house. a house. a house. a house. a house. a tree. a tree. a mailbox. a driveway. a car."],
[/\b(village|hamlet)s?\b/, "a road. a cottage. a cottage. a cottage. a cottage. a church. a well. a shop. a tree. a tree."],
[/\b(old town|old part of town|main street|high street|town square|small town|the town)\b/, "a road. a shop. a shop. a shop. a bank. a church. a hotel. a fountain. a streetlight. a bench."],
[/\b(downtown|city cent(?:re|er)|the city|big city|inner city|business district)\b/, "a road. a skyscraper. a skyscraper. an office. a bank. a hotel. a shop. a shop. a streetlight. a bus."],
[/\b(strip malls?|shopping (?:centre|center|plaza)|plaza|retail park)\b/, "a road. a shop. a shop. a shop. a shop. a car. a car. a streetlight."],
[/\b(campus|university|college grounds)\b/, "a school. a school. a library. a lawn. a tree. a tree. a bench."],
[/\b(the park|a park|city park|public park|parkland)\b/, "a lawn. a tree. a tree. a tree. a bench. a pond. a fountain."],
[/\b(back ?yard|front ?yard|the yard|garden behind)\b/, "a lawn. a fence. a tree."],
[/\b(school ?yard|school grounds)\b/, "a school. a playground. a fence."],
[/\b(harbou?r|marina|the port|seaport|waterfront)\b/, "a pier. a boat. a boat. a crane. a warehouse."],
[/\b(industrial (?:area|estate|park|zone)|factory district)\b/, "a factory. a warehouse. a warehouse. a crane. a truck."],
[/\b(market ?place|market square|bazaar|farmers market|flea market)\b/, "a stall. a stall. a stall. a stall. a fountain."],
[/\b(trailer park|caravan park|campground|campsite)\b/, "a tent. a tent. a tent. a car. a tree."],
[/\b(fire ?house|fire station|fire hall)\b/, "a red garage. a red truck."],
[/\b(police station|precinct)\b/, "a blue office. a car."]
];
var GROW_PREFIX_COLOUR = { fire: "red", flame: "red", blood: "crimson", rose: "pink", ice: "white", snow: "white", frost: "pale blue", sky: "blue", sea: "blue", water: "blue", ocean: "blue", sun: "yellow", gold: "golden", golden: "golden", moon: "silver", silver: "silver", star: "silver", shadow: "black", night: "black", dark: "black", coal: "black", sand: "tan", stone: "grey", rock: "grey", iron: "grey", steel: "grey", copper: "copper", tree: "brown", wood: "brown", log: "brown", grass: "green", leaf: "green", forest: "green", candy: "pink", sugar: "pink", ghost: "white", bone: "ivory", crystal: "cyan", glass: "cyan", lava: "red", rust: "rust", cloud: "white", storm: "grey", mud: "brown", cherry: "red", lemon: "yellow", lime: "lime", mint: "mint", ruby: "red", emerald: "emerald", sapphire: "blue", jade: "jade" };
var GROW_NUM = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, several: 4, many: 6, "lots of": 6, "a lot of": 6, "a few": 3, "a couple of": 2, "rows of": 7, "a row of": 6, "a bunch of": 5, "tons of": 8, "loads of": 6, "a line of": 5, "a group of": 4, "a crowd of": 8 };
function growHeadArch(w) {
if (!w)
return null;
for (var i = 0; i < PHRASES.length; i++)
if (PHRASES[i][0] === w)
return PHRASES[i][1];
if (typeof KIT !== "undefined" && KIT[w])
return w;
return null;
}
function growSplit(w) { return __ZC(110, 6, this, arguments, new.target); }
var GROW_BIZ = /(mat|ery|eria|teria|orium|arium|mart|shop|store|bar|salon|parlou?r|emporium|outlet|depot|boutique|studio|gallery|club|lounge|joint|stand|kiosk)$/;
var GROW_GENERIC = /^(ship|ships|boat|house|building|place|thing|machine|vehicle|station|tower|hall|structure|craft|contraption|device)$/;
var GROW_SIZEWORD = /\b(a|an|the|this|that|some|two|three|four|five|six|several|many|huge|big)\s+(giant|gigantic|colossal|titanic|monster|mammoth)\s+(?=([a-z]+))/g;
function growRead(chunk) { return __ZC(110, 7, this, arguments, new.target); }
function growExpand(chunk) { return __ZC(110, 8, this, arguments, new.target); }
(function () {
if (typeof learnWord !== "function" || typeof KIT === "undefined")
return;
var rk = KIT.starship ? "starship" : (KIT.shuttle ? "shuttle" : null);
if (rk)
["rocket", "rockets", "rocketship", "rocket ship", "space rocket", "moon rocket", "spacecraft", "space ship"].forEach(function (w) { learnWord(rk, w); });
})();
(function () {
if (typeof scanText !== "function")
return;
var st = scanText;
scanText = function (chunk) {
var EX = null;
try {
chunk = growRead(chunk);
}
catch (e) { }
var lexMade = [];
try {
if (typeof lexFind === "function") {
var lw = String(chunk || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z' -]+/g, " . ").split(/\s+/).filter(Boolean), idx0 = growWordIndex();
for (var li = 0; li < lw.length; li++) {
for (var ln = 3; ln >= 2; ln--) {
var seg = lw.slice(li, li + ln);
if (seg.length < ln || seg.indexOf(".") > -1)
continue;
if (GROW_DET.test(seg[0]) || GROW_BREAK.test(seg[0]))
continue;
var ph = seg.join(" ");
if (idx0[ph] || growKnownWord(ph)) {
li += ln - 1;
break;
}
if (GROW_PLACES.some(function (pl) { return pl[0].test(" " + ph + " "); }))
continue;
var lk = lexFind(ph);
if (lk) {
learnWord(lk, ph);
lexMade.push(ph);
growNote(ph, "dictionary", lk);
li += ln - 1;
break;
}
}
}
}
}
catch (e) {
if (window.console)
console.warn("lexicon:", e);
}
try {
EX = growExpand(chunk);
var placed = " " + String(chunk || "").toLowerCase() + " ";
var got = unknownThings(chunk), made = [];
got = got.filter(function (u) {
if (GROW_PLACES.some(function (pl) { return pl[0].test(" " + u.said + " ") || pl[0].test(" " + u.word + " "); }))
return false;
var lk2 = (typeof lexFind === "function") ? (lexFind(u.said) || lexFind(u.word)) : null;
if (lk2 && KIT[lk2]) {
learnWord(lk2, u.said);
if (u.word !== u.said)
learnWord(lk2, u.word);
made.push(u.word);
growNote(u.word, "dictionary", lk2);
dreamUnknown(u.said || u.word, 1);
return false;
}
if (u.being || u.person || u.word.indexOf(" ") > -1)
return true;
var sp = growSplit(u.word);
if (sp && typeof learnWord === "function") {
learnWord(sp.arch, u.said);
if (u.word !== u.said)
learnWord(sp.arch, u.word);
if (sp.colour)
chunk = String(chunk).replace(new RegExp("\\b" + u.said + "\\b", "i"), sp.colour + " " + u.said);
made.push(u.word);
growNote(u.word, "joined", sp.arch);
return false;
}
if (GROW_BIZ.test(u.word) && typeof learnWord === "function" && growHeadArch("shop")) {
learnWord(growHeadArch("shop"), u.said);
made.push(u.word);
growNote(u.word, "business", "shop");
return false;
}
return true;
});
got.forEach(function (u) { var k = growWord(u); if (k) {
made.push(u.word);
if (!u.person)
dreamUnknown(u.said || u.word, 3);
} });
made = lexMade.concat(made);
if (made.length)
setTimeout(function () { if (!walkMode && typeof frameTown === "function" && !(typeof plotOn !== "undefined" && plotOn))
frameTown(); }, 300);
if (made.length && typeof setStatus === "function") {
var say = "<b>Something new:</b> " + made.map(function (w) { return esc(w); }).join(", ") + " — never dreamt here before. It has been built, and the word is learnt.";
setTimeout(function () { setStatus(say); }, 60);
setTimeout(function () { setStatus(say); }, 2600);
}
}
catch (e) {
if (window.console)
console.warn("grow:", e);
}
var n00 = store.objects.length;
var res = st.call(this, chunk);
for (var q0 = n00; q0 < store.objects.length; q0++) {
var o0 = store.objects[q0];
if (!o0.filler && !o0.realm)
o0.instant = true;
}
if (EX && EX.extra) {
try {
var had = {};
store.objects.slice(n00).forEach(function (o) { if (!o.filler)
had[o.archetype] = (had[o.archetype] || 0) + 1; });
EX.extra = EX.extra.split(/\.\s*/).filter(function (it) {
it = it.trim();
if (!it)
return false;
var w = it.replace(/^(a|an|the|some)\s+/, "").replace(/^(red|blue|green|white|black)\s+/, "");
var k = growHeadArch(w) || growHeadArch(growSingular(w));
if (k && had[k] > 0) {
had[k]--;
return false;
}
return true;
}).map(function (it) { return it.trim() + "."; }).join(" ");
var n0 = store.objects.length;
if (EX.extra)
st.call(this, EX.extra);
var tag = (EX.places || []).join(" ");
for (var q = n0; q < store.objects.length; q++) {
var o = store.objects[q];
if (!o.filler) {
o.standIn = tag || "group";
o.instant = true;
}
}
}
catch (e) { }
}
try {
if (/\b(at sea|the sea|the ocean|an ocean|ocean|open water|the waves|high seas|the bay|seas)\b/i.test(String(chunk))) {
var newW = store.objects.slice(n00).filter(function (o) { return o.archetype === "water" && !o.filler; })[0];
if (newW) {
newW.attrs = newW.attrs || {};
newW.attrs.s = Math.max(newW.attrs.s || 1, 7);
newW.sea = true;
var half = 35 * newW.attrs.s, C = (typeof dreamCluster === "function") ? dreamCluster() : null;
var floatRe = /^(ship|boat|fishingboat|soulferry|shipwreck|wreckedship|pirateship|whale|dolphin|shark|kraken|seaserpent|jellyfish|giantclam|mermaid|merman|selkie|kelp|whirlpool|tidalwave|eel|octopus)$/;
var dx = 0, dz = -1;
if (C) {
var ox = newW.x - C.x, oz = newW.z - C.z, L = Math.sqrt(ox * ox + oz * oz);
if (L > 1) {
dx = ox / L;
dz = oz / L;
}
var reach = 0;
store.objects.forEach(function (o) {
if (o.filler || o.hub || o.city || o === newW || (o.realm || 0) !== (store.here || 0) || DREAM_GROUND[o.archetype] || floatRe.test(o.archetype))
return;
var t = (o.x - C.x) * dx + (o.z - C.z) * dz;
if (t > reach)
reach = t;
});
newW.x = C.x + dx * (reach + 30 + half);
newW.z = C.z + dz * (reach + 30 + half);
}
if (typeof refresh === "function")
refresh(newW);
var k = 0;
store.objects.slice(n00).forEach(function (o) {
if (o === newW || o.filler || !floatRe.test(o.archetype))
return;
var along = (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 26, outFar = -half + 45 + (k % 3) * 14;
k++;
o.x = newW.x + dx * outFar - dz * along;
o.z = newW.z + dz * outFar + dx * along;
if (typeof refresh === "function")
refresh(o);
});
if (typeof save === "function")
save();
}
}
}
catch (e) {
if (window.console)
console.warn("sea:", e);
}
try {
if (typeof terrainTick === "function")
terrainTick();
}
catch (e) { }
if (store.objects.length > n00)
setTimeout(function () { try {
dreamFrame();
}
catch (e) { } }, 350);
return res;
};
})();
setInterval(function () { try {
if (typeof terrainTick === "function")
terrainTick();
}
catch (e) { } }, 1500);
(function () {
var tries = 0, t = setInterval(function () {
tries++;
if (typeof loadCustomArchetypes === "function" && typeof signedIn === "function" && signedIn()) {
loadCustomArchetypes();
clearInterval(t);
}
if (tries > 120)
clearInterval(t);
}, 2500);
})();
