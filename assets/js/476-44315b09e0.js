/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SVO = { reg: [], last: "", lastT: 0, fromCard: false, said: null, force: false };
function svoOn() { var c = typeof cfg === "function" ? cfg() : {}; return c.storyVoice !== false && typeof speechSynthesis !== "undefined" && typeof SpeechSynthesisUtterance !== "undefined"; }
function svoStory() {
try {
if (typeof WLD !== "undefined" && WLD && WLD.on)
return true;
}
catch (e) { }
try {
if (typeof SHKS !== "undefined" && SHKS && SHKS.on)
return true;
}
catch (e) { }
return false;
}
function svoWorld() { try {
return String((typeof WLD !== "undefined" && WLD && WLD.on) || ((typeof SHKS !== "undefined" && SHKS && SHKS.on) ? "bard" : ""));
}
catch (e) {
return "";
} }
function svoHash(s) { return typeof fvoHash === "function" ? fvoHash(s) : 0; }
var SVO_LOC = {
oz: ["en-US"], kidszone: ["en-US"], race: ["en-US"], casino: ["en-US"], party: ["en-US"],
bard: ["en-GB"], neverland: ["en-GB"], grimm: ["en-GB"], erebos: ["en-GB"], verne: ["en-GB"], poe: ["en-US"], davinci: ["en-GB"], maze: ["en-GB"],
guildlands: ["en-GB"], ctale: ["en-GB"], greenwold: ["en-GB"], northpole: ["en-GB", "en-US"], underdark: ["en-GB"],
samhain: ["en-IE", "en-GB"], battle: ["en-GB"], lounge: ["en-US"], family: ["en-US"], stillwater: ["en-US"],
sea: ["en-GB", "en-IE", "en-AU", "en-GB-SCOTLAND"],
space: ["en-US", "en-GB", "en-AU", "en-IN"], station: ["en-US", "en-GB", "en-AU", "en-IN"], surface: ["en-US", "en-GB", "en-AU"], shuttle: ["en-US", "en-GB"]
};
var SVO_MIX = { sea: 1, space: 1, station: 1, surface: 1, shuttle: 1 };
var SVO_PEOPLE = [
[/\b(malone|o'|mc[a-z]|maguire|murphy|flanagan|sullivan|kelly|brigid|seamus|paddy|kathleen|bridget|molly malone)/i, ["en-IE", "en-GB"]],
[/\b(mac[a-z]{3,}|campbell|mackenzie|macgregor|fraser|robertson|lachlan|hamish|angus|morag|ailsa|alan breck|stevenson)\b/i, ["en-GB-SCOTLAND", "en-GB"]],
[/\b(nemo|dakkar|aouda|gunga|sikh|maharaja|rajah|ranee|kalpana)\b/i, ["en-IN", "en-GB"]],
[/\b(barbicane|maston|nicholl|cyrus smith|pencroft|neb\b|harbert|spilett|ned land|dorothy|aunt em|uncle henry|huck|tom sawyer|yankee|cowboy|sheriff|american|poe\b|dupin)/i, ["en-US"]],
[/\b(passepartout|aronnax|conseil|ardan|michel|monsieur|madame|mademoiselle|french|captain hatteras|lidenbrock|axel|hans)\b/i, ["en-GB", "en-US"]],
[/\b(crocodile dundee|swagman|digger|aussie|australian)\b/i, ["en-AU"]],
[/\b(maori|kiwi)\b/i, ["en-NZ", "en-AU"]]
];
var SVO_F = /\b(mrs|mme|mlle|madam|signorina|senhora|dona|doña|miss|ms|lady|queen|princess|duchess|countess|baroness|empress|witch|sorceress|enchantress|goddess|giantess|girl|lass|woman|women|wife|widow|mother|mum|mama|mamma|ma|aunt|auntie|grandmother|grandma|granny|gran|nan|nanny|sister|nun|abbess|maid|maiden|milkmaid|daughter|bride|nurse|matron|governess|landlady|hostess|actress|seamstress|dame|madame|mademoiselle|signora|senora|frau|fraulein|fräulein|mistress|she|her|heroine|mermaid|nymph|naiad|dryad|siren|sirens|harpy|fury|furies|muse|fairy|tinker bell|good witch|hag|crone|matriarch|squaw|ballerina|wench|goody|mother goose|stepmother|stepsister|godmother|fishwife|laundress)\b/i;
var SVO_M = /\b(mr|mister|sir|lord|king|prince|duke|earl|count|baron|emperor|tsar|sultan|pharaoh|wizard|sorcerer|god|giant|ogre|troll|boy|lad|man|men|husband|widower|father|papa|pa|uncle|grandfather|grandpa|grandad|brother|monk|friar|abbot|priest|vicar|parson|bishop|son|groom|master|herr|monsieur|signor|senor|captain|capt|colonel|general|admiral|major|sergeant|corporal|private|constable|inspector|detective|doctor|dr|professor|prof|bosun|boatswain|quartermaster|first mate|helmsman|landlord|innkeeper|woodcutter|woodsman|woodman|miller|huntsman|hunter|fisherman|ferryman|boatman|waterman|watchman|policeman|postman|cabman|cabby|coachman|footman|butler|valet|blacksmith|smith|cobbler|tailor|shoemaker|baker|butcher|scarecrow|tin woodman|tik-tok|lion|wolf|knight|squire|page|jester|fool|hermit|beggar|tramp|pirate king|cyclops|minotaur|centaur|satyr|faun|he|him|his|chap|fellow|gentleman|gent|bloke|old salt|cabin boy|mister smee|smee|hook|bill|jack|jim|tom|mate)\b/i;
var SVO_MA = /^(agrippa|seneca|cinna|casca|caligula|galba|sulla|numa|attila|joshua|jonah|luca|andrea|nikola|elisha|ezra|judah|noah|micah|garcia|costa|da|la|nemo|hamlet|banquo|kaspar|ajax|aeneas|tobias|zacharias|jeremiah|isaiah|elijah|josiah|obadiah|hezekiah|zebedee|dakkar|krishna|rama|shiva|vishnu|brahma|buddha|kama|yama|aranda|ahura|mazda|matthias|pilate|ezekiel|barnaby|toby|sancho|dracula|cerberus|hydra|pizarro|piranha|orca|puma|cobra|panda|gorilla|mantra|indra|bhima|arjuna|garuda|varuna|surya|chandra|ravana|ishmaela)$/i;
var SVO_FN = /^(dorothy|em|ozma|glinda|betsy|trot|polychrome|jinjur|langwidere|billina|scraps|dorothea|gretel|rapunzel|rosamond|briar|snowdrop|snow|cinderella|ashputtel|elsa|lena|wendy|tinker|tiger|liza|mary|jane|elizabeth|beth|bess|bessie|anne|ann|anna|agnes|alice|amelia|clara|ellen|eleanor|emma|emily|esther|florence|grace|harriet|helen|isabella|julia|juliet|katharine|katherine|kate|lucy|margaret|maggie|marian|martha|matilda|nancy|nell|olivia|ophelia|portia|rosalind|rose|ruth|sarah|susan|viola|violet|hermia|helena|titania|hippolyta|desdemona|cordelia|regan|goneril|miranda|perdita|imogen|beatrice|hero|celia|audrey|phebe|jessica|nerissa|cleopatra|calpurnia|gertrude|aouda|persephone|eurydice|penelope|helen|circe|calypso|nausicaa|athena|hera|demeter|hecate|medusa|ariadne|antigone|electra|cassandra|andromache|hecuba|clytemnestra|iphigenia|psyche|europa|io|alcestis|dido|anticleia|laodamia|proserpina|lachesis|clotho|atropos|ilsebill|aschenputtel|maimie|gladys|angela|susanna|sibyl|hermione|isis|hestia|niobe|leda|danae|thetis|pandora|phaedra|medea|antiope|semele|alcmene|andromeda|daphne|echo|arachne|galatea|philomela|procne|ceres|juno|minerva|diana|venus|vesta|flora|aurora|iris|nike|gaia|rhea|themis|mnemosyne|calliope|clio|erato|euterpe|melpomene|polyhymnia|terpsichore|thalia|urania|beatrice|francesca|pia|matilda|lucia|rachel|leah|eve|hannah|judith|josephine|marie|madeleine|isabelle|sophie|charlotte|caroline|georgiana|lydia|kitty|elinor|marianne|fanny|catherine|jo|meg|amy|heidi|pollyanna|anne|gwendolen|cecily|lady|molly|kathleen|bridget|morag|ailsa|maisie|bonny|polly|sally|jenny|lizzie|betty|peggy|dolly|nora|ada|cora|edith|edie|ethel|mabel|maud|minnie|hattie|elsie|fiona|gwen|guinevere|morgan|nimue|vivien|elaine|enid|isolde|iseult|marguerite|irene|mina|lucy|carmilla|ligeia|morella|berenice|madeline|annabel|lenore|eleonora|una|rowena|rebecca|ulrica|dolores|ida|clementine|annie|lottie|nettie|rosie|daisy|lily|iris|hazel|ivy|pearl|ruby|opal|stella|luna|vera|thea|freya|frigg|astrid|ingrid|sigrid|helga|olga|anastasia|natasha|tatiana|sonia|nadia|mei|ling|keiko|yuki|priya|sita|lakshmi|parvati|amira|fatima|zara|leila|layla|ayesha|esi|ama|abena)$/i;
var SVO_KID = /\b(little|boy|girl|child|children|kid|lad|lass|baby|babe|infant|tot|youngster|urchin|orphan|schoolboy|schoolgirl|page boy|cabin boy|lost boys?|twins?|hansel|gretel|tootles|nibs|slightly|curly|wendy|john darling|michael darling|michael|peter pan|peter|dorothy|betsy|trot|ojo|button-bright|tip|woot|jim hawkins|alice|heidi|pollyanna|oliver twist|pip|david copperfield|tom sawyer|huck|princess ozma|ozma|red cap|little red|tom thumb|thumbling|jack)\b/i;
var SVO_OLD = /\b(old|aged|ancient|elder|elderly|grey|gray|grandmother|grandfather|grandma|grandpa|granny|gran|grandad|nan|widow|widower|gaffer|goody|crone|hag|hermit|sage|abbot|abbess|patriarch|matriarch|father time|charon|nestor|tiresias|teiresias|dorothea viehmann|frau viehmann|aunt em|uncle henry|old man|old woman|great-aunt|great-uncle)\b/i;
var SVO_KIND = [
["giant", /\b(giant|giantess|ogre|troll|cyclops|polyphemus|titan|colossus|goliath|behemoth|nome king|roquat|ruggedo)\b/i, 0.56, 0.8],
["machine", /\b(tik-tok|tiktok|robot|machine|automaton|computer|android|droid|ship's mind|ai core|the voice of the ship|clockwork|mechanical)\b/i, 0.74, 0.86],
["ghost", /\b(ghost|shade|shades|spirit|phantom|spectre|specter|wraith|the dead|dead man|banshee|apparition|soul of|haunt)\b/i, 0.76, 0.8],
["beast", /\b(lion|bear|dragon|wolf|tiger|wyrm|kraken|leviathan|minotaur|cerberus|hydra|beast|monster|hound|mr hyde|hyde|gorilla|ape|sabre|sphinx|griffin|gryphon|bull|boar|crocodile|shark|whale)\b/i, 0.66, 0.88],
["small", /\b(mouse|mice|frog|toad|rabbit|hare|squirrel|bird|canary|sparrow|robin|wren|owl|crow|raven|magpie|parrot|hen|chicken|billina|duck|goose|cat|kitten|puppy|monkey|munchkin|elf|elves|pixie|brownie|sprite|fairy|tinker bell|imp|gnome|dwarf|hobgoblin|goblin|cricket|bee|butterfly|fish|flounder|ant|piglet|lamb|fox|toto)\b/i, 1.38, 1.1],
["witch", /\b(witch|hag|crone|sorceress|enchantress|mombi|baba yaga)\b/i, 1.0, 0.92],
["royal", /\b(king|queen|emperor|empress|prince|princess|duke|duchess|lord|lady|pharaoh|sultan|tsar|ozma|glinda|wizard)\b/i, 0.95, 0.9],
["gruff", /\b(pirate|buccaneer|bosun|boatswain|quartermaster|old salt|sailor|seaman|deckhand|captain hook|hook|long john|silver|black dog|blind pew|pew|billy bones|israel hands|smee|starkey|cecco|mullins|soldier|sergeant|guard|jailer|gaoler|executioner|brigand|robber|bandit|thug|ruffian|smuggler|wrecker|woodcutter|blacksmith|butcher|ferryman|bargeman)\b/i, 0.86, 0.94],
["gentle", /\b(nurse|mother|nanny|governess|angel|saint|nun|good witch|fairy godmother|healer|doctor)\b/i, 1.0, 0.92]
];
var SVO_WHO = {
"toto": { k: "small" }, "the cowardly lion": { sx: "m", k: "beast", p: 0.7 }, "the hungry tiger": { sx: "m", k: "beast" }, "the scarecrow": { sx: "m", p: 1.04, r: 1.04 },
"the tin woodman": { sx: "m", p: 0.92 }, "the tin owl": { sx: "m", k: "small" }, "the green monkey": { sx: "m", k: "small", kid: 1 }, "jack pumpkinhead": { sx: "m", p: 1.06 },
"the sawhorse": { sx: "m", k: "beast", p: 0.9 }, "the woggle-bug": { sx: "m", p: 1.1 }, "h. m. woggle-bug": { sx: "m", p: 1.1 }, "the patchwork girl": { sx: "f", kid: 1 },
"scraps": { sx: "f", kid: 1 }, "the shaggy man": { sx: "m" }, "cap'n bill": { sx: "m", old: 1, k: "gruff" }, "the wizard": { sx: "m", old: 1 }, "the wizard of oz": { sx: "m", old: 1 },
"nana": { k: "beast", p: 0.9 }, "captain hook": { sx: "m", k: "gruff", p: 0.84 }, "mr. darling": { sx: "m" }, "mrs. darling": { sx: "f" },
"peter pan": { sx: "m", kid: 1 }, "peter": { sx: "m", kid: 1 }, "tiger lily": { sx: "f", kid: 1 }, "tinker bell": { sx: "f", k: "small" }, "the crocodile": { k: "beast" },
"long john silver": { sx: "m", k: "gruff" }, "jim hawkins": { sx: "m", kid: 1 }, "squire trelawney": { sx: "m" }, "dr. livesey": { sx: "m" }, "ben gunn": { sx: "m", old: 1, p: 1.05, r: 1.08 },
"captain nemo": { sx: "m", loc: ["en-IN", "en-GB"] }, "phileas fogg": { sx: "m", r: 0.9 }, "passepartout": { sx: "m", r: 1.06 }, "aouda": { sx: "f", loc: ["en-IN", "en-GB"] },
"professor challenger": { sx: "m", p: 0.84 }, "edward malone": { sx: "m", loc: ["en-IE", "en-GB"] }, "malone": { sx: "m", loc: ["en-IE", "en-GB"] },
"lord john roxton": { sx: "m" }, "professor summerlee": { sx: "m", old: 1 }, "sherlock holmes": { sx: "m", r: 1.04 }, "dr. watson": { sx: "m" }, "mrs. hudson": { sx: "f", old: 1 },
"dr. jekyll": { sx: "m" }, "mr. hyde": { sx: "m", k: "beast", p: 0.7 }, "the hound": { k: "beast" },
"william shakespeare": { sx: "m" }, "will shakespeare": { sx: "m" }, "queen elizabeth": { sx: "f", k: "royal" }, "the queen": { sx: "f", k: "royal" },
"dorothea viehmann": { sx: "f", old: 1 }, "little red-cap": { sx: "f", kid: 1 }, "little red cap": { sx: "f", kid: 1 }, "little red riding hood": { sx: "f", kid: 1 }, "snow-white": { sx: "f", kid: 1 }, "snow white": { sx: "f", kid: 1 }, "frau viehmann": { sx: "f", old: 1 }, "the wolf": { sx: "m", k: "beast" }, "the big bad wolf": { sx: "m", k: "beast" },
"the witch": { sx: "f", k: "witch", old: 1 }, "the frog prince": { sx: "m", k: "small", p: 1.15 }, "rumpelstiltskin": { sx: "m", k: "small", p: 1.25 },
"charon": { sx: "m", k: "ghost", old: 1 }, "cerberus": { k: "beast", p: 0.5 }, "orpheus": { sx: "m" }, "eurydice": { sx: "f", k: "ghost" }, "dante": { sx: "m" }, "virgil": { sx: "m", old: 1 },
"mombi": { sx: "f", k: "witch", old: 1 }, "general jinjur": { sx: "f" }, "jinjur": { sx: "f" }, "margolotte": { sx: "f" }, "quelala": { sx: "m" }, "nimmie amee": { sx: "f" },
"cayke the cookie cook": { sx: "f", old: 1 }, "cayke": { sx: "f", old: 1 }, "the frogman": { sx: "m" }, "starkey": { sx: "m", k: "gruff" }, "cecco": { sx: "m", k: "gruff" },
"falada": { sx: "m", k: "beast" }, "alecto": { sx: "f" }, "tisiphone": { sx: "f" }, "megaera": { sx: "f" }, "nyx": { sx: "f" }, "the red queen": { sx: "f", k: "royal" },
"the hatter": { sx: "m" }, "the mad hatter": { sx: "m" }, "the dormouse": { sx: "m", k: "small" }, "the mock turtle": { sx: "m" }, "the raven": { sx: "m" },
"fleur-de-lys": { sx: "f" }, "djali": { sx: "f", k: "small" }, "graüben": { sx: "f" }, "grauben": { sx: "f" }, "beryl stapleton": { sx: "f" }, "mbonga": { sx: "m" },
"billy bones": { sx: "m", k: "gruff" }, "black dog": { sx: "m", k: "gruff" }, "blind pew": { sx: "m", k: "gruff" }, "pew": { sx: "m", k: "gruff" }, "marmee": { sx: "f" },
"amytis": { sx: "f", k: "royal" }, "ishtar": { sx: "f" }, "shamhat": { sx: "f" }, "siduri": { sx: "f" }, "glumdalclitch": { sx: "f", kid: 1 }, "scheherazade": { sx: "f" },
"the genie": { sx: "m", k: "giant" },
"odysseus": { sx: "m" }, "ulysses": { sx: "m" }, "tiresias": { sx: "m", old: 1, k: "ghost" }, "aeneas": { sx: "m" }, "the sibyl": { sx: "f", old: 1 }
};
var SVO_NOTWHO = /\b(chapter|book|tale|part|map|letter|note|sign|notice|playbill|bill of|ticket|backpack|hidden find|find|keepsake|treasure|reward|the end|done|well done|not yet|you|your|step|quest|tip|hint|how to|help|keeper|settings|gold|price|shop|store|menu|journal|record|log|orders|articles|chart|bank|market|port|fort|law|pardon|hold|fight|battles|ships|lessons?|school|exam|score|results?|round|race|timer|clock|time|weather|the way|door|doors|gate|room|hall|street|road|square|house|inn|shop)\b/i;
function svoName(t) { return __ZC(476, 0, this, arguments, new.target); }
var SVO_NOTNAME = /^(i|he|she|they|we|you|it|one|nobody|nothing|everyone|everybody|someone|somebody|all|both|er|um|come|good|question|found|ruined|gibberish|comrades|then|but|and|so|now|yes|no|oh|ah|well|this|that|there|here|what|who|why|how|when|where|if|as|yet|still|his|her|their|its|my|our|your|dinner|supper|breakfast|tea|chapter|part|book)\b/i;
function svoTidy(n) { return __ZC(476, 1, this, arguments, new.target); }
function svoNameLike(n) { return __ZC(476, 2, this, arguments, new.target); }
function svoPerson(n) { return __ZC(476, 3, this, arguments, new.target); }
function SvoKnownT(n) { this.n = n; this.full = new Map(); this.first = new Map(); }
var SVO_KNOWN = new SvoKnownT(-1);
function svoKey(n) { return svoName(n).toLowerCase().replace(/[.’']/g, "").replace(/\s+/g, " ").trim(); }
function svoKnownAdd(K, name, sx, kid) { return __ZC(476, 4, this, arguments, new.target); }
function svoKnown() { return __ZC(476, 5, this, arguments, new.target); }
function svoKnownOf(n) { return __ZC(476, 6, this, arguments, new.target); }
var SVO_FS = /\b(mrs|mme|mlle|miss|ms|lady|queen|princess|duchess|countess|empress|goddess|girl|lass|woman|women|wife|widow|mother|aunt|grandmother|sister|nun|abbess|maid|maiden|daughter|bride|actress|seamstress|landlady|hostess|waitress|stewardess|priestess|sorceress|witch|she|her|ballerina)\b/i;
var SVO_MS = /\b(mr|mister|sir|lord|king|prince|duke|earl|count|baron|emperor|boy|lad|man|men|husband|widower|father|uncle|grandfather|brother|monk|friar|son|groom|he|him|his|gentleman|fellow|chap|landlord|monsieur|herr|signor|senor)\b/i;
function svoRole(n) { return __ZC(476, 7, this, arguments, new.target); }
function svoWho(name, body, about) { return __ZC(476, 8, this, arguments, new.target); }
(function () {
if (typeof wPerson !== "function")
return;
var wp = wPerson;
wPerson = function (seed, o) {
var g = wp.apply(this, arguments);
try {
o = o || {};
var sx = o.sex || (o.look && o.look.sex) || "";
if (!sx && typeof randomLook === "function") {
var L = randomLook("w_" + seed, o.child ? "child" : "human");
sx = L && L.sex || "";
}
g.userData.svo = { sx: sx, kid: !!o.child || (o.look && o.look.age === "child") };
g.userData.svoArgs = { seed: seed, o: o, kids: g.children.slice(), wp: wp };
svoRemember(g);
}
catch (e) { }
return g;
};
})();
function svoRemember(g) {
try {
SVO.reg.push(typeof WeakRef === "function" ? new WeakRef(g) : g);
if (SVO.reg.length > 3000)
svoPrune();
}
catch (e) { }
}
function svoPrune() {
SVO.reg = SVO.reg.filter(function (r) { var g = r && r.deref ? r.deref() : r; return g && g.parent; });
if (SVO.reg.length > 3000)
SVO.reg = SVO.reg.slice(-2000);
}
function svoNearBody() { return __ZC(476, 9, this, arguments, new.target); }
function svoVS(v) { return typeof dvoVoiceSex === "function" ? dvoVoiceSex(v) : (typeof fvoVoiceSex === "function" ? fvoVoiceSex(v) : ""); }
function svoLang(v) { return String(v && v.lang || "").replace("_", "-").toLowerCase(); }
var SVO_CHILDV = /\b(ana|maisie|child|kid|junior|boy|girl)\b/i;
function svoPick(P, V) { return __ZC(476, 10, this, arguments, new.target); }
var SVO_SYS = /rate[ _-]?limit|\borg(?:ani[sz]ation)?[_ `'"]|tokens? per (?:minute|day)|\b(?:TPD|TPM|RPM|RPD)\b|service[ _]tier|on_demand|api[ _-]?key|\bgroq\b|supabase|\bjwt\b|https?:\/\/|[{}`]|too many (?:requests|tries)|try again in \d|failed to fetch|networkerror|load failed|\b(?:error|status|server|request)\b[^.]{0,40}\b[45]\d\d\b|\b[45]\d\d\s*[{"(]|\bthe (?:city's )?AI\b|\bdream-parse\b/i;
function svoSys(t) { return SVO_SYS.test(String(t || "")); }
function svoSay(L, done, src) { return __ZC(476, 11, this, arguments, new.target); }
function svoSpeakAs(name, text, o, done) {
var P = svoWho(name, svoNearBody());
o = o || {};
["sx", "kind", "loc", "p", "r"].forEach(function (k) { if (o[k])
P[k] = o[k]; });
if (o.kid)
P.kid = true;
if (o.old)
P.old = true;
SVO.last = "";
svoSay([{ who: P, text: text }], done, "code");
}
function svoOwn(V, pk) { var own = V.filter(function (v) { return v.localService && v !== pk.voice; }), same = own.filter(function (v) { return svoVS(v) === pk.sx; }); var L = same.length ? same : own; return L.length ? L[0] : null; }
function svoHush() { SVO.run = (SVO.run || 0) + 1; try {
if (typeof speechSynthesis !== "undefined")
speechSynthesis.cancel();
}
catch (e) { } }
var SVO_VERB = "says|said|asks|asked|cries|cried|calls|called|answers|answered|replies|replied|whispers|whispered|shouts|shouted|sings|sang|roars|roared|growls|growled|laughs|laughed|mutters|muttered|murmurs|murmured|tells you|told you|begins|began|adds|added|goes on|went on|booms|boomed|hisses|hissed|snaps|snapped|squeaks|squeaked|sighs|sighed|declares|declared|exclaims|exclaimed|pleads|pleaded|warns|warned|bellows|bellowed|recites|recited|reads|read";
var SVO_BEFORE = new RegExp("((?:the |a |old |young |little )?(?:[A-Z][\\w'’.\\-]*)(?:\\s+(?:of|the|de|von|van|[A-Z][\\w'’.\\-]*)){0,4})\\s*(?:,[^,\"“]{0,30},\\s*)?(?:" + SVO_VERB + ")(?:\\s+(?:softly|quietly|loudly|gently|sharply|slowly|at last|to you|to him|to her|again|then))*\\s*[:,.]?\\s*$");
var SVO_AFTER = new RegExp("^\\s*[,.!?]?\\s*(?:" + SVO_VERB + ")\\s+((?:the |a |old |young |little )?(?:[A-Z][\\w'’.\\-]*)(?:\\s+(?:of|the|de|von|van|[A-Z][\\w'’.\\-]*)){0,4})");
var SVO_AFTER2 = new RegExp("^\\s*[,.!?]?\\s*((?:the |a |old |young |little )?(?:[A-Z][\\w'’.\\-]*)(?:\\s+(?:of|the|de|von|van|[A-Z][\\w'’.\\-]*)){0,4})\\s+(?:" + SVO_VERB + ")\\b");
var SVO_COLON = new RegExp("(?:^|[.!?]\\s+)((?:the |old |young |little )?[A-Z][\\w'’\\-]*\\.?(?:\\s+(?:of|the|de|von|van|[A-Z][\\w'’\\-]*\\.?)){0,4})\\s+[a-z][^.!?:\"“]{0,70}:\\s*$");
var SVO_PRON = new RegExp("\\b(she|he)\\s+(?:" + SVO_VERB + ")\\s*[:,.]?\\s*$", "i");
function svoTextOf(html) { return __ZC(476, 12, this, arguments, new.target); }
function svoQuotes(text, dflt, body) { return __ZC(476, 13, this, arguments, new.target); }
function svoPromptWho(body) { return __ZC(476, 14, this, arguments, new.target); }
(function () {
if (typeof worldPrompt !== "function")
return;
var wp = worldPrompt;
worldPrompt = function (html) { try {
if (html)
SVO.prompt = { t: svoTextOf(html), at: Date.now() };
}
catch (e) { } return wp.apply(this, arguments); };
})();
function svoDefault(body) {
var P = svoPromptWho(body);
if (P)
return P;
return body ? svoWho("the one beside you " + svoHash(String(body.sx) + (body.kid ? "k" : "")), body) : null;
}
function svoCard(html) { return __ZC(476, 15, this, arguments, new.target); }
function svoLine(h) {
if (!svoStory() || !svoOn() || !h)
return;
var text = svoTextOf(h);
if (!text || text.length < 4 || svoSys(text))
return;
var body = svoNearBody(), L = [];
var mm = text.match(/^\s*([^:"“]{2,48}):\s+(.+)$/);
if (mm && svoNameLike(mm[1])) {
var P = svoWho(mm[1], body), rest = mm[2], Q = svoQuotes(rest, P, body);
L = Q.length ? Q : [{ who: P, text: rest.split(/\s(?=📖|Next,|Chapter \d)/)[0] }];
}
else {
var lead = text.match(/^\s*([^"“:]{2,40})\s*["“]/), dflt = lead && svoNameLike(lead[1]) ? svoWho(lead[1], body) : svoDefault(body);
L = svoQuotes(text, dflt, body);
}
if (!L.length)
return;
var key = L.map(function (x) { return x.text; }).join("|");
if (key === SVO.last && Date.now() - SVO.lastT < 4000)
return;
if (SVO.fromCard && Date.now() - SVO.lastT < 1500)
return;
SVO.last = key;
SVO.lastT = Date.now();
svoSay(L, null, "line");
}
(function () {
if (typeof worldCard === "function") {
var wc = worldCard;
worldCard = function (html, fns) {
var r = wc.apply(this, arguments);
try {
if (html)
svoCard(html);
}
catch (e) { }
return r;
};
}
if (typeof setStatus === "function") {
var ss = setStatus;
setStatus = function (h) { var r = ss.apply(this, arguments); try {
svoLine(h);
}
catch (e) { } return r; };
}
})();
(function () {
if (typeof fvoSpeak !== "function")
return;
var fs = fvoSpeak;
fvoSpeak = function (c, text, done) {
try {
if (svoStory() && !(typeof okyGod === "function" && okyGod(c))) {
if (!svoOn()) {
if (done)
done();
return;
}
var body = null;
if (c && (c.ftkSex === "f" || c.ftkSex === "m"))
body = { sx: c.ftkSex, kid: c.ftkAge && c.ftkAge < 13 };
var about = c && c.details && c.details[0] || c && c.persona || "";
var P = svoWho(c && c.name || "someone", body || svoNearBody(), about);
if (c && c.ftkAge) {
if (c.ftkAge < 13)
P.kid = true;
else if (c.ftkAge >= 62)
P.old = true;
}
SVO.last = "";
svoSay([{ who: P, text: text }], done, "talk");
return;
}
}
catch (e) { }
return fs.apply(this, arguments);
};
if (typeof fvoOn === "function") {
var fo = fvoOn;
fvoOn = function () { if (svoStory())
return svoOn(); return fo.apply(this, arguments); };
}
if (typeof fvoHush === "function") {
var fh = fvoHush;
fvoHush = function () { SVO.run = (SVO.run || 0) + 1; return fh.apply(this, arguments); };
}
})();
(function () {
if (typeof cfkSndPaint !== "function")
return;
var cp = cfkSndPaint;
cfkSndPaint = function () {
var r = cp.apply(this, arguments);
try {
var b = document.getElementById("cfk-snd");
if (!b)
return r;
if (svoStory()) {
var on = svoOn();
b.textContent = on ? "🔊" : "🔇";
b.title = on ? "Voices on: tap to mute" : "Voices off: tap to hear them";
b.setAttribute("aria-label", b.title);
b.style.display = typeof speechSynthesis !== "undefined" && typeof talkWith !== "undefined" && talkWith ? "" : "none";
if (!b.dataset.svo) {
b.dataset.svo = "1";
var oc = b.onclick;
b.onclick = function (ev) { if (!svoStory())
return oc && oc.call(this, ev); ev.stopPropagation(); var c = cfg(); c.storyVoice = c.storyVoice === false; setCfg(c); if (c.storyVoice === false)
svoHush(); cfkSndPaint(); var cb = document.getElementById("svo-set-on"); if (cb)
cb.checked = c.storyVoice !== false; };
}
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof openPanel !== "function")
return;
var op = openPanel;
openPanel = function () {
var r = op.apply(this, arguments);
try {
var cb = document.getElementById("svo-set-on");
if (cb) {
cb.checked = svoOn();
return r;
}
var anchor = document.getElementById("fvo-set") || document.getElementById("oky-set") || document.getElementById("advanced");
if (!anchor || !anchor.parentNode)
return r;
var d = document.createElement("label");
d.id = "svo-set";
d.style.cssText = "display:flex;gap:8px;align-items:center;cursor:pointer;margin:12px 0 0";
d.innerHTML = "<input type='checkbox' id='svo-set-on'> Story characters speak out loud";
anchor.parentNode.insertBefore(d, anchor.nextSibling);
cb = document.getElementById("svo-set-on");
cb.checked = svoOn();
cb.onchange = function () { var c = cfg(); c.storyVoice = cb.checked; setCfg(c); if (!cb.checked)
svoHush(); };
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof worldOff !== "function")
return;
var wl = worldOff;
worldOff = function () { try {
if (SVO.fromCard || SVO.said)
svoHush();
}
catch (e) { } return wl.apply(this, arguments); };
})();
(function () {
if (typeof makeTag !== "function")
return;
var mt = makeTag;
makeTag = function (text) { var sp = mt.apply(this, arguments); try {
sp.userData.tagText = String(text || "");
}
catch (e) { } return sp; };
})();
var SVO_MN = /^(oswin|ferrin|gethin|alban|corbin|jory|tobias|silas|ambrose|hal|edric|lucan|bram|ivo|rafe|dunstan|piers|casimir|matthias|anselm|augustus|john|james|william|george|thomas|henry|charles|edward|robert|richard|arthur|albert|frederick|walter|harold|samuel|joseph|peter|paul|david|michael|daniel|jack|harry|tom|bill|fred|ned|sam|ben|jim|joe|hugh|giles|jasper|felix|leo|max|otto|victor|oliver|simon|stephen|francis|lewis|martin|philip|ralph|roger|rupert|sebastian|theo|tristan|vincent|wilfred|abel|amos|caleb|ezra|gideon|jonah|lucas|marcus|miles|nathan|owen|reuben|seth|uriah)$/i;
function svoNameSex(nm) { return __ZC(476, 16, this, arguments, new.target); }
function svoReBody(g, want) { return __ZC(476, 17, this, arguments, new.target); }
function svoTagSweep() { return __ZC(476, 18, this, arguments, new.target); }
setInterval(function () { try {
svoTagSweep();
}
catch (e) { } }, 2000);
