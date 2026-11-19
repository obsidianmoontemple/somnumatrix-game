/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PP_MENU = {
club: [["pp_club_neon", "Neon Glowworm (cocktail)", 9, 0, 30, 1], ["pp_club_beer", "Draught lager", 5, 0, 30, 1], ["pp_club_mock", "Glow lemonade (no alcohol)", 5, 0, 35, 0], ["pp_club_water", "Iced water", 1, 0, 25, 0], ["pp_club_fries", "Truffle fries", 6, 30, 0, 0]],
velvet: [["pp_vel_wine", "Glass of red wine", 8, 0, 25, 1], ["pp_vel_martini", "Velvet martini", 10, 0, 25, 1], ["pp_vel_mock", "Rose and berry spritz (no alcohol)", 6, 0, 30, 0], ["pp_vel_choc", "Chocolate truffles", 7, 20, 0, 0]],
vip: [["pp_vip_champ", "Glass of champagne", 14, 0, 25, 1], ["pp_vip_sliders", "Lobster sliders", 18, 45, 0, 0], ["pp_vip_mock", "Sparkling elderflower (no alcohol)", 8, 0, 30, 0], ["pp_vip_straw", "Chocolate strawberries", 10, 20, 0, 0]],
roof: [["pp_roof_spritz", "Rooftop spritz", 9, 0, 30, 1], ["pp_roof_beer", "Bottle of pale ale", 6, 0, 30, 1], ["pp_roof_sliders", "Beef sliders", 9, 40, 0, 0], ["pp_roof_lemon", "Pink lemonade", 4, 0, 35, 0]],
fest: [["pp_fest_beer", "Festival lager", 5, 0, 30, 1], ["pp_fest_cider", "Apple cider", 5, 0, 30, 1], ["pp_fest_lemon", "Fresh lemonade", 3, 0, 35, 0], ["pp_fest_water", "Bottle of water", 1, 0, 30, 0], ["pp_fest_pretzel", "Giant pretzel", 4, 30, 0, 0]],
tiki: [["pp_tiki_colada", "Pineapple and coconut cooler", 9, 0, 30, 1], ["pp_tiki_lagoon", "Lagoon punch", 10, 0, 25, 1], ["pp_tiki_virgin", "Coconut cooler (no alcohol)", 6, 0, 35, 0], ["pp_tiki_coco", "Fresh coconut water", 3, 0, 35, 0], ["pp_tiki_tacos", "Grilled fish tacos", 8, 40, 0, 0]],
snack: [["pp_snk_nachos", "Nachos with cheese", 6, 35, 0, 0], ["pp_snk_pizza", "Slice of pizza", 4, 35, 0, 0], ["pp_snk_hotdog", "Hot dog", 4, 30, 0, 0], ["pp_snk_soda", "Fizzy soda", 2, 0, 30, 0], ["pp_snk_shake", "Strawberry milkshake", 5, 10, 25, 0]],
echo: [["pp_echo_beer", "Pint of lager", 5, 0, 30, 1], ["pp_echo_sour", "Echo sour", 8, 0, 25, 1], ["pp_echo_soda", "Fizzy soda", 2, 0, 30, 0], ["pp_echo_mock", "Blue lagoon (no alcohol)", 5, 0, 35, 0]],
hall: [["pp_hall_dinner", "The banquet: three courses", 40, 70, 10, 0], ["pp_hall_champ", "Champagne from the fountain", 14, 0, 25, 1], ["pp_hall_cider", "Sparkling apple from the fountain (no alcohol)", 6, 0, 30, 0], ["pp_hall_cake", "A slice of the celebration cake", 8, 25, 0, 0]],
aid: [["pp_aid_water", "A cup of water from the medics", 0, 0, 30, 0]]
};
var PP_TRUCKS = { "TACO COMET": [["pp_tr_tacos", "Three street tacos", 6, 40, 0, 0], ["pp_tr_nachos", "Loaded nachos", 6, 35, 0, 0]],
"SLICE OF HEAVEN": [["pp_tr_pizza", "Wood-fired margherita", 8, 50, 0, 0], ["pp_tr_garlic", "Garlic knots", 4, 25, 0, 0]],
"NOODLE NEBULA": [["pp_tr_noodles", "Noodle box", 7, 45, 0, 0], ["pp_tr_dumpling", "Six dumplings", 6, 35, 0, 0]],
"SMASH SATURN": [["pp_tr_burger", "Smash burger and fries", 9, 55, 0, 0], ["pp_tr_veg", "Veggie burger and fries", 9, 50, 0, 0]],
"CHURRO CHARIOT": [["pp_tr_churros", "Churros with chocolate", 4, 20, 0, 0], ["pp_tr_floss", "Candy floss", 3, 10, 0, 0], ["pp_tr_funnel", "Funnel cake", 5, 25, 0, 0]],
"JUICE JUPITER": [["pp_tr_lemon", "Lemonade", 3, 0, 35, 0], ["pp_tr_smoothie", "Berry smoothie", 5, 10, 30, 0], ["pp_tr_water", "Bottle of water", 1, 0, 30, 0]] };
function ppHead(title, sub) { return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(title) + "</div>" + (sub ? "<div style='opacity:.8;margin-bottom:6px'>" + sub + "</div>" : ""); }
function ppMenu(k, title) { return __ZC(296, 0, this, arguments, new.target); }
function ppMsg(t) { var e = document.getElementById("pp-msg"); if (e)
e.innerHTML = t;
else
setStatus(t); }
function ppMissing(e) { return /PGRST202|Could not find the function|404/i.test(String(e && e.message || e)); }
function ppBuy(k, title, m) { return __ZC(296, 1, this, arguments, new.target); }
var PP_SHOPS = {
party: { title: "Confetti & Co.", sub: "Everything for a party. It all goes into your backpack.", pre: ["pp_balloons", "pp_confetti", "pp_partyhat", "pp_glowsticks", "pp_banner", "pp_lanterns", "pp_mask", "pp_tiara", "pp_discoball", "pp_cakebox", "pp_giftbox", "pp_mic", "pp_vip_card"] },
merch: { title: "The merch tent", sub: "Keepsakes of Jubilee. They go into your backpack.", pre: ["pp_tshirt", "pp_poster", "pp_wristband", "pp_snowglobe", "pp_mug", "pp_pin"] },
balloon: { title: "The balloon artist", sub: "Twisted while you wait. Into your backpack it goes.", pre: ["pp_bal_dog", "pp_bal_swan", "pp_bal_crown", "pp_bal_sword"] },
costume: { title: "The costume rail", sub: "Capes, top hats, bow ties, witch and wizard hats: the city's own wardrobe pieces, to wear from your backpack.", wear: /^wear_(cape|tophat|bowtie|witch|wizard|cloak|suit|kimono)_/ }
};
function ppCat() {
if (PP.cat && Date.now() - PP.catAt < 300000)
return Promise.resolve(PP.cat);
if (typeof catalogueRows !== "function")
return Promise.resolve([]);
return catalogueRows().then(function (r) { PP.cat = Array.isArray(r) ? r : []; PP.catAt = Date.now(); return PP.cat; }).catch(function () { return PP.cat || []; });
}
function ppShopCard(kind, msg) { return __ZC(296, 2, this, arguments, new.target); }
function ppBuyThing(kind, r) { return __ZC(296, 3, this, arguments, new.target); }
function ppGame(id, title, sub) {
var fns = { play: function () { ppPlay(id, title, sub); } };
worldCard(ppHead(title, esc(sub) + ". Two gold a go; every prize goes into your backpack.") +
worldBtn("play", "Play: 2 gold", ppSigned() ? "" : "Not signed in: a practice go, no prize") + "<div id='pp-msg' style='margin-top:6px'></div>", fns);
}
var PP_GAME_SAY = {
ring: ["The ring spins, wobbles… and drops over a bottle neck!", "The ring bounces off two bottles and skitters away."],
duck: ["You hook a duck and turn it over: there is a number on the bottom.", "You hook a duck and turn it over: there is a number on the bottom."],
strike: ["You swing the mallet: the puck flies up the tower and the bell rings out!", "You swing the mallet: the puck climbs most of the way, then slides back down."],
darts: ["Pop, pop, pop: three balloons gone!", "One balloon pops; the other darts bounce off."]
};
function ppPlay(id, title, sub) { return __ZC(296, 4, this, arguments, new.target); }
function ppBowlNew(lane) { return { lane: lane, frame: 1, ball: 1, pins: 10, rolls: [], score: 0 }; }
function ppBowlScore(rolls) {
var s = 0, i = 0;
for (var f = 0; f < 10 && i < rolls.length; f++) {
if (rolls[i] === 10) {
s += 10 + (rolls[i + 1] || 0) + (rolls[i + 2] || 0);
i += 1;
}
else if ((rolls[i] || 0) + (rolls[i + 1] || 0) === 10) {
s += 10 + (rolls[i + 2] || 0);
i += 2;
}
else {
s += (rolls[i] || 0) + (rolls[i + 1] || 0);
i += 2;
}
}
return s;
}
function ppBowl(n) { return __ZC(296, 5, this, arguments, new.target); }
function ppPinsUp(n) { var L = PP.lanes && PP.lanes[n]; if (!L)
return; L.pins.forEach(function (p) { p.visible = true; p.rotation.set(0, 0, 0); }); }
function ppBowlRoll() { return __ZC(296, 6, this, arguments, new.target); }
function ppTenthStart(rolls) { var i = 0; for (var f = 0; f < 9 && i < rolls.length; f++) {
i += rolls[i] === 10 ? 1 : 2;
} return i; }
function ppDarts() { return __ZC(296, 7, this, arguments, new.target); }
function ppPool() { return __ZC(296, 8, this, arguments, new.target); }
var PP_SONGS = [
{ t: "Lanterns Over the Lagoon", l: ["Light a lantern, let it go", "Over the water, soft and slow", "Every wish a little flame", "Jubilee will know your name"] },
{ t: "Party Line", l: ["Ten, nine, the doors are sealed", "Leave the city, leave the field", "Stars go streaming past the glass", "Hold on tight, the night goes fast"] },
{ t: "Glowworm Shuffle", l: ["Step to the left, the floor turns blue", "Step to the right, it turns for you", "Shuffle slow and shuffle wide", "Glowworm glowing at your side"] },
{ t: "Ringed Giant Lullaby", l: ["Big round world with rings of gold", "Watching over young and old", "Hush the music, dim the light", "Sing the giant into the night"] },
{ t: "Carousel Waltz", l: ["Round we go on a painted mare", "Ribbons flying in the air", "One more turn and one more tune", "Under Jubilee's two moons"] },
{ t: "Twenty at the Table", l: ["Twenty chairs and one long hall", "Golden cards for one and all", "Raise a glass to who you are", "Every guest a little star"] }
];
function ppKaraoke(room) {
var fns = {}, h = ppHead("Karaoke room " + (room.i + 1), "Pick a song; the words come up on the screen. The room is yours.");
PP_SONGS.forEach(function (s, i) { h += worldBtn("s" + i, esc(s.t), "Four lines, a big finish"); fns["s" + i] = function () { ppSing(room, s); }; });
worldCard(h, fns);
}
function ppSing(room, song) { return __ZC(296, 9, this, arguments, new.target); }
