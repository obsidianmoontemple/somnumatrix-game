/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(297, function () {
"use strict";
return [
function () {
var fns = {}, h = ppHead("The concierge", "\"Welcome to Jubilee! Where would you like to go?\" Pick a place and an arrow on the banner shows you the way.");
[["club", "The Glowworm Club", "Dancing, two bars, the Velvet Room, the VIP Lounge, the Rooftop Terrace"], ["echo", "The Echo Lounge", "Karaoke rooms, bowling, darts, pool, arcade cabinets"],
["fest", "The Festival Grounds", "The Main Stage, the Sunset Stage, the rides, the carnival games"], ["beach", "The Beach Club", "The tiki bar, the beach DJ, the pool, cabanas and bonfires"],
["shop", "Confetti & Co.", "The party shop, the balloon artist, the party planner"], ["trucks", "The food trucks", "Tacos, pizza, noodles, burgers, churros, juice"],
["hall", "The Gilded Hall", "For the twenty Golden Invitation guests"], ["line", "The Party Line stop", "Shuttles home to the Space Corp Spaceport"]].forEach(function (q) {
h += worldBtn("w" + q[0], q[1], q[2]);
fns["w" + q[0]] = function () { ppShowWay(q[0]); };
});
h += worldBtn("jobs", "Jobs on Jubilee", "Every venue is hiring: see the posts");
fns.jobs = function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(PP_KEYS.port); };
worldCard(h, fns);
},
function () {
var a = ppAdult();
worldCard(ppHead("The wristband booth", "Every guest gets a wristband: it tells the bars what to pour.") +
"<div style='margin-top:6px'>" + (a ? "🟡 <b>A gold wristband</b> clicks round your wrist: you are 18 or over, and every bar will serve you." :
ppSigned() ? "🔵 <b>A blue wristband</b> clicks round your wrist: the bars serve you mocktails, juices and food, and every floor, stage, ride and game is yours." :
"Sign in for your wristband. Until then you are welcome to look round, dance and ride.") + "</div>");
},
function () {
var d = new Date().getDay(), h = ppHead("Tonight on Jubilee", "The theme changes every night of the week.");
PP_NIGHTS.forEach(function (N, i) { h += "<div style='margin:5px 0;" + (i === d ? "color:#FFE7B0" : "opacity:.8") + "'><b>" + esc(N[0]) + ": " + esc(N[1]) + "</b><br><span style='font-size:12px'>" + esc(N[2]) + "</span></div>"; });
worldCard(h);
},
function (which) {
var N = PP_NIGHTS[new Date().getDay()], dj = ppName("Resident DJ", "mainstage");
worldCard(ppHead("The Main Stage", "Tonight: " + esc(N[1])) +
"<div>On the decks: <b>" + esc(dj) + "</b> (stand-in), playing the house's own music all night.</div>" +
"<div style='margin-top:6px;opacity:.8'>Any dreamer can play a set here too: book it at the Shows board in the city, or ask the stage manager. Walk onto the grass before the stage and press E to dance.</div>");
},
function () {
var N = PP_NIGHTS[new Date().getDay()];
worldCard(ppHead("The ticket desk", "Entry to the Glowworm is free, every night.") +
"<div><b>Tonight: " + esc(N[1]) + "</b>. " + esc(N[2]) + "</div>" +
"<div style='margin-top:6px'>The <b>VIP Lounge</b> (up the steps off the Main Room) opens for anyone holding a Glowworm VIP card. Confetti & Co. on the boulevard sells them.</div>" +
(ppVip() ? "<div style='margin-top:6px;color:#F2D08A'>Your card is on the list: go on up.</div>" : worldBtn("vip", "Buy a VIP card here", "250 gold, yours for good")) +
"<div style='margin-top:6px'>The <b>Rooftop Terrace</b> is up the lift behind you.</div>", { vip: function () { ppShopCard("party"); } });
},
function () {
worldCard(ppHead("The security office", "Eight cameras, the night's log, the radio to the door.") +
"<div style='font-size:12.5px'>" + ["Doors open. Wristbands checked at the rope.", "Main floor busy; nobody hurt.", "VIP list checked.", "The roof: fire tables lit, all calm."].map(function (s, i) { return "<div>" + (20 + i) + ":00 · " + esc(s) + "</div>"; }).join("") + "</div>" +
"<div style='margin-top:6px;opacity:.8'>Trouble is reported to Dragon Corp as it is anywhere in the city; nobody is punished without a trial.</div>");
},
function () {
var fns = {}, h = ppHead("The lighting desk", "Choose how the Main Room's floor washes. The colours always change slowly: nothing here can flash.");
Object.keys(PP_PALS).forEach(function (k) { h += worldBtn("p" + k, { club: "Glowworm (house)", neon: "Neon", disco: "Disco gold", garden: "Glow garden", gold: "Masquerade gold" }[k], ""); fns["p" + k] = function () { PP.clubPal = PP_PALS[k]; setStatus("The floor drifts into its new colours."); }; });
h += worldBtn("auto", "Tonight's theme", "Let the night choose");
fns.auto = function () { PP.clubPal = null; };
worldCard(h, fns);
},
function (where) {
var fns = {}, h = ppHead(where === "green" ? "The Green Room" : "The DJ booth", where === "green" ? "The set list for tonight is pinned to the mirror." : "Lean over and ask for something.");
[["slow", "Something slower", 96], ["mid", "Keep it steady", 112], ["fast", "Turn it up a notch", 128]].forEach(function (q) {
h += worldBtn(q[0], q[1], q[2] + " beats a minute");
fns[q[0]] = function () { PP.req = PP.req || {}; PP.req["pp-club"] = q[2]; worldCard(null); setStatus("The DJ nods and eases into the next track."); };
});
worldCard(h, fns);
},
function () {
worldCard(ppHead("The front desk", "Shoes, lanes and rooms.") + "<div>Bowling, darts, pool and the karaoke rooms are <b>free</b>, all night. The arcade cabinets are free too.</div>" +
"<div style='margin-top:6px'>The snack bar and the lounge bar are by the games hall.</div>");
setStatus("<b>A pair of bowling shoes</b>, your size. Lanes are to the right.");
},
function () {
worldCard(ppHead("The party planner", "Plan a party of your own.") +
"<div>Every home and business in Somnucor can hold a party: invite your friends from your phone, and the room fills with music and lights. " +
"The planner can sell you everything for it next door: balloons, banners, lanterns, a cake.</div>" +
worldBtn("shop", "Shop for the party", "Confetti & Co."), { shop: function () { ppShopCard("party"); } });
},
function () {
worldCard(ppHead("The first-aid tent", "Two festival medics, water and somewhere quiet to sit.") +
"<div>The medic checks you over: you are fine. \"Drink some water, and sit in the shade a while if you need to.\"</div>" +
worldBtn("water", "A cup of water", "Free from the medics"), { water: function () { ppBuy("aid", "The first-aid tent", PP_MENU.aid[0]); } });
},
function () {
ppLoadInvite(true);
var g = PP.invite && PP.invite.gathering;
var html = typeof giGatherHtml === "function" ? giGatherHtml(g) : "<div>" + (g && g.at ? esc(String(g.at)) : "The Keeper will announce the day") + "</div>";
worldCard(ppHead("The Golden Gathering", "Here, in the Gilded Hall: the twenty, together.") + html +
(PP.invite && PP.invite.no ? "<div style='margin-top:6px'>Your place at the banquet: <b>No. " + esc(String(PP.invite.no)) + (PP.invite.plus_one_of ? "</b>, the companion's chair beside guest No. " + esc(String(PP.invite.no)) + ".</div>" : "</b>.</div>") : ""));
},
function () {
if (!ppKeeper())
return setStatus("Only the Keeper sets the day.");
var g = PP.invite && PP.invite.gathering, v = "";
try {
if (g && g.at) {
var d = new Date(g.at);
v = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
}
catch (e) { }
worldCard(ppHead("The Keeper's desk", "Set the day and time of the Golden Gathering. Every guest sees it on their invitation.") +
"<label style='display:block;margin:6px 0'>When <input id='pp-gat' type='datetime-local' value='" + esc(v) + "' style='background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px'></label>" +
"<label style='display:block;margin:6px 0'>A note <input id='pp-gnote' type='text' maxlength='300' value='" + esc((g && g.note) || "") + "' style='width:100%;box-sizing:border-box;background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px'></label>" +
worldBtn("save", "Save the day", "") + "<div id='pp-msg'></div>", { save: function () {
var a = document.getElementById("pp-gat"), n = document.getElementById("pp-gnote"), at = a && a.value ? new Date(a.value).toISOString() : null;
cityRpc("keeper_gathering_set", { p_at: at, p_note: (n && n.value) || "" }).then(function (o) { ppMsg(o && o.ok ? "<b>The Golden Gathering is set.</b>" : esc((o && o.say) || "Not now.")); ppLoadInvite(true); })
.catch(function (e) { ppMsg(ppMissing(e) ? "Setting the day needs the latest server update." : esc(e.message)); });
} });
["pp-gat", "pp-gnote"].forEach(function (id) { var e = document.getElementById(id); if (e) {
e.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
e.addEventListener("keyup", function (ev) { ev.stopPropagation(); });
} });
},
function () {
var me = PP.invite && PP.invite.no;
var h = ppHead("The guest book", "Twenty numbered places. The names are kept private: each guest sees only their own.");
for (var i = 1; i <= 20; i++)
h += "<span style='display:inline-block;width:46px;margin:3px;padding:4px;text-align:center;border:1px solid rgba(201,168,104,.5);border-radius:3px;" + (me == i ? "background:rgba(201,168,104,.3)" : "") + "'>No. " + i + "</span>";
if (me)
h += "<div style='margin-top:6px'>Yours is <b>No. " + esc(String(me)) + "</b>" + (PP.invite.plus_one_of ? ", as its +1" : "") + ".</div>";
worldCard(h);
}
];
});
