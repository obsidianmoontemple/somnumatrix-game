/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PRW_O = { x: -26000, z: 0, lon: -75, lat: 25, k: 600 };
function prwXZ(lon, lat) { return { x: PRW_O.x + (lon - PRW_O.lon) * PRW_O.k, z: -(lat - PRW_O.lat) * PRW_O.k }; }
var PRW_BOX = { x0: -37500, x1: -17000, z0: -11500, z1: 10500 };
function prwInBox(x, z) { return x > PRW_BOX.x0 && x < PRW_BOX.x1 && z > PRW_BOX.z0 && z < PRW_BOX.z1; }
var PRW_LANDS = [
{ n: "Cuba", lon: -79.5, lat: 21.9, a: 3300, b: 520, rot: -17, h: 90, col: 0x5A7A3A },
{ n: "Cuba (the east)", lon: -76.2, lat: 20.4, a: 1150, b: 420, rot: -8, h: 120, col: 0x5A7A3A },
{ n: "Hispaniola", lon: -71.0, lat: 19.0, a: 1900, b: 560, rot: -6, h: 160, col: 0x4A6A32 },
{ n: "Jamaica", lon: -77.3, lat: 18.12, a: 720, b: 250, rot: -4, h: 120, col: 0x4A7A34, skip: 1 },
{ n: "Puerto Rico", lon: -66.5, lat: 18.2, a: 560, b: 180, rot: 0, h: 90, col: 0x4A7A34 },
{ n: "Florida", lon: -81.3, lat: 28.5, a: 1500, b: 420, rot: -78, h: 12, col: 0x6A8A4A },
{ n: "Florida (the keys)", lon: -81.0, lat: 24.8, a: 520, b: 60, rot: 20, h: 3, col: 0xC8B880 },
{ n: "The Carolinas", lon: -79.0, lat: 34.6, a: 1700, b: 600, rot: -38, h: 20, col: 0x5A7A3A },
{ n: "Virginia and the north", lon: -74.5, lat: 39.5, a: 2000, b: 640, rot: -55, h: 40, col: 0x4A6A32 },
{ n: "Cape Cod and New England", lon: -71.0, lat: 42.6, a: 1100, b: 600, rot: -20, h: 40, col: 0x4A6A32 },
{ n: "Andros", lon: -78.0, lat: 24.4, a: 330, b: 150, rot: -20, h: 4, col: 0x8A9A5A },
{ n: "Eleuthera", lon: -76.2, lat: 25.2, a: 380, b: 40, rot: -50, h: 6, col: 0x8A9A5A },
{ n: "Grand Bahama and Abaco", lon: -78.3, lat: 26.7, a: 520, b: 80, rot: -12, h: 5, col: 0x8A9A5A },
{ n: "The Spanish Main", lon: -74.0, lat: 9.0, a: 5200, b: 700, rot: 4, h: 220, col: 0x4A6A2A },
{ n: "The Isthmus of Panama", lon: -80.5, lat: 8.2, a: 900, b: 380, rot: -20, h: 180, col: 0x3A5A26 },
{ n: "Yucatán", lon: -89.0, lat: 19.8, a: 1100, b: 700, rot: -10, h: 30, col: 0x5A7A3A },
{ n: "Louisiana", lon: -90.6, lat: 30.4, a: 1200, b: 420, rot: 2, h: 6, col: 0x5A6A3A }
];
var PRW_PORTS = [
{ k: "nassau", name: "Nassau, New Providence", lon: -77.35, lat: 25.06, r: 620, h: 22, col: 0x8A9A5A, rock: 0xC8B888, face: 0, style: "camp", year: "1716",
b: [["fort", "Fort Nassau (in ruins)"], ["tavern", "The Blue Anchor, a punch house"], ["tavern", "The careening tavern"], ["chandler", "A ship chandler's"], ["store", "A storehouse of plunder"],
["house", "The Governor's House (empty)"], ["church", "A chapel, roofless"], ["stocks", ""], ["gallows", "The gallows (from 1718)"], ["careen", ""], ["tents", ""], ["market", "The beach market"], ["wright", "A shipwright's yard"], ["house", "A trader's house"], ["house", "A house"], ["house", "A house"]],
card: "The Republic of Pirates, 1716 to 1718",
about: ["New Providence's harbour is deep enough for pirate sloops and too shallow for the Navy's big warships, it has a narrow way in and a hill to watch from, and it lies right beside the routes of the Spanish treasure fleets and the merchant ships of the Florida Strait. So the pirates took it.",
"The town was burned by French and Spanish raids in 1703 and the English governor was gone. By 1716 Benjamin Hornigold, Henry Jennings, Edward Teach, Sam Bellamy, Charles Vane and others had made it their base. A visitor in 1717 counted about a thousand pirates and fourteen sloops in the harbour.",
"There was no government, only the pirates' own rules. Merchants from Boston and Charleston quietly came to buy stolen goods cheap.",
"In July 1718 Captain Woodes Rogers arrived as Royal Governor with three warships and the King's Pardon. Most of the pirates took it. Charles Vane did not: he set a captured ship on fire, sent it at the Navy as a fireship, and escaped. In December 1718 Rogers hanged eight pirates who had gone back on their pardon, from a gallows by the ruined fort. His motto for the colony: 'Expulsis piratis, restituta commercia', pirates expelled, commerce restored."] },
{ k: "portroyal", name: "Port Royal, Jamaica", lon: -76.84, lat: 17.94, r: 560, h: 14, col: 0x7A9A4A, rock: 0xC8B890, face: 180, style: "eng", year: "1720",
b: [["fort", "Fort Charles"], ["tavern", "The Sign of the Mermaid"], ["tavern", "A punch house on Thames Street"], ["tavern", "A grog shop"], ["court", "The Admiralty court house"], ["gaol", "The Marshalsea gaol"], ["church", "St Paul's Church"], ["house", "A merchant's house"], ["chandler", "A ship chandler's"], ["store", "A goldsmith's"], ["wright", "The careening wharf"], ["stocks", ""], ["pillory", ""], ["gallows", "Gallows Point"], ["gibbet", ""], ["drowned", ""], ["market", "The market by the turtle crawls"], ["house", "A house"], ["house", "A house"]],
card: "'The wickedest city on earth', before and after the earthquake",
about: ["At the tip of the long sand spit that shelters Kingston Harbour. In the 1660s the English governors invited the buccaneers here to protect the island from Spain, and Port Royal grew rich on their plunder: by 1690 it was the busiest port in English America, with about 6,500 people, one drinking house for every ten of them, and goldsmiths, merchants and tradesmen of every kind. Henry Morgan sailed from here and died here, as Lieutenant Governor, in 1688.",
"At 11:43 in the morning of 7 June 1692 an earthquake struck. The sand under the town turned to liquid and about two-thirds of Port Royal slid into the sea in minutes. About 2,000 people died at once, and as many again of injury and fever after. The graveyard went into the sea with Morgan's grave in it. A clergyman wrote that many thought it God's judgement on the wickedest place on earth.",
"What was left was rebuilt smaller. In our year, 1720, the Admiralty court sits here and pirates are tried and hanged at Gallows Point, a sandy point a short walk from the town. In November 1720 Calico Jack Rackham and his men were hanged there, and Anne Bonny and Mary Read were sentenced to hang. In March 1721 Charles Vane followed them.",
"The drowned streets are still there under the water, with the houses standing where they fell."] },
{ k: "tortuga", name: "Tortuga", lon: -72.8, lat: 20.05, r: 520, h: 110, col: 0x5A7A3A, rock: 0x8A8070, face: 180, style: "fr", year: "1665",
b: [["fort", "The Fort de Rocher"], ["tavern", "A buccaneers' tavern"], ["tavern", "A wine shop"], ["boucan", "The boucan smokehouse"], ["chandler", "The trading house"], ["house", "The Governor's house"], ["church", "A chapel"], ["market", "The harbour market"], ["wright", "A careening beach"], ["stocks", ""], ["gallows", "The gallows"], ["house", "A house"], ["house", "A house"]],
card: "The rock of the buccaneers",
about: ["A small rocky island like a turtle's back, off the north coast of Hispaniola, with one good harbour on its southern side. From the 1630s it was the home of the buccaneers: men who had lived wild on Hispaniola hunting cattle and pigs, and smoking the meat on a wooden grill the Taíno called a barbacoa, the French a boucan. That is where their name comes from.",
"In 1640 the Frenchman Jean le Vasseur built a fort on a rock above the harbour, the Fort de Rocher, reached by an iron ladder pulled up behind him. He ruled the island so harshly that two of his own men murdered him in 1652.",
"Exquemelin, who lived among the buccaneers as a surgeon, wrote how they called each other 'brothers of the coast', shared their plunder by written agreement, and paid out compensation for wounds before anything else: for the loss of a right arm, 600 pieces of eight or six slaves; a left arm, 500; an eye, 100.",
"The cruellest of them, François l'Olonnais, sailed from here."] },
{ k: "havana", name: "Havana", lon: -82.36, lat: 23.13, r: 560, h: 18, col: 0x7A9A4A, rock: 0xC8B898, face: 0, style: "spa", year: "1715",
b: [["fort", "El Morro"], ["fort", "La Fuerza"], ["church", "The parish church"], ["house", "The Governor's palace"], ["tavern", "A bodega"], ["chandler", "The treasure house"], ["store", "A warehouse of the flota"], ["court", "The courthouse"], ["gaol", "The prison"], ["market", "The Plaza de Armas"], ["pillory", ""], ["gallows", "The gallows"], ["house", "A house"], ["house", "A house"]],
card: "Where the treasure fleets gathered",
about: ["Spain's greatest harbour in the Americas. Each year the silver of Mexico and Peru came here, from Veracruz and from Portobelo and Cartagena, and the ships waited in Havana to sail home together in one guarded fleet, the flota, up the Florida Strait on the Gulf Stream.",
"Castillo de los Tres Reyes del Morro, on the rock at the harbour's mouth, was finished in 1630. At night a great chain could be drawn across the narrow entrance.",
"To the Spanish, every English and French pirate was a criminal and every Spanish ship that took them was in the right; the coastguard ships, the guarda costas, took English traders too, sometimes on very little excuse. One English captain, Robert Jenkins, said in 1731 that a guarda costa officer had cut off his ear. The war that followed in 1739 is called the War of Jenkins' Ear."] },
{ k: "charlestown", name: "Charles Town, Carolina", lon: -79.93, lat: 32.78, r: 560, h: 10, col: 0x6A8A4A, rock: 0xC8B890, face: 90, style: "eng", year: "1718",
b: [["fort", "The walls and the half-moon battery"], ["court", "The Vice-Admiralty court"], ["gaol", "The watch house and gaol"], ["church", "St Philip's Church"], ["tavern", "A tavern on the Bay"], ["tavern", "The Carolina coffee house"], ["house", "The Marshal's house"], ["chandler", "A merchant's store"], ["store", "A rice warehouse"], ["market", "The market"], ["stocks", ""], ["pillory", ""], ["gallows", "White Point"], ["gibbet", ""], ["house", "A house"], ["house", "A house"], ["house", "A house"]],
card: "Blackbeard's blockade, and White Point",
about: ["The only walled English town in North America: a small, rich, frightened colony growing rice and trading deerskins.",
"In May 1718 Blackbeard sailed the Queen Anne's Revenge and three smaller ships into the harbour mouth and stopped every ship going in or out for about a week. He took a ship with leading men of the town aboard, held them hostage and sent word: send a chest of medicines, or the hostages' heads come to the governor. The town paid. The prisoners were let go, robbed of their fine clothes, and the pirates sailed away.",
"That autumn Colonel William Rhett sailed from here and captured Stede Bonnet in the Cape Fear River. Bonnet escaped from the Marshal's house dressed, it was said, in women's clothes, and was caught again on Sullivan's Island. Twenty-nine of his men were hanged at White Point in November 1718; Bonnet himself on 10 December. Their bodies were left hanging for days, then buried in the marsh below the low-water mark."] },
{ k: "ocracoke", name: "Ocracoke Inlet", lon: -75.98, lat: 35.1, r: 430, h: 8, col: 0xA8A86A, rock: 0xD8D0A8, face: 180, style: "camp", year: "1718",
b: [["camp", "Blackbeard's camp"], ["house", "A pilot's house"], ["tents", ""], ["tavern", "A shack where the rum is"], ["careen", ""]],
card: "Teach's Hole: where Blackbeard died",
about: ["A long thin island of sand in the Outer Banks of North Carolina, with an inlet through to the sounds behind. Blackbeard anchored his sloop Adventure in a deep channel here, still called Teach's Hole, after taking the governor's pardon.",
"In November 1718 Governor Alexander Spotswood of Virginia, not trusting North Carolina's governor, sent two small hired sloops, the Jane and the Ranger, under Lieutenant Robert Maynard of the Royal Navy to finish him.",
"At dawn on 22 November they came at him. Blackbeard's broadside wrecked the Ranger and badly hurt the Jane. Maynard hid most of his men below. Thinking them dead, Blackbeard boarded, and the men came up from the hold. Blackbeard and Maynard fired their pistols; then it was swords. Maynard's sword broke. Blackbeard was killed by his men: they found five pistol wounds in him and about twenty cuts. Maynard had the head cut off and hung from his bowsprit, and sailed home with it."] },
{ k: "portobelo", name: "Portobelo", lon: -79.65, lat: 9.55, r: 520, h: 70, col: 0x3A6A2A, rock: 0x7A7A60, face: 0, style: "spa", year: "1668",
b: [["fort", "The castle of Santiago"], ["fort", "San Jerónimo"], ["chandler", "The Customs House (the treasure house)"], ["church", "San Felipe"], ["house", "The Governor's house"], ["tavern", "A bodega"], ["store", "A fair warehouse"], ["market", "The fair ground"], ["gaol", "The prison"], ["gallows", "The gallows"], ["house", "A house"], ["house", "A house"]],
card: "The fair of the treasure, and Morgan's raid",
about: ["The Atlantic end of the road across the Isthmus. Peru's silver came up the Pacific to Panama City and was carried across the jungle by mule train to Portobelo, where once a year a great fair was held: merchants from Spain sold their goods for silver, and the treasure ships loaded it.",
"In July 1668 Henry Morgan came with about 500 men in canoes, attacked from the land side, and, Exquemelin says, made captured nuns and friars carry the scaling ladders up to the walls in front of them. The town was held for a month and ransomed for 100,000 pieces of eight.",
"In January 1596 Sir Francis Drake died of dysentery aboard his ship off this coast. He was buried at sea in a lead coffin, in full armour, it is said, near the harbour mouth."] },
{ k: "cartagena", name: "Cartagena de Indias", lon: -75.51, lat: 10.42, r: 580, h: 24, col: 0x5A7A3A, rock: 0xC8B898, face: 270, style: "spa", year: "1697",
b: [["fort", "San Felipe de Barajas"], ["fort", "The walls"], ["church", "The Cathedral"], ["court", "The Palace of the Inquisition"], ["gaol", "The cells"], ["house", "The Governor's palace"], ["tavern", "A bodega"], ["chandler", "The counting house"], ["store", "The fleet's warehouses"], ["market", "The Plaza"], ["pillory", ""], ["gallows", "The gallows"], ["house", "A house"], ["house", "A house"]],
card: "The walled city of the Main",
about: ["The strongest city on the Spanish Main: thick walls, the fortress of San Felipe on its hill, and forts at the harbour's mouths. Here the treasure fleet called each year on its way to Portobelo and Havana.",
"Even so it was taken more than once: by Drake in 1586, who held it for ransom, and in 1697 by a French fleet under the Baron de Pointis with buccaneers from the French Caribbean, who looted it of millions. The buccaneers said the Baron cheated them of their share, went back, and looted the town again on their own.",
"In 1741 a huge British fleet under Admiral Vernon besieged it in the War of Jenkins' Ear, and was beaten off with terrible loss, mostly to yellow fever."] },
{ k: "maracaibo", name: "Maracaibo", lon: -71.62, lat: 10.65, r: 470, h: 12, col: 0x6A8A3A, rock: 0xC8B890, face: 0, style: "spa", year: "1669",
b: [["fort", "The fort of La Barra"], ["church", "The church"], ["house", "The Governor's house"], ["tavern", "A bodega"], ["chandler", "A cacao warehouse"], ["market", "The plaza"], ["gaol", "The prison"], ["gallows", "The gallows"], ["house", "A house"], ["house", "A house"]],
card: "Sacked by l'Olonnais in 1667, by Morgan in 1669",
about: ["A rich town of cacao, hides and tobacco on the narrow strait into the great lake of Maracaibo. The way in was shallow and guarded by a fort.",
"In 1667 François l'Olonnais took the town with about 650 men and stayed two months. Exquemelin, who was there, writes of his cruelty to the prisoners to make them say where they had hidden their money.",
"In 1669 Henry Morgan sacked it again, and then found three Spanish warships waiting at the mouth of the lake to trap him. He filled a captured ship with tar and powder and set up logs on deck dressed in hats to look like gunners, sailed her at the Spanish flagship and set her alight. The flagship burned and Morgan escaped, after tricking the fort into turning its guns the wrong way."] },
{ k: "wreck1715", name: "The coast of the 1715 Fleet", lon: -80.4, lat: 27.8, r: 460, h: 8, col: 0xA8A87A, rock: 0xD8D0A8, face: 90, style: "camp", year: "1716",
b: [["camp", "The Spanish salvage camp at Palmar de Ayz"], ["tents", ""], ["store", "The silver store"], ["fort", "A wooden stockade"], ["market", ""]],
card: "Silver on the sea floor",
about: ["On the night of 30 to 31 July 1715 a hurricane caught the combined treasure fleet, eleven ships, off this coast of Florida, and smashed them on the reefs. About a thousand people drowned. Millions of pieces of eight went to the bottom in the shallows.",
"The Spanish set up a camp on the beach and sent divers down, many of them enslaved men, to bring the silver up. The news reached Jamaica and every rogue in the Caribbean came running.",
"In January 1716 Henry Jennings, with a Jamaican commission against pirates, came with three ships and about 300 men, drove the guards off and took the salvaged silver, about 120,000 pieces of eight. It was the money that started the pirates' Nassau.",
"Silver from the fleet still washes up on this beach after storms."] },
{ k: "tortugas", name: "The Dry Tortugas", lon: -82.87, lat: 24.63, r: 320, h: 4, col: 0xC8C08A, rock: 0xE8E0C0, face: 0, style: "camp", year: "1720",
b: [["camp", "A turtlers' camp"], ["tents", ""], ["careen", ""]],
card: "Turtles, reefs and wrecks",
about: ["A ring of tiny sand keys at the end of the Florida Keys, named by Ponce de León in 1513 for the turtles he caught here, 'dry' because there is no fresh water at all.",
"The reefs round them sank ship after ship. Sailors of the day ate sea turtles kept alive on deck on their backs, fresh meat for weeks."] },
{ k: "barataria", name: "Barataria Bay", lon: -89.95, lat: 29.3, r: 500, h: 4, col: 0x6A7A4A, rock: 0xA8A078, face: 180, style: "camp", year: "1813",
b: [["camp", "Lafitte's settlement on Grande Terre"], ["store", "The warehouses"], ["tavern", "A grog shop"], ["market", "The auction ground"], ["house", "Lafitte's house"], ["fort", "A battery"], ["tents", ""]],
card: "Jean Lafitte's smugglers' kingdom",
about: ["A maze of bayous, marsh and islands south of New Orleans. From about 1810 Jean Lafitte and his brother Pierre ran a smuggling base on Grande Terre island: privateers brought in captured Spanish goods and enslaved people and sold them at auctions here, free of American duties.",
"In 1814 the United States Navy raided and destroyed it. Months later, when the British attacked New Orleans, Lafitte offered his men, guns and flints to General Andrew Jackson, and they fought at the Battle of New Orleans in January 1815. President Madison pardoned them.",
"Lafitte moved to Galveston and went on as before; he was driven out in 1821 and probably died in a fight with Spanish ships in the Gulf of Honduras in 1823. The stories of his buried treasure are many; none has been found."] },
{ k: "gardiners", name: "Gardiners Island", lon: -72.1, lat: 41.1, r: 380, h: 16, col: 0x5A7A3A, rock: 0xB8A888, face: 180, style: "eng", year: "1699",
b: [["house", "The Gardiners' manor house"], ["store", "A barn"], ["camp", "Kidd's Hollow"], ["church", ""]],
card: "Where Captain Kidd buried his treasure",
about: ["A private island off the end of Long Island, owned by the Gardiner family since 1639.",
"In June 1699 Captain William Kidd anchored here on his way to Boston, where he hoped to clear his name. With John Gardiner's leave he buried a chest and a box of gold, silver and jewels in a hollow, and gave Mrs Gardiner a piece of cloth of gold.",
"Kidd was arrested in Boston. Governor Bellomont sent men to Gardiner, who handed it all over: gold dust and bars, silver, rubies and diamonds, worth more than £4,000 then. So Kidd's buried treasure was found, and that is the true story; all the others are tales."] },
{ k: "capecod", name: "Cape Cod, the Whydah's beach", lon: -69.95, lat: 41.95, r: 420, h: 30, col: 0x6A8A4A, rock: 0xD8C8A0, face: 90, style: "eng", year: "1717",
b: [["house", "A fisherman's house"], ["house", "The coroner's house"], ["tavern", "A tavern at Billingsgate"], ["camp", "The wreck on the bar"], ["church", "The meeting house"]],
card: "The wreck of Black Sam Bellamy's Whydah",
about: ["Sam Bellamy took the slave ship Whydah Gally, new and fast, in February 1717 and made her his flagship, with 28 guns and the plunder of more than fifty ships aboard.",
"On the night of 26 April 1717 a nor'easter drove her onto the outer bar off this beach. She rolled over and broke up. Of 146 aboard, only two men reached the shore alive. Bellamy was drowned, aged 28. The bodies of more than a hundred came ashore; the coroner's jury buried them.",
"Other men of Bellamy's crew, from a captured ship that also went aground, were tried in Boston and six were hanged.",
"In 1984 the wreck was found under the sand. In 1985 divers brought up the ship's bell, cast with her name: THE WHYDAH GALLY 1716. It is the only pirate wreck of the Golden Age ever named by its own bell."] }
];
var PRW_PIRATES = [
{ k: "hornigold", name: "Captain Benjamin Hornigold", at: "nassau", wear: "capt_plain", sex: "m", ship: "the Ranger, a sloop", years: "1713 to 1718",
life: "An Englishman who began raiding Spanish shipping from Nassau in small boats about 1713, and grew to command a 30-gun sloop. He was the founder of the pirates' Nassau and the teacher of Edward Teach and Sam Bellamy. He would not attack English ships, and in 1717 his crew voted him out for it.",
end: "He took the King's Pardon from Woodes Rogers in 1718 and turned pirate hunter for the governor. In 1719 his ship was wrecked on a reef in a storm, and he was drowned.",
persona: "You are Captain Benjamin Hornigold, in Nassau in 1716: the senior pirate captain of New Providence, steady, careful, proud, a seaman first. You call yourself a privateer still, against the Spaniards. You will not take an English ship and you lose patience with men who would. You taught young Teach and Bellamy, and you speak of them with an old captain's pride and worry." },
{ k: "teach", name: "Edward Teach, Blackbeard", at: "nassau", wear: "blackbeard", sex: "m", ship: "the Queen Anne's Revenge, 40 guns", years: "1716 to 1718",
life: "Probably from Bristol; a sailor in Queen Anne's War, then a pirate under Hornigold. In November 1717 he took the French slave ship La Concorde and made her his flagship, the Queen Anne's Revenge. He let his black beard grow long, twisted it into tails tied with ribbon, wore three braces of pistols in a sling over his shoulders and, Johnson says, stuck lit slow-matches under his hat in a fight, so that he looked like a fury from hell. He relied on terror more than killing, and few were killed by him before his last fight.",
end: "He blockaded Charles Town in May 1718, ran his flagship aground at Beaufort Inlet a month later, and took the governor of North Carolina's pardon. On 22 November 1718, at Ocracoke, Lieutenant Robert Maynard's men killed him: five pistol shots and some twenty cuts. His head hung from Maynard's bowsprit.",
persona: "You are Edward Teach, called Blackbeard, in 1717 or 1718. You are clever, theatrical, a born commander, and you know that fear wins fights before they start. You can be charming, mocking, or suddenly terrifying. You speak like an English seaman of the time. You will not tell where any treasure is, and you joke about it: 'only the devil and I know where it is, and the longest liver shall take all'." },
{ k: "bonnet", name: "Major Stede Bonnet", at: "nassau", wear: "gentleman", sex: "m", ship: "the Revenge, a sloop he bought", years: "1717 to 1718",
life: "A wealthy planter of Barbados with a wife and children, who in 1717, for reasons nobody knows (his neighbours blamed 'a disorder in his mind' and an unhappy marriage), bought a sloop, named her the Revenge, hired seventy men on wages, and went pirating. He knew nothing of the sea. Blackbeard took over his ship and kept him aboard the Queen Anne's Revenge as a kind of guest.",
end: "Captured by Colonel William Rhett in the Cape Fear River in September 1718. He escaped in Charles Town and was caught again. He begged the governor for mercy. He was hanged at White Point, Charles Town, on 10 December 1718, holding a little bunch of flowers.",
persona: "You are Major Stede Bonnet, the 'gentleman pirate', in 1717: educated, polite, anxious, proud of your library and your fine clothes, not much of a sailor and you know your crew know it. You admire Captain Teach and are a little afraid of him. You talk like a gentleman of Barbados." },
{ k: "vane", name: "Captain Charles Vane", at: "nassau", wear: "capt_rough", sex: "m", ship: "the Ranger", years: "1716 to 1719",
life: "A pirate in Nassau from the start, who raided the Spanish salvage of the 1715 fleet with Jennings. He was known as cruel to his prisoners and would not bend to anyone. When Woodes Rogers came with the pardon in July 1718, Vane set a captured French ship on fire and sent her drifting at the Navy, and escaped firing his guns.",
end: "In November 1718 he refused to fight a French warship and his crew voted him out and gave his command to Jack Rackham. He was wrecked on an island in the Bay of Honduras, recognised by a passing captain, taken to Jamaica, and hanged at Gallows Point on 29 March 1721. His body was hung in chains at Gun Cay, at the harbour mouth, as a warning.",
persona: "You are Captain Charles Vane in Nassau in 1718: hard, defiant, scornful of the King's Pardon and of anyone who takes it. You are brave but you are cautious about fights you cannot win, and you hate being told what to do. You talk rough and plain." },
{ k: "rackham", name: "Captain Jack Rackham, Calico Jack", at: "nassau", wear: "calico", sex: "m", ship: "the William, a sloop", years: "1718 to 1720",
life: "Charles Vane's quartermaster, elected captain in his place in November 1718. Called Calico Jack for the striped calico clothes he liked. He took the pardon in Nassau in 1719, fell for Anne Bonny there, and in August 1720 stole the sloop William out of Nassau harbour with her and Mary Read and went back to sea. He took mostly fishing boats and small sloops.",
end: "In October 1720 Captain Jonathan Barnet's sloop caught them at night off Negril Point, Jamaica, the men below drunk. Only Bonny and Read, it was said, fought. Rackham was hanged at Gallows Point on 18 November 1720 and his body hung in chains on a little cay at the entrance to Port Royal harbour, still called Rackham's Cay.",
persona: "You are Captain Jack Rackham, called Calico Jack, in 1720: vain about your striped calico clothes, easy-going, fond of rum and good company, more of a charmer than a fighter. You are in love with Anne Bonny and a little in awe of her. You speak like a cheerful English rogue." },
{ k: "bonny", name: "Anne Bonny", at: "nassau", wear: "bonny", sex: "f", ship: "the William, with Rackham", years: "1718 to 1720",
life: "Born in Ireland about 1697, Johnson says, the daughter of a lawyer and his maid, brought up in Carolina. She married a poor sailor, James Bonny, went with him to Nassau, and left him for Jack Rackham. She sailed with him dressed as a man in a fight and in women's clothes otherwise, and was as fierce as any of the crew.",
end: "Tried with Mary Read at Spanish Town in November 1720 and sentenced to hang; both said they were pregnant ('pleaded their bellies') and the hangings were put off. Her last words to Rackham, Johnson says, were that she was sorry to see him there, 'but had he fought like a man, he need not have been hanged like a dog'. What happened to her after that, nobody knows.",
persona: "You are Anne Bonny in Nassau in 1720: Irish-born, quick-tempered, fearless, sharp-tongued, scornful of cowards and of being told what a woman may do. You are with Jack Rackham. You speak boldly, with an Irish lilt." },
{ k: "read", name: "Mary Read", at: "nassau", wear: "read", sex: "f", ship: "the William, with Rackham", years: "1720",
life: "Born in England, dressed as a boy from childhood by her mother to keep an inheritance, she went to sea and then served as a soldier in Flanders, still disguised. She married a fellow soldier, and when he died went back to men's clothes and to sea; her ship was taken by pirates and she joined them, and so came to Rackham's crew.",
end: "Tried with Anne Bonny in November 1720 and sentenced to hang; she was with child and was reprieved. She died of a fever in prison in Jamaica, and was buried on 28 April 1721.",
persona: "You are Mary Read in 1720: an English former soldier who has passed as a man most of your life, brave, plain-spoken, practical, steadier than Anne Bonny and fiercer than most men. You do not talk much about yourself unless you trust someone. You speak plainly, like an English soldier." },
{ k: "jennings", name: "Captain Henry Jennings", at: "nassau", wear: "capt_plain", sex: "m", ship: "the Barsheba", years: "1715 to 1718",
life: "A well-off man of Jamaica with a commission against pirates, who in January 1716 raided the Spanish camp salvaging the wrecked 1715 fleet and carried off about 120,000 pieces of eight. Called a pirate for it, he made Nassau his base.",
end: "He took the King's Pardon in 1718 and went home. After that the record is thin: it is said he lived on in Bermuda as a man of property. Nobody is sure how he died.",
persona: "You are Captain Henry Jennings in Nassau in 1716: a gentleman of property and a privateer who says he never meant to be a pirate. Proud, calculating, quick to remind people you are no common rogue. You speak like a well-off Englishman of Jamaica." },
{ k: "bellamy", name: "Captain Samuel Bellamy, Black Sam", at: "nassau", wear: "bellamy", sex: "m", ship: "the Whydah Gally", years: "1716 to 1717",
life: "A young Englishman from Devon who went treasure hunting on the wrecks of the 1715 fleet, failed, and turned pirate under Hornigold. He wore his own black hair long and tied back, not a wig, hence 'Black Sam'. He was generous to prisoners and Johnson gives him a famous speech to a captured captain: 'they rob the poor under the cover of law, forsooth, and we plunder the rich under the protection of our own courage'.",
end: "His Whydah was wrecked off Cape Cod on 26 April 1717 in a storm. He was drowned, aged 28, with nearly all his crew.",
persona: "You are Captain Samuel Bellamy, Black Sam, in 1717: young, handsome, generous, eloquent, a rebel who calls the rich and the powerful the true thieves. You treat captives well. You speak with a West Country voice and a passion for freedom." },
{ k: "williams", name: "Paulsgrave Williams", at: "nassau", wear: "gentleman", sex: "m", ship: "the Marianne", years: "1716 to 1720",
life: "A silversmith's son from a respectable Rhode Island family, married with children, who went treasure hunting with Sam Bellamy and turned pirate with him.",
end: "He was not aboard the Whydah when she sank. He sailed on, at one time with Olivier Levasseur, and then disappears from the records about 1720. Nobody knows his end.",
persona: "You are Paulsgrave Williams in 1716: older, well-dressed, from a good Rhode Island family, Bellamy's steady partner. Wry and careful. You speak like a New England gentleman." },
{ k: "morgan", name: "Sir Henry Morgan", at: "portroyal", wear: "admiral", sex: "m", ship: "the Satisfaction", years: "1663 to 1671",
life: "A Welshman who rose to command the buccaneers of Port Royal, sailing with commissions from Jamaica's governors against Spain. He took Portobelo in 1668, Maracaibo in 1669 and crossed the Isthmus to sack Panama City in 1671, though by then England and Spain had made peace. He was arrested and sent to London; instead of being punished, he was knighted.",
end: "He came back to Jamaica as Lieutenant Governor in 1674 and hunted the pirates who had been his men. He grew fat and ill with drink and died at Port Royal on 25 August 1688. Four years later the earthquake took his grave into the sea.",
persona: "You are Sir Henry Morgan in about 1680, Lieutenant Governor of Jamaica: a knight now, rich, proud, a planter, who insists he was always a lawful privateer at war with Spain and never a pirate, and will sue anyone who says otherwise. You enjoy telling of Portobelo, Maracaibo and Panama. You speak like a Welsh gentleman who has drunk a good deal of rum." },
{ k: "olonnais", name: "François l'Olonnais", at: "tortuga", wear: "buccaneer", sex: "m", ship: "a captured Spanish ship", years: "1660s",
life: "A Frenchman from Les Sables-d'Olonne, sent to the Caribbean as an indentured servant, who became a buccaneer at Tortuga and the most feared of them all. Exquemelin describes his cruelty to prisoners, cutting them with his cutlass to make them talk; once, he says, l'Olonnais cut out a Spanish prisoner's heart and bit it before the others.",
end: "In 1668 or 1669 he was shipwrecked on the coast of Darién. Exquemelin writes that the people there, whom the Spaniards and buccaneers had wronged, caught him and tore him to pieces and burned him.",
persona: "You are François l'Olonnais, buccaneer of Tortuga, in 1667: cold, ruthless, ambitious, terrifying even to your own men; you hate the Spaniards. You speak French-accented English. You are proud of taking Maracaibo. You are frightening, not friendly." },
{ k: "roberts", name: "Captain Bartholomew Roberts", at: "tortuga", wear: "roberts", sex: "m", ship: "the Royal Fortune", years: "1719 to 1722",
life: "A Welsh sailor, John Robert, taken by the pirate Howell Davis at the age of about 37 in 1719. Six weeks later, Davis killed, the crew elected him captain. He said 'a merry life and a short one shall be my motto'. In under three years he took more than 400 ships, more than any other pirate of the age. He did not drink rum, only tea, and he dressed finely for a fight: a crimson damask waistcoat and breeches, a red feather in his hat and a diamond cross on a gold chain. His Articles are the most famous to survive.",
end: "On 10 February 1722, off Cape Lopez in Africa, HMS Swallow under Captain Chaloner Ogle caught him. Grapeshot tore his throat at the first broadside. His crew threw his body overboard in his finery, as he had asked. 52 of his men were hanged at Cape Coast Castle.",
persona: "You are Captain Bartholomew Roberts, Black Bart, in 1721: Welsh, tall, dark, a superb navigator, sober (tea, not rum), strict, devout in an odd way, a great believer in the Articles. 'A merry life and a short one' is your motto. You speak like a Welsh seaman who has risen high." },
{ k: "low", name: "Captain Edward Low", at: "portroyal", wear: "capt_rough", sex: "m", ship: "the Fancy", years: "1721 to 1724",
life: "A London pickpocket turned sailor who went pirate in 1721. Even other pirates feared him; Johnson and the newspapers of the day tell of his tortures of prisoners, too many and too cruel to list.",
end: "Nobody knows. In 1724 he vanishes from the records; it is said his crew turned him adrift, or that the French caught and hanged him in Martinique. Twenty-six of his crew were hanged at Newport, Rhode Island, in 1723.",
persona: "You are Captain Edward Low in 1722: a vicious, unpredictable man with a London accent, a former pickpocket, quick to anger and cruel for the fun of it. You are threatening and nasty to talk to. You never say anything kind." },
{ k: "rogers", name: "Governor Woodes Rogers", at: "nassau", wear: "governor", sex: "m", ship: "HMS Delicia", years: "1718",
life: "A Bristol sea captain who sailed round the world as a privateer from 1708 to 1711, took a Manila galleon, and rescued Alexander Selkirk, marooned four years on Juan Fernández. In 1718 the Crown made him first Royal Governor of the Bahamas to end the pirates' republic, and he arrived in July with the King's Pardon.",
end: "He drove the pirates out, hanged those who went back on their pardon, and built up the fort, but got little help from London and spent time in a debtors' prison. He was made governor again in 1729 and died in Nassau in 1732.",
persona: "You are Woodes Rogers, Royal Governor of the Bahamas, in Nassau in 1718: a hard, experienced, honest sea captain with a scarred face (a Spanish musket ball took part of your jaw), here to end the pirates' rule. You offer the King's Pardon to anyone who takes it before the deadline, and you mean the gallows for the rest." },
{ k: "maynard", name: "Lieutenant Robert Maynard", at: "ocracoke", wear: "navy", sex: "m", ship: "the Jane", years: "1718",
life: "First lieutenant of HMS Pearl, sent by Governor Spotswood of Virginia with two hired sloops to find Blackbeard.",
end: "He killed Blackbeard at Ocracoke on 22 November 1718 and brought back the head on his bowsprit. He was made a commander in 1740 and died in 1751.",
persona: "You are Lieutenant Robert Maynard of the Royal Navy in November 1718, at Ocracoke: a determined, practical officer. You have come to finish Blackbeard. You speak like an English naval officer: brisk and plain." },
{ k: "barnet", name: "Captain Jonathan Barnet", at: "portroyal", wear: "navy", sex: "m", ship: "a sloop commissioned by the governor", years: "1720",
life: "A captain commissioned by the governor of Jamaica to hunt pirates.",
end: "He caught Calico Jack Rackham, Anne Bonny and Mary Read off Negril Point at night in October 1720.",
persona: "You are Captain Jonathan Barnet of Jamaica in 1720, a pirate hunter with the governor's commission. Blunt and businesslike. You speak like a sea captain of Jamaica." },
{ k: "blackcaesar", name: "Caesar", at: "ocracoke", wear: "crew", sex: "m", ship: "Blackbeard's Adventure", years: "1718",
life: "An African man who sailed in Blackbeard's crew. Legends of the Florida Keys tell of a pirate called Black Caesar there, but the true record is this: at Ocracoke, when the fight was lost, Caesar sat in the powder room with a lit match, ready to blow the ship up as Blackbeard had ordered, and was stopped by two prisoners aboard.",
end: "He was taken to Williamsburg, Virginia, tried, and hanged in March 1719 with others of the crew.",
persona: "You are Caesar, a free African seaman in Blackbeard's crew in 1718. You are loyal to Teach, tough, quiet, dignified, and you know exactly how dangerous your captain is. You speak little and plainly." }
];
var PRW_BY = {};
PRW_PORTS.forEach(function (p) { PRW_BY[p.k] = p; });
var PRW_PBY = {};
PRW_PIRATES.forEach(function (p) { PRW_PBY[p.k] = p; });
var PRW_RANKS = [
{ k: "boy", n: "Ship's boy", s: "Swab the deck, fetch and carry, learn the ropes." },
{ k: "monkey", n: "Powder monkey", s: "Run the cartridges from the magazine to the guns in a fight." },
{ k: "seaman", n: "Able seaman", s: "Go aloft, hand, reef and steer." },
{ k: "gunner", n: "Gunner's mate", s: "Load, run out, aim and fire a great gun." },
{ k: "bosun", n: "Boatswain", s: "Rigging, sails, anchors, and the crew's work." },
{ k: "qm", n: "Quartermaster", s: "The crew's own officer: shares out the plunder, judges quarrels, leads boarders." },
{ k: "captain", n: "Captain", s: "Elected by the crew, and only in a chase or a fight is your word law." }
];
var PRW_WEAR = {
blackbeard: { cut: "coat", coat: 0x141414, vest: 0x3A1E14, trou: 0x1E1A16, stock: 0x2A2420, sash: 0x6A1A1A, hat: "tricorn", hc: 0x0E0E0E, held: "cutlass", bando: 1, beard: "tails", matches: 1 },
capt_plain: { cut: "coat", coat: 0x2A3A5A, vest: 0x8A6A3A, trou: 0x3A3A3A, stock: 0xE8E0CC, sash: 0x8A2A1E, hat: "tricorn", hc: 0x1A1A1A, held: "spyglass" },
capt_rough: { cut: "coat", coat: 0x4A2A1A, vest: 0x2A2A2A, trou: 0x2A2420, stock: 0x6A5A4A, sash: 0x1A1A1A, hat: "tricorn", hc: 0x2A1E14, held: "cutlass", bando: 1 },
gentleman: { cut: "coat", coat: 0x5A2A4A, vest: 0xD8C8A0, trou: 0x2A2A3A, stock: 0xF0ECE0, sash: null, hat: "tricorn", hc: 0x1A1A1A, held: "posy", wig: 1 },
calico: { cut: "coat", coat: 0xC8C0A8, stripe: 0xA83A2A, vest: 0xE8D8B8, trou: 0xC8B898, stock: 0xF0ECE0, sash: 0xA83A2A, hat: "tricorn", hc: 0x3A2A1E, held: "mug" },
bonny: { cut: "womanpirate", coat: 0x2A4A3A, vest: 0xE8E0CC, trou: 0x4A3A2A, sash: 0xB82A2A, hat: "kerchief", hc: 0xB82A2A, held: "pistols" },
read: { cut: "womanpirate", coat: 0x6A1E1A, vest: 0xE8E0CC, trou: 0x3A3A40, sash: 0x1A1A1A, hat: "tricorn", hc: 0x1A1A1A, held: "cutlass" },
bellamy: { cut: "coat", coat: 0x1E2A3A, vest: 0xC8A040, trou: 0x2A2A2A, stock: 0xF0ECE0, sash: 0x1A1A1A, hat: "tricorn", hc: 0x141414, held: "pistols", ownhair: 1 },
roberts: { cut: "coat", coat: 0x8A1414, vest: 0xA81E1E, trou: 0xA81E1E, stock: 0xF4F0E4, sash: 0xC8A040, hat: "feather", hc: 0x1A1A1A, plume: 0xC81E1E, held: "pistols", cross: 1 },
admiral: { cut: "coat", coat: 0x7A1A1A, vest: 0xC8A040, trou: 0x2A2A2A, stock: 0xF4F0E4, sash: 0x1E2A5A, hat: "tricorn", hc: 0x141414, held: "cutlass", wig: 1, lace: 1 },
buccaneer: { cut: "shirt", coat: 0x8A7A5A, vest: 0xC8B898, trou: 0x6A5A3A, sash: 0x5A2A1A, hat: "slouch", hc: 0x4A3A22, held: "musket", bloody: 1 },
governor: { cut: "coat", coat: 0x2A2A3A, vest: 0xC8B890, trou: 0x2A2A3A, stock: 0xF4F0E4, sash: null, hat: "tricorn", hc: 0x141414, held: "book", wig: 1, lace: 1 },
navy: { cut: "coat", coat: 0x1E2A4A, vest: 0xE8E0CC, trou: 0xE8E0CC, stock: 0xF4F0E4, sash: null, hat: "tricorn", hc: 0x141414, held: "cutlass", lace: 1 },
marine: { cut: "military", coat: 0xA81E1E, vest: 0xE8D8A8, trou: 0xE8D8A8, hat: "tricorn", hc: 0x141414, held: "musket" },
spanish: { cut: "military", coat: 0xE8E0CC, vest: 0x2A4A8A, trou: 0x2A4A8A, hat: "tricorn", hc: 0x141414, held: "musket" },
crew: { cut: "jacket", coat: null, vest: null, trou: 0xD8D0B8, sash: null, hat: null, held: null },
sailor: { cut: "jacket", coat: null, vest: null, trou: 0xD8D0B8, sash: null, hat: null, held: null },
deckhand: { cut: "shirt", coat: null, vest: null, trou: 0xD8D0B8, sash: null, hat: null, held: null },
merchant: { cut: "coat", coat: null, vest: null, trou: null, stock: 0xF0ECE0, hat: "tricorn", hc: 0x1A1A1A, held: null, wig: 1 },
dons: { cut: "coat", coat: 0x141414, vest: 0x2A2A2A, trou: 0x141414, stock: 0xF4F0E4, hat: "slouch", hc: 0x141414, held: null, ruff: 1 },
priest: { cut: "priest", coat: 0x141414, hat: "slouch", hc: 0x141414, held: "book" },
worker: { cut: "slave", coat: 0xD8CCB0, trou: 0xC8BCA0, hat: "headwrap", hc: 0xD8CCB0, held: null },
lady: { cut: "lady", coat: null, hat: "coif", hc: 0xF4F0E8 },
woman: { cut: "lady", coat: null, hat: "kerchief", hc: null, apron: 1 },
doña: { cut: "lady", coat: 0x141414, hat: "mantilla", hc: 0x141414 },
man: { cut: "jacket", coat: null, vest: null, trou: null, hat: "tricorn", hc: null, held: null, shoes: 1 }
};
var PRW_KEYS = {};
PRW_PIRATES.forEach(function (p) { PRW_KEYS[p.k] = p.wear; });
function prwOwn(v, d) { return v != null ? v : d; }
function prwWearFor(L, o) { return __ZC(462, 0, this, arguments, new.target); }
function prwM(col, o) { return typeof wfMat === "function" ? wfMat(col, o) : new THREE.MeshStandardMaterial({ color: col }); }
function prwG(k, mk) { return typeof wfGeo === "function" ? wfGeo("prw-" + k, mk) : mk(); }
var PRW_HAT = {
slouch: function (add, c, W) { return __ZC(462, 1, this, arguments, new.target); },
feather: function (add, c, W) { PRW_HAT.slouch(add, c, W); },
monmouth: function (add, c) { var m = new THREE.Mesh(prwG("monm", function () { return new THREE.SphereGeometry(0.135, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }), prwM(c, { r: 1 })); m.scale.set(1, 1.15, 1.06); add("Head", [0, 0.1, -0.02], m); },
mantilla: function (add, c) { return __ZC(462, 2, this, arguments, new.target); }
};
var PRW_HELD = {
cutlass: function (add, W) { return __ZC(462, 3, this, arguments, new.target); },
pistols: function (add) { return __ZC(462, 4, this, arguments, new.target); },
musket: function (add) { return __ZC(462, 5, this, arguments, new.target); },
spyglass: function (add) { return __ZC(462, 6, this, arguments, new.target); },
posy: function (add) { return __ZC(462, 7, this, arguments, new.target); }
};
function prwBlackbeard(add, E) { return __ZC(462, 8, this, arguments, new.target); }
function prwCross(add) { return __ZC(462, 9, this, arguments, new.target); }
function prwWig(add, c) { return __ZC(462, 10, this, arguments, new.target); }
function prwRuff(add) { var r = new THREE.Mesh(prwG("ruff", function () { return new THREE.TorusGeometry(0.075, 0.03, 8, 20); }), prwM(0xF4F2EC, { r: 1 })); r.rotation.x = Math.PI / 2; add("Neck", [0, 0.02, 0], r); }
function prwProps(add, c, E) { return __ZC(462, 11, this, arguments, new.target); }
(function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined")
return;
WDR_COST.oz_prw = { rb: 1, ownHead: true, look: { hat: "none", role: "" }, props: function (add, c, E) { try {
prwProps(add, c, E);
}
catch (e) {
if (window.console)
console.warn("[prw] props", e);
} } };
OZ_WEAR.oz_prw = function (L, o) { return prwWearFor(L, o); };
})();
(function () {
if (typeof wPerson !== "function")
return;
var w0 = wPerson;
wPerson = function (seed, o) {
o = o || {};
if (/^prw_/.test(String(seed)) && !o.ozCos && !o.noCos && !o.child && typeof WDR_COST !== "undefined" && WDR_COST.oz_prw) {
var look = Object.assign({}, o.look || {});
if (!look._pw) {
var m = /^prw_([a-zñ_]+?)_\d/.exec(String(seed));
look._pw = m && PRW_WEAR[m[1]] ? m[1] : (o.sex === "f" ? "woman" : "man");
}
if (look._pr == null) {
var hh = 0, s = String(seed);
for (var i = 0; i < s.length; i++)
hh = (hh * 31 + s.charCodeAt(i)) >>> 0;
look._pr = (hh % 1000) / 1000;
}
o = Object.assign({}, o, { ozCos: "oz_prw", look: look });
var g = w0.call(this, seed, o);
try {
g.userData.pwRole = look._pw;
}
catch (e) { }
return g;
}
return w0.call(this, seed, o);
};
})();
var PRW = { on: false, built: {}, lands: [], ports: [], solids: [], people: [], talkers: [], tickers: [], t: 0, banner: "", inBox: false, boxSaid: 0, lastBuild: 0, lite: false };
function prwLite() { return typeof LITE !== "undefined" && !!LITE; }
function prwEsc(t) { return typeof esc === "function" ? esc(t) : String(t); }
function prwMakePlaces() { return __ZC(462, 12, this, arguments, new.target); }
function prwLandH(p, x, z) { return __ZC(462, 13, this, arguments, new.target); }
(function () {
if (typeof seaIsleH !== "function")
return;
var ih = seaIsleH;
seaIsleH = function (p, x, z) { if (p && p.prwLand)
return prwLandH(p, x, z); return ih.apply(this, arguments); };
})();
var PRW_MC = {};
function prwMat(col, o) { return __ZC(462, 14, this, arguments, new.target); }
function prwBox(w, h, d, col, x, y, z, g, o) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), prwMat(col, o)); m.position.set(x, y, z); g.add(m); return m; }
function prwCyl(rt, rb, h, col, x, y, z, g, seg, o) { var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 10), prwMat(col, o)); m.position.set(x, y, z); g.add(m); return m; }
function prwSph(r, col, x, y, z, g, seg, o) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 10, Math.max(6, ((seg || 10) * 0.6) | 0)), prwMat(col, o)); m.position.set(x, y, z); g.add(m); return m; }
function prwCone(r, h, col, x, y, z, g, seg, o) { var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg || 8), prwMat(col, o)); m.position.set(x, y, z); g.add(m); return m; }
function prwLetGo(g) {
if (!g)
return;
if (g.parent)
g.parent.remove(g);
if (typeof evbLetGo === "function")
return evbLetGo(g);
g.traverse(function (o) { if (o.geometry && o.geometry.dispose && !(o.geometry.userData && o.geometry.userData.shared))
o.geometry.dispose(); });
}
(function () {
if (typeof seaBuild !== "function")
return;
var sb = seaBuild;
seaBuild = function (G) {
var r = sb.apply(this, arguments);
try {
prwMakePlaces();
PRW.built = {};
PRW.solids = [];
PRW.people = [];
PRW.talkers = [];
PRW.decks = [];
PRW.ports.concat(PRW.lands).forEach(function (p) { SEA.isles.push(p); });
}
catch (e) {
if (window.console)
console.warn("[prw] places", e);
}
return r;
};
if (typeof seaGenTick === "function") {
var gt = seaGenTick;
seaGenTick = function () {
try {
var cs = 3000, cx = Math.round(SEA.sx / cs), cz = Math.round(SEA.sz / cs);
for (var i = -1; i <= 1; i++)
for (var j = -1; j <= 1; j++) {
var gx = cx + i, gz = cz + j, key = gx + ":" + gz;
if (SEA.gen[key] !== undefined)
continue;
var x = gx * cs, z = gz * cs;
if (x > PRW_BOX.x0 - 2200 && x < PRW_BOX.x1 + 2200 && z > PRW_BOX.z0 - 2200 && z < PRW_BOX.z1 + 2200)
SEA.gen[key] = null;
}
}
catch (e) { }
return gt.apply(this, arguments);
};
}
if (typeof seaChart === "function") {
var sc = seaChart;
seaChart = function () {
if (SEA.lotus > 0)
return sc.apply(this, arguments);
var keep = SEA.isles;
SEA.isles = keep.filter(function (p) { return !p.prw && !p.prwLand; });
try {
sc.apply(this, arguments);
}
finally {
SEA.isles = keep;
}
try {
var c = WLD.card;
if (c && c.style.display === "block") {
var d = document.createElement("div");
d.innerHTML = worldBtn("prw-chart", "🏴‍☠️ The Sweet Trade: the pirates' Caribbean", "Nassau, Port Royal, Tortuga and the Spanish Main · 1665 to 1720 · danger level 4");
var b = d.firstChild;
b.style.borderColor = "rgba(232,120,90,.6)";
b.style.background = "rgba(160,40,30,.12)";
b.onclick = function () { prwChart(); };
var t = c.querySelector("[data-w]:not([data-w='close'])");
if (t && t.parentNode)
t.parentNode.insertBefore(b, t);
else
c.appendChild(b);
}
}
catch (e) { }
};
}
})();
function prwDist(p) { return Math.hypot(p.x - SEA.sx, p.z - SEA.sz); }
function prwChart() { return __ZC(462, 15, this, arguments, new.target); }
function prwHere() { return typeof WLD !== "undefined" && WLD.on === "sea" && typeof SEA !== "undefined" && prwInBox(SEA.sx, SEA.sz) && (SEA.aboard || (SEA.shore && (SEA.shore.prw || SEA.shore.prwLand))); }
(function () {
if (typeof dgrLevelOf === "function") {
var lo = dgrLevelOf;
dgrLevelOf = function (id) { var n = lo.apply(this, arguments); if (id === "sea" && prwHere())
return Math.max(n, PRW_LEVEL()); return n; };
}
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (html) { try {
if (html && prwHere() && html.indexOf("<b>The Endless Sea</b>") === 0)
html = "<b>🏴‍☠️ The Sweet Trade</b>" + html.slice("<b>The Endless Sea</b>".length) + (PRW.banner || "");
}
catch (e) { } return wb.call(this, html); };
}
})();
function PRW_LEVEL() { var k = store && store.prwKeep; return k && k.level != null ? k.level : 4; }
(function () {
if (typeof seaTick !== "function")
return;
var st = seaTick;
seaTick = function (dt) {
var r = st.apply(this, arguments);
try {
prwTick(dt);
}
catch (e) {
if (window.console && !PRW.err) {
PRW.err = 1;
console.warn("[prw] tick", e);
}
}
return r;
};
})();
function prwTick(dt) { return __ZC(462, 16, this, arguments, new.target); }
function prwBuildLand(p) { return __ZC(462, 17, this, arguments, new.target); }
function prwDropLand(p) { var B = PRW.built[p.k]; if (B)
prwLetGo(B.g); delete PRW.built[p.k]; }
function prwBuildPort(p) { return __ZC(462, 18, this, arguments, new.target); }
function prwDropPort(p) { return __ZC(462, 19, this, arguments, new.target); }
(function () {
if (typeof worldGo === "function") {
var wg = worldGo;
worldGo = function (key) { try {
if (key === "sea" && WORLDS.sea && !WORLDS.sea.g)
PRW.built = {};
}
catch (e) { } return wg.apply(this, arguments); };
}
})();
var PRW_STY = {
eng: { walls: [0xE8E0CC, 0xD8CCB0, 0xC8B8A0, 0x9A7A5A, 0xE0D8C0, 0xB89A78], trim: 0xF0ECE0, roof: [0x5A4A3A, 0x4A3E34, 0x6A5A48], shut: [0x3A5A3A, 0x2A3A5A, 0x6A2A1E, 0x3A3A3A], kind: "gable", porch: 0.6, chim: 0x8A4A3A },
spa: { walls: [0xF4F0E8, 0xEDE4D0, 0xE8D0A0, 0xE8C0A8, 0xF0E0C0, 0xD8E0D8], trim: 0xF8F6F0, roof: [0xB8583A, 0xA84A2E, 0xC86A48], shut: [0x2A4A3A, 0x3A2A1A, 0x2A3A5A, 0x5A3A1E], kind: "hip", porch: 0.2, balc: 1, chim: null },
fr: { walls: [0xC8BCA8, 0xD8CCB8, 0xB8AC98, 0xE0D8C8], trim: 0xE8E0D0, roof: [0x4A4A52, 0x5A5A62, 0x3A3A42], shut: [0x2A4A6A, 0x3A5A3A, 0x5A2A1E], kind: "steep", porch: 0.3, chim: 0x8A7A6A },
camp: { walls: [0x8A7A5A, 0x7A6A4A, 0x9A8A6A, 0x6A5A42], trim: 0xA89A78, roof: [0xC8B070, 0xB8A060, 0xA89058], shut: [0x5A4A3A, 0x4A3A2A], kind: "thatch", porch: 0.8, chim: null }
};
function prwRoof(g, w, d, h, col, kind, y) { return __ZC(462, 20, this, arguments, new.target); }
function prwWin(g, x, y, z, ry, shut, frame, w, h) { return __ZC(462, 21, this, arguments, new.target); }
function prwHouse(g, S, R, o) { return __ZC(462, 22, this, arguments, new.target); }
function prwSign(g, lines, x, y, z) {
var s = wSign(lines, 2.6, 1.2, "#2A1E14", "#E8D0A0");
s.position.set(x, y, z);
s.userData.keep = 1;
g.add(s);
prwBox(0.08, 0.08, 1.4, 0x2A1E14, x, y + 0.75, z - 0.6, g);
return s;
}
function prwTavern(g, S, R, name) { return __ZC(462, 23, this, arguments, new.target); }
function prwChurch(g, S, R) { return __ZC(462, 24, this, arguments, new.target); }
function prwFort(g, S, R, o) { return __ZC(462, 25, this, arguments, new.target); }
var PRW_FLAGTEX = {};
function prwFlagTex(k) { return __ZC(462, 26, this, arguments, new.target); }
function prwFlag(k, w, h) { var geo = new THREE.PlaneGeometry(w || 3.2, h || 2, 8, 3); geo.translate((w || 3.2) / 2, 0, 0); var m = new THREE.Mesh(geo, prwMat(0xFFFFFF, { map: prwFlagTex(k), ds: 1 })); m.userData.flag = 1; m.userData.keep = 1; return m; }
function prwShip(kind, o) { return __ZC(462, 27, this, arguments, new.target); }
function prwAdult() { try {
return typeof ageAdult === "function" && ageAdult();
}
catch (e) {
return false;
} }
function prwGallows(g, R) { return __ZC(462, 28, this, arguments, new.target); }
function prwStocks(g) { return __ZC(462, 29, this, arguments, new.target); }
function prwPillory(g) {
var wd = 0x5A4A34;
prwBox(2.4, 0.9, 2.4, 0x7A6A54, 0, 0.45, 0, g);
prwBox(0.22, 2.4, 0.22, wd, 0, 2.1, 0, g);
prwBox(1.6, 0.34, 0.14, wd, 0, 2.55, 0.14, g);
return { hw: 1.3, hd: 1.3 };
}
function prwGibbet(g, adult) { return __ZC(462, 30, this, arguments, new.target); }
function prwBones(g, x, y, z) { return __ZC(462, 31, this, arguments, new.target); }
function prwT(p, u, v) { var a = p.town.ry, fx = Math.sin(a), fz = Math.cos(a); return { x: p.town.x + fz * u + fx * v, z: p.town.z - fx * u + fz * v }; }
function prwGy(p, x, z) { return Math.max(seaIsleH(p, x, z), 0.8); }
function prwPalm(g, x, y, z, R) { return __ZC(462, 32, this, arguments, new.target); }
function prwPlace(p, B, S, u, v, ry, fn, R, solid) { return __ZC(462, 33, this, arguments, new.target); }
function prwFacing(p, u, v) { var c = prwT(p, u, v), m = prwT(p, 0, 0); return Math.atan2(m.x - c.x, m.z - c.z); }
var PRW_THEME = { tavern: "prtavern", house: "prhouse", gov: "prgov", church: "prchurch", fort: "prfort", chandler: "prchandler", store: "prstore", court: "prcourt", gaol: "prgaol", boucan: "prboucan", wright: "prwright" };
function prwTown(p, g, B) { return __ZC(462, 34, this, arguments, new.target); }
function prwPortCard(p) {
var fol = PRW_PIRATES.filter(function (q) { return q.at === p.k; });
worldCard(worldFacts(p.name, p.card + " · " + p.year, [], p.about, fol.length ? "<div style='margin-top:8px;opacity:.85'><b>Who is here:</b> " + fol.map(function (q) { return prwEsc(q.name); }).join(", ") + "</div>" : ""));
}
function prwFortCard(p, name) { return __ZC(462, 35, this, arguments, new.target); }
function prwWharf(p, B, R) { return __ZC(462, 36, this, arguments, new.target); }
function prwDrowned(p, B, R) { return __ZC(462, 37, this, arguments, new.target); }
function prwCareen(p, B, R) { return __ZC(462, 38, this, arguments, new.target); }
function prwTents(p, B, R) { return __ZC(462, 39, this, arguments, new.target); }
function prwCampSpot(p, B, R, name) { return __ZC(462, 40, this, arguments, new.target); }
function prwMarket(p, B, R, name) { return __ZC(462, 41, this, arguments, new.target); }
function prwMarketCard(p) { return __ZC(462, 42, this, arguments, new.target); }
function prwBoucan(g, S, R) { return __ZC(462, 43, this, arguments, new.target); }
function prwWright(p, B, R, name) { return __ZC(462, 44, this, arguments, new.target); }
function prwGibbets(p, B, adult) { return __ZC(462, 45, this, arguments, new.target); }
function prwRoomsOf(list) {
var fins = {}, rooms = {};
list.forEach(function (r) {
var k = r[0];
fins[k] = r[2];
var fn = r[6] ? function () { evbCard(r[4], r[5], r[6].map(function (b) { return [b[0], function () { worldCard(null); if (typeof b[1] === "function")
b[1]();
else {
if (b[2])
evbTune(b[2], 260, 0.5);
evbSay(b[1]);
} }]; })); } : evbInfo(r[4], r[5]);
var spec = Object.assign({}, r[3]);
spec.acts = [[0.5, 0, 1.9, r[4], r[7] || "read", fn]];
rooms[k] = spec;
});
evbFins(fins);
evbRooms(rooms);
}
function prwPlan1(rs) {
var ks = ["hall", "spine", "gallery", "back", "r1i", "r1o", "r2i", "r2o", "r3i", "r3o", "l1i", "l1o", "l2i", "l2o", "l3i", "l3o"], p = {};
ks.forEach(function (k, i) { var r = rs[i]; if (!r)
return; p[k] = k === "back" ? { merge: EVB_BACK, k: r[0], n: r[1] } : { k: r[0], n: r[1] }; });
return p;
}
function prwPlan2(rs) {
var p = { hall: { k: rs[0][0], n: rs[0][1] }, spine: { k: rs[1][0], n: rs[1][1] }, gallery: { k: rs[2][0], n: rs[2][1] }, back: { merge: EVB_BACK, k: rs[3][0], n: rs[3][1] },
r1: { merge: ["r1i", "r1o"], k: rs[4][0], n: rs[4][1] }, r23: { merge: ["r2i", "r2o", "r3i", "r3o"], k: rs[5][0], n: rs[5][1] }, l1: { merge: ["l1i", "l1o"], k: rs[6][0], n: rs[6][1] }, l23: { merge: ["l2i", "l2o", "l3i", "l3o"], k: rs[7][0], n: rs[7][1] } };
return p;
}
function prwInside(key, o) {
evbTheme(key, { corner: o.corner || "barrel", seed: o.seed, panel: o.panel || 0xC8B898, pal: Object.assign({ fab: "terracotta", fab2: "navy", wood: "oak", metal: "iron", stone: "granite", art: 3, rug: 0, rugv: 0 }, o.pal || {}),
remap: { "D6D0C6|plaster": [o.wall || 0xE0D4BC, "plaster"], "D8D0C0|coffer": [0x4A3A2A, "wood"] }, hello: o.hello });
var plan = [prwPlan1(o.down)];
if (o.up)
plan.push(prwPlan2(o.up));
evbHouse(key, { g: o.grid || EVB_GRID.mid, h: o.h || 3.6, levels: o.up ? 2 : 1, stairX: 3.5, stairZ: 11, floors: o.floors || ["Downstairs", "Upstairs"], wall: o.wall || 0xE0D4BC, trim: o.trim || 0x3A2A1A, plan: plan });
prwRoomsOf(o.down.concat(o.up || []));
}
var PW_W = ["wood", 0x6A4A2A, 0xD8CCB0, "wood", 0x3A2A1A], PW_P = ["wood", 0x7A5A3A, 0xE8DCC0, "plaster", 0x4A3A2A], PW_S = ["stone", 0x8A8070, 0xC8BCA8, "stone", 0x4A3A2A], PW_T = ["tile", 0xB8684A, 0xF0E8D8, "plaster", 0x5A3A1E], PW_D = ["stone", 0x5A5448, 0x8A8070, "stone", 0x2A2420];
function prwDrink() { return __ZC(462, 46, this, arguments, new.target); }
function prwDice() { return __ZC(462, 47, this, arguments, new.target); }
prwInside("prtavern", { seed: 401, corner: "barrel", wall: 0xD8CCB0, pal: { fab: "crimson", fab2: "mustard", wood: "oak", metal: "iron" }, floors: ["The tavern", "The rooms upstairs"],
hello: "🍹 <b>Inside a punch house.</b> Smoke, rum, a fiddle, dice and loud talk: here crews are signed on, plunder is sold and quarrels start. Look for the ✨ cards. The way out is the tavern door.",
down: [["pwtap", "The Taproom", ["wood", 0x5A3A22, 0xC8B898, "wood", 0x2A1E14], { far: ["esbar", "barrel", "cask"], sides: ["barrel", "longtable", "lantern", "barrel", "weaponrack"], mid: [["longtable", 0.5, 0]], rug: false, ceil: "ironchandelier" },
"The taproom", "A long room, low beams black with pipe smoke, sand on the floor to soak up what is spilled. Behind the counter the bowls for punch and the kegs of rum.", [["Order a rum punch", prwDrink], ["Listen to the talk", function () { evbSay("🗣️ 'Hornigold's been voted out, they say, for not taking an English ship.' 'There's silver on the Florida shore still, if you've a diver.' 'The new governor's coming with the King's pardon, and three men-of-war.'"); }]], "order"],
["pwdice", "The Dice Table", PW_W, { mid: [["escardtable", 0.5, 0]], sides: ["chair", "chair", "barrel", "chair"], rug: false }, "The dice table", "Hazard, and cards. Many a man has lost his share of a prize here before the ship was even careened.", [["Throw the dice", prwDice]], "play"],
["pwfiddle", "The Fiddler's Corner", PW_W, { sides: ["barrel", "chair", "barrel"], far: ["chair"], rug: false }, "The fiddler's corner", "A fiddler and a drum. The Articles of Bartholomew Roberts gave his musicians the Sabbath off, and work every other day 'only by favour'.", [["Ask for a tune", function () { evbTune([392, 440, 494, 523, 494, 440, 392, 330], 180, 0.4); evbSay("🎻 A jig, and then a hornpipe; somebody dances on the table."); }]], "listen"],
["pwback", "The Back Room", ["wood", 0x5A3A22, 0xC8B898, "wood", 0x2A1E14], { mid: [["longtable", 0.5, 0]], sides: ["chair", "chair", "chair", "mapchest", "chair"], far: ["maptable"], rug: false, ceil: "lantern" },
"The back room", "Where a captain who needs hands sits with his quartermaster and the ship's Articles, and men come in to sign or make their mark. Here too the plunder is sold to the merchants who sail in from the colonies.", [["Sign on, hire hands, sell plunder", function () { if (typeof prwBackRoom === "function")
prwBackRoom(); }], ["Read a ship's Articles", function () { if (typeof prwArticlesCard === "function")
prwArticlesCard(); }]], "read"],
["pwkitch", "The Kitchen", ["stone", 0x6A6458, 0xC8BCA8, "stone", 0x3A3A3A], { far: ["stove", "oven"], sides: ["butcherblock", "barrel", "shelfgoods", "trcopper"], rug: false }, "The kitchen", "Turtle stewed in its shell, salt pork, cassava bread, plantains, and salmagundi: a great dish of anything at hand, chopped and dressed with oil, vinegar, garlic and pepper. It was a pirate favourite.", "", "look"],
["pwcellar", "The Cellar", PW_D, { grid: ["cask", 2, 3], sides: ["barrel", "crates"], rug: false }, "The cellar", "Puncheons of Jamaica and Barbados rum, Madeira, brandy taken off a French ship. A puncheon held about 320 litres."],
["pwyard", "The Yard", ["stone", 0x8A8070, 0xD8CCB0, "stone", 0x4A3A2A], { sides: ["barrel", "crates", "barrel"], far: ["evb_rainbarrel"], rug: false, ceil: null }, "The yard", "Empty kegs, a rain barrel, and a man asleep in the shade who was paid off yesterday."],
["pwstore", "The Landlord's Store", PW_W, { grid: ["crates", 2, 2], sides: ["treasurechest", "barrel"], rug: false }, "The landlord's store", "Bolts of cloth, a crate of pistols, sugar and indigo: taken in payment of what crews ran up on credit."],
["pwsnug", "The Snug", PW_P, { sides: ["armchair", "chair"], far: ["fireplace"], mid: [["wd:kf_table", 0.5, 0]] }, "The snug", "A little room for the captains, where the quartermasters reckon the shares."],
["pwpipes", "The Pipe Rack", PW_W, { sides: ["shelfgoods", "chair"], far: ["shelfgoods"], rug: false }, "The pipe rack", "Long clay pipes, tobacco from Virginia and Cuba. A broken pipe stem was the cheapest thing in the house."],
["pwpost", "The Notice Post", PW_W, { sides: ["noticeboard", "barrel"], far: ["noticeboard"], rug: false }, "The notice post", "Notices nailed up: a sloop for sale, a reward for a runaway, and the Proclamation of 5 September 1717: the King's Pardon for any pirate who surrenders before 5 September 1718."],
["pwbarrels", "The Barrel Room", PW_D, { grid: ["barrel", 3, 2], rug: false }, "The barrel room", "Salt beef and pork, flour, peas and water for ships going out: a tavern was also a ship's grocer."],
["pwwash", "The Wash House", ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x3A3A3A], { sides: ["sink", "barrel"], far: ["evb_rainbarrel"], rug: false }, "The wash house", "A copper for boiling linen, and a rope line in the sun."],
["pwgoods", "The Plunder Room", PW_W, { grid: ["crates", 2, 2], sides: ["goldpile", "treasurechest"], rug: false }, "The plunder room", "What a crew could not sell at once: chests of Spanish cloth, a church's candlesticks, a crate of muskets. Here goods wait for a merchant."],
["pwlamp", "The Lamp Room", PW_W, { sides: ["shelfgoods", "lantern"], rug: false }, "The lamp room", "Whale oil and candles, and the slow-match that the gunners light."],
["pwsmoke", "The Smoke Room", PW_W, { sides: ["chair", "chair", "barrel"], rug: false }, "The smoke room", "A low room thick with tobacco smoke where old hands tell younger ones how it was in Morgan's day."]],
up: [["pwland", "The Landing", PW_P, { sides: ["chair", "lantern"] }, "The landing", "Narrow stairs and a rope for a handrail."],
["pwroom", "A Room to Let", PW_P, { far: ["bed"], sides: ["footchest", "chair"] }, "A room to let", "A bed with a straw mattress, a sea chest, a bowl and jug. Shared, as often as not."],
["pwgal", "The Gallery", PW_P, { sides: ["chair", "chair"], rug: false }, "The gallery", "A wooden gallery over the street, to sit out in the evening breeze."],
["pwkeep", "The Keeper's Room", PW_P, { far: ["bed", "wardrobe"], sides: ["desk", "chair"] }, "The keeper's room", "The landlady's ledger: who owes what, chalked against names and ships."],
["pwhammock", "The Hammock Loft", PW_W, { grid: ["evb_hammock", 2, 2] }, "The hammock loft", "For a sailor used to a hammock a bed is too still."],
["pwdorm", "The Long Room", PW_P, { grid: ["bed", 2, 3] }, "The long room", "Beds in rows for crews ashore."],
["pwhoard", "The Strongroom", PW_D, { sides: ["treasurechest", "goldpile", "treasurechest"], rug: false }, "The strongroom", "An iron-bound door and a chest of coin: pieces of eight, Spanish doubloons, Portuguese moidores. Pirates were paid in whatever was taken."],
["pwsick", "The Sick Room", PW_P, { far: ["bed"], sides: ["chair", "shelfgoods"] }, "The sick room", "Fever, the flux and the pox carried off more pirates than the gallows. The 'surgeon' might be a barber, a butcher or a ship's carpenter."]] });
prwInside("prbodega", { seed: 403, corner: "plant", wall: 0xF0E8D8, pal: { fab: "terracotta", fab2: "mustard", wood: "cherry", metal: "iron" }, floors: ["The bodega", "Upstairs"],
hello: "🍷 <b>Inside a bodega.</b> Wine from Spain, chocolate to drink, a guitar, and soldiers off duty. Look for the ✨ cards. The way out is the door.",
down: [["pwbod", "The Bodega", PW_T, { far: ["esbar", "cask", "cask"], sides: ["wd:kf_tableround", "chair", "evb_guitar", "chair"], mid: [["wd:kf_tableround", 0.5, 0]], rug: false }, "The bodega", "Wine from Spain and the Canaries in great jars, and chocolate: in Spanish America it was drunk hot, thick and sweet, spiced with cinnamon, at every hour.", [["Drink a cup of chocolate", function () { evbTune([523, 587], 200, 0.4); evbSay("☕ Thick, hot, spiced chocolate. The Spanish learned it from the Aztecs; by 1700 the whole Spanish empire drank it."); }]], "order"],
["pwbcards", "The Card Table", PW_T, { mid: [["escardtable", 0.5, 0]], sides: ["chair", "chair"], rug: false }, "The card table", "The Spanish deck: cups, coins, swords and clubs."],
["pwbsaint", "The Saint's Niche", PW_T, { far: ["candles", "altarinside"], sides: ["candles"], rug: false }, "The saint's niche", "A painted saint with candles. Sailors prayed to Our Lady of Carmen and San Telmo for a safe voyage."],
["pwbpatio", "The Patio", ["stone", 0xC8BCA8, 0xF0E8D8, "plaster", 0x5A3A1E], { sides: ["plant", "evb_well", "plant"], rug: false, ceil: null }, "The patio", "A courtyard open to the sky, with a well and a fig tree in the shade."],
["pwbkit", "The Kitchen", ["stone", 0x8A7A6A, 0xE8DCC8, "tile", 0x5A3A1E], { far: ["stove", "oven"], sides: ["evb_pots", "shelfgoods", "butcherblock"], rug: false }, "The kitchen", "Rice, beans, salt cod, oranges, sweet potatoes, peppers: the Caribbean and Spain in one pot."],
["pwbwine", "The Wine Store", PW_D, { grid: ["cask", 2, 3], rug: false }, "The wine store", "Wine from Spain was costly: every barrel came across the ocean in the fleet."],
["pwbyard", "The Back Door", PW_T, { sides: ["barrel", "crates"], rug: false }, "The back door", "A guarda costa sailor's pay is late again, and he is selling a pistol."],
["pwbroom", "The Owner's Room", PW_T, { far: ["bed"], sides: ["wardrobe", "chair"] }, "The owner's room", "A crucifix, a chest and a hammock."],
["pwbstore", "The Store", PW_W, { grid: ["crates", 2, 2], rug: false }, "The store", "Jars of olives and oil, a sack of cacao beans."],
["pwbguit", "The Musicians' Bench", PW_T, { sides: ["evb_guitar", "chair", "chair"], rug: false }, "The musicians' bench", "Guitars, a tambourine and a fandango.", [["Listen", function () { evbTune([330, 349, 392, 349, 330, 294, 330], 200, 0.4); evbSay("🎸 A fandango: the guitar, the clapping, and dancers with castanets."); }]], "listen"],
["pwbwater", "The Water Jars", PW_T, { sides: ["evb_amphora", "evb_amphora"], rug: false }, "The water jars", "Water from the aqueduct, kept cool in great clay jars."],
["pwbpray", "The Little Chapel", PW_T, { far: ["altarinside", "candles"], rug: false }, "The little chapel", "Every Spanish house had its holy pictures; many had a little chapel."],
["pwbhall", "The Passage", PW_T, { sides: ["plant"], rug: false }, "The passage", "Cool tiles, thick walls."],
["pwbsack", "The Sack Room", PW_W, { grid: ["trsacks", 2, 2], rug: false }, "The sack room", "Sugar and flour."],
["pwbpeek", "The Window Grille", PW_T, { sides: ["chair"], rug: false }, "The window grille", "Iron bars on every street window: against thieves, and English pirates."],
["pwbmule", "The Mule Yard", ["stone", 0x8A8070, 0xE8DCC8, "stone", 0x4A3A2A], { sides: ["trhay", "trtrough"], rug: false, ceil: null }, "The mule yard", "Mules carried everything overland in the Spanish empire, silver included."]] });
prwInside("prhouse", { seed: 405, corner: "plant", wall: 0xE8DCC0, pal: { fab: "navy", fab2: "crimson", wood: "mahogany", metal: "brass" }, floors: ["The house", "The bedchambers"],
hello: "🏠 <b>Inside a house of the colonies.</b> Mahogany from the islands, English chairs, shutters against the sun, and the kitchen out at the back. Look for the ✨ cards. The way out is the front door.",
down: [["pwhall", "The Hall", PW_P, { sides: ["chair", "clock", "chair"], far: ["painting"] }, "The hall", "Mahogany furniture made in Jamaica, an English clock, a portrait of somebody's father in a wig."],
["pwparl", "The Parlour", PW_P, { far: ["fireplace"], sides: ["armchair", "sofa", "painting", "armchair"], mid: [["wd:kf_table", 0.5, 0]] }, "The parlour", "Tea, a new and costly thing, and punch for the men. A merchant's family might keep enslaved servants; in Port Royal many did.", [["Take a dish of tea", function () { evbSay("🍵 Tea was drunk from a little bowl, a 'dish', with sugar from the islands. A pound of good tea cost more than a labourer earned in a week."); }]], "sit down"],
["pwdine", "The Dining Room", PW_P, { mid: [["longtable", 0.5, 0]], sides: ["chair", "chair", "chair", "chair"], far: ["evb_pewter"] }, "The dining room", "Pewter and some silver; Madeira wine; turtle soup, roasted pork, yams."],
["pwcount", "The Counting Room", PW_P, { far: ["desk", "bookshelf"], sides: ["filecabinet", "chair", "esglobe"], mid: [["desk", 0.5, 0]] }, "The counting room", "The merchant's ledgers. Many respectable merchants quietly bought pirate goods, and some sent ships out to trade with the pirates in Madagascar."],
["pwkitch2", "The Cookhouse", ["stone", 0x6A6458, 0xC8BCA8, "stone", 0x3A3A3A], { far: ["stove", "oven"], sides: ["butcherblock", "shelfgoods", "barrel"], rug: false }, "The cookhouse", "Kept apart from the house so its heat and its fires stay away from the timber."],
["pwpantry2", "The Pantry", PW_W, { sides: ["shelfgoods", "barrel", "shelfgoods"], rug: false }, "The pantry", "Salt pork from Ireland, flour from New York, sugar and molasses from the island."],
["pwwine", "The Wine Closet", PW_D, { sides: ["cask", "shelfgoods"], rug: false }, "The wine closet", "Madeira, which improves in the heat of the voyage."],
["pwyard2", "The Yard", ["stone", 0x8A8070, 0xD8CCB0, "stone", 0x4A3A2A], { sides: ["evb_rainbarrel", "plant"], rug: false, ceil: null }, "The yard", "A cistern for rainwater: on the islands, fresh water is precious."],
["pwwash2", "The Wash House", ["stone", 0x7A7468, 0xD8D0C0, "stone", 0x3A3A3A], { sides: ["sink", "esironing"], rug: false }, "The wash house", "Linen boiled in the copper, starched and ironed."],
["pwstudy", "The Study", PW_P, { far: ["bookshelf"], sides: ["desk", "maptable"], rug: false }, "The study", "Charts of the Caribbean and a copy of the London Gazette three months old."],
["pwnurse", "The Nursery", PW_P, { far: ["crib"], sides: ["toys", "evb_rocking"] }, "The nursery", "In the colonies' fevers, one child in three died before five."],
["pwstore2", "The Storeroom", PW_W, { grid: ["crates", 2, 2], rug: false }, "The storeroom", "Goods waiting for a ship."],
["pwporch", "The Veranda Door", PW_P, { sides: ["chair", "plant"], rug: false }, "The veranda door", "Doors on both sides of the house to let the breeze through."],
["pwlinen", "The Linen Press", PW_P, { sides: ["wardrobe"], rug: false }, "The linen press", "Linen from Ireland and Holland."],
["pwgun", "The Gun Cupboard", PW_W, { sides: ["weaponrack"], rug: false }, "The gun cupboard", "A fowling piece, a brace of pistols, and a sword: every man in the colonies was in the militia."],
["pwcellar2", "The Cellar", PW_D, { grid: ["barrel", 2, 2], rug: false }, "The cellar", "A cool place, if there is one."]],
up: [["pwland2", "The Landing", PW_P, { sides: ["chair", "painting"] }, "The landing", "A window with a view of the harbour, and the ships in it."],
["pwbed", "The Best Bedchamber", PW_P, { far: ["fourposter"], sides: ["wardrobe", "chair", "wallmirror"] }, "The best bedchamber", "A four-poster bed with mosquito curtains."],
["pwgal2", "The Gallery", PW_P, { sides: ["chair", "chair"], rug: false }, "The gallery", "Where the family sleeps on the hottest nights."],
["pwbed2", "The Second Chamber", PW_P, { far: ["bed"], sides: ["footchest", "chair"] }, "The second chamber", "For a guest, or a daughter."],
["pwdress", "The Dressing Room", PW_P, { far: ["wardrobe", "wallmirror"], sides: ["dressform"] }, "The dressing room", "English fashions, a year late, in linen and silk too hot for the island."],
["pwserv", "The Servants' Garret", PW_W, { grid: ["cot", 2, 2] }, "The servants' garret", "Hot under the roof. In a house of the islands, these were often enslaved Africans, owned, not paid."],
["pwchild", "The Children's Room", PW_P, { grid: ["bed", 2, 1], sides: ["toys"] }, "The children's room", "A hornbook and a slate."],
["pwlook", "The Lookout", PW_P, { sides: ["estelescope", "chair"], rug: false }, "The lookout", "A spyglass by the window to watch for the owner's ship coming in."]] });
prwInside("prspahouse", { seed: 407, corner: "plant", wall: 0xF4F0E8, pal: { fab: "terracotta", fab2: "emerald", wood: "cherry", metal: "iron", stone: "sand" }, floors: ["Round the patio", "The upper gallery"],
hello: "🏛️ <b>Inside a Spanish house.</b> Thick white walls, cool tiles, every room opening onto the patio, iron grilles at the windows. Look for the ✨ cards. The way out is the street door.",
down: [["pwszag", "The Zaguán", PW_T, { sides: ["plant", "benchin"], rug: false }, "The zaguán", "The cool entrance passage from the street to the patio, with a bench for callers."],
["pwspatio", "The Patio", ["stone", 0xC8BCA8, 0xF4F0E8, "plaster", 0x5A3A1E], { sides: ["plant", "evb_well", "plant", "plant"], rug: false, ceil: null }, "The patio", "The heart of the house: a well, orange trees, pots of basil, and arcades on every side."],
["pwssala", "The Sala", PW_T, { far: ["painting", "esbookcase"], sides: ["armchair", "chair", "painting", "chair"], mid: [["wd:kf_table", 0.5, 0]] }, "The sala", "Dark carved furniture, paintings of saints and of the King, a silver brazier for cold mornings."],
["pwsdine", "The Dining Room", PW_T, { mid: [["longtable", 0.5, 0]], sides: ["chair", "chair", "chair"], far: ["evb_pewter"] }, "The dining room", "Silver plate: in the Indies even modest families ate from silver."],
["pwskit", "The Kitchen", ["stone", 0x8A7A6A, 0xE8DCC8, "tile", 0x5A3A1E], { far: ["stove", "evb_horno"], sides: ["evb_pots", "butcherblock"], rug: false }, "The kitchen", "A charcoal stove and a clay oven."],
["pwsoratory", "The Oratory", PW_T, { far: ["altarinside", "candles"], sides: ["espew"], rug: false }, "The oratory", "The family's chapel."],
["pwsdesk", "The Office", PW_T, { far: ["desk", "bookshelf"], sides: ["filecabinet", "chair"] }, "The office", "Papers of the trade: a licence from the Casa de Contratación in Seville. Trading with foreigners was forbidden; everyone did it."],
["pwsstore", "The Store", PW_W, { grid: ["crates", 2, 2], rug: false }, "The store", "Hides, cacao, indigo."],
["pwsjars", "The Jar Room", PW_T, { grid: ["evb_amphora", 2, 2], rug: false }, "The jar room", "Olive oil, wine, vinegar, all from Spain."],
["pwsmule", "The Stable", ["stone", 0x8A8070, 0xE8DCC8, "stone", 0x4A3A2A], { sides: ["trhay", "trtrough"], rug: false }, "The stable", "A mule and a horse."],
["pwswash", "The Laundry", ["stone", 0x7A7468, 0xE0D8C8, "stone", 0x3A3A3A], { sides: ["sink", "evb_rainbarrel"], rug: false }, "The laundry", "Linen bleached in the sun on the roof."],
["pwsserv", "The Servants' Room", PW_W, { grid: ["cot", 2, 1] }, "The servants' room", "Servants, free and enslaved, sleep near the kitchen."],
["pwsguest", "The Guest Room", PW_T, { far: ["bed"], sides: ["chair"] }, "The guest room", "For a priest or a cousin from Spain."],
["pwsgrill", "The Street Window", PW_T, { sides: ["chair"], rug: false }, "The street window", "The reja: an iron grille where a young man may court a young woman, in the street, under her duenna's eye."],
["pwsroof", "The Stair to the Roof", PW_T, { sides: ["plant"], rug: false }, "The stair to the roof", "Flat roofs to catch the evening breeze, and see the sea."],
["pwssack", "The Sack Room", PW_W, { grid: ["trsacks", 2, 2], rug: false }, "The sack room", "Sugar and rice."]],
up: [["pwsgal", "The Upper Gallery", PW_T, { sides: ["plant", "chair"] }, "The upper gallery", "A wooden gallery round the patio."],
["pwsbed", "The Master's Chamber", PW_T, { far: ["fourposter"], sides: ["wardrobe", "chair"] }, "The master's chamber", "A bed with a canopy and a crucifix."],
["pwsbalc", "The Balcony", PW_T, { sides: ["chair", "plant"], rug: false }, "The balcony", "A carved wooden balcony over the street."],
["pwsbed2", "The Lady's Chamber", PW_T, { far: ["bed"], sides: ["wallmirror", "dressform"] }, "The lady's chamber", "A mantilla of black lace, a fan, a rosary."],
["pwsdress", "The Dressing Room", PW_T, { far: ["wardrobe"], sides: ["dressform"] }, "The dressing room", "Black silk: in the Spanish court, black was the colour of wealth."],
["pwschild", "The Children's Room", PW_T, { grid: ["bed", 2, 1] }, "The children's room", "A catechism and a top."],
["pwsstudy", "The Study", PW_T, { far: ["bookshelf"], sides: ["desk"] }, "The study", "Lives of the saints, and a book on navigation."],
["pwslinen", "The Linen Room", PW_T, { sides: ["wardrobe", "wardrobe"] }, "The linen room", "Linen from Holland, by way of Seville."]] });
prwInside("prgov", { seed: 409, corner: "plant", wall: 0xEDE6D6, grid: EVB_GRID.wide, pal: { fab: "crimson", fab2: "ivory", wood: "mahogany", metal: "gold", stone: "marble", art: 6, rug: 1 }, floors: ["The governor's house", "The private rooms"], h: 4.2,
hello: "🏛️ <b>Inside the governor's house.</b> The King's arms over the door, the council chamber, and the governor's commissions and proclamations. Look for the ✨ cards. The way out is the great door.",
down: [["pwghall", "The Great Hall", PW_P, { sides: ["painting", "chair", "hallbanner", "chair", "painting"], far: ["painting"], ceil: "chandelier" }, "The great hall", "The King's arms carved over the door, portraits of the King and Queen. Here the governor receives captains, merchants and, sometimes, surrendering pirates."],
["pwgcouncil", "The Council Chamber", PW_P, { mid: [["longtable", 0.5, 0]], sides: ["chair", "chair", "chair", "chair", "chair"], far: ["painting"], ceil: "chandelier" }, "The council chamber", "The governor and his council make the colony's laws here, and grant commissions to privateers.", [["Read the King's Pardon", function () { if (typeof prwPardonCard === "function")
prwPardonCard(); }]], "read"],
["pwgoffice", "The Governor's Office", PW_P, { far: ["desk", "bookshelf"], sides: ["esglobe", "maptable", "filecabinet"], mid: [["desk", 0.5, 0]] }, "The governor's office", "Letters from London, a year late and full of orders that cannot be carried out without ships, men and money."],
["pwgdine", "The State Dining Room", PW_P, { mid: [["feasttable", 0.5, 0]], sides: ["chair", "chair", "chair", "chair"], ceil: "chandelier" }, "The state dining room", "Silver plate and the King's health drunk in Madeira."],
["pwgsec", "The Secretary's Room", PW_P, { far: ["desk"], sides: ["filecabinet", "chair"] }, "The secretary's room", "Every commission and every pardon copied into a book."],
["pwgguard", "The Guard Room", PW_S, { sides: ["weaponrack", "benchin", "weaponrack"], rug: false }, "The guard room", "Redcoats of the independent companies, half of them sick with fever."],
["pwgkit", "The Kitchens", ["stone", 0x6A6458, 0xC8BCA8, "stone", 0x3A3A3A], { far: ["stove", "oven"], sides: ["butcherblock", "shelfgoods"], rug: false }, "The kitchens", "Turtle soup for the King's birthday dinner."],
["pwgwine", "The Wine Cellar", PW_D, { grid: ["cask", 2, 3], rug: false }, "The wine cellar", "The governor's Madeira and claret."],
["pwgarch", "The Archive", PW_P, { far: ["bookshelf", "bookshelf"], sides: ["filecabinet"], rug: false }, "The archive", "Depositions of captains robbed by pirates, each in their own words: what was taken, by whom, what their flag was."],
["pwgmap", "The Map Room", PW_P, { mid: [["maptable", 0.5, 0]], sides: ["mapchest", "esglobe"] }, "The map room", "Charts of the Bahamas' shoals, and where the pirates careen."],
["pwgchap", "The Chapel", PW_P, { far: ["altarinside"], sides: ["pew", "pew"], rug: false }, "The chapel", "Prayers for the King each Sunday."],
["pwgtreas", "The Treasury", PW_D, { sides: ["treasurechest", "goldpile"], rug: false }, "The treasury", "Customs money, never enough."],
["pwgstable", "The Stables", ["stone", 0x8A8070, 0xD8CCB0, "stone", 0x4A3A2A], { sides: ["trhay", "trsaddles"], rug: false }, "The stables", "The governor's carriage horses."],
["pwgwait", "The Waiting Room", PW_P, { sides: ["benchin", "benchin"], rug: false }, "The waiting room", "Merchants waiting with complaints."],
["pwgarms", "The Armoury", PW_S, { sides: ["weaponrack", "armourstand", "weaponrack"], rug: false }, "The armoury", "Muskets, cartridge boxes, and the colours of the garrison."],
["pwgflag", "The Flag Room", PW_P, { sides: ["hallbanner", "hallbanner"], rug: false }, "The flag room", "Flags taken from pirates, kept as trophies."]],
up: [["pwgland", "The Landing", PW_P, { sides: ["painting", "chair"] }, "The landing", "A wide stair of mahogany."],
["pwgbed", "The Governor's Bedchamber", PW_P, { far: ["fourposter"], sides: ["wardrobe", "chair", "wallmirror"] }, "The governor's bedchamber", "A four-poster bed and a pistol under the pillow."],
["pwggal", "The Gallery", PW_P, { sides: ["chair", "plant"], rug: false }, "The gallery", "The view over the harbour, and the fort."],
["pwgdress", "The Dressing Room", PW_P, { far: ["wardrobe", "wallmirror"], sides: ["dressform"] }, "The dressing room", "A full-bottomed wig on its stand, a dress sword."],
["pwglib", "The Library", PW_P, { far: ["bookshelf", "bookshelf"], sides: ["armchair", "bookshelf"] }, "The library", "Dampier's New Voyage Round the World (1697), and Exquemelin's Buccaneers of America."],
["pwgguest", "The Guest Chambers", PW_P, { grid: ["bed", 2, 1] }, "The guest chambers", "For naval captains in port."],
["pwgfam", "The Family Rooms", PW_P, { sides: ["sofa", "armchair", "toys"] }, "The family rooms", "If the governor brought his family; many did not."],
["pwgtel", "The Lookout", PW_P, { sides: ["estelescope", "chair"], rug: false }, "The lookout", "A glass trained on the harbour mouth."]] });
prwInside("prchurch", { seed: 411, corner: "plant", wall: 0xF0EAE0, grid: EVB_GRID.temple, pal: { fab: "crimson", fab2: "ivory", wood: "oak", metal: "brass", stone: "stone" }, floors: ["The church"], h: 6,
hello: "⛪ <b>Inside the church.</b> Box pews, the pulpit, the tablets of the Commandments, and the graves under the floor. Look for the ✨ cards. The way out is the west door.",
down: [["pwcporch", "The Porch", PW_S, { sides: ["benchin", "noticeboard"], rug: false }, "The porch", "Notices of the parish: banns of marriage, and a list of the dead of the last fever."],
["pwcnave", "The Nave", PW_S, { grid: ["pew", 2, 4], ceil: "chandelier" }, "The nave", "Box pews, rented by families; the poor stand at the back. Sailors came before a voyage, and widows after one.", [["Sit a while", function () { evbSay("🕯️ Quiet. Pirates' Articles sometimes forbade swearing, gambling and women aboard; some captains held prayers. Bartholomew Roberts' crew kept the Sabbath."); }]], "sit"],
["pwcaisle", "The Aisle", PW_S, { sides: ["candles", "pew", "candles"], rug: false }, "The aisle", "Stones in the floor with names cut in them: merchants, a sea captain, a child."],
["pwcchancel", "The Chancel", PW_S, { far: ["altarinside", "candles"], sides: ["candles", "esorgan"], rug: false }, "The chancel", "The altar and the Ten Commandments painted on boards."],
["pwcpulpit", "The Pulpit", PW_S, { far: ["pulpit"], sides: ["candles"], rug: false }, "The pulpit", "After a hanging the minister preached on the condemned man's sins; sometimes the condemned man's own last speech was printed and sold."],
["pwcvestry", "The Vestry", PW_W, { far: ["wardrobe"], sides: ["desk", "bookshelf"] }, "The vestry", "The parish registers: baptisms, marriages, burials. Mary Read's burial on 28 April 1721 is written in such a book in Jamaica."],
["pwcfont", "The Font", PW_S, { mid: [["evb_font", 0.5, 0]], sides: ["candles"], rug: false }, "The font", "Where children are christened."],
["pwcbell", "The Bell Tower", PW_S, { far: ["evb_bellrope"], sides: ["benchin"], rug: false }, "The bell tower", "The bell rings for service, for fire, for a sail sighted, and tolls for the dead.", [["Ring the bell", function () { evbTune([262, 262, 262], 900, 1.6); evbSay("🔔 The bell booms over the harbour."); }]], "ring"],
["pwcmem", "The Memorials", PW_S, { sides: ["esbust", "candles", "esbust"], rug: false }, "The memorials", "Marble tablets to the drowned, and to those taken by fever."],
["pwcorgan", "The Organ Loft", PW_W, { far: ["esorgan"], sides: ["chair"], rug: false }, "The organ loft", "A little organ shipped from London."],
["pwcalms", "The Poor Box", PW_S, { sides: ["footchest"], rug: false }, "The poor box", "For sailors' widows."],
["pwcside", "The Side Chapel", PW_S, { far: ["altarinside"], sides: ["pew"], rug: false }, "The side chapel", "Candles for those at sea."],
["pwcclerk", "The Clerk's Desk", PW_W, { far: ["lectern"], sides: ["chair"], rug: false }, "The clerk's desk", "The parish clerk leads the responses."],
["pwcvault", "The Vault Stair", PW_D, { sides: ["coffin", "candles"], rug: false }, "The vault stair", "Lead coffins of the rich below the floor."],
["pwcbook", "The Chained Bible", PW_S, { far: ["lectern"], rug: false }, "The chained Bible", "Chained so it cannot walk off."],
["pwcyard", "The Churchyard Door", PW_S, { sides: ["plant"], rug: false }, "The churchyard door", "Graves outside; most of them young."]] });
prwInside("prfort", { seed: 413, corner: "barrel", wall: 0xB8AC98, pal: { fab: "crimson", fab2: "navy", wood: "pine", metal: "iron", stone: "granite" }, floors: ["The barracks", "The gun platform stores"],
hello: "🏰 <b>Inside the fort.</b> The guardhouse, the barracks, the gunners' stores and the powder magazine, where no iron and no flame may go. Look for the ✨ cards. The way out is the door to the parade.",
down: [["pwfguard", "The Guardhouse", PW_S, { sides: ["weaponrack", "benchin", "weaponrack"], far: ["noticeboard"], rug: false }, "The guardhouse", "The guard of the day. A sentry asleep at his post could be shot."],
["pwfbarr", "The Barracks", PW_S, { grid: ["bunk", 2, 3], rug: false }, "The barracks", "Soldiers of the garrison, sleeping two to a bed. More died of fever than of any enemy."],
["pwfmess", "The Mess", PW_S, { mid: [["longtable", 0.5, 0]], sides: ["benchin", "barrel"], rug: false }, "The mess", "Salt beef, biscuit, and rum."],
["pwfmag", "The Powder Magazine", PW_D, { grid: ["barrel", 3, 2], rug: false, ceil: null }, "The powder magazine", "Barrels of gunpowder in a vault with thick walls and a light roof (so a blast goes up, not out). Men wear felt slippers here; no iron nails, no flame, ever."],
["pwfshot", "The Shot Store", PW_D, { grid: ["evb_pots", 2, 2], sides: ["crates"], rug: false }, "The shot store", "Round shot stacked in pyramids, chain shot (two balls joined by a chain, to cut rigging), grape and canister (bags or tins of small balls, against men)."],
["pwfgun", "The Gunners' Store", PW_S, { sides: ["weaponrack", "crates", "trtoolwall"], rug: false }, "The gunners' store", "Rammers, sponges, worms, handspikes, linstocks and slow-match: the tools of the great guns."],
["pwfarm", "The Armourer's Shop", PW_S, { far: ["anvil", "forge"], sides: ["trtoolwall", "weaponrack"], rug: false }, "The armourer's shop", "Mending muskets and making flints."],
["pwfcell", "The Black Hole", PW_D, { far: ["cellbars"], sides: ["benchin"], rug: false }, "The black hole", "A dark cell for soldiers who break the rules."],
["pwfoff", "The Officers' Room", PW_P, { far: ["desk"], sides: ["chair", "mapchest", "chair"] }, "The officers' room", "The commander's commission, and the Articles of War read to the garrison."],
["pwfcist", "The Cistern", PW_D, { mid: [["cavepool", 0.5, 0]], rug: false }, "The cistern", "A fort's water, caught from the roofs. A fort without water falls in days."],
["pwfstore", "The Provisions Store", PW_W, { grid: ["barrel", 2, 2], sides: ["trsacks"], rug: false }, "The provisions store", "Enough salt meat and biscuit for a siege, they hope."],
["pwfflag", "The Colours", PW_S, { sides: ["hallbanner", "hallbanner"], rug: false }, "The colours", "The flag that flies over the fort; to strike it is to surrender."],
["pwfsick", "The Sick Bay", PW_S, { grid: ["cot", 2, 2], rug: false }, "The sick bay", "Yellow fever, the 'black vomit'. Newcomers died of it in their first year in their hundreds."],
["pwfdrum", "The Drummers' Room", PW_S, { sides: ["drum", "drum"], rug: false }, "The drummers' room", "Drums beat the hours, the alarm, and the march to the gallows."],
["pwfcook", "The Cookhouse", ["stone", 0x6A6458, 0xC8BCA8, "stone", 0x3A3A3A], { far: ["stove"], sides: ["barrel"], rug: false }, "The cookhouse", "Pease pudding again."],
["pwfstair", "The Rampart Stair", PW_S, { sides: ["lantern"], rug: false }, "The rampart stair", "Up to the guns."]],
up: [["pwfland", "The Upper Store", PW_S, { grid: ["crates", 2, 2] }, "The upper store", "Spare gun carriages and wheels."],
["pwfsig", "The Signal Room", PW_S, { sides: ["hallbanner", "estelescope"] }, "The signal room", "Flags to signal a sail sighted, and its kind."],
["pwfwatch", "The Watch Room", PW_S, { sides: ["estelescope", "chair"] }, "The watch room", "Watching the sea for sails."],
["pwfcmd", "The Commander's Quarters", PW_P, { far: ["bed"], sides: ["desk", "chair"] }, "The commander's quarters", "A bed, a desk, a sword."],
["pwfnco", "The Sergeants' Room", PW_S, { grid: ["bunk", 2, 1] }, "The sergeants' room", "Sergeants keep order with a cane."],
["pwfkit", "The Kit Room", PW_S, { sides: ["wardrobe", "armourstand"] }, "The kit room", "Red coats faded pink in the sun."],
["pwfmatch", "The Match Room", PW_S, { sides: ["shelfgoods"] }, "The match room", "Slow-match: cord soaked in saltpetre that burns slowly, to fire the guns."],
["pwfbell", "The Alarm Bell", PW_S, { sides: ["evb_bigbell"] }, "The alarm bell", "Rung when pirates are sighted."]] });
prwInside("prchandler", { seed: 415, corner: "barrel", wall: 0xD8CCB0, pal: { fab: "navy", fab2: "mustard", wood: "pine", metal: "iron" }, floors: ["The shop", "The sail loft"],
hello: "⚓ <b>Inside a ship chandler's.</b> Rope, tar, sailcloth, compasses, lanterns, biscuit and everything a ship needs to go to sea. Look for the ✨ cards. The way out is the shop door.",
down: [["pwchshop", "The Shop", PW_W, { far: ["trcounter", "shelfgoods"], sides: ["shelfgoods", "barrel", "trnets", "shelfgoods"], rug: false, ceil: "lantern" }, "The shop", "Coils of hemp rope, blocks and tackle, pitch and tar, lanterns, compasses, half-hour glasses, log lines, hooks and nails. Pirates bought here as freely as honest men.", [["Ask the price of a compass", function () { evbSay("🧭 A good compass, brass in a wooden box, a few pounds; a quadrant for taking the sun's height at noon, more. With them, a log line and a half-hour glass, a ship found her way."); }]], "ask"],
["pwchrope", "The Rope Store", PW_W, { grid: ["evb_cane", 2, 2], sides: ["trnets"], rug: false }, "The rope store", "A big ship carried miles of rope."],
["pwchtar", "The Tar Shed", PW_D, { grid: ["barrel", 2, 2], rug: false }, "The tar shed", "Pitch and tar from the Carolinas' pine forests, for caulking seams and preserving rigging."],
["pwchnav", "The Navigator's Corner", PW_W, { far: ["maptable"], sides: ["esglobe", "mapchest"], mid: [["maptable", 0.5, 0]] }, "The navigator's corner", "Charts (often copied, often wrong), a backstaff, a quadrant, dividers. Longitude could only be guessed until the 1760s.", [["Learn to find latitude", function () { evbSay("☀️ At noon, measure the sun's height above the horizon with a backstaff, look up the sun's declination for the day in the tables, and you have your latitude, north or south. East and west was guesswork: 'dead reckoning' from speed, course and time."); }]], "learn"],
["pwchbisc", "The Biscuit Room", PW_W, { grid: ["trsacks", 2, 2], sides: ["barrel"], rug: false }, "The biscuit room", "Ship's biscuit, baked hard to last months; weevils came free."],
["pwchiron", "The Ironmongery", PW_W, { sides: ["trtoolwall", "anvil", "crates"], rug: false }, "The ironmongery", "Anchors, chain, nails, grapnels for boarding."],
["pwchlamp", "The Lantern Shelf", PW_W, { sides: ["shelfgoods", "lantern"], rug: false }, "The lantern shelf", "Horn lanterns: a naked flame aboard a wooden ship is how ships are lost."],
["pwchyard", "The Yard", ["stone", 0x8A8070, 0xD8CCB0, "stone", 0x4A3A2A], { sides: ["crates", "barrel"], rug: false, ceil: null }, "The yard", "Spars and masts seasoning."],
["pwchoff", "The Office", PW_W, { far: ["desk"], sides: ["filecabinet"] }, "The office", "The book of who owes."],
["pwchmed", "The Medicine Chest", PW_W, { sides: ["wgmedshelf", "shelfgoods"], rug: false }, "The medicine chest", "Mercury, laudanum, Peruvian bark (quinine) for fever. When Blackbeard blockaded Charles Town, a chest of medicines was all he asked for."],
["pwchcask", "The Water Casks", PW_W, { grid: ["cask", 2, 2], rug: false }, "The water casks", "Fresh water went bad in a few weeks; beer and rum lasted longer."],
["pwchcloth", "The Slop Chest", PW_W, { sides: ["wardrobe", "crates"], rug: false }, "The slop chest", "Ready-made sailors' clothes: checked shirts, canvas slops, Monmouth caps."],
["pwchguns", "The Gun Room", PW_W, { sides: ["weaponrack", "weaponrack"], rug: false }, "The gun room", "Muskets, pistols and cutlasses; a swivel gun."],
["pwchflags", "The Flag Locker", PW_W, { sides: ["hallbanner"], rug: false }, "The flag locker", "Flags of every nation: pirates carried several, to fool their prey until the last moment."],
["pwchscale", "The Scales", PW_W, { sides: ["weighscale"], rug: false }, "The scales", "Coin was weighed: clipped and worn pieces of eight were worth less."],
["pwchboat", "The Boat Store", PW_W, { sides: ["evb_canoe"], rug: false }, "The boat store", "Oars and a canoe."]],
up: [["pwchloft", "The Sail Loft", PW_W, { grid: ["evb_cloth", 2, 2] }, "The sail loft", "Sailmakers sit cross-legged sewing canvas with palm and needle."],
["pwchtwine", "The Twine Room", PW_W, { sides: ["shelfgoods"] }, "The twine room", "Twine and beeswax."],
["pwchrig", "The Rigging Loft", PW_W, { sides: ["trnets", "trnets"] }, "The rigging loft", "Shrouds and stays laid out to measure."],
["pwchbed", "The Chandler's Rooms", PW_P, { far: ["bed"], sides: ["chair"] }, "The chandler's rooms", "He lives over the shop."],
["pwchrolls", "The Canvas Store", PW_W, { grid: ["evb_cloth", 2, 1] }, "The canvas store", "Bolts of canvas from Holland."],
["pwchapp", "The Apprentice's Corner", PW_W, { sides: ["cot"] }, "The apprentice's corner", "A boy learns the trade."],
["pwchdry", "The Drying Loft", PW_W, { sides: ["trnets"] }, "The drying loft", "Wet sails dried before stowing."],
["pwchlook", "The Loft Door", PW_W, { sides: ["crates"] }, "The loft door", "A hoist to the street."]] });
prwInside("prstore", { seed: 417, corner: "crates", wall: 0xC8BCA8, pal: { fab: "terracotta", fab2: "navy", wood: "pine", metal: "iron" }, floors: ["The warehouse", "The upper floor"],
hello: "📦 <b>Inside a warehouse.</b> Sugar, rum, indigo, cotton, cacao and hides, and whatever has come in off the last ship, honestly or not. Look for the ✨ cards. The way out is the great door.",
down: [["pwwfloor", "The Warehouse Floor", PW_W, { grid: ["crates", 3, 3], sides: ["barrel", "trsacks", "barrel"], rug: false }, "The warehouse floor", "Hogsheads of sugar (about 700 kg each), puncheons of rum, bags of cotton and indigo. Sugar grown by the enslaved was the Caribbean's wealth, and the reason for its forts, its navies and its pirates."],
["pwwsugar", "The Sugar Store", PW_W, { grid: ["cask", 3, 2], rug: false }, "The sugar store", "Hogsheads of brown sugar."],
["pwwrum", "The Rum Store", PW_D, { grid: ["cask", 3, 2], rug: false }, "The rum store", "Kill-devil, they called the first rum."],
["pwwindigo", "The Indigo Room", PW_W, { grid: ["crates", 2, 2], rug: false }, "The indigo room", "Blue dye in cakes, worth more than sugar by weight."],
["pwwhide", "The Hide Store", PW_W, { grid: ["pelt", 2, 2], rug: false }, "The hide store", "Cattle hides from Hispaniola, for leather in Europe."],
["pwwcacao", "The Cacao Store", PW_W, { grid: ["trsacks", 2, 2], rug: false }, "The cacao store", "Cacao beans, bound for Spain or for the chocolate houses of London."],
["pwwlog", "The Logwood Store", PW_W, { sides: ["trlogs", "trlogs"], rug: false }, "The logwood store", "Logwood from the Bay of Campeche, cut by rough Englishmen for its red and black dye. Many logwood cutters became pirates when the trade failed."],
["pwwoff", "The Counting House", PW_W, { far: ["desk"], sides: ["filecabinet", "weighscale"] }, "The counting house", "Bills of lading, receipts, and a ledger with a page that does not say where the goods came from."],
["pwwdock", "The Loading Door", PW_W, { sides: ["crates", "barrel"], rug: false }, "The loading door", "Straight onto the wharf."],
["pwwtob", "The Tobacco Store", PW_W, { grid: ["cask", 2, 2], rug: false }, "The tobacco store", "Virginia leaf in hogsheads."],
["pwwcot", "The Cotton Store", PW_W, { grid: ["trsacks", 2, 2], rug: false }, "The cotton store", "Bales for the mills of England."],
["pwwsalt", "The Salt Store", PW_W, { grid: ["trsacks", 2, 1], rug: false }, "The salt store", "Salt from the Turks Islands, raked from salt pans."],
["pwwcloth", "The Cloth Store", PW_W, { grid: ["evb_cloth", 2, 2], rug: false }, "The cloth store", "Calico from India, linen from Ireland."],
["pwwsilver", "The Strongroom", PW_D, { sides: ["treasurechest", "goldpile"], rug: false }, "The strongroom", "Spanish silver, quietly traded."],
["pwwguard", "The Watchman's Box", PW_W, { sides: ["chair", "lantern"], rug: false }, "The watchman's box", "A watchman and a dog."],
["pwwrats", "The Rat Corner", PW_W, { sides: ["barrel"], rug: false }, "The rat corner", "The rats eat better than the watchman."]],
up: [["pwwup", "The Upper Floor", PW_W, { grid: ["crates", 3, 2] }, "The upper floor", "Lighter goods."],
["pwwhoist", "The Hoist", PW_W, { sides: ["trnets"] }, "The hoist", "A wheel and rope to lift goods."],
["pwwspice", "The Spice Room", PW_W, { grid: ["evb_jars", 2, 1] }, "The spice room", "Pimento (allspice), ginger, nutmeg."],
["pwwclerk", "The Clerks' Room", PW_W, { grid: ["desk", 2, 1] }, "The clerks' room", "Copying bills."],
["pwwdry", "The Drying Room", PW_W, { sides: ["trnets"] }, "The drying room", "Wet goods off a leaky ship."],
["pwwsail", "The Sail Store", PW_W, { grid: ["evb_cloth", 2, 1] }, "The sail store", "Old sails for sale."],
["pwwmasts", "The Spar Store", PW_W, { sides: ["trlogs"] }, "The spar store", "Spars and oars."],
["pwwlook", "The Lookout Window", PW_W, { sides: ["estelescope"] }, "The lookout window", "The merchant watches for his ships."]] });
prwInside("prcourt", { seed: 419, corner: "plant", wall: 0xE8E0D0, grid: EVB_GRID.wide, pal: { fab: "crimson", fab2: "navy", wood: "mahogany", metal: "brass", art: 4 }, floors: ["The court", "The judges' rooms"], h: 4.4,
hello: "⚖️ <b>Inside the Vice-Admiralty court.</b> No jury: seven commissioners, the King's advocate, the accused in irons and the witnesses. Here pirates are tried. Look for the ✨ cards. The way out is the court door.",
down: [["pwct", "The Courtroom", PW_P, { far: ["throneseat", "hallbanner"], sides: ["pew", "pew", "pew", "pew"], mid: [["longtable", 0.5, 0]], ceil: "chandelier" }, "The courtroom", "Under the Act for the more effectual Suppression of Piracy (1700), pirates in the colonies were tried not by a jury but by a court of at least seven commissioners: the governor, members of council, naval captains. Witnesses swore to what was taken. The accused could speak for themselves; few had lawyers.", [["Read how a trial went", function () { if (typeof prwTrialCard === "function")
prwTrialCard(); }]], "read"],
["pwctdock", "The Dock", PW_P, { far: ["cellbars"], sides: ["benchin"], rug: false }, "The dock", "Where the accused stand in irons. Anne Bonny and Mary Read stood here (at Spanish Town) on 28 November 1720 and heard the sentence: 'to be hanged by the neck till you are severally dead'."],
["pwctwit", "The Witness Box", PW_P, { far: ["lectern"], sides: ["chair"], rug: false }, "The witness box", "At Bonny and Read's trial a woman named Dorothy Thomas swore they wore men's jackets and long trousers, had handkerchiefs tied round their heads, each carried a machete and pistol, and swore at the men to murder her so she could not bear witness."],
["pwctclerk", "The Clerk's Table", PW_P, { far: ["desk"], sides: ["filecabinet", "chair"] }, "The clerk's table", "The clerk writes down every word: the printed record of a trial was sold in London and the colonies."],
["pwctjury", "The Commissioners' Bench", PW_P, { sides: ["chair", "chair", "chair", "chair"], rug: false }, "The commissioners' bench", "Seven men, mostly with ships and goods of their own to protect."],
["pwctgal", "The Public Gallery", PW_P, { grid: ["pew", 2, 2], rug: false }, "The public gallery", "The town comes to watch."],
["pwctrob", "The Robing Room", PW_P, { far: ["wardrobe"], sides: ["wallmirror"] }, "The robing room", "Wigs and gowns."],
["pwctlib", "The Law Library", PW_P, { far: ["bookshelf", "bookshelf"], sides: ["lectern"] }, "The law library", "The statutes of piracy: pirates were enemies of all mankind, hostis humani generis, and any nation could hang them."],
["pwcthold", "The Holding Cell", PW_D, { far: ["cellbars"], sides: ["benchin"], rug: false }, "The holding cell", "The prisoners wait here, chained."],
["pwctev", "The Evidence Room", PW_P, { sides: ["treasurechest", "weaponrack", "hallbanner"], rug: false }, "The evidence room", "A pirate flag, a captured ship's papers, a sack of coins."],
["pwctadv", "The King's Advocate's Room", PW_P, { far: ["desk"], sides: ["bookshelf"] }, "The King's advocate's room", "He prosecutes for the Crown."],
["pwcthall", "The Hall", PW_P, { sides: ["benchin", "painting"], rug: false }, "The hall", "Waiting witnesses."],
["pwctseal", "The Seal Room", PW_P, { far: ["desk"], rug: false }, "The seal room", "The court's seal, pressed in wax on each sentence."],
["pwctmar", "The Marshal's Room", PW_P, { sides: ["keyrack", "weaponrack"], rug: false }, "The marshal's room", "The marshal keeps the prisoners, and carries out the sentence."],
["pwctprst", "The Chaplain's Room", PW_P, { sides: ["lectern", "chair"], rug: false }, "The chaplain's room", "He visits the condemned and writes their last confessions."],
["pwctdoor", "The Back Door", PW_P, { sides: ["lantern"], rug: false }, "The back door", "To the gaol, and from the gaol to the cart."]],
up: [["pwctup", "The Judges' Landing", PW_P, { sides: ["painting"] }, "The judges' landing", "Portraits of governors."],
["pwctjud", "The Judges' Chamber", PW_P, { mid: [["longtable", 0.5, 0]], sides: ["chair", "chair"] }, "The judges' chamber", "Where the commissioners decide."],
["pwctrec", "The Records", PW_P, { far: ["bookshelf", "bookshelf"] }, "The records", "The trials, bound."],
["pwctdine", "The Dining Room", PW_P, { mid: [["longtable", 0.5, 0]] }, "The dining room", "Dinner after the sentence."],
["pwctgov", "The Governor's Room", PW_P, { far: ["desk"] }, "The governor's room", "The governor alone can grant a reprieve."],
["pwctsec", "The Secretary's Room", PW_P, { far: ["desk"] }, "The secretary's room", "Letters to London about the hangings."],
["pwctstore", "The Store", PW_W, { grid: ["crates", 2, 1] }, "The store", "Old papers."],
["pwctwin", "The Window", PW_P, { sides: ["chair"] }, "The window", "Overlooking the gallows."]] });
prwInside("prgaol", { seed: 421, corner: "barrel", wall: 0x9A9080, pal: { fab: "charcoal", fab2: "terracotta", wood: "pine", metal: "iron", stone: "granite", art: 0 }, floors: ["The gaol", "The debtors' side"],
hello: "⛓️ <b>Inside the gaol.</b> Damp stone, irons, straw and the smell. Debtors, thieves, runaways and pirates waiting for the court, or for the gallows. Look for the ✨ cards. The way out is the gaol door.",
down: [["pwgjk", "The Gaoler's Lodge", PW_S, { far: ["desk"], sides: ["keyrack", "chair", "weaponrack"], rug: false }, "The gaoler's lodge", "The gaoler was not paid by the Crown: prisoners paid him for food, a bed, lighter irons, a candle. Those with no money starved."],
["pwgcells", "The Condemned Hold", PW_D, { far: ["cellbars"], sides: ["cellbars", "benchin", "cellbars"], rug: false, ceil: null }, "The condemned hold", "Men waiting to hang, chained to a ring in the wall. A minister visits to pray with them and to get a confession.", [["Look through the bars", function () { evbSay("⛓️ A man sits in the straw with his head in his hands. Another is singing a hymn. A third laughs, and asks if you've brought him rum."); }]], "look"],
["pwgirons", "The Irons", PW_D, { sides: ["evb_chains", "evb_chains"], far: ["anvil"], rug: false }, "The irons", "Leg irons, handcuffs, a heavy collar. A blacksmith riveted them on."],
["pwgcommon", "The Common Ward", PW_D, { grid: ["evb_blanket", 2, 3], rug: false }, "The common ward", "Thieves, drunkards and runaways together on the straw."],
["pwgwomen", "The Women's Ward", PW_D, { grid: ["evb_blanket", 2, 2], rug: false }, "The women's ward", "Mary Read died of fever in such a place, before her child was born, in April 1721."],
["pwgyard", "The Yard", PW_S, { sides: ["evb_well", "benchin"], rug: false, ceil: null }, "The yard", "Half an hour of air."],
["pwghole", "The Dungeon", PW_D, { sides: ["evb_chains"], rug: false }, "The dungeon", "No light at all."],
["pwgtap", "The Tap", PW_S, { far: ["esbar"], sides: ["barrel", "chair"], rug: false }, "The tap", "The gaoler sells drink to prisoners who can pay."],
["pwgkit", "The Kitchen", ["stone", 0x6A6458, 0xC8BCA8, "stone", 0x3A3A3A], { far: ["stove"], sides: ["barrel"], rug: false }, "The kitchen", "Thin gruel."],
["pwgchap", "The Chapel", PW_S, { far: ["lectern"], sides: ["pew"], rug: false }, "The chapel", "The condemned sermon is preached the Sunday before a hanging, with the condemned sitting by an open coffin."],
["pwgvisit", "The Visiting Grate", PW_S, { far: ["cellbars"], rug: false }, "The visiting grate", "Wives and friends pass food through the bars."],
["pwgsick", "The Sick Ward", PW_D, { grid: ["cot", 2, 2], rug: false }, "The sick ward", "Gaol fever (typhus) killed more prisoners than the hangman."],
["pwgstore", "The Store", PW_S, { grid: ["barrel", 2, 1], rug: false }, "The store", "Straw and candles."],
["pwgwash", "The Wash", PW_S, { sides: ["sink"], rug: false }, "The wash", "A bucket."],
["pwgkeys", "The Key Room", PW_S, { sides: ["keyrack"], rug: false }, "The key room", "Every key on a ring."],
["pwgcorr", "The Passage", PW_D, { sides: ["lantern"], rug: false }, "The passage", "Dark and narrow."]],
up: [["pwgdebt", "The Debtors' Side", PW_S, { grid: ["cot", 2, 2] }, "The debtors' side", "Debtors stayed until their debts were paid, and could not earn while inside. Woodes Rogers himself was in a debtors' prison in London after the Bahamas."],
["pwgdbtap", "The Debtors' Room", PW_S, { sides: ["chair", "esbar"] }, "The debtors' room", "Better rooms for those who can pay rent."],
["pwgfam", "The Families' Room", PW_S, { grid: ["cot", 2, 1] }, "The families' room", "Whole families lived in with a debtor."],
["pwgg2", "The Gaoler's House", PW_P, { far: ["bed"], sides: ["desk"] }, "The gaoler's house", "He does well out of his prisoners."],
["pwgreg", "The Register", PW_S, { far: ["desk"] }, "The register", "Names, crimes and dates."],
["pwgwork", "The Work Room", PW_S, { sides: ["loom", "workbench"] }, "The work room", "Picking oakum: unpicking old rope for caulking."],
["pwgwin", "The Barred Window", PW_S, { sides: ["chair"] }, "The barred window", "A view of the gallows being built."],
["pwgloft", "The Loft", PW_W, { grid: ["trsacks", 2, 1] }, "The loft", "Straw."]] });
var PRW_FOLK = {
camp: [["crew", 8], ["deckhand", 6], ["buccaneer", 2], ["woman", 2, "f"], ["worker", 2], ["merchant", 1]],
eng: [["sailor", 6], ["crew", 3], ["merchant", 3], ["man", 4], ["lady", 2, "f"], ["woman", 4, "f"], ["worker", 3], ["marine", 2], ["priest", 1]],
fr: [["buccaneer", 5], ["crew", 4], ["deckhand", 3], ["man", 2], ["woman", 3, "f"], ["worker", 2], ["merchant", 1], ["priest", 1]],
spa: [["spanish", 4], ["dons", 3], ["doña", 2, "f"], ["woman", 4, "f"], ["sailor", 3], ["worker", 4], ["man", 2], ["priest", 2]]
};
function prwFolkPersona(p, role, f) { return __ZC(462, 48, this, arguments, new.target); }
function prwPeople(p, B, R) { return __ZC(462, 49, this, arguments, new.target); }
function prwFolkName(role, f, R) { return __ZC(462, 50, this, arguments, new.target); }
function prwFolkGreet(role, p) { return __ZC(462, 51, this, arguments, new.target); }
function prwMeet(q) { return __ZC(462, 52, this, arguments, new.target); }
function prwFamousGreet(q) { return __ZC(462, 53, this, arguments, new.target); }
function prwPunished(p, B, kind, r, adult) { return __ZC(462, 54, this, arguments, new.target); }
function prwLawCard(kind, p, name) { return __ZC(462, 55, this, arguments, new.target); }
function prwArticlesCard() { return __ZC(462, 56, this, arguments, new.target); }
function prwPardonCard() { return __ZC(462, 57, this, arguments, new.target); }
function prwTrialCard() { return __ZC(462, 58, this, arguments, new.target); }
function prwShoreTick(dt) { var t = PRW.t; Object.keys(PRW.built).forEach(function (k) { var B = PRW.built[k]; if (B && B.tick)
B.tick.forEach(function (f) { try {
f(t);
}
catch (e) { } }); }); }
var PRW_SAILS = [
{ k: "teach", ship: "Queen Anne's Revenge", kind: "ship", flag: "teach", route: ["nassau", "charlestown", "ocracoke", "nassau", "tortuga"], spd: 9, side: "pirate", guns: 40, sails: 0xD8D0B8, hull: 0x2A1E14 },
{ k: "hornigold", ship: "Ranger", kind: "sloop", flag: "black", route: ["nassau", "wreck1715", "havana", "nassau"], spd: 11, side: "pirate", guns: 10 },
{ k: "vane", ship: "Ranger", kind: "brig", flag: "red", route: ["nassau", "charlestown", "tortuga", "portroyal"], spd: 10, side: "pirate", guns: 12 },
{ k: "rackham", ship: "William", kind: "sloop", flag: "rackham", route: ["nassau", "tortuga", "portroyal", "nassau"], spd: 11, side: "pirate", guns: 6 },
{ k: "bellamy", ship: "Whydah Gally", kind: "ship", flag: "black", route: ["nassau", "capecod", "gardiners", "charlestown"], spd: 10, side: "pirate", guns: 28 },
{ k: "roberts", ship: "Royal Fortune", kind: "ship", flag: "roberts", route: ["tortuga", "cartagena", "portobelo", "portroyal", "tortuga"], spd: 10, side: "pirate", guns: 42, sails: 0xE8E0C8, hull: 0x1E1A16 },
{ k: "bonnet", ship: "Revenge", kind: "sloop", flag: "black", route: ["charlestown", "ocracoke", "nassau"], spd: 9, side: "pirate", guns: 10 },
{ k: "jennings", ship: "Barsheba", kind: "sloop", flag: "eng", route: ["portroyal", "wreck1715", "nassau"], spd: 10, side: "pirate", guns: 10 },
{ k: "low", ship: "Fancy", kind: "brig", flag: "red", route: ["portroyal", "maracaibo", "cartagena", "tortuga"], spd: 10, side: "pirate", guns: 14 },
{ k: "morgan", ship: "Satisfaction", kind: "ship", flag: "eng", route: ["portroyal", "portobelo", "maracaibo", "portroyal"], spd: 9, side: "pirate", guns: 22 },
{ k: "olonnais", ship: "La Vengeance", kind: "ship", flag: "fr", route: ["tortuga", "maracaibo", "tortuga"], spd: 9, side: "pirate", guns: 16 },
{ k: "maynard", ship: "Jane", kind: "sloop", flag: "eng", route: ["ocracoke", "charlestown", "ocracoke"], spd: 10, side: "navy", guns: 0 },
{ k: "rogers", ship: "HMS Delicia", kind: "ship", flag: "eng", route: ["nassau", "portroyal", "nassau"], spd: 8, side: "navy", guns: 32, hull: 0x2A2A3A, band: 0xC8A040 },
{ k: "barnet", ship: "Barnet's sloop", kind: "sloop", flag: "eng", route: ["portroyal", "tortuga", "portroyal"], spd: 11, side: "navy", guns: 8 },
{ k: "_pearl", name: "HMS Pearl", ship: "HMS Pearl", kind: "ship", flag: "eng", route: ["charlestown", "nassau", "havana", "portroyal"], spd: 9, side: "navy", guns: 40, hull: 0x2A2A3A, band: 0xC8A040 },
{ k: "_guarda", name: "A guarda costa", ship: "Nuestra Señora del Carmen", kind: "brig", flag: "spa", route: ["havana", "cartagena", "maracaibo", "portobelo", "havana"], spd: 10, side: "spain", guns: 14 },
{ k: "_flota", name: "The treasure fleet", ship: "Capitana of the flota", kind: "galleon", flag: "spa", route: ["portobelo", "cartagena", "havana", "wreck1715", "havana", "portobelo"], spd: 7, side: "fleet", guns: 50, convoy: 3 },
{ k: "_merch1", name: "A merchantman from Bristol", ship: "Prosperous", kind: "ship", flag: "eng", route: ["charlestown", "portroyal", "gardiners"], spd: 8, side: "merchant", guns: 8 },
{ k: "_merch2", name: "A Boston sloop", ship: "Good Intent", kind: "sloop", flag: "eng", route: ["capecod", "nassau", "portroyal"], spd: 9, side: "merchant", guns: 2 },
{ k: "_merch3", name: "A French trader", ship: "Sainte-Anne", kind: "brig", flag: "fr", route: ["tortuga", "havana", "barataria"], spd: 9, side: "merchant", guns: 6 }
];
var PRW_SAIL = { ships: [], near: null, t0: Date.UTC(2026, 0, 1) };
function prwSailPath(S) { return __ZC(462, 59, this, arguments, new.target); }
function prwSailAt(S, now) { return __ZC(462, 60, this, arguments, new.target); }
function prwOffLand(o) { for (var k = 0; k < 6 && seaHeight(o.x, o.z) > -3; k++) {
o.x += Math.cos(o.h) * 30;
o.z -= Math.sin(o.h) * 30;
} return o; }
function prwSailName(S) { var q = PRW_PBY[S.k]; return q ? q.name : S.name; }
function prwSailBuild(S) { return __ZC(462, 61, this, arguments, new.target); }
function prwSailDrop(S) { if (S.g) {
prwLetGo(S.g);
S.g = null;
} }
PRW.tickers.push(function (dt) {
if (!PRW.ports.length || !WORLDS.sea.g)
return;
var now = Date.now(), px = SEA.aboard ? SEA.sx : worldLocal().x, pz = SEA.aboard ? SEA.sz : worldLocal().z, near = PRW.lite ? 1400 : 2600, best = null, bd = 1e9;
if (!prwInBox(px, pz) && Math.hypot(px - PRW_O.x, pz - PRW_O.z) > 20000) {
PRW_SAIL.ships.forEach(prwSailDrop);
return;
}
if (!PRW_SAIL.ships.length)
PRW_SAIL.ships = PRW_SAILS.map(function (S, i) { return Object.assign({}, S, { off: i * 977 }); });
PRW_SAIL.ships.forEach(function (S) {
var o = prwSailAt(S, now);
if (!o)
return;
prwOffLand(o);
S.at = o;
var d = Math.hypot(o.x - px, o.z - pz);
if (d < near && !S.g)
prwSailBuild(S);
else if (d > near + 600 && S.g)
prwSailDrop(S);
if (S.g) {
S.g.position.set(o.x, Math.sin(PRW.t * 0.6 + (S.off || 0)) * 0.2, o.z);
S.g.rotation.y = o.h;
S.g.rotation.z = Math.sin(PRW.t * 0.7 + (S.off || 0)) * 0.03;
}
if (d < bd) {
bd = d;
best = S;
}
});
PRW_SAIL.near = bd < 220 ? best : null;
PRW.banner = best && bd < 2500 ? " · <span style='color:#FFD8A0'>" + (best.side === "pirate" ? "🏴‍☠️ " : best.side === "navy" ? "⚓ " : best.side === "fleet" ? "💰 " : "⛵ ") + prwEsc(best.ship) + "</span>, " + (bd > 1000 ? (bd / 1000).toFixed(1) + " km" : Math.round(bd) + " m") : "";
if (SEA.aboard)
PRW_SAIL.ships.forEach(function (S) { if (!S.g || !S.at)
return; var dx = SEA.sx - S.at.x, dz = SEA.sz - S.at.z, d = Math.hypot(dx, dz); if (d < 34) {
SEA.sx = S.at.x + dx / d * 34;
SEA.sz = S.at.z + dz / d * 34;
SEA.v = Math.min(SEA.v, 2);
} });
});
(function () {
if (typeof seaPromptTick !== "function")
return;
var pt = seaPromptTick;
seaPromptTick = function (L) {
if (SEA.aboard && PRW_SAIL.near && !SEA.auto) {
var S = PRW_SAIL.near;
return worldPrompt("<b>" + prwEsc(S.ship) + "</b> (" + prwEsc(prwSailName(S)) + ") · <b>press E</b> to hail her", function () { prwHail(S); });
}
return pt.apply(this, arguments);
};
})();
function prwHail(S) { return __ZC(462, 62, this, arguments, new.target); }
function prwS() { return __ZC(462, 63, this, arguments, new.target); }
function prwSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function prwLog(t) { var S = prwS(); S.log.unshift({ t: Date.now(), s: t }); if (S.log.length > 40)
S.log.length = 40; }
function prwRankName() { var S = prwS(); return S.own ? "Captain of the " + S.own.name : PRW_RANKS[S.rank].n + (S.under ? " under " + prwSailNameK(S.under) : ""); }
function prwSailNameK(k) { var q = PRW_PBY[k]; return q ? q.name.replace(/,.*$/, "") : k; }
function prwKeep(id, name, icon) { var S = prwS(); if (S.keeps.some(function (k) { return k[0] === id; }))
return false; S.keeps.push([id, name, icon, Date.now()]); prwSave(); setStatus("🎁 <b>Kept:</b> " + icon + " " + prwEsc(name) + " (in your sea chest; Menu › 🏴‍☠️ The Sweet Trade)."); return true; }
var PRW_NEED = [
{ rank: 1, need: { swab: 2, haul: 2 }, say: "You have swabbed and hauled with the best of them. The gunner wants you as his powder monkey." },
{ rank: 2, need: { powder: 2, knots: 1 }, say: "Quick feet and steady hands with the powder. The boatswain rates you able seaman." },
{ rank: 3, need: { aloft: 2, steer: 2, lead: 1 }, say: "You can hand, reef and steer. The gunner takes you on as his mate." },
{ rank: 4, need: { gun: 3, fight: 1 }, say: "You have served a gun in a fight. The crew make you boatswain." },
{ rank: 5, need: { aloft: 4, storm: 1, repair: 1 }, say: "You brought her through a blow. The crew vote you quartermaster: their own officer." },
{ rank: 6, need: { share: 2, fight: 3, noon: 1 }, say: "The crew trust you to lead them. When the next vote comes, they may make you captain." }
];
function prwNextNeed() { var S = prwS(); return PRW_NEED.filter(function (n) { return n.rank === S.rank + 1; })[0] || null; }
function prwDid(k, n) { var S = prwS(); S.duties[k] = (S.duties[k] || 0) + (n || 1); S.xp += (n || 1) * 5; S.rep += 1; prwSave(); prwRankCheck(); }
function prwRankCheck() { return __ZC(462, 64, this, arguments, new.target); }
function prwNeedLine() { return __ZC(462, 65, this, arguments, new.target); }
function prwCrossBtns(q) { return __ZC(462, 66, this, arguments, new.target); }
function prwCrossFns(q) { return __ZC(462, 67, this, arguments, new.target); }
function prwInPort() { return PRW.ports.some(function (p) { return Math.hypot(SEA.sx - p.dock.x, SEA.sz - p.dock.z) < 400; }); }
var PRW_UPG = {
guns: { n: "More great guns", s: "Four more 6-pounders and their ports, on each side.", cost: 400, need: "brig" },
heavy: { n: "Heavy guns", s: "12-pounders in place of the 6s: the black iron of a man-of-war.", cost: 900, need: "ship" },
swivel: { n: "Swivel guns on the rails", s: "Little guns on pivots, loaded with musket balls, for sweeping a deck.", cost: 150 },
copper: { n: "A sheathed bottom", s: "Her bottom sheathed against worm and weed: faster, and she need not careen so often. (Copper sheathing came in the 1760s; in 1718 a ship was sheathed with an extra skin of planks over tar and hair.)", cost: 500 },
sails: { n: "A new suit of sails", s: "Fresh canvas, cut full: a knot faster.", cost: 300 },
black: { n: "Black sails", s: "Dyed black, for night work. (A thing of story more than history: most pirates wanted to look like an honest merchant until the last moment.)", cost: 250 },
stern: { n: "A carved and gilded stern", s: "The carvers' and gilders' work, and lanterns.", cost: 350 },
figure: { n: "A figurehead", s: "A lion, a mermaid, a warrior: carved and painted at her bow.", cost: 250 },
cabin: { n: "A great cabin with stern windows", s: "The captain's cabin, with a row of glazed windows across her stern.", cost: 300 },
longboat: { n: "A longboat", s: "For landing, watering, and boarding by night.", cost: 120 },
paint: { n: "New paint", s: "Her sides in your colours.", cost: 80 },
hold: { n: "A bigger hold", s: "Room for more plunder, and more water: longer voyages.", cost: 220 },
surgeon: { n: "A surgeon's chest", s: "Saws, probes, mercury, laudanum, bandages.", cost: 200 }
};
var PRW_HULLS = { sloop: { n: "A Bermuda sloop", s: "Cedar-built, one mast, fast and handy: the pirates' favourite. 8 to 12 guns, 70 to 100 men.", cost: 1500, guns: 10 },
brig: { n: "A brigantine", s: "Two masts, square-rigged forward: room for 14 guns and a big crew.", cost: 3500, guns: 14 },
ship: { n: "A full-rigged ship", s: "Three masts: a captured merchantman or slaver, cut down and armed with 26 guns. Blackbeard's Queen Anne's Revenge was one.", cost: 8000, guns: 26 },
frigate: { n: "A frigate", s: "Built for war: 36 guns, fast and strong. Only the greatest pirates ever had one.", cost: 20000, guns: 36 } };
function prwDressWayfarer() { return __ZC(462, 68, this, arguments, new.target); }
function prwDuties() { return __ZC(462, 69, this, arguments, new.target); }
function prwDuty(k) { var f = PRW_DUTY[k]; if (f)
f(); }
function prwQuiz(title, intro, qs, done) { return __ZC(462, 70, this, arguments, new.target); }
function prwBeat(title, say, n, speed, done) { return __ZC(462, 71, this, arguments, new.target); }
var PRW_DUTY = {
swab: function () { return __ZC(462, 72, this, arguments, new.target); },
haul: function () { return __ZC(462, 73, this, arguments, new.target); },
knots: function () { return __ZC(462, 74, this, arguments, new.target); },
powder: function () { return __ZC(462, 75, this, arguments, new.target); },
aloft: function () { return __ZC(462, 76, this, arguments, new.target); },
steer: function () { return __ZC(462, 77, this, arguments, new.target); },
lead: function () { return __ZC(462, 78, this, arguments, new.target); },
gun: function () { return __ZC(462, 79, this, arguments, new.target); },
repair: function () { return __ZC(462, 80, this, arguments, new.target); },
noon: function () { return __ZC(462, 81, this, arguments, new.target); },
share: function () { return __ZC(462, 82, this, arguments, new.target); }
};
PRW.tickers.push(function (dt) {
var S = store.prw;
if (!S || !S.steerT || !SEA.aboard)
return;
var T = S.steerT;
var hdg = (Math.atan2(Math.sin(SEA.h), -Math.cos(SEA.h)) * 180 / Math.PI + 360) % 360, off = Math.abs(((hdg - T.want) + 540) % 360 - 180);
if (off <= 10 && SEA.v > 4) {
T.t += dt;
if (T.t >= T.need) {
S.steerT = null;
prwDid("steer");
setStatus("🧭 Held her steady on " + T.want + "°. 'Very well,' says the master.");
}
}
else if (off > 25)
T.t = Math.max(0, T.t - dt * 2);
PRW.banner = (PRW.banner || "") + "<div>🧭 Hold " + T.want + "° · " + Math.round(T.t) + " of " + T.need + " s</div>";
});
function prwYard(p) { return __ZC(462, 83, this, arguments, new.target); }
function prwNameShip(done) { return __ZC(462, 84, this, arguments, new.target); }
function prwFlagPick() { return __ZC(462, 85, this, arguments, new.target); }
var PRW_TRADES = [["crew", "Able seaman", 1], ["crew", "Able seaman", 1], ["deckhand", "Landsman", 0.5], ["buccaneer", "Buccaneer (a crack shot)", 1.25], ["crew", "Gunner", 1.5], ["crew", "Carpenter", 1.25], ["crew", "Surgeon", 1.25], ["crew", "Cook", 1], ["crew", "Musician", 1], ["crew", "Sailing master (navigator)", 1.5]];
function prwHire() { return __ZC(462, 86, this, arguments, new.target); }
function prwMyArticles() { return __ZC(462, 87, this, arguments, new.target); }
PRW.tickers.push(function (dt) {
var S = store.prw;
if (!S || !(S.under || S.own) || !SEA.aboard || !prwInBox(SEA.sx, SEA.sz))
return;
S.dayT = (S.dayT || 0) + dt;
if (S.dayT < 90)
return;
S.dayT = 0;
S.days = (S.days || 0) + 1;
if (prwInPort()) {
S.days = 0;
S.fresh = Math.min(30, (S.fresh || 0) + 3);
}
S.fresh = Math.max(0, (S.fresh || 0) - 1);
if (S.fresh <= 0 && S.days > 12 && !S.scurvy) {
S.scurvy = 1;
setStatus("🦷 <b>Scurvy.</b> Gums swelling and bleeding, old wounds opening, men too weak to haul. Six weeks without fresh food does it. Limes, oranges, fresh greens or turtle cure it in days: make for a port.");
}
if (S.scurvy && S.fresh > 3) {
S.scurvy = 0;
setStatus("🍋 Limes and fresh meat: the sick are on their feet in days.");
}
if (S.own) {
var drop = (S.scurvy ? 3 : 0) + (S.days > 20 ? 2 : 0) + ((Date.now() - (S.lastPrize || Date.now())) > 30 * 60000 ? 1 : 0) - ((S.art && S.art.drink) ? 1 : 0) - (S.own.upg && S.own.upg.surgeon ? 1 : 0);
S.morale = Math.max(0, Math.min(100, S.morale - drop + (drop <= 0 ? 1 : 0)));
if (S.morale < 15 && S.crew.length > 4 && !S.mutiny) {
S.mutiny = 1;
prwMutiny();
}
}
prwSave();
});
function prwMutiny() { return __ZC(462, 88, this, arguments, new.target); }
function prwMaroon(why) { return __ZC(462, 89, this, arguments, new.target); }
function prwMenu() { return __ZC(462, 90, this, arguments, new.target); }
function prwWho() { return __ZC(462, 91, this, arguments, new.target); }
function prwOurGuns() {
var S = prwS();
if (S.own) {
var H = PRW_HULLS[S.own.kind] || PRW_HULLS.sloop;
return H.guns + ((S.own.upg || {}).guns ? 8 : 0);
}
var C = S.under && PRW_SAILS.filter(function (x) { return x.k === S.under; })[0];
return C ? C.guns : 0;
}
function prwOurWeight() { var S = prwS(); return S.own && (S.own.upg || {}).heavy ? 1.6 : 1; }
function prwFlash(S, side) { return __ZC(462, 92, this, arguments, new.target); }
var PRW_WOUND = { adult: ["A round shot comes through the bulwark in a storm of splinters: oak daggers a foot long. The man beside you has one through his thigh, and the surgeon will have to cut it out.",
"Grapeshot sweeps the deck at the height of a man. Two of your gun crew are torn open; the deck is red and slippery and the boys throw sand on it, which is what the sand is for.",
"A cutlass opens a man's face from brow to jaw, and he keeps fighting with his eye hanging.", "A pistol ball takes the bosun in the belly. He will die of it slowly, in three days, as such wounds did."],
young: ["A round shot comes through the bulwark in a storm of splinters. The man beside you goes down hurt, and is carried below to the surgeon.", "Grapeshot sweeps the deck. Two of your gun crew fall wounded.", "A cutlass slash; a man staggers back, bleeding.", "The bosun is shot and carried below."] };
function prwWound() { var L = prwAdult() ? PRW_WOUND.adult : PRW_WOUND.young; return L[Math.floor(Math.random() * L.length)]; }
function prwHurt(kind) { return __ZC(462, 93, this, arguments, new.target); }
var PRW_FIGHT = null;
function prwFightCan(S) {
var me = prwS();
if (!me.under && !me.own)
return "You have no crew to fight her with. Sign on with a captain, or get your own ship and hands.";
if (me.own && me.crew.length < 4)
return "Four hands at least to work the guns and the sails. Hire them in a tavern's back room.";
return "";
}
function prwFightStart(S, theyStart) { return __ZC(462, 94, this, arguments, new.target); }
function prwFightCard(say) { return __ZC(462, 95, this, arguments, new.target); }
function prwFightBack(say) { return __ZC(462, 96, this, arguments, new.target); }
function prwBoard() { return __ZC(462, 97, this, arguments, new.target); }
function prwPrize() { return __ZC(462, 98, this, arguments, new.target); }
function prwSinking() { return __ZC(462, 99, this, arguments, new.target); }
function prwStruck() { return __ZC(462, 100, this, arguments, new.target); }
function prwElect() { return __ZC(462, 101, this, arguments, new.target); }
PRW.tickers.push(function (dt) {
if (!SEA.aboard || PRW_FIGHT || !prwInBox(SEA.sx, SEA.sz))
return;
var me = store.prw;
if (!me || (!me.under && !me.own))
return;
PRW.huntT = (PRW.huntT || 0) + dt;
if (PRW.huntT < 2)
return;
PRW.huntT = 0;
PRW_SAIL.ships.forEach(function (S) {
if (!S.g || !S.at || PRW_FIGHT)
return;
var d = Math.hypot(S.at.x - SEA.sx, S.at.z - SEA.sz);
var hunt = (S.side === "navy" && (me.wanted || 0) >= 2) || (S.side === "pirate" && me.grudge[S.k] > 0) || (S.side === "spain" && (me.wanted || 0) >= 3 && Math.random() < 0.3);
if (!hunt || (me.foughtAt && Date.now() - me.foughtAt < 8 * 60000))
return;
if (d < 900 && !S.warned) {
S.warned = 1;
setStatus(S.side === "pirate" ? "⚠️ <b>" + prwEsc(S.ship) + "</b> has altered course toward you. " + prwEsc(prwSailNameK(S.k)) + " has not forgotten." : "⚠️ <b>" + prwEsc(S.ship) + "</b>, a " + (S.side === "navy" ? "King's ship" : "Spanish guarda costa") + ", is bearing down on you.");
}
if (d < 320) {
me.foughtAt = Date.now();
prwFightStart(S, true);
}
});
});
(function () {
if (typeof prwHail !== "function")
return;
var h0 = prwHail;
prwHail = function (S) {
h0.apply(this, arguments);
var c = WLD.card;
if (!c || !prwInBox(SEA.sx, SEA.sz))
return;
var me = prwS();
if (S.k === me.under)
return;
var d = document.createElement("div");
d.innerHTML = worldBtn("prwatk", "⚔️ " + (S.side === "merchant" ? "Hoist the black flag" : "Attack her"), S.side === "fleet" ? "The treasure fleet: the richest prize in the world, and the best guarded" : S.side === "navy" ? "A King's ship: no prize, only glory and the gallows" : "");
var b = d.firstChild;
b.onclick = function () { worldCard(null); prwFightStart(S, false); };
c.appendChild(b);
};
})();
function prwHoldAt(x, y, z, face, secs, then) {
PRW.hold = { x: x, y: y, z: z };
SEA.aboard = false;
camera.position.set(SEA.base + x, y + 1.6, z);
if (face != null) {
yaw = face;
pitch = 0;
}
var t = 0;
PRW.holdT = function (dt) { t += dt; camera.position.x = SEA.base + x; camera.position.z = z; if (t >= secs) {
PRW.hold = null;
PRW.holdT = null;
if (then)
then();
} };
}
PRW.tickers.push(function (dt) { if (PRW.holdT)
PRW.holdT(dt); });
function prwPortK(k) { return PRW.ports.filter(function (q) { return q.k === k; })[0] || null; }
function prwPortBuilt(k) { var p = prwPortK(k); if (!p)
return null; if (!PRW.built[k])
prwBuildPort(p); return PRW.built[k]; }
function prwLookAt(fx, fz, tx, tz) { return Math.atan2(-(tx - fx), -(tz - fz)); }
function prwBrawl() { return __ZC(462, 102, this, arguments, new.target); }
function prwPelt(L) { return __ZC(462, 103, this, arguments, new.target); }
function prwCaught(by) { return __ZC(462, 104, this, arguments, new.target); }
function prwGaol(p) { return __ZC(462, 105, this, arguments, new.target); }
function prwTrial(p) { return __ZC(462, 106, this, arguments, new.target); }
function prwFreed() { var me = prwS(); me.wanted = 0; me.under = null; me.dmg = 0; prwSave(); prwDressWayfarer(); }
function prwGallowsWalk(p, cap) { return __ZC(462, 107, this, arguments, new.target); }
function prwDrop(p, L, cap, adult, crowd) { return __ZC(462, 108, this, arguments, new.target); }
function prwHanged(p, cap) { return __ZC(462, 109, this, arguments, new.target); }
(function () {
if (typeof prwPardonCard !== "function")
return;
var c0 = prwPardonCard;
prwPardonCard = function () {
c0.apply(this, arguments);
var c = WLD.card, me = prwS();
if (!c || me.pardon)
return;
var d = document.createElement("div");
d.innerHTML = worldBtn("prwtake", "📜 Take the King's Pardon", "Surrender to Governor Rogers: your record is wiped. Once only. Break it, and the gallows wait in front of the fort");
var b = d.firstChild;
b.onclick = function () { me.pardon = Date.now(); me.wanted = 0; prwLog("Took the King's Pardon from Woodes Rogers"); prwSave(); worldCard(worldFacts("Pardoned", "", [], ["You swear before the governor, and your name is written in the book. You are an honest man again, on paper.", "Most went back to sea within months. Hornigold went pirate hunting for Rogers instead."])); prwKeep("prw_pardon", "Your copy of the King's Pardon, signed by Woodes Rogers", "📜"); };
c.appendChild(b);
};
})();
PRW.tickers.push(function (dt) {
var me = store.prw;
if (!me || SEA.aboard || !SEA.shore || !SEA.shore.prw || PRW.hold || (me.wanted || 0) < 3)
return;
if (SEA.shore.style !== "eng")
return;
PRW.marshalT = (PRW.marshalT || 0) + dt;
if (PRW.marshalT < 45)
return;
PRW.marshalT = 0;
if (Math.random() < 0.25) {
setStatus("⚠️ A marshal and four soldiers have recognised you from a 'wanted' notice.");
setTimeout(function () { if (!SEA.aboard && SEA.shore)
prwCaught({ ship: null }); }, 2500);
}
else if (Math.random() < 0.4)
setStatus("👀 A man by the tavern door is looking at you and at a printed paper in his hand. You are wanted here.");
});
function prwBackRoom() { return __ZC(462, 110, this, arguments, new.target); }
(function () {
function hook() {
if (typeof document === "undefined")
return;
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (!document.getElementById("me-prw")) {
var b = document.createElement("button");
b.className = "btn";
b.id = "me-prw";
b.title = "The pirates' Caribbean, on the Endless Sea";
b.textContent = "🏴‍☠️ The Sweet Trade";
b.onclick = function () { prwMenu(); };
bar.appendChild(b);
}
}
if (typeof document !== "undefined")
setTimeout(hook, 2300);
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.repeat)
return;
var tag = (e.target && e.target.tagName) || "";
if (tag === "INPUT" || tag === "TEXTAREA")
return;
if (e.code === "KeyE" && PRW.beatFn && WLD.card && WLD.card.style.display === "block" && WLD.card.innerHTML.indexOf("HEAVE") >= 0) {
e.preventDefault();
e.stopPropagation();
PRW.beatFn();
return;
}
if (e.code === "KeyJ" && typeof WLD !== "undefined" && WLD.on === "sea" && SEA.aboard && prwInBox(SEA.sx, SEA.sz)) {
e.preventDefault();
prwDuties();
}
}, true);
})();
(function () {
var W = typeof WORLDS !== "undefined" ? WORLDS.sea : null;
if (!W)
return;
var onDeck = function (x, z) { var L = PRW.decks || []; for (var i = 0; i < L.length; i++) {
var d = L[i];
if (!PRW.built[d.port])
continue;
var dx = x - d.x, dz = z - d.z, c = Math.cos(d.rot), s = Math.sin(d.rot), lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) < d.hw && Math.abs(lz) < d.hd)
return d;
} return null; };
var g0 = W.ground, b0 = W.block;
W.ground = function (x, z, feet) { try {
var H = PRW.hold;
if (H && !SEA.aboard && Math.hypot(x - H.x, z - H.z) < 4)
return H.y;
if (!SEA.aboard) {
var d = onDeck(x, z);
if (d)
return d.y;
}
}
catch (e) { } return g0.apply(this, arguments); };
W.block = function (x, z, feet) { try {
var H = PRW.hold;
if (H && !SEA.aboard && Math.hypot(x - H.x, z - H.z) > 0.35)
return true;
if (!SEA.aboard && onDeck(x, z))
return worldSolidAt(SEA.solids || [], x, z, feet);
}
catch (e) { } return b0.apply(this, arguments); };
})();
PRW.tickers.push(function (dt) {
var t = PRW.t;
if (((t * 10) | 0) % 2)
return;
Object.keys(PRW.built).forEach(function (k) {
var B = PRW.built[k];
if (!B || !B.g)
return;
if (!B.flags) {
B.flags = [];
B.g.traverse(function (o) { if (o.userData && o.userData.flag && o.geometry)
B.flags.push(o); });
}
B.flags.forEach(function (f, i) { var p = f.geometry.attributes.position; for (var j = 0; j < p.count; j++) {
var x = p.getX(j);
p.setZ(j, Math.sin(x * 1.6 + t * 5 + i) * 0.18 * x / 3);
} p.needsUpdate = true; });
});
});
Object.assign(PRW_WEAR, {
billy: { cut: "coat", coat: 0x2A3A5A, vest: 0x5A4A3A, trou: 0x3A3228, stock: 0x8A7A5A, sash: null, hat: "tricorn", hc: 0x2A2420, held: "mug", scar: 1, pigtail: 1 },
blackdog: { cut: "jacket", coat: 0x5A5A4A, trou: 0x4A4038, hat: "tricorn", hc: 0x2A2420, held: "cutlass", shoes: 1 },
pew: { cut: "cloak", coat: 0x4A4438, trou: 0x3A3428, hat: "hood", hc: 0x4A4438, held: "staff", shade: 1 },
livesey: { cut: "coat", coat: 0x1A1A1E, vest: 0x2A2A2E, trou: 0x1A1A1E, stock: 0xF4F0E4, sash: null, hat: "tricorn", hc: 0x141414, held: "book", wig: 1, wigWhite: 1 },
squire: { cut: "coat", coat: 0x3A5A3A, vest: 0xC8A040, trou: 0xC8B890, stock: 0xF4F0E4, sash: null, hat: "tricorn", hc: 0x1A1A1A, held: "musket", wig: 1 },
smollett: { cut: "coat", coat: 0x1E2A4A, vest: 0xE8E0CC, trou: 0x1E2A4A, stock: 0xF4F0E4, sash: null, hat: "tricorn", hc: 0x141414, held: "spyglass" },
silver: { cut: "coat", coat: 0x2A3A6A, vest: 0x6A4A2A, trou: 0x3A3228, stock: 0xE8E0CC, sash: null, hat: "tricorn", hc: 0x1A1A1A, held: null, crutch: 1, parrot: 1 },
bengunn: { cut: "slave", coat: 0xA8906A, trou: 0x8A7454, hat: null, held: null, goat: 1 },
jim: { cut: "jacket", coat: 0x3A5AA8, trou: 0x5A4A32, hat: "cap", hc: 0x5A4A32, held: null, shoes: 1 },
mrshawkins: { cut: "lady", coat: 0x5A4A3A, hat: "coif", hc: 0xF0ECE0, apron: 1 },
hands: { cut: "shirt", coat: 0xE8E4D8, trou: 0x3A3A40, sash: 0x8A2A1E, hat: "kerchief", hc: 0x8A2A1E, held: "cutlass" }
});
(function () {
var f0 = prwWearFor;
prwWearFor = function (L, o) {
var W = PRW_WEAR[L._pw];
if (W && W.cut === "cloak")
return wfIds({ ids: ["oz:shirt:long:worn7", "oz:collar:low:soft", "oz:coat:long:cloth", "oz:trousers:cloth"], col: { shirt: 0xA89A80, collar: 0xA89A80, coat: W.coat, trou: W.trou }, shoes: 0x2A1E14 });
return f0.apply(this, arguments);
};
})();
(function () {
var p0 = prwProps;
prwProps = function (add, c, E) {
p0.apply(this, arguments);
var L = (E && E.spec && E.spec.look) || {}, W = PRW_WEAR[L._pw];
if (!W)
return;
if (W.crutch) {
var cr = new THREE.Group(), wd = prwM(0x6A4A2A, { r: 0.7 });
var sh = new THREE.Mesh(prwG("crsh", function () { return new THREE.CylinderGeometry(0.02, 0.022, 1.25, 6); }), wd);
sh.position.y = -0.62;
cr.add(sh);
var tp = new THREE.Mesh(prwG("crtp", function () { return new THREE.BoxGeometry(0.2, 0.04, 0.06); }), prwM(0x3A2A1A, { r: 0.8 }));
cr.add(tp);
cr.rotation.z = -0.08;
add("Spine2", [-0.24, -0.02, 0.02], cr);
}
if (W.parrot) {
var pg = new THREE.Group(), gr = prwM(0x2A9A3A, { r: 0.6 }), yl = prwM(0xE8C83A, { r: 0.6 }), rd = prwM(0xC8302A, { r: 0.6 });
var b = new THREE.Mesh(prwG("pbody", function () { return new THREE.SphereGeometry(0.06, 10, 8); }), gr);
b.scale.set(0.9, 1.3, 0.9);
pg.add(b);
var hd = new THREE.Mesh(prwG("phead", function () { return new THREE.SphereGeometry(0.04, 10, 8); }), gr);
hd.position.set(0, 0.09, 0.02);
pg.add(hd);
var bk = new THREE.Mesh(prwG("pbeak", function () { return new THREE.ConeGeometry(0.015, 0.035, 6); }), yl);
bk.rotation.x = Math.PI / 2 + 0.6;
bk.position.set(0, 0.08, 0.06);
pg.add(bk);
var tl = new THREE.Mesh(prwG("ptail", function () { return new THREE.BoxGeometry(0.03, 0.14, 0.01); }), rd);
tl.position.set(0, -0.12, -0.04);
tl.rotation.x = 0.4;
pg.add(tl);
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(prwG("pwing", function () { return new THREE.BoxGeometry(0.012, 0.09, 0.06); }), prwM(0x1E7A2E, { r: 0.6 })); w.position.set(s * 0.05, 0, 0); pg.add(w); });
add("Spine2", [-0.17, 0.27, 0], pg);
}
if (W.shade) {
var s = new THREE.Mesh(prwG("pshade", function () { return new THREE.BoxGeometry(0.17, 0.05, 0.04); }), prwM(0x1E5A2A, { r: 0.8 }));
add("Head", [0, 0.04, 0.11], s);
}
if (W.scar) {
var sc = new THREE.Mesh(prwG("pscar", function () { return new THREE.BoxGeometry(0.008, 0.07, 0.004); }), prwM(0xE8D8D0, { r: 0.9 }));
sc.rotation.z = 0.5;
add("Head", [0.06, 0.0, 0.1], sc);
}
if (W.pigtail) {
var pt = new THREE.Mesh(prwG("ppig", function () { return new THREE.CylinderGeometry(0.014, 0.008, 0.24, 6); }), prwM(0x1A1410, { r: 0.6 }));
pt.position.set(0, -0.1, -0.11);
pt.rotation.x = -0.25;
add("Head", [0, -0.1, -0.12], pt);
}
if (W.goat) {
for (var i = 0; i < 5; i++) {
var gp = new THREE.Mesh(prwG("pgoat", function () { return new THREE.BoxGeometry(0.1, 0.12, 0.02); }), prwM([0xC8B898, 0x6A5A44, 0xE8E0CC][i % 3], { r: 1 }));
add("Spine2", [-0.12 + (i % 3) * 0.12, -0.15 + (i > 2 ? 0.18 : 0), 0.13], gp);
}
}
};
})();
PRW_PORTS.push({ k: "benbow", name: "Black Hill Cove: the Admiral Benbow", lon: -52.6, lat: 31.2, r: 300, h: 24, col: 0x5A7A4A, rock: 0x7A7468, face: 90, style: "eng", year: "17—", ti: 1,
b: [["tavern", "The Admiral Benbow"], ["house", "Dr Livesey's house"], ["house", "The hamlet"], ["church", "The hamlet church"]],
card: "Treasure Island, Part One: the Old Buccaneer",
about: ["\"Squire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island … I take up my pen in the year of grace 17—, and go back to the time when my father kept the Admiral Benbow inn.\" (Robert Louis Stevenson, Treasure Island, 1883)",
"A lonely inn on the cliff road above a cove, on the coast of the West of England. Admiral John Benbow was a real admiral, who died of his wounds in 1702 after his captains refused to fight the French at sea; inns all over England were named for him."] }, { k: "bristol", name: "Bristol", lon: -50.3, lat: 29, r: 520, h: 20, col: 0x5A7A4A, rock: 0x8A8070, face: 180, style: "eng", year: "17—", ti: 1,
b: [["tavern", "The Spy-glass"], ["chandler", "A ship's chandler on the quay"], ["store", "A warehouse of the Africa and Indies trade"], ["house", "The Old Anchor inn, where the Squire stays"], ["church", "St Mary Redcliffe"], ["wright", "The shipyard"], ["court", "The Council House"], ["gaol", "Newgate, Bristol"], ["stocks", ""]],
card: "England's great port to the Indies",
about: ["In the 1700s Bristol was England's second city and its busiest port to the West Indies, Virginia and Africa: sugar, rum, tobacco and cocoa in; cloth, guns and ironware out. Its merchants grew rich on the trade in enslaved Africans; over 2,000 slaving voyages sailed from here. That is part of the true history of the age of the pirates, too.",
"Edward Teach (Blackbeard) was said to have been born here. Woodes Rogers was a Bristol captain: in 1708 he sailed from here round the world, took a Spanish treasure galleon, and on Juan Fernández picked up Alexander Selkirk, marooned four years.",
"In Treasure Island, the Squire buys the schooner Hispaniola here, and hires a crew, and a cook: \"a man with one leg … Long John Silver, he is called.\""] });
var TI = { x: -15200, z: 8200, built: false, g: null, lite: false, spots: {}, people: [], talkers: [], solids: [], ship: null };
var TI_AT = {
anchorage: { x: 20, z: 880, name: "Captain Kidd's Anchorage" }, landing: { x: 30, z: 690, name: "The landing beach" }, skeleton: { x: 330, z: 880, name: "Skeleton Island" },
spyglass: { x: -170, z: 220, name: "The top of Spy-glass Hill" }, plateau: { x: -110, z: 20, name: "The plateau on Spy-glass shoulder" }, tree: { x: -100, z: -20, name: "The tall tree" },
pointer: { x: -150, z: 120, name: "Flint's pointer" }, cache: { x: -80, z: -50, name: "The cache" }, foremast: { x: 60, z: -480, name: "Foremast Hill" },
mizzen: { x: 240, z: -160, name: "The two-pointed hill" }, cave: { x: 200, z: -120, name: "Ben Gunn's cave" }, stockade: { x: 270, z: 360, name: "The stockade" },
marsh: { x: 40, z: 430, name: "The marsh" }, whiterock: { x: 210, z: 650, name: "The White Rock" }, inlet: { x: -60, z: -740, name: "The North Inlet" },
woods: { x: -40, z: 300, name: "The grey woods" }, spring: { x: 262, z: 352, name: "The spring" }, grave: { x: 120, z: 520, name: "A sandy hollow" }
};
function tiXZ(k) { var a = TI_AT[k]; return a ? { x: TI.x + a.x, z: TI.z + a.z, name: a.name } : null; }
var TI_HILLS = [[-170, 220, 92, 105], [-110, 20, 44, 90], [60, -480, 66, 95], [230, -170, 52, 55], [290, -110, 48, 50], [270, 360, 11, 38], [-260, -200, 30, 90], [120, 100, 22, 120]];
function tiH(x, z) { return __ZC(462, 111, this, arguments, new.target); }
function tiSkH(x, z) { var lx = x - TI.x - 330, lz = z - TI.z - 880, e = Math.pow(lx / 120, 2) + Math.pow(lz / 90, 2); if (e > 1)
return Math.max(-9, 1.4 - (e - 1) * 40); return 1.4 + (1 - e) * 13; }
var TI_ISLE = { k: "treasureisland", name: "Treasure Island", x: TI.x, z: TI.z, r: 760, h: 100, col: 0x5A6A44, rock: 0x8A8478, ti: 1, tiMain: 1,
dock: { x: TI.x + 20, z: TI.z + 790 }, land: { x: TI.x + 30, z: TI.z + 690 }, card: "Robert Louis Stevenson's island, 1883",
about: ["\"Tall tree, Spy-glass shoulder, bearing a point to the N. of N.N.E. Skeleton Island E.S.E. and by E. Ten feet.\"",
"Captain Flint's island, as the map in Billy Bones' sea chest draws it: about nine miles long and five across, \"shaped like a fat dragon standing up\". Here, Flint buried his treasure and killed the six men who helped him.",
"Menu › 🏴‍☠️ The Sweet Trade › 📖 Treasure Island plays the whole book, from the Admiral Benbow to the last of Silver."] };
var TI_SK = { k: "tiskeleton", name: "Skeleton Island", x: TI.x + 330, z: TI.z + 880, r: 150, h: 15, col: 0x6A7050, rock: 0x9A9488, ti: 1, tiSk: 1,
dock: { x: TI.x + 330, z: TI.z + 1010 }, land: { x: TI.x + 330, z: TI.z + 950 }, card: "A little island off the anchorage", about: ["Low and rocky, with a few wind-bent trees. Flint named it; nobody quite remembers why."] };
(function () {
if (typeof seaIsleH !== "function")
return;
var h0 = seaIsleH;
seaIsleH = function (p, x, z) { if (p && p.tiMain)
return tiH(x, z); if (p && p.tiSk)
return tiSkH(x, z); return h0.apply(this, arguments); };
})();
(function () {
if (typeof seaBuild !== "function")
return;
var b0 = seaBuild;
seaBuild = function (G) { var r = b0.apply(this, arguments); try {
TI.built = false;
TI.g = null;
if (SEA.isles.indexOf(TI_ISLE) < 0)
SEA.isles.push(TI_ISLE, TI_SK);
}
catch (e) {
if (window.console)
console.warn("[prw] ti isle", e);
} return r; };
})();
function tiBuild() { return __ZC(462, 112, this, arguments, new.target); }
function tiDrop() { if (!TI.built)
return; if (TI.g)
prwLetGo(TI.g); TI.g = null; TI.built = false; TI.people = []; TI.talkers = []; TI.solids = []; TI.ship = null; if (typeof tiCastDrop === "function")
tiCastDrop(); }
function tiPine(g, x, y, z, R, k) {
var s = (0.8 + R() * 0.6) * (k || 1), hgt = 11 * s;
prwCyl(0.22 * s, 0.32 * s, hgt * 0.7, k > 2 ? 0x8A3A22 : 0x5A4232, x, y + hgt * 0.35, z, g, 6);
for (var i = 0; i < 3; i++)
prwCone(2.6 * s - i * 0.6 * s, 3.4 * s, i % 2 ? 0x2E4A2E : 0x3A5634, x, y + hgt * 0.55 + i * 1.9 * s, z, g, 7);
}
function tiOak(g, x, y, z, R) {
var s = 0.8 + R() * 0.5;
prwCyl(0.3 * s, 0.45 * s, 3.2 * s, 0x4A3A2A, x, y + 1.6 * s, z, g, 6);
var c = prwSph(3.2 * s, R() < 0.5 ? 0x5A6A44 : 0x6A7254, x, y + 4.6 * s, z, g, 7);
c.scale.set(1.3, 0.75, 1.2);
}
function tiReeds(g, x, y, z, R) { for (var i = 0; i < 4; i++)
prwCyl(0.03, 0.04, 1.6 + R(), 0x7A8A4A, x + (R() - 0.5) * 1.5, y + 0.8, z + (R() - 0.5) * 1.5, g, 3); }
function tiStockade(g, stat) { return __ZC(462, 113, this, arguments, new.target); }
function tiCave(g, stat) { return __ZC(462, 114, this, arguments, new.target); }
function tiCache(stat) { return __ZC(462, 115, this, arguments, new.target); }
function tiPointer(stat) { return __ZC(462, 116, this, arguments, new.target); }
function tiWhiteRock(stat) { return __ZC(462, 117, this, arguments, new.target); }
function tiLookout(stat) { var c = tiXZ("spyglass"), y = tiH(c.x, c.z); for (var i = 0; i < 5; i++)
prwSph(0.7 - i * 0.1, 0x8A8478, c.x, y + 0.4 + i * 0.55, c.z, stat, 6); }
function tiPlaceShip(g) { return __ZC(462, 118, this, arguments, new.target); }
PRW.tickers.push(function (dt) {
if (!WORLDS.sea.g)
return;
var L = worldLocal(), px = SEA.aboard ? SEA.sx : L.x, pz = SEA.aboard ? SEA.sz : L.z, d = Math.hypot(px - TI.x, pz - TI.z) - 760;
if (!TI.built && d < (prwLite() ? 1500 : 2400))
tiBuild();
else if (TI.built && d > (prwLite() ? 2600 : 3400) && !(SEA.shore && SEA.shore.ti))
tiDrop();
if (TI.built && !SEA.aboard) {
TI.tick.forEach(function (f) { try {
f(dt);
}
catch (e) { } });
}
});
(function () {
var W = WORLDS.sea;
if (!W)
return;
var b0 = W.block;
W.block = function (x, z, feet) { try {
if (TI.built && !SEA.aboard && Math.hypot(x - TI.x, z - TI.z) < 1100 && worldSolidAt(TI.solids, x, z, feet))
return true;
}
catch (e) { } return b0.apply(this, arguments); };
})();
function tiPortOf(k) { return PRW.ports.filter(function (q) { return q.k === k; })[0] || null; }
function tiPos(ref) { return __ZC(462, 119, this, arguments, new.target); }
function tiShipDeck() { if (!TI.ship)
return null; var s = TI.ship, H = s.userData.H || 4; return { x: s.position.x, z: s.position.z, y: s.position.y + H * 0.62, name: "The Hispaniola's deck", area: "ti" }; }
var TI_WHO = {
jimma: { name: "Mrs Hawkins", role: "mrshawkins", sex: "f", persona: "Jim Hawkins' mother, a hard-working widow who keeps the Admiral Benbow inn on the coast of the West of England in the 1700s. Plain-spoken, brave when she must be, careful about money: she will take what the dead captain owed her and not a farthing more." },
billy: { name: "Billy Bones, 'the captain'", role: "billy", persona: "Billy Bones, the old sea-captain lodging at the Admiral Benbow in Robert Louis Stevenson's Treasure Island: tall, strong, nut-brown, a tarry pigtail, a sabre cut across one cheek; he drinks rum, sings 'Fifteen men on the dead man's chest', and watches the cove with his brass telescope for 'a seafaring man with one leg'. You were Flint's first mate. Gruff, frightened underneath, fond of Jim." },
blackdog: { name: "Black Dog", role: "blackdog", persona: "Black Dog, a pale, tallowy pirate missing two fingers of his left hand, from Treasure Island. Oily and threatening, you've come to the Admiral Benbow looking for your 'mate Bill'." },
livesey: { name: "Dr Livesey", role: "livesey", persona: "Dr David Livesey, doctor and magistrate, from Treasure Island: neat, with a powdered wig white as snow and bright black eyes, calm, fearless, fair-minded and dry-humoured. You treat friend and enemy alike." },
pew: { name: "Blind Pew", role: "pew", persona: "Blind Pew from Treasure Island: a hunched blind beggar in a huge tattered sea-cloak and hood, with a green shade over his eyes, tapping with a stick. Your voice is soft and horrible; you grip like a vice. You lost your eyes in the same broadside that took Silver's leg." },
squire: { name: "Squire Trelawney", role: "squire", persona: "Squire John Trelawney from Treasure Island: tall, broad, red-faced, rich, enthusiastic, generous and hopelessly unable to keep a secret. You bought the Hispaniola and hired the crew yourself, Long John Silver among them." },
smollett: { name: "Captain Smollett", role: "smollett", persona: "Captain Alexander Smollett of the schooner Hispaniola, from Treasure Island: stern, honest, precise, a true seaman who doesn't like this voyage or this crew, and says so plainly. Brave as a lion." },
silver: { name: "Long John Silver", role: "silver", persona: "Long John Silver from Robert Louis Stevenson's Treasure Island: the ship's cook, very tall and strong, with one leg and a crutch, a face as big as a ham, plain and pale but clever and smiling; your parrot Captain Flint rides your shoulder crying 'Pieces of eight!'. Charming, fatherly to Jim ('Jim, my son'), quick with a story, and secretly the leader of the pirates, Flint's old quartermaster, playing every side to come out alive and rich. You call others 'shipmate', 'matey'. Never break character." },
hands: { name: "Israel Hands", role: "hands", persona: "Israel Hands, coxswain of the Hispaniola, once Flint's gunner, from Treasure Island: a sly, murderous old seaman. Wheedling one moment, deadly the next." },
merry: { name: "George Merry", role: "crew", persona: "George Merry, one of the pirates of the Hispaniola in Treasure Island: hot-headed, greedy, always trying to push Silver aside as captain." },
morgan: { name: "Tom Morgan", role: "crew", persona: "Tom Morgan, an old pirate of Flint's crew in Treasure Island, superstitious and slow." },
ben: { name: "Ben Gunn", role: "bengunn", persona: "Ben Gunn from Treasure Island: marooned on the island three years ago by Flint's crew, sun-burnt, in goatskins, half wild and odd-mannered, talking to yourself, kind at heart, longing for toasted cheese, and secretly rich: you dug up Flint's treasure and carried it to your cave. You want a passage home and a pardon." },
gray: { name: "Abraham Gray", role: "crew", persona: "Abraham Gray, ship's carpenter's mate of the Hispaniola in Treasure Island, the one sailor who broke away from the mutineers to stand by Captain Smollett. Quiet, steady." }
};
var TI_BOOK = [
{ t: "1. The Old Sea-dog at the 'Admiral Benbow'", part: "Part One: The Old Buccaneer", cast: { billy: { port: "benbow", door: "The Admiral Benbow", d: 4 }, jimma: { port: "benbow", door: "The Admiral Benbow", d: 2, dx: 2 } },
text: ["\"I remember him as if it were yesterday, as he came plodding to the inn door, his sea-chest following behind him in a hand-barrow: a tall, strong, heavy, nut-brown man; his tarry pigtail falling over the shoulder of his soiled blue coat; his hands ragged and scarred, with black, broken nails; and the sabre cut across one cheek, a dirty, livid white.\"",
"You are Jim Hawkins. Your father keeps the Admiral Benbow, a lonely inn above a cove on the coast of the West of England. The old seaman who has come to stay pays you a silver fourpenny on the first of every month to keep a watch for one man."],
steps: [{ k: "sail", at: { port: "benbow" }, t: "Sail to Black Hill Cove, on the coast of England (the light shows the way), and go ashore" },
{ k: "go", at: { port: "benbow", door: "The Admiral Benbow", d: 6 }, t: "Walk up to the Admiral Benbow" },
{ k: "talk", who: "billy", t: "Talk with the old seaman at the door", say: ["\"This is a handy cove, and a pleasant sittyated grog-shop. Much company, mate?\"", "He takes you aside. \"Keep your 'weather-eye open for a seafaring man with one leg', and let me know the moment he appears. A silver fourpenny on the first of every month for you, Jim.\""] },
{ k: "choose", q: "Every night he sings the same old sea song, and makes the whole room join in. What is it?", o: ["\"Fifteen men on the dead man's chest, Yo-ho-ho, and a bottle of rum!\"", "\"Spanish Ladies\"", "\"Drunken Sailor\""], why: "Stevenson made up the song, and it has been every pirate's song since. (\"Dead Man's Chest\" is a real rock in the British Virgin Islands.)" },
{ k: "hold", at: { port: "benbow", u: -60, v: 70 }, r: 6, secs: 20, t: "Go out to the cliff with him and keep the watch with his brass telescope: stay there and watch the sea" }] },
{ t: "2. Black Dog Appears, and Disappears", cast: { billy: { port: "benbow", door: "The Admiral Benbow", d: 4 }, blackdog: { port: "benbow", u: -20, v: 30 }, livesey: { port: "benbow", door: "Dr Livesey's house", d: 3 } },
text: ["One January morning, a stranger comes into the parlour: a pale, tallowy creature, wanting two fingers of the left hand. \"Is this here table for my mate Bill?\"", "Then cutlasses are out, and the old captain chases him down the road; his last great cut notches the Benbow's signboard. Then he falls, and the doctor comes."],
steps: [{ k: "talk", who: "blackdog", t: "A stranger waits on the road. Talk with him", say: ["\"Come here, sonny. Is this here table for my mate Bill?\" He wants two fingers of his left hand.", "\"I'll wait for him. Bill and me were shipmates.\""] },
{ k: "beat", title: "Cutlasses!", say: "Black Dog and the captain fight in the parlour; press to dodge out of the way of the blades and the falling table", n: 3, speed: 1.3, t: "Dodge the fight" },
{ k: "talk", who: "livesey", t: "Run for Dr Livesey", say: ["\"Now, Mr Bones, you have had a stroke, precisely as I told you. One glass of rum won't kill you, but if you take one you'll take another and another, and I stake my wig if you don't break off short, you'll die.\""] },
{ k: "choose", q: "Dr Livesey treats the stroke by 'bleeding' the captain: cutting a vein to let blood out. Was that what doctors did then?", o: ["Yes. Bleeding was the most common treatment of the age, for almost everything; it often did harm", "No, Stevenson invented it", "Only pirates' doctors did it"], why: "Doctors bled patients for 2,000 years, until the 1800s showed it usually did more harm than good." }] },
{ t: "3. The Black Spot", cast: { billy: { port: "benbow", door: "The Admiral Benbow", d: 2 }, pew: { port: "benbow", u: 30, v: -40 } },
text: ["The captain tells you the secret: \"I was first mate, I was, old Flint's first mate, and I'm the on'y one as knows the place. He gave it me at Savannah, when he lay a-dying.\"", "Then, on a bitter, foggy afternoon, there's tapping on the frozen road: a blind man, hunched, in a huge old tattered sea-cloak with a hood, a green shade over his eyes."],
steps: [{ k: "talk", who: "billy", t: "Sit with the captain", say: ["\"If I can't get away nohow, and they tips me the black spot, mind you, it's my old sea-chest they're after.\"", "\"They're a bad lot, Jim. Flint's crew, all on 'em that's left.\""] },
{ k: "talk", who: "pew", t: "A blind man taps up the road. Answer him", say: ["\"Will any kind friend inform a poor blind man, who has lost the precious sight of his eyes in the gracious defence of his native country, where or in what part of this country he may now be?\"", "His hand grips your arm like a vice. \"Now, boy, take me in to the captain, or I'll break your arm.\"", "He presses something into the captain's hand, and taps away up the road. The captain reads it: \"Ten o'clock! Six hours. We'll do them yet!\" Then he sways, and falls dead on the floor."] },
{ k: "choose", q: "What was the black spot?", o: ["A pirates' summons or verdict: a scrap of paper blackened on one side, a message written on the other", "A bruise left by a fist", "A mark on a treasure map"], why: "Stevenson invented it, and it stuck. The captain's says: \"You have till ten tonight.\"" }] },
{ t: "4. The Sea-chest", cast: { jimma: { port: "benbow", door: "The Admiral Benbow", d: 2 } },
text: ["You tell your mother everything. The neighbours are too afraid of Flint's name to help. So the two of you go back alone, lock the door, take the key from round the dead man's neck, and open his chest by candlelight."],
steps: [{ k: "find", at: { port: "benbow", door: "The Admiral Benbow", d: 5 }, n: 6, spread: 6, name: "something from the chest", items: ["a quadrant", "a tin canikin", "two brace of very handsome pistols", "a piece of bar silver", "an old Spanish watch", "a bundle tied up in oilcloth, like papers"], t: "Search the captain's chest: find six things" },
{ k: "choose", q: "Your mother counts only what the captain owed. The bag is full of 'guineas, and louis d'ors, and doubloons, and double guineas, and moidores, and sequins'. What does that tell you?", o: ["That it's plunder from all over the world: English, French, Spanish, Portuguese and Venetian gold", "That he was a banker", "That it's all fake"], why: "In the 1700s gold coins of every country went round the ports: a pirate's purse was a geography lesson." },
{ k: "talk", who: "jimma", t: "Tell your mother you hear them coming", say: ["\"I'll take what I have,\" she says, jumping to her feet. \"And I'll take this to square the count,\" you say, picking up the oilskin packet.", "A low whistle out on the hill. Then the tap-tapping of the blind man's stick."] }] },
{ t: "5. The Last of the Blind Man", cast: { pew: { port: "benbow", u: 20, v: -10 }, livesey: { port: "benbow", door: "Dr Livesey's house", d: 3 } },
text: ["You and your mother get only as far as the little bridge, and hide under it. Pew and his men smash in the door, and find the chest rifled. \"It's these people of the inn, it's that boy. I wish I had put his eyes out!\""],
steps: [{ k: "hold", at: { port: "benbow", u: 30, v: -60 }, r: 5, secs: 30, t: "Hide by the bridge and keep absolutely still while they search" },
{ k: "read", title: "The revenue riders", text: ["Horses on the road: the revenue officers. The pirates scatter. Blind Pew, screaming for his mates, runs the wrong way, straight under the hooves of the leading horse. " + "(Grown-ups: \"Pew was dead, stone dead.\")"] },
{ k: "go", at: { port: "benbow", door: "Dr Livesey's house", d: 4 }, t: "Take the oilskin packet to Dr Livesey's house" }] },
{ t: "6. The Captain's Papers", cast: { livesey: { port: "benbow", door: "Dr Livesey's house", d: 3 }, squire: { port: "benbow", door: "Dr Livesey's house", d: 3, dx: 2 } },
text: ["In the packet: the captain's account book, and a sealed paper: the map of an island, \"with latitude and longitude, soundings, names of hills and bays and inlets\", and three crosses of red ink. In a small neat hand: \"Bulk of treasure here.\""],
steps: [{ k: "talk", who: "squire", t: "Talk with Squire Trelawney", say: ["\"Flint! He was the bloodthirstiest buccaneer that sailed. Blackbeard was a child to Flint.\"", "\"Livesey, you will give up this wretched practice at once. Tomorrow I start for Bristol. In three weeks' time we'll have the best ship, sir, and the choicest crew in England. Hawkins shall come as cabin-boy.\""] },
{ k: "choose", q: "On the back of the map: \"Tall tree, Spy-glass shoulder, bearing a point to the N. of N.N.E.\" On a compass rose of 32 points, where is N.N.E.?", o: ["Between north and north-east: two points (22½°) east of north", "Halfway between east and south", "Due north"], why: "Seamen steered by 32 named points. 'A point to the N. of N.N.E.' is one point more northerly: 11¼° east of north." },
{ k: "talk", who: "livesey", t: "Talk with Dr Livesey", say: ["\"Squire, I'll go with you. There's only one man I'm afraid of.\" \"And who's that?\" \"You, for you cannot hold your tongue.\""] }] },
{ t: "7. I Go to Bristol", part: "Part Two: The Sea Cook", cast: { squire: { port: "bristol", wharf: 1, dx: 4 } },
text: ["A letter from the Squire: \"The ship is bought and fitted. She lies at anchor, ready for sea. You never imagined a sweeter schooner: two hundred tons; name, Hispaniola.\" And: \"I found an admirable fellow for sea-cook. Long John Silver, he is called, and has lost a leg.\""],
steps: [{ k: "sail", at: { port: "bristol" }, t: "Sail to Bristol and go ashore at the quay" },
{ k: "talk", who: "squire", t: "Find the Squire on the quay", say: ["\"Here you are! The doctor came last night from London. Bravo! The ship's company complete!\" He is dressed like a sea officer, in stout blue cloth.", "\"Take this note to John Silver, at the sign of the Spy-glass.\""] }] },
{ t: "8. At the Sign of the 'Spy-glass'", cast: { silver: { port: "bristol", door: "The Spy-glass", d: 3 }, blackdog: { port: "bristol", door: "The Spy-glass", d: 8, dx: 4 } },
text: ["\"As I was waiting, a man came out of a side room, and at a glance I was sure he must be Long John. His left leg was cut off close by the hip, and under the left shoulder he carried a crutch, which he managed with wonderful dexterity, hopping about upon it like a bird.\""],
steps: [{ k: "go", at: { port: "bristol", door: "The Spy-glass", d: 6 }, t: "Find the Spy-glass, a bright little tavern on the quay" },
{ k: "talk", who: "blackdog", t: "That man at the door, with two fingers gone!", say: ["It's Black Dog! He sees you, and bolts out of the door."] },
{ k: "talk", who: "silver", t: "Give your note to the tall man with one leg", say: ["\"Oh,\" said he, \"so you're the new cabin-boy; pleased I am to see you.\" He takes your hand in his large firm grasp.", "\"Black Dog? Never heard of him. Harry, run after him! Him a pirate? I wouldn't have him in my house.\" He is very convincing. (He knew him perfectly well.)"] },
{ k: "choose", q: "Stevenson's Silver gave us the pirate with one leg and a parrot. Were there real one-legged pirates?", o: ["Yes: wounds were common and amputation was the cure; the Articles paid 800 pieces of eight for a lost leg", "No, never", "Only in Spain"], why: "François Le Clerc, a French corsair of the 1550s, was called 'Jambe de Bois', Peg-leg." }] },
{ t: "9. Powder and Arms", cast: { smollett: { port: "bristol", wharf: 1, dx: -3 }, squire: { port: "bristol", wharf: 1, dx: 4 } },
text: ["Captain Smollett is not happy. \"I don't like this cruise; I don't like the men; and I don't like my officer. The crew know more than I do. I learn we are going after treasure: I hear it from my own hands.\""],
steps: [{ k: "talk", who: "smollett", t: "Talk with Captain Smollett", say: ["\"You have a map of an island, there's crosses on the map to show where treasure is. Well, gentlemen, that's not what I call a secret. Put the powder and the arms in the after hold, under the cabin, and berth your own people there.\""] },
{ k: "find", at: { port: "bristol", wharf: 1 }, n: 6, spread: 12, name: "a keg of powder or a stand of arms", items: ["a keg of powder", "a keg of powder", "a stand of muskets", "a keg of powder", "a chest of cutlasses", "a keg of powder"], t: "Carry the powder and arms aft, out of the crew's reach: find six on the quay" },
{ k: "choose", q: "Why did the captain want the powder and arms stored aft, by the cabin?", o: ["So that if the crew mutinied, the officers held the weapons", "Because the bow was full", "For balance"], why: "Every ship's officers kept the arms chest under their own eye. A mutiny began by seizing it." }] },
{ t: "10. The Voyage", cast: { silver: { ship: 1, dx: 0, dz: 8 }, smollett: { ship: 1, dx: 1, dz: -12 } },
text: ["\"All that night we were in a great bustle, getting things stowed in their place.\" Then the anchor comes up, and the crew sing: \"Fifteen men on the dead man's chest…\"", "The voyage is long. Mr Arrow the mate turns out a drunkard, and one dark night he is gone, overboard. Silver is the most popular man aboard: \"Come away, Hawkins, come and have a yarn with John.\""],
steps: [{ k: "beat", title: "Up anchor!", say: "Every man on the capstan bars, walking round and round to the shanty, and the cable comes in", n: 5, speed: 1.2, t: "Heave at the capstan" },
{ k: "sail", at: { ti: "anchorage", dz: -120 }, t: "Set sail for the island: south-west, by the trade wind (the light marks it on the chart)" },
{ k: "talk", who: "silver", t: "Have a yarn with Silver in the galley", say: ["\"Here's Cap'n Flint. I calls my parrot Cap'n Flint, after the famous buccaneer. She's maybe two hundred years old, Hawkins; she's seen more wickedness than the devil himself. 'Pieces of eight! Pieces of eight!'\""] }] },
{ t: "11. What I Heard in the Apple Barrel",
text: ["The night before landfall, you climb into the apple barrel for an apple, and nearly fall asleep in the dark. Then the barrel shakes: a big man has leaned his shoulder against it. It is Silver, and he is talking, low, to young Dick, a sailor."],
steps: [{ k: "choose", q: "Silver is telling the young sailor he was Flint's quartermaster, and offering him a share of the treasure if he joins the pirates. What do you do?", o: ["Keep perfectly still in the barrel and listen to it all", "Jump out and shout", "Call for the captain"], why: "\"I would not have shown myself for all the world.\" You hear it all: Silver's men are most of the crew; they will wait until the treasure is aboard, then kill the gentlemen." },
{ k: "read", title: "\"Land ho!\"", text: ["\"Now, look here, I'm for putting the treasure aboard first, and then: dooty is dooty, mates. I give my vote: death.\"", "Then a cry from the lookout: \"Land ho!\" Feet rush to the bow. You slip out of the barrel unseen, and run aft."] }] },
{ t: "12. Council of War", cast: { smollett: { ship: 1, dz: -12 }, squire: { ship: 1, dz: -12, dx: 1.5 }, livesey: { ship: 1, dz: -12, dx: -1.5 } },
text: ["Silver is telling the captain what he knows of the island: \"I've been there, sir: watered there with a trader.\" Then you get the doctor alone. \"Doctor, let me speak. Get the captain and the squire down to the cabin. I have terrible news.\""],
steps: [{ k: "talk", who: "smollett", t: "Tell the captain, the Squire and the doctor everything", say: ["\"Mr Trelawney, you were right and I was wrong,\" said the captain. \"We must go on, because we can't turn back. If I gave the word to go about, they would rise at once.\"", "\"Jim here can help us more than anyone. The men are not shy with him, and Jim is a noticing lad.\""] },
{ k: "choose", q: "Counting the honest men: the Squire, the doctor, the captain, the Squire's three servants Hunter, Joyce and Redruth, and you. How many against about nineteen?", o: ["Seven", "Twelve", "Three"], why: "Seven (one of them a boy) against nineteen. \"Hawkins, I put prodigious faith in you,\" said the squire." }] },
{ t: "13. How My Shore Adventure Began", part: "Part Three: My Shore Adventure",
text: ["\"The appearance of the island when I came on deck next morning was altogether changed. Grey-coloured woods covered a large part of the surface … The hills ran up clear above the vegetation in spires of naked rock.\" The anchorage stinks of rotting leaves. The men are sullen, near mutiny. The captain lets them go ashore to cool off; you slip into one of the boats."],
steps: [{ k: "sail", at: { ti: "anchorage" }, t: "Sail into Captain Kidd's Anchorage, between the island and Skeleton Island" },
{ k: "go", at: { ti: "landing" }, t: "Go ashore at the landing beach (press E at the landing), and run off into the trees before anyone stops you" },
{ k: "go", at: { ti: "marsh", dz: -60 }, t: "Push through the thickets to the edge of the marsh" }] },
{ t: "14. The First Blow", cast: { silver: { ti: "marsh", dx: 30, dz: 20 }, morgan: { ti: "marsh", dx: 34, dz: 24 } },
text: ["Voices in the reeds. Silver and an honest sailor, Tom, are talking. Silver is trying to win him over. Tom refuses. From far off, a long horrid scream: another honest man has been killed."],
steps: [{ k: "hold", at: { ti: "marsh", dx: 10, dz: -14 }, r: 5, secs: 30, t: "Creep close under the live-oaks and stay hidden" },
{ k: "read", title: "The first blow", text: ["Tom turns his back to walk away. Silver hurls his crutch and strikes him between the shoulders; he falls, and Silver is on him with his knife.", "(Grown-ups: \"Silver, agile as a monkey, even without leg or crutch, was on the top of him next moment and had twice buried his knife up to the hilt in that defenceless body.\")"], adult: 1 },
{ k: "go", at: { ti: "woods", dx: -60, dz: -120 }, t: "Run! Get away through the woods, toward the hills" }] },
{ t: "15. The Man of the Island", cast: { ben: { ti: "woods", dx: -60, dz: -140 } },
text: ["Something leaps behind a pine, dark and shaggy. Not a bear, not a monkey: a man, in rags of old ship's canvas and goatskin. He throws himself on his knees."],
steps: [{ k: "talk", who: "ben", t: "Talk with the wild man", say: ["\"I'm poor Ben Gunn, I am; and I haven't spoke with a Christian these three years.\"", "\"Marooned three years agone, and lived on goats since then, and berries, and oysters. But, mate, my heart is sore for Christian diet. You mightn't happen to have a piece of cheese about you, now? Many's the long night I've dreamed of cheese, toasted, mostly.\"", "\"I'm rich. And now you tell your squire: Ben Gunn wants a passage home, and a thousand pounds of his own.\""] },
{ k: "choose", q: "How did marooned men like Ben Gunn really live?", o: ["On goats, turtles, shellfish, fruit and rainwater: Alexander Selkirk lived four years that way on Juan Fernández", "On ship's biscuit", "They always died in days"], why: "Selkirk tamed goats and cats, and read his Bible; he was taken off by Woodes Rogers in 1709, and his story inspired Robinson Crusoe." },
{ k: "read", title: "The cannon", text: ["A gun booms from the anchorage, and then the musketry. Far off above the trees, the Union Jack is flying."] }] },
{ t: "16. Narrative Continued by the Doctor: How the Ship Was Abandoned", part: "Part Four: The Stockade",
text: ["(Dr Livesey tells this part.) While you were ashore, the doctor and the hunter Hunter rowed to look at the island, and found the stockade on its knoll: \"a stout log-house fit to hold two-score people on a pinch, and loopholed for musketry on every side … and a spring of clear water\".", "They load the jolly-boat with powder, muskets, biscuits and pork, and abandon the Hispaniola."],
steps: [{ k: "go", at: { ti: "stockade", dz: 40 }, t: "Make for the flag: the stockade on its knoll" }] },
{ t: "17-18. The Jolly-boat's Last Trip, and the End of the First Day's Fighting",
text: ["The jolly-boat, overloaded, is fired on by the ship's long gun (Israel Hands, Flint's old gunner, aiming), and sinks in the shallows; they wade ashore with only half the stores. In the race to the stockade, the Squire's old servant Tom Redruth is shot dead.", "\"The captain … 'Is there anything I can do?' 'Tom, my man,' said the squire … He lived only a little while after.\""],
steps: [{ k: "choose", q: "Why did Captain Smollett hoist the Union Jack over the stockade, and nail it there?", o: ["To show they held it in the King's name: it said 'we are not pirates' to anyone who saw it", "For decoration", "To signal ships to come and fight"], why: "The flag was a statement of law. Under it, they were the King's subjects; the mutineers were pirates." }] },
{ t: "19. The Garrison in the Stockade", cast: { smollett: { ti: "stockade", dx: -2, dz: 2 }, livesey: { ti: "stockade", dx: 2, dz: 2 }, ben: { ti: "stockade", dx: -60, dz: 60 } },
text: ["Ben Gunn leaves you at the edge of the wood: \"When Ben Gunn is wanted, you know where to find him, Jim. Just wheer you found him today.\" You climb the palisade and are welcomed in."],
steps: [{ k: "go", at: { ti: "stockade", dz: 4 }, t: "Climb over the palisade and into the log-house" },
{ k: "talk", who: "smollett", t: "Report to the captain", say: ["\"Doctor,\" said the captain, \"I think there's a little too much smoke in this house. Wood, Hawkins.\" He keeps a log of the day, even here, and orders everyone to work: \"Idleness is the root of all evil.\""] },
{ k: "find", at: { ti: "stockade", dz: 34 }, n: 6, spread: 18, name: "firewood", items: ["a bundle of firewood", "a pine log", "a bundle of firewood", "dry brush", "a pine log", "a bundle of firewood"], t: "Gather firewood outside the palisade" },
{ k: "talk", who: "livesey", t: "Tell the doctor about Ben Gunn", say: ["\"Is he quite sane?\" \"I don't know, sir. He talked of cheese.\" The doctor takes out his snuffbox: \"That's Parmesan cheese, made in Italy, very nutritious. I keep it for Ben Gunn!\""] }] },
{ t: "20. Silver's Embassy", cast: { silver: { ti: "stockade", dz: 26 }, smollett: { ti: "stockade", dz: 18 } },
text: ["Next morning, a white flag. \"Cap'n Silver, sir, to come on board and make terms.\" He climbs the knoll on his crutch, and sits down on the sand outside the log-house."],
steps: [{ k: "talk", who: "silver", t: "Listen to Silver's terms", say: ["\"We want that treasure, and we'll have it. You give us the chart to get the treasure by, and drop shooting poor seamen, and we'll offer you a choice: come aboard along of us, once the treasure's shipped, and I'll give you my affy-davy to clap you somewhere safe ashore.\""] },
{ k: "choose", q: "What does Captain Smollett answer?", o: ["\"If you'll come up one by one, unarmed, I'll engage to clap you all in irons and take you home to a fair trial in England. Before an hour's out, I'll stove in your blockhouse.\"", "He gives him the map", "He agrees to share"], why: "Silver goes off swearing: \"Them that die'll be the lucky ones.\"" }] },
{ t: "21. The Attack", cast: { smollett: { ti: "stockade", dz: 2 } },
text: ["\"Toss for it,\" said the captain: loading muskets in the log-house. Then, all at once, a rush of pirates over the palisade on the north side, cutlasses glinting."],
steps: [{ k: "beat", title: "The Attack!", say: "Fire through the loopholes as they come over the palisade, then cutlass in hand out of the door. Press as each pirate tops the fence", n: 5, speed: 1.6, t: "Hold the log-house!" },
{ k: "read", title: "After", text: ["They are beaten off: five pirates dead. Of the garrison, Hunter is dying and Joyce is shot through the head; the captain is badly wounded.", "(Grown-ups: \"I … saw the pirate Job Anderson … swing his cutlass … and Hunter, stunned, lay senseless where he fell.\")"], adult: 1 }] },
{ t: "22. How My Sea Adventure Began", part: "Part Five: My Sea Adventure",
text: ["You can't sit still. The doctor has gone to find Ben Gunn. You fill your pockets with biscuit, take a brace of pistols, and slip out over the palisade: \"I was only a boy, and I had made my mind up.\" Ben Gunn said he had a boat."],
steps: [{ k: "go", at: { ti: "whiterock", dx: 4, dz: 3 }, t: "Find the White Rock on the shore, and what Ben Gunn hid under it" },
{ k: "read", title: "The coracle", text: ["\"a little tent of goat-skins … a small boat … of Ben Gunn's own make: a rude, lop-sided framework of tough wood, and stretched upon that a covering of goat-skin\" … a coracle, the kind of boat the ancient Britons made."] }] },
{ t: "23. The Ebb-tide Runs",
text: ["It is night. You launch the coracle and paddle out on the ebb-tide to where the Hispaniola rides at anchor, her cable as taut as a bowstring. The plan: cut her adrift."],
steps: [{ k: "beat", title: "Paddle the coracle", say: "\"She turned in every direction but the one I was bound to go.\" Paddle in time to keep her straight", n: 4, speed: 1.1, t: "Paddle out to the ship" },
{ k: "beat", title: "Cut the cable", say: "Cut the hawser strand by strand with your knife, each time the wind slackens it", n: 3, speed: 1.4, t: "Cut her adrift" },
{ k: "read", title: "Adrift", text: ["The Hispaniola swings and drifts. Through the stern window you see Israel Hands and another pirate fighting, drunk, in the cabin. The ship drifts out to sea, the coracle with her."] }] },
{ t: "24. The Cruise of the Coracle",
text: ["Dawn. You are off the south-west end of the island, by Haulbowline Head, where great slimy sea-lions bark on the rocks. The schooner drifts near, \"sailing by herself\", nobody at the helm."],
steps: [{ k: "choose", q: "Stevenson calls the animals on the rocks 'sea-lions'. On a Caribbean island, what would really have been there?", o: ["Caribbean monk seals, hunted to extinction by 1952", "Penguins", "Walruses"], why: "Columbus saw them in 1494; sailors killed them for oil. The last was seen in 1952." },
{ k: "act", fn: "board", t: "She drifts close: get alongside the Hispaniola and climb aboard" }] },
{ t: "25. I Strike the Jolly Roger", cast: { hands: { deck: 1, dz: -4 } },
text: ["You leap for the jib-boom and tumble onto the deck. One pirate lies dead. Israel Hands, propped against the bulwark, \"his face as white … as a tallow candle\", wounded."],
steps: [{ k: "talk", who: "hands", t: "Talk with Israel Hands", say: ["\"Brandy,\" he said. You fetch it. \"Come aboard, Mr Hands?\" you say. \"I've come to take possession of this ship, and you'll please regard me as your captain until further notice.\"", "\"I reckon, Cap'n Hawkins, you'll kind of want to get ashore now. Suppose we talks.\" He will show you how to sail her into the North Inlet."] },
{ k: "beat", title: "Strike the Jolly Roger", say: "Run to the colour halyards and haul the black flag down hand over hand", n: 4, speed: 1.3, t: "Haul down the Jolly Roger" },
{ k: "act", fn: "beach", t: "Sail her round to the North Inlet and beach her" }] },
{ t: "26. Israel Hands", cast: { hands: { deck: 1, dz: 6 } },
text: ["As the ship touches the sand you turn, and there is Israel Hands, already half-way to you, a dirk in his right hand. You spring into the mizzen shrouds."],
steps: [{ k: "beat", title: "Up the shrouds!", say: "Climb hand over hand into the mizzen shrouds before he reaches you", n: 4, speed: 1.9, t: "Climb!" },
{ k: "choose", q: "Up the mast, you reload your pistols before he can climb up. Why didn't the first pistols fire?", o: ["The priming powder was wet from the sea; a flintlock needs dry powder in the pan", "They had no flint", "They were too old"], why: "\"One more step, Mr. Hands,\" said I, \"and I'll blow your brains out!\"" },
{ k: "read", title: "\"One more step, Mr. Hands\"", text: ["His dirk comes whizzing through the air and pins your shoulder to the mast. Both your pistols go off.", "Israel Hands falls headlong into the water. (Grown-ups: \"He rose once to the surface in a lather of foam and blood and then sank again for good.\")"], adult: 1 }] },
{ t: "27. \"Pieces of Eight\"", cast: { silver: { ti: "stockade", dx: 2, dz: -4 } },
text: ["You unpin yourself (only a pinch of skin), wade ashore, and make your way back across the island in the moonlight, longing to tell the captain."],
steps: [{ k: "go", at: { ti: "stockade", dz: 6 }, t: "Get back to the stockade in the dark" },
{ k: "read", title: "\"Pieces of eight!\"", text: ["The log-house is dark. You step in, and a shrill voice screams in the black: \"Pieces of eight! Pieces of eight! Pieces of eight!\" Silver's parrot. A torch is lit: the pirates hold the stockade. You are a prisoner."] }] },
{ t: "28. In the Enemy's Camp", part: "Part Six: Captain Silver", cast: { silver: { ti: "stockade", dx: 2, dz: -4 }, merry: { ti: "stockade", dx: -3, dz: -2 }, morgan: { ti: "stockade", dx: -4, dz: 1 } },
text: ["Silver is lounging on a keg of brandy. \"So,\" said he, \"here's Jim Hawkins, shiver my timbers! Dropped in, like, eh?\" Your friends have given up the stockade and gone, he says."],
steps: [{ k: "talk", who: "silver", t: "Face Silver", say: ["You tell them everything: \"It was I who was in the apple barrel … it was I who cut her cable, and I that killed the men you had aboard of her. Kill me, if you please, or spare me.\"", "Morgan draws a knife. \"Avast there!\" cries Silver. \"Did any of you gentlemen want to have it out with me?\" Nobody moves. \"I like that boy.\""] },
{ k: "choose", q: "Why does Silver protect Jim now?", o: ["Because the game is lost and Jim is his way out: a hostage, and a witness at a trial", "He has always loved him", "He wants the map from him"], why: "\"I'll save your life, if so be as I can, from them. But see here, Jim: tit for tat, you save Long John from swinging.\"" }] },
{ t: "29. The Black Spot Again", cast: { silver: { ti: "stockade", dx: 2, dz: -4 }, merry: { ti: "stockade", dx: -3, dz: -2 } },
text: ["The pirates go out, hold a council, and come back with a black spot for Silver, cut, he points out, from a Bible: \"Ain't that unlucky!\""],
steps: [{ k: "talk", who: "merry", t: "George Merry hands Silver the spot", say: ["\"Deposed,\" it says on the back. Silver reads their charges: he made a hash of the cruise, let the enemy go, wouldn't let them attack. Then he throws something on the floor: Flint's map. The doctor gave it to him."] },
{ k: "choose", q: "Pirate crews really could depose their captain by vote. Which real captain was voted out by his own men?", o: ["Charles Vane, for refusing to fight a French warship, in 1718", "Blackbeard", "Henry Morgan"], why: "Vane's crew voted Calico Jack Rackham captain in his place and put Vane in a sloop." }] },
{ t: "30. On Parole", cast: { livesey: { ti: "stockade", dz: 26 } },
text: ["Morning: \"Block house, ahoy! Here's the doctor.\" Livesey comes every day to treat the sick pirates, as a doctor must, even these."],
steps: [{ k: "talk", who: "livesey", t: "Talk with the doctor across the palisade", say: ["\"Jump over, and run for it, Jim.\" \"No,\" you answer, \"I passed my word.\" \"Jim, it's the mischief.\" He leaves you, and says to Silver: \"Keep the boy close beside you, and when you need help, halloo. I'm off to seek it.\""] },
{ k: "choose", q: "The doctor treats the wounded pirates' malaria with quinine. Where does quinine come from?", o: ["The bark of the cinchona tree of the Andes ('Jesuits' bark')", "Sea water", "Coconuts"], why: "Its fever-curing power was learned from the peoples of Peru and Bolivia; Jesuits brought it to Europe in the 1600s." }] },
{ t: "31. The Treasure-hunt: Flint's Pointer", cast: { silver: { ti: "pointer", dx: 3, dz: 4 }, merry: { ti: "pointer", dx: -2, dz: 5 } },
text: ["The pirates set off with picks and shovels, Silver with a rope round your waist. Up the slopes of Spy-glass. Then a man cries out in terror."],
steps: [{ k: "go", at: { ti: "pointer", dz: 6 }, t: "Climb toward Spy-glass shoulder with the treasure-hunters" },
{ k: "read", title: "Flint's pointer", text: ["\"At the foot of a pretty big pine … a human skeleton lay … stretched straight, his feet pointing one way, his hands, raised above his head like a diver's, pointing directly in the opposite.\"", "\"This here is a p'inter,\" said Silver. \"Right up there is our line for the Pole Star and the jolly dollars.\""] },
{ k: "choose", q: "The skeleton points E.S.E. and by E., the bearing to Skeleton Island. What did Flint do with his six men?", o: ["Killed them, and laid one out as a signpost", "Paid them off", "Left them to guard it"], why: "\"He killed 'em, every man.\" Real pirates were said to do it so the treasure had a ghost to guard it: a story, never proved." }] },
{ t: "32. The Treasure-hunt: The Voice Among the Trees", cast: { silver: { ti: "plateau", dx: 2, dz: 20 } },
text: ["Resting on the plateau, the men speak of Flint, low. Then, from the trees, a thin, high, trembling voice strikes up: \"Fifteen men on the dead man's chest, Yo-ho-ho, and a bottle of rum!\""],
steps: [{ k: "go", at: { ti: "plateau", dz: 20 }, t: "Climb up onto the plateau" },
{ k: "hold", at: { ti: "plateau", dz: 20 }, r: 6, secs: 20, t: "Stand still and listen to the voice in the trees" },
{ k: "read", title: "\"Darby M'Graw!\"", text: ["\"Darby M'Graw! Darby M'Graw! Fetch aft the rum, Darby!\" Flint's own last words. The men are grey with fear. Only Silver keeps his head: \"That voice … it's like Ben Gunn's!\" And a ghost has no echo.", "(It is Ben Gunn, playing Flint's ghost.)"] }] },
{ t: "33. The Fall of a Chieftain", cast: { silver: { ti: "cache", dx: 5, dz: 4 }, merry: { ti: "cache", dx: -4, dz: 3 } },
text: ["The tall tree. They run. And there is the cache: a great hole, long dug, with the broken shaft of a pick and the boards of a packing case, branded 'Walrus', Flint's ship. Empty."],
steps: [{ k: "go", at: { ti: "cache", dz: 6 }, t: "Run with them to the tall tree and the cache" },
{ k: "read", title: "Empty", text: ["Silver passes you a double-barrelled pistol: he has changed sides again in a breath. George Merry leaps into the pit, finds a single two-guinea piece, and shakes it at them. \"That's your seven hundred thousand pounds, is it?\"", "The men are about to rush Silver, when muskets flash from the thicket: the doctor, Gray and Ben Gunn. Merry falls into the pit. (Grown-ups: Silver fires both barrels of his pistol into him.) The others run."], adult: 1 }] },
{ t: "34. And Last", cast: { ben: { ti: "cave", dx: -6, dz: 10 }, silver: { ti: "cave", dx: 6, dz: 10 }, smollett: { ti: "cave", dx: 0, dz: 12 } },
text: ["Ben Gunn had found the treasure long ago, dug it up, and carried it on his back, many tedious journeys, to his cave on the two-pointed hill. There it lies."],
steps: [{ k: "go", at: { ti: "cave", dz: 4 }, t: "Go to Ben Gunn's cave, in the two-pointed hill to the north-east" },
{ k: "find", at: { ti: "cave" }, n: 8, spread: 4, name: "treasure", items: ["English guineas", "French louis d'ors", "Spanish doubloons", "Portuguese moidores", "Venetian sequins", "pieces of eight", "gold bars", "strange Oriental pieces stamped with what looked like wisps of string"], t: "Carry the treasure out, coin by coin" },
{ k: "talk", who: "silver", t: "Last words with Silver", say: ["\"Come back to the cap'n, have you? Welcome, matey.\" He is all politeness now, and makes himself useful.", "On the way home, at a port in Spanish America, Silver slips away in a shore boat, with a sack of coin worth three or four hundred guineas. \"I think we were all pleased to be so cheaply quit of him.\""] },
{ k: "read", title: "The end", text: ["Gray saved his money and became master of a ship. Ben Gunn got his thousand pounds and spent it in nineteen days; he keeps a lodge, and sings in church on Sundays.", "\"Oxen and wain-ropes would not bring me back again to that accursed island; and the worst dreams that ever I have are when I hear the surf booming about its coasts or start upright in bed with the sharp voice of Captain Flint still ringing in my ears: 'Pieces of eight! Pieces of eight!'\""] }] }
];
var TIB = { beam: null, cast: {}, items: [], wait: 0, holdT: 0, ask: null };
function tiS() { var S = prwS(); if (!S.ti)
S.ti = { ch: 0, s: 0, started: 0, done: 0, beached: 0 }; return S.ti; }
function tiStep() { var T = tiS(), C = TI_BOOK[T.ch]; return C ? C.steps[T.s] : null; }
function tiOn() { var T = tiS(); return !!(T.started && !T.done && typeof WLD !== "undefined" && WLD.on === "sea"); }
function tiNext() { return __ZC(462, 120, this, arguments, new.target); }
function tiStepStart() { return __ZC(462, 121, this, arguments, new.target); }
function tiPosFar(at) { if (at.ti) {
var a = tiXZ(at.ti);
return { x: a.x + (at.dx || 0), z: a.z + (at.dz || 0), y: 0, name: a.name };
} if (at.port) {
var p = tiPortOf(at.port);
return p ? { x: p.dock.x, z: p.dock.z, y: 0, name: p.name } : null;
} return null; }
function tiTarget() { return __ZC(462, 122, this, arguments, new.target); }
function tiChapterCard() { return __ZC(462, 123, this, arguments, new.target); }
function tiReadCard(title, text, adult) {
var L = text.filter(function (t) { return adult && !prwAdult() ? !/^\(Grown-ups/.test(t) : true; });
worldCard(worldFacts(title, "", [], L) + worldBtn("go", "▶ On", ""), { go: function () { worldCard(null); tiNext(); } });
}
function tiChoose(st) { return __ZC(462, 124, this, arguments, new.target); }
function tiTalkCard(who) { return __ZC(462, 125, this, arguments, new.target); }
function tiCastDrop() { Object.keys(TIB.cast).forEach(function (k) { var c = TIB.cast[k]; if (c.g && c.g.parent)
c.g.parent.remove(c.g); if (c.tk) {
var i = SEA.talkers.indexOf(c.tk);
if (i >= 0)
SEA.talkers.splice(i, 1);
} }); TIB.cast = {}; }
function tiCastBuild() { return __ZC(462, 126, this, arguments, new.target); }
function tiItemsDrop() { TIB.items.forEach(function (I) { if (I.m && I.m.parent)
I.m.parent.remove(I.m); }); TIB.items = []; }
function tiItemsMake(st) { return __ZC(462, 127, this, arguments, new.target); }
function tiBeach() { return __ZC(462, 128, this, arguments, new.target); }
function tiDeckPt(d) { var D = TI.deck; if (!D)
return null; var c = Math.cos(D.rot), sn = Math.sin(D.rot), lx = d.dx || 0, lz = d.dz || 0; return { x: D.x + lx * c + lz * sn, z: D.z - lx * sn + lz * c, y: D.y, area: "ti" }; }
function tiOnDeckAt(x, z) { var D = TI.deck; if (!D || !TI.built)
return false; var dx = x - D.x, dz = z - D.z, c = Math.cos(D.rot), sn = Math.sin(D.rot), lx = dx * c - dz * sn, lz = dx * sn + dz * c; return Math.abs(lx) < D.hw && Math.abs(lz) < D.hd; }
function tiBoard() { return __ZC(462, 129, this, arguments, new.target); }
(function () {
var W = WORLDS.sea;
if (!W)
return;
var g0 = W.ground, b0 = W.block;
W.ground = function (x, z, feet) { try {
if (TI.onDeck && !SEA.aboard && tiOnDeckAt(x, z))
return TI.deck.y;
}
catch (e) { } return g0.apply(this, arguments); };
W.block = function (x, z, feet) { try {
if (TI.onDeck && !SEA.aboard) {
if (tiOnDeckAt(x, z))
return false;
if (prwS().ti && prwS().ti.beached) {
TI.onDeck = 0;
return false;
}
return true;
}
}
catch (e) { } return b0.apply(this, arguments); };
})();
PRW.tickers.push(function (dt) {
if (!tiOn()) {
if (TIB.beam && TIB.beam.parent)
TIB.beam.parent.remove(TIB.beam);
PRW.tiLine = "";
return;
}
var st = tiStep(), Tg = tiTarget(), L = worldLocal(), me = SEA.aboard ? { x: SEA.sx, z: SEA.sz } : { x: L.x, z: L.z };
if (st && st.k === "find" && TIB.itemsWait)
tiItemsMake(st);
var lost = Object.keys(TIB.cast).some(function (k) { var c = TIB.cast[k]; return !c.host || !c.host.parent; });
if (lost || (!Object.keys(TIB.cast).length && TI_BOOK[tiS().ch] && TI_BOOK[tiS().ch].cast && Object.keys(TI_BOOK[tiS().ch].cast).some(function (k) { return !TI_BOOK[tiS().ch].cast[k].ship; }))) {
TIB.cw = (TIB.cw || 0) + dt;
if (TIB.cw > 1) {
TIB.cw = 0;
tiCastBuild();
}
}
if (Tg) {
if (!TIB.beam) {
TIB.beam = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 160, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFE7A0, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }));
TIB.beam.userData.keep = 1;
}
if (!TIB.beam.parent && WORLDS.sea.g)
WORLDS.sea.g.add(TIB.beam);
TIB.beam.position.set(Tg.x, (Tg.y || 0) + 80, Tg.z);
TIB.beam.scale.set(Tg.sea ? 6 : 1, 1, Tg.sea ? 6 : 1);
}
else if (TIB.beam && TIB.beam.parent)
TIB.beam.parent.remove(TIB.beam);
var line = "📖 " + prwEsc(st ? st.t : "");
if (Tg) {
var d = Math.hypot(Tg.x - me.x, Tg.z - me.z), b = (Math.atan2(Tg.x - me.x, -(Tg.z - me.z)) * 180 / Math.PI + 360) % 360;
line += " · " + (d > 1000 ? (d / 1000).toFixed(1) + " km" : Math.round(d) + " m") + " " + SEA_POINTS[Math.round(b / 45) % 8];
}
PRW.tiLine = line;
if (!st)
return;
if (st.k === "sail" && SEA.aboard && Tg && Math.hypot(Tg.x - me.x, Tg.z - me.z) < (st.at.port ? 260 : 420)) {
tiNext();
return;
}
if (st.k === "go" && !SEA.aboard && Tg && Math.hypot(Tg.x - me.x, Tg.z - me.z) < 6) {
tiNext();
return;
}
if (st.k === "hold" && !SEA.aboard && Tg) {
if (Math.hypot(Tg.x - me.x, Tg.z - me.z) < (st.r || 5)) {
TIB.holdT += dt;
PRW.tiLine += " · " + Math.max(0, Math.ceil(st.secs - TIB.holdT)) + " s";
if (TIB.holdT >= st.secs) {
tiNext();
return;
}
}
else if (TIB.holdT > 0) {
TIB.holdT = 0;
setStatus("You moved! Back to your hiding place.");
}
}
if (st.k === "find" && !SEA.aboard) {
var left = 0;
TIB.items.forEach(function (I) { if (I.got)
return; if (Math.hypot(I.x - me.x, I.z - me.z) < 2.6) {
I.got = 1;
if (I.m.parent)
I.m.parent.remove(I.m);
setStatus("✨ " + prwEsc(I.name));
if (typeof playTone === "function")
playTone(880, 0.12);
}
else
left++; });
if (TIB.items.length && !left) {
tiItemsDrop();
tiNext();
return;
}
if (TIB.items.length)
PRW.tiLine += " · " + (TIB.items.length - left) + " of " + TIB.items.length;
}
});
(function () {
if (typeof worldBanner !== "function")
return;
var wb = worldBanner;
worldBanner = function (html) { try {
if (html && PRW.tiLine && typeof WLD !== "undefined" && WLD.on === "sea")
html += "<div style='color:#FFE7B0'>" + PRW.tiLine + "</div>";
}
catch (e) { } return wb.call(this, html); };
})();
function tiStart(fresh) { return __ZC(462, 130, this, arguments, new.target); }
function tiFinish() { return __ZC(462, 131, this, arguments, new.target); }
function tiMenuCard() { return __ZC(462, 132, this, arguments, new.target); }
(function () { var m0 = prwMenu; prwMenu = function () { m0.apply(this, arguments); var c = WLD.card; if (!c)
return; var d = document.createElement("div"); d.innerHTML = worldBtn("prwti", "📖 Treasure Island", "Stevenson's whole book, played: Billy Bones, Silver and Captain Flint, Ben Gunn, the stockade, the treasure"); var b = d.firstChild; b.onclick = function () { tiMenuCard(); }; c.appendChild(b); }; })();
(function () {
try {
var T = typeof CT_BY_ID !== "undefined" && CT_BY_ID.treasureisland;
if (T) {
var L = typeof CT_BY_HOST !== "undefined" && CT_BY_HOST[T.host];
if (L) {
var i = L.indexOf(T);
if (i >= 0)
L.splice(i, 1);
}
T.host = "world:sea";
T.where = "The Endless Sea: Menu › 🏴‍☠️ The Sweet Trade › 📖 Treasure Island";
}
}
catch (e) { }
if (typeof ctsEnter === "function") {
var e0 = ctsEnter;
ctsEnter = function (id) { if (id === "treasureisland") {
worldCard(null);
tiStart(false);
return;
} return e0.apply(this, arguments); };
}
if (typeof ctStart === "function") {
var s0 = ctStart;
ctStart = function (id) { if (id === "treasureisland") {
worldCard(null);
tiStart(false);
return;
} return s0.apply(this, arguments); };
}
})();
PRW_BOX.x0 = -53000;
PRW_BOX.z0 = -23000;
PRW_BOX.z1 = 17000;
Object.assign(PRW_STY, {
stone: { walls: [0x8A8A84, 0x7A7A72, 0x9A968C, 0x6E6C66], trim: 0xC8C4B8, roof: [0x3A3E44, 0x4A4E54, 0x2E3236], shut: [0x2A3A2A, 0x3A2A1A], kind: "steep", porch: 0.05, chim: 0x6A6A64 },
moor: { walls: [0xF4F2EC, 0xF0ECE0, 0xE8E2D2, 0xDCE8F0], trim: 0x2A6A9A, roof: [0xF0ECE0], shut: [0x2A6A9A, 0x3A7A5A, 0x6A3A2A], kind: "flat", porch: 0.1, chim: null },
chi: { walls: [0xC8B898, 0xB8A888, 0xD8C8A8, 0x9A3A2A], trim: 0x8A2A1E, roof: [0x3A4A44, 0x2E3A36, 0x5A4A3A], shut: [0x8A2A1E, 0x2A2A2A], kind: "eave", porch: 0.3, chim: null }
});
(function () {
var r0 = prwRoof;
prwRoof = function (g, w, d, h, col, kind, y) {
if (kind === "flat") {
var m = prwBox(w + 0.2, 0.25, d + 0.2, col, 0, y + 0.12, 0, g);
[[0, d / 2], [0, -d / 2]].forEach(function (q) { prwBox(w + 0.2, 0.7, 0.2, col, 0, y + 0.45, q[1], g); });
[[w / 2], [-w / 2]].forEach(function (q) { prwBox(0.2, 0.7, d + 0.2, col, q[0], y + 0.45, 0, g); });
return m;
}
if (kind === "eave") {
var r = r0(g, w, d, h * 0.9, col, "hip", y + 0.3);
var br = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.12, 0.35, 4, 1), prwMat(col));
br.scale.set(w * 0.82, 1, d * 0.82);
br.rotation.y = Math.PI / 4;
br.position.y = y + 0.25;
g.add(br);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { var t = prwCone(0.18, 0.8, col, c[0] * (w / 2 + 0.7), y + 0.55, c[1] * (d / 2 + 0.7), g, 5); t.rotation.z = -c[0] * 0.9; });
return r;
}
return r0.apply(this, arguments);
};
})();
function prwFarLL(x, z) { return { lon: PRW_O.lon + (x - PRW_O.x) / PRW_O.k, lat: PRW_O.lat - z / PRW_O.k }; }
[
{ k: "clare", x: -47000, z: -20500, name: "Clare Island, Ireland", r: 420, h: 40, col: 0x4A7A3A, rock: 0x7A7A70, face: 180, style: "stone", year: "1593", far: 1,
b: [["fort", "Granuaile's castle"], ["tavern", "A shebeen"], ["house", "Fishermen's houses"], ["church", "The abbey"], ["market", "The strand"]],
card: "Grace O'Malley's island", about: ["A green, high island at the mouth of Clew Bay, on the Atlantic coast of Ireland. Its square stone tower house belonged to the O'Malleys, a family of sea-lords who for generations took a toll from every ship fishing or trading off their coast.", "Gráinne Ní Mháille (Grace O'Malley, Granuaile) commanded their galleys for fifty years in the 1500s: trading, raiding, and fighting the English governors."] },
{ k: "brittany", x: -40500, z: -15500, name: "Hennebont, Brittany", r: 420, h: 24, col: 0x5A7A4A, rock: 0x8A8678, face: 200, style: "stone", year: "1345", far: 1,
b: [["fort", "The castle of Hennebont"], ["tavern", "A sailors' tavern"], ["church", "Notre-Dame"], ["chandler", "A ropewalk"], ["market", "The market square"]],
card: "Where the Lioness of Brittany came ashore", about: ["A walled town on the river Blavet, on the south coast of Brittany. In the 1340s, in the war between England and France, Brittany was fought over by both.", "Jeanne de Clisson's Black Fleet raided French ships in the Channel from here and from England, and she died here in 1359."] },
{ k: "falmouth", x: -43500, z: -18200, name: "Falmouth, Cornwall", r: 440, h: 26, col: 0x5A7A4A, rock: 0x8A8070, face: 160, style: "eng", year: "1582", far: 1,
b: [["house", "Arwenack House, the Killigrews' manor"], ["tavern", "The Ship"], ["fort", "Pendennis Castle"], ["church", ""], ["stocks", ""], ["chandler", "A ship's chandler"]],
card: "The Killigrews' harbour", about: ["A deep, sheltered harbour at the mouth of the river Fal in Cornwall, guarded by Henry VIII's castles of Pendennis and St Mawes.", "The Killigrews of Arwenack were the great family here: governors of Pendennis Castle, vice-admirals of Cornwall, and quietly, for two generations, receivers of pirates' plunder."] },
{ k: "tetouan", x: -41000, z: -6500, name: "Tétouan, Morocco", r: 460, h: 30, col: 0x8A8A5A, rock: 0xC8B898, face: 250, style: "moor", year: "1530", far: 1,
b: [["fort", "The kasbah"], ["market", "The souk"], ["house", "The governor's palace"], ["tavern", "A coffee house"], ["court", "The judge's court"]],
card: "Sayyida al Hurra's city", about: ["A white city in the hills behind the Mediterranean coast of Morocco, rebuilt from ruins about 1490 by Muslim and Jewish refugees driven out of Granada by the Spanish.", "From here, in the early 1500s, its governor, a woman, sent corsair ships against Spain and Portugal, allied with the Ottoman admiral Barbarossa in Algiers."] },
{ k: "algiers", x: -44500, z: -9500, name: "Algiers", r: 500, h: 36, col: 0x8A8A5A, rock: 0xD8C8A8, face: 210, style: "moor", year: "1530", far: 1,
b: [["fort", "The Peñón and the mole"], ["market", "The slave market"], ["house", "The palace of the dey"], ["gaol", "The bagnio (the prison of the captives)"], ["tavern", "A tavern of the captives"]],
card: "The corsairs' city of the Barbary Coast", about: ["The greatest of the Barbary corsair ports for three hundred years. Its galleys and later its sailing ships raided the coasts of Spain, Italy, France, England, Ireland and even Iceland, and took Christian captives to be ransomed or sold.", "Between about 1530 and 1780 over a million Europeans may have been taken as slaves by the Barbary corsairs; at the same time Christian powers' galleys enslaved Muslims. Both sides lived by it."] },
{ k: "capecoast", x: -41500, z: 5500, name: "Cape Coast Castle, the Gold Coast", r: 440, h: 20, col: 0x6A8A3A, rock: 0xC8B898, face: 180, style: "camp", year: "1722", far: 1,
b: [["fort", "Cape Coast Castle"], ["court", "The trial hall"], ["gallows", "The gallows outside the walls"], ["market", "The town"], ["church", "The castle chapel"]],
card: "Where Black Bart's men were hanged", about: ["A great white fort on the coast of what is now Ghana, headquarters of the Royal African Company. In its dungeons under the courtyard, enslaved Africans were held for weeks before being shipped across the Atlantic, through the 'door of no return'. That is the main history of this place, and must be told first.", "In 1722 HMS Swallow brought here 264 men of Bartholomew Roberts' crew, taken after Roberts was killed off Cape Lopez. In the biggest pirate trial ever held, 52 were hanged here, and others sent to work in the mines or the Company's service."] },
{ k: "saintemarie", x: -48500, z: 13500, name: "Île Sainte-Marie, Madagascar", r: 420, h: 18, col: 0x4A8A3A, rock: 0xD8C8A0, face: 270, style: "camp", year: "1698", far: 1,
b: [["tavern", "Adam Baldridge's trading post"], ["camp", "The pirates' cemetery"], ["market", "The beach market"], ["fort", "Baldridge's stockade"]],
card: "The pirates' island of the Indian Ocean", about: ["A long, narrow island off the east coast of Madagascar, with a sheltered bay. From 1691 the trader Adam Baldridge ran a fortified post here, buying the plunder of the 'Red Sea men' (pirates who robbed Indian and Arab ships on the pilgrim route) and selling them rum, powder and supplies from New York.", "Thomas Tew, Henry Every's men, William Kidd and many others came here. The story of 'Libertalia', a pirates' free republic on Madagascar, was told in Johnson's book in 1728; most historians think it was invented."] },
{ k: "canton", x: -50500, z: -2500, name: "The mouth of the Pearl River, Canton", r: 520, h: 22, col: 0x5A8A4A, rock: 0xA89880, face: 180, style: "chi", year: "1809", far: 1,
b: [["fort", "The Bogue forts"], ["market", "The waterfront market"], ["house", "A merchant's house"], ["tavern", "A tea house"], ["court", "The magistrate's yamen"]],
card: "Where the Red Flag Fleet ruled the sea", about: ["The great river mouth below Canton (Guangzhou), the only Chinese port open to European traders in the 1700s and early 1800s: tea, silk and porcelain out, silver in.", "Among its thousand islands and channels, between 1801 and 1810, the largest pirate confederation in history ruled the coast: the Red Flag Fleet, commanded at its height by a woman."] }
].forEach(function (d) { var ll = prwFarLL(d.x, d.z); d.lon = ll.lon; d.lat = ll.lat; PRW_PORTS.push(d); PRW_BY[d.k] = d; });
PRW_PORTS.push({ k: "boston", name: "Boston, Massachusetts", lon: -71.06, lat: 42.36, r: 520, h: 24, col: 0x5A7A3A, rock: 0x9A8A78, face: 110, style: "eng", year: "1789",
b: [["tavern", "The Bunch of Grapes"], ["court", "The courthouse"], ["gaol", "The Boston gaol"], ["gallows", "The gallows on Boston Neck"], ["church", "Old North Church"], ["chandler", "A ship's chandler on Long Wharf"], ["market", "Faneuil Hall market"]],
card: "Where the last woman hanged in Massachusetts went to the gallows", about: ["Boston, the biggest town of New England, a seafaring town of wharves, ropewalks and shipyards.", "In 1704 John Quelch and five of his crew were hanged here for piracy, the first pirates tried under the new Admiralty law outside England. In 1718 survivors of Bellamy's Whydah were tried here; in 1726 William Fly was hanged and his body gibbeted on Nix's Mate island in the harbour."] });
PRW_BY.boston = PRW_PORTS[PRW_PORTS.length - 1];
Object.assign(PRW_WEAR, {
grace: { cut: "lady", coat: 0x2A3A2A, hat: "hood", hc: 0x3A2A1E, held: null, cloak: 1 },
jeanne: { cut: "lady", coat: 0x141414, hat: "coif", hc: 0xF0ECE0, held: "cutlass" },
killigrew: { cut: "lady", coat: 0x5A1E2A, hat: null, ruff: 1, held: "posy" },
sayyida: { cut: "lady", coat: 0xE8E0CC, hat: "headwrap", hc: 0xF4F0E8, held: null },
zheng: { cut: "lady", coat: 0x8A1E1A, hat: "headwrap", hc: 0x141414, held: "cutlass" },
rachel: { cut: "lady", coat: 0x4A4A5A, hat: "coif", hc: 0xF0ECE0, apron: 1 },
anne: { cut: "womanpirate", coat: 0x3A2A1A, vest: 0xE8E0CC, trou: 0x3A3A40, sash: 0x2A4A8A, hat: "tricorn", hc: 0x1A1A1A, held: "pistols" },
jacquotte: { cut: "womanpirate", coat: 0x1A1A1A, vest: 0xE8E0CC, trou: 0x2A2A2A, sash: 0xA81E1E, hat: "tricorn", hc: 0x141414, held: "cutlass" },
charlotte: { cut: "womanpirate", coat: 0x1E2A4A, vest: 0xE8E0CC, trou: 0xE8E4D8, sash: 0x1A1A1A, hat: "tricorn", hc: 0x1A1A1A, held: "cutlass" },
corsair: { cut: "jacket", coat: 0x8A1E1A, trou: 0xE8E0CC, hat: "headwrap", hc: 0xF4F0E8, held: "cutlass", shoes: 1 },
barbarossa: { cut: "coat", coat: 0x6A1A1A, vest: 0xC8A040, trou: 0xE8E0CC, stock: 0xF4F0E8, sash: 0xC8A040, hat: "headwrap", hc: 0xF4F0E8, held: "cutlass" }
});
PRW_PIRATES.push({ k: "grace", name: "Gráinne Ní Mháille, Grace O'Malley", at: "clare", wear: "grace", sex: "f", ship: "her galleys, oared and sailed, 20 to 30 oars a side", years: "about 1560 to 1603",
life: "Born about 1530 to the chief of the O'Malleys. The story goes that as a girl she cut off her hair to be allowed to sail with her father, and got the name 'Gráinne Mhaol', bald Grace. She commanded her family's galleys for decades: fishing tolls, trade with Spain and Scotland, raiding rival clans and English ships. The English called her 'the nurse of all the rebellions in Connacht'. The story is told that she gave birth to a son at sea, and the next day, when Algerian corsairs attacked, came on deck with a musket.",
end: "In 1593, when the English governor Bingham seized her lands and her son, she sailed to London and met Queen Elizabeth I at Greenwich: two queens, speaking in Latin. Elizabeth freed her son. She died about 1603 at her castle of Rockfleet, the same year as Elizabeth, an old woman, still a sea-captain.",
persona: "You are Gráinne Ní Mháille, Grace O'Malley, Irish sea-queen of the 1500s, chieftain of the O'Malleys of Clew Bay: fierce, proud, shrewd, unafraid of any man or queen. You speak plainly, with an Irish turn of phrase, and you call the English governor Bingham a dog." }, { k: "jeanne", name: "Jeanne de Clisson, the Lioness of Brittany", at: "brittany", wear: "jeanne", sex: "f", ship: "three warships painted black with red sails: the Black Fleet", years: "1343 to 1356",
life: "A Breton noblewoman, mother of five. In 1343 King Philip VI of France had her husband Olivier de Clisson beheaded in Paris on a charge of treason, and his head sent to Nantes and stuck on a pole. She swore revenge. She sold her lands, bought three warships, had them painted black and given red sails, and with the help of the English king hunted French ships in the Channel for some thirteen years. The story says she killed every crew but one or two, left alive to carry the news to the French king.",
end: "She married an English knight, Sir Walter Bentley, about 1356, and lived on in the castle of Hennebont in Brittany, where she died in 1359. Her son Olivier became Constable of France, the king's own commander.",
persona: "You are Jeanne de Clisson, the Lioness of Brittany, a French noblewoman of the 1340s whose husband was beheaded by King Philip VI. You are cold, controlled, grieving, and utterly set on revenge against the French crown. You speak like a lady of the court." }, { k: "killigrew", name: "Lady Mary Killigrew", at: "falmouth", wear: "killigrew", sex: "f", ship: "her servants' boats, in Falmouth harbour", years: "1582",
life: "Wife of Sir John Killigrew of Arwenack, vice-admiral of Cornwall and governor of Pendennis Castle, a family who had quietly dealt with pirates for two generations. (An older Lady Killigrew, Elizabeth, his mother, was said to have done the same in the 1550s; the stories are often mixed together.) In January 1582 a Hanseatic ship, the Marie of San Sebastian, sheltered in Falmouth harbour. Men from Arwenack boarded her by night, killed or drove off her crew, and carried off her cargo of cloth and silver.",
end: "The owners complained to the Queen. Lady Killigrew and two of her servants were tried and sentenced to death. The servants were hanged. She was pardoned, probably through her family's influence at court.",
persona: "You are Lady Mary Killigrew of Arwenack House, Falmouth, in 1582: a well-born Elizabethan gentlewoman, gracious and sharp, who knows exactly what happens to the cargoes in your harbour and will never admit it." }, { k: "sayyida", name: "Sayyida al Hurra, governor of Tétouan", at: "tetouan", wear: "sayyida", sex: "f", ship: "the corsair ships of Tétouan", years: "about 1515 to 1542",
life: "Born about 1485 in Granada, in a noble Muslim family; as a child she fled the Spanish conquest of Granada (1492) to Morocco. She married the governor of Tétouan, and after his death about 1515 governed the city herself. Sayyida al Hurra means 'the free and independent lady', a title. Remembering Granada, she sent her corsairs against Spanish and Portuguese ships and coasts, in alliance with the Ottoman corsair Barbarossa of Algiers; the Spanish and Portuguese dealt with her as the real power on that coast.",
end: "In 1541 she married the Sultan of Morocco, Ahmad al-Wattasi, who came to Tétouan for the wedding: the only time a Moroccan ruler married away from his capital. In 1542 her son-in-law overthrew her and took the city. Nothing certain is known of the rest of her life.",
persona: "You are Sayyida al Hurra, governor of Tétouan in the 1530s, a Muslim noblewoman of Granada who never forgave the Spanish for taking your home. Educated, dignified, a ruler and a strategist. You speak with authority and courtesy, and coldly of Spain." }, { k: "zheng", name: "Zheng Yi Sao (Ching Shih)", at: "canton", wear: "zheng", sex: "f", ship: "the Red Flag Fleet: some 1,800 junks and about 70,000 pirates", years: "1801 to 1810",
life: "Born about 1775 in Canton, she married the pirate chief Zheng Yi in 1801, and helped him unite the rival pirate fleets of the South China coast into a confederation of six coloured fleets. When he died in 1807, she took command, with her adopted son Zhang Bao as her captain and later her husband. She enforced a strict written code: disobey an order, and lose your head; steal from the common stock, and die; harm a captive woman, and die. The Chinese navy, the Portuguese and the British all failed to defeat her.",
end: "In 1810 she negotiated the surrender of the whole fleet with the governor of Canton, walking into his office unarmed to do it. Almost all her people were pardoned; Zhang Bao was made an officer in the navy, and she kept her fortune. She ran a gambling house in Canton and died peacefully in 1844, aged about 69: the most successful pirate in history.",
persona: "You are Zheng Yi Sao, commander of the Red Flag Fleet on the South China Sea in 1809. Calm, commanding, a brilliant organiser and negotiator, merciless to those who break your code. You speak briefly and precisely, as one who is obeyed by tens of thousands." }, { k: "rachel", name: "Rachel Wall", at: "boston", wear: "rachel", sex: "f", ship: "a fishing schooner, off the Isles of Shoals", years: "1781 to 1782",
life: "Born Rachel Schmidt about 1760 in Pennsylvania; she ran away to Boston and married a fisherman and former privateer, George Wall. In 1781 and 1782, with a few friends, they took a schooner to the Isles of Shoals off New Hampshire. After a storm, Rachel would stand at the mast crying for help; when a passing boat came to rescue them, the crew were killed and the boat robbed and sunk. Twelve boats and twenty-four men, she later said.",
end: "George and the others drowned in a storm in 1782. Rachel went back to Boston as a servant. In 1789 she was arrested for trying to rob a young woman of her bonnet in the street, tried for robbery, and hanged on Boston Common on 8 October 1789, aged 29: the last woman hanged in Massachusetts. In her last statement she confessed to the piracies, but not the robbery.",
persona: "You are Rachel Wall of Boston in 1789: a young working woman who has done terrible things, and is now afraid. You speak plainly in the manner of 18th-century New England, and you never quite admit anything to a stranger." }, { k: "anne", name: "Anne Dieu-le-Veut", at: "tortuga", wear: "anne", sex: "f", ship: "Laurens de Graaf's ships", years: "about 1684 to 1700",
life: "A Frenchwoman sent to Tortuga in the 1660s, one of the women shipped out to the colony to marry its settlers. Her name means 'God wills it'. When the buccaneer Laurens de Graaf killed her husband in a duel, she challenged him to a duel in turn; he refused to fight a woman, admired her nerve, and married her. She sailed with him on his raids, and the buccaneers believed she brought luck.",
end: "In 1695 English and Spanish forces attacked their home on Saint-Domingue; she and her children were taken prisoner and held for years. They were reunited with de Graaf, and the family settled in French Louisiana, at Mobile, where she probably died about 1710.",
persona: "You are Anne Dieu-le-Veut, a French buccaneer's wife and fellow raider of Tortuga in the 1680s: fiery, proud, quick to fight, devoted to Laurens de Graaf. You speak French-flavoured English." }, { k: "jacquotte", name: "Jacquotte Delahaye (a legend)", at: "tortuga", wear: "jacquotte", sex: "f", ship: "her own buccaneers", years: "the 1650s, in the story",
life: "A LEGEND, told as one. The story says she was the daughter of a French father and a Haitian mother, and after her father was killed she turned buccaneer to support her brother; that she faked her own death to escape her pursuers and lived as a man, then came back with red hair flying, and was called 'Back from the Dead Red'; that she led a band of a hundred buccaneers who took over a little island republic. No record from her own time mentions her: the earliest stories are from the 1900s.",
end: "The legend says she died in a shoot-out defending her island, about 1663. Historians think she was invented, or put together from others.",
persona: "You are Jacquotte Delahaye, 'Back from the Dead Red', a legendary red-haired buccaneer of Tortuga. You are bold, mocking and dramatic, and you laugh when people say you aren't real." }, { k: "charlotte", name: "Charlotte de Berry (a legend)", at: "falmouth", wear: "charlotte", sex: "f", ship: "a captured slave ship, in the story", years: "the 1600s, in the story",
life: "A LEGEND. Her story was printed in a 'penny dreadful' (a cheap thrilling magazine) in 1836: an Englishwoman who disguised herself as a man to follow her husband into the Navy, and then, kidnapped and forced aboard a merchant ship, led a mutiny and became a pirate captain off the coast of Africa. There is no evidence she existed.",
end: "The story ends with her ship lost in a storm and Charlotte going down with it. It is a tale from 1836, not history.",
persona: "You are Charlotte de Berry, a pirate captain from a Victorian penny-dreadful story: theatrical, romantic, tragic, speaking like a heroine in a melodrama." }, { k: "barbarossa", name: "Hayreddin Barbarossa", at: "algiers", wear: "barbarossa", sex: "m", ship: "galleys of the Ottoman fleet", years: "1504 to 1545",
life: "Born Khizr on the Aegean island of Lesbos, son of a potter; with his elder brother Oruç he began as a corsair against the Knights of St John and the Spanish. Both were called Barbarossa, Red Beard, by the Christians. They took Algiers about 1516; after Oruç was killed in 1518, Hayreddin offered Algiers to the Ottoman sultan, and became the sultan's admiral. In 1538 at Preveza he defeated the combined fleet of Spain, Venice and the Pope.",
end: "He died peacefully in his palace in Constantinople in 1546, aged about 70, and was buried in a tomb on the Bosphorus; for centuries Ottoman ships fired a salute as they passed it.",
persona: "You are Hayreddin Barbarossa, admiral of the Ottoman sultan and lord of Algiers, in the 1530s: a former corsair, now a great commander, shrewd, proud, generous to friends and terrible to enemies. You speak with the authority of a man who has beaten the fleets of Spain." });
PRW_PIRATES.forEach(function (p) { PRW_PBY[p.k] = p; });
PRW_SAILS.push({ k: "grace", ship: "Grace O'Malley's galley", kind: "sloop", flag: "black", route: ["clare", "falmouth", "clare"], spd: 9, side: "pirate", guns: 4, sails: 0xB8A888, hull: 0x2A2A26 }, { k: "jeanne", ship: "My Revenge, of the Black Fleet", kind: "ship", flag: "black", route: ["brittany", "falmouth", "brittany"], spd: 9, side: "pirate", guns: 12, sails: 0x8A1A14, hull: 0x0E0E0E }, { k: "zheng", ship: "The Red Flag Fleet's flagship", kind: "galleon", flag: "red", route: ["canton", "saintemarie", "canton"], spd: 8, side: "pirate", guns: 30, sails: 0xA85A3A, hull: 0x5A3A1E }, { k: "barbarossa", ship: "The corsair galley", kind: "brig", flag: "red", route: ["algiers", "tetouan", "algiers"], spd: 10, side: "pirate", guns: 14, sails: 0xE8E0CC, hull: 0x6A2A1A }, { k: "_swallow", name: "HMS Swallow", ship: "HMS Swallow", kind: "ship", flag: "eng", route: ["capecoast", "saintemarie", "capecoast"], spd: 9, side: "navy", guns: 50 });
(function () { var t0 = prwTick; prwTick = function (dt) { if (SEA.aboard && SEA.auto && SEA.auto.prw && prwInBox(SEA.sx, SEA.sz)) {
var A = SEA.auto, d = Math.hypot(A.x - SEA.sx, A.z - SEA.sz);
if (d > 6000) {
var k = Math.min(d - 6000, 180 * dt);
SEA.sx += Math.sin(SEA.h) * k;
SEA.sz += Math.cos(SEA.h) * k;
}
} return t0.apply(this, arguments); }; })();
Object.assign(PRW_WEAR, {
moorman: { cut: "jacket", coat: 0xE8E2D2, trou: 0xD8D0C0, hat: "headwrap", hc: 0xF4F0E8, held: null, shoes: 1 },
moorwoman: { cut: "lady", coat: 0xF0ECE0, hat: "headwrap", hc: 0xF4F0E8 },
chiman: { cut: "jacket", coat: 0x2A3A5A, trou: 0x2A2A2A, hat: "cap", hc: 0x1A1A1A, held: null, shoes: 1 },
chiwoman: { cut: "lady", coat: 0x3A4A6A, hat: "headwrap", hc: 0x1A1A1A },
chipirate: { cut: "shirt", coat: 0x6A5A44, trou: 0x2A2A2A, sash: 0x8A1E1A, hat: "headwrap", hc: 0x8A1E1A, held: "cutlass" },
irishman: { cut: "jacket", coat: 0x5A5A44, trou: 0x6A6A54, hat: "cap", hc: 0x4A4A3A, held: null, shoes: 1 },
irishwoman: { cut: "lady", coat: 0x6A2A2A, hat: "hood", hc: 0x3A3A3A },
breton: { cut: "jacket", coat: 0x2A3A5A, trou: 0x3A3A3A, hat: "brim", hc: 0x1A1A1A, held: null, shoes: 1 }
});
Object.assign(PRW_FOLK, {
moor: [["moorman", 8], ["corsair", 5], ["moorwoman", 4, "f"], ["worker", 3], ["merchant", 2]],
chi: [["chiman", 8], ["chipirate", 6], ["chiwoman", 5, "f"], ["worker", 2], ["merchant", 1]],
stone: [["irishman", 6], ["sailor", 4], ["irishwoman", 5, "f"], ["breton", 2], ["man", 2], ["priest", 1]]
});
(function () {
var n0 = prwFolkName;
prwFolkName = function (role, f, R) {
var pick = function (a) { return a[Math.floor(R() * a.length)]; };
if (role === "moorman" || role === "corsair")
return pick(["Ahmed", "Muhammad", "Yusuf", "Ali", "Hassan", "Idris", "Mustafa", "Rais Murad"]) + (R() < 0.5 ? " ibn " + pick(["Abdallah", "Hamid", "Said", "Karim"]) : "");
if (role === "moorwoman")
return pick(["Fatima", "Aisha", "Zahra", "Khadija", "Meryem", "Nur"]);
if (role === "chiman" || role === "chipirate")
return pick(["Chan", "Leung", "Wong", "Cheung", "Lau", "Ho", "Kwok"]) + " " + pick(["Ah-fook", "Ming", "Kwan", "Ah-sing", "Chiu", "Wai"]);
if (role === "chiwoman")
return pick(["Chan", "Leung", "Wong", "Cheung"]) + " " + pick(["Mei", "Ah-ying", "Siu-lan", "Yuk"]);
if (role === "irishman")
return pick(["Brian", "Diarmuid", "Tadhg", "Eoghan", "Conall", "Murrough"]) + " " + pick(["O'Malley", "O'Flaherty", "Burke", "Joyce", "Conneely"]);
if (role === "irishwoman")
return pick(["Máire", "Sadhbh", "Nóra", "Úna", "Siobhán"]) + " " + pick(["Ní Mháille", "Ní Fhlaithbheartaigh", "de Búrca"]);
if (role === "breton")
return pick(["Yann", "Erwan", "Loïc", "Gwenaël", "Hervé"]) + " " + pick(["Le Goff", "Le Bihan", "Guégan", "Kerjean"]);
return n0.apply(this, arguments);
};
var p0 = prwFolkPersona;
prwFolkPersona = function (p, role, f) {
var s = p0.apply(this, arguments);
var who = { moorman: "a townsman of the Barbary coast, a Muslim, who remembers the refugees from Granada", corsair: "a corsair of the Barbary coast, a seaman of the raiding galleys (you may be a convert from Europe, as many were)", moorwoman: "a woman of the town",
chiman: "a boatman or trader of the Pearl River delta", chipirate: "a pirate of the Red Flag Fleet, who lives by its strict code", chiwoman: "a woman of the river, who lives on a boat with her family",
irishman: "a fisherman of the O'Malleys' country, who speaks Irish first", irishwoman: "a woman of the island, who speaks Irish first", breton: "a Breton fisherman, who speaks Breton first" }[role];
return who ? s.replace(/^You are [^,]+,/, "You are " + who + ",") : s;
};
var g0 = prwFolkGreet;
prwFolkGreet = function (role, p) { return { moorman: "As-salamu alaykum.", corsair: "A Christian ship? Or a Christian, alone?", moorwoman: "Peace be with you.", chiman: "Nei hou. You want tea?", chipirate: "Red Flag. Mind the code.", chiwoman: "Fresh fish, cheap!", irishman: "Dia dhuit. You're a long way from home.", irishwoman: "Dia dhuit.", breton: "Demat." }[role] || g0.apply(this, arguments); };
})();
PRW.rules = { open: true, level: 4, rate: 100, cap: 40, gallows: true, today: 0 };
function prwRulesLoad() {
if (typeof cityRpc !== "function")
return Promise.resolve(PRW.rules);
return cityRpc("prw_state", {}).then(function (o) { if (o && typeof o === "object" && o.level != null)
PRW.rules = o; return PRW.rules; }).catch(function () { return PRW.rules; });
}
setTimeout(prwRulesLoad, 9000);
PRW_LEVEL = function () { var k = store && store.prwKeep; if (k && k.level != null)
return k.level; return PRW.rules && PRW.rules.level != null ? PRW.rules.level : 4; };
function prwKeeperHere() { try {
return typeof amKeeper === "function" && amKeeper();
}
catch (e) {
return false;
} }
(function () { var c0 = prwChart; prwChart = function () { if (PRW.rules && PRW.rules.open === false && !prwKeeperHere()) {
worldCard(worldFacts("🏴‍☠️ The Sweet Trade", "", [], ["The Keeper has closed the pirates' waters for now. Fair winds: try again later."]));
return;
} return c0.apply(this, arguments); }; })();
(function () {
var p0 = prwPunished;
prwPunished = function (p, B, kind, r, adult) { if (kind === "gallows" && PRW.rules && PRW.rules.gallows === false)
adult = false; return p0.call(this, p, B, kind, r, adult); };
var g0 = prwGallowsWalk;
prwGallowsWalk = function (p, cap) {
if (PRW.rules && PRW.rules.gallows === false) {
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#000;opacity:1;transition:opacity 2.5s;z-index:9998;pointer-events:none";
document.body.appendChild(v);
setTimeout(function () { prwHanged(p, cap); v.style.opacity = "0"; setTimeout(function () { v.remove(); }, 2600); }, 1500);
return;
}
return g0.apply(this, arguments);
};
})();
function prwBankCard() { return __ZC(462, 133, this, arguments, new.target); }
function prwBank(n) { return __ZC(462, 134, this, arguments, new.target); }
(function () {
var m0 = prwMenu;
prwMenu = function () {
m0.apply(this, arguments);
var c = WLD.card;
if (!c)
return;
var d = document.createElement("div");
d.innerHTML = worldBtn("prwbank", "💰 Bank your plunder", "Pieces of eight for real gold, ashore in any of the pirates' ports");
var b = d.firstChild;
b.onclick = function () { prwRulesLoad().then(prwBankCard); };
c.appendChild(b);
if (prwKeeperHere()) {
var k = document.createElement("div");
k.innerHTML = worldBtn("prwkeep", "🔑 Keeper: the pirate world", "Danger level " + PRW_LEVEL() + " · " + (PRW.rules.open === false ? "closed" : "open") + ". Change it in Admin › In the game › The Pirate World");
c.appendChild(k.firstChild);
}
};
})();
setTimeout(function () {
try {
if (!/[?&]kpirates=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!prwKeeperHere())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
prwMenu();
try {
var q = new URLSearchParams(location.search);
q.delete("kpirates");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
(function () {
if (typeof WFD_LIST === "undefined" || WFD_LIST.some(function (D) { return D.k === "pirates"; }))
return;
WFD_LIST.push({ k: "pirates", n: "The Sweet Trade", s: "the pirates' Caribbean · danger 4 · Treasure Island", fr: 0x2A2018, lf: 0x0E0E0E, gl: 0xFFD890, sh: "arch", tex: "wood",
go: function () {
if (PRW.rules && PRW.rules.open === false && !prwKeeperHere()) {
setStatus("🏴‍☠️ <b>The Keeper has closed the pirates' waters for now.</b>");
return false;
}
if (typeof wfdGo === "function" && !wfdGo("sea"))
return false;
setTimeout(function () { try {
prwChart();
}
catch (e) { } }, 2800);
return true;
} });
})();
var PRW_COLD = { benbow: 1, bristol: 1, falmouth: 1, boston: 1, clare: 1, brittany: 1, gardiners: 1, capecod: 1 };
(function () {
var t0 = prwTown, p0 = prwPalm;
prwTown = function (p) { PRW.curPort = p; try {
return t0.apply(this, arguments);
}
finally {
PRW.curPort = null;
} };
prwPalm = function (g, x, y, z, R) { if (PRW.curPort && PRW_COLD[PRW.curPort.k] && typeof tiOak === "function") {
if (R() < 0.5)
tiOak(g, x, y, z, R);
else
tiPine(g, x, y, z, R, 0.9);
return;
} return p0.apply(this, arguments); };
})();
var PRW_PLAZA = {};
function prwPlazaMat(p) { return __ZC(462, 135, this, arguments, new.target); }
function prwSquareDress(p, g, sq, sy, R) { return __ZC(462, 136, this, arguments, new.target); }
var PRW_TX = {}, PRW_TM = {};
function prwTxN() { return PRW.lite ? 256 : 512; }
function prwCanvas(k, draw) { return __ZC(462, 137, this, arguments, new.target); }
function prwRgb(r, g, b, a) { return a == null ? "rgb(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + ")" : "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a + ")"; }
function prwNoise(x, R, n, dark, light, s) { for (var i = 0; i < n; i++) {
x.fillStyle = R() < 0.5 ? prwRgb(0, 0, 0, dark * R()) : prwRgb(255, 255, 255, light * R());
var z = (s || 2) * (0.5 + R());
x.fillRect(R() * 512, R() * 512, z, z);
} }
function prwBlot(x, R, n, col, r0, r1) { return __ZC(462, 138, this, arguments, new.target); }
var PRW_DRAW = {
plaster: function (x, R) { return __ZC(462, 139, this, arguments, new.target); },
clap: function (x, R) { return __ZC(462, 140, this, arguments, new.target); },
brick: function (x, R) { return __ZC(462, 141, this, arguments, new.target); },
ashlar: function (x, R) { return __ZC(462, 142, this, arguments, new.target); },
rubble: function (x, R) { return __ZC(462, 143, this, arguments, new.target); },
rtile: function (x, R) { return __ZC(462, 144, this, arguments, new.target); },
shingle: function (x, R) { return __ZC(462, 145, this, arguments, new.target); },
slate: function (x, R) { return __ZC(462, 146, this, arguments, new.target); },
thatch: function (x, R) { return __ZC(462, 147, this, arguments, new.target); },
plank: function (x, R) { return __ZC(462, 148, this, arguments, new.target); },
sail: function (x, R) { return __ZC(462, 149, this, arguments, new.target); },
awning: function (x, R) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#F0E8D8" : "#B03A2A";
x.fillRect(i * 64, 0, 64, 512);
} prwNoise(x, R, 5000, 0.12, 0.05, 1.4); prwBlot(x, R, 8, "rgba(90,70,40,0.2)", 30, 90); }
};
var PRW_TILE = { plaster: 3, clap: 2.6, brick: 2.2, ashlar: 3.2, rubble: 3, rtile: 2.4, shingle: 2.2, slate: 2.4, thatch: 3, plank: 2.4, sail: 4, awning: 2.4 };
function prwTex(kind) { return prwCanvas(kind, PRW_DRAW[kind]); }
function prwTexMat(col, kind, o) {
var k = kind + "|" + col + "|" + (o && o.ds ? 1 : 0);
var m = PRW_TM[k];
if (m)
return m;
m = new THREE.MeshLambertMaterial({ color: col, map: prwTex(kind), side: o && o.ds ? THREE.DoubleSide : THREE.FrontSide });
m.userData.ldShared = 1;
m.userData.ctn = 1;
PRW_TM[k] = m;
return m;
}
function prwLay(m, kind, col, o) { return __ZC(462, 150, this, arguments, new.target); }
var PRW_BRICK = { portroyal: 0.4, charlestown: 0.45, bristol: 0.6, benbow: 0.1, falmouth: 0.3, boston: 0.45, brittany: 0, clare: 0 };
function prwWallKind(p, S, R) { return __ZC(462, 151, this, arguments, new.target); }
function prwRoofKind(p, S, R) { return __ZC(462, 152, this, arguments, new.target); }
var PRW_WOOD = { 0x4A3420: 1, 0x3A2414: 1, 0x6A5A44: 1, 0x7A6A52: 1, 0x5A3A1E: 1, 0x6A4A2A: 1, 0x7A5A3A: 1, 0x4A3A28: 1, 0x2A1E14: 0, 0x5A4A34: 1, 0x3A2E22: 1, 0x7A5A36: 1, 0x6A4A2A: 1 };
function prwDressBuilding(p, q, S, R, r) { return __ZC(462, 153, this, arguments, new.target); }
(function () {
var p0 = prwPlace;
prwPlace = function (p, B, S, u, v, ry, fn, R, solid) {
var f2 = function (q, S2, R2) { var r = fn(q, S2, R2); try {
prwDressBuilding(p, q, S2, R2, r || {});
}
catch (e) {
if (window.console)
console.warn("[prw] dress", e);
} return r; };
return p0.call(this, p, B, S, u, v, ry, f2, R, solid);
};
})();
function prwStrip(p, g, a, b, w, mat) { return __ZC(462, 154, this, arguments, new.target); }
function prwLanes(p, B, R) { return __ZC(462, 155, this, arguments, new.target); }
(function () {
var w0 = prwWharf;
prwWharf = function (p, B, R) {
var n0 = B.stat.children.length;
var out = w0.apply(this, arguments);
try {
B.stat.children.slice(n0).forEach(function (m) {
if (!m.isMesh || !m.material || !m.material.color)
return;
var c = m.material.color.getHex();
if (c === 0x7A5A3A)
prwLay(m, "plank", 0xB89A70, { tile: 2.4 });
else if (c === 0x4A3A28)
prwLay(m, "plank", 0x6A5A44, { tile: 1.2 });
else if (c === 0x8A6A42)
prwLay(m, "plank", 0xB8946A, { tile: 0.9 });
else if (c === 0x6A4A2A)
prwLay(m, "plank", 0x9A7046, { tile: 0.9 });
});
prwLanes(p, B, R);
if (!PRW.lite)
prwWharfLife(p, B, R);
}
catch (e) {
if (window.console)
console.warn("[prw] wharf look", e);
}
return out;
};
})();
function prwWharfLife(p, B, R) { return __ZC(462, 156, this, arguments, new.target); }
var PRW_HULLTX = {};
function prwHullTex(hc, band) { return __ZC(462, 157, this, arguments, new.target); }
function prwHullGeo(L, B, H, kind) { return __ZC(462, 158, this, arguments, new.target); }
function prwSailGeo(w0, w1, h, belly) { return __ZC(462, 159, this, arguments, new.target); }
function prwShip(kind, o) { return __ZC(462, 160, this, arguments, new.target); }
PRW_DRAW.bark = function (x, R) { return __ZC(462, 161, this, arguments, new.target); };
PRW_DRAW.palmbark = function (x, R) { return __ZC(462, 162, this, arguments, new.target); };
PRW_DRAW.frond = function (x, R) { return __ZC(462, 163, this, arguments, new.target); };
PRW_DRAW.needles = function (x, R) { return __ZC(462, 164, this, arguments, new.target); };
PRW_DRAW.leafy = function (x, R) { return __ZC(462, 165, this, arguments, new.target); };
PRW_TILE.bark = 1.4;
PRW_TILE.palmbark = 1.2;
PRW_TILE.needles = 2.5;
PRW_TILE.leafy = 3;
var PRW_FROND = null;
function prwFrondMat() { if (PRW_FROND)
return PRW_FROND; var m = new THREE.MeshLambertMaterial({ map: prwTex("frond"), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.ldShared = 1; PRW_FROND = m; return m; }
function prwFrondGeo(len, wid, droop) { return __ZC(462, 166, this, arguments, new.target); }
prwPalm = function (g, x, y, z, R) { return __ZC(462, 167, this, arguments, new.target); };
tiPine = function (g, x, y, z, R, k) { return __ZC(462, 168, this, arguments, new.target); };
tiOak = function (g, x, y, z, R) { return __ZC(462, 169, this, arguments, new.target); };
(function () {
var lay = function (stat, n0) {
stat.children.slice(n0).forEach(function (m) {
if (!m.isMesh || !m.material || !m.material.color)
return;
var c = m.material.color.getHex();
if (c === 0x6A5034 || c === 0x4A3824)
prwLay(m, "bark", c === 0x6A5034 ? 0xE0D0C0 : 0xB8A898);
else if (c === 0x6A665C || c === 0x7A766A || c === 0x8A8478 || c === 0xE8E4DA)
prwLay(m, "rubble", c === 0xE8E4DA ? 0xFFFFFF : 0xC8C4B8, { tile: 4 });
});
};
var s0 = tiStockade, c0 = tiCave, w0 = tiWhiteRock, l0 = tiLookout;
tiStockade = function (g, stat) { var n = stat.children.length; var r = s0.apply(this, arguments); try {
lay(stat, n);
}
catch (e) { } return r; };
tiCave = function (g, stat) { var n = stat.children.length; var r = c0.apply(this, arguments); try {
lay(stat, n);
}
catch (e) { } return r; };
tiWhiteRock = function (stat) { var n = stat.children.length; var r = w0.apply(this, arguments); try {
lay(stat, n);
}
catch (e) { } return r; };
tiLookout = function (stat) { var n = stat.children.length; var r = l0.apply(this, arguments); try {
lay(stat, n);
}
catch (e) { } return r; };
})();
PRW_DRAW.ground = function (x, R) { return __ZC(462, 170, this, arguments, new.target); };
function prwGroundLook(gr, s) { return __ZC(462, 171, this, arguments, new.target); }
function prwWayfarerLook(s) { return __ZC(462, 172, this, arguments, new.target); }
PRW.tickers.push(function () { if (SEA.ship && !SEA.ship.userData.prwLook)
try {
prwWayfarerLook(SEA.ship);
}
catch (e) {
SEA.ship.userData.prwLook = 1;
if (window.console)
console.warn("[prw] wayfarer look", e);
} });
PRW.gscan = 0;
PRW.tickers.push(function (dt) {
PRW.gscan += dt || 0.5;
if (PRW.gscan < 2)
return;
PRW.gscan = 0;
var G = WORLDS.sea && WORLDS.sea.g;
if (!G)
return;
G.children.forEach(function (c) {
if (!c.isMesh || c.userData.prwGround || !c.geometry || c.geometry.type !== "PlaneGeometry" || !c.material || c.material.map || !c.material.vertexColors)
return;
c.userData.prwGround = 1;
var x = c.position.x, z = c.position.z, near = prwInBox(x, z) || (typeof TI !== "undefined" && Math.hypot(x - TI.x, z - TI.z) < 1500) || PRW.ports.some(function (p) { return Math.hypot(p.x - x, p.z - z) < p.r * 2 + 300; });
if (near && c.geometry.parameters && c.geometry.parameters.width) {
c.material = c.material.clone();
prwGroundLook(c, c.geometry.parameters.width);
}
});
});
var PRW_SEA = { on: false, set: 2, cur: 2, brace: "reach", anchor: false, heave: false, tack: null, wear: null, lost: 0, lostT: 0, heel: 0, wkeyT: 0, said: {}, logT: 0, gust: 0, cleared: false, struck: false, school: null };
PRW.wind = { from: 67, kn: 14, t: 0, veer: 0 };
function prwSeaS() { var S = prwS(); S.sea = S.sea || { learned: {}, tacks: 0, miles: 0, passed: 0 }; S.sea.learned = S.sea.learned || {}; return S.sea; }
function prwSeaOn() {
if (typeof WLD === "undefined" || WLD.on !== "sea" || !SEA.aboard)
return false;
if (store && store.prw && store.prw.easySail)
return false;
return prwInBox(SEA.sx, SEA.sz) || (typeof TI !== "undefined" && Math.hypot(SEA.sx - TI.x, SEA.sz - TI.z) < 5000);
}
function prwBear(h) { return ((Math.atan2(Math.sin(h), -Math.cos(h)) * 180 / Math.PI) + 360) % 360; }
function prwPoint(deg) { return SEA_POINTS[Math.round(((deg % 360) + 360) % 360 / 45) % 8]; }
var PRW_POINTS16 = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
function prwPoint16(deg) { return PRW_POINTS16[Math.round(((deg % 360) + 360) % 360 / 22.5) % 16]; }
function prwRig() { var S = prwS(), k = S.own ? S.own.kind : "ship"; return { sloop: { close: 42, name: "sloop" }, brig: { close: 58, name: "brigantine" }, ship: { close: 64, name: "ship" }, frigate: { close: 62, name: "frigate" } }[k] || { close: 64, name: "ship" }; }
function prwOff() { var b = prwBear(SEA.h), d = ((PRW.wind.from - b + 540) % 360) - 180; return { a: Math.abs(d), side: d > 0 ? "starboard" : "larboard", d: d }; }
function prwPointOfSail(a, close) { return a < close - 8 ? "in irons" : a < close + 12 ? "close-hauled" : a < 80 ? "on a close reach" : a < 105 ? "on a beam reach" : a < 150 ? "on a broad reach" : "running before the wind"; }
function prwBraceFor(a) { return a < 82 ? "sharp" : a < 142 ? "reach" : "square"; }
var PRW_SETS = ["bare poles", "reefed topsails", "topsails", "all plain sail", "studding sails, every stitch"];
function prwWindTick(dt) { return __ZC(462, 173, this, arguments, new.target); }
function prwSailsOf(s) { return __ZC(462, 174, this, arguments, new.target); }
function prwSailsShow(dt) { return __ZC(462, 175, this, arguments, new.target); }
var PRW_ORDERS = [
{ k: "make", say: "All hands! Make sail!", reply: "Aye aye! Lay aloft and loose the topsails! Sheet home! Hoist away!", keyHint: "W",
what: "Set more sail: from bare poles to topsails, to all plain sail, to studding sails on booms out past the yards.",
why: "Every sail was hoisted by hand. Topmen raced up the shrouds and out along the yards on the footropes, cast off the gaskets that held the furled sail, and on deck the watch hauled the sheets and halyards to the chant of a shanty.",
can: function () { return PRW_SEA.set < (PRW_SEA.lost ? 2 : 4) && !PRW_SEA.anchor; }, go: function () { PRW_SEA.set = Math.min(PRW_SEA.lost ? 2 : 4, PRW_SEA.set + 1); PRW_SEA.heave = false; return PRW_SETS[PRW_SEA.set]; } },
{ k: "shorten", say: "Shorten sail!", reply: "Aye! Clew up the courses! Hands aloft to furl!", keyHint: "S",
what: "Take in sail, one step at a time: studding sails, then the courses, then reef the topsails.",
why: "A good captain shortened sail before a squall hit, not after. Carrying too much in a blow could carry away a mast or lay her over on her beam ends.",
can: function () { return PRW_SEA.set > 0; }, go: function () { PRW_SEA.set = Math.max(0, PRW_SEA.set - 1); return PRW_SETS[PRW_SEA.set]; } },
{ k: "reef", say: "Reef topsails!", reply: "Aye! Lower away the topsail yards! Lay out and take in a reef!",
what: "Make the topsails smaller by tying in a band of the sail along the yard with the reef points.",
why: "Men lay out along the yard on the footropes, gathered the sail and tied the little reef points with a reef knot, often at night and in the rain. 'Taking in a reef' became a saying for being careful.",
can: function () { return PRW_SEA.set !== 1; }, go: function () { PRW_SEA.set = 1; return PRW_SETS[1]; } },
{ k: "furl", say: "Take in all sail! Furl everything!", reply: "Aye! All hands aloft! Furl and stow!",
what: "Bare poles: every sail taken in and lashed to its yard. She drifts with the wind.",
why: "Done before anchoring, and in the worst of a hurricane, when ships 'lay a-hull' or ran before it under bare poles.",
can: function () { return PRW_SEA.set > 0; }, go: function () { PRW_SEA.set = 0; return PRW_SETS[0]; } },
{ k: "sharp", say: "Brace up sharp!", reply: "Aye! Haul taut the lee braces! Brace up!",
what: "Swing the yards round as far as they go, to sail as close to the wind as she can (close-hauled).",
why: "The braces were the ropes at the ends of the yards. Square-riggers could not sail closer than about six points (67°) to the wind; that was why the trade-wind routes mattered so much.",
can: function () { return PRW_SEA.brace !== "sharp"; }, go: function () { PRW_SEA.brace = "sharp"; PRW_SEA.heave = false; return "yards braced sharp up"; } },
{ k: "reach", say: "Ease the braces! Trim for a reach!", reply: "Aye! Check the braces! Ease off the sheets!",
what: "Set the yards half round, for the wind on the beam or abaft it: a reach, her best and fastest point of sailing.",
why: "With the wind on the quarter every sail drew and none blanketed another. Pirates chose their moment to attack from to windward, with the wind behind them.",
can: function () { return PRW_SEA.brace !== "reach"; }, go: function () { PRW_SEA.brace = "reach"; PRW_SEA.heave = false; return "yards trimmed for a reach"; } },
{ k: "square", say: "Square away! Square the yards!", reply: "Aye! Square the yards! Steady!",
what: "Yards straight across the ship, for running before the wind.",
why: "Running dead before the wind looked fast, but the after sails blanketed the fore ones, and she could roll terribly. Seamen called it 'squaring away', which became a saying for getting ready.",
can: function () { return PRW_SEA.brace !== "square"; }, go: function () { PRW_SEA.brace = "square"; PRW_SEA.heave = false; return "yards squared"; } },
{ k: "about", say: "Ready about! … Helm's a-lee!", reply: "Ready about! Stations for stays! … Helm's a-lee! Fore sheet, fore tack, let go!",
what: "Tack: turn her bow through the wind, from one side to the other. Give it close-hauled with good way on her; then, as her head comes through the wind, 'Mainsail haul!', and when she has fallen off on the new tack, 'Let go and haul!'",
why: "Tacking was the hardest thing a square-rigger did. If she lost her way head to wind she 'missed stays' and hung there in irons, helpless, or fell back. A smart crew could tack a ship in a few minutes; a lubberly one never.",
can: function () { return !PRW_SEA.tack && !PRW_SEA.anchor; }, go: function () { var o = prwOff(); PRW_SEA.tack = { st: 1, t: 0, side: o.side, dir: o.d > 0 ? -1 : 1, s0: o.d > 0 ? 1 : -1, v0: SEA.v, wait: 0 }; PRW_SEA.heave = false; return "the helm is put down; her head comes up toward the wind"; } },
{ k: "haul", say: "Mainsail haul!", reply: "Mainsail haul! Swing the main yards!",
what: "In tacking, as her head passes through the wind, swing the main and mizzen yards round to the new side.",
why: "Timed right, the main yards swing almost by themselves as the wind catches them on the other side. Too soon or too late and she misses stays.",
can: function () { return !!PRW_SEA.tack && PRW_SEA.tack.st === 1; }, go: function () { var T = PRW_SEA.tack, o = prwOff(); T.haulAt = o.a; T.st = 2; return o.a < 22 ? "well timed: the main yards swing round as she comes through" : "a little " + (o.a >= 22 && T.t < 3 ? "early" : "late") + ", but the yards are round"; } },
{ k: "letgo", say: "Let go and haul!", reply: "Let go and haul! Fore yards round! Belay!",
what: "The last order of a tack: swing the fore yards round to the new side, and she gathers way on the new tack.",
why: "From the old sea-song: 'Let go and haul, my boys, let go and haul!' Get it right and she is away on her new course with hardly any way lost.",
can: function () { return !!PRW_SEA.tack && PRW_SEA.tack.st === 2; }, go: function () { var T = PRW_SEA.tack; T.st = 3; return "fore yards round"; } },
{ k: "wear", say: "Wear ship! Up helm!", reply: "Stations for wearing ship! Up helm! Square the after yards!",
what: "Turn her the long way round, away from the wind, stern through it, to come onto the other tack.",
why: "Slower than tacking and it lost ground to windward, but it never failed, so in heavy weather or with a short-handed crew, captains wore ship.",
can: function () { return !PRW_SEA.wear && !PRW_SEA.tack && !PRW_SEA.anchor; }, go: function () { var o = prwOff(); PRW_SEA.wear = { t: 0, dir: o.d > 0 ? 1 : -1, s0: o.d > 0 ? 1 : -1, from: prwBear(SEA.h) }; PRW_SEA.heave = false; return "the helm goes up; she bears away"; } },
{ k: "heave", say: "Heave to!", reply: "Aye! Back the main topsail! Helm a-lee and lash it!",
what: "Stop at sea: back one sail against the others, so they cancel out and she lies quietly, just drifting.",
why: "Ships hove to to speak another ship, to wait out a storm, to pick up a boat, or because a pirate fired a gun across their bows. A merchantman that hove to was saying 'I surrender.'",
can: function () { return !PRW_SEA.heave && !PRW_SEA.anchor; }, go: function () { PRW_SEA.heave = true; PRW_SEA.brace = "aback"; return "main topsail backed; she lies to"; } },
{ k: "anchor", say: "Let go the anchor!", reply: "Let go! … She's brought up, sir!",
what: "Drop the anchor where the water is shallow enough for it to reach the bottom (on soundings: within about 15 fathoms, near land).",
why: "The anchor was 'catted' up at the cathead; at the order the ring stopper was let go and the cable roared out through the hawse-hole. You need sail off her first, or it will part the cable.",
can: function () { return !PRW_SEA.anchor; }, go: function () { return __ZC(462, 176, this, arguments, new.target); } },
{ k: "weigh", say: "Man the capstan! Weigh anchor!", reply: "Ship the capstan bars! Heave round, heave and pawl!",
what: "Haul the anchor up with the capstan: men push the bars round and round, the cable comes in, and the anchor breaks out of the ground.",
why: "Heavy, slow work, done to a capstan shanty with a fiddler on the capstan head. When the anchor came free: 'Anchor's aweigh!'",
can: function () { return PRW_SEA.anchor; }, go: function () { return __ZC(462, 177, this, arguments, new.target); } },
{ k: "log", say: "Cast the log!", reply: "Turn! … Stop! … Seven knots and a half, sir!",
what: "Measure her speed: a weighted board on a line with knots tied in it every 47 feet 3 inches, let run out for 28 seconds by a sand glass.",
why: "However many knots ran out in the glass was her speed in 'knots', nautical miles an hour, which is why we still measure ships' speed in knots. Written in the log book every hour, with the course, to know where she was.",
can: function () { return true; }, go: function () { var kn = prwKnots(); PRW_SEA.logT = 8; prwSeaSeen("logged", 1); return "the log line runs out: " + kn.toFixed(1) + " knots, by the log"; } },
{ k: "masthead", say: "A hand to the masthead! Keep a sharp lookout!", reply: "Aye! … Masthead there! …",
what: "Send a man up to the topmast head, the highest place in the ship, to look for sails and land.",
why: "From 100 feet up a lookout could see a ship's topsails 15 miles off, long before anyone on deck. Pirates offered the best pistol in the ship to whoever first sighted a prize.",
can: function () { return true; }, go: function () { return __ZC(462, 178, this, arguments, new.target); } },
{ k: "action", say: "Beat to quarters! Clear for action!", reply: "Drum! Clear the decks! Cast loose the guns! Powder up!",
what: "Get ready to fight: bulkheads struck down, decks sanded so no one slips on blood, guns cast loose and loaded, matches lit, small arms served out, boarding nets rigged.",
why: "A well-drilled crew could clear for action in ten minutes. Pirates often won without a shot, by showing a crowded deck and their flag; but they cleared for action all the same.",
can: function () { return !PRW_SEA.cleared; }, go: function () { PRW_SEA.cleared = true; PRW_SEA.clearedT = 600; return "cleared for action; you will fire first"; } },
{ k: "colours", say: "Hoist the colours!", reply: "Colours! Run 'em up!",
what: "Fly your flag. Pirates often sailed under false colours, and ran up the black or red flag only at the last moment.",
why: "The black flag offered quarter if the prize surrendered at once; the red flag ('the bloody flag', from 'joli rouge', some say) promised none.",
can: function () { return !!PRW_SEA.struck; }, go: function () { PRW_SEA.struck = false; if (SEA.flag)
SEA.flag.visible = true; return "colours flying"; } },
{ k: "strike", say: "Strike the colours!", reply: "Down with the flag…",
what: "Haul your flag down: the sign of surrender, or of sailing quietly under no colours at all.",
why: "'Striking your colours' meant giving up. Ships in a fight sometimes nailed their colours to the mast so no one could strike them.",
can: function () { return !PRW_SEA.struck; }, go: function () { PRW_SEA.struck = true; if (SEA.flag)
SEA.flag.visible = false; return "no colours flying"; } }
];
var PRW_OBY = {};
PRW_ORDERS.forEach(function (o) { PRW_OBY[o.k] = o; });
function prwKnots() { return Math.abs(SEA.v) * 0.48; }
function prwSeaSay(t) { setStatus("🗣️ " + t); }
function prwSeaSeen(k, n) { var Q = prwSeaS(); Q[k] = (Q[k] || 0) + (n || 1); }
function prwSeaLearn(k) { var Q = prwSeaS(); if (!Q.learned[k]) {
Q.learned[k] = Date.now();
prwSave();
} }
function prwWhistle() { if (typeof playTone !== "function")
return; playTone(1320, 0.12); setTimeout(function () { playTone(1760, 0.18); }, 140); setTimeout(function () { playTone(1320, 0.22); }, 360); }
function prwOrder(k) { return __ZC(462, 179, this, arguments, new.target); }
(function () {
var t0 = seaTick;
seaTick = function (dt) {
var on = false;
try {
on = prwSeaOn() && !SEA.auto;
}
catch (e) { }
PRW_SEA.on = on;
if (!on)
return t0.apply(this, arguments);
try {
prwSeaStep(dt);
}
catch (e) {
if (window.console)
console.warn("[prw] seamanship", e);
}
var saved = {};
["KeyW", "KeyS", "KeyA", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].forEach(function (k) { saved[k] = keys[k]; keys[k] = false; });
var jv0 = window.joyInput, pv0 = window.padInput;
window.joyInput = function () { return null; };
window.padInput = function () { return null; };
var v = SEA.v;
try {
return t0.apply(this, arguments);
}
finally {
Object.keys(saved).forEach(function (k) { keys[k] = saved[k]; });
window.joyInput = jv0;
window.padInput = pv0;
if (!(SEA.v <= 0.5 && v > 0.6))
SEA.v = v;
try {
prwSeaAfter(dt);
}
catch (e) { }
}
};
})();
function prwSeaStep(dt) { return __ZC(462, 180, this, arguments, new.target); }
function prwSeaAfter(dt) { var T = PRW_SEA; if (SEA.ship) {
SEA.ship.rotation.z += T.heel;
} prwSailsShow(dt); prwSprayTick(dt); }
PRW.tickers.push(function (dt) { if (!PRW_SEA.on && SEA.ship && SEA.ship.userData.prwSails)
prwSailsShow(dt || 0.5); });
function prwSprayTick(dt) { return __ZC(462, 181, this, arguments, new.target); }
(function () {
if (typeof worldBanner !== "function")
return;
var wb = worldBanner;
worldBanner = function (html) {
try {
if (html && PRW_SEA.on && typeof WLD !== "undefined" && WLD.on === "sea") {
var o = prwOff(), rig = prwRig(), kn = prwKnots();
html = html.replace(/at the helm · \d+ knots/, "at the helm · " + kn.toFixed(1) + " knots");
var pos = prwPointOfSail(o.a, rig.close), want = prwBraceFor(o.a), bad = PRW_SEA.brace !== "aback" && PRW_SEA.brace !== want && !PRW_SEA.tack;
html += "<div style='color:#CFE6FF'>🌬️ Wind " + prwPoint16(PRW.wind.from) + " " + Math.round(PRW.wind.kn) + " knots" + (PRW_SEA.gust > 3 ? " · gusting" : "") + " · <b>" + pos + "</b> on the " + o.side + " tack · " + PRW_SETS[Math.round(PRW_SEA.cur)] + " · yards " + (PRW_SEA.brace === "aback" ? "aback (hove to)" : PRW_SEA.brace === "sharp" ? "braced sharp" : PRW_SEA.brace === "square" ? "square" : "trimmed for a reach") +
(bad ? " · <span style='color:#FFB0A0'>the sails are " + (want === "sharp" ? "shivering: brace up sharp" : want === "square" ? "blanketing: square away" : "badly trimmed: trim for a reach") + "</span>" : "") + (PRW_SEA.anchor ? " · ⚓ at anchor" : "") + (PRW_SEA.lost ? " · <span style='color:#FFB0A0'>topmast sprung</span>" : "") + (PRW_SEA.tack ? " · <b>tacking</b>: " + (PRW_SEA.tack.st === 1 ? "give <b>Mainsail haul!</b> as she comes head to wind" : "<b>Let go and haul!</b>") : "") + " · <b>O</b> orders</div>";
}
}
catch (e) { }
return wb.call(this, html);
};
})();
function prwRose() { return __ZC(462, 182, this, arguments, new.target); }
PRW.tickers.push(function () { try {
prwRose();
}
catch (e) { } });
function prwOrdersCard() { return __ZC(462, 183, this, arguments, new.target); }
(function () {
addEventListener("keydown", function (e) {
if (e.repeat || e.code !== "KeyO" || e.ctrlKey || e.metaKey || e.altKey)
return;
var tg = (e.target && e.target.tagName) || "";
if (/INPUT|TEXTAREA|SELECT/.test(tg))
return;
if (!PRW_SEA.on)
return;
e.preventDefault();
e.stopPropagation();
if (WLD.card && WLD.card.style.display === "block")
worldCard(null);
else
prwOrdersCard();
}, true);
})();
(function () {
var m0 = prwMenu;
prwMenu = function () {
m0.apply(this, arguments);
var c = WLD.card;
if (!c)
return;
var S = prwS(), d = document.createElement("div");
d.innerHTML = S.easySail ? worldBtn("prwreal", "⛵ Real sailing", "Back to the wind, the sails and the orders") : worldBtn("prwords", "⚓ Orders and the sailing master's school", "The words of command, what they do, and their history (O at the helm)");
var b = d.firstChild;
b.onclick = function () { if (S.easySail) {
S.easySail = 0;
prwSave();
worldCard(null);
setStatus("⛵ Real sailing: mind the wind. <b>O</b> for orders.");
}
else {
worldCard(null);
if (prwSeaOn())
prwOrdersCard();
else
prwSchool();
} };
c.insertBefore(b, c.children[2] || null);
};
})();
var PRW_LESSONS = [
{ k: "wind", t: "The wind and the points of sail", read: ["No ship sails into the wind. A square-rigger can lie no closer than about six points (67°) to it; a fore-and-aft sloop, four points (45°). Head to wind she is 'in irons' and stops dead.", "With the wind before the beam she is close-hauled or on a close reach; with it abeam, on a beam reach; abaft the beam, a broad reach (her fastest); dead astern, running.", "The rose at the top right shows it: the blue arrow is the wind, the red wedge is where she cannot sail. The pirates' Caribbean lies in the trade winds, blowing steadily from the east-north-east, so ships came in from the east and beat back to windward only with toil."],
task: "Sail on a broad reach (wind on the quarter) at 6 knots or more.", test: function () { var o = prwOff(); return o.a >= 105 && o.a < 150 && prwKnots() >= 6; } },
{ k: "sail", t: "Making and shortening sail", read: ["W makes sail, S shortens it, step by step: bare poles, reefed topsails, topsails, all plain sail, studding sails. The crew take a few seconds for each, racing aloft.", "More sail is more speed, but in a strong wind it strains the masts. Over about 24 knots of wind with all sail set, she may carry away a topmast. Reef before the blow comes."],
task: "Make all plain sail, then reef topsails.", orders: ["make", "reef"] },
{ k: "yards", t: "Bracing the yards", read: ["Square sails hang on yards that swing round on the masts with the braces. Brace up sharp when close-hauled; trim for a reach with the wind abeam or on the quarter; square away when running before it.", "Wrongly braced, the sails shiver or blanket each other and she slows: the banner tells you in red."],
task: "Brace the yards right for your point of sail (no red warning) at 5 knots or more.", test: function () { var o = prwOff(); return PRW_SEA.brace === prwBraceFor(o.a) && prwKnots() >= 5; } },
{ k: "tack", t: "Tacking: Ready about! Helm's a-lee!", read: ["To get to windward you zig-zag, tacking from one side of the wind to the other. Start close-hauled with good way on her.", "1. 'Ready about! Helm's a-lee!' The helm is put down and her head swings up into the wind; she slows.", "2. As her head comes through the wind: 'Mainsail haul!' The main yards swing round.", "3. As she falls off on the new side: 'Let go and haul!' The fore yards come round and she gathers way.", "Too slow, or with too little way on, she 'misses stays' and hangs in irons."],
task: "Tack the ship (O, then the three orders in turn).", ev: "tacked" },
{ k: "wear", t: "Wearing ship", read: ["The other way to change tack: turn away from the wind and bring her stern through it. Slower, and it gives away ground to leeward, but it never fails. 'Wear ship! Up helm!'"], task: "Wear ship.", ev: "wore" },
{ k: "stop", t: "Heaving to, anchoring and weighing", read: ["Heave to: back the main topsail against the wind so the sails cancel out and she lies still. A merchantman that hove to for a pirate was surrendering.", "Anchor only where the lead finds bottom, near land, and take the way off her first.", "Weigh: man the capstan, heave round to a shanty until the anchor breaks free. 'Anchor's aweigh!'"],
task: "Heave to, then anchor near land, then weigh anchor.", orders: ["heave", "anchor", "weigh"] },
{ k: "business", t: "The ship's business", read: ["Cast the log every hour: the knots that ran out in 28 seconds were her speed in knots, written in the log book with her course. That is 'dead reckoning'.", "Keep a hand at the masthead: from 100 feet up you see topsails 15 miles off.", "Beat to quarters and clear for action before a fight; hoist your colours, or strike them."],
task: "Cast the log and send a hand to the masthead.", orders: ["log", "masthead"] }
];
function prwSchool() { return __ZC(462, 184, this, arguments, new.target); }
function prwLesson(i) { return __ZC(462, 185, this, arguments, new.target); }
function prwSchoolCheck(ev) {
var C = PRW_SEA.school;
if (!C)
return;
var L = PRW_LESSONS[C.i];
if (!L)
return;
C.got[ev] = 1;
var ok = L.orders ? L.orders.every(function (k) { return C.got[k]; }) : L.ev ? !!C.got[L.ev] : false;
if (ok)
prwLessonDone(L);
}
PRW.tickers.push(function () { var C = PRW_SEA.school; if (!C || !PRW_SEA.on)
return; var L = PRW_LESSONS[C.i]; if (L && L.test && L.test()) {
C.held = (C.held || 0) + 0.5;
if (C.held >= 4)
prwLessonDone(L);
}
else if (C)
C.held = 0; });
function prwLessonDone(L) { return __ZC(462, 186, this, arguments, new.target); }
function prwSeaTest() { return __ZC(462, 187, this, arguments, new.target); }
var PRW_GOODS = {
coin: { n: "Pieces of eight", u: "coins", v: 1, coin: 1, icon: "🪙", s: "Spanish silver dollars, struck in Mexico and Peru: the world's money. Cut into eight bits for change." },
doubloon: { n: "Gold doubloons", u: "doubloons", v: 16, coin: 1, icon: "🟡", s: "Spanish 8-escudo gold pieces, worth sixteen pieces of eight each. Rare in a merchant's chest, common in the treasure fleet's." },
silverbar: { n: "Silver bars", u: "bars", v: 600, coin: 1, icon: "🥈", s: "Ingots from Potosí and Zacatecas, each stamped with its weight, fineness and the King's fifth paid. About 70 pounds apiece." },
golddust: { n: "Gold dust", u: "ounces", v: 17, coin: 1, icon: "✨", s: "From the Guinea coast of Africa, carried in little leather bags. Bellamy's Whydah carried pounds of it." },
emerald: { n: "Emeralds", u: "stones", v: 120, icon: "💚", s: "From the mines of Muzo in New Granada, shipped through Cartagena." },
pearl: { n: "Pearls", u: "strings", v: 90, icon: "⚪", s: "From the pearl fisheries of Margarita Island, dived for by enslaved divers." },
cochineal: { n: "Cochineal", u: "bales", v: 220, icon: "🟥", s: "A scarlet dye made from dried insects off Mexican cactus. Pound for pound worth more than silver; it dyed the redcoats' coats." },
indigo: { n: "Indigo", u: "casks", v: 80, icon: "🟦", s: "Blue dye from Guatemala and Carolina, pressed into cakes." },
cacao: { n: "Cacao", u: "sacks", v: 30, icon: "🟫", s: "Chocolate beans from Caracas and Maracaibo, for the chocolate houses of Europe." },
sugar: { n: "Sugar", u: "hogsheads", v: 25, icon: "🧂", s: "Muscovado from Jamaica and Barbados, grown and boiled by enslaved people. Heavy, cheap, and everywhere." },
rum: { n: "Rum", u: "casks", v: 18, icon: "🥃", s: "'Kill-devil' from the sugar islands. Most of it was drunk before it could be sold." },
madeira: { n: "Madeira wine", u: "pipes", v: 45, icon: "🍷", s: "Fortified wine that got better on a hot voyage. Roberts' men took whole cargoes." },
tobacco: { n: "Tobacco", u: "hogsheads", v: 35, icon: "🍂", s: "From Virginia and Maryland, pressed into great casks." },
hides: { n: "Hides", u: "bundles", v: 12, icon: "🟤", s: "Cattle hides from Hispaniola and Cuba: the buccaneers' first trade." },
logwood: { n: "Logwood", u: "tons", v: 20, icon: "🪵", s: "Dyewood cut by rough Englishmen in the Bay of Campeche. Many pirates had been logwood cutters." },
ivory: { n: "Elephants' teeth", u: "tusks", v: 60, icon: "🦷", s: "Ivory from the Guinea coast, carried in the same ships as gold dust." },
silk: { n: "Silks and calicoes", u: "bales", v: 70, icon: "🧵", s: "From India: the Quedagh Merchant and the Mughal's ships were full of them. Calico was so popular England banned it in 1700." },
medicine: { n: "A surgeon's chest", u: "chests", v: 150, icon: "⚕️", s: "Medicines were precious at sea. Blackbeard blockaded Charles Town for a whole week in 1718 for one chest of them." },
instruments: { n: "Navigating instruments", u: "sets", v: 110, icon: "🧭", s: "Quadrants, compasses, charts and a good watch. Pirates prized a prize's charts and her navigator above her cargo." },
plate: { n: "Church plate", u: "pieces", v: 140, icon: "🏺", s: "Silver chalices, candlesticks and crosses, taken from Spanish towns. Morgan's men stripped Portobelo's churches." },
watches: { n: "Watches and rings", u: "pieces", v: 40, icon: "⌚", s: "Taken off the passengers, often off their fingers." },
powder: { n: "Powder and shot", u: "barrels", v: 20, icon: "🛢️", s: "Always useful, never sold: the pirates kept it." },
cordage: { n: "Cordage and sailcloth", u: "coils", v: 15, icon: "🪢", s: "Pirates had no dockyards. They took their rigging and sails from their prizes." }
};
var PRW_CARGO = {
merchant: [["coin", 80, 400, 1], ["sugar", 6, 30, 0.6], ["rum", 4, 20, 0.6], ["madeira", 2, 12, 0.4], ["tobacco", 4, 20, 0.3], ["silk", 1, 6, 0.25], ["watches", 1, 8, 0.5], ["medicine", 1, 1, 0.2], ["instruments", 1, 1, 0.5], ["cordage", 4, 12, 0.8], ["powder", 2, 8, 0.6]],
fleet: [["coin", 3000, 9000, 1], ["doubloon", 40, 300, 0.8], ["silverbar", 3, 14, 1], ["cochineal", 4, 20, 0.8], ["indigo", 4, 16, 0.6], ["emerald", 3, 24, 0.4], ["pearl", 2, 12, 0.4], ["plate", 2, 10, 0.4], ["cacao", 10, 40, 0.5]],
spain: [["coin", 200, 900, 1], ["doubloon", 4, 30, 0.4], ["cacao", 10, 40, 0.8], ["hides", 10, 40, 0.7], ["indigo", 2, 8, 0.4], ["cochineal", 1, 4, 0.25], ["plate", 1, 3, 0.2]],
pirate: [["coin", 300, 1500, 1], ["doubloon", 10, 80, 0.6], ["golddust", 10, 80, 0.5], ["ivory", 4, 20, 0.3], ["watches", 4, 20, 0.7], ["silk", 2, 8, 0.4], ["madeira", 2, 8, 0.5], ["powder", 4, 12, 0.8]],
navy: [["powder", 6, 20, 1], ["instruments", 1, 2, 0.7], ["cordage", 6, 14, 1]]
};
var PRW_FENCE = { nassau: 0.8, tortuga: 0.85, barataria: 0.8, ocracoke: 0.6, gardiners: 0.55, capecod: 0.4, portroyal: 0.5, charlestown: 0.5, wreck1715: 0.7, tortugas: 0.7 };
function prwHold() { var S = prwS(); S.hold = S.hold || {}; return S.hold; }
function prwHaulFor(side, R) {
R = R || Math.random;
var L = PRW_CARGO[side] || PRW_CARGO.merchant, out = [];
L.forEach(function (c) { if (R() > c[3])
return; var n = Math.round(c[1] + (c[2] - c[1]) * R()); if (n > 0)
out.push({ k: c[0], n: n }); });
return out;
}
function prwHaulWorth(h) { return h.reduce(function (a, i) { return a + (PRW_GOODS[i.k] ? PRW_GOODS[i.k].v * i.n : 0); }, 0); }
function prwShares(me) { var crew = me.own ? (me.crew || []).length + 4 : 48, mine = me.own ? 2 : (me.rank >= 6 ? 2 : me.rank >= 5 ? 1.5 : me.rank >= 4 ? 1.25 : 1), total = crew + 3.5; return { mine: mine, total: total, crew: crew }; }
function prwPrize() { return __ZC(462, 188, this, arguments, new.target); }
function prwHoldShow() { return __ZC(462, 189, this, arguments, new.target); }
PRW.tickers.push(function () { var s = SEA.ship; if (s && !s.userData.prwHoldDone) {
s.userData.prwHoldDone = 1;
try {
prwHoldShow();
}
catch (e) { }
} });
function prwHoldCard() { return __ZC(462, 190, this, arguments, new.target); }
(function () {
var m0 = prwMenu;
prwMenu = function () {
m0.apply(this, arguments);
var c = WLD.card;
if (!c)
return;
var d = document.createElement("div");
var n = Object.keys(prwHold()).filter(function (k) { return prwHold()[k] > 0; }).length;
d.innerHTML = worldBtn("prwhold", "📦 Your hold and your plunder", n ? n + " kinds of goods aboard: sell them in a port that buys" : "Your share of every prize's goods");
var b = d.firstChild;
b.onclick = function () { worldCard(null); prwHoldCard(); };
c.insertBefore(b, c.children[2] || null);
};
})();
var PRW_HAUL = {
teach: "His greatest prize was La Concorde herself, a French slaver he made his flagship. He blockaded Charles Town for a week in May 1718, holding its leading men hostage, and asked as ransom only a chest of medicines. When he died, little treasure was found aboard: some sugar, cocoa, indigo and cotton. 'Only the devil and I know where it is.'",
bellamy: "In a year he took more than fifty ships, and in February 1717 the Whydah Gally herself, a London slave ship homeward bound with the gold, silver, ivory and goods from her sale: some four and a half tons of treasure. She sank off Cape Cod that April. Divers found her in 1984: the first pirate wreck ever identified, with her bell and thousands of coins.",
roberts: "The most successful of them all: over 400 ships in under three years. Off Bahia in 1719 he slipped into a Portuguese treasure fleet of 42 sail, picked out the richest and took her: 40,000 gold moidores and a diamond-studded cross meant for the King of Portugal, which he wore on a gold chain.",
hornigold: "Gentlemanly: he once took a ship only to take his victims' hats, because his crew had thrown theirs overboard in a drunken frolic. His men voted him out for refusing to attack English ships.",
rackham: "Small fry: fishing boats, a sloop or two, a schooner's cargo. His most famous prize was the sloop William, stolen out of Nassau harbour in 1719 with Anne Bonny and Mary Read aboard.",
vane: "Ruthless and greedy: he refused the King's pardon and fired a burning prize at Rogers' warships to escape Nassau in 1718. His men voted him out for refusing to fight a French man-of-war.",
jennings: "In January 1716 he raided the Spanish salvage camp on the coast of Florida, where divers were bringing up the sunken 1715 fleet's silver, and carried off some 87,000 pieces of eight. It started the Golden Age of piracy in Nassau.",
morgan: "Portobelo in 1668: 250,000 pieces of eight and the ransom of the town. Maracaibo in 1669. Panama in 1671, after crossing the isthmus through the jungle; the city burned, and the haul was less than his men hoped. They said he cheated them of their shares.",
olonnais: "Maracaibo and Gibraltar in 1666: 260,000 pieces of eight, plus jewels and church plate, shared out at Île-à-Vache and spent in Tortuga's taverns in weeks.",
low: "Over a hundred ships in two years, and the cruellest of them all, by every account. He once, Johnson says, made a captain eat his own ears.",
bonnet: "Next to nothing: he did not know how to find prizes, and Blackbeard took the Revenge from him.",
williams: "Bellamy's partner, a silversmith's son from Rhode Island. His share of the Whydah's plunder he took home in the Mary Anne's hold.",
kidd: "In January 1698 he took the Quedagh Merchant, an Armenian ship of 400 tons full of silks, calicoes, sugar, opium, gold and silver: the haul that hanged him, because she sailed under French passes and he said that made her fair game. Some of it he buried on Gardiners Island; the governor of New York dug it up: gold, silver, rubies and diamonds.",
every: "On 7 September 1695, in the Red Sea, the Fancy and her consorts took the Ganj-i-Sawai, the Grand Mughal's own treasure ship, homeward from Mecca: some £325,000 to £600,000 in gold, silver and jewels, the richest pirate haul in history. Every man's share came to £1,000, a lifetime's wages."
};
(function () {
var m0 = prwMeet;
prwMeet = function (q) {
m0.apply(this, arguments);
var t = PRW_HAUL[q.k];
var c = WLD.card;
if (!t || !c)
return;
var d = document.createElement("div");
d.style.cssText = "margin:8px 0 4px;padding:6px 8px;border-left:3px solid #C8A040;background:rgba(200,160,60,.12)";
d.innerHTML = "<b>💰 Their booty</b><br>" + prwEsc(t);
var at = c.querySelector("[data-w='talk']");
if (at)
c.insertBefore(d, at);
else
c.appendChild(d);
};
})();
if (typeof PRW_PIRATES !== "undefined" && !PRW_PIRATES.some(function (q) { return q.k === "kidd"; })) {
PRW_PIRATES.push({ k: "kidd", name: "Captain William Kidd", at: "gardiners", wear: "kidd", sex: "m", ship: "the Adventure Galley, 34 guns and oars", years: "1696 to 1699",
life: "A respectable Scottish sea captain of New York, with a wife, a fine house and a pew in Trinity Church, who in 1696 was sent out with a royal commission, backed secretly by lords of the government, to hunt pirates in the Indian Ocean. He found none worth taking, his crew grew mutinous, he killed his gunner William Moore with a bucket, and in 1698 he took the Quedagh Merchant. Coming home to clear his name, he buried part of his treasure here on Gardiners Island, with the owner's leave.",
end: "Arrested in Boston in 1699 and shipped to London in chains. His backers abandoned him; papers that might have saved him were 'lost'. He was hanged at Execution Dock in Wapping on 23 May 1701. The rope broke the first time. His body was tarred and hung in a cage over the Thames for three years.",
persona: "You are Captain William Kidd, in 1699. You are proud, touchy and aggrieved: you were a privateer with the King's commission, never a pirate, and great men will vouch for you. You speak like a Scots-born New York merchant captain. You do not say exactly where anything is buried." }, { k: "every", name: "Henry Every, Long Ben", at: "nassau", wear: "every", sex: "m", ship: "the Fancy, 46 guns", years: "1694 to 1696",
life: "First mate of the Charles II, a privateer hired by Spain, who in 1694 led her crew in mutiny at Corunna, renamed her the Fancy and sailed for the Indian Ocean. In 1695 he took the Grand Mughal's treasure ship Ganj-i-Sawai, the richest prize ever taken by pirates. In 1696 he sailed into Nassau, then a tiny town, and paid Governor Trott to let him in.",
end: "Nobody knows. His crew scattered; twenty-four were caught and six hanged. Every vanished, and was never caught. Songs and a play said he became a king in Madagascar; one story says he died poor in Devon, cheated of his jewels by Bristol merchants.",
persona: "You are Henry Every, called Long Ben, in 1696, just arrived at Nassau with the Fancy. You are tall, cool, clever and very rich, and you mean to vanish. You call yourself Captain Bridgeman. You speak like a West Country English seaman made gentleman." });
if (typeof PRW_PBY !== "undefined")
PRW_PIRATES.slice(-2).forEach(function (q) { PRW_PBY[q.k] = q; });
}
if (typeof PRW_WEAR !== "undefined") {
PRW_WEAR.kidd = PRW_WEAR.kidd || { cut: "coat", coat: 0x1E2A4A, vest: 0xC8A040, trou: 0x2A2A3A, stock: 0xF4F0E4, sash: 0x8A1414, hat: "tricorn", hc: 0x141414, held: "cutlass", wig: 1, lace: 1 };
PRW_WEAR.every = PRW_WEAR.every || { cut: "coat", coat: 0x3A1A4A, vest: 0xD8B040, trou: 0x2A2A3A, stock: 0xF4F0E4, sash: 0xD8B040, hat: "feather", hc: 0x1A1A1A, plume: 0xF0E8D8, held: "pistols", lace: 1 };
if (typeof PRW_KEYS !== "undefined") {
PRW_KEYS.kidd = "kidd";
PRW_KEYS.every = "every";
}
}
if (typeof PRW_SAILS !== "undefined" && !PRW_SAILS.some(function (S) { return S.k === "kidd"; })) {
PRW_SAILS.push({ k: "kidd", ship: "Adventure Galley", kind: "ship", flag: "eng", route: ["gardiners", "capecod", "ocracoke", "gardiners"], spd: 9, side: "pirate", guns: 34, hull: 0x2A2018 }, { k: "every", ship: "Fancy", kind: "ship", flag: "black", route: ["nassau", "tortugas", "havana", "nassau"], spd: 11, side: "pirate", guns: 46, hull: 0x1E1A14 });
}
var PRW_SHIPLOOK = {
teach: { name: "QUEEN ANNE'S REVENGE", hull: 0x1E1812, band: 0x5A1E14, figure: 0x2A2A2A, crowd: 12, booty: 3, note: "ex-French slaver La Concorde of Nantes, 200 tons, three masts" },
bellamy: { name: "WHYDAH", hull: 0x241C14, band: 0x2A3A2A, oars: 9, crowd: 10, booty: 5, note: "a galley-built ship: oar-ports along her lower side, for rowing in a calm" },
roberts: { name: "ROYAL FORTUNE", hull: 0x1A1612, band: 0x8A1E14, gilt: 1, figure: 0xC8A040, crowd: 12, booty: 4 },
rackham: { name: "WILLIAM", crowd: 5, booty: 0 },
bonnet: { name: "REVENGE", hull: 0x3A2A1C, band: 0x2A4A6A, crowd: 6, booty: 0 },
hornigold: { name: "RANGER", crowd: 8, booty: 1 },
vane: { name: "RANGER", crowd: 8, booty: 1, band: 0x5A1E14 },
jennings: { name: "BARSHEBA", crowd: 7, booty: 2 },
low: { name: "FANCY", band: 0x6A1A14, crowd: 9, booty: 2 },
morgan: { name: "SATISFACTION", band: 0xA8883A, gilt: 1, crowd: 10, booty: 2 },
olonnais: { name: "LA VENGEANCE", band: 0x2A4A8A, crowd: 10, booty: 2 },
kidd: { name: "ADVENTURE GALLEY", oars: 11, band: 0xA8883A, crowd: 9, booty: 3 },
every: { name: "FANCY", band: 0xC8A040, gilt: 1, crowd: 11, booty: 6 },
rogers: { name: "DELICIA", band: 0xC89A3A, gilt: 1, crowd: 8 },
_pearl: { name: "PEARL", band: 0xC89A3A, crowd: 8 },
_flota: { cross: 1, gilt: 1, band: 0xA8202A, figure: 0xC8A040, crowd: 8, booty: 4 },
_guarda: { cross: 1, band: 0xA8202A, crowd: 7 }
};
var PRW_NAMEMAT = {};
function prwNameBoard(name, w) { return __ZC(462, 191, this, arguments, new.target); }
(function () {
var s0 = prwShip;
prwShip = function (kind, o) {
o = o || {};
var g0 = s0.call(this, kind, o), L = g0.userData.L, B = g0.userData.B, H = g0.userData.H, dy = H * 0.8, g = new THREE.Group(), any = 0;
try {
if (o.name || o.oars || o.gilt || o.booty)
any = 1;
if (o.name) {
var nb = prwNameBoard(o.name, B * 0.7);
nb.position.set(0, dy + 0.25, -L / 2 - 0.24);
g.add(nb);
}
if (o.oars && !PRW.lite) {
var oy = H * 0.42;
for (var i = 0; i < o.oars; i++) {
var z = -L * 0.3 + i * L * 0.6 / (o.oars - 1);
[-1, 1].forEach(function (s) { prwBox(0.08, 0.36, 0.36, 0x0A0806, s * B * 0.47, oy, z, g); var sw = prwCyl(0.05, 0.07, 7, 0x8A6A42, s * (B * 0.5 + 2.6), oy - 0.9, z, g, 5); sw.rotation.z = s * 1.25; });
}
}
if (o.gilt) {
[-1, 1].forEach(function (s) { prwBox(0.08, 0.12, L * 0.7, 0xC8A048, s * B * 0.5, H * 0.95, 0, g); });
var tc = new THREE.Mesh(new THREE.TorusGeometry(B * 0.18, 0.12, 6, 16, Math.PI), prwMat(0xC8A048));
tc.position.set(0, dy + H * 0.75, -L / 2 - 0.3);
g.add(tc);
}
if (o.booty && !PRW.lite) {
for (var b = 0; b < o.booty; b++) {
var bx = (b % 2 ? 0.9 : -0.9), bz = -L * 0.05 + Math.floor(b / 2) * 1.3;
var ch = prwBox(0.9, 0.55, 0.6, 0x4A2A14, bx, dy + 0.4, bz, g);
prwLay(ch, "plank", 0x8A5A32, { tile: 0.8 });
prwBox(0.94, 0.06, 0.64, 0xB8903A, bx, dy + 0.62, bz, g);
if (b % 2 === 0) {
var hp = prwSph(0.36, 0xE8C048, bx, dy + 0.72, bz, g, 8, { e: 0x5A3A08, ei: 0.4 });
hp.scale.set(1.1, 0.45, 0.75);
}
}
}
}
catch (e) {
if (window.console)
console.warn("[prw] ship look", e);
}
if (any) {
g0.add(g);
ctnMerge(g);
}
return g0;
};
})();
function prwSailBuild(S) { return __ZC(462, 192, this, arguments, new.target); }
var PRW_HELM = { g: null, key: "", hid: [] };
function prwHelmWant() {
if (typeof WLD === "undefined" || WLD.on !== "sea" || !SEA.ship)
return false;
return prwInBox(SEA.sx, SEA.sz) || (typeof TI !== "undefined" && Math.hypot(SEA.sx - TI.x, SEA.sz - TI.z) < 5000);
}
function prwHelmSpec() { return __ZC(462, 193, this, arguments, new.target); }
function prwHelmBuild() { return __ZC(462, 194, this, arguments, new.target); }
function prwHelmFit() {
var s = SEA.ship, g = PRW_HELM.g;
if (!s || !g)
return;
var dy = g.userData.dy + 0.11 - 4.1;
var P = s.userData.prw;
if (P) {
P.position.y = dy;
P.children.forEach(function (c) { if (c.isMesh)
c.visible = !PRW_HELM.g; });
}
if (s.userData.prwHold)
s.userData.prwHold.position.y = g.userData.dy + 0.11 - 4.25;
}
function prwHelmDrop(keepOld) { return __ZC(462, 195, this, arguments, new.target); }
PRW.helmT = 0;
PRW.tickers.push(function (dt) {
PRW.helmT += dt || 0.5;
var want = false;
try {
want = prwHelmWant();
}
catch (e) { }
if (!want) {
if (PRW_HELM.g)
prwHelmDrop(false);
return;
}
if (!PRW_HELM.g || PRW.helmT > 2) {
PRW.helmT = 0;
try {
prwHelmBuild();
prwHelmFit();
}
catch (e) {
if (window.console)
console.warn("[prw] helm ship", e);
}
}
var g = PRW_HELM.g;
if (g && g.userData.wake) {
var sp = Math.abs(SEA.v);
g.userData.wake.material.opacity = Math.min(0.42, sp / 22 * 0.5);
g.userData.wake.visible = sp > 1;
}
});
(function () {
var o0 = prwSailsOf;
prwSailsOf = function (s) {
var g = PRW_HELM.g;
if (!g || s !== SEA.ship)
return o0.apply(this, arguments);
if (g.userData.prwSails)
return g.userData.prwSails;
var L = (g.userData.sails || []).slice();
L.forEach(function (o) {
var h = o.userData.sailH;
if (h == null) {
o.geometry.computeBoundingBox();
var bb = o.geometry.boundingBox;
h = bb.max.y - bb.min.y;
}
o.userData.sail0 = { sy: o.scale.y, sx: o.scale.x, y: o.position.y, ry: o.rotation.y, h: h };
});
var sq = L.filter(function (o) { return !o.userData.fa; }), ys = sq.map(function (o) { return o.userData.sail0.y; }), mid = ys.length ? (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2 : 0;
L.forEach(function (o) { o.userData.top = !o.userData.fa && o.userData.sail0.y >= mid; });
L.sort(function (a, b) { return a.userData.sail0.y - b.userData.sail0.y; });
g.userData.prwSails = L;
return L;
};
})();
(function () {
var s0 = prwSailsShow;
prwSailsShow = function (dt) {
var g = PRW_HELM.g;
if (!g)
return s0.apply(this, arguments);
var L = prwSailsOf(SEA.ship);
if (!L.length)
return;
var on = prwSeaOn(), lv = on ? PRW_SEA.cur : 3, off = prwOff(), ba = { sharp: 0.62, reach: 0.34, square: 0, aback: 0.62 }[PRW_SEA.brace] || 0, sign = off.d > 0 ? -1 : 1, sq = L.filter(function (o) { return !o.userData.fa; }), topY = sq.length ? sq[sq.length - 1].userData.sail0.y : 0;
L.forEach(function (o) {
var u = o.userData.sail0, want;
if (o.userData.fa)
want = on ? (lv >= 1 ? 1 : 0) : 1;
else
want = on ? (o.userData.top ? (lv >= 2 ? 1 : lv >= 1 ? 0.55 : 0) : (lv >= 3 ? 1 : 0)) : 1;
if (on && PRW_SEA.lost && !o.userData.fa && u.y === topY)
want = 0;
o.userData.f = (o.userData.f == null ? want : o.userData.f) + (want - (o.userData.f == null ? want : o.userData.f)) * Math.min(1, dt * 0.9);
var f = o.userData.f;
if (o.userData.fa) {
o.visible = f > 0.5;
return;
}
o.scale.y = u.sy * Math.max(0.02, f);
o.scale.x = u.sx * (on && lv >= 4 ? 1.1 : 1);
o.position.y = u.y + u.h * u.sy * (1 - f) / 2;
o.rotation.y = u.ry + (on ? sign * ba * (PRW_SEA.brace === "aback" && o.userData.top ? -1 : 1) : 0);
o.visible = f > 0.04;
});
};
})();
var PRW_EYE = null;
(function () {
if (typeof seaHelm !== "function")
return;
var h0 = seaHelm;
seaHelm = function () {
var g = PRW_HELM.g;
if (!g || !SEA.ship || !g.userData.qd)
return h0.apply(this, arguments);
var Q = g.userData.qd;
PRW_EYE = PRW_EYE || new THREE.Vector3();
PRW_EYE.set(0, Q.y + 1.72, Q.z - 0.7);
SEA.ship.updateMatrixWorld(true);
g.localToWorld(PRW_EYE);
camera.position.copy(PRW_EYE);
if (!PRW_HELM.looked) {
PRW_HELM.looked = 1;
pitch = 0.06;
}
};
})();
