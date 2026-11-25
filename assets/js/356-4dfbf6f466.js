/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DAV = { base: -1040000, G: null, built: false, t: 0, lite: false, zone: "florence", place: "", mats: {}, tex: {},
solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [], glows: [], fx: [], rooms: [], districts: [], water: [],
ride: null, busy: false, pt: 0, vt: 0, told: {}, home: null, insideOf: null, moving: false };
var DAV_KEY = "davinci";
var DAV_NAME = "Leonardo's Italy";
var DAV_BOUND = { x0: -5200, x1: 4600, z0: -4800, z1: 1500 };
var DAV_TOWNS = [
{ k: "florence", name: "Florence", x: 0, z: 20, r: 700, e: 220, y: 0 },
{ k: "oltrarno", name: "Florence, over the Arno", x: -40, z: 380, r: 260, e: 120, y: 0 },
{ k: "proving", name: "the Proving Ground", x: 1450, z: 60, r: 300, e: 200, y: 0 },
{ k: "ceceri", name: "the top of Monte Ceceri", x: 700, z: -1150, r: 46, e: 30, y: 158 },
{ k: "vinci", name: "Vinci", x: -2700, z: -220, r: 170, e: 160, y: 70 },
{ k: "anchiano", name: "Anchiano", x: -2860, z: -700, r: 60, e: 90, y: 112 },
{ k: "milan", name: "Milan", x: 150, z: -3900, r: 620, e: 260, y: 20 },
{ k: "amboise", name: "Amboise", x: -3880, z: -2560, r: 300, e: 200, y: 8 },
{ k: "chateau", name: "the castle of Amboise", x: -4010, z: -2680, r: 70, e: 26, y: 30 },
{ k: "imola", name: "Imola", x: 3400, z: -700, r: 230, e: 150, y: 15 }
];
function davArnoZ(x) {
var z = 230 + 30 * Math.sin(x / 500);
if (x < -3000)
z += (x + 3000) * (x + 3000) / 420;
if (x > 1900)
z += (x - 1900) * (x - 1900) / 300;
return z;
}
var DAV_WATER_Y = -1.6;
var DAV_LOIRE = { z: -2760, x0: -5300, x1: -3050, lake: { x: -2960, z: -2760, r: 190 }, y: 5.4 };
var DAV_NAVIGLI = { x: 150, z: -3900, r: 330, w: 7, y: 17.4 };
var DAV_SPOTS = {
arrive: { x: 52, z: 128, name: "the Piazza della Signoria" },
duomo: { x: 30, z: -150, name: "the cathedral square" },
bottega: { x: 168, z: -58, name: "the Bottega" },
market: { x: -60, z: -32, name: "the Old Market" },
bridge: { x: -20, z: 236, name: "the Ponte Vecchio" },
hospital: { x: 150, z: -228, name: "the hospital of Santa Maria Nuova" },
vecchio: { x: 84, z: 62, name: "the Palazzo Vecchio" },
ceceri: { x: 700, z: -1140, name: "the top of Monte Ceceri" },
proving: { x: 1450, z: 60, name: "the Proving Ground" },
vinci: { x: -2700, z: -220, name: "Vinci" },
anchiano: { x: -2860, z: -700, name: "Anchiano" },
milan: { x: 150, z: -3760, name: "Milan" },
amboise: { x: -3880, z: -2520, name: "Amboise" },
imola: { x: 3400, z: -640, name: "Imola" }
};
var DAV_COACH = [["florence", "Florence (the Porta al Prato)", -560, 70], ["proving", "The Proving Ground", 1260, -30], ["vinci", "Vinci", -2620, -120],
["milan", "Milan (the Porta Romana)", 160, -3330], ["amboise", "Amboise", -3700, -2420], ["imola", "Imola (the safe side of its gate)", 3170, -700], ["ceceri", "Below Monte Ceceri", 640, -860]];
var DAV_FOLK = {
leonardo: { name: "Leonardo da Vinci", title: "painter, engineer, student of everything",
persona: "Leonardo da Vinci (1452-1519), born at Anchiano near Vinci, son of the notary Ser Piero and of Caterina. Painter of the Last Supper and of Lisa Gherardini's portrait, engineer to Ludovico Sforza in Milan and to Cesare Borgia, and at the end of his life the guest of King Francis I at Amboise. Left-handed; writes his notebooks from right to left, in mirror writing. Curious about everything: flight, water, light, anatomy, plants, rocks, machines, music. Gentle, witty, a little restless; he starts more than he finishes and knows it. He speaks warmly to apprentices, asks questions back, and loves to explain by drawing. He never pretends to know what he does not: he says 'let us look and see'. He speaks only of his own time (he knows nothing after 1519).",
greet: "Ah, a new pair of eyes! Good. Do not believe me because I say it: look, and see for yourself. What would you like to understand today: birds, water, light, or the inside of a machine?",
look: { sex: "m", skin: 0xE8C8A8, hair: 0xD8D4CC, hairStyle: "long", beard: "long", top: 0xC87A80, topKind: "robe", bottom: 0x6A3A3A, layer: "longcoat", layerColor: 0x8A4A50, hat: "beanie", hatColor: 0x3A2A2A, shoes: 0x3A2A1E } },
verrocchio: { name: "Andrea del Verrocchio", title: "master of the Bottega",
persona: "Andrea del Verrocchio (about 1435-1488), goldsmith, sculptor and painter of Florence, master of the busiest workshop in the city, where young Leonardo was apprenticed from about 1466. He made the bronze David, the great copper ball on top of the cathedral's lantern (1471, Leonardo helped), and the horseman Colleoni for Venice. Practical, proud of his workshop, a little gruff and very kind. He says the story goes that he gave up painting after seeing the angel Leonardo painted in his Baptism of Christ, and laughs about it.",
greet: "Welcome to my bottega. Wash your hands, mind the plaster, and do not touch the bronze while it cools. You want to learn? Then grind colours first. Everyone grinds colours first.",
look: { sex: "m", skin: 0xDCB894, hair: 0x3A2A1E, hairStyle: "short", top: 0x4A3A2A, bottom: 0x2A2420, layer: "apron", layerColor: 0x8A7A5A, hat: "cap", hatColor: 0x8A2A2A } },
salai: { name: "Salai (Gian Giacomo Caprotti)", title: "Leonardo's pupil",
persona: "Salai, Gian Giacomo Caprotti (1480-1524), who came to Leonardo's household at ten and stayed nearly thirty years. Leonardo nicknamed him Salai, 'little devil', and wrote in his notebook that the boy was 'thief, liar, obstinate, glutton'. Curly-haired, handsome, cheeky, fond of fine clothes, and fiercely loyal to Leonardo. He jokes, teases and secretly wants to be as good a painter as his master.",
greet: "Don't tell the master I'm sitting down. What do you want? If it's the good paint brushes, I don't have them. Probably.",
look: { sex: "m", skin: 0xE0BC98, hair: 0x8A5A2A, hairStyle: "curly", top: 0x3A6A8A, bottom: 0xA8382A, layer: "tunic", layerColor: 0x2A4A7A, shoes: 0x6A3A1E } },
melzi: { name: "Francesco Melzi", title: "Leonardo's pupil and keeper of his notebooks",
persona: "Francesco Melzi (about 1491-1570), a young nobleman from near Milan who became Leonardo's devoted pupil and companion from about 1506, went with him to Amboise, and inherited his notebooks. After Leonardo's death he spent years putting together the Treatise on Painting from them. Careful, polite, scholarly; he guards the notebooks, explains mirror writing, and wishes the pages would never be scattered.",
greet: "You may look at the notebooks, but gently: the master's thoughts are all over these pages, and not in order. He writes from right to left. Hold the page to a mirror and it reads plainly.",
look: { sex: "m", skin: 0xE8CCB0, hair: 0x5A3A20, hairStyle: "short", top: 0x2A3A5A, bottom: 0x2A2A3A, layer: "longcoat", layerColor: 0x1E2A44 } },
lisa: { name: "Lisa Gherardini", title: "sitting for her portrait",
persona: "Lisa Gherardini (1479-1542), wife of the silk merchant Francesco del Giocondo of Florence, whose portrait Leonardo began in about 1503 and kept working on for many years. Calm, warm, amused, patient with sitting still for hours; Leonardo had musicians play to keep her smiling, she says. She talks about Florence, her children, her husband's silk trade, and how strange it is to be painted so slowly.",
greet: "Good day. Forgive me if I don't turn round: the master says I must keep still, and smile, and he has been saying it for months.",
look: { sex: "f", skin: 0xF0D4B8, hair: 0x3A2618, hairStyle: "long", top: 0x3A3A28, topKind: "dress", bottom: 0x2A2A1E, layer: "vest", layerColor: 0x4A3A20 } },
ludovico: { name: "Ludovico Sforza", title: "Duke of Milan",
persona: "Ludovico Sforza, called il Moro (1452-1508), ruler and then Duke of Milan, Leonardo's patron from about 1482 to 1499. He commissioned the Great Horse in memory of his father Francesco and the Last Supper for Santa Maria delle Grazie. Proud, clever, a lover of splendour and festivals, ever worried about France. He tells you, sadly, that the bronze meant for the Horse went to make cannon in 1494.",
greet: "The Florentine's apprentice? Good. Tell your master the Horse will be the wonder of the world, if ever I can spare the bronze.",
look: { sex: "m", skin: 0xC8A080, hair: 0x1E1612, hairStyle: "short", top: 0x6A1A2A, bottom: 0x2A1A1A, layer: "longcoat", layerColor: 0x8A6A2A, hat: "cap", hatColor: 0x1E1A1A } },
cecilia: { name: "Cecilia Gallerani", title: "of the Sforza court, with her ermine",
persona: "Cecilia Gallerani (1473-1536), a learned young woman of the Milanese court who wrote poetry and held gatherings of scholars, painted by Leonardo holding a white ermine in about 1489-90. Bright, quick, bookish; she talks of poetry, Latin, music at the court, and her ermine, which she says is calmer than most courtiers.",
greet: "Mind my ermine: he bites only people who interrupt.",
look: { sex: "f", skin: 0xF2D8C0, hair: 0x4A2A18, hairStyle: "bun", top: 0x2A3A6A, topKind: "dress", bottom: 0x8A2A2A, layer: "vest", layerColor: 0xA8382A } },
pacioli: { name: "Luca Pacioli", title: "mathematician",
persona: "Fra Luca Pacioli (about 1447-1517), Franciscan friar and mathematician, author of the Summa of arithmetic and geometry (1494), and of On Divine Proportion, for which Leonardo drew the solids. Leonardo noted to 'learn the multiplication of roots from Master Luca'. Cheerful, loves puzzles, shapes and accounts; explains proportion, the golden ratio, and the solids with patience.",
greet: "Ah, a student! Come, count the faces of this solid with me. Mathematics is the only thing that never lies to a painter.",
look: { sex: "m", skin: 0xD8B894, hair: 0x5A5A5A, hairStyle: "bald", top: 0x5A4A3A, topKind: "robe", bottom: 0x4A3A2A } },
machiavelli: { name: "Niccolo Machiavelli", title: "envoy of Florence",
persona: "Niccolo Machiavelli (1469-1527), secretary of the Florentine Republic, sent as envoy to Cesare Borgia at Imola in 1502, the same months Leonardo served Borgia as military engineer. Later he helped plan Leonardo's scheme to turn the Arno. Sharp, dry, curious about power and how men really behave. He warns you that the country round Imola is dangerous.",
greet: "Another Florentine in Borgia's country? Keep your head down outside these walls. Here, at least, the Duke's peace holds.",
look: { sex: "m", skin: 0xE0C0A0, hair: 0x1A1410, hairStyle: "short", top: 0x1A1A1A, topKind: "robe", bottom: 0x1A1A1A, layer: "longcoat", layerColor: 0x3A1A1A } },
michelangelo: { name: "Michelangelo Buonarroti", title: "sculptor (and rival)",
persona: "Michelangelo Buonarroti (1475-1564), the young sculptor of the marble David (1504), who was given the opposite wall of the Hall of the Five Hundred to paint the Battle of Cascina while Leonardo painted Anghiari. Proud, intense, blunt, a little prickly, he admires Leonardo's skill more than he admits. Neither of them finished their battle walls.",
greet: "Leonardo's? Hm. Tell him the marble is finished. His wall, I hear, is running down the plaster.",
look: { sex: "m", skin: 0xD8B490, hair: 0x2A1A12, hairStyle: "curly", beard: "short", top: 0x4A4A4A, bottom: 0x3A3A3A, layer: "apron", layerColor: 0xC8C0B0 } },
francis: { name: "Francis I, King of France", title: "Leonardo's last patron",
persona: "Francis I (1494-1547), King of France, who invited Leonardo to Amboise in 1516 and gave him the manor of Clos Luce. He called Leonardo 'my father' and said no man knew as much as Leonardo. Young, tall, generous, fond of art and festivals; the mechanical lion that walked and opened its chest full of lilies was made for him.",
greet: "Welcome to Amboise. You knew him? Then you knew the greatest mind of the age. I tell everyone so.",
look: { sex: "m", skin: 0xE8CCB0, hair: 0x3A2A1A, hairStyle: "short", beard: "short", top: 0x2A3A8A, bottom: 0x1E1E3A, layer: "longcoat", layerColor: 0xC8A040, hat: "cap", hatColor: 0x1A1A2A } },
uncle: { name: "Francesco da Vinci", title: "Leonardo's uncle",
persona: "Francesco da Vinci, Leonardo's uncle, who lived all his life on the family's farms round Vinci and loved the countryside, the olives, the mill and the birds; he is said to have taken young Leonardo walking in the hills. Easy, slow-spoken, kind; he tells stories of Leonardo as a boy drawing everything he saw.",
greet: "You've come from the city? Sit, sit. The boy was always up these hills, drawing water and birds. You'll see why.",
look: { sex: "m", skin: 0xC89A70, hair: 0x6A6A6A, hairStyle: "short", beard: "full", top: 0x6A5A3A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x8A7A5A } },
friar: { name: "Brother Benedetto", title: "of the hospital of Santa Maria Nuova",
persona: "Brother Benedetto, a calm old friar of the hospital of Santa Maria Nuova in Florence, where Leonardo studied anatomy. He shows visitors the anatomy hall's models (never the dead: those rest in peace) and explains, gently and simply, what Leonardo learned about bones, muscles, the heart and the eye. He is careful with children and never gruesome.",
greet: "Peace be with you. Here we learn how wonderfully a body is made. Come, the models will show you.",
look: { sex: "m", skin: 0xDCC0A0, hair: 0xC8C4BC, hairStyle: "bald", top: 0x3A3028, topKind: "robe", bottom: 0x3A3028 } },
borgia: { name: "Cesare Borgia", title: "Duke of Valentinois, lord of the Romagna",
persona: "Cesare Borgia (1475-1507), son of Pope Alexander VI, who conquered the Romagna and in 1502 made Leonardo his military engineer, with a pass to inspect every fortress. Cold, charming, ruthless and very clever. He speaks of his fortresses and his enemies, and offers work to anyone who can build him a machine of war.",
greet: "Leonardo's people are always welcome in my camp. Outside these walls, my enemies are not so polite.",
look: { sex: "m", skin: 0xD8B48C, hair: 0x1A1210, hairStyle: "short", beard: "short", top: 0x1A1A1A, bottom: 0x1A1A1A, layer: "armor", layerColor: 0x3A3A40, back: "cloak", backColor: 0x6A1020 } }
};
var DAV_MACHINES = [
{ k: "bird", name: "the Great Bird", icon: "🪽", kind: "fly", sp: 3.6, seat: 0.4, src: "the Codex on the Flight of Birds (1505) and Manuscript B",
about: "Leonardo's flapping-wing flyer: a pilot lying in a frame of pine and cane works great wings of starched linen with hands and feet. He meant it to fly from Monte Ceceri, 'the hill of the swan'. Here it flies.",
how: "Space (or the rise button) climbs, C (or the fall button) dives, and you go where you look. Land anywhere." },
{ k: "glider", name: "the Glider", icon: "🪁", kind: "glide", sp: 2.6, seat: 0.2, src: "the Codex Atlanticus and Manuscript B",
about: "Fixed wings of linen on a frame shaped like a bat's, which Leonardo drew after watching birds soar without beating their wings. You hang below it and steer by shifting your weight.",
how: "It sinks gently all the time. Space lifts its nose for a little while; jump from a high place to fly far." },
{ k: "screw", name: "the Aerial Screw", icon: "🌀", kind: "hover", sp: 0.7, seat: 0.5, src: "Manuscript B (about 1489)",
about: "'If this instrument made with a screw be well made, that is to say made of linen of which the pores are stopped up with starch, and be turned swiftly, the said screw will make its spiral in the air and it will rise high.' Four men turning the bars below were meant to drive it.",
how: "Space climbs, C comes down, slowly over the ground. Look out over all of Florence." },
{ k: "tank", name: "the Armoured Car", icon: "🛡️", kind: "drive", sp: 1.25, seat: 1.6, wpn: { dmg: 40, r: 32, pvp: 25, cd: 6, ring: true, name: "Fire the ring of cannon" }, src: "the Codex Arundel and a letter to Ludovico Sforza (about 1485)",
about: "'I will make covered chariots, safe and unattackable, which will enter among the enemy with their artillery.' A wooden shell like a turtle's, plated, with a ring of light cannon all round, moved by cranks from inside.",
how: "Drive it like walking. E fires every cannon at once (once every 6 seconds): it hurts every foe round you in the Romagna." },
{ k: "cart", name: "the Self-propelled Cart", icon: "⚙️", kind: "drive", sp: 1.9, seat: 0.9, auto: true, src: "the Codex Atlanticus (about 1478)",
about: "A cart driven by coiled springs held in drums, with a brake you set beforehand so it steers itself along a planned path. People sometimes call it the first robot car.",
how: "Wind it and it rolls on by itself the way you face. Steer by looking; stop it by getting off." },
{ k: "boat", name: "the Paddle Boat", icon: "🚣", kind: "boat", sp: 1.6, seat: 0.6, src: "the Codex Atlanticus",
about: "A boat moved by paddle wheels turned by pedals, one of Leonardo's ideas for moving on the water without oars.",
how: "Launch it from a jetty on the Arno, the Loire or Milan's canals. It stays on the water." },
{ k: "diver", name: "the Diving Suit", icon: "🤿", kind: "dive", sp: 0.8, seat: 0, src: "the Codex Arundel (about 1500)",
about: "A leather suit with a mask of glass, and breathing tubes of cane joined with leather to a float of cork. Leonardo kept his best method secret, he wrote, 'on account of the evil nature of men, who would practise assassinations at the bottom of the seas'.",
how: "Walk into the river and keep going: you walk on the bottom. Look for what the river has kept." },
{ k: "chute", name: "the Parachute", icon: "🔺", kind: "chute", sp: 0.9, seat: 0, src: "the Codex Atlanticus (about 1485)",
about: "'If a man have a tent made of linen of which the apertures have all been stopped up, and it be twelve braccia across and twelve in depth, he will be able to throw himself down from any great height without suffering any injury.' A pyramid of linen on a wooden frame.",
how: "Take it from the dome's lantern, the top of Monte Ceceri or the Aerial Screw, and step off. You drift down softly." },
{ k: "xbow", name: "the Giant Crossbow", icon: "🏹", kind: "fixed", sp: 0, seat: 0, wpn: { dmg: 65, r: 70, pvp: 25, cd: 8, cone: 0.22, name: "Loose the great bolt" }, src: "the Codex Atlanticus (about 1488)",
about: "A crossbow twenty-four metres across, with a bow of thin flexible wood, on six wheels, wound back by a great screw and loosed by a mallet blow. Meant more to frighten than to fire.",
how: "Stand at the winch and press E to loose a bolt the way you face: it strikes every foe in its line, far off." },
{ k: "knight", name: "the Mechanical Knight", icon: "🤖", kind: "show", src: "drawings of about 1495",
about: "A knight in German-Italian armour moved by pulleys and cables inside: it could sit up, wave its arms, turn its head and open its visor. Shown at the Sforza court." },
{ k: "lion", name: "the Mechanical Lion", icon: "🦁", kind: "show", src: "made for King Francis I (1515)",
about: "A lion that walked forward a few steps, stopped, and opened its chest to show it full of lilies, the flower of France: Florence's gift to the new King." },
{ k: "bridge", name: "the Revolving Bridge", icon: "🌉", kind: "show", src: "the Codex Atlanticus",
about: "A bridge that swings round on a pivot, balanced by a box of stones, so an army can cross a river and swing it away behind them." },
{ k: "odo", name: "the Odometer", icon: "📏", kind: "show", src: "the Codex Atlanticus",
about: "A cart whose wheel turns a gear, which drops a pebble into a box at every turn of the count: measure a road by counting the pebbles. Leonardo used it in making his maps." }
];
var DAV_MACH = {};
DAV_MACHINES.forEach(function (M) { DAV_MACH[M.k] = M; });
var DAV_NOTES = [
["flight", "the Codex on the Flight of Birds", "The great bird will take its first flight from the back of the great swan, filling the universe with wonder, and all writings with its fame, and bringing glory to the nest where it was born. (The 'swan' is Monte Ceceri, the hill of the swan, above Florence.)"],
["flight", "the Codex Atlanticus", "A bird is an instrument working by mathematical law, and it is in the power of man to make such an instrument with all its movements."],
["flight", "the Codex on the Flight of Birds", "A bird beats its wings downward and backward against the air, which presses against the wing as against a hard thing, and so the bird climbs."],
["flight", "the Codex on the Flight of Birds", "Birds that soar without beating their wings ride the wind as it rises against the hills; they turn in circles to climb in it."],
["flight", "Manuscript B", "If this screw be well made of linen with its holes stopped with starch, and be turned swiftly, it will make its spiral in the air and rise high."],
["flight", "the Codex Atlanticus", "If a man has a tent of linen with all its openings stopped, twelve braccia across and twelve deep, he will be able to throw himself down from any height without injury."],
["water", "the Codex Leicester", "Shells of sea creatures are found high in the mountains. They were not carried there by a Flood: they lived there, when that ground was the bottom of the sea."],
["water", "the Codex Leicester", "The faint light on the dark part of the young Moon is sunlight thrown back to it from our Earth, from its seas."],
["water", "the Codex Trivulzianus", "In rivers, the water you touch is the last of what has passed and the first of what is coming: so it is with the present moment."],
["water", "the Codex Leicester", "Water that strikes an obstacle turns into whirlpools, and each whirlpool turns as hair turns in a curl."],
["water", "the Codex Atlanticus", "The Arno could be made to run through a canal from Florence to the sea, for boats in every season. (He planned it, with Machiavelli, in 1503-04.)"],
["water", "the Codex Leicester", "The blue we see in the sky is not its own colour: it comes from the moisture in the air lit by the Sun, seen against the darkness beyond."],
["light", "Manuscript D", "The pupil of the eye grows larger in the dark and smaller in bright light. Look in a mirror in a dim room and see it change."],
["light", "the Codex Atlanticus", "If the front of a house facing a sunlit square has a small round hole in its wall, the things lit by the Sun send their images through the hole, and they appear upside down on a white sheet in the dark room within."],
["light", "the Treatise on Painting", "There are three kinds of perspective: the first of how things grow smaller the further away they are; the second of how their colours fade; the third of how their outlines grow less clear."],
["light", "the Treatise on Painting", "The further away a mountain is, the bluer and paler it looks, because of the air between it and your eye."],
["light", "Manuscript C", "A shadow is darkest nearest the thing that casts it, and grows softer at its edges the further it falls."],
["anatomy", "the Windsor anatomical drawings", "The heart has four chambers. Two are above, which open and shut with the two below, as the heart beats."],
["anatomy", "the Windsor anatomical drawings", "Make a glass model of the heart's great vessel and pour water with grass seeds in it: you will see how the blood turns in eddies that close the valve."],
["anatomy", "the Windsor anatomical drawings", "I took apart the body of an old man who said he was a hundred years old and felt nothing wrong but weakness. His vessels had grown thick and narrow, as old pipes do."],
["anatomy", "the Windsor anatomical drawings", "Describe the tongue of the woodpecker. (One of his reminders to himself.)"],
["anatomy", "the Windsor anatomical drawings", "A grown person's mouth holds thirty-two teeth: of these, eight are cutters, four are tearers, and the rest grinders."],
["anatomy", "the notes on proportion", "The length of a man's outspread arms is equal to his height. Stand him in a square and he fits it; spread his arms and legs and his navel is the centre of a circle."],
["plants", "Manuscript G", "The rings in a sawn branch tell how many years it has lived, and which years were wet and which were dry, by how wide each ring is."],
["plants", "Manuscript G", "The leaves on a stem grow in a spiral, each turned from the one below, so that each leaf is in the light and none shades the other."],
["plants", "Manuscript G", "All the branches of a tree, at every height, put together are as thick as its trunk."],
["machines", "the Madrid Codex", "Rubbing between two things depends on their weight, not on how much of them touches. A weight dragged along a smooth plane is held back by about a quarter of its weight."],
["machines", "the Madrid Codex", "Put balls between the moving part and the fixed part and they will turn with no rubbing at all. (A ball bearing, three hundred years before anyone made one in iron.)"],
["machines", "the Codex Atlanticus", "The lever, the wheel, the screw, the wedge and the pulley: of these every machine is made. Know them, and you can understand any machine at all."],
["machines", "the Codex Atlanticus", "I will make covered chariots, safe and unattackable, which will enter among the enemy with their artillery. (From his letter to Ludovico Sforza.)"],
["machines", "the Codex Atlanticus", "Canal gates that meet at an angle, pointing up the stream, are pressed shut by the water itself. A small door in each lets the water in and out slowly. (His lock gates for Milan's canals.)"],
["machines", "the Codex Leicester", "I will not publish my way of staying under water, on account of the evil nature of men, who would use it to sink ships with all their crews."],
["painting", "the Treatise on Painting", "Painting is poetry that is seen and not heard, and poetry is painting that is heard and not seen."],
["painting", "the Treatise on Painting", "Look at walls stained with damp, or stones of uneven colour: you will find in them landscapes, battles, strange faces and clothes, and a thousand things to draw."],
["painting", "the Treatise on Painting", "The painter who draws by practice and eye alone, without reason, is like a mirror that copies everything in front of it without knowing anything of it."],
["painting", "the Treatise on Painting", "Let your shadows and lights blend without lines or borders, in the manner of smoke. (This is sfumato, from the word for smoke.)"],
["painting", "the Treatise on Painting", "Faces should be painted in the evening, or in bad weather, when the light is soft: see how much grace and sweetness it gives them."],
["painting", "the Treatise on Painting", "A good painter has two chief things to paint: a person, and the intention of their mind. The first is easy, the second hard, for it must be shown by gestures and the movement of the limbs."],
["life", "the Windsor drawings", "Obstinate rigour. (His motto, written beside a drawing of a plough: keep going, straight, however hard the ground.)"],
["life", "his own notes", "Learn the multiplication of roots from Master Luca. (Luca Pacioli, the mathematician, his friend in Milan.)"],
["life", "his own notes", "Iron rusts from disuse; still water loses its purity and freezes in the cold; so the mind wastes away without exercise."],
["life", "his own notes", "Just as a well-spent day brings happy sleep, so a life well spent brings a happy death."],
["light", "the Treatise on Painting", "The eye, which is called the window of the soul, is the chief way by which the mind may most fully understand the works of nature."],
["life", "his own notes", "Tell me if anything was ever done. (He wrote it again and again, worried he left too much unfinished.)"],
["life", "Giorgio Vasari's Lives of the Artists (1550)", "When he passed the places where birds were sold, he would pay the price asked, take them out of their cages and let them fly away, giving them back their freedom."],
["life", "the record of his birth", "Born on 15 April 1452, at the third hour of the night, at Anchiano near Vinci: Leonardo, son of Ser Piero. (Written by his grandfather Antonio.)"],
["rocks", "the Codex Leicester", "Look at the layers of rock in a mountain's side: each was once mud laid down by water, one on top of another, over very long ages."],
["rocks", "the Codex Leicester", "Where rivers have cut down through the hills, you can count the layers, as you count the rings of a tree."]
];
var DAV_TOPICS = { flight: "Flight", water: "Water and the Earth", light: "Light and the eye", anatomy: "The body", plants: "Plants", machines: "Machines", painting: "Painting", life: "His life", rocks: "Rocks and shells" };
var DAV_PAGES_OUT = [
[0, "ceceri", 694, -1162, "a page pinned under a stone by the launching ramp"],
[3, "ceceri", 722, -1128, "a page caught in a gorse bush"],
[6, "anchiano", -2840, -714, "a page in the farmhouse's window seat"],
[8, "bridge", -34, 216, "a page tucked in a goldsmith's shutter on the bridge"],
[10, "proving", 1520, 140, "a page on the canal-builder's table by the river"],
[13, "vecchio", 58, 108, "a page on the step of the Loggia"],
[24, "vinci", -2660, -250, "a page under the olive press in Vinci"],
[30, "milan", 420, -3660, "a page by the lock gates on the canal"],
[36, "milan", -430, -3880, "a page on the refectory's bench in Milan"],
[41, "amboise", -3730, -2480, "a page in the garden of Clos Luce"],
[46, "imola", 3380, -660, "a page on the surveyor's stone in Imola's square"],
[47, "proving", 1340, 180, "a page in the river-cut by the Proving Ground"]
];
var DAV_RIDDLES = [
["bottega", "I am drawn in a circle and a square at once; my navel marks the middle. What am I?", "The measure of a man", ["A compass rose", "A clock face", "A city plan"]],
["bottega", "Twelve braccia across and twelve deep, I make a fall into a float. What am I?", "A parachute", ["A sail", "A tent for sleeping", "A bell"]],
["bottega", "The further off I am, the bluer and paler I grow. What am I?", "A mountain", ["A shadow", "A river", "A candle"]],
["duomo", "No scaffold held me up while I was built: brick in herringbone, ring on ring. What am I?", "The dome", ["The bell tower", "The baptistery", "The bridge"]],
["duomo", "I sat on top of the lantern; the master's workshop made me of copper, and the apprentice helped. What am I?", "The golden ball", ["The bell", "The weathervane", "The cross of iron"]],
["vecchio", "Two masters, two walls, two battles: and neither was finished. Which battle was Leonardo's?", "Anghiari", ["Cascina", "San Romano", "Marignano"]],
["milan", "Meant to be the greatest horse in the world, I was made of clay, and my bronze became cannon. What am I?", "The Great Horse", ["The Colleoni horseman", "A siege engine", "A weathervane"]],
["milan", "Two gates meet in a point against the stream, and the water itself shuts them. What are we?", "Lock gates", ["A drawbridge", "A mill wheel", "A harbour chain"]],
["amboise", "I walked a few steps, stopped, and opened my chest full of lilies for a king. What am I?", "The mechanical lion", ["The mechanical knight", "A tapestry", "A clock"]],
["amboise", "He was born in the spring of 1452 and died in the spring of 1519. In which town did he die?", "Amboise", ["Florence", "Milan", "Rome"]]
];
var DAV_CLUE = "Under the house where the King came to me by the earth, in the cellar, the stone that is marked with the knot that has no end: press it, and walk the way the King walked. What I hid at the end of it, keep well.";
var DAV_EXAM = [
["In which direction did Leonardo write his notebooks?", "From right to left, in mirror writing", ["From top to bottom", "In a secret alphabet", "Only in Latin"]],
["Where was Leonardo born?", "Anchiano, near Vinci", ["Florence", "Milan", "Rome"]],
["Whose workshop did he learn in?", "Andrea del Verrocchio's", ["Michelangelo's", "Botticelli's", "Raphael's"]],
["Why does a far-off mountain look bluer and paler?", "Because of the air between it and your eye", ["Because it is made of blue stone", "Because it is in shadow", "Because of the Moon"]],
["What is sfumato?", "Blending light and shade softly, like smoke", ["Painting on wet plaster", "Gold leaf on wood", "Drawing with silver"]],
["How many chambers did Leonardo find in the heart?", "Four", ["Two", "Three", "Six"]],
["What do a tree's rings tell you?", "Its age, and which years were wet or dry", ["How tall it will grow", "Which way is north", "How old the hill is"]],
["Why are sea shells found high in the mountains?", "That ground was once the bottom of the sea", ["A great flood carried them up", "Birds dropped them", "People buried them"]],
["What did the Aerial Screw use to climb?", "A spiral of starched linen, turned fast", ["Hot air", "Flapping wings", "A kite string"]],
["Where did the Great Bird's first flight have to start?", "Monte Ceceri, the hill of the swan", ["The cathedral's dome", "The Ponte Vecchio", "The Sforza castle"]],
["What did the faint light on the dark part of the young Moon come from, he said?", "Sunlight thrown back from the Earth", ["The Moon's own fire", "Starlight", "Mist in the air"]],
["What happened to the bronze meant for the Great Horse?", "It was made into cannon", ["It was stolen", "It sank in the Arno", "It became the cathedral's bells"]],
["Which painting is on the refectory wall in Milan?", "The Last Supper", ["The Battle of Anghiari", "The Annunciation", "The Adoration of the Magi"]],
["What did Leonardo find about rubbing (friction)?", "It depends on weight, not on how much surface touches", ["It depends only on the colour", "It is the same for every thing", "It grows with the surface"]],
["Who invited Leonardo to France at the end of his life?", "King Francis I", ["Ludovico Sforza", "Cesare Borgia", "The Pope"]],
["What shows on a white sheet in a dark room with a small hole in its wall?", "The scene outside, upside down", ["Nothing at all", "A rainbow", "The scene outside, the right way up"]],
["Spread your arms wide: their span is about equal to your...", "Height", ["Shoulder width", "Leg length", "Foot length times three"]],
["What did Leonardo do with caged birds in the market, Vasari says?", "Bought them and set them free", ["Drew them and kept them", "Taught them to talk", "Sold them in Milan"]],
["Why did Leonardo's Battle of Anghiari not last?", "His new way of painting with heat failed and the colours ran", ["Michelangelo painted over it", "An earthquake", "He never began it"]],
["What do lock gates that meet in a point against the stream do?", "The water's own push holds them shut", ["They let boats fly", "They stop fish", "They make the water warm"]]
];
var DAV_LESSONS = [
["vitruvian", "Proportion: the measure of a man", "bottega", "Stand in the bronze circle and square: see where your own hands and feet reach."],
["perspective", "Perspective: three kinds", "bottega", "Look through Leonardo's glass at the street, and see its lines run to one point."],
["sfumato", "Light, shade and sfumato", "bottega", "Turn the lamp round the plaster head and watch the shadows soften."],
["obscura", "The camera obscura", "bottega", "Step into the dark room: the street outside, upside down, on the white wall."],
["heart", "The heart and its valves", "hospital", "The great glass heart: watch water turn in eddies and close the valves."],
["eye", "The eye", "hospital", "The great eye: see how the picture falls upside down at its back."],
["skeleton", "Bones and muscles", "hospital", "The bronze figure: press its parts to see how muscles pull on bones like ropes."],
["flight", "How birds fly", "ceceri", "Watch the kites on the wind over the hill, and read his notes on soaring."],
["water", "Water and whirlpools", "proving", "The vortex pool: drop seeds and see the water curl like hair."],
["rocks", "Rocks and shells", "anchiano", "The cut in the hill: count the layers, find the shells of an old sea."],
["plants", "Plants and rings", "vinci", "The sawn olive trunk and the spiral of leaves."],
["gears", "Gears, screws and friction", "proving", "The friction ramp and the ball bearing: try them."],
["locks", "The lock gates", "milan", "Work Milan's lock: raise a barge from the low canal to the high."]
];
var DAV_BEASTS = {
dav_merc: { name: "Borgia's mercenary", body: "person", arm: "sword", hp: 62, spd: 4.4, dmg: 10, reach: 1.9,
look: { top: 0x6A1A1A, bottom: 0xD8C8A0, hat: "helmet", hatColor: 0x6A6A70, layer: "armor", layerColor: 0x5A5A62 }, spoil: ["A mercenary's company badge", "🎖️"], growl: 230 },
dav_xbow: { name: "Mercenary crossbowman", body: "person", arm: "crossbow", hp: 48, spd: 3.8, dmg: 9, reach: 2, shot: { r: 18, c: 0xE8C890 },
look: { top: 0x2A3A1A, bottom: 0x4A3A2A, hat: "helmet", hatColor: 0x5A5A5A, layer: "vest", layerColor: 0x6A4A2A }, spoil: ["A bundle of crossbow bolts", "🏹"], growl: 250 },
dav_wolf: { name: "Apennine wolf", body: "kit", arch: "hellhound", scale: 0.9, hp: 55, spd: 5.6, dmg: 9, reach: 2.1, spoil: ["A grey wolf's tooth", "🐺"], growl: 150 },
dav_boar: { name: "Wild boar of the Romagna", body: "kit", arch: "boar", scale: 1.2, hp: 80, spd: 4.8, dmg: 12, reach: 2.2, spoil: ["A boar's tusk", "🐗"], growl: 120 },
dav_auto: { name: "Runaway war automaton", body: "kit", robot: 1, arch: "ogre", arm: "mace", hp: 130, spd: 2.8, dmg: 14, reach: 2.4, big: 1, spoil: ["An automaton's brass cam", "⚙️"], growl: 200 },
dav_captain: { name: "Condottiero captain", body: "person", arm: "battleaxe", scale: 1.08, hp: 150, spd: 3.8, dmg: 15, reach: 2.4, big: 1,
look: { top: 0x1A1A2A, bottom: 0x2A2A2A, hat: "helmet", hatColor: 0x8A8A90, layer: "armor", layerColor: 0x8A8A92, back: "cloak", backColor: 0x5A1018 }, spoil: ["A captain's gilded spur", "✨"], growl: 100 }
};
var DAV_BEASTS_AT = ["dav_merc", "dav_merc", "dav_xbow", "dav_wolf", "dav_boar", "dav_auto", "dav_captain"];
function davZoneLevel(base) { return DAV.zone === "romagna" ? base : 0; }
var DAV_COSTUMES = [
{ k: "leonardo", name: "Leonardo's rose gown", price: 900, look: { top: 0xC87A80, topKind: "robe", bottom: 0x6A3A3A, layer: "longcoat", layerColor: 0x8A4A50, hat: "beanie", hatColor: 0x3A2A2A, hair: 0xD8D4CC, hairStyle: "long", shoes: 0x3A2A1E } },
{ k: "lisa", name: "Lisa Gherardini's gown", price: 850, look: { top: 0x3A3A28, topKind: "dress", bottom: 0x2A2A1E, layer: "vest", layerColor: 0x4A3A20, hair: 0x3A2618, hairStyle: "long" } },
{ k: "cecilia", name: "Cecilia Gallerani's court dress", price: 850, look: { top: 0x2A3A6A, topKind: "dress", bottom: 0x8A2A2A, layer: "vest", layerColor: 0xA8382A, hair: 0x4A2A18, hairStyle: "bun" } },
{ k: "apprentice", name: "Florentine apprentice", price: 300, look: { top: 0xD8C8A8, bottom: 0x5A4A3A, layer: "apron", layerColor: 0x8A7A5A, hat: "cap", hatColor: 0x8A2A2A, shoes: 0x4A3A2A } },
{ k: "ludovico", name: "Ludovico Sforza's ducal robe", price: 1100, look: { top: 0x6A1A2A, bottom: 0x2A1A1A, layer: "longcoat", layerColor: 0x8A6A2A, hat: "cap", hatColor: 0x1E1A1A } },
{ k: "condottiero", name: "Condottiero's half-armour", price: 950, look: { top: 0x1A1A2A, bottom: 0x2A2A2A, layer: "armor", layerColor: 0x8A8A92, hat: "helmet", hatColor: 0x8A8A90, back: "cloak", backColor: 0x5A1018 } },
{ k: "isabella", name: "Isabella d'Este's gown", price: 900, look: { top: 0x1A1A1A, topKind: "dress", bottom: 0x6A4A1A, layer: "vest", layerColor: 0xC8A040, hair: 0x8A5A2A, hairStyle: "waves" } }
];
var DAV_QUESTS = {
bird: { name: "The Great Bird's flight", what: "Fly the Great Bird from Monte Ceceri and land in the cathedral square", gold: 250, keep: ["🪽", "A feather from the Great Bird's wing"] },
horse: { name: "The Great Horse, cast", what: "Cast the Great Horse in bronze, in Milan", gold: 300, keep: ["🐎", "A bronze shaving from the Great Horse"] },
exam: { name: "The Master's examination", what: "Pass the Master's examination in the Bottega", gold: 400, keep: ["🎓", "A Maestro's ring"] },
codex: { name: "Your own codex", what: "Gather every notebook page lying out in the world", gold: 200, keep: ["📜", "A bound codex of your own"] },
anghiari: { name: "The Battle of Anghiari", what: "Finish the battle wall in the Hall of the Five Hundred", gold: 250, keep: ["🎨", "A chip of the Anghiari plaster"] }
};
function davTex(name, mpt) { return __ZC(356, 0, this, arguments, new.target); }
function davSurf(name, tint, mpt, o) { return __ZC(356, 1, this, arguments, new.target); }
function davC(col, o) { return __ZC(356, 2, this, arguments, new.target); }
function davGlowM(col) { var k = "g" + col; return DAV.mats[k] || (DAV.mats[k] = wB(col)); }
function davUVm(g) { return __ZC(356, 3, this, arguments, new.target); }
function davBoxM(w, h, d, mat, x, y, z, parent) { var g = davUVm(new THREE.BoxGeometry(w, h, d)); var m = new THREE.Mesh(g, mat); m.position.set(x, y, z); (parent || DAV.G).add(m); return m; }
function davS(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
function davGa(d) { return Math.exp(-d * d); }
function davLoireD(x, z) {
var L = DAV_LOIRE, d = 1e9;
if (x >= L.x0 && x <= L.x1)
d = Math.abs(z - L.z);
else if (x < L.x0)
d = Math.hypot(x - L.x0, z - L.z);
else
d = Math.hypot(x - L.x1, z - L.z);
var dl = Math.hypot(x - L.lake.x, z - L.lake.z) - L.lake.r;
return Math.min(d, Math.max(0, dl) + (dl < 0 ? 0 : 0));
}
function davInLake(x, z) { var L = DAV_LOIRE.lake; return Math.hypot(x - L.x, z - L.z) < L.r; }
function davHills(x, z) { return __ZC(356, 4, this, arguments, new.target); }
function davHRaw(x, z) { return __ZC(356, 5, this, arguments, new.target); }
function davWaterAt(x, z) {
if (Math.abs(z - davArnoZ(x)) < 46)
return DAV_WATER_Y;
if (x < -2700 && (davLoireD(x, z) < 48 || davInLake(x, z)))
return DAV_LOIRE.y;
var N = DAV_NAVIGLI;
if (Math.abs(Math.hypot(x - N.x, z - N.z) - N.r) < N.w + 1)
return N.y;
return null;
}
function davTownHeights() { return __ZC(356, 6, this, arguments, new.target); }
function davGridMake() {
davTownHeights();
var B = DAV_BOUND, S = DAV.lite ? 40 : 20, nx = Math.round((B.x1 - B.x0) / S) + 1, nz = Math.round((B.z1 - B.z0) / S) + 1, H = new Float32Array(nx * nz);
for (var j = 0; j < nz; j++)
for (var i = 0; i < nx; i++)
H[j * nx + i] = davHRaw(B.x0 + i * S, B.z0 + j * S);
DAV.grid = { S: S, nx: nx, nz: nz, H: H };
}
function davLand(x, z) { return __ZC(356, 7, this, arguments, new.target); }
function davLandCol(x, z, h, slope, c) { return __ZC(356, 8, this, arguments, new.target); }
function davTerrain(G) { return __ZC(356, 9, this, arguments, new.target); }
var DAV_RIP = null;
function davWaterMat(col) { return __ZC(356, 10, this, arguments, new.target); }
function davRibbon(pts, w, yf, mat, parent, name) { return __ZC(356, 11, this, arguments, new.target); }
function davWaterBuild(G) { return __ZC(356, 12, this, arguments, new.target); }
function davWaterTick(dt) { for (var i = 0; i < DAV.water.length; i++) {
var t = DAV.water[i];
t.offset.x += dt * 0.004;
t.offset.y += dt * 0.0015;
} }
var DAV_ROADS = [
{ n: "the road to Vinci", p: [[-620, 64], [-900, 40], [-1300, -20], [-1700, -60], [-2100, -80], [-2450, -150], [-2600, -200]] },
{ n: "the lane to Anchiano", p: [[-2760, -300], [-2800, -450], [-2830, -600], [-2856, -660]] },
{ n: "the road to France", p: [[-2760, -330], [-2900, -800], [-3000, -1300], [-3120, -1900], [-3260, -2420], [-3450, -2480], [-3640, -2470]] },
{ n: "the road up Monte Ceceri", p: [[30, -640], [200, -760], [420, -840], [560, -900], [600, -980], [660, -1040], [650, -1090], [700, -1112]] },
{ n: "the road to Milan", p: [[10, -640], [60, -1000], [110, -1500], [150, -2000], [150, -2300], [150, -2700], [160, -3050], [160, -3290]] },
{ n: "the road east", p: [[640, 40], [900, 30], [1180, 10], [1450, -80], [1800, -120], [2200, -200], [2600, -380], [2900, -560], [3170, -690]] }
];
function davRoadPts(R, step) { var out = []; for (var i = 0; i < R.p.length - 1; i++) {
var a = R.p[i], b = R.p[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(l / step));
for (var k = 0; k < n; k++) {
var t = k / n;
out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
}
} out.push(R.p[R.p.length - 1]); return out; }
function davRoads(G) {
var mat = davSurf("earth", 0xE8D8B8, 5);
DAV_ROADS.forEach(function (R) { var m = davRibbon(davRoadPts(R, 8), 7, function (x, z) { return davLand(x, z) + 0.18; }, mat, G, "dav-road"); m.userData.keep = 1; });
}
function davRoadNear(x, z, r) { return __ZC(356, 13, this, arguments, new.target); }
var DAV_TREE = {};
function davLeafMat(col) { return __ZC(356, 14, this, arguments, new.target); }
function davCrownGeo(seed, sx, sy, sz, det) { return __ZC(356, 15, this, arguments, new.target); }
function davTreeKinds() { return __ZC(356, 16, this, arguments, new.target); }
function davTreeAt(x, z, R) { return __ZC(356, 17, this, arguments, new.target); }
function davTrees(G) { return __ZC(356, 18, this, arguments, new.target); }
function davTreesVis(L) {
var far = DAV.lite ? 700 : 1700;
(DAV.treeTiles || []).forEach(function (T) { var on = !DAV.insideOf && Math.hypot(L.x - T.x, L.z - T.z) < far + 700; if (T.g.visible !== on)
T.g.visible = on; });
}
var DAV_ENV = {
out: { top: 0x4C80C8, low: 0xE8D4B4, fog: 0xD8D0C0, fogD: 0.00034, sun: 1.08, sunCol: 0xFFE6C0, sunDir: [-0.45, 0.62, 0.4], hemi: 0.62, hemiCol: 0xD4E0F0, hemiGround: 0x6A5A40 },
hills: { top: 0x4A7CC4, low: 0xDCD8D0, fog: 0xD0D4D8, fogD: 0.0003, sun: 1.05, sunCol: 0xFFE8C8, sunDir: [-0.45, 0.62, 0.4], hemi: 0.64, hemiCol: 0xD8E4F4, hemiGround: 0x5A5A48 },
romagna: { top: 0x5A7AA8, low: 0xD8C4A4, fog: 0xC8B8A0, fogD: 0.0006, sun: 0.98, sunCol: 0xFFD8A8, sunDir: [-0.5, 0.5, 0.4], hemi: 0.6, hemiCol: 0xD0D8E4, hemiGround: 0x5A4A38 },
france: { top: 0x5A88C8, low: 0xE0DCD4, fog: 0xD4D8DC, fogD: 0.0004, sun: 1.0, sunCol: 0xFFECD0, sunDir: [-0.4, 0.6, 0.45], hemi: 0.66, hemiCol: 0xD8E4F4, hemiGround: 0x5A5A44 },
inside: { top: 0x2A2420, low: 0x3A3028, fog: 0x3A3028, fogD: 0.004, sun: 0.5, sunCol: 0xFFE4C0, sunDir: [0.3, 0.9, 0.2], hemi: 0.75, hemiCol: 0xF0E4D0, hemiGround: 0x4A3A2A },
river: { top: 0x2A4A4A, low: 0x2A4A48, fog: 0x2E5250, fogD: 0.06, sun: 0.4, sunCol: 0xB8E0D8, sunDir: [0.2, 0.9, 0.1], hemi: 0.6, hemiCol: 0x9AC8C0, hemiGround: 0x2A3A30 }
};
function davEnvNow() { return __ZC(356, 19, this, arguments, new.target); }
var DAV_FAC = {};
function davNoiseFill(x, W, H, base, amt, n) { return __ZC(356, 20, this, arguments, new.target); }
function davHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function davShade(c, f) { var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255; r = Math.max(0, Math.min(255, r * f | 0)); g = Math.max(0, Math.min(255, g * f | 0)); b = Math.max(0, Math.min(255, b * f | 0)); return "rgb(" + r + "," + g + "," + b + ")"; }
function davWin(x, H, px, py, w, h, o) { return __ZC(356, 21, this, arguments, new.target); }
function davFacTex(style, col, band) { return __ZC(356, 22, this, arguments, new.target); }
function davFacMat(style, col, band) {
var k = "f:" + style + ":" + col + ":" + band;
if (DAV.mats[k])
return DAV.mats[k];
return (DAV.mats[k] = new THREE.MeshLambertMaterial({ map: davFacTex(style, col, band) }));
}
function davWallGeo(w, h, bay, storey) {
var g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * Math.max(1, Math.round(w / bay)), uv.getY(i) * (h / storey));
return g;
}
function davWalls(grp, w, d, y0, y1, mat, band) {
var h = y1 - y0, st = band ? h : 4, bay = 4;
[[0, d / 2, 0, w], [0, -d / 2, Math.PI, w], [w / 2, 0, Math.PI / 2, d], [-w / 2, 0, -Math.PI / 2, d]].forEach(function (f) {
var m = new THREE.Mesh(davWallGeo(f[3], h, bay, st), mat);
m.position.set(f[0], y0 + h / 2, f[1]);
m.rotation.y = f[2];
grp.add(m);
});
}
function davRoofGeo(w, d, rise, o, flat) { return __ZC(356, 23, this, arguments, new.target); }
function davRoofMat(t) { return davSurf("tile", t || 0xE0A088, DAV.lite ? 3 : 2.2); }
var DAV_COLS = [0xE2C48E, 0xD8A878, 0xE8D8B4, 0xDCB4A0, 0xD4C098, 0xE4CCA4, 0xC8A47C, 0xE0BC8C];
function davBuilding(parent, x, z, w, d, o) { return __ZC(356, 24, this, arguments, new.target); }
function davShade2(c, f) { var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255; return ((Math.min(255, r * f | 0)) << 16) | ((Math.min(255, g * f | 0)) << 8) | (Math.min(255, b * f | 0)); }
var DAV_SG = 40;
function davSolid(s) { return __ZC(356, 25, this, arguments, new.target); }
function davSolidAt(x, z, feet) { var g = DAV.sgrid; if (!g)
return false; var L = g[Math.floor(x / DAV_SG) + "," + Math.floor(z / DAV_SG)]; return !!(L && worldSolidAt(L, x, z, feet)); }
function davFloor(x, z, hw, hd, y, o) { var f = { x: x, z: z, hw: hw, hd: hd, y: y }; if (o)
for (var k in o)
f[k] = o[k]; DAV.floors.push(f); return f; }
function davFloorsAt(list, x, z, feet) { return __ZC(356, 26, this, arguments, new.target); }
function davArch(parent, x, y, z, ry, w, h, dep, mat) { return __ZC(356, 27, this, arguments, new.target); }
function davColumn(parent, x, y, z, h, r, mat) {
var seg = DAV.lite ? 8 : 14;
wCyl(r * 1.35, r * 1.45, 0.35, mat, x, y + 0.18, z, parent, seg);
wCyl(r * 0.9, r, h - 0.8, mat, x, y + 0.35 + (h - 0.8) / 2, z, parent, seg);
wCyl(r * 1.4, r * 0.95, 0.45, mat, x, y + h - 0.22, z, parent, seg);
wBox(r * 3, 0.14, r * 3, mat, x, y + h + 0.05, z, parent);
}
function davBattle(parent, x0, z0, x1, z1, y, mat, big) { return __ZC(356, 28, this, arguments, new.target); }
function davLathe(pts, seg, mat, parent, x, y, z) { var g = new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg); var m = new THREE.Mesh(g, mat); m.position.set(x || 0, y || 0, z || 0); (parent || DAV.G).add(m); return m; }
function davSign(lines, w, h, x, y, z, ry, parent) { var s = wSign(lines, w, h, "#3A2A1C", "#E8D4A0"); s.position.set(x, y, z); s.rotation.y = ry || 0; (parent || DAV.G).add(s); return s; }
function davPave(parent, x, z, w, d, y, tint, mpt) { var m = new THREE.Mesh(davUVm(new THREE.BoxGeometry(w, 0.1, d)), davSurf("paving", tint || 0xD8CCB8, mpt || 3.5)); m.position.set(x, (y || 0) + 0.04, z); parent.add(m); return m; }
function davLamp(parent, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
parent.add(g);
wCyl(0.07, 0.09, 3.2, davC(0x2A2622), 0, 1.6, 0, g, 6);
wBox(0.36, 0.46, 0.36, davC(0x3A3228), 0, 3.4, 0, g);
wBox(0.24, 0.3, 0.24, davGlowM(0xFFD8A0), 0, 3.4, 0, g);
davSolid({ x: x, z: z, r: 0.18 });
return g;
}
var DAV_FL_KEEP = [
[-8, 20, 124, 176], [-10, -12, 62, 24],
[-172, -222, 118, -84],
[-118, -70, -2, 6],
[158, -100, 262, -18],
[100, -292, 206, -210],
[196, -6, 350, 92],
[-360, -250, -226, -140],
[-112, -352, -12, -262],
[-40, -66, 24, -24]
];
function davFlKept(x0, z0, x1, z1) { for (var i = 0; i < DAV_FL_KEEP.length; i++) {
var K = DAV_FL_KEEP[i];
if (x1 > K[0] && x0 < K[2] && z1 > K[1] && z0 < K[3])
return true;
} return false; }
var DAV_FL_R = 640;
function davFlWallR(a) { return DAV_FL_R + 26 * Math.sin(3 * a + 0.6); }
var DAV_MARB = {};
function davMarbleTex(kind) { return __ZC(356, 29, this, arguments, new.target); }
function davMarbleMat(kind, mpt) { return __ZC(356, 30, this, arguments, new.target); }
function davUVany(g) { if (g.index)
g = g.toNonIndexed(); g.computeVertexNormals(); return davUVm(g); }
var DAV_DUOMO = { x: 30, z: -150 };
function davDuomo(G) { return __ZC(356, 31, this, arguments, new.target); }
var DAV_PV = { x: 84, z: 52, w: 46, d: 40, h: 30 };
function davVecchio(G) { return __ZC(356, 32, this, arguments, new.target); }
var DAV_CLOCK = null;
function davClockTex() { return __ZC(356, 33, this, arguments, new.target); }
function davVRibbon(pts, y0, y1, mat, parent) { return __ZC(356, 34, this, arguments, new.target); }
var DAV_BRIDGES = [{ x: -20, n: "the Ponte Vecchio", old: 1 }, { x: 220, n: "the Ponte alle Grazie" }, { x: -230, n: "the Ponte Santa Trinita" }, { x: -450, n: "the Ponte alla Carraia" }];
function davArnoCity(G) { return __ZC(356, 35, this, arguments, new.target); }
function davParapet(run, grp, mat, s) { return __ZC(356, 36, this, arguments, new.target); }
function davBridge(grp, B) { return __ZC(356, 37, this, arguments, new.target); }
var DAV_GATES = [{ a: -Math.PI / 2, n: "Porta San Gallo", to: "the road north: Monte Ceceri and Milan" }, { a: Math.PI, n: "Porta al Prato", to: "the road west: Vinci" }, { a: 0.04, n: "Porta alla Croce", to: "the road east: the Proving Ground and the Romagna" }, { a: Math.PI / 2 + 0.1, n: "Porta Romana", to: "the road south" }];
function davCityWalls(G) { return __ZC(356, 38, this, arguments, new.target); }
function davFlBlocks(G) { return __ZC(356, 39, this, arguments, new.target); }
function davFlBlock(grp, x0, z0, x1, z1, R, dc) { return __ZC(356, 40, this, arguments, new.target); }
function davChurch(G, x, z, len, wid, h, ry, o) { return __ZC(356, 41, this, arguments, new.target); }
function davFlLandmarks(G) { return __ZC(356, 42, this, arguments, new.target); }
function davMarket(G) { return __ZC(356, 43, this, arguments, new.target); }
function davBottegaOut(G) { return __ZC(356, 44, this, arguments, new.target); }
function davOltrarno(G) { return __ZC(356, 45, this, arguments, new.target); }
var DAV_TOWNSFOLK = [0x8A2A2A, 0x2A4A6A, 0x5A6A2A, 0x6A4A2A, 0xC8A050, 0x3A2A4A, 0x8A6A4A, 0x2A5A4A, 0xA85A3A];
function davFolk(parent, seed, x, z, o) { return __ZC(356, 46, this, arguments, new.target); }
function davFlFolk(G) { return __ZC(356, 47, this, arguments, new.target); }
function davFlorence(G) { return __ZC(356, 48, this, arguments, new.target); }
function davMM() { return __ZC(356, 49, this, arguments, new.target); }
function davRod(par, mat, a, b, r) {
var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), l = d.length(), m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, l, DAV.lite ? 4 : 6), mat);
m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
par.add(m);
return m;
}
function davWingGeo(s, chord) { return __ZC(356, 50, this, arguments, new.target); }
function davWing(par, M, s, chord, side) { return __ZC(356, 51, this, arguments, new.target); }
var DAV_MBUILD = {
bird: function (M) { return __ZC(356, 52, this, arguments, new.target); },
glider: function (M) { return __ZC(356, 53, this, arguments, new.target); },
screw: function (M) { return __ZC(356, 54, this, arguments, new.target); },
tank: function (M) { return __ZC(356, 55, this, arguments, new.target); },
cart: function (M) { return __ZC(356, 56, this, arguments, new.target); },
boat: function (M) { return __ZC(356, 57, this, arguments, new.target); },
diver: function (M) { return __ZC(356, 58, this, arguments, new.target); },
chute: function (M) { return __ZC(356, 59, this, arguments, new.target); },
xbow: function (M) { return __ZC(356, 60, this, arguments, new.target); },
knight: function (M) { return __ZC(356, 61, this, arguments, new.target); },
lion: function (M) { return __ZC(356, 62, this, arguments, new.target); },
bridge: function (M) { return __ZC(356, 63, this, arguments, new.target); },
odo: function (M) { return __ZC(356, 64, this, arguments, new.target); }
};
function davMachineModel(k) { var B = DAV_MBUILD[k]; var g = B ? B(davMM()) : new THREE.Group(); g.name = "dav-m-" + k; return g; }
function davModelScale(k) { return { bird: 0.12, glider: 0.13, screw: 0.16, tank: 0.16, cart: 0.4, boat: 0.22, diver: 0.45, chute: 0.13, xbow: 0.07, knight: 0.4, lion: 0.35, bridge: 0.08, odo: 0.45 }[k] || 0.2; }
var DAV_PG = { x: 1450, z: 40 };
function davProving(G) { return __ZC(356, 65, this, arguments, new.target); }
var DAV_CECERI = { x: 700, z: -1150, y: 158, yaw: 2.55 };
function davCeceri(G) { return __ZC(356, 66, this, arguments, new.target); }
var DAV_JETTIES = [];
function davJetty(G, x, z, y, ry, name) { return __ZC(356, 67, this, arguments, new.target); }
function davRideOn(k, o) { return __ZC(356, 68, this, arguments, new.target); }
function davRideOff(quiet) { return __ZC(356, 69, this, arguments, new.target); }
function davRidePanel(on) { return __ZC(356, 70, this, arguments, new.target); }
function davRideTick(dt, L) { return __ZC(356, 71, this, arguments, new.target); }
function davFire() { return __ZC(356, 72, this, arguments, new.target); }
function davSmoke(L, bolt) { return __ZC(356, 73, this, arguments, new.target); }
function davShow(k) { return __ZC(356, 74, this, arguments, new.target); }
function davChuteCard() { return __ZC(356, 75, this, arguments, new.target); }
function davDive(on, quiet) {
DAV.dive = !!on;
if (!quiet)
setStatus(on ? "🤿 <b>You put on the Diving Suit.</b> Leather, a glass mask, cane tubes to a cork float. Walk into the river and keep going: you walk on its bed. Take it off from the 🎨 Leonardo menu." : "🤿 You take off the Diving Suit and hang it up to dry.");
}
var DAV_RIVER_FINDS = [[-120, "a silver Florentine florin", "🪙"], [310, "a goldsmith's lost ring", "💍"], [1500, "an iron key from a bargeman's chest", "🗝️"], [-900, "a clay pipe, very old", "🏺"], [-2200, "a fossil shell, from an older sea", "🐚"]];
function davDiveTick(L) { return __ZC(356, 76, this, arguments, new.target); }
var DAV_IN_X = 50000;
var DAV_IN = {};
function davInDef(key, o) { o.key = key; o.i = Object.keys(DAV_IN).length; o.x = DAV_IN_X + o.i * 700; o.z = 0; DAV_IN[key] = o; return o; }
function davInAt(x) { if (x < 45000)
return null; var k = Math.round((x - DAV_IN_X) / 700); for (var key in DAV_IN)
if (DAV_IN[key].i === k)
return DAV_IN[key]; return null; }
function davVeil() { if (DAV.veil)
return DAV.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0806;opacity:0;pointer-events:none;transition:opacity .6s ease;z-index:43"; document.body.appendChild(v); DAV.veil = v; return v; }
function davMove(x, z, yawTo, msg, y) { return __ZC(356, 77, this, arguments, new.target); }
function davEnter(key, alt) { return __ZC(356, 78, this, arguments, new.target); }
function davLeave(key) { var I = DAV_IN[key]; if (!I)
return; var O = I.out; davMove(O[0], O[1], O[2], O[3]); }
function davInDrop() { return __ZC(356, 79, this, arguments, new.target); }
function davSolidsDrop(x0, x1) {
DAV.solids = DAV.solids.filter(function (s) { return s.x < x0 || s.x > x1; });
var g = DAV.sgrid;
if (!g)
return;
for (var k in g) {
var i = +k.split(",")[0] * DAV_SG;
if (i >= x0 - DAV_SG && i <= x1 + DAV_SG)
g[k] = g[k].filter(function (s) { return s.x < x0 || s.x > x1; });
}
}
function davInFloor(grp, cx, cz, w, d, y, mat) { var m = new THREE.Mesh(davUVm(new THREE.BoxGeometry(w, 0.2, d)), mat); m.position.set(cx, y - 0.1, cz); grp.add(m); davFloor(cx, cz, w / 2, d / 2, y, { inside: 1 }); return m; }
function davIWall(grp, x0, z0, x1, z1, h, mat, gaps, y) { return __ZC(356, 80, this, arguments, new.target); }
function davRoomShell(grp, cx, cz, w, d, h, o) { return __ZC(356, 81, this, arguments, new.target); }
function davHang(grp, x, top, z) { return __ZC(356, 82, this, arguments, new.target); }
function davPerson(key, x, z, ry, o) { return __ZC(356, 83, this, arguments, new.target); }
function davSpot(x, z, r, name, verb, fn, y) { var s = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; DAV.spots.push(s); return s; }
function davTable(grp, x, z, w, d, ry) { return __ZC(356, 84, this, arguments, new.target); }
function davShelf(grp, x, z, w, ry) { return __ZC(356, 85, this, arguments, new.target); }
function davEasel(grp, x, z, ry, canvasMat) { return __ZC(356, 86, this, arguments, new.target); }
davInDef("bottega", { name: "The Bottega", hw: 52, hd: 42, arrive: [-44, 0, -Math.PI / 2], out: [164, -58, Math.PI / 2, "Back out on the street, by the Bottega's great doors."],
say: "<b>The Bottega of Andrea del Verrocchio.</b> Paint and plaster, bronze and sawdust. Through the shop: the studio (north), the hall of models (south), the courtyard, and the library of notebooks (east).",
build: function (grp, I) { return __ZC(356, 87, this, arguments, new.target); } });
davInDef("duomo", { name: "Santa Maria del Fiore", hw: 70, hd: 70, arrive: [-56, 0, -Math.PI / 2], out: [-88, -150, Math.PI / 2, "Back out in the cathedral square."],
say: "<b>Santa Maria del Fiore.</b> A nave of grey stone and white plaster, huge and quiet. At its end, the crossing under the dome; on its north side, the door to the climb (463 steps, between the dome's two shells, to the lantern).",
build: function (grp, I) { return __ZC(356, 88, this, arguments, new.target); } });
var DAV_HELIX = { dz: 90, r0: 3.2, r1: 7.4, pitch: 7.2, turns: 8 };
function davHelixBuild(grp, hx, hz) { return __ZC(356, 89, this, arguments, new.target); }
function davHelixY(x, z, feet) { return __ZC(356, 90, this, arguments, new.target); }
davInDef("vecchio", { name: "The Hall of the Five Hundred", hw: 40, hd: 20, arrive: [-30, 0, -Math.PI / 2], out: [56, 58, -Math.PI / 2, "Back out in the Piazza della Signoria."],
say: "<b>The Hall of the Five Hundred</b>, built for the Great Council of the Republic. Two masters were given its long walls to paint, each a battle Florence won: Leonardo the Battle of Anghiari (east), Michelangelo the Battle of Cascina (west). Neither was ever finished.",
build: function (grp, I) { return __ZC(356, 91, this, arguments, new.target); } });
davInDef("hospital", { name: "The anatomy hall of Santa Maria Nuova", hw: 30, hd: 16, arrive: [-20, 0, -Math.PI / 2], out: [150, -222, 0, "Back out under the hospital's loggia."],
say: "<b>The anatomy hall.</b> Here Leonardo studied how the body is made: bones, muscles, the heart, the eye. Brother Benedetto keeps the models: a great glass heart, a great eye, and a bronze figure of bones and cords.",
build: function (grp, I) { return __ZC(356, 92, this, arguments, new.target); } });
function davHeartModel(grp, x, z) { return __ZC(356, 93, this, arguments, new.target); }
function davEyeModel(grp, x, z) { return __ZC(356, 94, this, arguments, new.target); }
var DAV_TTREE = null;
function davTinyTreeTex() { return __ZC(356, 95, this, arguments, new.target); }
function davSkeletonModel(grp, x, z) { return __ZC(356, 96, this, arguments, new.target); }
function davT(k) { for (var i = 0; i < DAV_TOWNS.length; i++)
if (DAV_TOWNS[i].k === k)
return DAV_TOWNS[i]; return null; }
function davTownHouses(grp, cx, cz, r, y, o) { return __ZC(356, 97, this, arguments, new.target); }
function davPaveAt(grp, x, z, w, d, y, tint) { var p = davPave(grp, x, z, w, d, 0, tint, 3.2); p.position.y = y + 0.04; return p; }
function davVinci(G) { return __ZC(356, 98, this, arguments, new.target); }
var DAV_RINGS = null;
function davRingsTex() { return __ZC(356, 99, this, arguments, new.target); }
function davAnchiano(G) { return __ZC(356, 100, this, arguments, new.target); }
var DAV_STRATA = null;
function davStrataTex() { return __ZC(356, 101, this, arguments, new.target); }
var DAV_ML = { castle: { x: -40, z: -4060, s: 96 }, duomo: { x: 150, z: -3900 }, grazie: { x: -430, z: -3880 }, lock: null, horse: { x: -40, z: -4072 } };
function davMilan(G) { return __ZC(356, 102, this, arguments, new.target); }
function davHorse(par, x, y, z) { return __ZC(356, 103, this, arguments, new.target); }
var DAV_AM = { closluce: { x: -3730, z: -2470 } };
function davAmboise(G) { return __ZC(356, 104, this, arguments, new.target); }
function davImola(G) { return __ZC(356, 105, this, arguments, new.target); }
var DAV_CAMPS = [[2700, -260], [3900, -1150], [4100, -120], [3000, -1300]];
function davRomagna(G) { return __ZC(356, 106, this, arguments, new.target); }
function davCoaches(G) { return __ZC(356, 107, this, arguments, new.target); }
function davCoachCard(from) { return __ZC(356, 108, this, arguments, new.target); }
function davCoachGo(k) {
var S = null;
DAV_COACH.forEach(function (c) { if (c[0] === k)
S = c; });
if (!S)
return;
davMove(S[2] + 5, S[3] + 5, null, "🐎 <b>The coach rattles off</b> along the post road, over the hills, and sets you down at " + esc(S[1]) + ".");
}
function davPagesOut(G) { return __ZC(356, 109, this, arguments, new.target); }
var DAV_PAGE = null;
function davPageTex() { return __ZC(356, 110, this, arguments, new.target); }
var DAV_ASSE = null;
function davAsseTex() { return __ZC(356, 111, this, arguments, new.target); }
davInDef("asse", { name: "The Sala delle Asse", hw: 40, hd: 30, arrive: [-22, 0, -Math.PI / 2], out: [-20, -4078, 0, "Back out in the castle's court.", 20],
say: "<b>The Sala delle Asse</b>, in the castle of the Sforza, 1498. Leonardo painted it as a bower: sixteen trees rise up the walls and their branches knot together across the ceiling, bound with a golden cord that has no end. Through the far door: Ludovico's court.",
build: function (grp, I) { return __ZC(356, 112, this, arguments, new.target); } });
var DAV_SUPPER = null;
function davSupperTex() { return __ZC(356, 113, this, arguments, new.target); }
davInDef("refectory", { name: "The refectory of Santa Maria delle Grazie", hw: 30, hd: 12, arrive: [-24, 0, -Math.PI / 2], out: [-458, -3908, Math.PI / 2, "Back out by the church of Santa Maria delle Grazie.", 20],
say: "<b>The refectory</b>, where the friars of Santa Maria delle Grazie eat in silence. On the end wall, painted between 1495 and 1498: <b>the Last Supper</b>.",
build: function (grp, I) { return __ZC(356, 114, this, arguments, new.target); } });
var DAV_TAPESTRY = {};
function davTapTex(seed) { return __ZC(356, 115, this, arguments, new.target); }
davInDef("chateau", { name: "The King's hall at Amboise", hw: 40, hd: 14, arrive: [-24, 0, -Math.PI / 2], out: [-4006, -2674, Math.PI, "Back out on the castle's terrace, high over the Loire.", 30],
say: "<b>The King's hall.</b> Tapestries, a fireplace you could stand in, the lilies of France. In the middle of the floor stands the Mechanical Lion that Leonardo made for King Francis.",
build: function (grp, I) { return __ZC(356, 116, this, arguments, new.target); } });
var DAV_CELLAR_MARKS = ["the rose", "the star", "the spiral", "the key", "the bird", "the knot that has no end", "the shell", "the sun", "the hand"];
var DAV_CELLAR_RIGHT = 5;
davInDef("closluce", { name: "Clos Lucé", hw: 320, hd: 40, arrive: [-282, 0, -Math.PI / 2], arrive2: [120, 0, Math.PI / 2, "<b>Down the castle's stair</b>, into the tunnel under the hill. It runs a long way west, toward Clos Lucé."], out: [-3734, -2462, 0, "Back out in the garden of Clos Lucé."],
say: "<b>Clos Lucé.</b> Brick and white stone, warm and quiet. The great hall; Leonardo's room upstairs (here, through the left door); his workshop; the kitchen with its hearth. A narrow stair goes down to the cellar.",
build: function (grp, I) { return __ZC(356, 117, this, arguments, new.target); } });
var DAV_MARK = {};
function davMarkTex(i) { return __ZC(356, 118, this, arguments, new.target); }
function davCellarCard(row) { return __ZC(356, 119, this, arguments, new.target); }
function davCellarPress(i) { return __ZC(356, 120, this, arguments, new.target); }
davInDef("farm", { name: "The house at Anchiano", hw: 14, hd: 8, arrive: [-6, 2, 0], out: [-2860, -692, 0, "Back out among the olives.", 112],
say: "<b>The house at Anchiano.</b> Stone walls, a hearth, a table; out of the window, olive trees, and Vinci below on its hill.",
build: function (grp, I) { return __ZC(356, 121, this, arguments, new.target); } });
var DAV_IMAP = null;
function davImolaMapTex() { return __ZC(356, 122, this, arguments, new.target); }
davInDef("rocca", { name: "The map room of the Rocca", hw: 12, hd: 9, arrive: [-8, 0, -Math.PI / 2], out: [3341, -630, Math.PI / 2, "Back out by the Rocca of Imola.", 15],
say: "<b>The map room of the Rocca</b>, autumn 1502. Here Leonardo, Cesare Borgia's military engineer, drew the plan of Imola: the whole town seen from straight above, every street and house in its place.",
build: function (grp, I) { return __ZC(356, 123, this, arguments, new.target); } });
function davData() { var d = store.dav; if (!d || typeof d !== "object")
d = store.dav = {}; if (!Array.isArray(d.keeps))
d.keeps = []; d.pages = d.pages || {}; d.riddles = d.riddles || {}; d.lessons = d.lessons || {}; return d; }
function davSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function davKeep(icon, name, why) { var d = davData(); d.keeps.push({ i: icon, n: name, w: why || "", at: Date.now() }); if (d.keeps.length > 200)
d.keeps.splice(0, d.keeps.length - 200); davSave(); }
function davClaim(kind) { return __ZC(356, 124, this, arguments, new.target); }
var DAV_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function davInfo(title, text) { worldCard(DAV_H + esc(title) + "</div><div style='opacity:.88;margin-top:6px;line-height:1.45'>" + esc(text) + "</div>", {}); }
function davMirrorHtml(text, id) { return "<div id='" + id + "' data-m='1' style='transform:scaleX(-1);font:italic 15px/1.5 var(--serif,Georgia);color:#F2E2BC;background:rgba(232,220,184,.08);border-left:2px solid rgba(232,200,140,.4);padding:6px 10px;margin:6px 0'>" + esc(text) + "</div>"; }
function davMirrorBtn(id) { return worldBtn("mirror", "🪞 Hold up the mirror", "He wrote from right to left; a mirror makes it read the usual way"); }
function davMirrorFlip(id) { var el = document.getElementById(id); if (!el)
return; var m = el.getAttribute("data-m") === "1"; el.style.transform = m ? "none" : "scaleX(-1)"; el.setAttribute("data-m", m ? "0" : "1"); }
function davNoteOut(i) { for (var k = 0; k < DAV_PAGES_OUT.length; k++)
if (DAV_PAGES_OUT[k][0] === i)
return k; return -1; }
function davCodexCard(topic) { return __ZC(356, 125, this, arguments, new.target); }
function davPagePick(i) { return __ZC(356, 126, this, arguments, new.target); }
function davRiddleList(where) { var out = []; DAV_RIDDLES.forEach(function (R, i) { if (R[0] === where)
out.push(i); }); return out; }
var DAV_PLAQUE = null;
function davPlaqueTex() { return __ZC(356, 127, this, arguments, new.target); }
function davRiddleSpot(x, z, where, idx, y) { return __ZC(356, 128, this, arguments, new.target); }
function davRiddleCard(ri) { return __ZC(356, 129, this, arguments, new.target); }
function davClueCard() {
worldCard(DAV_H + "📜 A loose page</div><div style='opacity:.85;margin:4px 0'>Tucked behind the last shelf, in a different ink from the rest; the hand is old and shaky.</div>" + davMirrorHtml(DAV_CLUE, "dav-cl") + davMirrorBtn(), { mirror: function () { davMirrorFlip("dav-cl"); } });
}
var DAV_LESSON_TEXT = {
vitruvian: ["The Roman architect Vitruvius wrote that a well-made man, arms and legs spread, fits both a circle and a square. Leonardo measured real people to test it, and drew it (about 1490): the circle round the navel, the square round the whole figure, and the two do not share a centre.", "Your arm span is about your height. Your foot is about a seventh of it, your face a tenth, from the hairline to the chin. Stand in the bronze circle and see where your hands come.", ["Your arm span is about the same as your...", "Height", ["Leg length", "Foot times three", "Shoulder width"]]],
perspective: ["Leonardo described three kinds of perspective. Linear: things grow smaller as they go away, and parallel lines run to a point on the horizon. Of colour: far things lose their colour. Of vanishing: far things lose their sharp edges.", "Painting through a pane of glass, he said, and tracing what you see on it, shows you exactly how the lines run.", ["Where do the lines of a long straight street seem to meet?", "At a point on the horizon", ["At your feet", "Nowhere: they stay apart", "At the top of the sky"]]],
sfumato: ["Light falling on a round thing makes a gradual change from light to dark, with no line where one ends. Leonardo called painting it 'sfumato', smoky: 'without lines or borders, in the manner of smoke'.", "He liked a soft, grey light best for faces: an overcast day, or a courtyard with a veil drawn over it. Strong sun makes hard shadows.", ["What did Leonardo think gave the most beautiful light on faces?", "A soft, overcast light", ["Bright noon sun", "Candlelight only", "Complete darkness"]]],
obscura: ["Let light into a dark room through one small hole, and on the far wall appears the scene outside, upside down and the wrong way round. Leonardo used it to understand the eye: the pupil is the hole.", "The rays cross at the hole: the light from the top of a tree goes down to the bottom of the picture, and from its left to the right.", ["Why is the picture in a camera obscura upside down?", "The rays of light cross at the small hole", ["The wall is curved", "The light bounces off the floor", "It is a trick of the mind"]]],
heart: ["Leonardo found that the heart has four chambers, and that it is a muscle. He made a glass model of the great vessel leaving the heart, filled it with water and grass seeds, and watched the eddies that swirl behind its valve and close it.", "It was four hundred and fifty years before anyone proved he was right about those eddies.", ["What closes the valve of the great vessel, by Leonardo's glass model?", "Eddies of the blood swirling behind it", ["A little muscle", "The ribs", "It never closes"]]],
eye: ["Light passes through the pupil and the lens and makes a small picture on the back of the eye, upside down, like the camera obscura. The pupil grows in the dark and shrinks in bright light.", "Leonardo called the eye 'the window of the soul', and the master of all the senses.", ["What does the pupil do in bright light?", "It grows smaller", ["It grows larger", "It changes colour", "Nothing"]]],
skeleton: ["Muscles pull on bones by cords (tendons), like ropes on the arms of a crane; bones are levers. Leonardo drew the arm as cords and pulleys to show which muscle pulls which way.", "He drew the spine with its curves and every vertebra, and the bones of the foot, more truly than anyone before.", ["How do muscles move bones?", "They pull on them by cords, like ropes on levers", ["They push them", "Bones move by themselves", "Air in the bones"]]],
flight: ["A bird climbs by beating its wings down and back against the air, which presses back like something solid. It soars without flapping by riding wind that rises up a hillside, or rising warm air, circling in it.", "Leonardo watched kites and hawks for hours and wrote a whole small book about it, the Codex on the Flight of Birds (1505).", ["How does a kite soar without beating its wings?", "It rides air that rises up the hill", ["It is too light to fall", "It flaps very fast", "It floats like a cork"]]],
water: ["Water moves in eddies and spirals; Leonardo drew them like curling hair. Where water meets an obstacle it whirls round behind it, and the whirl digs at the bank.", "He planned to turn the Arno aside with a canal, and drew floods and storms as great spirals of water. 'Water is the driving force of all nature.'", ["What did Leonardo compare the curls of moving water to?", "Curling hair", ["Bird feathers", "Tree rings", "Flames"]]],
rocks: ["The rock here is in layers, laid down one on another at the bottom of an old sea; in them are shells. Leonardo argued that the shells grew where they lie, when this hill was sea floor, and were not washed up by one great flood: their families lie together, young and old, and some still have both halves closed.", "Layers on layers take a long, long time. He was right; it took two hundred years for others to agree.", ["Why are there sea shells in the hills?", "The hills were once the floor of the sea", ["A great flood washed them up", "People dropped them", "They grew on the trees"]]],
plants: ["Cut a tree across and count its rings: one for each year, wide in a wet year and narrow in a dry one. Leonardo was the first to write it down. He saw too that leaves grow round a stem in a spiral, each placed so as not to shade the one below.", "He also noticed that the branches of a tree, put together, are as thick as the trunk.", ["What does each ring of a tree's trunk mark?", "One year of its growth", ["One month", "One branch", "One flood"]]],
gears: ["Friction, rubbing, depends on how heavy a thing is and what it is made of, not on how much of it touches the ground: Leonardo measured it with blocks on ramps, two hundred years before it was written into a rule.", "To beat friction he drew ball bearings: balls held apart in a ring so they roll, not rub.", ["What makes a heavy block hardest to slide?", "Its weight (and what it is made of)", ["Its colour", "Its size alone", "Nothing: all slide the same"]]],
locks: ["A boat cannot climb a waterfall; a lock lifts it. Close the gates behind it, let water in from above, and the boat rises; open the gates ahead, and it sails on. Leonardo's gates meet in a point facing upstream, so the water's own push holds them shut, and small doors in them let water through without opening them.", "Milan's canals still have locks like his.", ["Why do the gates meet in a point facing upstream?", "The water's push holds them shut", ["They look better", "To let fish through", "So boats can ram them open"]]]
};
function davLessonList() { return __ZC(356, 130, this, arguments, new.target); }
function davLesson(key) { return __ZC(356, 131, this, arguments, new.target); }
function davLessonDraw(key, x, W, H, t) { return __ZC(356, 132, this, arguments, new.target); }
function davExam() { return __ZC(356, 133, this, arguments, new.target); }
function davExamQ(S) { return __ZC(356, 134, this, arguments, new.target); }
function davMachineCard(k) { return __ZC(356, 135, this, arguments, new.target); }
var DAV_HORSE_STEPS = [
["Cover it in wax", "The clay model is covered in a skin of wax exactly as thick as the bronze will be. Every hair of the mane is in the wax.", "Brush on the wax"],
["Make the mould", "Over the wax, a mould of clay and plaster mixed with ash and cloth, in pieces, bound with iron bars. Leonardo drew the iron frame in the Madrid notebook.", "Build the mould"],
["Bury it on its side", "His great idea: cast the whole horse in one pour, lying on its side in a pit, the mould buried in earth so it cannot burst. Nobody had ever cast so big a thing in one piece.", "Lower it into the pit"],
["Fire the furnaces", "Four furnaces round the pit, to melt about seventy tonnes of bronze all at once. Keep them roaring: the wax melts out, and the bronze must be hot enough to run into every hollow.", "Stoke the furnaces"],
["Pour", "Open the furnaces' mouths. The bronze runs down into the earth, into the hollow where the wax was.", "Pour the bronze"]
];
function davHorseCard() { return __ZC(356, 136, this, arguments, new.target); }
function davHorseBronze() { var H = DAV.horse; if (!H || !davData().horseCast)
return; var bz = davC(0x8A6A3A, { shine: 70, spec: 0x6A5030 }); H.g.traverse(function (m) { if (m.isMesh && H.mats.indexOf(m.material) >= 0)
m.material = bz; }); }
function davViola() { return __ZC(356, 137, this, arguments, new.target); }
function davBow(f) { return __ZC(356, 138, this, arguments, new.target); }
var DAV_PALETTE = [["Lead white", "#EDE6D6"], ["Yellow ochre", "#C89A4A"], ["Red ochre", "#A8503A"], ["Raw umber", "#6A4A2A"], ["Burnt sienna", "#8A3A1E"], ["Verdigris", "#3A7A5A"], ["Green earth", "#7A8A5A"], ["Ultramarine", "#2A3A8A"], ["Vermilion", "#C83A2A"], ["Lamp black", "#1E1A18"]];
var DAV_TOOLS = [["silver", "Silverpoint", "fine grey lines on prepared paper"], ["chalk", "Red chalk", "soft, warm, grainy"], ["ink", "Pen and ink", "brown iron-gall ink"], ["brush", "Brush", "his palette of earths and minerals"], ["smoke", "Sfumato", "soften and blend, like smoke"], ["rub", "Breadcrumb", "lift it off (an eraser of bread, as they used)"]];
var DAV_GUIDES = [["none", "No guide"], ["head", "Head proportions"], ["figure", "The figure (eight heads tall)"], ["persp", "Perspective grid"]];
function davPaint() { return __ZC(356, 139, this, arguments, new.target); }
function davArtList() { try {
var l = JSON.parse(localStorage.getItem("dav.art") || "[]");
return Array.isArray(l) ? l : [];
}
catch (e) {
return [];
} }
function davArtWall() { return __ZC(356, 140, this, arguments, new.target); }
var DAV_UNDER = {};
function davUnderdrawTex(i) { return __ZC(356, 141, this, arguments, new.target); }
var DAV_CART = {};
function davCartoonTex(n) { return __ZC(356, 142, this, arguments, new.target); }
var DAV_BATTLE = null;
function davBattleTex() { return __ZC(356, 143, this, arguments, new.target); }
function davAnghiariWall() { return __ZC(356, 144, this, arguments, new.target); }
var DAV_RUN = null;
function davRunTex() { return __ZC(356, 145, this, arguments, new.target); }
function davAnghiariCard() { return __ZC(356, 146, this, arguments, new.target); }
function davAnghiariPatch(i) { return __ZC(356, 147, this, arguments, new.target); }
function davAngDone(msg, i) { return __ZC(356, 148, this, arguments, new.target); }
function davObscuraScreen(grp, x, z) { return __ZC(356, 149, this, arguments, new.target); }
var DAV_STREET = null;
function davStreetTex() { return __ZC(356, 150, this, arguments, new.target); }
function davObscuraTick(dt, L) { return __ZC(356, 151, this, arguments, new.target); }
var DAV_VORT = null;
function davVortexTex() { return __ZC(356, 152, this, arguments, new.target); }
function davZoneAt(x, z) { return __ZC(356, 153, this, arguments, new.target); }
function davPlaceName(L) { return __ZC(356, 154, this, arguments, new.target); }
function davGround(x, z, feet) { return __ZC(356, 155, this, arguments, new.target); }
function davInsideWalk(x, z) { return __ZC(356, 156, this, arguments, new.target); }
function davBlock(x, z, feet) { return __ZC(356, 157, this, arguments, new.target); }
function davFxTick(dt, L) { return __ZC(356, 158, this, arguments, new.target); }
function davVisTick(L) { return __ZC(356, 159, this, arguments, new.target); }
function davTick(dt) { return __ZC(356, 160, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) { if (e.code === "KeyF" && typeof WLD !== "undefined" && WLD.on === DAV_KEY && DAV.ride && DAV.ride.M.wpn) {
var t = e.target;
if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA"))
return;
davFire();
} });
function davBakeTree(D) { return __ZC(356, 161, this, arguments, new.target); }
function davBuild(G) { return __ZC(356, 162, this, arguments, new.target); }
function davHome() { if (DAV.ride)
davRideOff(true); DAV.dive = false; davRidePanel(false); worldHome("<b>Back from Leonardo's Italy.</b> 'Learning never exhausts the mind.'"); }
if (typeof worldDef === "function")
worldDef(DAV_KEY, {
base: DAV.base, far: 5200, ownSky: true, tone: 300,
env: function () { return davEnvNow(); },
build: function (G) { davBuild(G); },
enter: function (opt) { return __ZC(356, 163, this, arguments, new.target); },
leave: function () { if (DAV.ride)
davRideOff(true); DAV.dive = false; davRidePanel(false); if (DAV.veil)
DAV.veil.style.opacity = "0"; DAV.moving = false; var e = document.getElementById("dav-easel"); if (e)
e.remove(); },
ground: function (x, z, feet) { var g = davGround(x, z, feet), R = DAV.ride; if (R && R.M.seat && (R.M.kind === "drive" || R.M.kind === "boat"))
g += R.M.seat; return g; },
block: function (x, z, feet) { return davBlock(x, z, feet); },
tick: function (dt) { davTick(dt); },
back: function () { davHome(); }
});
function davGo(opt) {
if (DAV.state && DAV.state.open === false && !(typeof amKeeper === "function" && amKeeper())) {
setStatus("🎨 <b>Leonardo's Italy is closed for now</b> by the Keeper. Try again later.");
return false;
}
return worldGo(DAV_KEY, opt || {});
}
function davStateFetch() { if (!(typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()))
return; cityRpc("dav_state", {}).then(function (o) { if (o && o.ok !== false)
DAV.state = o; }).catch(function () { }); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(DAV_KEY) < 0)
WLG.keys.push(DAV_KEY);
function davForget() { return __ZC(356, 164, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () {
var f = worldLetGo;
worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === DAV_KEY)
davForget(); return r; };
})();
var DAVD = { g: null, on: false };
function davHallSpot() {
if (typeof hallRealm !== "function" || typeof blockOrigin !== "function")
return null;
var r = hallRealm();
if (!r || !r.grid || (store.here || 0) !== r.id)
return null;
var h = blockOrigin(r.grid.bx, r.grid.bz), n = 1;
try {
n = hubDoorList().filter(function (d) { return d.to !== "hall"; }).length || 1;
}
catch (e) { }
var slots = [];
for (var i = 0; i < n; i++) {
var a = ((i + 0.5) / n) * Math.PI * 2;
slots.push({ a: a, d: Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2))) });
}
slots.sort(function (p, q) { return p.d - q.d; });
var S = slots[Math.min(1, slots.length - 1)];
return { x: h.x + Math.cos(S.a) * 29.5, z: h.z + Math.sin(S.a) * 29.5, a: S.a };
}
function davHallTick() {
if (WLD.on || store.inside || !walkMode) {
if (DAVD.g)
DAVD.g.visible = false;
if (DAVD.on) {
DAVD.on = false;
worldPromptCity(null);
}
return;
}
var s = davHallSpot();
if (!s) {
if (DAVD.g)
DAVD.g.visible = false;
if (DAVD.on) {
DAVD.on = false;
worldPromptCity(null);
}
return;
}
if (!DAVD.g) {
var g = new THREE.Group(), stone = wM(0xD8C8A8), wood = wM(0x6A4426), gold = wM(0xC8A048);
[-1, 1].forEach(function (k) { wBox(0.9, 4.6, 0.9, stone, k * 2, 2.3, 0, g); wCyl(0.32, 0.38, 4.2, stone, k * 2, 2.1, 0.5, g, 10); });
for (var i = 0; i <= 10; i++) {
var a = i / 10 * Math.PI, b = wBox(0.7, 0.55, 0.9, stone, Math.cos(a) * 2, 4.6 + Math.sin(a) * 1.5, 0, g);
b.rotation.z = a - Math.PI / 2;
}
wBox(3.1, 4.6, 0.16, wood, 0, 2.3, 0, g);
var knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.42, 0.06, 64, 6, 2, 5), gold);
knot.position.set(0, 5.1, 0.5);
g.add(knot);
var sg = wSign(["LEONARDO'S ITALY", "Florence, Milan, Amboise · his machines · press E"], 3.4, 0.8, "#3A2A1C", "#E8D4A0");
sg.position.set(0, 7.3, 0.5);
g.add(sg);
var gl = wGlow(0xFFD8A0, 3.2, 0.28);
gl.position.set(0, 2.6, 0.4);
g.add(gl);
scene.add(g);
DAVD.g = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
DAVD.g.visible = true;
DAVD.g.position.set(s.x, 0, s.z);
DAVD.g.rotation.y = -s.a - Math.PI / 2;
if (d < 3.6) {
if (!DAVD.on) {
DAVD.on = true;
worldPromptCity("<b>Leonardo's Italy</b> · <b>press E</b> to step through", davFromHall);
}
}
else if (DAVD.on) {
DAVD.on = false;
worldPromptCity(null);
}
}
function davFromHall() {
worldPromptCity(null);
DAVD.on = false;
var s = davHallSpot(), P = camera.position;
davGo(s ? { from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } } : {});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
davHallTick();
}
catch (e) {
if (!DAV.e1) {
DAV.e1 = 1;
if (window.console)
console.warn("davinci door:", e);
}
} };
})();
function davMenu() { return __ZC(356, 165, this, arguments, new.target); }
function davMachList() { return __ZC(356, 166, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-davinci"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-davinci";
b.title = "Leonardo's Italy";
b.textContent = "🎨 Leonardo";
b.onclick = function () { davMenu(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1600);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-dav]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-dav", "1");
b.textContent = "🎨 Leonardo's Italy (Florence)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } davGo({}); };
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
if (!/[?&]kdav=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!(typeof amKeeper === "function" && amKeeper()))
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
davGo({});
try {
var q = new URLSearchParams(location.search);
q.delete("kdav");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === DAV_KEY; })) {
DGR_WORLDS.push([DAV_KEY, "Leonardo's Italy (Safe everywhere but the Romagna's open country, which is Dangerous)", 3, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[DAV_KEY] = { id: DAV_KEY, name: "Leonardo's Italy", def: 3, group: "hidden" };
}
(function () {
if (typeof dgrLevelOf === "function") {
var lo = dgrLevelOf;
dgrLevelOf = function (id) { var n = lo.apply(this, arguments); if (id === DAV_KEY && typeof WLD !== "undefined" && WLD.on === DAV_KEY)
return davZoneLevel(n); return n; };
}
if (typeof DGB_KINDS !== "undefined")
Object.keys(DAV_BEASTS).forEach(function (k) { DGB_KINDS[k] = DAV_BEASTS[k]; });
if (typeof dgbList === "function") {
var dl = dgbList;
dgbList = function () { if (typeof WLD !== "undefined" && WLD.on === DAV_KEY)
return DAV_BEASTS_AT; return dl.apply(this, arguments); };
}
if (typeof dgbBarred === "function") {
var db = dgbBarred;
dgbBarred = function (x, z, feet) { if (typeof WLD !== "undefined" && WLD.on === DAV_KEY) {
if (davZoneAt(x, z) !== "romagna")
return true;
if (davWaterAt(x, z) !== null)
return true;
if (davSolidAt(x, z, feet || davLand(x, z)))
return true;
} return db.apply(this, arguments); };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === DAV_KEY; }))
try {
DK_PLACES.push([DAV_KEY, "Leonardo's Italy"]);
}
catch (e) { }
})();
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.codex)
return;
var d = { k: "codex", name: "Leonardo's Lost Codex", icon: "📕", at: DAV_KEY, seed: [0, 0], spot: "stone", mark: 0x8A7E6A,
what: "a stone in a tunnel's niche, with a knot that has no end cut into it", look: "Low in the niche's wall, one stone is cut with a knot that has no end, the same as the cellar stone. It is a little loose.", act: "Draw out the stone",
open: "Behind the stone, wrapped in oiled leather, a small thick notebook in red leather, its pages full of tiny writing, all of it backwards.",
tale: "A notebook Leonardo kept with him to the end and hid where the King walked: drawings of light and mirrors, of the Sun's heat gathered by a great concave mirror, of machines nobody has seen. Melzi had all his other notebooks; nobody knew of this one.",
rumour: "Melzi, at the Bottega's library, says the master left one notebook out of all the rest, \"for whoever reads him the right way round\". There is a loose page about it, behind the last shelf." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.codex = d;
RA.order.push("codex");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "codex") {
var key = "codex@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.codex;
if (c && c.key === key)
return c;
var I = DAV_IN.closluce;
return (RA.spots.codex = { x: I.x + 40, z: I.z + 5.6, y: 0, key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.codex = function () {
var M = raM(), g = new THREE.Group(), red = new THREE.MeshLambertMaterial({ color: 0x8A2A22 }), page = new THREE.MeshLambertMaterial({ color: 0xE8DCB8 });
var c1 = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.012, 0.15), red);
c1.position.y = 0.006;
g.add(c1);
var pg = new THREE.Mesh(new THREE.BoxGeometry(0.104, 0.03, 0.144), page);
pg.position.y = 0.027;
g.add(pg);
var c2 = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.012, 0.15), red);
c2.position.y = 0.048;
g.add(c2);
var knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.02, 0.003, 48, 4, 2, 5), M.gold || new THREE.MeshLambertMaterial({ color: 0xC8A048 }));
knot.rotation.x = Math.PI / 2;
knot.position.y = 0.056;
g.add(knot);
return { g: g, h: 0.06, anim: function (dt) { knot.rotation.z += dt * 0.2; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.codex = { n: "The Burning Mirror", col: 0xFFE0A0, cd: 40, pas: { speed: 1.12, armor: 0.88 },
act: [{ cone: 30, arc: 0.5, dmg: 90, knock: 6 }, { aoe: 14, slow: 8 }],
pasT: "You move 12% faster and blows on you land 12% softer: you see a blow coming, as he saw everything.",
actT: "A beam of the Sun's heat, gathered as in his drawings of the great concave mirror, strikes every foe in front of you within 30 m: 90 to each and thrown back; then all foes within 14 m are slowed for 8 seconds (dreamers too, where dreamers may fight). A soft warm glow, never a glare." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.dav;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
var by = {};
d.keeps.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Keepsakes from Leonardo's Italy") + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("");
}
}
catch (e) { }
return h;
};
})();
var DAV_COS_KEYS = ["hair", "hairStyle", "top", "topKind", "bottom", "bottomKind", "shoes", "shoeKind", "layer", "layerColor", "back", "backColor", "hat", "hatColor", "face", "neck", "ears", "hands", "waist", "accColor"];
function davCosOwned(C) { if (typeof amKeeper === "function" && amKeeper())
return true; var mine = (typeof myThings !== "undefined" && myThings) || []; return mine.some(function (t) { return t && t.archetype === "dav_" + C.k; }); }
function davCosWorn() { try {
return dreamer().ctCos || null;
}
catch (e) {
return null;
} }
function davCosWear(C) { return __ZC(356, 167, this, arguments, new.target); }
function davCosOff() {
if (typeof ctCosOff === "function") {
ctCosOff();
return;
}
var d = dreamer(), L = meLook(), P = d.ctPrev;
if (P)
DAV_COS_KEYS.forEach(function (k) { L[k] = P[k]; });
d.ctCos = null;
d.ctPrev = null;
rebuildMe();
try {
save();
}
catch (e) { }
setStatus("👗 Back in your own clothes.");
}
function davCosBuy(C, after) { return __ZC(356, 168, this, arguments, new.target); }
function davCostumeCard(sure) { return __ZC(356, 169, this, arguments, new.target); }
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
var own = DAV_COSTUMES.filter(davCosOwned), dv = document.createElement("div");
dv.style.cssText = "margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,.12)";
dv.innerHTML = "<div style='font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold,#D8B868);margin-bottom:6px'>🎨 Leonardo's Italy</div><div style='font-size:12.5px;color:var(--dim,#999);margin-bottom:6px'>" + (own.length ? own.length + " of yours." : "None yet.") + " " + DAV_COSTUMES.length + " costumes of Leonardo's time.</div><button class='btn' data-davcos='all'>See them</button>";
w.appendChild(dv);
dv.querySelector("[data-davcos]").onclick = function () { davCostumeCard(); };
}
catch (e) { }
return r;
};
})();
function davTest() { return { DAV: DAV, go: davGo, zoneAt: davZoneAt, ground: davGround, enter: davEnter, ride: davRideOn, off: davRideOff, move: davMove }; }
var DAV_ST_NS = {
"-500": "BORGO OGNISSANTI", "-434": "VIA PALAZZUOLO", "-368": "VIA DE' FOSSI", "-302": "VIA DELLA VIGNA NUOVA", "-236": "VIA DE' TORNABUONI",
"-170": "VIA DEGLI STROZZI", "-104": "VIA DE' TOSINGHI", "-38": "VIA CALIMALA", "28": "VIA DE' CALZAIUOLI", "94": "VIA DEL PROCONSOLO",
"160": "VIA DE' SERVI", "226": "VIA DELLA PERGOLA", "292": "VIA DE' MACCI", "358": "VIA DE' PEPI", "424": "VIA DELLA MATTONAIA", "490": "VIA DE' MALCONTENTI"
};
var DAV_ST_EW = {
"-440": "VIA GUELFA", "-382": "VIA DEGLI ALFANI", "-324": "VIA DE' PUCCI", "-266": "VIA DE' GORI", "-208": "VIA DELL'ORIUOLO",
"-150": "BORGO DEGLI ALBIZI", "-92": "VIA DEL CORSO", "-34": "VIA PORTA ROSSA", "24": "VIA VACCHERECCIA", "82": "BORGO DE' GRECI",
"140": "VIA DE' NERI", "198": "BORGO SANTI APOSTOLI"
};
var DAV_ST_NS_S = {
"-500": "VIA DEL CAMPUCCIO", "-434": "VIA DEL CAMPUCCIO", "-368": "VIA DE' SERRAGLI", "-302": "VIA SANTA MONACA", "-236": "VIA MAGGIO",
"-170": "VIA DELLO SPRONE", "-104": "SDRUCCIOLO DE' PITTI", "-38": "VIA GUICCIARDINI", "28": "COSTA SAN GIORGIO", "94": "VIA DE' RENAI",
"160": "VIA DI SAN NICCOLÒ", "226": "VIA DELL'OLMO", "292": "VIA DI BELVEDERE", "358": "VIA DI BELVEDERE"
};
var DAV_ST_EW_S = {
"198": "BORGO SAN JACOPO", "256": "BORGO SAN JACOPO", "314": "VIA TOSCANELLA", "372": "VIA MAZZETTA", "430": "VIA DEL LEONE", "488": "VIA ROMANA", "546": "VIA DEI CAMALDOLI"
};
function davStName(kind, line, south) { var T = kind === "ns" ? (south ? DAV_ST_NS_S : DAV_ST_NS) : (south ? DAV_ST_EW_S : DAV_ST_EW); return T[String(line)] || null; }
var DAV_FL_SQ = [
[-8, 20, 124, 176, "the Piazza della Signoria"], [-10, -12, 62, 24, "the Piazza della Signoria"],
[-172, -222, 118, -84, "the Piazza del Duomo"], [-118, -70, -2, 6, "the Old Market"], [158, -100, 262, -18, "the Bottega's yard"],
[100, -292, 206, -210, "the hospital of Santa Maria Nuova"], [196, -6, 350, 92, "the Piazza Santa Croce"], [-360, -250, -226, -140, "the Piazza Santa Maria Novella"],
[-112, -352, -12, -262, "the Piazza San Lorenzo"], [-40, -66, 24, -24, "Orsanmichele"], [-150, 400, 0, 520, "the Piazza de' Pitti"]
];
function davFlDest() { return __ZC(356, 170, this, arguments, new.target); }
var DAV_WAYS = null;
function davWaysAtlas(names) { return __ZC(356, 171, this, arguments, new.target); }
function davFitText(x, t, cx, cy, maxW, h, weight, face) {
var px = Math.round(h);
x.font = weight + " " + px + "px " + face;
var w = x.measureText(t).width;
if (w > maxW) {
px = Math.max(8, Math.floor(px * maxW / w));
x.font = weight + " " + px + "px " + face;
}
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(t, cx, cy);
}
function davWaysPlane(w, h, cell, flip) {
var g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv, C = cell;
var us = flip ? [C.u1, C.u0, C.u1, C.u0] : [C.u0, C.u1, C.u0, C.u1], vs = [C.v1, C.v1, C.v0, C.v0];
for (var i = 0; i < 4; i++)
uv.setXY(i, us[i], vs[i]);
uv.needsUpdate = true;
return g;
}
function davFlPlaques(D, A) { return __ZC(356, 172, this, arguments, new.target); }
var DAV_TIPG = {};
function davFlTipGeo(H) {
var k = String(H);
if (DAV_TIPG[k])
return DAV_TIPG[k];
var sh = new THREE.Shape();
sh.moveTo(0, -H / 2);
sh.lineTo(H * 0.75, 0);
sh.lineTo(0, H / 2);
sh.lineTo(0, -H / 2);
var g = new THREE.ExtrudeGeometry(sh, { depth: 0.06, bevelEnabled: false });
g.translate(0, 0, -0.03);
return (DAV_TIPG[k] = g);
}
function davFlClear(x, z, r) {
if (typeof davSolidAt !== "function")
return true;
for (var a = 0; a < 8; a++) {
if (davSolidAt(x + Math.cos(a * 0.785) * r, z + Math.sin(a * 0.785) * r, 0.5))
return false;
}
return !davSolidAt(x, z, 0.5);
}
function davFlPost(grp, A, x, z, dests, o) { return __ZC(356, 173, this, arguments, new.target); }
function davFlPosts(D, A, dests) { return __ZC(356, 174, this, arguments, new.target); }
var DAV_FLMAP = null;
var DAV_FLMAP_R = 720;
function davFlMapTex(dests) { return __ZC(356, 175, this, arguments, new.target); }
function davFlMapBoard(grp, x, z, mapMat) { return __ZC(356, 176, this, arguments, new.target); }
function davFlMaps(D, dests) { return __ZC(356, 177, this, arguments, new.target); }
function davFlMarks(D) { return __ZC(356, 178, this, arguments, new.target); }
function davFlStreetAt(x, z) { return __ZC(356, 179, this, arguments, new.target); }
if (typeof davPlaceName === "function")
(function () {
var f = davPlaceName;
davPlaceName = function (L) { var n = f(L); if (n === "Florence" && DAV.zone === "florence") {
var s = davFlStreetAt(L.x, L.z);
if (s)
return "Florence · " + s;
} return n; };
})();
function davFlWays(D) { return __ZC(356, 180, this, arguments, new.target); }
if (typeof davFlorence === "function")
(function () {
var f = davFlorence;
davFlorence = function (G) { var D = f(G); try {
davFlWays(D);
}
catch (e) {
if (window.console)
console.warn("[davinci] florence ways", e);
} return D; };
})();
if (typeof davForget === "function")
(function () {
var f = davForget;
davForget = function () {
f();
try {
if (DAV_WAYS) {
DAV_WAYS.tex.dispose();
DAV_WAYS.mat.dispose();
}
if (DAV_FLMAP) {
if (DAV_FLMAP.map)
DAV_FLMAP.map.dispose();
DAV_FLMAP.dispose();
}
}
catch (e) { }
DAV_WAYS = null;
DAV_FLMAP = null;
for (var k in DAV_TIPG) {
try {
DAV_TIPG[k].dispose();
}
catch (e) { }
}
DAV_TIPG = {};
};
})();
var DAV_EMB = null;
var DAV_EMB_N = ["key", "boot", "loaf", "flask", "shears", "anvil", "fish", "book"];
function davEmblems() { return __ZC(356, 181, this, arguments, new.target); }
function davEmbPlane(w, h, i) {
var g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv, u0 = i / 8, u1 = (i + 1) / 8;
[[u0, 1], [u1, 1], [u0, 0], [u1, 0]].forEach(function (p, j) { uv.setXY(j, p[0], p[1]); });
uv.needsUpdate = true;
return g;
}
var DAV_AWN = {};
function davAwnMat(col) { return __ZC(356, 182, this, arguments, new.target); }
function davAwnGeo(len, d, alongZ, hang) {
var g = new THREE.PlaneGeometry(len, d);
if (!hang)
g.rotateX(-Math.PI / 2);
if (alongZ)
g.rotateY(Math.PI / 2);
var uv = g.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setX(i, uv.getX(i) * Math.max(1, Math.round(len / 1.2)));
uv.needsUpdate = true;
return g;
}
var DAV_SHRINE = null;
function davShrineMat() { return __ZC(356, 183, this, arguments, new.target); }
function davFlDress(D) { return __ZC(356, 184, this, arguments, new.target); }
function davFlDavid(D) { return __ZC(356, 185, this, arguments, new.target); }
function davFlMoreFolk(D) {
var n = DAV.lite ? 4 : 12, spots = [[30, -80], [-40, -10], [100, 120], [28, -30], [-150, -100], [230, 30], [-280, -150], [-60, -250], [160, -190], [-70, 380], [28, 60], [-104, 30]];
for (var i = 0; i < n; i++) {
var s = spots[i % spots.length];
davFolk(D, 200 + i, s[0] + (i % 3 - 1) * 3, s[1] + (i % 2) * 3, { r: 18 });
}
}
function davPlasterFill(x, W, H, base) { return __ZC(356, 186, this, arguments, new.target); }
function davFlDressAll(D) {
function step(n, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[davinci] florence " + n, e);
} }
step("dress", function () { davFlDress(D); });
step("david", function () { davFlDavid(D); });
step("folk", function () { davFlMoreFolk(D); });
}
if (typeof davFlorence === "function")
(function () {
var f = davFlorence;
davFlorence = function (G) { var D = f(G); try {
davFlDressAll(D);
}
catch (e) {
if (window.console)
console.warn("[davinci] florence dress", e);
} return D; };
})();
if (typeof davForget === "function")
(function () {
var f = davForget;
davForget = function () { f(); for (var k in DAV_AWN) {
try {
DAV_AWN[k].map.dispose();
DAV_AWN[k].dispose();
}
catch (e) { }
} DAV_AWN = {}; try {
if (DAV_EMB) {
DAV_EMB.tex.dispose();
DAV_EMB.mat.dispose();
}
if (DAV_SHRINE) {
if (DAV_SHRINE.map)
DAV_SHRINE.map.dispose();
DAV_SHRINE.dispose();
}
}
catch (e) { } DAV_EMB = null; DAV_SHRINE = null; };
})();
var DAV_SW = { done: {} };
function davSwWood() { return davSurf("wood", 0xA88660, 1.2); }
function davSwStone() { return davSurf("stone", 0xC8BEAE, 1.6); }
function davSwFree(x, z, y, r) { return __ZC(356, 187, this, arguments, new.target); }
function davSwCrate(D, x, y, z, ry, fill) { return __ZC(356, 188, this, arguments, new.target); }
function davSwStall(D, x, z, y, ry, seed) { return __ZC(356, 189, this, arguments, new.target); }
function davSwWell(D, x, z, y) { return __ZC(356, 190, this, arguments, new.target); }
function davSwCart(D, x, z, y, ry, load) { return __ZC(356, 191, this, arguments, new.target); }
function davSwBarrels(D, x, z, y, n) { return __ZC(356, 192, this, arguments, new.target); }
function davSwHay(D, x, z, y) {
var m = davSurf(null, 0xC8A858, 1);
var b = wCyl(1.5, 1.7, 2.2, m, x, y + 1.1, z, D, DAV.lite ? 8 : 14);
var t = wCone(1.6, 1.6, m, x, y + 3.0, z, D, DAV.lite ? 8 : 14);
davSolid({ x: x, z: z, r: 1.7, h: 3.6, b: y });
}
function davSwWoodpile(D, x, z, y, ry) { return __ZC(356, 193, this, arguments, new.target); }
function davSwBench(D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var S = davSwStone();
davBoxM(1.8, 0.12, 0.5, S, 0, 0.45, 0, g);
[-0.7, 0.7].forEach(function (s) { davBoxM(0.25, 0.4, 0.4, S, s, 0.2, 0, g); });
davSolid({ x: x, z: z, hw: 0.95, hd: 0.3, rot: ry, h: 0.55, b: y });
}
function davSwPotTree(D, x, z, y, kind) { return __ZC(356, 194, this, arguments, new.target); }
function davSwCypress(D, x, z, y, h) {
h = h || 9;
wCyl(0.14, 0.2, 1.2, davC(0x4A3A2A), x, y + 0.6, z, D, 6);
var c = wSph(1, davLeafMat(0x2A4A26), x, y + h * 0.5 + 0.6, z, D, DAV.lite ? 8 : 12);
c.scale.set(0.95, h * 0.5, 0.95);
davSolid({ x: x, z: z, r: 0.6, h: h, b: y });
}
function davSwOlive(D, x, z, y, R) {
var t = wCyl(0.18, 0.3, 1.8, davSurf("wood", 0x6A5A48, 0.8), x, y + 0.9, z, D, 7);
t.rotation.z = (R() - 0.5) * 0.3;
for (var i = 0; i < 3; i++) {
var c = wSph(1.1 + R() * 0.5, davLeafMat(0x7A8A5A), x + (R() - 0.5) * 1.4, y + 2.3 + R() * 0.6, z + (R() - 0.5) * 1.4, D, DAV.lite ? 7 : 10);
c.scale.y = 0.6;
}
davSolid({ x: x, z: z, r: 0.45, h: 3, b: y });
}
function davSwVines(D, x, z, y, ry) { return __ZC(356, 195, this, arguments, new.target); }
function davSwTrestle(D, x, z, y, ry) { return __ZC(356, 196, this, arguments, new.target); }
function davSwTimber(D, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
D.add(g);
var W = davSurf("wood", 0x9A7A54, 1);
for (var r = 0; r < 3; r++)
for (var i = 0; i < 4; i++)
davBoxM(0.22, 0.22, 4.2, W, -0.36 + i * 0.24, 0.11 + r * 0.23, 0, g);
davSolid({ x: x, z: z, hw: 0.6, hd: 2.2, rot: ry, h: 0.8, b: y });
}
function davSwScatter(D, T, cx, cz, r0, r1, list, seed, folk) { return __ZC(356, 197, this, arguments, new.target); }
function davSwDress(name, D) { return __ZC(356, 198, this, arguments, new.target); }
(function () {
if (typeof davBakeTree !== "function")
return;
var bt = davBakeTree;
davBakeTree = function (D) { try {
if (D && D.name)
davSwDress(D.name, D);
}
catch (e) {
if (window.console)
console.warn("[davinci] sweep", e);
} return bt.apply(this, arguments); };
if (typeof davBuild === "function") {
var db = davBuild;
davBuild = function () { DAV_SW.done = {}; return db.apply(this, arguments); };
}
})();
