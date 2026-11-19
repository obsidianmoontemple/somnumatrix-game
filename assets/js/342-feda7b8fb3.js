/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var KZ_KEY = "The Kids Zone";
var KZ_NAME = "Wonderglen";
var KZ_ITEMS = [
["kz_clover", "Four-leaf clover", "🍀", "find", 0, 0, "Lucky, and the critters love it."],
["kz_pebble", "Rainbow pebble", "🌈", "find", 0, 0, "A smooth stone with every colour in it."],
["kz_feather", "Pixie feather", "🪶", "find", 0, 0, "Light as a whisper; it shimmers when you turn it."],
["kz_petal", "Star petal", "🌼", "find", 0, 0, "A flower petal shaped like a little star."],
["kz_shell", "Glow shell", "🐚", "find", 0, 0, "From the Lily Pond. It glows softly in the dark."],
["kz_sparkle", "Sparkle stone", "💎", "find", 0, 0, "From the Glow-worm Grotto. It twinkles, gently."],
["kz_honeydrop", "Honeydrop lolly", "🍭", "treat", 12, 0, "A honey lolly on a stick, from the Tuckshop."],
["kz_cupcake", "Fairy cupcake", "🧁", "treat", 25, 0, "Pink icing and a sugar flower on top."],
["kz_berryfizz", "Berry fizz", "🧃", "treat", 0, 30, "Sparkling berry juice in a little bottle."],
["kz_moonmilk", "Moonmilk cocoa", "☕", "treat", 6, 24, "Warm cocoa with a cloud of cream."],
["kz_apple", "Rosy apple", "🍎", "treat", 15, 6, "Crunchy and sweet, from the Treehouse orchard."],
["kz_popcorn", "Striped bag of popcorn", "🍿", "treat", 18, 0, "Warm and buttery, in a red and white striped bag."],
["kz_candyfloss", "Candy floss", "🍥", "treat", 14, 0, "A pink cloud of spun sugar on a stick."],
["kz_lemonade", "Pink lemonade", "🥤", "treat", 0, 28, "Cold and fizzy, with a curly straw."],
["kz_bracelet", "Friendship bracelet", "📿", "make", 0, 0, "Made at the Craft Cottage. Give it to a friend, or keep it."],
["kz_crown", "Flower crown", "👑", "make", 0, 0, "Star petals and clover, woven in a ring."],
["kz_chime", "Shell wind chime", "🎐", "make", 0, 0, "Glow shells that ring in the breeze."],
["kz_lantern", "Paper lantern", "🏮", "make", 0, 0, "A lantern you folded yourself."],
["kz_kite", "Rainbow kite", "🪁", "make", 0, 0, "Feathers for a tail, every colour of pebble paint."],
["kz_starwand", "Starlight necklace", "📿", "make", 0, 0, "Sparkle stones on a ribbon."],
["kz_star", "Gold star", "⭐", "star", 0, 0, "Won by playing in the Kids Zone. Trade them for toys at the Prize Tent."],
["kz_plush", "Moonfoal plushie", "🦄", "toy", 0, 0, "A soft toy foal with a silver horn."],
["kz_yoyo", "Glow yo-yo", "🪀", "toy", 0, 0, "It glows softly as it spins."],
["kz_marbles", "Bag of marbles", "🔮", "toy", 0, 0, "Twelve swirly marbles in a velvet bag."],
["kz_top", "Spinning top", "🌀", "toy", 0, 0, "Painted in stripes; it hums when it spins."],
["kz_bubblewand", "Bubble wand", "🫧", "toy", 0, 0, "Blow bubbles anywhere you go."],
["kz_globe", "Faerie snow globe", "❄️", "toy", 0, 0, "Shake it: tiny petals swirl round a toadstool house."],
["kz_nose", "Squeaky red nose", "🔴", "toy", 0, 0, "A soft red nose that squeaks, just like the clowns' at the Big Top."],
["kz_elephant", "Baby elephant plushie", "🐘", "toy", 0, 0, "A soft grey elephant with a pink bow, from Wonderglen Zoo."],
["kz_musicbox", "Big Top music box", "🎪", "toy", 0, 0, "Wind it and a tiny striped tent spins round to a circus tune."],
["kz_dragon", "Little dragon plushie", "🐉", "toy", 0, 0, "A friendly green dragon with felt wings."],
["kz_wonderwand", "The Wonder Wand", "🪄", "wand", 0, 0, "For a full Sticker Book. Wave it and soft lights dance round you."]
];
var KZ_ITEM = {};
KZ_ITEMS.forEach(function (r) { KZ_ITEM[r[0]] = { k: r[0], n: r[1], e: r[2], sort: r[3], fd: r[4], dr: r[5], note: r[6] }; });
var KZ_PRIZES = [["kz_bubblewand", 2], ["kz_top", 2], ["kz_yoyo", 3], ["kz_marbles", 3], ["kz_plush", 5], ["kz_dragon", 5], ["kz_globe", 8], ["kz_nose", 2], ["kz_elephant", 5], ["kz_musicbox", 6]];
var KZ_TREATS = ["kz_honeydrop", "kz_cupcake", "kz_berryfizz", "kz_moonmilk", "kz_apple"];
var KZ_SNACKS = ["kz_popcorn", "kz_candyfloss", "kz_lemonade"];
var KZ_MAKES = [
{ k: "kz_bracelet", need: { kz_feather: 3, kz_pebble: 3 } },
{ k: "kz_crown", need: { kz_petal: 5, kz_clover: 2 } },
{ k: "kz_chime", need: { kz_shell: 4, kz_sparkle: 2 } },
{ k: "kz_lantern", need: { kz_petal: 2, kz_feather: 2, kz_sparkle: 1 } },
{ k: "kz_kite", need: { kz_feather: 4, kz_pebble: 4, kz_petal: 2 } },
{ k: "kz_starwand", need: { kz_sparkle: 4, kz_shell: 1 } }
];
var KZ_PAGES = [["toadstool", "The Rainbow Toadstool"], ["moonfoal", "Moss the Moonfoal"], ["carousel", "The Carousel"], ["treehouse", "The Great Treehouse"],
["mushrooms", "The Singing Mushrooms"], ["nimbus", "Nimbus the Cloud"], ["bubbles", "Bubble Meadow"], ["frog", "Hopsworth on his Lily Pad"],
["lanterns", "Star Lantern Hill"], ["dragon", "The Little Dragon"], ["fairydoor", "The Fairy Door"], ["bus", "The School Bus"]];
KZ_PAGES.forEach(function (p, i) { var r = ["kz_pg_" + p[0], "Coloured page: " + p[1], "🖍️", "page", 0, 0, "A page you coloured yourself in the Colouring Cottage."]; KZ_ITEMS.push(r); KZ_ITEM[r[0]] = { k: r[0], n: r[1], e: r[2], sort: r[3], fd: 0, dr: 0, note: r[6] }; });
var KZ_PAGES_NEED = 3;
var KZ_PUZZLES = [["slide", "Sliding pictures", "🖼️"], ["match", "Matching pairs", "🃏"], ["words", "Word search", "🔤"], ["sums", "Number fun", "🔢"], ["pattern", "What comes next?", "🔷"], ["spell", "Spelling scramble", "✏️"]];
var KZ_PUZZLES_NEED = 5;
var KZ_STICKERS = [
["bubbles", "Bubble Catcher", "🫧", "Pop fifteen bubbles in Bubble Meadow before the sand runs out."],
["tune", "Mushroom Maestro", "🍄", "Play back the Singing Mushrooms' tune."],
["pads", "Lily-pad Hopper", "🪷", "Hop across the lily pads to the Lotus Island without a splash."],
["slide", "Rainbow Rider", "🌈", "Ride the Rainbow Slide down from the Great Treehouse."],
["carousel", "Carousel Rider", "🎠", "Ride the Carousel of Friendly Beasts all the way round."],
["clouds", "Cloud Bouncer", "☁️", "Bounce up the clouds to the Rainbow Cloud at the top."],
["maze", "Maze Explorer", "🌻", "Find the Wishing Well in the middle of the Flower Maze."],
["story", "Story Listener", "📖", "Hear a story in Storybook Hollow and answer the question."],
["paint", "Wall Painter", "🖌️", "Colour every part of the Great Colouring Wall in the Colouring Garden."],
["colour", "Colouring Champion", "🖍️", "Finish three pages of the Colouring Book in the Colouring Cottage."],
["puzzles", "Puzzle Master", "🧩", "Solve five different kinds of puzzle at the Puzzle Pavilion."],
["facts", "Clever Clogs", "💡", "Answer eight Wonder Facts on the signs round Wonderglen."],
["critters", "Critter Friend", "🐰", "Feed three different critters in Critter Corner."],
["lanterns", "Lantern Lighter", "🏮", "Light the seven lanterns on Star Lantern Hill in rainbow order."],
["doors", "Fairy Door Finder", "🚪", "Find all five tiny fairy doors hidden round Wonderglen."],
["zoo", "Zoo Explorer", "🦁", "Read every animal's sign at Wonderglen Zoo and answer its question."],
["circus", "Circus Star", "🎪", "Watch a whole show at the Starlight Big Top, from the drum roll to the last bow."],
["ringtoss", "Ring Toss Champ", "⭕", "Land three rings out of five at the Ring Toss by the Big Top."]
];
var KZ_STICKER = {};
KZ_STICKERS.forEach(function (s) { KZ_STICKER[s[0]] = { k: s[0], n: s[1], e: s[2], how: s[3] }; });
var KZ_RIM = 470;
var KZ_SITES = [
["door", 0, 232, 16, "the Rainbow Toadstool"], ["welcome", 0, 180, 40, "the Welcome Glade"],
["bubbles", -118, 128, 40, "Bubble Meadow"], ["mushrooms", 118, 128, 26, "the Singing Mushrooms"],
["pond", -176, -10, 40, "the Lily Pond"], ["tree", 0, 44, 34, "the Great Treehouse"],
["carousel", 128, 10, 20, "the Carousel of Friendly Beasts"], ["clouds", 196, -110, 40, "the Cloud Bounce"],
["maze", -132, -150, 46, "the Flower Maze"], ["story", 0, -104, 30, "Storybook Hollow"],
["paint", 88, -170, 32, "the Colouring Garden"], ["colouring", 138, -214, 14, "the Colouring Cottage"], ["puzzles", -74, -34, 18, "the Puzzle Pavilion"], ["critters", -226, 118, 36, "Critter Corner"],
["lanterns", 0, -250, 30, "Star Lantern Hill"], ["grotto", -250, -150, 22, "the Glow-worm Grotto"],
["school", 226, 122, 24, "the Little Schoolhouse"], ["staff", 72, 206, 16, "the Staff Lodge"],
["craft", -66, 206, 14, "the Craft Cottage"],
["zoo", -210, 320, 70, "Wonderglen Zoo"], ["circus", 370, 0, 46, "the Starlight Big Top"]
];
var KZ_SITE = {};
KZ_SITES.forEach(function (s) { KZ_SITE[s[0]] = { k: s[0], x: s[1], z: s[2], r: s[3], name: s[4] }; });
var KZ_DOORS = [
[-292, 40, 0xC86A8A, "A tiny pink door in the roots of a willow. A note pinned to it says: \"Gone to the Lily Pond. Back for tea.\""],
[262, -28, 0x6A8AD0, "A tiny blue door in a mossy stone, with a doorbell made from a bluebell."],
[-40, -300, 0xE8B84A, "A tiny yellow door under the hill, with a doormat that says WELCOME in very small letters."],
[300, 190, 0x7AB86A, "A tiny green door in a tree stump, with a little window and a curtain that twitches."],
[-200, -252, 0xA87AD0, "A tiny violet door in the cliff, with a lantern no bigger than a thimble beside it."]
];
var KZ_NOTES = [[262, 0xE8605A, "C"], [294, 0xF0984A, "D"], [330, 0xEED050, "E"], [349, 0x7CC860, "F"], [392, 0x50B8C8, "G"], [440, 0x5A86E0, "A"], [494, 0x9A6AD8, "B"], [523, 0xE070B8, "C"]];
var KZ_RAINBOW = [[0xE8504A, "red"], [0xF0903A, "orange"], [0xF0D040, "yellow"], [0x60C058, "green"], [0x48A8E0, "blue"], [0x5A62D0, "indigo"], [0x9A5AD0, "violet"]];
var KZ_STORIES = [
["The Bubble That Wanted to Stay",
"Once, in Bubble Meadow, a bubble named Bloop floated up from a wand and looked around. \"What a lovely place,\" said Bloop. \"I never want to pop!\" So Bloop drifted very carefully past the thistles, round the bumblebees, and under the low branch of the plum tree. A little girl named Odessa was sitting on the grass, feeling sad because her friend had gone home. Bloop floated down and hovered right in front of her nose, wobbling with all its rainbow colours. Odessa laughed. She laughed so hard that Bloop jiggled, and wiggled, and then, very gently, went pop! But the laugh stayed. And Odessa found that a laugh lasts much, much longer than a bubble.",
"What did Bloop leave behind when it popped?", ["Odessa's laugh", "A rainbow pebble", "A puddle"]],
["Moss the Shy Moonfoal",
"Moss was the smallest moonfoal in the herd, with a silver horn no longer than a thimble. Every evening the other foals galloped up Star Lantern Hill, but Moss stayed at the bottom, because Moss was shy. One night, a lantern on the hill went out, and nobody could relight it. The big foals tried: their horns were too big to fit inside the little glass door. Then Moss trotted up, very slowly, and touched the wick with that tiny silver horn. The lantern glowed again, warm and gold. \"Small things,\" said the old owl in the oak, \"can do what big things can't.\" After that, Moss always ran up the hill with everyone else.",
"Why could Moss light the lantern when the others could not?", ["Moss's horn was small enough to fit", "Moss ran the fastest", "Moss had a box of matches"]],
["The Mushroom Who Forgot Its Note",
"In the Singing Mushroom ring, every mushroom has a note. The red one sings low, the purple one sings high, and the yellow one, whose name was Bellcap, sings right in the middle. But one morning Bellcap woke up and could not remember its note at all. It tried a squeak. It tried a boom. It tried a whistle. Nothing sounded right. So the mushrooms on either side sang their notes, one a little lower, one a little higher, and Bellcap listened, and listened, and found the note that fit just between them. \"There you are,\" said the others. Bellcap learned that when you forget who you are, your friends can help you remember.",
"How did Bellcap find its note again?", ["By listening to the notes on either side", "By eating a cupcake", "By asking the clouds"]],
["The Cloud Who Was Too Heavy",
"Nimbus was a little cloud who lived above the Cloud Bounce. All the other clouds were light and fluffy, but Nimbus had been drinking up the morning dew, sip after sip, and now Nimbus was heavy and grey and sinking lower and lower. \"Oh dear,\" said Nimbus, \"I'm too heavy to bounce anyone!\" A gardener in the Paint Meadow looked up. \"My flowers are thirsty,\" she called. \"Could you spare a little rain?\" So Nimbus rained, softly, over every flower in the meadow, until it was white and fluffy again. The flowers stood up tall, and Nimbus floated back to the Cloud Bounce, light as a feather, ready for everyone to jump on.",
"What made Nimbus light and fluffy again?", ["Sharing its rain with the thirsty flowers", "Taking a long nap", "Eating a honeydrop lolly"]],
["The Maze and the Brave Little Mouse",
"Juniper Mouse wanted to see the Wishing Well in the middle of the Flower Maze, but everyone said the maze was far too tricky. Juniper went in anyway. At the first turning, Juniper went left and found a wall of sunflowers. At the second turning, Juniper went right and found a wall of roses. Juniper did not cry, and did not give up. Instead, Juniper put one paw on the flowers to the right and kept walking, always keeping that paw on the flowers, turn after turn. And at last, there was the Wishing Well, shining in the sun. Juniper wished that everyone who gets lost finds their way, and then followed the flowers all the way back out again.",
"What trick did Juniper use to find the way?", ["Keeping one paw on the flowers and following them", "Climbing over the walls", "Flying with a balloon"]],
["The Fairy Doors",
"Nobody knows who lives behind the five tiny fairy doors in Wonderglen. Some say it's the pixies. Some say it's the field mice. Old Grandmother Willowmere says it's \"the folk who keep the Kids Zone tidy\": the ones who straighten the lily pads at night and tuck the bubbles in and polish the stars. If you find a fairy door, you must knock very softly, just once, and say thank you. You won't see anyone. But the next morning, you might notice that the flowers by that door have grown a little taller, as if somebody small had watered them with care.",
"What should you do if you find a fairy door?", ["Knock very softly once and say thank you", "Shout as loud as you can", "Try to open it with a key"]]
];
var KZ_FACTS = [
["zoo", "Why zoos matter", "Good zoos help look after animals that are rare in the wild. Some animals, like the Arabian oryx, were saved because zoos looked after them and then set them free again.", "How can zoos help rare animals?", ["They look after them and set them free again", "They paint them", "They teach them to fly"]],
["circus", "How a trapeze artist stays safe", "Trapeze artists practise for years, start low down, and always have a safety net or a safety line. Catching a partner takes perfect timing: counting the swings together.", "What keeps trapeze artists safe?", ["Practice and a safety net", "Lucky socks", "Holding their breath"]],
["bubbles", "Why bubbles shine", "A soap bubble is a ball of air wrapped in a skin of soapy water thinner than a hair. Light bounces off the inside and the outside of that skin, and the two reflections mix into swirling rainbow colours.", "What is inside a bubble?", ["Air", "Water", "Sand"]],
["mushrooms", "Mushrooms are not plants", "Mushrooms are fungi. They cannot make food from sunlight the way plants do, so they grow on old wood, leaves and soil and help turn them back into rich earth.", "Mushrooms belong to which group of living things?", ["Fungi", "Plants", "Animals"]],
["pond", "Lily pads float", "A lily pad floats because it is full of tiny pockets of air. Its roots are down in the mud at the bottom of the pond, joined to the pad by a long, bendy stem.", "What helps a lily pad float?", ["Tiny pockets of air", "Magic glue", "Its roots pushing up"]],
["tree", "How old is a tree?", "Every year a tree grows a new ring of wood under its bark. Count the rings on a stump and you know how many years the tree lived.", "How can you tell how old a cut tree was?", ["Count the rings in the wood", "Count the leaves", "Measure the shadow"]],
["carousel", "Round and round", "A carousel spins round its middle. The beasts near the outside travel further on every turn than the ones near the middle, so they go faster, even though everyone goes round in the same time.", "On a carousel, which riders go fastest?", ["The ones on the outside", "The ones in the middle", "They all go the same speed"]],
["clouds", "What clouds are made of", "A cloud is made of billions of tiny drops of water, or bits of ice, so small and light that they float in the air. When the drops join up and get heavy, they fall as rain.", "What is a cloud made of?", ["Tiny drops of water or ice", "Cotton wool", "Smoke"]],
["maze", "Hands on the wall", "In a maze whose walls are all joined together, if you keep one hand on the wall and never let go, you will always find the way out, though it may not be the shortest way.", "What simple trick helps you solve many mazes?", ["Keep one hand on the wall", "Always turn left twice", "Walk backwards"]],
["story", "Stories are old", "People told stories long before anyone could write. Stories were remembered and passed from grown-ups to children for hundreds and hundreds of years.", "How did people share stories before writing?", ["By telling them out loud", "By text message", "By painting them on the moon"]],
["paint", "Mixing colours", "Red, yellow and blue paints are the primary colours. Mix yellow and blue and you get green; red and yellow make orange; red and blue make purple.", "What do you get when you mix yellow and blue paint?", ["Green", "Pink", "Brown"]],
["critters", "Rabbits' teeth", "A rabbit's front teeth never stop growing! Chewing grass, hay and clover wears them down, so they stay just the right length.", "Why do rabbits chew so much?", ["To keep their growing teeth the right length", "Because they are bored", "To sharpen their ears"]],
["lanterns", "The rainbow's order", "A rainbow always has its colours in the same order: red, orange, yellow, green, blue, indigo and violet. Some people remember it as the name Roy G. Biv.", "Which colour is at the top of a rainbow?", ["Red", "Violet", "Green"]],
["grotto", "Glow-worms", "Real glow-worms make their own light, called bioluminescence. Some glow-worms in caves hang sticky threads that shine like little stars to catch their dinner.", "What do we call it when a living thing makes its own light?", ["Bioluminescence", "Electricity", "Sunburn"]],
["puzzles", "Puzzles grow brains", "When you solve a puzzle, your brain makes new links between its cells. The more puzzles you try, the better you get at spotting patterns.", "What happens in your brain when you solve puzzles?", ["It makes new links", "It shrinks", "Nothing at all"]],
["school", "Letters and numbers", "The English alphabet has 26 letters. Five of them, A, E, I, O and U, are called vowels.", "How many letters are in the English alphabet?", ["26", "24", "30"]]
];
var KZ_FACTS_NEED = 8;
var KZ_WORDS = {
nature: ["FLOWER", "TREE", "CLOUD", "RAIN", "LEAF", "SEED", "ROOT", "BEE", "FROG", "POND", "MOSS", "FERN"],
faerie: ["PIXIE", "WAND", "STAR", "MAGIC", "GLOW", "WISH", "FAIRY", "CROWN", "MOON", "SPELL", "DREAM", "SPARK"],
animals: ["RABBIT", "FOX", "OWL", "DEER", "MOUSE", "DUCK", "LAMB", "GOAT", "SNAIL", "BIRD", "CAT", "DOG"],
colours: ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "PURPLE", "PINK", "BROWN", "WHITE", "BLACK", "GOLD", "SILVER"]
};
var KZ_SPELL = ["SUN", "BEE", "OWL", "STAR", "MOON", "FROG", "CAKE", "KITE", "BOOK", "TREE", "FISH", "BIRD", "LEAF", "DOOR", "BELL", "NEST", "PAINT", "CLOUD", "HONEY", "APPLE", "MAGIC", "FAIRY", "SMILE", "RAINBOW", "MUSHROOM", "BUTTERFLY", "LANTERN", "CAROUSEL", "TREEHOUSE", "BUBBLE", "PUZZLE", "GARDEN", "CASTLE", "DRAGON", "PENCIL", "SCHOOL", "FRIEND", "FLOWER", "KITTEN", "PLANET", "SUNSHINE"];
var KZ_FOLK = [
["welcome", "Periwinkle Pipkin", "the Welcome Pixie of the Kids Zone, small and quick, with lavender wings", "Hello, hello! Welcome to Wonderglen, the Kids Zone of Faerie! Everything here is for playing. Would you like to know what there is to do?", "You are bubbly, kind and very patient. You love helping new visitors find something fun to do, and you always keep things safe and gentle.", "welcome"],
["story", "Grandmother Willowmere", "the storyteller of Storybook Hollow, a very old and very kind fae with silver hair and a shawl of leaves", "Come and sit, little one. The book is open and the story is ready.", "You are warm, slow-spoken and wise. You tell gentle stories with happy endings.", "story"],
["tuck", "Bumblewick", "the round, cheerful gnome who keeps the Honeydrop Tuckshop", "Treats! Lovely treats! A few for everyone each day, and they cost nothing at all.", "You are jolly and generous, and you hum while you work.", "welcome"],
["pond", "Mistress Puddleby", "the keeper of the Lily Pond, in rubber boots, who watches the water so everyone stays safe", "The pond's only shallow, dearie, but hop on the pads and you'll keep your socks dry!", "You are motherly, watchful and fond of frogs.", "pond"],
["carousel", "Tobias Gladwhistle", "the carousel operator, in a striped waistcoat, who knows every beast on the carousel by name", "Step right up! Every beast on my carousel is friendly, and every ride goes all the way round.", "You are cheerful and a little bit theatrical.", "carousel"],
["critters", "Fern Hollowbrook", "the critter keeper of Critter Corner, with a bunny in her apron pocket", "Gentle hands and quiet feet, and the critters will come to you. Clover is their favourite.", "You are calm, gentle and love every animal.", "critters"],
["maze", "Professor Hootling", "a learned old owl who sits on the gate of the Flower Maze", "Hoo! The Wishing Well lies at the heart. Keep one hand on the hedge, and you'll never be lost for long.", "You are wise and a little absent-minded, and you love a good puzzle.", "maze"],
["paint", "Madame Daubery", "the art teacher of the Colouring Garden, with paint on her nose", "Every picture is a good picture. Pick up a paint pot, darling, and colour the Great Wall, or come inside the Cottage for the Colouring Book!", "You are encouraging and joyful about colour.", "paint"],
["lanterns", "Lumi Starwick", "the lamplighter of Star Lantern Hill, who carries a long brass pole with a glowing tip", "Seven lanterns, seven colours, red to violet, like the rainbow. Can you light them in order?", "You are quiet, dreamy and love the stars.", "lanterns"],
["prizes", "Dandelion Jinks", "who keeps the Prize Tent, with a fluffy white hat like a dandelion clock", "Gold stars! Trade your gold stars for toys. Every toy is made right here in Faerie.", "You are bouncy and full of jokes.", "welcome"],
["clouds", "Nimbus", "a small friendly cloud sprite who keeps the Cloud Bounce", "Boing! Hop on a cloud and you'll bounce. Hold jump and you'll bounce higher!", "You are giggly and fizzy, like a cloud full of bubbles.", "clouds"],
["school", "Miss Primrose Tallyquill", "the teacher at the Little Schoolhouse, with spectacles on a ribbon", "The school bus goes to the Commons School, our big school for every grade, kindergarten to twelve. It's free for everyone!", "You are bright, encouraging and love to learn.", "school"],
["head", "Dame Hollyhock Bright", "the Head of the Kids Zone, tall and kind, who knows every child's name", "Welcome to Wonderglen. If you ever need help, any of us in the green sashes will help you.", "You are kind, calm and firm about safety. You run the Kids Zone and its staff.", "staff"],
["zoo", "Marigold Pemberton", "the head zookeeper of Wonderglen Zoo, in khaki with a parrot-bright scarf, who has looked after animals all her life", "Welcome to Wonderglen Zoo! Every animal has a sign with something amazing to learn. Read them all and you'll be a Zoo Explorer.", "You know every animal in the zoo by name and love sharing true, simple animal facts with children. The Zoo Express train leaves from the little station by the gate.", "staff"],
["circus", "Ringmaster Barnaby Brightwhistle", "the ringmaster of the Starlight Big Top, in a scarlet tailcoat and a tall golden hat, with a twirly moustache", "Roll up, roll up! The show starts every few minutes. Find a seat on the benches and watch the acrobats fly!", "You are grand and jolly and you love the circus. The show has acrobats on the trapeze, a juggler, a unicyclist, tumbling clowns and a stilt walker. There are no animals in this circus; the animals live happily at the zoo.", "staff"]
];
var KZ_JOBS = [
[5700, "Head of the Kids Zone", 14, 1, false, true, [9, 8], [["Run the Kids Zone", "desk", ["Open the Staff Lodge", "Check every place is safe and open", "Meet with the staff", "Write the day's report"]]]],
[5701, "Play leader", 11, 4, true, true, [9, 8], [["Lead the games", "station", ["Gather the players at the Welcome Glade", "Run a round of Bubble Catch", "Lead a walk to the Flower Maze", "Tidy the play things away"]]]],
[5702, "Storyteller", 11, 2, true, false, [10, 8], [["Tell the stories", "station", ["Set out the cushions in Storybook Hollow", "Choose the day's stories", "Tell a story to the listeners", "Ask the story question"]]]],
[5703, "Tuckshop keeper", 10, 2, true, false, [9, 8], [["Keep the Tuckshop", "desk", ["Bake the fairy cupcakes", "Fill the honeydrop jars", "Hand out the day's treats", "Wipe the counter"]]]],
[5704, "Carousel operator", 10, 2, true, false, [10, 8], [["Run the carousel", "station", ["Check every beast is firm on its pole", "Start the music box", "Help the riders on and off", "Close the gate between rides"]]]],
[5705, "Critter keeper", 10, 2, true, true, [8, 8], [["Care for the critters", "station", ["Fill the water bowls", "Brush the moonfoals", "Count the bunnies", "Show visitors how to feed the critters gently"]]]],
[5706, "Lily pond lifeguard", 11, 2, true, false, [9, 8], [["Watch the Lily Pond", "station", ["Check the lily pads are firm", "Watch the hoppers", "Help anyone who splashes", "Rake the pond edge"]]]],
[5707, "Art and craft teacher", 12, 2, false, false, [9, 8], [["Teach art and craft", "desk", ["Set out the paints and easels", "Show a painting idea", "Help at the Craft Cottage tables", "Hang the paintings to dry"]]]],
[5708, "Music teacher", 12, 1, false, false, [10, 8], [["Teach music at the Singing Mushrooms", "station", ["Tune the Singing Mushrooms", "Play a new tune", "Help the players play it back", "Clap for everyone"]]]],
[5709, "Kids Zone warden", 11, 3, true, true, [8, 8], [["Keep the Kids Zone safe", "station", ["Walk the paths", "Check the Treehouse rails", "Help a lost child find their grown-up", "Report to the Head"]]]],
[5710, "Prize tent keeper", 10, 1, true, false, [10, 8], [["Keep the Prize Tent", "desk", ["Unpack the new toys", "Count the gold stars traded", "Hand out the prizes", "Tidy the shelves"]]]],
[5711, "Groundskeeper", 10, 2, true, true, [8, 8], [["Keep the grounds of Wonderglen", "station", ["Water the giant flowers", "Sweep the paths", "Fluff the clouds at the Cloud Bounce", "Trim the Flower Maze"]]]],
[5712, "Zookeeper", 11, 4, true, true, [8, 8], [["Care for the animals of Wonderglen Zoo", "station", ["Fill the water troughs", "Bring the lions and tigers their dinner", "Wash the elephants with the big hose", "Answer the children's questions at the signs"]]]],
[5713, "Zoo train driver", 10, 1, true, false, [9, 8], [["Drive the Zoo Express", "station", ["Check the little engine", "Ring the bell at the station", "Drive a loop of the zoo", "Help the riders off"]]]],
[5714, "Ringmaster", 13, 1, false, false, [11, 8], [["Run the Starlight Big Top", "desk", ["Check the trapezes and the safety net", "Warm up the performers", "Welcome the audience", "Introduce every act"]]]],
[5715, "Circus performer", 11, 8, true, false, [11, 8], [["Perform at the Starlight Big Top", "station", ["Stretch and warm up", "Practise your act", "Perform in the show", "Take a bow"]]]]
];
var KZ = { base: -820000, G: null, built: false, t: 0, solids: [], plats: [], spots: [], talk: [], rooms: [], people: [], critters: [], ins: {}, spin: [], bob: [], glows: [],
bubbles: [], game: null, ride: null, lift: null, onPlat: null, lit: [], tune: null, shrooms: [], lanterns: [], pads: [], fed: {}, doorsSeen: {},
st: null, stAt: 0, stBusy: false, busy: false, near: null, told: {}, sparkle: null, flies: null, wand: null, homeDoor: null, water: -0.6, pt: 0, rule: null };
var KZ_LITE = (typeof LITE !== "undefined" && LITE);
function kzRaw(x, z) { return __ZC(342, 0, this, arguments, new.target); }
function kzHeight0(x, z) { return __ZC(342, 1, this, arguments, new.target); }
function kzPondTop() { var p = KZ_SITE.pond; if (p[5] === undefined)
p[5] = kzRaw(p.x, p.z); return KZ_SITES.filter(function (s) { return s[0] === "pond"; })[0][5] - 0.45; }
var KZ_HC = {};
function kzHeight(x, z) { return kzHeight0(x, z); }
function kzSiteY(k) { var s = KZ_SITE[k]; return kzHeight(s.x, s.z); }
function kzSiteAt(x, z) { var best = null, bd = 1e9; KZ_SITES.forEach(function (s) { var d = Math.hypot(x - s[1], z - s[2]); if (d < s[3] + 10 && d < bd) {
bd = d;
best = s;
} }); return best ? best[4] : null; }
function kzPlat(o) { KZ.plats.push(o); return o; }
function kzInPlat(p, x, z, pad) { return __ZC(342, 2, this, arguments, new.target); }
function kzPlatAt(x, z, feet) {
var best = null;
for (var i = 0; i < KZ.plats.length; i++) {
var p = KZ.plats[i];
if (p.off)
continue;
var top = typeof p.top === "function" ? p.top() : p.top;
if (top > feet + 0.62)
continue;
if (!kzInPlat(p, x, z))
continue;
if (!best || top > best.t)
best = { p: p, t: top };
}
return best;
}
function kzGround(x, z, feet) {
var h = kzHeight(x, z);
if (feet === undefined)
feet = h;
var b = kzPlatAt(x, z, feet);
return b && b.t > h ? b.t : h;
}
function kzBlock(x, z, feet) { return __ZC(342, 3, this, arguments, new.target); }
var KZ_MAT = {};
function kzM(col, o) { var k = col + ":" + (o ? JSON.stringify(o) : ""); if (KZ_MAT[k])
return KZ_MAT[k]; return (KZ_MAT[k] = wM(col, o)); }
function kzBasic(col, o) { var k = "b" + col + ":" + (o ? JSON.stringify(o) : ""); if (KZ_MAT[k])
return KZ_MAT[k]; return (KZ_MAT[k] = wB(col, o)); }
function kzGlowM(col, ei) { return kzM(col, { e: col, ei: ei === undefined ? 0.35 : ei }); }
function kzMerge(list) { return __ZC(342, 4, this, arguments, new.target); }
function kzBake(root) { return __ZC(342, 5, this, arguments, new.target); }
var KZ_IGEO = {};
function kzIGeo(kind) { return __ZC(342, 6, this, arguments, new.target); }
function kzI(kind, x, y, z, sx, sy, sz, ry, col, rz) {
var L = KZ.ins[kind] || (KZ.ins[kind] = { list: [], mesh: null });
L.list.push([x, y, z, sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz, ry || 0, col === undefined ? 0xFFFFFF : col, rz || 0]);
return L.list.length - 1;
}
function kzIBuild(G) { return __ZC(342, 7, this, arguments, new.target); }
function kzAt(G, x, z, rot, y) { var g = new THREE.Group(); g.position.set(x, y === undefined ? kzHeight(x, z) : y, z); g.rotation.y = rot || 0; G.add(g); return g; }
function kzFace(x, z, tx, tz) { return Math.atan2(tx - x, tz - z); }
function kzSolidIn(g, lx, lz, hw, hd, h) { var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y); KZ.solids.push({ x: g.position.x + lx * c + lz * s, z: g.position.z - lx * s + lz * c, hw: hw, hd: hd, rot: g.rotation.y, h: h }); }
function kzRingIn(g, lx, lz, r, h) { var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y); KZ.solids.push({ x: g.position.x + lx * c + lz * s, z: g.position.z - lx * s + lz * c, r: r, h: h }); }
function kzLocal(g, lx, lz) { var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y); return { x: g.position.x + lx * c + lz * s, z: g.position.z - lx * s + lz * c }; }
function kzSpot(x, z, r, name, verb, fn, o) { var s = Object.assign({ x: x, z: z, r: r, name: name, verb: verb, fn: fn }, o || {}); KZ.spots.push(s); return s; }
function kzRoom(name, x, z, hw, hd, rot, badge) { KZ.rooms.push({ name: name, x: x, z: z, hw: hw, hd: hd, rot: rot || 0, badge: !!badge }); }
function kzInRect(r, x, z, pad) { var dx = x - r.x, dz = z - r.z, c = Math.cos(r.rot || 0), s = Math.sin(r.rot || 0), lx = dx * c - dz * s, lz = dx * s + dz * c; pad = pad || 0; return Math.abs(lx) <= r.hw + pad && Math.abs(lz) <= r.hd + pad; }
function kzRoomAt(x, z) { for (var i = 0; i < KZ.rooms.length; i++)
if (kzInRect(KZ.rooms[i], x, z))
return KZ.rooms[i]; return null; }
function kzSign(G, x, z, rot, lines, w, h, bg, fg, y) { return __ZC(342, 8, this, arguments, new.target); }
function kzTwoSided(lines, w, h, bg, fg) {
var s = wSign(lines, w, h, bg, fg);
s.material.side = THREE.FrontSide;
var b = new THREE.Mesh(s.geometry, s.material);
b.rotation.y = Math.PI;
b.position.z = -0.012;
s.add(b);
return s;
}
function kzEnv() {
var t = KZ.t * 0.02;
var low = new THREE.Color(0xFFE2EC).lerp(new THREE.Color(0xFFF0D0), 0.5 + 0.5 * Math.sin(t));
return { top: 0x4AA8F0, low: low.getHex(), fog: 0xD8ECFF, fogD: 0.0007, sun: 0.95, sunCol: 0xFFF0D8, sunDir: [0.45, 0.75, 0.35], hemi: 0.85, hemiCol: 0xE8F0FF, hemiGround: 0x7AA05A, stars: 0 };
}
var KZ_PATHS = [
[[0, 232], [0, 180], [0, 120], [0, 78]],
[[0, 180], [-60, 160], [-118, 128]], [[0, 180], [60, 160], [118, 128]],
[[0, 180], [-66, 200]], [[0, 180], [72, 200]],
[[-118, 128], [-176, 124], [-226, 118]], [[-118, 128], [-160, 60], [-176, 30]],
[[118, 128], [176, 128], [226, 122]], [[118, 128], [128, 32]],
[[0, 10], [0, -74]], [[0, 10], [60, 8], [106, 10]], [[0, 10], [-60, -20], [-74, -34]], [[-74, -34], [-140, -12]],
[[0, -134], [0, -220]], [[0, -134], [-70, -150], [-90, -150]], [[0, -134], [60, -160], [88, -170]], [[88, -170], [138, -206]],
[[128, 10], [170, -60], [196, -80]], [[-132, -150], [-200, -152], [-232, -150]]
];
function kzSegDist(px, pz, a, b) { var dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz, t = L ? Math.max(0, Math.min(1, ((px - a[0]) * dx + (pz - a[1]) * dz) / L)) : 0; return Math.hypot(px - a[0] - dx * t, pz - a[1] - dz * t); }
function kzPathDist(x, z) { var best = 1e9; KZ_PATHS.forEach(function (p) { for (var i = 1; i < p.length; i++) {
var d = kzSegDist(x, z, p[i - 1], p[i]);
if (d < best)
best = d;
} }); return best; }
function kzBuildGround(G) { return __ZC(342, 9, this, arguments, new.target); }
var KZ_CAPS = [0xE8505A, 0xE07AC0, 0x9A6AD8, 0x4AB8C8, 0xF0A040, 0x60B860];
function kzMushroom(G, x, z, s, col, o) { return __ZC(342, 10, this, arguments, new.target); }
var KZ_PETALS = [0xF07AA8, 0xF0C848, 0xA87AF0, 0xF08A5A, 0x6AC0F0, 0xF0F0F8, 0xE85A6A];
function kzFlower(G, x, z, s, col, mid) { return __ZC(342, 11, this, arguments, new.target); }
function kzTree(G, x, z, s, col) { return __ZC(342, 12, this, arguments, new.target); }
function kzRainbow(G, x, z, rot, span) { return __ZC(342, 13, this, arguments, new.target); }
function kzSparkles(G) { return __ZC(342, 14, this, arguments, new.target); }
function kzSparkleTick(dt) { return __ZC(342, 15, this, arguments, new.target); }
function kzSkyDome(G) { return __ZC(342, 16, this, arguments, new.target); }
function kzSkyLanterns(G) { return __ZC(342, 17, this, arguments, new.target); }
function kzScenery(G) { return __ZC(342, 18, this, arguments, new.target); }
var KZ_DRESS = { welcome: [0xB89AE8, 0x6A5AA0], story: [0x8AA870, 0x5A6A4A], tuck: [0xF0A040, 0x7A4A2A], pond: [0x5AA0C8, 0x3A5A7A], carousel: [0xE85A6A, 0x2A2A4A], critters: [0x9AC070, 0x6A5A3A],
maze: [0x8A6A4A, 0x4A3A2A], paint: [0xE070B8, 0x4A3A6A], lanterns: [0x5A62D0, 0x2A2A4A], prizes: [0xF0D040, 0x8A5AC0], clouds: [0xE8F0FF, 0xA8C8F0], school: [0x4A8AC8, 0x3A3A4A], head: [0x3A9A5A, 0x2A3A2A], zoo: [0xC8A060, 0x5A4A2A], circus: [0xD8283A, 0x1A1A2A] };
function kzFolkAt(f, x, z, rot, o) { return __ZC(342, 19, this, arguments, new.target); }
function kzFolk(key) { for (var i = 0; i < KZ_FOLK.length; i++)
if (KZ_FOLK[i][0] === key)
return KZ_FOLK[i]; return null; }
function kzChildren(G) { return __ZC(342, 20, this, arguments, new.target); }
function kzHouse(G, x, z, rot, r, capCol, name, o) { return __ZC(342, 21, this, arguments, new.target); }
function kzStaffOnly() {
if (typeof amKeeper === "function" && amKeeper())
return true;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { return +j.job_id >= 5700 && +j.job_id <= 5719 || j.workplace === KZ_KEY; });
}
function kzDoorHome(G) { return __ZC(342, 22, this, arguments, new.target); }
function kzStripedToadstool(g, s) { return __ZC(342, 23, this, arguments, new.target); }
function kzWelcome(G) { return __ZC(342, 24, this, arguments, new.target); }
function kzLodges(G) { return __ZC(342, 25, this, arguments, new.target); }
function kzSchool(G) { return __ZC(342, 26, this, arguments, new.target); }
function kzFact(site, x, z) { return __ZC(342, 27, this, arguments, new.target); }
var KZ_BUBBLE_GEO = null, KZ_BUBBLE_MAT = null;
function kzBubbleMats() { return __ZC(342, 28, this, arguments, new.target); }
function kzBubble(x, y, z, o) { return __ZC(342, 29, this, arguments, new.target); }
function kzBubblesTick(dt, L) { return __ZC(342, 30, this, arguments, new.target); }
function kzBubbleMeadow(G) { return __ZC(342, 31, this, arguments, new.target); }
var KZ_GAME_NAME = { bubbles: "Bubble Catch", tune: "the Singing Mushrooms' tune", pads: "the Lily-Pad Hop", toss: "the Ring Toss" };
function kzSayGame() {
var G = KZ.game;
if (!G)
return;
setStatus("You are playing <b>" + (KZ_GAME_NAME[G.k] || "a game") + "</b> just now" + (G.t > 0 ? " (" + Math.ceil(G.t) + " seconds left)" : "") + ". Finish it first, then try this one.");
}
function kzBubbleGame() { return __ZC(342, 32, this, arguments, new.target); }
function kzSingingMushrooms(G) { return __ZC(342, 33, this, arguments, new.target); }
function kzSing(i) { var M = KZ.shrooms[i]; if (!M)
return; M.glow = 1; if (typeof playTone === "function")
playTone(M.f, 0.7); }
function kzTuneGame() { return __ZC(342, 34, this, arguments, new.target); }
function kzTuneTick(dt, L) { return __ZC(342, 35, this, arguments, new.target); }
function kzTuneStep(i) { return __ZC(342, 36, this, arguments, new.target); }
function kzLilyPond(G) { return __ZC(342, 37, this, arguments, new.target); }
function kzPadsTick(dt, L) { return __ZC(342, 38, this, arguments, new.target); }
var KZ_DECK = 12;
function kzTreehouse(G) { return __ZC(342, 39, this, arguments, new.target); }
function kzSlideMesh(G, curve) { return __ZC(342, 40, this, arguments, new.target); }
function kzLift(up) {
if (KZ.ride)
return;
var A = KZ.liftAt;
worldCard(null);
KZ.ride = { k: "lift", t: 0, d: 4, up: up, from: up ? A.y0 : A.y1, to: up ? A.y1 : A.y0 };
if (typeof playTone === "function")
playTone(up ? 440 : 330, 0.6);
}
function kzRide(k) { return __ZC(342, 41, this, arguments, new.target); }
function kzRideTick(dt) { return __ZC(342, 42, this, arguments, new.target); }
function kzCarousel(G) { return __ZC(342, 43, this, arguments, new.target); }
function kzSeatPos(S) { var C = KZ.carousel, a = S.a - C.ang, y = C.y + 0.5 + S.hold.position.y + 1.25; return { x: C.x + Math.cos(a) * S.r, z: C.z + Math.sin(a) * S.r, y: y }; }
function kzCarouselTick(dt) { var C = KZ.carousel; if (!C)
return; C.ang += dt * C.sp; C.spin.rotation.y = C.ang; C.seats.forEach(function (S) { S.hold.position.y = 0.55 + Math.sin(KZ.t * 1.6 + S.ph) * 0.35; }); }
function kzClouds(G) { return __ZC(342, 44, this, arguments, new.target); }
function kzCloudsTick(dt, L) { return __ZC(342, 45, this, arguments, new.target); }
function kzMaze(G) { return __ZC(342, 46, this, arguments, new.target); }
function kzStory(G) { return __ZC(342, 47, this, arguments, new.target); }
var KZ_WALL_COLS = [[0xE8504A, "red"], [0xF0903A, "orange"], [0xF0D040, "yellow"], [0x60C058, "green"], [0x48A8E0, "blue"], [0x9A5AD0, "purple"], [0xF07AA8, "pink"], [0x8A5A3A, "brown"], [0xFFFFFF, "white"]];
function kzWallShapes() { return __ZC(342, 48, this, arguments, new.target); }
function kzColourWall(G) { return __ZC(342, 49, this, arguments, new.target); }
var KZ_RAY = null;
function kzWallAim() { return __ZC(342, 50, this, arguments, new.target); }
function kzWallPaint(r) { return __ZC(342, 51, this, arguments, new.target); }
var KZ_CRITTERS = [["rabbit", "a bunny", 1, 5], ["sheep", "a lamb", 0.62, 3], ["goat", "a kid goat", 0.62, 2], ["chicken", "a hen", 1, 3], ["turtle", "a tortoise", 0.9, 1], ["fox", "a fox cub", 0.75, 1], ["unicorn", "a moonfoal", 0.5, 2], ["owl", "an owl", 0.9, 1]];
function kzCritterCorner(G) { return __ZC(342, 52, this, arguments, new.target); }
function kzFeed(C) { return __ZC(342, 53, this, arguments, new.target); }
function kzHeart(g) { var h = wGlow(0xF07AA8, 1.4, 0.6); h.position.set(g.position.x, g.position.y + 1.4, g.position.z); h.userData.keep = 1; KZ.G.add(h); KZ.glows.push({ o: h, t: 0, d: 1.8, rise: 1.2 }); }
function kzLanternHill(G) { return __ZC(342, 54, this, arguments, new.target); }
function kzLight(L) { return __ZC(342, 55, this, arguments, new.target); }
function kzLanternTick(dt) { return __ZC(342, 56, this, arguments, new.target); }
function kzgTex(name, rep, nrm) { return __ZC(342, 57, this, arguments, new.target); }
function kzgMat(key, name, rep, col, o) { return __ZC(342, 58, this, arguments, new.target); }
function kzgLump(x, y, z, sd) { return Math.sin(x * 2.3 + sd) * Math.cos(z * 2.1 - sd * 0.7) * 0.5 + Math.sin(y * 3.1 + x * 1.7 + sd * 1.9) * 0.3 + Math.sin((x - z) * 5.3 + y * 2.9 + sd * 3.3) * 0.16 + Math.sin((x + y) * 9.1 - z * 7.3 + sd) * 0.06; }
var KZG = { R: 14, mouth: 0.46, pool: { x: -3, z: 0, r: 4.2 } };
function kzgSink(x, z) { var s = KZ_SITE.grotto; if (!s)
return 0; var d = Math.hypot(x - s.x - KZG.pool.x, z - s.z - KZG.pool.z); return d < KZG.R - 3.5 ? -22 : 0; }
function kzgInMouth(x, y, z) { var th = Math.atan2(z, x); if (Math.abs(th) > KZG.mouth)
return false; return y < 0.6 + 3.6 * Math.cos(th / KZG.mouth * Math.PI / 2); }
function kzgShell(r, amp, inner, seg) { return __ZC(342, 59, this, arguments, new.target); }
function kzgRockGeo(seed, det) { return __ZC(342, 60, this, arguments, new.target); }
function kzgDrip(down) {
var pts = [], n = 9;
for (var i = 0; i <= n; i++) {
var t = i / n, r = 0.18 * Math.pow(1 - t, 1.35) + 0.006 + 0.02 * Math.sin(t * 19) * (1 - t);
pts.push(new THREE.Vector2(r, (down ? -1 : 1) * t));
}
if (!down)
pts.reverse();
return new THREE.LatheGeometry(pts, KZ_LITE ? 6 : 9);
}
function kzgGlowTex() { return __ZC(342, 61, this, arguments, new.target); }
function kzgFernTex() { return __ZC(342, 62, this, arguments, new.target); }
function kzgRoofPt(R, r, ymin) {
var d = new THREE.Vector3();
d.set(R() * 2 - 1, ymin + R() * (1 - ymin), R() * 2 - 1).normalize();
var n = kzgLump(d.x * 3, d.y * 3, d.z * 3, 1.3), low = Math.min(1, d.y * 4), rr = r - 1.6 * (0.55 + 0.45 * n) * (0.35 + 0.65 * low);
return new THREE.Vector3(d.x * rr * 0.985, d.y * rr * 0.74 * 0.985, d.z * rr * 0.985);
}
function kzGrotto(G) { return __ZC(342, 63, this, arguments, new.target); }
function kzPavilion(G) { return __ZC(342, 64, this, arguments, new.target); }
function kzFairyDoors(G) { return __ZC(342, 65, this, arguments, new.target); }
function kzFairyFound(F) { return __ZC(342, 66, this, arguments, new.target); }
var KZ_FINDS = [["kz_clover", "critters", 7, 24], ["kz_clover", "bubbles", 3, 30], ["kz_pebble", "welcome", 3, 30], ["kz_pebble", "pond", 4, 40], ["kz_pebble", "maze", 3, 30],
["kz_feather", "tree", 4, 16], ["kz_feather", "clouds", 3, 14], ["kz_feather", "lanterns", 2, 20], ["kz_petal", "paint", 4, 22], ["kz_petal", "bubbles", 3, 26], ["kz_petal", "story", 3, 22],
["kz_shell", "pond", 6, 38], ["kz_sparkle", "grotto", 5, 9]];
function kzFindSpots(G) { return __ZC(342, 67, this, arguments, new.target); }
function kzFindLook(g, k, R) { return __ZC(342, 68, this, arguments, new.target); }
function kzPlaces(G) { return __ZC(342, 69, this, arguments, new.target); }
var KZ_PENS = [
["lion", "Lion Kopje", 3, "kopje", "Keeper Amara", "A lion's roar can be heard eight kilometres away, and lions rest for up to twenty hours a day. A family of lions is called a pride.", "What is a family of lions called?", ["A pride", "A pack", "A flock"]],
["giraffe", "Giraffe Plains", 3, "savanna", "Keeper Tobias", "A giraffe's tongue is dark blue-purple and about half a metre long, so it can pull leaves off thorny trees. Giraffes are the tallest animals on Earth.", "What colour is a giraffe's tongue?", ["Dark blue-purple", "Bright green", "Orange"]],
["zebra", "Zebra Grassland", 4, "grass", "Keeper Nia", "Every zebra's stripes are different, like a fingerprint. A foal learns its mother's stripes so it can find her in the herd.", "How does a zebra foal find its mother?", ["It learns her stripes", "By her hat", "By her colour: she is blue"]],
["elephant", "Elephant Valley", 3, "valley", "Keeper Ravi", "An elephant's trunk has about forty thousand muscles. Elephants say hello by touching trunks, and they spray water over their backs to keep cool.", "How do elephants say hello?", ["They touch trunks", "They wave their tails", "They whistle"]],
["hippo", "Hippo River", 2, "river", "Keeper Bea", "Hippos spend most of the day in water to keep cool, with only their eyes, ears and nostrils showing. They can hold their breath for five minutes.", "Why do hippos stay in the water all day?", ["To keep cool", "To catch fish", "To brush their teeth"]],
["penguin", "Penguin Cove", 8, "ice", "Keeper Finn", "King penguins can't fly in the air, but they 'fly' underwater with their flippers, and can dive deeper than three hundred metres to catch fish.", "How do penguins use their flippers?", ["To swim underwater", "To fly in the sky", "To dig holes"]],
["flamingo", "Flamingo Lagoon", 10, "lagoon", "Keeper Rosa", "Flamingos are pink because of the tiny pink shrimps and plants they eat. They often rest standing on one leg.", "Why are flamingos pink?", ["Because of the food they eat", "They are painted", "They blush"]],
["bear", "Bear Woods", 2, "woods", "Keeper Hugo", "A bear's nose is better at smelling than a dog's. In autumn bears eat and eat, then sleep through the winter in a den.", "What do bears do in the winter?", ["Sleep in a den", "Go to the beach", "Fly south"]],
["tiger", "Tiger Jungle", 2, "jungle", "Keeper Mei", "No two tigers have the same stripes. Unlike most cats, tigers love water and are very good swimmers.", "What do tigers like that most cats don't?", ["Swimming in water", "Eating cake", "Climbing ladders"]],
["kangaroo", "Kangaroo Outback", 3, "outback", "Keeper Jack", "A kangaroo can hop at fifty kilometres an hour, and uses its strong tail like a fifth leg. A baby kangaroo, a joey, lives in its mother's pouch.", "What is a baby kangaroo called?", ["A joey", "A kitten", "A cub"]]
];
var KZ_ZOO_NEED = 10;
var KZ_ZOO_R = { aviary: 8.5, plaza: 22, track: 27, fence: 30.5, walk0: 33, walk1: 39, apron: 45.5, pen: 62, penR: 16, hedge: 84, gate: 90 };
function kzZooHub() { return KZ_SITE.zoo; }
function kzZooGateAng() { var Z = kzZooHub(); return Math.atan2(-66 - Z.x, 206 - Z.z); }
function kzZooAt(a, r) { var Z = kzZooHub(); return { x: Z.x + Math.sin(a) * r, z: Z.z + Math.cos(a) * r }; }
function kzZooPenAng(i) { return kzZooGateAng() + (i + 1) * Math.PI * 2 / (KZ_PENS.length + 1); }
(function () {
KZ_SITES.forEach(function (s) { if (s[0] === "zoo")
s[3] = 94; });
if (KZ_SITE.zoo)
KZ_SITE.zoo.r = 94;
var Z = { x: -210, z: 320 }, ga = Math.atan2(-66 - Z.x, 206 - Z.z);
KZ_PATHS.push([[-66, 206], [-108, 236], [Z.x + Math.sin(ga) * (KZ_ZOO_R.gate + 12), Z.z + Math.cos(ga) * (KZ_ZOO_R.gate + 12)]]);
})();
function kzZooWater(col) {
var k = "zw" + (col || 0);
if (KZ_MAT[k])
return KZ_MAT[k];
var m = new THREE.MeshPhongMaterial({ color: col || 0x2E8AA8, shininess: 110, specular: 0x8AA8B8, transparent: true, opacity: 0.9 });
m.userData.realWater = 1;
return (KZ_MAT[k] = m);
}
function kzZooStone() { return kzM(0xD8C8A8); }
function kzZooRing(G, r0, r1, a0, len, mat, y, seg) {
var Z = kzZooHub(), g = new THREE.RingGeometry(r0, r1, seg || Math.max(16, Math.round(len * r1 / 2)), 2, 0, len);
var m = new THREE.Mesh(g, mat);
m.rotation.x = -Math.PI / 2;
m.rotation.z = a0 - Math.PI / 2;
m.position.set(Z.x, kzHeight(Z.x, Z.z) + (y || 0.04), Z.z);
m.receiveShadow = true;
G.add(m);
return m;
}
function kzZoo(G) { return __ZC(342, 70, this, arguments, new.target); }
function kzZooGap(a) { var ga = kzZooGateAng(), d = Math.atan2(Math.sin(a - ga), Math.cos(a - ga)); return Math.abs(d) < 0.16 || (d > 0.2 && d < 0.62); }
function kzZooFenceArcs() {
var out = [], ga = kzZooGateAng(), N = 360, run = null;
for (var i = 0; i <= N; i++) {
var a = ga + i / N * Math.PI * 2, gap = kzZooGap(a) || i === N;
if (!gap && run === null)
run = a;
if (gap && run !== null) {
out.push([run, a - run]);
run = null;
}
}
return out;
}
function kzZooBlock(x, z, feet) { return __ZC(342, 71, this, arguments, new.target); }
function kzZooPen(ZG, AG, i, a) { return __ZC(342, 72, this, arguments, new.target); }
function kzZooHouse(g, hab, R, r) { return __ZC(342, 73, this, arguments, new.target); }
function kzZooTree(x, z, kind, s, R) { return __ZC(342, 74, this, arguments, new.target); }
function kzZooBench(g) { return __ZC(342, 75, this, arguments, new.target); }
function kzZooKeeper(pen, x, z, rot) { return __ZC(342, 76, this, arguments, new.target); }
function kzZooDeck(ZG, pen) { return __ZC(342, 77, this, arguments, new.target); }
function kzZooFeedGiraffe() { return __ZC(342, 78, this, arguments, new.target); }
function kzZooFeedTick(dt) { return __ZC(342, 79, this, arguments, new.target); }
function kzZooCard(pen) { return __ZC(342, 80, this, arguments, new.target); }
function kzZooPromenade(ZG, R) { return __ZC(342, 81, this, arguments, new.target); }
function kzZooPlaza(ZG, R) { return __ZC(342, 82, this, arguments, new.target); }
function kzZooMapCard() { return __ZC(342, 83, this, arguments, new.target); }
function kzZooGate(ZG) { return __ZC(342, 84, this, arguments, new.target); }
function kzZooHedge(ZG, R) {
var Z = kzZooHub(), y = kzHeight(Z.x, Z.z), ga = kzZooGateAng(), N = Math.round(Math.PI * 2 * KZ_ZOO_R.hedge / 1.6);
for (var i = 0; i < N; i++) {
var a = ga + 0.07 + i / N * (Math.PI * 2 - 0.14), p = kzZooAt(a, KZ_ZOO_R.hedge);
kzI("ball", p.x, y + 0.9, p.z, 2.2, 1.9, 2.2, R() * 6, i % 9 ? 0x3E7E34 : 0x467E38);
}
}
function kzZooWalkers(ZG, R) { return __ZC(342, 85, this, arguments, new.target); }
function kzZooWalkerPlace(W, dt) { return __ZC(342, 86, this, arguments, new.target); }
function kzZooAviary(ZG) { return __ZC(342, 87, this, arguments, new.target); }
var KZ_FEEDS = [[5, "penguin", "🐟 <b>Penguin feeding time</b> at Penguin Cove! Keeper Finn throws the fish and the penguins dive in."],
[3, "elephant", "🐘 <b>Elephant bath time</b> at Elephant Valley! Keeper Ravi turns on the big hose."],
[0, "lion", "🦁 <b>The lions' dinner</b> at the Lion Kopje: Keeper Amara hides their food among the rocks."],
[7, "bear", "🐻 <b>Bear snack time</b> in the Bear Woods: Keeper Hugo scatters berries and fish by the stream."],
[4, "hippo", "🦛 <b>Hippo breakfast</b> at Hippo River: a whole bale of grass, and big yawns."],
[9, "kangaroo", "🦘 <b>Kangaroo lunch</b> in the Outback: Keeper Jack fills the hay rack."]];
function kzZooFeedNow() { var t = Date.now() / 1000, slot = Math.floor(t / 120), into = t - slot * 120; return { F: KZ_FEEDS[slot % KZ_FEEDS.length], into: into, slot: slot }; }
function kzZooFeedingTick(dt, L) { return __ZC(342, 88, this, arguments, new.target); }
var KZ_TRAIN = { wait: 14, v: 3.0, ta: 7, eye: 1.95, seat: -1 };
function kzZooTrainLen() { return Math.PI * 2 * KZ_ZOO_R.track; }
function kzZooTrainRun() { return kzZooTrainLen() / KZ_TRAIN.v + KZ_TRAIN.ta; }
function kzZooTrainS(t) {
var L = kzZooTrainLen(), v = KZ_TRAIN.v, ta = KZ_TRAIN.ta, T = kzZooTrainRun();
if (t <= 0)
return 0;
if (t >= T)
return L;
function ease(u) { return u * u * u - u * u * u * u / 2; }
if (t < ta)
return v * ta * ease(t / ta);
if (t > T - ta)
return L - v * ta * ease((T - t) / ta);
return v * ta / 2 + v * (t - ta);
}
function kzZooTrainSpeed(t) { var v = KZ_TRAIN.v, ta = KZ_TRAIN.ta, T = kzZooTrainRun(); function sm(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); } if (t <= 0 || t >= T)
return 0; return v * Math.min(sm(t / ta), sm((T - t) / ta)); }
function kzZooTrainAt(s, off) {
var r = KZ_ZOO_R.track + (off || 0), a0 = kzZooTrainA0(), a = a0 - s / KZ_ZOO_R.track, Z = kzZooHub();
return { x: Z.x + Math.sin(a) * r, z: Z.z + Math.cos(a) * r, a: a, dir: a - Math.PI / 2 };
}
function kzZooTrainA0() { return kzZooGateAng() + 0.41; }
function kzZooTrain(ZG) { return __ZC(342, 89, this, arguments, new.target); }
function kzZooEngine(cg) { return __ZC(342, 90, this, arguments, new.target); }
function kzZooTrainPlace(T, dt) { return __ZC(342, 91, this, arguments, new.target); }
var KZ_PUFF_GEO = null;
function kzZooTick(dt) { return __ZC(342, 92, this, arguments, new.target); }
function kzZooTrainBoard() { return __ZC(342, 93, this, arguments, new.target); }
function kzZooTrainSeat(T) { var L = kzZooTrainLen(), s = ((T.s - 1 * 3.6 + 0.2) % L + L) % L, p = kzZooTrainAt(s, KZ_TRAIN.seat * 0.4); return { x: p.x, z: p.z, y: T.y + KZ_TRAIN.eye, dir: p.dir, s: s, a: p.a }; }
function kzZooTrainRideTick(dt) { return __ZC(342, 94, this, arguments, new.target); }
KZ_PATHS.push([[146, 10], [250, 6], [322, 0]]);
var KZ_TENT = { r: 22, h: 6, cyc: 80 };
function kzCircusHub() { return KZ_SITE.circus; }
function kzStripeTex(cols, n, horizontal) { return __ZC(342, 95, this, arguments, new.target); }
function kzCircus(G) { return __ZC(342, 96, this, arguments, new.target); }
function kzPerformer(g, seed, top, bottom, o) { return __ZC(342, 97, this, arguments, new.target); }
function kzCircusFolk(g) { return __ZC(342, 98, this, arguments, new.target); }
var KZ_ACTS = [[0, 6, "intro", "🎩 <b>Ladies and gentlemen, boys and girls!</b> Welcome to the Starlight Big Top! Drum roll, please…"],
[6, 26, "trapeze", "🤸 <b>The Flying Starlings!</b> High on the trapeze, over the safety net. Watch them fly from bar to bar!"],
[26, 42, "juggle", "🤹 <b>Juggling Jasper and Ruby on the unicycle!</b> Five balls in the air, and once round the ring on one wheel."],
[42, 58, "clowns", "🤡 <b>Here come the clowns!</b> How many can fit in one tiny car?"],
[58, 70, "finale", "🎪 <b>The grand parade!</b> Everyone take a bow. Thank you for coming to the Starlight Big Top!"],
[70, 80, "rest", "The performers are resting. The next show starts in a few moments; find a seat!"]];
function kzShowAt(t) { var s = t % KZ_TENT.cyc; for (var i = 0; i < KZ_ACTS.length; i++)
if (s >= KZ_ACTS[i][0] && s < KZ_ACTS[i][1])
return { i: i, a: KZ_ACTS[i], u: (s - KZ_ACTS[i][0]) / (KZ_ACTS[i][1] - KZ_ACTS[i][0]), s: s, n: Math.floor(t / KZ_TENT.cyc) }; return { i: 5, a: KZ_ACTS[5], u: 0, s: s, n: 0 }; }
function kzCircusPose(act, u, s) { return __ZC(342, 99, this, arguments, new.target); }
function kzCircusTick(dt, L) { return __ZC(342, 100, this, arguments, new.target); }
function kzTalkPos(T) { var g = T.p.g; if (g.parent && g.parent !== KZ.G) {
var v = new THREE.Vector3();
g.getWorldPosition(v);
return { x: v.x - KZ.G.position.x, z: v.z - KZ.G.position.z };
} return { x: g.position.x, z: g.position.z }; }
function kzRingToss(G) { return __ZC(342, 101, this, arguments, new.target); }
function kzToss() { return __ZC(342, 102, this, arguments, new.target); }
function kzTossTick(dt) { return __ZC(342, 103, this, arguments, new.target); }
function kzSnackCart(G) { return __ZC(342, 104, this, arguments, new.target); }
function kzSnackCard(msg) { return __ZC(342, 105, this, arguments, new.target); }
function kzBalloons(G, x, z, n, seed) { return __ZC(342, 106, this, arguments, new.target); }
function kzFestoon(G) { return __ZC(342, 107, this, arguments, new.target); }
var KZP = { el: null, body: null, title: null, open: false, kind: null, onClose: null };
function kzPanel(title, html, onClose) { return __ZC(342, 108, this, arguments, new.target); }
function kzPanelClose() { if (!KZP.el)
return; KZP.el.style.display = "none"; KZP.open = false; var f = KZP.onClose; KZP.onClose = null; if (f)
try {
f();
}
catch (e) { } }
function kzBigBtn(id, label, sub, col, big) { return __ZC(342, 109, this, arguments, new.target); }
function kzBind(root, fns) { root.querySelectorAll("[data-kz]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); var f = fns[b.getAttribute("data-kz")]; if (f)
f(b); }; }); }
function kzShuffle(a, R) { R = R || Math.random; for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
var KZ_PALETTE = ["#E8504A", "#F07A5A", "#F0903A", "#F4B840", "#F0D040", "#F8F08A", "#A8D860", "#60C058", "#2E9A5A", "#7AD8C8", "#48A8E0", "#2E6AC8", "#5A62D0", "#9A5AD0", "#C88AE8", "#F07AA8", "#F8B8D0", "#C8885A", "#8A5A3A", "#5A3A2A", "#B8B8C0", "#6A6A78", "#2A2A34", "#FFFFFF"];
var KZ_DRAW = {
toadstool: function (c) { return __ZC(342, 110, this, arguments, new.target); },
moonfoal: function (c) { return __ZC(342, 111, this, arguments, new.target); },
carousel: function (c) { return __ZC(342, 112, this, arguments, new.target); },
treehouse: function (c) { return __ZC(342, 113, this, arguments, new.target); },
mushrooms: function (c) { return __ZC(342, 114, this, arguments, new.target); },
nimbus: function (c) { return __ZC(342, 115, this, arguments, new.target); },
bubbles: function (c) { return __ZC(342, 116, this, arguments, new.target); },
frog: function (c) { return __ZC(342, 117, this, arguments, new.target); },
lanterns: function (c) { return __ZC(342, 118, this, arguments, new.target); },
dragon: function (c) { return __ZC(342, 119, this, arguments, new.target); },
fairydoor: function (c) { return __ZC(342, 120, this, arguments, new.target); },
bus: function (c) { return __ZC(342, 121, this, arguments, new.target); }
};
function kzS(c) { c.stroke(); }
function kzStar(c, x, y, r) { c.beginPath(); for (var i = 0; i < 10; i++) {
var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
if (!i)
c.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
else
c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
} c.closePath(); c.stroke(); }
function kzNote(c, x, y) { c.beginPath(); c.ellipse(x, y + 60, 22, 16, -0.4, 0, 7); c.stroke(); c.beginPath(); c.rect(x + 16, y - 20, 6, 80); c.stroke(); c.beginPath(); c.moveTo(x + 22, y - 20); c.quadraticCurveTo(x + 60, y, x + 50, y + 30); c.stroke(); }
function kzPageLines(key, cv) {
var c = cv.getContext("2d");
c.fillStyle = "#FFFFFF";
c.fillRect(0, 0, cv.width, cv.height);
c.save();
c.scale(cv.width / 1024, cv.height / 768);
c.strokeStyle = "#22202A";
c.lineWidth = 7;
c.lineJoin = "round";
c.lineCap = "round";
try {
c.beginPath();
KZ_DRAW[key](c);
}
catch (e) { }
c.restore();
}
function kzFill(cv, x, y, hex) { return __ZC(342, 122, this, arguments, new.target); }
function kzPageSaved(key) { var s = kzLocalGet("page:" + key); return typeof s === "string" && s.indexOf("data:image") === 0 ? s : null; }
function kzColourBook() { return __ZC(342, 123, this, arguments, new.target); }
function kzColourPage(i) { return __ZC(342, 124, this, arguments, new.target); }
function kzPuzzleMenu() { return __ZC(342, 125, this, arguments, new.target); }
function kzPuzzleLevel(k) { var lv = kzLocalGet("puzzleLevels") || {}; return lv[k] || 0; }
function kzPuzzleSolved(k, say) { return __ZC(342, 126, this, arguments, new.target); }
function kzPuzzle(k) {
({ slide: kzPzSlide, match: kzPzMatch, words: kzPzWords, sums: kzPzSums, pattern: kzPzPattern, spell: kzPzSpell }[k] || kzPuzzleMenu)();
}
function kzPzSlide() { return __ZC(342, 127, this, arguments, new.target); }
function kzPzMatch() { return __ZC(342, 128, this, arguments, new.target); }
function kzPzWords() { return __ZC(342, 129, this, arguments, new.target); }
function kzQuiz(kind, title, make) { return __ZC(342, 130, this, arguments, new.target); }
function kzRnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function kzPzSums() { return __ZC(342, 131, this, arguments, new.target); }
function kzPzPattern() { return __ZC(342, 132, this, arguments, new.target); }
function kzPzSpell() { return __ZC(342, 133, this, arguments, new.target); }
function kzSigned() { return typeof signedIn === "function" && signedIn(); }
function kzKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function kzRpc(n, a) { try {
return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline"));
}
catch (e) {
return Promise.reject(e);
} }
function kzMissing(e) { return /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function kzSaySoft(e) { return kzMissing(e) ? "The Kids Zone's prize book isn't open yet (the server still needs its update). You can still play everything." : "Something went wrong; try again in a moment."; }
function kzToday() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function kzLocalGet(k) { try {
var v = localStorage.getItem("kz:" + k);
return v ? JSON.parse(v) : null;
}
catch (e) {
return null;
} }
function kzLocalSet(k, v) { try {
localStorage.setItem("kz:" + k, JSON.stringify(v));
}
catch (e) { } }
function kzHave(kind) {
var S = (typeof standing !== "undefined" && standing && standing.stock) || (typeof BKP !== "undefined" && BKP.d && BKP.d.stock) || [];
if (KZ.stock && KZ.stock[kind] !== undefined)
return KZ.stock[kind];
var n = 0;
(S || []).forEach(function (s) { if (s.kind === kind)
n += +s.amount || 0; });
return n;
}
function kzLoad(force) { return __ZC(342, 134, this, arguments, new.target); }
function kzStickers() { var got = {}; ((KZ.st && KZ.st.stickers) || []).forEach(function (k) { got[k] = 1; }); var L = kzLocalGet("stickers") || {}; Object.keys(L).forEach(function (k) { got[k] = 1; }); return got; }
function kzMayEnter() { return __ZC(342, 135, this, arguments, new.target); }
function kzWin(key, say) { return __ZC(342, 136, this, arguments, new.target); }
function kzPuzzleWin(k, kinds, show) { return __ZC(342, 137, this, arguments, new.target); }
function kzPageMade(key, first, count) {
if (kzSigned() && first)
kzRpc("kids_page", { p_page: key }).then(function (o) { if (o && o.say)
setStatus(esc(o.say)); if (typeof loadStock === "function")
loadStock(); }).catch(function () { });
if (count >= KZ_PAGES_NEED && !kzStickers().colour)
kzWin("colour", "<b>" + count + " pages coloured!</b>");
}
function kzGather(F) { return __ZC(342, 138, this, arguments, new.target); }
function kzLine(t) { return "<div style='opacity:.85;margin:4px 0'>" + t + "</div>"; }
function kzBoardCard() { return __ZC(342, 139, this, arguments, new.target); }
function kzBookCard() { return __ZC(342, 140, this, arguments, new.target); }
function kzWayCard() { return __ZC(342, 141, this, arguments, new.target); }
function kzArrow(L) { return __ZC(342, 142, this, arguments, new.target); }
function kzTuckCard(msg) { return __ZC(342, 143, this, arguments, new.target); }
function kzTreat(k, card) { return __ZC(342, 144, this, arguments, new.target); }
function kzPrizeCard(msg) { return __ZC(342, 145, this, arguments, new.target); }
function kzPrize(k) { return __ZC(342, 146, this, arguments, new.target); }
function kzCraftCard(msg) { return __ZC(342, 147, this, arguments, new.target); }
function kzMake(k) { return __ZC(342, 148, this, arguments, new.target); }
function kzStoryCard() { return __ZC(342, 149, this, arguments, new.target); }
function kzStoryRead(i) { return __ZC(342, 150, this, arguments, new.target); }
function kzFactCard(f) { return __ZC(342, 151, this, arguments, new.target); }
function kzSchoolCard() { return __ZC(342, 152, this, arguments, new.target); }
function kzBus() { return __ZC(342, 153, this, arguments, new.target); }
function kzConfetti() { return __ZC(342, 154, this, arguments, new.target); }
function kzGlowsTick(dt) { return __ZC(342, 155, this, arguments, new.target); }
function kzWave() { return __ZC(342, 156, this, arguments, new.target); }
function kzIsMine(kind) { return /^kz_/.test(kind) && !!KZ_ITEM[kind]; }
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var D = (typeof BKP !== "undefined" && BKP.d) || {}, all = D.stock, mine = [];
if (Array.isArray(all)) {
mine = all.filter(function (s) { return (+s.amount || 0) > 0 && kzIsMine(s.kind); });
D.stock = all.filter(function (s) { return !kzIsMine(s.kind); });
}
var h;
try {
h = bh.apply(this, arguments);
}
finally {
if (Array.isArray(all))
D.stock = all;
}
if (!mine.length)
return h;
KZ.stock = {};
mine.forEach(function (s) { KZ.stock[s.kind] = +s.amount || 0; });
var order = { star: 0, wand: 1, toy: 2, page: 3, make: 4, treat: 5, find: 6 }, x = bkpHead("🧚 Kids Zone keepsakes") + "<div style='color:var(--dim);font-size:12px'>Won, found, made and coloured in the Kids Zone of Faerie. Gold stars buy toys at the Prize Tent; finds make keepsakes at the Craft Cottage.</div>";
mine.sort(function (a, b) { return (order[KZ_ITEM[a.kind].sort] || 9) - (order[KZ_ITEM[b.kind].sort] || 9); }).forEach(function (s) {
var I = KZ_ITEM[s.kind], b = "";
if (I.fd || I.dr)
b += ' <button class="btn" data-kzb="eat:' + esc(s.kind) + '">' + (I.fd ? "Eat" : "Drink") + '</button>';
if (s.kind === "kz_wonderwand")
b += ' <button class="btn" data-kzb="wave:' + esc(s.kind) + '">Wave it</button>';
if (s.kind === "kz_bubblewand")
b += ' <button class="btn" data-kzb="blow:' + esc(s.kind) + '">Blow bubbles</button>';
x += bkpRow(I.e + " " + esc(I.n) + " " + bkpDim("× " + s.amount), b || bkpDim(esc(I.note)));
});
return h + x;
};
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-kzb]") : null;
if (!b)
return;
e.stopPropagation();
var v = b.getAttribute("data-kzb").split(":"), k = v[1];
if (v[0] === "wave")
return kzWave();
if (v[0] === "blow") {
if (WLD.on === "kidszone") {
var L = worldLocal();
for (var i = 0; i < 10; i++)
kzBubble(L.x + (Math.random() - 0.5) * 2, L.y - 0.3, L.z + (Math.random() - 0.5) * 2, { c: i });
}
else
kzWave();
return;
}
if (v[0] === "eat")
kzRpc("kids_eat", { p_kind: k }).then(function (o) { if (o && o.ok !== false && typeof needsGot === "function")
try {
needsGot(o);
}
catch (x) { } setStatus(esc((o && o.say) || "")); if (typeof bkpLoad === "function")
bkpLoad(); }).catch(function (x) { setStatus(kzSaySoft(x)); });
}, true);
})();
function kzBuild(G) { return __ZC(342, 157, this, arguments, new.target); }
function kzFeet(L) { return L.y - 1.72 - (WLD.hop || 0); }
function kzTick(dt) { return __ZC(342, 158, this, arguments, new.target); }
function kzHome() { return __ZC(342, 159, this, arguments, new.target); }
if (typeof worldDef === "function")
worldDef("kidszone", {
base: KZ.base, far: 6000, ownSky: true, softBloom: true, tone: 620, bound: KZ_RIM + 25, gravity: 9.8,
env: function () { return kzEnv(); },
build: function (G) { kzBuild(G); },
enter: function (opt) { return __ZC(342, 160, this, arguments, new.target); },
leave: function () { KZ.game = null; KZ.ride = null; KZ.guide = null; if (KZ.rideView && typeof meView !== "undefined") {
meView = KZ.rideView;
KZ.rideView = null;
} if (KZ.zoo)
KZ.zoo.queued = false; if (KZP.open)
kzPanelClose(); },
ground: function (x, z, feet) { return kzGround(x, z, feet); },
block: function (x, z, feet) {
if (kzBlock(x, z, feet))
return true;
if (KZ.badge && !kzStaffOnly() && kzInRect(KZ.badge, x, z, 0.3) && feet < kzHeight(x, z) + 2)
return true;
return false;
},
tick: function (dt) { kzTick(dt); },
back: function () { if (KZ.ride)
return; kzHome(); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf("kidszone") < 0)
WLG.keys.push("kidszone");
function kidsZoneHere() { return typeof WLD !== "undefined" && WLD.on === "kidszone"; }
(function () {
if (typeof dgrLevelOf === "function") {
var lv = dgrLevelOf;
dgrLevelOf = function (id) { if (id === "kidszone")
return 0; return lv.apply(this, arguments); };
}
if (typeof onSite === "function") {
var os = onSite;
onSite = function (job) { if (typeof WLD !== "undefined" && WLD.on === "kidszone" && job && (job.workplace === KZ_KEY || (+job.job_id >= 5700 && +job.job_id <= 5719)))
return true; return os.apply(this, arguments); };
}
})();
var KZD = { at: null, told: false };
function kzLandDoor() { return __ZC(342, 161, this, arguments, new.target); }
function kzGo() { return __ZC(342, 162, this, arguments, new.target); }
(function () {
if (typeof ldBuild === "function") {
var lb = ldBuild;
ldBuild = function (r) { var o = lb.apply(this, arguments); try {
kzLandDoor();
}
catch (e) {
if (window.console)
console.warn("[kids zone] door", e);
} return o; };
}
if (typeof ldUse === "function") {
var lu = ldUse;
ldUse = function (T) { if (T && T.kzGo) {
kzGo();
return;
} return lu.apply(this, arguments); };
}
})();
function kzPeopleCull(dt, L) { return __ZC(342, 163, this, arguments, new.target); }
KZ_SITES.push(["samhain", 55, 118, 18, "the Little Moons' Samhain"]);
KZ_SITE.samhain = { k: "samhain", x: 55, z: 118, r: 18, name: "the Little Moons' Samhain" };
KZ_DRESS.samhain = [0x2A1A3A, 0x141018];
var KZS = { lit: [], apple: null, swing: 0 };
var KZS_STAMPS = [["lanterns", "Lantern Carver", "🎃"], ["snapapple", "Apple Snapper", "🍎"], ["harvest", "Harvest Giver", "🌾"], ["story", "Story Keeper", "🔥"], ["parade", "Little Guiser", "🎭"], ["goodnight", "Moon Candle", "🕯️"]];
function kzsOn() {
if (typeof otmSamhainOn === "function")
try {
return otmSamhainOn();
}
catch (e) { }
var c = (typeof cloudSetting === "function") ? cloudSetting("obsidian_temple") : null;
if (c && c.samhain === true)
return true;
var st = Date.UTC(2026, 9, 31, 7, 0);
return Date.now() >= st - 6 * 3600000 && Date.now() < st + 24 * 3600000;
}
function kzsStart() { try {
if (typeof otmSpStartMs === "function" && typeof otmSpCfg === "function")
return otmSpStartMs(otmSpCfg());
}
catch (e) { } return Date.UTC(2026, 9, 31, 7, 0); }
function kzsRow(k) { return (typeof OTM_SP_KIDS !== "undefined" ? OTM_SP_KIDS : []).filter(function (r) { return r[0] === k; })[0] || null; }
function kzsNow() {
var st = kzsStart(), t = Date.now(), L = typeof OTM_SP_KIDS !== "undefined" ? OTM_SP_KIDS : [];
for (var i = 0; i < L.length; i++) {
var a = st + L[i][1] * 60000;
if (t >= a && t < a + L[i][2] * 60000)
return { item: L[i], next: L[i + 1] || null };
if (t < a)
return { item: null, next: L[i] };
}
return { item: null, next: null };
}
function kzsTime(ms) { if (typeof otmSpClock === "function")
return otmSpClock(ms).split(", ")[1]; var d = new Date(ms - 7 * 3600000), h = d.getUTCHours(), m = d.getUTCMinutes(); return ((h + 11) % 12 + 1) + ":" + (m < 10 ? "0" : "") + m + (h < 12 ? " am" : " pm"); }
function kzsGot() { return kzLocalGet("samhain26") || {}; }
function kzsStamp(k, say) { return __ZC(342, 164, this, arguments, new.target); }
function kzsFace(c, W, H, kind) { return __ZC(342, 165, this, arguments, new.target); }
function kzsFaceMat(kind, turnip) { return __ZC(342, 166, this, arguments, new.target); }
function kzsLantern(G, x, z, kind, turnip, s) { return __ZC(342, 167, this, arguments, new.target); }
function kzsBuild(G) { return __ZC(342, 168, this, arguments, new.target); }
function kzsCarvedShow() { return __ZC(342, 169, this, arguments, new.target); }
function kzsHarvestShow() { return __ZC(342, 170, this, arguments, new.target); }
function kzsCandlesShow() { return __ZC(342, 171, this, arguments, new.target); }
function kzsCard(said, extra, fns) { return __ZC(342, 172, this, arguments, new.target); }
function kzsBoard() { return __ZC(342, 173, this, arguments, new.target); }
function kzsCarve() { return __ZC(342, 174, this, arguments, new.target); }
function kzsSnap() { return __ZC(342, 175, this, arguments, new.target); }
function kzsHarvest() { return __ZC(342, 176, this, arguments, new.target); }
function kzsStory() { return __ZC(342, 177, this, arguments, new.target); }
var KZS_JOKES = ["What do ghosts eat for supper? Spook-etti!", "Why didn't the skeleton go to the party? He had no-body to go with!", "What is a pumpkin's favourite sport? Squash!", "What do you call a witch at the beach? A sand-witch!", "Why do owls never go out in the rain? It's too hoo-midity!", "What room does a ghost never go in? The living room!"];
function kzsParade() { return __ZC(342, 178, this, arguments, new.target); }
function kzsGoodnight() { return __ZC(342, 179, this, arguments, new.target); }
(function () {
if (typeof kzPlaces === "function") {
var kp = kzPlaces;
kzPlaces = function (G) { var r = kp.apply(this, arguments); try {
kzsBuild(G);
}
catch (e) {
if (window.console)
console.warn("[kids-zone] samhain", e);
} return r; };
}
if (typeof kzTick === "function") {
var kt = kzTick;
kzTick = function (dt) {
var r = kt.apply(this, arguments);
try {
KZS.swing += dt * 1.7;
if (KZS.apple)
KZS.apple.pv.rotation.x = Math.sin(KZS.swing) * 0.55;
(KZS.flames || []).forEach(function (f, i) { f.scale.y = 1 + 0.12 * Math.sin(KZ.t * 3.1 + i * 1.7); });
if (KZS.sceptre)
KZS.sceptre.rotation.y += dt * 0.35;
}
catch (e) { }
return r;
};
}
if (typeof kzBoardCard === "function") {
var kb = kzBoardCard;
kzBoardCard = function () {
var r = kb.apply(this, arguments);
try {
if (kzsOn() && WLD.card && WLD.card.style.display === "block") {
var d = document.createElement("div");
d.innerHTML = worldBtn("kzs", "🌙 Samhain today: the Little Moons' Samhain", "by the Welcome Glade, under the crescent-moon arch");
var b = d.firstChild;
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); kzsBoard(); };
WLD.card.insertBefore(b, WLD.card.children[1] || null);
}
}
catch (e) { }
return r;
};
}
})();
function kzsSceptreGo() { return __ZC(342, 180, this, arguments, new.target); }
function kzaE(c, r, col, o) { var P = { t: "e", c: c, r: r, col: col }; if (o)
for (var k in o)
P[k] = o[k]; return P; }
function kzaC(a, b, r0, r1, col, o) { var P = { t: "c", a: a, b: b, r0: r0, r1: r1, col: col }; if (o)
for (var k in o)
P[k] = o[k]; return P; }
function kzaPath(pts, r0, r1, col, o) { var out = [], n = pts.length - 1; for (var i = 0; i < n; i++)
out.push(kzaC(pts[i], pts[i + 1], r0 + (r1 - r0) * i / n, r0 + (r1 - r0) * (i + 1) / n, col, o)); return out; }
function kzaBoth(list) {
var out = [];
list.forEach(function (P) {
out.push(P);
var has = (P.c && Math.abs(P.c[0]) > 1e-6) || (P.a && (Math.abs(P.a[0]) > 1e-6 || Math.abs(P.b[0]) > 1e-6));
if (!has)
return;
var Q = JSON.parse(JSON.stringify(P));
if (Q.c)
Q.c[0] = -Q.c[0];
if (Q.a) {
Q.a[0] = -Q.a[0];
Q.b[0] = -Q.b[0];
}
if (Q.rot)
Q.rot[1] = -(Q.rot[1] || 0);
out.push(Q);
});
return out;
}
var KZA = {};
(function () {
var E = kzaE, C = kzaC, Pth = kzaPath, B = kzaBoth;
function leg(len, kz, r0, r1, r2, foot, col, fcol, o) {
o = o || {};
var kn = [0, -len * (o.k || 0.5), kz];
return { u: [C([0, 0, 0], kn, r0, r1, col, { p: o.p }), E([0, -len * 0.12, 0], [r0 * 1.05, r0 * 1.3, r0 * 1.15], col, { p: o.p })].concat(o.thigh ? [E([0, -len * 0.16, -r0 * 0.15], [r0 * 1.25, r0 * 1.7, r0 * 1.45], col, { p: o.p })] : []),
l: [C([0, 0, 0], [0, -len * (1 - (o.k || 0.5)) + foot[1], o.toe || 0.01], r1, r2, o.lcol || col, { p: o.lp === undefined ? o.p : o.lp }), E([0, -len * (1 - (o.k || 0.5)) + foot[1], (o.toe || 0.01) + foot[2]], [foot[0], foot[1], foot[3] || foot[0] * 1.2], fcol)],
knee: kn };
}
var TAW = 0xC8964E, PALE = 0xE2CDA4, MANE = 0x7A4620, NOSE = 0x3A2520;
function cat(o) {
var body = o.body || TAW, pale = o.pale || PALE, hz = o.mane ? 1.2 : 1.14;
var P = [E([0, 0.97, 0], [0.40, 0.40, 0.86], body, { p: 1 }), E([0, 0.98, 0.52], [0.38, 0.44, 0.40], body, { p: 1 }), E([0, 0.95, -0.58], [0.37, 0.40, 0.42], body, { p: 1 }),
E([0, 0.80, 0.02], [0.31, 0.24, 0.62], pale), C([0, 1.05, 0.70], [0, 1.18, hz - 0.12], 0.29, 0.24, body, { p: 1 }),
E([0, 1.24, hz], [0.22, 0.23, 0.25], body, { p: 1 }), E([0, 1.31, hz + 0.01], [0.19, 0.13, 0.21], body, { p: 1 }),
E([0, 1.15, hz + 0.2], [0.13, 0.11, 0.15], body, { p: 1 }), E([0, 1.09, hz + 0.2], [0.1, 0.055, 0.11], pale), E([0, 1.215, hz + 0.335], [0.05, 0.04, 0.035], NOSE), E([0, 1.18, hz + 0.3], [0.075, 0.035, 0.06], o.bridge || body)]
.concat(B([E([0.075, 1.165, hz + 0.27], [0.06, 0.05, 0.05], pale), E([0.16, 1.45, hz - 0.08], [0.065, 0.07, 0.03], body), E([0.16, 1.45, hz - 0.07], [0.04, 0.045, 0.02], 0x3A2A1A), E([0.11, 1.27, hz + 0.2], [0.06, 0.035, 0.04], body, { p: 1 })]));
if (o.mane)
P = P.concat([E([0, 1.22, 0.96], [0.4, 0.46, 0.27], MANE, { k: 0.12 }), E([0, 1.02, 0.84], [0.34, 0.42, 0.28], MANE, { k: 0.1 }), E([0, 1.42, 0.96], [0.28, 0.18, 0.24], 0x8A5226, { k: 0.1 })]);
return P;
}
var catLegF = leg(0.95, 0.03, 0.15, 0.105, 0.085, [0.10, 0.055, 0.06, 0.13], TAW, 0xC09458, { p: 1 }), catLegH = leg(0.95, -0.12, 0.18, 0.11, 0.08, [0.10, 0.055, 0.06, 0.14], TAW, 0xC09458, { p: 1, thigh: 1, k: 0.47 });
function catTail(col, tuft, p) { return Pth([[0, 0, 0], [0, -0.12, -0.28], [0, -0.38, -0.52], [0, -0.6, -0.62]], 0.05, 0.032, col, { p: p }).concat([E([0, -0.64, -0.64], [0.06, 0.1, 0.06], tuft)]); }
KZA.lion = { name: "lion", cell: 0.044, K: 0.07, cw: 40, pat: "", body: cat({ mane: 1 }), legF: catLegF, legH: catLegH, hipF: [0.21, 0.97, 0.55], hipH: [0.21, 0.97, -0.6],
tail: { at: [0, 1.05, -0.95], s: catTail(TAW, 0x4A2A14) }, eyes: [{ p: [0.1, 1.31, 1.4], r: 0.03, d: [0.35, 0.05, 1], iris: 0xC8A040, pupil: "round" }],
walk: 0.9, stride: 0.32, head: [0, 1.25, 1.15], len: 2.1, sound: "a deep, rumbling purr" };
KZA.lioness = { name: "lioness", cell: 0.042, K: 0.07, cw: 40, pat: "", body: cat({}), legF: catLegF, legH: catLegH, hipF: [0.21, 0.97, 0.55], hipH: [0.21, 0.97, -0.6],
tail: { at: [0, 1.05, -0.95], s: catTail(TAW, 0x4A2A14) }, eyes: [{ p: [0.1, 1.31, 1.34], r: 0.03, d: [0.35, 0.05, 1], iris: 0xC8A040, pupil: "round" }], walk: 1.0, stride: 0.32, scale: 0.9, len: 2.0 };
var TIG = 0xE07428, TW = 0xF4EEE2;
KZA.tiger = { name: "tiger", cell: 0.044, K: 0.07, cw: 44, pat: "tiger", body: cat({ body: TIG, pale: 0xF0E4D0 }).concat(B([E([0.15, 1.2, 1.24], [0.07, 0.07, 0.07], TW), E([0.07, 1.36, 1.3], [0.04, 0.018, 0.035], TW)])),
legF: leg(0.95, 0.03, 0.155, 0.11, 0.09, [0.11, 0.055, 0.06, 0.14], TIG, 0xE0B888, { p: 1 }), legH: leg(0.95, -0.12, 0.185, 0.115, 0.085, [0.11, 0.055, 0.06, 0.15], TIG, 0xE0B888, { p: 1, thigh: 1, k: 0.47 }),
hipF: [0.21, 0.97, 0.55], hipH: [0.21, 0.97, -0.6], tail: { at: [0, 1.05, -0.95], s: catTail(TIG, 0x1A1210, 1).concat(Pth([[0, -0.6, -0.62], [0, -0.7, -0.66]], 0.033, 0.03, 0x1A1210)) },
eyes: [{ p: [0.1, 1.31, 1.34], r: 0.03, d: [0.35, 0.05, 1], iris: 0xE0B040, pupil: "round" }], walk: 0.95, stride: 0.34, scale: 1.12, len: 2.3 };
var EG = 0x8E8781, EGD = 0x77706B, IV = 0xF0E6CE;
KZA.elephant = { name: "elephant", cell: 0.08, K: 0.18, cw: 16, pat: "skin", body: [E([0, 2.15, 0], [0.98, 1.0, 1.5], EG), E([0, 2.38, 0.72], [0.92, 1.0, 0.78], EG), E([0, 2.22, -0.85], [0.9, 0.95, 0.78], EG),
E([0, 1.72, 0], [0.82, 0.6, 1.15], EGD), E([0, 2.72, 1.62], [0.58, 0.72, 0.58], EG), E([0, 3.08, 1.6], [0.5, 0.42, 0.45], EG), E([0, 2.5, 1.95], [0.4, 0.5, 0.35], EG)]
.concat(Pth([[0, 2.45, 2.15], [0, 2.05, 2.4], [0, 1.45, 2.5], [0, 0.9, 2.45], [0, 0.55, 2.32], [0, 0.42, 2.2]], 0.27, 0.09, EG))
.concat(B([E([0.85, 2.72, 1.3], [0.1, 0.82, 0.62], EGD, { rot: [0, -0.55], k: 0.06 }), E([0.3, 2.58, 2.1], [0.1, 0.1, 0.08], EG)].concat(Pth([[0.24, 2.28, 2.1], [0.3, 1.95, 2.45], [0.26, 1.82, 2.78]], 0.08, 0.035, IV, { k: 0.02 }))))
.concat([C([0, 2.95, -1.4], [0, 2.55, -1.62], 0.12, 0.08, EG)]),
legF: leg(1.95, 0, 0.36, 0.32, 0.31, [0.35, 0.12, 0.0, 0.38], EG, 0x6A6460, { k: 0.5 }), legH: leg(1.95, -0.05, 0.38, 0.31, 0.3, [0.34, 0.12, 0.0, 0.36], EG, 0x6A6460, { k: 0.5, thigh: 1 }),
hipF: [0.52, 1.95, 0.8], hipH: [0.5, 1.95, -0.95], tail: { at: [0, 2.5, -1.6], s: Pth([[0, 0, 0], [0, -0.55, -0.12], [0, -1.0, -0.16]], 0.06, 0.03, EG).concat([E([0, -1.06, -0.16], [0.05, 0.12, 0.05], 0x2A2622)]) },
eyes: [{ p: [0.43, 2.78, 2.02], r: 0.045, d: [0.8, 0, 0.6], iris: 0x5A3A1A, pupil: "round" }], walk: 1.0, stride: 0.26, len: 3.8, heavy: 1, sound: "a long, happy trumpet" };
var GF = 0xD9A05A, GC = 0xF2E2C2, GD = 0x6A4020;
KZA.giraffe = { name: "giraffe", cell: 0.05, K: 0.08, cw: 40, pat: "giraffe", body: [E([0, 2.55, 0], [0.46, 0.52, 0.92], GF, { p: 1 }), E([0, 2.72, 0.52], [0.46, 0.6, 0.5], GF, { p: 1 }), E([0, 2.42, -0.62], [0.42, 0.48, 0.44], GF, { p: 1 }), E([0, 2.3, 0.05], [0.36, 0.3, 0.7], GC)]
.concat(Pth([[0, 2.85, 0.72], [0, 3.55, 1.08], [0, 4.25, 1.38], [0, 4.85, 1.58], [0, 5.12, 1.66]], 0.3, 0.15, GF, { p: 1 }))
.concat(Pth([[0, 3.0, 0.55], [0, 3.7, 0.9], [0, 4.45, 1.22], [0, 5.05, 1.45]], 0.06, 0.05, GD, { k: 0.03 }))
.concat([E([0, 5.18, 1.82], [0.15, 0.17, 0.3], GF, { rot: [0.55, 0], p: 1 }), E([0, 5.0, 2.06], [0.11, 0.11, 0.13], GC), E([0, 4.95, 2.13], [0.07, 0.05, 0.06], 0x4A3A30)])
.concat(B([C([0.07, 5.33, 1.72], [0.08, 5.5, 1.7], 0.035, 0.03, GF), E([0.08, 5.52, 1.7], [0.045, 0.045, 0.045], 0x3A2414), E([0.16, 5.32, 1.66], [0.11, 0.035, 0.05], GF, { rot: [0, 0.3] })])),
legF: leg(2.5, 0.02, 0.16, 0.095, 0.075, [0.09, 0.07, 0.04, 0.11], GF, 0x2A1E16, { p: 1, lcol: 0xE2BC80, k: 0.46 }), legH: leg(2.42, -0.1, 0.18, 0.095, 0.075, [0.09, 0.07, 0.04, 0.11], GF, 0x2A1E16, { p: 1, lcol: 0xE2BC80, k: 0.44, thigh: 1 }),
hipF: [0.22, 2.52, 0.6], hipH: [0.22, 2.44, -0.68], tail: { at: [0, 2.68, -1.0], s: Pth([[0, 0, 0], [0, -0.6, -0.1], [0, -1.05, -0.14]], 0.04, 0.025, GF).concat([E([0, -1.15, -0.14], [0.05, 0.14, 0.05], 0x1A1210)]) },
eyes: [{ p: [0.12, 5.24, 1.86], r: 0.035, d: [0.9, 0.1, 0.4], iris: 0x3A2414, pupil: "round" }], walk: 0.95, stride: 0.3, len: 2.6, tall: 1, sound: "a soft, low hum" };
var ZW = 0xF4F2EC, ZB = 0x16161A;
KZA.zebra = { name: "zebra", cell: 0.04, K: 0.06, cw: 50, pat: "zebra", body: [E([0, 1.16, 0], [0.34, 0.38, 0.82], ZW, { p: 1 }), E([0, 1.2, 0.52], [0.33, 0.42, 0.36], ZW, { p: 1 }), E([0, 1.2, -0.58], [0.35, 0.4, 0.4], ZW, { p: 1 })]
.concat(Pth([[0, 1.32, 0.72], [0, 1.62, 0.98], [0, 1.82, 1.12]], 0.21, 0.13, ZW, { p: 1 }))
.concat(Pth([[0, 1.5, 0.68], [0, 1.86, 0.98], [0, 2.0, 1.1]], 0.05, 0.04, ZB, { k: 0.02, p: 1 }))
.concat([C([0, 1.86, 1.16], [0, 1.48, 1.52], 0.13, 0.085, ZW, { p: 1 }), E([0, 1.44, 1.56], [0.085, 0.085, 0.1], ZB), E([0, 1.8, 1.2], [0.12, 0.12, 0.12], ZW, { p: 1 })])
.concat(B([E([0.07, 2.0, 1.1], [0.035, 0.1, 0.045], ZW, { rot: [-0.3, 0] }), E([0.05, 1.47, 1.62], [0.022, 0.018, 0.012], 0x050505)])),
legF: leg(1.08, 0.02, 0.11, 0.065, 0.05, [0.055, 0.05, 0.02, 0.06], ZW, ZB, { p: 1 }), legH: leg(1.12, -0.1, 0.14, 0.07, 0.05, [0.055, 0.05, 0.02, 0.06], ZW, ZB, { p: 1, thigh: 1, k: 0.46 }),
hipF: [0.17, 1.1, 0.55], hipH: [0.17, 1.14, -0.6], tail: { at: [0, 1.38, -0.95], s: Pth([[0, 0, 0], [0, -0.4, -0.12], [0, -0.62, -0.12]], 0.035, 0.025, ZW, { p: 1 }).concat([E([0, -0.72, -0.12], [0.05, 0.13, 0.05], ZB)]) },
eyes: [{ p: [0.1, 1.78, 1.27], r: 0.026, d: [0.9, 0, 0.4], iris: 0x2A1A10, pupil: "bar" }], walk: 1.1, stride: 0.3, len: 2.3, sound: "a bark like a little dog" };
var BR = 0x6A4428, BRL = 0x8A6040;
KZA.bear = { name: "bear", cell: 0.046, K: 0.1, cw: 30, pat: "fur", body: [E([0, 0.98, 0], [0.5, 0.5, 0.82], BR), E([0, 1.15, 0.42], [0.46, 0.44, 0.42], BR), E([0, 1.0, -0.55], [0.48, 0.5, 0.45], BR),
C([0, 1.08, 0.6], [0, 1.02, 0.9], 0.34, 0.28, BR), E([0, 1.02, 1.06], [0.27, 0.26, 0.28], BR), E([0, 0.94, 1.32], [0.13, 0.12, 0.17], BRL), E([0, 0.98, 1.48], [0.055, 0.045, 0.04], 0x1A1210)]
.concat(B([E([0.17, 1.25, 0.98], [0.075, 0.075, 0.045], BR)])),
legF: leg(0.84, 0.02, 0.2, 0.155, 0.14, [0.14, 0.07, 0.07, 0.17], BR, 0x3A2618), legH: leg(0.9, -0.05, 0.22, 0.15, 0.13, [0.14, 0.07, 0.06, 0.18], BR, 0x3A2618, { thigh: 1 }),
hipF: [0.3, 0.86, 0.52], hipH: [0.3, 0.92, -0.6], tail: { at: [0, 1.1, -0.98], s: [E([0, 0, 0], [0.07, 0.07, 0.06], BR)] },
eyes: [{ p: [0.12, 1.1, 1.27], r: 0.026, d: [0.5, 0.1, 1], iris: 0x3A2010, pupil: "round" }], walk: 0.8, stride: 0.28, len: 2.1, sound: "a soft huff" };
var HP = 0x8A7078, HPB = 0xC89A92, HPM = 0xA88890;
KZA.hippo = { name: "hippo", cell: 0.066, K: 0.14, cw: 20, pat: "skin", body: [E([0, 0.98, 0], [0.85, 0.7, 1.35], HP), E([0, 0.72, 0.05], [0.72, 0.4, 1.1], HPB), E([0, 1.02, 1.42], [0.5, 0.44, 0.5], HP), E([0, 0.88, 1.88], [0.5, 0.38, 0.4], HPM)]
.concat(B([E([0.18, 1.14, 2.08], [0.11, 0.07, 0.09], HPM), E([0.27, 1.38, 1.5], [0.11, 0.1, 0.11], HP), E([0.25, 1.47, 1.3], [0.065, 0.07, 0.04], HP)]))
.concat([C([0, 1.05, -1.3], [0, 0.9, -1.5], 0.08, 0.05, HP)]),
legF: leg(0.62, 0, 0.26, 0.24, 0.23, [0.24, 0.08, 0.0, 0.26], HP, 0x5A4A4E), legH: leg(0.62, 0, 0.27, 0.24, 0.23, [0.24, 0.08, 0.0, 0.26], HP, 0x5A4A4E),
hipF: [0.5, 0.62, 0.78], hipH: [0.5, 0.62, -0.8], eyes: [{ p: [0.31, 1.42, 1.6], r: 0.04, d: [0.5, 0.4, 0.8], iris: 0x4A2A1A, pupil: "round" }],
walk: 0.7, stride: 0.22, len: 3.2, swim: 1, heavy: 1, sound: "a big snorting yawn" };
var PB = 0x1E2228, PW = 0xF4F4F0, PO = 0xF0A030;
KZA.penguin = { name: "penguin", cell: 0.02, K: 0.03, cw: 120, pat: "", biped: 1, body: [E([0, 0.48, -0.02], [0.2, 0.38, 0.2], PB), E([0, 0.45, 0.05], [0.175, 0.34, 0.16], PW), E([0, 0.86, 0.0], [0.11, 0.115, 0.125], PB),
E([0, 0.72, 0.09], [0.11, 0.09, 0.07], 0xF6C860), C([0, 0.87, 0.1], [0, 0.83, 0.25], 0.026, 0.008, 0x2A2A2A), E([0, 0.84, 0.17], [0.012, 0.012, 0.05], PO), E([0, 0.11, -0.15], [0.08, 0.05, 0.08], PB)]
.concat(B([E([0.085, 0.83, 0.03], [0.03, 0.055, 0.045], PO), E([0.19, 0.55, 0], [0.03, 0.21, 0.07], PB, { rot: [0, 0] })])),
legH: { u: [E([0, -0.03, 0.02], [0.045, 0.06, 0.045], PB)], l: [E([0, -0.04, 0.06], [0.055, 0.02, 0.08], 0x2A2A30)], knee: [0, -0.06, 0] },
hipH: [0.07, 0.12, 0.02], eyes: [{ p: [0.065, 0.9, 0.08], r: 0.014, d: [0.8, 0.1, 0.6], iris: 0x2A1A1A, pupil: "round" }], walk: 0.45, stride: 0.08, waddle: 1, swim: 1, len: 0.9, sound: "a cheerful honk" };
var FL = 0xF28AA6, FLD = 0xE0607E;
KZA.flamingo = { name: "flamingo", cell: 0.016, K: 0.025, cw: 140, pat: "", biped: 1, body: [E([0, 1.06, 0], [0.16, 0.16, 0.3], FL), E([0, 1.08, -0.27], [0.12, 0.07, 0.14], FLD), E([0.0, 1.12, -0.05], [0.17, 0.08, 0.24], FLD)]
.concat(Pth([[0, 1.12, 0.24], [0, 1.3, 0.34], [0, 1.48, 0.26], [0, 1.66, 0.24], [0, 1.79, 0.33]], 0.045, 0.03, FL))
.concat([E([0, 1.82, 0.4], [0.045, 0.045, 0.065], FL)]).concat(Pth([[0, 1.82, 0.44], [0, 1.78, 0.53], [0, 1.7, 0.56]], 0.024, 0.012, 0xF2E8E0)).concat([E([0, 1.69, 0.565], [0.014, 0.02, 0.014], 0x141414)]),
legH: { u: [C([0, 0, 0], [0, -0.44, -0.04], 0.016, 0.014, 0xE88AA0)], l: [C([0, 0, 0], [0, -0.47, 0.02], 0.014, 0.012, 0xE88AA0), E([0, -0.48, 0.07], [0.04, 0.01, 0.06], 0xD87A90)], knee: [0, -0.44, -0.04] },
hipH: [0.05, 0.95, 0.0], eyes: [{ p: [0.035, 1.84, 0.42], r: 0.009, d: [0.9, 0, 0.3], iris: 0xF0D040, pupil: "round" }], walk: 0.4, stride: 0.12, len: 0.6, wader: 1, sound: "a goose-like honk" };
var KR = 0xB8704A, KL = 0xE4C4A4;
KZA.kangaroo = { name: "kangaroo", cell: 0.03, K: 0.05, cw: 60, pat: "", biped: 1, hop: 1, body: [E([0, 0.92, 0], [0.24, 0.4, 0.28], KR, { rot: [-0.35, 0] }), E([0, 0.88, 0.08], [0.19, 0.32, 0.2], KL, { rot: [-0.35, 0] }), E([0, 1.2, 0.14], [0.18, 0.22, 0.18], KR),
C([0, 1.28, 0.16], [0, 1.45, 0.24], 0.12, 0.09, KR), E([0, 1.5, 0.27], [0.1, 0.11, 0.16], KR), E([0, 1.45, 0.41], [0.055, 0.055, 0.08], KR), E([0, 1.46, 0.48], [0.03, 0.025, 0.02], 0x1A1210)]
.concat(B([E([0.06, 1.66, 0.2], [0.03, 0.1, 0.05], KR, { rot: [-0.2, 0] }), C([0.12, 1.13, 0.24], [0.1, 0.95, 0.36], 0.045, 0.03, KR), E([0.15, 0.6, -0.05], [0.13, 0.22, 0.24], KR)]))
.concat(Pth([[0, 0.6, -0.18], [0, 0.34, -0.42], [0, 0.14, -0.72], [0, 0.06, -1.02]], 0.13, 0.04, KR)),
legH: { u: [C([0, 0, 0], [0, -0.3, 0.16], 0.09, 0.055, KR)], l: [C([0, 0, 0], [0, -0.24, -0.12], 0.05, 0.035, KR), E([0, -0.26, 0.06], [0.045, 0.03, 0.2], 0x6A4028)], knee: [0, -0.3, 0.16] },
hipH: [0.15, 0.56, -0.04], eyes: [{ p: [0.07, 1.55, 0.36], r: 0.02, d: [0.8, 0.1, 0.6], iris: 0x2A1A10, pupil: "round" }], walk: 1.6, stride: 0.0, len: 1.4, sound: "a gentle cough-cough" };
})();
function kzaWorkerMain() {
function sdOf(P, x, y, z) {
if (P.t === "e") {
var dx = x - P.c[0], dy = y - P.c[1], dz = z - P.c[2];
if (P.rot) {
var ry = -(P.rot[1] || 0), cy = Math.cos(ry), sy = Math.sin(ry), tx = dx * cy + dz * sy, tz = -dx * sy + dz * cy;
dx = tx;
dz = tz;
var rx = -(P.rot[0] || 0), cx = Math.cos(rx), sx = Math.sin(rx), ty = dy * cx - dz * sx;
tz = dy * sx + dz * cx;
dy = ty;
dz = tz;
}
var a = dx / P.r[0], b = dy / P.r[1], c = dz / P.r[2], k0 = Math.sqrt(a * a + b * b + c * c), k1 = Math.sqrt(a * a / (P.r[0] * P.r[0]) + b * b / (P.r[1] * P.r[1]) + c * c / (P.r[2] * P.r[2]));
return k1 > 1e-9 ? k0 * (k0 - 1) / k1 : -Math.min(P.r[0], P.r[1], P.r[2]);
}
var ax = P.b[0] - P.a[0], ay = P.b[1] - P.a[1], az = P.b[2] - P.a[2], px = x - P.a[0], py = y - P.a[1], pz = z - P.a[2], L = ax * ax + ay * ay + az * az;
var h = L > 0 ? Math.max(0, Math.min(1, (px * ax + py * ay + pz * az) / L)) : 0;
return Math.sqrt((px - ax * h) * (px - ax * h) + (py - ay * h) * (py - ay * h) + (pz - az * h) * (pz - az * h)) - (P.r0 + (P.r1 - P.r0) * h);
}
function hash(x, y, z) { var h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return h - Math.floor(h); }
function vnoise(x, y, z) {
var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x - ix, fy = y - iy, fz = z - iz;
fx = fx * fx * (3 - 2 * fx);
fy = fy * fy * (3 - 2 * fy);
fz = fz * fz * (3 - 2 * fz);
function L(a, b, t) { return a + (b - a) * t; }
return L(L(L(hash(ix, iy, iz), hash(ix + 1, iy, iz), fx), L(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), fx), fy), L(L(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), fx), L(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), fx), fy), fz);
}
function pattern(kind, part, x, y, z) {
if (kind === "tiger") {
var w = part === "body" || part === "tail" ? z * 8.5 + 1.6 * Math.sin(y * 6 + x * 2.5) + 1.2 * vnoise(x * 4, y * 4, z * 4) : y * 12 + 1.2 * vnoise(x * 5, y * 5, z * 5);
var s = Math.sin(w * Math.PI);
if (s > 0.62 + 0.2 * vnoise(x * 9, y * 9, z * 9))
return [0.09, 0.06, 0.05];
return null;
}
if (kind === "zebra") {
var wz = part === "body" ? (z < 0.6 ? z * 9.5 + 1.4 * Math.sin(y * 3.2) : (y * 7 + z * 4)) + 0.5 * vnoise(x * 6, y * 6, z * 6) : part === "tail" ? y * 10 : y * 16 + 0.4 * vnoise(x * 7, y * 7, z * 7);
if (part === "body" && z < -0.35 && y > 1.0)
wz = Math.atan2(y - 1.0, z + 0.35) * 7 + Math.hypot(y - 1.0, z + 0.35) * 12;
return Math.sin(wz * Math.PI) > 0.05 ? [0.08, 0.08, 0.09] : null;
}
if (kind === "giraffe") {
var q = 3.6, X = x * q, Y = y * q, Z = z * q, ix = Math.floor(X), iy = Math.floor(Y), iz = Math.floor(Z), d1 = 9, d2 = 9, id = 0;
for (var a = -1; a <= 1; a++)
for (var b = -1; b <= 1; b++)
for (var c = -1; c <= 1; c++) {
var cx = ix + a, cy = iy + b, cz = iz + c, fx = cx + hash(cx, cy, cz), fy = cy + hash(cy, cz, cx), fz = cz + hash(cz, cx, cy), d = Math.sqrt((X - fx) * (X - fx) + (Y - fy) * (Y - fy) + (Z - fz) * (Z - fz));
if (d < d1) {
d2 = d1;
d1 = d;
id = hash(cx + 3, cy + 7, cz + 1);
}
else if (d < d2)
d2 = d;
}
if (d2 - d1 < 0.16)
return [0.95, 0.89, 0.76];
var t = 0.75 + id * 0.3;
return [0.62 * t, 0.33 * t, 0.13 * t];
}
return null;
}
function build(J) {
var prims = J.prims, cell = J.cell, K = J.K, lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
prims.forEach(function (P) {
var R = P.t === "e" ? Math.max(P.r[0], P.r[1], P.r[2]) : Math.max(P.r0, P.r1), pts = P.t === "e" ? [P.c] : [P.a, P.b];
P.bc = P.t === "e" ? P.c : [(P.a[0] + P.b[0]) / 2, (P.a[1] + P.b[1]) / 2, (P.a[2] + P.b[2]) / 2];
P.br = P.t === "e" ? R : Math.sqrt(Math.pow(P.a[0] - P.b[0], 2) + Math.pow(P.a[1] - P.b[1], 2) + Math.pow(P.a[2] - P.b[2], 2)) / 2 + R;
pts.forEach(function (c) { for (var i = 0; i < 3; i++) {
lo[i] = Math.min(lo[i], c[i] - R);
hi[i] = Math.max(hi[i], c[i] + R);
} });
});
for (var i0 = 0; i0 < 3; i0++) {
lo[i0] -= cell * 3;
hi[i0] += cell * 3;
}
var nx = Math.ceil((hi[0] - lo[0]) / cell) + 1, ny = Math.ceil((hi[1] - lo[1]) / cell) + 1, nz = Math.ceil((hi[2] - lo[2]) / cell) + 1;
function sdf(x, y, z) {
var d = 1e9;
for (var i = 0; i < prims.length; i++) {
var P = prims[i], k = P.k || K;
if (d < 1e8) {
var bx = x - P.bc[0], by = y - P.bc[1], bz = z - P.bc[2], lb = Math.sqrt(bx * bx + by * by + bz * bz) - P.br;
if (lb > d + k)
continue;
}
var q = sdOf(P, x, y, z);
if (d >= 1e8)
d = q;
else {
var h = Math.max(0, Math.min(1, 0.5 + 0.5 * (q - d) / k));
d = q + (d - q) * h - k * h * (1 - h);
}
}
return d;
}
var F = new Float32Array(nx * ny * nz);
for (var k = 0; k < nz; k++)
for (var j = 0; j < ny; j++)
for (var i = 0; i < nx; i++)
F[i + nx * (j + ny * k)] = sdf(lo[0] + i * cell, lo[1] + j * cell, lo[2] + k * cell);
var V = new Int32Array(nx * ny * nz).fill(-1), pos = [], idx = [];
function at(i, j, k) { return F[i + nx * (j + ny * k)]; }
var c8 = new Float32Array(8);
for (var k2 = 0; k2 < nz - 1; k2++)
for (var j2 = 0; j2 < ny - 1; j2++)
for (var i2 = 0; i2 < nx - 1; i2++) {
var inside = 0;
for (var q = 0; q < 8; q++) {
var v = at(i2 + (q & 1), j2 + ((q >> 1) & 1), k2 + ((q >> 2) & 1));
c8[q] = v;
if (v < 0)
inside++;
}
if (inside === 0 || inside === 8)
continue;
var sx = 0, sy = 0, sz = 0, n = 0;
for (var e = 0; e < 8; e++)
for (var b = 0; b < 3; b++) {
var f = e ^ (1 << b);
if (f < e)
continue;
var a0 = c8[e], a1 = c8[f];
if ((a0 < 0) === (a1 < 0))
continue;
var t = a0 / (a0 - a1);
sx += ((e & 1) + ((f & 1) - (e & 1)) * t);
sy += (((e >> 1) & 1) + (((f >> 1) & 1) - ((e >> 1) & 1)) * t);
sz += (((e >> 2) & 1) + (((f >> 2) & 1) - ((e >> 2) & 1)) * t);
n++;
}
V[i2 + nx * (j2 + ny * k2)] = pos.length / 3;
pos.push(lo[0] + (i2 + sx / n) * cell, lo[1] + (j2 + sy / n) * cell, lo[2] + (k2 + sz / n) * cell);
}
function cid(i, j, k) { return V[i + nx * (j + ny * k)]; }
for (var k3 = 1; k3 < nz - 1; k3++)
for (var j3 = 1; j3 < ny - 1; j3++)
for (var i3 = 1; i3 < nx - 1; i3++) {
var v0 = at(i3, j3, k3) < 0, A, B2, C2, D;
if ((at(i3 + 1, j3, k3) < 0) !== v0) {
A = cid(i3, j3 - 1, k3 - 1);
B2 = cid(i3, j3, k3 - 1);
C2 = cid(i3, j3, k3);
D = cid(i3, j3 - 1, k3);
if (A >= 0 && B2 >= 0 && C2 >= 0 && D >= 0) {
if (v0)
idx.push(A, B2, C2, A, C2, D);
else
idx.push(A, C2, B2, A, D, C2);
}
}
if ((at(i3, j3 + 1, k3) < 0) !== v0) {
A = cid(i3 - 1, j3, k3 - 1);
B2 = cid(i3, j3, k3 - 1);
C2 = cid(i3, j3, k3);
D = cid(i3 - 1, j3, k3);
if (A >= 0 && B2 >= 0 && C2 >= 0 && D >= 0) {
if (v0)
idx.push(A, C2, B2, A, D, C2);
else
idx.push(A, B2, C2, A, C2, D);
}
}
if ((at(i3, j3, k3 + 1) < 0) !== v0) {
A = cid(i3 - 1, j3 - 1, k3);
B2 = cid(i3, j3 - 1, k3);
C2 = cid(i3, j3, k3);
D = cid(i3 - 1, j3, k3);
if (A >= 0 && B2 >= 0 && C2 >= 0 && D >= 0) {
if (v0)
idx.push(A, B2, C2, A, C2, D);
else
idx.push(A, C2, B2, A, D, C2);
}
}
}
var N = pos.length / 3, P3 = new Float32Array(pos), nor = new Float32Array(N * 3), col = new Float32Array(N * 3), h = cell * 0.5, cw = J.cw || 40;
var rgb = prims.map(function (P) { return [((P.col >> 16) & 255) / 255, ((P.col >> 8) & 255) / 255, (P.col & 255) / 255]; });
for (var vi = 0; vi < N; vi++) {
var x = P3[vi * 3], y = P3[vi * 3 + 1], z = P3[vi * 3 + 2];
var gx = sdf(x + h, y, z) - sdf(x - h, y, z), gy = sdf(x, y + h, z) - sdf(x, y - h, z), gz = sdf(x, y, z + h) - sdf(x, y, z - h), gl = Math.sqrt(gx * gx + gy * gy + gz * gz) || 1;
nor[vi * 3] = gx / gl;
nor[vi * 3 + 1] = gy / gl;
nor[vi * 3 + 2] = gz / gl;
var wr = 0, wg = 0, wb = 0, ws = 0, wp = 0;
for (var pi = 0; pi < prims.length; pi++) {
var Pp = prims[pi], bx2 = x - Pp.bc[0], by2 = y - Pp.bc[1], bz2 = z - Pp.bc[2];
if (Math.sqrt(bx2 * bx2 + by2 * by2 + bz2 * bz2) - Pp.br > 0.5)
continue;
var dd = Math.max(-0.01, sdOf(Pp, x, y, z)), w = Math.exp(-dd * cw);
wr += rgb[pi][0] * w;
wg += rgb[pi][1] * w;
wb += rgb[pi][2] * w;
ws += w;
if (Pp.p)
wp += w;
}
if (ws <= 0) {
ws = 1;
wr = wg = wb = 0.5;
}
var r = wr / ws, g = wg / ws, bl = wb / ws, pk = wp / ws;
if (J.pat && pk > 0.02) {
var pc = pattern(J.pat, J.part, x + (J.off ? J.off[0] : 0), y + (J.off ? J.off[1] : 0), z + (J.off ? J.off[2] : 0));
if (pc) {
r += (pc[0] - r) * pk;
g += (pc[1] - g) * pk;
bl += (pc[2] - bl) * pk;
}
}
var m = J.skin ? 0.9 + 0.16 * vnoise(x * 14, y * 14, z * 14) + 0.06 * vnoise(x * 60, y * 60, z * 60) : 0.88 + 0.12 * vnoise(x * 40, y * 40, z * 40) + 0.08 * vnoise(x * 9, y * 9, z * 9);
var shade = 1 + Math.max(-0.08, Math.min(0.06, -nor[vi * 3 + 1] * 0.05));
col[vi * 3] = Math.pow(Math.min(1, r * m * shade), 2.2);
col[vi * 3 + 1] = Math.pow(Math.min(1, g * m * shade), 2.2);
col[vi * 3 + 2] = Math.pow(Math.min(1, bl * m * shade), 2.2);
}
return { key: J.key, pos: P3, nor: nor, col: col, idx: N > 65535 ? new Uint32Array(idx) : new Uint16Array(idx) };
}
if (typeof self !== "undefined" && typeof window === "undefined") {
self.onmessage = function (ev) { var out = build(ev.data); self.postMessage(out, [out.pos.buffer, out.nor.buffer, out.col.buffer, out.idx.buffer]); };
}
return build;
}
var KZAQ = { w: null, list: [], busy: null, geo: {}, wait: {}, local: null, failed: false };
function kzaJob(key, prims, o, done) { return __ZC(342, 181, this, arguments, new.target); }
function kzaPump() { return __ZC(342, 182, this, arguments, new.target); }
function kzaDone(D) { return __ZC(342, 183, this, arguments, new.target); }
var KZA_MAT = {};
function kzaMat(skin) {
var k = skin ? "skin" : "fur";
if (KZA_MAT[k])
return KZA_MAT[k];
var m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: skin ? 0.68 : 0.88, metalness: 0 });
m.userData.realSoft = 1;
return (KZA_MAT[k] = m);
}
var KZA_ALL = [];
function kzaHerd(G, kind, n, area, o) { return __ZC(342, 184, this, arguments, new.target); }
function kzaInArea(H, x, z, pad) { return __ZC(342, 185, this, arguments, new.target); }
function kzaPick(H, R) { return __ZC(342, 186, this, arguments, new.target); }
var KZA_M = null;
function kzaTick(dt, near) { return __ZC(342, 187, this, arguments, new.target); }
function kzaNearest(kind, x, z) { var best = null, bd = 1e9; KZA_ALL.forEach(function (H) { if (H.kind !== kind)
return; H.list.forEach(function (A) { var d = Math.hypot(A.x - x, A.z - z); if (d < bd) {
bd = d;
best = A;
} }); }); return best; }
function kzaCall(kind, x, z, n, r) { return __ZC(342, 188, this, arguments, new.target); }
function kzaForget() { KZA_ALL.length = 0; KZAQ.geo = {}; KZAQ.wait = {}; KZAQ.list.length = 0; }
var KZW = { nodes: [], edges: [], built: false, posts: [], pip: null, walkers: [] };
function kzwGraph() { return __ZC(342, 189, this, arguments, new.target); }
function kzwRoute(x, z, site) { return __ZC(342, 190, this, arguments, new.target); }
function kzwFromNode(ni) { return __ZC(342, 191, this, arguments, new.target); }
var KZW_TEX = null;
function kzwCobbles() { return __ZC(342, 192, this, arguments, new.target); }
function kzwHue(x, z) { return ((((x * 0.0045 + z * 0.0035) % 1) + 1) % 1); }
function kzwWays(G) { return __ZC(342, 193, this, arguments, new.target); }
function kzPost(G, x, z, boards, o) { return __ZC(342, 194, this, arguments, new.target); }
function kzwPosts(G) { return __ZC(342, 195, this, arguments, new.target); }
function kzwPipMake() { return __ZC(342, 196, this, arguments, new.target); }
function kzwGuide(site) { return __ZC(342, 197, this, arguments, new.target); }
function kzWaysTick(dt, L) { return __ZC(342, 198, this, arguments, new.target); }
function kzwWalkers(G) { return __ZC(342, 199, this, arguments, new.target); }
function kzwWalkerTick(W, dt, L) { return __ZC(342, 200, this, arguments, new.target); }
function kzWays(G) { KZW.nodes = []; KZW.edges = []; KZW.posts = []; KZW.walkers = []; KZW.pip = null; KZW.route = null; kzwGraph(); kzwWays(G); kzwPosts(G); kzwWalkers(G); }
var KZD2 = { kites: [], R: null };
function kzdFree(x, z, pad) { return __ZC(342, 201, this, arguments, new.target); }
function kzdBed(G, x, z, r, seed) { return __ZC(342, 202, this, arguments, new.target); }
function kzdBench(G, x, z, rot, col) { return __ZC(342, 203, this, arguments, new.target); }
function kzdTopiary(G, x, z, kind, rot) { return __ZC(342, 204, this, arguments, new.target); }
function kzdBunting(G, x1, z1, x2, z2, seed) { return __ZC(342, 205, this, arguments, new.target); }
var KZD_CHECK = {};
function kzdCheckMat(col) { return __ZC(342, 206, this, arguments, new.target); }
function kzdPicnic(G, x, z, rot, seed, people) { return __ZC(342, 207, this, arguments, new.target); }
function kzdPlayground(G, x, z, rot, seed) { return __ZC(342, 208, this, arguments, new.target); }
function kzdKite(G, x, z, seed) { return __ZC(342, 209, this, arguments, new.target); }
function kzdKitesTick(dt) { return __ZC(342, 210, this, arguments, new.target); }
function kzDress(G) { return __ZC(342, 211, this, arguments, new.target); }
var KZM = {};
function kzmTurfTex() { return __ZC(342, 212, this, arguments, new.target); }
function kzmTurf(G) { return __ZC(342, 213, this, arguments, new.target); }
function kzmLeaf(c) { KZM.lm = KZM.lm || {}; return KZM.lm[c] || (KZM.lm[c] = leafMat(c)); }
function kzmOpen(x, z, pad) { return __ZC(342, 214, this, arguments, new.target); }
function kzmMeadow(G) { return __ZC(342, 215, this, arguments, new.target); }
function kzmFamilies(G) { return __ZC(342, 216, this, arguments, new.target); }
(function () {
if (typeof kzDress !== "function")
return;
var kd = kzDress;
kzDress = function (G) {
var r = kd.apply(this, arguments);
try {
kzmTurf(G);
}
catch (e) {
if (window.console)
console.warn("kz turf:", e);
}
try {
kzmMeadow(G);
}
catch (e) {
if (window.console)
console.warn("kz meadow:", e);
}
try {
kzmFamilies(G);
}
catch (e) {
if (window.console)
console.warn("kz families:", e);
}
return r;
};
})();
