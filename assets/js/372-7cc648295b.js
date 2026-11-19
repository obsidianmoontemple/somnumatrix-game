/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FPS = { TKEY: "somnu.folktexts", t: null, with: null, busy: false, unread: 0, lastIn: 0, slotMin: 6 };
var FPS_CHAIN = [
["The Bakery", "The Mill", "sacks of flour", "Running low on flour again, can you send {n} sacks this afternoon?"],
["The Bakery", "The Dairy", "butter and cream", "Need {n} pounds of butter by the morning bake, please."],
["The Bakery", "The Farmhouse", "eggs", "{n} dozen eggs when you can. The custard tarts are flying out."],
["The Cookhouse", "The Butcher's", "meat for the stew", "Can you do {n} pounds of stewing beef for tonight?"],
["The Cookhouse", "The Greengrocer's", "vegetables", "Usual veg order, plus extra onions. {n} crates."],
["The Cookhouse", "The Fish Quay", "fish", "Anything good off the boats? I'll take {n} pounds of whatever's fresh."],
["The Cookhouse", "The Bakery", "bread", "{n} loaves for the lunch rush, ta."],
["The Tavern", "The Brewhouse", "barrels of ale", "We're down to the last {n} barrels. Send more before the evening crowd?"],
["The Tavern", "The Butcher's", "pies and sausages", "{n} dozen sausages for the grill, please."],
["The Somnucor Inn", "The Brewhouse", "ale for the bar", "Guests drank us dry. {n} barrels, quick as you can."],
["The Somnucor Inn", "The Florist's", "flowers for the lobby", "Fresh flowers for the lobby and the rooms, {n} bunches."],
["The Somnucor Inn", "The Weaving Shed", "clean linen", "{n} sets of sheets, we've a full house tonight."],
["The Butcher's", "The Farmhouse", "livestock", "Can I collect {n} more from you on Thursday?"],
["The Butcher's", "The Sheepfold", "lamb", "{n} lambs for the weekend, if they're ready."],
["The Greengrocer's", "The Farmhouse", "potatoes and greens", "{n} crates of whatever's picked this morning."],
["The Greengrocer's", "The Biodome", "fruit", "Any of those dome peaches going? I'll take {n} trays."],
["The Brewhouse", "The Mill", "malted barley", "{n} sacks of malt, the next brew starts tomorrow."],
["The Brewhouse", "The Glassworks", "bottles", "Need {n} crates of bottles. The last lot had a few cracked, mind."],
["The Tailor's", "The Weaving Shed", "bolts of cloth", "{n} bolts of the dark wool, I've a wedding suit to finish."],
["The Cobbler's", "The Butcher's", "hides for leather", "Any hides this week? {n} would do me."],
["The Bindery", "The Print Shop", "printed sheets", "Are the pages for the almanac ready? I can bind {n} today."],
["The Chronicle Press", "The Print Shop", "ink and paper", "Out of ink. {n} tins, and paper if you've got it."],
["The Smithy", "The Mine Head", "iron ore", "{n} carts of ore when the shift comes up."],
["The Smithy", "The Charcoal Burner's Hut", "charcoal", "{n} sacks of charcoal, the forge is hungry."],
["The Wheelwright's", "The Sawmill", "seasoned oak", "{n} planks of seasoned oak for spokes."],
["The Wheelwright's", "The Smithy", "iron tyres", "Two wheels waiting on tyres. Can you do {n} by Friday?"],
["The Joinery", "The Sawmill", "timber", "{n} lengths of pine, the new shopfront needs framing."],
["The Masons' Yard", "The Mine Head", "cut stone", "{n} blocks for the bridge repair, please."],
["The Glassworks", "The Mine Head", "sand", "{n} tons of sand, the furnace is running low."],
["The City Hospital", "The Apothecary", "medicines", "Ward three needs restocking, {n} boxes. List coming over now."],
["The City Hospital", "The Weaving Shed", "bandages", "{n} rolls of clean linen for bandages, urgent-ish."],
["The Apothecary", "The Herbalist's", "dried herbs", "{n} bundles of chamomile and willow bark when you can."],
["The Apothecary", "The Glassworks", "little bottles", "{n} dozen small bottles with stoppers, please."],
["The City School", "The General Store", "chalk and exercise books", "{n} boxes of chalk. The children eat it, I swear."],
["The City School", "The Bakery", "rolls for lunch", "{n} rolls for the school lunch tomorrow."],
["The Florist's", "The Gardeners' Lodge", "cut flowers", "{n} buckets of roses if the beds are blooming."],
["The Toy Shop", "The Joinery", "wooden toys", "Those little carved horses sold out. {n} more?"],
["The Pottery", "The Mine Head", "clay", "{n} sacks of clay, the good red kind."],
["The Watchmaker's", "The Glassworks", "watch glasses", "{n} watch glasses, the small round ones."],
["The Sign Shop", "The Joinery", "boards for signs", "{n} smooth boards, I've three new shops wanting signs."],
["The Chandlery", "The Butcher's", "tallow", "{n} pounds of tallow for candles."],
["The Dock Office", "The Chandlery", "rope and lamp oil", "{n} coils of rope for the quay."],
["The Stables", "The Farmhouse", "hay", "{n} bales of hay, the horses are eating me out of house and home."],
["The Menagerie Lodge", "The Fish Quay", "fish for the animals", "{n} buckets of fish for the otters and the seals."],
["The General Store", "The City Depot", "stock from the depot", "Can the depot send over {n} crates of the usual?"],
["The Post Office", "The Toy Shop", "parcels to collect", "Got {n} parcels to go out? The van's coming round."]
];
var FPS_CALL = [
["A resident on the Market Ring", "The Waterworks", "a burst pipe", "Water's coming through the ceiling! Can someone come now?"],
["The Gate Lodge", "The City Depot", "a pothole by the gate", "There's a hole by the gate you could lose a cart in."],
["The Tavern", "The Joinery", "a broken door", "Someone put a shoulder through the back door last night."],
["The Courthouse", "The Print Shop", "notices to print", "{n} copies of the new notice, please, for the boards."],
["The Somnucor Inn", "The Runners' Hall", "a messenger", "Need a runner to take a letter to the harbour."],
["A family in the Commons", "The City Hospital", "a doctor's visit", "Little one's running a fever, can the doctor come round?"],
["The Bank", "The Watchmaker's", "the vault clock", "The vault clock's lost ten minutes. Can you look at it?"],
["The Fish Quay", "The Engine House", "the ice machine", "The ice machine's packed in, the catch won't keep."],
["The Market", "The City Depot", "rubbish collection", "The bins behind the stalls are overflowing."],
["The City Museum", "The Masons' Yard", "a cracked step", "The front step's cracked, before somebody trips."],
["The Brewhouse", "The Smithy", "a new hoop for a vat", "One of the vat hoops has split."],
["The City School", "The Gardeners' Lodge", "the playground hedge", "The hedge is eating the playground again."],
["A shop on the Craft Ring", "The Sign Shop", "a new sign", "My sign blew down in the wind. Can you make another?"],
["The Stables", "The Wheelwright's", "a cart wheel", "Lost a wheel on the hill road."]
];
var FPS_CHAT = [
["The Transport Depot", "The Gate Lodge", "Tram nine's running ten minutes late, let the queue know."],
["The City Hospital", "The City Hospital", "Can you cover my night shift Thursday? I'll do your Sunday."],
["The Mine Head", "The Pit Office", "Shift's up. All present and counted."],
["The Fish Quay", "The Cookhouse", "Big catch of mackerel today if you want it cheap."],
["The Chronicle Press", "The Courthouse", "Any verdicts we can print before the late edition?"],
["The Bakery", "The Tavern", "Leftover loaves going spare, want them for the soup?"],
["The Dock Office", "The Ferry Light", "Fog coming in off the water, light up early tonight."],
["The Gardeners' Lodge", "The Waterworks", "Can we have the park fountains on by nine?"],
["The Somnucor Inn", "The Stables", "A guest's coming in by carriage around six."],
["The Farmhouse", "The Dairy", "Cows are milked. Churns at the gate whenever you're ready."]
];
var FPS_HOME = [
["A family on the Market Ring", "The Greengrocer's", "a veg box", "Could I get a veg box sent round? Blue door, number {n}.", "Course you can. It'll be with you after lunch."],
["A resident in the Commons", "The General Store", "groceries", "Hiya, can you deliver? Milk, tea, a loaf and {n} tins of soup.", "No bother. The lad'll bring it round within the hour."],
["An old gentleman on the Craft Ring", "The Apothecary", "his prescription", "It's about my tablets. Can someone bring them round? My knees won't do the hill.", "Of course, we'll drop them through your door this afternoon."],
["A couple by the river", "The Bakery", "a birthday cake", "I need a cake for Saturday. Chocolate, says 'Happy {n}th'. Can you deliver?", "Lovely! Chocolate, Saturday morning, we'll bring it round."],
["A resident in the Commons", "The Florist's", "flowers for his mum", "Can you send a bunch of roses to my mum's? It's her birthday.", "Ah, sweet. Red or yellow? We'll have them there by four."],
["A family on the Market Ring", "The Butcher's", "a Sunday joint", "Could you put a joint of beef by for Sunday and send it round?", "Done. I'll pick you a good one."],
["A student in the Commons", "The Cookhouse", "a hot dinner", "Do you deliver? Two of the stew and {n} bread rolls, please.", "We do. Twenty minutes, keep it warm for you."],
["A resident on the Craft Ring", "The Tailor's", "her mended coat", "Is my coat ready? Could you send it over, I'm stuck in with the baby.", "It's done. I'll have the runner bring it by."],
["A new tenant near the gate", "The Joinery", "a bookcase", "I'd like that oak bookcase in the window. Can you deliver and carry it up?", "Two of us'll bring it tomorrow and carry it up."],
["A family in the Commons", "The General Store", "coal and lamp oil", "Running low on coal. {n} sacks and a can of lamp oil, please.", "Right you are. On the cart this afternoon."]
];
var FPS_CRIME = [
["The Market", "a stall robbed", "Someone's just run off with the takings tin from the fruit stall!", "Dragon Corp. Which way did they go? A rider's in the air now."],
["The Tavern", "a fight outside", "There's a fight outside, two of them going at it in the street.", "Dragon Corp. Keep everyone inside, a rider is two minutes out."],
["A shop on the Craft Ring", "a break-in", "I've come in to open up and the back window's been smashed. The till's gone.", "Dragon Corp. Don't touch anything. A rider's on the way to take a statement."],
["The Stables", "a stolen cart", "My cart's gone from the yard. Somebody's just taken it.", "Dragon Corp. What colour is it? We'll have the roads watched from the air."],
["A resident on the Market Ring", "a pickpocket", "My purse has been lifted on the Market Ring. A lad in a grey cap.", "Dragon Corp. Grey cap, we've got that. Stay where you are, a rider's coming."],
["The Courthouse", "paint on the walls", "Someone's painted all over the courthouse steps in the night.", "Dragon Corp. We'll send a rider and get the city works to clean it."],
["The Gate Lodge", "a lost child", "There's a little one here who's lost his mum. Says his name's Sam.", "Dragon Corp. Keep him with you, we'll find his mum. Rider on the way."],
["A resident in the Commons", "someone trying doors", "There's someone going along the street trying the doors. It's not right.", "Dragon Corp. Stay inside and lock up. A rider's coming to look."],
["The Bank", "a forged note", "A man's just tried to pay in with a note that's clearly forged.", "Dragon Corp. Keep him talking if it's safe. A rider's two minutes away."],
["The Fish Quay", "a boat cut loose", "Somebody's cut a boat loose from the quay. It's drifting out.", "Dragon Corp. A rider's going over the water now."]
];
var FPS_MAJOR = [
["The Glassworks", "Ysolde Varn", "f", 48, "Commander of the Dragon Corp", "a fire at the Glassworks", "The Glassworks is on fire and it's catching the Joinery next door. My riders are dropping water on it."],
["The Waterworks", "Ennis Marlow", "m", 57, "chief engineer at the Waterworks", "a burst water main", "The big main under the Market Ring has burst. The street's under a foot of water and rising."],
["The Engine House", "Hal Brennock", "m", 44, "shift boss at the Engine House", "the power out in the east", "We've lost a turbine. Half the east of the city has no lights, the trams are stopped."],
["The Dock Office", "Agnes Tull", "f", 63, "harbourmaster at the Dock Office", "a ship aground", "A cargo ship's gone aground at the harbour mouth with her crew aboard. The tide's turning."],
["The City Hospital", "Maren Osei", "f", 39, "doctor in charge at the City Hospital", "a tram crash", "Two trams have collided on the Ring. We've casualties coming in and the wards are full."],
["The Masons' Yard", "Tobiah Crane", "m", 66, "master mason at the Masons' Yard", "the old bridge giving way", "Part of the old bridge has given way. Nobody on it, thank God, but it's shut and the stones are loose."],
["The Dragon Roost", "Ysolde Varn", "f", 48, "Commander of the Dragon Corp", "a storm coming in", "A big storm's coming in off the sea tonight. I want the harbour cleared and the markets packed up."],
["The Mine Head", "Gus Fennick", "m", 52, "pit boss at the Mine Head", "a collapse in the mine", "There's been a fall in the east tunnel. Four men on the other side of it, we can hear them knocking."]
];
var FPS_OK = ["No problem, I'll have {n} on the van within the hour.", "Right you are. Going out this afternoon.", "Can do. I'll put it on the next round.", "Got it, {n} it is. The van's loading now.", "Leave it with me. You'll have it by teatime."];
var FPS_FIX = ["On my way. Give me twenty minutes.", "Right, I'll send someone round now.", "I'll be there as soon as I've finished this job.", "Okay. Somebody's coming straight over."];
var FPS_STEP = {
order: [[0, "📞 Ordered"], [2, "✅ Order taken"], [12, "📦 Being packed"], [25, "🚚 Out for delivery"], [50, "✔️ Delivered"]],
call: [[0, "📞 Called"], [3, "👷 Someone's on the way"], [20, "🔧 On the job"], [60, "✔️ Sorted"]],
major: [[0, "📞 The Keeper is called"], [3, "🚨 Crews on the way"], [15, "🛠️ Being dealt with"], [70, "✔️ Under control"]],
crime: [[0, "📞 Reported to the Dragon Corp"], [2, "🐉 A rider is on the way"], [10, "🐉 Rider at the scene"], [35, "✔️ Statement taken, case opened"]]
};
function fpsStep(e) { var L = FPS_STEP[e.kind]; if (!L)
return ""; var m = (Date.now() - e.at) / 60000, s = L[0][1]; L.forEach(function (x) { if (m >= x[0])
s = x[1]; }); return s; }
function fpsHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function fpsSlot(slot) {
var at = slot * FPS.slotMin * 60000, h = new Date(at).getHours(), r = fpsHash("fps" + slot), out = [], n = 2 + r % 9;
var day = h >= 6 && h < 22;
if (day) {
var a = FPS_CHAIN[r % FPS_CHAIN.length];
out.push({ kind: "order", at: at, from: a[0], to: a[1], ship: a[1], dest: a[0], what: a[2], say: a[3].replace("{n}", n), reply: FPS_OK[(r >>> 4) % FPS_OK.length].replace("{n}", n), slot: slot });
}
var r2 = fpsHash("fpsb" + slot);
if (r2 % 3 === 0) {
var c = FPS_CALL[r2 % FPS_CALL.length];
out.push({ kind: "call", at: at + 120000, from: c[0], to: c[1], what: c[2], say: c[3].replace("{n}", n), reply: FPS_FIX[(r2 >>> 4) % FPS_FIX.length], slot: slot });
}
else if (r2 % 3 === 1) {
var w = FPS_CHAT[r2 % FPS_CHAT.length];
out.push({ kind: "text", at: at + 180000, from: w[0], to: w[1], what: "", say: w[2], slot: slot });
}
var r3 = fpsHash("fpsh" + slot);
if (h >= 8 && h < 20 && r3 % 2 === 0) {
var o = FPS_HOME[r3 % FPS_HOME.length], k = 4 + r3 % 40;
out.push({ kind: "order", at: at + 240000, from: o[0], to: o[1], ship: o[1], dest: o[0], what: o[2], say: o[3].replace("{n}", k), reply: o[4], slot: slot });
}
var r4 = fpsHash("fpsc" + slot);
if (r4 % 6 === 0) {
var x = FPS_CRIME[r4 % FPS_CRIME.length];
if (day || /break-in|trying doors|paint|cut loose|stolen/.test(x[1]))
out.push({ kind: "crime", at: at + 300000, from: x[0], to: "The Dragon Corp", what: x[1], say: x[2], reply: x[3], slot: slot });
}
var r5 = fpsHash("fpsm" + slot);
if (r5 % 45 === 0) {
var M = FPS_MAJOR[(r5 >>> 6) % FPS_MAJOR.length];
out.push({ kind: "major", at: at + 60000, from: M[0], to: "The Keeper", what: M[5], say: M[6], reply: "The Keeper has been told.", caller: M[1], sex: M[2], age: M[3], post: M[4], slot: slot });
}
return out;
}
function fpsTownOrders(hours) {
var now = Math.floor(Date.now() / (FPS.slotMin * 60000)), L = [];
for (var s = now; s > now - Math.ceil((hours || 2) * 60 / FPS.slotMin); s--)
L = L.concat(fpsSlot(s).filter(function (e) { return e.at <= Date.now(); }).reverse());
return L;
}
function fpsStore() {
if (FPS.t)
return FPS.t;
try {
FPS.t = JSON.parse(localStorage.getItem(FPS.TKEY) || "null");
}
catch (e) {
FPS.t = null;
}
if (!FPS.t || typeof FPS.t !== "object")
FPS.t = { who: {}, log: {}, unread: {} };
FPS.t.who = FPS.t.who || {};
FPS.t.log = FPS.t.log || {};
FPS.t.unread = FPS.t.unread || {};
return FPS.t;
}
function fpsSave() { return __ZC(372, 0, this, arguments, new.target); }
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
try {
if (typeof fmyIsFolk === "function" && fmyIsFolk(c) && !(typeof okyGod === "function" && okyGod(c))) {
var T = fpsStore();
T.who[c.name] = { persona: String((c.details || [])[0] || "").slice(0, 400), title: c.stfTitle || "", place: c.stfPlace || "", sex: c.ftkSex || "", age: c.ftkAge || 0 };
fpsSave();
}
}
catch (e) { }
return ot.apply(this, arguments);
};
})();
function fpsKnown() { return __ZC(372, 1, this, arguments, new.target); }
function fpsChar(name) { return __ZC(372, 2, this, arguments, new.target); }
function fpsCut(t) { t = String(t || ""); try {
if (typeof stfStrip === "function")
t = stfStrip(t);
}
catch (e) { } return t.replace(/\[\[[^\]]*\]\]?/g, "").replace(/\s+/g, " ").trim().slice(0, 600); }
function fpsSimple(c, q) { return (typeof localVoice === "function") ? localVoice(c, q) : "Mm-hm."; }
function fpsAsk(c, log, extra, voice, orElse) { return __ZC(372, 3, this, arguments, new.target); }
function fpsSend(name, text) { return __ZC(372, 4, this, arguments, new.target); }
function fpsLeave() { return __ZC(372, 5, this, arguments, new.target); }
function fpsMaybeText() { return __ZC(372, 6, this, arguments, new.target); }
setInterval(fpsMaybeText, 5 * 60000);
function fpsToast(name, t) { if (typeof setStatus === "function")
setStatus("📱 <b>" + esc(name) + "</b>: " + esc(String(t).slice(0, 90))); }
function fpsUnreadAll() { var u = fpsStore().unread, n = 0; Object.keys(u).forEach(function (k) { n += u[k] || 0; }); return n; }
function fpsBadge() {
try {
var b = document.getElementById("ph-btn");
if (!b)
return;
var s = b.querySelector(".b");
if (!s)
return;
var base = (typeof PH !== "undefined" && PH.inbox && PH.inbox.ok) ? (Number(PH.inbox.unread) || 0) + (Number(PH.inbox.pages_open) || 0) + (Number(PH.inbox.friend_asks) || 0) : 0, n = base + fpsUnreadAll();
s.textContent = n > 99 ? "99+" : String(n);
s.style.display = n ? "block" : "none";
}
catch (e) { }
}
(function () { if (typeof phBadge !== "function")
return; var pb = phBadge; phBadge = function () { var r = pb.apply(this, arguments); fpsBadge(); return r; }; })();
var FPS_ICON = { order: "📦", call: "📞", text: "💬", crime: "🚨", major: "🆘" };
function fpsTownHtml() { return __ZC(372, 7, this, arguments, new.target); }
function fpsPaint(scrollEnd) {
if (typeof PH === "undefined" || !PH.open || PH.tab !== "town") {
return;
}
if (typeof phPaint === "function")
phPaint(scrollEnd);
}
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function (scrollEnd) {
var box = document.getElementById("ph-box"), keep = box && box.querySelector("[data-fpskeep]"), draft = keep ? keep.value : "";
var town = typeof PH !== "undefined" && PH.tab === "town";
var r = pp.apply(this, arguments);
try {
box = document.getElementById("ph-box");
if (!box || box.style.display === "none")
return r;
var tabs = box.querySelector(".tabs");
if (tabs && !tabs.querySelector("[data-tab='town']")) {
var u = fpsUnreadAll(), sp = document.createElement("span");
sp.setAttribute("data-tab", "town");
sp.className = town ? "on" : "";
sp.innerHTML = "Town" + (u ? " <b style='color:#C0392B'>" + u + "</b>" : "");
sp.onclick = function (ev) { ev.stopPropagation(); fpsLeave(); PH.tab = "town"; PH.msg = ""; PH.withId = null; phPaint(); };
tabs.appendChild(sp);
if (town)
Array.prototype.forEach.call(tabs.querySelectorAll("span"), function (s) { if (s !== sp)
s.className = ""; });
Array.prototype.forEach.call(tabs.querySelectorAll("span:not([data-tab='town'])"), function (s) { var o = s.onclick; s.onclick = function (ev) { fpsLeave(); return o && o.call(this, ev); }; });
}
if (!town)
return r;
var h = fpsTownHtml(), body = box.querySelector(".body");
if (body) {
body.innerHTML = h.body;
}
var oldFoot = box.querySelector(".send");
if (oldFoot)
oldFoot.remove();
if (h.foot && body) {
body.insertAdjacentHTML("afterend", h.foot);
var i = box.querySelector("[data-fpskeep]");
if (i) {
i.value = draft;
i.focus();
i.onkeydown = function (ev) { ev.stopPropagation(); if (ev.key === "Enter") {
ev.preventDefault();
var v = i.value;
i.value = "";
fpsSend(FPS.with, v);
} };
}
}
box.querySelectorAll("[data-fpswith]").forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); var n = el.getAttribute("data-fpswith"); FPS.with = n; FPS.from = (fpsStore().log[n] || []).length; fpsStore().unread[n] = 0; fpsSave(); fpsBadge(); phPaint(true); }; });
box.querySelectorAll("[data-fps]").forEach(function (el) {
el.onclick = function (ev) {
ev.stopPropagation();
var a = el.getAttribute("data-fps");
if (a === "back") {
fpsLeave();
phPaint();
}
if (a === "send") {
var i = box.querySelector("[data-fpskeep]");
if (i && FPS.with) {
var v = i.value;
i.value = "";
fpsSend(FPS.with, v);
}
}
};
});
if (scrollEnd && body)
body.scrollTop = body.scrollHeight;
}
catch (e) {
if (window.console)
console.warn("[folk-phones]", e);
}
return r;
};
})();
