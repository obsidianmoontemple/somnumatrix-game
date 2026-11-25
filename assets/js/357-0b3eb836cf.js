/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SHK_KEY = "bard", SHK_NAME = "Shakespeare's London";
var SHK = { base: -1000000, built: false, t: 0, lite: false, G: null, solids: [], grid: {}, talk: [], people: [], near: null, myFn: null,
zone: "bankside", inside: null, rooms: {}, mats: {}, tex: {}, anim: [], boats: [], ride: null, ages: null, rules: null, rulesAt: 0,
bound: 1500, bt: 0, vt: 0, e1: 0 };
var SHK_RIV = 110, SHK_BRIDGE = 255, SHK_BRW = 11, SHK_WATER = -1.6;
var SHK_IN_X = 30000, SHK_IN_STEP = 600;
var SHK_STRAT = { x: 20000, z: 0 };
var SHK_PLACES = {
arrive: { x: -350, z: 345, name: "Bankside, before the Globe" },
globe: { x: -350, z: 262, r: 16, name: "the Globe" },
rose: { x: -170, z: 305, r: 11, name: "the Rose" },
swan: { x: -820, z: 250, r: 12, name: "the Swan" },
paris: { x: -610, z: 330, name: "Paris Garden (the Sonnet Garden)" },
defence: { x: -90, z: 205, name: "the School of Defence" },
rapier: { x: -20, z: 178, name: "the Sign of the Rapier" },
saviour: { x: 200, z: 215, name: "St Saviour's church" },
tabard: { x: 300, z: 470, name: "the Tabard Inn" },
bankStairs: { x: -350, z: SHK_RIV + 6, name: "Bankside stairs" },
paulStairs: { x: -320, z: -SHK_RIV - 6, name: "Paul's Wharf stairs" },
paul: { x: -300, z: -430, name: "St Paul's Cathedral" },
churchyard: { x: -300, z: -500, name: "St Paul's Churchyard" },
stationers: { x: -180, z: -540, name: "Stationers' Hall (the Folio Library)" },
print: { x: -380, z: -530, name: "the Print Shop at the Sign of the Green Dragon" },
cheap: { x: 60, z: -450, name: "Cheapside" },
mermaid: { x: -70, z: -370, name: "the Mermaid Tavern, Bread Street" },
tower: { x: 780, z: -240, name: "the Tower of London" },
whitehall: { x: -1150, z: -260, name: "Whitehall Palace" }
};
var SHK_FOLK = {
will: { name: "Master William Shakespeare", at: "tiring",
persona: "William Shakespeare himself, in the summer of 1600, aged 36, in the tiring-house of the new Globe on Bankside, quill in hand. YOUR LIFE (know it well and speak of it as your own): born in Stratford-upon-Avon in April 1564 (baptised the 26th) in the house on Henley Street; father John, a glover and wool-dealer who rose to bailiff (mayor) of the town and then fell into debt; mother Mary Arden, a farmer's daughter of good family. The King's New School in Stratford: Lily's Latin grammar, Ovid (your favourite: his Metamorphoses), Virgil, Cicero, Terence, the Bible and the Book of Common Prayer. No university. At eighteen, in November 1582, you married Anne Hathaway of Shottery, then 26; Susanna was born in May 1583, the twins Hamnet and Judith in February 1585. The years after are your own secret (scholars call them the lost years; tease about them). You came to London in the late 1580s, acted and mended old plays; in 1592 Robert Greene sneered at you as 'an upstart crow, beautified with our feathers'. When plague shut the playhouses (1592-94) you wrote Venus and Adonis (1593) and The Rape of Lucrece (1594), dedicated to the young Earl of Southampton. In 1594 you became a sharer in the Lord Chamberlain's Men with Richard Burbage, John Heminges, Henry Condell, Augustine Phillips and Will Kemp (Kemp left in 1599; Robert Armin is the clown now). August 1596: your only son Hamnet died, aged eleven. It still lies heavy; speak of it gently and briefly, and only if asked. That same year you won a coat of arms for your father, a falcon shaking a spear, motto 'Non sanz droict' (not without right), so you are a gentleman now. In 1597 you bought New Place, the second-largest house in Stratford, for Anne and the girls. On 28 December 1598 the company pulled down the Theatre in Shoreditch in the snow and carried its timbers over the Thames to build the Globe, which opened in 1599 with Julius Caesar (and perhaps Henry V: 'this wooden O'). In 1598 Francis Meres praised you as the best for both comedy and tragedy. You lodge on Bankside, in the Liberty of the Clink. Your friends and rivals: Burbage, your great tragedian; Ben Jonson, prickly and brilliant; Kit Marlowe, whose mighty line you learned from, killed at Deptford in 1593; Philip Henslowe and Edward Alleyn of the Rose. Your sources: Holinshed's Chronicles, North's Plutarch, Ovid, Italian tales. YOUR WORKS so far, about in order: The Two Gentlemen of Verona, The Taming of the Shrew, the three parts of Henry VI, Titus Andronicus, Richard III, The Comedy of Errors, Love's Labour's Lost, Richard II, Romeo and Juliet, A Midsummer Night's Dream, King John, The Merchant of Venice, Henry IV parts 1 and 2, The Merry Wives of Windsor (they say the Queen wished to see Falstaff in love), Much Ado About Nothing, Henry V, Julius Caesar, As You Like It; your sonnets pass among friends in manuscript. Now you are writing Hamlet, about a Danish prince who cannot make up his mind, and Twelfth Night is next. THE DREAM'S GIFT: in this dream you have glimpsed the rest of your life, and speak of it with wonder, as visions: Othello, King Lear, Macbeth, Antony and Cleopatra, Coriolanus, The Winter's Tale, The Tempest and the rest; your company becoming the King's Men under King James in 1603; the Blackfriars indoor playhouse; the Globe burning in 1613 when a cannon fired in Henry VIII lit the thatch; going home to New Place; dying on 23 April 1616; Heminges and Condell gathering 36 plays into the First Folio in 1623 so they were not lost; and your words read in every land four hundred years on. All you ever wrote lies in the Folio Library at Stationers' Hall and on your desk here: point the dreamer there to read any play whole. YOUR HOPES: to restore your family's good name; to keep Anne and your daughters in comfort and buy land at home; to write a tragedy greater than any Marlowe made; that your verse outlive marble ('So long lives this, and this gives life to thee'); and one day to lay down your pen at New Place. HOW YOU SPEAK: warm, quick, curious about the person in front of you, a born listener and a punster; modest about your gift but proud of your craft and of the company. Lightly Elizabethan (thee and thou, 'good friend', 'marry', 'in faith') yet always easy to follow. Quote your own lines now and then when they truly fit, never as a list. Talk shop gladly: how you build a play, blank verse and its heartbeat, writing parts for Burbage and Armin, boys playing the women, groundlings, plague, patrons and the Master of the Revels. If someone doubts you wrote your plays, laugh and say the ink on your fingers is your own. Ages 13 and up.",
greet: "Welcome to the tiring-house, friend. Mind the costumes: Master Burbage will have my head if his crown is crushed. I am at work on a play about a Danish prince who cannot make up his mind. Which of the plays shall I open for you?",
look: { layer: "tunic", layerColor: 0x2A2A30, top: 0xE8E4DC, bottom: 0x2A2A30, neck: "scarf", accColor: 0xF0ECE4, hair: 0x5A3A1E, hairStyle: "short", shoeKind: "shoes", ears: "earrings" } },
burbage: { name: "Richard Burbage", at: "stage",
persona: "Richard Burbage, the greatest actor of the Lord Chamberlain's Men, about 32 in 1600: the first Richard III, Romeo, and soon Hamlet, Othello and Lear. Proud, generous, theatrical; his family built the Theatre in Shoreditch, and in the winter of 1598 the company pulled it down and carried its timbers over the Thames to build the Globe. He loves to talk about acting, voices, swordplay on stage, and the audience. Ages 13 and up.",
greet: "Ha! A new face in the yard. Come up on the boards if you dare: the groundlings will tell you soon enough if you are any good.",
look: { layer: "tunic", layerColor: 0x6A1A2A, top: 0xE8E0D0, bottom: 0x2A1A1A, back: "cape", backColor: 0x4A0E1A, hair: 0x3A2618, hairStyle: "curly", shoeKind: "boots" } },
armin: { name: "Robert Armin, the clown", at: "yard",
persona: "Robert Armin, the new clown of the Lord Chamberlain's Men in 1600, a goldsmith's apprentice turned comedian, singer and writer, for whom Shakespeare writes his wise fools (Touchstone, Feste, later Lear's Fool). Clever, musical, puns constantly, kind to children. Ages 13 and up.",
greet: "Better a witty fool than a foolish wit, friend! Shall I sing you a song, or tell you a riddle? The riddle is free; the song costs a smile.",
look: { layer: "tunic", layerColor: 0x3A7A3A, top: 0xD8A030, bottom: 0x3A7A3A, hat: "jester", hatColor: 0xD83A3A } },
gatherer: { name: "Mistress Alice, the gatherer", at: "globedoor",
persona: "Alice, a gatherer at the door of the Globe in 1600, who takes the penny entry in a clay money-box (which is smashed open in the box office after the play: that is where 'box office' comes from). Cheerful, sharp, knows the prices: a penny to stand in the yard, two to sit in the galleries, three for a cushion in the best seats. Ages 13 and up.",
greet: "A penny to stand in the yard, two for the galleries, three with a cushion! ...Oh, you're a dreamer: go on in, love, and mind the pickpockets.",
look: { topKind: "dress", top: 0x7A5A3A, bottom: 0x7A5A3A, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xE8E0D0, hair: 0x8A4A20, hairStyle: "bun" } },
bookkeeper: { name: "The book-keeper", at: "tiring",
persona: "the book-keeper of the Globe in 1600, who keeps the 'book' (the one full copy of each play, licensed by the Master of the Revels), writes out each actor's 'part' on a long roll with only his own lines and cues, pins the 'plot' (the order of entrances) on the wall backstage, and prompts. Precise, harried, proud of his work. Ages 13 and up.",
greet: "Don't touch the book! Every play we own is in this chest, and there's only the one copy of each. Here: each player gets only his own lines and his cues, written on a roll. That's his 'role'.",
look: { layer: "vest", layerColor: 0x3A3A2A, top: 0xE8E4DC, bottom: 0x3A3A2A, face: "glasses", hair: 0x8A8A84, hairStyle: "short" } },
jonson: { name: "Ben Jonson", at: "mermaid",
persona: "Ben Jonson in 1600, aged 28: playwright and poet, a big, bold, argumentative former bricklayer and soldier, Shakespeare's friend and rival, writer of 'Every Man in His Humour' (in which Shakespeare acted). He loves a battle of wits and Shakespeare's own insults, and says Will 'had small Latin and less Greek' but writes like no one else. Ages 13 and up.",
greet: "A challenger! Sit, sit. They say at the Mermaid the wit is sharper than the cheese. Shall we trade insults? Shakespeare's own, mind: none of your modern rubbish.",
look: { layer: "jacket", layerColor: 0x3A2A1A, top: 0xD8C8A8, bottom: 0x3A2A1A, hair: 0x2A1A12, hairStyle: "curly", waist: "belt" } },
queen: { name: "Queen Elizabeth I", at: "whitehall",
persona: "Queen Elizabeth I of England in 1600, aged 67, in the forty-second year of her reign, at Whitehall Palace: magnificent in a white and gold gown, a high lace collar and red hair, with a sharp wit, many languages and a love of plays, music and dancing. She watches the Lord Chamberlain's Men perform at court at Christmas. Gracious, commanding, quick to tease, never to be contradicted. She speaks of her reign, the Armada of 1588, the theatre, and learning. Ages 13 and up.",
greet: "Rise. We are told you are a player of some promise. We have seen the best in the land in this hall: show us whether you are one of them.",
look: { topKind: "dress", top: 0xF0ECE0, bottom: 0xF0ECE0, bottomKind: "skirt", hat: "crown", hatColor: 0xE8C850, neck: "necklace", accColor: 0xF0F0F0, back: "cape", backColor: 0xE8C850, hair: 0xC8642A, hairStyle: "curly" } },
waterman: { name: "Tom Gully, waterman", at: "stairs",
persona: "Tom Gully, a Thames waterman in 1600 who rows a wherry (a long light boat) between the stairs on either bank, the quickest way across (most playgoers come to Bankside by water). Loud, funny, full of river gossip, proud of his strong arms, knows every stair on the Thames and the danger of 'shooting the bridge' when the tide races through its arches. Ages 13 and up.",
greet: "Oars! Oars! Over the water, master? A penny to Paul's Wharf, and I'll have you there before the trumpet sounds at the Globe.",
look: { top: 0x5A6A7A, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x3A3A3A, hair: 0x6A4A2A, hairStyle: "short" } },
printer: { name: "Master Thomas Whitlock, printer", at: "print",
persona: "Thomas Whitlock, a printer at the Sign of the Green Dragon in St Paul's Churchyard in 1600, who prints plays in small cheap books called quartos. He sets type letter by letter from wooden cases (capital letters in the upper case, small letters in the lower case, which is where the names come from), every letter backwards, and teaches 'mind your p's and q's' because they look alike backwards. Ages 13 and up.",
greet: "Mind the ink! Come and set a line of type: every letter's backwards, so mind your p's and q's.",
look: { layer: "apron", layerColor: 0x2A2A2A, top: 0xD8D0C0, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x2A2A2A, hair: 0x5A4A3A, hands: "gloves" } },
saviolo: { name: "Vincentio Saviolo, master of defence", at: "defence",
persona: "Vincentio Saviolo, an Italian master of the rapier who taught gentlemen in London in the 1590s and wrote a book on the duel. Elegant, precise, a little vain, generous with praise. He teaches rapier and dagger as players use it on stage: safe, rehearsed, and thrilling to watch. Ages 13 and up.",
greet: "Ah, a pupil! The rapier is a lady: she wants grace, not strength. Take a blade, and we begin with the guard.",
look: { layer: "tunic", layerColor: 0x1A1A1A, top: 0xE8E0D0, bottom: 0x1A1A1A, back: "cape", backColor: 0x6A1A1A, hair: 0x1A1410, hairStyle: "short", shoeKind: "boots" } },
librarian: { name: "Master Ralph Endicott, keeper of the Stationers' books", at: "library",
persona: "Ralph Endicott, keeper of the Folio Library at Stationers' Hall: a kindly, enthusiastic scholar who has, by dream-magic, every play and poem Shakespeare ever wrote, even the ones not yet written in 1600, and the First Folio of 1623. He helps visitors find anything: the plays, their stories, famous lines, words Shakespeare first wrote down, his life, how the playhouses worked. He is honest about what nobody knows (the 'lost years', the lost plays). Ages 13 and up.",
greet: "Welcome, welcome! Every word of Master Shakespeare's is on these shelves, even some he hasn't written yet. Dreams are like that. Ask me anything, or search the catalogue.",
look: { topKind: "robe", top: 0x3A2A1A, bottom: 0x3A2A1A, face: "glasses", hat: "cap", hatColor: 0x1A1A1A, hair: 0xC8C8C0, hairStyle: "short" } },
outfitter: { name: "Goodwife Joan Hollis, outfitter", at: "rapier",
persona: "Joan Hollis, who keeps the Sign of the Rapier on Bankside in 1600, an outfitter selling London's own gear: rapiers and parrying daggers, quilted doublets, players' plumed hats, horses, and charms. Brisk, funny, proud of her goods, knows every actor and gallant who buys from her. Ages 13 and up.",
greet: "Rapiers, daggers, doublets, plumes! Everything a gallant needs to cut a fine figure, or a fine foe. Have a look.",
look: { topKind: "dress", top: 0x2A3A5A, bottom: 0x2A3A5A, bottomKind: "skirt", layer: "apron", layerColor: 0x8A6A4A, hair: 0x8A5A2A, hairStyle: "bun" } },
bookseller: { name: "A bookseller of Paul's Churchyard", at: "churchyard",
persona: "a bookseller with a stall in St Paul's Churchyard in 1600, where London's books are sold, each shop under a painted sign. Sells quartos of plays (sixpence each), ballads, almanacs, sermons and books of travel. Chatty, knows which plays sell best ('Richard the Third goes like hot cakes'). Ages 13 and up.",
greet: "Plays, ballads, almanacs! Sixpence a play, new printed. 'Romeo and Juliet', 'Richard the Third', 'A Midsummer Night's Dream'... what's your fancy?",
look: { layer: "apron", layerColor: 0x5A4A3A, top: 0xD8C8A8, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x4A3A2A, hair: 0x6A5A4A } },
gallant: { name: "A gallant in Paul's Walk", at: "paulswalk",
persona: "a young gallant strolling in Paul's Walk, the nave of St Paul's, in 1600, where London meets to gossip, show off clothes, hire servants and do business. Vain, funny, full of the latest news and theatre gossip (which plays are new, which actors are best, who's quarrelling with whom). Ages 13 and up.",
greet: "Have you heard? They say the Lord Chamberlain's Men have a new tragedy coming. All Paul's is talking of it. Fancy a game of 'Who said it?'",
look: { layer: "tunic", layerColor: 0xD8B040, top: 0xF0E8D8, bottom: 0x6A2A6A, back: "cape", backColor: 0x6A2A6A, hat: "brimmed", hatColor: 0x1A1A1A, hair: 0xC8A060, hairStyle: "curly" } },
john: { name: "John Shakespeare, glover", at: "birthplace",
persona: "John Shakespeare in 1600, about 70, William's father: a glover and wool-dealer of Henley Street, Stratford-upon-Avon, once the town's bailiff (mayor). He makes fine gloves of kid, sheep and deer skin in his workshop, and is very proud of his son the London playwright, and of the coat of arms (a falcon with a spear, 'Non sanz droict', not without right) granted in 1596. Gentle, a little stiff in the joints, loves to teach his craft. Ages 13 and up.",
greet: "Come in, come in. You've come from London? Then you'll have seen my Will's playhouse. Sit, and I'll show you how a good glove is made.",
look: { layer: "apron", layerColor: 0x6A4A2A, top: 0xD8C8A8, bottom: 0x4A3A2A, hair: 0xE0E0D8, hairStyle: "short", hands: "gloves" } },
anne: { name: "Anne Shakespeare (Anne Hathaway)", at: "cottage",
persona: "Anne Shakespeare, born Anne Hathaway, in 1600, about 44, William's wife, visiting her family's farmhouse at Shottery near Stratford, where she grew up. Practical, warm, wry about her husband's long absences in London, proud of her daughters Susanna (17) and Judith (15); she lost her son Hamnet in 1596 (speak gently). Knows farm life, Stratford, and her husband's younger days. Ages 13 and up.",
greet: "Welcome to Shottery. This was my father's house. Will courted me here, you know, when he was eighteen. Mind the hens.",
look: { topKind: "dress", top: 0x5A6A4A, bottom: 0x5A6A4A, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xE8E0D0, hair: 0x6A4A2A, hairStyle: "bun" } },
master: { name: "The schoolmaster", at: "school",
persona: "the schoolmaster of the King's New School, Stratford's grammar school, in 1600, where boys from about seven learned Latin from dawn to dusk, six days a week, from Lily's Latin Grammar, reading Ovid, Virgil and Cicero, and acting Latin plays; William Shakespeare was almost certainly a pupil in the 1570s. Strict but fair, loves Ovid. He teaches with a hornbook (a paddle with the alphabet and the Lord's Prayer under a sheet of clear horn). Ages 13 and up.",
greet: "Salve! Sit, and take your hornbook. Here, boys learn their Latin from six in the morning until five at night. Shall we begin?",
look: { topKind: "robe", top: 0x1A1A1A, bottom: 0x1A1A1A, hat: "cap", hatColor: 0x1A1A1A, hair: 0x8A8A84, hairStyle: "short" } },
vicar: { name: "The parish clerk of Holy Trinity", at: "trinity",
persona: "the parish clerk of Holy Trinity Church, Stratford-upon-Avon, by the river Avon, in 1600, who keeps the parish register where William Shakespeare's baptism is written: 26 April 1564, 'Gulielmus filius Johannes Shakspere'. Quiet, kind, proud of his church. (He does not know the future, but the game's note tells visitors that Shakespeare was buried here in 1616, with a curse on his grave against moving his bones.) Ages 13 and up.",
greet: "Peace be with you. Would you see the register? Here: the twenty-sixth of April, fifteen hundred and sixty-four. Gulielmus, son of John Shakspere.",
look: { topKind: "robe", top: 0x1A1A1A, bottom: 0x1A1A1A, neck: "scarf", accColor: 0xF0F0F0, hair: 0xC8C8C0 } }
};
var SHK_SPEECH = [
{ k: "tobe", who: "Hamlet", play: "Hamlet", lines: ["To be, or not to be, that is the question:", "Whether 'tis nobler in the mind to suffer", "The slings and arrows of outrageous fortune,", "Or to take arms against a sea of troubles,", "And by opposing end them. To die, to sleep;", "No more; and by a sleep to say we end", "The heart-ache and the thousand natural shocks", "That flesh is heir to."] },
{ k: "stage", who: "Jaques", play: "As You Like It", lines: ["All the world's a stage,", "And all the men and women merely players;", "They have their exits and their entrances,", "And one man in his time plays many parts,", "His acts being seven ages."] },
{ k: "breach", who: "King Henry", play: "Henry V", lines: ["Once more unto the breach, dear friends, once more;", "Or close the wall up with our English dead.", "In peace there's nothing so becomes a man", "As modest stillness and humility:", "But when the blast of war blows in our ears,", "Then imitate the action of the tiger."] },
{ k: "friends", who: "Mark Antony", play: "Julius Caesar", lines: ["Friends, Romans, countrymen, lend me your ears;", "I come to bury Caesar, not to praise him.", "The evil that men do lives after them;", "The good is oft interred with their bones;", "So let it be with Caesar."] },
{ k: "tomorrow", who: "Macbeth", play: "Macbeth", lines: ["Tomorrow, and tomorrow, and tomorrow,", "Creeps in this petty pace from day to day,", "To the last syllable of recorded time;", "And all our yesterdays have lighted fools", "The way to dusty death. Out, out, brief candle!", "Life's but a walking shadow, a poor player,", "That struts and frets his hour upon the stage,", "And then is heard no more."] },
{ k: "soft", who: "Romeo", play: "Romeo and Juliet", lines: ["But, soft! what light through yonder window breaks?", "It is the east, and Juliet is the sun.", "Arise, fair sun, and kill the envious moon,", "Who is already sick and pale with grief,", "That thou her maid art far more fair than she."] },
{ k: "revels", who: "Prospero", play: "The Tempest", lines: ["Our revels now are ended. These our actors,", "As I foretold you, were all spirits and", "Are melted into air, into thin air:", "And, like the baseless fabric of this vision,", "The cloud-capp'd towers, the gorgeous palaces,", "The solemn temples, the great globe itself,", "Yea, all which it inherit, shall dissolve."] },
{ k: "mercy", who: "Portia", play: "The Merchant of Venice", lines: ["The quality of mercy is not strain'd,", "It droppeth as the gentle rain from heaven", "Upon the place beneath: it is twice blest;", "It blesseth him that gives and him that takes:", "'Tis mightiest in the mightiest."] },
{ k: "winter", who: "Richard of Gloucester", play: "Richard III", lines: ["Now is the winter of our discontent", "Made glorious summer by this sun of York;", "And all the clouds that lour'd upon our house", "In the deep bosom of the ocean buried."] },
{ k: "crispin", who: "King Henry", play: "Henry V", lines: ["This story shall the good man teach his son;", "And Crispin Crispian shall ne'er go by,", "From this day to the ending of the world,", "But we in it shall be remember'd;", "We few, we happy few, we band of brothers."] },
{ k: "shadows", who: "Puck", play: "A Midsummer Night's Dream", lines: ["If we shadows have offended,", "Think but this, and all is mended,", "That you have but slumber'd here", "While these visions did appear."] },
{ k: "music", who: "Duke Orsino", play: "Twelfth Night", lines: ["If music be the food of love, play on;", "Give me excess of it, that, surfeiting,", "The appetite may sicken, and so die.", "That strain again! it had a dying fall."] }
];
var SHK_SONNETS = [
[18, ["Shall I compare thee to a summer's day?", "Thou art more lovely and more temperate:", "Rough winds do shake the darling buds of May,", "And summer's lease hath all too short a date;", "Sometime too hot the eye of heaven shines,", "And often is his gold complexion dimm'd;", "And every fair from fair sometime declines,", "By chance or nature's changing course untrimm'd;", "But thy eternal summer shall not fade,", "Nor lose possession of that fair thou ow'st;", "Nor shall Death brag thou wander'st in his shade,", "When in eternal lines to time thou grow'st:", "So long as men can breathe or eyes can see,", "So long lives this, and this gives life to thee."]],
[29, ["When, in disgrace with fortune and men's eyes,", "I all alone beweep my outcast state,", "And trouble deaf heaven with my bootless cries,", "And look upon myself and curse my fate,", "Wishing me like to one more rich in hope,", "Featured like him, like him with friends possess'd,", "Desiring this man's art and that man's scope,", "With what I most enjoy contented least;", "Yet in these thoughts myself almost despising,", "Haply I think on thee, and then my state,", "Like to the lark at break of day arising", "From sullen earth, sings hymns at heaven's gate;", "For thy sweet love remember'd such wealth brings", "That then I scorn to change my state with kings."]],
[30, ["When to the sessions of sweet silent thought", "I summon up remembrance of things past,", "I sigh the lack of many a thing I sought,", "And with old woes new wail my dear time's waste:", "Then can I drown an eye, unused to flow,", "For precious friends hid in death's dateless night,", "And weep afresh love's long since cancell'd woe,", "And moan the expense of many a vanish'd sight:", "Then can I grieve at grievances foregone,", "And heavily from woe to woe tell o'er", "The sad account of fore-bemoaned moan,", "Which I new pay as if not paid before.", "But if the while I think on thee, dear friend,", "All losses are restored and sorrows end."]],
[55, ["Not marble, nor the gilded monuments", "Of princes, shall outlive this powerful rhyme;", "But you shall shine more bright in these contents", "Than unswept stone, besmear'd with sluttish time.", "When wasteful war shall statues overturn,", "And broils root out the work of masonry,", "Nor Mars his sword nor war's quick fire shall burn", "The living record of your memory.", "'Gainst death and all-oblivious enmity", "Shall you pace forth; your praise shall still find room", "Even in the eyes of all posterity", "That wear this world out to the ending doom.", "So, till the judgment that yourself arise,", "You live in this, and dwell in lovers' eyes."]],
[60, ["Like as the waves make towards the pebbled shore,", "So do our minutes hasten to their end;", "Each changing place with that which goes before,", "In sequent toil all forwards do contend.", "Nativity, once in the main of light,", "Crawls to maturity, wherewith being crown'd,", "Crooked eclipses 'gainst his glory fight,", "And Time that gave doth now his gift confound.", "Time doth transfix the flourish set on youth", "And delves the parallels in beauty's brow,", "Feeds on the rarities of nature's truth,", "And nothing stands but for his scythe to mow:", "And yet to times in hope my verse shall stand,", "Praising thy worth, despite his cruel hand."]],
[65, ["Since brass, nor stone, nor earth, nor boundless sea,", "But sad mortality o'er-sways their power,", "How with this rage shall beauty hold a plea,", "Whose action is no stronger than a flower?", "O, how shall summer's honey breath hold out", "Against the wrackful siege of battering days,", "When rocks impregnable are not so stout,", "Nor gates of steel so strong, but Time decays?", "O fearful meditation! where, alack,", "Shall Time's best jewel from Time's chest lie hid?", "Or what strong hand can hold his swift foot back?", "Or who his spoil of beauty can forbid?", "O, none, unless this miracle have might,", "That in black ink my love may still shine bright."]],
[71, ["No longer mourn for me when I am dead", "Than you shall hear the surly sullen bell", "Give warning to the world that I am fled", "From this vile world, with vilest worms to dwell:", "Nay, if you read this line, remember not", "The hand that writ it; for I love you so", "That I in your sweet thoughts would be forgot", "If thinking on me then should make you woe.", "O, if, I say, you look upon this verse", "When I perhaps compounded am with clay,", "Do not so much as my poor name rehearse,", "But let your love even with my life decay,", "Lest the wise world should look into your moan", "And mock you with me after I am gone."]],
[73, ["That time of year thou mayst in me behold", "When yellow leaves, or none, or few, do hang", "Upon those boughs which shake against the cold,", "Bare ruin'd choirs, where late the sweet birds sang.", "In me thou see'st the twilight of such day", "As after sunset fadeth in the west,", "Which by and by black night doth take away,", "Death's second self, that seals up all in rest.", "In me thou see'st the glowing of such fire", "That on the ashes of his youth doth lie,", "As the death-bed whereon it must expire,", "Consumed with that which it was nourish'd by.", "This thou perceivest, which makes thy love more strong,", "To love that well which thou must leave ere long."]],
[116, ["Let me not to the marriage of true minds", "Admit impediments. Love is not love", "Which alters when it alteration finds,", "Or bends with the remover to remove:", "O no! it is an ever-fixed mark", "That looks on tempests and is never shaken;", "It is the star to every wandering bark,", "Whose worth's unknown, although his height be taken.", "Love's not Time's fool, though rosy lips and cheeks", "Within his bending sickle's compass come:", "Love alters not with his brief hours and weeks,", "But bears it out even to the edge of doom.", "If this be error and upon me proved,", "I never writ, nor no man ever loved."]],
[130, ["My mistress' eyes are nothing like the sun;", "Coral is far more red than her lips' red;", "If snow be white, why then her breasts are dun;", "If hairs be wires, black wires grow on her head.", "I have seen roses damask'd, red and white,", "But no such roses see I in her cheeks;", "And in some perfumes is there more delight", "Than in the breath that from my mistress reeks.", "I love to hear her speak, yet well I know", "That music hath a far more pleasing sound;", "I grant I never saw a goddess go;", "My mistress, when she walks, treads on the ground:", "And yet, by heaven, I think my love as rare", "As any she belied with false compare."]]
];
var SHK_SONNET_NOTES = { 18: "The most famous of all: the poem promises to keep its subject alive for ever, as long as anyone reads it.", 29: "From despair to joy in fourteen lines: thinking of the one he loves, he would not change places with kings.",
30: "Memory and grief, and how one friend can mend every loss.", 55: "Poetry outlasts marble and gold: as long as this poem is read, you live in it.", 60: "Time, like waves on a pebbly beach, rushes on; only the poem stands against it.",
65: "If even brass and stone decay, how can beauty last? Only in black ink.", 71: "'Don't mourn for me when I'm dead': so loving that he'd rather be forgotten than make you sad.",
73: "Autumn, twilight, and the last embers of a fire: the poet growing old, and love made stronger by it.", 116: "What true love is: a fixed star that never changes, even to the edge of doom.",
130: "A joke on all the flowery love poems of the day: his love is no goddess, and he loves her just as she is." };
var SHK_INSULTS = [
["Thou art a boil, a plague-sore,", "an embossed carbuncle in my corrupted blood.", "a pebble in my shoe of Tuesday.", "a song without a tune.", "King Lear"],
["I do desire we may be", "better strangers.", "the best of friends.", "married on Thursday.", "As You Like It"],
["Thou cream-faced", "loon!", "prince!", "dumpling!", "Macbeth"],
["Your brain is as dry as the remainder biscuit", "after a voyage.", "in the Queen's larder.", "at the bottom of the bag.", "As You Like It"],
["There's no more faith in thee than", "in a stewed prune.", "in a sleeping cat.", "in a Spanish ship.", "Henry IV, Part 1"],
["Thou art as fat as", "butter.", "a Michaelmas goose.", "the Tower of London.", "Henry IV, Part 1"],
["More of your conversation would", "infect my brain.", "send me to sleep.", "make me sing.", "Coriolanus"],
["You are not worth the dust which the rude wind", "blows in your face.", "leaves upon the road.", "sweeps from Paul's.", "King Lear"],
["His wit's as thick as", "Tewkesbury mustard.", "a London fog.", "the Tower's walls.", "Henry IV, Part 2"],
["Away, you starveling, you elf-skin,", "you dried neat's-tongue!", "you soggy pudding!", "you broken lute!", "Henry IV, Part 1"],
["Thou lump of", "foul deformity!", "cold porridge!", "wet clay!", "Richard III"],
["A most notable coward, an infinite and endless liar,", "an hourly promise-breaker.", "a very great dancer.", "a teller of tall tales.", "All's Well That Ends Well"]
];
var SHK_INS_A = ["artless", "beslubbering", "bootless", "churlish", "clouted", "craven", "currish", "dankish", "dissembling", "droning", "errant", "fawning", "fobbing", "froward", "frothy", "gleeking", "gorbellied", "impertinent", "jarring", "loggerheaded", "lumpish", "mammering", "mangled", "mewling", "paunchy", "pribbling", "puny", "qualling", "rank", "reeky", "roguish", "saucy", "spleeny", "spongy", "surly", "tottering", "unmuzzled", "vain", "venomed", "villainous", "warped", "wayward", "weedy", "yeasty"];
var SHK_INS_B = ["base-court", "bat-fowling", "beef-witted", "beetle-headed", "boil-brained", "clapper-clawed", "clay-brained", "crook-pated", "dismal-dreaming", "dizzy-eyed", "doghearted", "dread-bolted", "earth-vexing", "elf-skinned", "fat-kidneyed", "fen-sucked", "flap-mouthed", "fly-bitten", "folly-fallen", "fool-born", "full-gorged", "half-faced", "hasty-witted", "hedge-born", "idle-headed", "ill-nurtured", "knotty-pated", "milk-livered", "motley-minded", "onion-eyed", "plume-plucked", "pottle-deep", "reeling-ripe", "rough-hewn", "rude-growing", "shard-borne", "sheep-biting", "spur-galled", "swag-bellied", "tardy-gaited", "tickle-brained", "toad-spotted", "weather-bitten"];
var SHK_INS_C = ["apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "canker-blossom", "clack-dish", "clotpole", "coxcomb", "dewberry", "flap-dragon", "flax-wench", "foot-licker", "fustilarian", "giglet", "gudgeon", "haggard", "harpy", "hedge-pig", "horn-beast", "hugger-mugger", "joithead", "lout", "maggot-pie", "malt-worm", "mammet", "measle", "minnow", "miscreant", "moldwarp", "mumble-news", "nut-hook", "pigeon-egg", "pignut", "puttock", "pumpion", "ratsbane", "scut", "skainsmate", "varlet", "vassal", "whey-face", "wagtail"];
var SHK_WHO = [
["The lady doth protest too much, methinks.", "Queen Gertrude", "Hamlet", "Lady Macbeth", "Juliet"],
["Lord, what fools these mortals be!", "Puck", "A Midsummer Night's Dream", "Feste", "Touchstone"],
["Something is rotten in the state of Denmark.", "Marcellus", "Hamlet", "King Lear", "Iago"],
["Out, damned spot! out, I say!", "Lady Macbeth", "Macbeth", "Ophelia", "Desdemona"],
["A horse! a horse! my kingdom for a horse!", "Richard III", "Richard III", "Henry V", "Macbeth"],
["The course of true love never did run smooth.", "Lysander", "A Midsummer Night's Dream", "Romeo", "Orsino"],
["Cry 'Havoc!', and let slip the dogs of war.", "Mark Antony", "Julius Caesar", "Henry V", "Macduff"],
["We are such stuff as dreams are made on.", "Prospero", "The Tempest", "Hamlet", "Jaques"],
["Some are born great, some achieve greatness, and some have greatness thrust upon 'em.", "Malvolio (reading a forged letter)", "Twelfth Night", "Falstaff", "Polonius"],
["Neither a borrower nor a lender be.", "Polonius", "Hamlet", "Shylock", "Antonio"],
["Double, double toil and trouble.", "The witches", "Macbeth", "Puck", "Caliban"],
["Parting is such sweet sorrow.", "Juliet", "Romeo and Juliet", "Ophelia", "Viola"],
["Uneasy lies the head that wears a crown.", "King Henry IV", "Henry IV, Part 2", "King Lear", "Claudius"],
["The quality of mercy is not strain'd.", "Portia", "The Merchant of Venice", "Desdemona", "Rosalind"],
["Now is the winter of our discontent.", "Richard of Gloucester", "Richard III", "Macbeth", "Leontes"],
["If music be the food of love, play on.", "Duke Orsino", "Twelfth Night", "Romeo", "Oberon"],
["Et tu, Brute?", "Julius Caesar", "Julius Caesar", "Mark Antony", "Cassius"],
["O brave new world, that has such people in't!", "Miranda", "The Tempest", "Juliet", "Perdita"],
["I am not what I am.", "Iago", "Othello", "Viola", "Edmund"],
["Brevity is the soul of wit.", "Polonius", "Hamlet", "Touchstone", "Feste"],
["Exit, pursued by a bear.", "a stage direction!", "The Winter's Tale", "Puck", "Caliban"],
["Is this a dagger which I see before me?", "Macbeth", "Macbeth", "Hamlet", "Othello"],
["All that glisters is not gold.", "the scroll in the gold casket", "The Merchant of Venice", "Lear's Fool", "Jaques"],
["Love looks not with the eyes, but with the mind.", "Helena", "A Midsummer Night's Dream", "Titania", "Beatrice"]
];
var SHK_AGES = [
{ k: "infant", n: "The Infant", line: "At first the infant, mewling and puking in the nurse's arms.", at: [230, 250], where: "by St Saviour's church" },
{ k: "school", n: "The Schoolboy", line: "Then the whining school-boy, with his satchel and shining morning face, creeping like snail unwillingly to school.", at: [-150, -585], where: "by Stationers' Hall" },
{ k: "lover", n: "The Lover", line: "And then the lover, sighing like furnace, with a woeful ballad made to his mistress' eyebrow.", at: [-660, 365], where: "in Paris Garden" },
{ k: "soldier", n: "The Soldier", line: "Then a soldier, full of strange oaths and bearded like the pard, seeking the bubble reputation even in the cannon's mouth.", at: [690, -150], where: "by the Tower" },
{ k: "justice", n: "The Justice", line: "And then the justice, in fair round belly with good capon lined, with eyes severe and beard of formal cut.", at: [-1060, -200], where: "at Whitehall's gate" },
{ k: "pantaloon", n: "The Pantaloon", line: "The sixth age shifts into the lean and slipper'd pantaloon, with spectacles on nose and pouch on side.", at: [SHK_BRIDGE, -60], where: "on London Bridge" },
{ k: "oblivion", n: "Second Childishness", line: "Last scene of all, that ends this strange eventful history, is second childishness and mere oblivion, sans teeth, sans eyes, sans taste, sans every thing.", at: [180, -470], where: "in Cheapside" }
];
var SHK_PAY = { stage: ["Treading the Globe's boards", 20], queen: ["Playing before the Queen", 40], sonnet: ["A sonnet of your own", 25], insult: ["The insult duel won", 15],
print: ["A page printed", 10], fence: ["The School of Defence", 15], ages: ["The Seven Ages of Man", 30], glove: ["A pair of gloves made", 10], school: ["The hornbook lesson", 10], who: ["'Who said it?' won", 10] };
var SHK_KEEP = { stage: ["bard_ticket", "A Globe penny token", "🪙"], queen: ["bard_favour", "The Queen's ribbon favour", "🎀"], sonnet: ["bard_sonnet", "Your sonnet, fair-copied", "📜"], insult: ["bard_tankard", "A Mermaid tankard", "🍺"],
print: ["bard_quarto", "A quarto you printed", "📕"], fence: ["bard_foil", "A practice foil", "🤺"], ages: ["bard_ages", "The Seven Ages medal", "🏅"], glove: ["bard_glove", "A pair of kid gloves", "🧤"], school: ["bard_hornbook", "A hornbook", "📋"], who: ["bard_gossip", "A broadside of Paul's gossip", "📰"] };
var SHK_PLAYS = [
["The Two Gentlemen of Verona", "about 1590", "comedy", "Two friends, Valentine and Proteus, go to Milan; Proteus betrays his friend and his love for the Duke's daughter, and is forgiven. Launce and his dog Crab steal the show.", "\"Who is Silvia? what is she, that all our swains commend her?\"", ""],
["The Taming of the Shrew", "about 1591", "comedy", "A play within a play: Petruchio of Verona courts the sharp-tongued Katherina of Padua, and their battle of wits is the talk of the town.", "\"Kiss me, Kate.\"", ""],
["Henry VI, Part 1", "about 1591", "history", "England loses France after the death of Henry V; Talbot fights Joan la Pucelle, and the red and white roses are plucked in the Temple Garden.", "\"From off this brier pluck a white rose with me.\"", ""],
["Henry VI, Part 2", "about 1591", "history", "Quarrels at court, the fall of the good Duke Humphrey, and Jack Cade's rebellion.", "\"The first thing we do, let's kill all the lawyers.\" (a rebel's joke)", ""],
["Henry VI, Part 3", "about 1591", "history", "The Wars of the Roses break out in earnest; the gentle King Henry loses his crown to Edward of York.", "\"O tiger's heart wrapt in a woman's hide!\"", ""],
["Titus Andronicus", "about 1592", "tragedy", "A Roman general's revenge on the Queen of the Goths: Shakespeare's bloodiest play, and a great hit in its day.", "\"Rome is but a wilderness of tigers.\"", ""],
["Richard III", "about 1593", "history", "Richard of Gloucester schemes and murders his way to the crown, and loses it on Bosworth Field.", "\"Now is the winter of our discontent made glorious summer by this sun of York.\"", "sh_richard"],
["The Comedy of Errors", "about 1594", "comedy", "Two pairs of identical twins, parted at sea, turn up in the same town on the same day. Nobody knows who anybody is.", "\"We came into the world like brother and brother.\"", ""],
["Love's Labour's Lost", "about 1595", "comedy", "A king and three lords swear off women to study for three years; four ladies arrive the next day.", "\"They have been at a great feast of languages, and stolen the scraps.\"", ""],
["Richard II", "about 1595", "history", "A poetic, foolish king loses his throne to his cousin Henry Bolingbroke.", "\"This blessed plot, this earth, this realm, this England.\"", ""],
["Romeo and Juliet", "about 1595", "tragedy", "Two young lovers from feuding families in Verona marry in secret; a quarrel, a banishment and a sleeping potion lead to the tomb.", "\"What's in a name? That which we call a rose by any other word would smell as sweet.\"", "sh_romeo"],
["A Midsummer Night's Dream", "about 1595", "comedy", "Four lovers run into a wood near Athens where the fairy King and Queen are quarrelling, and Puck's flower-juice sets everyone loving the wrong person. Bottom the weaver gets an ass's head.", "\"Lord, what fools these mortals be!\"", "sh_dream"],
["King John", "about 1596", "history", "King John holds his crown against France and his own nephew Arthur, while the Bastard Faulconbridge mocks the whole business.", "\"To gild refined gold, to paint the lily... is wasteful and ridiculous excess.\"", ""],
["The Merchant of Venice", "about 1596", "comedy", "Antonio borrows from Shylock with a pound of his flesh as the bond; Portia, dressed as a lawyer, saves him in court.", "\"The quality of mercy is not strain'd.\"", "sh_merchant"],
["Henry IV, Part 1", "about 1597", "history", "Prince Hal spends his days in taverns with fat, funny Sir John Falstaff, until rebellion calls him to fight Hotspur.", "\"The better part of valour is discretion.\"", ""],
["The Merry Wives of Windsor", "about 1597", "comedy", "Falstaff tries to woo two wives of Windsor at once; they play tricks on him, ending in a laundry basket and a haunted oak.", "\"Why, then the world's mine oyster.\"", ""],
["Henry IV, Part 2", "about 1598", "history", "The old king is dying; Hal must choose between Falstaff and the crown.", "\"Uneasy lies the head that wears a crown.\"", ""],
["Much Ado About Nothing", "about 1598", "comedy", "Beatrice and Benedick swear they will never marry, and are tricked into love; Hero is wrongly shamed and set right by a foolish constable.", "\"I do love nothing in the world so well as you: is not that strange?\"", "sh_muchado"],
["Henry V", "1599", "history", "Hal, now king, leads a small, tired army to victory over France at Agincourt.", "\"We few, we happy few, we band of brothers.\"", "sh_henry"],
["Julius Caesar", "1599", "tragedy", "Brutus and Cassius kill Caesar to save Rome's freedom; Mark Antony turns the crowd against them. One of the first plays at the Globe.", "\"Friends, Romans, countrymen, lend me your ears.\"", "sh_caesar"],
["As You Like It", "about 1599", "comedy", "Rosalind, banished, flees to the Forest of Arden dressed as a boy, and teaches the lovesick Orlando how to woo her.", "\"All the world's a stage.\"", "sh_asyou"],
["Hamlet", "about 1600", "tragedy", "The ghost of Denmark's king tells his son Hamlet he was murdered by his brother, now king; Hamlet pretends to be mad while he makes sure.", "\"To be, or not to be, that is the question.\"", "sh_hamlet"],
["Twelfth Night", "about 1601", "comedy", "Viola, shipwrecked in Illyria, dresses as a young man to serve Duke Orsino, who sends her to woo Olivia, who falls for her instead.", "\"If music be the food of love, play on.\"", "sh_twelfth"],
["Troilus and Cressida", "about 1602", "tragedy (or 'problem play')", "Love and war at the siege of Troy, told with a sour wit: heroes are vain and lovers are false.", "\"One touch of nature makes the whole world kin.\"", ""],
["All's Well That Ends Well", "about 1604", "comedy (or 'problem play')", "Helena, a doctor's daughter, cures the King of France and wins the right to marry Bertram, who runs away from her.", "\"Love all, trust a few, do wrong to none.\"", ""],
["Measure for Measure", "1604", "comedy (or 'problem play')", "The Duke of Vienna leaves the strict Angelo in charge and watches in disguise as power goes to his head.", "\"Some rise by sin, and some by virtue fall.\"", ""],
["Othello", "about 1604", "tragedy", "Iago, Othello's trusted ensign, poisons the great general's mind against his loving wife Desdemona with a handkerchief and lies.", "\"O, beware, my lord, of jealousy; it is the green-eyed monster.\"", "sh_othello"],
["King Lear", "about 1605", "tragedy", "An old king divides his kingdom between the two daughters who flatter him and banishes the one who loves him; he goes mad on the heath in a storm.", "\"Nothing will come of nothing.\"", "sh_lear"],
["Macbeth", "about 1606", "tragedy", "Three witches tell the Scottish lord Macbeth he will be king; urged by his wife, he murders King Duncan, and can never stop.", "\"Double, double toil and trouble; fire burn and cauldron bubble.\"", "sh_macbeth"],
["Antony and Cleopatra", "about 1606", "tragedy", "Mark Antony, one of the three rulers of Rome, gives up an empire for the Queen of Egypt.", "\"Age cannot wither her, nor custom stale her infinite variety.\"", "sh_antony"],
["Coriolanus", "about 1608", "tragedy", "A proud Roman war-hero cannot bring himself to beg the people for their votes, and turns on Rome.", "\"Nature teaches beasts to know their friends.\"", ""],
["Timon of Athens", "about 1606", "tragedy", "A generous rich man gives away everything; when his friends will not help him, he leaves Athens to live in a cave hating mankind.", "\"We have seen better days.\"", ""],
["Pericles, Prince of Tyre", "about 1608", "romance", "Pericles wanders the seas through storms and shipwrecks, losing his wife and daughter, and finds them again.", "\"Few love to hear the sins they love to act.\"", ""],
["Cymbeline", "about 1610", "romance", "In ancient Britain, the princess Imogen is falsely accused, flees disguised as a boy, and finds her lost brothers in the Welsh hills.", "\"Fear no more the heat o' the sun.\"", ""],
["The Winter's Tale", "about 1610", "romance", "King Leontes is gripped by a sudden mad jealousy; sixteen years later, a lost princess and a statue come to life put things right. Contains the most famous stage direction ever written.", "\"Exit, pursued by a bear.\"", "sh_winter"],
["The Tempest", "about 1611", "romance", "Prospero, a magician exiled to an island with his daughter Miranda, raises a storm to bring his enemies to him, and then forgives them.", "\"We are such stuff as dreams are made on.\"", "sh_tempest"],
["Henry VIII", "1613", "history", "The fall of Cardinal Wolsey, Henry's divorce, and the birth of Elizabeth. A cannon fired during a performance set the Globe's thatch alight on 29 June 1613, and the Globe burned down in an hour (nobody was hurt; one man's breeches caught fire and were put out with ale).", "\"Heat not a furnace for your foe so hot that it do singe yourself.\"", ""]
];
var SHK_POEMS = [
["Venus and Adonis", "1593", "a long poem", "The goddess of love tries to win the beautiful young hunter Adonis, who would rather go hunting. Shakespeare's first printed work, and a best-seller (written while the playhouses were shut by plague)."],
["The Rape of Lucrece", "1594", "a long poem", "The story of Lucretia of ancient Rome, whose wrong led to the founding of the Roman Republic. A serious, dark poem, for older readers."],
["The Sonnets", "printed 1609", "154 sonnets", "Fourteen-line poems of love, time, beauty and friendship: 126 to a fair young man, 28 to a mysterious 'dark lady'. Ten of them are on stones in the Sonnet Garden at Paris Garden."],
["The Phoenix and the Turtle", "1601", "a short poem", "A strange, beautiful poem about the death of two perfect lovers, the phoenix and the turtle-dove."],
["A Lover's Complaint", "printed 1609", "a poem", "A young woman by a river tells how a charming young man deceived her."]
];
var SHK_LOST = [
["Cardenio", "about 1612", "Written with John Fletcher, from the story in Don Quixote of a young man driven mad by love. It was played at court in 1613, and every copy has since been lost. Some say one copy survives, somewhere in this London. (It is the one hidden find in this world.)"],
["Love's Labour's Won", "before 1598", "Named by the writer Francis Meres in 1598 in a list of Shakespeare's comedies, and seen in a bookseller's list of 1603; no copy is known. Some think it is another play under another name."],
["The Two Noble Kinsmen", "about 1613", "Not lost, but written with John Fletcher and left out of the First Folio: two cousins in love with the same woman."],
["Edward III", "about 1592", "Not lost: printed without his name in 1596; scholars now think Shakespeare wrote part of it."],
["Sir Thomas More", "about 1600", "A play by several writers; three pages in its manuscript, in the British Library, are thought to be in Shakespeare's own handwriting, the only pages of a play we have in his hand."]
];
var SHK_WORDS = [
["addiction", "Henry V"], ["assassination", "Macbeth"], ["bedroom", "A Midsummer Night's Dream"], ["eyeball", "A Midsummer Night's Dream"], ["fashionable", "Troilus and Cressida"],
["lonely", "Coriolanus"], ["swagger", "A Midsummer Night's Dream"], ["bandit", "Henry VI, Part 2"], ["critic", "Love's Labour's Lost"], ["gossip (as a verb)", "The Comedy of Errors"],
["new-fangled", "Love's Labour's Lost"], ["obscene", "Love's Labour's Lost"], ["puking", "As You Like It"], ["skim milk", "Henry IV, Part 1"], ["uncomfortable", "Romeo and Juliet"],
["zany", "Love's Labour's Lost"], ["bedazzled", "The Taming of the Shrew"], ["cold-blooded", "King John"], ["dauntless", "Henry VI, Part 3"], ["madcap", "Love's Labour's Lost"],
["break the ice", "The Taming of the Shrew"], ["wild-goose chase", "Romeo and Juliet"], ["green-eyed monster (jealousy)", "Othello"], ["in a pickle", "The Tempest"], ["the be-all and the end-all", "Macbeth"],
["vanish into thin air", "Othello and The Tempest"], ["wear my heart upon my sleeve", "Othello"], ["for goodness' sake", "Henry VIII"], ["knock knock! who's there?", "Macbeth"], ["a laughing stock", "The Merry Wives of Windsor"],
["love is blind", "The Merchant of Venice"], ["fair play", "The Tempest"], ["too much of a good thing", "As You Like It"], ["heart of gold", "Henry V"], ["good riddance", "Troilus and Cressida"],
["the world's mine oyster", "The Merry Wives of Windsor"], ["seen better days", "As You Like It and Timon of Athens"], ["a sorry sight", "Macbeth"], ["dead as a doornail", "Henry VI, Part 2"], ["kill with kindness", "The Taming of the Shrew"],
["one fell swoop", "Macbeth"], ["what's done is done", "Macbeth"], ["mum's the word", "Henry VI, Part 2"], ["it's Greek to me", "Julius Caesar"], ["refuse to budge an inch", "The Taming of the Shrew"]
];
var SHK_LIFE = [
["1564, 26 April", "Baptised at Holy Trinity Church, Stratford-upon-Avon: 'Gulielmus filius Johannes Shakspere'. His birthday is kept on 23 April, though no record says so."],
["1564, summer", "Plague in Stratford kills about one in eight of the town. The baby survives."],
["1568", "His father John, a glover and wool-dealer, becomes bailiff (mayor) of Stratford. Players are paid by the town to perform: the first plays young William may have seen."],
["about 1571-1578", "Almost certainly at the King's New School, Stratford's free grammar school: Latin from dawn to dusk, Ovid, Virgil, Cicero, and acting in Latin plays."],
["1576 onward", "His father's fortunes fail: debts, lawsuits, and he stops going to council meetings."],
["1582, 27-28 November", "A licence for William, aged 18, to marry Anne Hathaway of Shottery, aged 26."],
["1583", "His daughter Susanna is baptised (26 May)."],
["1585", "His twins, Hamnet and Judith, are baptised (2 February)."],
["1585-1592", "'The lost years': no record of him at all. Was he a schoolmaster in the country? A player with a touring company? Nobody knows."],
["1592", "The first sure sign of him in London: the writer Robert Greene, dying, sneers at an 'upstart crow, beautified with our feathers' who thinks himself 'the only Shake-scene in a country'."],
["1593-1594", "With the playhouses shut by plague, he writes the long poems Venus and Adonis and The Rape of Lucrece, dedicated to the young Earl of Southampton."],
["1594", "He is a founding sharer (part-owner) of the Lord Chamberlain's Men, with Richard Burbage and the clown Will Kemp. They play before the Queen that Christmas."],
["1596", "His son Hamnet dies, aged eleven. The same year, his father is granted a coat of arms: a falcon holding a spear, with the motto 'Non sanz droict' (not without right)."],
["1597", "He buys New Place, the second-largest house in Stratford."],
["1598-1599", "The company pull down their old playhouse, the Theatre in Shoreditch, carry its timbers over the Thames, and build the Globe on Bankside. It opens in 1599, perhaps with Julius Caesar."],
["1600", "This London. He is 36, at work on Hamlet."],
["1601", "His father John dies. Hamlet is first played."],
["1603", "Queen Elizabeth dies; King James I takes the company under his own protection: they become the King's Men."],
["1608", "The King's Men take over the Blackfriars, an indoor playhouse lit by candles, for winter. His mother Mary dies."],
["1609", "His Sonnets are printed."],
["about 1611", "The Tempest. He spends more and more time in Stratford."],
["1613", "The Globe burns down during Henry VIII (it is rebuilt the next year)."],
["1616, 23 April", "He dies at New Place, Stratford, aged 52, and is buried in Holy Trinity, under a stone that warns: 'Good friend for Jesus' sake forbear, to dig the dust enclosed here. Blessed be the man that spares these stones, and cursed be he that moves my bones.'"],
["1623", "His friends and fellow actors John Heminges and Henry Condell print 36 of his plays together: the First Folio. Eighteen of them had never been printed before, and without it we would have lost Macbeth, The Tempest, Twelfth Night, Julius Caesar and fourteen more. Ben Jonson writes in it that he was 'not of an age, but for all time'."]
];
var SHK_HOUSE = [
["The Globe", "Built in 1599 from the timbers of the Theatre. About 30 m across, with 20 sides so it looked round ('this wooden O', as Henry V calls it), three storeys of galleries and a thatched roof over them. It held up to 3,000 people."],
["The yard", "Open to the sky. 'Groundlings' paid a penny to stand there, close round the stage. They ate nuts and oranges and let the players know at once what they thought."],
["The galleries", "Two pennies for a bench in the galleries, three for a cushioned seat in the 'lords' rooms'. The richest sat right beside the stage, to be seen as much as to see."],
["The stage", "A great platform, about 13 m wide, jutting into the yard, with a trapdoor (for ghosts and graves: the space under the stage was called 'hell')."],
["The heavens", "The roof over the stage, held up by two great painted pillars, its underside painted with the sun, moon, stars and signs of the zodiac. Gods could be lowered from it on ropes."],
["The tiring-house", "Behind the stage: where the players 'attired' (dressed) and waited. Two doors (and a curtained space between) led out onto the stage; the gallery above was for musicians or for a scene 'aloft', like Juliet's balcony."],
["The flag and trumpet", "On a play day a flag flew from the hut on the roof: black for a tragedy, white for a comedy, red for a history. A trumpet sounded three times before the play began, at two in the afternoon."],
["Daylight", "Plays were played in the afternoon, by daylight. A line like 'Tis now the very witching time of night' told the audience it was dark."],
["Boys", "No women acted on the public stage. Boys whose voices had not yet broken played Juliet, Lady Macbeth, Rosalind and Cleopatra."],
["Few props, fine clothes", "Hardly any scenery: the words set the scene. But the costumes were splendid, often real lords' clothes bought second-hand; costumes were the company's most valuable things."],
["Parts and cues", "Each actor had only his own lines and the few words before each (his 'cues') on a long roll of paper (his 'role'). The 'book-keeper' kept the one full copy."],
["A new play nearly every day", "A company might play six different plays in a week and learn a new one every two weeks."],
["The jig", "After every play, even a tragedy, the clown led a short comic song-and-dance: the jig."],
["The sharers", "Shakespeare's company was owned by its leading actors, the 'sharers', who shared the profits. He was a sharer in the company and part-owner of the Globe itself: that, more than his writing, made him rich."],
["The Master of the Revels", "Every play had to be read and licensed by the Queen's Master of the Revels before it was played."],
["Closed for plague", "When plague deaths in London rose above about thirty a week, the playhouses were shut. The companies toured the country instead."],
["The Rose and the Swan", "The Rose (1587), Philip Henslowe's playhouse, home of the Admiral's Men and Christopher Marlowe's plays; the Swan (1595), the only playhouse of which a drawing of the inside survives, made by a Dutch visitor, Johannes de Witt, in 1596."]
];
var SHK_BEAT = [
["Shall I compare thee to a summer's day?", "shall I com-PARE thee TO a SUM-mer's DAY: ten beats, da-DUM five times"],
["When I do count the clock that tells the time", "when I do COUNT the CLOCK that TELLS the TIME (Sonnet 12)"],
["But soft, what light through yonder window breaks?", "but SOFT, what LIGHT through YON-der WIN-dow BREAKS"],
["If music be the food of love, play on", "if MU-sic BE the FOOD of LOVE, play ON"]
];
var SHK_NOTBEAT = ["Shall I say you are like a nice day in summer?", "The light from the window over there is breaking", "Please play more music, because music is the food of love", "I am thinking about whether I should stay alive or not", "My girlfriend is not very pretty at all, but I like her", "The waves are going to the beach very quickly today"];
function shkLine(w, t, right, a, b, why) { return { k: "choose", w: w, t: t, o: [[right, 1, why || "Yes: that is the line as Shakespeare wrote it."], [a, 0, "Not quite: listen to the beat of the line and try again."], [b, 0, "Not quite: listen to the beat of the line and try again."]] }; }
ctTale({ id: "sh_romeo", host: "world:bard", t: "Romeo and Juliet", by: "William Shakespeare, about 1595", where: "fair Verona, where two families hate each other",
col: ["#5A1A2A", "#FFE0C8"], gold: 18, keep: ["A Capulet rose", "🌹"], rad: 10, props: [],
who: [
{ n: "Romeo", who: "Romeo Montague, a young man of Verona, quick to fall in love and quick to act, Juliet's husband",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x2A3A6A, top: 0xE8E0D0, bottom: 0x1E2A4A, shoes: 0x2A1E14, shoeKind: "boots", hair: 0x3A2618, hairStyle: "curly", back: "cloak", backColor: 0x1E2A4A } }, at: [-3, -2], greet: "But soft, what light through yonder window breaks? ...Forgive me. I am a little in love. Are you a friend of the Montagues?", c: 700 },
{ n: "Juliet", who: "Juliet Capulet, not yet fourteen, clever, brave and quicker-witted than Romeo, who marries him in secret",
o: { sex: "f", look: { topKind: "dress", top: 0xC83A4A, bottom: 0xC83A4A, bottomKind: "skirt", layer: "vest", layerColor: 0xE8C8A0, hair: 0x8A4A20, hairStyle: "long", neck: "necklace", accColor: 0xE8C870 } }, at: [3, -2], greet: "What's in a name? That which we call a rose by any other word would smell as sweet. ...Who are you, and how came you here?", c: 700 },
{ n: "Mercutio", who: "Mercutio, Romeo's friend, a kinsman of the Prince, witty, wild and never serious for long",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xD8A030, top: 0xE8E0D0, bottom: 0x7A2A1A, hat: "cap", hatColor: 0x7A2A1A, hair: 0x1A1410, hairStyle: "short" } }, at: [-6, 1], greet: "O, then I see Queen Mab hath been with you! She is the fairies' midwife... Come, come, we waste our lights in vain.", c: 550 },
{ n: "The Nurse", who: "Juliet's Nurse, who has cared for her since she was a baby, talkative, earthy and loving",
o: { sex: "f", look: { topKind: "dress", top: 0x6A5A4A, bottom: 0x6A5A4A, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xE8E0D0, hair: 0x8A8A84 } }, at: [5, 1], greet: "Lord, how my heart beats! Now, afore God, I am so vexed... Are you looking for my lady? She is not yet fourteen, I'll lay fourteen of my teeth." },
{ n: "Friar Laurence", who: "Friar Laurence, a kind Franciscan friar who knows herbs and potions and hopes the marriage will end the feud",
o: { sex: "m", look: { topKind: "robe", top: 0x6A5034, bottom: 0x6A5034, hat: "hood", hatColor: 0x6A5034, waist: "belt", hair: 0x9A9A94, hairStyle: "short" } }, at: [0, -6], greet: "Wisely and slow; they stumble that run fast. Come, help me gather herbs. Within the infant rind of this small flower poison hath residence, and medicine power.", c: 450 },
{ n: "Tybalt", who: "Tybalt, Juliet's fiery cousin, the 'Prince of Cats', the best swordsman in Verona, who hates all Montagues",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x8A1A1A, top: 0x1A1A1A, bottom: 0x1A1A1A, back: "cape", backColor: 0x5A0E0E, hair: 0x1A1A1A, hairStyle: "short" } }, at: [-4, 5], greet: "What, drawn, and talk of peace? I hate the word, as I hate hell, all Montagues, and thee.", c: 550 }
],
steps: [
shkLine(0, "Romeo stands in the Capulets' orchard and looks up at Juliet's window. 'But soft, what light through yonder window breaks?' What comes next?", "'It is the east, and Juliet is the sun.'", "'It is the moon, and Juliet the stars.'", "'It is a lamp, and Juliet the flame.'"),
shkLine(1, "Juliet, not knowing he can hear her: 'O Romeo, Romeo, wherefore art thou Romeo?' What does she mean?", "Why are you Romeo, a Montague, of all people?", "Where are you hiding, Romeo?", "Romeo, come here at once!", "Yes. 'Wherefore' means 'why'. She is not asking where he is: she is asking why he has to be a Montague, the family hers is at war with."),
{ k: "find", w: 4, t: "The Friar needs herbs from his garden for the sleeping potion. Find the five herbs he needs before dawn.", n: 5, look: "weed", col: 0x6AA84A, r: 28, secs: 180, name: "Herbs gathered", done: "\"Take thou this vial... no warmth, no breath shall testify thou livest.\" The potion will make Juliet seem dead for two and forty hours." }
],
qs: [
["Where is Romeo and Juliet set?", "Verona, in Italy", "Venice, in Italy", "Paris, in France"],
["What does 'wherefore' mean in 'wherefore art thou Romeo'?", "Why", "Where", "When"],
["How old is Juliet in the play?", "Not yet fourteen", "Eighteen", "Twenty-one"],
["Where did Shakespeare find the story?", "An English poem of 1562 by Arthur Brooke, from older Italian tales", "He made it all up", "A newspaper report"],
["What kind of play is Romeo and Juliet?", "A tragedy", "A comedy", "A history"],
["Why does Friar Laurence agree to marry them?", "He hopes it will end the feud between their families", "Romeo pays him", "The Prince orders it"]
] });
CT_W.sh_romeo = { th: "meadow", intro: "Two households, both alike in dignity, in fair Verona, where we lay our scene... A summer in Italy, with swords drawn in the market square.", ch: [
["A Brawl in the Square", "Servants of the Capulets and the Montagues start a street fight in the hot square. Tybalt joins in, swords are out, and the Prince of Verona rides in: anyone who breaks the peace again will pay with their life.", "street,well", [ctC(0, "The Prince stops the fight. What does he warn both families?", "If they fight in the streets again, their lives shall pay for it", "Yes: 'Your lives shall pay the forfeit of the peace.'", "They will be banished to France", "He will burn their houses")], [5, 0]],
["Romeo in Love (with Someone Else)", "Romeo is moping under the sycamores, sick with love for a girl called Rosaline who will not love him back. His friends tell him to look at other beauties.", "garden,bigtree", [ctS(2, "Rosaline, Rosaline! Come, there is a feast tonight at old Capulet's. Wear a mask, and you'll see girls to make your swan look like a crow.")], [0, 2]],
["The Capulets' Feast", "Masked, Romeo slips into the Capulets' great feast. Across the hall he sees Juliet, and forgets Rosaline in a moment. They speak, their hands touch, they kiss, and only afterwards learn whose child the other is.", "palace#D8C8A8,feasttable", [ctC(0, "Who recognises Romeo's voice under his mask at the feast, and wants to fight him there and then?", "Tybalt, Juliet's cousin", "Yes. Old Capulet stops him: not at his feast. Tybalt swears he will have his revenge.", "The Nurse", "The Prince")], [0, 1, 5, 3]],
["The Orchard and the Balcony", "Romeo climbs the orchard wall and hears Juliet at her window speaking her love aloud. He answers. Before dawn they promise to marry.", "manor#E8D8B8,garden", [0, 1], [0, 1, 3]],
["The Friar's Cell", "At dawn Romeo runs to Friar Laurence, who is gathering herbs. The Friar is amazed at how fast he has forgotten Rosaline, but agrees to marry them, hoping it will end the feud.", "church,garden", [ctC(4, "What wise warning does Friar Laurence give the hurried lovers?", "'Wisely and slow; they stumble that run fast'", "Yes. The whole play goes too fast: it all happens in about four days.", "'Never marry on a Monday'", "'Love is blind, so wear spectacles'")], [0, 4]],
["Married in Secret", "Juliet tells her parents she is going to confession. At the Friar's cell, the two are married.", "church#C8B8A0", [ctS(4, "Come, come with me, and we will make short work; for, by your leaves, you shall not stay alone till holy church incorporate two in one.")], [0, 1, 4, 3]],
["Swords in the Heat", "Tybalt comes looking for Romeo. Romeo, now secretly his cousin, will not fight. Mercutio fights instead and is killed under Romeo's arm: 'A plague o' both your houses!' In fury, Romeo kills Tybalt.", "street,well", [ctC(2, "Wounded, Mercutio still jokes: 'Ask for me tomorrow, and you shall find me...' what?", "'a grave man'", "Yes: a dying pun, 'grave' meaning serious and a grave in the ground. Then: 'A plague o' both your houses!'", "'a merry man'", "'in Mantua'")], [2, 5, 0]],
["Banished", "The Prince banishes Romeo from Verona. He spends one night with Juliet, and leaves at dawn for Mantua. Her father, knowing nothing, orders her to marry Count Paris on Thursday.", "manor,garden", [ctC(1, "At dawn Juliet wants Romeo to stay. She says the bird singing is not the lark of morning but which bird of night?", "The nightingale", "Yes: 'It was the nightingale, and not the lark.' But it was the lark, and he must go.", "The owl", "The raven")], [0, 1, 3]],
["The Friar's Potion", "Desperate, Juliet goes to the Friar. He gives her a potion that will make her seem dead for forty-two hours; he will send word to Romeo to come for her when she wakes in the tomb.", "church,garden", [2], [1, 4]],
["The Tomb of the Capulets", "The Friar's letter never reaches Romeo; he only hears that Juliet is dead. He buys poison, goes to her tomb and drinks it beside her. She wakes, finds him dead, and stabs herself with his dagger. The two families, at last, are reconciled over their children's bodies.", "ruins#8A8478,cross", [ctC(4, "Why does Friar Laurence's letter never reach Romeo?", "The friar carrying it was shut in a house with plague", "Yes: Friar John was quarantined. One delayed letter, and the tragedy happens.", "Romeo tore it up unread", "Tybalt stole it")], [0, 1, 4]]
] };
CT_DRESS.sh_romeo = { fog: 0.75, th: { g: [0x7A9A48, 0x9AA858, 0xB8A070] },
plaza: { k: "tiles", a: 0xC8A880, b: 0xA8846A },
hero: [["house", 24, -36, 1, { w: 10, h: 9, col: 0xE0B888, roof: 0xB8582E, rk: "gable", r: 7 }], ["house", 30, 34, 1, { w: 12, h: 11, col: 0xD8A878, roof: 0xA84E2A, r: 8 }], ["house", 44, -70, 1, { w: 9, h: 8, col: 0xE8C898, roof: 0xB8582E, r: 7 }],
["well", 16, 46, 1.2], ["banner", 14, -20, 1, { col: 0x8A1A2A }], ["banner", 14, 20, 1, { col: 0x2A3A8A }], ["tree", 34, 80, 1, { kind: "cedar", h: 16, crown: 0x3A5A2A, r: 4 }], ["tree", 40, -100, 1, { kind: "cedar", h: 18, crown: 0x3A5A2A, r: 4 }], ["garden", 56, 96, 1, { col: 0xC83A4A, r: 12 }]],
sky: [["city", 720, 0, 1, { col: 0xD8B088, roof: 0xB0502A, cols: [0xD8B088, 0xE0C098, 0xC89A70], hmax: 80, R: 80, wallC: 0xC8A070, spire: 0.3, n: 20, r: 90 }], ["mountain", 780, 60, 1, { r: 200, h: 110, col: 0x7A8A6A, snow: false }]],
sc: { rosebush: 220, flower: 160 },
edge: { k: "cross", sp: 30, off: 4 } };
CT_SCN.sh_romeo = { mid: [["tree", 22, 0, 1, { kind: "cedar", h: 16, crown: 0x3A5A2A }], ["house", 30, 0, 1, { w: 8, h: 7, col: 0xE0B888, roof: 0xB8582E }], ["well", 18, 0, 1], ["rosebox", 26, 0, 0.8], ["fig", 18, 0, 1, { col: 0xC8C0B4, base: 0x8A8070 }]], ch: [
[["house", 30, -60, 1, { w: 10, h: 9, col: 0xE0B888, roof: 0xB8582E }], ["house", 30, 60, 1, { w: 10, h: 9, col: 0xD8A878, roof: 0xA84E2A }], ["barrels", 16, 30, 1, { n: 4 }], ["folk", 14, 0, 1, { folk: "guard", n: 3, arc: 20 }], ["folk", 14, -30, 1, { folk: "soldier", n: 2, arc: 15 }], ["banner", 20, -90, 1, { col: 0x8A1A2A }], ["banner", 20, 90, 1, { col: 0x2A3A8A }]],
[["tree", 18, -40, 1, { kind: "oak", h: 16 }], ["tree", 22, 40, 1, { kind: "oak", h: 15 }], ["tree", 30, 0, 1, { kind: "willow", h: 13 }], ["flowerbed", 14, 70, 1]],
[["feasttable", 12, 40, 1.4], ["lanterns", 16, -40, 1], ["folk", 14, 60, 1, { folk: "noble", n: 3, arc: 16 }], ["folk", 14, -60, 1, { folk: "lady", n: 3, arc: 16 }], ["chandelier", 10, 0, 1]],
[["tree", 16, -50, 1, { kind: "fruit", h: 11, crown: 0x3A7A2E, fruit: 0xD87A2A }], ["tree", 18, 50, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xD87A2A }], ["roses", 12, 90, 1], ["k:hedge", 20, 0, 1.2, { k: 1, n: 4 }]],
[["flowerbed", 14, -50, 1], ["flowerbed", 14, 50, 1], ["workbench", 12, 90, 1], ["tree", 24, 0, 1, { kind: "cedar", h: 14 }]],
[["cross", 14, -40, 1], ["cross", 14, 40, 1], ["folk", 12, 70, 1, { folk: "monk" }], ["lanterns", 18, 0, 1]],
[["well", 14, -30, 1], ["barrels", 16, 60, 1, { n: 3 }], ["folk", 14, -70, 1, { folk: "noble", n: 2, arc: 20 }], ["house", 30, 90, 1, { w: 9, h: 8, col: 0xE8C898, roof: 0xB8582E }]],
[["tree", 18, -60, 1, { kind: "fruit", h: 11, crown: 0x3A7A2E, fruit: 0xD87A2A }], ["roses", 12, 60, 1], ["coach", 22, 0, 1, { col: 0x3A2A1A }]],
[["workbench", 12, 40, 1], ["jars", 14, -50, 1], ["flowerbed", 16, 80, 1], ["folk", 12, -80, 1, { folk: "monk" }]],
[["cross", 14, -30, 1, { n: 3, gap: 5 }], ["tree", 22, 60, 1, { kind: "cedar", h: 16, crown: 0x2A4A2A }], ["stones", 30, 0, 0.6, { col: 0x8A8478 }], ["lanterns", 16, 90, 1]]
] };
ctTale({ id: "sh_hamlet", host: "world:bard", t: "Hamlet, Prince of Denmark", by: "William Shakespeare, about 1600", where: "the castle of Elsinore, in Denmark",
col: ["#1A1A22", "#E8E0D0"], gold: 20, keep: ["Yorick's jester's bell", "🔔"], rad: 10, props: [],
who: [
{ n: "Hamlet", who: "Prince Hamlet of Denmark, a brilliant, grieving student home from Wittenberg, whose father has died and whose mother has married his uncle",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x1A1A1E, top: 0x1A1A1E, bottom: 0x1A1A1E, back: "cloak", backColor: 0x0E0E12, shoes: 0x101010, shoeKind: "boots", hair: 0x3A2A1A, hairStyle: "short", neck: "scarf", accColor: 0xE8E4DC } }, at: [0, -3], greet: "Words, words, words. ...Forgive me: I have of late, but wherefore I know not, lost all my mirth. You are welcome to Elsinore.", c: 900 },
{ n: "Ophelia", who: "Ophelia, daughter of Polonius, who loves Hamlet and is caught between him and her father",
o: { sex: "f", look: { topKind: "dress", top: 0xE8E4D8, bottom: 0xE8E4D8, bottomKind: "skirt", hat: "flowercrown", hatColor: 0x8AC85A, hair: 0xC8A060, hairStyle: "long" } }, at: [4, 0], greet: "There's rosemary, that's for remembrance; pray you, love, remember. And there is pansies, that's for thoughts.", c: 700 },
{ n: "The Ghost", who: "the Ghost of old King Hamlet, Hamlet's father, in full armour, who walks the battlements at midnight and tells his son he was murdered",
o: { sex: "m", look: { layer: "armor", layerColor: 0x8A949E, top: 0x6A747E, bottom: 0x6A747E, hat: "helmet", hatColor: 0x8A949E, back: "cloak", backColor: 0x3A3A44 } }, at: [-5, -4], greet: "I am thy father's spirit, doomed for a certain term to walk the night... Revenge his foul and most unnatural murder.", c: 800 },
{ n: "King Claudius", who: "Claudius, the new King of Denmark, Hamlet's uncle, who poisoned his brother and married the Queen",
o: { sex: "m", look: { topKind: "robe", top: 0x5A1A3A, bottom: 0x5A1A3A, hat: "crown", hatColor: 0xD8B040, back: "cape", backColor: 0x3A0E2A, hair: 0x5A4030 } }, at: [-3, 3], greet: "Though yet of Hamlet our dear brother's death the memory be green... we have taken to wife our sometime sister. Be welcome at our court.", c: 700 },
{ n: "Queen Gertrude", who: "Gertrude, Queen of Denmark, Hamlet's mother, who married her late husband's brother within two months",
o: { sex: "f", look: { topKind: "dress", top: 0x2A3A6A, bottom: 0x2A3A6A, bottomKind: "skirt", hat: "crown", hatColor: 0xD8B040, neck: "necklace", accColor: 0xD8B040, hair: 0x8A5A30, hairStyle: "bun" } }, at: [3, 3], greet: "Good Hamlet, cast thy nighted colour off... Thou know'st 'tis common: all that lives must die." },
{ n: "Horatio", who: "Horatio, Hamlet's true friend from university, calm, loyal and honest, who lives to tell the story",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x4A3A2A, top: 0xE8E0D0, bottom: 0x3A2E22, hair: 0x6A4A2A, hairStyle: "short" } }, at: [-2, -6], greet: "Before my God, I might not this believe without the sensible and true avouch of mine own eyes. The ghost, my lord. We saw it.", c: 450 },
{ n: "Polonius", who: "Polonius, the King's chief adviser, Ophelia's father, long-winded, nosy and fond of giving advice",
o: { sex: "m", look: { topKind: "robe", top: 0x3A3A2A, bottom: 0x3A3A2A, hat: "cap", hatColor: 0x1A1A1A, hair: 0xC8C8C0, hairStyle: "short" } }, at: [6, -2], greet: "Neither a borrower nor a lender be... and this above all: to thine own self be true. Brevity is the soul of wit, so I will be brief. Very brief. Extremely brief..." }
],
steps: [
shkLine(0, "Hamlet, alone: 'To be, or not to be...' What comes next?", "'...that is the question.'", "'...that is the answer.'", "'...I cannot tell.'"),
{ k: "find", w: 5, t: "It is midnight on the battlements, bitterly cold. The Ghost has been seen here twice. Keep watch: find the four torches along the walls and light them before it comes.", n: 4, look: "flame", col: 0xFFB050, r: 26, secs: 160, name: "Torches lit", done: "Look, my lord, it comes! In armour, from head to foot, with a face more in sorrow than in anger..." },
{ k: "code", w: 0, t: "Hamlet will stage a play that shows a murder just like his father's, and watch the King's face. He calls it by a trap's name. What is it? (two words: The ...)", a: ["the mousetrap", "mousetrap"], hint: "It catches mice. 'The play's the thing wherein I'll catch the conscience of the king.'", done: "'The Mousetrap'! When the player pours poison in the sleeping king's ear, Claudius jumps up and calls for lights. Now Hamlet knows." }
],
qs: [
["Where is Hamlet set?", "Elsinore Castle in Denmark", "A castle in Scotland", "The Tower of London"],
["How was Hamlet's father murdered, the Ghost says?", "Poison poured into his ear while he slept", "Stabbed in battle", "Pushed from the battlements"],
["What is the name of the play Hamlet uses to test the King?", "The Mousetrap", "The Lark", "The Spanish Tragedy"],
["Whose skull does Hamlet hold in the graveyard?", "Yorick's, the King's old jester", "His father's", "Polonius's"],
["Who is left alive at the end to tell Hamlet's story?", "Horatio", "Laertes", "Claudius"],
["Hamlet is Shakespeare's longest play. About how long does it take to perform in full?", "About four hours", "About one hour", "About two days"]
] });
CT_W.sh_hamlet = { th: "night", intro: "Something is rotten in the state of Denmark. Midnight on the battlements of Elsinore, the sea below, and the guards have seen a ghost.", ch: [
["Who's There?", "Midnight on the freezing battlements. The guards have twice seen a ghost in armour that looks exactly like the dead King. They bring Hamlet's friend Horatio, the scholar, to see for himself, and it comes.", "castle#6A6A70,wall", [1], [5, 2]],
["The Court of King Claudius", "In the great hall, the new King Claudius, Hamlet's uncle, celebrates his marriage to Gertrude, Hamlet's mother, barely two months after the old King died. Hamlet, still in black, stands apart.", "hall#5A5A62,throne", [ctC(0, "Alone, Hamlet says his mother remarried so fast that the funeral food was served cold at the wedding. What is his famous line about women?", "'Frailty, thy name is woman!'", "Yes: he is bitter at his mother for marrying so soon.", "'Woman, thy name is mystery'", "'All the world's a stage'")], [0, 3, 4]],
["Advice for the Road", "Laertes, Ophelia's brother, leaves for France. Their father Polonius gives him a long list of advice, and warns Ophelia to keep away from Hamlet.", "manor#7A7A80,dock", [ctC(6, "Polonius ends his advice to his son with a famous line. Which?", "'This above all: to thine own self be true'", "Yes. Wise advice, from a man who is not always wise himself.", "'Never trust a Dane'", "'Early to bed, early to rise'")], [6, 1]],
["The Ghost Speaks", "On the battlements the Ghost beckons Hamlet away and tells him the truth: Claudius poured poison in his ear as he slept in the orchard. 'Remember me.' Hamlet swears revenge, and says he may act mad from now on.", "cliff#3A3A44,ruins", [ctC(2, "What does the Ghost ask of Hamlet as he leaves?", "'Remember me'", "Yes: 'Adieu, adieu, adieu. Remember me.' Hamlet writes it in his notebook.", "'Forgive him'", "'Leave Denmark'")], [0, 2, 5]],
["Words, Words, Words", "Hamlet acts strangely. Polonius thinks it is love for Ophelia that has driven him mad. Hamlet makes fun of him; two old school friends, Rosencrantz and Guildenstern, are sent by the King to spy on him.", "hall#6A6A72,garden", [ctC(0, "Polonius asks Hamlet what he is reading. What does Hamlet answer?", "'Words, words, words'", "Yes. 'Though this be madness, yet there is method in't,' says Polonius.", "'A book of spells'", "'Your will, my lord'")], [0, 6]],
["The Players Come", "A company of travelling actors arrives at Elsinore. Hamlet asks them to perform a play, The Murder of Gonzago, with a few lines of his own added, before the King.", "stage,tents", [ctS(0, "Speak the speech, I pray you, as I pronounced it to you, trippingly on the tongue... Suit the action to the word, the word to the action. The play's the thing wherein I'll catch the conscience of the king.")], [0]],
["To Be or Not to Be", "Hamlet, alone, asks the great question: is it nobler to suffer life's troubles, or to end them? Then he turns cruelly on Ophelia, while the King and Polonius spy from behind a curtain.", "hall#4A4A52,chandelier", [0], [0, 1]],
["The Mousetrap", "The players act a king murdered with poison in his ear. Claudius leaps up, shouts for lights, and storms out. Now Hamlet is sure.", "stage,feasttable", [2], [0, 3, 4, 5]],
["Behind the Curtain", "In the Queen's room Hamlet accuses his mother. Hearing a cry behind the tapestry, he stabs through it, and kills Polonius, who was hiding there. Claudius sends Hamlet to England, with secret orders to have him killed.", "manor#5A5A62,throne", [ctC(0, "Hamlet stabs through the curtain thinking it is the King. Who is really behind it?", "Polonius", "Yes. 'Thou wretched, rash, intruding fool, farewell! I took thee for thy better.'", "Horatio", "The Ghost")], [0, 4, 6]],
["Ophelia's Flowers", "Her father killed by the man she loved, Ophelia loses her mind. She sings old songs and gives out flowers, each with its meaning. Later the Queen brings word that she has drowned in the brook, under a willow.", "pool,garden", [ctF(1, "Ophelia gives out flowers, each with its meaning: rosemary for remembrance, pansies for thoughts, fennel, columbine, rue, daisy. Find the five flowers by the brook.", 5, "rose", 0xD8C8F0, "Flowers found", "'There's a daisy. I would give you some violets, but they withered all when my father died.'")], [1, 4]],
["Alas, Poor Yorick", "Back in Denmark (pirates rescued him), Hamlet and Horatio come upon a gravedigger joking as he digs. He turns up a skull: Yorick, the old King's jester, who carried Hamlet on his back when he was a boy.", "ruins#4A4A44,cross", [ctC(0, "Hamlet holds the skull: 'Alas, poor Yorick! I knew him, Horatio...' How does he go on?", "'...a fellow of infinite jest, of most excellent fancy'", "Yes. He wonders where all Yorick's jokes and songs have gone.", "'...a man of very little wit'", "'...a king of great renown'")], [0, 5]],
["The Duel", "Laertes, wanting revenge for his father and sister, fights Hamlet in a fencing match. The King has poisoned Laertes' blade, and a cup of wine too. In the end the Queen, Laertes, the King and Hamlet all die. 'The rest is silence.'", "hall#5A5A62,throne", [ctC(5, "Hamlet asks Horatio not to die with him. Why?", "To live and tell his story truly", "Yes. 'Good night, sweet prince, and flights of angels sing thee to thy rest.'", "To become king", "To find the Ghost")], [0, 5, 3, 4]]
] };
CT_DRESS.sh_hamlet = { fog: 0.6,
plaza: { k: "tiles", a: 0x4A4A52, b: 0x3A3A42 },
hero: [["castle", 60, 0, 1.4, { col: 0x6A6A70, roof: 0x3A3A44, flag: 0x8A1A1A, r: 30 }], ["wall", 30, -40, 1, { col: 0x5A5A62 }], ["cannon", 16, -24, 1.2], ["cannon", 16, 24, 1.2], ["banner", 14, -12, 1, { col: 0x8A1A1A }], ["banner", 14, 12, 1, { col: 0x8A1A1A }],
["cross", 40, 70, 1, { n: 3, gap: 5 }], ["tree", 30, 90, 1, { kind: "dead", h: 12 }], ["stones", 50, -90, 0.5, { col: 0x5A5A5A }]],
sky: [["cragcastle", 700, 0, 1, { h: 60, col: 0x5A5A62, rock: 0x3A3A40, s: 1.4 }], ["mountain", 760, 60, 1, { r: 180, h: 90, col: 0x3A4048, snow: false }]],
sc: { dead: 120, tombstone: 60, boulder: 100 },
edge: { k: "cross", sp: 40, off: 5 } };
CT_SCN.sh_hamlet = { mid: [["tree", 22, 0, 1, { kind: "dead", h: 12 }], ["stones", 30, 0, 0.4, { col: 0x5A5A5A }], ["cross", 16, 0, 1], ["cannon", 18, 0, 1], ["fig", 20, 0, 1.2, { col: 0x8A8A90, base: 0x5A5A5A }]], ch: [
[["cannon", 12, -40, 1], ["cannon", 12, 40, 1], ["folk", 10, -70, 1, { folk: "guard", n: 2, arc: 20 }], ["lanterns", 14, 0, 1], ["wall", 26, 90, 0.6, { col: 0x5A5A62 }]],
[["throne", 12, 0, 1], ["feasttable", 14, -60, 1.2], ["folk", 14, 60, 1, { folk: "noble", n: 4, arc: 14 }], ["chandelier", 10, 30, 1], ["banner", 16, -90, 1, { col: 0x5A1A3A }], ["banner", 16, 90, 1, { col: 0x5A1A3A }]],
[["dock", 22, 60, 1], ["boat", 24, 80, 1, { kind: "sail", col: 0x5A4A3A }], ["barrels", 14, -50, 1, { n: 4 }], ["folk", 12, -80, 1, { folk: "sailor", n: 2, arc: 15 }]],
[["cliff", 30, 0, 0.8, { col: 0x3A3A44 }], ["fig", 14, -40, 1.3, { col: 0x8A949E }], ["stones", 24, 70, 0.5, { col: 0x4A4A4A }]],
[["armchairs", 12, 40, 1], ["chest", 12, -40, 1], ["garden", 22, 80, 1, { col: 0x8A7AA8 }], ["folk", 14, -80, 1, { folk: "scholar", n: 2, arc: 15 }]],
[["tents", 22, 60, 1], ["coach", 20, -60, 1, { col: 0x4A2A1A }], ["folk", 14, 0, 1, { folk: "peasant", n: 4, arc: 14 }], ["drum", 16, 90, 0.4]],
[["chandelier", 10, 0, 1], ["armchairs", 14, 60, 1], ["folk", 14, -60, 1, { folk: "guard" }]],
[["stands", 16, 0, 0.8], ["feasttable", 18, 70, 1], ["lanterns", 14, -60, 1], ["folk", 16, -90, 1, { folk: "noble", n: 3, arc: 14 }]],
[["armchairs", 12, -40, 1], ["chest", 12, 40, 1], ["chandelier", 10, 0, 1]],
[["tree", 14, -30, 1, { kind: "willow", h: 14 }], ["lake", 30, 40, 1, { R: 16, col: 0x3A5A6A }], ["flowerbed", 12, 80, 1]],
[["cross", 14, -40, 1, { n: 4, gap: 4 }], ["mound", 18, 40, 0.5], ["bones", 16, 80, 0.6], ["tree", 24, 0, 1, { kind: "dead", h: 13 }]],
[["throne", 12, 0, 1], ["feasttable", 14, 60, 1], ["folk", 14, -60, 1, { folk: "guard", n: 3, arc: 14 }], ["banner", 18, 90, 1, { col: 0x8A1A1A }]]
] };
ctTale({ id: "sh_macbeth", host: "world:bard", t: "Macbeth", by: "William Shakespeare, about 1606", where: "the Scottish highlands, on a blasted heath",
col: ["#2A1A1A", "#E8D0B0"], gold: 20, keep: ["A witch's thistle", "🌿"], rad: 10, props: [],
who: [
{ n: "Macbeth", who: "Macbeth, Thane of Glamis, a brave Scottish general who is told by three witches he will be king, and murders to make it so",
o: { sex: "m", look: { layer: "armor", layerColor: 0x6A6A6A, top: 0x3A4A2A, bottom: 0x3A4A2A, back: "cloak", backColor: 0x4A2A1A, hair: 0x5A3A1A, hairStyle: "short", shoeKind: "boots" } }, at: [-3, -2], greet: "So foul and fair a day I have not seen. ...What are you? Live you, or are you aught that man may question?", c: 850 },
{ n: "Lady Macbeth", who: "Lady Macbeth, his wife, fierce and ambitious, who drives him to murder and is later haunted by it, walking in her sleep",
o: { sex: "f", look: { topKind: "dress", top: 0x5A1A1A, bottom: 0x5A1A1A, bottomKind: "skirt", back: "cape", backColor: 0x2A0E0E, hair: 0x8A3A1A, hairStyle: "braids", neck: "necklace", accColor: 0xC8A040 } }, at: [3, -2], greet: "Look like the innocent flower, but be the serpent under it. ...You have come to Inverness? Welcome, welcome.", c: 900 },
{ n: "The First Witch", who: "the First of the three Weird Sisters, an old wild woman of the heath who sees the future and speaks in riddles and rhymes",
o: { sex: "f", look: { topKind: "robe", top: 0x3A3A30, bottom: 0x3A3A30, back: "cloak", backColor: 0x2A2A22, hat: "hood", hatColor: 0x2A2A22, hair: 0xB8B8B0, hairStyle: "long" } }, at: [-6, 4], greet: "When shall we three meet again, in thunder, lightning, or in rain? ...Thou art not him. But thou wilt do.", c: 600 },
{ n: "The Second Witch", who: "the Second of the three Weird Sisters, who stirs the cauldron", o: { sex: "f", look: { topKind: "robe", top: 0x4A3A2A, bottom: 0x4A3A2A, hat: "hood", hatColor: 0x3A2A1A, hair: 0xA8A8A0, hairStyle: "long" } }, at: [-4, 6], greet: "By the pricking of my thumbs, something wicked this way comes." },
{ n: "The Third Witch", who: "the Third of the three Weird Sisters", o: { sex: "f", look: { topKind: "robe", top: 0x2A3A3A, bottom: 0x2A3A3A, hat: "hood", hatColor: 0x1A2A2A, hair: 0xC8C8C0, hairStyle: "long" } }, at: [-8, 6], greet: "All hail, Macbeth, that shalt be king hereafter!" },
{ n: "Banquo", who: "Banquo, Macbeth's fellow general and friend, an honest man, told by the witches his children will be kings",
o: { sex: "m", look: { layer: "armor", layerColor: 0x7A7A7A, top: 0x2A3A5A, bottom: 0x2A3A5A, back: "cloak", backColor: 0x2A3A5A, hair: 0x8A6A3A } }, at: [-1, -5], greet: "Good sir, why do you start, and seem to fear things that do sound so fair? ...These witches, they said my children would be kings.", c: 550 },
{ n: "Macduff", who: "Macduff, Thane of Fife, the one man Macbeth should fear, who leads the army against him",
o: { sex: "m", look: { layer: "armor", layerColor: 0x8A8A8A, top: 0x2A5A3A, bottom: 0x2A5A3A, back: "cloak", backColor: 0x1E4A2A, hair: 0x3A2A1A } }, at: [4, 5], greet: "Bleed, bleed, poor country! ...I must also feel it as a man. He has killed my family. He will answer for it." }
],
steps: [
{ k: "say", w: 2, t: "Double, double toil and trouble; fire burn and cauldron bubble. Fillet of a fenny snake, in the cauldron boil and bake; eye of newt and toe of frog, wool of bat and tongue of dog..." },
shkLine(1, "Lady Macbeth walks in her sleep, rubbing her hands that she thinks are stained with blood. 'Out, damned spot! Out, I say!' What does she say later?", "'All the perfumes of Arabia will not sweeten this little hand.'", "'A little water clears us of this deed.'", "'Tomorrow, and tomorrow, and tomorrow.'", "Yes. Earlier she said 'A little water clears us of this deed'. Now no water or perfume can."),
{ k: "find", w: 6, t: "Malcolm's army comes through Birnam Wood. Every soldier cuts a branch to hide how many they are. Gather five branches from the wood.", n: 5, look: "weed", col: 0x3A6A2A, r: 28, secs: 160, name: "Branches cut", done: "The wood is moving! 'Macbeth shall never vanquished be until Great Birnam Wood to high Dunsinane Hill shall come against him.' It has come." }
],
qs: [
["What do the three witches tell Macbeth he will become?", "King of Scotland", "King of England", "A saint"],
["What does Lady Macbeth see on her hands as she sleepwalks?", "Blood that will not wash away", "Ink", "Witches' marks"],
["Which wood marches to Dunsinane?", "Birnam Wood", "Sherwood Forest", "The Forest of Arden"],
["Many actors will not say the play's name in a theatre. What do they call it?", "'The Scottish Play'", "'The Cursed Play'", "'The Danish Play'"],
["Macbeth was a real king of Scotland. In which century did he rule?", "The 11th century (1040 to 1057)", "The 16th century", "The 3rd century"],
["Why do people think Shakespeare wrote a play about Scotland and witches around 1606?", "King James, a Scot who wrote a book about witches, had just become King of England", "Queen Elizabeth asked for it", "It was the fashion in Italy"]
] });
CT_W.sh_macbeth = { th: "moor", intro: "Thunder and lightning over a blasted heath in Scotland. A battle has just been won, and three strange women are waiting by the road.", ch: [
["Fair Is Foul", "Thunder on the open heath. Three witches meet and agree: they will meet Macbeth when the battle's lost and won. 'Fair is foul, and foul is fair: hover through the fog and filthy air.'", "stones,potfire", [ctC(2, "What do the witches chant as they vanish into the fog?", "'Fair is foul, and foul is fair'", "Yes: nothing in this play will be what it seems.", "'All's well that ends well'", "'The game is afoot'")], [2, 3, 4]],
["The Wounded Captain", "King Duncan hears from a bleeding captain how brave Macbeth and Banquo won the battle against the rebels. Duncan makes Macbeth Thane of Cawdor, as the traitor who held the title is to die.", "tents,camp", [ctS(5, "For brave Macbeth, well he deserves that name! He unseamed the traitor from the nave to the chops. The King has heard of it, and rewards him.")], [5, 0]],
["The Prophecy", "On the heath the witches hail Macbeth as Thane of Glamis, Thane of Cawdor, and King hereafter. And Banquo will father kings, though not be one. Moments later, word comes: Macbeth is now Thane of Cawdor.", "stones,tree", [ctC(2, "The witches hail Macbeth three ways. Which title does he already have when they meet him?", "Thane of Glamis", "Yes. Cawdor comes moments later, and that makes him believe the third: King.", "Thane of Cawdor", "King of Scotland")], [0, 5, 2, 3, 4]],
["The Letter", "At their castle in Inverness, Lady Macbeth reads her husband's letter about the witches. She fears he is too kind to kill for the crown, and calls on dark spirits to fill her with cruelty. The King is coming to stay the night.", "castle#6A5A4A,garden", [ctC(1, "Lady Macbeth fears her husband is 'too full of the milk of' what?", "'human kindness'", "Yes. She thinks he wants to be king, but not to do the wicked thing it takes.", "'pride'", "'wine'")], [1]],
["Is This a Dagger?", "At midnight, alone, Macbeth sees a dagger floating before him, pointing the way to Duncan's room. A bell rings: his wife's signal. He goes in, and murders the sleeping King.", "castle#5A4A3A,chandelier", [shkLine(0, "Macbeth sees a vision: 'Is this a dagger which I see before me...' What comes next?", "'...the handle toward my hand?'", "'...or is it just a spoon?'", "'...upon the wall of Elsinore?'")], [0, 1]],
["Knock, Knock", "After the murder there is knocking at the gate. A drunken porter takes his time letting in Macduff, who finds the King dead. Duncan's sons flee for their lives, and Macbeth is crowned.", "castle#5A4A3A,arch", [ctC(1, "Macbeth's hands are covered in blood after the murder. What does Lady Macbeth say?", "'A little water clears us of this deed'", "Yes. Later, in her sleep, she will scrub and scrub and it will never come clean.", "'Hide them in your gloves'", "'Blood washes off with wine'")], [0, 1, 6]],
["Banquo's Ghost", "King now, Macbeth fears Banquo and his sons. He sends murderers to kill them; Banquo dies but his son Fleance escapes. At the royal feast, only Macbeth sees Banquo's ghost sitting in his chair.", "hall#6A5A4A,feasttable", [ctC(0, "At the feast, who is sitting in Macbeth's place at the table?", "The bloody ghost of Banquo, whom only Macbeth can see", "Yes. The guests are baffled as their king shouts at an empty chair.", "Lady Macbeth", "The witches")], [0, 1, 5]],
["The Cauldron", "Macbeth seeks out the witches in their cave. Over a bubbling cauldron, three apparitions tell him: beware Macduff; no man born of woman can harm him; he cannot be beaten until Birnam Wood comes to Dunsinane.", "cave,potfire", [0, ctC(2, "The second apparition says 'none of woman born shall harm Macbeth'. Why does he feel safe?", "He thinks every man was born of a woman, so no one can kill him", "Yes. But words in this play have more than one meaning...", "He thinks he is a ghost", "He has a magic sword")], [0, 2, 3, 4]],
["Out, Damned Spot", "At Dunsinane castle a doctor and a gentlewoman watch Lady Macbeth walk in her sleep with a candle, rubbing her hands, talking of the murders.", "castle#5A4A3A,tower", [1], [1]],
["Birnam Wood Moves", "The English army, with Malcolm and Macduff, comes through Birnam Wood. Each man cuts a bough to carry, to hide their numbers. To the watchers on the walls, the wood is moving.", "bigtree,camp", [2], [6]],
["Tomorrow, and Tomorrow", "Word comes: the Queen is dead. Macbeth speaks of life as a walking shadow, a poor player on a stage, a tale told by an idiot, full of sound and fury, signifying nothing. Then he goes out to fight.", "castle#4A3A2A,wall", [shkLine(0, "'Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day...' Later he says life is 'a tale told by an idiot, full of...' what?", "'...sound and fury, signifying nothing.'", "'...love and laughter, ending well.'", "'...words, words, words.'")], [0]],
["Macduff", "On the battlefield Macbeth boasts no man born of woman can harm him. Macduff answers: he was 'from his mother's womb untimely ripped': not born in the usual way. Macduff kills Macbeth, and Malcolm becomes King.", "camp,banner", [ctC(6, "How does Macduff get round the witches' prophecy?", "He was not born the usual way: he was delivered early, by surgery", "Yes. The witches told the truth, in a way meant to trick.", "He is a ghost", "He is a woman in disguise")], [0, 6]]
] };
CT_DRESS.sh_macbeth = { fog: 0.5, th: { g: [0x5A5A3A, 0x6A5A44, 0x7A6A52] },
plaza: { k: "tiles", a: 0x5A5048, b: 0x4A4038 },
hero: [["stones", 34, -50, 1, { n: 9, R: 8, col: 0x6A6A62 }], ["potfire", 20, -30, 1.4], ["tree", 26, 40, 1, { kind: "blasted", h: 12 }], ["tree", 40, -90, 1, { kind: "dead", h: 11 }], ["camp", 18, 30, 1], ["banner", 16, -14, 1, { col: 0x2A4A2A }],
["banner", 16, 14, 1, { col: 0x6A1A1A }], ["tents", 50, 80, 1]],
sky: [["cragcastle", 680, 0, 1, { h: 80, col: 0x5A4A3A, rock: 0x4A4038, flag: 0x5A1A1A, s: 1.3 }], ["mountain", 760, -60, 1, { r: 200, h: 160, col: 0x5A5A60, snow: true }], ["mountain", 740, 70, 1, { r: 180, h: 140, col: 0x4A4A50, snow: false }]],
sc: { boulder: 200, dead: 80, sheep: 40 },
edge: { k: "runes", sp: 50, off: 5 } };
CT_SCN.sh_macbeth = { mid: [["tree", 22, 0, 1, { kind: "blasted", h: 12 }], ["stones", 30, 0, 0.4, { col: 0x6A6A62 }], ["camp", 16, 0, 1], ["runestone", 18, 0, 1], ["beast", 20, 0, 1, { beast: "stag" }]], ch: [
[["potfire", 12, 0, 1.2], ["tree", 20, -60, 1, { kind: "blasted", h: 12 }], ["stones", 30, 60, 0.5, { col: 0x6A6A62 }], ["bones", 16, 90, 0.5]],
[["tents", 22, 40, 1], ["banner", 16, -40, 1, { col: 0x2A4A2A }], ["folk", 14, 0, 1, { folk: "soldier", n: 4, arc: 14 }], ["camp", 18, -80, 1]],
[["stones", 26, -50, 0.6, { col: 0x6A6A62 }], ["tree", 18, 60, 1, { kind: "dead", h: 11 }], ["beast", 22, 0, 1, { beast: "horse", n: 2, arc: 15 }]],
[["garden", 16, -50, 1, { col: 0x8A3A3A }], ["well", 14, 60, 1], ["folk", 12, 90, 1, { folk: "maid" }]],
[["chandelier", 10, 0, 1], ["chest", 12, 60, 1], ["lanterns", 14, -60, 1]],
[["arch", 14, 0, 1], ["barrels", 14, 60, 1, { n: 5 }], ["folk", 12, -60, 1, { folk: "guard", n: 2, arc: 15 }]],
[["feasttable", 12, 0, 1.4], ["chandelier", 10, 60, 1], ["folk", 14, -60, 1, { folk: "noble", n: 4, arc: 14 }], ["throne", 16, 90, 1]],
[["potfire", 12, 0, 1.2], ["bones", 16, -60, 0.6], ["jars", 14, 60, 1], ["skullrock", 30, 90, 0.4]],
[["tower", 18, 40, 1], ["lanterns", 12, -40, 1], ["folk", 12, 80, 1, { folk: "maid" }]],
[["tree", 14, -40, 1, { kind: "oak", h: 18 }], ["tree", 16, 40, 1, { kind: "oak", h: 17 }], ["tree", 20, 0, 1, { kind: "oak", h: 19 }], ["folk", 16, 80, 1, { folk: "soldier", n: 5, arc: 12 }]],
[["wall", 26, 0, 0.6, { col: 0x5A4A3A }], ["cannon", 14, -50, 1], ["banner", 14, 50, 1, { col: 0x6A1A1A }]],
[["banner", 16, -40, 1, { col: 0x2A4A2A }], ["banner", 16, 40, 1, { col: 0x6A1A1A }], ["folk", 16, 0, 1, { folk: "soldier", n: 5, arc: 12 }], ["beast", 22, 80, 1, { beast: "horse" }]]
] };
ctTale({ id: "sh_dream", host: "world:bard", t: "A Midsummer Night's Dream", by: "William Shakespeare, about 1595", where: "the enchanted wood outside Athens, on midsummer night",
col: ["#1A2A3A", "#E8F0D0"], gold: 18, keep: ["A love-in-idleness flower", "🌸"], rad: 10, props: [],
who: [
{ n: "Puck", who: "Puck, also called Robin Goodfellow, Oberon's mischievous sprite, who can put a girdle round the earth in forty minutes and loves to play tricks",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x3A7A2A, top: 0x5A9A3A, bottom: 0x3A6A2A, hat: "cap", hatColor: 0x8A3A1A, hair: 0xC86A2A, hairStyle: "curly", shoeKind: "sandals" } }, at: [3, -3], greet: "Lord, what fools these mortals be! ...I am that merry wanderer of the night. Shall I lead you astray? Only a little.", c: 750 },
{ n: "Titania", who: "Titania, Queen of the Fairies, proud and beautiful, quarrelling with her husband Oberon",
o: { sex: "f", look: { topKind: "dress", top: 0xC8D8F0, bottom: 0xC8D8F0, bottomKind: "skirt", hat: "flowercrown", hatColor: 0xE8B8D8, back: "cape", backColor: 0xE8E0F8, hair: 0xE8D8A0, hairStyle: "long" } }, at: [-3, -4], greet: "These are the forgeries of jealousy... Come, now a roundel and a fairy song. Sing me now asleep.", c: 900 },
{ n: "Oberon", who: "Oberon, King of the Fairies, who uses a magic flower to play a trick on his queen",
o: { sex: "m", look: { topKind: "robe", top: 0x2A3A5A, bottom: 0x2A3A5A, hat: "crown", hatColor: 0xB8C8D8, back: "cape", backColor: 0x1A2A4A, hair: 0x1A1A2A, hairStyle: "long" } }, at: [0, -6], greet: "Ill met by moonlight, proud Titania. ...I know a bank where the wild thyme blows. Fetch me that flower, Puck.", c: 850 },
{ n: "Nick Bottom", who: "Nick Bottom, a weaver of Athens, a cheerful, boastful amateur actor who wants to play every part, and is given a donkey's head by Puck",
o: { sex: "m", look: { layer: "apron", layerColor: 0x8A7A5A, top: 0xB89A6A, bottom: 0x5A4A3A, hair: 0x6A4A2A, hairStyle: "short" } }, at: [6, 1], greet: "Let me play the lion too! I will roar, that I will do any man's heart good to hear me. ...I have had a most rare vision.", c: 600 },
{ n: "Hermia", who: "Hermia, a young woman of Athens who runs away into the wood with Lysander rather than marry Demetrius",
o: { sex: "f", look: { topKind: "dress", top: 0xD8A070, bottom: 0xD8A070, bottomKind: "skirt", hair: 0x2A1A12, hairStyle: "braids" } }, at: [-6, 2], greet: "The course of true love never did run smooth, Lysander says. And though she be but little, she is fierce! ...That's me." },
{ n: "Helena", who: "Helena, Hermia's tall friend, who loves Demetrius though he scorns her",
o: { sex: "f", look: { topKind: "dress", top: 0x8AA8C8, bottom: 0x8AA8C8, bottomKind: "skirt", hair: 0xD8B870, hairStyle: "long" } }, at: [-8, -1], greet: "Love looks not with the eyes, but with the mind, and therefore is winged Cupid painted blind." },
{ n: "Peter Quince", who: "Peter Quince, a carpenter, who directs the workmen's play of Pyramus and Thisbe for the Duke's wedding",
o: { sex: "m", look: { layer: "apron", layerColor: 0x6A5A3A, top: 0xA8987A, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x4A3A2A, hair: 0x8A8A84, face: "glasses" } }, at: [8, -2], greet: "Is all our company here? Here is the scroll of every man's name which is thought fit to play in our interlude before the Duke." }
],
steps: [
{ k: "find", w: 0, t: "Oberon wants the little purple flower called love-in-idleness: its juice on sleeping eyelids makes them love the first thing they see. Find five of them in the moonlit wood.", n: 5, look: "rose", col: 0xA86AD8, r: 30, secs: 180, name: "Love-in-idleness", done: "'I'll put a girdle round about the earth in forty minutes!' And Puck is off to squeeze it on the wrong Athenian's eyes..." },
{ k: "run", w: 0, t: "Puck is leading the quarrelling lovers round in circles in the fog, so they cannot find each other to fight! Run through every ring before dawn.", n: 6, r: 30, secs: 120, done: "'Up and down, up and down, I will lead them up and down.' Exhausted, all four fall asleep in the same glade, and Puck puts things right." },
shkLine(0, "At the very end, Puck speaks to the audience: 'If we shadows have offended...' What comes next?", "'Think but this, and all is mended, that you have but slumbered here while these visions did appear.'", "'Pay your penny and go home.'", "'Puck will play another trick.'", "Yes. If you did not like the play, think it was all a dream.")
],
qs: [
["Who turns Bottom's head into a donkey's?", "Puck", "Oberon", "Titania"],
["What does the love-in-idleness flower do?", "Its juice on sleeping eyes makes you love the first thing you see", "It makes you invisible", "It turns you into a donkey"],
["What play do the workmen put on for the Duke's wedding?", "Pyramus and Thisbe", "Romeo and Juliet", "The Mousetrap"],
["Where is the play set?", "Athens and a wood outside it", "London", "Verona"],
["Which famous line does Lysander say about love?", "'The course of true love never did run smooth'", "'All the world's a stage'", "'To thine own self be true'"],
["Who does Titania fall in love with under the spell?", "Bottom, with his donkey's head", "Puck", "Duke Theseus"]
] });
CT_W.sh_dream = { th: "wonder", intro: "Athens, four days before the Duke's wedding. Beyond the city lies a wood, and on midsummer night the fairies are out in it.", ch: [
["Athens: An Unhappy Father", "Hermia's father demands she marry Demetrius. She loves Lysander. Duke Theseus tells her: obey, become a nun, or die. Lysander and Hermia plan to run away through the wood. Helena, who loves Demetrius, tells him their plan.", "temple#E8E0D0,garden", [ctC(4, "What choices does the law of Athens give Hermia if she will not marry Demetrius?", "Death, or to live as a nun for ever", "Yes. A harsh old law, which Duke Theseus later overrules.", "To leave Athens", "To pay a fine")], [4, 5]],
["The Workmen's Play", "In Peter Quince's house, a carpenter, a weaver, a bellows-mender, a tinker, a joiner and a tailor meet to cast a play for the Duke's wedding: 'The most lamentable comedy and most cruel death of Pyramus and Thisbe'. Bottom wants to play every part.", "cottage#C8A878,workbench", [ctC(3, "Bottom wants to play the Lion too. Why do the others say he cannot?", "He'd roar so terribly he'd frighten the ladies, and they'd all be hanged", "Yes. So Bottom offers to roar 'as gently as any sucking dove'.", "He is too short", "He cannot read")], [3, 6]],
["Ill Met by Moonlight", "In the moonlit wood, Oberon and Titania, King and Queen of the Fairies, quarrel over a little changeling boy. Their quarrel has turned the seasons upside down. Oberon sends Puck for a magic flower.", "bigtree,mushrooms", [ctC(2, "Because the fairy King and Queen are quarrelling, what has gone wrong in the human world?", "The seasons are confused: floods, frosts in summer, crops rotting", "Yes. Shakespeare may have been thinking of the real terrible weather of 1594 to 1596.", "The sun has stopped", "All the cows are blue")], [2, 1, 0]],
["Love-in-Idleness", "Puck fetches the flower. Oberon squeezes its juice on sleeping Titania's eyes. Seeing Helena scorned by Demetrius, he tells Puck to enchant the Athenian man in the wood too.", "garden,mushrooms", [0], [0, 2]],
["The Wrong Athenian", "Puck finds an Athenian sleeping in the wood: but it is Lysander, not Demetrius! Lysander wakes, sees Helena, and falls madly in love with her. Hermia wakes alone.", "bigtree,pool", [ctC(0, "Oberon told Puck to find a man in 'Athenian garments'. Why does Puck enchant Lysander by mistake?", "There are two young Athenian men in the wood, and Puck picks the wrong one", "Yes. 'Lord, what fools these mortals be!'", "Lysander paid him", "Lysander was wearing a mask")], [0, 4, 5]],
["Bottom's Head", "As the workmen rehearse in the wood, Puck gives Bottom a donkey's head. His friends flee. Titania wakes, sees him, and loves him at once. Her fairies, Peaseblossom, Cobweb, Moth and Mustardseed, wait on him.", "stage,mushrooms", [ctC(3, "With a donkey's head, what does Bottom most want to eat, as he lies with the Fairy Queen?", "A bottle of hay ('good hay, sweet hay, hath no fellow')", "Yes. And to have his head scratched.", "Honey cakes", "Roast swan")], [3, 1, 6]],
["Lovers' Tangle", "Puck enchants Demetrius too. Now both young men love Helena, who thinks they are mocking her, and Hermia is furious. They nearly come to blows.", "garden,bigtree", [ctC(5, "Hermia is angry Helena calls her small. What does Helena say about her?", "'Though she be but little, she is fierce!'", "Yes. One of the most quoted lines in the play.", "'She is as tall as a maypole'", "'She is a mouse'")], [4, 5]],
["Up and Down", "Oberon orders Puck to cover the night in fog and lead the rivals astray, so they cannot fight, until they fall asleep. Then he puts the antidote on Lysander's eyes.", "bigtree,mushrooms", [1], [0]],
["Waking", "At dawn Oberon releases Titania; Puck takes off Bottom's donkey's head. Duke Theseus, out hunting, finds the four lovers asleep. Now Lysander loves Hermia and Demetrius loves Helena. The Duke says they shall all be married with him.", "garden,pool", [ctS(3, "I have had a most rare vision. I have had a dream, past the wit of man to say what dream it was... It shall be called 'Bottom's Dream', because it hath no bottom.")], [3, 4, 5]],
["Pyramus and Thisbe", "At the triple wedding, the workmen perform their play: a man playing a Wall (with a chink in his fingers), another playing Moonshine with a lantern and a dog, and Bottom dying at great length as Pyramus. The courtiers laugh till they cry.", "stage,palace#E8E0D0", [ctC(6, "How do the workmen show a wall in their play?", "A man plays the Wall, and holds up his fingers for the chink", "Yes. And another man plays Moonshine, with a lantern, a thorn bush and a dog.", "They build a real brick wall", "They paint it on a curtain")], [3, 6]],
["Puck's Goodnight", "At midnight the fairies bless the house and the three marriages. Puck stays behind to speak to the audience.", "garden,mushrooms", [2], [0, 1, 2]]
] };
CT_DRESS.sh_dream = { fog: 0.7, th: { env: { top: 0x2A3A6A, low: 0x6A7AA8, fog: 0x5A6A98, sun: 0.6, sunCol: 0xC8D8FF, hemi: 0.65, hemiCol: 0xA8B8E8, stars: 1 }, g: [0x3A6A3A, 0x4A7A44, 0x6A7A5A] },
plaza: { k: "tiles", a: 0x5A7A4A, b: 0x4A6A3A },
hero: [["tree", 22, -40, 1, { kind: "oak", h: 22, r: 5 }], ["tree", 26, 40, 1, { kind: "oak", h: 20, r: 5 }], ["tree", 44, -80, 1, { kind: "willow", h: 16, r: 5 }], ["mushrooms", 30, 70, 1.6, { r: 12 }], ["garden", 40, -120, 1, { col: 0xA86AD8, r: 12 }], ["stage", 50, 110, 0.8, { r: 9 }],
["lake", 70, 0, 1, { R: 20, col: 0x3A5A8A }], ["fig", 20, 20, 1.2, { col: 0xE8E0D0, base: 0x8A8A80 }]],
sky: [["city", 740, 0, 1, { col: 0xE8E0D0, roof: 0xC8A060, cols: [0xE8E0D0, 0xD8D0C0, 0xF0E8D8], dome: 1, hmax: 70, R: 70, wallC: 0xD8D0C0, spire: 0.2, n: 16, r: 80 }], ["mountain", 760, 70, 1, { r: 160, h: 100, col: 0x4A5A7A, snow: false }]],
sc: { toadstool: 200, flower: 400, oak: 80 },
edge: { k: "toadstool", sp: 30, off: 5 } };
CT_SCN.sh_dream = { mid: [["tree", 22, 0, 1, { kind: "oak", h: 20 }], ["mushrooms", 20, 0, 1], ["flowerbed", 14, 0, 1], ["beast", 22, 0, 1, { beast: "stag" }], ["tree", 26, 0, 1, { kind: "willow", h: 14 }]], ch: [
[["temple", 26, 0, 0.7, { col: 0xE8E0D0 }], ["fig", 14, -50, 1.2, { col: 0xE8E0D0, base: 0x8A8A80 }], ["folk", 14, 50, 1, { folk: "greek", n: 3, arc: 14 }]],
[["workbench", 12, -40, 1], ["barrels", 14, 40, 1, { n: 3 }], ["folk", 12, 80, 1, { folk: "villager", n: 3, arc: 14 }], ["haystack", 22, -80, 0.7]],
[["tree", 20, -40, 1, { kind: "oak", h: 24 }], ["mushrooms", 16, 40, 1.4], ["lake", 30, 80, 1, { R: 12, col: 0x3A5A8A }]],
[["flowerbed", 12, -40, 1], ["flowerbed", 12, 40, 1], ["garden", 20, 0, 1, { col: 0xA86AD8 }]],
[["tree", 16, -50, 1, { kind: "oak", h: 20 }], ["mushrooms", 14, 60, 1.2], ["beast", 18, 0, 1, { beast: "rabbit" }]],
[["stage", 14, 0, 0.7], ["mushrooms", 16, 60, 1.4], ["tree", 20, -60, 1, { kind: "oak", h: 22 }], ["beast", 18, 80, 1, { beast: "horse", s: 0.6 }]],
[["tree", 16, -40, 1, { kind: "willow", h: 15 }], ["flowerbed", 14, 40, 1], ["mushrooms", 18, 80, 1.2]],
[["tree", 14, -30, 1, { kind: "oak", h: 20 }], ["tree", 16, 30, 1, { kind: "oak", h: 21 }], ["tree", 22, 70, 1, { kind: "oak", h: 18 }], ["mushrooms", 18, -80, 1.6]],
[["lake", 26, 40, 1, { R: 14, col: 0x4A7AA8 }], ["beast", 16, -40, 1, { beast: "horse", n: 2, arc: 15 }], ["beast", 18, -80, 1, { beast: "dog", n: 2, arc: 10 }]],
[["stage", 12, 0, 0.9], ["stands", 20, 0, 0.6], ["lanterns", 14, -60, 1], ["folk", 16, 60, 1, { folk: "noble", n: 4, arc: 14 }]],
[["mushrooms", 14, -40, 1.4], ["flowerbed", 14, 40, 1], ["lanterns", 18, 0, 1]]
] };
ctTale({ id: "sh_tempest", host: "world:bard", t: "The Tempest", by: "William Shakespeare, about 1611", where: "Prospero's enchanted island, far out at sea",
col: ["#1A3A4A", "#E8F4F0"], gold: 20, keep: ["Prospero's broken staff", "🪄"], rad: 10, props: [],
who: [
{ n: "Prospero", who: "Prospero, the rightful Duke of Milan, a great magician, cast away on an island twelve years ago with his daughter by his treacherous brother",
o: { sex: "m", look: { topKind: "robe", top: 0x2A2A5A, bottom: 0x2A2A5A, back: "cloak", backColor: 0x3A2A6A, hat: "wizard", hatColor: 0x2A2A5A, hair: 0xD8D8D0, hairStyle: "long" } }, at: [0, -4], greet: "We are such stuff as dreams are made on, and our little life is rounded with a sleep. ...Welcome to my island, stranger.", c: 1000 },
{ n: "Miranda", who: "Miranda, Prospero's daughter, fifteen, who has seen no other human but her father since she was three",
o: { sex: "f", look: { topKind: "dress", top: 0xE8E0C0, bottom: 0xE8E0C0, bottomKind: "skirt", hat: "flowercrown", hatColor: 0xF0C8D8, hair: 0xD8B060, hairStyle: "long", shoeKind: "sandals" } }, at: [3, -1], greet: "O wonder! How many goodly creatures are there here! How beauteous mankind is! O brave new world, that has such people in it!", c: 700 },
{ n: "Ariel", who: "Ariel, an airy spirit freed by Prospero from a cloven pine, who serves him with magic and longs to be free",
o: { sex: "f", look: { topKind: "dress", top: 0xB8E0F0, bottom: 0xB8E0F0, bottomKind: "skirt", back: "cape", backColor: 0xD8F0FF, hair: 0xE8F0F8, hairStyle: "long", shoeKind: "sandals" } }, at: [-3, -1], greet: "All hail, great master! Grave sir, hail! I come to answer thy best pleasure: be't to fly, to swim, to dive into the fire...", c: 850 },
{ n: "Caliban", who: "Caliban, the island's earliest inhabitant, son of the witch Sycorax, made Prospero's servant against his will, angry, sometimes poetic",
o: { sex: "m", look: { top: 0x5A6A3A, bottom: 0x4A3A2A, hair: 0x2A2A1A, hairStyle: "long", shoeKind: "sandals", waist: "belt" } }, at: [-6, 3], greet: "This island's mine, by Sycorax my mother, which thou tak'st from me. ...Be not afeard; the isle is full of noises, sounds and sweet airs, that give delight and hurt not.", c: 600 },
{ n: "Ferdinand", who: "Ferdinand, Prince of Naples, shipwrecked and separated from his father, who falls in love with Miranda at first sight",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A3A8A, top: 0xE8E0D0, bottom: 0x3A2A5A, hair: 0x8A5A2A, hairStyle: "curly", back: "cape", backColor: 0x4A2A6A } }, at: [6, 1], greet: "Where should this music be? I' the air or the earth? ...Most sure, the goddess on whom these airs attend!", c: 550 },
{ n: "Trinculo", who: "Trinculo, the King of Naples' jester, washed ashore, who hides under Caliban's cloak from a storm",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xD8A030, top: 0x3A6A3A, bottom: 0xD8A030, hat: "jester", hatColor: 0x3A6A3A } }, at: [-8, 5], greet: "Misery acquaints a man with strange bedfellows. ...Is this a fish or a man? I'll creep under his cloak." }
],
steps: [
{ k: "run", w: 2, t: "Prospero orders a tempest! As Ariel, fly through the storm round the King's ship, flaming amazement on every mast and deck, then bring every soul safe ashore. Through every ring!", n: 6, r: 30, secs: 110, done: "'Not a hair perished.' The ship lies safe in a hidden harbour, the crew asleep below, the passengers scattered round the island in groups." },
shkLine(3, "Caliban tells the drunken sailors not to be afraid of the island's strange music: 'Be not afeard; the isle is full of noises...' What next?", "'...sounds and sweet airs, that give delight and hurt not.'", "'...that bite and sting and drown.'", "'...that only madmen hear.'"),
shkLine(0, "Prospero, breaking his staff and drowning his book, speaks to the audience: 'Now my charms are all o'erthrown, and what strength I have's mine own...' He asks the audience to set him free. How?", "With their applause: 'release me from my bands with the help of your good hands.'", "By lighting a candle", "By shouting his name", "Yes. The last thing in many people's minds is that this is Shakespeare's own farewell to the stage, his last play written alone.")
],
qs: [
["Who was Ariel trapped inside before Prospero freed him?", "A cloven pine tree, by the witch Sycorax", "A bottle", "A cave of ice"],
["Why are Prospero and Miranda on the island?", "Prospero's brother Antonio stole his dukedom and set them adrift at sea", "They were shipwrecked on holiday", "They are hiding from a dragon"],
["What does Miranda say when she first sees other people?", "'O brave new world, that has such people in it!'", "'Who goes there?'", "'Off with their heads!'"],
["What does Prospero do with his magic at the end?", "Breaks his staff and drowns his book", "Gives it to Ariel", "Uses it to become King"],
["Which real event of 1609 may have given Shakespeare the idea?", "A ship, the Sea Venture, wrecked on Bermuda; everyone survived", "The Spanish Armada", "The Great Fire of London"],
["About what year was The Tempest written?", "About 1611, near the end of his career", "About 1590, at the start", "About 1700"]
] });
CT_W.sh_tempest = { th: "isle", intro: "A ship at sea, lightning splitting the sky. On the island, a magician watches with his staff raised. And everyone who comes ashore will find the island is not what it seems.", ch: [
["The Tempest", "A ship carrying the King of Naples, his son Ferdinand and Prospero's treacherous brother Antonio is caught in a terrible storm. The sailors cry that all is lost; the nobles get in the way. The ship seems to split.", "wreck,dock", [ctC(0, "The storm is not natural. Who has raised it?", "Prospero, by his magic, with Ariel", "Yes. And not one person on board is harmed.", "Neptune, god of the sea", "The witch Sycorax")], [0, 1]],
["Prospero's Tale", "On the shore Miranda begs her father to stop the storm. He tells her at last who they are: he was Duke of Milan, until his brother stole his dukedom and set them adrift in a rotten boat. They reached this island, where they have lived for twelve years.", "cave,lakeshore", [ctC(1, "Who secretly put food, water, clothes and Prospero's precious books into their boat?", "Gonzalo, a kind old lord of Naples", "Yes. 'Knowing I loved my books, he furnished me from mine own library with volumes that I prize above my dukedom.'", "Antonio", "Caliban")], [0, 1]],
["Ariel's Storm", "Ariel tells how he flew through the ship as fire, and how every passenger is safe but scattered. Ariel asks for his freedom; Prospero reminds him how he rescued him from the pine.", "cliff,wreck", [0], [0, 2]],
["Caliban", "Prospero calls his other servant, Caliban, son of the witch Sycorax, who once showed them every spring and fertile place on the island. Now he hauls wood and curses them.", "cave#6A5A4A,campfire", [ctC(3, "Caliban says the island was his first. What does he say he showed Prospero when they first came?", "All the qualities of the isle: the fresh springs, brine-pits, barren places and fertile", "Yes. Caliban's complaint makes many people think about who really owns a land.", "A hidden treasure", "The way home to Milan")], [3, 0]],
["Ferdinand and Miranda", "Ariel's music leads Ferdinand, who thinks his father is drowned, to Prospero's cell. He and Miranda fall in love at first sight. Prospero pretends to be harsh and sets Ferdinand to carry logs.", "garden,cottage#B8A888", [ctF(4, "Prospero makes Ferdinand carry a thousand logs. Help him: carry five logs to the woodpile.", 5, "brick", 0x7A5A3A, "Logs carried", "Miranda offers to carry them for him. Prospero, watching unseen, is pleased: 'Fair encounter of two most rare affections!'")], [4, 1, 0]],
["The Plotters", "Elsewhere, the King's party searches for Ferdinand. While the King sleeps, Antonio persuades the King's brother Sebastian to kill him and take his crown. Ariel wakes them just in time.", "ruins,bigtree", [ctC(2, "How does Ariel stop Antonio and Sebastian murdering the sleeping King?", "He sings in old Gonzalo's ear and wakes him", "Yes: 'While you here do snoring lie, open-eyed conspiracy his time doth take.'", "He turns into a dragon", "He hides the King's sword")], [2]],
["A Monster and a Jester", "Caliban hides under his cloak from a storm. Trinculo the jester creeps under too. Stephano the drunken butler finds this 'monster with four legs', and gives it wine. Caliban takes Stephano for a god, and they plot to kill Prospero.", "lakeshore,barrels", [1], [3, 5]],
["The Vanishing Banquet", "Strange shapes bring a banquet to the starving King's party. As they reach for it, Ariel appears as a harpy, the banquet vanishes, and Ariel accuses Antonio, Sebastian and the King of their crime against Prospero.", "feasttable,ruins", [ctC(2, "What does Ariel appear as, to make the banquet vanish?", "A harpy: a monster with a woman's face and a bird's wings and claws", "Yes. 'You are three men of sin...' The guilty men go half mad.", "A ghost", "A giant fish")], [2]],
["The Masque", "To bless Ferdinand and Miranda's engagement, Prospero has his spirits perform a masque of goddesses: Iris, Ceres and Juno. Suddenly he remembers Caliban's plot, and the vision vanishes.", "garden,temple#E8E0D0", [shkLine(0, "The masque melts into air. 'Our revels now are ended...' Prospero says the whole world will fade too. 'We are such stuff as dreams are made on...'", "'...and our little life is rounded with a sleep.'", "'...and nothing else at all.'", "'...and so to bed.'")], [0, 1, 4]],
["Glittering Clothes", "Ariel hangs Prospero's glittering clothes on a line as bait. Stephano and Trinculo stop to steal them, forgetting the murder. Spirits in the shape of hounds chase them off.", "cave,chest", [ctF(2, "Hang five glittering robes on the line, as bait for the drunken thieves.", 5, "star", 0xE8C860, "Robes hung", "'O King Stephano! Look what a wardrobe here is for thee!' And the spirit hounds are loosed.")], [2, 3, 5]],
["I'll Drown My Book", "Prospero, with all his enemies in his power, chooses forgiveness, not revenge. He gives up his magic, frees Ariel, forgives his brother, and reveals Ferdinand and Miranda playing chess. They will all sail home to Italy.", "cliff,lakeshore", [2], [0, 1, 2, 4]]
] };
CT_DRESS.sh_tempest = { fog: 0.8,
plaza: { k: "tiles", a: 0xC8B888, b: 0xB0A070 },
hero: [["wreck", 50, 40, 1.2, { r: 16 }], ["cave", 50, -50, 1, { r: 16 }], ["tree", 20, -30, 1, { kind: "cedar", h: 16, crown: 0x3A6A3A, r: 4 }], ["chest", 14, 30, 1.2], ["campfire", 18, -14, 1], ["boat", 24, 60, 1, { kind: "row", col: 0x6A4A2E }],
["fig", 30, 80, 1.6, { col: 0xC8C8D0, base: 0x8A8A80 }], ["lake", 80, -100, 1, { R: 18, col: 0x2A7AA8 }]],
sky: [["mountain", 700, 0, 1, { r: 200, h: 180, col: 0x5A6A5A, snow: false }], ["hull", 420, 60, 1.6, { y: 2, over: 1 }]],
sc: { palm: 200, fern: 200, seashell: 100 },
edge: { k: "seashell", sp: 16, off: 4 } };
CT_SCN.sh_tempest = { mid: [["tree", 22, 0, 1, { kind: "cedar", h: 16 }], ["campfire", 14, 0, 1], ["chest", 14, 0, 1], ["boat", 22, 0, 1, { kind: "row", col: 0x6A4A2E }], ["k:fish", 20, 0, 1, { beast: "fish" }]], ch: [
[["wreck", 26, 0, 1], ["boat", 22, -60, 1, { kind: "row", col: 0x6A4A2E }], ["folk", 14, 60, 1, { folk: "sailor", n: 4, arc: 14 }], ["barrels", 16, -90, 1, { n: 4 }]],
[["cave", 26, -40, 0.7], ["campfire", 12, 40, 1], ["chest", 12, 70, 1], ["tree", 22, 0, 1, { kind: "cedar", h: 16 }]],
[["cliff", 30, 0, 0.7], ["wreck", 36, 60, 0.8], ["tree", 20, -60, 1, { kind: "dead", h: 12 }]],
[["cave", 24, 0, 0.6, { col: 0x6A5A4A }], ["campfire", 14, 60, 1], ["haystack", 18, -60, 0.6]],
[["cottage", 22, 0, 1, { col: 0xB8A888 }], ["barrels", 14, 60, 1, { n: 5 }], ["garden", 18, -60, 1, { col: 0xE8B8C8 }]],
[["ruins", 22, 0, 0.8], ["tree", 18, -60, 1, { kind: "oak", h: 16 }], ["folk", 14, 60, 1, { folk: "noble", n: 4, arc: 14 }]],
[["barrels", 14, 40, 1, { n: 4 }], ["lakeshore", 22, -40, 0.6], ["k:crab", 18, 80, 1, { beast: "crab" }]],
[["feasttable", 12, 0, 1.4], ["ruins", 22, 60, 0.8], ["folk", 14, -60, 1, { folk: "noble", n: 3, arc: 14 }]],
[["temple", 22, 0, 0.7, { col: 0xE8E0D0 }], ["flowerbed", 14, -50, 1], ["flowerbed", 14, 50, 1], ["garden", 20, 80, 1, { col: 0xE8D070 }]],
[["chest", 12, 0, 1], ["cave", 24, -60, 0.6], ["k:dog", 16, 60, 1, { beast: "dog", n: 3, arc: 10 }]],
[["cliff", 30, 0, 0.6], ["boat", 24, 60, 1, { kind: "sail", col: 0x6A4A2E }], ["lakeshore", 20, -60, 0.6], ["folk", 14, 90, 1, { folk: "noble", n: 3, arc: 14 }]]
] };
ctTale({ id: "sh_caesar", host: "world:bard", t: "Julius Caesar", by: "William Shakespeare, 1599", where: "Rome, in 44 BC",
col: ["#4A1A1A", "#F0E8D8"], gold: 18, keep: ["A laurel wreath", "🌿"], rad: 10, props: [],
who: [
{ n: "Julius Caesar", who: "Julius Caesar, the greatest man in Rome, a conquering general, who may be about to make himself king",
o: { sex: "m", look: { topKind: "robe", top: 0xF0E8D8, bottom: 0xF0E8D8, back: "cape", backColor: 0x7A1A3A, hat: "flowercrown", hatColor: 0x5A8A3A, hair: 0x8A8A84, hairStyle: "short", shoeKind: "sandals" } }, at: [0, -4], greet: "Cowards die many times before their deaths; the valiant never taste of death but once. ...Speak; Caesar is turned to hear.", c: 950 },
{ n: "Brutus", who: "Marcus Brutus, Caesar's friend, a noble and honourable Roman who joins the plot because he fears Caesar will become a tyrant",
o: { sex: "m", look: { topKind: "robe", top: 0xE8E0D0, bottom: 0xE8E0D0, back: "cape", backColor: 0x3A3A6A, hair: 0x3A2A1A, hairStyle: "short", shoeKind: "sandals" } }, at: [-3, -1], greet: "Not that I loved Caesar less, but that I loved Rome more. ...Good night, friend. I have not slept since Cassius first did whet me against Caesar.", c: 750 },
{ n: "Mark Antony", who: "Mark Antony, Caesar's loyal friend, a great speaker, who turns the Roman crowd against the murderers",
o: { sex: "m", look: { layer: "armor", layerColor: 0xC8A050, top: 0xA81A1A, bottom: 0xA81A1A, back: "cape", backColor: 0xA81A1A, hair: 0x3A2618, hairStyle: "curly", shoeKind: "sandals" } }, at: [3, -1], greet: "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him.", c: 800 },
{ n: "Cassius", who: "Cassius, lean and hungry, jealous of Caesar, the man who starts the plot",
o: { sex: "m", look: { topKind: "robe", top: 0xD8D0C0, bottom: 0xD8D0C0, back: "cape", backColor: 0x3A4A2A, hair: 0x5A4A3A, hairStyle: "short", shoeKind: "sandals" } }, at: [-6, 2], greet: "The fault, dear Brutus, is not in our stars, but in ourselves, that we are underlings. ...Why, man, he doth bestride the narrow world like a Colossus." },
{ n: "The Soothsayer", who: "the Soothsayer, an old fortune-teller who warns Caesar to beware the Ides of March",
o: { sex: "m", look: { topKind: "robe", top: 0x6A5A4A, bottom: 0x6A5A4A, hat: "hood", hatColor: 0x5A4A3A, hair: 0xC8C8C0, hairStyle: "long" } }, at: [5, 4], greet: "Beware the Ides of March. ...I say it to you as I said it to him. The Ides are come. Ay, but not gone." },
{ n: "Calpurnia", who: "Calpurnia, Caesar's wife, who dreams of his statue spouting blood and begs him to stay home",
o: { sex: "f", look: { topKind: "dress", top: 0xE8D8C8, bottom: 0xE8D8C8, bottomKind: "skirt", back: "cape", backColor: 0x6A3A6A, hair: 0x2A1A12, hairStyle: "bun", neck: "necklace", accColor: 0xD8B040 } }, at: [2, 4], greet: "When beggars die, there are no comets seen; the heavens themselves blaze forth the death of princes. ...Do not go forth today!" }
],
steps: [
{ k: "code", w: 4, t: "The Soothsayer calls out from the crowd. 'Beware the Ides of March!' On what date are the Ides of March? (a number)", a: ["15", "fifteen", "15th", "fifteenth"], hint: "In the Roman calendar the Ides fell in the middle of March.", done: "The 15th of March. In 44 BC, Caesar was killed on that very day." },
shkLine(2, "Antony speaks over Caesar's body: 'Friends, Romans, countrymen, lend me your ears...' What comes next?", "'I come to bury Caesar, not to praise him.'", "'I come to crown him king.'", "'I come to hear you cheer.'"),
{ k: "run", w: 2, t: "Antony has turned the crowd! Rome is in uproar. The conspirators must flee the city: get through every gate before the mob catches you.", n: 6, r: 30, secs: 110, done: "'Mischief, thou art afoot, take thou what course thou wilt!' Brutus and Cassius ride like madmen out of Rome." }
],
qs: [
["What does the Soothsayer warn Caesar to beware?", "The Ides of March", "The Lion of Africa", "The River Thames"],
["What are Caesar's famous last words in the play?", "'Et tu, Brute? Then fall, Caesar!'", "'Friends, Romans, countrymen'", "'To be or not to be'"],
["Why does Brutus join the plot against his friend?", "He fears Caesar will become a tyrant king, and loves Rome more", "He wants to be emperor himself", "Caesar insulted him"],
["Whose speech at the funeral turns the crowd against the conspirators?", "Mark Antony's", "Cassius's", "Calpurnia's"],
["Where did Shakespeare find the story?", "Plutarch's Lives, a Greek history, in Thomas North's English translation", "A Roman newspaper", "He saw it himself"],
["Julius Caesar was probably one of the first plays performed at a brand new theatre in 1599. Which?", "The Globe", "The Rose", "The Swan"]
] });
CT_W.sh_caesar = { th: "desert", intro: "Rome, 44 BC. Caesar has come home in triumph, and the people are cheering. But in the shadows of the Forum, some of Rome's greatest men are whispering.", ch: [
["The Feast of Lupercal", "The people pour into the streets to cheer Caesar's triumph. In the crowd a voice cries out: 'Beware the Ides of March.' Caesar dismisses it: 'He is a dreamer; let us leave him.'", "temple#E8E0D0,street", [0], [4, 0, 5]],
["Cassius Whispers", "As the crowds cheer, Cassius works on his friend Brutus: Caesar is only a man, no better than they; why should he rule them? Offstage, Antony offers Caesar a crown three times; three times he refuses it, each time more slowly.", "temple#E8E0D0,obelisk", [ctC(3, "Cassius says the fault that they are 'underlings' is not in their stars. Where then?", "'in ourselves'", "Yes: 'The fault, dear Brutus, is not in our stars, but in ourselves.'", "'in Caesar'", "'in the gods'")], [3, 1]],
["Strange Omens", "A night of storms: lions in the streets, men on fire who are not burnt, an owl at noon. The conspirators meet. Cassius throws letters through Brutus's window, as if from Roman citizens begging him to act.", "street,obelisk", [ctF(3, "Cassius has written letters in different hands, to look like many Romans' pleas. Drop five of them at Brutus's door and window.", 5, "page", 0xE8E0C8, "Letters dropped", "Brutus reads: 'Brutus, thou sleep'st: awake!' And he decides.")], [3]],
["Brutus's Orchard", "Sleepless, Brutus decides Caesar must die before he becomes a tyrant. The conspirators arrive at dawn. Brutus will not let them kill Antony too. His wife Portia begs to know his secret.", "garden,manor#E8E0D0", [ctC(1, "Cassius wants to kill Mark Antony too. What does Brutus say?", "No: they must be 'sacrificers, but not butchers'", "Yes. A noble choice, and the mistake that ruins them.", "Yes, and Calpurnia too", "Let the gods decide")], [1, 3]],
["Calpurnia's Dream", "Calpurnia dreamt Caesar's statue ran with blood. The priests' omens are terrible. Caesar agrees to stay home, until a conspirator explains the dream away and tells him the Senate means to crown him today.", "palace#E8E0D0,garden", [ctC(5, "How does the conspirator Decius make Calpurnia's dream sound good?", "The blood means Rome will draw new life from Caesar", "Yes. And he teases Caesar that the Senate will laugh if he stays home because of his wife's dreams.", "He says it was only wine", "He says dreams mean the opposite of nothing")], [0, 5]],
["The Ides of March", "On the way to the Senate, Caesar passes the Soothsayer: 'The Ides of March are come.' 'Ay, Caesar; but not gone.' At the Capitol the conspirators kneel round him, then stab him. Last, Brutus.", "temple#F0E8D8,throne", [ctC(0, "Seeing his friend Brutus among his killers, what does Caesar say?", "'Et tu, Brute? Then fall, Caesar!'", "Yes: 'You too, Brutus?' The most famous last words in theatre.", "'Remember me'", "'A horse!'")], [0, 1, 3, 4]],
["Friends, Romans, Countrymen", "At the funeral Brutus speaks first, calmly: he killed Caesar for Rome. The crowd cheers. Then Antony speaks, again and again calling Brutus 'an honourable man', showing Caesar's wounds and his will, until the crowd is ready to burn the city.", "stands,obelisk", [1, ctC(2, "Antony keeps saying 'Brutus is an honourable man'. What does the crowd come to feel he really means?", "The opposite: that Brutus and the others are traitors", "Yes. Irony: by the end the words mean their opposite. One of the greatest speeches ever written.", "That Brutus should be king", "That he agrees with Brutus")], [2, 1]],
["Riot in the Streets", "The mob runs wild. Brutus and Cassius flee Rome. Antony, Octavius and Lepidus join forces against them.", "street,ruins", [2], [2]],
["The Quarrel in the Tent", "Far from Rome, Brutus and Cassius quarrel bitterly in their tent, then make up. Brutus has heard that Portia is dead. That night Caesar's ghost appears to Brutus: 'Thou shalt see me at Philippi.'", "tents,camp", [ctC(1, "Caesar's ghost appears to Brutus. Where does it say they will meet again?", "At Philippi", "Yes, the battlefield in Greece where the war will end.", "At the Capitol", "In Egypt")], [1, 3, 0]],
["Philippi", "The armies meet at Philippi. Cassius, thinking all lost, dies on his own sword. Brutus, defeated, does the same. Antony calls him 'the noblest Roman of them all'.", "camp,banner", [ctC(2, "What does Antony say of Brutus at the very end?", "'This was the noblest Roman of them all'", "Yes: of all the conspirators only Brutus acted for Rome, not from envy.", "'He got what he deserved'", "'Let him lie unburied'")], [1, 2, 3]]
] };
CT_DRESS.sh_caesar = { fog: 0.85, th: { g: [0xB8A070, 0xC8B080, 0x9A8A6A] },
plaza: { k: "tiles", a: 0xE0D8C8, b: 0xC8C0B0 },
hero: [["temple", 40, -40, 1.2, { col: 0xE8E0D0, r: 16 }], ["temple", 44, 40, 1, { col: 0xE0D8C8, r: 14 }], ["obelisk", 18, -16, 1], ["obelisk", 18, 16, 1], ["fig", 22, -60, 1.6, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["fig", 22, 60, 1.6, { col: 0xE8E4DC, base: 0xB8B0A0 }],
["chariot", 30, 90, 1], ["banner", 14, -90, 1, { col: 0xA81A1A }], ["colossus", 60, -120, 1, { col: 0xE0D8C8, r: 4 }]],
sky: [["city", 720, 0, 1, { col: 0xE8E0D0, roof: 0xB0502A, cols: [0xE8E0D0, 0xD8C8B0, 0xF0E8D8], dome: 1, hmax: 90, R: 90, wallC: 0xD8C8B0, spire: 0.1, n: 22, r: 100 }], ["mountain", 780, -60, 1, { r: 180, h: 100, col: 0x8A8A70, snow: false }]],
sc: { cedar: 200, olive: 120, boulder: 40 },
edge: { k: "bannerb", sp: 40, off: 5 } };
CT_SCN.sh_caesar = { mid: [["obelisk", 18, 0, 1], ["fig", 20, 0, 1.4, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["tree", 22, 0, 1, { kind: "cedar", h: 16 }], ["chariot", 22, 0, 1], ["k:horse", 22, 0, 1, { beast: "horse" }]], ch: [
[["folk", 14, 0, 1, { folk: "greek", n: 5, arc: 12 }], ["banner", 16, -60, 1, { col: 0xA81A1A }], ["banner", 16, 60, 1, { col: 0xA81A1A }], ["chariot", 22, 90, 1]],
[["fig", 16, -40, 1.6, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["obelisk", 20, 40, 1], ["folk", 14, 80, 1, { folk: "greek", n: 3, arc: 14 }]],
[["k:lion", 20, -50, 1, { beast: "lion" }], ["k:owl", 16, 50, 1, { beast: "owl" }], ["obelisk", 22, 0, 1]],
[["tree", 16, -40, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xD8A02A }], ["garden", 18, 40, 1, { col: 0xC8A0D0 }], ["folk", 14, 80, 1, { folk: "robe", n: 3, arc: 14 }]],
[["fig", 14, -40, 1.4, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["armchairs", 12, 40, 1], ["garden", 20, 80, 1, { col: 0xD8C070 }]],
[["throne", 12, 0, 1], ["folk", 14, -60, 1, { folk: "robe", n: 5, arc: 12 }], ["fig", 20, 60, 1.6, { col: 0xE8E4DC, base: 0xB8B0A0 }]],
[["stands", 16, 0, 0.8], ["folk", 16, -60, 1, { folk: "greek", n: 6, arc: 10 }], ["folk", 16, 60, 1, { folk: "peasant", n: 4, arc: 12 }]],
[["burnt", 22, -40, 1], ["potfire", 14, 40, 1], ["ruins", 24, 80, 0.8]],
[["tents", 20, 0, 1], ["camp", 14, -60, 1], ["banner", 16, 60, 1, { col: 0x3A3A6A }], ["folk", 14, 90, 1, { folk: "soldier", n: 3, arc: 14 }]],
[["banner", 16, -40, 1, { col: 0xA81A1A }], ["banner", 16, 40, 1, { col: 0x3A3A6A }], ["folk", 16, 0, 1, { folk: "soldier", n: 5, arc: 12 }], ["k:horse", 22, 80, 1, { beast: "horse", n: 2, arc: 15 }]]
] };
ctTale({ id: "sh_lear", host: "world:bard", t: "King Lear", by: "William Shakespeare, about 1606", where: "ancient Britain, on a stormy heath",
col: ["#2A2A3A", "#E8E0D0"], gold: 20, keep: ["Lear's broken crown", "👑"], rad: 10, props: [],
who: [
{ n: "King Lear", who: "King Lear of ancient Britain, eighty years old, proud and rash, who divides his kingdom among his daughters and loses everything",
o: { sex: "m", look: { topKind: "robe", top: 0x5A2A6A, bottom: 0x5A2A6A, back: "cape", backColor: 0x3A1A4A, hat: "crown", hatColor: 0xD8B040, hair: 0xF0F0E8, hairStyle: "long" } }, at: [0, -4], greet: "Blow, winds, and crack your cheeks! Rage! Blow! ...Who is it that can tell me who I am?", c: 950 },
{ n: "Cordelia", who: "Cordelia, Lear's youngest daughter, honest and loving, who will not flatter him and is banished for it",
o: { sex: "f", look: { topKind: "dress", top: 0xE8E0F0, bottom: 0xE8E0F0, bottomKind: "skirt", hat: "tiara", hatColor: 0xE8E0E8, hair: 0xD8B070, hairStyle: "long" } }, at: [3, -1], greet: "Nothing, my lord. ...I love your majesty according to my bond, no more nor less.", c: 750 },
{ n: "The Fool", who: "Lear's Fool, the only one who dares tell the King the truth, in jokes, songs and riddles",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x3A6A3A, top: 0xD8A030, bottom: 0x3A6A3A, hat: "jester", hatColor: 0xD8A030 } }, at: [-3, -1], greet: "Nuncle, give me an egg, and I'll give thee two crowns. ...Thou shouldst not have been old till thou hadst been wise.", c: 650 },
{ n: "Goneril", who: "Goneril, Lear's eldest daughter, who flatters him for her share of the kingdom, then turns him out",
o: { sex: "f", look: { topKind: "dress", top: 0x3A3A5A, bottom: 0x3A3A5A, bottomKind: "skirt", hat: "crown", hatColor: 0xB8B8C0, hair: 0x1A1A1A, hairStyle: "bun" } }, at: [-6, 2], greet: "Sir, I love you more than words can wield the matter, dearer than eyesight, space and liberty..." },
{ n: "Edgar", who: "Edgar, the Earl of Gloucester's true son, falsely accused by his half-brother, who disguises himself as Poor Tom, a mad beggar",
o: { sex: "m", look: { top: 0x6A5A4A, bottom: 0x5A4A3A, hair: 0x4A3A2A, hairStyle: "long", back: "cloak", backColor: 0x4A3A2A } }, at: [5, 3], greet: "Poor Tom's a-cold. ...Edgar I nothing am. But in this storm, I'll keep the King company.", c: 550 },
{ n: "The Earl of Gloucester", who: "the Earl of Gloucester, an old lord loyal to Lear, cruelly blinded for helping him",
o: { sex: "m", look: { topKind: "robe", top: 0x3A4A3A, bottom: 0x3A4A3A, hair: 0xD8D8D0, hairStyle: "short" } }, at: [-4, 5], greet: "As flies to wanton boys are we to the gods; they kill us for their sport." }
],
steps: [
{ k: "choose", w: 0, t: "Lear asks his daughters which of them loves him most, to share out his kingdom. Goneril and Regan flatter him. What do you, as Cordelia, answer?", o: [["'Nothing, my lord.' I love you as a daughter should, no more nor less.", 1, "'Nothing will come of nothing: speak again.' But Cordelia will not lie, and Lear, in a rage, disowns her."], ["'More than all the stars in heaven!'", 0, "That is what her sisters say. Cordelia would never say it, because it isn't true."], ["'Give me the biggest share and I'll tell you.'", 0, "Cordelia wants nothing she has not earned."]] },
{ k: "run", w: 2, t: "The storm breaks on the heath! Lear rages bareheaded against the wind. Lead the old King and his Fool through the storm to the hovel for shelter.", n: 6, r: 30, secs: 120, done: "'Here is the place, my lord; good my lord, enter.' Inside crouches Poor Tom, the mad beggar, who is really Edgar in disguise." },
shkLine(0, "Lear wakes, gentle at last, and knows Cordelia. 'Pray you now, forget and forgive...' Later, carrying her body, he cries a word five times. Which?", "'Never, never, never, never, never.'", "'Farewell, farewell...'", "'Cordelia, Cordelia...'", "Yes, a line made only of one word, five times: perhaps the saddest line Shakespeare ever wrote.")
],
qs: [
["Why does Lear banish Cordelia?", "She will not flatter him with false words of love", "She steals his crown", "She marries without asking"],
["Who is Poor Tom, the mad beggar on the heath?", "Edgar, in disguise", "The Fool", "Gloucester"],
["Who is the only person who dares tell Lear the truth with jokes?", "The Fool", "Goneril", "Edmund"],
["What is the setting of King Lear?", "Ancient Britain, before the Romans", "Rome", "Denmark"],
["What does Lear say when Cordelia says she has nothing to say?", "'Nothing will come of nothing'", "'To be or not to be'", "'Off with her head'"],
["What happens to the Earl of Gloucester?", "He is blinded for helping the King", "He becomes king", "He sails to France"]
] });
CT_W.sh_lear = { th: "moor", intro: "Ancient Britain, long before the Romans. An old king has decided to give away his kingdom, and he wants to hear his daughters say how much they love him.", ch: [
["The Division of the Kingdom", "In his throne room, King Lear, eighty years old, will divide Britain between his three daughters, the largest share to whoever loves him most. Goneril and Regan pour out flattery. Cordelia will not.", "hall#7A7A80,throne", [0], [0, 1, 3]],
["Edmund's Lie", "At the Earl of Gloucester's castle, his younger son Edmund, born outside marriage, forges a letter to make his father think his true son Edgar plans to kill him. Edgar flees.", "castle#6A6A60,garden", [ctC(5, "Edmund resents being born outside marriage. What does he plan?", "To trick his father into disowning Edgar so he gets the land instead", "Yes. 'Now, gods, stand up for bastards!' he says.", "To join the Fool", "To marry Cordelia")], [5, 4]],
["Turned Out", "Lear stays with Goneril, with his hundred knights. She orders him to dismiss half of them. He storms off to Regan, who is no better. They strip him of all his followers.", "castle#5A5A62,wall", [ctC(2, "The Fool keeps telling Lear the truth with jokes. What does he say about Lear's mistake?", "'Thou shouldst not have been old till thou hadst been wise'", "Yes. Painful, and true.", "'Well done, nuncle!'", "'Your daughters are angels'")], [0, 2, 3]],
["Blow, Winds", "A terrible storm on the open heath. Lear, bareheaded, rages at the wind and rain, with only the Fool for company, and begins to go mad.", "stones,tree", [shkLine(0, "Lear shouts at the storm: 'Blow, winds, and crack your cheeks!' Then?", "'Rage! Blow!'", "'Be still!'", "'Bring me wine!'")], [0, 2]],
["The Hovel", "Loyal friends find a hovel. Inside is Poor Tom, almost naked, raving: Edgar in disguise. Lear, seeing him, understands for the first time how the poor of his kingdom suffer.", "hut,campfire", [1], [0, 2, 4]],
["Gloucester", "For helping Lear, Gloucester is blinded by Regan's husband. Turned out of his own house, he is led by an old man, and meets his own son, Edgar, still disguised as Poor Tom, who does not tell him who he is.", "castle#4A4A50,ruins", [ctC(5, "Blinded, Gloucester finally learns the truth. Which son was really loyal to him?", "Edgar", "Yes. 'I stumbled when I saw.' He could not see the truth until he lost his eyes.", "Edmund", "Neither")], [5, 4]],
["The Cliffs of Dover", "Gloucester asks Poor Tom to lead him to the cliffs of Dover so he can throw himself off. Edgar leads him to flat ground and lets him 'fall', then convinces him he was saved by a miracle, and should live.", "cliff#D8D8D0,lighthouse", [ctC(4, "Why does Edgar trick his blind father about the cliff?", "So he will believe the gods saved him, and want to live", "Yes. A strange, kind trick: 'Thy life's a miracle.'", "To steal his ring", "Because he is truly mad")], [4, 5]],
["Cordelia's Return", "Cordelia comes back with a French army to save her father. He wakes in her camp, clean and calm, and knows her. They are reconciled.", "tents,camp", [ctS(1, "O my dear father! Restoration hang thy medicine on my lips... How does my royal lord? How fares your majesty?")], [0, 1]],
["The Duel of Brothers", "The French are defeated. Lear and Cordelia are taken prisoner. Edgar, disguised as a knight, challenges Edmund and wins. Dying, Edmund tries to undo his order to kill Cordelia, too late.", "camp,banner", [ctC(4, "In disguise, Edgar challenges his brother Edmund to a fight. Who wins?", "Edgar", "Yes. 'The wheel is come full circle,' says Edmund, dying.", "Edmund", "No one")], [4]],
["Never, Never", "Lear enters carrying Cordelia's body. He thinks for a moment she may be breathing, and dies. Edgar is left to speak for all: 'The oldest hath borne most.'", "ruins,cross", [2], [0, 1, 4]]
] };
CT_DRESS.sh_lear = { fog: 0.5, th: { g: [0x5A5A3A, 0x6A6A4A, 0x7A7A5A] },
plaza: { k: "tiles", a: 0x5A5A54, b: 0x4A4A44 },
hero: [["stones", 40, -60, 1, { n: 12, R: 10, col: 0x7A7A72 }], ["tree", 20, -30, 1, { kind: "blasted", h: 12 }], ["tree", 30, 50, 1, { kind: "dead", h: 13 }], ["hut", 30, 30, 1], ["campfire", 16, 20, 1], ["banner", 14, -14, 1, { col: 0x5A2A6A }],
["castle", 80, 90, 1, { col: 0x6A6A70, roof: 0x3A3A44, flag: 0x5A2A6A, r: 26 }]],
sky: [["mountain", 720, 0, 1, { r: 200, h: 120, col: 0x4A4A52, snow: false }], ["cragcastle", 700, -60, 1, { h: 50, col: 0x5A5A62, rock: 0x4A4A4A }]],
sc: { boulder: 220, dead: 100, sheep: 60 },
edge: { k: "runes", sp: 60, off: 5 } };
CT_SCN.sh_lear = { mid: [["tree", 22, 0, 1, { kind: "blasted", h: 12 }], ["stones", 30, 0, 0.4, { col: 0x6A6A62 }], ["hut", 20, 0, 1], ["runestone", 18, 0, 1], ["k:sheep", 20, 0, 1, { beast: "sheep" }]], ch: [
[["throne", 12, 0, 1], ["folk", 14, -50, 1, { folk: "noble", n: 4, arc: 14 }], ["banner", 16, 60, 1, { col: 0x5A2A6A }], ["chandelier", 10, 30, 1]],
[["garden", 16, -40, 1, { col: 0x8AA86A }], ["chest", 12, 40, 1], ["folk", 14, 80, 1, { folk: "guard" }]],
[["wall", 24, 0, 0.5, { col: 0x5A5A62 }], ["folk", 14, -60, 1, { folk: "knight", n: 3, arc: 14 }], ["k:horse", 20, 60, 1, { beast: "horse", n: 2, arc: 15 }]],
[["tree", 14, -40, 1, { kind: "blasted", h: 12 }], ["stones", 22, 40, 0.5, { col: 0x6A6A62 }], ["bones", 16, 80, 0.5]],
[["hut", 14, 0, 1], ["campfire", 12, 60, 1], ["haystack", 16, -60, 0.6]],
[["ruins", 22, 0, 0.8], ["folk", 14, -60, 1, { folk: "peasant" }], ["tree", 18, 60, 1, { kind: "dead", h: 12 }]],
[["cliff", 30, 0, 0.6, { col: 0xD8D8D0 }], ["lighthouse", 28, 60, 0.8], ["k:gull", 18, -40, 1, { beast: "gull", n: 2, arc: 15 }]],
[["tents", 20, 0, 1], ["banner", 16, -50, 1, { col: 0x2A3A8A }], ["folk", 14, 60, 1, { folk: "soldier", n: 3, arc: 14 }]],
[["banner", 16, -40, 1, { col: 0x5A2A6A }], ["banner", 16, 40, 1, { col: 0x2A3A8A }], ["folk", 16, 0, 1, { folk: "knight", n: 4, arc: 12 }]],
[["cross", 14, -30, 1, { n: 3, gap: 4 }], ["ruins", 22, 60, 0.8], ["tree", 20, -80, 1, { kind: "dead", h: 12 }]]
] };
ctTale({ id: "sh_othello", host: "world:bard", t: "Othello, the Moor of Venice", by: "William Shakespeare, about 1603", where: "Venice, and the island of Cyprus",
col: ["#1A2A3A", "#F0E0C8"], gold: 20, keep: ["Desdemona's handkerchief", "🧣"], rad: 10, props: [],
who: [
{ n: "Othello", who: "Othello, a great general of Venice, a Moor from North Africa, noble, brave and trusting, who is tricked into terrible jealousy",
o: { sex: "m", look: { layer: "armor", layerColor: 0xC8A050, top: 0xE8E0D0, bottom: 0x2A2A3A, back: "cloak", backColor: 0x8A1A1A, hair: 0x1A1410, hairStyle: "short", waist: "belt", shoeKind: "boots" } }, at: [0, -4], greet: "Keep up your bright swords, for the dew will rust them. ...I have done the state some service, and they know't.", c: 950 },
{ n: "Desdemona", who: "Desdemona, a Venetian noblewoman, brave and loving, who married Othello against her father's wishes",
o: { sex: "f", look: { topKind: "dress", top: 0xF0E8E0, bottom: 0xF0E8E0, bottomKind: "skirt", neck: "necklace", accColor: 0xE8E0D0, hair: 0xC8A060, hairStyle: "long" } }, at: [3, -1], greet: "My noble father, I do perceive here a divided duty... But here's my husband. ...Welcome to Cyprus.", c: 800 },
{ n: "Iago", who: "Iago, Othello's ensign, who seems honest to everyone and is the most cunning villain in all of Shakespeare",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x3A3A2A, top: 0x8A7A5A, bottom: 0x3A3A2A, hair: 0x2A2A1A, hairStyle: "short", waist: "belt" } }, at: [-3, -1], greet: "O, beware, my lord, of jealousy; it is the green-eyed monster which doth mock the meat it feeds on. ...I am not what I am.", c: 750 },
{ n: "Emilia", who: "Emilia, Iago's wife and Desdemona's maid, outspoken, who finally exposes her husband",
o: { sex: "f", look: { topKind: "dress", top: 0x6A4A3A, bottom: 0x6A4A3A, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hair: 0x5A3A1A, hairStyle: "bun" } }, at: [5, 2], greet: "'Tis not a year or two shows us a man. ...I will not hold my tongue." },
{ n: "Cassio", who: "Michael Cassio, Othello's young lieutenant, honest and courteous, whom Iago uses as a tool",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x2A4A7A, top: 0xE8E0D0, bottom: 0x2A3A5A, hair: 0xB88A4A, hairStyle: "curly" } }, at: [-6, 2], greet: "Reputation, reputation, reputation! O, I have lost my reputation! I have lost the immortal part of myself." }
],
steps: [
{ k: "find", w: 2, t: "Iago needs Desdemona's handkerchief, Othello's first gift to her, embroidered with strawberries. Emilia found it where it fell. Find the five places Iago looks, to see where it is now.", n: 5, look: "star", col: 0xE8E0D0, r: 28, secs: 180, name: "Places searched", done: "Iago plants it in Cassio's room. 'Trifles light as air are to the jealous confirmations strong as proofs of holy writ.'" },
shkLine(2, "Iago, pretending to warn Othello: 'O, beware, my lord, of jealousy...' How does he describe it?", "'...it is the green-eyed monster which doth mock the meat it feeds on.'", "'...it is the red-eyed dragon.'", "'...it is the cold north wind.'", "Yes. From this line we still call jealousy 'the green-eyed monster'."),
{ k: "choose", w: 3, t: "Othello has killed Desdemona, believing Iago's lies. Emilia arrives. What does she do?", o: [["Tells everyone the truth about the handkerchief and Iago, though he threatens her", 1, "'I will not charm my tongue; I am bound to speak.' Iago kills her, but the truth is out."], ["Says nothing, out of fear", 0, "Emilia is not silent. She speaks the truth, and pays for it."], ["Runs away to Venice", 0, "Emilia stays, and speaks."]] }
],
qs: [
["What gift does Iago use to make Othello believe Desdemona is unfaithful?", "Her handkerchief, embroidered with strawberries", "A ring", "A letter"],
["What does Iago call jealousy?", "The green-eyed monster", "The black dog", "The silent wolf"],
["Where does most of the play take place?", "Cyprus, after the start in Venice", "Rome", "Egypt"],
["Who finally exposes Iago's lies?", "Emilia, his own wife", "Cassio", "The Duke of Venice"],
["Where did Shakespeare find the story?", "An Italian tale by Cinthio, from 1565", "An English ballad", "Ancient Greece"],
["Why is Othello so admired as a character?", "A noble, brave hero, brought down by trusting a liar", "He is a great magician", "He is very funny"]
] });
CT_W.sh_othello = { th: "isle", intro: "Venice by night, gondolas on dark canals; then the island of Cyprus, where a Turkish fleet is coming and a general and his new wife have just arrived.", ch: [
["Night in Venice", "Iago, passed over when Othello made Cassio his lieutenant, wakes Senator Brabantio at night shouting that his daughter Desdemona has run off with Othello. 'I am not what I am,' Iago tells us.", "dock,manor#D8C8A8", [ctC(2, "Why does Iago say he hates Othello?", "Othello promoted Cassio to lieutenant instead of him", "Yes. That is the reason he gives. He gives others too, and none seem quite enough.", "Othello stole his money", "Othello is his brother")], [2, 4]],
["Before the Duke", "Before the Duke and Senate, Brabantio accuses Othello of winning his daughter with witchcraft. Othello says he won her with the story of his life. Desdemona says she chose him. The Duke sends Othello to defend Cyprus against the Turks.", "palace#D8C8A8,throne", [ctC(0, "How does Othello say he won Desdemona's love?", "By telling her the stories of his adventures and battles", "Yes: 'She loved me for the dangers I had passed, and I loved her that she did pity them.'", "With a love potion", "By singing")], [0, 1]],
["Landing in Cyprus", "A storm destroys the Turkish fleet. Othello's ship, separated in the storm, reaches Cyprus safely, and he and Desdemona are joyfully reunited.", "dock,lighthouse", [ctC(1, "What happens to the Turkish fleet that was coming to attack Cyprus?", "It is wrecked in the storm", "Yes. The war is over before it starts, and the real danger is now inside Othello's camp.", "It wins", "It turns back to Venice")], [0, 1, 2, 4]],
["Cassio's Drink", "At the celebrations, Iago gets Cassio drunk and starts a brawl. Othello dismisses Cassio from his post. Iago advises him to ask Desdemona to plead for him: part of his plan.", "feasttable,barrels", [ctC(4, "Cassio has lost his post. What does he say he has lost?", "His reputation, 'the immortal part of myself'", "Yes. Iago replies that reputation is just an idle notion.", "His sword", "His horse")], [4, 2]],
["The Green-Eyed Monster", "Iago drops hints. When Desdemona pleads for Cassio, Iago makes it look like love. Othello begins to doubt her.", "garden,manor#D8C8A8", [1], [0, 2, 1]],
["The Handkerchief", "Desdemona drops the handkerchief that was Othello's first gift to her. Emilia picks it up and gives it to Iago, who plants it on Cassio.", "manor#D8C8A8,garden", [0], [2, 3]],
["Ocular Proof", "Othello demands 'ocular proof'. Iago arranges for him to overhear Cassio laughing (about another woman) and see the handkerchief. Othello is convinced.", "street,arch", [ctC(2, "Othello demands 'ocular proof'. What does 'ocular' mean?", "Something seen with the eyes", "Yes. And Iago gives him a false sight to see.", "Written in a book", "Sworn on oath")], [0, 2, 4]],
["The Willow Song", "Desdemona, ordered to bed and confused, sings a sad old song, 'The Willow Song', as Emilia helps her undress. They talk of husbands and wives.", "manor#C8B8A0,chandelier", [ctS(1, "The poor soul sat sighing by a sycamore tree, sing all a green willow... Mine eyes do itch; does that bode weeping?")], [1, 3]],
["The Truth Comes Out", "Othello kills Desdemona. Emilia exposes Iago. Seeing what he has done, Othello asks to be remembered as 'one that loved not wisely but too well', and dies by his own hand. Iago refuses ever to explain.", "manor#B8A890,cross", [2], [0, 3, 2, 4]]
] };
CT_DRESS.sh_othello = { fog: 0.8,
plaza: { k: "tiles", a: 0xD8C8A8, b: 0xB8A888 },
hero: [["lighthouse", 50, -40, 1, { r: 6 }], ["dock", 24, 40, 1.2], ["boat", 34, 60, 1.2, { kind: "sail", col: 0x6A4A2E }], ["house", 30, -60, 1, { w: 10, h: 9, col: 0xE8D8B8, roof: 0xB86A3A, r: 7 }], ["cannon", 16, -20, 1.2], ["cannon", 16, 20, 1.2],
["banner", 14, -12, 1, { col: 0x8A1A1A }], ["wall", 60, -100, 1, { col: 0xC8B898 }]],
sky: [["city", 720, 0, 1, { col: 0xE8D8B8, roof: 0xB86A3A, cols: [0xE8D8B8, 0xD8C8A0, 0xF0E0C0], dome: 1, hmax: 70, R: 70, wallC: 0xC8B898, spire: 0.3, n: 18, r: 80 }], ["mountain", 760, 60, 1, { r: 180, h: 120, col: 0x8A9A7A, snow: false }]],
sc: { palm: 120, cedar: 120, olive: 80 },
edge: { k: "bannerb", sp: 40, off: 5 } };
CT_SCN.sh_othello = { mid: [["cannon", 16, 0, 1], ["boat", 22, 0, 1, { kind: "row", col: 0x6A4A2E }], ["tree", 22, 0, 1, { kind: "cedar", h: 14 }], ["barrels", 16, 0, 1, { n: 3 }], ["house", 30, 0, 1, { w: 9, h: 8, col: 0xE8D8B8, roof: 0xB86A3A }]], ch: [
[["boat", 18, 40, 1, { kind: "row", col: 0x1A1A1A }], ["lanterns", 14, -40, 1], ["house", 26, -80, 1, { w: 9, h: 10, col: 0xD8C8A8, roof: 0xB86A3A }]],
[["throne", 12, 0, 1], ["folk", 14, -50, 1, { folk: "noble", n: 5, arc: 12 }], ["chandelier", 10, 40, 1]],
[["boat", 24, 40, 1.2, { kind: "sail", col: 0x6A4A2E }], ["folk", 14, -40, 1, { folk: "soldier", n: 4, arc: 14 }], ["cannon", 16, 80, 1]],
[["feasttable", 12, 0, 1.2], ["barrels", 14, 60, 1, { n: 5 }], ["folk", 14, -60, 1, { folk: "soldier", n: 3, arc: 14 }], ["lanterns", 18, -90, 1]],
[["garden", 16, -40, 1, { col: 0xE8C8A0 }], ["tree", 18, 40, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xE8A02A }], ["fig", 22, 80, 1.4, { col: 0xE0D8C8, base: 0xA8A090 }]],
[["armchairs", 12, -40, 1], ["chest", 12, 40, 1], ["garden", 20, 80, 1, { col: 0xD8B0B0 }]],
[["arch", 14, 0, 1], ["folk", 14, -60, 1, { folk: "peasant", n: 2, arc: 14 }], ["barrels", 14, 60, 1, { n: 3 }]],
[["chandelier", 10, 0, 1], ["tree", 18, -50, 1, { kind: "willow", h: 12 }], ["chest", 12, 50, 1]],
[["cross", 14, -30, 1], ["chandelier", 10, 0, 1], ["folk", 14, 60, 1, { folk: "noble", n: 3, arc: 14 }]]
] };
ctTale({ id: "sh_twelfth", host: "world:bard", t: "Twelfth Night, or What You Will", by: "William Shakespeare, about 1601", where: "Illyria, a land by the sea",
col: ["#2A3A5A", "#F8E8C8"], gold: 18, keep: ["Malvolio's yellow stocking", "🧦"], rad: 10, props: [],
who: [
{ n: "Viola", who: "Viola, a shipwrecked young woman who disguises herself as a young man, Cesario, to serve Duke Orsino, and falls in love with him",
o: { sex: "f", look: { layer: "tunic", layerColor: 0x3A5A8A, top: 0xE8E0D0, bottom: 0x2A3A5A, hair: 0x8A5A2A, hairStyle: "short", hat: "cap", hatColor: 0x2A3A5A, shoeKind: "boots" } }, at: [0, -3], greet: "I am not what I am. ...O time, thou must untangle this, not I; it is too hard a knot for me to untie.", c: 800 },
{ n: "Duke Orsino", who: "Orsino, Duke of Illyria, in love with being in love, who adores the Countess Olivia",
o: { sex: "m", look: { topKind: "robe", top: 0x6A2A6A, bottom: 0x6A2A6A, back: "cape", backColor: 0x4A1A4A, hat: "crown", hatColor: 0xD8B040, hair: 0x3A2618, hairStyle: "curly" } }, at: [-3, -1], greet: "If music be the food of love, play on; give me excess of it...", c: 700 },
{ n: "Olivia", who: "Olivia, a rich countess in mourning for her brother, who falls in love with Viola thinking she is a young man",
o: { sex: "f", look: { topKind: "dress", top: 0x1A1A1E, bottom: 0x1A1A1E, bottomKind: "skirt", hat: "hood", hatColor: 0x1A1A1E, hair: 0xD8B070, hairStyle: "long", neck: "necklace", accColor: 0xE8E0D0 } }, at: [3, -1], greet: "Even so quickly may one catch the plague? ...What is your parentage?", c: 700 },
{ n: "Malvolio", who: "Malvolio, Olivia's stern, proud steward, who is tricked by a forged letter into wearing yellow stockings and smiling",
o: { sex: "m", look: { layer: "suit", layerColor: 0x1A1A1A, top: 0x1A1A1A, bottom: 0xF2D03A, shoeKind: "shoes", neck: "scarf", accColor: 0xE8E4DC, hair: 0x2A2A2A, hairStyle: "short" } }, at: [6, 2], greet: "Some are born great, some achieve greatness, and some have greatness thrust upon 'em. ...Ha! I'll be revenged on the whole pack of you!", c: 650 },
{ n: "Feste", who: "Feste, Olivia's clever fool, who sings and sees through everyone",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xD83A3A, top: 0x3A8A3A, bottom: 0xD8A030, hat: "jester", hatColor: 0xD83A3A } }, at: [-6, 2], greet: "Better a witty fool than a foolish wit. ...O mistress mine, where are you roaming?", c: 550 },
{ n: "Sir Toby Belch", who: "Sir Toby Belch, Olivia's merry, drunken uncle, who plots the trick on Malvolio",
o: { sex: "m", look: { layer: "vest", layerColor: 0x8A3A1A, top: 0xE8D8C0, bottom: 0x5A3A1A, hair: 0x8A6A3A, hairStyle: "curly" } }, at: [-4, 5], greet: "Dost thou think, because thou art virtuous, there shall be no more cakes and ale?" }
],
steps: [
{ k: "find", w: 5, t: "Maria has forged a letter in Olivia's handwriting to fool Malvolio. Hide yourselves in the box-tree garden: find the five best hiding spots to watch him read it.", n: 5, look: "weed", col: 0x3A6A3A, r: 28, secs: 160, name: "Hiding places", done: "Malvolio reads: 'Remember who commended thy yellow stockings, and wished to see thee ever cross-gartered.' He swallows it whole." },
shkLine(3, "Malvolio reads the forged letter: 'Some are born great...' How does it go on?", "'...some achieve greatness, and some have greatness thrust upon 'em.'", "'...and some are born in Illyria.'", "'...and most are born at sea.'"),
{ k: "choose", w: 0, t: "At the end, Viola's twin brother Sebastian, believed drowned, appears. Everyone has been mixing them up! How do they prove they are brother and sister?", o: [["They compare memories of their father, who had a mole on his brow and died when Viola was thirteen", 1, "'My father had a mole upon his brow.' 'And so had mine.' The twins are reunited, Orsino turns to Viola, and Olivia already has Sebastian."], ["They swap hats", 0, "No: they prove it with what they remember of their father."], ["Feste tells everyone", 0, "No: the twins prove it to each other."]] }
],
qs: [
["What name does Viola take when disguised as a young man?", "Cesario", "Sebastian", "Orsino"],
["What colour stockings does Malvolio wear to please Olivia?", "Yellow", "Red", "Black"],
["Who is Viola's twin, thought drowned in the shipwreck?", "Sebastian", "Antonio", "Feste"],
["What is Twelfth Night?", "The last night of Christmas, 5 January, a night of feasting and turning things upside down", "A harvest festival", "The night before Midsummer"],
["Which famous line opens the play?", "'If music be the food of love, play on'", "'Now is the winter of our discontent'", "'Who's there?'"],
["In Shakespeare's time, who played Viola, and all the women's parts?", "Boy actors", "Women", "Old men"]
] });
CT_W.sh_twelfth = { th: "isle", intro: "A shipwreck on the coast of Illyria. A young woman struggles ashore, and her twin brother is lost. In this land of music and love, nothing will be what it seems for long.", ch: [
["Shipwrecked", "Viola is washed up on the shore of Illyria with the ship's captain. Her twin brother Sebastian may be drowned. To be safe, she will disguise herself as a young man and serve the Duke Orsino.", "wreck,lakeshore", [ctC(0, "Why does Viola disguise herself as a young man?", "To be safe in a strange land, and find work with the Duke", "Yes. A woman alone had little safety; a young man could serve at court.", "For a joke", "To escape the law")], [0]],
["If Music Be the Food of Love", "At his court Duke Orsino lies listening to music, sick with love for the Countess Olivia, who will not see him. Within three days Cesario (Viola) is his favourite, and he sends 'him' to woo Olivia. But Viola has fallen in love with Orsino.", "palace#E8D8C8,garden", [shkLine(1, "Orsino, listening to music: 'If music be the food of love...' What next?", "'...play on; give me excess of it.'", "'...then I am starving.'", "'...sing me to sleep.'")], [1, 0]],
["Olivia's Veil", "Viola goes to Olivia, who is in mourning and veiled. Viola speaks so beautifully for Orsino that Olivia falls in love, with Cesario. She sends her steward Malvolio running after Viola with a ring.", "manor#E8E0D0,garden", [ctC(2, "What does Olivia send Malvolio after Cesario with?", "A ring, pretending Cesario left it", "Yes. And Viola realises: 'She loves me, sure!' Now the knot is tied.", "A letter", "A sword")], [2, 0, 3]],
["Cakes and Ale", "Late at night, Sir Toby, his foolish friend Sir Andrew and Feste the fool are singing and drinking loudly. Malvolio tells them off. They plot revenge.", "hall#A8907A,barrels", [ctC(5, "Sir Toby mocks Malvolio's sternness. What does he ask him?", "'Dost thou think, because thou art virtuous, there shall be no more cakes and ale?'", "Yes. Fun will go on whether Malvolio likes it or not.", "'Where is the wine?'", "'Shall we dance?'")], [5, 4, 3]],
["The Letter in the Garden", "Maria drops a forged letter in Malvolio's path. The plotters hide in the box-tree hedge and watch. Malvolio reads it and believes Olivia loves him: he must wear yellow stockings, cross-gartered, and always smile.", "garden,bigtree", [0, 1], [3, 5]],
["Yellow Stockings", "Malvolio appears before Olivia in bright yellow stockings, cross-gartered, smiling wildly. Olivia thinks he has gone mad. The plotters lock him in a dark room.", "manor#E8E0D0,garden", [ctC(3, "Why does Olivia think Malvolio is mad?", "He is smiling, in yellow cross-gartered stockings, quoting a letter she never wrote", "Yes. And Olivia hates yellow and cross-gartering!", "He is singing", "He is dressed as a fool")], [3, 2]],
["The Duel", "Sir Andrew, jealous of Cesario, is egged on to challenge 'him' to a duel. Both are terrified. Then Antonio, a sea captain who rescued Sebastian, rushes in, thinking Viola is Sebastian.", "street,arch", [ctC(0, "Why is Viola so terrified of the duel?", "She is not a young man, and has never held a sword", "Yes. 'A little thing would make me tell them how much I lack of a man.'", "She hates Sir Andrew", "She is a great fencer")], [0, 5]],
["Two Sebastians", "Sebastian is alive, and in Illyria. Olivia, thinking he is Cesario, asks him to marry her. Astonished but delighted, he agrees.", "church,garden", [ctS(2, "Blame not this haste of mine. If you mean well, now go with me and with this holy man into the chantry by.")], [2]],
["Untangling the Knot", "Everyone gathers. Viola and Sebastian stand face to face, at last. Malvolio is freed, furious. Orsino will marry Viola; Feste sings to end the play: 'the rain it raineth every day'.", "palace#E8D8C8,stage", [2], [0, 1, 2, 3, 4]]
] };
CT_DRESS.sh_twelfth = { fog: 0.8,
plaza: { k: "tiles", a: 0xE0D0B8, b: 0xC8B8A0 },
hero: [["wreck", 50, 50, 1.1, { r: 16 }], ["lakeshore", 24, 40, 1], ["house", 30, -40, 1, { w: 11, h: 10, col: 0xF0E0C8, roof: 0x3A6AA8, r: 8 }], ["garden", 24, -80, 1, { col: 0xF2D03A, r: 12 }], ["tree", 20, 20, 1, { kind: "cedar", h: 14, r: 4 }],
["lanterns", 14, -14, 1], ["boat", 30, 90, 1, { kind: "row", col: 0x6A4A2E }]],
sky: [["city", 720, 0, 1, { col: 0xF0E0C8, roof: 0x3A6AA8, cols: [0xF0E0C8, 0xE8D0B0, 0xF8E8D8], hmax: 70, R: 70, wallC: 0xE0D0B8, spire: 0.3, n: 16, r: 80 }], ["mountain", 760, 70, 1, { r: 160, h: 110, col: 0x7A8A7A, snow: false }]],
sc: { palm: 100, olive: 120, seashell: 80, flower: 200 },
edge: { k: "seashell", sp: 20, off: 4 } };
CT_SCN.sh_twelfth = { mid: [["tree", 22, 0, 1, { kind: "cedar", h: 14 }], ["boat", 22, 0, 1, { kind: "row", col: 0x6A4A2E }], ["flowerbed", 14, 0, 1], ["fig", 20, 0, 1.2, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["barrels", 14, 0, 1, { n: 3 }]], ch: [
[["wreck", 26, 0, 1], ["barrels", 14, -60, 1, { n: 4 }], ["folk", 14, 60, 1, { folk: "sailor" }]],
[["armchairs", 12, -40, 1], ["folk", 14, 40, 1, { folk: "noble", n: 3, arc: 14 }], ["drum", 16, 80, 0.3], ["biglyre", 16, -80, 0.4]],
[["garden", 16, -40, 1, { col: 0xE8C8D8 }], ["fig", 18, 40, 1.4, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["folk", 14, 80, 1, { folk: "maid", n: 2, arc: 15 }]],
[["barrels", 12, -40, 1, { n: 6 }], ["feasttable", 14, 40, 1], ["lanterns", 16, 0, 1]],
[["k:hedge", 14, -40, 1.2, { k: 1, n: 3 }], ["k:hedge", 14, 40, 1.2, { k: 1, n: 3 }], ["tree", 20, 0, 1, { kind: "cedar", h: 12 }]],
[["garden", 16, 0, 1, { col: 0xF2D03A }], ["folk", 14, -60, 1, { folk: "maid" }], ["chest", 12, 60, 1]],
[["arch", 14, 0, 1], ["folk", 14, -60, 1, { folk: "noble", n: 3, arc: 14 }], ["well", 16, 60, 1]],
[["cross", 14, -40, 1], ["folk", 12, 40, 1, { folk: "monk" }], ["flowerbed", 14, 80, 1]],
[["stage", 14, 0, 0.8], ["folk", 16, -60, 1, { folk: "noble", n: 4, arc: 12 }], ["lanterns", 16, 60, 1]]
] };
ctTale({ id: "sh_muchado", host: "world:bard", t: "Much Ado About Nothing", by: "William Shakespeare, about 1598", where: "Messina, in Sicily, in a summer of soldiers home from the wars",
col: ["#5A3A1A", "#F8F0D8"], gold: 18, keep: ["A masquerade mask", "🎭"], rad: 10, props: [],
who: [
{ n: "Beatrice", who: "Beatrice, a quick-witted, independent young woman who swears she will never marry, and fights a 'merry war' of words with Benedick",
o: { sex: "f", look: { topKind: "dress", top: 0x3A6A3A, bottom: 0x3A6A3A, bottomKind: "skirt", layer: "vest", layerColor: 0xD8B070, hair: 0x6A3A1A, hairStyle: "curly", neck: "necklace", accColor: 0xD8B040 } }, at: [3, -2], greet: "I wonder that you will still be talking, Signior Benedick: nobody marks you. ...Oh, you're not Benedick. Good. Welcome to Messina.", c: 800 },
{ n: "Benedick", who: "Benedick, a witty soldier who swears he will die a bachelor, and spars with Beatrice at every meeting",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x8A5A2A, top: 0xE8E0D0, bottom: 0x5A3A1A, hair: 0x5A3A1A, hairStyle: "short", back: "cape", backColor: 0x5A3A1A, shoeKind: "boots" } }, at: [-3, -2], greet: "What, my dear Lady Disdain! Are you yet living? ...I will live a bachelor. ...The world must be peopled!", c: 800 },
{ n: "Hero", who: "Hero, the gentle daughter of the Governor of Messina, falsely accused on her wedding day",
o: { sex: "f", look: { topKind: "dress", top: 0xF0E8E0, bottom: 0xF0E8E0, bottomKind: "skirt", hat: "flowercrown", hatColor: 0xF0D8E0, hair: 0xE0C080, hairStyle: "long" } }, at: [5, 1], greet: "My cousin Beatrice says she will never marry. ...But I think she protests too much.", c: 600 },
{ n: "Claudio", who: "Claudio, a young soldier who falls in love with Hero, but believes a lie about her",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x2A4A7A, top: 0xE8E0D0, bottom: 0x2A3A5A, hair: 0xC8A060, hairStyle: "curly" } }, at: [-5, 1], greet: "Lady, as you are mine, I am yours. ...Is she not a modest young lady?" },
{ n: "Dogberry", who: "Dogberry, the bumbling constable of the Watch, who gets every long word wrong but catches the villains",
o: { sex: "m", look: { layer: "uniform", layerColor: 0x6A5A3A, top: 0xB8A070, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x4A3A2A, hair: 0x8A8A84 } }, at: [0, 6], greet: "Our watch, sir, have indeed comprehended two aspicious persons! ...Masters, remember that I am an ass.", c: 550 },
{ n: "Don John", who: "Don John, the bastard brother of the Prince, a sulky villain who makes mischief because he is miserable",
o: { sex: "m", look: { layer: "jacket", layerColor: 0x1A1A1A, top: 0x2A2A2A, bottom: 0x1A1A1A, back: "cloak", backColor: 0x0E0E0E, hair: 0x1A1A1A } }, at: [-7, 4], greet: "I am a plain-dealing villain. ...I had rather be a canker in a hedge than a rose in his grace." }
],
steps: [
{ k: "choose", w: 1, t: "Benedick hides in the arbour while his friends, who know he is listening, talk loudly about how Beatrice is secretly in love with him. What does Benedick decide?", o: [["She loves me? Then it must be returned! 'The world must be peopled.'", 1, "'When I said I would die a bachelor, I did not think I should live till I were married.' The trick works, and the same trick works on Beatrice."], ["She is lying, and I will never marry", 0, "That is what he said before. Now he is hooked."], ["I'll go to the wars again", 0, "No: he wants to stay, and love her."]] },
{ k: "find", w: 4, t: "Dogberry's Watch is on patrol by night. Two villains are boasting of the trick played on Claudio! Find the five watchmen's lanterns and gather the Watch to arrest them.", n: 5, look: "lantern", col: 0xFFC860, r: 28, secs: 170, name: "Watchmen gathered", done: "'We charge you in the Prince's name, stand!' The bumbling Watch catches the villains that all the clever lords missed." },
{ k: "code", w: 4, t: "Dogberry gets long words wrong. He says the Watch have 'comprehended two aspicious persons'. What did he mean instead of 'comprehended'? (one word)", a: ["apprehended", "arrested"], hint: "It means arrested.", done: "Apprehended! And 'aspicious' for suspicious. We still call that kind of mistake a 'Dogberryism'." }
],
qs: [
["What do Beatrice and Benedick have between them at the start?", "A 'merry war' of witty insults", "A secret engagement", "A family feud"],
["How are Beatrice and Benedick brought together?", "Their friends trick each of them into overhearing that the other is in love", "A love potion", "A shipwreck"],
["Who finally uncovers Don John's plot?", "Dogberry and the Watch", "Benedick", "The Prince"],
["What is a 'Dogberryism'?", "Using a grand word wrongly, like Dogberry", "A kind of dance", "A sword trick"],
["Where is the play set?", "Messina, in Sicily", "Venice", "Athens"],
["The title has a pun. Elizabethans said 'nothing' like 'noting'. What does 'noting' mean?", "Noticing, spying, and overhearing, which is what the whole plot is about", "Singing", "Writing letters"]
] });
CT_W.sh_muchado = { th: "meadow", intro: "Messina, in Sicily. The soldiers are home from the wars, the summer is long, the Governor is throwing a masked ball, and two people who swear they will never marry are about to meet again.", ch: [
["Home from the Wars", "Don Pedro, Prince of Aragon, returns victorious with his soldiers Claudio and Benedick, and his sulky brother Don John. Beatrice, the Governor's niece, at once starts her 'merry war' of words with Benedick.", "manor#E8D8B8,garden", [ctC(0, "What does Beatrice call Benedick, and he call her?", "He calls her 'Lady Disdain'", "Yes. 'What, my dear Lady Disdain! Are you yet living?' 'Is it possible disdain should die while she hath such meet food to feed it as Signior Benedick?'", "They call each other 'darling'", "They do not speak")], [0, 1, 3, 2]],
["The Masked Ball", "At the masked ball, masked Beatrice pretends not to know masked Benedick, and tells him Benedick is 'the Prince's jester, a very dull fool'. Don Pedro woos Hero for Claudio. Don John tries to make Claudio think the Prince wants her himself.", "palace#E8D8B8,feasttable", [ctC(0, "At the masked ball, Beatrice says terrible things about Benedick, to him. Does she know who he is?", "Probably yes, and that is the joke", "Yes, most people think so. She knows him perfectly well.", "No, she has no idea", "She thinks he is Claudio")], [0, 1, 2, 3]],
["The Arbour", "The Prince plots to make Beatrice and Benedick fall in love. He and Claudio make sure Benedick, hiding in the garden arbour, overhears that Beatrice is secretly dying of love for him.", "garden,bigtree", [0], [1, 3]],
["The Same Trick", "Hero and her maid do the same to Beatrice, hiding in the honeysuckle bower: Benedick loves her, they say, but she is too proud and mocking for him. Beatrice resolves to love him back.", "garden,flowerbed", [ctC(2, "Hero and her maid talk loudly so Beatrice will overhear. What do they say is Beatrice's fault?", "She is too proud and scornful", "Yes. 'What fire is in mine ears? ...Contempt, farewell, and maiden pride, adieu!'", "She is too shy", "She is too kind")], [2, 0]],
["The Villain's Trick", "Don John shows Claudio and the Prince a scene at Hero's window at night: a woman (really Hero's maid in Hero's dress) meeting a man. They believe it is Hero.", "manor#C8B8A0,tower", [ctC(5, "Why does Don John want to spoil the wedding?", "He is jealous and bitter, and wants to make others as miserable as himself", "Yes. He is 'a plain-dealing villain'.", "He loves Hero", "He owes Claudio money")], [5, 3]],
["The Watch", "That same night, Dogberry's Watch overhears one of Don John's men boasting of the trick, and arrests them.", "street,lanterns", [1, 2], [4]],
["The Wedding", "At the altar, Claudio rejects Hero, accusing her publicly. She faints. The Friar suggests they pretend she has died until the truth comes out.", "church,cross", [ctC(2, "Hero is publicly shamed at her wedding. What does the Friar advise?", "Pretend Hero has died, until the truth comes out", "Yes. A trick, to make Claudio feel what he has lost.", "Run away to Spain", "Fight a duel")], [2, 3, 0]],
["Kill Claudio", "Alone in the church, Beatrice and Benedick at last confess they love each other. Then Beatrice, furious for her cousin, asks him to prove it: challenge Claudio. After a long pause, he agrees.", "church#D8C8B8,cross", [ctS(1, "I do love nothing in the world so well as you: is not that strange? ...Enough, I am engaged; I will challenge him.")], [0, 1]],
["Strike Up, Pipers", "The Watch's evidence is heard. Claudio, ashamed, agrees to marry Hero's 'cousin', veiled. She unveils: it is Hero, alive. Beatrice and Benedick, caught out by love poems each wrote to the other, marry too, and there is dancing.", "palace#E8D8B8,stage", [ctC(1, "How are Beatrice and Benedick finally forced to admit their love?", "Their friends produce love sonnets each secretly wrote to the other", "Yes. 'A miracle! here's our own hands against our hearts.' 'Peace! I will stop your mouth.'", "A duel", "A letter from the Prince")], [0, 1, 2, 3, 4]]
] };
CT_DRESS.sh_muchado = { fog: 0.8, th: { g: [0x8AA050, 0x9AB060, 0xB8A870] },
plaza: { k: "tiles", a: 0xE8D0A8, b: 0xD0B890 },
hero: [["manor", 50, -40, 1, { col: 0xE8D8B8, r: 14 }], ["garden", 30, 40, 1, { col: 0xF0C8A0, r: 12 }], ["tree", 22, -24, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xE8A02A, r: 4 }], ["tree", 24, 24, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xE8A02A, r: 4 }],
["lanterns", 14, 0, 1], ["fig", 26, -70, 1.4, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["well", 18, 70, 1], ["banner", 16, -14, 1, { col: 0xC83A2A }]],
sky: [["city", 720, 0, 1, { col: 0xE8D8B8, roof: 0xB86A3A, cols: [0xE8D8B8, 0xF0E0C0, 0xD8C8A0], hmax: 80, R: 70, wallC: 0xD8C8A0, spire: 0.3, n: 18, r: 80 }], ["mountain", 780, 60, 1, { r: 200, h: 150, col: 0x7A7A6A, snow: true }]],
sc: { olive: 200, peach: 80, flower: 200 },
edge: { k: "bannerb", sp: 40, off: 5 } };
CT_SCN.sh_muchado = { mid: [["tree", 22, 0, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xE8A02A }], ["flowerbed", 14, 0, 1], ["well", 16, 0, 1], ["fig", 20, 0, 1.2, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["k:horse", 22, 0, 1, { beast: "horse" }]], ch: [
[["folk", 14, -40, 1, { folk: "soldier", n: 4, arc: 12 }], ["k:horse", 20, 40, 1, { beast: "horse", n: 2, arc: 15 }], ["banner", 16, 80, 1, { col: 0xC83A2A }]],
[["feasttable", 12, 0, 1.2], ["lanterns", 14, -60, 1], ["folk", 14, 60, 1, { folk: "noble", n: 3, arc: 14 }], ["folk", 14, -80, 1, { folk: "lady", n: 3, arc: 14 }]],
[["k:hedge", 14, -40, 1.2, { k: 1, n: 3 }], ["armchairs", 12, 40, 1], ["tree", 20, 0, 1, { kind: "fruit", h: 10, crown: 0x3A7A2E, fruit: 0xE8A02A }]],
[["flowerbed", 12, -40, 1], ["roses", 12, 40, 1], ["k:hedge", 18, 80, 1.2, { k: 1, n: 3 }]],
[["tower", 16, 0, 1], ["lanterns", 14, 60, 1], ["folk", 14, -60, 1, { folk: "noble" }]],
[["lanterns", 12, -40, 1], ["lanterns", 12, 40, 1], ["folk", 14, 0, 1, { folk: "guard", n: 4, arc: 12 }], ["barrels", 16, 80, 1, { n: 3 }]],
[["cross", 12, -40, 1], ["cross", 12, 40, 1], ["folk", 14, 60, 1, { folk: "noble", n: 4, arc: 12 }], ["folk", 12, -60, 1, { folk: "monk" }]],
[["cross", 12, 0, 1], ["chandelier", 10, 40, 1]],
[["stage", 14, 0, 0.8], ["feasttable", 16, 60, 1], ["folk", 16, -60, 1, { folk: "lady", n: 3, arc: 14 }], ["lanterns", 18, 90, 1]]
] };
ctTale({ id: "sh_asyou", host: "world:bard", t: "As You Like It", by: "William Shakespeare, about 1599", where: "the Forest of Arden",
col: ["#2A4A2A", "#F0F0D8"], gold: 18, keep: ["A love poem from a tree", "📜"], rad: 10, props: [],
who: [
{ n: "Rosalind", who: "Rosalind, daughter of the banished Duke, clever, warm and funny, who flees to the Forest of Arden disguised as a young man called Ganymede",
o: { sex: "f", look: { layer: "jacket", layerColor: 0x5A6A3A, top: 0xE8E0D0, bottom: 0x4A5A3A, hat: "cap", hatColor: 0x4A3A2A, hair: 0xC88A3A, hairStyle: "short", shoeKind: "boots", waist: "satchel" } }, at: [0, -3], greet: "Do you not know I am a woman? When I think, I must speak. ...I am Ganymede, at your service, forester.", c: 850 },
{ n: "Orlando", who: "Orlando, a brave young man cheated by his elder brother, who loves Rosalind and hangs love poems on every tree in Arden",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A4A2A, top: 0xE8E0D0, bottom: 0x4A3A2A, hair: 0x5A3A1A, hairStyle: "curly", shoeKind: "boots" } }, at: [-3, -1], greet: "Run, run, Orlando, carve on every tree the fair, the chaste and unexpressive she! ...Have you seen a lady called Rosalind?", c: 650 },
{ n: "Jaques", who: "Jaques, a gloomy, thoughtful lord who lives in the forest with the old Duke and sees life as a play",
o: { sex: "m", look: { topKind: "robe", top: 0x3A3A4A, bottom: 0x3A3A4A, back: "cloak", backColor: 0x2A2A3A, hat: "brimmed", hatColor: 0x2A2A3A, hair: 0x5A5A5A } }, at: [4, -1], greet: "All the world's a stage, and all the men and women merely players. They have their exits and their entrances...", c: 650 },
{ n: "Touchstone", who: "Touchstone, the court fool, who goes with Rosalind and Celia to the forest",
o: { sex: "m", look: { layer: "tunic", layerColor: 0xD83A3A, top: 0xD8A030, bottom: 0x3A3A8A, hat: "jester", hatColor: 0xD8A030 } }, at: [-5, 3], greet: "Ay, now am I in Arden; the more fool I. When I was at home, I was in a better place: but travellers must be content." },
{ n: "Celia", who: "Celia, Rosalind's cousin and best friend, who runs away with her disguised as a shepherdess called Aliena",
o: { sex: "f", look: { topKind: "dress", top: 0xA8C8A0, bottom: 0xA8C8A0, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hair: 0x3A2A1A, hairStyle: "braids" } }, at: [3, 3], greet: "Now go we in content, to liberty, and not to banishment." }
],
steps: [
{ k: "find", w: 1, t: "Orlando has been hanging love poems to Rosalind on the trees of Arden. Find five of them.", n: 5, look: "page", col: 0xF0E8C8, r: 30, secs: 180, name: "Poems found", done: "'From the east to western Ind, no jewel is like Rosalind.' Rosalind, disguised as Ganymede, reads them and laughs and blushes." },
shkLine(2, "Jaques: 'All the world's a stage, and all the men and women merely players...' How does it go on?", "'They have their exits and their entrances, and one man in his time plays many parts.'", "'They come in at the front and leave by the back.'", "'And none of them can act.'", "Yes. Then he names the seven ages of a life: the infant, the schoolboy, the lover, the soldier, the judge, the old man, and second childhood."),
{ k: "choose", w: 0, t: "As Ganymede, Rosalind offers to 'cure' Orlando of love by pretending to be his Rosalind so he can practise wooing. He says he will die if Rosalind won't have him. What does she say?", o: [["'Men have died from time to time, and worms have eaten them, but not for love.'", 1, "Exactly her line: wise and funny. Nobody has ever really died of love, she tells him: it's just poems."], ["'Then die, and be done with it.'", 0, "Rosalind is never cruel. Try again."], ["'Rosalind will never love you.'", 0, "She does love him. Try again."]] }
],
qs: [
["What forest do Rosalind and her friends flee to?", "The Forest of Arden", "Sherwood Forest", "Birnam Wood"],
["What name does Rosalind use in her disguise?", "Ganymede", "Cesario", "Balthasar"],
["Who says 'All the world's a stage'?", "Jaques", "Rosalind", "Touchstone"],
["How many 'ages of man' does Jaques describe?", "Seven", "Three", "Twelve"],
["Shakespeare's mother was Mary Arden. Where did the forest's name come from?", "The real Forest of Arden near Stratford, and the Ardennes forest in France", "Shakespeare's dog", "A Greek myth"],
["How many weddings are there at the end?", "Four", "One", "None"]
] });
CT_W.sh_asyou = { th: "forest", intro: "A court where a duke has stolen his brother's place, and a deep green forest where the banished live 'like the old Robin Hood of England'.", ch: [
["The Wrestling", "At the court of Duke Frederick, who seized the throne from his brother, young Orlando wrestles the Duke's champion, Charles, and wins against all odds. Rosalind, the banished Duke's daughter, watches and falls in love.", "palace#D8C8B0,stands", [ctC(0, "Rosalind gives Orlando something after the wrestling. What?", "A chain from her neck", "Yes. 'Wear this for me.' Orlando is too tongue-tied to thank her.", "Her glove", "A sword")], [0, 1, 4]],
["Banished", "Duke Frederick banishes Rosalind too. Celia will not stay without her. They escape to the Forest of Arden: Rosalind dressed as a young man, Ganymede; Celia as his sister, Aliena; with Touchstone the fool.", "castle#8A8478,arch", [ctC(4, "Why does Rosalind dress as a young man for the journey?", "Two young women alone on the road would be in danger", "Yes. As Ganymede, with a sword and spear at her side, she protects them both.", "For a play", "To find Orlando")], [0, 4, 3]],
["The Old Duke's Forest", "Deep in Arden, the banished old Duke lives with his loyal lords like outlaws, finding 'tongues in trees, books in the running brooks, sermons in stones, and good in every thing'.", "bigtree,camp", [ctC(2, "What does the old Duke say they find in the forest instead of court luxury?", "'Tongues in trees, books in the running brooks, sermons in stones, and good in everything'", "Yes: the simple life teaches them more than the court did.", "Gold and jewels", "Dragons")], [2]],
["Orlando's Rescue", "Orlando, also fleeing (his brother plans to kill him), finds the old Duke's camp, carrying his old servant Adam, who is starving. The Duke welcomes them.", "camp,campfire", [ctR(1, "Old Adam is fainting with hunger! Carry him through the forest to the Duke's camp, through every ring.", 6, 110, "'Welcome. Set down your venerable burden, and let him feed.'")], [1]],
["All the World's a Stage", "At the Duke's camp, gloomy Jaques describes the seven ages of a man's life, from crying baby to old age.", "camp,stage", [1], [2]],
["Poems on the Trees", "Orlando hangs bad love poems on every tree. Rosalind, as Ganymede, finds them, and meets Orlando, who does not see through her disguise. She offers to cure him of love if he will come and woo 'Ganymede' as if he were Rosalind.", "bigtree,garden", [0], [0, 1]],
["Lessons in Love", "Every day Orlando visits the cottage and woos Ganymede, pretending he is Rosalind. Rosalind tests and teases him.", "cottage#A8987A,bigtree", [2], [0, 1]],
["The Lioness", "Orlando's wicked brother Oliver comes to the forest and falls asleep under a tree, with a snake round his neck and a lioness waiting. Orlando saves him and is wounded. Oliver is changed, and falls in love with Celia.", "bigtree,cave", [ctC(1, "What does Orlando save his cruel brother from, in the forest?", "A snake round his neck and a hungry lioness", "Yes. Twice he turned away; then he saved him. And Oliver became a good man.", "A flood", "Wolves")], [1]],
["Hymen's Weddings", "Rosalind promises to fix everything by magic. She appears as herself, with Hymen, god of marriage. Four couples are married. The old Duke gets his dukedom back.", "garden,temple#E8E0D0", [ctC(0, "Who ends the play speaking to the audience?", "Rosalind, which was rare for a woman's part", "Yes: 'It is not the fashion to see the lady the epilogue.' (She was played by a boy.)", "Jaques", "The Duke")], [0, 1, 4, 2, 3]]
] };
CT_DRESS.sh_asyou = { fog: 0.7,
plaza: { k: "tiles", a: 0x6A7A4A, b: 0x5A6A3A },
hero: [["tree", 20, -30, 1, { kind: "oak", h: 24, r: 5 }], ["tree", 24, 30, 1, { kind: "oak", h: 22, r: 5 }], ["tree", 40, -70, 1, { kind: "oak", h: 26, r: 5 }], ["cottage", 44, 60, 1, { col: 0xA8987A, r: 6 }], ["camp", 20, -60, 1], ["campfire", 16, 10, 1],
["lake", 70, -110, 1, { R: 16, col: 0x3A6A7A }], ["k:deer", 30, 80, 1, { beast: "stag" }]],
sky: [["castle", 720, 0, 1.2, { col: 0xC8C0B0, roof: 0x5A4A3A, flag: 0x2A4A2A, r: 28 }], ["mountain", 760, -60, 1, { r: 180, h: 120, col: 0x4A6A4A, snow: false }]],
sc: { oak: 400, fern: 240, deerk: 30, flower: 120 },
edge: { k: "boulder", sp: 40, off: 5 } };
CT_SCN.sh_asyou = { mid: [["tree", 22, 0, 1, { kind: "oak", h: 22 }], ["k:stag", 22, 0, 1, { beast: "stag" }], ["flowerbed", 14, 0, 1], ["k:sheep", 20, 0, 1, { beast: "sheep", n: 3, arc: 10 }], ["cottage", 26, 0, 1, { col: 0xA8987A }]], ch: [
[["stands", 16, 0, 0.8], ["folk", 16, -60, 1, { folk: "noble", n: 4, arc: 12 }], ["banner", 16, 60, 1, { col: 0x2A4A2A }]],
[["arch", 14, 0, 1], ["k:horse", 20, 60, 1, { beast: "horse" }], ["folk", 14, -60, 1, { folk: "guard", n: 2, arc: 15 }]],
[["tree", 14, -40, 1, { kind: "oak", h: 26 }], ["campfire", 12, 40, 1], ["folk", 14, 80, 1, { folk: "noble", n: 3, arc: 14 }], ["k:stag", 22, -80, 1, { beast: "stag" }]],
[["campfire", 12, 0, 1], ["tents", 20, 60, 0.8], ["folk", 14, -60, 1, { folk: "noble", n: 2, arc: 14 }]],
[["stage", 14, 0, 0.6], ["campfire", 12, 60, 1], ["tree", 20, -60, 1, { kind: "oak", h: 22 }]],
[["tree", 12, -30, 1, { kind: "oak", h: 20 }], ["tree", 12, 30, 1, { kind: "oak", h: 21 }], ["tree", 18, 80, 1, { kind: "oak", h: 24 }], ["k:sheep", 18, -80, 1, { beast: "sheep", n: 3, arc: 10 }]],
[["cottage", 16, 0, 1, { col: 0xA8987A }], ["k:sheep", 18, 60, 1, { beast: "sheep", n: 4, arc: 10 }], ["haystack", 16, -60, 0.6]],
[["tree", 14, 0, 1, { kind: "oak", h: 22 }], ["k:lion", 18, 50, 1, { beast: "lion" }], ["k:snake", 10, -40, 1, { beast: "snake" }]],
[["temple", 22, 0, 0.6, { col: 0xE8E0D0 }], ["flowerbed", 12, -50, 1], ["flowerbed", 12, 50, 1], ["folk", 16, 80, 1, { folk: "villager", n: 4, arc: 12 }]]
] };
ctTale({ id: "sh_merchant", host: "world:bard", t: "The Merchant of Venice", by: "William Shakespeare, about 1597", where: "Venice, and the house of Belmont",
col: ["#2A3A5A", "#F8E8C8"], gold: 18, keep: ["The lead casket", "📦"], rad: 10, props: [],
who: [
{ n: "Portia", who: "Portia, the rich and brilliant lady of Belmont, who must marry whoever chooses the right one of three caskets, and who disguises herself as a lawyer to save Antonio",
o: { sex: "f", look: { topKind: "dress", top: 0xD8B040, bottom: 0xD8B040, bottomKind: "skirt", neck: "necklace", accColor: 0xE8E0D0, hair: 0xD8B060, hairStyle: "long", hat: "tiara", hatColor: 0xE8E0E8 } }, at: [3, -2], greet: "The quality of mercy is not strained; it droppeth as the gentle rain from heaven upon the place beneath. ...Welcome to Belmont.", c: 900 },
{ n: "Bassanio", who: "Bassanio, a young Venetian gentleman who borrows money to woo Portia",
o: { sex: "m", look: { layer: "tunic", layerColor: 0x6A2A4A, top: 0xE8E0D0, bottom: 0x3A1A2A, hair: 0x3A2618, hairStyle: "curly", back: "cape", backColor: 0x4A1A3A } }, at: [-3, -2], greet: "In Belmont is a lady richly left, and she is fair... I must have the means to win her.", c: 600 },
{ n: "Antonio", who: "Antonio, the merchant of Venice, a generous but sad man, whose ships are all at sea",
o: { sex: "m", look: { topKind: "robe", top: 0x2A3A5A, bottom: 0x2A3A5A, hat: "cap", hatColor: 0x1A1A2A, hair: 0x5A4A3A } }, at: [0, -5], greet: "In sooth, I know not why I am so sad. ...My ventures are not in one bottom trusted." },
{ n: "Shylock", who: "Shylock, a Jewish moneylender of Venice, cruelly scorned by the Christians around him, who lends Antonio money on a terrible bond; a complex figure who asks the audience to see his humanity",
o: { sex: "m", look: { topKind: "robe", top: 0x3A2A2A, bottom: 0x3A2A2A, hat: "cap", hatColor: 0xC8A040, hair: 0x5A5A5A, hairStyle: "long" } }, at: [-6, 2], greet: "Hath not a Jew eyes? Hath not a Jew hands, organs, dimensions, senses, affections, passions? ...If you prick us, do we not bleed?" },
{ n: "Nerissa", who: "Nerissa, Portia's clever waiting-woman, who disguises herself as the lawyer's clerk",
o: { sex: "f", look: { topKind: "dress", top: 0x5A7A9A, bottom: 0x5A7A9A, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hair: 0x3A2A1A, hairStyle: "bun" } }, at: [6, 1], greet: "They are as sick that surfeit with too much as they that starve with nothing. ...My lady is weary of this great world." }
],
steps: [
{ k: "choose", w: 0, t: "At Belmont, Portia's father's will says she must marry whoever picks the casket with her picture. Gold says 'Who chooseth me shall gain what many men desire.' Silver: 'Who chooseth me shall get as much as he deserves.' Lead: 'Who chooseth me must give and hazard all he hath.' Choose.", o: [["The lead casket", 1, "Inside: Portia's picture! 'You that choose not by the view, chance as fair and choose as true.' Love means giving and risking everything."], ["The gold casket", 0, "Inside is a skull with a scroll: 'All that glisters is not gold.' The Prince of Morocco chose this and lost."], ["The silver casket", 0, "Inside is a fool's head. The Prince of Arragon chose this, sure he deserved the best, and lost."]] },
shkLine(0, "Disguised as a young lawyer, Portia pleads for mercy in court: 'The quality of mercy is not strained...' How does it go on?", "'It droppeth as the gentle rain from heaven upon the place beneath.'", "'It falls like hail upon the guilty.'", "'It is a law of Venice.'"),
{ k: "choose", w: 0, t: "The court says Shylock may take his pound of flesh. Then the young lawyer (Portia) stops him. What is her clever point?", o: [["The bond says flesh, not blood: he may not spill one drop of Antonio's blood", 1, "Exactly. Shylock cannot take flesh without blood, and the case turns against him."], ["The bond is written in the wrong ink", 0, "No: her point is about the exact words of the bond."], ["Antonio is too ill to pay", 0, "No: her point is about the exact words of the bond."]] }
],
qs: [
["What is the penalty in Shylock's bond if Antonio cannot repay the loan?", "A pound of Antonio's flesh", "His ships", "Ten years in prison"],
["Which casket holds Portia's picture?", "The lead one", "The gold one", "The silver one"],
["How does Portia get into the court of Venice?", "Disguised as a young man of law", "As a witness", "As the Duke's wife"],
["Where does Portia live?", "Belmont", "Verona", "Padua"],
["What famous speech of Shylock's asks the audience to see Jews as fellow human beings?", "'Hath not a Jew eyes?'", "'To be or not to be'", "'Once more unto the breach'"],
["Why is this play hard for audiences today?", "It shows the cruel prejudice against Jews in Shakespeare's time, and people still argue about how the play treats Shylock", "It has no women in it", "It is in Latin"]
] });
CT_W.sh_merchant = { th: "town", intro: "Venice, the richest trading city in the world, its canals crowded with gondolas and merchants' ships; and, a short ride away, the lovely house of Belmont.", ch: [
["The Rialto", "On the Rialto, Venice's market by the Grand Canal, the merchant Antonio is strangely sad. His friend Bassanio needs money to woo the rich lady of Belmont. Antonio's money is all at sea in his ships, so Bassanio must borrow.", "dock,bridge", [ctC(2, "Why can't Antonio lend Bassanio the money himself right now?", "All his money is in ships and cargoes still at sea", "Yes. He will have to borrow on his own good name.", "He has given it all away", "He has lost it gambling")], [2, 1]],
["Three Caskets", "At Belmont, Portia complains to Nerissa: by her dead father's will, she cannot choose her husband. Suitors must choose between three caskets, of gold, silver and lead. The wrong choice and they must never marry anyone.", "palace#E8D8C8,garden", [ctC(0, "What must a suitor promise if he chooses the wrong casket?", "Never to marry anyone at all", "Yes. A high price for a wrong guess, which keeps the foolish away.", "To leave Italy", "To pay a fortune")], [0, 4]],
["The Bond", "Bassanio and Antonio go to the moneylender Shylock, whom Antonio has insulted and spat on in public. Shylock lends three thousand ducats for three months, 'in a merry sport': if it is not repaid, he may take a pound of Antonio's flesh.", "street,bridge", [ctC(3, "Why does Shylock hate Antonio so much?", "Antonio has insulted him, spat on him and called him names in public, and lends money without interest", "Yes. Shylock has been treated cruelly. That does not make the bond less terrible.", "Antonio stole from him", "Antonio is his rival in love")], [3, 2, 1]],
["Morocco and Arragon", "The Prince of Morocco chooses the gold casket: inside is a skull, with 'All that glisters is not gold.' The Prince of Arragon chooses silver: inside is a fool's head.", "palace#E8D8C8,chest", [ctC(0, "What is written in the gold casket?", "'All that glisters is not gold'", "Yes. A line still used today (we usually say 'glitters').", "'Better luck next time'", "'Silver is better'")], [0, 4]],
["Hath Not a Jew Eyes?", "Shylock's daughter Jessica runs away with a Christian, taking his money. Mocked in the street, Shylock speaks his great speech about his humanity, and swears to have his bond if Antonio fails.", "street,arch", [ctC(3, "In his great speech, what does Shylock ask?", "'If you prick us, do we not bleed? If you tickle us, do we not laugh?'", "Yes. He asks the audience to see that a Jew is as human as any Christian, and that cruelty teaches cruelty.", "For more money", "For a ship")], [3]],
["The Right Casket", "Bassanio chooses: not the gold, not the silver, but the lead. Inside is Portia's picture. They are betrothed, and she gives him a ring he must never part with. Then a letter: Antonio's ships are lost.", "palace#E8D8C8,garden", [0], [0, 1, 4]],
["The Pound of Flesh", "Before the Duke, Shylock demands his bond. A young lawyer from Padua arrives: Portia in disguise, with Nerissa as her clerk. She pleads for mercy, then turns the law: flesh, but not one drop of blood.", "hall#C8B8A0,throne", [1, 2], [0, 3, 2, 1]],
["The Rings", "Portia, still disguised, asks Bassanio for his ring as her fee. He gives it. At Belmont, she pretends to be furious, then reveals the truth. And three of Antonio's ships have come safe home after all.", "palace#E8D8C8,garden", [ctC(0, "Why does Portia ask Bassanio for his ring in disguise?", "To test his promise, and tease him later", "Yes. A joke with a sting: she wins the argument either way.", "She needs the money", "She doesn't recognise it")], [0, 1, 4, 2]]
] };
CT_DRESS.sh_merchant = { fog: 0.75, th: { g: [0x8A8A70, 0x9A9A80, 0xA8A090] },
plaza: { k: "tiles", a: 0xD8C8A8, b: 0xC0B090 },
hero: [["archbridge", 34, 0, 1.2, { col: 0xD8C8A8, r: 10 }], ["boat", 26, -30, 1, { kind: "gondola", col: 0x1A1A1A }], ["boat", 30, 30, 1, { kind: "gondola", col: 0x1A1A1A }], ["house", 30, -60, 1, { w: 10, h: 12, col: 0xE8C8A0, roof: 0xB86A3A, r: 7 }],
["house", 32, 60, 1, { w: 10, h: 12, col: 0xD8A880, roof: 0xA85A2A, r: 7 }], ["dock", 20, -90, 1], ["barrels", 16, 90, 1, { n: 5 }], ["lanterns", 14, 0, 1]],
sky: [["city", 700, 0, 1, { col: 0xE8C8A0, roof: 0xB86A3A, cols: [0xE8C8A0, 0xD8A880, 0xF0D8B8, 0xC89870], dome: 1, hmax: 90, R: 90, wallC: 0xD8C8A8, spire: 0.4, n: 24, r: 100 }]],
sc: { cedar: 80, flower: 120, barrels: 40 },
edge: { k: "bannerb", sp: 40, off: 5 } };
CT_SCN.sh_merchant = { mid: [["boat", 22, 0, 1, { kind: "gondola", col: 0x1A1A1A }], ["house", 30, 0, 1, { w: 9, h: 11, col: 0xE8C8A0, roof: 0xB86A3A }], ["barrels", 16, 0, 1, { n: 3 }], ["lanterns", 16, 0, 1], ["fig", 20, 0, 1.2, { col: 0xE8E4DC, base: 0xB8B0A0 }]], ch: [
[["dock", 22, 0, 1], ["boat", 26, 60, 1, { kind: "gondola", col: 0x1A1A1A }], ["folk", 14, -60, 1, { folk: "noble", n: 4, arc: 12 }], ["barrels", 16, 90, 1, { n: 5 }]],
[["chest", 10, -30, 1], ["chest", 10, 0, 1], ["chest", 10, 30, 1], ["garden", 20, 80, 1, { col: 0xE8C870 }], ["folk", 14, -80, 1, { folk: "maid" }]],
[["barrels", 14, 40, 1, { n: 4 }], ["folk", 14, -40, 1, { folk: "noble", n: 2, arc: 14 }], ["archbridge", 26, 0, 0.8, { col: 0xD8C8A8 }]],
[["chest", 10, -20, 1], ["chest", 10, 20, 1], ["folk", 14, 60, 1, { folk: "noble", n: 3, arc: 14 }], ["k:camel", 22, -60, 1, { beast: "camel" }]],
[["arch", 14, 0, 1], ["folk", 14, -60, 1, { folk: "noble", n: 3, arc: 14 }], ["lanterns", 16, 60, 1]],
[["chest", 10, 0, 1.2], ["garden", 18, 60, 1, { col: 0xE8C870 }], ["flowerbed", 14, -60, 1]],
[["throne", 12, 0, 1], ["scales", 12, 50, 1.4], ["folk", 16, -60, 1, { folk: "noble", n: 5, arc: 12 }]],
[["garden", 16, -40, 1, { col: 0xE8C870 }], ["lanterns", 14, 40, 1], ["boat", 24, 80, 1, { kind: "long", col: 0x6A4A2E }]]
] };
ctTale({ id: "sh_henry", host: "world:bard", t: "Henry V", by: "William Shakespeare, 1599", where: "England and France, in 1415",
col: ["#1A2A5A", "#F0E0B0"], gold: 20, keep: ["An Agincourt arrowhead", "🏹"], rad: 10, props: [],
who: [
{ n: "King Henry V", who: "King Henry the Fifth of England, once wild Prince Hal, now a bold young king who leads a small, sick army against France and wins at Agincourt",
o: { sex: "m", look: { layer: "armor", layerColor: 0xA8A8B0, top: 0x2A3A8A, bottom: 0xC83A2A, hat: "crown", hatColor: 0xD8B040, back: "cape", backColor: 0x2A3A8A, hair: 0x5A3A1A, hairStyle: "short", shoeKind: "boots" } }, at: [0, -4], greet: "Once more unto the breach, dear friends, once more! ...We few, we happy few, we band of brothers.", c: 1000 },
{ n: "The Chorus", who: "the Chorus, who speaks to the audience, asking them to imagine armies, ships and battlefields on the bare wooden stage of the Globe",
o: { sex: "m", look: { topKind: "robe", top: 0x1A1A1A, bottom: 0x1A1A1A, back: "cloak", backColor: 0x1A1A1A, hair: 0x8A8A84, hairStyle: "short" } }, at: [4, 0], greet: "O for a Muse of fire! ...Can this cockpit hold the vasty fields of France? Piece out our imperfections with your thoughts.", c: 500 },
{ n: "Fluellen", who: "Captain Fluellen, a brave, talkative Welsh officer who loves the old rules of war and the leek of Wales",
o: { sex: "m", look: { layer: "armor", layerColor: 0x8A8A8A, top: 0x2A6A2A, bottom: 0x4A3A2A, hat: "helmet", hatColor: 0x8A8A8A, hair: 0x8A5A2A } }, at: [-4, 2], greet: "There is occasions and causes why and wherefore in all things. ...I am Welsh, you know, good countryman." },
{ n: "Princess Katherine", who: "Princess Katherine of France, who learns English words from her maid, and whom Henry woos at the end",
o: { sex: "f", look: { topKind: "dress", top: 0x2A4AA8, bottom: 0x2A4AA8, bottomKind: "skirt", hat: "tiara", hatColor: 0xE8D070, neck: "necklace", accColor: 0xE8D070, hair: 0x8A5A2A, hairStyle: "long" } }, at: [6, 3], greet: "Comment appelez-vous la main en anglais? The hand... de hand. Is it not so? ...I cannot speak your England.", c: 700 },
{ n: "The Dauphin", who: "the Dauphin, the French crown prince, who mocks Henry by sending him tennis balls",
o: { sex: "m", look: { layer: "armor", layerColor: 0xD8C070, top: 0x2A3A9A, bottom: 0x2A3A9A, back: "cape", backColor: 0x2A3A9A, hair: 0xC8A060, hairStyle: "curly" } }, at: [-7, 4], greet: "My horse is the prince of palfreys! ...We shall have the English for breakfast." }
],
steps: [
shkLine(0, "At the walls of Harfleur, Henry rallies his men: 'Once more unto the breach, dear friends, once more...' What next?", "'...or close the wall up with our English dead.'", "'...and then we'll all go home.'", "'...the French have run away.'"),
{ k: "aim", w: 0, t: "Agincourt! The English longbowmen stand behind their sharpened stakes as the French knights charge through the mud. Draw your longbow: loose when the marker is in the gold. Three shots; hit the gold twice.", rounds: 3, need: 2, done: "The arrows fall like rain. The heavy French knights, stuck in the mud, cannot reach the English lines. Against all odds, Agincourt is won." },
{ k: "choose", w: 0, t: "Before the battle, Henry's men are outnumbered and afraid. One lord wishes they had ten thousand more men. What does Henry say on St Crispin's Day?", o: [["No: the fewer men, the greater share of honour. 'We few, we happy few, we band of brothers.'", 1, "'For he today that sheds his blood with me shall be my brother.' And they go into battle believing it."], ["Yes: let's wait for more men from England", 0, "No: Henry says the opposite. The fewer they are, the greater their honour."], ["Let's surrender", 0, "Never. Henry says the opposite."]] }
],
qs: [
["Which famous battle does Henry V win?", "Agincourt, in 1415", "Hastings, in 1066", "Bosworth, in 1485"],
["What insulting gift does the Dauphin send Henry?", "Tennis balls", "A dead fish", "An empty crown"],
["What is Henry's speech before Agincourt called?", "The St Crispin's Day speech", "The Tennis Ball speech", "The Mousetrap speech"],
["What does the Chorus ask the audience to do?", "Use their imagination to fill the bare stage with horses, ships and armies", "Stay quiet", "Sing along"],
["The Chorus calls the theatre a 'wooden O'. Which playhouse is that?", "Probably the Globe, which opened that year", "St Paul's", "The Tower"],
["What weapon gave the English the advantage at Agincourt?", "The longbow", "Cannon", "The pike"]
] });
CT_W.sh_henry = { th: "meadow", intro: "O for a Muse of fire! 1415. A young King of England crosses the sea with a small army to claim the crown of France.", ch: [
["O for a Muse of Fire", "The Chorus steps onto the bare stage and asks you to imagine it all: two great kingdoms, horses printing their hooves in the earth, armies, the sea. 'Piece out our imperfections with your thoughts.'", "stage,banner", [ctC(1, "What does the Chorus call the round theatre the play is acted in?", "'This wooden O'", "Yes. The audience must imagine the fields of France inside it.", "'This golden hall'", "'This muddy field'")], [1]],
["The Tennis Balls", "At court, the young King Henry, who was once a wild prince, hears that his claim to parts of France is just. An ambassador from the Dauphin brings a gift: a chest of tennis balls, mocking his wild youth.", "palace#D8C8B0,throne", [ctC(0, "How does Henry answer the Dauphin's tennis balls?", "He says he will play a game with them that will strike France's crown", "Yes. 'His jest will savour but of shallow wit, when thousands weep more than did laugh at it.'", "He laughs and keeps them", "He sends back some cakes")], [0]],
["To Southampton", "The army gathers at Southampton. Henry uncovers three traitors who were paid by France to kill him, and sentences them. Then the fleet sails.", "dock,tents", [ctR(0, "The fleet must sail with the tide! Get through every ring to the ships before it turns.", 6, 110, "'Cheerly to sea! The signs of war advance.' The fleet crosses the Channel to France.")], [0, 1]],
["Once More unto the Breach", "The English besiege the French port of Harfleur. Henry leads the charge into the gap in the walls.", "wall,cannon", [0], [0, 2]],
["The English Lesson", "In the French palace, Princess Katherine has her maid teach her English words: the hand, the fingers, the nails, the elbow, the neck, the chin. She gets them delightfully wrong.", "palace#E8E0F0,garden", [ctC(3, "Katherine asks her maid the English for 'la main'. What is the answer?", "'De hand' (the hand)", "Yes. Then 'de fingres', 'de nailes', 'de bilbow' for elbow... A comic scene almost entirely in French.", "'De foot'", "'De nose'")], [3]],
["A Little Touch of Harry", "The night before the battle, the English are outnumbered five to one, sick and tired. Henry wraps himself in a cloak and walks the camp in disguise, talking to his soldiers as an equal.", "camp,campfire", [ctC(0, "Why does Henry walk round the camp in disguise the night before the battle?", "To hear what his soldiers really think and feel", "Yes. 'A little touch of Harry in the night.'", "To spy on the French", "He is lost")], [0, 2]],
["St Crispin's Day", "The morning of the battle, 25 October, St Crispin's Day. Henry speaks to his army.", "banner,tents", [2], [0, 2]],
["Agincourt", "The French knights charge through the mud. The English archers shoot from behind their stakes. The battle is won; the French dead number thousands, the English very few.", "banner,camp", [1], [0, 2, 4]],
["Kate", "Peace. Henry woos Katherine, half in French, half in English, a soldier with plain words. She agrees to marry him. The Chorus tells us the peace did not last long after his death.", "palace#E8E0F0,garden", [ctC(0, "How does Henry describe how he woos Katherine?", "As a plain soldier, with no fine words", "Yes. 'I know no ways to mince it in love, but directly to say: I love you.'", "With poetry and songs", "With threats")], [0, 3, 1]]
] };
CT_DRESS.sh_henry = { fog: 0.75, th: { g: [0x6A8A40, 0x7A9A48, 0x8A8A5A] },
plaza: { k: "tiles", a: 0x7A6A4A, b: 0x6A5A3A },
hero: [["tents", 40, -40, 1, { r: 13 }], ["tents", 44, 40, 1, { r: 13 }], ["banner", 16, -14, 1, { col: 0xC83A2A }], ["banner", 16, 14, 1, { col: 0x2A3A8A }], ["banner", 30, -70, 1, { col: 0xC83A2A }], ["banner", 30, 70, 1, { col: 0x2A3A9A }],
["camp", 22, -90, 1], ["cannon", 20, 90, 1.2], ["stockade", 60, 0, 1, { r: 13 }]],
sky: [["castle", 700, 0, 1.6, { col: 0xC8C0B0, roof: 0x2A3A9A, flag: 0x2A3A9A, r: 30 }], ["castle", 740, -70, 1.2, { col: 0xC8C0B0, roof: 0x2A3A9A, flag: 0x2A3A9A, r: 28 }]],
sc: { oak: 120, haystack: 40, bannerb: 40, flower: 100 },
edge: { k: "bannerb", sp: 30, off: 5 } };
CT_SCN.sh_henry = { mid: [["tents", 22, 0, 0.8], ["banner", 16, 0, 1, { col: 0xC83A2A }], ["k:horse", 22, 0, 1, { beast: "horse", n: 2, arc: 15 }], ["camp", 16, 0, 1], ["haystack", 20, 0, 0.6]], ch: [
[["stage", 12, 0, 0.9], ["banner", 16, -50, 1, { col: 0xC83A2A }], ["banner", 16, 50, 1, { col: 0x2A3A8A }]],
[["throne", 12, 0, 1], ["chest", 10, 40, 1], ["folk", 14, -60, 1, { folk: "noble", n: 4, arc: 12 }]],
[["dock", 22, 0, 1], ["boat", 28, 50, 1.4, { kind: "long", col: 0x6A4A2E }], ["folk", 14, -60, 1, { folk: "soldier", n: 4, arc: 12 }], ["barrels", 16, 90, 1, { n: 5 }]],
[["wall", 24, 0, 0.6, { col: 0x8A8478 }], ["cannon", 14, -50, 1], ["cannon", 14, 50, 1], ["folk", 16, 80, 1, { folk: "soldier", n: 4, arc: 12 }]],
[["armchairs", 12, -40, 1], ["garden", 18, 40, 1, { col: 0xE8D070 }], ["folk", 12, 80, 1, { folk: "maid" }]],
[["campfire", 10, -40, 1], ["campfire", 10, 40, 1], ["folk", 14, 0, 1, { folk: "soldier", n: 5, arc: 12 }], ["tents", 22, 80, 0.8]],
[["banner", 14, -40, 1, { col: 0xC83A2A }], ["folk", 16, 0, 1, { folk: "soldier", n: 6, arc: 10 }], ["k:horse", 20, 60, 1, { beast: "horse" }]],
[["stockade", 22, 0, 0.8], ["folk", 16, -50, 1, { folk: "soldier", n: 5, arc: 10 }], ["k:horse", 24, 60, 1, { beast: "horse", n: 3, arc: 12 }], ["banner", 18, 90, 1, { col: 0x2A3A9A }]],
[["garden", 16, -40, 1, { col: 0xE8D070 }], ["throne", 12, 40, 1], ["folk", 14, 80, 1, { folk: "noble", n: 3, arc: 14 }]]
] };
ctTale({ id: "sh_richard", host: "world:bard", t: "Richard III", by: "William Shakespeare, about 1593", where: "England, at the end of the Wars of the Roses",
col: ["#3A1A1A", "#E8D8C0"], gold: 18, keep: ["A white boar badge", "🐗"], rad: 10, props: [],
who: [
{ n: "Richard III", who: "Richard, Duke of Gloucester, later King Richard III: as Shakespeare's play shows him, a brilliant, charming, wicked schemer who talks to the audience as he murders his way to the throne",
o: { sex: "m", look: { topKind: "robe", top: 0x3A1A2A, bottom: 0x1A1A1A, back: "cape", backColor: 0x5A0E1E, hat: "crown", hatColor: 0xD8B040, hair: 0x2A1A12, hairStyle: "short", shoeKind: "boots" } }, at: [0, -4], greet: "Now is the winter of our discontent made glorious summer by this sun of York. ...I am determined to prove a villain. Shall I tell you how?", c: 950 },
{ n: "Queen Margaret", who: "old Queen Margaret, widow of the defeated Lancastrian king, who wanders the court cursing the House of York",
o: { sex: "f", look: { topKind: "dress", top: 0x1A1A1A, bottom: 0x1A1A1A, bottomKind: "skirt", back: "cloak", backColor: 0x2A2A2A, hair: 0xC8C8C0, hairStyle: "long" } }, at: [-5, 2], greet: "Thou elvish-marked, abortive, rooting hog! ...I will curse you all, till heaven hears me." },
{ n: "Lady Anne", who: "Lady Anne, widow of a prince Richard killed, whom Richard woos over her father-in-law's coffin",
o: { sex: "f", look: { topKind: "dress", top: 0x2A2A3A, bottom: 0x2A2A3A, bottomKind: "skirt", hat: "hood", hatColor: 0x1A1A2A, hair: 0x8A5A2A, hairStyle: "long" } }, at: [4, 0], greet: "Out of my sight! Thou dost infect mine eyes. ...Would they were basilisks, to strike thee dead!", c: 650 },
{ n: "Henry Tudor", who: "Henry, Earl of Richmond, Henry Tudor, who defeats Richard at Bosworth and becomes King Henry VII, Queen Elizabeth's grandfather",
o: { sex: "m", look: { layer: "armor", layerColor: 0xB8B8C0, top: 0xE8E0D0, bottom: 0x2A6A2A, back: "cape", backColor: 0x2A6A2A, hair: 0x8A6A3A, hairStyle: "long" } }, at: [4, 5], greet: "True hope is swift, and flies with swallow's wings; kings it makes gods, and meaner creatures kings.", c: 650 },
{ n: "The Little Princes", who: "Edward and Richard, the two young sons of the late King, Richard's nephews, whom he has locked in the Tower",
child: 1, o: { sex: "m", look: { layer: "tunic", layerColor: 0x2A3A8A, top: 0xE8E0D0, bottom: 0x2A3A8A, hair: 0xD8B060, hairStyle: "short" } }, at: [-3, 4], greet: "Uncle says we must stay in the Tower until my coronation. I do not like the Tower, of all places." }
],
steps: [
shkLine(0, "Richard steps out alone and speaks to you: 'Now is the winter of our discontent...' What comes next?", "'...made glorious summer by this sun of York.'", "'...made worse by all this rain.'", "'...the time has come to sleep.'", "Yes. A pun: 'sun' of York, and the 'son' of the Duke of York, his brother the King."),
{ k: "find", w: 3, t: "The night before Bosworth, the ghosts of all Richard's victims visit both camps. Find the five campfires of Henry Tudor's army in the dark to warn them of the morning's attack.", n: 5, look: "flame", col: 0xFFB050, r: 28, secs: 170, name: "Campfires", done: "To Henry, the ghosts say 'Live, and flourish!' To Richard, they say 'Despair, and die!'" },
shkLine(0, "At Bosworth, Richard's horse is killed under him. He fights on foot, shouting: 'A horse! A horse!...'", "'...my kingdom for a horse!'", "'...my sword for a horse!'", "'...is anyone here?'")
],
qs: [
["What does Richard offer at Bosworth, when his horse is killed?", "'My kingdom for a horse!'", "His crown for a sword", "His life for his nephews"],
["Who defeats Richard at the Battle of Bosworth?", "Henry Tudor, who became Henry VII", "Henry V", "Macbeth"],
["What happens to the Little Princes in the Tower in the play?", "Richard has them murdered", "They escape to France", "They become kings"],
["Which rose stood for the House of York?", "The white rose", "The red rose", "The yellow rose"],
["Richard III was a real king. Where were his bones found in 2012?", "Under a car park in Leicester", "In the Tower of London", "In the river Thames"],
["Why might Shakespeare's Richard be more wicked than the real man?", "Shakespeare wrote under the Tudors, whose family took the crown from Richard", "He did not know any history", "Richard paid him to"]
] });
CT_W.sh_richard = { th: "town", intro: "England, 1483. The Wars of the Roses seem over: York has won. But the King's younger brother Richard wants the crown, and he will tell you, and only you, exactly how he plans to take it.", ch: [
["The Winter of Our Discontent", "Peace has come. Richard, Duke of Gloucester, is not made for peace. Alone, he tells the audience his plan: set his brothers against each other, and become king.", "street,castle#8A8478", [0], [0]],
["Clarence to the Tower", "Richard tricks the King into sending their brother Clarence to the Tower, then pretends to be sorry. Murderers come for Clarence in his cell.", "tower,wall", [ctC(0, "How does Richard get rid of his brother Clarence?", "He tricks the King into locking him in the Tower, then sends murderers", "Yes. Clarence is drowned in a barrel of wine.", "He challenges him to a duel", "He sends him to France")], [0]],
["The Wooing of Anne", "Over the coffin of the old King Henry VI, whom Richard killed, Richard woos Lady Anne, whose husband he also killed. She spits at him. By the end of the scene she has taken his ring.", "church,cross", [ctC(2, "What does Richard say, amazed at himself, after Anne leaves?", "'Was ever woman in this humour wooed? Was ever woman in this humour won?'", "Yes. He is delighted with his own wickedness, and shares it with us.", "'I love her truly'", "'I shall never marry'")], [0, 2]],
["Margaret's Curse", "Old Queen Margaret, widow of the defeated king, appears and curses them all: Richard most of all. One by one, her curses come true.", "hall#6A5A50,throne", [ctS(1, "Thou elvish-marked, abortive, rooting hog! Thou that wast sealed in thy nativity the slave of nature and the son of hell!")], [1, 0]],
["The Princes in the Tower", "The King dies. His two young sons are taken to the Tower 'for safety'. Richard has them declared illegitimate, and seizes the crown.", "tower,castle#8A8478", [ctC(4, "Where does Richard keep his young nephews?", "The Tower of London", "Yes. The two boys were never seen again. To this day historians argue about what happened to them.", "Windsor Castle", "A monastery")], [4, 0]],
["The Coronation", "Richard is crowned King Richard III. He asks the Duke of Buckingham to have the princes killed; when Buckingham hesitates, Richard turns cold. He finds another murderer.", "palace#C8B8A0,throne", [ctC(0, "Once crowned, how does Richard treat his ally Buckingham, who helped him to the throne?", "He refuses his reward, and later has him executed", "Yes. 'I am not in the giving vein today.'", "He makes him king", "He gives him half the land")], [0]],
["The Night Before Bosworth", "Henry Tudor lands from France with an army. The night before the battle, the ghosts of Richard's victims visit both their tents.", "tents,campfire", [1], [0, 3]],
["Bosworth Field", "Richard fights like a demon. His horse is killed under him. Henry Tudor kills him, is crowned Henry VII, and marries Elizabeth of York, joining the white rose and the red. The Wars of the Roses are over.", "banner,camp", [2, ctC(3, "Henry Tudor marries Elizabeth of York at the end. What does that join?", "The red rose of Lancaster and the white rose of York", "Yes. The Tudor rose, red and white, and Queen Elizabeth I was their granddaughter.", "England and Scotland", "Two rivers")], [0, 3]]
] };
CT_DRESS.sh_richard = { fog: 0.65,
plaza: { k: "tiles", a: 0x6A6A62, b: 0x5A5A52 },
hero: [["tower", 40, -40, 1.4, { r: 8 }], ["castle", 70, 50, 1, { col: 0x8A8478, roof: 0x3A3A44, flag: 0xE8E4DC, r: 26 }], ["banner", 14, -14, 1, { col: 0xE8E4DC }], ["banner", 14, 14, 1, { col: 0xB82A2A }], ["roses", 20, -60, 1, { r: 4 }],
["house", 30, 60, 1, { w: 10, h: 10, col: 0xD8CCB0, roof: 0x5A4A3A, r: 7 }], ["cross", 24, 90, 1]],
sky: [["city", 720, 0, 1, { col: 0xC8C0B0, roof: 0x5A4A3A, cols: [0xC8C0B0, 0xB8B0A0, 0xD8CCB0], hmax: 90, R: 80, wallC: 0xA8A090, spire: 0.6, n: 20, r: 90 }]],
sc: { oak: 120, tombstone: 40, rosebush: 60 },
edge: { k: "bannerb", sp: 40, off: 5 } };
CT_SCN.sh_richard = { mid: [["banner", 16, 0, 1, { col: 0xE8E4DC }], ["house", 30, 0, 1, { w: 9, h: 9, col: 0xD8CCB0, roof: 0x5A4A3A }], ["k:horse", 22, 0, 1, { beast: "horse" }], ["cross", 16, 0, 1], ["roses", 18, 0, 1]], ch: [
[["banner", 14, -40, 1, { col: 0xE8E4DC }], ["folk", 14, 40, 1, { folk: "noble", n: 3, arc: 14 }], ["house", 26, 80, 1, { w: 9, h: 10, col: 0xD8CCB0, roof: 0x5A4A3A }]],
[["tower", 18, 0, 1], ["barrels", 12, 60, 1, { n: 3 }], ["folk", 14, -60, 1, { folk: "guard", n: 2, arc: 15 }]],
[["cross", 12, -30, 1], ["chest", 10, 30, 1, {}], ["folk", 14, 70, 1, { folk: "monk", n: 2, arc: 15 }]],
[["throne", 12, 0, 1], ["folk", 14, -60, 1, { folk: "noble", n: 4, arc: 12 }], ["chandelier", 10, 40, 1]],
[["tower", 18, 0, 1.2], ["wall", 26, 60, 0.5, { col: 0x8A8478 }], ["folk", 14, -60, 1, { folk: "guard", n: 2, arc: 15 }]],
[["throne", 12, 0, 1], ["banner", 14, -50, 1, { col: 0xE8E4DC }], ["folk", 16, 60, 1, { folk: "noble", n: 5, arc: 12 }]],
[["tents", 20, -40, 1], ["tents", 20, 40, 1], ["campfire", 12, 0, 1], ["folk", 18, 80, 1, { folk: "knight", n: 2, arc: 15 }]],
[["banner", 16, -40, 1, { col: 0xE8E4DC }], ["banner", 16, 40, 1, { col: 0xB82A2A }], ["folk", 16, 0, 1, { folk: "knight", n: 5, arc: 12 }], ["k:horse", 22, 80, 1, { beast: "horse", n: 3, arc: 12 }]]
] };
ctTale({ id: "sh_winter", host: "world:bard", t: "The Winter's Tale", by: "William Shakespeare, about 1610", where: "the courts of Sicilia and the green hills of Bohemia",
col: ["#2A3A4A", "#F0F4F8"], gold: 18, keep: ["A shepherd's crook", "🪝"], rad: 10, props: [],
who: [
{ n: "Hermione", who: "Queen Hermione of Sicilia, gracious and wise, wrongly accused by her jealous husband, who seems to die and returns as a statue that comes to life",
o: { sex: "f", look: { topKind: "dress", top: 0xE8E0E8, bottom: 0xE8E0E8, bottomKind: "skirt", hat: "crown", hatColor: 0xE8D070, back: "cape", backColor: 0xC8B8D8, hair: 0x6A3A1A, hairStyle: "bun" } }, at: [0, -4], greet: "There's some ill planet reigns. I must be patient till the heavens look with an aspect more favourable.", c: 850 },
{ n: "Perdita", who: "Perdita, Hermione's lost daughter, left as a baby on the shore of Bohemia and raised by a shepherd, now queen of the sheep-shearing feast",
o: { sex: "f", look: { topKind: "dress", top: 0x8AC88A, bottom: 0x8AC88A, bottomKind: "skirt", hat: "flowercrown", hatColor: 0xF0C8D8, layer: "apron", layerColor: 0xF0E8D8, hair: 0xD8A860, hairStyle: "braids" } }, at: [3, 1], greet: "Here's flowers for you: hot lavender, mints, savory, marjoram... Welcome to our shearing!", c: 750 },
{ n: "Paulina", who: "Paulina, a fearless lady of the court who stands up to the King and keeps a great secret for sixteen years",
o: { sex: "f", look: { topKind: "dress", top: 0x3A2A5A, bottom: 0x3A2A5A, bottomKind: "skirt", hair: 0x8A8A84, hairStyle: "bun", neck: "necklace", accColor: 0xC8C8D0 } }, at: [-4, 1], greet: "It is required you do awake your faith. ...I'll not call you tyrant; but this most cruel usage of your queen..." },
{ n: "Autolycus", who: "Autolycus, a cheerful, singing rogue, a pedlar and pickpocket who sells ballads and ribbons at the feast",
o: { sex: "m", look: { layer: "vest", layerColor: 0xC83A2A, top: 0xE8D8B0, bottom: 0x5A4A2A, hat: "brimmed", hatColor: 0x5A4A2A, waist: "satchel", hair: 0x8A5A2A, hairStyle: "curly" } }, at: [-6, 4], greet: "Lawn as white as driven snow; cyprus black as e'er was crow... Come buy of me, come; come buy, come buy!", c: 600 },
{ n: "King Leontes", who: "Leontes, King of Sicilia, who goes suddenly mad with jealousy, destroys his family, and spends sixteen years in grief",
o: { sex: "m", look: { topKind: "robe", top: 0x5A1A2A, bottom: 0x5A1A2A, hat: "crown", hatColor: 0xD8B040, back: "cape", backColor: 0x3A0E1A, hair: 0x3A2A1A, hairStyle: "short" } }, at: [-3, -3], greet: "Too hot, too hot! To mingle friendship far is mingling bloods... I have tremor cordis on me." }
],
steps: [
{ k: "run", w: 0, t: "Antigonus has left the baby Perdita on the shore of Bohemia. A storm is coming, and... Exit, pursued by a bear! Run through every ring to escape it!", n: 6, r: 30, secs: 110, chase: { being: "bear", speed: 4.6, wait: 5 }, done: "The most famous stage direction in all of Shakespeare: 'Exit, pursued by a bear.' (Poor Antigonus does not escape. You did.)" },
{ k: "find", w: 1, t: "It is the sheep-shearing feast! Perdita, queen of the feast, gives every guest flowers. Gather five bunches from the meadow: rosemary, rue, lavender, marigold and daffodils.", n: 5, look: "rose", col: 0xD8A8E8, r: 28, secs: 170, name: "Flowers gathered", done: "'Here's flowers for you: hot lavender, mints, savory, marjoram; the marigold, that goes to bed with the sun...'" },
{ k: "choose", w: 2, t: "Sixteen years later, Paulina shows Leontes a lifelike statue of Hermione. She says she can make it move, if they have faith. What happens?", o: [["The statue steps down, warm and alive: Hermione was hidden by Paulina all these years", 1, "'O, she's warm!' Hermione embraces her husband and her daughter, found at last. Shakespeare never tells us if it is magic, or a secret kept for sixteen years."], ["It crumbles to dust", 0, "No: something wonderful happens."], ["Nothing: it's only stone", 0, "No: something wonderful happens."]] }
],
qs: [
["What is the most famous stage direction in Shakespeare, from this play?", "'Exit, pursued by a bear'", "'Enter a ghost'", "'They fight'"],
["Who is Perdita?", "The lost daughter of Leontes and Hermione, raised by a shepherd", "A queen of the fairies", "A statue"],
["How long passes between the first half of the play and the second?", "Sixteen years", "Two weeks", "A hundred years"],
["What happens to the statue of Hermione at the end?", "It comes to life", "It is broken", "It is sold"],
["Who is Autolycus?", "A singing rogue and pickpocket", "A king", "A bear"],
["Why is it called 'a winter's tale'?", "A winter's tale meant an old, sad story told by the fire", "It is set at Christmas", "It snows in every scene"]
] });
CT_W.sh_winter = { th: "snow", intro: "A sad tale's best for winter. The palace of Sicilia, glittering with frost, where a king is about to make a terrible mistake. And, far away, green hills where spring will come.", ch: [
["Too Hot, Too Hot", "King Leontes of Sicilia watches his pregnant wife Hermione talking warmly with his oldest friend, King Polixenes of Bohemia. Suddenly, for no reason, he is mad with jealousy, and orders his friend killed. Polixenes escapes.", "palace#E8E8F0,garden", [ctC(4, "Why does Leontes suddenly become jealous?", "For no real reason at all: it comes out of nowhere", "Yes. That is what makes it so frightening. Unlike Othello, nobody tricks him.", "Iago lies to him", "A witch curses him")], [4, 0]],
["The Queen on Trial", "Leontes throws Hermione in prison, where she gives birth to a daughter. He orders the baby left in some wild place to die. Hermione is put on trial.", "hall#D8D8E0,throne", [ctC(0, "At her trial, Hermione asks for the god Apollo's oracle at Delphi to be read. What does it say?", "She is innocent, and the King will have no heir until what is lost is found", "Yes: 'Hermione is chaste... and the King shall live without an heir, if that which is lost be not found.'", "That she is guilty", "Nothing at all")], [0, 4, 2]],
["The Oracle", "Leontes says the oracle is lies. At that moment, word comes that his young son has died of grief. Hermione faints, and Paulina reports she is dead. Leontes, too late, sees his madness.", "temple#E8E8F0,cross", [ctS(2, "I say she's dead: I'll swear't. If word nor oath prevail not, go and see... What studied torments, tyrant, hast for me?")], [2, 4]],
["The Coast of Bohemia", "Antigonus, Paulina's husband, leaves the baby on the wild shore of Bohemia, with gold and a name: Perdita, 'the lost one'. A storm rises, a bear appears, and a shepherd finds the baby.", "cliff,wreck", [0], []],
["Time", "Time himself, the Chorus, turns his hourglass, and sixteen years pass. Perdita has grown up as a shepherd's daughter in Bohemia. The King of Bohemia's son, Florizel, loves her.", "obelisk,stones", [ctC(2, "Who speaks between the two halves of the play, telling us sixteen years have gone by?", "Time itself, with an hourglass", "Yes. 'I turn my glass...' A play of two halves: winter and spring.", "The bear", "The oracle")], []],
["The Sheep-Shearing", "At the shepherds' feast, Perdita, dressed as queen of the feast, gives out flowers. Autolycus sings and picks pockets. King Polixenes comes in disguise to spy on his son.", "garden,tents", [1], [1, 3]],
["Come Buy", "Autolycus the pedlar sells ribbons, gloves, ballads and trinkets, while robbing the buyers. He swaps clothes with Florizel to help the lovers escape to Sicilia.", "tents,haystack", [ctF(3, "Autolycus has dropped five ribbons and trinkets from his pack while running. Find them before the shepherds do!", 5, "star", 0xE87AA8, "Trinkets found", "'A merry heart goes all the day, your sad tires in a mile-a.' Off he goes, with everyone's purses.")], [3]],
["Found", "In Sicilia, it comes out who Perdita really is: the shepherd's bundle holds the proof. Leontes and Polixenes are friends again. The lost is found.", "palace#E8E8F0,garden", [ctC(1, "What proves that Perdita is the lost princess?", "The things left with her as a baby: a cloak, a jewel of Hermione's, and letters", "Yes. The shepherd kept them all, for sixteen years.", "She looks like a statue", "The bear tells them")], [1, 4]],
["The Statue", "Paulina leads everyone to her chapel to see a statue of Hermione, so lifelike it seems to breathe.", "temple#E8E8F0,garden", [2], [0, 1, 2, 4]]
] };
CT_DRESS.sh_winter = { fog: 0.6,
plaza: { k: "tiles", a: 0xC8D0D8, b: 0xB0B8C0 },
hero: [["palace", 60, -30, 1, { col: 0xE8E8F0, r: 18 }], ["fig", 20, -20, 1.6, { col: 0xE8E8F0, base: 0xA8A8B0 }], ["tree", 24, 30, 1, { kind: "cedar", h: 16, crown: 0x3A5A4A, r: 4 }], ["banner", 14, 14, 1, { col: 0x5A1A2A }], ["well", 22, 60, 1], ["lanterns", 14, -50, 1],
["haystack", 50, 90, 1], ["k:sheep", 30, 100, 1, { beast: "sheep" }]],
sky: [["mountain", 720, 0, 1, { r: 200, h: 180, col: 0x8A9AA8, snow: true }], ["castle", 660, -60, 1.2, { col: 0xE0E4EC, roof: 0x5A6A8A, flag: 0x5A1A2A, r: 28 }]],
sc: { snowpatch: 200, cedar: 200, sheep: 40 },
edge: { k: "icicle", sp: 40, off: 5 } };
CT_SCN.sh_winter = { mid: [["tree", 22, 0, 1, { kind: "cedar", h: 16 }], ["k:sheep", 20, 0, 1, { beast: "sheep", n: 3, arc: 10 }], ["haystack", 20, 0, 0.7], ["fig", 20, 0, 1.2, { col: 0xE8E8F0, base: 0xA8A8B0 }], ["cottage", 26, 0, 1, { col: 0xC8B8A0 }]], ch: [
[["garden", 16, -40, 1, { col: 0xD8D8F0 }], ["fig", 16, 40, 1.4, { col: 0xE8E8F0, base: 0xA8A8B0 }], ["folk", 14, 80, 1, { folk: "noble", n: 3, arc: 14 }]],
[["throne", 12, 0, 1], ["folk", 14, -60, 1, { folk: "guard", n: 3, arc: 14 }], ["folk", 14, 60, 1, { folk: "noble", n: 3, arc: 14 }]],
[["temple", 22, 0, 0.6, { col: 0xE8E8F0 }], ["cross", 12, -60, 1], ["folk", 14, 60, 1, { folk: "robe" }]],
[["wreck", 26, 0, 0.8], ["k:bear", 22, 60, 1, { beast: "bear" }], ["cliff", 30, -60, 0.6]],
[["obelisk", 12, 0, 1.2], ["stones", 22, 60, 0.5]],
[["tents", 18, 0, 0.8], ["k:sheep", 18, -50, 1, { beast: "sheep", n: 5, arc: 10 }], ["flowerbed", 12, 50, 1], ["folk", 16, 80, 1, { folk: "villager", n: 4, arc: 12 }], ["feasttable", 14, -90, 1]],
[["haystack", 16, -40, 0.8], ["tents", 18, 40, 0.7], ["folk", 14, 80, 1, { folk: "villager", n: 3, arc: 14 }]],
[["garden", 16, -40, 1, { col: 0xD8D8F0 }], ["throne", 12, 40, 1], ["folk", 14, 80, 1, { folk: "noble", n: 3, arc: 14 }]],
[["fig", 10, 0, 1.4, { col: 0xE8E8F0, base: 0xA8A8B0 }], ["chandelier", 10, 50, 1], ["folk", 14, -60, 1, { folk: "noble", n: 4, arc: 12 }]]
] };
ctTale({ id: "sh_antony", host: "world:bard", t: "Antony and Cleopatra", by: "William Shakespeare, about 1606", where: "Egypt and Rome, 40 to 30 BC",
col: ["#3A2A0A", "#F8E8B0"], gold: 20, keep: ["An asp-shaped bracelet", "🐍"], rad: 10, props: [],
who: [
{ n: "Cleopatra", who: "Cleopatra, Queen of Egypt, brilliant, proud, witty, changeable and magnificent, who loves Mark Antony",
o: { sex: "f", look: { topKind: "dress", top: 0xE8D8A0, bottom: 0xE8D8A0, bottomKind: "skirt", hat: "crown", hatColor: 0xD8B040, neck: "necklace", accColor: 0x2A8AA8, hair: 0x1A1410, hairStyle: "short", shoeKind: "sandals", ears: "earrings" } }, at: [3, -2], greet: "If it be love indeed, tell me how much. ...Give me my robe, put on my crown; I have immortal longings in me.", c: 1000 },
{ n: "Mark Antony", who: "Mark Antony, one of the three rulers of the Roman world, a great soldier, who gives up everything for Cleopatra",
o: { sex: "m", look: { layer: "armor", layerColor: 0xC8A050, top: 0xA81A1A, bottom: 0xA81A1A, back: "cape", backColor: 0xA81A1A, hair: 0x5A4030, hairStyle: "curly", shoeKind: "sandals" } }, at: [-3, -2], greet: "Let Rome in Tiber melt, and the wide arch of the ranged empire fall! Here is my space.", c: 850 },
{ n: "Enobarbus", who: "Enobarbus, Antony's blunt, loyal, clear-eyed friend and soldier, who describes Cleopatra on her golden barge",
o: { sex: "m", look: { layer: "armor", layerColor: 0x8A8A8A, top: 0x6A4A2A, bottom: 0x6A4A2A, hair: 0x3A3A3A, hairStyle: "short", shoeKind: "sandals" } }, at: [-6, 2], greet: "Age cannot wither her, nor custom stale her infinite variety. ...The barge she sat in, like a burnished throne, burned on the water." },
{ n: "Octavius Caesar", who: "Octavius Caesar, Julius Caesar's adopted heir, cold and clever, Antony's rival, who becomes the first Roman emperor, Augustus",
o: { sex: "m", look: { topKind: "robe", top: 0xF0E8D8, bottom: 0xF0E8D8, back: "cape", backColor: 0x5A1A6A, hair: 0xC8A060, hairStyle: "short", shoeKind: "sandals" } }, at: [0, -6], greet: "Let our best heads know that tomorrow the last of many battles we mean to fight." },
{ n: "Charmian", who: "Charmian, Cleopatra's devoted lady-in-waiting", o: { sex: "f", look: { topKind: "dress", top: 0xD8C8A0, bottom: 0xD8C8A0, bottomKind: "skirt", hair: 0x1A1410, hairStyle: "braids", neck: "necklace", accColor: 0xD8B040 } }, at: [6, 1], greet: "Good sir, give me good fortune! Let me be married to three kings in a forenoon." }
],
steps: [
shkLine(2, "Enobarbus describes Cleopatra on the river Cydnus: 'The barge she sat in, like a burnished throne...' What comes next?", "'...burned on the water.'", "'...sank beneath the waves.'", "'...sailed home to Rome.'", "Yes: the poop of beaten gold, purple sails so perfumed the winds were lovesick, silver oars keeping time to flutes."),
{ k: "run", w: 1, t: "The sea battle of Actium! Cleopatra's ships turn and flee, and Antony follows her. Steer through every buoy in the bay to reach her galley.", n: 6, r: 30, secs: 110, done: "Antony follows Cleopatra away from the battle and loses it, and the world with it. 'I have offended reputation, a most unnoble swerving.'" },
{ k: "choose", w: 0, t: "Antony is dead and Octavius means to parade Cleopatra through Rome in chains. What does she choose?", o: [["To die a queen, by the bite of an asp brought in a basket of figs", 1, "'Give me my robe, put on my crown; I have immortal longings in me.' Octavius finds her dead, as royal as in life."], ["To go to Rome as a prisoner", 0, "Never: she will not be led in triumph through the streets of Rome."], ["To marry Octavius", 0, "No. She has a better plan, and keeps it secret."]] }
],
qs: [
["Where is Cleopatra queen of?", "Egypt", "Greece", "Persia"],
["At which sea battle does Antony follow Cleopatra's fleeing ships, and lose?", "Actium", "Agincourt", "Philippi"],
["How does Cleopatra die in the play?", "By the bite of an asp, a poisonous snake", "In battle", "Of old age"],
["What does Enobarbus say age cannot do to Cleopatra?", "'Age cannot wither her, nor custom stale her infinite variety'", "Make her wise", "Make her kind"],
["Who becomes the first Roman emperor after this story?", "Octavius Caesar, called Augustus", "Mark Antony", "Julius Caesar"],
["Who played Cleopatra in Shakespeare's own time?", "A boy actor", "Queen Elizabeth", "Shakespeare himself"]
] });
CT_W.sh_antony = { th: "desert", intro: "Alexandria, on the Nile, the most dazzling city in the world, and the Queen of Egypt. In Rome, they say Antony has forgotten he is a Roman.", ch: [
["Let Rome in Tiber Melt", "In Cleopatra's palace in Alexandria, Antony, one of the three rulers of the Roman world, spends his days feasting and in love. Messengers from Rome wait. 'Let Rome in Tiber melt!'", "palace#E8D8A0,pool", [ctC(1, "Antony ignores the messengers from Rome. What does he say Rome can do?", "'Let Rome in Tiber melt'", "Yes: let Rome melt into its river, for all he cares. 'Here is my space.'", "'Let Rome come to Egypt'", "'Let Rome wait an hour'")], [1, 0, 4]],
["The Burnished Throne", "News comes that Antony's wife has died and Rome is in danger. He must go. In Rome, Enobarbus tells the Romans how Antony first met Cleopatra: on her golden barge on the river Cydnus.", "temple#E8E0D0,dock", [0], [2]],
["A Marriage in Rome", "To make peace with Octavius, Antony marries Octavius's sister Octavia. Enobarbus knows it will never last: Antony will go back to Egypt.", "temple#F0E8D8,garden", [ctC(2, "Why is Enobarbus sure Antony will go back to Cleopatra?", "'Age cannot wither her, nor custom stale her infinite variety'", "Yes. Nothing about her is ever dull. Antony will not stay away.", "Antony hates Rome's weather", "He left his horse there")], [2, 3, 1]],
["Cleopatra and the Messenger", "In Alexandria, a messenger tells Cleopatra that Antony has married Octavia. She drags him about by the hair, then wants to know: is Octavia tall? What colour is her hair? Is her voice low or shrill?", "palace#E8D8A0,cushions", [ctC(0, "When the messenger brings bad news, what does Cleopatra do?", "Strikes him and drags him by the hair, then asks every detail about Octavia", "Yes: fiery, funny and jealous all at once.", "Gives him gold", "Laughs it off")], [0, 4]],
["Actium", "War between Antony and Octavius. Against advice, Antony fights at sea at Actium. In the middle of the battle Cleopatra's ships turn and flee, and Antony follows her. The battle, and the world, are lost.", "dock,lighthouse", [1], [1, 2, 0]],
["Enobarbus", "Loyal Enobarbus, seeing Antony ruined, leaves him for Octavius. Antony sends all his treasure after him. Ashamed, Enobarbus dies of a broken heart.", "camp,tents", [ctC(2, "Enobarbus deserts Antony. What does Antony do when he hears?", "Sends all of Enobarbus's treasure after him, with his good wishes", "Yes. Such kindness breaks Enobarbus's heart.", "Curses him", "Has him hunted down")], [2, 1]],
["The Monument", "Antony, told falsely that Cleopatra is dead, falls on his sword. Dying, he is lifted up into her monument, and dies in her arms.", "egtemple,obelisk", [ctS(0, "The crown o' the earth doth melt. My lord! O, withered is the garland of the war... and there is nothing left remarkable beneath the visiting moon.")], [0, 1, 4]],
["Immortal Longings", "Octavius means to lead Cleopatra in chains through Rome. A countryman brings a basket of figs. In it are asps.", "egtemple,pyramid", [2], [0, 4, 3]]
] };
CT_DRESS.sh_antony = { fog: 0.85, th: { g: [0xD8B878, 0xE0C488, 0xB89868] },
plaza: { k: "tiles", a: 0xE8D8B0, b: 0xC8B890 },
hero: [["egtemple", 50, -40, 1, { r: 16 }], ["obelisk", 18, -16, 1.4], ["obelisk", 18, 16, 1.4], ["fig", 24, -40, 2, { col: 0xD8C898, base: 0xB8A878 }], ["fig", 24, 40, 2, { col: 0xD8C898, base: 0xB8A878 }], ["pool", 30, 60, 1],
["boat", 36, 90, 1.4, { kind: "felucca", col: 0xC8A040 }], ["k:camel", 30, -80, 1, { beast: "camel" }]],
sky: [["pyramid", 720, 0, 1, { r: 32 }], ["pyramid", 760, -20, 0.8, { r: 30 }], ["city", 700, 40, 1, { col: 0xE8D8B0, roof: 0xC8A060, cols: [0xE8D8B0, 0xD8C898, 0xF0E0C0], dome: 1, hmax: 60, R: 60, wallC: 0xD8C898, spire: 0.1, n: 14, r: 70 }]],
sc: { datepalm: 200, papyrus: 120, lotus: 60 },
edge: { k: "datepalm", sp: 30, off: 5 } };
CT_SCN.sh_antony = { mid: [["obelisk", 18, 0, 1], ["fig", 20, 0, 1.4, { col: 0xD8C898, base: 0xB8A878 }], ["k:camel", 22, 0, 1, { beast: "camel" }], ["pool", 22, 0, 0.8], ["boat", 24, 0, 1, { kind: "felucca", col: 0xC8A040 }]], ch: [
[["pool", 18, 0, 1], ["feasttable", 12, -50, 1.2], ["folk", 14, 50, 1, { folk: "desert", n: 4, arc: 12 }], ["cushions", 12, 80, 1]],
[["boat", 24, 0, 1.6, { kind: "felucca", col: 0xD8B040 }], ["dock", 20, 60, 1], ["folk", 14, -60, 1, { folk: "greek", n: 3, arc: 14 }]],
[["fig", 16, -40, 1.6, { col: 0xE8E4DC, base: 0xB8B0A0 }], ["garden", 18, 40, 1, { col: 0xE8C8A0 }], ["folk", 14, 80, 1, { folk: "robe", n: 3, arc: 14 }]],
[["cushions", 12, 0, 1], ["pool", 18, 60, 0.8], ["folk", 14, -60, 1, { folk: "desert", n: 2, arc: 14 }]],
[["dock", 22, 0, 1], ["boat", 28, 50, 1.4, { kind: "long", col: 0x6A4A2E }], ["boat", 30, -50, 1.4, { kind: "long", col: 0xC8A040 }], ["lighthouse", 30, 90, 0.8]],
[["tents", 20, 0, 1], ["camp", 14, -60, 1], ["chest", 12, 60, 1], ["folk", 14, 90, 1, { folk: "soldier", n: 2, arc: 15 }]],
[["obelisk", 14, -40, 1.2], ["obelisk", 14, 40, 1.2], ["fig", 20, 0, 2, { col: 0xD8C898, base: 0xB8A878 }]],
[["pyramid", 40, 0, 0.3], ["jars", 12, -50, 1], ["k:snake", 10, 40, 1, { beast: "snake" }], ["folk", 14, 80, 1, { folk: "desert", n: 2, arc: 14 }]]
] };
function shkC(col) { var k = "c" + col; return SHK.mats[k] || (SHK.mats[k] = new THREE.MeshLambertMaterial({ color: col })); }
function shkGlowM(col) { var k = "g" + col; return SHK.mats[k] || (SHK.mats[k] = wB(col, { fog: true })); }
function shkS(kind, col) {
var k = kind + ":" + col;
if (SHK.mats[k])
return SHK.mats[k];
var t = shkTexOf(kind), m = new THREE.MeshLambertMaterial({ color: col, map: t || null });
if (t)
m.userData.ctn = 1;
return (SHK.mats[k] = m);
}
function shkTexOf(kind) {
if (SHK.tex[kind])
return SHK.tex[kind];
var t = null;
if (SHK_CANVAS[kind])
t = SHK_CANVAS[kind]();
else if (typeof texOf === "function")
t = texOf(kind);
return (SHK.tex[kind] = t);
}
function shkFrameTex(fn, w, h) { return __ZC(357, 0, this, arguments, new.target); }
function shkOak(x, x0, y0, w, h, R) {
x.fillStyle = "#3A2A1C";
x.fillRect(x0, y0, w, h);
x.fillStyle = "rgba(90,66,44,.55)";
for (var i = 0; i < 4; i++) {
var v = w > h;
x.fillRect(v ? x0 : x0 + R() * w, v ? y0 + R() * h : y0, v ? w : 1, v ? 1 : h);
}
}
function shkWindow(x, x0, y0, w, h, R) { return __ZC(357, 1, this, arguments, new.target); }
var SHK_CANVAS = {
frameA: function () {
return shkFrameTex(function (x, W, H, R) {
shkOak(x, 0, 0, W, 14, R);
shkOak(x, 0, H - 14, W, 14, R);
shkOak(x, 0, H / 2 - 6, W, 12, R);
for (var i = 0; i < 6; i++)
shkOak(x, i * W / 6, 0, 12, H, R);
shkWindow(x, W * 0.36, H * 0.18, W * 0.28, H * 0.24, R);
});
},
frameB: function () { return __ZC(357, 2, this, arguments, new.target); },
frameC: function () {
return shkFrameTex(function (x, W, H, R) {
shkOak(x, 0, 0, W, 14, R);
shkOak(x, 0, H - 14, W, 14, R);
shkOak(x, 0, 0, 14, H, R);
shkOak(x, W - 8, 0, 8, H, R);
for (var i = 1; i < 4; i++)
shkOak(x, i * W / 4, H * 0.62, 10, H * 0.38, R);
shkOak(x, 0, H * 0.6, W, 10, R);
shkWindow(x, W * 0.1, H * 0.14, W * 0.8, H * 0.38, R);
});
},
shop: function () { return __ZC(357, 3, this, arguments, new.target); },
thatch: function () { return __ZC(357, 4, this, arguments, new.target); },
flint: function () { return __ZC(357, 5, this, arguments, new.target); },
lead: function () { return __ZC(357, 6, this, arguments, new.target); },
water: function () { return __ZC(357, 7, this, arguments, new.target); }
};
function shkBox(P, w, h, d, mat, x, y, z, ry) {
var g = new THREE.BoxGeometry(w, h, d);
if (mat && mat.map && mat.userData.ctn)
g = ctnMetre(g);
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
if (ry)
m.rotation.y = ry;
(P || SHK.G).add(m);
return m;
}
function shkCyl(P, rt, rb, h, mat, x, y, z, seg, open) {
var g = new THREE.CylinderGeometry(rt, rb, h, seg || (SHK.lite ? 10 : 16), 1, !!open);
if (mat && mat.map && mat.userData.ctn && typeof metreUVs === "function")
metreUVs(g, "cyl", [rt, rb, h]);
var m = new THREE.Mesh(g, mat);
m.position.set(x || 0, y || 0, z || 0);
(P || SHK.G).add(m);
return m;
}
function shkRoof(P, w, d, h, roofMat, gableMat, x, y, z, ry, over) { return __ZC(357, 8, this, arguments, new.target); }
function shkGable(w, h, mat, z) { return __ZC(357, 9, this, arguments, new.target); }
function shkPyramid(P, w, h, mat, x, y, z, sides) { var m = new THREE.Mesh(new THREE.ConeGeometry(w * 0.71, h, sides || 4, 1), mat); m.rotation.y = Math.PI / 4; m.position.set(x, y + h / 2, z); P.add(m); return m; }
function shkPlane(P, w, d, mat, x, y, z, ry) {
var g = new THREE.PlaneGeometry(w, d);
g.rotateX(-Math.PI / 2);
if (mat && mat.map && mat.userData.ctn && typeof metreUVs === "function")
metreUVs(g, "pln", [w, d]);
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
if (ry)
m.rotation.y = ry;
P.add(m);
return m;
}
var SHK_CELL = 40;
function shkSolid(s) {
var r = s.r !== undefined ? s.r : Math.hypot(s.hw, s.hd);
r += 0.5;
for (var cx = Math.floor((s.x - r) / SHK_CELL); cx <= Math.floor((s.x + r) / SHK_CELL); cx++)
for (var cz = Math.floor((s.z - r) / SHK_CELL); cz <= Math.floor((s.z + r) / SHK_CELL); cz++) {
var k = cx + "," + cz;
(SHK.grid[k] || (SHK.grid[k] = [])).push(s);
}
return s;
}
function shkSolidAt(x, z, feet) { var L = SHK.grid[Math.floor(x / SHK_CELL) + "," + Math.floor(z / SHK_CELL)]; return !!(L && worldSolidAt(L, x, z, feet)); }
function shkSolidBox(x, z, w, d, ry, h, b) { return shkSolid({ x: x, z: z, hw: w / 2, hd: d / 2, rot: ry || 0, h: h, b: b }); }
var SHK_LIME = [0xF4F0E6, 0xF0E6D0, 0xEADCC0, 0xF2E2D2, 0xE6E0D4, 0xF4EAD8, 0xE8D8B8];
var SHK_ROOFC = { tile: 0xB06A4A, tile2: 0x9A5A3E, thatch: 0xC8A878, slate: 0x6A6E74, lead: 0xA8AEB4 };
function shkHouse(P, o, R) { return __ZC(357, 10, this, arguments, new.target); }
function shkEvbDoor(x, z, ry, hd, theme, name, lx, doors) { if (typeof evbWorldDoor === "function")
evbWorldDoor(SHK_KEY, x, z, ry, hd, theme, name, { lx: lx || 0, doors: doors || "the great door" }); }
function shkRow(P, x0, z0, x1, z1, side, R, o, no) { return __ZC(357, 11, this, arguments, new.target); }
function shkTrees(P, list, R) { return __ZC(357, 12, this, arguments, new.target); }
function shkFolkLook(R, sex) { return __ZC(357, 13, this, arguments, new.target); }
function shkVeil() {
if (SHK.veil)
return SHK.veil;
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#0C0A08;opacity:0;pointer-events:none;transition:opacity .6s ease;z-index:43";
document.body.appendChild(v);
SHK.veil = v;
return v;
}
function shkMove(x, z, yawTo, msg, then, y) { return __ZC(357, 14, this, arguments, new.target); }
function shkSpot(x, z, r, name, verb, fn, y) { var s = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; SHK.spots.push(s); return s; }
function shkPerson(key, x, z, ry, o) { return __ZC(357, 15, this, arguments, new.target); }
function shkCrowd(n, x, z, r, R, o) { return __ZC(357, 16, this, arguments, new.target); }
function shkDoor(room, x, z, name) { shkSpot(x, z, 3.4, name, "go in", function () { shkGoIn(room); }); }
function shkDist(name, x, z, r) { var g = new THREE.Group(); g.name = "shk-" + name; SHK.G.add(g); SHK.dist.push({ n: name, g: g, x: x, z: z, r: r }); return g; }
function shkCityPart(x, z) { return x < -140 ? SHK.D.cityW : x < 300 ? SHK.D.cityM : SHK.D.cityE; }
function shkSouthPart(x, z) { return x < -450 ? SHK.D.bankW : x < 100 ? SHK.D.bankE : SHK.D.borough; }
var SHK_NO = [];
function shkNo(x, z, r) { for (var i = 0; i < SHK_NO.length; i++) {
var b = SHK_NO[i];
if (x + r > b[0] && x - r < b[2] && z + r > b[1] && z - r < b[3])
return true;
} return false; }
function shkNoRect(x0, z0, x1, z1) { SHK_NO.push([Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1)]); }
function shkStreetNo(x0, z0, x1, z1, w) { shkNoRect(Math.min(x0, x1) - w, Math.min(z0, z1) - w, Math.max(x0, x1) + w, Math.max(z0, z1) + w); }
function shkGroundBuild(G) { return __ZC(357, 17, this, arguments, new.target); }
function shkRiver(G, R) { return __ZC(357, 18, this, arguments, new.target); }
function shkBoat(x, z, ry, R, rower) { return __ZC(357, 19, this, arguments, new.target); }
function shkShip(P, x, z, R) { return __ZC(357, 20, this, arguments, new.target); }
function shkBridge(P, R) { return __ZC(357, 21, this, arguments, new.target); }
function shkCity(R) { return __ZC(357, 22, this, arguments, new.target); }
function shkPaul(P, R) { return __ZC(357, 23, this, arguments, new.target); }
function shkMermaid(P) {
var R = wRand(31), x = -68, z = -372;
var h = shkHouse(P, { x: x, z: z, ry: -Math.PI / 2, w: 13, d: 16, st: 3, sign: ["THE MERMAID"], roof: "tile", wall: "frameA", tint: 0xF2E8D4, noDoor: 1 }, R);
shkDoor("mermaid", -78, z, "The Mermaid Tavern");
shkLantern(P, -76.5, z - 3, 2.6);
shkLantern(P, -76.5, z + 3, 2.6);
}
function shkLantern(P, x, z, y) { shkBox(P, 0.3, 0.4, 0.3, shkGlowM(0xFFD490), x, y, z); shkBox(P, 0.36, 0.08, 0.36, shkC(0x1A1A1A), x, y + 0.24, z); }
function shkCheapside(P) { return __ZC(357, 24, this, arguments, new.target); }
function shkWall(P, R) { return __ZC(357, 25, this, arguments, new.target); }
function shkTower(P, R) { return __ZC(357, 26, this, arguments, new.target); }
function shkWest(P, R) { return __ZC(357, 27, this, arguments, new.target); }
function shkSouth(R) { return __ZC(357, 28, this, arguments, new.target); }
function shkWindmill(P, x, z) { return __ZC(357, 29, this, arguments, new.target); }
function shkPlayhouseOut(P, x, z, r, sides, h, room, name, signs) { return __ZC(357, 30, this, arguments, new.target); }
function shkToday() { var d = Math.floor(Date.now() / 86400000); return SHK_PLAYS.filter(function (p) { return p[5]; })[d % 16]; }
function shkFlagCol() { var p = shkToday(); return /tragedy/.test(p[2]) ? 0x1A1A1A : /history/.test(p[2]) ? 0xA82A2A : 0xF0ECE4; }
function shkSonnetGarden(P, R) { return __ZC(357, 31, this, arguments, new.target); }
function shkDefenceOut(P, R) { return __ZC(357, 32, this, arguments, new.target); }
function shkSaviour(P, R) { return __ZC(357, 33, this, arguments, new.target); }
function shkTabard(P, R) { return __ZC(357, 34, this, arguments, new.target); }
Object.assign(SHK_FOLK, {
henslowe: { name: "Philip Henslowe", at: "rose",
persona: "Philip Henslowe in 1600, owner of the Rose playhouse on Bankside, a dyer and pawnbroker turned theatre manager, whose 'diary' (an account book) is the best record we have of how Elizabethan playhouses worked: what each play earned, what costumes cost, what he paid writers. His stepson-in-law is the great actor Edward Alleyn. Shrewd, chatty about money, proud of his company, the Admiral's Men, the Lord Chamberlain's Men's great rivals. He is building a new playhouse north of the river, the Fortune. Ages 13 and up.",
greet: "Mind the costumes: a cloak like that cost me twenty pound! Welcome to the Rose. The Admiral's Men play Marlowe here, and play him better than anyone.",
look: { layer: "jacket", layerColor: 0x3A2A1A, top: 0xE8E0D0, bottom: 0x3A2A1A, hat: "brimmed", hatColor: 0x1A1A1A, hair: 0x6A6A64, hairStyle: "short", waist: "satchel" } },
alleyn: { name: "Edward Alleyn", at: "rose",
persona: "Edward Alleyn in 1600, aged 34, the great tragic actor of the Admiral's Men, tall and with a mighty voice, famous as Marlowe's Tamburlaine, Doctor Faustus and the Jew of Malta. Proud, generous, Burbage's rival. Ages 13 and up.",
greet: "Is it not passing brave to be a king, and ride in triumph through Persepolis? ...Marlowe wrote that for me. Poor Kit.",
look: { layer: "tunic", layerColor: 0x1A1A3A, top: 0xE8E0D0, bottom: 0x1A1A3A, back: "cape", backColor: 0xC8A040, hat: "crown", hatColor: 0xE8C850, hair: 0x3A2618, hairStyle: "curly" } },
dewitt: { name: "Johannes de Witt", at: "swan",
persona: "Johannes de Witt, a Dutch visitor to London in 1596, who sketched the inside of the Swan playhouse. His drawing (copied by his friend Arend van Buchell) is the only picture of the inside of an Elizabethan playhouse that survives. Curious, precise, impressed: he wrote that the Swan held 3,000 people and that its wooden columns were painted so cleverly they looked like marble. Ages 13 and up.",
greet: "Goedendag! I am drawing this theatre: the stage, the two columns, the heavens, the tiring-house. Nobody at home will believe me. Look how they have painted the wood to look like marble!",
look: { layer: "jacket", layerColor: 0x1A1A1A, top: 0xF0F0F0, bottom: 0x1A1A1A, neck: "scarf", accColor: 0xF0F0F0, hat: "brimmed", hatColor: 0x1A1A1A, hair: 0xC8A060, hairStyle: "short" } },
barmaid: { name: "Kate, who keeps the Mermaid's tap", at: "mermaid",
persona: "Kate, who serves at the Mermaid Tavern in Bread Street in 1600, where Ben Jonson, the poet John Donne, Sir Walter Raleigh's friends and players meet. Quick, cheerful, knows everyone's gossip. Serves only small ale, cider and cakes to young dreamers. She has heard a rumour that a lost play manuscript is hidden in the cellar. Ages 13 and up.",
greet: "What'll it be, love? Cider, small ale, a slice of cake? Master Jonson's in his corner, sharpening his tongue.",
look: { topKind: "dress", top: 0x6A2A2A, bottom: 0x6A2A2A, bottomKind: "skirt", layer: "apron", layerColor: 0xE8E0D0, hair: 0xC8642A, hairStyle: "bun" } },
armourer: { name: "The Bankside armourer", at: "rapier",
persona: "the armourer behind the Sign of the Rapier on Bankside in 1600, a smith who makes and mends rapiers, daggers and the players' stage armour. Gruff, proud, kind. Ages 13 and up.",
greet: "Mind the sparks. You want a blade made, the forge is here.",
look: { layer: "apron", layerColor: 0x3A2A1A, top: 0xC8B898, bottom: 0x3A3A3A, hands: "gloves", hair: 0x2A1A12, hairStyle: "short" } }
});
var SHK_ROOMS = {
globe: { i: 0, hw: 42, hd: 44, name: "the Globe", out: "globe" },
plays: { i: 1, hw: 20, hd: 78, name: "the Hall of Plays" },
rose: { i: 2, hw: 32, hd: 34, name: "the Rose", out: "rose" },
swan: { i: 3, hw: 34, hd: 36, name: "the Swan", out: "swan" },
paul: { i: 4, hw: 19, hd: 108, name: "Paul's Walk", out: "paul" },
library: { i: 5, hw: 18, hd: 30, name: "the Folio Library", out: "library" },
print: { i: 6, hw: 12, hd: 10, name: "the Print Shop", out: "print" },
mermaid: { i: 7, hw: 14, hd: 11, name: "the Mermaid", out: "mermaid" },
cellar: { i: 8, hw: 9, hd: 7, name: "the Mermaid's cellar" },
defence: { i: 9, hw: 14, hd: 18, name: "the School of Defence", out: "defence" },
hall: { i: 10, hw: 14, hd: 36, name: "the Great Hall", out: "hall" },
birthplace: { i: 11, hw: 12, hd: 9, name: "the house on Henley Street", out: "birthplace" },
school: { i: 12, hw: 14, hd: 7, name: "the schoolroom", out: "school" },
trinity: { i: 13, hw: 11, hd: 32, name: "Holy Trinity", out: "trinity" }
};
var SHK_DOORS = {};
(function () { var f = shkDoor; shkDoor = function (room, x, z, name) { SHK_DOORS[room] = { x: x, z: z, name: name }; return f.apply(this, arguments); }; })();
function shkRoomX(k) { return SHK_IN_X + SHK_ROOMS[k].i * SHK_IN_STEP; }
function shkRoomAtX(x, z) {
if (x < SHK_IN_X - 400)
return null;
var i = Math.round((x - SHK_IN_X) / SHK_IN_STEP);
for (var k in SHK_ROOMS)
if (SHK_ROOMS[k].i === i)
return k;
return null;
}
function shkRoomEnsure(x, z) { var k = shkRoomAtX(x, z); if (k && !SHK.rooms[k])
shkRoomBuild(k); return k; }
function shkRoomBuild(k) { return __ZC(357, 35, this, arguments, new.target); }
function shkGoIn(k) {
var D = SHK_ROOMS[k];
if (!D)
return;
var Rm = SHK.rooms[k] || shkRoomBuild(k), e = Rm.entry || { x: 0, z: D.hd - 4, yaw: 0 };
shkMove(Rm.x + e.x, e.z, e.yaw, Rm.hello || ("<b>" + esc(D.name) + "</b>."));
}
function shkGoOut(k) { return __ZC(357, 36, this, arguments, new.target); }
function shkShell(g, cx, cz, Rm, o) { return __ZC(357, 37, this, arguments, new.target); }
function shkFloor(x, z, hw, hd, y) { SHK.floors.push({ x: x, z: z, hw: hw, hd: hd, y: y }); }
function shkLightWin(g, x, y, z, w, h, ry) { var m = shkBox(g, w, h, 0.12, shkGlowM(0xE8E4D0), x, y, z, ry); return m; }
function shkBooksTex() { return __ZC(357, 38, this, arguments, new.target); }
function shkBooksM() { if (SHK.mats.books)
return SHK.mats.books; var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: shkBooksTex() }); m.userData.ctn = 1; return (SHK.mats.books = m); }
function shkPlayhouseIn(g, cx, cz, Rm, o, R) { return __ZC(357, 39, this, arguments, new.target); }
function shkPlayhouseWay(g, cx, cz, Rm, o) { return __ZC(357, 40, this, arguments, new.target); }
function shkHeavensTex() { return __ZC(357, 41, this, arguments, new.target); }
function shkFloorsAt(x, z, f) { return __ZC(357, 42, this, arguments, new.target); }
var SHK_BUILD_ROOM = {
globe: function (g, cx, cz, R, Rm) { return __ZC(357, 43, this, arguments, new.target); },
rose: function (g, cx, cz, R, Rm) { return __ZC(357, 44, this, arguments, new.target); },
swan: function (g, cx, cz, R, Rm) { return __ZC(357, 45, this, arguments, new.target); },
plays: function (g, cx, cz, R, Rm) { return __ZC(357, 46, this, arguments, new.target); },
paul: function (g, cx, cz, R, Rm) { return __ZC(357, 47, this, arguments, new.target); },
library: function (g, cx, cz, R, Rm) { return __ZC(357, 48, this, arguments, new.target); },
print: function (g, cx, cz, R, Rm) { return __ZC(357, 49, this, arguments, new.target); },
mermaid: function (g, cx, cz, R, Rm) { return __ZC(357, 50, this, arguments, new.target); },
cellar: function (g, cx, cz, R, Rm) { return __ZC(357, 51, this, arguments, new.target); },
defence: function (g, cx, cz, R, Rm) { return __ZC(357, 52, this, arguments, new.target); },
hall: function (g, cx, cz, R, Rm) { return __ZC(357, 53, this, arguments, new.target); },
birthplace: function (g, cx, cz, R, Rm) { return __ZC(357, 54, this, arguments, new.target); },
school: function (g, cx, cz, R, Rm) { return __ZC(357, 55, this, arguments, new.target); },
trinity: function (g, cx, cz, R, Rm) { return __ZC(357, 56, this, arguments, new.target); }
};
function shkStairsCard(Rm, cx, cz, P) { return __ZC(357, 57, this, arguments, new.target); }
function shkRoseTex() { return __ZC(357, 58, this, arguments, new.target); }
function shkStratford(P, R) { return __ZC(357, 59, this, arguments, new.target); }
function shkToStratford() { var S = SHK_STRAT; shkMove(S.x + 134, S.z - 104, shkYawTo(-1, 0), "🛞 <b>Stratford-upon-Avon.</b> Four days on the road in a carrier's wagon, by way of Oxford, in a moment of dream. Henley Street is ahead; the Avon behind you; Shottery over the fields to the west."); }
function shkToLondon() { var T = SHK_PLACES.tabard; shkMove(T.x - 27, T.z + 20, shkYawTo(-1, 0), "🛞 <b>Back in Southwark</b>, in the yard of the Tabard Inn. Borough High Street runs north to London Bridge; Bankside and the Globe are to the west."); }
function shkYawTo(dx, dz) { return Math.atan2(-dx, -dz); }
function shkData() {
if (!store.shk || typeof store.shk !== "object")
store.shk = {};
var d = store.shk;
if (!d.day || d.day.d !== shkDay())
d.day = { d: shkDay(), k: {} };
if (!Array.isArray(d.ages))
d.ages = [];
if (!Array.isArray(d.sonnets))
d.sonnets = [];
if (!d.draft)
d.draft = [];
return d;
}
function shkDay() { var t = new Date(); return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate(); }
function shkSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function shkT(t, sub) { return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + t + "</div>" + (sub ? "<div style='opacity:.8;font-size:12px;margin-bottom:6px'>" + sub + "</div>" : ""); }
function shkHead(t) { return "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function shkPick(a, R) { return a[Math.floor((R || Math.random)() * a.length)]; }
function shkShuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
function shkSigned() { return typeof signedIn === "function" && signedIn(); }
function shkRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function shkRulesFetch(force) {
if (!shkSigned() || (!force && SHK.rulesAt && Date.now() - SHK.rulesAt < 300000))
return;
SHK.rulesAt = Date.now();
shkRpc("bard_state").then(function (o) { if (o && o.ok !== false)
SHK.rules = { on: o.on !== false, off: o.off || [], gold: o.gold || {} }; }).catch(function () { });
}
function shkOff(k) { var R = SHK.rules; return !!(R && (R.on === false || (R.off && R.off.indexOf(k) > -1))); }
function shkGold(k) { var R = SHK.rules; return R && R.gold && R.gold[k] != null ? R.gold[k] : SHK_PAY[k][1]; }
function shkPayLine(k) {
if (shkOff(k))
return "The Keeper has closed this for now.";
return shkData().day.k[k] ? "Done today: play again for fun (it pays once a day)." : "Pays " + shkGold(k) + " gold once a day (dues-payers) and gives " + SHK_KEEP[k][2] + " " + esc(SHK_KEEP[k][1]) + " to your Backpack.";
}
function shkReward(k, msg) { return __ZC(357, 60, this, arguments, new.target); }
function shkTalkBtn(key) { var F = SHK_FOLK[key]; return { h: worldBtn("talk", "💬 Talk with " + esc(F.name.split(",")[0]), ""), f: function () { worldCard(null); wTalk({ name: F.name, persona: F.persona, greet: F.greet }); } }; }
function shkAsk(head, q, right, wrong, ok, why, extra) { return __ZC(357, 61, this, arguments, new.target); }
function shkStageCard() { return __ZC(357, 62, this, arguments, new.target); }
function shkSpeech(si, n, miss, mode, then) { return __ZC(357, 63, this, arguments, new.target); }
function shkQueenCard() { return __ZC(357, 64, this, arguments, new.target); }
function shkQueenAsk(n, right) { return __ZC(357, 65, this, arguments, new.target); }
function shkSonnetRead(k) { return __ZC(357, 66, this, arguments, new.target); }
function shkBeatCard(n, right) { return __ZC(357, 67, this, arguments, new.target); }
function shkSyl(line) { return __ZC(357, 68, this, arguments, new.target); }
function shkRhymeKey(line) {
var w = (String(line).toLowerCase().match(/[a-z']+/g) || [""]).pop().replace(/'/g, "");
var m = w.match(/[aeiouy]+[^aeiouy]*e?s?$/);
return { w: w, k: m ? m[0] : w };
}
function shkRhymes(a, b) {
var A = shkRhymeKey(a), B = shkRhymeKey(b);
if (!A.w || !B.w)
return false;
if (A.w === B.w)
return false;
if (A.k === B.k)
return true;
if (A.w.slice(-3) === B.w.slice(-3))
return true;
var s = function (x) { return x.replace(/e?s$/, "").replace(/e$/, ""); };
return s(A.k) === s(B.k) && s(A.k).length > 1;
}
function shkSonnetWrite() { return __ZC(357, 69, this, arguments, new.target); }
function shkSonnetCheck() { return __ZC(357, 70, this, arguments, new.target); }
function shkMySonnets() { return __ZC(357, 71, this, arguments, new.target); }
function shkInsultCard() { return __ZC(357, 72, this, arguments, new.target); }
function shkInsult(L, n, right) { return __ZC(357, 73, this, arguments, new.target); }
function shkInsultKit() { return __ZC(357, 74, this, arguments, new.target); }
var SHK_QUARTOS = [
["THE Tragicall Historie of HAMLET Prince of Denmarke", "As it hath beene diuerse times acted by his Highnesse seruants in the Cittie of London", "1603"],
["A Midsommer nights dreame", "As it hath beene sundry times publickely acted, by the Right honourable, the Lord Chamberlaine his seruants", "1600"],
["THE MOST EXcellent and lamentable Tragedie, of Romeo and Iuliet", "As it hath been sundrie times publiquely acted, by the right Honourable the Lord Chamberlaine his Seruants", "1599"],
["THE TRAGEDY OF King Richard the third", "As it hath beene lately Acted by the Right honourable the Lord Chamberlaine his seruants", "1597"]
];
var SHK_TYPEWORDS = ["dream", "bard", "quill", "played", "proud", "pound", "bubble", "double", "dumb", "queen"];
function shkPrintCard() { return __ZC(357, 75, this, arguments, new.target); }
function shkType(qi, word, n, miss) { return __ZC(357, 76, this, arguments, new.target); }
function shkPrinted(qi) { return __ZC(357, 77, this, arguments, new.target); }
var SHK_FENCE = [
["Imbroccata", "a thrust from above, coming down over your dagger hand", "Raise your dagger and turn his point aside, high", ["Step forward into it", "Drop your rapier's point to the floor"]],
["Stoccata", "a thrust from below, rising under your guard", "Beat it down and aside with your dagger", ["Lift both hands over your head", "Turn your back to it"]],
["Punta riversa", "a back-handed thrust coming in from your left", "Turn it with your rapier and step to the right, out of its line", ["Stand quite still and hope", "Step left, into it"]],
["Mandritta", "a forehand cut at your head", "Meet it on the forte of your blade, the strong part by the hilt", ["Catch it on the thin end of your blade", "Duck and close your eyes"]],
["Riversa", "a back-handed cut at your side", "Catch it on your dagger and answer with a thrust", ["Let it land and laugh", "Throw your dagger at him"]],
["A feint", "he shows a thrust high, then drops it low", "Keep your guard: don't chase the first, wait for the true attack", ["Leap at the first one", "Lower your rapier to rest"]],
["The passata", "he passes forward, stepping right past your blade", "Step back on the circle and keep your point toward him", ["Turn and run", "Lean in to grab his sleeve"]]
];
function shkFenceCard() { return __ZC(357, 78, this, arguments, new.target); }
function shkFence(L, n, right) { return __ZC(357, 79, this, arguments, new.target); }
var SHK_GLOVE = ["Choose the skin: soft kid (young goat) for the finest gloves, sheep or deer for everyday", "Soak it, then stretch and work it soft over a wooden stake", "Lay the pattern and cut the 'trank' (the hand) and the thumb with shears", "Cut the 'fourchettes', the thin strips that go between the fingers", "Sew it together with tiny stitches, finger by finger", "Perfume it, and stretch it into shape on the glove-tree"];
function shkGloveCard() { return __ZC(357, 80, this, arguments, new.target); }
function shkGlove(n, miss) { return __ZC(357, 81, this, arguments, new.target); }
var SHK_SCHOOLQ = [
["Amo, amas, amat. What does it mean?", "I love, you love, he (or she) loves", ["I am, you are, he is", "I walk, you walk, he walks"]],
["Which Roman poet did Shakespeare love best (his Metamorphoses gave him Pyramus and Thisbe)?", "Ovid", ["Homer", "Chaucer"]],
["What was a hornbook?", "A wooden paddle with the alphabet and the Lord's Prayer under a thin, clear sheet of horn", ["A book of hunting-horn music", "A book with pages made of horn"]],
["How long was the school day?", "From about six in the morning to five at night, six days a week", ["Nine till three, five days a week", "Only the mornings, in winter"]],
["Who could go to the King's New School?", "The boys of the town, for free (girls were taught at home, if at all)", ["Anyone who paid a gold crown a week", "Only the sons of lords"]],
["\"Et tu, Brute?\" is Latin. What does it mean?", "And you, Brutus?", ["Eat it, Brutus!", "Run, Brutus!"]],
["What is 'puer'?", "A boy", ["A pear", "A door"]],
["Ben Jonson said Shakespeare had \"small Latin and less...\"", "Greek", ["French", "Welsh"]],
["What did the boys act at school, to practise their Latin?", "Roman comedies, by Terence and Plautus", ["Shakespeare's own plays", "Nothing: acting was forbidden"]]
];
function shkSchoolCard() { return __ZC(357, 82, this, arguments, new.target); }
function shkSchool(L, n, right) { return __ZC(357, 83, this, arguments, new.target); }
function shkWhoCard() { return __ZC(357, 84, this, arguments, new.target); }
function shkWho(L, n, right) { return __ZC(357, 85, this, arguments, new.target); }
function shkAgesBuild(P) { return __ZC(357, 86, this, arguments, new.target); }
function shkAgeFound(i) { return __ZC(357, 87, this, arguments, new.target); }
function shkLibrary(q) { return __ZC(357, 88, this, arguments, new.target); }
function shkLibFind(q) { return __ZC(357, 89, this, arguments, new.target); }
var SHK_PLAY_IDS = ["sh_romeo", "sh_hamlet", "sh_macbeth", "sh_dream", "sh_tempest", "sh_caesar", "sh_lear", "sh_othello", "sh_twelfth", "sh_muchado", "sh_asyou", "sh_merchant", "sh_henry", "sh_richard", "sh_winter", "sh_antony"];
function shkPlayCard(id) { return __ZC(357, 90, this, arguments, new.target); }
function shkPlaysAll() { return __ZC(357, 91, this, arguments, new.target); }
function shkGlobeFacts() { shkgBoxCard(); }
function shkSiQuis() { return __ZC(357, 92, this, arguments, new.target); }
function shkBuild(G) { return __ZC(357, 93, this, arguments, new.target); }
function shkFlatPeople() {
SHK.people.forEach(function (P) {
var g = P.g;
if (g.userData.shkFlat)
return;
g.userData.shkFlat = 1;
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) { }
});
}
function shkLondonFolk(R) { return __ZC(357, 94, this, arguments, new.target); }
function shkZoneAt(x, z) {
if (x > SHK_IN_X - 400)
return "inside";
if (x > SHK_STRAT.x - 2000)
return "stratford";
if (z < -SHK_RIV)
return x < -460 ? "west" : "city";
if (z > SHK_RIV)
return x > 200 ? "borough" : "bankside";
return Math.abs(x - SHK_BRIDGE) < SHK_BRW ? "bridge" : "river";
}
function shkGround(x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet;
if (SHK.ride)
return SHK_WATER + 0.55;
if (x > SHK_IN_X - 400 || SHK.floors.length) {
var b = shkFloorsAt(x, z, f);
if (b !== null)
return b;
}
return 0;
}
function shkBlock(x, z, feet) { return __ZC(357, 95, this, arguments, new.target); }
var SHK_ENV = {
london: { top: 0x6C98CC, low: 0xE8DCC2, fog: 0xD8D0BE, fogD: 0.0017, sun: 1.0, sunCol: 0xFFE6C0, sunDir: [-0.45, 0.55, 0.4], hemi: 0.68, hemiCol: 0xD8E2EE, hemiGround: 0x5A4A38 },
stratford: { top: 0x5E94D8, low: 0xE4E8D4, fog: 0xD4DCCC, fogD: 0.0014, sun: 1.05, sunCol: 0xFFEAC8, sunDir: [-0.45, 0.6, 0.35], hemi: 0.7, hemiCol: 0xDCE6F0, hemiGround: 0x4A5A38 },
open: { top: 0x6C98CC, low: 0xE8DCC2, fog: 0xE0D6C2, fogD: 0.004, sun: 1.0, sunCol: 0xFFE6C0, sunDir: [-0.45, 0.55, 0.4], hemi: 0.72, hemiCol: 0xD8E2EE, hemiGround: 0x5A4A38 },
inside: { top: 0x3A3028, low: 0x5A4A3A, fog: 0x2A241E, fogD: 0.012, sun: 0.55, sunCol: 0xFFE0B8, sunDir: [0.3, 0.8, 0.2], hemi: 0.78, hemiCol: 0xF0E2CC, hemiGround: 0x4A3A2A }
};
function shkEnvNow() {
var z = SHK.zone, k = z === "inside" ? (SHK.inside && /^(globe|rose|swan)$/.test(SHK.inside) ? "open" : "inside") : z === "stratford" ? "stratford" : "london", E = SHK_ENV[k];
if (SHK.lite && k !== "inside")
E = Object.assign({}, E, { fogD: E.fogD * 1.6 });
return E;
}
function shkTick(dt) { return __ZC(357, 96, this, arguments, new.target); }
function shkPlaceName(x, z) { return __ZC(357, 97, this, arguments, new.target); }
function shkWherry(fromSide) { return __ZC(357, 98, this, arguments, new.target); }
function shkHome() { worldHome("<b>Out of Shakespeare's London.</b> For a moment you can still hear the trumpet sounding from the Globe."); }
if (typeof worldDef === "function")
worldDef(SHK_KEY, {
base: SHK.base, far: 2600, ownSky: true, tone: 392,
env: function () { return shkEnvNow(); },
build: function (G) { shkBuild(G); },
enter: function (opt) { return __ZC(357, 99, this, arguments, new.target); },
leave: function () { SHK.ride = null; if (SHK.veil)
SHK.veil.style.opacity = "0"; SHK.moving = false; if (SHK.startIn) {
try {
store.dpStartIn = SHK.startIn;
}
catch (e) { }
SHK.startIn = null;
} },
ground: function (x, z, feet) { return shkGround(x, z, feet); },
block: function (x, z, feet) { return shkBlock(x, z, feet); },
tick: function (dt) { shkTick(dt); },
back: function () { if (SHK.zone === "inside" && SHK.inside) {
shkGoOut(SHK.inside);
return;
} shkHome(); }
});
function shkGo(opt) { try {
if (store.dpStartIn) {
SHK.startIn = store.dpStartIn;
delete store.dpStartIn;
}
}
catch (e) { } return worldGo(SHK_KEY, opt || {}); }
if (typeof WLG !== "undefined" && WLG.keys.indexOf(SHK_KEY) < 0)
WLG.keys.push(SHK_KEY);
function shkForget() { return __ZC(357, 100, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () {
var f = worldLetGo;
worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === SHK_KEY)
shkForget(); return r; };
})();
var SHKD = { g: null, on: false };
function shkHallSpot() {
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
var a2 = (gaps[2] || gaps[1] || gaps[0]).a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
}
function shkHallTick() {
if (WLD.on || store.inside || !walkMode) {
if (SHKD.g)
SHKD.g.visible = false;
if (SHKD.on) {
SHKD.on = false;
worldPromptCity(null);
}
return;
}
var s = shkHallSpot();
if (!s) {
if (SHKD.g)
SHKD.g.visible = false;
if (SHKD.on) {
SHKD.on = false;
worldPromptCity(null);
}
return;
}
if (!SHKD.g) {
var g = new THREE.Group(), oak = wM(0x4A3424), lime = wM(0xF2EEE4), red = wM(0x8A1A2A), gold = wM(0xC8A040);
[-1, 1].forEach(function (k) { wBox(0.5, 4.6, 0.5, oak, k * 1.9, 2.3, 0, g); wBox(0.9, 4.6, 0.3, lime, k * 2.6, 2.3, 0, g); });
wBox(4.4, 0.5, 0.5, oak, 0, 4.75, 0, g);
wBox(3.3, 4.4, 0.12, red, 0, 2.2, 0, g);
var hut = wCone(2.6, 1.6, wM(0xC8A878), 0, 5.8, 0, g, 20);
wCyl(0.05, 0.05, 1.6, oak, 0, 7.2, 0, g, 5);
wBox(0.9, 0.5, 0.02, wM(0x1A1A1A), 0.48, 7.7, 0, g);
wSph(0.5, gold, 0, 3.3, 0.12, g, 12).scale.set(1, 1, 0.3);
var sg = wSign(["SHAKESPEARE'S LONDON", "the Globe, 1600 · press E"], 3.4, 0.8, "#2A1E14", "#E8D0A0");
sg.position.set(0, 6.9, 0.4);
g.add(sg);
var gl = wGlow(0xFFD490, 3.2, 0.25);
gl.position.set(0, 2.6, 0.4);
g.add(gl);
scene.add(g);
SHKD.g = g;
}
var P = camera.position, d = Math.hypot(P.x - s.x, P.z - s.z);
SHKD.g.visible = true;
SHKD.g.position.set(s.x, 0, s.z);
SHKD.g.rotation.y = -s.a - Math.PI / 2;
if (d < 3.6) {
if (!SHKD.on) {
SHKD.on = true;
worldPromptCity("<b>Shakespeare's London</b> · <b>press E</b> to step through to the Globe", shkFromHall);
}
}
else if (SHKD.on) {
SHKD.on = false;
worldPromptCity(null);
}
}
function shkFromHall() {
worldPromptCity(null);
SHKD.on = false;
var s = shkHallSpot(), P = camera.position;
shkGo(s ? { from: { here: store.here || 0, x: s.x - Math.cos(s.a) * 3, y: P.y, z: s.z - Math.sin(s.a) * 3, yaw: yaw + Math.PI, name: "the Hall of Doors" } } : {});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
shkHallTick();
}
catch (e) {
if (!SHK.e1) {
SHK.e1 = 1;
if (window.console)
console.warn("shakespeare door:", e);
}
} };
})();
function shkMenu() { return __ZC(357, 101, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-bard"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-bard";
b.title = "Shakespeare's London";
b.textContent = "🎭 Shakespeare";
b.onclick = function () { shkMenu(); };
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
if (row && row.parentNode && !pane.querySelector("[data-kt-bard]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-bard", "1");
b.textContent = "🎭 Shakespeare's London";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } shkGo({}); };
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
if (!/[?&]kbard=1/.test(location.search))
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
shkGo({});
try {
var q = new URLSearchParams(location.search);
q.delete("kbard");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === SHK_KEY; })) {
DGR_WORLDS.push([SHK_KEY, "Shakespeare's London (and Stratford)", 0, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[SHK_KEY] = { id: SHK_KEY, name: "Shakespeare's London", def: 0, group: "hidden" };
}
(function () {
if (typeof RA_DEF === "undefined" || typeof RA === "undefined" || RA.list.cardenio)
return;
var cx = SHK_IN_X + SHK_ROOMS.cellar.i * SHK_IN_STEP;
var d = { k: "cardenio", name: "The Lost Play", icon: "📜", at: SHK_KEY, seed: [cx + 5.5, 2.5], spot: "slab", mark: 0x8A8478,
what: "a cellar flagstone with a quill scratched into one corner", look: "Scratched into the corner of this flagstone, very small: a quill, and the letters W.S.", act: "Lift the flagstone",
open: "Under the flagstone, wrapped in oilcloth, lies a bundle of paper tied with tape: a play in a neat secretary hand. Its title page reads: The History of Cardenio.",
tale: "The only copy left of The History of Cardenio, the play Shakespeare wrote with John Fletcher from a story in Don Quixote, played at court in 1613 and lost ever since. Whoever holds it holds a whole lost world: the madness of love, a mountain wilderness, and the most famous stage direction's long-lost cousin.",
rumour: "A notice on the 'Si quis' door in Paul's Walk asks after a play called Cardenio; somebody has written underneath, \"try the Mermaid\". And Kate at the Mermaid's tap says there's a stone in her cellar with a quill scratched on it." };
d.i = RA_DEF.length;
RA_DEF.push(d);
RA.list.cardenio = d;
RA.order.push("cardenio");
if (typeof raHideSpot === "function") {
var rh = raHideSpot;
raHideSpot = function (dd) {
if (dd && dd.k === "cardenio") {
var key = "cardenio@" + (typeof WLD !== "undefined" && WLD.w && WLD.w.g ? WLD.w.g.uuid : "city"), c = RA.spots.cardenio;
if (c && c.key === key)
return c;
return (RA.spots.cardenio = { x: dd.seed[0], z: dd.seed[1], y: 0, key: key });
}
return rh.apply(this, arguments);
};
}
if (typeof RA_MODEL !== "undefined")
RA_MODEL.cardenio = function () {
var M = raM(), g = new THREE.Group();
mmBox(g, 0.2, 0.05, 0.28, M.paper, 0, 0.025, 0);
mmBox(g, 0.21, 0.008, 0.29, M.velvet, 0, 0.054, 0);
mmBox(g, 0.012, 0.06, 0.3, M.walnut, 0, 0.03, 0);
var tape = mmBox(g, 0.22, 0.012, 0.02, M.ivory, 0, 0.06, 0);
mmCyl(g, M.ivory, 0.004, 0.002, 0.22, 0.08, 0.09, 0.05, 0.4, 0, 0.9, 6);
return { g: g, h: 0.08, anim: function (dt) { tape.rotation.y = Math.sin(Date.now() / 1600) * 0.05; } };
};
if (typeof RA_POW !== "undefined")
RA_POW.cardenio = { n: "Exit, Pursued by a Bear", col: 0xE8D8B8, cd: 45, pas: { speed: 1.12, regen: 1.5 },
act: [{ aoe: 16, dmg: 55, knock: 9, stun: 3 }],
pasT: "You move 12% faster and heal 1.5 vigour a second: the lost play's words keep you going.",
actT: "A great spectral bear rears up out of the pages and charges: 55 to every foe within 16 m, thrown back 9 m and dazed for 3 seconds (25 to each dreamer within 12 m)." };
})();
(function () {
if (typeof bkpHandHtml !== "function")
return;
var bh = bkpHandHtml;
bkpHandHtml = function () {
var h = bh.apply(this, arguments);
try {
var d = store.shk;
if (d && ((d.ages && d.ages.length) || (d.sonnets && d.sonnets.length))) {
h += bkpHead("From Shakespeare's London");
if (d.ages && d.ages.length)
h += bkpRow("✦ The Seven Ages of Man", d.ages.length + " of 7 found");
(d.sonnets || []).slice(-5).reverse().forEach(function (s) { h += bkpRow("📜 A sonnet of your own", esc(String(s.l[0] || "").slice(0, 40)) + "…"); });
}
}
catch (e) { }
return h;
};
})();
(function () {
if (typeof CT_BY_ID === "undefined")
return;
SHK_PLAY_IDS.forEach(function (id) { var T = CT_TALES.filter(function (t) { return t.id === id; })[0]; if (T)
CT_BY_ID[id] = T; });
if (typeof ctWorldName === "function") {
var wn = ctWorldName;
ctWorldName = function (h) { if (h === "world:bard")
return "Shakespeare's London (the Hall of Plays, under the Globe's stage)"; return wn.apply(this, arguments); };
}
})();
function shkTest() { return { SHK: SHK, go: shkGo, goIn: shkGoIn, goOut: shkGoOut, move: shkMove, ground: shkGround, block: shkBlock, rooms: SHK_ROOMS, lib: shkLibFind, syl: shkSyl, rhymes: shkRhymes }; }
var SHKF = { open: false, idx: null, id: null, text: null, lines: null, p: 0, size: 17, find: "", hit: -1, busy: false, el: null, view: "book" };
var SHKF_BASE = "data/shakespeare/works/";
var SHKF_KINDS = [["comedies", "Comedies"], ["histories", "Histories"], ["tragedies", "Tragedies"], ["poems", "Poems & Sonnets"]];
(function () {
if (document.getElementById("shkf-style"))
return;
var s = document.createElement("style");
s.id = "shkf-style";
s.textContent =
"#shkf{position:fixed;inset:0;z-index:58;display:none;align-items:center;justify-content:center;background:rgba(10,6,3,.72)}" +
"#shkf .bk{position:relative;width:min(980px,calc(100vw - 16px));height:min(94vh,860px);display:flex;flex-direction:column;border-radius:4px;overflow:hidden;" +
"box-shadow:0 24px 80px rgba(0,0,0,.75),inset 0 0 0 2px #5A1A12;background:radial-gradient(ellipse at 50% 40%,#F7EDD3,#EAD7AC 70%,#D4B884);color:#2A1A0C;" +
"font-family:'Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif}" +
"#shkf .hd{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:10px 14px 8px;border-bottom:2px solid #7A1F1A;background:linear-gradient(180deg,rgba(122,31,26,.10),rgba(122,31,26,0))}" +
"#shkf .ti{flex:1 1 220px;min-width:0}" +
"#shkf .ti small{display:block;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:#7A1F1A}" +
"#shkf .ti b{display:block;font:italic 600 21px/1.15 'Palatino Linotype',Palatino,Georgia,serif;color:#4A120E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
"#shkf button,#shkf select,#shkf input{font:14px Georgia,serif;border:1px solid #8A6A36;border-radius:4px;background:#FBF4E2;color:#3A220E;padding:6px 9px}" +
"#shkf button{cursor:pointer;background:#F3E4C0}#shkf button.rd{background:linear-gradient(180deg,#9A2A22,#6E1712);color:#F8EBD0;border-color:#4A0E0A}" +
"#shkf select{max-width:min(300px,60vw)}#shkf input{width:150px}" +
"#shkf .pg{flex:1;overflow-y:auto;padding:18px clamp(14px,5vw,64px) 30px;-webkit-overflow-scrolling:touch}" +
"#shkf .tx{max-width:680px;margin:0 auto;line-height:1.55;white-space:pre-wrap;word-wrap:break-word}" +
"#shkf .tx .sp{display:block;margin-top:.7em;font-variant:small-caps;letter-spacing:.06em;color:#7A1F1A;font-weight:600}" +
"#shkf .tx .sd{display:block;font-style:italic;color:#5A4428;margin:.4em 0}" +
"#shkf .tx .hh{display:block;text-align:center;font:italic 600 1.35em/1.3 'Palatino Linotype',Palatino,Georgia,serif;color:#4A120E;margin:.6em 0 .5em}" +
"#shkf .tx mark{background:rgba(214,170,60,.55);color:inherit;border-radius:2px}" +
"#shkf .ft{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:8px 14px;border-top:1px solid rgba(122,31,26,.45);font-size:13px;color:#5A3A1E}" +
"#shkf .cont{max-width:880px;margin:0 auto;columns:4 190px;column-gap:28px}" +
"#shkf .cont h4{margin:0 0 6px;font:italic 600 18px Georgia,serif;color:#7A1F1A;break-after:avoid}" +
"#shkf .cont div{break-inside:avoid;margin-bottom:16px}" +
"#shkf .cont a{display:block;padding:3px 0;color:#2A1A0C;text-decoration:none;cursor:pointer;font-size:14.5px}" +
"#shkf .cont a:hover{color:#9A2A22;text-decoration:underline}" +
"#shkf .cont a small{color:#7A5A36}" +
"#shkf .ttl{text-align:center;margin:4px 0 18px}#shkf .ttl b{display:block;font:italic 600 26px Georgia,serif;color:#4A120E}" +
"#shkf .ttl small{display:block;letter-spacing:.2em;text-transform:uppercase;font-size:11px;color:#7A1F1A;margin-top:4px}" +
"@media (max-width:600px){#shkf .bk{height:100vh;width:100vw;border-radius:0}#shkf input{width:110px}}";
(document.head || document.documentElement).appendChild(s);
})();
function shkfKeep() { try {
store.shkFolio = { id: SHKF.id, p: SHKF.p, size: SHKF.size };
if (typeof save === "function")
save();
}
catch (e) { } }
function shkfIndex() {
if (SHKF.idx)
return Promise.resolve(SHKF.idx);
return fetch(SHKF_BASE + "index.json").then(function (r) { if (!r.ok)
throw new Error("index " + r.status); return r.json(); }).then(function (j) { SHKF.idx = j.works || []; return SHKF.idx; });
}
function shkfMatch(title) { return __ZC(357, 102, this, arguments, new.target); }
function shkFolio(title, part) { return __ZC(357, 103, this, arguments, new.target); }
function shkfClose() { SHKF.open = false; SHKF.text = null; SHKF.lines = null; if (SHKF.el)
SHKF.el.style.display = "none"; }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!SHKF.open; }, close: shkfClose });
function shkfLoad(id, p) { return __ZC(357, 104, this, arguments, new.target); }
function shkfWork() { var id = SHKF.id; return (SHKF.idx || []).filter(function (w) { return w.id === id; })[0]; }
function shkfParts(W) { return __ZC(357, 105, this, arguments, new.target); }
function shkfFmt(lines, find) { return __ZC(357, 106, this, arguments, new.target); }
function shkfDraw() { return __ZC(357, 107, this, arguments, new.target); }
function shkfPaint(body, contents, W, P) { return __ZC(357, 108, this, arguments, new.target); }
function shkfSearch(next) { return __ZC(357, 109, this, arguments, new.target); }
var SHK_SONGS = [
["Under the greenwood tree", "As You Like It, Act II, Scene 5 (Amiens)", ["Under the greenwood tree", "Who loves to lie with me,", "And turn his merry note", "Unto the sweet bird’s throat,", "Come hither, come hither, come hither:", "Here shall he see", "No enemy", "But winter and rough weather."]],
["It was a lover and his lass", "As You Like It, Act V, Scene 3 (two pages)", ["It was a lover and his lass,", "With a hey, and a ho, and a hey nonino,", "That o’er the green cornfield did pass", "In springtime, the only pretty ring time,", "When birds do sing, hey ding a ding, ding:", "Sweet lovers love the spring."]],
["Sigh no more, ladies", "Much Ado About Nothing, Act II, Scene 3 (Balthasar)", ["Sigh no more, ladies, sigh no more,", "Men were deceivers ever;", "One foot in sea, and one on shore,", "To one thing constant never.", "Then sigh not so, but let them go,", "And be you blithe and bonny,", "Converting all your sounds of woe", "Into hey nonny, nonny."]],
["Blow, blow, thou winter wind", "As You Like It, Act II, Scene 7 (Amiens)", ["Blow, blow, thou winter wind,", "Thou art not so unkind", "As man’s ingratitude;", "Thy tooth is not so keen,", "Because thou art not seen,", "Although thy breath be rude.", "Heigh-ho! sing heigh-ho! unto the green holly:", "Most friendship is feigning, most loving mere folly."]],
["Who is Silvia?", "The Two Gentlemen of Verona, Act IV, Scene 2", ["Who is Silvia? what is she,", "That all our swains commend her?", "Holy, fair and wise is she;", "The heaven such grace did lend her,", "That she might admirèd be."]],
["You spotted snakes", "A Midsummer Night’s Dream, Act II, Scene 2 (the fairies’ lullaby)", ["You spotted snakes with double tongue,", "Thorny hedgehogs, be not seen;", "Newts and blind-worms, do no wrong,", "Come not near our fairy queen.", "Philomel, with melody", "Sing in our sweet lullaby;", "Lulla, lulla, lullaby, lulla, lulla, lullaby."]],
["Tell me where is fancy bred", "The Merchant of Venice, Act III, Scene 2", ["Tell me where is fancy bred,", "Or in the heart or in the head?", "How begot, how nourishèd?", "Reply, reply.", "It is engender’d in the eyes,", "With gazing fed; and fancy dies", "In the cradle where it lies."]],
["O mistress mine", "Twelfth Night, Act II, Scene 3 (Feste: the Globe will hear it next year)", ["O mistress mine, where are you roaming?", "O stay and hear! your true love’s coming,", "That can sing both high and low.", "Trip no further, pretty sweeting;", "Journeys end in lovers meeting,", "Every wise man’s son doth know."]]
];
var SHK_INS = [["artless", "bawdy", "beslubbering", "bootless", "churlish", "clouted", "craven", "currish", "dankish", "dissembling", "droning", "errant", "fawning", "fobbing", "froward", "gleeking", "goatish", "gorbellied", "impertinent", "jarring", "loggerheaded", "lumpish", "mammering", "mangled", "mewling", "paunchy", "pribbling", "puking", "puny", "qualling", "rank", "reeky", "roguish", "ruttish", "saucy", "spleeny", "spongy", "surly", "tottering", "unmuzzled", "vain", "venomed", "villainous", "warped", "wayward", "weedy", "yeasty"],
["base-court", "bat-fowling", "beef-witted", "beetle-headed", "boil-brained", "clapper-clawed", "clay-brained", "common-kissing", "crook-pated", "dismal-dreaming", "dizzy-eyed", "doghearted", "dread-bolted", "earth-vexing", "elf-skinned", "fat-kidneyed", "fen-sucked", "flap-mouthed", "fly-bitten", "folly-fallen", "fool-born", "full-gorged", "guts-griping", "half-faced", "hasty-witted", "hedge-born", "hell-hated", "idle-headed", "ill-breeding", "ill-nurtured", "knotty-pated", "milk-livered", "motley-minded", "onion-eyed", "plume-plucked", "pottle-deep", "pox-marked", "reeling-ripe", "rough-hewn", "rude-growing", "rump-fed", "shard-borne", "sheep-biting", "spur-galled", "swag-bellied", "tardy-gaited", "tickle-brained", "toad-spotted", "unchin-snouted", "weather-bitten"],
["apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "bum-bailey", "canker-blossom", "clack-dish", "clotpole", "coxcomb", "codpiece", "death-token", "dewberry", "flap-dragon", "flax-wench", "flirt-gill", "foot-licker", "fustilarian", "giglet", "gudgeon", "haggard", "harpy", "hedge-pig", "horn-beast", "hugger-mugger", "joithead", "lewdster", "lout", "maggot-pie", "malt-worm", "mammet", "measle", "minnow", "miscreant", "moldwarp", "mumble-news", "nut-hook", "pigeon-egg", "pignut", "puttock", "pumpion", "ratsbane", "scut", "skainsmate", "strumpet", "varlot", "vassal", "whey-face", "wagtail"]];
var SHK_NEWS = [
"Oyez! The Lord Chamberlain’s Men play this afternoon at the Globe, upon the Bankside: watch for the flag on the hut, and hark for the trumpet!",
"Oyez! The Earl of Essex, come home from Ireland without leave, is kept under guard at York House, and the Queen will not see him.",
"Oyez! Master Henslowe and Master Alleyn build a new playhouse in the fields by Golding Lane, to be called the Fortune.",
"Oyez! Merchants of the City petition Her Majesty for a charter to trade with the East Indies. They say it will be granted by Christmas.",
"Oyez! Will Kemp, late clown of the Lord Chamberlain’s Men, hath danced a morris all the way from London to Norwich in nine days, and printed a book of it!",
"Oyez! The plague bill this week is low, God be thanked, and the playhouses stay open.",
"Oyez! Lost, upon Paul’s Walk: a gentleman’s purse of green velvet. The finder to the Sign of the Bell in Carter Lane, and be rewarded.",
"Oyez! By order of the Lord Mayor: no bear-baiting nor play upon the Sabbath."
];
function shkWares(kind, R) { return __ZC(357, 110, this, arguments, new.target); }
function shkAwningTex(c1, c2) {
return wTex(128, 128, function (x, W, H) {
for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? c1 : c2;
x.fillRect(i * W / 8, 0, W / 8, H);
}
var R = wRand(3);
for (var k = 0; k < 400; k++) {
x.fillStyle = "rgba(60,40,20," + (0.03 + R() * 0.05) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
});
}
function shkStall(P, x, z, ry, R, o) { return __ZC(357, 111, this, arguments, new.target); }
function shkBarrel(P, x, z, R, y) {
var wd = shkS("wood", 0x7A5634);
shkCyl(P, 0.36, 0.32, 0.95, wd, x, (y || 0) + 0.47, z, 10);
[0.15, 0.8].forEach(function (h) { shkCyl(P, 0.37, 0.37, 0.05, shkC(0x3A3A3A), x, (y || 0) + h, z, 10); });
}
function shkCart(P, x, z, ry) { return __ZC(357, 112, this, arguments, new.target); }
function shkWell(P, x, z) { return __ZC(357, 113, this, arguments, new.target); }
function shkPennants(P, x0, z0, x1, z1, y, R) { return __ZC(357, 114, this, arguments, new.target); }
function shkElm(P, x, z, h, seed) { return __ZC(357, 115, this, arguments, new.target); }
function shkFair(P, R) { return __ZC(357, 116, this, arguments, new.target); }
var SHK_BALLAD_PRICE = 4;
function shkBalladOwned(i) { var d = shkData(); return Array.isArray(d.ballads) && d.ballads.indexOf(i) >= 0; }
function shkSongCard(i, sure) { return __ZC(357, 117, this, arguments, new.target); }
function shkBalladSing(i) { return __ZC(357, 118, this, arguments, new.target); }
function shkBalladBuy(i) { return __ZC(357, 119, this, arguments, new.target); }
function shkInsult() { var r = function (a) { return a[Math.floor(Math.random() * a.length)]; }; return "Thou " + r(SHK_INS[0]) + " " + r(SHK_INS[1]) + " " + r(SHK_INS[2]) + "!"; }
function shkInsultCard() { return __ZC(357, 120, this, arguments, new.target); }
function shkNewsCard() { return __ZC(357, 121, this, arguments, new.target); }
function shkQuartoCard() { return __ZC(357, 122, this, arguments, new.target); }
function shkGardenDress(P, R) { return __ZC(357, 123, this, arguments, new.target); }
function shkTiringDress(g, cx, P) { return __ZC(357, 124, this, arguments, new.target); }
function shkHallDress(g, cx, cz, Rm) { return __ZC(357, 125, this, arguments, new.target); }
SHK_FOLK.ballad = { name: "Nick Bottomley, ballad-seller", at: "fair",
persona: "Nick Bottomley, a ballad-seller on Bankside in 1600, with broadsheets pegged on a line and a fine tenor voice. He sings the songs from Master Shakespeare's plays (Under the greenwood tree, It was a lover and his lass, Sigh no more ladies, O mistress mine) and the street ballads of the day (Greensleeves, the ballad of the Spanish Armada). Merry, flattering, always selling; knows which plays are on and which players are drunk. Ages 13 and up.",
greet: "A ballad, a ballad, new printed and true! Sing it once and it's yours for a penny. Shall I give you one from the plays?",
look: { layer: "vest", layerColor: 0x5A3A22, top: 0xE8D8B8, bottom: 0x3A3A2A, hat: "cap", hatColor: 0x2A4A2A, hair: 0x6A4A2A, hairStyle: "curly" } };
SHK_FOLK.orange = { name: "Moll, the orange-wench", at: "fair",
persona: "Moll, an orange-seller outside the Globe in 1600, who sells oranges, nuts and apples to playgoers from a basket and knows every player and half the audience by name. Quick-tongued and good-hearted; she trades Shakespeare's own insults with anyone brave enough (clotpole, canker-blossom, fustilarian) but never with real spite. Ages 13 and up.",
greet: "Oranges! Sweet Seville oranges! A ha'penny each, and I'll throw in a name to call your enemies.",
look: { topKind: "dress", top: 0xC8743A, bottom: 0x5A3A22, bottomKind: "skirt", layer: "apron", layerColor: 0xF0E8D8, hat: "hood", hatColor: 0xF0E8D8, hair: 0xA84A1A, hairStyle: "bun" } };
SHK_FOLK.crier = { name: "The town crier", at: "fair",
persona: "the town crier of Southwark in 1600, in a red coat with a brass bell, who cries the news, the lost-and-found, the Lord Mayor's orders and the plays of the day. Loud, proud, a little pompous, and fond of beginning everything with 'Oyez!'. Knows the news of 1600: Essex in disgrace, the Fortune playhouse being built, Will Kemp's dance to Norwich, the East India charter. Ages 13 and up.",
greet: "Oyez, oyez, oyez! Hear ye the news of London! ...Ah, a listener. What would you know?",
look: { layer: "jacket", layerColor: 0x8A1A1A, top: 0xE8E0D0, bottom: 0x2A2A2A, hat: "cap", hatColor: 0x1A1A1A, hair: 0x8A8A84, hairStyle: "short", shoeKind: "boots" } };
(function () {
if (typeof shkSouth === "function") {
var so = shkSouth;
shkSouth = function (R) { var r = so.apply(this, arguments); try {
shkFair(shkSouthPart(SHK_PLACES.globe.x, SHK_PLACES.globe.z), R);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] fair", e);
} return r; };
}
if (typeof shkSonnetGarden === "function") {
var sg = shkSonnetGarden;
shkSonnetGarden = function (P, R) { var r = sg.apply(this, arguments); try {
shkGardenDress(P, R);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] garden", e);
} return r; };
}
if (typeof SHK_BUILD_ROOM !== "undefined") {
var pl = SHK_BUILD_ROOM.plays;
if (pl)
SHK_BUILD_ROOM.plays = function (g, cx, cz, R, Rm) { var r = pl.apply(this, arguments); try {
shkHallDress(g, cx, cz, Rm);
}
catch (e) {
if (window.console)
console.warn("[shakespeare] hall", e);
} return r; };
}
})();
var SHK_SCENES = {
sh_romeo: ["I.1", "I.1", "I.5", "II.2", "II.3", "II.6", "III.1", "III.5", "IV.1", "V.3"],
sh_hamlet: ["I.1", "I.2", "I.3", "I.5", "II.2", "II.2", "III.1", "III.2", "III.4", "IV.5", "V.1", "V.2"],
sh_macbeth: ["I.1", "I.2", "I.3", "I.5", "II.1", "II.3", "III.4", "IV.1", "V.1", "V.4", "V.5", "V.8"],
sh_dream: ["I.1", "I.2", "II.1", "II.2", "II.2", "III.1", "III.2", "III.2", "IV.1", "V.1", "V.1"],
sh_tempest: ["I.1", "I.2", "I.2", "I.2", "I.2", "II.1", "II.2", "III.3", "IV.1", "IV.1", "V.1"],
sh_caesar: ["I.2", "I.2", "I.3", "II.1", "II.2", "III.1", "III.2", "III.3", "IV.3", "V.3"],
sh_lear: ["I.1", "I.2", "I.4", "III.2", "III.4", "III.7", "IV.6", "IV.7", "V.3", "V.3"],
sh_othello: ["I.1", "I.3", "II.1", "II.3", "III.3", "III.3", "IV.1", "IV.3", "V.2"],
sh_twelfth: ["I.2", "I.1", "I.5", "II.3", "II.5", "III.4", "III.4", "IV.1", "V.1"],
sh_muchado: ["I.1", "II.1", "II.3", "III.1", "III.2", "III.3", "IV.1", "IV.1", "V.4"],
sh_asyou: ["I.2", "I.3", "II.1", "II.7", "II.7", "III.2", "IV.1", "IV.3", "V.4"],
sh_merchant: ["I.1", "I.2", "I.3", "II.7", "III.1", "III.2", "IV.1", "V.1"],
sh_henry: ["Prologue", "I.2", "II.2", "III.1", "III.4", "IV.1", "IV.3", "IV.7", "V.2"],
sh_richard: ["I.1", "I.1", "I.2", "I.3", "III.1", "IV.2", "V.3", "V.4"],
sh_winter: ["I.2", "II.3", "III.2", "III.3", "IV.1", "IV.4", "IV.4", "V.2", "V.3"],
sh_antony: ["I.1", "II.2", "II.3", "II.5", "III.10", "IV.6", "IV.14", "V.2"]
};
var SHK_ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12, XIII: 13, XIV: 14, XV: 15, XVI: 16 };
function shkRoman(s) { s = String(s || "").toUpperCase(); if (/^\d+$/.test(s))
return +s; if (SHK_ROMAN[s])
return SHK_ROMAN[s]; return 0; }
function shkScenePart(w, want) { return __ZC(357, 126, this, arguments, new.target); }
function shkReadChapter(id, k) {
var title = (CTS && CTS.T && CTS.T.id === id) ? CTS.T.t : id, sc = (SHK_SCENES[id] || [])[k];
if (!sc) {
shkFolio(title);
return;
}
shkfIndex().then(function () { var w = shkfMatch(title); shkFolio(title, w ? shkScenePart(w, sc) : null); }).catch(function () { shkFolio(title); });
}
function shkSceneName(id, k) { var sc = (SHK_SCENES[id] || [])[k]; if (!sc)
return ""; if (/^prologue$/i.test(sc))
return "the Prologue"; var a = sc.split("."); return "Act " + a[0] + ", Scene " + a[1]; }
(function () {
if (typeof ctsChapter !== "function")
return;
function withExtra(run, extraHtml, extraFns) {
var wc = worldCard;
worldCard = function (h, f) { if (h != null && typeof h === "string") {
h += extraHtml;
f = f || {};
for (var q in extraFns)
f[q] = extraFns[q];
} return wc(h, f); };
try {
return run();
}
finally {
worldCard = wc;
}
}
var oCh = ctsChapter;
ctsChapter = function (k) {
var id = CTS && CTS.T && CTS.T.id;
if (!id || !SHK_SCENES[id])
return oCh(k);
return withExtra(function () { return oCh(k); }, worldBtn("shkscene", "📜 Read this scene in Shakespeare's words", shkSceneName(id, k) + ", the full text from the First Folio"), { shkscene: function () { shkReadChapter(id, k); } });
};
var oDone = ctsChapterDone;
ctsChapterDone = function (k) {
var id = CTS && CTS.T && CTS.T.id;
if (!id || !SHK_SCENES[id])
return oDone(k);
return withExtra(function () { return oDone(k); }, worldBtn("shkscene", "📜 Read the scene you just played", shkSceneName(id, k)), { shkscene: function () { shkReadChapter(id, k); } });
};
var oMenu = ctsMenu;
ctsMenu = function () {
var id = CTS && CTS.T && CTS.T.id;
if (!id || !SHK_SCENES[id])
return oMenu();
var k = Math.min(CTS.prog || 0, (CTS.W.ch.length || 1) - 1);
return withExtra(function () { return oMenu(); }, worldBtn("shkplay", "📖 Read the whole play", "The complete, unabridged text, opened at " + shkSceneName(id, k)) +
worldBtn("shkall", "📚 The complete works", "All of Shakespeare: every play, the sonnets and the poems"), { shkplay: function () { shkReadChapter(id, k); }, shkall: function () { shkFolio(); } });
};
})();
var SHK_ACT = {};
SHK_ACT.sh_romeo = [
[["Sampson", "Do you bite your thumb at us, sir?", "A servant picks a fight with a rude gesture, and the families' men draw swords."],
["Benvolio", "Part, fools! Put up your swords; you know not what you do.", "Romeo's cousin tries to stop the fight."],
["Tybalt", "What, drawn, and talk of peace? I hate the word, as I hate hell, all Montagues, and thee.", "Juliet's cousin wants the fight, not peace."],
["Prince", "If ever you disturb our streets again, your lives shall pay the forfeit of the peace.", "The Prince warns them: fight again in the streets and you die."]],
[["Benvolio", "What sadness lengthens Romeo's hours?", "Why are you so gloomy, cousin?"],
["Romeo", "Out of her favour where I am in love.", "The girl I love, Rosaline, does not love me back."],
["Benvolio", "Examine other beauties.", "Look at other girls and you'll forget her."]],
[["Romeo", "O, she doth teach the torches to burn bright!", "Seeing Juliet, Romeo thinks she is brighter than the lights."],
["Romeo", "Did my heart love till now? Forswear it, sight! For I ne'er saw true beauty till this night.", "He forgets Rosaline at once: this is real love."],
["Tybalt", "This, by his voice, should be a Montague.", "Tybalt knows his voice under the mask and is furious."],
["Juliet", "My only love sprung from my only hate!", "She learns he is a Montague, her family's enemy."]],
[["Romeo", "But soft, what light through yonder window breaks? It is the east, and Juliet is the sun.", "He sees Juliet at her window and she is the sunrise to him."],
["Juliet", "O Romeo, Romeo, wherefore art thou Romeo?", "Why do you have to be Romeo, a Montague?"],
["Juliet", "What's in a name? That which we call a rose by any other name would smell as sweet.", "A name is only a word; it doesn't change who you are."],
["Juliet", "Good night, good night! Parting is such sweet sorrow.", "Saying goodnight is sad and lovely at once; they will marry."]],
[["Friar Laurence", "Holy Saint Francis! What a change is here!", "The Friar is amazed Romeo has forgotten Rosaline so fast."],
["Romeo", "I pray thee chide me not. Her I love now doth grace for grace and love for love allow.", "Don't scold me: this girl loves me back."],
["Friar Laurence", "Wisely and slow; they stumble that run fast.", "Go carefully: people who rush fall over."]],
[["Friar Laurence", "These violent delights have violent ends.", "Love this wild can end badly."],
["Friar Laurence", "Come, come with me, and we will make short work.", "Come with me, I'll marry you quickly."]],
[["Tybalt", "Romeo, the love I bear thee can afford no better term than this: thou art a villain.", "Tybalt insults Romeo to start a duel."],
["Mercutio", "A plague o' both your houses!", "Dying, Mercutio curses both families for their feud."],
["Mercutio", "Ask for me tomorrow, and you shall find me a grave man.", "He jokes even as he dies: tomorrow he'll be in a grave."],
["Romeo", "O, I am fortune's fool!", "Romeo kills Tybalt and sees that luck has made a fool of him."]],
[["Juliet", "Wilt thou be gone? It is not yet near day. It was the nightingale, and not the lark.", "Don't go yet, that was a night bird, not the morning bird."],
["Romeo", "I must be gone and live, or stay and die.", "If I stay, I'll be caught and killed."],
["Juliet", "O God, I have an ill-divining soul!", "Juliet feels something terrible is coming."]],
[["Juliet", "O, bid me leap, rather than marry Paris, from off the battlements of yonder tower.", "She would rather do anything than marry Paris."],
["Friar Laurence", "Take thou this vial, being then in bed, and this distilled liquor drink thou off.", "Drink this tonight in bed."],
["Friar Laurence", "Thou shalt continue two and forty hours, and then awake as from a pleasant sleep.", "You'll seem dead for 42 hours, then wake up."]],
[["Romeo", "Eyes, look your last! Arms, take your last embrace!", "Thinking Juliet is dead, Romeo says goodbye."],
["Romeo", "Thus with a kiss I die.", "He drinks the poison and dies beside her."],
["Juliet", "Yea, noise? Then I'll be brief. O happy dagger.", "She wakes, finds him dead, and stabs herself."],
["Prince", "For never was a story of more woe than this of Juliet and her Romeo.", "There was never a sadder story; the families make peace."]]
];
SHK_ACT.sh_hamlet = [
[["Bernardo", "Who's there?", "A nervous guard calls out in the cold dark."],
["Marcellus", "Peace, break thee off; look where it comes again!", "Quiet! The ghost is back."],
["Horatio", "It harrows me with fear and wonder.", "Hamlet's friend sees it: it looks like the dead King."],
["Marcellus", "Something is rotten in the state of Denmark.", "Something is badly wrong in this country."]],
[["Claudius", "Though yet of Hamlet our dear brother's death the memory be green...", "The new King speaks of his brother's recent death, and his own wedding."],
["Hamlet", "A little more than kin, and less than kind.", "Hamlet mutters: you're family now, but no friend."],
["Hamlet", "O, that this too too solid flesh would melt...", "Alone, Hamlet wishes he could just disappear."],
["Hamlet", "Frailty, thy name is woman!", "He is bitter that his mother remarried within a month."]],
[["Polonius", "Give every man thine ear, but few thy voice.", "Listen to everyone, but say little."],
["Polonius", "Neither a borrower nor a lender be.", "Don't borrow money and don't lend it."],
["Polonius", "This above all: to thine own self be true.", "Most of all, be honest with yourself."]],
[["Ghost", "I am thy father's spirit.", "The ghost says it is Hamlet's dead father."],
["Ghost", "Revenge his foul and most unnatural murder.", "I was murdered: take revenge."],
["Ghost", "The serpent that did sting thy father's life now wears his crown.", "The killer is Claudius, who is now King."],
["Hamlet", "The time is out of joint. O cursed spite, that ever I was born to set it right!", "Everything is broken, and it's my job to fix it."]],
[["Polonius", "What do you read, my lord?", "Polonius tests whether Hamlet is mad."],
["Hamlet", "Words, words, words.", "Hamlet mocks him with a silly answer."],
["Polonius", "Though this be madness, yet there is a method in't.", "He's mad, but his answers make a strange sense."],
["Hamlet", "What a piece of work is man!", "Hamlet tells his old friends how sad and lost he feels."]],
[["Hamlet", "You are welcome, masters, welcome all.", "Hamlet greets the travelling actors warmly."],
["Hamlet", "The play's the thing wherein I'll catch the conscience of the King.", "He will have a play staged that shows the murder, and watch Claudius's face."]],
[["Hamlet", "To be, or not to be, that is the question.", "Is it better to live, or to die?"],
["Hamlet", "To die, to sleep; to sleep, perchance to dream; ay, there's the rub.", "Death might be like sleep, but what dreams might come? That is the problem."],
["Hamlet", "Get thee to a nunnery.", "He turns on Ophelia cruelly, knowing they are watched."]],
[["Hamlet", "Speak the speech, I pray you, as I pronounced it to you, trippingly on the tongue.", "Hamlet tells the actors to speak naturally."],
["Queen", "The lady protests too much, methinks.", "The Queen thinks the player queen promises too much."],
["Claudius", "Give me some light. Away!", "The King jumps up and storms out: he is guilty."]],
[["Queen", "What wilt thou do? Thou wilt not murder me? Help, help, ho!", "The Queen is frightened and cries out."],
["Hamlet", "How now? A rat?", "Hamlet stabs through the curtain at the hidden listener."],
["Hamlet", "Thou wretched, rash, intruding fool, farewell!", "It was Polonius, and he is dead."]],
[["Ophelia", "There's rosemary, that's for remembrance.", "Ophelia, lost in grief, hands out flowers with meanings."],
["Ophelia", "And there is pansies, that's for thoughts.", "Pansies stand for thoughts."],
["Claudius", "When sorrows come, they come not single spies, but in battalions.", "Troubles never come one at a time, but all together."]],
[["Gravedigger", "What is he that builds stronger than either the mason, the shipwright, or the carpenter?", "The gravedigger tells riddles as he digs."],
["Hamlet", "Alas, poor Yorick! I knew him, Horatio.", "He holds the skull of the jester he loved as a child."],
["Hamlet", "Sweets to the sweet, farewell!", "At Ophelia's funeral, the Queen scatters flowers."]],
[["Hamlet", "There's a divinity that shapes our ends.", "God shapes what happens to us in the end."],
["Queen", "The drink, the drink! I am poison'd.", "The Queen drinks the poisoned cup meant for Hamlet."],
["Hamlet", "The rest is silence.", "Hamlet dies, his revenge done."],
["Horatio", "Good night, sweet prince, and flights of angels sing thee to thy rest!", "His friend says goodbye."]]
];
SHK_ACT.sh_macbeth = [
[["First Witch", "When shall we three meet again in thunder, lightning, or in rain?", "Three witches plan to meet again."],
["Second Witch", "When the hurlyburly's done, when the battle's lost and won.", "When the battle is over."],
["All", "Fair is foul, and foul is fair.", "Good is bad and bad is good: nothing is what it seems."]],
[["Duncan", "What bloody man is that?", "The King sees a wounded soldier with news."],
["Captain", "For brave Macbeth, well he deserves that name.", "Macbeth fought bravely and won."],
["Duncan", "What he hath lost, noble Macbeth hath won.", "The traitor's title, Thane of Cawdor, goes to Macbeth."]],
[["Macbeth", "So foul and fair a day I have not seen.", "A strange day: terrible weather, and a great win."],
["Third Witch", "All hail, Macbeth, that shalt be King hereafter!", "The witches tell him he will be King."],
["Banquo", "Thou shalt get kings, though thou be none.", "Banquo's children will be kings."]],
[["Lady Macbeth", "Yet do I fear thy nature; It is too full o' the milk of human kindness.", "She fears her husband is too kind to kill for the crown."],
["Lady Macbeth", "Come, you spirits that tend on mortal thoughts, unsex me here.", "She asks dark spirits to take away all her gentleness."],
["Lady Macbeth", "Look like the innocent flower, but be the serpent under it.", "Look innocent, but be ready to strike."]],
[["Macbeth", "Is this a dagger which I see before me, the handle toward my hand?", "Alone at night, he sees a dagger in the air."],
["Macbeth", "I go, and it is done; the bell invites me.", "The bell rings: he goes to kill the King."],
["Macbeth", "Hear it not, Duncan, for it is a knell that summons thee to heaven or to hell.", "Don't hear it, Duncan: it's your death bell."]],
[["Porter", "Knock, knock, knock! Who's there, i' the name of Belzebub?", "A drunk porter pretends he guards the gate of hell."],
["Macduff", "O horror, horror, horror!", "Macduff finds the King murdered."],
["Macduff", "Most sacrilegious murther hath broke ope the Lord's anointed temple.", "Someone has killed the holy King."]],
[["Macbeth", "Thou canst not say I did it. Never shake thy gory locks at me.", "He sees Banquo's ghost in his chair at the feast."],
["Lady Macbeth", "Sit, worthy friends. My lord is often thus.", "She covers for him: he's often like this."],
["Macbeth", "will have blood; they say blood will have blood.", "Murder leads to more murder."]],
[["Witches", "Double, double toil and trouble; fire burn and cauldron bubble.", "The witches stir their cauldron."],
["Apparition", "Beware Macduff!", "The first vision warns him about Macduff."],
["Apparition", "None of woman born shall harm Macbeth.", "No man born of a woman can hurt you."],
["Apparition", "Macbeth shall never vanquish'd be until great Birnam Wood to high Dunsinane Hill shall come.", "You're safe until the forest walks to your castle."]],
[["Gentlewoman", "Lo you, here she comes!", "Lady Macbeth walks in her sleep with a candle."],
["Lady Macbeth", "Out, damned spot! Out, I say!", "She keeps washing blood from her hands that isn't there."],
["Lady Macbeth", "All the perfumes of Arabia will not sweeten this little hand.", "Nothing can clean away her guilt."]],
[["Malcolm", "Let every soldier hew him down a bough and bear't before him.", "Each soldier carries a branch to hide how many they are."],
["Messenger", "I look'd toward Birnam, and anon methought the wood began to move.", "The forest seems to be walking toward the castle."]],
[["Seyton", "The Queen, my lord, is dead.", "His wife is dead."],
["Macbeth", "Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day.", "Life just crawls on, day after day."],
["Macbeth", "Life's but a walking shadow, a poor player that struts and frets his hour upon the stage.", "Life is like a bad actor, on stage for an hour then gone."],
["Macbeth", "It is a tale told by an idiot, full of sound and fury, signifying nothing.", "It means nothing at all."]],
[["Macbeth", "I bear a charmed life, which must not yield to one of woman born.", "No man born of woman can kill me."],
["Macduff", "Macduff was from his mother's womb untimely ripp'd.", "Macduff was born by surgery, not in the usual way."],
["Macbeth", "Lay on, Macduff, and damn'd be him that first cries 'Hold, enough!'", "Macbeth fights on to the end, and is killed."]]
];
SHK_ACT.sh_dream = [
[["Egeus", "Full of vexation come I, with complaint against my child, my daughter Hermia.", "An angry father complains his daughter won't obey."],
["Theseus", "Either to die the death, or to abjure for ever the society of men.", "Marry who your father says, or die, or become a nun."],
["Lysander", "The course of true love never did run smooth.", "True love always has trouble."]],
[["Quince", "Is all our company here?", "The workmen meet to put on a play for the Duke's wedding."],
["Bottom", "Let me play the lion too.", "Bottom wants every part in the play."],
["Quince", "You can play no part but Pyramus.", "You'll play the hero, Pyramus, and that's all."]],
[["Oberon", "Ill met by moonlight, proud Titania.", "The Fairy King and Queen meet and quarrel."],
["Oberon", "I know a bank where the wild thyme blows.", "Oberon knows where Titania sleeps among flowers."],
["Puck", "I'll put a girdle round about the earth in forty minutes.", "Puck can fly round the world in forty minutes."]],
[["Oberon", "What thou seest when thou dost wake, do it for thy true love take.", "Love whatever you see first when you wake."],
["Oberon", "Anoint his eyes; but do it when the next thing he espies may be the lady.", "Put the love juice on the young Athenian's eyes."]],
[["Puck", "Night and silence! Who is here? Weeds of Athens he doth wear.", "Puck finds a sleeping Athenian, the wrong one."],
["Lysander", "And run through fire I will for thy sweet sake.", "Lysander wakes and falls for Helena instead of Hermia."],
["Helena", "O, I am out of breath in this fond chase!", "Helena is confused and hurt."]],
[["Puck", "What hempen homespuns have we swagg'ring here?", "Puck finds the clumsy workmen rehearsing in the wood."],
["Quince", "O monstrous! O strange! We are haunted.", "Bottom has a donkey's head and his friends run."],
["Titania", "What angel wakes me from my flow'ry bed?", "Titania wakes, and falls in love with the donkey-headed Bottom."]],
[["Puck", "Lord, what fools these mortals be!", "People are so silly in love."],
["Hermia", "How low am I? I am not yet so low but that my nails can reach unto thine eyes.", "Short Hermia is furious with tall Helena."],
["Helena", "Though she be but little, she is fierce.", "She's small, but she's fierce."]],
[["Oberon", "Thou seest these lovers seek a place to fight.", "The young men want to duel."],
["Puck", "Up and down, up and down, I will lead them up and down.", "Puck leads them round in the fog till they fall asleep."],
["Puck", "Jack shall have Jill; nought shall go ill.", "Everyone will end up with the right partner."]],
[["Oberon", "Be as thou wast wont to be; see as thou was wont to see.", "Oberon lifts the spell from Titania."],
["Titania", "My Oberon, what visions have I seen!", "She wakes: what a dream!"],
["Bottom", "I have had a most rare vision. I have had a dream, past the wit of man to say what dream it was.", "Bottom wakes with his own head, amazed by his dream."]],
[["Prologue", "This man is Pyramus, if you would know.", "The workmen's play begins, very badly."],
["Wall", "This loam, this rough-cast, and this stone, doth show that I am that same wall.", "A man plays a wall, with his fingers as the crack."],
["Bottom", "Now die, die, die, die, die.", "Bottom dies very slowly and loudly as Pyramus."]],
[["Oberon", "Through the house give glimmering light.", "The fairies bless the house and the new marriages."],
["Puck", "If we shadows have offended, think but this, and all is mended, that you have but slumb'red here while these visions did appear.", "If you didn't like it, just think it was a dream."]]
];
SHK_ACT.sh_tempest = [
[["Master", "Boatswain!", "The ship's captain calls in the storm."],
["Boatswain", "What cares these roarers for the name of king?", "The waves don't care that there's a king on board."],
["Gonzalo", "Now would I give a thousand furlongs of sea for an acre of barren ground.", "I'd swap all this sea for any bit of dry land."]],
[["Miranda", "If by your art, my dearest father, you have put the wild waters in this roar, allay them.", "If your magic made this storm, please stop it."],
["Prospero", "I have done nothing but in care of thee.", "Everything I've done was to look after you."],
["Prospero", "Thy father was the Duke of Milan, and a prince of power.", "I was the Duke of Milan before my brother stole my throne."]],
[["Ariel", "All hail, great master! Grave sir, hail!", "Ariel the spirit arrives to report."],
["Ariel", "I flam'd amazement.", "I flew through the ship as fire and terrified them."],
["Ariel", "Not a hair perish'd.", "Everyone is safe, not a hair harmed."],
["Prospero", "Thou shalt be as free as mountain winds.", "I'll set you free soon, I promise."]],
[["Caliban", "This island's mine, by Sycorax my mother, which thou tak'st from me.", "The island was mine and you took it."],
["Caliban", "You taught me language, and my profit on't is, I know how to curse.", "All I got from learning your language is how to curse you."]],
[["Ferdinand", "Where should this music be? I' th' air or th' earth?", "Ferdinand follows strange music across the island."],
["Ariel", "Full fathom five thy father lies; of his bones are coral made.", "Ariel sings that Ferdinand's father has drowned and turned to coral."],
["Miranda", "I might call him a thing divine; for nothing natural I ever saw so noble.", "Miranda has never seen a young man and thinks he's divine."],
["Prospero", "They are both in either's pow'rs.", "They've fallen in love at first sight."]],
[["Gonzalo", "Had I plantation of this isle, my lord...", "Old Gonzalo dreams of the perfect country he'd make here."],
["Antonio", "My strong imagination sees a crown dropping upon thy head.", "Antonio tempts the King's brother to murder and take the crown."],
["Ariel", "While you here do snoring lie, open-ey'd conspiracy his time doth take.", "Ariel wakes Gonzalo just in time."]],
[["Trinculo", "Misery acquaints a man with strange bedfellows.", "Hard times make you share a bed with odd company."],
["Stephano", "This is a very scurvy tune to sing at a man's funeral.", "The drunk butler sings as he wanders."],
["Caliban", "I'll show thee the best springs; I'll pluck thee berries.", "Caliban takes the drunk as his new master."]],
[["Gonzalo", "Marvellous sweet music!", "Strange music and a feast appear."],
["Ariel", "You are three men of sin.", "Ariel, as a harpy, accuses the three who wronged Prospero."],
["Alonso", "O, it is monstrous, monstrous!", "The King is horrified at his guilt."]],
[["Iris", "You nymphs, call'd Naiads, of the wind'ring brooks...", "Spirits play goddesses to bless the young couple."],
["Prospero", "Our revels now are ended.", "The show is over."],
["Prospero", "We are such stuff as dreams are made on, and our little life is rounded with a sleep.", "We are made of dreams, and our lives end in sleep."]],
[["Ariel", "I told you, sir, they were red-hot with drinking.", "The drunk plotters are coming."],
["Trinculo", "O King Stephano! O peer! O worthy Stephano, look what a wardrobe here is for thee!", "They forget the plot and grab fancy clothes."],
["Caliban", "Let it alone, thou fool; it is but trash.", "Caliban begs them to leave it."]],
[["Prospero", "The rarer action is in virtue than in vengeance.", "It is nobler to forgive than to take revenge."],
["Prospero", "I'll break my staff, bury it certain fathoms in the earth, and deeper than did ever plummet sound I'll drown my book.", "He gives up his magic for ever."],
["Miranda", "O brave new world, that has such people in't!", "Miranda sees all the people and is amazed."],
["Prospero", "As you from crimes would pardon'd be, let your indulgence set me free.", "He asks the audience to forgive him and set him free with applause."]]
];
SHK_ACT.sh_caesar = [
[["Soothsayer", "Beware the Ides of March.", "A fortune-teller warns Caesar to beware the 15th of March."],
["Caesar", "He is a dreamer; let us leave him. Pass.", "Caesar ignores the warning."]],
[["Cassius", "Why, man, he doth bestride the narrow world like a Colossus.", "Caesar stands over the world like a giant statue."],
["Cassius", "The fault, dear Brutus, is not in our stars, but in ourselves, that we are underlings.", "It's our own fault, not fate, that we are under him."],
["Caesar", "Yond Cassius has a lean and hungry look; he thinks too much: such men are dangerous.", "Caesar doesn't trust Cassius."]],
[["Casca", "Against the Capitol I met a lion.", "Strange things are seen in the stormy night."],
["Cicero", "Men may construe things after their fashion.", "People read whatever they like into signs."],
["Cassius", "Three parts of him is ours already, and the man entire upon the next encounter yields him ours.", "We nearly have Brutus on our side."]],
[["Brutus", "It must be by his death.", "Brutus decides Caesar must die."],
["Brutus", "Let us be sacrificers, but not butchers, Caius.", "Let's kill for Rome, not like murderers."],
["Portia", "Dwell I but in the suburbs of your good pleasure?", "His wife asks why he keeps secrets from her."]],
[["Calpurnia", "When beggars die, there are no comets seen.", "Signs in the sky mean a great man will die."],
["Caesar", "Cowards die many times before their deaths; the valiant never taste of death but once.", "Brave men die only once; cowards die in fear all the time."],
["Decius", "This dream is all amiss interpreted.", "A plotter twists her dream so Caesar goes."]],
[["Caesar", "The Ides of March are come.", "Caesar mocks the warning."],
["Soothsayer", "Ay, Caesar; but not gone.", "The day isn't over yet."],
["Caesar", "Et tu, Brute? Then fall, Caesar!", "You too, Brutus? Then let me die."],
["Antony", "Cry havoc and let slip the dogs of war.", "Alone with the body, Antony swears war."]],
[["Brutus", "Not that I loved Caesar less, but that I loved Rome more.", "I loved Rome more than Caesar."],
["Antony", "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him.", "Listen to me: I'm only here to bury him."],
["Antony", "And Brutus is an honourable man.", "He repeats it until it sounds like a lie."],
["Antony", "This was the most unkindest cut of all.", "Brutus's stab, from a friend, was the cruelest."]],
[["Cinna", "I am Cinna the poet, I am Cinna the poet.", "The angry mob grabs the wrong man."],
["Plebeian", "Tear him for his bad verses.", "They kill him anyway: the mob is out of control."]],
[["Brutus", "You have done that you should be sorry for.", "Brutus and Cassius argue bitterly."],
["Brutus", "Portia is dead.", "Brutus tells Cassius his wife has died."],
["Brutus", "There is a tide in the affairs of men which, taken at the flood, leads on to fortune.", "Act now while the chance is here."],
["Ghost", "Thou shalt see me at Philippi.", "Caesar's ghost appears to Brutus."]],
[["Cassius", "Caesar, thou art reveng'd, even with the sword that kill'd thee.", "Cassius dies by the same sword."],
["Brutus", "O Julius Caesar, thou art mighty yet!", "Caesar's spirit is still winning."],
["Antony", "This was the noblest Roman of them all.", "Antony praises dead Brutus as the best of them."]]
];
SHK_ACT.sh_lear = [
[["Lear", "Which of you shall we say doth love us most?", "Lear asks his daughters to say who loves him most."],
["Cordelia", "Nothing, my lord.", "Cordelia won't flatter him."],
["Lear", "Nothing will come of nothing. Speak again.", "Say nothing and you'll get nothing."],
["Kent", "See better, Lear.", "His loyal friend warns him he is blind to the truth."]],
[["Edmund", "Thou, Nature, art my goddess.", "Edmund, born outside marriage, will follow only his own will."],
["Edmund", "Now, gods, stand up for bastards!", "He plots to steal his brother's lands."],
["Gloucester", "These late eclipses in the sun and moon portend no good to us.", "Gloucester blames the stars."]],
[["Lear", "Doth any here know me? This is not Lear.", "Lear can't believe how Goneril treats him."],
["Lear", "How sharper than a serpent's tooth it is to have a thankless child!", "An ungrateful child hurts more than a snakebite."],
["Fool", "Thou shouldst not have been old till thou hadst been wise.", "You got old before you got wise."]],
[["Lear", "Blow, winds, and crack your cheeks! Rage! Blow!", "Lear shouts at the storm."],
["Lear", "I am a man more sinn'd against than sinning.", "Others have wronged me more than I've wronged them."],
["Fool", "Here's a night pities neither wise men nor fools.", "This storm pities no one."]],
[["Edgar", "Poor Tom's a-cold.", "Edgar, disguised as a mad beggar, shivers."],
["Lear", "O, I have ta'en too little care of this!", "Lear realises he never cared for the poor."],
["Lear", "Unaccommodated man is no more but such a poor, bare, forked animal as thou art.", "Without clothes and comfort, a man is just a poor animal."]],
[["Cornwall", "Out, vile jelly!", "Cornwall blinds Gloucester."],
["Gloucester", "As flies to wanton boys are we to the gods; they kill us for their sport.", "The gods hurt us for fun, like boys killing flies."]],
[["Edgar", "Come on, sir; here's the place.", "Edgar pretends they are at the cliff edge."],
["Lear", "Ay, every inch a king.", "Mad Lear, crowned with flowers, still feels a king."],
["Lear", "When we are born, we cry that we are come to this great stage of fools.", "Babies cry because they've arrived in a world of fools."]],
[["Lear", "Pray, do not mock me. I am a very foolish fond old man.", "Lear wakes and is humble at last."],
["Lear", "I think this lady to be my child Cordelia.", "He knows his daughter."],
["Cordelia", "No cause, no cause.", "She forgives him freely."]],
[["Lear", "Come, let's away to prison; we two alone will sing like birds i' the cage.", "Lear is happy just to be with Cordelia."],
["Edgar", "The gods are just.", "Edgar beats his wicked brother."],
["Edmund", "The wheel is come full circle.", "Edmund admits his fate has turned."]],
[["Lear", "Howl, howl, howl, howl!", "Lear carries in dead Cordelia."],
["Lear", "Thou'lt come no more, never, never, never, never, never!", "She will never come back."],
["Edgar", "The weight of this sad time we must obey; speak what we feel, not what we ought to say.", "We must say what we truly feel."]]
];
SHK_ACT.sh_othello = [
[["Iago", "I follow him to serve my turn upon him.", "Iago pretends to serve Othello only to harm him."],
["Iago", "I am not what I am.", "I'm not what I seem."],
["Brabantio", "What is the reason of this terrible summons?", "The senator is woken with news his daughter ran off."]],
[["Othello", "Rude am I in my speech.", "I'm a plain-spoken soldier."],
["Othello", "She loved me for the dangers I had pass'd, and I loved her that she did pity them.", "She loved my stories of danger; I loved her for caring."],
["Desdemona", "I do perceive here a divided duty.", "I owe my father, but now I owe my husband."]],
[["Othello", "O my fair warrior!", "Othello lands and greets Desdemona."],
["Othello", "If it were now to die, 'twere now to be most happy.", "I'm so happy I could die now."],
["Iago", "With as little a web as this will I ensnare as great a fly as Cassio.", "Iago plans to trap Cassio."]],
[["Cassio", "I have very poor and unhappy brains for drinking.", "Cassio can't hold his drink."],
["Cassio", "Reputation, reputation, reputation! O, I have lost my reputation!", "Disgraced, Cassio mourns his good name."],
["Iago", "And what's he then that says I play the villain?", "Who could call my advice wicked?"]],
[["Iago", "Ha! I like not that.", "Iago plants a first doubt."],
["Iago", "O, beware, my lord, of jealousy; it is the green-eyed monster.", "Beware of jealousy, a monster with green eyes."],
["Othello", "Farewell the tranquil mind! Farewell content!", "His peace of mind is gone."]],
[["Emilia", "I am glad I have found this napkin.", "Emilia picks up the dropped handkerchief."],
["Iago", "Trifles light as air are to the jealous confirmations strong as proofs of holy writ.", "To a jealous man, tiny things seem like proof."],
["Othello", "Villain, be sure thou prove my love a whore.", "Prove it, or else."]],
[["Othello", "Handkerchief, confessions, handkerchief!", "Othello raves and falls in a fit."],
["Iago", "Work on, my medicine, work!", "Iago's poison of lies is working."],
["Othello", "The pity of it, Iago! O Iago, the pity of it, Iago!", "Othello breaks down."]],
[["Desdemona", "The poor soul sat sighing by a sycamore tree, sing all a green willow.", "Desdemona sings a sad old song."],
["Emilia", "Let husbands know their wives have sense like them.", "Wives feel and think just like husbands."]],
[["Othello", "Put out the light, and then put out the light.", "He blows out the candle, then means to kill her."],
["Emilia", "Thou hast done a deed.", "Emilia accuses him."],
["Othello", "Then must you speak of one that loved not wisely but too well.", "Remember me as a man who loved too much."]]
];
SHK_ACT.sh_twelfth = [
[["Viola", "What country, friends, is this?", "Shipwrecked Viola asks where she is."],
["Captain", "This is Illyria, lady.", "They're in Illyria."],
["Viola", "Conceal me what I am.", "Help me disguise myself as a boy."]],
[["Orsino", "If music be the food of love, play on.", "If music feeds love, give me more."],
["Orsino", "Enough, no more; 'tis not so sweet now as it was before.", "Stop: it isn't sweet any more."]],
[["Viola", "Make me a willow cabin at your gate.", "Viola, as Cesario, speaks for Orsino so well Olivia falls for her."],
["Olivia", "Even so quickly may one catch the plague?", "Can you fall in love that fast?"],
["Olivia", "Ourselves we do not owe.", "We can't control our own hearts."]],
[["Sir Toby", "Dost thou think, because thou art virtuous, there shall be no more cakes and ale?", "Just because you're strict, must there be no fun?"],
["Malvolio", "My masters, are you mad?", "The steward scolds them for the noise."],
["Maria", "I will drop in his way some obscure epistles of love.", "Maria plans a forged love letter."]],
[["Malvolio", "Some are born great, some achieve greatness, and some have greatness thrust upon 'em.", "Malvolio reads the forged letter and believes it."],
["Malvolio", "I will be proud, I will read politic authors.", "He imagines being a lord."],
["Sir Toby", "Here's an overweening rogue!", "Toby, hiding, can barely keep quiet."]],
[["Malvolio", "Sweet lady, ho, ho!", "He comes in yellow stockings, grinning."],
["Olivia", "Why, this is very midsummer madness.", "He must be mad."],
["Fabian", "If this were play'd upon a stage now, I could condemn it as an improbable fiction.", "No one would believe this in a play."]],
[["Viola", "A little thing would make me tell them how much I lack of a man.", "Viola is scared to fight."],
["Antonio", "Put up your sword.", "A stranger steps in to defend her."]],
[["Sebastian", "Are all the people mad?", "Sebastian is greeted by people who think he's someone else."],
["Olivia", "Would thou'dst be rul'd by me!", "Olivia asks him to marry her."],
["Sebastian", "If it be thus to dream, still let me sleep!", "If this is a dream, let me keep dreaming."]],
[["Orsino", "One face, one voice, one habit, and two persons!", "Seeing the twins together, Orsino is stunned."],
["Malvolio", "I'll be reveng'd on the whole pack of you.", "Malvolio storms off."],
["Feste", "For the rain it raineth every day.", "Feste sings the play to an end."]]
];
SHK_ACT.sh_muchado = [
[["Beatrice", "I wonder that you will still be talking, Signior Benedick; nobody marks you.", "Beatrice teases Benedick."],
["Benedick", "What, my dear Lady Disdain! Are you yet living?", "He teases her right back."],
["Claudio", "In mine eye she is the sweetest lady that ever I looked on.", "Claudio has fallen for Hero."]],
[["Beatrice", "He is the Prince's jester, a very dull fool.", "Masked, she insults Benedick to his face."],
["Benedick", "She speaks poniards, and every word stabs.", "Her words are like daggers."],
["Don Pedro", "I will assume thy part in some disguise.", "The Prince will woo Hero, masked, for Claudio."]],
[["Balthasar", "Sigh no more, ladies, sigh no more, men were deceivers ever.", "A song: men always deceive."],
["Don Pedro", "Come hither, Leonato. What was it you told me of today, that your niece Beatrice was in love with Signior Benedick?", "They talk loudly so hidden Benedick hears."],
["Benedick", "The world must be peopled.", "Benedick decides he can marry after all."]],
[["Hero", "Nature never fram'd a woman's heart of prouder stuff than that of Beatrice.", "Hero says, so Beatrice hears, that she's too proud."],
["Beatrice", "Contempt, farewell! And maiden pride, adieu!", "Beatrice gives up her scorn."],
["Beatrice", "Benedick, love on; I will requite thee.", "I'll love you back."]],
[["Don John", "The lady is disloyal.", "Don John lies that Hero is unfaithful."],
["Claudio", "If I see anything tonight why I should not marry her tomorrow, in the congregation, where I should wed, there will I shame her.", "If it's true, I'll shame her at the wedding."]],
[["Dogberry", "Are you good men and true?", "The silly constable gives orders to the watch."],
["Dogberry", "Comparisons are odorous.", "He mixes up his words."],
["Watchman", "We charge you in the Prince's name, stand!", "The watch catch the villains by luck."]],
[["Claudio", "Give not this rotten orange to your friend.", "Claudio rejects Hero at the altar."],
["Hero", "Is my lord well, that he doth speak so wide?", "Hero can't understand."],
["Friar", "Let her awhile be secretly kept in, and publish it that she is dead indeed.", "Say she has died, and wait."]],
[["Benedick", "I do love nothing in the world so well as you.", "Benedick confesses his love."],
["Beatrice", "Kill Claudio.", "She wants him to fight for Hero."],
["Beatrice", "O God, that I were a man! I would eat his heart in the market-place.", "She is furious for her cousin."]],
[["Hero", "One Hero died defil'd, but I do live.", "Hero unveils: she is alive."],
["Benedick", "Peace! I will stop your mouth.", "He kisses Beatrice to end the argument."],
["Benedick", "Strike up, pipers!", "Let the dancing begin."]]
];
SHK_ACT.sh_asyou = [
[["Celia", "Sweet my coz, be merry.", "Celia cheers Rosalind up."],
["Rosalind", "Sir, you have wrestled well, and overthrown more than your enemies.", "Rosalind tells Orlando he has won her heart too."],
["Orlando", "What passion hangs these weights upon my tongue?", "He's too in love to speak."]],
[["Duke Frederick", "Within these ten days if that thou beest found so near our public court as twenty miles, thou diest for it.", "The Duke banishes Rosalind."],
["Celia", "Shall we be sund'red? Shall we part, sweet girl? No.", "Celia won't let her go alone."],
["Rosalind", "Now go we in content to liberty, and not to banishment.", "They go to freedom, not exile."]],
[["Duke Senior", "Sweet are the uses of adversity.", "Hard times can teach us good things."],
["Duke Senior", "Finds tongues in trees, books in the running brooks, sermons in stones, and good in everything.", "Nature teaches us everything we need."]],
[["Orlando", "Forbear, and eat no more.", "Desperate Orlando threatens the Duke's men for food."],
["Duke Senior", "Your gentleness shall force more than your force move us to gentleness.", "Ask kindly and we'll share."],
["Orlando", "There is an old poor man who after me hath many a weary step limp'd in pure love.", "He brings in faithful old Adam."]],
[["Jaques", "All the world's a stage, and all the men and women merely players.", "Life is like a play, and we are all actors."],
["Jaques", "And one man in his time plays many parts, his acts being seven ages.", "A life has seven stages, from baby to old age."],
["Amiens", "Blow, blow, thou winter wind, thou art not so unkind as man's ingratitude.", "Winter is kinder than ungrateful people."]],
[["Orlando", "Hang there, my verse, in witness of my love.", "Orlando hangs poems on the trees."],
["Rosalind", "From the east to western Inde, no jewel is like Rosalinde.", "She reads his clumsy poem about her."],
["Rosalind", "Do you not know I am a woman? When I think, I must speak.", "She can't keep quiet."]],
[["Rosalind", "Men have died from time to time, and worms have eaten them, but not for love.", "Nobody really dies of love."],
["Orlando", "I would not be cured, youth.", "He doesn't want to stop loving her."],
["Rosalind", "Come, woo me, woo me.", "She, as Ganymede, lets him practise wooing."]],
[["Oliver", "A green and gilded snake had wreath'd itself.", "A snake and a lioness nearly killed sleeping Oliver."],
["Oliver", "Twice did he turn his back, and purpos'd so.", "Orlando nearly left his cruel brother."],
["Rosalind", "I would I were at home.", "She faints at the bloody cloth."]],
[["Hymen", "Then is there mirth in heaven, when earthly things made even atone together.", "The god of marriage brings everyone together."],
["Rosalind", "To you I give myself, for I am yours.", "Rosalind reveals herself."],
["Rosalind", "If it be true that good wine needs no bush, 'tis true that a good play needs no epilogue.", "A good play doesn't need a speech at the end, but here's one."]]
];
SHK_ACT.sh_merchant = [
[["Antonio", "In sooth, I know not why I am so sad.", "Antonio is sad and doesn't know why."],
["Antonio", "I hold the world but as the world, Gratiano, a stage where every man must play a part, and mine a sad one.", "The world is a stage and my part is a sad one."],
["Bassanio", "In Belmont is a lady richly left.", "Bassanio wants to woo rich Portia."]],
[["Portia", "By my troth, Nerissa, my little body is aweary of this great world.", "Portia is tired of it all."],
["Nerissa", "They are as sick that surfeit with too much as they that starve with nothing.", "Too much is as bad as too little."],
["Portia", "I may neither choose who I would nor refuse who I dislike.", "She can't choose her own husband."]],
[["Shylock", "Three thousand ducats, well.", "Shylock considers the loan."],
["Shylock", "You call me misbeliever, cut-throat dog, and spit upon my Jewish gaberdine.", "You insulted me, and now you want my help?"],
["Shylock", "Let the forfeit be nominated for an equal pound of your fair flesh.", "If you don't repay, I'll take a pound of your flesh."]],
[["Morocco", "Mislike me not for my complexion.", "Don't judge me by my dark skin."],
["Morocco", "All that glisters is not gold.", "The gold casket holds a skull: shiny isn't always good."]],
[["Shylock", "Hath not a Jew eyes?", "Aren't Jews human like everyone?"],
["Shylock", "If you prick us, do we not bleed? If you tickle us, do we not laugh?", "We bleed and laugh like you."],
["Shylock", "The villainy you teach me I will execute.", "I'll do to you what you taught me."]],
[["Song", "Tell me where is fancy bred, or in the heart or in the head?", "A song as Bassanio chooses."],
["Bassanio", "So may the outward shows be least themselves.", "Looks deceive."],
["Bassanio", "Fair Portia's counterfeit!", "He opens lead and finds her picture."]],
[["Portia", "The quality of mercy is not strain'd; it droppeth as the gentle rain from heaven.", "Mercy can't be forced; it falls freely like rain."],
["Shylock", "I'll have my bond.", "Shylock insists on his pound of flesh."],
["Portia", "This bond doth give thee here no jot of blood.", "Take flesh, but not one drop of blood."]],
[["Lorenzo", "How sweet the moonlight sleeps upon this bank!", "Lovers wait in the moonlit garden."],
["Portia", "How far that little candle throws his beams! So shines a good deed in a naughty world.", "One good deed shines in a bad world."],
["Portia", "Speak not so grossly. You are all amaz'd.", "Portia reveals the lawyer was her."]]
];
SHK_ACT.sh_henry = [
[["Chorus", "O for a Muse of fire, that would ascend the brightest heaven of invention!", "If only we had the inspiration to show this properly."],
["Chorus", "Can this cockpit hold the vasty fields of France?", "Can this little theatre hold all France?"],
["Chorus", "Piece out our imperfections with your thoughts.", "Use your imagination to fill in what we can't show."]],
[["Henry", "May I with right and conscience make this claim?", "Is my claim to France fair?"],
["Exeter", "Tennis-balls, my liege.", "The French Prince sends a mocking gift."],
["Henry", "His jest will savour but of shallow wit, when thousands weep more than did laugh at it.", "His joke will cost thousands of lives."]],
[["Henry", "Treason and murder ever kept together.", "Treason and murder go together."],
["Henry", "Cheerly to sea; the signs of war advance.", "On to France."]],
[["Henry", "Once more unto the breach, dear friends, once more.", "Into the gap in the walls again!"],
["Henry", "Imitate the action of the tiger.", "Fight like tigers."],
["Henry", "Cry 'God for Harry, England, and Saint George!'", "The great battle cry."]],
[["Katherine", "Alice, tu as ete en Angleterre, et tu parles bien le langage.", "The princess asks her maid to teach her English."],
["Katherine", "De hand.", "She learns 'hand', 'fingers', 'nails'."]],
[["Chorus", "A little touch of Harry in the night.", "The King's visit cheers his scared men."],
["Williams", "If the cause be not good, the King himself hath a heavy reckoning to make.", "If this war is wrong, the King is to blame."],
["Henry", "Upon the King!", "Alone, Henry feels the weight of being king."]],
[["Westmoreland", "O that we now had here but one ten thousand of those men in England that do no work today!", "If only we had more men."],
["Henry", "We few, we happy few, we band of brothers.", "We few will be brothers forever."],
["Henry", "This day is call'd the feast of Crispian.", "Today is St Crispin's Day, and it will be remembered."]],
[["Fluellen", "Kill the poys and the luggage!", "The French attack the camp boys."],
["Montjoy", "The day is yours.", "The French herald admits defeat."],
["Henry", "Praised be God, and not our strength, for it!", "God won it, not us."]],
[["Henry", "Fair Katherine, and most fair, will you vouchsafe to teach a soldier terms such as will enter at a lady's ear?", "Will you teach a soldier to woo?"],
["Katherine", "Is it possible dat I sould love de enemy of France?", "Can I love the enemy of France?"],
["Henry", "Nice customs curtsy to great kings.", "Kings can break the rules: he kisses her."]]
];
SHK_ACT.sh_richard = [
[["Richard", "Now is the winter of our discontent made glorious summer by this sun of York.", "Our bad times are over."],
["Richard", "I am determined to prove a villain.", "I've decided to be the villain."],
["Richard", "Plots have I laid, inductions dangerous.", "I've set my traps."]],
[["Richard", "Brother, good day. What means this armed guard that waits upon your Grace?", "Richard pretends to be shocked that Clarence is under arrest."],
["Clarence", "O, I have pass'd a miserable night.", "Clarence, in the Tower, had a terrible dream."],
["Murderer", "Relent? No, 'tis cowardly and womanish.", "The murderers argue, then kill him."]],
[["Anne", "Thou wast the cause and most accurs'd effect.", "Anne curses Richard over the coffin."],
["Richard", "Was ever woman in this humour woo'd? Was ever woman in this humour won?", "Has anyone ever won a woman like this?"]],
[["Margaret", "Thou elvish-mark'd, abortive, rooting hog!", "Old Queen Margaret curses Richard."],
["Richard", "And thus I clothe my naked villainy with odd old ends stol'n forth of holy writ, and seem a saint when most I play the devil.", "I quote the Bible and look holy while being evil."]],
[["Prince Edward", "I do not like the Tower, of any place.", "The young prince fears the Tower."],
["Richard", "So wise so young, they say, do never live long.", "Children so clever don't live long."]],
[["Richard", "I wish the bastards dead.", "Richard wants the princes killed."],
["Buckingham", "Give me some little breath, some pause.", "Buckingham hesitates."],
["Richard", "I am not in the giving vein today.", "Richard refuses him his reward."]],
[["Ghost", "Despair and die!", "The ghosts of his victims curse Richard."],
["Richard", "My conscience hath a thousand several tongues.", "His guilt speaks to him."],
["Richard", "Is there a murderer here? No. Yes, I am.", "He realises he is the murderer."]],
[["Richard", "A horse! A horse! My kingdom for a horse!", "He'd give his kingdom for a horse."],
["Richmond", "The day is ours; the bloody dog is dead.", "Henry Tudor wins."]]
];
SHK_ACT.sh_winter = [
[["Leontes", "Too hot, too hot! To mingle friendship far is mingling bloods.", "Leontes is suddenly jealous."],
["Leontes", "Is whispering nothing?", "He sees guilt in everything."],
["Polixenes", "There is a sickness which puts some of us in distemper.", "Polixenes senses danger and flees."]],
[["Paulina", "Good my liege, I come.", "Paulina brings the baby to the King."],
["Leontes", "A mankind witch!", "He insults her."],
["Leontes", "Take it hence and see it instantly consum'd with fire.", "He orders the baby destroyed."]],
[["Hermione", "The Emperor of Russia was my father.", "Hermione speaks nobly at her trial."],
["Officer", "Hermione is chaste; Polixenes blameless.", "The oracle says she is innocent."],
["Leontes", "There is no truth at all i' th' oracle.", "Leontes refuses, and his son dies."]],
[["Antigonus", "Thou art perfect then, our ship hath touch'd upon the deserts of Bohemia?", "They land on the wild shore."],
["Antigonus", "Exit, pursued by a bear.", "He flees a bear."],
["Shepherd", "Thou met'st with things dying, I with things new-born.", "You found death; I found a baby."]],
[["Time", "I, that please some, try all.", "Time himself speaks."],
["Time", "Impute it not a crime to me or my swift passage that I slide o'er sixteen years.", "Don't blame me for skipping sixteen years."]],
[["Perdita", "Here's flow'rs for you: hot lavender, mints, savory, marjoram.", "Perdita gives flowers to her guests."],
["Florizel", "When you do dance, I wish you a wave o' th' sea.", "Florizel loves watching her dance."],
["Polixenes", "Mark your divorce, young sir.", "The disguised King forbids the match."]],
[["Autolycus", "Ha, ha! what a fool Honesty is!", "He laughs at how easy it is to steal."],
["Autolycus", "Lawn as white as driven snow.", "Autolycus sells his goods with a song."],
["Camillo", "Unbuckle, unbuckle.", "They swap clothes to help the lovers escape."]],
[["Gentleman", "The oracle is fulfill'd: the King's daughter is found.", "Perdita is the lost princess."],
["Gentleman", "Every wink of an eye some new grace will be born.", "Wonders keep happening."]],
[["Paulina", "It is requir'd you do awake your faith.", "You must believe."],
["Paulina", "Music, awake her: strike!", "The statue begins to move."],
["Leontes", "O, she's warm!", "Hermione is alive."]]
];
SHK_ACT.sh_antony = [
[["Philo", "The triple pillar of the world transform'd into a strumpet's fool.", "One of the world's three rulers has become a fool for love."],
["Antony", "Let Rome in Tiber melt.", "Let Rome sink into the river; I'm staying here."],
["Cleopatra", "If it be love indeed, tell me how much.", "How much do you love me?"]],
[["Enobarbus", "The barge she sat in, like a burnish'd throne, burn'd on the water.", "Her boat shone like a gold throne on the river."],
["Enobarbus", "Age cannot wither her, nor custom stale her infinite variety.", "She never grows old or boring."]],
[["Soothsayer", "Thy daemon, that thy spirit which keeps thee, is noble, courageous, high, unmatchable, where Caesar's is not.", "A fortune-teller warns Antony that Caesar's luck beats his."],
["Antony", "I' th' East my pleasure lies.", "He'll go back to Egypt."]],
[["Cleopatra", "My salad days, when I was green in judgment.", "When I was young and foolish."],
["Cleopatra", "Is he married?", "She learns Antony has married."],
["Cleopatra", "Horrible villain! or I'll spurn thine eyes like balls before me.", "She attacks the messenger."]],
[["Enobarbus", "Naught, naught, all naught!", "All is lost at sea."],
["Scarus", "The greater cantle of the world is lost with very ignorance.", "We've lost half the world by stupidity."]],
[["Enobarbus", "I am alone the villain of the earth.", "Enobarbus regrets leaving Antony."],
["Enobarbus", "This blows my heart.", "His heart breaks with shame."]],
[["Antony", "Unarm, Eros. The long day's task is done, and we must sleep.", "Antony gives up the fight."],
["Antony", "I am dying, Egypt, dying.", "He dies in Cleopatra's arms."],
["Cleopatra", "The crown o' th' earth doth melt.", "The greatest man is gone."]],
[["Cleopatra", "Give me my robe, put on my crown; I have immortal longings in me.", "She dresses as a queen to die."],
["Cleopatra", "Dost thou not see my baby at my breast, that sucks the nurse asleep?", "The snake at her breast puts her to sleep."],
["Charmian", "Now boast thee, death, in thy possession lies a lass unparallel'd.", "Death has taken an incomparable woman."]]
];
var SHKS = { on: false, id: null, k: 0, list: [], i: 0, auto: false, voice: false, timer: 0, el: null, text: null, tid: null, plain: {}, busy: false, bob: 0 };
function shksT() { return SHKS.globe ? SHKS.globe.T : (typeof CTS !== "undefined" && CTS ? CTS.T : null); }
function shksRoot() { return SHKS.globe ? SHK.G : CTS.root; }
function shkNorm(s) { return String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z]+/g, ""); }
function shkTitleCase(s) { return s.toLowerCase().replace(/(^|[\s\-'’])([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }); }
var SHK_SPEAKER = /^[A-Z][A-Z’' ,&\-]{1,40}\.$/;
function shksText(id) { return __ZC(357, 127, this, arguments, new.target); }
function shksRanges(id, w, L) { return __ZC(357, 128, this, arguments, new.target); }
var SHK_DIR = /^(\[?_?)?(Enter|Exit|Exeunt|Re-enter|Flourish|Alarum|Alarums|Thunder|Music|Sennet|Trumpets|Hautboys|Dumb|Retreat|Drum|Excursions|Knocking|Sound|Solemn|Loud|Noise|Storm|Dies)\b/;
function shksParse(L, from, to, who0) { return __ZC(357, 129, this, arguments, new.target); }
function shksGloss(id, s) {
if (!s || s.k !== "say")
return null;
var n = shkNorm(s.t.join(" ")), hit = null;
(SHK_ACT[id] || []).forEach(function (ch) { (ch || []).forEach(function (b) { var w = shkNorm(b[1]); if (!hit && w.length > 8 && n.indexOf(w.slice(0, Math.min(30, w.length))) >= 0)
hit = b[2]; }); });
return hit;
}
var SHK_V3 = null;
function shksV(x, y, z) { if (!SHK_V3)
SHK_V3 = new THREE.Vector3(); return SHK_V3.set(x, y, z); }
function shksHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function shksSet() {
if (SHKS.globe)
return SHKS.globe.set;
var p = CTS.places[SHKS.k];
if (!p)
return null;
var c = Math.cos(p.face), s = Math.sin(p.face);
return { p: p, c: c, s: s, x: p.x, z: p.z, y: ctsGround(p.x, p.z), face: p.face };
}
function shksLocal(st, lx, lz) { return { x: st.x + lx * st.c + lz * st.s, z: st.z - lx * st.s + lz * st.c }; }
function shkWords(s) { return String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z]+/g, " ").trim(); }
var SHK_TITLES = /^(king|queen|prince|princess|duke|duchess|lord|lady|sir|friar|count|countess|earl|mistress|master|signior|brother|sister|father|mother|old|young|first|second|third)$/;
function shksCore(n) { var w = shkWords(n).split(/\s+/).filter(Boolean), keep = []; w.forEach(function (x) { if (!SHK_TITLES.test(x))
keep.push(x); }); return { all: w.join(" "), core: keep.join(" "), lady: /\b(lady|queen|duchess|princess|countess|mistress)\b/.test(shkWords(n)) }; }
function shksCastFind(who) { return __ZC(357, 130, this, arguments, new.target); }
var SHK_SLOTS = [0, -2.6, 2.6, -5, 5, -7.2, 7.2, -9.2, 9.2];
var SHK_CHORUS = /^(all|both|omnes|several|lords|citizens|servants|attendants|others)$/i;
function shksActor(who) { return __ZC(357, 131, this, arguments, new.target); }
function shksExit(who) {
var A = SHKS.cast[who];
if (!A || A.leaving)
return;
var st = SHKS.set, lx = SHK_SLOTS[A.slot] || 0, side = lx < 0 ? -1 : 1, off = SHKS.globe ? (A.ty ? { x: A.g.position.x, z: A.g.position.z - 1.6 } : shkgDoorPt(side)) : shksLocal(st, side * (Math.abs(lx) + 8), -2);
A.leaving = true;
A.tx = off.x;
A.tz = off.z;
}
function shksExitAll() { Object.keys(SHKS.cast).forEach(shksExit); }
function shksNamed(t, n) { return __ZC(357, 132, this, arguments, new.target); }
function shksDirect(t) { return __ZC(357, 133, this, arguments, new.target); }
function shksShot(kind, who) { return __ZC(357, 134, this, arguments, new.target); }
function shksCut(kind, who, dur) { SHKS.shotN++; SHKS.shot = shksShot(kind, who); SHKS.shot.dur = Math.max(3, dur || 8); SHKS.shot.who = who; SHKS.shot.kind = kind; }
function shksTick(dt) { return __ZC(357, 135, this, arguments, new.target); }
(function () { if (typeof ctsTick !== "function")
return; var o = ctsTick; ctsTick = function (dt) { o(dt); try {
shksTick(dt);
}
catch (e) { } }; })();
function shksUi() { return __ZC(357, 136, this, arguments, new.target); }
function shksControls() { return __ZC(357, 137, this, arguments, new.target); }
function shksSub(who, text, plain, dir) { return __ZC(357, 138, this, arguments, new.target); }
function shksCard(a, b, on) { var d = shksUi(), c = d.querySelector(".card"); if (on) {
c.querySelector(".a").textContent = a || "";
c.querySelector(".b").textContent = b || "";
} c.style.opacity = on ? "1" : "0"; }
function shksStart(id, k) { return __ZC(357, 139, this, arguments, new.target); }
function shksStop() { return __ZC(357, 140, this, arguments, new.target); }
function shksQuietGreeters() {
if (SHKS.fknWrapped || typeof fknTick !== "function")
return;
SHKS.fknWrapped = true;
var f0 = fknTick;
fknTick = function () { if (SHKS.on) {
try {
if (typeof FKN !== "undefined" && FKN.bub && typeof fknBubble === "function")
fknBubble(null, null);
}
catch (e) { }
return;
} return f0.apply(this, arguments); };
}
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!SHKS.on; }, close: shksStop });
function shksPieces(t) {
var L = String(t).match(/[^.!?;:]+[.!?;:]+["'”’)]*\s*|[^.!?;:]+$/g) || [t], out = [], cur = "";
L.forEach(function (x) { if ((cur + x).length > 150 && cur) {
out.push(cur.trim());
cur = "";
} cur += x; });
if (cur.trim())
out.push(cur.trim());
return out.length ? out : [t];
}
function shksPlay() { return __ZC(357, 141, this, arguments, new.target); }
function shksEnd() { return __ZC(357, 142, this, arguments, new.target); }
function shksDo(a) { return __ZC(357, 143, this, arguments, new.target); }
function shksGo(d) { shksDo(d > 0 ? "next" : "back"); }
var SHK_SHE = /^(lady|queen|nurse|juliet|ophelia|gertrude|hermia|helena|titania|hippolyta|miranda|portia|calpurnia|goneril|regan|cordelia|desdemona|emilia|bianca|viola|olivia|maria|beatrice|hero|margaret|ursula|rosalind|celia|phebe|audrey|nerissa|jessica|katherine|alice|hostess|anne|elizabeth|duchess|hermione|perdita|paulina|mopsa|dorcas|cleopatra|octavia|charmian|iras|iris|ceres|juno|gentlewoman|witch|first witch|second witch|third witch|hecate|mistress|old lady|widow|princess)\b/i;
var SHK_CHILD = /^(boy|page|prince edward|young york|duke of york|mamillius|fleance|moth|lucius|young lucius|son|child)\b/i;
var SHK_OLD = /^(lear|king lear|gloucester|polonius|gonzalo|old shepherd|shepherd|egeus|adam|old man|old gobbo|leonato|antonio|capulet|montague|duncan|king duncan|old|nestor|friar|priest|gravedigger|first gravedigger|siward|brabantio|corin|nurse)\b/i;
function shksPerson(who) { return __ZC(357, 144, this, arguments, new.target); }
var SHK_NARRATOR = { name: "Master William Shakespeare", ftkSex: "m", ftkAge: 36 };
function shksSay(c, text, done) {
if (!SHKS.voice || typeof fvoSpeak !== "function" || !(typeof fvoOn !== "function" || fvoOn()) || !text) {
if (done)
done();
return;
}
try {
fvoSpeak(c, text, function () { if (done)
done(); });
}
catch (e) {
if (done)
done();
}
}
function shksPlain() { return __ZC(357, 145, this, arguments, new.target); }
document.addEventListener("keydown", function (e) {
if (!SHKS.on || /input|textarea/i.test((e.target && e.target.tagName) || ""))
return;
if (e.key === "ArrowRight" || e.key === "n") {
e.preventDefault();
e.stopPropagation();
shksDo("next");
}
else if (e.key === "ArrowLeft") {
e.preventDefault();
e.stopPropagation();
shksDo("back");
}
else if (e.key === " " || e.key === "p") {
e.preventDefault();
e.stopPropagation();
shksDo("pause");
}
}, true);
(function () {
if (typeof ctsChapter !== "function")
return;
var o = ctsChapter;
ctsChapter = function (k) {
var id = CTS && CTS.T && CTS.T.id;
if (!id || !SHK_SCENES[id] || k > CTS.prog)
return o(k);
var wc = worldCard;
worldCard = function (h, f) { if (typeof h === "string") {
var b = worldBtn("shkact", "🎭 Watch the scene, every word", "The play acted out on this set, in costume, with the plain meaning under the words");
h = h + b;
f = f || {};
f.shkact = function () { shksStart(id, k); };
} return wc(h, f); };
try {
return o(k);
}
finally {
worldCard = wc;
}
};
})();
var SHK_ROLE = [
["ghost", /ghost|apparition|spirit of|shade/],
["witch", /witch|hecate|sycorax/],
["fairy", /fairy|fairies|peaseblossom|cobweb|mustardseed|titania|oberon|puck|ariel|iris|ceres|juno|nymph|reaper|goddess/],
["fool", /\bfool\b|clown|feste|touchstone|trinculo|jester|yorick|lavatch/],
["friar", /friar|priest|monk|bishop|cardinal|abbess|archbishop|hymen|soothsayer|doctor|parson/],
["king", /\bking\b|\bqueen\b|emperor|empress|caesar|lear|leontes|polixenes|claudius|gertrude|duncan|alonso|cleopatra|octavius|richard|henry/],
["noble", /duke|duchess|prince|princess|dauphin|lord|lady|countess|count\b|earl|antony|theseus|hippolyta|malcolm|richmond|orsino|olivia|portia|don pedro|don john|frederick|senior|hamlet|ophelia|laertes|polonius|brutus|cassius|romeo|juliet|paris|tybalt|mercutio|benvolio|capulet|montague|bassanio|antonio|lorenzo|jessica|nerissa|gratiano|desdemona|brabantio|claudio|benedick|beatrice|hero|leonato|rosalind|celia|orlando|oliver|jaques|viola|sebastian|perdita|florizel|hermione|paulina|camillo|prospero|miranda|ferdinand|gonzalo|lysander|demetrius|hermia|helena|egeus|cordelia|goneril|regan|edgar|edmund|gloucester|kent|albany|cornwall|buckingham|clarence|hastings|anne|elizabeth|octavia|enobarbus|charmian|iras|calpurnia|gentleman|gentlewoman|senator/],
["soldier", /soldier|captain|sergeant|officer|guard|watch|lieutenant|general|marcellus|bernardo|francisco|murderer|herald|montjoy|knight|sentinel|seyton|siward|macduff|macbeth|banquo|fluellen|pistol|bardolph|nym|williams|bates|scarus|eros|cassio|iago|othello|montano|menteith|angus|lennox|ross\b|dogberry|verges/],
["common", /nurse|maid|servant|porter|gravedigger|sexton|shepherd|shepherdess|mopsa|dorcas|citizen|plebeian|commoner|carpenter|cobbler|weaver|tinker|joiner|bellows|tailor|quince|bottom|snout|snug|flute|starveling|sailor|boatswain|mariner|\bmaster\b|gardener|boy|page|cook|musician|player|messenger|\bman\b|attendant|keeper|gaoler|jailer|stephano|caliban|sampson|gregory|balthasar|peter|abram|adam|corin|audrey|william|launcelot|gobbo|autolycus|countryman|old man|pedlar/]
];
function shkRoleOf(name, desc) {
var n = String(name || "").toLowerCase(), d = String(desc || "").toLowerCase();
for (var i = 0; i < SHK_ROLE.length; i++)
if (SHK_ROLE[i][1].test(n))
return SHK_ROLE[i][0];
for (var j = 0; j < SHK_ROLE.length; j++)
if (SHK_ROLE[j][1].test(d.split(",")[0]))
return SHK_ROLE[j][0];
return "noble";
}
var SHK_DYE = [0x7A1A2A, 0x1E2A5A, 0x2A4A2A, 0x5A2A5A, 0x6A4A1A, 0x2A2420, 0x8A5A1A, 0x3A2A4A, 0x1A3A4A, 0x6A2A1A];
var SHK_HOME = [0x6A5A44, 0x5A4A3A, 0x7A6A50, 0x4A4A40, 0x8A7A5A, 0x5A5048, 0x6A5034];
function shkWear(L, o) { return __ZC(357, 146, this, arguments, new.target); }
function shkHeadwear(add, E) { return __ZC(357, 147, this, arguments, new.target); }
function shkWearReady() { return __ZC(357, 148, this, arguments, new.target); }
(function () {
if (typeof ctPersonBody !== "function")
return;
var o0 = ctPersonBody;
ctPersonBody = function (W, seed) {
if (!W || W.make || W.deity || W.being || !/^(sh_|shk_)/.test(String(seed || "")) || !shkWearReady())
return o0.apply(this, arguments);
var o = Object.assign({}, W.o || {}), look = Object.assign({}, o.look || {});
look._shkRole = W.role || shkRoleOf(W.n, W.who);
look._shkName = String(W.n || "").toLowerCase();
look._shkDesc = String(W.who || "").toLowerCase().slice(0, 80);
look._shkSeed = seed;
o.look = look;
o.ozCos = "oz_shk";
var W2 = Object.assign({}, W, { o: o });
return o0.call(this, W2, seed);
};
})();
function shkpB(G, w, h, d, kind, col, x, y, z, ry) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), shkS(kind, col)); m.position.set(x, y + h / 2, z); if (ry)
m.rotation.y = ry; G.add(m); return m; }
function shkpC(G, r1, r2, h, kind, col, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg || 12), shkS(kind, col)); m.position.set(x, y + h / 2, z); G.add(m); return m; }
function shkpGlow(col) { return new THREE.MeshBasicMaterial({ color: col }); }
function shkpCandle(G, x, y, z) { shkpC(G, 0.03, 0.03, 0.22, "plaster", 0xF4ECD8, x, y, z, 8); var f = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), shkpGlow(0xFFC860)); f.scale.y = 1.8; f.position.set(x, y + 0.27, z); G.add(f); }
function shkpTorch(G, x, z, h) { return __ZC(357, 149, this, arguments, new.target); }
function shkpBanner(G, x, z, col, h) { return __ZC(357, 150, this, arguments, new.target); }
function shkpTree(G, x, z, h, seed) { var t = new THREE.Group(); try {
ctuTree(t, { h: h || 7, crown: 0x3E6A2E, crown2: 0x5A7E3A, trunk: 0x5A4632, seed: seed || 1, limbs: ctLite() ? 3 : 6, roots: ctLite() ? 2 : 4 });
if (typeof ctuLeaves === "function")
ctuLeaves(t);
}
catch (e) {
shkpC(t, 0.2, 0.3, h || 7, "bark", 0x5A4632, 0, 0, 0);
} t.position.set(x, 0, z); G.add(t); }
function shkpRock(G, x, z, s, col) { var r = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 1), shkS("stone", col || 0x7A7468)); r.scale.set(1, 0.62, 0.85); r.position.set(x, s * 0.35, z); r.rotation.y = x * 1.7; G.add(r); }
function shkpBush(G, x, z, s, col, fl) { return __ZC(357, 151, this, arguments, new.target); }
function shkpChair(G, x, z, ry, col, tall) { return __ZC(357, 152, this, arguments, new.target); }
function shkpTable(G, x, z, len, laid) { return __ZC(357, 153, this, arguments, new.target); }
function shkpTent(G, x, z, col) { return __ZC(357, 154, this, arguments, new.target); }
function shkpFire(G, x, z, big) { return __ZC(357, 155, this, arguments, new.target); }
var SHKP_KINDS = [
["ship", /\bship\b|on board|deck|galley/],
["cave", /cavern|cave|cauldron/],
["tomb", /tomb|monument|vault|churchyard|grave|burial/],
["throne", /room of state|throne|presence|court of justice|council|senate|capitol/],
["cell", /cell|study|library|closet/],
["chamber", /room in|apartment/],
["church", /inside of a church|\bchurch\b(?!yard)|chapel|temple/],
["chamber", /bedchamber|bed-chamber|in bed|her bed|chamber in/],
["feast", /feast|banquet|hall in|great hall|hall\.|supper|dancing|masque|revels/],
["throne", /throne|presence|state|court|palace|council|senate|capitol|king.s|queen.s|duke.s|castle/],
["cell", /cell|study|library|closet/],
["chamber", /chamber|bedroom|bed|room in|apartment|house/],
["garden", /garden|orchard|arbour|bower|balcony|terrace/],
["camp", /camp|tent|field|battle|plain|philippi|bosworth|agincourt|army|siege|harfleur|breach/],
["walls", /battlement|platform|walls|rampart|gate/],
["heath", /heath|moor|desert place|open place|storm|hovel|cliff|dover/],
["wood", /wood|forest|arden|grove|park|island|shore|coast|beach|sea-side|bohemia/],
["street", /street|public|square|market|rialto|place|before|road|town|city|venice|verona|rome|london/]
];
function shkpKind(t) { t = String(t || "").toLowerCase(); for (var i = 0; i < SHKP_KINDS.length; i++)
if (SHKP_KINDS[i][1].test(t))
return SHKP_KINDS[i][0]; return "street"; }
function shkpDress(G, kind, col, heading) { return __ZC(357, 156, this, arguments, new.target); }
function shkpPine(G, x, z, h, col) { shkpC(G, 0.12, 0.18, h * 0.3, "bark", 0x4A3A28, x, 0, z, 6); var c = new THREE.Mesh(new THREE.ConeGeometry(h * 0.24, h * 0.8, 8), shkS("foliage", col || 0x2E4A2A)); c.position.set(x, h * 0.6, z); G.add(c); }
function shkpOak(G, x, z, h, col) { shkpC(G, 0.18, 0.28, h * 0.45, "bark", 0x5A4632, x, 0, z, 7); var c = new THREE.Mesh(new THREE.IcosahedronGeometry(h * 0.32, 1), shkS("foliage", col || 0x3E6A2E)); c.scale.y = 0.8; c.position.set(x, h * 0.68, z); G.add(c); }
function shkpHill(G, x, z, r, h, col) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), shkS("grass", col || 0x5A7A3A)); m.scale.y = h / r; m.position.set(x, -0.5, z); G.add(m); }
function shkpFloor(G, kind, h) { return __ZC(357, 157, this, arguments, new.target); }
function shkpRoom(G, kind, col, h) { return __ZC(357, 158, this, arguments, new.target); }
function ozMixSafe(a, b, k) { var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255, br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255; return (Math.round(ar + (br - ar) * k) << 16) | (Math.round(ag + (bg - ag) * k) << 8) | Math.round(ab + (bb - ab) * k); }
function shkpTorchWall(G, x, z, sd) { shkpB(G, 0.1, 0.5, 0.1, "lead", 0x2A2A2A, x, 2.3, z); var f = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.32, 8), shkpGlow(0xFF9A30)); f.position.set(x - sd * 0.05, 2.95, z); G.add(f); }
function shkpStreet(G, col) { return __ZC(357, 159, this, arguments, new.target); }
function shkpCountry(G, kind, h) { return __ZC(357, 160, this, arguments, new.target); }
function shkpSet(heading) { return __ZC(357, 161, this, arguments, new.target); }
function shkpGlobeSet(heading) { return __ZC(357, 162, this, arguments, new.target); }
function shkpClear() { var G = SHKS.setG; SHKS.setG = null; if (!G)
return; if (G.parent)
G.parent.remove(G); var keep = new Set(Object.keys(SHK.mats || {}).map(function (k) { return SHK.mats[k]; })); G.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material && !keep.has(m.material))
m.material.dispose(); }); }
function shkpHideWorld() { return __ZC(357, 163, this, arguments, new.target); }
function shkpShowWorld() { (SHKS.hid || []).forEach(function (o) { o.visible = true; }); SHKS.hid = null; }
var SHKG_SLOT = 30 * 60000;
var SHKG_TIMES = [[10, 0], [14, 0], [18, 0], [22, 0]];
var SHKG_RUN = { sh_hamlet: 240, sh_richard: 225, sh_lear: 210, sh_antony: 210, sh_othello: 200, sh_winter: 195, sh_henry: 180, sh_romeo: 180,
sh_merchant: 165, sh_muchado: 165, sh_asyou: 165, sh_twelfth: 155, sh_caesar: 150, sh_tempest: 140, sh_dream: 140, sh_macbeth: 135 };
function shkgRun(id) { return (SHKG_RUN[id] || 170) * 60000; }
function shkgRunText(id) { var m = SHKG_RUN[id] || 170, h = Math.floor(m / 60), r = m % 60; return h + " hr" + (r ? " " + r + " min" : ""); }
var SHK_SEATS = [
{ k: "yard", n: "The yard", d: "Stand with the groundlings, right up against the stage", price: 10, old: "a penny" },
{ k: "gallery", n: "A gallery bench", d: "The middle gallery, looking across the yard at the stage", price: 35, old: "twopence" },
{ k: "gentle", n: "A gentlemen's room", d: "A cushioned seat in the lowest gallery, beside the stage", price: 65, old: "threepence" },
{ k: "lords", n: "The lords' room", d: "High beside the stage, where the gallants sit to be seen", price: 95, old: "sixpence" }
];
var SHKG = { box: null, boxAt: 0, armed: true, wait: null };
function shkgRep() { return (typeof SHK_PLAY_IDS !== "undefined" ? SHK_PLAY_IDS : []).filter(function (id) { return typeof CT_BY_ID !== "undefined" && CT_BY_ID[id]; }); }
function shkgPlayAt(q) { var R = shkgRep(); return R.length ? R[((q * 5) % R.length + R.length) % R.length] : null; }
function shkgShows(n) { return __ZC(357, 164, this, arguments, new.target); }
function shkgTime(ms) { try {
return new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
catch (e) {
var d = new Date(ms);
return d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2);
} }
function shkgKind(id) { var P = (typeof SHK_PLAYS !== "undefined" ? SHK_PLAYS : []).filter(function (p) { return p[5] === id; })[0]; return P ? P[2] : ""; }
function shkgSeat(k) { return SHK_SEATS.filter(function (s) { return s.k === k; })[0] || SHK_SEATS[0]; }
function shkgPrice(k) { var B = SHKG.box; return B && B.prices && B.prices[k] != null ? +B.prices[k] : shkgSeat(k).price; }
function shkgBoxFetch(then) { return __ZC(357, 165, this, arguments, new.target); }
function shkgTix() { var d = shkData(); if (!Array.isArray(d.tix))
d.tix = []; var cut = Date.now() - 16 * 3600000; d.tix = d.tix.filter(function (t) { return t && t.at > cut; }); return d.tix; }
function shkgMine() {
var L = shkgTix().slice(), B = SHKG.box;
if (B && B.mine)
B.mine.forEach(function (m) { var at = Date.parse(m.show); if (!L.some(function (t) { return t.at === at; }))
L.push({ at: at, id: m.play, seat: m.seat, no: m.no }); });
return L.sort(function (a, b) { return a.at - b.at; });
}
function shkgBoxCard(sel) {
shkgBoxFetch(function () { shkgBoxDraw(sel || {}); });
shkgBoxDraw(sel || {});
}
function shkgBoxDraw(sel) { return __ZC(357, 166, this, arguments, new.target); }
function shkgBuy(show, seat) { return __ZC(357, 167, this, arguments, new.target); }
function shkGlobeHow() { return __ZC(357, 168, this, arguments, new.target); }
function shkgSeatPt(k, id) { return __ZC(357, 169, this, arguments, new.target); }
function shkgSit(t) { return __ZC(357, 170, this, arguments, new.target); }
function shkgWait(t) { return __ZC(357, 171, this, arguments, new.target); }
function shkgSet() {
var cx = shkRoomX("globe"), sz0 = -34 + 2;
return { set: { p: null, c: 1, s: 0, x: cx, z: -21.6, y: 1.6, face: 0 }, doors: [{ x: cx - 4.1, z: sz0 + 0.9 }, { x: cx + 4.1, z: sz0 + 0.9 }], balc: { x: cx, z: sz0 + 1.25, ty: 4.73 } };
}
function shkgDoorPt(side) { var G = SHKS.globe; return G ? G.doors[side < 0 ? 0 : 1] : { x: 0, z: 0 }; }
function shkgResumeAt(id) { var d = shkData(); return d.watch && d.watch[id] && d.watch[id].day === shkDay() ? d.watch[id].i : 0; }
function shkgMark() { var G = SHKS.globe; if (!G)
return; var d = shkData(); d.watch = d.watch || {}; d.watch[G.id] = { i: SHKS.i, day: shkDay() }; if (SHKS.i % 10 === 0)
shkSave(); }
function shkgStart(t, fromTop, joinAt) { return __ZC(357, 172, this, arguments, new.target); }
function shkgTrumpet() { if (typeof playTone !== "function")
return; [0, 700, 1400].forEach(function (ms) { setTimeout(function () { try {
playTone(523, 0.3);
setTimeout(function () { playTone(659, 0.22); }, 260);
setTimeout(function () { playTone(784, 0.45); }, 480);
}
catch (e) { } }, ms); }); }
function shkgHouse(on) { return __ZC(357, 173, this, arguments, new.target); }
function shkgSeatCam(dt, speaker) { return __ZC(357, 174, this, arguments, new.target); }
function shkgFovBack(G) { if (G && G.fov0 != null) {
camera.fov = G.fov0;
camera.updateProjectionMatrix();
G.fov0 = null;
} }
function shkgEnd() { return __ZC(357, 175, this, arguments, new.target); }
function shkgAfter(G) { shkgFovBack(G); shkgHouse(false); try {
shkSave();
}
catch (e) { } }
function shkgWalk() { return __ZC(357, 176, this, arguments, new.target); }
(function () {
if (typeof shkTick !== "function")
return;
var o = shkTick;
shkTick = function (dt) {
if (typeof SHKS !== "undefined" && SHKS.on && SHKS.globe) {
try {
shksTick(dt);
}
catch (e) { }
worldPrompt(null);
return;
}
o(dt);
try {
shkgWalk();
}
catch (e) { }
var t = SHKG.wait;
if (t && SHK.inside === "globe" && Date.now() >= t.at && !SHK.moving) {
SHKG.wait = null;
shkgStart(t);
}
else if (t && SHK.inside !== "globe")
SHKG.wait = null;
};
})();
(function () { if (typeof shkMove !== "function")
return; var m = shkMove; shkMove = function () { SHKG.armed = false; return m.apply(this, arguments); }; })();
(function () {
if (typeof shkFair !== "function")
return;
var f = shkFair;
shkFair = function (P, R) {
var r = f.apply(this, arguments);
try {
var G = SHK_PLACES.globe, x = G.x + 4.4, z = G.z + G.r + 2.6;
shkBox(P, 0.16, 2.6, 0.16, shkS("wood", 0x4A3424), x - 0.9, 1.3, z);
shkBox(P, 0.16, 2.6, 0.16, shkS("wood", 0x4A3424), x + 0.9, 1.3, z);
var b = wSign(["THE GLOBE · TODAY", "four plays a day", "tickets at the door"], 2.1, 1.3, "#F0E8D0", "#2A1E14");
b.position.set(x, 1.95, z + 0.1);
P.add(b);
shkSolid({ x: x, z: z, r: 1 });
shkSpot(x, z + 1.4, 2.2, "The Globe's playbill", "see the show times and buy a ticket", function () { shkgBoxCard(); });
}
catch (e) {
if (window.console)
console.warn("[shakespeare] playbill", e);
}
return r;
};
})();
function shkgClear(x, z) { return Math.abs(x) < 3.6 && z > -3.4 && z < 4.4; }
function shkgCloth(G, w, h, col, x, y, z, ry) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide })); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; G.add(m); return m; }
function shkgRug(G, w, d, col, x, z, edge) { return __ZC(357, 177, this, arguments, new.target); }
function shkgGoblet(G, x, y, z, col) { shkpC(G, 0.05, 0.03, 0.08, "lead", col || 0xC8A040, x, y, z, 8); shkpC(G, 0.012, 0.012, 0.08, "lead", col || 0xC8A040, x, y + 0.08, z, 6); shkpC(G, 0.06, 0.04, 0.02, "lead", col || 0xC8A040, x, y, z, 8); }
function shkgCandelabrum(G, x, z, h) {
h = h || 1.6;
shkpC(G, 0.18, 0.24, 0.08, "lead", 0xB89038, x, 0, z, 10);
shkpC(G, 0.03, 0.04, h, "lead", 0xB89038, x, 0.08, z, 8);
var a = shkpB(G, 0.9, 0.04, 0.04, "lead", 0xB89038, x, h, z);
[-0.42, 0, 0.42].forEach(function (o) { shkpCandle(G, x + o, h + 0.04, z); });
}
function shkgBrazier(G, x, z) { return __ZC(357, 178, this, arguments, new.target); }
function shkgChest(G, x, z, ry, col) { return __ZC(357, 179, this, arguments, new.target); }
function shkgBarrel(G, x, z, s) { s = s || 1; var b = shkpC(G, 0.34 * s, 0.34 * s, 0.85 * s, "wood", 0x6A4A2A, x, 0, z, 12); [0.12, 0.72].forEach(function (f) { shkpC(G, 0.355 * s, 0.355 * s, 0.05, "lead", 0x3A3A3A, x, f * s, z, 12); }); }
function shkgStool(G, x, z, col) { shkpC(G, 0.2, 0.2, 0.06, "wood", col || 0x5A3E22, x, 0.42, z, 10); [0, 2.1, 4.2].forEach(function (a) { shkpC(G, 0.025, 0.03, 0.42, "wood", col || 0x5A3E22, x + Math.cos(a) * 0.13, 0, z + Math.sin(a) * 0.13, 5); }); }
function shkgShield(G, x, y, z, col, ry) {
var s = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 16), shkS("lead", col));
s.rotation.x = Math.PI / 2;
if (ry)
s.rotation.y = ry;
s.position.set(x, y, z);
G.add(s);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), shkS("lead", 0xC8A040));
b.position.set(x, y, z + 0.04);
G.add(b);
}
function shkgHalberd(G, x, z) { shkpC(G, 0.025, 0.025, 2.6, "wood", 0x5A3E22, x, 0, z, 6); shkpB(G, 0.32, 0.22, 0.03, "lead", 0xB8B8C0, x + 0.1, 2.3, z); var t = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.3, 4), shkS("lead", 0xB8B8C0)); t.position.set(x, 2.75, z); G.add(t); }
function shkgTub(G, x, z, h, seed) { return __ZC(357, 180, this, arguments, new.target); }
function shkgGarland(G, x0, x1, y, z, col) {
var n = ctLite() ? 6 : 12;
for (var i = 0; i <= n; i++) {
var f = i / n, x = x0 + (x1 - x0) * f, sag = Math.sin(f * Math.PI) * 0.5;
var b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 4), shkS("foliage", i % 3 ? 0x3E6A2E : (col || 0xC82A3A)));
b.position.set(x, y - sag, z);
G.add(b);
}
}
function shkgBook(G, x, y, z, col, ry) { shkpB(G, 0.32, 0.07, 0.24, "plaster", col, x, y, z, ry || 0); }
function shkgSkull(G, x, y, z) { return __ZC(357, 181, this, arguments, new.target); }
function shkgRock(G, x, z, s, col) { shkpRock(G, x, z, s, col || 0x7A7468); }
function shkgStall(G, x, z, col, ry) { return __ZC(357, 182, this, arguments, new.target); }
function shkgDress(G, kind, col, h, tr) { return __ZC(357, 183, this, arguments, new.target); }
function shkgArrasTex(kind, tr) { return __ZC(357, 184, this, arguments, new.target); }
function shkgArras(G, kind, tr) { return __ZC(357, 185, this, arguments, new.target); }
var SHKST = { avoid: null };
function shkstR() { return SHKST.R(); }
function shkstAvoidList() { return __ZC(357, 186, this, arguments, new.target); }
var SHKST_VIEWS = [[-351, 352, 5], [-513, 377, 4.5], [-194, 377, 4.5], [-294, -497, 5], [42, -449, 5], [257, -39, 3], [255, 298, 3], [-1139, -268, 5]];
function shkstNear(x, z, pad, noDoors, doorPad) { return __ZC(357, 187, this, arguments, new.target); }
function shkstFree(x, z, w, d, ry, pad) {
pad = pad === undefined ? 0.4 : pad;
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
for (var i = 0; i <= 4; i++)
for (var j = 0; j <= 4; j++) {
var lx = (i / 4 - 0.5) * (w + pad * 2), lz = (j / 4 - 0.5) * (d + pad * 2), px = x + lx * c + lz * s, pz = z - lx * s + lz * c;
if (shkSolidAt(px, pz, 0))
return false;
}
return true;
}
var SHKST_AWN = [["#8A2A22", "#E8DCC0"], ["#2A4A2A", "#E0D0A0"], ["#2A3A6A", "#E8E0C8"], ["#A8782A", "#3A2A1A"], ["#5A2A4A", "#E8D8B0"]];
function shkstAwning(i) {
var k = "shkstAwn" + i;
if (SHK.mats[k])
return SHK.mats[k];
var c = SHKST_AWN[i % SHKST_AWN.length];
var m = new THREE.MeshLambertMaterial({ map: shkAwningTex(c[0], c[1]), side: THREE.DoubleSide });
return (SHK.mats[k] = m);
}
var SHKST_TRADE = {
books: { c: [0x5A2A1A, 0x3A2418, 0x7A4A2A, 0xD8C8A0, 0x2A3A4A, 0x6A1A1A], sign: ["Quartos and ballads", "Bibles and primers", "New books"] },
cloth: { c: [0x7A1F2A, 0x2A3A6A, 0x3A6A3A, 0xC8A040, 0xE8E0CC, 0x5A2A5A], sign: ["Silks and kersey", "Ribbons and laces"] },
fruit: { c: [0xB8302A, 0x8AA03A, 0xC8502A, 0xE8C050, 0x6A2A4A], sign: ["Kentish pippins", "Cherries ripe"] },
bread: { c: [0xC8945A, 0xB07A44, 0xD8A868, 0x9A6A3A], sign: ["Manchets and cakes", "Hot pies"] },
pots: { c: [0x9A5A3A, 0x7A4A2E, 0xB8B0A0, 0x5A5A5A], sign: ["Pots and pipkins", "Pewter"] },
gloves: { c: [0x8A6A44, 0x5A3A22, 0xEDE2C4, 0xA8844A], sign: ["Gloves", "Shoes and pattens"] },
fish: { c: [0xB8C0C8, 0x9AA4AC, 0x8A9298, 0xC8B8A0], sign: ["Fresh fish", "Oysters"] },
ale: { c: [0x6A4A2A, 0x5A3A20, 0x8A6A3A], sign: ["Small ale", "Beer"] }
};
function shkstGoods(g, kind, w, y, z, R, n) { return __ZC(357, 188, this, arguments, new.target); }
function shkstPasser(p) { try {
delete p.userData.wSeed;
p.userData.shkstFolk = 1;
p.traverse(function (m) { m.raycast = function () { }; if (m.isMesh)
m.castShadow = false; });
(SHKST.pass || (SHKST.pass = [])).push([p.position.x, p.position.z]);
}
catch (e) { } }
function shkstWfWrap() { return __ZC(357, 189, this, arguments, new.target); }
function SHKST_VR() { return SHK.lite ? 34 : 44; }
function shkstStand(x, z, ry, look, R) {
var p = wPerson("shkf_d" + SHK.people.length, { look: look || shkFolkLook(R) });
p.position.set(x, 0, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
shkstPasser(p);
SHK.people.push({ g: p, wander: null, ground: 0, vr: SHKST_VR() });
return p;
}
function shkstBooth(P, x, z, ry, R, o) { return __ZC(357, 190, this, arguments, new.target); }
function shkstHorse(P, x, z, ry, R) { return __ZC(357, 191, this, arguments, new.target); }
function shkstCartHorse(P, x, z, ry, R) { shkCart(P, x, z, ry); var c = Math.cos(ry), s = Math.sin(ry); shkstHorse(P, x + 3.6 * s, z + 3.6 * c, ry, R); }
function shkstBarrow(P, x, z, ry, R, kind) { return __ZC(357, 192, this, arguments, new.target); }
function shkstHeap(P, x, z, R) { return __ZC(357, 193, this, arguments, new.target); }
function shkstMudMats() { return __ZC(357, 194, this, arguments, new.target); }
function shkstBlobs(list, y) { return __ZC(357, 195, this, arguments, new.target); }
function shkstMud(P, x0, z0, x1, z1, w, R, paved) { return __ZC(357, 196, this, arguments, new.target); }
function shkstMudBuild() { return __ZC(357, 197, this, arguments, new.target); }
function shkstLitter(P, x, z, r, n, R) {
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * r, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d;
if (R() < 0.7) {
var s = shkBox(P, 0.5 + R() * 0.6, 0.02, 0.05, shkC(0xD8C080), px, 0.02, pz, R() * 3);
}
else
shkBox(P, 0.3, 0.01, 0.4, shkC(0xEDE2C4), px, 0.015, pz, R() * 3);
}
}
function shkstHouse(P, x, z, ry, w, d, st, R, o) { return __ZC(357, 198, this, arguments, new.target); }
function shkstRow(P, x0, z0, x1, z1, side, R, o) { return __ZC(357, 199, this, arguments, new.target); }
function shkstFolk(n, x, z, r, R, o) { return __ZC(357, 200, this, arguments, new.target); }
function shkstViewDress(P, cx, cz, yaw, R, o) { return __ZC(357, 201, this, arguments, new.target); }
function shkstSurface(P, x, z, w, d, ry, kind, col) { return __ZC(357, 202, this, arguments, new.target); }
function shkstConduit(P, x, z, R) { return __ZC(357, 203, this, arguments, new.target); }
function shkstWashing(P, x0, z0, x1, z1, y, R) { return __ZC(357, 204, this, arguments, new.target); }
function shkstHangSign(P, x, z, out, R, y) { return __ZC(357, 205, this, arguments, new.target); }
function shkstSpill(P, x, z, ry, kind, R) { return __ZC(357, 206, this, arguments, new.target); }
function shkstTrunks(P, x, z, ry, R, n) { return __ZC(357, 207, this, arguments, new.target); }
function shkstBoothOk(x, z, ry, w, pad, doorPad) { var a = !shkstNear(x, z, pad === undefined ? 1.5 : pad, false, doorPad), b = a && shkstFree(x, z, w || 3.4, 2.0, ry, 0.05); if (!a)
SHKST.n.nearNo++;
else if (!b)
SHKST.n.solidNo++; if (!b)
(SHKST.dbg = SHKST.dbg || []).push([Math.round(x), Math.round(z), a ? "solid" : "near"]); return b; }
function shkstMaidNo(cx, cz, hw) { return [-820, -350, -170, -50].some(function (x) { return Math.abs(cx - x) < hw + 3.5; }); }
var SHKST_INNS = ["The Elephant", "The Falcon", "The Bear's Head", "The Anchor", "The Castle", "The Cardinal's Hat", "The Bell", "The Unicorn", "The Swan", "The Green Man"];
function shkstBankside(R) { return __ZC(357, 208, this, arguments, new.target); }
function shkstPauls(R) { return __ZC(357, 209, this, arguments, new.target); }
function shkstCheapside(R) { return __ZC(357, 210, this, arguments, new.target); }
function shkstBridge(R) { return __ZC(357, 211, this, arguments, new.target); }
function shkstBorough(R) { return __ZC(357, 212, this, arguments, new.target); }
function shkstWhitehall(R) { return __ZC(357, 213, this, arguments, new.target); }
function shkstBuild() { return __ZC(357, 214, this, arguments, new.target); }
var SHKST_SKIP = [[-194, 377]];
function shkstCovers(o) {
var c = Math.cos(o.ry || 0), s = Math.sin(o.ry || 0);
for (var i = 0; i < SHKST_SKIP.length; i++) {
var dx = SHKST_SKIP[i][0] - o.x, dz = SHKST_SKIP[i][1] - o.z, lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) < o.w / 2 + 0.6 && Math.abs(lz) < o.d / 2 + 1.6)
return true;
}
return false;
}
if (typeof shkHouse === "function") {
(function () {
var oh = shkHouse;
shkHouse = function (P, o, R) {
if (SHKST.inSouth && o && shkstCovers(o)) {
var ss = shkSolid, ed = window.evbWorldDoor, dummy = new THREE.Group();
shkSolid = function (s) { return s; };
window.evbWorldDoor = function () { return null; };
try {
return oh.call(this, dummy, o, R);
}
finally {
shkSolid = ss;
window.evbWorldDoor = ed;
dummy.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); });
}
}
return oh.apply(this, arguments);
};
})();
}
if (typeof shkSouth === "function") {
(function () { var os = shkSouth; shkSouth = function (R) { SHKST.inSouth = 1; try {
return os.apply(this, arguments);
}
finally {
SHKST.inSouth = 0;
} }; })();
}
if (typeof shkLondonFolk === "function") {
(function () { var of = shkLondonFolk; shkLondonFolk = function (R) { var r = of.apply(this, arguments); try {
shkstBuild();
}
catch (e) {
if (window.console)
console.warn("[shakespeare] streets", e);
} return r; }; })();
}
