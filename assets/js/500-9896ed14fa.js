/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var LTF_ITEMS = { "lt_copper_ore": ["Copper ore", 1, "Bronze ingot (with tin): studs, buckles, plain armour trim"], "lt_tin_nugget": ["Tin nugget", 1, "Bronze ingot (with copper)"], "lt_bronze_ingot": ["Bronze ingot", 1, "Iron dagger and gladius hilts; plain armour fittings"], "lt_rough_flint": ["Rough flint", 1, "Arrowheads for ash bows; fire-strikers"], "lt_ash_wood_billet": ["Ash wood billet", 1, "Ash bows and ash staves (Bows, Magic)"], "lt_rabbit_pelt": ["Rabbit pelt", 1, "Soft leather: gloves, quivers"], "lt_wolf_hide": ["Wolf hide", 1, "Tanned leather (2 make 1, better than raw hide)"], "lt_coarse_wool": ["Coarse wool", 1, "Plain cloth armour; bandages"], "lt_linen_thread": ["Linen thread", 1, "Sewing for every cloth and leather piece"], "lt_rat_tail": ["Rat tail", 1, "Reagent: Draught of Plenty (cheaper version)"], "lt_bat_wing": ["Bat wing", 1, "Reagent: Draught of Keen Eyes"], "lt_bone_dust": ["Bone dust", 1, "Reagent: bone glue for bows; Mending salve"], "sk_herb3": ["Feverfew", 1, "Reagent: Healing draught (small)"], "lt_cave_moss": ["Cave moss", 1, "Reagent: Stamina tonic"], "lt_tallow_candle_end": ["Tallow candle-end", 1, "Light-oil for lanterns; wax seals"], "lt_cracked_quartz": ["Cracked quartz", 1, "Cut quartz (Jewelcraft 1): plain rings"], "cr_ore": ["Iron ore (rich vein)", 2, "Steel ingot: 2 rich ore + 1 coal makes 2"], "sk_ore2": ["Silver ore", 2, "Silver bar: Silver rings (+3) at Jewelcraft 12"], "lt_yew_stave": ["Yew stave", 2, "Yew longbows and yew staves"], "lt_boar_hide": ["Boar hide", 2, "Hardened leather: steel-tier armour"], "lt_barrow_linen": ["Barrow linen", 2, "Fine cloth armour; burial-silk lining"], "lt_grave_iron_rivet": ["Grave-iron rivet", 2, "Steel armour joints"], "lt_drowned_pearl": ["Drowned pearl", 2, "Pearl inlay: fine blades; Draught of Steady Hands"], "lt_mournwort": ["Mournwort", 2, "Reagent: Draught of Steady Hands"], "lt_barrow_wight_dust": ["Barrow-wight dust", 2, "Reagent: Ward against fear"], "lt_garnet": ["Garnet (rough)", 2, "Cut garnet (Jewelcraft 12)"], "lt_wight_s_fingerbone": ["Wight's fingerbone", 2, "Bone-handled knives; Necromancer's ink"], "ss_lampoil": ["Lamp oil", 2, "Fire arrows; lantern oil"], "lt_seaweed_rope": ["Seaweed rope", 2, "Ship and grapple rope; bow strings"], "lt_black_pearl": ["Black pearl", 2, "Rare: Ring of Breath (swim longer)"], "lt_darkiron_ore": ["Darkiron ore", 3, "Darksteel ingot (with emberstone)"], "lt_darksteel_ingot": ["Darksteel ingot", 3, "Every darksteel weapon and armour piece (the third tier)"], "lt_heartwood_log": ["Heartwood log", 3, "Heartwood bows and staves"], "lt_salamander_skin": ["Salamander skin", 3, "Fire-proof leather: forge aprons, flame cloaks"], "lt_firesilk": ["Firesilk", 3, "Enchanted cloth armour"], "lt_slag_glass": ["Slag glass", 3, "Smoked glass: goggles, vials that hold acid"], "lt_cinder_salts": ["Cinder salts", 3, "Reagent: Fire-resistance draught"], "lt_sulphur_crystal": ["Sulphur crystal", 3, "Reagent: Blasting powder (Firearms, Heavy weapons)"], "lt_ironbark_resin": ["Ironbark resin", 3, "Bow lacquer; Shield glue"], "lt_sapphire": ["Sapphire (rough)", 3, "Cut sapphire: Gold rings (+5)"], "lt_golem_core_shard": ["Golem core shard", 3, "Enchanting: +fire on a weapon"], "lt_blazecap_mushroom": ["Blazecap mushroom", 3, "Reagent: Draught of Keen Eyes (strong)"], "sk_ore3": ["Gold ore", 3, "Gold bar: Gold rings and bracelets (+5)"], "lt_molten_heart": ["Molten heart", 3, "Rare: Ember relic recharge; Flametongue enchant"], "lt_starmetal_ore": ["Starmetal ore", 4, "Starmetal ingot (with star crystal)"], "lt_starmetal_ingot": ["Starmetal ingot", 4, "Every starmetal weapon and armour piece (the fourth tier)"], "lt_starwood_branch": ["Starwood branch", 4, "Starwood bows and staves"], "lt_moonsilk": ["Moonsilk", 4, "Moonsilk robes; silent boots"], "lt_matriarch_chitin": ["Matriarch chitin", 4, "Chitin plate: light armour as strong as steel"], "lt_venom_sac": ["Venom sac", 4, "Reagent: Poison coating for blades"], "lt_spider_eye_cluster": ["Spider eye cluster", 4, "Reagent: Draught of Night Sight"], "lt_emerald": ["Emerald (rough)", 4, "Cut emerald: Moonsilver rings (+7)"], "sk_ore4": ["Moonsilver ore", 4, "Moonsilver bar: Moonsilver rings and bracelets (+7)"], "lt_void_dust": ["Void dust", 4, "Reagent: Draught of Insight; Shadow ink"], "lt_frost_lotus": ["Frost lotus", 4, "Reagent: Frost-resistance; Elixir of Calm"], "lt_wyvern_scale": ["Wyvern scale", 4, "Dragon scale substitute for scale armour"], "cr_crystal": ["Star crystal (clear)", 4, "Starmetal smelting; Star weapons"], "lt_silk_wrapped_egg": ["Silk-wrapped egg", 4, "Rare: tame a cave-spider mount"], "lt_dragonbone": ["Dragonbone", 5, "Dragonbone bows and staves"], "cr_scale": ["Dragon scale", 5, "Dragonforged armour"], "lt_dragonforged_ingot": ["Dragonforged ingot", 5, "Every dragonforged weapon and armour piece (the top tier)"], "lt_dragon_s_blood": ["Dragon's blood", 5, "Reagent: Elixir of the Masters; Bloodfire enchant"], "lt_ruby": ["Ruby (rough)", 5, "Cut ruby: Starstone rings (+10)"], "sk_ore5": ["Starstone", 5, "Starstone bars: Starstone rings and bracelets (+10)"], "dr_phoenixfeather": ["Phoenix feather", 5, "Rare: Revive once (a feather burned at death)"], "lt_titan_s_sinew": ["Titan's sinew", 5, "Bowstrings for dragonbone bows; war-machine cables"], "lt_abyssal_pearl": ["Abyssal pearl", 5, "Rare: Ring of the Deep (breathe under water)"], "lt_golden_clover": ["Golden clover", 5, "Reagent: Elixir of the Masters (with Lv 48 herbs)"], "lt_living_ember": ["Living ember", 5, "Endless forge fuel (one is never used up)"], "lt_elder_rune": ["Elder rune", 5, "Enchanting: the top enchantments (two on one item)"], "lt_bell_bronze": ["Bell bronze", 1, "Bell-bronze buckler; Tolling charm"], "lt_cracked_bell": ["Cracked bell", 1, "Melts to 2 bell bronze"], "lt_belfry_rope": ["Belfry rope", 1, "Climbing rope; plain bowstrings"], "lt_pigeon_feather": ["Pigeon feather", 1, "Arrow fletching"], "lt_candle_wax": ["Candle wax", 1, "Wax seals; Light-oil"], "lt_hymn_scrap": ["Hymn scrap", 1, "Collect 6: the Cantor's lost hymn (a song for your house)"], "lt_cantor_s_clapper": ["Cantor's clapper", 1, "Boss trophy: Bell-hammer (Axes and hammers, steel)"], "lt_faceless_mask": ["Faceless mask", 1, "Boss trophy: wear it; or Ward against fear (strong)"], "lt_silent_bell": ["Silent bell", 1, "Rare boss trophy: Silence charm (beasts hear you less)"], "lt_barrow_silver": ["Barrow silver", 2, "Silver bar (3 coins)"], "lt_grave_moss": ["Grave moss", 2, "Reagent: Mending salve"], "lt_burial_amber": ["Burial amber", 2, "Amber inlay; Ward against rot"], "lt_weed_hung_chain": ["Weed-hung chain", 2, "Chain mail (steel tier)"], "lt_tide_worn_shield_boss": ["Tide-worn shield boss", 2, "Shield (steel), or melts to 2 grave-iron"], "lt_mourning_veil": ["Mourning veil", 2, "Fine cloth hood"], "lt_drowned_crown": ["Drowned crown", 2, "Boss trophy: wear it; or 3 barrow silver + a garnet"], "lt_king_s_sea_blade": ["King's sea-blade", 2, "Boss trophy: a fine longsword already made"], "lt_heart_of_the_tide": ["Heart of the tide", 2, "Rare boss trophy: Tide relic (pushes beasts back)"], "lt_slag_lump": ["Slag lump", 3, "Smelts to darkiron (3 make 1)"], "lt_coke_coal": ["Coke coal", 3, "Better than coal: darksteel smelting"], "lt_broken_gear": ["Broken gear", 3, "Machine parts (2 make 1)"], "lt_bellows_leather": ["Bellows leather", 3, "Hardened leather"], "lt_crucible_shard": ["Crucible shard", 3, "Firebrick: build a home forge"], "lt_forge_master_s_tongs": ["Forge-master's tongs", 3, "Tool: +1 quality on everything you forge"], "lt_colossus_core": ["Colossus core", 3, "Boss trophy: Ember relic, or 3 golem core shards"], "lt_slag_iron_fist": ["Slag-iron fist", 3, "Boss trophy: Slag gauntlets (darksteel)"], "lt_undying_ember": ["Undying ember", 3, "Rare boss trophy: Living ember"], "hx_silk": ["Spider silk (raw)", 4, "Moonsilk (3 make 1)"], "lt_webbed_bundle": ["Webbed bundle", 4, "Opens: a random tier-4 find inside"], "lt_spider_fang": ["Spider fang", 4, "Fang dagger (starmetal); Venom coating"], "lt_cave_pearl": ["Cave pearl", 4, "Pearl inlay"], "hx_glowcap": ["Glowcap mushroom", 4, "Reagent: Draught of Night Sight"], "lt_frost_web": ["Frost web", 4, "Frost-resistance lining"], "lt_matriarch_s_fang": ["Matriarch's fang", 4, "Boss trophy: Matriarch dagger (starmetal, poisons)"], "lt_crown_of_frosted_web": ["Crown of frosted web", 4, "Boss trophy: wear it; or 3 moonsilk"], "lt_queen_s_egg": ["Queen's egg", 4, "Rare boss trophy: hatch a giant cave-spider mount"], "lt_coffin_nail": ["Coffin nail", 2, "Grave-iron rivets"], "lt_shroud_cloth": ["Shroud cloth", 2, "Fine cloth"], "lt_skull": ["Skull", 2, "Bone dust (3); decor"], "lt_embalming_salts": ["Embalming salts", 2, "Reagent: Ward against rot"], "cr_coal": ["Coal", 2, "Steel smelting"], "cr_ember": ["Emberstone", 2, "Darksteel smelting"], "lt_hammer_scale": ["Hammer scale", 2, "Iron dust: steel"], "lt_quench_oil": ["Quench oil", 2, "+1 quality on a blade"], "lt_shed_carapace": ["Shed carapace", 2, "Chitin plate"], "lt_venom_drop": ["Venom drop", 2, "Poison coating"], "lt_cocoon": ["Cocoon", 2, "Opens: something swallowed"], "lt_mithral_flecked_ore": ["Mithral-flecked ore", 2, "Moonsilver bar"], "hx_runestone": ["Runestone", 2, "Enchanting"], "lt_ale_stone": ["Ale-stone", 2, "Reagent: Stamina tonic"], "lt_dwarven_rivet": ["Dwarven rivet", 2, "Armour joints (+1 quality)"], "lt_brass_cog": ["Brass cog", 2, "Machine parts"], "lt_mainspring": ["Mainspring", 2, "Crossbows; automaton pets"], "lt_lens": ["Lens", 2, "Scopes for firearms"], "lt_oil_can": ["Oil can", 2, "Vehicle repairs"], "hx_ice": ["Clear ice", 2, "Frost-resistance; cold-forged steel"], "lt_yeti_fur": ["Yeti fur", 2, "Fur cloak"], "lt_rime_crystal": ["Rime crystal", 2, "Frost enchant"], "lt_snowberry": ["Snowberry", 2, "Reagent: Elixir of Calm"], "lt_incense": ["Incense", 2, "Reagent: Draught of Insight"], "lt_gold_leaf": ["Gold leaf", 2, "Gilding (decor and armour)"], "lt_idol_eye_gem": ["Idol eye gem", 2, "Cut gem (sapphire tier)"], "lt_prayer_scroll": ["Prayer scroll", 2, "Spell tome pages"], "lt_deep_gem": ["Deep gem", 2, "Cut gem (emerald tier)"], "hx_deepsilver": ["Deepsilver ore", 2, "Moonsilver bar"], "lt_shade_essence": ["Shade essence", 2, "Shadow ink; Draught of Night Sight"], "lt_troll_knuckle_stone": ["Troll knuckle-stone", 2, "Troll-hide gauntlets"], "lt_goblin_lamp_wick": ["Goblin lamp-wick", 2, "Light-oil"], "hx_lizardscale": ["Cave-lizard scale", 2, "Scale armour (steel)"], "lt_sun_baked_iron": ["Sun-baked iron", 2, "Darksteel"], "lt_sunflare_spark": ["Sunflare spark", 2, "Sunfire enchant"], "lt_rock_crawler_sting": ["Rock-crawler sting", 2, "Sting spear (darksteel)"], "lt_heat_glass": ["Heat glass", 2, "Heat-proof visors"], "lt_sulphur_scale": ["Sulphur scale", 2, "Acid-proof armour"], "lt_bottled_cloud": ["Bottled cloud", 2, "Reagent: Acid-resistance"], "lt_brimstone_claw": ["Brimstone claw", 2, "Claw knives"], "lt_venus_orchid": ["Venus orchid", 2, "Reagent: Elixir of Calm"], "lt_singing_glass_shard": ["Singing glass shard", 2, "Sound-crystal: Bard's lute; Silence charm"], "lt_tuning_crystal": ["Tuning crystal", 2, "Star weapons (+1 quality)"], "lt_veyar_thread": ["Veyar thread", 2, "Glimmer cloth"], "lt_sour_note_in_glass": ["Sour note in glass", 2, "Reagent: Discord bomb"], "lt_ember_hound_fang": ["Ember-hound fang", 2, "Fang dagger (darksteel)"], "lt_imp_horn_tip": ["Imp horn-tip", 2, "Reagent: Fire-resistance (strong)"], "lt_brimstone_heart": ["Brimstone heart", 2, "Flametongue enchant"], "lt_asphodel": ["Asphodel", 2, "Reagent: Draught of Memory"], "lt_pomegranate_seed": ["Pomegranate seed", 2, "Reagent: Return-from-death charm"], "lt_underworld_silver": ["Underworld silver", 2, "Silver bar"], "lt_watcher_s_lens": ["Watcher's lens", 2, "Scopes; Draught of True Sight"], "lt_scrap_of_the_dark": ["Scrap of the dark", 2, "Shadow cloak"], "lt_void_shard": ["Void shard", 2, "Void enchant (hits through armour)"], "dr_stardust": ["Stardust", 2, "Starmetal smelting"], "dr_obsidian": ["Obsidian", 2, "Obsidian blades (very sharp, break easily)"], "lt_pumice": ["Pumice", 2, "Polish: +1 quality on armour"], "lt_ash_hound_pelt": ["Ash-hound pelt", 2, "Fire-proof leather"], "lt_kiln_clay": ["Kiln clay", 2, "Firebrick; pottery"], "lt_road_raider_scrap": ["Road-raider scrap", 2, "Machine parts; vehicle armour"], "lt_dust_scorpion_tail": ["Dust-scorpion tail", 2, "Reagent: Antivenom"], "lt_fuel_cell": ["Fuel cell", 2, "Vehicle fuel; energy weapons"], "lt_husk_resin": ["Husk resin", 2, "Patch kit (repair armour)"], "lt_iguanodon_hide": ["Iguanodon hide", 2, "Thick leather (darksteel-tier armour)"], "lt_pterodactyl_leather_wing": ["Pterodactyl leather wing", 2, "Glider wings"], "lt_blue_clay": ["Blue clay", 2, "Reagent: Elixir of the Masters (a book find)"], "lt_raptor_claw": ["Raptor claw", 2, "Claw knives"], "lt_tree_fern_frond": ["Tree-fern frond", 2, "Reagent: Healing draught"], "lt_gingko_nut": ["Gingko nut", 2, "Reagent: Draught of Insight"], "lt_emerald_city_glass": ["Emerald City glass", 2, "Green spectacles; cut emerald"], "lt_poppy_pollen": ["Poppy pollen", 2, "Reagent: Sleep powder"], "lt_tin_plate": ["Tin plate", 2, "Tin armour"], "lt_winkie_gold": ["Winkie gold", 2, "Gold bar"], "lt_straw": ["Straw", 2, "Scarecrow decor; kindling"], "lt_pixie_dust": ["Pixie dust", 2, "Reagent: Flight draught (short)"], "lt_mermaid_scale": ["Mermaid scale", 2, "Swim fins"], "lt_crocodile_tooth": ["Crocodile tooth", 2, "Tooth necklace"], "lt_never_coconut": ["Never-coconut", 2, "Reagent: Stamina tonic"], "lt_drake_glass": ["Drake glass", 2, "Neon lamps; drake-glass blades"], "lt_fire_land_ash": ["Fire-land ash", 2, "Reagent: Fire-resistance"], "lt_drakkyn_scale": ["Drakkyn scale", 2, "Drakkyn scale armour"], "lt_neonbloom": ["Neonbloom", 2, "Reagent: Glow draught"], "lt_snow_queen_s_ice": ["Snow Queen's ice", 2, "Ice blade (frost enchant)"], "lt_rose_of_summer": ["Rose of summer", 2, "Reagent: Warmth draught"], "hx_moss": ["Reindeer moss", 2, "Reagent: Stamina tonic"], "lt_mirror_splinter": ["Mirror splinter", 2, "Mirror charm; Draught of True Sight"], "lt_bronze_of_troy": ["Bronze of Troy", 2, "Bronze armour (hoplite)"], "lt_golden_fleece_tuft": ["Golden fleece tuft", 2, "Fleece cloak"], "lt_olive_branch": ["Olive branch", 2, "Olive oil; wreath"], "lt_medusa_s_scale": ["Medusa's scale", 2, "Stone-gaze charm"], "lt_ambrosia_drop": ["Ambrosia drop", 2, "Reagent: Elixir of the Masters"], "dr_kelp": ["Kelp", 2, "Seaweed rope; Breath draught"], "lt_nautilus_shell": ["Nautilus shell", 2, "Shell armour; decor"], "lt_ambergris": ["Ambergris", 2, "Reagent: perfumes, Elixir of Calm"], "lt_sea_king_pearl": ["Sea-king pearl", 2, "Ring of Breath"], "hx_salt": ["Sea salt", 2, "Curing hides faster"], "lt_ship_s_tar": ["Ship's tar", 2, "Waterproofing"], "lt_spanish_doubloon": ["Spanish doubloon", 2, "Gold bar"], "lt_kraken_ink": ["Kraken ink", 2, "Shadow ink; Smoke bomb"], "lt_meteoric_iron": ["Meteoric iron", 2, "Starmetal (with star crystal)"], "ow_he3": ["Helium-3 canister", 2, "Starship fuel"], "lt_alien_alloy": ["Alien alloy", 2, "Star weapons; space-suit plates"], "lt_nebula_dust": ["Nebula dust", 2, "Reagent: Draught of Insight"], "lt_garlic_bulb": ["Garlic bulb", 2, "Reagent: Ward against the undead"], "lt_grave_soil": ["Grave soil", 2, "Reagent: Necromancer's ink"], "lt_vampire_fang": ["Vampire fang", 2, "Bloodletter dagger (drains life)"], "dr_marigold": ["Marigold", 2, "Reagent: Draught of Memory"], "lt_galvanic_coil": ["Galvanic coil", 2, "Lightning enchant"], "lt_polar_bear_fur": ["Polar bear fur", 2, "Fur cloak (frost-proof)"], "lt_laboratory_glass": ["Laboratory glass", 2, "Vials (needed for every draught)"], "lt_catacomb_bone": ["Catacomb bone", 2, "Bone dust; decor"], "lt_raven_feather": ["Raven feather", 2, "Raven quill: spell tome pages"], "lt_alchemist_s_mercury": ["Alchemist's mercury", 2, "Reagent: Flamel's elixir (rare)"], "lt_gingerbread": ["Gingerbread", 2, "Food: big heal"], "lt_spinning_wheel_straw": ["Spinning-wheel straw", 2, "Spun gold (with a gold bar)"], "lt_wolf_fang": ["Wolf fang", 2, "Fang dagger"], "lt_poisoned_apple": ["Poisoned apple", 2, "Reagent: Sleep powder (strong)"], "lt_jungle_vine": ["Jungle vine", 2, "Climbing rope"], "lt_leopard_pelt": ["Leopard pelt", 2, "Hunter's cloak"], "lt_ivory_free_bone": ["Ivory-free bone", 2, "Bone handles"], "wms_honey": ["Wild honey", 2, "Reagent: Healing draught (strong)"], "lt_gunmetal": ["Gunmetal", 2, "Firearms (+1 quality)"], "lt_spent_brass": ["Spent brass", 2, "Ammunition"], "lt_kevlar_weave": ["Kevlar weave", 2, "Bullet-proof vest"], "lt_toadstool_cap": ["Toadstool cap", 2, "Reagent: Shrink draught"], "lt_great_tree_sap": ["Great-tree sap", 2, "Bow lacquer; Growth draught"], "hx_dust": ["Fairy dust", 2, "Reagent: Flight draught (short)"], "lt_moonstone": ["Moonstone", 2, "Moonsilver rings"], "lt_drink_me_drop": ["Drink-Me drop", 2, "Reagent: Shrink draught"], "lt_eat_me_cake_crumb": ["Eat-Me cake crumb", 2, "Reagent: Grow draught"], "lt_cheshire_grin": ["Cheshire grin", 2, "Reagent: Vanish draught (short)"], "lt_card_soldier_lacquer": ["Card-soldier lacquer", 2, "Red paint; shield lacquer"] };
var LTF_WHERE = { "underdark": "underdark", "mercury": "caloris", "gr_mercury": "caloris", "venus": "aphelia", "gr_venus": "aphelia", "veyar": "ilvessa", "gr_veyar": "ilvessa", "underworld": "erebos", "gr_underworld": "erebos", "erebos": "erebos", "void": "stillspire", "gr_void": "stillspire", "fire": "kilnhaven", "gr_fire": "kilnhaven", "wasteland": "wastelands", "gr_wasteland": "wastelands", "lostworld": "lostworld", "oz": "oz", "neverland": "neverland", "gr_neverland": "neverland", "drakkyn": "awen", "winters-heart": "winters", "homer": "greece", "heavens": "greece", "verne": "deep", "depths": "deep", "gr_depths": "deep", "otdeep": "deep", "sea": "sea", "gr_sea": "sea", "space": "space", "stars": "space", "gr_stars": "space", "shuttle": "space", "orbital": "space", "aurora": "space", "ares": "space", "dracula": "dracula", "dead": "dracula", "gr_dead": "dracula", "frankenstein": "frozen", "frozen": "frozen", "gr_frozen": "frozen", "poe": "paris", "grimm": "grimm", "tarzan": "tarzan", "battle": "ironfray", "gr_battle": "ironfray", "faerie": "glimmerwold", "gr_faerie": "glimmerwold", "wonderland": "wonderland", "lookingglass": "wonderland" };
var LTF_NAMES = { "underdark": "The Underdark", "caloris": "Caloris Deep (Mercury)", "aphelia": "Aphelia (Venus)", "ilvessa": "Ilvessa and Veyar", "erebos": "Erebos and Hearthdeep", "stillspire": "Stillspire and the Void", "kilnhaven": "Kilnhaven and the Burning Lands", "wastelands": "The Wastelands", "lostworld": "The Lost World", "oz": "Oz", "neverland": "Neverland", "awen": "Awen (Heart of the Drakkyn)", "winters": "Winter's Heart", "greece": "Greece (Odyssey, Troy, the Labours)", "deep": "The Deep and Twenty Thousand Leagues", "sea": "The Endless Sea and Saltcrown", "space": "Open Space and the Far Gate", "dracula": "Dracula and the Land of the Dead", "frozen": "Frankenstein's Frozen Realm", "paris": "Paris 1841 and Poe's Catacombs", "grimm": "Grimm's Kassel and the Black Forest", "tarzan": "Tarzan's Jungle", "ironfray": "IronFray", "glimmerwold": "Glimmerwold", "wonderland": "Wonderland" };
var LTF = { last: 0, n: 0 };
function ltfPic(k, px) {
if (!k || !(LTF_ITEMS[k] || (typeof LTF_MADE !== "undefined" && LTF_MADE[k])))
return null;
return "<img src='assets/icons/loot/" + k + ".webp' alt=''" + (px ? "" : " loading='lazy'") + " style='width:" + (px ? px + "px" : "1.45em") + ";height:" + (px ? px + "px" : "1.45em") + ";vertical-align:-.38em;object-fit:contain'>";
}
(function () {
if (typeof FG_MB === "undefined")
return;
if (typeof SPG_GOODS !== "undefined")
Object.keys(SPG_GOODS).forEach(function (k) {
var G = SPG_GOODS[k];
if (LTF_ITEMS[k])
return;
LTF_ITEMS[k] = [G.n, G.t, G.note];
if (!FG_MB[k])
FG_MB[k] = { kind: k, name: G.n, icon: ltfPic(k), buys: 1, price: null, where: (typeof SPG_SITES !== "undefined" && SPG_SITES[G.home] ? "Gathered in space with 📡 Scan" : "Sold at the trading post of " + (typeof spgName === "function" ? spgName(G.home) : G.home)) + ". " + G.note };
});
Object.keys(LTF_ITEMS).forEach(function (k) {
var I = LTF_ITEMS[k], M = FG_MB[k];
if (!M) {
FG_MB[k] = { kind: k, name: I[0], icon: ltfPic(k), buys: 1, price: null, where: "Found in the dungeons and the worlds (tier " + I[1] + "). Makes: " + I[2] };
}
else if (/^lt_/.test(k))
M.icon = ltfPic(k);
});
})();
(function () {
if (typeof dglShow !== "function")
return;
var show = dglShow;
dglShow = function (title, rows, note) {
try {
(rows || []).forEach(function (r) { if (r && r.kind) {
var p = ltfPic(r.kind, 30);
if (p)
r.i = p;
} });
if (!LTF.css && document.head) {
LTF.css = 1;
var st = document.createElement("style");
st.textContent = "#dgl-box .c .r{align-items:center}#dgl-box .c .r img{flex:none;border-radius:5px}";
document.head.appendChild(st);
}
}
catch (e) { }
return show.apply(this, arguments);
};
})();
(function () {
if (typeof dglServer !== "function")
return;
var srv = dglServer;
dglServer = function (where, run, o) {
if (where !== "world")
return srv.apply(this, arguments);
if (typeof cityRpc !== "function")
return Promise.resolve(null);
return cityRpc("dgn_loot", { p_where: "world", p_run: null, p_src: o.src || "beast", p_lv: Math.max(1, Math.round(+o.lv || 1)), p_theme: String(o.theme || "").slice(0, 20) }).catch(function () { return null; });
};
})();
function ltfWorldKey() {
try {
if (typeof WLD !== "undefined" && WLD && /^(dmk|delve|crawl)$/.test(WLD.on || ""))
return null;
var w = typeof dgrWhere === "function" ? dgrWhere() : "";
if (!w || /^(kidszone|dream|mall)$/.test(w))
return null;
return LTF_WHERE[w] || "";
}
catch (e) {
return null;
}
}
(function () {
if (typeof cbtKilled !== "function")
return;
var k0 = cbtKilled;
cbtKilled = function (o) {
var r = k0.apply(this, arguments);
try {
o = o || {};
var w = ltfWorldKey();
if (w === null)
return r;
if (!(typeof signedIn === "function" && signedIn()))
return r;
var now = Date.now();
if (now - LTF.last < 60000) {
if (LTF.n >= 10)
return r;
}
else {
LTF.last = now;
LTF.n = 0;
}
LTF.n++;
var name = w && LTF_NAMES[w] ? LTF_NAMES[w] : "the wilds";
dglTake("world", 1, { src: o.boss ? "boss" : "beast", lv: Math.max(1, +o.lv || 1), theme: w, where: name, at: o.at || null }, (o.boss ? "👑 " : "🐾 ") + dglEsc(o.name ? String(o.name) : "A beast") + " leaves behind");
}
catch (e) { }
return r;
};
window.cbtKilled = cbtKilled;
})();
var LTF_BOOK = [["Smelting, tanning and weaving", [["lt_bronze_ingot", "Bronze ingot", { "lt_copper_ore": 2, "lt_tin_nugget": 1 }, "forge", 1, "Fittings for iron-tier gear", "mat", 1, {}], ["cr_steel", "Steel ingot", { "cr_ore": 2, "cr_coal": 1 }, "forge", 9, "Makes 2: the steel tier", "mat", 1, {}], ["lt_darksteel_ingot", "Darksteel ingot", { "lt_darkiron_ore": 2, "lt_coke_coal": 1, "cr_ember": 1 }, "forge", 16, "The darksteel tier", "mat", 1, {}], ["lt_starmetal_ingot", "Starmetal ingot", { "lt_starmetal_ore": 2, "cr_crystal": 1, "dr_stardust": 1 }, "forge", 25, "The starmetal tier", "mat", 1, {}], ["lt_dragonforged_ingot", "Dragonforged ingot", { "lt_starmetal_ingot": 2, "cr_scale": 1 }, "forge", 36, "The top tier (the ember is not used up)", "mat", 1, {}], ["sk_bar2", "Silver bar", { "sk_ore2": 2 }, "forge", 9, "Silver rings and bracelets", "mat", 1, {}], ["sk_bar3", "Gold bar", { "sk_ore3": 2 }, "forge", 16, "Gold rings, gilding", "mat", 1, {}], ["sk_bar4", "Moonsilver bar", { "sk_ore4": 2, "lt_frost_lotus": 1 }, "forge", 25, "Moonsilver rings", "mat", 1, {}], ["sk_bar5", "Starstone bar", { "sk_ore5": 1, "sk_bar3": 1 }, "forge", 36, "Starstone rings", "mat", 1, {}], ["cr_leather", "Tanned leather", { "lt_wolf_hide": 1, "hx_salt": 1 }, "tannery", 1, "Every grip, strap and jerkin", "mat", 1, {}], ["lm_hardened_leather", "Hardened leather", { "lt_boar_hide": 2, "lt_ironbark_resin": 1 }, "tannery", 9, "Steel-tier leather armour", "mat", 1, {}], ["lm_fire_proof_leather", "Fire-proof leather", { "lt_salamander_skin": 2, "lt_cinder_salts": 1 }, "tannery", 16, "Flame cloaks, forge aprons", "mat", 1, {}], ["lm_chitin_plate", "Chitin plate", { "lt_matriarch_chitin": 2, "lt_ironbark_resin": 1 }, "forge", 25, "Light armour as strong as steel", "mat", 1, {}], ["lt_moonsilk", "Moonsilk", { "hx_silk": 3 }, "loom", 25, "Moonsilk robes, silent boots", "mat", 1, {}], ["lm_spun_gold", "Spun gold", { "lt_spinning_wheel_straw": 3, "sk_bar3": 1 }, "loom", 24, "Royal robes; Rumpelstiltskin's charm", "mat", 1, {}], ["lm_firebrick", "Firebrick", { "lt_kiln_clay": 2, "lt_crucible_shard": 1 }, "kiln", 12, "Build a home forge", "mat", 1, {}], ["lm_laboratory_vial", "Laboratory vial", { "lt_laboratory_glass": 1 }, "glass", 1, "Makes 4: every draught needs one", "mat", 1, {}], ["cr_parts", "Machine parts", { "lt_broken_gear": 2, "lt_brass_cog": 1 }, "garage", 9, "Firearms, vehicles, war machines", "mat", 1, {}]]], ["Blades", [["lm_iron_dagger", "Iron dagger", { "cr_ore": 1, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Fast, short reach", "weapon", 1, { "base": "dagger", "t": 1, "x": 1.0 }], ["lm_steel_dagger", "Steel dagger", { "cr_steel": 2, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Fast, short reach", "weapon", 1, { "base": "dagger", "t": 2, "x": 1.18 }], ["lm_darksteel_dagger", "Darksteel dagger", { "lt_darksteel_ingot": 3, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Fast, short reach", "weapon", 1, { "base": "dagger", "t": 3, "x": 1.38 }], ["lm_starmetal_dagger", "Starmetal dagger", { "lt_starmetal_ingot": 4, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Fast, short reach", "weapon", 1, { "base": "dagger", "t": 4, "x": 1.6 }], ["lm_dragonforged_dagger", "Dragonforged dagger", { "lt_dragonforged_ingot": 5, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Fast, short reach", "weapon", 1, { "base": "dagger", "t": 5, "x": 1.85 }], ["lm_iron_gladius", "Iron gladius", { "cr_ore": 1, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Quick short sword", "weapon", 1, { "base": "gladius", "t": 1, "x": 1.0 }], ["lm_steel_gladius", "Steel gladius", { "cr_steel": 2, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Quick short sword", "weapon", 1, { "base": "gladius", "t": 2, "x": 1.18 }], ["lm_darksteel_gladius", "Darksteel gladius", { "lt_darksteel_ingot": 3, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Quick short sword", "weapon", 1, { "base": "gladius", "t": 3, "x": 1.38 }], ["lm_starmetal_gladius", "Starmetal gladius", { "lt_starmetal_ingot": 4, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Quick short sword", "weapon", 1, { "base": "gladius", "t": 4, "x": 1.6 }], ["lm_dragonforged_gladius", "Dragonforged gladius", { "lt_dragonforged_ingot": 5, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Quick short sword", "weapon", 1, { "base": "gladius", "t": 5, "x": 1.85 }], ["lm_iron_longsword", "Iron longsword", { "cr_ore": 2, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Balanced; the all-rounder", "weapon", 1, { "base": "longsword", "t": 1, "x": 1.0 }], ["lm_steel_longsword", "Steel longsword", { "cr_steel": 3, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Balanced; the all-rounder", "weapon", 1, { "base": "longsword", "t": 2, "x": 1.18 }], ["lm_darksteel_longsword", "Darksteel longsword", { "lt_darksteel_ingot": 4, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Balanced; the all-rounder", "weapon", 1, { "base": "longsword", "t": 3, "x": 1.38 }], ["lm_starmetal_longsword", "Starmetal longsword", { "lt_starmetal_ingot": 5, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Balanced; the all-rounder", "weapon", 1, { "base": "longsword", "t": 4, "x": 1.6 }], ["lm_dragonforged_longsword", "Dragonforged longsword", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Balanced; the all-rounder", "weapon", 1, { "base": "longsword", "t": 5, "x": 1.85 }], ["lm_iron_katana", "Iron katana", { "cr_ore": 2, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Quick cutting strings", "weapon", 1, { "base": "katana", "t": 1, "x": 1.0 }], ["lm_steel_katana", "Steel katana", { "cr_steel": 3, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Quick cutting strings", "weapon", 1, { "base": "katana", "t": 2, "x": 1.18 }], ["lm_darksteel_katana", "Darksteel katana", { "lt_darksteel_ingot": 4, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Quick cutting strings", "weapon", 1, { "base": "katana", "t": 3, "x": 1.38 }], ["lm_starmetal_katana", "Starmetal katana", { "lt_starmetal_ingot": 5, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Quick cutting strings", "weapon", 1, { "base": "katana", "t": 4, "x": 1.6 }], ["lm_dragonforged_katana", "Dragonforged katana", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Quick cutting strings", "weapon", 1, { "base": "katana", "t": 5, "x": 1.85 }], ["lm_iron_rapier", "Iron rapier", { "cr_ore": 2, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Thrusts; long reach", "weapon", 1, { "base": "rapier", "t": 1, "x": 1.0 }], ["lm_steel_rapier", "Steel rapier", { "cr_steel": 3, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Thrusts; long reach", "weapon", 1, { "base": "rapier", "t": 2, "x": 1.18 }], ["lm_darksteel_rapier", "Darksteel rapier", { "lt_darksteel_ingot": 4, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Thrusts; long reach", "weapon", 1, { "base": "rapier", "t": 3, "x": 1.38 }], ["lm_starmetal_rapier", "Starmetal rapier", { "lt_starmetal_ingot": 5, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Thrusts; long reach", "weapon", 1, { "base": "rapier", "t": 4, "x": 1.6 }], ["lm_dragonforged_rapier", "Dragonforged rapier", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Thrusts; long reach", "weapon", 1, { "base": "rapier", "t": 5, "x": 1.85 }], ["lm_iron_scimitar", "Iron scimitar", { "cr_ore": 2, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Sweeping cuts, hits two", "weapon", 1, { "base": "scimitar", "t": 1, "x": 1.0 }], ["lm_steel_scimitar", "Steel scimitar", { "cr_steel": 3, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Sweeping cuts, hits two", "weapon", 1, { "base": "scimitar", "t": 2, "x": 1.18 }], ["lm_darksteel_scimitar", "Darksteel scimitar", { "lt_darksteel_ingot": 4, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Sweeping cuts, hits two", "weapon", 1, { "base": "scimitar", "t": 3, "x": 1.38 }], ["lm_starmetal_scimitar", "Starmetal scimitar", { "lt_starmetal_ingot": 5, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Sweeping cuts, hits two", "weapon", 1, { "base": "scimitar", "t": 4, "x": 1.6 }], ["lm_dragonforged_scimitar", "Dragonforged scimitar", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Sweeping cuts, hits two", "weapon", 1, { "base": "scimitar", "t": 5, "x": 1.85 }], ["lm_iron_greatsword", "Iron greatsword", { "cr_ore": 4, "lt_wolf_hide": 1 }, "forge", 3, "Tier 1. Two hands, slow, big hits", "weapon", 1, { "base": "greatsword", "t": 1, "x": 1.0 }], ["lm_steel_greatsword", "Steel greatsword", { "cr_steel": 5, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 11, "Tier 2. Two hands, slow, big hits", "weapon", 1, { "base": "greatsword", "t": 2, "x": 1.18 }], ["lm_darksteel_greatsword", "Darksteel greatsword", { "lt_darksteel_ingot": 6, "lt_salamander_skin": 1, "lt_golem_core_shard": 1, "lt_coke_coal": 1 }, "forge", 18, "Tier 3. Two hands, slow, big hits", "weapon", 1, { "base": "greatsword", "t": 3, "x": 1.38 }], ["lm_starmetal_greatsword", "Starmetal greatsword", { "lt_starmetal_ingot": 7, "lt_moonsilk": 1, "cr_crystal": 1, "lt_matriarch_chitin": 1 }, "forge", 27, "Tier 4. Two hands, slow, big hits", "weapon", 1, { "base": "greatsword", "t": 4, "x": 1.6 }], ["lm_dragonforged_greatsword", "Dragonforged greatsword", { "lt_dragonforged_ingot": 8, "cr_scale": 1, "lt_dragon_s_blood": 1, "lt_titan_s_sinew": 1 }, "forge", 38, "Tier 5. Two hands, slow, big hits", "weapon", 1, { "base": "greatsword", "t": 5, "x": 1.85 }], ["lm_iron_claymore", "Iron claymore", { "cr_ore": 4, "lt_wolf_hide": 1 }, "forge", 3, "Tier 1. Two hands, wide swings", "weapon", 1, { "base": "claymore", "t": 1, "x": 1.0 }], ["lm_steel_claymore", "Steel claymore", { "cr_steel": 5, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 11, "Tier 2. Two hands, wide swings", "weapon", 1, { "base": "claymore", "t": 2, "x": 1.18 }], ["lm_darksteel_claymore", "Darksteel claymore", { "lt_darksteel_ingot": 6, "lt_salamander_skin": 1, "lt_golem_core_shard": 1, "lt_coke_coal": 1 }, "forge", 18, "Tier 3. Two hands, wide swings", "weapon", 1, { "base": "claymore", "t": 3, "x": 1.38 }], ["lm_starmetal_claymore", "Starmetal claymore", { "lt_starmetal_ingot": 7, "lt_moonsilk": 1, "cr_crystal": 1, "lt_matriarch_chitin": 1 }, "forge", 27, "Tier 4. Two hands, wide swings", "weapon", 1, { "base": "claymore", "t": 4, "x": 1.6 }], ["lm_dragonforged_claymore", "Dragonforged claymore", { "lt_dragonforged_ingot": 8, "cr_scale": 1, "lt_dragon_s_blood": 1, "lt_titan_s_sinew": 1 }, "forge", 38, "Tier 5. Two hands, wide swings", "weapon", 1, { "base": "claymore", "t": 5, "x": 1.85 }]]], ["Axes and hammers", [["lm_iron_battleaxe", "Iron battleaxe", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Heavy cleaves", "weapon", 1, { "base": "battleaxe", "t": 1, "x": 1.0 }], ["lm_steel_battleaxe", "Steel battleaxe", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Heavy cleaves", "weapon", 1, { "base": "battleaxe", "t": 2, "x": 1.18 }], ["lm_darksteel_battleaxe", "Darksteel battleaxe", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Heavy cleaves", "weapon", 1, { "base": "battleaxe", "t": 3, "x": 1.38 }], ["lm_starmetal_battleaxe", "Starmetal battleaxe", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Heavy cleaves", "weapon", 1, { "base": "battleaxe", "t": 4, "x": 1.6 }], ["lm_dragonforged_battleaxe", "Dragonforged battleaxe", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Heavy cleaves", "weapon", 1, { "base": "battleaxe", "t": 5, "x": 1.85 }], ["lm_iron_mace", "Iron mace", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Crushes armour", "weapon", 1, { "base": "mace", "t": 1, "x": 1.0 }], ["lm_steel_mace", "Steel mace", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Crushes armour", "weapon", 1, { "base": "mace", "t": 2, "x": 1.18 }], ["lm_darksteel_mace", "Darksteel mace", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Crushes armour", "weapon", 1, { "base": "mace", "t": 3, "x": 1.38 }], ["lm_starmetal_mace", "Starmetal mace", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Crushes armour", "weapon", 1, { "base": "mace", "t": 4, "x": 1.6 }], ["lm_dragonforged_mace", "Dragonforged mace", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Crushes armour", "weapon", 1, { "base": "mace", "t": 5, "x": 1.85 }], ["lm_iron_morningstar", "Iron morningstar", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Spiked: bleeds", "weapon", 1, { "base": "morningstar", "t": 1, "x": 1.0 }], ["lm_steel_morningstar", "Steel morningstar", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Spiked: bleeds", "weapon", 1, { "base": "morningstar", "t": 2, "x": 1.18 }], ["lm_darksteel_morningstar", "Darksteel morningstar", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Spiked: bleeds", "weapon", 1, { "base": "morningstar", "t": 3, "x": 1.38 }], ["lm_starmetal_morningstar", "Starmetal morningstar", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Spiked: bleeds", "weapon", 1, { "base": "morningstar", "t": 4, "x": 1.6 }], ["lm_dragonforged_morningstar", "Dragonforged morningstar", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Spiked: bleeds", "weapon", 1, { "base": "morningstar", "t": 5, "x": 1.85 }], ["lm_iron_flail", "Iron flail", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Hard to block", "weapon", 1, { "base": "flail", "t": 1, "x": 1.0 }], ["lm_steel_flail", "Steel flail", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Hard to block", "weapon", 1, { "base": "flail", "t": 2, "x": 1.18 }], ["lm_darksteel_flail", "Darksteel flail", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Hard to block", "weapon", 1, { "base": "flail", "t": 3, "x": 1.38 }], ["lm_starmetal_flail", "Starmetal flail", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Hard to block", "weapon", 1, { "base": "flail", "t": 4, "x": 1.6 }], ["lm_dragonforged_flail", "Dragonforged flail", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Hard to block", "weapon", 1, { "base": "flail", "t": 5, "x": 1.85 }], ["lm_iron_war_hammer", "Iron war hammer", { "cr_ore": 4, "lt_wolf_hide": 1 }, "forge", 3, "Tier 1. Stuns big beasts", "weapon", 1, { "base": "warhammer", "t": 1, "x": 1.0 }], ["lm_steel_war_hammer", "Steel war hammer", { "cr_steel": 5, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 11, "Tier 2. Stuns big beasts", "weapon", 1, { "base": "warhammer", "t": 2, "x": 1.18 }], ["lm_darksteel_war_hammer", "Darksteel war hammer", { "lt_darksteel_ingot": 6, "lt_salamander_skin": 1, "lt_golem_core_shard": 1, "lt_coke_coal": 1 }, "forge", 18, "Tier 3. Stuns big beasts", "weapon", 1, { "base": "warhammer", "t": 3, "x": 1.38 }], ["lm_starmetal_war_hammer", "Starmetal war hammer", { "lt_starmetal_ingot": 7, "lt_moonsilk": 1, "cr_crystal": 1, "lt_matriarch_chitin": 1 }, "forge", 27, "Tier 4. Stuns big beasts", "weapon", 1, { "base": "warhammer", "t": 4, "x": 1.6 }], ["lm_dragonforged_war_hammer", "Dragonforged war hammer", { "lt_dragonforged_ingot": 8, "cr_scale": 1, "lt_dragon_s_blood": 1, "lt_titan_s_sinew": 1 }, "forge", 38, "Tier 5. Stuns big beasts", "weapon", 1, { "base": "warhammer", "t": 5, "x": 1.85 }]]], ["Pole arms and shields", [["lm_iron_spear", "Iron spear", { "cr_ore": 2, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Long reach", "weapon", 1, { "base": "spear", "t": 1, "x": 1.0 }], ["lm_steel_spear", "Steel spear", { "cr_steel": 3, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Long reach", "weapon", 1, { "base": "spear", "t": 2, "x": 1.18 }], ["lm_darksteel_spear", "Darksteel spear", { "lt_darksteel_ingot": 4, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Long reach", "weapon", 1, { "base": "spear", "t": 3, "x": 1.38 }], ["lm_starmetal_spear", "Starmetal spear", { "lt_starmetal_ingot": 5, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Long reach", "weapon", 1, { "base": "spear", "t": 4, "x": 1.6 }], ["lm_dragonforged_spear", "Dragonforged spear", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Long reach", "weapon", 1, { "base": "spear", "t": 5, "x": 1.85 }], ["lm_iron_halberd", "Iron halberd", { "cr_ore": 4, "lt_wolf_hide": 1 }, "forge", 3, "Tier 1. Reach and cleave", "weapon", 1, { "base": "halberd", "t": 1, "x": 1.0 }], ["lm_steel_halberd", "Steel halberd", { "cr_steel": 5, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 11, "Tier 2. Reach and cleave", "weapon", 1, { "base": "halberd", "t": 2, "x": 1.18 }], ["lm_darksteel_halberd", "Darksteel halberd", { "lt_darksteel_ingot": 6, "lt_salamander_skin": 1, "lt_golem_core_shard": 1, "lt_coke_coal": 1 }, "forge", 18, "Tier 3. Reach and cleave", "weapon", 1, { "base": "halberd", "t": 3, "x": 1.38 }], ["lm_starmetal_halberd", "Starmetal halberd", { "lt_starmetal_ingot": 7, "lt_moonsilk": 1, "cr_crystal": 1, "lt_matriarch_chitin": 1 }, "forge", 27, "Tier 4. Reach and cleave", "weapon", 1, { "base": "halberd", "t": 4, "x": 1.6 }], ["lm_dragonforged_halberd", "Dragonforged halberd", { "lt_dragonforged_ingot": 8, "cr_scale": 1, "lt_dragon_s_blood": 1, "lt_titan_s_sinew": 1 }, "forge", 38, "Tier 5. Reach and cleave", "weapon", 1, { "base": "halberd", "t": 5, "x": 1.85 }], ["lm_iron_lance", "Iron lance", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Charges from a mount", "weapon", 1, { "base": "lance", "t": 1, "x": 1.0 }], ["lm_steel_lance", "Steel lance", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Charges from a mount", "weapon", 1, { "base": "lance", "t": 2, "x": 1.18 }], ["lm_darksteel_lance", "Darksteel lance", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Charges from a mount", "weapon", 1, { "base": "lance", "t": 3, "x": 1.38 }], ["lm_starmetal_lance", "Starmetal lance", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Charges from a mount", "weapon", 1, { "base": "lance", "t": 4, "x": 1.6 }], ["lm_dragonforged_lance", "Dragonforged lance", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Charges from a mount", "weapon", 1, { "base": "lance", "t": 5, "x": 1.85 }], ["lm_iron_trident", "Iron trident", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Holds a beast in place", "weapon", 1, { "base": "trident", "t": 1, "x": 1.0 }], ["lm_steel_trident", "Steel trident", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Holds a beast in place", "weapon", 1, { "base": "trident", "t": 2, "x": 1.18 }], ["lm_darksteel_trident", "Darksteel trident", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Holds a beast in place", "weapon", 1, { "base": "trident", "t": 3, "x": 1.38 }], ["lm_starmetal_trident", "Starmetal trident", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Holds a beast in place", "weapon", 1, { "base": "trident", "t": 4, "x": 1.6 }], ["lm_dragonforged_trident", "Dragonforged trident", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Holds a beast in place", "weapon", 1, { "base": "trident", "t": 5, "x": 1.85 }], ["lm_iron_scythe", "Iron scythe", { "cr_ore": 3, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Sweeps a circle", "weapon", 1, { "base": "scythe", "t": 1, "x": 1.0 }], ["lm_steel_scythe", "Steel scythe", { "cr_steel": 4, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Sweeps a circle", "weapon", 1, { "base": "scythe", "t": 2, "x": 1.18 }], ["lm_darksteel_scythe", "Darksteel scythe", { "lt_darksteel_ingot": 5, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Sweeps a circle", "weapon", 1, { "base": "scythe", "t": 3, "x": 1.38 }], ["lm_starmetal_scythe", "Starmetal scythe", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Sweeps a circle", "weapon", 1, { "base": "scythe", "t": 4, "x": 1.6 }], ["lm_dragonforged_scythe", "Dragonforged scythe", { "lt_dragonforged_ingot": 7, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Sweeps a circle", "weapon", 1, { "base": "scythe", "t": 5, "x": 1.85 }], ["lm_iron_round_shield", "Iron round shield", { "cr_ore": 2, "lt_wolf_hide": 1 }, "forge", 1, "Tier 1. Blocks; bash", "weapon", 1, { "base": "roundshield", "t": 1, "x": 1.0 }], ["lm_steel_round_shield", "Steel round shield", { "cr_steel": 3, "lt_boar_hide": 1, "lt_grave_iron_rivet": 1 }, "forge", 9, "Tier 2. Blocks; bash", "weapon", 1, { "base": "roundshield", "t": 2, "x": 1.18 }], ["lm_darksteel_round_shield", "Darksteel round shield", { "lt_darksteel_ingot": 4, "lt_salamander_skin": 1, "lt_golem_core_shard": 1 }, "forge", 16, "Tier 3. Blocks; bash", "weapon", 1, { "base": "roundshield", "t": 3, "x": 1.38 }], ["lm_starmetal_round_shield", "Starmetal round shield", { "lt_starmetal_ingot": 5, "lt_moonsilk": 1, "cr_crystal": 1 }, "forge", 25, "Tier 4. Blocks; bash", "weapon", 1, { "base": "roundshield", "t": 4, "x": 1.6 }], ["lm_dragonforged_round_shield", "Dragonforged round shield", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_dragon_s_blood": 1 }, "forge", 36, "Tier 5. Blocks; bash", "weapon", 1, { "base": "roundshield", "t": 5, "x": 1.85 }]]], ["Bows and crossbows", [["lm_ash_longbow", "Ash longbow", { "lt_ash_wood_billet": 2, "lt_linen_thread": 1 }, "bowyer", 1, "Tier 1. Long range", "weapon", 1, { "base": "longbow", "t": 1, "x": 1.0 }], ["lm_yew_longbow", "Yew longbow", { "lt_yew_stave": 2, "lt_seaweed_rope": 1 }, "bowyer", 9, "Tier 2. Long range", "weapon", 1, { "base": "longbow", "t": 2, "x": 1.18 }], ["lm_heartwood_longbow", "Heartwood longbow", { "lt_heartwood_log": 2, "lt_ironbark_resin": 2 }, "bowyer", 16, "Tier 3. Long range", "weapon", 1, { "base": "longbow", "t": 3, "x": 1.38 }], ["lm_starwood_longbow", "Starwood longbow", { "lt_starwood_branch": 2, "hx_silk": 1, "lt_ironbark_resin": 1 }, "bowyer", 25, "Tier 4. Long range", "weapon", 1, { "base": "longbow", "t": 4, "x": 1.6 }], ["lm_dragonbone_longbow", "Dragonbone longbow", { "lt_dragonbone": 2, "lt_titan_s_sinew": 1, "dr_phoenixfeather": 1 }, "bowyer", 36, "Tier 5. Long range", "weapon", 1, { "base": "longbow", "t": 5, "x": 1.85 }], ["lm_ash_horse_bow", "Ash horse bow", { "lt_ash_wood_billet": 2, "lt_linen_thread": 1 }, "bowyer", 1, "Tier 1. Shoots from the saddle", "weapon", 1, { "base": "horsebow", "t": 1, "x": 1.0 }], ["lm_yew_horse_bow", "Yew horse bow", { "lt_yew_stave": 2, "lt_seaweed_rope": 1 }, "bowyer", 9, "Tier 2. Shoots from the saddle", "weapon", 1, { "base": "horsebow", "t": 2, "x": 1.18 }], ["lm_heartwood_horse_bow", "Heartwood horse bow", { "lt_heartwood_log": 2, "lt_ironbark_resin": 2 }, "bowyer", 16, "Tier 3. Shoots from the saddle", "weapon", 1, { "base": "horsebow", "t": 3, "x": 1.38 }], ["lm_starwood_horse_bow", "Starwood horse bow", { "lt_starwood_branch": 2, "hx_silk": 1, "lt_ironbark_resin": 1 }, "bowyer", 25, "Tier 4. Shoots from the saddle", "weapon", 1, { "base": "horsebow", "t": 4, "x": 1.6 }], ["lm_dragonbone_horse_bow", "Dragonbone horse bow", { "lt_dragonbone": 2, "lt_titan_s_sinew": 1, "dr_phoenixfeather": 1 }, "bowyer", 36, "Tier 5. Shoots from the saddle", "weapon", 1, { "base": "horsebow", "t": 5, "x": 1.85 }], ["lm_ash_crossbow", "Ash crossbow", { "lt_ash_wood_billet": 2, "lt_linen_thread": 1, "cr_ore": 1 }, "bowyer", 1, "Tier 1. Slow, hits hard", "weapon", 1, { "base": "crossbow", "t": 1, "x": 1.0 }], ["lm_yew_crossbow", "Yew crossbow", { "lt_yew_stave": 2, "lt_seaweed_rope": 1, "cr_steel": 1 }, "bowyer", 9, "Tier 2. Slow, hits hard", "weapon", 1, { "base": "crossbow", "t": 2, "x": 1.18 }], ["lm_heartwood_crossbow", "Heartwood crossbow", { "lt_heartwood_log": 2, "lt_ironbark_resin": 2, "lt_darksteel_ingot": 1 }, "bowyer", 16, "Tier 3. Slow, hits hard", "weapon", 1, { "base": "crossbow", "t": 3, "x": 1.38 }], ["lm_starwood_crossbow", "Starwood crossbow", { "lt_starwood_branch": 2, "hx_silk": 1, "lt_starmetal_ingot": 1, "lt_ironbark_resin": 1 }, "bowyer", 25, "Tier 4. Slow, hits hard", "weapon", 1, { "base": "crossbow", "t": 4, "x": 1.6 }], ["lm_dragonbone_crossbow", "Dragonbone crossbow", { "lt_dragonbone": 2, "lt_titan_s_sinew": 1, "lt_dragonforged_ingot": 1, "dr_phoenixfeather": 1 }, "bowyer", 36, "Tier 5. Slow, hits hard", "weapon", 1, { "base": "crossbow", "t": 5, "x": 1.85 }], ["lm_ash_arbalest", "Ash arbalest", { "lt_ash_wood_billet": 3, "lt_linen_thread": 1, "cr_ore": 1 }, "bowyer", 1, "Tier 1. Siege crossbow, pierces", "weapon", 1, { "base": "arbalest", "t": 1, "x": 1.0 }], ["lm_yew_arbalest", "Yew arbalest", { "lt_yew_stave": 3, "lt_seaweed_rope": 1, "cr_steel": 1 }, "bowyer", 9, "Tier 2. Siege crossbow, pierces", "weapon", 1, { "base": "arbalest", "t": 2, "x": 1.18 }], ["lm_heartwood_arbalest", "Heartwood arbalest", { "lt_heartwood_log": 3, "lt_ironbark_resin": 2, "lt_darksteel_ingot": 1 }, "bowyer", 16, "Tier 3. Siege crossbow, pierces", "weapon", 1, { "base": "arbalest", "t": 3, "x": 1.38 }], ["lm_starwood_arbalest", "Starwood arbalest", { "lt_starwood_branch": 3, "hx_silk": 1, "lt_starmetal_ingot": 1, "lt_ironbark_resin": 1 }, "bowyer", 25, "Tier 4. Siege crossbow, pierces", "weapon", 1, { "base": "arbalest", "t": 4, "x": 1.6 }], ["lm_dragonbone_arbalest", "Dragonbone arbalest", { "lt_dragonbone": 3, "lt_titan_s_sinew": 1, "lt_dragonforged_ingot": 1, "dr_phoenixfeather": 1 }, "bowyer", 36, "Tier 5. Siege crossbow, pierces", "weapon", 1, { "base": "arbalest", "t": 5, "x": 1.85 }]]], ["Staves and wands", [["lm_ash_firestaff", "Ash firestaff", { "lt_ash_wood_billet": 2, "lt_cracked_quartz": 1, "lt_cinder_salts": 1 }, "ench", 1, "Tier 1. Fire bolts", "weapon", 1, { "base": "firestaff", "t": 1, "x": 1.0 }], ["lm_yew_firestaff", "Yew firestaff", { "lt_yew_stave": 2, "lt_garnet": 1, "lt_cinder_salts": 1 }, "ench", 9, "Tier 2. Fire bolts", "weapon", 1, { "base": "firestaff", "t": 2, "x": 1.18 }], ["lm_heartwood_firestaff", "Heartwood firestaff", { "lt_heartwood_log": 2, "lt_sapphire": 1, "lt_cinder_salts": 2 }, "ench", 16, "Tier 3. Fire bolts", "weapon", 1, { "base": "firestaff", "t": 3, "x": 1.38 }], ["lm_starwood_firestaff", "Starwood firestaff", { "lt_starwood_branch": 2, "lt_emerald": 1, "lt_cinder_salts": 2 }, "ench", 25, "Tier 4. Fire bolts", "weapon", 1, { "base": "firestaff", "t": 4, "x": 1.6 }], ["lm_dragonbone_firestaff", "Dragonbone firestaff", { "lt_dragonbone": 2, "lt_ruby": 1, "lt_cinder_salts": 3 }, "ench", 36, "Tier 5. Fire bolts", "weapon", 1, { "base": "firestaff", "t": 5, "x": 1.85 }], ["lm_ash_froststaff", "Ash froststaff", { "lt_ash_wood_billet": 2, "lt_cracked_quartz": 1, "lt_frost_lotus": 1 }, "ench", 1, "Tier 1. Slows and freezes", "weapon", 1, { "base": "froststaff", "t": 1, "x": 1.0 }], ["lm_yew_froststaff", "Yew froststaff", { "lt_yew_stave": 2, "lt_garnet": 1, "lt_frost_lotus": 1 }, "ench", 9, "Tier 2. Slows and freezes", "weapon", 1, { "base": "froststaff", "t": 2, "x": 1.18 }], ["lm_heartwood_froststaff", "Heartwood froststaff", { "lt_heartwood_log": 2, "lt_sapphire": 1, "lt_frost_lotus": 2 }, "ench", 16, "Tier 3. Slows and freezes", "weapon", 1, { "base": "froststaff", "t": 3, "x": 1.38 }], ["lm_starwood_froststaff", "Starwood froststaff", { "lt_starwood_branch": 2, "lt_emerald": 1, "lt_frost_lotus": 2 }, "ench", 25, "Tier 4. Slows and freezes", "weapon", 1, { "base": "froststaff", "t": 4, "x": 1.6 }], ["lm_dragonbone_froststaff", "Dragonbone froststaff", { "lt_dragonbone": 2, "lt_ruby": 1, "lt_frost_lotus": 3 }, "ench", 36, "Tier 5. Slows and freezes", "weapon", 1, { "base": "froststaff", "t": 5, "x": 1.85 }], ["lm_ash_mendstaff", "Ash mendstaff", { "lt_ash_wood_billet": 2, "lt_cracked_quartz": 1, "sk_herb3": 1 }, "ench", 1, "Tier 1. Heals you and friends", "weapon", 1, { "base": "mendstaff", "t": 1, "x": 1.0 }], ["lm_yew_mendstaff", "Yew mendstaff", { "lt_yew_stave": 2, "lt_garnet": 1, "sk_herb3": 1 }, "ench", 9, "Tier 2. Heals you and friends", "weapon", 1, { "base": "mendstaff", "t": 2, "x": 1.18 }], ["lm_heartwood_mendstaff", "Heartwood mendstaff", { "lt_heartwood_log": 2, "lt_sapphire": 1, "sk_herb3": 2 }, "ench", 16, "Tier 3. Heals you and friends", "weapon", 1, { "base": "mendstaff", "t": 3, "x": 1.38 }], ["lm_starwood_mendstaff", "Starwood mendstaff", { "lt_starwood_branch": 2, "lt_emerald": 1, "sk_herb3": 2 }, "ench", 25, "Tier 4. Heals you and friends", "weapon", 1, { "base": "mendstaff", "t": 4, "x": 1.6 }], ["lm_dragonbone_mendstaff", "Dragonbone mendstaff", { "lt_dragonbone": 2, "lt_ruby": 1, "sk_herb3": 3 }, "ench", 36, "Tier 5. Heals you and friends", "weapon", 1, { "base": "mendstaff", "t": 5, "x": 1.85 }], ["lm_ash_stormrod", "Ash stormrod", { "lt_ash_wood_billet": 2, "lt_cracked_quartz": 1, "lt_galvanic_coil": 1 }, "ench", 1, "Tier 1. Chain lightning", "weapon", 1, { "base": "stormrod", "t": 1, "x": 1.0 }], ["lm_yew_stormrod", "Yew stormrod", { "lt_yew_stave": 2, "lt_garnet": 1, "lt_galvanic_coil": 1 }, "ench", 9, "Tier 2. Chain lightning", "weapon", 1, { "base": "stormrod", "t": 2, "x": 1.18 }], ["lm_heartwood_stormrod", "Heartwood stormrod", { "lt_heartwood_log": 2, "lt_sapphire": 1, "lt_galvanic_coil": 2 }, "ench", 16, "Tier 3. Chain lightning", "weapon", 1, { "base": "stormrod", "t": 3, "x": 1.38 }], ["lm_starwood_stormrod", "Starwood stormrod", { "lt_starwood_branch": 2, "lt_emerald": 1, "lt_galvanic_coil": 2 }, "ench", 25, "Tier 4. Chain lightning", "weapon", 1, { "base": "stormrod", "t": 4, "x": 1.6 }], ["lm_dragonbone_stormrod", "Dragonbone stormrod", { "lt_dragonbone": 2, "lt_ruby": 1, "lt_galvanic_coil": 3 }, "ench", 36, "Tier 5. Chain lightning", "weapon", 1, { "base": "stormrod", "t": 5, "x": 1.85 }], ["lm_ash_sparkwand", "Ash sparkwand", { "lt_ash_wood_billet": 2, "lt_cracked_quartz": 1, "lt_pixie_dust": 1 }, "ench", 1, "Tier 1. Quick sparks", "weapon", 1, { "base": "sparkwand", "t": 1, "x": 1.0 }], ["lm_yew_sparkwand", "Yew sparkwand", { "lt_yew_stave": 2, "lt_garnet": 1, "lt_pixie_dust": 1 }, "ench", 9, "Tier 2. Quick sparks", "weapon", 1, { "base": "sparkwand", "t": 2, "x": 1.18 }], ["lm_heartwood_sparkwand", "Heartwood sparkwand", { "lt_heartwood_log": 2, "lt_sapphire": 1, "lt_pixie_dust": 2 }, "ench", 16, "Tier 3. Quick sparks", "weapon", 1, { "base": "sparkwand", "t": 3, "x": 1.38 }], ["lm_starwood_sparkwand", "Starwood sparkwand", { "lt_starwood_branch": 2, "lt_emerald": 1, "lt_pixie_dust": 2 }, "ench", 25, "Tier 4. Quick sparks", "weapon", 1, { "base": "sparkwand", "t": 4, "x": 1.6 }], ["lm_dragonbone_sparkwand", "Dragonbone sparkwand", { "lt_dragonbone": 2, "lt_ruby": 1, "lt_pixie_dust": 3 }, "ench", 36, "Tier 5. Quick sparks", "weapon", 1, { "base": "sparkwand", "t": 5, "x": 1.85 }]]], ["Armour, robes and cloaks", [["lm_iron_helm", "Iron helm", { "cr_ore": 2, "cr_leather": 1 }, "forge", 1, "Tier 1 armour", "armour", 1, {}], ["lm_steel_helm", "Steel helm", { "cr_steel": 2, "lm_hardened_leather": 1 }, "forge", 9, "Tier 2 armour", "armour", 1, {}], ["lm_darksteel_helm", "Darksteel helm", { "lt_darksteel_ingot": 2, "lm_fire_proof_leather": 1 }, "forge", 16, "Tier 3 armour", "armour", 1, {}], ["lm_starmetal_helm", "Starmetal helm", { "lt_starmetal_ingot": 2, "lt_moonsilk": 1 }, "forge", 25, "Tier 4 armour", "armour", 1, {}], ["lm_dragonforged_helm", "Dragonforged helm", { "lt_dragonforged_ingot": 2, "cr_scale": 1 }, "forge", 36, "Tier 5 armour", "armour", 1, {}], ["lm_iron_jerkin", "Iron jerkin", { "cr_leather": 3, "lt_linen_thread": 1 }, "tannery", 1, "Tier 1 armour", "armour", 1, {}], ["lm_steel_jerkin", "Steel jerkin", { "lm_hardened_leather": 3, "lt_grave_iron_rivet": 1 }, "tannery", 9, "Tier 2 armour", "armour", 1, {}], ["lm_darksteel_jerkin", "Darksteel jerkin", { "lm_fire_proof_leather": 3, "lt_golem_core_shard": 1 }, "tannery", 16, "Tier 3 armour", "armour", 1, {}], ["lm_starmetal_jerkin", "Starmetal jerkin", { "lm_chitin_plate": 3, "cr_crystal": 1 }, "tannery", 25, "Tier 4 armour", "armour", 1, {}], ["lm_dragonforged_jerkin", "Dragonforged jerkin", { "cr_scale": 3, "lt_dragon_s_blood": 1 }, "tannery", 36, "Tier 5 armour", "armour", 1, {}], ["lm_iron_breastplate", "Iron breastplate", { "cr_ore": 4, "cr_leather": 1 }, "forge", 1, "Tier 1 armour", "armour", 1, {}], ["lm_steel_breastplate", "Steel breastplate", { "cr_steel": 4, "lm_hardened_leather": 1 }, "forge", 9, "Tier 2 armour", "armour", 1, {}], ["lm_darksteel_breastplate", "Darksteel breastplate", { "lt_darksteel_ingot": 4, "lm_fire_proof_leather": 1 }, "forge", 16, "Tier 3 armour", "armour", 1, {}], ["lm_starmetal_breastplate", "Starmetal breastplate", { "lt_starmetal_ingot": 4, "lt_moonsilk": 1 }, "forge", 25, "Tier 4 armour", "armour", 1, {}], ["lm_dragonforged_breastplate", "Dragonforged breastplate", { "lt_dragonforged_ingot": 4, "cr_scale": 1 }, "forge", 36, "Tier 5 armour", "armour", 1, {}], ["lm_iron_gauntlets", "Iron gauntlets", { "cr_ore": 2, "cr_leather": 1 }, "forge", 1, "Tier 1 armour", "armour", 1, {}], ["lm_steel_gauntlets", "Steel gauntlets", { "cr_steel": 2, "lm_hardened_leather": 1 }, "forge", 9, "Tier 2 armour", "armour", 1, {}], ["lm_darksteel_gauntlets", "Darksteel gauntlets", { "lt_darksteel_ingot": 2, "lm_fire_proof_leather": 1 }, "forge", 16, "Tier 3 armour", "armour", 1, {}], ["lm_starmetal_gauntlets", "Starmetal gauntlets", { "lt_starmetal_ingot": 2, "lt_moonsilk": 1 }, "forge", 25, "Tier 4 armour", "armour", 1, {}], ["lm_dragonforged_gauntlets", "Dragonforged gauntlets", { "lt_dragonforged_ingot": 2, "cr_scale": 1 }, "forge", 36, "Tier 5 armour", "armour", 1, {}], ["lm_iron_greaves", "Iron greaves", { "cr_ore": 2, "cr_leather": 1 }, "forge", 1, "Tier 1 armour", "armour", 1, {}], ["lm_steel_greaves", "Steel greaves", { "cr_steel": 2, "lm_hardened_leather": 1 }, "forge", 9, "Tier 2 armour", "armour", 1, {}], ["lm_darksteel_greaves", "Darksteel greaves", { "lt_darksteel_ingot": 2, "lm_fire_proof_leather": 1 }, "forge", 16, "Tier 3 armour", "armour", 1, {}], ["lm_starmetal_greaves", "Starmetal greaves", { "lt_starmetal_ingot": 2, "lt_moonsilk": 1 }, "forge", 25, "Tier 4 armour", "armour", 1, {}], ["lm_dragonforged_greaves", "Dragonforged greaves", { "lt_dragonforged_ingot": 2, "cr_scale": 1 }, "forge", 36, "Tier 5 armour", "armour", 1, {}], ["lm_iron_battlesuit", "Iron battlesuit", { "cr_ore": 6, "cr_leather": 1, "lt_rough_flint": 2 }, "forge", 4, "Tier 1 armour", "armour", 1, {}], ["lm_steel_battlesuit", "Steel battlesuit", { "cr_steel": 6, "lm_hardened_leather": 1, "cr_ore": 2 }, "forge", 12, "Tier 2 armour", "armour", 1, {}], ["lm_darksteel_battlesuit", "Darksteel battlesuit", { "lt_darksteel_ingot": 6, "lm_fire_proof_leather": 1, "lt_coke_coal": 2 }, "forge", 19, "Tier 3 armour", "armour", 1, {}], ["lm_starmetal_battlesuit", "Starmetal battlesuit", { "lt_starmetal_ingot": 6, "lt_moonsilk": 1, "lt_matriarch_chitin": 2 }, "forge", 28, "Tier 4 armour", "armour", 1, {}], ["lm_dragonforged_battlesuit", "Dragonforged battlesuit", { "lt_dragonforged_ingot": 6, "cr_scale": 1, "lt_titan_s_sinew": 2 }, "forge", 39, "Tier 5 armour", "armour", 1, {}], ["lm_wool_robe", "Wool robe", { "lt_coarse_wool": 3, "lt_linen_thread": 1 }, "loom", 1, "Tier 1 cloth: +magic, light", "armour", 1, {}], ["lm_barrow_linen_robe", "Barrow-linen robe", { "lt_barrow_linen": 3, "lt_seaweed_rope": 1, "lt_garnet": 1 }, "loom", 9, "Tier 2 cloth: +magic, light", "armour", 1, {}], ["lm_firesilk_robe", "Firesilk robe", { "lt_firesilk": 3, "lt_ironbark_resin": 1, "lt_sapphire": 1 }, "loom", 16, "Tier 3 cloth: +magic, light", "armour", 1, {}], ["lm_moonsilk_robe", "Moonsilk robe", { "lt_moonsilk": 3, "hx_silk": 1, "lt_emerald": 1 }, "loom", 25, "Tier 4 cloth: +magic, light", "armour", 1, {}], ["lm_phoenix_robe", "Phoenix robe", { "dr_phoenixfeather": 3, "lt_titan_s_sinew": 1, "lt_ruby": 1 }, "loom", 36, "Tier 5 cloth: +magic, light", "armour", 1, {}], ["lm_fur_cloak", "Fur cloak", { "lt_yeti_fur": 2, "cr_leather": 1 }, "tailor", 9, "Frost-proof", "armour", 1, {}], ["lm_flame_cloak", "Flame cloak", { "lm_fire_proof_leather": 2, "lt_firesilk": 1 }, "tailor", 16, "Fire-proof", "armour", 1, {}], ["lm_shadow_cloak", "Shadow cloak", { "lt_scrap_of_the_dark": 2, "lt_moonsilk": 1 }, "tailor", 25, "Harder to see", "armour", 1, {}], ["lm_hunter_s_cloak", "Hunter's cloak", { "lt_leopard_pelt": 2, "lt_jungle_vine": 1 }, "tailor", 12, "Quiet steps", "armour", 1, {}], ["lm_fleece_cloak", "Fleece cloak", { "lt_golden_fleece_tuft": 3, "lm_spun_gold": 1 }, "tailor", 30, "Heals slowly", "armour", 1, {}], ["lm_silent_boots", "Silent boots", { "lt_moonsilk": 2, "lm_hardened_leather": 1 }, "forge", 25, "Beasts hear you less", "armour", 1, {}], ["lm_swim_fins", "Swim fins", { "lt_mermaid_scale": 3, "cr_leather": 1 }, "forge", 12, "Swim twice as fast", "armour", 1, {}], ["lm_glider_wings", "Glider wings", { "lt_pterodactyl_leather_wing": 2, "lt_yew_stave": 2 }, "forge", 20, "Glide down from heights", "armour", 1, {}], ["lm_bullet_proof_vest", "Bullet-proof vest", { "lt_kevlar_weave": 3, "cr_steel": 1 }, "forge", 20, "Halves bullet damage", "armour", 1, {}], ["lm_bronze_hoplite_armour", "Bronze hoplite armour", { "lt_bronze_of_troy": 4, "cr_leather": 2 }, "forge", 12, "Greek armour, +block", "armour", 1, {}], ["lm_shell_armour", "Shell armour", { "lt_nautilus_shell": 3, "lt_seaweed_rope": 1 }, "forge", 14, "Light, sea-proof", "armour", 1, {}], ["lm_tin_armour", "Tin armour", { "lt_tin_plate": 4, "ss_lampoil": 1 }, "forge", 10, "The Tin Woodman's own", "armour", 1, {}], ["lm_drakkyn_scale_armour", "Drakkyn scale armour", { "lt_drakkyn_scale": 4, "lt_drake_glass": 1 }, "forge", 30, "Fire-proof, glows", "armour", 1, {}], ["lm_space_suit_plates", "Space-suit plates", { "lt_alien_alloy": 3, "ow_he3": 1 }, "forge", 25, "Breathe in space longer", "armour", 1, {}]]], ["Ammunition and bombs", [["lm_iron_arrows", "Iron arrows (20)", { "lt_ash_wood_billet": 1, "lt_rough_flint": 2, "lt_pigeon_feather": 1 }, "bowyer", 1, "For every bow", "ammo", 20, {}], ["lm_fire_arrows", "Fire arrows (20)", { "lm_iron_arrows": 1, "ss_lampoil": 1 }, "bowyer", 9, "Set beasts alight", "ammo", 20, {}], ["lm_venom_bolts", "Venom bolts (20)", { "lt_spider_fang": 1, "lt_venom_drop": 1, "lt_yew_stave": 1 }, "bowyer", 20, "Crossbow bolts that poison", "ammo", 20, {}], ["lm_starmetal_arrows", "Starmetal arrows (20)", { "lt_starmetal_ingot": 1, "lt_starwood_branch": 1, "lt_raven_feather": 1 }, "bowyer", 25, "Pierce armour", "ammo", 20, {}], ["lm_bullets", "Bullets (30)", { "lt_spent_brass": 2, "lm_blasting_powder": 1 }, "gun", 9, "For every firearm", "ammo", 30, {}], ["lm_blasting_powder", "Blasting powder", { "lt_sulphur_crystal": 1, "cr_coal": 1, "lt_bone_dust": 1 }, "gun", 9, "Bullets, bombs", "ammo", 1, {}], ["lm_fire_bomb", "Fire bomb", { "lm_laboratory_vial": 1, "ss_lampoil": 1, "lt_cinder_salts": 1 }, "alch", 12, "Thrown: fire on the ground", "ammo", 1, {}], ["lm_smoke_bomb", "Smoke bomb", { "lm_laboratory_vial": 1, "lt_kraken_ink": 1 }, "alch", 14, "Thrown: hide and slip away", "ammo", 1, {}], ["lm_discord_bomb", "Discord bomb", { "lt_sour_note_in_glass": 1, "lt_singing_glass_shard": 1 }, "alch", 22, "Thrown: beasts fight each other", "ammo", 1, {}], ["lm_energy_cell", "Energy cell", { "lt_fuel_cell": 1, "ow_he3": 1 }, "gun", 25, "Ammunition for star weapons", "ammo", 1, {}]]], ["Firearms in five tiers", [["lm_iron_flintlock", "Iron flintlock", { "lt_gunmetal": 2, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. One shot, then reload", "weapon", 1, { "base": "flintlock", "t": 1, "x": 1.0 }], ["lm_steel_flintlock", "Steel flintlock", { "cr_steel": 2, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. One shot, then reload", "weapon", 1, { "base": "flintlock", "t": 2, "x": 1.18 }], ["lm_darksteel_flintlock", "Darksteel flintlock", { "lt_darksteel_ingot": 2, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. One shot, then reload", "weapon", 1, { "base": "flintlock", "t": 3, "x": 1.38 }], ["lm_starmetal_flintlock", "Starmetal flintlock", { "lt_starmetal_ingot": 2, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. One shot, then reload", "weapon", 1, { "base": "flintlock", "t": 4, "x": 1.6 }], ["lm_dragonforged_flintlock", "Dragonforged flintlock", { "lt_dragonforged_ingot": 2, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. One shot, then reload", "weapon", 1, { "base": "flintlock", "t": 5, "x": 1.85 }], ["lm_iron_musket", "Iron musket", { "lt_gunmetal": 3, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Long, slow, strong", "weapon", 1, { "base": "musket", "t": 1, "x": 1.0 }], ["lm_steel_musket", "Steel musket", { "cr_steel": 3, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Long, slow, strong", "weapon", 1, { "base": "musket", "t": 2, "x": 1.18 }], ["lm_darksteel_musket", "Darksteel musket", { "lt_darksteel_ingot": 3, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Long, slow, strong", "weapon", 1, { "base": "musket", "t": 3, "x": 1.38 }], ["lm_starmetal_musket", "Starmetal musket", { "lt_starmetal_ingot": 3, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Long, slow, strong", "weapon", 1, { "base": "musket", "t": 4, "x": 1.6 }], ["lm_dragonforged_musket", "Dragonforged musket", { "lt_dragonforged_ingot": 3, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Long, slow, strong", "weapon", 1, { "base": "musket", "t": 5, "x": 1.85 }], ["lm_iron_revolver", "Iron revolver", { "lt_gunmetal": 2, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Six shots", "weapon", 1, { "base": "revolver", "t": 1, "x": 1.0 }], ["lm_steel_revolver", "Steel revolver", { "cr_steel": 2, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Six shots", "weapon", 1, { "base": "revolver", "t": 2, "x": 1.18 }], ["lm_darksteel_revolver", "Darksteel revolver", { "lt_darksteel_ingot": 2, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Six shots", "weapon", 1, { "base": "revolver", "t": 3, "x": 1.38 }], ["lm_starmetal_revolver", "Starmetal revolver", { "lt_starmetal_ingot": 2, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Six shots", "weapon", 1, { "base": "revolver", "t": 4, "x": 1.6 }], ["lm_dragonforged_revolver", "Dragonforged revolver", { "lt_dragonforged_ingot": 2, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Six shots", "weapon", 1, { "base": "revolver", "t": 5, "x": 1.85 }], ["lm_iron_lever_action_rifle", "Iron lever-action rifle", { "lt_gunmetal": 3, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Fast rifle", "weapon", 1, { "base": "leveraction", "t": 1, "x": 1.0 }], ["lm_steel_lever_action_rifle", "Steel lever-action rifle", { "cr_steel": 3, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Fast rifle", "weapon", 1, { "base": "leveraction", "t": 2, "x": 1.18 }], ["lm_darksteel_lever_action_rifle", "Darksteel lever-action rifle", { "lt_darksteel_ingot": 3, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Fast rifle", "weapon", 1, { "base": "leveraction", "t": 3, "x": 1.38 }], ["lm_starmetal_lever_action_rifle", "Starmetal lever-action rifle", { "lt_starmetal_ingot": 3, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Fast rifle", "weapon", 1, { "base": "leveraction", "t": 4, "x": 1.6 }], ["lm_dragonforged_lever_action_rifle", "Dragonforged lever-action rifle", { "lt_dragonforged_ingot": 3, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Fast rifle", "weapon", 1, { "base": "leveraction", "t": 5, "x": 1.85 }], ["lm_iron_rifle", "Iron rifle", { "lt_gunmetal": 3, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Steady long shots", "weapon", 1, { "base": "rifle", "t": 1, "x": 1.0 }], ["lm_steel_rifle", "Steel rifle", { "cr_steel": 3, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Steady long shots", "weapon", 1, { "base": "rifle", "t": 2, "x": 1.18 }], ["lm_darksteel_rifle", "Darksteel rifle", { "lt_darksteel_ingot": 3, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Steady long shots", "weapon", 1, { "base": "rifle", "t": 3, "x": 1.38 }], ["lm_starmetal_rifle", "Starmetal rifle", { "lt_starmetal_ingot": 3, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Steady long shots", "weapon", 1, { "base": "rifle", "t": 4, "x": 1.6 }], ["lm_dragonforged_rifle", "Dragonforged rifle", { "lt_dragonforged_ingot": 3, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Steady long shots", "weapon", 1, { "base": "rifle", "t": 5, "x": 1.85 }], ["lm_iron_shotgun", "Iron shotgun", { "lt_gunmetal": 3, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Close and wide", "weapon", 1, { "base": "shotgun", "t": 1, "x": 1.0 }], ["lm_steel_shotgun", "Steel shotgun", { "cr_steel": 3, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Close and wide", "weapon", 1, { "base": "shotgun", "t": 2, "x": 1.18 }], ["lm_darksteel_shotgun", "Darksteel shotgun", { "lt_darksteel_ingot": 3, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Close and wide", "weapon", 1, { "base": "shotgun", "t": 3, "x": 1.38 }], ["lm_starmetal_shotgun", "Starmetal shotgun", { "lt_starmetal_ingot": 3, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Close and wide", "weapon", 1, { "base": "shotgun", "t": 4, "x": 1.6 }], ["lm_dragonforged_shotgun", "Dragonforged shotgun", { "lt_dragonforged_ingot": 3, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Close and wide", "weapon", 1, { "base": "shotgun", "t": 5, "x": 1.85 }], ["lm_iron_submachine_gun", "Iron submachine gun", { "lt_gunmetal": 3, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Sprays fast", "weapon", 1, { "base": "smg", "t": 1, "x": 1.0 }], ["lm_steel_submachine_gun", "Steel submachine gun", { "cr_steel": 3, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Sprays fast", "weapon", 1, { "base": "smg", "t": 2, "x": 1.18 }], ["lm_darksteel_submachine_gun", "Darksteel submachine gun", { "lt_darksteel_ingot": 3, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Sprays fast", "weapon", 1, { "base": "smg", "t": 3, "x": 1.38 }], ["lm_starmetal_submachine_gun", "Starmetal submachine gun", { "lt_starmetal_ingot": 3, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Sprays fast", "weapon", 1, { "base": "smg", "t": 4, "x": 1.6 }], ["lm_dragonforged_submachine_gun", "Dragonforged submachine gun", { "lt_dragonforged_ingot": 3, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Sprays fast", "weapon", 1, { "base": "smg", "t": 5, "x": 1.85 }], ["lm_iron_assault_rifle", "Iron assault rifle", { "lt_gunmetal": 4, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Bursts", "weapon", 1, { "base": "assault", "t": 1, "x": 1.0 }], ["lm_steel_assault_rifle", "Steel assault rifle", { "cr_steel": 4, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Bursts", "weapon", 1, { "base": "assault", "t": 2, "x": 1.18 }], ["lm_darksteel_assault_rifle", "Darksteel assault rifle", { "lt_darksteel_ingot": 4, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Bursts", "weapon", 1, { "base": "assault", "t": 3, "x": 1.38 }], ["lm_starmetal_assault_rifle", "Starmetal assault rifle", { "lt_starmetal_ingot": 4, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Bursts", "weapon", 1, { "base": "assault", "t": 4, "x": 1.6 }], ["lm_dragonforged_assault_rifle", "Dragonforged assault rifle", { "lt_dragonforged_ingot": 4, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Bursts", "weapon", 1, { "base": "assault", "t": 5, "x": 1.85 }], ["lm_iron_sniper_rifle", "Iron sniper rifle", { "lt_gunmetal": 4, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 1, "Tier 1. Scope; very long range", "weapon", 1, { "base": "sniper", "t": 1, "x": 1.0 }], ["lm_steel_sniper_rifle", "Steel sniper rifle", { "cr_steel": 4, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 9, "Tier 2. Scope; very long range", "weapon", 1, { "base": "sniper", "t": 2, "x": 1.18 }], ["lm_darksteel_sniper_rifle", "Darksteel sniper rifle", { "lt_darksteel_ingot": 4, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 16, "Tier 3. Scope; very long range", "weapon", 1, { "base": "sniper", "t": 3, "x": 1.38 }], ["lm_starmetal_sniper_rifle", "Starmetal sniper rifle", { "lt_starmetal_ingot": 4, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 25, "Tier 4. Scope; very long range", "weapon", 1, { "base": "sniper", "t": 4, "x": 1.6 }], ["lm_dragonforged_sniper_rifle", "Dragonforged sniper rifle", { "lt_dragonforged_ingot": 4, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 36, "Tier 5. Scope; very long range", "weapon", 1, { "base": "sniper", "t": 5, "x": 1.85 }]]], ["Star weapons in five tiers", [["lm_iron_beam_blade", "Iron beam blade", { "lt_gunmetal": 3, "lt_fuel_cell": 1, "lt_lens": 1 }, "star", 1, "Tier 1. Cuts through shields", "weapon", 1, { "base": "beamblade", "t": 1, "x": 1.0 }], ["lm_steel_beam_blade", "Steel beam blade", { "cr_steel": 3, "lt_fuel_cell": 1, "lt_alien_alloy": 1 }, "star", 9, "Tier 2. Cuts through shields", "weapon", 1, { "base": "beamblade", "t": 2, "x": 1.18 }], ["lm_darksteel_beam_blade", "Darksteel beam blade", { "lt_darksteel_ingot": 3, "lt_fuel_cell": 2, "ow_he3": 1 }, "star", 16, "Tier 3. Cuts through shields", "weapon", 1, { "base": "beamblade", "t": 3, "x": 1.38 }], ["lm_starmetal_beam_blade", "Starmetal beam blade", { "lt_starmetal_ingot": 3, "lt_fuel_cell": 2, "cr_crystal": 2 }, "star", 25, "Tier 4. Cuts through shields", "weapon", 1, { "base": "beamblade", "t": 4, "x": 1.6 }], ["lm_dragonforged_beam_blade", "Dragonforged beam blade", { "lt_dragonforged_ingot": 3, "lt_fuel_cell": 3, "lt_dragon_s_blood": 2 }, "star", 36, "Tier 5. Cuts through shields", "weapon", 1, { "base": "beamblade", "t": 5, "x": 1.85 }], ["lm_iron_blaster", "Iron blaster", { "lt_gunmetal": 2, "lt_fuel_cell": 1, "lt_lens": 1 }, "star", 1, "Tier 1. Energy bolts", "weapon", 1, { "base": "blaster", "t": 1, "x": 1.0 }], ["lm_steel_blaster", "Steel blaster", { "cr_steel": 2, "lt_fuel_cell": 1, "lt_alien_alloy": 1 }, "star", 9, "Tier 2. Energy bolts", "weapon", 1, { "base": "blaster", "t": 2, "x": 1.18 }], ["lm_darksteel_blaster", "Darksteel blaster", { "lt_darksteel_ingot": 2, "lt_fuel_cell": 2, "ow_he3": 1 }, "star", 16, "Tier 3. Energy bolts", "weapon", 1, { "base": "blaster", "t": 3, "x": 1.38 }], ["lm_starmetal_blaster", "Starmetal blaster", { "lt_starmetal_ingot": 2, "lt_fuel_cell": 2, "cr_crystal": 2 }, "star", 25, "Tier 4. Energy bolts", "weapon", 1, { "base": "blaster", "t": 4, "x": 1.6 }], ["lm_dragonforged_blaster", "Dragonforged blaster", { "lt_dragonforged_ingot": 2, "lt_fuel_cell": 3, "lt_dragon_s_blood": 2 }, "star", 36, "Tier 5. Energy bolts", "weapon", 1, { "base": "blaster", "t": 5, "x": 1.85 }], ["lm_iron_plasma_caster", "Iron plasma caster", { "lt_gunmetal": 3, "lt_fuel_cell": 1, "lt_lens": 1 }, "star", 1, "Tier 1. Burning blobs", "weapon", 1, { "base": "plasma", "t": 1, "x": 1.0 }], ["lm_steel_plasma_caster", "Steel plasma caster", { "cr_steel": 3, "lt_fuel_cell": 1, "lt_alien_alloy": 1 }, "star", 9, "Tier 2. Burning blobs", "weapon", 1, { "base": "plasma", "t": 2, "x": 1.18 }], ["lm_darksteel_plasma_caster", "Darksteel plasma caster", { "lt_darksteel_ingot": 3, "lt_fuel_cell": 2, "ow_he3": 1 }, "star", 16, "Tier 3. Burning blobs", "weapon", 1, { "base": "plasma", "t": 3, "x": 1.38 }], ["lm_starmetal_plasma_caster", "Starmetal plasma caster", { "lt_starmetal_ingot": 3, "lt_fuel_cell": 2, "cr_crystal": 2 }, "star", 25, "Tier 4. Burning blobs", "weapon", 1, { "base": "plasma", "t": 4, "x": 1.6 }], ["lm_dragonforged_plasma_caster", "Dragonforged plasma caster", { "lt_dragonforged_ingot": 3, "lt_fuel_cell": 3, "lt_dragon_s_blood": 2 }, "star", 36, "Tier 5. Burning blobs", "weapon", 1, { "base": "plasma", "t": 5, "x": 1.85 }], ["lm_iron_pulse_rifle", "Iron pulse rifle", { "lt_gunmetal": 4, "lt_fuel_cell": 1, "lt_lens": 1 }, "star", 1, "Tier 1. Bursts of light", "weapon", 1, { "base": "pulserifle", "t": 1, "x": 1.0 }], ["lm_steel_pulse_rifle", "Steel pulse rifle", { "cr_steel": 4, "lt_fuel_cell": 1, "lt_alien_alloy": 1 }, "star", 9, "Tier 2. Bursts of light", "weapon", 1, { "base": "pulserifle", "t": 2, "x": 1.18 }], ["lm_darksteel_pulse_rifle", "Darksteel pulse rifle", { "lt_darksteel_ingot": 4, "lt_fuel_cell": 2, "ow_he3": 1 }, "star", 16, "Tier 3. Bursts of light", "weapon", 1, { "base": "pulserifle", "t": 3, "x": 1.38 }], ["lm_starmetal_pulse_rifle", "Starmetal pulse rifle", { "lt_starmetal_ingot": 4, "lt_fuel_cell": 2, "cr_crystal": 2 }, "star", 25, "Tier 4. Bursts of light", "weapon", 1, { "base": "pulserifle", "t": 4, "x": 1.6 }], ["lm_dragonforged_pulse_rifle", "Dragonforged pulse rifle", { "lt_dragonforged_ingot": 4, "lt_fuel_cell": 3, "lt_dragon_s_blood": 2 }, "star", 36, "Tier 5. Bursts of light", "weapon", 1, { "base": "pulserifle", "t": 5, "x": 1.85 }], ["lm_iron_grav_hammer", "Iron grav hammer", { "lt_gunmetal": 4, "lt_fuel_cell": 1, "lt_lens": 1 }, "star", 1, "Tier 1. Knocks beasts flying", "weapon", 1, { "base": "gravhammer", "t": 1, "x": 1.0 }], ["lm_steel_grav_hammer", "Steel grav hammer", { "cr_steel": 4, "lt_fuel_cell": 1, "lt_alien_alloy": 1 }, "star", 9, "Tier 2. Knocks beasts flying", "weapon", 1, { "base": "gravhammer", "t": 2, "x": 1.18 }], ["lm_darksteel_grav_hammer", "Darksteel grav hammer", { "lt_darksteel_ingot": 4, "lt_fuel_cell": 2, "ow_he3": 1 }, "star", 16, "Tier 3. Knocks beasts flying", "weapon", 1, { "base": "gravhammer", "t": 3, "x": 1.38 }], ["lm_starmetal_grav_hammer", "Starmetal grav hammer", { "lt_starmetal_ingot": 4, "lt_fuel_cell": 2, "cr_crystal": 2 }, "star", 25, "Tier 4. Knocks beasts flying", "weapon", 1, { "base": "gravhammer", "t": 4, "x": 1.6 }], ["lm_dragonforged_grav_hammer", "Dragonforged grav hammer", { "lt_dragonforged_ingot": 4, "lt_fuel_cell": 3, "lt_dragon_s_blood": 2 }, "star", 36, "Tier 5. Knocks beasts flying", "weapon", 1, { "base": "gravhammer", "t": 5, "x": 1.85 }], ["lm_iron_railgun", "Iron railgun", { "lt_gunmetal": 5, "lt_fuel_cell": 1, "lt_lens": 1 }, "star", 5, "Tier 1. Pierces all in a line", "weapon", 1, { "base": "railgun", "t": 1, "x": 1.0 }], ["lm_steel_railgun", "Steel railgun", { "cr_steel": 5, "lt_fuel_cell": 1, "lt_alien_alloy": 1 }, "star", 13, "Tier 2. Pierces all in a line", "weapon", 1, { "base": "railgun", "t": 2, "x": 1.18 }], ["lm_darksteel_railgun", "Darksteel railgun", { "lt_darksteel_ingot": 5, "lt_fuel_cell": 2, "ow_he3": 1 }, "star", 20, "Tier 3. Pierces all in a line", "weapon", 1, { "base": "railgun", "t": 3, "x": 1.38 }], ["lm_starmetal_railgun", "Starmetal railgun", { "lt_starmetal_ingot": 5, "lt_fuel_cell": 2, "cr_crystal": 2 }, "star", 29, "Tier 4. Pierces all in a line", "weapon", 1, { "base": "railgun", "t": 4, "x": 1.6 }], ["lm_dragonforged_railgun", "Dragonforged railgun", { "lt_dragonforged_ingot": 5, "lt_fuel_cell": 3, "lt_dragon_s_blood": 2 }, "star", 40, "Tier 5. Pierces all in a line", "weapon", 1, { "base": "railgun", "t": 5, "x": 1.85 }]]], ["Heavy weapons in five tiers", [["lm_iron_bazooka", "Iron bazooka", { "lt_gunmetal": 5, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 5, "Tier 1. One rocket, big blast", "weapon", 1, { "base": "bazooka", "t": 1, "x": 1.0 }], ["lm_steel_bazooka", "Steel bazooka", { "cr_steel": 5, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 13, "Tier 2. One rocket, big blast", "weapon", 1, { "base": "bazooka", "t": 2, "x": 1.18 }], ["lm_darksteel_bazooka", "Darksteel bazooka", { "lt_darksteel_ingot": 5, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 20, "Tier 3. One rocket, big blast", "weapon", 1, { "base": "bazooka", "t": 3, "x": 1.38 }], ["lm_starmetal_bazooka", "Starmetal bazooka", { "lt_starmetal_ingot": 5, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 29, "Tier 4. One rocket, big blast", "weapon", 1, { "base": "bazooka", "t": 4, "x": 1.6 }], ["lm_dragonforged_bazooka", "Dragonforged bazooka", { "lt_dragonforged_ingot": 5, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 40, "Tier 5. One rocket, big blast", "weapon", 1, { "base": "bazooka", "t": 5, "x": 1.85 }], ["lm_iron_gatling_gun", "Iron gatling gun", { "lt_gunmetal": 6, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 5, "Tier 1. Spins up, shreds", "weapon", 1, { "base": "gatling", "t": 1, "x": 1.0 }], ["lm_steel_gatling_gun", "Steel gatling gun", { "cr_steel": 6, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 13, "Tier 2. Spins up, shreds", "weapon", 1, { "base": "gatling", "t": 2, "x": 1.18 }], ["lm_darksteel_gatling_gun", "Darksteel gatling gun", { "lt_darksteel_ingot": 6, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 20, "Tier 3. Spins up, shreds", "weapon", 1, { "base": "gatling", "t": 3, "x": 1.38 }], ["lm_starmetal_gatling_gun", "Starmetal gatling gun", { "lt_starmetal_ingot": 6, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 29, "Tier 4. Spins up, shreds", "weapon", 1, { "base": "gatling", "t": 4, "x": 1.6 }], ["lm_dragonforged_gatling_gun", "Dragonforged gatling gun", { "lt_dragonforged_ingot": 6, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 40, "Tier 5. Spins up, shreds", "weapon", 1, { "base": "gatling", "t": 5, "x": 1.85 }], ["lm_iron_grenade_launcher", "Iron grenade launcher", { "lt_gunmetal": 5, "cr_parts": 1, "lt_ash_wood_billet": 1 }, "gun", 5, "Tier 1. Lobbed blasts", "weapon", 1, { "base": "grenadelauncher", "t": 1, "x": 1.0 }], ["lm_steel_grenade_launcher", "Steel grenade launcher", { "cr_steel": 5, "cr_parts": 1, "lt_yew_stave": 1 }, "gun", 13, "Tier 2. Lobbed blasts", "weapon", 1, { "base": "grenadelauncher", "t": 2, "x": 1.18 }], ["lm_darksteel_grenade_launcher", "Darksteel grenade launcher", { "lt_darksteel_ingot": 5, "cr_parts": 2, "lt_heartwood_log": 1 }, "gun", 20, "Tier 3. Lobbed blasts", "weapon", 1, { "base": "grenadelauncher", "t": 3, "x": 1.38 }], ["lm_starmetal_grenade_launcher", "Starmetal grenade launcher", { "lt_starmetal_ingot": 5, "cr_parts": 2, "lt_starwood_branch": 1, "cr_crystal": 1 }, "gun", 29, "Tier 4. Lobbed blasts", "weapon", 1, { "base": "grenadelauncher", "t": 4, "x": 1.6 }], ["lm_dragonforged_grenade_launcher", "Dragonforged grenade launcher", { "lt_dragonforged_ingot": 5, "cr_parts": 3, "lt_dragonbone": 1, "lt_dragon_s_blood": 1 }, "gun", 40, "Tier 5. Lobbed blasts", "weapon", 1, { "base": "grenadelauncher", "t": 5, "x": 1.85 }]]], ["Jewellery", [["lm_copper_ring", "Copper ring (+2)", { "lt_bronze_ingot": 1, "lt_cracked_quartz": 1 }, "jewel", 1, "+2 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_copper_bracelet", "Copper bracelet (+2)", { "lt_bronze_ingot": 2, "lt_cracked_quartz": 1 }, "jewel", 1, "+2 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_copper_amulet", "Copper amulet (+2)", { "lt_bronze_ingot": 2, "lt_cracked_quartz": 1 }, "jewel", 1, "+2 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_silver_ring", "Silver ring (+3)", { "sk_bar2": 1, "lt_garnet": 1 }, "jewel", 12, "+3 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_silver_bracelet", "Silver bracelet (+3)", { "sk_bar2": 2, "lt_garnet": 1 }, "jewel", 12, "+3 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_silver_amulet", "Silver amulet (+3)", { "sk_bar2": 2, "lt_garnet": 1 }, "jewel", 12, "+3 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_gold_ring", "Gold ring (+5)", { "sk_bar3": 1, "lt_sapphire": 1 }, "jewel", 24, "+5 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_gold_bracelet", "Gold bracelet (+5)", { "sk_bar3": 2, "lt_sapphire": 1 }, "jewel", 24, "+5 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_gold_amulet", "Gold amulet (+5)", { "sk_bar3": 2, "lt_sapphire": 1 }, "jewel", 24, "+5 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_moonsilver_ring", "Moonsilver ring (+7)", { "sk_bar4": 1, "lt_emerald": 1 }, "jewel", 36, "+7 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_moonsilver_bracelet", "Moonsilver bracelet (+7)", { "sk_bar4": 2, "lt_emerald": 1 }, "jewel", 36, "+7 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_moonsilver_amulet", "Moonsilver amulet (+7)", { "sk_bar4": 2, "lt_emerald": 1 }, "jewel", 36, "+7 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_starstone_ring", "Starstone ring (+10)", { "sk_bar5": 1, "lt_ruby": 1 }, "jewel", 48, "+10 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_starstone_bracelet", "Starstone bracelet (+10)", { "sk_bar5": 2, "lt_ruby": 1 }, "jewel", 48, "+10 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_starstone_amulet", "Starstone amulet (+10)", { "sk_bar5": 2, "lt_ruby": 1 }, "jewel", 48, "+10 to a skill or to vigour, your pick when made", "jewel", 1, {}], ["lm_ring_of_breath", "Ring of Breath", { "lt_black_pearl": 1, "sk_bar2": 1 }, "jewel", 14, "Stay under water three times longer", "jewel", 1, {}], ["lm_ring_of_the_deep", "Ring of the Deep", { "lt_abyssal_pearl": 1, "sk_bar4": 1 }, "jewel", 38, "Breathe under water", "jewel", 1, {}], ["lm_moonstone_ring", "Moonstone ring", { "lt_moonstone": 1, "sk_bar4": 1 }, "jewel", 26, "See in the dark", "jewel", 1, {}], ["lm_tooth_necklace", "Tooth necklace", { "lt_crocodile_tooth": 3, "lt_linen_thread": 1 }, "jewel", 8, "Beasts flee more", "jewel", 1, {}], ["lm_green_spectacles", "Green spectacles", { "lt_emerald_city_glass": 2, "sk_bar3": 1 }, "jewel", 15, "See hidden things in Oz", "jewel", 1, {}], ["lm_raven_quill_brooch", "Raven quill brooch", { "lt_raven_feather": 1, "sk_bar2": 1 }, "jewel", 18, "+spell power", "jewel", 1, {}]]], ["Draughts, salves and elixirs", [["lm_healing_draught", "Healing draught", { "lm_laboratory_vial": 1, "sk_herb3": 2 }, "alch", 1, "Heals 40", "draught", 1, {}], ["lm_strong_healing_draught", "Strong healing draught", { "lm_laboratory_vial": 1, "wms_honey": 1 }, "alch", 14, "Heals 120", "draught", 1, {}], ["lm_stamina_tonic", "Stamina tonic", { "lm_laboratory_vial": 1, "lt_cave_moss": 2 }, "alch", 1, "Run longer", "draught", 1, {}], ["lm_mending_salve", "Mending salve", { "lm_laboratory_vial": 1, "lt_grave_moss": 2 }, "alch", 9, "Mends worn armour", "draught", 1, {}], ["lm_ward_against_fear", "Ward against fear", { "lm_laboratory_vial": 1, "lt_barrow_wight_dust": 1 }, "alch", 9, "No fleeing in fear", "draught", 1, {}], ["lm_ward_against_rot", "Ward against rot", { "lm_laboratory_vial": 1, "lt_embalming_salts": 1 }, "alch", 9, "Stops poison and rot", "draught", 1, {}], ["lm_ward_against_the_undead", "Ward against the undead", { "lm_laboratory_vial": 1, "lt_garlic_bulb": 2 }, "alch", 12, "Undead hit you less", "draught", 1, {}], ["lm_antivenom", "Antivenom", { "lm_laboratory_vial": 1, "lt_dust_scorpion_tail": 1 }, "alch", 10, "Cures poison", "draught", 1, {}], ["lm_fire_resistance_draught", "Fire-resistance draught", { "lm_laboratory_vial": 1, "lt_cinder_salts": 2 }, "alch", 16, "Half fire damage", "draught", 1, {}], ["lm_frost_resistance_draught", "Frost-resistance draught", { "lm_laboratory_vial": 1, "lt_frost_lotus": 1 }, "alch", 25, "Half frost damage", "draught", 1, {}], ["lm_acid_resistance_draught", "Acid-resistance draught", { "lm_laboratory_vial": 1, "lt_bottled_cloud": 1 }, "alch", 18, "Half acid damage", "draught", 1, {}], ["lm_draught_of_night_sight", "Draught of Night Sight", { "lm_laboratory_vial": 1, "lt_spider_eye_cluster": 1 }, "alch", 20, "See in the dark", "draught", 1, {}], ["lm_draught_of_true_sight", "Draught of True Sight", { "lm_laboratory_vial": 1, "lt_watcher_s_lens": 1 }, "alch", 28, "See invisible things", "draught", 1, {}], ["sk_p3", "Draught of Keen Eyes", { "lm_laboratory_vial": 1, "lt_bat_wing": 2 }, "alch", 6, "+hit chance", "draught", 1, {}], ["sk_p2", "Draught of Steady Hands", { "lm_laboratory_vial": 1, "lt_mournwort": 2 }, "alch", 12, "+crafting quality", "draught", 1, {}], ["sk_p4", "Draught of Insight", { "lm_laboratory_vial": 1, "lt_void_dust": 1 }, "alch", 25, "+skill points earned", "draught", 1, {}], ["lm_draught_of_memory", "Draught of Memory", { "lm_laboratory_vial": 1, "lt_asphodel": 1 }, "alch", 20, "Keep a book's place when you leave", "draught", 1, {}], ["lm_breath_draught", "Breath draught", { "lm_laboratory_vial": 1, "dr_kelp": 2 }, "alch", 9, "Breathe under water 2 minutes", "draught", 1, {}], ["lm_sleep_powder", "Sleep powder", { "lm_laboratory_vial": 1, "lt_poppy_pollen": 2 }, "alch", 14, "Thrown: beasts sleep", "draught", 1, {}], ["lm_flight_draught", "Flight draught", { "lm_laboratory_vial": 1, "lt_pixie_dust": 2 }, "alch", 18, "Fly for 30 seconds", "draught", 1, {}], ["lm_shrink_draught", "Shrink draught", { "lm_laboratory_vial": 1, "lt_drink_me_drop": 1 }, "alch", 15, "Become tiny: slip through small doors", "draught", 1, {}], ["lm_grow_draught", "Grow draught", { "lm_laboratory_vial": 1, "lt_eat_me_cake_crumb": 1 }, "alch", 15, "Become huge for a minute", "draught", 1, {}], ["lm_vanish_draught", "Vanish draught", { "lm_laboratory_vial": 1, "lt_cheshire_grin": 1 }, "alch", 22, "Invisible for 20 seconds", "draught", 1, {}], ["lm_warmth_draught", "Warmth draught", { "lm_laboratory_vial": 1, "lt_rose_of_summer": 1 }, "alch", 18, "No cold for 10 minutes", "draught", 1, {}], ["lm_glow_draught", "Glow draught", { "lm_laboratory_vial": 1, "lt_neonbloom": 1 }, "alch", 12, "You light the dark round you", "draught", 1, {}], ["lm_poison_coating", "Poison coating", { "lm_laboratory_vial": 1, "lt_venom_sac": 1 }, "alch", 22, "Blades poison for 5 minutes", "draught", 1, {}], ["lm_elixir_of_calm", "Elixir of Calm", { "lm_laboratory_vial": 1, "lt_ambergris": 1 }, "alch", 20, "Wild beasts stop to look", "draught", 1, {}], ["lm_flamel_s_elixir", "Flamel's elixir", { "lm_laboratory_vial": 1, "lt_alchemist_s_mercury": 2 }, "alch", 40, "+10 vigour for a day", "draught", 1, {}], ["lm_return_from_death_charm", "Return-from-death charm", { "lm_laboratory_vial": 1, "lt_pomegranate_seed": 3 }, "alch", 30, "Come back where you fell, once", "draught", 1, {}], ["sk_p5", "Elixir of the Masters", { "lm_laboratory_vial": 1, "lt_golden_clover": 1 }, "alch", 48, "All skills +5 for an hour", "draught", 1, {}]]], ["Enchantments", [["lm_flametongue", "Flametongue", { "hx_runestone": 1, "lt_molten_heart": 1, "lt_brimstone_heart": 1 }, "ench", 20, "Weapon: +fire damage", "ench", 1, {}], ["lm_frostbite", "Frostbite", { "hx_runestone": 1, "lt_rime_crystal": 1, "lt_snow_queen_s_ice": 1 }, "ench", 18, "Weapon: slows", "ench", 1, {}], ["lm_thunderstrike", "Thunderstrike", { "hx_runestone": 1, "lt_galvanic_coil": 1, "lt_sunflare_spark": 1 }, "ench", 22, "Weapon: chain lightning", "ench", 1, {}], ["lm_venomkiss", "Venomkiss", { "hx_runestone": 1, "lt_venom_sac": 1, "lt_spider_fang": 1 }, "ench", 20, "Weapon: poison", "ench", 1, {}], ["lm_voidedge", "Voidedge", { "hx_runestone": 1, "lt_void_shard": 1, "lt_scrap_of_the_dark": 1 }, "ench", 28, "Weapon: ignores armour", "ench", 1, {}], ["lm_bloodfire", "Bloodfire", { "hx_runestone": 1, "lt_dragon_s_blood": 1, "lt_vampire_fang": 1 }, "ench", 40, "Weapon: heals you on hits", "ench", 1, {}], ["lm_sunfire", "Sunfire", { "hx_runestone": 1, "lt_sunflare_spark": 1, "lt_heat_glass": 1 }, "ench", 24, "Weapon: blinds", "ench", 1, {}], ["lm_tidepush", "Tidepush", { "hx_runestone": 1, "lt_heart_of_the_tide": 1, "dr_kelp": 1 }, "ench", 18, "Shield: pushes beasts back", "ench", 1, {}], ["lm_stoneskin", "Stoneskin", { "hx_runestone": 1, "lt_medusa_s_scale": 1, "lt_troll_knuckle_stone": 1 }, "ench", 26, "Armour: +toughness", "ench", 1, {}], ["lm_featherfall", "Featherfall", { "hx_runestone": 1, "lt_pterodactyl_leather_wing": 1, "dr_phoenixfeather": 1 }, "ench", 14, "Boots: no fall damage", "ench", 1, {}], ["lm_silence", "Silence", { "hx_runestone": 1, "lt_silent_bell": 1, "lt_singing_glass_shard": 1 }, "ench", 20, "Armour: beasts hear you less", "ench", 1, {}], ["lm_elder_twin_rune", "Elder twin rune", { "hx_runestone": 1, "lt_elder_rune": 1, "sk_ore5": 1 }, "ench", 45, "Lets one item hold two enchantments", "ench", 1, {}]]], ["Boss trophies made into gear", [["lm_bell_hammer", "Bell-hammer", { "lt_cantor_s_clapper": 1, "cr_steel": 2 }, "forge", 8, "Rings: stuns all near", "weapon", 1, { "base": "warhammer", "t": 1, "x": 1.0 }], ["lt_faceless_mask", "Faceless mask (worn)", { "lt_faceless_mask": 1, "lt_linen_thread": 1 }, "jewel", 6, "Fear ward always on", "thing", 1, {}], ["lm_silence_charm", "Silence charm", { "lt_silent_bell": 1, "sk_bar2": 1 }, "jewel", 8, "Beasts notice you later", "thing", 1, {}], ["lm_hymn_of_the_cantor", "Hymn of the Cantor (song)", { "lt_hymn_scrap": 6 }, "jewel", 3, "A sung song for your house", "thing", 1, {}], ["lt_drowned_crown", "Drowned crown (worn)", { "lt_drowned_crown": 1, "lt_grave_moss": 1 }, "jewel", 14, "+breath under water", "thing", 1, {}], ["lt_king_s_sea_blade", "King's sea-blade (honed)", { "lt_king_s_sea_blade": 1, "lt_drowned_pearl": 2 }, "forge", 15, "Steel longsword +1 quality, tide damage", "weapon", 1, { "base": "longsword", "t": 2, "x": 1.18 }], ["lm_tide_relic", "Tide relic", { "lt_heart_of_the_tide": 1, "lt_barrow_silver": 3 }, "jewel", 15, "Power: wave pushes beasts back", "thing", 1, {}], ["lm_slag_gauntlets", "Slag gauntlets", { "lt_slag_iron_fist": 1, "lt_darksteel_ingot": 2 }, "forge", 22, "Punches burn", "thing", 1, {}], ["lm_ember_relic", "Ember relic", { "lt_colossus_core": 1, "sk_bar3": 1 }, "jewel", 22, "Power: fire burst", "thing", 1, {}], ["lm_matriarch_dagger", "Matriarch dagger", { "lt_matriarch_s_fang": 1, "lt_starmetal_ingot": 1, "lt_moonsilk": 1 }, "forge", 30, "Starmetal dagger, poisons", "weapon", 1, { "base": "dagger", "t": 4, "x": 1.6 }], ["lt_crown_of_frosted_web", "Crown of frosted web (worn)", { "lt_crown_of_frosted_web": 1, "lt_frost_web": 2 }, "jewel", 30, "Frost-proof; spiders stay calm", "thing", 1, {}], ["lm_giant_cave_spider_mount", "Giant cave-spider mount", { "lt_queen_s_egg": 1, "lt_silk_wrapped_egg": 2, "hx_glowcap": 5 }, "jewel", 30, "Hatch it: a mount that climbs walls", "thing", 1, {}]]], ["Each world's own makes", [["lm_deep_gem_shadow_blade", "Deep-gem shadow blade", { "lt_deep_gem": 1, "lt_darksteel_ingot": 2, "lt_shade_essence": 1 }, "w:underdark", 20, "Darksteel, hits from shadow", "weapon", 1, { "base": "longsword", "t": 3, "x": 1.38 }], ["lm_sting_spear", "Sting spear", { "lt_rock_crawler_sting": 2, "lt_sun_baked_iron": 2 }, "w:caloris", 18, "Darksteel spear, burns", "weapon", 1, { "base": "spear", "t": 3, "x": 1.38 }], ["lm_brimstone_claw_knives", "Brimstone claw knives", { "lt_brimstone_claw": 2, "lt_sulphur_scale": 1 }, "w:aphelia", 18, "Pair of knives, acid", "weapon", 1, { "base": "dagger", "t": 3, "x": 1.38 }], ["lm_bard_s_glass_lute", "Bard's glass lute", { "lt_singing_glass_shard": 3, "lt_heartwood_log": 1, "lt_veyar_thread": 2 }, "w:ilvessa", 20, "Play: allies hit harder", "thing", 1, {}], ["lm_ember_hound_fang_dagger", "Ember-hound fang dagger", { "lt_ember_hound_fang": 1, "lt_darksteel_ingot": 1 }, "w:erebos", 18, "Darksteel dagger, fire", "weapon", 1, { "base": "dagger", "t": 3, "x": 1.38 }], ["lm_watcher_s_scope", "Watcher's scope", { "lt_watcher_s_lens": 1, "lt_gunmetal": 1 }, "w:stillspire", 22, "Any rifle: see weak spots", "thing", 1, {}], ["lm_obsidian_blade", "Obsidian blade", { "dr_obsidian": 3, "lt_ash_hound_pelt": 1 }, "w:kilnhaven", 14, "Very sharp, breaks after 200 hits", "weapon", 1, { "base": "longsword", "t": 2, "x": 1.18 }], ["lm_patch_kit", "Patch kit", { "lt_husk_resin": 1, "lt_road_raider_scrap": 1 }, "w:wastelands", 8, "Repairs armour or a car", "thing", 1, {}], ["lm_raptor_claw_knives", "Raptor-claw knives", { "lt_raptor_claw": 2, "lt_iguanodon_hide": 1 }, "w:lostworld", 16, "Fast pair, bleeding", "weapon", 1, { "base": "dagger", "t": 3, "x": 1.38 }], ["lm_scarecrow_s_straw_charm", "Scarecrow's straw charm", { "lt_straw": 3, "lt_poppy_pollen": 1 }, "w:oz", 6, "Crows never peck you", "thing", 1, {}], ["lm_never_grow_up_flute", "Never-grow-up flute", { "lt_crocodile_tooth": 1, "lt_ash_wood_billet": 1, "lt_pixie_dust": 1 }, "w:neverland", 10, "Play: lost boys come to help", "thing", 1, {}], ["lm_drake_glass_blade", "Drake-glass blade", { "lt_drake_glass": 3, "lt_drakkyn_scale": 1 }, "w:awen", 30, "Glows; burns", "weapon", 1, { "base": "longsword", "t": 4, "x": 1.6 }], ["lm_ice_blade", "Ice blade", { "lt_snow_queen_s_ice": 2, "cr_steel": 2 }, "w:winters", 20, "Frostbite built in", "weapon", 1, { "base": "longsword", "t": 3, "x": 1.38 }], ["lm_medusa_shield", "Medusa shield", { "lt_medusa_s_scale": 2, "lt_bronze_of_troy": 3 }, "w:greece", 24, "Block: beasts freeze for 2 s", "thing", 1, {}], ["lm_nautilus_horn", "Nautilus horn", { "lt_nautilus_shell": 1, "lt_sea_king_pearl": 1 }, "w:deep", 18, "Call a dolphin to ride", "thing", 1, {}], ["lm_doubloon_pistol", "Doubloon pistol", { "lt_spanish_doubloon": 3, "lt_gunmetal": 1, "lt_ship_s_tar": 1 }, "w:sea", 14, "A pirate's flintlock, gold-plated", "weapon", 1, { "base": "flintlock", "t": 2, "x": 1.18 }], ["lm_meteoric_hand_axe", "Meteoric hand-axe", { "lt_meteoric_iron": 3, "lt_alien_alloy": 1 }, "w:space", 26, "Starmetal axe", "weapon", 1, { "base": "battleaxe", "t": 4, "x": 1.6 }], ["lm_bloodletter_dagger", "Bloodletter dagger", { "lt_vampire_fang": 2, "sk_bar4": 1 }, "w:dracula", 28, "Heals you as it hits", "weapon", 1, { "base": "dagger", "t": 4, "x": 1.6 }], ["lm_galvanic_gauntlet", "Galvanic gauntlet", { "lt_galvanic_coil": 2, "lt_polar_bear_fur": 1, "cr_steel": 1 }, "w:frozen", 20, "Punches shock", "thing", 1, {}], ["lm_raven_quill", "Raven quill", { "lt_raven_feather": 1, "lt_kraken_ink": 1 }, "w:paris", 10, "Write your own spell tome page", "thing", 1, {}], ["lm_spinning_wheel", "Spinning wheel", { "lt_heartwood_log": 3, "lm_spun_gold": 1 }, "w:grimm", 24, "Home piece: spins straw to gold, 1 a day", "thing", 1, {}], ["lm_vine_rope", "Vine rope", { "lt_jungle_vine": 3 }, "w:tarzan", 4, "Swing from trees", "thing", 1, {}], ["lm_gunmetal_rifle", "Gunmetal rifle", { "lt_gunmetal": 4, "cr_parts": 2, "lt_kevlar_weave": 1 }, "w:ironfray", 22, "Battle rifle", "weapon", 1, { "base": "rifle", "t": 3, "x": 1.38 }], ["lm_toadstool_house", "Toadstool house", { "lt_toadstool_cap": 6, "lt_great_tree_sap": 2 }, "w:glimmerwold", 16, "Home piece: a toadstool house", "thing", 1, {}], ["lm_card_soldier_shield", "Card-soldier shield", { "lt_card_soldier_lacquer": 2, "lt_ash_wood_billet": 2 }, "w:wonderland", 12, "Light shield, red as a heart", "thing", 1, {}]]], ["Tools, mounts and home pieces", [["lt_forge_master_s_tongs", "Forge-master's tongs (fitted)", { "lt_forge_master_s_tongs": 1, "lt_darksteel_ingot": 1 }, "forge", 18, "+1 quality on all you forge", "thing", 1, {}], ["sk_t_mine_3", "Darksteel pickaxe", { "lt_darksteel_ingot": 2, "lt_heartwood_log": 1 }, "forge", 16, "Mine rich veins faster", "thing", 1, {}], ["sk_t_mine_4", "Starmetal pickaxe", { "lt_starmetal_ingot": 2, "lt_starwood_branch": 1 }, "forge", 25, "Mines starmetal and starstone", "thing", 1, {}], ["lm_herbalist_s_sickle", "Herbalist's sickle", { "cr_steel": 1, "lt_ash_wood_billet": 1 }, "forge", 6, "Two herbs from each patch", "thing", 1, {}], ["lm_skinning_knife", "Skinning knife", { "cr_steel": 1, "lt_wight_s_fingerbone": 1 }, "forge", 9, "+1 hide from each beast", "thing", 1, {}], ["lm_climbing_rope", "Climbing rope", { "lt_belfry_rope": 2 }, "tailor", 3, "Climb ledges", "thing", 1, {}], ["lm_lantern", "Lantern", { "lt_bronze_ingot": 1, "ss_lampoil": 1, "lt_slag_glass": 1 }, "forge", 5, "Lights the dark (no hands)", "thing", 1, {}], ["lm_home_forge", "Home forge", { "lm_firebrick": 6, "cr_steel": 4 }, "build", 18, "Forge at home", "thing", 1, {}], ["lm_alchemist_s_table", "Alchemist's table", { "lt_heartwood_log": 2, "lm_laboratory_vial": 4, "lt_gold_leaf": 1 }, "build", 14, "Make draughts at home", "thing", 1, {}], ["lm_saddle", "Saddle", { "lm_hardened_leather": 3, "lt_bronze_ingot": 1 }, "tannery", 8, "Needed for every mount you tame", "thing", 1, {}], ["lm_war_saddle", "War saddle", { "lm_chitin_plate": 2, "lt_moonsilk": 1 }, "tannery", 25, "Mount takes half damage", "thing", 1, {}], ["lm_spider_mount_harness", "Spider mount harness", { "lt_moonsilk": 2, "lt_silk_wrapped_egg": 1 }, "tannery", 28, "Ride the cave spider", "thing", 1, {}], ["lm_phoenix_feather_revive", "Phoenix-feather revive", { "dr_phoenixfeather": 1 }, "ench", 40, "Burned when you fall: get up at once", "thing", 1, {}], ["lm_automaton_pet", "Automaton pet", { "lt_mainspring": 2, "lt_brass_cog": 4, "lt_lens": 1 }, "garage", 22, "A little clockwork helper that carries things", "thing", 1, {}], ["lm_skull_shelf", "Skull shelf", { "lt_skull": 3, "lt_heartwood_log": 1 }, "build", 6, "Home decor", "thing", 1, {}], ["lm_bell_of_the_belfry", "Bell of the Belfry", { "lt_cracked_bell": 2, "lt_bell_bronze": 2 }, "forge", 6, "Home decor; rings the hour", "thing", 1, {}], ["lm_gingerbread_house", "Gingerbread house (small)", { "lt_gingerbread": 8, "lt_gold_leaf": 1 }, "build", 12, "Home decor; edible, once", "thing", 1, {}], ["lm_neon_drake_lamp", "Neon drake lamp", { "lt_drake_glass": 2, "lt_neonbloom": 1 }, "glass", 28, "Home lamp from Awen", "thing", 1, {}]]], ["Spells: the scribe's desk", [["lm_blank_tome", "Blank tome", { "cr_leather": 1, "lt_prayer_scroll": 2, "lt_linen_thread": 1 }, "scribe", 1, "Every spell is written in one", "mat", 1, {}], ["lm_holy_water", "Holy water", { "lm_laboratory_vial": 1, "lt_incense": 1 }, "font", 4, "White magic ink (the silver bar blesses it, not used up)", "mat", 1, {}], ["lm_shadow_ink", "Shadow ink", { "lm_laboratory_vial": 1, "lt_grave_soil": 1, "lt_kraken_ink": 1 }, "scribe", 4, "Black magic ink", "mat", 1, {}], ["lm_elemental_ink", "Elemental ink", { "lm_laboratory_vial": 1, "lt_cinder_salts": 1 }, "scribe", 4, "Fire, frost, storm and nature ink", "mat", 1, {}], ["lm_raven_quill_pen", "Raven-quill pen", { "lt_raven_feather": 1, "sk_bar2": 1 }, "scribe", 10, "Tomes written with it cast 10% stronger", "mat", 1, {}], ["lm_gilded_tome", "Gilded tome", { "lm_blank_tome": 1, "lt_gold_leaf": 2 }, "scribe", 24, "Tier 4 and 5 spells need it", "mat", 1, {}]]], ["White magic", [["lm_healing_light", "Healing Light ★", { "lm_blank_tome": 1, "lm_holy_water": 1, "sk_herb3": 1 }, "scribe", 1, "White magic, tier 1. Heals you. In the game now: this makes its tome", "tome", 1, { "sp": "Healing Light" }], ["lm_bless", "Bless", { "lm_blank_tome": 1, "lm_holy_water": 1, "lt_incense": 1 }, "scribe", 1, "White magic, tier 1. +hit and +damage for friends near", "tome", 1, { "sp": "Bless" }], ["lm_purify", "Purify", { "lm_blank_tome": 1, "lm_holy_water": 1, "hx_salt": 1 }, "scribe", 1, "White magic, tier 1. Cures poison and rot", "tome", 1, { "sp": "Purify" }], ["lm_light", "Light", { "lm_blank_tome": 1, "lm_holy_water": 1, "lt_tallow_candle_end": 1 }, "scribe", 1, "White magic, tier 1. A floating light follows you", "tome", 1, { "sp": "Light" }], ["lm_smite", "Smite ★", { "lm_blank_tome": 1, "lm_holy_water": 2, "lt_gold_leaf": 2 }, "scribe", 9, "White magic, tier 2. Holy blow, double on undead. In the game now: this makes its tome", "tome", 1, { "sp": "Smite" }], ["lm_sanctuary", "Sanctuary", { "lm_blank_tome": 1, "lm_holy_water": 2, "lt_incense": 2 }, "scribe", 9, "White magic, tier 2. Beasts will not strike you for 6 s (breaks if you strike)", "tome", 1, { "sp": "Sanctuary" }], ["lm_turn_undead", "Turn Undead", { "lm_blank_tome": 1, "lm_holy_water": 2, "lt_garlic_bulb": 2 }, "scribe", 9, "White magic, tier 2. Undead flee", "tome", 1, { "sp": "Turn Undead" }], ["lm_mend_wounds", "Mend Wounds", { "lm_blank_tome": 1, "lm_holy_water": 2, "wms_honey": 2 }, "scribe", 9, "White magic, tier 2. Heals you and friends near over 10 s", "tome", 1, { "sp": "Mend Wounds" }], ["lm_aegis", "Aegis ★", { "lm_blank_tome": 1, "lm_holy_water": 3, "lt_barrow_silver": 2 }, "scribe", 16, "White magic, tier 3. A shield of light soaks hits. In the game now: this makes its tome", "tome", 1, { "sp": "Aegis" }], ["lm_holy_fire", "Holy Fire", { "lm_blank_tome": 1, "lm_holy_water": 5 }, "scribe", 16, "White magic, tier 3. Burns evil, heals friends it touches", "tome", 1, { "sp": "Holy Fire" }], ["lm_dispel", "Dispel", { "lm_blank_tome": 1, "lm_holy_water": 3, "lt_mirror_splinter": 2 }, "scribe", 16, "White magic, tier 3. Removes a curse or enchantment", "tome", 1, { "sp": "Dispel" }], ["lm_guardian_angel", "Guardian Angel", { "lm_blank_tome": 1, "lm_holy_water": 3, "dr_phoenixfeather": 2 }, "scribe", 16, "White magic, tier 3. A winged guardian fights beside you for 30 s", "tome", 1, { "sp": "Guardian Angel" }], ["lm_radiance", "Radiance ★", { "lm_gilded_tome": 1, "lm_holy_water": 4, "sk_ore5": 3 }, "scribe", 25, "White magic, tier 4. Light bursts out, blinds and burns. In the game now: this makes its tome", "tome", 1, { "sp": "Radiance" }], ["lm_mass_heal", "Mass Heal", { "lm_gilded_tome": 1, "lm_holy_water": 4, "lt_golden_clover": 3 }, "scribe", 25, "White magic, tier 4. Heals everyone near you", "tome", 1, { "sp": "Mass Heal" }], ["lm_divine_ward", "Divine Ward", { "lm_gilded_tome": 1, "lm_holy_water": 4, "lt_moonstone": 3 }, "scribe", 25, "White magic, tier 4. Friends take half damage for 15 s", "tome", 1, { "sp": "Divine Ward" }], ["lm_resurrection", "Resurrection", { "lm_gilded_tome": 1, "lm_holy_water": 5, "dr_phoenixfeather": 3 }, "scribe", 36, "White magic, tier 5. Raises a fallen friend where they fell", "tome", 1, { "sp": "Resurrection" }], ["lm_wrath_of_heaven", "Wrath of Heaven", { "lm_gilded_tome": 1, "lm_holy_water": 5, "lt_ambrosia_drop": 3 }, "scribe", 36, "White magic, tier 5. Pillars of light from the sky", "tome", 1, { "sp": "Wrath of Heaven" }], ["lm_sanctum", "Sanctum", { "lm_gilded_tome": 1, "lm_holy_water": 5, "lt_elder_rune": 3 }, "scribe", 36, "White magic, tier 5. A circle no beast can enter, 20 s", "tome", 1, { "sp": "Sanctum" }]]], ["Black magic", [["lm_shadow_bolt", "Shadow Bolt ★", { "lm_blank_tome": 1, "lm_shadow_ink": 1, "lt_void_dust": 1 }, "scribe", 1, "Black magic, tier 1. Bolt of darkness that keeps eating. In the game now: this makes its tome", "tome", 1, { "sp": "Shadow Bolt" }], ["lm_curse_of_weakness", "Curse of Weakness", { "lm_blank_tome": 1, "lm_shadow_ink": 1, "lt_rat_tail": 1 }, "scribe", 1, "Black magic, tier 1. Foe hits softer", "tome", 1, { "sp": "Curse of Weakness" }], ["lm_fear", "Fear", { "lm_blank_tome": 1, "lm_shadow_ink": 1, "lt_barrow_wight_dust": 1 }, "scribe", 1, "Black magic, tier 1. Foe runs from you", "tome", 1, { "sp": "Fear" }], ["lm_bone_spear", "Bone Spear", { "lm_blank_tome": 1, "lm_shadow_ink": 1, "lt_bone_dust": 1 }, "scribe", 1, "Black magic, tier 1. A spear of bone", "tome", 1, { "sp": "Bone Spear" }], ["lm_life_drain", "Life Drain ★", { "lm_blank_tome": 1, "lm_shadow_ink": 2, "lt_vampire_fang": 2 }, "scribe", 9, "Black magic, tier 2. Takes life, gives it to you. In the game now: this makes its tome", "tome", 1, { "sp": "Life Drain" }], ["lm_raise_skeleton", "Raise Skeleton", { "lm_blank_tome": 1, "lm_shadow_ink": 2, "lt_skull": 2 }, "scribe", 9, "Black magic, tier 2. A skeleton fights for you 40 s", "tome", 1, { "sp": "Raise Skeleton" }], ["lm_poison_cloud", "Poison Cloud", { "lm_blank_tome": 1, "lm_shadow_ink": 2, "lt_venom_drop": 2 }, "scribe", 9, "Black magic, tier 2. Cloud that poisons all inside", "tome", 1, { "sp": "Poison Cloud" }], ["lm_blind", "Blind", { "lm_blank_tome": 1, "lm_shadow_ink": 2, "lt_shade_essence": 2 }, "scribe", 9, "Black magic, tier 2. Foe cannot see you for 5 s", "tome", 1, { "sp": "Blind" }], ["lm_shadow_step", "Shadow Step ★", { "lm_blank_tome": 1, "lm_shadow_ink": 3, "lt_scrap_of_the_dark": 2 }, "scribe", 16, "Black magic, tier 3. Step through shadow behind a foe. In the game now: this makes its tome", "tome", 1, { "sp": "Shadow Step" }], ["lm_corpse_explosion", "Corpse Explosion", { "lm_blank_tome": 1, "lm_shadow_ink": 3, "lt_grave_soil": 2 }, "scribe", 16, "Black magic, tier 3. A fallen foe bursts, hurting those near", "tome", 1, { "sp": "Corpse Explosion" }], ["lm_hex", "Hex", { "lm_blank_tome": 1, "lm_shadow_ink": 3, "lt_poisoned_apple": 2 }, "scribe", 16, "Black magic, tier 3. Foe takes double from everything 8 s", "tome", 1, { "sp": "Hex" }], ["lm_soul_chains", "Soul Chains", { "lm_blank_tome": 1, "lm_shadow_ink": 3, "lt_weed_hung_chain": 2 }, "scribe", 16, "Black magic, tier 3. Holds a foe in place", "tome", 1, { "sp": "Soul Chains" }], ["lm_veil_of_dread", "Veil of Dread ★", { "lm_gilded_tome": 1, "lm_shadow_ink": 4, "lt_brimstone_heart": 3 }, "scribe", 25, "Black magic, tier 4. All near flee in terror. In the game now: this makes its tome", "tome", 1, { "sp": "Veil of Dread" }], ["lm_raise_the_dead", "Raise the Dead", { "lm_gilded_tome": 1, "lm_shadow_ink": 4, "lt_wight_s_fingerbone": 3 }, "scribe", 25, "Black magic, tier 4. Three fallen foes rise for you", "tome", 1, { "sp": "Raise the Dead" }], ["lm_plague", "Plague", { "lm_gilded_tome": 1, "lm_shadow_ink": 4, "lt_embalming_salts": 3 }, "scribe", 25, "Black magic, tier 4. Sickness spreads foe to foe", "tome", 1, { "sp": "Plague" }], ["lm_death_mark", "Death Mark", { "lm_gilded_tome": 1, "lm_shadow_ink": 5, "lt_dragon_s_blood": 3 }, "scribe", 36, "Black magic, tier 5. A marked foe under a quarter life falls", "tome", 1, { "sp": "Death Mark" }], ["lm_lich_form", "Lich Form", { "lm_gilded_tome": 1, "lm_shadow_ink": 5, "lt_elder_rune": 3 }, "scribe", 36, "Black magic, tier 5. Become a lich 20 s: spells free, no healing", "tome", 1, { "sp": "Lich Form" }], ["lm_eclipse", "Eclipse", { "lm_gilded_tome": 1, "lm_shadow_ink": 5, "lt_abyssal_pearl": 3 }, "scribe", 36, "Black magic, tier 5. The sky goes dark: shadow spells double", "tome", 1, { "sp": "Eclipse" }]]], ["Fire, frost, storm and nature magic", [["lm_firebolt", "Firebolt ★", { "lm_blank_tome": 1, "lm_elemental_ink": 1, "lt_cinder_salts": 1 }, "scribe", 1, "Fire magic, tier 1. Fire bolt. In the game now: this makes its tome", "tome", 1, { "sp": "Firebolt" }], ["lm_flame_wave", "Flame Wave ★", { "lm_blank_tome": 1, "lm_elemental_ink": 2, "ss_lampoil": 2 }, "scribe", 9, "Fire magic, tier 2. Wave of fire ahead. In the game now: this makes its tome", "tome", 1, { "sp": "Flame Wave" }], ["lm_fireball", "Fireball ★", { "lm_blank_tome": 1, "lm_elemental_ink": 3, "lt_sulphur_crystal": 2 }, "scribe", 16, "Fire magic, tier 3. Exploding ball. In the game now: this makes its tome", "tome", 1, { "sp": "Fireball" }], ["lm_meteor", "Meteor ★", { "lm_gilded_tome": 1, "lm_elemental_ink": 4, "lt_molten_heart": 3 }, "scribe", 25, "Fire magic, tier 4. Rock from the sky. In the game now: this makes its tome", "tome", 1, { "sp": "Meteor" }], ["lm_phoenix_fire", "Phoenix Fire", { "lm_gilded_tome": 1, "lm_elemental_ink": 5, "dr_phoenixfeather": 3 }, "scribe", 36, "Fire magic, tier 5. Wings of flame sweep all round", "tome", 1, { "sp": "Phoenix Fire" }], ["lm_ice_shard", "Ice Shard ★", { "lm_blank_tome": 1, "lm_elemental_ink": 1, "hx_ice": 1 }, "scribe", 1, "Frost magic, tier 1. Shard that slows. In the game now: this makes its tome", "tome", 1, { "sp": "Ice Shard" }], ["lm_frost_nova", "Frost Nova ★", { "lm_blank_tome": 1, "lm_elemental_ink": 2, "lt_rime_crystal": 2 }, "scribe", 9, "Frost magic, tier 2. Freezes all near. In the game now: this makes its tome", "tome", 1, { "sp": "Frost Nova" }], ["lm_glacial_armour", "Glacial Armour ★", { "lm_blank_tome": 1, "lm_elemental_ink": 3, "lt_frost_lotus": 2 }, "scribe", 16, "Frost magic, tier 3. Ice armour. In the game now: this makes its tome", "tome", 1, { "sp": "Glacial Armour" }], ["lm_blizzard", "Blizzard ★", { "lm_gilded_tome": 1, "lm_elemental_ink": 4, "lt_snow_queen_s_ice": 3 }, "scribe", 25, "Frost magic, tier 4. Storm of ice. In the game now: this makes its tome", "tome", 1, { "sp": "Blizzard" }], ["lm_winter_s_heart", "Winter's Heart", { "lm_gilded_tome": 1, "lm_elemental_ink": 5, "lt_snow_queen_s_ice": 3 }, "scribe", 36, "Frost magic, tier 5. Turns foes to ice statues 6 s", "tome", 1, { "sp": "Winter's Heart" }], ["lm_spark", "Spark ★", { "lm_blank_tome": 1, "lm_elemental_ink": 1, "lt_galvanic_coil": 1 }, "scribe", 1, "Storm magic, tier 1. Quick spark. In the game now: this makes its tome", "tome", 1, { "sp": "Spark" }], ["lm_chain_lightning", "Chain Lightning ★", { "lm_blank_tome": 1, "lm_elemental_ink": 2, "lt_galvanic_coil": 2 }, "scribe", 9, "Storm magic, tier 2. Jumps foe to foe. In the game now: this makes its tome", "tome", 1, { "sp": "Chain Lightning" }], ["lm_thunderclap", "Thunderclap ★", { "lm_blank_tome": 1, "lm_elemental_ink": 3, "lt_sunflare_spark": 2 }, "scribe", 16, "Storm magic, tier 3. Stunning boom. In the game now: this makes its tome", "tome", 1, { "sp": "Thunderclap" }], ["lm_tempest", "Tempest ★", { "lm_gilded_tome": 1, "lm_elemental_ink": 4, "lt_bottled_cloud": 3 }, "scribe", 25, "Storm magic, tier 4. Whirling storm. In the game now: this makes its tome", "tome", 1, { "sp": "Tempest" }], ["lm_skyfall", "Skyfall", { "lm_gilded_tome": 1, "lm_elemental_ink": 5, "ow_he3": 3 }, "scribe", 36, "Storm magic, tier 5. Lightning strikes all round for 10 s", "tome", 1, { "sp": "Skyfall" }], ["lm_thorn_volley", "Thorn Volley ★", { "lm_blank_tome": 1, "lm_elemental_ink": 1, "lt_tree_fern_frond": 1 }, "scribe", 1, "Nature magic, tier 1. Spray of thorns. In the game now: this makes its tome", "tome", 1, { "sp": "Thorn Volley" }], ["lm_entangle", "Entangle ★", { "lm_blank_tome": 1, "lm_elemental_ink": 2, "lt_jungle_vine": 2 }, "scribe", 9, "Nature magic, tier 2. Roots hold foes. In the game now: this makes its tome", "tome", 1, { "sp": "Entangle" }], ["lm_rejuvenation", "Rejuvenation ★", { "lm_blank_tome": 1, "lm_elemental_ink": 3, "lt_great_tree_sap": 2 }, "scribe", 16, "Nature magic, tier 3. Heals over time. In the game now: this makes its tome", "tome", 1, { "sp": "Rejuvenation" }], ["lm_earthquake", "Earthquake ★", { "lm_gilded_tome": 1, "lm_elemental_ink": 4, "lt_troll_knuckle_stone": 3 }, "scribe", 25, "Nature magic, tier 4. Ground shakes, knocks down. In the game now: this makes its tome", "tome", 1, { "sp": "Earthquake" }], ["lm_wrath_of_the_wild", "Wrath of the Wild", { "lm_gilded_tome": 1, "lm_elemental_ink": 5, "lt_golden_clover": 3 }, "scribe", 36, "Nature magic, tier 5. Beasts of the land fight for you", "tome", 1, { "sp": "Wrath of the Wild" }]]], ["Gadgets: new ways to move and fight", [["lm_grappling_hook", "Grappling hook", { "cr_steel": 2, "lm_climbing_rope": 1 }, "forge", 10, "Pull yourself to ledges and roofs", "gadget", 1, {}], ["lm_blink_boots", "Blink boots", { "lt_void_shard": 2, "lm_silent_boots": 1 }, "ench", 28, "Short teleport ahead (8 s)", "gadget", 1, {}], ["lm_jump_boots", "Jump boots", { "lt_mainspring": 2, "lm_hardened_leather": 2 }, "garage", 14, "Jump three times as high", "gadget", 1, {}], ["lm_smoke_cloak", "Smoke cloak", { "lt_kraken_ink": 2, "lm_shadow_cloak": 1 }, "tailor", 26, "Vanish in smoke when hit hard", "gadget", 1, {}], ["lm_pocket_portal", "Pocket portal", { "lt_void_shard": 3, "lt_elder_rune": 1 }, "ench", 40, "Leave a mark; return to it once", "gadget", 1, {}], ["lm_beast_whistle", "Beast whistle", { "lt_wolf_fang": 2, "lt_bone_dust": 2 }, "bowyer", 8, "Your mount comes running from anywhere", "gadget", 1, {}], ["lm_treasure_dowsing_rod", "Treasure dowsing rod", { "lt_gold_leaf": 2, "lt_heartwood_log": 1 }, "ench", 18, "Points to the nearest chest or secret wall", "gadget", 1, {}], ["lm_trap_kit", "Trap kit", { "lt_mainspring": 1, "lt_spider_fang": 2 }, "garage", 12, "Set a trap: the first beast in is held 5 s", "gadget", 1, {}], ["lm_mirror_decoy", "Mirror decoy", { "lt_mirror_splinter": 2, "lt_moonstone": 1 }, "ench", 22, "A copy of you draws beasts away 10 s", "gadget", 1, {}], ["lm_glider", "Glider", { "lm_glider_wings": 1, "lt_moonsilk": 2 }, "tailor", 20, "Glide from any height, steer with your feet", "gadget", 1, {}], ["lm_climbing_claws", "Climbing claws", { "lt_raptor_claw": 4, "cr_leather": 1 }, "tannery", 18, "Climb sheer walls slowly", "gadget", 1, {}], ["lm_diving_bell", "Diving bell", { "lt_lens": 1, "cr_steel": 2, "dr_kelp": 4 }, "forge", 20, "Walk the sea floor as long as you like", "gadget", 1, {}]]], ["Familiars", [["lm_ember_wisp", "Ember wisp", { "lt_living_ember": 1, "lt_firesilk": 2 }, "ench", 25, "Floats by you; lights fires, burns foes that hit you", "familiar", 1, {}], ["lm_raven_familiar", "Raven familiar", { "lt_raven_feather": 6, "lm_raven_quill_brooch": 1 }, "ench", 18, "Scouts ahead and marks beasts", "familiar", 1, {}], ["lm_clockwork_owl", "Clockwork owl", { "lt_brass_cog": 6, "lt_lens": 2 }, "ench", 22, "Spots traps and secret walls", "familiar", 1, {}], ["lm_pixie", "Pixie", { "lt_pixie_dust": 8, "lt_neonbloom": 1 }, "ench", 20, "Heals you a little every few seconds", "familiar", 1, {}], ["lm_baby_drake", "Baby drake", { "lt_drakkyn_scale": 3, "lt_dragon_s_blood": 1 }, "ench", 36, "Grows up over a month; then breathes fire with you", "familiar", 1, {}], ["lm_cheshire_kitten", "Cheshire kitten", { "lt_cheshire_grin": 3, "wms_honey": 1 }, "ench", 24, "Vanishes and steals a little from beasts", "familiar", 1, {}], ["lm_bone_hound", "Bone hound", { "lt_wight_s_fingerbone": 4, "lt_skull": 2 }, "ench", 16, "Fetches pouches you missed", "familiar", 1, {}], ["lm_tide_sprite", "Tide sprite", { "lt_sea_king_pearl": 1, "dr_kelp": 4 }, "ench", 20, "Breathe under water while it's out", "familiar", 1, {}]]], ["Armour sets", [["lm_the_drowned_king_s_regalia_crown", "The Drowned King's regalia: crown", { "lt_barrow_silver": 3, "lt_grave_moss": 2, "lt_drowned_crown": 1, "cr_steel": 2 }, "forge", 20, "Piece 1 of 4. 2: breathe under water · 4: beasts you kill rise as drowned guards for 20 s", "armour", 1, { "set": "The Drowned King's regalia", "slot": "head" }], ["lm_the_drowned_king_s_regalia_mail", "The Drowned King's regalia: mail", { "lt_grave_moss": 3, "lt_burial_amber": 2, "lt_king_s_sea_blade": 1, "cr_steel": 2 }, "forge", 20, "Piece 2 of 4. 2: breathe under water · 4: beasts you kill rise as drowned guards for 20 s", "armour", 1, { "set": "The Drowned King's regalia", "slot": "chest" }], ["lm_the_drowned_king_s_regalia_gauntlets", "The Drowned King's regalia: gauntlets", { "lt_burial_amber": 3, "lt_weed_hung_chain": 2, "lt_heart_of_the_tide": 1, "cr_steel": 2 }, "forge", 20, "Piece 3 of 4. 2: breathe under water · 4: beasts you kill rise as drowned guards for 20 s", "armour", 1, { "set": "The Drowned King's regalia", "slot": "hands" }], ["lm_the_drowned_king_s_regalia_greaves", "The Drowned King's regalia: greaves", { "lt_weed_hung_chain": 3, "lt_tide_worn_shield_boss": 2, "lt_drowned_crown": 1, "cr_steel": 2 }, "forge", 20, "Piece 4 of 4. 2: breathe under water · 4: beasts you kill rise as drowned guards for 20 s", "armour", 1, { "set": "The Drowned King's regalia", "slot": "feet" }], ["lm_forge_father_s_harness_helm", "Forge-father's harness: helm", { "lt_slag_lump": 3, "lt_coke_coal": 2, "lt_colossus_core": 1, "cr_steel": 2 }, "forge", 20, "Piece 1 of 4. 2: fire-proof · 4: every 10th hit erupts in a slag burst", "armour", 1, { "set": "Forge-father's harness", "slot": "head" }], ["lm_forge_father_s_harness_breastplate", "Forge-father's harness: breastplate", { "lt_coke_coal": 3, "lt_broken_gear": 2, "lt_slag_iron_fist": 1, "cr_steel": 2 }, "forge", 20, "Piece 2 of 4. 2: fire-proof · 4: every 10th hit erupts in a slag burst", "armour", 1, { "set": "Forge-father's harness", "slot": "chest" }], ["lm_forge_father_s_harness_gauntlets", "Forge-father's harness: gauntlets", { "lt_broken_gear": 3, "lt_bellows_leather": 2, "lt_undying_ember": 1, "cr_steel": 2 }, "forge", 20, "Piece 3 of 4. 2: fire-proof · 4: every 10th hit erupts in a slag burst", "armour", 1, { "set": "Forge-father's harness", "slot": "hands" }], ["lm_forge_father_s_harness_greaves", "Forge-father's harness: greaves", { "lt_bellows_leather": 3, "lt_crucible_shard": 2, "lt_colossus_core": 1, "cr_steel": 2 }, "forge", 20, "Piece 4 of 4. 2: fire-proof · 4: every 10th hit erupts in a slag burst", "armour", 1, { "set": "Forge-father's harness", "slot": "feet" }], ["lm_the_matriarch_s_silks_hood", "The Matriarch's silks: hood", { "hx_silk": 3, "lt_webbed_bundle": 2, "lt_matriarch_s_fang": 1, "cr_steel": 2 }, "tailor", 20, "Piece 1 of 4. 2: walk on walls 5 s after a jump · 4: hits wrap foes in web", "armour", 1, { "set": "The Matriarch's silks", "slot": "head" }], ["lm_the_matriarch_s_silks_robe", "The Matriarch's silks: robe", { "lt_webbed_bundle": 3, "lt_spider_fang": 2, "lt_crown_of_frosted_web": 1, "cr_steel": 2 }, "tailor", 20, "Piece 2 of 4. 2: walk on walls 5 s after a jump · 4: hits wrap foes in web", "armour", 1, { "set": "The Matriarch's silks", "slot": "chest" }], ["lm_the_matriarch_s_silks_gloves", "The Matriarch's silks: gloves", { "lt_spider_fang": 3, "lt_cave_pearl": 2, "lt_queen_s_egg": 1, "cr_steel": 2 }, "tailor", 20, "Piece 3 of 4. 2: walk on walls 5 s after a jump · 4: hits wrap foes in web", "armour", 1, { "set": "The Matriarch's silks", "slot": "hands" }], ["lm_the_matriarch_s_silks_boots", "The Matriarch's silks: boots", { "lt_cave_pearl": 3, "hx_glowcap": 2, "lt_matriarch_s_fang": 1, "cr_steel": 2 }, "tailor", 20, "Piece 4 of 4. 2: walk on walls 5 s after a jump · 4: hits wrap foes in web", "armour", 1, { "set": "The Matriarch's silks", "slot": "feet" }], ["lm_cantor_s_vestments_mask", "Cantor's vestments: mask", { "lt_bell_bronze": 3, "lt_cracked_bell": 2, "lt_cantor_s_clapper": 1, "cr_steel": 2 }, "tailor", 20, "Piece 1 of 4. 2: Silence always on · 4: each spell rings a bell that stuns near foes", "armour", 1, { "set": "Cantor's vestments", "slot": "head" }], ["lm_cantor_s_vestments_robe", "Cantor's vestments: robe", { "lt_cracked_bell": 3, "lt_belfry_rope": 2, "lt_faceless_mask": 1, "cr_steel": 2 }, "tailor", 20, "Piece 2 of 4. 2: Silence always on · 4: each spell rings a bell that stuns near foes", "armour", 1, { "set": "Cantor's vestments", "slot": "chest" }], ["lm_cantor_s_vestments_gloves", "Cantor's vestments: gloves", { "lt_belfry_rope": 3, "lt_pigeon_feather": 2, "lt_silent_bell": 1, "cr_steel": 2 }, "tailor", 20, "Piece 3 of 4. 2: Silence always on · 4: each spell rings a bell that stuns near foes", "armour", 1, { "set": "Cantor's vestments", "slot": "hands" }], ["lm_cantor_s_vestments_boots", "Cantor's vestments: boots", { "lt_pigeon_feather": 3, "lt_candle_wax": 2, "lt_cantor_s_clapper": 1, "cr_steel": 2 }, "tailor", 20, "Piece 4 of 4. 2: Silence always on · 4: each spell rings a bell that stuns near foes", "armour", 1, { "set": "Cantor's vestments", "slot": "feet" }], ["lm_raven_s_mourning_hat", "Raven's mourning: hat", { "lt_catacomb_bone": 3, "lt_raven_feather": 2, "lt_alchemist_s_mercury": 1, "cr_steel": 2 }, "w:paris", 20, "Piece 1 of 4. 2: a raven scouts ahead (marks beasts) · 4: 'Nevermore': a foe under 20% life cannot heal", "armour", 1, { "set": "Raven's mourning", "slot": "head" }], ["lm_raven_s_mourning_coat", "Raven's mourning: coat", { "lt_raven_feather": 3, "lt_alchemist_s_mercury": 1, "cr_steel": 2 }, "w:paris", 20, "Piece 2 of 4. 2: a raven scouts ahead (marks beasts) · 4: 'Nevermore': a foe under 20% life cannot heal", "armour", 1, { "set": "Raven's mourning", "slot": "chest" }], ["lm_raven_s_mourning_gloves", "Raven's mourning: gloves", { "lt_alchemist_s_mercury": 1, "lt_catacomb_bone": 2, "cr_steel": 2 }, "w:paris", 20, "Piece 3 of 4. 2: a raven scouts ahead (marks beasts) · 4: 'Nevermore': a foe under 20% life cannot heal", "armour", 1, { "set": "Raven's mourning", "slot": "hands" }], ["lm_raven_s_mourning_boots", "Raven's mourning: boots", { "lt_catacomb_bone": 3, "lt_raven_feather": 2, "lt_alchemist_s_mercury": 1, "cr_steel": 2 }, "w:paris", 20, "Piece 4 of 4. 2: a raven scouts ahead (marks beasts) · 4: 'Nevermore': a foe under 20% life cannot heal", "armour", 1, { "set": "Raven's mourning", "slot": "feet" }], ["lm_heart_of_the_drakkyn_helm", "Heart of the Drakkyn: helm", { "lt_drake_glass": 3, "lt_fire_land_ash": 2, "lt_neonbloom": 1, "cr_steel": 2 }, "w:awen", 20, "Piece 1 of 4. 2: fire-proof, glows · 4: once a fight, become a drake for 15 s", "armour", 1, { "set": "Heart of the Drakkyn", "slot": "head" }], ["lm_heart_of_the_drakkyn_scale_coat", "Heart of the Drakkyn: scale coat", { "lt_fire_land_ash": 3, "lt_drakkyn_scale": 2, "lt_neonbloom": 1, "cr_steel": 2 }, "w:awen", 20, "Piece 2 of 4. 2: fire-proof, glows · 4: once a fight, become a drake for 15 s", "armour", 1, { "set": "Heart of the Drakkyn", "slot": "chest" }], ["lm_heart_of_the_drakkyn_gauntlets", "Heart of the Drakkyn: gauntlets", { "lt_drakkyn_scale": 3, "lt_neonbloom": 1, "cr_steel": 2 }, "w:awen", 20, "Piece 3 of 4. 2: fire-proof, glows · 4: once a fight, become a drake for 15 s", "armour", 1, { "set": "Heart of the Drakkyn", "slot": "hands" }], ["lm_heart_of_the_drakkyn_greaves", "Heart of the Drakkyn: greaves", { "lt_neonbloom": 1, "lt_drake_glass": 2, "cr_steel": 2 }, "w:awen", 20, "Piece 4 of 4. 2: fire-proof, glows · 4: once a fight, become a drake for 15 s", "armour", 1, { "set": "Heart of the Drakkyn", "slot": "feet" }], ["lm_snow_queen_s_mantle_crown", "Snow Queen's mantle: crown", { "lt_snow_queen_s_ice": 3, "lt_rose_of_summer": 2, "lt_mirror_splinter": 1, "cr_steel": 2 }, "w:winters", 20, "Piece 1 of 4. 2: frost-proof · 4: foes who touch you freeze 2 s", "armour", 1, { "set": "Snow Queen's mantle", "slot": "head" }], ["lm_snow_queen_s_mantle_gown", "Snow Queen's mantle: gown", { "lt_rose_of_summer": 3, "hx_moss": 2, "lt_mirror_splinter": 1, "cr_steel": 2 }, "w:winters", 20, "Piece 2 of 4. 2: frost-proof · 4: foes who touch you freeze 2 s", "armour", 1, { "set": "Snow Queen's mantle", "slot": "chest" }], ["lm_snow_queen_s_mantle_gloves", "Snow Queen's mantle: gloves", { "hx_moss": 3, "lt_mirror_splinter": 1, "cr_steel": 2 }, "w:winters", 20, "Piece 3 of 4. 2: frost-proof · 4: foes who touch you freeze 2 s", "armour", 1, { "set": "Snow Queen's mantle", "slot": "hands" }], ["lm_snow_queen_s_mantle_slippers", "Snow Queen's mantle: slippers", { "lt_mirror_splinter": 1, "lt_snow_queen_s_ice": 2, "cr_steel": 2 }, "w:winters", 20, "Piece 4 of 4. 2: frost-proof · 4: foes who touch you freeze 2 s", "armour", 1, { "set": "Snow Queen's mantle", "slot": "feet" }], ["lm_argonaut_s_kit_helm", "Argonaut's kit: helm", { "lt_bronze_of_troy": 3, "lt_golden_fleece_tuft": 2, "lt_ambrosia_drop": 1, "cr_steel": 2 }, "w:greece", 20, "Piece 1 of 4. 2: +block · 4: the fleece heals the whole party slowly", "armour", 1, { "set": "Argonaut's kit", "slot": "head" }], ["lm_argonaut_s_kit_cuirass", "Argonaut's kit: cuirass", { "lt_golden_fleece_tuft": 3, "lt_olive_branch": 2, "lt_ambrosia_drop": 1, "cr_steel": 2 }, "w:greece", 20, "Piece 2 of 4. 2: +block · 4: the fleece heals the whole party slowly", "armour", 1, { "set": "Argonaut's kit", "slot": "chest" }], ["lm_argonaut_s_kit_shield", "Argonaut's kit: shield", { "lt_olive_branch": 3, "lt_medusa_s_scale": 2, "lt_ambrosia_drop": 1, "cr_steel": 2 }, "w:greece", 20, "Piece 3 of 4. 2: +block · 4: the fleece heals the whole party slowly", "armour", 1, { "set": "Argonaut's kit", "slot": "hands" }], ["lm_argonaut_s_kit_greaves", "Argonaut's kit: greaves", { "lt_medusa_s_scale": 3, "lt_ambrosia_drop": 1, "cr_steel": 2 }, "w:greece", 20, "Piece 4 of 4. 2: +block · 4: the fleece heals the whole party slowly", "armour", 1, { "set": "Argonaut's kit", "slot": "feet" }], ["lm_captain_nemo_s_diving_suit_helmet", "Captain Nemo's diving suit: helmet", { "dr_kelp": 3, "lt_nautilus_shell": 2, "lt_sea_king_pearl": 1, "cr_steel": 2 }, "w:deep", 20, "Piece 1 of 4. 2: breathe under water · 4: swim as fast as you run, electric hits", "armour", 1, { "set": "Captain Nemo's diving suit", "slot": "head" }], ["lm_captain_nemo_s_diving_suit_suit", "Captain Nemo's diving suit: suit", { "lt_nautilus_shell": 3, "lt_ambergris": 2, "lt_sea_king_pearl": 1, "cr_steel": 2 }, "w:deep", 20, "Piece 2 of 4. 2: breathe under water · 4: swim as fast as you run, electric hits", "armour", 1, { "set": "Captain Nemo's diving suit", "slot": "chest" }], ["lm_captain_nemo_s_diving_suit_gloves", "Captain Nemo's diving suit: gloves", { "lt_ambergris": 3, "lt_sea_king_pearl": 1, "cr_steel": 2 }, "w:deep", 20, "Piece 3 of 4. 2: breathe under water · 4: swim as fast as you run, electric hits", "armour", 1, { "set": "Captain Nemo's diving suit", "slot": "hands" }], ["lm_captain_nemo_s_diving_suit_boots", "Captain Nemo's diving suit: boots", { "lt_sea_king_pearl": 1, "dr_kelp": 2, "cr_steel": 2 }, "w:deep", 20, "Piece 4 of 4. 2: breathe under water · 4: swim as fast as you run, electric hits", "armour", 1, { "set": "Captain Nemo's diving suit", "slot": "feet" }], ["lm_tin_woodman_s_plate_funnel_hat", "Tin Woodman's plate: funnel hat", { "lt_emerald_city_glass": 3, "lt_poppy_pollen": 2, "lt_straw": 1, "cr_steel": 2 }, "w:oz", 20, "Piece 1 of 4. 2: can't bleed · 4: a heart: heal 1% of life every second", "armour", 1, { "set": "Tin Woodman's plate", "slot": "head" }], ["lm_tin_woodman_s_plate_plate", "Tin Woodman's plate: plate", { "lt_poppy_pollen": 3, "lt_tin_plate": 2, "lt_straw": 1, "cr_steel": 2 }, "w:oz", 20, "Piece 2 of 4. 2: can't bleed · 4: a heart: heal 1% of life every second", "armour", 1, { "set": "Tin Woodman's plate", "slot": "chest" }], ["lm_tin_woodman_s_plate_gauntlets", "Tin Woodman's plate: gauntlets", { "lt_tin_plate": 3, "lt_winkie_gold": 2, "lt_straw": 1, "cr_steel": 2 }, "w:oz", 20, "Piece 3 of 4. 2: can't bleed · 4: a heart: heal 1% of life every second", "armour", 1, { "set": "Tin Woodman's plate", "slot": "hands" }], ["lm_tin_woodman_s_plate_greaves", "Tin Woodman's plate: greaves", { "lt_winkie_gold": 3, "lt_straw": 1, "cr_steel": 2 }, "w:oz", 20, "Piece 4 of 4. 2: can't bleed · 4: a heart: heal 1% of life every second", "armour", 1, { "set": "Tin Woodman's plate", "slot": "feet" }]]], ["Legendaries", [["lm_nevermore", "Nevermore", { "lm_raven_s_mourning_coat": 1, "lt_raven_feather": 6, "lt_starmetal_ingot": 4 }, "w:paris", 30, "A raven-black blade: kills raise a raven that fights for you 20 s", "weapon", 1, { "pw": "nevermore", "leg": 1, "base": "longsword", "t": 5, "x": 2.1 }], ["lm_bell_of_the_last_hour", "Bell of the Last Hour", { "lt_cantor_s_clapper": 1, "lt_silent_bell": 1, "lt_dragonforged_ingot": 3 }, "forge", 38, "Each blow tolls: the 12th stops every foe near for 3 s", "weapon", 1, { "pw": "bell", "leg": 1, "base": "warhammer", "t": 5, "x": 2.1 }], ["lm_the_tide_king_s_trident", "The Tide-King's Trident", { "lt_heart_of_the_tide": 1, "lt_king_s_sea_blade": 1, "lt_sea_king_pearl": 1 }, "w:deep", 30, "Call a wave that carries foes away; you can ride it", "weapon", 1, { "pw": "tide", "leg": 1, "base": "trident", "t": 5, "x": 2.1 }], ["lm_colossus_heart_gauntlets", "Colossus Heart Gauntlets", { "lt_colossus_core": 2, "lt_undying_ember": 1 }, "forge", 34, "Punches leave molten slag on the ground; you walk through lava", "weapon", 1, { "pw": "colossus", "leg": 1, "base": "morningstar", "t": 5, "x": 2.1 }], ["lm_widow_s_kiss", "Widow's Kiss", { "lt_matriarch_s_fang": 1, "lt_queen_s_egg": 1, "lt_venom_sac": 5 }, "forge", 34, "Poisoned foes spawn little spiders that fight for you", "weapon", 1, { "pw": "widow", "leg": 1, "base": "dagger", "t": 5, "x": 2.1 }], ["lm_skybreaker", "Skybreaker", { "lt_starwood_branch": 4, "lt_titan_s_sinew": 1, "lt_sunflare_spark": 3 }, "w:space", 36, "Arrows call down lightning where they land", "weapon", 1, { "pw": "sky", "leg": 1, "base": "longbow", "t": 5, "x": 2.1 }], ["lm_the_emerald_spectacles", "The Emerald Spectacles", { "lt_emerald_city_glass": 4, "sk_bar3": 1 }, "w:oz", 20, "See every hidden door, chest and trap in any world", "trinket", 1, { "pw": "specs", "leg": 1 }], ["lm_peter_s_shadow", "Peter's Shadow", { "lt_pixie_dust": 10, "lt_scrap_of_the_dark": 3 }, "w:neverland", 26, "Your shadow fights beside you; fly for 10 s once a minute", "trinket", 1, { "pw": "shadow", "leg": 1 }], ["lm_hourglass_of_wonderland", "Hourglass of Wonderland", { "lt_cheshire_grin": 3, "lt_drink_me_drop": 1, "lt_eat_me_cake_crumb": 1, "lt_card_soldier_lacquer": 1 }, "w:wonderland", 30, "Stop time for 4 s; you alone move (once a fight)", "trinket", 1, { "pw": "hourglass", "leg": 1 }], ["lm_mirror_of_the_snow_queen", "Mirror of the Snow Queen", { "lt_mirror_splinter": 7, "lt_snow_queen_s_ice": 3 }, "w:winters", 32, "Reflects spells back at the caster", "trinket", 1, { "pw": "mirror", "leg": 1 }], ["lm_the_golden_fleece", "The Golden Fleece", { "lt_golden_fleece_tuft": 12, "lm_spun_gold": 2 }, "w:greece", 34, "Worn: heal fully once a fight when you fall below a quarter", "trinket", 1, { "pw": "fleece", "leg": 1 }], ["lm_drakefire_blade", "Drakefire Blade", { "lt_drake_glass": 6, "lt_drakkyn_scale": 4, "lt_dragon_s_blood": 1 }, "w:awen", 38, "Breathes fire in a cone every 8 s", "weapon", 1, { "pw": "drakefire", "leg": 1, "base": "longsword", "t": 5, "x": 2.1 }], ["lm_dracula_s_signet", "Dracula's Signet", { "lt_vampire_fang": 4, "lt_abyssal_pearl": 1, "sk_bar4": 1 }, "w:dracula", 36, "Turn into bats to dodge (once in 10 s); drain life by night", "trinket", 1, { "pw": "signet", "leg": 1 }], ["lm_galvanic_heart", "Galvanic Heart", { "lt_galvanic_coil": 6, "lt_molten_heart": 1 }, "w:frozen", 30, "If you fall, a shock brings you back with half life (once an hour)", "trinket", 1, { "pw": "galvanic", "leg": 1 }], ["lm_nemo_s_electric_rifle", "Nemo's Electric Rifle", { "lt_alien_alloy": 3, "lt_galvanic_coil": 3, "lt_nautilus_shell": 1 }, "w:deep", 30, "Shots chain under water and stun", "weapon", 1, { "pw": "nemo", "leg": 1, "base": "rifle", "t": 5, "x": 2.1 }], ["lm_ape_king_s_vine", "Ape-King's Vine", { "lt_jungle_vine": 10, "lt_leopard_pelt": 2 }, "w:tarzan", 22, "Grapple to any tree or ledge in sight; beasts of the jungle won't attack", "gadget", 1, { "pw": "vine", "leg": 1 }], ["lm_philosopher_s_stone", "Philosopher's Stone", { "lt_alchemist_s_mercury": 5, "sk_bar3": 5, "lt_dragon_s_blood": 1 }, "w:paris", 44, "Every draught you drink lasts twice as long; turns 10 iron into gold a day", "trinket", 1, { "pw": "stone", "leg": 1 }], ["lm_lantern_of_the_long_road", "Lantern of the Long Road", { "dr_marigold": 10, "lt_tallow_candle_end": 3 }, "w:dracula", 24, "Light it: the dead of that place come to talk, and show you their secrets", "trinket", 1, { "pw": "lantern", "leg": 1 }]]], ["Sockets and gems", [["lm_socket_punch", "Socket punch", { "lt_darksteel_ingot": 1, "lt_elder_rune": 1 }, "forge", 36, "Adds one socket to any piece (most 3)", "mat", 1, {}]]]];
var LTF_MADE = {}, LTF_RB = {};
(function () {
if (typeof SPG_BOOK !== "undefined" && typeof LTF_BOOK !== "undefined" && !LTF_BOOK.spg) {
LTF_BOOK.spg = 1;
SPG_BOOK.forEach(function (S) { LTF_BOOK.push(S); });
}
})();
(LTF_BOOK || []).forEach(function (S) {
S[1].forEach(function (r) {
LTF_RB[r[0]] = { k: r[0], mk: (r[8] && r[8].makes) || r[0], n: r[1], need: r[2], b: r[3], lv: r[4], d: String(r[5]).replace(/\.? *In the game now: this makes its tome/, ""), ty: r[6], am: r[7], x: r[8] || {}, s: S[0] };
if (!LTF_ITEMS[r[0]] && !(r[8] && r[8].makes))
LTF_MADE[r[0]] = LTF_RB[r[0]];
});
});
(function () {
if (typeof FG_MB === "undefined")
return;
Object.keys(LTF_MADE).forEach(function (k) { var R = LTF_MADE[k]; if (!FG_MB[k] && /^lm_/.test(k))
FG_MB[k] = { kind: k, name: R.n.replace(/\s*\(\d+\)\s*$/, "").replace(" ★", ""), icon: ltfPic(k), buys: 1, price: null, where: "Made: " + R.d }; });
})();
var LTF_BENCH_N = { forge: "a forge", gun: "the gunsmith's bench", scribe: "the scribe's desk", ench: "the enchanter's table", jewel: "the jeweller's bench", alch: "the alchemist's bench",
star: "the star forge", bowyer: "the bowyer's bench", tannery: "the tannery", tailor: "the tailor's table", loom: "the loom", garage: "the garage", build: "the builder's yard",
glass: "the glassblower's furnace", kiln: "the kiln", font: "the temple font" };
var LTF_BENCH_AT = { forge: "the Smithy, the War Forge or Hephaestus's forge", gun: "the Engine House, the Watchmaker's or the Motor Pool", scribe: "the Bindery, the Print Shop or the City Archive",
ench: "the Vestry of Temple Row or the City Museum", jewel: "the Jeweller's or the Watchmaker's", alch: "the Apothecary or the Herbalist's", star: "the Reactor, the Engine House or the Motor Pool",
bowyer: "the Joinery or the War Forge", tannery: "the Smithy, the Cobbler's or the Butcher's", tailor: "the Tailor's or the Weaving Shed", loom: "the Weaving Shed or the Tailor's",
garage: "the Transport Depot, the Wheelwright's or a garage", build: "the Masons' Yard, the Joinery or the Wheelwright's", glass: "the Glassworks", kiln: "the Pottery", font: "the Vestry of Temple Row" };
var LTF_WP = { "The Smithy": ["forge", "tannery"], "The Joinery": ["bowyer", "build"], "The Bindery": ["scribe"], "The Print Shop": ["scribe"], "The City Archive": ["scribe"],
"The Jeweller's": ["jewel"], "The Watchmaker's": ["jewel", "gun"], "The Apothecary": ["alch"], "The Herbalist's": ["alch"], "The Vestry of Temple Row": ["ench", "font"],
"The City Museum": ["ench"], "The Engine House": ["gun", "star"], "The Reactor": ["star"], "The Cobbler's": ["tannery"], "The Butcher's": ["tannery"], "The Tailor's": ["tailor", "loom"],
"The Weaving Shed": ["loom", "tailor"], "The Transport Depot": ["garage"], "The Wheelwright's": ["garage", "build"], "The Masons' Yard": ["build"], "The Glassworks": ["glass"], "The Pottery": ["kiln"] };
var LTF_ST = { warforge: ["forge", "bowyer", "gun", "tannery"], smithy: ["forge", "tannery"], volcano: ["forge", "bowyer", "gun", "star", "tannery", "glass", "kiln"], engineer: ["gun", "star", "garage"],
joinery: ["bowyer", "build"], garage: ["garage"] };
var LTFB = { open: false, el: null, sec: null, q: "", can: false, busy: false, msg: "", tab: "book" };
function ltfKeeper() { try {
return typeof amKeeper === "function" && amKeeper();
}
catch (e) {
return false;
} }
function ltfBenchHere() { return __ZC(500, 0, this, arguments, new.target); }
function ltfBenchName(b) { return /^w:/.test(b) ? "anywhere in " + (LTF_NAMES[b.slice(2)] || b.slice(2)) : LTF_BENCH_N[b] || b; }
function ltfHave(k) { try {
return +(FG.stock && FG.stock[k]) || 0;
}
catch (e) {
return 0;
} }
function ltfName(k) { var M = (typeof FG_MB !== "undefined" && FG_MB[k]) || null; if (M && M.name)
return M.name; if (LTF_ITEMS[k])
return LTF_ITEMS[k][0]; if (LTF_RB[k])
return LTF_RB[k].n; return k; }
function ltfIcon(k, px) { return ltfPic(k, px) || ((typeof FG_MB !== "undefined" && FG_MB[k] && FG_MB[k].icon) || "📦"); }
function ltfCanMake(R, times) { times = times || 1; return Object.keys(R.need).every(function (k) { return ltfHave(k) >= R.need[k] * times; }); }
function ltfLevel() { try {
return typeof cbtLevel === "function" ? cbtLevel() : 1;
}
catch (e) {
return 1;
} }
function ltfLoadStock() { try {
if (typeof fgLoad === "function" && !(FG.loaded))
fgLoad();
else if (typeof cityRpc === "function")
cityRpc("my_stock").then(function (rows) { var S = {}; (rows || []).forEach(function (r) { S[r.kind] = +r.amount || 0; }); FG.stock = S; if (LTFB.open)
ltfPaint(); ltfSync(); }).catch(function () { });
}
catch (e) { } }
function ltfOpen(sec) {
LTFB.open = true;
if (sec)
LTFB.sec = sec;
LTFB.msg = "";
ltfLoadStock();
ltfPaint();
try {
if (document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
}
function ltfClose() { LTFB.open = false; if (LTFB.el)
LTFB.el.style.display = "none"; }
function ltfEl() { return __ZC(500, 1, this, arguments, new.target); }
function ltfNeedHtml(R) {
return Object.keys(R.need).map(function (k) {
var h = ltfHave(k), n = R.need[k];
return "<span class='nd " + (h >= n ? "g" : "x") + "'>" + ltfIcon(k, 22) + " " + n + " " + dglEsc(ltfName(k).toLowerCase()) + " <span style='opacity:.65'>(" + h + ")</span></span>";
}).join("");
}
function ltfRow(R, here, keeper) { return __ZC(500, 2, this, arguments, new.target); }
function ltfYours() { return __ZC(500, 3, this, arguments, new.target); }
function ltfPaint(keepFocus) { return __ZC(500, 4, this, arguments, new.target); }
function ltfMake(k, n) { return __ZC(500, 5, this, arguments, new.target); }
(function () {
if (typeof PS_SECTIONS !== "undefined") {
var Y = PS_SECTIONS.filter(function (s) { return s.k === "you"; })[0];
if (Y && Y.ids.indexOf("me-make") < 0) {
var i = Y.ids.indexOf("me-pack");
Y.ids.splice(i < 0 ? 0 : i + 1, 0, "me-make");
}
}
if (typeof PS_ICON !== "undefined")
PS_ICON["me-make"] = "📜";
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-make"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-make";
b.title = "The Maker's Book: every recipe, what it needs and where it is made";
b.textContent = "📜 Maker's book";
b.onclick = function () { if (LTFB.open)
ltfClose();
else
ltfOpen(); };
var pk = document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (typeof document !== "undefined") {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
}
if (typeof bkpPaint === "function") {
var bp = bkpPaint;
bkpPaint = function () {
var r = bp.apply(this, arguments);
try {
var el = document.getElementById("bkp-box");
if (el && el.style.display !== "none" && !el.querySelector("[data-ltgo]")) {
var w = el.querySelector("[data-eqgo]") || el.querySelector("[data-bk='wardrobe']");
if (w) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-ltgo", "1");
b.textContent = "📜 Maker's book";
b.onclick = function (e) { e.stopPropagation(); if (typeof bkpClose === "function")
bkpClose(); ltfOpen(); };
w.parentNode.insertBefore(b, w);
w.parentNode.insertBefore(document.createTextNode(" "), w);
}
}
}
catch (e) { }
return r;
};
}
})();
(function () {
var el = null;
setInterval(function () {
try {
if (typeof document === "undefined" || !document.body)
return;
var on = false, here = {};
if (!LTFB.open && typeof walkMode !== "undefined" && walkMode && typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.wpKey && LTF_WP[INT.wpKey]) {
on = true;
LTF_WP[INT.wpKey].forEach(function (b) { here[b] = 1; });
}
if (!el) {
el = document.createElement("button");
el.id = "ltf-bench";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:calc(122px + env(safe-area-inset-top,0px));z-index:44;display:none;border:1px solid #C9A868;background:rgba(24,16,10,.9);color:#FFE7B0;border-radius:10px;padding:9px 16px;font-size:15px;font-weight:600";
el.onclick = function () { ltfOpen(); };
document.body.appendChild(el);
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ltf-bench"] = 1;
}
if (on) {
var t = "📜 Make things here: " + Object.keys(here).map(ltfBenchName).join(", ");
if (el.textContent !== t)
el.textContent = t;
el.style.display = "block";
}
else
el.style.display = "none";
}
catch (e) { }
}, 700);
})();
(function () {
if (typeof fgPaint !== "function")
return;
var fp = fgPaint;
fgPaint = function () {
var r = fp.apply(this, arguments);
try {
var box = FG.open && FG.el;
if (box && !box.querySelector("[data-ltgo]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-ltgo", "1");
b.textContent = "📜 The Maker's Book: the new recipes";
b.style.cssText = "display:block;margin:6px 0";
b.onclick = function (e) { e.stopPropagation(); ltfOpen(); };
box.appendChild(b);
}
}
catch (e) { }
return r;
};
})();
var LTF_ARMS = {};
(function () {
if (typeof BW_ARMS === "undefined")
return;
Object.keys(LTF_RB).forEach(function (k) {
var R = LTF_RB[k];
if (R.ty !== "weapon" || !R.x.base)
return;
var B = BW_ARMS[R.x.base];
if (!B)
return;
var A = {};
Object.keys(B).forEach(function (q) { A[q] = B[q]; });
A.name = R.n;
A.dmg = Math.round((+B.dmg || 10) * (R.x.x || 1) * 10) / 10;
A.era = "Made";
A.made = k;
A.tierN = R.x.t;
var id = "mk_" + k.replace(/^lm_/, "");
BW_ARMS[id] = A;
LTF_ARMS[k] = id;
});
})();
function ltfSync() {
try {
if (typeof bkpKept !== "function" || typeof FG === "undefined" || !FG.stock)
return;
var K = bkpKept(), ch = false;
Object.keys(LTF_ARMS).forEach(function (k) {
if (ltfHave(k) <= 0)
return;
var a = "bw_" + LTF_ARMS[k];
if (!K.some(function (q) { return q.a === a; })) {
K.push({ id: a + "_" + (typeof uid === "function" ? uid() : Date.now()), a: a, name: BW_ARMS[LTF_ARMS[k]].name, from: "your own making", got: "made" });
ch = true;
}
});
if (ch && typeof save === "function")
save();
}
catch (e) { }
}
(function () {
if (typeof CBT_MAGIC === "undefined" || typeof CBT_SCHOOLS === "undefined")
return;
CBT_SCHOOLS.white = { n: "White magic", i: "🤍", elem: "light" };
CBT_SCHOOLS.black = { n: "Black magic", i: "🖤", elem: "shadow" };
var W = "white", K = "black", add = [
{ id: "m_bless", sch: W, n: "Bless", i: "🙏", lv: 1, mana: 16, cd: 20, t: "buff", buff: "might", dur: 12, v: 0.2, d: "A blessing on your blows: a fifth harder for 12 seconds." },
{ id: "m_purify", sch: W, n: "Purify", i: "💧", lv: 1, mana: 14, cd: 16, t: "buff", buff: "regen", dur: 5, v: 2, mend: 12, d: "Clean light runs through you: 12 at once and 2 a second for 5 seconds." },
{ id: "m_light", sch: W, n: "Light", i: "🕯️", lv: 1, mana: 8, cd: 30, t: "buff", buff: "light", dur: 120, v: 1, d: "A floating light follows you for two minutes." },
{ id: "m_sanctuary", sch: W, n: "Sanctuary", i: "⛪", lv: 9, mana: 30, cd: 30, t: "buff", buff: "absorb", dur: 6, v: 400, d: "For six seconds no blow gets through to you." },
{ id: "m_turnundead", sch: W, n: "Turn Undead", i: "✝️", lv: 9, mana: 26, cd: 18, t: "around", m: 0.6, rad: 8, push: 8, stun: 1.5, d: "Holy light round you: foes near are hurt, thrown back and dazed." },
{ id: "m_mendwounds", sch: W, n: "Mend Wounds", i: "🩹", lv: 9, mana: 30, cd: 24, t: "buff", buff: "regen", dur: 10, v: 6, mend: 10, d: "Wounds close: 10 at once and 6 every second for 10 seconds." },
{ id: "m_holyfire", sch: W, n: "Holy Fire", i: "🔥", lv: 16, mana: 38, cd: 18, t: "around", m: 1.3, rad: 6, mend: 20, elem: "light", d: "White fire round you: it burns foes near and mends you 20." },
{ id: "m_dispel", sch: W, n: "Dispel", i: "✴️", lv: 16, mana: 26, cd: 20, t: "buff", buff: "absorb", dur: 8, v: 50, mend: 10, d: "Whatever was on you is lifted: you mend 10 and a ward soaks the next 50." },
{ id: "m_guardian", sch: W, n: "Guardian Angel", i: "👼", lv: 16, mana: 44, cd: 40, t: "zone", m: 0.7, rad: 3, ticks: 10, gap: 1, d: "A winged guardian strikes your foe ten times over ten seconds." },
{ id: "m_massheal", sch: W, n: "Mass Heal", i: "💖", lv: 25, mana: 55, cd: 40, t: "buff", buff: "regen", dur: 8, v: 8, mend: 50, d: "A flood of light: 50 at once and 8 every second for 8 seconds." },
{ id: "m_divineward", sch: W, n: "Divine Ward", i: "🛡️", lv: 25, mana: 50, cd: 45, t: "buff", buff: "wall", dur: 15, v: 0.5, d: "Blows land half as hard for 15 seconds." },
{ id: "m_resurrect", sch: W, n: "Resurrection", i: "🕊️", lv: 36, mana: 80, cd: 90, t: "buff", buff: "absorb", dur: 12, v: 150, mend: 100, d: "Life pours back: 100 at once, and a shell that soaks 150." },
{ id: "m_wrath", sch: W, n: "Wrath of Heaven", i: "🌟", lv: 36, mana: 80, cd: 45, t: "zone", m: 1.4, rad: 7, ticks: 5, gap: 0.4, stun: 0.5, d: "Pillars of light fall on the foe and all round it, five times." },
{ id: "m_sanctum", sch: W, n: "Sanctum", i: "⭕", lv: 36, mana: 75, cd: 60, t: "buff", buff: "wall", dur: 20, v: 0.7, d: "A holy circle: blows land at under a third for 20 seconds." },
{ id: "m_weakness", sch: K, n: "Curse of Weakness", i: "🥀", lv: 1, mana: 12, cd: 6, t: "shot", m: 0.7, spd: 40, slow: 3, d: "A curse that drags at the foe: it moves and strikes slower for 3 seconds." },
{ id: "m_fear", sch: K, n: "Fear", i: "😨", lv: 1, mana: 14, cd: 10, t: "shot", m: 0.4, spd: 40, push: 8, stun: 1.5, d: "Terror flung at the foe: it reels back and freezes." },
{ id: "m_bonespear", sch: K, n: "Bone Spear", i: "🦴", lv: 1, mana: 14, cd: 3.5, t: "shot", m: 1.6, spd: 60, d: "A spear of bone, hard and fast." },
{ id: "m_skeleton", sch: K, n: "Raise Skeleton", i: "💀", lv: 9, mana: 32, cd: 40, t: "zone", m: 0.5, rad: 3, ticks: 12, gap: 1, d: "A skeleton claws its way up and hacks at the foe for twelve seconds." },
{ id: "m_poisoncloud", sch: K, n: "Poison Cloud", i: "☠️", lv: 9, mana: 30, cd: 18, t: "zone", m: 0.3, rad: 5, ticks: 8, gap: 0.4, dot: { dps: 0.2, t: 5 }, d: "A cloud of poison on the foe: all inside it sicken." },
{ id: "m_blind", sch: K, n: "Blind", i: "🙈", lv: 9, mana: 22, cd: 16, t: "shot", m: 0.3, spd: 50, stun: 3, d: "Darkness over the foe's eyes: it stands lost for three seconds." },
{ id: "m_corpse", sch: K, n: "Corpse Explosion", i: "💥", lv: 16, mana: 36, cd: 16, t: "around", m: 1.8, rad: 6, d: "The dead round you burst: everything near is torn." },
{ id: "m_hex", sch: K, n: "Hex", i: "🧿", lv: 16, mana: 32, cd: 14, t: "shot", m: 0.6, spd: 44, bleed: 8, d: "A hex that eats at the foe for eight seconds." },
{ id: "m_soulchains", sch: K, n: "Soul Chains", i: "⛓️", lv: 16, mana: 34, cd: 20, t: "shot", m: 0.6, spd: 44, stun: 4, d: "Chains of soul-stuff hold the foe fast for four seconds." },
{ id: "m_raisedead", sch: K, n: "Raise the Dead", i: "🧟", lv: 25, mana: 60, cd: 50, t: "zone", m: 0.6, rad: 5, ticks: 12, gap: 0.8, d: "The fallen rise round the foe and tear at everything there." },
{ id: "m_plague", sch: K, n: "Plague", i: "🦠", lv: 25, mana: 55, cd: 30, t: "volley", m: 0.8, rng: 20, n2: 6, dot: { dps: 0.25, t: 6 }, d: "Sickness leaps to six foes and keeps eating." },
{ id: "m_deathmark", sch: K, n: "Death Mark", i: "⚰️", lv: 36, mana: 70, cd: 30, t: "shot", m: 3.2, spd: 55, d: "A mark of death: one terrible blow." },
{ id: "m_lich", sch: K, n: "Lich Form", i: "👑", lv: 36, mana: 70, cd: 90, t: "buff", buff: "might", dur: 20, v: 0.6, d: "You become a lich for 20 seconds: your blows land 60% harder." },
{ id: "m_eclipse", sch: K, n: "Eclipse", i: "🌑", lv: 36, mana: 85, cd: 60, t: "around", m: 2, rad: 10, pulses: 3, gap: 0.5, d: "The sky goes dark three times over: all near you are struck." },
{ id: "m_phoenix", sch: "fire", n: "Phoenix Fire", i: "🐦‍🔥", lv: 36, mana: 80, cd: 50, t: "around", m: 2.2, rad: 9, dot: { dps: 0.3, t: 5 }, d: "Wings of flame sweep all round you and leave everything burning." },
{ id: "m_winterheart", sch: "frost", n: "Winter's Heart", i: "💙", lv: 36, mana: 80, cd: 60, t: "around", m: 1, rad: 8, stun: 6, d: "Everything near you turns to ice for six seconds." },
{ id: "m_skyfall", sch: "storm", n: "Skyfall", i: "🌩️", lv: 36, mana: 85, cd: 60, t: "zone", m: 0.7, rad: 9, ticks: 20, gap: 0.5, stun: 0.3, d: "Lightning falls on the foe and all round it for ten seconds." },
{ id: "m_wildwrath", sch: "nature", n: "Wrath of the Wild", i: "🐺", lv: 36, mana: 80, cd: 50, t: "volley", m: 1.3, rng: 24, n2: 8, bleed: 4, d: "The beasts of the land rush at eight foes in front of you." }
];
add.forEach(function (S) { if (CBT_MAGIC_BY[S.id])
return; S.made = true; if (!S.elem)
S.elem = CBT_SCHOOLS[S.sch].elem; CBT_MAGIC.push(S); CBT_MAGIC_BY[S.id] = S; });
if (typeof cbtTomeChoices === "function") {
var tc = cbtTomeChoices;
cbtTomeChoices = function () { var r = tc.apply(this, arguments); return Array.isArray(r) ? r.filter(function (o) { return !(o && o.S && o.S.made); }) : r; };
}
})();
function ltfSpellOf(R) {
if (!R || R.ty !== "tome" || typeof CBT_MAGIC === "undefined")
return null;
var n = String(R.x.sp || R.n).replace(" ★", "").toLowerCase();
for (var i = 0; i < CBT_MAGIC.length; i++)
if (CBT_MAGIC[i].n.toLowerCase() === n && !CBT_MAGIC[i].w)
return CBT_MAGIC[i];
return null;
}
function ltfSpellKnown(R) { var S = ltfSpellOf(R); return !!(S && typeof cbtMagicKnows === "function" && cbtMagicKnows(S.id)); }
var LTF_GLOW = { l: null, until: 0 };
function ltfGlow(sec) { return __ZC(500, 6, this, arguments, new.target); }
setInterval(function () {
try {
if (typeof CBT !== "undefined" && CBT.buffs && CBT.buffs.light && CBT.buffs.light.until > CBT.t && LTF_GLOW.until < Date.now() + 2000)
ltfGlow(Math.max(3, CBT.buffs.light.until - CBT.t));
if (LTF_GLOW.l && LTF_GLOW.l.visible && Date.now() > LTF_GLOW.until)
LTF_GLOW.l.visible = false;
}
catch (e) { }
}, 1000);
function ltfMade(R, n) { return __ZC(500, 7, this, arguments, new.target); }
var LTF_DRINK = [
[/^strong healing/i, function () { return ltfHeal(120); }], [/^healing draught/i, function () { return ltfHeal(40); }],
[/stamina/i, function () { ltfBuff("regen", 30, 1); return "You can go on and on: a little vigour back every second for 30 seconds."; }],
[/flamel/i, function () { ltfHeal(60); ltfBuff("absorb", 600, 60); return "Flamel's elixir: 60 back, and a ward that soaks 60 for ten minutes."; }],
[/resistance|ward against|antivenom|purif|warmth|calm/i, function (R) { ltfBuff("wall", 300, 0.3); return dglEsc(R.n) + ": blows land softer for five minutes."; }],
[/keen eyes|night sight|true sight/i, function (R) { ltfBuff("might", 300, 0.1); ltfGlow(300); return dglEsc(R.n) + ": you see clearly and strike surer for five minutes."; }],
[/glow/i, function () { ltfGlow(600); return "You glow, lighting the dark round you for ten minutes."; }],
[/vanish/i, function () { ltfBuff("smoke", 20, 1); return "You vanish: foes lose you for 20 seconds."; }],
[/poison coating/i, function () { ltfBuff("might", 300, 0.15); return "Your blades drip with poison: a little harder for five minutes."; }],
[/grow draught/i, function () { ltfBuff("might", 60, 0.3); return "You grow huge: your blows land 30% harder for a minute."; }],
[/return-from-death/i, function () { ltfBuff("absorb", 900, 250); return "The charm holds you: it soaks the next 250 for fifteen minutes."; }],
[/fire bomb|discord|sleep powder|smoke bomb/i, function (R) { return ltfBomb(R); }],
[/./, function (R) { return dglEsc(R.n) + ": you drink it down. " + dglEsc(R.d) + "."; }]
];
function ltfHeal(n) { try {
if (typeof cbtHeal === "function")
cbtHeal(n);
}
catch (e) { } return "+" + n + " vigour."; }
function ltfBuff(b, sec, v) { try {
if (typeof CBT !== "undefined" && CBT.buffs)
CBT.buffs[b] = { until: (CBT.t || 0) + sec, v: v };
}
catch (e) { } }
function ltfBomb(R) { return __ZC(500, 8, this, arguments, new.target); }
function ltfUse(k) { return __ZC(500, 9, this, arguments, new.target); }
(function () {
if (typeof fgLoad === "function") {
var fl = fgLoad;
fgLoad = function () { var r = fl.apply(this, arguments); try {
Promise.resolve(r).then(function () { setTimeout(ltfSync, 300); });
}
catch (e) { } return r; };
}
setTimeout(function () { if (typeof signedIn === "function" && signedIn())
ltfLoadStock(); }, 20000);
})();
var LTF_RAR = [["Common", "#E6E0D4", 1], ["Uncommon", "#8FDCA4", 1.08], ["Rare", "#7AB0FF", 1.16], ["Epic", "#C89AFF", 1.25], ["Legendary", "#FFB45A", 1.35]];
var LTF_NAMES_M = [
["vamp", "Vampiric", 0, "Hits heal you a little"], ["blaze", "Blazing", 0, "+fire damage"], ["frozen", "Frozen", 0, "Hits slow"], ["thunder", "Thundering", 0, "Hits can chain"],
["venom", "Venomous", 0, "Hits poison"], ["swift", "Swift", 0, "Hits come quicker (+8% damage)"], ["brutal", "Brutal", 0, "Crits hit harder"], ["keen", "Keen", 0, "More crits"],
["ward", "Warding", 0, "Blows land softer"], ["holy", "Holy", 0, "+15% damage, more against the dead"], ["cursed", "Cursed", 0, "+30% damage, but blows land 10% harder on you"],
["echo", "Echoing", 0, "1 in 8 hits strike twice"], ["gild", "Gilded", 0, "More finds from beasts"], ["lucky", "Lucky", 0, "More finds from beasts"], ["ghost", "Ghostly", 0, "1 in 10 blows pass through you"],
["thorn", "Thorned", 0, "Hurts those who hit you"], ["fox", "of the Fox", 1, "Foes lose you sooner (1 in 12 blows miss)"], ["bear", "of the Bear", 1, "+life: blows land softer"],
["owl", "of the Owl", 1, "See in the dark"], ["hare", "of the Hare", 1, "Rolls cost less"], ["leech", "of the Leech", 1, "Mana back on hits"], ["mountain", "of the Mountain", 1, "Can't be knocked about (blows softer)"],
["tide", "of the Tide", 1, "Swim and breathe longer"], ["phoenix", "of the Phoenix", 1, "Burn all near when your life runs low"], ["magpie", "of the Magpie", 1, "More finds from beasts"],
["scholar", "of the Scholar", 1, "More combat experience"], ["echoes", "of Echoes", 1, "Spells cast twice 1 in 10"], ["moon", "of the Moon", 1, "Stronger at night"]
];
var LTF_NM = {};
LTF_NAMES_M.forEach(function (m) { LTF_NM[m[0]] = m; });
var LTF_GEMS = {
ruby: ["Ruby", "blaze", "bear", "str"], sapphire: ["Sapphire", "frozen", "mana", "spell"], emerald: ["Emerald", "venom", "ward", "lucky"], topaz: ["Topaz", "thunder", "gild", "hare"],
diamond: ["Diamond", "holy", "ward", "holy"], onyx: ["Onyx", "shadow", "fox", "fox"], moonstone: ["Moonstone", "moon", "moon", "moon"], drake_glass: ["Drake glass", "blaze", "ward", "blaze"],
void_shard: ["Void shard", "void", "ward", "void"], phoenix_ember: ["Phoenix ember", "blaze", "phoenix", "phoenix"]
};
var LTF_ENCH = { lm_flametongue: "blaze", lm_frostbite: "frozen", lm_thunderstrike: "thunder", lm_venomkiss: "venom", lm_voidedge: "void", lm_bloodfire: "vamp", lm_sunfire: "sun",
lm_tidepush: "push", lm_stoneskin: "stone", lm_featherfall: "feather", lm_silence: "fox" };
var LTF_SLOTS = [["head", "Head"], ["chest", "Chest"], ["hands", "Hands"], ["feet", "Feet"], ["back", "Back"], ["ring1", "Ring"], ["ring2", "Ring"], ["amulet", "Amulet"], ["bracelet", "Bracelet"],
["trinket", "Trinket"], ["gadget", "Gadget"], ["familiar", "Familiar"]];
function ltfD() {
var d = typeof store !== "undefined" && store ? store : {};
if (!d.ltf || typeof d.ltf !== "object")
d.ltf = {};
var L = d.ltf;
["roll", "wear", "sock", "ench"].forEach(function (k) { if (!L[k] || typeof L[k] !== "object")
L[k] = {}; });
return L;
}
function ltfSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function ltfSlotOf(R) { return __ZC(500, 10, this, arguments, new.target); }
function ltfTierOf(R) {
if (R.x && R.x.t)
return R.x.t;
var n = R.n.toLowerCase();
return /^dragon|phoenix|fleece/.test(n) ? 5 : /^starmetal|moonsilk|^space/.test(n) ? 4 : /^darksteel|firesilk|flame|shadow|drakkyn|kevlar|bullet/.test(n) ? 3 : /^steel|barrow|hunter|shell|bronze|tin/.test(n) ? 2 : R.lv >= 20 ? 3 : 1;
}
function ltfRollFor(R) { return __ZC(500, 11, this, arguments, new.target); }
function ltfRollName(k) { return __ZC(500, 12, this, arguments, new.target); }
function ltfRollHtml(k) {
var o = ltfD().roll[k], R = LTF_RB[k];
if (!o)
return dglEsc(ltfRollName(k));
var C = LTF_RAR[o.r] || LTF_RAR[0];
return "<span style='color:" + C[1] + "'>" + dglEsc(ltfRollName(k)) + "</span> <span class='dm'>(" + C[0] + (R && R.x && R.x.leg ? "" : "") + ")</span>";
}
(function () {
var mk = ltfMade;
ltfMade = function (R, n) {
var s = mk.apply(this, arguments), extra = "";
try {
var o = ltfRollFor(R);
if (o) {
var L = ltfD(), old = L.roll[R.k];
if (!old || o.r > old.r || (o.r === old.r && o.m.length > (old.m || []).length)) {
L.roll[R.k] = o;
ltfSave();
ltfRename(R.k);
var C = LTF_RAR[o.r];
extra = " <b style='color:" + C[1] + "'>" + C[0] + (o.m.length ? ": " + dglEsc(ltfRollName(R.k)) : "") + "</b>" + (o.s ? " · " + o.s + " socket" + (o.s > 1 ? "s" : "") : "") + ".";
}
else
extra = " (your " + LTF_RAR[old.r][0].toLowerCase() + " one is better: kept)";
var sl = ltfSlotOf(R);
if (sl && R.ty !== "weapon")
extra += " Wear it from What you made.";
}
}
catch (e) { }
return s + extra;
};
})();
function ltfRename(k) { try {
var id = LTF_ARMS[k];
if (id && BW_ARMS[id]) {
BW_ARMS[id].name = ltfRollName(k);
BW_ARMS[id].rar = (ltfD().roll[k] || {}).r || 0;
}
}
catch (e) { } }
setTimeout(function () { try {
Object.keys(ltfD().roll).forEach(ltfRename);
}
catch (e) { } }, 3000);
function ltfWorn() { var W = ltfD().wear, out = []; Object.keys(W).forEach(function (s) { var k = W[s]; if (k && LTF_RB[k] && ltfHave(k) > 0)
out.push({ slot: s, k: k, R: LTF_RB[k] }); }); return out; }
function ltfHeldMade() { try {
var W = cbtWeapon();
return W && W.A && W.A.made || null;
}
catch (e) {
return null;
} }
function ltfSetCount() { var c = {}; ltfWorn().forEach(function (w) { var s = w.R.x && w.R.x.set; if (s)
c[s] = (c[s] || 0) + 1; }); return c; }
var LTF_SET_KEY = { "The Drowned King's regalia": "drowned", "Forge-father's harness": "forge", "The Matriarch's silks": "silk", "Cantor's vestments": "cantor", "Raven's mourning": "raven",
"Heart of the Drakkyn": "drake", "Snow Queen's mantle": "snow", "Argonaut's kit": "argo", "Captain Nemo's diving suit": "nemo", "Tin Woodman's plate": "tin" };
function ltfStats() {
var now = Date.now();
if (LTF.st && now - LTF.stAt < 1500)
return LTF.st;
var S = { dmg: 0, tough: 0, crit: 0, critX: 0, mana: 0, fx: {}, pw: {}, set: {} }, L = ltfD();
function fx(k, v) { S.fx[k] = (S.fx[k] || 0) + (v || 1); }
function piece(k, asWeapon) {
var R = LTF_RB[k];
if (!R)
return;
var o = L.roll[k] || { r: 0, m: [] }, mult = LTF_RAR[o.r || 0][2];
if (!asWeapon) {
var sl = ltfSlotOf(R), t = ltfTierOf(R);
if (/^(head|chest|hands|feet|back)$/.test(sl || ""))
S.tough += ({ head: 0.012, chest: 0.022, hands: 0.01, feet: 0.01, back: 0.008 })[sl] * t * mult;
if (R.ty === "jewel") {
var m = /\(\+(\d+)\)/.exec(R.n), v = m ? +m[1] : 3;
if (/amulet/i.test(R.n))
S.mana += v * 4;
else
S.dmg += v / 100 * mult;
}
}
(o.m || []).forEach(function (q) { fx(q); });
(L.sock[k] || []).forEach(function (g) { var G = LTF_GEMS[g]; if (G)
fx(asWeapon ? G[1] : R.ty === "jewel" ? G[3] : G[2]); });
(L.ench[k] || []).forEach(function (e) { fx(LTF_ENCH[e] || e); });
if (R.x && R.x.pw)
S.pw[R.x.pw] = 1;
if (/ring of the deep|ring of breath/i.test(R.n))
fx("tide");
if (/moonstone ring/i.test(R.n))
fx("moon");
if (/tooth necklace/i.test(R.n))
fx("brutal");
if (/green spectacles/i.test(R.n))
fx("owl");
if (/raven quill brooch/i.test(R.n))
fx("echoes");
}
ltfWorn().forEach(function (w) { if (w.slot !== "gadget" && w.slot !== "familiar")
piece(w.k, false); });
var h = ltfHeldMade();
if (h)
piece(h, true);
var c = ltfSetCount();
Object.keys(c).forEach(function (n) { var key = LTF_SET_KEY[n]; if (key) {
if (c[n] >= 2)
S.set[key] = 2;
if (c[n] >= 4)
S.set[key] = 4;
} });
var F = S.fx;
S.dmg += 0.08 * (F.swift || 0) + 0.15 * (F.holy || 0) + 0.3 * (F.cursed || 0) + 0.12 * (F.blaze || 0) + 0.15 * (F.void || 0) + 0.1 * (F.shadow || 0) + 0.05 * (F.str || 0) + (F.moon && ltfNight() ? 0.15 * F.moon : 0);
S.crit += 0.05 * (F.keen || 0) + (S.set.raven ? 0.03 : 0);
S.critX += 0.3 * (F.brutal || 0);
S.tough += 0.05 * (F.ward || 0) + 0.04 * (F.bear || 0) + 0.04 * (F.mountain || 0) + 0.08 * (F.stone || 0) - 0.1 * (F.cursed || 0) + (S.set.forge || S.set.drake || S.set.snow ? 0.06 : 0) + (S.set.argo ? 0.06 : 0) + (S.set.tin ? 0.05 : 0);
S.mana += 20 * (F.mana || 0) + 15 * (F.spell || 0);
LTF.st = S;
LTF.stAt = now;
return S;
}
function ltfNight() { try {
if (typeof isNightNow === "function")
return !!isNightNow();
var h = new Date().getHours();
return h < 6 || h >= 20;
}
catch (e) {
return false;
} }
(function () {
if (typeof cbtOutMult === "function") {
var om = cbtOutMult;
cbtOutMult = function () {
var m = om.apply(this, arguments);
try {
var S = ltfStats(), h = ltfHeldMade(), o = h && ltfD().roll[h];
m *= 1 + S.dmg;
if (o)
m *= LTF_RAR[o.r || 0][2];
}
catch (e) { }
return m;
};
}
if (typeof cbtCritChance === "function") {
var cc = cbtCritChance;
cbtCritChance = function () { var c = cc.apply(this, arguments); try {
c += ltfStats().crit;
}
catch (e) { } return Math.min(0.6, c); };
}
if (typeof cbtToughBase === "function") {
var tb = cbtToughBase;
cbtToughBase = function () { var t = tb.apply(this, arguments); try {
t += Math.min(0.35, ltfStats().tough);
}
catch (e) { } return Math.max(0, t); };
}
if (typeof cbtManaMax === "function") {
var mm = cbtManaMax;
cbtManaMax = function () { var v = mm.apply(this, arguments); try {
v += ltfStats().mana;
}
catch (e) { } return Math.round(v); };
}
if (typeof cbtRoll === "function") {
var rl = cbtRoll;
cbtRoll = function (mult, sure) { var r = rl.apply(this, arguments); try {
ltfOnBlow(r);
}
catch (e) { } return r; };
}
if (typeof cbtHarm === "function") {
var hm = cbtHarm;
cbtHarm = function (d) {
try {
var F = ltfStats().fx;
if (CBT.on && d > 0 && ((F.ghost && Math.random() < 0.1 * F.ghost) || (F.fox && Math.random() < 0.08 * F.fox) || (ltfStats().pw.signet && ltfCd("bats", 10)))) {
cbtFloatText(ltfStats().pw.signet ? "🦇 Bats!" : "Missed you", null, "#C8E0FF", 0.7);
return 0;
}
}
catch (e) { }
var out = hm.apply(this, arguments);
try {
ltfOnHurt(out);
}
catch (e) { }
return out;
};
}
if (typeof cbtKilled === "function") {
var kl = cbtKilled;
cbtKilled = function (o) { var r = kl.apply(this, arguments); try {
ltfOnKill(o || {});
}
catch (e) { } return r; };
window.cbtKilled = cbtKilled;
}
if (typeof cbtSpell === "function") {
var sp = cbtSpell;
cbtSpell = function (i) {
var r = sp.apply(this, arguments);
try {
if (r && CBT.on) {
var S = ltfStats();
if (S.fx.echoes && Math.random() < 0.1 * S.fx.echoes && ltfCd("echo", 3)) {
CBT.cd = {};
setTimeout(function () { try {
CBT.mana += 40;
sp(i);
}
catch (e) { } }, 350);
cbtFloatText("Echo!", null, "#D8C8FF", 0.7);
}
if (S.set.cantor === 4)
ltfCast({ t: "around", m: 0.3, rad: 6, stun: 1.2, elem: "storm" });
}
}
catch (e) { }
return r;
};
}
if (typeof cbtGain === "function") {
var gn = cbtGain;
cbtGain = function (xp, why) { try {
var F = ltfStats().fx;
if (F.scholar)
xp *= 1 + 0.1 * F.scholar;
}
catch (e) { } return gn.call(this, xp, why); };
}
})();
var LTF_CD = {};
function ltfCd(k, sec) { var t = Date.now(); if (LTF_CD[k] && t < LTF_CD[k])
return false; LTF_CD[k] = t + sec * 1000; return true; }
function ltfCast(A, near) { return __ZC(500, 13, this, arguments, new.target); }
function ltfOnBlow(r) { return __ZC(500, 14, this, arguments, new.target); }
function ltfOnHurt(d) { return __ZC(500, 15, this, arguments, new.target); }
function ltfOnKill(o) { return __ZC(500, 16, this, arguments, new.target); }
setInterval(function () {
try {
if (typeof CBT === "undefined" || !CBT.on)
return;
var S = ltfStats(), p = S.pw, fam = ltfD().wear.familiar;
if (typeof cbtFoes === "function" && !cbtFoes(20).length)
return;
if (p.shadow && ltfCd("shadow", 6))
ltfCast({ t: "zone", m: 0.6, rad: 2, ticks: 3, gap: 0.5, elem: "shadow" });
if (p.hourglass && ltfCd("hourglass", 120)) {
ltfCast({ t: "around", m: 0.1, rad: 14, stun: 4, elem: "light" });
cbtFloatText("⏳ Time stops", null, "#E0D8FF", 1.2);
}
if (S.set.argo === 4 || S.set.tin === 4) {
var V = cbtVig();
cbtHeal(Math.max(1, Math.round(V.max * 0.01)));
}
if (fam === "lm_raven_familiar" && ltfCd("fam", 5))
ltfCast({ t: "zone", m: 0.4, rad: 2, ticks: 1, elem: "shadow" });
if (fam === "lm_bone_hound" && ltfCd("fam", 5))
ltfCast({ t: "zone", m: 0.5, rad: 2, ticks: 1, bleed: 2, elem: "shadow" });
if (fam === "lm_baby_drake" && ltfCd("fam", 6))
ltfCast({ t: "shot", m: 1, spd: 30, dot: { dps: 0.15, t: 3 }, elem: "fire" });
if (fam === "lm_clockwork_owl" && ltfCd("fam", 8))
ltfCast({ t: "shot", m: 0.6, spd: 60, stun: 0.6, elem: "storm" });
if (fam === "lm_cheshire_kitten" && ltfCd("fam", 9))
ltfCast({ t: "zone", m: 0.3, rad: 2, ticks: 1, slow: 2, elem: "shadow" });
if ((fam === "lm_pixie" || fam === "lm_tide_sprite") && ltfCd("fam", 3))
cbtHeal(2);
}
catch (e) { }
}, 1000);
var LTF_FAM = { m: null, k: null, t: 0 };
var LTF_FAM_COL = { lm_ember_wisp: 0xFF8A2A, lm_raven_familiar: 0x5A4A7A, lm_clockwork_owl: 0xD8B060, lm_pixie: 0xB8FFE0, lm_baby_drake: 0xFF5A3A, lm_cheshire_kitten: 0xD080FF, lm_bone_hound: 0xE8E0C8, lm_tide_sprite: 0x5AC8FF };
setInterval(function () {
try {
if (typeof THREE === "undefined" || typeof scene === "undefined" || typeof camera === "undefined")
return;
var k = ltfD().wear.familiar;
if (k && ltfHave(k) <= 0)
k = null;
if (LTF_FAM.k !== k) {
if (LTF_FAM.m && LTF_FAM.m.parent)
LTF_FAM.m.parent.remove(LTF_FAM.m);
LTF_FAM.m = null;
LTF_FAM.k = k;
if (k) {
var c = LTF_FAM_COL[k] || 0xFFE7B0, g = new THREE.Group(), b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), new THREE.MeshBasicMaterial({ color: c }));
var h = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.22, depthWrite: false }));
g.add(b);
g.add(h);
var l = new THREE.PointLight(c, 0.6, 4, 2);
g.add(l);
scene.add(g);
LTF_FAM.m = g;
}
}
if (LTF_FAM.m) {
LTF_FAM.t += 0.1;
var P = camera.position, a = (typeof yaw !== "undefined" ? yaw : 0) + 0.9;
LTF_FAM.m.position.set(P.x + Math.sin(a) * -0.7, P.y - 0.15 + Math.sin(LTF_FAM.t * 2) * 0.08, P.z + Math.cos(a) * -0.7);
}
}
catch (e) { }
}, 50);
function ltfGadget() { return __ZC(500, 17, this, arguments, new.target); }
(function () {
if (typeof addEventListener !== "function")
return;
addEventListener("keydown", function (e) {
try {
if (e.code !== "KeyG" || e.repeat || e.ctrlKey || e.metaKey || e.altKey)
return;
var t = e.target && e.target.tagName;
if (/INPUT|TEXTAREA|SELECT/.test(t || "") || e.target && e.target.isContentEditable)
return;
if (!ltfD().wear.gadget)
return;
ltfGadget();
}
catch (x) { }
});
var b = null;
setInterval(function () {
try {
if (!document.body)
return;
var k = ltfD().wear.gadget, on = !!(k && ltfHave(k) > 0 && typeof walkMode !== "undefined" && walkMode);
if (!b) {
b = document.createElement("button");
b.id = "ltf-gadget";
b.title = "Your gadget (G)";
b.style.cssText = "position:fixed;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:46;width:52px;height:52px;border-radius:50%;border:1px solid #C9A868;background:rgba(24,16,10,.85);padding:6px;display:none";
b.onclick = function (e) { e.stopPropagation(); ltfGadget(); };
document.body.appendChild(b);
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ltf-gadget"] = 1;
}
if (on) {
if (b.getAttribute("data-k") !== k) {
b.setAttribute("data-k", k);
b.innerHTML = ltfIcon(k, 38);
}
b.style.display = "block";
}
else
b.style.display = "none";
}
catch (e) { }
}, 800);
})();
(function () { var bf = ltfBuff; ltfBuff = function (b, sec, v) { try {
if (ltfStats().pw.stone)
sec *= 2;
}
catch (e) { } return bf(b, sec, v); }; })();
(function () { var bf = ltfBuff; ltfBuff = function (b, sec, v) { if (b === "absorb" && typeof CBT !== "undefined") {
CBT.absorb = v;
CBT.absorbT = (CBT.t || 0) + sec;
return;
} return bf(b, sec, v); }; })();
setInterval(function () { try {
var S = ltfStats();
if ((S.pw.lantern || S.pw.specs || S.fx.owl || S.set.drake) && LTF_GLOW.until < Date.now() + 3000)
ltfGlow(30);
}
catch (e) { } }, 5000);
function ltfGemsHave() { var out = []; Object.keys(LTF_GEMS).forEach(function (g) { var ks = ["lt_cut_" + g, "lm_cut_" + g, "lt_" + g, "lm_" + g]; ks.forEach(function (k) { if (ltfHave(k) > 0 && out.every(function (o) { return o.k !== k; }))
out.push({ g: g, k: k }); }); }); return out; }
function ltfEnchHave() { return Object.keys(LTF_ENCH).concat(["lm_elder_twin_rune"]).filter(function (k) { return ltfHave(k) > 0 && k !== "lm_elder_twin_rune"; }); }
function ltfSockets(k) { var o = ltfD().roll[k] || { s: 0 }; return Math.min(3, (o.s || 0) + (o.p || 0)); }
function ltfGearRow(R) { return __ZC(500, 18, this, arguments, new.target); }
(function () {
var yo = ltfYours;
ltfYours = function () {
var L = ltfD(), h = "<div class='s'>Worn and carried</div><div class='dm'>" + LTF_SLOTS.map(function (s) {
var w = s[0] === "ring1" || s[0] === "ring2" ? L.wear[s[0]] : L.wear[s[0]];
return "<span class='nd'>" + s[1] + ": " + (w && ltfHave(w) > 0 ? ltfIcon(w, 22) + " " + ltfRollHtml(w) : "<span style='opacity:.5'>none</span>") + "</span>";
}).join("") + "</div>";
var any = false;
LTF_BOOK.forEach(function (S) {
S[1].forEach(function (r) {
var R = LTF_RB[r[0]], n = ltfHave(R.k);
if (!n || R.ty === "mat" || R.ty === "tome" || R.ty === "draught" || R.ty === "ammo" || R.ty === "ench")
return;
var slot = ltfSlotOf(R);
if (R.ty !== "weapon" && !slot)
return;
any = true;
var G = ltfGearRow(R);
h += "<div class='r'><div class='p'>" + ltfIcon(R.k, 48) + "</div><div class='m'><div class='n'>" + ltfRollHtml(R.k) + (G.worn ? " <span class='dm'>· worn</span>" : "") + " <span class='dm'>× " + n + "</span></div><div class='dm'>" + dglEsc(R.d) + "</div>" + G.h + "</div><div style='display:flex;flex-direction:column;gap:4px;align-items:flex-end;max-width:200px'>" + (G.act || (R.ty === "weapon" ? "<span class='dm'>Held from your 🎒 Backpack</span>" : "")) + "</div></div>";
});
});
var rest = yo.apply(this, arguments);
return h + (any ? "" : "<p class='dm'>Nothing to wear yet.</p>") + "<div class='s'>Spells, draughts, bombs and the rest</div>" + rest;
};
var le = ltfEl;
ltfEl = function () {
var fresh = !LTFB.el, el = le.apply(this, arguments);
if (fresh) {
el.addEventListener("click", function (e) { var t = e.target.closest && e.target.closest("[data-lt2]"); if (!t || t.tagName === "SELECT")
return; e.stopPropagation(); ltfGearDo(t.getAttribute("data-lt2"), t.getAttribute("data-v")); });
el.addEventListener("change", function (e) { var t = e.target; if (!t.getAttribute || !t.getAttribute("data-lt2") || !t.value)
return; ltfGearDo(t.getAttribute("data-lt2"), t.getAttribute("data-v") + "|" + t.value); });
}
return el;
};
})();
function ltfGearDo(a, v) { return __ZC(500, 19, this, arguments, new.target); }
