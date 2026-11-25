/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var WMW_WORLDS = { party: "Jubilee, the Party Planet", battle: "Ironfray", greenwold: "the Greenwold", lounge: "GiGi's Lounge", family: "the Family Houses" };
var WMW_MATS = [
["wmw_seaglass", "Sea glass", "🔹", 3, 8, "Frosted glass worn smooth by the lagoon, picked up on Jubilee's beach."],
["wmw_lostbag", "Lost property", "🎒", 5, null, "Things dropped at Jubilee's festival. The Lost Property tent pays a finder's fee for each one handed in."],
["wmw_teaherbs", "Tea herbs", "🌿", 2, 5, "Mint, lemon balm and chamomile from the herb troughs in GiGi's Conservatory."],
["wmw_peony", "Peonies", "🌺", 4, 9, "Big soft peonies from the cutting beds in the Everbloom Garden."],
["wmw_gyp", "Baby's breath", "🤍", 2, 5, "Clouds of tiny white gypsophila flowers from the Everbloom's cutting beds."],
["wmw_bouquet", "Hand-tied bouquet", "💐", 9, null, "A bouquet tied at the Everbloom's Flower Cart: the prize of the Bouquet Challenge."],
["wmw_rosette", "Ploughing match rosette", "🏵️", 4, null, "A prize rosette from the Greenwold Ploughing Match."]
];
var WMW_SPOTS = [
["wm_jb_glass1", "party", "wmw_seaglass", 256, -170, 1, 3, 20, "Sea glass at the water's edge", "look for sea glass", "glass"],
["wm_jb_glass2", "party", "wmw_seaglass", 240, -213, 1, 3, 20, "Sea glass at the water's edge", "look for sea glass", "glass"],
["wm_jb_shell1", "party", "hx_shell", 133, -137, 2, 4, 20, "Shells on the sand", "pick up shells", "shells"],
["wm_jb_shell2", "party", "hx_shell", 165, -231, 2, 4, 20, "Shells on the sand", "pick up shells", "shells"],
["wm_jb_drift", "party", "cr_wood", 215, -108, 1, 3, 25, "Driftwood washed up", "gather driftwood", "drift"],
["wm_jb_lost1", "party", "wmw_lostbag", -230, -40, 1, 1, 30, "Something dropped by the crowd barrier", "pick it up for Lost Property", "lost"],
["wm_jb_lost2", "party", "wmw_lostbag", -150, -122, 1, 1, 30, "Something left on the Sunset Stage lawn", "pick it up for Lost Property", "lost"],
["wm_jb_lost3", "party", "wmw_lostbag", -165, 72, 1, 1, 30, "Something dropped by the rides", "pick it up for Lost Property", "lost"],
["wm_ll_herbs", "lounge", "wmw_teaherbs", 55.5, 52.4, 2, 3, 20, "The herb troughs", "pick tea herbs", "herbs"],
["wm_ll_roses", "lounge", "roses", 58, 47.8, 1, 3, 25, "GiGi's rose pots", "cut a few roses", "roses"],
["wm_fl_peony", "family", "wmw_peony", 36, 7.8, 1, 3, 25, "The peony bed", "cut peonies", "peony"],
["wm_fl_sweet", "family", "sweetpeas", 42, 7.8, 2, 4, 20, "The sweet pea canes", "pick sweet peas", "sweetpea"],
["wm_fl_gyp", "family", "wmw_gyp", 48, 7.8, 2, 4, 20, "The baby's breath bed", "cut baby's breath", "gyp"]
];
var WMW_STALLS = {
jb_comber: { world: "party", name: "The Beachcomber's Hut", keeper: "Marisol, the beachcomber", x: 160, z: -99,
sells: ["wmw_seaglass", "hx_coconut"], buys: ["wmw_seaglass", "hx_shell", "hx_pearl", "cr_wood", "hx_coconut"],
say: "Marisol walks the tideline every morning. She sells polished sea glass and fresh coconuts, and buys what the lagoon washes up." },
jb_lost: { world: "party", name: "Festival Lost Property", keeper: "the Lost Property clerk", x: -112.5, z: -72,
sells: [], buys: ["wmw_lostbag"],
say: "Hand in anything you find on the festival grounds. Every item is logged and kept for its owner, and the festival pays the finder a fee." },
if_salvage: { world: "battle", name: "The Ironfray Salvage Yard", keeper: "Brannoch, the salvage master", x: -34.5, z: -16,
sells: ["cr_leather", "cr_cloth", "cr_wood", "cr_coal"], buys: ["cr_scrap", "cr_hide", "cr_scale", "cr_ore", "cr_coal", "cr_crystal", "cr_ember", "cr_wood", "cr_steel", "cr_leather", "cr_parts"],
say: "Brannoch weighs what you drag back from the fields: war scrap, hides from the beasts of the Fangmire, ore and crystal. He pays the city's price, and sells leather and canvas for the forge." },
ll_bench: { world: "lounge", name: "The Potting Bench", keeper: "Hyacinth, the conservatory gardener", x: 53.2, z: 57,
sells: ["wmw_teaherbs"], buys: ["wmw_teaherbs", "roses", "lavender", "sweetpeas", "wmw_peony", "wmw_gyp"],
say: "Hyacinth keeps the Conservatory's plants. She sells the tea herbs she grows for the Rose Tea Room, and buys good flowers and herbs for the Lounge's vases." },
fl_cart: { world: "family", name: "The Everbloom Flower Cart", keeper: "Delphine, the flower-cart seller", x: 53, z: 2,
sells: ["hx_ribbon", "wmw_peony", "wmw_gyp"], buys: ["wmw_peony", "wmw_gyp", "sweetpeas", "roses", "lavender", "hx_ribbon", "wmw_bouquet"],
say: "Delphine supplies the Everbloom's florist. She sells ribbon and fresh stems, and buys flowers cut in the garden, or brought from the Greenwold." }
};
var WMW_GAMES = {
gw_plough: { world: "greenwold", name: "The Greenwold Ploughing Match", x: -250, z: -36, min: 0, max: 100, win: 75, secs: 25, gold: 15, reward: "wmw_rosette" },
fl_bouquet: { world: "family", name: "The Bouquet Challenge", x: 56, z: 7, min: 0, max: 5, win: 4, secs: 25, gold: 12, reward: "wmw_bouquet" }
};
var WMW_EMP = { battle: [3100, "The Muster Camp of Ironfray"], party: [4100, "Jubilee Beach and Festival Stalls"], greenwold: [4120, "The Greenwold Show Committee"],
lounge: [4140, "GiGi's Conservatory and Library"], family: [4160, "The Everbloom Garden and Classroom"] };
var WMW_WORK = [
["The Ironfray Armoury", "battle", -22, -28, 9, "Ironfray: the Armoury in the Muster Camp, every weapon on its racks."],
["The Ironfray Field Hospital", "battle", 22, -28, 8, "Ironfray: the Field Hospital, under the green leaf."],
["The Ironfray Salvage Yard", "battle", -38, -16, 7, "Ironfray: the salvage yard by the west palisade."],
["The Ironfray Motor Pool", "battle", 0, 28, 12, "Ironfray: tanks, walkers and war frames, kept running."],
["The War Herald's Pavilion", "battle", 0, -23, 6, "Ironfray: the Herald, the banners and the roll of renown."],
["The Ironfray War Forge", "battle", 32, 0, 7, "Ironfray: the open-sided smithy on the camp's east side."],
["The Muster Camp Barracks", "battle", 0, -40, 12, "Ironfray: the barracks huts on the camp's north side."],
["The Muster Camp Cookhouse", "battle", -8, 4, 6, "Ironfray: the cook fire in the middle of the camp."],
["The War Gate Watch", "battle", 0, 37, 6, "Ironfray: the sentries at the War Gate."]
];
var WMW_JOBS = [
[3100, "battle", "Ironfray armourer", "The Ironfray Armoury", 13, 2, true, [7, 8], [["Fit out a fighter", "station", ["Measure the fighter for a kit", "Fit the helmet and the gorget", "Buckle the plates and check every strap", "Send them out to the Herald"]]]],
[3101, "battle", "Armoury rack keeper", "The Ironfray Armoury", 10, 2, true, [15, 8], [["Keep the racks", "station", ["Take back the weapons left in the camp", "Oil the blades against rust", "Check every haft and string", "Hang each one in its place"]]]],
[3102, "battle", "Ironfray field medic", "The Ironfray Field Hospital", 14, 3, false, [6, 8], [["Treat the wounded", "station", ["Sort the wounded by need", "Press a dressing on a bleeding wound", "Splint a broken arm", "Hand over to the surgeon with a note"]]]],
[3103, "battle", "Ironfray night orderly", "The Ironfray Field Hospital", 11, 2, true, [22, 8], [["Keep the night ward", "station", ["Walk the beds every hour", "Bring water and fresh blankets", "Change the dressings due", "Write the night report"]]]],
[3104, "battle", "Ironfray chief surgeon", "The Ironfray Field Hospital", 17, 1, false, [8, 8], [["Run the Field Hospital", "station", ["Read the night report", "Operate on the worst wounded", "Check the stores of dressings", "Sign the day's book"]]]],
[3105, "battle", "Ironfray quartermaster", "The Ironfray Salvage Yard", 16, 1, false, [8, 8], [["Run the stores", "station", ["Count what came in from the fields", "Set the day's prices with the city", "Issue canvas and leather to the forge", "Balance the store book"]]]],
[3106, "battle", "Salvage yard sorter", "The Ironfray Salvage Yard", 10, 3, true, [6, 8], [["Sort the salvage", "station", ["Unload the carts from the fields", "Sort scrap from good steel", "Bale the hides for the tanner", "Stack it all by kind"]]]],
[3107, "battle", "Salvage yard buyer", "The Ironfray Salvage Yard", 11, 1, true, [14, 8], [["Buy at the counter", "station", ["Weigh what the fighter brings", "Check it is what they say", "Pay the city's price", "Log it in the store book"]]]],
[3108, "battle", "Motor Pool mechanic", "The Ironfray Motor Pool", 13, 2, false, [7, 8], [["Service a machine", "station", ["Check the tracks or the legs", "Change the oil and the filters", "Patch the armour plates", "Run the engine up and sign it off"]]]],
[3109, "battle", "Motor Pool fuel hand", "The Ironfray Motor Pool", 10, 2, true, [15, 8], [["Fuel and clean the machines", "station", ["Roll out the fuel bowser", "Fill each machine in turn", "Wash off the mud of the fields", "Park them in their bays"]]]],
[3110, "battle", "Ironfray herald", "The War Herald's Pavilion", 12, 2, true, [8, 8], [["Keep the roll of renown", "station", ["Meet the fighters at the pavilion", "Enter their banners in the roll", "Cry the day's news across the camp", "Post the roll of renown"]]]],
[3111, "battle", "Banner keeper", "The War Herald's Pavilion", 10, 1, true, [16, 8], [["Keep the banners", "station", ["Lower the banners at dusk", "Mend any torn cloth", "Fold and store them dry", "Raise the night pennants"]]]],
[3112, "battle", "War Forge striker", "The Ironfray War Forge", 12, 2, true, [8, 8], [["Strike for the forgemaster", "station", ["Bank the hearth", "Heat the bar to orange", "Strike where the forgemaster taps", "Quench and stack the work"]]]],
[3113, "battle", "War Forge bellows hand", "The Ironfray War Forge", 10, 1, true, [16, 8], [["Keep the hearth going", "station", ["Fetch coal from the store", "Work the bellows steadily", "Rake out the clinker", "Sweep the forge floor"]]]],
[3114, "battle", "Barracks orderly", "The Muster Camp Barracks", 10, 2, true, [6, 8], [["Keep the barracks", "station", ["Air the huts", "Change the bedding on the bunks", "Sweep out the mud", "Check the stoves are safe"]]]],
[3115, "battle", "Muster Camp cook", "The Muster Camp Cookhouse", 10, 2, true, [5, 8], [["Feed the camp", "station", ["Light the cook fire", "Make the stew and the bread", "Serve the fighters in line", "Scrub the pots"]]]],
[3116, "battle", "War Gate sentry", "The War Gate Watch", 11, 3, true, [6, 8], [["Keep the gate", "station", ["Take over the watch", "Check everyone coming through", "Keep the Truce Ground peaceful", "Hand over the watch with the log"]]]],
[3117, "battle", "Ironfray drill instructor", "The Ironfray Armoury", 13, 1, false, [9, 8], [["Teach World Learning: The Field of Battle", "station", ["Meet the learners at the Armoury", "Teach the lesson where it happens", "Ask the questions", "Stamp the record"]]]],
[4101, "party", "Jubilee sound and music tutor", "Jubilee Festival Grounds", 12, 1, false, [12, 8], [["Teach World Learning: Sound and Festivals", "station", ["Meet the learners by the stages", "Teach the lesson where it happens", "Ask the questions", "Stamp the record"]]]],
[4102, "party", "Beachcomber's hut keeper", "Jubilee Beach Club", 10, 1, true, [9, 8], [["Keep the Beachcomber's Hut", "station", ["Walk the tideline at dawn", "Sort and rinse the sea glass", "Serve the customers", "Count the takings"]]]],
[4103, "party", "Lost Property clerk", "Jubilee Festival Grounds", 10, 2, true, [14, 8], [["Keep Lost Property", "station", ["Log each item handed in", "Pay the finder's fee", "Match items to the owners who ask", "Box up the night's finds"]]]],
[4121, "greenwold", "Ploughing match steward", "The Greenwold Gate", 11, 1, true, [8, 8], [["Steward the Ploughing Match", "station", ["Peg out the plots", "Set the plough for each ploughman", "Judge the furrows with the judge", "Pin on the rosettes"]]]],
[4141, "lounge", "GiGi's conservatory gardener", "GiGi's Lounge", 11, 1, true, [8, 8], [["Keep the Conservatory", "station", ["Water the roses and the orchids", "Pick the tea herbs for the tea room", "Pot on the young plants", "Keep the Potting Bench"]]]],
[4142, "lounge", "GiGi's games historian", "GiGi's Lounge", 12, 1, false, [11, 8], [["Teach World Learning: Games of Chance and Skill", "station", ["Meet the learners at the tables", "Teach the lesson where it happens", "Ask the questions", "Stamp the record"]]]],
[4161, "family", "Everbloom flower-cart seller", "The Everbloom Wedding House", 10, 1, true, [8, 8], [["Keep the Flower Cart", "station", ["Cut the stems in the cool of the morning", "Stand them in fresh water", "Serve the customers", "Run the Bouquet Challenge"]]]],
[4162, "family", "Everbloom family-life tutor", "The Everbloom Wedding House", 12, 1, false, [10, 8], [["Teach World Learning: Family and Celebration", "station", ["Meet the learners in the garden or at Hearthside", "Teach the lesson where it happens", "Ask the questions", "Stamp the record"]]]]
];
var WMW_HOMES = {
party: { style: "lodge", face: { x: -280, z: 110 }, quarter: "The Glamping Field, Jubilee", price: 16000, rent: 420,
note: "A safari-tent lodge on a timber deck at the edge of Jubilee's festival field, with a real bed, a stove and a view of the ringed giant.",
lots: [["Glamping Lodge 1", -318, 162], ["Glamping Lodge 2", -296, 170], ["Glamping Lodge 3", -274, 166], ["Glamping Lodge 4", -252, 172], ["Glamping Lodge 5", -230, 164], ["Glamping Lodge 6", -340, 140]] },
battle: { style: "barracks", face: { x: 0, z: 0 }, quarter: "The Muster Camp Barracks, Ironfray", price: null, rent: 150,
note: "A timber barracks hut inside the Muster Camp's palisade, on the Truce Ground where nobody fights. Let by the week to dreamers aged 18 and over.",
lots: [["Barracks Hut 1", -7, -39], ["Barracks Hut 2", 7, -39], ["Barracks Hut 3", -38, 7], ["Barracks Hut 4", 38, 12]] }
};
var WMW_COURSES = {
"world-jubilee": { title: "World Learning: Sound and Festivals", short: "Sound and Festivals", where: "Jubilee, the Party Planet", job: 4101, cert: "Sound Savvy" },
"world-ironfray": { title: "World Learning: The Field of Battle", short: "The Field of Battle", where: "Ironfray (18 and over)", job: 3117, cert: "Field Ready" },
"world-gigi": { title: "World Learning: Games of Chance and Skill", short: "Games of Chance and Skill", where: "GiGi's Lounge", job: 4142, cert: "Games Historian" },
"world-family": { title: "World Learning: Family and Celebration", short: "Family and Celebration", where: "the Everbloom Wedding House and Hearthside", job: 4162, cert: "Family Friend" }
};
var WMW_LESSONS = [
{ k: "jb_loud", course: "world-jubilee", n: 1, w: "party", x: -100, z: -104, title: "How loud is too loud?",
real: "Sound is measured in decibels (dB). Ordinary talk is about 60 dB; close to a festival's speakers it can pass 100 dB. Health and safety guidance says 85 dB is safe for about 8 hours, and every 3 dB more halves the safe time: at 100 dB it is about 15 minutes.",
science: "The decibel scale is logarithmic: each 10 dB more is ten times the sound energy, and sounds roughly twice as loud to us. Loud sound wears out the tiny hair cells in the inner ear, and they do not grow back. Foam or musicians' earplugs take about 15 to 30 dB off.",
word: ["Decibel", "a tenth of a bel, the unit for how strong a sound is, named after Alexander Graham Bell."],
tryit: "The first-aid tent gives out earplugs free. Stand by the speaker stacks of the Main Stage, then walk back to the mixing desk: the further you go, the safer you are.",
quiz: [["About how long is 100 dB safe for, by the usual guidance?", "About 15 minutes", "About 8 hours", "All night"], ["What does 10 dB more mean?", "Ten times the sound energy", "One more speaker", "Ten per cent louder"]] },
{ k: "jb_bass", course: "world-jubilee", n: 2, w: "party", x: -236, z: 42, title: "Why the bass carries",
real: "Sound travels through air at about 343 metres a second at 20 °C. People hear from about 20 Hz, a low rumble, to about 20,000 Hz, a thin whistle, and the top end fades as we get older.",
science: "A sound's wavelength is its speed divided by its frequency, so a 50 Hz bass note is about 6.9 metres long while a 5,000 Hz note is under 7 centimetres. Long waves bend round tents and people (diffraction), and air soaks up high notes faster than low ones, so from far away you mostly hear the bass.",
word: ["Frequency", "how many times a sound wave vibrates each second, measured in hertz (Hz)."],
tryit: "Walk away from the Main Stage across the field: the cymbals fade first and the bass line is the last thing you hear.",
quiz: [["Why does the bass carry further than the treble?", "Long waves bend round things and air absorbs high notes faster", "Bass speakers are always bigger", "Low notes travel faster than high ones"], ["About how fast does sound travel in air?", "About 343 metres a second", "About 3 metres a second", "As fast as light"]] },
{ k: "if_armour", course: "world-ironfray", n: 1, w: "battle", x: -12, z: -27, title: "Armour through the ages",
real: "Mail, rings of iron linked into a shirt, was in use by the third century BC. Full suits of plate armour were worn in Europe from about 1400. A full harness weighed about 15 to 25 kilograms, less than a modern soldier's pack, and was spread over the whole body, so a fit knight could run, climb and mount a horse.",
science: "Mail stops cuts but not the force of a blow, so it was worn over a quilted padded coat, the gambeson, to soak up the shock. Plate deflects a blow by making it glance off a curved surface. Modern body armour uses layers of tough fibres and ceramic plates that spread a bullet's energy over a wide area.",
word: ["Gambeson", "a thick quilted coat, worn under mail or on its own, that cushions blows."],
tryit: "Look along the Armoury's racks: from the bronze age to the star weapons, every kind of armour was an answer to the weapon of its day.",
quiz: [["About how much did a full suit of plate armour weigh?", "About 15 to 25 kilograms", "About 100 kilograms", "Less than a kilogram"], ["Why was a padded gambeson worn under mail?", "To soak up the shock of a blow", "To keep the mail clean", "It was only for parades"]] },
{ k: "if_aid", course: "world-ironfray", n: 2, w: "battle", x: 13, z: -28, title: "First aid in the field",
real: "In the 1790s Dominique-Jean Larrey, a French army surgeon, began treating the wounded by how urgent their injuries were, not by rank, and sent light horse-drawn 'flying ambulances' onto the field. Sorting the injured this way is still called triage.",
science: "For heavy bleeding, press firmly and directly on the wound and keep pressing. For bleeding from an arm or leg that will not stop, a tourniquet goes on 5 to 7 centimetres (two or three inches) above the wound, tight enough to stop it, and the time is written down. Someone unconscious but breathing is laid in the recovery position so their airway stays open.",
word: ["Triage", "from the French trier, to sort: deciding who needs help first."],
tryit: "Watch the field medics at the Field Hospital sort the wounded by the tent door before anyone goes inside.",
quiz: [["What is the first thing to do for a heavily bleeding wound?", "Press firmly and directly on it", "Wash it in cold water", "Leave it uncovered to dry"], ["What does triage mean?", "Sorting the injured by who needs help first", "A kind of bandage", "Carrying the wounded on a stretcher"]] },
{ k: "ll_mahjong", course: "world-gigi", n: 1, w: "lounge", x: 16, z: 8.5, title: "Where mahjong came from",
real: "Mahjong took shape in China in the middle of the 1800s, under the Qing dynasty, and spread to America and Europe in the early 1920s, where it became a craze. A standard Chinese set has 144 tiles.",
science: "The set is built like a deck of cards: three suits (dots, bamboos and characters) numbered 1 to 9, four of each, plus four winds and three dragons, four of each, which makes 136, and eight flower and season tiles. Players draw and discard to build a hand of sets, so it is a game of memory, counting and odds as much as luck.",
word: ["Pung", "three identical tiles, one of the sets a winning hand is made of."],
tryit: "Sit at a Mahjong table and count the suits: 9 numbers × 4 copies × 3 suits is 108 tiles before the honours are added.",
quiz: [["Where did mahjong come from?", "China, in the 1800s", "Ancient Rome", "America, in the 1950s"], ["How many tiles are in a standard Chinese set?", "144", "52", "200"]] },
{ k: "ll_bingo", course: "world-gigi", n: 2, w: "lounge", x: -13, z: 9, title: "The long story of bingo",
real: "Bingo comes from an Italian lottery game of the 1500s. It reached France in the late 1700s as le lotto, and in the 1800s German teachers used versions of it to teach spelling and sums. In 1929 an American toy seller, Edwin S. Lowe, saw a game called beano played with dried beans at a carnival in Georgia, and sold it as bingo.",
science: "In the American game there are 75 balls and a five-by-five card with a free square in the middle; in the British game there are 90 balls and tickets of three rows. Every ball is equally likely to come out, so no card is luckier than another: the more cards in play, the more chances.",
word: ["Caller", "the person who draws the balls and calls out the numbers."],
tryit: "Look at the great board in the Bingo Hall: the caller lights each number as it is drawn.",
quiz: [["What did players first use to mark their cards at the carnival game Lowe saw?", "Dried beans", "Gold coins", "Chalk"], ["How many balls are there in the American game?", "75", "90", "52"]] },
{ k: "ll_cards", course: "world-gigi", n: 3, w: "lounge", x: 14, z: -33, title: "Playing cards and patience",
real: "Playing cards were used in China by the 800s, and reached Europe in the late 1300s, probably from the Mamluk lands of Egypt and Syria. The French suits used today, hearts, diamonds, clubs and spades, appeared in about 1480. Klondike solitaire is named after the Klondike gold rush in Canada's Yukon in the 1890s.",
science: "French suits caught on because they were simple shapes that could be stencilled in two colours, so cards became cheap to print. Solitaire games are called patience in Britain. Klondike is not always winnable: some deals can never come out, however well you play.",
word: ["Patience", "the British name for card games played alone, like Klondike and FreeCell."],
tryit: "Deal a game of Klondike at a solitaire table, and count the four suits as you build them up from the aces.",
quiz: [["Roughly when did playing cards reach Europe?", "The late 1300s", "The 1900s", "Before the Romans"], ["What is solitaire called in Britain?", "Patience", "Bridge", "Snap"]] },
{ k: "fl_customs", course: "world-family", n: 1, w: "family", x: 30, z: -14, title: "Wedding customs around the world",
real: "Queen Victoria wore white lace when she married in 1840, and white wedding dresses became the fashion in many countries after her. At a Hindu wedding the couple take seven steps together round a sacred fire, one vow for each step. At a Jewish wedding the couple stand under a canopy, the chuppah, and a glass is broken at the end. At a Shinto wedding in Japan the couple share sake from three cups, three sips from each.",
science: "Customs carry meanings: the canopy stands for the home the couple will build, the seven steps for the journey they will share, the shared cup for the families being joined. Many couples today mix the customs of both families.",
word: ["Chuppah", "the canopy a couple stand under at a Jewish wedding: open on all sides, like a welcoming home."],
tryit: "Walk under the rose arch at the end of the garden aisle: arches and canopies stand over couples in weddings all over the world.",
quiz: [["Who made the white wedding dress fashionable after 1840?", "Queen Victoria", "Napoleon", "Cleopatra"], ["How many steps does a couple take round the fire at a Hindu wedding?", "Seven", "Two", "Twelve"]] },
{ k: "fl_newborn", course: "world-family", n: 2, w: "family", x: 944, z: 32, title: "Caring for a newborn",
real: "A newborn baby sleeps about 14 to 17 hours a day, in short stretches, and feeds about 8 to 12 times every 24 hours. For the first months a baby cannot hold up its own head, so it is always supported when held.",
science: "The safest way for a baby to sleep is on its back, in its own cot, on a firm flat mattress with nothing loose around it. Holding a baby skin to skin on a carer's chest helps keep its temperature and heartbeat steady, and helps the two bond.",
word: ["Skin-to-skin", "holding a baby, in just a nappy, against your bare chest: it calms both of you."],
tryit: "Ask the fostering and adoption officer in the training room about the course for new carers: babies wait for families here too.",
quiz: [["Which way should a baby be laid down to sleep?", "On its back", "On its tummy", "Propped up on pillows"], ["About how many hours a day does a newborn sleep?", "About 14 to 17", "About 6", "About 22, without waking"]] }
];
var WMW = { built: {}, spots: [], picked: {}, busy: false, stock: null, stockAt: 0, guide: null, btn: null, menuBtn: null, game: null, t: 0,
les: { cur: null, ans: {}, t0: 0, msg: "" }, noSql: false };
var WMW_MB = {};
WMW_MATS.forEach(function (m) { WMW_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; });
var WMW_STALL_JOB = { jb_comber: 4102, jb_lost: 4103, if_salvage: 3107, ll_bench: 4141, fl_cart: 4161 };
try {
WMW.picked = JSON.parse(localStorage.getItem("somnu.wmw.picked") || "{}") || {};
}
catch (e) {
WMW.picked = {};
}
(function () {
WMW_MATS.forEach(function (m) {
var o = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] };
if (typeof FG_MB !== "undefined" && !FG_MB[m[0]])
FG_MB[m[0]] = o;
if (typeof HX_MB !== "undefined" && !HX_MB[m[0]])
HX_MB[m[0]] = o;
});
})();
function wmwMat(k) { return __ZC(327, 0, this, arguments, new.target); }
function wmwOn() { return typeof WLD !== "undefined" && !!WLD.on && !!WMW_WORLDS[WLD.on]; }
function wmwWorld() { return wmwOn() ? WLD.on : null; }
function wmwSigned() { return typeof signedIn === "function" && signedIn(); }
function wmwKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function wmwRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function wmwMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function wmwSoon() { return "This opens soon."; }
function wmwSay(html) { if (typeof setStatus === "function")
setStatus(html); }
function wmwTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function wmwL() { return typeof worldLocal === "function" ? worldLocal() : { x: 0, y: 0, z: 0 }; }
function wmwTitle(t, col) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (col || "#FFE7B0") + "'>" + t + "</div>"; }
function wmwHead(t) { return "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function wmwGround(w, x, z) {
try {
if (w === "party")
return ppGround(x, z, 0) || 0;
if (w === "battle")
return bwSupport(x, z, 0);
if (w === "greenwold")
return gwHeight(x, z);
}
catch (e) { }
return 0;
}
function wmwSpotList(w) { return __ZC(327, 1, this, arguments, new.target); }
function wmwAddSpot(w, o) { var L = wmwSpotList(w); if (L)
L.push(o); return o; }
function wmwSolid(w, o) {
if (w === "battle" && typeof bwSolid === "function")
return bwSolid(o);
var L = w === "party" ? PP.solids : w === "greenwold" ? GW.solids : w === "lounge" ? LL.solids : w === "family" ? FL.solids : null;
if (L)
L.push(o);
return o;
}
function wmwGather(S) { return __ZC(327, 2, this, arguments, new.target); }
function wmwGive(id, regrow, ok, no) { return __ZC(327, 3, this, arguments, new.target); }
function wmwSave() { try {
var n = Date.now(), o = {};
Object.keys(WMW.picked).forEach(function (k) { if (WMW.picked[k] > n)
o[k] = WMW.picked[k]; });
WMW.picked = o;
localStorage.setItem("somnu.wmw.picked", JSON.stringify(o));
}
catch (e) { } }
setInterval(function () { var n = Date.now(); WMW.spots.forEach(function (S) { if (S.g && S.g.scale.x < 1 && !(WMW.picked[S.id] > n))
S.g.scale.setScalar(1); }); }, 15000);
function wmwStock(force) {
if (!wmwSigned())
return Promise.resolve([]);
if (!force && WMW.stock && Date.now() - WMW.stockAt < 20000)
return Promise.resolve(WMW.stock);
return wmwRpc("my_stock").then(function (rows) { WMW.stock = rows || []; WMW.stockAt = Date.now(); return WMW.stock; }).catch(function () { return WMW.stock || []; });
}
function wmwHave(k) { var r = (WMW.stock || []).filter(function (s) { return s.kind === k; })[0]; return r ? (+r.amount || 0) : 0; }
function wmwSellPrice(k) { var r = (WMW.stock || []).filter(function (s) { return s.kind === k; })[0]; return r && r.buys != null ? +r.buys : wmwMat(k).buys; }
function wmwStall(id, msg) { return __ZC(327, 4, this, arguments, new.target); }
function wmwHire(id) {
var w = WMW_STALLS[id].world, key = null, jid = WMW_STALL_JOB[id];
WMW_JOBS.forEach(function (j) { if (j[0] === jid)
key = j[3]; });
if (key && typeof ahOpen === "function")
ahOpen(key);
}
function wmwBuy(id, k, n) { return __ZC(327, 5, this, arguments, new.target); }
function wmwSell(id, k, n) { return __ZC(327, 6, this, arguments, new.target); }
function wmwGuideTo(w, x, z, name) { return __ZC(327, 7, this, arguments, new.target); }
function wmwGuideLine() { return __ZC(327, 8, this, arguments, new.target); }
function wmwFamSide(x) { return x > 500 ? "fam" : "wed"; }
function wmwLog(course) { var st = (typeof eduStore === "function") ? eduStore() : {}; return st[course] || (st[course] = {}); }
function wmwLDone(l) { return !!wmwLog(l.course)[l.n]; }
function wmwLList(course) { return WMW_LESSONS.filter(function (l) { return l.course === course; }); }
function wmwLCount(course) { return wmwLList(course).filter(wmwLDone).length; }
function wmwLOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 5 + k * 2 + l.k.length) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function wmwLesson(l) { return __ZC(327, 9, this, arguments, new.target); }
function wmwLCheck(l) { return __ZC(327, 10, this, arguments, new.target); }
function wmwCourse(course) { return __ZC(327, 11, this, arguments, new.target); }
function wmwLectern(G, w, l) { return __ZC(327, 12, this, arguments, new.target); }
(function () {
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () {
var h = er.apply(this, arguments);
Object.keys(WMW_COURSES).forEach(function (c) {
var C = WMW_COURSES[c], n = wmwLCount(c), all = wmwLList(c).length;
h += '<div style="margin-top:6px">' + esc(C.title) + ', in ' + esc(C.where) + ': ' + n + ' of ' + all + ' lessons learned.' + (n >= all ? ' <b style="color:#2A4A8A">' + esc(C.cert) + '.</b>' : '') + '</div>';
});
return h;
};
}
})();
function wmwHub() { return __ZC(327, 13, this, arguments, new.target); }
function wmwBest(k) { try {
return +localStorage.getItem("somnu.wmw.best." + k) || 0;
}
catch (e) {
return 0;
} }
function wmwSetBest(k, v) { try {
localStorage.setItem("somnu.wmw.best." + k, String(v));
}
catch (e) { } }
function wmwHudBtn() {
if (WMW.btn || !document.body)
return WMW.btn;
var b = document.createElement("button");
b.id = "wmw-btn";
b.type = "button";
b.textContent = "🧭 Things to do";
b.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(328px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #8FB4E8;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif";
b.onclick = function () { wmwHub(); };
document.body.appendChild(b);
WMW.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["wmw-btn"] = 1;
return b;
}
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-wmw"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-wmw";
b.title = "Work, trade, gathering, games and lessons in this world";
b.textContent = "🧭 Things to do here";
b.style.display = "none";
b.onclick = function () { wmwHub(); };
bar.appendChild(b);
WMW.menuBtn = b;
}
if (typeof document !== "undefined") {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
}
})();
var WMW_WP = {};
WMW_WORK.forEach(function (r) { WMW_WP[r[0]] = { key: r[0], world: r[1], x: r[2], z: r[3], r: r[4] }; });
function wmwIsJob(job) { var id = +(job && (job.job_id || job.id)) || 0; return (id >= 3100 && id <= 3199) || !!(job && WMW_WP[job.workplace]); }
function wmwWpNear() {
if (wmwWorld() !== "battle")
return null;
var L = wmwL(), best = null, bd = 1e9;
WMW_WORK.forEach(function (r) { var d = Math.hypot(L.x - r[2], L.z - r[3]); if (d < r[4] && d < bd) {
bd = d;
best = WMW_WP[r[0]];
} });
return best;
}
(function () {
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (job && wmwIsJob(job))
return typeof WLD !== "undefined" && WLD.on === "battle"; return os.apply(this, arguments); };
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () { if (typeof WLD !== "undefined" && WLD.on === "battle") {
if (typeof walkMode !== "undefined" && !walkMode)
return null;
var W = wmwWpNear();
return W ? { key: W.key, inside: true } : null;
} return aw.apply(this, arguments); };
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
var W = WMW_WP[key];
if (!W)
return sw.apply(this, arguments);
if (wmwWorld() === "battle")
return wmwGuideTo("battle", W.x, W.z, W.key);
wmwSay("<b>" + esc(key) + "</b> is in Ironfray's Muster Camp, through the War Gate in the Nightmare Wilds (18 and over): ☰ Menu, ⚔️ Ironfray points the way to the gate.");
};
}
})();
function wmwTick(dt) {
WMW.t += dt;
var on = wmwOn() && (typeof walkMode === "undefined" || walkMode);
var b = wmwHudBtn();
if (b) {
var tk = document.getElementById("talk"), show = on && !(WLD.card && WLD.card.style.display === "block") && !(tk && tk.classList.contains("open"));
if ((b.style.display === "block") !== show)
b.style.display = show ? "block" : "none";
}
if (WMW.menuBtn) {
var ms = wmwOn() ? "" : "none";
if (WMW.menuBtn.style.display !== ms)
WMW.menuBtn.style.display = ms;
}
if (!wmwOn()) {
if (WMW.game && WMW.game.world)
WMW.game = null;
return;
}
if (WMW.game && WMW.game.world !== WLD.on)
WMW.game = null;
if (typeof wmwGamesTick === "function")
wmwGamesTick(dt);
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
wmwTick(dt);
}
catch (e) {
if (window.console)
console.warn("[world-more 10]", e);
} };
}
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (html) { if (html && wmwOn() && WMW.guide) {
var x = "";
try {
x = wmwGuideLine();
}
catch (e) { }
if (x)
html = html + x;
} return wb.call(this, html); };
}
})();
function wmwBake(grp) {
if (typeof bwBake !== "function")
return grp;
try {
return bwBake(grp);
}
catch (e) {
return grp;
}
}
function wmwPerson(G, w, seed, o, x, z, ry) {
var g = wPerson(seed, o);
g.position.set(x, wmwGround(w, x, z), z);
g.rotation.y = ry || 0;
G.add(g);
return g;
}
function wmwSign(G, w, lines, x, y, z, ry, wd, ht, bg, fg) {
var s = wSign(lines, wd || 3.2, ht || 1, bg || "#2A2018", fg || "#F0DCA8");
s.position.set(x, wmwGround(w, x, z) + y, z);
s.rotation.y = ry || 0;
G.add(s);
return s;
}
function wmwProp(look) { return __ZC(327, 14, this, arguments, new.target); }
function wmwSpotsBuild(w, G) { return __ZC(327, 15, this, arguments, new.target); }
function wmwStallSpot(id) { var T = WMW_STALLS[id]; wmwAddSpot(T.world, { x: T.x, z: T.z, r: 2.6, name: T.name + " (" + String(T.keeper).split(",")[0] + ")", verb: "trade", fn: function () { wmwStall(id); } }); }
function wmwLecterns(w, G) { WMW_LESSONS.forEach(function (l) { if (l.w === w)
wmwLectern(G, w, l); }); }
function wmwDressParty(G) { return __ZC(327, 16, this, arguments, new.target); }
function wmwDressBattle(G) { return __ZC(327, 17, this, arguments, new.target); }
function wmwDressGreenwold(G) { return __ZC(327, 18, this, arguments, new.target); }
function wmwDressLounge(G) { return __ZC(327, 19, this, arguments, new.target); }
function wmwDressFamily(G) { return __ZC(327, 20, this, arguments, new.target); }
if (typeof WH_STYLE !== "undefined" && typeof WH_PLAN !== "undefined") {
WH_STYLE.lodge = { w: 8, d: 6.5, h: 2.9, wall: 0xE6DAC2, trim: 0x6A4A2E, roof: 0xDCCFB4, roofEdge: 0x8A6A44, floor: 0x9A7448, door: 0x6A4A2E, rug: 0x8A4A3A, quilt: 0x3A5A6A, feature: "chest", pitch: 0.85 };
WH_STYLE.barracks = { w: 7, d: 6, h: 2.8, wall: 0x6A5A44, trim: 0x3A2E22, roof: 0x5A5040, roofEdge: 0x3A3020, floor: 0x5A4A38, door: 0x4A3A28, rug: 0x5A3A2A, quilt: 0x4A5A3A, feature: "chest", pitch: 0.45 };
Object.keys(WMW_HOMES).forEach(function (k) { var H = WMW_HOMES[k]; WH_PLAN[k] = { style: H.style, face: H.face, lots: H.lots }; });
if (typeof WR_WORLD !== "undefined") {
WR_WORLD.party = "Jubilee, the Party Planet";
WR_WORLD.battle = "Ironfray";
}
if (typeof WR_ORDER !== "undefined") {
if (WR_ORDER.indexOf("party") < 0)
WR_ORDER.push("party");
if (WR_ORDER.indexOf("battle") < 0)
WR_ORDER.push("battle");
}
}
function wmwHomes(k, W, G, solids) {
if (typeof whRaise !== "function" || typeof WH_PLAN === "undefined" || !WH_PLAN[k])
return;
try {
whRaise(k, W, G, solids);
}
catch (e) {
if (window.console)
console.warn("[world-more 10] homes", k, e);
}
}
var WMW_DRESS = { party: wmwDressParty, battle: wmwDressBattle, greenwold: wmwDressGreenwold, lounge: wmwDressLounge, family: wmwDressFamily };
(function () {
Object.keys(WMW_DRESS).forEach(function (w) {
var W = typeof WORLDS !== "undefined" && WORLDS[w];
if (!W)
return;
var b = W.build;
W.build = function (G) {
var r = b.apply(this, arguments);
WMW.spots = WMW.spots.filter(function (S) { return S.world !== w; });
try {
WMW_DRESS[w](G);
}
catch (e) {
if (window.console)
console.warn("[world-more 10] dress", w, e);
}
return r;
};
if (W.g)
try {
WMW_DRESS[w](W.g);
}
catch (e) { }
if (WMW_HOMES[w] && typeof whGround === "function") {
var g0 = W.ground;
W.ground = function (x, z, feet) { return whGround(w, x, z, g0.apply(this, arguments)); };
}
W.places = (W.places || []).concat(WMW_WORK.filter(function (r) { return r[1] === w; }).map(function (r) { return { name: r[0], x: r[2], z: r[3] }; }));
});
})();
function wmwPlayStart(key) {
WMW.runOk = false;
if (!wmwSigned())
return;
wmwRpc("wmw_play_start", { p_key: key }).then(function (o) { WMW.runOk = !!(o && o.ok); }).catch(function (e) { if (wmwMissing(e))
WMW.noSql = true; });
}
function wmwPlayDone(key, score, won, after) { return __ZC(327, 21, this, arguments, new.target); }
function wmwPloughCard(msg) { return __ZC(327, 22, this, arguments, new.target); }
function wmwPloughNudge(dir) { var P = WMW.game; if (!P || P.kind !== "plough")
return; P.d -= dir * 0.2; P.v *= 0.45; wmwTone(dir < 0 ? 294 : 330, 0.05); wmwPloughCard(); }
function wmwPloughTick(dt) { return __ZC(327, 23, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
var P = WMW.game;
if (!P || P.kind !== "plough")
return;
if (e.code === "ArrowLeft" || e.code === "KeyA") {
e.preventDefault();
e.stopImmediatePropagation();
wmwPloughNudge(-1);
}
else if (e.code === "ArrowRight" || e.code === "KeyD") {
e.preventDefault();
e.stopImmediatePropagation();
wmwPloughNudge(1);
}
}, true);
var WMW_BQ = { flowers: [["peonies", "Peonies", "🌺"], ["sweetpeas", "Sweet peas", "🌸"], ["roses", "Roses", "🌹"], ["gyp", "Baby's breath", "🤍"], ["lavender", "Lavender", "🪻"]],
ribbons: ["ivory", "blush", "gold", "sage"],
who: ["a June bride", "a garden wedding", "a christening", "a golden anniversary", "a bridesmaid", "a mother of the bride", "a registry wedding", "a winter wedding"] };
function wmwBqOrder() { return __ZC(327, 24, this, arguments, new.target); }
function wmwBqName(k) { var f = WMW_BQ.flowers.filter(function (q) { return q[0] === k; })[0]; return f ? f[2] + " " + f[1] : k; }
function wmwBouquetCard(msg) { return __ZC(327, 25, this, arguments, new.target); }
function wmwBqTie() { return __ZC(327, 26, this, arguments, new.target); }
function wmwBqTick(dt) {
var B = WMW.game;
if (!B || B.kind !== "bouquet")
return;
if (!WLD.card || WLD.card.style.display !== "block") {
WMW.game = null;
return;
}
if (B.show > 0) {
var was = Math.ceil(B.show);
B.show -= dt;
if (B.show <= 0) {
B.show = 0;
wmwBouquetCard();
}
else if (Math.ceil(B.show) !== was)
wmwBouquetCard();
}
}
function wmwGamesTick(dt) { wmwPloughTick(dt); wmwBqTick(dt); }
var WMS_MATS = [
["wms_pear", "Pears", "🍐", 2, 4, "From the orchard on Ithaca where old Laertes gardens: thirteen pear trees, as Homer counts them."],
["wms_oil", "Olive oil", "🫙", 6, 10, "Pressed at Ithaca's olive press. For lamps, for cooking, and for rubbing on after a swim."],
["wms_fleece", "Raw fleece", "🧶", 3, null, "Wool caught on the thorn bushes where the sheep of the Cyclopes' island graze."],
["wms_cheese", "Sheep's cheese", "🧀", 5, 9, "Made at the goatherds' dairy, the old way: milk curdled with rennet, pressed in wicker baskets."],
["wms_barley", "Barley", "🌾", 1, 3, "Grown on the terraces inside Aeolia's bronze wall. Barley was the Greeks' everyday grain."],
["wms_meal", "Barley meal", "🥣", 3, 6, "Barley ground between millstones at the Mill of the Winds. Homer calls it the marrow of men."],
["wms_jujube", "Jujube fruit", "🍒", 2, null, "The sweet fruit many scholars think was the real 'lotus' of the Lotus-Eaters. Quite safe: it tastes rather like a date."],
["wms_herb", "Wild herbs", "🌿", 2, 5, "Thyme, sage, mint and rosemary from the slopes of Aeaea, where Circe gathered hers."],
["wms_honey", "Wild honey", "🍯", 4, 8, "From the hives at the herb-woman's porch on Aeaea."],
["wms_coral", "Red coral", "🪸", 9, null, "Precious red coral grows on the rocks round the Sirens' island. You can only dive for it with your ears stopped."],
["wms_grape", "Grapes", "🍇", 2, null, "From the vine heavy with grapes over Calypso's cave on Ogygia."],
["wms_fennel", "Wild fennel", "🌱", 2, null, "Tall, feathery and smelling of aniseed, it grows wild on Thrinacia. The Sun's cattle leave it alone, and so may you take it."],
["wms_stone", "Fallen building stone", "🪨", 3, null, "Squared blocks the giants of Telepylus threw down from their cliffs. Masons buy them."],
["wms_willow", "Willow withies", "🧺", 2, null, "Thin willow rods from Persephone's grove on the Cimmerian shore, for weaving baskets and fish traps."],
["wms_reed", "Eurotas reeds", "🎋", 2, null, "Reeds from the shore below Lacedaemon. Spartan boys made their beds of reeds they pulled by hand from the river Eurotas."],
["wms_sherd", "Potsherd", "🏺", 3, null, "A broken piece of an old pot, from the dig at Troy. The finds hut records every one."]
];
var WMS_SPOTS = [
["wms_s_pear", "sea", "wms_pear", 3850, -2310, 2, 4, 25, "Laertes' orchard on Ithaca", "pick pears", "pears"],
["wms_s_fleece", "sea", "wms_fleece", -3180, -2750, 2, 3, 25, "Fleece on the thorn bushes", "pull off the wool", "fleece"],
["wms_s_barley", "sea", "wms_barley", 1550, -5060, 2, 4, 20, "The barley terraces of Aeolia", "cut barley", "barley"],
["wms_s_jujube", "sea", "wms_jujube", -1760, 2400, 2, 4, 25, "A jujube thicket", "pick the fruit", "jujube"],
["wms_s_herb", "sea", "wms_herb", -4985, 775, 2, 4, 20, "Herbs on Circe's hillside", "pick herbs", "herbs"],
["wms_s_grape", "sea", "wms_grape", -5960, -5390, 2, 4, 25, "A wild vine on Ogygia", "pick grapes", "grapes"],
["wms_s_fennel", "sea", "wms_fennel", 5160, 6345, 2, 4, 20, "Wild fennel on Thrinacia", "cut fennel", "fennel"],
["wms_s_stone", "sea", "wms_stone", -6370, -2165, 1, 3, 25, "Stones the giants threw", "take a block", "stone"],
["wms_s_willow", "sea", "wms_willow", -4245, 6215, 2, 4, 20, "Willows in Persephone's grove", "cut withies", "willow"],
["wms_s_reed", "sea", "wms_reed", -555, -3953, 2, 4, 20, "Reeds on the shore of Lacedaemon", "pull reeds", "reeds"],
["wms_s_sherd1", "sea", "wms_sherd", 1330, 6975, 1, 3, 25, "The spoil heap at the dig", "sieve for sherds", "sherds"],
["wms_s_sherd2", "sea", "wms_sherd", 1386, 6930, 1, 3, 25, "The edge of the trench", "trowel the loose earth", "sherds"],
["wms_s_wood", "sea", "cr_wood", -7745, 2668, 2, 3, 25, "Driftwood above the tideline at Pharos", "gather driftwood", "drift"],
["wms_s_oil", "sea", "wms_oil", 3778, -2306, 1, 2, 30, "Oil jars at the olive press", "fill a jar from the press", "jars"],
["wms_s_cheese", "sea", "wms_cheese", -3232, -2736, 1, 2, 30, "Cheeses on the dairy's drying racks", "take your share of cheese", "cheese"],
["wms_s_meal", "sea", "wms_meal", 1448, -5076, 1, 3, 25, "Meal sacks by the millstones", "fill a sack of meal", "sacks"],
["wms_s_cloth", "sea", "cr_cloth", 2038, -342, 1, 3, 25, "Spare sailcloth at Nestor's storehouse", "cut a length of sailcloth", "silk"],
["wms_s_honey", "sea", "wms_honey", -4952, 846, 1, 2, 30, "The hives on the herb-woman's porch", "take a honeycomb", "hive"],
["wms_s_coral", "sea", "wms_coral", 0, 0, 1, 2, 40, "Red coral by the Sirens' rocks", "dive for coral", "aboard"],
["wms_s_flot", "sea", "cr_wood", 0, 0, 2, 4, 25, "Wreck timber spat out by Charybdis", "haul in timber", "aboard"]
];
var WMS_WORK = [
["The Olive Press of Ithaca", "sea", 3770, -2300, 30, "The Endless Sea: Ithaca's olive press and Laertes' orchard, above the harbour."],
["The Goatherds' Dairy", "sea", -3240, -2730, 30, "The Endless Sea: a dairy on the Cyclopes' island, well away from the giant's cave."],
["The Mill of the Winds", "sea", 1440, -5070, 28, "The Endless Sea: the windmill inside Aeolia's bronze wall."],
["The Herb Garden of Aeaea", "sea", -4960, 840, 28, "The Endless Sea: the herb-woman's garden and porch on Circe's island."],
["The Raft Beach of Ogygia", "sea", -6045, -5375, 28, "The Endless Sea: the beach where Odysseus built his raft, and rafts are built still."],
["The Sun's Pastures", "sea", 5245, 6345, 30, "The Endless Sea: the herders' post on Thrinacia, where the Sun's cattle are watched and never harmed."],
["The Watch on the Headland", "sea", -6340, -2245, 26, "The Endless Sea: the lookout at Telepylus that warns ships to stay outside the harbour."],
["The Lamps of the Cimmerians", "sea", -4235, 6170, 26, "The Endless Sea: the lamp store on the misty Cimmerian shore."],
["The Market of Lacedaemon", "sea", -635, -4005, 28, "The Endless Sea: the market below the hall of Menelaus."],
["The Dig at Troy", "sea", 1350, 6960, 40, "The Endless Sea: the excavation below the walls of Troy, and its finds hut."],
["The Beacon of Pharos", "sea", -7760, 2650, 26, "The Endless Sea: the beacon on Pharos, the island whose name became the word for a lighthouse in Greek, French, Italian and Spanish."]
];
var WMS_JOBS = [
[4200, "sea", "Ithaca olive presser", "The Olive Press of Ithaca", 10, 2, true, [7, 8], [["Press the olives", "station", ["Tip the picked olives into the stone basin", "Walk the crushing stone round until it is paste", "Stack the paste in rush mats under the beam", "Weight the beam and run the oil off into jars"]]]],
[4201, "sea", "Goatherds' dairy cheesemaker", "The Goatherds' Dairy", 10, 2, true, [6, 8], [["Make the day's cheese", "station", ["Warm the morning's milk", "Stir in the rennet and wait for the curd", "Ladle the curd into the wicker baskets", "Salt the cheeses and set them on the racks"]]]],
[4202, "sea", "Cyclopes' island shepherd", "The Goatherds' Dairy", 9, 2, true, [6, 8], [["Take the flock to pasture", "station", ["Count the flock out of the pen", "Walk them to fresh grazing, far from the giant's cave", "Milk the ewes at noon", "Count them back in at dusk"]]]],
[4203, "sea", "Aeolia windmill miller", "The Mill of the Winds", 11, 1, false, [7, 8], [["Grind the barley", "station", ["Turn the cap so the sails face the wind", "Set the canvas on the sails for today's wind", "Pour the barley into the hopper", "Sack the meal and sweep the stones"]]]],
[4204, "sea", "Aeaea herb gatherer", "The Herb Garden of Aeaea", 10, 2, true, [8, 8], [["Gather and dry the herbs", "station", ["Cut thyme and sage on the hillside", "Bunch them with thread", "Hang them in the shade to dry", "Jar the dry leaves and label them"]]]],
[4205, "sea", "Ogygia raft builder", "The Raft Beach of Ogygia", 11, 2, true, [8, 8], [["Build a raft", "station", ["Fell a seasoned alder or poplar", "Trim and square the logs with the adze", "Bore the holes and peg the logs together", "Lash on the deck, the mast and the steering oar"]]]],
[4206, "sea", "Thrinacia herd watcher", "The Sun's Pastures", 10, 2, true, [6, 8], [["Watch the Sun's herds", "station", ["Walk the pasture with the nymphs", "Count each herd: fifty, never more, never fewer", "Keep hungry sailors away from the cattle", "Report the count to Lampetie at the shrine"]]]],
[4207, "sea", "Telepylus headland lookout", "The Watch on the Headland", 10, 1, true, [8, 8], [["Keep the headland watch", "station", ["Climb to the lookout platform", "Scan the sea for sails", "Light the warning smoke when a ship comes near", "Signal her to moor outside the harbour mouth"]]]],
[4208, "sea", "Cimmerian lamplighter", "The Lamps of the Cimmerians", 10, 2, true, [14, 8], [["Keep the shore lamps lit", "station", ["Fill the oil jars from the store", "Trim each wick", "Light the lamps along the shore path", "Walk the path again before the mist thickens"]]]],
[4209, "sea", "Lacedaemon market porter", "The Market of Lacedaemon", 10, 2, true, [7, 8], [["Carry for the market", "station", ["Carry the stallholders' baskets up from the shore", "Set out the trestles", "Run goods between the stalls", "Stack the empty baskets at closing"]]]],
[4210, "sea", "Troy dig excavator", "The Dig at Troy", 11, 3, true, [7, 8], [["Dig a layer", "station", ["String out the trench in squares", "Trowel down one layer at a time", "Sieve every bucket of earth", "Bag and label what you find"]]]],
[4211, "sea", "Troy dig finds registrar", "The Dig at Troy", 14, 1, false, [8, 8], [["Record the finds", "station", ["Wash the day's sherds", "Number each find and its layer", "Draw the best pieces to scale", "Pack them for the museum"]]]],
[4212, "sea", "Pharos beacon keeper", "The Beacon of Pharos", 10, 1, true, [16, 8], [["Keep the beacon burning", "station", ["Carry driftwood up from the tideline", "Build the fire in the iron basket", "Light it at dusk", "Feed it through the night, steadily"]]]]
];
var WMS_STALLS = {
wms_press: { world: "sea", name: "The olive press of Ithaca", keeper: "Dolius, Laertes' old gardener", x: 3774, z: -2294, sells: ["wms_oil", "hx_olive", "wms_pear"], buys: ["hx_olive", "wms_pear", "wms_oil", "hx_fish", "wms_herb"],
say: "Old Dolius has worked Laertes' farm all his life. The press turns Ithaca's olives into oil, and he buys olives and fruit from anyone who picks them." },
wms_dairy: { world: "sea", name: "The goatherds' dairy", keeper: "Glaukos, a goatherd", x: -3236, z: -2724, sells: ["wms_cheese", "cr_leather"], buys: ["wms_fleece", "wms_cheese", "wms_herb", "wms_barley"],
say: "Glaukos keeps his flock on the far side of the island from the giant's cave, and sells cheese the old way, pressed in wicker. He buys fleece for the weavers." },
wms_mill: { world: "sea", name: "The Mill of the Winds", keeper: "Iope, the miller of Aeolia", x: 1444, z: -5064, sells: ["wms_meal", "wms_barley"], buys: ["wms_barley", "wms_meal", "wms_grape", "wms_pear"],
say: "On Aeolia the wind never fails: Aeolus sees to that. Iope grinds the island's barley into meal and buys grain and fruit for her kitchen." },
wms_herbs: { world: "sea", name: "The herb-woman's porch", keeper: "Melissa, a herb-woman of Aeaea", x: -4956, z: 846, sells: ["wms_herb", "wms_honey"], buys: ["wms_herb", "wms_honey", "wms_fennel", "wms_jujube", "wms_grape"],
say: "Melissa learned her herbs on Circe's island, the useful ones only: thyme for coughs, mint for the stomach, sage for the cook. No potions." },
wms_canal: { world: "sea", name: "The canal market of Atlantis", keeper: "Thyra, a canal merchant", x: 7600, z: -465, sells: ["cr_ore", "cr_cloth", "wms_oil"], buys: ["hx_pearl", "wms_coral", "hx_sponge", "hx_shell"],
say: "Ships come up the great canal from the sea to Atlantis' outer harbour. Thyra sells copper ore, linen and oil, and buys pearls, coral and sponges for the city's craftsmen." },
wms_store: { world: "sea", name: "Nestor's storehouse", keeper: "Ereutha, keeper of Nestor's stores", x: 2030, z: -335, sells: ["hx_salt", "wms_oil", "cr_leather"], buys: ["hx_salt", "hx_tunny", "hx_fish", "wms_oil", "wms_cheese"],
say: "The storehouse of Pylos keeps oil in great jars and writes every jar down on a clay tablet. Ereutha sells salt, oil and leather, and buys fish and salt for the king's table." },
wms_market: { world: "sea", name: "The market of Lacedaemon", keeper: "Kleta, a Spartan market-woman", x: -631, z: -4001, sells: ["cr_cloth", "wms_oil", "wms_cheese", "wms_meal"], buys: ["wms_reed", "wms_fleece", "wms_pear", "wms_herb", "hx_olive", "wms_willow"],
say: "Below the hall of Menelaus, the market of Lacedaemon: cloth, oil, cheese and meal for sale, and Kleta buys reeds for mats, fleece for spinning and withies for baskets." },
wms_finds: { world: "sea", name: "The finds hut at Troy", keeper: "Aster, the dig's registrar", x: 1364, z: 6950, sells: [], buys: ["wms_sherd"],
say: "Every potsherd found at Troy is washed, numbered and recorded here, and the dig pays a finder's fee for each. The finds go to the museum, never to be sold on." }
};
var WMS_GAMES = {
wms_g_lotus: ["lotus", "Remember the Hold", "a memory game", 10, "wms_jujube", 2],
wms_g_sirens: ["sirens", "The Sirens' Passage", "sail past without beeswax", 15, "wms_coral", 1],
wms_g_strait: ["strait", "Run the Strait", "sail the strait end to end", 15, "cr_wood", 3],
wms_g_raft: ["ogygia", "Build the Raft", "put the work in order", 10, "wms_grape", 2],
wms_g_ball: ["scheria", "Nausicaa's Ball", "throw and catch", 10, "hx_olive", 2],
wms_g_herd: ["thrinacia", "Count the Herd", "count truly", 10, "wms_fennel", 2],
wms_g_layers: ["troy", "Read the Layers", "put the layers in order", 10, "wms_sherd", 2],
wms_g_proteus: ["pharos", "Hold the Old Man", "hold on through every shape", 10, "hx_sponge", 2]
};
var WMS = { built: {}, taken: [], game: null, mill: null, t: 0, best: {}, last: null };
try {
WMS.best = JSON.parse(localStorage.getItem("somnu.wms.best") || "{}") || {};
}
catch (e) {
WMS.best = {};
}
function wmsSaveBest() { try {
localStorage.setItem("somnu.wms.best", JSON.stringify(WMS.best));
}
catch (e) { } }
function wmsOk() { return typeof HX !== "undefined" && typeof HX_MATS !== "undefined" && typeof SEA !== "undefined"; }
function wmsSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function wmsTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function wmsRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function wmsMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function wmsSigned() { return typeof signedIn === "function" && signedIn(); }
function wmsHead(t, c) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (c || "#FFE7B0") + "'>" + t + "</div>"; }
function wmsBtn(n, l, s) { return worldBtn(n, l, s); }
(function () {
if (!wmsOk())
return;
WMS_MATS.forEach(function (m) {
if (!HX_MATS.some(function (x) { return x[0] === m[0]; }))
HX_MATS.push(m);
var o = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] };
HX_MB[m[0]] = o;
if (typeof FG_MB !== "undefined" && !FG_MB[m[0]])
FG_MB[m[0]] = o;
});
WMS_SPOTS.forEach(function (s) { if (s[10] === "aboard")
HX_SPOTS.push(s); });
WMS_WORK.forEach(function (w) { HX_WORK.push(w); HX_WP[w[0]] = { key: w[0], world: w[1], x: w[2], z: w[3], r: w[4], note: w[5] }; });
WMS_JOBS.forEach(function (j) { HX_JOBS.push(j); });
Object.keys(WMS_STALLS).forEach(function (k) { HX_STALLS[k] = WMS_STALLS[k]; });
var P = HX_STALLS.purser;
if (P)
WMS_MATS.forEach(function (m) { if (P.buys.indexOf(m[0]) < 0)
P.buys.push(m[0]); });
if (P)
P.say += " Whatever the islands give (fruit, fleece, herbs, coral, stone, withies, reeds), the purser buys it for the ship's stores.";
var W = typeof WORLDS !== "undefined" && WORLDS.sea;
if (W)
W.places = (W.places || []).concat(WMS_WORK.map(function (r) { return { name: r[0], x: r[2], z: r[3] }; }));
})();
(function () {
if (typeof hxProp !== "function")
return;
var hp = hxProp;
hxProp = function (look) {
var g = new THREE.Group(), R = wRand((look.length * 7919) ^ 4242);
function rnd(a, b) { return a + (b - a) * R(); }
if (look === "pears") {
var t = wCyl(0.2, 0.3, 1.8, wM(0x6A5A44), 0, 0.9, 0, g, 6);
t.rotation.z = 0.08;
var cr = wSph(1.5, wM(0x4A7A3A), 0, 2.6, 0, g, 8);
cr.scale.y = 0.8;
for (var i = 0; i < 7; i++) {
var a = i * 0.9;
wSph(0.11, wM(0xD8C85A), Math.cos(a) * 1.3, 2.1 + (i % 3) * 0.3, Math.sin(a) * 1.3, g, 6);
}
wCyl(0.32, 0.25, 0.34, wM(0xA8844A), 1.2, 0.17, 0.6, g, 10);
for (var j = 0; j < 4; j++)
wSph(0.1, wM(0xD8C85A), 1.15 + j * 0.06, 0.38, 0.55 + (j % 2) * 0.1, g, 6);
}
else if (look === "fleece") {
for (var b = 0; b < 3; b++) {
var bu = wSph(0.6 + b * 0.15, wM(0x4A5A32), b * 0.9 - 0.9, 0.45, b % 2 * 0.5, g, 7);
bu.scale.y = 0.7;
}
for (var f = 0; f < 9; f++)
wSph(0.12, wM(0xEDE6D6), rnd(-1.4, 1.0), rnd(0.4, 0.9), rnd(-0.4, 0.8), g, 5);
}
else if (look === "barley") {
var gm = wM(0xD8B860);
for (var s = 0; s < 26; s++) {
var st = wCyl(0.015, 0.02, 0.9 + R() * 0.3, gm, rnd(-1.2, 1.2), 0.5, rnd(-0.8, 0.8), g, 3);
st.rotation.z = rnd(-0.15, 0.15);
}
var sh = wCyl(0.25, 0.3, 0.9, gm, 1.6, 0.45, 0.4, g, 7);
var sk = wBox(0.6, 0.04, 0.06, wM(0x8A8A90), 1.4, 0.05, -0.6, g);
sk.rotation.y = 0.6;
}
else if (look === "jujube") {
for (var q = 0; q < 3; q++) {
var jb = wSph(0.7, wM(0x5A7A3A), q * 0.8 - 0.8, 0.6, (q % 2) * 0.4, g, 7);
jb.scale.y = 0.8;
}
for (var r = 0; r < 12; r++)
wSph(0.07, wM(0xA83A2A), rnd(-1.4, 1.2), rnd(0.4, 1.0), rnd(-0.5, 0.9), g, 5);
}
else if (look === "herbs") {
var cols = [0x6A8A5A, 0x7A9A7A, 0x4A7A4A, 0x8A9A6A];
for (var h = 0; h < 7; h++) {
var hb = wSph(0.3 + R() * 0.15, wM(cols[h % 4]), rnd(-1, 1), 0.15, rnd(-0.8, 0.8), g, 6);
hb.scale.y = 0.6;
}
for (var v = 0; v < 5; v++)
wSph(0.05, wM(0xA88AD8), rnd(-0.8, 0.8), 0.38, rnd(-0.6, 0.6), g, 4);
}
else if (look === "grapes") {
[-1, 1].forEach(function (x) { wCyl(0.05, 0.06, 1.8, wM(0x6A4A2A), x, 0.9, 0, g, 5); });
wBox(2.2, 0.06, 0.06, wM(0x6A4A2A), 0, 1.75, 0, g);
for (var l = 0; l < 6; l++) {
var lf = wSph(0.35, wM(0x4A7A3A), -0.9 + l * 0.36, 1.6, 0.05, g, 6);
lf.scale.z = 0.5;
}
[-0.6, 0, 0.6].forEach(function (x) { var gr = wSph(0.16, wM(0x5A2A5A), x, 1.3, 0.12, g, 6); gr.scale.y = 1.5; });
}
else if (look === "fennel") {
for (var fe = 0; fe < 8; fe++) {
var fx = rnd(-0.9, 0.9), fz = rnd(-0.7, 0.7), fh = 1.2 + R() * 0.6;
wCyl(0.02, 0.03, fh, wM(0x6A9A4A), fx, fh / 2, fz, g, 4);
var um = wCyl(0.18, 0.02, 0.1, wM(0xE8D040), fx, fh, fz, g, 6);
}
}
else if (look === "stone") {
var sm = wM(0x9A9080);
[[0, 0.35, 0, 1.1, 0.7, 0.8], [1.0, 0.3, 0.4, 0.9, 0.6, 0.7], [0.4, 0.95, 0.1, 0.8, 0.55, 0.6], [-0.9, 0.25, -0.3, 0.7, 0.5, 0.9]].forEach(function (b2) { var bk = wBox(b2[3], b2[4], b2[5], sm, b2[0], b2[1], b2[2], g); bk.rotation.y = b2[0]; });
}
else if (look === "willow") {
wCyl(0.35, 0.45, 0.6, wM(0x5A5048), 0, 0.3, 0, g, 7);
for (var w = 0; w < 7; w++) {
var wd = wCyl(0.02, 0.02, 2, wM(0x8A7A4A), 0.6 + w * 0.05, 0.08 + w * 0.03, 0.2, g, 3);
wd.rotation.z = Math.PI / 2;
wd.rotation.y = 0.1 * w;
}
wCyl(0.08, 0.08, 0.4, wM(0xA89A6A), -0.5, 0.2, 0.5, g, 5);
}
else if (look === "reeds") {
var rm = wM(0x8A9A5A);
for (var re = 0; re < 22; re++) {
var rh = 1.4 + R() * 0.8, rd = wCyl(0.015, 0.02, rh, rm, rnd(-0.9, 0.9), rh / 2, rnd(-0.7, 0.7), g, 3);
rd.rotation.z = rnd(-0.12, 0.12);
if (re % 3 === 0)
wCyl(0.04, 0.04, 0.25, wM(0x6A4A2A), rd.position.x, rh - 0.05, rd.position.z, g, 4);
}
}
else if (look === "sherds") {
var sp = wSph(1.1, wM(0x8A6A4A), 0, -0.3, 0, g, 8);
sp.scale.set(1.4, 0.6, 1.1);
for (var k = 0; k < 8; k++) {
var sd = wBox(0.18, 0.03, 0.12, wM(k % 2 ? 0xB8643A : 0xA85A32), rnd(-1, 1), 0.32, rnd(-0.8, 0.8), g);
sd.rotation.set(rnd(-0.4, 0.4), R() * 6, 0);
}
var sv = wBox(0.8, 0.08, 0.8, wM(0x7A5A3A), 1.6, 0.6, 0.3, g);
[[1.25, -0.05], [1.95, -0.05], [1.25, 0.65], [1.95, 0.65]].forEach(function (lg) { wBox(0.05, 0.6, 0.05, wM(0x6A4A2A), lg[0], 0.3, lg[1], g); });
}
else
return hp.apply(this, arguments);
return g;
};
})();
function wmsIsle(x, z) { for (var i = 0; i < SEA_PLACES.length; i++) {
var p = SEA_PLACES[i];
if (Math.hypot(x - p.x, z - p.z) < p.r + 80)
return p;
} return null; }
function wmsBlocked(x, z, rad) { return __ZC(327, 27, this, arguments, new.target); }
function wmsFree(x, z, rad) { return __ZC(327, 28, this, arguments, new.target); }
function wmsY(x, z, hw, hd) { var p = wmsIsle(x, z); if (p && typeof seaFoot === "function")
return seaFoot(p, x, z, hw || 1, hd || 1); return hxGround("sea", x, z); }
function wmsSolid(o) { (SEA.solids = SEA.solids || []).push(o); }
function wmsTalk(o) { SEA.talkers.push(o); return o; }
function wmsCounter(S, x, z, ry, col, goods) { return __ZC(327, 29, this, arguments, new.target); }
function wmsJar(S, x, y, z, s, col) { var j = wSph(0.42 * s, wM(col || 0xB86A3A), x, y + 0.5 * s, z, S, 10); j.scale.y = 1.35; wCyl(0.16 * s, 0.22 * s, 0.3 * s, wM(col || 0xB86A3A), x, y + 1.1 * s, z, S, 8); }
function wmsHut(S, x, z, ry, w, d, h, wall, roof, inn) { return __ZC(327, 30, this, arguments, new.target); }
function wmsSign(G, lines, x, z, ry) { return hxSignAt(G, "sea", lines, x, z, ry || 0, "#1A2A3A", "#F0E0B0"); }
function wmsFace(x, z, tx, tz) { return Math.atan2(tx - x, tz - z); }
function wmsLand(k) { var p = SEA_BY[k]; return p && p.land ? p.land : { x: p.x, z: p.z }; }
function wmsKeeper(G, seed, o, x, z, talk, ry) { return hxPersonAt(G, "sea", seed, o, x, z, talk, ry); }
function wmsWorkMove(key, x, z) { var W = HX_WP[key]; if (W) {
W.x = x;
W.z = z;
} HX_WORK.forEach(function (r) { if (r[0] === key) {
r[2] = x;
r[3] = z;
} }); }
function wmsHire(key) { return function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(key); }; }
function wmsTrade(id) { return function () { hxStall(id); }; }
function wmsKeeperOffers(name, id, work, extra) { return __ZC(327, 31, this, arguments, new.target); }
function wmsDressSea(G) { return __ZC(327, 32, this, arguments, new.target); }
var WMS_DRESS = {
ithaca: function (G, p) { return __ZC(327, 33, this, arguments, new.target); },
cyclops: function (G, p) { return __ZC(327, 34, this, arguments, new.target); },
aeolia: function (G, p) { return __ZC(327, 35, this, arguments, new.target); },
lotus: function (G, p) { return __ZC(327, 36, this, arguments, new.target); },
aeaea: function (G, p) { return __ZC(327, 37, this, arguments, new.target); },
ogygia: function (G, p) { return __ZC(327, 38, this, arguments, new.target); },
atlantis: function (G, p) { return __ZC(327, 39, this, arguments, new.target); },
scheria: function (G, p) {
hxWrapKeeper("sea", "Nausicaa", [["🏐 Play ball with Nausicaa", "Throw and catch with her and her maids · a game", function () { wmsGameCard("wms_g_ball"); }]]);
WMS_GAMES.wms_g_ball.at = [p.x + 62, p.z + 334];
},
thrinacia: function (G, p) { return __ZC(327, 40, this, arguments, new.target); },
telepylus: function (G, p) { return __ZC(327, 41, this, arguments, new.target); },
cimmeria: function (G, p) { return __ZC(327, 42, this, arguments, new.target); },
pylos: function (G, p) { return __ZC(327, 43, this, arguments, new.target); },
sparta: function (G, p) { return __ZC(327, 44, this, arguments, new.target); },
troy: function (G, p) { return __ZC(327, 45, this, arguments, new.target); },
pharos: function (G, p) { return __ZC(327, 46, this, arguments, new.target); }
};
WMS_GAMES.wms_g_sirens.at = null;
WMS_GAMES.wms_g_strait.at = null;
(function () {
if (typeof hxDress !== "function")
return;
var hd = hxDress;
hxDress = function (w, G) {
var r = hd.apply(this, arguments);
try {
if (w === "sea" && wmsOk())
wmsDressSea(G);
}
catch (e) {
if (window.console)
console.warn("[world-more 20] sea", e);
}
try {
if (typeof wmsLearnDress === "function")
wmsLearnDress(w, G);
}
catch (e2) {
if (window.console)
console.warn("[world-more 20] learn", w, e2);
}
return r;
};
try {
if (typeof WORLDS !== "undefined" && WORLDS.sea && WORLDS.sea.g && HX.built.sea)
wmsDressSea(WORLDS.sea.g);
}
catch (e) { }
})();
function wmsBestLine(k) { var b = WMS.best[k]; return b ? " · your best: " + esc(String(b)) : ""; }
function wmsGameCard(k, msg) { return __ZC(327, 47, this, arguments, new.target); }
function wmsGameStart(k) {
var P = WMS_PLAY[k];
if (P.can) {
var why = P.can();
if (why) {
wmsGameCard(k, why);
return;
}
}
WMS.game = { k: k, t: 0, n: 0, ok: 0, bad: 0 };
if (wmsSigned())
wmsRpc("wms_game_start", { p_key: k }).catch(function () { });
P.begin(WMS.game);
}
function wmsGameWin(k, line) { return __ZC(327, 48, this, arguments, new.target); }
function wmsGameLose(k, line) { WMS.game = null; wmsTone(260, 0.25); if (WMS_PLAY[k].onSea)
wmsSay("<b>" + esc(WMS_GAMES[k][1]) + ":</b> " + line + " Try again from 🧭 Things to do.");
else
wmsGameCard(k, line + " Try again?"); }
function wmsShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function wmsSetBest(k, v, low) { var b = WMS.best[k]; if (b == null || (low ? v < b : v > b)) {
WMS.best[k] = v;
wmsSaveBest();
} }
var WMS_PLAY = {
wms_g_lotus: { intro: "The crew load six things into the Wayfarer's hold while you watch. Then you take a breath of the lotus groves. Afterwards, pick out the six that went in, from ten. Two wrong picks and the lotus has won.", start: "Watch closely: you get eight seconds",
goods: ["water jars", "barley meal", "olive oil", "a spare oar", "sailcloth", "salt fish", "coiled rope", "a bronze cauldron", "goat cheese", "a sack of onions", "a bag of figs", "a wineskin", "tar for the seams", "a fishing net"],
begin: function (G) { var all = wmsShuffle(this.goods); G.load = all.slice(0, 6); G.opts = wmsShuffle(all.slice(0, 10)); G.picked = {}; G.phase = "look"; G.t = 8; this.card(G); },
card: function (G, msg) { return __ZC(327, 49, this, arguments, new.target); },
tick: function (G, dt) { if (G.phase !== "look")
return; var was = Math.ceil(G.t); G.t -= dt; if (G.t <= 0) {
G.phase = "pick";
SEA.lotus = Math.max(SEA.lotus || 0, 0);
this.card(G, "A breath of lotus… now, what was it?");
}
else if (Math.ceil(G.t) !== was)
this.card(G); },
pick: function (G, i) { return __ZC(327, 50, this, arguments, new.target); } },
wms_g_raft: { intro: "Calypso has given you a bronze axe, an adze and augers, as she gave Odysseus. Tap the work in the right order, from the felling to the launch. Two mistakes are forgiven; a third and the raft is firewood.", start: "Eight steps",
steps: ["Fell twenty trees: alder, poplar and fir, long dead and dry, so they float", "Trim them with the axe and smooth them with the adze, true to a line", "Bore the logs with the augers", "Fit them together with pegs and joints", "Raise the decking on close-set ribs, with a rail round it", "Step the mast and fix its yard", "Fit a steering oar, and wattle the sides against the waves", "Rig the sail from the cloth Calypso brings, then lever her down to the sea on rollers"],
begin: function (G) { G.order = wmsShuffle(this.steps.map(function (s, i) { return i; })); G.next = 0; this.card(G); },
card: function (G, msg) { return __ZC(327, 51, this, arguments, new.target); },
pick: function (G, i) { return __ZC(327, 52, this, arguments, new.target); } },
wms_g_ball: { intro: "Nausicaa and her maids play ball on the shore when the washing is done. She throws; wait until the ball is coming down to you, then catch. Too soon and you grab at air; too late and it is in the river. Catch five of seven.", start: "Seven throws",
begin: function (G) { G.n = 0; G.ok = 0; this.throwIt(G); },
throwIt: function (G) { G.state = "fly"; G.t = 1.6 + Math.random() * 2.6; G.win = 1.0; this.card(G, G.n ? null : "Nausicaa throws the ball high…"); },
card: function (G, msg) { return __ZC(327, 53, this, arguments, new.target); },
tick: function (G, dt) { if (G.state === "fly") {
G.t -= dt;
if (G.t <= 0) {
G.state = "now";
G.t = G.win;
wmsTone(740, 0.08);
this.card(G);
}
}
else if (G.state === "now") {
G.t -= dt;
if (G.t <= 0)
this.result(G, false, "Too late: it bounced into the river. A maid fishes it out.");
} },
result: function (G, ok, line) { return __ZC(327, 54, this, arguments, new.target); } },
wms_g_herd: { intro: "The Sun keeps seven herds of cattle on Thrinacia, fifty in each, and seven flocks of sheep. Lampetie asks you to count the cattle in a meadow, not the sheep among them. Three meadows; count all three truly.", start: "Three meadows",
begin: function (G) { G.round = 0; this.next(G); },
next: function (G) { return __ZC(327, 55, this, arguments, new.target); },
card: function (G, msg) { return __ZC(327, 56, this, arguments, new.target); },
pick: function (G, v) { return __ZC(327, 57, this, arguments, new.target); } },
wms_g_layers: { intro: "A trench cut through the mound shows city on top of city. Tap the layers in order from the deepest, which is the oldest, to the top. One mistake is forgiven.", start: "Five layers",
layers: [["Troy I", "A small walled village of stone houses, about 3000 BC"], ["Troy II", "A richer citadel with a ramp to its gate; the gold Schliemann called 'Priam's Treasure', about 2500 BC (far too early for Priam)"], ["Troy VI", "Great sloping stone walls and towers, about 1700 to 1250 BC"], ["Troy VIIa", "Houses crowded inside the walls, then a burnt layer, about 1200 BC: the one most often matched with the Trojan War"], ["Troy VIII and IX", "Greek temples, then Roman Ilium with its theatre and marble"]],
begin: function (G) { G.order = wmsShuffle([0, 1, 2, 3, 4]); G.next = 0; this.card(G); },
card: function (G, msg) { return __ZC(327, 58, this, arguments, new.target); },
pick: function (G, i) { return __ZC(327, 59, this, arguments, new.target); } },
wms_g_proteus: { intro: "Proteus sleeps among his seals at noon. Seize him, and he turns into a lion, a serpent, a leopard, a great boar, running water and a tall tree. Hold on through each change: brace when he begins to change, then grip as the new shape comes. Too soon or too late and he slips. One slip is forgiven.", start: "Six shapes",
shapes: [["🦁", "a bearded lion"], ["🐍", "a serpent"], ["🐆", "a leopard"], ["🐗", "a great boar"], ["🌊", "running water"], ["🌳", "a tall, leafy tree"]],
begin: function (G) { G.i = 0; this.wait(G); },
wait: function (G) { G.state = "wait"; G.t = 1.4 + Math.random() * 2.4; G.win = 0.95; this.card(G, G.i ? null : "You and three companions leap from under the sealskins and seize him."); },
card: function (G, msg) { return __ZC(327, 60, this, arguments, new.target); },
tick: function (G, dt) { if (G.state === "wait") {
G.t -= dt;
if (G.t <= 0) {
G.state = "now";
G.t = G.win;
wmsTone(520, 0.1);
this.card(G);
}
}
else if (G.state === "now") {
G.t -= dt;
if (G.t <= 0)
this.result(G, false, "Too late: he twisted free for a moment.");
} },
result: function (G, ok, line) { return __ZC(327, 61, this, arguments, new.target); } },
wms_g_sirens: { onSea: true, intro: "Odysseus heard the Sirens and lived, lashed to the mast. Take the wax out of your ears and sail within 500 metres of their rocks, then 1,200 metres clear, with the song pulling at the helm all the way. Ground on the rocks and you have lost. Five minutes.", start: "Start out at sea, away from the rocks",
can: function () { if (!SEA.aboard)
return "Go back aboard the Wayfarer first."; var r = SEA_BY.sirens; if (Math.hypot(SEA.sx - r.x, SEA.sz - r.z) < 1200)
return "Stand off first: start from more than 1,200 metres away from the rocks (the chart, M, will take you near)."; return null; },
begin: function (G) { SEA.wax = false; G.min = 1e9; G.t = 300; worldCard(null); wmsSay("<b>The Sirens' Passage.</b> You pick the wax from your ears and the crew lash you to the mast. Sail within 500 m of the rocks, then 1,200 m clear. Steer against the song!"); },
tick: function (G, dt) { return __ZC(327, 62, this, arguments, new.target); } },
wms_g_strait: { onSea: true, intro: "Sail the strait between Scylla's cliff and Charybdis from one end to the other in four minutes. If Charybdis takes you, you have lost. Circe's advice still holds: keep nearer Scylla's side.", start: "Start out at sea, outside either end of the strait",
can: function () { if (!SEA.aboard)
return "Go back aboard the Wayfarer first."; var p = SEA_BY.strait, dz = SEA.sz - p.z; if (Math.abs(dz) < p.r + 40)
return "Stand off first: start outside one end of the strait, more than " + (p.r + 40) + " m north or south of its middle."; return null; },
begin: function (G) { var p = SEA_BY.strait; G.from = SEA.sz > p.z ? 1 : -1; G.t = 240; G.inside = false; G.px = SEA.sx; G.pz = SEA.sz; worldCard(null); wmsSay("<b>Run the Strait.</b> In at the " + (G.from > 0 ? "south" : "north") + " end, out at the other. Keep to Scylla's side (west)."); },
tick: function (G, dt) { return __ZC(327, 63, this, arguments, new.target); } }
};
(function () {
if (typeof seaTick === "function") {
var st = seaTick;
seaTick = function (dt) { WMS.line = ""; st.apply(this, arguments); try {
wmsSeaTick(dt);
}
catch (e) {
if (window.console)
console.warn("[world-more 20]", e);
} };
}
if (typeof seaPromptTick === "function") {
var sp = seaPromptTick;
seaPromptTick = function (L) { sp.apply(this, arguments); try {
if (!WLD.promptFn && SEA.aboard)
wmsAboardPrompt();
}
catch (e) { } };
}
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (html) { if (html && WMS.line && typeof WLD !== "undefined" && WLD.on === "sea")
html = html + WMS.line; return wb.call(this, html); };
}
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return !!(WMS.game && WMS_PLAY[WMS.game.k].onSea); }, close: function () { var k = WMS.game.k; WMS.game = null; wmsSay("<b>" + esc(WMS_GAMES[k][1]) + "</b>: abandoned."); } });
})();
function wmsSeaTick(dt) {
WMS.t += dt;
if (WMS.mill && WMS.mill.g)
WMS.mill.g.rotation.z -= dt * 0.35;
var G = WMS.game;
if (!G)
return;
var P = WMS_PLAY[G.k];
if (!P.onSea && !(WLD.card && WLD.card.style.display === "block")) {
WMS.game = null;
return;
}
if (P.tick)
P.tick(G, dt);
}
function wmsAboardPrompt() { return __ZC(327, 64, this, arguments, new.target); }
function wmsAboardGather(id) { return __ZC(327, 65, this, arguments, new.target); }
(function () {
if (typeof hxGuideTo !== "function")
return;
var hg = hxGuideTo;
hxGuideTo = function (w, x, z, name) {
if (w === "sea" && typeof SEA !== "undefined") {
var p = wmsIsle(x, z);
if (p && p.dock && (SEA.aboard || SEA.shore !== p)) {
HX.guide = { w: w, x: x, z: z, name: name };
worldCard(null);
if (!SEA.aboard) {
wmsSay("<b>" + esc(name) + "</b> is on " + esc(p.name) + ". Go back aboard at the landing (E), and the Wayfarer's course is set for it.");
SEA.wmsNext = p;
return;
}
SEA.auto = { x: p.dock.x, z: p.dock.z, name: p.name, after: "Press E to go ashore; then follow the arrow to " + name + "." };
wmsSay("<b>Course set</b> for " + esc(p.name) + ": " + esc(name) + " is there. Touch the helm to take her yourself.");
return;
}
}
return hg.apply(this, arguments);
};
if (typeof seaBoard === "function") {
var sb = seaBoard;
seaBoard = function () { var r = sb.apply(this, arguments); try {
var p = SEA.wmsNext;
SEA.wmsNext = null;
if (p && p.dock) {
SEA.auto = { x: p.dock.x, z: p.dock.z, name: p.name, after: "Press E to go ashore." };
wmsSay("<b>Aboard.</b> Course set for " + esc(p.name) + ".");
}
}
catch (e) { } return r; };
}
})();
function wmsCapture(fn) { var cap = null, wc = worldCard; worldCard = function (h, f) { cap = [h, f || {}]; }; try {
fn();
}
finally {
worldCard = wc;
} return cap; }
var WMS_ISLE_DO = { ithaca: "olive press: work, oil and olives; pears to pick; homes on the shore", cyclops: "the goatherds' dairy: work, cheese; fleece to gather", aeolia: "the Mill of the Winds: work, meal; barley to cut",
lotus: "Remember the Hold (a game); jujubes and shells", aeaea: "the herb garden: work, herbs and honey; herbs to pick", sirens: "from the deck: dive for red coral (ears stopped), or the Sirens' Passage",
strait: "from the deck: haul in wreck timber, or Run the Strait", ogygia: "the raft beach: work, Build the Raft (a game); grapes and driftwood", atlantis: "the canal market; pearl diving and the temple (work)",
scheria: "the market, the shipwrights' yard, work; Nausicaa's Ball (a game); olives", thrinacia: "the herders' post: work, Count the Herd (a game); wild fennel", telepylus: "the headland lookout (work); building stone",
cimmeria: "the lamp store (work); willow withies", pylos: "Nestor's storehouse; the salt pans (work); salt and tunny", sparta: "the market: work, cloth and oil; reeds on the shore",
troy: "the dig: work, the finds hut, Read the Layers (a game); potsherds", pharos: "the beacon (work), Hold the Old Man (a game); sponges and driftwood" };
(function () {
if (typeof hxHub !== "function")
return;
var hh = hxHub;
hxHub = function () {
if (!(typeof hxWorld === "function" && hxWorld() === "sea"))
return hh.apply(this, arguments);
var cap = wmsCapture(function () { hh(); });
if (!cap)
return;
var h = cap[0], fns = cap[1], n = 0;
function head(t) { h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function go(label, sub, fn) { var k = "wms" + (n++); h += worldBtn(k, label, sub); fns[k] = fn; }
head("Island games · a little gold once a day");
Object.keys(WMS_GAMES).forEach(function (k) {
var D = WMS_GAMES[k], p = SEA_BY[D[0]];
go("🎲 " + esc(D[1]), esc(p ? p.name : D[0]) + " · " + esc(D[2]) + wmsBestLine(k), function () {
if (WMS_PLAY[k].onSea) {
wmsGameCard(k);
return;
}
var at = D.at || (p && p.land ? [p.land.x, p.land.z] : null);
if (at)
hxGuideTo("sea", at[0], at[1], D[1]);
});
});
head("Every island, and why to go ashore");
SEA_PLACES.forEach(function (p) {
var t = WMS_ISLE_DO[p.k];
if (!t)
return;
go("🏝️ " + esc(p.name), esc(t), function () {
worldCard(null);
if (SEA.aboard) {
var tx = p.dock ? p.dock.x : p.x + (SEA.sx - p.x) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 250), tz = p.dock ? p.dock.z : p.z + (SEA.sz - p.z) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 250);
SEA.auto = { x: tx, z: tz, name: p.name, after: p.dock ? "Press E to go ashore." : "Here, from the deck." };
wmsSay("<b>Course set</b> for " + esc(p.name) + ".");
}
else if (SEA.shore === p)
wmsSay("You are on " + esc(p.name) + " now. The 🧭 card lists what is here.");
else {
SEA.wmsNext = p;
wmsSay("Go back aboard at the landing (E), and the course is set for " + esc(p.name) + ".");
}
});
});
h += "<div style='opacity:.7;font-size:12px;margin-top:6px'>An island without a stall? The Wayfarer's purser buys everything the islands give, and she waits at every landing.</div>";
worldCard(h, fns);
};
})();
var WMS_HALL_ITEMS = [
["dr_mapscrap", "Scrap of an old map", "🗺️", 2, 0, 0, "A torn corner of a traveller's map, dropped in the Hall. The Registrar uses them to mend the register's maps."],
["dr_hingepin", "Brass hinge pin", "📌", 3, 0, 0, "A brass pin worked loose from a door's hinge. Every door in the Hall hangs on three of them."],
["dr_hallbun", "Traveller's bun", "🥯", 1, 12, 0, "A soft bun with a sweet glaze, from the tea-seller's cart."],
["dr_halltea", "Flask of tea", "🫖", 1, 2, 16, "Hot black tea in a tin flask, for the road through any door."],
["dr_hallcard", "Postcard of the Hall", "🖼️", 3, 0, 0, "A postcard of the ring of doors round the great map. Something to keep or send."],
["dr_knocker", "Small brass door knocker", "🚪", 7, 0, 0, "A small brass knocker in the shape of a ring held by a hand, to fix on a door of your own."]
];
WMS_HALL_ITEMS.forEach(function (r) {
if (typeof DQ_ITEMS === "undefined" || typeof DQ_ITEM === "undefined")
return;
if (!DQ_ITEM[r[0]]) {
DQ_ITEMS.push(r);
DQ_ITEM[r[0]] = { k: r[0], n: r[1], e: r[2], b: r[3], fd: r[4], dr: r[5], note: r[6] };
}
});
var WMS_HALL = { who: "The tea-seller of the Hall", board: null, stall: null };
if (typeof DQ_LANDS !== "undefined" && DQ_LANDS.hall) {
var wmsH = DQ_LANDS.hall;
wmsH.gather = [["dr_mapscrap", 6, "tile", 0xD8C8A0, [0, 0, 26]], ["dr_hingepin", 6, "coin", 0xC8A040, [0, 0, 60]]];
wmsH.stall = { who: WMS_HALL.who, n: "The tea-seller's cart", goods: [["dr_hallbun", 3], ["dr_halltea", 2], ["dr_hallcard", 6], ["dr_knocker", 14]] };
wmsH.errands = [
{ k: "ha_pins", who: "The porter of the Hall", n: "Pins for the hinges", say: "Doors that open on whole worlds get used hard, and the pins work loose. Find me four brass hinge pins on the floor and I'll knock them home before anything sags.", need: { dr_hingepin: 4 }, gold: 12, gift: ["dr_halltea", 1] },
{ k: "ha_maps", who: "The Registrar of Doors", n: "Scraps for the register", say: "Travellers drop the corners of their maps all over the Hall. Five scraps, please: I mend the register's maps with them, so nothing anyone has drawn is wasted.", need: { dr_mapscrap: 5 }, gold: 14, gift: ["dr_hallcard", 1] }
];
wmsH.games = [
{ k: "ha_doors", t: "quiz", who: "A guide of the Hall", n: "Doors of the world", say: "I send people through doors all day; let's see what you know about the real ones. Three questions, all three right.", gold: 10, qs: [
["Who made the gilded bronze doors of the Baptistery in Florence that Michelangelo is said to have called 'the Gates of Paradise'?", "Lorenzo Ghiberti", "Leonardo da Vinci", "Sandro Botticelli"],
["The word 'janitor' comes from Janus. What was Janus the Roman god of?", "Doorways, gates and beginnings", "The harvest", "The sea"],
["The oldest known door in Britain, in Westminster Abbey, was made around when?", "The 1050s", "The 1550s", "The 1850s"],
["What is a door's hinge pin for?", "It joins the two halves of the hinge, so the door can swing", "It locks the door", "It holds the handle on"],
["On a map, what does the compass rose show?", "Which way is north, south, east and west", "How high the hills are", "How old the map is"],
["On Mercator's map of 1569, which lands look far bigger than they really are?", "Lands near the poles, such as Greenland", "Lands on the equator", "Islands in the middle of the ocean"],
["Where do all the lines of longitude meet?", "At the North and South Poles", "On the equator", "Nowhere: they never meet"],
["Why do the fire exit doors of theatres and shops open outwards?", "So people can get out quickly in a fire or a crush", "So they keep the rain out", "So they are cheaper to build"]
] },
{ k: "ha_lands", t: "match", who: "A dream warden", n: "Every door and its land", say: "Lost doors are my trade. Match what is found to the land it is found in, and you'll never be lost behind any of them.", gold: 10, pairs: [
["🌼 Asphodel", "The Underworld"], ["☁️ Cloud wool", "The Heavens"], ["⚪ Pearls", "The Depths"], ["🍄 Toadstools", "Faerie"], ["🪞 Looking-glass shards", "The Mirror World"], ["🌴 Dates", "The Endless Desert"]
] }
];
}
function wmsHallSpot(P, taken, cands, rad) { return __ZC(327, 66, this, arguments, new.target); }
function wmsHallRing(rs, a0) { var out = []; rs.forEach(function (r) { for (var i = 0; i < 32; i++) {
var a = (a0 || 0) + i * Math.PI / 16;
out.push([Math.round(Math.sin(a) * r * 10) / 10, Math.round(Math.cos(a) * r * 10) / 10]);
} }); return out; }
(function () {
if (typeof LD_SETS === "undefined" || typeof LD_SETS.hall !== "function")
return;
var hs = LD_SETS.hall;
LD_SETS.hall = function (P) {
hs(P);
var taken = null;
try {
var r = typeof realmById === "function" ? realmById(LD.rid) : null;
if (r)
taken = ldTaken(r);
}
catch (e) { }
var L = "the Hall of Doors";
WMS_HALL.stall = null;
WMS_HALL.board = null;
var s = wmsHallSpot(P, taken, wmsHallRing([16, 15, 20, 14, 22], Math.PI), 3.2);
if (s) {
var rot = Math.atan2(-s[0], -s[1]), kx = s[0] + Math.sin(rot) * 2.6, kz = s[1] + Math.cos(rot) * 2.6;
P.k("marketstall", s[0], s[1], rot, 0.9);
P.person("wms_teaseller", kx, kz, rot, { sex: "f", look: { top: 0x7A3A2A, topKind: "shirt", bottom: 0x2A2A30, hair: 0x3A2A1A, hat: "none" } }, ldWho(WMS_HALL.who, L, "the tea-seller of the Hall of Doors, who keeps a little cart of buns, flasks of tea, postcards of the Hall and small brass door knockers for travellers between the worlds", "Tea for the road? Buns, postcards, a little brass knocker for a door of your own. Anything you've gathered on the floor, I'll show you where the city buys it.", "You are cheerful and practical, you have seen dreamers come back through every door, and you never sell keys of any kind (keys are not yours to sell, you say). Keep it short."));
WMS_HALL.stall = [kx, kz];
}
var b = wmsHallSpot(P, taken, [[-4.6, 15.5], [-5.2, 13.4], [-6, 17], [-4.8, 18.5], [5.6, 12.4], [-7, 11.5]].concat(wmsHallRing([14, 13], Math.PI * 0.9)), 1.4);
if (b) {
P.sign(b[0], b[1], Math.atan2(-b[0], -b[1]) + Math.PI, ["Things to do in the Hall", "Press E"], null, ["#1E2A3A", "#F2E2B0"]);
WMS_HALL.board = b;
}
DQ.plan = P;
};
})();
(function () {
if (typeof ldBuild !== "function")
return;
var lb = ldBuild;
ldBuild = function (r) {
var out = lb.apply(this, arguments);
try {
if (LD.g && LD.kind === "hall" && WMS_HALL.board && DQ.kind === "hall") {
var b = WMS_HALL.board;
LD.talkers.push({ x: b[0], z: b[1], r: 3, name: "Things to do in the Hall of Doors", verb: "read it", dq: { t: "board" } });
}
}
catch (e) { }
return out;
};
})();
var WMS_LESSONS = [
{ k: "nv1", n: 1, at: "neverland", near: [628, 70], title: "Lagoons and coral reefs",
real: "A lagoon is shallow water held apart from the open sea by a reef, a sandbar or a ring of islands. Coral atolls are rings of reef round a lagoon. In 1842 Charles Darwin explained how they form: coral grows on the edges of a volcanic island, and as the island slowly sinks, the coral keeps growing upwards, until only a ring of reef is left round the water.",
science: "Reef-building corals are tiny animals called polyps. Inside them live single-celled algae, which make food from sunlight and share it with the coral; that is why reefs grow only in clear, shallow, warm water. The polyps build their hard skeletons from calcium carbonate, the same stuff as chalk.",
word: ["Atoll", "a ring-shaped coral reef, or chain of coral islands, round a lagoon."],
tryit: "Look across the lagoon to where the waves break. That line of white water is where the reef stops the sea.",
quiz: [["Who explained, in 1842, how coral atolls form?", "Charles Darwin", "Isaac Newton", "Captain James Cook"], ["Why do reef-building corals need clear, shallow water?", "The algae living in them need sunlight", "They breathe air at the surface", "They eat the sand"]] },
{ k: "nv2", n: 2, at: "neverland", near: [-96, 286], title: "How anything flies",
real: "On 17 December 1903, at Kitty Hawk in North Carolina, Orville Wright made the first powered, controlled flight in an aeroplane: 12 seconds and about 37 metres. He and his brother Wilbur had studied how birds twist their wingtips to turn, and they built that into their wings.",
science: "Four forces act on anything that flies: lift holds it up, weight pulls it down, thrust drives it forward and drag holds it back. A wing is shaped and tilted so that it turns the air flowing past it downwards; pushing the air down pushes the wing up, and the air over the top of the wing is at lower pressure than the air beneath.",
word: ["Lift", "the upward force a wing makes as air flows past it."],
tryit: "Fly the Never Rings, and feel how you must lean into each turn, as a bird or an aeroplane banks.",
quiz: [["Which of the four forces holds a flying thing up?", "Lift", "Drag", "Thrust"], ["In which year did the Wright brothers make the first powered, controlled aeroplane flight?", "1903", "1803", "1953"]] },
{ k: "nv3", n: 3, at: "neverland", near: [-588, -148], title: "Finding your way by the stars",
real: "For thousands of years sailors have steered by the stars. In the northern sky one star, Polaris, the Pole Star, stays almost still while all the others wheel round it through the night, because it lies almost exactly in line with the axis the Earth spins on.",
science: "To find Polaris, find the Plough (the Big Dipper) and follow the two stars at the end of its bowl, the Pointers, upwards about five times the gap between them. In the Northern Hemisphere, the height of Polaris above the horizon is roughly your latitude. South of the equator Polaris cannot be seen, and sailors use the Southern Cross instead.",
word: ["Latitude", "how far north or south of the equator a place is, measured in degrees."],
tryit: "On a clear night here, find the Plough and follow its Pointers to the one star that does not move.",
quiz: [["Which star stays almost still in the northern night sky?", "Polaris", "Sirius", "Betelgeuse"], ["Which stars point the way to it?", "The two at the end of the Plough's bowl", "The three in Orion's belt", "The brightest stars of the Southern Cross"]] },
{ k: "nv4", n: 4, at: "neverland", near: [-420, 26], title: "Crocodiles",
real: "Crocodiles have lived on Earth for tens of millions of years. The saltwater crocodile of south-east Asia and northern Australia is the largest living reptile: big males grow to more than 5 metres long. A crocodile can go for months without a meal.",
science: "A crocodile's eyes, ears and nostrils sit along the top of its head, so it can lie almost hidden in the water and still see, hear and breathe. It replaces its teeth again and again all its life. And the warmth of the nest decides whether each egg hatches as a male or a female.",
word: ["Ectotherm", "an animal that takes its body heat from its surroundings, such as a reptile basking in the sun."],
tryit: "Look along the reed beds for two bumps of eyes and a nose just above the water. That is all a crocodile shows.",
quiz: [["What decides whether a crocodile egg hatches male or female?", "The temperature of the nest", "The mother's choice", "The phase of the Moon"], ["Which is the largest living reptile?", "The saltwater crocodile", "The Komodo dragon", "The green iguana"]] },
{ k: "ud1", n: 5, at: "underdark", near: [412, -552], title: "How caves are made",
real: "Most large caves are dissolved out of limestone. The longest known cave system in the world, Mammoth Cave in Kentucky, has more than 650 kilometres of passages mapped, and more are found every year.",
science: "Rain picks up carbon dioxide from the air and the soil and becomes a very weak acid, carbonic acid. Seeping through cracks in limestone, it slowly dissolves the rock and widens the cracks into passages. When drips of that water reach open air in a cave they give up carbon dioxide and leave a little calcite behind: stalactites grow down from the ceiling and stalagmites up from the floor, often by less than a millimetre a year.",
word: ["Speleothem", "any rock formation that grows in a cave, such as a stalactite or a stalagmite."],
tryit: "In the grotto, find a stalactite and the stalagmite growing up beneath it. One day they may meet and make a column.",
quiz: [["Which grows down from a cave's ceiling?", "A stalactite", "A stalagmite", "A geyser"], ["What dissolves limestone to make most caves?", "Rainwater made slightly acid by carbon dioxide", "Lava", "The wind"]] },
{ k: "ud2", n: 6, at: "underdark", near: [-228, -498], title: "Fungi, and the glow in the dark",
real: "Fungi are neither plants nor animals; they are in fact more closely related to animals. A honey fungus in the Malheur National Forest in Oregon spreads under about 9 square kilometres of ground and is thought to be thousands of years old, which makes it one of the largest living things on Earth.",
science: "A mushroom is only the fruit of a fungus. The fungus itself is a web of fine threads, the mycelium, running through soil or wood and digesting its food outside its body. Some fungi glow: a chemical called luciferin reacts with oxygen, helped by an enzyme called luciferase, and gives off light. Glowing rotten wood has long been called foxfire.",
word: ["Mycelium", "the web of fine threads that is the main body of a fungus."],
tryit: "Look at the caps in the fungus forest. Each is the fruit of a web you cannot see, spread through the ground under your feet.",
quiz: [["Fungi are more closely related to which?", "Animals", "Plants", "Rocks"], ["What is the glow of fungi in rotting wood called?", "Foxfire", "Moonshine", "Will-o'-the-wisp oil"]] },
{ k: "ud3", n: 7, at: "underdark", near: [911, -646], title: "Minerals and crystals",
real: "In 2000, miners in the Naica mine in Chihuahua, Mexico, broke into a cave of giant crystals of gypsum, some about 12 metres long. The cave is about 300 metres down, close to 58 °C and almost completely humid: people can stay inside for only minutes at a time without special suits.",
science: "Crystals grow when atoms settle into a regular, repeating pattern, usually from water full of dissolved minerals. The slower and steadier the growth, the bigger the crystals: Naica's grew for hundreds of thousands of years in hot water that hardly changed. In 1812 Friedrich Mohs ranked minerals by hardness from 1, talc, to 10, diamond; a mineral scratches anything softer than itself.",
word: ["Mohs scale", "a ranking of minerals by how hard they are, from talc (1) to diamond (10)."],
tryit: "If you have a crystal from these caves, try it against a stone from the city. Which one scratches the other?",
quiz: [["Which mineral is the hardest on the Mohs scale?", "Diamond", "Talc", "Quartz"], ["What are the giant crystals of Naica made of?", "Gypsum", "Diamond", "Ice"]] },
{ k: "ud4", n: 8, at: "underdark", near: [-225, -1000], title: "Life in the dark",
real: "Animals that live their whole lives in caves are called troglobites. The olm, a blind pale salamander of the caves of Slovenia and Croatia, can live for more than 100 years, and it can go for years without eating. Mexico's cave fish, of the species Astyanax mexicanus, have no working eyes and no colour.",
science: "Cave fish and the river fish of the same species can still breed together; the cave fish lost their eyes and their colour over many generations, because in total darkness eyes and colour are no use and cost energy to grow. Instead they find their food with a keen sense of touch and smell, and lines along their sides that feel the water moving.",
word: ["Troglobite", "an animal that lives its whole life in caves."],
tryit: "Stand at the end of the landing and put out your light. Think how you would find your food if you had always lived here.",
quiz: [["What have the cave fish of Astyanax mexicanus lost?", "Their eyes and their colour", "Their fins", "Their gills"], ["How long can an olm live?", "More than 100 years", "About a year", "About ten days"]] },
{ k: "np1", n: 9, at: "northpole", near: [66, -200], title: "The pole on the sea ice",
real: "The geographic North Pole is not on land. It lies in the middle of the Arctic Ocean, on sea ice usually two or three metres thick that drifts all the time, over water more than 4,000 metres deep.",
science: "Sea ice is frozen seawater, but as it freezes most of the salt is squeezed out into little channels of brine, so old ice is nearly fresh. A compass does not point to the geographic pole but to the magnetic north pole, which is somewhere else and wanders: in recent decades it has moved from northern Canada towards Siberia by up to about 50 kilometres a year.",
word: ["Pack ice", "sea ice that is not fastened to the shore and drifts with the wind and currents."],
tryit: "Stand still a while and think: everything under your feet here is moving, slowly, with the ocean beneath.",
quiz: [["What lies under the ice at the geographic North Pole?", "Ocean, more than 4,000 metres deep", "Solid rock", "A volcano"], ["Where does a compass needle point?", "To the magnetic north pole, which wanders", "Exactly to the geographic North Pole", "To the brightest star"]] },
{ k: "np2", n: 10, at: "northpole", near: [-64, 184], title: "Reindeer",
real: "Reindeer, called caribou in North America, are the only deer whose females regularly grow antlers as well as the males. The males shed theirs in early winter; the females keep theirs through the winter, which helps them win the best feeding spots.",
science: "A reindeer's hooves change with the seasons: in summer the pads are soft and spongy for walking on wet ground; in winter they shrink and harden, so the sharp rim of the hoof cuts into ice and crusted snow. Reindeer smell lichen under the snow and dig down to it. Their eyes even change colour, from gold in summer to blue in winter, to gather more of the dim winter light.",
word: ["Lichen", "a fungus and an alga living together as one; reindeer moss is a lichen."],
tryit: "Look at the pale, branching reindeer moss here. It grows only a few millimetres a year, which is why herds keep moving on.",
quiz: [["Which reindeer grow antlers?", "Both males and females", "Only males", "Only the young"], ["What do reindeer dig through the snow to eat?", "Lichen", "Fish", "Pine cones"]] },
{ k: "np3", n: 11, at: "northpole", near: [90, 104], title: "The long night and the midnight sun",
real: "At the North Pole the Sun rises once a year, around the March equinox, and sets once, around the September equinox. In between it circles the sky without setting; for the rest of the year it stays below the horizon, and after the twilight fades it is night for months.",
science: "The Earth's axis is tilted by about 23.4 degrees. For half of its orbit the northern half of the planet leans towards the Sun, and for the other half away from it. That tilt, not how near the Earth is to the Sun, is what makes the seasons: the Earth is in fact nearest the Sun in early January.",
word: ["Equinox", "one of the two days a year, in March and September, when day and night are about the same length everywhere."],
tryit: "Turn slowly all the way round. At the pole, every direction you face is south.",
quiz: [["How many times a year does the Sun rise at the North Pole?", "Once", "Every day", "Twice"], ["What causes the seasons?", "The tilt of the Earth's axis", "The Earth's distance from the Sun", "The Moon"]] },
{ k: "np4", n: 12, at: "northpole", near: [-76, -216], title: "The northern lights",
real: "The northern lights, the aurora borealis, are seen most often in a ring round the magnetic north pole that crosses northern Norway, Iceland, Alaska and Canada. Near the south pole the same lights are called the aurora australis.",
science: "The Sun throws out a constant stream of charged particles, the solar wind. The Earth's magnetic field steers some of them down towards the poles, where they strike the gases of the upper air about 100 to 300 kilometres up and make them glow. Oxygen gives the common green and, higher up, red; nitrogen gives blues and purples.",
word: ["Solar wind", "the stream of charged particles flowing out from the Sun."],
tryit: "Watch the sky here on a clear night. The aurora drifts and fades slowly, like a curtain moving in a breeze.",
quiz: [["Which gas gives the aurora its common green colour?", "Oxygen", "Helium", "Neon"], ["Where do the particles that make the aurora come from?", "The Sun", "The Moon", "Volcanoes"]] }
];
var WMS_COURSE = "world-hidden";
var WMSL = { cur: null, ans: {}, t0: 0, msg: "", at: {}, built: {} };
var WMS_HIDDEN_NAME = { neverland: "Neverland", underdark: "the Underdark", northpole: "a hidden world of its own" };
function wmslLog() { var st = (typeof eduStore === "function") ? eduStore() : {}; return st[WMS_COURSE] || (st[WMS_COURSE] = {}); }
function wmslDone(n) { return !!wmslLog()[n]; }
function wmslCount() { return WMS_LESSONS.filter(function (l) { return wmslDone(l.n); }).length; }
function wmslOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 5 + k * 2) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function wmslHere() { return typeof hxWorld === "function" ? hxWorld() : null; }
function wmslShown(l) { return l.at !== "northpole" || wmslHere() === "northpole"; }
function wmsLessonList() { return __ZC(327, 67, this, arguments, new.target); }
function wmslGuide(l) { var a = WMSL.at[l.k] || l.near; if (typeof hxGuideTo === "function")
hxGuideTo(l.at, a[0], a[1], "Lesson: " + l.title); }
function wmsLessonCard(l) { return __ZC(327, 68, this, arguments, new.target); }
function wmslCheck(l) { return __ZC(327, 69, this, arguments, new.target); }
function wmslFree(w, x, z) { return __ZC(327, 70, this, arguments, new.target); }
function wmslLectern(G, w, l, x, z) { return __ZC(327, 71, this, arguments, new.target); }
function wmsLearnDress(w, G) { return __ZC(327, 72, this, arguments, new.target); }
(function () { try {
["neverland", "underdark", "northpole"].forEach(function (w) { if (typeof WORLDS !== "undefined" && WORLDS[w] && WORLDS[w].g && HX.built[w])
wmsLearnDress(w, WORLDS[w].g); });
}
catch (e) { } })();
(function () {
if (typeof hxHub !== "function")
return;
var hh = hxHub;
hxHub = function () {
var w = wmslHere(), mine = WMS_LESSONS.filter(function (l) { return l.at === w; });
if (!mine.length)
return hh.apply(this, arguments);
var cap = wmsCapture(function () { hh(); });
if (!cap)
return;
var h = cap[0], fns = cap[1];
h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>Learn · World Learning, the Department of Education</div>";
mine.forEach(function (l, i) { var k = "wmsl" + i; h += worldBtn(k, (wmslDone(l.n) ? "✓ " : "🎓 ") + esc(l.title), "At its lectern: show me the way"); fns[k] = function () { wmslGuide(l); }; });
h += worldBtn("wmslall", "🎓 The whole course", "the hidden worlds: " + wmslCount() + " of " + WMS_LESSONS.length + " stamped");
fns.wmslall = wmsLessonList;
worldCard(h, fns);
};
})();
(function () {
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () { var h = er.apply(this, arguments); try {
return h + '<div style="margin-top:6px">World Learning: the hidden worlds, ' + wmslCount() + ' of ' + WMS_LESSONS.length + ' lessons learned.</div>';
}
catch (e) {
return h;
} };
}
if (typeof eduWorldCard === "function") {
var ew = eduWorldCard;
eduWorldCard = function () {
ew.apply(this, arguments);
try {
if (!EDU.lesson || typeof EDU.lesson.html !== "string")
return;
var H = EDU.lesson.html, box = '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>The hidden worlds</b> · Neverland, the Underdark and beyond<br>Twelve lessons, each at a lectern beside what it is about: lagoons and coral, how anything flies, steering by the stars, crocodiles; how caves are made, fungi that glow, giant crystals, life in the dark; and more for those who find the way. <span style="color:#2A6A3A">You have learned ' + wmslCount() + ' of ' + WMS_LESSONS.length + '.</span></div>';
var mark = '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>Already teaching', i = H.indexOf(mark);
H = i >= 0 ? H.slice(0, i) + box + H.slice(i) : H + box;
H = H.replace(/<b>Next from this office<\/b><br>[^<]*/, "<b>Next from this office</b><br>More worlds keep getting their own programmes, taught where the stories live.");
EDU.lesson.html = H;
if (typeof eduLessonPaintHtml === "function")
eduLessonPaintHtml();
}
catch (e) { }
};
}
if (typeof bkpHtml === "function") {
var bh = bkpHtml;
bkpHtml = function () { var h = bh.apply(this, arguments); try {
var n = wmslCount();
if (n && typeof bkpRow === "function")
h += bkpRow("🎓 World Learning: the hidden worlds", typeof bkpDim === "function" ? bkpDim(n + " of " + WMS_LESSONS.length + " stamps") : n + " of " + WMS_LESSONS.length);
}
catch (e) { } return h; };
}
})();
var WMP_OK = typeof OW_PLACES !== "undefined" && typeof OW_GOODS !== "undefined" && typeof owBuildSurface === "function";
var WMP = { guide: null, aur: null, space: null, race: null, btn: null, menuBtn: null, t: 0, cur: null, ans: {}, t0: 0, msg: "" };
var WMP_JOB0 = 4300, WMP_JOB1 = 4399;
var WMP_GOODS = [
{ k: "ow_mo_regolith", n: "Mare regolith", e: "🌑", b: 4, w: "moon", lo: 2, hi: 4, g: 12, note: "Grey dust and broken rock from the Sea of Tranquillity, made by billions of years of tiny meteorite impacts, and sharp as glass because no wind or water has ever worn it smooth." },
{ k: "ow_mo_ilmenite", n: "Ilmenite sand", e: "⚫", b: 9, w: "moon", lo: 1, hi: 2, g: 20, note: "A black, glittering mineral of iron, titanium and oxygen, common in the basalts of the lunar seas. Heated with hydrogen, it gives up its oxygen as water." },
{ k: "ow_mo_anorth", n: "Highland anorthosite", e: "⚪", b: 7, w: "moon", lo: 1, hi: 2, g: 18, note: "The pale rock of the Moon's highlands, thrown onto the sea's edge by ancient impacts: some of the oldest rock there is, more than 4 billion years old." },
{ k: "ow_mo_ice", n: "Polar crater ice", e: "🧊", b: 12, w: "moon", lo: 1, hi: 2, g: 25, note: "Ice cored from a crater floor near the south pole that the Sun never reaches, brought up by the Corp's polar crawler. Melted, it is water; split, it is air and rocket fuel." },
{ k: "ow_mo_oxygen", n: "Lunar oxygen canister", e: "🫧", b: 16, w: "made", note: "Oxygen roasted out of ilmenite with hydrogen: air to breathe, made from the Moon itself." },
{ k: "ow_mo_brick", n: "Sintered regolith brick", e: "🧱", b: 10, w: "made", note: "Regolith heated until its grains fuse: the Corp builds its berms and pads from these." },
{ k: "ow_mo_salad", n: "Outpost greenhouse salad", e: "🥗", b: 3, fd: 12, dr: 6, pr: 5, w: "supply", note: "Leaves from the outpost's biodome, grown under lamps in water." },
{ k: "ow_ma_basalt", n: "Martian basalt", e: "🪨", b: 6, w: "mars", lo: 1, hi: 3, g: 15, note: "Dark volcanic rock, the commonest rock on Mars. The iron in it rusts to the red dust that covers everything." },
{ k: "ow_ma_clay", n: "Jezero delta clay", e: "🟫", b: 8, w: "mars", lo: 1, hi: 3, g: 18, note: "Clay from the old river delta, made by water working on rock 3.5 billion years ago. Like all Martian soil it carries perchlorate salts until it is washed." },
{ k: "ow_ma_o2", n: "Mars oxygen canister", e: "🫧", b: 12, w: "mars", lo: 1, hi: 2, g: 16, note: "Oxygen split out of the carbon dioxide air at about 800 °C, as the MOXIE experiment aboard Perseverance first did in April 2021." },
{ k: "ow_ma_ice", n: "Northern scarp ice", e: "🧊", b: 10, w: "mars", lo: 1, hi: 2, g: 22, note: "Water ice from the steep northern slopes where it lies just under the dust, brought south by the settlement's ice convoy." },
{ k: "ow_ma_soil", n: "Washed Martian soil", e: "🪴", b: 13, w: "made", note: "Delta clay rinsed of its perchlorates: safe for the greenhouse at last." },
{ k: "ow_ma_stew", n: "Settlement potato stew", e: "🍲", b: 4, fd: 28, dr: 6, pr: 7, w: "supply", note: "Potatoes from the Jezero greenhouse, stewed in the Commons' galley." },
{ k: "ow_au_mizuna", n: "Mizuna greens", e: "🥬", b: 3, fd: 7, dr: 3, w: "aurora", lo: 2, hi: 3, g: 15, note: "A peppery mustard green from the station's hydroponic beds. ISS crews have grown and eaten mizuna too." },
{ k: "ow_au_chile", n: "Española chile pepper", e: "🌶️", b: 5, fd: 4, w: "aurora", lo: 1, hi: 2, g: 25, note: "The chile variety astronauts on the International Space Station grew and ate in 2021, after about four months." },
{ k: "ow_au_scrap", n: "Recovered aluminium scrap", e: "🥫", b: 6, w: "aurora", lo: 1, hi: 3, g: 15, note: "Sorted out of the recycling bay: worn brackets, empty canisters, packaging. Nothing aboard is thrown away." },
{ k: "ow_au_tortilla", n: "Station tortilla wrap", e: "🌯", b: 3, fd: 22, pr: 4, w: "supply", note: "Tortillas instead of bread: they make no crumbs to float into eyes and machines." },
{ k: "ow_au_coffee", n: "Coffee in a pouch", e: "☕", b: 2, fd: 2, dr: 20, pr: 3, w: "supply", note: "Sipped through a straw with a valve, because a cup of liquid would float away in a ball." },
{ k: "ow_sp_nife", n: "Nickel-iron ore", e: "⛓️", b: 10, w: "space", lo: 1, hi: 2, g: 20, note: "From a metal-rich asteroid in the belt: mostly iron, with nickel, like the iron meteorites that fall to Earth." },
{ k: "ow_sp_chondrite", n: "Carbonaceous chondrite", e: "🌚", b: 8, w: "space", lo: 1, hi: 3, g: 18, x: ["ow_sp_nife", 0.1], note: "Dark, crumbly rock from a carbon-rich asteroid, the commonest kind: it holds water locked in clay minerals." },
{ k: "ow_sp_comet", n: "Comet ice", e: "☄️", b: 9, w: "space", lo: 2, hi: 3, g: 20, note: "Dirty snow from the comet's nucleus: water ice with frozen carbon dioxide and dust." }
];
var WMP_REFINE = [
{ k: "mo_oxygen", n: "Roast ilmenite with hydrogen into oxygen", need: { ow_mo_ilmenite: 3, ow_mo_ice: 1 }, make: "ow_mo_oxygen", x: 1, at: ["moon", "fab"] },
{ k: "mo_brick", n: "Sinter regolith into bricks", need: { ow_mo_regolith: 4 }, make: "ow_mo_brick", x: 1, at: ["moon"] },
{ k: "mo_melt", n: "Melt polar ice into drinking water", need: { ow_mo_ice: 1 }, make: "ow_water", x: 3, at: ["moon", "mars", "fab"] },
{ k: "mo_glass", n: "Fuse anorthosite and regolith into glass", need: { ow_mo_anorth: 2, ow_mo_regolith: 2 }, make: "cr_glass", x: 1, at: ["moon", "fab"] },
{ k: "ma_wash", n: "Wash delta clay into safe soil", need: { ow_ma_clay: 2, ow_water: 1 }, make: "ow_ma_soil", x: 1, at: ["mars"] },
{ k: "ma_melt", n: "Melt scarp ice into drinking water", need: { ow_ma_ice: 1 }, make: "ow_water", x: 3, at: ["mars", "fab"] },
{ k: "ma_ore", n: "Smelt basalt into iron ore", need: { ow_ma_basalt: 4 }, make: "cr_ore", x: 1, at: ["mars", "fab"] },
{ k: "au_parts", n: "Press recycled scrap into machine parts", need: { ow_au_scrap: 3 }, make: "cr_parts", x: 1, at: ["aurora", "fab"] },
{ k: "sp_ore", n: "Smelt nickel-iron into iron ore", need: { ow_sp_nife: 2 }, make: "cr_ore", x: 1, at: ["moon", "aurora", "fab"] },
{ k: "sp_melt", n: "Melt comet ice into drinking water", need: { ow_sp_comet: 1 }, make: "ow_water", x: 2, at: ["moon", "mars", "aurora", "fab"] }
];
var WMP_WORK = { moon: "Tranquillity Outpost", mars: "Jezero Settlement", aurora: "Station Aurora", space: "The Space Corp belt claims" };
var WMP_JOBS = [
[4301, "Tranquillity Outpost commander", "moon", 16, 1, false, [8, 8], [["Command Tranquillity Outpost", "desk", ["Read the overnight log", "Check the habitats' seals and power", "Set the day's work", "Report to the Spaceport"]]]],
[4302, "Lunar regolith prospector", "moon", 13, 3, true, [7, 8], [["Prospect the sea floor", "station", ["Suit check at the airlock", "Walk the survey line", "Scoop and seal the samples", "Log them at the lab"]]]],
[4303, "Polar ice hauler", "moon", 11, 2, true, [6, 8], [["Unload the polar crawler", "station", ["Meet the crawler at the hopper", "Lift out the ice cores", "Stack them in the cold store", "Clear the frost from the bay"]]]],
[4304, "Tranquillity Exchange clerk", "moon", 10, 1, true, [8, 8], [["Run the Exchange", "desk", ["Weigh in the samples", "Pay the crew for them", "Stock the shelves", "Write up the book"]]]],
[4305, "Outpost galley cook", "moon", 10, 1, true, [6, 8], [["Cook in the galley", "station", ["Pick the greenhouse salad", "Heat the ration stew", "Serve the crew", "Clean the galley"]]]],
[4306, "Long jump marshal", "moon", 10, 1, true, [9, 8], [["Keep the Long Jump", "station", ["Rake the landing ground", "Check the take-off board", "Measure each jump", "Post the day's best"]]]],
[4311, "Jezero Settlement commander", "mars", 16, 1, false, [8, 8], [["Command Jezero Settlement", "desk", ["Read the dust forecast", "Check the greenhouse and the oxygen plant", "Set the day's work", "Report to the Ares Gateway"]]]],
[4312, "Martian field geologist", "mars", 13, 2, true, [7, 8], [["Study the old delta", "station", ["Suit check at the airlock", "Walk to the delta", "Sample the clay and basalt", "Log them at the lab"]]]],
[4313, "Soil washing technician", "mars", 11, 2, true, [7, 8], [["Wash the soil", "station", ["Load the clay", "Rinse out the perchlorates", "Test the rinse water", "Bag the soil for the greenhouse"]]]],
[4314, "Jezero Exchange clerk", "mars", 10, 1, true, [8, 8], [["Run the Exchange", "desk", ["Weigh in the samples", "Pay the crew for them", "Stock the shelves", "Write up the book"]]]],
[4315, "Oxygen plant operator", "mars", 12, 2, true, [6, 8], [["Run the oxygen plant", "station", ["Warm the cells to temperature", "Check the carbon dioxide intake", "Swap the full canisters", "Log the output"]]]],
[4316, "Sample depot curator", "mars", 13, 1, true, [8, 8], [["Keep the sample depot", "station", ["Check each tube's seal", "Log where each one lies", "Mark the depot for the dust season", "Report to the lab"]]]],
[4321, "Aurora hydroponics technician", "aurora", 11, 2, true, [7, 8], [["Tend the hydroponic beds", "station", ["Check the nutrient water", "Set the lamps", "Pick what is ready", "Replant the pillows"]]]],
[4322, "Aurora commissary clerk", "aurora", 10, 1, true, [8, 8], [["Run the Commissary", "desk", ["Stock the shelves", "Serve the crew", "Buy in what is brought", "Write up the book"]]]],
[4323, "Life support recycling technician", "aurora", 13, 2, true, [7, 8], [["Keep the recycling bay", "station", ["Read the water processor", "Change the filters", "Sort the scrap bins", "Log the loop"]]]],
[4324, "Aurora station director", "aurora", 16, 1, false, [8, 8], [["Direct Station Aurora", "desk", ["Read the overnight log", "Check life support", "Meet the crew", "Report to the Spaceport"]]]],
[4331, "Belt ore prospector", "space", 12, 3, true, [7, 8], [["Work the belt claims", "station", ["Fly out to the claim", "Anchor to the asteroid", "Fill the ore hold", "Log the haul"]]]],
[4332, "Comet ice harvester", "space", 12, 2, true, [7, 8], [["Harvest comet ice", "station", ["Match the comet's speed", "Keep clear of the jets", "Fill the ice tanks", "Log the haul"]]]],
[4333, "Ring Run course marshal", "space", 10, 1, true, [9, 8], [["Keep the Ring Run", "station", ["Check each marker ring", "Clear the course", "Time the runs", "Post the day's best"]]]],
[4390, "Near-space field instructor", "any", 13, 1, false, [9, 8], [["Teach World Learning: The Moon, Mars and Orbit", "station", ["Meet the learners where the lesson happens", "Teach it on the spot", "Ask the questions", "Stamp the record"]]]]
];
var WMP_LESSONS = [
{ k: "mo_dust", w: "moon", at: "regolith", title: "Dust as sharp as glass",
real: "The Moon is covered in regolith: fine dust and broken rock, a few metres deep on the lunar seas. After their moonwalks the Apollo astronauts found it clinging to their suits, and said it smelled like spent gunpowder.",
science: "On Earth, wind and water round off grains of sand. The Moon has neither, so its dust, made by billions of years of tiny meteorite impacts, stays jagged. Sunlight also gives it an electric charge, which helps it cling to everything.",
word: ["Regolith", "the loose layer of dust and broken rock that covers the solid rock of the Moon and many other worlds."],
tryit: "Scoop some regolith here and look closely at the grains: every one has sharp edges.",
quiz: [["Why is Moon dust so sharp?", "No wind or water has worn it smooth", "The cold sharpens it", "It is made of broken bottles"], ["What did Apollo astronauts say the dust smelled like?", "Spent gunpowder", "Roses", "Nothing at all"]] },
{ k: "mo_ice", w: "moon", at: "icelab", title: "Ice in eternal shadow",
real: "The Moon's axis is tilted only about 1.5 degrees, so the floors of some craters near its poles never see the Sun. In 2009 NASA's LCROSS mission crashed a rocket stage into one of them, Cabeus, and found water in the plume it threw up.",
science: "Without sunlight, those crater floors stay colder than −230 °C, among the coldest places ever measured in the Solar System. Water that wanders in freezes and stays, perhaps for billions of years. That ice could give future crews drinking water, air and rocket fuel.",
word: ["Cold trap", "a place so cold that anything frozen which drifts in can never warm up enough to escape."],
tryit: "Look at the ice core in the lab's cold case: the polar crawler brought it from near the south pole, more than 2,500 km away.",
quiz: [["Why do some polar craters on the Moon never see sunlight?", "The Moon's axis is only slightly tilted", "They have roofs over them", "The Earth always blocks the Sun"], ["What did LCROSS find in Cabeus crater in 2009?", "Water", "Gold", "Living things"]] },
{ k: "mo_oxygen", w: "moon", at: "ops", title: "Breathing the rocks",
real: "Moon rock is about 40 to 45 percent oxygen by weight, locked into its minerals. The rocks Apollo 11 brought home from this very sea were rich in ilmenite, a black mineral of iron, titanium and oxygen.",
science: "Heat ilmenite with hydrogen and the hydrogen pulls oxygen out of it as water. Split the water with electricity and you have oxygen to breathe, and the hydrogen back to use again. It is one way engineers plan to make air on the Moon instead of carrying it from Earth.",
word: ["In-situ resource use", "living off the land: making what you need from what is already there, instead of shipping it in."],
tryit: "Gather the black ilmenite sand west of the landing ground, then roast it into oxygen at the Exchange.",
quiz: [["About how much of Moon rock is oxygen, by weight?", "About 40 to 45 percent", "None at all", "About 1 percent"], ["What does heating ilmenite with hydrogen make?", "Water, which can be split into oxygen", "Gold", "Sand"]] },
{ k: "mo_jump", w: "moon", at: "jump", title: "A sixth of the pull",
real: "Gravity on the Moon is about a sixth of Earth's: 1.62 metres per second squared. Apollo astronauts found a bounding hop easier than walking, and on Apollo 14 in 1971 Alan Shepard hit two golf balls across the Moon.",
science: "Push off just as hard as at home and you rise about six times as high and stay up about six times as long, so you travel about six times as far. Your mass, how much of you there is, stays the same: only your weight, gravity's pull on it, is smaller.",
word: ["Weight and mass", "mass is how much stuff you are made of; weight is how hard gravity pulls on it. On the Moon your mass is the same and your weight is a sixth."],
tryit: "Take on the Long Jump here: the same jump that clears half a metre at home carries you a long way.",
quiz: [["How strong is the Moon's gravity compared with Earth's?", "About a sixth", "About the same", "Twice as strong"], ["What stays the same when you go to the Moon?", "Your mass", "Your weight", "How high you can jump"]] },
{ k: "ma_lake", w: "mars", at: "delta", title: "A lake in Jezero",
real: "About 3.5 billion years ago Jezero Crater held a lake, fed by a river that left a fan-shaped delta. Perseverance has explored it since landing on 18 February 2021, and between December 2022 and January 2023 it set down ten sealed sample tubes at a spot called Three Forks, for a later mission to collect.",
science: "Clay minerals form when water works on rock for a long time, so clay here means water stayed. On Earth, the fine mud at the bottom of a lake is good at trapping and keeping signs of tiny living things, which is why the rover came.",
word: ["Delta", "a fan of mud and sand dropped where a river slows down as it flows into a lake or sea."],
tryit: "Dig delta clay here: it was laid down by water.",
quiz: [["What did Jezero Crater hold long ago?", "A lake fed by a river", "An ocean of lava", "A forest"], ["What did Perseverance leave at Three Forks?", "Ten sealed sample tubes", "A flag", "A second rover"]] },
{ k: "ma_soil", w: "mars", at: "lab", title: "Washing the soil",
real: "In 2008 NASA's Phoenix lander found perchlorate salts in Martian soil, about half a percent of it. Perchlorate is harmful to people: it can stop the thyroid gland working properly.",
science: "Perchlorates dissolve easily in water, so settlers plan to rinse the salts out of the soil before growing food in it. Martian soil has many minerals plants need, but almost no rotted plant matter, so it needs feeding too.",
word: ["Perchlorate", "a salt made of chlorine and oxygen: common in Martian soil, and something to wash out before you farm."],
tryit: "Bring delta clay and water to the Exchange and wash it into soil the greenhouse can use.",
quiz: [["Why must Martian soil be washed before farming?", "It holds perchlorate salts that are harmful", "It is too wet", "It is full of gold"], ["Which lander found perchlorate on Mars in 2008?", "Phoenix", "Apollo 11", "Voyager 2"]] },
{ k: "ma_air", w: "mars", at: "oxygen", title: "Oxygen from the air",
real: "Mars's air is about 95 percent carbon dioxide and less than 1 percent as thick as Earth's. On 20 April 2021 MOXIE, an experiment aboard Perseverance, made oxygen from it: the first oxygen ever made from another planet's air. By 2023 it had made 122 grams.",
science: "MOXIE heated the carbon dioxide to about 800 °C and split it with electricity into oxygen and carbon monoxide. A bigger machine could make oxygen for crews to breathe, and for the rockets that would carry them home.",
word: ["Electrolysis", "splitting a substance into its parts by passing electricity through it."],
tryit: "Take a canister from the oxygen plant's cabinets.",
quiz: [["What did MOXIE make from Mars's air in 2021?", "Oxygen", "Water", "Petrol"], ["Mars's air is mostly…", "Carbon dioxide", "Oxygen", "Nitrogen"]] },
{ k: "ma_storm", w: "mars", at: "storm", title: "When the dust rises",
real: "In 2018 a dust storm spread round the whole of Mars and blotted out the Sun for months. The solar-powered rover Opportunity, which had worked for more than 14 years, fell silent on 10 June 2018 and never woke again.",
science: "Mars's air is so thin that even a fast wind pushes only gently: a storm could not knock you over. The danger is the dust: it hangs in the sky for weeks, so sunlight cannot reach solar panels, and it works into seals and joints.",
word: ["Global dust storm", "a storm whose dust spreads until it covers the whole planet. Mars has one every few Martian years."],
tryit: "Take on the Sample Return: bring the tubes home before the storm closes in.",
quiz: [["What ended the Opportunity rover's mission in 2018?", "A dust storm that blocked its sunlight", "A crash into a crater", "A volcano"], ["Could a Martian storm wind knock you over?", "No: the air is too thin to push hard", "Yes, easily", "Only at night"]] },
{ k: "au_water", w: "aurora", at: "recycle", title: "Every drop, again",
real: "On the International Space Station, the water recovery system recycles about 98 percent of the water the crew use, including sweat, the moisture in their breath, and urine. NASA announced it had reached that figure in 2023.",
science: "The water is filtered, boiled at low pressure and treated until it is cleaner than most tap water on Earth. Every litre that does not have to be launched saves a great deal of fuel.",
word: ["Closed loop", "a system that uses the same things again and again instead of throwing them away."],
tryit: "Look at the water processor rack here, then sort a bin of scrap.",
quiz: [["About how much of its water does the ISS recycle?", "About 98 percent", "About 10 percent", "None of it"], ["Which of these does the ISS turn back into drinking water?", "Sweat, breath moisture and urine", "Rocket fuel", "Moon dust"]] },
{ k: "au_garden", w: "aurora", at: "hydro", title: "A garden in orbit",
real: "In August 2015 astronauts on the International Space Station ate lettuce they had grown there themselves. In 2021 they grew chile peppers in the station's Advanced Plant Habitat and, after about four months, ate them in tacos.",
science: "Without gravity to tell them which way is down, roots follow water and shoots grow towards light. Plants grow in pillows of clay-like grains and fertiliser, under red, blue and green lamps, and fans keep the air moving so still, warm air does not smother the leaves.",
word: ["Phototropism", "a plant growing towards light."],
tryit: "Pick from the hydroponic beds: the grower is glad of the help.",
quiz: [["Without gravity, which way do shoots grow?", "Towards the light", "Always towards the floor", "They cannot grow"], ["What did ISS astronauts grow and eat in 2021?", "Chile peppers", "Watermelons", "Wheat for bread"]] },
{ k: "au_air", w: "aurora", at: "lifesupport", title: "Air from water",
real: "The ISS makes most of its oxygen by splitting water with electricity. Machines take out the carbon dioxide the crew breathe out, and a Sabatier reactor joins some of it with leftover hydrogen to make more water.",
science: "Splitting water gives oxygen and hydrogen. The Sabatier reaction joins carbon dioxide and hydrogen to make water and methane: the water goes back into the loop, and the methane is vented into space.",
word: ["Life support", "the machines that give a crew air, water and the right temperature to stay alive."],
tryit: "Read the life support panel here at the consoles by the great window.",
quiz: [["How does the ISS make most of its oxygen?", "By splitting water with electricity", "From its plants alone", "It brings new tanks every day"], ["What does a Sabatier reactor make from carbon dioxide and hydrogen?", "Water and methane", "Oxygen and gold", "Sugar"]] },
{ k: "sp_belt", w: "space", at: "claims", title: "The asteroid belt",
real: "Between Mars and Jupiter lie millions of rocky bodies, the asteroid belt. All of them together hold only about 3 percent of the Moon's mass, and the largest, the dwarf planet Ceres, holds about a quarter of that. NASA's Psyche spacecraft, launched in October 2023, is on its way to a metal-rich asteroid.",
science: "The belt is mostly empty space: asteroids are so far apart that spacecraft have crossed it many times without coming near one. Some asteroids are stony, some dark and rich in carbon, some mostly metal, like the iron meteorites that fall to Earth.",
word: ["Asteroid", "a small rocky or metal body orbiting the Sun, too small to be called a planet."],
tryit: "Mine a claim: the dark ones are rich in carbon, the bright ones are metal.",
quiz: [["Where is the asteroid belt?", "Between Mars and Jupiter", "Between Earth and the Moon", "Beyond Pluto"], ["Together, the belt's asteroids hold about…", "3 percent of the Moon's mass", "Twice the Earth's mass", "Half the Sun's mass"]] },
{ k: "sp_comet", w: "space", at: "comet", title: "Dirty snowballs",
real: "A comet's heart, its nucleus, is a lump of ice and dust a few kilometres across. Europe's Rosetta orbited comet 67P from 2014 to 2016, and its lander Philae touched down on it on 12 November 2014: the first landing on a comet.",
science: "Far from the Sun a comet is dark and frozen. Nearer, its ice turns straight to gas and blows off dust, making a glowing cloud, the coma, and tails that always point away from the Sun, pushed by sunlight and the solar wind.",
word: ["Sublimation", "a solid turning straight into a gas without melting first."],
tryit: "Fly alongside the comet and collect some of its ice.",
quiz: [["Which way does a comet's tail point?", "Away from the Sun", "Always behind it", "Towards the Earth"], ["Rosetta's lander Philae made the first landing on…", "A comet", "Mars", "The Sun"]] }
];
var WMP_LESSON = {};
WMP_LESSONS.forEach(function (l, i) { l.n = i + 1; WMP_LESSON[l.k] = l; });
var WMP_PLACE_NAME = { moon: "the Moon", mars: "Mars", aurora: "Station Aurora", space: "open space" };
var WMP_PLACES = {
moon: { name: "the Moon", post: "Tranquillity Outpost", col: "#C8C8C8", noPad: true,
hall: { x: 75, z: -20, w: 36, d: 26, door: "w", name: "The Hub, Tranquillity Outpost",
rooms: [["airlock", "The airlock lobby", -18, -5, -8, 5], ["ops", "Outpost operations", -8, -13, 6, -1], ["exchange", "The Tranquillity Exchange", -8, 1, 6, 13],
["icelab", "The regolith and ice lab", 6, -13, 18, -1], ["mess", "The galley", 6, 1, 18, 13], ["bunks", "Crew bunks", -18, -13, -8, -5, 1], ["power", "The power room", -18, 5, -8, 13, 1]],
doors: [[-8, 0], [-1, -1], [-1, 1], [12, -1], [12, 1], [-13, -5, 1], [-13, 5, 1]] },
spots: { ops: [73, -26, 4, "outpost operations"], icelab: [87, -26, 4, "the regolith and ice lab"], exchange: [71, -14, 4, "the Tranquillity Exchange"], mess: [89, -14, 4, "the galley"],
regolith: [15, -43, 4, "the regolith field"], jump: [8, 40, 4, "the Long Jump runway"] },
gather: [{ k: "ow_mo_regolith", look: "regolith", at: [15, -60, 16, 6] }, { k: "ow_mo_ilmenite", look: "ilmenite", at: [-100, -10, 22, 5] }, { k: "ow_mo_anorth", look: "anorth", at: [-100, -140, 22, 5] },
{ k: "ow_mo_ice", look: "hopper", spots: [[99, -14], [99, -25]] }],
crew: [
{ id: "clerk", name: "Ivo Petrak", title: "Tranquillity Exchange clerk", room: "exchange", x: 71, z: -10, rot: Math.PI, greet: "Samples in, supplies out. Regolith, ilmenite, ice: I buy it all for the city, and I'll roast ilmenite into oxygen if you bring me the makings.", who: "the clerk at the Tranquillity Exchange, brisk, fair and fond of a good ilmenite sample" },
{ id: "icesci", name: "Dr Sun-hee Park", title: "Lunar ice scientist", room: "icelab", x: 91, z: -28, rot: -Math.PI / 2, greet: "Careful with the cold case: that core is from a crater floor near the south pole that hasn't seen the Sun in billions of years.", who: "a planetary scientist who studies the polar ice of the Moon" },
{ id: "cook", name: "Rosa Delgado", title: "Outpost galley cook", room: "mess", x: 90, z: -10, rot: Math.PI, greet: "Stew's hot, salad's from the dome. Sit down before you float off. Well: before you bounce off.", who: "the galley cook at Tranquillity Outpost, warm and teasing" },
{ id: "tech", name: "Hamid Sadeghi", title: "Long jump marshal", x: 12, z: 44, rot: Math.PI, wander: 5, greet: "Run up, jump before the white board, and see how far a sixth of Earth's gravity lets you fly. I'll measure it.", who: "the marshal of the Long Jump at Tranquillity Outpost, who measures every jump and loves a record" }
],
trade: { room: "exchange", at: [69, -10], sells: ["ow_ration", "ow_pouch", "ow_mo_salad"], refine: "moon", name: "The Tranquillity Exchange" },
chal: { k: "mo_jump", kind: "jump", name: "The Long Jump", start: [8, 40], board: 30, lane: 40,
about: "Run up the runway and jump before the white take-off board. Three jumps; the longest counts. On the Moon you weigh a sixth of what you weigh at home, so you stay up about six times as long.",
min: 0, max: 1500, reward: "ow_mo_ilmenite" }
},
mars: { name: "Mars", post: "Jezero Settlement", col: "#E07A50", noPad: true,
hall: { x: -70, z: -20, w: 36, d: 26, door: "e", name: "The Commons, Jezero Settlement",
rooms: [["airlock", "The airlock lobby", 8, -5, 18, 5], ["ops", "Settlement operations", -6, -13, 8, -1], ["exchange", "The Jezero Exchange", -6, 1, 8, 13],
["workshop", "The soil and sample lab", -18, -13, -6, -1], ["mess", "The galley", -18, 1, -6, 13], ["bunks", "Crew bunks", 8, -13, 18, -5, 1], ["power", "The power room", 8, 5, 18, 13, 1]],
doors: [[8, 0], [1, -1], [1, 1], [-12, -1], [-12, 1], [13, -5, 1], [13, 5, 1]] },
spots: { ops: [-68, -26, 4, "settlement operations"], lab: [-82, -26, 4, "the soil and sample lab"], exchange: [-66, -14, 4, "the Jezero Exchange"], mess: [-84, -14, 4, "the galley"],
delta: [38, 42, 4, "the old delta"], oxygen: [-85, -38, 3, "the oxygen plant"], storm: [-44, -6.5, 2.5, "the Sample Return board"] },
gather: [{ k: "ow_ma_basalt", look: "dark", at: [-150, 20, 22, 6] }, { k: "ow_ma_clay", look: "clay", at: [60, 40, 20, 6] },
{ k: "ow_ma_o2", look: "cell", spots: [[-62, -40], [-70, -40], [-78, -40]] }, { k: "ow_ma_ice", look: "hopper", spots: [[-93, -14], [-93, -25]] }],
crew: [
{ id: "clerk", name: "Bram Visser", title: "Jezero Exchange clerk", room: "exchange", x: -66, z: -10, rot: Math.PI, greet: "Basalt, clay, oxygen, ice: the Exchange buys it for the city. Bring clay and water and I'll wash it into soil the greenhouse can use.", who: "the clerk at the Jezero Exchange, dry-humoured and careful with the scales" },
{ id: "geo", name: "Dr Leila Haddad", title: "Martian field geologist", room: "workshop", x: -86, z: -28, rot: Math.PI / 2, greet: "Clay means water, and water that stayed. This delta was a lake bottom three and a half billion years ago.", who: "a field geologist who studies the delta and the rocks of Jezero Crater" },
{ id: "cook", name: "Mateo Rojas", title: "Settlement galley cook", room: "mess", x: -85, z: -10, rot: Math.PI, greet: "Potato stew, from potatoes grown in washed Martian soil. Nobody believes me until they taste it.", who: "the galley cook at Jezero Settlement, proud of his greenhouse potatoes" },
{ id: "tech", name: "Ama Boateng", title: "Sample depot curator", x: -44, z: -16, rot: -Math.PI / 2, wander: 4, greet: "Four sample tubes out at the depot sites, and a storm front coming. Fancy bringing them in before it gets here?", who: "the curator of the settlement's sample depot, calm and exact" }
],
trade: { room: "exchange", at: [-64, -10], sells: ["ow_ration", "ow_pouch", "ow_ma_stew"], refine: "mars", name: "The Jezero Exchange" },
chal: { k: "ma_sample", kind: "sample", name: "The Sample Return", start: [-48, -20], limit: 240,
about: "Four sealed sample tubes lie at the depot sites around the settlement. Collect each in turn and bring them home to the Commons before the dust storm closes in: the sky darkens as it comes.",
beacons: [[-20, -130], [60, -150], [130, -60], [110, 50], [-48, -20]], min: 20, max: 600, reward: "ow_ma_clay" }
},
aurora: { name: "Station Aurora", post: "Station Aurora", col: "#8FB4E8", station: true,
spots: { recycle: [21, 1.6, 2.4, "the recycling bay"], hydro: [-18, -21, 2.6, "the hydroponic beds"], lifesupport: [0, -26.6, 2.6, "the life support consoles"] },
gather: [{ k: "ow_au_mizuna", look: "hydro", spots: [[-22, -18], [-22, -8]] }, { k: "ow_au_chile", look: "hydro", spots: [[-22, -13], [-22, -3]] }, { k: "ow_au_scrap", look: "bin", spots: [[18.5, -1.6], [21.5, -1.6]] }],
trade: { at: [8, -1.4], sells: ["ow_au_tortilla", "ow_au_coffee", "ow_ration", "ow_pouch"], refine: "aurora", name: "The Aurora Commissary" }
}
};
var WMP_RACE = { k: "sp_rings", name: "The Ring Run", min: 20, max: 600, reward: "ow_sp_nife", cap: 160,
about: "Ten marker rings strung out beyond Station Aurora. Fly through each in turn, as fast as you can. The course marshal holds every ship to 160 for safety, so there is no boosting through." };
var WMP_CHALS = [["mo_jump", "The Long Jump (the Moon)", false, 0, 1500, "ow_mo_ilmenite"], ["ma_sample", "The Sample Return (Mars)", true, 20, 600, "ow_ma_clay"], ["sp_rings", "The Ring Run (open space)", true, 20, 600, "ow_sp_nife"]];
var WMP_HOMES = [
["venus", "dome", { x: 62, z: 12 }, [["Lavinia Cool Domes 1", 100, 36], ["Lavinia Cool Domes 2", 114, 52], ["Lavinia Cool Domes 3", 128, 36]], "Venus"],
["jupiter", "cabin", { x: 0, z: 0 }, [["Galileo Deck Cabin 1", 20, 47], ["Galileo Deck Cabin 2", -22, 46], ["Galileo Deck Cabin 3", 48, -2]], "Cloud Station Galileo (Jupiter)"],
["uranus", "cabin", { x: 0, z: 0 }, [["Herschel Deck Cabin 1", 20, 47], ["Herschel Deck Cabin 2", -22, 46], ["Herschel Deck Cabin 3", 48, -2]], "Cloud Station Herschel (Uranus)"],
["neptune", "cabin", { x: 0, z: 0 }, [["Le Verrier Deck Cabin 1", 20, 47], ["Le Verrier Deck Cabin 2", -22, 46], ["Le Verrier Deck Cabin 3", 48, -2]], "Cloud Station Le Verrier (Neptune)"]
];
if (WMP_OK) {
WMP_GOODS.forEach(function (g) { if (!OW_GOOD[g.k]) {
OW_GOODS.push(g);
OW_GOOD[g.k] = g;
} });
WMP_REFINE.forEach(function (r) { if (!OW_REFINE.some(function (q) { return q.k === r.k; }))
OW_REFINE.push(r); });
Object.keys(WMP_PLACES).forEach(function (k) { if (!OW_PLACES[k])
OW_PLACES[k] = WMP_PLACES[k]; });
if (typeof OW_CHAL_TIMED !== "undefined")
OW_CHAL_TIMED.sample = 1;
}
function wmpSigned() { return typeof signedIn === "function" && signedIn(); }
function wmpTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function wmpHere() {
if (typeof WLD === "undefined" || !WLD.on)
return null;
if (WLD.on === "surface" && typeof SF !== "undefined" && (SF.k === "moon" || SF.k === "mars"))
return SF.k;
if (WLD.on === "station" && typeof STN !== "undefined" && STN.k === "aurora")
return "aurora";
if (WLD.on === "space")
return "space";
return null;
}
function wmpJobOf(id) { for (var i = 0; i < WMP_JOBS.length; i++)
if (WMP_JOBS[i][0] === +id)
return WMP_JOBS[i]; return null; }
function wmpSign(S, lines, x, y, z, rot, w, h) { var s = wSign(lines, w || 3.2, h || 1.2, "#0E1A2E", "#BFD8FF"); s.position.set(x, y, z); s.rotation.y = rot || 0; S.add(s); return s; }
function wmpBoard(S, lines, x, z, y, rot, solids, w, h) { return __ZC(327, 73, this, arguments, new.target); }
if (WMP_OK && typeof owNodeLook === "function") {
var wmpNodeLook0 = owNodeLook;
owNodeLook = function (S, look, x, y, z, R) { return __ZC(327, 74, this, arguments, new.target); };
}
if (WMP_OK && typeof owPoster === "function") {
var wmpPoster0 = owPoster;
owPoster = function (id, place) { return __ZC(327, 75, this, arguments, new.target); };
}
if (WMP_OK && typeof owPad === "function") {
var wmpPad0 = owPad;
owPad = function (S, k) { if (OW_PLACES[k] && OW_PLACES[k].noPad)
return; return wmpPad0.apply(this, arguments); };
}
if (WMP_OK && typeof owHere === "function") {
var wmpHere0 = owHere;
owHere = function () { var h = wmpHere0.apply(this, arguments); if (h)
return h; if (typeof WLD !== "undefined" && WLD.on === "station" && typeof STN !== "undefined" && STN.k === "aurora" && OW.k === "aurora")
return "aurora"; return null; };
}
function wmpGround(x, z) { return typeof owGround === "function" ? owGround(x, z, sfHeight(x, z)) : sfHeight(x, z); }
function wmpMoonExtras(S, L) { return __ZC(327, 76, this, arguments, new.target); }
function wmpMarsExtras(S, L) { return __ZC(327, 77, this, arguments, new.target); }
function wmpLessonSpots(k) {
var P = OW_PLACES[k];
if (!P || !P.spots)
return;
WMP_LESSONS.forEach(function (l) {
if (l.w !== k)
return;
var s = P.spots[l.at];
if (!s)
return;
owSpot(s[0], s[1], s[2], "🎓 <b>" + esc(l.title) + "</b> · a World Learning lesson", function () { wmpLessonCard(l); }, { lesson: l.k });
});
}
if (WMP_OK && typeof sfBuild === "function") {
var wmpSfBuild0 = sfBuild;
sfBuild = function (k) { return __ZC(327, 78, this, arguments, new.target); };
}
var WMP_AUR_CREW = [
{ id: "clerk", name: "Wen Liu", title: "Aurora commissary clerk", x: 8, z: -4.3, rot: 0, room: 1, greet: "Tortillas, coffee in a pouch, ration packs. And I buy what you bring aboard: greens, chiles, scrap, things from the Moon and Mars.", who: "the clerk at Station Aurora's Commissary, quick and friendly, who buys and sells for the city" },
{ id: "hydro", name: "Kalani Akana", title: "Aurora hydroponics technician", x: -18.4, z: -10.5, rot: -Math.PI / 2, room: 1, wander: 2.5, greet: "Mizuna and chiles, grown in pillows under the lamps. Pick what's glowing ready: we eat what we grow.", who: "the hydroponics technician who keeps Station Aurora's beds growing" },
{ id: "recyc", name: "Olu Bankole", title: "Life support recycling technician", x: 24.2, z: 0.8, rot: -Math.PI / 2, room: 1, greet: "Nothing aboard is wasted. Water, air, scrap: it all goes round again. Sort a bin if you've a minute.", who: "the life support and recycling technician of Station Aurora, who loves a closed loop" }
];
function wmpAurBuild(G) { return __ZC(327, 79, this, arguments, new.target); }
function wmpAurOn(on) { return __ZC(327, 80, this, arguments, new.target); }
(function () {
var W = WMP_OK && typeof WORLDS !== "undefined" && WORLDS.station;
if (!W)
return;
var en = W.enter;
W.enter = function (opt) {
var r = en.apply(this, arguments);
wmpAurOn(STN.k === "aurora");
if (STN.k === "aurora")
setStatus("<b>Station Aurora.</b> The mission board, the quartermaster and the canteen; and now the Aurora Commissary, the hydroponic beds and the recycling bay. The board by the hangar shows what to do aboard. Back to return to your shuttle.");
return r;
};
var lv = W.leave;
W.leave = function () { if (OW.k === "aurora") {
owChalStop(true);
owHud(null);
} return lv ? lv.apply(this, arguments) : undefined; };
if (typeof stnTick === "function") {
var st = stnTick;
stnTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (OW.k === "aurora" && STN.k === "aurora")
owTick(dt);
}
catch (e) {
if (window.console)
console.warn("[world-more aurora]", e);
}
return r;
};
}
})();
var WMP_CLAIMS = [[5.47, 3950, 12, "ow_sp_nife"], [5.55, 4060, -22, "ow_sp_chondrite"], [5.63, 3900, 28, "ow_sp_nife"], [5.71, 4120, -6, "ow_sp_chondrite"]];
function wmpSpaceBuild() { return __ZC(327, 81, this, arguments, new.target); }
function wmpRaseBase() {
var st = SP.stations && SP.stations.aurora;
if (!st)
return null;
var e = SP.bodies.earth.position, out = st.position.clone().sub(e);
out.y = 0;
out.normalize();
var side = new THREE.Vector3(-out.z, 0, out.x);
return { o: st.position.clone(), u: out, v: side };
}
function wmpBuoyPos() { var B = wmpRaseBase(); return B ? B.o.clone().addScaledVector(B.u, 240) : null; }
var WMP_RING_PTS = [[320, 0, 0], [620, 90, 30], [920, -80, -20], [1220, 140, 50], [1500, 0, 80], [1380, -260, 30], [1080, -380, -40], [760, -320, 20], [480, -200, -30], [300, -60, 0]];
function wmpRingPos(i) { var B = wmpRaseBase(), q = WMP_RING_PTS[i]; return B.o.clone().addScaledVector(B.u, q[0]).addScaledVector(B.v, q[1]).add(new THREE.Vector3(0, q[2], 0)); }
function wmpSpaceNear() { return __ZC(327, 82, this, arguments, new.target); }
var WMP_COMET_NODE = { id: "space-comet", k: "ow_sp_comet", x: 0, z: 0, label: "The comet", place: "space" };
function wmpClaimCard(c, msg) { return __ZC(327, 83, this, arguments, new.target); }
function wmpCometCard() { return __ZC(327, 84, this, arguments, new.target); }
function wmpRaceCard(msg) { return __ZC(327, 85, this, arguments, new.target); }
function wmpRaceStart() { return __ZC(327, 86, this, arguments, new.target); }
function wmpRacePaint() { var X = WMP.race; if (!X)
return; X.rings.forEach(function (r, i) { r.m.visible = i >= X.i; r.m.material.color.setHex(i === X.i ? 0xE8C27A : 0x3A6AB8); r.m.material.opacity = i === X.i ? 0.9 : 0.45; }); }
function wmpRaceStop() { var X = WMP.race; if (!X)
return; X.rings.forEach(function (r) { if (r.m.parent)
r.m.parent.remove(r.m); r.m.geometry.dispose(); }); WMP.race = null; owHud(null); }
function wmpSegNear(a, b, c) { var ab = b.clone().sub(a), t = ab.lengthSq() > 0 ? Math.max(0, Math.min(1, c.clone().sub(a).dot(ab) / ab.lengthSq())) : 0; return a.clone().addScaledVector(ab, t).distanceTo(c); }
function wmpRaceTick(dt) { return __ZC(327, 87, this, arguments, new.target); }
function wmpRaceDone(secs) { return __ZC(327, 88, this, arguments, new.target); }
(function () {
if (!WMP_OK || typeof spTick !== "function")
return;
var st = spTick;
spTick = function (dt) {
var r = st.apply(this, arguments);
try {
if (!WMP.space)
WMP.space = wmpSpaceBuild();
var X = WMP.space;
if (X && X.buoy) {
var b = wmpBuoyPos();
if (b)
X.buoy.position.copy(b);
X.buoy.rotation.y += dt * 0.3;
}
wmpRaceTick(dt);
}
catch (e) {
if (window.console)
console.warn("[world-more space]", e);
}
return r;
};
if (typeof spPromptTick === "function") {
var pt = spPromptTick;
spPromptTick = function () {
var r = pt.apply(this, arguments);
try {
if (WMP.race) {
if (!(WLD.card && WLD.card.style.display === "block"))
worldPrompt("<b>The Ring Run</b> · <b>press E</b> to stop or see the card", function () { wmpRaceCard(); });
return r;
}
var n = wmpSpaceNear();
if (n && n.kind === "claim")
worldPrompt("⛏️ <b>" + esc(n.c.node.label) + "</b> · <b>press E</b> to mine", function () { wmpClaimCard(n.c); });
else if (n && n.kind === "comet")
worldPrompt("☄️ <b>The comet</b> · <b>press E</b> to collect its ice", function () { wmpCometCard(); });
else if (n && n.kind === "buoy")
worldPrompt("🏁 <b>The Ring Run</b> · a challenge · <b>press E</b>", function () { wmpRaceCard(); });
}
catch (e) { }
return r;
};
}
if (typeof spChart === "function") {
var sc = spChart;
spChart = function () {
var cap = null, wc = worldCard;
worldCard = function (h, f) { cap = [h, f]; };
try {
sc.apply(this, arguments);
}
finally {
worldCard = wc;
}
if (!cap)
return;
var html = cap[0], fns = cap[1] || {};
html += "<div style='margin:8px 0 2px'><b>Things to do out here</b></div>";
html += worldBtn("wmp-claims", "⛏️ The belt mining claims", "Mine nickel-iron and carbon-rich rock");
fns["wmp-claims"] = function () { if (!WMP.space)
WMP.space = wmpSpaceBuild(); var c = WMP.space.claims[0]; spFlyTo({ pos: c.pos.clone().add(new THREE.Vector3(0, 30, 40)), name: "the belt mining claims", after: "Press E by a claim to mine it." }); };
html += worldBtn("wmp-comet", "☄️ The comet", "Collect its ice");
fns["wmp-comet"] = function () { var A = { name: "the comet", after: "Press E alongside it to collect its ice." }; Object.defineProperty(A, "pos", { get: function () { return SP.comet.position.clone().add(new THREE.Vector3(0, 20, 60)); } }); spFlyTo(A); };
html += worldBtn("wmp-race", "🏁 The Ring Run", "A timed course beyond Station Aurora");
fns["wmp-race"] = function () { var b = wmpBuoyPos(); if (b)
spFlyTo({ pos: b.clone().add(new THREE.Vector3(0, 0, 30)), name: "the Ring Run's start buoy", after: "Press E at the buoy." }); };
html += worldBtn("wmp-hub", "🧭 What to do in open space", "Work, trade, gather, play, learn, live");
fns["wmp-hub"] = function () { wmpHub(); };
worldCard(html, fns);
};
}
})();
function wmpSoft(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist|schema cache/i.test(m) ? "This opens soon." : esc(m); }
var WMP_KINDS = {};
WMP_GOODS.forEach(function (g) { WMP_KINDS[g.k] = 1; });
var WMP_KEYS = {};
WMP_REFINE.forEach(function (r) { WMP_KEYS[r.k] = 1; });
WMP_CHALS.forEach(function (c) { WMP_KEYS[c[0]] = 1; });
var WMP_UNKNOWN = /Nothing like that is gathered|not for sale here|no such process|no such challenge|Start it at its board first/i;
if (WMP_OK && typeof owRpc === "function") {
var wmpRpc0 = owRpc;
owRpc = function (name, args) { return __ZC(327, 89, this, arguments, new.target); };
}
function wmpJumpCard(place, msg) { return __ZC(327, 90, this, arguments, new.target); }
function wmpJumpTick(X, dt, L) { return __ZC(327, 91, this, arguments, new.target); }
function wmpJumpDone(score) { return __ZC(327, 92, this, arguments, new.target); }
if (WMP_OK && typeof owChalCard === "function") {
var wmpChalCard0 = owChalCard;
owChalCard = function (place, msg) { var P = OW_PLACES[place]; if (P && P.chal && P.chal.kind === "jump")
return wmpJumpCard(place, msg); return wmpChalCard0.apply(this, arguments); };
var wmpChalStart0 = owChalStart;
owChalStart = function (place) { return __ZC(327, 93, this, arguments, new.target); };
var wmpChalTick0 = owChalTick;
owChalTick = function (dt, L) { return __ZC(327, 94, this, arguments, new.target); };
}
(function () {
var SFW = WMP_OK && typeof WORLDS !== "undefined" && WORLDS.surface;
if (!SFW || typeof SFW.env !== "function")
return;
var e0 = SFW.env;
SFW.env = function (dt) {
var E = e0.apply(this, arguments);
try {
var X = OW.chal;
if (X && X.kind === "sample" && SF.k === "mars") {
var f = Math.min(1, X.t / X.C.limit);
E = Object.assign({}, E);
E.fogD = (E.fogD || 0.0009) * (1 + f * 3.5);
E.sun = (E.sun || 0) * (1 - f * 0.45);
E.fog = 0xB88A64;
}
}
catch (e) { }
return E;
};
})();
var WMP_COURSE = "world-near";
function wmplLog() { var st = (typeof eduStore === "function") ? eduStore() : {}; return st[WMP_COURSE] || (st[WMP_COURSE] = {}); }
function wmplDone(n) { return !!wmplLog()[n]; }
function wmplCount() { return WMP_LESSONS.filter(function (l) { return wmplDone(l.n); }).length; }
function wmplOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 7 + k * 2) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function wmplWhere(l) { var P = OW_PLACES[l.w], s = P && P.spots && P.spots[l.at]; return (s && s[3] ? s[3] + ", " : "") + (l.w === "space" ? (l.at === "comet" ? "by the comet" : "at the belt mining claims") : WMP_PLACE_NAME[l.w]); }
function wmpLessonCard(l) { return __ZC(327, 95, this, arguments, new.target); }
function wmplCheck(l) { return __ZC(327, 96, this, arguments, new.target); }
function wmpCourseCard(place) { return __ZC(327, 97, this, arguments, new.target); }
var wmpCourse0 = null;
if (WMP_OK && typeof owCourseCard === "function") {
wmpCourse0 = owCourseCard;
owCourseCard = function (place) { if (place === "moon" || place === "mars" || place === "aurora")
return wmpCourseCard(place); return wmpCourse0.apply(this, arguments); };
}
(function () {
if (!WMP_OK)
return;
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () { var h = er.apply(this, arguments); return h + '<div style="margin-top:6px">World Learning: The Moon, Mars and Orbit, ' + wmplCount() + ' of ' + WMP_LESSONS.length + ' lessons learned.' + (wmplCount() >= WMP_LESSONS.length ? ' <b style="color:#2A4A8A">Moon and Mars Explorer.</b>' : '') + '</div>'; };
}
if (typeof bkpHtml === "function" && typeof bkpRow === "function") {
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments), n = wmplCount();
if (n && wmpSigned())
h += n >= WMP_LESSONS.length ? bkpRow("🌙 Certificate: <b>Moon and Mars Explorer</b>", bkpDim("the Department of Education")) : bkpRow("🌙 World Learning: The Moon, Mars and Orbit", bkpDim(n + " of " + WMP_LESSONS.length + " stamps"));
return h;
};
}
})();
function wmpJobsCard(place) { return __ZC(327, 98, this, arguments, new.target); }
(function () {
if (!WMP_OK)
return;
if (typeof owJobsCard === "function") {
var oj = owJobsCard;
owJobsCard = function (place) { if (WMP_WORK[place])
return wmpJobsCard(place); return oj.apply(this, arguments); };
}
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) {
var id = job && +(job.job_id || job.id || 0);
if (id >= WMP_JOB0 && id <= WMP_JOB1) {
var J = wmpJobOf(id), h = wmpHere();
if (J)
return !!h && (J[2] === h || J[2] === "any");
}
return os.apply(this, arguments);
};
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () {
var h = wmpHere();
if (h) {
if (typeof walkMode !== "undefined" && !walkMode)
return null;
if (h === "aurora")
return { key: WMP_WORK.aurora, inside: true };
if (h === "space") {
var X = WMP.space, st = SP.stations && SP.stations.aurora, near = st && SP.pos.distanceTo(st.position) < 700;
if (X)
X.claims.forEach(function (c) { if (SP.pos.distanceTo(c.pos) < 500)
near = true; });
return near ? { key: WMP_WORK.space, inside: true } : null;
}
var L = worldLocal(), H = OW_PLACES[h].hall;
return Math.hypot(L.x - H.x, L.z - H.z) < 46 ? { key: WMP_WORK[h], inside: true } : null;
}
return aw.apply(this, arguments);
};
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
var place = null;
Object.keys(WMP_WORK).forEach(function (k) { if (WMP_WORK[k] === key)
place = k; });
if (!place)
return sw.apply(this, arguments);
if (wmpHere() === place) {
if (place === "space")
return wmpHub();
if (place === "aurora")
return setStatus("<b>Station Aurora</b> is all around you: the Commissary, the hydroponic beds and the recycling bay are in the hall.");
var H = OW_PLACES[place].hall;
return wmpGuideTo(place, H.x + (H.door === "w" ? -H.w / 2 - 3 : H.w / 2 + 3), H.z, OW_PLACES[place].hall.name);
}
setStatus("<b>" + esc(key) + "</b> is " + (place === "moon" ? "on the Moon: take the Lunar Line from the Space Corp Spaceport." : place === "mars" ? "on Mars: take the Mars Line from the Space Corp Spaceport." : place === "aurora" ? "in orbit: take the Lunar Line from the Space Corp Spaceport to Station Aurora." : "out in the asteroid belt: launch from the Spaceport's pad and open the star chart (M)."));
};
}
function add(def) { if (typeof staffDeedAdd === "function")
staffDeedAdd(def);
else
(window.SD_PENDING = window.SD_PENDING || []).push(def); }
add({ tag: "NEARJOBS", label: "📋 Work here", hint: "shows the Space Corp's posts here (the Moon, Mars or Station Aurora) and opens Hiring here",
when: function () { var h = wmpHere(); return h === "moon" || h === "mars" || h === "aurora"; }, run: function () { wmpJobsCard(wmpHere()); return { ok: true }; } });
add({ tag: "NEARTODO", label: "🧭 What to do here", hint: "opens the list of everything to do in this place: work, trade, gathering, the challenge, lessons and homes",
when: function () { return !!wmpHere(); }, run: function () { wmpHub(); return { ok: true }; } });
})();
if (WMP_OK && typeof owCrewCard === "function") {
var wmpCrewCard0 = owCrewCard;
owCrewCard = function (w) { return __ZC(327, 99, this, arguments, new.target); };
}
function wmpGuideTo(place, x, z, name) { WMP.guide = { place: place, x: x, z: z, name: name }; worldCard(null); setStatus("<b>" + esc(name) + "</b>: follow the arrow on the banner at the top."); }
function wmpGuideLine() {
var G = WMP.guide;
if (!G)
return "";
if (G.place !== wmpHere()) {
return "";
}
var L = worldLocal();
if (Math.hypot(G.x - L.x, G.z - L.z) < 4) {
WMP.guide = null;
setStatus("<b>" + esc(G.name) + ".</b> You are here.");
return "";
}
return "<div style='color:#BFD8FF'>" + owArrow(L, G.x, G.z, G.name) + "</div>";
}
function wmpHub() { return __ZC(327, 100, this, arguments, new.target); }
function wmpHudBtn() {
if (WMP.btn || !document.body)
return WMP.btn;
var b = document.createElement("button");
b.id = "wmp-btn";
b.type = "button";
b.textContent = "🧭 Things to do";
b.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(328px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #8FB4E8;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif";
b.onclick = function () { wmpHub(); };
document.body.appendChild(b);
WMP.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["wmp-btn"] = 1;
return b;
}
(function () {
if (!WMP_OK)
return;
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-wmp"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-wmp";
b.title = "Work, trade, gathering, games, lessons and homes here";
b.textContent = "🧭 Things to do here";
b.style.display = "none";
b.onclick = function () { wmpHub(); };
bar.appendChild(b);
WMP.menuBtn = b;
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) {
tt.apply(this, arguments);
try {
var here = !!wmpHere(), on = here && (typeof walkMode === "undefined" || walkMode), b = wmpHudBtn();
if (b) {
var tk = document.getElementById("talk"), show = on && !(WLD.card && WLD.card.style.display === "block") && !(tk && tk.classList.contains("open"));
if ((b.style.display === "block") !== show)
b.style.display = show ? "block" : "none";
}
if (WMP.menuBtn) {
var ms = here ? "" : "none";
if (WMP.menuBtn.style.display !== ms)
WMP.menuBtn.style.display = ms;
}
}
catch (e) { }
};
}
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (html) { if (html && WMP.guide) {
var x = "";
try {
x = wmpGuideLine();
}
catch (e) { }
if (x)
html = html + x;
} return wb.call(this, html); };
}
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return !!WMP.race; }, close: function () { wmpRaceStop(); setStatus("The Ring Run: stopped."); } });
})();
if (WMP_OK && typeof WH_PLAN !== "undefined") {
WMP_HOMES.forEach(function (H) {
if (!WH_PLAN[H[0]])
WH_PLAN[H[0]] = { style: H[1], face: H[2], lots: H[3] };
if (typeof WR_WORLD !== "undefined") {
WR_WORLD[H[0]] = H[4];
if (WR_ORDER.indexOf(H[0]) < 0)
WR_ORDER.push(H[0]);
}
});
}
var WMU_ITEMS = [
["wmu_found", "Found property (to hand in)", "🧳", 1, null, "Left on a train, under a bench or in the World Mall. Hand it in at the Lost Property Office (Tower Plaza station) or the Mall's information desk for the finder's reward."],
["wmu_tcoin", "Old coins from the track", "🪙", 2, null, "Swept from the track bed by the track walkers at night."],
["wmu_umbrella", "Folding umbrella", "☂️", 2, 6, "The Mall General Store; unclaimed ones at the Lost Property Office."],
["wmu_scarf", "Woollen scarf", "🧣", 2, 7, "The Mall General Store; unclaimed ones at the Lost Property Office."],
["wmu_gloves", "Leather gloves", "🧤", 3, 9, "The Mall General Store; unclaimed pairs at the Lost Property Office."],
["wmu_paperback", "Paperback novel", "📕", 1, 4, "The Platform Kiosk; unclaimed ones at the Lost Property Office."],
["wmu_linemap", "Pocket map of the Underground", "🗺️", 1, 2, "Every stop on both rails, from the Platform Kiosk."],
["wmu_torch", "Pocket torch", "🔦", 2, 6, "The Mall General Store."],
["wmu_notebook", "Notebook and pencil", "📓", 1, 3, "The Mall General Store."],
["wmu_sewkit", "Sewing kit", "🧵", 1, 4, "The Mall General Store."],
["wmu_mug", "Travel mug", "☕", 2, 5, "The Mall General Store."],
["wmu_globe", "World Mall snow globe", "🔮", 3, 10, "A keepsake from the Mall Gift Shop."],
["wmu_postcards", "Postcards of the World Mall", "💌", 1, 3, "A keepsake from the Mall Gift Shop."],
["wmu_modeltrain", "Model Underground train", "🚇", 4, 12, "A keepsake from the Mall Gift Shop."],
["wmu_bookmark", "Pressed-flower bookmark", "🔖", 1, 3, "A keepsake from the Mall Gift Shop."],
["wmu_shellneck", "Shell necklace", "📿", 3, 9, "Strung at the Pearl & Shell kiosk in the World Mall."],
["wmu_ticket", "Pixel Palace prize ticket", "🎟️", 1, null, "Won on the Pixel Palace's machines; spent at its prize counter."],
["wmu_keyring", "Pixel Palace keyring", "🔑", 1, null, "A prize from the Pixel Palace counter."],
["wmu_yoyo", "Wooden yo-yo", "🪀", 2, null, "A prize from the Pixel Palace counter."],
["wmu_top", "Spinning top", "🌀", 2, null, "A prize from the Pixel Palace counter."],
["wmu_puzzle", "Pocket sliding puzzle", "🧩", 3, null, "A prize from the Pixel Palace counter."],
["wmu_plush", "Plush rocket", "🚀", 4, null, "A prize from the Pixel Palace counter."]
];
var WMU_SPOTS = {
ug_train: { kind: "wmu_found", name: "Left on the train", where: "ride", regrow: 20 },
ug_bench: { kind: "wmu_found", name: "Something under a platform bench", where: "ug", x: -18.6, z: 0.55, regrow: 30 },
ug_track: { kind: "wmu_tcoin", name: "Coins in the track bed", where: "walker", regrow: 60 },
m_lost1: { kind: "wmu_found", name: "A glove dropped by a bench", where: "mall", x: -31.2, z: -21.6, regrow: 30 },
m_lost2: { kind: "wmu_found", name: "An umbrella left by a bench", where: "mall", x: 31.4, z: 21.8, regrow: 30 },
m_lost3: { kind: "wmu_found", name: "A toy rabbit left at the café", where: "mall", x: 10.6, z: 21.0, regrow: 30 }
};
var WMU_TRAIN_FINDS = ["a glove", "an umbrella", "a woollen hat", "a paperback", "a scarf", "a lunch box", "a set of keys", "a child's mitten"];
var WMU_STALLS = {
ug_kiosk: { name: "The Platform Kiosk", keeper: "the kiosk attendant", menu: "The Platform Kiosk", sells: ["wmu_linemap", "wmu_paperback"], buys: [],
say: "Newspapers, a hot drink and something to eat before your train: the kiosk on every platform." },
ug_lost: { name: "The Lost Property Office", keeper: "the lost property clerk", sells: ["wmu_umbrella", "wmu_scarf", "wmu_gloves", "wmu_paperback"], buys: ["wmu_umbrella", "wmu_scarf", "wmu_gloves", "wmu_paperback", "wmu_tcoin"], handin: "ug",
say: "Everything left on the line comes here. What nobody claims in three months is sold; finds handed in earn the finder's reward." },
m_info: { name: "The information desk", keeper: "the Mall's information staff", sells: [], buys: [], handin: "mall",
say: "Lost and found, directions, and the Mall's own posts." },
m_general: { name: "The Mall General Store", keeper: "the Mall's shop clerk", house: true, sells: ["wmu_umbrella", "wmu_torch", "wmu_notebook", "wmu_sewkit", "wmu_mug", "wmu_scarf", "wmu_gloves"],
buys: ["wmu_umbrella", "wmu_torch", "wmu_scarf", "wmu_gloves", "wmu_mug", "wmu_paperback"], say: "Run by the World Mall itself: everyday things, and it buys good second-hand ones." },
m_gift: { name: "The Mall Gift Shop", keeper: "the Mall's shop clerk", house: true, sells: ["wmu_globe", "wmu_postcards", "wmu_modeltrain", "wmu_bookmark"],
buys: ["hx_shell", "hx_pearl", "hx_feather", "hx_sponge", "hx_deepgem", "wmu_globe", "wmu_modeltrain", "wmu_shellneck", "wmu_keyring", "wmu_yoyo", "wmu_top", "wmu_puzzle", "wmu_plush"],
say: "Run by the World Mall itself: keepsakes of the Mall, and it buys keepsakes from the other worlds." },
m_food: { name: "The Mall Food Hall", keeper: "the food hall cook", house: true, menu: "The World Mall Food Hall", sells: [], buys: [],
say: "Run by the World Mall itself: hot food and cold drinks at the long counter." },
m_cafe: { name: "The Cloud Café", keeper: "the barista", menu: "The Cloud Café", sells: [], buys: [], say: "Coffee, cloud tea and cakes by the fountain." },
m_sweets: { name: "Moonbeam Sweets", keeper: "the kiosk keeper", menu: "Moonbeam Sweets", sells: [], buys: [], say: "Fudge and rock from the cart." },
m_teas: { name: "Dream Teas", keeper: "the kiosk keeper", menu: "Dream Teas", sells: [], buys: [], say: "Iced and hot teas from the cart." },
m_floss: { name: "Cloud Floss", keeper: "the kiosk keeper", menu: "Cloud Floss", sells: [], buys: [], say: "Candy floss spun while you wait." },
m_pearl: { name: "Pearl & Shell", keeper: "the kiosk keeper", sells: ["wmu_shellneck"], buys: ["hx_shell", "hx_pearl", "hx_sponge", "wmu_shellneck"],
say: "Shell necklaces strung at the cart; shells, pearls and sponges from the hidden seas bought for stringing." }
};
var WMU_MENUS = { "The Platform Kiosk": "Hot drinks and a bite before your train", "The World Mall Food Hall": "Hot food and cold drinks, run by the World Mall",
"The Cloud Café": "Coffee, cloud tea and cakes by the fountain", "Moonbeam Sweets": "Sweets from the cart", "Dream Teas": "Teas from the cart", "Cloud Floss": "Candy floss and toffee apples" };
var WMU_HOUSE = [
{ id: "m_food", units: [2, 13, 9, 6, 4, 11, 16, 23], store: { name: "The Mall Food Hall", tagline: "run by the World Mall · hot food and cold drinks", color: 0x8A3A2A,
look: { sign: "gilded", trim: 0xC9A868, facade: "marble", awning: "striped", display: "shelves", floor: "tile", lights: "warm" } } },
{ id: "m_general", units: [5, 10, 3, 12, 7, 1, 18, 25], store: { name: "The Mall General Store", tagline: "run by the World Mall · everyday things", color: 0x2E5A4A,
look: { sign: "classic", trim: 0xC9A868, facade: "wood", awning: "plain", display: "shelves", floor: "wood", lights: "warm" } } },
{ id: "m_gift", units: [8, 14, 1, 7, 12, 3, 20, 27], store: { name: "The Mall Gift Shop", tagline: "run by the World Mall · keepsakes, and keepsakes bought", color: 0x5A3E7A,
look: { sign: "gilded", trim: 0xE0C080, facade: "marble", awning: "scalloped", display: "pedestals", floor: "carpet", lights: "warm" } } }
];
var WMU_PRIZES = [["wmu_keyring", 5], ["wmu_yoyo", 10], ["wmu_top", 12], ["wmu_puzzle", 18], ["wmu_plush", 25]];
var WMU_ARC = { raiders: 800, bricks: 600, serpent: 150, blocks: 400, rocks: 600, paddle: 1200, hopper: 400 };
var WMU_ROUTE_GOLD = 15;
var WMU_JOBS = [
[4400, "World Mall manager", "The World Mall", 16, "mall", ["Run the Mall's day", ["Walk the three floors before opening", "Check the house shops are stocked", "Agree the day's rota with the information desk", "Close the day's book"]]],
[4401, "Mall information desk assistant", "The World Mall", 10, "mall", ["Keep the information desk", ["Greet the people coming up from the Underground", "Give directions to a shop", "Log the lost property handed in", "Answer the telephone"]]],
[4402, "Mall security officer", "The World Mall", 12, "mall", ["Patrol the Mall", ["Walk the ground floor", "Check the lifts and escalators", "Walk the galleries and the terraces", "Write up the patrol log"]]],
[4403, "Mall cleaner", "The World Mall", 9, "mall", ["Keep the Mall clean", ["Sweep round the fountain", "Mop the food hall floor", "Wipe the glass rails", "Empty the bins"]]],
[4404, "Food hall cook", "The World Mall", 11, "mall", ["Cook for the food hall", ["Light the hobs and the ovens", "Make the soup and the curry", "Bake the potatoes", "Serve the lunchtime queue"]]],
[4405, "Mall house-shop clerk", "The World Mall", 10, "mall", ["Keep the house shops", ["Open the General Store and the Gift Shop", "Fill the shelves from the stockroom", "Serve the customers", "Count the till"]]],
[4406, "Pixel Palace attendant", "The World Mall", 10, "arcade", ["Look after the Pixel Palace", ["Switch on the machines", "Clean the screens and the controls", "Keep the prize counter", "Check the tickets paid out"]]],
[4407, "Mall and Underground tour guide", "The World Mall", 12, "mall", ["Give a tour", ["Meet the group at the information desk", "Tell how markets became malls", "Take them down to the platform for the railway's story", "See them back to the fountain"]]],
[4440, "Lost property clerk", "The Underground Office", 10, "ug", ["Keep the Lost Property Office", ["Open the window at Tower Plaza", "Log what came in from the trains", "Return a lost thing to its owner", "Shelve what is left unclaimed"]]],
[4441, "Platform kiosk attendant", "The Underground Office", 10, "ug", ["Keep a platform kiosk", ["Open the kiosk shutters", "Brew the urn of coffee", "Set out the papers and the line maps", "Serve the morning rush"]]]
];
var WMU_JOB_ID = {};
WMU_JOBS.forEach(function (j) { WMU_JOB_ID[j[0]] = j; });
var WMU = { stock: null, stockAt: 0, busy: false, picked: {}, today: null, todayAt: 0, btn: null, mark: null, missing: false, t: 0, where: null };
var WMU_MB = {};
WMU_ITEMS.forEach(function (m) { WMU_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; });
try {
WMU.picked = JSON.parse(localStorage.getItem("somnu.wmu.picked") || "{}") || {};
}
catch (e) {
WMU.picked = {};
}
(function () { if (typeof FG_MB !== "undefined")
WMU_ITEMS.forEach(function (m) { if (!FG_MB[m[0]])
FG_MB[m[0]] = { kind: m[0], name: m[1], icon: m[2], buys: m[3], price: m[4], where: m[5] }; }); })();
(function () { if (typeof NEEDS_PLACES !== "undefined")
Object.keys(WMU_MENUS).forEach(function (k) { if (!NEEDS_PLACES[k])
NEEDS_PLACES[k] = WMU_MENUS[k]; }); })();
function wmuMat(k) { return WMU_MB[k] || (typeof HX_MB !== "undefined" && HX_MB[k]) || (typeof FG_MB !== "undefined" && FG_MB[k]) || { kind: k, name: k, icon: "", buys: 1, price: null }; }
function wmuSigned() { return typeof signedIn === "function" && signedIn(); }
function wmuKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function wmuRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function wmuMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function wmuErr(e) { if (wmuMissing(e)) {
WMU.missing = true;
return "This opens soon.";
} return String((e && e.message) || e || "Not now."); }
function wmuSay(html) { if (typeof setStatus === "function")
setStatus(html); }
function wmuTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function wmuStanding() { if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } }
function wmuHead(t) { return "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function wmuTitle(t, sub) { return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + t + "</div>" + (sub ? "<div style='opacity:.85;margin:4px 0 6px'>" + sub + "</div>" : ""); }
function wmuCardOpen() { return typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block"; }
function wmuSave() { try {
var n = Date.now(), o = {};
Object.keys(WMU.picked).forEach(function (k) { if (WMU.picked[k] > n)
o[k] = WMU.picked[k]; });
WMU.picked = o;
localStorage.setItem("somnu.wmu.picked", JSON.stringify(o));
}
catch (e) { } }
function wmuReady(id) { return !(WMU.picked[id] > Date.now()); }
function wmuWhere() {
if (typeof walkMode !== "undefined" && !walkMode)
return null;
if (typeof WLD !== "undefined" && WLD.on)
return null;
if (typeof store !== "undefined" && store.inside)
return null;
if (typeof UG2 !== "undefined" && UG2.on)
return "ug";
if (typeof TS !== "undefined" && TS.arcOn)
return "arcade";
if (typeof MALL !== "undefined" && MALL.on && MALL.g && MALL.g.visible)
return "mall";
return null;
}
function wmuStock(force) {
if (!wmuSigned())
return Promise.resolve([]);
if (!force && WMU.stock && Date.now() - WMU.stockAt < 20000)
return Promise.resolve(WMU.stock);
return wmuRpc("my_stock").then(function (rows) { WMU.stock = rows || []; WMU.stockAt = Date.now(); return WMU.stock; }).catch(function () { return WMU.stock || []; });
}
function wmuHave(k) { var r = (WMU.stock || []).filter(function (s) { return s.kind === k; })[0]; return r ? (+r.amount || 0) : 0; }
function wmuSellPrice(k) { var r = (WMU.stock || []).filter(function (s) { return s.kind === k; })[0]; return r && r.buys != null ? +r.buys : wmuMat(k).buys; }
function wmuTodayLoad(force) { return __ZC(327, 101, this, arguments, new.target); }
function wmuStall(id, msg) { return __ZC(327, 102, this, arguments, new.target); }
function wmuBuy(id, k, n) {
if (!wmuSigned())
return wmuStall(id, "Sign in first.");
wmuRpc("wmu_buy", { p_kind: k, p_amount: n }).then(function (o) { WMU.stockAt = 0; wmuStock(true).then(function () { wmuStall(id, esc((o && o.say) || "Done.")); }); wmuStanding(); })
.catch(function (e) { wmuStall(id, esc(wmuErr(e))); });
}
function wmuSell(id, k, n) { return __ZC(327, 103, this, arguments, new.target); }
function wmuHandIn(id) { return __ZC(327, 104, this, arguments, new.target); }
function wmuGather(id, label, after) { return __ZC(327, 105, this, arguments, new.target); }
function wmuLostMesh(k) { return __ZC(327, 106, this, arguments, new.target); }
function wmuMarkTo(parent, x, y, z, name) { return __ZC(327, 107, this, arguments, new.target); }
function wmuMarkClear() { var M = WMU.mark; if (!M)
return; if (M.g.parent)
M.g.parent.remove(M.g); M.g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material)
m.material.dispose(); }); WMU.mark = null; }
function wmuMarkTick(dt) {
var M = WMU.mark;
if (!M)
return;
M.t += dt;
if (wmuWhere() !== M.where || M.t > 240) {
wmuMarkClear();
return;
}
var a = Math.min(1, M.t / 2) * (0.85 + 0.15 * Math.sin(M.t * 0.8));
M.g.children[0].material.opacity = 0.22 * a;
M.g.children[1].material.opacity = 0.5 * a;
var w = new THREE.Vector3();
M.g.getWorldPosition(w);
var P = camera.position;
if (Math.hypot(P.x - w.x, P.z - w.z) < 2.2 && Math.abs(P.y - 1.72 - w.y) < 3) {
var n = M.name;
wmuMarkClear();
wmuSay("<b>" + esc(n) + ".</b> You are here.");
}
}
function wmuJobOf(job) { var id = +(job && (job.job_id || job.id)) || 0; return WMU_JOB_ID[id] || null; }
function wmuOnSite(j) {
var w = wmuWhere();
if (j[4] === "ug")
return w === "ug" && !(UG2.ride);
if (j[4] === "arcade")
return w === "arcade" || w === "mall";
return w === "mall" || w === "arcade";
}
(function () {
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { var j = wmuJobOf(job); if (j && !(typeof amKeeper === "function" && amKeeper()))
return wmuOnSite(j); return os.apply(this, arguments); };
}
if (typeof ahWhere === "function") {
var aw = ahWhere;
ahWhere = function () {
var w = wmuWhere();
if (w === "mall" || w === "arcade")
return { key: "The World Mall", inside: true };
if (w === "ug" && !UG2.ride && WMU.ugAt)
return { key: "The Underground Office", inside: true };
return aw.apply(this, arguments);
};
}
if (typeof showTheWay === "function") {
var sw = showTheWay;
showTheWay = function (key) {
if (key === "The World Mall") {
if (wmuWhere() === "mall" || wmuWhere() === "arcade")
return wmuSay("<b>The World Mall</b> is all round you. The information desk is by the Underground, at the west end.");
return wmuSay("<b>The World Mall</b> is reached by the Underground: take any train on the Ring Line to the <b>World Mall</b> stop, then the Way Out at the end of the platform.");
}
return sw.apply(this, arguments);
};
}
})();
function wmuBtn() {
if (WMU.btn || !document.body)
return WMU.btn;
var b = document.createElement("button");
b.id = "wmu-btn";
b.type = "button";
b.textContent = "🧭 Things to do";
b.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(328px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #C9A868;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif";
b.onclick = function () { wmuHub(); };
document.body.appendChild(b);
WMU.btn = b;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["wmu-btn"] = 1;
return b;
}
function wmuHub() { var w = wmuWhere(); if (w === "ug")
wmuUgHub();
else if (w === "mall" || w === "arcade")
wmuMallHub(); }
function wmuTick(dt) {
WMU.t += dt;
var w = wmuWhere();
if (w !== WMU.where) {
WMU.where = w;
if (w)
wmuTodayLoad(false);
}
var b = wmuBtn();
if (b) {
var tk = document.getElementById("talk"), show = !!w && !wmuCardOpen() && !(tk && tk.classList.contains("open")) && !(typeof ARC !== "undefined" && ARC.open);
if ((b.style.display === "block") !== show)
b.style.display = show ? "block" : "none";
}
wmuMarkTick(dt);
if (w === "ug")
wmuUgTick(dt);
else
WMU.ugAt = null;
if (w === "mall" || w === "arcade")
wmuMallTick(dt);
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
wmuTick(dt || 0.016);
}
catch (e) {
if (window.console && !WMU.warned) {
WMU.warned = true;
console.warn("[world-more 40]", e);
}
} };
}
})();
var WMU_UG = { g: null, lost: null, bench: null, kioskAt: { x: 27, z: 0 }, lostAt: { x: -27, z: 0 }, histAt: { x: -9, z: 0 }, planAt: { x: 9, z: 0 }, ride: null, offer: null, route: null };
function wmuFig(id, col, dress) { return __ZC(327, 108, this, arguments, new.target); }
function wmuUgTex(lines, w, h, bg, fg) { return __ZC(327, 109, this, arguments, new.target); }
function wmuBox(g, w, h, d, m, x, y, z) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); return b; }
function wmuBake(g) { if (typeof mdCompact === "function" && typeof MD !== "undefined")
try {
g.updateMatrixWorld(true);
mdCompact(g);
}
catch (e) { } }
function wmuUgKiosk() { return __ZC(327, 110, this, arguments, new.target); }
function wmuUgLost() { return __ZC(327, 111, this, arguments, new.target); }
function wmuUgBoard(lines, bg) { return __ZC(327, 112, this, arguments, new.target); }
(function () {
if (typeof ugBuild !== "function")
return;
var ub = ugBuild;
ugBuild = function () {
var fresh = typeof UG2 !== "undefined" && !UG2.g, r = ub.apply(this, arguments);
if (!fresh || !UG2.g || WMU_UG.g)
return r;
try {
var G = new THREE.Group();
UG2.g.add(G);
WMU_UG.g = G;
var k = wmuUgKiosk();
k.position.set(WMU_UG.kioskAt.x, 0, WMU_UG.kioskAt.z);
G.add(k);
wmuBake(k);
var l = wmuUgLost();
l.position.set(WMU_UG.lostAt.x, 0, WMU_UG.lostAt.z);
G.add(l);
wmuBake(l);
WMU_UG.lost = l;
var h = wmuUgBoard(["Under the City", "the first railways", "beneath the streets", "World Learning"], "#3A2A20");
h.position.set(WMU_UG.histAt.x, 0, WMU_UG.histAt.z);
G.add(h);
var p = wmuUgBoard(["Journey Planner", "both rails", "every stop", "Route Master"], "#1E2F6E");
p.position.set(WMU_UG.planAt.x, 0, WMU_UG.planAt.z);
G.add(p);
var S = WMU_SPOTS.ug_bench, b = wmuLostMesh(0);
b.position.set(S.x, 0.02, S.z);
G.add(b);
WMU_UG.bench = b;
}
catch (e) {
if (window.console)
console.warn("[world-more 40] platform", e);
}
return r;
};
})();
function wmuUgHome() {
if (typeof ugoHome === "function")
return ugoHome() === UG2.at;
if (typeof UNDERGROUND !== "undefined" && UNDERGROUND.length && typeof ugIndexOf === "function")
return ugIndexOf(UNDERGROUND[0]) === UG2.at;
return UG2.at === 0;
}
function wmuUgHomeName() { return (typeof UNDERGROUND !== "undefined" && UNDERGROUND[0] && UNDERGROUND[0].name) || "Tower Plaza"; }
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (typeof UG2 !== "undefined" && UG2.on && !UG2.ride && WMU_UG.g) {
var lx = x - UG2.cx, lz = z - UG2.cz;
if (Math.abs(lx - WMU_UG.kioskAt.x) < 2.05 && Math.abs(lz - WMU_UG.kioskAt.z) < 0.95)
return true;
if (WMU_UG.lost && WMU_UG.lost.visible && Math.abs(lx - WMU_UG.lostAt.x) < 2.05 && Math.abs(lz - WMU_UG.lostAt.z) < 0.95)
return true;
if ((Math.abs(lx - WMU_UG.histAt.x) < 0.75 || Math.abs(lx - WMU_UG.planAt.x) < 0.75) && Math.abs(lz) < 0.3)
return true;
}
return ba.apply(this, arguments);
};
})();
(function () {
if (typeof ugjWalkFinish !== "function")
return;
var wf = ugjWalkFinish;
ugjWalkFinish = function () {
var W = typeof UGJ !== "undefined" ? UGJ.walk : null, all = !!(W && W.spots && W.spots.every(function (s) { return s.done; }));
var r = wf.apply(this, arguments);
if (all && !(UGJ && UGJ.test) && wmuSigned() && wmuReady("ug_track"))
setTimeout(function () { wmuGather("ug_track", "Swept from the track bed as you climb up"); }, 2600);
return r;
};
})();
function wmuUgTick(dt) { return __ZC(327, 113, this, arguments, new.target); }
function wmuUgOfferClear() { var O = WMU_UG.offer; if (O && O.m && O.m.parent)
O.m.parent.remove(O.m); WMU_UG.offer = null; WMU_UG.ride = null; }
function wmuUgRideTick(dt) { return __ZC(327, 114, this, arguments, new.target); }
function wmuRouteQ() { return __ZC(327, 115, this, arguments, new.target); }
function wmuRouteCard() { return __ZC(327, 116, this, arguments, new.target); }
function wmuRouteMap() { return __ZC(327, 117, this, arguments, new.target); }
function wmuRouteLeft(G) { return Math.max(0, 90 - (Date.now() - G.t0) / 1000); }
function wmuRoutePaint(msg) { return __ZC(327, 118, this, arguments, new.target); }
function wmuRouteAnswer(o) { return __ZC(327, 119, this, arguments, new.target); }
function wmuRouteEnd(said) { return __ZC(327, 120, this, arguments, new.target); }
setInterval(function () { var G = WMU_UG.route; if (G && !G.done && wmuCardOpen()) {
if (wmuRouteLeft(G) <= 0)
wmuRouteEnd();
else
wmuRoutePaint();
}
else if (G && !wmuCardOpen())
WMU_UG.route = null; }, 1000);
function wmuUgHub() { return __ZC(327, 121, this, arguments, new.target); }
var WMU_M = { house: {}, houseFor: null, houseKey: "", lost: {}, built: false, arcBuilt: false, prize: null };
function wmuHouseStore(H, unit) {
var s = WMU_M.house[H.id];
if (!s) {
s = {};
Object.keys(H.store).forEach(function (k) { s[k] = H.store[k]; });
s.products = [];
s.wmuHouse = H.id;
WMU_M.house[H.id] = s;
}
s.unit = unit;
return s;
}
(function () {
if (typeof mallStoreAt !== "function")
return;
var real = mallStoreAt;
WMU_M.real = real;
function plan() {
var st = (typeof MALL !== "undefined" && MALL.stores) || [], key = st.map(function (s) { return s.unit; }).join(",");
if (WMU_M.houseFor && WMU_M.houseKey === key)
return WMU_M.houseFor;
var taken = {}, out = {};
st.forEach(function (s) { if (s && s.unit)
taken[s.unit] = 1; });
WMU_HOUSE.forEach(function (H) {
for (var i = 0; i < H.units.length; i++) {
var u = H.units[i];
if (!taken[u]) {
taken[u] = 1;
out[u] = H;
return;
}
}
for (var n = 1; n <= (typeof MALL_UNITS !== "undefined" ? MALL_UNITS : 40); n++) {
if (!taken[n]) {
taken[n] = 1;
out[n] = H;
return;
}
}
});
WMU_M.houseFor = out;
WMU_M.houseKey = key;
return out;
}
WMU_M.plan = plan;
mallStoreAt = function (unit) {
var s = real.apply(this, arguments);
if (s)
return s;
var H = plan()[unit];
return H ? wmuHouseStore(H, unit) : null;
};
if (typeof mallOpen === "function") {
var mo = mallOpen;
mallOpen = function (u) {
if (u && !real(u.i)) {
var H = plan()[u.i];
if (H) {
wmuStall(H.id);
return;
}
}
return mo.apply(this, arguments);
};
}
})();
function wmuHouseUnit(id) { var P = WMU_M.plan ? WMU_M.plan() : {}; for (var u in P)
if (P[u].id === id)
return +u; return null; }
function wmuKioskPos(i) {
var VA = MD.VA, VB = MD.VB;
var fixed = [[-34, -28, 0], [34, 28, 0], [-48, 22, 0], [48, -22, 0]];
if (i < 4)
return { x: fixed[i][0], z: fixed[i][1], lv: 0 };
var t = [Math.PI * 0.2, Math.PI * 0.8, Math.PI * 1.2, Math.PI * 1.8][i - 4];
return { x: Math.cos(t) * (VA + 4), z: Math.sin(t) * (VB + 4), lv: i < 6 ? 1 : 2 };
}
var WMU_KIOSKS = [[0, "m_sweets"], [1, "m_teas"], [3, "m_floss"], [5, "m_pearl"]];
function wmuMallClear(x, z) { return __ZC(327, 122, this, arguments, new.target); }
function wmuMallBuild() { return __ZC(327, 123, this, arguments, new.target); }
(function () {
if (typeof mallBuild === "function") {
var mb = mallBuild;
mallBuild = function () { var r = mb.apply(this, arguments); try {
wmuMallBuild();
}
catch (e) { } return r; };
}
})();
function wmuDesk(msg) { return __ZC(327, 124, this, arguments, new.target); }
function wmuMallPrompt() {
var P = camera.position, w = wmuWhere();
if (w === "arcade") {
var Q = WMU_M.prize;
if (!Q)
return null;
if (Math.abs(P.x - Q.x) < 3.6 && P.z > Q.z - 3.4 && P.z < Q.z - 0.6)
return ["<b>The prize counter</b> · swap your tickets for prizes · <b>press E</b> or tap", function () { wmuPrizeCard(); }];
return null;
}
if (w !== "mall")
return null;
if (MALL.open || MALL.near || MALL.lift || MALL.atStation || MD.ride)
return null;
var lx = P.x - MALL.cx, lz = P.z - MALL.cz, feet = P.y - 1.72, lv = typeof mdLevel === "function" ? mdLevel(feet) : 0;
if (lv === 0) {
if (Math.hypot(lx + 74, lz) < 5.4)
return ["<b>Information</b> · lost and found, lessons, the Mall's posts · <b>press E</b> or tap", function () { wmuDesk(); }];
if (Math.abs(lx) < 6.5 && lz > 27.4 && lz < 31.4)
return ["<b>The Cloud Café</b> · coffee, cloud tea, cakes · <b>press E</b> or tap for the menu", function () { wmuStall("m_cafe"); }];
for (var id in WMU_M.lost) {
var L = WMU_M.lost[id];
if (wmuReady(id) && Math.hypot(lx - L.x, lz - L.z) < 1.9) {
var nm = WMU_SPOTS[id].name;
return [esc(nm) + " · <b>press E</b> or tap to pick it up and hand it in", (function (i, n) { return function () { wmuGather(i, n); }; })(id, nm)];
}
}
}
for (var k = 0; k < WMU_KIOSKS.length; k++) {
var p = wmuKioskPos(WMU_KIOSKS[k][0]);
if (p.lv !== lv)
continue;
if (Math.hypot(lx - p.x, lz - p.z) < 3.4) {
var T = WMU_STALLS[WMU_KIOSKS[k][1]];
return ["<b>" + esc(T.name) + "</b> · " + esc(T.say) + " · <b>press E</b> or tap", (function (s) { return function () { wmuStall(s); }; })(WMU_KIOSKS[k][1])];
}
}
return null;
}
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (typeof tsPrompt === "function" && !(typeof WLD !== "undefined" && WLD.on)) {
var p = wmuMallPrompt();
if (p) {
tsPrompt(p[0], p[1]);
return;
}
}
}
catch (e) {
if (window.console && !WMU_M.warned) {
WMU_M.warned = true;
console.warn("[world-more 40] mall", e);
}
}
return tt.apply(this, arguments);
};
})();
function wmuMallTick(dt) {
if (!WMU_M.built)
wmuMallBuild();
if (!WMU_M.arcBuilt && typeof TS !== "undefined" && TS.arc)
wmuArcBuild();
for (var id in WMU_M.lost) {
var L = WMU_M.lost[id], v = wmuReady(id);
if (L.m.visible !== v)
L.m.visible = v;
}
}
function wmuArcBuild() { return __ZC(327, 125, this, arguments, new.target); }
(function () {
if (typeof tsArcBuild === "function") {
var ab = tsArcBuild;
tsArcBuild = function () { var r = ab.apply(this, arguments); try {
wmuArcBuild();
}
catch (e) { } return r; };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) { var Q = WMU_M.prize; if (Q && typeof TS !== "undefined" && TS.arcOn && Math.abs(x - Q.x) < 3.2 && z > Q.z - 0.7 && z < Q.z + 2.8)
return true; return ba.apply(this, arguments); };
}
if (typeof arcOver === "function") {
var ao = arcOver;
arcOver = function (msg) {
var was = typeof ARC !== "undefined" && ARC.over, r = ao.apply(this, arguments);
try {
if (!was && typeof TS !== "undefined" && TS.arcOn && ARC.open && WMU_ARC[ARC.open])
wmuArcScore(ARC.open, ARC.score);
}
catch (e) { }
return r;
};
}
if (typeof ARC_GAMES !== "undefined" && ARC_GAMES.rocks) {
ARC_GAMES.rocks.draw = function (G, x) {
var s = G.s;
x.strokeStyle = "#fff";
x.lineWidth = 1.2;
x.globalAlpha = G.safe > 0 ? 0.45 : 1;
x.beginPath();
x.moveTo(s.x + Math.cos(s.a) * 9, s.y + Math.sin(s.a) * 9);
x.lineTo(s.x + Math.cos(s.a + 2.5) * 7, s.y + Math.sin(s.a + 2.5) * 7);
x.lineTo(s.x + Math.cos(s.a - 2.5) * 7, s.y + Math.sin(s.a - 2.5) * 7);
x.closePath();
x.stroke();
x.globalAlpha = 1;
G.r.forEach(function (r) { x.beginPath(); for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283, d = r.z * 6 * (0.8 + ((i * 7 + r.z) % 3) * 0.12);
x.lineTo(r.x + Math.cos(a) * d, r.y + Math.sin(a) * d);
} x.closePath(); x.stroke(); });
x.fillStyle = "#fff";
G.sh.forEach(function (b) { x.fillRect(b.x - 1, b.y - 1, 2, 2); });
arcText(x, "LIVES " + G.lives, ARC_W - 6, 10, 9, "#aaa", "right");
};
}
})();
function wmuArcTitle(text) { var t = ARC.el && ARC.el.querySelector("#arc-title"); if (t)
t.textContent = text; }
function wmuArcScore(id, score) { return __ZC(327, 126, this, arguments, new.target); }
function wmuPrizeCard(msg) { return __ZC(327, 127, this, arguments, new.target); }
function wmuMallHub() { return __ZC(327, 128, this, arguments, new.target); }
var WMU_LESSONS = [
{ k: "ug1", n: 1, at: "ug", title: "The first underground railways",
real: "The world's first underground railway, the Metropolitan Railway in London, opened on 10 January 1863, between Paddington and Farringdon. Its trains were pulled by steam locomotives, and openings along the line let the smoke out. Budapest opened its first underground line in 1896, Boston its first subway (for streetcars) in 1897, Paris its Métro in 1900 and New York its first subway line in 1904.",
science: "The first lines were built by cut and cover: a trench was dug along a street, the tunnel was built inside it, and the road was put back over the top. Deeper lines were bored with a tunnelling shield, a strong iron ring pushed forward through the clay while the workers dug inside it and lined the tunnel behind them. The first deep electric railway, the City and South London Railway, opened in 1890.",
word: ["Cut and cover", "building a tunnel by digging a trench, building the tunnel in it, and covering it over."],
tryit: "Look at the tunnel mouths at the ends of this platform. A round tunnel is usually a bored one; a square one under a street is usually cut and cover.",
quiz: [["In which year did the first underground railway open?", "1863", "1763", "1923"], ["What pulled the very first underground trains?", "Steam locomotives", "Electric motors", "Horses"]] },
{ k: "ug2", n: 2, at: "ug", title: "Signals: keeping the trains apart",
real: "Railways keep trains apart by dividing the line into sections called blocks. Only one train may be in a block at a time, and the signal at the entrance to a block shows red while a train is inside it. On many metro lines a small arm beside the track, called a train stop, puts a train's brakes on if it passes a red signal.",
science: "A track circuit tells the signals where the trains are. A weak electric current runs along the rails; a train's metal wheels and axles join the two rails and short-circuit it, so the signal knows the section is occupied. The American engineer William Robinson patented the closed track circuit in 1872.",
word: ["Headway", "the time between one train and the next on the same line."],
tryit: "Watch the signals at the end of the platform as a train pulls out, and see the aspect change behind it.",
quiz: [["What does a track circuit detect?", "A train in the section", "The weather", "How many people are aboard"], ["What does the signal at the entrance to a block show while a train is inside it?", "Red", "Green", "Nothing at all"]] },
{ k: "m1", n: 3, at: "mall", title: "From markets to malls",
real: "People have traded in markets for thousands of years: the agora of ancient Athens was its market place as well as its meeting place. Trajan's Market in Rome, built about 100 to 110 AD, held shops and offices on several levels. Istanbul's Grand Bazaar, begun in the 1450s, is one of the oldest and largest covered markets in the world, with about sixty covered streets.",
science: "The first fully enclosed shopping mall in the United States, heated and air-conditioned, opened in 1956 near Minneapolis. Its architect, Victor Gruen, who had come from Vienna, wanted it to feel like a town square under one roof. Malls often put big anchor stores at the ends, so that shoppers walk past the smaller shops between them.",
word: ["Anchor store", "a large store placed to draw shoppers into a mall, past the smaller shops."],
tryit: "Stand by the fountain and look round the three floors. Where would you put the biggest shops, so that people walk past all the others?",
quiz: [["What is an anchor store?", "A big store that draws shoppers past the others", "A shop that sells ships' anchors", "The mall's own office"], ["Which city's Grand Bazaar, begun in the 1450s, is one of the oldest covered markets?", "Istanbul", "Paris", "Lisbon"]] },
{ k: "m2", n: 4, at: "mall", title: "How a shop sets its price",
real: "A shop buys its stock wholesale, in bulk from makers or suppliers, and sells it retail, one at a time, for more. The difference, the markup, has to pay the rent, the staff, the lighting and the heating before anything is left over as profit. Many malls charge their shops a fixed rent, and some add a share of what each shop sells.",
science: "Prices move with supply and demand. When many people want something and there is little of it, its price tends to rise; when there is plenty and few want it, the price tends to fall. In this mall every counter sells a thing for more than it pays you for the same thing: that gap is its margin.",
word: ["Wholesale", "buying or selling goods in large amounts, to be sold on to others."],
tryit: "At the Mall General Store, compare what an umbrella costs with what the store pays you for one. What is its margin?",
quiz: [["What usually happens to the price of something scarce that many people want?", "It rises", "It falls", "It never changes"], ["What must a shop's markup pay for, before there is any profit?", "Rent, staff and running costs", "Only the sign over the door", "Nothing at all"]] }
];
var WMU_COURSE = "world-under-mall";
var WMUL = { cur: null, ans: {}, t0: 0, msg: "" };
function wmulLog() { var st = (typeof eduStore === "function") ? eduStore() : {}; return st[WMU_COURSE] || (st[WMU_COURSE] = {}); }
function wmulDone(n) { return !!wmulLog()[n]; }
function wmulCount() { return WMU_LESSONS.filter(function (l) { return wmulDone(l.n); }).length; }
function wmulOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 5 + k * 2) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function wmuLessonPick(at) { return __ZC(327, 129, this, arguments, new.target); }
function wmuLessonCard(l) { return __ZC(327, 130, this, arguments, new.target); }
function wmulCheck(l) { return __ZC(327, 131, this, arguments, new.target); }
(function () {
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () { var h = er.apply(this, arguments); try {
return h + '<div style="margin-top:6px">World Learning: Under the City and the World Mall, ' + wmulCount() + ' of ' + WMU_LESSONS.length + ' lessons learned.</div>';
}
catch (e) {
return h;
} };
}
})();
