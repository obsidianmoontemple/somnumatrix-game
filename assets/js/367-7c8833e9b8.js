/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var GMM_KEY = "grimm", GMM_NAME = "The Grimm Wood";
var GMM = { base: -1900000, G: null, built: false, t: 0, lite: false, zone: "town", room: null, rooms: {}, solids: [], floors: [], spots: [], talk: [], people: [], movers: [], fx: [],
lights: [], districts: [], state: null, rules: null, busy: false, pt: 0, vt: 0, moving: false, veil: null, snow: 0, trees: null, run: null, follow: [], flags: {} };
var GMM_IN_X = 40000;
var GMM_BOUND = { x0: -1180, x1: 1180, z0: -1180, z1: 1150 };
function gmmKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function gmmOpen() { var S = GMM.state; return !(S && S.ok !== false && S.open === false); }
var GMM_AT = {
arrive: { x: 6, z: 180, name: "the Kassel town gate" },
town: { x: 0, z: 0, r: 215, name: "Kassel, 1812" },
hansel: { x: -640, z: -470, r: 120, name: "Hansel and Gretel's wood", dark: 1 },
lake: { x: -560, z: -330, r: 58 },
redcap: { x: -830, z: 80, r: 110, name: "Little Red Cap's path" },
rapunzel: { x: -560, z: 640, r: 110, name: "Rapunzel's tower" },
holle: { x: -330, z: 330, r: 70, name: "the widow's well (Mother Holle)" },
queen: { x: -140, z: -560, r: 90, h: 16, name: "the Queen's castle (Snow White)" },
dwarfs: { x: -180, z: -985, r: 80, name: "the dwarfs' cottage, beyond the seven mountains" },
coffin: { x: -30, z: -1060, name: "the glass coffin" },
dance: { x: 300, z: -430, r: 110, name: "the palace of the twelve princesses" },
briar: { x: 560, z: -760, r: 120, name: "Briar Rose's castle" },
cinder: { x: 850, z: -170, r: 130, name: "Aschenputtel's house and the king's palace" },
frog: { x: 720, z: 520, r: 110, name: "the Frog King's castle" },
bremen: { x: 1020, z: 170, r: 90, name: "the robbers' house, on the road to Bremen" },
rumpel: { x: 140, z: 820, r: 120, name: "the mill and the king's straw chambers (Rumpelstiltskin)" },
rfire: { x: 380, z: 930, h: 28, name: "the little man's fire on the mountain" },
kids: { x: 380, z: 300, r: 60, name: "the seven little goats' cottage" },
goose: { x: -330, z: -170, r: 70, name: "the old tree and the inn (the Golden Goose)" },
giants: { x: -950, z: -640, r: 60, name: "the two giants' tree (the Brave Little Tailor)" },
fisher: { x: -260, z: 1045, r: 90, name: "the fisherman's shore" },
winter: { x: -1010, z: -1010, r: 120, name: "the snow in the far corner of the wood" },
snowrose: { x: -1000, z: 760, r: 90, name: "the widow's cottage and the two rose-trees (Snow-White and Rose-Red)" },
goosegirl: { x: -1010, z: 390, r: 120, name: "the old king's castle and the goose meadow (the Goose-Girl)" },
swans: { x: 620, z: 150, r: 100, name: "the hut in the wood and the starwort meadow (the Six Swans)" },
ravens: { x: 1010, z: -1000, r: 110, name: "the Glass Mountain (the Seven Ravens)" },
ironjohn: { x: -1010, z: -300, r: 120, name: "the king's forest and the iron cage (Iron John)" },
thrush: { x: 960, z: 800, r: 120, name: "King Thrushbeard's town" },
brosis: { x: -150, z: 560, r: 100, name: "the three brooks and the little house (Little Brother and Little Sister)" },
water: { x: 1050, z: -560, r: 110, name: "the sick king's castle and the enchanted castle (the Water of Life)" },
hans: { x: 520, z: 710, r: 90, name: "the lane home (Hans in Luck)" },
juniper: { x: -570, z: -20, r: 90, name: "the juniper-tree, the goldsmith and the mill (the Juniper-Tree)" }
};
var GMM_HILLS = [[-420, -820, 150, 42], [-240, -780, 120, 34], [60, -820, 140, 46], [-330, -1100, 150, 52], [120, -1060, 140, 40], [-560, -1000, 150, 38], [260, -930, 110, 30], [380, 930, 130, 28], [-140, -560, 80, 16]];
var GMM_ROADS = [
[[-30, -45], [-40, -200], [-200, -260], [-330, -230], [-470, -300], [-560, -410], [-640, -470]],
[[-40, -200], [-120, -380], [-140, -490]],
[[-140, -560], [-180, -700], [-200, -820], [-180, -960]],
[[-180, -960], [-60, -1000], [-30, -1060]],
[[60, -60], [150, -250], [300, -380]],
[[300, -430], [420, -560], [530, -680], [560, -720]],
[[90, -20], [300, -60], [520, -120], [720, -160], [850, -170]],
[[850, -170], [920, 0], [1000, 140], [1020, 170], [1140, 180]],
[[70, 40], [250, 180], [380, 300]],
[[380, 300], [520, 400], [700, 500]],
[[0, 60], [40, 300], [80, 560], [140, 780]],
[[140, 820], [260, 880], [370, 935]],
[[-60, 40], [-200, 180], [-330, 320], [-450, 480], [-560, 620]],
[[-60, 0], [-300, 40], [-560, 60], [-760, 80]],
[[-330, 320], [-300, 600], [-270, 900], [-260, 1020]],
[[-470, -300], [-600, -560], [-780, -660], [-950, -640]],
[[-950, -640], [-990, -850], [-1010, -990]],
[[-40, -200], [-330, -170]],
[[-560, 60], [-570, -20]],
[[-760, 80], [-900, -120], [-1010, -300]],
[[-760, 80], [-900, 250], [-1010, 390]],
[[-1010, 390], [-1010, 580], [-1000, 760]],
[[-560, 640], [-800, 720], [-1000, 760]],
[[40, 300], [-60, 450], [-150, 560]],
[[520, 400], [500, 560], [520, 710]],
[[700, 500], [860, 650], [960, 800]],
[[300, -60], [480, 40], [620, 150]],
[[850, -170], [960, -380], [1050, -560]],
[[1050, -560], [1040, -800], [1010, -1000]]
];
var GMM_PAY = {
pebbles: ["Finding the white pebbles home", 15], witch: ["Freeing Hansel from the witch", 25], duck: ["Crossing the great water on the white duck", 10],
redcap: ["Reaching Grandmother's house", 20], rampion: ["Gathering rampion in the enchantress's garden", 15], rapunzel: ["Climbing Rapunzel's hair", 10],
mirror: ["Asking the Queen's mirror", 10], dwarfs: ["Supper at the dwarfs' cottage", 15], briar: ["Waking Briar Rose's castle", 25],
lentils: ["Picking the lentils from the ashes", 15], slipper: ["Three nights at the ball", 25], frog: ["The Frog King's bargain", 20],
spin: ["Spinning straw into gold", 20], name: ["Guessing the little man's name", 25], bremen: ["The Bremen Town Musicians' concert", 20],
dance: ["Following the twelve princesses", 30], holle: ["Working for Mother Holle", 20], flounder: ["Calling the flounder", 15],
kids: ["Finding the seven little goats", 15], tailor: ["Seven at one blow", 10], giants: ["Tricking the two giants", 20],
goose: ["Making the princess laugh", 20], porridge: ["Stopping the sweet porridge", 10],
snowrose: ["Snow-White and Rose-Red and the bear", 25], goosegirl: ["The Goose-Girl told to the iron stove", 25], swans: ["Six shirts of starwort for the six swans", 30],
ravens: ["Opening the Glass Mountain for the seven ravens", 25], ironjohn: ["Iron John and the golden apple", 30], thrush: ["King Thrushbeard", 25],
brosis: ["Little Brother and Little Sister", 25], water: ["Fetching the Water of Life", 30], hans: ["Hans in Luck, all the way home", 20], juniper: ["The Juniper-Tree's bird", 25], exam: ["The Collector's examination", 40]
};
var GMM_KEEP = {
pebbles: ["gmm_pebble", "A white pebble that shines in the moonlight", "⚪"], witch: ["gmm_gingerbread", "A piece of the gingerbread house", "🍪"],
duck: ["gmm_feather", "A white duck's feather", "🪶"], redcap: ["gmm_redcap", "A little red velvet cap", "🧢"], rampion: ["gmm_rampion", "A bunch of rampion", "🥬"],
rapunzel: ["gmm_braid", "A golden hair from Rapunzel's braid", "💛"], mirror: ["gmm_mirror", "A sliver of the Queen's looking-glass", "🪞"],
dwarfs: ["gmm_plate", "A little plate from the dwarfs' table", "🍽️"], briar: ["gmm_rose", "A rose from the hundred-year hedge", "🌹"],
lentils: ["gmm_lentils", "A dish of good lentils", "🫘"], slipper: ["gmm_slipper", "A golden slipper", "👠"], frog: ["gmm_goldball", "A little golden ball", "🟡"],
spin: ["gmm_goldthread", "A spool of gold spun from straw", "🧵"], name: ["gmm_spindle", "The little man's spinning wheel spoke", "🎡"],
bremen: ["gmm_lute", "A Bremen musician's lute string", "🎻"], dance: ["gmm_twig", "A twig from the diamond grove", "💎"],
holle: ["gmm_featherbed", "A feather from Mother Holle's bed", "❄️"], flounder: ["gmm_shell", "A shell from the fisherman's shore", "🐚"],
kids: ["gmm_bell", "A goat's bell", "🔔"], tailor: ["gmm_belt", "A belt sewn 'Seven at one blow'", "🪡"], giants: ["gmm_stone", "A stone from the giants' tree", "🪨"],
goose: ["gmm_goosefeather", "A golden goose feather", "🪿"], porridge: ["gmm_pot", "A little porridge pot", "🍯"],
snowrose: ["gmm_bearfur", "A tuft of the bear's fur, with gold shining under it", "🐻"], goosegirl: ["gmm_falada", "A white hair from Falada's mane", "🐴"],
swans: ["gmm_starwort", "A starwort shirt's sleeve", "🦢"], ravens: ["gmm_ravenring", "The little ring from the seventh glass", "💍"],
ironjohn: ["gmm_goldapple", "A golden apple from the feast", "🍏"], thrush: ["gmm_pot2", "A potsherd from the market", "🏺"],
brosis: ["gmm_garter", "A golden garter", "🦌"], water: ["gmm_waterlife", "A flask of the Water of Life (empty)", "💧"],
hans: ["gmm_grindstone", "A grindstone chip from the well's edge", "🪨"], juniper: ["gmm_redshoes", "A red shoe from the bird", "👞"], exam: ["gmm_kassel", "The Collector of Tales' seal", "📜"]
};
var GMM_TALES = [
[1, "Der Froschkönig oder der eiserne Heinrich", "The Frog King, or Iron Henry", "A princess drops her golden ball in a deep well. A frog fetches it if she will let him eat from her plate and sleep in her bed. She breaks her word, he comes to the castle anyway, and when she throws him at the wall in a temper he falls down a king's son. His servant Henry had bound his heart with three iron bands for grief, and they snap one by one for joy on the way home."],
[5, "Der Wolf und die sieben jungen Geißlein", "The Wolf and the Seven Young Kids", "A mother goat warns her seven kids never to open the door to the wolf. He softens his voice with chalk and whitens his paw with flour, and gets in. Only the youngest, hidden in the clock case, is left to tell her, and together they get the others back safe."],
[12, "Rapunzel", "Rapunzel", "A man steals rampion from an enchantress's garden for his wife, and pays with their child, Rapunzel, who is shut in a tower with no door. The enchantress climbs her long golden hair. A king's son learns the call, is found out, falls blind into thorns, and wanders for years until Rapunzel's tears heal his eyes."],
[15, "Hänsel und Gretel", "Hansel and Gretel", "A poor woodcutter's children are left in the forest. The first time Hansel's white pebbles lead them home; the second time the birds eat his breadcrumbs. They find a house of bread with a roof of cake and windows of sugar. Clever Gretel outwits the witch who lives there, frees her brother, and a white duck carries them home across the great water."],
[19, "Von dem Fischer un syner Fru", "The Fisherman and his Wife", "A fisherman lets a magic flounder go. His wife sends him back to ask for a cottage, then a castle, then to be king, emperor and pope, and the sea grows darker and wilder each time. When she wants to be like God, they are back in their old hovel."],
[21, "Aschenputtel", "Aschenputtel (Cinderella)", "A girl made to sleep in the ashes plants a hazel twig on her mother's grave, and it grows into a tree where a white bird gives her what she wishes. The doves help her pick lentils from the ashes. Three nights she goes to the king's ball in gold and silver; on the third the prince has the stairs smeared with pitch, and her golden slipper sticks."],
[24, "Frau Holle", "Mother Holle", "A girl falls down a well into a meadow. She takes the bread out of the oven when it calls, shakes the apple tree when it asks, and shakes Mother Holle's featherbed so that it snows on the world. She goes home under a gate that showers her with gold. Her lazy sister gets pitch."],
[26, "Rotkäppchen", "Little Red Cap", "A girl in a red velvet cap takes cake and wine to her grandmother, strays from the path to pick flowers, and the wolf gets there first. A huntsman saves them both. Another day she meets another wolf, keeps to the path, and with Grandmother tricks him off the roof into the trough."],
[27, "Die Bremer Stadtmusikanten", "The Bremen Town Musicians", "An old donkey, dog, cat and rooster, no longer wanted, set out to be town musicians in Bremen. In the forest they find a robbers' house, stand on each other's backs at the window and sing all together, and the robbers run for their lives. They like the house so much they never get to Bremen."],
[39, "Die Wichtelmänner", "The Elves and the Shoemaker", "A poor shoemaker cuts out leather at night, and in the morning the shoes are made, perfectly. He and his wife watch and see two little naked men at work, so they sew them tiny clothes. The elves dress, dance out of the door, and never come back, but the shoemaker never wants again."],
[50, "Dornröschen", "Briar Rose", "A thirteenth wise woman, not invited to the christening, curses the princess to prick her finger on a spindle and die. The twelfth softens it to a hundred years' sleep. The whole castle sleeps with her, down to the flies on the wall, and a hedge of thorns grows round it. On the day the hundred years end, the thorns turn to flowers and let a king's son through."],
[53, "Sneewittchen", "Snow White", "A queen asks her mirror who is the fairest in the land, and the answer is Snow White. The girl escapes to the seven dwarfs beyond the seven mountains. The queen comes three times, with laces, a comb and a poisoned apple. The dwarfs lay her in a glass coffin, and when the prince's servants stumble carrying it, the piece of apple falls from her throat."],
[55, "Rumpelstilzchen", "Rumpelstiltskin", "A miller boasts that his daughter can spin straw into gold. Locked in with the straw, she is helped three nights by a little man, for her necklace, her ring and then her first child. As queen she has three days to guess his name. A messenger hears him singing it by his fire on the mountain."],
[64, "Die goldene Gans", "The Golden Goose", "The youngest son, whom everyone calls Simpleton, shares his food with a little grey man and finds a goose with golden feathers. Everyone who touches it sticks fast: three sisters, a parson, a sexton, two farmhands. The sight of them all makes a princess who has never laughed laugh."],
[133, "Die zertanzten Schuhe", "The Twelve Dancing Princesses", "Every morning the twelve princesses' shoes are danced to pieces. An old soldier with a cloak that makes him unseen follows them through a trapdoor, past trees with leaves of silver, gold and diamond, over a lake in twelve boats, to a castle where they dance all night. He brings back a twig from each grove to prove it."],
[20, "Das tapfere Schneiderlein", "The Brave Little Tailor", "A tailor kills seven flies at one blow and sews it on his belt. Everyone thinks he means seven men. He tricks two giants into fighting each other by dropping stones on them as they sleep, catches a unicorn and a wild boar, and wins a kingdom."],
[36, "Tischchen deck dich, Goldesel und Knüppel aus dem Sack", "The Wishing-Table, the Gold-Donkey and the Cudgel in the Sack", "Three brothers are given a table that lays itself, a donkey that drops gold, and a cudgel that jumps out of its sack. A greedy innkeeper steals the first two, until the cudgel gets them back."],
[103, "Der süße Brei", "Sweet Porridge", "A poor girl is given a little pot. Say 'Cook, little pot, cook' and it makes sweet millet porridge; say 'Stop, little pot' and it stops. Her mother forgets the words, and the porridge fills the kitchen, the house, the street and the town."],
[200, "Der goldene Schlüssel", "The Golden Key", "In winter a poor boy digs in the snow for wood and finds a little golden key. Where there is a key there must be a lock, he thinks, and digs again, and finds an iron casket. He turns the key once round. 'Now we must wait until he has quite unlocked it and lifted the lid, and then we shall learn what wonderful things were in the casket.' It is the last tale in the book."],
[4, "Märchen von einem, der auszog, das Fürchten zu lernen", "The Boy Who Went Forth to Learn What Fear Was", "A boy who cannot shudder spends three nights in a haunted castle, plays skittles with dead men's bones, and is not afraid at all. He only learns to shudder when his wife pours a bucket of cold water full of little fishes over him in bed."],
[6, "Der treue Johannes", "Faithful John", "A servant keeps three secrets to save his young king, and is turned to stone for it, until the king gives up what he loves most to bring him back."],
[57, "Der goldene Vogel", "The Golden Bird", "A king's youngest son follows a fox's advice (mostly) to win a golden bird, a golden horse and the princess of the golden castle."],
[161, "Schneeweißchen und Rosenrot", "Snow-White and Rose-Red", "A poor widow's two daughters, gentle Snow-White and lively Rose-Red, let a great black bear in out of the winter night and beat the snow from his coat. All summer they keep rescuing an ungrateful dwarf: his beard caught in a tree, in a fishing line, an eagle carrying him off. At last the bear kills the dwarf with one blow, his bearskin falls away, and he is a king's son the dwarf had bewitched for his treasure."],
[89, "Die Gänsemagd", "The Goose-Girl", "A princess rides to her bridegroom with her talking horse Falada and her waiting-maid. At a brook the maid makes her change places and swear to tell no living soul. In the strange castle the true princess is sent to keep geese, Falada's head is nailed up under the dark gateway, and each morning it answers her. At last the old king tells her to tell her sorrows to the iron stove, and listens through the stove-pipe; the false bride names her own end."],
[49, "Die sechs Schwäne", "The Six Swans", "A stepmother turns six princes into swans with magic shirts. Their sister may free them only by staying silent for six years and sewing six shirts of starwort. A king finds her in a tree and marries her; his mother steals her three babies and accuses her of eating them, and she is to be burned. On the pyre the six swans come down; she throws the shirts over them, and only the last sleeve was unfinished, so the youngest kept a swan's wing."],
[25, "Die sieben Raben", "The Seven Ravens", "A father in anger wishes his seven sons were ravens, and they are. Their little sister goes to the end of the world for them: the sun eats children, the moon smells human flesh, and the morning star gives her a chicken bone to open the Glass Mountain. She loses it, cuts off her own little finger to turn the lock, and drops her parents' ring in the seventh raven's cup."],
[136, "Der Eisenhans", "Iron John", "A wild man with rusty skin is pulled up from a forest pool and caged at court. The king's boy lets him out for the sake of a golden ball, and goes with him into the forest, where his hair turns to gold in the well he was set to guard. As a gardener's boy who never takes off his cap he wins a war on a three-legged horse with Iron John's army, and catches the princess's golden apple three days running."],
[52, "König Drosselbart", "King Thrushbeard", "A proud princess mocks every suitor, and calls one king with a crooked chin 'Thrushbeard'. Her father swears to marry her to the first beggar, and a fiddler comes. Walking his country she hears that every forest, meadow and town belongs to King Thrushbeard. She weaves baskets, spins, sells pots till a drunken hussar rides through them, and works in the palace kitchen, until the king's son at the wedding pulls her to dance and the jars fall from her pockets."],
[11, "Brüderchen und Schwesterchen", "Little Brother and Little Sister", "Two children run from their stepmother, a witch, who has bewitched the brooks. Brother drinks from the third, which says 'who drinks of me will be a roe', and becomes a fawn. The sister keeps him in a little house in the wood until the king's hunt finds them. The witch kills the young queen in the bath and puts her own ugly daughter in her bed; at midnight the dead queen comes to nurse her child and her fawn, until the king speaks to her."],
[97, "Das Wasser des Lebens", "The Water of Life", "Three princes ride to find the Water of Life for their dying father. The proud two are trapped between mountains by a dwarf; the youngest is civil, is shown the way, strikes the iron door three times, quiets the lions with two loaves, finds a sword, bread and a princess, and leaves just as the clock strikes twelve. His brothers swap the water for bitter sea-water, and the king orders him shot; the huntsman spares him."],
[83, "Hans im Glück", "Hans in Luck", "Hans is paid for seven years' work with a lump of gold as big as his head. On the way home he swaps it for a horse, the horse for a cow, the cow for a pig, the pig for a goose and the goose for a grindstone, each time sure he has done well; and when the stones fall into a well he jumps for joy, free of every burden."],
[47, "Von dem Machandelboom", "The Juniper-Tree", "A stepmother slams the heavy lid of an apple chest on her stepson, and cooks him in black puddings, which his father eats. His little sister Marlinchen gathers his bones in her silk handkerchief and lays them under the juniper-tree, and a beautiful bird flies out of a fire in the mist. The bird sings its song for a goldsmith's chain, a shoemaker's red shoes and a millstone, and comes home."]
];
var GMM_LESSONS = [
{ t: "Two brothers", b: "Jacob Grimm (1785-1863) and Wilhelm Grimm (1786-1859) grew up in Hanau and Steinau in Hesse. Their father died when they were boys and the family was poor. They studied law at Marburg, where their teacher Savigny showed them his library of old German books, and they fell in love with the past.", q: ["Which was the older brother?", "Jacob", "Wilhelm", "They were twins"] },
{ t: "Collecting the tales", b: "From 1806 the brothers wrote down tales told by people they knew in Kassel: the Wild family, the Hassenpflug sisters, the von Haxthausens, and an old soldier, Johann Krause, who traded tales for their old trousers. They believed these tales kept the oldest poetry of the German people.", q: ["Where did the brothers write down most of the tales?", "Kassel", "Berlin", "Vienna"] },
{ t: "Dorothea Viehmann", b: "Their finest storyteller was Dorothea Viehmann (1755-1815), a tailor's wife from Niederzwehren near Kassel, daughter of the innkeeper of the Knallhütte. She told them about forty tales, word for word the same each time, and slowly so they could write. Her picture is in the second volume.", q: ["What did Dorothea Viehmann do to help the brothers write?", "Told each tale the same each time, slowly", "Wrote the tales herself", "Sang them as songs"] },
{ t: "The first edition, 1812", b: "Kinder- und Hausmärchen (Children's and Household Tales) came out at Christmas 1812 with 86 tales; a second volume of 70 followed in 1815. It had no pictures and long scholarly notes. It sold slowly.", q: ["How many tales were in the first volume of 1812?", "86", "200", "12"] },
{ t: "Seven editions", b: "Wilhelm rewrote the tales for each new edition, making them gentler for children and more beautiful to read aloud. By the last big edition, in 1857, there were 200 tales and 10 legends for children. The 'Small Edition' of 50 tales, from 1825, with pictures by their brother Ludwig Emil, sold best of all.", q: ["Who rewrote the tales for each new edition?", "Wilhelm", "Jacob", "Their publisher"] },
{ t: "Grimm's Law", b: "Jacob was one of the first great students of how languages change. Grimm's Law (1822) shows how sounds shifted regularly between the old languages and German and English: Latin pater became English father, Latin pes became foot, Latin tres became three. So p became f, and t became th.", q: ["By Grimm's Law, Latin 'pater' matches which English word?", "father", "pattern", "paternal"] },
{ t: "The German Dictionary", b: "In 1838 the brothers began the Deutsches Wörterbuch, a dictionary of every German word with its history. Jacob got as far as the word Frucht (fruit); Wilhelm finished the letter D. Others carried on after them, and it was finished in 1961, 123 years later.", q: ["When was the brothers' dictionary finally finished?", "1961", "1863", "1812"] },
{ t: "The Göttingen Seven", b: "In 1837, as professors at Göttingen, the brothers were two of seven who refused to break their oath to the kingdom's constitution when the new king of Hanover cancelled it. All seven lost their posts; Jacob was ordered out of the country within three days. Many Germans honoured them for it.", q: ["Why did the brothers lose their posts at Göttingen?", "They would not break their oath to the constitution", "They wrote fairy tales", "They moved to Berlin"] },
{ t: "Threes and sevens", b: "The tales love number patterns: three tries (three nights at the ball, three guesses a day for a name), the youngest of three who wins, seven dwarfs, seven kids, twelve princesses, a hundred years. Patterns help a listener remember a tale and guess what comes next.", q: ["How many nights does Aschenputtel go to the ball?", "Three", "One", "Seven"] },
{ t: "Grimm, not the films", b: "In the Grimms' own book Aschenputtel's slipper is gold, and the help comes from a hazel tree on her mother's grave and the white birds, not a godmother. The frog princess throws the Frog King at the wall. Snow White's dwarfs have no names. Rapunzel's prince is blinded by thorns, and her tears heal him.", q: ["What is Aschenputtel's slipper made of in the Grimms' tale?", "Gold", "Glass", "Fur"] },
{ t: "Tales across the world", b: "Many of the Grimms' tales are told in other lands too: Aschenputtel is Perrault's Cendrillon (1697) and the Chinese Ye Xian (about 850 AD). Scholars sort such tales into tale types, so that the same tale can be found in a hundred languages.", q: ["Which is the oldest known telling of the Cinderella tale?", "Ye Xian, from China", "Perrault's", "the Grimms'"] },
{ t: "The German Fairy Tale Route", b: "Today the Deutsche Märchenstraße runs about 600 km from Hanau, where the brothers were born, past Steinau, Marburg and Kassel, to Bremen, where the Town Musicians stand in bronze by the town hall beside the great stone Roland of 1404.", q: ["Which city's statue shows a donkey, dog, cat and rooster?", "Bremen", "Kassel", "Hanau"] }
];
var GMM_EXAM_N = 10;
var GMM_MATS = {}, GMM_TEX = {};
function gmmTexK(k) { if (GMM_TEX[k])
return GMM_TEX[k]; var t = typeof ctnTex === "function" ? ctnTex(k) : (typeof texOf === "function" ? texOf(k) : null); return (GMM_TEX[k] = t || null); }
function gmmMat(kind, col) {
var key = (kind || "-") + "|" + col;
if (GMM_MATS[key])
return GMM_MATS[key];
var m = new THREE.MeshLambertMaterial({ color: col }), t = kind ? gmmTexK(kind) : null;
if (t)
m.map = t;
m.userData.ctn = 1;
m.userData.ldShared = 1;
return (GMM_MATS[key] = m);
}
function gmmGlowM(col) { var k = "glow|" + col; if (GMM_MATS[k])
return GMM_MATS[k]; var m = new THREE.MeshBasicMaterial({ color: col }); m.userData.ldShared = 1; return (GMM_MATS[k] = m); }
function gmmShiny(col, sh) { var k = "ph|" + col + "|" + (sh || 60); if (GMM_MATS[k])
return GMM_MATS[k]; var m = new THREE.MeshPhongMaterial({ color: col, shininess: sh || 60, specular: 0x666666 }); m.userData.ldShared = 1; return (GMM_MATS[k] = m); }
function gmmSee(col, op) { var k = "see|" + col + "|" + op; if (GMM_MATS[k])
return GMM_MATS[k]; var m = new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: op, shininess: 90, specular: 0xFFFFFF, depthWrite: false }); m.userData.ldShared = 1; return (GMM_MATS[k] = m); }
function gmmMetre(geo) { return typeof ctnMetre === "function" ? ctnMetre(geo) : geo; }
function gmmAdd(geo, mat, x, y, z, p, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; if (p)
p.add(m); return m; }
function gmmB(w, h, d, kind, col, x, y, z, p, ry) { return gmmAdd(kind ? gmmMetre(new THREE.BoxGeometry(w, h, d)) : new THREE.BoxGeometry(w, h, d), gmmMat(kind, col), x, y, z, p, ry); }
function gmmC(rt, rb, h, kind, col, x, y, z, p, seg) { return gmmAdd(kind ? gmmMetre(new THREE.CylinderGeometry(rt, rb, h, seg || 14)) : new THREE.CylinderGeometry(rt, rb, h, seg || 14), gmmMat(kind, col), x, y, z, p); }
function gmmK(r, h, kind, col, x, y, z, p, seg) { return gmmAdd(kind ? gmmMetre(new THREE.ConeGeometry(r, h, seg || 14)) : new THREE.ConeGeometry(r, h, seg || 14), gmmMat(kind, col), x, y, z, p); }
function gmmS(r, col, x, y, z, p, seg) { return gmmAdd(new THREE.SphereGeometry(r, seg || 12, Math.max(6, ((seg || 12) * 0.7) | 0)), gmmMat(null, col), x, y, z, p); }
function gmmG(x, y, z, p, ry) { var g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); if (ry)
g.rotation.y = ry; if (p)
p.add(g); return g; }
var GMM_LB = {};
function gmmLeafBall(p, x, y, z, r, col) { return __ZC(367, 0, this, arguments, new.target); }
function gmmPrism(w, h, d, kind, col, x, y, z, p, ry) { return __ZC(367, 1, this, arguments, new.target); }
function gmmTo(g, lx, lz) { return __ZC(367, 2, this, arguments, new.target); }
function gmmRotOf(g) { var r = 0, q = g; while (q && q !== GMM.G) {
r += q.rotation.y || 0;
q = q.parent;
} return r; }
function gmmSolid(x, z, w, d, y0, y1, rot) {
var r = rot || 0, c = Math.cos(r), s = Math.sin(r);
var S = { x: x, z: z, hw: Math.abs(w / 2 * c) + Math.abs(d / 2 * s), hd: Math.abs(w / 2 * s) + Math.abs(d / 2 * c), y0: y0 === undefined ? -50 : y0, y1: y1 === undefined ? 80 : y1 };
if (Math.abs(s) > 1e-4) {
S.c = c;
S.s = s;
S.lw = w / 2;
S.ld = d / 2;
}
GMM.solids.push(S);
return S;
}
function gmmYOf(g) { var y = 0, q = g; while (q && q !== GMM.G && q.position) {
y += q.position.y;
q = q.parent;
} return y; }
function gmmSolidIn(g, lx, lz, w, d, y0, y1) { var p = gmmTo(g, lx, lz), y = gmmYOf(g); return gmmSolid(p.x, p.z, w, d, (y0 === undefined ? -50 : y0) + y, (y1 === undefined ? 80 : y1) + y, gmmRotOf(g)); }
function gmmRound(x, z, r, y0, y1) { var gy = x >= GMM_IN_X - 2000 ? 0 : gmmLand(x, z); var S = { x: x, z: z, r: r, y0: (y0 === undefined ? -50 : y0) + gy, y1: (y1 === undefined ? 80 : y1) + gy, round: 1 }; GMM.solids.push(S); return S; }
function gmmFloor(x, z, w, d, y, inside) { var F = { x: x, z: z, hw: w / 2, hd: d / 2, y: y, inside: !!inside }; GMM.floors.push(F); return F; }
function gmmSolidAt(x, z, feet) { return __ZC(367, 3, this, arguments, new.target); }
function gmmFloorAt(x, z, feet) { var best = null; for (var i = 0; i < GMM.floors.length; i++) {
var F = GMM.floors[i];
if (F.off)
continue;
if (Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd && F.y <= feet + 0.9 && (best === null || F.y > best))
best = F.y;
} return best; }
function gmmInsideWalk(x, z) { for (var i = 0; i < GMM.floors.length; i++) {
var F = GMM.floors[i];
if (F.inside && !F.off && Math.abs(x - F.x) <= F.hw && Math.abs(z - F.z) <= F.hd)
return true;
} return false; }
function gmmSpot(x, z, r, name, verb, fn, y) { var S = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; GMM.spots.push(S); return S; }
function gmmLight(col, k, dist, x, y, z, parent, always) {
if (GMM.lite && !always)
return null;
var L = new THREE.PointLight(col, k, dist, 2);
L.position.set(x, y, z);
(parent || GMM.G).add(L);
var F = { L: L, k: k, ph: Math.random() * 20 };
GMM.lights.push(F);
return F;
}
function gmmFlicker(dt) {
GMM.lights.forEach(function (F) { if (!F.L.parent)
return; F.ph += dt; var p = F.ph; F.L.intensity = (F.out ? 0 : F.k) * (0.86 + 0.08 * Math.sin(p * 6.3) + 0.05 * Math.sin(p * 10.7 + 1.3)); });
}
function gmmFire(g, x, y, z, s) { return __ZC(367, 4, this, arguments, new.target); }
function gmmLantern(g, x, y, z, lit) {
gmmB(0.24, 0.34, 0.24, null, 0x1A1A1A, x, y, z, g);
var gl = gmmB(0.17, 0.24, 0.17, null, 0, x, y, z, g);
gl.material = gmmGlowM(lit === false ? 0x3A3020 : 0xFFC870);
if (lit !== false) {
var s = wGlow(0xFFB060, 1.6, 0.45);
s.position.set(x, y, z);
g.add(s);
}
}
function gmmVeil(sec, mid) { return __ZC(367, 5, this, arguments, new.target); }
function gmmPerson(seed, x, z, ry, o, parent, y) { return __ZC(367, 6, this, arguments, new.target); }
function gmmBeast(a, x, z, ry, k, seed, parent, y) { return __ZC(367, 7, this, arguments, new.target); }
function gmmFrog(p, x, y, z, s) { return __ZC(367, 8, this, arguments, new.target); }
function gmmBirdShape(p, x, y, z, s, col, neck, bill) { return __ZC(367, 9, this, arguments, new.target); }
function gmmGoose(p, x, y, z, gold) { return gmmBirdShape(p, x, y, z, 1.25, gold ? 0xE8C040 : 0xF2F0E8, 0.36, 0xE87A20); }
function gmmDuck(p, x, y, z, s) { return gmmBirdShape(p, x, y, z, s || 1.2, 0xF4F2EC, 0.14, 0xF0A020); }
function gmmDove(p, x, y, z) { return gmmBirdShape(p, x, y, z, 0.55, 0xF2F2F0, 0.08, 0xC8A0A0); }
function gmmRaven(p, x, y, z) { return gmmBirdShape(p, x, y, z, 0.6, 0x1A1A20, 0.08, 0x2A2A2A); }
function gmmRooster(p, x, y, z) { var g = gmmBirdShape(p, x, y, z, 0.85, 0xB8481A, 0.2, 0xE8B020); var c = gmmAdd(new THREE.BoxGeometry(0.02, 0.08, 0.12), gmmMat(null, 0xD81A1A), 0, 0.68, 0.18, g); return g; }
function gmmFlounder(p, x, y, z) { return __ZC(367, 10, this, arguments, new.target); }
function gmmWindow(p, x, y, z, ry, w, h, o) { return __ZC(367, 11, this, arguments, new.target); }
function gmmDoor(p, x, y, z, ry, w, h, col, o) { return __ZC(367, 12, this, arguments, new.target); }
function gmmGable(p, w, d, y, rh, kind, col, over, gableKind, gableCol) { return __ZC(367, 13, this, arguments, new.target); }
function gmmTimbers(p, w, h, x, y, z, ry, col, dense, plain) { return __ZC(367, 14, this, arguments, new.target); }
function gmmTimberHouse(p, x, z, ry, o) { return __ZC(367, 15, this, arguments, new.target); }
function gmmCottage(p, x, z, ry, o) { return __ZC(367, 16, this, arguments, new.target); }
function gmmTower(p, x, z, o) { return __ZC(367, 17, this, arguments, new.target); }
function gmmOnion(p, x, y, z, r, col, k) { return __ZC(367, 18, this, arguments, new.target); }
function gmmLancet(p, x, y, z, ry, w, h, o) {
o = o || {};
var g = gmmWindow(p, x, y, z, ry, w, h, o);
var top = gmmPrism(w + 0.16, w * 0.75, 0.12, "stone", o.frame || 0xA8A090, 0, h / 2, 0.03, g);
var gl = gmmPrism(w, w * 0.62, 0.06, null, 0, 0, h / 2, 0, g);
gl.material = o.lit ? gmmGlowM(o.lit) : gmmShiny(0x2A3446, 90);
return g;
}
function gmmCastle(p, x, z, ry, o) { return __ZC(367, 19, this, arguments, new.target); }
function gmmWell(p, x, z, o) { return __ZC(367, 20, this, arguments, new.target); }
function gmmFence(p, a, b, col, h) { return __ZC(367, 21, this, arguments, new.target); }
function gmmWallLine(p, a, b, h, col) {
var dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz), ry = Math.atan2(-dz, dx), mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, y = gmmGround(mx, mz);
gmmB(L, h, 0.7, "stone", col || 0x9A9488, mx, y + h / 2 - 0.2, mz, p, ry);
gmmB(L, 0.15, 0.85, "stone", 0x7A746A, mx, y + h - 0.12, mz, p, ry);
gmmSolid(mx, mz, L, 0.9, -5, y + h, ry);
}
function gmmSignPost(p, x, z, ry, lines, w) {
var y = gmmGround(x, z), g = gmmG(x, y, z, p, ry), s = wSign(lines, w || 3.2, 0.9, "#2A1C10", "#F0D8A0");
s.position.set(0, 2.2, 0);
g.add(s);
gmmB(0.12, 2.6, 0.12, "wood", 0x4A3420, -(w || 3.2) / 2 - 0.05, 1.3, 0, g);
gmmB(0.12, 2.6, 0.12, "wood", 0x4A3420, (w || 3.2) / 2 + 0.05, 1.3, 0, g);
return g;
}
var GMM_LANDS = { bremen: ["heath", 290], swans: ["marsh", 190], brosis: ["marsh", 200], frog: ["marsh", 170],
rumpel: ["fields", 240], hans: ["fields", 220], goosegirl: ["pasture", 250], kids: ["pasture", 150],
holle: ["orchard", 150], rapunzel: ["orchard", 170], juniper: ["orchard", 170], cinder: ["orchard", 210],
ravens: ["crag", 320], dwarfs: ["crag", 260], queen: ["crag", 140], water: ["crag", 230], rfire: ["crag", 150],
briar: ["oak", 250], ironjohn: ["oak", 280], giants: ["oak", 170], goose: ["oak", 150], snowrose: ["oak", 210],
redcap: ["beech", 210], dance: ["beech", 190], thrush: ["vine", 240], fisher: ["coast", 320] };
var GMM_LANDL = null;
function gmmLandList() { if (GMM_LANDL)
return GMM_LANDL; var L = []; Object.keys(GMM_LANDS).forEach(function (k) { var A = GMM_AT[k]; if (A)
L.push({ k: GMM_LANDS[k][0], x: A.x, z: A.z, R: GMM_LANDS[k][1], pr: A.r || 40, key: k }); }); return (GMM_LANDL = L); }
var GMM_LK = { k: null, w: 0, L: null };
function gmmLandK(x, z) { return __ZC(367, 22, this, arguments, new.target); }
function gmmMix(a, b, t) { if (t <= 0)
return a; if (t >= 1)
return b; var ar = a >> 16 & 255, ag = a >> 8 & 255, ab = a & 255; return (Math.round(ar + ((b >> 16 & 255) - ar) * t) << 16) | (Math.round(ag + ((b >> 8 & 255) - ag) * t) << 8) | Math.round(ab + ((b & 255) - ab) * t); }
function gmmHash(x, z) { var h = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453; return h - Math.floor(h); }
function gmmField(x, z) { return __ZC(367, 23, this, arguments, new.target); }
function gmmClearOf(x, z) { var b = 1e9; for (var k in GMM_AT) {
var A = GMM_AT[k];
b = Math.min(b, Math.hypot(x - A.x, z - A.z) - (A.r || 30));
} return b; }
var GMM_POOLS = null;
function gmmPools() { return __ZC(367, 24, this, arguments, new.target); }
function gmmPoolAt(x, z) { var P = GMM_POOLS; if (!P)
return null; for (var i = 0; i < P.length; i++) {
var Q = P[i];
if (Math.abs(x - Q.x) < Q.r + 8 && Math.abs(z - Q.z) < Q.r + 8) {
var d = Math.hypot(x - Q.x, z - Q.z);
if (d < Q.r + 8)
return { Q: Q, d: d };
}
} return null; }
function gmmSmooth(d, r) { if (d >= r)
return 0; var t = 1 - d / r; return t * t * (3 - 2 * t); }
function gmmSegD(x, z, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, t = ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1); t = Math.max(0, Math.min(1, t)); return Math.hypot(x - (ax + dx * t), z - (az + dz * t)); }
function gmmPathD(x, z, P) { var b = 1e9; for (var i = 0; i < P.length - 1; i++)
b = Math.min(b, gmmSegD(x, z, P[i][0], P[i][1], P[i + 1][0], P[i + 1][1])); return b; }
function gmmRoadD(x, z) { var b = 1e9; for (var i = 0; i < GMM_ROADS.length; i++) {
var R = GMM_ROADS[i];
b = Math.min(b, gmmPathD(x, z, R));
if (b < 1)
return b;
} return b; }
function gmmShore(x) { return 1032 + 26 * Math.sin(x / 140) + 14 * Math.sin(x / 53 + 1); }
var GMM_FLAT = null;
function gmmFlats() { if (GMM_FLAT)
return GMM_FLAT; var F = []; Object.keys(GMM_AT).forEach(function (k) { var A = GMM_AT[k]; if (A.r && k !== "lake" && k !== "winter" && k !== "fisher")
F.push([A.x, A.z, A.r, k === "queen" ? A.h : null]); }); return (GMM_FLAT = F); }
function gmmLandRaw(x, z, noPool) { return __ZC(367, 25, this, arguments, new.target); }
function gmmLandRaw0(x, z) { return __ZC(367, 26, this, arguments, new.target); }
function gmmLand(x, z) { return __ZC(367, 27, this, arguments, new.target); }
var GMM_CY = {};
function gmmCentre(f) { var k = f[0] + "|" + f[1]; if (GMM_CY[k] === undefined) {
var s = 0;
for (var i = 0; i < 5; i++)
s += gmmLandRaw(f[0] + (i - 2) * f[2] * 0.3, f[1]);
GMM_CY[k] = Math.max(0.5, s / 5);
} return GMM_CY[k]; }
function gmmGround(x, z, feet) {
if (x >= GMM_IN_X - 2000) {
var fl = gmmFloorAt(x, z, feet === undefined || feet === null ? 1e9 : feet);
return fl === null ? 0 : fl;
}
var g = gmmLand(x, z), f = gmmFloorAt(x, z, feet === undefined || feet === null ? 1e9 : feet);
if (gmmWaterAt(x, z) !== null)
g = Math.max(g, gmmWaterAt(x, z) - 1.3);
return f !== null && f > g ? f : g;
}
function gmmWaterAt(x, z) {
if (Math.hypot(x - GMM_AT.lake.x, z - GMM_AT.lake.z) < GMM_AT.lake.r)
return -0.8;
if (z > gmmShore(x))
return -1.0;
var p = gmmPoolAt(x, z);
if (p && p.d < p.Q.r)
return p.Q.y - 0.3;
return null;
}
function gmmGroundCol(x, z, h) { return __ZC(367, 28, this, arguments, new.target); }
function gmmLandCol(k, x, z, h, n) { return __ZC(367, 29, this, arguments, new.target); }
function gmmTerrain(G) { return __ZC(367, 30, this, arguments, new.target); }
var GMM_ENV = {
day: { top: 0x3E6EAA, low: 0xB4C4CC, fog: 0xB4C4CC, fogD: 0.0024, sun: 0.92, sunCol: 0xFFE4B8, sunDir: [0.5, 0.62, 0.4], hemi: 0.6, hemiCol: 0xC8D4DC, hemiGround: 0x3A4424, stars: 0 },
wood: { top: 0x24305A, low: 0x6A6A88, fog: 0x4A5068, fogD: 0.0062, sun: 0.38, sunCol: 0xA8B8E8, sunDir: [-0.3, 0.7, -0.4], hemi: 0.42, hemiCol: 0x8A9AC8, hemiGround: 0x1A2014, stars: 0.6 },
winter: { top: 0x7A98B8, low: 0xD0DAE2, fog: 0xC8D2DA, fogD: 0.0052, sun: 0.6, sunCol: 0xF0F4FF, sunDir: [0.3, 0.4, 0.5], hemi: 0.55, hemiCol: 0xF0F4FF, hemiGround: 0xC8D0D8, stars: 0 },
shore: { top: 0x5A88B8, low: 0xD8E0E0, fog: 0xC0CCD0, fogD: 0.003, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [0.4, 0.55, 0.6], hemi: 0.75, hemiCol: 0xDCE8F0, hemiGround: 0x6A6A4A, stars: 0 },
mountain: { top: 0x4A7ABA, low: 0xD0DCE4, fog: 0xC4D0D8, fogD: 0.0028, sun: 1.0, sunCol: 0xFFF0D0, sunDir: [0.4, 0.7, 0.2], hemi: 0.75, hemiCol: 0xE0EAF4, hemiGround: 0x5A5A4A, stars: 0 },
inside: { top: 0x000000, low: 0x120C08, fog: 0x120C08, fogD: 0.012, sun: 0.15, sunCol: 0xFFE0B0, sunDir: [0.3, 0.8, 0.2], hemi: 0.6, hemiCol: 0xFFF0DC, hemiGround: 0x4A3A2A, stars: 0 },
meadow: { top: 0x4A90DA, low: 0xD8E8F4, fog: 0xCCDCE8, fogD: 0.0035, sun: 1.1, sunCol: 0xFFF4D8, sunDir: [0.4, 0.7, 0.3], hemi: 1.05, hemiCol: 0xFFFFFF, hemiGround: 0x6AAA3A, stars: 0 },
forest: { top: 0x5A7A9A, low: 0x8A9A8A, fog: 0x6E7E72, fogD: 0.0036, sun: 0.72, sunCol: 0xFFE8C0, sunDir: [0.4, 0.75, 0.3], hemi: 0.5, hemiCol: 0xB8C8B0, hemiGround: 0x2A3420, stars: 0 },
heath: { top: 0x6A92C0, low: 0xDCD8D0, fog: 0xD0CCC4, fogD: 0.0026, sun: 1.0, sunCol: 0xFFECD0, sunDir: [0.5, 0.45, 0.4], hemi: 0.8, hemiCol: 0xE8E4E0, hemiGround: 0x6A5A5A, stars: 0 },
fen: { top: 0x7A90A0, low: 0xC4CCC4, fog: 0xB4BEB4, fogD: 0.0058, sun: 0.62, sunCol: 0xF0F0E0, sunDir: [0.3, 0.4, 0.5], hemi: 0.62, hemiCol: 0xD0D8D0, hemiGround: 0x3A4430, stars: 0 },
oakwood: { top: 0x4A6A8A, low: 0x8A9A80, fog: 0x6E7A62, fogD: 0.0044, sun: 0.7, sunCol: 0xFFE0B0, sunDir: [0.4, 0.75, 0.3], hemi: 0.5, hemiCol: 0xC0C8A8, hemiGround: 0x34301C, stars: 0 },
vine: { top: 0x4A86C8, low: 0xE4DCC8, fog: 0xDCD4C0, fogD: 0.0024, sun: 1.12, sunCol: 0xFFE8B8, sunDir: [0.5, 0.55, 0.3], hemi: 0.9, hemiCol: 0xFFF4E0, hemiGround: 0x6A6A3A, stars: 0 },
under: { top: 0x0A0820, low: 0x1A1838, fog: 0x14122C, fogD: 0.006, sun: 0.3, sunCol: 0xC8C0FF, sunDir: [0.2, 0.9, 0.1], hemi: 0.6, hemiCol: 0xB8B0F0, hemiGround: 0x1A1A2A, stars: 0.4 }
};
function gmmEnvNow() { return __ZC(367, 31, this, arguments, new.target); }
function gmmSky(G) { return __ZC(367, 32, this, arguments, new.target); }
function gmmForestD(x, z) { return __ZC(367, 33, this, arguments, new.target); }
function gmmTreeKind(x, z, r) { return __ZC(367, 34, this, arguments, new.target); }
var GMM_TREEK = ["oak", "beech", "spruce", "birch", "snow"];
function gmmCell() { return GMM.lite ? 12 : 7.5; }
function gmmTreeIn(i, j) { return __ZC(367, 35, this, arguments, new.target); }
function gmmTreeHit(x, z) {
var C = gmmCell(), ci = Math.floor(x / C), cj = Math.floor(z / C);
for (var i = ci - 1; i <= ci + 1; i++)
for (var j = cj - 1; j <= cj + 1; j++) {
var T = gmmTreeIn(i, j);
if (T && Math.hypot(x - T.x, z - T.z) < 0.55 * T.s + 0.35)
return true;
}
return false;
}
function gmmTreeProto(kind) { return __ZC(367, 36, this, arguments, new.target); }
function gmmForest(G) { return __ZC(367, 37, this, arguments, new.target); }
function gmmForestFill(x, z, force) { return __ZC(367, 38, this, arguments, new.target); }
function gmmFlowerGeo() { return __ZC(367, 39, this, arguments, new.target); }
function gmmTuftGeo() { return __ZC(367, 40, this, arguments, new.target); }
function gmmUnder(G) { return __ZC(367, 41, this, arguments, new.target); }
function gmmUnderFill(x, z) { return __ZC(367, 42, this, arguments, new.target); }
function gmmRoadSigns(G) { return __ZC(367, 43, this, arguments, new.target); }
var GMM_DOORS = [];
function gmmEnterable(B, room, name) {
if (!B || !B.door)
return;
var D = { x: B.door.x, z: B.door.z, ry: B.ry || 0, room: room, name: name, y: B.y };
GMM_DOORS.push(D);
gmmSpot(D.x, D.z, 2.6, name, "go inside", function () { gmmEnterRoom(room, D); }, B.y !== undefined ? B.y : undefined);
if (GMM_ROOMS[room])
GMM_ROOMS[room].door = D;
return D;
}
var GMM_TOWN = [
["grimmhouse", "The Brothers Grimm's house", -25, -33, 14, 11, 3, 0xEAD8B8, 0x4A2E1A, 0x9A3A24, ["J. & W. GRIMM", "Librarians · collectors of tales"]],
["inn", "The Knallhütte inn", 29, -34, 16, 12, 2, 0xE8D0A8, 0x3A2414, 0x8A3420, ["ZUR KNALLHÜTTE", "beer · bread · tales by the fire"]],
["tailor", "The tailor's workshop", -47, 4, 9, 8, 3, 0xDCE0D0, 0x4A2E1A, 0x6A6A70, ["TAILOR", "coats mended · seven at one blow"]],
["porridge", "The porridge house", 48, 9, 9, 8, 2, 0xF0E0C0, 0x5A3420, 0xA84A2A, null],
["shoemaker", "The shoemaker's shop", -41, 35, 9, 8, 3, 0xE0D4C4, 0x3A2414, 0x7A3A2A, ["SHOEMAKER", "boots and shoes, fine work"]],
["baker", "The bakery", 41, 35, 10, 8, 2, 0xF2E4C4, 0x4A2E1A, 0x9A4A24, ["BAKER", "bread · cake · pretzels"]],
["bookbinder", "The bookbinder's", 62, -19, 9, 9, 3, 0xE0DCC8, 0x3A2414, 0x5A5E66, ["BOOKBINDER", "the tales in calf and gold"]],
["apothecary", "The apothecary", -64, 21, 9, 9, 3, 0xE8E0D0, 0x4A2E1A, 0x6A3A2A, ["APOTHECARY", "herbs · simples · remedies"]],
["smithy", "The smithy", 65, 25, 11, 9, 1, 0xC8C0B0, 0x3A2414, 0x4A4A4A, ["SMITH", "horses shod · iron worked"]],
["weaver", "The weaver's house", -19, 57, 10, 8, 2, 0xE4D8BC, 0x4A2E1A, 0x8A3A24, null],
["cooper", "The cooper's yard", 21, 57, 10, 8, 2, 0xDCD0B4, 0x4A2E1A, 0x9A4A2A, ["COOPER", "barrels · tubs · buckets"]],
["townhome", "The Wild family's house", -58, -28, 10, 9, 3, 0xEADCC0, 0x3A2414, 0x9A3A24, null]
];
var GMM_TOWNP = [0xEADCC0, 0xE8D8B0, 0xF0E4CC, 0xDCD4C0, 0xE4D0B4, 0xF2E8D8, 0xD8CCB0], GMM_TOWNR = [0x9A3A24, 0x8A3420, 0x6A6A70, 0x7A3A2A, 0x5A5E66, 0xA84A2A, 0x4A4A52];
var GMM_STREETS = [70, 109, 147, 185];
function gmmTownFill(g, y) { return __ZC(367, 44, this, arguments, new.target); }
function gmmStreets(g) { return __ZC(367, 45, this, arguments, new.target); }
function gmmTown(G) { return __ZC(367, 46, this, arguments, new.target); }
var GMM_WISHES = ["The water ripples. Far off, a frog croaks, as if to say it heard.", "A ripple runs out to the rim and back. Something tells you: be kind to the little grey man you meet in the wood.", "The coin turns over and over as it sinks. Wishes here, they say, come true for the youngest of three.", "The water goes still, and for a moment you see a golden ball deep down."];
function gmmWish() { setStatus("🪙 You throw a coin into the fountain. " + GMM_WISHES[(Math.random() * GMM_WISHES.length) | 0]); }
var GMM_GATE_Z = 192, GMM_WALL_R = 194;
var GMM_HOMEK = [["burgher", "A burgher's house"], ["kasselhome", "A Kassel house"], ["lodgings", "Lodgings over a workshop"], ["kasselhome", "A Kassel house"], ["widowhome", "An old widow's rooms"], ["burgher", "A burgher's house"]];
var GMM_TRADES = [
{ room: "butcher", name: "The butcher's shop", sign: ["BUTCHER", "sausages · hams · fresh meat"] },
{ room: "chandler", name: "The chandler's", sign: ["CHANDLER", "candles of tallow and wax"] },
{ room: "potter", name: "The potter's", sign: ["POTTER", "jugs · bowls · stove tiles"] },
{ room: "brewer", name: "The brewhouse", sign: ["BREWHOUSE", "Kassel brown beer"] },
{ room: "clockmaker", name: "The clockmaker's", sign: ["CLOCKMAKER", "clocks mended and made"] }
];
function gmmTradeAt(n, ri) { if (n === 0)
GMM.tradeI = 0; if (ri > 2 || n % 4 !== 2 || (GMM.tradeI || 0) >= GMM_TRADES.length)
return null; return GMM_TRADES[GMM.tradeI++]; }
function gmmGarden(g, B, ry, w, d) { return __ZC(367, 47, this, arguments, new.target); }
function gmmTownWall(g) { return __ZC(367, 48, this, arguments, new.target); }
var GMM_STALLS = [
["sausages and smoked hams", 0x8A2A2A, "m", "The sausage man", "You sell sausages, smoked hams and bacon from the butcher in the Unterneustadt."],
["loaves, rolls and pretzels", 0xC89A4A, "f", "The bread woman", "You sell rye loaves, white rolls and pretzels from the bakery, and complain that flour is dear since the war."],
["onions, leeks and carrots", 0x5A8A3A, "f", "The vegetable woman", "You grow onions, leeks, carrots and cabbages in a garden outside the walls and walk in with them every market day."],
["pots, jugs and bowls", 0x8A5A3A, "m", "The potter's lad", "You sell your master's brown glazed jugs, bowls and pots, and drop one now and then."],
["wool, linen and lace", 0xE8E0D0, "f", "The linen seller", "You sell spun wool, homespun linen and a little lace from the villages, and know every spinner for miles."],
["fish from the Fulda", 0x5A7A9A, "m", "The fishmonger", "You sell carp, pike and eels caught in the river Fulda, fresh this morning, and shout about it."],
["herbs and simples", 0x6A8A4A, "f", "The herb woman", "You sell dried herbs and simples gathered in the wood: camomile, rampion, sage, St John's wort. You warn people off the enchantress's garden."],
["brooms, baskets and wooden spoons", 0xA88A5A, "m", "The basket maker", "You weave baskets and make brooms and wooden spoons through the winter, and sell them all summer."],
["candles and soap", 0xF0E4B0, "f", "The chandler's wife", "You sell tallow candles, a few dear wax ones, and soft soap, from your husband's shop up the street."],
["apples, plums and nuts", 0xB83A2A, "m", "The orchard man", "You sell apples, plums, pears and walnuts from your orchard at Wilhelmshöhe."],
["toys and gingerbread", 0xD87A2A, "f", "The gingerbread woman", "You sell gingerbread hearts and little carved wooden toys, and the children all know you."],
["boots mended while you wait", 0x4A3A2A, "m", "The cobbler", "You sit on a stool and mend boots while people wait, and talk the whole time."]
];
function gmmMarket(g, y) { return __ZC(367, 49, this, arguments, new.target); }
var GMM_FOLK = [
["A washerwoman", "f", { topKind: "dress", top: 0x6A7A8A, layer: "apron", layerColor: 0xF0F0E8, hat: "hood", hatColor: 0xF0F0F0 }, "You wash linen for the better houses down by the Fulda and carry it home in a basket on your hip.", "My arms ache from the river, but the linen's clean!"],
["A chimney sweep", "m", { top: 0x1A1A1A, bottom: 0x1A1A1A, hat: "tophat", hatColor: 0x1A1A1A }, "You sweep the town's chimneys, black from head to foot. Meeting a sweep brings luck, they say.", "Touch my button for luck! Everyone does."],
["A French officer", "m", { top: 0x1E2A5A, bottom: 0xE8E8E0, hat: "tricorn", hatColor: 0x1A1A1A }, "You serve King Jérôme of Westphalia, Napoleon's brother, in his capital Kassel. You speak German with a French accent, are polite but proud, and miss Paris.", "Bonjour. Kassel is a pretty town, n'est-ce pas? Not Paris, but pretty."],
["A student", "m", { top: 0x2A3A5A, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x2A2A3A }, "You have come from the university at Marburg, where the Grimm brothers studied law, and you write bad poems.", "Have you read Herr von Arnim's songs? Everyone at Marburg is collecting old songs and tales now."],
["A carter", "m", { top: 0x6A5A3A, bottom: 0x3A3A2A, hat: "brimmed", hatColor: 0x4A3A2A }, "You drive a cart between Kassel and Göttingen with cloth and grain, and know every inn on the road.", "Six hours from Göttingen and the road's all ruts. I need a beer."],
["A maid with a basket", "f", { topKind: "dress", top: 0x8A5A6A, layer: "apron", layerColor: 0xE8E0D0, hair: 0x8A5A2A, hairStyle: "bun" }, "You are a maid in a burgher's house, sent to market for eggs and butter, and you would rather talk than hurry.", "Madam wants eggs, and the dear knows where I'll find a dozen at that price."],
["An old soldier", "m", { top: 0x4A5A3A, bottom: 0x3A3A2A, hat: "cap", hatColor: 0x3A3A2A, beard: 1, hair: 0xB8B8B0 }, "You fought for the old Elector of Hesse before the French came, and you limp. You know the tale of the soldier and the tinder-box, and the one of the twelve dancing princesses.", "I marched to Holland and back for the old Elector. Now look at me."],
["A pastor's daughter", "f", { topKind: "dress", top: 0x3A4A6A, hair: 0xE8C870, hairStyle: "long" }, "You are the daughter of a pastor in the Neustadt, you read novels secretly and you know the Wild family, whose daughter Dortchen tells the Grimms many tales.", "Dortchen Wild told Wilhelm Grimm the tale of the Elves and the Shoemaker, did you know?"],
["A pedlar", "m", { top: 0x6A4A3A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x3A2A1A, beard: 1 }, "You walk from town to town with a pack of needles, ribbons, buttons and almanacs, and you are a great teller of tales.", "Needles, pins, ribbons, buttons! And a tale for free with every purchase."],
["A goose girl", "f", { topKind: "dress", top: 0x6A8AC8, layer: "apron", layerColor: 0xF0F0E8, hair: 0xE8C870, hairStyle: "braids" }, "You drive the geese out to the meadows by the river every morning and bring them back at night.", "Have you seen a white goose with a black spot? One always wanders off."],
["A night watchman", "m", { top: 0x3A3A2A, bottom: 0x2A2A2A, hat: "brimmed", hatColor: 0x2A2A2A }, "You call the hours through the streets at night with your lantern and halberd, and sleep most of the day.", "Ten o'clock and all's well... at least it was last night."],
["A miller's wife", "f", { topKind: "dress", top: 0xD8D0C0, layer: "apron", layerColor: 0xF0F0E8, hat: "hood", hatColor: 0xE8E8E0 }, "You come in from the mill outside the walls with flour on your sleeves, to sell and to buy.", "Flour on everything, always. Mind your coat."],
["A town councillor", "m", { top: 0x2A2A2A, bottom: 0x2A2A2A, layer: "longcoat", layerColor: 0x3A2A1A, hat: "tophat", hatColor: 0x1A1A1A }, "You sit on the town council at the Rathaus and worry about taxes, the French and the price of firewood.", "The council meets at three. The French want more money, as always."],
["A farmer's boy", "m", { top: 0xB8A070, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x5A4A3A }, "You brought turnips in on the cart with your father and have been sent to look after the horse, and you would rather watch the soldiers.", "Is it true the King has a golden coach? I want to see it."],
["A lacemaker", "f", { topKind: "dress", top: 0x5A3A4A, hair: 0x6A4A2A, hairStyle: "bun" }, "You make bobbin lace by the window all day and your eyes are tired, and you know the tale of the three spinners.", "Lace takes patience. And good eyes, which I'm losing."],
["A Jewish cloth merchant", "m", { top: 0x2A2A3A, bottom: 0x2A2A2A, layer: "longcoat", layerColor: 0x1A1A2A, hat: "brimmed", hatColor: 0x1A1A1A, beard: 1 }, "You sell fine cloth from Frankfurt and Leipzig. Under King Jérôme the Jews of Westphalia have been made equal citizens this year, and you are hopeful.", "Good cloth from the Leipzig fair. Feel it. Feel the weight of it."],
["A flower girl", "f", { topKind: "dress", top: 0xC86A8A, hair: 0x8A4A2A, hairStyle: "braids" }, "You sell little bunches of wild flowers from the wood: violets in spring, cornflowers in summer, heather now.", "A posy, a posy for your sweetheart?"],
["A journeyman carpenter", "m", { top: 0x1A1A1A, bottom: 0x1A1A1A, hat: "brimmed", hatColor: 0x1A1A1A }, "You are on your wander years, walking from town to town for three years to learn your trade, in black corduroy with a broad hat.", "Three years and a day on the road, and Kassel's the twelfth town. Is there work?"]
];
function gmmFolkOne(i, x, z, F, wr, parent) { return __ZC(367, 50, this, arguments, new.target); }
function gmmTownFolk(g) { return __ZC(367, 51, this, arguments, new.target); }
function gmmDistrict(k, r) { var A = GMM_AT[k], g = new THREE.Group(); GMM.G.add(g); var D = { g: g, x: A.x, z: A.z, r: r || A.r || 100, k: k }; GMM.districts.push(D); return g; }
function gmmGingerTex() { return __ZC(367, 52, this, arguments, new.target); }
function gmmGingerHouse(p, x, z, ry) { return __ZC(367, 53, this, arguments, new.target); }
function gmmHansel() { return __ZC(367, 54, this, arguments, new.target); }
function gmmRedCap() { return __ZC(367, 55, this, arguments, new.target); }
function gmmRapunzel() { return __ZC(367, 56, this, arguments, new.target); }
function gmmHolleTop() { return __ZC(367, 57, this, arguments, new.target); }
function gmmSnowWhite() { return __ZC(367, 58, this, arguments, new.target); }
function gmmGooseTale() { return __ZC(367, 59, this, arguments, new.target); }
function gmmPalace(p, x, z, ry, o) { return __ZC(367, 60, this, arguments, new.target); }
function gmmBriar() { return __ZC(367, 61, this, arguments, new.target); }
function gmmCinder() { return __ZC(367, 62, this, arguments, new.target); }
function gmmFrogTale() { return __ZC(367, 63, this, arguments, new.target); }
function gmmDancePalace() { return __ZC(367, 64, this, arguments, new.target); }
function gmmRumpel() { return __ZC(367, 65, this, arguments, new.target); }
var GMM_BREMEN = [
{ k: "donkey", n: "An old donkey", x: 700, z: -150, say: "My master wants to be rid of me: I'm too old to carry the sacks. I'm off to Bremen to be a town musician! Come along?", join: "\"I'll play the lute,\" says the donkey." },
{ k: "dog", n: "An old hound, panting by the road", x: 880, z: -60, say: "I'm old and weaker every day, I can't hunt, so my master wanted to kill me. I ran. But how will I earn my bread now?", join: "\"I'll beat the kettledrum,\" says the dog." },
{ k: "cat", n: "A cat with a face like three days of rain", x: 940, z: 60, say: "My teeth are blunt and I'd rather sit by the stove than chase mice, so my mistress wanted to drown me. I got away. Now what?", join: "\"I know all about night music,\" says the cat." },
{ k: "rooster", n: "A rooster on a farm gate, crowing his head off", x: 985, z: 122, say: "Tomorrow guests are coming and the cook means to make soup of me! So I'm crowing while I still have a head to crow with.", join: "\"Something better than death you'll find anywhere,\" says the donkey. \"You have a good voice: come with us.\"" }
];
function gmmBremenTale() { return __ZC(367, 66, this, arguments, new.target); }
function gmmKidsTale() { return __ZC(367, 67, this, arguments, new.target); }
var GMM_FISH = [
{ n: "the hovel", ask: "", sea: 0x2A6A7A, sky: 0x5A88B8, low: 0xD8E0E0, sun: 0.95, say: "" },
{ n: "a cottage", ask: "\"Go and ask for a little cottage,\" says his wife.", sea: 0x3A8A4A, sky: 0x6A98C0, low: 0xD8E4D8, sun: 0.9, say: "The sea is green and yellow now, not so clear. \"Go home,\" says the flounder, \"she has it already.\"" },
{ n: "a great stone castle", ask: "\"The cottage is too small. Go and ask for a great stone castle.\"", sea: 0x5A3A7A, sky: 0x5A6A90, low: 0xB8BCC8, sun: 0.75, say: "The water is purple and dark blue and grey and thick. \"Go home,\" says the flounder, \"she is standing at the door.\"" },
{ n: "a king's palace", ask: "\"I will be king!\"", sea: 0x4A4A52, sky: 0x4A5268, low: 0x9AA0AC, sun: 0.6, say: "The sea is dark grey, and it heaves up from below and stinks. \"Go home, she is king already.\"" },
{ n: "an emperor's palace of gold", ask: "\"I will be emperor!\"", sea: 0x2A2A30, sky: 0x3A3A48, low: 0x7A7A84, sun: 0.45, say: "The sea is black and thick and boils up from below, and a cutting wind blows over it. \"Go home, she is emperor already.\"" },
{ n: "a great church", ask: "\"I will be pope!\"", sea: 0x1A1A20, sky: 0x2A2A34, low: 0x5A5A64, sun: 0.32, say: "The wind roars, the waves are as high as church towers, and the sky is red at the edge as before a storm. \"Go home, she is pope already.\"" },
{ n: "the hovel again", ask: "\"I will be like God, and make the sun and moon rise!\"", sea: 0x0A0A10, sky: 0x14141C, low: 0x34343C, sun: 0.2, say: "The storm rages so the houses and trees blow over and the mountains tremble and the sea comes in black waves as high as mountains, with white foam on top. \"Go home,\" says the flounder, \"she is sitting in her old hovel again.\" And there they are sitting still, to this very day." }
];
function gmmFisherTale() { return __ZC(367, 68, this, arguments, new.target); }
function gmmGiants() { return __ZC(367, 69, this, arguments, new.target); }
function gmmWinter() { return __ZC(367, 70, this, arguments, new.target); }
function gmmFolk(seed, x, z, ry, o, talk, g, y) { o.talk = talk; return gmmPerson(seed, x, z, ry, o, g, y); }
function gmmTalkOf(name, persona, greet) { return { name: name, persona: persona + " Never mention films.", greet: greet }; }
function gmmBrook(g, pts, w, col) { return __ZC(367, 71, this, arguments, new.target); }
function gmmBearShape(p, x, y, z, s) { return __ZC(367, 72, this, arguments, new.target); }
function gmmSwan(p, x, y, z) { return gmmBirdShape(p, x, y, z, 1.7, 0xF6F6F2, 0.62, 0xE86A1A); }
function gmmRoseTree(g, x, z, col) {
var y = gmmGround(x, z);
gmmC(0.07, 0.1, 1.2, "bark", 0x4A3A2A, x, y + 0.6, z, g, 6);
var lb = gmmLeafBall(g, x, y + 1.6, z, 1.0, 0x2A4A22);
lb.userData.keep = 1;
for (var r = 0; r < 14; r++) {
var a = r * 2.4, h = 0.9 + ((r * 7) % 5) * 0.25;
var ro = gmmS(0.11, col, x + Math.cos(a) * 0.85, y + h, z + Math.sin(a) * 0.85, g, 6);
ro.userData.keep = 1;
}
}
function gmmJuniper(g, x, z, s) { return __ZC(367, 73, this, arguments, new.target); }
function gmmLion(p, x, z, ry) { return __ZC(367, 74, this, arguments, new.target); }
function gmmCage(p, x, z, ry) { return __ZC(367, 75, this, arguments, new.target); }
function gmmHallHouse(p, x, z, ry, o) { return __ZC(367, 76, this, arguments, new.target); }
function gmmSnowRoseTale() { return __ZC(367, 77, this, arguments, new.target); }
function gmmGooseGirlTale() { return __ZC(367, 78, this, arguments, new.target); }
function gmmSwansTale() { return __ZC(367, 79, this, arguments, new.target); }
function gmmRoundRing(x, z, r0, r1) { GMM.moats = GMM.moats || []; GMM.moats.push({ x: x, z: z, r0: r0, r1: r1 }); }
function gmmRavensTale() { return __ZC(367, 80, this, arguments, new.target); }
function gmmIronJohnTale() { return __ZC(367, 81, this, arguments, new.target); }
function gmmThrushTale() { return __ZC(367, 82, this, arguments, new.target); }
function gmmBroSisTale() { return __ZC(367, 83, this, arguments, new.target); }
function gmmWaterTale() { return __ZC(367, 84, this, arguments, new.target); }
function gmmHansTale() { return __ZC(367, 85, this, arguments, new.target); }
function gmmJuniperTale() { return __ZC(367, 86, this, arguments, new.target); }
var GMM_ROOMS = {};
var GMM_RORDER = [];
function gmmRoomDef(k, R) { R.k = k; R.i = GMM_RORDER.length; R.x = GMM_IN_X + R.i * 320; GMM_RORDER.push(k); GMM_ROOMS[k] = R; return R; }
function gmmRoomKit(R) { return __ZC(367, 87, this, arguments, new.target); }
function gmmShell(R, g) { return __ZC(367, 88, this, arguments, new.target); }
function gmmRoomGet(k) { return __ZC(367, 89, this, arguments, new.target); }
function gmmShowOnly(R) {
for (var q in GMM_ROOMS) {
var O = GMM_ROOMS[q];
if (O.g) {
O.g.visible = O === R;
O.D.visible = O === R;
}
}
if (GMM.outside)
GMM.outside.forEach(function (o) { o.visible = !R; });
}
function gmmEnterRoom(k, D) { return __ZC(367, 90, this, arguments, new.target); }
function gmmLeaveRoom(R) { return __ZC(367, 91, this, arguments, new.target); }
function gmmOutside(D) { return __ZC(367, 92, this, arguments, new.target); }
var GMM_WOOD = 0x7A5232, GMM_DARK = 0x4A2E1A;
function gmmTable(g, x, z, w, d, col, o) { return __ZC(367, 93, this, arguments, new.target); }
function gmmChair(g, x, z, ry, col, s) { return __ZC(367, 94, this, arguments, new.target); }
function gmmBench(g, x, z, ry, L, col) { var b = gmmG(x, 0, z, g, ry); gmmB(L, 0.06, 0.36, "wood", col || GMM_WOOD, 0, 0.44, 0, b); gmmB(0.06, 0.44, 0.3, "wood", col || GMM_WOOD, -L / 2 + 0.2, 0.22, 0, b); gmmB(0.06, 0.44, 0.3, "wood", col || GMM_WOOD, L / 2 - 0.2, 0.22, 0, b); return b; }
function gmmBed(g, x, z, ry, o) { return __ZC(367, 95, this, arguments, new.target); }
function gmmShelves(g, x, z, ry, w, h, o) { return __ZC(367, 96, this, arguments, new.target); }
function gmmStove(g, x, z, ry, col) { return __ZC(367, 97, this, arguments, new.target); }
function gmmHearth(g, R, x, z, ry, o) { return __ZC(367, 98, this, arguments, new.target); }
function gmmBarrel(g, x, z, h, y) { var b = gmmC(0.36, 0.36, h || 0.9, "wood", 0x6A4A2E, x, (y || 0) + (h || 0.9) / 2, z, g, 12); gmmC(0.37, 0.37, 0.05, null, 0x2A2A2A, x, (y || 0) + (h || 0.9) * 0.2, z, g, 12); gmmC(0.37, 0.37, 0.05, null, 0x2A2A2A, x, (y || 0) + (h || 0.9) * 0.8, z, g, 12); return b; }
function gmmChest(g, x, z, ry, col) { var c = gmmG(x, 0, z, g, ry); gmmB(1, 0.55, 0.55, "wood", col || 0x6A3A1E, 0, 0.28, 0, c); gmmB(1.02, 0.12, 0.57, "wood", col || 0x6A3A1E, 0, 0.6, 0, c); gmmB(1.04, 0.06, 0.1, null, 0x2A2A2A, 0, 0.4, 0.28, c); gmmB(0.1, 0.12, 0.04, null, 0xC8A040, 0, 0.45, 0.3, c); return c; }
function gmmWheel(g, x, z, ry) { return __ZC(367, 99, this, arguments, new.target); }
function gmmLoom(g, x, z, ry) { return __ZC(367, 100, this, arguments, new.target); }
function gmmClock(g, x, z, ry, col) { return __ZC(367, 101, this, arguments, new.target); }
function gmmCradle(g, x, z, ry) { return __ZC(367, 102, this, arguments, new.target); }
function gmmRug(g, x, z, w, d, col, col2) { gmmB(w, 0.02, d, null, col, x, 0.01, z, g); if (col2)
gmmB(w - 0.3, 0.025, d - 0.3, null, col2, x, 0.012, z, g); }
function gmmCandle(g, x, y, z, lit) { gmmC(0.03, 0.035, 0.2, null, 0xF0E8D0, x, y + 0.1, z, g, 8); if (lit !== false) {
var f = gmmK(0.02, 0.07, null, 0, x, y + 0.24, z, g, 6);
f.material = gmmGlowM(0xFFC040);
var gl = wGlow(0xFFB060, 0.5, 0.5);
gl.position.set(x, y + 0.24, z);
g.add(gl);
} }
function gmmPicture(g, x, y, z, ry, w, h, draw, seed) { return __ZC(367, 103, this, arguments, new.target); }
function gmmLandscape(c, W, H, r) { return __ZC(367, 104, this, arguments, new.target); }
function gmmPortrait(c, W, H, r) { return __ZC(367, 105, this, arguments, new.target); }
var GMM_PERSONA_1812 = "It is Kassel in 1812; Napoleon's brother Jérôme is King of Westphalia. ";
gmmRoomDef("grimmhouse", { n: "The Brothers Grimm's study", icon: "📚", w: 12, d: 10, h: 3.4, wall: ["plaster", 0xE8DCC0], floor: ["wood", 0x7A5232], timber: 1,
say: "Two desks face each other under the window, piled with papers. Every wall is books. Jacob and Wilhelm look up.",
f: function (R, g) { return __ZC(367, 106, this, arguments, new.target); } });
gmmRoomDef("grimmschool", { n: "The Grimms' Schoolroom", icon: "🎓", w: 14, d: 10, h: 3.2, wall: ["plaster", 0xEADFC8], floor: ["wood", 0x8A6A48], timber: 1, ceil: 0xEFE6D4,
say: "Benches face a slate board and a lectern. Twelve lessons on the brothers and their tales, and the Collector's examination.",
f: function (R, g) { return __ZC(367, 107, this, arguments, new.target); } });
gmmRoomDef("inn", { n: "The Knallhütte inn", icon: "🍺", w: 16, d: 12, h: 3.2, wall: ["plaster", 0xE0CCA8], floor: ["wood", 0x6A4A2E], timber: 1,
say: "A low room of black beams, long tables, a fire. By the hearth, in the good chair, sits Dorothea Viehmann.",
f: function (R, g) { return __ZC(367, 108, this, arguments, new.target); } });
gmmRoomDef("tailor", { n: "The tailor's workshop", icon: "🪡", w: 9, d: 8, h: 3, wall: ["plaster", 0xE4E0D0], floor: ["wood", 0x8A6A48],
say: "Bolts of cloth, a cutting table, and on the window sill a slice of bread and jam, with the flies already settling.",
f: function (R, g) { return __ZC(367, 109, this, arguments, new.target); } });
gmmRoomDef("porridge", { n: "The porridge house kitchen", icon: "🍯", w: 8, d: 7, h: 2.8, wall: ["plaster", 0xF0E4C8], floor: ["stone", 0x9A9284],
say: "A poor, clean kitchen. On the hearth stands a little black pot the girl was given by an old woman in the wood.",
f: function (R, g) { return __ZC(367, 110, this, arguments, new.target); } });
gmmRoomDef("shoemaker", { n: "The shoemaker's shop", icon: "👞", w: 9, d: 8, h: 3, wall: ["plaster", 0xE0D4C4], floor: ["wood", 0x7A5A3A], timber: 1,
say: "A low bench, lasts and awls, leather cut out ready. The shoemaker is poor: this is the last leather he has.",
f: function (R, g) { return __ZC(367, 111, this, arguments, new.target); } });
gmmRoomDef("baker", { n: "The bakery", icon: "🥨", w: 10, d: 8, h: 3, wall: ["plaster", 0xF2E4C4], floor: ["stone", 0xA89A84],
say: "Warm as summer. A great brick oven, loaves on every shelf, pretzels hanging on a pole.",
f: function (R, g) { return __ZC(367, 112, this, arguments, new.target); } });
gmmRoomDef("bookbinder", { n: "The bookbinder's", icon: "📕", w: 9, d: 9, h: 3.2, wall: ["plaster", 0xE0DCC8], floor: ["wood", 0x7A5232], timber: 1,
say: "A press, a sewing frame, pots of glue, skins of calf. On the bench, a stack of the brothers' new book waiting for covers.",
f: function (R, g) { return __ZC(367, 113, this, arguments, new.target); } });
gmmRoomDef("apothecary", { n: "The apothecary", icon: "🌿", w: 9, d: 9, h: 3.2, wall: ["plaster", 0xE8E0D0], floor: ["floortile", 0xC8C0B0],
say: "Rows of jars, a brass scale, a mortar and pestle, bunches of herbs drying from the beams.",
f: function (R, g) { return __ZC(367, 114, this, arguments, new.target); } });
gmmRoomDef("smithy", { n: "The smithy", icon: "⚒️", w: 11, d: 9, h: 3.6, wall: ["stone", 0x8A847A], floor: ["stone", 0x6A6458], beams: true,
say: "The forge glows. An anvil, tongs, horseshoes on the wall, the bellows wheezing.",
f: function (R, g) { return __ZC(367, 115, this, arguments, new.target); } });
gmmRoomDef("weaver", { n: "The weaver's house", icon: "🧶", w: 10, d: 8, h: 3, wall: ["plaster", 0xE4D8BC], floor: ["wood", 0x8A6A48], timber: 1,
say: "Two looms clack. Baskets of wool, a spinning wheel, linen bleaching by the window.",
f: function (R, g) { return __ZC(367, 116, this, arguments, new.target); } });
gmmRoomDef("cooper", { n: "The cooper's yard", icon: "🛢️", w: 10, d: 8, h: 3.4, wall: ["plaster", 0xDCD0B4], floor: ["wood", 0x6A4A2E],
say: "Staves, hoops, a shaving horse, barrels in every state of making.",
f: function (R, g) { return __ZC(367, 117, this, arguments, new.target); } });
gmmRoomDef("townhome", { n: "The Wild family's parlour", icon: "🎹", w: 11, d: 9, h: 3.2, wall: ["plaster", 0xEADCC0], floor: ["wood", 0x7A5232], timber: 1,
say: "A comfortable parlour: a tiled stove, a sofa, a fortepiano, portraits. The Wild daughters told the brothers many tales.",
f: function (R, g) { return __ZC(367, 118, this, arguments, new.target); } });
gmmRoomDef("townhall", { n: "The town hall", icon: "🏛️", w: 18, d: 12, h: 5, wall: ["plaster", 0xE8DCC0], floor: ["floortile", 0xB8B0A0], timber: 1,
say: "The council hall: a long table, banners of Hesse and Westphalia, and at the tall window a princess who has never once laughed.",
f: function (R, g) { return __ZC(367, 119, this, arguments, new.target); } });
gmmRoomDef("church", { n: "St Martin's church", icon: "⛪", w: 14, d: 30, h: 11, wall: ["stone", 0xC8BCA8], floor: ["floortile", 0xA8A090], vault: 1, winCol: 0x8A7AC8, win: 5, light: 1.1,
say: "A tall stone nave, cool and quiet; coloured light from the windows, an organ above the door.",
f: function (R, g) { return __ZC(367, 120, this, arguments, new.target); } });
gmmRoomDef("kasselhome", { n: "A Kassel house", icon: "🏠", w: 10, d: 8, h: 2.8, wall: ["plaster", 0xE8DCC4], floor: ["wood", 0x7A5A3A], timber: 1,
say: "A family's living room and kitchen in one: the tiled stove, the table where everyone eats, the beds in the alcove behind a curtain, the spinning wheel by the window.",
f: function (R, g) { return __ZC(367, 121, this, arguments, new.target); } });
gmmRoomDef("burgher", { n: "A burgher's house", icon: "🕰️", w: 11, d: 9, h: 3.2, wall: ["plaster", 0xF0E6D0], floor: ["wood", 0x8A6A48], timber: 1,
say: "A well-to-do townsman's best room: polished furniture, a glass-fronted cabinet of good china, a clock that chimes the quarters, his account books on the desk.",
f: function (R, g) { return __ZC(367, 122, this, arguments, new.target); } });
function gmmHangers(g, x, z, n, col, sz) { gmmB(n * 0.5 + 0.4, 0.06, 0.06, "wood", 0x4A2E1A, x, 2.3, z, g); for (var i = 0; i < n; i++) {
gmmC(0.01, 0.01, 0.3, null, 0x3A3A3A, x - n * 0.25 + 0.25 + i * 0.5, 2.12, z, g, 4);
var h = gmmS(sz || 0.16, col, x - n * 0.25 + 0.25 + i * 0.5, 1.85, z, g, 8);
h.scale.y = 1.8;
} }
gmmRoomDef("butcher", { n: "The butcher's shop", icon: "🥩", w: 10, d: 8, h: 3, wall: ["plaster", 0xF0EAE0], floor: ["floortile", 0xB8B0A0], timber: 1,
say: "Hams and sausages hanging from the beams, a scrubbed block, the scales, and the butcher in his striped apron.",
f: function (R, g) { return __ZC(367, 123, this, arguments, new.target); } });
gmmRoomDef("chandler", { n: "The chandler's", icon: "🕯️", w: 9, d: 8, h: 3, wall: ["plaster", 0xE8DCC0], floor: ["wood", 0x6A4A2E], timber: 1,
say: "Rows of candles hanging by their wicks to dry, the vat of tallow over the fire, and the sweet-and-sour smell of wax and fat.",
f: function (R, g) { return __ZC(367, 124, this, arguments, new.target); } });
gmmRoomDef("potter", { n: "The potter's", icon: "🏺", w: 10, d: 8, h: 3, wall: ["plaster", 0xE4D8C0], floor: ["stone", 0x9A9284],
say: "The wheel, shelves of brown glazed jugs and bowls drying, green stove tiles stacked by the kiln door.",
f: function (R, g) { return __ZC(367, 125, this, arguments, new.target); } });
gmmRoomDef("brewer", { n: "The brewhouse", icon: "🍺", w: 12, d: 9, h: 3.6, wall: ["stone", 0x9A9284], floor: ["stone", 0x7A7468], beams: true,
say: "The great copper over its fire, mash tuns of oak, barrels stacked to the beams, and the warm smell of malt.",
f: function (R, g) { return __ZC(367, 126, this, arguments, new.target); } });
gmmRoomDef("clockmaker", { n: "The clockmaker's", icon: "🕰️", w: 9, d: 8, h: 3, wall: ["plaster", 0xEADFC8], floor: ["wood", 0x7A5232], timber: 1,
say: "A wall of ticking clocks, cuckoo clocks from the Black Forest among them, a bench under the window strewn with tiny wheels and springs.",
f: function (R, g) { return __ZC(367, 127, this, arguments, new.target); } });
gmmRoomDef("lodgings", { n: "Lodgings over a workshop", icon: "🛏️", w: 10, d: 8, h: 2.6, wall: ["plaster", 0xE8DCC4], floor: ["wood", 0x7A5A3A], timber: 1,
say: "A low room under the roof beams, rented to a journeyman and a student: two narrow beds, a table of books and candle ends, boots by the door.",
f: function (R, g) { return __ZC(367, 128, this, arguments, new.target); } });
gmmRoomDef("widowhome", { n: "An old widow's rooms", icon: "🧶", w: 9, d: 8, h: 2.7, wall: ["plaster", 0xE4D8C0], floor: ["wood", 0x6A4A2E], timber: 1,
say: "Two small rooms kept spotless: a spinning wheel, a bed with a high feather quilt, a cat on the stove bench, and a little window full of geraniums.",
f: function (R, g) { return __ZC(367, 129, this, arguments, new.target); } });
gmmRoomDef("woodcutter", { n: "The woodcutter's cottage", icon: "🪓", w: 8, d: 7, h: 2.6, wall: ["wood", 0x6A4A2E], floor: ["earth", 0x6A5A44], win: 1,
say: "One room, bare and poor: a table, a bench, straw for the children's bed, an empty bread bin. Famine is in the land.",
f: function (R, g) { return __ZC(367, 130, this, arguments, new.target); } });
gmmRoomDef("ginger", { n: "The witch's kitchen", icon: "🍬", w: 12, d: 10, h: 3.2, wall: ["plaster", 0xD8B48A], floor: ["floortile", 0xB08A96], ceil: 0xE8D0D8, win: 2, winCol: 0xFFF0F8,
say: "Sweet and warm. Pancakes, milk, apples and nuts on the table; two little white beds. In the stable behind the bars: Hansel. At the end, the great oven.",
f: function (R, g) { return __ZC(367, 131, this, arguments, new.target); } });
gmmRoomDef("redmother", { n: "Little Red Cap's home", icon: "🧺", w: 8, d: 7, h: 2.7, wall: ["plaster", 0xF0E4CC], floor: ["wood", 0x8A6A48], timber: 1,
say: "A snug cottage. On the table a basket with a piece of cake and a bottle of wine for Grandmother.",
f: function (R, g) { return __ZC(367, 132, this, arguments, new.target); } });
gmmRoomDef("granny", { n: "Grandmother's house", icon: "👵", w: 8, d: 7, h: 2.7, wall: ["plaster", 0xEADCC4], floor: ["wood", 0x7A5A3A], timber: 1,
say: "Grandmother's room: the bed in the corner with its curtains, the tiled stove, a cuckoo clock, nuts drying on the sill.",
f: function (R, g) { return __ZC(367, 133, this, arguments, new.target); } });
gmmRoomDef("rapparents", { n: "The house beside the garden", icon: "🥬", w: 9, d: 8, h: 3, wall: ["plaster", 0xE4D8C0], floor: ["wood", 0x7A5A3A], timber: 1, winSide: 1, winCol: 0x9ACB7A, win: 2,
say: "From the little back window you can see into the enchantress's garden: flowers, herbs, and beds of fresh green rampion.",
f: function (R, g) { return __ZC(367, 134, this, arguments, new.target); } });
gmmRoomDef("towerroom", { n: "Rapunzel's room at the top of the tower", icon: "🗼", w: 7, d: 7, h: 3.4, wall: ["stone", 0xB8B0A0], floor: ["wood", 0x8A6A48], win: 0,
say: "A round room high above the wood. One window. Rapunzel, her hair coiled round and round the floor like golden rope.",
f: function (R, g) { return __ZC(367, 135, this, arguments, new.target); } });
gmmRoomDef("widow", { n: "The widow's house", icon: "🧵", w: 9, d: 7, h: 2.8, wall: ["plaster", 0xE8DCC8], floor: ["wood", 0x8A6A48], timber: 1,
say: "Two rooms in one: the lazy daughter's soft corner by the stove, and the hard bench where the good one spins.",
f: function (R, g) { return __ZC(367, 136, this, arguments, new.target); } });
gmmRoomDef("meadow", { n: "The meadow at the bottom of the well", icon: "🌼", w: 220, d: 180, h: 30, outdoor: 1, env: "meadow", floor: ["grass", 0x6ACB3A], noMerge: 0, light: 0.4,
say: "You fell, and woke in a beautiful meadow, the sun shining and thousands of flowers. Ahead: an oven full of bread, an apple tree, and Mother Holle's house.",
f: function (R, g) { return __ZC(367, 137, this, arguments, new.target); },
onEnter: function (R) { camera.position.set(GMM.base + R.x, 1.72, 66); yaw = 0; } });
gmmRoomDef("hollehouse", { n: "Mother Holle's house", icon: "❄️", w: 10, d: 8, h: 3, wall: ["plaster", 0xFFF4E0], floor: ["wood", 0xC8A070], timber: 1, winCol: 0xE8F4FF,
say: "An old woman looks out with great big teeth, and the girl is frightened. \"Don't be afraid, child,\" says Mother Holle. \"Stay with me, and shake my bed well, so the feathers fly: then it snows in the world.\"",
f: function (R, g) { return __ZC(367, 138, this, arguments, new.target); } });
gmmRoomDef("queenhall", { n: "The Queen's great hall", icon: "👑", w: 20, d: 16, h: 7, wall: ["stone", 0xB8B0A4], floor: ["floortile", 0x6A6460], vault: 1, winCol: 0xB8C8E0,
say: "A cold, high hall: a dark throne, black banners, a long table set for no one. A stair climbs to the Queen's own chamber.",
f: function (R, g) { return __ZC(367, 139, this, arguments, new.target); } });
gmmRoomDef("mirror", { n: "The Queen's chamber", icon: "🪞", w: 10, d: 9, h: 4, wall: ["stone", 0x8A8090], floor: ["floortile", 0x3A3440], win: 1, winCol: 0x8A9AB8,
say: "Her secret room. On the wall, the mirror. On a table: a comb, a lace, and an apple, one side white, one side red.",
f: function (R, g) { return __ZC(367, 140, this, arguments, new.target); } });
gmmRoomDef("dwarfs", { n: "The dwarfs' cottage", icon: "🍽️", w: 10, d: 8, h: 2.4, wall: ["plaster", 0xF0E4CC], floor: ["wood", 0x9A7A54], timber: 1,
say: "Everything small and neat as can be: a little table with a white cloth, seven little plates, seven little spoons, knives, forks and cups, and seven little beds against the wall.",
f: function (R, g) { return __ZC(367, 141, this, arguments, new.target); } });
gmmRoomDef("mine", { n: "The dwarfs' mine", icon: "⛏️", w: 8, d: 40, h: 3.6, wall: ["stone", 0x6A6458], floor: ["earth", 0x5A4A3A], ceilKind: "stone", ceil: 0x5A544A, beams: false, win: 0, light: 0.6, lightCol: 0xFFC080,
say: "A tunnel into the mountain, propped with timbers. Lanterns, a cart on rails, and in the rock, veins of ore that glitter.",
f: function (R, g) { return __ZC(367, 142, this, arguments, new.target); } });
gmmRoomDef("gooseinn", { n: "The inn", icon: "🪿", w: 12, d: 9, h: 3, wall: ["plaster", 0xE8DAC0], floor: ["wood", 0x6A4A2E], timber: 1,
say: "A country inn. The landlord's three daughters can't take their eyes off the goose with the golden feathers.",
f: function (R, g) { return __ZC(367, 143, this, arguments, new.target); } });
gmmRoomDef("briarhall", { n: "The great hall, asleep", icon: "🌹", w: 22, d: 16, h: 7, wall: ["stone", 0xC8BCA8], floor: ["floortile", 0x8A7A6A], vault: 1, winCol: 0xD8C8C0,
say: "Everything asleep: the king and queen on their thrones, the court on its benches, the flies on the walls. Dust on everything. Doors lead to the kitchen and the old tower.",
f: function (R, g) { return __ZC(367, 144, this, arguments, new.target); },
onEnter: function (R) { gmmBriarCourt(R); } });
gmmRoomDef("briarkitchen", { n: "The castle kitchen, asleep", icon: "🍳", w: 14, d: 10, h: 4, wall: ["stone", 0xB8B0A0], floor: ["stone", 0x8A847A], beams: true,
say: "The cook asleep with her hand raised to box the kitchen boy's ears; the maid asleep over a black hen she was plucking; the fire asleep in the hearth, its flames standing still.",
f: function (R, g) { return __ZC(367, 145, this, arguments, new.target); } });
gmmRoomDef("briartower", { n: "The little room at the top of the old tower", icon: "🧶", w: 6, d: 6, h: 3, wall: ["stone", 0xA89A88], floor: ["wood", 0x7A5A3A], win: 1,
say: "Up a narrow winding stair, a little door with a rusty key in the lock. Inside, an old woman sits with a spindle, busily spinning flax.",
f: function (R, g) { return __ZC(367, 146, this, arguments, new.target); } });
gmmRoomDef("cinderhome", { n: "The kitchen, by the hearth", icon: "🫘", w: 10, d: 8, h: 3, wall: ["plaster", 0xE0D4BC], floor: ["stone", 0x8A847A], timber: 1,
say: "The kitchen where Aschenputtel works from morning to night and sleeps in the ashes. On the hearth: a bowl of lentils tipped into the cinders.",
f: function (R, g) { return __ZC(367, 147, this, arguments, new.target); } });
gmmRoomDef("cinderparlour", { n: "The stepsisters' parlour", icon: "👗", w: 10, d: 8, h: 3.2, wall: ["plaster", 0xF0E0E8], floor: ["wood", 0x8A5A3A], timber: 1,
say: "Silk dresses on every chair, combs, ribbons, a looking-glass. The two stepsisters dress for the king's ball.",
f: function (R, g) { return __ZC(367, 148, this, arguments, new.target); } });
gmmRoomDef("dovecote", { n: "Inside the dovecote", icon: "🕊️", w: 4.2, d: 4.2, h: 6, wall: ["plaster", 0xF0E8DC], floor: ["wood", 0x8A6A48], win: 0,
say: "Round walls lined with nesting holes, white doves cooing on every ledge. A good place to hide from a king's son.",
f: function (R, g) {
for (var r = 0; r < 5; r++)
for (var c = 0; c < 6; c++) {
gmmB(0.36, 0.3, 0.1, null, 0x2A2018, -1.6 + c * 0.64, 1.2 + r * 0.9, -2.0, g);
gmmB(0.5, 0.04, 0.25, "wood", 0x8A6A48, -1.6 + c * 0.64, 1.02 + r * 0.9, -1.95, g);
}
for (var d = 0; d < 10; d++)
gmmDove(R.D, R.x - 1.6 + (d % 5) * 0.8, 1.06 + ((d / 5) | 0) * 1.8, -1.85);
} });
gmmRoomDef("palacehall", { n: "The king's palace", icon: "🏰", w: 22, d: 16, h: 8, wall: ["plaster", 0xF4ECDC], floor: ["marble", 0xE8E0D0], vault: 1, winCol: 0xF0E8D0, light: 1.1,
say: "Marble and gold, a double stair, footmen in livery. Music from the ballroom beyond.",
f: function (R, g) { return __ZC(367, 149, this, arguments, new.target); } });
gmmRoomDef("ballroom", { n: "The ballroom", icon: "💃", w: 30, d: 22, h: 9, wall: ["plaster", 0xE0CCA8], floor: ["marble", 0xA8987E], vault: 1, winCol: 0xFFE8C0, light: 1.0, lightCol: 0xFFE8C8,
say: "Three nights of feasting. Couples turn under the chandeliers; the king's son dances with no one but the beautiful stranger in gold.",
f: function (R, g) { return __ZC(367, 150, this, arguments, new.target); } });
gmmRoomDef("froghall", { n: "The king's hall", icon: "🐸", w: 20, d: 14, h: 7, wall: ["stone", 0xD8CCB4], floor: ["floortile", 0x8A7A6A], vault: 1, winCol: 0xD8E8C8,
say: "Dinner is laid: the king at the head of the table, the youngest princess at his side, a little golden plate before her. Something is knocking at the door: plitsch, platsch.",
f: function (R, g) { return __ZC(367, 151, this, arguments, new.target); } });
gmmRoomDef("frogbed", { n: "The princess's chamber", icon: "👸", w: 9, d: 8, h: 3.6, wall: ["plaster", 0xF4E8D8], floor: ["wood", 0xA87A5A], timber: 1, winCol: 0xFFE8C8,
say: "Her little bed with its silken covers. The frog hops after her: \"I'm tired, I want to sleep as well as you. Lift me up, or I'll tell your father.\"",
f: function (R, g) { return __ZC(367, 152, this, arguments, new.target); } });
gmmRoomDef("dancehall", { n: "The king's hall", icon: "🤴", w: 20, d: 14, h: 7, wall: ["plaster", 0xF4E4E0], floor: ["marble", 0xE8DCD8], vault: 1, winCol: 0xF0E0D8,
say: "The king of the twelve princesses, worried: every morning his daughters' shoes are danced to pieces, and no one knows how.",
f: function (R, g) { return __ZC(367, 153, this, arguments, new.target); } });
gmmRoomDef("princessbed", { n: "The twelve princesses' bedchamber", icon: "👠", w: 26, d: 10, h: 4, wall: ["plaster", 0xF8E8F0], floor: ["wood", 0xC89A7A], timber: 1, winCol: 0xD8D0F0,
say: "Twelve beds in a row. The eldest princess knocks on her bed, and it sinks into the floor: under it, a trapdoor and a stair going down.",
f: function (R, g) { return __ZC(367, 154, this, arguments, new.target); } });
gmmRoomDef("under", { n: "Under the ground: the groves and the lake", icon: "💎", w: 200, d: 180, h: 40, outdoor: 1, env: "under", floor: ["stone", 0x2A2A38], light: 0.5, lightCol: 0xC8C0FF,
say: "A stair down into a wide dark land. An avenue of trees whose leaves are all of silver, then gold, then glittering diamonds. Beyond: a great lake, twelve boats, and a castle full of light.",
f: function (R, g) { return __ZC(367, 155, this, arguments, new.target); },
onEnter: function (R) { camera.position.set(GMM.base + R.x, 1.72, 70); yaw = 0; } });
gmmRoomDef("lakecastle", { n: "The castle beyond the lake", icon: "🎻", w: 26, d: 20, h: 9, wall: ["plaster", 0xB8B0D0], floor: ["marble", 0x8A84A2], vault: 1, winCol: 0x3A3A7A, light: 1.0, lightCol: 0xFFE8C8,
say: "Trumpets and drums. Each prince dances with his princess until three in the morning, when their shoes are danced to holes.",
f: function (R, g) { return __ZC(367, 156, this, arguments, new.target); } });
gmmRoomDef("mill", { n: "The mill", icon: "🌾", w: 12, d: 10, h: 4.4, wall: ["plaster", 0xE4D8C0], floor: ["wood", 0x8A6A48], timber: 1,
say: "The great millstones grind, the whole house shakes gently; flour hangs in the air, sacks everywhere.",
f: function (R, g) { return __ZC(367, 157, this, arguments, new.target); } });
gmmRoomDef("straw1", { n: "The first chamber, full of straw", icon: "🧵", w: 10, d: 8, h: 3.6, wall: ["stone", 0xB8AC98], floor: ["stone", 0x8A847A], win: 1,
say: "The king leads her to a room full of straw, gives her a wheel and a reel: \"Spin this into gold by morning.\" She sits and cries, and the door opens, and in walks a little man.",
f: function (R, g) { gmmStrawRoom(R, g, 1); R.link(4, -3.6, "straw2", "The door to the bigger chamber", "go through"); } });
gmmRoomDef("straw2", { n: "The second chamber, bigger, fuller", icon: "🧵", w: 14, d: 10, h: 4, wall: ["stone", 0xB8AC98], floor: ["stone", 0x8A847A], win: 1,
say: "The king is glad of the gold, but greedier still. A bigger room, more straw.",
f: function (R, g) { gmmStrawRoom(R, g, 2); R.link(6, -4.6, "straw3", "The door to the greatest chamber", "go through"); } });
gmmRoomDef("straw3", { n: "The third chamber, and the queen's cradle", icon: "👑", w: 18, d: 12, h: 4.4, wall: ["stone", 0xB8AC98], floor: ["stone", 0x8A847A], win: 2,
say: "The greatest room of straw. Spin this, and you shall be queen. (And a year later, a cradle stands here, and the little man comes for what was promised.)",
f: function (R, g) {
gmmStrawRoom(R, g, 3);
gmmCradle(g, 6.6, -4, 0);
R.solid(6.6, -4, 1, 0.6, 0.8);
R.spot(6.6, -3, 2, "The cradle (the queen's child)", "guess the little man's name", function () { gmmNameGuess(); });
} });
function gmmStrawRoom(R, g, n) { return __ZC(367, 158, this, arguments, new.target); }
gmmRoomDef("rhut", { n: "The little man's house", icon: "🔥", w: 5, d: 4, h: 2.2, wall: ["wood", 0x5A3E26], floor: ["earth", 0x6A5A44], win: 1,
say: "Everything small: a stool, a bread oven, a spinning wheel worn smooth with use. Tomorrow he brews, today he bakes.",
f: function (R, g) { return __ZC(367, 159, this, arguments, new.target); } });
gmmRoomDef("robbers", { n: "The robbers' house", icon: "🍗", w: 12, d: 9, h: 3, wall: ["wood", 0x4A3420], floor: ["wood", 0x5A4028], win: 1, winCol: 0x2A2A3A, light: 0.8,
say: "A table loaded with good things to eat and drink, candles burning, the robbers' loot heaped in the corners. A fire smouldering in the hearth.",
f: function (R, g) { return __ZC(367, 160, this, arguments, new.target); } });
gmmRoomDef("goats", { n: "The seven little goats' cottage", icon: "🐐", w: 11, d: 9, h: 3, wall: ["plaster", 0xFFF0A0], floor: ["wood", 0xE8A86A], ceil: 0xFFF8D0, winCol: 0xD8F0FF, light: 1.2,
say: "Seven little goats hid when the wolf came in: under the table, in the bed, in the stove, in the kitchen, in the cupboard, under the washbowl, and the youngest in the clock case. Find them all!",
f: function (R, g) { return __ZC(367, 161, this, arguments, new.target); },
onEnter: function (R) { R.found = {}; R.kids.forEach(function (k) { k.visible = false; }); } });
gmmRoomDef("fishhome", { n: "The fisherman's house", icon: "🐟", w: 12, d: 10, h: 3.4, wall: ["wood", 0x6A5A44], floor: ["wood", 0x7A6A54],
say: "",
f: function (R, g) { R.stage = -1; R.sg = new THREE.Group(); R.D.add(R.sg); },
onEnter: function (R) { gmmFishHome(R); } });
var GMM_CLOTH = [0xC83A2A, 0x2A6AC8, 0x3A8A3A, 0xD8A020, 0x8A3AA8, 0x2A8A8A, 0xA85A2A];
gmmRoomDef("snowrose", { n: "The widow's cottage", icon: "🌹", w: 10, d: 8, h: 2.8, wall: ["plaster", 0xF2E8D4], floor: ["wood", 0xB89068], timber: 1, winCol: 0xE8F0F8,
say: "So neat and clean that it was a pleasure to look in. In summer Rose-Red kept the house and put a nosegay by the mother's bed every morning, with a rose from each tree; in winter Snow-White lit the fire and hung the kettle on the hook, and the kettle was of copper and shone like gold.",
f: function (R, g) { return __ZC(367, 162, this, arguments, new.target); } });
gmmRoomDef("gghall", { n: "The old king's hall", icon: "👑", w: 18, d: 12, h: 5, wall: ["plaster", 0xE8DCC4], floor: ["floortile", 0x8A7A6A], timber: 1, winCol: 0xE8EEF0,
say: "A long hall, a high table, the young king's bride at his side in the true princess's royal clothes. Through a door at the back: the kitchen, and the great iron stove.",
f: function (R, g) { return __ZC(367, 163, this, arguments, new.target); } });
gmmRoomDef("ggstove", { n: "The kitchen, and the iron stove", icon: "🔥", w: 10, d: 8, h: 3.4, wall: ["stone", 0x9A9284], floor: ["stone", 0x7A746A],
say: "A kitchen, empty now. A great black iron stove, its pipe going up through the ceiling to the room above.",
f: function (R, g) { return __ZC(367, 164, this, arguments, new.target); } });
GMM_ROOMS.ggstove.back = "gghall";
gmmRoomDef("swanhut", { n: "The robbers' hut", icon: "🦢", w: 8, d: 6, h: 2.4, wall: ["wood", 0x5A3E26], floor: ["wood", 0x6A5038], win: 1, winCol: 0xF0A060,
say: "A little room, and six little beds in it. She dares not lie down in any of them, but creeps under one, to sleep the night on the hard ground.",
f: function (R, g) { return __ZC(367, 165, this, arguments, new.target); } });
gmmRoomDef("swanking", { n: "The king's castle", icon: "👶", w: 16, d: 12, h: 5, wall: ["stone", 0xB8B0A0], floor: ["floortile", 0x8A7A6A], vault: 1, winCol: 0xD8E0E8,
say: "The great hall of a moated castle. By the fire, a cradle. The king's mother watches the dumb queen with hard eyes.",
f: function (R, g) { return __ZC(367, 166, this, arguments, new.target); } });
gmmRoomDef("ravenhome", { n: "The house with seven empty beds", icon: "🐦‍⬛", w: 10, d: 8, h: 2.8, wall: ["plaster", 0xE8DCC4], floor: ["wood", 0x8A6A48], timber: 1,
say: "Seven little beds, made up and never slept in. The parents never speak of the boys before their daughter.",
f: function (R, g) { return __ZC(367, 167, this, arguments, new.target); } });
gmmRoomDef("worldend", { n: "The end of the world: the sun, the moon and the stars", icon: "⭐", w: 160, d: 120, h: 40, outdoor: 1, env: "under", floor: ["stone", 0x1A1A26], light: 0.5, lightCol: 0xC8C8FF,
say: "Far, far, to the very end of the world. To one side the sun, too hot and terrible; to the other the moon, cold and awful; and ahead, the stars, kind and good, each on its own little chair.",
f: function (R, g) { return __ZC(367, 168, this, arguments, new.target); } });
gmmRoomDef("glassmtn", { n: "Inside the Glass Mountain", icon: "🏔️", w: 12, d: 10, h: 5, wall: ["marble", 0xC8E0EC], floor: ["marble", 0xB8D0DC], vault: 1, winCol: 0xE8F8FF, win: 0, light: 1.1, lightCol: 0xE8F4FF,
say: "Everything of glass, cold and clear. A little dwarf comes to meet you. \"My child, what are you looking for?\" A table laid for seven, seven little plates and seven little glasses.",
f: function (R, g) { return __ZC(367, 169, this, arguments, new.target); } });
gmmRoomDef("ijhall", { n: "The king's castle", icon: "🏰", w: 16, d: 12, h: 4.6, wall: ["plaster", 0xE8DCC0], floor: ["wood", 0x7A5232], timber: 1,
say: "Antlers on the walls, a long table, the boards hung with hunting horns. Stairs go up to the queen's chamber.",
f: function (R, g) { return __ZC(367, 170, this, arguments, new.target); } });
gmmRoomDef("ijqueen", { n: "The queen's chamber", icon: "🗝️", w: 9, d: 8, h: 3.4, wall: ["plaster", 0xF0E4E0], floor: ["wood", 0xA87A5A], timber: 1,
say: "A canopied bed, the queen out hunting with the king. Under the pillow: the key of the iron cage.",
f: function (R, g) { return __ZC(367, 171, this, arguments, new.target); } });
GMM_ROOMS.ijqueen.back = "ijhall";
gmmRoomDef("thrushfather", { n: "Her father's hall", icon: "🤴", w: 20, d: 12, h: 5, wall: ["plaster", 0xF0E4CC], floor: ["floortile", 0x9A8A7A], vault: 1, winCol: 0xF0E8D8, light: 1.1,
say: "The suitors stand in a row by rank: kings, then princes, dukes, earls, counts and barons. The proud princess walks along the row to mock them.",
f: function (R, g) { return __ZC(367, 172, this, arguments, new.target); } });
gmmRoomDef("thrushhut", { n: "The little hut", icon: "🧺", w: 5, d: 4, h: 2.2, wall: ["wood", 0x5A3E26], floor: ["earth", 0x6A5A44], win: 1,
say: "\"Oh goodness! What a small house; to whom does this miserable, mean hovel belong?\" \"That is my house and yours.\" She has to stoop to get in at the low door.",
f: function (R, g) { return __ZC(367, 173, this, arguments, new.target); } });
gmmRoomDef("thrushhall", { n: "King Thrushbeard's palace: the great hall", icon: "💃", w: 24, d: 16, h: 8, wall: ["plaster", 0xF4ECDC], floor: ["marble", 0xE8E0D0], vault: 1, winCol: 0xFFF0D0, light: 1.1, lightCol: 0xFFE8C8,
say: "The wedding of the king's eldest son. Lights everywhere, the guests in splendid clothes. Down the stairs at the back: the kitchen.",
f: function (R, g) { return __ZC(367, 174, this, arguments, new.target); } });
gmmRoomDef("thrushkitchen", { n: "The palace kitchen", icon: "🍲", w: 14, d: 10, h: 3.6, wall: ["stone", 0xB8B0A0], floor: ["stone", 0x8A847A], beams: true,
say: "She is to be a kitchen-maid here, help the cook, and do all the dirtiest work. She fastens a little jar in each pocket, to take home the scraps they give her.",
f: function (R, g) { return __ZC(367, 175, this, arguments, new.target); } });
GMM_ROOMS.thrushkitchen.back = "thrushhall";
gmmRoomDef("bshouse", { n: "The little house in the wood", icon: "🦌", w: 6, d: 5, h: 2.3, wall: ["wood", 0x5A3E26], floor: ["earth", 0x6A5A44], win: 1, winCol: 0xA8D088,
say: "An empty little house, as if made for them. She has made the fawn a bed of soft moss and leaves; every morning she gathers roots, berries and nuts, and brings tender grass for him.",
f: function (R, g) { return __ZC(367, 176, this, arguments, new.target); } });
gmmRoomDef("bscastle", { n: "The king's castle", icon: "👑", w: 18, d: 12, h: 5, wall: ["plaster", 0xF0E4CC], floor: ["floortile", 0x9A8A7A], vault: 1, winCol: 0xF0E8D8,
say: "The king's castle, where the girl from the wood is queen now, and the fawn is tended and cared for and runs about the garden. A door leads to the queen's chamber and the nursery.",
f: function (R, g) { return __ZC(367, 177, this, arguments, new.target); } });
gmmRoomDef("bsnursery", { n: "The nursery, at midnight", icon: "🌙", w: 9, d: 8, h: 3.4, wall: ["plaster", 0xE8E0F0], floor: ["wood", 0x8A6A58], timber: 1, winCol: 0x2A3050, light: 0.6, lightCol: 0xC8D0FF,
say: "The nurse sits by the cradle, the only one awake. The fawn sleeps in the corner. Midnight is striking.",
f: function (R, g) { return __ZC(367, 178, this, arguments, new.target); } });
GMM_ROOMS.bsnursery.back = "bscastle";
gmmRoomDef("waterking", { n: "The sick king's chamber", icon: "🛏️", w: 10, d: 8, h: 3.6, wall: ["stone", 0xB8B0A0], floor: ["wood", 0x7A5A3A], win: 1,
say: "The old king lies sick, and no one believes he can live. His three sons stand weeping in the garden below, and an old man asks them why.",
f: function (R, g) { return __ZC(367, 179, this, arguments, new.target); } });
gmmRoomDef("waterhall", { n: "The enchanted castle", icon: "🗡️", w: 22, d: 18, h: 7, wall: ["stone", 0xA8A0A8], floor: ["marble", 0x8A8494], vault: 1, winCol: 0x9A9AC8, light: 0.9, lightCol: 0xE8E0FF,
say: "Enchanted princes sit asleep in a great hall; rings on their fingers. A sword and a loaf of bread lie on the table. Further in, a lovely princess. Behind her, the garden and the fountain. The clock is ticking towards twelve.",
f: function (R, g) { return __ZC(367, 180, this, arguments, new.target); } });
gmmRoomDef("hansmaster", { n: "His master's house", icon: "💰", w: 10, d: 8, h: 2.9, wall: ["plaster", 0xEADCC0], floor: ["wood", 0x8A6A48], timber: 1,
say: "Seven years Hans has served here. \"Master, my time is up; now I should be glad to go back home to my mother; give me my wages.\"",
f: function (R, g) { return __ZC(367, 181, this, arguments, new.target); } });
gmmRoomDef("hansmother", { n: "His mother's house", icon: "🏡", w: 8, d: 7, h: 2.6, wall: ["plaster", 0xF0E4CC], floor: ["wood", 0x9A7A54], timber: 1,
say: "Home at last, light of heart and free of every burden.",
f: function (R, g) { return __ZC(367, 182, this, arguments, new.target); } });
gmmRoomDef("junhouse", { n: "The rich man's house", icon: "🍎", w: 12, d: 9, h: 3, wall: ["plaster", 0xE8DCC4], floor: ["wood", 0x6A4A2E], timber: 1, winCol: 0xD8E0E8,
say: "The kitchen of a rich man's house: a fire with a pan of hot water on it, the table laid for dinner. Upstairs, a chest of red apples with a great heavy lid and a sharp iron lock.",
f: function (R, g) { return __ZC(367, 183, this, arguments, new.target); } });
gmmRoomDef("jungold", { n: "The goldsmith's workshop", icon: "⛓️", w: 9, d: 8, h: 3, wall: ["plaster", 0xE4D8C0], floor: ["wood", 0x7A5A3A], timber: 1,
say: "A bench under the window, a little furnace, pincers and hammers; a gold chain half made.",
f: function (R, g) { return __ZC(367, 184, this, arguments, new.target); } });
gmmRoomDef("junshoe", { n: "The shoemaker's shop", icon: "👞", w: 9, d: 8, h: 3, wall: ["plaster", 0xE8DCC8], floor: ["wood", 0x7A5A3A], timber: 1,
say: "Lasts, leather, a bench; and on the top shelf in the garret, a pair of red shoes.",
f: function (R, g) { gmmTable(g, 0, -2.6, 2.6, 0.9, 0x6A4A2E, {}); R.solid(0, -2.6, 2.8, 1.1, 0.8); gmmShelves(g, -3.8, -1, Math.PI / 2, 2.6, 2.2, {}); for (var s = 0; s < 6; s++)
gmmB(0.12, 0.08, 0.28, null, [0x3A2A1A, 0x6A3A1A, 0xC81A1A][s % 3], -0.8 + s * 0.3, 0.82, -2.6, g); } });
gmmRoomDef("junmill", { n: "The mill", icon: "🪨", w: 12, d: 10, h: 4.4, wall: ["plaster", 0xE4D8C0], floor: ["wood", 0x8A6A48], timber: 1,
say: "Klipp klapp, klipp klapp: the great wheel turns, flour in the air, the millstones grinding.",
f: function (R, g) { return __ZC(367, 185, this, arguments, new.target); } });
function gmmData() { var d = store.gmm; if (!d || typeof d !== "object")
d = store.gmm = {}; if (!Array.isArray(d.keeps))
d.keeps = []; d.done = d.done || {}; return d; }
function gmmSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function gmmKeep(kind) { var K = GMM_KEEP[kind]; if (!K)
return; var d = gmmData(); d.keeps.push({ i: K[2], n: K[1], at: Date.now() }); if (d.keeps.length > 200)
d.keeps.splice(0, d.keeps.length - 200); gmmSave(); }
function gmmReward(kind, say) { return __ZC(367, 186, this, arguments, new.target); }
function gmmCard(title, sub, html, btns) { return __ZC(367, 187, this, arguments, new.target); }
function gmmDoorOf(k) { var R = GMM_ROOMS[k]; return R && R.door; }
function gmmPut(x, z, ryFace) { camera.position.set(GMM.base + x, gmmGround(x, z, 1e4) + 1.72, z); if (ryFace !== undefined)
yaw = ryFace; pitch = 0; }
function gmmShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = (Math.random() * (i + 1)) | 0, t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function gmmRunStop(msg) { var R = GMM.run; GMM.run = null; if (R && R.g && R.g.parent)
R.g.parent.remove(R.g); if (msg)
setStatus(msg); }
function gmmLift(pts, dur, obj, done, face) {
GMM.lift = { pts: pts, dur: dur, t: 0, obj: obj, done: done, face: face };
}
function gmmLiftTick(dt) { return __ZC(367, 188, this, arguments, new.target); }
function gmmFollow(m, gap) { if (m.parent !== GMM.G)
GMM.G.add(m); m.visible = true; GMM.follow.push({ g: m, gap: gap || 1.6 }); }
function gmmFollowTick(dt, L) { return __ZC(367, 189, this, arguments, new.target); }
function gmmFollowClear() { GMM.follow.forEach(function (F) { if (F.temp && F.g.parent)
F.g.parent.remove(F.g); }); GMM.follow = []; }
function gmmPlayTick(dt, L) { return __ZC(367, 190, this, arguments, new.target); }
function gmmSnowNear() {
if (!GMM.snowNear && GMM.G) {
GMM.snowNear = wPoints(GMM.lite ? 300 : 900, function (i) { var r = wRand(4400 + i); return [(r() - 0.5) * 90, r() * 30, (r() - 0.5) * 90]; }, 0xFFFFFF, 0.3, true);
GMM.snowNear.userData.keep = 1;
GMM.G.add(GMM.snowNear);
}
return GMM.snowNear;
}
function gmmPebblesStart() { return __ZC(367, 191, this, arguments, new.target); }
function gmmWitch(R) { return __ZC(367, 192, this, arguments, new.target); }
function gmmDuckRide(ds, dl) { return __ZC(367, 193, this, arguments, new.target); }
function gmmRedStart() { return __ZC(367, 194, this, arguments, new.target); }
function gmmRampionStart() { return __ZC(367, 195, this, arguments, new.target); }
function gmmRapunzelCall() { return __ZC(367, 196, this, arguments, new.target); }
function gmmTowerDown() { return __ZC(367, 197, this, arguments, new.target); }
function gmmHolleDown() { var A = GMM_AT.holle; GMM.holle = {}; gmmEnterRoom("meadow", { x: A.x + 10, z: A.z + 7.5, ry: 0.3, room: "meadow", name: "The well" }); }
function gmmHolleBread(R) { return __ZC(367, 198, this, arguments, new.target); }
function gmmHolleApples(R) { return __ZC(367, 199, this, arguments, new.target); }
function gmmHolleBed(R) { return __ZC(367, 200, this, arguments, new.target); }
function gmmHolleGate(R) { return __ZC(367, 201, this, arguments, new.target); }
function gmmCoffin() { return __ZC(367, 202, this, arguments, new.target); }
function gmmMirrorAsk(R) { return __ZC(367, 203, this, arguments, new.target); }
function gmmDwarfTable(R, what, i) { return __ZC(367, 204, this, arguments, new.target); }
function gmmGooseStart() { return __ZC(367, 205, this, arguments, new.target); }
function gmmGoosePeople(seeds, looks, names) { seeds.forEach(function (s, i) { var L = worldLocal(), P = gmmPerson(s, L.x, L.z + 2 + i, 0, { look: looks[i], sex: looks[i].sex }, GMM.G, gmmGround(L.x, L.z + 2)); GMM.people.pop(); gmmFollow(P.g, 1.2); GMM.follow[GMM.follow.length - 1].temp = 1; }); }
function gmmGooseInn(R) { return __ZC(367, 206, this, arguments, new.target); }
function gmmGooseTown() { return __ZC(367, 207, this, arguments, new.target); }
function gmmGooseFinish() { return __ZC(367, 208, this, arguments, new.target); }
function gmmBriarHedge() { return __ZC(367, 209, this, arguments, new.target); }
function gmmBriarCourt(R) { return __ZC(367, 210, this, arguments, new.target); }
function gmmBriarWake(R) { return __ZC(367, 211, this, arguments, new.target); }
function gmmLentils(R) { return __ZC(367, 212, this, arguments, new.target); }
function gmmHazel() { return __ZC(367, 213, this, arguments, new.target); }
function gmmBallDance(R) { return __ZC(367, 214, this, arguments, new.target); }
function gmmCinderHide(kind) { return __ZC(367, 215, this, arguments, new.target); }
function gmmFrogBall() { return __ZC(367, 216, this, arguments, new.target); }
function gmmFrogDinner(R) { return __ZC(367, 217, this, arguments, new.target); }
function gmmFrogWall(R) { return __ZC(367, 218, this, arguments, new.target); }
function gmmDanceCloak() { return __ZC(367, 219, this, arguments, new.target); }
function gmmTrapdoor(R) { return __ZC(367, 220, this, arguments, new.target); }
function gmmTwig(R, k) { return __ZC(367, 221, this, arguments, new.target); }
function gmmBoatRide(R) { return __ZC(367, 222, this, arguments, new.target); }
function gmmDanceReturn() { return __ZC(367, 223, this, arguments, new.target); }
function gmmSpin(R, n) { return __ZC(367, 224, this, arguments, new.target); }
function gmmRumpelListen() { return __ZC(367, 225, this, arguments, new.target); }
function gmmNameGuess() { return __ZC(367, 226, this, arguments, new.target); }
function gmmBremenMeet(i) { return __ZC(367, 227, this, arguments, new.target); }
function gmmBremenWindow() { return __ZC(367, 228, this, arguments, new.target); }
function gmmRobbersFeast() { return __ZC(367, 229, this, arguments, new.target); }
function gmmKidFind(R, i, where) { return __ZC(367, 230, this, arguments, new.target); }
function gmmFlounderCall() { return __ZC(367, 231, this, arguments, new.target); }
function gmmFishStage() { var F = GMM.fish; (GMM.fishStages || []).forEach(function (s, i) { s.visible = i === (F.st === 6 ? 0 : Math.min(F.st, 5)); }); }
function gmmFishHome(R) { return __ZC(367, 232, this, arguments, new.target); }
function gmmFishSay(S) { return __ZC(367, 233, this, arguments, new.target); }
function gmmGiantsStart() { return __ZC(367, 234, this, arguments, new.target); }
function gmmTailorSwat() { return __ZC(367, 235, this, arguments, new.target); }
function gmmPorridge(R) { return __ZC(367, 236, this, arguments, new.target); }
function gmmElves(R) { return __ZC(367, 237, this, arguments, new.target); }
function gmmQ(k) { return GMM.flags[k] || (GMM.flags[k] = { n: 0 }); }
function gmmDo(k, need, hint) { var F = gmmQ(k); if (F.n !== need) {
setStatus(hint(F.n));
return null;
} return F; }
function gmmAtFace(x, z, tx, tz) { gmmPut(x, z, Math.atan2(-(tx - x), -(tz - z))); GMM.zone = gmmZoneAt(x, z); if (GMM.trees)
gmmForestFill(x, z, true); }
function gmmSRWhere(n) { return __ZC(367, 238, this, arguments, new.target); }
function gmmSRKnock() { return __ZC(367, 239, this, arguments, new.target); }
function gmmSRShowDwarf(x, z) { var D = GMM.srDwarf; if (!D)
return; D.g.visible = true; D.g.position.set(x, gmmGround(x, z), z); }
function gmmSRTree() { return __ZC(367, 240, this, arguments, new.target); }
function gmmSRBrook() { return __ZC(367, 241, this, arguments, new.target); }
function gmmSRHeath() { return __ZC(367, 242, this, arguments, new.target); }
function gmmGGWhere(n) { return __ZC(367, 243, this, arguments, new.target); }
function gmmGGBrook() { return __ZC(367, 244, this, arguments, new.target); }
function gmmGGFalada() { return __ZC(367, 245, this, arguments, new.target); }
function gmmGGMeadow() { return __ZC(367, 246, this, arguments, new.target); }
function gmmGGStove() { return __ZC(367, 247, this, arguments, new.target); }
function gmmSwanWhere(n) { return __ZC(367, 248, this, arguments, new.target); }
function gmmSwanClew() { return __ZC(367, 249, this, arguments, new.target); }
function gmmSwanSunset(R) { return __ZC(367, 250, this, arguments, new.target); }
function gmmSwanGather(k) { return __ZC(367, 251, this, arguments, new.target); }
function gmmSwanTree() { return __ZC(367, 252, this, arguments, new.target); }
function gmmSwanCradle() { return __ZC(367, 253, this, arguments, new.target); }
function gmmSwanPyre() { return __ZC(367, 254, this, arguments, new.target); }
function gmmRavensWhere(n) { return __ZC(367, 255, this, arguments, new.target); }
function gmmRavensWell() { return __ZC(367, 256, this, arguments, new.target); }
function gmmRavensPack() { return __ZC(367, 257, this, arguments, new.target); }
function gmmRavensWorldEnd() {
var F = gmmQ("ravens");
if (F.n < 2) {
setStatus("🛤️ " + gmmRavensWhere(F.n));
return;
}
var A = GMM_AT.ravens;
gmmEnterRoom("worldend", { x: A.x + 68, z: A.z + 34, ry: -1.2, room: "worldend", name: "The road to the end of the world" });
}
function gmmRavensStars() { return __ZC(367, 258, this, arguments, new.target); }
function gmmRavensLeaveEnd() { var D = GMM.ravenMtnDoor; gmmOutside(D ? { x: D.x + 6, z: D.z + 8, ry: 0 } : null); }
function gmmRavensDoor() { return __ZC(367, 259, this, arguments, new.target); }
function gmmRavensTable(R, i) { return __ZC(367, 260, this, arguments, new.target); }
function gmmIJWhere(n) { return __ZC(367, 261, this, arguments, new.target); }
function gmmIJPool() { return __ZC(367, 262, this, arguments, new.target); }
function gmmIJCage() { return __ZC(367, 263, this, arguments, new.target); }
function gmmIJKey() { var F = gmmQ("ironjohn"); if (F.n !== 2) {
setStatus("🛏️ A soft pillow. " + gmmIJWhere(F.n));
return;
} F.n = 3; setStatus("🗝️ You find the key under your mother's pillow. Now: down to the court, to the cage. " + gmmIJWhere(3)); }
function gmmIJSpring() { return __ZC(367, 264, this, arguments, new.target); }
function gmmIJFlowers() { return __ZC(367, 265, this, arguments, new.target); }
function gmmIJCall() { return __ZC(367, 266, this, arguments, new.target); }
function gmmIJApple() { return __ZC(367, 267, this, arguments, new.target); }
function gmmThrushWhere(n) { return __ZC(367, 268, this, arguments, new.target); }
function gmmThrushMock(i, W) { return __ZC(367, 269, this, arguments, new.target); }
function gmmThrushAsk(k) { return __ZC(367, 270, this, arguments, new.target); }
function gmmThrushWork(k) { return __ZC(367, 271, this, arguments, new.target); }
function gmmThrushMarket() { return __ZC(367, 272, this, arguments, new.target); }
function gmmThrushJars() { return __ZC(367, 273, this, arguments, new.target); }
function gmmThrushDance() { return __ZC(367, 274, this, arguments, new.target); }
function gmmBSWhere(n) { return __ZC(367, 275, this, arguments, new.target); }
function gmmBSBrook(i) { return __ZC(367, 276, this, arguments, new.target); }
function gmmBSDoor() { return __ZC(367, 277, this, arguments, new.target); }
function gmmBSMidnight(R) { return __ZC(367, 278, this, arguments, new.target); }
function gmmWaterWhere(n) { return __ZC(367, 279, this, arguments, new.target); }
function gmmWaterAsk() { return __ZC(367, 280, this, arguments, new.target); }
function gmmWaterDwarf() { return __ZC(367, 281, this, arguments, new.target); }
function gmmWaterDoor() { return __ZC(367, 282, this, arguments, new.target); }
function gmmWaterSword(R) { return __ZC(367, 283, this, arguments, new.target); }
function gmmWaterFill(R) { return __ZC(367, 284, this, arguments, new.target); }
function gmmWaterRavine() { return __ZC(367, 285, this, arguments, new.target); }
function gmmWaterHunt() { return __ZC(367, 286, this, arguments, new.target); }
function gmmWaterRoad() { return __ZC(367, 287, this, arguments, new.target); }
function gmmHansWhere(n) { return __ZC(367, 288, this, arguments, new.target); }
function gmmHansCarry(i) {
GMM.follow.forEach(function (Fl) { if (Fl.g)
Fl.g.visible = false; });
GMM.follow = [];
var H = GMM.hansAt && GMM.hansAt[i];
if (H && H.B) {
var L = worldLocal();
H.B.position.set(L.x + 1.5, gmmGround(L.x + 1.5, L.z + 1.5), L.z + 1.5);
gmmFollow(H.B, i === 3 ? 1.2 : 2.4);
}
}
function gmmHansWages(R, gold) { return __ZC(367, 289, this, arguments, new.target); }
function gmmHansSwap(i) { return __ZC(367, 290, this, arguments, new.target); }
function gmmHansWell() { return __ZC(367, 291, this, arguments, new.target); }
function gmmHansHome() { return __ZC(367, 292, this, arguments, new.target); }
function gmmJunWhere(n) { return __ZC(367, 293, this, arguments, new.target); }
function gmmJunBirdTo(x, z, h) { var B = GMM.junBird; if (!B)
return; B.visible = true; B.position.set(x, gmmGround(x, z) + (h || 8), z); var M = GMM.movers.filter(function (m) { return m.g === B; })[0]; if (M)
M.y = B.position.y; }
var GMM_JUNSONG = "\"My mother she killed me, my father he ate me, my sister, little Marlinchen, gathered together all my bones, tied them in a silken handkerchief, laid them beneath the juniper-tree, Kywitt, kywitt, what a beautiful bird am I!\"";
function gmmJunChest() { return __ZC(367, 294, this, arguments, new.target); }
function gmmJunBones() { return __ZC(367, 295, this, arguments, new.target); }
function gmmJunTree() { return __ZC(367, 296, this, arguments, new.target); }
function gmmJunGold() { return __ZC(367, 297, this, arguments, new.target); }
function gmmJunShoe() { return __ZC(367, 298, this, arguments, new.target); }
function gmmJunMill() { return __ZC(367, 299, this, arguments, new.target); }
function gmmTalesCard(who) { return __ZC(367, 300, this, arguments, new.target); }
function gmmTaleOne(T, who) {
gmmCard("📖 " + T[2], "No. " + T[0] + " · " + T[1], esc(T[3]), [
["📖 Read the whole tale", "as the brothers wrote it (Margaret Hunt's English, 1884)", function () { gmmBook(T[0]); }],
["Another tale", "", function () { gmmTalesCard(who); }]
]);
}
function gmmBookLoad(cb) { return __ZC(367, 301, this, arguments, new.target); }
function gmmBook(n, page) { return __ZC(367, 302, this, arguments, new.target); }
function gmmBookTale(i) { return __ZC(367, 303, this, arguments, new.target); }
function gmmBook1812Load(cb) { return __ZC(367, 304, this, arguments, new.target); }
function gmmBook1812(v, page) { return __ZC(367, 305, this, arguments, new.target); }
function gmmBook1812Tale(v, i, notes) { return __ZC(367, 306, this, arguments, new.target); }
function gmmLessons() { return __ZC(367, 307, this, arguments, new.target); }
function gmmLesson(i) { return __ZC(367, 308, this, arguments, new.target); }
function gmmExam() { return __ZC(367, 309, this, arguments, new.target); }
function gmmZoneAt(x, z) {
if (x >= GMM_IN_X - 2000)
return "inside";
if (Math.hypot(x - GMM_AT.town.x, z - GMM_AT.town.z) < GMM_AT.town.r)
return "town";
var best = "wood", bd = 1e9;
GMM.districts.forEach(function (D) { var d = Math.hypot(x - D.x, z - D.z); if (d < D.r && d / D.r < bd) {
bd = d / D.r;
best = D.k;
} });
return best;
}
var GMM_ZN = { town: "Kassel, 1812", wood: "the wood", hansel: "the deep wood (Hansel and Gretel)", redcap: "the way to Grandmother's (Little Red Cap)", rapunzel: "the enchantress's garden and the tower (Rapunzel)",
holle: "the widow's well (Mother Holle)", queen: "the Queen's castle (Snow White)", dwarfs: "beyond the seven mountains (Snow White)", goose: "the old tree and the inn (the Golden Goose)",
briar: "the castle in the thorns (Briar Rose)", cinder: "Aschenputtel's house and the king's palace", frog: "the lime tree and the well (the Frog King)", dance: "the palace of the twelve princesses",
rumpel: "the mill and the king's castle (Rumpelstiltskin)", bremen: "the road to Bremen (the Town Musicians)", kids: "the seven little goats' cottage", fisher: "the sea shore (the Fisherman and his Wife)",
giants: "the giants' tree (the Brave Little Tailor)", winter: "the snow in the far corner of the wood",
snowrose: "the widow's cottage (Snow-White and Rose-Red)", goosegirl: "the old king's castle and the goose meadow (the Goose-Girl)", swans: "the hut in the wood (the Six Swans)",
ravens: "the Glass Mountain (the Seven Ravens)", ironjohn: "the king's forest (Iron John)", thrush: "King Thrushbeard's town", brosis: "the three brooks (Little Brother and Little Sister)",
water: "the enchanted castle (the Water of Life)", hans: "the lane home (Hans in Luck)", juniper: "the juniper-tree", inside: "inside" };
function gmmBlock(x, z, feet) { return __ZC(367, 310, this, arguments, new.target); }
function gmmBuild(G) { return __ZC(367, 311, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef(GMM_KEY, {
base: GMM.base, far: 2800, ownSky: true, tone: 204,
env: function (dt) { return gmmEnvNow(dt); },
build: function (G) { gmmBuild(G); },
enter: function (opt) { return __ZC(367, 312, this, arguments, new.target); },
leave: function () { if (typeof stars !== "undefined" && stars)
stars.visible = true; GMM.run = null; GMM.lift = null; gmmFollowClear(); GMM.room = null; if (GMM.veil)
GMM.veil.style.opacity = "0"; GMM.moving = false; },
ground: function (x, z, feet) { if (GMM.lift)
return camera.position.y - 1.72; return gmmGround(x, z, feet); },
block: function (x, z, feet) { return gmmBlock(x, z, feet); },
tick: function (dt) { gmmTick(dt); },
back: function () { gmmHome(); }
});
function gmmHome() { GMM.run = null; worldHome("<b>Back from " + GMM_NAME + ".</b> The book closes behind you."); }
function gmmGo(opt) {
if (!gmmOpen() && !gmmKeeper()) {
setStatus("📖 <b>" + GMM_NAME + " is closed just now.</b> The Keeper will open it again soon.");
return false;
}
return worldGo(GMM_KEY, opt || {});
}
function gmmStateFetch() {
if (!(typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()))
return;
cityRpc("grimm_state", {}).then(function (o) { if (o && o.ok !== false) {
GMM.state = o;
var R = {}, off = o.off || [];
Object.keys(GMM_PAY).forEach(function (k) { R[k] = { on: off.indexOf(k) < 0, gold: o.gold && o.gold[k] !== undefined ? +o.gold[k] : GMM_PAY[k][1] }; });
GMM.rules = R;
} }).catch(function () { });
}
setTimeout(function () { gmmStateFetch(); setInterval(gmmStateFetch, 5 * 60000); }, 6500);
function gmmTick(dt) { return __ZC(367, 313, this, arguments, new.target); }
function gmmFolkFar(L) { return __ZC(367, 314, this, arguments, new.target); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(GMM_KEY) < 0)
WLG.keys.push(GMM_KEY);
function gmmForget() { return __ZC(367, 315, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === GMM_KEY)
gmmForget(); return r; }; })();
var GMMC = { door: null, on: null };
function gmmHallSpot() {
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
var gaps = [];
for (var i = 0; i < n; i++) {
var a = ((i + 0.5) / n) * Math.PI * 2;
gaps.push({ a: a, d: Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2))) });
}
gaps.sort(function (p, q) { return p.d - q.d; });
var a2 = (gaps[5] || gaps[gaps.length - 1] || gaps[0]).a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
}
function gmmCityTick(dt) {
if (typeof WLD === "undefined")
return;
var show = (gmmOpen() || gmmKeeper()) && !WLD.on && !store.inside && walkMode, s = show ? gmmHallSpot() : null;
if (!s) {
if (GMMC.door)
GMMC.door.visible = false;
if (GMMC.on) {
GMMC.on = null;
worldPromptCity(null);
}
return;
}
if (!GMMC.door) {
var g = new THREE.Group(), oak = new THREE.MeshLambertMaterial({ color: 0x4A2E1A }), stone = new THREE.MeshLambertMaterial({ color: 0x8A847A }), gold = new THREE.MeshPhongMaterial({ color: 0xE8C040, shininess: 90, specular: 0xFFF0C0 });
wBox(0.9, 5.2, 0.9, stone, -2, 2.6, 0, g);
wBox(0.9, 5.2, 0.9, stone, 2, 2.6, 0, g);
var arch = new THREE.Mesh(new THREE.TorusGeometry(2, 0.45, 6, 16, Math.PI), stone);
arch.position.y = 5.2;
g.add(arch);
wBox(3.1, 5.2, 0.22, oak, 0, 2.6, 0, g);
for (var i = 0; i < 5; i++)
wBox(3.1, 0.08, 0.06, new THREE.MeshLambertMaterial({ color: 0x2A1A10 }), 0, 0.6 + i * 1.1, 0.13, g);
var bow = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 6, 14), gold);
bow.position.set(0.9, 2.6, 0.2);
g.add(bow);
wBox(0.5, 0.08, 0.08, gold, 1.3, 2.6, 0.2, g);
wBox(0.08, 0.18, 0.08, gold, 1.45, 2.5, 0.2, g);
for (var t = 0; t < 7; t++) {
var lf = wSph(0.35, new THREE.MeshLambertMaterial({ color: t % 2 ? 0x2E5A2A : 0x3A6A2A }), -2.3 + t * 0.77, 6.2 + Math.sin(t) * 0.3, 0.3, g, 8);
}
var sg = wSign(["THE GRIMM WOOD", "Kassel, 1812, and all the tales · press E"], 3.8, 0.8, "#2A2018", "#F0D890");
sg.position.set(0, 7.4, 0.5);
g.add(sg);
scene.add(g);
GMMC.door = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
GMMC.door.visible = true;
GMMC.door.position.set(s.x, 0, s.z);
GMMC.door.rotation.y = -s.a - Math.PI / 2;
if (d < 3.6) {
if (GMMC.on !== "door") {
GMMC.on = "door";
worldPromptCity("📖 <b>" + GMM_NAME + "</b> · <b>press E</b> to open the oak door with the golden key", function () { worldPromptCity(null); GMMC.on = null; gmmGo({ from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } }); });
}
}
else if (GMMC.on === "door") {
GMMC.on = null;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
gmmCityTick(dt);
}
catch (e) {
if (!GMM.e1) {
GMM.e1 = 1;
if (window.console)
console.warn("grimm city:", e);
}
} };
})();
function gmmMenu() { return __ZC(367, 316, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
var btn = document.getElementById("me-grimm");
if (!btn) {
btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-grimm";
btn.title = GMM_NAME;
btn.textContent = "📖 Grimm";
btn.onclick = function () { gmmMenu(); };
bar.appendChild(btn);
}
btn.style.display = (gmmOpen() || gmmKeeper()) ? "" : "none";
setTimeout(hook, 30000);
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
})();
(function () {
if (typeof ctBoard !== "function")
return;
var cb = ctBoard;
ctBoard = function (id, msg) {
if (id !== "grimm" || typeof worldCard !== "function")
return cb.apply(this, arguments);
var wc = worldCard;
worldCard = function (h, fns) {
worldCard = wc;
fns = fns || {};
fns.gmmwood = function () { worldCard(null); gmmGo({}); };
return wc(h + worldBtn("gmmwood", "🌲 Walk into the Grimm Wood", "Kassel, 1812, and every one of the brothers' great tales in a wood of its own"), fns);
};
try {
return cb.apply(this, arguments);
}
finally {
worldCard = wc;
}
};
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-gmm]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-gmm", "1");
b.textContent = "📖 " + GMM_NAME + " (Kassel)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } gmmGo({}); };
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
var m = /[?&]kgrimm=([a-z0-9-]+)/.exec(location.search);
if (!m)
return;
var where = m[1];
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!gmmKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
gmmGo(where.indexOf("room-") === 0 ? { room: where.slice(5) } : (GMM_AT[where] ? { at: where } : {}));
try {
var q = new URLSearchParams(location.search);
q.delete("kgrimm");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === GMM_KEY; })) {
DGR_WORLDS.push([GMM_KEY, GMM_NAME + " (Safe: the tales are dark, but nothing there can hurt you)", 0, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[GMM_KEY] = { id: GMM_KEY, name: GMM_NAME, def: 0, group: "hidden" };
}
if (typeof DK_PLACES !== "undefined" && !DK_PLACES.some(function (p) { return p[0] === GMM_KEY; }))
try {
DK_PLACES.push([GMM_KEY, GMM_NAME]);
}
catch (e) { }
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.goldenkey)
return;
var d = { k: "goldenkey", name: "The Golden Key", icon: "🗝️", at: GMM_KEY, seed: [GMM_AT.winter.x + 18, GMM_AT.winter.z - 19], spot: "snow", mark: 0xF0C840,
what: "a patch of snow that has been scraped away, beside the fallen log", look: "Someone cleared the snow here to light a fire and never lit it. In the frozen earth, something small catches the light.", act: "Dig with your hands",
open: "A tiny golden key; and under it, an iron casket with a keyhole so small you can hardly see it. The key fits exactly. You turn it once round...",
tale: "The last of the Grimms' two hundred tales, and the shortest: a poor boy, sent out in the deep snow to fetch wood on a sledge, scraped away the snow to make a fire and found a tiny golden key. Where there is a key, he thought, there must be a lock, and he dug and found an iron casket. The key fitted. He turned it once round, and the book ends: 'and now we must wait until he has quite unlocked it and opened the lid, and then we shall learn what wonderful things were lying in that box.' No one has ever read what was inside. Now you know.",
rumour: "Wilhelm Grimm put it last in the book on purpose, they say at the inn: the key to all the tales. Dorothea Viehmann only says: where the snow never melts, in the far corner of the wood, look by the log nobody burned." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.goldenkey = d;
RA.order.push("goldenkey");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "goldenkey") {
var key = "goldenkey@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.goldenkey;
if (c && c.key === key)
return c;
var x = GMM_AT.winter.x + 18, z = GMM_AT.winter.z - 19.2;
return (RA.spots.goldenkey = { x: x, z: z, y: gmmGround(x, z), key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.goldenkey = function () {
var g = new THREE.Group(), gm = new THREE.MeshPhongMaterial({ color: 0xF0C840, shininess: 120, specular: 0xFFF4C0 });
var bow = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.014, 8, 18), gm);
bow.position.y = 0.16;
g.add(bow);
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.16, 8), gm);
sh.position.y = 0.06;
g.add(sh);
var bit = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.025, 0.01), gm);
bit.position.set(0.02, 0.0, 0);
g.add(bit);
var glow = wGlow(0xFFD860, 0.5, 0.5);
glow.position.y = 0.1;
g.add(glow);
return { g: g, h: 0.22, anim: function (dt) { g.rotation.y += dt * 0.5; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.goldenkey = { n: "The Key to the Tales", col: 0xF0C840, cd: 45, pas: { speed: 1.05, regen: 1.4 },
act: [{ aoe: 16, dmg: 80, knock: 5 }, { aoe: 16, slow: 8 }],
pasT: "Once round the lock: you move 5% faster and heal steadily, as one who has all the tales by heart and fears none of them.",
actT: "The Casket Opens: a ring of golden light bursts from the open lid and strikes every foe within 16 m for 80 and throws them back; then they stand spellbound, slowed, for 8 seconds (dreamers too, where dreamers may fight)." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.gmm;
if (d && Array.isArray(d.keeps) && d.keeps.length) {
var by = {};
d.keeps.forEach(function (s) { var k = s.i + " " + s.n; by[k] = (by[k] || 0) + 1; });
h += bkpHead("Keepsakes from " + GMM_NAME) + Object.keys(by).map(function (k) { return bkpRow(esc(k), by[k] > 1 ? "×" + by[k] : ""); }).join("");
}
}
catch (e) { }
return h;
};
})();
function gmmTest() { return { GMM: GMM, go: gmmGo, room: gmmEnterRoom, rooms: GMM_ROOMS, at: GMM_AT, land: gmmLand, ground: gmmGround, block: gmmBlock, zone: gmmZoneAt, book: gmmBook, menu: gmmMenu, play: { pebbles: gmmPebblesStart, red: gmmRedStart, rampion: gmmRampionStart, flounder: gmmFlounderCall } }; }
if (typeof motesTick === "function") {
var gmmMt = motesTick;
motesTick = function () {
var r = gmmMt.apply(this, arguments);
if (WLD.on === GMM_KEY && GFX.motes) {
var dark = !!gmmEnvNow().stars;
GFX.motes.pts.material.color.setHex(dark ? 0xBFD8FF : 0xFFE8C0);
GFX.motes.pts.material.opacity = dark ? 0.6 : 0.18;
}
return r;
};
}
function gmmMillYard(g) { return __ZC(367, 317, this, arguments, new.target); }
(function () {
if (typeof gmmRumpel !== "function")
return;
var f = gmmRumpel;
gmmRumpel = function () { var r = f.apply(this, arguments); try {
var D = GMM.districts.filter(function (d) { return d.k === "rumpel"; })[0];
if (D)
gmmMillYard(D.g);
}
catch (e) {
if (window.console)
console.warn("[grimm] mill yard", e);
} return r; };
})();
