/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(259, function () {
"use strict";
return [
function (o) {
if (!o || o.ok === false)
return;
NEEDS.food = +o.food;
NEEDS.drink = +o.drink;
NEEDS.sick = o.sick || null;
NEEDS.left = o.sick_left == null ? null : +o.sick_left;
NEEDS.exempt = o.exempt || null;
if (typeof o.hp === "number" && typeof harmApply === "function")
harmApply({ hp: o.hp, state: o.state, recovers_at: o.recovers_at, events: [] });
(o.events || []).forEach(function (e) {
if (e.kind === "fell_sick") {
var s = NEEDS_SICK[e.sick] || "something";
setStatus("<b>You have caught " + s + ".</b> " + (e.sick === "stomach" ? "Something you ate did not agree with you. " : "") +
"While you are ill you will not mend by yourself. " + (NEEDS_SICK_CURE[e.sick] || ""));
}
else if (e.kind === "recovered") {
if (e.how !== "remedy")
setStatus("<b>You are over " + (NEEDS_SICK[e.sick] || "it") + ".</b> " + (e.how === "hospital" ? "The hospital saw to it." : "You feel yourself again."));
}
else if (e.kind === "collapsed") {
setStatus("<b>You collapse from " + (e.why === "thirst" ? "thirst" : "hunger") + ".</b> You are carried to the City Hospital, where the nurses feed you. Eat and drink before you are this low again.");
}
});
needsNudge();
needsPaint();
if (NEEDS.open)
needsCardRefresh();
},
function () {
if (NEEDS.menu && Date.now() - NEEDS.menuAt < 600000)
return Promise.resolve(NEEDS.menu);
if (NEEDS.menuBusy)
return NEEDS.menuBusy;
NEEDS.menuBusy = cityRpc("food_menu_board", {}).then(function (m) { NEEDS.menuBusy = false; NEEDS.menu = m || []; NEEDS.menuAt = Date.now(); return NEEDS.menu; })
.catch(function (e) { NEEDS.menuBusy = false; needsErr(e); return null; });
return NEEDS.menuBusy;
},
function () {
if (NEEDS.exempt)
return;
[["food", "hungry"], ["drink", "thirsty"]].forEach(function (p) {
var k = p[0], b = needsBandOf(NEEDS[k]), was = NEEDS.band[k];
NEEDS.band[k] = b;
if (!was || b === was || b === "ok")
return;
var order = { ok: 0, low: 1, starving: 2, empty: 3 };
if (order[b] < order[was])
return;
if (k === "food")
setStatus(b === "low" ? "<b>You are getting hungry.</b> The Cookhouse, the Bakery and the Tavern on the Market Ring serve food. Tap your bars for the way." :
b === "starving" ? "<b>You are very hungry.</b> Eat soon, or you will stop mending and start to weaken." :
"<b>You are starving.</b> You are getting weaker. Find food now: tap your bars for the way to the nearest.");
else
setStatus(b === "low" ? "<b>You are getting thirsty.</b> Any café, tavern or food stall sells drinks. Tap your bars for the way." :
b === "starving" ? "<b>You are very thirsty.</b> Drink soon, or you will start to weaken." :
"<b>You are parched.</b> You are getting weaker. Find a drink now: tap your bars for the way to the nearest.");
});
},
function () {
var hp = (typeof HARM !== "undefined" && HARM) ? HARM.hp : 100, st = (typeof HARM !== "undefined" && HARM) ? HARM.state : "well";
var rows = [["Health", hp + " of 100" + (st === "down" ? " · down, at the City Hospital" : st === "hurt" ? " · hurt (you walk slower)" : "")]];
var notes = [];
if (NEEDS.missing)
notes.push("Food, drink and sickness start soon.");
else if (NEEDS.exempt)
notes.push(NEEDS.exempt === "keeper" ? "The Keeper is never hungry, thirsty or ill, and eats on the house." : "Visitors are fed by the city, free. Hunger, thirst and sickness are for residents.");
else if (NEEDS.food != null) {
rows.push(["Food", Math.round(NEEDS.food) + " of 100" + (NEEDS.food <= 0 ? " · starving" : NEEDS.food < 30 ? " · hungry" : "")]);
rows.push(["Drink", Math.round(NEEDS.drink) + " of 100" + (NEEDS.drink <= 0 ? " · parched" : NEEDS.drink < 30 ? " · thirsty" : "")]);
rows.push(["Illness", NEEDS.sick ? (NEEDS_SICK[NEEDS.sick] || NEEDS.sick) + (NEEDS.left ? " · about " + NEEDS.left + " minutes of play to go" : "") : "none"]);
if (NEEDS.sick)
notes.push(NEEDS_SICK_CURE[NEEDS.sick] + " While you are ill you do not mend by yourself.");
notes.push("Food lasts about 6 hours of play, drink about 4. Time away from the game does not count.");
notes.push("With no food or no drink you stop mending and grow weaker; at nothing you collapse and are carried to the City Hospital.");
}
notes.push("Health comes back by itself, 15 an hour, while you are well fed and not ill. The Apothecary's healing salve gives 15 at once.");
if (typeof FPK !== "undefined" && FPK.list)
notes.push("Food, drink and salve you buy or find wait in your 🎒 Backpack: eat, drink or use them from there when you need them.");
var extra = "";
if (!NEEDS.exempt && !NEEDS.missing) {
extra += worldBtn("wayfood", "Show me the way to food", "the nearest of the Cookhouse, the Bakery, the Tavern, the Inn and the shops");
if (NEEDS.sick || hp < 70)
extra += worldBtn("waymed", "Show me the way to the Apothecary", "remedies and healing salve");
}
return worldFacts("How you are", "Health, food and drink", rows, notes, extra);
},
function () {
return {
wayfood: function () { var k = needsNearest(NEEDS_FOOD_PLACES); worldCard(null); NEEDS.open = null; if (k)
showTheWay(k);
else
setStatus("The Market Ring's food places are not in your city yet."); },
waymed: function () { worldCard(null); NEEDS.open = null; showTheWay("The Apothecary"); }
};
},
function (k, menu, msg) {
var items = (menu || []).filter(function (m) { return m.place === k; });
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(needsPlaceTitle(k)) + "</div>" +
"<div style='opacity:.8;margin-bottom:6px'>" + esc(k === "stall" ? "Hot and quick from the market stall" : (NEEDS_PLACES[k] || "")) + "</div>";
if (NEEDS.food != null && !NEEDS.exempt)
h += "<div style='font-size:12px;opacity:.85;margin-bottom:4px'>Food " + Math.round(NEEDS.food) + " · Drink " + Math.round(NEEDS.drink) +
(NEEDS.sick ? " · ill with " + esc(NEEDS_SICK[NEEDS.sick] || NEEDS.sick) : "") + " · Health " + ((typeof HARM !== "undefined" && HARM) ? HARM.hp : 100) + "</div>";
if (msg)
h += "<div style='margin:4px 0 6px;padding:5px 8px;border:1px solid rgba(201,160,64,.5);border-radius:3px;color:#F4E6C0'>" + msg + "</div>";
if (!menu)
h += "<div style='opacity:.8'>" + (NEEDS.missing ? "The counter opens soon." : "Reading the menu…") + "</div>";
else if (!items.length)
h += "<div style='opacity:.8'>Nothing on the menu here today.</div>";
items.forEach(function (m) {
var fx = [];
if (m.food)
fx.push("food +" + m.food);
if (m.drink)
fx.push("drink +" + m.drink);
if (m.heal)
fx.push("health +" + m.heal);
h += worldBtn("buy:" + m.item, esc(m.name) + " · " + m.price + " gold", fx.join(" · ") || "a remedy");
});
if (k === "stall")
h += "<div style='opacity:.65;font-size:11.5px;margin-top:4px'>Street food is cheap, and now and then it disagrees with somebody.</div>";
return h;
},
function (k, msg) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to buy food and drink.");
return;
}
NEEDS.open = k;
worldCard(needsMenuHtml(k, NEEDS.menu, msg), needsMenuFns(k, NEEDS.menu));
needsMenuLoad().then(function (m) { if (NEEDS.open === k && m)
worldCard(needsMenuHtml(k, m, msg), needsMenuFns(k, m));
else if (NEEDS.open === k && NEEDS.missing)
worldCard(needsMenuHtml(k, null, msg), {}); });
},
function (k, m) {
if (NEEDS.buying)
return;
NEEDS.buying = true;
cityRpc("buy_food", { p_item: m.item }).then(function (o) {
NEEDS.buying = false;
if (!o)
return;
if (o.ok === false) {
needsMenu(k, esc(o.say || "Not now."));
return;
}
var was = NEEDS.open;
NEEDS.open = null;
needsGot(o);
NEEDS.open = was;
var say = esc(o.say || "") + (o.price ? " (" + o.price + " gold)" : "");
setStatus(say);
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (NEEDS.open === k)
needsMenu(k, say);
}).catch(function (e) { NEEDS.buying = false; needsMenu(k, esc(needsErr(e))); });
}
];
});
