/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DQ_ITEMS = [
["dr_asphodel", "Asphodel flower", "🌼", 2, 0, 0, "A pale lily-like flower of the Asphodel Meadows (real asphodel grows wild round the Mediterranean)."],
["dr_obol", "Old obol", "🪙", 4, 0, 0, "A small silver coin of ancient Greece. The dead were buried with one, for the ferryman."],
["dr_pomegranate", "Pomegranate", "🍎", 3, 10, 2, "From Persephone's tree. Hundreds of seeds, each in its own jewel of juice."],
["dr_pomjuice", "Pomegranate juice", "🧃", 2, 2, 18, "Pressed at the shade market."],
["dr_honeycake", "Honey cake", "🍯", 2, 14, 0, "In the old story the Sibyl calmed Cerberus with a honey cake. This one is for you."],
["dr_shadelantern", "Lantern of the shades", "🏮", 12, 0, 0, "A keepsake: a little lantern with a pale, steady flame."],
["dr_ferrytoken", "Ferryman's token", "🎟️", 8, 0, 0, "Charon's own token, for a dreamer who paid the fare for others."],
["dr_cloudwool", "Cloud wool", "☁️", 2, 0, 0, "A tuft of cloud, soft and cool. It does not melt in the hand, in a dream."],
["dr_goldfeather", "Golden feather", "🪶", 5, 0, 0, "Shed by a pegasus in flight."],
["dr_dewdrop", "Morning dew", "💧", 3, 0, 0, "Dew gathered on the cloud lawns at first light."],
["dr_cloudbread", "Cloud bread", "🍞", 2, 12, 0, "Light as air and baked on the cloud lawns."],
["dr_nectar", "Nectar", "🍯", 2, 2, 16, "Sweet, golden, served in a small cup."],
["dr_harp", "Small harp", "🪕", 15, 0, 0, "A keepsake: a lap harp of twelve strings."],
["dr_halo", "Glass halo", "✨", 10, 0, 0, "A keepsake: a ring of glass that catches the light."],
["dr_quill", "Gatekeeper's quill", "🖋️", 8, 0, 0, "Cut from a golden feather by the Gatekeeper himself."],
["dr_pearl", "Pearl", "⚪", 6, 0, 0, "Made by an oyster coating a grain of grit with nacre, layer on layer."],
["dr_seaglass", "Sea glass", "🟢", 2, 0, 0, "Glass rounded and frosted by the sea."],
["dr_kelp", "Kelp", "🌿", 1, 4, 0, "A great brown seaweed. People in many coastal countries eat it."],
["dr_kelpcracker", "Kelp crackers", "🍘", 1, 8, 0, "Crisp, salty, from the reef market."],
["dr_seagrape", "Sea-grape cordial", "🧃", 2, 2, 14, "Made by the merfolk from sea grapes, a real seaweed."],
["dr_whispershell", "Whispering shell", "🐚", 8, 0, 0, "A keepsake: hold it to your ear and hear the sea (in fact, the air moving inside it)."],
["dr_pearlstring", "String of pearls", "📿", 25, 0, 0, "A keepsake: a string of the Depths' own pearls."],
["dr_crownshell", "Shell of the Queen's crown", "👑", 10, 0, 0, "A keepsake from Queen Maren, for the pearls you brought."],
["dr_moonpetal", "Moon petal", "🌸", 2, 0, 0, "Petals that open only under the moon in Faerie."],
["dr_toadstool", "Fairy toadstool", "🍄", 3, 0, 0, "Red with white spots. Real ones like it are poisonous: look, never eat."],
["dr_acorn", "Acorn", "🌰", 1, 0, 0, "An oak's seed. The gnomes store them for the winter."],
["dr_moonjar", "Moonlight in a jar", "🫙", 14, 0, 0, "A keepsake: it glows softly, and never flickers."],
["dr_dewcup", "Dew in an acorn cup", "🥛", 1, 0, 10, "Fairy fare. Very small."],
["dr_honeycomb", "Wild honeycomb", "🍯", 2, 10, 0, "From the bees of the elven tree."],
["dr_wishribbon", "Wishing ribbon", "🎀", 3, 0, 0, "A keepsake: tie it to a branch and make a small wish."],
["dr_stardust", "Stardust", "✨", 3, 0, 0, "Dust from old stars. Much of the iron in your blood was made in stars."],
["dr_echostone", "Echo stone", "🪨", 3, 0, 0, "Hold it close and it gives back the last thing you said."],
["dr_starbiscuit", "Star biscuit", "🍪", 1, 8, 0, "Baked by the Lamplighter, in the shape of a star."],
["dr_lamptea", "Lamp-room tea", "🍵", 1, 0, 14, "Warm, from the kettle in the lighthouse."],
["dr_lantern", "Lamplighter's lantern", "🏮", 11, 0, 0, "A keepsake: a brass lantern that always finds the way."],
["dr_voidcompass", "Void compass", "🧭", 9, 0, 0, "A keepsake: it points to the nearest light."],
["dr_mirrorshard", "Looking-glass shard", "🪞", 3, 0, 0, "A piece of looking-glass. Its reflection is a moment late."],
["dr_chesspiece", "Lost chess piece", "♟️", 4, 0, 0, "Fallen from the giant board. The Red Queen wants them back."],
["dr_lgrose", "Looking-glass rose", "🌹", 2, 0, 0, "Grows in the looking-glass gardens."],
["dr_jam", "Jam for tomorrow", "🍓", 2, 10, 0, "The White Queen's rule: jam tomorrow, never today. This one you may eat today."],
["dr_backtea", "Backward tea", "🍵", 1, 0, 12, "Poured from the cup into the pot."],
["dr_handmirror", "Silver hand mirror", "🪞", 10, 0, 0, "A keepsake."],
["dr_chessset", "Travelling chess set", "♟️", 14, 0, 0, "A keepsake: a folding board with all thirty-two pieces."],
["dr_marigold", "Marigold", "🏵️", 2, 0, 0, "Cempasúchil, the flower of the Day of the Dead. Its petals make paths for the visiting souls."],
["dr_candle", "Candle stub", "🕯️", 2, 0, 0, "Left on an ofrenda, still good for lighting."],
["dr_copal", "Copal resin", "🟡", 3, 0, 0, "A tree resin burned as incense on Mexican altars since long before the Spanish came."],
["dr_pandemuerto", "Pan de muerto", "🍞", 2, 14, 0, "The sweet bread of the Day of the Dead, with bones of dough across the top."],
["dr_champurrado", "Champurrado", "☕", 2, 4, 16, "Thick hot chocolate made with corn masa."],
["dr_sugarskull", "Sugar skull", "💀", 4, 0, 0, "A keepsake: decorated for an ofrenda, not for eating."],
["dr_picado", "Papel picado banner", "🎏", 5, 0, 0, "A keepsake: tissue paper cut in lacy patterns."],
["dr_icecrystal", "Ice crystal", "❄️", 3, 0, 0, "Six-sided, as every snow crystal is."],
["dr_cloudberry", "Cloudberry", "🫐", 2, 6, 0, "An orange berry of the Arctic bogs."],
["dr_mammothwool", "Mammoth wool", "🧶", 4, 0, 0, "Shed on the snowfields at the end of winter."],
["dr_smokedfish", "Smoked fish", "🐟", 2, 16, 0, "Caught through the ice and smoked in the village."],
["dr_berrytea", "Hot cloudberry tea", "🍵", 1, 0, 18, "Warms you through."],
["dr_mittens", "Mammoth-wool mittens", "🧤", 8, 0, 0, "A keepsake, and warm."],
["dr_snowglobe", "Snow globe", "🔮", 6, 0, 0, "A keepsake: the ice palace under glass. Shake it gently."],
["dr_glowmoss", "Glow moss", "🌱", 2, 0, 0, "It gives off a steady green light, as some real mushrooms and plankton do."],
["dr_skystone", "Sky-stone", "🪨", 4, 0, 0, "Light enough to bob a little when you let it go."],
["dr_domefruit", "Dome fruit", "🍋", 3, 10, 4, "Grown under the great dome."],
["dr_domebread", "Dome-grain flatbread", "🫓", 2, 12, 0, "Baked in the settlement."],
["dr_fizzwater", "Bubbling spring water", "💧", 1, 0, 14, "From a spring under the domes."],
["dr_floatpebble", "Floating pebble in a jar", "🫙", 12, 0, 0, "A keepsake: a sky-stone that hovers above the jar's floor."],
["dr_twinmoons", "Print of the twin moons", "🖼️", 7, 0, 0, "A keepsake: the two moons over the domes."],
["dr_obsidian", "Obsidian", "⬛", 4, 0, 0, "Volcanic glass: lava that cooled too fast to form crystals."],
["dr_sulphur", "Sulphur", "🟡", 2, 0, 0, "Yellow crystals from the volcano's vents."],
["dr_forgebread", "Forge-baked bread", "🍞", 2, 12, 0, "The dwarf smiths bake it on the forge's hearthstone."],
["dr_springwater", "Cool spring water", "💧", 1, 0, 16, "From a spring under the mountain, the coldest thing in the Burning Lands."],
["dr_arrowhead", "Obsidian arrowhead", "🔺", 6, 0, 0, "A keepsake, knapped by a dwarf smith."],
["dr_phoenixfeather", "Phoenix feather", "🪶", 15, 0, 0, "A keepsake from the Phoenix: warm to the touch, never hot."],
["dr_meteorite", "Meteorite fragment", "☄️", 5, 0, 0, "Most meteorites are stone; some are iron and nickel."],
["dr_starlight", "Bottled starlight", "🌟", 3, 0, 0, "Light gathered from old stars."],
["dr_cometice", "Comet ice", "🧊", 3, 0, 0, "Comets are made of ice and dust. Ice in space could one day be water and rocket fuel."],
["dr_spaceicecream", "Freeze-dried ice cream", "🍨", 1, 8, 0, "Crunchy. Sold to visitors more than it was ever eaten in space."],
["dr_teapouch", "Pouch of hot tea", "🧋", 1, 0, 14, "Drunk through a straw, as in orbit."],
["dr_starchart", "Star chart", "🗺️", 5, 0, 0, "A keepsake: the stars as seen from here."],
["dr_telescope", "Brass pocket telescope", "🔭", 16, 0, 0, "A keepsake."],
["dr_seedpod", "Wild seed pod", "🌾", 3, 0, 0, "Seeds are worth most in Haven: things grow again."],
["dr_battery", "Spent battery", "🔋", 3, 0, 0, "Collected for recycling: batteries never belong in the ground."],
["dr_beansoup", "Bean soup", "🥣", 1, 18, 0, "From the soup kitchen. Bean and whatever-we-grew-this-week."],
["dr_filtered", "Filtered water", "💧", 1, 0, 18, "Filtered through sand and charcoal, then boiled."],
["dr_canlantern", "Can lantern", "🏮", 4, 0, 0, "A keepsake: a lantern made from a tin can."],
["dr_scrapflower", "Scrap-metal flower", "🌻", 5, 0, 0, "A keepsake: a sunflower welded from scrap."],
["dr_dates", "Dates", "🌴", 2, 8, 0, "From the oasis palms."],
["dr_desertrose", "Desert rose", "🌹", 4, 0, 0, "Real: a rosette of gypsum crystals that forms in dry, salty sand."],
["dr_potsherd", "Pottery shard", "🏺", 3, 0, 0, "A piece of an old water jar, worn smooth by the sand."],
["dr_mintea", "Mint tea", "🍵", 1, 0, 16, "Hot, sweet and poured from high up."],
["dr_flatbread", "Flatbread with dates", "🫓", 2, 14, 0, "Baked on hot stones at the caravan camp."],
["dr_saffron", "A pinch of saffron", "🌼", 12, 0, 0, "The threads of a crocus flower, picked by hand."],
["dr_brasslamp", "Brass lamp", "🪔", 14, 0, 0, "A keepsake. Rubbing it does nothing at all."],
["dr_bolt", "Lost bolt", "🔩", 1, 0, 0, "In orbit a lost bolt drifts away; aboard, it rolls under a console."],
["dr_solarcell", "Spare solar cell", "🔆", 4, 0, 0, "Turns sunlight straight into electricity."],
["dr_microgreens", "Microgreens", "🥬", 2, 4, 0, "From the station's grow-racks, under LED light."],
["dr_galleystew", "Galley stew", "🥫", 2, 16, 0, "Heated in its pouch."],
["dr_juicepouch", "Juice pouch", "🧃", 1, 0, 14, "With a straw that clips shut."],
["dr_patch", "Mission patch", "🧷", 3, 0, 0, "A keepsake: every crew designs its own."],
["dr_stationmodel", "Model of the Orbital", "🛰️", 12, 0, 0, "A keepsake."],
["dr_roofherbs", "Rooftop herbs", "🌿", 2, 3, 0, "From the farms on the tower roofs."],
["dr_recycling", "Sorted recycling", "♻️", 1, 0, 0, "Glass, metal and paper, kept apart so each can be made new."],
["dr_led", "Spare LED", "💡", 2, 0, 0, "A light that uses a fraction of an old bulb's power."],
["dr_flatwhite", "Oat flat white", "☕", 1, 0, 14, "From the coffee cart on the plaza."],
["dr_strawberries", "Tower-farm strawberries", "🍓", 2, 10, 0, "Grown forty floors up."],
["dr_cityprint", "Print of the City to Come", "🖼️", 6, 0, 0, "A keepsake."],
["dr_toytram", "Toy tram", "🚋", 8, 0, 0, "A keepsake."],
["dr_petals", "Fallen petals", "🌸", 1, 0, 0, "From the trees along the Row."],
["dr_tablet", "Clay tablet fragment", "🧱", 4, 0, 0, "Pressed with wedge-shaped marks: cuneiform, the oldest writing we know."],
["dr_festsweets", "Festival sweets", "🍬", 1, 8, 0, "From the pilgrims' stall."],
["dr_rowwater", "Spring water", "💧", 1, 0, 16, "From the fountain court's spring."],
["dr_rowguide", "Guidebook to the Row", "📖", 4, 0, 0, "A keepsake: every house on the Row, and what its parts are for."],
["dr_bell", "Little brass bell", "🔔", 5, 0, 0, "A keepsake."],
["dr_cuneiform", "Your name in cuneiform", "🧱", 8, 0, 0, "A keepsake: the scribe pressed your name into clay."],
["dr_passport", "Dreamwalker's Passport", "📘", 20, 0, 0, "Stamped in all sixteen dream lands. The Registrar of Doors signed it."],
["cr_ember", "Emberstone", "🔥", 12, 0, 0, "A forge material."],
["cr_crystal", "Star crystal", "💠", 10, 0, 0, "A forge material."],
["cr_parts", "Machine parts", "🔩", 10, 0, 0, "A forge material."],
["cr_coal", "Coal", "🪨", 1, 0, 0, "A forge material."]
];
var DQ_ITEM = {};
DQ_ITEMS.forEach(function (r) { DQ_ITEM[r[0]] = { k: r[0], n: r[1], e: r[2], b: r[3], fd: r[4], dr: r[5], note: r[6] }; });
var DQ_LANDS = {
underworld: { name: "the Underworld",
gather: [["dr_asphodel", 12, "bloom", 0xE8E2CC, [-70, 20, 60]], ["dr_obol", 10, "coin", 0xC0B080, [0, -110, 70]], ["dr_pomegranate", 8, "pomegranate", 0xA02838, [-66, -196, 34]]],
errands: [
{ k: "uw_fare", who: "Charon the ferryman", n: "The ferryman's fare", say: "Coins fall from the shades' pockets all along the road. Bring me five obols and I'll carry the next five who can't pay.", need: { dr_obol: 5 }, gold: 20, gift: ["dr_ferrytoken", 1] },
{ k: "uw_spring", who: "Persephone", n: "Seeds for the spring", say: "When I go up, I take the spring with me. Bring me asphodel and two of my pomegranates, and the meadows above will bloom early.", need: { dr_asphodel: 6, dr_pomegranate: 2 }, gold: 18, gift: ["dr_pomjuice", 2] },
{ k: "uw_posy", who: "A hero of Elysium", n: "A posy for the fields", say: "Nothing pale grows in Elysium. Bring eight asphodel and we'll plant them by the river, so the newcomers see something they know.", need: { dr_asphodel: 8 }, gold: 14 }
],
stall: { who: "The shade at the stall", n: "The shade market", goods: [["dr_pomjuice", 4], ["dr_honeycake", 5], ["dr_shadelantern", 30]] },
games: [
{ k: "uw_road", t: "course", who: "Charon the ferryman", n: "The Road of Shades", say: "Run the road from my jetty to the Elysian Fields before the lamps go down. Through every ring.", pts: [[0, -66], [0, -100], [0, -122], [30, -134], [70, -150], [100, -162], [120, -170]], gold: 12 },
{ k: "uw_judges", t: "quiz", who: "Minos", n: "The judges' questions", say: "Three questions on the old stories. Answer all three truly.", gold: 10, qs: [
["Who ferried the dead across the River Styx?", "Charon", "Hermes", "Orpheus"],
["How many heads did Cerberus have, in most of the old stories?", "Three", "Seven", "Nine"],
["Why did Persephone have to stay in the Underworld part of every year?", "She ate pomegranate seeds there", "She lost a bet with Hades", "She missed the last ferry"],
["Which river made the dead forget their lives?", "The Lethe", "The Nile", "The Acheron"],
["Which musician sang his way into the Underworld to bring back his wife?", "Orpheus", "Apollo", "Homer"],
["Where did the blessed heroes rest?", "The Elysian Fields", "Tartarus", "The Asphodel Meadows"]
] }
],
lesson: "uw",
add: function (P) { return __ZC(322, 0, this, arguments, new.target); } },
heavens: { name: "the Heavens",
gather: [["dr_cloudwool", 12, "puff", 0xEEF2F8, [0, -60, 150]], ["dr_goldfeather", 8, "feather", 0xE8C060, [80, -60, 90]], ["dr_dewdrop", 10, "orb", 0xBFE8FF, [0, -112, 60]]],
errands: [
{ k: "hv_book", who: "The Gatekeeper", n: "Quills for the book", say: "Every dreamer's name goes in the book, and my quills wear down. Three golden feathers, if you find them: the pegasi drop them east of the gate.", need: { dr_goldfeather: 3 }, gold: 18, gift: ["dr_quill", 1] },
{ k: "hv_ink", who: "The Archivist", n: "Dew for the ink", say: "We write every kindness in ink made with morning dew. Five drops, from the lawns round the fountain.", need: { dr_dewdrop: 5 }, gold: 15 },
{ k: "hv_choir", who: "The choir leader", n: "Cushions for the choir", say: "The palace steps are hard on old knees. Eight tufts of cloud wool would make cushions for the whole choir.", need: { dr_cloudwool: 8 }, gold: 14, gift: ["dr_nectar", 2] }
],
stall: { who: "The cloud-baker", n: "The cloud-baker's stall", goods: [["dr_cloudbread", 4], ["dr_nectar", 5], ["dr_halo", 25], ["dr_harp", 40]] },
games: [
{ k: "hv_relay", t: "course", who: "The Gatekeeper", n: "The Cloud Relay", say: "Carry a message from the gate to the palace steps and round by the stair. Through every ring, and quickly.", pts: [[0, -70], [0, -96], [-16, -112], [0, -128], [0, -150], [40, -128], [70, -112], [100, -80]], gold: 12 },
{ k: "hv_harps", t: "match", who: "The harpist", n: "The harpist's pairs", say: "Turn two cards at a time and find each instrument's pair.", gold: 10, pairs: [["🪕", "🪕"], ["🎻", "🎻"], ["🎺", "🎺"], ["🥁", "🥁"], ["🎷", "🎷"], ["🪈", "🪈"], ["🎹", "🎹"], ["🔔", "🔔"]] }
],
lesson: "hv",
add: function (P) { return __ZC(322, 1, this, arguments, new.target); } },
depths: { name: "the Depths",
gather: [["dr_pearl", 10, "shell", 0xF2EEE2, [60, -20, 80], 1], ["dr_seaglass", 12, "stone", 0x7FC8B0, [-40, -20, 110], 1], ["dr_kelp", 10, "herb", 0x4A7A3A, [-70, 30, 90], 1]],
errands: [
{ k: "dp_crown", who: "Queen Maren of the Depths", n: "Pearls for the crown", say: "My crown lost three pearls in the last great storm. The oyster beds on the reef might give you three more.", need: { dr_pearl: 3 }, gold: 22, gift: ["dr_crownshell", 1] },
{ k: "dp_glass", who: "A pearl trader", n: "Glass for the lanterns", say: "Sea glass makes the prettiest lanterns on the reef. Six pieces, any colour.", need: { dr_seaglass: 6 }, gold: 12 },
{ k: "dp_samples", who: "A diver from the surface", n: "Samples for the surface", say: "I'd love samples to take back up: four fronds of kelp and two bits of sea glass. Kelp forests are among the fastest-growing things in the sea.", need: { dr_kelp: 4, dr_seaglass: 2 }, gold: 14, gift: ["dr_kelpcracker", 2] }
],
stall: { who: "A pearl trader", n: "The reef market", goods: [["dr_kelpcracker", 3], ["dr_seagrape", 4], ["dr_whispershell", 20], ["dr_pearlstring", 60]] },
games: [
{ k: "dp_current", t: "course", who: "A diver from the surface", n: "The Current Race", say: "Ride the reef current round the market and the wreck. Through every ring.", pts: [[0, -10], [40, -8], [80, 0], [110, -24], [96, -60], [60, -80], [20, -60]], gold: 12 },
{ k: "dp_queen", t: "quiz", who: "Queen Maren of the Depths", n: "The Queen's questions", say: "Tell me true things about your oceans, and I will tell you true things about mine.", gold: 10, qs: [
["About how deep does sunlight reach in the open ocean?", "About 200 metres", "About 20 metres", "About 5,000 metres"],
["What is the deepest place known in the oceans?", "The Challenger Deep", "The Great Barrier Reef", "The Dead Sea"],
["How does an oyster make a pearl?", "It coats a bit of grit with nacre", "It swallows a white stone", "It grows one every spring"],
["What is coral?", "Colonies of tiny animals", "A kind of rock that grows", "A seaweed"],
["How much of the Earth's surface does the ocean cover?", "About 71 per cent", "About 30 per cent", "About 95 per cent"],
["What do whales breathe?", "Air, at the surface", "Water, through gills", "Nothing; they hold it for life"]
] }
],
lesson: "dp" },
faerie: { name: "Faerie", board: [9, -28, -0.3],
gather: [["dr_moonpetal", 12, "bloom", 0xE0C4F2, [0, -40, 130]], ["dr_toadstool", 10, "mush", 0xC83030, [-60, -60, 90]], ["dr_acorn", 12, "acorn", 0x8A6A3A, [80, 40, 90]]],
errands: [
{ k: "fa_bower", who: "Titania", n: "Petals for the bower", say: "My bower wants petals, and the moon petals are the softest. Eight, from anywhere in the wood.", need: { dr_moonpetal: 8 }, gold: 16, gift: ["dr_wishribbon", 1] },
{ k: "fa_rings", who: "Oberon", n: "Toadstools for a new ring", say: "A fairy ring grows outward, year on year. Help it along: five toadstools, and I'll set them where the next ring will be.", need: { dr_toadstool: 5 }, gold: 15 },
{ k: "fa_winter", who: "A gnome of the village", n: "Acorns for winter", say: "Winter's coming to the toadstool village, even in Faerie. Ten acorns would fill my larder.", need: { dr_acorn: 10 }, gold: 12, gift: ["dr_honeycomb", 1] }
],
stall: { who: "A fae trader", n: "The fairy market", goods: [["dr_dewcup", 3], ["dr_honeycomb", 4], ["dr_wishribbon", 8], ["dr_moonjar", 35]] },
games: [
{ k: "fa_pixies", t: "light", who: "Titania", n: "Find the hidden pixies", say: "Six pixies are hiding in the wood. Walk up to each one and it will light up. Find them all before the moon moves on.", count: 6, secs: 300, col: 0xD8B8FF, what: "pixie", area: [0, -40, 140], gold: 12 },
{ k: "fa_riddles", t: "quiz", who: "Oberon", n: "Oberon's riddles", say: "Answer three riddles, mortal, and I'll grant you a small bargain: gold, and nothing tricky.", gold: 10, qs: [
["I have roots that no one sees, I'm taller than the tallest trees, up I go and yet I never grow. What am I?", "A mountain", "A beanstalk", "A cloud"],
["The more of me you take, the more you leave behind. What am I?", "Footsteps", "Acorns", "Breath"],
["I have a ring but no finger, I grow at night and vanish by day. What am I?", "A fairy ring of mushrooms", "The moon", "A bell"],
["What has hands but cannot clap?", "A clock", "A gnome", "A tree"],
["I'm light as a feather, yet the strongest can't hold me long. What am I?", "Your breath", "A petal", "A shadow"],
["What can run but never walks, has a mouth but never talks?", "A river", "A fox", "The wind"]
] }
],
lesson: "fa" },
void: { name: "the Void",
gather: [["dr_stardust", 12, "orb", 0xC8D8FF, [0, -60, 150]], ["dr_echostone", 10, "stone", 0x6A6478, [-70, -50, 80]], ["cr_crystal", 6, "crystal", 0x8FC2DA, [-120, -110, 60]]],
errands: [
{ k: "vo_oil", who: "The Lamplighter", n: "Fuel for the lamp", say: "The lamp burns stardust here, nothing else will do. Six handfuls and it will burn another age.", need: { dr_stardust: 6 }, gold: 16, gift: ["dr_starbiscuit", 2] },
{ k: "vo_lens", who: "The Lamplighter", n: "Crystals for the lens", say: "The great lens has a crack. Two star crystals from the spire would mend it.", need: { cr_crystal: 2 }, gold: 24, gift: ["dr_voidcompass", 1] },
{ k: "vo_watch", who: "The Watcher", n: "What the stones remember", say: "The echo stones hold the last words said near them. Bring me four; I keep a record of what the lost have said.", need: { dr_echostone: 4 }, gold: 14 }
],
stall: { who: "The Lamplighter", n: "The lighthouse kitchen", goods: [["dr_starbiscuit", 3], ["dr_lamptea", 3], ["dr_voidcompass", 22], ["dr_lantern", 28]] },
games: [
{ k: "vo_beacons", t: "light", who: "The Lamplighter", n: "Relight the beacons", say: "Six beacons mark the ways back. They have gone out. Walk to each and it will light again, before the dark closes in.", count: 6, secs: 300, col: 0xFFE2A0, what: "beacon", area: [0, -60, 140], gold: 12 }
],
lesson: "vo" },
mirror: { name: "the Mirror World",
gather: [["dr_mirrorshard", 12, "crystal", 0xD0DCE6, [0, -60, 140]], ["dr_chesspiece", 8, "piece", 0xD8D2C4, [-80, 30, 60]], ["dr_lgrose", 10, "bloom", 0xC03048, [0, -100, 90]]],
errands: [
{ k: "mi_pieces", who: "The Red Queen", n: "Pieces for the board", say: "Pieces keep wandering off the board. Bring me four, at once! Well, as soon as you can run there and back.", need: { dr_chesspiece: 4 }, gold: 18 },
{ k: "mi_mirror", who: "The White Queen", n: "Mend tomorrow's mirror", say: "I shall break my mirror tomorrow, you know, so I'm mending it today. Five shards, please.", need: { dr_mirrorshard: 5 }, gold: 15, gift: ["dr_jam", 2] },
{ k: "mi_roses", who: "A mirror twin", n: "Roses for both of us", say: "Six roses: three for me and three for my reflection. Or is it the other way round?", need: { dr_lgrose: 6 }, gold: 12 }
],
stall: { who: "A mirror twin", n: "The looking-glass shop", goods: [["dr_jam", 4], ["dr_backtea", 3], ["dr_handmirror", 26], ["dr_chessset", 35]] },
games: [
{ k: "mi_pairs", t: "match", who: "A mirror twin", n: "Mirror pairs", say: "Every card has its twin. Turn two at a time and find them all.", gold: 10, pairs: [["♔", "♔"], ["♕", "♕"], ["♖", "♖"], ["♗", "♗"], ["♘", "♘"], ["♙", "♙"], ["🪞", "🪞"], ["🌹", "🌹"]] },
{ k: "mi_queen", t: "quiz", who: "The Red Queen", n: "The Red Queen's questions", say: "Questions! Quickly! Off with the wrong answers.", gold: 10, qs: [
["What does a mirror really swap?", "Front and back", "Left and right", "Up and down"],
["How many squares are on a chessboard?", "64", "48", "100"],
["In chess, what can a pawn become if it reaches the far side?", "Any piece but a king", "Only a queen", "A king"],
["Which word reads the same backwards?", "Level", "Mirror", "Queen"],
["Who wrote Through the Looking-Glass?", "Lewis Carroll", "Hans Christian Andersen", "The Brothers Grimm"],
["What is the coating behind a glass mirror usually made of?", "A thin layer of silver or aluminium", "Paint", "Ice"]
] }
],
lesson: "mi" },
dead: { name: "the Land of the Dead",
gather: [["dr_marigold", 14, "bloom", 0xF0961E, [0, -60, 120]], ["dr_candle", 10, "candle", 0xE8DCC0, [60, -90, 70]], ["dr_copal", 8, "stone", 0xE0B060, [-60, -80, 70]]],
errands: [
{ k: "de_light", who: "The Lantern Keeper", n: "Light for the remembered", say: "Six candles, and six more souls will have a light to find their way home by.", need: { dr_candle: 6 }, gold: 16, gift: ["dr_sugarskull", 1] },
{ k: "de_path", who: "A skeleton fiddler", n: "The marigold path", say: "The petals make a path from the graveyard to the ofrendas, so the visitors don't get lost. Ten marigolds would do it.", need: { dr_marigold: 10 }, gold: 14 },
{ k: "de_ofrenda", who: "The Lantern Keeper", n: "Copal for the ofrenda", say: "The ofrenda wants copal for its smoke and marigolds for its colour. Four of each.", need: { dr_copal: 4, dr_marigold: 4 }, gold: 18, gift: ["dr_picado", 1] }
],
stall: { who: "The baker of the ofrendas", n: "The ofrenda stall", goods: [["dr_pandemuerto", 4], ["dr_champurrado", 4], ["dr_sugarskull", 10], ["dr_picado", 12]] },
games: [
{ k: "de_lanterns", t: "light", who: "The Lantern Keeper", n: "Light the lanterns", say: "Eight lanterns stand dark tonight. Walk up to each and light it before the bells ring.", count: 8, secs: 360, col: 0xFFB050, what: "lantern", area: [0, -60, 120], gold: 12 }
],
lesson: "de",
add: function (P) { return __ZC(322, 2, this, arguments, new.target); } },
frozen: { name: "the Frozen Realm",
gather: [["dr_icecrystal", 12, "crystal", 0xCFEFFF, [0, -60, 140]], ["dr_cloudberry", 10, "berry", 0xF0A040, [-60, 10, 80]], ["dr_mammothwool", 8, "puff", 0x7A5A3A, [110, -80, 60]]],
errands: [
{ k: "fr_palace", who: "The Steward of the Ice Palace", n: "Mend the palace", say: "The north wind chipped the palace windows. Six ice crystals will mend them before the Queen comes home.", need: { dr_icecrystal: 6 }, gold: 16, gift: ["dr_snowglobe", 1] },
{ k: "fr_berries", who: "An ice fisher", n: "Berries for the village", say: "Cloudberries keep all winter in a cold cellar. Six would see my family through to spring.", need: { dr_cloudberry: 6 }, gold: 12, gift: ["dr_smokedfish", 2] },
{ k: "fr_wool", who: "A herder", n: "Wool for the yurts", say: "The mammoths shed in tufts. Five of them and I can felt a new wall for the yurt.", need: { dr_mammothwool: 5 }, gold: 16, gift: ["dr_mittens", 1] }
],
stall: { who: "An ice fisher", n: "The ice fisher's stall", goods: [["dr_smokedfish", 5], ["dr_berrytea", 3], ["dr_snowglobe", 15], ["dr_mittens", 20]] },
games: [
{ k: "fr_skate", t: "course", who: "An ice fisher", n: "The Skate Run", say: "Skate the frozen lake: through every ring before the sun goes behind the palace.", pts: [[40, 0], [56, -8], [76, -6], [92, 8], [94, 30], [78, 44], [56, 40], [44, 24]], gold: 12 }
],
lesson: "fr" },
elsewhere: { name: "Another World",
gather: [["dr_glowmoss", 12, "bloom", 0x60F0C0, [-40, -40, 130]], ["dr_skystone", 8, "stone", 0x8A9AE0, [60, 40, 90]], ["dr_domefruit", 10, "domefruit", 0xF0D040, [0, -90, 50]]],
errands: [
{ k: "el_stone", who: "A trader of the domes", n: "A stone that floats", say: "Sky-stones fetch a good price at home. Four, and I'll pay you well.", need: { dr_skystone: 4 }, gold: 18, gift: ["dr_floatpebble", 1] },
{ k: "el_seeds", who: "The dome keeper", n: "Fruit for the seed bank", say: "We keep a seed from every fruit, in case the dome ever fails. Five dome fruit, please.", need: { dr_domefruit: 5 }, gold: 14 },
{ k: "el_moss", who: "A trader of the domes", n: "Moss for the lamps", say: "Glow moss lights the settlement at night without a spark of power. Eight clumps.", need: { dr_glowmoss: 8 }, gold: 12, gift: ["dr_fizzwater", 2] }
],
stall: { who: "A trader of the domes", n: "The settlement market", goods: [["dr_domebread", 4], ["dr_fizzwater", 3], ["dr_twinmoons", 18], ["dr_floatpebble", 30]] },
games: [
{ k: "el_monoliths", t: "light", who: "The dome keeper", n: "Wake the monoliths", say: "The ring of monoliths by the moon pool sleeps. Touch each one and it wakes. All seven, before it dozes off again.", count: 7, secs: 240, col: 0x80F0D0, what: "monolith", fixed: [[-44, 36], [-47, 50], [-53, 26], [-60, 56], [-67, 26], [-73, 50], [-76, 36]], near: 5, gold: 10 },
{ k: "el_skyport", t: "course", who: "The skyport warden", n: "The Skyport Loop", say: "Fly the skyport loop on foot: round the landing pads and the domes, through every ring.", pts: [[60, 4], [100, 24], [118, 14], [150, 44], [132, 70], [106, 58]], gold: 12 }
],
lesson: "el",
add: function (P) { return __ZC(322, 3, this, arguments, new.target); } },
fire: { name: "the Burning Lands",
gather: [["cr_ember", 8, "ember", 0xFF7A2A, [60, -100, 110]], ["dr_obsidian", 10, "stone", 0x1E1C26, [-60, -100, 100]], ["dr_sulphur", 10, "crystal", 0xE8D040, [-120, -150, 90]]],
errands: [
{ k: "fi_fuel", who: "A smith of the forges", n: "Embers for the forge", say: "The great forge eats emberstone. Four, from the ember fields, and you can work at it yourself.", need: { cr_ember: 4 }, gold: 20 },
{ k: "fi_windows", who: "A palace warden", n: "Obsidian for the windows", say: "The palace windows are cut from obsidian, polished thin. Five pieces, please; the black ones shine best.", need: { dr_obsidian: 5 }, gold: 18 },
{ k: "fi_nest", who: "The Phoenix", n: "A nest of embers", say: "Every five hundred years I build a nest of embers and spice, and rise again from it. I am early this time. Three emberstones and three sulphur crystals.", need: { cr_ember: 3, dr_sulphur: 3 }, gold: 22, gift: ["dr_phoenixfeather", 1] }
],
stall: { who: "A smith of the forges", n: "The forge-side stall", goods: [["dr_forgebread", 4], ["dr_springwater", 2], ["dr_arrowhead", 15]] },
forge: { who: "A smith of the forges", station: "emberforge" },
games: [
{ k: "fi_dash", t: "course", who: "A palace warden", n: "The Ember Dash", say: "Over the lava bridge to the palace, round by the forges and back: through every ring, and don't stop on the hot ground.", pts: [[0, -10], [0, -30], [0, -62], [0, -90], [-40, -64], [-76, -70], [-30, -48], [40, -26], [70, -12]], gold: 12 }
],
lesson: "fi" },
stars: { name: "Among the Stars",
gather: [["dr_meteorite", 8, "stone", 0x5A4A40, [0, -60, 160]], ["dr_starlight", 12, "orb", 0xFFF0C0, [-60, -40, 120]], ["dr_cometice", 10, "crystal", 0xBFE0FF, [60, -40, 120]]],
errands: [
{ k: "st_samples", who: "The astronomer", n: "Samples for the lab", say: "Three meteorite fragments for the spectrometer, please. Each one is older than the Earth.", need: { dr_meteorite: 3 }, gold: 18, gift: ["dr_starchart", 1] },
{ k: "st_fuel", who: "A shuttle pilot", n: "Ice for the tanks", say: "Melt comet ice and split it, and you have water, air and rocket fuel. Six chunks.", need: { dr_cometice: 6 }, gold: 14, gift: ["dr_teapouch", 2] },
{ k: "st_light", who: "The astronomer", n: "Light for the spectrometer", say: "Starlight split into its colours tells us what a star is made of. Five bottles.", need: { dr_starlight: 5 }, gold: 15 }
],
stall: { who: "A shuttle pilot", n: "The pilot's locker", goods: [["dr_spaceicecream", 3], ["dr_teapouch", 3], ["dr_starchart", 12], ["dr_telescope", 40]] },
games: [
{ k: "st_pairs", t: "match", who: "The astronomer", n: "Stars and their constellations", say: "Match each bright star to the constellation it shines in.", gold: 10, pairs: [["Sirius", "Canis Major"], ["Betelgeuse", "Orion"], ["Polaris", "Ursa Minor"], ["Vega", "Lyra"], ["Antares", "Scorpius"], ["Aldebaran", "Taurus"]] },
{ k: "st_quiz", t: "quiz", who: "The astronomer", n: "The astronomer's sky quiz", say: "Three questions about the real sky.", gold: 10, qs: [
["How long does sunlight take to reach the Earth?", "About 8 minutes", "About 8 seconds", "About 8 hours"],
["What is the nearest star after the Sun?", "Proxima Centauri", "Polaris", "Sirius"],
["What is a light year?", "How far light travels in a year", "How long a star lives", "A year on another planet"],
["What is the Milky Way?", "Our own galaxy", "A comet's tail", "A cloud in the Earth's air"],
["Why do stars twinkle?", "The Earth's air bends their light", "They flash on and off", "They spin very fast"],
["What colour are the hottest stars?", "Blue", "Red", "Yellow"]
] }
],
lesson: "st" },
wasteland: { name: "the Wasteland",
gather: [["cr_parts", 6, "scrap", 0x7A7268, [60, -120, 90]], ["dr_seedpod", 10, "pod", 0x9A8A4A, [-40, -60, 120]], ["dr_battery", 8, "scrap", 0x4A5A3A, [100, -60, 90]]],
errands: [
{ k: "wa_seeds", who: "Rook the trader", n: "Seeds are worth most", say: "Wild seed pods, five of them. Every seed planted in Haven is a meal next year.", need: { dr_seedpod: 5 }, gold: 18 },
{ k: "wa_stove", who: "The soup cook", n: "Parts for a new stove", say: "The old stove's on its last legs. Two lots of machine parts and I can build a better one.", need: { cr_parts: 2 }, gold: 24, gift: ["dr_beansoup", 2] },
{ k: "wa_radio", who: "The lookout", n: "Batteries for recycling", say: "Spent batteries leak if they're left in the ground. Bring me three; we strip them and keep the good metal.", need: { dr_battery: 3 }, gold: 14, gift: ["dr_canlantern", 1] }
],
stall: { who: "Rook the trader", n: "Haven market", goods: [["dr_beansoup", 3], ["dr_filtered", 2], ["dr_canlantern", 10], ["dr_scrapflower", 14]] },
games: [
{ k: "wa_pipes", t: "light", who: "The soup cook", n: "Mend the water pipes", say: "Six valves on the water line have stuck. Walk to each and turn it, before the tank runs dry.", count: 6, secs: 300, col: 0x8AD0FF, what: "valve", area: [0, -60, 130], gold: 12 }
],
lesson: "wa" },
desert: { name: "the Endless Desert",
gather: [["dr_dates", 10, "dates", 0x6A3A1A, [34, -140, 24]], ["dr_desertrose", 8, "crystal", 0xD8B890, [60, 60, 140]], ["dr_potsherd", 10, "stone", 0xB0704A, [-100, -60, 110]]],
errands: [
{ k: "ds_dates", who: "The water-seller", n: "Dates for the travellers", say: "Every traveller gets water and a handful of dates. Eight dates from the palms round the pool.", need: { dr_dates: 8 }, gold: 14 },
{ k: "ds_roses", who: "The caravan leader", n: "Desert roses to trade", say: "Desert roses sell well in the cities. Four, and you'll have a share of the profit.", need: { dr_desertrose: 4 }, gold: 18, gift: ["dr_mintea", 2] },
{ k: "ds_pot", who: "A spice merchant", n: "Shards for a mosaic", say: "Old pottery shards make the finest mosaics. Five for my shop's new table.", need: { dr_potsherd: 5 }, gold: 15, gift: ["dr_flatbread", 1] }
],
stall: { who: "A spice merchant", n: "The oasis bazaar", goods: [["dr_mintea", 3], ["dr_flatbread", 4], ["dr_saffron", 30], ["dr_brasslamp", 35]] },
games: [
{ k: "ds_riddles", t: "quiz", who: "The Sphinx", n: "The Sphinx's riddles", say: "Answer three riddles and pass. The old riddle of the four legs I will not ask: everyone knows it now.", gold: 12, qs: [
["What gets wetter the more it dries?", "A towel", "The sand", "A river"],
["I have keys but open no locks, space but no room. What am I?", "A keyboard", "A pyramid", "A map"],
["What has a neck but no head?", "A bottle", "A camel", "A sphinx"],
["The one who makes it sells it; the one who buys it never uses it; the one who uses it never sees it. What is it?", "A coffin", "A lamp", "A tent"],
["What comes once in a minute, twice in a moment, but never in a thousand years?", "The letter M", "A sandstorm", "A comet"],
["What can fill a room but takes up no space?", "Light", "Sand", "Silence"]
] },
{ k: "ds_caravan", t: "course", who: "The caravan leader", n: "The Caravan Run", say: "Run ahead of the caravan to the Sphinx and mark the way, before the heat of the day.", pts: [[-40, -50], [-80, -70], [-100, -110], [-116, -150], [-130, -190], [-146, -212]], gold: 12 }
],
lesson: "ds",
talk: [[-150, -226, 7, "The Sphinx", "the Sphinx who guards the way to the pyramid: a great lion with a human face, who loves riddles and is kinder than the old stories say", "*opens one great eye* Few come so far across the sand. Answer my riddles and pass; get one wrong, and you may simply try again."]] },
station: { name: "the Orbital",
gather: [["dr_bolt", 12, "scrap", 0x9AA0A8, [0, -60, 120]], ["dr_solarcell", 8, "tile", 0x2A3A6A, [100, 10, 60]], ["dr_microgreens", 8, "herb", 0x6AB04A, [-60, -80, 50]]],
errands: [
{ k: "or_bolts", who: "The station commander", n: "Tighten up the station", say: "Bolts work loose and roll under everything. Eight, please, before one ends up in an air filter.", need: { dr_bolt: 8 }, gold: 14, gift: ["dr_patch", 1] },
{ k: "or_cells", who: "A hangar technician", n: "Cells for the shuttle", say: "Four spare solar cells from the array, and the shuttle's ready to fly.", need: { dr_solarcell: 4 }, gold: 18 },
{ k: "or_greens", who: "The galley cook", n: "Greens for the galley", say: "Fresh greens are the best thing you can eat up here. Six trays' worth from the grow-racks.", need: { dr_microgreens: 6 }, gold: 12, gift: ["dr_galleystew", 2] }
],
stall: { who: "The galley cook", n: "The galley", goods: [["dr_galleystew", 4], ["dr_juicepouch", 3], ["dr_patch", 8], ["dr_stationmodel", 30]] },
forge: { who: "A hangar technician", station: "engineer" },
games: [
{ k: "or_drill", t: "course", who: "The station commander", n: "The Hangar Drill", say: "A drill: every module, quick as you can. Through every ring.", pts: [[0, -10], [0, -40], [-40, -52], [-80, -52], [-40, -70], [0, -80], [40, -70], [80, -52], [40, -46]], gold: 12 }
],
lesson: "or",
add: function (P) { return __ZC(322, 4, this, arguments, new.target); } },
future: { name: "the City to Come", board: [9, -2, -0.3],
gather: [["dr_roofherbs", 10, "herb", 0x5AA040, [0, -60, 140]], ["dr_recycling", 12, "scrap", 0x6A9A5A, [0, -60, 130]], ["dr_led", 8, "orb", 0xE8F4FF, [0, -60, 120]]],
errands: [
{ k: "fu_herbs", who: "A coffee-cart owner", n: "Herbs for the cart", say: "Fresh mint for the iced teas. Six bunches of rooftop herbs, if you find them.", need: { dr_roofherbs: 6 }, gold: 12, gift: ["dr_flatwhite", 2] },
{ k: "fu_recycle", who: "A city guide", n: "The recycling round", say: "Eight lots of sorted recycling to the depot. Nothing here goes to waste.", need: { dr_recycling: 8 }, gold: 14, gift: ["dr_toytram", 1] },
{ k: "fu_lights", who: "A city guide", n: "Lights for the tram stop", say: "Five spare LEDs and the tram stop will shine all night on a fraction of the power.", need: { dr_led: 5 }, gold: 15 }
],
stall: { who: "A coffee-cart owner", n: "The coffee cart", goods: [["dr_flatwhite", 3], ["dr_strawberries", 3], ["dr_cityprint", 15], ["dr_toytram", 20]] },
games: [
{ k: "fu_tram", t: "course", who: "A city guide", n: "The Tram Dash", say: "Race the tram along both avenues and back to the fountain. Through every ring.", pts: [[0, -10], [0, -40], [-50, -60], [-110, -60], [-50, -66], [0, -90], [50, -66], [110, -60], [50, -54]], gold: 12 },
{ k: "fu_quiz", t: "quiz", who: "A city guide", n: "The city guide's quiz", say: "Three questions about how cities are changing.", gold: 10, qs: [
["What does a vertical farm do?", "Grows food indoors in stacked layers", "Farms on a cliff", "Grows only trees"],
["Why do many cities add trams again?", "One tram carries as many people as many cars", "Trams are faster than planes", "They need no power"],
["What does a solar panel turn into electricity?", "Sunlight", "Wind", "Rain"],
["Why plant trees along streets?", "Shade and cooler air", "To slow the trams", "To block the signals"],
["Which uses less power for the same light?", "An LED", "An old filament bulb", "A candle"],
["What is a green roof?", "A roof covered with growing plants", "A roof painted green", "A roof made of glass"]
] }
],
lesson: "fu" },
templerow: { name: "Temple Row",
gather: [["dr_petals", 12, "bloom", 0xF2B8C8, [0, -140, 110]], ["dr_candle", 8, "candle", 0xE8DCC0, [0, -100, 70]], ["dr_tablet", 6, "tablet", 0xB08A60, [-40, -250, 40]]],
errands: [
{ k: "tr_tablets", who: "The scribe of the ziggurat", n: "Tablets for the archive", say: "Broken tablets turn up all round the ziggurat. Three fragments and I'll press your name into clay in return.", need: { dr_tablet: 3 }, gold: 18, gift: ["dr_cuneiform", 1] },
{ k: "tr_petals", who: "The verger", n: "Petals for the path", say: "For the festival we strew the path with petals. Eight handfuls would do the whole length of the Row.", need: { dr_petals: 8 }, gold: 12 },
{ k: "tr_candles", who: "The shrine maiden", n: "Candles for the lanterns", say: "The paper lanterns at the torii want new candles. Five, please.", need: { dr_candle: 5 }, gold: 14 }
],
stall: { who: "The pilgrims' stall-keeper", n: "The pilgrims' stall", goods: [["dr_festsweets", 3], ["dr_rowwater", 2], ["dr_rowguide", 10], ["dr_bell", 12]] },
games: [
{ k: "tr_bells", t: "light", who: "The keeper of the Row", n: "Ring the bells of the Row", say: "Every house on the Row has a bell by its door. Walk to each and ring it, before the evening's done.", count: 8, secs: 360, col: 0xFFD890, what: "bell", fixed: [[-24, -34], [-24, -82], [-24, -198], [-26, -246], [22, -36], [24, -86], [24, -202], [28, -248]], near: 3.5, gold: 12 }
],
lesson: "tr",
add: function (P) { return __ZC(322, 5, this, arguments, new.target); } },
hall: { name: "the Hall of Doors",
gather: [],
errands: [],
games: [],
lesson: "ha" }
};
var DQ_ORDER = ["underworld", "heavens", "depths", "faerie", "void", "mirror", "dead", "frozen", "elsewhere", "fire", "stars", "wasteland", "desert", "station", "future", "templerow"];
var DQ_LESSONS = [
{ k: "ha", n: 1, at: "hall", who: "The Registrar of Doors", title: "Maps and finding your way",
real: "People have drawn maps for thousands of years. A clay tablet from Babylon, about 2,600 years old, shows the world as a disc ringed by an ocean. Today satellites fix where you are to within a few metres.",
science: "A compass needle is a small magnet: it lines up with the Earth's magnetic field and points roughly north. Satellite navigation works by timing signals from several satellites at once; from how long each signal took, the receiver works out where it must be.",
word: ["Cartographer", "a person who makes maps."],
tryit: "Stand by the map of everywhere and pick a door. Before you walk to it, guess how many steps it is; then count.",
quiz: [["What does a compass needle line up with?", "The Earth's magnetic field", "The Sun", "The nearest mountain"], ["What is a cartographer?", "A maker of maps", "A builder of carts", "A keeper of doors"]] },
{ k: "uw", n: 2, at: "underworld", who: "Hades", title: "The Greek Underworld: myth and meaning",
real: "The ancient Greeks told of a land of the dead ruled by Hades and Persephone. Its rivers, its ferryman and its three-headed dog appear in Homer's Odyssey (about 2,700 years old) and in many later poems and plays.",
science: "Myths are not science, but they are evidence: they tell historians what people believed, feared and hoped. Archaeologists have found Greek graves with a coin placed with the dead, just as the stories of Charon's fare describe.",
word: ["Myth", "a traditional story that explains how the world is, or why people do what they do."],
tryit: "Walk the road from Charon's jetty to the Hall of Judgement and find the river, the dog and the three judges from the story.",
quiz: [["What did Greek families sometimes place with the dead, for the ferryman?", "A coin", "A key", "A loaf of bread"], ["In which ancient poem do the dead walk a meadow of asphodel?", "The Odyssey", "Beowulf", "The Epic of Gilgamesh"]] },
{ k: "hv", n: 3, at: "heavens", who: "The Archivist", title: "Clouds and the sky",
real: "Clouds are named by their shape and height: cumulus are the heaped fair-weather clouds, stratus are flat grey sheets, cirrus are high wisps of ice. The names were given by Luke Howard, an English chemist, in 1802.",
science: "A cloud is billions of tiny water droplets or ice crystals, so small they float. The sky looks blue because air scatters blue sunlight more than red; at sunset the light passes through more air, the blue is scattered away, and the reds are left.",
word: ["Cumulus", "a heaped, puffy cloud (Latin for heap)."],
tryit: "Look at the cloud banks round the gate. Are they heaped like cumulus, or flat like stratus?",
quiz: [["Why does the daytime sky look blue?", "Air scatters blue light most", "The sea reflects onto it", "Space is blue"], ["What are high, wispy cirrus clouds made of?", "Ice crystals", "Smoke", "Steam from the sea"]] },
{ k: "dp", n: 4, at: "depths", who: "A diver from the surface", title: "The zones of the deep ocean",
real: "Oceanographers divide the sea by depth. The sunlit zone is the top 200 metres. The twilight zone goes down to about 1,000 metres. Below that is the midnight zone, where no sunlight ever reaches, and the deepest trenches go to nearly 11,000 metres.",
science: "Water absorbs light, red first and blue last, so the deep sea looks blue and then black. Pressure rises by about one atmosphere every ten metres down. Many deep animals make their own light, which is called bioluminescence.",
word: ["Bioluminescence", "light made by a living thing, as by fireflies and many deep-sea fish."],
tryit: "Look for the creatures that glow, and for which colours fade first as you look into the distance.",
quiz: [["About how deep is the sunlit zone?", "200 metres", "20 metres", "2,000 metres"], ["What is bioluminescence?", "Light made by living things", "Light reflected from the Moon", "A kind of coral"]] },
{ k: "fa", n: 5, at: "faerie", who: "A gnome of the village", title: "Fairy rings and the fungi",
real: "Fairy rings are real: circles of mushrooms in grass, sometimes many metres across. In old stories they were where fairies danced, and stepping inside one could trap you in fairyland.",
science: "A mushroom is only the fruit of a fungus. The fungus itself is a web of fine threads in the soil, called mycelium. It grows outward from where it began, using up the food as it goes, so the mushrooms come up round its edge in a ring that widens year by year.",
word: ["Mycelium", "the web of thread-like roots that makes up the main body of a fungus."],
tryit: "Find the fairy rings by Titania's glade. Which way do you think each one is growing?",
quiz: [["Why do fairy rings form a circle?", "The fungus grows outward from its start", "Fairies plant them", "Rain falls in rings"], ["What is mycelium?", "A fungus's web of threads in the soil", "A kind of fairy", "The cap of a mushroom"]] },
{ k: "vo", n: 6, at: "void", who: "The Lamplighter", title: "Light, and the dark between the stars",
real: "Space looks black even though the Sun shines in it, because there is almost nothing there to scatter the light towards your eyes. Astronauts see a black sky at midday.",
science: "Light travels at about 300,000 kilometres a second, and needs no air to travel through. Sound does need something to travel through, so space is silent. Between the stars there is about one atom in every cubic centimetre.",
word: ["Vacuum", "a space with almost nothing in it, not even air."],
tryit: "Look at the lighthouse beam. In real empty space, you would not see the beam itself, only the lamp and whatever it lands on.",
quiz: [["Why is space black even near the Sun?", "There is almost nothing to scatter light", "The Sun is too small", "Space is painted black"], ["Can sound travel through empty space?", "No, it needs something to travel through", "Yes, faster than on Earth", "Only at night"]] },
{ k: "mi", n: 7, at: "mirror", who: "The White Queen", title: "Mirrors and symmetry",
real: "Glass mirrors backed with a thin coat of metal were made in Venice from the 1500s. Before that, people used polished bronze, silver or stone such as obsidian.",
science: "A mirror reflects light at the same angle it arrives. It does not really swap left and right: it swaps front and back. A shape with mirror symmetry looks the same on both sides of a line, like a butterfly.",
word: ["Symmetry", "when one half of a thing is a mirror image of the other."],
tryit: "Stand between the town and its mirror image. Raise your right hand: which hand does the reflection raise?",
quiz: [["When light hits a mirror, it bounces off...", "At the same angle it arrived", "Straight up", "In every direction equally"], ["What did people use as mirrors before glass ones?", "Polished metal or stone", "Ice", "Paper"]] },
{ k: "de", n: 8, at: "dead", who: "The Lantern Keeper", title: "The Day of the Dead",
real: "Día de Muertos is kept in Mexico on 1 and 2 November. Families build ofrendas, home altars, with photographs, candles, food and orange marigolds, to welcome the souls of loved ones back for a visit. It is a happy, loving time, not a sad one. UNESCO lists it as part of the world's cultural heritage.",
science: "The tradition joins customs of the Aztec and other peoples of Mexico with Catholic All Saints' and All Souls' Days. Marigolds were chosen for their bright colour and strong scent, which are said to guide the souls home.",
word: ["Ofrenda", "an altar of offerings, built at home or at a grave, to welcome the dead."],
tryit: "Find an ofrenda in the lantern town and name four things on it.",
quiz: [["What is an ofrenda?", "A home altar of offerings", "A kind of bread", "A song"], ["Which flower guides the souls home?", "The marigold", "The rose", "The tulip"]] },
{ k: "fr", n: 9, at: "frozen", who: "The Steward of the Ice Palace", title: "Ice and snow",
real: "The coldest temperature measured on Earth's surface is about −89 °C, at Vostok Station in Antarctica in 1983. People of the Arctic built igloos from blocks of snow as winter shelters.",
science: "Water is unusual: it expands when it freezes, so ice floats. Snow crystals have six sides because water molecules lock together in a six-sided pattern as they freeze. Snow is full of trapped air, which is why an igloo keeps warmth in.",
word: ["Insulator", "something that slows heat from passing through it, like snow, wool or feathers."],
tryit: "Walk out onto the frozen lake. Why does the ice float on the water below it rather than sinking?",
quiz: [["Why does ice float?", "Water expands when it freezes", "Ice is full of salt", "The cold pushes it up"], ["Why does an igloo keep warm inside?", "Snow traps air and slows heat loss", "It has a fire in the walls", "Ice gives off heat"]] },
{ k: "el", n: 10, at: "elsewhere", who: "The dome keeper", title: "Planets round other stars",
real: "Astronomers have confirmed more than 5,000 planets round other stars since the first one round a Sun-like star was found in 1995 (51 Pegasi b). Some are giant gas worlds; some are rocky and about the size of the Earth.",
science: "Most are found by the transit method: when a planet passes in front of its star, the star's light dips a tiny amount. The habitable zone is the distance from a star where water could stay liquid on a planet's surface: not too hot, not too cold.",
word: ["Exoplanet", "a planet that goes round a star other than our Sun."],
tryit: "Look at the twin moons. On a planet with two moons, how many different tides might there be?",
quiz: [["How are most exoplanets found?", "By the dip in light as they cross their star", "By landing on them", "By hearing them"], ["What is a star's habitable zone?", "Where water could stay liquid on a planet", "Where its light is brightest", "The star's own surface"]] },
{ k: "fi", n: 11, at: "fire", who: "A smith of the forges", title: "Volcanoes, lava and the forge",
real: "About 1,350 volcanoes on land have erupted in the last 10,000 years. Hawaii's volcanoes pour out runny lava; others, like Mount St Helens in 1980, explode.",
science: "Lava is molten rock, usually 700 to 1,200 °C. Runny lava lets gas escape gently; thick, sticky lava traps gas until it bursts. Obsidian forms when lava cools so fast that no crystals can grow. A smith's forge must reach about 1,200 °C to make iron soft enough to shape.",
word: ["Magma", "molten rock while it is still underground; once it comes out, it is called lava."],
tryit: "Look at the lava river from the bridge. Is it the runny kind or the thick kind?",
quiz: [["What is obsidian?", "Volcanic glass from lava that cooled fast", "A kind of coal", "Iron from a forge"], ["What is magma called once it reaches the surface?", "Lava", "Ash", "Basalt dust"]] },
{ k: "st", n: 12, at: "stars", who: "The astronomer", title: "Stars and light years",
real: "Every star you see at night is a sun, many much bigger than ours. The nearest, after the Sun, is Proxima Centauri, about 4.2 light years away. The Milky Way is our own galaxy, seen edge-on from inside.",
science: "A light year is how far light travels in a year: about 9.5 million million kilometres. When you look at a star, you see light that left it long ago. A star's colour shows how hot it is: red stars are coolest, blue the hottest.",
word: ["Light year", "the distance light travels in one year; a measure of distance, not time."],
tryit: "Find the brightest star in the sky here. If its light took a hundred years to reach you, what was happening on Earth when it set out?",
quiz: [["What is a light year?", "A distance", "A length of time", "A unit of brightness"], ["What colour are the hottest stars?", "Blue", "Red", "Orange"]] },
{ k: "wa", n: 13, at: "wasteland", who: "The soup cook", title: "Clean water and recycling",
real: "About one person in four in the world still lacks safely managed drinking water at home. Simple filters of sand, gravel and charcoal, followed by boiling, can make water much safer.",
science: "Sand and gravel strain out dirt; charcoal soaks up some chemicals and tastes; boiling kills germs. Recycling metal saves energy: making aluminium from old cans uses about 5 per cent of the energy of making it new from ore.",
word: ["Filtration", "cleaning a liquid by passing it through something that holds back what you don't want."],
tryit: "Find Haven's water tower. Trace where the water goes from it.",
quiz: [["Which step in cleaning water kills germs?", "Boiling", "Pouring through sand", "Letting it stand"], ["Recycling an aluminium can saves about how much of the energy of making a new one?", "About 95 per cent", "About 5 per cent", "None"]] },
{ k: "ds", n: 14, at: "desert", who: "The caravan leader", title: "Deserts and how life copes",
real: "A desert is a place with very little rain, under about 250 mm a year. Not all are hot: Antarctica is the largest desert of all. The Sahara is the largest hot desert, about 9 million square kilometres.",
science: "Desert plants store water and lose little: cacti have spines instead of leaves. Camels do not store water in their humps; the humps are fat. They can go days without drinking because they lose very little water and can drink about 100 litres at once.",
word: ["Oasis", "a place in a desert where underground water comes to the surface."],
tryit: "Look at the oasis. Where does its water come from, when it has not rained for months?",
quiz: [["What is in a camel's hump?", "Fat", "Water", "Milk"], ["What makes a place a desert?", "Very little rain", "Very high heat", "Sand everywhere"]] },
{ k: "or", n: 15, at: "station", who: "The station commander", title: "Orbits: falling forever",
real: "The International Space Station circles the Earth about 400 km up, at about 28,000 km an hour, once every 92 minutes or so. Its crews see about sixteen sunrises a day.",
science: "Gravity at the station's height is still about 90 per cent as strong as on the ground. Astronauts float because the station and everyone in it are falling together, all the time; they move sideways so fast that they keep missing the Earth. That is what an orbit is.",
word: ["Orbit", "the curved path of something falling round a planet or star without ever hitting it."],
tryit: "Drop something on the deck. On the real station it would float beside you; why?",
quiz: [["Why do astronauts float on the space station?", "They are falling together with the station", "There is no gravity there", "The station spins them"], ["About how long does the space station take to go once round the Earth?", "About 90 minutes", "About a day", "About a month"]] },
{ k: "fu", n: 16, at: "future", who: "A city guide", title: "Cities of the future",
real: "More than half the world's people live in cities, and by 2050 it is expected to be about two in three. Cities are trying vertical farms, trams, green roofs and solar power.",
science: "Trees and green roofs cool a street: leaves give off water, which takes heat with it as it evaporates. A full tram carries as many people as dozens of cars in a fraction of the road. LEDs give the same light as old bulbs for a fraction of the power.",
word: ["Urban heat island", "a city that is warmer than the country round it, because stone and tarmac soak up the Sun's heat."],
tryit: "Look up at the towers. How many have plants on their roofs?",
quiz: [["Why do trees cool a street?", "Their leaves give off water that takes heat away", "They block the wind", "They make shade only at night"], ["About how many of the world's people live in cities now?", "More than half", "About one in ten", "Nearly everyone"]] },
{ k: "tr", n: 17, at: "templerow", who: "The keeper of the Row", title: "Houses of worship, and how they are built",
real: "People have built places to honour what they hold sacred for more than 11,000 years: Göbekli Tepe in Turkey is older than farming. A Greek temple, a church, a mosque, a Shinto shrine and a stupa are each laid out for what happens inside.",
science: "Each is designed around its use. A traditional church points east, toward the sunrise. A mosque's mihrab shows the direction of Mecca. A torii gate marks where a Shinto shrine's grounds begin. A stupa is walked round clockwise. Big stone domes and towers had to be built so their weight pushes down, not out.",
word: ["Orientation", "the direction a building faces; many sacred buildings are lined up with the Sun or a holy place."],
tryit: "Walk the Row. Which way does each house face, and why?",
quiz: [["What does a torii gate mark?", "Where a Shinto shrine's grounds begin", "The way out of a city", "The top of a pagoda"], ["Which way does a traditional church usually point?", "East, toward the sunrise", "North", "Toward the nearest river"]] }
];
var DQ_LESSON = {};
DQ_LESSONS.forEach(function (l) { DQ_LESSON[l.k] = l; });
var DQ = { g: null, rid: null, kind: null, spots: [], picked: {}, busy: false, game: null, t: 0, chk: 0, plan: null, lesson: { cur: null, ans: {}, t0: 0, msg: "" }, guide: null, day: { gold: 0, cap: null }, pass: null };
function dqSigned() { return typeof signedIn === "function" && signedIn(); }
function dqKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function dqLand(k) { return DQ_LANDS[k || DQ.kind] || null; }
function dqName(k) { var c = DQ_ITEM[k]; return c ? c.n : k; }
function dqIcon(k) { var c = DQ_ITEM[k]; return c ? c.e : "✦"; }
function dqLower(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
function dqBtn(name, label, sub) { return worldBtn(name, label, sub).replace("<div data-w=", "<div role='button' data-w="); }
function dqHead(t, col) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (col || "#FFE7B0") + "'>" + t + "</div>"; }
function dqSaySoft(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist|schema cache/i.test(m) ? "This opens soon. What you gather is kept on this device until then." : esc(m); }
function dqRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function dqTone(f, s) { if (typeof playTone === "function")
try {
playTone(f, s);
}
catch (e) { } }
function dqBasket() { try {
var o = JSON.parse(localStorage.getItem("dq_basket") || "{}");
return (o && typeof o === "object") ? o : {};
}
catch (e) {
return {};
} }
function dqBasketSave(b) { try {
localStorage.setItem("dq_basket", JSON.stringify(b));
}
catch (e) { } }
function dqHave(k) {
if (dqSigned()) {
var r = (typeof myStock !== "undefined" ? myStock : []).filter(function (s) { return s.kind === k; })[0];
return r ? (+r.amount || 0) : 0;
}
return +dqBasket()[k] || 0;
}
function dqBasketAdd(k, n) { var b = dqBasket(); b[k] = Math.max(0, (+b[k] || 0) + n); if (!b[k])
delete b[k]; dqBasketSave(b); }
function dqReload() { return (typeof loadStock === "function" ? loadStock() : Promise.resolve()).then(function () { if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } }); }
function dqPickedLoad() { try {
var o = JSON.parse(localStorage.getItem("dq_picked") || "{}"), now = Date.now();
Object.keys(o).forEach(function (k) { if (o[k] > now)
DQ.picked[k] = o[k]; });
}
catch (e) { } }
function dqPickedSave() { try {
localStorage.setItem("dq_picked", JSON.stringify(DQ.picked));
}
catch (e) { } }
dqPickedLoad();
function dqLocal() { var d = (typeof dreamer === "function") ? dreamer() : null; if (!d)
return { stamps: {}, done: {} }; if (!d.dq || typeof d.dq !== "object")
d.dq = { stamps: {}, done: {} }; if (!d.dq.stamps)
d.dq.stamps = {}; if (!d.dq.done)
d.dq.done = {}; return d.dq; }
function dqToday() { var t = new Date(); return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate(); }
function dqDoneToday(key) { var L = dqLocal(); return L.done[key] === dqToday(); }
function dqMarkDone(key, land) { var L = dqLocal(); L.done[key] = dqToday(); if (land && DQ_LANDS[land] && land !== "hall")
L.stamps[land] = L.stamps[land] || dqToday(); if (typeof save === "function")
try {
save();
}
catch (e) { } }
function dqStamps() {
var L = dqLocal(), out = {};
Object.keys(L.stamps).forEach(function (k) { out[k] = 1; });
if (DQ.pass && DQ.pass.stamps)
DQ.pass.stamps.forEach(function (k) { out[k] = 1; });
return out;
}
function dqPassLoad() {
if (!dqSigned())
return Promise.resolve(null);
return dqRpc("dream_passport", { p_claim: false }).then(function (o) { if (o && o.ok !== false)
DQ.pass = o; return o; }).catch(function () { return null; });
}
function dqIsMine(kind) { return /^dr_/.test(kind) && !!DQ_ITEM[kind]; }
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var D = (typeof BKP !== "undefined" && BKP.d) || {}, all = D.stock, mine = [];
if (Array.isArray(all)) {
mine = all.filter(function (s) { return (+s.amount || 0) > 0 && dqIsMine(s.kind); });
D.stock = all.filter(function (s) { return !dqIsMine(s.kind); });
}
var h;
try {
h = bh.apply(this, arguments);
}
finally {
if (Array.isArray(all))
D.stock = all;
}
var B = dqBasket(), loc = Object.keys(B).filter(function (k) { return B[k] > 0 && DQ_ITEM[k]; }).map(function (k) { return { kind: k, amount: B[k], local: 1 }; });
mine = dqSigned() ? mine.concat(loc) : loc;
var n = dqLessonCount(), x = "";
if (mine.length) {
x += bkpHead("🚪 From the dream lands") + "<div style='color:var(--dim);font-size:12px'>Gathered, bought or given in the dream lands. Eat and drink the food, hand things in for errands, sell them to the city, or keep them." + (dqSigned() ? "" : " Kept on this device: sign in and they go to your backpack.") + "</div>";
mine.forEach(function (s) {
var c = DQ_ITEM[s.kind], b = "";
if (!s.local && (c.fd || c.dr))
b += ' <button class="btn" data-dqb="eat:' + esc(s.kind) + '">' + (c.fd ? "Eat" : "Drink") + '</button>';
if (!s.local)
b += ' <button class="btn" data-dqb="sell:' + esc(s.kind) + '">Sell one (' + (+s.buys || c.b) + ')</button>';
x += bkpRow(c.e + " " + esc(c.n) + " " + bkpDim("× " + s.amount), b || bkpDim("on this device"));
});
}
var st = Object.keys(dqStamps()).length;
if (st || n)
x += bkpHead("📘 Dreamwalker's Passport") + bkpRow("Stamps", bkpDim(st + " of " + DQ_ORDER.length + " dream lands")) +
(n >= DQ_LESSONS.length ? bkpRow("🗺️ Certificate: <b>Dream Cartographer</b>", bkpDim("the Department of Education")) : (n ? bkpRow("🗺️ World Learning: the Dream Lands", bkpDim(n + " of " + DQ_LESSONS.length + " stamps")) : ""));
return h + x;
};
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-dqb]") : null;
if (!b)
return;
e.stopPropagation();
var v = b.getAttribute("data-dqb").split(":"), k = v[1];
var again = function () { if (typeof bkpLoad === "function")
bkpLoad(); };
if (v[0] === "eat")
dqEat(k, again);
else if (v[0] === "sell")
dqRpc("sell_stock", { p_kind: k, p_amount: 1 }).then(function (o) { setStatus(o === "ok" ? "<b>Sold to the city.</b>" : esc(String(o))); return dqReload(); }).then(again).catch(function (x) { setStatus(dqSaySoft(x)); });
}, true);
})();
function dqEat(k, after) { return __ZC(322, 6, this, arguments, new.target); }
(function () {
Object.keys(DQ_LANDS).forEach(function (k) {
var orig = LD_SETS[k];
if (typeof orig !== "function")
return;
LD_SETS[k] = function (P) {
orig(P);
var L = DQ_LANDS[k];
P.dqFrom = P.items.length;
try {
if (L.add)
L.add(P);
}
catch (e) {
if (window.console)
console.warn("dream-lands add:", k, e);
}
var B = L.board || [9, -14, -0.3];
P.sign(B[0], B[1], B[2], ["Things to do here", "Press E"], null, ["#1E2A3A", "#F2E2B0"]);
DQ.plan = P;
};
});
})();
function dqSolidHit(x, z, rad) { return __ZC(322, 7, this, arguments, new.target); }
function dqSegDist(px, pz, a, b) { var vx = b[0] - a[0], vz = b[1] - a[1], L = vx * vx + vz * vz, t = L ? Math.max(0, Math.min(1, ((px - a[0]) * vx + (pz - a[1]) * vz) / L)) : 0, dx = px - (a[0] + vx * t), dz = pz - (a[1] + vz * t); return Math.sqrt(dx * dx + dz * dz); }
function dqOnRibbon(x, z, type, pad) {
var P = DQ.plan;
if (!P)
return false;
for (var i = 0; i < P.items.length; i++) {
var it = P.items[i];
if (it.t !== type)
continue;
for (var j = 1; j < it.pts.length; j++)
if (dqSegDist(x, z, it.pts[j - 1], it.pts[j]) < it.w / 2 + pad)
return true;
}
return false;
}
var DQ_SOFT = /^(flowers|grass|glowflowers|lawn|field|snowfield|blossomground|leaffall|emberfield|dustbowl|dune|mistbank|cloudbank|shardfield|voidshards|wisps|bubbles|anemones|kelp|reeds|fairyring|rug|groundpad|citypad|teleportpad|landinglights|chessboard)$/;
var DQ_WALK = /^(frozenlake|pond|pool|koipond|reflectpool|moonpool|oasis|bridge|rainbowbridge|celestialstair|goldengate|bonegate|gate|torii|ringarch|stargate)$/;
function dqPieceHit(x, z, rad, road) { return __ZC(322, 8, this, arguments, new.target); }
function dqFree(x, z, rad, taken, wet, road) { return __ZC(322, 9, this, arguments, new.target); }
function dqHash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function dqGeoPiece(g, col, tx, ty, tz, rx, ry, sx, sy, sz) { return __ZC(322, 10, this, arguments, new.target); }
function dqMerge(list) { return __ZC(322, 11, this, arguments, new.target); }
function dqLook(look, col) { return __ZC(322, 12, this, arguments, new.target); }
function dqSpotsBuild(r, land, taken) { return __ZC(322, 13, this, arguments, new.target); }
function dqSpotShow(s, on) {
var o = new THREE.Matrix4();
if (on)
o.copy(s.m);
else
o.makeScale(0, 0, 0);
s.im.setMatrixAt(s.ii, o);
s.im.instanceMatrix.needsUpdate = true;
var p = s.pts.geometry.attributes.position;
p.array[s.pi * 3 + 1] = on ? s.y + 0.55 : -9999;
p.needsUpdate = true;
}
function dqSpotReady(s) { var t = DQ.picked[s.id]; return !t || t <= Date.now(); }
function dqSpotTalker(s) { return { x: s.x, z: s.z, r: 2.2, name: dqIcon(s.kind) + " " + dqName(s.kind), verb: "gather it", dq: { t: "spot", s: s } }; }
function dqBuild(r) { return __ZC(322, 14, this, arguments, new.target); }
function dqDrop() { return __ZC(322, 15, this, arguments, new.target); }
(function () {
var lb = ldBuild;
ldBuild = function (r) { DQ.plan = null; lb.apply(this, arguments); try {
if (LD.g && LD.rid === r.id)
dqBuild(r);
}
catch (e) {
if (window.console)
console.warn("dream-lands:", e);
} };
var ld = ldDrop;
ldDrop = function () { try {
dqDrop();
}
catch (e) { } return ld.apply(this, arguments); };
var lt = ldTick;
ldTick = function (dt) { lt.apply(this, arguments); try {
dqTick(dt);
}
catch (e) {
if (window.console)
console.warn("dream-lands tick:", e);
} };
var lu = ldUse;
ldUse = function (T) { if (T && dqUse(T))
return; return lu.apply(this, arguments); };
})();
function dqTick(dt) {
if (!LD.g || !DQ.kind || LD.rid !== DQ.rid)
return;
DQ.t += dt;
DQ.chk += dt;
if (DQ.guide && typeof guideTo !== "undefined" && !guideTo) {
DQ.guide = 0;
setStatus("<b>Here.</b> Look about you: it is close by.");
}
if (DQ.chk > 2) {
DQ.chk = 0;
DQ.spots.forEach(function (s) { if (s.gone && dqSpotReady(s)) {
s.gone = false;
dqSpotShow(s, true);
LD.talkers.push(dqSpotTalker(s));
} });
}
dqGameTick(dt);
}
function dqUse(T) {
if (T.dq) {
if (T.dq.t === "spot") {
dqGather(T.dq.s, T);
return true;
}
if (T.dq.t === "board") {
dqBoard();
return true;
}
if (T.dq.t === "game") {
dqGameUse(T.dq);
return true;
}
return true;
}
if (T.name && dqRoles(LD.kind, T.name).length) {
dqRoleCard(T);
return true;
}
return false;
}
function dqGather(s, T) { return __ZC(322, 16, this, arguments, new.target); }
function dqRoles(kind, who) { return __ZC(322, 17, this, arguments, new.target); }
function dqTalkFor(T) {
if (T.t)
return T.t;
var L = dqLand();
return ldWho(T.name, L ? L.name : "a dream land", "someone who lives here", "Hello, traveller.");
}
function dqRoleCard(T, msg) { return __ZC(322, 18, this, arguments, new.target); }
function dqNeedText(need) { return Object.keys(need).map(function (k) { return need[k] + " " + dqLower(dqName(k)); }).join(" and "); }
function dqCanErrand(e) { return Object.keys(e.need).every(function (k) { return dqHave(k) >= e.need[k]; }); }
function dqErrandCard(T, e, msg) { return __ZC(322, 19, this, arguments, new.target); }
function dqErrandDo(T, e) { return __ZC(322, 20, this, arguments, new.target); }
function dqShowNearest(kind) { return __ZC(322, 21, this, arguments, new.target); }
function dqStallCard(T, msg) { return __ZC(322, 22, this, arguments, new.target); }
function dqBuy(T, k) { return __ZC(322, 23, this, arguments, new.target); }
function dqSellCard(T, msg) { return __ZC(322, 24, this, arguments, new.target); }
function dqSell(T, k, n) { return __ZC(322, 25, this, arguments, new.target); }
function dqBoard() { return __ZC(322, 26, this, arguments, new.target); }
function dqGuideToWho(w) { return __ZC(322, 27, this, arguments, new.target); }
function dqLessonLog() { var st = (typeof eduStore === "function") ? eduStore() : {}; return st["world-dream"] || (st["world-dream"] = {}); }
function dqLessonDone(n) { return !!dqLessonLog()[n]; }
function dqLessonCount() { return DQ_LESSONS.filter(function (l) { return dqLessonDone(l.n); }).length; }
function dqLessonOpt(l, k) { var q = l.quiz[k], o = [q[1], q[2], q[3]], r = (l.n * 5 + k * 2) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function dqLessonCard(l) { return __ZC(322, 28, this, arguments, new.target); }
function dqLessonCheck(l) { return __ZC(322, 29, this, arguments, new.target); }
function dqCourseCard() { return __ZC(322, 30, this, arguments, new.target); }
(function () {
if (typeof eduReportHtml === "function") {
var er = eduReportHtml;
eduReportHtml = function () { var h = er.apply(this, arguments); return h + '<div style="margin-top:6px">World Learning: the Dream Lands, through the Hall of Doors, ' + dqLessonCount() + ' of ' + DQ_LESSONS.length + ' lessons learned.' + (dqLessonCount() >= DQ_LESSONS.length ? ' <b style="color:#2A4A8A">Dream Cartographer.</b>' : '') + '</div>'; };
}
if (typeof eduWorldCard === "function") {
var ew = eduWorldCard;
eduWorldCard = function () {
ew.apply(this, arguments);
try {
if (!EDU.lesson)
return;
var box = '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>The Dream Lands</b> · through the Hall of Doors<br>Seventeen lessons, one with the Registrar of Doors in the Hall and one in each dream land: maps, myths, clouds, the deep ocean, fungi, light, mirrors, the Day of the Dead, ice, exoplanets, volcanoes, stars, clean water, deserts, orbits, cities and houses of worship. Two questions each for a stamp; all seventeen make a Dream Cartographer.<br><span style="color:#2A4A8A">You have learned ' + dqLessonCount() + ' of ' + DQ_LESSONS.length + '.</span></div>';
var i = EDU.lesson.html.indexOf('<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>Already teaching');
EDU.lesson.html = i >= 0 ? EDU.lesson.html.slice(0, i) + box + EDU.lesson.html.slice(i) : EDU.lesson.html + box;
if (typeof eduLessonPaintHtml === "function")
eduLessonPaintHtml();
}
catch (e) { }
};
}
})();
function dqGameKindText(g) { return { course: "a run through rings", light: "find and light them all", quiz: "three questions", match: "a memory game" }[g.t] || ""; }
function dqGamesBuild(r, land, taken) { return __ZC(322, 31, this, arguments, new.target); }
function dqNudge(x, z, taken, rad) { return __ZC(322, 32, this, arguments, new.target); }
function dqGamesDrop() { DQ.places = {}; }
function dqGameIntro(T, g, msg) { return __ZC(322, 33, this, arguments, new.target); }
function dqGameStart(T, g) { return __ZC(322, 34, this, arguments, new.target); }
function dqGameEnd(win, quiet) { return __ZC(322, 35, this, arguments, new.target); }
function dqArrow(x, z) { return __ZC(322, 36, this, arguments, new.target); }
function dqClock(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
function dqNear(x, z, r) { var P = camera.position; return Math.hypot(LD.ox + x - P.x, LD.oz + z - P.z) < r; }
function dqCourseTime(g) {
var pts = DQ.places[g.k] || [], d = 0, P = camera.position, lx = P.x - LD.ox, lz = P.z - LD.oz;
if (pts.length)
d += Math.hypot(pts[0].x - lx, pts[0].z - lz);
for (var i = 1; i < pts.length; i++)
d += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
return d / 3.2 + 30;
}
function dqCourseStart() { return __ZC(322, 37, this, arguments, new.target); }
function dqCoursePaint() {
var Gm = DQ.game;
Gm.rings.forEach(function (R, i) {
var cur = i === Gm.i, next = i === Gm.i + 1, done = i < Gm.i;
R.ring.visible = !done;
R.ring.material.color.setHex(cur ? 0xFFE08A : 0x9AD8FF);
R.ring.material.opacity = cur ? 0.85 : (next ? 0.4 : 0.18);
R.beam.material.opacity = cur ? 0.16 : 0;
R.beam.visible = cur;
});
}
function dqCourseTick(dt) { return __ZC(322, 38, this, arguments, new.target); }
function dqLightStart() { return __ZC(322, 39, this, arguments, new.target); }
function dqLightTick(dt) { return __ZC(322, 40, this, arguments, new.target); }
function dqGameTick(dt) {
var Gm = DQ.game;
if (!Gm || !Gm.group)
return;
if (Gm.kind !== LD.kind)
return dqGameEnd(null, true);
if (Gm.g.t === "course")
dqCourseTick(dt);
else if (Gm.g.t === "light")
dqLightTick(dt);
}
function dqGameUse() { }
function dqQuizStart() {
var Gm = DQ.game, qs = Gm.g.qs.slice(), pick = [];
while (pick.length < 3 && qs.length)
pick.push(qs.splice(Math.floor(Math.random() * qs.length), 1)[0]);
Gm.qs = pick;
Gm.i = 0;
dqQuizCard();
}
function dqQuizCard() { return __ZC(322, 41, this, arguments, new.target); }
function dqMatchLimit(g) { return g.pairs.length * 2 + 2; }
function dqMatchStart() { return __ZC(322, 42, this, arguments, new.target); }
function dqMatchCard() { return __ZC(322, 43, this, arguments, new.target); }
function dqMatchFlip(i) { return __ZC(322, 44, this, arguments, new.target); }
(function () {
function inLand(ctx) { return !!(LD.g && LD.kind && DQ_LANDS[LD.kind] && ctx && dqRoles(LD.kind, ctx.name).length); }
function has(ctx, t) { return inLand(ctx) && dqRoles(LD.kind, ctx.name).some(function (R) { return R.t === t; }); }
function talker(ctx) { var T = null; LD.talkers.forEach(function (x) { if (x.name === ctx.name)
T = x; }); return T || { name: ctx.name, x: 0, z: 0 }; }
var defs = [
{ tag: "ERRAND", label: "📜 An errand", hint: "opens the errands this person can give, with what to bring and the gold it pays",
when: function (ctx) { return has(ctx, "errand"); }, run: function (ctx) { dqRoleCard(talker(ctx)); return { ok: true, say: "" }; } },
{ tag: "STALL", label: "🛍️ What's for sale", hint: "opens this person's stall so the dreamer can buy food, drink and keepsakes (to the backpack)",
when: function (ctx) { return has(ctx, "stall"); }, run: function (ctx) { dqStallCard(talker(ctx)); return { ok: true, say: "" }; } },
{ tag: "GAME", label: "🎲 A game", hint: "starts the game this person runs here (a run, a hunt for lights, riddles or a memory game)",
when: function (ctx) { return has(ctx, "game"); }, run: function (ctx) { var T = talker(ctx), R = dqRoles(LD.kind, ctx.name).filter(function (R) { return R.t === "game"; })[0]; dqGameIntro(T, R.g); return { ok: true, say: "" }; } },
{ tag: "LESSON", label: "🎓 The lesson", hint: "opens the World Learning lesson this person teaches",
when: function (ctx) { return has(ctx, "lesson"); }, run: function (ctx) { var R = dqRoles(LD.kind, ctx.name).filter(function (R) { return R.t === "lesson"; })[0]; dqLessonCard(R.l); return { ok: true, say: "" }; } },
{ tag: "PASSPORT", label: "📘 My passport", hint: "opens the dreamer's Dreamwalker's Passport, with its stamps",
when: function (ctx) { return has(ctx, "passport"); }, run: function () { dqPassportCard(); return { ok: true, say: "" }; } }
];
defs.forEach(function (d) { if (typeof staffDeedAdd === "function")
staffDeedAdd(d);
else
(window.SD_PENDING = window.SD_PENDING || []).push(d); });
})();
LD_SETS.hall = function (P) { return __ZC(322, 45, this, arguments, new.target); };
if (typeof FG_STATIONS !== "undefined" && !FG_STATIONS.emberforge)
FG_STATIONS.emberforge = { name: "The Ember Forges", who: "the dwarf smiths", st: ["forge", "joinery"], sells: ["cr_ore", "cr_coal", "cr_wood", "cr_leather", "cr_crystal", "cr_ember"], verb: "Strike" };
function dqPassportCard(msg) { return __ZC(322, 46, this, arguments, new.target); }
function dqPassportClaim() { return __ZC(322, 47, this, arguments, new.target); }
function dqLandsCard() { return __ZC(322, 48, this, arguments, new.target); }
function dqGoLand(k) { return __ZC(322, 49, this, arguments, new.target); }
function dqWho(w) { return /^(A|An|The) /.test(w) ? w.charAt(0).toLowerCase() + w.slice(1) : w; }
