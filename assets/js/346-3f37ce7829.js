/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WG_WORLDS = [
{ id: "city", place: "Somnucor", shop: ["The Smithy's front counter", "Edda Gable, the outfitter"], forge: ["The Smithy", "the smith"], col: 0x9AA4B0,
gear: [
["w", "wg_city_sabre", "Ringwatch sabre", "cutlass", 1.22, "swift", { cr_steel: 2, cr_leather: 1 }, 300, "The sabre of the city's night watch: light, quick, and balanced for a long shift."],
["w", "wg_city_xbow", "Tower crossbow", "crossbow", 1.25, "stagger", { cr_wood: 2, cr_steel: 1, cr_cloth: 1 }, 340, "A short crossbow from the Tower armoury; its heavy bolts knock a foe back."],
["a", "wg_city_coat", "Ringwatch greatcoat", "armor", 0.12, { layer: "longcoat" }, { cr_cloth: 3, cr_leather: 2 }, 320, "Long, warm and lined with leather plates where a blow would land."],
["a", "wg_city_helm", "Tower-crest helm", "helmet", 0.06, { hat: "helmet" }, { cr_steel: 1, cr_leather: 1 }, 180, "A polished helm with the Tower's crest."],
["m", "wg_city_elk", "Ringwood elk", "stag", 2.4, 0x6A4A30, 2.4, 0, { cr_leather: 4, cr_cloth: 2 }, 1400, "A tall elk from the woods beyond the Ring, broken to the saddle by the city's grooms."],
["c", "wg_city_lamp", "Lamplighter's token", "light", 14, { cr_glass: 1, cr_steel: 1 }, 160, "A brass token from the old lamplighters' guild."],
["c", "wg_city_coin", "Commuter's lucky coin", "keen", 0.08, { cr_steel: 1 }, 140, "Rubbed smooth by a thousand thumbs."]
] },
{ id: "moon", place: "Mare Haven", shop: ["The Tranquillity Outfitters", "Juno Albedo, outfitter"], forge: ["The Ice Works", "the works foreman"], col: 0xD8DCE4,
gear: [
["w", "wg_moon_pick", "Regolith war-pick", "warhammer", 1.25, "stagger", { cr_steel: 3, cr_wood: 1 }, 360, "A miner's pick made heavy for fighting; every blow sends a foe reeling, as if gravity let go."],
["w", "wg_moon_pulse", "Tranquillity pulse pistol", "blaster", 1.28, "swift", { cr_parts: 2, cr_glass: 1, cr_steel: 1 }, 420, "A compact pulse pistol made for the low pull of the Moon; it fires fast."],
["a", "wg_moon_suit", "Mare Haven surface suit", "armor", 0.13, { layer: "uniform" }, { cr_cloth: 3, cr_parts: 2, cr_glass: 1 }, 380, "A white suit with stiffened panels, made for the grey plains."],
["a", "wg_moon_visor", "Moonglass visor", "helmet", 0.06, { hat: "helmet" }, { cr_glass: 2, cr_steel: 1 }, 200, "A rounded helm with a gold-tinted visor against the hard sunlight."],
["m", "wg_moon_hare", "Moon hare", "rabbit", 1.9, 0xF0F0EA, 2.6, 0, { cr_cloth: 2, cr_leather: 2 }, 1300, "A great white hare bred in the domes; it bounds in long, light leaps."],
["c", "wg_moon_feather", "Low-gravity pendant", "feather", 8, { cr_glass: 1, cr_steel: 1 }, 180, "A pendant of Moon basalt."],
["c", "wg_moon_earth", "Earthrise locket", "still", 1.5, { cr_glass: 1 }, 220, "A tiny picture of the Earth rising."]
] },
{ id: "mars", place: "New Jezero", shop: ["The Red Bazaar outfitters", "Hollis Dray, outfitter"], forge: ["The Basalt Mine forge", "the mine smith"], col: 0xB8583A,
gear: [
["w", "wg_mars_cutter", "Basalt cutter", "scimitar", 1.28, "burn", { cr_steel: 2, cr_parts: 1 }, 380, "A curved blade with a heated edge, once a tool for cutting basalt blocks; it leaves foes burning."],
["w", "wg_mars_rifle", "Jezero long rifle", "sniper", 1.22, "stagger", { cr_parts: 4, cr_glass: 1 }, 560, "A long rifle made for the thin air and long sight-lines of the red plains."],
["a", "wg_mars_duster", "Dust-storm duster", "armor", 0.12, { layer: "longcoat" }, { cr_cloth: 3, cr_leather: 2 }, 330, "A long rust-red coat with sealed seams, made for the great dust storms."],
["a", "wg_mars_gloves", "Red-rock gauntlets", "gloves", 0.05, { hands: "gloves" }, { cr_leather: 2, cr_steel: 1 }, 170, "Heavy gloves armoured at the knuckles, for climbing and for fighting."],
["m", "wg_mars_crawler", "Rustback crawler", "scorpion", 1.4, 0x9A4A2A, 2.3, 0, { cr_parts: 3, cr_leather: 3 }, 1700, "A great rust-red scorpion, tame and steady; its saddle sits behind the claws."],
["c", "wg_mars_iron", "Iron-oxide charm", "thorns", 0.25, { cr_steel: 1, cr_leather: 1 }, 200, "A disc of red iron."],
["c", "wg_mars_dust", "Dust-runner's band", "rally", 0.3, { cr_leather: 1, cr_cloth: 1 }, 190, "A runner's wristband from the Jezero track."]
] },
{ id: "mercury", place: "Caloris Deep", shop: ["The Graphite Exchange outfitters", "Sabine Kettle, outfitter"], forge: ["The Caloris Smelter", "the smelter master"], col: 0x8A8E96,
gear: [
["w", "wg_merc_maul", "Smelter's maul", "warhammer", 1.3, "burn", { cr_steel: 3, cr_wood: 1, cr_ember: 1 }, 440, "A maul with a head still warm from the smelter; foes struck by it burn."],
["w", "wg_merc_flare", "Sunside flare gun", "flaregun", 1.3, "burn", { cr_parts: 2, cr_steel: 1 }, 300, "A heavy flare pistol for signalling across the sunside; its shells burn."],
["a", "wg_merc_shield", "Heat-shield plate", "armor", 0.15, { layer: "armor" }, { cr_steel: 3, cr_glass: 1, cr_cloth: 1 }, 440, "Layered silver plates that throw back the sun, and blows besides."],
["a", "wg_merc_boots", "Crater-walker boots", "boots", 0.05, { shoeKind: "boots" }, { cr_leather: 2, cr_steel: 1 }, 170, "Thick-soled boots for the hot ground of the crater floor."],
["m", "wg_merc_tortoise", "Graphite tortoise", "turtle", 1.5, 0x5A5E66, 1.8, 0, { cr_leather: 3, cr_steel: 2 }, 1200, "A slow, broad tortoise with a dark shell; nothing frightens it, and it carries you safely."],
["c", "wg_merc_cool", "Coolant vial", "chill", 0.2, { cr_glass: 2 }, 240, "A sealed vial of silver coolant."],
["c", "wg_merc_quick", "Swift-orbit pin", "pace", 0.12, { cr_steel: 1, cr_glass: 1 }, 260, "Mercury runs round the Sun fastest of all."]
] },
{ id: "venus", place: "Aphelia", shop: ["The Cloud Exchange outfitters", "Lisette Mardoux, outfitter"], forge: ["The Rig Works", "the rig smith"], col: 0xE0B890,
gear: [
["w", "wg_venus_rapier", "Cloudline rapier", "rapier", 1.28, "swift", { cr_steel: 2, cr_leather: 1 }, 360, "A slender rapier made for duelling on the cloud-city's high walks; it strikes fast."],
["w", "wg_venus_fan", "Acid-cloud fan", "windfan", 1.18, "frost", { cr_cloth: 3, cr_wood: 1, cr_glass: 1 }, 420, "A fighting fan whose gust is cold and choking; foes caught in it slow down."],
["a", "wg_venus_gown", "Aphelia duelling coat", "armor", 0.11, { layer: "longcoat" }, { cr_cloth: 4, cr_leather: 1 }, 340, "A fitted rose-gold coat with hidden mail."],
["a", "wg_venus_cape", "Sulphur-silk cape", "back", 0.05, { back: "cape" }, { cr_cloth: 3 }, 210, "A light cape of yellow-gold silk that catches a glancing blow."],
["m", "wg_venus_pegasus", "Rose-pearl pegasus", "pegasus", 2.3, 0xF0C8C8, 2.8, 1, { cr_cloth: 3, cr_leather: 3, cr_glass: 1 }, 2400, "A winged horse with a pearl-pink coat, bred above the clouds. It flies."],
["c", "wg_venus_morning", "Morning-star brooch", "sun", 0.12, { cr_steel: 1, cr_glass: 1 }, 260, "Venus is the brightest star of morning."],
["c", "wg_venus_veil", "Cloud-veil ribbon", "feather", 10, { cr_cloth: 2 }, 180, "A ribbon that floats as you fall."]
] },
{ id: "pluto", place: "Tombaugh Halls", shop: ["The Ice Exchange outfitters", "Ansel Quarrie, outfitter"], forge: ["The Ice Quarry forge", "the quarry smith"], col: 0xA8C8DC,
gear: [
["w", "wg_pluto_axe", "Nitrogen-frost axe", "battleaxe", 1.28, "frost", { cr_steel: 2, cr_wood: 1 }, 380, "An axe chilled in the nitrogen works; foes it strikes slow and stiffen."],
["w", "wg_pluto_ray", "Tombaugh freeze lance", "freezeray", 1.18, "frost", { cr_parts: 3, cr_glass: 2 }, 520, "A beam of cold from the ice quarries; it slows whatever it touches."],
["a", "wg_pluto_parka", "Far-sun parka", "armor", 0.12, { layer: "hoodie" }, { cr_cloth: 4, cr_leather: 2 }, 330, "The warmest coat in the system, quilted and armoured."],
["a", "wg_pluto_hood", "Heart-plain fur cap", "helmet", 0.05, { hat: "beanie" }, { cr_cloth: 2, cr_leather: 1 }, 170, "A fur-lined cap named for the pale heart on Pluto's face."],
["m", "wg_pluto_bear", "Tombaugh frost bear", "bear", 2.2, 0xC8DCEC, 2.3, 0, { cr_leather: 4, cr_cloth: 2 }, 1600, "A pale blue-white bear that loves the cold; slow to anger, impossible to stop."],
["c", "wg_pluto_heart", "Pale-heart charm", "vigour", 0.12, { cr_glass: 1, cr_cloth: 1 }, 240, "A heart of clear ice that never melts."],
["c", "wg_pluto_lamp", "Far-sun lantern", "night", 0.1, { cr_glass: 2 }, 220, "At Pluto the Sun is only a bright star."]
] },
{ id: "jupiter", place: "Vellamar", shop: ["The Banded Exchange outfitters", "Corvin Halley, outfitter"], forge: ["The Skimmer Works", "the works smith"], col: 0xD8A070,
gear: [
["w", "wg_jup_storm", "Great Storm rod", "stormrod", 1.3, "stagger", { cr_wood: 1, cr_crystal: 1, gr_jupiter_nh4sh: 2 }, 480, "A rod that hums like the Great Red Spot; its bolts throw foes back."],
["w", "wg_jup_harpoon", "Skimmer harpoon", "trident", 1.25, "drain", { cr_steel: 2, cr_wood: 2 }, 360, "A gas-skimmer's harpoon made a weapon; each strike draws back a little vigour."],
["a", "wg_jup_suit", "Banded pressure suit", "armor", 0.14, { layer: "uniform" }, { cr_cloth: 3, cr_parts: 2, gr_jupiter_nh4sh: 1 }, 420, "A suit striped in Jupiter's bands, made for the crushing deep air."],
["a", "wg_jup_helm", "Cloud-diver's helm", "helmet", 0.07, { hat: "helmet" }, { cr_glass: 2, cr_steel: 1 }, 220, "A round helm with a wide window for watching the storms."],
["m", "wg_jup_whale", "Cloud-whale calf", "whale", 2.4, 0xC88A5A, 2.4, 1, { cr_cloth: 4, cr_leather: 3, gr_jupiter_nh4sh: 2 }, 2600, "A young sky-whale from the deep bands, gentle and vast. It swims through the air."],
["c", "wg_jup_moons", "Four-moons charm", "second", 0.3, { cr_glass: 1, gr_jupiter_nh4sh: 1 }, 280, "Four small beads for the four great moons."],
["c", "wg_jup_spot", "Red Spot ring", "might", 0.1, { cr_steel: 1, cr_glass: 1 }, 300, "A ring with a swirling red stone."]
] },
{ id: "saturn", place: "Halcyra", shop: ["The Ringside Exchange outfitters", "Delphine Arcos, outfitter"], forge: ["The Melt Works", "the melt smith"], col: 0xE0C890,
gear: [
["w", "wg_sat_glaive", "Ring-edge glaive", "halberd", 1.28, "swift", { cr_steel: 2, cr_wood: 2 }, 380, "A glaive with a blade curved like the rings; it sweeps quick and wide."],
["w", "wg_sat_disc", "Ringlet disc", "chakram", 1.3, "stagger", { cr_steel: 2, gr_saturn_spray: 1 }, 340, "A thrown disc of ice-hardened steel that comes back to the hand."],
["a", "wg_sat_cuirass", "Halcyra ring-cuirass", "armor", 0.15, { layer: "armor" }, { cr_steel: 3, cr_leather: 2 }, 440, "Pale-gold plate ringed with bands, worn by the Ringside Guard."],
["a", "wg_sat_cape", "Titan-haze mantle", "back", 0.05, { back: "cloak" }, { cr_cloth: 3 }, 220, "An orange-brown mantle the colour of Titan's sky."],
["m", "wg_sat_griffin", "Ringside griffin", "griffin", 2.4, 0xD8B060, 2.9, 1, { cr_leather: 4, cr_cloth: 2, gr_saturn_spray: 2 }, 2500, "A golden griffin bred on the ring-viewing terraces. It flies."],
["c", "wg_sat_spray", "Enceladus spray charm", "mend", 1.2, { cr_glass: 1, gr_saturn_spray: 1 }, 260, "A bead of the icy moon's spray."],
["c", "wg_sat_float", "Lighter-than-water pin", "dodge", 0.08, { cr_glass: 1 }, 200, "Saturn would float on a great enough sea."]
] },
{ id: "uranus", place: "Celadine", shop: ["The Haze Exchange outfitters", "Petra Linden, outfitter"], forge: ["The Skimmer Works of Celadine", "the works smith"], col: 0x8ACCD0,
gear: [
["w", "wg_ura_spear", "Sideways-wind spear", "spear", 1.27, "swift", { cr_steel: 1, cr_wood: 2 }, 300, "A spear that seems to come at you from the side, as the planet's winds do."],
["w", "wg_ura_rifle", "Celadine ice rifle", "pulserifle", 1.22, "frost", { cr_parts: 3, cr_glass: 1, gr_uranus_ringdust: 1 }, 520, "A pulse rifle firing shards of blue ice; foes it hits slow down."],
["a", "wg_ura_coat", "Haze-walker coat", "armor", 0.12, { layer: "jacket" }, { cr_cloth: 3, cr_leather: 2 }, 320, "A cyan coat that sheds the cold haze."],
["a", "wg_ura_boots", "Tilted-world boots", "boots", 0.05, { shoeKind: "boots" }, { cr_leather: 2 }, 160, "Boots with grips for walking on a world turned on its side."],
["m", "wg_ura_hippo", "Haze hippogriff", "hippogriff", 2.3, 0x8AC8D0, 2.8, 1, { cr_leather: 3, cr_cloth: 2, gr_uranus_ringdust: 2 }, 2300, "A cyan-feathered hippogriff of the haze decks. It flies."],
["c", "wg_ura_axis", "Tilted-axis charm", "dodge", 0.1, { cr_glass: 1, gr_uranus_ringdust: 1 }, 220, "A spinning top on a thread."],
["c", "wg_ura_dark", "Dark-ring band", "ward", 0.08, { cr_steel: 1, gr_uranus_ringdust: 1 }, 220, "A band of dark ring dust set in steel."]
] },
{ id: "neptune", place: "Saphirel", shop: ["The Gale Exchange outfitters", "Mara Tidecombe, outfitter"], forge: ["The Balloon Works", "the works smith"], col: 0x4A6AC8,
gear: [
["w", "wg_nep_trident", "Gale trident", "trident", 1.3, "stagger", { cr_steel: 3, cr_wood: 1 }, 400, "A deep-blue trident; its thrust hits like the fastest winds in the system."],
["w", "wg_nep_sonic", "Supersonic gale-horn", "sonic", 1.18, "stagger", { cr_parts: 3, cr_glass: 1, gr_neptune_triton: 1 }, 540, "A horn that blasts a wall of wind; foes are thrown back."],
["a", "wg_nep_plate", "Saphirel storm-plate", "armor", 0.15, { layer: "armor" }, { cr_steel: 3, cr_cloth: 1, gr_neptune_triton: 1 }, 450, "Deep-blue plate made to stand in a gale."],
["a", "wg_nep_helm", "Great Dark Spot helm", "helmet", 0.07, { hat: "helmet" }, { cr_steel: 2 }, 220, "A dark helm with a swirling oval crest."],
["m", "wg_nep_seahorse", "Gale seahorse", "seahorse", 2.8, 0x2A4AB0, 2.9, 1, { cr_leather: 3, cr_cloth: 3, gr_neptune_triton: 2 }, 2500, "A great sky-seahorse of Saphirel's wind-currents. It flies."],
["c", "wg_nep_triton", "Triton geyser charm", "chill", 0.25, { cr_glass: 1, gr_neptune_triton: 1 }, 300, "A bead of Triton's frost."],
["c", "wg_nep_wind", "Windrunner's knot", "stride", 0.12, { cr_cloth: 2 }, 220, "A sailor's knot."]
] },
{ id: "veyar", place: "Ilvessa, the Singing City", shop: ["The Great Circle of Gifts: the outfitters' arc", "Seren Valeth, outfitter"], forge: ["The Thread House", "the thread-smith"], col: 0xC8A8F0,
gear: [
["w", "wg_vey_blade", "Songsteel blade", "katana", 1.3, "swift", { cr_steel: 2, gr_veyar_thread: 2 }, 420, "A blade that rings a clear note when drawn; it strikes as quick as a song."],
["w", "wg_vey_staff", "Choir staff", "lightstaff", 1.25, "drain", { cr_wood: 1, cr_crystal: 1, gr_veyar_thread: 1 }, 480, "A staff of singing crystal; its light draws vigour back to you."],
["a", "wg_vey_robe", "Thread-woven war robe", "armor", 0.12, { layer: "kimono" }, { cr_cloth: 2, gr_veyar_thread: 3 }, 400, "A robe of grove thread, woven tight enough to turn a blade."],
["a", "wg_vey_circlet", "Harmony circlet", "helmet", 0.05, { hat: "crown" }, { cr_steel: 1, cr_glass: 1 }, 220, "A thin silver circlet that hums softly."],
["m", "wg_vey_unicorn", "Songhorn unicorn", "unicorn", 2.3, 0xD8C0F0, 2.7, 0, { cr_leather: 3, gr_veyar_thread: 3 }, 2200, "A lilac unicorn whose horn hums as it runs."],
["c", "wg_vey_note", "Held-note charm", "still", 1.8, { cr_glass: 1, gr_veyar_thread: 1 }, 300, "A note held forever in glass."],
["c", "wg_vey_chorus", "Chorus ring", "vigour", 0.12, { cr_steel: 1, gr_veyar_thread: 1 }, 280, "Many voices are stronger than one."]
] },
{ id: "neverland", place: "Aerieholm", shop: ["The Driftwood Bazaar outfitters", "Pippa Swiftbourne, outfitter"], forge: ["The Boatwrights' Sheds", "the boatwright"], col: 0x8AC870,
gear: [
["w", "wg_nev_cutlass", "Lagoon cutlass", "cutlass", 1.27, "swift", { cr_steel: 2, cr_wood: 1 }, 320, "A light sea-cutlass with a shell guard, quick in a scrap."],
["w", "wg_nev_sling", "Treetop sling", "sling", 1.3, "stagger", { cr_leather: 1, cr_cloth: 1, hx_shell: 2 }, 220, "A sling of woven palm; its stones knock foes off their feet."],
["a", "wg_nev_jerkin", "Rope-walker's jerkin", "armor", 0.1, { layer: "vest" }, { cr_leather: 3, hx_feather: 2 }, 280, "A green leather jerkin, light enough to climb in."],
["a", "wg_nev_cap", "Lagoon leaf-crown", "helmet", 0.04, { hat: "vinecrown" }, { cr_cloth: 1, hx_feather: 2 }, 150, "A crown of woven leaves and one bright feather."],
["m", "wg_nev_eagle", "Aerie eagle", "roc", 2.4, 0x7A5A3A, 2.9, 1, { cr_leather: 3, hx_feather: 4 }, 2300, "A great cliff eagle of Aerieholm, big enough to carry a rider. It flies."],
["c", "wg_nev_dust", "Pinch-of-dust locket", "feather", 14, { cr_glass: 1, hx_dust: 1 }, 260, "A locket with a pinch of fairy dust."],
["c", "wg_nev_crow", "Never-grow-up whistle", "pace", 0.12, { cr_wood: 1 }, 200, "A whistle cut from a reed."]
] },
{ id: "sea", place: "Saltcrown", shop: ["The Fish Quay chandlery", "Nerys Coldwater, chandler"], forge: ["The Rope Works forge", "the harbour smith"], col: 0x5A9AB0,
gear: [
["w", "wg_sea_boarding", "Boarding axe", "battleaxe", 1.27, "stagger", { cr_steel: 2, cr_wood: 1 }, 340, "A sailor's axe for boarding and cutting rope; its blows send foes staggering."],
["w", "wg_sea_pistol", "Saltcrown sea pistol", "flintlock", 1.3, "swift", { cr_wood: 1, cr_parts: 1, cr_steel: 1 }, 320, "A brass-bound pistol that keeps its powder dry."],
["a", "wg_sea_coat", "Admiralty sea-coat", "armor", 0.12, { layer: "uniform" }, { cr_cloth: 3, cr_leather: 1 }, 340, "Navy blue with brass buttons, the cloth doubled at the shoulders."],
["a", "wg_sea_hat", "Captain's tricorn", "helmet", 0.04, { hat: "tophat" }, { cr_cloth: 2, cr_leather: 1 }, 160, "A stiff captain's hat, lined with a steel cap."],
["m", "wg_sea_kelpie", "Tidewater horse", "kelpie", 2.2, 0x4E8A82, 2.5, 0, { cr_leather: 3, hx_fish: 3 }, 1700, "A sea-green water horse of the Saltcrown stables, friendly and sure-footed."],
["c", "wg_sea_compass", "Steady-needle charm", "saddle", 0.1, { cr_steel: 1, cr_glass: 1 }, 200, "A tiny compass that always settles."],
["c", "wg_sea_wind", "Fair-wind knot", "stride", 0.12, { cr_cloth: 2 }, 200, "Tied by Saltcrown's sail-makers."]
] },
{ id: "northpole", place: "Starhearth", shop: ["The Great Clockwork Works shop", "Holly Brightbell, shopkeeper"], forge: ["The Great Clockwork Works", "the master clockmaker"], col: 0xC8D8E8,
gear: [
["w", "wg_np_icicle", "Icicle blade", "longsword", 1.27, "frost", { cr_steel: 2, hx_ice: 2 }, 360, "A long blade bright as an icicle; foes it strikes slow with cold."],
["w", "wg_np_snow", "Snowball launcher", "grenadelauncher", 1.15, "frost", { cr_parts: 3, hx_ice: 3 }, 380, "The elves' pride: a tube that lobs hard-packed snowballs, chilling whoever they hit."],
["a", "wg_np_coat", "Elf-stitched winter coat", "armor", 0.11, { layer: "longcoat" }, { cr_cloth: 3, hx_ribbon: 2 }, 300, "A red coat trimmed white, stitched by the elves with quilted padding."],
["a", "wg_np_mitts", "Reindeer-hide mittens", "gloves", 0.04, { hands: "gloves" }, { cr_leather: 2 }, 140, "Warm, thick and padded."],
["m", "wg_np_reindeer", "Starhearth reindeer", "stag", 2.2, 0x8A6A4A, 2.8, 1, { cr_leather: 3, hx_moss: 4 }, 2400, "A reindeer of the sky-teams, trained by the elves. It flies."],
["c", "wg_np_bell", "Sleigh-bell charm", "stride", 0.15, { cr_steel: 1, hx_ribbon: 1 }, 240, "A small silver bell."],
["c", "wg_np_hearth", "Hearth-ember charm", "ember", 0.25, { cr_glass: 1, hx_pine: 1 }, 200, "A live ember from Starhearth's fires, kept in a glass bead."]
] },
{ id: "battle", place: "Bastion Varr", shop: ["The Spoils Market armoury", "Quartermaster Hesk"], forge: ["The Great Forge of Varr", "the Forgemaster of Varr"], col: 0x5A5A60,
gear: [
["w", "wg_bat_greatsword", "Varr siege-sword", "greatsword", 1.3, "stagger", { cr_steel: 4, cr_leather: 1, gr_battle_flint: 1 }, 560, "A siege-sword of the Bastion: every blow throws a foe back."],
["w", "wg_bat_gun", "Varr war-rifle", "assault", 1.22, "swift", { cr_parts: 5, cr_steel: 1 }, 620, "The Bastion's own rifle, quick-firing and hard-wearing."],
["a", "wg_bat_plate", "Bastion war-plate", "armor", 0.17, { layer: "armor" }, { cr_steel: 4, cr_leather: 2 }, 520, "Dark, heavy plate made for the field."],
["a", "wg_bat_helm", "Varr great helm", "helmet", 0.08, { hat: "helmet" }, { cr_steel: 2, cr_leather: 1 }, 260, "A closed helm with a crest of black horsehair."],
["m", "wg_bat_elephant", "Varr war elephant", "elephant", 3.6, 0x6A6A70, 2.0, 0, { cr_steel: 3, cr_leather: 5 }, 2800, "A great elephant in armour, the pride of the Bastion's stables."],
["c", "wg_bat_scar", "Veteran's scar-token", "second", 0.35, { cr_steel: 1, cr_leather: 1 }, 320, "Given to those who came back."],
["c", "wg_bat_banner", "Banner-bearer's pin", "rally", 0.35, { cr_steel: 1, cr_cloth: 1 }, 300, "Fight under the Bastion's banner."]
] },
{ id: "greenwold", place: "Harrowmead", shop: ["The Great Corn Exchange outfitters", "Bramble Hatchett, outfitter"], forge: ["The Coppice Woods smithy", "the woodsmith"], col: 0x7A9A5A,
gear: [
["w", "wg_gw_billhook", "Hedger's war-bill", "scythe", 1.27, "swift", { cr_steel: 2, cr_wood: 2 }, 320, "A hedge-layer's billhook on a long haft, quick to swing."],
["w", "wg_gw_bow", "Harrowmead yew bow", "longbow", 1.3, "stagger", { cr_wood: 3, cr_cloth: 1 }, 340, "A long yew bow from the coppice woods; its arrows hit hard."],
["a", "wg_gw_smock", "Shepherd's padded smock", "armor", 0.1, { layer: "tunic" }, { cr_cloth: 2, gr_greenwold_fleece: 3 }, 280, "A thick woollen smock, padded with fleece."],
["a", "wg_gw_hat", "Harvest hat", "helmet", 0.03, { hat: "cowboy" }, { cr_cloth: 1, gr_greenwold_grain: 2 }, 120, "A wide straw hat over a leather cap."],
["m", "wg_gw_ox", "Harrowmead plough ox", "cow", 2, 0x8A5A3A, 1.9, 0, { cr_leather: 3, gr_greenwold_grain: 4 }, 1200, "A strong red ox from the home farms; slow, steady and kind."],
["c", "wg_gw_honey", "Honeycomb charm", "mend", 1.2, { cr_glass: 1, gr_greenwold_honeycomb: 1 }, 220, "A bead of wax and honey."],
["c", "wg_gw_clover", "Harrowmead clover charm", "keen", 0.08, { gr_greenwold_grain: 1 }, 160, "Pressed in glass."]
] },
{ id: "underworld", place: "Hearthdeep", shop: ["The Garnet Market outfitters", "Brunna Coalheart, outfitter"], forge: ["The Silver Forges", "the silver-smith"], col: 0x9A3A3A,
gear: [
["w", "wg_uw_axe", "Hearthdeep garnet axe", "battleaxe", 1.3, "burn", { cr_steel: 2, gr_underworld_garnet: 2 }, 440, "An axe set with deep garnets that glow like coals; foes it strikes burn."],
["w", "wg_uw_hammer", "Silver-forge hammer", "warhammer", 1.3, "stagger", { cr_steel: 2, gr_underworld_silver: 2, cr_wood: 1 }, 440, "A smith's hammer of silver-steel; it throws foes back."],
["a", "wg_uw_mail", "Garnet-studded mail", "armor", 0.15, { layer: "armor" }, { cr_steel: 3, gr_underworld_garnet: 1 }, 430, "Dark mail studded with red stones."],
["a", "wg_uw_helm", "Lantern-crested helm", "helmet", 0.07, { hat: "helmet" }, { cr_steel: 1, gr_underworld_silver: 1 }, 220, "A helm with a small lantern on its crest."],
["m", "wg_uw_hound", "Hearthdeep ember-hound", "cerberus", 2.2, 0x5A2A22, 2.5, 0, { cr_leather: 4, gr_underworld_pomegranate: 3 }, 2200, "A three-headed hound of the deep halls, fierce to strangers and loyal to its rider."],
["c", "wg_uw_glowcap", "Glowcap lantern", "night", 0.12, { cr_glass: 1, gr_underworld_glowcap: 2 }, 220, "A jar of glowing caps."],
["c", "wg_uw_seed", "Pomegranate-seed charm", "leech", 0.1, { gr_underworld_pomegranate: 1, cr_glass: 1 }, 260, "Six seeds in amber."]
] },
{ id: "heavens", place: "Lumenreach", shop: ["The Cloud Bazaar outfitters", "Mei Lanfeng, outfitter"], forge: ["The Rainmakers' Works", "the rain-smith"], col: 0xF0E0A0,
gear: [
["w", "wg_hv_staff", "Sunpearl staff", "lightstaff", 1.3, "drain", { cr_wood: 1, gr_heavens_sunpearl: 1, cr_glass: 1 }, 480, "A staff crowned with a sunpearl; its light draws vigour back to you."],
["w", "wg_hv_fan", "Rainmaker's fan", "windfan", 1.22, "frost", { cr_cloth: 2, gr_heavens_mist: 2 }, 400, "A fan that throws a cold rain; foes caught in it slow down."],
["a", "wg_hv_robe", "Cloud-wool robe", "armor", 0.12, { layer: "kimono" }, { cr_cloth: 1, gr_heavens_cloudwool: 3 }, 360, "A white robe of cloud-wool, softer than silk and tougher than leather."],
["a", "wg_hv_crown", "Lumen crown", "helmet", 0.05, { hat: "crown" }, { cr_steel: 1, gr_heavens_sunpearl: 1 }, 260, "A golden crown set with a small sunpearl."],
["m", "wg_hv_fox", "Lumen sky-fox", "kitsune", 2, 0xF4E8C8, 2.9, 1, { cr_cloth: 3, gr_heavens_cloudwool: 3 }, 2600, "A many-tailed white-gold fox that runs on the clouds. It flies."],
["c", "wg_hv_mist", "Morning-mist vial", "mend", 1.5, { cr_glass: 1, gr_heavens_mist: 1 }, 280, "Morning mist, bottled."],
["c", "wg_hv_honey", "Sky-honey drop", "sun", 0.12, { gr_heavens_honey: 1, cr_glass: 1 }, 220, "A golden drop that makes you light."]
] },
{ id: "depths", place: "Coralmere", shop: ["The Sunken Exchange outfitters", "Ondine Merrow, outfitter"], forge: ["The Vent Mines forge", "the vent-smith"], col: 0x3A9A9A,
gear: [
["w", "wg_dp_trident", "Coralmere trident", "trident", 1.3, "drain", { cr_steel: 2, gr_depths_ventore: 2 }, 420, "A trident of vent-forged steel; each thrust draws back a little vigour."],
["w", "wg_dp_spear", "Silverfin spear-gun", "crossbow", 1.27, "frost", { cr_wood: 1, cr_steel: 2, gr_depths_silverfin: 1 }, 420, "A diver's spear-gun; its barbs chill and slow."],
["a", "wg_dp_scale", "Pearl-scale armour", "armor", 0.14, { layer: "armor" }, { cr_steel: 2, gr_depths_pearl: 2 }, 440, "Overlapping plates edged with pearl."],
["a", "wg_dp_helm", "Diver's bell helm", "helmet", 0.07, { hat: "helmet" }, { cr_steel: 1, cr_glass: 2 }, 230, "A round brass diving helm."],
["m", "wg_dp_dolphin", "Coralmere dolphin", "dolphin", 1.4, 0x8AA8C0, 2.9, 1, { cr_leather: 2, gr_depths_kelp: 4 }, 2200, "A bright, quick dolphin that carries a rider through the deep. It swims through the air as through water."],
["c", "wg_dp_kelp", "Kelp-ribbon charm", "ward", 0.1, { gr_depths_kelp: 2 }, 220, "A ribbon of kelp that softens a blow."],
["c", "wg_dp_lamp", "Anglerfish lamp", "light", 18, { cr_glass: 1, gr_depths_silverfin: 1 }, 240, "A small lamp like the deep fish carry."]
] },
{ id: "faerie", place: "Glimmerwold", shop: ["The Moonlight Fair outfitters", "Thistle Morrowdew, outfitter"], forge: ["The Moonstone Delvings forge", "the moonstone-smith"], col: 0xA8D8C0,
gear: [
["w", "wg_fae_thorn", "Thornwood staff", "thornstaff", 1.3, "frost", { cr_wood: 2, gr_faerie_moonstone: 1 }, 400, "A staff that throws thorns; whatever they catch is tangled and slowed."],
["w", "wg_fae_rapier", "Moonstone rapier", "rapier", 1.28, "swift", { cr_steel: 1, gr_faerie_moonstone: 2 }, 400, "A slender blade with a moonstone pommel; quick as a moth."],
["a", "wg_fae_cloak", "Gossamer cloak", "back", 0.06, { back: "cloak" }, { gr_faerie_silk: 3 }, 280, "A cloak of gossamer silk, nearly weightless and surprisingly tough."],
["a", "wg_fae_vest", "Leaf-scale vest", "armor", 0.11, { layer: "vest" }, { cr_leather: 2, gr_faerie_silk: 1 }, 300, "A vest of leaf-shaped scales, green and gold."],
["m", "wg_fae_fox", "Glimmer fox", "fox", 1.9, 0xD0782A, 2.7, 0, { cr_leather: 2, gr_faerie_honey: 3 }, 1800, "A great russet fox of the moonlit woods, quick and clever."],
["c", "wg_fae_dew", "Dusk-dew charm", "still", 1.5, { cr_glass: 1, gr_faerie_dew: 1 }, 240, "Dew gathered at dusk."],
["c", "wg_fae_wing", "Moth-wing brooch", "dodge", 0.12, { gr_faerie_silk: 1 }, 200, "Light as a moth."]
] },
{ id: "void", place: "Stillspire", shop: ["The Exchange of Rare Light outfitters", "Ister Vane, outfitter"], forge: ["The Shard Quarries forge", "the shard-smith"], col: 0x6A5AA8,
gear: [
["w", "wg_void_orb", "Lamp-shard orb", "sparkwand", 1.25, "drain", { cr_glass: 1, gr_void_shard: 2 }, 460, "A shard of held light; its beam draws vigour back to you."],
["w", "wg_void_blade", "Stillspire edge", "katana", 1.3, "frost", { cr_steel: 2, gr_void_shard: 1 }, 440, "A dark blade with a pale edge; where it cuts, things slow, as if time thickened."],
["a", "wg_void_robe", "Starless robe", "armor", 0.12, { layer: "kimono" }, { cr_cloth: 2, gr_void_stardust: 2 }, 360, "A robe of deep violet scattered with tiny points of light."],
["a", "wg_void_hood", "Stillspire star-hat", "helmet", 0.05, { hat: "wizard" }, { cr_cloth: 2 }, 180, "A tall dark hat scattered with tiny stars."],
["m", "wg_void_steed", "Hollow-star steed", "nightmare", 2.3, 0x3A2A6A, 2.8, 0, { cr_leather: 3, gr_void_stardust: 2 }, 2300, "A dark violet horse with a mane like a night sky."],
["c", "wg_void_moss", "Glowmoss charm", "might", 0.1, { gr_void_glowmoss: 2 }, 200, "Glowmoss in a locket; it brightens when you strike."],
["c", "wg_void_still", "Still-hour charm", "ward", 0.12, { cr_glass: 1, gr_void_shard: 1 }, 280, "A moment held still."]
] },
{ id: "mirror", place: "Gemelline", shop: ["The Market of Opposites outfitters", "Lys and Syl Ambre, outfitters"], forge: ["The Glass Furnaces", "the glass-smith"], col: 0xC8D0D8,
gear: [
["w", "wg_mir_twin", "Twin-image daggers", "dagger", 1.3, "swift", { cr_steel: 2, gr_mirror_silver: 1 }, 360, "Two daggers so alike nobody can tell which struck first."],
["w", "wg_mir_glass", "Glass-edge sword", "longsword", 1.28, "drain", { cr_steel: 1, gr_mirror_quartz: 2 }, 420, "A sword with an edge of clear quartz; it draws vigour back to you."],
["a", "wg_mir_plate", "Silvered mirror-plate", "armor", 0.15, { layer: "armor" }, { cr_steel: 2, gr_mirror_silver: 2 }, 440, "Plate polished to a mirror; foes see themselves coming."],
["a", "wg_mir_gloves", "Reflecting gauntlets", "gloves", 0.05, { hands: "gloves" }, { cr_leather: 1, gr_mirror_silver: 1 }, 200, "Silvered gauntlets that turn a glancing blow."],
["m", "wg_mir_lion", "Silver mirror-lion", "lion", 1.9, 0xC8CCD4, 2.6, 0, { cr_leather: 3, gr_mirror_silver: 2 }, 2000, "A lion with a coat like polished silver."],
["c", "wg_mir_shard", "Mirror-offcut charm", "thorns", 0.3, { gr_mirror_shard: 2 }, 240, "A small mirror on a cord."],
["c", "wg_mir_heart", "Twin-heart charm", "leech", 0.1, { gr_mirror_quartz: 1, cr_glass: 1 }, 260, "Two hearts that beat as one."]
] },
{ id: "dead", place: "Lanternhome", shop: ["The Marigold Market outfitters", "Abuela Rosalba, outfitter"], forge: ["The Lantern Works", "the lantern-smith"], col: 0xE8A040,
gear: [
["w", "wg_dead_scythe", "Willow-wand scythe", "scythe", 1.28, "drain", { cr_steel: 2, gr_dead_willow: 2 }, 420, "A scythe hafted in pale willow; each sweep draws vigour back to you."],
["w", "wg_dead_lantern", "Lantern of the long road", "firestaff", 1.25, "burn", { cr_wood: 1, gr_dead_wax: 2, cr_glass: 1 }, 400, "A lantern on a staff; its flame leaps out and sets foes alight."],
["a", "wg_dead_poncho", "Marigold-woven poncho", "armor", 0.11, { layer: "tunic" }, { cr_cloth: 3, gr_dead_marigold: 2 }, 300, "A bright poncho woven with marigold thread, padded within."],
["a", "wg_dead_hat", "Remembrance sombrero", "helmet", 0.04, { hat: "cowboy" }, { cr_cloth: 2 }, 160, "A wide hat embroidered with flowers and candles."],
["m", "wg_dead_jaguar", "Marigold jaguar", "tiger", 1.7, 0xE8A030, 2.7, 0, { cr_leather: 3, gr_dead_marigold: 3 }, 2100, "A great golden cat with dark rosettes, guardian of the long road."],
["c", "wg_dead_candle", "Remembrance candle", "second", 0.3, { gr_dead_wax: 2 }, 180, "A candle that never burns down."],
["c", "wg_dead_marigold", "Marigold garland", "mend", 1.2, { gr_dead_marigold: 2 }, 220, "Marigolds to guide the way."]
] },
{ id: "frozen", place: "Isvarden", shop: ["The Frost Fair outfitters", "Sigrun Ottarsdottir, outfitter"], forge: ["The Blue Ice Quarry forge", "the ice-smith"], col: 0x9AC8E8,
gear: [
["w", "wg_frz_axe", "Glacier-bite axe", "battleaxe", 1.3, "frost", { cr_steel: 2, gr_frozen_blueice: 2 }, 420, "An axe with a head of blue-ice steel; foes it strikes slow with cold."],
["w", "wg_frz_spear", "Isvarden hunting spear", "spear", 1.28, "stagger", { cr_steel: 1, cr_wood: 2, gr_frozen_char: 1 }, 320, "A long spear of the ice-hunters; it knocks a foe back."],
["a", "wg_frz_coat", "Mammoth-wool war coat", "armor", 0.13, { layer: "longcoat" }, { cr_leather: 2, gr_frozen_wool: 3 }, 380, "A heavy coat of mammoth wool over leather."],
["a", "wg_frz_helm", "Frost-horn helm", "helmet", 0.07, { hat: "helmet" }, { cr_steel: 1, gr_frozen_blueice: 1 }, 220, "A helm with two short curved horns of blue ice-steel."],
["m", "wg_frz_mammoth", "Isvarden mammoth", "mammoth", 3.8, 0x6A4A32, 2.1, 0, { cr_leather: 4, gr_frozen_wool: 3, gr_frozen_lichen: 3 }, 2600, "A woolly mammoth of the frost fairs, broad enough for a howdah."],
["c", "wg_frz_lichen", "Snow-lichen charm", "vigour", 0.12, { gr_frozen_lichen: 2 }, 220, "Lichen that grows in the hardest cold."],
["c", "wg_frz_aurora", "Northern-light charm", "chill", 0.25, { cr_glass: 1, gr_frozen_blueice: 1 }, 220, "A green glow like the aurora goes with you."]
] },
{ id: "elsewhere", place: "Ondrevar", shop: ["The Windglass Bazaar outfitters", "Ko-Vessa, outfitter"], forge: ["The Golem Works", "the golem-smith"], col: 0x5AB8A8,
gear: [
["w", "wg_els_crystal", "Singing-crystal lance", "lance", 1.28, "stagger", { cr_wood: 1, gr_elsewhere_crystal: 3 }, 480, "A lance of singing crystal that hums before it strikes; its blast throws foes back."],
["w", "wg_els_spore", "Spore-pod thrower", "grenadelauncher", 1.2, "frost", { cr_parts: 2, gr_elsewhere_spore: 3 }, 420, "A launcher of sticky spore-pods; whatever they hit is slowed."],
["a", "wg_els_bark", "Glassbark armour", "armor", 0.15, { layer: "armor" }, { cr_leather: 1, gr_elsewhere_resin: 3 }, 430, "Plates of hardened glassbark resin, clear as amber."],
["a", "wg_els_mask", "Breath-moss helm", "helmet", 0.05, { hat: "helmet" }, { cr_cloth: 1, gr_elsewhere_airmoss: 2 }, 200, "A rounded helm lined with breath-moss."],
["m", "wg_els_manticore", "Windglass manticore", "manticore", 2.3, 0x4AA8A0, 2.9, 1, { cr_leather: 3, gr_elsewhere_spore: 3 }, 2600, "A teal-winged manticore of Ondrevar's cliffs, tamed by the golem-smiths. It flies."],
["c", "wg_els_air", "Breath-moss charm", "pace", 0.1, { gr_elsewhere_airmoss: 2 }, 260, "A sprig of breath-moss."],
["c", "wg_els_song", "Singing-crystal charm", "keen", 0.1, { gr_elsewhere_crystal: 1 }, 280, "A crystal that sings when you strike."]
] },
{ id: "fire", place: "Kilnhaven", shop: ["The Cinder Market outfitters", "Ottra Vell, outfitter"], forge: ["The Great Foundry of Kilnhaven", "the master founder"], col: 0xC8582A,
gear: [
["w", "wg_fire_brand", "Cinder brand", "longsword", 1.32, "burn", { cr_steel: 2, gr_fire_obsidian: 2, cr_leather: 1 }, 460, "A longsword quenched in the lava runs; its edge stays hot and sets foes alight."],
["w", "wg_fire_flamer", "Caldera flame-thrower", "flamer", 1.2, "burn", { cr_parts: 3, gr_fire_sulphur: 2 }, 520, "A foundry's flame-projector made a weapon; whatever it touches burns."],
["a", "wg_fire_plate", "Kiln-plate cuirass", "armor", 0.16, { layer: "armor" }, { cr_steel: 3, gr_fire_obsidian: 1 }, 460, "Blackened plate edged with obsidian."],
["a", "wg_fire_gloves", "Foundry gauntlets", "gloves", 0.06, { hands: "gloves" }, { cr_leather: 2, gr_fire_pumice: 1 }, 200, "Founders' gauntlets that will hold red-hot iron, and a blade."],
["m", "wg_fire_hound", "Kiln hound", "hellhound", 1.9, 0x3A1A12, 2.7, 0, { cr_leather: 3, gr_fire_pumice: 2 }, 2200, "A great black hound of the foundries, warm as an oven."],
["c", "wg_fire_ember", "Banked-ember charm", "ember", 0.3, { gr_fire_obsidian: 1, gr_fire_sulphur: 1 }, 320, "An ember that never goes out."],
["c", "wg_fire_ash", "Ashguard charm", "ward", 0.1, { gr_fire_pumice: 2 }, 260, "A disc of pumice."]
] },
{ id: "stars", place: "Celestara", shop: ["The Nebula Exchange outfitters", "Orrin Vael, outfitter"], forge: ["The Meteoric Forge", "the star-smith"], col: 0x5A6AC8,
gear: [
["w", "wg_star_blade", "Star-iron blade", "beamblade", 1.28, "burn", { cr_parts: 1, gr_stars_meteoric: 2 }, 480, "A blade of meteoric iron that burns with starlight."],
["w", "wg_star_rail", "Celestara rail-lance", "railgun", 1.15, "stagger", { cr_parts: 4, gr_stars_meteoric: 2 }, 640, "A rail-gun built at the Meteoric Forge; its shot throws foes back."],
["a", "wg_star_plate", "Meteoric plate", "armor", 0.16, { layer: "armor" }, { cr_steel: 1, gr_stars_meteoric: 3 }, 480, "Dark plate hammered from fallen stars."],
["a", "wg_star_cloak", "Nebula cloak", "back", 0.06, { back: "cloak" }, { cr_cloth: 3, gr_stars_helium: 1 }, 260, "A cloak of deep blue swirled with violet."],
["m", "wg_star_pegasus", "Midnight star-steed", "pegasus", 2.4, 0x2A2A5A, 3.0, 1, { cr_leather: 3, gr_stars_starcrystal: 1, gr_stars_helium: 2 }, 2800, "A winged horse dark as the sky between stars. It flies."],
["c", "wg_star_comet", "Comet-tail charm", "pace", 0.14, { gr_stars_cometice: 2 }, 300, "A sliver of comet ice."],
["c", "wg_star_crystal", "Star-crystal charm", "night", 0.12, { gr_stars_starcrystal: 1, cr_glass: 1 }, 340, "A shard of a star."]
] },
{ id: "wasteland", place: "Wellspring", shop: ["The Swap Market outfitters", "Dusty Okoro, outfitter"], forge: ["The Scrap Mine forge", "the scrap-smith"], col: 0x8A7A5A,
gear: [
["w", "wg_wst_shotgun", "Wellspring scattergun", "shotgun", 1.28, "stagger", { cr_parts: 2, cr_wood: 1, gr_wasteland_copper: 1 }, 420, "Made from salvage, and made well; its blast knocks foes back."],
["w", "wg_wst_machete", "Salvage machete", "gladius", 1.3, "swift", { cr_steel: 1, cr_scrap: 2 }, 260, "A blade cut from an old leaf-spring; quick and hard to break."],
["a", "wg_wst_jacket", "Road-plate jacket", "armor", 0.14, { layer: "jacket" }, { cr_leather: 2, cr_scrap: 3 }, 360, "A leather jacket sewn with plates of salvaged steel."],
["a", "wg_wst_goggles", "Dust bandana", "helmet", 0.04, { hat: "bandana" }, { cr_glass: 1, cr_leather: 1 }, 140, "A thick bandana over a padded cap, against the grit."],
["m", "wg_wst_boar", "Wellspring tusk-boar", "boar", 1.6, 0x5A4A3A, 2.4, 0, { cr_leather: 3, gr_wasteland_seed: 3 }, 1500, "A big, tough boar that can find water anywhere."],
["c", "wg_wst_water", "Clean-water flask charm", "leech", 0.08, { gr_wasteland_water: 2 }, 220, "A flask that is always a little full."],
["c", "wg_wst_road", "Long-road token", "saddle", 0.12, { cr_scrap: 2 }, 180, "A token from the Swap Market."]
] },
{ id: "desert", place: "Sahmira", shop: ["The Grand Spice Souk outfitters", "Zahir al-Qamar, outfitter"], forge: ["The Glass Kilns forge", "the kiln-smith"], col: 0xD8B070,
gear: [
["w", "wg_des_scimitar", "Sahmira scimitar", "scimitar", 1.3, "swift", { cr_steel: 2, gr_desert_turquoise: 1 }, 400, "A curved blade with a turquoise pommel, quick in the hand."],
["w", "wg_des_bow", "Dune horse-bow", "horsebow", 1.3, "stagger", { cr_wood: 2, cr_leather: 1 }, 340, "A short recurved bow made for shooting from the saddle."],
["a", "wg_des_robe", "Sand-veil robe", "armor", 0.11, { layer: "kimono" }, { cr_cloth: 3, cr_leather: 1 }, 320, "A flowing robe with a padded lining against heat and blades."],
["a", "wg_des_head", "Turquoise-bound headwrap", "helmet", 0.04, { hat: "bandana" }, { cr_cloth: 2, gr_desert_turquoise: 1 }, 180, "A long headwrap fixed with a turquoise pin."],
["m", "wg_des_camel", "Sahmira racing camel", "camel", 2.6, 0xD8B080, 2.6, 0, { cr_leather: 3, gr_desert_dates: 4 }, 1600, "A swift pale camel of the Sahmira races."],
["c", "wg_des_saffron", "Saffron thread charm", "sun", 0.12, { gr_desert_saffron: 1 }, 240, "Worth more than gold, they say."],
["c", "wg_des_salt", "Salt-pan charm", "thorns", 0.2, { gr_desert_salt: 2 }, 200, "A crystal of desert salt."]
] },
{ id: "future", place: "Brightwater", shop: ["The Repair-and-Share Market outfitters", "Ade Sunmola, outfitter"], forge: ["The Maker Halls", "the makers"], col: 0x5AC88A,
gear: [
["w", "wg_fut_disc", "Brightwater smart-disc", "smartdisc", 1.28, "stagger", { cr_parts: 2, gr_future_cell: 1 }, 420, "A returning disc made in the Maker Halls."],
["w", "wg_fut_arc", "Renewable arc caster", "arccaster", 1.2, "drain", { cr_parts: 3, gr_future_cell: 2 }, 520, "Runs on renewed cells; its arc draws vigour back to you."],
["a", "wg_fut_suit", "Bioplastic shell suit", "armor", 0.15, { layer: "uniform" }, { cr_parts: 1, gr_future_bioplastic: 3 }, 420, "Light green-white panels over a soft suit."],
["a", "wg_fut_visor", "Maker's visor", "helmet", 0.05, { hat: "helmet" }, { cr_glass: 1, gr_future_bioplastic: 1 }, 200, "A clear visor with a heads-up display."],
["m", "wg_fut_steed", "Brightwater glide-steed", "pegasus", 2.3, 0xB8C4CC, 3.0, 1, { cr_parts: 4, gr_future_cell: 3 }, 2600, "A steel-grey winged steed with green-lit wings, bred and fitted out in the Maker Halls. It flies.", ["wings:0x5AC88A", "mane:0x5AC88A"]],
["c", "wg_fut_cell", "Renewed-cell charm", "rally", 0.3, { gr_future_cell: 1 }, 240, "A tiny battery on a chain."],
["c", "wg_fut_green", "Tower-green charm", "still", 1.5, { gr_future_greens: 2 }, 200, "A sprig grown in the towers."]
] },
{ id: "underdark", place: "the Underdark", shop: ["The Hall of Anvils' outfitters' gallery", "Ilvara Duskweave, outfitter"], forge: ["The Hall of Anvils", "Thrain Hammerfell"], col: 0x5A4A7A,
gear: [
["w", "wg_ud_blade", "Zhaelvorn shadow-blade", "katana", 1.3, "drain", { cr_steel: 2, hx_silk: 2, hx_deepsilver: 1 }, 500, "A dark-elf blade of deepsilver; each cut draws vigour back to you."],
["w", "wg_ud_crossbow", "Drow hand-crossbow", "crossbow", 1.28, "frost", { cr_wood: 1, cr_steel: 1, hx_silk: 2 }, 400, "A small crossbow strung with spider silk; its bolts slow whatever they strike."],
["a", "wg_ud_mail", "Deepsilver mail", "armor", 0.17, { layer: "armor" }, { cr_steel: 2, hx_deepsilver: 2 }, 560, "Fine mail of pale deepsilver, light and very hard."],
["a", "wg_ud_cloak", "Spider-silk cloak", "back", 0.07, { back: "cloak" }, { hx_silk: 4 }, 300, "A cloak woven by the Zhaelvorn weavers, dark as the deep."],
["m", "wg_ud_ram", "Stonehallow war-ram", "goat", 1.9, 0x6A6460, 2.4, 0, { cr_leather: 3, hx_glowcap: 4 }, 1800, "A great grey ram of the dwarven deep, sure-footed on any ledge."],
["c", "wg_ud_glow", "Glowcap brooch", "light", 18, { hx_glowcap: 3 }, 200, "A brooch of glowing caps."],
["c", "wg_ud_rune", "Hammerfell rune", "thorns", 0.3, { hx_runestone: 1, cr_steel: 1 }, 360, "A rune cut by the dwarven smiths."]
] },
{ id: "race", place: "Pyreline", shop: ["The Pit Lane outfitters", "Rook Calloway, outfitter"], forge: ["The Pyreline build bay", "the pit chief"], col: 0xE86A2A,
gear: [
["w", "wg_race_wrench", "Pit-lane wrench", "mace", 1.28, "stagger", { cr_steel: 2 }, 260, "A big wrench, good for bolts and for brawls."],
["w", "wg_race_flare", "Finish-line flare gun", "flaregun", 1.3, "burn", { cr_parts: 2 }, 280, "A chequered flare pistol; its flare burns."],
["a", "wg_race_suit", "Fireproof racing suit", "armor", 0.12, { layer: "uniform" }, { cr_cloth: 3, cr_leather: 1 }, 340, "A bright racing suit, padded and flame-proof."],
["a", "wg_race_helm", "Pyreline racing helmet", "helmet", 0.07, { hat: "helmet" }, { cr_steel: 1, cr_glass: 1 }, 220, "A full-face racing helmet in team colours."],
["m", "wg_race_lion", "Pyreline sand-lion", "lion", 1.9, 0xE87A3A, 2.9, 0, { cr_leather: 3, cr_cloth: 2 }, 2000, "A long-legged orange lion bred for speed on the planet's dunes."],
["c", "wg_race_flag", "Chequered-flag pin", "stride", 0.15, { cr_cloth: 1, cr_steel: 1 }, 260, "The winner's pin."],
["c", "wg_race_nitro", "Nitro charm", "rally", 0.35, { cr_parts: 1 }, 240, "A tiny blue bottle."]
] },
{ id: "party", place: "Jubilee", shop: ["The Confetti Outfitters", "Fizz Marlowe, outfitter"], forge: ["The Float Builders' Shed", "the float builders"], col: 0xE84AB8,
gear: [
["w", "wg_party_popper", "Jubilee confetti blaster", "blunderbuss", 1.2, "stagger", { cr_parts: 1, cr_cloth: 2 }, 280, "Fires a great burst of confetti and a punch of air that knocks foes back."],
["w", "wg_party_baton", "Parade baton", "quarterstaff", 1.25, "swift", { cr_wood: 1, cr_steel: 1 }, 200, "A twirling baton, quick in the hand."],
["a", "wg_party_jacket", "Sequinned parade jacket", "armor", 0.09, { layer: "jacket" }, { cr_cloth: 3 }, 260, "A dazzling jacket with stiff padded shoulders."],
["a", "wg_party_crown", "Party king's crown", "helmet", 0.03, { hat: "crown" }, { cr_steel: 1 }, 140, "A big gold crown for the night."],
["m", "wg_party_unicorn", "Carnival unicorn", "unicorn", 2.3, 0xE84AB8, 2.7, 0, { cr_cloth: 3, cr_leather: 2 }, 2000, "A bright magenta unicorn from the Jubilee parades."],
["c", "wg_party_dance", "Dancing-shoes charm", "dodge", 0.12, { cr_leather: 1 }, 200, "You never stop dancing."],
["c", "wg_party_glow", "Glow-bracelet charm", "sun", 0.1, { cr_glass: 1 }, 160, "A bracelet that glows like midday all night long."]
] },
{ id: "kidszone", place: "the Kids Zone", shop: ["The Rainbow Toy Stall", "Pip Tumbleberry, stall keeper"], forge: ["The Toy Workshop", "the toy-makers"], col: 0xFFC800, kids: true,
gear: [
["a", "wg_kz_cape", "Rainbow hero cape", "back", 0.03, { back: "cape" }, { cr_cloth: 2 }, 80, "A bright rainbow cape for heroes."],
["m", "wg_kz_bunny", "Hop-along bunny", "rabbit", 1.7, 0xFF8A00, 2.4, 0, { cr_cloth: 2 }, 600, "A big, bouncy orange bunny that loves carrying riders."],
["c", "wg_kz_star", "Gold-star badge", "pace", 0.1, { cr_cloth: 1 }, 60, "A shiny gold star."],
["c", "wg_kz_light", "Night-light charm", "light", 14, { cr_glass: 1 }, 60, "A little star-shaped night light goes with you."]
] },
{ id: "lounge", place: "GiGi's Lounge", shop: ["The Lounge boutique", "the boutique keeper"], forge: ["The Lounge workroom", "the seamstress"], col: 0xC8A0C8, noWeapons: true,
gear: [
["a", "wg_lng_wrap", "Velvet evening wrap", "back", 0.04, { back: "cape" }, { cr_cloth: 3 }, 220, "A deep plum velvet wrap, warm and elegant."],
["m", "wg_lng_tortoise", "Garden tortoise", "turtle", 1.3, 0x6A8A4A, 1.6, 0, { cr_cloth: 2 }, 900, "A calm old garden tortoise who takes the long way round and enjoys every step."],
["c", "wg_lng_pearls", "Grandmother's pearls", "second", 0.3, { cr_glass: 1 }, 240, "A string of pearls that brings comfort."],
["c", "wg_lng_rose", "Tea-rose brooch", "mend", 1.2, { cr_cloth: 1 }, 200, "A brooch with a pink tea-rose."]
] },
{ id: "family", place: "the Family houses", shop: ["The Kinsholm general store", "the shopkeeper"], forge: ["The Toy Mender's", "the toy mender"], col: 0x8AB0E0, noWeapons: true,
gear: [
["a", "wg_fam_jumper", "Family knit jumper", "armor", 0.05, { layer: "sweater" }, { cr_cloth: 3 }, 160, "A thick hand-knitted jumper, made with love."],
["m", "wg_fam_sheep", "Kinsholm big sheep", "sheep", 1.8, 0xF0EAD8, 2.0, 0, { cr_cloth: 2 }, 800, "A huge, fluffy sheep, very patient with riders of every size."],
["c", "wg_fam_photo", "Family-photo locket", "vigour", 0.1, { cr_glass: 1 }, 160, "Everyone you love, close by."],
["c", "wg_fam_lamp", "Porch-light charm", "night", 0.1, { cr_glass: 1 }, 140, "A porch light that is always on for you."]
] },
{ id: "casino", place: "Crescent Reach", shop: ["The Crescent boutique", "Valentin Roche, outfitter"], forge: ["The Great Laundry workroom", "the tailor"], col: 0x2A2A30,
gear: [
["w", "wg_cas_cane", "Sword-cane", "rapier", 1.28, "swift", { cr_steel: 2, cr_wood: 1 }, 420, "A black cane with a slim blade inside."],
["w", "wg_cas_derringer", "Lucky derringer", "revolver", 1.25, "stagger", { cr_parts: 2, cr_steel: 1 }, 380, "A small gold-plated pistol, more punch than it looks."],
["a", "wg_cas_tux", "Armoured dinner jacket", "armor", 0.11, { layer: "suit" }, { cr_cloth: 3, gr_casino_linen: 2 }, 380, "A perfect black dinner jacket with plates sewn into the lining."],
["a", "wg_cas_hat", "High-roller's top hat", "helmet", 0.04, { hat: "tophat" }, { cr_cloth: 2 }, 200, "A tall silk hat with a steel band inside."],
["m", "wg_cas_panther", "Crescent panther", "lion", 1.7, 0x18181C, 2.8, 0, { cr_leather: 3, gr_casino_linen: 2 }, 2400, "A sleek black cat with golden eyes, the casino's pride."],
["c", "wg_cas_dice", "Loaded-dice charm", "keen", 0.12, { cr_glass: 1 }, 300, "Two little dice that always roll high."],
["c", "wg_cas_chip", "Lucky chip", "might", 0.08, { cr_glass: 1 }, 240, "An old chip from the first night."]
] },
{ id: "aurora", place: "Station Aurora", shop: ["The Ring Commissary outfitters", "Officer Kaya Lindqvist"], forge: ["The Fab Shop", "the fabricator"], col: 0xE0E8F0,
gear: [
["w", "wg_aur_stunner", "Aurora stun-baton", "beamblade", 1.22, "frost", { cr_parts: 2, gr_aurora_algae: 1 }, 380, "A security baton whose charge leaves foes slow and stiff."],
["w", "wg_aur_laser", "Station marksman laser", "lasersniper", 1.18, "swift", { cr_parts: 4, cr_glass: 2 }, 620, "A long laser rifle from the station's armoury."],
["a", "wg_aur_suit", "Aurora deck suit", "armor", 0.13, { layer: "uniform" }, { cr_cloth: 3, cr_parts: 1 }, 360, "A pale grey deck suit with impact panels."],
["a", "wg_aur_helm", "EVA helmet", "helmet", 0.07, { hat: "helmet" }, { cr_glass: 2, cr_parts: 1 }, 240, "A white helmet with a gold visor."],
["m", "wg_aur_steed", "Aurora ring-steed", "pegasus", 2.3, 0xE8EEF4, 2.8, 1, { cr_parts: 4, cr_glass: 1 }, 2400, "A white winged steed with ice-blue wings, used to cross the station's great ring. It flies.", ["wings:0x9FD8FF", "mane:0x9FD8FF"]],
["c", "wg_aur_algae", "Algae-culture charm", "ember", 0.2, { gr_aurora_algae: 2 }, 220, "A tiny green culture in a vial."],
["c", "wg_aur_ring", "Spin-ring charm", "saddle", 0.1, { cr_steel: 1 }, 200, "A turning ring."]
] },
{ id: "ares", place: "the Ares Gateway", shop: ["The Red Exchange outfitters", "Dax Marrow, outfitter"], forge: ["The Ares Gateway fab shop", "the fabricator"], col: 0xB84A3A,
gear: [
["w", "wg_ares_axe", "Deimos ice-axe", "battleaxe", 1.27, "stagger", { cr_steel: 2, gr_ares_deimos: 1 }, 360, "A climber's ice-axe made for the moons; its blow sends foes reeling."],
["w", "wg_ares_carbine", "Gateway carbine", "assault", 1.2, "swift", { cr_parts: 4, cr_steel: 1 }, 580, "The Gateway guard's carbine."],
["a", "wg_ares_plate", "Gateway guard plate", "armor", 0.15, { layer: "armor" }, { cr_steel: 3, gr_ares_deimos: 1 }, 440, "Red-and-grey plate of the Gateway guard."],
["a", "wg_ares_boots", "Mag-boots", "boots", 0.05, { shoeKind: "boots" }, { cr_parts: 1, cr_steel: 1 }, 200, "Magnetic boots that hold to any deck."],
["m", "wg_ares_crab", "Deimos crawler-crab", "crab", 1.3, 0xB84A3A, 2.2, 0, { cr_parts: 2, cr_leather: 2, gr_ares_deimos: 2 }, 1600, "A great red crab bred in the Gateway's hangars, steady on any ground."],
["c", "wg_ares_red", "Red-planet charm", "might", 0.1, { gr_ares_deimos: 1 }, 280, "A grain of red dust in glass."],
["c", "wg_ares_suit", "Suit-patch charm", "ward", 0.08, { cr_cloth: 1 }, 200, "A patch from an old suit."]
] },
{ id: "davinci", place: "Leonardo's Italy", shop: ["The armourer of the Old Market, Florence", "Messer Bastiano, armourer"], forge: ["The Bottega's foundry", "the founder"], col: 0xB8843A,
gear: [
["w", "wg_dav_sword", "Milanese steel sword", "longsword", 1.26, "swift", { cr_steel: 3, cr_leather: 1 }, 380, "Forged in the armourers' street of Milan, the finest steel in Italy: light in the hand and quick."],
["w", "wg_dav_xbow", "Borgia engineer's crossbow", "crossbow", 1.3, "stagger", { cr_wood: 2, cr_steel: 2, cr_cloth: 1 }, 440, "A steel-bowed crossbow wound with a crank, from Cesare Borgia's engineers; its heavy bolts knock a foe off balance."],
["a", "wg_dav_half", "Condottiero's half-armour", "armor", 0.16, { layer: "armor" }, { cr_steel: 3, cr_leather: 2 }, 520, "Breastplate and backplate of Milanese plate over a padded doublet, as a captain of fortune wore it."],
["a", "wg_dav_apron", "Painter's leather apron", "armor", 0.09, { layer: "apron" }, { cr_leather: 3, cr_cloth: 1 }, 240, "Thick oxhide, stained with every colour of the Bottega; it has turned more than paint."],
["m", "wg_dav_lion", "Mechanical Lion", "lion", 2.0, 0xB8843A, 2.5, 0, { cr_steel: 4, cr_parts: 3, cr_wood: 1 }, 2200, "Leonardo's clockwork lion, built big enough to ride: bronze plates over a wooden frame, springs and cams inside. It walks with a heavy, even stride, and never tires."],
["c", "wg_dav_harness", "The Great Bird's harness buckle", "feather", 9, { cr_leather: 1, cr_steel: 1 }, 200, "A buckle from the Great Bird's harness, still smelling of starch and pine."],
["c", "wg_dav_stylus", "Silverpoint stylus", "keen", 0.08, { cr_steel: 1, cr_wood: 1 }, 180, "A stylus of silver, worn to Leonardo's grip; an eye that sees sharper finds the gap in a guard."]
] },
{ id: "bard", place: "Shakespeare's London", shop: ["The Sign of the Rapier, Bankside", "Goodwife Joan Hollis, outfitter"], forge: ["The Bankside armoury", "the armourer"], col: 0x8A6A3A,
gear: [
["w", "wg_bard_rapier", "Bankside rapier", "rapier", 1.28, "swift", { cr_steel: 2, cr_leather: 1 }, 380, "A long, slender rapier with a swept hilt, the gallant's sword of 1600: quick in the thrust."],
["w", "wg_bard_dagger", "Parrying dagger", "dagger", 1.16, "guard", { cr_steel: 1, cr_leather: 1 }, 220, "A left-hand dagger with long quillons, for catching a blade: it guards you while you hold it."],
["a", "wg_bard_doublet", "Quilted doublet", "armor", 0.1, { layer: "tunic" }, { cr_cloth: 3, cr_leather: 1 }, 280, "A close-fitting doublet quilted with layers of linen, stiff enough to turn a glancing cut."],
["a", "wg_bard_hat", "Player's plumed hat", "helmet", 0.04, { hat: "brimmed" }, { cr_cloth: 2 }, 150, "A tall-crowned hat with a curling feather, as the leading players of the Globe wear it."],
["m", "wg_bard_palfrey", "Bankside palfrey", "kelpie", 2.0, 0x7A4A2A, 2.3, 0, { cr_leather: 3, cr_cloth: 1 }, 1300, "A gentle chestnut horse with an easy amble, the kind the gallants ride out to the playhouses."],
["c", "wg_bard_wad", "Stage-cannon wad", "ember", 0.12, { cr_cloth: 1 }, 180, "A scrap of wadding from the cannon the Globe fires for battles and kings, still smelling of powder: your blows may set a foe burning."],
["c", "wg_bard_ring", "Fencer's riposte ring", "leech", 0.06, { cr_steel: 1 }, 240, "A plain steel ring from the School of Defence: every touch you land gives you back a little breath."]
] },
{ id: "verne", place: "Jules Verne's World", shop: ["The ship chandler's, Quay of the Voyages", "Mr Cartwright, ship chandler"], forge: ["The Exposition foundry", "the founder"], col: 0x3A4A52,
gear: [
["w", "wg_vrn_rifle", "Nautilus electric rifle", "pulserifle", 1.28, "stagger", { cr_steel: 2, cr_parts: 3 }, 520, "Captain Nemo's air rifle, firing little glass balls charged with electricity: whatever they touch is struck senseless for a moment."],
["w", "wg_vrn_harpoon", "Ned Land's harpoon", "spear", 1.27, "swift", { cr_steel: 2, cr_wood: 2, cr_leather: 1 }, 400, "A whaler's harpoon on an ash shaft, balanced for the throw, as the king of harpooners carried it."],
["a", "wg_vrn_helmet", "Rouquayrol diving helmet", "helmet", 0.08, { hat: "helmet" }, { cr_steel: 2, cr_glass: 2 }, 360, "A copper diving helmet with three round windows, fed from a steel air tank on the back: the Nautilus's diving gear."],
["a", "wg_vrn_coat", "Sealskin sea coat", "armor", 0.12, { layer: "longcoat" }, { cr_leather: 3, cr_cloth: 1 }, 320, "A long coat of sealskin and byssus cloth, made aboard the Nautilus: warm, waterproof and tough."],
["m", "wg_vrn_elephant", "The Steam Elephant", "elephant", 2.4, 0x7A7E86, 2.4, 0, { cr_steel: 5, cr_parts: 4 }, 2600, "An iron elephant driven by steam, from The Steam House: it pulls a house on wheels across India, and carries you anywhere at a steady, unstoppable walk."],
["c", "wg_vrn_lamp", "Ruhmkorff lamp", "light", 16, { cr_parts: 1, cr_glass: 1 }, 220, "A little electric lamp in a leather case, worn at the belt: the lamp Axel carried down to the centre of the earth."],
["c", "wg_vrn_watch", "Fogg's pocket watch", "pace", 0.12, { cr_steel: 1, cr_parts: 1 }, 260, "A plain gold watch, always right to the second: whoever carries it is never late."]
] }
];
var WGEAR = { worlds: {}, byKey: {}, cats: {}, catOf: {}, el: null, open: null, msg: "", busy: false, missing: false, tab: "all",
stall: null, stallFn: null, light: null, vigLast: {}, vigBase: {}, burn: [], ride: null, t: 0, told: {}, rallyT: -9, movedT: 0, secondT: -999 };
var WG_USES = { w: "weapon", a: "armour", m: "mount", c: "charm" };
var WG_GIFT = { burn: "sets whoever it strikes burning for 3 seconds", frost: "chills whoever it strikes, slowing them for 2.5 seconds",
stagger: "throws whoever it strikes back", drain: "gives you back a fifth of every blow as vigour", swift: "strikes a fifth quicker",
guard: "turns 15% of every blow on you while you hold it", mend: "mends harder" };
var WG_FX = { pace: "Your step is {p} quicker.", ward: "Blows on you land {p} softer.", might: "Your blows land {p} harder.", vigour: "You have {n} more vigour in a fight.",
mend: "In a fight you mend {n} vigour a second.", light: "A soft light of your own goes with you (about {n} m).", stride: "Any living mount you ride runs {p} faster.",
feather: "Falls hurt as if you fell {n} m less.",
dodge: "A {p} chance that a blow misses you altogether.", thorns: "Whatever strikes you takes {p} of the blow back.",
keen: "A {p} chance that your blow lands twice as hard.", ember: "A {p} chance that your blow sets a foe burning.",
chill: "A {p} chance that your blow chills a foe, slowing it.", leech: "Every blow you land gives you back {p} of it as vigour.",
second: "Once in a while, when your vigour runs low, you get {p} of it back at once.", rally: "For a few seconds after you are struck, your step is {p} quicker.",
still: "Standing your ground in a fight, you mend {n} vigour a second.", night: "After dark your blows land {p} harder and your step is quicker.",
sun: "By daylight your blows land {p} harder.", saddle: "In the saddle, blows on you land {p} softer." };
var WG_SLOT = { armor: "Body armour", helmet: "Head", gloves: "Hands", boots: "Feet", back: "Back" };
var WG_LOOKCOL = { layer: "layerColor", hat: "hatColor", hands: "accColor", shoeKind: "shoes", back: "backColor" };
var WG_LOOKOFF = { layer: null, hat: "none", hands: null, shoeKind: "shoes", back: null };
function wgEsc(s) { return typeof esc === "function" ? esc(s) : String(s); }
function wgSigned() { return typeof signedIn === "function" && signedIn(); }
function wgKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function wgRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function wgMissingErr(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache|404/i.test(String((e && e.message) || e)); }
function wgSay(h) { if (typeof fgSay === "function")
fgSay(h);
else if (typeof setStatus === "function")
setStatus(h); }
function wgPct(v) { return Math.round(v * 100) + "%"; }
function wgFxText(fx, v) { return (WG_FX[fx] || "").replace("{p}", wgPct(v)).replace("{n}", String(fx === "vigour" ? Math.round(v * 100) : v)); }
function wgHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function wgCatName(W) { return "Made in " + W.place.replace(/, the Singing City$/, ""); }
(function () {
if (typeof FG_DESIGNS === "undefined" || typeof FG_RB === "undefined")
return;
FG_TIERS.local = [["local", "Made here", 1, {}]];
WG_WORLDS.forEach(function (W) {
WGEAR.worlds[W.id] = W;
var cat = wgCatName(W);
WGEAR.cats[cat] = W.id;
WGEAR.catOf[W.id] = cat;
if (FG_CATS.indexOf(cat) < 0)
FG_CATS.splice(1, 0, cat);
var st = "wg_" + W.id;
FG_STATIONS[st] = { name: W.forge[0], who: W.forge[1], st: W.kids || W.noWeapons ? [st] : ["forge", "joinery", st],
sells: ["cr_ore", "cr_coal", "cr_wood", "cr_cloth", "cr_glass", "cr_leather", "cr_rubber", "cr_parts"], verb: "Strike", wg: W.id };
FG_TINT["wgt_" + W.id] = W.col;
W.gear.forEach(function (g) {
var use = WG_USES[g[0]], x = { wg: W.id }, mult = 1, need, price, about, size = 1;
if (g[0] === "w") {
x.arm = g[3];
x.gift = g[5];
mult = g[4];
need = g[6];
price = g[7];
about = g[8];
size = 2;
}
else if (g[0] === "a") {
x.wear = g[3];
x.prot = g[4];
x.look = g[5];
need = g[6];
price = g[7];
about = g[8];
}
else if (g[0] === "m") {
x.base = g[3];
x.h = g[4];
x.col = g[5];
x.pace = g[6];
x.fly = !!g[7];
need = g[8];
price = g[9];
about = g[10];
x.feats = g[11] || null;
x.arch = "wgm_" + g[1].replace(/^wg_/, "");
}
else {
x.fx = g[3];
x.v = g[4];
need = g[5];
price = g[6];
about = g[7];
}
var D = [g[1], cat, g[2], g[2], "local", size, need, [st], use, x];
FG_DESIGNS.push(D);
FG_DB[g[1]] = { key: g[1], cat: cat, label: g[2], item: g[2], tiers: "local", size: size, st: [st], use: use, x: x };
var R = { key: g[1] + ":local", cat: cat, design: g[1], tier: "local", tierName: "Made in " + W.place, mult: mult, label: g[2], item: g[2], need: need, st: [st], use: use, x: x, size: size, price: price, about: about, wg: W.id };
FG_REC.push(R);
FG_RB[R.key] = R;
WGEAR.byKey[g[1]] = { W: W, g: g, R: R, D: FG_DB[g[1]], use: use, x: x, price: price, about: about, name: g[2] };
});
});
wgStationsTie();
if (typeof GR_MB !== "undefined")
Object.keys(GR_MB).forEach(function (k) { if (!FG_MB[k]) {
var m = GR_MB[k];
FG_MB[k] = { kind: k, name: m.name, icon: m.icon || "📦", buys: m.buys, price: m.price, where: "Gathered in its own great city" };
} });
})();
function wgStationsTie() {
[["smithy", "city"], ["warforge", "battle"], ["cinderwell", "underdark"], ["fabshop", "ares"]].forEach(function (p) { var S = FG_STATIONS[p[0]]; if (!S || S.wg)
return; S.wg = p[1]; if (S.st.indexOf("wg_" + p[1]) < 0)
S.st = S.st.concat(["wg_" + p[1]]); });
}
if (typeof craftOpen === "function") {
(function () { var co = craftOpen; craftOpen = function () { try {
wgStationsTie();
}
catch (e) { } return co.apply(this, arguments); }; })();
}
function wgOf(it) { var R = it && FG_RB[it.recipe]; return R && R.wg ? WGEAR.byKey[R.design] : null; }
function wgMine() { return (typeof FG !== "undefined" && FG.items || []).filter(function (it) { return !!wgOf(it); }); }
function wgHave(key) { return wgMine().filter(function (it) { var R = FG_RB[it.recipe]; return R && R.design === key; }).length; }
(function () {
if (typeof fgRegister !== "function")
return;
var fr = fgRegister;
fgRegister = function (it) {
var r = fr.apply(this, arguments), P = wgOf(it);
if (P && P.use === "weapon" && typeof BW_ARMS !== "undefined") {
var A = BW_ARMS["cr" + it.id];
if (!A)
return r;
A.era = "World";
A.wgGift = P.x.gift;
A.wgKey = P.R.design;
if (P.x.gift === "swift" && A.cool)
A.cool = +(A.cool * 0.8).toFixed(3);
if (P.x.gift === "guard")
A.ward = 0.85;
if (P.x.gift === "mend" && A.heal)
A.heal = Math.round(A.heal * 1.25);
var base = BW_ARMS[P.x.arm], bh = base && base.held, hk = "fgH" + it.id;
if (typeof HELD !== "undefined" && bh && HELD[bh]) {
HELD[hk] = function () { var g = HELD[bh](); fgTintHeld(g, "wgt_" + P.W.id, it.colour); return g; };
A.held = hk;
}
}
return r;
};
try {
(FG.items || []).forEach(function (it) { if (wgOf(it))
fgRegister(it); });
}
catch (e) { }
})();
function wgLookKey(x) { return Object.keys(x.look || {})[0]; }
(function () {
if (typeof fgWorn !== "function")
return;
var fw = fgWorn, fe = fgWear;
fgWorn = function (it) {
var P = wgOf(it);
if (!P || P.use !== "armour")
return fw.apply(this, arguments);
var k = wgLookKey(P.x), L = meLook();
return fgWornMap()[P.x.wear] === it.id && !!k && L[k] === P.x.look[k];
};
fgWear = function (id) {
var it = FG.byId[id], P = wgOf(it);
if (!P || P.use !== "armour")
return fe.apply(this, arguments);
var on = !fgWorn(it), L = meLook(), M = fgWornMap(), x = P.x;
L.src = L.src || {};
if (on) {
var c = fgCol(it.colour);
if (c == null)
c = P.W.col;
Object.keys(x.look).forEach(function (k) { L[k] = x.look[k]; if (WG_LOOKCOL[k])
L[WG_LOOKCOL[k]] = c; L.src[k] = "chosen"; });
M[x.wear] = id;
}
else {
Object.keys(x.look).forEach(function (k) { L[k] = WG_LOOKOFF[k] === undefined ? null : WG_LOOKOFF[k]; L.src[k] = "chosen"; });
delete M[x.wear];
}
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof publishMyLook === "function")
try {
publishMyLook();
}
catch (e) { }
try {
save();
}
catch (e) { }
var p = Math.round(Math.min(0.45, fgProt()) * 100);
wgSay(on ? "<b>You put on " + wgEsc(it.name) + ".</b> Your armour turns " + p + "% of every blow in Ironfray and wherever dreamers may fight." : "You take off " + wgEsc(it.name) + ".");
if (typeof fgPaint === "function")
fgPaint();
};
})();
(function () {
if (typeof fgAbout === "function") {
var fa = fgAbout;
fgAbout = function (D) {
var P = D && WGEAR.byKey[D.key];
if (!P)
return fa.apply(this, arguments);
return wgEsc(P.about) + " " + wgUseLine(P, 2);
};
}
if (typeof fgStatLine === "function") {
var fs = fgStatLine;
fgStatLine = function (D, R, q) {
var P = D && WGEAR.byKey[D.key];
if (!P || P.use === "weapon" || P.use === "armour")
return fs.apply(this, arguments);
return fgDim(P.use === "mount" ? (wgMountPace(P, q).toFixed(1) + "× your pace" + (P.x.fly ? ", flies" : "")) : wgFxText(P.x.fx, wgCharmV(P, q)));
};
}
if (typeof fgMakeHtml === "function") {
var fm = fgMakeHtml;
fgMakeHtml = function (S) {
var keep = FG_CATS;
FG_CATS = keep.filter(function (c) { return !WGEAR.cats[c] || (S && S.wg && WGEAR.catOf[S.wg] === c); });
try {
return fm.apply(this, arguments);
}
finally {
FG_CATS = keep;
}
};
}
if (typeof fgPaint === "function") {
var fp = fgPaint;
fgPaint = function () {
var r = fp.apply(this, arguments);
try {
var S = FG.open && FG_STATIONS[FG.st];
if (S && S.wg && FG.el && !FG.work && !FG.el.querySelector("[data-fg='wgshop']")) {
var W = WGEAR.worlds[S.wg], row = FG.el.children[1];
if (W && row) {
var d = document.createElement("div");
d.style.cssText = "margin:4px 0 2px";
d.innerHTML = fgB("wgshop", "🛒 Buy " + wgEsc(W.place.replace(/^the /, "")) + "'s own gear ready-made") + "<span style='font-size:11.5px;opacity:.7'> or make it here: <b>" + wgEsc(WGEAR.catOf[W.id]) + "</b></span>";
row.parentNode.insertBefore(d, row.nextSibling);
}
}
}
catch (e) { }
return r;
};
}
if (typeof fgClick === "function") {
var fc = fgClick;
fgClick = function (a, t) {
if (a === "wgshop") {
var S = FG_STATIONS[FG.st];
craftClose();
if (S && S.wg)
wgOutfit(S.wg);
return;
}
return fc.apply(this, arguments);
};
}
})();
function wgUseLine(P, q) { return __ZC(346, 0, this, arguments, new.target); }
var WG_MOUNTS = {};
(function () {
if (typeof CREATURE === "undefined" || typeof KIT === "undefined")
return;
Object.keys(WGEAR.byKey).forEach(function (k) {
var P = WGEAR.byKey[k];
if (P.use !== "mount")
return;
var B = CREATURE[P.x.base], K = KIT[P.x.base];
if (!B || !K)
return;
var feats = (P.x.feats || B.feats || []).filter(function (f) { return !/^aura:|^glow$|^eyes:red$/.test(f); });
var o = {};
for (var q in B)
o[q] = B[q];
o.key = P.x.arch;
o.col = P.x.col;
o.feats = feats;
o.roam = 0;
o.night = 0;
o.big = 0;
o.realm = null;
o.wgBase = P.x.base;
CREATURE[P.x.arch] = o;
var kit = {};
for (var q2 in K)
kit[q2] = K[q2];
kit.big = false;
kit.wgMount = 1;
KIT[P.x.arch] = kit;
if (P.x.fly && typeof RIDE_FLIES !== "undefined")
RIDE_FLIES[P.x.arch] = 1;
WG_MOUNTS[P.x.arch] = P;
});
})();
(function () {
if (typeof archList === "function") {
var al = archList;
archList = function () { return al.apply(this, arguments).split(", ").filter(function (k) { return !/^wgm_/.test(k); }).join(", "); };
}
})();
function wgMountReady(arch) { return __ZC(346, 1, this, arguments, new.target); }
function wgMountFix(g, arch) { return __ZC(346, 2, this, arguments, new.target); }
(function () {
if (typeof presenceGroupFor === "function") {
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var k = null;
try {
k = row && !row.away && row.look && row.look.ride;
if (k && WG_MOUNTS[k])
wgMountReady(k);
else
k = null;
}
catch (e) { }
var g = pg.apply(this, arguments);
try {
if (k && g && g.children.length) {
var v = g.children[g.children.length - 1];
wgMountFix(v, k);
if (typeof modelDress === "function")
modelDress(v, { id: "__pride_" + row.user_id, archetype: k, attrs: {}, solid: true, placed: true });
g.userData.mount = v;
g.children.forEach(function (c) { if (c !== v)
wgAstride(c); });
}
}
catch (e) { }
return g;
};
}
if (typeof rideTick === "function") {
var rt = rideTick;
rideTick = function (dt) {
var r = rt.apply(this, arguments);
try {
if (typeof rideG !== "undefined" && rideG && rideArch && WG_MOUNTS[rideArch])
wgMountFix(rideG, rideArch);
}
catch (e) { }
return r;
};
}
})();
var WG_GLB = { stag: { a: "stag", f: "quaternius/animated-animals/stag.glb" },
pegasus: { a: "pegasus", f: "quaternius/animated-animals/horse_white.glb", t: 0.7, bd: "pegasus" },
unicorn: { a: "unicorn", f: "quaternius/animated-animals/horse_white.glb", t: 0.7, bd: "unicorn" },
kelpie: { a: "horse", f: "quaternius/animated-animals/horse_white.glb", t: 0.7 },
nightmare: { a: "horse", f: "quaternius/animated-animals/horse_white.glb", t: 0.75 },
whale: { a: "whale", f: "quaternius/animated-fish/whale.glb", t: 0.6 },
dolphin: { a: "dolphin", f: "quaternius/animated-fish/dolphin.glb" },
cow: { a: "cow", f: "quaternius/animated-animals/cow.glb" },
fox: { a: "fox", f: "quaternius/animated-animals/fox.glb" },
camel: { a: "camel", f: "quaternius/farm-animals/llama.glb", t: 0.35 },
sheep: { a: "sheep", f: "quaternius/farm-animals/sheep.glb" },
hellhound: { a: "wolf", f: "quaternius/animated-animals/husky.glb", t: 0.8 } };
function wgGlbOf(spec) { var o = spec && typeof CREATURE !== "undefined" && CREATURE[spec.archetype]; return o && o.wgBase && WG_MOUNTS[spec.archetype] ? WG_GLB[o.wgBase] || null : null; }
(function () {
if (typeof modelEntry === "function") {
var me = modelEntry;
modelEntry = function (spec) {
var G = wgGlbOf(spec), M = typeof MODELS !== "undefined" && MODELS.man && MODELS.man.a;
if (G && M && M[G.a]) {
var e = {};
for (var k in M[G.a])
e[k] = M[G.a][k];
e.f = G.f;
e.all = 1;
if (G.t)
e.t = G.t;
else
delete e.t;
return e;
}
return me.apply(this, arguments);
};
}
if (typeof modelSwap === "function") {
var ms = modelSwap;
modelSwap = function (g, spec, e, F) {
var G = wgGlbOf(spec);
if (G) {
var arch = spec.archetype, a = {}, k;
for (k in spec.attrs || {})
a[k] = spec.attrs[k];
a.c = CREATURE[arch].col;
try {
wgMountFix(g, arch);
}
catch (x) { }
var s2 = {};
for (k in spec)
s2[k] = spec[k];
s2.attrs = a;
if (G.bd)
s2.archetype = G.bd;
spec = s2;
}
return ms.call(this, g, spec, e, F);
};
}
})();
function wgAstride(fig) { return __ZC(346, 3, this, arguments, new.target); }
(function () {
if (typeof hdfMotion !== "function")
return;
var hm = hdfMotion;
hdfMotion = function (E, dt) {
var r = hm.apply(this, arguments);
try {
if (r !== "sit" && E && E.g) {
if (E.g.userData.me && typeof rideArch !== "undefined" && rideArch && walkMode && !store.inside && !(typeof DRIVE !== "undefined" && DRIVE.on))
return "sit";
for (var o = E.g, n = 0; o && n < 8; o = o.parent, n++)
if (o.userData && o.userData.mount)
return "sit";
}
}
catch (e) { }
return r;
};
})();
function wgMountPace(P, q) { return +(P.x.pace * Math.min(1.15, fgQ(q || 2))).toFixed(2); }
function wgRiding(it) { return !!(WGEAR.ride && WGEAR.ride.id === it.id && typeof riding !== "undefined" && riding === WGEAR.ride.name); }
function wgRide(id) { return __ZC(346, 4, this, arguments, new.target); }
function wgDismount(quiet) { return __ZC(346, 5, this, arguments, new.target); }
function wgRideTick() {
var R = WGEAR.ride;
if (!R)
return;
if (typeof riding !== "undefined" && riding !== R.name) {
WGEAR.ride = null;
return;
}
if (store.inside || (typeof DRIVE !== "undefined" && DRIVE.on))
wgDismount(true);
}
function wgCharmV(P, q) { var v = P.x.v * fgQ(q || 2); return P.x.fx === "light" || P.x.fx === "feather" ? Math.round(v) : P.x.fx === "mend" || P.x.fx === "still" ? +v.toFixed(1) : +Math.min(0.5, v).toFixed(3); }
function wgCharmIds() { if (!Array.isArray(store.wgCharms))
store.wgCharms = []; return store.wgCharms; }
function wgCharmOn(it) { return wgCharmIds().indexOf(it.id) > -1; }
function wgCharm(id) { return __ZC(346, 6, this, arguments, new.target); }
function wgFx(fx) {
var best = 0, C = wgCharmIds();
for (var i = 0; i < C.length; i++) {
var it = FG.byId[C[i]], P = wgOf(it);
if (!P || P.x.fx !== fx)
continue;
var v = wgCharmV(P, it.quality);
if (v > best)
best = v;
}
return best;
}
function wgCharmCheck() {
if (!FG.loaded && !FG.items.length)
return;
var C = wgCharmIds();
for (var i = C.length - 1; i >= 0; i--)
if (!FG.byId[C[i]])
C.splice(i, 1);
}
if (typeof FG_USE !== "undefined") {
FG_USE.mount = { icon: "🐎", label: function (it) { return wgRiding(it) ? "Get off" : "Ride"; }, act: function (it) { return wgRiding(it) ? "Get off" : "Ride it"; },
run: function (id) { var r = wgRide(id); if (r && typeof craftClose === "function" && FG.open)
craftClose(); return r; } };
FG_USE.charm = { icon: "🔮", label: function (it) { return wgCharmOn(it) ? "Take off" : "Wear"; }, act: function (it) { return wgCharmOn(it) ? "Take off" : "Wear it"; },
run: function (id) { return wgCharm(id); } };
}
function wgHeld() { var k = typeof bwHeldKey === "function" ? bwHeldKey() : null; return k && typeof BW_ARMS !== "undefined" ? BW_ARMS[k] : null; }
function wgHeldItem() { var A = wgHeld(); return A && A.crafted && FG.byId[A.crafted] ? FG.byId[A.crafted] : null; }
function wgLiving(arch) { return !!arch && ((typeof CREATURE !== "undefined" && !!CREATURE[arch]) || (typeof PT_MOUNTS !== "undefined" && PT_MOUNTS.indexOf(arch) > -1)); }
function wgBeastFight() { return typeof DGB !== "undefined" && DGB.engaged > 0 && typeof DGR !== "undefined"; }
function wgHp() { if (typeof WLD !== "undefined" && WLD.on === "battle" && typeof BW !== "undefined")
return BW; if (typeof DGR !== "undefined" && ((typeof dgrFightHere === "function" && dgrFightHere()) || wgBeastFight()))
return DGR; return null; }
function wgInSaddle() { return typeof riding !== "undefined" && !!riding; }
function wgDark() { try {
return typeof daylight === "function" && typeof dreamHour === "function" && daylight(dreamHour()) < 0.35;
}
catch (e) {
return false;
} }
function wgMight() { var n = wgDark(); return wgFx("might") + (n ? wgFx("night") : wgFx("sun")); }
function wgWard() { return Math.min(0.5, wgFx("ward") + (wgInSaddle() ? wgFx("saddle") : 0)); }
function wgPaceFx() { return wgFx("pace") + (WGEAR.t < WGEAR.rallyT ? wgFx("rally") : 0) + (wgDark() ? wgFx("night") * 0.5 : 0); }
function wgChance(fx) { var v = wgFx(fx); return v > 0 && Math.random() < v; }
function wgDodged() { if (!wgChance("dodge"))
return false; if (typeof setStatus === "function")
setStatus("You slip aside: the blow misses you. <span style='opacity:.7'>(your charm)</span>"); return true; }
function wgStruck() { if (wgFx("rally"))
WGEAR.rallyT = WGEAR.t + 4; }
function wgKeen(d) { return wgChance("keen") ? d * 2 : d; }
function wgLeech(H, dealt) { var v = wgFx("leech"); if (v && H && !H.downT)
H.hp = Math.min(H.max, H.hp + dealt * v); }
(function () {
if (typeof walkBy === "function") {
var wb = walkBy;
walkBy = function (mx, mz) {
try {
if (mx || mz)
WGEAR.movedT = WGEAR.t;
var m = 1;
if (typeof riding !== "undefined" && riding && typeof rideArch !== "undefined" && rideArch) {
if (wgLiving(rideArch))
m += wgFx("stride");
}
else if (!(typeof DRIVE !== "undefined" && DRIVE.on))
m += wgPaceFx();
if (m !== 1) {
mx *= m;
mz *= m;
}
}
catch (e) { }
return wb.call(this, mx, mz);
};
}
if (typeof fallLanded === "function") {
var fl = fallLanded;
fallLanded = function (m) {
var f = wgFx("feather");
if (f > 0) {
m = Math.round((m - f) * 10) / 10;
if (m < 4) {
if (typeof setStatus === "function")
setStatus("You land lightly. <span style='opacity:.7'>(your charm)</span>");
return;
}
}
return fl.call(this, m);
};
}
if (typeof dgrRpc === "function") {
var dr = dgrRpc;
dgrRpc = function (n, a) {
try {
if (n === "danger_send" && a && a.p_body && a.p_body.t === "hit" && !a.p_body.wg) {
var d = +a.p_body.d || 10, it = wgHeldItem(), R = it && FG_RB[it.recipe];
if (R)
d *= (R.mult || 1) * fgQ(it.quality);
d = wgKeen(d * (1 + wgMight()));
a.p_body.d = Math.max(1, Math.min(25, Math.round(d)));
a.p_body.wg = 1;
var A = wgHeld();
if (A && A.wgGift === "drain" && typeof DGR !== "undefined" && !DGR.downT)
DGR.hp = Math.min(DGR.max, DGR.hp + a.p_body.d * 0.2);
if (typeof DGR !== "undefined")
wgLeech(DGR, a.p_body.d);
}
}
catch (e) { }
return dr.apply(this, arguments);
};
}
if (typeof dgrHurt === "function") {
var dh = dgrHurt;
dgrHurt = function (d, from, name) {
try {
if (+d > 0 && wgDodged())
return;
d = +d || 0;
var p = typeof fgProt === "function" ? fgProt() : 0, A = wgHeld();
d *= (1 - Math.min(0.45, p)) * (1 - wgWard());
if (A && A.ward)
d *= A.ward;
d = Math.round(d * 10) / 10;
wgStruck();
}
catch (e) { }
return dh.call(this, d, from, name);
};
}
if (typeof bwStrikeFoe === "function") {
var bs = bwStrikeFoe;
bwStrikeFoe = function (o, dmg, ex) {
if (ex && (ex.wg || ex.ra))
return bs.apply(this, arguments);
try {
dmg = wgKeen(dmg * (1 + wgMight()));
var A = wgHeld(), g = A && A.wgGift;
ex = ex || {};
if (g === "frost" || wgChance("chill"))
ex.slow = Math.max(ex.slow || 0, 2.5);
if (g === "stagger")
ex.knock = Math.max(ex.knock || 0, 3);
if ((g === "burn" || wgChance("ember")) && o && (o.F || o.M))
wgBurn(o, dmg, "bw");
if (typeof BW !== "undefined") {
if (g === "drain" && !BW.downT)
BW.hp = Math.min(BW.max, BW.hp + dmg * 0.2);
wgLeech(BW, dmg);
}
}
catch (e) { }
return bs.call(this, o, dmg, ex);
};
}
if (typeof bwHurtMe === "function") {
var bh = bwHurtMe;
bwHurtMe = function (dmg, src, raw) {
try {
if (dmg > 0 && typeof WLD !== "undefined" && WLD.on === "battle" && typeof BW !== "undefined" && !BW.downT && wgDodged())
return;
var w = wgWard();
if (w)
dmg *= 1 - w;
wgStruck();
var t = wgFx("thorns");
if (t && src && (src.F || src.M))
bwStrikeFoe(src, dmg * t, { wg: 1 });
}
catch (e) { }
return bh.call(this, dmg, src, raw);
};
}
})();
function wgBeastsTie() {
if (WGEAR.beastsTied || typeof dgbHurt !== "function" || typeof dgbStrike !== "function" || typeof dgbMyDmg !== "function")
return;
WGEAR.beastsTied = true;
var md = dgbMyDmg;
dgbMyDmg = function () {
var d = md.apply(this, arguments);
try {
var A = wgHeld();
if (A && A.crafted && A.dmg)
d = Math.max(d, Math.round(A.dmg * (0.9 + Math.random() * 0.3)));
d = Math.round(wgKeen(d * (1 + wgMight())));
}
catch (e) { }
return d;
};
var st = dgbStrike;
dgbStrike = function (B) {
var before = B && B.st !== "dead" ? B.hp : null, r = st.apply(this, arguments);
try {
if (before != null && B.hp < before) {
var dealt = before - B.hp, A = wgHeld(), g = A && A.wgGift;
if (g === "drain" && !DGR.downT)
DGR.hp = Math.min(DGR.max, DGR.hp + dealt * 0.2);
wgLeech(DGR, dealt);
if (B.st !== "dead") {
if (g === "frost" || g === "stagger" || wgChance("chill"))
B.cool = Math.max(B.cool || 0, 0) + 1.5;
if (g === "burn" || wgChance("ember"))
wgBurn(B, dealt, "dgb");
}
}
}
catch (e) { }
return r;
};
var bh = dgbHurt;
dgbHurt = function (d, name) {
try {
if (+d > 0 && !(typeof DGR !== "undefined" && DGR.downT) && wgDodged())
return;
var p = typeof fgProt === "function" ? fgProt() : 0, A = wgHeld();
d = (+d || 0) * (1 - Math.min(0.45, p)) * (1 - wgWard());
if (A && A.ward)
d *= A.ward;
d = Math.round(d);
wgStruck();
var t = wgFx("thorns");
if (t && d > 0 && typeof DGB !== "undefined") {
var L = typeof dgrMeLocal === "function" ? dgrMeLocal() : null, near = null, nd = 6;
if (L)
DGB.on.forEach(function (B) { if (B.st === "dead")
return; var q = Math.hypot(B.x - L.x, B.z - L.z); if (q < nd) {
nd = q;
near = B;
} });
if (near && typeof dgbSpellHit === "function")
dgbSpellHit(near, Math.max(1, Math.round(d * t)));
}
}
catch (e) { }
return bh.call(this, d, name);
};
}
function wgBurn(o, dmg, kind) {
for (var i = 0; i < WGEAR.burn.length; i++)
if (WGEAR.burn[i].o === o || (kind === "bw" && WGEAR.burn[i].o.F && WGEAR.burn[i].o.F === o.F && WGEAR.burn[i].o.M === o.M)) {
WGEAR.burn[i].n = 3;
return;
}
WGEAR.burn.push({ o: o, d: Math.max(1, dmg / 6), n: 3, t: 1, kind: kind });
}
function wgBurnTick(dt) {
if (!WGEAR.burn.length)
return;
var battle = typeof WLD !== "undefined" && WLD.on === "battle";
for (var i = WGEAR.burn.length - 1; i >= 0; i--) {
var B = WGEAR.burn[i], o = B.o;
if (B.kind === "bw" && !battle) {
WGEAR.burn.splice(i, 1);
continue;
}
if (B.kind === "dgb" && !(typeof DGB !== "undefined" && DGB.on.indexOf(o) > -1)) {
WGEAR.burn.splice(i, 1);
continue;
}
B.t -= dt;
if (B.t > 0)
continue;
B.t = 1;
B.n--;
var dead = B.kind === "dgb" ? o.st === "dead" : o.F ? o.F.st === "dead" : o.M ? !o.M.alive : true;
if (!dead)
try {
if (B.kind === "dgb") {
if (typeof dgbSpellHit === "function")
dgbSpellHit(o, Math.max(1, Math.round(B.d)));
}
else
bwStrikeFoe(o, B.d, { wg: 1 });
if (typeof raFx === "function")
raFx(o.x, (o.y || 0) + 1, o.z, 0xE8783A, 8, "swirl");
}
catch (e) { }
if (dead || B.n <= 0)
WGEAR.burn.splice(i, 1);
}
}
function wgVigTick() {
var add = Math.round(wgFx("vigour") * 100);
[["dgr", typeof DGR !== "undefined" ? DGR : null], ["bw", typeof WLD !== "undefined" && WLD.on === "battle" && typeof BW !== "undefined" ? BW : null]].forEach(function (p) {
var k = p[0], O = p[1];
if (!O || typeof O.max !== "number")
return;
if (WGEAR.vigLast[k] == null || O.max !== WGEAR.vigLast[k])
WGEAR.vigBase[k] = O.max;
var want = WGEAR.vigBase[k] + add;
if (O.max !== want) {
O.max = want;
if (O.hp > O.max)
O.hp = O.max;
}
WGEAR.vigLast[k] = want;
});
}
function wgMendTick(dt) {
var m = wgFx("mend") + (WGEAR.t - WGEAR.movedT > 1.2 ? wgFx("still") : 0);
if (!m)
return;
var H = wgHp();
if (!H || H.downT || !(H.hp < H.max))
return;
H.hp = Math.min(H.max, H.hp + m * dt);
}
function wgSecondTick() {
var v = wgFx("second");
if (!v || WGEAR.t < WGEAR.secondT)
return;
var H = wgHp();
if (!H || H.downT || !(H.hp > 0) || H.hp >= H.max * 0.25)
return;
H.hp = Math.min(H.max, H.hp + H.max * v);
WGEAR.secondT = WGEAR.t + 90;
if (typeof setStatus === "function")
setStatus("<b>A second wind!</b> Vigour " + Math.round(H.hp) + " of " + H.max + ". <span style='opacity:.7'>(your charm)</span>");
}
function wgLightTick() {
var r = wgFx("light");
if (!r) {
if (WGEAR.light)
WGEAR.light.intensity = 0;
return;
}
if (!WGEAR.light) {
if (typeof THREE === "undefined" || typeof scene === "undefined")
return;
WGEAR.light = new THREE.PointLight(0xFFE2B0, 0, r, 1.6);
scene.add(WGEAR.light);
}
var P = camera.position;
WGEAR.light.position.set(P.x, P.y + 0.6, P.z);
WGEAR.light.distance = r;
WGEAR.light.intensity = store.inside ? 0.55 : 0.9;
}
function wgTick(dt) {
WGEAR.t += dt;
wgRideTick();
wgBurnTick(dt);
wgMendTick(dt);
wgLightTick();
if (WGEAR.t - (WGEAR.vigT || 0) > 0.5) {
WGEAR.vigT = WGEAR.t;
wgVigTick();
wgCharmCheck();
wgSecondTick();
wgBeastsTie();
}
if (typeof wgPlaceTick === "function")
wgPlaceTick(dt);
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
wgTick(dt);
}
catch (e) {
if (window.console && !WGEAR.warn) {
WGEAR.warn = 1;
console.warn("[world gear]", e);
}
} };
}
})();
var WG_GROUPS = [["weapon", "⚔️ Weapons"], ["armour", "🛡️ Armour"], ["mount", "🐎 Mount"], ["charm", "🔮 Charms"]];
function wgPanel() { return __ZC(346, 7, this, arguments, new.target); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!WGEAR.open; }, close: function () { wgClose(); } });
function wgB(act, label, on) { return "<button class='btn' data-wg='" + wgEsc(act) + "' style='margin:3px 4px 3px 0;" + (on ? "border-color:#C8D4F8;color:#F0F4FF" : "") + "'>" + label + "</button>"; }
function wgOutfit(id) { return __ZC(346, 8, this, arguments, new.target); }
function wgClose() { WGEAR.open = null; if (WGEAR.el)
WGEAR.el.style.display = "none"; }
function wgPaint() { return __ZC(346, 9, this, arguments, new.target); }
function wgClick(a) {
var p = a.split(":");
if (a === "close")
return wgClose();
if (p[0] === "tab") {
WGEAR.tab = p[1];
WGEAR.msg = "";
wgPaint();
return;
}
if (p[0] === "buy")
return wgBuy(p[1]);
}
function wgBuy(key) { return __ZC(346, 10, this, arguments, new.target); }
function wgRealmPlaces(R) { return __ZC(346, 11, this, arguments, new.target); }
(function () {
if (typeof grFeatures === "function") {
var gf = grFeatures;
grFeatures = function (G, I, R, site) {
var r = gf.apply(this, arguments);
try {
var W = R && WGEAR.worlds[R.id];
if (W && !R.off)
wgCityRooms(G, I, R, site, W);
}
catch (e) {
if (window.console)
console.warn("[world gear] city", e);
}
return r;
};
}
if (typeof grDoes === "function") {
var gd = grDoes;
grDoes = function (R) {
var out = gd.apply(this, arguments);
try {
var W = R && WGEAR.worlds[R.id];
if (W && !R.off) {
var pl = wgRealmPlaces(R);
out.splice(Math.min(2, out.length), 0, ["🛡️", R.name + "'s own gear", "Armour, weapons, a mount and charms found nowhere else: buy them ready-made from " + wgEsc(W.shop[1]) + " in " + wgEsc(pl.shop || "the market") +
", or make them yourself at the forge in " + wgEsc(pl.forge || "the works") + "."]);
}
}
catch (e) { }
return out;
};
}
})();
function wgCityRooms(G, I, R, site, W) { return __ZC(346, 12, this, arguments, new.target); }
(function () {
if (typeof hxKeeperCard !== "function")
return;
var kc = hxKeeperCard;
hxKeeperCard = function (T, opts) {
try {
var n = String(T && T.name || "");
if (/^Thrain Hammerfell|^Velra, a web-weaver/.test(n))
opts = opts.concat([["🛡️ The Underdark's own gear", "Deepsilver mail, shadow-blades, war-rams and charms", function () { wgOutfit("underdark"); }]]);
}
catch (e) { }
return kc.call(this, T, opts);
};
})();
var WG_STALL_WORLDS = { party: 1, kidszone: 1, lounge: 1, family: 1, casino: 1, race: 1, station: 1 };
function wgHere() { try {
return typeof dgrWhere === "function" ? dgrWhere() : null;
}
catch (e) {
return null;
} }
function wgStallSpot(W, A) { return __ZC(346, 13, this, arguments, new.target); }
function wgStallBuild(W, id) { return __ZC(346, 14, this, arguments, new.target); }
function wgPlaceTick(dt) {
var on = typeof WLD !== "undefined" && WLD.on && WG_STALL_WORLDS[WLD.on] && WLD.w && WLD.w.g;
if (!on) {
if (WGEAR.stallFn && typeof WLD !== "undefined" && WLD.promptFn === WGEAR.stallFn)
worldPrompt(null);
return;
}
var W = WLD.w, id = wgHere();
if (!WGEAR.worlds[id])
return;
var S = WGEAR.stall;
if (!S || S.G !== W.g || S.id !== id) {
if (S && S.g && S.g.parent && S.G === W.g)
S.g.parent.remove(S.g);
if (WGEAR.stallTry === W.g.uuid + id)
return;
WGEAR.stallTry = W.g.uuid + id;
S = WGEAR.stall = wgStallBuild(W, id);
if (!S)
return;
}
if (W.solids && W.solids.indexOf(S.solid) < 0)
W.solids.push(S.solid);
if (!walkMode || store.inside)
return;
var L = worldLocal(), d = Math.hypot(L.x - S.x, L.z - S.z);
if (d < 3.2) {
if (!WGEAR.stallFn)
WGEAR.stallFn = function () { wgOutfit(WGEAR.stall && WGEAR.stall.id); };
worldPrompt("<b>🛒 " + wgEsc(WGEAR.worlds[S.id].shop[0]) + "</b> · <b>press E</b> (or tap here) to see " + wgEsc(WGEAR.worlds[S.id].place) + "'s own gear", WGEAR.stallFn);
}
else if (WGEAR.stallFn && WLD.promptFn === WGEAR.stallFn)
worldPrompt(null);
}
(function () {
if (typeof vrpMenuItems !== "function")
return;
var vm = vrpMenuItems;
vrpMenuItems = function () {
var items = vm.apply(this, arguments);
try {
var mine = wgMine(), sub = [];
mine.forEach(function (it) {
var P = wgOf(it), D = P.D, U = typeof FG_USE !== "undefined" && FG_USE[P.use];
if (U)
sub.push({ t: U.icon + " " + U.label(it) + ": " + it.name, run: function () { U.run(it.id); } });
else if (P.use === "armour")
sub.push({ t: "🛡️ " + (fgWorn(it) ? "Take off" : "Wear") + ": " + it.name, run: function () { fgWear(it.id); } });
else if (P.use === "weapon")
sub.push({ t: "⚔️ Hold: " + it.name, run: function () { fgHold(it.id); } });
});
if (WGEAR.open) {
var W = WGEAR.worlds[WGEAR.open];
W.gear.slice().reverse().forEach(function (x) { var P = WGEAR.byKey[x[1]]; sub.unshift({ t: "🛒 Buy " + P.name + " (" + P.price + " gold)", run: function () { wgBuy(x[1]); } }); });
}
if (sub.length) {
sub.unshift({ t: "◀ All of the menu", keep: true, run: function () { vrpMenuSection(null); } });
items.unshift({ t: (WGEAR.open ? "🛒 " + WGEAR.worlds[WGEAR.open].shop[0] : "🎒 Your world gear") + " ▸", keep: true, run: function () { vrpMenuSection({ t: WGEAR.open ? WGEAR.worlds[WGEAR.open].shop[0] : "Your world gear", items: sub }); } });
}
}
catch (e) { }
return items;
};
})();
var WG_GEM = { pace: 0x7FE0FF, ward: 0x8AA8FF, might: 0xFF6A4A, vigour: 0xFF7FA8, mend: 0x7FFFA8, light: 0xFFE79A, stride: 0xD8A86A, feather: 0xE8F4FF,
dodge: 0xB0FFE0, thorns: 0xC0503A, keen: 0xFFD24A, ember: 0xFF8A2A, chill: 0x9FE8FF, leech: 0xC02A60, second: 0xFFB0D0, rally: 0xFFA040,
still: 0x8AD8C0, night: 0x7A6AF0, sun: 0xFFC83A, saddle: 0xB8865A };
function wgMat(c, o) {
o = o || {};
return new THREE.MeshStandardMaterial({ color: c, metalness: o.m != null ? o.m : 0.45, roughness: o.r != null ? o.r : 0.38,
emissive: o.e != null ? o.e : 0x000000, emissiveIntensity: o.ei || 1, transparent: !!o.t, opacity: o.t || 1, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
}
function wgMesh(geo, mat, x, y, z, g) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (g)
g.add(m); return m; }
function wgCharmModel(P) { return __ZC(346, 15, this, arguments, new.target); }
function wgTrimOf(W) {
var silver = /moon|pluto|frozen|mirror|aurora|void|neptune|uranus|mercury|sea/.test(W.id);
return { metal: wgMat(silver ? 0xD4D8E0 : 0xD8B24A, { m: 0.65, r: 0.28 }), dark: wgMat(silver ? 0x8A909C : 0x8A6A2A, { m: 0.6, r: 0.4 }) };
}
function wgFinger(r, l) { return THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(r, l, 4, 10) : new THREE.CylinderGeometry(r, r, l + r, 10); }
function wgArmourModel(P) { return __ZC(346, 16, this, arguments, new.target); }
function wgPicModel(key) { return __ZC(346, 17, this, arguments, new.target); }
function wgPicBox(g, flat) { return __ZC(346, 18, this, arguments, new.target); }
function wgPicFrame(m) { return __ZC(346, 19, this, arguments, new.target); }
var WG_PIC_YAW = { whale: Math.PI / 2, crab: 0.15, scorpion: 0.15, turtle: 0.2 };
function wgPicWarm() { return __ZC(346, 20, this, arguments, new.target); }
function wgPicSheet(keys, cell, cols) { return __ZC(346, 21, this, arguments, new.target); }
function wgPicHtml(key, px) { return __ZC(346, 22, this, arguments, new.target); }
if (typeof FG_PIC !== "undefined")
FG_PIC = function (design, px) { return WGEAR.byKey[design] ? wgPicHtml(design, px) : ""; };
var WG_PICS = { "sheets": [{ "file": "0.webp?v=2115f09", "cols": 8, "cell": 128 }, { "file": "1.webp?v=d15e9c0", "cols": 8, "cell": 128 }, { "file": "2.webp?v=d0293b3", "cols": 8, "cell": 128 }, { "file": "3.webp?v=5b0a462", "cols": 8, "cell": 128 }, { "file": "4.webp?v=ff57fb3", "cols": 8, "cell": 128 }], "at": { "wg_city_sabre": [0, 0], "wg_city_xbow": [0, 1], "wg_city_coat": [0, 2], "wg_city_helm": [0, 3], "wg_city_elk": [0, 4], "wg_city_lamp": [0, 5], "wg_city_coin": [0, 6], "wg_moon_pick": [0, 7], "wg_moon_pulse": [0, 8], "wg_moon_suit": [0, 9], "wg_moon_visor": [0, 10], "wg_moon_hare": [0, 11], "wg_moon_feather": [0, 12], "wg_moon_earth": [0, 13], "wg_mars_cutter": [0, 14], "wg_mars_rifle": [0, 15], "wg_mars_duster": [0, 16], "wg_mars_gloves": [0, 17], "wg_mars_crawler": [0, 18], "wg_mars_iron": [0, 19], "wg_mars_dust": [0, 20], "wg_merc_maul": [0, 21], "wg_merc_flare": [0, 22], "wg_merc_shield": [0, 23], "wg_merc_boots": [0, 24], "wg_merc_tortoise": [0, 25], "wg_merc_cool": [0, 26], "wg_merc_quick": [0, 27], "wg_venus_rapier": [0, 28], "wg_venus_fan": [0, 29], "wg_venus_gown": [0, 30], "wg_venus_cape": [0, 31], "wg_venus_pegasus": [0, 32], "wg_venus_morning": [0, 33], "wg_venus_veil": [0, 34], "wg_pluto_axe": [0, 35], "wg_pluto_ray": [0, 36], "wg_pluto_parka": [0, 37], "wg_pluto_hood": [0, 38], "wg_pluto_bear": [0, 39], "wg_pluto_heart": [0, 40], "wg_pluto_lamp": [0, 41], "wg_jup_storm": [0, 42], "wg_jup_harpoon": [0, 43], "wg_jup_suit": [0, 44], "wg_jup_helm": [0, 45], "wg_jup_whale": [0, 46], "wg_jup_moons": [0, 47], "wg_jup_spot": [0, 48], "wg_sat_glaive": [0, 49], "wg_sat_disc": [0, 50], "wg_sat_cuirass": [0, 51], "wg_sat_cape": [0, 52], "wg_sat_griffin": [0, 53], "wg_sat_spray": [0, 54], "wg_sat_float": [0, 55], "wg_ura_spear": [0, 56], "wg_ura_rifle": [0, 57], "wg_ura_coat": [0, 58], "wg_ura_boots": [0, 59], "wg_ura_hippo": [0, 60], "wg_ura_axis": [0, 61], "wg_ura_dark": [0, 62], "wg_nep_trident": [0, 63], "wg_nep_sonic": [1, 0], "wg_nep_plate": [1, 1], "wg_nep_helm": [1, 2], "wg_nep_seahorse": [1, 3], "wg_nep_triton": [1, 4], "wg_nep_wind": [1, 5], "wg_vey_blade": [1, 6], "wg_vey_staff": [1, 7], "wg_vey_robe": [1, 8], "wg_vey_circlet": [1, 9], "wg_vey_unicorn": [1, 10], "wg_vey_note": [1, 11], "wg_vey_chorus": [1, 12], "wg_nev_cutlass": [1, 13], "wg_nev_sling": [1, 14], "wg_nev_jerkin": [1, 15], "wg_nev_cap": [1, 16], "wg_nev_eagle": [1, 17], "wg_nev_dust": [1, 18], "wg_nev_crow": [1, 19], "wg_sea_boarding": [1, 20], "wg_sea_pistol": [1, 21], "wg_sea_coat": [1, 22], "wg_sea_hat": [1, 23], "wg_sea_kelpie": [1, 24], "wg_sea_compass": [1, 25], "wg_sea_wind": [1, 26], "wg_np_icicle": [1, 27], "wg_np_snow": [1, 28], "wg_np_coat": [1, 29], "wg_np_mitts": [1, 30], "wg_np_reindeer": [1, 31], "wg_np_bell": [1, 32], "wg_np_hearth": [1, 33], "wg_bat_greatsword": [1, 34], "wg_bat_gun": [1, 35], "wg_bat_plate": [1, 36], "wg_bat_helm": [1, 37], "wg_bat_elephant": [1, 38], "wg_bat_scar": [1, 39], "wg_bat_banner": [1, 40], "wg_gw_billhook": [1, 41], "wg_gw_bow": [1, 42], "wg_gw_smock": [1, 43], "wg_gw_hat": [1, 44], "wg_gw_ox": [1, 45], "wg_gw_honey": [1, 46], "wg_gw_clover": [1, 47], "wg_uw_axe": [1, 48], "wg_uw_hammer": [1, 49], "wg_uw_mail": [1, 50], "wg_uw_helm": [1, 51], "wg_uw_hound": [1, 52], "wg_uw_glowcap": [1, 53], "wg_uw_seed": [1, 54], "wg_hv_staff": [1, 55], "wg_hv_fan": [1, 56], "wg_hv_robe": [1, 57], "wg_hv_crown": [1, 58], "wg_hv_fox": [1, 59], "wg_hv_mist": [1, 60], "wg_hv_honey": [1, 61], "wg_dp_trident": [1, 62], "wg_dp_spear": [1, 63], "wg_dp_scale": [2, 0], "wg_dp_helm": [2, 1], "wg_dp_dolphin": [2, 2], "wg_dp_kelp": [2, 3], "wg_dp_lamp": [2, 4], "wg_fae_thorn": [2, 5], "wg_fae_rapier": [2, 6], "wg_fae_cloak": [2, 7], "wg_fae_vest": [2, 8], "wg_fae_fox": [2, 9], "wg_fae_dew": [2, 10], "wg_fae_wing": [2, 11], "wg_void_orb": [2, 12], "wg_void_blade": [2, 13], "wg_void_robe": [2, 14], "wg_void_hood": [2, 15], "wg_void_steed": [2, 16], "wg_void_moss": [2, 17], "wg_void_still": [2, 18], "wg_mir_twin": [2, 19], "wg_mir_glass": [2, 20], "wg_mir_plate": [2, 21], "wg_mir_gloves": [2, 22], "wg_mir_lion": [2, 23], "wg_mir_shard": [2, 24], "wg_mir_heart": [2, 25], "wg_dead_scythe": [2, 26], "wg_dead_lantern": [2, 27], "wg_dead_poncho": [2, 28], "wg_dead_hat": [2, 29], "wg_dead_jaguar": [2, 30], "wg_dead_candle": [2, 31], "wg_dead_marigold": [2, 32], "wg_frz_axe": [2, 33], "wg_frz_spear": [2, 34], "wg_frz_coat": [2, 35], "wg_frz_helm": [2, 36], "wg_frz_mammoth": [2, 37], "wg_frz_lichen": [2, 38], "wg_frz_aurora": [2, 39], "wg_els_crystal": [2, 40], "wg_els_spore": [2, 41], "wg_els_bark": [2, 42], "wg_els_mask": [2, 43], "wg_els_manticore": [2, 44], "wg_els_air": [2, 45], "wg_els_song": [2, 46], "wg_fire_brand": [2, 47], "wg_fire_flamer": [2, 48], "wg_fire_plate": [2, 49], "wg_fire_gloves": [2, 50], "wg_fire_hound": [2, 51], "wg_fire_ember": [2, 52], "wg_fire_ash": [2, 53], "wg_star_blade": [2, 54], "wg_star_rail": [2, 55], "wg_star_plate": [2, 56], "wg_star_cloak": [2, 57], "wg_star_pegasus": [2, 58], "wg_star_comet": [2, 59], "wg_star_crystal": [2, 60], "wg_wst_shotgun": [2, 61], "wg_wst_machete": [2, 62], "wg_wst_jacket": [2, 63], "wg_wst_goggles": [3, 0], "wg_wst_boar": [3, 1], "wg_wst_water": [3, 2], "wg_wst_road": [3, 3], "wg_des_scimitar": [3, 4], "wg_des_bow": [3, 5], "wg_des_robe": [3, 6], "wg_des_head": [3, 7], "wg_des_camel": [3, 8], "wg_des_saffron": [3, 9], "wg_des_salt": [3, 10], "wg_fut_disc": [3, 11], "wg_fut_arc": [3, 12], "wg_fut_suit": [3, 13], "wg_fut_visor": [3, 14], "wg_fut_steed": [3, 15], "wg_fut_cell": [3, 16], "wg_fut_green": [3, 17], "wg_ud_blade": [3, 18], "wg_ud_crossbow": [3, 19], "wg_ud_mail": [3, 20], "wg_ud_cloak": [3, 21], "wg_ud_ram": [3, 22], "wg_ud_glow": [3, 23], "wg_ud_rune": [3, 24], "wg_race_wrench": [3, 25], "wg_race_flare": [3, 26], "wg_race_suit": [3, 27], "wg_race_helm": [3, 28], "wg_race_lion": [3, 29], "wg_race_flag": [3, 30], "wg_race_nitro": [3, 31], "wg_party_popper": [3, 32], "wg_party_baton": [3, 33], "wg_party_jacket": [3, 34], "wg_party_crown": [3, 35], "wg_party_unicorn": [3, 36], "wg_party_dance": [3, 37], "wg_party_glow": [3, 38], "wg_kz_cape": [3, 39], "wg_kz_bunny": [3, 40], "wg_kz_star": [3, 41], "wg_kz_light": [3, 42], "wg_lng_wrap": [3, 43], "wg_lng_tortoise": [3, 44], "wg_lng_pearls": [3, 45], "wg_lng_rose": [3, 46], "wg_fam_jumper": [3, 47], "wg_fam_sheep": [3, 48], "wg_fam_photo": [3, 49], "wg_fam_lamp": [3, 50], "wg_cas_cane": [3, 51], "wg_cas_derringer": [3, 52], "wg_cas_tux": [3, 53], "wg_cas_hat": [3, 54], "wg_cas_panther": [3, 55], "wg_cas_dice": [3, 56], "wg_cas_chip": [3, 57], "wg_aur_stunner": [3, 58], "wg_aur_laser": [3, 59], "wg_aur_suit": [3, 60], "wg_aur_helm": [3, 61], "wg_aur_steed": [3, 62], "wg_aur_algae": [3, 63], "wg_aur_ring": [4, 0], "wg_ares_axe": [4, 1], "wg_ares_carbine": [4, 2], "wg_ares_plate": [4, 3], "wg_ares_boots": [4, 4], "wg_ares_crab": [4, 5], "wg_ares_red": [4, 6], "wg_ares_suit": [4, 7], "wg_dav_sword": [4, 8], "wg_dav_xbow": [4, 9], "wg_dav_half": [4, 10], "wg_dav_apron": [4, 11], "wg_dav_lion": [4, 12], "wg_dav_harness": [4, 13], "wg_dav_stylus": [4, 14] } };
var WG_MADE = {};
function wgV(x, y, z) { return new THREE.Vector3(x, y, z); }
function wgEl(par, mat, r, sx, sy, sz, x, y, z, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 28, Math.round((seg || 28) * 0.7)), mat); m.scale.set(sx, sy, sz); m.position.set(x, y, z); par.add(m); return m; }
function wgSeg(par, mat, a, b, r0, r1, seg) { return __ZC(346, 23, this, arguments, new.target); }
function wgTube(par, mat, pts, r0, r1, n, rs) { return __ZC(346, 24, this, arguments, new.target); }
function wgCoat(g, col, H, mark) { return __ZC(346, 25, this, arguments, new.target); }
var WG_FURTEX = null;
function wgFurTex() { return __ZC(346, 26, this, arguments, new.target); }
function wgFurMat(r) {
var lite = typeof LITE !== "undefined" && !!LITE;
var m = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: r == null ? 0.86 : r, metalness: 0, map: wgFurTex() });
if (!lite) {
m.bumpMap = wgFurTex();
m.bumpScale = 0.015;
}
m.userData.wgFur = 1;
return m;
}
function wgMats(col) { return __ZC(346, 27, this, arguments, new.target); }
function wgEyes(par, M, x, y, z, r, turn, o) { return __ZC(346, 28, this, arguments, new.target); }
function wgLegs(par, M, o) { return __ZC(346, 29, this, arguments, new.target); }
function wgBlend(par, mat, E, o) { return __ZC(346, 30, this, arguments, new.target); }
function wgTorso(par, M, o) {
var m = (o.rc + o.rh) / 2;
wgBlend(par, M.fur, [{ z: o.cz, y: o.y + o.rc * 0.1, rx: o.rc * 0.9, ry: o.rc, rz: o.rc * 1.15 }, { z: (o.cz + o.hz) / 2, y: o.y - m * 0.02, rx: m * 0.9, ry: m * 0.93, rz: m * 1.3 }, { z: o.hz, y: o.y + o.rh * 0.05, rx: o.rh * 0.95, ry: o.rh, rz: o.rh * 1.1 }]);
}
function wgHead(par, M, kind, p, S, o) { return __ZC(346, 31, this, arguments, new.target); }
function wgWing(S, c1, c2) { return __ZC(346, 32, this, arguments, new.target); }
function wgBatWing(S, bone, skin) { return __ZC(346, 33, this, arguments, new.target); }
function wgWingPair(par, S, x, y, z, mk) {
[-1, 1].forEach(function (s) {
var hinge = new THREE.Group();
hinge.position.set(s * x, y, z);
par.add(hinge);
var wing = mk();
if (s < 0)
wing.scale.x = -1;
hinge.add(wing);
hinge.rotation.set(0, s * 0.3, s * 0.75, "YXZ");
});
}
var WG_BEAST = {
lion: function (c, P) { return __ZC(346, 34, this, arguments, new.target); },
tiger: function (c, P) { var r = WG_BEAST.lion(c, { name: "panther" }); r.mark = /jaguar|marigold|rosette/.test(P.name.toLowerCase()) ? wgRosettes : wgStripes; return r; },
bear: function (c) { return __ZC(346, 35, this, arguments, new.target); },
boar: function (c) { return __ZC(346, 36, this, arguments, new.target); },
goat: function (c) { return __ZC(346, 37, this, arguments, new.target); },
rabbit: function (c) { return __ZC(346, 38, this, arguments, new.target); },
elephant: function (c, P) { return __ZC(346, 39, this, arguments, new.target); },
mammoth: function (c) { return __ZC(346, 40, this, arguments, new.target); },
cerberus: function (c) { return __ZC(346, 41, this, arguments, new.target); },
kitsune: function (c) { return __ZC(346, 42, this, arguments, new.target); },
griffin: function (c, P, eagleBody) { return __ZC(346, 43, this, arguments, new.target); },
hippogriff: function (c) { return __ZC(346, 44, this, arguments, new.target); },
manticore: function (c) { return __ZC(346, 45, this, arguments, new.target); },
roc: function (c) { return __ZC(346, 46, this, arguments, new.target); },
seahorse: function (c) { return __ZC(346, 47, this, arguments, new.target); },
turtle: function (c) { return __ZC(346, 48, this, arguments, new.target); },
crab: function (c) { return __ZC(346, 49, this, arguments, new.target); },
scorpion: function (c) { return __ZC(346, 50, this, arguments, new.target); }
};
function wgStripes(v) { var s = Math.sin(v.z * 16 + Math.sin(v.y * 6) * 1.2); return s > 0.55 && v.y > 0.45 ? 0.32 : 1; }
function wgRosettes(v) { var x = v.x * 9, y = v.y * 9, z = v.z * 9, n = Math.sin(x * 1.7 + z * 0.6) * Math.sin(y * 1.9 - z * 1.3) * Math.sin(z * 1.4 + x * 0.8); return v.y > 0.4 && n > 0.22 ? 0.42 : 1; }
function wgScutes(v) {
if (v.y < 0.33)
return 0.95;
var s = 6, x = v.x * s, z = v.z * s * 0.85, q = x * 0.577 - z / 3, r = z * 2 / 3, cx = Math.round(q), cz = Math.round(r), d = Math.abs(q - cx) + Math.abs(r - cz);
return d > 0.62 ? 0.55 : 1.05 - d * 0.2;
}
function wgBake(root, moving) { return __ZC(346, 51, this, arguments, new.target); }
function wgMadeOf(arch) { return __ZC(346, 52, this, arguments, new.target); }
(function () {
if (typeof modelDress !== "function")
return;
var md = modelDress;
modelDress = function (g, spec) {
var o = spec && typeof CREATURE !== "undefined" && CREATURE[spec.archetype];
if (g && o && o.wgBase && WG_MOUNTS[spec.archetype] && WG_BEAST[o.wgBase] && typeof modelSwap === "function" && modelsOn()) {
var F = wgMadeOf(spec.archetype);
if (F) {
if (!g.userData.kitKids)
g.userData.kitKids = g.children.slice();
try {
wgMountFix(g, spec.archetype);
}
catch (e) { }
try {
modelSwap(g, spec, { fit: "contain", all: 1 }, F);
}
catch (e) {
if (window.console)
console.warn("[wg] dress", e);
}
if (g.userData.modelled)
return;
}
}
return md.apply(this, arguments);
};
})();
function wgPetTail(par, M, at, pts, r0, r1, tip) {
var t = new THREE.Group();
t.position.copy(at);
par.add(t);
wgTube(t, M.fur, pts.map(function (p) { return p.clone().sub(at); }), r0, r1, 20, 10);
if (tip) {
var e = pts[pts.length - 1].clone().sub(at);
wgEl(t, tip, r1 * 1.6, 1, 1, 1.6, e.x, e.y, e.z, 12);
}
return t;
}
var WG_WTEX = {};
function wgWingTex(col, kind) { return __ZC(346, 53, this, arguments, new.target); }
function wgLeaf(par, mat, w, d, shape, side, rot) { return __ZC(346, 54, this, arguments, new.target); }
var WG_PET_OLD = null;
var WG_PET = {
moth: function (M, c) { return __ZC(346, 55, this, arguments, new.target); },
sprite: function (M, c) { return __ZC(346, 56, this, arguments, new.target); },
dog: function (M) { return __ZC(346, 57, this, arguments, new.target); },
cat: function (M) { return __ZC(346, 58, this, arguments, new.target); },
fox: function (M) { return __ZC(346, 59, this, arguments, new.target); },
rabbit: function (M, c) { var r = WG_BEAST.rabbit(c); return { b: r.g, legs: null, hop: 1, s: 0.3, own: 1 }; },
hedgehog: function (M) { return __ZC(346, 60, this, arguments, new.target); },
owl: function (M, c) { return __ZC(346, 61, this, arguments, new.target); },
dragonling: function (M, c) { return __ZC(346, 62, this, arguments, new.target); }
};
(function () {
if (typeof ptBuild !== "function")
return;
var pb = ptBuild;
WG_PET_OLD = pb;
ptBuild = function (kind, colour) {
var B = WG_PET[kind];
if (!B)
return pb.apply(this, arguments);
try {
var col = new THREE.Color(colour || "#A07850").getHex(), M = wgMats(col), r = B(M, col);
var g = new THREE.Group(), body = r.b;
g.add(body);
g.userData.body = body;
g.userData.kind = kind;
body.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(body);
wgCoat(body, col, Math.max(0.3, bb.max.y), r.mark);
wgBake(body, [].concat(r.legs || [], r.tail ? [r.tail] : [], r.wings || []));
body.scale.setScalar(r.s);
g.userData.legs = r.legs && r.legs.length ? r.legs : null;
if (r.tail)
g.userData.tail = r.tail;
if (r.wings)
g.userData.wings = r.wings;
if (r.hop)
g.userData.hop = 1;
if (r.flutter)
g.userData.flutter = 1;
if (r.glow)
g.userData.glowMat = r.glow;
g.userData.fly = !!(typeof PT_FLY !== "undefined" && PT_FLY[kind]);
g.userData.phase = Math.random() * 6;
g.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
} });
return g;
}
catch (e) {
if (window.console)
console.warn("[wg] pet", kind, e);
return pb.apply(this, arguments);
}
};
})();
