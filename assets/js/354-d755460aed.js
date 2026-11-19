/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CT_TALES = [];
function ctTale(T) { CT_TALES.push(T); return T; }
ctTale({ id: "alice", host: "land:faerie", t: "Alice in Wonderland", by: "Lewis Carroll, 1865", where: "Faerie, at the Mad Hatter's tea table",
col: ["#3A1E4A", "#FFE7A8"], gold: 16, keep: ["The Hatter's teacup", "☕"], rad: 10,
props: [["teatable", 0, -4, 0, {}, 3, { hw: 3.6, hd: 0.8, h: 1 }], ["rabbithole", -8, 2, 0, {}, 1.4], ["croquet", 8, 1, 0, {}, 2]],
who: [
{ n: "Alice", who: "Alice, a curious, polite and brave girl of about seven who fell down the rabbit-hole", child: 1,
o: { sex: "f", look: { top: 0xF2C83A, topKind: "dress", bottom: 0xF2C83A, bottomKind: "skirt", layer: "apron", layerColor: 0xFAFAF4, hair: 0xE8C870, hairStyle: "long", shoes: 0x1A1A1A, accColor: 0x2A5AC8 } },
at: [-3.5, -1], greet: "Oh! Are you late too? Everyone here seems to be in such a hurry, and nobody will tell me where anything goes.", c: 450 },
{ n: "The Hatter", who: "the Hatter, who keeps it always six o'clock and tea-time, rude, quick and full of riddles he cannot answer",
o: { sex: "m", look: { hat: "tophat", hatColor: 0x5A3A2A, layer: "suit", layerColor: 0x6A4A8A, top: 0xF2EEE2, bottom: 0xC89A4A, neck: "bowtie", accColor: 0xD8342A, hair: 0xC8642A, hairStyle: "curly" } },
at: [0, -6.5], greet: "No room! No room! ...Oh, very well, there's plenty of room. Have some wine. There isn't any. Have some tea, then.", c: 600 },
{ n: "The March Hare", who: "the March Hare, mad as a March hare, the Hatter's friend", being: "rabbit", s: 1.6, at: [2.5, -6.5], greet: "Take some more tea! You've had none yet, so you can't take less." },
{ n: "The Dormouse", who: "the Dormouse, very sleepy, who tells a story about three sisters living at the bottom of a treacle-well", being: "rat", s: 0.8, at: [-2, -6.5], greet: "...Twinkle, twinkle, little bat... oh! I wasn't asleep. I heard every word." },
{ n: "The White Rabbit", who: "the White Rabbit, nervous, with a waistcoat and a pocket-watch, always late for the Duchess", being: "rabbit", s: 1.2, at: [-8, 4], wander: 5, greet: "Oh my ears and whiskers, how late it's getting! The Duchess! She'll get me executed!" },
{ n: "The Cheshire Cat", who: "the Cheshire Cat, who grins, talks in puzzles and vanishes slowly, ending with the grin", being: "cat", s: 1.3, at: [5, -3], greet: "We're all mad here. I'm mad. You're mad. You must be, or you wouldn't have come here." },
{ n: "The Queen of Hearts", who: "the Queen of Hearts, the furious queen of the playing cards who shouts 'Off with their heads!', though nobody is ever actually executed",
o: { sex: "f", look: { topKind: "robe", top: 0xC8202A, bottom: 0xC8202A, hat: "crown", hatColor: 0xE8B83A, back: "cape", backColor: 0xF2EEE2, hair: 0x2A1A12, hairStyle: "bun" } },
at: [9, 4], greet: "Can you play croquet? Then join in! The hoops are soldiers and the mallets are flamingos, and if you cheat... OFF WITH YOUR HEAD!", c: 900 }
],
steps: [
{ k: "say", w: 1, t: "Why is a raven like a writing-desk? ...No, don't answer yet. Sit down. Your hair wants cutting. Now, three riddles, and if you answer two, you may stay for tea." },
{ k: "choose", w: 1, t: "The Hatter asks: \"Why is a raven like a writing-desk?\"", o: [
["\"I give it up. What's the answer?\"", 1, "\"I haven't the slightest idea,\" said the Hatter. Quite right: in the book nobody knows, not even him. Years later Carroll said it had no answer at all. You win this one by not being fooled!"],
["\"Because both have quills.\"", 0, "\"Ha! A guess! Guesses are for March. Try again.\""],
["\"Because both are black.\"", 0, "\"Writing-desks are hardly ever black. Try again.\""]
] },
{ k: "choose", w: 0, t: "Alice whispers: \"The Hatter says his watch is two days wrong. What does his watch tell?\"", o: [
["The day of the month", 1, "Yes! It tells the day of the month, not the hour. And it's wrong because the March Hare put butter in it. \"It was the BEST butter.\""],
["The hour", 0, "Not this watch: it doesn't tell what o'clock it is. It's always six o'clock here anyway."],
["The weather", 0, "No, that would be a very odd watch, even here."]
] },
{ k: "find", w: 5, t: "The Cheshire Cat smiles: \"I shall vanish now. Find my grin, wherever it is left hanging: five times, before the tea gets cold.\"", n: 5, look: "grin", col: 0xE86AD8, r: 30, secs: 240, name: "the Cat's grin", done: "\"Well! I've often seen a cat without a grin,\" thought Alice, \"but a grin without a cat!\"" },
{ k: "run", w: 4, t: "The White Rabbit drops his gloves: \"I'm late, I'm late! Run with me, through every ring, to the Duchess's!\"", n: 7, r: 26, secs: 95, done: "\"Just in time! Here are my gloves. Thank you, thank you!\"" }
],
qs: [["Who wrote Alice's Adventures in Wonderland?", "Lewis Carroll (Charles Dodgson)", "Hans Christian Andersen", "Charles Dickens"],
["What was Lewis Carroll's day job?", "A mathematics teacher at Oxford", "A ship's captain", "A doctor"],
["What did Alice follow down the hole?", "A White Rabbit with a pocket-watch", "A black cat", "A talking caterpillar"],
["Who drew the first pictures for Alice in 1865?", "John Tenniel", "Beatrix Potter", "Leonardo da Vinci"],
["Which real girl was the story first told to, on a boat trip in 1862?", "Alice Liddell", "Wendy Darling", "Dorothy Gale"]] });
ctTale({ id: "tirnanog", host: "land:faerie", t: "Oisín in Tír na nÓg", by: "Irish myth (the Fenian Cycle)", where: "Faerie, on the shore road to the Land of Youth",
col: ["#123A2A", "#E8F2C8"], gold: 12, keep: ["A white horse's horseshoe", "🧲"], rad: 8,
props: [["standingstones", 0, -6, 0, 0.45, 3], ["flowers", -5, 0, 0, 1.3]],
who: [
{ n: "Niamh of the Golden Hair", who: "Niamh of the Golden Hair, a princess of Tír na nÓg, the Land of Youth, who rides a white horse over the sea",
o: { sex: "f", look: { topKind: "dress", top: 0x2A8A5A, bottom: 0x2A8A5A, back: "cloak", backColor: 0xE8E0C8, hair: 0xF0C840, hairStyle: "long", hat: "flowercrown", hatColor: 0xF8E8A0 } }, at: [-1.5, -1], greet: "I came across the sea for you, son of Fionn. In the Land of Youth no one grows old. Will you ride with me?", c: 500 },
{ n: "Oisín", who: "Oisín, poet and warrior of the Fianna, son of Fionn mac Cumhaill",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x8A5A2A, top: 0xE8DCC0, bottom: 0x5A4A32, back: "cloak", backColor: 0x2A5A3A, hair: 0xC8642A, hairStyle: "long", beard: 1 } }, at: [1.5, -1], greet: "I have been in the Land of Youth only three years, I think. Only three years. I would see my father and the Fianna again.", c: 450 },
{ n: "Niamh's white horse", who: "Embarr, Niamh's white horse that gallops over the waves", being: "horse", at: [0, -4], greet: "(The white horse tosses its mane. Its hooves do not quite touch the grass.)" }
],
steps: [
{ k: "say", w: 1, t: "Oisín stands by the white horse. \"Niamh says I may go home to Ireland to visit, if I never once set foot on the ground. Help me remember what she told me.\"" },
{ k: "choose", w: 0, t: "Niamh asks: \"What must Oisín never do when he reaches Ireland?\"", o: [
["Get down from the horse and touch the ground", 1, "Yes. If his foot touches the earth of Ireland, the years will catch up with him all at once."],
["Speak to anyone", 0, "He may speak. It is something else. Try again."],
["Look back at the sea", 0, "That is another story (Orpheus!). Try again."]
] },
{ k: "choose", w: 1, t: "In Ireland Oisín finds strangers, and Fionn's great hall in ruins. Men struggle to lift a great stone. Oisín leans from the saddle to help, and his girth snaps... What happens in the old tale?", o: [
["He falls to the ground and becomes a very old man: 300 years had passed, not three", 1, "That's the story. Time runs differently in the Land of Youth. Old Oisín tells the tales of the Fianna to Saint Patrick, and that is how they were remembered."],
["He flies back over the sea", 0, "Not in the old telling. Try again."],
["The stone turns into gold", 0, "No, but it's a kind thought. Try again."]
] }
],
qs: [["What does Tír na nÓg mean in Irish?", "The Land of Youth", "The Island of Stones", "The Kingdom of Night"],
["Who was Oisín's father, leader of the Fianna?", "Fionn mac Cumhaill", "King Arthur", "Brian Boru"],
["In the story, how long had Oisín really been away?", "About 300 years", "Three days", "Thirty years"],
["Which language were these stories first told in?", "Irish (Gaelic)", "Latin", "Norse"]] });
ctTale({ id: "orpheus", host: "land:underworld", t: "Orpheus and Eurydice", by: "Greek myth (Ovid, Virgil)", where: "the Underworld, at the foot of the road up to the light",
col: ["#20202A", "#E8E2CC"], gold: 16, keep: ["Orpheus's lyre string", "🎼"], rad: 9,
props: [["throne", -3, -6, 0, 1], ["throne", 3, -6, 0, 1], ["brazier", -6, -3, 0, 1], ["brazier", 6, -3, 0, 1]],
who: [
{ n: "Orpheus", who: "Orpheus, the greatest musician of ancient Greece, who sang his way into the Underworld to bring back his wife",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xF2EEE2, top: 0xF2EEE2, bottom: 0xD8D0C0, shoeKind: "sandals", hat: "flowercrown", hatColor: 0x5A8A3A, hair: 0x3A2414, hairStyle: "curly" } }, at: [-1.5, -1], greet: "My song moved even the stones and the Furies. Hades has said yes. But there is one condition...", c: 450 },
{ n: "Eurydice", who: "Eurydice, Orpheus's wife, a shade who must follow him up out of the Underworld",
o: { sex: "f", look: { topKind: "robe", top: 0xD8D8E0, bottom: 0xD8D8E0, hair: 0x5A3A22, hairStyle: "long", skin: 0xD8D4CC } }, at: [1.5, -1], greet: "I hear his lyre. I will follow, if only he does not look back.", c: 400 },
{ n: "Hades", who: "Hades, stern king of the Underworld, fair but unbending", deity: "hades", at: [-3, -6], greet: "Your music has made the dead weep, singer. Take her. Walk ahead, and do not turn round until you reach the light." },
{ n: "Persephone", who: "Persephone, queen of the Underworld half the year, kind to Orpheus", deity: "persephone", at: [3, -6], greet: "Go gently. She walks behind you, quiet as a shadow. Trust that she is there." }
],
steps: [
{ k: "say", w: 2, t: "Hades: \"You may lead her back to the world above. She will follow behind you. If you turn and look at her before you reach the light, she stays here forever.\"" },
{ k: "walk", w: 0, t: "Walk the road up to the light ahead of you. Do NOT turn round: keep looking forward until you reach the glow. (Turning to look behind you, or turning the view right round, ends it.)", d: 55, done: "You reach the light without looking back! In the old myth, Orpheus could not bear it and turned at the last moment, and Eurydice slipped back into the shades. Here, this once, she steps out into the sun beside you." },
{ k: "choose", w: 3, t: "Persephone asks: \"Why do you think the gods made the rule 'do not look back'?\"", o: [
["To test whether he could trust without seeing", 1, "That's how many people read it: a test of trust and patience. Poets have retold it for over 2,000 years."],
["Because looking back is bad luck in a game", 0, "There's more to it than luck. Think about trust. Try again."],
["Because the road was narrow", 0, "The road was the least of it. Try again."]
] }
],
qs: [["What instrument did Orpheus play?", "The lyre", "The drum", "The trumpet"],
["Which Roman poet told the story in the Metamorphoses?", "Ovid", "Julius Caesar", "Homer"],
["Which three-headed dog guarded the Underworld?", "Cerberus", "Argos", "Fenrir"],
["In the myth, what went wrong at the very end?", "Orpheus looked back", "He forgot the way", "He dropped his lyre"]] });
ctTale({ id: "perseus", host: "land:heavens", t: "Perseus and Medusa", by: "Greek myth (Ovid, Apollodorus)", where: "the Heavens, at the cloud court of Olympus",
col: ["#F2EEE2", "#3A2A12"], gold: 16, keep: ["A silver sickle charm", "🌙"], rad: 10,
props: [["mirrorshield", 0, -3, 0, {}, 1], ["statue", -7, -5, 0, 0.8], ["statue", 7, -5, 0, 0.8], ["fountain", 0, -9, 0, 0.6, 3]],
who: [
{ n: "Perseus", who: "Perseus, young hero, son of Zeus and Danaë, sent to bring back the head of Medusa",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xC8A040, top: 0xF2EEE2, bottom: 0xC8A040, shoeKind: "sandals", hair: 0x3A2414, hairStyle: "curly", back: "cape", backColor: 0xA82A2A } }, at: [-2, -1], greet: "King Polydectes has sent me to fetch the head of a Gorgon. The gods say they will help me... if I choose their gifts wisely.", c: 500 },
{ n: "Athena", who: "Athena, goddess of wisdom, who gives Perseus a polished shield", deity: "athena", at: [2, -1.5], greet: "Never look straight at Medusa. Wisdom is knowing where to look." },
{ n: "Hermes", who: "Hermes, messenger of the gods, quick and witty, who lends Perseus winged sandals and a curved sword", deity: "hermes", at: [-4, -5], greet: "Fast feet, fast wits! The Gorgons live at the edge of the world. You'll want to fly." },
{ n: "Zeus", who: "Zeus, king of the gods, Perseus's father", deity: "zeus", at: [4, -5], greet: "My son goes to face the Gorgon. Watch, and help him, dreamer." },
{ n: "Andromeda", who: "Andromeda, princess of Ethiopia, rescued by Perseus from a sea-monster on his way home",
o: { sex: "f", look: { topKind: "dress", top: 0x2A6AC8, bottom: 0x2A6AC8, hat: "tiara", hatColor: 0xE8B83A, hair: 0x1A1210, hairStyle: "braids", skin: 0x8A5A3A, neck: "necklace" } }, at: [6, 1], greet: "My mother boasted I was lovelier than the sea-nymphs, and the sea sent a monster. If Perseus comes this way...", c: 500 }
],
steps: [
{ k: "choose", w: 1, t: "Athena offers gifts. Which one will let Perseus fight Medusa without being turned to stone?", o: [
["A polished bronze shield, to see her only as a reflection", 1, "Yes. Anyone who looks straight at Medusa's face turns to stone. In the shield's reflection, Perseus could see where she was safely."],
["A blindfold", 0, "Then he could not see her at all! Athena's gift was cleverer. Try again."],
["A very big spear", 0, "Strength alone won't help if he is turned to stone first. Try again."]
] },
{ k: "choose", w: 2, t: "Hermes asks: \"And how will you get to the far edge of the world, where the Gorgons sleep?\"", o: [
["Winged sandals", 1, "Off you go! Hermes's winged sandals carried Perseus through the air. He also had the cap of darkness (from Hades) to be invisible, and a bag to carry the head."],
["A chariot pulled by lions", 0, "Too slow and too loud for sneaking up on Gorgons. Try again."],
["Swim", 0, "It's rather a long way. Try again."]
] },
{ k: "find", w: 0, t: "Medusa's two Gorgon sisters are asleep. Walk carefully and gather the five glowing stepping-stars across the clouds, the way Perseus flew, quietly.", n: 5, look: "star", col: 0xFFE070, r: 30, secs: 240, name: "a stepping-star", done: "You crossed without waking the Gorgons. In the myth Perseus took Medusa's head, and from her sprang Pegasus, the winged horse." },
{ k: "choose", w: 4, t: "On the way home, Perseus sees Andromeda chained to a rock with a sea-monster coming. What does he do in the myth?", o: [
["He saves her, and they later marry", 1, "Right. And they both became constellations: you can see Perseus and Andromeda in the night sky in autumn."],
["He flies past", 0, "Not our hero. Try again."],
["He asks the monster nicely to go away", 0, "Polite, but not what happened. Try again."]
] }
],
qs: [["Medusa was one of the three...", "Gorgons", "Sirens", "Furies"],
["What sprang from Medusa when Perseus defeated her?", "Pegasus, the winged horse", "A dragon", "A unicorn"],
["Perseus and Andromeda are both names of...", "Constellations in the night sky", "Rivers in Greece", "Roman emperors"],
["Which goddess gave Perseus the polished shield?", "Athena", "Aphrodite", "Hera"]] });
ctTale({ id: "nemo", host: "land:depths", t: "Twenty Thousand Leagues Under the Sea", by: "Jules Verne, 1870", where: "the Depths, beside the Nautilus at the reef",
col: ["#0E2A3A", "#C8F0FF"], gold: 16, keep: ["A Nautilus brass rivet", "🔩"], rad: 12,
props: [["nautilus", 0, -8, Math.PI / 2, {}, 5, { r: 4, h: 6 }], ["ruins", -9, 1, 0, {}, 3]],
who: [
{ n: "Captain Nemo", who: "Captain Nemo, the proud, mysterious, brilliant captain of the submarine Nautilus, who has left the land behind and loves the sea",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x1E2A3A, top: 0xE8E4DC, bottom: 0x1E2A3A, hat: "cap", hatColor: 0x1E2A3A, hair: 0x2A2A2A, beard: 1, shoeKind: "boots" } }, at: [-2, -1], greet: "Welcome aboard the Nautilus, professor's friend. The sea is everything. It covers seven-tenths of the globe.", c: 700 },
{ n: "Professor Aronnax", who: "Professor Pierre Aronnax, French marine biologist, the narrator, held aboard the Nautilus and amazed by everything he sees",
o: { sex: "m", look: { layer: "suit", layerColor: 0x5A4A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, face: "glasses", hair: 0x8A8A8A, beard: 1 } }, at: [1, -1], greet: "Every fish, every coral, I note it all! What a laboratory this ocean is.", c: 500 },
{ n: "Ned Land", who: "Ned Land, the hot-tempered Canadian master harpooner who wants to escape",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x8A3A2A, top: 0xE8DCC0, bottom: 0x3A3A3A, hat: "beanie", hatColor: 0x3A3A3A, hair: 0xA8642A, beard: 1, shoeKind: "boots" } }, at: [3.5, -2], greet: "A fine boat, sure. But a man needs land under his feet. Keep your eyes open, friend.", c: 450 },
{ n: "Conseil", who: "Conseil, Aronnax's calm, loyal servant who loves classifying sea creatures",
o: { sex: "m", look: { layer: "vest", layerColor: 0x3A3A4A, top: 0xF2EEE2, bottom: 0x3A3A4A, hair: 0x2A1A12, hairStyle: "short" } }, at: [-4.5, -2], greet: "If master pleases, I can tell you the class, order and family of anything that swims past." }
],
steps: [
{ k: "say", w: 0, t: "Nemo: \"Today we walk on the sea floor in our diving suits, to the ruins of a city the sea swallowed long ago. Keep close.\"" },
{ k: "find", w: 1, t: "Search the drowned ruins (in the book Nemo shows Aronnax lost Atlantis) and find five carved stones the sea has kept.", n: 5, look: "tablet", col: 0x7FD8C8, r: 28, secs: 240, name: "a carved stone", done: "Aronnax: \"Atlantis! I was walking on its streets!\" (A story, of course: no real Atlantis has ever been found.)" },
{ k: "choose", w: 2, t: "A giant squid wraps an arm round the Nautilus! What is the real animal behind the book's monster?", o: [
["The giant squid, which really lives in the deep ocean", 1, "Yes. Giant squid can reach about 12 metres. The first photographs of a live one were only taken in 2004."],
["The octopus from a fish tank", 0, "Far too small. Try again."],
["A whale", 0, "Whales actually eat giant squid! Try again."]
] },
{ k: "choose", w: 0, t: "Nemo asks: \"How does the Nautilus make its electricity, deep under the sea?\"", o: [
["From batteries, using sodium taken from seawater", 1, "That's Verne's idea. Real submarines of his time barely worked; now submarines run on batteries and even nuclear power."],
["From a coal fire", 0, "Fire needs air, and there's none down here. Try again."],
["From the moon", 0, "Poetic! But no. Try again."]
] }
],
qs: [["What was Captain Nemo's submarine called?", "The Nautilus", "The Beagle", "The Endeavour"],
["Jules Verne was from which country?", "France", "England", "Germany"],
["A league in the title measures...", "Distance travelled, not depth", "How deep they dived", "How fast they went"],
["About how much of the Earth's surface is ocean?", "About 71 per cent", "About 25 per cent", "About 99 per cent"]] });
ctTale({ id: "mermaid", host: "land:depths", t: "The Little Mermaid", by: "Hans Christian Andersen, 1837", where: "the Depths, by the sea-witch's grotto",
col: ["#1A3A4A", "#F2E8C8"], gold: 12, keep: ["A sea-garden flower", "🌺"], rad: 8,
props: [["coralgarden", 0, -5, 0, {}, 3], ["cauldron", 4, -4, 0, 0.8]],
who: [
{ n: "The little mermaid", who: "the youngest daughter of the sea king in Andersen's story, who longs for the world above and a human soul", being: "mermaid", at: [-2, -1], greet: "My sisters tell me of ships and towns and birds that sing. I have a garden shaped like the sun. Have you ever stood on land?" },
{ n: "Her grandmother", who: "the little mermaid's wise old grandmother, who knows about the world above", being: "mermaid", at: [0.5, -3], greet: "When you are fifteen you may rise up and sit on the rocks in the moonlight and watch the great ships." },
{ n: "The sea witch", who: "the sea witch of Andersen's story, frightening but honest about the terrible price of her bargains",
o: { sex: "f", look: { topKind: "robe", top: 0x2A4A3A, bottom: 0x2A4A3A, hair: 0x1A2A1A, hairStyle: "long", skin: 0x8AA898, back: "cloak", backColor: 0x1A2A2A } }, at: [4, -2], greet: "I know what you want. It's stupid of you, but you shall have it, and it will bring you sorrow." }
],
steps: [
{ k: "choose", w: 2, t: "The sea witch offers legs instead of a tail. What price does she ask in Andersen's story?", o: [
["Her beautiful voice", 1, "Yes: the witch takes her voice. And every step on her new feet will feel like walking on knives. Andersen's tale is much sadder than later films."],
["A bag of pearls", 0, "Far worse than pearls. Try again."],
["Her grandmother's crown", 0, "No. Try again."]
] },
{ k: "choose", w: 1, t: "The grandmother asks: \"How does Andersen's story really end?\"", o: [
["She becomes a daughter of the air, a spirit who can earn a soul by doing good", 1, "That's Andersen's ending: not wedding bells, but kindness. The statue of the Little Mermaid in Copenhagen has sat on her rock since 1913."],
["She marries the prince and they live happily ever after", 0, "That's a later film's ending, not Andersen's. Try again."],
["She becomes the new sea witch", 0, "Not quite. Try again."]
] }
],
qs: [["Hans Christian Andersen came from which country?", "Denmark", "Italy", "Russia"],
["Where is the famous Little Mermaid statue?", "Copenhagen", "Paris", "New York"],
["What did the sea witch take in exchange for legs?", "Her voice", "Her hair", "Her memory"],
["Andersen also wrote...", "The Ugly Duckling", "Pinocchio", "Robin Hood"]] });
ctTale({ id: "cthulhu", host: "land:void", t: "The Call of Cthulhu", by: "H. P. Lovecraft, 1928", where: "the Void, before the carved stone that sends strange dreams",
col: ["#141A22", "#A8C8D8"], gold: 14, keep: ["A clay bas-relief", "🗿"], rad: 9,
props: [["idolstone", 0, -4, 0, {}, 1.5, { r: 1.2, h: 3 }], ["runestone", -6, -5, 0.3, 0.9], ["runestone", 6, -5, -0.3, 0.9]],
who: [
{ n: "Professor Angell", who: "George Gammell Angell, an old professor of ancient languages in Providence who collected strange reports of dreams",
o: { sex: "m", look: { layer: "suit", layerColor: 0x3A3A3A, top: 0xF2EEE2, bottom: 0x3A3A3A, hair: 0xD8D8D8, beard: 1, face: "glasses" } }, at: [-2, -1], greet: "Strange dreams, young friend. Artists and poets all over the world, all on the same nights in 1925, dreaming of a sunken city.", c: 450 },
{ n: "Wilcox the sculptor", who: "Henry Wilcox, a nervous young sculptor who carved a strange creature in clay after a dream",
o: { sex: "m", look: { layer: "labcoat", top: 0xE8E0D0, bottom: 0x5A4A3A, hair: 0x2A1A12, hairStyle: "waves" } }, at: [1.5, -1.5], greet: "I dreamed of great stone cities, slimy and green, and a voice that wasn't a voice. So I made this. I don't know what it is.", c: 350 },
{ n: "Inspector Legrasse", who: "John Raymond Legrasse, a steady police inspector from New Orleans who once found an idol like Wilcox's",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x4A4032, top: 0xE8E0D0, bottom: 0x3A3A3A, hat: "brimmed", hatColor: 0x3A3228, hair: 0x2A2A2A, beard: 1 } }, at: [4, -2], greet: "Keep your head, friend. Whatever that carving is, it's old, and old things are best left sleeping.", c: 450 }
],
steps: [
{ k: "find", w: 0, t: "Gather the five scattered pages of Professor Angell's notes, blown across the Void.", n: 5, look: "page", col: 0xD8E8F0, r: 28, secs: 240, name: "a page of notes", done: "The notes tell of a city called R'lyeh, sunk in the Pacific, where something enormous sleeps and dreams." },
{ k: "choose", w: 2, t: "The carving seems to hum. Legrasse asks: \"What should we do?\"", o: [
["Leave it sleeping, and write down what we learned", 1, "Wise. Lovecraft's whole story is about how some things are better not woken. Cthulhu sleeps on."],
["Shout its name three times", 0, "Please don't. Try again."],
["Throw the carving into the sea", 0, "That's where it came from... Try again."]
] }
],
qs: [["H. P. Lovecraft lived in which American city?", "Providence, Rhode Island", "Chicago", "San Francisco"],
["In the story, where does Cthulhu sleep?", "The sunken city of R'lyeh", "Under Mount Olympus", "On the Moon"],
["The Call of Cthulhu was first printed in which kind of magazine?", "A 'pulp' story magazine (Weird Tales)", "A newspaper", "A school textbook"],
["Why can anyone use this 1928 story now?", "US copyright on works from 1928 ended in 2024", "Lovecraft gave it away", "It was never published"]] });
ctTale({ id: "jekyll", host: "land:mirror", t: "Dr Jekyll and Mr Hyde", by: "Robert Louis Stevenson, 1886", where: "the Mirror World, in Dr Jekyll's laboratory yard",
col: ["#1E1A22", "#E8D8C0"], gold: 14, keep: ["A sealed letter from Jekyll", "✉️"], rad: 9,
props: [["labbench", 0, -4, 0, {}, 2, { hw: 1.8, hd: 0.6, h: 1.1 }], ["lectern", 4, -3, 0, 1]],
who: [
{ n: "Dr Jekyll", who: "Dr Henry Jekyll, a respected London doctor hiding a terrible secret, polite but nervous",
o: { sex: "m", look: { layer: "suit", layerColor: 0x2A2A32, top: 0xF2EEE2, bottom: 0x2A2A32, neck: "bowtie", accColor: 0x1A1A1A, hair: 0x8A6A4A, hairStyle: "short" } }, at: [-2, -1], greet: "Utterson worries for me too much. I can be rid of Mr Hyde the moment I choose. I give you my hand on that.", c: 600 },
{ n: "Mr Utterson", who: "Gabriel Utterson, Jekyll's loyal, quiet lawyer, determined to find out who Mr Hyde is",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x3A3A3A, top: 0xF2EEE2, bottom: 0x3A3A3A, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x8A8A8A, hairStyle: "short" } }, at: [1.5, -1.5], greet: "If he be Mr Hyde, I shall be Mr Seek. Will you help me?", c: 600 },
{ n: "Poole", who: "Poole, Dr Jekyll's faithful, frightened butler",
o: { sex: "m", look: { layer: "suit", layerColor: 0x1A1A1A, top: 0xF2EEE2, bottom: 0x1A1A1A, hands: "gloves", hair: 0xC8C8C8, hairStyle: "short" } }, at: [4, -2], greet: "Sir, there's something wrong with the master. That voice behind the door isn't his." }
],
steps: [
{ k: "find", w: 1, t: "Help Utterson gather the clues: five things in the yard that link Hyde to Jekyll.", n: 5, look: "page", col: 0xE8D0A0, r: 24, secs: 240, name: "a clue", done: "A cheque signed by Jekyll, a key to his back door, and letters in the same handwriting, only sloped differently..." },
{ k: "choose", w: 1, t: "Utterson asks: \"So who is Mr Hyde?\"", o: [
["Jekyll himself, changed by a potion he made", 1, "That's the secret of the book. Jekyll's potion separates his bad side into Mr Hyde, and in the end he can't change back."],
["Poole the butler", 0, "Poole is loyal to the end. Try again."],
["Jekyll's twin brother", 0, "There is no twin. Try again."]
] }
],
qs: [["Who wrote Strange Case of Dr Jekyll and Mr Hyde?", "Robert Louis Stevenson", "Bram Stoker", "H. G. Wells"],
["Stevenson also wrote which adventure book?", "Treasure Island", "Moby-Dick", "Dracula"],
["In which city does the story take place?", "London", "Paris", "Edinburgh"],
["People still say 'Jekyll and Hyde' about someone who...", "Has two very different sides", "Is a good doctor", "Loves chemistry"]] });
ctTale({ id: "invisible", host: "land:mirror", t: "The Invisible Man", by: "H. G. Wells, 1897", where: "the Mirror World, outside the Coach and Horses inn of Iping",
col: ["#2A2A2A", "#F2EEE2"], gold: 14, keep: ["Griffin's blue spectacles", "🕶️"], rad: 8,
props: [["innsign", 0, -4, 0, {}, 1], ["bench", -3, -4, 0, 1], ["bench", 3, -4, 0, 1]],
who: [
{ n: "Griffin", who: "Griffin, a brilliant, bad-tempered scientist who has made himself invisible and can't undo it; wrapped in bandages, goggles and gloves",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x3A3228, top: 0xF2EEE2, bottom: 0x3A3228, hat: "brimmed", hatColor: 0x2A2420, hands: "gloves", face: "sunglasses", skin: 0xF2EEE6, neck: "scarf", accColor: 0x8A8A8A } }, at: [-2, -1], greet: "Leave me alone! I have work to do. ...What are you staring at? Never seen bandages before?", c: 550 },
{ n: "Mrs Hall", who: "Mrs Hall, landlady of the Coach and Horses inn at Iping, curious and suspicious of her strange guest",
o: { sex: "f", look: { topKind: "dress", top: 0x6A4A6A, bottom: 0x6A4A6A, layer: "apron", layerColor: 0xF2EEE2, hat: "hood", hatColor: 0xF2EEE2, hair: 0x8A6A4A, hairStyle: "bun" } }, at: [2, -1.5], greet: "He came in the snow, wrapped up from head to foot, and paid two sovereigns. But the things I've heard from his room!", c: 350 }
],
steps: [
{ k: "find", w: 1, t: "Griffin has slipped out of his clothes and gone! But he can't hide his footprints. Follow the five bare footprints he's left.", n: 5, look: "print", col: 0xC8D8E8, r: 26, secs: 220, name: "a footprint", done: "Found him, by his footprints and a sneeze! Invisible, yes, but he still has to eat, keep warm and leave tracks." },
{ k: "choose", w: 0, t: "Griffin grumbles: \"Do you know what makes a thing invisible in my book?\"", o: [
["Changing it so it bends light exactly as air does", 1, "That's Wells's idea: if your body had the same 'refractive index' as air, light would pass straight through. Real scientists have made tiny 'cloaks' that bend some light round small objects."],
["Painting it white", 0, "You'd be very visible. Try again."],
["Standing very still", 0, "Only in hide-and-seek! Try again."]
] }
],
qs: [["Who wrote The Invisible Man?", "H. G. Wells", "Jules Verne", "Mary Shelley"],
["What is the Invisible Man's name?", "Griffin", "Hyde", "Nemo"],
["Why do we see most things?", "Light bounces off them into our eyes", "They give off heat", "They make sounds"],
["Wells also wrote...", "The Time Machine", "Treasure Island", "Alice in Wonderland"]] });
ctTale({ id: "sleepyhollow", host: "land:dead", t: "The Legend of Sleepy Hollow", by: "Washington Irving, 1820", where: "the Land of the Dead, on the haunted road to the church bridge",
col: ["#2A1A0E", "#F2B858"], gold: 16, keep: ["A smashed pumpkin piece", "🎃"], rad: 10,
props: [["pumpkins", -5, -2, 0, {}, 1.5], ["churchbridge", 6, -6, 0.4, {}, 3], ["deadtree", -7, -7, 0, 0.6]],
who: [
{ n: "Ichabod Crane", who: "Ichabod Crane, the tall, skinny, nervous schoolmaster of Sleepy Hollow who believes every ghost story",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x3A3A2A, top: 0xF2EEE2, bottom: 0x3A3A2A, hat: "tophat", hatColor: 0x2A2A22, hair: 0x8A6A4A, hairStyle: "short", build: 0.9 } }, at: [-2, -1], greet: "Th-they say a Hessian trooper rides these roads at night, looking for the head he lost to a cannon-ball. Nonsense, of course. Of course.", c: 500 },
{ n: "Katrina Van Tassel", who: "Katrina Van Tassel, the rich farmer's cheerful daughter whom Ichabod and Brom both want to marry",
o: { sex: "f", look: { topKind: "dress", top: 0x3A6AA8, bottom: 0x3A6AA8, layer: "apron", layerColor: 0xF2EEE2, hair: 0xE8C870, hairStyle: "braids" } }, at: [1.5, -1.5], greet: "Father's party was lovely, wasn't it? Mind the road home, Mr Crane. Brom has been telling ghost stories again.", c: 400 },
{ n: "Brom Bones", who: "Brom Van Brunt, called Brom Bones, the big, boastful, prank-loving rider of Sleepy Hollow",
o: { sex: "m", look: { layer: "vest", layerColor: 0x6A4A2A, top: 0xE8DCC0, bottom: 0x4A3A2A, hat: "cowboy", hatColor: 0x4A3A2A, hair: 0x2A1A12, hairStyle: "curly", shoeKind: "boots" } }, at: [4.5, -2], greet: "Ha! The Horseman? I raced him once, for a bowl of punch. He'd have won, too, but he vanished at the church bridge.", c: 450 },
{ n: "The Headless Horseman", who: "the Headless Horseman of Sleepy Hollow, a silent rider; he never speaks", make: "horseman", at: [-6, -6], greet: "(The rider says nothing. He has no head to say it with.)" }
],
steps: [
{ k: "say", w: 2, t: "Brom: \"The Horseman can't cross running water. Get over the church bridge and you're safe. Ride!\"" },
{ k: "run", w: 0, t: "The Headless Horseman is coming! Run through every ring to the church bridge before he catches you. Don't let him reach you.", n: 6, r: 30, secs: 120, chase: { make: "horseman", speed: 4.8, wait: 5 }, done: "Over the bridge! In the story the rider hurled his 'head' at Ichabod: next morning they found Ichabod's hat... and a smashed pumpkin. Brom Bones always laughed when anyone mentioned pumpkins." },
{ k: "choose", w: 1, t: "Katrina asks: \"Who do YOU think the Headless Horseman really was?\"", o: [
["Probably Brom Bones in disguise, playing a trick", 1, "That's what Irving hints: Brom married Katrina, and always looked knowing when the story was told. But Irving leaves it a mystery on purpose."],
["A real ghost, for certain", 0, "Irving never says for certain! Look at the clues: the pumpkin, and Brom's smile. Try again."],
["Ichabod himself", 0, "He was the one being chased! Try again."]
] }
],
qs: [["Who wrote The Legend of Sleepy Hollow?", "Washington Irving", "Edgar Allan Poe", "Mark Twain"],
["Sleepy Hollow is near which real river?", "The Hudson, in New York", "The Thames", "The Mississippi"],
["What was Ichabod Crane's job?", "Schoolmaster", "Blacksmith", "Sheriff"],
["What was found by the bridge the next morning?", "Ichabod's hat and a smashed pumpkin", "A sword", "A ghost's lantern"]] });
ctTale({ id: "dracula", host: "land:dead", t: "Dracula", by: "Bram Stoker, 1897", where: "the Land of the Dead, by Count Dracula's tomb",
col: ["#1A0E12", "#E8C8C8"], gold: 16, keep: ["A sprig of wild rose", "🌹"], rad: 9,
props: [["tomb", 0, -5, 0, 1, {}], ["graveyard", 0, -10, 0, 0.5, { solid: false }], ["brazier", -4, -4, 0, 0.8], ["brazier", 4, -4, 0, 0.8]],
who: [
{ n: "Professor Van Helsing", who: "Professor Abraham Van Helsing, Dutch doctor and scholar, kind, wise and stubborn, who knows the old lore of the vampire",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x3A3A3A, top: 0xF2EEE2, bottom: 0x3A3A3A, hat: "tophat", hatColor: 0x1A1A1A, hair: 0xC8C8C8, hairStyle: "short", beard: 1, waist: "satchel" } }, at: [-2.5, -1], greet: "My friend, we face a thing that is strong, cunning and old. But we have knowledge, and we have each other.", c: 600 },
{ n: "Mina Harker", who: "Mina Harker, a clever schoolmistress who types up everyone's diaries and works out where Dracula is going",
o: { sex: "f", look: { topKind: "dress", top: 0x4A3A5A, bottom: 0x4A3A5A, hair: 0x5A3A22, hairStyle: "bun", neck: "necklace" } }, at: [0, -1.5], greet: "I've put all our diaries and letters in order. When you read them together, his whole plan shows itself.", c: 450 },
{ n: "Jonathan Harker", who: "Jonathan Harker, a young English solicitor who visited Castle Dracula and barely escaped",
o: { sex: "m", look: { layer: "suit", layerColor: 0x4A4A3A, top: 0xF2EEE2, bottom: 0x4A4A3A, hair: 0x8A6A4A, hairStyle: "short" } }, at: [2.5, -1], greet: "I went to Transylvania to sell the Count a house in London. I saw him climb down the castle wall face first, like a lizard.", c: 450 },
{ n: "Count Dracula", who: "Count Dracula as Bram Stoker described him: a tall old man, clean-shaven except for a long white moustache, dressed all in black, very polite and very dangerous",
o: { sex: "m", look: { topKind: "coat", top: 0x1A1A1A, bottom: 0x1A1A1A, hair: 0xE8E8E8, hairStyle: "short", skin: 0xE0D8D0 } }, at: [0, -8], greet: "Welcome to my house. Enter freely and of your own will.", c: 650 }
],
steps: [
{ k: "choose", w: 0, t: "Van Helsing asks: \"In Stoker's book, what can Dracula NOT do?\"", o: [
["Cross running water by himself, or enter a home unless invited", 1, "Right. And in the book sunlight doesn't destroy him: it only weakens his powers at noon. That came later, from films."],
["Stand in daylight at all", 0, "In the book he walks around London in daylight! The films changed that. Try again."],
["Climb walls", 0, "Jonathan saw him do exactly that. Try again."]
] },
{ k: "find", w: 1, t: "Mina's plan: lay a sprig of wild rose (Van Helsing says it keeps a vampire in his coffin) on each of Dracula's five boxes of earth hidden round the graves.", n: 5, look: "rose", col: 0xE85A6A, r: 26, secs: 240, name: "a box of earth", done: "Every box is sealed. In the book Dracula brought 50 boxes of his native soil to England; the heroes hunt them down one by one." },
{ k: "choose", w: 2, t: "Jonathan asks: \"Where did Bram Stoker set the start of the story?\"", o: [
["Transylvania, in the Carpathian Mountains (today in Romania)", 1, "Yes, and much of the rest happens in England, at Whitby and in London. Stoker himself was Irish and worked at a London theatre."],
["Scotland", 0, "No. Try again."],
["Egypt", 0, "No. Try again."]
] }
],
qs: [["Who wrote Dracula?", "Bram Stoker", "Mary Shelley", "Edgar Allan Poe"],
["Bram Stoker was born in which country?", "Ireland", "Romania", "America"],
["How is Dracula's story told in the book?", "Through diaries, letters and newspaper cuttings", "By Dracula himself", "As a play"],
["Which English seaside town does Dracula arrive at by ship?", "Whitby", "Brighton", "Dover"]] });
ctTale({ id: "thor", host: "land:frozen", t: "Thor at Utgard", by: "Norse myth (the Prose Edda, about 1220)", where: "the Frozen Realm, in the hall of the giant Utgard-Loki",
col: ["#1A2A3A", "#E8F0F8"], gold: 16, keep: ["Thor's drinking-horn tip", "📯"], rad: 11,
props: [["feasttable", 0, -5, 0, {}, 3, { hw: 3.6, hd: 0.8, h: 1 }], ["brazier", -5, -2, 0, 1], ["brazier", 5, -2, 0, 1], ["banner", -6, -7, 0, 0.7], ["banner", 6, -7, 0, 0.7]],
who: [
{ n: "Thor", who: "Thor, Norse god of thunder, strong, hot-tempered, honest and easily tricked", deity: "thor", at: [-2.5, -1], greet: "These giants think they can shame Thor? Bring on your contests!" },
{ n: "Loki", who: "Loki, the clever shape-changing trickster who travels with Thor", deity: "loki", at: [0, -1.5], greet: "Careful, friend. Everything in this hall is a trick. I should know: tricks are my trade." },
{ n: "Thjalfi", who: "Thjalfi, Thor's young servant, the fastest runner among humans",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0xE8DCC0, bottom: 0x5A4A32, hair: 0xE8C870, hairStyle: "short", shoeKind: "boots" } }, child: 1, at: [2.5, -1], greet: "I raced a giant called Hugi and lost three times! Nobody runs as fast as him.", c: 350 },
{ n: "Utgard-Loki", who: "Utgard-Loki, the giant king of Utgard, sly, enormous, a master of illusions", being: "frostgiant", s: 0.45, at: [0, -8], greet: "Is this tiny fellow the great Thor? Show us what you can do, little god." }
],
steps: [
{ k: "choose", w: 3, t: "Contest one: Thor tries to empty a drinking horn in three swallows, and the level barely drops. What was the horn's end really dipped in?", o: [
["The sea itself: Thor's drinking made the tides", 1, "Yes! Utgard-Loki confessed at the end: the horn reached the ocean. The old story explains the tides this way."],
["A barrel of mead", 0, "A barrel would be empty. Think bigger. Try again."],
["Melting snow", 0, "No. Try again."]
] },
{ k: "choose", w: 3, t: "Contest two: Thor can lift only one paw of the giant's grey cat. What was the cat?", o: [
["Jormungandr, the World Serpent, that circles the whole world", 1, "Right. Lifting even one paw of it terrified the giants."],
["A very heavy rock", 0, "Close, but stranger than that. Try again."],
["A sleeping bear", 0, "No. Try again."]
] },
{ k: "choose", w: 3, t: "Contest three: Thor wrestles an old woman named Elli and is forced down to one knee. Who was she?", o: [
["Old Age, which no one can beat", 1, "Exactly. 'Elli' means old age. Even Thor only went down to one knee."],
["Utgard-Loki's grandmother", 0, "That's what he said at first! The truth was cleverer. Try again."],
["A frost giant in disguise", 0, "Try again."]
] },
{ k: "run", w: 2, t: "Your turn: race Thjalfi's rival Hugi round the hall through every ring. (Hugi was really Thought, and nothing is faster than thought. But try!)", n: 6, r: 24, secs: 80, done: "Well run! The story says Hugi was Thought itself. You did better than Thjalfi." }
],
qs: [["Which day of the week is named after Thor?", "Thursday", "Tuesday", "Saturday"],
["Where were most Norse myths written down?", "Iceland", "Egypt", "Greece"],
["What was Thor's hammer called?", "Mjölnir", "Excalibur", "Gungnir"],
["What did the old Norse peoples call the World Tree?", "Yggdrasil", "Avalon", "Olympus"]] });
ctTale({ id: "odin", host: "land:frozen", t: "Odin at Mimir's Well", by: "Norse myth (the Eddas)", where: "the Frozen Realm, at Mimir's Well under a root of the World Tree",
col: ["#1A2230", "#D8E8F8"], gold: 12, keep: ["A carved rune-stick", "🪵"], rad: 8,
props: [["well", 0, -3, 0, 1], ["runestone", -4, -4, 0.4, 0.8], ["runestone", 4, -4, -0.4, 0.8]],
who: [
{ n: "Odin", who: "Odin, the All-father, chief of the Norse gods, who gave an eye for wisdom and hung on the World Tree to learn the runes", deity: "odin", at: [-1.5, -1], greet: "I gave an eye for one drink from this well. Wisdom costs. What will you pay for it, traveller? Only attention." },
{ n: "Mimir", who: "Mimir, the wisest of beings, guardian of the well of wisdom",
o: { sex: "m", look: { topKind: "robe", top: 0x5A6A7A, bottom: 0x5A6A7A, hair: 0xE8E8E8, hairStyle: "long", beard: 1, back: "cloak", backColor: 0x3A4A5A } }, at: [1.5, -1], greet: "The runes are not only letters. Each has a name, and each name means a thing. Learn them with me.", c: 450 }
],
steps: [
{ k: "say", w: 1, t: "Mimir: \"The oldest runes, the Elder Futhark, take their name from their first six letters: F, U, Th, A, R, K. Let me test you.\"" },
{ k: "choose", w: 1, t: "The rune ᚠ (fehu) sounds like F. What does its name mean?", o: [["Cattle, which meant wealth", 1, "Yes: fehu, cattle, wealth. Our word 'fee' comes from the same root."], ["Fire", 0, "Try again."], ["Fish", 0, "Try again."]] },
{ k: "code", w: 0, t: "Odin writes a word in runes: ᛟᛞᛁᚾ. Using ᛟ = O, ᛞ = D, ᛁ = I, ᚾ = N, what does it spell?", a: ["odin"], hint: "Read each rune in turn: O, D, I, N.", done: "That's my name, written as the Norse carvers wrote it on stones all over Scandinavia." }
],
qs: [["What did Odin give up for a drink from Mimir's well?", "One of his eyes", "His spear", "His horse"],
["What are the oldest runes called?", "The Elder Futhark", "The Latin alphabet", "Hieroglyphs"],
["Which day of the week is named after Odin (Woden)?", "Wednesday", "Monday", "Friday"],
["Odin's two ravens were called...", "Huginn and Muninn (Thought and Memory)", "Castor and Pollux", "Romulus and Remus"]] });
ctTale({ id: "frankenstein", host: "land:frozen", t: "Frankenstein", by: "Mary Shelley, 1818", where: "the Frozen Realm, beside Captain Walton's ship locked in the Arctic ice",
col: ["#22303A", "#E8F2F8"], gold: 16, keep: ["A page of Walton's letters", "📜"], rad: 13,
props: [["ship", 0, -10, Math.PI / 2, 0.45, {}], ["iceslabs", 0, -6, 0, {}, 3]],
who: [
{ n: "Captain Walton", who: "Robert Walton, an English explorer whose ship is trapped in Arctic ice, who writes the story in letters to his sister",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x2A3A5A, top: 0xF2EEE2, bottom: 0x2A3A5A, hat: "cap", hatColor: 0x2A3A5A, hair: 0x8A6A4A, hairStyle: "short", shoeKind: "boots", neck: "scarf", accColor: 0xA82A2A } }, at: [-3, -1], greet: "We pulled a half-frozen man from the ice yesterday. His name is Frankenstein, and his story... you must hear it.", c: 500 },
{ n: "Victor Frankenstein", who: "Victor Frankenstein, the young Swiss scientist who made a living being, then ran from it in horror, now exhausted and full of regret",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x4A3A2A, top: 0xE8E0D0, bottom: 0x4A3A2A, hair: 0x2A1A12, hairStyle: "waves", skin: 0xE8DCD0 } }, at: [0, -1.5], greet: "Learn from me, if not by my words, then by my example, how dangerous is the getting of knowledge without care.", c: 500 },
{ n: "The creature", who: "Frankenstein's creature as Mary Shelley wrote him: very tall, with flowing black hair and watery yellow eyes, who taught himself to read and speaks gently and eloquently, lonely and hurt by everyone's fear. Never the flat-headed film monster.",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x3A3228, top: 0x6A5A4A, bottom: 0x3A3228, hair: 0x0E0E10, hairStyle: "long", skin: 0xC8C0A0, build: 1.2 }, scale: 1.18 }, at: [3.5, -2], greet: "I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous. Will you listen?", c: 550 }
],
steps: [
{ k: "say", w: 2, t: "The creature: \"I learned to speak by listening at a cottage wall. I read Paradise Lost and Plutarch. Everyone who saw me ran or struck me. Even my maker.\"" },
{ k: "choose", w: 2, t: "The creature asks: \"What did I ask Victor to make for me?\"", o: [
["A companion, someone like him, so he would not be alone", 1, "Yes. Victor began, then destroyed the work. That was when the story turned to tragedy."],
["A crown", 0, "No: he wanted company, not power. Try again."],
["A ship home", 0, "Not in the book. Try again."]
] },
{ k: "choose", w: 0, t: "Walton asks: \"So who is the real monster of this story?\"", o: [
["There's no simple answer: the book asks us to think about responsibility and kindness", 1, "That's why the book is still read 200 years on. Mary Shelley wrote it at 18, during a ghost-story contest by Lake Geneva in 1816."],
["Only the creature", 0, "Many readers feel Victor, who abandoned him, shares the blame. Try again."],
["Captain Walton", 0, "Walton only listens. Try again."]
] }
],
qs: [["How old was Mary Shelley when she began Frankenstein?", "18", "40", "12"],
["What is the creature's name in the book?", "He has no name", "Frankenstein", "Adam Smith"],
["Where does the book begin and end?", "In the Arctic ice", "In a castle in Transylvania", "In London"],
["Frankenstein is often called one of the first...", "Science-fiction novels", "Detective stories", "Fairy tales"]] });
ctTale({ id: "wukong", host: "land:fire", t: "Journey to the West: the Flaming Mountains", by: "Wu Cheng'en, 1592", where: "the Burning Lands, before the Flaming Mountains",
col: ["#5A1A0E", "#FFE0A0"], gold: 16, keep: ["A palm-leaf fan", "🪭"], rad: 11,
props: [["flamemount", 0, -10, 0, {}, 4], ["tent", 6, -3, -0.5, 0.6]],
who: [
{ n: "Sun Wukong", who: "Sun Wukong, the Monkey King, born from a stone, cheeky, boastful, brave and loyal to his master, who knows 72 transformations", deity: "sunwukong", at: [-2.5, -1], greet: "Ha! Old Monkey has fought the armies of Heaven! A few burning mountains? Easy. ...Well. Mostly easy.", c: 0 },
{ n: "Tang Sanzang", who: "Tang Sanzang, the gentle Buddhist monk travelling west to India to bring back holy scriptures",
o: { sex: "m", look: { topKind: "robe", top: 0xE8A030, bottom: 0xE8A030, back: "cape", backColor: 0xC83A2A, hair: 0x2A1A12, hairStyle: "bald", hat: "crown", hatColor: 0xE8B83A } }, at: [0, -1.5], greet: "Amitabha. The road west is long. We cannot pass until these mountains stop burning.", c: 500 },
{ n: "Zhu Bajie", who: "Zhu Bajie, Pigsy, the greedy, lazy, funny pig-faced disciple who carries a rake", being: "pig", s: 1.2, at: [2.5, -1], greet: "Can we have lunch first? Rescuing things is hungry work." },
{ n: "Sha Wujing", who: "Sha Wujing, Sandy, the quiet, dependable river-ogre disciple",
o: { sex: "m", look: { topKind: "robe", top: 0x3A4A6A, bottom: 0x3A4A6A, skin: 0x6A7A8A, hair: 0xA82A2A, hairStyle: "short", beard: 1, neck: "necklace" } }, at: [4.5, -2], greet: "Big brother Wukong will think of something. He always does.", c: 450 },
{ n: "Princess Iron Fan", who: "Princess Iron Fan, owner of the magic palm-leaf fan that can put out the Flaming Mountains, angry with Wukong",
o: { sex: "f", look: { topKind: "dress", top: 0xC83A6A, bottom: 0xC83A6A, back: "cape", backColor: 0x5A1A2A, hair: 0x1A1210, hairStyle: "bun", hat: "tiara", hatColor: 0xE8B83A } }, at: [6, 1], greet: "My fan? Lend it to YOU, Monkey? After what you did to my son? Never!", c: 550 }
],
steps: [
{ k: "choose", w: 4, t: "Princess Iron Fan gives Wukong a fan... but the flames only grow higher! What happened?", o: [
["She gave him a fake fan", 1, "Yes! The first fan was a fake. Wukong has to trick her to get the real one."],
["He waved it the wrong way", 0, "Good guess, but she tricked him. Try again."],
["The fan was too small", 0, "The real one can shrink to the size of an apricot leaf! Try again."]
] },
{ k: "choose", w: 0, t: "How does Wukong get the real fan in the story?", o: [
["He changes into a tiny insect, slips into her tea, and makes her give it up", 1, "That's the Monkey King: 72 transformations and not a drop of shame. The princess hands it over at once."],
["He buys it", 0, "Monkey never pays! Try again."],
["He asks politely", 0, "He tried that. Try again."]
] },
{ k: "find", w: 0, t: "Now fan out the fires! Walk up to each of the six flames burning on the slope and fan it out.", n: 6, look: "flame", col: 0xFF8A3A, r: 28, secs: 240, name: "a flame", done: "Forty-nine fans and the fires go out for good. In the book, rain falls, and the pilgrims walk on west." }
],
qs: [["Journey to the West is one of China's four great...", "Classical novels", "Temples", "Rivers"],
["How was Sun Wukong born?", "From a stone", "From an egg", "From a cloud"],
["Where were the pilgrims going?", "India, to bring back Buddhist scriptures", "Japan, to find gold", "The Moon"],
["The real Tang Sanzang (Xuanzang) lived in which century?", "The 600s", "The 1800s", "The 100s BC"]] });
ctTale({ id: "laputa", host: "land:stars", t: "Gulliver's Travels: Laputa, the Flying Island", by: "Jonathan Swift, 1726", where: "Among the Stars, on the astronomers' terrace of Laputa",
col: ["#1A1A3A", "#E8E0FF"], gold: 14, keep: ["A Laputan star-chart", "🗺️"], rad: 10,
props: [["telescope", -3, -5, 0, {}, 1.2], ["telescope", 3, -5, 0.6, {}, 1.2], ["orrery", 0, -8, 0, 0.5]],
who: [
{ n: "Lemuel Gulliver", who: "Lemuel Gulliver, ship's surgeon and traveller, astonished by the flying island",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x5A3A2A, top: 0xF2EEE2, bottom: 0x5A3A2A, hat: "brimmed", hatColor: 0x2A2420, hair: 0x8A6A4A, hairStyle: "ponytail", shoeKind: "boots" } }, at: [-2.5, -1], greet: "An island in the air! It floats on a great lodestone, a magnet, and they steer it by tilting the stone.", c: 500 },
{ n: "The King of Laputa", who: "the King of Laputa, who thinks only about mathematics, music and the stars and needs a flapper to remind him to listen",
o: { sex: "m", look: { topKind: "robe", top: 0x2A3A8A, bottom: 0x2A3A8A, hat: "crown", hatColor: 0xE8B83A, hair: 0xC8C8C8, hairStyle: "long", beard: 1, back: "cape", backColor: 0xE8E0FF } }, at: [0, -2], greet: "...the square on the hypotenuse is... oh. A visitor. My flapper must have tapped me. Speak, but briefly, and preferably in numbers.", c: 700 },
{ n: "A flapper", who: "a Laputan flapper, a servant who taps lost-in-thought people with a bladder on a stick to make them notice things",
o: { sex: "f", look: { layer: "tunic", layerColor: 0x8A6AC8, top: 0xE8E0FF, bottom: 0x4A3A6A, hair: 0x2A1A12, hairStyle: "bun" } }, at: [2.5, -1], greet: "(tap tap) Pardon me! Everyone here is so deep in thought, I have to tap them so they don't walk off the edge.", c: 350 },
{ n: "Astronomer of Laputa", who: "a Laputan astronomer, brilliant about stars, hopeless at practical things",
o: { sex: "m", look: { topKind: "robe", top: 0x3A2A5A, bottom: 0x3A2A5A, hat: "wizard", hatColor: 0x3A2A5A, face: "glasses", hair: 0xD8D8D8, beard: 1 } }, at: [-3, -6], greet: "We have found two little moons going round Mars! ...You don't believe me? Ask your own astronomers in 150 years." }
],
steps: [
{ k: "choose", w: 3, t: "The astronomer asks: \"In 1726 Swift wrote that Mars has two small moons. When did real astronomers find them?\"", o: [
["In 1877, more than 150 years later", 1, "Yes! Asaph Hall found Phobos and Deimos in 1877. Swift had guessed; it was a lucky guess, and still famous."],
["The same year", 0, "No telescope could see them then. Try again."],
["They don't exist", 0, "They do: Phobos and Deimos. Try again."]
] },
{ k: "find", w: 2, t: "The King has lost his star-chart pages again. Find the five pages before they float off the island.", n: 5, look: "star", col: 0xC8D8FF, r: 26, secs: 220, name: "a star-chart page", done: "(tap tap) \"Thank you,\" says the King, who has already forgotten you were here." },
{ k: "choose", w: 0, t: "Gulliver asks: \"What keeps Laputa floating, in Swift's book?\"", o: [
["A giant magnet (lodestone) pushing against the magnetism of the land below", 1, "That's Swift's idea. Real magnets can make things float: maglev trains do it!"],
["Hot air", 0, "That's a balloon. Try again."],
["Wings", 0, "No wings on Laputa. Try again."]
] }
],
qs: [["Who wrote Gulliver's Travels?", "Jonathan Swift", "Daniel Defoe", "Charles Dickens"],
["What were the tiny people in Gulliver's first voyage called?", "The Lilliputians", "The Laputans", "The Yahoos"],
["What are the two moons of Mars?", "Phobos and Deimos", "Io and Europa", "Titan and Rhea"],
["Swift wrote the book partly to...", "Poke fun at people and governments of his day", "Teach astronomy", "Sell telescopes"]] });
ctTale({ id: "martians", host: "land:wasteland", t: "The War of the Worlds", by: "H. G. Wells, 1898", where: "the Wasteland, at the sand pit where the Martian cylinder fell",
col: ["#3A2418", "#F2D0A8"], gold: 16, keep: ["A dried red-weed frond", "🥀"], rad: 13,
props: [["cylinder", 0, -7, 0.3, {}, 4, { r: 3, h: 3 }], ["tripod", -8, -6, 0.8, {}, 4]],
who: [
{ n: "The narrator", who: "the narrator of The War of the Worlds, a writer from Woking who saw the Martians land and survived",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x5A4A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, hat: "brimmed", hatColor: 0x3A3228, hair: 0x8A6A4A, hairStyle: "short", beard: 1 } }, at: [-2.5, -1], greet: "It fell on Horsell Common like a falling star. We all came out to look. Nobody thought it could be dangerous.", c: 450 },
{ n: "The artilleryman", who: "the artilleryman, a soldier who survived and makes big, boastful plans to live underground",
o: { sex: "m", look: { layer: "uniform", layerColor: 0x2A3A5A, top: 0xE8DCC0, bottom: 0x2A3A5A, hat: "cap", hatColor: 0x2A3A5A, hair: 0x5A3A22, hairStyle: "short", shoeKind: "boots" } }, at: [0, -1.5], greet: "We'll live in the drains, I tell you! Build a new world down there! ...Once I've had a bit of a rest.", c: 450 },
{ n: "Ogilvy the astronomer", who: "Ogilvy, the astronomer who first saw flashes on Mars and found the cylinder",
o: { sex: "m", look: { layer: "labcoat", top: 0xF2EEE2, bottom: 0x3A3A3A, face: "glasses", hair: 0xC8C8C8, hairStyle: "short" } }, at: [2.5, -1], greet: "I saw jets of gas on Mars through my telescope, night after night. Now... look at this thing. It's unscrewing itself!", c: 400 }
],
steps: [
{ k: "find", w: 0, t: "Red weed from Mars is creeping over everything. Gather five clumps of it for Ogilvy to study.", n: 5, look: "weed", col: 0xC83A2A, r: 30, secs: 240, name: "a clump of red weed", done: "The red weed is already withering. In the book it died off quickly; Earth's germs killed it too." },
{ k: "choose", w: 2, t: "Ogilvy asks: \"In the end, what defeated the Martians?\"", o: [
["Earth's bacteria, germs their bodies had never met", 1, "Yes! After all the armies failed, the tiniest living things on Earth beat them. Wells was writing just as scientists were learning about germs."],
["The army's cannons", 0, "The guns barely scratched them. Try again."],
["Rain", 0, "No. Think smaller. Try again."]
] },
{ k: "choose", w: 1, t: "The artilleryman asks: \"Why did Wells think Martians might be older and cleverer than us?\"", o: [
["People then thought Mars was an older, cooling world, so life there would have started sooner", 1, "That was the science of 1898. We now know Mars has no Martians, but robots and rovers are exploring it right now."],
["Because Mars is bigger", 0, "Mars is about half Earth's width. Try again."],
["Because it is red", 0, "The red is rust in its dust. Try again."]
] }
],
qs: [["Who wrote The War of the Worlds?", "H. G. Wells", "Jules Verne", "Isaac Asimov"],
["Why does Mars look red?", "Iron oxide (rust) in its dust", "It is very hot", "It is covered in red plants"],
["In the book, where do the Martians land first?", "Horsell Common, near Woking in England", "New York", "Paris"],
["What finally stopped the Martians?", "Earth's germs", "An earthquake", "A comet"]] });
ctTale({ id: "arabian", host: "land:desert", t: "The Arabian Nights", by: "One Thousand and One Nights (old Arabic, Persian and Indian tales)", where: "the Endless Desert, by the thieves' cave and Scheherazade's tent",
col: ["#4A2A12", "#FFE8B0"], gold: 16, keep: ["A little brass lamp", "🪔"], rad: 12,
props: [["cavedoor", 0, -9, 0, {}, 3, { hw: 3, hd: 1, h: 5 }], ["tent", -7, -3, 0.5, 0.7], ["cushions", -6, 0, 0, {}, 1.5], ["marketstall", 7, -3, -0.5, 0.8]],
who: [
{ n: "Scheherazade", who: "Scheherazade, the brave, brilliant storyteller who told the king a new story every night for a thousand and one nights",
o: { sex: "f", look: { topKind: "dress", top: 0x6A2A8A, bottom: 0x6A2A8A, layer: "kimono", layerColor: 0xE8B83A, hair: 0x1A1210, hairStyle: "long", hat: "tiara", hatColor: 0xE8B83A, neck: "necklace", skin: 0xB8865A } }, at: [-6, 1], greet: "Sit, and I will tell you of Ali Baba and the forty thieves. But stop me before dawn, or you'll never hear the end!", c: 600 },
{ n: "Ali Baba", who: "Ali Baba, a poor woodcutter who overheard the thieves' magic password",
o: { sex: "m", look: { topKind: "robe", top: 0xC8B898, bottom: 0x8A6A4A, hat: "bandana", hatColor: 0xE8E0D0, hair: 0x1A1210, beard: 1, skin: 0xB07A50, waist: "belt" } }, at: [-1.5, -1.5], greet: "I hid in a tree and heard the captain say the words. The rock opened! There was gold, silk, carpets...", c: 450 },
{ n: "Morgiana", who: "Morgiana, Ali Baba's clever servant girl, the real hero of the story, who outwits all forty thieves",
o: { sex: "f", look: { topKind: "dress", top: 0x2A8A8A, bottom: 0x2A8A8A, hat: "hood", hatColor: 0xE8B83A, hair: 0x1A1210, hairStyle: "braids", skin: 0xA06A44, ears: "earrings" } }, at: [1.5, -1.5], greet: "The thieves marked our door with chalk so they could find it at night. So I marked every door in the street the same way!", c: 500 },
{ n: "Aladdin", who: "Aladdin, a lazy, cheeky boy who becomes clever and brave, master of the magic lamp and the ring",
o: { sex: "m", look: { layer: "vest", layerColor: 0x6A3A8A, top: 0xF2EEE2, bottom: 0xD8C8A0, hat: "bandana", hatColor: 0xC83A2A, hair: 0x1A1210, hairStyle: "short", skin: 0xB07A50, waist: "belt" } }, at: [4.5, -2], greet: "Rub it gently. Well, not too gently. The genie in the lamp is grumpy before breakfast.", c: 450 },
{ n: "The genie of the lamp", who: "the genie (jinni) of the lamp, enormously powerful and bound to obey whoever holds the lamp", being: "genie", at: [6, -5], greet: "What do you want? I am ready to obey you as your slave, and the slave of all who hold the lamp." },
{ n: "Sinbad the Sailor", who: "Sinbad the Sailor of Baghdad, who made seven voyages and met the roc, the Old Man of the Sea and a whale he took for an island",
o: { sex: "m", look: { layer: "vest", layerColor: 0x2A4A8A, top: 0xF2EEE2, bottom: 0x2A4A8A, hat: "bandana", hatColor: 0xE8E0D0, hair: 0x1A1210, beard: 1, skin: 0xA87048, waist: "belt", shoeKind: "boots" } }, at: [8, 0], greet: "Seven voyages, friend, and every one went wrong! Once we landed on an island, lit a fire... and the island was a whale.", c: 500 }
],
steps: [
{ k: "find", w: 2, t: "Morgiana's trick: the thieves chalked a cross on Ali Baba's door. Find the five other doors in the market and chalk the same mark on each, so the thieves can't tell which is his.", n: 5, look: "chalk", col: 0xF2F2F2, r: 30, secs: 220, name: "a door to chalk", done: "Every door has the same mark! The thieves' captain is baffled. Morgiana saves Ali Baba again and again in the story." },
{ k: "code", w: 1, t: "Ali Baba stands before the rock. \"What were the words that open it?\" (Type them.)", a: ["open sesame", "opensesame", "open, sesame"], hint: "Sesame is a little seed. Ask the rock to OPEN, by name.", done: "The rock rolls aside. Ali Baba's greedy brother forgot the words and called out every other grain instead: 'Open, Barley!'" },
{ k: "choose", w: 4, t: "Aladdin holds the lamp. The genie waits. What does Aladdin wish for first, in the old story?", o: [
["Something to eat: he and his mother were hungry", 1, "Yes: the genie brings a feast on silver dishes, and they sell the dishes to live on. Aladdin starts small and sensible!"],
["To rule the world", 0, "Not at first. Try again."],
["To be a genie himself", 0, "No. Try again."]
] }
],
qs: [["Why did Scheherazade tell a new story every night?", "So the king would want to hear the ending and spare her", "To win a prize", "To help him sleep"],
["How many thieves were there in Ali Baba's story?", "Forty", "Seven", "A thousand"],
["The stories were first told in which languages?", "Arabic, Persian and others", "English", "Latin"],
["Which giant bird does Sinbad meet?", "The roc", "The phoenix", "The griffin"]] });
ctTale({ id: "gilgamesh", host: "land:desert", t: "The Epic of Gilgamesh", by: "ancient Mesopotamia, about 2100-1200 BC", where: "the Endless Desert, before the clay tablets of Uruk",
col: ["#5A3A1E", "#F8E8C8"], gold: 12, keep: ["A clay tablet fragment", "🧱"], rad: 8,
props: [["tablets", 0, -4, 0, {}, 2], ["statue", -4, -6, 0, 0.7], ["statue", 4, -6, 0, 0.7]],
who: [
{ n: "Gilgamesh", who: "Gilgamesh, king of Uruk, two-thirds god and one-third man, proud at first, who learns wisdom after losing his friend",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xC8A040, top: 0xE8DCC0, bottom: 0x8A5A2A, hat: "crown", hatColor: 0xE8B83A, hair: 0x1A1210, hairStyle: "curly", beard: 1, skin: 0xA87048, shoeKind: "sandals" } }, at: [-2, -1], greet: "I built the walls of Uruk. Climb them, walk them: look at the brickwork. That is what lasts.", c: 600 },
{ n: "Enkidu", who: "Enkidu, the wild man made by the gods as Gilgamesh's equal, who became his dearest friend",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0x8A6A4A, bottom: 0x6A5A3A, hair: 0x3A2414, hairStyle: "long", beard: 1, skin: 0x9A6A44 } }, at: [1, -1.5], greet: "I lived with the gazelles once. Then I wrestled the king, and neither of us won, so we became brothers.", c: 450 },
{ n: "Utnapishtim", who: "Utnapishtim, the man who survived the great flood by building a boat, and was given everlasting life",
o: { sex: "m", look: { topKind: "robe", top: 0xE8E0D0, bottom: 0xE8E0D0, hair: 0xF0F0F0, hairStyle: "long", beard: 1, skin: 0xA87048 } }, at: [4, -2], greet: "The gods sent a flood. I built a great boat, took in every kind of creature, and sent out a dove, a swallow and a raven to find land." }
],
steps: [
{ k: "choose", w: 2, t: "Utnapishtim asks: \"Which bird did I send out that did NOT come back, because it had found dry land?\"", o: [["The raven", 1, "Yes. The dove and swallow returned; the raven found land and stayed away."], ["The dove", 0, "The dove came back. Try again."], ["The eagle", 0, "No eagle in this story. Try again."]] },
{ k: "find", w: 0, t: "Gather the five broken pieces of the twelfth tablet, scattered in the sand.", n: 5, look: "tablet", col: 0xD8B888, r: 24, secs: 220, name: "a tablet piece", done: "The tablets are whole again. The real ones were found in 1853 in the ruins of a great library at Nineveh, in today's Iraq." }
],
qs: [["The Epic of Gilgamesh is one of the oldest...", "Written stories in the world", "Paintings in the world", "Songs ever recorded"],
["What were its tablets made of?", "Clay", "Paper", "Bronze"],
["What kind of writing was it written in?", "Cuneiform (wedge-shaped marks)", "Hieroglyphs", "Runes"],
["Where was ancient Mesopotamia?", "Mostly in today's Iraq", "In Egypt", "In Greece"]] });
ctTale({ id: "columbiad", host: "land:station", t: "From the Earth to the Moon", by: "Jules Verne, 1865", where: "the Orbital, beside the Columbiad cannon of the Baltimore Gun Club",
col: ["#1A1E2A", "#E8ECF8"], gold: 14, keep: ["A Gun Club medal", "🎖️"], rad: 10,
props: [["columbiad", 0, -6, 0, {}, 3, { r: 2.4, h: 6 }], ["shell", -5, -3, 0, {}, 1]],
who: [
{ n: "Impey Barbicane", who: "Impey Barbicane, cool-headed president of the Baltimore Gun Club, who plans to fire a shell to the Moon",
o: { sex: "m", look: { layer: "suit", layerColor: 0x2A2A3A, top: 0xF2EEE2, bottom: 0x2A2A3A, hat: "tophat", hatColor: 0x1A1A1A, hair: 0x8A8A8A, hairStyle: "short", beard: 1 } }, at: [-2.5, -1], greet: "Gentlemen, we shall send a projectile to the Moon! All it needs is enough speed.", c: 550 },
{ n: "Captain Nicholl", who: "Captain Nicholl, Barbicane's rival, who makes armour plate and bets the cannon will fail",
o: { sex: "m", look: { layer: "uniform", layerColor: 0x3A3A5A, top: 0xF2EEE2, bottom: 0x3A3A5A, hat: "cap", hatColor: 0x3A3A5A, hair: 0x2A2A2A, hairStyle: "short", beard: 1 } }, at: [0, -1.5], greet: "I'll bet you five thousand dollars it never leaves the barrel.", c: 500 },
{ n: "Michel Ardan", who: "Michel Ardan, a cheerful, fearless Frenchman who insists on riding inside the shell",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x8A3A2A, top: 0xF2EEE2, bottom: 0x3A3A3A, hair: 0xC8642A, hairStyle: "curly", beard: 1, neck: "scarf", accColor: 0xE8B83A } }, at: [2.5, -1], greet: "A shell to the Moon? Then put me inside it! Who would miss such a voyage?", c: 500 }
],
steps: [
{ k: "choose", w: 0, t: "Barbicane asks: \"How fast must something go to escape Earth's pull and coast to the Moon?\"", o: [["About 11 kilometres a second", 1, "Right: about 11.2 km/s, 'escape velocity'. Verne's number was close, about 11 km/s."], ["About 100 kilometres an hour", 0, "That's a fast car, not a moon shot. Try again."], ["The speed of light", 0, "Far too fast! Try again."]] },
{ k: "choose", w: 2, t: "Ardan asks: \"Verne launched from Florida. Where did Apollo 11 launch from, 104 years later?\"", o: [["Florida too, at Cape Kennedy", 1, "Yes! Verne chose Florida because it's close to the equator, the same reason NASA did. His shell even splashed down in the Pacific, like Apollo."], ["Alaska", 0, "Too far from the equator. Try again."], ["Paris", 0, "Try again."]] },
{ k: "find", w: 1, t: "Nicholl bets you can't do it: collect the five lost bags of guncotton from the gantries before the launch.", n: 5, look: "orb", col: 0xE8E8C8, r: 24, secs: 200, name: "a bag of guncotton", done: "Nicholl pays up. (A real cannon launch would crush the passengers flat: that's why we use rockets, which push gently for longer.)" }
],
qs: [["What is 'escape velocity' from Earth?", "About 11.2 km per second", "About 1 km per second", "About 300,000 km per second"],
["Why do we use rockets instead of cannons for people?", "Rockets speed up gently; a cannon's jolt would kill", "Cannons are too expensive", "Rockets are quieter"],
["When did people first land on the Moon?", "1969", "1865", "2001"],
["Jules Verne is often called a father of...", "Science fiction", "The telephone", "The railway"]] });
ctTale({ id: "timemachine", host: "land:future", t: "The Time Machine", by: "H. G. Wells, 1895", where: "the City to Come, in the year 802,701, by the White Sphinx",
col: ["#2A2A1E", "#F8F2D8"], gold: 16, keep: ["A white flower from Weena", "🌸"], rad: 11,
props: [["timemachine", -3, -4, 0.3, {}, 1.5, { r: 1, h: 1.5 }], ["whitesphinx", 3, -9, 0, {}, 3, { r: 2.4, h: 6 }]],
who: [
{ n: "The Time Traveller", who: "the Time Traveller, an inventive English gentleman scientist who built a machine to travel through time",
o: { sex: "m", look: { layer: "suit", layerColor: 0x6A5A4A, top: 0xF2EEE2, bottom: 0x6A5A4A, hair: 0x8A6A4A, hairStyle: "waves", neck: "bowtie", accColor: 0x2A2A2A } }, at: [-2, -1], greet: "The year eight hundred and two thousand, seven hundred and one! And someone has dragged my machine into the Sphinx!", c: 600 },
{ n: "Weena", who: "Weena, a small, gentle Eloi girl who follows the Time Traveller everywhere and gives him flowers",
o: { sex: "f", look: { topKind: "robe", top: 0xF8F4F0, bottom: 0xF8F4F0, hair: 0xE8D8A8, hairStyle: "long", hat: "flowercrown", hatColor: 0xF8F8F8 }, scale: 0.85 }, at: [1, -1], greet: "(Weena laughs, and gives you a white flower. The Eloi speak softly, and only a little.)", c: 400 },
{ n: "An Eloi", who: "one of the Eloi, the gentle, playful, small people of the far future who are afraid of the dark",
o: { sex: "m", look: { topKind: "robe", top: 0xE8F0E0, bottom: 0xE8F0E0, hair: 0xE8D8A8, hairStyle: "curly" }, scale: 0.85 }, at: [3, -2], wander: 4, greet: "(The Eloi smiles and points at the sky. Then at the darkening wells. Then he shivers.)" },
{ n: "A Morlock", who: "a Morlock: a pale, big-eyed underground creature of the far future that hates light; it does not speak", being: "mutant", at: [7, -7], greet: "(Pale eyes blink at you from the shade, and it backs away from the light.)" }
],
steps: [
{ k: "find", w: 0, t: "The machine's levers are gone! The Morlocks hid them. Find the five lost parts round the Sphinx (stay in the light).", n: 5, look: "lever", col: 0xE8C870, r: 28, secs: 240, name: "a lever", done: "You have them all. The Time Traveller fixes the levers in place." },
{ k: "choose", w: 0, t: "The Time Traveller asks: \"What happened to humans, by the year 802,701, in my story?\"", o: [
["They split into two kinds: the Eloi above and the Morlocks below", 1, "That's Wells's warning: a world divided between the idle rich and the hard-working poor, taken to its extreme."],
["They all moved to Mars", 0, "Not in this book. Try again."],
["Nothing changed at all", 0, "Everything changed. Try again."]
] },
{ k: "choose", w: 1, t: "Weena tugs your sleeve. The Time Traveller returned with two strange white flowers in his pocket. Why do they matter?", o: [
["They are the only proof he brought back that it was all real", 1, "Yes. The book ends with his friend holding Weena's flowers and wondering."],
["They are magic", 0, "No magic, just proof. Try again."],
["They power the machine", 0, "No. Try again."]
] }
],
qs: [["Who wrote The Time Machine?", "H. G. Wells", "Jules Verne", "Mary Shelley"],
["What are the two kinds of people in the year 802,701?", "The Eloi and the Morlocks", "The Selenites and the Martians", "The Lilliputians and the Laputans"],
["What is the 'fourth dimension' in the book?", "Time", "Height", "Colour"],
["Wells's book made which phrase famous?", "Time machine", "Rocket ship", "Robot"]] });
ctTale({ id: "egypt", host: "land:templerow", t: "The Weighing of the Heart", by: "ancient Egyptian myth (the Book of the Dead)", where: "Temple Row, in the Hall of the Two Truths",
col: ["#1E2A4A", "#F8E0A0"], gold: 16, keep: ["A little scarab charm", "🪲"], rad: 10,
props: [["scales", 0, -4, 0, {}, 1.5, { r: 1, h: 2.5 }], ["statue", -6, -7, 0, 0.8], ["statue", 6, -7, 0, 0.8], ["throne", 0, -9, 0, 1]],
who: [
{ n: "Anubis", who: "Anubis, jackal-headed god of embalming, who guides the dead and holds the scales", deity: "anubis", at: [-2, -2], greet: "Come. Your heart will be weighed against the feather of Ma'at. Do not be afraid, if you have lived well." },
{ n: "Thoth", who: "Thoth, ibis-headed god of writing, wisdom and the moon, who writes down the result", deity: "thoth", at: [2, -2], greet: "I invented writing. Shall I teach you to write your name the old way, in pictures?" },
{ n: "Ma'at", who: "Ma'at, goddess of truth, balance and order, whose feather is the weight of truth", deity: "maat", at: [-4, -5], greet: "Truth, fairness, balance. That is all the feather asks of you." },
{ n: "Osiris", who: "Osiris, green-skinned god-king of the afterlife, judge of the dead", deity: "osiris", at: [0, -9], greet: "Those who pass the weighing walk in the Field of Reeds." },
{ n: "Isis", who: "Isis, great goddess of magic and healing, wife of Osiris", deity: "isis", at: [4, -5], greet: "I gathered Osiris back together when he was lost. Love is a magic too." }
],
steps: [
{ k: "choose", w: 0, t: "Anubis asks: \"On the other pan of the scales, what is your heart weighed against?\"", o: [["The feather of Ma'at, the feather of truth", 1, "Yes. A heart lighter than (or as light as) the feather passes."], ["A gold coin", 0, "Not gold: something much lighter. Try again."], ["A stone", 0, "Try again."]] },
{ k: "choose", w: 2, t: "Ma'at asks you one of the old 'declarations of innocence'. Which is one the dead person said?", o: [["\"I have not stolen.\"", 1, "Yes. The Book of the Dead lists 42 of them, like 'I have not lied' and 'I have not made anyone cry'."], ["\"I have always won at games.\"", 0, "That's not a virtue! Try again."], ["\"I have never been tired.\"", 0, "Try again."]] },
{ k: "code", w: 1, t: "Thoth teaches you two hieroglyphs that stand for sounds: 𓂋 is R and 𓂝 is A. The Sun god's name is written 𓂋𓂝. What is his name? (Type it.)", a: ["ra", "re"], hint: "R and A: the Sun god.", done: "Ra, the Sun! Egyptian writing could be read in sounds as well as pictures. The Rosetta Stone, found in 1799, let scholars read it again." }
],
qs: [["Which jackal-headed god guided the dead?", "Anubis", "Horus", "Ra"],
["What helped scholars read hieroglyphs again in the 1820s?", "The Rosetta Stone", "The Pyramids", "A papyrus map"],
["What did Egyptians call the happy afterlife?", "The Field of Reeds", "Valhalla", "Olympus"],
["Thoth was the god of...", "Writing and wisdom", "War", "The sea"]] });
ctTale({ id: "yokai", host: "land:templerow", t: "The Yokai of the Shrine Path", by: "Japanese folklore", where: "Temple Row, on a lantern-lit shrine path",
col: ["#3A0E0E", "#FFE8C8"], gold: 12, keep: ["A cucumber for a kappa", "🥒"], rad: 9,
props: [["stonelantern", -3, -3, 0, {}, 0.8], ["stonelantern", 3, -3, 0, {}, 0.8], ["shrinegate", 0, -8, 0, {}, 2]],
who: [
{ n: "A kappa", who: "a kappa, a cheeky river creature with a dish of water on its head that gives it strength; very polite when bowed to; loves cucumbers",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x3A6A3A, top: 0x4A8A4A, bottom: 0x3A6A3A, skin: 0x6AA85A, hair: 0x2A4A2A, hairStyle: "short" }, scale: 0.75 }, at: [-2, -1], greet: "Want to wrestle? I always win! ...Unless you do something very polite first.", c: 350 },
{ n: "A kitsune", who: "a kitsune, a clever fox spirit that can take human shape and plays tricks, sometimes kind, sometimes not", being: "kitsune", at: [2, -1], greet: "Am I a fox, or a lady, or a lantern? Look closely, traveller. Foxes are good at being other things." },
{ n: "A tanuki", who: "a tanuki, a jolly, shape-shifting raccoon-dog of Japanese folklore who loves sake and drumming on its belly", being: "fox", s: 0.8, o: { look: { skin: 0x6A5034 } }, at: [4, -3], greet: "Pon-poko-pon! Did you hear my belly drum? Best in the province." }
],
steps: [
{ k: "choose", w: 0, t: "The kappa wants to wrestle, and it is very strong. How do you win, in the old stories?", o: [
["Bow to it politely: it bows back, the water spills from its head-dish, and it loses its strength", 1, "Yes! A kappa can't help being polite. Once the water spills, it's weak until refilled."],
["Push it into the river", 0, "The river is its home! Try again."],
["Run away", 0, "It's fast. Try again."]
] },
{ k: "find", w: 1, t: "The kitsune has hidden among the shrine lanterns. Five lanterns glow: find each one and see which are the fox in disguise.", n: 5, look: "lantern", col: 0xFFB050, r: 22, secs: 200, name: "a glowing lantern", done: "Caught you! The kitsune laughs and gives you a little bow. In stories, a kitsune's tail sometimes shows even when it's disguised." }
],
qs: [["What do kappa love to eat?", "Cucumbers", "Rice cakes", "Fish heads"],
["What is a kitsune?", "A fox spirit", "A river dragon", "A mountain giant"],
["What are yokai?", "Spirits and creatures of Japanese folklore", "Japanese warriors", "Kinds of tea"],
["What is the red gate at a Shinto shrine called?", "A torii", "A pagoda", "A dojo"]] });
ctTale({ id: "robinhood", host: "world:greenwold", t: "Robin Hood and the Silver Arrow", by: "English ballads (A Gest of Robyn Hode, about 1500)", where: "Greenwold, at the archery butts by the greenwood",
col: ["#1E3A1A", "#F2E8B0"], gold: 16, keep: ["A silver arrowhead", "🏹"], rad: 11,
props: [["target", 0, -11, 0, {}, 1.2, { r: 0.8, h: 2 }], ["target", -3, -11, 0, {}, 1.2, { r: 0.8, h: 2 }], ["target", 3, -11, 0, {}, 1.2, { r: 0.8, h: 2 }], ["arrows", -6, -3, 0, 0.8], ["tree", -9, -8, 0, 0.7], ["tree", 9, -7, 0, 0.7]],
who: [
{ n: "Robin Hood", who: "Robin Hood, the outlaw of Sherwood Forest, the best archer in England, cheerful and generous, who takes from the cruel rich and gives to the poor",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x3A6A2A, top: 0x5A8A3A, bottom: 0x4A5A2A, hat: "hood", hatColor: 0x3A6A2A, hair: 0x8A5A2A, hairStyle: "short", beard: 1, shoeKind: "boots", waist: "belt", back: "cloak", backColor: 0x2A4A1A } }, at: [-3, -1], greet: "Welcome to the greenwood, friend! The Sheriff's holding an archery match for a silver arrow. He thinks it'll trap me. Shall we go anyway?", c: 600 },
{ n: "Little John", who: "Little John, the huge, good-natured outlaw (called 'little' as a joke) who fought Robin with staffs on a log bridge",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0x8A7A5A, bottom: 0x4A3A2A, hair: 0x5A3A22, hairStyle: "long", beard: 1, shoeKind: "boots", build: 1.2 }, scale: 1.12 }, at: [-0.5, -1.5], greet: "Robin knocked me in the river the day we met. Well, I knocked him in first.", c: 450 },
{ n: "Maid Marian", who: "Maid Marian, brave and quick-witted, who loves Robin and can shoot and fight as well as any outlaw",
o: { sex: "f", look: { topKind: "dress", top: 0x8A2A3A, bottom: 0x3A5A2A, back: "cloak", backColor: 0x3A5A2A, hair: 0x8A3A1A, hairStyle: "braids", waist: "belt" } }, at: [2, -1.5], greet: "Mind the Sheriff's men. And mind your aim: the wind turns in the glade.", c: 500 },
{ n: "Friar Tuck", who: "Friar Tuck, the jolly, round, sword-fighting friar of the outlaw band",
o: { sex: "m", look: { topKind: "robe", top: 0x6A4A2A, bottom: 0x6A4A2A, hair: 0x8A6A4A, hairStyle: "bald", waist: "belt", build: 1.3 } }, at: [4.5, -2], greet: "Peace be with you! And a pasty, if you're hungry. Robin carried me across a river once, and I dropped him in it halfway.", c: 400 },
{ n: "The Sheriff of Nottingham", who: "the Sheriff of Nottingham, Robin's greedy, scheming enemy",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x2A2A3A, top: 0x5A1A2A, bottom: 0x2A2A3A, hat: "brimmed", hatColor: 0x1A1A1A, back: "cape", backColor: 0x5A1A2A, hair: 0x1A1A1A, hairStyle: "short", beard: 1, neck: "necklace" } }, at: [6, -8], greet: "Step up, archers! A silver arrow for the best. And if a certain outlaw shows his face... so much the better.", c: 500 }
],
steps: [
{ k: "say", w: 0, t: "Robin: \"Three shots at the butts. Hit the gold twice and the silver arrow is yours. The Sheriff will never guess it was us.\"" },
{ k: "aim", w: 0, t: "Draw your bow. The marker swings across the target: loose when it's in the gold. Three shots; hit the gold twice.", rounds: 3, need: 2, done: "The silver arrow is yours! In the old ballad Robin wins in disguise, and only lets the Sheriff know afterwards with a cheeky message on an arrow." },
{ k: "choose", w: 2, t: "Marian asks: \"Where were the first Robin Hood stories found?\"", o: [["In old English ballads, sung and written down in the 1400s", 1, "Yes. A Gest of Robyn Hode is one of the oldest. Maid Marian and Friar Tuck joined the stories later, from May Day plays."], ["In Roman histories", 0, "Far too early. Try again."], ["In a 1930s film", 0, "The ballads were 500 years older. Try again."]] }
],
qs: [["Which forest did Robin Hood live in?", "Sherwood Forest", "The Black Forest", "Epping Forest"],
["Which town's Sheriff was Robin's enemy?", "Nottingham", "London", "York"],
["What weapon was Robin famous for?", "The longbow", "The crossbow", "The spear"],
["How were Robin Hood stories first passed on?", "Ballads, sung and recited", "Newspapers", "Films"]] });
ctTale({ id: "arthur", host: "world:greenwold", t: "The Sword in the Stone", by: "Sir Thomas Malory, Le Morte d'Arthur, 1485", where: "Greenwold, at the sword in the stone by the lake",
col: ["#1A2A4A", "#F2E8C8"], gold: 16, keep: ["A token of the Round Table", "🛡️"], rad: 11,
props: [["swordstone", 0, -4, 0, 1.1], ["lakeshore", 6, -8, 0, {}, 4], ["banner", -6, -6, 0, 0.6]],
who: [
{ n: "Arthur", who: "Arthur as a boy, a kind squire raised by Sir Ector, who does not yet know he is the true king", child: 1,
o: { sex: "m", look: { layer: "tunic", layerColor: 0x3A5AA8, top: 0xE8DCC0, bottom: 0x5A4A32, hair: 0xC8A060, hairStyle: "short", shoeKind: "boots" } }, at: [-2.5, -1], greet: "My brother Kay forgot his sword for the tournament! I have to find him one, quickly. ...Is that a sword in that stone?", c: 450 },
{ n: "Merlin", who: "Merlin, the wise enchanter and adviser who set the sword in the stone",
o: { sex: "m", look: { topKind: "robe", top: 0x2A3A6A, bottom: 0x2A3A6A, hat: "wizard", hatColor: 0x2A3A6A, hair: 0xF0F0F0, hairStyle: "long", beard: 1, back: "cloak", backColor: 0x1A2A4A } }, at: [0, -1.5], greet: "Whoso pulleth out this sword of this stone is rightwise king born of all England. Many have tried.", c: 650 },
{ n: "Sir Kay", who: "Sir Kay, Arthur's proud, sharp-tongued foster-brother",
o: { sex: "m", look: { layer: "armor", top: 0xA82A2A, bottom: 0x3A3A3A, hair: 0x5A3A22, hairStyle: "short", shoeKind: "boots", back: "cape", backColor: 0xA82A2A } }, at: [2.5, -1], greet: "Where is my sword, boy? ...Wait. That one. Where did you get that?", c: 500 },
{ n: "The Lady of the Lake", who: "the Lady of the Lake, the mysterious enchantress who gives Arthur the sword Excalibur",
o: { sex: "f", look: { topKind: "robe", top: 0xC8E0F0, bottom: 0xC8E0F0, hair: 0xE8E0D0, hairStyle: "long", hat: "tiara", hatColor: 0xD8E8F8, back: "cape", backColor: 0x8AB8D8 } }, at: [7, -6], greet: "The sword from the stone proves you king. The sword from the lake will serve you. Guard well its scabbard.", c: 600 }
],
steps: [
{ k: "choose", w: 1, t: "Merlin asks: \"Who may pull the sword from the stone?\"", o: [["The rightful king of England", 1, "Yes. Knights and lords all failed. A boy pulled it out without even trying, because he only wanted to help his brother."], ["The strongest knight", 0, "Strength had nothing to do with it. Try again."], ["Anyone who pays Merlin", 0, "Merlin can't be bought! Try again."]] },
{ k: "find", w: 0, t: "Help young Arthur before the tournament: find Kay's five lost things (his gauntlets, his spurs, his shield strap...) round the green.", n: 5, look: "orb", col: 0xE8C870, r: 28, secs: 220, name: "one of Kay's things", done: "Kay is ready, and Arthur is king. Merlin smiles." },
{ k: "choose", w: 3, t: "The Lady of the Lake asks: \"Which is worth more: Excalibur, or its scabbard?\"", o: [["The scabbard: while Arthur wore it, he would lose no blood", 1, "That's Merlin's lesson in Malory: protection is worth more than a weapon. Sadly, the scabbard was later stolen."], ["The sword", 0, "Merlin said otherwise. Try again."], ["Neither", 0, "Try again."]] }
],
qs: [["Who wrote Le Morte d'Arthur in 1485?", "Sir Thomas Malory", "Geoffrey Chaucer", "William Shakespeare"],
["What was the name of Arthur's sword from the lake?", "Excalibur", "Durendal", "Joyeuse"],
["Where did Arthur's knights meet?", "At the Round Table, in Camelot", "In Sherwood Forest", "At the Tower of London"],
["Who set the sword in the stone?", "Merlin", "Morgan le Fay", "Sir Lancelot"]] });
ctTale({ id: "quixote", host: "world:greenwold", t: "Don Quixote and the Windmills", by: "Miguel de Cervantes, 1605", where: "Greenwold, below the windmills on the hill",
col: ["#4A3A1A", "#F8F0D0"], gold: 12, keep: ["A dented shaving-basin helmet", "🥣"], rad: 12,
props: [["windmill", -6, -12, 0, 0.55], ["windmill", 6, -13, 0.6, 0.55]],
who: [
{ n: "Don Quixote", who: "Don Quixote of La Mancha, a thin old gentleman who read so many tales of knights that he became a knight-errant himself, noble-hearted and completely mistaken",
o: { sex: "m", look: { layer: "armor", top: 0x8A6A4A, bottom: 0x5A4A32, hat: "helmet", hatColor: 0xC8B070, hair: 0xC8C8C8, hairStyle: "short", beard: 1, build: 0.85, shoeKind: "boots" } }, at: [-2, -1], greet: "Look, friend Sancho! Thirty monstrous giants! I shall do battle and take their lives!", c: 550 },
{ n: "Sancho Panza", who: "Sancho Panza, Don Quixote's short, round, practical squire, who rides a donkey and dreams of governing an island",
o: { sex: "m", look: { layer: "vest", layerColor: 0x6A4A2A, top: 0xE8DCC0, bottom: 0x5A4A32, hat: "brimmed", hatColor: 0x8A6A3A, hair: 0x2A1A12, hairStyle: "short", beard: 1, build: 1.3 } }, at: [1, -1.5], greet: "Giants? Master, those are windmills. The things that look like arms are their sails.", c: 450 },
{ n: "Rocinante", who: "Rocinante, Don Quixote's bony old horse", being: "horse", at: [3.5, -2], greet: "(Rocinante sighs, as only a very old, very patient horse can.)" }
],
steps: [
{ k: "choose", w: 0, t: "Don Quixote lowers his lance at the 'giants'. What will you tell him?", o: [["\"They're windmills, sir: look, the wind turns their sails.\"", 1, "He charges anyway! A sail lifts him and Rocinante and tumbles them over. He says an enchanter turned the giants into windmills to rob him of glory."], ["\"Charge!\"", 0, "Sancho groans. Perhaps tell him the truth instead. Try again."], ["\"Let's ask them to dance.\"", 0, "Try again."]] },
{ k: "choose", w: 1, t: "Sancho asks: \"Why do people still say 'tilting at windmills'?\"", o: [["It means fighting imaginary enemies, or impossible battles", 1, "Yes. Don Quixote is often called the first modern novel. Cervantes was a soldier who lost the use of his left hand at the battle of Lepanto."], ["It means building windmills", 0, "Try again."], ["It means a kind of jousting", 0, "Try again."]] }
],
qs: [["Don Quixote comes from which country?", "Spain", "Italy", "Portugal"],
["What did Don Quixote think the windmills were?", "Giants", "Dragons", "Castles"],
["What was Sancho Panza promised?", "An island to govern", "A castle", "A golden horse"],
["Don Quixote is often called...", "The first modern novel", "The first play", "The first newspaper"]] });
ctTale({ id: "mothergoose", host: "world:kidszone", t: "Mother Goose Lane", by: "traditional nursery rhymes", where: "the Kids Zone, on Mother Goose Lane",
col: ["#FF3A8A", "#FFFFFF"], gold: 10, keep: ["A Mother Goose feather", "🪶"], rad: 10, near: 24,
props: [["humptywall", 0, -6, 0, {}, 2.5, { hw: 2, hd: 0.5, h: 1.6 }], ["well", -6, -4, 0, 0.7], ["kidsflowers", 5, -4, 0, {}, 2]],
who: [
{ n: "Mother Goose", who: "Mother Goose, the merry old storyteller of nursery rhymes, very kind to small children",
o: { sex: "f", look: { topKind: "dress", top: 0xFF4AA0, bottom: 0xFFD020, hat: "witch", hatColor: 0x2A60FF, back: "cape", backColor: 0xFF7A1A, hair: 0xF0F0F0, hairStyle: "bun", face: "glasses" } }, at: [-3, -1], greet: "Hello, my duck! Shall we say a rhyme together? Hey diddle diddle, the cat and the fiddle...", c: 400 },
{ n: "Little Bo Peep", who: "Little Bo Peep, who has lost her sheep and doesn't know where to find them",
o: { sex: "f", look: { topKind: "dress", top: 0xFF8AD0, bottom: 0xFF8AD0, layer: "apron", layerColor: 0xFFFFFF, hat: "brimmed", hatColor: 0xFFE040, hair: 0xFFD060, hairStyle: "ponytail" } }, child: 1, at: [-0.5, -1.5], greet: "I've lost my sheep! Will you help me find them? They'll come home, wagging their tails behind them!", c: 350 },
{ n: "Humpty Dumpty", who: "Humpty Dumpty, a cheerful talking egg who sits on a wall", make: "humpty", at: [0, -6.2], greet: "Hello down there! Lovely view from up here. Not at all wobbly. Not even a little bit." },
{ n: "Old King Cole", who: "Old King Cole, a merry old soul who calls for his pipe, his bowl and his fiddlers three",
o: { sex: "m", look: { topKind: "robe", top: 0xFF2A2A, bottom: 0xFF2A2A, hat: "crown", hatColor: 0xFFD020, back: "cape", backColor: 0x2A60FF, hair: 0xF0F0F0, beard: 1 } }, at: [2.5, -1], greet: "Ho ho! I'm a merry old soul! Fiddlers, play a tune!", c: 500 },
{ n: "Jack", who: "Jack, who went up the hill with Jill to fetch a pail of water", child: 1,
o: { sex: "m", look: { layer: "vest", layerColor: 0x2AC8FF, top: 0xFFE040, bottom: 0x2A60FF, hat: "cap", hatColor: 0xFF4A2A, hair: 0x8A4A1A, hairStyle: "short" } }, at: [-6, -1.5], greet: "Jill and I are going up the hill! I'll be careful this time.", c: 300 },
{ n: "Jill", who: "Jill, who came tumbling after Jack", child: 1,
o: { sex: "f", look: { topKind: "dress", top: 0x7AE040, bottom: 0x7AE040, layer: "apron", layerColor: 0xFFFFFF, hair: 0xFFC040, hairStyle: "braids" } }, at: [-7.5, -1], greet: "Fetch a pail of water with us! Hold the rope tight.", c: 300 },
{ n: "A lost sheep", who: "one of Bo Peep's sheep, who only says baa", being: "sheep", at: [7, 2], wander: 4, greet: "Baa!" }
],
steps: [
{ k: "find", w: 1, t: "Little Bo Peep has lost her sheep! Find all five of them and they'll come home.", n: 5, look: "sheep", col: 0xFFFFFF, r: 24, secs: 300, name: "a lost sheep", done: "\"Leave them alone, and they'll come home, wagging their tails behind them!\" Thank you!" },
{ k: "choose", w: 0, t: "Finish the rhyme! \"Humpty Dumpty sat on a wall, Humpty Dumpty had a great...\"", o: [["fall!", 1, "Yes! \"All the king's horses and all the king's men couldn't put Humpty together again.\""], ["ball!", 0, "Ha! That's a different party. Try again."], ["hall!", 0, "Try again."]] },
{ k: "choose", w: 0, t: "Finish the rhyme! \"Jack and Jill went up the hill to fetch a pail of...\"", o: [["water!", 1, "Yes! \"Jack fell down and broke his crown, and Jill came tumbling after.\""], ["milk!", 0, "Try again."], ["apples!", 0, "Try again."]] }
],
qs: [["Who lost her sheep?", "Little Bo Peep", "Little Miss Muffet", "Mary"],
["What jumped over the moon in 'Hey Diddle Diddle'?", "The cow", "The dog", "The spoon"],
["What is Humpty Dumpty, in the pictures?", "An egg", "A ball", "A cat"],
["How many fiddlers did Old King Cole have?", "Three", "Seven", "Ten"]] });
ctTale({ id: "pinocchio", host: "world:kidszone", t: "Pinocchio", by: "Carlo Collodi, 1883", where: "the Kids Zone, at Geppetto's workshop",
col: ["#2A60FF", "#FFF040"], gold: 10, keep: ["A little wooden puppet", "🪆"], rad: 9, near: 24,
props: [["workbench", 0, -4, 0, {}, 2, { hw: 1.6, hd: 0.6, h: 1.1 }], ["kidsflowers", -5, -3, 0, {}, 2]],
who: [
{ n: "Pinocchio", who: "Pinocchio, a cheeky wooden puppet who can walk and talk and wants to be a real boy; his nose grows when he tells a lie", child: 1,
o: { sex: "m", look: { layer: "vest", layerColor: 0xFF3A2A, top: 0xFFE040, bottom: 0x2A8AFF, hat: "cap", hatColor: 0xFF3A2A, skin: 0xE8B070, hair: 0x6A3A1A, hairStyle: "short" } }, make: "longnose", at: [-2, -1], greet: "I'm Pinocchio! I'm going to school today. Definitely. Probably. Do you want to see a puppet show first?", c: 350 },
{ n: "Geppetto", who: "Geppetto, the poor, kind old woodcarver who made Pinocchio from a talking log",
o: { sex: "m", look: { layer: "apron", layerColor: 0xFFE0A0, top: 0xFFFFFF, bottom: 0x8A4A1A, hat: "beanie", hatColor: 0xFF4A2A, face: "glasses", hair: 0xF0F0F0, hairStyle: "short", beard: 1 } }, at: [1, -1.5], greet: "I sold my only coat to buy him a spelling book! He's a good boy at heart. He just needs to learn.", c: 400 },
{ n: "The Talking Cricket", who: "the Talking Cricket, a wise little cricket who gives Pinocchio good advice", make: "cricket", at: [0, -4.3], greet: "Chirp! Listen to your father, Pinocchio, and tell the truth. Chirp!" },
{ n: "The Fairy with Turquoise Hair", who: "the Fairy with Turquoise Hair, Pinocchio's kind protector",
o: { sex: "f", look: { topKind: "dress", top: 0x40E0D0, bottom: 0x40E0D0, hair: 0x30D8E0, hairStyle: "long", hat: "tiara", hatColor: 0xFFFFFF, back: "cape", backColor: 0xA0F0FF } }, at: [4, -2], greet: "Lies, my boy, are found out at once, because there are two kinds: lies with short legs, and lies with long noses.", c: 450 }
],
steps: [
{ k: "say", w: 3, t: "The Fairy: \"Let's play Truth or Fib! Pinocchio will say something, and you tell me if his nose would grow.\"" },
{ k: "choose", w: 0, t: "Pinocchio says: \"I went straight to school and didn't stop at the puppet show!\" (He did stop at the puppet show.)", o: [["That's a fib: his nose grows!", 1, "Boing! His nose grows so long he can't get through the door. The woodpeckers have to peck it back to size!"], ["That's true", 0, "Hmm, he did stop at the puppet show... Try again."]] },
{ k: "choose", w: 0, t: "Pinocchio says: \"Geppetto made me from a piece of wood that could talk.\"", o: [["That's true", 1, "True! In the book the log squeaks and giggles before Geppetto even starts carving."], ["That's a fib", 0, "It's actually true in the book! Try again."]] },
{ k: "choose", w: 1, t: "Geppetto asks: \"How does Pinocchio become a real boy at the end of the book?\"", o: [["By working hard and caring for Geppetto when he was ill", 1, "Yes. Being kind and honest is what changes him."], ["By wishing on a star", 0, "That's from a later film, not Collodi's book. Try again."], ["By eating a magic apple", 0, "Try again."]] }
],
qs: [["What happens to Pinocchio's nose when he lies?", "It grows", "It turns red", "It falls off"],
["Who made Pinocchio?", "Geppetto", "The Blue Fairy", "Mother Goose"],
["Pinocchio was first written in which language?", "Italian", "French", "German"],
["Who gave Pinocchio good advice?", "The Talking Cricket", "The fox", "The cat"]] });
ctTale({ id: "threepigs", host: "world:kidszone", t: "The Three Little Pigs and Goldilocks", by: "English folk tales", where: "the Kids Zone, by the three little houses and the bears' table",
col: ["#FF7A1A", "#FFFFFF"], gold: 10, keep: ["A brick from the third house", "🧱"], rad: 12, near: 26,
props: [["pighouse", -6, -6, 0, { t: "straw" }, 2, { r: 1.3, h: 2 }], ["pighouse", 0, -7, 0, { t: "sticks" }, 2, { r: 1.3, h: 2 }], ["pighouse", 6, -6, 0, { t: "bricks" }, 2, { r: 1.3, h: 2 }], ["bowls", 0, -1.5, 0, {}, 1.5]],
who: [
{ n: "The first little pig", who: "the first little pig, who built a house of straw", being: "pig", s: 0.8, at: [-6, -3.5], greet: "My house took ten minutes! Now I can play all day!" },
{ n: "The second little pig", who: "the second little pig, who built a house of sticks", being: "pig", s: 0.8, at: [0, -4.5], greet: "Sticks are better than straw! ...Aren't they?" },
{ n: "The third little pig", who: "the third little pig, who worked hard and built a house of bricks", being: "pig", s: 0.85, at: [6, -3.5], greet: "Bricks take a long time. But wait till the wolf tries to blow THIS down!" },
{ n: "The big bad wolf", who: "the big bad wolf, a huffing, puffing, not-very-scary wolf who never gets his way", being: "fox", s: 1.2, o: { look: { skin: 0x6A6A72 } }, at: [9, 0], greet: "I'll huff, and I'll puff, and I'll... *wheeze*... give me a minute." },
{ n: "Goldilocks", who: "Goldilocks, a curious girl with golden curls who wandered into the three bears' cottage", child: 1,
o: { sex: "f", look: { topKind: "dress", top: 0x2AA8FF, bottom: 0x2AA8FF, hair: 0xFFD020, hairStyle: "curly", shoes: 0xFF3A8A } }, at: [-2, 0], greet: "This porridge is too hot! And this one is too cold! Help me find the one that's just right!", c: 350 },
{ n: "Father Bear", who: "Father Bear, the great big bear of the three bears", being: "bear", s: 0.8, at: [3, 0.5], greet: "Somebody's been eating my porridge!" }
],
steps: [
{ k: "choose", w: 3, t: "The third little pig asks: \"Which house will keep the wolf out when he huffs and puffs?\"", o: [["The house of bricks", 1, "Yes! Bricks are heavy and joined with mortar, so wind can't push them over. That's why lots of real houses are brick or stone."], ["The house of straw", 0, "Whoosh! Straw is light and blows away. Try again."], ["The house of sticks", 0, "Crack! Sticks aren't joined together well. Try again."]] },
{ k: "choose", w: 4, t: "Goldilocks tastes three bowls: Father Bear's is too hot, Mother Bear's is too cold. Whose is just right?", o: [["Baby Bear's", 1, "Just right! And she ate it all up. When the bears came home... she jumped out of the window and ran!"], ["Father Bear's", 0, "Too hot! Try again."], ["Mother Bear's", 0, "Too cold! Try again."]] },
{ k: "find", w: 3, t: "Help the third little pig: find the five bricks that fell off the cart.", n: 5, look: "brick", col: 0xFF5A3A, r: 22, secs: 300, name: "a brick", done: "Hooray! The brick house is finished. The wolf huffs and puffs and goes home for a nap." }
],
qs: [["Which house did the wolf NOT blow down?", "The brick house", "The straw house", "The stick house"],
["How many bears lived in the cottage?", "Three", "Two", "Five"],
["Whose chair did Goldilocks break?", "Baby Bear's", "Father Bear's", "Mother Bear's"],
["Why are bricks strong?", "They are heavy and stuck together with mortar", "They are made of straw", "They are hollow"]] });
ctTale({ id: "lilliput", host: "world:kidszone", t: "Gulliver in Lilliput", by: "Jonathan Swift, 1726", where: "the Kids Zone, beside the tiny town of Lilliput",
col: ["#7A2AFF", "#FFF0A0"], gold: 10, keep: ["A Lilliputian coin, smaller than a seed", "🪙"], rad: 12, near: 26,
props: [["gulliver", 0, -6, Math.PI / 2, {}, 4, { hw: 5, hd: 1.5, h: 1.4 }], ["tinytown", -7, -2, 0, {}, 3]],
who: [
{ n: "The Emperor of Lilliput", who: "the Emperor of Lilliput, ruler of people about 15 cm tall, very grand and very small",
o: { sex: "m", look: { topKind: "robe", top: 0xFF2A8A, bottom: 0xFF2A8A, hat: "crown", hatColor: 0xFFD020, back: "cape", backColor: 0x2A60FF, hair: 0x2A1A12, beard: 1 }, scale: 0.14 }, at: [-3, -1], greet: "(a tiny voice) Halt, Man-Mountain! You stand before the Emperor of Lilliput, delight and terror of the universe!", c: 500 },
{ n: "A Lilliputian", who: "a Lilliputian, one of the tiny people who tied Gulliver down while he slept",
o: { sex: "f", look: { topKind: "dress", top: 0x40E040, bottom: 0x40E040, hat: "cap", hatColor: 0xFF4A2A, hair: 0x8A4A1A, hairStyle: "bun" }, scale: 0.14 }, at: [-1.5, -1], wander: 2, greet: "(squeak) We tied him with a hundred ropes! He's very big. Please don't tread on us!" },
{ n: "Lemuel Gulliver", who: "Lemuel Gulliver, a ship's surgeon who woke up tied down by thousands of tiny people", make: "gulliverhead", at: [0, -10], greet: "Help! I can't move my arms! These little people are very kind, but I'd love to sit up." }
],
steps: [
{ k: "find", w: 2, t: "Gulliver is tied down! Find and untie the five big rope knots holding him.", n: 5, look: "knot", col: 0xFFD040, r: 14, secs: 300, name: "a rope knot", done: "Gulliver sits up, very carefully, so he doesn't squash anyone. The Lilliputians cheer!" },
{ k: "choose", w: 0, t: "The Emperor asks: \"Which end should you crack a boiled egg?\" (In the book, Lilliput fights a war over this!)", o: [["It doesn't really matter: that's Swift's joke", 1, "Yes! The Big-Endians and Little-Endians fought over which end to crack an egg. Swift was laughing at people who quarrel over silly things."], ["The big end, of course!", 0, "That's what the Big-Endians say! But the joke is that it doesn't matter. Try again."], ["The little end, of course!", 0, "That's what the Little-Endians say! Try again."]] }
],
qs: [["How tall are the Lilliputians?", "About 15 centimetres (6 inches)", "As tall as a house", "As tall as a dog"],
["What did the Lilliputians call Gulliver?", "The Man-Mountain", "The Giant King", "Big Ben"],
["Who wrote Gulliver's Travels?", "Jonathan Swift", "Lewis Carroll", "Charles Perrault"],
["What did Big-Endians and Little-Endians argue about?", "Which end to crack an egg", "Which shoe to put on first", "Who was tallest"]] });
ctTale({ id: "centreearth", host: "world:underdark", t: "Journey to the Centre of the Earth", by: "Jules Verne, 1864", where: "the Underdark, at Saknussemm's carved passage above an underground sea",
col: ["#1E1A14", "#F2D8A0"], gold: 16, keep: ["A rune-carved stone", "🪨"], rad: 10,
props: [["runestone", 0, -5, 0, 1], ["campfire", -4, -2, 0, {}, 1], ["mushroomgrove", 6, -6, 0, {}, 3]],
who: [
{ n: "Professor Lidenbrock", who: "Professor Otto Lidenbrock, an impatient, brilliant German professor of mineralogy who decoded Saknussemm's message and leads the expedition",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x5A4A32, top: 0xE8DCC0, bottom: 0x4A3A2A, face: "glasses", hat: "brimmed", hatColor: 0x3A3228, hair: 0xC8C8C8, hairStyle: "short", beard: 1, waist: "satchel", shoeKind: "boots" } }, at: [-2.5, -1], greet: "Forward! Arne Saknussemm came this way three hundred years ago, and so shall we! Down, down to the centre of the Earth!", c: 550 },
{ n: "Axel", who: "Axel, Lidenbrock's nervous young nephew and the narrator, who would rather be home with Gräuben",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x3A4A5A, top: 0xF2EEE2, bottom: 0x3A3A3A, hair: 0xC8A060, hairStyle: "short", waist: "satchel", shoeKind: "boots" } }, at: [0, -1.5], greet: "My uncle never doubts. I doubt everything. Especially the part about going to the centre of the Earth.", c: 450 },
{ n: "Hans", who: "Hans Bjelke, the calm, silent Icelandic eider-duck hunter who guides them and finds water when they need it",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x4A5A6A, top: 0xD8D0C0, bottom: 0x3A3A3A, hat: "beanie", hatColor: 0x8A2A2A, hair: 0xE8C870, hairStyle: "long", beard: 1, shoeKind: "boots" } }, at: [2.5, -1], greet: "Forüt.", c: 450 }
],
steps: [
{ k: "say", w: 0, t: "Lidenbrock: \"Saknussemm's message was written backwards in runes, then in Latin. Axel cracked it by accident, fanning himself with the paper and seeing it from behind!\"" },
{ k: "code", w: 0, t: "Here are the letters cut into the rock, written backwards as Saknussemm wrote them: MMESSUNKAS ENRA. Read it the right way round: whose name is it? (Type it.)", a: ["arnesaknussemm", "arne saknussemm", "saknussemm"], hint: "Read the letters from the end to the start.", done: "\"Arne Saknussemm!\" His initials, A.S., really do appear carved in the rock in Verne's book. The way down is clear." },
{ k: "find", w: 2, t: "The water ran out in the book, and Hans found a hot spring. Find five places where water trickles from the rock to fill your flasks.", n: 5, look: "drop", col: 0x7AC8FF, r: 26, secs: 220, name: "a trickle of water", done: "Hans nods. In the book they name the stream the Hans-bach after him." },
{ k: "choose", w: 1, t: "Axel asks: \"What do scientists know is really at the centre of the Earth?\"", o: [["A hot, solid iron and nickel core, about as hot as the Sun's surface", 1, "Yes: about 5,000-6,000 °C. No one could ever walk there; the deepest hole ever dug is only about 12 km."], ["An underground sea with dinosaurs", 0, "That's Verne's adventure! Try again."], ["Nothing: it's hollow", 0, "That was an old idea, but no. Try again."]] }
],
qs: [["In which country do they climb down into a volcano?", "Iceland", "Italy", "Japan"],
["What is at the very centre of the Earth?", "A solid iron-nickel inner core", "An ocean", "Ice"],
["Whose path did Lidenbrock follow?", "Arne Saknussemm's", "Captain Nemo's", "Phileas Fogg's"],
["How do they come back up at the end of the book?", "Shot out of Stromboli, a volcano in Italy", "By lift", "By digging"]] });
ctTale({ id: "beowulf", host: "world:battle", t: "Beowulf at Heorot", by: "the Old English poem Beowulf (about 700-1000 AD)", where: "Ironfray, at the hearth of Heorot",
col: ["#2A1A0E", "#F2D8A0"], gold: 18, keep: ["A gold ring from Hrothgar's hoard", "💍"], rad: 12,
props: [["feasttable", 0, -5, 0, {}, 3, { hw: 3.6, hd: 0.8, h: 1 }], ["campfire", 0, -1, 0, {}, 1], ["banner", -6, -7, 0, 0.7], ["banner", 6, -7, 0, 0.7], ["throne", 0, -9, 0, 1]],
who: [
{ n: "Beowulf", who: "Beowulf, a hero of the Geats, enormously strong, who came across the sea to fight the monster Grendel",
o: { sex: "m", look: { layer: "armor", top: 0x6A5A3A, bottom: 0x4A3A2A, hat: "helmet", hatColor: 0x8A8A8A, hair: 0xE8C870, hairStyle: "long", beard: 1, back: "cloak", backColor: 0x5A2A1A, shoeKind: "boots" } }, at: [-3, -1], greet: "I have come to rid Heorot of Grendel. I will fight him with no sword, as he fights with none.", c: 650 },
{ n: "King Hrothgar", who: "Hrothgar, the old, wise king of the Danes, who built the great mead-hall Heorot",
o: { sex: "m", look: { topKind: "robe", top: 0x5A2A6A, bottom: 0x5A2A6A, hat: "crown", hatColor: 0xE8B83A, hair: 0xF0F0F0, hairStyle: "long", beard: 1, back: "cape", backColor: 0x2A1A0E } }, at: [0, -8], greet: "For twelve winters Grendel has come to Heorot at night. If you can free us, young hero, all my treasure is yours.", c: 600 },
{ n: "Wealhtheow", who: "Wealhtheow, Hrothgar's gracious queen, who carries the mead-cup to the warriors",
o: { sex: "f", look: { topKind: "dress", top: 0x8A2A2A, bottom: 0x8A2A2A, hat: "tiara", hatColor: 0xE8B83A, hair: 0xE8D8A8, hairStyle: "braids", neck: "necklace" } }, at: [3, -1.5], greet: "Drink, hero, and be welcome. Heorot has been a sad hall for a long time.", c: 500 },
{ n: "Unferth", who: "Unferth, a jealous Danish warrior who tries to shame Beowulf with a story about a swimming contest",
o: { sex: "m", look: { layer: "armor", top: 0x3A3A3A, bottom: 0x3A3A3A, hair: 0x2A1A12, hairStyle: "long", beard: 1, back: "cloak", backColor: 0x1A1A2A } }, at: [5.5, -3], greet: "Are you the Beowulf who lost a swimming race to Breca? Grendel will eat you for breakfast.", c: 450 }
],
steps: [
{ k: "choose", w: 3, t: "Unferth sneers: \"You lost the swimming match with Breca!\" How did Beowulf answer, in the poem?", o: [["He swam for five nights in armour and killed nine sea-monsters on the way", 1, "That's his boast, and he adds: if Unferth were as brave as he talks, Grendel would never have troubled Heorot. The hall cheers."], ["He admits he lost", 0, "Not Beowulf! Try again."], ["He challenges Unferth to a race", 0, "Words were the weapon here. Try again."]] },
{ k: "choose", w: 0, t: "Grendel comes in the night. How does Beowulf beat him?", o: [["He wrestles him with his bare hands and tears off his arm", 1, "Yes. Grendel flees to his mere to die, and Beowulf hangs the arm high in the hall. (Then Grendel's mother comes for revenge...)"], ["With a magic sword", 0, "Not the first fight. He chose no sword. Try again."], ["He talks him out of it", 0, "Try again."]] },
{ k: "run", w: 0, t: "Grendel's mother has struck! Run the warriors' path through every ring to the edge of her mere before dawn.", n: 7, r: 30, secs: 110, done: "At the mere's edge. In the poem Beowulf dives in and fights her deep underwater, winning with an old giant's sword he finds in her lair." }
],
qs: [["Beowulf was written in which language?", "Old English", "Latin", "Old Norse"],
["What was Hrothgar's great hall called?", "Heorot", "Valhalla", "Camelot"],
["Which monster does Beowulf fight first?", "Grendel", "A dragon", "A troll king"],
["What does Beowulf fight at the very end of the poem, as an old king?", "A dragon", "A giant", "A sea serpent"]] });
ctTale({ id: "treasureisland", host: "world:party", t: "Treasure Island", by: "Robert Louis Stevenson, 1883", where: "Jubilee, on the beach where Flint's map leads",
col: ["#2A3A4A", "#F8E8B0"], gold: 16, keep: ["A piece of eight", "🪙"], rad: 12,
props: [["palm", -6, -6, 0, 0.5], ["palm", 7, -8, 0.4, 0.55], ["chest", 0, -8, 0, {}, 1, { r: 0.8, h: 1 }], ["skeletonpointer", 3, -4, 0.6, {}, 1.5]],
who: [
{ n: "Jim Hawkins", who: "Jim Hawkins, a brave, honest boy from the Admiral Benbow inn who found Captain Flint's treasure map", child: 1,
o: { sex: "m", look: { layer: "vest", layerColor: 0x3A5AA8, top: 0xF2EEE2, bottom: 0x5A4A32, hair: 0x8A5A2A, hairStyle: "short", shoeKind: "boots", neck: "scarf", accColor: 0xC83A2A } }, at: [-2.5, -1], greet: "The map was in old Billy Bones's sea-chest! Tall tree, Spy-glass Shoulder... we can find it!", c: 400 },
{ n: "Long John Silver", who: "Long John Silver, the charming, clever, one-legged sea-cook who is secretly the pirates' leader, with a crutch and a parrot",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x2A3A6A, top: 0xF2EEE2, bottom: 0x3A3228, hat: "brimmed", hatColor: 0x1A1A1A, hair: 0x5A3A22, hairStyle: "ponytail", beard: 1, waist: "belt" } }, at: [0, -1.5], greet: "Ah, Jim, my son! You're the picter of my own self when I was young. Now, about that map...", c: 600 },
{ n: "Ben Gunn", who: "Ben Gunn, a half-mad, kind-hearted castaway marooned on the island for three years, who longs for cheese",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x8A7A5A, top: 0xA89878, bottom: 0x6A5A3A, hat: "bandana", hatColor: 0x8A6A4A, hair: 0xC8C8C8, hairStyle: "long", beard: 1, skin: 0xA87048 } }, at: [3, -1], greet: "You mightn't happen to have a piece of cheese about you, now? Many's the long night I've dreamed of cheese, toasted mostly.", c: 450 },
{ n: "Captain Flint", who: "Captain Flint, Long John Silver's green parrot, named after the dead pirate, who screeches 'Pieces of eight!'", being: "bird", s: 0.6, at: [0.8, -1.5], greet: "Pieces of eight! Pieces of eight! Pieces of eight!" }
],
steps: [
{ k: "say", w: 0, t: "Jim reads the back of the map: \"Tall tree, Spy-glass shoulder, bearing a point to the N. of N.N.E. Skeleton Island E.S.E. and by E. Ten feet.\" Let's follow the compass!" },
{ k: "choose", w: 0, t: "First clue: on a compass, which direction is N.N.E.?", o: [["Between north and north-east, a little east of north", 1, "Right! The compass has 32 'points'; sailors learned to say them all in order, called 'boxing the compass'."], ["Straight south", 0, "N is north. Try again."], ["North-west", 0, "Close, but on the other side. Try again."]] },
{ k: "find", w: 2, t: "Follow Flint's markers: find the five signs Ben Gunn left along the beach (a pointing skeleton was Flint's own grim signpost).", n: 5, look: "chalk", col: 0xF8E8B0, r: 28, secs: 240, name: "a marker", done: "You reach the spot... and the hole is already dug and empty! Ben Gunn moved the treasure to his cave long ago. He shares it, for a cheese." },
{ k: "choose", w: 1, t: "Silver asks: \"Which famous pirate things did this book make up or make famous?\"", o: [["Treasure maps with an X, one-legged pirates with parrots, and the Black Spot", 1, "Yes! Stevenson's book gave us nearly everything we picture about pirates. He drew the map first, for his stepson, then wrote the story."], ["Nothing: pirates really always did that", 0, "Real pirates hardly ever buried treasure! Try again."], ["Only the ships", 0, "Much more. Try again."]] }
],
qs: [["What does Ben Gunn long for most?", "Cheese", "Gold", "A ship"],
["What is Long John Silver's parrot called?", "Captain Flint", "Polly", "Billy Bones"],
["What is the Black Spot?", "A pirates' warning or summons", "A treasure mark", "An island"],
["How many points are there on a sailor's compass rose?", "32", "4", "12"]] });
ctTale({ id: "phantom", host: "world:party", t: "The Phantom of the Opera", by: "Gaston Leroux, 1910", where: "Jubilee, by a little opera stage with its Box Five",
col: ["#3A0E1A", "#F8D8A8"], gold: 14, keep: ["A red rose with a black ribbon", "🌹"], rad: 10,
props: [["stage", 0, -7, 0, {}, 4, { hw: 4, hd: 1.6, h: 1.2 }], ["chandelier", 0, -7, 0, {}, 1]],
who: [
{ n: "Christine Daaé", who: "Christine Daaé, a young Swedish singer at the Paris Opera, taught in secret by a voice she calls the Angel of Music",
o: { sex: "f", look: { topKind: "dress", top: 0xF2EEE2, bottom: 0xF2EEE2, hair: 0xC8A060, hairStyle: "long", neck: "necklace", hat: "flowercrown", hatColor: 0xF8E8E8 } }, at: [-2, -1], greet: "My father promised he'd send me the Angel of Music. And then, in my dressing room, I heard a voice...", c: 500 },
{ n: "Raoul", who: "Raoul, Vicomte de Chagny, Christine's childhood friend, brave and rather hot-headed",
o: { sex: "m", look: { layer: "suit", layerColor: 0x1A1A2A, top: 0xF2EEE2, bottom: 0x1A1A2A, neck: "bowtie", accColor: 0xF2EEE2, hair: 0xE8C870, hairStyle: "short" } }, at: [1, -1.5], greet: "I fetched Christine's red scarf from the sea when we were children. I won't let this 'Phantom' frighten her.", c: 500 },
{ n: "Erik, the Phantom", who: "Erik, the Phantom of the Opera, a brilliant, lonely musician, architect and magician living beneath the Opera; Leroux describes a face like a skull, which he hides behind a full black mask (never the film's half-mask)",
o: { sex: "m", look: { layer: "suit", layerColor: 0x0E0E12, top: 0xF2EEE2, bottom: 0x0E0E12, back: "cape", backColor: 0x0E0E12, hat: "tophat", hatColor: 0x0E0E12, face: "mask", hair: 0x0E0E10, hairStyle: "short", hands: "gloves" } }, at: [0, -8], greet: "Box Five is mine. Twenty thousand francs a month, and Christine sings the lead. Those are my terms.", c: 700 }
],
steps: [
{ k: "find", w: 1, t: "The Phantom's notes are all over the opera house! Find his five letters (signed 'O.G.', Opera Ghost).", n: 5, look: "page", col: 0xE8C8A8, r: 24, secs: 220, name: "a letter from O.G.", done: "Every note asks for Box Five to be kept empty for him. The managers laughed. They stopped laughing." },
{ k: "choose", w: 0, t: "Christine must choose. In Leroux's book, what does the Phantom finally do?", o: [["He lets Christine go free with Raoul, because she showed him kindness", 1, "Yes. When Christine kisses his forehead, the first kindness he has ever known, Erik lets them go. It's a sad, gentle ending."], ["He keeps her underground forever", 0, "Not at the end. Try again."], ["He becomes the new manager", 0, "Try again."]] },
{ k: "choose", w: 2, t: "The Phantom asks: \"Is the Paris Opera's underground lake real?\"", o: [["Yes, there's a real water tank under the Palais Garnier", 1, "True! The builders hit groundwater, so they built a great tank under the opera house. It's still there, and firemen practise swimming in it."], ["No, it's made up", 0, "Surprisingly, it's real. Try again."]] }
],
qs: [["Which city is the Phantom's opera house in?", "Paris", "London", "Vienna"],
["Who wrote The Phantom of the Opera?", "Gaston Leroux", "Victor Hugo", "Alexandre Dumas"],
["Which box does the Phantom demand?", "Box Five", "Box One", "The royal box"],
["What does the Phantom call himself in his letters?", "O.G., the Opera Ghost", "The Angel of Death", "The Maestro"]] });
ctTale({ id: "holmes", host: "world:lounge", t: "Sherlock Holmes and the Blue Carbuncle", by: "Arthur Conan Doyle, 1892", where: "GiGi's Lounge, where a Christmas goose has turned up with a stolen jewel inside",
col: ["#2A1E14", "#F2E2C0"], gold: 16, keep: ["A battered old felt hat", "🎩"], rad: 9,
props: [["clueTable", 0, -3, 0, {}, 1.5, { hw: 1, hd: 0.6, h: 1 }], ["armchairs", 0, -6, 0, {}, 2]],
who: [
{ n: "Sherlock Holmes", who: "Sherlock Holmes, the brilliant, observant consulting detective of 221B Baker Street, sharp, dry and kind underneath",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x5A5048, top: 0xF2EEE2, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x6A6050, hair: 0x1A1A1A, hairStyle: "short", build: 0.92, back: "cape", backColor: 0x5A5048 } }, at: [-2, -1], greet: "You see, but you do not observe. Look at this old hat: its owner is clever, was once well off, and his wife has stopped loving him. All from a hat.", c: 650 },
{ n: "Dr Watson", who: "Dr John Watson, Holmes's loyal friend, a former army doctor, who writes up the cases",
o: { sex: "m", look: { layer: "suit", layerColor: 0x5A4A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, hat: "tophat", hatColor: 0x2A2420, hair: 0x8A6A4A, hairStyle: "short", beard: 1 } }, at: [1, -1.5], greet: "Holmes has been staring at that hat for an hour. It's Christmas, and a goose turned up with a blue jewel in its crop!", c: 550 },
{ n: "Mrs Hudson", who: "Mrs Hudson, the patient, warm-hearted landlady of 221B Baker Street",
o: { sex: "f", look: { topKind: "dress", top: 0x4A3A5A, bottom: 0x4A3A5A, layer: "apron", layerColor: 0xF2EEE2, hair: 0xC8C8C8, hairStyle: "bun" } }, at: [3.5, -2], greet: "Tea, dear? You'll need it. Mr Holmes forgets to eat when he's on a case.", c: 400 },
{ n: "Peterson", who: "Peterson, the honest commissionaire who found the hat and the goose in the street on Christmas morning",
o: { sex: "m", look: { layer: "uniform", layerColor: 0x2A2A3A, top: 0xF2EEE2, bottom: 0x2A2A3A, hat: "cap", hatColor: 0x2A2A3A, hair: 0x5A3A22, hairStyle: "short" } }, at: [-4.5, -2], greet: "I saw a scuffle at Tottenham Court Road, and the man dropped his goose and his hat and ran!", c: 350 },
{ n: "James Ryder", who: "James Ryder, the nervous hotel attendant who stole the Countess's blue carbuncle and hid it in a goose",
o: { sex: "m", look: { layer: "uniform", layerColor: 0x5A2A2A, top: 0xF2EEE2, bottom: 0x2A2A2A, hair: 0x8A6A4A, hairStyle: "short" } }, at: [5, -5], greet: "N-nothing to do with me, sir. I never saw any goose. Or a jewel. What jewel?", c: 400 }
],
steps: [
{ k: "find", w: 0, t: "Find the five clues round the lounge: the hat, the goose, the Countess's newspaper notice, the poulterer's label, and the market note.", n: 5, look: "page", col: 0xE8D8B0, r: 22, secs: 240, name: "a clue", done: "Holmes taps the label: \"The goose came from Breckinridge in Covent Garden, who had it from a Mrs Oakshott, whose brother works at the hotel. The trail leads to the hotel.\"" },
{ k: "choose", w: 0, t: "Holmes: \"So who stole the blue carbuncle?\"", o: [["James Ryder, the hotel attendant", 1, "Exactly. He stole the gem from the Countess's room, panicked, and fed it to a goose at his sister's farm... then took the wrong goose."], ["Peterson", 0, "Peterson found the goose and brought it straight here. Try again."], ["Mrs Hudson", 0, "Mrs Hudson! Never. Try again."]] },
{ k: "choose", w: 1, t: "Watson asks: \"Ryder is sorry and terrified. What does Holmes do?\"", o: [["Lets him go: it's Christmas, the season of forgiveness, and an innocent man is cleared", 1, "That's the ending. \"I suppose I am commuting a felony, but it is just possible I am saving a soul.\""], ["Has him locked up for 20 years", 0, "Holmes chose mercy. Try again."], ["Makes him eat the goose", 0, "Ha! Try again."]] }
],
qs: [["Where did Sherlock Holmes live?", "221B Baker Street, London", "10 Downing Street", "The Tower of London"],
["Who wrote the Sherlock Holmes stories?", "Arthur Conan Doyle", "Agatha Christie", "Charles Dickens"],
["Where was the stolen jewel found?", "Inside a Christmas goose", "In a hat", "In a teapot"],
["What was Conan Doyle's first job?", "A doctor", "A policeman", "A sailor"]] });
ctTale({ id: "grimm", host: "world:family", t: "Hansel and Gretel, and the Emperor's New Clothes", by: "the Brothers Grimm (1812) and Hans Christian Andersen (1837)", where: "the Family houses, at the storybook corner",
col: ["#4A2A1A", "#FFF0D0"], gold: 12, keep: ["A white pebble", "⚪"], rad: 10,
props: [["gingerhut", -5, -6, 0.4, {}, 2, { r: 1.4, h: 2.4 }], ["throne", 5, -6, 0, 0.9], ["kidsflowers", 0, -3, 0, {}, 1.5]],
who: [
{ n: "Hansel", who: "Hansel, a clever boy who left a trail of white pebbles to find the way home through the forest", child: 1,
o: { sex: "m", look: { layer: "vest", layerColor: 0x6A3A1A, top: 0xF2EEE2, bottom: 0x3A5A2A, hat: "cap", hatColor: 0x3A5A2A, hair: 0xE8C870, hairStyle: "short" } }, at: [-6, -2], greet: "I filled my pockets with white pebbles. They shine in the moonlight like silver coins. We'll never get lost.", c: 350 },
{ n: "Gretel", who: "Gretel, Hansel's brave sister, who outwits the witch and saves them both", child: 1,
o: { sex: "f", look: { topKind: "dress", top: 0xC83A3A, bottom: 0xC83A3A, layer: "apron", layerColor: 0xF2EEE2, hair: 0xE8C870, hairStyle: "braids" } }, at: [-4, -2], greet: "Don't eat any more of the roof! I think whoever lives here isn't as kind as she seems.", c: 350 },
{ n: "The Emperor", who: "the vain Emperor of Andersen's tale, who loves fine clothes and was fooled by two swindlers",
o: { sex: "m", look: { topKind: "shirt", top: 0xF2EEE2, bottom: 0xF2EEE2, hat: "crown", hatColor: 0xE8B83A, hair: 0x8A6A4A, hairStyle: "short", beard: 1 } }, at: [5, -4], greet: "My new clothes are made from a cloth so fine that fools can't see it. You can see it, can't you? Of course you can.", c: 500 },
{ n: "A swindler weaver", who: "one of the two swindlers who pretended to weave magic cloth from thin air",
o: { sex: "m", look: { layer: "vest", layerColor: 0x8A6A3A, top: 0xE8DCC0, bottom: 0x4A3A2A, hair: 0x2A1A12, hairStyle: "curly", beard: 1, neck: "scarf", accColor: 0x8A2AC8 } }, at: [7.5, -2], greet: "Feel the silk! The gold thread! ...Don't actually touch it. It's very delicate.", c: 350 }
],
steps: [
{ k: "find", w: 0, t: "Follow Hansel's trail of white pebbles home, shining in the moonlight: find all five.", n: 5, look: "pebble", col: 0xF8F8F8, r: 24, secs: 240, name: "a white pebble", done: "Home! In the Grimms' tale the pebbles worked the first time. The second time Hansel used breadcrumbs, and the birds ate them all." },
{ k: "choose", w: 2, t: "The Emperor parades in his 'new clothes'. Everyone pretends to see them. What do you say?", o: [["\"But he isn't wearing anything!\"", 1, "That's what the child said in Andersen's tale, and then everyone admitted it. The story is about being brave enough to tell the truth."], ["\"What beautiful clothes!\"", 0, "That's what everyone else said. Be braver! Try again."], ["Say nothing", 0, "Somebody has to say it. Try again."]] }
],
qs: [["Who collected the story of Hansel and Gretel?", "The Brothers Grimm", "Hans Christian Andersen", "Aesop"],
["What did Hansel drop the first time to find the way home?", "White pebbles", "Breadcrumbs", "Coins"],
["Who told the truth about the Emperor's clothes?", "A child", "The queen", "A soldier"],
["The Brothers Grimm were from which country?", "Germany", "Denmark", "France"]] });
ctTale({ id: "fogg", host: "world:race", t: "Around the World in Eighty Days", by: "Jules Verne, 1872", where: "Pyreline, at Phileas Fogg's wager board",
col: ["#1A2A3A", "#F8E8C8"], gold: 16, keep: ["A Reform Club wager slip", "🎫"], rad: 10,
props: [["wagerboard", 0, -5, 0, {}, 1.5, { hw: 1.6, hd: 0.3, h: 3 }], ["hotairballoon", -8, -9, 0, 0.35, {}]],
who: [
{ n: "Phileas Fogg", who: "Phileas Fogg, an exact, calm, mysterious English gentleman of the Reform Club who bet he could go round the world in 80 days",
o: { sex: "m", look: { layer: "suit", layerColor: 0x1A1A22, top: 0xF2EEE2, bottom: 0x1A1A22, hat: "tophat", hatColor: 0x0E0E10, hair: 0x8A6A4A, hairStyle: "short", beard: 1, neck: "bowtie", accColor: 0x1A1A1A } }, at: [-2, -1], greet: "Twenty thousand pounds says I can go round the world in eighty days. Eleven-forty precisely, we leave.", c: 650 },
{ n: "Passepartout", who: "Jean Passepartout, Fogg's lively, loyal French valet, a former acrobat, who keeps having adventures",
o: { sex: "m", look: { layer: "vest", layerColor: 0x8A2A2A, top: 0xF2EEE2, bottom: 0x2A2A3A, hat: "cap", hatColor: 0x2A2A3A, hair: 0x2A1A12, hairStyle: "curly" } }, at: [1.5, -1.5], greet: "Eighty days! And I left the gas light on in my room in London. Every day it's burning at my expense!", c: 450 },
{ n: "Aouda", who: "Aouda, a brave, well-educated woman rescued in India, who travels with Fogg and marries him at the end",
o: { sex: "f", look: { topKind: "dress", top: 0xE8A030, bottom: 0xE8A030, layer: "kimono", layerColor: 0xC83A6A, hair: 0x1A1210, hairStyle: "long", skin: 0xA06A44, neck: "necklace" } }, at: [4, -2], greet: "Mr Fogg seems cold, but he is the most generous man I know.", c: 500 }
],
steps: [
{ k: "run", w: 0, t: "Fogg checks his watch: \"The steamer leaves in two minutes.\" Race through every ring of the course before it sails!", n: 8, r: 34, secs: 120, done: "On board, with seconds to spare. Fogg did not even look surprised." },
{ k: "choose", w: 1, t: "Fogg thinks he's lost the bet by one day, arriving in London 'on the 81st day'. But he won! Why?", o: [["Travelling east round the world, he gained a whole day crossing the time zones", 1, "Yes! Every time zone east, his clock went forward an hour. 24 zones later, he'd lived 80 days while London had counted 79. Today we have the International Date Line."], ["His watch was broken", 0, "Fogg's watch was never wrong! Try again."], ["The judges cheated", 0, "Try again."]] },
{ k: "choose", w: 2, t: "Aouda asks: \"Which real traveller later tried to beat Fogg's 80 days?\"", o: [["Nellie Bly, an American journalist, who did it in 72 days in 1889-90", 1, "Yes! She even met Jules Verne on the way, in France."], ["Napoleon", 0, "No. Try again."], ["Queen Victoria", 0, "No. Try again."]] }
],
qs: [["How many time zones does the world have, roughly?", "24", "7", "100"],
["Which way did Fogg travel round the world?", "East", "West", "North over the Pole"],
["Who was Fogg's French valet?", "Passepartout", "Conseil", "Planchet"],
["Who really went round the world in 72 days in 1889-90?", "Nellie Bly", "Amelia Earhart", "Marco Polo"]] });
ctTale({ id: "lostworld", host: "world:race", t: "The Lost World", by: "Arthur Conan Doyle, 1912", where: "Pyreline, at Professor Challenger's lookout over the plateau",
col: ["#1E3A1A", "#F2E8B0"], gold: 16, keep: ["A pterodactyl feather-quill", "🪶"], rad: 13,
props: [["iguanodon", -6, -9, 0.4, {}, 4], ["iguanodon", 4, -11, -0.6, { s: 0.7 }, 3], ["tent", 7, -3, -0.6, 0.6], ["campfire", 3, -2, 0, {}, 1]],
who: [
{ n: "Professor Challenger", who: "Professor George Edward Challenger, a huge-bearded, loud, short-tempered, brilliant scientist who claims dinosaurs still live on a South American plateau",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x8A7A5A, top: 0xF2EEE2, bottom: 0x6A5A3A, hat: "brimmed", hatColor: 0xD8C8A0, hair: 0x1A1210, hairStyle: "short", beard: 1, build: 1.25, shoeKind: "boots" } }, at: [-2.5, -1], greet: "Doubt me, would you? Then come and see for yourself! Iguanodons, sir, in herds, like cows in a Sussex field!", c: 600 },
{ n: "Professor Summerlee", who: "Professor Summerlee, a thin, sour, careful scientist who doubts Challenger until he sees it with his own eyes",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x6A6A5A, top: 0xF2EEE2, bottom: 0x4A4A3A, face: "glasses", hair: 0xC8C8C8, hairStyle: "short", beard: 1, build: 0.85 } }, at: [0, -1.5], greet: "I shall believe it when I see it, and I shall write down precisely what I see.", c: 450 },
{ n: "Lord John Roxton", who: "Lord John Roxton, an adventurous, cool-headed English hunter and explorer",
o: { sex: "m", look: { layer: "jacket", layerColor: 0xC8B080, top: 0xF2EEE2, bottom: 0x8A7A5A, hat: "brimmed", hatColor: 0xC8B080, hair: 0xC8642A, hairStyle: "short", shoeKind: "boots", waist: "belt" } }, at: [2.5, -1], greet: "Steady now. We're here to look, not to shoot. These beasts have outlived everything else.", c: 500 },
{ n: "Edward Malone", who: "Edward Malone, the young Irish newspaper reporter who tells the story",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x3A4A5A, top: 0xF2EEE2, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x3A3A3A, hair: 0x8A5A2A, hairStyle: "short", waist: "satchel" } }, at: [5, -2], greet: "My editor will never believe this. Good thing I have my notebook, and a professor who shouts.", c: 450 }
],
steps: [
{ k: "find", w: 3, t: "Malone needs proof for his newspaper. Spot and sketch five creatures from a safe distance: walk to each lookout marker.", n: 5, look: "orb", col: 0xA8E070, r: 30, secs: 240, name: "a lookout point", done: "Your notebook is full. In the book they brought back a live pterodactyl to London as proof... and it escaped out of the window of the lecture hall!" },
{ k: "choose", w: 1, t: "Summerlee asks: \"Iguanodon was one of the first dinosaurs ever named. Who found its teeth, in the 1820s?\"", o: [["Gideon Mantell (and his wife Mary Ann) in Sussex, England", 1, "Yes. Mantell named it 'iguana tooth' because the teeth looked like a giant iguana's."], ["Charles Darwin", 0, "Not Darwin. Try again."], ["Professor Challenger", 0, "He's made up! Try again."]] },
{ k: "choose", w: 0, t: "Challenger booms: \"Could dinosaurs REALLY survive somewhere today?\"", o: [["No: the big dinosaurs died out 66 million years ago, but birds are their living descendants", 1, "Correct, and Challenger hates it. Every bird you see is a dinosaur's relative."], ["Yes, on plateaus", 0, "Only in stories. Try again."], ["Yes, in the sea", 0, "Try again."]] }
],
qs: [["Who wrote The Lost World in 1912?", "Arthur Conan Doyle", "H. G. Wells", "Jules Verne"],
["When did the big dinosaurs die out?", "About 66 million years ago", "About 10,000 years ago", "About 1 billion years ago"],
["Which animals alive today are related to dinosaurs?", "Birds", "Cats", "Fish"],
["What did the explorers bring back to London?", "A live pterodactyl", "An iguanodon egg", "A gold idol"]] });
ctTale({ id: "cavor", host: "world:surface:moon", t: "The First Men in the Moon", by: "H. G. Wells, 1901", where: "the Moon, beside Mr Cavor's sphere",
col: ["#1A1A22", "#E8E8F0"], gold: 16, keep: ["A flake of Cavorite", "💠"], rad: 10, near: 40,
props: [["cavorsphere", 0, -6, 0, {}, 2.5, { r: 2, h: 4 }]],
who: [
{ n: "Mr Cavor", who: "Mr Cavor, a dreamy, eccentric English inventor who made Cavorite, a substance that blocks gravity",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x6A6A5A, top: 0xF2EEE2, bottom: 0x4A4A3A, hat: "cap", hatColor: 0x6A6A5A, face: "glasses", hair: 0xC8C8C8, hairStyle: "short", build: 0.9, neck: "scarf", accColor: 0x8A6AA8 } }, at: [-2, -1], greet: "Cavorite, my dear fellow! It's opaque to gravitation, just as a metal sheet is to light. Close the shutters, and up we go!", c: 500 },
{ n: "Mr Bedford", who: "Mr Bedford, a businessman who went to the Moon with Cavor mostly for the gold, and tells the story",
o: { sex: "m", look: { layer: "suit", layerColor: 0x5A4A3A, top: 0xF2EEE2, bottom: 0x5A4A3A, hat: "brimmed", hatColor: 0x3A3228, hair: 0x8A6A4A, hairStyle: "short" } }, at: [1, -1.5], greet: "Gold, they use gold for chains here! I'm a rich man, if we ever get home.", c: 450 },
{ n: "A Selenite", who: "a Selenite, one of the insect-like people who live inside the Moon in Wells's story; it speaks in clicks and soft piping sounds", being: "grey", s: 0.8, at: [4, -3], greet: "(Click. Pipe. Click-click. It tilts its head, very curious.)" }
],
steps: [
{ k: "choose", w: 0, t: "Cavor asks: \"In my story, the Moon has air, and plants that grow at sunrise. What is the REAL Moon like?\"", o: [["No air, no water to drink, and no plants: a grey, dusty, airless world", 1, "Right. That's why astronauts wear spacesuits. The Moon's 'day' lasts about two Earth weeks, and its night two weeks more."], ["Exactly like Wells said", 0, "Wells was writing a story; we know much more now. Try again."], ["Made of cheese", 0, "Ha! Try again."]] },
{ k: "find", w: 1, t: "Bedford dropped five flakes of Cavorite from the sphere. Find them before they float away (with gravity blocked, they'd fly off!).", n: 5, look: "orb", col: 0xA8F0FF, r: 28, secs: 220, name: "a flake of Cavorite", done: "All five! In real physics nothing can block gravity, but low gravity is real: you're about six times lighter here." },
{ k: "choose", w: 2, t: "The Selenite clicks a question: on the Moon, how much do you weigh compared with Earth?", o: [["About a sixth", 1, "Yes. That's why Apollo astronauts bounced along, and why you jump so high here."], ["The same", 0, "Try a jump! Try again."], ["Twice as much", 0, "That would be a heavy planet. Try again."]] }
],
qs: [["What did Cavor's invention block?", "Gravity", "Light", "Sound"],
["How strong is the Moon's gravity compared with Earth's?", "About one-sixth", "About half", "The same"],
["What did Wells call the Moon's inhabitants?", "Selenites", "Martians", "Morlocks"],
["What does the Moon have very little of?", "Air", "Rock", "Dust"]] });
ctTale({ id: "lowell", host: "world:surface:mars", t: "The Canals of Mars", by: "real history: Schiaparelli (1877) and Percival Lowell (1895)", where: "Mars, at a little observer's hut",
col: ["#4A1E12", "#F8E0C8"], gold: 14, keep: ["A hand-drawn map of Mars", "🗺️"], rad: 9, near: 40,
props: [["telescope", 0, -4, 0, { s: 1.4 }, 1.5], ["obshut", -6, -6, 0.4, {}, 2.5, { r: 2, h: 3 }]],
who: [
{ n: "Percival Lowell", who: "Percival Lowell, a rich American astronomer who built an observatory in Arizona in 1894 and became sure he saw canals built by Martians",
o: { sex: "m", look: { layer: "suit", layerColor: 0x4A3A2A, top: 0xF2EEE2, bottom: 0x4A3A2A, hair: 0x5A3A22, hairStyle: "short", beard: 1, neck: "bowtie", accColor: 0x1A1A1A } }, at: [-2, -1], greet: "Look through the eyepiece! Lines, straight lines, crossing the deserts. Canals! A dying civilisation carrying water from the poles!", c: 500 },
{ n: "Giovanni Schiaparelli", who: "Giovanni Schiaparelli, the careful Italian astronomer who mapped Mars in 1877 and called its lines 'canali', meaning channels",
o: { sex: "m", look: { layer: "longcoat", layerColor: 0x2A2A3A, top: 0xF2EEE2, bottom: 0x2A2A3A, hair: 0xC8C8C8, hairStyle: "short", beard: 1, face: "glasses" } }, at: [1.5, -1.5], greet: "I said 'canali', channels. I never said anyone built them! The English heard 'canals'.", c: 450 }
],
steps: [
{ k: "choose", w: 1, t: "Schiaparelli asks: \"Why did so many people think Mars had canals?\"", o: [["Blurry telescopes and the human eye joining faint spots into lines, plus a mistranslation of 'canali'", 1, "Exactly. When spacecraft visited Mars from 1965 on, there were no canals at all."], ["Because there really are canals", 0, "Look around you: no canals! Try again."], ["Because the Martians said so", 0, "Try again."]] },
{ k: "find", w: 0, t: "Walk to five places Lowell drew as canals and see what's really there.", n: 5, look: "orb", col: 0xFFB070, r: 30, secs: 240, name: "a 'canal' on Lowell's map", done: "Dust, rocks and craters. But Mars did once have rivers and lakes billions of years ago: rovers have found their dried-up beds." },
{ k: "choose", w: 0, t: "Lowell sighs. \"Was it all wasted?\"", o: [["No: his observatory later helped find Pluto in 1930", 1, "Yes! Clyde Tombaugh found Pluto at the Lowell Observatory. Being wrong, carefully, still moves science forward."], ["Yes, completely", 0, "His observatory did great work. Try again."]] }
],
qs: [["What does the Italian word 'canali' mean?", "Channels", "Rivers of fire", "Cities"],
["Which world was found at Lowell's observatory in 1930?", "Pluto", "Neptune", "Mars's moons"],
["What did spacecraft find on Mars instead of canals?", "Craters, dust, and old dried river beds", "Cities", "Forests"],
["Which rover landed in Jezero crater on Mars in 2021?", "Perseverance", "Sojourner", "Hubble"]] });
ctTale({ id: "tarzan", host: "world:race", t: "Tarzan of the Apes", by: "Edgar Rice Burroughs, 1912", where: "Pyreline, at the edge of the jungle by the cabin on the shore",
col: ["#1E3A16", "#F2E2A8"], gold: 16, keep: ["A carved hunting knife of the cabin", "🔪"], rad: 12, near: 40,
props: [["tent", -6, -6, 0.5, 0.7], ["campfire", 0, -3, 0, {}, 1], ["palm", 6, -8, 0, 1], ["palm", -8, -10, 0.6, 1.2], ["tree", 8, -2, 0, 1.1]],
who: [
{ n: "Tarzan", who: "Tarzan of the Apes as Burroughs first wrote him in 1912: John Clayton, heir of Lord Greystoke, raised from a baby by the great ape Kala on the coast of West Africa, strong, quick and clever, who taught himself to read from picture books and speaks with the apes",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x8A6A3A, top: 0x8A6A3A, bottom: 0x6A4A2A, bottomKind: "shorts", hair: 0x2A1A10, hairStyle: "long", shoes: 0x8A6A3A, waist: "belt", accColor: 0x5A3A1A, build: 1.15 } }, at: [-2, -1], greet: "I am Tarzan, of the apes. Kala raised me. I learned the letters from the books in the cabin, before I ever heard a man speak.", c: 650 },
{ n: "Kala", who: "Kala, the great she-ape who lost her own baby and raised the human child as her son, gentle and fierce in his defence", make: "ape", at: [1, -2], greet: "(Kala grunts softly and pats the ground beside her, the way she did when Tarzan was small.)" },
{ n: "Kerchak", who: "Kerchak, the huge, bad-tempered king of Kala's tribe of great apes, whom the grown Tarzan finally defeats", make: "ape", mo: { big: 1, fur: 0x1E1A18 }, at: [4, -3.5], turn: -0.4, greet: "(Kerchak beats his chest and glares. He does not like strangers in his part of the forest.)" },
{ n: "Jane Porter", who: "Jane Porter of Baltimore, Maryland, brave and kind, marooned on the coast with her father Professor Porter's treasure-hunting party, whom Tarzan saves",
o: { sex: "f", look: { top: 0xF2EEE2, topKind: "dress", bottom: 0xE8E2D2, bottomKind: "skirt", hat: "brimmed", hatColor: 0xF2EEE2, hair: 0xC89A5A, hairStyle: "bun", shoeKind: "boots" } }, at: [-5, -1.5], greet: "Professor Porter's party came looking for treasure, and found a jungle that writes notes to us in perfect English. Can you imagine?", c: 550 },
{ n: "Paul D'Arnot", who: "Lieutenant Paul D'Arnot of the French navy, whom Tarzan rescues, and who becomes his friend, teaches him French and takes him out into the world",
o: { sex: "m", look: { layer: "uniform", layerColor: 0xF2EEE2, top: 0xF2EEE2, bottom: 0xF2EEE2, hat: "cap", hatColor: 0x1A2A4A, hair: 0x2A1A10, hairStyle: "short", shoeKind: "boots" } }, at: [6, -1], greet: "Mon ami! He saved my life, and then I taught him to speak. The first man he ever spoke with, he spoke French!", c: 500 }
],
steps: [
{ k: "say", w: 1, t: "(Kala holds you gently, as she held the baby she found in the cabin.) Tarzan's mother and father were marooned here in 1888. Kala took their baby and raised him with the apes. In their language, 'Tarzan' means 'White-Skin'." },
{ k: "find", w: 0, t: "Tarzan learned to read by himself, from the picture books in his parents' cabin. The apes scattered them! Find the five books before the rain comes.", n: 5, look: "page", col: 0xF8F2E0, r: 28, secs: 200, name: "a lost book", done: "All five! He worked out that the 'little bugs' on the pages made words, and taught himself to read and write English, years before he heard anyone speak it." },
{ k: "choose", w: 0, t: "Tarzan asks: \"How did I learn to read?\"", o: [["By himself, from the children's books in his parents' cabin", 1, "Yes. He matched the pictures to the letters, like a puzzle, with nobody to help."], ["Jane Porter taught him", 0, "Jane came much later. Try again."], ["The apes taught him", 0, "The apes have no letters. Try again."]] },
{ k: "run", w: 0, t: "A lion is near Jane's camp! Race through the treetops and the clearings, through every ring, to reach her in time.", n: 7, r: 30, secs: 110, done: "In time! In the book Tarzan saves Jane, and leaves notes for her party, written in English he had taught himself." },
{ k: "choose", w: 4, t: "D'Arnot asks: \"Which language did I teach Tarzan to speak first?\"", o: [["French", 1, "Oui! He could read and write English, but the first language he ever SPOKE was D'Arnot's French."], ["English", 0, "He could read it, but he never heard it spoken. Try again."], ["Latin", 0, "Try again."]] }
],
qs: [["When was Tarzan of the Apes first published?", "1912", "1850", "1955"],
["What is Tarzan's family name in the book?", "Clayton, heir of Lord Greystoke", "Porter", "D'Arnot"],
["Where on Earth is the book set?", "The west coast of Africa", "The Amazon", "India"],
["What does 'Tarzan' mean in the apes' language?", "White-Skin", "Strong-Arm", "Tree-Swinger"]] });
ctTale({ id: "jason", host: "land:heavens", t: "Jason and the Golden Fleece", by: "Greek myth (Apollonius of Rhodes; Charles Kingsley, The Heroes, 1856)", where: "the Heavens, at the cloud court of Olympus",
col: ["#1A3A6A", "#F2D070"], gold: 16, keep: ["A tuft of golden fleece", "🐏"], rad: 10,
props: [["statue", -7, -5, 0, 0.8], ["statue", 7, -5, 0, 0.8], ["fountain", 0, -9, 0, 0.6, 3], ["tree", -9, -8, 0, 0.7]],
who: [
{ n: "Jason", who: "Jason, the young prince raised by a centaur, who sails on the Argo to fetch the Golden Fleece and win back his father's throne",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x2A4A8A, top: 0xF2EEE2, bottom: 0x2A4A8A, shoeKind: "sandals", hair: 0x3A2414, hairStyle: "long", back: "cape", backColor: 0xC8A040, waist: "belt" } }, at: [-2, -1], greet: "My uncle Pelias stole my father's throne. He says I can have it back... if I bring him the Golden Fleece from the end of the world.", c: 500 },
{ n: "Medea", who: "Medea, the clever princess of Colchis, a priestess of Hecate who knows every herb and charm, and who helps Jason",
o: { sex: "f", look: { topKind: "dress", top: 0x4A1A5A, bottom: 0x2A1A3A, hair: 0x1A1210, hairStyle: "long", neck: "necklace", back: "cloak", backColor: 0x2A1A3A } }, at: [2, -1.5], greet: "My father will set him tasks no man can do. Unless someone helps him. Unless I help him.", c: 550 },
{ n: "Chiron", who: "Chiron, the wise and gentle centaur of Mount Pelion, teacher of heroes",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x8A6A3A, top: 0xC8B898, bottom: 0x6A4A2A, hair: 0xD8D8D8, hairStyle: "long", beard: "long" } }, at: [-4, -5], greet: "Every hero I raised learned the same first lesson: listen before you act." },
{ n: "Argus", who: "Argus, the shipwright who built the Argo with the goddess Athena's help",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A5A3A, top: 0xB8A888, bottom: 0x4A3A2A, hair: 0x5A4A3A, hairStyle: "short", beard: 1, waist: "belt", shoeKind: "boots" } }, at: [4, -5], greet: "Fifty oars, and a beam from the talking oak of Dodona in her prow. She'll answer you if you speak to her kindly.", c: 450 },
{ n: "King Aeetes", who: "King Aeetes of Colchis, son of the Sun, who owns the Golden Fleece and does not mean to give it up",
o: { sex: "m", look: { topKind: "robe", top: 0xC8A040, bottom: 0x8A6A2A, hair: 0x2A1A12, hairStyle: "short", beard: "long", neck: "necklace", back: "cloak", backColor: 0x8A2A2A } }, at: [6, 1], greet: "You want my Fleece? Yoke my bulls. They breathe fire. Then sow a field with dragon's teeth. Then we'll talk.", c: 600 }
],
steps: [
{ k: "choose", w: 2, t: "Chiron asks: \"An old woman wants carrying across a flooded river. You are in a hurry. What do you do?\"", o: [
["Carry her across, hurry or not", 1, "Yes. In the myth she was the goddess Hera in disguise, and she helped Jason ever after. He lost a sandal in the river, too."],
["Point her to a bridge further down", 0, "Kind, but not what Jason did. Try again."],
["Leave her: heroes can't stop for everyone", 0, "Chiron frowns. Try again."]
] },
{ k: "find", w: 3, t: "Argus needs timber. Gather the five glowing pine-logs from the slopes, for the Argo's hull.", n: 5, look: "star", col: 0xF2C860, r: 30, secs: 240, name: "a pine-log", done: "The Argo is built: fifty oars, the fastest ship of her age, with a speaking beam from Dodona in her prow." },
{ k: "choose", w: 1, t: "Medea asks: \"The dragon by the Fleece never sleeps. How will you get past it?\"", o: [
["With Medea's sleeping-charm, sung while Jason takes the Fleece", 1, "Yes. Medea sang it to sleep and sprinkled its eyes with a herb, and Jason lifted the Fleece from the oak."],
["Fight it with a sword", 0, "No one could win that fight. Try again."],
["Sneak past while it eats", 0, "It never eats or sleeps, or so they said. Try again."]
] }
],
qs: [["What was the name of Jason's ship?", "The Argo", "The Odyssey", "The Golden Hind"],
["Who taught Jason when he was a boy?", "Chiron the centaur", "Hercules", "King Pelias"],
["What did Jason lose crossing the river?", "One sandal", "His sword", "His helmet"],
["Where was the Golden Fleece kept?", "In Colchis, on an oak tree guarded by a dragon", "In Athens, in a temple", "At the bottom of the sea"]] });
var CT_RETIRE_IDS = [
"alice", "tirnanog", "mermaid", "cthulhu", "sleepyhollow", "arabian", "egypt", "robinhood", "arthur", "pinocchio",
"lilliput", "beowulf", "grimm", "columbiad",
"vn_island", "vn_balloon", "vn_robur", "lowell",
"thor", "odin", "wukong", "gilgamesh", "yokai", "quixote", "cavor"
];
var CT_RETIRED = [];
(function () { var t0 = ctTale; ctTale = function (T) { if (T && CT_RETIRE_IDS.indexOf(T.id) >= 0) {
CT_RETIRED.push(T);
return T;
} return t0(T); }; })();
function ctRetired(id) { return CT_RETIRE_IDS.indexOf(id) >= 0; }
(function () { for (var i = CT_TALES.length - 1; i >= 0; i--)
if (CT_RETIRE_IDS.indexOf(CT_TALES[i].id) >= 0)
CT_RETIRED.unshift(CT_TALES.splice(i, 1)[0]); })();
var CT = { host: null, g: null, wg: null, at: {}, talkers: [], solids: [], near: null, myFn: null, run: null, hud: null, busy: false, noSql: false,
rules: null, rulesAt: 0, landAt: {}, e1: 0 };
var CT_BY_HOST = {}, CT_BY_ID = {};
CT_TALES.forEach(function (T) { CT_BY_ID[T.id] = T; (CT_BY_HOST[T.host] = CT_BY_HOST[T.host] || []).push(T); });
function ctLite() { return typeof LITE !== "undefined" && !!LITE; }
function ctSigned() { return typeof signedIn === "function" && signedIn(); }
function ctKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function ctRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function ctMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e)); }
function ctSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function ctTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function ctE(s) { return typeof esc === "function" ? esc(s) : String(s); }
function ctHash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function ctRand(seed) { var s = (seed >>> 0) || 7; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
function ctData() { var d = store.tales; if (!d || typeof d !== "object")
d = store.tales = {}; if (!d.done || typeof d.done !== "object")
d.done = {}; return d; }
function ctHostNow() {
if (typeof WLD !== "undefined" && WLD.on) {
var k = WLD.on === "surface" ? "surface:" + ((typeof SF !== "undefined" && SF.k) || "") : WLD.on;
return "world:" + k;
}
if (typeof LD !== "undefined" && LD.g && LD.kind && typeof ldRealm === "function" && ldRealm())
return "land:" + LD.kind;
return null;
}
function ctMe() {
var P = camera.position;
if (CT.host && CT.host.indexOf("land:") === 0)
return { x: P.x - LD.ox, z: P.z - LD.oz, y: P.y - 1.72 };
return { x: P.x - (WLD.w ? WLD.w.base : 0), z: P.z, y: P.y - 1.72 };
}
function ctGround(x, z, feet) {
if (CT.host && CT.host.indexOf("land:") === 0)
return typeof ldY === "function" ? ldY(x, z) : 0;
var W = WLD.w;
if (!W || !W.ground)
return 0;
try {
var h = W.ground(x, z, feet === undefined ? (CT.feet0 || 0) + 2 : feet);
return (h == null || !isFinite(h)) ? null : +h;
}
catch (e) {
return null;
}
}
function ctHostGroup() { return CT.host && CT.host.indexOf("land:") === 0 ? LD.g : CT.g; }
function ctPersonBody(W, seed) { return __ZC(354, 0, this, arguments, new.target); }
function ctTalk(T, W) { return __ZC(354, 1, this, arguments, new.target); }
function ctKitSize(a) { var d = typeof KIT !== "undefined" && KIT[a]; return d ? Math.max(d.size[0], d.size[2]) : 2; }
(function () {
if (typeof LD_SETS === "undefined")
return;
Object.keys(CT_BY_HOST).forEach(function (h) {
if (h.indexOf("land:") !== 0)
return;
var k = h.slice(5), orig = LD_SETS[k];
if (typeof orig !== "function")
return;
LD_SETS[k] = function (P) {
orig(P);
try {
ctLandPlan(k, P);
}
catch (e) {
if (window.console)
console.warn("[classic-tales] land", k, e);
}
};
});
if (typeof ldUse === "function") {
var lu = ldUse;
ldUse = function (T) {
if (T && T.card && T.card.ct) {
ctBoard(T.card.ct);
return;
}
if (T && T.card && T.card.ctTalk) {
if (typeof wTalk === "function")
wTalk(T.card.ctTalk);
if (typeof LD !== "undefined")
LD.near = null;
return;
}
return lu.apply(this, arguments);
};
}
})();
function ctLandFree(P, x, z, rad, taken) { return __ZC(354, 2, this, arguments, new.target); }
function ctLandPlan(k, P) { return __ZC(354, 3, this, arguments, new.target); }
function ctLay(T, cx, cz, face, put) { return __ZC(354, 4, this, arguments, new.target); }
function ctBoardShape(g, T) { return __ZC(354, 5, this, arguments, new.target); }
function ctWorldFree(W, x, z, rad, y0, taken) { return __ZC(354, 6, this, arguments, new.target); }
function ctWorldBuild(host) { return __ZC(354, 7, this, arguments, new.target); }
(function () {
Object.keys(CT_BY_HOST).forEach(function (h) {
if (h.indexOf("world:") !== 0)
return;
var key = h.slice(6).split(":")[0], W = typeof WORLDS !== "undefined" && WORLDS[key];
if (!W || W.ctBlock)
return;
var b0 = W.block;
W.ctBlock = 1;
W.block = function (x, z, feet) {
if (CT.g && CT.g.parent && CT.wg === W.g && CT.solids.length && typeof worldSolidAt === "function") {
var gh = 0;
try {
gh = W.ground(x, z, feet);
}
catch (e) { }
if (worldSolidAt(CT.solids, x, z, feet - (+gh || 0)))
return true;
}
return b0 ? b0.apply(this, arguments) : false;
};
});
})();
function ctTick(dt) {
var host = ctHostNow();
if (host !== CT.host) {
if (CT.run)
ctStop("You left the story behind. It waits for you on its board.");
CT.host = host;
CT.near = null;
if (CT.myFn) {
worldPrompt(null);
CT.myFn = null;
}
}
if (host && typeof ctRules === "function")
ctRules();
if (host === "world:ctale") {
if (CT.run)
try {
ctRunTick(dt);
}
catch (e) {
if (!CT.e1) {
CT.e1 = 1;
if (window.console)
console.warn("[classic-tales] run", e);
}
ctStop("The chapter stopped.");
}
return;
}
if (!host || !CT_BY_HOST[host]) {
ctHud(null);
return;
}
if (host.indexOf("world:") === 0) {
var W = WLD.w;
if (W && W.g && (!CT.g || CT.g.parent !== W.g))
ctWorldBuild(host);
ctWorldTalkers(dt);
}
if (CT.run)
try {
ctRunTick(dt);
}
catch (e) {
if (!CT.e1) {
CT.e1 = 1;
if (window.console)
console.warn("[classic-tales] run", e);
}
ctStop("The story stopped.");
}
}
function ctWorldTalkers(dt) { return __ZC(354, 8, this, arguments, new.target); }
function ctUse(T) {
if (!T)
return;
if (T.ct) {
ctBoard(T.ct);
return;
}
if (T.talk && typeof wTalk === "function") {
var g = T.p && T.p.g;
if (g) {
var L = ctMe();
g.rotation.y = Math.atan2(L.x - g.position.x, L.z - g.position.z);
}
wTalk(T.talk);
CT.near = null;
CT.myFn = null;
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
ctTick(dt);
}
catch (e) {
if (!CT.e2) {
CT.e2 = 1;
if (window.console)
console.warn("[classic-tales] tick", e);
}
} };
})();
CT_RETIRED.forEach(function (T) { if (T.id === "arthur" || T.id === "robinhood")
CT_BY_ID[T.id] = T; });
var CT_MATS = {};
function ctM(col, e, op) { return __ZC(354, 9, this, arguments, new.target); }
function ctAdd(g, geo, col, x, y, z, rx, ry, rz, e, op) { var m = new THREE.Mesh(geo, typeof col === "number" ? ctM(col, e, op) : col); m.position.set(x || 0, y || 0, z || 0); m.rotation.set(rx || 0, ry || 0, rz || 0); g.add(m); return m; }
function ctBox(w, h, d) { return new THREE.BoxGeometry(w, h, d); }
function ctCyl(a, b, h, n) { return new THREE.CylinderGeometry(a, b, h, n || 10); }
function ctSph(r, n) { return new THREE.SphereGeometry(r, n || 10, Math.max(6, (n || 10) - 3)); }
function ctCone(r, h, n) { return new THREE.ConeGeometry(r, h, n || 10); }
function ctTor(r, t) { return new THREE.TorusGeometry(r, t, 6, 18); }
function ctLight(g, col, x, y, z, size) { if (typeof wGlow === "function") {
var s = wGlow(col, size || 2, 0.4);
s.position.set(x, y, z);
g.add(s);
} }
function ctTable(g, w, d, col, top) { ctAdd(g, ctBox(w, 0.08, d), top || col, 0, 0.76, 0); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { ctAdd(g, ctBox(0.08, 0.76, 0.08), col, q[0] * (w / 2 - 0.1), 0.38, q[1] * (d / 2 - 0.1)); }); }
function ctChair(g, x, z, ry, col) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry;
ctAdd(c, ctBox(0.48, 0.06, 0.48), col, 0, 0.46, 0);
ctAdd(c, ctBox(0.48, 0.6, 0.06), col, 0, 0.76, -0.22);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { ctAdd(c, ctBox(0.05, 0.46, 0.05), col, q[0] * 0.2, 0.23, q[1] * 0.2); });
g.add(c);
}
var CT_SHAPES = {
teatable: function (g) { return __ZC(354, 10, this, arguments, new.target); },
rabbithole: function (g) { ctAdd(g, ctCyl(1.4, 1.6, 0.3, 16), 0x5A4A2A, 0, 0.12, 0); ctAdd(g, ctCyl(0.9, 0.9, 0.32, 16), 0x0E0A08, 0, 0.15, 0); ctAdd(g, ctTor(1.1, 0.18), 0x3A6A2A, 0, 0.28, 0, Math.PI / 2); },
croquet: function (g) {
for (var i = 0; i < 5; i++) {
var h = ctAdd(g, ctTor(0.35, 0.03), 0xC83A3A, (i - 2) * 1.4, 0.35, (i % 2) * 1.2);
h.scale.y = 1.4;
}
ctAdd(g, ctSph(0.12), 0xC83A3A, -1, 0.12, 1.6);
ctAdd(g, ctSph(0.12), 0xE8E0D0, 1.3, 0.12, 1.9);
},
mirrorshield: function (g) { ctAdd(g, ctCyl(0.08, 0.12, 1.2, 8), 0x8A7A5A, 0, 0.6, 0); var s = ctAdd(g, ctCyl(0.7, 0.7, 0.06, 24), 0xE8E8F0, 0, 1.6, 0, Math.PI / 2); s.material = new THREE.MeshPhongMaterial({ color: 0xE0E4EC, shininess: 120, specular: 0xFFFFFF }); ctAdd(g, ctTor(0.7, 0.05), 0xC8A040, 0, 1.6, 0.02); },
nautilus: function (g) { return __ZC(354, 11, this, arguments, new.target); },
ruins: function (g) {
for (var i = 0; i < 6; i++) {
var h = 1 + ((i * 37) % 5) * 0.5;
ctAdd(g, ctCyl(0.35, 0.4, h, 8), 0xC8C0A8, Math.cos(i) * 3, h / 2, Math.sin(i) * 3);
}
ctAdd(g, ctBox(4, 0.4, 0.8), 0xB8B098, 0, 0.2, -1.5, 0, 0.3);
ctAdd(g, ctBox(1.6, 0.6, 1.2), 0xA8A088, 1.5, 0.3, 1.4, 0.2, 0.8);
},
coralgarden: function (g) {
var cols = [0xE86A8A, 0xF8A040, 0xA86AE8, 0x6AE8C8];
for (var i = 0; i < 10; i++) {
var a = i * 0.63, r = 1 + (i % 3) * 0.8;
ctAdd(g, ctCone(0.25, 0.8 + (i % 4) * 0.3, 6), cols[i % 4], Math.cos(a) * r, 0.45, Math.sin(a) * r);
}
ctAdd(g, ctSph(0.4), 0xF8E040, 0, 0.4, 0, 0, 0, 0, 1);
},
idolstone: function (g) { return __ZC(354, 12, this, arguments, new.target); },
labbench: function (g) { return __ZC(354, 13, this, arguments, new.target); },
innsign: function (g) {
ctAdd(g, ctCyl(0.08, 0.1, 3.2, 8), 0x3A2A1A, 0, 1.6, 0);
ctAdd(g, ctBox(1.2, 0.06, 0.06), 0x3A2A1A, 0.55, 3, 0);
if (typeof wSign === "function") {
var s = wSign(["The Coach", "and Horses"], 1, 0.7, "#2A3A1A", "#F2E2B0");
s.position.set(0.8, 2.5, 0);
g.add(s);
}
},
pumpkins: function (g) { for (var i = 0; i < 7; i++) {
var p = ctAdd(g, ctSph(0.28 + (i % 3) * 0.08, 10), 0xE8701A, Math.cos(i * 0.9) * 1.1, 0.25, Math.sin(i * 0.9) * 1.1);
p.scale.y = 0.75;
ctAdd(g, ctCyl(0.03, 0.03, 0.12, 5), 0x3A5A1A, p.position.x, 0.5, p.position.z);
} },
churchbridge: function (g) {
ctAdd(g, ctBox(2.4, 0.18, 6), 0x5A4230, 0, 0.6, 0);
[-1, 1].forEach(function (s) { ctAdd(g, ctBox(0.1, 0.9, 6), 0x4A3424, s * 1.15, 1.1, 0); for (var z = -3; z <= 3; z += 1.5)
ctAdd(g, ctBox(0.15, 1.2, 0.15), 0x4A3424, s * 1.15, 0.6, z); });
ctAdd(g, ctBox(4, 0.08, 8), 0x2A4A5A, 0, 0.08, 0, 0, 0, 0, 0, 0.85);
},
feasttable: function (g) {
ctTable(g, 7.2, 1.4, 0x4A3020, 0x5A3A22);
for (var i = 0; i < 6; i++) {
ctAdd(g, ctCone(0.08, 0.4, 6), 0xE8D8B0, -3 + i * 1.2, 0.98, 0, 0, 0, Math.PI / 2.4);
ctAdd(g, ctSph(0.16), 0xC8A040, -2.4 + i * 1.2, 0.9, 0.3);
}
[-1, 1].forEach(function (s) { ctAdd(g, ctBox(7, 0.1, 0.4), 0x3A2416, 0, 0.45, s * 1.1); });
},
iceslabs: function (g) { for (var i = 0; i < 8; i++) {
var s = ctAdd(g, ctBox(1.6 + (i % 3) * 0.6, 0.3 + (i % 2) * 0.5, 1.4), 0xD8ECF8, Math.cos(i * 0.8) * 4, 0.2, Math.sin(i * 0.8) * 3, 0.1, i, 0.15);
s.material = ctM(0xD8ECF8, 0, 0.92);
} },
brickroad: function (g) { var m = ctAdd(g, ctBox(3, 0.06, 22), 0xF2C83A, 0, 0.04, -4); for (var z = -14; z < 6; z += 0.8)
ctAdd(g, ctBox(3, 0.065, 0.04), 0xC89A2A, 0, 0.05, z); },
emeraldgate: function (g) { return __ZC(354, 14, this, arguments, new.target); },
scarecrowpost: function (g) { ctAdd(g, ctCyl(0.06, 0.08, 2.4, 6), 0x6A4A2A, 0, 1.2, 0); ctAdd(g, ctBox(1.6, 0.08, 0.08), 0x6A4A2A, 0, 1.9, 0); ctAdd(g, ctCyl(1.2, 1.2, 0.05, 10), 0x6AA83A, 0, 0.03, 0); },
flamemount: function (g) {
for (var i = 0; i < 5; i++) {
var x = (i - 2) * 4, h = 6 + (i % 2) * 3;
ctAdd(g, ctCone(3.2, h, 8), 0x8A2A12, x, h / 2, -(i % 2) * 2);
ctAdd(g, ctCone(1.2, 2, 8), 0xFF7A2A, x, h - 0.3, -(i % 2) * 2, 0, 0, 0, 1);
}
ctLight(g, 0xFF8A3A, 0, 7, 0, 9);
},
telescope: function (g, o) { return __ZC(354, 15, this, arguments, new.target); },
cylinder: function (g) { ctAdd(g, ctCyl(4.5, 5, 1, 20), 0x6A4A2A, 0, -0.2, 0); var c = ctAdd(g, ctCyl(1.6, 1.6, 7, 18), 0x5A5A52, 0, 1.2, 0, Math.PI / 2, 0, 0.25); ctAdd(g, ctCyl(1.62, 1.62, 0.2, 18), 0x8A8A7A, 0, 1.2 + 0.9, 3.4, Math.PI / 2, 0, 0.25); },
tripod: function (g) {
ctAdd(g, ctSph(1.4, 12), 0x5A5A5A, 0, 1.2, 0).scale.set(1.3, 0.6, 1);
for (var i = 0; i < 3; i++) {
var a = i * 2.1;
ctAdd(g, ctCyl(0.12, 0.1, 7, 6), 0x4A4A4A, Math.cos(a) * 3.2, 0.4, Math.sin(a) * 3.2, 0, -a, Math.PI / 2.15);
}
ctAdd(g, ctCyl(0.08, 0.08, 2.4, 6), 0x4A4A4A, 1.6, 1.4, 0.6, 0.4, 0, 1.1);
},
cavedoor: function (g) { var r = ctAdd(g, ctSph(4, 10), 0x9A6A3A, 0, 1.5, -1.5); r.scale.set(1.5, 1, 0.7); ctAdd(g, ctBox(2.2, 3.2, 0.3), 0x4A2E18, 0, 1.6, 1.25); ctAdd(g, ctBox(2.6, 0.3, 0.4), 0x7A5030, 0, 3.3, 1.3); },
cushions: function (g) { ctAdd(g, ctBox(3, 0.06, 2), 0x8A1A3A, 0, 0.03, 0); [[-0.8, 0x2A6AC8], [0, 0xE8B83A], [0.8, 0x6A2A8A]].forEach(function (q) { ctAdd(g, ctBox(0.7, 0.25, 0.7), q[1], q[0], 0.15, 0); }); },
tablets: function (g) { for (var i = 0; i < 4; i++) {
var t = new THREE.Group();
t.position.set((i - 1.5) * 0.9, 0, 0);
g.add(t);
ctAdd(t, ctBox(0.7, 1, 0.15), 0xC8A070, 0, 0.9, 0, -0.1);
ctAdd(t, ctBox(0.12, 0.5, 0.3), 0x6A4A2A, 0, 0.25, 0);
} },
columbiad: function (g) { ctAdd(g, ctCyl(2.4, 2.8, 1.2, 18), 0x5A5A5A, 0, 0.6, 0); ctAdd(g, ctCyl(1.4, 1.6, 9, 18), 0x3A3A3A, 0, 5, 0); ctAdd(g, ctTor(1.5, 0.15), 0x8A8A8A, 0, 9.4, 0, Math.PI / 2); for (var i = 0; i < 3; i++)
ctAdd(g, ctTor(1.62, 0.1), 0x6A6A6A, 0, 2 + i * 2.4, 0, Math.PI / 2); },
shell: function (g) { ctAdd(g, ctCyl(0.7, 0.7, 1.6, 16), 0xA8ACB4, 0, 0.8, 0); ctAdd(g, ctCone(0.7, 1.2, 16), 0xA8ACB4, 0, 2.2, 0); for (var i = 0; i < 3; i++)
ctAdd(g, ctCyl(0.12, 0.12, 0.04, 10), 0xBFE8FF, Math.cos(i * 2.1) * 0.7, 1.2, Math.sin(i * 2.1) * 0.7, 0, 0, Math.PI / 2, 0x3A6A8A); },
timemachine: function (g) { return __ZC(354, 16, this, arguments, new.target); },
whitesphinx: function (g) {
ctAdd(g, ctBox(3, 1.6, 5), 0xE8E4D8, 0, 0.8, 0);
var b = ctAdd(g, ctSph(1.2, 12), 0xF0ECE0, 0, 2.2, 0.5);
b.scale.set(1, 0.8, 1.6);
ctAdd(g, ctSph(0.8, 12), 0xF0ECE0, 0, 3.6, 1.8);
[-1, 1].forEach(function (s) { var w = ctAdd(g, ctBox(0.12, 1.6, 2.4), 0xF0ECE0, s * 1.1, 3.2, 0, 0, 0, s * 0.5); });
},
scales: function (g) { return __ZC(354, 17, this, arguments, new.target); },
stonelantern: function (g) { ctAdd(g, ctCyl(0.15, 0.2, 0.9, 6), 0x8A8A82, 0, 0.45, 0); ctAdd(g, ctBox(0.5, 0.4, 0.5), 0x9A9A92, 0, 1.1, 0); ctAdd(g, ctBox(0.3, 0.25, 0.52), 0xFFC870, 0, 1.1, 0, 0, 0, 0, 1); ctAdd(g, ctCone(0.5, 0.35, 4), 0x7A7A72, 0, 1.5, 0, 0, Math.PI / 4); },
shrinegate: function (g) { [-1.8, 1.8].forEach(function (x) { ctAdd(g, ctCyl(0.18, 0.22, 4, 10), 0xC8301A, x, 2, 0); }); ctAdd(g, ctBox(5, 0.3, 0.4), 0x1A1A1A, 0, 4.1, 0); ctAdd(g, ctBox(4.4, 0.25, 0.3), 0xC8301A, 0, 3.5, 0); },
target: function (g) { return __ZC(354, 18, this, arguments, new.target); },
lakeshore: function (g) { var w = ctAdd(g, ctCyl(6, 6, 0.08, 24), 0x3A6A8A, 0, 0.05, 0); w.material = ctM(0x3A6A8A, 0x0A2030, 0.9); for (var i = 0; i < 10; i++)
ctAdd(g, ctCyl(0.03, 0.03, 1.1, 4), 0x6A8A3A, Math.cos(i * 0.6) * 6.2, 0.5, Math.sin(i * 0.6) * 6.2); },
humptywall: function (g) { ctAdd(g, ctBox(4, 1.6, 1), 0xFF5A3A, 0, 0.8, 0); for (var x = -1.5; x <= 1.5; x += 1)
ctAdd(g, ctBox(0.9, 0.05, 1.02), 0xFFE0C0, x, 0.8, 0); },
kidsflowers: function (g) {
var c = [0xFF2A8A, 0xFFD020, 0x2AC8FF, 0x7AE040, 0xFF7A1A, 0xB04AFF];
for (var i = 0; i < 14; i++) {
var a = i * 0.45, r = 0.4 + (i % 4) * 0.4;
ctAdd(g, ctCyl(0.03, 0.03, 0.6, 4), 0x3AA83A, Math.cos(a) * r, 0.3, Math.sin(a) * r);
ctAdd(g, ctSph(0.16, 8), c[i % 6], Math.cos(a) * r, 0.65, Math.sin(a) * r);
}
},
workbench: function (g) {
ctTable(g, 3, 1, 0x8A5A2A, 0xC8904A);
for (var i = 0; i < 3; i++) {
var p = new THREE.Group();
p.position.set(-0.8 + i * 0.8, 0.8, 0);
g.add(p);
ctAdd(p, ctSph(0.1), 0xE8B070, 0, 0.35, 0);
ctAdd(p, ctBox(0.16, 0.25, 0.1), [0xFF3A2A, 0x2A8AFF, 0xFFD020][i], 0, 0.15, 0);
}
ctAdd(g, ctBox(0.3, 0.08, 0.08), 0x5A5A5A, 1.2, 0.84, 0.2);
},
pighouse: function (g, o) { return __ZC(354, 19, this, arguments, new.target); },
bowls: function (g) { ctTable(g, 2, 0.8, 0xC87A3A, 0xFFE0B0); [[-0.6, 0.18, 0x2A8AFF], [0, 0.14, 0xFF3A8A], [0.6, 0.1, 0x7AE040]].forEach(function (q) { ctAdd(g, ctCyl(q[1], q[1] * 0.7, q[1] * 0.8, 12), q[2], q[0], 0.86, 0); ctAdd(g, ctCyl(q[1] * 0.9, q[1] * 0.9, 0.02, 12), 0xF2E8C8, q[0], 0.86 + q[1] * 0.35, 0); }); },
gulliver: function (g) { return __ZC(354, 20, this, arguments, new.target); },
tinytown: function (g) { return __ZC(354, 21, this, arguments, new.target); },
campfire: function (g) { return __ZC(354, 22, this, arguments, new.target); },
mushroomgrove: function (g) {
var c = [0x7AE0C8, 0xC88AE8, 0xE8D07A];
for (var i = 0; i < 7; i++) {
var h = 0.8 + (i % 3) * 0.7, x = Math.cos(i * 0.9) * 2.2, z = Math.sin(i * 0.9) * 2.2;
ctAdd(g, ctCyl(0.12, 0.16, h, 6), 0xE8E0D0, x, h / 2, z);
var cap = ctAdd(g, ctSph(0.5 + (i % 3) * 0.2, 10), c[i % 3], x, h, z, 0, 0, 0, 1);
cap.scale.y = 0.45;
}
},
icepalace: function (g) { return __ZC(354, 23, this, arguments, new.target); },
roses: function (g) { for (var i = 0; i < 9; i++) {
var x = (i % 3 - 1) * 0.5, z = Math.floor(i / 3) * 0.4 - 0.4;
ctAdd(g, ctCyl(0.02, 0.02, 0.6, 4), 0x2A6A2A, x, 0.3, z);
ctAdd(g, ctSph(0.1, 8), i % 2 ? 0xE82A3A : 0xF8F0F0, x, 0.62, z);
} },
chest: function (g) { ctAdd(g, ctBox(1, 0.55, 0.6), 0x6A4020, 0, 0.28, 0); var l = ctAdd(g, ctCyl(0.3, 0.3, 1, 10, 1), 0x6A4020, 0, 0.55, 0, 0, 0, Math.PI / 2); l.scale.z = 1; ctAdd(g, ctBox(1.02, 0.06, 0.62), 0xC8A040, 0, 0.4, 0); ctAdd(g, ctBox(0.1, 0.12, 0.04), 0xC8A040, 0, 0.48, 0.31); },
skeletonpointer: function (g) { return __ZC(354, 24, this, arguments, new.target); },
stage: function (g) { return __ZC(354, 25, this, arguments, new.target); },
chandelier: function (g) { return __ZC(354, 26, this, arguments, new.target); },
clueTable: function (g) { return __ZC(354, 27, this, arguments, new.target); },
armchairs: function (g) { return __ZC(354, 28, this, arguments, new.target); },
gingerhut: function (g) {
ctAdd(g, ctBox(2.2, 1.8, 2), 0xA8642A, 0, 0.9, 0);
ctAdd(g, ctCone(1.9, 1.3, 4), 0xF8F0F0, 0, 2.45, 0, 0, Math.PI / 4);
for (var i = 0; i < 8; i++)
ctAdd(g, ctSph(0.12, 8), [0xFF3A6A, 0x3AC8FF, 0xFFD020, 0x7AE040][i % 4], -0.9 + (i % 4) * 0.6, 0.5 + Math.floor(i / 4) * 0.8, 1.02);
ctAdd(g, ctBox(0.6, 1, 0.05), 0xF8E0C0, 0, 0.5, 1.03);
},
wagerboard: function (g) { return __ZC(354, 29, this, arguments, new.target); },
iguanodon: function (g, o) { return __ZC(354, 30, this, arguments, new.target); },
cavorsphere: function (g) { return __ZC(354, 31, this, arguments, new.target); },
obshut: function (g) { ctAdd(g, ctCyl(1.8, 1.8, 2.2, 16), 0xE8E0D0, 0, 1.1, 0); var d = ctAdd(g, ctSph(1.85, 16), 0xC8C8C8, 0, 2.2, 0); d.scale.y = 0.7; ctAdd(g, ctBox(0.5, 0.9, 3.7), 0x2A2A2A, 0, 2.6, 0); ctAdd(g, ctBox(0.8, 1.6, 0.05), 0x5A3A1A, 0, 0.8, 1.8); }
};
var CT_BODIES = {
ape: function (g, o) { return __ZC(354, 32, this, arguments, new.target); },
horseman: function (g) { return __ZC(354, 33, this, arguments, new.target); },
humpty: function (g) { return __ZC(354, 34, this, arguments, new.target); },
cricket: function (g) {
var b = ctAdd(g, ctSph(0.12, 10), 0x3AA83A, 0, 1.2, 0);
b.scale.z = 1.8;
ctAdd(g, ctSph(0.08, 8), 0x3AA83A, 0, 1.25, 0.2);
ctAdd(g, ctCyl(0.008, 0.008, 0.4, 4), 0x2A6A2A, 0.04, 1.4, 0.3, 0.6);
ctAdd(g, ctCyl(0.008, 0.008, 0.4, 4), 0x2A6A2A, -0.04, 1.4, 0.3, 0.6);
ctAdd(g, ctCyl(0.12, 0.1, 0.02, 10), 0x1A1A1A, 0, 1.33, 0.2);
},
gulliverhead: function (g) { ctAdd(g, ctSph(0.12, 6), 0xFFD040, 0, 0.3, 0, 0, 0, 0, 1); }
};
var CT_ADDS = {
longnose: function (g) { var n = ctAdd(g, ctCyl(0.02, 0.035, 0.22, 6), 0xE8B070, 0, 1.62, 0.17, Math.PI / 2); n.userData.ctNose = 1; }
};
function ctTitle(t, col) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (col || "#FFE7B0") + "'>" + t + "</div>"; }
function ctHead(t) { return "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function ctToday() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function ctWorldName(h) { return __ZC(354, 35, this, arguments, new.target); }
function ctShuffle(a, R) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function ctBoard(id, msg) { return __ZC(354, 36, this, arguments, new.target); }
function ctAllCard() { return __ZC(354, 37, this, arguments, new.target); }
function ctOff(id) { var R = CT.rules; return !!(R && (R.on === false || (R.off && R.off.indexOf(id) > -1))); }
function ctGold(T) { var R = CT.rules; return R && R.gold && R.gold[T.id] != null ? R.gold[T.id] : T.gold; }
function ctRules(force) {
if (!ctSigned() || (!force && CT.rulesAt && Date.now() - CT.rulesAt < 300000))
return;
CT.rulesAt = Date.now();
ctRpc("tale_state").then(function (o) { if (o && o.ok !== false)
CT.rules = { off: o.off || [], gold: o.gold || {}, on: o.on !== false }; }).catch(function () { });
}
function ctStart(id) { return __ZC(354, 38, this, arguments, new.target); }
function ctCentre(id) {
if (!CT.host)
return null;
if (CT.host.indexOf("land:") === 0) {
var A = CT.landAt[CT.host.slice(5)];
return A && A[id] ? { x: A[id][0], z: A[id][1] } : null;
}
var c = CT.at[id];
return c ? { x: c[0], z: c[1] } : null;
}
function ctWho(i) { var T = CT.run.T, W = i != null ? T.who[i] : null; return W ? "<b style='color:#FFE7B0'>" + ctE(W.n) + "</b>: " : ""; }
function ctStep() { return __ZC(354, 39, this, arguments, new.target); }
function ctChoose(top, S, next, said) { return __ZC(354, 40, this, arguments, new.target); }
function ctCode(top, S, next, wrong) { return __ZC(354, 41, this, arguments, new.target); }
function ctAim(top, S, next) { return __ZC(354, 42, this, arguments, new.target); }
function ctAimEnd(st) { if (st && st.iv) {
clearInterval(st.iv);
st.iv = null;
} if (CT.aimKey) {
removeEventListener("keydown", CT.aimKey, true);
CT.aimKey = null;
} }
function ctFreeHere(x, z, rad) { return __ZC(354, 43, this, arguments, new.target); }
function ctSpotNear(cx, cz, rmin, rmax, R, avoid) {
for (var i = 0; i < 60; i++) {
var a = R() * Math.PI * 2, r = rmin + R() * (rmax - rmin), x = cx + Math.sin(a) * r, z = cz + Math.cos(a) * r, ok = true;
for (var j = 0; j < avoid.length; j++)
if (Math.hypot(x - avoid[j][0], z - avoid[j][1]) < 4) {
ok = false;
break;
}
if (ok && ctFreeHere(x, z, 0.8))
return [x, z];
}
return null;
}
function ctMarker(look, col) { return __ZC(354, 44, this, arguments, new.target); }
function ctPutMarker(m, x, z, lift) { var gr = ctGround(x, z); m.position.set(x, (gr == null ? 0 : gr) + (lift == null ? 1.2 : lift), z); var G = ctHostGroup(); if (G)
G.add(m); CT.props.push(m); return m; }
function ctClearProps() { (CT.props || []).forEach(function (m) { if (m.parent)
m.parent.remove(m); m.traverse(function (o) { if (o.geometry && o.geometry.dispose)
o.geometry.dispose(); if (o.isSprite && o.material)
o.material.dispose(); }); }); CT.props = []; if (CT.run)
CT.run.chaser = null; ctHud(null); }
function ctBegin(S) { return __ZC(354, 45, this, arguments, new.target); }
function ctRingLight() {
var st = CT.run && CT.run.st;
if (!st)
return;
var nx = null;
st.pts.forEach(function (p) {
if (!p.got && !nx)
nx = p;
p.m.visible = !p.got;
p.m.scale.setScalar(p === nx ? 1.15 : 0.8);
p.m.traverse(function (o) { if (o.isMesh)
o.material = ctM(p === nx ? 0xFFE070 : 0x6AA8D8, 1); });
});
}
function ctStepFail(why) { return __ZC(354, 46, this, arguments, new.target); }
function ctStepDone(S) { return __ZC(354, 47, this, arguments, new.target); }
function ctRunTick(dt) { return __ZC(354, 48, this, arguments, new.target); }
function ctClock(s) { s = Math.ceil(s); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
function ctHud(html) {
if (!html) {
if (CT.hud)
CT.hud.style.display = "none";
return;
}
if (!CT.hud && document.body) {
var d = document.createElement("div");
d.id = "ct-hud";
d.style.cssText = "position:fixed;left:50%;top:calc(52px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:45;background:rgba(14,10,24,.9);border:1px solid #D8B868;border-radius:14px;" +
"padding:5px 12px;font:13px var(--sans,system-ui);color:#F8F0DC;max-width:calc(100vw - 24px);display:none;white-space:nowrap";
d.innerHTML = "<span class='t'></span> <span data-ctstop role='button' tabindex='0' style='margin-left:8px;cursor:pointer;opacity:.75'>✕</span>";
d.querySelector("[data-ctstop]").onclick = function (ev) { ev.stopPropagation(); ctStop("The story waits on its board for another time."); };
document.body.appendChild(d);
CT.hud = d;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ct-hud"] = 1;
}
if (!CT.hud)
return;
var t = CT.hud.querySelector(".t");
if (t.innerHTML !== html)
t.innerHTML = html;
CT.hud.style.display = "block";
}
function ctStop(msg) { if (msg && typeof CTS !== "undefined" && CTS.on)
msg = msg.replace("on its board", "at its chapter's lectern"); ctAimEnd(CT.aimSt); ctClearProps(); CT.run = null; if (msg)
ctSay("📖 " + msg); }
function ctLesson() { return __ZC(354, 49, this, arguments, new.target); }
function ctFinish() { return __ZC(354, 50, this, arguments, new.target); }
var CT_W = {};
var CTS = { on: false, T: null, W: null, th: null, root: null, places: [], grid: {}, n: 0, S: 2200, step: 0, H: null, seed: 1, prog: 0, back: null, beam: null,
t: 0, bt: 0, talkFixed: [], path: [], water: null, bound: 1000 };
var CTS_TH = {
meadow: { env: { top: 0x6FA8E8, low: 0xD8E8F0, fog: 0xC8DCE8, fogD: 0.0012, sun: 0.95, hemi: 0.75 }, g: [0x5C8A3A, 0x7AA048, 0x9A9A6A], amp: 12, path: 0xB8A27A, sc: { oak: 260, pine: 40, rock: 70, flower: 260 }, leaf: 0x4E8A34 },
wonder: { env: { top: 0x7AB8F8, low: 0xF0E8F8, fog: 0xE8DCF0, fogD: 0.0011, sun: 1, hemi: 0.8, hemiCol: 0xF0E0FF }, g: [0x5AB040, 0x86CC50, 0xC8A0D8], amp: 10, path: 0xE8D8B0, sc: { oak: 120, mushroom: 110, flower: 520, rock: 30 }, leaf: 0x58B848 },
forest: { env: { top: 0x6A98C8, low: 0xC8D8C8, fog: 0xA8BCA8, fogD: 0.0022, sun: 0.8, hemi: 0.7 }, g: [0x3E6A2A, 0x557E34, 0x7A7A50], amp: 14, path: 0x8A7050, sc: { oak: 520, pine: 300, rock: 80, fern: 240 }, leaf: 0x3A6E28 },
night: { env: { top: 0x0A1020, low: 0x22304A, fog: 0x1A2232, fogD: 0.0034, sun: 0.32, sunCol: 0xB8C8F0, hemi: 0.55, hemiCol: 0x8898C8, hemiGround: 0x20201C, stars: 1 }, g: [0x2C3626, 0x3C4432, 0x50483A], amp: 12, path: 0x6A5A44, sc: { dead: 320, pine: 140, rock: 70 }, leaf: 0x2A3A24 },
jungle: { env: { top: 0x6AA8D8, low: 0xD8E8D0, fog: 0xB8D0B0, fogD: 0.0024, sun: 0.9, hemi: 0.8 }, g: [0x2E6A26, 0x3E8A2E, 0x6A8A40], amp: 16, path: 0x8A6A44, sc: { jtree: 420, palm: 160, fern: 420, rock: 50 }, leaf: 0x2E7A2A, coast: true },
isle: { env: { top: 0x5AA0E8, low: 0xD8ECF4, fog: 0xC8E0EC, fogD: 0.0010, sun: 1, hemi: 0.8 }, g: [0xE8D8A8, 0x6AA040, 0x8A9A5A], amp: 10, path: 0xD8C898, sc: { palm: 260, jtree: 120, rock: 60, fern: 160 }, leaf: 0x4A9A34, isle: true },
desert: { env: { top: 0x6AA0E0, low: 0xF0E0C0, fog: 0xE8D8B8, fogD: 0.0011, sun: 1.05, sunCol: 0xFFF0D0, hemi: 0.75 }, g: [0xD8B878, 0xE0C488, 0xB89868], amp: 18, dunes: 1, path: 0xC8A870, sc: { rock: 160, palm: 50, cactus: 0 }, leaf: 0x5A8A34 },
snow: { env: { top: 0x8AB0D8, low: 0xE8F0F8, fog: 0xDCE6F0, fogD: 0.0016, sun: 0.85, hemi: 0.85, hemiCol: 0xE0ECFF }, g: [0xE8EEF4, 0xF4F8FC, 0xC8D0D8], amp: 16, path: 0xB8C4D0, sc: { pine: 260, ice: 140, rock: 60 }, leaf: 0x2E5A40 },
fire: { env: { top: 0x5A2A20, low: 0xD88A50, fog: 0xA85A38, fogD: 0.0022, sun: 0.8, sunCol: 0xFFC898, hemi: 0.6, hemiCol: 0xFFB080, hemiGround: 0x301810 }, g: [0x3A2A24, 0x5A3A2A, 0x7A4A2A], amp: 18, path: 0x8A5A3A, sc: { rock: 260, dead: 120 }, leaf: 0x3A2A1A },
under: { env: { top: 0x0C0814, low: 0x2A1A34, fog: 0x1E1428, fogD: 0.0036, sun: 0.3, sunCol: 0xC8A8F0, hemi: 0.6, hemiCol: 0x9A88C8, hemiGround: 0x1A1418 }, g: [0x2A2430, 0x3A3040, 0x4A4050], amp: 14, path: 0x5A4A60, sc: { rock: 240, crystal: 120, dead: 80 }, leaf: 0x3A2A4A },
seabed: { env: { top: 0x0A3A5A, low: 0x2A7A9A, fog: 0x1A6080, fogD: 0.0045, sun: 0.6, sunCol: 0xA8E0FF, hemi: 0.8, hemiCol: 0x88D0F0, hemiGround: 0x204A50 }, g: [0xC8B888, 0xA89A70, 0x6A8A7A], amp: 14, path: 0xE0D0A0, sc: { coral: 320, kelp: 340, rock: 90 }, leaf: 0x3A8A5A },
sky: { env: { top: 0x4A90E8, low: 0xF8F0E8, fog: 0xF0ECF0, fogD: 0.0012, sun: 1.05, hemi: 0.9, hemiCol: 0xFFFFFF }, g: [0xF4F4F8, 0xFFFFFF, 0xF0E0B0], amp: 8, path: 0xF0D890, sc: { cloud: 240, oak: 40 }, leaf: 0xF0E8B0 },
moon: { env: { top: 0x000000, low: 0x101014, fog: 0x0A0A0E, fogD: 0.0008, sun: 1.1, hemi: 0.35, hemiCol: 0x9090A0, hemiGround: 0x202020, stars: 1 }, g: [0x8A8A8A, 0xA8A8A8, 0x6A6A6A], amp: 12, path: 0x9A9A9A, sc: { rock: 300 }, leaf: 0x808080, grav: 1.62 },
mars: { env: { top: 0xB87A58, low: 0xE0B090, fog: 0xC89070, fogD: 0.0014, sun: 0.9, sunCol: 0xFFE0C0, hemi: 0.6 }, g: [0xA85A34, 0xC0703E, 0x8A4A2A], amp: 16, path: 0xD08A5A, sc: { rock: 300 }, leaf: 0x806040, grav: 3.7 },
town: { env: { top: 0x8A98A8, low: 0xC8C8C0, fog: 0xB0B0A8, fogD: 0.0030, sun: 0.7, hemi: 0.75 }, g: [0x5A6A48, 0x6A7A50, 0x7A7A70], amp: 5, path: 0x8A8A88, sc: { oak: 160, lamp: 120, rock: 20 }, leaf: 0x4A6A34 },
eastern: { env: { top: 0x7AA8D8, low: 0xF0E0E8, fog: 0xE0D4DC, fogD: 0.0016, sun: 0.95, hemi: 0.8 }, g: [0x5A8A3A, 0x6A9A44, 0x8A8A6A], amp: 14, path: 0xC0B090, sc: { blossom: 240, pine: 120, bamboo: 200, rock: 60 }, leaf: 0xF0A8C8 },
emerald: { env: { top: 0x6AB0F0, low: 0xE8F4D8, fog: 0xD8ECC8, fogD: 0.0011, sun: 1, hemi: 0.8 }, g: [0x6AB040, 0x8ACB48, 0xD8C848], amp: 10, path: 0xE8C83A, sc: { oak: 160, flower: 600, rock: 30 }, leaf: 0x4AA83A, flowerCol: 0xD83A3A },
future: { env: { top: 0x7AA8D8, low: 0xE0E8E0, fog: 0xC8D4C8, fogD: 0.0016, sun: 0.95, hemi: 0.75 }, g: [0x4A7A34, 0x5E8A3C, 0x8A8A80], amp: 12, path: 0xA8A8A0, sc: { oak: 340, fern: 200, rock: 60, ruin: 90 }, leaf: 0x4A8A30 },
moor: { env: { top: 0x7A8AA0, low: 0xC8C8C8, fog: 0xB0B4B8, fogD: 0.0024, sun: 0.7, hemi: 0.7 }, g: [0x5A5A3A, 0x6A5A4A, 0x7A6A5A], amp: 16, path: 0x8A7A5A, sc: { rock: 200, pine: 60, dead: 40 }, leaf: 0x4A5A30 },
kids: { env: { top: 0x5AB8FF, low: 0xF8F0FF, fog: 0xF0ECFF, fogD: 0.0010, sun: 1.05, hemi: 0.9, hemiCol: 0xFFF4FF }, g: [0x3AC83A, 0x5AE050, 0xF8D838], amp: 8, path: 0xFF9A3A, sc: { lolly: 220, flower: 600, mushroom: 40 }, leaf: 0xFF4AA8, bold: true }
};
Object.keys(CTS_TH).forEach(function (k) { CTS_TH[k].key = k; });
function ctsCap(col, max) { var r = (col >> 16) & 255, g = (col >> 8) & 255, b = col & 255, m = Math.max(r, g, b); if (m <= max)
return col; var k = max / m; return (Math.round(r * k) << 16) | (Math.round(g * k) << 8) | Math.round(b * k); }
function ctsKinds(th) { return __ZC(354, 51, this, arguments, new.target); }
function ctsBox(s, x, z, hw, hd, h, rot) { s.push({ x: x, z: z, hw: hw, hd: hd, h: h || 6, rot: rot || 0 }); }
function ctsRound(s, x, z, r, h) { s.push({ x: x, z: z, r: r, h: h || 6 }); }
function ctsRoof(g, w, d, h, col, y) { var m = ctAdd(g, ctCone(Math.max(w, d) * 0.72, h, 4), col, 0, y + h / 2, 0, 0, Math.PI / 4, 0); m.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); return m; }
function ctsWindows(g, w, y, z, n, col) { for (var i = 0; i < n; i++)
ctAdd(g, ctBox(0.9, 1.2, 0.08), col || 0xF8D890, -w / 2 + w * (i + 0.5) / n, y, z, 0, 0, 0, 1); }
var CTS_SET = {
cottage: function (g, o) {
var c = o.col || 0xE8DCC0;
ctAdd(g, ctBox(8, 4, 6), c, 0, 2, 0);
ctsRoof(g, 8.8, 6.8, 3.4, 0x7A4A2A, 4);
ctAdd(g, ctBox(1.2, 2.2, 0.1), 0x5A3A20, 0, 1.1, 3.02);
ctsWindows(g, 6, 2.3, 3.03, 2);
ctAdd(g, ctBox(0.8, 2, 0.8), 0x8A6A5A, 2.4, 6, -1);
var s = [];
ctsBox(s, 0, 0, 4.2, 3.2, 7);
return { r: 6, s: s };
},
village: function (g, o) { return __ZC(354, 52, this, arguments, new.target); },
manor: function (g, o) { return __ZC(354, 53, this, arguments, new.target); },
castle: function (g, o) { return __ZC(354, 54, this, arguments, new.target); },
tower: function (g, o) { return __ZC(354, 55, this, arguments, new.target); },
hall: function (g, o) { return __ZC(354, 56, this, arguments, new.target); },
temple: function (g, o) { return __ZC(354, 57, this, arguments, new.target); },
egtemple: function (g, o) { return __ZC(354, 58, this, arguments, new.target); },
pyramid: function (g, o) {
ctAdd(g, ctCone(30, 38, 4), o.col || 0xD8C088, 0, 19, 0, 0, Math.PI / 4, 0);
ctAdd(g, ctCone(2.4, 2.8, 4), 0xF2D060, 0, 37, 0, 0, Math.PI / 4, 0, 1);
ctAdd(g, ctBox(3, 4, 0.4), 0x2A2018, 0, 2, 15);
var s = [];
ctsBox(s, 0, 0, 21, 21, 40, 0);
return { r: 32, s: s };
},
palace: function (g, o) { return __ZC(354, 59, this, arguments, new.target); },
pagoda: function (g, o) {
var c = o.col || 0xB83A2A, s = [];
for (var i = 0; i < 5; i++) {
var w = 9 - i * 1.4, y = i * 4;
ctAdd(g, ctBox(w * 0.8, 3, w * 0.8), c, 0, y + 1.5, 0);
var r = ctAdd(g, ctCone(w * 0.82, 1.8, 4), 0x2A2A2A, 0, y + 3.6, 0, 0, Math.PI / 4, 0);
}
ctAdd(g, ctCyl(0.15, 0.15, 4, 6), 0xF2C84A, 0, 22, 0);
ctsBox(s, 0, 0, 3.8, 3.8, 20);
return { r: 8, s: s };
},
church: function (g, o) { return __ZC(354, 60, this, arguments, new.target); },
ship: function (g, o) { return __ZC(354, 61, this, arguments, new.target); },
wreck: function (g, o) { var r = CTS_SET.ship(g, { col: 0x4A3828 }); g.rotation.z = 0.18; return { r: r.r, s: r.s }; },
cave: function (g, o) { return __ZC(354, 62, this, arguments, new.target); },
cliff: function (g, o) { var c = o.col || 0x7A6E60, s = []; for (var i = 0; i < 6; i++) {
var x = -25 + i * 10, m = ctAdd(g, new THREE.DodecahedronGeometry(7, 0), c, x, 6, -(i % 2) * 3);
m.scale.set(1, 1.8, 0.9);
ctsRound(s, x, -(i % 2) * 3, 6.5, 20);
} return { r: 28, s: s }; },
arch: function (g, o) { var c = o.col || 0xB8B0A0, s = []; [-1, 1].forEach(function (sd) { ctAdd(g, ctBox(2, 10, 2), c, sd * 5, 5, 0); ctsBox(s, sd * 5, 0, 1.2, 1.2, 10); }); ctAdd(g, ctBox(13, 2, 2.4), c, 0, 11, 0); return { r: 8, s: s }; },
bridge: function (g, o) { return __ZC(354, 63, this, arguments, new.target); },
ruins: function (g, o) {
var c = o.col || 0xC8C0B0, s = [];
for (var i = 0; i < 10; i++) {
var a = i * 0.63, x = Math.sin(a) * 9, z = Math.cos(a) * 7 - 2, h = 2 + ((i * 37) % 5);
ctAdd(g, ctCyl(0.7, 0.8, h, 10), c, x, h / 2, z);
ctsRound(s, x, z, 0.9, h);
}
ctAdd(g, ctBox(4, 1, 1.6), c, 3, 0.5, -3, 0, 0.6, 0);
ctAdd(g, ctBox(10, 0.8, 1.6), c, -1, 6.4, -6);
return { r: 12, s: s };
},
bigtree: function (g, o) { return __ZC(354, 64, this, arguments, new.target); },
mushrooms: function (g, o) { return __ZC(354, 65, this, arguments, new.target); },
tents: function (g, o) { var s = []; [[-6, 0], [6, -1], [0, -8], [-9, -9]].forEach(function (p, i) { ctAdd(g, ctCone(3, 4, i === 0 ? 6 : 4), [0xE8DCC0, 0xC8A878, 0xB84A3A, 0xD8C8A0][i], p[0], 2, p[1]); ctsRound(s, p[0], p[1], 2.6, 4); }); ctAdd(g, ctCyl(0.8, 0.9, 0.3, 8), 0x3A2A1A, 0, 0.15, -3); ctLight(g, 0xFFA850, 0, 0.9, -3, 2); return { r: 13, s: s }; },
street: function (g, o) { return __ZC(354, 66, this, arguments, new.target); },
lighthouse: function (g, o) { return __ZC(354, 67, this, arguments, new.target); },
volcano: function (g, o) {
var m = ctAdd(g, ctCyl(8, 60, 50, 20), o.col || 0x3A2A24, 0, 25, 0);
ctAdd(g, ctCyl(7.5, 7.5, 0.6, 16), 0xD86A2A, 0, 49.8, 0, 0, 0, 0, 1);
var gl = wGlow(0xFF8A3A, 40, 0.25);
gl.position.set(0, 56, 0);
g.add(gl);
var s = [];
ctsRound(s, 0, 0, 58, 50);
return { r: 62, s: s };
},
crater: function (g, o) { ctAdd(g, new THREE.TorusGeometry(11, 2.2, 6, 22), o.col || 0x8A7A68, 0, 0, 0, Math.PI / 2, 0, 0); ctAdd(g, ctCyl(10, 10, 0.2, 20), 0x4A4038, 0, -0.2, 0); return { r: 14, s: [] }; },
obelisk: function (g, o) { ctAdd(g, ctBox(2, 1, 2), o.col || 0xC8B080, 0, 0.5, 0); ctAdd(g, ctCyl(0.5, 1.1, 14, 4), o.col || 0xC8B080, 0, 8, 0, 0, Math.PI / 4, 0); ctAdd(g, ctCone(0.8, 1.6, 4), 0xF2D060, 0, 15.8, 0, 0, Math.PI / 4, 0, 1); var s = []; ctsRound(s, 0, 0, 1.4, 15); return { r: 3, s: s }; },
spires: function (g, o) { var s = [], c = o.col || 0xB8E0F4; for (var i = 0; i < 7; i++) {
var a = i * 0.9, r = 3 + (i % 3) * 3, x = Math.sin(a) * r, z = Math.cos(a) * r - 2, h = 8 + ((i * 53) % 9);
ctAdd(g, new THREE.OctahedronGeometry(1.6, 0), c, x, h / 2, z, 0, a, 0, o.glow ? 1 : 0).scale.set(1, h / 3.2, 1);
ctsRound(s, x, z, 1.3, h);
} return { r: 12, s: s }; },
garden: function (g, o) { return __ZC(354, 68, this, arguments, new.target); },
pool: function (g, o) { ctAdd(g, ctCyl(10, 10, 0.15, 24), o.col || 0x3A7AAA, 0, 0.06, 0); ctAdd(g, new THREE.TorusGeometry(10, 0.5, 5, 24), 0x8A8070, 0, 0.1, 0, Math.PI / 2, 0, 0); var s = []; ctsRound(s, 0, 0, 10, 1); return { r: 12, s: s }; },
dome: function (g, o) {
ctAdd(g, ctCyl(5, 5, 5, 16), o.col || 0xE8E4DC, 0, 2.5, 0);
ctAdd(g, new THREE.SphereGeometry(5.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0xC8CCD0, 0, 5, 0);
ctAdd(g, ctBox(1.2, 4, 0.3), 0x2A2A3A, 0, 7, 4.6, -0.6, 0, 0);
ctAdd(g, ctBox(1.4, 2.4, 0.1), 0x3A2A20, 0, 1.2, 5.02);
var s = [];
ctsRound(s, 0, 0, 5.2, 10);
return { r: 7, s: s };
},
wall: function (g, o) {
var c = o.col || 0x8A8070, s = [];
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(22, 10, 2.4), c, sd * 15, 5, 0); ctsBox(s, sd * 15, 0, 11, 1.4, 10); ctAdd(g, ctCyl(2.6, 2.8, 14, 10), c, sd * 4.2, 7, 0); ctsRound(s, sd * 4.2, 0, 2.8, 14); });
ctAdd(g, ctBox(6, 3, 2.6), c, 0, 11.5, 0);
return { r: 27, s: s };
},
hut: function (g, o) { ctAdd(g, ctCyl(2.6, 2.8, 2.6, 10), o.col || 0xB89A6A, 0, 1.3, 0); ctAdd(g, ctCone(3.6, 2.8, 10), 0xC8A860, 0, 4, 0); ctAdd(g, ctBox(1, 1.8, 0.1), 0x2A1A10, 0, 0.9, 2.75); var s = []; ctsRound(s, 0, 0, 2.8, 4); return { r: 4, s: s }; },
mound: function (g, o) { var m = ctAdd(g, new THREE.SphereGeometry(10, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), o.col || 0x5A7A3A, 0, 0, 0); m.scale.y = 0.55; ctAdd(g, ctBox(3, 3.4, 0.6), 0x6A6A60, 0, 1.7, 9.2); ctAdd(g, ctBox(2, 2.6, 0.2), 0x0A0A0A, 0, 1.3, 9.52); var s = []; ctsRound(s, 0, 0, 9.6, 6); return { r: 12, s: s }; },
dock: function (g, o) { var s = []; ctAdd(g, ctBox(4, 0.4, 18), 0x7A5A3A, 0, 0.5, -4); for (var i = 0; i < 5; i++)
[-1.8, 1.8].forEach(function (x) { ctAdd(g, ctCyl(0.2, 0.2, 2.2, 6), 0x5A4028, x, -0.2, -12 + i * 4); }); return { r: 12, s: s }; },
throne: function (g, o) { ctAdd(g, ctBox(6, 0.8, 5), o.col || 0x8A2A3A, 0, 0.4, 0); ctAdd(g, ctBox(1.8, 1, 1.6), 0xD8B048, 0, 1.3, 0); ctAdd(g, ctBox(1.8, 3.2, 0.4), 0xD8B048, 0, 2.4, -0.7); var s = []; ctsBox(s, 0, 0, 3, 2.5, 1.4); return { r: 5, s: s }; },
stage: function (g, o) {
ctAdd(g, ctBox(16, 1.4, 9), 0x5A3A28, 0, 0.7, 0);
ctAdd(g, ctBox(17, 10, 0.6), o.col || 0x8A1A2A, 0, 5, -4.6);
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(2.4, 9, 0.4), 0xB82A3A, sd * 7.4, 5.9, -3.8); });
ctAdd(g, ctBox(17, 1.6, 0.8), 0xD8B048, 0, 10.2, -4.2);
var s = [];
ctsBox(s, 0, 0, 8, 4.6, 1.4);
return { r: 11, s: s };
},
windmills: function (g, o) { return __ZC(354, 69, this, arguments, new.target); },
camp: function (g, o) { return __ZC(354, 70, this, arguments, new.target); },
igloo: function (g, o) { ctAdd(g, new THREE.SphereGeometry(4, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0xF4F8FC, 0, 0, 0); ctAdd(g, new THREE.CylinderGeometry(1.4, 1.4, 3, 10, 1, false, 0, Math.PI), 0xE8F0F8, 0, 1, 4, Math.PI / 2, 0, Math.PI / 2); var s = []; ctsRound(s, 0, 0, 4, 4); return { r: 6, s: s }; },
rocket: function (g, o) { ctAdd(g, ctCyl(2, 2.4, 18, 14), 0xD8D8E0, 0, 9, 0); ctAdd(g, ctCone(2, 5, 14), 0xC83A3A, 0, 20.5, 0); for (var i = 0; i < 4; i++)
ctAdd(g, ctBox(0.2, 4, 3), 0xC83A3A, Math.sin(i * 1.57) * 2.4, 2, Math.cos(i * 1.57) * 2.4, 0, i * 1.57, 0); var s = []; ctsRound(s, 0, 0, 2.6, 22); return { r: 5, s: s }; },
tripod: function (g, o) { return __ZC(354, 71, this, arguments, new.target); }
};
function ctsSm(e0, e1, x) { var t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); }
function ctsH0(x, z) { return __ZC(354, 72, this, arguments, new.target); }
function ctsHeight(x, z) { return __ZC(354, 73, this, arguments, new.target); }
function ctsGround(x, z) { return __ZC(354, 74, this, arguments, new.target); }
function ctsCell(x, z) { return Math.floor(x / 16) + "," + Math.floor(z / 16); }
function ctsSolid(s) {
var r = s.r !== undefined ? s.r + 0.4 : Math.hypot(s.hw, s.hd) + 0.4;
for (var x = Math.floor((s.x - r) / 16); x <= Math.floor((s.x + r) / 16); x++)
for (var z = Math.floor((s.z - r) / 16); z <= Math.floor((s.z + r) / 16); z++) {
var k = x + "," + z;
(CTS.grid[k] = CTS.grid[k] || []).push(s);
}
}
function ctsBlock(x, z, feet) {
if (Math.hypot(x, z) > CTS.bound)
return true;
var gh = ctsGround(x, z);
if (CTS.water && gh < -0.7)
return true;
var L = CTS.grid[ctsCell(x, z)];
return !!(L && worldSolidAt(L, x, z, feet - gh));
}
function ctsLayout(T, W) { return __ZC(354, 75, this, arguments, new.target); }
function ctsTokens(s) {
return String(s || "").split(",").filter(Boolean).map(function (t) {
var m = /^(~?)([a-zA-Z]+)(?:@([\d.]+))?(?:#([0-9a-fA-F]{6}))?(?:\*(\d+))?$/.exec(t.trim());
if (!m)
return null;
return { far: !!m[1], n: m[2], s: m[3] ? +m[3] : 1, col: m[4] ? parseInt(m[4], 16) : null, x: m[5] ? +m[5] : 1 };
}).filter(Boolean);
}
function ctsTokR(t) { return __ZC(354, 76, this, arguments, new.target); }
function ctsBuild(G) { return __ZC(354, 77, this, arguments, new.target); }
function ctsRoadPts(pts) { return __ZC(354, 78, this, arguments, new.target); }
function ctsPath(root, pts, col) { return __ZC(354, 79, this, arguments, new.target); }
function ctsGate(root) { return __ZC(354, 80, this, arguments, new.target); }
function ctsPlace(root, p) { return __ZC(354, 81, this, arguments, new.target); }
function ctsScatter(root, th, lite) { return __ZC(354, 82, this, arguments, new.target); }
function ctsClear(x, z, kn) { return __ZC(354, 83, this, arguments, new.target); }
function ctsPeople(p, on) { return __ZC(354, 84, this, arguments, new.target); }
function ctsFree(G) { return __ZC(354, 85, this, arguments, new.target); }
function ctsTalkers() { var L = CTS.talkFixed.slice(); CTS.places.forEach(function (p) { if (p.people)
L = L.concat(p.people); }); CT.talkers = L; CT.near = null; }
function ctsProg(id) { var D = ctData(); if (!D.ch || typeof D.ch !== "object")
D.ch = {}; return +D.ch[id] || 0; }
function ctsSetProg(id, n) { var D = ctData(); if (!D.ch || typeof D.ch !== "object")
D.ch = {}; D.ch[id] = n; try {
if (typeof save === "function")
save();
}
catch (e) { } }
function ctsEnter(id) { return __ZC(354, 86, this, arguments, new.target); }
function ctsDrop() { return __ZC(354, 87, this, arguments, new.target); }
function ctsLeave() { return __ZC(354, 88, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf("ctale") < 0)
WLG.keys.push("ctale");
if (typeof DGR_W !== "undefined" && !DGR_W.ctale) {
DGR_WORLDS.push(["ctale", "The worlds of the classic stories", 0, "hidden"]);
DGR_W.ctale = { id: "ctale", name: "The worlds of the classic stories", def: 0, group: "hidden" };
}
if (typeof worldDef === "function")
worldDef("ctale", {
base: -940000, far: 3200, ownSky: true, tone: 440, bound: 1000,
env: function () { return __ZC(354, 89, this, arguments, new.target); },
build: function (G) { ctsBuild(G); },
enter: function () { return __ZC(354, 90, this, arguments, new.target); },
leave: function () {
var p = CTS.places;
(p || []).forEach(function (q) { if (q.pg)
ctsPeople(q, false); });
CTS.on = false;
if (CT.run)
ctStop(null);
CT.talkers = [];
CT.g = null;
worldBanner(null);
setTimeout(function () { ctsDrop(); }, 0);
},
ground: function (x, z) { return ctsGround(x, z); },
block: function (x, z, feet) { return ctsBlock(x, z, feet); },
tick: function (dt) { ctsTick(dt); },
back: function () { ctsMenu(); }
});
function ctsTick(dt) { return __ZC(354, 91, this, arguments, new.target); }
(function () {
if (typeof ctUse !== "function")
return;
var cu = ctUse;
ctUse = function (T) {
if (T && T.chap !== undefined) {
ctsChapter(T.chap);
CT.near = null;
return;
}
if (T && T.fn) {
T.fn();
CT.near = null;
return;
}
return cu.apply(this, arguments);
};
})();
function ctsSteps(T, C) { return (C[3] || []).map(function (s) { return typeof s === "number" ? T.steps[s] : s; }).filter(Boolean); }
function ctsChapter(k) { return __ZC(354, 92, this, arguments, new.target); }
function ctsChapterDone(k) { return __ZC(354, 93, this, arguments, new.target); }
function ctsFinished(line, first) { return __ZC(354, 94, this, arguments, new.target); }
function ctsMenu() { return __ZC(354, 95, this, arguments, new.target); }
function ctC(w, t, right, why, a, b) { return { k: "choose", w: w, t: t, o: [[right, 1, why], [a, 0, "Not quite. Try again."], [b, 0, "Not quite. Try again."]] }; }
function ctR(w, t, n, secs, done) { return { k: "run", w: w, t: t, n: n || 6, r: 30, secs: secs || 100, done: done }; }
function ctF(w, t, n, look, col, name, done) { return { k: "find", w: w, t: t, n: n || 5, look: look, col: col, r: 30, secs: 200, name: name, done: done }; }
function ctS(w, t) { return { k: "say", w: w, t: t }; }
CT_W.alice = { th: "wonder", intro: "A golden afternoon on a riverbank in 1862, and a White Rabbit with a pocket-watch hurrying past...", ch: [
["Down the Rabbit-Hole", "Alice is sitting by her sister on the bank with nothing to do when a White Rabbit runs by, takes a watch out of its waistcoat-pocket and says \"Oh dear! I shall be late!\" She follows it down a rabbit-hole and falls so slowly she has time to take a jar of orange marmalade off a shelf on the way.", "bigtree,rabbithole,flowers", [4], [0, 4]],
["The Pool of Tears", "At the bottom is a hall of locked doors and a tiny golden key. A bottle says DRINK ME and a cake says EAT ME: one makes her small, the other nine feet tall. She cries so much that, when she shrinks again, she has to swim in her own pool of tears.", "pool,mushrooms", [ctC(0, "Alice finds a little bottle labelled 'DRINK ME'. What happens when she drinks it?", "She shrinks to ten inches high, just right for the little door", "Yes, but she has left the golden key on the table, far above her!", "She grows as tall as the trees", "She falls fast asleep")], [0]],
["A Caucus-Race", "Alice and the soaking animals climb out on the bank. To get dry, the Dodo has them run a Caucus-race: a race-course in a sort of circle, everyone starts when they like, and stops when they like.", "cottage#F2C8E0,flowers", [ctR(0, "The Dodo marks out a race-course \"in a sort of circle\". Run through every ring to get dry!", 6, 110, "\"Everybody has won, and all must have prizes!\" Alice hands round her comfits, and is given her own thimble as a prize.")], [0]],
["Advice from a Caterpillar", "A large blue Caterpillar sits on top of a mushroom with its arms folded and asks her, \"Who are YOU?\" One side of the mushroom will make her grow taller, it says, and the other side shorter.", "mushrooms@1.5,flowers", [ctC(0, "Alice tells the Caterpillar that three inches is \"such a wretched height to be\". Why is the Caterpillar so cross?", "Because it is exactly three inches high itself", "Quite right. The Caterpillar rears up angrily: \"It is a very good height indeed!\"", "Because it wanted tea", "Because she sat on its mushroom")], [0]],
["Pig and Pepper", "In the Duchess's kitchen there is far too much pepper in the soup, the cook throws pans, the baby turns into a pig, and the Cheshire Cat grins from ear to ear. \"We're all mad here,\" it says, and fades away until only the grin is left.", "cottage#E8C8A0,bigtree", [3], [0, 5]],
["A Mad Tea-Party", "At the March Hare's house (its chimneys are shaped like ears and its roof is thatched with fur) a long table is laid for three: the Hatter, the March Hare and a sleepy Dormouse. It is always six o'clock there, so it is always tea-time.", "teatable,cottage#C8A878", [0, 1, 2], [1, 2, 3, 0]],
["The Queen's Croquet-Ground", "In the Queen's garden the croquet balls are hedgehogs, the mallets are flamingos, and the soldiers bend over to make the hoops. Three gardeners, who are playing cards, are painting the white roses red, because they planted the wrong ones.", "castle#D83A4A,garden,croquet", [ctF(6, "The gardeners planted white roses by mistake! Find the five white roses and paint them red before the Queen sees them.", 5, "rose", 0xFFFFFF, "a white rose painted", "Done just in time. \"Off with their heads!\" cries the Queen anyway, but nobody is ever really beheaded in Wonderland.")], [6, 0]],
["Who Stole the Tarts?", "The Knave of Hearts is on trial for stealing the Queen's tarts. Alice is called as a witness, and finds she is growing again. The Queen calls for the sentence before the verdict, and Alice has had enough.", "hall#D8B8C8,throne", [{ k: "choose", w: 6, t: "\"Sentence first, verdict afterwards!\" shouts the Queen. What does Alice, now grown to her full size, say?", o: [["\"Who cares for you? You're nothing but a pack of cards!\"", 1, "The whole pack rises up into the air and comes flying down on her... and she wakes on the riverbank with dead leaves on her face. It was all a wonderful dream."], ["She says sorry and runs home", 0, "Not Alice! Try again."], ["She asks for more tea", 0, "Not at a trial. Try again."]] }], [6, 0, 4, 1]]
] };
CT_W.tirnanog = { th: "isle", intro: "Ireland, long ago, when Fionn mac Cumhaill and the Fianna hunted the hills, and a lady on a white horse came over the sea.", ch: [
["Niamh on the Shore", "Fionn and the Fianna are hunting by the lake when a lady rides up on a white horse, her hair like gold. She is Niamh, daughter of the king of Tír na nÓg, and she has come for Fionn's son Oisín, the poet.", "standingstones,camp", [ctC(0, "Niamh asks Oisín to come with her to Tír na nÓg. What is Tír na nÓg?", "The Land of Youth, where no one grows old", "Yes. Over the western sea, a land of feasting, music and endless summer.", "A city of giants under the hills", "An island of ice in the north")], [0, 1, 2]],
["Over the Waves", "Oisín climbs up behind Niamh, and the white horse gallops onto the sea, its hooves skimming the waves, past palaces and a hornless deer chased by a hound with one red ear.", "dock,lighthouse", [ctR(0, "Ride with Niamh over the waves to the west! Through every ring before the mist closes in.", 6, 100, "The mist parts, and there is the Land of Youth, green and golden, with a palace on every hill.")], [0, 1, 2]],
["The Land of Youth", "Oisín marries Niamh. There is feasting and music, hunting and games, and nobody ever grows tired or old. Three years go by, or so it seems to him.", "hall#D8C890,garden", [ctS(1, "Three years of feasting, Niamh's laughter, the finest horses and hounds... And yet I dream of my father, and the Fianna, and the green hills of Ireland.")], [0, 1]],
["Longing for Home", "Oisín asks to visit Ireland. Niamh lends him the white horse, with one warning.", "arch,standingstones", [0, 1], [0, 1, 2]],
["The Empty Hall", "In Ireland everything has changed. Fionn's great hall on the Hill of Allen is grass-grown ruins, the Fianna are only names in old songs, and the people are small and strange to him.", "ruins,village", [2], [1]],
["Oisín and Patrick", "Three hundred years have passed in Ireland. Old and blind, Oisín is cared for by Saint Patrick, and tells him all the stories of Fionn and the Fianna.", "church,camp", [ctC(1, "How do the old tales say the stories of Fionn and the Fianna were kept for us?", "Old Oisín told them to Saint Patrick, and they were written down", "That's the tale: the old pagan poet and the saint, arguing and telling stories, and so the Fenian Cycle came down to us.", "Fionn carved them on a stone", "Niamh sang them to the fish")], [1]]
] };
CT_W.orpheus = { th: "under", intro: "Ancient Greece. A singer whose music could move stones, and a road down into the Underworld that the living do not walk.", ch: [
["The Wedding Song", "Orpheus, son of the Muse Calliope, plays a lyre so beautifully that animals follow him, trees lean closer and even stones move. He marries Eurydice, but that same day she steps on a snake in the meadow, and dies.", "temple,garden", [ctC(0, "What was Orpheus famous for, before all this?", "His music: his lyre charmed animals, trees and even stones", "Yes. Some said Apollo himself gave him the lyre.", "Wrestling", "Building ships")], [0, 1]],
["The Way Down", "No living person goes down to the Underworld and comes back. Orpheus goes anyway, through a dark cave mouth at Taenarum, at the southern tip of Greece.", "cave,obelisk", [ctF(0, "The way down is dark. Find the five old lamps along the path and light them.", 5, "lantern", 0xFFC860, "a lamp lit", "The path glows behind you. Ahead, the sound of a great river.")], [0]],
["Charon's Ferry", "The grim ferryman Charon rows the dead across the river Styx. He takes no living passengers, but Orpheus plays, and Charon picks up his oars.", "dock,pool#2A2A4A", [ctC(0, "In the Greek stories, what did the dead usually pay Charon for the crossing?", "A coin (an obol), placed with them when they were buried", "Yes. That's why the Greeks buried their dead with a coin.", "A song", "A golden apple")], [0]],
["Cerberus", "At the gates of Hades lies Cerberus, the great guard dog who lets the dead in and never lets them out. Orpheus plays softly, and the dog lies down and sleeps.", "arch#4A4050,spires#6A5A8A", [ctC(0, "How many heads does Cerberus, the guard dog of the Underworld, have in most tellings?", "Three", "Yes, and a serpent's tail. Orpheus sends all three heads to sleep.", "One", "Seven")], [0]],
["The Song Before the Throne", "Before Hades and Persephone, Orpheus sings of his love. The ghosts weep; even the Furies weep for the first time. Hades grants his wish, with one condition.", "throne,temple#4A4458", [0], [2, 3, 0, 1]],
["The Road to the Light", "Up the long steep road towards the daylight, Orpheus walks ahead. He cannot hear Eurydice's footsteps behind him.", "arch#8A8070,ruins", [1], [0, 1]],
["The Last Look", "At the very threshold, he turns to see her... and she slips back into the dark with a last faint farewell. Orpheus mourns and sings of her for the rest of his days.", "obelisk,camp", [2], [0, 3]]
] };
CT_W.perseus = { th: "sky", intro: "Ancient Greece, high above the clouds, where the gods of Olympus lend their gifts to a young hero with an impossible task.", ch: [
["The Rash Promise", "King Polydectes of Seriphos wants Perseus out of the way. At a feast, everyone brings the king a horse. Perseus, who has nothing, boasts he will bring the head of Medusa, the Gorgon whose look turns people to stone.", "palace#E8E4D8", [ctC(0, "Who are Perseus's parents in the myth?", "Danaë and Zeus", "Yes. His grandfather locked Danaë in a bronze room, and Zeus came to her as a shower of gold.", "Hera and Poseidon", "Athena and Hermes")], [0, 3]],
["Gifts of the Gods", "Athena and Hermes come to help him.", "temple,statue@2", [0, 1], [1, 2, 0]],
["The Grey Sisters", "Only the Graeae, three grey sisters who share a single eye and a single tooth, know the way. Perseus snatches the eye as they pass it between them, and will not give it back until they tell.", "cave#B8B8C0,spires#D8D8E8", [ctC(0, "What did the three Graeae share between them?", "One eye and one tooth", "Yes. Perseus caught the eye as it passed from hand to hand.", "One cloak", "One voice")], [0]],
["The Gorgons' Isle", "At the edge of the world the Gorgons sleep, among statues that were once people.", "ruins#A8A8A8,statue*3", [2], [0]],
["Medusa", "Perseus never looks at Medusa directly. He watches her only in his polished shield, and strikes. From her blood springs the winged horse, Pegasus.", "mirrorshield,cave#8A8A90", [ctC(0, "How does Perseus see Medusa without being turned to stone?", "Only in the reflection on Athena's polished shield", "Yes. Then into the bag goes the head, and away on Hermes's winged sandals.", "He shuts his eyes", "He wears dark glass")], [0, 1]],
["Andromeda", "Flying home past Ethiopia, Perseus sees a princess chained to a rock by the sea.", "cliff#C8C8D0,pool#5AA8E8", [3], [4, 0]],
["Home Again", "Back on Seriphos, Perseus turns the wicked king to stone with Medusa's head, then gives the head to Athena, who sets it on her shield.", "palace,throne", [ctC(1, "What does Perseus do with Medusa's head at the end?", "Gives it to Athena, who sets it on her shield (the aegis)", "Yes. That's why Athena is often shown with Medusa's face on her shield.", "Throws it in the sea", "Keeps it under his bed")], [0, 1, 3]]
] };
CT_W.nemo = { th: "seabed", intro: "1866. Ships report a huge, glowing sea monster. A professor, his servant and a harpooner set out to hunt it...", ch: [
["The Sea Monster", "Professor Aronnax, his faithful servant Conseil and the Canadian harpooner Ned Land join the hunt on the frigate Abraham Lincoln. The 'monster' rams the ship, they are thrown into the sea, and they climb onto its back. It is made of steel.", "wreck", [ctC(1, "What did the 'monster' turn out to be?", "A submarine, the Nautilus", "Yes, a submarine, years before real ones could do anything like it.", "A giant whale", "A sea serpent")], [1, 3, 2]],
["Aboard the Nautilus", "Captain Nemo, who has turned his back on the land, keeps them aboard his submarine with its library, organ and great windows onto the sea. \"Mobilis in mobili\": moving in the moving element.", "nautilus,dock", [0, 3], [0, 1]],
["The Forest of Crespo", "In diving suits they walk across the sea floor, through an undersea forest where the plants grow straight up and the fish swim like birds among the branches.", "coralgarden,spires#E8705A", [ctF(0, "Gather five samples for the Professor's collection: shells and pearls among the coral.", 5, "pebble", 0xF8E8D8, "a sample", "A fine collection. Aronnax classifies every one, and Conseil names them all in Latin.")], [0, 1, 3]],
["The Pearl of Ceylon", "Off Ceylon (Sri Lanka) Nemo saves a poor pearl diver from a shark, and gives him a bag of pearls.", "coralgarden,chest", [ctC(0, "How is a pearl made inside an oyster?", "Layers of nacre build up round a speck that got inside", "Yes. The oyster coats the bit of grit, layer on layer, for years.", "It grows from a seed", "Fish lay them")], [0, 1, 2]],
["Atlantis", "Nemo leads Aronnax by night up an undersea mountain to the ruins of a drowned city, lit by a volcano. On a rock he writes one word: ATLANTIS.", "ruins@1.5,temple#7A8A8A", [1], [0, 1]],
["The South Pole", "The Nautilus sails under the ice to the South Pole, where Nemo plants a black flag with a golden N. On the way back the ice traps them, and the crew cut their way out.", "spires#C8E4F4,ruins#8AA8B8", [ctC(0, "Nemo reaches the South Pole in March 1868. When did real explorers first get there?", "1911, Roald Amundsen's team", "Yes, 43 years after Verne's book, by dog sled.", "1868", "1969")], [0, 2]],
["The Giant Squid", "Huge squid attack the Nautilus. The crew fight them on deck with axes.", "nautilus@0.8", [2], [2, 0]],
["The Maelstrom", "Ned Land has had enough. Near Norway, the three friends slip into the little boat just as the Nautilus is caught in the great whirlpool, the Maelstrom.", "wreck,dock", [ctR(2, "Now! Swim through every ring to the little boat before the Maelstrom pulls you in!", 6, 95, "You wake in a fisherman's hut on the Lofoten Islands. Nobody knows what became of Captain Nemo and the Nautilus.")], [2, 3, 1]]
] };
CT_W.mermaid = { th: "seabed", intro: "Far out at sea, where the water is as blue as cornflowers and so deep no anchor reaches the bottom, the Sea King has his palace.", ch: [
["The Sea King's Palace", "The Sea King's palace has walls of coral and windows of amber, and a roof of shells. His six daughters each keep a little garden; the youngest, the quietest, grows only red flowers, round like the sun, and a marble statue of a boy.", "palace#E8A0A0,coralgarden", [ctC(1, "At what age may the sea princesses rise to the surface?", "Fifteen", "Yes. And the youngest has the longest wait of all.", "Ten", "Twenty-one")], [0, 1]],
["The Storm", "On her fifteenth birthday she rises and sees a ship with music and lanterns, and a young prince. A storm breaks the ship apart, and she carries the prince to the shore near a church.", "wreck,church", [ctR(0, "The storm wrecks the ship! Swim through every ring to carry the prince to the shore.", 6, 100, "You lay him on the sand by the church. A girl from the church finds him, and he never knows who saved him.")], [0]],
["The Grandmother's Tale", "Her grandmother tells her that the sea people live three hundred years and then become foam on the sea, but humans have a soul that lives for ever.", "pool#3A6A8A,throne", [ctS(1, "We live three hundred years, child, and then we are only foam. Men have a soul that rises up through the clear air to the shining stars. Only if a man loved you more than anything could you share in it.")], [1, 0]],
["The Sea Witch", "Past the whirlpools, in a wood of grasping polyps, lives the sea witch.", "cave#3A4A3A,cauldron", [0], [2, 0]],
["The Prince's Palace", "On land, every step is like treading on knives, yet she dances more beautifully than anyone. The prince loves her as a dear child, but he marries the princess he believes saved him.", "palace#F0E8D8,garden", [ctC(0, "Why can't the little mermaid tell the prince that she saved him?", "The witch took her voice as the price", "Yes. She could only look at him with her deep blue eyes.", "She forgot", "He would not listen")], [0]],
["The Daughters of the Air", "Her sisters bring a knife from the witch, but she cannot use it. She throws herself into the sea at dawn.", "spires#F8E8F0,pool#5AA8D8", [1], [1, 0]]
] };
CT_W.cthulhu = { th: "under", intro: "Providence, Rhode Island, 1926. A professor has died, and left behind a box of notes and a strange clay carving.", ch: [
["The Horror in Clay", "The narrator sorts the papers of his late great-uncle, Professor Angell, and finds a clay carving brought to the professor in 1925 by a young sculptor, Wilcox, who made it in his sleep.", "manor#7A7A70,lectern", [0], [0, 1]],
["The Dreams of 1925", "In the spring of 1925, artists and poets all over the world had the same terrible dreams, and the professor collected their letters.", "tower#5A5A6A,runestone", [ctC(1, "What did Wilcox say he saw in his dream?", "Great cities of huge stone blocks, dripping with green ooze, and a voice", "Yes. Every dreamer saw the same impossible city.", "A forest of glass", "A garden of roses")], [1]],
["The Tale of Inspector Legrasse", "In 1907 Inspector Legrasse of New Orleans led a raid in the Louisiana swamps and found a cult round a carved idol, the same shape as Wilcox's.", "camp,ruins#4A4A40", [ctF(2, "Search the swamp for the five clues the raid left behind.", 5, "print", 0x8AC8A0, "a clue", "The same carving, the same words. Legrasse brought the idol to a meeting of scientists in 1908.")], [2]],
["The Madness from the Sea", "A Norwegian sailor, Johansen, wrote what his crew found in 1925: an island of strange stone rising out of the Pacific.", "wreck,ruins", [1], [2, 0]],
["The Carved Stone", "The narrator puts the notes together and decides some things are better not known.", "idolstone,obelisk#3A4A3A", [ctC(0, "Lovecraft begins the story: the most merciful thing in the world is...?", "The mind's inability to put all its knowledge together", "That's the famous first line. It's a story about the fear of what we don't understand.", "A good night's sleep", "A cup of tea")], [0, 1, 2]]
] };
CT_W.jekyll = { th: "town", intro: "London, in the fog of the 1880s. A respectable lawyer, a door with no knocker, and a man who makes everyone shudder.", ch: [
["Story of the Door", "Mr Enfield tells the lawyer Mr Utterson about a man who trampled a child in the street one night, then paid the family with a cheque signed by a most respectable name.", "street", [ctC(1, "Whose name was on the cheque Hyde paid with?", "Dr Jekyll's", "Yes, and Utterson keeps Jekyll's will in his safe, leaving everything to Edward Hyde.", "Utterson's", "The Queen's")], [1]],
["Search for Mr Hyde", "\"If he be Mr Hyde,\" says Utterson, \"I shall be Mr Seek.\" He watches the door night after night until a small man with a horrible look comes by.", "street#5A4A4A", [ctF(1, "Follow Hyde's footprints through the fog: find the five places he stopped.", 5, "print", 0xE8E8E8, "a footprint", "The trail leads to a door at the back of Dr Jekyll's own house.")], [1]],
["Dr Jekyll Was Quite at Ease", "At a dinner, Utterson asks Jekyll about Hyde. Jekyll goes pale, and asks him to look after Hyde if anything happens to him.", "manor#A89880,garden", [ctS(0, "The moment I choose, I can be rid of Mr Hyde. I give you my hand upon that. Only promise me, Utterson, that you will see he gets his rights.")], [0, 1]],
["The Carew Murder Case", "A maid sees Hyde strike down Sir Danvers Carew with a heavy cane. Half the broken cane is one Utterson gave to Jekyll years ago.", "street#6A6A6A,labbench", [0], [1, 2]],
["The Last Night", "Poole, Jekyll's butler, begs Utterson to come: a strange voice has been crying in the doctor's locked cabinet for days. They break down the door.", "manor#7A6A5A,labbench", [1], [2, 1]],
["Henry Jekyll's Full Statement", "Jekyll's letter tells everything: the powder, the potion, and how he lost control of Hyde.", "lectern,labbench", [ctC(0, "What does Jekyll's statement say every person has inside them?", "Two natures, good and evil, which he tried to separate", "Yes. In freeing the evil side, he found he could not put it back.", "A ghost", "Nothing at all")], [0]]
] };
CT_W.invisible = { th: "moor", intro: "A snowy February in the village of Iping, Sussex, 1890s, and a stranger wrapped in bandages walks into the inn.", ch: [
["The Strange Man's Arrival", "A stranger arrives at the Coach and Horses inn in a snowstorm, muffled up to the eyes, and pays Mrs Hall in gold to be left alone.", "innsign,village", [ctC(1, "What was strange about the guest?", "Bandages all over his head, blue goggles and a shiny pink nose", "Yes. He never took off his gloves, and he ate with a napkin over his mouth.", "He had no shadow", "He spoke only French")], [1, 0]],
["The Burglary at the Vicarage", "Money disappears from the vicarage in the night. The vicar hears someone sneeze, but there is nobody there.", "church,village", [ctF(1, "Coins are scattered all over the village green. Find the five the invisible thief dropped.", 5, "pebble", 0xF2C84A, "a coin", "Returned to the vicar. Who could have dropped them?")], [1]],
["The Unveiling", "Pushed too far, the stranger tears off his nose and bandages... and there is nothing underneath. He throws off his clothes and escapes.", "innsign,cottage", [0], [0, 1]],
["Mr Marvel", "Griffin forces a tramp, Thomas Marvel, to carry his precious notebooks for him. Marvel runs off with them.", "village,camp", [ctR(0, "After the notebooks! Marvel is getting away along the road: run through every ring.", 6, 100, "Marvel hides in an inn at Port Stowe with the books, and Griffin is furious.")], [0]],
["Dr Kemp", "Wounded, Griffin hides in the house of an old student friend, Dr Kemp, and tells him how he did it.", "manor,dome", [1], [0]],
["The Hunter Hunted", "Kemp tells the police. The whole town of Burdock turns out, and Griffin is caught. As he dies, he slowly becomes visible again.", "village,church", [ctC(0, "Wells wrote this in 1897. What does the story warn about?", "Power without responsibility: Griffin used his discovery only for himself", "Yes. A brilliant discovery, used selfishly, ruined him.", "Never go out in snow", "Always wear a hat")], [0]]
] };
CT_W.sleepyhollow = { th: "night", intro: "A drowsy valley near Tarry Town on the Hudson River, about 1790, where people still tell of a headless rider.", ch: [
["The Schoolmaster", "Ichabod Crane is the lanky schoolmaster of Sleepy Hollow, with huge ears, big green eyes and a snipe nose. He loves good food and ghost stories, and believes every one of them.", "cottage#B8A078,village", [ctC(0, "Where is Sleepy Hollow?", "Near Tarry Town, on the Hudson River in New York", "Yes, and it's a real place: you can still visit the old Dutch church.", "In the Scottish Highlands", "In Transylvania")], [0]],
["Katrina Van Tassel", "Ichabod sets his heart on Katrina, the rich farmer's daughter (and her father's fat farm). But big, boisterous Brom Bones wants to marry her too.", "manor#D8C8A8,pumpkins", [ctF(1, "Help pick five pumpkins for the Van Tassels' autumn feast.", 5, "orb", 0xE8801A, "a pumpkin", "Enough pies for the whole valley. Katrina smiles at Ichabod... or is she smiling at Brom?")], [1, 2]],
["The Quilting Frolic", "At the Van Tassels' party there are cakes, pies and dancing, and the old folk tell ghost stories, above all of the Headless Horseman: a soldier whose head was carried away by a cannonball.", "hall#7A5A3A,pumpkins,camp", [0], [2, 1, 0]],
["The Ride Home", "Ichabod rides home alone on his old horse Gunpowder, past the haunted tree, towards the church bridge.", "churchbridge,deadtree", [1], [0, 3]],
["The Shattered Pumpkin", "In the morning Gunpowder is found grazing, and by the brook lie Ichabod's hat and a shattered pumpkin. Ichabod is never seen in Sleepy Hollow again. Brom Bones marries Katrina, and always laughs when the pumpkin is mentioned.", "church,graveyard", [2], [1]]
] };
CT_W.dracula = { th: "night", intro: "1890s. A young English lawyer travels to the Carpathian mountains to sell a London house to a nobleman.", ch: [
["Jonathan Harker's Journal", "Jonathan Harker travels to Transylvania. Peasants cross themselves and give him a crucifix. Count Dracula, a tall old man with a long white moustache, greets him at the castle door.", "castle#4A4448", [2], [2, 3]],
["Prisoner in the Castle", "Jonathan finds every door locked. From his window he sees the Count crawl head-first down the castle wall, like a lizard.", "tower#3A3A40,cliff", [ctC(2, "What does Jonathan see from his window?", "The Count crawling face-down the castle wall", "Yes, and he realises he is a prisoner.", "Wolves dancing", "A ship in the sky")], [2]],
["Whitby", "In a terrible storm a Russian ship runs aground at Whitby with its dead captain tied to the wheel. A great dog leaps ashore and runs up to the churchyard.", "wreck,lighthouse,church", [ctC(1, "In the book, the ship Demeter arrives at Whitby with...?", "Its dead captain lashed to the wheel", "Yes. The crew had vanished one by one on the voyage.", "A cargo of gold", "No sails at all")], [1]],
["Lucy", "Mina's friend Lucy grows pale and weak. Dr Seward sends for his old teacher, Professor Van Helsing, who fills her room with garlic flowers.", "manor#8A7A70,garden", [0], [0, 1]],
["The Boxes of Earth", "Dracula brought fifty boxes of his own earth to London to rest in. The friends hunt them down.", "graveyard,tomb", [1], [1, 0]],
["The Race to the Castle", "Dracula flees home. The friends race to the castle to reach him before sunset.", "castle#4A4448,camp", [ctR(0, "Race the Count's wagon through every ring to the castle before the sun goes down!", 7, 110, "Just as the sun sets, the Count crumbles into dust. Mina is free.")], [0, 1, 2]]
] };
CT_W.thor = { th: "snow", intro: "From the old Norse Edda: Thor the thunder god sets out for the land of the giants, with Loki and two farm children.", ch: [
["The Goats", "Thor stays at a farm and cooks his own two goats for supper. In the morning he raises his hammer over their bones and they come back to life, but one is lame: the farmer's son Thjalfi had split a bone for the marrow. Thjalfi and his sister Röskva become Thor's servants.", "cottage#8A6A4A,camp", [ctC(0, "Thor's goats pull his chariot. What happens after they are eaten?", "Thor blesses the bones with his hammer and they come back to life", "Yes, which is why you must never break their bones!", "They become stars", "They turn into wolves")], [0, 1, 2]],
["The Giant's Glove", "They sleep in an empty hall with a side room. In the morning they find it was the glove of a giant, Skrymir, and the side room was its thumb.", "hall#8A8070@1.4", [ctC(1, "The 'hall' where they slept was really...?", "The giant Skrymir's glove, and the side room its thumb", "Yes, and the earthquake in the night was Skrymir snoring.", "A cave", "A ship turned upside down")], [0, 1, 2]],
["Utgard", "They reach a fortress so tall they must bend their heads right back to see the top. Utgard-Loki, king of the giants, laughs at little Thor.", "castle#7A8088@1.2", [ctS(3, "Is this little fellow Thor? You must be stronger than you look. No one stays here who is not the master of some skill. What can you do?")], [3, 0]],
["The Contests", "Thor takes on three contests.", "feasttable,hall#6A6058", [0, 1, 2], [3, 0, 1]],
["The Race", "Young Thjalfi, the fastest runner in the world of men, races a giant called Hugi.", "banner*2,camp", [3], [2]],
["The Truth", "As they leave, Utgard-Loki tells them the truth: it was all enchantment. And then he and his castle vanish.", "ruins#A8B0B8,spires", [ctC(3, "What was Loki's eating contest against 'Logi' really?", "Logi was wildfire, which burns up the food and the trough too", "Yes. No one can out-eat fire.", "A bear", "A pig")], [0, 1]]
] };
CT_W.odin = { th: "snow", intro: "From the old Norse poems: the All-Father Odin, who gave up an eye for wisdom and won the runes.", ch: [
["The Wanderer", "Odin often walks the worlds as an old grey-bearded wanderer in a wide hat and a blue cloak, with two ravens who fly out each day and bring him news.", "standingstones,camp", [ctC(0, "What are Odin's two ravens called, and what do the names mean?", "Huginn and Muninn: Thought and Memory", "Yes. Every evening they whisper to him all they have seen.", "Thor and Loki: Thunder and Fire", "Sol and Mani: Sun and Moon")], [0]],
["Yggdrasil", "The great ash tree Yggdrasil holds up the nine worlds. One of its roots reaches to the land of the frost giants, and under it is Mimir's well.", "bigtree@1.6#5A7A5A", [ctS(0, "Nine worlds hang in the branches of the ash tree. An eagle sits at the top, a dragon gnaws the roots, and a squirrel runs between them carrying insults.")], [0]],
["The Price of Wisdom", "The water of Mimir's well holds all wisdom. Mimir guards it.", "well,runestone*2", [ctC(1, "What did Odin give to drink from my well?", "One of his eyes", "Yes. It lies at the bottom of the well still.", "His spear", "His ravens")], [1, 0]],
["Nine Nights on the Tree", "Odin hangs himself on the World Tree for nine nights, wounded by his own spear, with no food or drink, and at the end he sees the runes and takes them up.", "bigtree,runestone", [0, 1], [0, 1]],
["Writing in Runes", "Runes were cut into wood and stone across the north for over a thousand years.", "standingstones,runestone", [2], [0]]
] };
CT_W.frankenstein = { th: "snow", intro: "Letters from the Arctic, 1790s: an explorer's ship is trapped in the ice, and a stranger on a dog-sled is dying in the cold.", ch: [
["Letters from the Ice", "Captain Walton's ship is stuck in the ice near the North Pole. The crew see a giant figure on a dog-sled race past, and the next day they rescue a half-frozen man: Victor Frankenstein.", "ship,iceslabs", [ctC(0, "Where is Walton's ship when he finds Victor?", "Trapped in the ice near the North Pole", "Yes. And Victor begins to tell his story.", "In a harbour in Geneva", "On the Thames in London")], [0, 1]],
["Geneva and Ingolstadt", "Victor grows up in Geneva, reads old alchemists, then sees lightning blast an old oak to splinters. At university in Ingolstadt he studies science day and night.", "manor#D8D0C0,tower", [ctC(1, "What first made the young Victor fascinated by electricity?", "He saw lightning destroy an old oak tree", "Yes. A stream of fire, and nothing was left of the tree but a blasted stump.", "A magician's show", "A book about whales")], [1]],
["A Dreary Night of November", "After two years of work Victor gives life to the creature he has made, and runs from it in horror.", "labbench,tower#6A6A70", [ctS(1, "I had worked hard for nearly two years. But now that I had finished, the beauty of the dream vanished, and breathless horror filled my heart. I rushed out of the room.")], [1]],
["The Cottage", "Alone and rejected, the creature hides by a cottage and learns about people.", "cottage#8A7A60,bigtree", [0], [2]],
["The Glacier", "High on the Sea of Ice above Chamonix, the creature meets Victor and asks him for something.", "spires#E0F0FA,cliff#A8B0B8", [1], [2, 1]],
["The Chase North", "Victor breaks his promise, and the creature takes a terrible revenge. Victor follows him north across the ice.", "iceslabs,camp", [ctR(1, "Follow the creature's sled tracks north through every ring before the snow covers them.", 6, 100, "The tracks lead on and on, to the ice where Walton's ship lies trapped.")], [1]],
["The Last Word", "Victor dies aboard Walton's ship. The creature comes to mourn him, then leaps onto an ice raft and is carried away into the dark.", "ship", [2], [0, 2]]
] };
CT_W.oz = { th: "emerald", intro: "Kansas, 1900: a grey prairie, a little house, and a cyclone coming.", ch: [
["The Cyclone", "A cyclone lifts Dorothy and Toto, house and all, and sets them down in the land of the Munchkins, right on top of the Wicked Witch of the East.", "cottage#A8A8A0,village#5A8AD8", [ctC(5, "The Good Witch of the North gives Dorothy the dead witch's shoes. In the book, what are they made of?", "Silver", "Yes, silver shoes in the book. The ruby slippers came from a later film.", "Glass", "Ruby")], [0, 1, 5]],
["The Scarecrow", "Following the yellow brick road, Dorothy helps a Scarecrow down from his pole.", "scarecrowpost,village#5A8AD8", [ctC(2, "What does the Scarecrow want from the Wizard?", "Brains", "Yes, though he turns out to be the cleverest of them all.", "A heart", "Courage")], [2, 0]],
["The Tin Woodman", "In the forest they find a man made of tin, rusted stiff. Dorothy oils his joints.", "cottage#6A5A40,bigtree", [ctC(3, "What does the Tin Woodman want from the Wizard?", "A heart", "Yes, though he is so tender-hearted he cries if he steps on a beetle.", "Brains", "A new axe")], [3, 0, 2]],
["The Cowardly Lion", "A great Lion leaps out roaring, and Dorothy slaps his nose for snapping at Toto. He admits he is a coward.", "cliff#8A7A60,bigtree", [ctC(4, "What does the Lion ask the Wizard for?", "Courage", "Yes, though he is brave whenever his friends need him.", "A crown", "A heart")], [4, 0]],
["The Deadly Poppy Field", "The scent of a great field of red poppies puts Dorothy, Toto and the Lion to sleep. The Scarecrow and Tin Woodman, who don't breathe, carry Dorothy out.", "garden#D83A3A,pool", [ctR(2, "The poppies' scent is putting everyone to sleep! Run through every ring to carry Toto out of the field.", 6, 100, "Out! And the field mice, thousands of them, pull the sleeping Lion out on a little truck.")], [2, 3, 0]],
["The Emerald City", "Everyone in the Emerald City wears green spectacles, locked on, to protect their eyes from the brightness.", "emeraldgate,brickroad", [0], [0, 2, 3, 4]],
["The Wicked Witch of the West", "The Wizard sends them to defeat the Witch of the West. She makes Dorothy her servant.", "castle#D8C838", [ctC(0, "How does Dorothy defeat the Wicked Witch of the West?", "She throws a bucket of water over her in anger, and the witch melts away", "Yes. Dorothy had no idea water would do that!", "With a magic sword", "She tricks her into a cage")], [0]],
["The Wizard Unmasked", "Back in the Emerald City, Toto knocks over a screen, and there is the Wizard: a little old man from Omaha.", "palace#3AA85A", [1], [6, 2, 3, 4]],
["Glinda", "The Wizard's balloon floats away without Dorothy. They travel south to Glinda the Good, Witch of the South.", "palace#E85A5A,garden", [2], [0, 1]]
] };
CT_W.wukong = { th: "fire", intro: "From the Chinese classic Journey to the West (1592): the Monkey King, born from a stone, guards a monk on a pilgrimage across the world.", ch: [
["Born from a Stone", "On the Mountain of Flowers and Fruit, a stone egg cracks open and out comes a monkey. He leaps through the Water Curtain into a cave, and the monkeys make him their king.", "cave#8A6A50,bigtree", [ctC(0, "Where was Sun Wukong born?", "From a stone egg on the Mountain of Flowers and Fruit", "Yes. A stone that had soaked up heaven and earth since the world began.", "In the Jade Emperor's palace", "In the sea")], [0]],
["Under the Mountain", "Wukong learns 72 transformations and how to leap 108,000 li in one somersault, steals the peaches of immortality and fights all of Heaven. The Buddha bets he cannot leap out of his palm, and traps him under a mountain for five hundred years.", "cliff,ruins#7A5A40", [ctC(0, "How did the Buddha catch Wukong?", "He bet Wukong couldn't jump out of his palm, then closed his hand into a mountain", "Yes. Wukong thought he had reached the end of the world, but it was the Buddha's fingers!", "With a net", "With a riddle")], [0]],
["The Pilgrim", "The monk Tang Sanzang frees Wukong, and they set off west, with the greedy Zhu Bajie (Pigsy) and the quiet Sha Wujing (Sandy).", "tents,camp", [ctC(1, "Why is Tang Sanzang travelling west?", "To bring Buddhist scriptures back from India to China", "Yes. It's based on a real monk, Xuanzang, who made the journey in the 600s.", "To find a treasure", "To visit the sea")], [1, 0, 2, 3]],
["The Burning Road", "The way ahead is blocked by the Flaming Mountains: eight hundred li of fire, so hot even copper melts.", "~volcano,flamemount", [ctS(2, "I'm melting! My bristles are singeing! Master, let's go round. Let's go back! Let's go anywhere that isn't here!")], [0, 1, 2, 3]],
["The False Fan", "Only Princess Iron Fan's palm-leaf fan can put out the fires.", "cave#5A3A2A,tents", [0], [4, 0]],
["The Real Fan", "Wukong tries again, with a trick of his own.", "pagoda,camp", [1], [0, 4]],
["Fanning the Fires", "With the real fan in his hand, Wukong goes back to the burning slopes.", "ruins#5A3A2A,flamemount", [2], [0, 1]]
] };
CT_W.laputa = { th: "sky", intro: "Gulliver's third voyage, 1706: set adrift by pirates, he looks up and sees an island floating in the sky.", ch: [
["Adrift", "Pirates take Gulliver's ship and set him adrift in a canoe. Among the rocky islands he sees a shadow pass over the sun: a whole island, flying.", "dock,wreck", [ctC(0, "How does Gulliver get up onto the flying island?", "The Laputians let down a chain with a seat, and pull him up", "Yes, with pulleys, from the island's lowest gallery.", "He climbs a beanstalk", "A giant eagle carries him")], [0]],
["The Flying Island", "The Laputians have one eye turned inward and one up to the stars. They are so lost in thought that servants called flappers must tap them with bladders to make them speak or listen.", "palace#C8C8D8,garden", [ctC(2, "Why do the Laputians need flappers?", "They're so lost in thought they must be tapped on the mouth and ears to speak or listen", "Yes. A flapper even taps their eyes to stop them walking off a cliff.", "To keep the flies away", "To fan them in the heat")], [2, 0]],
["Dinner of Shapes", "At the King's table everything is cut into shapes from geometry and music.", "feasttable,throne", [ctC(1, "At the King's table, a shoulder of mutton was cut into...?", "An equilateral triangle", "Yes, and the bread into cones, cylinders and parallelograms.", "A heart", "A star")], [1, 0]],
["The Astronomers", "Laputa's astronomers have the best telescopes in the world.", "dome,telescope*2", [0], [3]],
["The Lost Charts", "The King's star charts blow about the terrace.", "tower#D8D8E8,orrery", [1], [2, 1]],
["The Loadstone", "At the heart of the island is a huge magnet that lets it rise, sink and move.", "spires#8A8AC8,obelisk", [2], [0, 3]],
["The Academy of Lagado", "Below, in Balnibarbi, the Academy of Lagado is full of 'projectors' with useless schemes, like building houses from the roof down.", "hall#B8B8C8,windmills", [ctC(0, "At the Academy of Lagado, one scientist has worked eight years to extract what from cucumbers?", "Sunbeams", "Yes, to warm the air in cold summers. Swift was poking fun at silly science.", "Gold", "Music")], [0]]
] };
CT_W.martians = { th: "moor", intro: "Surrey, England, around 1900. An astronomer sees puffs of gas on the planet Mars...", ch: [
["The Eve of the War", "At the observatory at Ottershaw, Ogilvy shows the narrator the red planet, and the jets of flame shooting out from it night after night.", "dome,village", [ctC(2, "In the story, what does Ogilvy see through his telescope?", "Flashes of fire on Mars, night after night", "Yes. Nobody guessed they were cylinders being fired at Earth.", "A comet", "A new moon")], [2, 0]],
["The Falling Star", "A 'falling star' lands on Horsell Common, near Woking. In the pit is a huge metal cylinder, and its top is slowly unscrewing.", "cylinder,crater", [ctS(2, "It's hollow, I tell you, and something inside is unscrewing the lid! Fetch help, all of you!")], [2, 0]],
["The Heat-Ray", "The Martians strike with an invisible ray of heat.", "village,camp", [ctR(0, "Run from the Heat-Ray through every ring to the shelter of the trees!", 6, 95, "Safe for now. The narrator takes his wife to Leatherhead, then comes back.")], [0]],
["The Fighting-Machines", "Huge three-legged machines stride across the land.", "tripod,church", [ctC(0, "What do the Martians bring with them that turns everything red?", "The red weed", "Yes, a plant from Mars that grows wherever there's water.", "Red paint", "Red dust")], [0]],
["The Red Weed", "The red weed creeps over every river and pond.", "ruins#8A6A5A,pool", [0], [0, 2]],
["The Artilleryman", "On Putney Hill the narrator meets the artilleryman again, who has big plans.", "cottage,tents", [2], [1, 0]],
["Dead London", "In a silent London the narrator finds the Martians, all dead.", "street#7A6A60,tripod", [1], [0, 2]]
] };
CT_W.arabian = { th: "desert", intro: "The One Thousand and One Nights, gathered over centuries across Persia, India and the Arab world.", ch: [
["A Thousand and One Nights", "Each night Scheherazade tells King Shahryar a story, and stops at the most exciting part, so he lets her live one more day to hear the end.", "palace,tents", [ctC(0, "Why does Scheherazade stop each story halfway?", "So the king will let her live another day to hear the end", "Yes. After a thousand and one nights he has learned to be kind.", "Because she forgets", "Because the candle goes out")], [0]],
["Open, Sesame!", "The woodcutter Ali Baba hides in a tree and watches forty thieves open a rock with magic words.", "cave#C8A070", [1], [1]],
["Morgiana's Wit", "A thief marks Ali Baba's door with chalk, to find it again that night.", "village#E8D8B8,marketstall*2", [0], [2, 1]],
["The Oil Jars", "The thieves' captain comes as an oil merchant, with his men hidden in jars.", "marketstall,tents", [ctC(2, "How many thieves were there?", "Forty", "Yes, and clever Morgiana outwits them all.", "Seven", "A hundred")], [2]],
["Aladdin's Lamp", "A magician sends young Aladdin into a cave for an old lamp.", "cave#B89060,palace#E8D8F0", [2], [3, 4]],
["Sinbad's First Voyage", "Sinbad's crew land on a little island and light a fire... and the island moves.", "dock,ship", [ctC(5, "On his first voyage, the island where Sinbad's crew lit a fire turned out to be...?", "A giant whale", "Yes. It dived, and Sinbad floated off on a wooden tub.", "A sea turtle", "A sleeping giant")], [5]],
["The Valley of Diamonds", "A giant roc drops Sinbad in a valley of diamonds guarded by snakes.", "cliff#C8A070,crater", [ctF(5, "Gather five diamonds from the valley before the great roc comes back.", 5, "shard", 0xF0F8FF, "a diamond", "Sinbad ties himself to a piece of meat, an eagle carries him out, and he goes home rich.")], [5]]
] };
CT_W.gilgamesh = { th: "desert", intro: "The oldest great story in the world, from Mesopotamia, written on clay tablets about 4,000 years ago.", ch: [
["The King of Uruk", "Gilgamesh, two-thirds god and one-third man, is the mighty king of Uruk, builder of great walls, but proud and hard on his people.", "wall#C8A878", [ctC(0, "Where is Uruk, the city of Gilgamesh?", "In ancient Mesopotamia, in today's Iraq", "Yes, between the Tigris and Euphrates rivers. Its ruins are still there.", "In Egypt", "In Greece")], [0]],
["Enkidu", "The gods make a wild man, Enkidu, who runs with the animals. He and Gilgamesh wrestle, neither can win, and they become best friends.", "camp,pool", [ctC(1, "How do Gilgamesh and Enkidu become friends?", "They wrestle, neither can win, and they embrace", "Yes. They become inseparable.", "They share a meal", "They are brothers")], [1, 0]],
["The Cedar Forest", "Together they travel to the Cedar Forest and defeat its guardian, Humbaba.", "bigtree*3", [ctR(0, "Through the great cedars, every ring, before Humbaba wakes!", 7, 110, "They cut down a great cedar and float it home for a temple door.")], [0, 1]],
["The Bull of Heaven", "The goddess Ishtar sends the Bull of Heaven against Uruk. The friends kill it, and the gods decide one of them must die. Enkidu falls ill.", "temple#C8A878,obelisk", [ctC(0, "What does Gilgamesh learn when Enkidu dies?", "That he too will die one day, and he sets out to find eternal life", "Yes. His grief sends him to the end of the world.", "Nothing", "How to fly")], [0, 1]],
["The Waters of Death", "Gilgamesh crosses mountains and the Waters of Death to find Utnapishtim, the one man the gods made immortal.", "cliff,dock", [ctS(0, "I have walked through the dark mountain, crossed the Waters of Death. Tell me, Utnapishtim: how did you find life without end?")], [0]],
["The Flood", "Utnapishtim tells how the gods sent a great flood, and how he built a boat.", "ship#7A5A3A,pool", [0], [2, 0]],
["The Plant and the Walls", "Gilgamesh finds a plant that brings back youth, but a snake steals it while he bathes. He goes home, and looks with pride on the walls of Uruk.", "tablets,wall", [1], [0]]
] };
CT_W.columbiad = { th: "meadow", intro: "Baltimore, 1865. The Civil War is over, and the Gun Club's cannon-makers have nothing to do.", ch: [
["The Gun Club", "The president of the Gun Club, Impey Barbicane, makes a proposal: fire a shell at the Moon.", "hall#5A5A6A,village", [ctC(0, "Who are the members of the Gun Club?", "Cannon-makers and gunners with nothing to do after the American Civil War", "Yes, with plenty of wooden legs and metal skull-plates among them.", "Astronomers", "Sailors")], [0]],
["The Rival", "Captain Nicholl, who makes armour plate, bets Barbicane the scheme will fail.", "tents,camp", [ctC(1, "Why are Barbicane and Nicholl old rivals?", "One makes cannons, the other makes armour to stop them", "Yes. For years each tried to beat the other's invention.", "They both love the same lady", "Nicholl owes him money")], [1]],
["Stone's Hill", "A gun 900 feet long is cast straight down into the ground in Florida.", "columbiad,crater", [0], [0]],
["Michel Ardan", "A telegram from Paris: \"Replace spherical shell by cylindro-conical projectile. Shall go inside.\"", "dome,camp", [1], [2]],
["The Guncotton", "Four hundred thousand pounds of guncotton are loaded.", "village,tents", [2], [1]],
["The Launch", "December 1st: the gun fires, the ground shakes, and a giant telescope in the Rocky Mountains watches for the shell.", "shell,dome", [ctC(0, "What did Verne's travellers ride in?", "A hollow aluminium shell", "Yes, with padded walls and water springs to soften the shock.", "A wooden rocket", "A balloon")], [0, 1, 2]]
] };
CT_W.timemachine = { th: "future", intro: "A house in Richmond, 1890s. The Time Traveller shows his friends a little brass model, and it vanishes.", ch: [
["The Thursday Dinner", "The Time Traveller explains his idea to his guests. A week later he staggers in late, dusty and limping, and tells them where he has been.", "manor#B8A890,garden", [ctC(0, "What does the Time Traveller call time?", "The Fourth Dimension", "Yes: length, breadth, thickness, and duration.", "A river", "A clock")], [0]],
["The Year 802,701", "He lands by a huge white sphinx in a world like a beautiful overgrown garden.", "whitesphinx,timemachine", [ctS(0, "I looked round me. Great buildings, half in ruins, among bushes and flowers. And above me, the White Sphinx, with a faint smile, watching.")], [0]],
["The Eloi", "Small, gentle, laughing people come to meet him: the Eloi.", "ruins#D8D0C0,garden", [ctC(2, "What do the Eloi eat?", "Only fruit", "Yes. They spend their days playing and their nights huddled together, afraid of the dark.", "Bread and cheese", "Fish")], [2, 0]],
["Weena", "An Eloi girl is swept away while bathing, and none of her friends help. He pulls her out. She follows him everywhere after that.", "pool,bridge", [ctR(0, "Weena is swept away in the stream! Run through every ring along the bank to pull her out.", 6, 90, "Saved! She gives him a garland of flowers and follows him ever after.")], [1, 0]],
["The Wells", "His machine is gone. Down deep shafts in the ground live the Morlocks, pale creatures who hate the light.", "tower#C8C0B0,ruins", [0], [3, 0]],
["The Palace of Green Porcelain", "In a ruined museum he finds matches and an iron bar.", "palace#6A9A7A", [ctF(0, "Search the ruined museum for five boxes of matches. Light is the only thing the Morlocks fear.", 5, "flame", 0xFFB040, "a box of matches", "He strikes a match and the Morlocks shrink back.")], [0, 1]],
["The Further Vision", "He escapes to the far future and returns home, then sets off again and never comes back.", "timemachine,obelisk", [1, 2], [0, 1]]
] };
CT_W.egypt = { th: "desert", intro: "Ancient Egypt, three thousand years ago. The dead travel through the Duat to be judged, with a book of spells to guide them.", ch: [
["The Book of Coming Forth by Day", "Egyptians were buried with scrolls of spells to help them through the underworld, the Duat.", "pyramid", [ctC(4, "What did the Egyptians call the scrolls we call the 'Book of the Dead'?", "The Book of Coming Forth by Day", "Yes. It was to help the dead come out into the light again.", "The Book of Night", "The Book of the Nile")], [4]],
["The Boat of the Sun", "Each night the Sun god Ra sails his boat through the underworld, and each morning he rises again.", "ship#D8B060,obelisk", [ctS(1, "Every night the sun boat sails through the twelve hours of darkness, fighting the great serpent Apep, and every dawn Ra rises again in the east.")], [1]],
["The Gates", "The way is barred by gates, each with a guardian, and the dead must know their names to pass.", "arch#C8A870,obelisk*2", [ctC(0, "To pass the gates of the Duat, what must the dead know?", "The names of the gates and their guardians", "Yes. In Egyptian belief, names had power.", "A secret dance", "How to swim")], [0]],
["The Hall of the Two Truths", "Anubis leads the dead to the scales.", "scales,egtemple", [0, 1], [0, 2]],
["Thoth's Record", "Ibis-headed Thoth, god of writing, records the result.", "statue*2,tablets", [2], [1]],
["Before Osiris", "Those whose hearts balance with the feather are brought before Osiris.", "throne,temple#D8C088", [ctC(3, "What is the Field of Reeds?", "A paradise like a perfect Egypt, where the justified live for ever", "Yes, with rich harvests and gentle river breezes.", "A battlefield", "A desert")], [3, 4]]
] };
CT_W.yokai = { th: "eastern", intro: "Old Japan, on a shrine path at dusk, where the yokai of the folk tales come out to play tricks.", ch: [
["The Shrine Path", "Red gates stand over a path lined with stone lanterns.", "shrinegate,stonelantern*2", [ctC(null, "In Japan, what does a torii gate mark?", "The way into a Shinto shrine's sacred ground", "Yes. You bow when you pass under it.", "A town's border", "A bridge")], []],
["The Kappa of the River", "By the river lives a kappa, with a dish of water on top of its head.", "bridge,pool", [0], [0]],
["The Tanuki's Kettle", "An old tale tells of a tanuki that turned itself into a tea kettle, and got its tail stuck out when it was put on the fire.", "hut,cottage#8A6A4A", [ctC(2, "In the old story Bunbuku Chagama, what does the tanuki turn into?", "A tea kettle", "Yes, and later it performs tricks to make its owner rich.", "A rock", "A lantern")], [2]],
["The Fox's Lanterns", "Kitsune foxes can shape-change, and the oldest grow nine tails.", "pagoda,stonelantern*3", [1], [1]],
["The Night Parade", "On certain nights, the stories say, a hundred yokai march down the roads in the Night Parade.", "shrinegate@1.6,stonelantern*2", [ctR(1, "The Night Parade of a Hundred Yokai is coming down the path! Run through every ring to the shrine before it reaches you.", 7, 100, "Safe inside the shrine, you watch the parade go by: umbrellas with one eye, walking lanterns, dancing kettles.")], [0, 1, 2]]
] };
CT_W.robinhood = { th: "forest", intro: "The old ballads of Sherwood Forest, near Nottingham, sung for six hundred years.", ch: [
["Little John on the Bridge", "Robin meets a giant of a man on a narrow log bridge, and neither will step aside. They fight with quarterstaffs, and Robin ends up in the stream.", "bridge,bigtree", [ctC(1, "Why is Little John called 'Little'?", "As a joke: he is seven feet tall", "Yes. Robin's men renamed him John Little, then Little John.", "He was small as a boy", "He is Robin's little brother")], [0, 1]],
["Friar Tuck", "Robin makes a fat friar carry him across a river on his back, and the friar promptly drops him in.", "cottage#7A6A50,pool", [ctC(3, "How does Robin meet Friar Tuck in the ballad?", "He makes the friar carry him across a river, and gets dunked", "Yes. Then they fight, laugh, and Tuck joins the band.", "At a fair", "In a church")], [3, 0]],
["The Greenwood", "Under the great trees of Sherwood the band in Lincoln green take from greedy lords and give to the poor.", "bigtree@1.4,tents", [ctS(0, "Here in the greenwood we live free. We take from the rich who rob the poor, and no honest traveller need fear us.")], [0, 1, 2, 3]],
["Nottingham Fair", "The Sheriff holds an archery contest, with a silver arrow as the prize, to trap Robin.", "target*3,castle#8A8478", [0, 1], [0, 4]],
["The Silver Arrow", "Robin wins in disguise, and is away before the Sheriff knows it.", "village,marketstall*2", [2], [2]],
["The Rescue", "The Sheriff has captured Will Stutely and will hang him. Robin's men must reach the gallows in time.", "wall,camp", [ctR(0, "Run with Robin's men through every ring to the town gate to save Will Stutely!", 7, 110, "Will is free, and back in the greenwood by nightfall.")], [0, 1]]
] };
CT_W.arthur = { th: "meadow", intro: "From Malory's Le Morte d'Arthur (1485) and older legends: the boy who became king.", ch: [
["Uther's Son", "When King Uther's son is born, Merlin takes the baby to be raised in secret by Sir Ector, as brother to Ector's son, Kay.", "castle", [ctC(1, "Who raises the baby Arthur?", "Sir Ector, as a brother to his son Kay", "Yes. Arthur grows up never knowing he is a king's son.", "Merlin himself", "The Lady of the Lake")], [1]],
["The Tournament in London", "Years later, Kay is to fight in his first tournament in London, with young Arthur as his squire.", "tents,banner*2", [1], [2, 0]],
["The Sword in the Stone", "In the churchyard stands a stone with a sword in it.", "swordstone,church", [0], [0, 1, 2]],
["Excalibur", "Arthur's first sword breaks. Merlin takes him to a lake, where an arm in white silk holds up another sword.", "lakeshore,pool", [2], [3, 0, 1]],
["The Round Table", "Arthur gathers his knights at a round table, so that no knight sits above another.", "hall#8A7A6A,throne", [ctC(0, "Why was the Round Table round?", "So that no knight sat at the head, above the others", "Yes. All were equal at it.", "It fitted the room", "It was cheaper")], [0, 1]],
["The Quest", "The knights ride out on quests: to help the weak and keep their word.", "tower,arch", [ctR(0, "Ride out on a quest! Through every ring before dusk, to reach the far tower.", 6, 100, "A quest well begun. The knights' code: be brave, be true, help those who need it.")], [0]]
] };
CT_W.quixote = { th: "meadow", intro: "La Mancha, Spain, around 1600: a gentleman has read so many books of knights that his wits have dried up.", ch: [
["The Gentleman of La Mancha", "A thin old gentleman reads tales of knights until he decides to become one. He puts on old armour, names his bony horse Rocinante and himself Don Quixote.", "manor#D8C8A8", [ctC(0, "What turns the gentleman into 'Don Quixote'?", "Reading too many books about knights", "Yes. Cervantes was poking fun at those old romances.", "A magic spell", "A bang on the head")], [0, 2]],
["Knighted at the Inn", "He thinks a country inn is a castle, and asks the innkeeper to dub him a knight. The innkeeper, playing along, does.", "cottage#E8D8C0,innsign", [ctC(0, "What does Don Quixote think the inn is?", "A castle", "Yes, with the innkeeper as its lord.", "A church", "A ship")], [0]],
["Sancho Panza", "He takes a farmer, Sancho Panza, as his squire, promising him an island to rule.", "village", [ctC(1, "What does Don Quixote promise Sancho for being his squire?", "An island to govern", "Yes. Sancho rides along on his donkey, dreaming of it.", "A horse", "A castle")], [1, 0]],
["The Windmills", "On the plain stand thirty or forty windmills.", "windmills", [0, 1], [0, 1, 2]],
["The Flocks of Sheep", "Two clouds of dust are, to Don Quixote, two great armies. He charges... into two flocks of sheep.", "camp", [ctF(1, "Help Sancho gather up the five scattered sheep before the shepherds come.", 5, "sheep", 0xFFFFFF, "a sheep", "All gathered. The shepherds are not pleased with Don Quixote.")], [1]],
["Dulcinea", "Every knight needs a lady. His is Dulcinea del Toboso, really a farm girl he has hardly ever seen.", "garden", [ctC(0, "Who is Dulcinea really?", "A farm girl from a nearby village", "Yes. To him she is the most beautiful princess in the world.", "A queen", "A witch")], [0]],
["Home to La Mancha", "At last, home again, he wakes from his dream of knighthood and calls himself by his own name, Alonso Quixano the Good.", "manor#D8C8A8,garden", [ctC(1, "How does Cervantes end the book?", "Don Quixote comes home and gets his good sense back", "Yes. Sancho begs him to set out again: he has grown to love the adventures.", "He becomes a king", "He wins Dulcinea")], [1, 0]]
] };
CT_W.mothergoose = { th: "kids", intro: "The old nursery rhymes of Mother Goose, in bright colours, all in one sunny land.", ch: [
["Mother Goose's Lane", "Mother Goose rides her goose through the sky and lives in a little house full of rhymes.", "cottage#FF8AC8,kidsflowers", [ctC(0, "Finish the rhyme! \"Hey diddle diddle, the cat and the fiddle, the cow jumped over the...\"", "moon", "Yes! And the little dog laughed to see such fun.", "barn", "sun")], [0]],
["Little Bo Peep", "Little Bo Peep has lost her sheep and doesn't know where to find them.", "garden#FFD838,kidsflowers", [0], [1, 6]],
["Humpty Dumpty", "Humpty Dumpty sat on a wall.", "humptywall", [1], [2]],
["Jack and Jill", "Jack and Jill went up the hill.", "well,mound#3AC83A", [2], [4, 5]],
["Old King Cole", "Old King Cole was a merry old soul.", "castle#FF5AA8", [ctC(3, "How many fiddlers did Old King Cole call for?", "Three", "Yes! \"He called for his pipe, and he called for his bowl, and he called for his fiddlers three.\"", "Two", "Ten")], [3]],
["Hickory Dickory Dock", "The mouse ran up the clock.", "tower#3AC8FF,kidsflowers", [ctR(0, "Hickory dickory dock! Run up and round through every ring before the clock strikes one!", 6, 100, "The clock struck one, the mouse ran down... and you made it in time!")], [0]]
] };
CT_W.pinocchio = { th: "kids", intro: "Italy, 1883. An old woodcarver, a talking log, and a puppet who wants to be a real boy.", ch: [
["The Talking Log", "A carpenter, Master Cherry, finds a log that laughs and cries, and gladly gives it away to his friend Geppetto.", "workbench,cottage#FFB83A", [ctC(1, "Who first found the piece of wood that could talk?", "Master Cherry the carpenter", "Yes. He was so frightened his nose turned from red to blue!", "Geppetto", "The Fairy")], [1]],
["The Talking Cricket", "Geppetto carves a puppet, Pinocchio, who runs off at once. At home a Talking Cricket gives him some advice.", "cottage#3AC8FF,kidsflowers", [ctC(2, "What does the Talking Cricket tell Pinocchio?", "Children who run away from home come to no good", "Yes. Pinocchio doesn't listen... yet.", "Eat your vegetables", "Learn to dance")], [2, 0]],
["The Puppet Show", "Pinocchio sells his schoolbook for a ticket to the puppet show. Fire-Eater the showman sneezes, and lets him go with five gold coins.", "stage#FF3A3A", [0, 1], [3, 0]],
["The Field of Miracles", "A lame Fox and a blind Cat tell Pinocchio to bury his coins in the Field of Miracles, so they'll grow into a tree of gold.", "garden#FFD838,bigtree", [ctF(0, "Find the five gold coins Pinocchio buried before the Fox and the Cat dig them up!", 5, "pebble", 0xFFD82A, "a coin", "Saved! The Fox and the Cat were tricking him all along.")], [0]],
["The Fairy's House", "The Fairy with Turquoise Hair takes him in. Each time he tells a lie, his nose grows longer.", "palace#5AD8FF,kidsflowers", [2], [3, 0]],
["The Land of Toys", "A boy called Lampwick takes Pinocchio to the Land of Toys, where there's no school and every day is play... until they grow donkey ears.", "tents,windmills", [ctC(0, "What happens to the boys in the Land of Toys?", "They turn into donkeys", "Yes. Pinocchio learns that all play and no school has a price.", "They become kings", "They learn to fly")], [0]],
["Inside the Great Shark", "Thrown into the sea, Pinocchio is swallowed by a huge shark, and inside he finds Geppetto, who has been there for two years!", "pool,dock", [ctR(0, "The shark is asleep with its mouth open! Run with Geppetto through every ring and swim for the shore!", 6, 100, "Out! Pinocchio carries Geppetto on his back all the way to land.")], [0, 1]],
["A Real Boy", "Pinocchio works hard to care for Geppetto.", "cottage#FF8AC8,kidsflowers", [3], [1, 0, 3]]
] };
CT_W.threepigs = { th: "kids", intro: "Two of the oldest English folk tales: three little pigs, a big bad wolf, and a girl who walks into the bears' house.", ch: [
["Off into the World", "Three little pigs say goodbye to their mother and set out to build houses of their own.", "cottage#FFB0D0,kidsflowers", [ctC(null, "The three little pigs each build a house. What are the houses made of?", "Straw, sticks and bricks", "Yes! Now, which one will keep the wolf out?", "Sweets, stones and ice", "Paper, cloth and glass")], [0, 1, 2]],
["The House of Straw", "The first little pig builds a house of straw. \"Little pig, little pig, let me come in!\" \"Not by the hair of my chinny-chin-chin!\"", "pighouse,kidsflowers", [ctC(3, "What does the wolf say next?", "\"Then I'll huff, and I'll puff, and I'll blow your house in!\"", "Yes, and down goes the straw house! The little pig runs to his brother.", "\"Please may I have some tea?\"", "\"Goodbye!\"")], [0, 3]],
["The House of Sticks", "The second little pig builds a house of sticks. The wolf huffs and puffs...", "pighouse,mushrooms", [ctC(1, "Can the house of sticks keep the wolf out?", "No, he blows it down too", "Yes. Both pigs run to the third pig's house of bricks.", "Yes, sticks are strong", "Only on Sundays")], [1, 3]],
["The House of Bricks", "The third little pig builds his house of bricks, and the wolf huffs and puffs and puffs and huffs...", "pighouse,village#FF8A3A", [0, 2], [2, 3]],
["Down the Chimney", "The wolf climbs onto the roof to come down the chimney... into a big pot of water on the fire! He jumps out and runs away, never to come back.", "cottage#FF3A3A,kidsflowers", [ctC(2, "How does the third pig stop the wolf coming down the chimney?", "A big pot of water on the fire at the bottom", "Yes! The wolf shoots back up and runs away for good.", "He locks the chimney", "He calls the police")], [2, 3]],
["The Bears' Cottage", "Three bears go for a walk while their porridge cools. A girl called Goldilocks finds their door open and walks in.", "cottage#8A5A3A,bowls", [1], [4, 5]],
["Just Right", "She sits in the chairs and lies on the beds, and falls asleep in the one that's just right. Then the bears come home.", "cottage#B86A3A,garden#FF8AC8", [ctC(5, "Whose bed is 'just right' for Goldilocks?", "Baby Bear's", "Yes. She wakes up, sees three bears, and jumps out of the window and runs!", "Father Bear's", "Mother Bear's")], [4, 5]]
] };
CT_W.lilliput = { th: "kids", intro: "Gulliver's first voyage, 1699: a shipwreck, a long swim, and an island of people no taller than your hand.", ch: [
["The Shipwreck", "Gulliver's ship is wrecked in a storm. He swims ashore and falls fast asleep on the soft grass.", "wreck,dock", [ctC(2, "What is Gulliver's job on the ship?", "He is the ship's doctor (a surgeon)", "Yes. He loves travel more than anything.", "The captain", "The cook")], [2]],
["Tied Down", "He wakes up tied to the ground with hundreds of tiny ropes, and little people are climbing all over him.", "gulliver,kidsflowers", [0], [2, 1]],
["The Emperor's City", "The Emperor of Lilliput comes to see the Man-Mountain. The city is tiny, and its palace no taller than Gulliver's knee.", "tinytown,castle@0.35#FF5AA8", [ctC(0, "How tall are the Lilliputians?", "Less than six inches (15 cm)", "Yes, about the size of your hand.", "As tall as a door", "As tall as a horse")], [0]],
["Big-Endians and Little-Endians", "Lilliput is at war with the island of Blefuscu, all about which end of a boiled egg you should crack.", "throne,kidsflowers", [1], [0]],
["The Fleet of Blefuscu", "Gulliver wades across the channel and pulls the whole enemy fleet home on strings.", "dock,ship@0.3*3", [ctR(2, "Wade across the sea channel and pull every ship of the fleet home: through every ring!", 6, 100, "Fifty ships, on fifty strings! The Lilliputians cheer the Man-Mountain.")], [2]],
["Home Again", "He builds a boat and sails home to England, with tiny cows and sheep in his pockets to show everyone.", "ship,dock", [ctC(2, "What does Gulliver take home to prove his story?", "Tiny cows and sheep", "Yes, and he grazes them on a bowling green!", "A tiny castle", "A tiny emperor")], [2]]
] };
CT_W.centreearth = { th: "under", intro: "Hamburg, 1863. Professor Lidenbrock finds a scrap of parchment in an old book, written in runes.", ch: [
["The Runic Parchment", "The professor's nephew Axel cracks the secret message of the alchemist Arne Saknussemm.", "manor#8A7A6A,lectern", [0, 1], [0, 1]],
["Snæfellsjökull", "In Iceland they hire a calm, strong guide, Hans, and climb the volcano Snæfellsjökull.", "~volcano,camp", [ctC(0, "Saknussemm wrote that the right crater is touched by the shadow of Scartaris. When?", "Before the first days of July", "Yes, at the end of June. The shadow points the way down.", "At midnight on New Year's Eve", "At every full moon")], [0, 1, 2]],
["Down the Crater", "Down they go, by ropes, into the dark.", "crater,camp", [ctR(2, "Follow Hans down through the crater: every ring of the descent!", 6, 100, "Deeper and deeper. Axel keeps a diary of every metre.")], [2]],
["Water!", "Their water runs out, deep underground.", "spires#5A8AA8,cave", [2], [2, 1]],
["The Lidenbrock Sea", "They come out on the shore of a vast underground sea, under a glowing sky, beside a forest of giant mushrooms. They build a raft.", "mushrooms@1.6,dock", [ctC(0, "What lights the underground sea in the book?", "A strange electric glow in the air, like an aurora", "Yes, bright enough to read by, but cold.", "The Sun through a hole", "Glowing fish")], [0, 1, 2]],
["Saknussemm's Passage", "On a rock they find the letters A.S., carved by Saknussemm himself, but the way on is blocked by rock.", "runestone,cave#4A4048", [ctF(0, "Find five places to set charges and clear the blocked passage.", 5, "lever", 0xE8C83A, "a charge set", "Boom! The rock is gone, and the sea rushes into the hole, carrying the raft with it.")], [0]],
["Up Through Stromboli", "Their raft is carried up a volcanic shaft and they are thrown out on the side of a volcano... in Italy, on the island of Stromboli.", "~volcano,ruins", [3], [1, 0]]
] };
CT_W.beowulf = { th: "moor", intro: "The Old English poem, written down over a thousand years ago: a monster, a hall and a hero from over the sea.", ch: [
["Heorot", "King Hrothgar of the Danes builds the greatest mead-hall in the world, Heorot. Each night the monster Grendel comes and carries off his warriors.", "hall@1.2,banner*2", [ctC(1, "What is Heorot?", "King Hrothgar's great mead-hall", "Yes. For twelve years Grendel has haunted it.", "A ship", "A mountain")], [1, 2]],
["The Geats Arrive", "Beowulf, a young warrior of the Geats with the strength of thirty men, sails across the sea with fourteen companions.", "dock,ship", [ctS(0, "Hrothgar helped my father once. I have come to repay him. I will fight this Grendel, and I will fight him without sword or shield.")], [0]],
["Unferth's Challenge", "At the feast, Unferth mocks Beowulf.", "feasttable,hall", [0], [3, 0]],
["Grendel", "That night, Grendel comes.", "hall#5A4A3A,campfire", [1], [0, 1]],
["The Mere", "Grendel's mother comes for revenge. Beowulf follows her to her lake.", "pool#2A3A2A,cliff", [2], [0]],
["The Gifts", "Queen Wealhtheow gives Beowulf a golden collar, one of the finest treasures ever told of.", "throne,banner*2", [ctC(2, "What does Queen Wealhtheow give Beowulf?", "A great golden collar (neck-ring)", "Yes. The poem says it was the finest neck-ring in the world.", "A horse", "A sword")], [2, 1, 0]],
["The Dragon", "Fifty years later, old King Beowulf fights a fire-breathing dragon with the help of young Wiglaf. He wins, but is wounded, and his people raise a great mound for him by the sea.", "mound,~cliff", [ctC(0, "Who stands by old Beowulf against the dragon when everyone else runs?", "Young Wiglaf", "Yes. Loyalty is the heart of the poem.", "Grendel", "Unferth")], [0]]
] };
CT_W.treasureisland = { th: "isle", intro: "The Admiral Benbow inn, on the coast of England, 1700s, and an old sea-captain with a sea chest.", ch: [
["The Admiral Benbow", "Old Billy Bones stays at Jim Hawkins's inn, watching the road for a one-legged sailor. Then the blind man Pew brings him the black spot.", "cottage#D8D0C0,innsign", [ctC(0, "What was the 'black spot'?", "A pirate summons: a scrap of paper blackened on one side", "Yes. Billy Bones dies of fright, and Jim finds a map in his sea chest.", "A bruise", "A coin")], [0]],
["The Hispaniola", "Squire Trelawney buys a ship, the Hispaniola, and hires a crew, with a cheerful one-legged cook: Long John Silver, and his parrot Captain Flint.", "dock,ship", [ctS(1, "Pieces of eight! Pieces of eight! That's Cap'n Flint, my parrot, matey. Two hundred years old, they say. Welcome aboard.")], [1, 0]],
["The Apple Barrel", "Jim climbs into the apple barrel for an apple and overhears Silver plotting mutiny.", "ship,chest", [ctC(0, "What does Jim learn in the apple barrel?", "That Silver and most of the crew are pirates planning a mutiny", "Yes. He tells the captain at once.", "Where the treasure is", "That the ship is leaking")], [0, 1]],
["The Stockade", "On the island the honest men hold the old log stockade against the pirates.", "wall#6A4A2A,camp", [ctF(0, "Gather five bundles of firewood for the stockade before nightfall.", 5, "orb", 0x8A6A3A, "a bundle", "The fire is lit. Captain Smollett writes the day in his log.")], [0]],
["The Man of the Island", "In the woods Jim meets Ben Gunn, marooned here three years ago.", "cave#8A7A60,palm*2", [ctC(2, "What has Ben Gunn been longing for, all his years on the island?", "Cheese, toasted mostly", "Yes. \"Many's the long night I've dreamed of cheese!\"", "Gold", "A ship")], [2, 0]],
["Flint's Pointer", "Silver's pirates follow Flint's map.", "skeletonpointer,palm*2", [0, 1, 2], [0, 2]],
["The Treasure", "The pit is empty! Ben Gunn found the treasure long ago and hid it in his cave.", "chest,cave", [3], [1, 0, 2]]
] };
CT_W.phantom = { th: "night", intro: "The Paris Opera, 1880s: seventeen storeys, five of them under the ground, and a ghost who keeps Box Five for himself.", ch: [
["Is It the Ghost?", "The ballet girls whisper about the Opera Ghost: a man in evening dress with a face like a skull, who walks the cellars.", "palace#E8DCC0,garden", [ctC(0, "Where is the story set?", "The Paris Opera House", "Yes, a real building, the Palais Garnier.", "A castle in Scotland", "A ship")], [0]],
["Box Five", "The new managers laugh at the Ghost's letters, until things start to go wrong.", "stage,palace#E8DCC0", [0], [1]],
["The Angel of Music", "Christine Daaé sings like never before, taught by a voice behind her dressing-room wall.", "stage,chandelier", [ctC(0, "Who does Christine believe is teaching her to sing?", "The Angel of Music her father promised to send", "Yes. It is really Erik, the Phantom.", "Her mother", "The opera manager")], [0, 2]],
["The Chandelier", "During a performance, the great chandelier comes crashing down.", "chandelier,hall#8A1A2A", [ctR(1, "Get clear of the falling chandelier! Through every ring to the safety of the corridors!", 6, 90, "Safe. Raoul is more determined than ever to protect Christine.")], [1, 0]],
["The Masked Ball", "At the masked ball, a figure comes dressed as the Red Death.", "garden,stage", [ctC(2, "What costume does the Phantom wear to the masked ball?", "The Red Death", "Yes, from a story by Edgar Allan Poe.", "A king", "A clown")], [2, 1]],
["The Lake Under the Opera", "Far below the opera house, Erik lives beside an underground lake.", "pool#1A2A3A,dock", [2], [2]],
["The Choice", "Christine shows Erik kindness, and everything changes.", "hall#4A2A2A,throne", [1], [0, 1, 2]]
] };
CT_W.holmes = { th: "town", intro: "London, the second morning after Christmas, 1889. Dr Watson calls on his friend Sherlock Holmes.", ch: [
["Baker Street at Christmas", "Watson finds Holmes studying a battered old hat, which the commissionaire Peterson found in the street after a scuffle, together with a Christmas goose.", "street,cottage#7A6A5A", [ctC(0, "Where do Holmes and Watson live?", "221B Baker Street, London", "Yes, with their landlady Mrs Hudson.", "10 Downing Street", "Scotland Yard")], [0, 1, 2]],
["The Goose and the Jewel", "Peterson rushes in: his wife found a brilliant blue jewel in the goose's crop. It is the Countess of Morcar's blue carbuncle, stolen from her hotel room.", "street#6A5A4A", [ctS(3, "Look, Mr Holmes! Look what my wife found in the bird's crop! It sparkles like an electric point in the dark!")], [3, 0]],
["The Clues", "Holmes reads the hat like a book.", "clueTable,armchairs", [0], [0, 1]],
["Covent Garden Market", "The goose came from Covent Garden, so off they go to the salesman Breckinridge, who won't talk, until Holmes makes a bet.", "marketstall*3,street#7A6A5A", [ctC(0, "How does Holmes get the stubborn goose-seller to talk?", "He bets him that the goose was country-bred", "Yes. A betting man will tell you anything to win.", "He arrests him", "He pays him")], [0, 1]],
["The Thief", "A nervous man is asking about the goose too.", "manor#8A7A6A,armchairs", [1, 2], [4, 0, 1]]
] };
CT_W.grimm = { th: "forest", intro: "Two old tales: Hansel and Gretel (Brothers Grimm, 1812) and The Emperor's New Clothes (Andersen, 1837).", ch: [
["The Woodcutter's Cottage", "A poor woodcutter's family has no bread. Hansel creeps out by moonlight and fills his pockets with shining white pebbles.", "cottage#8A6A4A,camp", [ctC(0, "What does Hansel collect to find the way home?", "Shining white pebbles", "Yes. The next time, he only has breadcrumbs, and the birds eat them.", "Pine cones", "Flowers")], [0, 1]],
["The Pebbles", "Taken deep into the forest, the children wait for the moon to rise.", "camp,bigtree", [0], [0, 1]],
["The Gingerbread House", "Lost, they find a house made of bread, with a roof of cake and windows of sugar. A witch lives there.", "gingerhut", [ctC(1, "How do Hansel and Gretel get away from the witch?", "Clever Gretel tricks her and locks her away, and frees Hansel", "Yes. Then they fill their pockets with the witch's pearls and jewels.", "They fly away", "A woodsman saves them")], [0, 1]],
["Home with the Treasure", "A white duck carries them one at a time across the great water, and at last they see their father's house.", "pool,cottage#8A6A4A", [ctR(0, "Follow the white duck across the water, through every ring, home!", 6, 100, "Their father has missed them every day. With the jewels, they never go hungry again.")], [0, 1]],
["The Swindlers", "Two swindlers tell an emperor they weave cloth so fine that anyone foolish or unfit for their job cannot see it.", "palace#E8D8F0", [ctC(3, "Why does nobody admit they can't see the cloth?", "Nobody wants to seem foolish or unfit for their job", "Yes. So everyone pretends.", "It's too dark", "They're asleep")], [3, 2]],
["The Procession", "The emperor walks through the town in his new clothes.", "throne,village", [1], [2]]
] };
CT_W.fogg = { th: "meadow", intro: "London, 2 October 1872. Phileas Fogg, the most punctual man alive, makes a bet at the Reform Club.", ch: [
["The Reform Club Wager", "Fogg bets he can go round the world in eighty days, and leaves that very evening with his new servant, Passepartout.", "street#7A6A5A", [ctC(0, "How much does Fogg bet?", "Twenty thousand pounds", "Yes, half his fortune. The other half is for the journey.", "Ten shillings", "A thousand pounds")], [0, 1]],
["Suez", "At Suez, Detective Fix decides Fogg is a bank robber and follows him.", "dock,ship", [ctC(1, "Why does Detective Fix follow Fogg?", "He thinks Fogg is the robber of the Bank of England", "Yes, and he follows him halfway round the world.", "He wants to join him", "He's a fan")], [1]],
["The Elephant", "In India the railway isn't finished. Fogg buys an elephant.", "bigtree,tents", [ctR(0, "The railway ends! Ride the elephant through the forest, through every ring, to the next station!", 7, 110, "On time! Fogg gives the elephant to the guide as a thank-you.")], [0, 1]],
["Aouda", "They rescue a young widow, Aouda, and she travels on with them.", "temple#D8B888,garden", [ctS(2, "Mr Fogg says very little, but he risked everything for me. I will travel with him to the end of the world.")], [2, 0]],
["Hong Kong to Yokohama", "Fix gets Passepartout drunk in Hong Kong, and he sails without Fogg, ending up in a circus in Yokohama.", "pagoda,dock", [0], [1]],
["Across America", "Across the United States by train, through the snow, until the train is attacked and Passepartout is captured.", "village#8A6A4A,tents", [ctC(0, "What does Fogg do when Passepartout is captured?", "Goes after him himself, risking the bet", "Yes. He may be punctual, but he isn't heartless.", "Leaves without him", "Sends a telegram")], [0, 1]],
["The Atlantic", "The steamer runs out of coal.", "ship,dock", [ctC(0, "To keep the steamer going, what does Fogg burn?", "The ship's own wooden parts (he buys the ship first)", "Yes. The ship arrives at Liverpool a bare hull.", "His clothes", "Banknotes")], [0]],
["The Eightieth Day", "In London Fogg thinks he has lost, by five minutes.", "street#8A7A6A,village", [1, 2], [0, 1, 2]]
] };
CT_W.lostworld = { th: "jungle", intro: "London, 1912. A young reporter is sent to interview the most bad-tempered scientist in England.", ch: [
["The Challenge", "Malone wants to do something brave to impress Gladys. Professor Challenger throws him out of his house, then tells him the truth: dinosaurs still live in South America.", "manor,garden", [ctC(3, "Why does Malone want an adventure?", "To impress Gladys, who wants a hero", "Yes. When he gets home, she's married someone else!", "To get rich", "To escape the police")], [3, 0]],
["The Expedition", "Malone, Lord John Roxton, Professor Summerlee and Challenger travel up the Amazon.", "dock,camp", [ctS(2, "Up the river we go, then through the bamboo, then the plateau itself, a thousand feet of cliff with a lost world on top.")], [0, 1, 2, 3]],
["The Plateau", "They cross a chasm on a fallen tree. Then the tree falls, and they are trapped on top.", "cliff,bigtree", [ctR(2, "Across the plateau, every ring, before the light goes!", 6, 100, "Camp is made. Strange calls echo across the plateau all night.")], [2, 3]],
["The Creatures", "Iguanodons graze like cattle, pterodactyls nest in a swamp.", "iguanodon*2,pool", [0], [3]],
["Iguanodon", "Summerlee finally believes.", "iguanodon,tents", [1], [1]],
["The Way Down", "After many dangers, a friendly young chief shows them a hidden tunnel down the cliffs.", "cave,camp", [ctC(2, "How do the explorers finally get down from the plateau?", "A friendly young chief shows them a hidden tunnel", "Yes, as thanks for their help.", "They fly a balloon", "They build a ladder")], [2, 3]],
["London", "At a crowded lecture nobody believes them, until Challenger opens a box.", "hall#8A7A6A,street", [2], [0, 1]]
] };
CT_W.tarzan = { th: "jungle", intro: "1888. A young English lord and his wife are marooned by mutineers on the coast of West Africa.", ch: [
["Out to Sea", "John Clayton, Lord Greystoke, and his wife Alice sail for Africa. The crew of the Fuwalda mutiny and put them ashore on a wild coast.", "wreck,dock", [ctC(null, "Why are John and Alice Clayton left on the African coast?", "Mutineers put them ashore, because Clayton had been kind to one of them", "Yes. The sailor Black Michael spared them, and left them with their boxes.", "A storm wrecked them", "They wanted to explore")], []],
["The Cabin", "They build a strong log cabin. Their son is born. A year later both parents are gone, and the she-ape Kala, who has lost her own baby, takes him.", "cottage#7A5A3A,camp", [0], [1]],
["Kala's Son", "The boy grows up with Kala's tribe, slower and weaker than the young apes, but cleverer.", "bigtree,cliff#4A6A3A", [ctC(1, "What does 'Tarzan' mean in the apes' language?", "White-Skin", "Yes. Kala called him that because he had no fur.", "Strong-Arm", "Little-Monkey")], [1, 2]],
["The Picture Books", "At ten he finds the cabin, and his father's books.", "cottage#6A4A2A,camp", [1, 2], [0]],
["Kerchak", "Grown strong, Tarzan defends himself against the great king ape Kerchak, wins, and becomes king of the tribe.", "cliff#4A6A3A,bigtree", [ctC(0, "What helps Tarzan win against apes who are far stronger than him?", "His father's knife, and his quick mind", "Yes. He learned to use the knife from the cabin, and a grass rope he wove.", "A gun", "Magic")], [2, 0]],
["Jane Porter", "A party of Americans is marooned in the same spot: Professor Porter, his daughter Jane, and others.", "tents,dock", [3], [3, 0]],
["D'Arnot", "Tarzan rescues a French naval officer, Paul D'Arnot, nurses him back to health, and goes with him out into the world.", "camp,village", [4], [4, 0]]
] };
CT_W.cavor = { th: "moon", intro: "Kent, England, 1900. A failed businessman meets an odd little scientist who has invented a stuff that blocks gravity.", ch: [
["Mr Cavor", "Bedford, writing a play in a bungalow at Lympne, meets Mr Cavor, who has invented Cavorite.", "cottage#B8A888,dome", [ctC(1, "What does Cavorite do?", "It blocks gravity, so anything above it weighs nothing", "Yes. Cavor builds a sphere with Cavorite blinds to steer by.", "It makes things invisible", "It makes fire")], [0, 1]],
["The Sphere", "They step into the glass sphere, close the blinds, and fall up towards the Moon.", "cavorsphere,crater", [0], [0, 1]],
["Sunrise on the Moon", "At sunrise the frozen air melts and strange plants burst out of the ground and grow before their eyes.", "crater,spires#7AC8A0", [1], [1]],
["The Selenites", "They are captured by the Selenites, insect-like Moon people who live in caves beneath the surface.", "cave#6A6A70,spires#7AC8E8", [2], [2, 0]],
["The Grand Lunar", "Cavor is taken to the Grand Lunar, ruler of the Moon, a being of enormous brain.", "throne,spires#9A7AE8", [ctC(0, "What does the Grand Lunar learn from Cavor that worries him?", "That humans fight wars", "Yes. Cavor's radio messages stop soon after.", "That humans eat cheese", "That Earth is flat")], [0, 2]],
["Bedford Alone", "Bedford escapes alone in the sphere and lands in the sea off England. Cavor stays on the Moon for ever.", "crater,cavorsphere@0.8", [ctR(1, "Back to the sphere before the long lunar night freezes everything! Through every ring!", 6, 100, "The sphere lifts off. Months later, faint radio messages from Cavor reach Earth... then stop.")], [1]]
] };
CT_W.lowell = { th: "mars", intro: "From 1877 to 1965, people argued about lines on Mars. This is the true story.", ch: [
["Canali", "In 1877 the Italian astronomer Schiaparelli maps lines on Mars and calls them 'canali': channels.", "dome,obshut", [0], [1]],
["Flagstaff", "In 1894 the rich Bostonian Percival Lowell builds an observatory in Arizona, to study Mars.", "obshut,telescope", [ctC(0, "Where did Lowell build his observatory?", "Flagstaff, Arizona", "Yes, high and dry, for clear skies. It's still working.", "London", "Paris")], [0]],
["The Canals", "Lowell draws hundreds of canals, and says Martians built them to bring water from the poles.", "crater,ruins#A85A34", [1], [0]],
["The Truth", "In 1965 the spacecraft Mariner 4 sends back the first close-up photographs of Mars.", "crater#8A4A2A,dome", [ctC(1, "Which spacecraft first sent back close-up photos of Mars, showing no canals?", "Mariner 4, in 1965", "Yes. Craters, no canals, no cities.", "Apollo 11", "Voyager 1"), 2], [0, 1]]
] };
CT_W.jason = { th: "isle", intro: "Ancient Greece. A boy raised by a centaur comes down the mountain with one sandal, and a king remembers a prophecy.", ch: [
["The Centaur's Cave", "On Mount Pelion the wise centaur Chiron raises the young prince Jason in secret, teaching him to ride, to heal, to hunt and to listen.", "cave#A89A80,bigtree", [ctC(2, "Why was Jason raised in secret by a centaur?", "His uncle Pelias had stolen the throne and would have harmed him", "Yes. Chiron raised him safe on Mount Pelion until he was grown.", "He was lost in the woods", "He wanted to be a horse")], [2, 0]],
["The One Sandal", "Crossing a flooded river Jason carries an old woman on his back, who is the goddess Hera in disguise, and loses a sandal. King Pelias was warned to beware a man with one sandal.", "palace#E8E0D0,pool", [0], [0]],
["Building the Argo", "Argus builds the fastest ship of her age, and heroes come from all Greece to row her: Hercules, Orpheus, Castor and Polydeuces.", "dock,ship", [1], [3, 0]],
["The Harpies", "Blind King Phineus starves because the Harpies, screeching bird-women, snatch his every meal. The winged sons of the North Wind chase them away, and Phineus tells the heroes the way.", "cliff#C8C0B0,hut", [ctF(0, "The Harpies have scattered Phineus's dinner across the cliff top. Gather the five fallen loaves for the poor old king.", 5, "star", 0xF2D890, "a loaf", "Phineus eats in peace for the first time in years, and tells you how to pass the Clashing Rocks: send a dove through first.")], [0]],
["The Clashing Rocks", "Two great rocks smash together at the mouth of the sea. The heroes let a dove fly through first, then row with all their strength as the rocks open.", "cliff*2,pool#3A88C8", [ctR(0, "The dove is through! Row hard: run through every ring before the rocks crash together again!", 6, 100, "The Argo shoots through, losing only the tip of her stern. The rocks stand still for ever after.")], [0]],
["King Aeetes' Trial", "In Colchis King Aeetes sets Jason a task: yoke two fire-breathing bronze bulls, plough a field and sow it with dragon's teeth. Medea gives him a charm against the fire.", "palace#C8A060,camp", [ctC(1, "When the dragon's teeth sprang up as warriors, what did Jason do?", "Threw a stone among them, so they fought each other", "Yes, as Medea told him. The warriors turned on each other.", "Ran away", "Asked them to go home")], [4, 1, 0]],
["The Golden Fleece", "In a grove at the end of the world the Fleece hangs on an oak, and a dragon that never sleeps coils round it.", "bigtree@1.4,cave", [2], [1, 0]],
["Home to Iolcus", "The Argo races home with the Fleece, past sirens and storms, while Orpheus plays louder than the Sirens sing.", "ship,palace", [ctC(0, "How did the Argonauts get safely past the Sirens?", "Orpheus played his lyre louder than they could sing", "Yes. Only one hero, Butes, leapt overboard, and the goddess Aphrodite saved him.", "They stuffed their ears with cheese", "They sailed at night")], [0, 1]]
] };
var CT_LOOK_KEYS = ["hair", "hairStyle", "top", "topKind", "bottom", "bottomKind", "shoes", "shoeKind", "layer", "layerColor", "back", "backColor", "hat", "hatColor", "face", "neck", "ears", "hands", "waist", "accColor"];
var CT_CLEAR = ["layer", "back", "hat", "face", "neck", "ears", "hands", "waist"];
function ctCostumesOf(id) { return __ZC(354, 96, this, arguments, new.target); }
function ctCosOwned(C) {
if (ctKeeper())
return true;
var mine = (typeof myThings !== "undefined" && myThings) || [];
return mine.some(function (t) { return t && t.archetype === C.key; });
}
function ctCosWorn() { try {
var d = dreamer();
return d.ctCos || null;
}
catch (e) {
return null;
} }
function ctCosWear(C) { return __ZC(354, 97, this, arguments, new.target); }
function ctCosOff() {
var d = dreamer(), L = meLook(), P = d.ctPrev;
if (P)
CT_LOOK_KEYS.forEach(function (k) { L[k] = P[k]; });
d.ctCos = null;
d.ctPrev = null;
rebuildMe();
try {
save();
}
catch (e) { }
ctSay("👗 Back in your own clothes.");
}
function ctCosBuy(C, after) { return __ZC(354, 98, this, arguments, new.target); }
function ctCostumeCard(id, sure) { return __ZC(354, 99, this, arguments, new.target); }
(function () {
if (typeof renderWardrobe !== "function")
return;
var rw = renderWardrobe;
renderWardrobe = function () {
var r = rw.apply(this, arguments);
try {
var w = document.getElementById("me-ward");
if (!w)
return r;
var worn = ctCosWorn(), own = ctCostumesOf(null).filter(ctCosOwned), d = document.createElement("div");
d.style.cssText = "margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,.12)";
var h = "<div style='font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold,#D8B868);margin-bottom:6px'>📖 Storybook costumes</div>";
if (worn) {
var C = ctCostumesOf(null).filter(function (c) { return c.key === worn; })[0];
h += "<div style='font-size:12.5px;margin-bottom:6px'>Wearing: <b>" + ctE(C ? C.name : "a costume") + "</b> <button class='btn' data-ctcos='off'>Take it off</button></div>";
}
h += "<div style='font-size:12.5px;color:var(--dim,#999);margin-bottom:6px'>" + (own.length ? own.length + " of yours." : "None yet.") + " " + ctCostumesOf(null).length + " characters from the classic stories, to wear anywhere.</div>" +
"<button class='btn' data-ctcos='all'>See them all</button>";
d.innerHTML = h;
w.appendChild(d);
Array.prototype.forEach.call(d.querySelectorAll("[data-ctcos]"), function (b) { b.onclick = function () { var v = b.getAttribute("data-ctcos"); if (v === "off") {
ctCosOff();
renderWardrobe();
}
else
ctCostumeCard(null); }; });
}
catch (e) { }
return r;
};
})();
var CTD_BASIC = {};
function ctdBasic(col) { col = ctsCap(col, 0xC0); return CTD_BASIC[col] || (CTD_BASIC[col] = (function () { var m = new THREE.MeshBasicMaterial({ color: col, fog: false, side: THREE.DoubleSide }); m.userData.ldShared = 1; return m; })()); }
function ctdSub(g, x, y, z) { var h = new THREE.Group(); h.position.set(x || 0, y || 0, z || 0); g.add(h); return h; }
var CTD_SET = {
fig: function (g, o) { return __ZC(354, 100, this, arguments, new.target); },
quad: function (g, o) { return __ZC(354, 101, this, arguments, new.target); },
house: function (g, o) { return __ZC(354, 102, this, arguments, new.target); },
city: function (g, o) { return __ZC(354, 103, this, arguments, new.target); },
mountain: function (g, o) { return __ZC(354, 104, this, arguments, new.target); },
tree: function (g, o) { return __ZC(354, 105, this, arguments, new.target); },
boat: function (g, o) { return __ZC(354, 106, this, arguments, new.target); },
card: function (g, o) { return __ZC(354, 107, this, arguments, new.target); },
teapot: function (g, o) { return __ZC(354, 108, this, arguments, new.target); },
teacup: function (g, o) {
var c = o.col || 0xE86AA8;
ctAdd(g, ctCyl(1.5, 1.4, 0.15, 18), c, 0, 0.08, 0);
ctAdd(g, ctCyl(1.1, 0.7, 1.3, 16), c, 0, 0.8, 0);
ctAdd(g, ctCyl(1.0, 1.0, 0.05, 16), 0x6A3A1A, 0, 1.35, 0);
ctAdd(g, ctTor(0.38, 0.08), c, 1.15, 0.85, 0);
return { r: 1.6, s: [{ x: 0, z: 0, r: 1.2, h: 1.4 }] };
},
tophat: function (g, o) {
var c = o.col || 0x2A2A30;
ctAdd(g, ctCyl(1.6, 1.6, 0.15, 20), c, 0, 0.08, 0);
ctAdd(g, ctCyl(1.0, 1.05, 2.8, 18), c, 0, 1.5, 0);
ctAdd(g, ctCyl(1.07, 1.07, 0.4, 18), o.band || 0xB83A3A, 0, 0.5, 0);
ctAdd(g, ctBox(0.7, 0.5, 0.03), 0xE8E2D4, 0, 0.8, 1.06, 0, 0, 0.15);
return { r: 1.7, s: [{ x: 0, z: 0, r: 1.2, h: 3 }] };
},
watch: function (g, o) { return __ZC(354, 109, this, arguments, new.target); },
carpet: function (g, o) { return __ZC(354, 110, this, arguments, new.target); },
oillamp: function (g, o) { return __ZC(354, 111, this, arguments, new.target); },
jars: function (g, o) { var s = [], n = o.n || 8; for (var i = 0; i < n; i++) {
var x = (i % 4) * 2.2 - 3.3, z = Math.floor(i / 4) * 2.2;
var j = ctAdd(g, ctSph(0.9, 12), o.col || 0xA8643A, x, 1.1, z);
j.scale.y = 1.3;
ctAdd(g, ctCyl(0.4, 0.5, 0.4, 10), o.col || 0xA8643A, x, 2.3, z);
ctsRound(s, x, z, 0.9, 2.4);
} return { r: 5, s: s }; },
egg: function (g, o) { var e = ctAdd(g, ctSph(3, 18), o.col || 0xD8D0C0, 0, 3.6, 0); e.scale.y = 1.3; ctAdd(g, ctTor(3, 0.9), 0x8A7A5A, 0, 0.4, 0, Math.PI / 2, 0, 0); return { r: 4, s: [{ x: 0, z: 0, r: 3, h: 7 }] }; },
ziggurat: function (g, o) {
var c = o.col || 0xB8925A, s = [];
for (var i = 0; i < 4; i++) {
var w = 40 - i * 9;
ctAdd(g, ctBox(w, 7, w), i === 3 ? (o.top || 0x3A5A9A) : c, 0, 3.5 + i * 7, 0);
}
ctAdd(g, ctBox(5, 28, 26), c, 0, 7, 22, -0.55, 0, 0);
ctsBox(s, 0, 0, 20.5, 20.5, 28);
return { r: 30, s: s };
},
coach: function (g, o) { return __ZC(354, 112, this, arguments, new.target); },
train: function (g, o) { return __ZC(354, 113, this, arguments, new.target); },
steamer: function (g, o) { return __ZC(354, 114, this, arguments, new.target); },
globe: function (g, o) { return __ZC(354, 115, this, arguments, new.target); },
balloon: function (g, o) { return __ZC(354, 116, this, arguments, new.target); },
shoe: function (g, o) { return __ZC(354, 117, this, arguments, new.target); },
cowmoon: function (g, o) { return __ZC(354, 118, this, arguments, new.target); },
tallclock: function (g, o) { return __ZC(354, 119, this, arguments, new.target); },
well: function (g, o) { return __ZC(354, 120, this, arguments, new.target); },
carousel: function (g, o) { return __ZC(354, 121, this, arguments, new.target); },
dogfish: function (g, o) { return __ZC(354, 122, this, arguments, new.target); },
cointree: function (g, o) { return __ZC(354, 123, this, arguments, new.target); },
braidtower: function (g, o) { return __ZC(354, 124, this, arguments, new.target); },
bremen: function (g, o) { return __ZC(354, 125, this, arguments, new.target); },
briar: function (g, o) { return __ZC(354, 126, this, arguments, new.target); },
sledge: function (g, o) { return __ZC(354, 127, this, arguments, new.target); },
chariot: function (g, o) { return __ZC(354, 128, this, arguments, new.target); },
hammer: function (g, o) { return __ZC(354, 129, this, arguments, new.target); },
shieldhall: function (g, o) { return __ZC(354, 130, this, arguments, new.target); },
runestone: function (g, o) { var m = ctAdd(g, ctBox(1.6, 3.6, 0.6), o.col || 0x7A7A72, 0, 1.8, 0); for (var i = 0; i < 6; i++)
ctAdd(g, ctBox(0.9, 0.08, 0.05), 0xA83A2A, 0, 0.8 + i * 0.45, 0.32, 0, 0, (i % 2 ? 0.3 : -0.3)); return { r: 1.2, s: [{ x: 0, z: 0, r: 0.8, h: 3.6 }] }; },
bifrost: function (g, o) { var cols = [0x9A3A3A, 0xA8743A, 0x9A9A3A, 0x3A8A4A, 0x3A5A9A, 0x6A3A8A]; cols.forEach(function (c, i) { var t = ctAdd(g, new THREE.TorusGeometry(o.R || 220 - i * 4, 2, 6, 48, Math.PI), c, 0, 0, 0, 0, 0, 0, 0, 0.55); }); return { r: 10, s: [] }; },
hand: function (g, o) { return __ZC(354, 131, this, arguments, new.target); },
staff: function (g, o) {
ctAdd(g, ctCyl(0.8, 0.8, o.h || 40, 12), 0x8A2A1A, 0, (o.h || 40) / 2, 0);
[0.6, (o.h || 40) - 1].forEach(function (y) { ctAdd(g, ctCyl(1, 1, 2, 12), 0xD8B048, 0, y, 0); });
ctAdd(g, new THREE.DodecahedronGeometry(3, 0), 0x6A6A60, 0, 0.6, 0).scale.y = 0.5;
return { r: 3, s: [{ x: 0, z: 0, r: 1.2, h: o.h || 40 }] };
},
floatisle: function (g, o) { return __ZC(354, 132, this, arguments, new.target); },
rlyeh: function (g, o) { return __ZC(354, 133, this, arguments, new.target); },
idol: function (g, o) { return __ZC(354, 134, this, arguments, new.target); },
opera: function (g, o) { return __ZC(354, 135, this, arguments, new.target); },
gaslamp: function (g, o) { ctAdd(g, ctCyl(0.08, 0.14, 3.8, 6), 0x1A1A1A, 0, 1.9, 0); ctAdd(g, ctBox(0.5, 0.6, 0.5), 0xF8D890, 0, 4.05, 0, 0, 0, 0, 1); ctAdd(g, ctCone(0.42, 0.3, 4), 0x1A1A1A, 0, 4.5, 0, 0, Math.PI / 4, 0); return { r: 0.4, s: [{ x: 0, z: 0, r: 0.2, h: 4 }] }; },
hansom: function (g, o) { return __ZC(354, 136, this, arguments, new.target); },
pillarbox: function (g, o) { ctAdd(g, ctCyl(0.4, 0.4, 1.4, 14), 0xA82A2A, 0, 0.7, 0); ctAdd(g, ctSph(0.42, 12), 0xA82A2A, 0, 1.45, 0).scale.y = 0.5; ctAdd(g, ctBox(0.4, 0.05, 0.05), 0x1A1A1A, 0, 1.15, 0.4); return { r: 0.6, s: [{ x: 0, z: 0, r: 0.4, h: 1.6 }] }; },
clocktower: function (g, o) { return __ZC(354, 137, this, arguments, new.target); },
bigdome: function (g, o) { return __ZC(354, 138, this, arguments, new.target); },
falls: function (g, o) { return __ZC(354, 139, this, arguments, new.target); },
ironclad: function (g, o) { return __ZC(354, 140, this, arguments, new.target); },
skydisc: function (g, o) { return __ZC(354, 141, this, arguments, new.target); },
stockade: function (g, o) { return __ZC(354, 142, this, arguments, new.target); },
cannon: function (g, o) { return __ZC(354, 143, this, arguments, new.target); },
barrels: function (g, o) { return __ZC(354, 144, this, arguments, new.target); },
iceship: function (g, o) { var r = CTS_SET.ship(g, { col: 0x4A3A2A }); g.rotation.z = -0.1; for (var i = 0; i < 9; i++) {
var a = i * 0.7;
ctAdd(g, ctBox(6 + (i % 3) * 3, 2 + (i % 2) * 2, 5), 0xC8DCE8, Math.sin(a) * 10, 0.6, Math.cos(a) * 16, 0.2 * (i % 2), a, 0.3 * ((i % 3) - 1));
} return { r: r.r + 4, s: r.s }; },
rosebox: function (g, o) { return __ZC(354, 145, this, arguments, new.target); },
archbridge: function (g, o) { return __ZC(354, 146, this, arguments, new.target); },
plateau: function (g, o) { return __ZC(354, 147, this, arguments, new.target); },
pinnacle: function (g, o) {
var h = o.h || 50;
ctAdd(g, ctCyl(4, 7, h, 9), 0x7A5A44, 0, h / 2, 0);
ctAdd(g, new THREE.IcosahedronGeometry(4, 0), 0x2E6A26, 0, h + 2, 0);
if (o.log)
ctAdd(g, ctCyl(0.8, 1, 30, 8), 0x5A4028, -14, h + 1, 0, 0, 0, Math.PI / 2 + 0.1);
return { r: 8, s: [{ x: 0, z: 0, r: 6, h: h }] };
},
nest: function (g, o) { ctAdd(g, ctTor(2, 0.7), 0x6A5030, 0, 0.6, 0, Math.PI / 2, 0, 0); [[0, 0], [0.8, 0.5], [-0.7, 0.6]].forEach(function (p) { ctAdd(g, ctSph(0.55, 10), 0xC8C0A0, p[0], 0.8, p[1]).scale.y = 1.3; }); return { r: 2.6, s: [{ x: 0, z: 0, r: 2, h: 1.2 }] }; },
drum: function (g, o) {
ctAdd(g, ctCyl(3, 3.4, 1.6, 20), 0x8A6A44, 0, 0.8, 0);
ctAdd(g, ctCyl(3, 3, 0.08, 20), 0x6A4A2E, 0, 1.62, 0);
for (var i = 0; i < 16; i++) {
var a = i * 0.39;
ctAdd(g, new THREE.DodecahedronGeometry(0.8, 0), 0x6A6058, Math.sin(a) * 9, 0.4, Math.cos(a) * 9);
}
return { r: 10, s: [{ x: 0, z: 0, r: 3.2, h: 1.6 }] };
},
cabin: function (g, o) { return __ZC(354, 148, this, arguments, new.target); },
mooncalf: function (g, o) { return __ZC(354, 149, this, arguments, new.target); },
shaftcap: function (g, o) { ctAdd(g, ctCyl(6, 6.4, 0.8, 24), 0x6A6A70, 0, 0.4, 0); ctAdd(g, ctCyl(1, 1, 0.4, 10), 0x4A4A50, 0, 1, 0); for (var i = 0; i < 8; i++) {
var a = i * 0.785;
ctAdd(g, ctBox(0.3, 0.2, 5), 0x5A5A60, Math.sin(a) * 3, 0.85, Math.cos(a) * 3, 0, a, 0);
} return { r: 7, s: [] }; },
hadesgate: function (g, o) { return __ZC(354, 150, this, arguments, new.target); },
stonemen: function (g, o) { return __ZC(354, 151, this, arguments, new.target); },
atlas: function (g, o) { return __ZC(354, 152, this, arguments, new.target); },
chainedrock: function (g, o) { ctAdd(g, new THREE.DodecahedronGeometry(5, 0), 0x6A6058, 0, 3, 0).scale.y = 1.5; [-1, 1].forEach(function (sd) { for (var i = 0; i < 6; i++)
ctAdd(g, ctTor(0.25, 0.06), 0x5A5A5A, sd * (1 + i * 0.35), 6 - i * 0.1, 3.6, 0, i % 2 ? Math.PI / 2 : 0, 0); }); return { r: 6, s: [{ x: 0, z: 0, r: 4.6, h: 8 }] }; },
seamonster: function (g, o) { return __ZC(354, 153, this, arguments, new.target); },
clam: function (g, o) { return __ZC(354, 154, this, arguments, new.target); },
seapalace: function (g, o) { return __ZC(354, 155, this, arguments, new.target); },
hull: function (g, o) { var y = o.y || 45; var h = ctAdd(g, ctBox(8, 4, 30), 0x3A2A20, 0, y, 0); ctAdd(g, ctCone(4, 9, 4), 0x3A2A20, 0, y, 19, Math.PI / 2, 0, Math.PI / 4).scale.set(1, 1, 0.6); ctAdd(g, ctBox(0.4, 6, 0.4), 0x2A1A10, 0, y - 5, -6); return { r: 2, s: [], sky: 1 }; },
squid: function (g, o) { return __ZC(354, 156, this, arguments, new.target); },
diver: function (g, o) { CTD_SET.fig(g, { h: 1.9, col: 0x8A7A5A, arms: "down" }); ctAdd(g, ctSph(0.32, 12), 0xB8863A, 0, 1.72, 0); ctAdd(g, ctCyl(0.12, 0.12, 0.04, 10), 0x3A8AA8, 0, 1.74, 0.3, Math.PI / 2, 0, 0, 1); ctAdd(g, ctBox(0.4, 0.5, 0.2), 0x5A5A5A, 0, 1.25, -0.22); return { r: 0.6, s: [{ x: 0, z: 0, r: 0.35, h: 2 }] }; },
invisible: function (g, o) { return __ZC(354, 157, this, arguments, new.target); },
swordstone: function (g, o) { return __ZC(354, 158, this, arguments, new.target); },
roundtable: function (g, o) {
ctAdd(g, ctCyl(6, 6, 0.3, 32), 0x6A4A2A, 0, 1, 0);
ctAdd(g, ctCyl(1.5, 2, 1, 16), 0x5A3A20, 0, 0.5, 0);
for (var i = 0; i < 13; i++) {
var a = i / 13 * 6.283;
ctChair(g, Math.sin(a) * 6.8, Math.cos(a) * 6.8, a + Math.PI, i === 0 ? 0xC8A040 : 0x6A3A2A);
}
return { r: 8, s: [{ x: 0, z: 0, r: 6, h: 1.2 }] };
},
lakesword: function (g, o) { ctAdd(g, ctCyl(16, 16, 0.2, 28), 0x3A6A8A, 0, 0.08, 0); ctAdd(g, ctCyl(0.22, 0.32, 2.8, 8), 0xC8B8A8, 0, 1.4, 0, 0, 0, 0.1); ctAdd(g, ctBox(0.16, 3.6, 0.05), 0xA8A8B0, -0.2, 4.6, 0, 0, 0, 0.1); ctAdd(g, ctBox(1.1, 0.14, 0.14), 0xC8A040, -0.1, 2.9, 0); return { r: 16, s: [] }; },
pavilion: function (g, o) { return __ZC(354, 159, this, arguments, new.target); },
banner: function (g, o) { ctAdd(g, ctCyl(0.08, 0.1, 6, 6), 0x5A3A20, 0, 3, 0); ctAdd(g, ctBox(1.4, 2.4, 0.05), o.col || 0xB83A3A, 0.75, 4.6, 0); ctAdd(g, ctSph(0.15, 8), 0xC8A040, 0, 6.1, 0); return { r: 1, s: [{ x: 0, z: 0, r: 0.2, h: 6 }] }; },
cragcastle: function (g, o) {
var h = o.h || 70, c = o.col || 0x3A3434;
ctAdd(g, ctCone(40, h, 8), o.rock || 0x4A443E, 0, h / 2, 0);
var t = new THREE.Group();
t.position.y = h * 0.82;
t.scale.setScalar(o.s || 1.2);
g.add(t);
CTS_SET.castle(t, { col: c, roof: o.roof || 0x2A2A30, flag: o.flag || 0x5A1A1A });
return { r: 42, s: [{ x: 0, z: 0, r: 36, h: h }] };
},
cross: function (g, o) { ctAdd(g, ctBox(0.25, 3, 0.25), o.col || 0x5A4A3A, 0, 1.5, 0); ctAdd(g, ctBox(1.4, 0.22, 0.22), o.col || 0x5A4A3A, 0, 2.3, 0); ctAdd(g, ctBox(0.8, 0.1, 0.4), o.col || 0x5A4A3A, 0, 2.9, 0.05); return { r: 0.6, s: [{ x: 0, z: 0, r: 0.2, h: 3 }] }; },
jackal: function (g, o) { ctAdd(g, ctBox(1.4, 1.4, 2.8), 0xB8A070, 0, 0.7, 0); CTD_SET.quad(ctdSub(g, 0, 1.4, 0), { L: 1.6, H: 0.5, col: 0x2A2A2A, neck: 1.2, ears: 1, snout: 2 }); return { r: 1.8, s: [{ x: 0, z: 0, hw: 0.8, hd: 1.5, h: 2.6, rot: 0 }] }; },
colossus: function (g, o) { return __ZC(354, 160, this, arguments, new.target); },
torii: function (g, o) { return __ZC(354, 161, this, arguments, new.target); },
lanterns: function (g, o) { return __ZC(354, 162, this, arguments, new.target); },
fuji: function (g, o) { var r = CTD_SET.mountain(g, { r: o.r || 260, h: o.h || 200, col: 0x5A6A8A, n: 24 }); ctAdd(g, ctCyl(o.r * 0.08 || 20, o.r * 0.08 || 20, 1, 16), 0x3A3A4A, 0, (o.h || 200) - 0.2, 0); return r; },
burnt: function (g, o) { ctAdd(g, ctBox(8, 3, 6), 0x3A302A, 0, 1.5, 0); ctAdd(g, ctBox(0.4, 6, 6), 0x2A2420, -4, 3, 0); ctAdd(g, ctBox(8, 5, 0.4), 0x2A2420, 0, 2.5, -3); ctAdd(g, ctBox(1, 4, 1), 0x3A2A2A, 2, 5, -2); return { r: 6, s: [{ x: 0, z: 0, hw: 4.2, hd: 3.2, h: 5, rot: 0 }] }; },
observatory: function (g, o) { return __ZC(354, 163, this, arguments, new.target); },
morlockwell: function (g, o) { return __ZC(354, 164, this, arguments, new.target); },
porcelain: function (g, o) { return __ZC(354, 165, this, arguments, new.target); },
haystack: function (g, o) { ctAdd(g, ctCyl(2.4, 2.8, 3, 12), 0xC8A858, 0, 1.5, 0); ctAdd(g, ctCone(2.6, 2.6, 12), 0xB89848, 0, 4.3, 0); return { r: 3, s: [{ x: 0, z: 0, r: 2.6, h: 4 }] }; },
potfire: function (g, o) { CTS_SET.camp(g, {}); ctAdd(g, ctSph(1, 12), 0x2A2A2A, 0, 1.4, 0).scale.y = 0.8; [-1.3, 1.3].forEach(function (x) { ctAdd(g, ctBox(0.12, 2.6, 0.12), 0x4A3424, x, 1.3, 0); }); ctAdd(g, ctBox(2.8, 0.12, 0.12), 0x4A3424, 0, 2.6, 0); return { r: 2, s: [{ x: 0, z: 0, r: 1.2, h: 2 }] }; },
churn: function (g, o) { var c = ctAdd(g, ctCyl(1, 0.8, 2.4, 14), 0x8A6A3A, 0, 1, 0, 0, 0, Math.PI / 2 - 0.3); ctAdd(g, ctTor(0.95, 0.06), 0x3A3A3A, 0.4, 1.2, 0, 0, Math.PI / 2, 0); return { r: 2, s: [{ x: 0, z: 0, r: 1.2, h: 2 }] }; },
tinyfleet: function (g, o) { return __ZC(354, 166, this, arguments, new.target); },
tinypalace: function (g, o) { return __ZC(354, 167, this, arguments, new.target); },
bigfungus: function (g, o) { return __ZC(354, 168, this, arguments, new.target); },
bones: function (g, o) { return __ZC(354, 169, this, arguments, new.target); },
treasure: function (g, o) { return __ZC(354, 170, this, arguments, new.target); },
skullrock: function (g, o) {
var c = 0x8A8070;
var b = ctAdd(g, ctSph(10, 14), c, 0, 9, 0);
b.scale.set(1.1, 1, 0.9);
[-1, 1].forEach(function (sd) { ctAdd(g, ctSph(2.6, 10), 0x1A1A18, sd * 4, 10, 8); });
ctAdd(g, ctCone(1.4, 3, 3), 0x1A1A18, 0, 6, 8.6, Math.PI, 0, 0);
ctAdd(g, ctBox(10, 4, 8), c, 0, 2, 4);
return { r: 11, s: [{ x: 0, z: 0, r: 10, h: 18 }] };
},
farmhouse: function (g, o) { var r = CTD_SET.house(g, { w: 7, d: 6, h: 3.6, col: 0x8A8A84, roof: 0x6A6A64, rk: "gable" }); g.rotation.z = 0.06; [-0.5, 0.5].forEach(function (x) { ctAdd(g, ctBox(0.3, 0.25, 0.6), 0xB8B8C0, x, 0.12, 3.6); }); return r; },
harehouse: function (g, o) { var r = CTD_SET.house(g, { w: 8, d: 7, h: 4, col: 0xC8A878, roof: 0x8A6A4A, rk: "gable" }); [-1.5, 1.5].forEach(function (x) { var e = ctAdd(g, ctSph(0.8, 10), 0x8A6A4A, x, 9.3, 0); e.scale.set(0.6, 2.6, 0.4); ctAdd(g, ctSph(0.5, 8), 0xC89A9A, x, 9.4, 0.2).scale.set(0.5, 2, 0.2); }); return r; },
paifang: function (g, o) { return __ZC(354, 171, this, arguments, new.target); },
stones: function (g, o) { var s = [], n = o.n || 11, R = o.R || 9; for (var i = 0; i < n; i++) {
var a = i / n * 6.283, h = 3 + (i % 3);
ctAdd(g, ctBox(1.4, h, 0.9), o.col || 0x7A7A72, Math.sin(a) * R, h / 2, Math.cos(a) * R, 0, a, (i % 2 ? 0.05 : -0.05));
ctsRound(s, Math.sin(a) * R, Math.cos(a) * R, 0.8, h);
} return { r: R + 2, s: s }; },
biglyre: function (g, o) { return __ZC(354, 172, this, arguments, new.target); },
shell: function (g, o) { ctAdd(g, ctCyl(1.6, 1.6, 3, 18), 0x8A8A92, 0, 1.5, 0); ctAdd(g, ctCone(1.6, 2.6, 18), 0x8A8A92, 0, 4.3, 0); for (var i = 0; i < 4; i++)
ctAdd(g, ctCyl(0.25, 0.25, 0.06, 10), 0x3A8AA8, Math.sin(i * 1.57) * 1.6, 2, Math.cos(i * 1.57) * 1.6, Math.PI / 2, i * 1.57, 0, 1); return { r: 2, s: [{ x: 0, z: 0, r: 1.6, h: 5 }] }; },
stands: function (g, o) { return __ZC(354, 173, this, arguments, new.target); },
empty: function (g, o) { return { r: 1, s: [] }; }
};
function ctdKinds(th) { return __ZC(354, 174, this, arguments, new.target); }
function ctdPut(G, n, x, z, rot, s, o) { return __ZC(354, 175, this, arguments, new.target); }
function ctdMerge(G) { return __ZC(354, 176, this, arguments, new.target); }
Object.assign(CTD_SET, {
grin: function (g, o) { return __ZC(354, 177, this, arguments, new.target); },
cornfield: function (g, o) { return __ZC(354, 178, this, arguments, new.target); },
blindwall: function (g, o) { return __ZC(354, 179, this, arguments, new.target); },
ravenpost: function (g, o) { return __ZC(354, 180, this, arguments, new.target); },
engine: function (g, o) { return __ZC(354, 181, this, arguments, new.target); },
earthboxes: function (g, o) { var s = []; for (var i = 0; i < (o.n || 9); i++) {
var x = (i % 3) * 1.6 - 1.6, z = Math.floor(i / 3) * 2.6 - 2.6, y = i > 5 ? 0.75 : 0;
ctAdd(g, ctBox(1.2, 0.7, 2.2), 0x4A3424, x, 0.35 + (i % 4 === 1 ? 0.7 : 0), z, 0, (i % 2) * 0.08, 0);
ctAdd(g, ctBox(1.0, 0.06, 2.0), 0x2A1E16, x, 0.72 + (i % 4 === 1 ? 0.7 : 0), z);
ctsRound(s, x, z, 1, 1.4);
} return { r: 4.5, s: s }; },
knight: function (g, o) { return __ZC(354, 182, this, arguments, new.target); },
sleipnir: function (g, o) { var r = CTD_SET.quad(g, { L: 3.2, H: 1.9, col: 0x8A8A90, neck: 0.7, mane: 0x3A3A40, snout: 1.7 }); [[-1, 0.12], [1, 0.12], [-1, -0.12], [1, -0.12]].forEach(function (q) { ctAdd(g, ctCyl(0.15, 0.12, 1.9, 8), 0x8A8A90, q[0] * 0.4, 0.95, q[1] * 3.2); }); return r; },
wolf: function (g, o) { return CTD_SET.quad(g, { L: 1.6, H: 0.8, col: o.col || 0x5A5A5A, neck: 1.1, ears: 1, snout: 1.9, head: 0.36, tailUp: 0.3 }); },
elephant: function (g, o) { var r = CTD_SET.quad(g, { L: 5, H: 2, br: 1.7, col: o.col || 0x7A7470, neck: 0.08, head: 1.5, snout: 1.0, trunk: 1, tusks: 1, bigears: 1, lt: 0.5 }); if (o.howdah) {
ctAdd(g, ctBox(1.6, 0.9, 1.8), 0xB83A3A, 0, 4.1, 0);
ctAdd(g, ctCone(1.2, 1, 4), 0xD8B048, 0, 5.05, 0, 0, Math.PI / 4, 0);
} return r; },
mastodon: function (g, o) { return CTD_SET.quad(g, { L: 5, H: 3, br: 1.8, col: 0x5A4030, neck: 0.08, head: 1.6, snout: 1.0, trunk: 1, tusks: 2, ears: 1, lt: 0.55 }); },
camel: function (g, o) { return CTD_SET.quad(g, { L: 2.6, H: 1.9, col: 0xB89060, neck: 1.0, hump: 1, snout: 1.8, head: 0.5, tail: false }); },
stego: function (g, o) { return CTD_SET.quad(g, { L: 7, H: 2.4, br: 1.5, col: 0x5A6A3A, plates: 0x8A5A3A, neck: 0.1, head: 0.7, snout: 1.4, tailL: 0.6, tailUp: 0.2 }); },
pegasus: function (g, o) { return CTD_SET.quad(g, { L: 2.6, H: 1.7, col: 0xC8C4BC, neck: 0.8, mane: 0xB8B4AC, wings: 0xC8C4BC, snout: 1.7 }); },
cerberus: function (g, o) { return CTD_SET.quad(g, { L: 3.2, H: 1.8, col: 0x2A2420, heads: 3, neck: 0.6, head: 0.7, ears: 1, snout: 1.6, eyes: 0xC85A2A }); },
deer: function (g, o) { return CTD_SET.quad(g, { L: 1.6, H: 1.1, col: 0x8A5A3A, neck: 0.9, antlers: 0x5A4A3A, snout: 1.6, head: 0.35, tail: false }); },
bull: function (g, o) { return CTD_SET.quad(g, { L: 3, H: 1.6, br: 0.9, col: o.col || 0x4A3424, neck: 0.15, head: 0.8, horns: 0xD8B048, hornL: 1.2, snout: 1.2 }); },
goatpair: function (g, o) { [-0.8, 0.8].forEach(function (x) { CTD_SET.quad(ctdSub(g, x, 0, 0), { L: 1.4, H: 0.9, col: 0x8A8070, neck: 0.5, horns: 0x3A3028, hornL: 1.3, tailUp: -0.6 }); }); return { r: 1.6, s: [{ x: 0, z: 0, r: 1.2, h: 1.6 }] }; },
crookedhouse: function (g, o) { var r = CTD_SET.house(g, { w: 6, d: 6, h: 6, col: o.col || 0xC8A0D8, roof: 0x3AA0D8, rh: 5, chim: 1 }); g.children.forEach(function (m) { m.rotation.z += 0.12; m.position.x += m.position.y * 0.12; }); return r; },
lake: function (g, o) { var R = o.R || 30; var m = ctAdd(g, ctCyl(R, R, 0.2, 40), o.col || 0x2A5A7A, 0, 0.05, 0); m.userData.keep = 1; m.material = new THREE.MeshPhongMaterial({ color: ctsCap(o.col || 0x2A5A7A, 0xA0), shininess: 50, specular: 0x334455, transparent: true, opacity: 0.92 }); m.material.userData.ctd = 1; return { r: R, s: [], lake: R }; }
});
var ctdKindsA = ctdKinds;
ctdKinds = function (th) { return __ZC(354, 183, this, arguments, new.target); };
var CT_DRESS = {};
function ctsTheme(id) { return __ZC(354, 184, this, arguments, new.target); }
function ctdPlaza(G, P) { return __ZC(354, 185, this, arguments, new.target); }
function ctdRibbon(G, pts, w, col, dy, op) { return __ZC(354, 186, this, arguments, new.target); }
function ctdFree(x, z, r) { return __ZC(354, 187, this, arguments, new.target); }
function ctdPlace(G, e, fa, far) { return __ZC(354, 188, this, arguments, new.target); }
function ctdEdge(root, E, K, lite) { return __ZC(354, 189, this, arguments, new.target); }
function ctdDress(root, lite) { return __ZC(354, 190, this, arguments, new.target); }
CT_DRESS.alice = { fog: 0.8, th: { g: [0x5AB040, 0x7ACC50, 0xA8C048] },
plaza: { k: "checker", a: 0xA82A2A, b: 0xB0A890, n: 8 },
hero: [["card", 12, -24, 1.2, { col: 0xB82A2A }], ["card", 12, 24, 1.2, { col: 0x2A2A2A, round: 1 }], ["card", 22, -18, 1.2, { col: 0xB82A2A }], ["card", 22, 18, 1.2, { col: 0x2A2A2A, round: 1 }],
["teatable", 22, -55, 2.4, { r: 9 }], ["harehouse", 40, -62, 1, { r: 7 }], ["tophat", 15, -40, 1.1], ["teapot", 19, 45, 1.3, { dots: 0xD8D0C0 }], ["teacup", 14, 62, 1.6], ["teacup", 17, 72, 1.3, { col: 0x4A8AD8 }],
["watch", 44, 40, 1.5, { r: 5 }], ["rabbithole", 11, -75, 2.6], ["mushrooms", 45, 80, 1.8, { r: 12 }], ["bigtree", 48, -95, 1.4, { r: 9 }], ["grin", 48, -95, 1.6, { over: 1, y: 16 }], ["garden", 60, 110, 1.2, { col: 0xC82A3A, r: 12 }], ["croquet", 26, 100, 3]],
sky: [["castle", 520, 18, 1.8, { col: 0xC88A9A, roof: 0xB82A3A, flag: 0xB82A3A, r: 28 }], ["mushrooms", 380, -30, 5, { r: 12 }]],
sc: { toadstool: 260, rosebush: 200, teacup: 60, cardlet: 80 },
edge: { k: "cardman", sp: 16, off: 4.4 } };
CT_DRESS.oz = { fog: 0.7,
plaza: { k: "bricks", a: 0xC8A030, b: 0x7A6420 },
hero: [["farmhouse", 22, -40, 1, { r: 6 }], ["house", 24, 28, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0x3A5AB8, roof: 0x2A4AA0, r: 5 }], ["house", 34, -24, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0x3A5AB8, roof: 0x2A4AA0, r: 5 }], ["house", 30, -62, 1, { round: 1, rk: "dome", w: 6, h: 3, col: 0x3A5AB8, roof: 0x2A4AA0, r: 5 }],
["house", 40, 40, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0x3A5AB8, roof: 0x2A4AA0, r: 5 }], ["house", 40, 80, 1, { round: 1, rk: "dome", w: 8, h: 3.8, col: 0x3A5AB8, roof: 0x2A4AA0, r: 6 }], ["house", 44, -88, 1, { round: 1, rk: "dome", w: 6, h: 3, col: 0x3A5AB8, roof: 0x2A4AA0, r: 5 }],
["cornfield", 36, 58, 1, { n: 10, r: 9 }], ["scarecrowpost", 33, 58, 2.6, { over: 1 }], ["balloon", 60, -110, 1, { col: 0x2E8A4A, stripe: 0xB8B070, r: 7 }], ["emeraldgate", 18, -14, 1.2], ["emeraldgate", 18, 14, 1.2]],
sky: [["city", 820, 0, 1, { col: 0x2E8A4A, roof: 0x1E6A3A, cols: [0x2E8A4A, 0x3AA05A, 0x267A42, 0x46A866], round: 1, hmax: 170, R: 85, wallC: 0x2A7A44, spire: 0.55, n: 22, r: 100 }], ["castle", 640, -70, 1.5, { col: 0xB8A040, roof: 0x6A5A20, flag: 0xB8A040, r: 30 }], ["mountain", 760, 65, 1, { r: 150, h: 130, col: 0x5A6A8A, snow: false }]],
sc: { poppy: 1800, corn: 300, flower: 200 },
edge: { k: "bluefence", sp: 9, off: 3.6, along: 1 } };
CT_DRESS.nemo = { fog: 0.55,
hero: [["nautilus", 34, 32, 2.6, { r: 16 }], ["diver", 11, -26, 1.1], ["diver", 14, -36, 1.1], ["diver", 13, 30, 1], ["clam", 20, -58, 1.6], ["squid", 44, -36, 1.6, { r: 10 }],
["ruins", 50, 70, 1.6, { col: 0xA8A090, r: 16 }], ["temple", 80, 95, 1.3, { col: 0x9A9A8A, r: 18 }], ["wreck", 62, -82, 1, { r: 16 }], ["coralgarden", 18, 60, 2.4]],
sky: [["mountain", 700, 10, 1, { r: 170, h: 170, col: 0x2A4A5A, snow: false }], ["mountain", 760, -40, 1, { r: 150, h: 140, col: 0x2A4A5A, snow: false }], ["temple", 420, -25, 3, { col: 0x8A8A7A, r: 30 }]],
sc: { fish: 320, anemone: 300, seashell: 220 },
edge: { k: "anemone", sp: 7, off: 3.4 } };
CT_DRESS.mermaid = { fog: 0.55,
hero: [["seapalace", 64, 30, 1.2, { r: 22 }], ["fig", 15, -30, 1.5, { col: 0xC8C0B4, base: 0x8A8070 }], ["tree", 19, -42, 1, { kind: "willow", h: 12, crown: 0xB85A6A, r: 5 }], ["clam", 14, 36, 1.2],
["garden", 32, -65, 1, { col: 0xC84A3A, r: 13 }], ["bones", 62, -100, 1.4, { r: 8 }], ["hull", 40, 10, 1, { y: 46, over: 1 }], ["seashell", 16, 55, 4]],
sky: [["mountain", 700, 0, 1, { r: 160, h: 150, col: 0x2A4A5A, snow: false }], ["hull", 300, -30, 1.4, { y: 60, over: 1 }]],
sc: { seashell: 320, anemone: 240, fish: 300 },
edge: { k: "seashell", sp: 6, off: 3.2 } };
CT_DRESS.cthulhu = { fog: 0.45, th: { env: { top: 0x0E2420, low: 0x2A4A42, fog: 0x1E3A34, hemiCol: 0x8AB8A8, sun: 0.55, hemi: 0.65 }, g: [0x2A3A30, 0x34443A, 0x3A4A40] },
plaza: { k: "tiles", a: 0x2A3A34, b: 0x1E2A26 },
hero: [["idol", 14, -30, 1.6], ["tablets", 11, 30, 3], ["stones", 32, 50, 1, { col: 0x3A4A40, n: 9, R: 8, r: 10 }], ["camp", 32, 50, 1.4, { over: 1 }], ["wreck", 42, -62, 1.1, { r: 16 }],
["tree", 22, -55, 1, { kind: "dead", h: 16, trunk: 0x2A2A24 }], ["tree", 26, 70, 1, { kind: "dead", h: 18, trunk: 0x2A2A24 }], ["tree", 40, -95, 1, { kind: "dead", h: 14, trunk: 0x2A2A24 }]],
sky: [["rlyeh", 560, 6, 1, { r: 75 }]],
sc: { glyph: 120, dead: 120 },
edge: { k: "glyph", sp: 20, off: 4.6 } };
CT_DRESS.jekyll = { fog: 0.5,
plaza: { k: "cobble", a: 0x5A5A56, b: 0x3A3A38 },
hero: [["blindwall", 20, -40, 1, { r: 9 }], ["street", 30, 52, 1, { col: 0x6A5A4A, r: 26 }], ["street", 48, -80, 1, { r: 26 }], ["hansom", 14, 28, 1], ["pillarbox", 9, -24, 1.3], ["gaslamp", 8, -14, 1], ["gaslamp", 8, 14, 1], ["workbench", 14, -62, 1.6]],
sky: [["clocktower", 520, 22, 1.2, { r: 12 }], ["bigdome", 600, -22, 1, { r: 34 }]],
edge: { k: "gasl", sp: 20, off: 3.6 } };
CT_DRESS.invisible = { fog: 0.8, th: { g: [0xB0B6BC, 0xC0C4C8, 0x8A8A80], env: { low: 0xC8CCD4, fog: 0xB8BCC4 } },
hero: [["invisible", 9, -16, 1.3], ["house", 30, -38, 1, { w: 12, d: 8, h: 6, col: 0xB8A890, roof: 0x5A4A42, storey: 1, snow: 1, chim: 1, r: 8 }], ["innsign", 22, -28, 2],
["house", 30, 42, 1, { w: 8, d: 6, h: 4, col: 0xC8B8A0, roof: 0x5A4A42, snow: 1, chim: 1, r: 6 }], ["house", 44, 68, 1, { w: 8, d: 6, h: 4, col: 0xB8A890, roof: 0x4A3A32, snow: 1, r: 6 }], ["house", 46, -75, 1, { w: 7, d: 6, h: 4, col: 0xC8B8A0, roof: 0x5A4A42, snow: 1, r: 6 }],
["church", 90, 58, 1, { r: 14 }], ["coach", 20, 60, 1, { horses: 1, col: 0x5A4030, horse: 0x6A5A4A }]],
sky: [["mountain", 720, 10, 1, { r: 200, h: 90, col: 0x8A8A90 }], ["mountain", 760, -40, 1, { r: 180, h: 80, col: 0x8A8A90 }]],
sc: { snowpatch: 320 },
edge: [{ k: "footprint", sp: 1.7, off: 0.5, max: 420 }, { k: "lamppost", sp: 60, off: 3.6 }] };
CT_DRESS.sleepyhollow = { fog: 0.6, th: { env: { top: 0x1A1428, low: 0x6A3A2A, fog: 0x3A2A28, sunCol: 0xFFB070, stars: 1 }, g: [0x3A3A24, 0x4A4228, 0x5A4A30], leaf: 0xA8541E },
hero: [["tree", 22, -32, 1, { kind: "dead", h: 26, tr: 1.6, trunk: 0x3A3028, r: 6 }], ["horseman", 18, 34, 2.2], ["pumpkins", 11, -22, 2.4], ["pumpkins", 12, 22, 2], ["churchbridge", 36, -58, 2.6],
["church", 64, 45, 1, { col: 0xB8B0A0, r: 14 }], ["haystack", 28, 70, 1], ["haystack", 34, 82, 1.2], ["house", 52, -85, 1, { w: 12, d: 8, h: 5, col: 0xB89870, roof: 0x5A3A2A, storey: 1, chim: 1, r: 8 }]],
sky: [["mountain", 700, 0, 1, { r: 220, h: 110, col: 0x3A3A40, snow: false }], ["mountain", 740, -45, 1, { r: 200, h: 90, col: 0x3A3A40, snow: false }]],
sc: { pumpkin: 420, tulip: 140, tombstone: 60 },
edge: { k: "jack", sp: 16, off: 3.6 } };
CT_DRESS.dracula = { fog: 0.5, th: { env: { top: 0x0A1020, low: 0x2A3450, fog: 0x1E2638, hemiCol: 0x9AA8D8 } },
hero: [["coach", 16, -28, 1.2, { horses: 4 }], ["earthboxes", 18, 32, 1.1], ["cross", 10, -18, 1.4], ["ruins", 56, 58, 2, { col: 0x6A6460, r: 20 }], ["tree", 22, 62, 1, { kind: "dead", h: 16, trunk: 0x2A2420 }],
["wolf", 26, -58, 1.4], ["wolf", 29, -65, 1.3], ["wolf", 31, -54, 1.4], ["church", 70, -95, 1, { col: 0x7A7470, r: 14 }]],
sky: [["cragcastle", 400, 10, 1, { h: 110, r: 44 }], ["skydisc", 600, -24, 1, { R: 38, col: 0x7A7A6C, alt: 230, over: 1 }], ["mountain", 760, 45, 1, { r: 220, h: 220, col: 0x3A3E4A, snow: 0xA8B0C0 }]],
sc: { tombstone: 140, cross: 50 },
edge: { k: "cross", sp: 42, off: 4 } };
CT_DRESS.thor = { fog: 0.7,
hero: [["chariot", 16, -28, 1.6], ["hammer", 20, 32, 1.3], ["runestone", 10, -16, 1.2], ["runestone", 10, 16, 1.2], ["boat", 42, -62, 1, { kind: "long", L: 16, col: 0x5A3A24, sail: 0xC8C0A8, stripe: 0xA82A2A, r: 10 }],
["hall", 55, 60, 1.2, { col: 0x5A3A24, r: 20 }], ["goatpair", 26, 58, 1.2]],
sky: [["fig", 700, 8, 1, { h: 160, col: 0x8A9AA8, arms: "down", r: 12 }], ["mountain", 760, -40, 1, { r: 220, h: 230 }], ["mountain", 740, 50, 1, { r: 200, h: 200 }]],
sc: { runes: 70, boulder: 80 },
edge: { k: "runes", sp: 30, off: 4.6 } };
CT_DRESS.odin = { fog: 0.7,
hero: [["sleipnir", 18, -30, 1.1], ["ravenpost", 12, 24, 1.2], ["well", 16, -55, 1.6, { bucket: 1 }], ["runestone", 10, -16, 1.2], ["runestone", 10, 16, 1.2], ["shieldhall", 72, 40, 1, { r: 26 }], ["boat", 46, -80, 1, { kind: "long", L: 16, col: 0x5A3A24, stripe: 0xA82A2A, r: 10 }]],
sky: [["tree", 640, 0, 1, { kind: "world", h: 400, tr: 22, crown: 0x3A6A3A, crown2: 0x4A7A3A, r: 70 }], ["bifrost", 460, -40, 1, { R: 200, over: 1 }], ["mountain", 780, 55, 1, { r: 200, h: 200 }]],
sc: { runes: 70 },
edge: { k: "runes", sp: 30, off: 4.6 } };
CT_DRESS.frankenstein = { fog: 0.7,
hero: [["iceship", 52, 36, 1, { r: 18 }], ["sledge", 14, -26, 1.2], ["tree", 22, 32, 1, { kind: "blasted", h: 16 }], ["house", 40, -58, 1, { w: 7, d: 6, h: 3.6, col: 0x8A7A6A, roof: 0x5A4A3A, snow: 1, chim: 1, r: 6 }], ["workbench", 12, -58, 1.6], ["iceslabs", 24, 70, 2.4]],
sky: [["mountain", 660, 8, 1, { r: 280, h: 320, col: 0x7A8090 }], ["mountain", 740, -38, 1, { r: 220, h: 240, col: 0x7A8090 }]],
sc: { icicle: 140 },
edge: { k: "icicle", sp: 28, off: 4.4 } };
CT_DRESS.wukong = { fog: 0.7,
hero: [["paifang", 17, -26, 1.2], ["staff", 24, 32, 1, { h: 34 }], ["pagoda", 52, 62, 1.3, { r: 10 }], ["falls", 64, -62, 0.6, { h: 40, r: 22 }], ["ape", 14, 40, 2.4], ["ape", 16, 52, 2.2], ["ape", 20, -45, 2.2]],
sky: [["hand", 440, 2, 2, { r: 44 }], ["mountain", 680, -35, 1, { r: 220, h: 120, col: 0x8A2A1A, snow: false, glow: 0xA84A1E }], ["mountain", 700, 40, 1, { r: 200, h: 110, col: 0x7A2418, snow: false, glow: 0xA84A1E }]],
sc: { peach: 180 },
edge: { k: "plantern", sp: 18, off: 3.8 } };
CT_DRESS.laputa = { fog: 0.8,
hero: [["engine", 15, -28, 1.4], ["observatory", 40, 42, 1.2, { r: 8 }], ["house", 30, -62, 1, { w: 14, d: 9, h: 7, col: 0xC8C0B0, roof: 0x4A5A8A, storey: 1, r: 9 }], ["telescope", 12, 28, 2.2], ["floatisle", 160, 20, 0.35, { over: 1, y: 60 }]],
sky: [["floatisle", 320, 0, 1, { over: 1, y: 130 }], ["floatisle", 560, -50, 0.4, { over: 1, y: 90 }]],
sc: { cloud: 300 },
edge: { k: "lamppost", sp: 30, off: 3.6 } };
CT_DRESS.martians = { fog: 0.6, th: { env: { top: 0x5A4A44, low: 0xA88068, fog: 0x7A5E50, sunCol: 0xFFC8A0 }, g: [0x5A4A34, 0x6A5034, 0x7A5A3A] },
hero: [["tripod", 44, 32, 2.6, { r: 22 }], ["cylinder", 18, -30, 2.2], ["burnt", 30, -62, 1], ["burnt", 34, 68, 1], ["burnt", 50, -90, 1.2], ["tripod", 120, -28, 3.2, { r: 26 }]],
sky: [["tripod", 600, 10, 6, { r: 50 }], ["tripod", 700, -40, 5, { r: 44 }]],
water: [{ a: 100, off: 120, w: 26, col: 0x3A4A5A, on: [["ironclad", -60, 1, 0]] }],
sc: { redweed: 600 },
edge: { k: "redweed", sp: 6, off: 3.4 } };
CT_DRESS.arabian = { fog: 0.8,
plaza: { k: "tiles", a: 0x3A5A7A, b: 0x9A8460 },
hero: [["carpet", 14, -28, 1, { y: 3 }], ["oillamp", 12, 28, 1.2], ["jars", 24, -48, 1, { n: 8 }], ["tents", 32, 52, 1.2, { r: 14 }], ["camel", 20, 64, 1.2], ["camel", 24, 72, 1.1], ["egg", 54, -74, 1.4], ["pool", 44, 90, 1.2, { col: 0x3A7AAA, r: 14 }]],
sky: [["city", 720, 0, 1, { col: 0xC8B8A0, roof: 0x3A7AB8, cols: [0xC8B8A0, 0xD8C8A8, 0xB8A890], dome: 1, round: 1, hmax: 110, R: 90, wallC: 0xB8A080, spire: 0.6, n: 22, r: 100 }], ["mountain", 760, -50, 1, { r: 200, h: 120, col: 0xB89868, snow: false }]],
sc: { datepalm: 140, camp: 0 },
edge: { k: "lamppost", sp: 24, off: 3.6 } };
CT_DRESS.gilgamesh = { fog: 0.8,
plaza: { k: "bricks", a: 0xA8804A, b: 0x6A5034 },
hero: [["bull", 18, -30, 2.2], ["tablets", 10, 24, 3], ["boat", 30, 62, 1, { kind: "reed", L: 10 }], ["wall", 54, -48, 1.2, { col: 0xB8925A, r: 32 }]],
sky: [["ziggurat", 300, 15, 1.6, { r: 50 }], ["mountain", 740, -35, 1, { r: 220, h: 160, col: 0x3A5A3A, snow: false }]],
water: [{ a: -100, off: 90, w: 30, col: 0x3A6A7A, on: [["boat", 40, 1, 0, { kind: "reed", L: 9 }], ["boat", -120, 1, 0, { kind: "reed", L: 8 }]] }],
sc: { datepalm: 160, reed: 220, cedar: 80 },
edge: { k: "datepalm", sp: 34, off: 7 } };
CT_DRESS.columbiad = { fog: 0.75,
hero: [["columbiad", 36, 32, 3.6, { r: 10 }], ["shell", 14, -24, 1.3], ["stands", 34, -46, 1, { r: 12 }], ["stands", 44, -70, 1, { r: 12, col: 0x3A5A9A }], ["banner", 11, -14, 1], ["banner", 11, 14, 1, { col: 0x3A5A9A }], ["telescope", 20, 62, 2.4]],
sky: [["skydisc", 700, 0, 1, { R: 80, col: 0x7A7A6C, alt: 230, over: 1 }], ["mountain", 760, -40, 1, { r: 220, h: 240 }], ["observatory", 620, 30, 3, { r: 22 }]],
sc: { palm: 90 },
edge: [{ k: "banner", sp: 24, off: 4 }, { k: "bannerb", sp: 24, off: -4 }] };
CT_DRESS.timemachine = { fog: 0.75,
hero: [["timemachine", 10, -20, 3.2], ["whitesphinx", 44, 28, 4.2, { r: 14 }], ["morlockwell", 22, -44, 1.4], ["morlockwell", 32, 58, 1.4], ["morlockwell", 62, -86, 1.4], ["ruins", 40, -70, 1.6, { r: 14 }]],
sky: [["porcelain", 440, 18, 1.2, { r: 36 }], ["ruins", 380, -30, 4, { r: 40 }]],
sc: { ruin: 200, peach: 60 },
edge: { k: "boulder", sp: 30, off: 5 } };
CT_DRESS.egypt = { fog: 0.85,
plaza: { k: "tiles", a: 0xB8A070, b: 0x8A7448 },
hero: [["obelisk", 14, -22, 1.3], ["obelisk", 14, 22, 1.3], ["colossus", 64, -40, 1.5, { r: 7, col: 0x9A845A }], ["colossus", 64, 40, 1.5, { r: 7, col: 0x9A845A }], ["egtemple", 70, -80, 1, { r: 18 }]],
sky: [["pyramid", 640, -12, 2.6, { r: 84 }], ["pyramid", 720, 10, 2.2, { r: 72 }], ["pyramid", 680, 26, 1.4, { r: 46 }]],
water: [{ a: 100, off: 80, w: 34, col: 0x2A6A7A, on: [["boat", 0, 1, 0, { kind: "felucca", L: 10, sail: 0xD8D0C0 }], ["boat", 160, 1, 0, { kind: "felucca", L: 9 }], ["boat", -150, 1, 0, { kind: "reed", L: 8 }]] }],
sc: { papyrus: 320, datepalm: 160 },
edge: { k: "jackalk", sp: 14, off: 4.6, max: 500 } };
CT_DRESS.yokai = { fog: 0.7,
plaza: { k: "rings", a: 0x8A8070, b: 0x6A6458 },
hero: [["stonelantern", 8, -22, 3], ["stonelantern", 8, 22, 3], ["archbridge", 32, -48, 1], ["pagoda", 58, 42, 1.4, { r: 11 }], ["house", 30, 62, 1, { w: 10, d: 8, h: 4, col: 0x8A5A3A, roof: 0x2A2A2A, r: 8 }], ["lanterns", 16, -62, 1.2]],
sky: [["fuji", 820, 0, 1, { r: 320, h: 280 }]],
sc: { plantern: 90, lotus: 120 },
edge: { k: "toriik", sp: 11, max: 320 } };
CT_DRESS.robinhood = { fog: 0.8,
hero: [["target", 16, -26, 2.6], ["target", 18, -36, 2.6], ["target", 20, -46, 2.6], ["camp", 14, 28, 1.6], ["tents", 32, 46, 1, { r: 14 }], ["tree", 34, -62, 1, { h: 32, tr: 2.6, crown: 0x3A6A2A, r: 8 }], ["deer", 28, 72, 1.2], ["deer", 31, 80, 1.1], ["barrels", 20, 58, 1]],
sky: [["cragcastle", 600, 10, 1, { h: 50, col: 0x8A8070, roof: 0x4A3A5A, flag: 0xB83A3A, r: 44 }]],
sc: { deerk: 40 },
edge: { k: "bannerb", sp: 60, off: 4 } };
CT_DRESS.arthur = { fog: 0.75,
hero: [["swordstone", 14, -24, 1.6], ["roundtable", 28, 32, 1.2, { r: 9 }], ["pavilion", 30, -48, 1.4, { col: 0xB83A3A }], ["pavilion", 38, -64, 1.4, { col: 0x3A5A9A }], ["pavilion", 32, 64, 1.4, { col: 0xD8B048, c2: 0xB83A3A }],
["knight", 18, 48, 1.1], ["knight", 22, -80, 1.1, { col: 0x3A5A9A, horse: 0xC8C0B0 }], ["lakesword", 90, -95, 1.3, { r: 22 }]],
sky: [["city", 760, 0, 1, { col: 0xB8B0A0, roof: 0x3A5A9A, cols: [0xB8B0A0, 0xC8C0B0, 0xA8A090], round: 1, hmax: 120, R: 70, spire: 0.55, wallC: 0xA8A090, n: 18, r: 84 }]],
sc: { bannerb: 30 },
edge: [{ k: "banner", sp: 22, off: 4 }, { k: "bannerb", sp: 22, off: -4 }] };
CT_DRESS.quixote = { fog: 0.85, th: { g: [0x9A8A4A, 0xB09A58, 0x8A7A50] },
hero: [["windmills", 52, -34, 1.7, { r: 24 }], ["windmills", 72, 44, 1.9, { r: 26 }], ["house", 32, -70, 1, { w: 14, d: 8, h: 4, col: 0xC8C0B0, roof: 0x9A4A2A, r: 9 }], ["knight", 15, 26, 1.1, { col: 0x8A7A5A, horse: 0x8A7A6A, thin: 1 }], ["quad", 16, 34, 1, { L: 1.6, H: 1, col: 0x6A5A4A, ears: 1, neck: 0.5 }]],
sky: [["windmills", 620, 0, 3.2, { r: 46 }], ["windmills", 660, 32, 3, { r: 44 }], ["windmills", 640, -34, 3, { r: 44 }]],
sc: { sheep: 140, olive: 220, oak: 0 },
edge: { k: "boulder", sp: 30, off: 5 } };
CT_DRESS.mothergoose = { fog: 0.9,
plaza: { k: "checker", a: 0xC83A8A, b: 0x3A8AC8, n: 6 },
hero: [["shoe", 32, -36, 1, { r: 10 }], ["humpty", 14, 28, 3], ["cowmoon", 40, 40, 1, { r: 6 }], ["tallclock", 16, -22, 1], ["well", 28, 62, 1.4, { bucket: 1 }], ["crookedhouse", 40, -72, 1, { r: 6 }], ["haystack", 22, -56, 1], ["throne", 20, 80, 1.6, { col: 0x6A2AA8 }]],
sky: [["castle", 520, 0, 1.5, { col: 0xB85A98, roof: 0x3A7AD8, flag: 0xD8C83A, r: 30 }]],
sc: { sheep: 80, blacksheep: 24, candy: 90 },
edge: { k: "candy", sp: 12, off: 3.6 } };
CT_DRESS.pinocchio = { fog: 0.85,
plaza: { k: "bricks", a: 0xA8784A, b: 0x6A4A2A },
hero: [["house", 22, -32, 1, { w: 8, d: 7, h: 4, col: 0xC8A070, roof: 0x9A4A2A, chim: 1, r: 6 }], ["workbench", 13, -24, 1.6], ["stage", 30, 36, 1, { col: 0xB82A3A, r: 11 }], ["cointree", 18, 24, 1.6], ["carousel", 52, -62, 1, { r: 8 }], ["house", 62, 70, 1, { w: 9, d: 8, h: 5, col: 0x3A7AC8, roof: 0x2A4AA0, r: 7 }]],
sky: [["dogfish", 300, 18, 2, { r: 34 }], ["mountain", 760, -40, 1, { r: 200, h: 140, col: 0x6A7A8A, snow: false }]],
sc: { candy: 60, toadstool: 60 },
edge: { k: "lamppost", sp: 24, off: 3.6 } };
CT_DRESS.threepigs = { fog: 0.9,
hero: [["pighouse", 18, -30, 3.2, { t: "straw" }], ["pighouse", 22, 32, 3.2, { t: "sticks" }], ["pighouse", 38, 62, 3.2, { t: "bricks" }], ["wolf", 14, -12, 1.6, { col: 0x6A6A6A }], ["potfire", 30, -58, 1.2], ["churn", 24, 56, 1.6], ["tree", 42, -80, 1, { h: 10, fruit: 0xC82A2A }]],
sky: [["mountain", 700, 0, 1, { r: 200, h: 100, col: 0x4A9A3A, snow: false }]],
sc: { haystack: 0, rosebush: 60 },
edge: { k: "bluefence", sp: 9, off: 3.6, along: 1 } };
CT_DRESS.lilliput = { fog: 0.85,
hero: [["gulliver", 20, -30, 4], ["tinytown", 12, 26, 3], ["tinypalace", 22, 42, 2], ["tinyfleet", 52, -62, 1.4, { r: 14 }], ["tinytown", 30, 70, 2.4]],
sky: [["mountain", 700, 0, 1, { r: 200, h: 90, col: 0x4A8A3A, snow: false }]],
sc: { tinyhouse: 700, tinytree: 1000, pinman: 600 },
edge: { k: "tinyhouse", sp: 5, off: 3.4 } };
CT_DRESS.centreearth = { fog: 0.6, th: { env: { top: 0x1A1620, low: 0x4A3E44, fog: 0x2E2830, sun: 0.55, hemi: 0.65, hemiCol: 0xC8B8A8 }, path: 0x7A6A5A },
hero: [["bigfungus", 42, -36, 1.4, { r: 16 }], ["bones", 18, -28, 1.6], ["mastodon", 50, 62, 1.4], ["mastodon", 58, 72, 1.2], ["runestone", 10, 16, 1.4, { col: 0x6A6A6A }], ["lake", 120, 55, 1, { R: 70, col: 0x2A4A6A, r: 72 }], ["boat", 62, 36, 1, { kind: "raft", L: 7 }]],
sky: [["bigfungus", 400, -10, 4, { r: 60 }], ["mountain", 700, 30, 1, { r: 220, h: 260, col: 0x4A3A40, snow: false, glow: 0xA84A1E }]],
sc: { stalag: 220, bone: 160, toadstool: 120 },
edge: { k: "crystalw", sp: 16, off: 4.2 } };
CT_DRESS.treasureisland = { fog: 0.8,
hero: [["stockade", 44, -40, 1, { r: 15 }], ["skeletonpointer", 12, -22, 3], ["treasure", 14, 24, 1.5], ["cannon", 20, 36, 1.6, { balls: 1 }], ["cannon", 20, -38, 1.6], ["barrels", 28, 58, 1, { apples: 1 }], ["cave", 64, 74, 1, { r: 18 }]],
sky: [["ship", 800, 4, 2.2, { sea: 1, r: 30 }], ["mountain", 560, -30, 1, { r: 180, h: 170, col: 0x5A7A3A, snow: false }], ["skullrock", 480, 30, 1.6, { r: 20 }]],
sc: { palm: 160, barrels: 0 },
edge: { k: "boulder", sp: 34, off: 5 } };
CT_DRESS.phantom = { fog: 0.55,
plaza: { k: "tiles", a: 0x6A5A50, b: 0x8A7A68 },
hero: [["lake", 26, -40, 1, { R: 12, col: 0x1A2A3A, r: 12 }], ["boat", 26, -40, 1, { kind: "gondola", L: 8, col: 0x1A1A1A, over: 1 }], ["fig", 14, -14, 2.2, { col: 0xC8A040, base: 0x6A6050, lyre: 1, arms: "up" }], ["gaslamp", 8, 14, 1], ["gaslamp", 8, -14, 1], ["hansom", 20, 60, 1]],
sky: [["opera", 240, -18, 1.3, { r: 30 }], ["bigdome", 520, -30, 1, { r: 34 }], ["city", 680, 10, 1, { col: 0x9A9488, roof: 0x4A5A6A, hmax: 50, R: 80, wall: false, n: 24, r: 84 }]],
edge: { k: "gasl", sp: 18, off: 3.6 } };
CT_DRESS.holmes = { fog: 0.5,
plaza: { k: "cobble", a: 0x5A5A56, b: 0x3A3A38 },
hero: [["street", 28, -42, 1, { col: 0x7A5A4A, r: 26 }], ["street", 28, 44, 1, { col: 0x6A5A4A, r: 26 }], ["hansom", 14, -22, 1], ["hansom", 20, 26, 1, { horse: 0x2A2018 }], ["pillarbox", 9, 16, 1.3], ["gaslamp", 8, -14, 1]],
sky: [["clocktower", 520, 12, 1.2, { r: 12 }], ["falls", 680, -34, 2.6, { h: 70, r: 80 }]],
edge: { k: "gasl", sp: 20, off: 3.6 } };
CT_DRESS.grimm = { fog: 0.75,
hero: [["gingerhut", 18, -26, 4], ["braidtower", 50, 32, 1, { r: 6 }], ["bremen", 14, 22, 1.2], ["well", 16, -48, 1.4, { ball: 1 }], ["wolf", 24, 52, 1.3], ["house", 42, -74, 1, { w: 7, d: 6, h: 4, col: 0xC8B8A0, roof: 0x6A4A2A, chim: 1, r: 6 }]],
sky: [["castle", 440, -8, 1.5, { col: 0xB8B0A8, roof: 0x3A5A9A, r: 32 }], ["briar", 400, -8, 1.6, { r: 30 }]],
sc: { toadstool: 140, rosebush: 80 },
edge: { k: "toadstool", sp: 13, off: 3.6 } };
CT_DRESS.fogg = { fog: 0.8,
hero: [["globe", 14, -24, 1.3], ["elephant", 22, 32, 1, { howdah: 1 }], ["house", 42, -50, 1, { w: 16, d: 10, h: 10, col: 0xB8AE98, rk: "flat", roof: 0x8A8270, storey: 1, r: 10 }], ["tallclock", 12, 28, 1, { col: 0x4A3A2A }]],
sky: [["pagoda", 620, -20, 3, { r: 26 }], ["clocktower", 680, 18, 1, { r: 12 }], ["steamer", 420, 40, 1.4, { r: 36 }]],
water: [{ a: -90, off: 70, rail: 1, on: [["train", 30, 1, 0, { cars: 3 }]] }],
sc: {},
edge: { k: "lamppost", sp: 30, off: 3.6 } };
CT_DRESS.lostworld = { fog: 0.7,
hero: [["iguanodon", 32, -36, 2.2], ["stego", 42, 40, 1, { r: 5 }], ["nest", 14, 26, 1.4], ["camp", 14, -20, 1.4], ["briar", 30, -20, 0.4, { r: 9 }], ["nest", 22, 54, 1.2]],
sky: [["plateau", 600, 0, 1, { R: 200, h: 150, r: 206 }], ["pinnacle", 420, -26, 1, { h: 120, log: 1, r: 10 }]],
sc: { liana: 140, fern: 300 },
edge: { k: "boulder", sp: 34, off: 5 } };
CT_DRESS.tarzan = { fog: 0.75,
hero: [["cabin", 26, -36, 1, { r: 6 }], ["drum", 30, 36, 1, { r: 10 }], ["ape", 22, 24, 2.2, { big: 1 }], ["ape", 34, 48, 2], ["ape", 36, 22, 2], ["treasure", 14, -16, 1.2], ["elephant", 50, -70, 1]],
sky: [["wreck", 790, 6, 1.8, { sea: 1, r: 30 }], ["mountain", 700, -40, 1, { r: 200, h: 150, col: 0x3A6A3A, snow: false }]],
sc: { liana: 220 },
edge: { k: "boulder", sp: 40, off: 5 } };
CT_DRESS.cavor = { fog: 0.8,
hero: [["cavorsphere", 14, -24, 2.4], ["mooncalf", 38, 32, 1.2, { r: 9 }], ["mooncalf", 52, -58, 1, { r: 8 }], ["shaftcap", 24, 52, 1.4], ["fig", 16, 20, 0.9, { col: 0x8A8A9A }], ["fig", 17, 26, 0.9, { col: 0x8A8A9A }], ["crater", 40, -30, 2, { r: 24 }]],
sky: [["skydisc", 700, 0, 1, { R: 90, col: 0x2A5A9A, land: 0x4A7A3A, alt: 260, over: 1 }]],
sc: { moonplant: 420 },
edge: { k: "moonplant", sp: 10, off: 3.6 } };
CT_DRESS.lowell = { fog: 0.75,
hero: [["observatory", 30, -36, 1.2, { r: 8 }], ["house", 32, 42, 1, { round: 1, rk: "dome", w: 9, h: 4, col: 0xB88A6A, roof: 0x8A6A5A, r: 6 }], ["telescope", 12, 24, 2.2]],
sky: [["skydisc", 650, -30, 1, { R: 16, col: 0x8A7A6A, alt: 170, over: 1 }], ["skydisc", 700, 25, 1, { R: 9, col: 0x9A8A7A, alt: 230, over: 1 }], ["mountain", 760, 0, 1, { r: 400, h: 120, col: 0x8A4A2A, snow: false }]],
water: [{ a: 90, off: 40, w: 12, col: 0x2A4A6A, wob: 0 }, { a: -90, off: 140, w: 12, col: 0x2A4A6A, wob: 0 }, { a: 0, dir: 90, off: 260, w: 12, col: 0x2A4A6A, wob: 0 }],
sc: { moonplant: 200 },
edge: { k: "boulder", sp: 30, off: 5 } };
CT_DRESS.tirnanog = { fog: 0.75,
hero: [["stones", 28, -36, 1, { r: 11 }], ["quad", 16, 24, 1.3, { L: 2.4, H: 1.6, col: 0xC8C4BC, neck: 0.8, mane: 0xB8B4AC, snout: 1.7 }], ["palace", 84, 32, 1.2, { col: 0xD8C890, dome: 0xC8A040, r: 22 }], ["tree", 22, -58, 1, { h: 10, fruit: 0xD8B048 }], ["tree", 26, 62, 1, { h: 10, fruit: 0xD8B048 }], ["tower", 52, -76, 1.4, { col: 0x9A9488, r: 9 }]],
sky: [["mountain", 620, -30, 1, { r: 180, h: 110, col: 0x4A8A3A, snow: false }]],
sc: { goldtree: 120 },
edge: { k: "runes", sp: 40, off: 4.6 } };
CT_DRESS.orpheus = { fog: 0.6, th: { env: { top: 0x1A1426, low: 0x4A3A4A, fog: 0x2E2434, sun: 0.55, hemi: 0.65, hemiCol: 0xB8A8C8 }, path: 0x6A5A5A },
hero: [["hadesgate", 70, 26, 1, { r: 20 }], ["biglyre", 14, -24, 1.4], ["cerberus", 32, 44, 2.2], ["tree", 20, -52, 1, { h: 9, fruit: 0xA82A2A }]],
sky: [["mountain", 700, 0, 1, { r: 240, h: 180, col: 0x2A2430, snow: false, glow: 0x8A3A1E }]],
water: [{ a: -90, off: 36, w: 22, col: 0x1A2A3A, on: [["boat", 0, 1, 0, { kind: "row", L: 7, col: 0x2A2420 }]] }],
sc: { asphodel: 900 },
edge: { k: "plantern", sp: 20, off: 3.8 } };
CT_DRESS.perseus = { fog: 0.8,
hero: [["stonemen", 24, -36, 1.2, { r: 13 }], ["pegasus", 18, 28, 1.4], ["chainedrock", 44, 52, 1.4, { r: 7 }], ["seamonster", 72, 72, 1, { r: 15 }], ["mirrorshield", 10, -16, 3], ["temple", 54, -66, 1, { r: 16 }]],
sky: [["atlas", 660, 4, 1, { r: 74 }]],
sc: { petrified: 90 },
edge: { k: "boulder", sp: 34, off: 5 } };
CT_DRESS.beowulf = { fog: 0.7,
hero: [["boat", 30, -40, 1, { kind: "long", L: 16, col: 0x4A3424, sail: 0xC8C0A8, stripe: 0x2A4A8A, r: 10 }], ["hall", 62, 34, 1.4, { col: 0x5A3A24, roof: 0xA8862A, r: 22 }], ["lake", 52, -72, 1, { R: 24, col: 0x1E2A2A, r: 24 }],
["mound", 62, 82, 1.2, { r: 14 }], ["treasure", 54, 74, 1.4], ["quad", 44, 64, 2, { L: 6, H: 1.6, col: 0x5A3A2A, wings: 0x4A2A1E, horns: 0x2A2A2A, neck: 0.8, tailL: 0.8, tailUp: 0.2, eyes: 0xC85A2A, r: 8 }],
["runestone", 10, -16, 1.2], ["runestone", 10, 16, 1.2], ["banner", 14, 24, 1, { col: 0xA82A2A }]],
sky: [["mountain", 700, 0, 1, { r: 220, h: 130, col: 0x4A4A44, snow: false }], ["mountain", 740, -45, 1, { r: 180, h: 110, col: 0x4A4A44, snow: false }]],
sc: { runes: 50, boulder: 80 },
edge: { k: "runes", sp: 34, off: 4.6 } };
CT_DRESS.jason = { fog: 0.7,
hero: [["boat", 30, -40, 1.2, { kind: "long", L: 18, col: 0x6A4A2A, sail: 0xE8DCC0, stripe: 0xC8A040, r: 12 }], ["temple", 54, -66, 1, { r: 16 }],
["quad", 44, 40, 1.3, { L: 3, H: 1.7, col: 0x8A6A3A, horns: 0xC8A040, eyes: 0xF28A2A, neck: 0.6, r: 5 }], ["quad", 50, 48, 1.3, { L: 3, H: 1.7, col: 0x8A6A3A, horns: 0xC8A040, eyes: 0xF28A2A, neck: 0.6, r: 5 }],
["tree", 72, 72, 1.6, { kind: "oak", h: 16, crown: 0x4A6A2A, r: 9 }], ["mirrorshield", 10, -16, 2], ["banner", 14, 24, 1, { col: 0x2A4A8A }]],
sc: { petrified: 0 },
edge: { k: "boulder", sp: 34, off: 5 } };
var CT_SCN = {};
var CTN_MS = typeof WeakSet !== "undefined" ? new WeakSet() : null;
(function () { if (typeof ctM !== "function" || !CTN_MS)
return; var m0 = ctM; ctM = function () { var m = m0.apply(this, arguments); CTN_MS.add(m); return m; }; })();
var CTN_PLAIN = { fig: 1, quad: 1, knight: 1, sleipnir: 1, wolf: 1, elephant: 1, mastodon: 1, camel: 1, stego: 1, pegasus: 1, cerberus: 1, deer: 1, bull: 1, goatpair: 1, bremen: 1, jackal: 1,
mooncalf: 1, diver: 1, card: 1, squid: 1, seamonster: 1, cowmoon: 1, teapot: 1, teacup: 1, tophat: 1, watch: 1, egg: 1, grin: 1, invisible: 1, stonemen: 1, carousel: 1, balloon: 1, dogfish: 1,
cardman: 1, iguanodon: 1, ape: 1, horseman: 1, humpty: 1, cricket: 1, longnose: 1, gulliver: 1, gulliverhead: 1, skydisc: 1, bifrost: 1, lake: 1, flock: 1, crowd: 1 };
var CTN_OWN_N = { jars: 1, barrels: 1, stonemen: 1, stones: 1, cornfield: 1, earthboxes: 1, city: 1, mountain: 1 };
var CTN_TX = {}, CTN_TM = {}, CTN_HSL = { h: 0, s: 0, l: 0 };
function ctnTex(k) {
if (CTN_TX[k])
return CTN_TX[k];
if (typeof texOf !== "function")
return null;
var t0 = texOf(k);
if (!t0)
return null;
var t = t0.clone();
t.needsUpdate = true;
CTN_TX[k] = t;
return t;
}
function ctnKind(m, geo) { return __ZC(354, 191, this, arguments, new.target); }
function ctnMetre(geo) { return __ZC(354, 192, this, arguments, new.target); }
function ctnSurf(G) { return __ZC(354, 193, this, arguments, new.target); }
function ctnMerge(G) { return __ZC(354, 194, this, arguments, new.target); }
(function () {
if (typeof ctdMerge !== "function")
return;
ctdMerge = function (G) { try {
ctnSurf(G);
}
catch (e) { } return ctnMerge(G); };
Object.keys(CTN_PLAIN).forEach(function (n) {
[typeof CTD_SET !== "undefined" ? CTD_SET : null, typeof CT_SHAPES !== "undefined" ? CT_SHAPES : null].forEach(function (S) {
if (!S || typeof S[n] !== "function")
return;
var f0 = S[n];
S[n] = function (g) { if (g && g.userData)
g.userData.ctnPlain = 1; return f0.apply(this, arguments); };
});
});
})();
var CTN_DRESS = {
peasant: { topKind: "tunic", top: 0x8A6A4A, bottom: 0x5A4A3A, shoes: 0x3A2A1A },
farmer: { top: 0xB8A070, bottom: 0x4A5A8A, hat: "brimmed", hatColor: 0xC8A858 },
villager: { topKind: "dress", top: 0x7A8AA8, bottomKind: "skirt", bottom: 0x5A4A6A, layer: "apron", layerColor: 0xE8E0D0 },
noble: { topKind: "robe", top: 0x6A2A6A, bottom: 0x4A2A4A, back: "cape", backColor: 0xB83A3A },
lady: { topKind: "dress", top: 0x8A3A5A, bottomKind: "skirt", bottom: 0x8A3A5A },
soldier: { top: 0x8A8A92, bottom: 0x5A5A62, hat: "helmet", hatColor: 0x8A8A92 },
guard: { top: 0xA82A2A, bottom: 0x2A2A2A, hat: "helmet", hatColor: 0x8A8A92 },
knight: { top: 0x9A9AA2, bottom: 0x8A8A92, hat: "helmet", hatColor: 0x9A9AA2, back: "cape", backColor: 0x2A4AA8 },
sailor: { top: 0xE8E4DC, bottom: 0x2A3A6A, hat: "cap", hatColor: 0x2A3A6A },
pirate: { top: 0xA82A2A, bottom: 0x3A2A1A, hat: "bandana", hatColor: 0x1A1A1A },
monk: { topKind: "robe", top: 0x5A4A3A, bottom: 0x5A4A3A },
robe: { topKind: "robe", top: 0xE8E0CC, bottom: 0xE8E0CC },
desert: { topKind: "robe", top: 0xD8C8A0, bottom: 0xC8B890, hat: "hood", hatColor: 0xE8E0D0 },
victorian: { layer: "suit", layerColor: 0x2A2A30, top: 0xE8E4DC, bottom: 0x2A2A30, hat: "tophat", hatColor: 0x1A1A1A },
maid: { topKind: "dress", top: 0x2A2A3A, bottomKind: "skirt", bottom: 0x2A2A3A, layer: "apron", layerColor: 0xF0ECE4 },
viking: { top: 0x6A4A2A, bottom: 0x4A3A2A, hat: "helmet", hatColor: 0x8A8A92, back: "cape", backColor: 0x8A2A2A },
greek: { topKind: "robe", top: 0xE8E2D4, bottom: 0xE8E2D4 },
kimono: { topKind: "robe", top: 0x3A5A8A, bottom: 0x3A5A8A },
scholar: { layer: "suit", layerColor: 0x5A4A3A, top: 0xE8E4DC, bottom: 0x4A3A2A },
kid: { top: 0xE83A3A, bottom: 0x2A6AE8, shoes: 0xF2C83A },
kid2: { topKind: "dress", top: 0xF2C83A, bottomKind: "skirt", bottom: 0x3AC8E8 },
explorer: { top: 0xB8A070, bottom: 0x8A7A5A, hat: "brimmed", hatColor: 0xD8C8A0 }
};
function ctnFolk(G, x, z, rot, o, seed) { return __ZC(354, 195, this, arguments, new.target); }
function ctnBeast(G, x, z, rot, o, seed) { return __ZC(354, 196, this, arguments, new.target); }
function ctnFree(x, z, r, own) { return __ZC(354, 197, this, arguments, new.target); }
function ctnNorm(e) { if (e.ctn)
return e; var n = e[0], o = Object.assign({}, e[4] || {}); if (/^k:/.test(n)) {
n = n.slice(2);
if (!o.beast)
o.k = 1;
} var r = [n, e[1], e[2], e[3] || 1, o]; r.ctn = 1; return r; }
function ctnR(e) { return __ZC(354, 198, this, arguments, new.target); }
function ctnPut(G, KG, e, x, z, rot, seed) { return __ZC(354, 199, this, arguments, new.target); }
function ctnScene(root, p, list, lite) { return __ZC(354, 200, this, arguments, new.target); }
function ctnMid(root, list, lite) { return __ZC(354, 201, this, arguments, new.target); }
function ctnOcc(p) { return __ZC(354, 202, this, arguments, new.target); }
(function () {
if (typeof ctdDress !== "function")
return;
var d0 = ctdDress;
ctdDress = function (root, lite) {
CTS.occ = [];
CTS.folk = [];
CTS.places.forEach(function (p) { ctnOcc(p); try {
ctnSurf(p.g);
}
catch (e) { } });
d0.apply(this, arguments);
var D = CT_SCN[CTS.T.id];
if (!D)
return;
CTS.places.forEach(function (p) { var L = D.ch && D.ch[p.k]; if (L && L.length)
ctnScene(root, p, L, lite); });
if (D.mid && D.mid.length)
ctnMid(root, D.mid, lite);
CTS.folk.forEach(function (f) { var best = null, bd = 1e9; CTS.places.forEach(function (p) { var d = Math.hypot(f.x - p.x, f.z - p.z); if (d < bd) {
bd = d;
best = p;
} }); if (best)
(best.folk = best.folk || []).push(f); });
};
if (typeof ctsPeople === "function") {
var p0 = ctsPeople;
ctsPeople = function (p, on) {
var was = !!p.pg;
p0.apply(this, arguments);
if (on && !was && p.pg && p.folk) {
var lite = ctLite(), n = 0;
p.folk.forEach(function (f) { if (lite && n >= 3)
return; n++; try {
if (f.beast)
ctnBeast(p.pg, f.x, f.z, f.rot, Object.assign({}, f.o, { sz: f.s || 1 }), f.seed);
else
ctnFolk(p.pg, f.x, f.z, f.rot, f.o, f.seed);
}
catch (e) { } });
}
};
}
})();
if (typeof CTD_SET !== "undefined") {
CTD_SET.redweedpatch = function (g, o) { return __ZC(354, 203, this, arguments, new.target); };
}
if (typeof CTD_SET !== "undefined") {
CTD_SET.bamboo = function (g, o) { return __ZC(354, 204, this, arguments, new.target); };
CTD_SET.sheep = function (g, o) { var r = CTD_SET.quad(g, { L: 1.3, H: 0.75, br: 0.42, col: o.col || 0xC0BAAE, headc: 0x2A2420, legc: 0x2A2420, neck: 0.3, head: 0.3, ears: 1, snout: 1.3, tailL: 0.15 }); g.userData.ctnPlain = 1; return r; };
}
if (typeof CT_BODIES !== "undefined" && typeof CTD_SET !== "undefined")
Object.keys(CT_BODIES).forEach(function (k) {
if (CTD_SET[k])
return;
CTD_SET[k] = function (g, o) { g.userData.ctnPlain = 1; CT_BODIES[k](g, o || null); return { r: 1.4, s: [{ x: 0, z: 0, r: 0.6, h: 2.2 }] }; };
});
if (typeof ctsClear === "function")
ctsClear = function (x, z, kn) { return __ZC(354, 205, this, arguments, new.target); };
if (typeof CTD_SET !== "undefined") {
CTD_SET.flowerbed = function (g, o) { return __ZC(354, 206, this, arguments, new.target); };
}
CT_SCN.alice = { mid: [["mushrooms", 26, 0, 1.2], ["card", 18, 0, 1.3, { col: 0xB82A2A, n: 3, gap: 4 }], ["teacup", 20, 0, 1.8, { col: 0x4A8AD8 }], ["tree", 24, 0, 1, { kind: "fruit", h: 12, crown: 0x4A9A3A, fruit: 0xC82A3A }], ["rosebox", 30, 0, 0.8], ["flowerbed", 16, 0, 1.12, {}], ["tophat", 18, 0, 1.4, { col: 0x6A3A8A }]],
ch: [
[["lake", 44, -70, 1, { R: 22, col: 0x3A7AA8 }], ["boat", 6, 40, 0.9, { kind: "row", col: 0x8A5A3A, at: 0 }], ["tree", 22, -35, 1, { kind: "willow", h: 14, crown: 0x5A9A3A }], ["k:hedge", 18, 40, 1.2, { k: 1, n: 3 }], ["watch", 26, 25, 1, { r: 4 }],
["jars", 30, 60, 0.6, { col: 0xD8862A, n: 4 }], ["tallclock", 34, 80, 1.2], ["globe", 28, 100, 0.7], ["flowerbed", 14, -90, 1.04, {}], ["folk", 12, -110, 1, { folk: "lady", sex: "f" }]],
[["lake", 36, 10, 1, { R: 18, col: 0x4A8AB8 }], ["blindwall", 34, -60, 1], ["blindwall", 34, 60, 1], ["teatable", 20, -30, 0.7], ["oillamp", 22, 40, 0.5, { col: 0x6A8AC8 }], ["egg", 24, 85, 0.4],
["tallclock", 28, -95, 1], ["k:bird", 30, 20, 1, { k: 1, walk: 1 }], ["k:bird", 34, -15, 1, { k: 1, walk: 1 }], ["clam", 22, 110, 0.5]],
[["stones", 28, 0, 1, { R: 12, n: 14, col: 0xC8A0D8 }], ["k:bird", 20, -40, 1.6, { k: 1, walk: 1 }], ["k:rat", 22, 45, 1.4, { beast: "rat" }], ["k:dog", 24, 70, 1, { beast: "dog" }], ["k:crab", 20, -60, 1.4, { beast: "crab" }], ["teacup", 18, -80, 1.2, { col: 0xC8A040 }],
["tree", 30, -110, 1, { kind: "oak", h: 14 }], ["haystack", 28, 110, 0.8], ["flowerbed", 16, -20, 1.28, {}], ["clam", 20, 30, 0.5]],
[["mushrooms", 34, -55, 2.2, { r: 12 }], ["mushrooms", 38, 60, 1.8, { r: 12 }], ["tree", 30, 95, 1.4, { kind: "fruit", h: 16, crown: 0x5AA840, fruit: 0xD84A8A }], ["k:giantmushroom", 22, -20, 1.4, { k: 1 }], ["k:giantmushroom", 24, 25, 1.2, { k: 1 }],
["flowerbed", 18, -90, 1.4, {}], ["flowerbed", 18, 90, 1.4, {}], ["k:grass", 14, 130, 2.4, { k: 1 }], ["nest", 26, -120, 1.6]],
[["house", 28, -50, 1, { w: 9, d: 8, h: 5, col: 0xE8C8A0, roof: 0x8A4A2A, chim: 1 }], ["k:fish", 16, -30, 1.4, { beast: "fish" }], ["k:frog", 16, -18, 1.6, { beast: "frog" }], ["potfire", 22, 40, 1.2],
["teacup", 20, 70, 1, { col: 0x4A8AD8 }], ["k:cat", 22, -80, 1.6, { beast: "cat" }], ["tree", 34, 90, 1.2, { kind: "oak", h: 16 }], ["grin", 34, 90, 1.2, { over: 1, y: 14 }], ["k:hedge", 24, 120, 1, { k: 1, n: 2 }]],
[["harehouse", 34, -60, 1.2], ["teatable", 18, 30, 1.6], ["tophat", 20, 55, 1.6, { col: 0x5A3A2A, band: 0xD8D0C0 }], ["teapot", 22, -25, 1.3, { col: 0xC84A8A }], ["teacup", 16, 75, 1.6, { col: 0x4A8AD8, n: 3, arc: 10 }],
["watch", 30, 95, 1.2, { r: 4 }], ["tallclock", 28, -100, 1.4], ["tree", 40, 10, 1.3, { kind: "oak", h: 18 }], ["flowerbed", 16, -130, 1.28, {}]],
[["garden", 30, -60, 1.4, { col: 0xC82A3A }], ["croquet", 22, 40, 2.4], ["card", 18, -30, 1.3, { col: 0xB82A2A, n: 5, gap: 3.4 }], ["card", 22, 70, 1.3, { col: 0x2A2A2A, round: 1, n: 4, gap: 3.4 }], ["rosebox", 34, 100, 1],
["flowerbed", 16, 90, 1.4, {}], ["banner", 24, -100, 1.4, { col: 0xB82A3A, n: 3, gap: 5 }], ["k:fountain", 34, 0, 1.2, { k: 1 }], ["folk", 14, -80, 1, { folk: "guard" }]],
[["stands", 24, -60, 0.8], ["card", 18, 30, 1.4, { col: 0xB82A2A, n: 6, arc: 12 }], ["teatable", 16, -25, 0.8], ["throne", 22, 60, 1.2, { col: 0xB82A3A }], ["banner", 26, -100, 1.4, { col: 0xB82A3A, n: 2, gap: 6 }],
["k:bird", 20, 90, 1.2, { k: 1, walk: 1 }], ["tallclock", 28, 110, 1], ["k:hedge", 30, -130, 1.2, { k: 1, n: 3 }]]
] };
CT_SCN.tirnanog = { mid: [["stones", 30, 0, 0.6, { n: 7, R: 6 }], ["k:rock", 20, 0, 1.4, { k: 1 }], ["boat", 24, 0, 1, { kind: "row", col: 0x7A5A3A }], ["k:standingstones", 30, 0, 0.8, { k: 1 }], ["tree", 24, 0, 1, { kind: "fruit", h: 12, crown: 0x4AA04A, fruit: 0xD8B048 }], ["k:reeds", 16, 0, 1.4, { k: 1 }]],
ch: [
[["k:horse", 16, -30, 1.1, { beast: "horse", look: { coat: 0xE8E4DC } }], ["k:horse", 22, 50, 1, { beast: "horse" }], ["k:dog", 18, 65, 1, { beast: "dog" }], ["k:dog", 20, 75, 1, { beast: "dog" }], ["tents", 34, -70, 0.8],
["folk", 14, 40, 1, { folk: "soldier" }], ["folk", 15, 55, 1, { folk: "soldier" }], ["lake", 50, 10, 1, { R: 28, col: 0x3A7AA8 }], ["k:rock", 30, 100, 1.6, { k: 1 }], ["banner", 24, -100, 1, { col: 0x3A8A4A, n: 2, gap: 4 }]],
[["lake", 40, 0, 1, { R: 30, col: 0x2A7AAA }], ["k:stag", 30, -30, 1.2, { beast: "stag" }], ["wolf", 34, -24, 1.1, { col: 0xD8D0C0 }], ["tower", 60, 40, 1.2, { col: 0xC8C0B0 }], ["lighthouse", 48, -60, 1], ["k:rock", 24, 80, 1.8, { k: 1, n: 2 }],
["boat", 8, -30, 1, { kind: "felucca", sail: 0xC8C0AC, at: 0 }], ["k:bird", 26, 110, 1, { k: 1, walk: 1 }]],
[["tree", 28, -40, 1, { kind: "fruit", h: 14, crown: 0x5AB04A, fruit: 0xD8B048, n: 3, gap: 9 }], ["feasttable", 20, 30, 1.4], ["pavilion", 30, 70, 1, { col: 0x3A8A5A, c2: 0xD8B048 }], ["biglyre", 22, -90, 0.8], ["banner", 24, 100, 1, { col: 0xD8B048, n: 3, gap: 4 }],
["k:fountain", 34, 0, 1.2, { k: 1 }], ["flowerbed", 18, -110, 1.4, {}], ["folk", 14, 50, 1, { folk: "greek", sex: "f" }], ["folk", 16, -60, 1, { folk: "robe" }]],
[["lake", 40, 40, 1, { R: 26, col: 0x2A6A9A }], ["k:horse", 16, -25, 1.1, { beast: "horse", look: { coat: 0xE8E4DC } }], ["stones", 36, -70, 0.8, { R: 8, n: 9 }], ["k:rock", 30, 90, 2, { k: 1 }], ["tree", 30, -110, 1, { kind: "willow", h: 12, crown: 0x4A8A4A }],
["boat", 6, 10, 1, { kind: "row", at: 0 }], ["k:reeds", 20, 100, 1.6, { k: 1 }]],
[["burnt", 30, -50, 1.4], ["ruins", 36, 60, 1.2, { col: 0x8A8478 }], ["k:rock", 20, 30, 2.4, { k: 1 }], ["folk", 18, 20, 1, { folk: "peasant", look: { top: 0x6A5A4A, bottom: 0x6A5A4A } }], ["folk", 19, 36, 1, { folk: "peasant", look: { top: 0x5A6A4A, bottom: 0x5A6A4A } }], ["folk", 20, 44, 1, { folk: "peasant", look: { top: 0x7A5A3A, bottom: 0x7A5A3A } }],
["k:horse", 14, -20, 1.1, { beast: "horse", look: { coat: 0xE8E4DC } }], ["k:bush", 24, -100, 1.6, { k: 1, n: 3 }], ["runestone", 26, 100, 1.2]],
[["church", 34, 60, 0.8], ["cross", 22, -30, 1.4, { col: 0x8A8478 }], ["runestone", 24, -60, 1.4], ["camp", 18, 35, 1], ["folk", 14, 40, 1, { folk: "monk" }], ["folk", 14, -40, 1, { folk: "monk" }],
["k:graveyard", 34, -100, 0.8, { k: 1 }], ["k:bush", 26, 110, 1.4, { k: 1 }], ["well", 22, 90, 1]]
] };
CT_SCN.orpheus = { mid: [["k:crystalspire", 24, 0, 1, { k: 1 }], ["tree", 22, 0, 1, { kind: "dead", h: 12, trunk: 0x3A3438 }], ["stones", 28, 0, 0.5, { n: 6, R: 5, col: 0x4A4450 }], ["k:rock", 18, 0, 1.6, { k: 1 }], ["runestone", 16, 0, 1.2, { col: 0x4A4450 }], ["k:brazier", 18, 0, 1, { k: 1 }]],
ch: [
[["feasttable", 22, -30, 1.4], ["pavilion", 30, 40, 1, { col: 0xE8E2D4, c2: 0xC8A040 }], ["flowerbed", 16, 70, 1.4, {}], ["k:brazier", 18, -60, 1, { k: 1 }], ["tree", 30, -90, 1, { kind: "fruit", h: 14, crown: 0x4A9A3A, fruit: 0xC8A040 }],
["biglyre", 24, 100, 0.7], ["folk", 14, -15, 1, { folk: "greek" }], ["folk", 15, 20, 1, { folk: "greek", sex: "f" }], ["banner", 24, 120, 1, { col: 0xE8E2D4, n: 2, gap: 5 }]],
[["cliff", 40, -40, 1, { col: 0x4A4450 }], ["k:crystalspire", 28, 40, 1.2, { k: 1 }], ["tree", 24, 80, 1, { kind: "dead", h: 12, trunk: 0x2A2428 }], ["stones", 30, -90, 0.6, { R: 6, n: 7, col: 0x4A4450 }], ["k:brazier", 18, 30, 1, { k: 1 }],
["k:ghost", 20, -20, 1, { beast: "ghost" }], ["k:ghost", 22, 25, 1, { beast: "ghost" }], ["k:ghost", 26, 10, 1, { beast: "ghost" }]],
[["lake", 36, 0, 1, { R: 24, col: 0x2A2A4A }], ["boat", 4, 180, 1.2, { kind: "row", col: 0x2A2420, at: 0 }], ["fig", 0, 0, 1.1, { col: 0x3A3A3A, alt: 0.9, at: 1 }], ["k:ghost", 20, -50, 1, { beast: "ghost", n: 5, gap: 1.6 }],
["k:reeds", 22, 60, 1.6, { k: 1 }], ["k:brazier", 18, 40, 1, { k: 1 }], ["tree", 30, 100, 1, { kind: "dead", h: 14, trunk: 0x2A2428 }], ["flowerbed", 20, -100, 1.12, {}]],
[["k:cerberus", 22, -10, 2.4, { beast: "cerberus" }], ["hadesgate", 48, 30, 0.6], ["k:brazier", 18, -50, 1, { k: 1 }], ["k:brazier", 18, 50, 1, { k: 1 }], ["bones", 26, 70, 1], ["k:crystalspire", 30, -90, 1, { k: 1 }], ["stones", 34, 100, 0.6, { R: 6, n: 7, col: 0x4A4050 }]],
[["throne", 22, -25, 1.2, { col: 0x2A2A3A }], ["throne", 22, 25, 1.2, { col: 0x4A2A4A }], ["k:rock", 34, -70, 2.4, { k: 1 }], ["folk", 30, -62, 1, { folk: "peasant", look: { top: 0x8A7A6A, bottom: 0x8A7A6A } }], ["lake", 34, 80, 1, { R: 8, col: 0x2A3A5A }], ["tree", 34, 80, 0.8, { kind: "fruit", h: 10, crown: 0x3A5A3A, fruit: 0x8A2A3A }],
["k:brazier", 18, -50, 1, { k: 1 }], ["k:brazier", 18, 50, 1, { k: 1 }], ["stones", 36, 120, 0.6, { R: 6, n: 7, col: 0x4A4450 }]],
[["arch", 30, 0, 1.4, { col: 0x8A8070 }], ["cliff", 44, -60, 0.8, { col: 0x5A5458 }], ["cliff", 44, 60, 0.8, { col: 0x5A5458 }], ["k:brazier", 16, -30, 1, { k: 1 }], ["k:brazier", 16, 30, 1, { k: 1 }], ["stones", 26, -100, 0.5, { R: 5, n: 6 }], ["k:rock", 24, 100, 1.4, { k: 1 }]],
[["tree", 24, -40, 1, { kind: "oak", h: 16, n: 3, gap: 8 }], ["k:stag", 22, 30, 1.2, { beast: "stag" }], ["wolf", 24, 50, 1], ["k:bird", 20, 70, 1, { k: 1, walk: 1 }], ["biglyre", 18, -10, 0.6], ["k:rock", 30, 100, 1.6, { k: 1 }], ["bull", 26, -90, 1], ["flowerbed", 16, 120, 1.28, {}]]
] };
CT_SCN.perseus = { mid: [["k:statue", 22, 0, 1, { k: 1 }], ["temple", 34, 0, 0.5], ["k:palm", 20, 0, 1, { k: 1 }], ["ruins", 28, 0, 0.6], ["k:rock", 18, 0, 1.4, { k: 1 }], ["tree", 22, 0, 1, { kind: "cedar", h: 12, crown: 0x3A6A3A }]],
ch: [
[["feasttable", 20, -30, 1.4], ["k:horse", 24, 30, 1, { beast: "horse" }], ["k:horse", 26, 42, 1, { beast: "horse" }], ["k:horse", 28, 54, 1, { beast: "horse" }], ["house", 34, -70, 1, { w: 8, d: 7, h: 5, col: 0xE8E2D4, roof: 0xB8643A, rk: "flat" }],
["k:statue", 22, 90, 1, { k: 1 }], ["folk", 14, -15, 1, { folk: "greek" }], ["folk", 15, 20, 1, { folk: "noble" }], ["banner", 26, -110, 1, { col: 0x3A5AA8, n: 2, gap: 5 }]],
[["mirrorshield", 18, -30, 1.6], ["k:pegasus", 30, 40, 1.2, { beast: "pegasus" }], ["k:statue", 26, -70, 1.2, { k: 1 }], ["k:altar", 20, 30, 1, { k: 1 }], ["temple", 40, 90, 0.5, { col: 0xE8E2D4 }], ["k:brazier", 18, -50, 1, { k: 1 }], ["tree", 30, -110, 1, { kind: "cedar", h: 12 }]],
[["k:witch", 16, -20, 1, { beast: "witch" }], ["k:witch", 16, 0, 1, { beast: "witch" }], ["k:witch", 16, 20, 1, { beast: "witch" }], ["potfire", 20, 40, 1], ["k:rock", 28, -60, 2.2, { k: 1 }],
["k:crystalspire", 30, 80, 1, { k: 1 }], ["stones", 34, 110, 0.6, { R: 6, n: 7, col: 0xB8B8C0 }], ["iceslabs", 34, -110, 0.8]],
[["stonemen", 26, -30, 1.2, { n: 12 }], ["k:statue", 22, 40, 1, { k: 1, n: 3, gap: 5 }], ["quad", 26, 70, 1, { L: 2.4, H: 1.4, col: 0x9A9A98, neck: 0.6 }], ["wolf", 24, -80, 1, { col: 0x9A9A98 }], ["k:rock", 30, 100, 2, { k: 1 }], ["ruins", 34, -110, 0.8, { col: 0xA8A8A8 }]],
[["k:gorgon", 24, -10, 1.2, { beast: "gorgon" }], ["k:pegasus", 26, 40, 1.6, { beast: "pegasus" }], ["mirrorshield", 16, -20, 1.4], ["stonemen", 30, -60, 1, { n: 8 }], ["bones", 24, 80, 1], ["k:rock", 28, -100, 1.8, { k: 1 }], ["lake", 36, 110, 1, { R: 10, col: 0x3A6A7A }]],
[["chainedrock", 26, -10, 1.4], ["lake", 40, 0, 1, { R: 28, col: 0x2A6AA8 }], ["seamonster", 4, 0, 1.2, { at: 1, alt: -1 }], ["fig", 20, -60, 1, { col: 0xD8B048, hat: 0xD8B048 }], ["folk", 20, -70, 1, { folk: "villager", sex: "f", look: { top: 0x8A3A6A, bottom: 0x8A3A6A, topKind: "dress", bottomKind: "skirt" } }], ["palace", 48, -100, 0.6, { col: 0xE8E2D4 }], ["k:rock", 24, 80, 1.6, { k: 1 }]],
[["feasttable", 20, -30, 1.2], ["stonemen", 28, 30, 1, { n: 9 }], ["stands", 30, 80, 0.8], ["k:statue", 24, -70, 1.2, { k: 1 }], ["banner", 24, 100, 1.2, { col: 0xD8B048, n: 3, gap: 5 }], ["k:fountain", 34, -110, 1, { k: 1 }], ["folk", 14, -10, 1, { folk: "greek", sex: "f" }]]
] };
CT_SCN.nemo = { mid: [["coralgarden", 20, 0, 1.4], ["clam", 18, 0, 1.4], ["k:rock", 22, 0, 1.6, { k: 1 }], ["wreck", 34, 0, 0.6], ["diver", 14, 0, 1], ["bones", 22, 0, 1.4], ["squid", 30, 0, 1, { r: 8 }]],
ch: [
[["steamer", 44, -40, 0.8], ["ironclad", 40, 50, 0.9], ["cannon", 22, -20, 1.2], ["barrels", 20, 30, 1, { n: 6 }], ["diver", 16, 60, 1], ["dogfish", 50, 0, 0.6, { alt: 6, r: 8 }], ["k:rock", 26, 100, 1.6, { k: 1 }]],
[["nautilus", 40, 40, 1, { r: 16 }], ["globe", 20, -30, 0.8], ["k:orrery", 18, 25, 1, { k: 1 }], ["tallclock", 22, -60, 1, { col: 0x3A2A1A }], ["armchairs", 18, 60, 1.2], ["clueTable", 20, -90, 1], ["coralgarden", 30, 100, 1.4], ["diver", 14, -110, 1]],
[["diver", 16, -20, 1.1, { n: 3, gap: 2.4 }], ["coralgarden", 26, 40, 2], ["tree", 30, -60, 1, { kind: "willow", h: 14, crown: 0x6A3A5A }], ["tree", 34, 70, 1, { kind: "willow", h: 12, crown: 0x3A6A5A }], ["k:crystalspire", 30, 100, 1, { k: 1 }], ["squid", 36, -100, 1.2, { r: 8 }], ["clam", 18, -120, 0.6]],
[["clam", 22, -20, 2.6], ["diver", 18, 30, 1], ["dogfish", 30, 60, 0.5, { alt: 3, r: 6 }], ["coralgarden", 28, 90, 1.4], ["k:rock", 26, -110, 1.8, { k: 1 }]],
[["temple", 40, -40, 0.9, { col: 0x7A8A8A }], ["ruins", 34, 40, 1.4, { col: 0x8A9A9A }], ["colossus", 30, 80, 1, { col: 0x7A8A8A }], ["arch", 30, -80, 1.2, { col: 0x7A8A8A }], ["stonemen", 26, 110, 1, { n: 6 }], ["k:statue", 22, -110, 1.2, { k: 1 }], ["diver", 14, 20, 1, { n: 2, gap: 2.4 }]],
[["iceslabs", 30, -30, 1.6], ["iceslabs", 30, 40, 1.4], ["banner", 20, 0, 1.4, { col: 0x1A1A1A }], ["k:crystalspire", 34, 80, 1.4, { k: 1 }], ["k:bird", 20, -70, 1, { k: 1, walk: 1, n: 3 }], ["iceship", 50, -100, 0.6], ["k:rock", 26, 110, 1.6, { k: 1 }]],
[["k:kraken", 30, -20, 1, { beast: "kraken" }], ["squid", 36, 50, 1.6, { r: 10 }], ["nautilus", 44, 90, 0.7, { r: 12 }], ["folk", 20, 20, 1, { folk: "peasant", look: { top: 0x3A3A4A, bottom: 0x3A3A4A }, n: 3, gap: 2.0 }], ["coralgarden", 30, -80, 1.2], ["bones", 24, -110, 1]],
[["lake", 40, 0, 1, { R: 30, col: 0x1A4A6A }], ["stones", 0, 0, 1.2, { R: 22, n: 16, col: 0x2A5A7A, at: 0, alt: 0 }], ["boat", 10, 60, 1, { kind: "row", col: 0x6A4A2E, at: 0 }], ["wreck", 44, 60, 0.6], ["k:rock", 30, -90, 2, { k: 1 }], ["cliff", 50, 100, 0.8, { col: 0x3A4A50 }]]
] };
CT_SCN.mermaid = { mid: [["coralgarden", 20, 0, 1.4], ["clam", 16, 0, 0.6], ["clam", 18, 0, 1.2], ["k:rock", 22, 0, 1.6, { k: 1 }], ["tree", 24, 0, 1, { kind: "willow", h: 12, crown: 0x7A3A5A }], ["k:statue", 22, 0, 1, { k: 1 }]],
ch: [
[["seapalace", 44, -30, 0.8, { r: 20 }], ["garden", 26, 40, 1, { col: 0xC84A3A }], ["garden", 28, 70, 1, { col: 0x3A8AC8 }], ["k:mermaid", 22, -30, 1, { beast: "mermaid", n: 3, gap: 3 }], ["fig", 22, -70, 1.4, { col: 0xC8C0B4, base: 0x8A8070 }], ["coralgarden", 30, 100, 1.6], ["tree", 30, -100, 1, { kind: "willow", h: 12, crown: 0xB85A6A }],
["clam", 18, -20, 1.2], ["clam", 18, 20, 0.6]],
[["lake", 40, 0, 1, { R: 30, col: 0x2A6A9A }], ["ship", 8, -60, 1, { at: 0 }], ["wreck", 48, 60, 0.8], ["k:rock", 26, -70, 1.8, { k: 1 }], ["barrels", 20, 80, 1], ["lanterns", 22, -90, 1], ["k:bird", 22, 110, 1, { k: 1, walk: 1, n: 2 }]],
[["throne", 20, -20, 1, { col: 0x8A5A7A }], ["clam", 18, 30, 0.6], ["coralgarden", 28, -60, 1.4], ["clam", 22, 60, 1.4], ["k:crystalspire", 30, 90, 1, { k: 1 }], ["tree", 30, -100, 1, { kind: "willow", h: 12, crown: 0x5A8A9A }]],
[["bones", 22, -30, 1.6], ["bones", 24, 40, 1.2], ["tree", 30, -70, 1, { kind: "dead", h: 12, trunk: 0x3A4A3A, n: 3, gap: 6 }], ["k:octopus", 30, 70, 1.4, { beast: "octopus" }], ["k:snake", 22, -20, 1.4, { beast: "snake", n: 2, gap: 3 }], ["lake", 36, 0, 1, { R: 10, col: 0x1A3A2A }], ["skullrock", 44, 100, 0.6], ["k:cauldron", 18, 20, 1.2, { k: 1 }]],
[["palace", 44, -40, 0.7, { col: 0xF0E8D8 }], ["garden", 28, 40, 1.2], ["k:fountain", 24, -80, 1.2, { k: 1 }], ["lake", 50, 90, 1, { R: 22, col: 0x3A7AB8 }], ["ship", 4, 0, 0.7, { at: 3 }], ["banner", 22, -20, 1.2, { col: 0xD84A6A, n: 3, gap: 4 }], ["k:statue", 26, 70, 1, { k: 1 }], ["folk", 14, 20, 1, { folk: "noble" }], ["folk", 15, 30, 1, { folk: "lady", sex: "f" }]],
[["lake", 40, 0, 1, { R: 30, col: 0x3A7AB8 }], ["ship", 6, 0, 0.9, { at: 0 }], ["banner", 26, 40, 1.4, { col: 0xE8B8C8, n: 3, gap: 4 }], ["k:crystalspire", 30, 80, 1.2, { k: 1 }], ["k:bird", 22, -70, 1, { k: 1, walk: 1, n: 3 }]]
] };
CT_SCN.cthulhu = { mid: [["runestone", 18, 0, 1.2, { col: 0x2A3A34 }], ["k:rock", 22, 0, 1.8, { k: 1 }], ["tree", 24, 0, 1, { kind: "dead", h: 12, trunk: 0x2A2A28 }], ["idol", 20, 0, 0.8], ["stones", 28, 0, 0.5, { n: 6, R: 5, col: 0x2A3A34 }], ["k:graveyard", 30, 0, 0.6, { k: 1 }]],
ch: [
[["house", 30, -50, 1, { w: 10, d: 8, h: 7, col: 0x7A7A70, roof: 0x3A3A40, storey: 1 }], ["house", 34, 50, 1, { w: 9, d: 8, h: 6.5, col: 0x6A6A62, roof: 0x3A3A40, storey: 1 }], ["gaslamp", 16, -20, 1, { n: 3, gap: 8 }], ["clueTable", 18, 30, 1], ["hansom", 22, 80, 1],
["k:tree", 28, -90, 1, { k: 1 }], ["folk", 14, 40, 1, { folk: "victorian" }], ["pillarbox", 14, -40, 1]],
[["rlyeh", 120, 0, 0.25, { r: 24 }], ["tower", 30, -50, 1, { col: 0x5A5A6A }], ["idol", 22, 40, 1], ["runestone", 20, -20, 1.2, { col: 0x2A3A34 }], ["k:crystalspire", 30, 80, 1, { k: 1 }], ["house", 30, -90, 1, { w: 8, d: 8, h: 6, col: 0x6A6A62, roof: 0x3A3A40 }]],
[["lake", 40, -30, 1, { R: 20, col: 0x2A3A28 }], ["tree", 28, 30, 1, { kind: "willow", h: 14, crown: 0x3A4A2A, n: 3, gap: 8 }], ["stones", 30, -80, 1, { R: 10, n: 12, col: 0x3A3A34 }], ["idol", 30, -80, 1], ["k:brazier", 22, 60, 1, { k: 1, n: 3, gap: 5 }],
["fig", 20, -10, 1, { col: 0x2A2A4A, hat: 0x2A2A4A, n: 3, gap: 2 }], ["k:reeds", 20, 100, 1.6, { k: 1 }], ["cabin", 34, 100, 1]],
[["lake", 40, 0, 1, { R: 30, col: 0x1E3A34 }], ["steamer", 8, 90, 0.6, { at: 0 }], ["wreck", 44, -60, 0.9], ["rlyeh", 160, 10, 0.35, { r: 30 }], ["k:rock", 24, -80, 1.8, { k: 1 }], ["barrels", 20, 80, 1]],
[["idolstone", 22, -20, 1.4], ["obelisk", 30, 40, 1.4, { col: 0x3A4A3A }], ["stones", 34, -70, 1, { R: 10, n: 10, col: 0x2A3A34 }], ["k:crystalspire", 30, 80, 1.2, { k: 1 }], ["bones", 24, 100, 1], ["runestone", 20, -100, 1.4, { col: 0x2A3A34 }]]
] };
CT_SCN.jekyll = { mid: [["gaslamp", 14, 0, 1, { n: 3, gap: 9 }], ["hansom", 18, 0, 1], ["house", 24, 0, 1, { w: 9, d: 8, h: 9, col: 0x6A5A4A, roof: 0x3A3A40, storey: 1 }], ["pillarbox", 12, 0, 1], ["k:tree", 20, 0, 1, { k: 1 }], ["rosebox", 26, 0, 0.9]],
ch: [
[["blindwall", 24, -30, 1.2], ["house", 30, 40, 1, { w: 10, d: 8, h: 9, col: 0x8A5A4A, roof: 0x3A3A40, storey: 1 }], ["house", 32, 70, 1, { w: 9, d: 8, h: 8, col: 0x7A6A5A, roof: 0x3A3A40, storey: 1 }], ["gaslamp", 14, -20, 1, { n: 3, gap: 8 }], ["hansom", 22, 90, 1], ["pillarbox", 14, 50, 1],
["folk", 13, 30, 1, { folk: "victorian" }], ["folk", 14, 40, 1, { folk: "victorian" }]],
[["gaslamp", 14, -30, 1, { n: 4, gap: 7 }], ["blindwall", 26, 30, 1], ["house", 32, -70, 1, { w: 9, d: 8, h: 8, col: 0x5A4A4A, roof: 0x2A2A30, storey: 1 }], ["hansom", 22, 70, 1], ["k:tree", 26, -110, 1, { k: 1 }], ["barrels", 18, 100, 0.8, { n: 3 }]],
[["feasttable", 18, -30, 1], ["armchairs", 20, 30, 1.2], ["house", 34, 60, 1, { w: 12, d: 9, h: 8, col: 0xA89880, roof: 0x3A3A40, storey: 1 }], ["garden", 30, -70, 1], ["k:fountain", 30, 100, 1, { k: 1 }], ["gaslamp", 16, -100, 1, { n: 2, gap: 8 }], ["folk", 13, 20, 1, { folk: "victorian" }]],
[["house", 28, -40, 1, { w: 9, d: 8, h: 9, col: 0x6A6A6A, roof: 0x2A2A30, storey: 1 }], ["gaslamp", 14, -10, 1, { n: 3, gap: 8 }], ["fig", 18, 30, 1, { col: 0x2A2A4A, hat: 0x2A2A4A, n: 2, gap: 2 }], ["hansom", 22, 70, 1], ["skydisc", 400, 30, 1, { sky: 1, alt: 160, R: 14, col: 0x8A8A7C }],
["pillarbox", 14, 60, 1], ["street", 44, 100, 0.6]],
[["labbench", 18, -20, 1.2], ["jars", 22, 30, 0.5, { col: 0x6A8A6A, n: 6 }], ["house", 32, 60, 1, { w: 10, d: 9, h: 8, col: 0x7A6A5A, roof: 0x3A3A40 }], ["k:hourglass", 16, 40, 1, { k: 1 }], ["tallclock", 22, -60, 1], ["barrels", 22, 90, 0.8, { n: 4 }], ["folk", 13, -40, 1, { folk: "maid", sex: "f" }]],
[["clueTable", 16, -20, 1], ["armchairs", 18, 30, 1], ["k:mirrorstand", 18, 50, 1, { k: 1 }], ["labbench", 20, -60, 1], ["jars", 22, 80, 0.4, { col: 0x8A6A9A, n: 4 }], ["tallclock", 22, -100, 1], ["k:lectern", 14, 10, 1, { k: 1 }]]
] };
CT_SCN.invisible = { mid: [["house", 26, 0, 1, { w: 8, d: 7, h: 5, col: 0xD8D0C0, roof: 0x7A5A4A, chim: 1 }], ["k:fence", 16, 0, 1.2, { k: 1, n: 3 }], ["haystack", 20, 0, 1], ["k:tree", 22, 0, 1, { k: 1 }], ["k:hedge", 16, 0, 1, { k: 1, n: 2 }], ["well", 18, 0, 1]],
ch: [
[["house", 28, -40, 1, { w: 12, d: 9, h: 7, col: 0xD8D0C0, roof: 0x5A4A3A, storey: 1, chim: 1, snow: 1 }], ["innsign", 18, -10, 1.2], ["coach", 24, 40, 1, { col: 0x3A2A1A }], ["k:horse", 24, 30, 1, { beast: "horse" }], ["invisible", 14, 20, 1.1],
["k:fence", 20, 70, 1.2, { k: 1, n: 3 }], ["barrels", 20, -70, 1], ["folk", 13, 50, 1, { folk: "villager", sex: "f" }]],
[["house", 28, 40, 1, { w: 10, d: 8, h: 7, col: 0xC8C0B0, roof: 0x4A4A4A, storey: 1 }], ["k:graveyard", 30, -60, 0.8, { k: 1 }], ["k:tree", 24, -100, 1, { k: 1 }], ["clueTable", 18, -20, 1], ["gaslamp", 14, 60, 1, { n: 2, gap: 7 }], ["folk", 14, 30, 1, { folk: "monk" }]],
[["banner", 22, -30, 1.2, { col: 0xB83A3A, n: 4, gap: 4 }], ["pavilion", 28, 30, 1, { col: 0xD84A4A, c2: 0xE8E0D0 }], ["k:marketstall", 24, 70, 1, { k: 1 }], ["carousel", 34, -80, 0.8], ["invisible", 16, 10, 1.1], ["folk", 14, 40, 1, { folk: "villager", sex: "f" }], ["folk", 15, -40, 1, { folk: "farmer" }]],
[["camp", 16, -20, 1], ["shoe", 22, 20, 0.12], ["k:rock", 26, 60, 1.6, { k: 1 }], ["k:bush", 24, -60, 1.4, { k: 1, n: 3 }], ["haystack", 30, 100, 1], ["folk", 14, -10, 1, { folk: "peasant" }], ["k:fence", 22, -110, 1.2, { k: 1, n: 3 }]],
[["house", 30, -40, 1, { w: 12, d: 10, h: 8, col: 0xE0D8C8, roof: 0x4A4A52, storey: 1 }], ["observatory", 34, 50, 0.7], ["telescope", 18, 20, 1], ["garden", 26, -90, 1], ["k:tree", 28, 100, 1, { k: 1, n: 2 }], ["gaslamp", 14, -10, 1]],
[["folk", 18, -30, 1, { folk: "peasant", look: { top: 0x6A5A4A, bottom: 0x6A5A4A }, n: 4, gap: 2.0 }], ["k:dog", 22, 30, 1, { beast: "dog" }], ["k:dog", 24, 40, 1, { beast: "dog" }], ["house", 30, 70, 1, { w: 9, d: 7, h: 6, col: 0xC8B8A0, roof: 0x6A4A3A }], ["k:fence", 20, -80, 1.2, { k: 1, n: 3 }], ["church", 44, -110, 0.6], ["invisible", 16, 10, 1.1]]
] };
CT_SCN.sleepyhollow = { mid: [["pumpkins", 16, 0, 1], ["tree", 24, 0, 1, { kind: "dead", h: 14, trunk: 0x3A3028 }], ["k:fence", 14, 0, 1.2, { k: 1, n: 3 }], ["haystack", 20, 0, 1], ["cornfield", 26, 0, 0.8, { n: 7 }], ["farmhouse", 30, 0, 1], ["ravenpost", 14, 0, 1]],
ch: [
[["cabin", 26, -40, 1.1], ["fig", 14, -20, 1.1, { col: 0x2A2A2A, hat: 0x2A2A2A }], ["k:bench", 18, 30, 1, { k: 1, n: 2 }], ["lake", 40, 70, 1, { R: 10, col: 0x2A4A5A }], ["tree", 28, -80, 1, { kind: "oak", h: 16, crown: 0x7A5A2A }], ["pumpkins", 20, 100, 1],
["k:fence", 22, -110, 1.2, { k: 1, n: 3 }], ["folk", 13, 40, 1, { folk: "kid" }], ["folk", 14, 50, 1, { folk: "kid2" }]],
[["house", 34, -50, 1, { w: 14, d: 10, h: 7, col: 0x8A2A20, roof: 0x4A3A30, rh: 5 }], ["haystack", 22, -20, 1.2, { n: 3, gap: 6 }], ["cornfield", 30, 50, 1, { n: 8 }], ["tree", 28, 90, 1, { kind: "fruit", h: 12, crown: 0x6A7A2A, fruit: 0xB83A2A, n: 3, gap: 8 }], ["pumpkins", 18, 30, 1.4], ["k:bird", 18, -70, 1, { k: 1, walk: 1, n: 3 }],
["well", 20, -100, 1], ["k:fence", 22, 120, 1.2, { k: 1, n: 3 }], ["folk", 13, -30, 1, { folk: "villager", sex: "f" }]],
[["feasttable", 20, -30, 1.4], ["lanterns", 22, 30, 1.4], ["potfire", 18, 60, 1], ["pumpkins", 22, -70, 1.2], ["haystack", 26, 90, 1, { n: 2, gap: 6 }], ["house", 36, -100, 0.9, { w: 14, d: 10, h: 7, col: 0x8A2A20, roof: 0x4A3A30, rh: 5 }],
["folk", 13, -10, 1, { folk: "farmer" }], ["folk", 14, 20, 1, { folk: "villager", sex: "f" }], ["folk", 15, 40, 1, { folk: "farmer" }]],
[["tree", 30, -40, 1.6, { kind: "dead", h: 22, trunk: 0x3A3028 }], ["horseman", 22, 30, 1.4], ["lake", 36, 70, 1, { R: 14, col: 0x1E2A2A }], ["k:reeds", 22, 90, 1.6, { k: 1 }], ["ravenpost", 18, -80, 1], ["skydisc", 400, 0, 1, { sky: 1, alt: 150, R: 14, col: 0x8A8A7C }],
["k:fence", 20, 110, 1.2, { k: 1, n: 3 }], ["tree", 30, -110, 1, { kind: "dead", h: 14, trunk: 0x2A2420 }]],
[["k:graveyard", 30, -50, 1, { k: 1 }], ["pumpkins", 18, 20, 0.8], ["tophat", 16, -10, 0.25, { col: 0x2A2A2A }], ["lake", 34, 70, 1, { R: 10, col: 0x2A3A3A }], ["cross", 24, -90, 1, { n: 3, gap: 3 }], ["tree", 30, 100, 1, { kind: "dead", h: 16 }], ["k:horse", 22, 40, 1, { beast: "horse", look: { coat: 0x5A4A3A } }]]
] };
CT_SCN.dracula = { mid: [["tree", 22, 0, 1, { kind: "dead", h: 14, trunk: 0x2A2428 }], ["cross", 14, 0, 1], ["k:rock", 20, 0, 1.6, { k: 1 }], ["wolf", 20, 0, 1], ["coach", 18, 0, 1], ["ravenpost", 14, 0, 1], ["k:graveyard", 28, 0, 0.6, { k: 1 }]],
ch: [
[["coach", 20, -20, 1.2, { col: 0x1A1A1E }], ["quad", 20, -14, 1, { L: 2.4, H: 1.5, col: 0x1A1A1A, neck: 0.7, mane: 0x0A0A0A }], ["wolf", 24, 30, 1, { col: 0x3A3A3A, n: 4, gap: 2.4 }], ["k:pine", 30, -60, 1.2, { k: 1, n: 3 }], ["cliff", 44, 70, 0.8, { col: 0x3A3438 }], ["k:spiritfire", 22, 50, 1, { k: 1 }],
["k:rock", 26, 100, 1.8, { k: 1 }], ["cross", 18, -100, 1]],
[["cragcastle", 120, 0, 0.5, { r: 24 }], ["earthboxes", 22, -30, 1], ["k:weaponrack", 18, 30, 1, { k: 1 }], ["tallclock", 22, 60, 1, { col: 0x2A1A1A }], ["k:brazier", 16, -60, 1, { k: 1 }], ["banner", 24, 90, 1.2, { col: 0x5A1A1A, n: 2, gap: 5 }], ["ravenpost", 20, -100, 1]],
[["wreck", 34, -30, 1], ["lake", 40, -30, 1, { R: 22, col: 0x2A3A4A }], ["ruins", 50, 50, 1.4, { col: 0x6A6460 }], ["k:graveyard", 30, 80, 0.8, { k: 1 }], ["wolf", 20, 10, 1.4, { col: 0x1A1A1A }], ["k:bench", 18, -80, 1, { k: 1 }], ["cliff", 54, 100, 0.8, { col: 0x5A5450 }]],
[["house", 30, -40, 1, { w: 12, d: 9, h: 8, col: 0x8A7A70, roof: 0x3A3A40, storey: 1 }], ["garden", 24, 40, 1, { col: 0xD8D0C0 }], ["flowerbed", 16, -10, 1.12, {}], ["hansom", 22, 70, 1], ["gaslamp", 14, -70, 1, { n: 2, gap: 7 }], ["k:tree", 28, 100, 1, { k: 1 }], ["folk", 13, 20, 1, { folk: "victorian" }]],
[["earthboxes", 22, -20, 1.2, { n: 9 }], ["church", 40, 40, 0.7, { col: 0x6A6460 }], ["k:graveyard", 30, -70, 1, { k: 1 }], ["k:tomb", 24, 80, 1, { k: 1 }], ["cross", 18, -100, 1, { n: 3, gap: 3 }], ["gaslamp", 14, 40, 1], ["wolf", 22, 110, 1]],
[["coach", 22, -20, 1.2, { col: 0x5A4A3A }], ["earthboxes", 20, -10, 0.6, { n: 3 }], ["k:horse", 24, 30, 1, { beast: "horse" }], ["k:horse", 26, 40, 1, { beast: "horse" }], ["k:pine", 30, -60, 1.2, { k: 1, n: 3 }], ["wolf", 24, 70, 1, { n: 3, gap: 2.4 }],
["camp", 18, 100, 1], ["cragcastle", 160, 10, 0.6, { r: 30 }], ["folk", 14, -40, 1, { folk: "peasant" }]]
] };
CT_SCN.thor = { mid: [["k:pine", 20, 0, 1.2, { k: 1 }], ["runestone", 16, 0, 1.2], ["sledge", 18, 0, 1], ["k:goat", 20, 0, 1, { beast: "goat", n: 2, gap: 1.6 }], ["k:rock", 22, 0, 1.6, { k: 1 }], ["cabin", 26, 0, 0.9]],
ch: [
[["chariot", 18, -20, 1.2], ["k:goat", 18, 20, 1.2, { beast: "goat", n: 2, gap: 1.6 }], ["cabin", 28, -50, 1], ["potfire", 18, 40, 1], ["bones", 20, 60, 0.6], ["k:pine", 28, -90, 1.2, { k: 1, n: 3 }], ["folk", 13, -30, 1, { folk: "peasant" }], ["folk", 14, 40, 1, { folk: "villager", sex: "f" }], ["hammer", 16, 0, 0.4]],
[["hand", 60, -30, 0.6, { r: 14 }], ["k:rock", 30, 40, 2.4, { k: 1 }], ["k:giant", 40, 60, 1.6, { beast: "giant" }], ["k:pine", 34, -80, 1.4, { k: 1, n: 3 }], ["camp", 16, 20, 1], ["iceslabs", 30, 100, 0.8]],
[["cragcastle", 140, 0, 0.5, { r: 24 }], ["banner", 22, -30, 1.4, { col: 0x3A3A3A, n: 3, gap: 5 }], ["k:frostgiant", 30, 40, 1, { beast: "frostgiant" }], ["k:giant", 32, 60, 1, { beast: "giant" }], ["k:brazier", 18, -60, 1.2, { k: 1, n: 2, gap: 6 }], ["iceslabs", 30, 90, 0.8], ["k:pine", 34, -100, 1.4, { k: 1 }]],
[["feasttable", 20, -20, 1.6], ["shieldhall", 44, 40, 0.5], ["k:cat", 24, 70, 2.4, { beast: "cat" }], ["k:giant", 30, -30, 1, { beast: "giant" }], ["k:brazier", 16, -50, 1, { k: 1 }], ["barrels", 20, -80, 1, { n: 6 }], ["banner", 24, 100, 1.2, { col: 0x8A2A2A, n: 2, gap: 5 }], ["folk", 14, 10, 1, { folk: "viking" }]],
[["banner", 22, -40, 1.2, { col: 0x2A4AA8, n: 3, gap: 20 }], ["stones", 30, 40, 1, { R: 12, n: 14 }], ["k:pine", 30, -80, 1.2, { k: 1, n: 3 }], ["folk", 20, 10, 1, { folk: "peasant", look: { top: 0x6A4A2A, bottom: 0x6A4A2A } }], ["folk", 22, 25, 1, { folk: "peasant", look: { top: 0x8A8AA0, bottom: 0x8A8AA0 } }], ["camp", 18, 100, 1]],
[["ruins", 30, -30, 1.2, { col: 0xA8B0B8 }], ["k:crystalspire", 28, 40, 1.2, { k: 1 }], ["crater", 34, 80, 1], ["crater", 38, -80, 0.8], ["hammer", 18, 10, 0.5], ["iceslabs", 30, 110, 1], ["k:pine", 34, -110, 1.2, { k: 1 }]]
] };
CT_SCN.odin = { mid: [["runestone", 16, 0, 1.2], ["k:pine", 22, 0, 1.2, { k: 1 }], ["wolf", 20, 0, 1], ["ravenpost", 14, 0, 1], ["stones", 28, 0, 0.5, { n: 7, R: 5 }], ["sleipnir", 22, 0, 1]],
ch: [
[["sleipnir", 18, -30, 1.2], ["ravenpost", 16, 20, 1.2], ["wolf", 20, 40, 1.2, { col: 0x5A5A5A }], ["wolf", 22, 50, 1.2, { col: 0x6A6A6A }], ["k:pine", 30, -70, 1.2, { k: 1, n: 3 }], ["camp", 16, -10, 1], ["k:rock", 28, 90, 1.8, { k: 1 }], ["runestone", 22, -100, 1.2]],
[["k:dragon", 30, 40, 0.4, { k: 1 }], ["k:roc", 28, -60, 0.6, { beast: "roc" }], ["well", 22, 60, 1.4], ["stones", 32, 90, 0.8, { R: 8, n: 9 }], ["k:stag", 22, -90, 1.2, { beast: "stag", n: 2, gap: 3 }], ["k:goat", 24, 110, 1, { beast: "goat", n: 2, gap: 1.6 }]],
[["well", 18, -10, 1.6], ["k:rock", 24, 30, 2, { k: 1 }], ["runestone", 20, -40, 1.4, { n: 3, gap: 3 }], ["k:altar", 20, 60, 1, { k: 1 }], ["tree", 30, -80, 1, { kind: "oak", h: 18, crown: 0x3A6A3A }], ["k:brazier", 16, 80, 1, { k: 1 }], ["ravenpost", 18, 110, 1]],
[["tree", 34, -20, 1.2, { kind: "blasted", h: 24, trunk: 0x4A3A2A }], ["fig", 3, 0, 1, { col: 0x5A5A62, cape: 0x3A3A42, alt: 10, at: 0 }], ["staff", 20, 30, 0.12], ["runestone", 20, 60, 1.2, { n: 3, gap: 3 }], ["ravenpost", 18, -60, 1], ["wolf", 22, 90, 1], ["k:spiritfire", 22, -100, 1, { k: 1 }]],
[["runestone", 18, -30, 1.6, { n: 4, gap: 3 }], ["stones", 30, 40, 1, { R: 10, n: 12 }], ["k:altar", 20, 70, 1, { k: 1 }], ["k:brazier", 16, -70, 1, { k: 1 }], ["shieldhall", 50, 100, 0.4], ["folk", 14, 20, 1, { folk: "viking" }], ["folk", 15, -20, 1, { folk: "viking", sex: "f" }]]
] };
CT_SCN.frankenstein = { mid: [["iceslabs", 24, 0, 0.8], ["k:pine", 22, 0, 1.2, { k: 1 }], ["k:rock", 20, 0, 1.6, { k: 1 }], ["sledge", 18, 0, 1], ["house", 28, 0, 1, { w: 8, d: 7, h: 5, col: 0xC8C0B0, roof: 0x4A4A52, snow: 1 }], ["tree", 22, 0, 1, { kind: "dead", h: 12 }]],
ch: [
[["iceship", 44, -30, 0.8], ["iceslabs", 28, 30, 1.4], ["sledge", 20, -10, 1.2], ["wolf", 22, 0, 0.9, { col: 0x8A8A8A, n: 4, gap: 1.8 }], ["folk", 20, 50, 1, { folk: "peasant", look: { top: 0x3A3A4A, bottom: 0x3A3A4A } }], ["k:crystalspire", 34, 80, 1.2, { k: 1 }], ["iceslabs", 34, -90, 1]],
[["house", 30, -40, 1, { w: 12, d: 10, h: 9, col: 0xD8D0C0, roof: 0x4A4A52, storey: 1 }], ["lake", 44, 50, 1, { R: 22, col: 0x3A6A9A }], ["boat", 4, 0, 1, { kind: "row", at: 1 }], ["church", 44, -90, 0.6], ["garden", 26, 90, 1], ["k:tree", 26, -120, 1, { k: 1 }], ["folk", 14, 20, 1, { folk: "scholar" }]],
[["labbench", 18, -20, 1.4], ["jars", 22, 30, 0.6, { col: 0x6A8A6A, n: 8 }], ["engine", 26, 60, 0.7], ["k:hourglass", 16, -50, 1, { k: 1 }], ["tallclock", 22, -80, 1, { col: 0x2A1A1A }], ["tower", 34, 90, 0.8, { col: 0x6A6A70 }], ["k:brazier", 16, 110, 1, { k: 1 }]],
[["cottage", 24, -40, 1.2, { col: 0x8A7A60 }], ["cabin", 28, 40, 0.8], ["k:fence", 20, 70, 1.2, { k: 1, n: 3 }], ["garden", 26, -80, 0.8, { col: 0x6A8A3A }], ["k:tree", 28, 100, 1, { k: 1, n: 2 }], ["folk", 13, -20, 1, { folk: "peasant" }], ["folk", 14, -10, 1, { folk: "villager", sex: "f" }], ["k:pine", 30, -110, 1.2, { k: 1 }]],
[["iceslabs", 26, -30, 1.6], ["mountain", 120, 40, 0.6, { r: 60, h: 80, col: 0x8A9AA8 }], ["k:crystalspire", 30, 70, 1.4, { k: 1 }], ["k:golem", 30, -10, 1, { beast: "golem" }], ["k:rock", 24, -80, 1.8, { k: 1 }], ["iceslabs", 30, 100, 1.2]],
[["sledge", 18, -20, 1.2], ["wolf", 20, -10, 0.9, { col: 0x8A8A8A, n: 4, gap: 1.8 }], ["iceslabs", 28, 30, 1.4], ["sledge", 50, 40, 1], ["tree", 22, 70, 1, { kind: "dead", h: 12 }], ["k:crystalspire", 30, -80, 1.2, { k: 1 }], ["camp", 18, 100, 1]],
[["iceship", 40, -20, 0.9], ["iceslabs", 30, 40, 1.2], ["k:spiritfire", 22, -60, 1, { k: 1 }], ["k:golem", 34, 60, 1, { beast: "golem" }], ["k:crystalspire", 34, 90, 1, { k: 1 }], ["iceslabs", 34, -100, 1]]
] };
CT_SCN.oz = { mid: [["cornfield", 26, 0, 0.8, { n: 7 }], ["house", 24, 0, 1, { round: 1, rk: "dome", w: 6, h: 3, col: 0x3A5AB8, roof: 0x2A4AA0 }], ["k:fence", 14, 0, 1.2, { k: 1, n: 3 }], ["tree", 22, 0, 1, { kind: "fruit", h: 12, crown: 0x3A8A3A, fruit: 0xC82A2A }], ["flowerbed", 16, 0, 1.12, {}], ["scarecrowpost", 18, 0, 1.2]],
ch: [
[["farmhouse", 26, -40, 1.2], ["k:fence", 18, -20, 1.2, { k: 1, n: 3 }], ["shaftcap", 20, 20, 0.5], ["k:tornado", 80, 60, 0.6, { k: 1, walk: 1 }], ["house", 30, 80, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0x3A5AB8, roof: 0x2A4AA0 }], ["house", 34, 100, 1, { round: 1, rk: "dome", w: 6, h: 3, col: 0x3A5AB8, roof: 0x2A4AA0 }],
["shoe", 18, -80, 0.1, { col: 0xA8A8B0 }], ["fig", 16, -60, 0.8, { col: 0x3A5AB8, hat: 0x3A5AB8, tall: 1, n: 3, gap: 1.4 }], ["flowerbed", 14, 120, 1.12, {}]],
[["cornfield", 28, -30, 1.4, { n: 11 }], ["scarecrowpost", 20, -20, 1.4], ["ravenpost", 18, 30, 1], ["house", 30, 60, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0x3A5AB8, roof: 0x2A4AA0 }], ["k:fence", 22, 90, 1.2, { k: 1, n: 3 }], ["haystack", 24, -80, 1], ["k:bird", 18, 10, 1, { k: 1, walk: 1, n: 3 }]],
[["tree", 24, -40, 1, { kind: "oak", h: 18, crown: 0x2E6A2A, n: 4, gap: 8 }], ["fig", 18, 20, 1.2, { col: 0x8A8A92, arms: "up", hat: 0x8A8A92, tall: 1 }], ["cottage", 30, 60, 1, { col: 0x6A5A40 }], ["k:log", 18, -80, 1.2, { k: 1 }], ["k:stump", 16, 90, 1, { k: 1, n: 2 }], ["k:axe", 14, 40, 1, { k: 1 }]],
[["tree", 28, -30, 1.4, { kind: "oak", h: 22, crown: 0x2A5A2A, n: 3, gap: 10 }], ["k:tiger", 22, 30, 1.6, { beast: "tiger" }], ["k:bear", 24, 46, 1.2, { beast: "bear" }], ["k:lion", 18, -20, 1.2, { beast: "lion" }], ["cliff", 44, 60, 0.7, { col: 0x8A7A60 }], ["k:log", 20, 90, 1.6, { k: 1 }], ["k:rock", 24, -90, 1.6, { k: 1 }], ["tree", 30, 110, 1, { kind: "oak", h: 18 }]],
[["lake", 40, -50, 1, { R: 16, col: 0x3A7AA8 }], ["boat", 3, 0, 1, { kind: "raft", at: 0 }], ["garden", 26, 40, 1.4, { col: 0xC82A2A }], ["garden", 30, 80, 1.2, { col: 0xC82A2A }], ["flowerbed", 18, -10, 1.3, { col: 0xC82A3A, R: 10, fl: 180, r: 10 }], ["flowerbed", 24, 100, 1.3, { col: 0xC82A3A, R: 10, fl: 180, r: 10 }], ["flowerbed", 34, -50, 1.3, { col: 0xC82A3A, R: 10, fl: 180, r: 10 }], ["tree", 30, -100, 1, { kind: "willow", h: 12 }]],
[["city", 120, 0, 0.4, { col: 0x2E8A4A, roof: 0x1E6A3A, cols: [0x2E8A4A, 0x3AA05A, 0x267A42], round: 1, hmax: 80, R: 30, wallC: 0x2A7A44, spire: 0.55, n: 14, r: 36 }], ["house", 24, -40, 1, { w: 7, d: 6, h: 6, col: 0x3AA05A, roof: 0x1E6A3A, rk: "dome" }],
["house", 26, 40, 1, { w: 7, d: 6, h: 6, col: 0x3AA05A, roof: 0x1E6A3A, rk: "dome" }], ["k:fountain", 22, -80, 1.2, { k: 1 }], ["banner", 20, 80, 1.2, { col: 0x2E8A4A, n: 3, gap: 4 }], ["folk", 13, -20, 1, { folk: "villager", look: { top: 0x2E8A4A, bottom: 0x2E8A4A } }], ["folk", 14, 20, 1, { folk: "guard", look: { top: 0x2E8A4A } }]],
[["k:witch", 20, -10, 1.1, { beast: "witch" }], ["k:bats", 24, -40, 1, { beast: "bats" }], ["ape", 20, 30, 1.2], ["ape", 22, 45, 1], ["wolf", 24, -70, 1, { col: 0x4A4A4A, n: 3, gap: 2.4 }], ["banner", 22, 80, 1.4, { col: 0xD8C838, n: 3, gap: 5 }], ["well", 18, 10, 1.2], ["fig", 18, -10, 1, { col: 0xD8C838, hat: 0xD8C838, n: 3, gap: 1.4 }]],
[["balloon", 34, -40, 1, { col: 0x2E8A4A, stripe: 0xB8B070, r: 7 }], ["throne", 20, 20, 1.4, { col: 0x2E8A4A }], ["k:fountain", 26, 70, 1, { k: 1 }], ["banner", 22, -80, 1.2, { col: 0x2E8A4A, n: 2, gap: 5 }], ["k:mirrorstand", 18, -20, 1.2, { k: 1 }], ["folk", 14, 40, 1, { folk: "victorian" }]],
[["house", 26, -40, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0xC83A3A, roof: 0xA82A2A }], ["house", 28, 40, 1, { round: 1, rk: "dome", w: 7, h: 3.4, col: 0xC83A3A, roof: 0xA82A2A }], ["porcelain", 50, 80, 0.3], ["shoe", 18, -10, 0.1, { col: 0xA8A8B0 }], ["garden", 28, -80, 1, { col: 0xE85A5A }],
["k:fountain", 24, 100, 1, { k: 1 }], ["folk", 13, 20, 1, { folk: "lady", sex: "f", look: { top: 0xE85A5A, bottom: 0xE85A5A } }]]
] };
CT_SCN.wukong = { mid: [["k:rock", 20, 0, 1.6, { k: 1 }], ["pagoda", 30, 0, 0.5], ["lanterns", 16, 0, 1], ["paifang", 24, 0, 0.7], ["tree", 22, 0, 1, { kind: "cedar", h: 12, crown: 0x3A6A3A }], ["k:bush", 16, 0, 1.4, { k: 1 }]],
ch: [
[["egg", 22, -20, 1.4, { col: 0x9A8A7A }], ["falls", 60, 40, 0.4, { h: 30, r: 16 }], ["ape", 18, 30, 1, { n: 3, gap: 2 }], ["ape", 20, -50, 0.8, { n: 3, gap: 2 }], ["tree", 28, 70, 1, { kind: "fruit", h: 14, crown: 0x4A9A3A, fruit: 0xE88A2A, n: 3, gap: 8 }], ["flowerbed", 16, -80, 1.28, {}], ["k:rock", 26, -110, 2, { k: 1 }]],
[["mountain", 80, -10, 0.4, { r: 40, h: 50, col: 0x7A5A40, snow: false }], ["ape", 34, -10, 1.4], ["k:rock", 24, 40, 2, { k: 1, n: 2, gap: 6 }], ["tree", 28, -60, 1, { kind: "fruit", h: 10, crown: 0x4A8A3A, fruit: 0xD8A040 }], ["runestone", 22, 70, 1.4, { col: 0xB8A070 }], ["k:bush", 20, -100, 1.4, { k: 1 }]],
[["k:horse", 18, -20, 1.1, { beast: "horse", look: { coat: 0xE8E4DC } }], ["tents", 30, 30, 0.8], ["camp", 16, -50, 1], ["paifang", 30, 70, 0.8], ["pagoda", 44, -90, 0.5], ["folk", 14, -35, 1, { folk: "monk", look: { top: 0xD8A040, bottom: 0xD8A040 } }], ["ape", 14, 10, 1]],
[["flamemount", 34, -30, 1.2], ["k:lavaflow", 30, 40, 1, { k: 1, walk: 1 }], ["burnt", 26, 70, 1], ["k:rock", 22, -70, 1.8, { k: 1 }], ["tree", 24, 100, 1, { kind: "dead", h: 12, trunk: 0x2A1A10 }], ["bones", 22, -100, 1]],
[["cave", 34, -30, 1, { col: 0x5A3A2A }], ["folk", 18, 20, 1, { folk: "villager", sex: "f", look: { top: 0x8A2A2A, bottom: 0x8A2A2A, topKind: "dress", bottomKind: "skirt" } }], ["lanterns", 22, 50, 1], ["k:rock", 24, -70, 1.8, { k: 1 }], ["tents", 30, 90, 0.7], ["pavilion", 28, -100, 1, { col: 0x8A2A2A, c2: 0xD8B048 }]],
[["bull", 24, -20, 1.6, { col: 0x2A2A2A }], ["pagoda", 36, 40, 0.7], ["lanterns", 22, 70, 1.2], ["camp", 18, -60, 1], ["paifang", 30, -100, 0.8], ["ape", 16, 20, 1]],
[["flamemount", 40, -40, 0.8], ["lake", 36, 40, 1, { R: 14, col: 0x3A7AA8 }], ["tree", 24, 70, 1, { kind: "fruit", h: 12, crown: 0x4A9A3A, fruit: 0xD8A040, n: 3, gap: 8 }], ["flowerbed", 16, -80, 1.28, {}], ["ruins", 30, 100, 0.8, { col: 0x5A3A2A }], ["pagoda", 44, -110, 0.5]]
] };
CT_SCN.laputa = { mid: [["k:floatingisland", 30, 0, 0.4, { k: 1 }], ["observatory", 26, 0, 0.6], ["telescope", 14, 0, 1], ["k:orrery", 16, 0, 1, { k: 1 }], ["globe", 16, 0, 0.8], ["k:statue", 20, 0, 1, { k: 1 }]],
ch: [
[["boat", 22, -20, 1, { kind: "row", col: 0x6A4A2E }], ["k:rock", 24, 30, 2, { k: 1, n: 3, gap: 6 }], ["floatisle", 60, 0, 0.25, { y: 46, R: 30, sky: 1 }], ["lake", 40, -60, 1, { R: 18, col: 0x3A7AA8 }], ["wreck", 44, 80, 0.5], ["k:bird", 20, 100, 1, { k: 1, walk: 1 }]],
[["palace", 44, -30, 0.6, { col: 0xC8C8D8 }], ["garden", 26, 40, 1], ["k:fountain", 24, 70, 1, { k: 1 }], ["observatory", 30, -80, 0.7], ["fig", 16, -20, 1, { col: 0x5A5A8A, hat: 0x5A5A8A, n: 3, gap: 1.4 }], ["banner", 22, 100, 1.2, { col: 0x5A5A8A, n: 2, gap: 5 }]],
[["feasttable", 18, -20, 1.4], ["egg", 22, 30, 0.3, { col: 0xC8A040 }], ["pyramid", 24, 50, 0.08], ["obelisk", 22, -60, 0.6], ["k:orrery", 18, 70, 1, { k: 1 }], ["globe", 22, -90, 0.7], ["folk", 13, 10, 1, { folk: "noble" }]],
[["observatory", 30, -40, 0.8], ["telescope", 18, 20, 1.2], ["telescope", 20, 40, 1], ["k:orrery", 20, -70, 1.4, { k: 1 }], ["globe", 20, 80, 1], ["skydisc", 400, 30, 1, { sky: 1, alt: 180, R: 10, col: 0x8A8A7C }], ["folk", 13, -10, 1, { folk: "scholar" }]],
[["k:orrery", 18, -20, 1.2, { k: 1 }], ["globe", 20, 30, 1.2], ["clueTable", 18, 60, 1], ["tower", 30, -60, 0.8, { col: 0xD8D8E8 }], ["village", 50, 90, 0.5], ["k:hourglass", 16, -100, 1, { k: 1 }]],
[["obelisk", 24, -30, 1.6, { col: 0x6A6AA8 }], ["k:crystalspire", 26, 30, 1.4, { k: 1 }], ["shaftcap", 20, 60, 0.8], ["engine", 26, -70, 0.7], ["k:orrery", 20, 90, 1.2, { k: 1 }], ["stones", 32, -110, 0.6, { R: 6, n: 7, col: 0x8A8AC8 }]],
[["house", 26, -40, 1, { w: 8, d: 7, h: 5, col: 0xB8B8C8, roof: 0x5A5A6A, rk: "flat" }], ["engine", 22, 30, 0.8], ["k:windmill", 34, 60, 0.8, { k: 1 }], ["labbench", 18, -10, 1], ["jars", 22, 80, 0.5, { col: 0x6A8A3A, n: 6 }], ["house", 30, -90, 1, { w: 7, d: 6, h: 4, col: 0xB8B8C8, roof: 0x5A5A6A, rk: "cone" }], ["folk", 13, 20, 1, { folk: "scholar" }]]
] };
CT_SCN.martians = { mid: [["house", 26, 0, 1, { w: 8, d: 7, h: 5, col: 0xC8B8A0, roof: 0x6A4A3A, chim: 1 }], ["redweedpatch", 20, 0, 1], ["k:tree", 22, 0, 1, { k: 1 }], ["burnt", 24, 0, 0.8], ["k:hedge", 16, 0, 1, { k: 1, n: 2 }], ["k:fence", 14, 0, 1.2, { k: 1, n: 3 }]],
ch: [
[["observatory", 30, -40, 0.8], ["telescope", 18, 20, 1.2], ["house", 30, 50, 1, { w: 9, d: 8, h: 6, col: 0xC8B8A0, roof: 0x6A4A3A, chim: 1 }], ["k:tree", 26, -80, 1, { k: 1, n: 2 }], ["gaslamp", 14, 80, 1, { n: 2, gap: 7 }], ["skydisc", 500, 20, 1, { sky: 1, alt: 160, R: 6, col: 0x8A4A2A }], ["folk", 13, -10, 1, { folk: "victorian" }]],
[["cylinder", 28, -10, 1.2], ["crater", 28, -10, 1.4], ["fig", 22, 30, 1, { col: 0x5A4A3A, hat: 0x2A2A2A, n: 5, gap: 1.4 }], ["k:fence", 20, 60, 1.2, { k: 1, n: 3 }], ["burnt", 30, -60, 0.8], ["k:tree", 26, 90, 1, { k: 1, n: 2 }], ["folk", 14, -40, 1, { folk: "victorian" }]],
[["burnt", 26, -30, 1.2], ["tree", 24, 30, 1, { kind: "blasted", h: 14, trunk: 0x1E1A18, n: 3, gap: 6 }], ["banner", 18, -10, 1, { col: 0xB8B0A0 }], ["crater", 30, 60, 1], ["k:fence", 20, -80, 1.2, { k: 1, n: 3 }], ["house", 30, 100, 1, { w: 8, d: 7, h: 5, col: 0x8A7A6A, roof: 0x3A2A2A }]],
[["tripod", 40, -30, 1.4], ["tripod", 60, 40, 1.2], ["cannon", 20, 10, 1.2, { n: 3, gap: 3 }], ["lake", 44, 80, 1, { R: 20, col: 0x3A5A6A }], ["church", 44, -90, 0.6], ["burnt", 26, 110, 0.8]],
[["redweedpatch", 22, -10, 1.6], ["ruins", 28, -40, 1, { col: 0x8A6A5A }], ["burnt", 26, 40, 1], ["lake", 34, 80, 1, { R: 14, col: 0x6A2A2A }], ["tree", 24, -80, 1, { kind: "dead", h: 12 }], ["tripod", 60, 100, 0.9]],
[["shaftcap", 18, -20, 0.8], ["tents", 28, 30, 0.6], ["cottage", 28, -60, 1], ["barrels", 18, 60, 1, { n: 5 }], ["k:fence", 20, 90, 1.2, { k: 1, n: 3 }], ["folk", 13, 10, 1, { folk: "soldier" }]],
[["tripod", 44, -20, 1.2], ["street", 44, 50, 0.6], ["k:bird", 22, 10, 1, { k: 1, walk: 1, n: 3 }], ["burnt", 26, -70, 1], ["hansom", 20, 80, 1], ["gaslamp", 14, -40, 1, { n: 3, gap: 8 }], ["k:statue", 24, 110, 1, { k: 1 }]]
] };
CT_SCN.arabian = { mid: [["k:palm", 18, 0, 1.2, { k: 1, n: 2, gap: 6 }], ["k:camel", 20, 0, 1, { beast: "camel" }], ["k:marketstall", 18, 0, 1, { k: 1 }], ["jars", 18, 0, 0.6, { n: 4 }], ["house", 26, 0, 1, { w: 8, d: 7, h: 5, col: 0xD8C8A0, roof: 0xD8C8A0, rk: "dome" }], ["tents", 28, 0, 0.6], ["carpet", 18, 0, 1, { y: 2.4 }]],
ch: [
[["palace", 44, -30, 0.6, { col: 0xE8D8B8, dome: 0x2A6AA8 }], ["k:fountain", 24, 30, 1.2, { k: 1 }], ["cushions", 16, -10, 1.2], ["oillamp", 18, 20, 0.5], ["k:palm", 24, -70, 1.2, { k: 1, n: 3, gap: 6 }], ["lanterns", 20, 70, 1.2], ["folk", 13, -20, 1, { folk: "lady", sex: "f", look: { top: 0x6A2A8A, bottom: 0x6A2A8A } }], ["folk", 14, 30, 1, { folk: "noble" }]],
[["k:horse", 22, -30, 1, { beast: "horse", n: 4, gap: 2.6 }], ["tree", 24, 40, 1, { kind: "oak", h: 14, crown: 0x6A7A3A }], ["treasure", 20, -70, 1.2], ["jars", 22, 70, 0.6, { n: 6 }], ["k:camel", 22, 100, 1, { beast: "camel" }], ["k:rock", 28, -100, 2, { k: 1 }]],
[["house", 24, -40, 1, { w: 7, d: 7, h: 6, col: 0xE8D8B8, roof: 0xE8D8B8, rk: "flat", n: 3, gap: 9 }], ["k:marketstall", 20, 40, 1, { k: 1, n: 2, gap: 6 }], ["well", 18, 70, 1], ["k:palm", 24, -90, 1, { k: 1 }], ["jars", 18, 100, 0.5, { n: 4 }], ["folk", 13, 20, 1, { folk: "desert", sex: "f" }], ["folk", 14, -15, 1, { folk: "desert" }]],
[["jars", 20, -20, 1.2, { n: 8 }], ["jars", 22, 30, 1.2, { n: 8 }], ["potfire", 18, 60, 1], ["k:camel", 22, -60, 1, { beast: "camel", n: 2, gap: 4 }], ["house", 30, 90, 1, { w: 9, d: 8, h: 6, col: 0xE8D8B8, roof: 0xE8D8B8, rk: "flat" }], ["k:palm", 24, -100, 1, { k: 1 }]],
[["oillamp", 18, -10, 1], ["tree", 22, -40, 1, { kind: "fruit", h: 10, crown: 0x2A8A6A, fruit: 0xB83A8A, n: 3, gap: 6 }], ["tree", 24, 40, 1, { kind: "fruit", h: 10, crown: 0x6A3A9A, fruit: 0x3AA0D8, n: 2, gap: 6 }], ["k:genie", 24, 10, 1.4, { beast: "genie" }], ["treasure", 20, 70, 1], ["palace", 50, 100, 0.5, { col: 0xE8D8F0, dome: 0xC8A040 }], ["carpet", 22, -80, 1.2, { y: 3 }]],
[["lake", 40, -10, 1, { R: 30, col: 0x2A7AAA }], ["dogfish", 6, 0, 0.8, { at: 0, alt: -1.4 }], ["boat", 16, -80, 1.4, { kind: "felucca", at: 0, mh: 10 }], ["camp", 16, 40, 1], ["k:palm", 24, 70, 1, { k: 1, n: 2, gap: 6 }], ["barrels", 20, -60, 1, { n: 4 }], ["folk", 13, 20, 1, { folk: "sailor" }]],
[["k:roc", 28, -20, 1, { beast: "roc" }], ["k:snake", 20, 50, 1.6, { beast: "snake", n: 3, gap: 3 }], ["egg", 26, 30, 1.4, { col: 0xD8D0C0 }], ["k:crystalspire", 22, 60, 1.2, { k: 1, n: 3, gap: 5 }], ["cliff", 44, -70, 0.8, { col: 0xC8A070 }], ["bones", 22, 90, 1], ["k:rock", 26, -110, 1.8, { k: 1 }]]
] };
CT_SCN.gilgamesh = { mid: [["ziggurat", 50, 0, 0.3], ["k:palm", 18, 0, 1.2, { k: 1, n: 2, gap: 6 }], ["house", 24, 0, 1, { w: 8, d: 7, h: 4, col: 0xC8A878, roof: 0xC8A878, rk: "flat" }], ["bull", 22, 0, 1], ["k:reeds", 16, 0, 1.4, { k: 1 }], ["tablets", 14, 0, 1]],
ch: [
[["ziggurat", 70, -20, 0.6], ["house", 24, -50, 1, { w: 8, d: 7, h: 4, col: 0xC8A878, roof: 0xC8A878, rk: "flat", n: 3, gap: 9 }], ["house", 26, 50, 1, { w: 8, d: 7, h: 4, col: 0xB8986A, roof: 0xB8986A, rk: "flat", n: 2, gap: 9 }], ["k:palm", 22, 90, 1.2, { k: 1, n: 2, gap: 6 }], ["banner", 20, -90, 1.2, { col: 0x2A5AA8, n: 3, gap: 5 }],
["folk", 13, -20, 1, { folk: "desert" }], ["folk", 14, 30, 1, { folk: "guard", look: { top: 0xC8A878 } }]],
[["lake", 30, -20, 1, { R: 12, col: 0x3A7AA8 }], ["k:stag", 24, 30, 1, { beast: "stag", n: 4, gap: 2.4 }], ["folk", 24, 10, 1, { folk: "peasant", look: { top: 0x8A6A4A, bottom: 0x8A6A4A } }], ["tents", 30, 70, 0.6], ["k:reeds", 20, -70, 1.6, { k: 1 }], ["k:rock", 26, 100, 1.6, { k: 1 }]],
[["tree", 26, -40, 1.4, { kind: "cedar", h: 24, crown: 0x2A5A2A, n: 4, gap: 10 }], ["tree", 30, 40, 1.4, { kind: "cedar", h: 22, crown: 0x2A5A2A, n: 3, gap: 10 }], ["k:ogre", 22, 10, 1.6, { beast: "ogre" }], ["k:axe", 16, -10, 1, { k: 1 }], ["k:log", 20, 80, 1.4, { k: 1 }], ["tree", 34, -100, 1.2, { kind: "cedar", h: 20 }]],
[["bull", 26, -10, 2.4, { col: 0x3A2A2A }], ["lake", 36, 50, 1, { R: 14, col: 0x3A7AA8 }], ["k:altar", 20, -50, 1, { k: 1 }], ["obelisk", 24, -80, 1, { col: 0xC8A878 }], ["k:palm", 24, 90, 1.2, { k: 1 }], ["banner", 22, -110, 1.2, { col: 0x8A2A3A, n: 2, gap: 5 }]],
[["lake", 40, -10, 1, { R: 26, col: 0x1E3A4A }], ["boat", 6, 0, 1.2, { kind: "reed", at: 0 }], ["fig", 0, 0, 1, { col: 0x6A5A4A, alt: 0.9, at: 1 }], ["k:scorpion", 24, 60, 2.4, { beast: "scorpion" }], ["k:scorpion", 26, -70, 2.4, { beast: "scorpion" }], ["cliff", 50, 90, 0.8, { col: 0x6A5A4A }]],
[["lake", 44, -20, 1, { R: 30, col: 0x3A6A8A }], ["ship", 4, 0, 1.2, { at: 0, col: 0x7A5A3A }], ["bull", 22, 40, 1], ["k:camel", 24, 55, 1, { beast: "camel" }], ["k:stag", 22, 70, 1, { beast: "stag", n: 2, gap: 2.4 }], ["k:bird", 20, -70, 1, { k: 1, walk: 1, n: 3 }], ["k:rock", 28, 100, 1.6, { k: 1 }]],
[["lake", 30, -30, 1, { R: 14, col: 0x2A6A9A }], ["flowerbed", 18, 20, 1.12, {}], ["tablets", 18, -10, 1.4], ["house", 28, 60, 1, { w: 8, d: 7, h: 4, col: 0xC8A878, roof: 0xC8A878, rk: "flat", n: 2, gap: 9 }], ["ziggurat", 80, 90, 0.4], ["k:palm", 24, -90, 1.2, { k: 1 }]]
] };
CT_SCN.columbiad = { mid: [["cannon", 16, 0, 1.4], ["tents", 26, 0, 0.6], ["banner", 14, 0, 1.2, { col: 0x3A5AA8 }], ["barrels", 18, 0, 1, { n: 5 }], ["k:tree", 22, 0, 1, { k: 1 }], ["train", 30, 0, 0.6, { cars: 2 }]],
ch: [
[["house", 30, -40, 1, { w: 14, d: 10, h: 9, col: 0x5A5A6A, roof: 0x3A3A40, storey: 1 }], ["cannon", 18, 20, 1.2, { n: 3, gap: 3 }], ["feasttable", 20, -10, 1], ["globe", 20, 50, 1], ["banner", 22, 80, 1.2, { col: 0x3A5AA8, n: 3, gap: 4 }], ["gaslamp", 14, -80, 1, { n: 2, gap: 7 }], ["folk", 13, -30, 1, { folk: "victorian" }], ["folk", 14, 30, 1, { folk: "soldier" }]],
[["tents", 28, -30, 0.7], ["ironclad", 40, 40, 0.4], ["k:tree", 24, -70, 1, { k: 1, n: 3 }], ["camp", 16, 20, 1], ["cannon", 20, 70, 1], ["folk", 13, -10, 1, { folk: "soldier" }]],
[["columbiad", 34, -10, 1], ["crater", 30, 40, 1.2], ["engine", 24, -50, 0.8], ["k:brazier", 18, 60, 1.2, { k: 1, n: 4, gap: 4 }], ["k:palm", 24, -90, 1, { k: 1, n: 2, gap: 6 }], ["train", 30, 90, 0.7, { cars: 3 }], ["tents", 30, -110, 0.6]],
[["steamer", 44, -30, 0.6], ["pavilion", 26, 30, 1.2, { col: 0x3A5AA8, c2: 0xE8E0D0 }], ["stands", 30, 70, 0.8], ["banner", 20, -70, 1.2, { col: 0xB83A3A, n: 3, gap: 4 }], ["folk", 13, 10, 1, { folk: "victorian" }], ["folk", 14, -20, 1, { folk: "sailor" }], ["folk", 15, 40, 1, { folk: "lady", sex: "f" }]],
[["barrels", 20, -20, 1.2, { n: 9 }], ["shell", 22, 20, 1.4], ["engine", 26, 60, 0.8], ["train", 34, -70, 0.7, { cars: 3 }], ["engine", 30, 90, 0.7], ["tents", 30, -110, 0.6]],
[["columbiad", 36, -10, 1.2], ["stands", 28, 40, 1], ["stands", 30, -50, 1], ["skydisc", 500, 0, 1, { sky: 1, alt: 200, R: 22, col: 0x7A7A6C }], ["banner", 22, 80, 1.2, { col: 0x3A5AA8, n: 4, gap: 4 }], ["banner", 18, -90, 1.2, { col: 0x3A5AA8 }]]
] };
CT_SCN.timemachine = { mid: [["ruins", 26, 0, 0.7, { col: 0xD8D0C0 }], ["morlockwell", 18, 0, 1], ["k:statue", 20, 0, 1, { k: 1 }], ["tree", 22, 0, 1, { kind: "fruit", h: 12, crown: 0x4A9A4A, fruit: 0xC84A6A }], ["flowerbed", 14, 0, 1.12, {}], ["porcelain", 40, 0, 0.2]],
ch: [
[["house", 30, -40, 1, { w: 12, d: 10, h: 9, col: 0xB8A890, roof: 0x3A3A40, storey: 1 }], ["feasttable", 18, -10, 1], ["timemachine", 18, 30, 0.5], ["armchairs", 20, 60, 1], ["gaslamp", 14, -70, 1, { n: 2, gap: 7 }], ["tallclock", 22, 90, 1], ["folk", 13, 20, 1, { folk: "victorian" }], ["folk", 14, -25, 1, { folk: "scholar" }]],
[["whitesphinx", 30, -20, 1], ["timemachine", 16, 20, 1], ["garden", 26, 50, 1, { col: 0xB84A8A }], ["ruins", 34, -70, 1, { col: 0xD8D0C0 }], ["flowerbed", 18, 90, 1.28, {}], ["tree", 28, -100, 1, { kind: "fruit", h: 12, crown: 0x4A9A4A, fruit: 0xC84A6A }]],
[["ruins", 30, -30, 1.6, { col: 0xC8C0B0 }], ["tree", 24, 30, 1, { kind: "fruit", h: 12, crown: 0x4A9A4A, fruit: 0xD87A3A, n: 3, gap: 7 }], ["feasttable", 18, -10, 1], ["flowerbed", 16, 60, 1.4, {}], ["folk", 13, 20, 0.8, { folk: "robe", child: 1 }], ["folk", 14, -20, 0.8, { folk: "robe", child: 1, sex: "f" }], ["folk", 15, 40, 0.8, { folk: "robe", child: 1 }]],
[["lake", 30, -20, 1, { R: 12, col: 0x3A7AA8 }], ["archbridge", 34, 40, 0.8], ["flowerbed", 16, 20, 1.4, {}], ["tree", 24, -70, 1, { kind: "willow", h: 12 }], ["garden", 28, 80, 1, { col: 0xD87AB8 }], ["folk", 13, 0, 0.8, { folk: "robe", child: 1, sex: "f" }]],
[["morlockwell", 20, -20, 1.4], ["morlockwell", 24, 40, 1.2], ["tower", 30, -60, 0.8, { col: 0xC8C0B0 }], ["shaftcap", 22, 70, 0.8], ["engine", 26, -100, 0.6], ["bones", 20, 100, 0.8]],
[["porcelain", 50, -20, 0.6], ["k:statue", 24, 30, 1, { k: 1, n: 3, gap: 5 }], ["engine", 22, -60, 0.8], ["bones", 22, 70, 1.2], ["globe", 18, 100, 0.8], ["k:weaponrack", 18, -100, 1, { k: 1 }]],
[["timemachine", 16, -10, 1], ["lake", 40, 30, 1, { R: 26, col: 0x3A2A2A }], ["skydisc", 500, 10, 1, { sky: 1, alt: 80, R: 60, col: 0x6A2A1A }], ["k:rock", 26, -60, 1.8, { k: 1, n: 3, gap: 6 }], ["squid", 30, 70, 0.6, { col: 0x6A2A2A, r: 4 }], ["tree", 24, -100, 1, { kind: "dead", h: 10 }]]
] };
CT_SCN.egypt = { mid: [["obelisk", 18, 0, 1], ["jackal", 18, 0, 1.2], ["k:palm", 20, 0, 1.2, { k: 1, n: 2, gap: 6 }], ["colossus", 30, 0, 0.8], ["k:reeds", 16, 0, 1.4, { k: 1 }], ["jars", 16, 0, 0.6, { n: 4 }]],
ch: [
[["k:tomb", 22, -30, 1.2, { k: 1 }], ["jackal", 18, 20, 1.4, { n: 2, gap: 5 }], ["jars", 18, -60, 0.7, { n: 4 }], ["tablets", 18, 60, 1.2], ["obelisk", 24, 90, 1.2], ["k:brazier", 16, -90, 1, { k: 1, n: 2, gap: 5 }], ["folk", 13, 10, 1, { folk: "robe" }]],
[["lake", 40, -10, 1, { R: 28, col: 0x2A4A6A }], ["boat", 4, 0, 1.6, { kind: "reed", at: 0, col: 0xD8B060 }], ["seamonster", 14, 80, 0.8, { at: 0, col: 0x5A4A2A, alt: -1 }], ["obelisk", 24, 60, 1.2], ["k:reeds", 20, -70, 1.6, { k: 1 }], ["k:palm", 24, 100, 1.2, { k: 1 }]],
[["arch", 22, -30, 1.2, { col: 0xC8A870 }], ["arch", 26, 30, 1.2, { col: 0xC8A870 }], ["jackal", 16, -15, 1.2], ["jackal", 16, 15, 1.2], ["colossus", 30, 70, 1], ["colossus", 30, -70, 1], ["k:brazier", 18, 100, 1, { k: 1 }]],
[["scales", 18, -10, 1.6], ["k:chimera", 22, 30, 1, { beast: "chimera" }], ["fig", 18, -40, 1.2, { col: 0xD8C8A0, base: 0x8A7A5A }], ["colossus", 30, 60, 1.2], ["colossus", 30, -70, 1.2], ["k:brazier", 18, 90, 1, { k: 1, n: 2, gap: 5 }]],
[["tablets", 18, -20, 1.6], ["fig", 20, 20, 0.9, { col: 0xC8B080, base: 0x6A6A5A, n: 6, gap: 2 }], ["k:bird", 18, -60, 1.4, { k: 1, walk: 1 }], ["k:mummy", 24, -30, 1, { beast: "mummy" }], ["obelisk", 24, 70, 1.2], ["jars", 20, -90, 0.6, { n: 4 }], ["k:palm", 24, 100, 1.2, { k: 1 }]],
[["throne", 18, -10, 1.6, { col: 0x2A6A4A }], ["folk", 20, -30, 1, { folk: "villager", sex: "f", look: { top: 0xD8C8A0, bottom: 0x2A5AA8, topKind: "dress", bottomKind: "skirt" } }], ["folk", 20, 10, 1, { folk: "villager", sex: "f", look: { top: 0xD8C8A0, bottom: 0xB83A2A, topKind: "dress", bottomKind: "skirt" } }], ["k:reeds", 24, 60, 2, { k: 1, n: 3, gap: 6 }], ["lake", 36, 80, 1, { R: 14, col: 0x3A7AA8 }], ["cornfield", 30, -80, 1, { n: 8 }]]
] };
CT_SCN.yokai = { mid: [["torii", 18, 0, 1], ["stonelantern", 14, 0, 1, { n: 2, gap: 4 }], ["tree", 22, 0, 1, { kind: "fruit", h: 10, crown: 0xD87AA8, fruit: 0xE8A8C8 }], ["pagoda", 30, 0, 0.5], ["bamboo", 16, 0, 1], ["lanterns", 16, 0, 1]],
ch: [
[["torii", 16, -20, 1.2, { n: 4, gap: 6 }], ["stonelantern", 14, 30, 1.2, { n: 3, gap: 4 }], ["fig", 20, -60, 0.8, { col: 0xA8A090, base: 0x6A6A60 }], ["fig", 20, 60, 0.8, { col: 0xA8A090, base: 0x6A6A60 }], ["tree", 28, 90, 1, { kind: "fruit", h: 12, crown: 0xD87AA8, fruit: 0xE8A8C8, n: 2, gap: 7 }], ["k:pine", 28, -100, 1.2, { k: 1 }]],
[["lake", 34, -20, 1, { R: 14, col: 0x3A6A7A }], ["archbridge", 32, 30, 0.9], ["k:turtle", 20, -60, 1.2, { beast: "turtle" }], ["k:frog", 22, -40, 1.4, { beast: "frog" }], ["k:reeds", 20, 60, 1.6, { k: 1 }], ["tree", 28, 90, 1, { kind: "willow", h: 12, crown: 0x4A8A4A }], ["stonelantern", 14, -90, 1]],
[["hut", 22, -30, 1.4], ["teapot", 16, 20, 0.6, { col: 0x4A4A4A }], ["stage", 28, 60, 0.6], ["bamboo", 20, -70, 1.2, { n: 3 }], ["lanterns", 20, 90, 1], ["folk", 13, -10, 1, { folk: "kimono" }]],
[["lanterns", 18, -30, 1.4, { n: 3, gap: 6 }], ["k:kitsune", 22, 30, 1, { beast: "kitsune", n: 3, gap: 2.4 }], ["cornfield", 30, -80, 1, { n: 8 }], ["torii", 24, 70, 1.1], ["stonelantern", 16, 100, 1, { n: 2, gap: 4 }], ["pagoda", 44, -110, 0.5]],
[["torii", 24, -10, 1.6], ["k:oni", 18, -40, 1, { beast: "oni", n: 2, gap: 3 }], ["k:ghost", 18, 40, 1, { beast: "ghost", n: 3, gap: 2 }], ["k:kitsune", 20, -20, 1, { beast: "kitsune" }], ["k:goblin", 20, 20, 1, { beast: "goblin", n: 2, gap: 2 }], ["lanterns", 22, 70, 1.4], ["lanterns", 22, -70, 1.4], ["k:spiritfire", 20, 100, 1, { k: 1 }], ["stonelantern", 14, -100, 1.2, { n: 3, gap: 4 }]]
] };
CT_SCN.robinhood = { mid: [["tree", 22, 0, 1.2, { kind: "oak", h: 18, crown: 0x2E5A2A }], ["target", 16, 0, 1], ["k:log", 16, 0, 1.2, { k: 1 }], ["k:stag", 20, 0, 1, { beast: "stag" }], ["tents", 26, 0, 0.6], ["camp", 16, 0, 1]],
ch: [
[["lake", 30, -10, 1, { R: 14, col: 0x3A6A8A }], ["k:log", 4, 0, 2, { k: 1, at: 0, alt: 0.4 }], ["tree", 24, 40, 1.2, { kind: "oak", h: 18, n: 3, gap: 8 }], ["k:reeds", 18, -60, 1.4, { k: 1 }], ["folk", 14, 20, 1, { folk: "peasant", look: { top: 0x3A6A2A, bottom: 0x3A6A2A } }], ["k:rock", 24, 90, 1.6, { k: 1 }], ["folk", 13, -30, 1, { folk: "peasant", look: { top: 0x3A6A2A } }]],
[["cottage", 24, -40, 1, { col: 0x7A6A50 }], ["lake", 30, 40, 1, { R: 10, col: 0x3A6A8A }], ["k:dog", 18, -10, 1, { beast: "dog", n: 3, gap: 2 }], ["well", 18, 70, 1], ["k:tree", 26, -90, 1, { k: 1, n: 2 }], ["folk", 13, 20, 1, { folk: "monk" }]],
[["tree", 28, -30, 1.8, { kind: "oak", h: 24, crown: 0x2E5A2A }], ["tents", 30, 40, 0.8], ["potfire", 18, 10, 1], ["k:weaponrack", 18, -60, 1, { k: 1 }], ["target", 22, 70, 1, { n: 2, gap: 4 }], ["k:stag", 24, 100, 1, { beast: "stag" }], ["folk", 13, -20, 1, { folk: "peasant", look: { top: 0x3A6A2A } }], ["folk", 14, 30, 1, { folk: "peasant", look: { top: 0x3A6A2A } }]],
[["target", 20, -30, 1.2, { n: 3, gap: 4 }], ["k:marketstall", 22, 30, 1, { k: 1, n: 3, gap: 6 }], ["pavilion", 28, 70, 1, { col: 0xB83A3A, c2: 0xD8C890 }], ["banner", 22, -70, 1.2, { col: 0xB83A3A, n: 3, gap: 5 }], ["stands", 30, -100, 0.8], ["folk", 13, 10, 1, { folk: "villager", sex: "f" }], ["folk", 14, -15, 1, { folk: "guard" }]],
[["k:marketstall", 20, -30, 1, { k: 1, n: 2, gap: 6 }], ["cross", 18, 20, 1.6, { col: 0x8A8478 }], ["target", 22, 50, 1.2], ["house", 28, 80, 1, { w: 8, d: 7, h: 6, col: 0xD8CCB0, roof: 0x6A4A3A, storey: 1 }], ["house", 30, -80, 1, { w: 8, d: 7, h: 6, col: 0xC8B8A0, roof: 0x6A4A3A, storey: 1 }], ["folk", 13, -10, 1, { folk: "villager", sex: "f" }], ["folk", 14, 30, 1, { folk: "farmer" }]],
[["k:gate", 26, -20, 1, { k: 1 }], ["k:castlewall", 30, 30, 1, { k: 1 }], ["folk", 18, -50, 1, { folk: "peasant", look: { top: 0x3A6A2A, bottom: 0x3A6A2A }, n: 4, gap: 2.0 }], ["tree", 26, 70, 1.2, { kind: "oak", h: 18, n: 2, gap: 8 }], ["banner", 22, 100, 1.2, { col: 0xB83A3A, n: 2, gap: 5 }], ["k:horse", 22, -90, 1, { beast: "horse" }]]
] };
CT_SCN.arthur = { mid: [["banner", 16, 0, 1.2], ["pavilion", 24, 0, 0.8], ["knight", 20, 0, 1], ["tree", 22, 0, 1, { kind: "oak", h: 16 }], ["stones", 28, 0, 0.5, { n: 7, R: 5 }], ["cross", 14, 0, 1]],
ch: [
[["cragcastle", 120, -10, 0.4, { r: 20 }], ["lake", 44, 40, 1, { R: 24, col: 0x2A5A8A }], ["folk", 18, -20, 1, { folk: "peasant", look: { top: 0x3A3A5A, bottom: 0x3A3A5A } }], ["k:rock", 24, 70, 2, { k: 1 }], ["banner", 20, -60, 1.2, { col: 0xB83A3A, n: 2, gap: 5 }], ["k:pine", 28, -100, 1.2, { k: 1, n: 2 }]],
[["stands", 26, -30, 1], ["knight", 22, 10, 1.2, { col: 0xB83A3A }], ["knight", 22, 30, 1.2, { col: 0x2A4AA8, turn: 180 }], ["pavilion", 30, 60, 1, { col: 0x2A4AA8, c2: 0xD8C890 }], ["pavilion", 30, -70, 1, { col: 0xB83A3A, c2: 0xD8C890 }], ["banner", 20, 90, 1.2, { col: 0xD8B048, n: 3, gap: 4 }], ["k:fence", 18, -100, 1.2, { k: 1, n: 4 }]],
[["church", 40, -30, 0.7], ["k:graveyard", 28, 40, 0.8, { k: 1 }], ["swordstone", 16, 10, 1.2], ["folk", 20, -60, 1, { folk: "peasant", look: { top: 0x8A8A92, bottom: 0x8A8A92 }, n: 4, gap: 1.6 }], ["k:tree", 26, 80, 1, { k: 1, n: 2 }], ["banner", 22, -100, 1.2, { col: 0xB83A3A, n: 2, gap: 5 }]],
[["lakesword", 30, -10, 1.2], ["boat", 22, 50, 1, { kind: "gondola", col: 0x2A2A3A }], ["k:reeds", 20, -60, 1.6, { k: 1 }], ["tree", 26, 80, 1, { kind: "willow", h: 12 }], ["k:rock", 24, -100, 1.6, { k: 1 }], ["folk", 16, 30, 1, { folk: "peasant", look: { top: 0x8A8A92, bottom: 0x8A8A92 } }]],
[["roundtable", 20, -10, 1.2], ["banner", 20, -50, 1.4, { col: 0xB83A3A, n: 2, gap: 5 }], ["banner", 20, 50, 1.4, { col: 0x2A4AA8, n: 2, gap: 5 }], ["k:armorstand", 18, 80, 1, { k: 1, n: 2, gap: 3 }], ["k:brazier", 16, -80, 1, { k: 1 }], ["castle", 80, 100, 0.4], ["folk", 13, 20, 1, { folk: "knight" }]],
[["knight", 22, -20, 1.2, { col: 0x8A8A92, n: 3, gap: 4 }], ["tree", 24, 40, 1, { kind: "dead", h: 14, n: 3, gap: 6 }], ["church", 40, 80, 0.5], ["cross", 18, -60, 1.4], ["k:rock", 24, -100, 1.8, { k: 1 }], ["tower", 44, 110, 0.8]]
] };
CT_SCN.quixote = { mid: [["k:windmill", 30, 0, 0.8, { k: 1 }], ["haystack", 18, 0, 1], ["house", 24, 0, 1, { w: 8, d: 7, h: 4, col: 0xE8DCC0, roof: 0xB8643A }], ["k:fence", 14, 0, 1.2, { k: 1, n: 3 }], ["tree", 22, 0, 1, { kind: "fruit", h: 10, crown: 0x6A8A3A, fruit: 0x3A3A2A }], ["k:sheep", 16, 0, 1, { beast: "sheep" }]],
ch: [
[["house", 26, -40, 1, { w: 12, d: 9, h: 6, col: 0xE8DCC0, roof: 0xB8643A, storey: 1 }], ["k:armorstand", 16, 20, 1, { k: 1 }], ["clueTable", 18, -10, 1], ["k:horse", 22, 40, 1, { beast: "horse", look: { coat: 0x8A7A6A } }], ["well", 20, 70, 1], ["tree", 26, -80, 1, { kind: "fruit", h: 10, crown: 0x6A8A3A, fruit: 0x3A3A2A }], ["folk", 13, -20, 1, { folk: "villager", sex: "f" }]],
[["house", 26, -40, 1, { w: 14, d: 10, h: 6, col: 0xE8DCC0, roof: 0xB8643A, storey: 1 }], ["innsign", 16, -10, 1.2], ["well", 18, 20, 1.2], ["k:armorstand", 16, 40, 1, { k: 1 }], ["k:horse", 22, 60, 1, { beast: "horse" }], ["barrels", 20, -70, 1, { n: 5 }], ["folk", 13, 30, 1, { folk: "peasant" }]],
[["quad", 18, -10, 1, { L: 1.8, H: 1, col: 0x7A7A7A, ears: 1, neck: 0.5 }], ["k:horse", 20, 10, 1, { beast: "horse", look: { coat: 0x8A7A6A } }], ["house", 28, -50, 1, { w: 8, d: 7, h: 4, col: 0xE8DCC0, roof: 0xB8643A }], ["haystack", 22, 50, 1, { n: 2, gap: 6 }], ["k:fence", 20, 80, 1.2, { k: 1, n: 3 }], ["folk", 13, 20, 1, { folk: "farmer" }]],
[["k:windmill", 30, -40, 1.2, { k: 1 }], ["k:windmill", 34, 0, 1.2, { k: 1 }], ["k:windmill", 30, 40, 1.2, { k: 1 }], ["knight", 18, -10, 1.1, { col: 0x8A7A6A }], ["quad", 20, 20, 1, { L: 1.8, H: 1, col: 0x7A7A7A, ears: 1, neck: 0.5 }], ["haystack", 24, 80, 1], ["k:rock", 24, -90, 1.6, { k: 1 }]],
[["k:sheep", 20, -30, 1.2, { beast: "sheep", n: 6, gap: 2 }], ["k:sheep", 22, 30, 1.2, { beast: "sheep", n: 6, gap: 2 }], ["knight", 18, 0, 1.1, { col: 0x8A7A6A }], ["fig", 22, 60, 1, { col: 0x8A7A5A, hat: 0x6A5A3A, n: 2, gap: 2 }], ["k:fence", 22, -80, 1.2, { k: 1, n: 3 }], ["k:rock", 24, 100, 1.6, { k: 1 }]],
[["church", 40, -30, 0.6], ["house", 26, 40, 1, { w: 8, d: 7, h: 4, col: 0xE8DCC0, roof: 0xB8643A, n: 2, gap: 9 }], ["garden", 24, -70, 1, { col: 0xC84A6A }], ["well", 18, 80, 1], ["quad", 18, 10, 1, { L: 1.8, H: 1, col: 0x7A7A7A, ears: 1, neck: 0.5 }], ["folk", 13, -10, 1, { folk: "villager", sex: "f" }]],
[["lake", 40, -20, 1, { R: 26, col: 0x2A7AAA }], ["knight", 22, 20, 1.1, { col: 0xD8D0C0 }], ["knight", 22, 40, 1.1, { col: 0x8A7A6A, turn: 180 }], ["house", 28, 80, 1, { w: 12, d: 9, h: 6, col: 0xE8DCC0, roof: 0xB8643A, storey: 1 }], ["k:windmill", 40, -90, 0.8, { k: 1 }], ["boat", 6, 0, 1, { kind: "felucca", at: 0 }]]
] };
CT_SCN.mothergoose = { mid: [["kidsflowers", 16, 0, 1.2], ["house", 24, 0, 1, { w: 7, d: 6, h: 4.5, col: 0xFF8AC8, roof: 0x3AC8FF, chim: 1 }], ["tree", 22, 0, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A }], ["k:sheep", 16, 0, 1, { beast: "sheep" }], ["k:fence", 14, 0, 1.2, { k: 1, n: 3, attrs: { c: "#FFD838" } }], ["shoe", 30, 0, 0.6, { col: 0xFF3A3A }], ["cowmoon", 34, 0, 0.6]],
ch: [
[["shoe", 34, -40, 1, { col: 0xFF3A3A }], ["crookedhouse", 28, 40, 1, { col: 0xC83AFF }], ["cowmoon", 50, 10, 1], ["kidsflowers", 16, -10, 1.6], ["kidsflowers", 18, 70, 1.4], ["tree", 26, -90, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A }], ["folk", 13, 20, 1, { folk: "kid" }], ["folk", 14, -20, 1, { folk: "kid2" }]],
[["k:sheep", 20, -30, 1.2, { beast: "sheep", n: 5, gap: 2 }], ["k:sheep", 24, 40, 1.2, { beast: "sheep", n: 3, gap: 2 }], ["haystack", 22, 70, 1, { n: 2, gap: 6 }], ["k:fence", 18, -70, 1.2, { k: 1, n: 4 }], ["kidsflowers", 16, 10, 1.6], ["tree", 26, 100, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFFD838 }], ["folk", 13, -10, 1, { folk: "kid2", sex: "f", look: { top: 0xFF8AC8, bottom: 0xFF8AC8 } }]],
[["humptywall", 22, -10, 1.4], ["knight", 22, 30, 1, { col: 0x3A5AFF, n: 3, gap: 3 }], ["k:horse", 22, -50, 1, { beast: "horse", n: 3, gap: 3 }], ["banner", 20, 70, 1.2, { col: 0xFF3A3A, n: 3, gap: 4 }], ["kidsflowers", 18, -90, 1.4], ["castle", 80, 100, 0.3, { col: 0xFF8AC8, roof: 0x3AC8FF }]],
[["well", 30, -10, 1.6, { col: 0xFF8A3A }], ["mound", 36, 40, 1, { col: 0x3AC83A }], ["kidsflowers", 18, -40, 1.6], ["tree", 24, 70, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A }], ["house", 28, -80, 1, { w: 7, d: 6, h: 4.5, col: 0xFFD838, roof: 0xFF3A3A, chim: 1 }], ["folk", 13, 20, 1, { folk: "kid" }], ["folk", 14, 30, 1, { folk: "kid2" }]],
[["throne", 18, -10, 1.4, { col: 0xFF3A3A }], ["folk", 18, 20, 1, { folk: "peasant", look: { top: 0x3A5AFF, bottom: 0x3A5AFF }, n: 3, gap: 1.6 }], ["feasttable", 20, -40, 1.2], ["banner", 22, 60, 1.2, { col: 0xFFD838, n: 3, gap: 4 }], ["carousel", 34, -80, 0.8], ["kidsflowers", 18, 100, 1.4]],
[["tallclock", 22, -10, 2.4, { col: 0xFF8A3A }], ["k:rat", 18, 20, 1.4, { beast: "rat" }], ["tallclock", 24, 50, 1.4, { col: 0x3AC8FF }], ["kidsflowers", 16, -50, 1.6], ["house", 28, 80, 1, { w: 7, d: 6, h: 4.5, col: 0x3AC8FF, roof: 0xFF3A3A, chim: 1 }], ["carousel", 34, -100, 0.7]]
] };
CT_SCN.pinocchio = { mid: [["kidsflowers", 16, 0, 1.2], ["house", 24, 0, 1, { w: 7, d: 6, h: 5, col: 0xFFB83A, roof: 0xFF3A3A }], ["tree", 22, 0, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF8A3A }], ["k:fence", 14, 0, 1.2, { k: 1, n: 3 }], ["cointree", 18, 0], ["carousel", 30, 0, 0.6]],
ch: [
[["workbench", 16, -20, 1.4], ["k:log", 18, 20, 1.4, { k: 1 }], ["house", 26, -50, 1, { w: 8, d: 7, h: 5, col: 0xFFB83A, roof: 0xFF3A3A, chim: 1 }], ["barrels", 20, 50, 1, { n: 4 }], ["fig", 16, 10, 0.8, { col: 0xFF3A3A, leg: 0x3AC83A, hat: 0xFFD838, tall: 1 }], ["kidsflowers", 18, 80, 1.4], ["folk", 13, -30, 1, { folk: "farmer" }]],
[["cricket", 16, -10, 2.4], ["house", 26, -40, 1, { w: 7, d: 6, h: 4.5, col: 0x3AC8FF, roof: 0xFFD838, chim: 1 }], ["potfire", 18, 30, 1], ["hammer", 16, 60, 0.3], ["kidsflowers", 18, -80, 1.6], ["tree", 24, 90, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A }]],
[["stage", 22, -10, 1.2, { col: 0xFF3A3A }], ["stands", 28, 40, 0.8], ["banner", 20, -50, 1.2, { col: 0xFFD838, n: 3, gap: 4 }], ["fig", 18, -10, 0.7, { col: 0xFF3A3A, hat: 0x3A5AFF, alt: 1.2 }], ["fig", 18, 0, 0.7, { col: 0xFFD838, hat: 0xFF3A3A, alt: 1.2 }], ["carousel", 34, 80, 0.7], ["folk", 13, 30, 1, { folk: "kid" }], ["folk", 14, 40, 1, { folk: "kid2" }]],
[["cointree", 18, -20, 1.6], ["k:fox", 18, 20, 1.2, { beast: "fox" }], ["k:cat", 18, 30, 1.4, { beast: "cat" }], ["innsign", 22, -60, 1.2], ["kidsflowers", 18, 60, 1.6], ["tree", 26, -90, 1, { kind: "dead", h: 10 }], ["house", 30, 100, 1, { w: 8, d: 7, h: 5, col: 0xFF8A3A, roof: 0x8A3AFF }]],
[["house", 30, -30, 1, { w: 9, d: 8, h: 6, col: 0x5AD8FF, roof: 0x3A8AFF, storey: 1 }], ["fig", 16, 10, 0.8, { col: 0xFF3A3A, leg: 0x3AC83A, hat: 0xFFD838, tall: 1 }], ["k:bird", 18, 40, 1.2, { k: 1, walk: 1, n: 3 }], ["kidsflowers", 16, -60, 1.8], ["tree", 24, 70, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0x5AD8FF, n: 2, gap: 7 }], ["k:fountain", 26, -100, 1, { k: 1 }]],
[["carousel", 26, -20, 1.2], ["tents", 28, 40, 1], ["balloon", 34, 70, 0.6, { col: 0xFF3A3A, stripe: 0xFFD838 }], ["k:goat", 18, -60, 1, { beast: "goat", n: 3, gap: 2.4 }], ["banner", 20, 100, 1.2, { col: 0x3AC8FF, n: 3, gap: 4 }], ["kidsflowers", 16, -100, 1.4], ["folk", 13, 10, 1, { folk: "kid" }]],
[["lake", 40, -10, 1, { R: 30, col: 0x2A7AAA }], ["dogfish", 6, 0, 1.4, { at: 0, alt: -1.4 }], ["k:whale", 20, -60, 0.6, { beast: "whale" }], ["boat", 24, 60, 1, { kind: "row", col: 0xFFB83A, at: 0 }], ["k:rock", 26, -70, 1.6, { k: 1 }], ["kidsflowers", 18, 90, 1.2], ["teatable", 20, -100, 0.6]],
[["house", 26, -30, 1, { w: 8, d: 7, h: 5, col: 0xFF8AC8, roof: 0x3AC8FF, chim: 1 }], ["fig", 16, 10, 0.8, { col: 0xFF3A3A, leg: 0x3AC83A, hat: 0xFFD838, tall: 1 }], ["kidsflowers", 16, 40, 1.8], ["tree", 24, 70, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A, n: 2, gap: 7 }], ["k:fountain", 26, -80, 1, { k: 1 }], ["folk", 13, -10, 1, { folk: "kid" }], ["folk", 14, 20, 1, { folk: "farmer" }]]
] };
CT_SCN.threepigs = { mid: [["kidsflowers", 16, 0, 1.2], ["haystack", 18, 0, 1], ["k:fence", 14, 0, 1.2, { k: 1, n: 3 }], ["tree", 22, 0, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A }], ["wolf", 20, 0, 1, { col: 0x6A6A7A }], ["bowls", 14, 0]],
ch: [
[["house", 26, -30, 1, { w: 8, d: 7, h: 5, col: 0xFFB0D0, roof: 0xFF3A3A, chim: 1 }], ["kidsflowers", 16, 20, 1.8], ["k:fence", 18, -60, 1.2, { k: 1, n: 3 }], ["tree", 24, 60, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFF3A3A }], ["k:pig", 16, -10, 1, { beast: "pig", n: 3, gap: 1.8 }], ["k:pig", 18, 40, 1.3, { beast: "pig" }]],
[["pighouse", 22, -20, 1.2], ["haystack", 22, 30, 1.2, { n: 3, gap: 6 }], ["wolf", 20, -50, 1.4, { col: 0x6A6A7A }], ["kidsflowers", 16, 60, 1.6], ["fig", 20, 90, 1, { col: 0xFFD838, hat: 0xC8A858 }], ["cornfield", 30, -90, 0.8, { n: 7 }]],
[["pighouse", 22, -20, 1.2], ["k:log", 18, 30, 1.2, { k: 1, n: 2 }], ["k:stump", 18, 60, 1, { k: 1 }], ["wolf", 20, -50, 1.4, { col: 0x6A6A7A }], ["tree", 24, 90, 1, { kind: "oak", h: 14, crown: 0x3AC83A, n: 2, gap: 7 }], ["kidsflowers", 16, -90, 1.4]],
[["pighouse", 22, -20, 1.2], ["house", 26, 30, 1, { w: 8, d: 7, h: 5, col: 0xC83A2A, roof: 0x3A5AFF, chim: 1 }], ["tree", 24, 60, 1, { kind: "fruit", h: 12, crown: 0x3AC83A, fruit: 0xFF3A3A }], ["cornfield", 30, -60, 1, { n: 8 }], ["wolf", 20, 90, 1.4, { col: 0x6A6A7A }], ["kidsflowers", 16, -100, 1.6]],
[["house", 26, -20, 1.2, { w: 8, d: 7, h: 5, col: 0xFF3A3A, roof: 0x3A5AFF, chim: 1 }], ["potfire", 16, 20, 1.4], ["wolf", 22, -5, 1.2, { col: 0x6A6A7A, alt: 8 }], ["kidsflowers", 16, 60, 1.6], ["k:fence", 18, -70, 1.2, { k: 1, n: 3 }], ["tree", 24, 100, 1, { kind: "fruit", h: 10, crown: 0x3AC83A, fruit: 0xFFD838 }]],
[["house", 26, -20, 1.2, { w: 9, d: 8, h: 5, col: 0x8A5A3A, roof: 0x3AC83A, chim: 1 }], ["bowls", 16, 20, 1.4], ["k:bear", 20, 50, 1.2, { beast: "bear" }], ["k:bear", 22, 60, 1, { beast: "bear" }], ["k:bear", 22, 70, 0.7, { beast: "bear" }], ["tree", 26, -70, 1.2, { kind: "oak", h: 16, crown: 0x3AC83A, n: 3, gap: 8 }], ["folk", 13, -10, 1, { folk: "kid2", sex: "f", look: { hair: 0xE8C870 } }]],
[["house", 26, -30, 1, { w: 9, d: 8, h: 5, col: 0xB86A3A, roof: 0xFF8AC8, chim: 1 }], ["garden", 24, 30, 1, { col: 0xFF8AC8 }], ["kidsflowers", 16, 60, 1.8], ["tree", 24, -70, 1.2, { kind: "oak", h: 16, crown: 0x3AC83A, n: 3, gap: 8 }], ["k:bear", 22, 90, 1, { beast: "bear" }], ["bowls", 16, -10, 1]]
] };
CT_SCN.lilliput = { mid: [["tinytown", 22, 0, 0.8], ["tinyfleet", 22, 0, 0.6], ["kidsflowers", 16, 0, 1.2], ["tinypalace", 18, 0, 1], ["k:rock", 20, 0, 1.4, { k: 1 }], ["gulliverhead", 26, 0, 0.8]],
ch: [
[["lake", 40, -20, 1, { R: 28, col: 0x2A7AAA }], ["wreck", 8, -30, 1, { at: 0 }], ["k:rock", 24, 40, 2, { k: 1, n: 2, gap: 6 }], ["barrels", 18, 70, 1, { n: 4 }], ["kidsflowers", 16, -70, 1.2], ["tinytown", 30, 100, 0.8]],
[["gulliver", 26, -10, 1.2], ["fig", 18, 30, 0.18, { col: 0xFF3A3A, n: 6, gap: 0.6 }], ["fig", 20, 50, 0.18, { col: 0x3A5AFF, n: 6, gap: 0.6 }], ["tinypalace", 24, -60, 1.2], ["kidsflowers", 16, 80, 1.6], ["engine", 20, -100, 0.25]],
[["tinytown", 22, -20, 1.4], ["tinypalace", 22, 30, 1.6], ["tinytown", 26, 70, 1.1], ["banner", 18, -70, 0.4, { col: 0xFF5AA8, n: 4, gap: 1.4 }], ["gulliverhead", 34, 100, 1], ["kidsflowers", 16, -100, 1.4]],
[["egg", 20, -10, 0.8, { col: 0xE8D8B8 }], ["egg", 24, 30, 0.6, { col: 0xD8C8A8 }], ["tinypalace", 24, -50, 1.4], ["fig", 20, 60, 0.18, { col: 0xFF3A3A, n: 8, gap: 0.5 }], ["fig", 20, -80, 0.18, { col: 0x3A5AFF, n: 8, gap: 0.5 }], ["kidsflowers", 16, 100, 1.6]],
[["lake", 40, -10, 1, { R: 30, col: 0x2A7AAA }], ["tinyfleet", 10, -40, 1.6, { at: 0 }], ["tinyfleet", 12, 50, 1.2, { at: 0 }], ["gulliverhead", 4, 0, 1.2, { at: 0, alt: -1 }], ["tinytown", 30, 90, 0.8], ["kidsflowers", 16, -100, 1.2]],
[["lake", 40, -20, 1, { R: 28, col: 0x2A7AAA }], ["boat", 6, 0, 1.2, { kind: "row", at: 0, col: 0xFFB83A }], ["k:sheep", 18, 30, 0.3, { beast: "sheep", n: 5, gap: 0.6 }], ["k:cow", 18, 50, 0.25, { beast: "cow", n: 3, gap: 0.8 }], ["tinytown", 28, 80, 0.9], ["kidsflowers", 16, -80, 1.4]]
] };
CT_SCN.centreearth = { mid: [["bigfungus", 30, 0, 0.5], ["k:crystalspire", 20, 0, 1, { k: 1 }], ["k:rock", 18, 0, 1.6, { k: 1 }], ["stones", 24, 0, 0.5, { n: 6, R: 5, col: 0x5A5048 }], ["bones", 20, 0, 1], ["lake", 30, 0, 1, { R: 10, col: 0x2A4A6A }]],
ch: [
[["house", 28, -40, 1, { w: 10, d: 9, h: 9, col: 0x8A7A6A, roof: 0x3A3A40, storey: 1 }], ["clueTable", 16, -10, 1], ["globe", 18, 20, 1], ["runestone", 18, 50, 1.2], ["tallclock", 22, -70, 1], ["gaslamp", 14, 80, 1, { n: 2, gap: 7 }], ["folk", 13, 30, 1, { folk: "scholar" }], ["folk", 14, -25, 1, { folk: "lady", sex: "f" }]],
[["mountain", 140, -10, 0.4, { r: 70, h: 90, col: 0x5A5A62 }], ["quad", 18, 20, 0.8, { L: 1.8, H: 1, col: 0x8A6A4A, neck: 0.6, mane: 0x3A2A1A, n: 3, gap: 2.6 }], ["house", 26, -40, 1, { w: 7, d: 6, h: 2.6, col: 0x5A7A3A, roof: 0x4A6A2A, rk: "dome" }], ["camp", 16, 50, 1], ["k:rock", 24, 80, 1.8, { k: 1 }], ["folk", 13, -20, 1, { folk: "peasant" }]],
[["crater", 26, -10, 1.4], ["shaftcap", 20, 30, 0.6, { n: 3, gap: 10 }], ["k:rock", 24, -60, 1.8, { k: 1, n: 2, gap: 6 }], ["camp", 16, 70, 1], ["obelisk", 22, -100, 0.8, { col: 0x5A5A62 }], ["barrels", 18, 100, 0.8, { n: 3 }]],
[["falls", 50, -10, 0.3, { h: 20, r: 10 }], ["lake", 30, 40, 1, { R: 10, col: 0x3A6A8A }], ["k:crystalspire", 24, -60, 1.2, { k: 1, n: 2, gap: 5 }], ["cave", 36, 80, 0.8, { col: 0x4A4048 }], ["camp", 16, -90, 1]],
[["lake", 44, -10, 1, { R: 32, col: 0x2A5A6A }], ["boat", 6, 30, 1.4, { kind: "raft", at: 0 }], ["bigfungus", 34, 60, 0.8], ["bigfungus", 34, -70, 0.7], ["seamonster", 20, -40, 1, { at: 0, alt: -1 }], ["k:mammoth", 36, -100, 1, { beast: "mammoth" }], ["bones", 22, 100, 1.4]],
[["runestone", 16, -10, 1.6, { col: 0x4A4048 }], ["cave", 34, 30, 0.9, { col: 0x4A4048 }], ["k:rock", 24, -50, 2, { k: 1, n: 2, gap: 6 }], ["barrels", 18, 70, 0.8, { n: 3 }], ["k:crystalspire", 26, -90, 1, { k: 1 }], ["k:mammoth", 30, 100, 1, { beast: "mammoth" }]],
[["mountain", 140, 10, 0.4, { r: 60, h: 80, col: 0x3A2A24, snow: false, glow: 0xB85A2A }], ["k:lavaflow", 30, -40, 1, { k: 1, walk: 1 }], ["tree", 24, 40, 1, { kind: "fruit", h: 10, crown: 0x5A7A3A, fruit: 0x3A4A2A, n: 3, gap: 7 }], ["ruins", 30, 80, 0.8], ["folk", 13, -20, 1, { folk: "kid" }], ["lake", 40, -100, 1, { R: 18, col: 0x2A7AAA }]]
] };
CT_SCN.beowulf = { mid: [["runestone", 16, 0, 1.2], ["boat", 24, 0, 1, { kind: "long", col: 0x5A3A24 }], ["k:rock", 20, 0, 1.6, { k: 1 }], ["banner", 16, 0, 1.2, { col: 0x8A2A2A }], ["k:pine", 22, 0, 1.2, { k: 1 }], ["mound", 30, 0, 0.5]],
ch: [
[["shieldhall", 44, -20, 0.6], ["banner", 20, -50, 1.4, { col: 0xC8A040, n: 3, gap: 5 }], ["k:brazier", 16, 30, 1.2, { k: 1, n: 2, gap: 6 }], ["barrels", 20, 60, 1, { n: 6 }], ["k:horse", 22, -80, 1, { beast: "horse", n: 2, gap: 3 }], ["biglyre", 18, 90, 0.4], ["folk", 13, 10, 1, { folk: "viking" }]],
[["lake", 40, -20, 1, { R: 28, col: 0x2A4A6A }], ["boat", 8, -60, 1.4, { kind: "long", col: 0x5A3A24, at: 0 }], ["k:horse", 20, 30, 1, { beast: "horse" }], ["fig", 16, 40, 1, { col: 0x8A8A92, hat: 0x8A8A92, spear: 1, n: 4, gap: 1.4 }], ["k:rock", 24, 80, 1.6, { k: 1 }], ["runestone", 18, -100, 1.2]],
[["feasttable", 18, -10, 1.6], ["barrels", 20, 40, 1, { n: 6 }], ["k:brazier", 16, -40, 1, { k: 1 }], ["banner", 20, 70, 1.4, { col: 0x8A2A2A, n: 2, gap: 5 }], ["k:weaponrack", 18, -80, 1, { k: 1 }], ["folk", 13, 20, 1, { folk: "viking" }], ["folk", 14, -25, 1, { folk: "lady", sex: "f" }]],
[["shieldhall", 46, -10, 0.5], ["k:troll", 24, 30, 1.6, { beast: "troll" }], ["k:brazier", 16, -40, 1, { k: 1 }], ["burnt", 26, 70, 0.6], ["k:pine", 28, -80, 1.2, { k: 1, n: 3 }], ["bones", 20, 100, 0.8]],
[["lake", 36, -10, 1, { R: 22, col: 0x1E2A22 }], ["seamonster", 6, 40, 0.8, { at: 0, alt: -1, col: 0x2A3A2A }], ["cliff", 50, 40, 0.8, { col: 0x3A3A34 }], ["tree", 24, -60, 1, { kind: "dead", h: 12, n: 3, gap: 6 }], ["k:spiritfire", 22, 80, 1, { k: 1 }], ["k:rock", 24, -100, 1.8, { k: 1 }]],
[["treasure", 18, -10, 1.4], ["k:horse", 22, 30, 1, { beast: "horse", n: 4, gap: 2.6 }], ["banner", 20, -50, 1.4, { col: 0xC8A040, n: 2, gap: 5 }], ["k:armorstand", 18, 70, 1, { k: 1 }], ["throne", 20, -90, 1.2, { col: 0x5A3A24 }], ["k:brazier", 16, 100, 1, { k: 1 }]],
[["mound", 34, -10, 1.4, { col: 0x4A5A3A }], ["k:dragon", 36, 40, 0.5, { k: 1 }], ["treasure", 18, -40, 1.2], ["burnt", 26, 70, 0.8], ["mound", 40, -90, 0.8], ["runestone", 18, 100, 1.4]]
] };
CT_SCN.treasureisland = { mid: [["k:palm", 18, 0, 1.2, { k: 1, n: 2, gap: 6 }], ["barrels", 16, 0, 1, { n: 4 }], ["chest", 14, 0, 1], ["k:rock", 20, 0, 1.6, { k: 1 }], ["cannon", 16, 0, 1.2], ["bones", 18, 0, 1]],
ch: [
[["house", 26, -40, 1, { w: 12, d: 9, h: 6, col: 0xD8D0C0, roof: 0x4A4A52, storey: 1, chim: 1 }], ["innsign", 16, -10, 1.2], ["chest", 16, 20, 1.4], ["barrels", 20, 50, 1, { n: 5 }], ["cliff", 50, 80, 0.6, { col: 0x6A6A62 }], ["k:fence", 20, -80, 1.2, { k: 1, n: 3 }], ["folk", 13, 30, 1, { folk: "pirate" }]],
[["lake", 40, -20, 1, { R: 28, col: 0x2A5A7A }], ["ship", 8, -40, 1.2, { at: 0 }], ["dock", 30, 40, 1], ["barrels", 18, 60, 1, { n: 6 }], ["house", 30, 90, 1, { w: 10, d: 8, h: 6, col: 0xC8B8A0, roof: 0x4A4A52, storey: 1 }], ["folk", 13, 20, 1, { folk: "sailor" }], ["folk", 14, -20, 1, { folk: "pirate" }]],
[["barrels", 16, -10, 1.6, { n: 3 }], ["ship", 40, 30, 1], ["k:rock", 34, -60, 2, { k: 1 }], ["cannon", 18, 60, 1.2], ["lanterns", 20, -80, 1], ["folk", 13, 20, 1, { folk: "pirate" }]],
[["stockade", 30, -10, 1], ["cabin", 30, -10, 0.8], ["banner", 22, 30, 1.4, { col: 0xB83A3A }], ["well", 18, 50, 1], ["k:palm", 24, -60, 1.2, { k: 1, n: 3, gap: 6 }], ["cannon", 20, 80, 1.2], ["fig", 22, -100, 1, { col: 0xA82A2A, hat: 0x1A1A1A, n: 3, gap: 1.6 }]],
[["cave", 32, -20, 0.8, { col: 0x8A7A60 }], ["k:palm", 22, 30, 1.2, { k: 1, n: 3, gap: 6 }], ["k:goat", 20, 60, 1, { beast: "goat", n: 2, gap: 1.6 }], ["boat", 22, -60, 1, { kind: "row", col: 0x6A5A3A }], ["camp", 16, 90, 1], ["folk", 13, 0, 1, { folk: "peasant" }]],
[["skeletonpointer", 18, -10, 1.4], ["k:palm", 24, 30, 1.6, { k: 1, n: 3, gap: 8 }], ["tree", 30, -50, 1.4, { kind: "oak", h: 24, crown: 0x3A6A3A }], ["k:rock", 24, 80, 1.6, { k: 1 }], ["fig", 20, -90, 1, { col: 0xA82A2A, hat: 0x1A1A1A, n: 3, gap: 1.6 }]],
[["crater", 22, -20, 0.8], ["treasure", 18, 30, 1.6], ["cave", 34, 60, 0.8, { col: 0x8A7A60 }], ["lake", 44, -80, 1, { R: 24, col: 0x2A7AAA }], ["ship", 6, 0, 1, { at: 3 }], ["k:palm", 24, 100, 1.2, { k: 1 }]]
] };
CT_SCN.phantom = { mid: [["gaslamp", 14, 0, 1, { n: 3, gap: 9 }], ["hansom", 18, 0, 1], ["house", 26, 0, 1, { w: 10, d: 8, h: 12, col: 0xC8BCA0, roof: 0x4A5A5A, storey: 1 }], ["k:statue", 20, 0, 1, { k: 1 }], ["k:tree", 20, 0, 1, { k: 1 }], ["pillarbox", 12, 0, 1]],
ch: [
[["opera", 80, -10, 0.5, { r: 24 }], ["k:mirrorstand", 16, -30, 1.2, { k: 1, n: 3, gap: 3 }], ["armchairs", 18, 30, 1], ["gaslamp", 14, 60, 1, { n: 3, gap: 7 }], ["k:ghost", 24, -70, 1, { beast: "ghost" }], ["folk", 13, 10, 1, { folk: "lady", sex: "f", look: { top: 0xE8C8D8, bottom: 0xE8C8D8 } }], ["folk", 14, -10, 1, { folk: "lady", sex: "f", look: { top: 0xD8B8C8, bottom: 0xD8B8C8 } }]],
[["opera", 70, 0, 0.4, { r: 20 }], ["stands", 24, -30, 0.8], ["armchairs", 18, 30, 1.2], ["k:statue", 22, 60, 1, { k: 1, n: 2, gap: 5 }], ["chandelier", 22, -60, 0.8], ["clueTable", 16, -10, 1], ["folk", 13, 20, 1, { folk: "victorian" }]],
[["k:mirrorstand", 16, -10, 1.8, { k: 1 }], ["armchairs", 18, 30, 1], ["flowerbed", 16, -40, 1.12, {}], ["chandelier", 22, 60, 0.7], ["stage", 30, -80, 0.8, { col: 0x6A1A2A }], ["biglyre", 20, 90, 0.4], ["folk", 13, 20, 1, { folk: "lady", sex: "f", look: { top: 0xE8E0D0, bottom: 0xE8E0D0 } }]],
[["chandelier", 22, -10, 1.6], ["stands", 24, 30, 1.2], ["stands", 26, -50, 1.2], ["stage", 30, 80, 1, { col: 0x8A1A2A }], ["k:frog", 18, 10, 1.4, { beast: "frog" }], ["banner", 22, -90, 1.2, { col: 0x8A1A2A, n: 2, gap: 5 }]],
[["k:statue", 22, -30, 1, { k: 1, n: 3, gap: 5 }], ["folk", 14, -10, 1, { folk: "noble", look: { top: 0xA82A2A, bottom: 0xA82A2A, back: "cape", backColor: 0xA82A2A } }], ["folk", 15, 20, 1, { folk: "lady", sex: "f", look: { top: 0x3A5AA8, bottom: 0x3A5AA8 } }], ["folk", 16, 40, 1, { folk: "victorian" }],
["folk", 17, -40, 1, { folk: "lady", sex: "f", look: { top: 0x8A3A8A, bottom: 0x8A3A8A } }], ["lanterns", 22, 60, 1.2], ["chandelier", 24, -70, 0.8], ["k:fountain", 28, 90, 1, { k: 1 }], ["garden", 30, -100, 1]],
[["lake", 36, -10, 1, { R: 24, col: 0x1A2A3A }], ["boat", 4, 30, 1.2, { kind: "gondola", col: 0x1A1A1E, at: 0 }], ["k:brazier", 18, 40, 1, { k: 1, n: 3, gap: 6 }], ["house", 44, 60, 0.8, { w: 10, d: 8, h: 6, col: 0x3A3A40, roof: 0x2A2A30 }], ["arch", 30, -60, 1, { col: 0x5A5050 }], ["k:spiritfire", 22, -90, 1, { k: 1 }]],
[["k:mirrorstand", 16, -20, 1.4, { k: 1, n: 4, gap: 3 }], ["k:scorpion", 18, 30, 1.2, { beast: "scorpion" }], ["barrels", 20, 60, 1, { n: 6 }], ["throne", 20, -60, 1, { col: 0x4A2A2A }], ["k:brazier", 16, 90, 1, { k: 1 }], ["biglyre", 22, -100, 0.4]]
] };
CT_SCN.holmes = { mid: [["gaslamp", 14, 0, 1, { n: 3, gap: 9 }], ["hansom", 18, 0, 1], ["house", 24, 0, 1, { w: 9, d: 8, h: 9, col: 0x6A5A4A, roof: 0x3A3A40, storey: 1 }], ["pillarbox", 12, 0, 1], ["k:marketstall", 18, 0, 1, { k: 1 }], ["barrels", 16, 0, 1, { n: 3 }]],
ch: [
[["house", 26, -40, 1, { w: 10, d: 8, h: 12, col: 0x7A6A5A, roof: 0x3A3A40, storey: 1, snow: 1 }], ["armchairs", 16, -10, 1.2], ["tophat", 16, 20, 0.3, { col: 0x2A2A2A }], ["gaslamp", 14, 50, 1, { n: 3, gap: 7 }], ["hansom", 22, 80, 1], ["k:chicken", 18, -70, 1.4, { beast: "chicken" }], ["folk", 13, 30, 1, { folk: "victorian" }]],
[["clueTable", 16, -10, 1.2], ["k:chicken", 18, 20, 1.4, { beast: "chicken", n: 3, gap: 1.6 }], ["house", 28, -50, 1, { w: 12, d: 9, h: 12, col: 0x8A7A6A, roof: 0x3A3A40, storey: 1 }], ["gaslamp", 14, 60, 1, { n: 2, gap: 7 }], ["pillarbox", 14, 90, 1], ["folk", 13, -30, 1, { folk: "victorian" }]],
[["clueTable", 16, -10, 1.4], ["armchairs", 18, 30, 1.2], ["tophat", 16, 50, 0.3, { col: 0x2A2A2A }], ["tallclock", 22, -60, 1], ["k:lectern", 14, 70, 1, { k: 1 }], ["house", 30, 100, 1, { w: 10, d: 8, h: 12, col: 0x6A5A4A, roof: 0x3A3A40, storey: 1 }]],
[["k:marketstall", 18, -30, 1, { k: 1, n: 3, gap: 6 }], ["k:marketstall", 20, 40, 1, { k: 1, n: 2, gap: 6 }], ["k:chicken", 18, 10, 1.2, { beast: "chicken", n: 4, gap: 1.4 }], ["barrels", 20, 70, 1, { n: 5 }], ["gaslamp", 14, -70, 1, { n: 2, gap: 7 }], ["folk", 13, 20, 1, { folk: "peasant" }], ["folk", 14, -10, 1, { folk: "maid", sex: "f" }]],
[["house", 26, -40, 1, { w: 10, d: 8, h: 12, col: 0x8A7A6A, roof: 0x3A3A40, storey: 1, snow: 1 }], ["armchairs", 16, 10, 1.2], ["potfire", 18, 40, 0.8], ["gaslamp", 14, 70, 1, { n: 2, gap: 7 }], ["hansom", 22, -80, 1], ["folk", 13, -10, 1, { folk: "victorian" }]]
] };
CT_SCN.grimm = { mid: [["tree", 22, 0, 1.2, { kind: "oak", h: 18, crown: 0x2E5A2A }], ["k:giantmushroom", 14, 0, 1, { k: 1 }], ["cottage", 26, 0, 0.9, { col: 0x8A6A4A }], ["k:stump", 14, 0, 1, { k: 1 }], ["k:owl", 18, 0, 1, { beast: "owl" }], ["well", 16, 0, 1]],
ch: [
[["cottage", 24, -30, 1.2, { col: 0x8A6A4A }], ["k:log", 18, 20, 1.2, { k: 1, n: 2 }], ["k:axe", 14, 40, 1, { k: 1 }], ["tree", 26, -70, 1.2, { kind: "oak", h: 18, n: 3, gap: 8 }], ["well", 18, 70, 1], ["folk", 13, -10, 1, { folk: "peasant" }], ["folk", 14, 10, 1, { folk: "villager", sex: "f" }]],
[["stones", 20, -20, 0.3, { R: 6, n: 12, col: 0xB8B8B0 }], ["k:bird", 18, 30, 1, { k: 1, walk: 1, n: 4 }], ["tree", 26, -60, 1.4, { kind: "oak", h: 20, n: 3, gap: 9 }], ["tree", 28, 70, 1.4, { kind: "oak", h: 20, n: 3, gap: 9 }], ["camp", 16, 10, 1], ["k:owl", 22, 100, 1, { beast: "owl" }]],
[["k:witch", 18, -10, 1.1, { beast: "witch" }], ["potfire", 20, 30, 1.4], ["house", 24, 50, 0.8, { w: 6, d: 5, h: 3, col: 0x8A5A3A, roof: 0xE8C8D8, rk: "gable" }], ["kidsflowers", 16, -40, 1.4], ["tree", 26, -80, 1.2, { kind: "oak", h: 18, n: 2, gap: 9 }], ["k:giantmushroom", 16, 80, 1.4, { k: 1, n: 3 }]],
[["lake", 34, -10, 1, { R: 16, col: 0x3A6A8A }], ["k:gull", 4, 0, 1.6, { beast: "gull", at: 0 }], ["treasure", 18, 30, 1], ["cottage", 26, -60, 1, { col: 0x8A6A4A }], ["tree", 24, 80, 1.2, { kind: "oak", h: 16, n: 2, gap: 8 }], ["folk", 13, 20, 1, { folk: "peasant" }]],
[["palace", 44, -30, 0.6, { col: 0xE8D8F0 }], ["workbench", 16, 10, 1.2], ["clueTable", 18, -20, 1], ["banner", 22, 50, 1.2, { col: 0x6A3A8A, n: 3, gap: 5 }], ["k:statue", 24, -70, 1, { k: 1 }], ["folk", 13, 30, 1, { folk: "noble" }], ["folk", 14, -10, 1, { folk: "peasant" }]],
[["banner", 20, -30, 1.4, { col: 0x6A3A8A, n: 4, gap: 5 }], ["throne", 18, 10, 1.2, { col: 0x6A3A8A }], ["house", 26, 40, 1, { w: 8, d: 7, h: 7, col: 0xD8C8A8, roof: 0x6A4A3A, storey: 1, n: 2, gap: 10 }], ["house", 26, -70, 1, { w: 8, d: 7, h: 7, col: 0xC8B898, roof: 0x6A4A3A, storey: 1 }], ["folk", 13, 20, 1, { folk: "kid" }], ["folk", 14, -15, 1, { folk: "villager", sex: "f" }], ["folk", 15, 30, 1, { folk: "guard" }]]
] };
CT_SCN.fogg = { mid: [["train", 30, 0, 0.6, { cars: 2 }], ["k:palm", 18, 0, 1, { k: 1 }], ["globe", 16, 0, 0.8], ["k:elephant", 22, 0, 1, { beast: "elephant" }], ["steamer", 40, 0, 0.4], ["balloon", 30, 0, 0.4]],
ch: [
[["house", 28, -40, 1, { w: 16, d: 10, h: 12, col: 0xB8A890, roof: 0x3A3A40, storey: 1 }], ["armchairs", 16, -10, 1.2], ["globe", 18, 20, 1], ["tallclock", 20, 50, 1], ["gaslamp", 14, 80, 1, { n: 3, gap: 7 }], ["hansom", 22, -80, 1], ["folk", 13, 10, 1, { folk: "victorian" }], ["folk", 14, -25, 1, { folk: "victorian" }]],
[["lake", 40, -20, 1, { R: 28, col: 0x2A6A8A }], ["steamer", 8, -40, 0.6, { at: 0 }], ["k:palm", 22, 30, 1.2, { k: 1, n: 3, gap: 6 }], ["k:camel", 22, 60, 1, { beast: "camel" }], ["house", 28, 90, 1, { w: 8, d: 7, h: 5, col: 0xE8D8B8, roof: 0xE8D8B8, rk: "flat" }], ["folk", 13, 20, 1, { folk: "desert" }], ["folk", 14, -10, 1, { folk: "victorian" }]],
[["k:elephant", 20, -10, 1.2, { beast: "elephant" }], ["train", 30, 40, 0.7, { cars: 2 }], ["tree", 26, -60, 1.2, { kind: "oak", h: 18, crown: 0x2E6A26, n: 3, gap: 8 }], ["k:palm", 24, 80, 1.2, { k: 1, n: 2, gap: 6 }], ["k:tiger", 26, -100, 1, { beast: "tiger" }], ["folk", 13, 20, 1, { folk: "explorer" }]],
[["temple", 40, -20, 0.8, { col: 0xD8B888 }], ["k:brazier", 18, 20, 1.2, { k: 1, n: 3, gap: 5 }], ["k:elephant", 22, 60, 1, { beast: "elephant" }], ["k:palm", 24, -70, 1.2, { k: 1, n: 2, gap: 6 }], ["lanterns", 20, 90, 1], ["folk", 13, -10, 1, { folk: "desert", sex: "f", look: { top: 0xC83A6A, bottom: 0xC83A6A } }]],
[["lake", 40, -20, 1, { R: 28, col: 0x2A6A8A }], ["boat", 8, -40, 1.4, { kind: "felucca", at: 0, sail: 0xB8643A }], ["pagoda", 40, 40, 0.6], ["lanterns", 20, 60, 1.2, { n: 2, gap: 6 }], ["paifang", 30, -80, 0.8], ["torii", 26, 100, 1], ["folk", 13, 20, 1, { folk: "kimono" }]],
[["train", 30, -20, 0.9, { cars: 3 }], ["k:cow", 24, 40, 1.2, { beast: "cow", n: 5, gap: 3 }], ["sledge", 20, -60, 1.4, { col: 0x6A5A4A }], ["tents", 30, 80, 0.7], ["k:pine", 28, -100, 1.2, { k: 1, n: 3 }], ["folk", 13, 10, 1, { folk: "explorer" }]],
[["lake", 44, -10, 1, { R: 32, col: 0x2A5A7A }], ["steamer", 8, 0, 0.7, { at: 0 }], ["barrels", 20, 40, 1, { n: 6 }], ["burnt", 24, -60, 0.6], ["k:gull", 20, 70, 1, { beast: "gull", n: 3, gap: 3 }], ["k:rock", 26, -100, 1.6, { k: 1 }]],
[["clocktower", 80, -10, 0.4], ["tallclock", 20, 20, 1.4], ["house", 28, -50, 1, { w: 16, d: 10, h: 12, col: 0xB8A890, roof: 0x3A3A40, storey: 1 }], ["hansom", 22, 60, 1, { n: 2, gap: 5 }], ["gaslamp", 14, 90, 1, { n: 3, gap: 7 }], ["folk", 13, 10, 1, { folk: "victorian" }], ["folk", 14, -15, 1, { folk: "lady", sex: "f" }]]
] };
CT_SCN.lostworld = { mid: [["tree", 22, 0, 1.2, { kind: "oak", h: 20, crown: 0x2E6A26 }], ["k:palm", 18, 0, 1.2, { k: 1 }], ["bigfungus", 28, 0, 0.4], ["k:reeds", 16, 0, 1.4, { k: 1 }], ["nest", 16, 0, 1.2], ["stego", 28, 0, 0.8]],
ch: [
[["house", 28, -40, 1, { w: 14, d: 10, h: 10, col: 0x9A8A78, roof: 0x3A3A40, storey: 1 }], ["k:statue", 18, -10, 1, { k: 1 }], ["bones", 18, 30, 1.2], ["stands", 24, 60, 0.8], ["globe", 18, -70, 1], ["gaslamp", 14, 90, 1, { n: 2, gap: 7 }], ["folk", 13, 20, 1, { folk: "scholar" }]],
[["lake", 40, -20, 1, { R: 26, col: 0x3A6A5A }], ["boat", 6, -60, 1.2, { kind: "row", at: 0, col: 0x6A5A3A }], ["steamer", 12, 60, 0.3, { at: 0 }], ["k:reeds", 20, 40, 2, { k: 1, n: 3, gap: 6 }], ["camp", 16, 80, 1], ["k:palm", 24, -100, 1.2, { k: 1, n: 3, gap: 6 }], ["folk", 13, -10, 1, { folk: "explorer" }]],
[["plateau", 120, -10, 0.3, { r: 42 }], ["pinnacle", 40, 40, 0.6, { log: 1 }], ["cliff", 44, -60, 0.8, { col: 0x8A5A44 }], ["camp", 16, 20, 1], ["k:pterodactyl", 30, 80, 1, { beast: "roc" }], ["tree", 26, -100, 1.2, { kind: "oak", h: 20, crown: 0x2E6A26 }]],
[["iguanodon", 22, -20, 1.4, { n: 2, gap: 8 }], ["stego", 30, 40, 1], ["nest", 20, 60, 1.4, { n: 3, gap: 4 }], ["lake", 36, -70, 1, { R: 14, col: 0x3A5A3A }], ["k:roc", 30, 90, 0.6, { beast: "roc" }], ["k:reeds", 20, -100, 1.6, { k: 1 }]],
[["iguanodon", 22, -30, 1.6], ["stockade", 28, 20, 0.8], ["tents", 28, 20, 0.4], ["ape", 20, 60, 1.2, { n: 3, gap: 2.4 }], ["tree", 28, 90, 1.4, { kind: "oak", h: 24, crown: 0x2E6A26, n: 2, gap: 10 }], ["camp", 16, -60, 1]],
[["cave", 34, -20, 0.8, { col: 0x8A5A44 }], ["cliff", 44, 40, 0.8, { col: 0x8A5A44 }], ["camp", 16, 70, 1], ["tents", 30, -70, 0.6], ["k:palm", 24, 100, 1.2, { k: 1, n: 2, gap: 6 }], ["folk", 13, 10, 1, { folk: "explorer" }]],
[["house", 28, -40, 1, { w: 14, d: 10, h: 12, col: 0x9A8A78, roof: 0x3A3A40, storey: 1 }], ["stands", 24, 30, 1], ["k:roc", 30, 10, 0.5, { beast: "roc", alt: 14 }], ["earthboxes", 16, -10, 0.5, { n: 1 }], ["gaslamp", 14, 70, 1, { n: 3, gap: 7 }], ["hansom", 22, -90, 1], ["folk", 13, 20, 1, { folk: "victorian" }]]
] };
CT_SCN.tarzan = { mid: [["tree", 22, 0, 1.4, { kind: "oak", h: 24, crown: 0x2E6A26 }], ["k:palm", 18, 0, 1.2, { k: 1, n: 2, gap: 6 }], ["ape", 18, 0, 1], ["k:reeds", 16, 0, 1.4, { k: 1 }], ["k:elephant", 24, 0, 1, { beast: "elephant" }], ["k:snake", 14, 0, 1, { beast: "snake" }]],
ch: [
[["lake", 40, -20, 1, { R: 28, col: 0x2A7AAA }], ["ship", 8, -40, 1, { at: 0 }], ["barrels", 18, 30, 1, { n: 5 }], ["chest", 16, 50, 1.2], ["k:palm", 24, 80, 1.2, { k: 1, n: 3, gap: 6 }], ["folk", 13, -10, 1, { folk: "pirate" }]],
[["cabin", 24, -20, 1.2], ["k:fence", 18, 30, 1.2, { k: 1, n: 3 }], ["k:palm", 22, 60, 1.2, { k: 1, n: 2, gap: 6 }], ["camp", 16, -60, 1], ["tree", 28, 90, 1.4, { kind: "oak", h: 22, crown: 0x2E6A26 }], ["folk", 13, 10, 1, { folk: "explorer" }]],
[["ape", 18, -30, 1.4, { n: 4, gap: 2.4 }], ["drum", 22, 20, 1], ["tree", 28, 60, 1.6, { kind: "oak", h: 26, crown: 0x2E6A26, n: 2, gap: 10 }], ["cliff", 44, -80, 0.6, { col: 0x4A6A3A }], ["k:palm", 24, 100, 1.2, { k: 1 }]],
[["cabin", 24, -20, 1.2], ["clueTable", 16, 20, 0.8], ["globe", 16, 40, 0.6], ["ape", 18, -50, 1, { n: 2, gap: 2.4 }], ["tree", 28, 80, 1.4, { kind: "oak", h: 22, crown: 0x2E6A26 }], ["k:palm", 22, -90, 1.2, { k: 1 }]],
[["ape", 20, -10, 2], ["k:lion", 24, 40, 1.2, { beast: "lion" }], ["k:elephant", 30, -60, 1.2, { beast: "elephant" }], ["tree", 28, 80, 1.6, { kind: "oak", h: 26, crown: 0x2E6A26 }], ["cliff", 44, -100, 0.6, { col: 0x4A6A3A }], ["drum", 22, 100, 0.8]],
[["tents", 28, -30, 0.8], ["cabin", 26, 40, 1], ["k:palm", 22, 70, 1.2, { k: 1, n: 3, gap: 6 }], ["ape", 20, -60, 1.4], ["chest", 16, 10, 1], ["folk", 13, -10, 1, { folk: "lady", sex: "f" }], ["folk", 14, 20, 1, { folk: "scholar" }]],
[["hut", 22, -30, 1.2, { n: 3, gap: 8 }], ["stockade", 30, 30, 1], ["ship", 50, 80, 0.5], ["camp", 16, -70, 1], ["k:palm", 24, 100, 1.2, { k: 1, n: 2, gap: 6 }], ["folk", 13, 10, 1, { folk: "sailor" }]]
] };
CT_SCN.cavor = { mid: [["crater", 24, 0, 0.8], ["mooncalf", 22, 0, 0.8], ["k:crystalspire", 18, 0, 1, { k: 1 }], ["k:rock", 18, 0, 1.6, { k: 1 }], ["shaftcap", 20, 0, 0.6], ["bigfungus", 28, 0, 0.3]],
ch: [
[["house", 26, -40, 1, { w: 10, d: 8, h: 5, col: 0xB8A888, roof: 0x6A4A3A, chim: 1 }], ["engine", 22, 20, 0.8], ["k:brazier", 16, -10, 1, { k: 1 }], ["labbench", 18, 50, 1], ["k:fence", 20, -80, 1.2, { k: 1, n: 3 }], ["k:tree", 24, 90, 1, { k: 1, n: 2 }], ["folk", 13, 20, 1, { folk: "scholar" }]],
[["cavorsphere", 18, -10, 1.4], ["barrels", 18, 30, 1, { n: 5 }], ["engine", 22, 60, 0.7], ["house", 28, -60, 1, { w: 10, d: 8, h: 5, col: 0xB8A888, roof: 0x6A4A3A }], ["crater", 26, 90, 0.8], ["k:hourglass", 14, -100, 1, { k: 1 }]],
[["crater", 24, -30, 1], ["bigfungus", 30, 30, 0.5], ["k:crystalspire", 24, 60, 1.2, { k: 1, n: 3, gap: 5 }], ["k:rock", 22, -70, 1.6, { k: 1, n: 2, gap: 6 }], ["cavorsphere", 18, 10, 1], ["skydisc", 500, 20, 1, { sky: 1, alt: 180, R: 30, col: 0x3A6A9A }]],
[["mooncalf", 22, -20, 1.2, { n: 3, gap: 8 }], ["shaftcap", 26, 30, 1.2], ["fig", 18, 50, 0.9, { col: 0x7A7A8A, hat: 0x5A5A6A, n: 3, gap: 1.4 }], ["k:crystalspire", 26, -80, 1.2, { k: 1 }], ["cave", 36, 90, 0.8, { col: 0x6A6A70 }], ["bigfungus", 30, -110, 0.4]],
[["throne", 18, -10, 1.6, { col: 0x4A3A8A }], ["fig", 18, 20, 0.9, { col: 0x7A7A8A, hat: 0x5A5A6A, n: 5, gap: 1.4 }], ["k:crystalspire", 24, -50, 1.4, { k: 1, n: 3, gap: 5 }], ["k:orrery", 20, 60, 1.2, { k: 1 }], ["spires", 30, 90, 0.8, { col: 0x9A7AE8 }], ["k:brazier", 16, -90, 1, { k: 1 }]],
[["cavorsphere", 18, -10, 1.2], ["treasure", 16, 30, 0.8], ["crater", 24, 60, 1], ["k:rock", 22, -60, 1.6, { k: 1 }], ["lake", 44, -100, 1, { R: 20, col: 0x2A6A9A }], ["skydisc", 500, 0, 1, { sky: 1, alt: 180, R: 30, col: 0x3A6A9A }]]
] };
CT_SCN.lowell = { mid: [["crater", 24, 0, 0.8], ["k:rock", 18, 0, 1.6, { k: 1 }], ["observatory", 30, 0, 0.5], ["k:crystalspire", 20, 0, 1, { k: 1 }], ["shaftcap", 18, 0, 0.5], ["redweedpatch", 20, 0, 0.8]],
ch: [
[["globe", 18, -10, 1.4], ["observatory", 30, -40, 0.8], ["telescope", 18, 30, 1.2], ["clueTable", 16, 60, 1], ["k:orrery", 18, -70, 1.2, { k: 1 }], ["skydisc", 500, 20, 1, { sky: 1, alt: 180, R: 10, col: 0x8A4A2A }]],
[["observatory", 30, -30, 1.2], ["telescope", 18, 20, 1.6], ["k:pine", 26, 60, 1.2, { k: 1, n: 3 }], ["cabin", 28, -80, 1], ["k:rock", 22, 90, 1.6, { k: 1 }], ["folk", 13, 10, 1, { folk: "scholar" }]],
[["lake", 34, -10, 1, { R: 6, col: 0x3A6A8A }], ["crater", 26, 30, 1], ["ruins", 30, 60, 0.8, { col: 0xA85A34 }], ["k:crystalspire", 26, -60, 1.2, { k: 1 }], ["stones", 30, 90, 0.6, { R: 8, n: 10, col: 0xA85A34 }], ["k:rock", 22, -100, 1.8, { k: 1 }]],
[["crater", 24, -30, 1.4], ["crater", 28, 40, 1], ["k:rock", 22, 70, 2, { k: 1, n: 2, gap: 6 }], ["dome", 26, -70, 0.8], ["engine", 22, 100, 0.5], ["shaftcap", 20, -100, 0.6]]
] };
CT_SCN.jason = { mid: [["k:statue", 22, 0, 1, { k: 1 }], ["k:rock", 18, 0, 1.4, { k: 1 }], ["tree", 22, 0, 1, { kind: "cedar", h: 12, crown: 0x3A6A3A }], ["ruins", 28, 0, 0.6]],
ch: [
[["k:horse", 18, -20, 1.2, { beast: "horse" }], ["k:rock", 26, 40, 2.2, { k: 1 }], ["potfire", 16, 20, 1], ["tree", 30, -70, 1, { kind: "cedar", h: 14 }], ["tree", 30, 80, 1, { kind: "oak", h: 12 }], ["k:brazier", 20, -50, 1, { k: 1 }]],
[["house", 34, -70, 1, { w: 9, d: 8, h: 6, col: 0xE8E2D4, roof: 0xB8643A, rk: "flat" }], ["folk", 14, -15, 1, { folk: "greek" }], ["folk", 15, 20, 1, { folk: "noble" }], ["k:statue", 22, 60, 1, { k: 1 }], ["banner", 26, -110, 1, { col: 0x3A5AA8, n: 2, gap: 5 }]],
[["boat", 24, -30, 1.2, { kind: "long", L: 18, col: 0x6A4A2A, sail: 0xE8DCC0, stripe: 0xC8A040 }], ["folk", 16, 20, 1, { folk: "greek" }], ["folk", 18, 32, 1, { folk: "greek" }], ["k:rock", 30, 80, 1.4, { k: 1 }], ["tree", 30, -100, 1, { kind: "cedar", h: 14 }]],
[["house", 24, -30, 1, { w: 6, d: 5, h: 4, col: 0xC8B898, roof: 0x8A6A4A, rk: "flat" }], ["feasttable", 18, 20, 1.2], ["k:rock", 28, -70, 2, { k: 1 }], ["stones", 30, 90, 0.6, { R: 6, n: 7, col: 0xB8B0A0 }]],
[["k:rock", 20, -24, 3.2, { k: 1 }], ["k:rock", 20, 24, 3.2, { k: 1 }], ["boat", 30, 0, 1, { kind: "long", L: 16, col: 0x6A4A2A, sail: 0xE8DCC0, stripe: 0xC8A040 }], ["stones", 34, -90, 0.8, { R: 7, n: 8, col: 0x9A9AA0 }]],
[["quad", 22, -24, 1.4, { L: 3, H: 1.7, col: 0x8A6A3A, horns: 0xC8A040, eyes: 0xF28A2A, neck: 0.6 }], ["quad", 22, -8, 1.4, { L: 3, H: 1.7, col: 0x8A6A3A, horns: 0xC8A040, eyes: 0xF28A2A, neck: 0.6 }], ["potfire", 18, 20, 1],
["house", 36, 70, 1.2, { w: 12, d: 10, h: 7, col: 0xC8A060, roof: 0x8A3A2A, rk: "flat" }], ["banner", 26, -90, 1, { col: 0x8A2A2A, n: 2, gap: 5 }]],
[["tree", 22, 0, 1.6, { kind: "oak", h: 16, crown: 0x4A6A2A }], ["quad", 30, 30, 1.8, { L: 6, H: 1.6, col: 0x2A5A3A, wings: 0x1E3A2A, horns: 0x2A2A2A, neck: 0.9, tailL: 1, tailUp: 0.2, eyes: 0xF2C83A }], ["k:brazier", 18, -30, 1, { k: 1 }], ["k:altar", 20, -50, 1, { k: 1 }]],
[["boat", 24, -30, 1.2, { kind: "long", L: 18, col: 0x6A4A2A, sail: 0xE8DCC0, stripe: 0xC8A040 }], ["house", 34, 60, 1, { w: 9, d: 8, h: 6, col: 0xE8E2D4, roof: 0xB8643A, rk: "flat" }], ["folk", 16, 20, 1, { folk: "greek" }], ["banner", 26, -110, 1, { col: 0xC8A040, n: 2, gap: 5 }]]
] };
var CTU = { lm: null, lmc: {}, dbl: {}, bark: {}, geo: {}, n: 0 };
var CTU_HSL = { h: 0, s: 0, l: 0 };
function ctuHex(c) { return typeof c === "number" ? c : (c && c.getHex ? c.getHex() : 0x808080); }
function ctuMix(a, b, t) {
var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255, br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
return (Math.round(ar + (br - ar) * t) << 16) | (Math.round(ag + (bg - ag) * t) << 8) | Math.round(ab + (bb - ab) * t);
}
function ctuMul(a, k) { return ctuMix(0, a, Math.min(1, k)) | 0; }
function ctuLeafTex() { return typeof leafTex === "function" ? leafTex() : null; }
function ctuLeafMat(col) { return __ZC(354, 207, this, arguments, new.target); }
function ctuFoliage(m, geo) { return __ZC(354, 208, this, arguments, new.target); }
function ctuCards(B, shape, p, col, M, lite, seed) { return __ZC(354, 209, this, arguments, new.target); }
function ctuGeo(B) { return __ZC(354, 210, this, arguments, new.target); }
function ctuLeaves(G) { return __ZC(354, 211, this, arguments, new.target); }
function ctuLimb(g, a, b, r0, r1, col, seg) { return __ZC(354, 212, this, arguments, new.target); }
function ctuTree(g, o) { return __ZC(354, 213, this, arguments, new.target); }
if (typeof CTD_SET !== "undefined" && CTD_SET.tree) {
var ctuTree0 = CTD_SET.tree;
CTD_SET.tree = function (g, o) { return __ZC(354, 214, this, arguments, new.target); };
}
if (typeof CTS_SET !== "undefined" && CTS_SET.bigtree) {
CTS_SET.bigtree = function (g, o) { return __ZC(354, 215, this, arguments, new.target); };
}
function ctuKid(m, w, h, d, col, x, y, z, e) {
var sc = m.scale, k = new THREE.Mesh(ctBox(w / sc.x, h / sc.y, d / sc.z), ctM(col, e));
k.position.set(x / sc.x, y / sc.y, z / sc.z);
k.userData.ctu = 1;
m.add(k);
return k;
}
function ctuKidG(m, geo, col, x, y, z, ry, e) { var k = new THREE.Mesh(geo, ctM(col, e)); k.position.set(x, y, z); if (ry)
k.rotation.y = ry; k.userData.ctu = 1; m.add(k); return k; }
function ctuUpright(m) { return Math.abs(m.rotation.x) < 0.02 && Math.abs(m.rotation.z) < 0.02; }
function ctuTrim(col) { return ctuMix(col, 0xE4DCCB, 0.55); }
function ctuBase(col) { return ctuMix(col, 0x5E5A54, 0.55); }
function ctuThin(p, sc) {
var W = p.width * sc.x, H = p.height * sc.y, D = p.depth * sc.z;
if (D <= W && D <= H)
return { ax: "z", t: D, w: W, h: H };
if (W <= D && W <= H)
return { ax: "x", t: W, w: D, h: H };
return { ax: "y", t: H, w: W, h: D };
}
function ctuWindow(m, f, lite) { return __ZC(354, 216, this, arguments, new.target); }
function ctuDoor(m, f, lite) { return __ZC(354, 217, this, arguments, new.target); }
function ctuWall(m, p, sc, lite, many) { return __ZC(354, 218, this, arguments, new.target); }
function ctuRoof(m, p) { return __ZC(354, 219, this, arguments, new.target); }
function ctuTower(m, p, sc, lite) { return __ZC(354, 220, this, arguments, new.target); }
function ctuColumn(m, p, sc) { return __ZC(354, 221, this, arguments, new.target); }
function ctuDetail(G) { return __ZC(354, 222, this, arguments, new.target); }
(function () {
if (typeof ctnSurf !== "function")
return;
var s0 = ctnSurf;
ctnSurf = function (G) {
try {
ctuDetail(G);
}
catch (e) {
if (window.console)
console.warn("classic-tales remodel:", e);
}
try {
ctuLeaves(G);
}
catch (e) {
if (window.console)
console.warn("classic-tales leaves:", e);
}
s0(G);
if (G && G.userData && G.userData.ctPlace)
try {
ctuMergeOwn(G);
}
catch (e) {
if (window.console)
console.warn("classic-tales join:", e);
}
};
if (typeof ctnKind === "function") {
var k0 = ctnKind;
ctnKind = function (m, geo) {
var k = k0.apply(this, arguments);
if (k === "wood" && geo.type === "CylinderGeometry") {
var p = geo.parameters || {}, r = Math.max(p.radiusTop, p.radiusBottom);
if (r >= 0.2 && p.height >= r * 2.5)
return "bark";
}
return k;
};
}
})();
function ctuMergeOwn(G) { return __ZC(354, 223, this, arguments, new.target); }
(function () {
if (typeof ctsPlace !== "function")
return;
var p0 = ctsPlace;
ctsPlace = function (root, p) { var r = p0.apply(this, arguments); if (p.g)
p.g.userData.ctPlace = 1; return r; };
})();
function ctuRock(r, seed, ico) { return __ZC(354, 224, this, arguments, new.target); }
var CTU_TREEKINDS = { rock: 1, boulder: 1, oak: 1, pine: 1, palm: 1, jtree: 1, blossom: 1, liana: 1, peach: 1, olive: 1, tulip: 1, goldtree: 1, cedar: 1, tinytree: 0, datepalm: 1, dead: 1, fern: 1 };
function ctuInstGeo(shape, p) {
var key = shape + "|" + JSON.stringify(p);
if (CTU.geo[key])
return CTU.geo[key];
var B = { pos: [], nor: [], uv: [], col: null };
ctuCards(B, shape, p, 0xFFFFFF, null, ctLite(), ctHash(key));
var g = ctuGeo(B);
g.userData.ctuLeaf = 1;
return (CTU.geo[key] = g);
}
function ctuFrondGeo(L) { return __ZC(354, 225, this, arguments, new.target); }
function ctuBake(list) { return __ZC(354, 226, this, arguments, new.target); }
function ctuBarkGeo(geo) { if (geo.userData.ctuBark)
return geo; var c = ctnMetre(geo); c.userData.ctuBark = 1; return c; }
function ctuKinds(K) { return __ZC(354, 227, this, arguments, new.target); }
(function () {
if (typeof ctsKinds === "function") {
var a = ctsKinds;
ctsKinds = function () { return ctuKinds(a.apply(this, arguments)); };
}
if (typeof ctdKinds === "function") {
var b = ctdKinds;
ctdKinds = function () { return ctuKinds(b.apply(this, arguments)); };
}
})();
function ctuInstMats(root) { return __ZC(354, 228, this, arguments, new.target); }
(function () {
if (typeof ctsBuild !== "function")
return;
var b0 = ctsBuild;
ctsBuild = function (G) { var r = b0.apply(this, arguments); try {
if (CTS.root)
ctuInstMats(CTS.root);
}
catch (e) {
if (window.console)
console.warn("classic-tales woods:", e);
} return r; };
})();
var CTU_GLB = { dog: 1, wolf: 1, horse: 1, deer: 1, stag: 1, cow: 1, pig: 1, sheep: 1, fox: 1, dragon: 1, pegasus: 1, unicorn: 1 };
var CTU_LEN = { wolf: 1.6, dog: 1.1, horse: 2.5, deer: 1.9, stag: 2.1, cow: 2.6, pig: 1.4, sheep: 1.3, fox: 1, dragon: 14, pegasus: 2.6, unicorn: 2.5, goat: 1.3, camel: 3.2, elephant: 6, mammoth: 6.5, cerberus: 3.4, chicken: 0.5, cat: 0.7 };
var CTU_BEASTS = {
wolf: function () { return [["wolf", 1]]; },
deer: function () { return [["deer", 1]]; },
bull: function () { return [["cow", 1.05]]; },
camel: function () { return [["camel", 1]]; },
elephant: function () { return [["elephant", 1]]; },
mastodon: function () { return [["mammoth", 1]]; },
goatpair: function () { return [["goat", 1, -0.8, 0], ["goat", 0.9, 0.8, 0.3]]; },
sleipnir: function () { return [["horse", 1.15, 0, 0, { white: 1 }]]; },
pegasus: function () { return [["pegasus", 1]]; },
knight: function (o) { return [["horse", 1, 0, 0, { white: o.horse && o.horse > 0xA00000 }], ["@knight", 1, 0, 0, { ride: 1, look: o.col ? { top: o.col, bottom: o.col } : null }]]; },
horseman: function () { return [["horse", 1.05], ["@rider", 1, 0, 0, { ride: 1, headless: 1 }]]; },
bremen: function () { return [["horse", 0.72], ["dog", 1, 0, -0.1, { on: 0 }], ["cat", 1, 0, 0, { on: 1 }], ["chicken", 1, 0, 0, { on: 2 }]]; },
sheep: function () { return [["sheep", 1]]; },
quad: function (o) { if (o.wings && o.horns)
return [["dragon", (o.L || 6) / 14 * 2.2]]; if (o.mane)
return [["horse", 1, 0, 0, { white: 1 }]]; if (o.ears && o.neck && (o.L || 0) < 2)
return [["horse", 0.68]]; return null; }
};
var CTU_RIDERS = { knight: { top: 0x9A9AA2, bottom: 0x8A8A92, hat: "helmet", hatColor: 0x9A9AA2, back: "cape", backColor: 0x2A4AA8 }, rider: { topKind: "robe", top: 0x1A1A1E, bottom: 0x1A1A1E, back: "cape", backColor: 0x141418 } };
function ctuSpecId(a, want, seed) { return __ZC(354, 229, this, arguments, new.target); }
function ctuOne(a, o, seed) { return __ZC(354, 230, this, arguments, new.target); }
function ctuBeasts(parent, list, s, seed) { return __ZC(354, 231, this, arguments, new.target); }
(function () {
if (typeof ctdPut !== "function")
return;
var p0 = ctdPut;
ctdPut = function (G, n, x, z, rot, s, o) {
var f = CTU_BEASTS[n], list = f && f(o || {});
if (!list || !CTS.root || typeof build !== "function")
return p0.apply(this, arguments);
var h = new THREE.Group();
h.position.set(x, (o && o.fly) || ctsGround(x, z), z);
h.rotation.y = rot || 0;
h.userData.ctKeep = 1;
CTS.root.add(h);
try {
ctuBeasts(h, list, s || 1, n + "_" + Math.round(x) + "_" + Math.round(z));
}
catch (e) {
if (window.console)
console.warn("classic-tales beast:", e);
}
var len = (CTU_LEN[list[0][0]] || 2) * (list[0][1] || 1) * (s || 1);
ctsSolid({ x: x, z: z, r: Math.max(0.6, len * 0.28), h: 2.4 * (s || 1) });
CTS.far.push([x, z, len * 0.6 + 2]);
return h;
};
})();
(function () {
if (typeof ctnPut === "function") {
var n0 = ctnPut;
ctnPut = function (G, KG, e, x, z, rot, seed) {
e = ctnNorm(e);
var n = e[0], o = e[4] || {}, f = !o.beast && !o.folk && !o.k && CTU_BEASTS[n], list = f && f(o);
if (list) {
CTS.folk.push({ x: x, z: z, rot: rot, o: Object.assign({}, o, { ctu: n }), seed: seed, beast: 1, s: e[3] || 1 });
return;
}
return n0.apply(this, arguments);
};
}
ctnBeast = function (G, x, z, rot, o, seed) {
var h = new THREE.Group();
h.position.set(x, ctsGround(x, z) + (o.alt || 0), z);
h.rotation.y = rot;
h.userData.ctKeep = 1;
if (o.ctu) {
var list = CTU_BEASTS[o.ctu](o);
if (!list)
return;
ctuBeasts(h, list, o.sz || 1, seed);
G.add(h);
return;
}
var glb = !!CTU_GLB[o.beast], g = build({ id: "ctn_" + seed, archetype: o.beast, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: !glb, hub: !glb, look: o.look || undefined });
if (!g)
return;
var k = (o.s || 1) * (seed && o.sz || 1);
if (k !== 1)
g.scale.multiplyScalar(k);
g.userData.ctKeep = 1;
h.add(g);
G.add(h);
};
})();
var CTN_HOUSE = { holmes: "victorian", jekyll: "victorian", invisible: "victorian", martians: "victorian", timemachine: "victorian", dracula: "victorian", cavor: "victorian",
lostworld: "victorian", fogg: "victorian", phantom: "victorian", centreearth: "victorian", cthulhu: "victorian", alice: "victorian", columbiad: "victorian",
arabian: "mudbrick", gilgamesh: "mudbrick", egypt: "mudbrick", perseus: "cycladic", orpheus: "cycladic", yokai: "teahouse", tarzan: "roundhut",
sh_hamlet: "tudorhouse", sh_macbeth: "tudorhouse", sh_lear: "tudorhouse", sh_twelfth: "tudorhouse", sh_henry: "tudorhouse", sh_richard: "tudorhouse", sh_winter: "tudorhouse",
sh_asyou: "tudorhouse", sh_tempest: "talecottage", sh_romeo: "casafi", sh_merchant: "casafi", sh_othello: "casafi", sh_muchado: "casafi",
sh_dream: "cycladic", sh_caesar: "cycladic", sh_antony: "cycladic" };
var CTN_DOORS = {
house: ["*", 3.5, "A house", "the front door"], harehouse: ["*", 3.5, "The March Hare's house", "the front door"], crookedhouse: ["talecottage", 3, "The crooked house", "the crooked door"],
cottage: ["talecottage", 3, "A cottage", "the cottage door"], farmhouse: ["talecottage", 3, "A farmhouse", "the farmhouse door"], cabin: ["talecottage", 3.3, "A cabin", "the cabin door"],
pighouse: ["talecottage", 1, "A little pig's house", "the little door"], gingerhut: ["candyhouse", 1, "The gingerbread house", "the gingerbread door"],
hut: ["roundhut", 2.8, "A hut", "the low door"], manor: ["@manor", 5, "The manor", "the front door"],
church: ["@church", 10, "The church", "the church door"], castle: ["@castle", 18, "The castle", "the castle gate"], palace: ["@castle", 9, "The palace", "the palace doors"],
cragcastle: ["@castle", 40, "The castle on the crag", "the way up into the castle"],
tower: ["@tower", 4.6, "The tower", "the tower door"], lighthouse: ["@lighthouse", 3.6, "The lighthouse", "the lighthouse door"], igloo: ["@igloo", 5.5, "The snow house", "the low ice tunnel"],
observatory: ["@tower", 6, "The observatory", "the observatory door"], obshut: ["@tower", 1.8, "The observatory hut", "the hut door"],
seapalace: ["@merpalace", 10, "The sea palace", "the palace doors"], icepalace: ["icepalace", 4, "The Snow Queen's palace", "the doors of ice"],
temple: ["grandtemple", 7.5, "The temple", "the temple doors"], pagoda: ["pagoda", 3.6, "The pagoda", "the pagoda door"], ziggurat: ["ziggurat", 20, "The ziggurat", "the temple gate"],
pyramid: ["pyramid", 15, "The pyramid", "the pyramid's entrance"], egtemple: ["pyramid", 8.6, "The temple", "the temple gate"],
shieldhall: ["asgard", 9, "The hall", "the great doors"], opera: ["operahouse", 16.5, "The Paris Opera", "the great doors"], clocktower: ["@tower", 6, "The clock tower", "the tower door"]
};
var CTN_STORY = { odin: { shieldhall: "asgard" }, thor: { shieldhall: "asgard" }, beowulf: { shieldhall: "@castle" }, fogg: { temple: "mandir" }, mermaid: { palace: "@merpalace" },
alice: { harehouse: "teahouse" }, yokai: { hut: "teahouse" } };
var CTN_SHUT = { braidtower: 1, tinypalace: 1, tinytown: 1 };
function ctnDoor(n, x, z, rot, s, y, o) { return __ZC(354, 232, this, arguments, new.target); }
