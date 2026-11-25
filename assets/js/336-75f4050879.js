/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RA = { list: {}, order: [], rows: {}, rowsOk: false, rowsAt: -99, missing: false, place: null, spots: {}, marks: {}, shows: {}, t: 0, mine: [], mineAt: -99, busy: false,
rise: null, hold: null, klist: null, kgo: null, kmove: null, heardAt: 0 };
function raOn() { return typeof mmWhere === "function" && typeof mmMat === "function"; }
function raRpc(n, a) { try {
return typeof mmRpc === "function" ? mmRpc(n, a) : Promise.reject(new Error("offline"));
}
catch (e) {
return Promise.reject(e);
} }
function raSay(h) { if (typeof mmSay === "function")
mmSay(h); }
function raEsc(s) { return typeof mmEsc === "function" ? mmEsc(s) : String(s); }
function raKeeper() { return typeof mmKeeper === "function" && mmKeeper(); }
function raSigned() { return typeof mmSigned === "function" && mmSigned(); }
function raLS(k) { try {
return JSON.parse(localStorage.getItem(k) || "{}") || {};
}
catch (e) {
return {};
} }
function raLSput(k, v) { try {
localStorage.setItem(k, JSON.stringify(v));
}
catch (e) { } }
var RA_DEF = [
{ k: "orrery", name: "The Orrery of Nine Hours", icon: "🪐", at: "city", seed: [700, -640], spot: "slab", mark: 0x8A8478,
what: "a paving slab that rocks underfoot", look: "This one slab rocks when you step on it, and the grit round its edges has been scraped clean by a fingernail.", act: "Lift the slab",
open: "Under the slab, wrapped in oilcloth, something small and brass is ticking.",
tale: "A brass model of a sky that never was: one sun, nine small worlds on their own rings, all turning to a clock with nine hours in its day. Its maker swore that one day the real sky would agree with it.",
rumour: "A clockmaker's apprentice says her master buried his finest work under the pavement of Somnucor, \"where the slabs don't sit flat\"." },
{ k: "bell", name: "The Silent Bell of Somnucor", icon: "🔔", at: "gr_void", seed: [500, 0], spot: "stone", mark: 0x5A5650,
what: "a stone with a groove worn round it", look: "Round this stone runs a groove, worn smooth, as though a rope was tied about it for many years.", act: "Roll the stone aside",
open: "In the hollow under the stone lies a small bronze bell. You shake it. It makes no sound at all.",
tale: "The bell from the city's first tower. On the night the city was founded it was rung once, and the sound went out and never came back. It has been silent since. Some say it is still ringing, somewhere else.",
rumour: "The lamp-keepers of Stillspire say the bell that rang once and never again drifted here, where nothing makes a sound: \"under a roped stone, out on the Shardfields\"." },
{ k: "quill", name: "The Quill of the Last Letter", icon: "🪶", at: "lounge", seed: [156, 216], spot: "stump", mark: 0x5A4632,
what: "a stump with a split in it", look: "There is a narrow split down the middle of this old stump, and something pale is wedged deep inside.", act: "Work it out of the split",
open: "Out of the split comes a long white quill, its nib still dark with ink that has never dried.",
tale: "A white quill whose ink never dries. It wrote one letter, the last letter of a long correspondence, and the letter was never sent. Whoever holds it is said to always find the right words, once.",
rumour: "At GiGi's Lounge they say a guest who never checked out left a quill that wrote a letter nobody posted, \"pushed into a split stump, well away from the music\"." },
{ k: "compass", name: "The Compass of Forgotten Things", icon: "🧭", at: "gr_elsewhere", seed: [420, -170], spot: "stone", mark: 0x6A6A62,
what: "a mossy stone with a scratched arrow", look: "Someone has scratched a small arrow into this mossy stone. It points straight down.", act: "Dig where the arrow points",
open: "A hand's depth down you find a little compass. Its needle does not point north. It swings, slowly, toward something you had forgotten.",
tale: "A child's brass compass whose needle never points north. It points to whatever you have forgotten: a promise, a name, the way home. The children who found it first used it to remember their mothers.",
rumour: "Ondren children say a compass that points to forgotten things fell through from another world, \"under a mossy stone with an arrow scratched on it, out past the spiral gardens\"." },
{ k: "thimble", name: "The Thimble of Small Brave Things", icon: "🪡", at: "family", seed: [-64, -7], spot: "slab", tex: "", mark: 0x5A3A22,
what: "a floorboard with a tiny door painted on it", look: "One floorboard here is a shade darker than the rest, and someone has painted a door no bigger than your thumb on it, green, very nearly worn away.", act: "Lift the floorboard",
open: "Under the board, on a scrap of old lace, sits a silver thimble with a crown of points round its rim.",
tale: "A silver thimble crowned with seven little points. It was given as a kiss by someone who didn't know what a kiss was, and it has made its keepers brave in small ways ever since: the first word, the first step, the first time back.",
rumour: "The planners at the Everbloom Wedding House tell of a thimble given as a kiss and lost. \"It's under a floorboard with a door the size of your thumb painted on it,\" they say, and won't say which room." },
{ k: "heart", name: "The Mariner's Glass Heart", icon: "💙", at: "sea", isle: "aeaea", seed: [-120, -60], dry: 1.5, spot: "stone", mark: 0x8A8070,
what: "a sea-washed stone that doesn't belong", look: "This stone is round and smooth from the sea, yet it lies far above the tide line. Someone carried it here.", act: "Turn the stone over",
open: "Bedded in the sand under the stone is a bottle shaped like a heart. Inside it, a tiny sea rolls quietly back and forth.",
tale: "A heart of blue glass with a little calm sea inside, made by a sailor for the one waiting at home. Hold it in a storm and your own sea goes calm. He never came back for it.",
rumour: "Sailors on the Endless Sea tell of a glass heart with the sea inside it, left on the witch's island \"under a stone the sea never touched\"." },
{ k: "sextant", name: "The Sextant of Unnamed Stars", icon: "✨", at: "gr_neptune", seed: [450, 100], spot: "cairn", mark: 0x6A7280,
what: "a little cairn of three stones", look: "Three flat stones are stacked here, the top one turned so its point aims at one particular patch of sky.", act: "Unstack the cairn",
open: "Under the bottom stone, in a fold of sailcloth, lies a sextant. Its arc is marked with stars no chart has a name for.",
tale: "A navigator's sextant whose arc is engraved with stars nobody has named. It always finds the way, even under cloud, even in a dream. Its last owner sailed by it off the edge of every map and came back.",
rumour: "Saphirel's harbour pilots say a navigator left his sextant \"under a cairn that points at a star\", out beyond the far tunnel." },
{ k: "crown", name: "The Crown of Seven Quiet Kings", icon: "👑", at: "gr_saturn", seed: [-50, -200], spot: "stone", mark: 0x4A4640,
what: "a block of stone with a crown cut faintly in it", look: "A crown has been cut into this block, so faintly you only see it when your lamp is low. The block sits on rollers.", act: "Roll the block aside",
open: "Under the block, in a stone box lined with velvet gone grey, lies a crown with seven points. It is lighter than it looks.",
tale: "The crown of seven dwarf-kings who each ruled without once raising their voice. Each added a point to it. The eighth would not wear it, and hid it so that the next king would have to be quiet enough to find it.",
rumour: "Halcyra's palace guards say the Quiet Crown came up from the deep and was hidden again \"under a block cut with a crown, high above the avenue\"." },
{ k: "spindle", name: "The Spindle of the Deep Weaver", icon: "🧵", at: "gr_uranus", seed: [450, 50], spot: "stone", mark: 0x3E3A48,
what: "a stone wrapped in fine grey thread", look: "Fine grey thread is wound round and round this stone, so fine you only see it when it catches your light.", act: "Unwind the thread",
open: "The thread leads under the stone, to a silver spindle still wound with violet yarn that is warm to the touch.",
tale: "The spindle of the first weaver of the deep, who spun the dark elves' banners from cave-silk. Its yarn never runs out. Whatever is woven with it can never be torn.",
rumour: "Celadine's weavers say the first spindle of the deep was carried here and hidden \"under a stone she wrapped in thread, in the far district\"." },
{ k: "snowglobe", name: "The Snowglobe of Every Winter", icon: "❄️", at: "gr_frozen", seed: [550, 200], spot: "drift", mark: 0xD8E0E8,
what: "a snow drift with a hollow under it", look: "This drift sounds hollow when you tap it. The snow on top is a different white from the snow around it.", act: "Dig into the drift",
open: "Inside the drift is a hollow, and in the hollow a snowglobe in which it is gently snowing, all by itself.",
tale: "A snowglobe that has every winter in it: shake it and it snows on a little town as it snowed on one winter night, any winter you remember. The toymakers of the Pole made it for one child and could never make another.",
rumour: "The toymakers of Isvarden say their finest snowglobe was lost \"in a drift that was never snowed on, out at the far edge\"." },
{ k: "musicbox", name: "The Music Box of the First Carol", icon: "🎶", at: "gr_dead", seed: [0, -250], spot: "stump", mark: 0x4A3A2A,
what: "a pine stump with a brass key in the bark", look: "Half grown over by the bark of this pine stump is the bow of a small brass key.", act: "Turn the key",
open: "Something under the stump begins to play. You dig, and find a music box of dark wood playing a tune you almost know.",
tale: "A music box that plays the first carol ever sung, a tune nobody has written down. Everyone who hears it says they knew it as a child.",
rumour: "In Lanternhome they hum a tune nobody can finish. \"The box that plays it is under a stump with a key in it,\" the lamp-keepers say, \"beyond the palace\"." },
{ k: "acorn", name: "The Golden Acorn", icon: "🌰", at: "gr_faerie", seed: [-150, -100], spot: "stump", mark: 0x5A4A32,
what: "a stump ringed with tiny mushrooms", look: "A perfect ring of tiny white mushrooms grows round this stump, and in the middle the wood has been hollowed by something patient.", act: "Reach into the hollow",
open: "In the hollow, cupped in old leaves, is an acorn of gold, heavy and warm.",
tale: "The acorn of the first oak, before there were any other trees. It is gold all through. The farmers of the Greenwold say that if it is ever planted, a forest will grow in a night.",
rumour: "Glimmerwold's gardeners talk of a golden acorn \"in a stump inside a ring of mushrooms, behind the palace terraces\"." },
{ k: "horn", name: "The Shepherd's Horn of Seven Valleys", icon: "📯", at: "gr_wasteland", seed: [300, -100], spot: "cairn", mark: 0x7A7468,
what: "a shepherd's cairn", look: "A shepherd's cairn, the kind that marks a path in fog. One stone near the bottom has been pulled out and put back many times.", act: "Pull out the loose stone",
open: "Behind the loose stone is a hollow, and in it a curled ivory horn bound with gold.",
tale: "A curled horn that can be heard in seven valleys at once. Every lost sheep, every lost child, every lost traveller who hears it finds their way to it.",
rumour: "\"A horn you can hear in seven valleys,\" the water-finders of Wellspring say. \"In a cairn, if you can find the one stone that moves.\"" },
{ k: "mask", name: "The Laughing Mask of the First Masquerade", icon: "🎭", at: "party", seed: [-200, -150], spot: "slab", mark: 0x6A6070,
what: "a slab with confetti trodden into it", look: "Old confetti is trodden into the cracks round this one slab, though nobody dances here.", act: "Prise up the slab",
open: "Under the slab, in a box of crushed velvet, lies a mask of gold that seems to be smiling at a joke you nearly understand.",
tale: "The mask worn by the host of the very first masquerade, the night the Party Planet was named. Whoever wears it can make anyone laugh, once a night.",
rumour: "Jubilee's oldest dancers say the first host's mask was hidden \"under a slab where the confetti never got swept\"." },
{ k: "inkwell", name: "The Astronomer's Inkwell", icon: "🖋️", at: "gr_stars", seed: [450, -150], spot: "stone", mark: 0x4A4844,
what: "a stone with no dust on it", look: "Every stone here wears a coat of dust. This one is clean, as if someone wiped it with a sleeve.", act: "Lift the stone",
open: "Under the stone, sealed in a small case, is an inkwell of dark glass. The ink inside is the black of the sky above you, with tiny stars in it.",
tale: "An inkwell filled with the night itself. An astronomer used it to draw the first map of the sky, and every star she drew in it is still there, moving slowly.",
rumour: "Celestara's astronomers say an inkwell full of night was hidden \"under the one clean stone, out where the far district starts\"." },
{ k: "chalice", name: "The Chalice of the Quiet Sea", icon: "🏆", at: "gr_depths", seed: [-200, -250], spot: "stone", mark: 0x3E4A50,
what: "a flat stone set like a lid", look: "This flat stone sits too neatly, like a lid on a pot. There is a fingertip-wide gap at one edge.", act: "Slide the lid off",
open: "Under it is a little vault cut in the rock, and in it a silver chalice holding perfectly still water that does not freeze or boil.",
tale: "A silver chalice whose water never spills, freezes or boils away. It was left by the first dreamer who walked the drowned streets, as a toast to all who came after.",
rumour: "Coralmere's divers say a silver chalice of still water was set down \"under a stone that sits like a lid, as far from the gate as the city reaches\"." },
{ k: "signet", name: "The Rust Queen's Signet", icon: "💍", at: "stn_ares", seed: [-42, -20], spot: "slab", tex: "plate", mark: 0x4A4E56,
what: "a deck plate with a ring pressed into it", look: "One deck plate here sits a little proud of the rest, and a ring-shaped mark is pressed into its corner.", act: "Lift the deck plate",
open: "Under the plate, wedged among the cables, is a ring of red gold with a seal cut into its face: a crown above a wheel.",
tale: "The seal ring of the Rust Queen, who ruled the red plains in a story the miners tell. Any letter sealed with it is believed, whoever sends it.",
rumour: "Dockers on the Ares Gateway say the Rust Queen's ring came up from Mars in a crate of ore and was hidden aboard, \"under a deck plate with a ring pressed into it\"." },
{ k: "gear", name: "The Clockmaker's Last Gear", icon: "⚙️", at: "gr_fire", seed: [450, 100], spot: "stone", mark: 0x5A4A3A,
what: "a stone with a tooth-shaped notch", look: "There is a neat notch in this stone, exactly the shape of a gear tooth.", act: "Fit your fingers in the notch and pull",
open: "The stone tips back. Under it, bright and unrusted, lies a single brass gear that is slowly turning on its own.",
tale: "The last gear of a great clock that kept time for a whole world. The clock was lost; the gear kept turning. It has never once stopped.",
rumour: "\"There's a gear that turns by itself,\" the kiln-masters of Kilnhaven say, \"under a stone notched like a tooth, past the tunnel.\"" },
{ k: "hourglass", name: "The Hourglass That Runs Upward", icon: "⏳", at: "gr_desert", seed: [550, -250], spot: "stone", mark: 0x8A7A5A,
what: "a stone sitting in its own shadow", look: "Odd: this stone casts a shadow toward the Sun, not away from it.", act: "Move the stone",
open: "Under the stone lies an hourglass. The sand in it is running up.",
tale: "An hourglass whose sand runs upward. Nobody knows whether it is counting time back or saving it. Those who keep it say they never feel hurried.",
rumour: "Sahmira's caravan masters say an hourglass runs backward \"under a stone whose shadow points the wrong way, at the far end of everything\"." },
{ k: "locket", name: "The Locket of Unsaid Words", icon: "📿", at: "gr_underworld", seed: [-150, -150], spot: "slab", mark: 0x5A5650,
what: "a slab scratched with two letters", look: "Two letters are scratched into this slab, and between them a small heart. The scratches are old.", act: "Lift the slab",
open: "Under the slab is a locket of gold on a fine chain. It is shut, and warm, as though someone has only just let go of it.",
tale: "A locket that holds the words someone meant to say and never did. Open it and you hear them, softly, in their voice. Nobody has ever opened it twice.",
rumour: "Someone left a locket in Hearthdeep \"under a slab with two letters and a heart\", the hearth-tenders say, \"and never came back to say it\"." },
{ k: "mirror", name: "The Veiled Mirror", icon: "🪞", at: "gr_mirror", seed: [-50, -200], spot: "stone", mark: 0x5A4A60,
what: "a stone wrapped in purple cloth", look: "You can just make out a corner of purple cloth peeping out from under this stone.", act: "Pull out the cloth",
open: "The cloth is a veil, and wrapped in it is a hand mirror. In it you see yourself as you would like to be.",
tale: "A silver hand mirror that shows you as you would most like to be. Its owners always kept it veiled, so as not to forget the face they had.",
rumour: "\"There's a mirror in Gemelline that tells you what you wish,\" a twin says, \"under a stone with a purple veil, up by the palace.\" Her sister says the opposite." },
{ k: "map", name: "The Map of Nowhere", icon: "🗺️", at: "race", seed: [565, -299], spot: "cairn", mark: 0x9A9488,
what: "a cairn of pale stones", look: "Three pale stones, stacked. On the middle one someone has drawn, very small, a compass rose with no north.", act: "Take the stones down",
open: "Under the cairn, rolled tight and dry, is a map. As you unroll it, its coastlines quietly redraw themselves.",
tale: "A map that redraws itself to show wherever you are not. Its last owner used it to find the one place nobody had been, and left it there for the next one.",
rumour: "Pyreline's pit crews say a map that draws itself is hidden far out past the circuits, \"under a cairn with a compass that has no north\"." },
{ k: "shell", name: "The Veyari Song Shell", icon: "🐚", at: "gr_future", seed: [0, -250], spot: "stone", mark: 0x6A5A7A,
what: "a stone that hums when you lean on it", look: "Lean on this stone and it hums, very low, one long note.", act: "Lift the stone",
open: "Beneath it lies a spiral shell of rose and pearl. Hold it to your ear: it is singing the first word of the Veyari language.",
tale: "A spiral shell that sings the first word the Veyari ever spoke. They say whoever learns to sing it back will understand every language there is.",
rumour: "A trader in Brightwater swears a Veyari elder gave the first word, sealed in a shell, to the future: \"under a stone that hums, beyond the palace\"." },
{ k: "astrolabe", name: "The Tilted Astrolabe", icon: "🧿", at: "stn_aurora", seed: [42, -20], spot: "slab", tex: "plate", mark: 0x50566A,
what: "a deck plate set at a slant", look: "This deck plate was fitted at a slant, tilted toward the great window, by someone who wanted it just so.", act: "Lift the deck plate",
open: "Under it, in a nest of crystal sand, lies a brass astrolabe tilted at an angle no world's sky has.",
tale: "An astrolabe made for a sky that tilts. It reads the stars of any world, even the ones in dreams, and its keeper always knows what hour it is there.",
rumour: "Station Aurora's crew say a traveller hid an astrolabe aboard, \"under a deck plate set at a slant, as far from the dock as you can walk\"." }
];
RA_DEF.forEach(function (d, i) { d.i = i; RA.list[d.k] = d; RA.order.push(d.k); });
function raWhere() {
var k = typeof mmWhere === "function" ? mmWhere() : null;
if (k)
return k;
try {
if (typeof WLD !== "undefined" && WLD.on === "station" && WLD.w && typeof STN !== "undefined" && !(typeof store !== "undefined" && store.inside))
return STN.k === "ares" ? "stn_ares" : "stn_aurora";
}
catch (e) { }
return null;
}
function raPlaceName(k) { return __ZC(336, 0, this, arguments, new.target); }
function raIsleName(d) { if (!d.isle || typeof SEA_PLACES === "undefined")
return ""; var I = SEA_PLACES.filter(function (p) { return p.k === d.isle; })[0]; return I ? I.name : ""; }
function raWhereWords(d, place) { var p = place || d.at, n = raPlaceName(p); if (p === d.at && d.isle) {
var i = raIsleName(d);
if (i)
n += ", on " + i;
} return n; }
function raM() { return __ZC(336, 1, this, arguments, new.target); }
var RA_MODEL = {
orrery: function () { return __ZC(336, 2, this, arguments, new.target); },
bell: function () { return __ZC(336, 3, this, arguments, new.target); },
quill: function () { return __ZC(336, 4, this, arguments, new.target); },
compass: function () { return __ZC(336, 5, this, arguments, new.target); },
thimble: function () { return __ZC(336, 6, this, arguments, new.target); },
heart: function () { return __ZC(336, 7, this, arguments, new.target); },
sextant: function () { return __ZC(336, 8, this, arguments, new.target); },
crown: function () { return __ZC(336, 9, this, arguments, new.target); },
spindle: function () { return __ZC(336, 10, this, arguments, new.target); },
snowglobe: function () { return __ZC(336, 11, this, arguments, new.target); },
musicbox: function () { return __ZC(336, 12, this, arguments, new.target); },
acorn: function () { return __ZC(336, 13, this, arguments, new.target); },
horn: function () { return __ZC(336, 14, this, arguments, new.target); },
mask: function () { return __ZC(336, 15, this, arguments, new.target); },
inkwell: function () { return __ZC(336, 16, this, arguments, new.target); },
chalice: function () { return __ZC(336, 17, this, arguments, new.target); },
signet: function () { return __ZC(336, 18, this, arguments, new.target); },
gear: function () { return __ZC(336, 19, this, arguments, new.target); },
hourglass: function () { return __ZC(336, 20, this, arguments, new.target); },
locket: function () { return __ZC(336, 21, this, arguments, new.target); },
mirror: function () { return __ZC(336, 22, this, arguments, new.target); },
map: function () { return __ZC(336, 23, this, arguments, new.target); },
shell: function () { return __ZC(336, 24, this, arguments, new.target); },
astrolabe: function () { return __ZC(336, 25, this, arguments, new.target); }
};
var RA_SPOT = {
stone: function (g, d) { mmRock(g, mmMat(d.mark, { shine: 8 }), 0.5, 0.28, 0.42, 0, 0.08, 0, mmHash(d.k) % 997); },
slab: function (g, d) { mmSlab(g, mmMat(d.mark, { shine: 6, tex: d.tex !== undefined ? d.tex : "worn" }), 1.1, 0.85, 0.08, 0, 0.03, 0, -Math.PI / 2, 0, 0.06); },
stump: function (g, d) { return __ZC(336, 26, this, arguments, new.target); },
cairn: function (g, d) {
var m = mmMat(d.mark, { shine: 8 }), m2 = mmMat(d.mark, { shine: 14, spec: 0x5A5A5A });
mmRock(g, m, 0.55, 0.13, 0.45, 0, 0.08, 0, mmHash(d.k) % 991, 0.4);
mmRock(g, m2, 0.4, 0.11, 0.34, 0.08, 0.27, -0.05, mmHash(d.k) % 983, 1.9);
mmRock(g, m, 0.26, 0.09, 0.22, -0.05, 0.43, 0.04, mmHash(d.k) % 977, 3.1);
},
drift: function (g, d) { mmEll(g, mmMat(d.mark, { shine: 12, spec: 0x9AA4AE }), 1.1, 0.45, 0.9, 0, 0, 0, 16); }
};
function raSeed(d) {
if (d.isle && typeof SEA_PLACES !== "undefined") {
var I = SEA_PLACES.filter(function (p) { return p.k === d.isle; })[0];
if (I)
return [I.x + d.seed[0], I.z + d.seed[1]];
}
return d.seed;
}
function raHideSpot(d) {
var key = d.k + "@" + (typeof WLD !== "undefined" && WLD.w ? (WLD.w.g && WLD.w.g.uuid) : "city");
var c = RA.spots[d.k];
if (c && c.key === key)
return c;
var s = raSeed(d), best = null, lairs = [];
try {
(typeof MM_DEF !== "undefined" ? MM_DEF : []).forEach(function (m) { if (m.at === d.at) {
var L = mmHideSpot(m);
lairs.push([L.x, L.z]);
} });
}
catch (e) { }
for (var rad = 0; rad <= 160 && !best; rad += 4) {
var n = rad ? Math.max(8, Math.round(rad / 3)) : 1;
for (var q = 0; q < n && !best; q++) {
var a = q / n * Math.PI * 2 + mmHash(d.k) % 7, x = s[0] + Math.cos(a) * rad, z = s[1] + Math.sin(a) * rad, y = mmGround(x, z), lo = y, hi = y, ok = y > -300;
if (ok && d.dry !== undefined && y < d.dry)
ok = false;
for (var l = 0; l < lairs.length && ok; l++)
if (Math.hypot(x - lairs[l][0], z - lairs[l][1]) < 70)
ok = false;
for (var u = -1; u <= 1 && ok; u++)
for (var v = -1; v <= 1 && ok; v++) {
var px = x + u * 1.6, pz = z + v * 1.6, py = mmGround(px, pz);
lo = Math.min(lo, py);
hi = Math.max(hi, py);
if (py < -300 || mmBlockL(px, pz, py + 0.2))
ok = false;
if (d.dry !== undefined && py < d.dry)
ok = false;
}
if (ok && hi - lo < 0.9)
best = { x: x, z: z, y: mmGround(x, z) };
}
}
if (!best)
best = { x: s[0], z: s[1], y: mmGround(s[0], s[1]) };
best.key = key;
RA.spots[d.k] = best;
return best;
}
function raSpotOf(k) {
var d = RA.list[k], r = RA.rows[k];
if (r && r.x != null && r.z != null)
return { x: +r.x, z: +r.z, y: r.y != null ? +r.y : mmGround(+r.x, +r.z), moved: true };
return raHideSpot(d);
}
function raHere(place) {
var out = [];
RA.order.forEach(function (k) {
var d = RA.list[k], r = RA.rows[k];
if (RA.rowsOk) {
if (r && r.here)
out.push(k);
}
else if (d.at === place)
out.push(k);
});
return out;
}
function raClaimed(k) { var r = RA.rows[k]; return !!(RA.rowsOk && r && r.claimed); }
function raBuild(place) {
raDrop();
RA.place = place;
var b = mmBase();
if (!b)
return;
raHere(place).forEach(function (k) {
var d = RA.list[k], S = raSpotOf(k), g = new THREE.Group();
try {
(RA_SPOT[d.spot] || RA_SPOT.stone)(g, d);
}
catch (e) {
if (window.console)
console.warn("[ra] spot", k, e);
}
g.position.set(b.x + S.x, S.y, b.z + S.z);
g.rotation.y = mmHash(k) % 628 / 100;
g.userData.noCull = 1;
scene.add(g);
RA.marks[k] = { g: g, x: S.x, z: S.z, y: S.y };
if (raKeeper() && !raClaimed(k))
raShow(k, S);
});
}
function raShow(k, S) {
var b = mmBase();
if (!b || RA.shows[k])
return;
var B = RA_MODEL[k](), g = new THREE.Group();
g.add(B.g);
g.userData.noCull = 1;
g.scale.setScalar(2.2);
g.position.set(b.x + S.x, S.y + 1.1, b.z + S.z);
scene.add(g);
RA.shows[k] = { g: g, B: B };
}
function raDispose(g) { if (!g)
return; if (g.parent)
g.parent.remove(g); g.traverse(function (o) { if (o.geometry && o.geometry.dispose)
o.geometry.dispose(); }); }
function raDrop() {
Object.keys(RA.marks).forEach(function (k) { raDispose(RA.marks[k].g); });
Object.keys(RA.shows).forEach(function (k) { raDispose(RA.shows[k].g); });
RA.marks = {};
RA.shows = {};
RA.place = null;
}
function raTick(dt) {
RA.t += dt;
var place = raWhere();
if (place !== RA.place) {
if (place) {
raBuild(place);
RA.heardAt = RA.t;
RA.rowsAt = -99;
}
else
raDrop();
}
if (RA.kgo)
raKeeperGoTick(dt);
if (place) {
if (RA.t - RA.rowsAt > 20)
raLoad(place);
if (RA.heardAt && RA.t - RA.heardAt > 5) {
RA.heardAt = 0;
raRumourHere(place);
}
}
Object.keys(RA.shows).forEach(function (k) { var S = RA.shows[k]; S.g.rotation.y += dt * 0.35; if (S.B.anim)
try {
S.B.anim(dt);
}
catch (e) { } });
if (RA.rise)
raRiseTick(dt);
if (RA.hold)
raHoldTick(dt);
}
function raNear() {
if (!RA.place || !walkMode || RA.rise)
return null;
var L = mmL(), feet = camera.position.y - 1.72, ks = Object.keys(RA.marks);
for (var i = 0; i < ks.length; i++) {
var k = ks[i], M = RA.marks[k], d = RA.list[k];
if (Math.hypot(L.x - M.x, L.z - M.z) > 1.9 || Math.abs(feet - M.y) > 2.5)
continue;
if (raKeeper())
return { html: "🗝️ <b>" + raEsc(d.name) + "</b> waits here" + (raClaimed(k) ? " (found)" : "") + " · <b>press E</b>", fn: function (k) { return function () { raKeeperCard(k); }; }(k) };
if (raClaimed(k))
return { html: "🔍 <b>" + raEsc(d.what) + "</b> · <b>press E</b> to examine", fn: function (k) { return function () { raEmptyCard(k); }; }(k) };
return { html: "🔍 <b>" + raEsc(d.what) + "</b> · <b>press E</b> to examine", fn: function (k) { return function () { raExamine(k); }; }(k) };
}
return null;
}
function raExamine(k) {
var d = RA.list[k];
worldCard(worldFacts("You look closer", "", [], [d.look]) + worldBtn("open", raEsc(d.act), ""), { open: function () { worldCard(null); raClaim(k); } });
}
function raEmptyCard(k) {
var r = RA.rows[k] || {}, d = RA.list[k];
worldCard(worldFacts("You look closer", "", [], [d.look, r.mine ? "This is where you found " + d.name + ". The hollow under it is empty now." : "Underneath is a hollow, empty. Whatever lay here, someone found it first."]), {});
}
function raClaim(k) { return __ZC(336, 27, this, arguments, new.target); }
function raRiseStart(k) {
var M = RA.marks[k], b = mmBase();
if (!M || !b)
return;
var B = RA_MODEL[k](), g = new THREE.Group();
g.add(B.g);
g.userData.noCull = 1;
g.scale.setScalar(1.8);
g.position.set(b.x + M.x, M.y, b.z + M.z);
scene.add(g);
RA.rise = { k: k, g: g, B: B, t: 0, y0: M.y };
}
function raRiseTick(dt) { return __ZC(336, 28, this, arguments, new.target); }
function raHoldUp(k) { return __ZC(336, 29, this, arguments, new.target); }
function raHoldTick(dt) { return __ZC(336, 30, this, arguments, new.target); }
function raHoldEnd() { if (RA.hold) {
raDispose(RA.hold.g);
RA.hold = null;
} }
function raHeard() { return raLS("ra.heard"); }
function raRumourWay(k) { return __ZC(336, 31, this, arguments, new.target); }
function raRumourHere(place) { return __ZC(336, 32, this, arguments, new.target); }
function raRumourCard(k) { return __ZC(336, 33, this, arguments, new.target); }
function raLoad(place) {
RA.rowsAt = RA.t;
if (!raSigned()) {
RA.rowsOk = false;
return;
}
raRpc("artifact_here", { p_place: place }).then(function (o) {
if (!o || o.ok === false || RA.place !== place)
return;
var rows = {};
(o.rows || []).forEach(function (r) { rows[r.k] = r; });
var before = JSON.stringify(RA.rows), was = RA.rowsOk;
RA.rows = rows;
RA.rowsOk = true;
RA.missing = false;
if (!was || before !== JSON.stringify(rows))
raBuild(place);
}).catch(function (e) { if (mmMissing(e)) {
RA.missing = true;
RA.rowsOk = false;
} });
}
function raMineLoad() {
RA.mineAt = RA.t;
if (!raSigned())
return Promise.resolve([]);
return raRpc("artifact_mine", {}).then(function (o) { RA.mine = (o && o.rows) || []; return RA.mine; }).catch(function () { return RA.mine || []; });
}
function raKeeperList() {
return raRpc("keeper_artifact_list", {}).then(function (o) { RA.klist = (o && o.ok && o.rows) || null; return RA.klist; }).catch(function () { RA.klist = null; });
}
if (typeof bkpHtml === "function") {
var raBkpHtml0 = bkpHtml;
bkpHtml = function () { var h = raBkpHtml0.apply(this, arguments); try {
return h + raBkpSection();
}
catch (e) {
return h;
} };
}
if (typeof bkpLoad === "function") {
var raBkpLoad0 = bkpLoad;
bkpLoad = function () { var p = raBkpLoad0.apply(this, arguments); raMineLoad().then(function () { if (raKeeper())
return raKeeperList(); }).then(function () { if (typeof bkpPaint === "function")
bkpPaint(); }); return p; };
}
function raBkpSection() { return __ZC(336, 34, this, arguments, new.target); }
function raAbout(k) { return __ZC(336, 35, this, arguments, new.target); }
function raGiveCard(k) { return __ZC(336, 36, this, arguments, new.target); }
function raGive(k, to, name) { return __ZC(336, 37, this, arguments, new.target); }
function raRehideCard(k) { return __ZC(336, 38, this, arguments, new.target); }
function raRehide(k) { return __ZC(336, 39, this, arguments, new.target); }
function raKeeperCard(k) { return __ZC(336, 40, this, arguments, new.target); }
function raKeeperReset(k) { return __ZC(336, 41, this, arguments, new.target); }
function raKeeperHere(k) { return __ZC(336, 42, this, arguments, new.target); }
function raKeeperGo(k) { return __ZC(336, 43, this, arguments, new.target); }
function raKeeperGoTick(dt) { return __ZC(336, 44, this, arguments, new.target); }
(function () {
var q = null;
try {
q = new URLSearchParams(location.search);
}
catch (e) {
return;
}
var v = q.get("kra");
if (!v)
return;
var kind = v.split(":")[0], k = v.slice(kind.length + 1), tries = 0;
function clean() { try {
q.delete("kra");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { } }
var t = setInterval(function () {
tries++;
if (tries > 240) {
clearInterval(t);
clean();
return;
}
if (typeof walkMode === "undefined" || !walkMode || !raSigned() || !RA.list[k])
return;
if (typeof store === "undefined" || !store || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
if (!raKeeper()) {
if (tries > 60) {
clearInterval(t);
clean();
raSay("That link is for the Keeper.");
}
return;
}
clearInterval(t);
clean();
if (kind === "go")
raKeeperList().then(function () { raKeeperGo(k); });
else if (kind === "move") {
RA.kmove = k;
raSay("<b>Moving " + raEsc(RA.list[k].name) + ".</b> Go where you want it (outdoors), then open the Backpack and press <b>Here</b> beside it.");
raKeeperList();
}
}, 500);
})();
(function () {
if (!raOn())
return;
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
raPowTick(dt);
}
catch (e) {
if (window.console && !RA.warnP) {
RA.warnP = 1;
console.warn("[ra pow]", e);
}
} try {
raTick(dt);
}
catch (e) {
if (window.console && !RA.warnT) {
RA.warnT = 1;
console.warn("[ra]", e);
}
} };
}
if (typeof dkHere === "function") {
var dh = dkHere;
dkHere = function (dt) { var b = dh.apply(this, arguments); if (b)
return b; try {
return raNear();
}
catch (e) {
return null;
} };
}
})();
var RA_POW = {
orrery: { n: "Stop the Nine Hours", col: 0xE8C87A, cd: 75, pas: { speed: 1.25, fast: 0.85 },
act: [{ aoe: 35, stun: 8 }, { immune: 8 }],
pasT: "You move a quarter faster and strike a little sooner.",
actT: "Every foe within 35 m stops where it stands for 8 seconds, and nothing can hurt you while the hours stand still." },
bell: { n: "The Silent Toll", col: 0xB8A070, cd: 40, pas: { armor: 0.7 },
act: [{ aoe: 14, dmg: 60, knock: 8, stun: 3 }],
pasT: "Blows on you land 30% softer.",
actT: "A wave with no sound at all: 60 to every foe within 14 m, thrown back 8 m and dazed for 3 seconds (25 to each dreamer within 12 m)." },
quill: { n: "The Last Word", col: 0xF4F0E6, cd: 30, pas: { regen: 2, might: 1.1 },
act: [{ next: 5, nextS: 10 }],
pasT: "You heal 2 vigour a second and strike 10% harder.",
actT: "For 10 seconds your next blow strikes five times as hard (against a dreamer, the hardest blow there is)." },
compass: { n: "The Way Out", col: 0xC8A050, cd: 20, pas: { sight: 1, speed: 1.15 },
act: [{ dash: 25, immune: 2 }],
pasT: "The needle points to the nearest thing still hidden in this world, and you move 15% faster.",
actT: "You are suddenly 25 m ahead of where you stood, and nothing can touch you for 2 seconds." },
thimble: { n: "Small Brave Things", col: 0xD8DCE4, cd: 90, pas: { armor: 0.6 },
act: [{ healFull: 1 }, { immune: 5 }],
pasT: "Blows on you land 40% softer.",
actT: "You are whole again, at once, and nothing can hurt you for 5 seconds." },
heart: { n: "The Calm Sea", col: 0x5AA8E8, cd: 60, pas: { regen: 3 },
act: [{ healFull: 1 }, { aoe: 20, slow: 10 }],
pasT: "You heal 3 vigour a second.",
actT: "You are whole again, and every foe within 20 m wades at half speed for 10 seconds." },
sextant: { n: "The Unnamed Star", col: 0xF0E8FF, cd: 25, pas: { might: 1.2 },
act: [{ star: 40, dmg: 150 }],
pasT: "Your blows land 20% harder.",
actT: "A falling star strikes the foe you face, up to 40 m away, for 150 (25 against a dreamer)." },
crown: { n: "Seven Quiet Kings", col: 0xE8C060, cd: 90, pas: { maxhp: 1.4 },
act: [{ kings: 20, every: 2, dmg: 30, r: 20 }],
pasT: "You have 40% more vigour.",
actT: "Seven pale kings walk beside you for 20 seconds; every 2 seconds they strike the nearest foe within 20 m for 30." },
spindle: { n: "The Deep Weaver's Web", col: 0xC8C8D0, cd: 60, pas: { slowHit: 3, might: 1.1 },
act: [{ aoe: 18, stun: 7, dot: 20, dotS: 7 }],
pasT: "Whoever you strike is slowed for 3 seconds, and you strike 10% harder.",
actT: "Grey threads bind every foe within 18 m for 7 seconds, wearing away 20 vigour a second." },
snowglobe: { n: "Every Winter", col: 0xCFEFFF, cd: 45, pas: { armor: 0.8, regen: 1 },
act: [{ aoe: 12, dmg: 80, stun: 5 }],
pasT: "Blows on you land 20% softer, and you heal 1 vigour a second.",
actT: "A blizzard round you: 80 to every foe within 12 m, frozen where they stand for 5 seconds." },
musicbox: { n: "The First Carol", col: 0xF0D890, cd: 70, pas: { speed: 1.15, regen: 1.5 },
act: [{ healOver: 6 }, { aoe: 25, calm: 8 }],
pasT: "You move 15% faster and heal 1.5 vigour a second.",
actT: "The carol plays: you heal fully over 6 seconds, and no foe within 25 m will raise a hand for 8 seconds." },
acorn: { n: "The Golden Grove", col: 0xE8C048, cd: 60, pas: { regen: 4 },
act: [{ guard: 12, guardMult: 0.2 }],
pasT: "You heal 4 vigour a second.",
actT: "A ring of golden oaks shields you for 12 seconds: every blow on you is four-fifths lighter." },
horn: { n: "Seven Valleys", col: 0xD8B070, cd: 35, pas: { speed: 1.3 },
act: [{ cone: 30, arc: 0.6, dmg: 120, knock: 12 }],
pasT: "You move 30% faster.",
actT: "One long call: 120 to everything in front of you up to 30 m, and 12 m back they go (25 to each dreamer in front, within 12 m)." },
mask: { n: "The First Masquerade", col: 0xE890C0, cd: 50, pas: { miss: 0.25 },
act: [{ unseen: 10 }, { next: 4, nextS: 10 }],
pasT: "A quarter of the blows aimed at you miss.",
actT: "For 10 seconds no fighter can see you, and your first blow from hiding strikes four times as hard." },
inkwell: { n: "Star Ink", col: 0x6A80E8, cd: 45, pas: { might: 1.25 },
act: [{ splash: 6, splashS: 8 }],
pasT: "Your blows land 25% harder.",
actT: "For 8 seconds every blow you land also strikes every foe within 6 m of the one you hit." },
chalice: { n: "The Quiet Sea", col: 0x9AD8E8, cd: 75, pas: { drain: 0.25 },
act: [{ healFull: 1 }, { immune: 3 }],
pasT: "A quarter of every blow you land comes back to you as vigour.",
actT: "You are whole again, and nothing can hurt you for 3 seconds." },
signet: { n: "The Seal of Command", col: 0xC85A3A, cd: 60, pas: { armor: 0.75, maxhp: 1.15 },
act: [{ aoe: 20, calm: 8, knock: 10 }, { immune: 4 }],
pasT: "Blows on you land 25% softer, and you have 15% more vigour.",
actT: "Every foe within 20 m is driven back 10 m and dares not strike for 8 seconds; nothing can hurt you for 4." },
gear: { n: "The Last Gear", col: 0xD8A050, cd: 60, pas: { fast: 0.6 },
act: [{ haste: 10, speed: 2, fast: 0.5 }],
pasT: "You strike 40% sooner.",
actT: "For 10 seconds you run twice as fast and strike twice as often." },
hourglass: { n: "Runs Upward", col: 0xE8D8A0, cd: 40, pas: { cheat: 180 },
act: [{ rewind: 5 }],
pasT: "Once every 3 minutes a blow that would beat you leaves you standing with 1 vigour.",
actT: "The sand runs back: you are where you stood 5 seconds ago, with the vigour you had then (if it was more)." },
locket: { n: "Unsaid Words", col: 0xD0A8C8, cd: 55, pas: { regen: 2, armor: 0.9 },
act: [{ aoe: 20, dmg: 50, stun: 4 }],
pasT: "You heal 2 vigour a second, and blows on you land 10% softer.",
actT: "Everything you never said, at once: 50 to every foe within 20 m, stunned for 4 seconds (25 to each dreamer within 12 m)." },
mirror: { n: "The Veil", col: 0xB89AE8, cd: 70, pas: { reflect: 0.3 },
act: [{ reflectAll: 8 }],
pasT: "Three-tenths of every blow on you goes back to whoever struck it.",
actT: "For 8 seconds you take nothing at all, and every blow aimed at you goes back to whoever struck it." },
map: { n: "Nowhere", col: 0xD8CCA8, cd: 30, pas: { speed: 1.2, armor: 0.9 },
act: [{ dash: -40, immune: 3 }],
pasT: "You move 20% faster, and blows on you land 10% softer.",
actT: "You step off the map: 40 m back from where you face, and nothing can touch you for 3 seconds." },
shell: { n: "The Song of Veyar", col: 0xB8A0E0, cd: 50, pas: { miss: 0.2, regen: 1.5 },
act: [{ aoe: 25, stun: 5 }, { heal: 30 }],
pasT: "A fifth of the blows aimed at you miss, and you heal 1.5 vigour a second.",
actT: "The shell sings: every foe within 25 m stands still for 5 seconds, and you heal 30." },
astrolabe: { n: "The Tilted Sky", col: 0x9AA8F0, cd: 60, pas: { might: 1.15, speed: 1.15 },
act: [{ aoe: 25, lift: 4, dmg: 60 }],
pasT: "Your blows land 15% harder and you move 15% faster.",
actT: "The sky tilts: every foe within 25 m floats helpless for 4 seconds, then falls for 60 (25 to each dreamer within 12 m)." }
};
var RA_PVP_R = 12;
var RAP = { wield: null, cd: {}, imm: 0, haste: 0, hasteSp: 1, hasteFast: 1, next: 1, nextT: 0, unseen: 0, splash: 0, splashT: 0, guard: 0, guardM: 1,
reflectAll: 0, healOver: 0, kings: 0, kingsT: 0, kingsK: null, dots: [], cheatAt: -1e9, hist: [], histT: 0, sightT: 0, sight: null, mineT: 0,
hooked: false, btn: null, lastHere: null, noMult: false };
function raPT() { return (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000; }
function raPowOf(k) { return RA_POW[k] || null; }
function raPowLevel() { try {
return typeof dgrHereLevel === "function" ? dgrHereLevel() : 0;
}
catch (e) {
return 0;
} }
function raPowHere() {
if (!RAP.wield || !RA_POW[RAP.wield])
return false;
if (typeof walkMode !== "undefined" && !walkMode)
return false;
return raPowLevel() >= 2;
}
function raPowOn(field) { if (!raPowHere())
return null; var p = RA_POW[RAP.wield].pas; return p[field] === undefined ? null : p[field]; }
function raBattle() { return typeof WLD !== "undefined" && WLD.on === "battle" && typeof BW !== "undefined"; }
function raDgrOn() { return typeof DGR !== "undefined" && typeof dgrFightHere === "function" && dgrFightHere(); }
function raOwns(k) { return (RA.mine || []).some(function (r) { return r.k === k; }); }
function raWieldLoad() { var w = raLS("ra.wield"); RAP.wield = (w && typeof w.k === "string" && RA_POW[w.k]) ? w.k : null; }
function raWield(k) { return __ZC(336, 45, this, arguments, new.target); }
function raPowKeyWord() { return (typeof GFX_PHONE !== "undefined" && GFX_PHONE) || ("ontouchstart" in window) ? "the round button" : "Z (or the round button)"; }
function raWieldCheck() {
if (!RAP.wield || !RA.mine)
return;
if (!raOwns(RAP.wield)) {
var d = RA.list[RAP.wield];
RAP.wield = null;
raLSput("ra.wield", { k: null });
raPowBtnPaint();
if (d)
raSay("<b>" + raEsc(d.name) + "</b> is no longer yours, and its power has gone with it.");
}
}
function raMeL() { var P = camera.position, b = (typeof WLD !== "undefined" && WLD.w && WLD.w.base) || 0; return { x: P.x - b, y: P.y, z: P.z }; }
function raBwFoes(r) {
if (!raBattle() || typeof bwFoesForMe !== "function")
return [];
var P = camera.position;
return bwFoesForMe().map(function (o) { o.d = Math.hypot(o.x - P.x, o.z - P.z); return o; }).filter(function (o) { return o.d <= r; }).sort(function (a, b) { return a.d - b.d; });
}
function raDreamers(r) {
if (!raDgrOn() || typeof dgrProtected === "function" && dgrProtected() || DGR.downT)
return [];
var L = dgrMeLocal();
if (dgrInRing(L.x, L.z))
return [];
return dgrOthers().filter(function (o) { return o.d <= r && !dgrInRing(o.lx, o.lz); });
}
function raFacing(o, arc) { var a = Math.atan2(-(o.x - camera.position.x), -(o.z - camera.position.z)); var d = a - yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); return Math.abs(d) < arc; }
function raHitDreamer(o, dmg) { return __ZC(336, 46, this, arguments, new.target); }
function raStrike(o, dmg, ex) { ex = ex || {}; ex.ra = 1; try {
bwStrikeFoe(o, dmg, ex);
}
catch (e) { } }
function raFx(x, y, z, col, n, kind) {
try {
if (typeof pwBurst !== "function")
return;
var C = camera.position, near = Math.hypot(x - C.x, z - C.z) < 3, sz = near ? 0.25 : 0.8;
if (near) {
y = Math.min(y, C.y - 1.5);
n = Math.min(n || 40, 30);
}
pwBurst(x, y, z, col, n || 40, [1.2, near ? 0.6 : 2, 1.2], 1.4, kind || "rise", sz);
}
catch (e) { }
}
function raRingFx(r, col) { try {
var P = camera.position;
if (typeof pwRing === "function")
pwRing(P.x, P.y - 1.6, P.z, col, r, 1.1);
}
catch (e) { } }
function raHp() { if (raBattle())
return { o: BW, hp: "hp", max: "max" }; if (typeof DGR !== "undefined")
return { o: DGR, hp: "hp", max: "max" }; return null; }
function raHeal(n) { var H = raHp(); if (!H)
return; var o = H.o; if (o.downT)
return; o.hp = Math.min(o.max, o.hp + n); }
function raPowUse() { return __ZC(336, 47, this, arguments, new.target); }
function raEffect(e, P, now, said) { return __ZC(336, 48, this, arguments, new.target); }
function raDash(dist) { return __ZC(336, 49, this, arguments, new.target); }
function raRewind(s) { return __ZC(336, 50, this, arguments, new.target); }
function raTaken(d, src) { return __ZC(336, 51, this, arguments, new.target); }
function raReflect(d, src) {
if (!(d > 0) || !src)
return;
if (src && src.F && typeof bwHitF === "function")
try {
bwHitF(src.F, d, { x: src.F.x, z: src.F.z, me: true, ra: 1 });
}
catch (e) { }
else if (src.pvp && typeof bwPvpHit === "function")
try {
bwPvpHit(src.pvp, d);
}
catch (e) { }
else if (src.dreamer)
raHitDreamer({ id: src.dreamer }, d);
}
function raDealt(dmg) {
if (!raPowHere())
return dmg;
var now = raPT(), P = RA_POW[RAP.wield].pas;
if (P.might)
dmg *= P.might;
if (RAP.nextT > now && RAP.next > 1) {
dmg *= RAP.next;
RAP.next = 1;
RAP.nextT = 0;
RAP.unseen = 0;
}
if (P.drain)
raHeal(dmg * P.drain);
return dmg;
}
function raHook() {
if (RAP.hooked)
return;
RAP.hooked = true;
if (typeof walkBy === "function") {
var wb = walkBy;
walkBy = function (mx, mz) {
if (!RAP.noMult && raPowHere()) {
var s = raPowOn("speed") || 1;
if (RAP.haste > raPT())
s *= RAP.hasteSp;
if (s !== 1) {
mx *= s;
mz *= s;
}
}
return wb.call(this, mx, mz);
};
}
if (typeof dgrRpc === "function") {
var dr = dgrRpc;
dgrRpc = function (n, a) {
try {
if (n === "danger_send" && a && a.p_body && a.p_body.t === "hit" && !a.p_body.ra && raPowHere()) {
var d = raDealt(+a.p_body.d || 10);
a.p_body.d = Math.max(1, Math.min(25, Math.round(d)));
if (RAP.splashT > raPT()) {
var tid = a.p_to;
raDreamers(RA_PVP_R).forEach(function (o) { if (o.id !== tid && o.d < RAP.splash + 3)
raHitDreamer(o, a.p_body.d * 0.6); });
}
var f = raPowOn("fast") || 1;
if (RAP.haste > raPT())
f *= RAP.hasteFast;
if (f < 1)
setTimeout(function () { if (DGR.cool > 0)
DGR.cool *= f; }, 0);
}
}
catch (e) { }
return dr.apply(this, arguments);
};
}
if (typeof dgrHurt === "function") {
var dh = dgrHurt;
dgrHurt = function (d, from, name) {
if (raPowHere() && typeof dgrFightHere === "function" && dgrFightHere()) {
d = raTaken(+d || 0, { dreamer: from });
if (!(d > 0))
return;
}
return dh.call(this, d, from, name);
};
}
if (typeof bwStrikeFoe === "function") {
var bs = bwStrikeFoe;
bwStrikeFoe = function (o, dmg, ex) {
if (ex && ex.ra)
return bs.call(this, o, dmg, ex);
dmg = raDealt(dmg);
var sl = raPowOn("slowHit");
if (sl) {
ex = ex || {};
ex.slow = Math.max(ex.slow || 0, sl);
}
var r = bs.call(this, o, dmg, ex);
if (RAP.splashT > raPT() && o) {
raBwFoes(400).forEach(function (q) { if (q === o || q.F && q.F === o.F || q.M && q.M === o.M || q.pvp && q.pvp === o.pvp)
return; if (Math.hypot(q.x - o.x, q.z - o.z) < RAP.splash)
bs.call(this, q, dmg * 0.6, { ra: 1 }); });
}
return r;
};
}
if (typeof bwHurtMe === "function") {
var bh = bwHurtMe;
bwHurtMe = function (dmg, src, raw) {
if (raPowHere() && WLD.on === "battle" && !BW.downT && !(typeof bwInTruce === "function" && bwInTruce())) {
dmg = raTaken(+dmg || 0, src);
if (!(dmg > 0))
return;
}
return bh.call(this, dmg, src, raw);
};
}
if (typeof bwAttack === "function") {
var ba = bwAttack;
bwAttack = function () {
var c0 = typeof BW !== "undefined" ? BW.cool : 0, r = ba.apply(this, arguments);
try {
if (raPowHere() && BW.cool > c0) {
var f = raPowOn("fast") || 1;
if (RAP.haste > raPT())
f *= RAP.hasteFast;
if (f < 1)
BW.cool *= f;
}
}
catch (e) { }
return r;
};
}
if (typeof bwFTick === "function") {
var bt = bwFTick;
bwFTick = function (F, dt) {
var now = raPT();
if (F && F.st !== "dead" && F.raLift) {
if (F.raLift > now) {
var u = 1 - (F.raLift - now) / 4;
F.g.position.set(F.x, F.y + Math.min(6, u * 24), F.z);
F.g.rotation.z += dt * 1.5;
return;
}
F.raLift = 0;
F.g.rotation.z = 0;
if (F.raLiftD)
try {
bwHitF(F, F.raLiftD, { x: F.x, z: F.z, me: true, ra: 1 });
}
catch (e) { }
}
if (F && F.st !== "dead" && F.raFrz > now) {
F.cool = Math.max(F.cool || 0, 0.3);
if (F.st === "wind")
F.st = "go";
return;
}
return bt.apply(this, arguments);
};
}
if (typeof bwStrike === "function") {
var bk = bwStrike;
bwStrike = function (F) { var now = raPT(); if (F && (F.raCalm > now || F.raFrz > now || F.raLift > now))
return; return bk.apply(this, arguments); };
}
if (typeof bwMeTargetable === "function") {
var bm = bwMeTargetable;
bwMeTargetable = function () { if (RAP.unseen > raPT() && raPowHere())
return false; return bm.apply(this, arguments); };
}
if (typeof vrpMenuItems === "function") {
var vm = vrpMenuItems;
vrpMenuItems = function () {
var it = vm.apply(this, arguments);
try {
if (RAP.wield && raPowHere()) {
var P = RA_POW[RAP.wield];
it.unshift({ t: RA.list[RAP.wield].icon + " " + P.n, run: function () { raPowUse(); } });
}
}
catch (e) { }
return it;
};
}
addEventListener("keydown", function (e) {
if (e.code !== "KeyZ" || e.repeat || e.ctrlKey || e.metaKey || e.altKey)
return;
var t = document.activeElement && document.activeElement.tagName;
if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT")
return;
if (!RAP.wield || !raPowHere())
return;
e.preventDefault();
raPowUse();
});
}
function raPowTick(dt) {
if (!RAP.hooked)
raHook();
var here = raPowHere(), now = raPT();
if (here !== RAP.lastHere) {
RAP.lastHere = here;
raPowBtnPaint();
raPowMax(here);
if (here && RAP.wield) {
var d = RA.list[RAP.wield];
raSay("✨ <b>" + raEsc(d.name) + "</b> wakes: the danger here is high enough for its powers.");
}
}
if (RAP.wield && now - RAP.mineT > 120) {
RAP.mineT = now;
if (typeof raMineLoad === "function")
try {
raMineLoad().then(raWieldCheck).catch(function () { });
}
catch (e) { }
}
if (!here)
return;
var P = RA_POW[RAP.wield].pas, H = raHp();
if (H && !H.o.downT) {
var reg = (P.regen || 0) + (RAP.healOver > now ? H.o.max / 6 : 0);
if (reg > 0 && H.o.hp < H.o.max)
H.o.hp = Math.min(H.o.max, H.o.hp + reg * dt);
}
RAP.histT += dt;
if (RAP.histT > 0.25) {
RAP.histT = 0;
var C = camera.position;
RAP.hist.push({ t: now, x: C.x, y: C.y, z: C.z, hp: H ? H.o.hp : 0, w: WLD && WLD.on });
while (RAP.hist.length && now - RAP.hist[0].t > 8)
RAP.hist.shift();
}
for (var i = RAP.dots.length - 1; i >= 0; i--) {
var D = RAP.dots[i];
if (now > D.until || !D.o || (D.o.F && D.o.F.st === "dead")) {
RAP.dots.splice(i, 1);
continue;
}
D.t += dt;
if (D.t >= 1) {
D.t -= 1;
raStrike(D.o, D.dps, {});
}
}
if (RAP.kings > now) {
RAP.kingsT -= dt;
if (RAP.kingsT <= 0) {
var K = RAP.kingsK;
RAP.kingsT = K.every;
var t = raBwFoes(K.r)[0];
if (t) {
raStrike(t, K.dmg, { knock: 2 });
raFx(t.x, t.y, t.z, 0xE8E0C0, 30, "swirl");
}
else {
var q = raDreamers(Math.min(K.r, RA_PVP_R))[0];
if (q)
raHitDreamer(q, 25);
}
}
}
if (P.sight) {
RAP.sightT -= dt;
if (RAP.sightT <= 0) {
RAP.sightT = 1;
RAP.sight = raSightWord();
raPowBtnPaint();
}
}
var left = (RAP.cd[RAP.wield] || 0) - now;
if (RAP.btn && RAP.btn.dataset.left !== String(Math.max(0, Math.ceil(left))))
raPowBtnPaint();
}
function raPowMax(on) {
try {
var m = on && RAP.wield ? (RA_POW[RAP.wield].pas.maxhp || 1) : 1;
if (typeof DGR !== "undefined") {
DGR.max = Math.round(100 * m);
if (DGR.hp > DGR.max)
DGR.hp = DGR.max;
}
if (raBattle() && typeof bwClass === "function") {
BW.max = Math.round((bwClass().hp || 100) * m);
if (BW.hp > BW.max)
BW.hp = BW.max;
}
}
catch (e) { }
}
function raSightWord() { return __ZC(336, 52, this, arguments, new.target); }
function raPowBtnPaint() {
if (typeof document === "undefined" || !document.body)
return;
var show = !!(RAP.wield && raPowHere());
if (!RAP.btn) {
if (!show)
return;
var b = document.createElement("button");
b.id = "ra-pow";
b.type = "button";
b.style.cssText = "position:fixed;right:14px;bottom:168px;z-index:30;width:70px;height:70px;border-radius:50%;border:2px solid rgba(232,200,122,.9);background:rgba(20,18,30,.82);color:#FFE7B0;font:600 26px/1 system-ui,sans-serif;display:none;align-items:center;justify-content:center;flex-direction:column;padding:0;touch-action:manipulation;box-shadow:0 0 14px rgba(232,200,122,.35)";
b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); raPowUse(); });
b.addEventListener("touchstart", function (e) { e.stopPropagation(); }, { passive: true });
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ra-pow"] = 1;
document.body.appendChild(b);
RAP.btn = b;
var s = document.createElement("div");
s.id = "ra-sight";
s.style.cssText = "position:fixed;right:92px;bottom:178px;z-index:30;max-width:min(320px,60vw);background:rgba(20,18,30,.78);color:#F2E6C8;font:500 13px/1.35 system-ui,sans-serif;padding:6px 9px;border-radius:8px;display:none;pointer-events:none";
document.body.appendChild(s);
RAP.sightEl = s;
if (window.matchMedia && matchMedia("(pointer:coarse)").matches) {
b.style.bottom = "auto";
b.style.top = "168px";
s.style.bottom = "auto";
s.style.top = "178px";
}
}
var B = RAP.btn;
B.style.display = show ? "flex" : "none";
if (B.classList.contains("ps-tuck"))
B.classList.remove("ps-tuck");
if (RAP.sightEl)
RAP.sightEl.style.display = show && RAP.sight && RA_POW[RAP.wield].pas.sight ? "block" : "none";
if (!show)
return;
var k = RAP.wield, P = RA_POW[k], d = RA.list[k], left = Math.max(0, Math.ceil((RAP.cd[k] || 0) - raPT()));
B.dataset.left = String(left);
B.title = P.n + ": " + P.actT + (left ? " (ready in " + left + " s)" : " (ready)");
B.setAttribute("aria-label", B.title);
B.innerHTML = "<span>" + d.icon + "</span><span style='font-size:11px;margin-top:3px'>" + (left ? left + " s" : "Z") + "</span>";
B.style.opacity = left ? "0.6" : "1";
if (RAP.sightEl && RAP.sight)
RAP.sightEl.textContent = RAP.sight;
}
function raPowRows(k) {
var P = RA_POW[k];
if (!P)
return [];
return [["Always, while you wield it", P.pasT], ["Its power: " + P.n, P.actT + " Then it rests " + P.cd + " seconds."], ["Where it wakes", "Only where the danger is Risky (level 2) or worse: Ironfray, Pyreline, and any world marked 2 or higher."]];
}
function raPowCard(k) { return __ZC(336, 53, this, arguments, new.target); }
raWieldLoad();
