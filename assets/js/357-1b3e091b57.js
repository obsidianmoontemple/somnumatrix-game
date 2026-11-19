/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var HND_KEY = "guildlands";
var HND_MAX = 60, HND_TIERS = [1, 12, 24, 36, 48];
function hndXpFor(L) { return L <= 1 ? 0 : Math.floor(20 * Math.pow(L - 1, 2.2)); }
function hndLevelOf(xp) { var L = Math.max(1, Math.min(HND_MAX, Math.floor(Math.pow(Math.max(0, xp) / 20, 1 / 2.2)) + 1)); while (L < HND_MAX && hndXpFor(L + 1) <= xp)
L++; while (L > 1 && hndXpFor(L) > xp)
L--; return L; }
var HND_SKILLS = [
{ k: "wood", name: "Woodcutting", icon: "🪓", gather: true, col: "#5E8A3A", tool: "axe", tools: "Axes",
about: "Felling trees for their logs: birch, oak, maple, yew and ironbark in the Guildlands, and timber, driftwood and fallen pines in every world." },
{ k: "mine", name: "Mining", icon: "⛏️", gather: true, col: "#7A6A5A", tool: "pickaxe", tools: "Pickaxes",
about: "Ore, coal, stone and gems: iron and coal, silver, gold, moonsilver and starstone at Hollowfell, and every vein, seam and crystal in every world." },
{ k: "fish", name: "Fishing", icon: "🎣", gather: true, col: "#3A7AA8", tool: "rod", tools: "Rods",
about: "Trout, pike, salmon, sea bass and swordfish in the Guildlands, and the fish, pearls and shells of every sea and lake." },
{ k: "forage", name: "Foraging", icon: "🌿", gather: true, col: "#6AA84A", tool: "satchel", tools: "Forager's satchels",
about: "Herbs, berries and mushrooms: thyme, sage, feverfew, moonpetal and starbloom, and every plant, moss and cap in every world." },
{ k: "hunt", name: "Hunting", icon: "🏹", gather: true, col: "#8A5A3A", tool: "snares", tools: "Snare kits",
about: "Snares and tracking: rabbit, pheasant, deer, boar and elk for meat and hides, and feathers, scales and hides wherever they are found." },
{ k: "smith", name: "Smithing", icon: "⚒️", col: "#A85A3A",
about: "Weapons, armour and smelting at every forge, the Guild's bars of silver, gold, moonsilver and starstone, and the better axes and pickaxes." },
{ k: "join", name: "Woodworking", icon: "🪚", col: "#A8803A",
about: "Bows, staves, carts and brooms at every joinery, sawing logs into seasoned hardwood, and the better fishing rods." },
{ k: "tailor", name: "Tailoring", icon: "🧵", col: "#8A4A8A",
about: "Tanning leather, and the better forager's satchels and snare kits from leather, canvas and wire." },
{ k: "engine", name: "Engineering", icon: "🔧", col: "#5A6A7A",
about: "Cars, motorbikes, lorries, hovercars, war machines, firearms and machine parts at the Transport Yard and the Motor Pool." },
{ k: "cook", name: "Cooking", icon: "🍳", col: "#C8783A",
about: "Dishes from what you catch, snare and forage. Eating one fills your Food bar and makes you Well fed: you learn every craft faster for a while." },
{ k: "alch", name: "Alchemy", icon: "⚗️", col: "#4A8A7A",
about: "Draughts from herbs: more from every gather, steadier hands at the forge, keener eyes for rare finds, quicker learning." },
{ k: "jewel", name: "Jewelcrafting", icon: "💍", col: "#3A5AA8",
about: "Cutting gems, and rings and bracelets that raise the level of a craft while you hold them." }
];
var HND_BY = {};
HND_SKILLS.forEach(function (S) { HND_BY[S.k] = S; });
var HND_GATHER = ["wood", "mine", "fish", "forage", "hunt"], HND_MAKING = ["smith", "join", "tailor", "engine", "cook", "alch", "jewel"];
var HND_TOOL_TIERS = [["iron", "Iron", 1, 40], ["steel", "Steel", 12, 220], ["dark", "Darksteel", 24, 900], ["star", "Starmetal", 36, null], ["dream", "Dreamforged", 48, null]];
var HND_TOOL_NAME = { wood: "axe", mine: "pickaxe", fish: "fishing rod", forage: "forager's satchel", hunt: "snare kit" };
var HND_TOOL_ICON = { wood: "🪓", mine: "⛏️", fish: "🎣", forage: "👜", hunt: "🪤" };
var HND_BOOST = [3, 5, 7, 10];
var HND_MATS = [
["sk_log1", "Birch logs", "🪵", 2, "Woodcutting 1"], ["sk_log2", "Oak logs", "🪵", 4, "Woodcutting 12"], ["sk_log3", "Maple logs", "🪵", 7, "Woodcutting 24"],
["sk_log4", "Yew logs", "🪵", 11, "Woodcutting 36"], ["sk_log5", "Ironbark logs", "🪵", 16, "Woodcutting 48"],
["sk_ore2", "Silver ore", "🪨", 5, "Mining 12"], ["sk_ore3", "Gold ore", "🪨", 8, "Mining 24"], ["sk_ore4", "Moonsilver ore", "🪨", 12, "Mining 36"], ["sk_ore5", "Starstone", "🪨", 18, "Mining 48"],
["sk_gem1", "Rough quartz", "💎", 3, "found mining"], ["sk_gem2", "Rough garnet", "💎", 6, "found mining"], ["sk_gem3", "Rough sapphire", "💎", 10, "found mining"],
["sk_gem4", "Rough emerald", "💎", 15, "found mining"], ["sk_gem5", "Rough ruby", "💎", 22, "found mining"],
["sk_cut1", "Cut quartz", "💎", 8, "Jewelcrafting 1"], ["sk_cut2", "Cut garnet", "💎", 15, "Jewelcrafting 12"], ["sk_cut3", "Cut sapphire", "💎", 25, "Jewelcrafting 24"],
["sk_cut4", "Cut emerald", "💎", 38, "Jewelcrafting 36"], ["sk_cut5", "Cut ruby", "💎", 55, "Jewelcrafting 48"],
["sk_bar2", "Silver bar", "🥈", 14, "Smithing 12"], ["sk_bar3", "Gold bar", "🥇", 22, "Smithing 24"], ["sk_bar4", "Moonsilver bar", "🌙", 34, "Smithing 36"], ["sk_bar5", "Starstone bar", "⭐", 50, "Smithing 48"],
["sk_fish1", "Trout", "🐟", 2, "Fishing 1"], ["sk_fish2", "Pike", "🐟", 4, "Fishing 12"], ["sk_fish3", "Salmon", "🐟", 7, "Fishing 24"], ["sk_fish4", "Sea bass", "🐟", 10, "Fishing 36"], ["sk_fish5", "Swordfish", "🐟", 15, "Fishing 48"],
["sk_herb1", "Thyme", "🌿", 2, "Foraging 1"], ["sk_herb2", "Sage", "🌿", 4, "Foraging 12"], ["sk_herb3", "Feverfew", "🌼", 7, "Foraging 24"], ["sk_herb4", "Moonpetal", "🌸", 11, "Foraging 36"], ["sk_herb5", "Starbloom", "✨", 16, "Foraging 48"],
["sk_berry", "Bramble berries", "🫐", 1, "Foraging 1"], ["sk_mush", "Field mushrooms", "🍄", 3, "Foraging 12"],
["sk_meat1", "Rabbit", "🍖", 2, "Hunting 1"], ["sk_meat2", "Pheasant", "🍗", 4, "Hunting 12"], ["sk_meat3", "Venison", "🍖", 7, "Hunting 24"], ["sk_meat4", "Boar", "🍖", 10, "Hunting 36"], ["sk_meat5", "Elk", "🍖", 15, "Hunting 48"],
["sk_r_burl", "Dreamheart burl", "🌰", 30, "rare find, woodcutting"], ["sk_r_pearl", "Moonpearl", "🦪", 30, "rare find, fishing"],
["sk_r_clover", "Dreamer's clover", "🍀", 30, "rare find, foraging"], ["sk_r_antler", "Silverwhite antler", "🦌", 30, "rare find, hunting"]
];
var HND_RARE = { wood: "sk_r_burl", mine: "cr_crystal", fish: "sk_r_pearl", forage: "sk_r_clover", hunt: "sk_r_antler" };
var HND_DISHES = [
["sk_d1", "Grilled trout", 1, 20, 10, 15, 5], ["sk_d2", "Berry tart", 6, 15, 10, 15, 5], ["sk_d3", "Roast pheasant with thyme", 12, 30, 15, 15, 10],
["sk_d4", "Pike and mushroom pie", 18, 35, 15, 15, 13], ["sk_d5", "Salmon with sage", 24, 40, 20, 15, 17], ["sk_d6", "Venison stew", 30, 50, 20, 15, 21],
["sk_d7", "Sea bass with thyme", 36, 55, 25, 15, 25], ["sk_d8", "Boar roast with brambles", 42, 60, 25, 15, 28], ["sk_d9", "Swordfish steak", 48, 70, 30, 15, 34],
["sk_d10", "The elk feast", 54, 85, 40, 25, 45]
];
var HND_DRAUGHTS = [
["sk_p1", "Draught of Plenty", 1, ["plenty"], 15, 6, "one more of whatever you gather, every time"],
["sk_p2", "Draught of Steady Hands", 12, ["steady"], 20, 12, "ten points more on the hammer score at any forge"],
["sk_p3", "Draught of Keen Eyes", 24, ["keen"], 20, 20, "rare finds twice as likely"],
["sk_p4", "Draught of Insight", 36, ["insight"], 20, 28, "thirty in a hundred more XP in every craft"],
["sk_p5", "Elixir of the Masters", 48, ["plenty", "steady", "keen", "insight"], 20, 60, "all four draughts at once"]
];
var HND_NODES = {
wood: [
{ kind: "sk_log1", lo: 2, hi: 4, rg: 10, xp: 30, name: "A birch", verb: "fell the birch" },
{ kind: "sk_log2", lo: 2, hi: 4, rg: 14, xp: 55, name: "An oak", verb: "fell the oak" },
{ kind: "sk_log3", lo: 2, hi: 3, rg: 18, xp: 85, name: "A maple", verb: "fell the maple" },
{ kind: "sk_log4", lo: 1, hi: 3, rg: 24, xp: 120, name: "A yew", verb: "fell the yew" },
{ kind: "sk_log5", lo: 1, hi: 2, rg: 30, xp: 165, name: "An ironbark", verb: "fell the ironbark" }
],
mine: [
{ kind: "cr_ore", alt: "cr_coal", lo: 2, hi: 4, rg: 10, xp: 30, also: ["sk_gem1", 1, 0.15], name: "Iron rock", altName: "A coal seam", verb: "mine the rock" },
{ kind: "sk_ore2", lo: 1, hi: 3, rg: 14, xp: 55, also: ["sk_gem2", 1, 0.12], name: "Silver rock", verb: "mine the silver" },
{ kind: "sk_ore3", lo: 1, hi: 3, rg: 18, xp: 85, also: ["sk_gem3", 1, 0.10], name: "Gold rock", verb: "mine the gold" },
{ kind: "sk_ore4", lo: 1, hi: 2, rg: 24, xp: 120, also: ["sk_gem4", 1, 0.08], name: "Moonsilver rock", verb: "mine the moonsilver" },
{ kind: "sk_ore5", lo: 1, hi: 2, rg: 30, xp: 165, also: ["sk_gem5", 1, 0.06], name: "Starstone rock", verb: "mine the starstone" }
],
fish: [
{ kind: "sk_fish1", lo: 1, hi: 3, rg: 8, xp: 30, name: "Trout in the river", verb: "cast for trout" },
{ kind: "sk_fish2", lo: 1, hi: 3, rg: 12, xp: 55, name: "Pike in the lake", verb: "cast for pike" },
{ kind: "sk_fish3", lo: 1, hi: 2, rg: 16, xp: 85, name: "Salmon at the falls", verb: "cast for salmon" },
{ kind: "sk_fish4", lo: 1, hi: 2, rg: 22, xp: 120, also: ["hx_pearl", 1, 0.04], name: "Sea bass off the rocks", verb: "cast for sea bass" },
{ kind: "sk_fish5", lo: 1, hi: 2, rg: 28, xp: 165, also: ["hx_pearl", 1, 0.06], name: "Swordfish off the pier's end", verb: "fight a swordfish in" }
],
forage: [
{ kind: "sk_herb1", alt: "sk_berry", lo: 2, hi: 4, rg: 8, xp: 30, name: "A patch of thyme", altName: "Brambles", verb: "gather" },
{ kind: "sk_herb2", alt: "sk_mush", lo: 2, hi: 3, rg: 12, xp: 55, name: "Wild sage", altName: "A mushroom ring", verb: "gather" },
{ kind: "sk_herb3", lo: 1, hi: 3, rg: 16, xp: 85, name: "Feverfew", verb: "gather the feverfew" },
{ kind: "sk_herb4", lo: 1, hi: 2, rg: 22, xp: 120, name: "Moonpetal", verb: "gather the moonpetal" },
{ kind: "sk_herb5", lo: 1, hi: 2, rg: 28, xp: 165, name: "Starbloom", verb: "gather the starbloom" }
],
hunt: [
{ kind: "sk_meat1", lo: 1, hi: 2, rg: 10, xp: 30, also: ["cr_hide", 1, 0.5], name: "A rabbit warren", verb: "set and check a snare at" },
{ kind: "sk_meat2", lo: 1, hi: 2, rg: 14, xp: 55, also: ["hx_feather", 1, 0.6], name: "Pheasant cover", verb: "flush and snare a pheasant in" },
{ kind: "sk_meat3", lo: 1, hi: 2, rg: 18, xp: 85, also: ["cr_hide", 1, 1], name: "A deer trail", verb: "track and snare a deer on" },
{ kind: "sk_meat4", lo: 1, hi: 2, rg: 24, xp: 120, also: ["cr_hide", 1, 1], name: "A boar wallow", verb: "trap a boar at" },
{ kind: "sk_meat5", lo: 1, hi: 2, rg: 30, xp: 165, also: ["cr_hide", 2, 1], name: "Elk on the moor", verb: "track and snare an elk on" }
]
};
var HND_NODE_N = [8, 7, 6, 5, 4];
function hndSpotId(s, t, i) { return "sk_" + s + "_" + (t + 1) + "_" + (i + 1); }
function hndNodeKind(s, t, i) { var N = HND_NODES[s][t]; return N.alt && i % 2 === 1 ? N.alt : N.kind; }
var HND_RECIPES = [];
(function () {
function R(key, sk, lvl, label, need, makes, n, xp, st) { HND_RECIPES.push({ key: key, sk: sk, lvl: lvl, label: label, need: need, makes: makes, n: n, xp: xp, st: st }); }
var cook = [{ sk_fish1: 1 }, { sk_berry: 3 }, { sk_meat2: 1, sk_herb1: 1 }, { sk_fish2: 1, sk_mush: 2 }, { sk_fish3: 1, sk_herb2: 1 }, { sk_meat3: 1, sk_herb2: 1, sk_mush: 1 },
{ sk_fish4: 1, sk_herb1: 2 }, { sk_meat4: 1, sk_berry: 2 }, { sk_fish5: 1, sk_herb3: 1 }, { sk_meat5: 1, sk_herb5: 1, sk_berry: 2, sk_mush: 1 }], cxp = [30, 40, 60, 70, 95, 110, 130, 150, 175, 220];
HND_DISHES.forEach(function (D, i) { R("ck" + (i + 1), "cook", D[2], D[1], cook[i], D[0], 1, cxp[i], "kitchen"); });
var al = [{ sk_herb1: 2, cr_glass: 1 }, { sk_herb2: 2, cr_glass: 1 }, { sk_herb3: 2, sk_mush: 1, cr_glass: 1 }, { sk_herb4: 2, cr_glass: 1 }, { sk_herb5: 2, sk_herb4: 1, sk_r_clover: 1, cr_glass: 1 }], axp = [35, 65, 100, 135, 220];
HND_DRAUGHTS.forEach(function (D, i) { R("al" + (i + 1), "alch", D[2], D[1], al[i], D[0], 1, axp[i], "apoth"); });
var gem = ["quartz", "garnet", "sapphire", "emerald", "ruby"], jxp = [25, 50, 80, 115, 160];
gem.forEach(function (g, i) { var o = {}; o["sk_gem" + (i + 1)] = 1; R("jc" + (i + 1), "jewel", HND_TIERS[i], "Cut a " + g, o, "sk_cut" + (i + 1), 1, jxp[i], "jewel"); });
var metal = ["Silver", "Gold", "Moonsilver", "Starstone"], rxp = [70, 110, 150, 200];
metal.forEach(function (m, r) {
HND_GATHER.forEach(function (s) {
var o = {};
o["sk_bar" + (r + 2)] = 1;
o["sk_cut" + (r + 2)] = 1;
R("jr_" + s + "_" + (r + 1), "jewel", HND_TIERS[r + 1], m + " ring of " + HND_BY[s].name + " (+" + HND_BOOST[r] + ")", o, "sk_ring_" + s + "_" + (r + 1), 1, rxp[r], "jewel");
});
var b = {};
b["sk_bar" + (r + 2)] = 2;
b["sk_cut" + (r + 2)] = 1;
R("jb" + (r + 1), "jewel", HND_TIERS[r + 1], m + " Artisan's bracelet (+" + HND_BOOST[r] + ")", b, "sk_brace_" + (r + 1), 1, rxp[r] + 20, "jewel");
});
[["Silver", { sk_ore2: 2, cr_coal: 1 }, 40], ["Gold", { sk_ore3: 2, cr_coal: 1 }, 70], ["Moonsilver", { sk_ore4: 2, cr_coal: 2 }, 100], ["Starstone", { sk_ore5: 2, cr_coal: 2 }, 140]].forEach(function (b, i) {
R("sm" + (i + 2), "smith", HND_TIERS[i + 1], "Smelt a " + b[0].toLowerCase() + " bar", b[1], "sk_bar" + (i + 2), 1, b[2], "smelter");
});
[[{ sk_log1: 2 }, 1, 15], [{ sk_log2: 1 }, 1, 30], [{ sk_log3: 1 }, 2, 50], [{ sk_log4: 1 }, 3, 75], [{ sk_log5: 1 }, 4, 100]].forEach(function (w, i) {
R("ww" + (i + 1), "join", HND_TIERS[i], "Saw " + ["birch", "oak", "maple", "yew", "ironbark"][i] + " into seasoned hardwood", w[0], "cr_wood", w[1], w[2], "sawpit");
});
var maker = { wood: "smith", mine: "smith", fish: "join", forage: "tailor", hunt: "tailor" }, st = { smith: "toolsmith", join: "rodbench", tailor: "tailorbench" };
var tneed = {
wood: [{ cr_steel: 2, sk_log1: 2 }, { cr_steel: 2, cr_ember: 1, sk_log2: 1 }, { sk_bar4: 2, cr_steel: 1, cr_crystal: 1, sk_log3: 1 }, { sk_bar5: 2, cr_steel: 2, sk_r_burl: 1, sk_log4: 1 }],
mine: [{ cr_steel: 3, sk_log1: 1 }, { cr_steel: 2, cr_ember: 1, sk_log2: 1 }, { sk_bar4: 2, cr_steel: 1, cr_crystal: 1, sk_log3: 1 }, { sk_bar5: 2, cr_steel: 2, cr_crystal: 2, sk_log4: 1 }],
fish: [{ sk_log2: 2, cr_cloth: 1, cr_steel: 1 }, { sk_log3: 2, cr_cloth: 1, sk_bar2: 1 }, { sk_log4: 2, cr_cloth: 1, sk_bar4: 1, cr_crystal: 1 }, { sk_log5: 2, cr_cloth: 1, sk_bar5: 1, sk_r_pearl: 1 }],
forage: [{ cr_leather: 2, cr_cloth: 1, cr_steel: 1 }, { cr_leather: 2, cr_cloth: 2, sk_bar2: 1 }, { cr_leather: 2, cr_cloth: 2, sk_bar4: 1, cr_crystal: 1 }, { cr_leather: 3, cr_cloth: 2, sk_bar5: 1, sk_r_clover: 1 }],
hunt: [{ cr_leather: 2, cr_steel: 1 }, { cr_leather: 2, sk_bar2: 1, cr_ember: 1 }, { cr_leather: 2, sk_bar4: 1, cr_crystal: 1 }, { cr_leather: 2, sk_bar5: 1, sk_r_antler: 1 }]
};
var txp = [60, 100, 180, 260];
HND_GATHER.forEach(function (s) {
for (var t = 1; t < 5; t++) {
var T = HND_TOOL_TIERS[t], who = maker[s];
R("tl_" + s + "_" + (t + 1), who, T[2], T[1] + " " + HND_TOOL_NAME[s], tneed[s][t - 1], "sk_t_" + s + "_" + (t + 1), 1, txp[t - 1], st[who]);
}
});
})();
var HND_RECIPE = {};
HND_RECIPES.forEach(function (r) { HND_RECIPE[r.key] = r; });
var HND_STATIONS = {
kitchen: { name: "The Guild kitchen", sk: "cook" }, apoth: { name: "The Apothecary's bench", sk: "alch" }, jewel: { name: "The Jeweller's bench", sk: "jewel" },
smelter: { name: "The smelter", sk: "smith" }, toolsmith: { name: "The Toolsmith's anvil", sk: "smith" }, sawpit: { name: "The sawpit", sk: "join" },
rodbench: { name: "The rod-maker's bench", sk: "join" }, tailorbench: { name: "The Tanner's and Weaver's bench", sk: "tailor" }
};
var HND_KIND_RULES = [
["wood", "^sk_log|^sk_r_burl$|^cr_wood$|^hx_pine$|_timber|_wood$|drift"],
["mine", "^sk_ore|^sk_gem|^cr_(ore|coal|ember|crystal|scrap)$|^hx_(deepsilver|deepgem|runestone|amberlith|salt|ice)$|^ss_(brass|bronze)|basalt|anorth|ilmenite|regolith|nife|chondrite|ore$|stone$|_rock"],
["fish", "^sk_fish|^sk_r_pearl$|fish|tunny|^hx_(pearl|shell|sponge)$|^ss_(lanterncod|nightpearl|eelscale)$|cod$|pearl"],
["hunt", "^sk_meat|^sk_r_antler$|^cr_hide$|^hx_(feather|lizardscale)$|^ss_wyrmscale$|feather|hide|scale$"]
];
function hndSkillOfKind(k) {
if (!k)
return null;
for (var i = 0; i < HND_KIND_RULES.length; i++)
if (new RegExp(HND_KIND_RULES[i][1]).test(k))
return HND_KIND_RULES[i][0];
return "forage";
}
var HNDP = { me: null, at: 0, missing: false, busy: false, feedEl: null, feedT: null, picked: {}, stock: {}, confirmLeave: false };
function hndSigned() { return typeof signedIn === "function" && signedIn(); }
function hndKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function hndJoined() { return !!(HNDP.me && HNDP.me.joined); }
function hndMissingErr(e) { var m = String((e && e.message) || e || ""); return /skill_|Could not find the function|PGRST202|does not exist/i.test(m); }
function hndNotOpen() { return hndKeeper() ? "Run the latest server update in Supabase first." : "The Guild of Hands opens with the next server update."; }
function hndXp(k) { return +((HNDP.me && HNDP.me.xp && HNDP.me.xp[k]) || 0); }
function hndLvl(k) { return hndLevelOf(hndXp(k)); }
function hndBoost(k) { return +((HNDP.me && HNDP.me.boost && HNDP.me.boost[k]) || 0); }
function hndEff(k) { return hndLvl(k) + hndBoost(k); }
function hndTool(k) { return hndKeeper() ? 5 : +((HNDP.me && HNDP.me.tools && HNDP.me.tools[k]) || 0); }
function hndTotal() { return HND_SKILLS.reduce(function (a, S) { return a + hndLvl(S.k); }, 0); }
function hndBuff(k) { var b = HNDP.me && HNDP.me.buffs && HNDP.me.buffs[k]; return b && new Date(b.until).getTime() > Date.now() ? b : null; }
function hndOff(k) { return !!(HNDP.me && HNDP.me.off && HNDP.me.off.indexOf(k) >= 0); }
function hndTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function hndFetch(force) {
if (!hndSigned()) {
HNDP.me = null;
return Promise.resolve(null);
}
if (!force && HNDP.me && Date.now() - HNDP.at < 20000)
return Promise.resolve(HNDP.me);
return cityRpc("skill_me", {}).then(function (o) { HNDP.missing = false; HNDP.me = o && o.ok ? o : null; HNDP.at = Date.now(); hndMenuPaint(); return HNDP.me; })
.catch(function (e) { if (hndMissingErr(e))
HNDP.missing = true; return HNDP.me; });
}
function hndStockLoad() { return __ZC(357, 0, this, arguments, new.target); }
function hndHave(k) { return +(HNDP.stock[k] || 0); }
function hndMatName(k) { return __ZC(357, 1, this, arguments, new.target); }
(function () {
if (typeof cityRpc !== "function")
return;
var cr = cityRpc;
cityRpc = function (name, body) {
if ((name === "craft_gather" || name === "craft_make") && hndJoined() && !HNDP.missing) {
var alt = name === "craft_gather" ? "skill_gather" : "skill_make";
return cr(alt, body).then(function (o) { try {
hndAfter(o);
}
catch (e) { } return o; }, function (e) { if (hndMissingErr(e)) {
HNDP.missing = true;
return cr(name, body);
} throw e; });
}
return cr.apply(this, arguments);
};
})();
function hndAfter(o) { return __ZC(357, 2, this, arguments, new.target); }
function hndFeed(t) { return __ZC(357, 3, this, arguments, new.target); }
function hndTierWord(k, t) { return __ZC(357, 4, this, arguments, new.target); }
var HND_H = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>";
function hndBar(k) { return __ZC(357, 5, this, arguments, new.target); }
function hndCard() { return __ZC(357, 6, this, arguments, new.target); }
function hndInvite() { return __ZC(357, 7, this, arguments, new.target); }
function hndHome(msg) { return __ZC(357, 8, this, arguments, new.target); }
function hndSkillCard(k) { return __ZC(357, 9, this, arguments, new.target); }
function hndPantry(msg) { return __ZC(357, 10, this, arguments, new.target); }
function hndUse(kind) { return __ZC(357, 11, this, arguments, new.target); }
function hndStation(st, msg) { return __ZC(357, 12, this, arguments, new.target); }
function hndCraft(st, R, times) { return __ZC(357, 13, this, arguments, new.target); }
function hndToolmaker(msg) { return __ZC(357, 14, this, arguments, new.target); }
function hndBoard() { return __ZC(357, 15, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-crafts"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-crafts";
b.title = "The Guild of Hands: crafts and skills, if you take them up";
b.textContent = "⚒️ Crafts";
b.onclick = function () { hndCard(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1700);
setTimeout(function () { hndFetch(true); }, 6000);
setInterval(function () { if (hndSigned() && !document.hidden)
hndFetch(true); }, 240000);
})();
function hndMenuPaint() { var b = document.getElementById("me-crafts"); if (b)
b.textContent = hndJoined() ? "⚒️ Crafts · " + hndTotal() : "⚒️ Crafts"; }
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
if (!hndJoined())
return h;
h += bkpHead("⚒️ Crafts (the Guild of Hands)") + HND_SKILLS.map(function (S) { return bkpRow(S.icon + " " + esc(S.name), "level " + hndLvl(S.k) + (hndBoost(S.k) ? " (+" + hndBoost(S.k) + ")" : "")); }).join("");
var tl = HND_GATHER.filter(function (k) { return hndTool(k); }).map(function (k) { return HND_TOOL_TIERS[hndTool(k) - 1][1] + " " + HND_TOOL_NAME[k]; });
if (tl.length)
h += bkpRow("Your best tools", esc(tl.join(", ")));
}
catch (e) { }
return h;
};
})();
var HND = { base: -1240000, G: null, built: false, lite: false, t: 0, mats: {}, tex: {}, solids: [], sgrid: {}, floors: [], spots: [], talk: [], people: [],
nodes: [], beasts: [], rip: [], falls: null, zone: "town", pt: 0, vt: 0, busy: false, state: null, picked: {}, grid: null, chunks: [], inst: [] };
var HND_W = 1.0;
var HND_BOUND = { x0: -1170, x1: 1170, z0: -1170, z1: 1170 };
var HND_TOWN = { x: 0, z: 0, r: 175, y: 4 };
var HND_LAKE = { x: -560, z: 40, rx: 235, rz: 190 };
var HND_PIT = { x: 720, z: -80, R: 215, depth: 34 };
var HND_MOOR = { x: 760, z: 540, r: 420, tx: 880, tz: 680 };
var HND_RIVERS = [[[-800, -470], [-730, -340], [-660, -200], [-610, -120]], [[-650, 200], [-700, 410], [-675, 610], [-640, 800], [-625, 1000]]];
var HND_FALLS = { x: -806, z: -482, top: 22 };
var HND_PIER = { x: -120, z0: 880, z1: 1110, w: 4 };
function hndCoast(x) { return 885 + 30 * Math.sin(x / 170) + 18 * Math.sin(x / 63 + 1.3); }
function hndSmooth(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
function hndSegD(px, pz, ax, az, bx, bz) { var dx = bx - ax, dz = bz - az, l = dx * dx + dz * dz, t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / l)) : 0; return Math.hypot(px - ax - dx * t, pz - az - dz * t); }
function hndRiverD(x, z) { var best = 1e9; HND_RIVERS.forEach(function (R) { for (var i = 0; i < R.length - 1; i++) {
var d = hndSegD(x, z, R[i][0], R[i][1], R[i + 1][0], R[i + 1][1]);
if (d < best)
best = d;
} }); return best; }
function hndLakeD(x, z) { var dx = (x - HND_LAKE.x) / HND_LAKE.rx, dz = (z - HND_LAKE.z) / HND_LAKE.rz; return Math.sqrt(dx * dx + dz * dz); }
function hndPitY(d) { var R = HND_PIT.R, t = Math.max(0, Math.min(1, (R - d) / R)), s = t * 5, k = Math.floor(s), f = s - k; if (k >= 5) {
k = 4;
f = 1;
} var r = hndSmooth(0.55, 1, f); return -(Math.min(5, k + r)) / 5 * HND_PIT.depth; }
function hndPitTier(d) { var R = HND_PIT.R; return Math.max(0, Math.min(4, Math.floor((R - d) / R * 5))); }
function hndRaw(x, z) { return __ZC(357, 16, this, arguments, new.target); }
function hndGridMake() {
var S = HND.lite ? 12 : 8, B = HND_BOUND, nx = Math.round((B.x1 - B.x0) / S) + 1, nz = Math.round((B.z1 - B.z0) / S) + 1, H = new Float32Array(nx * nz);
for (var j = 0; j < nz; j++)
for (var i = 0; i < nx; i++)
H[j * nx + i] = hndRaw(B.x0 + i * S, B.z0 + j * S);
HND.grid = { S: S, nx: nx, nz: nz, H: H };
}
function hndLand(x, z) { return __ZC(357, 17, this, arguments, new.target); }
function hndWaterAt(x, z) {
if (z > hndCoast(x) - 6)
return HND_W;
if (hndLakeD(x, z) < 1.02)
return HND_W;
if (hndRiverD(x, z) < 9)
return HND_W;
return null;
}
function hndLandCol(x, z, h, sl, c) { return __ZC(357, 18, this, arguments, new.target); }
function hndTex(name, mpt) { return __ZC(357, 19, this, arguments, new.target); }
function hndSurf(name, tint, mpt, o) { return __ZC(357, 20, this, arguments, new.target); }
function hndC(col, o) { return __ZC(357, 21, this, arguments, new.target); }
function hndBoxUV(geo, w, h, d) {
var uv = geo.attributes.uv, n = geo.attributes.normal;
for (var i = 0; i < uv.count; i++) {
var ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i));
var u = uv.getX(i), v = uv.getY(i);
if (ay > 0.5)
uv.setXY(i, u * w, v * d);
else if (ax > 0.5)
uv.setXY(i, u * d, v * h);
else
uv.setXY(i, u * w, v * h);
}
uv.needsUpdate = true;
return geo;
}
function hndBox(w, h, d, mat, x, y, z, p, ry) { var m = new THREE.Mesh(hndBoxUV(new THREE.BoxGeometry(w, h, d), w, h, d), mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; if (p)
p.add(m); return m; }
function hndTerrain(G) { return __ZC(357, 22, this, arguments, new.target); }
var HND_RIPT = null;
function hndWaterMat(col) { return __ZC(357, 23, this, arguments, new.target); }
function hndWater(G) { return __ZC(357, 24, this, arguments, new.target); }
function hndFixUV(m) { var g = m.geometry, uv = g.attributes.uv, p = g.attributes.position; if (!uv)
return; for (var i = 0; i < uv.count; i++)
uv.setXY(i, p.getX(i) * m.scale.x, p.getY(i) * m.scale.y); uv.needsUpdate = true; }
function hndMerge(parts) { return __ZC(357, 25, this, arguments, new.target); }
function hndMx(x, y, z, sx, sy, sz, rx, ry, rz) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)), new THREE.Vector3(sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz)); return m; }
function hndBlob(seed, detail) { return __ZC(357, 26, this, arguments, new.target); }
var HND_TREE = {};
function hndTreeGeo(kind) { return __ZC(357, 27, this, arguments, new.target); }
function hndTreeMats() { return HND.mats.treeT || (HND.mats.treeT = [hndSurf("bark", 0xFFFFFF, 1.6, { vc: true }), HND.lite ? new THREE.MeshLambertMaterial({ vertexColors: true }) : new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 6, specular: 0x101810 })]); }
function hndForest(G) { return __ZC(357, 28, this, arguments, new.target); }
function hndTree(kind, x, z, s, par) { return __ZC(357, 29, this, arguments, new.target); }
function hndBoulder(s, col, seed) { var m = new THREE.Mesh(hndBlob(seed || 1, HND.lite ? 1 : 2), hndSurf("stone", col || 0x8A847A, 2.5)); m.scale.set(s, s * 0.62, s * 0.9); m.rotation.y = (seed || 1) * 1.3; return m; }
function hndFloor(x0, x1, z0, z1, y, o) { var F = { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y }; if (o)
for (var k in o)
F[k] = o[k]; HND.floors.push(F); return F; }
function hndSolidBox(x0, x1, z0, z1, y0, y1) { HND.solids.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y0: y0, y1: y1 }); }
function hndSpot(x, z, r, name, verb, fn, y) { var s = { x: x, z: z, r: r, name: name, verb: verb, fn: fn, y: y }; HND.spots.push(s); return s; }
function hndFrame(o) {
var a = { s: 0, e: Math.PI / 2, n: Math.PI, w: -Math.PI / 2 }[o.f || "s"];
return { x: o.x, z: o.z, a: a, c: Math.cos(a), s: Math.sin(a),
to: function (lx, lz) { return [this.x + lx * this.c + lz * this.s, this.z - lx * this.s + lz * this.c]; } };
}
function hndBoxW(F, lx0, lx1, lz0, lz1, y0, y1) { var p = F.to(lx0, lz0), q = F.to(lx1, lz1); hndSolidBox(p[0], q[0], p[1], q[1], y0, y1); }
var HND_STONE = 0xB8AE9C, HND_PLASTER = 0xE8DCC4, HND_TIMBER = 0x5A3E28, HND_ROOF = 0x6A4A3A, HND_SLATE = 0x5A5E66;
function hndBuilding(G, o) { return __ZC(357, 30, this, arguments, new.target); }
function hndIn(B, mesh, lx, ly, lz) { mesh.position.set(lx, ly + 0.62, lz); B.g.add(mesh); return mesh; }
function hndInSpot(B, lx, lz, r, name, verb, fn) { var p = B.F.to(lx, lz); return hndSpot(p[0], p[1], r, name, verb, fn, B.y); }
function hndInSolid(B, lx0, lx1, lz0, lz1, h) { hndBoxW(B.F, lx0, lx1, lz0, lz1, B.y - 1, B.y + (h || 1.2)); }
function hndPerson(B, seed, lx, lz, face, o, talk) { return __ZC(357, 31, this, arguments, new.target); }
function hndAnvil(B, lx, lz) { return __ZC(357, 32, this, arguments, new.target); }
function hndFurnace(B, lx, lz, w) {
var g = new THREE.Group(), br = hndSurf("brick", 0x9A5A3A, 1);
hndBox(w || 2.4, 2.2, 2.2, br, 0, 1.1, 0, g);
hndBox(0.9, 0.8, 0.12, hndC(0xE87A2A, { e: 0xC85A1A, ei: 0.8 }), 0, 0.9, 1.12, g);
hndBox(1, 3.2, 1, br, 0, 3.6, -0.4, g);
return hndIn(B, g, lx, 0, lz);
}
function hndBench(B, lx, lz, w, d, col) { var g = new THREE.Group(), wd = hndSurf("wood", col || 0x8A6440, 1.2); hndBox(w, 0.12, d, wd, 0, 0.92, 0, g); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { hndBox(0.12, 0.9, 0.12, wd, q[0] * (w / 2 - 0.1), 0.45, q[1] * (d / 2 - 0.1), g); }); return hndIn(B, g, lx, 0, lz); }
function hndShelves(B, lx, lz, w, jar) { return __ZC(357, 33, this, arguments, new.target); }
function hndRange(B, lx, lz) { return __ZC(357, 34, this, arguments, new.target); }
function hndBarrel(B, lx, lz) { return __ZC(357, 35, this, arguments, new.target); }
function hndLoom(B, lx, lz) { return __ZC(357, 36, this, arguments, new.target); }
function hndHide(B, lx, lz, ry) {
var g = new THREE.Group(), wd = hndSurf("wood", 0x6A4A30, 1);
hndBox(0.1, 2.2, 0.1, wd, -0.9, 1.1, 0, g);
hndBox(0.1, 2.2, 0.1, wd, 0.9, 1.1, 0, g);
hndBox(1.9, 0.1, 0.1, wd, 0, 2.1, 0, g);
hndBox(1.9, 0.1, 0.1, wd, 0, 0.3, 0, g);
hndBox(1.5, 1.5, 0.04, hndC(0x9A7A5A), 0, 1.2, 0, g);
g.rotation.y = ry || 0;
return hndIn(B, g, lx, 0, lz);
}
function hndLampPost(G, x, z) { return __ZC(357, 37, this, arguments, new.target); }
function hndSignpost(G, x, z, arms) { return __ZC(357, 38, this, arguments, new.target); }
function hndRoad(G, pts, w) { return __ZC(357, 39, this, arguments, new.target); }
function hndRoadLine(a, b, n) { var out = []; for (var i = 0; i <= n; i++) {
var t = i / n;
out.push([a[0] + (b[0] - a[0]) * t + Math.sin(t * 9 + a[0]) * 4 * (t > 0.05 && t < 0.95 ? 1 : 0), a[1] + (b[1] - a[1]) * t]);
} return out; }
function hndTown(G) { return __ZC(357, 40, this, arguments, new.target); }
function hndLodges(G) { return __ZC(357, 41, this, arguments, new.target); }
function hndMarket(G, y) { return __ZC(357, 42, this, arguments, new.target); }
var HND_RIBBON = [0xE8E0C8, 0x5A9A4A, 0xD8882A, 0xA83A3A, 0x6A4AA8];
var HND_TREEKIND = ["birch", "oak", "maple", "yew", "ironbark"];
var HND_VEIN = [[0x9A5A3A, 0x1A1A1A], [0xD8DCE0], [0xD8A838], [0xC8D8F0], [0x3A4AA8]];
var HND_BLOOM = [[0xB87AC8, 0x3A1A3A], [0x8AA08A, 0x9A7448], [0xD8D4C4], [0xC8D8F8], [0xF8E8A0]];
function hndNodeSpots() { return __ZC(357, 43, this, arguments, new.target); }
function hndRipple(par, x, y, z) { var m = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.75, 28), hndC(0xE8F4FA, { op: 0.5, ds: true })); m.rotation.x = -Math.PI / 2; m.position.set(x, y + 0.04, z); par.add(m); return m; }
function hndNodeLook(N) { return __ZC(357, 44, this, arguments, new.target); }
function hndNodeShow(N, full) {
var P = N.parts || {};
if (P.crown) {
P.crown.visible = full;
P.trunk.visible = full;
P.stump.visible = !full;
}
if (P.vein)
P.vein.visible = full;
if (P.rip) {
P.rip.visible = full;
}
if (P.float)
P.float.visible = full;
if (P.bloom)
P.bloom.visible = full;
if (P.snare)
P.snare.visible = full;
N.full = full;
}
function hndNodes() { return __ZC(357, 45, this, arguments, new.target); }
function hndBeasts() { return __ZC(357, 46, this, arguments, new.target); }
function hndPickedLoad() { try {
var o = JSON.parse(localStorage.getItem("sm.hnd.picked") || "{}"), n = Date.now();
HND.picked = {};
for (var k in o)
if (o[k] > n)
HND.picked[k] = o[k];
}
catch (e) {
HND.picked = {};
} }
function hndPickedSave() { try {
var n = Date.now(), o = {};
for (var k in HND.picked)
if (HND.picked[k] > n)
o[k] = HND.picked[k];
HND.picked = o;
localStorage.setItem("sm.hnd.picked", JSON.stringify(o));
}
catch (e) { } }
function hndNodeWord(N) { var S = HND_BY[N.s], lv = HND_TIERS[N.t]; return "<b>" + esc(N.name) + "</b> · " + S.icon + " " + esc(S.name) + " " + lv; }
function hndGather(N) { return __ZC(357, 47, this, arguments, new.target); }
var HND_ENV = { top: 0x5A8ED8, low: 0xE2E8E4, fog: 0xD6E0E2, fogD: 0.0009, sun: 1.06, sunCol: 0xFFEED4, sunDir: [-0.4, 0.66, 0.35], hemi: 0.64, hemiCol: 0xD8E4F4, hemiGround: 0x5A6040 };
var HND_ENV_IN = { top: 0x5A8ED8, low: 0xE2E8E4, fog: 0xD6E0E2, fogD: 0.0012, sun: 0.8, sunCol: 0xFFE4C0, sunDir: [-0.4, 0.66, 0.35], hemi: 0.78, hemiCol: 0xF0E4D0, hemiGround: 0x6A5A40 };
var HND_ARRIVE = { x: 0, z: 56 };
function hndFloorAt(x, z, f) { var best = null; for (var i = 0; i < HND.floors.length; i++) {
var F = HND.floors[i];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y <= f + 0.7 && (best === null || F.y > best.y))
best = F;
} return best; }
function hndZoneAt(x, z, feet) { return __ZC(357, 48, this, arguments, new.target); }
function hndGround(x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, land = hndLand(x, z), w = hndWaterAt(x, z), g = land;
if (w !== null && land < w - 1.2)
g = w - 1.2;
var F = hndFloorAt(x, z, f);
return F && F.y > g ? F.y : g;
}
var HND_CELL = 16;
function hndSolidGrid() { return __ZC(357, 49, this, arguments, new.target); }
function hndBlock(x, z, feet) { return __ZC(357, 50, this, arguments, new.target); }
function hndTick(dt) { return __ZC(357, 51, this, arguments, new.target); }
function hndVisTick(L) { return __ZC(357, 52, this, arguments, new.target); }
function hndBake(g) { if (typeof gwBake !== "function")
return; try {
gwBake(g);
}
catch (e) {
if (window.console)
console.warn("[guildlands] bake", e);
} }
function hndBuild(G) { return __ZC(357, 53, this, arguments, new.target); }
function hndQuarryDress(G) { return __ZC(357, 54, this, arguments, new.target); }
function hndHomeWorld() { worldHome("<b>Back from the Guildlands.</b> Whatever you gather or make anywhere still teaches you."); }
if (typeof worldDef === "function")
worldDef(HND_KEY, {
base: HND.base, far: 2600, ownSky: true, tone: 349,
env: function () { var E = HND.inside ? HND_ENV_IN : HND_ENV; if (HND.lite && E.fogD < 0.0016)
E = Object.assign({}, E, { fogD: 0.0016 }); return E; },
build: function (G) { hndBuild(G); },
enter: function (opt) { return __ZC(357, 55, this, arguments, new.target); },
leave: function () { HND.busy = false; },
ground: function (x, z, feet) { return hndGround(x, z, feet); },
block: function (x, z, feet) { return hndBlock(x, z, feet); },
tick: function (dt) { hndTick(dt); },
back: function () { hndHomeWorld(); }
});
function hndGo(opt) {
if (!hndJoined() && !hndKeeper()) {
hndCard();
return false;
}
if (HNDP.me && HNDP.me.open === false && !hndKeeper()) {
setStatus("⚒️ <b>The Guildlands are closed for now</b> by the Keeper. Whatever you gather or make elsewhere still teaches you.");
return false;
}
return worldGo(HND_KEY, opt || {});
}
if (typeof WLG !== "undefined" && WLG.keys.indexOf(HND_KEY) < 0)
WLG.keys.push(HND_KEY);
function hndForget() { return __ZC(357, 56, this, arguments, new.target); }
if (typeof worldLetGo === "function")
(function () {
var f = worldLetGo;
worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === HND_KEY)
hndForget(); return r; };
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-hnd]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-hnd", "1");
b.textContent = "⚒️ The Guildlands (Anvilmere)";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } hndGo({}); };
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
if (!/[?&]kguild=1/.test(location.search))
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
hndGo({});
try {
var q = new URLSearchParams(location.search);
q.delete("kguild");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
if (typeof DGR_WORLDS !== "undefined" && !DGR_WORLDS.some(function (r) { return r[0] === HND_KEY; })) {
DGR_WORLDS.push([HND_KEY, "The Guildlands (Safe everywhere)", 0, "hidden"]);
if (typeof DGR_W !== "undefined")
DGR_W[HND_KEY] = { id: HND_KEY, name: "The Guildlands", def: 0, group: "hidden" };
}
function hndTest() { return { HND: HND, go: hndGo, ground: hndGround, block: hndBlock, zone: hndZoneAt, nodes: function () { return HND.nodes; }, gather: hndGather, card: hndCard, station: hndStation }; }
function hndSweep(G) { return __ZC(357, 57, this, arguments, new.target); }
function hndSweepEdge(G) { return __ZC(357, 58, this, arguments, new.target); }
(function () {
if (typeof hndBuild !== "function")
return;
var f = hndBuild;
hndBuild = function (G) { var r = f.apply(this, arguments); try {
hndSweep(G);
}
catch (e) {
if (window.console)
console.warn("[guildlands] sweep", e);
} return r; };
})();
