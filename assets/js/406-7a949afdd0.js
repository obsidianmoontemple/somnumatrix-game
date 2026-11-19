/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GLD_XP = [0, 60, 180, 420, 900];
var GLD_GUILDS = [
{ k: "artisans", name: "The Artisans' Guild", icon: "🪚", open: true, built: true, where: "The Commons, on the outer side of Lantern Street",
pos: { rs: 1280, side: 1, a: -0.178, w: 32, d: 24 }, col: { wall: 0xE8DCC0, beam: 0x3A2614, roof: 0x5A3A2A, trim: 0xB0802A, glow: 0xFFC878 },
about: "Woodworkers, weavers, tailors, potters, glassblowers and jewellers: the city house of the Guild of Hands.",
master: { name: "Hester Quarles", sex: "f", age: 61, title: "Warden of the Artisans' Guild", look: { hair: "#C8C4BC", hairStyle: "bun" },
persona: "You are a master weaver and the Warden of the Artisans' Guild of Somnucor. Warm but exacting: you test everyone's hands before you trust their words, you hum at the loom, and you can tell the story of every piece in the guild's gallery and who made it. You cannot abide shoddy work or a joint glued that should have been cut. You love an apprentice who asks why. You speak plainly, with a weaver's sayings ('measure twice, cut once', 'a loose thread runs the whole cloth')." },
ranks: ["Apprentice", "Journeyman", "Craftsman", "Master Craftsman", "Warden of the Hall"],
opens: ["the workshops and the Great Hall", "the glass room and work out in the city", "the jeweller's room", "the masterpiece room and the Warden's rooms", "a seat at the Warden's table"],
jobs: [
{ id: "art_lathe", n: "Turn chair legs at the lathe", m: 6, at: "hall:lathe", xp: 12, g: 10, r: 1, how: "Turn four legs to match, true and smooth." },
{ id: "art_loom", n: "Weave a length of cloth", m: 10, at: "hall:loom", xp: 20, g: 18, r: 1, how: "Warp is on. Weave two yards, even and tight." },
{ id: "art_wheel", n: "Throw a set of bowls", m: 8, at: "hall:wheel", xp: 16, g: 14, r: 1, how: "Centre the clay and throw six bowls of one size." },
{ id: "art_glass", n: "Blow a lamp glass", m: 12, at: "hall:glass", xp: 26, g: 24, r: 2, how: "Gather, blow and shape a chimney for a street lamp." },
{ id: "art_mend", n: "Mend a customer's furniture", m: 12, at: "city", places: ["The Somnucor Inn", "The Tavern", "The Cookhouse", "The Bakery", "The Barber's"], xp: 28, g: 26, r: 2, how: "Go to the shop, take the broken chair apart and make it good." },
{ id: "art_jewel", n: "Set a stone in a ring", m: 15, at: "hall:jewel", xp: 34, g: 32, r: 3, how: "Cut the seat, set the stone, close the claws and polish." },
{ id: "art_master", n: "Make your masterpiece", m: 30, at: "hall:masterpiece", xp: 120, g: 0, r: 4, how: "One piece, your best, judged by the Warden and hung in the gallery." }
] },
{ k: "smiths", name: "The Worshipful Company of Smiths", icon: "⚒️", open: true, built: true, where: "The Market Ring, on the inner side of the street, east of the Smithy",
pos: { rs: 1080, side: -1, a: 0.75, w: 30, d: 22 }, col: { wall: 0x6A625A, beam: 0x2A2420, roof: 0x3A3634, trim: 0x8A5A2A, glow: 0xFF8A3A },
about: "Smiths, armourers and farriers: the forge floor, the proving room and the Company's hall.",
master: { name: "Bartholomew Crane", sex: "m", age: 54, title: "Prime Warden of the Worshipful Company of Smiths", look: { hair: "#2A2420", hairStyle: "bald" },
persona: "You are the Prime Warden of the Worshipful Company of Smiths. A big, slow-spoken man with old burn scars on his forearms and a dry sense of humour. You use few words and mean all of them. You judge people by how they hold a hammer and whether they come back after a hard day. You are fiercely proud of the Company's charter, its plate and its long roll of masters. You speak of iron the way others speak of the weather." },
ranks: ["Striker", "Journeyman Smith", "Smith", "Master Smith", "Warden of the Company"],
opens: ["the forge floor and the Company's hall", "the farrier's bay and work out in the city", "the proving room", "the armourer's hearth and the Warden's rooms", "a seat at the Warden's table"],
jobs: [
{ id: "smi_strike", n: "Strike for the master at the anvil", m: 6, at: "hall:anvil", xp: 12, g: 10, r: 1, how: "Swing the sledge where the master's hammer taps." },
{ id: "smi_blade", n: "Draw out and forge a blade", m: 12, at: "hall:hearth", xp: 24, g: 22, r: 1, how: "Heat, draw, shape and quench a long knife." },
{ id: "smi_shoe", n: "Shoe a horse", m: 10, at: "city", places: ["The Stables", "The Transport Yard", "The Farmhouse"], xp: 22, g: 20, r: 2, how: "Go to the yard, take off the old shoes and fit four new." },
{ id: "smi_gate", n: "Mend a gate's ironwork", m: 14, at: "city", places: ["The Gaol", "The Courthouse", "The City Depot", "The Bank of Somnucor"], xp: 30, g: 28, r: 2, how: "Go there, take down the bent bar, forge it true and hang it." },
{ id: "smi_proof", n: "Prove a blade at the proving post", m: 8, at: "hall:proof", xp: 20, g: 16, r: 3, how: "Test the edge, the spring and the temper. Mark it or break it." },
{ id: "smi_plate", n: "Forge a suit of plate", m: 25, at: "hall:armour", xp: 70, g: 60, r: 4, how: "Breastplate, back and tassets, fitted to the stand." }
] },
{ k: "merchants", name: "The Merchant Venturers", icon: "⚖️", open: true, built: true, where: "The Civic Ring, facing the Tower",
pos: { rs: 245, side: 1, a: -0.0888, w: 30, d: 22 }, col: { wall: 0xE4DED2, beam: 0x6A5A4A, roof: 0x4A5A6A, trim: 0xC8A040, glow: 0xFFE0A0 },
about: "Traders, shopkeepers and caravan masters: the trading floor, the counting house and the map room.",
master: { name: "Ottoline Vane", sex: "f", age: 47, title: "Governor of the Merchant Venturers", look: { hair: "#6A3A1A", hairStyle: "ponytail" },
persona: "You are the Governor of the Merchant Venturers of Somnucor. Sharp, charming and quick with numbers; you are always bargaining, even over a cup of tea. You talk of ships, caravans and the price of everything, and you know which shop in the Market Ring is doing well this week. Generous to the honest, merciless to cheats. You keep a ledger in your head and a pencil behind your ear." },
ranks: ["Clerk", "Factor", "Venturer", "Merchant Adventurer", "Governor's Councillor"],
opens: ["the trading floor and the counting house", "stocktaking out in the city", "the map room", "the strongroom and the Governor's rooms", "a seat on the Governor's council"],
jobs: [
{ id: "mer_count", n: "Count the takings in the counting house", m: 6, at: "hall:ledger", xp: 12, g: 10, r: 1, how: "Count, check and enter the day's coin in the ledger." },
{ id: "mer_carry", n: "Carry a consignment to a shop", m: 8, at: "city", places: ["The General Store", "The Chandlery", "The Greengrocer's", "The Print Shop", "The Toy Shop", "The Bindery", "The Cobbler's", "The Pottery", "The Florist's"], xp: 18, g: 16, r: 1, how: "Take the goods to the shop, unpack them and have them counted." },
{ id: "mer_stock", n: "Take stock at a shop", m: 12, at: "city", places: ["The General Store", "The Chandlery", "The Jeweller's", "The Tailor's", "The Watchmaker's", "The Apothecary", "The Somnucor Wholesale Warehouse"], xp: 26, g: 24, r: 2, how: "Go there and count every shelf against the book." },
{ id: "mer_floor", n: "Strike a bargain on the trading floor", m: 10, at: "hall:floor", xp: 24, g: 22, r: 2, how: "Buy low, sell high, and shake on it." },
{ id: "mer_caravan", n: "Draw up a caravan's papers", m: 15, at: "hall:maps", xp: 36, g: 34, r: 3, how: "Route, cargo, insurance and the tolls on the way." }
] },
{ k: "masons", name: "The Masons and Builders", icon: "🧱", open: true, built: false, where: "The New Quarter", about: "Masons, carpenters, glaziers: the trades that mend the city." },
{ k: "healers", name: "The Healers and Herbalists", icon: "🌿", open: true, built: true, where: "The Civic Ring, on the outer side of the street, along from the City Hospital, with a walled physic garden",
pos: { rs: 245, side: 1, a: 0.08, w: 30, d: 24 }, col: { wall: 0xD8D0C0, beam: 0x4A5A3A, roof: 0x5A6A4A, trim: 0x6A8A4A, glow: 0xE8F0D0 },
about: "Healers, nurses and herbalists: the still room, the physic garden, the infirmary and the Physician's study.",
master: { name: "Agnes Marlow", sex: "f", age: 58, title: "Mistress of the Healers and Herbalists", look: { hair: "#8A8078", hairStyle: "bun" },
persona: "You are Agnes Marlow, Mistress of the Healers and Herbalists of Somnucor. Brisk, warm and unshockable; forty years of nursing have taught you that most people only need rest, water and someone to listen. You smell of lavender and carbolic. You love your physic garden more than most people, and you will talk about any plant in it for as long as anyone lets you. In the dream city you heal the dreamers' hurts; you never give real-world medical advice, and if someone is truly unwell in waking life you gently tell them to see a real doctor." },
ranks: ["Orderly", "Nurse", "Herbalist", "Physician", "Mistress's Own"],
opens: ["the still room and the physic garden", "the infirmary and calls out in the city", "the herbarium", "the Physician's study", "a seat at the Mistress's table"],
jobs: [
{ id: "hea_still", n: "Make up remedies in the still room", m: 8, at: "hall:still", xp: 16, g: 12, r: 1, how: "Grind, steep and bottle the day's salves and draughts for the city's dreamers." },
{ id: "hea_garden", n: "Tend the physic garden", m: 10, at: "hall:garden", xp: 18, g: 14, r: 1, how: "Weed, water and cut the beds of feverfew, comfrey and chamomile." },
{ id: "hea_ward", n: "Sit with the sick in the infirmary", m: 12, at: "hall:ward", xp: 24, g: 20, r: 2, how: "Bathe brows, change dressings, keep watch through the hours." },
{ id: "hea_call", n: "Make a call in the city", m: 12, at: "city", places: ["The City Hospital", "The City School", "The Commons School", "The Somnucor Inn", "The Gaol", "The Post Office"], xp: 28, g: 24, r: 2, how: "Go there, see to the one who sent for a healer, and stay until they are easy." },
{ id: "hea_herb", n: "Press and name the herbarium's sheets", m: 15, at: "hall:herbarium", xp: 34, g: 30, r: 3, how: "Dry, press, mount and label each plant in a fair hand." }
] },
{ k: "scribes", name: "The Scriveners and Scholars", icon: "📜", open: true, built: true, where: "The High Ring, an old townhouse on the outer side of the street",
pos: { rs: 565, side: 1, a: 0.92, w: 24, d: 20 }, col: { wall: 0x8A6A4A, beam: 0x3A2A1A, roof: 0x3A3A40, trim: 0xC8A040, glow: 0xFFE0A0 },
about: "Copyists, map-makers and archivists: the copying room, the map room, the reading room and, behind a shelf, the sealed stacks.",
master: { name: "Ambrose Pell", sex: "m", age: 71, title: "Master of the Scriveners and Scholars", look: { hair: "#C8C4BC", hairStyle: "short" },
persona: "You are Ambrose Pell, Master of the Scriveners and Scholars. A tall, stooped, gentle old scholar with ink on his fingers and spectacles on a ribbon. You speak carefully and love a good question more than a good answer. You quote old books (always ones written before 1930), correct spelling without meaning to, and grow quietly fierce about anyone who mistreats a book. You know the city's history better than anyone alive." },
ranks: ["Copyist", "Scrivener", "Archivist", "Scholar", "Keeper of the Stacks"],
opens: ["the copying room and the reading room", "errands to the city's archives", "the map room", "the sealed stacks", "a key to the stacks of your own"],
jobs: [
{ id: "scr_copy", n: "Copy a page fair", m: 8, at: "hall:copy", xp: 14, g: 12, r: 1, how: "Rule the page, copy the old hand line by line, and blot it." },
{ id: "scr_index", n: "Index the reading room's new books", m: 10, at: "hall:reading", xp: 18, g: 14, r: 1, how: "Title, author, shelf: a card for every book." },
{ id: "scr_fetch", n: "Fetch and return books for a reader", m: 10, at: "city", places: ["The City Archive", "The Somnucor Public Library", "The Map House", "The Bindery", "The Print Shop"], xp: 22, g: 18, r: 2, how: "Go there, find what is asked for, and sign it out or back in." },
{ id: "scr_map", n: "Draw a street map of a quarter", m: 15, at: "hall:maps", xp: 34, g: 30, r: 3, how: "Survey notes into a fair map, with every street named." },
{ id: "scr_stack", n: "Mend an old book in the sealed stacks", m: 20, at: "hall:stacks", xp: 50, g: 44, r: 4, how: "Resew the binding, mend the torn leaves, and make a new case." }
] },
{ k: "bards", name: "The Bards and Players", icon: "🎻", open: true, built: true, where: "The Riad Quarter, on the inner side of the Commons street, round a courtyard playhouse",
pos: { rs: 1280, side: -1, a: 1.45, w: 32, d: 26 }, col: { wall: 0xC89A6A, beam: 0x5A2A1A, roof: 0x8A3A2A, trim: 0xD8A040, glow: 0xFFC890 },
about: "Musicians, players and storytellers: the courtyard playhouse, the music room, the wardrobe and the green room.",
master: { name: "Lorcan Fairweather", sex: "m", age: 44, title: "Master of the Revels of the Bards and Players", look: { hair: "#8A3A1A", hairStyle: "long" },
persona: "You are Lorcan Fairweather, Master of the Revels of the Bards and Players. Big-voiced, quick to laugh, a fiddler and a teller of tales who cannot pass a doorway without making an entrance. Under the show you are a hard taskmaster at rehearsal and kind to anyone with stage fright. You love the old ballads and the old plays (Shakespeare, Marlowe, the folk tales), and you will break into a verse at the slightest excuse." },
ranks: ["Prompter", "Player", "Bard", "Master Player", "Master of the Revels' Own"],
opens: ["the playhouse and the music room", "playing out in the city", "the wardrobe and leading parts", "the green room and the Master's rooms", "a say in the season's plays"],
jobs: [
{ id: "bar_rehearse", n: "Rehearse on the playhouse stage", m: 10, at: "hall:stage", xp: 18, g: 14, r: 1, how: "Run the scene again and again until the words come by themselves." },
{ id: "bar_tune", n: "Practise in the music room", m: 8, at: "hall:music", xp: 14, g: 12, r: 1, how: "Scales, then the tune, then the tune again faster." },
{ id: "bar_play", n: "Play for the crowd in the city", m: 12, at: "city", places: ["The Tavern", "The Somnucor Inn", "The Runners' Hall", "The Greenwold Gate", "The Hall of Doors"], xp: 26, g: 24, r: 2, how: "Go there, find a corner, and play until the hat is full." },
{ id: "bar_sew", n: "Make a costume in the wardrobe", m: 15, at: "hall:wardrobe", xp: 30, g: 26, r: 3, how: "Cut, pin and sew a costume for the next play." },
{ id: "bar_lead", n: "Play the lead in tonight's show", m: 20, at: "hall:stage", xp: 50, g: 44, r: 4, how: "The house is full. Go on, and make them weep." }
] },
{ k: "mariners", name: "The Mariners' Guild", icon: "⚓", open: true, built: true, where: "The Docks, on the inner side of the quay road, by the Dock Office",
pos: { rs: 1790, side: -1, a: -1.25, w: 30, d: 22 }, col: { wall: 0x6A6058, beam: 0x2A3A4A, roof: 0x3A4A5A, trim: 0xE8E0C8, glow: 0xFFE0A0 },
about: "Sailors, pilots and ships' crews: the quarterdeck hall, the chart room, the rope walk and the sail loft.",
master: { name: "Isolde Ferris", sex: "f", age: 63, title: "Master Mariner of the Mariners' Guild", look: { hair: "#C8C0B0", hairStyle: "short" },
persona: "You are Isolde Ferris, Master Mariner of the Mariners' Guild. Weathered, steady and blunt, with a voice built for shouting over gales. You have sailed every dream sea there is and you measure people by how they behave in bad weather. You talk in knots, tides and fathoms, you can tie any knot one-handed, and you have no patience for anyone who calls a rope a string. You are proud of your crews and protective of the young ones." },
ranks: ["Deckhand", "Able Seaman", "Bosun", "Pilot", "Master Mariner's Own"],
opens: ["the quarterdeck hall and the rope walk", "work on the quay", "the sail loft", "the chart room", "a ship of your own to name"],
jobs: [
{ id: "mar_rope", n: "Lay a rope on the rope walk", m: 8, at: "hall:rope", xp: 14, g: 12, r: 1, how: "Spin the yarn, twist the strands, lay the rope the length of the walk." },
{ id: "mar_knots", n: "Learn the knots at the knot board", m: 6, at: "hall:knots", xp: 12, g: 0, r: 1, how: "Bowline, clove hitch, sheet bend, till your hands know them in the dark." },
{ id: "mar_quay", n: "Load a ship on the quay", m: 12, at: "city", places: ["The Fish Quay", "The Dock Office", "The Harbourmaster's House", "The Ferry Light", "The Moat Boathouse", "The Transport Depot"], xp: 26, g: 24, r: 2, how: "Go there and carry, stow and lash the cargo." },
{ id: "mar_sail", n: "Mend a sail in the sail loft", m: 15, at: "hall:sails", xp: 30, g: 28, r: 3, how: "Palm and needle: patch the canvas, rope the edge." },
{ id: "mar_chart", n: "Plot a passage in the chart room", m: 15, at: "hall:charts", xp: 40, g: 36, r: 4, how: "Tides, soundings and stars, laid off on the chart." }
] },
{ k: "hunters", name: "The Hunters and Wardens", icon: "🏹", open: true, built: false, where: "The Harvest Ring, facing the Nightmare Wilds", about: "Beast hunts, tracking and guarding the edge." },
{ k: "lamp", name: "The Circle of the Lamp", icon: "🪔", open: true, built: false, where: "Temple Row, a tower", about: "Grown practitioners of the arts the Academy teaches." },
{ k: "decorators", name: "The Decorators' Guild", icon: "🎨", open: true, built: false, where: "The Commons (its own hall to come)", about: "The city's decorators: the seasons, the lanterns, the quarters." },
{ k: "miners", name: "The Miners' Guild", icon: "⛏️", open: true, built: false, where: "The Warrens (a city office; the guild itself works in the mines)", about: "Built in the mines themselves." },
{ k: "thieves", name: "The Quiet Hands", icon: "🗝️", open: false, built: true, where: "Under the Warrens: down the alley beside the Rag and Bone Yard, through its back store",
pos: { yard: "The Rag and Bone Yard", along: 13.5, out: 5, w: 6, d: 6 }, col: { wall: 0x5A4434, beam: 0x2A1E16, roof: 0x3A3A3A, trim: 0x6A5A3A, glow: 0xFFB050 },
about: "Thieves. Never the poor, never a home, never anyone hurt.",
master: { name: "Silas Wick", sex: "m", age: 68, title: "the Uncle of the Quiet Hands", look: { hair: "#D8D4CC", hairStyle: "short" },
persona: "You are Silas Wick, called the Uncle, master of the Quiet Hands, the thieves of Somnucor. Soft-spoken and courteous; you never raise your voice and never need to. You keep the guild's three rules and expect everyone to: never the poor, never a home, never anyone hurt. You quote old proverbs, you know every face in the Warrens, and you remember every debt, owed and paid. You are fond of the young ones and hard on the greedy. The Dragon Corp is a respected opponent, never a hated one." },
ranks: ["Sparrow", "Lightfinger", "Shadow", "Night Master", "the Uncle's Right Hand"],
opens: ["the Counting Cellar, the practice room and the fence", "the crowd work (pockets)", "the map room", "the Uncle's own rooms", "a seat at the Uncle's table"],
jobs: [
{ id: "thf_locks", n: "Practise on the lock boards", m: 6, at: "hall:locks", xp: 12, g: 0, r: 1, how: "The old boards of practice locks. Nimble fingers, quiet hands." },
{ id: "thf_dummy", n: "Lift from the bell dummy", m: 5, at: "hall:dummy", xp: 10, g: 0, r: 1, how: "Take the purse off the dummy without a single bell ringing." },
{ id: "thf_case", n: "Case a shop", m: 8, at: "case", xp: 16, g: 0, r: 1, how: "Go and watch the shop from across the street: who comes, who goes, where the takings are kept. A cased shop is a safer job." },
{ id: "thf_lift", n: "Lift the takings from a shop", m: 5, at: "lift", xp: 30, g: 40, r: 1, how: "A real job at a real shop. It will be reported, the Dragon Corp will come, and if they catch you, you will stand trial." },
{ id: "thf_fence", n: "Fence the goods", m: 6, at: "hall:fence", xp: 14, g: 20, r: 1, how: "Bring what you lifted to the fence and haggle. Only after a lift." },
{ id: "thf_pocket", n: "Work the crowd", m: 4, at: "pocket", xp: 24, g: 25, r: 2, how: "A busy door, a full purse, a light touch. Reported, chased, and tried if caught." }
] },
{ k: "smugglers", name: "The Tidewater Ring", icon: "🛶", open: false, built: true, where: "A sea cave under the Docks, through the great tun in a quayside cooper's store",
pos: { rs: 1790, side: 1, a: -1.2, w: 10, d: 10 }, col: { wall: 0x5A4A3A, beam: 0x2A2018, roof: 0x3A3430, trim: 0x4A3A2A, glow: 0xFFC070 },
about: "Smugglers of dream goods: the cave, the landing stage, the hidden store and the Captain's cabin.",
master: { name: "Jago Penhallow", sex: "m", age: 49, title: "Captain of the Tidewater Ring", look: { hair: "#2A2420", hairStyle: "long" },
persona: "You are Jago Penhallow, Captain of the Tidewater Ring, the smugglers of Somnucor. A lean, sea-burnt man with an easy grin and a gold ring in one ear. You are charming, loyal to your crew and contemptuous of the Customs men. You smuggle only dream goods inside the game (silks, spices, lamp oil, rare dream-glass) and you never talk about how to smuggle anything in waking life. Your rule: nobody gets hurt, and nobody talks." },
ranks: ["Tide-runner", "Oarsman", "Lander", "First Mate", "the Captain's Own"],
opens: ["the cave, the landing stage and the store", "running cargo to the quay", "the tally room", "the Captain's cabin", "a share of every run"],
jobs: [
{ id: "smu_row", n: "Row the cave run", m: 6, at: "hall:boat", xp: 12, g: 0, r: 1, how: "Row the boat out to the cave mouth and back on the turn of the tide, quietly." },
{ id: "smu_stow", n: "Stow a cargo in the hidden store", m: 8, at: "hall:store", xp: 16, g: 12, r: 1, how: "Carry the bales up from the landing stage and hide them behind the false wall." },
{ id: "smu_land", n: "Run a cargo to the quay", m: 10, at: "city", places: ["The Fish Quay", "The Ferry Light", "The Moat Boathouse", "The Somnucor Wholesale Warehouse"], xp: 24, g: 30, r: 2, how: "Take the goods to the quay unseen and hand them on." },
{ id: "smu_tally", n: "Keep the tally of the run", m: 12, at: "hall:tally", xp: 30, g: 26, r: 3, how: "Every bale counted in and out, every share written down." }
] },
{ k: "spies", name: "The Listening Room", icon: "👁️", open: false, built: false, where: "Above a tailor's in a Market Ring side lane, through the fitting-room mirror", about: "Spies and informers." },
{ k: "ashen", name: "The Ashen Hand", icon: "🔥", open: false, built: false, where: "Under a ruined watch-house at the edge of the Nightmare Wilds, down the dry well", about: "Bounty fighters, only where fighting is allowed." },
{ k: "spider", name: "The Spider Guild", icon: "🕷️", open: false, built: true, where: "Under an old silk-weaver's house in a High Ring back lane, through the great loom",
pos: { rs: 430, side: 1, a: -2.4536, w: 12, d: 14 }, col: { wall: 0x8A7A6A, beam: 0x2A1E1A, roof: 0x2A2A30, trim: 0x4A3A4A, glow: 0xC890FF },
about: "Assassins and venomous foes. Their marks are only ever where fighting is allowed.",
master: { name: "Morwenna Thrale", sex: "f", age: 52, title: "the Matron of the Spider Guild", look: { hair: "#101014", hairStyle: "long" },
persona: "You are Morwenna Thrale, the Matron of the Spider Guild, the assassins of Somnucor. Cold, elegant and precise; you speak slowly and quietly and never threaten anyone openly. You admire patience above every other virtue and despise the clumsy and the boastful. A small black spider called Needle rides on your shoulder and you speak to her now and then. You wear black silk and a veil of fine web lace. Your guild takes marks only where fighting is allowed: beasts and outlaws in the Dangerous and Deadly places, never the safe streets and never a child. You know of the White Widow, the mind of the Somnucor Tower, and you respect her as one spider respects another; you are not her and never claim to be." },
ranks: ["Spiderling", "Silkwalker", "Fang", "Venom Master", "the Matron's Own"],
opens: ["the Web Gallery, the dart gallery and the silk beam", "venom on your blades and the venom garden", "hard marks in the Deadly places", "the Matron's hall and the trophy hall", "a seat at the Matron's side"],
jobs: [
{ id: "spd_darts", n: "Train at the dart gallery", m: 6, at: "hall:darts", xp: 12, g: 0, r: 1, how: "Thirty darts at the far targets, still and silent." },
{ id: "spd_beam", n: "Walk the silk beam", m: 5, at: "hall:beam", xp: 10, g: 0, r: 1, how: "Cross and turn on the beam above the pit, without a sound." },
{ id: "spd_tend", n: "Tend the venom garden", m: 8, at: "hall:garden", xp: 16, g: 12, r: 2, how: "Feed and water the creatures and the poison beds behind the glass. Gloves on." },
{ id: "spd_mark", n: "Take a mark", m: 0, at: "mark", n2: 1, lv: 3, xp: 60, g: 60, r: 1, how: "A mark in a Dangerous place. Go there and bring it down. You have two hours." },
{ id: "spd_hard", n: "Take a hard mark", m: 0, at: "mark", n2: 3, lv: 4, xp: 150, g: 150, r: 3, how: "Three marks in a Deadly place. Two hours." }
] }
];
var GLD_BY = {};
GLD_GUILDS.forEach(function (G) { GLD_BY[G.k] = G; });
function gldJob(id) { var j = null; GLD_GUILDS.forEach(function (G) { (G.jobs || []).forEach(function (J) { if (J.id === id)
j = J; }); }); return j; }
function gldGuildOfJob(id) { var k = ""; GLD_GUILDS.forEach(function (G) { (G.jobs || []).forEach(function (J) { if (J.id === id)
k = G.k; }); }); return k; }
function gldRankOf(xp) { var r = 1; for (var i = 1; i < GLD_XP.length; i++)
if ((+xp || 0) >= GLD_XP[i])
r = i + 1; return r; }
function gldDefaults() {
var g = {};
GLD_GUILDS.forEach(function (G) { g[G.k] = { on: true, door: true, persona: "", notes: "" }; });
return { open: true, talk: true, pay: true, paycap: 300, guilds: g, notes: "" };
}
function gldMerge(c) {
var d = gldDefaults();
if (!c || typeof c !== "object")
return d;
var o = { open: c.open !== false, talk: c.talk !== false, pay: c.pay !== false, paycap: Math.max(0, Math.min(5000, Math.round(+c.paycap >= 0 && c.paycap !== "" && c.paycap !== null && c.paycap !== undefined ? +c.paycap : 300))), guilds: {}, notes: String(c.notes || "").slice(0, 1200) };
GLD_GUILDS.forEach(function (G) {
var s = (c.guilds && c.guilds[G.k]) || {};
o.guilds[G.k] = { on: s.on !== false, door: s.door !== false, persona: String(s.persona || "").slice(0, 1500), notes: String(s.notes || "").slice(0, 800) };
});
return o;
}
var GLD = { cfg: null, cfgAt: 0, me: null, meAt: 0, meAsk: null, G: null, K: null, k: "", lite: false, t: 0, pt: 0, mats: {}, geos: {}, myFn: null, room: "", wantAt: null, beatT: 0 };
var GLK = null;
function gldCfg() {
if (!GLD.cfg || Date.now() - GLD.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("city_guilds") : null;
GLD.cfg = gldMerge(c);
GLD.cfgAt = Date.now();
}
return GLD.cfg;
}
function gldLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE) || (typeof VR !== "undefined" && VR && VR.on); }
function gldKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function gldSigned() { return typeof signedIn === "function" && signedIn(); }
function gldAdult() { try {
return typeof ageAdult === "function" ? ageAdult() : false;
}
catch (e) {
return false;
} }
function gldEsc(s) { return (typeof esc === "function") ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function gldSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function gldMat(col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (GLD.mats[k])
return GLD.mats[k];
var m = o.phong && !GLD.lite ? new THREE.MeshPhongMaterial({ color: col, shininess: o.phong, specular: o.spec || 0x444444 }) : new THREE.MeshLambertMaterial({ color: col });
if (tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
GLD.mats[k] = m;
return m;
}
function gldGlowM(col, op) { var k = "glow|" + col + "|" + (op || 1); if (!GLD.mats[k])
GLD.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); return GLD.mats[k]; }
function gldCanvasMat(key, w, h, draw, o) {
o = o || {};
var k = "cv|" + key;
if (GLD.mats[k])
return GLD.mats[k];
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d");
try {
draw(x, w, h);
}
catch (e) { }
var t = new THREE.CanvasTexture(cv);
if (o.rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(o.rep[0], o.rep[1]);
}
var m = o.basic ? new THREE.MeshBasicMaterial({ map: t, transparent: !!o.op, opacity: o.op || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide })
: new THREE.MeshLambertMaterial({ map: t, transparent: !!o.op, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
if (o.e) {
m.emissive = new THREE.Color(0xFFFFFF);
m.emissiveMap = t;
m.emissiveIntensity = o.e;
}
GLD.mats[k] = m;
return m;
}
function gldCloth(col, col2, border) {
var hx = function (c) { return "#" + ("000000" + c.toString(16)).slice(-6); };
return gldCanvasMat("cloth|" + col + "|" + col2 + "|" + (border || 0), 128, 128, function (x, W, H) {
x.fillStyle = hx(col);
x.fillRect(0, 0, W, H);
x.globalAlpha = 0.18;
x.fillStyle = hx(col2);
for (var i = 0; i < W; i += 4) {
x.fillRect(i, 0, 1, H);
x.fillRect(0, i, W, 1);
}
x.globalAlpha = 1;
if (border) {
x.strokeStyle = hx(border);
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
x.lineWidth = 2;
x.strokeRect(18, 18, W - 36, H - 36);
}
}, { rep: [1, 1] });
}
function gldP() { return (GLK && GLK.F) || GLD.G; }
function gldBox(w, h, d, mat, x, y, z, parent) {
var k = w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = GLD.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
GLD.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || gldP()).add(m);
return m;
}
function gldSeg(n) { return GLD.lite ? Math.max(6, Math.round(n * 0.55)) : n; }
function gldCyl(r, h, mat, x, y, z, parent, seg, r2) {
var k = "c" + r.toFixed(3) + "," + (r2 === undefined ? r : r2).toFixed(3) + "," + h.toFixed(2) + "," + gldSeg(seg || 14), g = GLD.geos[k];
if (!g) {
g = new THREE.CylinderGeometry(r, r2 === undefined ? r : r2, h, gldSeg(seg || 14));
GLD.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || gldP()).add(m);
return m;
}
function gldSph(r, mat, x, y, z, parent, seg) {
var s = gldSeg(seg || 14), k = "s" + r.toFixed(3) + "," + s, g = GLD.geos[k];
if (!g) {
g = new THREE.SphereGeometry(r, s, Math.max(5, (s * 0.7) | 0));
GLD.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || gldP()).add(m);
return m;
}
function gldPlane(w, h, mat, x, y, z, ry, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; (parent || gldP()).add(m); return m; }
function gldGroup(x, y, z, ry, parent) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; (parent || gldP()).add(g); return g; }
function gldCtx() { return { F: null, solids: [], floors: [], ramps: [], spots: [], secrets: [], flames: [], rooms: [], people: [], stations: {}, fx: [], spin: [] }; }
function gldSolid(x, z, hw, hd, b, h, rot) { var S = { x: x, z: z, hw: hw, hd: hd, b: b || 0, h: h || 3, rot: rot || 0 }; GLK.solids.push(S); return S; }
function gldRound(x, z, r, b, h) { var S = { x: x, z: z, r: r, b: b || 0, h: h || 3 }; GLK.solids.push(S); return S; }
function gldFloor(x0, z0, x1, z1, y) { GLK.floors.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y }); }
function gldRampAt(x0, z0, x1, z1, axis, a0, y0, a1, y1) { GLK.ramps.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), axis: axis, a0: a0, y0: y0, a1: a1, y1: y1 }); }
function gldGroundIn(K, x, z, feet) { return __ZC(406, 0, this, arguments, new.target); }
function gldSurfaceIn(K, x, z, lo, hi) { return __ZC(406, 1, this, arguments, new.target); }
function gldRoomAt(K, x, z, feet) {
var best = null;
(K.rooms || []).forEach(function (r) { if (x >= r.x0 - 0.35 && x <= r.x1 + 0.35 && z >= r.z0 - 0.35 && z <= r.z1 + 0.35 && feet >= r.y - 0.8 && feet < r.y + r.h - 0.5 && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r; });
return best;
}
function gldCeilAt(K, x, z, feet) {
var c = null;
(K.rooms || []).forEach(function (r) {
if (x < r.x0 - 0.35 || x > r.x1 + 0.35 || z < r.z0 - 0.35 || z > r.z1 + 0.35)
return;
if (feet < r.y - 0.8 || feet > r.y + r.h - 0.2)
return;
var top = r.y + r.h;
if (c === null || top < c)
c = top;
});
return c;
}
function gldHold(K) { return __ZC(406, 2, this, arguments, new.target); }
function gldSpot(x, z, r, name, verb, fn, o) { o = o || {}; var S = { x: x, z: z, r: r, y: o.y || 0, name: name, verb: verb, fn: fn, when: o.when || null }; GLK.spots.push(S); return S; }
function gldWall(dir, a, b, c, y, h, t, mat, opens, o) { return __ZC(406, 3, this, arguments, new.target); }
function gldRoom(R) { return __ZC(406, 4, this, arguments, new.target); }
function gldInRoom(K, x, z, feet) { var R = K.rooms || []; for (var i = 0; i < R.length; i++) {
var r = R[i];
if (x >= r.x0 - 0.9 && x <= r.x1 + 0.9 && z >= r.z0 - 0.9 && z <= r.z1 + 0.9 && (feet === undefined || (feet >= r.y - 1.2 && feet <= r.y + r.h)))
return true;
} return false; }
function gldSign(lines, w, h, bg, fg, x, y, z, ry, parent) {
if (typeof wSign !== "function")
return null;
var s = wSign(lines, w, h, bg, fg);
s.position.set(x, y, z);
s.rotation.y = ry || 0;
(parent || gldP()).add(s);
s.userData.keep = 1;
return s;
}
function gldFlame(x, y, z, s, col, parent) {
var P = parent || gldP(), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var core = new THREE.Mesh(new THREE.ConeGeometry(0.05 * s, 0.22 * s, 8), new THREE.MeshBasicMaterial({ color: col || 0xFFB050, transparent: true, opacity: 0.95 }));
core.position.y = 0.11 * s;
g.add(core);
var gl = (typeof wGlow === "function") ? wGlow(col || 0xFF9A40, 0.9 * s, 0.55) : null;
if (gl) {
gl.position.y = 0.14 * s;
g.add(gl);
}
var F = { g: g, core: core, gl: gl, s: s, ph: Math.random() * 20, base: 0.55 };
g.userData.keep = 1;
GLK.flames.push(F);
return F;
}
function gldCandle(x, y, z, s, parent) {
s = s || 1;
var P = parent || gldP();
gldCyl(0.035 * s, 0.24 * s, gldMat(0xEEE6D4, null), x, y + 0.12 * s, z, P, 8);
return gldFlame(x, y + 0.24 * s, z, s, 0xFFB050, P);
}
function gldLantern(x, y, z, col, chain, parent) {
var P = parent || gldP(), ir = gldMat(0x1A1816, "metal"), g = gldGroup(x, y, z, 0, P);
if (chain)
gldCyl(0.012, chain, ir, 0, chain / 2 + 0.3, 0, g, 4);
gldCyl(0.13, 0.04, ir, 0, 0.28, 0, g, 8);
gldCyl(0.1, 0.03, ir, 0, -0.02, 0, g, 8);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { gldBox(0.015, 0.3, 0.015, ir, q[0] * 0.085, 0.13, q[1] * 0.085, g); });
gldBox(0.16, 0.26, 0.16, gldMat(0xFFE8B0, null, { op: 0.35 }), 0, 0.13, 0, g);
gldFlame(0, 0.02, 0, 1.1, col || 0xFFB050, g);
return g;
}
function gldChandelier(x, y, z, r, n, parent) { return __ZC(406, 5, this, arguments, new.target); }
function gldFlamesTick(t, list) {
var step = GLD.lite ? 2 : 1, off = (Math.floor(t * 10) % step);
for (var i = off; i < list.length; i += step) {
var F = list[i];
var k = 1 + 0.09 * Math.sin(t * 3.7 + F.ph) + 0.06 * Math.sin(t * 5.3 + F.ph * 1.7);
F.core.scale.set(1, k, 1);
if (F.gl)
F.gl.material.opacity = Math.max(0.2, Math.min(0.85, F.base * (0.92 + 0.08 * Math.sin(t * 2.9 + F.ph))));
}
}
function gldSecret(o) { return __ZC(406, 6, this, arguments, new.target); }
function gldSecretTry(S) { return __ZC(406, 7, this, arguments, new.target); }
function gldSecretsTick(dt, list) { return __ZC(406, 8, this, arguments, new.target); }
function gldPiece(x, y, z, ry, parent) { return gldGroup(x, y, z, ry || 0, parent); }
function gldToRoot(g, lx, ly, lz) {
var x = lx, y = ly, z = lz, ry = 0, n = g, root = GLK && GLK.F;
while (n && n !== root) {
var c = Math.cos(n.rotation.y), s = Math.sin(n.rotation.y), nx = x * c + z * s, nz = -x * s + z * c;
x = nx + n.position.x;
z = nz + n.position.z;
y += n.position.y;
ry += n.rotation.y;
n = n.parent;
}
return { x: x, y: y, z: z, ry: ry };
}
function gldSolidIn(g, lx, lz, hw, hd, h) {
var P = gldToRoot(g, lx, 0, lz);
return gldSolid(P.x, P.z, hw, hd, P.y, h || 1, P.ry);
}
function gldRoundIn(g, r, h) { var P = gldToRoot(g, 0, 0, 0); return gldRound(P.x, P.z, r, P.y, h); }
var GLD_WOOD = { oak: 0x6A4A2A, dark: 0x3A2614, pale: 0x9A7A50, red: 0x5A2A1A, black: 0x1A1412 };
function gldW(k) { return gldMat(GLD_WOOD[k] || k, "wood"); }
var GLD_IRON = function () { return gldMat(0x2A2826, "metal", { phong: 30 }); };
var GLD_BRASS = function () { return gldMat(0xB8923A, "metal", { phong: 70 }); };
function gldTable(x, y, z, ry, w, d, o) { return __ZC(406, 9, this, arguments, new.target); }
function gldBench(x, y, z, ry, w, parent) {
var g = gldPiece(x, y, z, ry, parent), m = gldW("dark");
gldBox(w, 0.05, 0.34, m, 0, 0.45, 0, g);
[-1, 1].forEach(function (s) { gldBox(0.05, 0.43, 0.3, m, s * (w / 2 - 0.15), 0.22, 0, g); });
gldBox(w - 0.4, 0.06, 0.04, m, 0, 0.18, 0, g);
gldSolidIn(g, 0, 0, w / 2, 0.2, 0.48);
return g;
}
function gldChair(x, y, z, ry, o) { return __ZC(406, 10, this, arguments, new.target); }
function gldStool(x, y, z, parent) { var g = gldPiece(x, y, z, 0, parent), m = gldW("oak"); gldCyl(0.18, 0.05, m, 0, 0.6, 0, g, 12); for (var i = 0; i < 3; i++) {
var a = i / 3 * 6.283;
var l = gldCyl(0.02, 0.62, m, Math.cos(a) * 0.12, 0.3, Math.sin(a) * 0.12, g, 5);
l.rotation.z = Math.cos(a) * 0.12;
l.rotation.x = -Math.sin(a) * 0.12;
} gldRoundIn(g, 0.2, 0.62); return g; }
function gldBarrel(x, y, z, s, parent) { return __ZC(406, 11, this, arguments, new.target); }
function gldCrate(x, y, z, ry, s, parent) { return __ZC(406, 12, this, arguments, new.target); }
function gldSack(x, y, z, col, parent) { var g = gldPiece(x, y, z, 0, parent), m = gldCloth(col || 0x9A8A60, 0x5A4A30, 0); var b = gldSph(0.28, m, 0, 0.28, 0, g, 10); b.scale.set(1, 1.1, 0.8); gldCyl(0.08, 0.12, m, 0, 0.6, 0, g, 8, 0.12); return g; }
function gldChest(x, y, z, ry, col) { return __ZC(406, 13, this, arguments, new.target); }
function gldShelves(x, y, z, ry, w, h, what, o) { return __ZC(406, 14, this, arguments, new.target); }
function gldBookcase(x, y, z, ry, w, h) { return gldShelves(x, y, z, ry, w, h, "books", { n: 6, wood: "dark" }); }
function gldRug(x, y, z, ry, w, d, col, col2, col3) { return __ZC(406, 15, this, arguments, new.target); }
var GLD_EMBLEM = {
hand: function (c, W, H) { c.beginPath(); c.moveTo(W * 0.5, H * 0.28); c.lineTo(W * 0.62, H * 0.5); c.lineTo(W * 0.56, H * 0.72); c.lineTo(W * 0.44, H * 0.72); c.lineTo(W * 0.38, H * 0.5); c.closePath(); c.fill(); for (var i = 0; i < 4; i++)
c.fillRect(W * (0.39 + i * 0.06), H * 0.18, W * 0.04, H * 0.16); },
hammers: function (c, W, H) { c.save(); c.translate(W / 2, H / 2); [0.7, -0.7].forEach(function (a) { c.save(); c.rotate(a); c.fillRect(-4, -H * 0.22, 8, H * 0.44); c.fillRect(-20, -H * 0.25, 40, 16); c.restore(); }); c.restore(); },
scales: function (c, W, H) { c.fillRect(W / 2 - 3, H * 0.22, 6, H * 0.5); c.fillRect(W * 0.25, H * 0.3, W * 0.5, 5); [0.25, 0.75].forEach(function (p) { c.beginPath(); c.arc(W * p, H * 0.52, 18, 0, Math.PI); c.fill(); c.fillRect(W * p - 1, H * 0.3, 2, H * 0.22); }); c.fillRect(W * 0.4, H * 0.72, W * 0.2, 6); },
key: function (c, W, H) { c.lineWidth = 7; c.beginPath(); c.arc(W / 2, H * 0.3, 16, 0, 6.3); c.stroke(); c.fillRect(W / 2 - 3, H * 0.36, 6, H * 0.36); c.fillRect(W / 2, H * 0.6, 16, 6); c.fillRect(W / 2, H * 0.68, 12, 6); },
herb: function (c, W, H) { c.fillRect(W / 2 - 2, H * 0.22, 4, H * 0.5); for (var i = 0; i < 4; i++)
[-1, 1].forEach(function (s) { c.beginPath(); c.ellipse(W / 2 + s * 14, H * (0.3 + i * 0.1), 12, 6, s * 0.5, 0, 6.3); c.fill(); }); c.beginPath(); c.arc(W / 2, H * 0.2, 7, 0, 6.3); c.fill(); },
quill: function (c, W, H) { c.save(); c.translate(W / 2, H / 2); c.rotate(-0.5); c.beginPath(); c.moveTo(0, -H * 0.3); c.quadraticCurveTo(22, -H * 0.1, 2, H * 0.2); c.quadraticCurveTo(-14, -H * 0.05, 0, -H * 0.3); c.fill(); c.fillRect(-1, H * 0.18, 3, H * 0.12); c.restore(); c.fillRect(W * 0.3, H * 0.74, W * 0.4, 5); },
mask: function (c, W, H) { return __ZC(406, 16, this, arguments, new.target); },
anchor: function (c, W, H) { c.lineWidth = 6; c.beginPath(); c.arc(W / 2, H * 0.24, 9, 0, 6.3); c.stroke(); c.fillRect(W / 2 - 3, H * 0.28, 6, H * 0.42); c.fillRect(W / 2 - 18, H * 0.34, 36, 6); c.beginPath(); c.arc(W / 2, H * 0.56, 24, 0.2, Math.PI - 0.2); c.stroke(); },
boat: function (c, W, H) { return __ZC(406, 17, this, arguments, new.target); },
spider: function (c, W, H) {
c.beginPath();
c.ellipse(W / 2, H * 0.55, 14, 20, 0, 0, 6.3);
c.fill();
c.beginPath();
c.arc(W / 2, H * 0.4, 10, 0, 6.3);
c.fill();
c.lineWidth = 3;
for (var s = -1; s <= 1; s += 2)
for (var i = 0; i < 4; i++) {
c.beginPath();
c.moveTo(W / 2, H * 0.45);
c.lineTo(W / 2 + s * (26 + i * 4), H * (0.3 + i * 0.1));
c.lineTo(W / 2 + s * (34 + i * 6), H * (0.42 + i * 0.12));
c.stroke();
}
}
};
function gldBannerMat(col, col2, emb) {
var hx = function (c) { return "#" + ("000000" + c.toString(16)).slice(-6); };
return gldCanvasMat("ban|" + col + "|" + col2 + "|" + emb, 128, 256, function (c, W, H) {
c.fillStyle = hx(col);
c.fillRect(0, 0, W, H);
c.fillStyle = hx(col2);
c.strokeStyle = hx(col2);
c.fillRect(0, 0, W, 10);
c.fillRect(0, H - 46, W, 6);
for (var i = 0; i < 6; i++) {
c.beginPath();
c.moveTo(i * W / 6, H - 40);
c.lineTo(i * W / 6 + W / 12, H);
c.lineTo((i + 1) * W / 6, H - 40);
c.fill();
}
c.lineWidth = 4;
c.strokeRect(10, 18, W - 20, H - 70);
c.save();
c.translate(0, -10);
if (GLD_EMBLEM[emb])
GLD_EMBLEM[emb](c, W, H);
c.restore();
}, { ds: 1 });
}
function gldBanner(x, y, z, ry, w, h, col, col2, emb, parent) {
var g = gldPiece(x, y, z, ry, parent);
gldCyl(0.025, w + 0.3, GLD_BRASS(), 0, h, 0, g, 6).rotation.z = Math.PI / 2;
[-1, 1].forEach(function (s) { gldSph(0.045, GLD_BRASS(), s * (w / 2 + 0.15), h, 0, g, 8); });
gldPlane(w, h, gldBannerMat(col, col2, emb), 0, h / 2, 0.01, 0, g);
return g;
}
function gldFireplace(x, y, z, ry, o) { return __ZC(406, 18, this, arguments, new.target); }
function gldWorkbench(x, y, z, ry, o) { return __ZC(406, 19, this, arguments, new.target); }
function gldLathe(x, y, z, ry) { return __ZC(406, 20, this, arguments, new.target); }
function gldLoom(x, y, z, ry, col) { return __ZC(406, 21, this, arguments, new.target); }
function gldPotWheel(x, y, z, ry) { return __ZC(406, 22, this, arguments, new.target); }
function gldKiln(x, y, z, ry) { return __ZC(406, 23, this, arguments, new.target); }
function gldGlassFurnace(x, y, z, ry) { return __ZC(406, 24, this, arguments, new.target); }
function gldJewelBench(x, y, z, ry) { return __ZC(406, 25, this, arguments, new.target); }
function gldCase(x, y, z, ry, w, fill) { return __ZC(406, 26, this, arguments, new.target); }
function gldForgeHearth(x, y, z, ry) { return __ZC(406, 27, this, arguments, new.target); }
function gldAnvil(x, y, z, ry, parent) { return __ZC(406, 28, this, arguments, new.target); }
function gldTrough(x, y, z, ry) {
var g = gldPiece(x, y, z, ry), st = gldMat(0x6A6460, "stone");
gldBox(1.4, 0.6, 0.6, st, 0, 0.3, 0, g);
gldBox(1.2, 0.02, 0.42, gldMat(0x1A2A30, null, { phong: 120 }), 0, 0.56, 0, g);
gldSolidIn(g, 0, 0, 0.7, 0.3, 0.6);
return g;
}
function gldRack(x, y, z, ry, w, what) { return __ZC(406, 29, this, arguments, new.target); }
function gldArmourStand(x, y, z, ry, col) { return __ZC(406, 30, this, arguments, new.target); }
function gldCounter(x, y, z, ry, w, o) { return __ZC(406, 31, this, arguments, new.target); }
function gldDesk(x, y, z, ry, o) { return __ZC(406, 32, this, arguments, new.target); }
function gldMapMat(key, col) { return __ZC(406, 33, this, arguments, new.target); }
function gldMapTable(x, y, z, ry, w, d, key) {
var g = gldTable(x, y, z, ry, w, d, { wood: "dark", h: 0.9 });
var p = gldPlane(w - 0.1, d - 0.1, gldMapMat(key), 0, 0.905, 0, 0, g);
p.rotation.x = -Math.PI / 2;
[[-1, -1], [1, 1]].forEach(function (q) { gldCyl(0.03, 0.08, GLD_BRASS(), q[0] * (w / 2 - 0.2), 0.94, q[1] * (d / 2 - 0.2), g, 8); });
return g;
}
function gldGlobe(x, y, z) { return __ZC(406, 34, this, arguments, new.target); }
function gldBed(x, y, z, ry, o) { return __ZC(406, 35, this, arguments, new.target); }
function gldThrone(x, y, z, ry, o) { return __ZC(406, 36, this, arguments, new.target); }
function gldDais(x0, z0, x1, z1, h, mat) { gldBox(x1 - x0, h, z1 - z0, mat || gldMat(0x5A4A3A, "wood"), (x0 + x1) / 2, h / 2, (z0 + z1) / 2); gldFloor(x0, z0, x1, z1, h); }
function gldSkyCol() {
var h = typeof cityHourNow === "function" ? cityHourNow() : 12;
if (h >= 7.5 && h < 17.5)
return 0xC8C4B0;
if (h >= 6.5 && h < 7.5 || h >= 17.5 && h < 19)
return 0x8A6A62;
return 0x18203A;
}
function gldWinMat() { if (!GLD.mats.win) {
GLD.mats.win = new THREE.MeshBasicMaterial({ color: gldSkyCol() });
} return GLD.mats.win; }
function gldWindowBack(dir, at, c, y, w, h, off) { var m = gldWinMat(); var b = dir === "x" ? gldBox(w, h, 0.04, m, at, y + h / 2, c + off) : gldBox(0.04, h, w, m, c + off, y + h / 2, at); b.userData.keep = 1; return b; }
function gldNight() { var h = typeof cityHourNow === "function" ? cityHourNow() : 12; return h < 6.5 || h >= 19; }
function gldSpider(s, col, mark, parent) { return __ZC(406, 37, this, arguments, new.target); }
function gldScorpion(s, col, parent) { return __ZC(406, 38, this, arguments, new.target); }
function gldSnake(s, col, band, parent) { return __ZC(406, 39, this, arguments, new.target); }
function gldTerrarium(x, y, z, ry, kind, o) { return __ZC(406, 40, this, arguments, new.target); }
function gldWebMat() {
return gldCanvasMat("web", 256, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "rgba(232,228,240,0.75)";
c.lineWidth = 1.4;
var cx = W / 2, cy = H / 2;
for (var i = 0; i < 14; i++) {
var a = i / 14 * 6.283;
c.beginPath();
c.moveTo(cx, cy);
c.lineTo(cx + Math.cos(a) * 126, cy + Math.sin(a) * 126);
c.stroke();
}
for (var r = 12; r < 126; r += 10) {
c.beginPath();
for (var k = 0; k <= 14; k++) {
var a2 = k / 14 * 6.283, rr = r + ((k * 7) % 3);
var px = cx + Math.cos(a2) * rr, py = cy + Math.sin(a2) * rr;
if (!k)
c.moveTo(px, py);
else
c.lineTo(px, py);
}
c.stroke();
}
}, { basic: 1, op: 1, ds: 1 });
}
function gldWeb(x, y, z, ry, r, tilt, parent) {
var m = gldPlane(r * 2, r * 2, gldWebMat(), x, y, z, ry, parent);
m.material.depthWrite = false;
m.rotation.x = tilt || 0;
return m;
}
function gldPoisonBed(x, y, z, ry, w) { return __ZC(406, 41, this, arguments, new.target); }
function gldTarget(x, y, z, ry) { return __ZC(406, 42, this, arguments, new.target); }
function gldLockBoard(x, y, z, ry) { return __ZC(406, 43, this, arguments, new.target); }
function gldBellDummy(x, y, z, ry) { return __ZC(406, 44, this, arguments, new.target); }
function gldVaults(x0, z0, x1, z1, y, h, axis) { return __ZC(406, 45, this, arguments, new.target); }
function gldTrophy(x, y, z, ry, s, horn, parent) { return __ZC(406, 46, this, arguments, new.target); }
function gldCreaturesTick(t, list) { return __ZC(406, 47, this, arguments, new.target); }
var GLD_FN = ["Ada", "Imogen", "Ruth", "Clara", "Priya", "Mei", "Amara", "Sofia", "Nadia", "Hana", "Elena", "Grace", "Leah", "Zara", "Ingrid", "Maeve", "Lucia", "Ines", "Tamsin", "Odile", "Wren", "Bess"];
var GLD_MN = ["Arthur", "Rowan", "Tobias", "Felix", "Kwame", "Ravi", "Jonah", "Mateo", "Hugo", "Idris", "Callum", "Ewan", "Kenji", "Omar", "Silas", "Theo", "Lars", "Bram", "Dev", "Nikolai", "Ned", "Abel"];
var GLD_LN = ["Hale", "Okafor", "Lindqvist", "Moreau", "Tanaka", "Ferreira", "Byrne", "Novak", "Achebe", "Castell", "Varga", "Ashdown", "Rahman", "Sato", "Quill", "Marlowe", "Petrov", "Ellery", "Doyle", "Fenwick", "Thorne", "Garrow"];
function gldHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function gldFigure(seed, o) {
if (typeof wPerson !== "function")
return null;
o = o || {};
var look = {};
if (o.sex)
look.sex = o.sex;
if (o.look)
Object.keys(o.look).forEach(function (k) { look[k] = o.look[k]; });
var g = null;
try {
g = wPerson("gld_" + seed, { title: o.title || "", sex: o.sex, look: look });
}
catch (e) {
g = null;
}
if (!g)
return null;
g.traverse(function (m) { m.raycast = function () { }; });
return g;
}
function gldPerson(G, seed, x, z, ry, o) { return __ZC(406, 48, this, arguments, new.target); }
function gldPeopleTick(dt, K) { return __ZC(406, 49, this, arguments, new.target); }
function gldPersona(P) { return __ZC(406, 50, this, arguments, new.target); }
function gldTalk(P) { return __ZC(406, 51, this, arguments, new.target); }
var GLD_LS = "gld_local_v1";
function gldLocal() { if (!GLD.loc) {
try {
GLD.loc = JSON.parse(localStorage.getItem(GLD_LS) || "{}") || {};
}
catch (e) {
GLD.loc = {};
}
} var L = GLD.loc; L.guilds = L.guilds || {}; return L; }
function gldLocalSave() { try {
localStorage.setItem(GLD_LS, JSON.stringify(GLD.loc || {}));
}
catch (e) { } }
function gldOnline() { return gldSigned() && typeof cityRpc === "function" && !GLD.noServer; }
function gldMeFetch(force) { return __ZC(406, 52, this, arguments, new.target); }
function gldMine(k) { var m = GLD.me && GLD.me.guilds && GLD.me.guilds[k]; if (!m)
return null; return { rank: gldRankOf(m.xp), xp: +m.xp || 0, joined: m.joined }; }
function gldRankHere(k) { if (gldKeeper())
return 5; var m = gldMine(k); return m ? m.rank : 0; }
function gldOk18(G) { return G.open || gldKeeper() || (gldSigned() && (gldAdult() || (GLD.me && GLD.me.adult))); }
function gldJoin(G) { return __ZC(406, 53, this, arguments, new.target); }
function gldMayJoin(G) { return __ZC(406, 54, this, arguments, new.target); }
function gldJoined(G) {
gldSay(G.icon + " <b>You are on the roll of " + gldEsc(G.name) + ".</b> You are " + gldEsc(G.ranks[0]) + ". The board in the hall has your first work.");
if (typeof playTone === "function")
playTone(520, 0.25);
gldRoll(G);
}
function gldLeave(G) { return __ZC(406, 55, this, arguments, new.target); }
function gldRoll(G) { return __ZC(406, 56, this, arguments, new.target); }
function gldBoard(G) { return __ZC(406, 57, this, arguments, new.target); }
function gldWorkLine(W) { return __ZC(406, 58, this, arguments, new.target); }
function gldStart(G, J) { return __ZC(406, 59, this, arguments, new.target); }
function gldPickPlace(J) { return __ZC(406, 60, this, arguments, new.target); }
function gldPickMark(J) { return __ZC(406, 61, this, arguments, new.target); }
function gldWorkBegun(G, J, W) { return __ZC(406, 62, this, arguments, new.target); }
function gldShowWay(W) { return __ZC(406, 63, this, arguments, new.target); }
function gldDrop(quiet) { return __ZC(406, 64, this, arguments, new.target); }
function gldAtWork(W) { return __ZC(406, 65, this, arguments, new.target); }
function gldWorkTick(dt) {
var W = GLD.me && GLD.me.work;
if (!W) {
if (GLD.hud)
GLD.hud.style.display = "none";
return;
}
var J = gldJob(W.job) || {};
if (J.at === "mark") {
gldHudDraw();
return;
}
var at = gldAtWork(W);
if (at !== GLD.at) {
GLD.at = at;
if (at)
gldSay((GLD_BY[W.guild] || {}).icon + " <b>At work.</b> " + gldEsc(J.n) + ". Stay here; it counts while you do.");
else if (W.secs > 0)
gldSay("You have stepped away from the work. It waits for you.");
}
if (at) {
W.secs = (+W.secs || 0) + dt;
GLD.beatT += dt;
GLD.anim = (GLD.anim || 0) + dt;
}
if (at && GLD.beatT >= 20) {
GLD.beatT = 0;
gldBeat(W);
}
if (at && W.secs >= W.need && !GLD.beatBusy)
gldBeat(W);
gldHudDraw();
}
function gldBeat(W) { return __ZC(406, 66, this, arguments, new.target); }
function gldDone(W, d) { return __ZC(406, 67, this, arguments, new.target); }
function gldHudDraw() { return __ZC(406, 68, this, arguments, new.target); }
function gldStation(key, x, z, y, name, where, r) {
GLK.stations[key] = { x: x, z: z, y: y || 0, name: name, where: where || "", r: r || 2.4 };
gldSpot(x, z, r || 2.4, "⚒️ " + name, "work here", function () { gldBenchWork(key); }, { y: y || 0 });
}
function gldBenchWork(key) { return __ZC(406, 69, this, arguments, new.target); }
(function () {
if (typeof dgbFell !== "function")
return;
var df = dgbFell;
dgbFell = function (B) {
var r = df.apply(this, arguments);
try {
var W = GLD.me && GLD.me.work, J = W && gldJob(W.job);
if (J && J.at === "mark" && W.target && B && B.k && B.k.name === W.target.name && typeof dgrWhere === "function" && dgrWhere() === W.target.world)
gldMarkHit(W);
}
catch (e) { }
return r;
};
})();
function gldMarkHit(W) { return __ZC(406, 70, this, arguments, new.target); }
(function () {
if (typeof dgbStrike !== "function")
return;
var ds = dgbStrike;
dgbStrike = function (B) { var r = ds.apply(this, arguments); try {
if (B && B.st !== "dead" && gldRankHere("spider") >= 2 && gldMine("spider"))
B.gldVenom = 4;
}
catch (e) { } return r; };
})();
function gldVenomTick(dt) {
if (typeof DGB === "undefined" || !DGB.on || !DGB.on.length)
return;
DGB.on.forEach(function (B) { if (B.gldVenom > 0 && B.st !== "dead") {
B.gldVenom -= dt;
if (typeof dgbSpellHit === "function")
dgbSpellHit(B, dt * 2.5);
} });
}
function gldStair(axis, a0, a1, w0, w1, y0, y1, mat) { return __ZC(406, 71, this, arguments, new.target); }
function gldGate(G, dir, at, c, y, w, rank, room) { return __ZC(406, 72, this, arguments, new.target); }
function gldGateTry(T) { if (gldRankHere(T.G.k) >= T.rank) {
gldGateOpen(T);
return;
} gldSay("🚪 <b>" + gldEsc(T.room) + "</b> is kept for " + gldEsc(T.G.ranks[T.rank - 1]) + " and above."); }
function gldGateOpen(T) { if (T.open)
return; T.open = true; var i = T.solids.indexOf(T.sol); if (i >= 0)
T.solids.splice(i, 1); }
function gldGatesTick(dt, K) {
(K.gates || []).forEach(function (T) {
if (!T.open && gldRankHere(T.G.k) >= T.rank)
gldGateOpen(T);
var want = T.open ? 1 : 0;
if (Math.abs(T.amt - want) < 0.001)
return;
T.amt += (want - T.amt) * Math.min(1, dt * 2.5);
T.leaf.rotation.y = T.amt * 1.45;
});
}
function gldRollBook(G, x, z, y, ry) { return __ZC(406, 73, this, arguments, new.target); }
function gldNoticeBoard(G, x, z, y, ry, col) { return __ZC(406, 74, this, arguments, new.target); }
function gldExit(G, x, z, y, label) { gldSpot(x, z, 1.6, "🚪 " + (label || "The front door"), "go out", function () { gldLeaveHouse(G); }, { y: y || 0 }); }
function gldWin(dir, at, c, y, w, h, sill, face, col) { return { at: at, w: w, h: h, sill: sill, glass: true, bare: false, _back: function () { gldWindowBack(dir, at, c, y + sill, w, h, face * 0.5, col); } }; }
function gldWins(list) { list.forEach(function (o) { if (o && o._back)
o._back(); }); return list; }
function gldSunPatch(x, y, z, w, d, col) { if (gldNight())
return null; var m = gldPlane(w, d, gldGlowM(col || 0xFFF0C8, 0.1), x, y + 0.02, z, 0); m.rotation.x = -Math.PI / 2; m.material.depthWrite = false; return m; }
function gldPainting(x, y, z, ry, w, h, seed, kind) { return __ZC(406, 75, this, arguments, new.target); }
function gldSconce(x, y, z, ry, col) {
var g = gldPiece(x, y, z, ry);
gldBox(0.14, 0.26, 0.04, GLD_BRASS(), 0, 0, 0, g);
gldBox(0.04, 0.04, 0.22, GLD_BRASS(), 0, -0.05, 0.12, g);
gldCyl(0.07, 0.04, GLD_BRASS(), 0, -0.02, 0.24, g, 10);
gldCandle(0, 0.0, 0.24, 1, g);
return g;
}
function gldWainscot(dir, a, b, c, y, h, face, mat) { return __ZC(406, 76, this, arguments, new.target); }
function gldArtisans(G) { return __ZC(406, 77, this, arguments, new.target); }
function gldSmiths(G) { return __ZC(406, 78, this, arguments, new.target); }
function gldMerchants(G) { return __ZC(406, 79, this, arguments, new.target); }
function gldThieves(G) { return __ZC(406, 80, this, arguments, new.target); }
function gldSpiderLair(G) { return __ZC(406, 81, this, arguments, new.target); }
function gldHerbBunches(x0, x1, y, z, n) { return __ZC(406, 82, this, arguments, new.target); }
function gldHerbBed(x, y, z, ry, w, d, seed) {
var g = gldPiece(x, y, z, ry), st = gldMat(0x9A9080, "stone"), cols = [0x5A8A3A, 0x7A9A4A, 0x4A7A3A, 0x8A9A6A, 0x6A8A5A];
gldBox(w, 0.4, d, st, 0, 0.2, 0, g);
gldBox(w - 0.2, 0.04, d - 0.2, gldMat(0x3A2A1A, "earth"), 0, 0.42, 0, g);
var n = Math.max(2, Math.floor(w / 0.5)), rows = Math.max(1, Math.floor(d / 0.6));
for (var i = 0; i < n; i++)
for (var r = 0; r < rows; r++) {
var k = (i * 3 + r * 5 + seed) % 5, px = -w / 2 + 0.3 + i * (w - 0.6) / Math.max(1, n - 1), pz = -d / 2 + 0.35 + r * (d - 0.7) / Math.max(1, rows - 1);
if (k === 4) {
var sp = gldCyl(0.02, 0.7, gldMat(0x4A6A2A, null), px, 0.78, pz, g, 4);
for (var f = 0; f < 3; f++)
gldSph(0.05, gldMat([0x9A7AC8, 0xE8D850, 0xE8E8F0][(i + r) % 3], null), px, 0.8 + f * 0.14, pz, g, 6);
}
else {
var p = gldSph(0.16 + ((i + r) % 3) * 0.04, gldMat(cols[k], "foliage"), px, 0.5, pz, g, 7);
p.scale.y = 0.75;
}
}
gldSolidIn(g, 0, 0, w / 2, d / 2, 0.45);
return g;
}
function gldStill(x, y, z, ry) { return __ZC(406, 83, this, arguments, new.target); }
function gldHealers(G) { return __ZC(406, 84, this, arguments, new.target); }
function gldCopyDesk(x, y, z, ry, seed) { return __ZC(406, 85, this, arguments, new.target); }
function gldScribes(G) { return __ZC(406, 86, this, arguments, new.target); }
function gldHarp(x, y, z, ry) { return __ZC(406, 87, this, arguments, new.target); }
function gldDrum(x, y, z, s, col) { var g = gldPiece(x, y, z, 0); gldCyl(0.3 * s, 0.45 * s, gldMat(col || 0x8A2A1A, "wood"), 0, 0.22 * s, 0, g, 14); gldCyl(0.31 * s, 0.02, gldMat(0xE8DCC0, null), 0, 0.46 * s, 0, g, 14); gldRoundIn(g, 0.32 * s, 0.5 * s); return g; }
function gldLute(x, y, z, ry) { var g = gldPiece(x, y, z, ry), wd = gldMat(0x9A6A3A, "wood", { phong: 50 }); var b = gldSph(0.22, wd, 0, 0.22, 0, g, 12); b.scale.z = 0.45; gldBox(0.06, 0.5, 0.03, gldW("dark"), 0, 0.65, 0, g); return g; }
function gldCostumeRail(x, y, z, ry, w, seed) { return __ZC(406, 88, this, arguments, new.target); }
function gldBards(G) { return __ZC(406, 89, this, arguments, new.target); }
function gldShipWheel(x, y, z, ry, s) { return __ZC(406, 90, this, arguments, new.target); }
function gldModelShip(x, y, z, ry, s) { return __ZC(406, 91, this, arguments, new.target); }
function gldRopeCoil(x, y, z, s) {
var g = gldPiece(x, y, z, 0), m = gldMat(0xB89A6A, "cloth");
s = s || 1;
for (var i = 0; i < 4; i++) {
var t = new THREE.Mesh(new THREE.TorusGeometry((0.32 - i * 0.03) * s, 0.05 * s, 6, 16), m);
t.rotation.x = Math.PI / 2;
t.position.y = 0.05 * s + i * 0.09 * s;
g.add(t);
}
gldRoundIn(g, 0.35 * s, 0.4 * s);
return g;
}
function gldAnchor(x, y, z, ry, s) { return __ZC(406, 92, this, arguments, new.target); }
function gldMariners(G) { return __ZC(406, 93, this, arguments, new.target); }
function gldBale(x, y, z, ry, s, col) {
var g = gldPiece(x, y, z, ry);
s = s || 1;
gldBox(0.9 * s, 0.6 * s, 0.6 * s, gldCloth(col || 0x8A7A5A, 0x4A3A2A, 0), 0, 0.3 * s, 0, g);
[-0.25, 0.25].forEach(function (dx) { gldBox(0.03, 0.62 * s, 0.62 * s, gldMat(0xB89A6A, null), dx * s, 0.3 * s, 0, g); });
gldSolidIn(g, 0, 0, 0.45 * s, 0.3 * s, 0.6 * s);
return g;
}
function gldRowBoat(x, y, z, ry, col) { return __ZC(406, 94, this, arguments, new.target); }
function gldSmugglers(G) { return __ZC(406, 95, this, arguments, new.target); }
var GLD_BUILD = { artisans: "gldArtisans", smiths: "gldSmiths", merchants: "gldMerchants", thieves: "gldThieves", spider: "gldSpiderLair",
healers: "gldHealers", scribes: "gldScribes", bards: "gldBards", mariners: "gldMariners", smugglers: "gldSmugglers" };
var GLD_COVER = { thieves: { enter: "The back store", label: "The Rag and Bone Yard's back store", door: "A back store", about: "Dust, quiet, the smell of old cloth." },
spider: { enter: "The silk-weaver's house", label: "An old silk-weaver's house", door: "A. Moth, silk-weaver", about: "Dust, quiet, the smell of old cloth." },
smugglers: { enter: "The cooper's store", label: "A quayside cooper's store", door: "J. Tregarthen, cooper", about: "Sawdust, tar and the smell of apples." } };
function gldCover(G, f) { var C = GLD_COVER[G.k] || GLD_COVER.thieves; return C[f]; }
var GLD_AT = {};
function gldBaseOf(G) { return -4200000 - GLD_GUILDS.indexOf(G) * 150000; }
function gldEnv(G) { return __ZC(406, 96, this, arguments, new.target); }
function gldBuild(G, W) { return __ZC(406, 97, this, arguments, new.target); }
function gldForget() { return __ZC(406, 98, this, arguments, new.target); }
function gldArrive(G, at) {
var A = (GLD_AT[G.k] || {})[at] || (GLD_AT[G.k] || {}).front || { x: 0, z: 8, yaw: 0 };
camera.position.set(gldBaseOf(G) + A.x, (A.y || 0) + 1.72, A.z);
if (GLD.K)
GLD.K.hold = null;
if (typeof yaw !== "undefined")
yaw = A.yaw || 0;
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = A.y || 0;
}
function gldMayGo(G) {
if (gldKeeper())
return "";
var C = gldCfg(), S = C.guilds[G.k] || {};
if (!C.open || S.on === false)
return G.name + " has its doors shut for now, by the Keeper.";
return "";
}
function gldGo(G, at) {
if (!G || !G.built)
return false;
var why = gldMayGo(G);
if (why) {
gldSay("🛡️ <b>" + gldEsc(why) + "</b>");
return false;
}
gldMeFetch();
GLD.wantAt = at || null;
if (WLD.on === "gld_" + G.k) {
worldCard(null);
gldArrive(G, at || "front");
return true;
}
return worldGo("gld_" + G.k, { fromName: G.where });
}
function gldLeaveHouse(G) { worldCard(null); GLD.atBench = null; worldHome(G.icon + " <b>Back in the street.</b> The door of " + gldEsc(G.open ? G.name : "the house") + " shuts behind you."); }
GLD_GUILDS.forEach(function (G) {
if (!G.built || typeof worldDef !== "function")
return;
var key = "gld_" + G.k;
worldDef(key, {
base: gldBaseOf(G), far: 600, ownSky: true, tone: 200,
env: function () { return gldEnv(G); },
build: function (W) { gldBuild(G, W); },
enter: function () {
if (GLD.built === G.k && GLD.builtCfg !== JSON.stringify(gldCfg().guilds[G.k] || {}) && WLD.w && WLD.w.g) {
var W = WLD.w.g;
while (W.children.length)
W.remove(W.children[0]);
gldForget();
gldBuild(G, W);
}
if (GLD.built !== G.k && WLD.w && WLD.w.g) {
var W2 = WLD.w.g;
while (W2.children.length)
W2.remove(W2.children[0]);
gldForget();
gldBuild(G, W2);
}
GLK = GLD.K;
GLD.k = G.k;
gldArrive(G, GLD.wantAt || "front");
GLD.wantAt = null;
GLD.room = "";
gldSay(G.icon + " <b>" + gldEsc(G.open ? G.name : gldCover(G, "enter")) + ".</b> " + gldEsc(G.open ? G.about : gldCover(G, "about")));
},
leave: function () { worldCard(null); GLD.atBench = null; if (typeof fvoHush === "function")
try {
fvoHush();
}
catch (e) { } },
ground: function (x, z, feet) { var K = GLD.K; if (!K || GLD.k !== G.k)
return 0; var g = gldGroundIn(K, x, z, feet); return g === null ? (feet !== undefined && feet < -1 ? feet : 0) : g; },
block: function (x, z, feet) { var K = GLD.K; if (!K || GLD.k !== G.k)
return false; if (!gldInRoom(K, x, z, feet))
return true; return worldSolidAt(K.solids, x, z, feet); },
tick: function (dt) { gldTick(G, dt); },
back: function () { gldLeaveHouse(G); }
});
if (typeof WLG !== "undefined" && WLG.keys.indexOf(key) < 0)
WLG.keys.push(key);
if (typeof DGR_W !== "undefined" && !DGR_W[key]) {
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.push([key, G.open ? G.name : "A house in Somnucor", 0, "city"]);
DGR_W[key] = { id: key, name: G.open ? G.name : "A house in Somnucor", def: 0, group: "city" };
}
if (!G.open && typeof RCAM_PRIVATE !== "undefined")
RCAM_PRIVATE[key] = 1;
});
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && /^gld_/.test(key || "") && key === "gld_" + GLD.k && WLD.on !== key)
gldForget(); return r; }; })();
function gldTick(G, dt) { return __ZC(406, 99, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
gldWorkTick(dt);
gldVenomTick(dt);
}
catch (e) {
if (!GLD.e2) {
GLD.e2 = 1;
if (window.console)
console.warn("[city-guilds] work tick", e);
}
} };
})();
function gldDirectory() { return __ZC(406, 100, this, arguments, new.target); }
function gldToDoor(G) { return __ZC(406, 101, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-guilds"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-guilds";
b.title = "The guilds of Somnucor";
b.textContent = "🛡️ Guilds";
b.onclick = function () { gldDirectory(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 2000);
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-gld]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-gld", "1");
b.textContent = "🛡️ The guilds";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } gldDirectory(); };
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
var m = /[?&]kgld=([a-z]+)(?::([a-z]+))?/.exec(location.search);
if (!m || !GLD_BY[m[1]])
return;
var G = GLD_BY[m[1]], where = m[2] || "";
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!gldKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
if (where === "door")
gldToDoor(G);
else
gldGo(G, where || "front");
try {
var q = new URLSearchParams(location.search);
q.delete("kgld");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
var GLD_CITY = { at: 0, t: 0, on: {}, off: {} };
function gldClearAngle(rb, a, hw) {
if (typeof atlClearAt !== "function" || atlClearAt(rb, a, hw, 3))
return a;
for (var k = 1; k <= 300; k++) {
var d = k * 0.5 / rb;
if (atlClearAt(rb, a + d, hw, 3))
return a + d;
if (atlClearAt(rb, a - d, hw, 3))
return a - d;
}
return a;
}
function gldCitySpot(G) {
if (typeof ATLC === "undefined" || !ATLC || !G.pos)
return null;
var P = G.pos, x, z, ry;
if (P.yard) {
var Y = (store.objects || []).filter(function (o) { return o.city && o.name === P.yard && o.archetype !== "signboard"; })[0];
if (!Y)
return null;
var a = Math.atan2(Y.z - ATLC.z, Y.x - ATLC.x), r = Math.hypot(Y.x - ATLC.x, Y.z - ATLC.z) + P.out, aa = a + P.along / r;
x = ATLC.x + Math.cos(aa) * r;
z = ATLC.z + Math.sin(aa) * r;
ry = Math.atan2(ATLC.x - x, ATLC.z - z);
return { x: x, z: z, ry: ry, y: typeof terrainY === "function" ? terrainY(x, z) : 0, w: P.w, d: P.d };
}
var rb = P.rs + P.side * (ATL_ROAD + ATL_SETBACK + P.d / 2), a = gldClearAngle(rb, P.a, P.w / 2);
x = ATLC.x + Math.cos(a) * rb;
z = ATLC.z + Math.sin(a) * rb;
ry = P.side > 0 ? Math.atan2(ATLC.x - x, ATLC.z - z) : Math.atan2(x - ATLC.x, z - ATLC.z);
return { x: x, z: z, ry: ry, y: typeof terrainY === "function" ? terrainY(x, z) : 0, w: P.w, d: P.d };
}
function gldCityDoor(G) { var S = gldCitySpot(G); if (!S)
return null; var s = Math.sin(S.ry), c = Math.cos(S.ry), o = S.d / 2 + 1.6; return { x: S.x + s * o, z: S.z + c * o, yaw: S.ry + Math.PI, S: S }; }
function gldLocalOf(S, x, z) { var dx = x - S.x, dz = z - S.z, c = Math.cos(S.ry), s = Math.sin(S.ry); return { x: dx * c - dz * s, z: dx * s + dz * c }; }
function gldTimberWall(G, w, h, y, z, face, o) { return __ZC(406, 102, this, arguments, new.target); }
function gldLitWindow(x, y, z, w, h, ry, col, parent) {
var g = gldPiece(x, y, z, ry, parent), fr = gldMat(0x2A1E14, "wood");
gldBox(w, h, 0.06, gldGlowM(col || 0xFFD890), 0, h / 2, 0, g);
gldBox(w + 0.2, 0.12, 0.2, fr, 0, h + 0.06, 0.05, g);
gldBox(w + 0.3, 0.1, 0.3, fr, 0, -0.05, 0.1, g);
gldBox(0.06, h, 0.1, fr, 0, h / 2, 0.04, g);
gldBox(w, 0.06, 0.1, fr, 0, h * 0.5, 0.04, g);
[-1, 1].forEach(function (s) { gldBox(0.1, h + 0.1, 0.12, fr, s * (w / 2 + 0.05), h / 2, 0.04, g); });
return g;
}
function gldPitchRoof(w, d, y, rise, mat, ax, parent) {
var P = parent || gldP(), sh = new THREE.Shape();
sh.moveTo(-w / 2 - 0.5, 0);
sh.lineTo(w / 2 + 0.5, 0);
sh.lineTo(0, rise);
sh.lineTo(-w / 2 - 0.5, 0);
var m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d + 0.8, bevelEnabled: false }), mat);
m.position.set(0, y, -(d + 0.8) / 2);
if (ax === "x") {
var g = new THREE.Group();
g.rotation.y = Math.PI / 2;
g.add(m);
P.add(g);
return g;
}
P.add(m);
return m;
}
function gldDoorLeaves(w, h, z, col, parent) {
var P = parent || gldP(), wd = gldMat(col || 0x3A2416, "wood");
gldBox(w, h, 0.2, wd, 0, h / 2, z, P);
gldBox(0.06, h, 0.24, gldMat(0x1A120A, null), 0, h / 2, z, P);
[-1, 1].forEach(function (s) { gldSph(0.06, GLD_BRASS(), s * 0.25, h * 0.48, z + 0.14, P, 8); for (var i = 0; i < 3; i++)
gldBox(w / 2 - 0.2, 0.06, 0.04, GLD_IRON(), s * w / 4, 0.5 + i * (h - 1) / 2, z + 0.12, P); });
}
var GLD_FRONT = {
artisans: function (G) { return __ZC(406, 103, this, arguments, new.target); },
smiths: function (G) { return __ZC(406, 104, this, arguments, new.target); },
merchants: function (G) {
var w = G.pos.w, d = G.pos.d, mb = gldMat(G.col.wall, "marble", { phong: 40 }), dk = gldMat(0xC8C0B0, "marble"), roof = gldMat(G.col.roof, "metalroof"), gd = GLD_BRASS();
for (var s = 0; s < 3; s++)
gldBox(w + 2 - s * 1.2, 0.3, d + 2 - s * 1.2, dk, 0, 0.15 + s * 0.3, 0.6 - s * 0.2);
gldBox(w - 4, 11, d - 4, mb, 0, 6.4, -2);
for (var i = 0; i < 6; i++) {
var cx = -w / 2 + 3 + i * (w - 6) / 5;
gldCyl(0.75, 10, mb, cx, 5.9, d / 2 - 1.2, null, 18, 0.82);
gldBox(1.8, 0.5, 1.8, dk, cx, 1.15, d / 2 - 1.2);
gldBox(1.8, 0.5, 1.8, dk, cx, 11.1, d / 2 - 1.2);
}
gldBox(w, 1.4, 4, dk, 0, 12.0, d / 2 - 1.6);
gldBox(w + 0.2, 0.25, 4.2, gd, 0, 11.35, d / 2 - 1.6);
var pg = new THREE.Shape();
pg.moveTo(-w / 2, 0);
pg.lineTo(w / 2, 0);
pg.lineTo(0, 4.2);
pg.lineTo(-w / 2, 0);
var ped = new THREE.Mesh(new THREE.ExtrudeGeometry(pg, { depth: 4, bevelEnabled: false }), mb);
ped.position.set(0, 12.7, d / 2 - 3.6);
gldP().add(ped);
var em = gldPlane(3.2, 2.0, gldBannerMat(0x2A3A5A, 0xE8C850, "scales"), 0, 14.0, d / 2 + 0.45, 0);
em.scale.y = 0.7;
gldPitchRoof(w - 4, d - 4, 11.9, 3, roof, "z").position.z = -2;
gldBox(3.6, 6, 0.2, gldMat(0x2A1A10, null), 0, 4.9, d / 2 - 4.0);
gldDoorLeaves(3.2, 5.4, d / 2 - 3.9, 0x2A1A10);
for (var j = 0; j < 2; j++)
[-1, 1].forEach(function (s) { gldLitWindow(s * (5 + j * 4.5), 3.2, d / 2 - 3.95, 1.5, 3.0, 0, 0xFFE8B0); });
gldSign(["THE MERCHANT VENTURERS", "of Somnucor · the trading floor"], 7, 1.2, "#1A2A3A", "#F0E0A8", 0, 1.9, d / 2 + 1.4, 0);
[-1, 1].forEach(function (s) { gldBanner(s * (w / 2 - 0.8), 5.5, d / 2 + 0.6, 0, 1.3, 3.2, 0x2A3A5A, 0xE8C850, "scales"); gldLantern(s * 2.4, 5.6, d / 2 - 3.6, 0xFFE0A0, 0); });
return [{ x: 0, z: -2, hw: w / 2 - 1.8, hd: d / 2 - 1.8, h: 17 }, { x: 0, z: d / 2 - 1.2, hw: w / 2, hd: 0.95, h: 13 }];
},
thieves: function (G) { return __ZC(406, 105, this, arguments, new.target); },
spider: function (G) {
var w = G.pos.w, d = G.pos.d, st = gldMat(G.col.wall, "stone"), bm = gldMat(G.col.beam, "wood"), roof = gldMat(G.col.roof, "slate");
gldBox(w, 0.4, d, gldMat(0x5A5450, "stone"), 0, 0.2, 0);
gldBox(w, 10, d, st, 0, 5.4, 0);
for (var f = 1; f < 3; f++)
gldBox(w + 0.1, 0.2, 0.2, bm, 0, 0.4 + f * 3.4, d / 2 + 0.05);
gldPitchRoof(w, d, 10.4, 4.5, roof, "x");
gldBox(1.2, 3, 1.2, gldMat(0x4A4440, "brick"), w / 2 - 1.5, 15, -2);
var bw = gldPiece(-2.4, 0.8, d / 2, 0);
gldBox(3.6, 0.5, 0.9, bm, 0, 0.25, 0.4, bw);
gldBox(3.6, 2.2, 0.06, gldGlowM(0xD8B8E8, 0.9), 0, 1.6, 0.82, bw);
gldBox(3.8, 0.3, 1.0, bm, 0, 2.85, 0.4, bw);
for (var i = 0; i < 5; i++) {
var bo = gldCyl(0.12, 0.5, gldCloth([0x4A1A3A, 0x1A1A2A, 0xA88AC8, 0x2A0A1A, 0xD8C8E8][i], 0x101010, 0), -1.4 + i * 0.7, 0.9, 0.5, bw, 10);
bo.rotation.x = Math.PI / 2;
}
gldBox(1.4, 2.6, 0.12, gldMat(0x1A1418, "wood"), 2.6, 1.7, d / 2 + 0.05);
gldSph(0.05, GLD_BRASS(), 2.15, 1.7, d / 2 + 0.14, null, 8);
for (var u = 0; u < 3; u++) {
gldLitWindow(-2.4 + u * 2.4, 4.6, d / 2 + 0.02, 1.0, 1.6, 0, u === 1 ? 0x8A6AA8 : 0x3A2A4A);
gldLitWindow(-2.4 + u * 2.4, 8.0, d / 2 + 0.02, 1.0, 1.6, 0, 0x2A2030);
}
gldSign(["A. MOTH", "silk-weaver · fine silks"], 2.4, 0.6, "#1A1418", "#D8C8E8", 2.6, 3.4, d / 2 + 0.12, 0);
gldLantern(2.6, 3.0, d / 2 + 0.5, 0xC8A8FF, 0);
gldWeb(w / 2 - 0.4, 3.2, d / 2 + 0.3, 0, 0.5, 0.2);
return [{ x: 0, z: 0, hw: w / 2 + 0.2, hd: d / 2 + 0.3, h: 15 }];
}
};
function gldCityBuild(G) {
var S = gldCitySpot(G);
if (!S || typeof scene === "undefined")
return null;
var keepK = GLK, keepLite = GLD.lite;
GLD.lite = gldLite();
var Gr = new THREE.Group();
Gr.name = "guild house " + G.k;
Gr.position.set(S.x, S.y, S.z);
Gr.rotation.y = S.ry;
scene.add(Gr);
GLK = gldCtx();
GLK.F = Gr;
var boxes = [];
try {
boxes = GLD_FRONT[G.k](G) || [];
}
catch (e) {
if (window.console)
console.warn("[city-guilds] front", G.k, e);
}
var C = { g: Gr, S: S, boxes: boxes, solids: GLK.solids, flames: GLK.flames, folk: [], t: 0, G: G };
try {
gldFolkOut(G, C);
}
catch (e) {
if (window.console)
console.warn("[city-guilds] folk", e);
}
Gr.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; o.castShadow = false; });
GLK = keepK;
GLD.lite = keepLite;
return C;
}
function gldCityDrop(k) { var C = GLD_CITY.on[k]; if (!C)
return; if (C.g)
C.g.visible = false; (C.folk || []).forEach(function (F) { if (F.g)
F.g.visible = false; }); GLD_CITY.off[k] = C; delete GLD_CITY.on[k]; }
function gldCityShow(k) { var C = GLD_CITY.off[k]; if (!C)
return null; delete GLD_CITY.off[k]; if (!C.g || C.g.parent !== scene)
return null; if (C.g)
C.g.visible = true; (C.folk || []).forEach(function (F) { if (F.g && !F.inside)
F.g.visible = true; }); return C; }
function gldFolkOut(G, C) {
var n = gldLite() ? 2 : (G.open ? 6 : 2), S = C.S, titles = { artisans: ["apprentice joiner", "weaver", "potter", "glassblower", "tailor", "jeweller"], smiths: ["striker", "smith", "farrier", "armourer", "apprentice smith", "smith"],
merchants: ["clerk", "factor", "merchant", "shopkeeper", "caravan master", "clerk"], thieves: ["rag-picker", "yard-hand"], spider: ["silk buyer", "maid"],
healers: ["apothecary", "nurse", "herb-woman", "physician", "porter", "nurse"], scribes: ["copyist", "scholar", "clerk", "archivist", "student", "map-maker"],
bards: ["player", "fiddler", "singer", "juggler", "piper", "playwright"], mariners: ["sailor", "bosun", "deckhand", "pilot", "rope-maker", "sailmaker"], smugglers: ["fisherman", "cooper's lad"] }[G.k] || ["member"];
for (var i = 0; i < n; i++) {
var g = gldFigure(G.k + "_out" + i, { title: titles[i % titles.length] });
if (!g)
continue;
scene.add(g);
var F = { g: g, G: G, u: Math.random() * 2 - 1, v: 0, tu: 0, tv: 0, wait: Math.random() * 6, inside: 0, ph: i };
gldFolkPlace(F, C, true);
C.folk.push(F);
}
}
function gldFolkPos(C, u, v) { var S = C.S, s = Math.sin(S.ry), c = Math.cos(S.ry), lx = u * (S.w / 2 + 8), lz = S.d / 2 + 1.2 + v; return { x: S.x + lx * c + lz * s, z: S.z - lx * s + lz * c }; }
function gldFolkPlace(F, C, first) {
var toDoor = !first && Math.random() < 0.35 && C.G.open;
F.tu = toDoor ? 0 : (Math.random() * 2 - 1);
F.tv = toDoor ? 0 : (1 + Math.random() * (C.G.pos && C.G.pos.yard ? 3 : 7));
F.door = toDoor;
if (first) {
F.u = F.tu;
F.v = F.tv;
}
}
function gldFolkTick(C, dt) {
C.folk.forEach(function (F) {
var g = F.g;
if (!g)
return;
if (F.inside > 0) {
F.inside -= dt;
if (F.inside <= 0) {
g.visible = true;
F.u = 0;
F.v = 0.2;
gldFolkPlace(F, C, false);
}
return;
}
if (F.wait > 0) {
F.wait -= dt;
}
else {
var du = (F.tu - F.u) * (C.S.w / 2 + 8), dv = F.tv - F.v, d = Math.hypot(du, dv);
if (d < 0.3) {
if (F.door) {
g.visible = false;
F.inside = 20 + Math.random() * 30;
F.door = false;
}
else {
F.wait = 2 + Math.random() * 8;
gldFolkPlace(F, C, false);
}
}
else {
var st = Math.min(d, 1.25 * dt);
F.u += du / d * st / (C.S.w / 2 + 8);
F.v += dv / d * st;
}
}
var P = gldFolkPos(C, F.u, F.v), y = typeof terrainY === "function" ? terrainY(P.x, P.z) : C.S.y;
var ox = g.position.x, oz = g.position.z;
g.position.set(P.x, y, P.z);
if (Math.hypot(P.x - ox, P.z - oz) > 0.002)
g.rotation.y = Math.atan2(P.x - ox, P.z - oz);
});
}
function gldCityTick(dt) {
GLD_CITY.t += dt;
var here = !(typeof WLD !== "undefined" && WLD.on) && (typeof inSomnucorNow !== "function" || inSomnucorNow()), P = camera.position;
if (Date.now() - GLD_CITY.at > 2500) {
GLD_CITY.at = Date.now();
GLD_GUILDS.forEach(function (G) {
if (!G.built)
return;
var S = gldCitySpot(G), near = here && !!S && Math.hypot(P.x - S.x, P.z - S.z) < (gldLite() ? 380 : 700) && gldCfg().guilds[G.k].on !== false;
if (near && !GLD_CITY.on[G.k])
try {
var C = gldCityShow(G.k) || gldCityBuild(G);
if (C)
GLD_CITY.on[G.k] = C;
}
catch (e) {
if (window.console)
console.warn("[city-guilds] city", e);
gldCityDrop(G.k);
}
if (!near && GLD_CITY.on[G.k])
gldCityDrop(G.k);
});
}
if (!here)
return;
var best = null;
Object.keys(GLD_CITY.on).forEach(function (k) {
var C = GLD_CITY.on[k];
C.t += dt;
gldFlamesTick(C.t, C.flames);
gldFolkTick(C, dt);
var D = gldCityDoor(C.G);
if (D && !(typeof store !== "undefined" && store.inside) && Math.hypot(P.x - D.x, P.z - D.z) < 4)
best = C.G;
});
if (best) {
var G = best;
GLD_CITY.prompted = G.k;
worldPromptCity("<b>" + G.icon + " " + gldEsc(G.open ? G.name : gldCover(G, "door")) + "</b> · <b>press E</b> to go in", function () { worldPromptCity(null); gldGo(G, "front"); });
}
else if (GLD_CITY.prompted) {
GLD_CITY.prompted = "";
if (typeof WCITY !== "undefined" && WCITY.fn)
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
if (!(typeof WLD !== "undefined" && WLD.on))
gldCityTick(dt);
else if (Object.keys(GLD_CITY.on).length && Date.now() - GLD_CITY.at > 2500) {
GLD_CITY.at = Date.now();
Object.keys(GLD_CITY.on).forEach(gldCityDrop);
}
}
catch (e) {
if (!GLD_CITY.e) {
GLD_CITY.e = 1;
if (window.console)
console.warn("[city-guilds] city tick", e);
}
} };
})();
function gldCityHit(x, z, pad) {
for (var k in GLD_CITY.on) {
var C = GLD_CITY.on[k], S = C.S;
if (Math.abs(x - S.x) > 60 || Math.abs(z - S.z) > 60)
continue;
var L = gldLocalOf(S, x, z);
for (var i = 0; i < C.boxes.length; i++) {
var B = C.boxes[i];
if (Math.abs(L.x - B.x) < B.hw + pad && Math.abs(L.z - B.z) < B.hd + pad)
return { S: S, B: B, C: C, L: L };
}
}
return null;
}
function gldCityProp(x, z, feet) {
for (var k in GLD_CITY.on) {
var C = GLD_CITY.on[k], S = C.S;
if (Math.abs(x - S.x) > 60 || Math.abs(z - S.z) > 60)
continue;
var L = gldLocalOf(S, x, z);
if (worldSolidAt(C.solids, L.x, L.z, feet === undefined ? 0 : feet - S.y))
return true;
}
return false;
}
(function () {
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (!(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on)) {
var h = gldCityHit(x, z, 0.35);
if (h && (feet === undefined || feet < h.S.y + h.B.h - 0.4))
return true;
if (gldCityProp(x, z, feet))
return true;
}
return ba.apply(this, arguments);
};
}
if (typeof supportAt === "function") {
var sa = supportAt;
supportAt = function (x, z, feet) {
var r = sa.apply(this, arguments);
if (!(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on)) {
var h = gldCityHit(x, z, 0);
if (h && feet !== undefined && feet >= h.S.y + h.B.h - 0.6)
return Math.max(r, h.S.y + h.B.h);
}
return r;
};
}
})();
function gldFlagPole(x, y, z, h, col, col2, emb) {
var g = gldPiece(x, y, z, 0);
gldCyl(0.06, h, GLD_IRON(), 0, h / 2, 0, g, 6);
gldSph(0.1, GLD_BRASS(), 0, h + 0.05, 0, g, 8);
gldPlane(1.6, 1.0, gldBannerMat(col, col2, emb), 0.82, h - 0.6, 0, 0, g).rotation.z = -Math.PI / 2;
return g;
}
GLD_FRONT.healers = function (G) {
var w = G.pos.w, d = G.pos.d, st = gldMat(G.col.wall, "stone"), pale = gldMat(0xE8E4D8, "marble"), roof = gldMat(G.col.roof, "slate"), grn = 0x2A5A3A, cream = 0xF0E8D0;
gldBox(w, 0.5, d, gldMat(0x8A8478, "stone"), 0, 0.25, 0);
gldBox(w, 9, d - 3, st, 0, 5, -1.5);
gldPitchRoof(w, d - 3, 9.5, 4.5, roof, "z").position.z = -1.5;
for (var i = 0; i < 4; i++) {
var cx = -3.6 + i * 2.4;
gldCyl(0.42, 5.4, pale, cx, 3.2, d / 2 - 0.8, null, 14);
gldBox(0.9, 0.3, 0.9, pale, cx, 0.65, d / 2 - 0.8);
}
gldBox(9.2, 0.8, 2.2, pale, 0, 6.3, d / 2 - 0.9);
var ped = new THREE.Shape();
ped.moveTo(-4.6, 0);
ped.lineTo(4.6, 0);
ped.lineTo(0, 1.8);
ped.lineTo(-4.6, 0);
var pm = new THREE.Mesh(new THREE.ExtrudeGeometry(ped, { depth: 2.2, bevelEnabled: false }), pale);
pm.position.set(0, 6.7, d / 2 - 2.0);
gldP().add(pm);
gldPlane(1.6, 1.0, gldBannerMat(grn, cream, "herb"), 0, 7.4, d / 2 + 0.21, 0).rotation.z = -Math.PI / 2;
gldBox(3, 4, 0.2, gldMat(0x1E1A14, null), 0, 2.5, d / 2 - 1.4);
gldDoorLeaves(2.6, 3.6, d / 2 - 1.28, 0x2A3A2A);
for (var j = 0; j < 3; j++)
[-1, 1].forEach(function (s) { var x = s * (6.6 + j * 2.6); gldLitWindow(x, 1.8, d / 2 - 1.48, 1.3, 2.4, 0, 0xFFF0C8); gldLitWindow(x, 5.6, d / 2 - 1.48, 1.3, 2.0, 0, 0xFFE8C0); });
gldSign(["THE HEALERS AND HERBALISTS", "physic · herbs · the infirmary · all are tended"], 7, 1.2, "#1A2A1E", "#F0E8D0", 0, 8.4, d / 2 + 0.25, 0);
[-1, 1].forEach(function (s) { var cx = s * (w / 2 - 3.4); gldBox(6.8, 1.2, 0.4, st, cx, 0.6, d / 2 + 1.4); gldHerbBed(cx, 0.5, d / 2 + 0.5, 0, 6, 1.4); gldBanner(s * 4.8, 4.2, d / 2 - 0.4, 0, 1.2, 2.6, grn, cream, "herb"); gldLantern(s * 2.0, 3.6, d / 2 - 0.6, 0xFFF0C8, 0); });
gldBench(-6, 0.5, d / 2 + 2.4, Math.PI, 2.2);
gldBench(6, 0.5, d / 2 + 2.4, Math.PI, 2.2);
return [{ x: 0, z: -1.5, hw: w / 2 + 0.4, hd: (d - 3) / 2 + 0.3, h: 14 }, { x: -(w / 2 - 3.4), z: d / 2 + 1.4, hw: 3.4, hd: 0.25, h: 1.2 }, { x: w / 2 - 3.4, z: d / 2 + 1.4, hw: 3.4, hd: 0.25, h: 1.2 }];
};
GLD_FRONT.scribes = function (G) {
var w = G.pos.w, d = G.pos.d, br = gldMat(G.col.wall, "brick"), pale = gldMat(0xE0D8C8, "stone"), roof = gldMat(G.col.roof, "slate");
gldBox(w, 0.6, d, pale, 0, 0.3, 0);
gldBox(w, 12, d, br, 0, 6.6, 0);
for (var f = 1; f < 4; f++)
gldBox(w + 0.1, 0.22, 0.2, pale, 0, 0.6 + f * 3.6, d / 2 + 0.05);
gldBox(w + 0.6, 0.5, d + 0.6, pale, 0, 12.85, 0);
gldPitchRoof(w, d, 13.1, 3.6, roof, "x");
[-1, 1].forEach(function (s) { gldBox(1.4, 3.2, 1.4, br, s * (w / 2 - 2), 16, -1); gldBox(1.6, 0.3, 1.6, pale, s * (w / 2 - 2), 17.7, -1); });
for (var k = 0; k < 3; k++)
gldBox(3.4 - k * 0.3, 0.2, 1.2 - k * 0.3, pale, 0, 0.1 + k * 0.2, d / 2 + 0.6 - k * 0.15);
gldBox(2.2, 3.2, 0.12, gldMat(0x1A2A3A, "wood"), 0, 2.2, d / 2 + 0.04);
gldSph(0.06, GLD_BRASS(), 0.6, 2.1, d / 2 + 0.12, null, 8);
var fan = new THREE.Mesh(new THREE.CircleGeometry(1.1, 16, 0, Math.PI), gldGlowM(0xFFE8B0, 0.9));
fan.position.set(0, 3.85, d / 2 + 0.05);
gldP().add(fan);
for (var fl = 0; fl < 4; fl++) {
for (var i = 0; i < 5; i++) {
var x = -w / 2 + 2.4 + i * (w - 4.8) / 4;
if (fl === 0 && Math.abs(x) < 2)
continue;
gldLitWindow(x, 1.4 + fl * 3.6, d / 2 + 0.02, 1.2, fl === 3 ? 1.6 : 2.3, 0, fl === 3 ? 0xE8D8A8 : 0xFFE0A0);
}
}
gldSign(["THE SCRIVENERS AND SCHOLARS"], 4.4, 0.5, "#2A1A10", "#E8D8A8", 0, 4.35, d / 2 + 0.12, 0);
var br2 = gldPiece(w / 2 - 2.2, 4.2, d / 2 + 0.1, 0);
gldBox(0.08, 0.08, 1.4, GLD_IRON(), 0, 0, 0.7, br2);
gldBox(0.8, 1.0, 0.06, gldBannerMat(0x5A1A1A, 0xE8D8A8, "quill"), 0, -0.6, 1.1, br2);
gldLantern(-1.6, 3.4, d / 2 + 0.4, 0xFFE0A0, 0);
gldLantern(1.6, 3.4, d / 2 + 0.4, 0xFFE0A0, 0);
[-1, 1].forEach(function (s) { for (var r = 0; r < 7; r++)
gldBox(0.04, 1.0, 0.04, GLD_IRON(), s * (2.6 + r * 0.5), 0.5, d / 2 + 1.4); gldBox(3.2, 0.05, 0.05, GLD_IRON(), s * 4.1, 1.0, d / 2 + 1.4); });
return [{ x: 0, z: 0, hw: w / 2 + 0.3, hd: d / 2 + 0.3, h: 17 }, { x: -4.1, z: d / 2 + 1.4, hw: 1.6, hd: 0.1, h: 1.0 }, { x: 4.1, z: d / 2 + 1.4, hw: 1.6, hd: 0.1, h: 1.0 }];
};
GLD_FRONT.bards = function (G) { return __ZC(406, 106, this, arguments, new.target); };
GLD_FRONT.mariners = function (G) { return __ZC(406, 107, this, arguments, new.target); };
GLD_FRONT.smugglers = function (G) { return __ZC(406, 108, this, arguments, new.target); };
var gldSwkRoom0 = gldRoom;
gldRoom = function (R) { var r = gldSwkRoom0(R); try {
if (r && r.rec) {
r.rec.doors = R.doors || {};
r.rec.skip = R.skip || "";
}
}
catch (e) { } return r; };
var GLD_SWEEP = {
artisans: { wall: ["shelf:pots", "shelf:tools", "crates", "shelf:bolts", "sacks", "rack:tools", "barrel"], isle: ["bench", "pots", "stack", "bench", "table"],
who: [["joiner", "planing a board"], ["weaver", "sorting hanks of wool"], ["potter's lad", "carrying clay"], ["apprentice", "sweeping shavings"], ["carver", "cutting a moulding"]], pics: 1 },
smiths: { wall: ["rack:tongs", "shelf:ingots", "barrel", "crates", "rack:weapons", "coal", "chest"], isle: ["anvil", "bench", "stack", "anvil"],
who: [["striker", "swinging the sledge"], ["smith", "drawing out a bar"], ["apprentice", "hauling coal"], ["file-man", "filing a hinge"]], pics: 0 },
merchants: { wall: ["shelf:bolts", "shelf:jars", "crates", "sacks", "shelf:ledgers", "chest", "barrel"], isle: ["stack", "desk", "sacks", "table", "stack"],
who: [["clerk", "tallying a bill of lading"], ["factor", "weighing pepper"], ["porter", "carrying a bale"], ["buyer", "haggling"], ["tally-boy", "counting sacks"]], pics: 1 },
thieves: { wall: ["barrel", "crates", "shelf:dark", "chest", "rack:dark", "sacks", "shelf:bottles"], isle: ["cards", "stack", "table"],
who: [["fence", "weighing a stolen cup"], ["cutpurse", "counting coins"], ["lookout", "waiting"], ["picklock", "practising on a lock"]], pics: 0 },
spider: { wall: ["crates", "shelf:jars", "chest", "sacks", "barrel", "shelf:bottles"], isle: ["stack", "table"],
who: [["silk-spinner", "winding spider silk"], ["keeper", "feeding the brood"], ["acolyte", "carrying a lamp"]], pics: 0 },
healers: { wall: ["shelf:jars", "shelf:bottles", "chest", "sacks", "shelf:pots", "barrel", "shelf:books"], isle: ["herbs", "bed", "table", "herbs"],
who: [["herbalist", "grinding herbs"], ["nurse", "changing a dressing"], ["apothecary", "measuring a tincture"], ["orderly", "folding linen"]], pics: 1 },
scribes: { wall: ["shelf:books", "shelf:ledgers", "chest", "shelf:books", "crates", "shelf:jars"], isle: ["desk", "desk", "table", "stack"],
who: [["copyist", "copying a page"], ["illuminator", "laying gold leaf"], ["binder", "stitching a quire"], ["reader", "reading aloud"]], pics: 1 },
bards: { wall: ["shelf:books", "barrel", "chest", "shelf:bottles", "crates", "shelf:books"], isle: ["cards", "table", "stack", "table"],
who: [["lutenist", "tuning a lute"], ["singer", "going over a ballad"], ["drummer", "tapping a rhythm"], ["player", "learning lines"]], pics: 1 },
mariners: { wall: ["crates", "barrel", "shelf:tools", "rope", "chest", "shelf:bottles", "sacks"], isle: ["chart", "rope", "stack", "table"],
who: [["sailmaker", "stitching canvas"], ["navigator", "plotting a course"], ["rope-maker", "coiling a hawser"], ["bosun", "checking a tally"], ["cabin boy", "carrying a bucket"]], pics: 1 },
smugglers: { wall: ["barrel", "crates", "sacks", "chest", "barrel", "crates"], isle: ["stack", "cards", "stack", "table"],
who: [["smuggler", "stowing a cask"], ["tally-man", "marking crates"], ["lookout", "watching the water"], ["runner", "hauling a sack"]], pics: 0 }
};
function gldSwkFloorAt(K, x, z, y) { var F = K.floors; for (var i = 0; i < F.length; i++) {
var f = F[i];
if (x >= f.x0 && x <= f.x1 && z >= f.z0 && z <= f.z1 && Math.abs(f.y - y) < 0.25)
return true;
} return false; }
function gldSwkNearRamp(K, x, z, d) { var R = K.ramps; for (var i = 0; i < R.length; i++) {
var r = R[i];
if (x >= r.x0 - d && x <= r.x1 + d && z >= r.z0 - d && z <= r.z1 + d)
return true;
} return false; }
function gldSwkSegD(px, pz, a, b) { var dx = b.x - a.x, dz = b.z - a.z, L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((px - a.x) * dx + (pz - a.z) * dz) / L)); return Math.hypot(px - a.x - t * dx, pz - a.z - t * dz); }
function gldSwkWays(rm, doors) { return __ZC(406, 109, this, arguments, new.target); }
function GLD_SWK_WHY(k) { var S = GLD.sweepWhy || (GLD.sweepWhy = {}); S[k] = (S[k] || 0) + 1; return false; }
function gldSwkClear(K, keep, x, z, y, r, doors, ways) { return __ZC(406, 110, this, arguments, new.target); }
function gldSwkDoors(rm) { return __ZC(406, 111, this, arguments, new.target); }
function gldSwkWallPiece(kind, x, y, z, ry, h, seed) { return __ZC(406, 112, this, arguments, new.target); }
function gldSwkIsle(kind, x, y, z, ry, seed, key) { return __ZC(406, 113, this, arguments, new.target); }
function gldSweepHall(G, A) { return __ZC(406, 114, this, arguments, new.target); }
(function () {
Object.keys(GLD_BUILD).forEach(function (k) {
var name = GLD_BUILD[k], fn = window[name];
if (typeof fn !== "function")
return;
window[name] = function (G) { var A = fn.apply(this, arguments); try {
gldSweepHall(G, A || {});
}
catch (e) {
if (window.console)
console.warn("[city-guilds] sweep", G && G.k, e);
} return A; };
});
})();
