/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TL = { here: null, svc: null, svcAt: 0, svcPoll: null, board: {}, boardAt: 0, boardLoaded: false, pray: null, joined: false,
gifts: {}, panel: null, cap: null, read: null, cool: 0, lastStep: -1, testHour: null, local: null, fig: null };
var TL_STEP_SECS = 45, TL_STEPS = 5, TL_SLOT_H = 1 / 3;
var TL_CANDLE_HOURS = 6;
var TL_TRAD = {
Greek: { style: "naos", word: "hiereus or hiereia (priest or priestess)", light: "lamp", bell: "bell", vest: 0xF2EEE6, shift: [7, 2, 18, 2],
gift: ["barley grains", "wine, poured as a libation", "honey cakes", "frankincense"],
gesture: "You stand, hands raised, palms to the sky, and say the god's name.",
how: "The Greeks honoured the gods with prayer, hymns, libations and sacrifice, with festivals and games. The temple (naos) was the god's house and held the cult image; the people gathered at the altar in front of it, where most offerings were made. Priests and priestesses were often chosen for a term from the citizens; goddesses were mostly served by priestesses. Hellenic polytheism is practised again today.",
tend: ["Sweep the naos", "Fill the lustral basin", "Trim the oil lamps", "Garland the image"],
steps: [["Purification", "Hands are washed in lustral water (chernips) and the place is made pure before anything is given."],
["Invocation", "The god is called by name and by their epithets, and reminded of offerings given before: the old pattern of Greek prayer."],
["Hymn", "A hymn is sung in the god's honour, like the Homeric Hymns, which tell of a god's birth, deeds and powers."],
["Libation and offering", "Wine is poured out, barley and incense are given. Great sacrifices were made at the altar outside; inside stood the image."],
["Prayer for the city", "The priest asks the god's favour for the city and for all present, hands raised to the sky."]] },
Roman: { style: "naos", roman: 1, word: "sacerdos (priest or priestess)", light: "lamp", bell: "bell", vest: 0xF2EEE6, shift: [7, 2, 18, 2],
gift: ["incense", "wine", "salted grain (mola salsa)", "cakes"],
gesture: "You cover your head, as Romans did to pray, and turn to the image.",
how: "Roman religion kept the pax deorum, the peace between gods and people, through exact rites done well. Colleges of priests served the state cults: the pontifices, the flamines of particular gods, the augurs, and the Vestals who kept Vesta's fire. Every household also honoured its own Lares and Penates at a small shrine, the lararium.",
tend: ["Sweep the cella", "Tend the altar fire", "Trim the oil lamps", "Garland the image"],
steps: [["Holy silence", "'Favete linguis' — keep your tongues still: silence is called so that no ill-omened word spoils the rite."],
["The head covered", "The priest draws the toga over the head (capite velato) and turns to the god."],
["Incense and wine", "A first offering of incense and wine is made at the altar."],
["The exact prayer", "Roman prayer had to be word-perfect; an assistant read the words out so none was missed."],
["Do ut des", "'I give, so that you may give': the offering is made and the vow recorded."]] },
Norse: { style: "hof", word: "goði or gyðja (priest or priestess)", light: "candle", bell: "drum", vest: 0x6A5A44, shift: [9, 2, 19, 2],
gift: ["mead", "bread", "apples", "a carved token"],
gesture: "You stand, raise your arms, and greet the god by name.",
how: "Norse religion was led by the goði and gyðja, often local chieftains, who held blót (offerings) and feasts in halls (hof) and at open-air altars (hörgr). Oaths were sworn on a ring kept on the altar. Heathenry, or Ásatrú, is a living religion today; in Iceland it is officially recognised.",
tend: ["Sweep the hall", "Bank the hearth", "Polish the oath ring", "Hang fresh greenery"],
steps: [["Hallowing", "The place is hallowed and the fire lit; in modern Heathenry a hammer may be signed to the four directions."],
["Invocation", "The god is called by name and by their by-names (heiti)."],
["Blót", "The offering: once an animal shared in a feast, today mead or food, sprinkled over the altar with a twig."],
["Sumbel", "The horn goes round: toasts to the gods and the ancestors, and oaths spoken on the ring."],
["Giving back", "The last of the mead is poured out for the gods and the land: a gift for a gift."]] },
Slavic: { style: "hof", slavic: 1, word: "volkhv (priest)", light: "candle", bell: "drum", vest: 0xE8E0CC, shift: [8, 2, 19, 2],
gift: ["bread", "honey", "grain", "kvass"],
gesture: "You bow from the waist, hand to your heart, and say 'Slava!'.",
how: "What we know of the old Slavic religion comes from chronicles, the Danish historian Saxo Grammaticus, and archaeology: carved idols on hilltops and in temples like Arkona, served by priests called volkhvy. Rodnovery revives this faith today.",
tend: ["Sweep the temple", "Tend the fire", "Hang fresh embroidered towels", "Set out bread and salt"],
steps: [["Kindling", "The fire is lit, the living heart of the rite."],
["Glorifying", "The god is praised by name with the cry 'Slava!' — glory."],
["The treba", "The offering (treba): bread, honey, grain or kvass is given to the fire and the image."],
["The horn", "At Arkona the priest read the coming harvest from the mead left in Svantevit's horn."],
["The feast", "What was offered is shared out among all who came."]] },
Egyptian: { style: "hypostyle", word: "hem-netjer, 'servant of the god'", light: "lamp", bell: "sistrum", vest: 0xF2EEE6, shift: [5.5, 2, 18, 2],
gift: ["bread", "beer", "lotus flowers", "incense"],
gesture: "You raise both hands, palms outward, in the old gesture of adoration.",
how: "Each god lived in their temple, in their image in the sanctuary. Only purified priests — shaven, in linen — went into the inner shrine; everyone else came to the outer courts, and to the festivals when the god's boat-shrine was carried out among the people. Homes kept shrines of their own. Kemetic religion revives this worship today.",
tend: ["Sweep the hall", "Fill the purification basin", "Trim the lamps", "Renew the lotus flowers"],
steps: [["Opening the shrine", "At dawn the priest breaks the clay seal and opens the shrine doors to show the god's face."],
["Purification", "Water and natron purify the shrine and the image."],
["Censing", "Incense — frankincense, and kyphi in the evening — is burned before the god."],
["The offering", "Bread, beer, flowers and above all Ma'at, truth and right order, are offered; the image is dressed and anointed."],
["Closing", "The priest withdraws backwards, sweeping away the footprints, and the doors are sealed again."]] },
Yoruba: { style: "orisha", word: "olorisha (an initiated priest or priestess of the orisha)", light: "candle", bell: "bell", vest: 0xF2EEE6, shift: [7, 2, 18, 2],
gift: ["kola nut", "palm oil", "honey", "fresh water"],
gesture: "You kneel and touch the ground before the shrine.",
how: "The orisha are honoured in Yoruba religion (Ìṣẹ̀ṣe) in Nigeria and Benin, and across the Americas as Lucumí (Santería), Candomblé and more. A shrine holds the orisha's sacred vessels and stones, dressed in their own colours and beads; offerings of the foods each orisha loves are made, and the answer is asked by divination.",
tend: ["Sweep the shrine", "Wash the sacred vessels", "Refresh the water", "Arrange the orisha's colours"],
steps: [["Mojuba", "Homage first to Olodumare, to the ancestors, the elders, and the line of teachers."],
["Opening the road", "Èṣù is honoured first of the orisha, as the messenger who opens the way for every prayer."],
["Oríkì", "Praise poetry is sung, calling the orisha by their praise names."],
["Ebo", "The orisha's favourite foods are offered."],
["Obi", "Kola nut is cast: the way the pieces fall says whether the offering is accepted."]] },
Akan: { style: "orisha", akan: 1, word: "ɔkɔmfo (priest or priestess)", light: "candle", bell: "drum", vest: 0xF2EEE6, shift: [7, 2, 18, 2],
gift: ["schnapps for libation", "mashed yam (ɛtɔ)", "eggs", "white clay"],
gesture: "You pour a little water on the ground and say the name.",
how: "The Akan of Ghana and Côte d'Ivoire honour Onyame, the sky god, without images — with the Nyame dua, a forked branch holding a pot of water — and Asase Yaa, the earth, on whose sacred day the land is not worked. The abosom (lesser gods) have shrines kept by an ɔkɔmfo. Libation opens every gathering.",
tend: ["Sweep the shrine", "Clean the brass pan", "Fetch fresh water", "Prepare white clay"],
steps: [["Libation", "Drink is poured to the ground, calling first on Onyame, then Asase Yaa, then the abosom and the ancestors."],
["Drumming", "The drums call, and the talking drum speaks the praise names."],
["The dance", "The ɔkɔmfo dances for the deity; in Akan worship the god may speak through them."],
["Offering", "Eggs, mashed yam and drink are offered at the shrine."],
["Blessing", "White clay is given as a sign of purity and blessing."]] },
Irish: { style: "grove", word: "druid", light: "candle", bell: "bowl", vest: 0xF2EEE6, shift: [7, 2, 19, 2],
gift: ["milk", "a silver coin for the well", "bread", "a sprig of oak"],
gesture: "You stand at the well's edge and greet land, sea and sky.",
how: "What we know of the ancient druids — priests, judges and teachers who did not write their lore down — comes from Greek and Roman writers and from archaeology. The old gods' stories survive in medieval Irish and Welsh tales. The Celtic peoples gave offerings to lakes, rivers and springs. Modern Druidry and Celtic reconstructionism honour these gods today.",
tend: ["Clear the grove floor", "Clean the spring", "Tend the fire", "Hang fresh oak"],
steps: [["The three realms", "Land, sea and sky are honoured: the three realms of Celtic tradition."],
["Peace in the quarters", "'Is there peace?' is asked to each direction, as in many modern Druid orders."],
["Invocation", "The power is called with praise drawn from the old tales."],
["Offering to the waters", "Something is given to the spring, as Celtic peoples gave to their sacred waters."],
["Awen", "The Awen, the breath of inspiration, is chanted together three times."]] },
Chinese: { style: "hall", word: "daoshi (Daoist priest)", light: "candle", bell: "gong", vest: 0x3A4A6A, shift: [7, 2, 17, 2],
gift: ["three sticks of incense", "oranges", "tea", "rice"],
gesture: "You hold three sticks of incense, bow three times, and set them upright.",
how: "Chinese temples honour gods who serve in the court of heaven, immortals and local protectors, in a religion that draws together Daoism, Buddhism and the old popular faith. Temples are usually run by their communities; Daoist priests (daoshi) perform the great rituals. People come with incense, fruit and questions, any day.",
tend: ["Sweep the hall", "Empty the incense ash", "Refresh the fruit and tea", "Light the lanterns"],
steps: [["Purifying the altar", "Water is sprinkled and the altar made clean."],
["Lighting incense", "Three sticks are lit — for heaven, earth and humankind — and set upright in the burner."],
["Bowing", "All bow three times before the image."],
["Offerings", "Fruit, tea, rice and flowers are set out; sometimes paper offerings are burned."],
["Divination blocks", "Two crescent blocks (jiaobei) are dropped to ask a question: one up, one down means yes."]] },
Hindu: { style: "mandir", word: "pujari (temple priest)", light: "lamp", bell: "bell", vest: 0xF2E6C8, shift: [6, 2, 18, 2],
gift: ["marigolds", "fruit", "a ghee lamp", "sweets"],
gesture: "You put your palms together and bow your head: namaste.",
how: "Puja is worship that honours the deity as a guest. In the temple the deity is present in the murti, the sacred image, in the garbhagriha — the womb-chamber at the temple's heart. Devotees come for darshan, to see and be seen by the deity; pujaris, often of priestly families, perform the rites through the day. Most homes keep a shrine too.",
tend: ["Wash the sanctum floor", "Draw a fresh kolam", "Fill the lamps with ghee", "String fresh garlands"],
steps: [["Āvāhana", "The deity is invited to be present in the murti."],
["Abhiṣeka", "The murti is bathed — water, milk, honey — then dressed and adorned."],
["Naivedya", "Food is offered, and afterwards shared as prasad, blessed food."],
["Ārti", "A lamp of ghee or camphor is waved in circles before the deity while the bell rings and a hymn is sung."],
["Darśan and prasad", "Devotees pass their hands over the flame, see the deity, and receive prasad."]] },
Japanese: { style: "shinto", word: "kannushi (Shinto priest)", light: "lamp", bell: "suzu", vest: 0xF8F6F0, shift: [6, 2, 16, 2],
gift: ["rice", "sake", "salt", "a coin in the offering box"],
gesture: "Two bows, two claps, one bow: the way to greet the kami.",
how: "The kami are honoured at shrines. The kami is not shown in an image: the inner sanctuary (honden) holds a shintai — a mirror, a sword, a stone — hidden from view. Visitors purify their hands and mouth at the water basin, ring the bell, give a coin, and bow and clap. Shinto is a living faith across Japan.",
tend: ["Rake the gravel", "Refill the water basin", "Change the sakaki", "Renew the rice and water"],
steps: [["Harae", "The kannushi waves the haraegushi, a wand of white paper streamers, to purify everyone present."],
["Bowing", "All bow deeply to the kami."],
["Shinsen", "Rice, sake, salt, water and the fruits of land and sea are set before the sanctuary."],
["Norito", "The kannushi reads a norito, a formal prayer in classical Japanese."],
["Tamagushi", "A sakaki branch hung with paper is offered; then two bows, two claps, one bow."]] },
Mesopotamian: { style: "cella", word: "šangû (temple priest)", light: "lamp", bell: "drum", vest: 0xE8DCC4, shift: [6, 2, 18, 2],
gift: ["bread", "beer", "dates", "cedar incense"],
gesture: "You stand with your hand raised before your face, as worshippers are shown on the old seals.",
how: "In Sumer, Akkad, Babylon and Assyria each city belonged to its god, who lived in the temple in the cult statue. The temple was a great household, with lands, workshops and staff; the god was woken, fed twice a day, dressed and sung to. What we know comes from cuneiform tablets.",
tend: ["Sweep the cella", "Set the god's table", "Fill the lamps", "Burn cedar"],
steps: [["Opening", "The temple gates open at dawn and the god is woken with song."],
["The god's meal", "Bread, beer, meat and fruit are set on the tables before the statue."],
["Lament", "A lamentation priest (kalû) sings to soothe the god's heart."],
["Libation", "Water, beer or wine is poured out."],
["Incense and blessing", "Cedar and juniper are burned and the god's blessing is asked."]] },
Aztec: { style: "stepped", word: "tlamacazqui (priest)", light: "candle", bell: "conch", vest: 0x2A2A2E, shift: [6, 2, 18, 2],
gift: ["copal", "marigolds (cempōhualxōchitl)", "maize", "cacao"],
gesture: "You touch the earth and then your lips, the old Nahua gesture of reverence.",
how: "The Mexica (Aztecs) honoured their gods in a cycle of eighteen monthly festivals, at temples atop stepped pyramids like the Templo Mayor of Tenochtitlan. Priests kept the calendar, the schools and the fires. Their offerings included copal, flowers, food — and blood, and at great festivals human sacrifice; that is recalled here, never re-enacted. Nahua communities keep many traditions today.",
tend: ["Sweep the temple", "Clean the censers", "Lay fresh flowers", "Renew the copal"],
steps: [["Copal", "Copal resin is burned in a long-handled censer."],
["The conch", "The conch trumpet sounds to begin the rite."],
["Song", "Sacred song is sung, like the twenty hymns written down in the sixteenth century."],
["Offering", "Flowers, maize, cacao and feathers are laid before the god."],
["Prayer", "The god is addressed with reverent titles, asking for rain, sun and life."]] },
Maya: { style: "stepped", word: "aj q'ij, 'daykeeper'", light: "candle", bell: "drum", vest: 0xF2EEE6, shift: [6, 2, 18, 2],
gift: ["copal", "candles", "flowers", "cacao"],
gesture: "You turn to each of the four directions in turn.",
how: "The ancient Maya honoured their gods in temples atop stepped platforms, with incense, music and offerings, kept by priests who read the calendars. Maya spirituality is alive today: daykeepers (aj q'ij) keep the 260-day calendar and hold ceremonies with copal, candles and flowers laid in a sacred fire.",
tend: ["Sweep the altar", "Prepare copal and candles", "Lay fresh flowers", "Clean the fire place"],
steps: [["The fire", "A circle of sugar and copal is laid and the sacred fire lit."],
["The four directions", "Each direction is greeted, each with its colour: red east, white north, black west, yellow south."],
["The day", "The daykeeper names today's sign in the 260-day calendar."],
["Offering", "Candles, copal, flowers and cacao are given to the fire."],
["Blessing", "Thanks are given and blessing asked for all present."]] },
Inca: { style: "stepped", inca: 1, word: "paqo (Andean ritual specialist)", light: "candle", bell: "conch", vest: 0xC8302A, shift: [6, 2, 17, 2],
gift: ["coca leaves", "chicha", "maize", "a despacho bundle"],
gesture: "You hold three coca leaves and breathe a prayer over them.",
how: "The Inca honoured Inti the sun, Mama Quilla the moon, Viracocha the maker, and the sacred places of the land (huacas); the Coricancha in Cusco was walled with gold. Andean ways are alive today: offerings to Pachamama of coca, chicha and despacho bundles are made across the Andes.",
tend: ["Sweep the court", "Prepare chicha", "Choose coca leaves", "Polish the gold"],
steps: [["Facing the sun", "All turn to the east, where the sun rises."],
["Ch'alla", "Chicha is poured to the earth and to the powers of the mountains."],
["K'intu", "Three perfect coca leaves are offered and breathed upon."],
["Despacho", "A bundle of offerings is made and given."],
["Blessing", "Thanks are given, and the blessing asked for the year."]] },
Hawaiian: { style: "fale", hawaiian: 1, word: "kahu (keeper)", light: "lamp", bell: "drum", vest: 0xF2EEE6, shift: [6, 2, 17, 2],
gift: ["a ti-leaf bundle", "a lei", "ʻōhelo berries", "a chant"],
gesture: "You stand quietly and offer a chant before coming closer.",
how: "Pele lives at Kīlauea, and is honoured there still. Her devotees leave hoʻokupu — offerings wrapped in ti leaf, lei, ʻōhelo berries — and dance hula and chant the old songs of Pele and her sister Hiʻiaka. Respect asks that visitors take nothing from her land.",
tend: ["Clear the ahu", "Gather ti leaves", "Weave a lei", "Set out the hoʻokupu"],
steps: [["Oli kāhea", "A chant asks permission to enter, and is answered with a chant of welcome."],
["Pule", "Prayer is offered."],
["Hoʻokupu", "Gifts are laid on the ahu, the stone platform."],
["Hula and mele", "A hula and its song are given in her honour."],
["Aloha", "With thanks, the gathering closes."]] },
Polynesian: { style: "fale", word: "tohunga (priest, expert)", light: "lamp", bell: "drum", vest: 0xF2EEE6, shift: [6, 2, 17, 2],
gift: ["fresh greenery", "a woven flax token", "the first fish", "the first kūmara"],
gesture: "You stand quietly, then speak the name with care.",
how: "Across Polynesia the atua were honoured at shrines (tūāhu, marae, heiau) by tohunga, experts in sacred knowledge, with karakia (chants) and the first fruits of the harvest and the catch. These are living cultures; many keep the old knowledge alongside other faiths today.",
tend: ["Clear the tūāhu", "Gather fresh greenery", "Weave flax offerings", "Tidy the whare"],
steps: [["Karanga", "A call welcomes everyone in."],
["Karakia", "The tohunga recites a karakia to the atua."],
["Waiata", "A song is sung together."],
["First fruits", "The first of the harvest or the catch is offered."],
["Closing karakia", "A closing karakia lifts the tapu, and the gathering ends."]] },
Vodou: { style: "peristil", word: "manbo or oungan (priestess or priest)", light: "candle", bell: "asson", vest: 0xF2EEE6, shift: [8, 2, 19, 2],
gift: ["a candle", "rum", "flowers", "the lwa's favourite things"],
gesture: "You turn to the poto mitan and greet the lwa.",
how: "Haitian Vodou honours the lwa, the spirits who serve under Bondye. Services in the peristil centre on the poto mitan, the post the lwa come down, with drumming, song and vèvè drawn in cornmeal. Altars carry images of Catholic saints, long identified with the lwa (Legba with Saint Lazarus, Erzulie Freda with the Mater Dolorosa).",
tend: ["Sweep the peristil", "Refresh the altar candles", "Wash the poto mitan", "Set out the lwa's favourite things"],
steps: [["Priyè Ginen", "The opening prayers, Catholic prayers and a long litany of the lwa."],
["Legba first", "Papa Legba is saluted first, to open the gate."],
["The vèvè", "The lwa's sign is traced on the floor in cornmeal."],
["Drums and song", "The drums and songs call the lwa down the poto mitan."],
["Offering", "The lwa's favourite things are given."]] },
Persian: { style: "fire", word: "mobed (Zoroastrian priest)", light: "lamp", bell: "bell", vest: 0xF8F6F0, shift: [6, 2, 18, 2],
gift: ["sandalwood for the fire", "fruit", "flowers", "frankincense"],
gesture: "You untie and retie your sacred cord with a prayer, facing the light.",
how: "Zoroastrians pray facing a source of light. The fire in a fire temple is not worshipped but is the sign of Ahura Mazda's truth and light; Ahura Mazda is never shown in an image. Mithra and Anahita are yazatas, beings worthy of worship. Zoroastrian communities live on in Iran, India (the Parsis) and around the world.",
tend: ["Put on the padan", "Clean the fire vase", "Feed the fire with sandalwood", "Clear the ash with care"],
steps: [["Kusti", "Worshippers untie and retie the kusti, the sacred cord, with prayer."],
["Feeding the fire", "The mobed, a cloth (padan) over the mouth so breath never touches the flame, feeds it sandalwood."],
["Avesta", "Prayers from the Avesta are recited, the Ashem Vohu and others."],
["Afrinagan", "Blessings are said over the fire, fruit and flowers."],
["Good thoughts", "Humata, hukhta, hvarshta: good thoughts, good words, good deeds."]] }
};
TL_TRAD.Welsh = TL_TRAD.Irish;
TL_TRAD.Gaulish = TL_TRAD.Irish;
TL_TRAD["Anglo-Saxon"] = TL_TRAD.Norse;
var TL_LORE = { style: "lore", lore: 1, word: "keeper of the lore", light: "candle", bell: "bowl", vest: 0x2A2A30, shift: [10, 2, 19, 2],
gift: ["a candle", "a moment's attention"],
gesture: "You stand at the lectern and read.",
tend: ["Dust the shelves", "Air the reading room", "Mend a binding", "Catalogue a book"],
steps: [["The lamp", "The reading lamp is lit and the book opened."],
["The first naming", "Where the name first appears: the oldest text that tells of it."],
["What came after", "How later ages retold it, feared it, or made it a symbol."],
["Questions", "The keeper answers what people ask."],
["Closing the book", "The book is closed and the lamp put out."]] };
var TL_LORE_NOTE = {
Demonology: "These names come from Jewish and Christian scripture and later European demonology, above all the grimoires — Johann Weyer's Pseudomonarchia Daemonum (1577) and the Lesser Key of Solomon (17th century) — which listed spirits with ranks and powers. This is a reading room, not a shrine.",
Qliphothic: "The qliphoth, 'shells' or 'husks', come from Jewish Kabbalah, especially the 16th-century teaching of Isaac Luria: the husks that hide sparks of holiness. Later occultists mapped demons onto them. This is a reading room, not a shrine.",
Adversarial: "Adversaries from many traditions: Satan, 'the adversary' in Hebrew; Lucifer, 'light-bearer', from the Latin of Isaiah 14; Ahriman of Zoroastrianism; Prometheus of the Greeks; Cain and Azazel of Genesis, Leviticus and Enoch. Their stories are told here, not worshipped.",
Hebrew: "Leviathan is the great sea creature of the Hebrew Bible (Job 41, Psalms 74 and 104, Isaiah 27), a sign of the chaos that God alone masters. This is a reading room, not a shrine."
};
var TL_LORE_KEYS = { tiamat: 1, kingu: 1, mushussu: 1, apep: 1, typhon: 1, ladon: 1, colchian: 1, jormungandr: 1, fafnir: 1, nidhogg: 1,
ydraiggoch: 1, barrowwyrm: 1, zmey: 1, azidahaka: 1, vritra: 1, orochi: 1, leviathan: 1, nachash: 1, babayaga: 1 };
var TL_LORE_DEITY = {
apep: "The Egyptians did not honour Apep: priests recited the Book of Overthrowing Apep to help the sun get past the serpent each night.",
tiamat: "In the Enūma Eliš, Babylon's creation poem, Marduk defeats Tiamat and makes heaven and earth from her body.",
kingu: "In the Enūma Eliš, Kingu leads Tiamat's host; humankind is made from his blood.",
mushussu: "The mušḫuššu is Marduk's serpent-dragon, shown in glazed brick on Babylon's Ishtar Gate.",
typhon: "Hesiod's Theogony tells how Zeus overcame Typhon, the last great challenger to the gods.",
ladon: "Ladon guarded the golden apples of the Hesperides, slain by Heracles in some tellings.",
colchian: "The never-sleeping dragon guarded the Golden Fleece, until Medea's charms lulled it for Jason.",
jormungandr: "In the Eddas the world serpent circles Midgard, Thor's great foe at Ragnarök.",
fafnir: "In the Völsunga saga Fafnir, turned dragon by greed, is slain by Sigurd.",
nidhogg: "In the Eddas Níðhöggr gnaws at a root of Yggdrasil, the world tree.",
ydraiggoch: "The red dragon of Wales, from the tale of Lludd and Llefelys and the boy Myrddin's prophecy; on the Welsh flag today.",
barrowwyrm: "In Beowulf a dragon guards a hoard in a barrow; the old king dies killing it.",
zmey: "In Russian tales Zmey Gorynych, many-headed, is defeated by the hero Dobrynya Nikitich.",
azidahaka: "In the Avesta Aži Dahāka is a three-headed dragon of the lie; in Ferdowsi's Shahnameh he becomes the tyrant Zahhak.",
vritra: "In the Rigveda Vritra holds back the waters until Indra slays him and frees the rivers.",
orochi: "In the Kojiki Susanoo makes the eight-headed serpent drunk and slays it, finding the sword Kusanagi in its tail.",
nachash: "Nachash is the serpent of Genesis 3, who speaks to Eve in the garden.",
babayaga: "Baba Yaga is the witch of Slavic folktales, in her hut on chicken legs — a figure of story, not of worship."
};
function tlIsLore(d) { return !!(d && (TL_LORE_KEYS[d.key] || d.trad === "Demonology" || d.trad === "Qliphothic" || d.trad === "Adversarial" || d.trad === "Hebrew")); }
function tlInfo(d) {
if (tlIsLore(d))
return TL_LORE;
if (d && d.key === "guanyin")
return TL_BUDDHIST;
return TL_TRAD[d && d.trad] || TL_TRAD.Greek;
}
var TL_BUDDHIST = {};
(function () {
var c = TL_TRAD.Chinese;
Object.keys(c).forEach(function (k) { TL_BUDDHIST[k] = c[k]; });
TL_BUDDHIST.word = "fashi (Buddhist teacher, monk or nun)";
TL_BUDDHIST.bell = "bowl";
TL_BUDDHIST.vest = 0x8A5A2A;
TL_BUDDHIST.buddhist = 1;
TL_BUDDHIST.how = "Guanyin is the bodhisattva of compassion, Avalokiteśvara, honoured across East Asia: one who has vowed to stay in the world until every being is free of suffering. Buddhists come to bow, offer incense and flowers, chant her name and the sutras, and dedicate the merit to all beings.";
TL_BUDDHIST.gift = ["incense", "flowers", "fruit", "clear water"];
TL_BUDDHIST.gesture = "You put your palms together and bow three times.";
TL_BUDDHIST.steps = [["Bowing", "All bow three times to the Buddha, the Dharma and the Sangha."], ["Incense", "Incense is offered, its smoke a sign of the teaching spreading."],
["Chanting", "The Heart Sutra or the Great Compassion Mantra is chanted to the beat of the wooden fish."], ["Her name", "'Namo Guanshiyin Pusa' is recited again and again."],
["Dedication", "The merit of the practice is dedicated to the welfare of all beings."]];
})();
function tlArticle(n) { return String(n).replace(/^The /, "the "); }
function tlTitle(d) {
var n = tlArticle(d.name), t = d.trad;
if (tlIsLore(d))
return "Keeper of the Lore of " + n;
if (d.key === "guanyin")
return "Fashi of " + n;
var f = typeof DEITY_F !== "undefined" && !!DEITY_F[d.key];
var w = { Greek: f ? "Hiereia" : "Hiereus", Roman: "Sacerdos", Norse: "Goði", "Anglo-Saxon": "Goði", Slavic: "Volkhv", Egyptian: "Hem-netjer",
Yoruba: d.key === "orunmila" ? "Awo" : "Olorisha", Akan: "Ɔkɔmfo", Irish: "Druid", Welsh: "Druid", Gaulish: "Druid", Chinese: "Daoshi",
Hindu: "Pujari", Japanese: "Kannushi", Mesopotamian: "Šangû", Aztec: "Tlamacazqui", Maya: "Aj Q'ij", Inca: "Paqo", Hawaiian: "Kahu",
Polynesian: "Tohunga", Vodou: "Manbo or Oungan", Persian: "Mobed" }[t] || "Priest";
return w + " of " + n;
}
function tlServiceTask(d) { return tlIsLore(d) ? "Hold a reading" : "Hold a service"; }
function tlHouseName(d) { return d.name + "'s house"; }
var TL_POSTS = {}, TL_BY_JOB = {}, TL_HOUSE_KEY = {};
(function () {
if (typeof DEITY === "undefined")
return;
var ids = (typeof TEMPLE_IDS !== "undefined") ? TEMPLE_IDS : {};
Object.keys(DEITY).forEach(function (k) {
var d = DEITY[k], id = ids[k];
if (!id)
return;
var p = { deity: k, job: id, title: tlTitle(d), house: tlHouseName(d), task: tlServiceTask(d) };
TL_POSTS[k] = p;
TL_BY_JOB[id] = p;
TL_HOUSE_KEY[p.house] = k;
});
if (typeof WORKPLACES === "undefined" || typeof WP_BY_KEY === "undefined")
return;
Object.keys(TL_POSTS).forEach(function (k) {
var p = TL_POSTS[k], d = DEITY[k];
if (WP_BY_KEY[p.house])
return;
var w = { key: p.house, ring: "temples", arch: "temple", jobs: [p.job], fit: [], temple: k,
note: "The house of " + d.name + " on Temple Row. Its " + tlInfo(d).word + " holds the services here." };
WORKPLACES.push(w);
WP_BY_KEY[w.key] = w;
WP_BY_JOB[p.job] = w.key;
});
})();
function tlTagHouses() {
if (typeof store === "undefined" || !store.objects)
return;
if (!store.workplaceAt)
store.workplaceAt = {};
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.templerow || !o.deity || !o.city)
continue;
var d = DEITY[o.deity];
if (!d || o.label !== tlHouseName(d))
continue;
var def = KIT[o.archetype];
if (!def || def.cat !== "structure")
continue;
o.templeHouse = true;
if (TL_POSTS[o.deity]) {
o.workplace = TL_POSTS[o.deity].house;
store.workplaceAt[o.workplace] = { x: o.x, z: o.z, id: o.id };
if (WP_BY_KEY[o.workplace])
WP_BY_KEY[o.workplace].arch = o.archetype;
}
}
}
function tlIsHouse(spec) {
if (!spec || !spec.templerow || !spec.deity)
return false;
if (spec.templeHouse)
return true;
var d = DEITY[spec.deity];
return !!(d && spec.label === tlHouseName(d) && KIT[spec.archetype] && KIT[spec.archetype].cat === "structure");
}
function tlHouseSpec(key) {
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.deity === key && tlIsHouse(o))
return o;
}
return null;
}
var TLM = {}, TLG = {};
function tlm(c, kind) { return __ZC(121, 0, this, arguments, new.target); }
function tlg(k, make) { return TLG[k] || (TLG[k] = make()); }
function gB(w, h, d) { return tlg("b" + w + "|" + h + "|" + d, function () { return new THREE.BoxGeometry(w, h, d); }); }
function gC(a, b, h, s) { return tlg("c" + a + "|" + b + "|" + h + "|" + (s || 12), function () { return new THREE.CylinderGeometry(a, b, h, s || 12); }); }
function gK(r, h, s) { return tlg("k" + r + "|" + h + "|" + (s || 8), function () { return new THREE.ConeGeometry(r, h, s || 8); }); }
function gS(r) { return tlg("s" + r, function () { return new THREE.SphereGeometry(r, 12, 10); }); }
function gT(r, t, arc) { return tlg("t" + r + "|" + t + "|" + (arc || 0), function () { return new THREE.TorusGeometry(r, t, 6, 24, arc || Math.PI * 2); }); }
function gP(w, h) { return tlg("p" + w + "|" + h, function () { return new THREE.PlaneGeometry(w, h); }); }
function tlCtx(spec, W, D, H) { return __ZC(121, 1, this, arguments, new.target); }
function tlShell(C, wallM, floorM, ceilM, opt) { return __ZC(121, 2, this, arguments, new.target); }
function tlCongregation(C, z0, z1, xs) {
for (var z = z0; z <= z1; z += 1.6)
(xs || [-2.4, -0.8, 0.8, 2.4]).forEach(function (x) { C.cong.push({ x: x, z: z }); });
}
function tlImage(C, d, x, y, z, h) { return __ZC(121, 3, this, arguments, new.target); }
function tlCandleStand(C, x, z, mat) { return __ZC(121, 4, this, arguments, new.target); }
function tlIncense(C, x, z, mat) {
C.add(gC(0.22, 0.3, 0.32, 10), mat, x, 0.86, z);
C.add(gC(0.05, 0.08, 0.7, 6), mat, x, 0.35, z);
C.smoke(x, 1.05, z, 16);
C.solid(x, z, 0.3, 0.3, 1);
}
function tlOfferTable(C, x, z, w, mat, cloth) {
C.block(w, 0.85, 0.8, mat, x, 0, z);
if (cloth)
C.add(gB(w + 0.06, 0.03, 0.86), cloth, x, 0.87, z);
C.offerAt = { x: x, z: z, w: w, y: 0.88 };
}
var TL_STYLE = {
naos: function (C, d, I) { return __ZC(121, 5, this, arguments, new.target); },
hypostyle: function (C, d, I) { return __ZC(121, 6, this, arguments, new.target); },
hof: function (C, d, I) { return __ZC(121, 7, this, arguments, new.target); },
shinto: function (C, d, I) { return __ZC(121, 8, this, arguments, new.target); },
mandir: function (C, d, I) { return __ZC(121, 9, this, arguments, new.target); },
hall: function (C, d, I) { return __ZC(121, 10, this, arguments, new.target); },
grove: function (C, d, I) { return __ZC(121, 11, this, arguments, new.target); },
stepped: function (C, d, I) { return __ZC(121, 12, this, arguments, new.target); },
cella: function (C, d, I) { return __ZC(121, 13, this, arguments, new.target); },
orisha: function (C, d, I) { return __ZC(121, 14, this, arguments, new.target); },
peristil: function (C, d, I) { return __ZC(121, 15, this, arguments, new.target); },
fale: function (C, d, I) { return __ZC(121, 16, this, arguments, new.target); },
fire: function (C, d, I) { return __ZC(121, 17, this, arguments, new.target); },
lore: function (C, d, I) { return __ZC(121, 18, this, arguments, new.target); }
};
var TL_DIMS = { naos: [14, 24, 7.5], hypostyle: [16, 24, 7], hof: [12, 22, 6], shinto: [12, 24, 6.5], mandir: [12, 22, 7], hall: [14, 22, 7], grove: [14, 20, 7],
stepped: [14, 22, 8], cella: [12, 20, 7], orisha: [12, 16, 5], peristil: [14, 18, 6], fale: [14, 16, 6], fire: [12, 18, 7], lore: [12, 18, 6] };
function tlStyleOf(d) {
var I = tlInfo(d);
if (d.dragon && !tlIsLore(d)) {
if (d.trad === "Chinese")
return "hall";
if (d.trad === "Japanese")
return "shinto";
if (d.trad === "Hindu")
return "mandir";
}
return I.style;
}
function makeTempleInterior(spec) { return __ZC(121, 19, this, arguments, new.target); }
function tlVest(L, I) { L.top = I.vest; L.bottom = blend(I.vest, 0x000000, 0.18); L.topKind = "robe"; L.bottomKind = "trousers"; L.layer = null; L.gear = "none"; L.hat = null; L.back = null; L.neck = null; L.waist = null; L.shoeKind = "sandals"; return L; }
(function () {
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
if (tlIsHouse(spec) && DEITY[spec.deity]) {
try {
return makeTempleInterior(spec);
}
catch (e) {
if (window.console)
console.warn("temple interior:", e);
}
}
return mi.apply(this, arguments);
};
}
if (typeof enterable === "function") {
var en = enterable;
enterable = function (spec) { if (tlIsHouse(spec))
return true; return en.apply(this, arguments); };
}
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
eb.apply(this, arguments);
if (INT && INT.temple)
try {
tlEntered();
}
catch (e) {
if (window.console)
console.warn("temple:", e);
}
};
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () { var was = INT && INT.temple; ex.apply(this, arguments); if (was)
tlLeft(); };
}
if (typeof buildSomnucorCity === "function") {
var bc = buildSomnucorCity;
buildSomnucorCity = function () { var r = bc.apply(this, arguments); try {
tlTagHouses();
}
catch (e) { } return r; };
}
if (typeof targetsFor === "function") {
var tf = targetsFor;
targetsFor = function (kind) { var r = tf.apply(this, arguments); if (kind === "workplaces")
r = r.filter(function (t) { return !TL_HOUSE_KEY[t.name]; }); return r; };
}
if (typeof tempLook === "function") {
var tl0 = tempLook;
tempLook = function (t) {
var L = tl0.apply(this, arguments), p = t && t.post && TL_BY_JOB[t.post.job];
if (p)
tlVest(L, tlInfo(DEITY[p.deity]));
return L;
};
}
if (typeof tempsInside === "function") {
var ti = tempsInside;
tempsInside = function () { if (INT && INT.temple)
return; return ti.apply(this, arguments); };
}
if (typeof workStart === "function") {
var ws = workStart;
workStart = function (job, task) {
var p = job && TL_BY_JOB[job.job_id];
if (p && task && task.task === p.task) {
if (INT && INT.temple && INT.temple.deity === p.deity) {
if (typeof WORK !== "undefined") {
WORK.open = false;
workPaint();
}
tlBegin();
}
else {
setStatus("A service is held inside <b>" + esc(p.house) + "</b>. Go in, and begin it from the house's own panel.");
if (typeof showTheWay === "function")
showTheWay(p.house);
}
return;
}
return ws.apply(this, arguments);
};
}
})();
function tlSound(kind) { return __ZC(121, 20, this, arguments, new.target); }
function tlD() { return INT && INT.temple ? DEITY[INT.temple.deity] : null; }
function tlEntered() { return __ZC(121, 21, this, arguments, new.target); }
function tlLeft() {
TL.here = null;
TL.svc = null;
TL.pray = null;
TL.local = null;
TL.joined = false;
TL.fig = null;
if (TL.panel)
TL.panel.style.display = "none";
if (TL.cap)
TL.cap.style.display = "none";
tlReadClose();
}
function tlPray() { return __ZC(121, 22, this, arguments, new.target); }
function tlPrayTick(dt) { return __ZC(121, 23, this, arguments, new.target); }
function tlLight() {
var d = tlD();
if (!d)
return;
if (typeof lightCandle === "function")
lightCandle(d.key, d.name);
}
function tlCandlesShow() {
var T = INT && INT.temple;
if (!T || !T.candles)
return;
var n = Math.min(12, (typeof candleCount === "function") ? candleCount(T.deity) : 0);
T.candles.forEach(function (c, i) { c.f.visible = i < n; });
}
function tlGift(what) { return __ZC(121, 24, this, arguments, new.target); }
function tlGiftMesh(g) { return __ZC(121, 25, this, arguments, new.target); }
var TL_SKIP_ICON = /^(robe|skin|hair|color|size|heads|arms4|glow|darkaura|longbeard|beard|small|giant|formless|halfface|wings|legs|head|hat|feathered|hood|sea)\b/;
function tlSymbols(d) { return __ZC(121, 26, this, arguments, new.target); }
function tlRead() { return __ZC(121, 27, this, arguments, new.target); }
function tlReadClose() { if (TL.read) {
TL.read.remove();
TL.read = null;
} }
function tlHour() { return TL.testHour !== null ? TL.testHour : ((typeof cityHourNow === "function") ? cityHourNow() : (new Date().getHours() + new Date().getMinutes() / 60)); }
function tlStandinSlot(key, h) { return __ZC(121, 28, this, arguments, new.target); }
function tlStandinFor(key) {
var p = TL_POSTS[key];
if (!p || typeof TEMPS === "undefined")
return null;
for (var i = 0; i < TEMPS.list.length; i++)
if (TEMPS.list[i].post.job === p.job)
return TEMPS.list[i];
return null;
}
function tlMyJob(key) {
var p = TL_POSTS[key];
if (!p || typeof WORK === "undefined" || !WORK.data)
return null;
return (WORK.data.jobs || []).filter(function (j) { return j.job_id === p.job; })[0] || null;
}
function tlPublicRpc(name, args) { return __ZC(121, 29, this, arguments, new.target); }
function tlPoll() { return __ZC(121, 30, this, arguments, new.target); }
function tlNow() { return __ZC(121, 31, this, arguments, new.target); }
function tlSay(h) { setStatus(h); }
function tlBegin() { return __ZC(121, 32, this, arguments, new.target); }
function tlNext() { return __ZC(121, 33, this, arguments, new.target); }
function tlEnd() { return __ZC(121, 34, this, arguments, new.target); }
function tlJoin() { return __ZC(121, 35, this, arguments, new.target); }
function tlAsk() { return __ZC(121, 36, this, arguments, new.target); }
function tlHoursWords(key) { var sh = tlInfo(DEITY[key]).shift; return "Services at " + hm(sh[0]) + "–" + hm(sh[0] + sh[1]) + " and " + hm(sh[2]) + "–" + hm(sh[2] + sh[3]) + " city time."; }
function tlPriestFig(name) { return __ZC(121, 37, this, arguments, new.target); }
function tlFigTick(dt, n) { return __ZC(121, 38, this, arguments, new.target); }
function tlPanel() { return __ZC(121, 39, this, arguments, new.target); }
function tlPaint() { return __ZC(121, 40, this, arguments, new.target); }
function tlBoardLoad(force) {
if (!force && Date.now() - TL.boardAt < 60000)
return;
TL.boardAt = Date.now();
tlPublicRpc("candles_board", {}).then(function (b) {
if (!b || typeof b !== "object")
return;
TL.board = b;
TL.boardLoaded = true;
tlCandlesShow();
});
}
var tlPaintAt = 0;
function templeLifeTick(dt) {
if (!INT || !INT.temple) {
if (TL.here)
tlLeft();
return;
}
var T = INT.temple, ft = performance.now() / 1000;
for (var i = 0; i < T.flames.length; i++) {
var f = T.flames[i];
if (f.visible)
f.scale.y = 0.75 + 0.4 * Math.abs(Math.sin(ft * 8 + i * 1.7));
}
if (typeof rise === "function")
for (var j = 0; j < T.smokes.length; j++)
rise(T.smokes[j], dt, 0.35, 0.04);
if (T.warm)
T.warm.intensity = (T.style === "hypostyle" || T.style === "lore" ? 0.9 : 0.6) + Math.sin(ft * 5) * 0.04;
tlPrayTick(dt);
if (Date.now() - TL.svcAt > 6000)
tlPoll();
tlBoardLoad(false);
var n = tlNow();
tlFigTick(dt, n);
tlPaintAt -= dt;
if (tlPaintAt <= 0) {
tlPaintAt = 0.4;
tlPaint();
tlCandlesShow();
}
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!INT || !INT.temple || !walkMode || TL.cool > performance.now())
return;
var k = e.code, act = { KeyP: tlPray, KeyC: tlLight, KeyO: function () { if (typeof templeOfferPanel === "function")
templeOfferPanel(TL.here); }, KeyR: tlRead, KeyJ: tlJoin }[k];
if (k === "Escape" && TL.read) {
tlReadClose();
return;
}
if (!act)
return;
TL.cool = performance.now() + 600;
e.preventDefault();
e.stopImmediatePropagation();
act();
}, true);
TL.enter = function (key) { var s = tlHouseSpec(key); if (!s)
return false; if (!walkMode && typeof setWalk === "function")
setWalk(true); enterBuilding(s); return !!(INT && INT.temple); };
TL.serviceNow = function () { var n = tlNow(); return n ? { kind: n.kind, step: n.step } : null; };
