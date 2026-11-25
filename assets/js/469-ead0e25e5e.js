/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var LSW_KEY = "lostworld", LSW_NAME = "The Lost World", LSW_LONG = "The Lost World: the Amazon and Maple White Land";
var LSW = { base: -8100000, G: null, built: false, t: 0, lite: false, sc: null, scG: null, mats: {}, tex: {}, solids: [], sgrid: null, floors: [], spots: [], talk: [], people: [],
beasts: [], fx: [], moving: false, night: 0, ride: null, state: null, water: [], inst: [], hgt: null };
var LSW_ERA = " It is 1911, in Arthur Conan Doyle's The Lost World (the book only, never any film). Speak in the manner of the time, briefly and in character; keep it kind and suitable for all ages, and never use any slur.";
var LSW_SC = {
manaos: { x: -48000, name: "Manaos, on the Rio Negro", bound: 300, env: "day" },
river: { x: -36000, name: "The Esmeralda, steaming up the Amazon", bound: 220, env: "river" },
village: { x: -24000, name: "The village on the tributary", bound: 240, env: "day" },
forest: { x: -12000, name: "The great forest, and the rapid", bound: 420, env: "forest" },
channel: { x: 0, name: "The hidden channel: the green tunnel", bound: 520, env: "tunnel" },
uplands: { x: 12000, name: "The uplands: the palms, the bamboo, the tree-ferns", bound: 760, env: "day" },
maple: { x: 30000, name: "Maple White Land", bound: 1500, env: "day" }
};
function lswScAt(x) { var best = null, bd = 1e9; for (var k in LSW_SC) {
var d = Math.abs(x - LSW_SC[k].x);
if (d < bd) {
bd = d;
best = k;
}
} return bd < 5000 ? best : null; }
var LSW_CLIFF_H = 150, LSW_LAKE = { x: 40, z: -760, r: 300 };
var LSW_AT = {
quay: { sc: "manaos", x: 0, z: -46, name: "the quay on the Rio Negro" },
esmer: { sc: "manaos", x: 40, z: -78, name: "the launch Esmeralda, at the quay" },
opera: { sc: "manaos", x: -80, z: 38, name: "the opera house" },
town: { sc: "manaos", x: 0, z: 20, name: "the street up from the quay" },
fazenda: { sc: "manaos", x: 70, z: 196, name: "the Fazenda St. Ignatio" },
faztable: { sc: "manaos", x: 70, z: 203, name: "the cane table in the sitting-room" },
garden: { sc: "manaos", x: 70, z: 172, name: "the garden of the fazenda" },
deck: { sc: "river", x: 0, z: 4, name: "the deck of the Esmeralda" },
wheel: { sc: "river", x: 0, z: -7.5, name: "the wheel-house" },
bow: { sc: "river", x: 0, z: -13, name: "the bow" },
stern: { sc: "river", x: 0, z: 12, name: "the stern, under the awning" },
landing: { sc: "village", x: 0, z: -60, name: "the landing-place" },
maloca: { sc: "village", x: 30, z: 30, name: "the great house of the village" },
hut: { sc: "village", x: -50, z: 20, name: "the hut where the plans are made" },
canoes: { sc: "village", x: -20, z: -52, name: "the two canoes of skins over bamboo" },
fput: { sc: "forest", x: 0, z: 300, name: "the put-in, below the rapid" },
aisle: { sc: "forest", x: -60, z: 120, name: "the aisles of the great trees" },
silk: { sc: "forest", x: -80, z: 30, name: "the great silk-cotton tree" },
rapid: { sc: "forest", x: 60, z: 0, name: "the rapid, a mile long" },
ftop: { sc: "forest", x: 20, z: -300, name: "above the rapid" },
assai: { sc: "channel", x: -40, z: 420, name: "the Assai palm" },
reeds: { sc: "channel", x: 0, z: 330, name: "the light-green rushes" },
tunnel: { sc: "channel", x: 0, z: 100, name: "the green tunnel" },
cend: { sc: "channel", x: 0, z: -430, name: "where the canoes can go no farther" },
blaze: { sc: "channel", x: 12, z: -446, name: "the blazed tree" },
morass: { sc: "uplands", x: 0, z: 640, name: "the morass of sponge-like mosses" },
stones: { sc: "uplands", x: -70, z: 420, name: "the four fire-blackened stones" },
brook: { sc: "uplands", x: 60, z: 260, name: "the rock-studded pool, and the camp" },
bamboo: { sc: "uplands", x: 0, z: 60, name: "the wall of bamboo" },
bamboo2: { sc: "uplands", x: 0, z: -120, name: "the far side of the bamboo" },
ferns: { sc: "uplands", x: 0, z: -300, name: "the plain of tree-ferns" },
ridge: { sc: "uplands", x: 0, z: -480, name: "the whale-backed ridge" },
ridge2: { sc: "uplands", x: 0, z: -680, name: "the second ridge: the red cliffs in sight" },
arrive: { sc: "maple", x: 0, z: 700, name: "the plain, seven miles from the cliffs" },
camp1: { sc: "maple", x: 40, z: 60, name: "the camp under the pinnacle" },
zambo: { sc: "maple", x: 52, z: 40, name: "Zambo's camp, at the foot of the pinnacle" },
pfoot: { sc: "maple", x: 66, z: 30, name: "the foot of the pinnacle" },
mwcamp: { sc: "maple", x: -380, z: 44, name: "Maple White's old camp" },
colver: { sc: "maple", x: -560, z: 30, name: "the high bamboo under the cliff" },
arrow1: { sc: "maple", x: -900, z: 12, name: "the first chalk arrow" },
cleft: { sc: "maple", x: -1200, z: 20, name: "the mouth of the cleft" },
cave0: { sc: "maple", x: -1200, z: -40, name: "the cave in the cleft" },
jaracaca: { sc: "maple", x: 700, z: 220, name: "the edge of the Jaracaca Swamp" },
exitcave: { sc: "maple", x: -160, z: 26, name: "the foot of the cliff, where the rift comes out" },
ptop: { sc: "maple", x: 66, z: 12, y: LSW_CLIFF_H, name: "the top of the pinnacle" },
rim: { sc: "maple", x: 66, z: -26, name: "the edge of the plateau, across the gulf" },
fort: { sc: "maple", x: 20, z: -90, name: "Fort Challenger" },
gingko: { sc: "maple", x: 30, z: -96, name: "the great gingko tree" },
spring: { sc: "maple", x: 4, z: -84, name: "the spring by the fort" },
bog: { sc: "maple", x: -40, z: -240, name: "the bog of mare's-tails" },
tracks: { sc: "maple", x: -50, z: -262, name: "the great three-toed tracks" },
glade: { sc: "maple", x: -70, z: -330, name: "the glade of the iguanodons" },
swamp: { sc: "maple", x: 220, z: -380, name: "the swamp of the pterodactyls" },
swrim: { sc: "maple", x: 220, z: -300, name: "the rocks above the pterodactyl swamp" },
asphalt: { sc: "maple", x: -120, z: -520, name: "the asphalt pool" },
pit: { sc: "maple", x: -40, z: -470, name: "the pit across the path" },
rock: { sc: "maple", x: -40, z: -470 + 0, name: "the pit" },
lava: { sc: "maple", x: -30, z: -455, name: "the block of lava by the drinking-place" },
drink: { sc: "maple", x: -60, z: -462, name: "the drinking-place on the lake" },
lakeS: { sc: "maple", x: 40, z: -455, name: "the south shore of Lake Gladys" },
hide: { sc: "maple", x: -160, z: -140, name: "the brushwood hiding-place" },
apetown: { sc: "maple", x: -560, z: -160, name: "Ape Town" },
apeclear: { sc: "maple", x: -560, z: -60, name: "the clearing at the cliff's edge" },
apelook: { sc: "maple", x: -450, z: -110, name: "the bushes above the clearing" },
lakeN: { sc: "maple", x: 60, z: -1072, name: "the north shore, under the caves" },
caves: { sc: "maple", x: 60, z: -1138, name: "the caves of the Accala" },
ccamp: { sc: "maple", x: 150, z: -1110, name: "the camp below the caves" },
geyser: { sc: "maple", x: 340, z: -1060, name: "Challenger's workshop: the mud geyser in the palm grove" },
bluepit: { sc: "maple", x: -160, z: -1050, name: "a pit of blue clay" },
ghost: { sc: "maple", x: 520, z: -760, name: "the swamp east of the lake" },
cave17: { sc: "maple", x: -480, z: -1138, name: "the cave the chart marks" }
};
var LSW_GEC = "You are Professor George Edward Challenger, from Arthur Conan Doyle's The Lost World (the book only, never any film): short, enormously broad, with a huge head, a great spade-shaped black beard, a booming voice and drooping, insolent eyelids. On this journey you wear a round, boyish straw hat with a coloured ribbon and canvas shoes. You are the leader of the expedition (you insist on it), a genius, rude and vain, quarrelling with Professor Summerlee at every step, utterly honest and brave. You call Malone 'our young friend'.";
var LSW_SUMM = "You are Professor Summerlee, Professor of Comparative Anatomy, from Arthur Conan Doyle's The Lost World (the book only, never any film): sixty-six, tall, gaunt and stringy, with a thin goat-like beard and a short briar pipe always in your mouth. Acid, sceptical, untidy and absent-minded, but tireless and brave, and absolutely devoted to science: you hunt insects and birds with a shot-gun and a butterfly-net and mount them every evening.";
var LSW_JOHN = "You are Lord John Roxton, from Arthur Conan Doyle's The Lost World (the book only, never any film): about forty, spare and hawk-faced, with a red pointed beard and cold light-blue eyes, neat and prim, in white drill and high brown mosquito-boots. You are laconic and drawling ('young fellah my lad', 'what?', dropping your g's), a great shot and a born leader in danger, and you speak the river talk, the Lingoa Geral. The river people call you the Red Chief because you fought the rubber slave-drivers years ago.";
var LSW_ZAMBO = "You are Zambo, from Arthur Conan Doyle's The Lost World (the book only, never any film): a very big, very strong man from Para who worked on the steamers and joined the expedition there. You are brave, cheerful, honest and completely faithful: when the four are trapped on the plateau you stay alone at the foot of the pinnacle for weeks, keeping your promise that they will always find you there. Speak plainly and warmly in good English. You are a hero of this story, and you know your own worth.";
var LSW_GOMEZ = "You are Gomez, a river man from the upper Amazon, from Arthur Conan Doyle's The Lost World (the book only, never any film): bearded, wiry, quick, a fine worker who speaks excellent English, with a demure smile and a mask-like face. You are too curious about the expedition's plans. (Secretly you are the brother of Pedro Lopez, the slave-driver Lord John Roxton fought, but you never say so.) Be polite and a little evasive.";
var LSW_MANUEL = "You are Manuel, a river man from the upper Amazon who came down to Para with a cargo of redwood, from Arthur Conan Doyle's The Lost World (the book only, never any film): bearded, wiry, quiet, and you follow Gomez. You speak little English.";
var LSW_MOJO = "You are one of the three Mojo boatmen from Bolivia hired by the expedition, from Arthur Conan Doyle's The Lost World (the book only, never any film): the most skilful at fishing and boat work of all the river peoples. You are calm, capable, proud of your craft, and you speak a little Spanish and Portuguese and the river talk.";
var LSW_ACC = "You are one of the Accala people, who live in the caves above the great lake on the plateau of Maple White Land, from Arthur Conan Doyle's The Lost World (the book only, never any film): small, wiry, quick and good-humoured, with your black hair tied behind your head with a leather thong. You are skilled hunters and fishers, painters of the animals on your cave walls, brave in your long war against the ape-men, the Doda. You do not speak English: answer with gestures and a few words of your own, warmly, and the visitor understands.";
var LSW_MARETAS = "You are Maretas, the young son of the old chief of the Accala people of Maple White Land, from Arthur Conan Doyle's The Lost World (the book only, never any film): the youngest of your band, proud and high-spirited, with the front of your head shaved as a chief's son. The four strangers saved your life from the ape-men, and you are their friend; you understand that they long to go home. You speak no English: you answer with gestures, your own words, and great dignity.";
var LSW_Q = {
booth: "I will not bore those whom this narrative may reach by an account of our luxurious voyage upon the Booth liner, nor will I tell of our week's stay at Para",
claytint: "I will also allude very briefly to our river journey, up a wide, slow-moving, clay-tinted stream, in a steamer which was little smaller than that which had carried us across the Atlantic.",
obidos: "Eventually we found ourselves through the narrows of Obidos and reached the town of Manaos.",
shortman: "Here we were rescued from the limited attractions of the local inn by Mr. Shortman, the representative of the British and Brazilian Trading Company.",
summgaunt: "His tall, gaunt, stringy figure is insensible to fatigue, and his dry, half-sarcastic, and often wholly unsympathetic manner is uninfluenced by any change in his surroundings.",
summnet: "He spends his days flitting through the woods with his shot-gun and his butterfly-net, and his evenings in mounting the many specimens he has acquired.",
briar: "... addicted to smoking a short briar pipe, which is seldom out of his mouth.",
drill: "He is exceedingly neat and prim in his ways, dresses always with great care in white drill suits and high brown mosquito-boots, and shaves at least once a day.",
redchief: "The exploits of the Red Chief, as they called him, had become legends among them",
geral: "... he could talk fluently in the Lingoa Geral, which is the peculiar talk, one-third Portuguese and two-thirds Indian, which is current all over Brazil.",
whatthere: "\"What is there?\" he would cry, pointing to the north. \"Wood and marsh and unpenetrated jungle. Who knows what it may shelter?",
unknown: "The unknown is up against us on every side.",
mojo: "... we had engaged three Mojo Indians from Bolivia, who are the most skilful at fishing and boat work of all the river tribes.",
fifteen: "These men were willing to act as our personal servants, to cook, to row, or to make themselves useful in any way at a payment of fifteen dollars a month.",
glare: "Outside lay the yellow, brassy glare of the sunshine, with the shadows of the palm trees as black and definite as the trees themselves.",
hum: "The air was calm, full of the eternal hum of insects, a tropical chorus of many octaves, from the deep drone of the bee to the high, keen pipe of the mosquito.",
butterflies: "Beyond the veranda was a small cleared garden, bounded with cactus hedges and adorned with clumps of flowering shrubs, round which the great blue butterflies and the tiny humming-birds fluttered and darted in crescents of sparkling light.",
envelope: "\"Instructions to Lord John Roxton and party. To be opened at Manaos upon July 15th, at 12 o'clock precisely.\"",
sevenmin: "\"We have seven more minutes,\" said he. \"The old dear is very precise.\"",
quackery: "\"It is all part and parcel of the same system of quackery and nonsense, for which I regret to say that the writer is notorious.\"",
rules: "\"Oh, come, we must play the game accordin' to rules,\" said Lord John.",
whistle: "\"Time it is,\" said Lord John. \"You can blow the whistle.\"",
blank: "It was a blank sheet. He turned it over. Again it was blank.",
humbug: "\"The fellow is a self-confessed humbug.",
ink: "\"Invisible ink!\" I suggested.",
maycome: "\"May I come in?\" boomed a voice from the veranda.",
strawhat: "... Challenger, in a round, boyish straw-hat with a colored ribbon--Challenger, with his hands in his jacket-pockets and his canvas shoes daintily pointing as he walked",
sandbank: "The unfortunate delay can be apportioned between a blundering pilot and an intrusive sandbank.",
command: "From henceforth I take command of this expedition",
anothership: "\"Not from me, sir!\" exclaimed Professor Summerlee, heartily. \"So long as there was another ship upon the Atlantic.\"",
esmeralda: "Lord John Roxton has chartered a large steam launch, the Esmeralda, which was to carry us up the river.",
gapo: "... it attains a height of nearly forty feet above its low-water mark. It floods the banks, extends in great lagoons over a monstrous waste of country, and forms a huge district, called locally the Gapo",
eightinches: "The current of the river is a slight one, the drop being not greater than eight inches in a mile.",
shadows: "For three days we steamed north-westwards up a stream which even here, a thousand miles from its mouth, was still so enormous that from its center the two banks were mere shadows upon the distant skyline.",
tributary: "On the fourth day after leaving Manaos we turned into a tributary which at its mouth was little smaller than the main stream.",
doorunknown: "He added privately that we were now approaching the door of the unknown country, and that the fewer whom we took into our confidence the better it would be.",
wordhonor: "... he made each of us give our word of honor that we would publish or say nothing which would give any exact clue as to the whereabouts of our travels",
compass: "... the relation of places to each other may be correct, but the points of the compass are carefully confused",
august2: "It was August 2nd when we snapped our last link with the outer world by bidding farewell to the Esmeralda.",
skins: "... we have engaged two large canoes from the Indians, made of so light a material (skins over a bamboo framework) that we should be able to carry them round any obstacle.",
ataca: "I understand that they are the very two--Ataca and Ipetu by name--who accompanied Professor Challenger upon his previous journey.",
disappear: "So to-morrow we disappear into the unknown.",
abbey: "Last night Challenger said that he never cared to walk on the Thames Embankment and look up the river, as it was always sad to see one's own eventual goal.",
millbank: "Summerlee rejoined, however, with a sour smile, by saying that he understood that Millbank Prison had been pulled down.",
really: "He only smiled in his beard and repeated \"Really! Really!\" in the pitying tone one would use to a child.",
children: "Indeed, they are children both--the one wizened and cantankerous, the other formidable and overbearing, yet each with a brain which has put him in the front rank of his scientific age.",
sixeach: "... we divided our personnel, six in each, taking the obvious precaution in the interests of peace of putting one Professor into each canoe.",
darkriver: "For two days we made our way up a good-sized river some hundreds of yards broad, and dark in color, but transparent, so that one could usually see the bottom.",
darkwhite: "The dark indicate vegetable decay, while the others point to clayey soil.",
portage: "Twice we came across rapids, and in each case made a portage of half a mile or so to avoid them.",
gothic: "... shooting upwards in magnificent columns until, at an enormous distance above our heads, we could dimly discern the spot where they threw out their side-branches into Gothic upward curves which coalesced to form one great matted roof of verdure",
abbeyhush: "... the hush fell upon our souls which comes upon us in the twilight of the Abbey, and even Professor Challenger's full-chested notes sank into a whisper.",
cedars: "... our men of science pointed out the cedars, the great silk cotton trees, and the redwood trees",
orchids: "Vivid orchids and wonderful colored lichens smoldered upon the swarthy tree-trunks",
allamanda: "... where a wandering shaft of light fell full upon the golden allamanda, the scarlet star-clusters of the tacsonia, or the rich deep blue of ipomaea, the effect was as a dream of fairyland.",
upwards: "In these great wastes of forest, life, which abhors darkness, struggles ever upwards to the light.",
howlers: "At dawn and at sunset the howler monkeys screamed together and the parrakeets broke into shrill chatter",
surf: "... during the hot hours of the day only the full drone of insects, like the beat of a distant surf, filled the ear",
anteater: "Once some bandy-legged, lurching creature, an ant-eater or a bear, scuttled clumsily amid the shadows.",
throbbing: "On the third day out we were aware of a singular deep throbbing in the air, rhythmic and solemn, coming and going fitfully throughout the morning.",
drums: "\"Drums,\" said Lord John, carelessly; \"war drums. I have heard them before.\"",
drumtalk: "\"The Indians know. They have their own way. They watch us. They talk the drum talk to each other.",
qanda: "Sometimes they beat quickly, sometimes slowly, sometimes in obvious question and answer, one far to the east breaking out in a high staccato rattle, and being followed after a pause by a deep roll from the north.",
bravery: "I learned, however, that day once for all that both Summerlee and Challenger possessed that highest type of bravery, the bravery of the scientific mind.",
darwin: "Theirs was the spirit which upheld Darwin among the gauchos of the Argentine",
anchors: "That night we moored our canoes with heavy stones for anchors in the center of the stream, and made every preparation for a possible attack.",
steeprapid: "About three o'clock in the afternoon we came to a very steep rapid, more than a mile long--the very one in which Professor Challenger had suffered disaster upon his first journey.",
corrob: "I confess that the sight of it consoled me, for it was really the first direct corroboration, slight as it was, of the truth of his story.",
hundredmiles: "At this point I reckoned that we had come not less than a hundred miles up the tributary from the main stream.",
assai: "\"What do you make of that?\" he asked. \"It is surely an Assai palm,\" said Summerlee.",
privategate: "There where you see light-green rushes instead of dark-green undergrowth, there between the great cotton woods, that is my private gate into the unknown. Push through, and you will understand.",
placid: "... we poled out two canoes through them for some hundreds of yards, and eventually emerged into a placid and shallow stream, running clear and transparent over a sandy bottom.",
pergola: "The thick vegetation met overhead, interlacing into a natural pergola, and through this tunnel of verdure in a golden twilight flowed the green, pellucid river",
iceberg: "Clear as crystal, motionless as a sheet of glass, green as the edge of an iceberg, it stretched in front of us under its leafy archway",
velvet: "Fuzzy little black-velvet monkeys, with snow-white teeth and gleaming, mocking eyes, chattered at us as we passed.",
cayman: "With a dull, heavy splash an occasional cayman plunged in from the bank.",
tapir: "Once a dark, clumsy tapir stared at us from a gap in the bushes, and then lumbered away through the forest",
puma: "... the yellow, sinuous form of a great puma whisked amid the brushwood, and its green, baleful eyes glared hatred at us over its tawny shoulder.",
waders: "Bird life was abundant, especially the wading birds, stork, heron, and ibis gathering in little groups, blue, scarlet, and white, upon every log which jutted from the bank",
hazy: "For three days we made our way up this tunnel of hazy green sunshine.",
greenwater: "On the longer stretches one could hardly tell as one looked ahead where the distant green water ended and the distant green archway began.",
shallow: "... it became evident that our journey in the canoes could not last much longer, for the stream was rapidly growing more shallow.",
blazing: "We drew them up, therefore, and concealed them among the bushes, blazing a tree with our axes, so that we should find them again.",
burdens: "Then we distributed the various burdens among us--guns, ammunition, food, a tent, blankets, and the rest--and, shouldering our packages, we set forth upon the more laborious stage of our journey.",
aneroid: "Now, upon his assigning some duty to his fellow-Professor (it was only the carrying of an aneroid barometer), the matter suddenly came to a head.",
judges: "\"Yes, sir. You are a man whose veracity is upon trial, and this committee is here to try it. You walk, sir, with your judges.\"",
illingworth: "By some good fortune we discovered about this time that both our savants had the very poorest opinion of Dr. Illingworth of Edinburgh.",
scotch: "... every strained situation was relieved by our introducing the name of the Scotch zoologist, when both our Professors would form a temporary alliance and friendship in their detestation and abuse of this common rival.",
morass: "... it lost itself in a great green morass of sponge-like mosses, into which we sank up to our knees.",
organ: "... this pestilent morass, which droned like an organ in the distance, so loud was it with insect life.",
phoenix: "The huge trees of the alluvial Amazonian plain gave place to the Phoenix and coco palms, growing in scattered clumps, with thick brushwood between.",
mauritia: "In the damper hollows the Mauritia palms threw out their graceful drooping fronds.",
firestones: "... in one spot we actually came upon four fire-blackened stones, which must have marked a camping-place.",
ivory: "The vegetation had again changed, and only the vegetable ivory tree remained, with a great profusion of wonderful orchids",
cattleya: "... I learned to recognize the rare Nuttonia Vexillaria and the glorious pink and scarlet blossoms of Cattleya and odontoglossum.",
trout: "... swarms of little blue-backed fish, about the size and shape of English trout, gave us a delicious supper.",
bamboo: "Their place was taken by an immense wilderness of bamboo, which grew so thickly that we could only penetrate it by cutting a pathway with the machetes and billhooks of the Indians.",
yellowwall: "... usually my vision was limited to the back of Lord John's cotton jacket in front of me, and to the yellow wall within a foot of me on either side.",
knifeedge: "From above came one thin knife-edge of sunshine, and fifteen feet over our heads one saw the tops of the reeds swaying against the deep blue sky.",
cattle: "... several times we heard the plunging of large, heavy animals quite close to us. From their sounds Lord John judged them to be some form of wild cattle.",
treeferns: "In front was an open plain, sloping slightly upwards and dotted with clumps of tree-ferns, the whole curving before us until it ended in a long, whale-backed ridge.",
graybird: "... we saw, at the distance of a mile or so, something which appeared to be a huge gray bird flap slowly up from the ground and skim smoothly off, flying very low and straight, until it was lost among the tree-ferns.",
didyousee: "\"Did you see it?\" cried Challenger, in exultation. \"Summerlee, did you see it?\"",
ptero1: "\"To the best of my belief, a pterodactyl.\"",
fiddlestick: "\"A pter-fiddlestick!\" said he. \"It was a stork, if ever I saw one.\"",
zeiss: "\"I focused it before it got over the trees,\" said he. \"I won't undertake to say what it was, but I'll risk my reputation as a sportsman that it wasn't any bird that ever I clapped eyes on in my life.\"",
pickets: "Are we really just at the edge of the unknown, encountering the outlying pickets of this lost world of which our leader speaks?",
redcliffs: "When we had crossed the second ridge we saw before us an irregular, palm-studded plain, and then the line of high red cliffs which I have seen in the picture.",
peacock: "Challenger struts about like a prize peacock, and Summerlee is silent, but still sceptical.",
jose: "Meanwhile, as Jose, whose arm was pierced by a broken bamboo, insists upon returning, I send this letter back in his charge",
dreadful: "A dreadful thing has happened to us. Who could have foreseen it?",
moon: "We are, in truth, as far from any human aid as if we were in the moon.",
thousandft: "Their height, as we approached them, seemed to me in some places to be greater than he had stated--running up in parts to at least a thousand feet--and they were curiously striated",
salisbury: "Something of the sort is to be seen in Salisbury Crags at Edinburgh.",
spire: "It is like a broad red church spire, the top of it being level with the plateau, but a great chasm gaping between.",
perched: "\"It was on that,\" said Professor Challenger, pointing to this tree, \"that the pterodactyl was perched.",
stork: "\"Professor Summerlee will understand that when I speak of a pterodactyl I mean a stork--only it is the kind of stork which has no feathers, a leathery skin, membranous wings, and teeth in its jaws.\"",
council: "... we held a council of war as to the best method of ascending to the plateau above us. Challenger presided with a solemnity as if he were the Lord Chief Justice on the Bench.",
python: "... we saw that it was a very large snake with a peculiar flat, spade-like head.",
chin: "\"I should be glad, Professor Challenger,\" said he, \"if you could see your way to make any remarks which may occur to you without seizing me by the chin.",
tins: "It was the site of an old encampment, with several empty Chicago meat tins, a bottle labeled \"Brandy,\" a broken tin-opener, and a quantity of other travelers' debris.",
democrat: "A crumpled, disintegrated newspaper revealed itself as the Chicago Democrat, though the date had been obliterated.",
signpost: "\"I say, look at this,\" said he. \"I believe it is meant for a sign-post.\"",
hudson: "A gold watch by Hudson, of New York, and a chain which held a stylographic pen, lay among the bones.",
jcase: "There was also a silver cigarette-case, with \"J. C., from A. E. S.,\" upon the lid.",
colver: "I think, therefore, that there can be no doubt that we are now looking upon the remains of this James Colver.",
chalkarrow: "In a hollow of the rock, protected from rain, there was drawn a rough arrow in chalk, pointing still to the westwards.",
stump: "A box of colored chalks was among the effects I found in his knapsack. I remember that the white one was worn to a stump.",
cleft: "It was at a point where the face of the cliff was for the first time split into a narrow cleft.",
circle: "High up above our heads, amid the dark shadows, there was one circle of deeper gloom. Surely it could only be the opening of a cave.",
torch: "Lord John had an electric torch in his knapsack, and this had to serve us as light.",
blocked: "\"It's blocked!\" said he.",
fallenin: "\"The roof has fallen in!\"",
hugerock: "... a huge rock rolled suddenly downwards--and shot past us with tremendous force.",
threethousand: "... our aneroid shows us that in the continual incline which we have ascended since we abandoned our canoes we have risen to no less than three thousand feet above sea-level.",
begonia: "There was a red begonia just the same color as one that is kept in a pot in the window of a certain villa in Streatham",
ajouti: "Lord John had shot an ajouti--which is a small, pig-like animal--and, half of it having been given to the Indians, we were cooking the other half upon our fire.",
swish: "Well, suddenly out of the darkness, out of the night, there swooped something with a swish like an aeroplane.",
harpies: "We all sat in amazed silence round the fire, like the heroes of Virgil when the Harpies came down upon them.",
apology: "\"Professor Challenger,\" said he, in a solemn voice, which quavered with emotion, \"I owe you an apology. Sir, I am very much in the wrong, and I beg that you will forget what is past.\"",
stolen: "It was worth a stolen supper to bring two such men together.",
jaracaca: "To make matters worse, the place seemed to be a favorite breeding-place of the Jaracaca snake, the most venomous and aggressive in South America.",
rain: "\"Surely,\" said I, as we discussed the situation, \"the rain must find its way down somehow.",
lakecenter: "\"Then there is a lake in the center.\" \"So I should suppose.\"",
bullfrog: "... Challenger was squatting, like a monstrous bull-frog, by the fire, his huge head in his hands, sunk apparently in the deepest thought",
eureka: "\"Eureka!\" he cried, his teeth shining through his beard. \"Gentlemen, you may congratulate me and we may congratulate each other. The problem is solved.\"",
rope150: "From it he took a coil of the strongest and lightest rope, a hundred and fifty feet in length, with climbing irons, clamps, and other devices.",
fingers: "... for the last fifty feet, we were literally clinging with our fingers and toes to tiny ledges and crevices in the rock.",
brazil: "The whole Brazilian plain seemed to lie beneath us, extending away and away until it ended in dim blue mists upon the farthest sky-line.",
vestigia: "\"This way, my young friend,\" said he; \"vestigia nulla retrorsum. Never look rearwards, but always to our glorious goal.\"",
fortyfeet: "At a rough guess the gulf was forty feet across, but, so far as I could see, it might as well have been forty miles.",
beech: "\"Why,\" I cried, \"it's a beech!\" \"Exactly,\" said Summerlee. \"A fellow-countryman in a far land.\"",
bridge: "\"By George!\" cried Lord John, \"a bridge!\"",
thews: "\"Our young friend has the thews and sinews,\" said he. \"I think he will be the most useful at this task.",
crack: "In a little over an hour there was a loud crack, the tree swayed forward, and then crashed over, burying its branches among the bushes on the farther side.",
historical: "\"I claim the honor,\" said he, \"to be the first to cross to the unknown land--a fitting subject, no doubt, for some future historical painting.\"",
department: "\"We all have our professions, and soldierin' is mine.",
atlast: "He clambered up and waved his arms in the air. \"At last!\" he cried; \"at last!\"",
walked: "As to Lord John, he walked across--actually walked without support! He must have nerves of iron.",
dreamland: "And there we were, the four of us, upon the dreamland, the lost world, of Maple White.",
prelude: "Who could have guessed that it was the prelude to our supreme disaster?",
bridgegone: "With one impulse we rushed back the way that we had come. The bridge was gone!",
trapped: "\"You found it hard to get up; you will find it harder to get down.",
brother: "\"As you lie dying, think of Lopez, whom you shot five years ago on the Putomayo River. I am his brother",
separate: "We had been natives of the world; now we were natives of the plateau.",
serenity: "They were grave, it is true, and thoughtful, but of an invincible serenity.",
apollinaris: "We supped and camped at the very edge of the cliff, quenching our thirst with two bottles of Apollinaris which were in one of the cases.",
hopeless: "No, our position is hopeless--hopeless!",
wonderful: "The most wonderful things have happened and are continually happening to us.",
fivebooks: "All the paper that I possess consists of five old note-books and a lot of scraps, and I have only the one stylographic pencil",
maloni: "\"We cannot do less than call it Ixodes Maloni.",
scieye: "\"You should cultivate the scientific eye and the detached scientific mind,\" said he.",
fortchall: "... we cut down with our hatchet and knives a number of thorny bushes, which we piled round in a circle some fifteen yards in diameter.",
fortname: "Fort Challenger, we called it.",
gingkotree: "One huge gingko tree, topping all the others, shot its great limbs and maidenhair foliage over the fort which we had constructed.",
liebow: "\"So long as neither man nor beast has seen or heard us, we are safe,\" said he.",
neverfire: "Above all, we must never, unless it is life or death, fire off our guns.",
maplename: "\"It is called after the pioneer who discovered it. It is Maple White Land.\"",
stores1300: "... we had our four rifles and one thousand three hundred rounds, also a shot-gun, but not more than a hundred and fifty medium pellet cartridges.",
cycad: "... recognized as forms of conifera and of cycadaceous plants which have long passed away in the world below",
mares: "High reeds of a peculiar type grew thickly before us, which were pronounced to be equisetacea, or mare's-tails, with tree-ferns scattered amongst them",
fatherbirds: "\"By George, this must be the trail of the father of all birds!\"",
threetoed: "An enormous three-toed track was imprinted in the soft mud before us.",
wealden: "\"Wealden!\" cried Challenger, in an ecstasy. \"I've seen them in the Wealden clay.",
notbird: "Not a bird, my dear Roxton--not a bird.\" \"A beast?\" \"No; a reptile--a dinosaur.",
five: "Beyond was an open glade, and in this were five of the most extraordinary creatures that I have ever seen.",
slate: "They had slate-colored skin, which was scaled like a lizard's and shimmered where the sun shone upon it.",
kangaroos: "... they looked like monstrous kangaroos, twenty feet in length, and with skins like black crocodiles.",
sapling: "... one of them, having some difficulty in reaching a bunch of foliage which grew upon a considerable-sized tree, put his fore-legs round the trunk and tore it down as if it had been a sapling.",
nunc: "\"Nunc dimittis!\" he cried at last. \"What will they say in England of this?\"",
faked: "\"Faked, Summerlee! Clumsily faked!\"",
aug28: "August the twenty-eighth--the day we saw five live iguanodons in a glade of Maple White Land.",
hastings: "\"You'll find their footmarks all over the Hastings sands, in Kent, and in Sussex.",
thinice: "I don't know what you chaps think, but it strikes me that we are on mighty thin ice all this time.",
nightmare: "If, as Lord John said, the glade of the iguanodons will remain with us as a dream, then surely the swamp of the pterodactyls will forever be our nightmare.",
gabbling: "... we became aware of a strange low gabbling and whistling sound, which filled the air with a constant clamor",
rookery: "The place was a rookery of pterodactyls. There were hundreds of them congregated within view.",
oldwomen: "... they sat like gigantic old women, wrapped in hideous web-colored shawls, and with their ferocious heads protruding above them.",
greensand: "... the bones of this flying dragon are found in such great numbers in certain well-defined areas, as in the Cambridge Green-sand, since it was now seen that, like penguins, they lived in gregarious fashion.",
hendon: "... the dry, rustling flap of their huge slate-colored wings filling the air with a volume of sound that made me think of Hendon aerodrome upon a race day.",
makewood: "\"Make for the wood and keep together,\" cried Lord John, clubbing his rifle. \"The brutes mean mischief.\"",
nospace: "Once there we were safe, for those huge wings had no space for their sweep beneath the branches.",
woodpigeons: "... we saw them for a long time flying at a great height against the deep blue sky above our heads, soaring round and round, no bigger than wood-pigeons",
informed: "\"A most interesting and convincing experience,\" said Challenger, as we halted beside the brook and he bathed a swollen knee.",
visited: "The gate of Fort Challenger had been untouched, the walls were unbroken, and yet it had been visited by some strange and powerful creature in our absence.",
matchwood: "A case of cartridges had been shattered into matchwood, and one of the brass shells lay shredded into pieces beside it.",
violetline: "How difficult it was to realize that the violet line upon the far horizon was well advanced to that great river upon which huge steamers ran",
bluesoil: "\"It was a bluish soil. It looked like clay.\" \"Exactly. A volcanic tube full of blue clay.\"",
muttered: "\"Blue clay--clay in a volcanic tube!\"",
observed: "I remember that during the whole long day I was haunted by the feeling that we were closely observed, though by whom or whence I could give no guess.",
cries: "We were all sleeping round our dying fire when we were aroused--or, rather, I should say, shot out of our slumbers--by a succession of the most frightful cries and screams to which I have ever listened.",
jurassic: "\"We have been privileged to overhear a prehistoric tragedy, the sort of drama which occurred among the reeds upon the border of some Jurassic lagoon",
patpat: "From the utter silence there emerged a deep, regular pat-pat.",
horse: "It was no higher than a horse, but the dim outline suggested vast bulk and strength.",
dontfire: "\"Don't fire! Don't fire!\" whispered Lord John. \"The crash of a gun in this silent night would be heard for miles. Keep it as a last card.\"",
brave: "It was as brave an act as ever I saw a man do.",
toad: "For one moment I had a vision of a horrible mask like a giant toad's",
fire: "\"I thought he wouldn't face the fire,\" said Lord John, laughing, as he came back and threw his branch among the faggots.",
sentinel: "\"Two-hour spells in the future, for each of us.\"",
allosaurus: "Personally, I should pronounce for allosaurus.\" \"Or megalosaurus,\" said Summerlee.",
asphaltmark: "On the dull, scaly, slate-colored skin somewhere above the shoulder, there was a singular black circle of some substance which looked like asphalt.",
county: "We know roughly that this plateau is not larger than an average English county.",
check: "One of the many interesting problems, therefore, which await our solution is to discover what that check may be and how it operates.",
maynot: "\"And I venture to trust we may not,\" I observed.",
primflowers: "... all that morning we wandered among lovely flowers--mostly, as I observed, white or yellow in color, these being, as our professors explained, the primitive flower-shades.",
bee: "The homely English bee buzzed everywhere around us.",
pecked: "By observing which of them were pecked by the birds we avoided all danger of poison and added a delicious variety to our food reserve.",
irishelk: "... it must have been as large as those monstrous Irish elk which are still dug up from time to time in the bogs of my native land.",
getout: "\"What we ought to be doing to-day, to-morrow, and all the time,\" said he, \"is finding some way out of the trap into which we have fallen.",
watchtower: "Surely, if its bole exceeded that of all others, its height must do the same.",
irishlad: "Now, ever since I ran wild as a lad in Ireland I have been a bold and skilled tree-climber.",
thrust: "... Challenger sprang forward and gave me such a thrust with his huge hand that he fairly shot me into the tree.",
face: "A face was gazing into mine--at the distance of only a foot or two.",
apeface: "It was a human face--or at least it was far more human than any monkey's that I have ever seen.",
oval: "It was, as seen from this height, of an oval contour, with a breadth of about thirty miles and a width of twenty.",
funnel: "Its general shape was that of a shallow funnel, all the sides sloping down to a considerable lake in the center.",
longdark: "A number of long dark objects, which were too large for alligators and too long for canoes, lay upon the edges of these patches of sand.",
cavemouths: "Along the base of these red cliffs, some distance above the ground, I could see a number of dark holes through the glass, which I conjectured to be the mouths of caves.",
hero: "For once I was the hero of the expedition. Alone I had thought of it, and alone I had done it",
missing: "In the latter case, he may well approximate to what the vulgar have called the 'missing link.'",
inkpots: "\"The ink-pots of civilization, sir.",
lakegladys: "\"Then,\" said I, blushing, I dare say, as I said it, \"let it be named Lake Gladys.\"",
boys: "\"Boys will be boys,\" said he. \"Lake Gladys let it be.\"",
whynot: "The full moon was shining brightly, and the air was crisply cold. What a night for a walk! And then suddenly came the thought, \"Why not?\"",
heroisms: "I thought of Gladys, with her \"There are heroisms all round us.\" I seemed to hear her voice as she said it.",
nodding: "My last glance showed me the unconscious Summerlee, most futile of sentinels, still nodding away like a queer mechanical toy in front of the smouldering fire.",
dreadforest: "It was dreadful in the forest.",
shotgun: "It was the shot-gun, not the rifle, which I had taken!",
brookguide: "So long as I followed it down I must come to the lake, and so long as I followed it back I must come to the camp.",
skeleton: "As it passed across the face of the moon the light shone clearly through the membranous wings, and it looked like a flying skeleton against the white, tropical radiance.",
kettle: "It was like a boiling kettle or the bubbling of some great pot.",
trafalgar: "... a pool, rather, for it was not larger than the basin of the Trafalgar Square fountain--of some black, pitch-like stuff, the surface of which rose and fell in great blisters of bursting gas.",
oneam: "At last (my watch showed that it was one in the morning) I saw the gleam of water amid the openings of the jungle",
portholes: "... I saw discs of light in every direction, ruddy, clearly-defined patches, like the port-holes of a liner in the darkness.",
humans: "There were human beings, then, upon the plateau.",
quicksilver: "Lake Gladys--my own lake--lay like a sheet of quicksilver before me, with a reflected moon shining brightly in the center of it.",
swan: "Once upon a yellow sandbank I saw a creature like a huge swan, with a clumsy body and a high, flexible neck, shuffling about upon the margin.",
armadillos: "Two creatures like large armadillos had come down to the drinking-place, and were squatting at the edge of the water",
deer: "A huge deer, with branching horns, a magnificent creature which carried itself like a king, came down with its doe and two fawns and drank beside the armadillos.",
stego: "It was the stegosaurus--the very creature which Maple White had preserved in his sketch-book",
hackles: "For five minutes he was so close to my rock that by stretching out my hand I could have touched the hideous waving hackles upon his back.",
halfpast: "Looking at my watch, I saw that it was half-past two o'clock, and high time, therefore, that I started upon my homeward journey.",
snore: "It was something between a snore and a growl, low, deep, and exceedingly menacing.",
hopped: "I say \"hopped\" advisedly, for the beast moved like a kangaroo, springing along in an erect position upon its powerful hind legs",
smelling: "It was smelling out my trail.",
beatenpath: "... I saw a well-marked, hard-beaten path which ran across in front of me.",
falling: "And then suddenly there came a crash--I was falling through space, and everything beyond was darkness and rest.",
trap: "It was a trap--made by the hand of man.",
master: "Man was always the master.",
riflesshot: "In the clear, still morning air there sounded far away the sharp, hard note of a single rifle-shot.",
gateopen: "The zareba rose before me, even as I had left it, but the gate was open.",
disappeared: "Our effects were scattered in wild confusion over the ground; my comrades had disappeared",
child: "Without them I was like a child in the dark, helpless and powerless.",
sovereigns: "These documents I threw to Zambo in the evening, and also my purse, which contained three English sovereigns.",
onelight: "... my last vision as I went was the red gleam of Zambo's fire, the one point of light in the wide world below, as was his faithful presence in my own shadowed soul.",
threefires: "Finally, I closed the door of the zareba, lit three separate fires in a triangle, and having eaten a hearty supper dropped off into a profound sleep",
quick: "\"Quick, young fellah! Quick!\" he cried. \"Every moment counts. Get the rifles, both of them.",
rainedapes: "Suddenly it rained apes. They came down as thick as apples out of a tree.",
redchall: "This old ape-man--he was their chief--was a sort of red Challenger, with every one of our friend's beauty points, only just a trifle more so.",
emperor: "Four of them carried him shoulder high, and he went like a Roman emperor.",
castanets: "It was a strange clicking noise in the distance not unlike castanets.",
thousandhuts: "They got us soon to this town of theirs--about a thousand huts of branches and leaves in a great grove of trees near the edge of the cliff.",
wildbells: "... singin' in that rollin' bass of his, 'Ring out, wild bells,' cause music of any kind seemed to put 'em in a good humor",
twosides: "It seems that the humans hold one side of this plateau--over yonder, where you saw the caves--and the ape-men hold this side",
bandy: "One was that these brutes could not run as fast as a man in the open. They have short, bandy legs, you see, and heavy bodies.",
open: "\"So long as we are among the thick trees these swine are our masters,\" said he. \"They can see us and we cannot see them. But in the open it is different.",
neverforget: "It was a sight which I shall never forget until my dying day",
rookhuts: "A rookery, with every nest a little house, would best convey the idea.",
pleading: "He was begging, pleading, imploring for his comrade's life.",
admirable: "\"Admirable!\" cried Challenger. \"Admirable! Not only we as individuals, but European science collectively, owe you a deep debt of gratitude for what you have done.",
seethemsafe: "\"We've got to see them safe,\" said he. \"You've pulled us all out of the jaws of death. My word! it was a good bit of work!\"",
twentymiles: "\"A good twenty miles,\" said I.",
handsome: "\"The king of the ape-men was really a creature of great distinction--a most remarkably handsome and intelligent personality. Did it not strike you?\"",
remarkable: "\"A most remarkable creature,\" said I.",
accala: "... as they pointed to each other and uttered the word \"Accala\" many times over, we gathered that this was the name of the nation.",
doda: "\"Doda! Doda!\" which was surely their term for their enemies.",
maretas: "Then, placing his hand upon his breast and holding himself with great dignity, he uttered the word \"Maretas\" several times.",
surrey: "No three tramps that one could have met in a Surrey lane could have looked more hopeless and bedraggled.",
flotilla: "Sweeping over the glassy surface was a great flotilla of canoes coming straight for the shore upon which we stood.",
embraced: "... ran forward and embraced most tenderly the youth whom we had saved.",
harangue: "\"These strange men are our friends. They are great fighters, and they hate the ape-men even as we do.",
owners: "... these great creatures were as much private property as a herd of cattle, and that these symbols which had so perplexed us were nothing more than the marks of the owner.",
hydrogen: "\"An inflammable gas, and one markedly lighter than the atmosphere. I should say beyond doubt that it contained a considerable proportion of free hydrogen.",
plesio: "\"Plesiosaurus! A fresh-water plesiosaurus!\" cried Summerlee. \"That I should have lived to see such a sight!",
zambocame: "Once more also we were able to communicate with Zambo, who had been terrified by the spectacle from afar",
sanity: "\"It is the voice of sanity!\" said Summerlee with conviction.",
earthquake: "Only the year before, however, there had been a terrific earthquake, and the upper end of the tunnel had fallen in and completely disappeared.",
stairs: "The openings were about eighty feet above the ground, and were led up to by long stone stairs, so narrow and steep that no large animal could mount them.",
pictures: "... with smooth gray walls decorated with many excellent pictures done with charred sticks and representing the various animals of the plateau.",
stoa: "Suddenly there was a shrill cry of alarm, with the word \"Stoa\" resounding from a hundred tongues.",
rainbow: "... their blotched and warty skins were of a curious fish-like iridescence, and the sunlight struck them with an ever-varying rainbow bloom as they moved.",
ichthyo: "... a young ichthyosaurus--a strange creature, half seal, half fish, to look at, with bone-covered eyes on each side of his snout, and a third eye fixed upon the top of his head",
phosph: "I will tell, too, of the great nocturnal white thing--to this day we do not know whether it was beast or reptile--which lived in a vile swamp to the east of the lake, and flitted about with a faint phosphorescent glimmer in the darkness.",
phororachus: "... a great running bird, far taller than an ostrich, with a vulture-like neck and cruel head which made it a walking death.",
heel: "As Challenger climbed to safety one dart of that savage curving beak shore off the heel of his boot as if it had been cut with a chisel.",
toxodon: "... the toxodon, the giant ten-foot guinea pig, with projecting chisel teeth, which we killed as it drank in the gray of the morning by the side of the lake.",
evenings: "... these lovely summer evenings, when with the deep blue sky above us we lay in good comradeship among the long grasses by the wood and marveled at the strange fowl that swept over us",
refusal: "... we were met by a good-humored, but an invincible, refusal.",
cage: "It was a man who walked inside a framework made of bent canes so that he was enclosed on all sides in a bell-shaped cage.",
devilchick: "\"No offense, young fellah. I'm goin' to get a young devil chick for Challenger. That's one of my jobs.",
palmbranch: "... he always carried a large spreading palm branch with which he beat them off as if they were flies",
gasbag: "In half an hour a good-sized gas-bag had been formed, and the jerking and straining upon the thongs showed that it was capable of considerable lift.",
midsummer: "\"Midsummer madness!\" snorted Summerlee.",
sausages: "For a moment I had a vision of four adventurers floating like a string of sausages over the land that they had explored.",
splendid: "\"Splendid!\" cried the undaunted Challenger, rubbing his injured arm. \"A most thorough and satisfactory demonstration!",
barkroll: "... handed me (for some reason he had always shown his attentions to me, perhaps because I was the one who was nearest his age) a small roll of the bark of a tree",
eighteen: "How many marks are on that paper? Eighteen. Well, if you come to think of it there are eighteen cave openings on the hill-side above us.",
cross: "It's a map, and here's a cross on it. What's the cross for? It is placed to mark one that is much deeper than the others.",
araucaria: "There is a dry bituminous wood upon the plateau--a species of araucaria, according to our botanist--which is always used by the Indians for torches.",
culdesac: "It was, and had always been, a cul-de-sac.",
seventeen: "\"Seventeen from the right and second from the left. This is the cave sure enough.\"",
forked: "\"Well, it is marked as a forked cave, and in the darkness we passed the fork before the torches were lit.",
moonbg: "\"The moon, by George!\" cried Lord John. \"We are through, boys! We are through!\"",
ourland: "... to each of us a dreamland of glamour and romance, a land where we had dared much, suffered much, and learned much--OUR land, as we shall ever fondly call it.",
whickering: "Even as we looked a high whickering cry, the call of some weird animal, rang clear out of the darkness. It was the very voice of Maple White Land bidding us good-bye.",
rescueparty: "The rescue party had arrived.",
greatwonders: "Our eyes have seen great wonders and our souls are chastened by what we have endured. Each is in his own way a better and deeper man."
};
function lswLite() { return typeof LITE !== "undefined" && !!LITE; }
function lswPhotoTex(name, mpt, nrm) { return __ZC(469, 0, this, arguments, new.target); }
function lswS(name, col, mpt, o) { return __ZC(469, 1, this, arguments, new.target); }
function lswCanvas(key, w, h, fn) { if (LSW.tex[key])
return LSW.tex[key]; var t = wTex(w, h, fn); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (LSW.tex[key] = t); }
function lswM(key, make) { return LSW.mats[key] || (LSW.mats[key] = make()); }
function lswLam(col, o) { return __ZC(469, 2, this, arguments, new.target); }
function lswShine(col, r, mt) { return lswM("m" + col + ":" + r + ":" + mt, function () { var m = new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: mt }); m.userData.noPhoto = 1; return m; }); }
function lswGlowM(col, op) { return lswM("g" + col + "|" + op, function () { var m = new THREE.MeshBasicMaterial({ color: col }); if (op !== undefined) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
} m.userData.noPhoto = 1; return m; }); }
function lswNoise(x, W, H, n, a, seed, col) { var R = wRand(seed || 3); for (var i = 0; i < n; i++) {
x.fillStyle = "rgba(" + (col || "40,30,20") + "," + (a * R()) + ")";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 3);
} }
function lswMat(k) { return __ZC(469, 3, this, arguments, new.target); }
function lswLeafTex() { return lswPhotoTexAlpha(); }
function lswPhotoTexAlpha() { var k = "leafpng"; if (LSW.tex[k])
return LSW.tex[k]; var t = new THREE.TextureLoader().load("assets/textures/photo/leaves.png"); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return (LSW.tex[k] = t); }
function lswFrondTex(kind) { return __ZC(469, 4, this, arguments, new.target); }
function lswBambooTex() { return __ZC(469, 5, this, arguments, new.target); }
function lswReedTex(kind) { return __ZC(469, 6, this, arguments, new.target); }
function lswGrassTex() { return __ZC(469, 7, this, arguments, new.target); }
function lswFlowerTex(col) { return __ZC(469, 8, this, arguments, new.target); }
function lswSkinTex(kind) { return __ZC(469, 9, this, arguments, new.target); }
function lswRippleTex() { return __ZC(469, 10, this, arguments, new.target); }
function lswWaterM(col, op) { return lswM("water" + col + "|" + op, function () { var t = lswRippleTex(); var m = new THREE.MeshPhongMaterial({ color: col, map: t, shininess: 90, specular: 0x6A7A80, transparent: true, opacity: op || 0.86, depthWrite: false }); m.userData.noPhoto = 1; return m; }); }
var LSW_CELL = 48;
function lswKeys(x0, z0, x1, z1) { var out = [], a = Math.floor(x0 / LSW_CELL), b = Math.floor(x1 / LSW_CELL), c = Math.floor(z0 / LSW_CELL), d = Math.floor(z1 / LSW_CELL); for (var i = a; i <= b; i++)
for (var j = c; j <= d; j++)
out.push(i + "," + j); return out; }
function lswGridAdd(S) { var g = LSW.sgrid || (LSW.sgrid = {}), R = S.r !== undefined ? S.r : Math.max(S.hw, S.hd) * 1.42; lswKeys(S.x - R, S.z - R, S.x + R, S.z + R).forEach(function (k) { (g[k] || (g[k] = [])).push(S); }); }
function lswSolid(x, z, w, d, y0, y1, rot) { var S = { x: x, z: z, hw: w / 2, hd: d / 2, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; LSW.solids.push(S); lswGridAdd(S); return S; }
function lswRound(x, z, r, y0, y1) { var S = { x: x, z: z, r: r, y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 400 : y1 }; LSW.solids.push(S); lswGridAdd(S); return S; }
function lswSolidAt(x, z, feet) { return __ZC(469, 11, this, arguments, new.target); }
function lswFloor(x, z, w, d, y, o) { o = o || {}; var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, c: Math.cos(o.rot || 0), s: Math.sin(o.rot || 0), r: o.r, deck: o.deck }; LSW.floors.push(F); return F; }
function lswRamp(x, z, w, d, y0, y1, rot) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y0, y1: y1, ramp: true, c: Math.cos(rot || 0), s: Math.sin(rot || 0) }; LSW.floors.push(F); return F; }
function lswFloorIn(F, x, z) { var dx = x - F.x, dz = z - F.z; if (F.r !== undefined)
return dx * dx + dz * dz <= F.r * F.r; var lx = dx * F.c - dz * F.s, lz = dx * F.s + dz * F.c; return Math.abs(lx) <= F.hw && Math.abs(lz) <= F.hd; }
function lswFloorY(F, x, z) { if (!F.ramp)
return F.y; var dx = x - F.x, dz = z - F.z, lz = dx * F.s + dz * F.c, t = (lz + F.hd) / (2 * F.hd); return F.y + (F.y1 - F.y) * Math.max(0, Math.min(1, t)); }
function lswFloorAt(x, z, feet) { var best = null; for (var i = 0; i < LSW.floors.length; i++) {
var F = LSW.floors[i];
if (F.off || !lswFloorIn(F, x, z))
continue;
var y = lswFloorY(F, x, z);
if (y <= feet + 1.1 && (best === null || y > best))
best = y;
} return best; }
function lswSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; LSW.spots.push(S); return S; }
function lswTale(title, qs, notes, src) {
var b = worldFacts(title, "", [], notes || []);
if (qs && qs.length)
b += qs.map(function (k) { return "<p style='margin:6px 0'>" + lsQ(k) + "</p>"; }).join("") + lsSrc(src || "");
worldCard(b, {});
if (typeof lsbNote === "function")
lsbNote("tale", title);
}
function lsQ(k) { var s = LSW_Q[k] || k; return "<i style='font-family:Georgia'>" + esc(s) + "</i>"; }
function lsQs() { return Array.prototype.slice.call(arguments).map(function (k) { return "<p>" + lsQ(k) + "</p>"; }).join(""); }
function lsSrc(ch) { return ch ? "<div style='font-size:11px;opacity:.65;margin-top:4px'>Arthur Conan Doyle, The Lost World (1912)" + (ch ? ", chapter " + ch : "") + "</div>" : ""; }
function lswPerson(seed, x, z, y, o, ry) { return __ZC(469, 12, this, arguments, new.target); }
function lswTalk(P, name, persona, greet, r, fn) { LSW.talk.push({ p: P, r: r || 3.2, name: name, fn: fn || null, t: { name: name, persona: persona + LSW_ERA, greet: greet } }); return P; }
function lswTerrain(P, x0, z0, w, d, step, hfn, mat, cfn) { return __ZC(469, 13, this, arguments, new.target); }
function lswHash(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
function lswNoise2(x, z) {
var ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
var a = lswHash(ix, iz), b = lswHash(ix + 1, iz), c = lswHash(ix, iz + 1), d = lswHash(ix + 1, iz + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function lswFbm(x, z, o) { var s = 0, a = 1, f = 1, t = 0; for (var i = 0; i < (o || 4); i++) {
s += a * lswNoise2(x * f, z * f);
t += a;
a *= 0.5;
f *= 2.03;
} return s / t; }
function lswSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function lswWater(P, x, z, w, d, y, col, op) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d, 1, 1), lswWaterM(col || 0x3A5A4A, op)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.renderOrder = 2; P.add(m); LSW.water.push(m); return m; }
var LSW_GEO = {};
function lswGeo(k, make) { if (LSW_GEO[k])
return LSW_GEO[k]; var g = make(); g.userData.shared = 1; return (LSW_GEO[k] = g); }
function lswCards(n, w, h, y0, tilt) { var parts = []; for (var i = 0; i < n; i++) {
var p = new THREE.PlaneGeometry(w, h);
p.translate(0, h / 2, 0);
if (tilt)
p.rotateX(-tilt);
p.rotateY(i / n * Math.PI);
p.translate(0, y0 || 0, 0);
parts.push(p.index ? p.toNonIndexed() : p);
} return gwMerge(parts); }
function lswFronds(n, len, wid, droop, y0, ring) { return __ZC(469, 14, this, arguments, new.target); }
function lswInst(P, geo, mat, list, o) { return __ZC(469, 15, this, arguments, new.target); }
function lswScatter(seed, n, x0, z0, x1, z1, ok, hfn, smin, smax) { var R = wRand(seed), out = [], tries = 0; while (out.length < n && tries < n * 8) {
tries++;
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (ok && !ok(x, z))
continue;
var s = (smin || 1) + R() * ((smax || 1) - (smin || 1));
out.push({ x: x, z: z, y: hfn ? hfn(x, z) : 0, s: s, ry: R() * 6.283 });
} return out; }
function lswPlant(P, kind, list, o) { return __ZC(469, 16, this, arguments, new.target); }
function lswPathD(x, z, pts) { return __ZC(469, 17, this, arguments, new.target); }
function lswStrip(P, pts, w, hfn, mat, lift) { return __ZC(469, 18, this, arguments, new.target); }
function lswTaper(pts, rads, seg, rs, flat) { return __ZC(469, 19, this, arguments, new.target); }
function lswEll(P, mat, rx, ry, rz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 14, Math.max(6, (seg || 14) * 0.6 | 0)), mat); m.scale.set(rx, ry, rz); m.position.set(x || 0, y || 0, z || 0); P.add(m); return m; }
function lswPiv(P, x, y, z) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); P.add(g); return g; }
function lswSkinM(kind, col) { return __ZC(469, 20, this, arguments, new.target); }
function lswEye(P, x, y, z, r, col) { var e = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), lswShine(col || 0x1A1208, 0.2, 0.1)); e.position.set(x, y, z); P.add(e); return e; }
function lswLeg(P, mat, x, y, z, len, thick, o) { return __ZC(469, 21, this, arguments, new.target); }
function lswIguanodon(s) { return __ZC(469, 22, this, arguments, new.target); }
function lswPtero(span) { return __ZC(469, 23, this, arguments, new.target); }
function lswPteroPose(g, t, mode) { return __ZC(469, 24, this, arguments, new.target); }
function lswToadBeast(s) { return __ZC(469, 25, this, arguments, new.target); }
function lswStego(s) { return __ZC(469, 26, this, arguments, new.target); }
function lswPlesio(s) { return __ZC(469, 27, this, arguments, new.target); }
function lswElk(s, doe) { return __ZC(469, 28, this, arguments, new.target); }
function lswArmadillo(s) { return __ZC(469, 29, this, arguments, new.target); }
function lswTerrorBird(s) { return __ZC(469, 30, this, arguments, new.target); }
function lswCayman(s) { return __ZC(469, 31, this, arguments, new.target); }
function lswTapir(s) { return __ZC(469, 32, this, arguments, new.target); }
function lswPuma(s) { return __ZC(469, 33, this, arguments, new.target); }
function lswMonkey() { return __ZC(469, 34, this, arguments, new.target); }
function lswWader(col) { return __ZC(469, 35, this, arguments, new.target); }
function lswButterflies(P, n, x, z, y, r, col) { return __ZC(469, 36, this, arguments, new.target); }
function lswSnake(len, col) { var g = new THREE.Group(), pts = []; for (var i = 0; i <= 10; i++)
pts.push([Math.sin(i * 0.9) * 0.35, 0.08, i / 10 * len]); g.add(new THREE.Mesh(lswTaper(pts, [0.06, 0.1, 0.09, 0.05, 0.01], 24, 6), lswSkinM("plesio", col || 0x7A8A5A))); g.userData.kind = "snake"; return g; }
function lswBeastAdd(g, kind, o) { var Bt = { g: g, kind: kind, t: Math.random() * 10, o: o || {}, mode: (o && o.mode) || "idle" }; LSW.beasts.push(Bt); (o && o.parent || LSW.scG).add(g); return Bt; }
function lswBeastsTick(dt, L) { return __ZC(469, 37, this, arguments, new.target); }
(function () {
if (typeof DLN_WEAR === "undefined")
return;
Object.assign(DLN_WEAR, {
lsgec: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:collar:low:soft", "oz:vest:cloth:chain", "oz:coat:jacket:cloth", "oz:breeches:cloth", "oz:boots"],
col: { shirt: 0xE8E0CC, collar: 0xE8E0CC, tie: 0x2A2A2A, vest: 0x4A4436, coat: 0x5A5444, trou: 0x6A6250 }, shoes: 0x3A2414 };
},
lssumm: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:coat:jacket:cloth", "oz:breeches:cloth", "oz:boots"],
col: { shirt: 0xF0EADC, collar: 0xF0EADC, tie: 0x3A3A2A, vest: 0x6A6248, coat: 0x7A6E52, trou: 0x7A6E52 }, shoes: 0x4A2E18 };
},
lsjohn: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:collar:low:soft", "oz:vest:cloth:chain", "oz:breeches:cloth", "oz:boots"],
col: { shirt: 0xC8B898, collar: 0xC8B898, tie: 0x6A2A1A, vest: 0x3A3A2E, trou: 0x8A7A58 }, shoes: 0x2A1A10 };
},
lsmalone: function (o) {
return { ids: ["oz:shirt:long:cloth", "oz:collar:low:soft", "oz:breeches:cloth", "oz:boots"],
col: { shirt: 0xE0D6C0, collar: 0xE0D6C0, tie: 0x1A3A5A, trou: 0x7A6A4A }, shoes: 0x3A2414 };
},
lszambo: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xF0E8D4, collar: 0xF0E8D4, tie: 0xA83A1A, trou: 0x3A4A6A }, shoes: 0x2A1A10 };
},
lsriver: function (o) {
var c = [0xD8C8A0, 0xC8D0D8, 0xE8DCC0, 0xB8A888][Math.floor(o.r * 4) % 4];
return { ids: [o.r < 0.5 ? "oz:shirt:long:stripe" : "oz:shirt:long:check", "oz:trousers:cloth", "oz:boots"],
col: { shirt: c, trou: [0x4A4038, 0x3A3A44, 0x5A5040][Math.floor(o.r * 3) % 3] }, shoes: 0x2A1A10 };
},
lsmojo: function (o) { return { ids: ["oz:shirt:long:cloth", "oz:breeches:cloth"], col: { shirt: [0xE8DCC4, 0xD8C8A8, 0xC8B898][Math.floor(o.r * 3) % 3], trou: 0x6A5A44 }, shoes: 0x6A4A30 }; },
lsplanter: function (o) {
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth", "oz:coat:jacket:cloth", "oz:trousers:cloth", "oz:boots"],
col: { shirt: 0xFAF8F2, collar: 0xFAF8F2, tie: 0x2A2A3A, vest: 0xF0ECE0, coat: 0xF4F0E4, trou: 0xF0ECE0 }, shoes: 0xE8E0D0 };
},
lsdocker: function (o) { return { ids: ["oz:shirt:long", "oz:trousers:cloth", "oz:boots"], col: { shirt: [0xF0EADC, 0xD8D0B8, 0xC8B8A0][Math.floor(o.r * 3) % 3], trou: [0x3A3A44, 0x5A5040][Math.floor(o.r * 2) % 2] }, shoes: 0x2A1A10 }; },
lslady: function (o) {
return { ids: ["oz:bodice:long:cloth", "oz:skirt:ankle:0.16:cloth", "oz:collar:high:none"],
col: { dress: [0xF4F0E8, 0xE8D8E8, 0xD8E4F0, 0xF0E0C8][Math.floor(o.r * 4) % 4], skirt: [0xF4F0E8, 0xE8D8E8, 0xD8E4F0, 0xF0E0C8][Math.floor(o.r * 4) % 4], trim: 0xC8A048, collar: 0xFAF6F0 }, shoes: 0x2A1E16 };
},
lsacc: function (o) { return { ids: ["oz:shirt:long:leather", "oz:breeches:cloth"], col: { shirt: [0xA87A4A, 0x9A6A3A, 0xB88A5A][Math.floor(o.r * 3) % 3], trou: 0x8A6A3A }, shoes: 0x6A4A2A }; },
lsape: function (o) { return { ids: ["oz:shirt:long:fur", "oz:breeches:cloth"], col: { shirt: 0x8A3A1A, trou: 0x7A3216 }, shoes: 0x3A2010 }; }
});
if (typeof DLN_HAT !== "undefined")
Object.assign(DLN_HAT, {
slouch: function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x6A5A40, { r: 1 });
g.add(new THREE.Mesh(wfGeo("lsslb", function () { return new THREE.CylinderGeometry(0.27, 0.27, 0.012, 22); }), mt));
var cr = new THREE.Mesh(wfGeo("lsslc", function () { return new THREE.CylinderGeometry(0.115, 0.135, 0.12, 16); }), mt);
cr.position.y = 0.06;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("lsslbd", function () { return new THREE.CylinderGeometry(0.137, 0.137, 0.03, 16, 1, true); }), wfMat(0x2A1E14));
bd.position.y = 0.02;
g.add(bd);
add("Head", [0, 0.13, -0.01], g);
},
panama: function (add) {
var g = new THREE.Group(), mt = wfMat(0xE8DCB0, { r: 1 });
g.add(new THREE.Mesh(wfGeo("lspab", function () { return new THREE.CylinderGeometry(0.22, 0.22, 0.01, 22); }), mt));
var cr = new THREE.Mesh(wfGeo("lspac", function () { return new THREE.CylinderGeometry(0.11, 0.125, 0.1, 16); }), mt);
cr.position.y = 0.05;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("lspabd", function () { return new THREE.CylinderGeometry(0.127, 0.127, 0.025, 16, 1, true); }), wfMat(0x1A1A1A));
bd.position.y = 0.02;
g.add(bd);
add("Head", [0, 0.13, -0.01], g);
},
feathers: function (add) {
var g = new THREE.Group();
for (var i = 0; i < 7; i++) {
var f = new THREE.Mesh(wfGeo("lsfth", function () { var s = new THREE.SphereGeometry(0.04, 6, 5); s.scale(0.35, 1.8, 0.12); return s; }), wfMat([0xD83A1A, 0xF0C020, 0x2A8A3A][i % 3]));
var a = -1.0 + i * 0.33;
f.position.set(Math.sin(a) * 0.12, 0.12, Math.cos(a) * -0.12);
f.rotation.x = -0.3;
g.add(f);
}
add("Head", [0, 0.04, 0], g);
}
});
if (typeof DLN_HELDF !== "undefined")
Object.assign(DLN_HELDF, {
rifle: function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("lsrfb", function () { return new THREE.CylinderGeometry(0.009, 0.011, 0.72, 6); }), wfMat(0x1E1E22, { m: 0.7, r: 0.4 })));
var st = new THREE.Mesh(wfGeo("lsrfs", function () { return new THREE.BoxGeometry(0.04, 0.42, 0.07); }), wfMat(0x5A3A1E));
st.position.y = -0.5;
g.add(st);
g.rotation.x = 0.25;
add("hand_r", [0, 0.1, 0.04], g);
},
spear: function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("lsspr", function () { return new THREE.CylinderGeometry(0.012, 0.014, 2.0, 6); }), wfMat(0xC8B070)));
var tip = new THREE.Mesh(wfGeo("lssprt", function () { return new THREE.ConeGeometry(0.02, 0.16, 5); }), wfMat(0xF0E8D0));
tip.position.y = 1.06;
g.add(tip);
add("hand_r", [0, 0.3, 0.02], g);
},
club: function (add) { var c = new THREE.Mesh(wfGeo("lsclub", function () { var g = new THREE.CylinderGeometry(0.06, 0.025, 0.8, 7); g.translate(0, 0.25, 0); return g; }), wfMat(0x4A3420)); c.rotation.x = -0.3; add("hand_r", [0, -0.1, 0.05], c); },
paddle: function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("lspdl", function () { return new THREE.CylinderGeometry(0.014, 0.014, 1.4, 6); }), wfMat(0x8A6A40)));
var bl = new THREE.Mesh(wfGeo("lspdb", function () { return new THREE.BoxGeometry(0.16, 0.4, 0.02); }), wfMat(0x8A6A40));
bl.position.y = -0.85;
g.add(bl);
add("hand_r", [0, 0.1, 0.04], g);
},
machete: function (add) { var b = new THREE.Mesh(wfGeo("lsmch", function () { return new THREE.BoxGeometry(0.05, 0.5, 0.008); }), wfMat(0xC8C8D0, { m: 0.8, r: 0.3 })); b.position.y = -0.3; add("hand_r", [0, 0, 0.05], b); }
});
if (typeof DLN_HATS !== "undefined")
Object.assign(DLN_HATS, { lsgec: ["panama"], lssumm: ["slouch"], lsjohn: ["slouch"], lsmalone: ["slouch"], lszambo: [null], lsriver: [null, "slouch", "panama"], lsmojo: [null],
lsplanter: ["panama"], lsdocker: [null, "flatcap", "panama"], lslady: ["ladyhat"], lsacc: [null, null, "feathers"], lsape: [null] });
if (typeof DLN_HELD !== "undefined")
Object.assign(DLN_HELD, { lsgec: [null], lssumm: [null], lsjohn: ["rifle"], lsmalone: [null], lszambo: [null], lsriver: [null, "machete"], lsmojo: ["paddle", null],
lsplanter: ["stick", null], lsdocker: [null], lslady: ["parasol"], lsacc: ["spear", "spear", null], lsape: ["club", null] });
})();
function lswDressed(seed, dress, o) { return __ZC(469, 38, this, arguments, new.target); }
var LSW_FOLK = {
gec: { name: "Professor Challenger", dress: "lsgec", sex: "m", beard: "full", hair: 0x141414, skin: 0xF1D5C0, scale: [1.18, 0.9, 1.18], persona: "gec", greet: "Well, young man? Speak up. What have you found?" },
summ: { name: "Professor Summerlee", dress: "lssumm", sex: "m", beard: "short", hair: 0xD8D4CC, skin: 0xF1D5C0, scale: [0.96, 1.04, 0.96], persona: "summ", greet: "Hm. Malone. I trust you have not come to tell me Challenger is right again." },
john: { name: "Lord John Roxton", dress: "lsjohn", sex: "m", beard: "short", hair: 0x9A3A1A, skin: 0xE6BD9C, persona: "john", greet: "Hallo, young fellah. Keep your rifle handy, what?" },
zambo: { name: "Zambo", dress: "lszambo", sex: "m", hair: 0x141414, skin: 0x48291B, scale: [1.12, 1.08, 1.12], persona: "zambo", greet: "Good day, Mr. Malone. I am here. I stay as long as you need me." },
gomez: { name: "Gomez", dress: "lsriver", sex: "m", beard: "full", hair: 0x1A1410, skin: 0xB07A52, persona: "gomez", greet: "Good day, señor. A fine day for the river." },
manuel: { name: "Manuel", dress: "lsriver", sex: "m", beard: "mustache", hair: 0x1A1410, skin: 0xA66C48, persona: "manuel", greet: "Señor." },
mojo: { name: "Mojo, the boatman", dress: "lsmojo", sex: "m", hair: 0x0E0E0E, skin: 0x93603E, persona: "mojo", greet: "(He nods, and smiles, and goes on with the canoe.)" },
jose: { name: "José, the boatman", dress: "lsmojo", sex: "m", hair: 0x0E0E0E, skin: 0x875335, persona: "mojo", greet: "(He smiles.)" },
fern: { name: "Fernando, the boatman", dress: "lsmojo", sex: "m", hair: 0x0E0E0E, skin: 0x93603E, persona: "mojo", greet: "(He smiles, and lifts his paddle.)" }
};
function lswPersona(k) { return { gec: LSW_GEC, summ: LSW_SUMM, john: LSW_JOHN, zambo: LSW_ZAMBO, gomez: LSW_GOMEZ, manuel: LSW_MANUEL, mojo: LSW_MOJO, acc: LSW_ACC, maretas: LSW_MARETAS }[k] || k || ""; }
function lswFolk(key, x, z, ry, o) { return __ZC(469, 39, this, arguments, new.target); }
function lswCrowd(seed, n, x0, z0, x1, z1, dress, names, persona, greets, o) { return __ZC(469, 40, this, arguments, new.target); }
function lswBoxG(w, h, d) { return __ZC(469, 41, this, arguments, new.target); }
function lswBox(P, w, h, d, mat, x, y, z, ry, solid) {
var m = new THREE.Mesh(lswBoxG(w, h, d), mat);
m.position.set(x, y + h / 2, z);
if (ry)
m.rotation.y = ry;
m.castShadow = !lswLite() && h > 1.2;
m.receiveShadow = true;
P.add(m);
if (solid)
lswSolid(x, z, w, d, y - 0.2, y + h, ry || 0);
return m;
}
function lswCyl(P, r0, r1, h, mat, x, y, z, seg) { var m = new THREE.Mesh(lswGeo("cy" + r0 + "|" + r1 + "|" + h + "|" + (seg || 10), function () { return new THREE.CylinderGeometry(r0, r1, h, seg || 10); }), mat); m.position.set(x, y + h / 2, z); P.add(m); return m; }
function lswSign(P, text, w, h, x, y, z, ry, o) { return __ZC(469, 42, this, arguments, new.target); }
function lswHouse(P, x, z, w, d, h, o) { return __ZC(469, 43, this, arguments, new.target); }
function lswLand(x, z) { return LSW.hgt ? LSW.hgt(x, z) : 0; }
function lswGround(x, z, feet) { var f = lswFloorAt(x, z, feet === undefined ? 1e4 : feet), h = lswLand(x, z); return f === null ? h : Math.max(f, h); }
var LSW_SCN = {};
function lswSc() { return LSW_SC[LSW.sc] || LSW_SC.maple; }
function lswSceneDrop() { return __ZC(469, 44, this, arguments, new.target); }
function lswScene(k) { return __ZC(469, 45, this, arguments, new.target); }
function lswVeil() { if (LSW.veil)
return LSW.veil; var v = document.createElement("div"); v.style.cssText = "position:fixed;inset:0;background:#0A0A08;opacity:0;pointer-events:none;transition:opacity .5s;z-index:43"; document.body.appendChild(v); LSW.veil = v; return v; }
function lswAtPt(at) { if (typeof at === "string")
at = LSW_AT[at]; if (!at)
return null; return { sc: at.sc, x: at.x, z: at.z, y: at.y, ry: at.ry, name: at.name }; }
function lswGo(at, msg, after) { return __ZC(469, 46, this, arguments, new.target); }
var LSW_ENV = {
day: { top: 0x5A8AD0, low: 0xD8E4E8, fog: 0xC8D8D8, fogD: 0.0011, sun: 1.05, sunCol: 0xFFF2D8, sunDir: [0.35, 0.85, 0.25], hemi: 0.75, hemiCol: 0xD8E8F0, hemiGround: 0x4A5A30 },
river: { top: 0x6A9AD8, low: 0xE0E8E4, fog: 0xD0DCD4, fogD: 0.0016, sun: 1.1, sunCol: 0xFFF0D0, sunDir: [0.5, 0.8, 0.1], hemi: 0.75, hemiCol: 0xE0ECF0, hemiGround: 0x3A5A3A },
forest: { top: 0x4A7A5A, low: 0x9AB098, fog: 0x7A9480, fogD: 0.0045, sun: 0.7, sunCol: 0xE8F0C0, sunDir: [0.2, 0.95, 0.1], hemi: 0.6, hemiCol: 0xA8C8A0, hemiGround: 0x2A3A1E },
tunnel: { top: 0x8AB060, low: 0xB8D088, fog: 0x9AB870, fogD: 0.0055, sun: 0.65, sunCol: 0xF0FFB0, sunDir: [0.1, 0.95, 0.2], hemi: 0.75, hemiCol: 0xC8E8A0, hemiGround: 0x3A4A1E },
plateau: { top: 0x5A88C8, low: 0xE0E0D0, fog: 0xD0D4C4, fogD: 0.0009, sun: 1.05, sunCol: 0xFFEED0, sunDir: [0.4, 0.8, 0.3], hemi: 0.72, hemiCol: 0xD8E4E8, hemiGround: 0x4A4A2A },
night: { top: 0x0A1020, low: 0x1A2230, fog: 0x141C28, fogD: 0.0035, sun: 0.28, sunCol: 0xB8C8F0, sunDir: [-0.3, 0.7, -0.4], hemi: 0.32, hemiCol: 0x6A7AA8, hemiGround: 0x101418, stars: 0.9 },
cave: { top: 0x0A0806, low: 0x141210, fog: 0x0E0C0A, fogD: 0.02, sun: 0.08, sunCol: 0xFFC890, sunDir: [0, 1, 0], hemi: 0.22, hemiCol: 0x8A7A6A, hemiGround: 0x1A1410 }
};
function lswEnvNow() { var S = lswSc(), k = LSW.night ? "night" : S.env; if (LSW.sc === "maple" && !LSW.night)
k = (LSW.inCave ? "cave" : "plateau"); if (LSW.inCave && LSW.sc === "maple")
k = "cave"; var E = {}, B = LSW_ENV[k] || LSW_ENV.day; for (var q in B)
E[q] = B[q]; if (lswLite() && E.fogD)
E.fogD *= 1.4; return E; }
function lswLaunch() { return __ZC(469, 47, this, arguments, new.target); }
function lswSmoke(P, x, y, z, col, n) { return __ZC(469, 48, this, arguments, new.target); }
function lswFire(P, x, y, z, s) { return __ZC(469, 49, this, arguments, new.target); }
function lswTent(P, x, y, z, ry, col) { return __ZC(469, 50, this, arguments, new.target); }
function lswCanoe(P, x, y, z, ry, o) { return __ZC(469, 51, this, arguments, new.target); }
function lswThatchM() { return __ZC(469, 52, this, arguments, new.target); }
function lswHut(P, x, z, w, d, ry, o) { return __ZC(469, 53, this, arguments, new.target); }
function lswQuay(P, x0, x1, z, top, mat) { var w = x1 - x0; lswBox(P, w, top + 3, 2.2, mat || lswMat("granite"), (x0 + x1) / 2, -3, z); for (var x = x0 + 2; x < x1; x += 7)
lswCyl(P, 0.22, 0.28, 0.7, lswShine(0x1A1A1A, 0.6, 0.4), x, top, z - 0.6, 10); }
LSW_SCN.manaos = {
h: function (x, z) { if (z < -50)
return -3; var t = lswSmooth(-50, -47, z); return -3 + t * 4.5 + Math.max(0, z + 47) * 0.018 + lswFbm(x * 0.02, z * 0.02, 2) * 0.3 * t; },
build: function (P) { return __ZC(469, 54, this, arguments, new.target); },
start: { x: 0, z: -40, ry: Math.PI }
};
function lswOpera(P, x, z) { return __ZC(469, 55, this, arguments, new.target); }
function lswFazenda(P, x, z) { return __ZC(469, 56, this, arguments, new.target); }
LSW_SCN.river = {
h: function (x, z) { return -3; },
build: function (P) { return __ZC(469, 57, this, arguments, new.target); },
start: { x: 0, z: 4, ry: Math.PI }
};
LSW_SCN.village = {
h: function (x, z) { if (z < -64)
return -2.5; var t = lswSmooth(-64, -56, z); return -2.5 + t * 3.2 + lswFbm(x * 0.03, z * 0.03, 3) * 0.8 * t + Math.max(0, z - 120) * 0.04; },
build: function (P) { return __ZC(469, 58, this, arguments, new.target); },
start: { x: 0, z: -62, ry: 0 }
};
function lswFolkV(P) { return __ZC(469, 59, this, arguments, new.target); }
function lswDrums(on) { return __ZC(469, 60, this, arguments, new.target); }
function lswFrRiverX(z) { return 60 + Math.sin(z * 0.006) * 18; }
function lswFrWater(z) { return -1 + 7 * lswSmooth(150, -150, z); }
LSW_SCN.forest = {
h: function (x, z) { var base = lswFrWater(z) + 1, d = Math.abs(x - lswFrRiverX(z)); var bank = d < 14 ? -2.6 : -2.6 + lswSmooth(14, 26, d) * 2.8; return base + bank + lswFbm(x * 0.03, z * 0.03, 3) * 1.6 * lswSmooth(20, 40, d) + Math.max(0, d - 120) * 0.02; },
build: function (P) { return __ZC(469, 61, this, arguments, new.target); },
start: { x: 40, z: 300, ry: -Math.PI / 2 }
};
var LSW_FR_PATH = [[34, 300], [0, 240], [-40, 170], [-60, 100], [-62, 30], [-50, -60], [-30, -150], [0, -240], [34, -300]];
var LSW_CH_PATH = [[0, 470], [-10, 420], [0, 330], [4, 240], [-6, 150], [2, 60], [10, -40], [-4, -140], [6, -240], [-2, -340], [0, -430]];
function lswChX(z) { var P = LSW_CH_PATH; for (var i = 1; i < P.length; i++) {
if (z <= P[i - 1][1] && z >= P[i][1]) {
var t = (P[i - 1][1] - z) / (P[i - 1][1] - P[i][1]);
return P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t;
}
} return 0; }
LSW_SCN.channel = {
h: function (x, z) {
var d = z > 440 ? 0 : Math.abs(x - lswChX(z));
if (z > 430)
return -3 + lswSmooth(500, 560, z) * 4 + Math.max(0, Math.abs(x) - 800) * 0.01;
var w = z < -400 ? 3 : 6;
return (d < w ? -2.4 : -2.4 + lswSmooth(w, w + 8, d) * 3.4) + lswFbm(x * 0.04, z * 0.04, 3) * 1.2 * lswSmooth(w + 4, w + 20, d) + Math.max(0, -z - 420) * 0.08;
},
build: function (P) { return __ZC(469, 62, this, arguments, new.target); },
start: { x: -44, z: 410, ry: Math.PI }
};
function lswRideStart(o) {
o = o || {};
var c = LSW.chCanoe;
if (!c)
return;
LSW.ride = { c: c, d: o.d || 0, sp: o.sp || (window.SBK_FAST ? 60 : 3.4), stop: o.stop || [], done: o.done || null, hold: 0 };
var V = lswVeil();
V.style.opacity = "1";
setTimeout(function () { V.style.opacity = "0"; }, 300);
}
function lswRideTick(dt) { return __ZC(469, 63, this, arguments, new.target); }
function lswUpRise(z) { return Math.max(0, (640 - z)) * 0.045 + 8 * Math.exp(-Math.pow((z + 480) / 40, 2)) + 11 * Math.exp(-Math.pow((z + 680) / 45, 2)); }
LSW_SCN.uplands = {
h: function (x, z) { var y = lswUpRise(z) + lswFbm(x * 0.02, z * 0.02, 3) * 3; var bd = Math.hypot(x - 60, z - 260); if (bd < 10)
y -= 2.4 * (1 - bd / 10); if (z > 560)
y -= 0.3; return y; },
build: function (P) { return __ZC(469, 64, this, arguments, new.target); },
start: { x: 0, z: 700, ry: Math.PI }
};
function lswBamboo(n) { (LSW.bamLane || []).forEach(function (L, i) { var cut = i < n; L.g.visible = !cut; L.S.off = cut; }); }
function lswBamCut() { return __ZC(469, 65, this, arguments, new.target); }
function lswLocalSc() { var L = worldLocal(); return { x: L.x - lswSc().x, z: L.z }; }
var LSW_PIN = { x: 66, z: 14, r: 6 }, LSW_RIM_Z = -6, LSW_ESC_Z = -1122, LSW_CAVE_Y = 0;
function lswPlateauH(x, z) { return __ZC(469, 66, this, arguments, new.target); }
LSW_SCN.maple = {
h: function (x, z) { return __ZC(469, 67, this, arguments, new.target); },
build: function (P) { return __ZC(469, 68, this, arguments, new.target); },
start: { x: 0, z: 700, ry: Math.PI }
};
function lswCliffs(P) { return __ZC(469, 69, this, arguments, new.target); }
function lswChop() { return __ZC(469, 70, this, arguments, new.target); }
function lswClimb(k) { return __ZC(469, 71, this, arguments, new.target); }
function lswBridge(n) { return __ZC(469, 72, this, arguments, new.target); }
function lswMapleBelow(P) { return __ZC(469, 73, this, arguments, new.target); }
function lswMapleAbove(P) { return __ZC(469, 74, this, arguments, new.target); }
var LSW_PL_PATH = [[66, -12], [40, -60], [20, -80], [0, -150], [-40, -230], [-60, -300], [-60, -360], [-50, -440], [-40, -462]];
function lswApeTown(P) { return __ZC(469, 75, this, arguments, new.target); }
var LSW_CAVES = (function () { var out = []; for (var i = 0; i < 18; i++)
out.push({ n: i + 1, x: 240 - i * 45 }); return out; })();
function lswCaves(P) { return __ZC(469, 76, this, arguments, new.target); }
var LSW_TUN = { x: 2000, z: 0, y: 0 };
function lswTunnel(P) { return __ZC(469, 77, this, arguments, new.target); }
LSW_SCN.manaos.wl = function (x, z) { return z < -50 ? -0.6 : null; };
LSW_SCN.river.wl = function () { return 0; };
LSW_SCN.village.wl = function (x, z) { return z < -64 ? -0.5 : null; };
LSW_SCN.forest.wl = function (x, z) { return Math.abs(x - lswFrRiverX(z)) < 14 ? lswFrWater(z) : null; };
LSW_SCN.channel.wl = function (x, z) { return -0.6; };
LSW_SCN.uplands.wl = function (x, z) { return Math.hypot(x - 60, z - 260) < 9 ? LSW_SCN.uplands.h(60, 262) + 1.6 : null; };
LSW_SCN.maple.wl = function (x, z) { return Math.hypot(x - LSW_LAKE.x, z - LSW_LAKE.z) < LSW_LAKE.r ? 106 : null; };
function lswInTunnel(x) { return LSW.sc === "maple" && x > 1700; }
function lswBlockL(x, z, feet) { return __ZC(469, 78, this, arguments, new.target); }
function lswPlaceName(L) { var best = null, bd = 1e9; for (var k in LSW_AT) {
var A = LSW_AT[k];
if (A.sc !== LSW.sc)
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z) - (A.y != null && Math.abs((A.y || 0) - (camera.position.y - 1.72)) > 8 ? 50 : 0);
if (d < bd) {
bd = d;
best = A;
}
} return best && bd < 120 ? best.name : lswSc().name; }
function lswTick(dt) { return __ZC(469, 79, this, arguments, new.target); }
function lswClockSet() { var t = LSW.clockT != null ? LSW.clockT : 11.88; var m = (t % 1) * 60, hr = t % 12; LSW.clock[0].rotation.z = -hr / 12 * Math.PI * 2; LSW.clock[1].rotation.z = -m / 60 * Math.PI * 2; }
function lswBuild(G) { LSW.G = G; LSW.lite = lswLite(); LSW.built = true; }
if (typeof worldDef === "function")
worldDef(LSW_KEY, {
base: LSW.base, far: 9000, ownSky: true, tone: 120,
env: function () { return lswEnvNow(); },
build: function (G) { lswBuild(G); },
enter: function (opt) { return __ZC(469, 80, this, arguments, new.target); },
leave: function () { LSW.ride = null; LSW.moving = false; lswDrums(false); if (LSW.veil)
LSW.veil.style.opacity = "0"; if (typeof lsbLeave === "function")
try {
lsbLeave();
}
catch (e) { } },
ground: function (x, z, feet) { var S = lswSc(); return lswGround(x - S.x, z, feet); },
block: function (x, z, feet) { var S = lswSc(); return lswBlockL(x - S.x, z, feet); },
tick: function (dt) { lswTick(dt); },
back: function () { lswGo(LSW_SCN[LSW.sc] && LSW_SCN[LSW.sc].start ? { sc: LSW.sc, x: LSW_SCN[LSW.sc].start.x, z: LSW_SCN[LSW.sc].start.z, ry: LSW_SCN[LSW.sc].start.ry } : "arrive"); }
});
function lswEnter(opt) { if (typeof worldGo !== "function")
return false; return worldGo(LSW_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(LSW_KEY) < 0)
WLG.keys.push(LSW_KEY);
function lswForget() { return __ZC(469, 81, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === LSW_KEY)
lswForget(); return r; }; })();
(function () {
if (typeof WFD_LIST === "undefined" || WFD_LIST.some(function (D) { return D.k === LSW_KEY; }))
return;
WFD_LIST.push({ k: LSW_KEY, n: LSW_NAME, s: "Conan Doyle's book, whole: the Amazon and Maple White Land", fr: 0x7A3A22, lf: 0x2E4A22, gl: 0xF2E8B0, sh: "arch", tex: "stone", go: function () { return lswEnter({}); } });
})();
(function () { try {
if (typeof CT_BY_HOST !== "undefined" && CT_BY_HOST["world:race"])
CT_BY_HOST["world:race"] = CT_BY_HOST["world:race"].filter(function (T) { return T.id !== "lostworld"; });
}
catch (e) { } })();
(function () { if (typeof ctsEnter !== "function")
return; var e0 = ctsEnter; ctsEnter = function (id) { if (id === "lostworld") {
try {
worldCard(null);
}
catch (e) { }
lswEnter({});
return;
} return e0.apply(this, arguments); }; })();
var LSB_CH = [];
var LSB = { beam: null, items: [], tune: null, tuneKey: null, hold: 0, readOpen: 0, readAsk: 0, rew: {}, wt: 0, text: null, textWait: null, cast: {}, puzOpen: 0, got: 0 };
var LSB_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function lsbS() { if (!store.lsbook)
store.lsbook = { ch: 0, s: 0, keeps: [], f: {}, started: 0, done: 0, seen: {} }; var S = store.lsbook; S.f = S.f || {}; S.keeps = S.keeps || []; S.seen = S.seen || {}; return S; }
function lsbSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function lsbStep() { var S = lsbS(), C = LSB_CH[S.ch]; return C ? C.steps[S.s] : null; }
function lsbActive() { var S = lsbS(); return !!(S.started && !S.done && WLD.on === LSW_KEY); }
function lsbKey() { var S = lsbS(); return S.done ? "done" : S.ch + "." + S.s; }
function lsbSay(h) { setStatus(h); }
function lsbQ(k) { return lsQ(k); }
function lsbQs() { return lsQs.apply(null, arguments); }
function lsbPos(at) { return __ZC(469, 82, this, arguments, new.target); }
function lsbScName(k) { return (LSW_SC[k] || {}).name || k; }
function lsbWay(P, L) { return __ZC(469, 83, this, arguments, new.target); }
function lsbBeam() { return __ZC(469, 84, this, arguments, new.target); }
function lsbItemMesh(kind) { return __ZC(469, 85, this, arguments, new.target); }
function lsbItemsClear() { LSB.items.forEach(function (I) { if (I.g && I.g.parent)
I.g.parent.remove(I.g); var j = LSW.spots.indexOf(I.S); if (j >= 0)
LSW.spots.splice(j, 1); }); LSB.items = []; }
function lsbItemAdd(kind, P, name, verb, onTake) { return __ZC(469, 86, this, arguments, new.target); }
var LSB_TUNES = { largo: "assets/lost-world/largo.mp3", swan: "assets/verne/moonlight.mp3", aquarium: "assets/neverland/morning-mood.mp3", fossils: "assets/verne/toccata.mp3", odeon: "assets/grimm/danube.mp3",
morning: "assets/neverland/morning-mood.mp3", chase: "assets/neverland/mountain-king.mp3", night: "assets/erebos/gymnopedie.mp3", hebrides: "assets/verne/hebrides.mp3" };
function lsbTune(k) { return __ZC(469, 87, this, arguments, new.target); }
function lsbText(fn) { return __ZC(469, 88, this, arguments, new.target); }
function lsbPara(p) { return "<p style='margin:6px 0;font-style:italic;white-space:pre-line'>" + esc(p) + "</p>"; }
function lsbOpening(T) { var out = [], n = 0; for (var i = 0; i < T.p.length && n < 900; i++) {
var p = T.p[i];
if (n + p.length > 1100)
p = p.slice(0, Math.max(300, 900 - n)).replace(/\s+\S*$/, "") + " ...";
out.push(p);
n += p.length;
} return out; }
var LSB_PLAIN = "<div style='font-size:11px;opacity:.65;margin:4px 0'>Conan Doyle's own words, as printed in 1912. A few words of his day that hurt now are put in plain words, in [brackets].</div>";
function lsbReadAll(i) { return __ZC(469, 89, this, arguments, new.target); }
function lsbChapterCard() { return __ZC(469, 90, this, arguments, new.target); }
function lsbKeeperBtns(fns) { return __ZC(469, 91, this, arguments, new.target); }
function lsbJump(i) { var S = lsbS(); S.ch = Math.max(0, Math.min(LSB_CH.length - 1, i)); S.s = 0; S.started = 1; S.done = 0; S.f = {}; lsbSave(); lsbChapterBegin(true); }
function lsbStV(v) { return typeof v === "function" ? v(lsbS().s) : v; }
function lsbMayChop() { return lsbActive() && !!(lsbStep() || {}).chop; }
function lsbAdult() { try {
return typeof ageAdult === "function" && !!ageAdult();
}
catch (e) {
return false;
} }
function lsbWorldState() { return __ZC(469, 92, this, arguments, new.target); }
function lsbChapterBegin(place) { return __ZC(469, 93, this, arguments, new.target); }
function lsbStepBegin() { return __ZC(469, 94, this, arguments, new.target); }
function lsbPuzzleCard(b) { return __ZC(469, 95, this, arguments, new.target); }
function lsbStepDone() { return __ZC(469, 96, this, arguments, new.target); }
function lsbFinish() { return __ZC(469, 97, this, arguments, new.target); }
function lsbCastName(c) { return c.name || (LSW_FOLK[c.k] || {}).name || c.k; }
function lsbCastLive(C) { return !!(C && C.g && C.g.parent); }
function lsbCastAdd(c) { return __ZC(469, 98, this, arguments, new.target); }
function lsbCastHide(key) { var C = LSB.cast[key]; if (!C)
return; if (C.g && C.g.parent)
C.g.parent.remove(C.g); LSW.talk = LSW.talk.filter(function (T) { return T.p !== C.P; }); LSW.people = LSW.people.filter(function (p) { return p !== C.P; }); delete LSB.cast[key]; }
function lsbCastClear() { for (var k in LSB.cast)
lsbCastHide(k); LSB.cast = {}; }
function lsbCastMove(key, at, ry) { var C = LSB.cast[key]; if (!C)
return; var P = lsbPos(at); if (!P)
return; C.g.position.set(P.x, P.y != null ? P.y : lswGround(P.x, P.z, 500), P.z); if (ry != null)
C.g.rotation.y = ry; }
function lsbCastTick() { return __ZC(469, 99, this, arguments, new.target); }
var LSB_FOLK_AT = { river: [["gec", -1.0, 2.0, Math.PI, 1.21], ["summ", 1.2, 6.0, -2.5, 1.21], ["john", 1.6, -10.8, Math.PI, 1.21], ["zambo", -1.6, 8.4, 0.6, 1.21], ["gomez", 1.8, 8.6, -0.8, 1.21], ["manuel", -1.8, 5.6, 1.4, 1.21], ["mojo", -0.6, 9.6, 0, 1.21]],
village: [["gec", -50, 26, 0], ["summ", -54, 24, 1.0], ["john", -46, 26, -0.8], ["zambo", -6, -48, 0.2], ["gomez", -40, 14, 2.6], ["manuel", 8, -10, 0], ["mojo", -16, -56, 0.4]],
forest: [["gec", lswFrRiverX(300) - 24, 296, 0.4], ["summ", lswFrRiverX(300) - 28, 310, 1.2], ["john", lswFrRiverX(300) - 18, 320, -0.2], ["zambo", lswFrRiverX(300) - 14, 300, 0.8], ["gomez", lswFrRiverX(300) - 22, 326, -1.2]],
channel: [["gec", -36, 408, Math.PI], ["summ", -30, 410, Math.PI], ["john", -46, 406, Math.PI], ["zambo", -28, 404, Math.PI]],
uplands: [["gec", -8, 640, Math.PI], ["summ", 8, 646, Math.PI], ["john", -14, 652, Math.PI], ["zambo", 16, 656, Math.PI]],
maple: [["gec", 14, -86, 0.4], ["summ", 26, -94, -0.6], ["john", 22, -80, Math.PI], ["zambo", 52, 40, Math.PI]] };
function lsbPopulate() { return __ZC(469, 100, this, arguments, new.target); }
function lsbCastHere(C) { return (C.cast || []).some(function (c) { var P = lsbPos(c.at); return P && P.sc === LSW.sc; }); }
function lsbChapterSc(C) { var P = C && C.start ? lsbPos(C.start) : null; return C.sc || (P && P.sc) || null; }
function lsbSceneDrop() { LSB.beam = null; LSB.items = []; LSB.cast = {}; }
function lsbHeard(kind) { LSB.rew[kind] = (LSB.rew[kind] || 0) + 1; }
function lsbNote(kind, title) { lsbHeard(kind); if (title)
lsbHeard("tale:" + title); }
function lsbTalk(T) { return __ZC(469, 101, this, arguments, new.target); }
function lsbSpot(S) { if (!lsbActive() || S.lsb)
return; var b = lsbStep(); if (!b || b.k !== "spot")
return; var ok = b.spot instanceof RegExp ? b.spot.test(S.name || "") : S.name === b.spot; if (!ok)
return; var k = lsbKey(); setTimeout(function () { if (lsbKey() === k)
lsbStepDone(); }, b.wait || 400); }
function lsbIdlePrompt() { worldPrompt("🦕 <b>The Lost World</b> · <b>press E</b> for the book", lsbOpen); }
function lsbTick(dt, L) { return __ZC(469, 102, this, arguments, new.target); }
function lsbOpen() { return __ZC(469, 103, this, arguments, new.target); }
function lsbBegin() { var S = lsbS(); S.started = 1; lsbSave(); if (WLD.on !== LSW_KEY) {
lswEnter({});
return;
} lsbChapterBegin(true); }
function lsbStartAt() { var S = lsbS(); if (S.started && !S.done) {
var C = LSB_CH[S.ch], P = C && C.start ? lsbPos(C.start) : null;
if (P)
return { sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry };
} return null; }
function lsbEnter(opt) { var S = lsbS(); setTimeout(function () { if (WLD.on !== LSW_KEY)
return; if (S.started && !S.done)
lsbChapterBegin(false);
else {
lsbWorldState();
lsbPopulate();
if (!S.started)
lsbOpen();
} }, window.SBK_FAST ? 30 : 900); }
function lsbLeave() { lsbTune(null); lsbItemsClear(); LSB.cast = {}; LSB.beam = null; LSW.bannerBook = false; }
function lyGo(at, h, o) { return Object.assign({ k: "go", at: at, h: h }, o || {}); }
function lyTalk(who, h, card, o) { o = o || {}; var r = Object.assign({}, o, { k: "talk", who: who, h: h, card: card }); r.at = { who: who, at: o.at }; return r; }
function lySpot(name, h, o) { o = o || {}; var r = Object.assign({}, o, { k: "spot", spot: name, h: h }); r.at = { spot: name, at: o.at }; return r; }
function lyRew(kind, at, h, o) { return Object.assign({ k: "reward", kind: kind, at: at, h: h }, o || {}); }
function lyFind(item, at, name, h, o) { return Object.assign({ k: "find", item: item, at: at, name: name, h: h }, o || {}); }
function lyGather(item, at, n, name, h, o) { return Object.assign({ k: "gather", item: item, at: at, n: n, name: name, h: h }, o || {}); }
function lyHold(at, sec, h, o) { return Object.assign({ k: "hold", at: at, sec: sec, h: h }, o || {}); }
function lyUntil(test, at, h, o) { return Object.assign({ k: "until", test: test, at: at, h: h }, o || {}); }
function lyPuzzle(title, html, answers, right, why, o) { return Object.assign({ k: "puzzle", title: title, html: html, answers: answers, right: right, why: why }, o || {}); }
function lyRead(title, html, btn, o) { return lyPuzzle(title, html, [btn || "▶ Go on"], 0, [], o); }
function lyReadA(title, adult, young, btn, o) { var r = lyRead(title, adult, btn, o), on0 = r.on; r.on = function (f) { r.html = lsbAdult() ? adult : young; if (on0)
on0(f); }; return r; }
function lyMove(at, msg) { return function () { lswGo(at, msg || null, lsbPopulate); }; }
var LSB_SNAGS = [["A drowned tree-trunk, its branches standing up out of the water", "port"], ["A pale sandbank under the brown water", "starboard"], ["A raft of floating weed, as big as a field", "port"], ["A canoe of fishermen, crossing", "starboard"], ["A sand-bar where the river shallows", "starboard"], ["A floating log, and a cayman asleep on it", "port"], ["The wash of the shore, where the current runs fast under the bank", "starboard"], ["A great tree fallen half across the stream", "port"]];
function lsbSteer() { return __ZC(469, 104, this, arguments, new.target); }
function lsbClimbGingko() { return __ZC(469, 105, this, arguments, new.target); }
function lsbDownGingko() { var G = LSW.gingko; if (!G)
return; lswGo({ sc: "maple", x: G.x, z: G.z + 4, ry: 0 }, "🌳 Down again, branch by branch, to the foot of the gingko."); }
function lsbPteroAttack(on) { return __ZC(469, 106, this, arguments, new.target); }
function lsbPteroFollow() { if (!LSW.pteroOn)
return; var L = lswLocalSc(); (LSW.pteros || []).forEach(function (B) { if (B.o.chase && B.o.circle) {
B.o.circle.x += (L.x - B.o.circle.x) * 0.08;
B.o.circle.z += (L.z - B.o.circle.z) * 0.08;
B.o.circle.y = lswLand(L.x, L.z) + 4.5;
} }); }
function lsbToad(mode, at) { return __ZC(469, 107, this, arguments, new.target); }
function lsbToadTick(dt) { return __ZC(469, 108, this, arguments, new.target); }
function lsbBalloon(stage) { return __ZC(469, 109, this, arguments, new.target); }
function lsbBalloonTick(dt) { var B = LSW.balloon; if (!B || !B.userData.rise)
return; B.userData.rise += dt * 8; B.position.y += B.userData.rise * dt; B.position.x += dt * 3; if (B.position.y > 600)
B.visible = false; }
function lsbCave() { return __ZC(469, 110, this, arguments, new.target); }
function lsbLight() { LSW.torchLit = true; (LSW.tunTorch || []).forEach(function (t) { t.visible = true; }); }
function lsbFork() { if (!LSW.torchLit) {
setStatus("🔀 Something: the wall falls away here, on the right. In the dark you cannot tell what it is.");
return;
} lswTale("🔀 The fork", ["forked"], [], "XV"); }
function lsbOutCave() { lswGo("exitcave", "🌙 <b>Down the rift and out.</b> The moon on the plain, and the cliff behind you. You are off the plateau."); }
function lsbBoulder(x, z) {
var r = new THREE.Mesh(lswGeo("boulder", function () { return new THREE.DodecahedronGeometry(1.6, 1); }), lswMat("rock"));
r.position.set(x, 60, z);
LSW.scG.add(r);
var t0 = LSW.t;
LSW.fx.push(r);
r.userData.kind = "boulder";
r.userData.v = 0;
r.userData.y0 = lswLand(x, z) + 1.4;
}
function lsbFxTick(dt) { LSW.fx.forEach(function (F) { if (F.userData.kind !== "boulder")
return; if (F.position.y <= F.userData.y0) {
F.position.y = F.userData.y0;
return;
} F.userData.v += 30 * dt; F.position.y = Math.max(F.userData.y0, F.position.y - F.userData.v * dt); F.rotation.x += dt * 3; }); }
function lsbSwoop(at) { return __ZC(469, 111, this, arguments, new.target); }
function lsbGreyBird() { var B = LSW.upPtero; if (!B)
return; var L = lswLocalSc(); B.g.visible = true; B.mode = "glide"; B.o.circle = { x: L.x + 260, y: lswLand(L.x, L.z) + 70, z: L.z - 200, r: 240, sp: -0.12, a0: 2.4, bob: 6 }; }
(function () {
var t0 = lswTick;
lswTick = function (dt) {
t0(dt);
if (!LSW.scG)
return;
try {
var L = worldLocal(), x = L.x - lswSc().x, ic = lswInTunnel(x);
if (ic !== !!LSW.inCave) {
LSW.inCave = ic;
worldEnv(lswEnvNow());
}
lsbToadTick(dt);
lsbPteroFollow();
lsbBalloonTick(dt);
lsbFxTick(dt);
}
catch (e) { }
};
})();
function lc(k, at, o) { return Object.assign({ k: k, at: at }, o || {}); }
function lsrc(ch) { return lsSrc(ch); }
LSB_CH.push({ t: "To-morrow we disappear into the unknown", txt: 0, start: { sc: "manaos", x: 0, z: -40, ry: Math.PI }, jump: 1, tune: "odeon", keep: ["envelope", "The blank sheet from Challenger's envelope", "✉️"],
words: "Manaos, a thousand miles up the Amazon, July 1911. The Booth liner has brought the three of them out from Southampton by way of Para; Professor Challenger said he would meet them here, and he has not come. He has left them an envelope instead, not to be opened until twelve o'clock on July the fifteenth.",
intro: "The quay at Manaos",
cast: [lc("john", { sc: "manaos", x: -6, z: -36 }, { ry: Math.PI, until: 9 }), lc("summ", { sc: "manaos", x: 8, z: -30 }, { ry: -2.4, until: 9 }), lc("zambo", { sc: "manaos", x: 32, z: -44 }, { ry: -0.4 }), lc("gomez", { sc: "manaos", x: 20, z: -42 }, { ry: 0.4 }), lc("manuel", { sc: "manaos", x: 24, z: -40 }, { ry: -0.2 }), lc("mojo", { sc: "manaos", x: 36, z: -46 }, { ry: 0.8 }),
lc("john", { sc: "manaos", x: 68, z: 203 }, { key: "john2", ry: 0, from: 9 }), lc("summ", { sc: "manaos", x: 72, z: 201 }, { key: "summ2", ry: -1.6, from: 9 }), lc("gec", { sc: "manaos", x: 70, z: 199 }, { ry: Math.PI, from: 17 })],
steps: [
{ k: "read" },
lyTalk("Lord John Roxton", "Lord John is on the quay: hear what he says of the country", ["🧭 The Red Chief", lsQs("redchief", "whatthere", "unknown") + lsrc("VII"), "▶ Go on"]),
lyPuzzle("🧭 What they called him", "Lord John has been here before. What did the people of the rubber country call him?", ["The Red Chief", "The Englishman", "The Hunter"], 0, ["", "Something with more fire in it.", "Something with more fire in it."], { yes: "🧭 " + LSW_Q.redchief }),
lyTalk("Professor Summerlee", "Professor Summerlee, by the bales of rubber", ["🔬 Professor Summerlee", lsQs("summgaunt", "summnet", "briar", "drill") + lsrc("VII"), "▶ Go on"]),
lyTalk("Zambo", "Zambo, the big man from Para, is loading the stores", ["💪 Zambo", "<p>Zambo was engaged at Para: a very big, very strong man who has worked on the steamers and speaks good English. The book says he will be as faithful as any man could be, and he is.</p>", "▶ Go on"]),
lyTalk("Gomez", "Gomez, one of the two river men from up the river", ["🛶 Gomez and Manuel", lsQs("geral", "mojo", "fifteen") + lsrc("VII"), "▶ Go on"]),
lyPuzzle("🛶 The party at the quay", "Count the expedition as it stands on the quay: the three Englishmen, Gomez and Manuel, Zambo, and the three Mojo boatmen. How many?", ["Seven", "Nine", "Twelve"], 1, ["Count again: three, two, one, three.", "", "Count again: three, two, one, three."], { yes: "🛶 Nine, and the Professor still to come." }),
lyGo({ sc: "manaos", x: -80, z: 16 }, "Up the street from the quay to the square before the opera house", { r: 12 }),
lySpot("The opera house", "Look at the opera house, built with the rubber money"),
lyGo("fazenda", "Out to the edge of the town: the Fazenda St. Ignatio, where they are staying", { r: 6 }),
lyGo("faztable", "Into the shaded sitting-room, to the cane table", { r: 2.6 }),
lyRead("☀️ Noon, July 15th", lsQs("glare", "hum", "butterflies") + lsrc("VII"), "▶ Look at the envelope"),
lyTalk("Lord John Roxton", "Lord John has his watch on the table", ["⌚ The envelope", lsQs("envelope", "sevenmin") + lsrc("VII"), "▶ Wait"]),
lyHold("faztable", 14, "Seven more minutes: wait at the table, and watch the clock on the wall", { r: 3, on: function () { LSW.clockT = 11 + 53 / 60; }, tick: function (h) { LSW.clockT = 11 + (53 + Math.min(7, h / 2)) / 60; } }),
lyTalk("Professor Summerlee", "\"What can it possibly matter?\" Summerlee picks up the envelope", ["😤 Quackery", lsQs("quackery", "rules", "whistle") + lsrc("VII"), "▶ He cuts it open"]),
lyPuzzle("✉️ What is inside?", "Lord John cuts the envelope with his penknife, draws out a folded sheet, and flattens it on the table. What is written on it?", ["A chart of the river", "Nothing at all", "A message in invisible ink"], 1, ["Look again.", "", "You may suggest it; Lord John holds it to the light: nothing."], { yes: "✉️ " + LSW_Q.blank }),
lyRead("✉️ A blank sheet", lsQs("blank", "humbug", "ink", "maycome") + lsrc("VII"), "▶ Who is that on the veranda?"),
lyTalk("Professor Challenger", "Challenger: in a straw hat, at the door", ["🎩 The Professor", lsQs("strawhat", "sandbank", "command") + lsrc("VII"), "▶ Go on"]),
lyTalk("Professor Summerlee", "Summerlee has something to say to that", ["😤 Another ship", lsQs("anothership") + lsrc("VII"), "▶ Go on"]),
lyPuzzle("🎩 The blank sheet", "Why did the Professor give them an envelope with nothing in it?", ["To test their honesty", "He always meant to be there himself before noon, and lead them", "He forgot to write it"], 1, ["Not quite: he says himself what he meant.", "", "Challenger forgets nothing."], { yes: "🎩 He meant to be there before the hour: a blundering pilot and a sandbank made him late." }),
lyRead("🚢 The Esmeralda", "<p>" + lsQ("esmeralda") + "</p>" + lsrc("VII"), "▶ Aboard", { done: function () { lswGo("deck", null, lsbPopulate); } })
] });
LSB_CH.push({ t: "Up the great river", txt: 1, start: "deck", jump: 1, tune: "hebrides", keep: ["letter", "Malone's letter to McArdle, sent down the river", "📨"],
words: "The Esmeralda steams north-west up the Amazon, so wide that the banks are shadows; then up a tributary, narrowing, to an Indian village where Challenger has them land, and sends the launch back.",
intro: "The deck of the Esmeralda",
cast: [lc("john", { sc: "river", x: 1.4, z: -6.2, y: 1.21 }, { ry: Math.PI }), lc("gec", { sc: "river", x: -1.0, z: 2.0, y: 1.21 }, { ry: Math.PI }), lc("summ", { sc: "river", x: 1.2, z: 6.0, y: 1.21 }, { ry: -2.5 }), lc("zambo", { sc: "river", x: -1.6, z: 8.4, y: 1.21 }, { ry: 0.6 }), lc("gomez", { sc: "river", x: 1.8, z: 8.6, y: 1.21 }, { ry: -0.8 }),
lc("gec", { sc: "village", x: -50, z: 26 }, { key: "gec2", ry: 0 }), lc("summ", { sc: "village", x: -54, z: 24 }, { key: "summ2", ry: 1.0 }), lc("john", { sc: "village", x: -46, z: 26 }, { key: "john2", ry: -0.8 }), lc("zambo", { sc: "village", x: -6, z: -48 }, { key: "zambo2", ry: 0.2 }), lc("gomez", { sc: "village", x: -40, z: 14 }, { key: "gomez2", ry: 2.6 })],
steps: [
{ k: "read" },
lySpot("The bow", "Go forward to the bow, and look up the river"),
lyTalk("Lord John Roxton", "Lord John, by the wheel-house", ["🚢 The Esmeralda", lsQs("esmeralda", "eightinches") + lsrc("VII"), "▶ Take the wheel"]),
lyUntil(function () { return (LSW.steer || {}).n >= LSB_SNAGS.length; }, { spot: "The wheel of the Esmeralda" }, "Take the wheel (press E at it) and steer her round what lies in the river", { on: function () { LSW.steer = { n: 0, ok: 0, sp: 7 }; } }),
lyTalk("Professor Challenger", "Challenger, on the floods of the Amazon", ["🌊 The Gapo", lsQs("gapo") + lsrc("VII"), "▶ Go on"]),
lyPuzzle("🌊 The slope of the river", "The Amazon is so gentle a river that a sailing boat can run up it before the wind for two thousand miles. How far does it fall in a mile?", ["Eight inches", "Eight feet", "Eighty feet"], 0, ["", "Far less: it is nearly level.", "Far, far less."], { yes: "🌊 " + LSW_Q.eightinches }),
lyHold("stern", 12, "Three days of steaming: sit under the awning at the stern, and watch the banks go by", { r: 3 }),
lyRead("🌿 The tributary", lsQs("shadows", "tributary") + lsrc("VII"), "▶ Land at the village", { done: function () { lswGo("landing", null, lsbPopulate); } }),
lyTalk("Professor Challenger", "Challenger, by the huts", ["🔒 The door of the unknown", lsQs("doorunknown", "wordhonor") + lsrc("VII"), "▶ Give your word"]),
lyPuzzle("🧭 Malone's map", "Because of the Professor's secret, what has Malone done to every map he draws of the journey?", ["Left it blank", "Confused the points of the compass", "Drawn it upside down"], 1, ["He draws the places, true enough.", "", "Not quite."], { yes: "🧭 " + LSW_Q.compass }),
lySpot("The two canoes of skins over bamboo", "Look at the two canoes the expedition has bought"),
lyTalk("Ataca", "Ataca, who went up the river with the Professor before", ["🛶 Ataca and Ipetu", lsQs("ataca", "skins") + lsrc("VII"), "▶ Go on"]),
lyGather("load", "canoes", 5, "A load for the canoes", "Load the canoes: bring the five packs from the landing", { spread: 9, verb: "carry it to the canoes", eachSay: "Stowed." }),
lyRead("📨 To Mr. McArdle", lsQs("august2", "disappear") + "<p>You write the last letter Malone will send for a long while, and give it to a man of the village to carry down the river.</p>" + lsrc("VII"), "▶ Seal it")
] });
LSB_CH.push({ t: "The drums", txt: 2, start: "landing", jump: 1, tune: "largo", keep: ["paddle", "A carved paddle from the canoes", "🛶"], state: { drums: 1, drumsFrom: 9 },
words: "The last evening at the village, someone listens at the hut wall where the plans are made. Then up the dark river, six in each canoe, round the rapids, under the great trees; and on the third day, the drums.",
intro: "The village, the last evening",
cast: [lc("gec", { sc: "village", x: -52, z: 22 }, { ry: 0.4 }), lc("summ", { sc: "village", x: -48, z: 18 }, { ry: -0.4 }), lc("john", { sc: "village", x: -45, z: 24 }, { ry: -1.2 }), lc("zambo", { sc: "village", x: -56, z: 14 }, { ry: 0.4 }), lc("gomez", { sc: "village", x: -58, z: 24 }, { ry: 1.6 }),
lc("john", { sc: "forest", x: lswFrRiverX(300) - 18, z: 320 }, { key: "johnf", ry: -0.2 }), lc("gomez", { sc: "forest", x: lswFrRiverX(300) - 22, z: 326 }, { key: "gomezf", ry: -1.2 }), lc("gec", { sc: "forest", x: lswFrRiverX(300) - 24, z: 296 }, { key: "gecf", ry: 0.4 }), lc("summ", { sc: "forest", x: lswFrRiverX(300) - 28, z: 310 }, { key: "summf", ry: 1.2 }), lc("zambo", { sc: "forest", x: lswFrRiverX(300) - 14, z: 300 }, { key: "zambof", ry: 0.8 })],
steps: [
{ k: "read" },
lySpot("The hut where the plans are made", "Go to the hut where the four of them talk over their plans"),
lyTalk("Zambo", "Zambo has caught someone listening at the wall", ["👂 At the hut wall", "<p>Gomez, the English-speaking river man, had hidden himself by the hut to hear the plans. Zambo saw him, and brought him out. Gomez drew a knife; Zambo, by sheer strength, took it from him with one hand. No one was hurt. The two were made to shake hands, and the thing was smoothed over, and there is every hope that all will be well.</p>" + lsrc("VIII"), "▶ Go on"]),
lyTalk("Professor Summerlee", "The two Professors have been at it again", ["🏛️ Westminster Abbey", lsQs("abbey", "millbank", "really", "children") + lsrc("VIII"), "▶ Go on"]),
lyRead("🛶 Six in each canoe", lsQs("sixeach") + lsrc("VIII"), "▶ Up the river", { done: function () { lswGo({ sc: "forest", x: lswFrRiverX(300) - 12, z: 300, ry: -Math.PI / 2 }, null, lsbPopulate); } }),
lyTalk("Lord John Roxton", "Lord John, on the river's colour", ["🌑 Dark water", lsQs("darkriver", "darkwhite") + lsrc("VIII"), "▶ Go on"]),
lyPuzzle("🌑 Black rivers and white", "Half the Amazon's rivers are dark but clear; half are milky. What makes a river dark?", ["Rotting leaves and plants", "Coal", "The shade of the trees"], 0, ["", "Not coal.", "Not the shade."], { yes: "🌑 " + LSW_Q.darkwhite }),
lySpot("The aisles of the great trees", "Walk up into the forest, under the great trees, and stand in the hush"),
lySpot("The great silk-cotton tree", "Find the great silk-cotton tree"),
lyHold("aisle", 10, "Listen: a deep throbbing in the air, coming and going", { r: 30, on: function () { lswDrums(true); } }),
lyTalk("Lord John Roxton", "Ask Lord John what it is", ["🥁 Drums", lsQs("drums") + lsrc("VIII"), "▶ Ask Gomez"]),
lyTalk("Gomez", "Gomez knows the drums", ["🥁 The drum talk", lsQs("drumtalk", "qanda") + lsrc("VIII"), "▶ Go on"]),
lyTalk("Professor Challenger", "The Professors, unafraid", ["🔬 The bravery of the scientific mind", lsQs("bravery", "darwin") + lsrc("VIII"), "▶ Go on"]),
lyGather("load", "fput", 4, "A pack from the canoes", "The portage: bring the four packs up from the canoes below the rapid", { spread: 10, verb: "shoulder it", eachSay: "On your back." }),
lyGo("ftop", "Carry them round the rapid by the path through the forest, to the still water above", { r: 10, on: function () { (LSW.cLow || []).forEach(function (c) { c.visible = false; }); }, done: function () { (LSW.cUp || []).forEach(function (c) { c.visible = true; }); } }),
lySpot("The rapid, a mile long", "Look back down at the long rapid"),
lyRead("🛶 A hundred miles", lsQs("steeprapid", "corrob", "hundredmiles", "anchors") + lsrc("VIII"), "▶ Moor for the night")
] });
LSB_CH.push({ t: "My private gate into the unknown", txt: 3, start: "assai", jump: 1, tune: "aquarium", keep: ["blaze", "A chip from the blazed tree", "🪓"],
words: "All morning Challenger has watched the banks. Then he stands up in the canoe, and points to a single palm.",
intro: "The Assai palm",
cast: [lc("gec", { sc: "channel", x: -36, z: 408 }, { ry: Math.PI }), lc("summ", { sc: "channel", x: -30, z: 410 }, { ry: Math.PI }), lc("john", { sc: "channel", x: -46, z: 406 }, { ry: Math.PI }), lc("gomez", { sc: "channel", x: -28, z: 402 }, { ry: Math.PI }), lc("zambo", { sc: "channel", x: -40, z: 400 }, { ry: Math.PI }),
lc("gec", { sc: "channel", x: lswChX(-430) - 8, z: -436 }, { key: "gec2", ry: 0 }), lc("summ", { sc: "channel", x: lswChX(-430) - 12, z: -430 }, { key: "summ2", ry: 1 }), lc("john", { sc: "channel", x: lswChX(-430) - 5, z: -424 }, { key: "john2", ry: 2.8 }), lc("zambo", { sc: "channel", x: lswChX(-430) - 14, z: -440 }, { key: "zambo2", ry: 0.3 })],
steps: [
{ k: "read" },
lyTalk("Professor Challenger", "Challenger points: what do you make of that?", ["🌴 The landmark", lsQs("assai") + lsrc("VIII"), "▶ Look at it"]),
lySpot("The Assai palm", "Look at the Assai palm"),
lyPuzzle("🌿 The private gate", "Challenger says: there is no break in the trees, yet the opening is there. How does he know the place?", ["Light-green rushes instead of dark-green undergrowth", "A cairn of stones", "A blazed tree"], 0, ["", "No stones.", "That comes later."], { yes: "🌿 " + LSW_Q.privategate }),
lyUntil(function (f) { return f.rode; }, { sc: "channel", x: lswChX(400) + 2, z: 400 }, "Step into the bow of the canoe (walk to it): the Indians will pole you through", { r: 4, on: function (f) { f.rode = 0; }, tick: null }),
lyRead("🌿 The green tunnel", lsQs("placid", "pergola", "iceberg") + lsrc("VIII"), "▶ Look about you"),
lyRead("🐒 What lives in it", lsQs("velvet", "cayman", "tapir", "puma", "waders") + lsrc("VIII"), "▶ Pole on"),
lyUntil(function (f) { return f.arrived; }, null, "Up the green tunnel: three days of hazy green sunshine (look about you as you go)"),
lyRead("👻 Curupuri", "<p>" + lsQ("hazy") + "</p><p>The Indians are frightened: they will not go into this country. Lord John says that Curupuri is their word for the spirit of the woods, any kind of devil; they think something fearsome lives this way.</p>" + lsrc("VIII"), "▶ Go on"),
lySpot("Where the canoes can go no farther", "The water is too shallow now: look"),
lyTalk("Professor Summerlee", "Summerlee will not carry the barometer", ["😤 A quarrel", lsQs("aneroid", "judges") + lsrc("VIII"), "▶ Go on"]),
lyPuzzle("😤 Who leads?", "Summerlee says Challenger is not the leader at all. What does he call Challenger and the others?", ["His soldiers", "A man on trial, walking with his judges", "His students"], 1, ["No.", "", "No."], { yes: "😤 " + LSW_Q.judges }),
lyTalk("Lord John Roxton", "Lord John: how do you keep two Professors from each other's throats?", ["🏴󠁧󠁢󠁳󠁣󠁴󠁿 Dr. Illingworth", lsQs("illingworth", "scotch") + lsrc("VIII"), "▶ Go on"]),
lySpot("The blazed tree", "Hide the canoes in the bushes, and blaze a tree to find them again"),
lyRead("🎒 The burdens", lsQs("blazing", "burdens") + lsrc("VIII"), "▶ Shoulder your pack", { done: function () { lswGo("morass", null, lsbPopulate); } })
],
setup: function (f) { f.rode = 0; f.arrived = 0; } });
(function () {
var t0 = lsbTick;
lsbTick = function (dt, L) {
t0(dt, L);
var S = lsbS(), C = LSB_CH[S.ch];
if (!lsbActive() || !C || C.keep[0] !== "blaze" || LSW.sc !== "channel")
return;
var b = lsbStep();
if (S.s === 4 && !S.f.rode && !LSW.ride) {
var c = LSW.chCanoe;
if (c && Math.hypot(L.x - c.position.x, L.z - c.position.z) < 4.5) {
S.f.rode = 1;
lswRideStart({ stop: [{ d: 90, fn: function (go) { setStatus("🌿 <b>Through the rushes.</b> The canoes push in among the tall light-green reeds, hundreds of yards of them; then out, suddenly, into clear water."); setTimeout(go, window.SBK_FAST ? 20 : 3200); } }], done: function () { S.f.arrived = 1; lswGo({ sc: "channel", x: lswChX(-420) - 6, z: -420, ry: Math.PI }, null, lsbPopulate); } });
}
}
};
})();
LSB_CH.push({ t: "The outlying pickets of the new world", txt: 4, start: "morass", jump: 1, tune: "morning", keep: ["bamboo", "A length of the bamboo you cut", "🎋"],
words: "On foot now, single file: the morass, the slope of palms, the rock-studded country with its orchids and its brook; and then the bamboo, a wall of it, which must be cut through. Beyond, the tree-ferns, the ridges, and the first sight of what they came for.",
intro: "The morass of sponge-like mosses",
cast: [lc("gec", { sc: "uplands", x: -8, z: 630 }, { ry: Math.PI, until: 3 }), lc("summ", { sc: "uplands", x: 8, z: 636 }, { ry: Math.PI, until: 6 }), lc("john", { sc: "uplands", x: -14, z: 642 }, { ry: Math.PI, until: 6 }), lc("zambo", { sc: "uplands", x: 16, z: 646 }, { ry: Math.PI }),
lc("summ", { sc: "uplands", x: 66, z: 268 }, { key: "summ2", ry: 2, from: 6, until: 10 }), lc("john", { sc: "uplands", x: 4, z: 84 }, { key: "john2", ry: Math.PI, from: 6, until: 14 }),
lc("gec", { sc: "uplands", x: 6, z: -300 }, { key: "gec3", ry: 0.4, from: 14 }), lc("summ", { sc: "uplands", x: -6, z: -296 }, { key: "summ3", ry: -0.4, from: 14 }), lc("john", { sc: "uplands", x: 0, z: -290 }, { key: "john3", ry: Math.PI, from: 14 })],
steps: [
{ k: "read" },
lyRead("🦟 The morass", lsQs("morass", "organ") + lsrc("VIII"), "▶ Wade on"),
lyGo({ sc: "uplands", x: 0, z: 540 }, "Wade through the morass to the firm ground of the palm-slope", { r: 10 }),
lySpot("The four fire-blackened stones", "Something in the grass: four stones, black with fire"),
lyPuzzle("🔥 Four stones", "Four fire-blackened stones, here, where no traveller comes. What do they mean?", ["Someone has camped here before", "A volcano", "A grave"], 0, ["", "No.", "No."], { yes: "🔥 " + LSW_Q.firestones + " Challenger's own camp, on his first journey, perhaps; or Maple White's." }),
lyFind("fern", { sc: "uplands", x: -120, z: 330 }, "An orchid: Cattleya, pink and scarlet", "Among the vegetable-ivory trees: find one of the rare orchids", { verb: "look closely" }),
lyRead("🌸 Orchids", lsQs("ivory", "cattleya") + lsrc("VIII"), "▶ Down to the brook"),
lySpot("The rock-studded pool", "Down to the brook, and the rock-studded pool"),
lyRead("🐟 Supper", lsQs("trout") + lsrc("VIII"), "▶ On"),
lyGo({ sc: "uplands", x: 0, z: 90 }, "North, to where the palms end: a yellow wall across the country", { r: 10 }),
lyRead("🎋 The bamboo", lsQs("bamboo", "yellowwall", "knifeedge") + lsrc("VIII"), "▶ Take the machete"),
lyUntil(function () { return (LSW.bamCut || 0) >= (LSW.bamLane || []).length && (LSW.bamLane || []).length > 0; }, { spot: "The wall of bamboo" }, "Cut a path through the bamboo: press E at the canes, walk on, and cut again", { on: function () { LSW.bamCut = 0; lswBamboo(0); var sp = LSW.spots.filter(function (s) { return s.name === "The wall of bamboo"; })[0]; if (sp)
sp.z = 74; } }),
lyRead("🐂 In the canes", lsQs("cattle") + lsrc("VIII"), "▶ Out the far side"),
lyGo({ sc: "uplands", x: 0, z: -140 }, "Out of the bamboo, at last, into the open", { r: 12 }),
lyGo({ sc: "uplands", x: 0, z: -290 }, "Across the plain of tree-ferns", { r: 14 }),
lyHold({ sc: "uplands", x: 0, z: -290 }, 5, "Challenger stops dead, and points to the right...", { r: 16, on: function () { lsbGreyBird(); } }),
lyRead("🦅 A huge grey bird", lsQs("graybird") + lsrc("VIII"), "▶ Turn to the others"),
lyTalk("Professor Challenger", "Challenger, beside himself", ["🦖 Did you see it?", lsQs("didyousee", "ptero1") + lsrc("VIII"), "▶ Summerlee?"]),
lyTalk("Professor Summerlee", "And Summerlee?", ["🦩 A stork", lsQs("fiddlestick") + lsrc("VIII"), "▶ Lord John?"]),
lyTalk("Lord John Roxton", "Lord John had it in his field-glass", ["🔭 Not a bird", lsQs("zeiss") + lsrc("VIII"), "▶ Go on"]),
lyPuzzle("🦖 Stork or pterodactyl?", "Challenger says pterodactyl; Summerlee says stork; Lord John, who has shot every bird there is, says it was no bird he ever saw. What do you believe?", ["A stork", "A pterodactyl", "Wait and see"], 2, ["Lord John, who knows birds, would not agree.", "Malone does not say so yet.", ""], { yes: "🦖 " + LSW_Q.pickets }),
lySpot("The whale-backed ridge", "Up the long whale-backed ridge"),
lySpot("The second ridge: the red cliffs in sight", "On over the second ridge: look north"),
lyRead("🟥 The red cliffs", lsQs("redcliffs", "peacock", "jose") + lsrc("VIII"), "▶ Down to the plain", { done: function () { lswGo("arrive", null, lsbPopulate); } })
] });
LSB_CH.push({ t: "Who could have foreseen it?", txt: 5, start: "arrive", jump: 1, tune: "largo", keep: ["chalk", "A stub of white chalk", "🖍️"],
words: "Malone is writing from the top of the plateau, trapped. A dreadful thing has happened. But first, how they came to the foot of the cliffs, and what they found there.",
intro: "The plain, seven miles from the cliffs",
cast: [lc("gec", { sc: "maple", x: 36, z: 66 }, { ry: Math.PI, until: 10 }), lc("summ", { sc: "maple", x: 44, z: 70 }, { ry: 2.6, until: 10 }), lc("john", { sc: "maple", x: 30, z: 72 }, { ry: -2.6, until: 10 }), lc("zambo", { sc: "maple", x: 52, z: 40 }, { ry: Math.PI }), lc("gomez", { sc: "maple", x: 26, z: 58 }, { ry: 1, until: 10 }), lc("manuel", { sc: "maple", x: 22, z: 62 }, { ry: 0.6, until: 10 }),
lc("gec", { sc: "maple", x: -376, z: 48 }, { key: "gec2", ry: Math.PI, from: 10, until: 20 }), lc("john", { sc: "maple", x: -372, z: 44 }, { key: "john2", ry: -1.6, from: 10, until: 20 }), lc("summ", { sc: "maple", x: -384, z: 50 }, { key: "summ2", ry: 1.6, from: 10, until: 20 }), lc("gomez", { sc: "maple", x: -390, z: 40 }, { key: "gomez2", ry: 1, from: 10, until: 20 }),
lc("gec", { sc: "maple", x: -1196, z: 30 }, { key: "gec3", ry: Math.PI, from: 20 }), lc("john", { sc: "maple", x: -1192, z: 26 }, { key: "john3", ry: -2.4, from: 20 }), lc("summ", { sc: "maple", x: -1204, z: 30 }, { key: "summ3", ry: 2.4, from: 20 }), lc("gomez", { sc: "maple", x: -1208, z: 34 }, { key: "gomez3", ry: 2, from: 20 })],
steps: [
{ k: "read" },
lyRead("📜 A dreadful thing", lsQs("dreadful", "moon") + lsrc("IX"), "▶ How it happened"),
lyGo("camp1", "Seven miles of plain: walk to the foot of the cliffs, under the pinnacle", { r: 12 }),
lySpot("The camp under the pinnacle", "Look about the camp, under the red wall"),
lySpot("The foot of the pinnacle", "Look up at the pinnacle"),
lyTalk("Professor Challenger", "Challenger: the tree on the pinnacle", ["🦖 \"It was on that\"", lsQs("perched", "stork") + lsrc("IX"), "▶ Go on"]),
lyTalk("Professor Summerlee", "The council of war: Summerlee has a plan", ["🗺️ A council of war", lsQs("council") + lsrc("IX"), "▶ Go on"]),
lyPuzzle("🗺️ Which way?", "Challenger explored the east side of the cliffs on his last journey and found no way up. Which way should they go?", ["East again", "West, along the foot of the cliffs", "Back to the river"], 1, ["He has done the east.", "", "Not after coming all this way."], { yes: "🗺️ Westward, along the base of the cliff." }),
lySpot("A great snake", "Something black and glistening comes out of the green at the cliff top: look"),
lyTalk("Professor Challenger", "Challenger takes Summerlee by the chin", ["🐍 Life on the plateau", lsQs("python", "chin") + lsrc("IX"), "▶ Westward"]),
lyGo("mwcamp", "West along the foot of the cliff, over the broken rocks", { r: 10 }),
lySpot("Maple White's old camp", "An old camp: search it"),
lySpot("The sign-post", "Lord John is looking at a tree-fern: what is nailed to it?"),
lyPuzzle("🪧 Which way?", "A slip of hard wood has been nailed to the tree-fern, pointing. Which way does it point?", ["Westward", "Up the cliff", "Back the way you came"], 0, ["", "No.", "No."], { yes: "🪧 " + LSW_Q.signpost }),
lyGo("colver", "Westward: a patch of high bamboo under the cliff", { r: 8 }),
lySpot("Something in the high bamboo", "Something in the bamboo: look"),
lyRead("💀 Who he was", "<p>" + lsQ("colver") + "</p><p>Lord John says he fell, or was thrown, from the top. A hush comes over them as they look up at the cliff overhanging the canes.</p>" + lsrc("IX"), "▶ Move off in silence"),
lyGo("arrow1", "On to the west, five miles of unbroken cliff", { r: 6 }),
lySpot("A chalk arrow", "A white arrow in chalk, in a hollow of the rock: look"),
lyPuzzle("🖍️ Chalk", "Challenger knows who drew the arrow. How?", ["Maple White's box of coloured chalks had the white one worn to a stump", "He saw him draw it", "It is signed"], 0, ["", "Maple White is long dead.", "No."], { yes: "🖍️ " + LSW_Q.stump }),
lyGo("cleft", "Follow the arrows: five more miles, to a cleft in the cliff", { r: 10 }),
lySpot("The mouth of the cleft", "Into the cleft: a narrow slit of sky above"),
lySpot("The cave in the cleft", "A cave, with an arrow beside it: in, with Lord John's torch")
] });
LSB_CH.push({ t: "A stolen supper", txt: 6, start: { sc: "maple", x: -1200, z: 24, ry: 0 }, jump: 1, tune: "largo", keep: ["apology", "Summerlee's apology, written down", "🤝"],
words: "The cave was blocked. And as they stood at the bottom of the cleft, a great rock came down. Then six days round the cliffs; the swamp; a supper at the fire; and Challenger, in the morning, with something to tell them.",
intro: "The bottom of the cleft",
cast: [lc("gec", { sc: "maple", x: -1196, z: 30 }, { ry: Math.PI, until: 6 }), lc("summ", { sc: "maple", x: -1204, z: 30 }, { ry: Math.PI, until: 6 }), lc("john", { sc: "maple", x: -1192, z: 26 }, { ry: -2.4, until: 6 }), lc("gomez", { sc: "maple", x: -1208, z: 34 }, { ry: 2, until: 6 }), lc("gomez", { sc: "maple", x: 30, z: 64 }, { key: "gomez2", ry: 2, from: 6 }),
lc("gec", { sc: "maple", x: 36, z: 58 }, { key: "gec2", ry: 2.6, from: 6 }), lc("summ", { sc: "maple", x: 42, z: 58 }, { key: "summ2", ry: -2.6, from: 6 }), lc("john", { sc: "maple", x: 34, z: 50 }, { key: "john2", ry: 2.2, from: 6 }), lc("zambo", { sc: "maple", x: 52, z: 40 }, { ry: Math.PI })],
state: { night: 1, nightFrom: 6, nightUntil: 13 },
steps: [
{ k: "read" },
lyHold({ sc: "maple", x: -1200, z: 24 }, 3, "Stand at the bottom of the cleft, a little group, forty feet below the cave...", { r: 10, on: function () { lsbBoulder(-1197, 22); } }),
lyRead("🪨 A huge rock", lsQs("hugerock") + "<p>Lord John climbs up to see whence it came: nothing but the green fringe at the top. Was it chance?</p>" + lsrc("IX"), "▶ On round the cliffs"),
lyGo("jaracaca", "Circle the plateau: two-and-twenty miles in a day, and then a swamp", { r: 40 }),
lySpot("The edge of the Jaracaca Swamp", "The swamp is alive with snakes: look, from the edge"),
lyRead("🐍 The swamp", lsQs("jaracaca", "threethousand", "begonia") + lsrc("IX"), "▶ Back to camp"),
lyGo("camp1", "Back to the camp under the pinnacle as night falls", { r: 10 }),
lyHold({ sc: "maple", x: 38, z: 56 }, 8, "Sit by the fire: Lord John has shot an ajouti, and it is cooking", { r: 5, on: function () { lsbSwoop("camp1"); } }),
lyRead("🦇 Out of the dark", lsQs("ajouti", "swish", "harpies") + lsrc("IX"), "▶ Summerlee speaks"),
lyTalk("Professor Summerlee", "Summerlee rises, very solemn", ["🤝 An apology", lsQs("apology", "stolen") + lsrc("IX"), "▶ Go on"]),
lyRead("💧 Where does the rain go?", lsQs("rain") + lsrc("IX"), "▶ Think"),
lyPuzzle("💧 Where does the rain go?", "No water runs down the cliffs anywhere round the plateau. So where does the rain go?", ["It runs inwards, to a lake in the middle", "It sinks into the rock", "It never rains there"], 0, ["", "Basalt does not drink water.", "It rains."], { yes: "💧 " + LSW_Q.lakecenter }),
lyHold({ sc: "maple", x: 40, z: 60 }, 10, "Sleep: the sixth day round, and back where you started. A disconsolate party.", { r: 8 }),
lyTalk("Professor Challenger", "In the morning: Challenger, shining with contentment", ["💡 Eureka!", lsQs("eureka") + "<p>For answer he points to the spire-like pinnacle.</p>" + lsrc("IX"), "▶ The pinnacle?"])
] });
function lsbIdx(C, id) { for (var i = 0; i < C.steps.length; i++)
if (C.steps[i].id === id)
return i; return 0; }
function lsbCh(C) {
var R = function (v) { return typeof v === "string" ? lsbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
LSB_CH.push(C);
return C;
}
function lsbStepAt(id) { var C = LSB_CH[lsbS().ch]; return C ? lsbS().s >= lsbIdx(C, id) : false; }
function lyId(id, step) { step.id = id; return step; }
function lsTop(x, z) { var P = { sc: "maple", x: x, z: z }; if (z > LSW_RIM_Z)
P.y = LSW_CLIFF_H; return P; }
function lsLedge(x, z) { return function () { return { sc: "maple", x: x, z: z, y: LSW_CAVE_Y }; }; }
lsbCh({ t: "A fitting subject for an historical picture", txt: 7, start: "pfoot", jump: 1, tune: "morning", keep: ["rope", "A coil of the strong light rope", "🪢"],
words: "Challenger has seen what none of them saw: the pinnacle can be climbed, and on its top stands a tree. Up the chimney, then; a hatchet; and the plateau, forty feet away across the gulf.",
intro: "The foot of the pinnacle",
state: { bridge: function (s) { var C = LSB_CH[lsbS().ch]; return s <= lsbIdx(C, "chop") ? 0 : s < lsbIdx(C, "gone") ? 1 : 2; }, rope: function (s) { return s >= lsbIdx(LSB_CH[lsbS().ch], "rope"); } },
cast: [lc("gec", { sc: "maple", x: 70, z: 30 }, { ry: Math.PI, until: "climb" }), lc("summ", { sc: "maple", x: 62, z: 32 }, { ry: 2.6, until: "climb" }), lc("john", { sc: "maple", x: 74, z: 34 }, { ry: -2.6, until: "climb" }), lc("zambo", { sc: "maple", x: 52, z: 40 }, { ry: Math.PI, until: "gone" }), lc("gomez", { sc: "maple", x: 44, z: 44 }, { ry: 2, until: "climb" }), lc("manuel", { sc: "maple", x: 40, z: 48 }, { ry: 2, until: "climb" }),
lc("gec", lsTop(64, 16), { key: "gec2", ry: Math.PI, from: "climb", until: "cross" }), lc("summ", lsTop(68, 17), { key: "summ2", ry: Math.PI, from: "climb", until: "cross" }), lc("john", lsTop(69, 13), { key: "john2", ry: Math.PI, from: "climb", until: "cross" }),
lc("gec", lsTop(62, -30), { key: "gec3", ry: 0, from: "cross" }), lc("summ", lsTop(70, -32), { key: "summ3", ry: -0.4, from: "cross" }), lc("john", lsTop(66, -22), { key: "john3", ry: 0, from: "cross" }),
lc("gomez", lsTop(66, 15), { key: "gomez2", ry: Math.PI, from: "gone", until: "after" }), lc("zambo", { sc: "maple", x: 66, z: 28 }, { key: "zambo2", ry: Math.PI, from: "after" })],
steps: [
{ k: "read" },
lyTalk("Professor Challenger", "Challenger, by the pinnacle, with a coil of rope", ["🪢 The rope", lsQs("bullfrog", "rope150") + lsrc("IX"), "▶ Look up"]),
lyPuzzle("🗼 The way up", "The pinnacle stands apart from the plateau, its top level with the plateau's edge. How can it help them?", ["Climb it, and look for a way across from its top", "Throw a rope to the plateau from its foot", "Shelter under it"], 0, ["", "No rope could be thrown so high.", "No."], { yes: "🗼 " + LSW_Q.spire }),
lySpot("The chimney up the pinnacle", "There is a chimney in the rock: press E at it, and climb"),
lyId("climb", lyRew("ptop", lsTop(65, 15), "Up the chimney, ledge by ledge (press E at each ledge), to the top of the pinnacle")),
lyRead("🧗 The top", lsQs("fingers", "brazil") + lsrc("IX"), "▶ Look across"),
lyTalk("Professor Challenger", "Challenger: across the gulf", ["🌳 Vestigia nulla retrorsum", lsQs("vestigia", "fortyfeet") + lsrc("IX"), "▶ Go on"]),
lyPuzzle("🌳 Forty feet", "Forty feet of gulf, and a hundred and fifty of drop below it. On the top of the pinnacle stands one good tree. What will you do?", ["Jump", "Fell the tree so that it falls across the gulf", "Go back down"], 1, ["Not forty feet.", "", "Challenger will not hear of it."], { yes: "🌳 " + LSW_Q.beech }),
lyTalk("Lord John Roxton", "Lord John hands you the hatchet", ["🪓 The hatchet", lsQs("thews") + lsrc("IX"), "▶ Take it"]),
lyId("chop", lyRew("felled", { spot: "The beech tree on the pinnacle" }, "Take the hatchet to the beech (press E at it, again and again), cutting on the side toward the gulf", { chop: 1 })),
lyRead("🌉 A bridge", lsQs("bridge") + lsrc("IX"), "▶ Who goes first?"),
lyTalk("Professor Challenger", "Challenger claims the honour", ["🎩 The first to cross", lsQs("historical") + lsrc("IX"), "▶ Lord John?"]),
lyTalk("Lord John Roxton", "Lord John has a word to say", ["🎯 Soldiering", lsQs("department") + lsrc("IX"), "▶ Go on"]),
lyId("cross", lyGo(lsTop(66, -22), "Walk across the beech trunk to the plateau: steady, and don't look down", { r: 6 })),
lyRead("🌿 At last", lsQs("atlast", "walked", "dreamland") + lsrc("IX"), "▶ A little way into the trees"),
lyHold(lsTop(64, -60), 6, "Walk a little way into the trees, all of you, and look about the new land", { r: 10 }),
lyId("gone", lyRead("💥 A crash behind", lsQs("prelude", "bridgegone") + lsrc("IX"), "▶ Back to the edge")),
lyGo(lsTop(66, -14), "Back to the edge: someone is on the top of the pinnacle", { r: 8 }),
lyTalk("Lord John Roxton", "Gomez is on the pinnacle: Lord John stands with his rifle", ["🗼 Gomez", "<p>It is Gomez, the river man, on the top of the pinnacle: he has heaved the beech over into the gulf. He shouts across that he is the brother of a man named Lopez, whom Lord John shot on the Putomayo River five years before, when Lord John put down the slave-drivers there; he has followed them all this way to have his revenge, and now he means to leave them to die on the plateau.</p>" + lsrc("IX"), "▶ Go on"]),
lyId("after", lyReadA("🗼 The end of Gomez", "<p>Gomez scrambled down the chimney to escape. Lord John ran along the edge to where he could see the foot of the pinnacle, and fired once. Gomez fell, and did not rise. Manuel, the other river man, fled across the plain; he was never seen again.</p><p>Lord John says no more about it than this: that it was justice, for Gomez had planned the death of all of them.</p>" + lsrc("IX"), "<p>Gomez climbed down the pinnacle and tried to run away; Lord John stopped him with his rifle, and Gomez was gone. Manuel, the other river man, ran off across the plain and was never seen again.</p>" + lsrc("IX"), "▶ And below?")),
lyTalk("Zambo", "Zambo, at the foot of the pinnacle, calling up", ["💪 Zambo", "<p>Down below, Zambo, the faithful, has come up from the camp: he will not leave them, whatever the others do. He climbs the pinnacle with the end of the long rope, and Lord John catches it across the gulf; with it, little by little, the stores are hauled over.</p>" + lsrc("IX"), "▶ Haul away"]),
lyId("rope", lyGather("load", lsTop(66, -16), 4, "A load of stores, hauled across on the rope", "Haul the stores across on the rope: bring the four loads in from the edge", { spread: 5, verb: "haul it in", eachSay: "Over safely." })),
lyRead("🌑 Cut off", lsQs("separate", "serenity", "apollinaris", "hopeless") + lsrc("IX"), "▶ Sleep at the cliff's edge")
] });
lsbCh({ t: "The most wonderful things have happened", txt: 8, start: lsTop(62, -30), jump: 1, tune: "morning", keep: ["track", "A cast of the great three-toed track", "🦶"],
state: { bridge: 2, rope: 1 },
words: "The first morning on the plateau. A glade with a spring, a great gingko tree, and a ring of thorns: Fort Challenger. Then out, very quietly, to see what made the tracks in the mud.",
intro: "The edge of the plateau, in the morning",
cast: [lc("gec", lsTop(62, -30), { ry: 0, until: "walk" }), lc("summ", lsTop(70, -32), { ry: -0.4, until: "walk" }), lc("john", lsTop(66, -24), { ry: 0, until: "walk" }),
lc("gec", { sc: "maple", x: 16, z: -92 }, { key: "gec2", ry: 0.4, from: "walk", until: "out" }), lc("summ", { sc: "maple", x: 24, z: -94 }, { key: "summ2", ry: -0.4, from: "walk", until: "out" }), lc("john", { sc: "maple", x: 20, z: -84 }, { key: "john2", ry: Math.PI, from: "walk", until: "out" }),
lc("gec", { sc: "maple", x: -56, z: -318 }, { key: "gec3", ry: Math.PI, from: "glade" }), lc("summ", { sc: "maple", x: -62, z: -316 }, { key: "summ3", ry: Math.PI, from: "glade" }), lc("john", { sc: "maple", x: -50, z: -320 }, { key: "john3", ry: Math.PI, from: "glade" }),
lc("zambo", { sc: "maple", x: 66, z: 28 }, { ry: Math.PI })],
steps: [
{ k: "read" },
lyRead("📓 Five note-books", lsQs("wonderful", "fivebooks") + lsrc("X"), "▶ Something bites"),
lyTalk("Professor Challenger", "Something is biting Malone's leg: Challenger looks", ["🔬 Ixodes Maloni", lsQs("maloni", "scieye") + lsrc("X"), "▶ Go on"]),
lyPuzzle("🔬 The tick", "Challenger names the new tick after you. Why is Malone not pleased?", ["It is the size of a bean, and it is full of his blood", "He wanted it named after Gladys", "He hates Latin"], 0, ["", "He has other things in mind.", "No."], { yes: "🔬 A new species, and the honour of a name. Malone scratches." }),
lyId("walk", lyGo("fort", "Into the woods, to a glade with a spring in it: the place for a camp", { r: 8 })),
lyGather("thorn", "fort", 6, "An armful of thorn bushes", "Cut thorny bushes with hatchet and knives, and pile them round the glade: six armfuls", { spread: 10, verb: "cut it", eachSay: "On the ring." }),
lySpot("Fort Challenger", "Look about the new fort"),
lyTalk("Lord John Roxton", "Lord John: the rules of the fort", ["🤫 Lie low", lsQs("liebow", "neverfire") + lsrc("X"), "▶ Go on"]),
lySpot("The spring by the fort", "Drink at the spring"),
lyPuzzle("📦 The stores", "What have they got to keep them alive on the plateau?", ["Four rifles, a shot-gun, and one thousand three hundred rounds", "Nothing but their knives", "A month's tinned food and a boat"], 0, ["", "They hauled the stores over on the rope.", "No boat."], { yes: "📦 " + LSW_Q.stores1300 }),
lyTalk("Professor Challenger", "What shall it be called?", ["🗺️ A name for the land", lsQs("maplename", "cycad") + lsrc("X"), "▶ Go on"]),
lyId("out", lyGo("bog", "Out of the fort, very quietly, all four: through the wood to a bog of high reeds", { r: 12 })),
lySpot("The great three-toed tracks", "Something has walked here: look at the mud"),
lyPuzzle("🦶 Three toes", "An enormous three-toed track, and the beast walked on two legs only. Lord John says: the father of all birds. What does Challenger say?", ["A bird, a very big one", "Not a bird: a reptile, a dinosaur", "A man"], 1, ["\"Not a bird, my dear Roxton.\"", "", ""], { yes: "🦶 " + LSW_Q.notbird }),
lyId("glade", lyGo({ sc: "maple", x: -60, z: -310 }, "Follow the tracks, creeping through the bushes, to the edge of a glade", { r: 10 })),
lyHold({ sc: "maple", x: -60, z: -310 }, 20, "Lie in the bushes and watch the glade: do not move", { r: 10 }),
lyRead("🦖 Five of them", lsQs("five", "slate", "kangaroos", "sapling") + lsrc("X"), "▶ The Professors"),
lyTalk("Professor Summerlee", "Summerlee and Challenger, in raptures", ["🦖 Iguanodons", lsQs("nunc", "faked", "hastings") + lsrc("X"), "▶ Lord John"]),
lyTalk("Lord John Roxton", "Lord John is thinking about something else", ["🎯 Thin ice", lsQs("thinice") + lsrc("X"), "▶ Go on"]),
lyRead("📅 August the twenty-eighth", "<p>" + lsQ("aug28") + "</p>" + lsrc("X"), "▶ On")
] });
lsbCh({ t: "Make for the wood and keep together", txt: 9, start: { sc: "maple", x: -60, z: -310, ry: Math.PI }, jump: 1, tune: "chase", keep: ["ptwing", "A stiff grey feather of membrane", "🦇"],
state: { bridge: 2, rope: 1 },
words: "On through the woods, eastward, until a strange gabbling and whistling fills the air; Challenger leads them to the lip of a hollow, and they look over.",
intro: "The woods beyond the glade",
cast: [lc("gec", { sc: "maple", x: 214, z: -296 }, { ry: Math.PI, until: "run" }), lc("summ", { sc: "maple", x: 224, z: -296 }, { ry: Math.PI, until: "run" }), lc("john", { sc: "maple", x: 230, z: -292 }, { ry: Math.PI, until: "run" }),
lc("gec", { sc: "maple", x: 146, z: -232 }, { key: "gec2", ry: 0.6, from: "run", until: "home" }), lc("summ", { sc: "maple", x: 154, z: -226 }, { key: "summ2", ry: 0.2, from: "run", until: "home" }), lc("john", { sc: "maple", x: 140, z: -226 }, { key: "john2", ry: -0.4, from: "run", until: "home" }),
lc("gec", { sc: "maple", x: 16, z: -92 }, { key: "gec3", ry: 0.4, from: "home" }), lc("summ", { sc: "maple", x: 24, z: -94 }, { key: "summ3", ry: -0.4, from: "home" }), lc("john", { sc: "maple", x: 20, z: -84 }, { key: "john3", ry: Math.PI, from: "home" })],
steps: [
{ k: "read" },
lyGo("swrim", "Eastward through the woods: a strange low gabbling and whistling ahead", { r: 14 }),
lyRead("🔊 A sound", lsQs("gabbling") + lsrc("X"), "▶ Creep to the edge"),
lySpot("The rocks above the pterodactyl swamp", "Creep to the rocks, and look over into the hollow"),
lyRead("🦇 The rookery", lsQs("rookery", "oldwomen") + lsrc("X"), "▶ Challenger leans out"),
lyTalk("Professor Challenger", "Challenger is leaning out to see better", ["🦇 The Greensand", lsQs("greensand") + "<p>Challenger, in his delight, stands up to look; and a sentinel among the creatures gives a sharp, whistling cry.</p>" + lsrc("X"), "▶ Look out!"]),
lyId("run", lyGo({ sc: "maple", x: 148, z: -230 }, "They are up and flying! MAKE FOR THE WOOD, under the trees, and keep together", { r: 9, on: function () { lsbPteroAttack(true); }, done: function () { lsbPteroAttack(false); } })),
lyRead("🌳 Under the branches", lsQs("hendon", "makewood", "nospace") + lsrc("X"), "▶ Look up"),
lyHold({ sc: "maple", x: 148, z: -230 }, 6, "Stay under the trees until they give it up", { r: 12 }),
lyRead("🐦 Like wood-pigeons", lsQs("woodpigeons", "informed", "heel") + lsrc("X"), "▶ Back to the fort"),
lyId("home", lyGo("fort", "Back to the fort, Challenger nursing his arm", { r: 8 })),
lyRead("👣 Someone has been here", lsQs("visited", "matchwood") + lsrc("X"), "▶ Think"),
lyPuzzle("👣 Who came?", "The gate was untouched, the walls unbroken, and yet the stores were scattered and a case of cartridges smashed. What does it mean?", ["Something huge stepped over the thorns", "Gomez came back", "The wind"], 0, ["", "Gomez is gone.", "No wind did that."], { yes: "👣 Something with a long reach and a great weight, which could step clean over the fence." }),
lyRead("👀 Watched", lsQs("observed", "violetline") + lsrc("X"), "▶ Go on"),
lyTalk("Professor Challenger", "Challenger is muttering to himself", ["🔵 Blue clay", lsQs("bluesoil", "muttered") + lsrc("X"), "▶ Go on"])
] });
lsbCh({ t: "The thing at the thorn fence", txt: 10, start: "fort", jump: 1, tune: "night", keep: ["brand", "A charred stick from Lord John's fire", "🔥"],
state: { bridge: 2, rope: 1, night: 1, nightUntil: "morning", gateShut: 1 },
words: "That night, in Fort Challenger, something screams in the forest; and then something comes to the gate.",
intro: "Fort Challenger, at night",
cast: [lc("gec", { sc: "maple", x: 16, z: -92 }, { ry: 0.4 }), lc("summ", { sc: "maple", x: 24, z: -94 }, { ry: -0.4 }), lc("john", { sc: "maple", x: 22, z: -84 }, { ry: Math.PI })],
steps: [
{ k: "read" },
lyHold({ sc: "maple", x: 20, z: -88 }, 10, "Sleep round the dying fire", { r: 6 }),
lyRead("😱 A cry in the dark", lsQs("cries") + lsrc("XI"), "▶ Challenger"),
lyTalk("Professor Challenger", "Challenger, quite calm", ["🦖 A prehistoric tragedy", lsQs("jurassic") + lsrc("XI"), "▶ Listen"]),
lyHold({ sc: "maple", x: 20, z: -84 }, 6, "Listen: something is coming through the wood, toward the gate", { r: 8, on: function () { lsbToad("gate", { sc: "maple", x: 20, z: -68 }); } }),
lyRead("🐾 Pat-pat", lsQs("patpat", "horse") + lsrc("XI"), "▶ Lord John"),
lyTalk("Lord John Roxton", "Lord John: don't fire!", ["🤫 Don't fire", lsQs("dontfire") + lsrc("XI"), "▶ What will he do?"]),
lyPuzzle("🔥 What will scare it?", "If the guns may not be fired, what will drive the thing from the gate?", ["Shout at it", "A burning branch from the fire", "Throw stones"], 1, ["It might come in.", "", "No."], { yes: "🔥 Lord John has already snatched a blazing branch from the fire." }),
lyFind("wood", { sc: "maple", x: 20, z: -88 }, "A blazing branch from the fire", "Take a blazing branch from the fire, as Lord John does", { verb: "snatch it up" }),
lyHold({ sc: "maple", x: 20, z: -77 }, 3, "To the gate, the fire in your hand, and thrust it in the thing's face", { r: 3 }),
lyRead("🔥 Like a giant toad", lsQs("brave", "toad") + "<p>With a crash it is gone, back into the dark.</p>" + lsrc("XI"), "▶ Go on", { done: function () { lsbToad("off"); } }),
lyTalk("Professor Summerlee", "What was it? The Professors cannot agree", ["🦖 Which?", lsQs("allosaurus", "sentinel") + lsrc("XI"), "▶ Keep watch"]),
lyHold({ sc: "maple", x: 20, z: -84 }, 12, "Your two-hour spell: keep watch at the gate until dawn", { r: 5 }),
lyId("morning", lyGo({ sc: "maple", x: -62, z: -318 }, "Morning: out to the glade of the iguanodons, where the screaming came from", { r: 10 })),
lyRead("⚫ The dead iguanodon", lsQs("asphaltmark") + "<p>One of the gentle creatures has been killed in the night by the thing that came to the gate.</p>" + lsrc("XI"), "▶ Think"),
lyPuzzle("⚫ The black mark", "The iguanodon has a black circle of something like asphalt above its shoulder, as if painted on. What could make it?", ["Someone marks them, the way a farmer marks cattle", "A burn from a volcano", "Its own colouring"], 0, ["", "", ""], { yes: "⚫ None of them can tell yet. Hold on to that thought: the plateau has an owner of some kind." }),
lyRead("🗺️ An English county", lsQs("county", "check", "maynot") + lsrc("XI"), "▶ Out to look for food"),
lyRead("🌸 Flowers", lsQs("primflowers", "bee") + lsrc("XI"), "▶ Gather fruit"),
lyPuzzle("🍈 Which fruit is safe?", "There are fruits on every bush, and some may be poison. How do they choose?", ["Eat the ones the birds have pecked", "Eat the biggest ones", "Eat none"], 0, ["", "", "They must eat something."], { yes: "🍈 " + LSW_Q.pecked }),
lyGather("fruit", { sc: "maple", x: -20, z: -150 }, 5, "A ripe fruit, pecked by the birds", "Gather five of the pecked fruits for the fort", { spread: 12, verb: "pick it", eachSay: "Pecked: safe." }),
lyRead("🦌 An elk", lsQs("irishelk") + lsrc("XI"), "▶ Back to the fort")
] });
var lsGk = function (dy) { return function () { var G = LSW.gingko; return G ? { sc: "maple", x: G.x + 1.2, z: G.z, y: G.y + (dy || 30) } : null; }; };
lsbCh({ t: "For once I was the hero", txt: 11, start: "fort", jump: 1, tune: "swan", keep: ["chart", "Malone's chart of the plateau, from the gingko", "🗺️"],
state: { bridge: 2, rope: 1 },
words: "How to get out? Malone looks up at the great gingko over the fort, and has an idea: from its top, he could see the whole plateau.",
intro: "Fort Challenger, the gingko over it",
cast: [lc("gec", { sc: "maple", x: 16, z: -92 }, { ry: 0.4 }), lc("summ", { sc: "maple", x: 24, z: -94 }, { ry: -0.4 }), lc("john", { sc: "maple", x: 22, z: -84 }, { ry: Math.PI }),
{ k: "apeface", at: lsGk(29.6), dress: "lsape", name: "A face in the leaves", mute: 1, ox: -0.3, oz: -1.4, ry: 0, from: "face", until: "chart" }],
steps: [
{ k: "read" },
lyTalk("Lord John Roxton", "Lord John: the point is getting out", ["🚪 Getting out", lsQs("getout") + lsrc("XI"), "▶ Look at the gingko"]),
lyRead("🌳 A watch-tower", lsQs("gingkotree", "watchtower", "irishlad") + lsrc("XI"), "▶ Climb"),
lyTalk("Professor Challenger", "Challenger gives you a leg up", ["🤚 A thrust", lsQs("thrust") + lsrc("XI"), "▶ Up"]),
lyRew("gingko", "gingko", "Climb the gingko (press E at its foot)"),
lyId("face", lyHold(lsGk(30), 3, "Near the top: part the leaves, and look...", { r: 4 })),
lyRead("😮 A face", lsQs("face", "apeface") + "<p>Then it is gone, with a crash of branches below.</p>" + lsrc("XI"), "▶ Climb on, to the very top"),
lyId("chart", lyRead("🌍 The whole plateau", lsQs("oval", "funnel", "longdark", "cavemouths") + lsrc("XI"), "▶ Draw it")),
lyPuzzle("🗺️ Draw the chart", "On your chart: where is the great lake?", ["In the middle of the funnel, the lowest place, where all the rain runs", "Along the edge by the pinnacle", "There is no lake"], 0, ["", "Look again: the land slopes inward.", "Look again."], { yes: "🗺️ The lake lies in the middle, as Challenger said it must; and on the far side, red cliffs with caves in them." }),
lyPuzzle("🗺️ The caves", "Along the red cliffs on the far side of the lake, you see dark openings, and something more. What is it that makes you think of people?", ["Smoke, and the glint of fires in the cave mouths", "Boats", "A flag"], 0, ["", "Not yet.", "No."], { yes: "🗺️ Fires: there are people on the plateau." }),
lyHold(lsGk(30), 8, "Sit in the top of the gingko and finish the chart, while the light holds", { r: 4 }),
lySpot("The way down the gingko", "Climb down"),
lyTalk("Professor Summerlee", "Summerlee is impressed: show them the chart", ["🐒 The face", lsQs("missing", "inkpots") + lsrc("XI"), "▶ The chart"]),
lyTalk("Professor Challenger", "And the lake must have a name", ["💛 A name", lsQs("lakegladys", "boys") + lsrc("XI"), "▶ Go on"]),
lyPuzzle("💛 A name for the lake", "What does Malone name the lake?", ["Lake Challenger", "Lake Gladys", "Lake Maple White"], 1, ["Not his.", "", "Not his."], { yes: "💛 Lake Gladys let it be." }),
lyRead("🏆 The hero", lsQs("hero") + lsrc("XI"), "▶ Night comes")
] });
lsbCh({ t: "Alone by moonlight", txt: 12, start: { sc: "maple", x: 22, z: -86, ry: Math.PI }, jump: 1, tune: "swan", keep: ["moon", "A moonlit view of Lake Gladys", "🌕"],
state: { bridge: 2, rope: 1, night: 1 },
words: "Malone is on watch; Summerlee nods by the fire. The full moon is up, and Lake Gladys is only a few miles away. What a night for a walk.",
intro: "Fort Challenger, Malone's watch",
cast: [lc("summ", { sc: "maple", x: 18, z: -86 }, { ry: 0.4, lie: 0 }), lc("gec", { sc: "maple", x: 16, z: -94 }, { ry: 0, lie: 1 }), lc("john", { sc: "maple", x: 24, z: -95 }, { ry: 0, lie: 1 })],
steps: [
{ k: "read" },
lyRead("🌕 What a night", lsQs("whynot", "heroisms", "nodding") + lsrc("XII"), "▶ Slip out"),
lyGo({ sc: "maple", x: 20, z: -68 }, "Slip out through the gate, very quietly", { r: 4 }),
lyRead("🌲 The forest", lsQs("dreadforest") + lsrc("XII"), "▶ Hold the gun close"),
lyPuzzle("🔫 Which gun?", "Halfway through the dark wood, you look at the gun in your hands. What did you take from the fort?", ["The rifle", "The shot-gun", "Lord John's elephant gun"], 1, ["Look again.", "", "Look again."], { yes: "🔫 " + LSW_Q.shotgun }),
lyPuzzle("🌊 Which way?", "How will you find the lake, and then the fort again, at night in a strange forest?", ["Follow the brook down to the lake, and back up it home", "Steer by the moon", "Shout for help"], 0, ["", "The moon moves.", "Never."], { yes: "🌊 " + LSW_Q.brookguide }),
lyGo({ sc: "maple", x: -110, z: -500 }, "Follow the brook down, through the dark wood", { r: 14, on: function () { lsbSwoop({ sc: "maple", x: -60, z: -360 }); } }),
lyRead("🦇 Against the moon", lsQs("skeleton") + lsrc("XII"), "▶ Something bubbles"),
lySpot("The asphalt pool", "A sound like a boiling kettle: look"),
lyGo("lakeS", "Down at last to the shore of the lake", { r: 14 }),
lyRead("🌊 One in the morning", lsQs("oneam", "quicksilver") + lsrc("XII"), "▶ Look across"),
lySpot("The south shore of Lake Gladys", "Look across Lake Gladys"),
lyPuzzle("🔴 Lights", "Across the lake, under the far cliffs, there are discs of red light in the cliff face, like portholes. What are they?", ["Fires in caves, so there are people", "Volcanoes", "Fireflies"], 0, ["", "Too regular.", "Too steady."], { yes: "🔴 " + LSW_Q.humans }),
lySpot("The block of lava by the drinking-place", "Hide behind the block of lava by the drinking-place, and watch"),
lyHold("lava", 14, "Keep still behind the rock: things are coming down to drink", { r: 6 }),
lyRead("🦌 At the drinking-place", lsQs("armadillos", "deer", "stego", "hackles") + lsrc("XII"), "▶ What was it?"),
lyPuzzle("🦕 The plates on its back", "A huge thing with a double row of great plates down its back, the creature from Maple White's sketch-book. What is it?", ["A stegosaurus", "An iguanodon", "A plesiosaurus"], 0, ["", "The iguanodons have no plates.", "That lives in the water."], { yes: "🦕 The stegosaurus: Maple White drew it from the life." }),
lyRead("⌚ Half-past two", lsQs("halfpast") + lsrc("XII"), "▶ Back up the brook")
] });
lsbCh({ t: "It was smelling out my trail", txt: 13, start: { sc: "maple", x: -60, z: -330, ry: 0 }, jump: 1, tune: "chase", keep: ["pitstake", "A splinter of the stake in the pit", "🕳️"],
state: { bridge: 2, rope: 1, night: 1, nightUntil: "dawn" },
words: "Half-way home, by the glade of the iguanodons, Malone hears something in the bushes behind him.",
intro: "The glade, half-past two in the morning",
cast: [lc("zambo", { sc: "maple", x: 66, z: 28 }, { ry: Math.PI, from: "dawn" })],
steps: [
{ k: "read" },
lyHold({ sc: "maple", x: -60, z: -330 }, 4, "Stop: listen", { r: 12 }),
lyRead("🐸 A snore", lsQs("snore") + lsrc("XII"), "▶ Look back"),
lyHold({ sc: "maple", x: -60, z: -330 }, 3, "Look back the way you came...", { r: 14, on: function () { lsbToad("chase", { sc: "maple", x: -60, z: -300 }); } }),
lyRead("🦖 It hopped", lsQs("hopped", "smelling") + lsrc("XII"), "▶ RUN"),
lyGo({ sc: "maple", x: -46, z: -430 }, "RUN! It is following your trail: south, away from it, through the trees", { r: 10 }),
lyRead("🏃 A path", lsQs("beatenpath") + lsrc("XII"), "▶ Down the path"),
lyGo("pit", "Down the beaten path, as fast as you can go", { r: 4, done: function () { lsbToad("off"); } }),
lyRead("🕳️ Falling", lsQs("falling") + lsrc("XII"), "▶ Wake"),
lySpot("The pit", "At the bottom of a pit. Look about you"),
lyPuzzle("🕳️ What is this pit?", "Steep sides, and a sharpened stake set upright in the middle of the floor, its point black with old blood. What is it?", ["A trap, made by the hand of man", "A natural hole", "An old well"], 0, ["", "A stake is not natural.", "No well."], { yes: "🕳️ " + LSW_Q.trap + " " + LSW_Q.master }),
lyId("dawn", lyHold("pit", 8, "Climb out at first light, by the rough sides, and listen: is it gone?", { r: 6 })),
lyRead("🔫 A shot", lsQs("riflesshot") + lsrc("XII"), "▶ Run to the fort"),
lyGo({ sc: "maple", x: 20, z: -72 }, "Back up the brook to the fort, as fast as you can", { r: 6 }),
lyRead("🌵 The empty fort", lsQs("gateopen", "disappeared") + lsrc("XII"), "▶ Search"),
lyFind("note", { sc: "maple", x: 18, z: -88 }, "Nothing but scattered stores, and Lord John's rifle gone", "Search the fort for any sign", { verb: "look" }),
lyRead("🧒 Alone", lsQs("child") + lsrc("XII"), "▶ Zambo"),
lyGo(lsTop(66, -12), "To the edge of the gulf: Zambo is still at the foot of the pinnacle", { r: 8 }),
lyRead("📜 To Zambo", lsQs("sovereigns", "onelight") + lsrc("XII"), "▶ Back to the fort"),
lyGo("fort", "Back into the fort, as night comes again", { r: 8 }),
lyRead("🔥 Three fires", lsQs("threefires") + lsrc("XII"), "▶ Wait")
] });
lsbCh({ t: "Quick, young fellah!", txt: 14, start: "fort", jump: 1, tune: "chase", keep: ["rifle", "Lord John's spare rifle", "🎯"],
state: { bridge: 2, rope: 1 },
words: "In the grey of the morning, someone comes running to the fort: Lord John Roxton, ragged, with a rifle in his hand.",
intro: "Fort Challenger, at dawn",
cast: [lc("john", { sc: "maple", x: 20, z: -74 }, { ry: Math.PI, until: "hide" }), lc("john", { sc: "maple", x: -158, z: -142 }, { key: "john2", ry: 0.6, from: "hide" })],
steps: [
{ k: "read" },
lyTalk("Lord John Roxton", "Lord John Roxton, at the gate", ["🏃 Quick!", lsQs("quick") + lsrc("XIII"), "▶ The rifles"]),
lyGather("rifle", "fort", 2, "A rifle", "Get the rifles, both of them, and the cartridges", { spread: 6, verb: "take it", eachSay: "Got it." }),
lyFind("load", { sc: "maple", x: 23, z: -84 }, "The cartridge-belts", "And the cartridges", { verb: "sling them on" }),
lyId("hide", lyGo("hide", "Out, quick, to the hiding place Lord John knows: a thick patch of brushwood", { r: 6 })),
lySpot("The brushwood hiding-place", "Down into the brushwood, and get your breath"),
lyTalk("Lord John Roxton", "Lord John tells it: what happened in the night", ["🐒 It rained apes", lsQs("rainedapes", "redchall") + lsrc("XIII"), "▶ Go on"]),
lyTalk("Lord John Roxton", "They carried them off", ["👑 Their town", lsQs("emperor", "castanets", "thousandhuts") + lsrc("XIII"), "▶ Go on"]),
lyTalk("Lord John Roxton", "And Challenger?", ["🎶 Ring out, wild bells", lsQs("wildbells") + lsrc("XIII"), "▶ How did you get away?"]),
lyReadA("🌳 Lord John's escape", "<p>The ape-men held the four of them in their town of huts at the edge of the cliff. In the morning they led out their Indian prisoners to the cliff edge, a terrible thing, which Lord John saw and will not forget. While the ape-men were busy at it, Lord John broke free, fought his way through, and ran for the fort.</p>" + lsrc("XIII"), "<p>The ape-men held the four of them in their town at the edge of the cliff, with some Indian prisoners. Lord John broke free while the ape-men were busy, and ran for the fort.</p>" + lsrc("XIII"), "▶ The others?"),
lyTalk("Lord John Roxton", "What Lord John has learned", ["🗺️ Two peoples", lsQs("twosides") + lsrc("XIII"), "▶ How to fight them?"]),
lyPuzzle("🌳 Where can you beat them?", "Lord John has seen how the ape-men move. Where are they masters, and where are they weak?", ["Masters in the trees; weak on open ground, where a man can outrun them", "Masters on open ground; weak in the trees", "They have no weakness"], 0, ["", "The other way round.", "Lord John has found one."], { yes: "🌳 " + LSW_Q.bandy }),
lyTalk("Lord John Roxton", "Lord John's plan", ["🎯 Our masters", lsQs("open") + "<p>We go for them now, he says, before they do what they did to the Indians to our friends.</p>" + lsrc("XIII"), "▶ To Ape Town"])
] });
lsbCh({ t: "Ape Town", txt: 15, start: "hide", jump: 1, tune: "chase", keep: ["apehair", "A tuft of red hair from Ape Town", "🐒"],
state: { bridge: 2, rope: 1 },
words: "Through the woods to the cliff's edge, where the ape-men have their town of huts in the trees, and a clearing that ends at the cliff.",
intro: "The brushwood hiding-place",
cast: [lc("john", { sc: "maple", x: -446, z: -106 }, { ry: Math.PI * 0.9, until: "fire" }),
lc("gec", { sc: "maple", x: -566, z: -66 }, { key: "gecc", ry: 0, until: "fire" }), lc("summ", { sc: "maple", x: -556, z: -66 }, { key: "summc", ry: 0, until: "fire" }),
{ k: "acc1", at: { sc: "maple", x: -548, z: -62 }, dress: "lsacc", skin: 0xA06A44, hair: 0x0E0E0E, name: "A young Accala", persona: "acc", greet: "(He looks at you, wide-eyed.)", ry: 0.3, until: "fire" },
lc("gec", { sc: "maple", x: -160, z: -146 }, { key: "gec2", ry: 0.4, from: "safe" }), lc("summ", { sc: "maple", x: -164, z: -140 }, { key: "summ2", ry: 1.2, from: "safe" }), lc("john", { sc: "maple", x: -154, z: -138 }, { key: "john2", ry: -0.6, from: "safe" }),
{ k: "acc2", key: "acc2", at: { sc: "maple", x: -150, z: -148 }, dress: "lsacc", skin: 0xA06A44, hair: 0x0E0E0E, name: "A young Accala", persona: "acc", greet: "(He touches his breast and smiles.)", ry: -0.6, from: "safe" }],
steps: [
{ k: "read" },
lyGo("apelook", "Creep through the woods, Lord John leading, to the bushes above the clearing", { r: 8 }),
lySpot("The bushes above the clearing", "Down into the bushes, and look"),
lyRead("🏘️ Ape Town", lsQs("rookhuts") + lsrc("XIII"), "▶ The clearing"),
lyReadA("🌳 The clearing", "<p>" + lsQ("neverforget") + "</p><p>The ape-men have led their Indian prisoners to the edge of the cliff, and one by one they are being thrown from it. Malone sees it, and the book tells it, but it is not shown here.</p><p>Challenger and Summerlee stand among the ape-men, held fast, and the young Indian beside them is next.</p>" + lsrc("XIII"), "<p>" + lsQ("neverforget") + "</p><p>The ape-men are doing a cruel thing to their Indian prisoners at the edge of the cliff. Challenger and Summerlee stand among them, held fast, with a young Indian beside them.</p>" + lsrc("XIII"), "▶ Look"),
lyRead("🙏 Pleading", lsQs("pleading") + lsrc("XIII"), "▶ Lord John"),
lyTalk("Lord John Roxton", "Lord John is cocking his rifle", ["🎯 Now", "<p>\"Now, young fellah,\" says Lord John. On his word, they fire into the ape-men round the prisoners.</p>" + lsrc("XIII"), "▶ Fire"]),
lyId("fire", lyHold("apelook", 3, "Fire! and again: the ape-men scatter in a howling panic", { r: 8, on: function () { (LSW.apes || []).forEach(function (A) { if (A && A.o)
A.o.flee = 1; }); } })),
lyGo({ sc: "maple", x: -450, z: -40 }, "Run! down into the clearing, the prisoners loose, and away across the open ground", { r: 14 }),
lyGo({ sc: "maple", x: -260, z: -90 }, "Keep to the open: they cannot run as fast as a man there", { r: 14 }),
lyId("safe", lyGo("hide", "Back to the brushwood hiding-place", { r: 6 })),
lyTalk("Professor Challenger", "Challenger, rubbing his arms", ["👑 Admirable!", lsQs("admirable", "handsome") + lsrc("XIII"), "▶ Summerlee"]),
lyTalk("Professor Summerlee", "Summerlee is not so sure", ["🙄 Handsome?", lsQs("remarkable") + lsrc("XIII"), "▶ The young Indian"]),
lyTalk("A young Accala", "The young Indian you saved", ["🤝 The young Indian", "<p>He is a fine young man, slender and straight, with a ring of gold in his ear. By signs he tells them that his people live across the lake, under the cliffs where you saw the fires; that the ape-men are their enemies; and that his own people will be grateful.</p>" + lsrc("XIII"), "▶ Go on"]),
lyTalk("Lord John Roxton", "Lord John: what now?", ["🌊 We'll see them safe", lsQs("seethemsafe", "twentymiles") + lsrc("XIII"), "▶ Go on"])
] });
var LSW_ACCX = [[-6, -460, 0], [8, -462, -0.2], [16, -458, -0.4], [-14, -458, 0.2]];
lsbCh({ t: "Accala", txt: 16, start: "hide", jump: 1, tune: "aquarium", keep: ["earring", "A little ring of gold, from the Accala", "💍"],
state: { bridge: 2, rope: 1 },
words: "The rescued Indians lead them down to the lake. Their people have heard; they are coming.",
intro: "The brushwood hiding-place",
cast: [lc("gec", { sc: "maple", x: 30, z: -450 }, { ry: Math.PI }), lc("summ", { sc: "maple", x: 36, z: -452 }, { ry: Math.PI }), lc("john", { sc: "maple", x: 44, z: -450 }, { ry: Math.PI }),
{ k: "acc1", at: { sc: "maple", x: 24, z: -454 }, dress: "lsacc", skin: 0xA06A44, hair: 0x0E0E0E, name: "A young Accala", persona: "acc", greet: "(He smiles: \"Accala.\")", ry: Math.PI },
{ k: "mr", key: "mr", at: { sc: "maple", x: 34, z: -466 }, dress: "lsacc", skin: 0xB07A52, hair: 0x0E0E0E, name: "Maretas", persona: "maretas", greet: "\"Maretas.\" (He puts his hand upon his breast.)", ry: 0, from: "chief" }].concat(LSW_ACCX.map(function (q, i) { return { k: "accx" + i, key: "accx" + i, at: { sc: "maple", x: 30 + q[0], z: q[1] }, dress: "lsacc", skin: [0x9A6440, 0xA87050, 0x8A5A38, 0xB07A52][i], hair: 0x0E0E0E, name: "An Accala warrior", persona: "acc", greet: "(He raises his spear in greeting.)", ry: q[2], from: "chief" }; })),
steps: [
{ k: "read" },
lyGo("lakeS", "Down through the woods with the four Indians to the shore of Lake Gladys", { r: 14 }),
lyTalk("A young Accala", "The young Indian, by the water", ["🗣️ Accala", lsQs("accala", "doda") + lsrc("XIV"), "▶ Go on"]),
lyPuzzle("🗣️ Their words", "The Indians point to each other and say \"Accala\"; they point to the woods behind them, shudder, and say another word. What does it mean?", ["The ape-men, their enemies", "The lake", "Home"], 0, ["", "", ""], { yes: "🗣️ Doda: the ape-men." }),
lyRead("🧥 Three tramps", lsQs("surrey") + lsrc("XIV"), "▶ Look at the lake"),
lyHold("lakeS", 8, "Watch the water: something is coming over the glassy lake", { r: 14 }),
lyId("chief", lyRead("🛶 A flotilla", lsQs("flotilla", "embraced") + lsrc("XIV"), "▶ The chief")),
lyTalk("Maretas", "The chief: the young man's father", ["👑 Maretas", lsQs("maretas") + lsrc("XIV"), "▶ He speaks"]),
lyPuzzle("👑 Who is Maretas?", "Who is the man who runs from the canoes to embrace the youth you saved?", ["His father, the chief of the Accala", "A slave", "An ape-man"], 0, ["", "", ""], { yes: "👑 Maretas, the chief; the youth is his son." }),
lyRead("📣 The harangue", lsQs("harangue") + lsrc("XIV"), "▶ What will you do?")
] });
lsbCh({ t: "Those were the real conquests", txt: 17, start: "lakeS", jump: 1, tune: "largo", keep: ["spear", "An Accala spear, given in friendship", "🗡️"],
state: { bridge: 2, rope: 1 },
words: "The Accala mean to finish their war with the ape-men, now, with the help of the white men's guns. Lord John is willing; Summerlee is not; Challenger is delighted.",
intro: "The shore of Lake Gladys",
cast: [lc("gec", { sc: "maple", x: 30, z: -450 }, { ry: Math.PI, until: "battle" }), lc("summ", { sc: "maple", x: 36, z: -452 }, { ry: Math.PI, until: "battle" }), lc("john", { sc: "maple", x: 44, z: -450 }, { ry: Math.PI, until: "battle" }),
{ k: "mr", key: "mr", at: { sc: "maple", x: 34, z: -466 }, dress: "lsacc", skin: 0xB07A52, hair: 0x0E0E0E, name: "Maretas", persona: "maretas", greet: "\"Maretas.\"", ry: 0, until: "battle" },
lc("gec", { sc: "maple", x: 16, z: -92 }, { key: "gec2", ry: 0.4, from: "after" }), lc("summ", { sc: "maple", x: 24, z: -94 }, { key: "summ2", ry: -0.4, from: "after" }), lc("john", { sc: "maple", x: 22, z: -84 }, { key: "john2", ry: Math.PI, from: "after" })],
steps: [
{ k: "read" },
lyPuzzle("⚔️ Will you help them?", "The Accala ask the four Englishmen to fight beside them against the ape-men, who have killed so many of their people. Lord John is for it. What does Malone do?", ["Go with Lord John and the Accala", "Stay behind with the stores"], 0, ["", "Malone does not stay behind."], { yes: "⚔️ They go, all four; even Summerlee." }),
lyTalk("Professor Summerlee", "Summerlee, very stiff", ["😤 Sanity", lsQs("sanity") + "<p>He wants nothing but to get home, and says so; but he goes with the others.</p>" + lsrc("XIV"), "▶ On to the woods"]),
lyId("battle", lyGo({ sc: "maple", x: -300, z: -120 }, "Into the woods with the Accala, toward Ape Town, the four rifles in the middle of the line", { r: 16 })),
lyReadA("⚔️ The battle", "<p>All day the Accala drove the ape-men back through the woods to the edge of the cliff where their town was; the rifles of the four Englishmen broke every stand the ape-men made. By the evening the ape-men's power on the plateau was ended for ever: those who were left were taken as servants by the Accala, and their town was empty.</p><p>Malone writes that it was hard to watch, and that it was the old story of the Earth: the one people mastering the other.</p>" + lsrc("XIV"), "<p>All day the Accala drove the ape-men back through the woods, the four Englishmen's rifles helping them. By evening the ape-men were beaten, and the war that had gone on for ages was over: the Accala were the masters of the plateau.</p>" + lsrc("XIV"), "▶ Go on"),
lyRead("👑 The real conquests", "<p>Lord John and Malone agree that this is what history is: the struggles of peoples for the earth. These were the real conquests, Malone says, which the world never hears about.</p>" + lsrc("XIV"), "▶ Back to the lake"),
lyGo("lakeS", "Back to the lake with the Accala, in triumph", { r: 14 }),
lyRead("🐉 In the water", lsQs("plesio") + lsrc("XIV"), "▶ Look"),
lyHold("lakeS", 8, "Watch the lake: the long necks, rising", { r: 14 }),
lyRead("🐄 Owners", lsQs("owners") + lsrc("XIV"), "▶ So that was it"),
lyPuzzle("⚫ The black mark again", "Do you remember the black asphalt circle on the dead iguanodon's shoulder? Now you know. What was it?", ["The Accala's brand: the iguanodons are their cattle", "A wound", "A disease"], 0, ["", "", ""], { yes: "⚫ The iguanodons belong to the Accala, as cattle do to a farmer, and they mark them so." }),
lyId("after", lyGo("fort", "Back to Fort Challenger, for the stores", { r: 8 })),
lyGo(lsTop(66, -12), "To the edge of the gulf: is Zambo still there?", { r: 8 }),
lyRead("💪 Zambo", lsQs("zambocame") + lsrc("XIV"), "▶ Go on")
] });
lsbCh({ t: "Among the Accala", txt: 18, start: "lakeN", jump: 1, tune: "fossils", keep: ["chick", "The devil chick, in its box", "🐣"],
state: { bridge: 2, rope: 1 },
words: "The Accala carry them across the lake to their caves in the red cliffs. They are honoured guests, and the Accala will not let them go.",
intro: "The north shore, under the caves",
cast: [lc("gec", { sc: "maple", x: 146, z: -1106 }, { ry: Math.PI * 0.9, until: "cage" }), lc("summ", { sc: "maple", x: 154, z: -1104 }, { ry: -2.6, until: "cage" }), lc("john", { sc: "maple", x: 150, z: -1114 }, { ry: 0, until: "cage" }),
lc("john", { sc: "maple", x: 510, z: -750 }, { key: "john2", ry: Math.PI, from: "cage", until: "back", dress: null }),
lc("gec", { sc: "maple", x: 146, z: -1106 }, { key: "gec2", ry: Math.PI * 0.9, from: "back" }), lc("summ", { sc: "maple", x: 154, z: -1104 }, { key: "summ2", ry: -2.6, from: "back" }), lc("john", { sc: "maple", x: 150, z: -1114 }, { key: "john3", ry: 0, from: "back" })],
steps: [
{ k: "read" },
lySpot("The caves of the Accala", "Up the long stone stairs, to the caves"),
lyRead("🏔️ The caves", lsQs("stairs", "pictures") + lsrc("XV"), "▶ Go on"),
lyRead("🌋 The cliff", lsQs("earthquake") + lsrc("XV"), "▶ Down to the camp"),
lySpot("The camp below the caves", "Down to the camp at the foot of the stairs"),
lyRead("🔔 Stoa!", lsQs("stoa") + lsrc("XV"), "▶ Up the stairs, quick!"),
lySpot("The caves of the Accala", "Up the stairs, with all the Accala, as the flesh-eater comes down to the camp"),
lyHold(lsLedge(60, -1148), 8, "Stay on the high ledge until it is gone", { r: 20 }),
lyRead("🦖 The creatures of the plateau", lsQs("rainbow", "ichthyo", "phororachus", "toxodon") + lsrc("XV"), "▶ Go on"),
lyPuzzle("🦖 Which one?", "Which creature came at Challenger, and sheared off the heel of his boot with its beak as he climbed to safety?", ["The great running bird, taller than an ostrich", "The toxodon", "The ichthyosaurus"], 0, ["", "It has chisel teeth, not a beak.", "That lives in the water."], { yes: "🦖 " + LSW_Q.heel }),
lySpot("The swamp east of the lake", "East of the lake is a swamp where something white glows at night: look"),
lyTalk("Professor Summerlee", "Summerlee: home", ["🏠 Refused", lsQs("refusal", "evenings") + lsrc("XV"), "▶ Where is Lord John?"]),
lyId("cage", lyGo({ sc: "maple", x: 500, z: -740 }, "Lord John goes off alone each day to the swamp: follow him", { r: 14 })),
lyTalk("Lord John Roxton", "A man walking inside a cage of canes", ["🦇 A cage", lsQs("cage", "devilchick", "palmbranch") + lsrc("XV"), "▶ Go on"]),
lyPuzzle("🐣 Why?", "Lord John walks among the pterodactyls in a cage of canes. What is he after?", ["A young pterodactyl, a devil chick, for Challenger to take to London", "Diamonds", "Sport"], 0, ["", "He says nothing of what else he finds.", ""], { yes: "🐣 A devil chick, alive, in a box: the proof no one in London will be able to deny." }),
lyId("back", lyGo("ccamp", "Back to the camp under the caves", { r: 8 }))
] });
lsbCh({ t: "Midsummer madness", txt: 19, start: "ccamp", jump: 1, tune: "fossils", keep: ["balloon", "A strip of the gas-bag", "🎈"],
state: { bridge: 2, rope: 1 },
words: "Challenger has a plan of his own for getting down: the mud geyser in the palm grove gives off a gas that is lighter than air.",
intro: "The camp below the caves",
cast: [lc("gec", { sc: "maple", x: 336, z: -1056 }, { ry: Math.PI * 0.6 }), lc("summ", { sc: "maple", x: 330, z: -1062 }, { ry: 1.2 }), lc("john", { sc: "maple", x: 344, z: -1066 }, { ry: -0.6 })],
setup: function () { lsbBalloon(0); },
steps: [
{ k: "read" },
lySpot("Challenger's workshop: the mud geyser", "Go to Challenger's workshop in the palm grove"),
lyTalk("Professor Challenger", "Challenger, by the bubbling mud", ["💨 A gas", lsQs("hydrogen") + lsrc("XV"), "▶ Go on"]),
lyPuzzle("💨 What will it do?", "A gas markedly lighter than the air. What can a man make with it?", ["A balloon", "A lamp", "A bomb"], 0, ["", "Challenger has bigger ideas.", "Not that."], { yes: "💨 A balloon, to carry them off the plateau." }),
lyGather("skin", "ccamp", 5, "A cleaned stomach-skin of an ichthyosaurus, from the Accala", "The gas-bag needs skins: collect five from the camp", { spread: 10, verb: "take it", eachSay: "Light and gas-tight." }),
lyHold("geyser", 10, "Hold the bag over the vent while it fills", { r: 8, on: function () { lsbBalloon(1); } }),
lyRead("🎈 The gas-bag", lsQs("gasbag") + lsrc("XV"), "▶ Summerlee", { done: function () { lsbBalloon(2); } }),
lyTalk("Professor Summerlee", "Summerlee has something to say", ["🙄 Midsummer madness", lsQs("midsummer", "sausages") + lsrc("XV"), "▶ The test"]),
lyHold("geyser", 6, "Challenger ties on a rock for weight, and cuts the cords: watch", { r: 10, on: function () { lsbBalloon(3); } }),
lyRead("🎈 Gone", lsQs("splendid") + lsrc("XV"), "▶ Back to the caves", { done: function () { lsbBalloon(0); } }),
lyPuzzle("🎈 The test", "The balloon shot up, with the rock and all, and was gone. What does it prove?", ["That it lifts very well, too well to steer", "That it does not work", "That the gas is poison"], 0, ["", "It worked.", "No."], { yes: "🎈 It works; it is simply not safe. They will need another way." })
] });
var lsT = function (dx, dz) { return function () { return { sc: "maple", x: LSW_TUN.x + dx, z: LSW_TUN.z + dz, y: LSW_TUN.y }; }; };
lsbCh({ t: "Seventeen from the right", txt: 20, start: "ccamp", jump: 1, tune: "largo", keep: ["bark", "The bark chart of the caves", "🪵"],
state: { bridge: 2, rope: 1, night: 1, nightUntil: "bark" },
words: "Then one evening the young Accala whose life they saved comes to Malone, and puts a little roll of bark into his hand.",
intro: "The camp below the caves",
cast: [lc("gec", { sc: "maple", x: 146, z: -1106 }, { ry: Math.PI * 0.9, until: "cave" }), lc("summ", { sc: "maple", x: 154, z: -1104 }, { ry: -2.6, until: "cave" }), lc("john", { sc: "maple", x: 150, z: -1114 }, { ry: 0, until: "cave" }),
{ k: "acc1", at: { sc: "maple", x: 140, z: -1100 }, dress: "lsacc", skin: 0xA06A44, hair: 0x0E0E0E, name: "A young Accala", persona: "acc", greet: "(He puts his finger to his lips.)", ry: Math.PI, until: "cave" },
lc("gec", { sc: "maple", x: -152, z: 30 }, { key: "gec2", ry: Math.PI, from: "out" }), lc("summ", { sc: "maple", x: -168, z: 32 }, { key: "summ2", ry: Math.PI, from: "out" }), lc("john", { sc: "maple", x: -160, z: 36 }, { key: "john2", ry: Math.PI, from: "out" }), lc("zambo", { sc: "maple", x: -150, z: 44 }, { ry: Math.PI * 0.8, from: "out" })],
steps: [
{ k: "read" },
lyTalk("A young Accala", "The young Accala, at dusk", ["🪵 A roll of bark", lsQs("barkroll") + lsrc("XV"), "▶ Look at it"]),
lyId("bark", lyRead("🪵 The bark chart", "<p>On the inner side of the bark is a row of marks, in charcoal, one above another, with a little cross under one of them.</p>" + lsrc("XV"), "▶ Count")),
lyTalk("Lord John Roxton", "Lord John counts the marks", ["🔢 Eighteen", lsQs("eighteen", "cross") + lsrc("XV"), "▶ Think"]),
lyPuzzle("🔢 Which cave?", "Eighteen marks, and eighteen cave mouths along the cliff. The cross is under the seventeenth mark from the right. Which cave?", ["The seventeenth from the right, second from the left", "The seventeenth from the left", "The first"], 0, ["", "Count again: from the right.", "No."], { yes: "🔢 Seventeen from the right: and second from the left." }),
lyGather("wood", "ccamp", 4, "A branch of the dry, bituminous araucaria", "Torches: gather four branches of the resinous araucaria wood", { spread: 12, verb: "break it off", eachSay: "It will burn." }),
lyRead("🔥 Torches", lsQs("araucaria") + lsrc("XV"), "▶ Up the stairs"),
lyId("cave", lyGo(function () { var C = LSW_CAVES[16]; return { sc: "maple", x: C.x, z: LSW_ESC_Z - 24, y: LSW_CAVE_Y }; }, "Up the stairs, quietly, and along the ledge: count the caves from the right to the seventeenth", { r: 6 })),
lySpot("The seventeenth cave from the right", "Into the seventeenth cave"),
lyHold(lsT(0, -22), 3, "Feel your way in along the wall, and strike a light", { r: 4, done: function () { lsbLight(); } }),
lySpot("Spent matches on the floor", "The torches are lit. Look at the floor"),
lyGo(lsT(0, -66), "Along the passage, by torchlight", { r: 6 }),
lySpot("The end of the passage", "Feel the wall"),
lyRead("🧱 A blank wall", lsQs("culdesac") + lsrc("XV"), "▶ Think"),
lyPuzzle("🔀 What went wrong?", "The chart was right about the cave. What have you missed?", ["The fork: the chart marks a forked cave, and you passed the fork in the dark before the torches were lit", "It is the wrong cave", "The way is blocked by a rock fall"], 0, ["", "Count again: it was the seventeenth.", "The wall is solid rock, and always was."], { yes: "🔀 " + LSW_Q.forked }),
lyGo(lsT(0, -16), "Back toward the mouth, past where the matches lie, feeling along the right-hand wall", { r: 6 }),
lySpot("The fork in the tunnel", "The fork: on the right"),
lyGo(lsT(34, -104), "Up the right-hand branch", { r: 8 }),
lySpot("The rift, and the moon", "A star of silver ahead of you: look"),
lyRead("🌙 Through", lsQs("moonbg", "whickering", "ourland") + lsrc("XV"), "▶ Down", { done: function () { lswGo("exitcave", null, lsbPopulate); } }),
lyId("out", lyRead("🌙 Off the plateau", "<p>Down the rift and out, onto the plain below: the cliff at your back, the moon on the grass. And there, coming to meet them in the night, is Zambo.</p>" + lsrc("XV"), "▶ Go on")),
lyTalk("Zambo", "Zambo, and the people with him", ["🙌 The rescue party", lsQs("rescueparty") + lsrc("XV"), "▶ Go on"]),
lyRead("🦕 The end of the adventure", lsQs("greatwonders") + "<p>The homecoming is in London: the great meeting at the Queen's Hall, and the box with the devil chick in it. You will find it in Darlings' London, at the Queen's Hall.</p>" + lsrc("XV"), "▶ Close the book")
] });
(function () {
if (typeof LSW_SCN === "undefined" || !LSW_SCN.maple || typeof lswMat !== "function")
return;
var mk = lswMat;
lswMat = function (k) { if (k === "basalt")
return lswS("b:cave", 0xA65A40, 18, { n: 1.6 }); return mk.apply(this, arguments); };
var D = LSW_SCN.maple, b = D.build;
D.build = function (P) {
var r = b.apply(this, arguments);
try {
var lite = lswLite(), h = D.h, z0 = LSW_ESC_Z + 1;
var ok = function (x, z) { return Math.abs(x) > 6; };
lswPlant(P, "rock", lswScatter(1401, lite ? 40 : 110, -900, z0, 900, z0 + 8, ok, h, 0.5, 1.6));
lswPlant(P, "fern", lswScatter(1402, lite ? 90 : 260, -900, z0 + 1, 900, z0 + 22, ok, h, 0.7, 1.4));
lswPlant(P, "bush", lswScatter(1403, lite ? 40 : 120, -900, z0 + 2, 900, z0 + 16, ok, h, 0.6, 1.2), { col: 0x4A6A30 });
lswPlant(P, "flowers", lswScatter(1404, lite ? 30 : 90, -900, z0 + 4, 900, z0 + 26, ok, h, 0.8, 1.2));
}
catch (e) {
if (window.console)
console.warn("[lost world] sweep", e);
}
return r;
};
})();
function lswUgFree(x, z) { return __ZC(469, 112, this, arguments, new.target); }
function lswUgCliff(P) { return __ZC(469, 113, this, arguments, new.target); }
function lswUgPatch(P, seed, x, z, r, dense) { return __ZC(469, 114, this, arguments, new.target); }
(function () {
if (typeof LSW_SCN === "undefined" || !LSW_SCN.maple)
return;
var D = LSW_SCN.maple, b = D.build;
D.build = function (P) {
var r = b.apply(this, arguments);
try {
lswUgCliff(P);
}
catch (e) {
if (window.console)
console.warn("[lost world] cliff", e);
}
try {
var pts = [], seen = {};
for (var k in LSW_AT) {
var A = LSW_AT[k];
if (A.sc !== "maple" || A.y)
continue;
var key = Math.round(A.x / 40) + "," + Math.round(A.z / 40);
if (seen[key])
continue;
seen[key] = 1;
pts.push([A.x, A.z]);
}
[[-542, -137], [120, -1090], [211, -375], [20, -89], [-47, -1084], [-225, -1079], [49, 42], [-570, 27]].forEach(function (p) { pts.push(p); });
pts.forEach(function (p, i) { lswUgPatch(P, 1600 + i * 10, p[0], p[1], p[1] > 0 ? 50 : 60, 1); });
var h = LSW_SCN.maple.h, ok = function (x, z) { return lswUgFree(x, z); };
lswPlant(P, "grass", lswScatter(1901, 4200, -900, LSW_ESC_Z + 6, 900, LSW_RIM_Z - 6, ok, h, 1.1, 2.0), { col: 0xB8C88E });
lswPlant(P, "bush", lswScatter(1902, 520, -900, LSW_ESC_Z + 6, 900, LSW_RIM_Z - 6, ok, h, 0.7, 1.5), { col: 0x41622C });
lswPlant(P, "rock", lswScatter(1903, 260, -900, LSW_ESC_Z + 6, 900, LSW_RIM_Z - 6, ok, h, 0.4, 1.6));
lswPlant(P, "grass", lswScatter(1904, 2200, -900, 8, 900, 900, ok, h, 1.1, 2.0), { col: 0xC0C890 });
lswPlant(P, "bush", lswScatter(1905, 240, -900, 8, 900, 900, ok, h, 0.7, 1.4), { col: 0x4A6A30 });
}
catch (e) {
if (window.console)
console.warn("[lost world] undergrowth", e);
}
return r;
};
})();
